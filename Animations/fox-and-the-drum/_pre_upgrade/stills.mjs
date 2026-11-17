// node stills.mjs t1 t2 ...  -> stills/t<sec>.png  (renders the built player headless)
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path';
// Lemo-Opuscar is found from this script's own location: $LIB, or the nearest 'lemo-opuscar' folder in any parent directory (a sibling of the Kalila wa Dimna folder).
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const here = path.dirname(fileURLToPath(import.meta.url)), file = path.join(here, 'The Fox and the Drum - Halftone Pop 9x16 - ' + (process.env.TAG || 'Noto Naskh Arabic') + '.html');
const times = process.argv.slice(2).map(Number); fs.mkdirSync(path.join(here, 'stills'), { recursive: true });
const b = await chromium.launch({ executablePath: EXE, args: ARGS }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
p.on('pageerror', (e) => console.log('PAGEERR', e.message)); p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()));
await p.goto(pathToFileURL(file).href); await p.waitForFunction('window.__ready', null, { timeout: 60000 });
for (const t of times) { const d = await p.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/jpeg', 0.9); }, t); fs.writeFileSync(path.join(here, 'stills', `t${String(t).replace('.', '_').padStart(7, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')); console.log('t', t); }
await b.close();
