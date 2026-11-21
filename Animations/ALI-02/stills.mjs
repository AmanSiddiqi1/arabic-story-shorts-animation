// node stills.mjs t1 t2 ...  -> stills/t<sec>.jpg  (renders the built player headless). TAG=<font family> to pick another build.
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const here = path.dirname(fileURLToPath(import.meta.url)), CFG = JSON.parse(fs.readFileSync(path.join(here, 'story.json'), 'utf8'));
const findUp = (d, name) => { for (let x = d; ; x = path.dirname(x)) { if (fs.existsSync(path.join(x, 'Library', 'lib.py'))) return path.join(x, name); if (path.dirname(x) === x) throw new Error('Kalila wa Dimna folder not found'); } };
const ST = await import(pathToFileURL(findUp(here, 'Library/style.mjs')).href);   // style profile: player file name
const M = await import(pathToFileURL(findUp(here, 'Library/media.mjs')).href);    // media folder: the player and stills/ live in Working files when it is set
const file = M.resolve(path.join(here, ST.filmName(CFG, process.env.TAG) + '.html')), SD = path.dirname(M.out(path.join(here, 'stills', 'x')));
const times = process.argv.slice(2).map(Number); fs.mkdirSync(SD, { recursive: true });
const name = (t) => 't' + t.toFixed(2).replace('.', '_').padStart(8, '0') + '.jpg';
const b = await chromium.launch({ executablePath: EXE, args: ARGS }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
p.on('pageerror', (e) => console.log('PAGEERR', e.message)); p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()));
await p.goto(pathToFileURL(file).href, { timeout: 180000 }); await p.waitForFunction('window.__ready', null, { timeout: 60000 });
for (const t of times) { const d = await p.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/jpeg', 0.9); }, t); fs.writeFileSync(path.join(SD, name(t)), Buffer.from(d.split(',')[1], 'base64')); console.log('stills/' + name(t)); }
await b.close();
