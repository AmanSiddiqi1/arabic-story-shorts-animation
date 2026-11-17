// node tools/production/scan.mjs <player.html> [--from s] [--to s] [--step s]
// Dense headless seek of a built player (default: every frame, 1/30 s, over the whole film). Prints every time that throws
// (first 20) and a JSON summary line. Catches errors that only occur on a few frames, which the 49-point smoke test can miss.
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const a = process.argv.slice(2), opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : +a[i + 1]; };
const b = await chromium.launch({ executablePath: EXE, args: ARGS }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
await p.goto(pathToFileURL(path.resolve(a[0])).href); await p.waitForFunction('window.__ready', null, { timeout: 120000 });
const D = await p.evaluate('window.DURATION'), from = opt('from', 0), to = Math.min(opt('to', D), D), step = opt('step', 1 / 30);
const errs = await p.evaluate(({ from, to, step }) => { const e = []; for (let i = 0, t = from; t < to; t = from + (++i) * step) { try { window.seek(t); } catch (x) { e.push([+t.toFixed(3), String(x.message || x).slice(0, 160)]); } } return e; }, { from, to, step });
errs.slice(0, 20).forEach((x) => console.log('ERR', x[0], x[1]));
console.log(JSON.stringify({ duration: D, from, to, step, frames: Math.ceil((to - from) / step), errors: errs.length, first: errs[0] || null }));
await b.close();
