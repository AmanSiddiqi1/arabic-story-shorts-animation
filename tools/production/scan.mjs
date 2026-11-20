// node tools/production/scan.mjs <player.html> [--from s] [--to s] [--step s] [--pages n]
// Dense headless seek of a built player (default: every frame, 1/30 s, over the whole film). Prints every time that throws
// (first 20) and a JSON summary line. Catches errors that only occur on a few frames, which the 49-point smoke test can miss.
// --pages n (default PAGES_DEFAULT, or $SCAN_PAGES) splits the frames into n consecutive ranges, each seeked in order on its own
// page of ONE browser (one safe-Chromium slot). Same frames and same report as one page; with CPU rendering
// (tools/browser/safe-chromium.cjs) one page takes about 4x longer, so the pages run the ranges in parallel.
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const PAGES_DEFAULT = 6;   // fastest of 3, 4, 6 on this 6-core Mac with CPU rendering (2026-11-19 benchmark), identical reports
const a = process.argv.slice(2), opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : +a[i + 1]; };
const PAGES = Math.max(1, opt('pages', +(process.env.SCAN_PAGES || PAGES_DEFAULT)) | 0), url = pathToFileURL(path.resolve(a[0])).href;
const b = await chromium.launch({ executablePath: EXE, args: ARGS });
const open = async () => { const p = await b.newPage({ viewport: { width: 540, height: 960 } }); await p.goto(url); await p.waitForFunction('window.__ready', null, { timeout: 120000 }); return p; };
const p0 = await open();
const D = await p0.evaluate('window.DURATION'), from = opt('from', 0), to = Math.min(opt('to', D), D), step = opt('step', 1 / 30);
let n = 0; while (from + n * step < to) n++;   // exactly the frames the single-page loop visits (same arithmetic)
const P = Math.min(PAGES, Math.max(1, n)), pages = [p0, ...await Promise.all(Array.from({ length: P - 1 }, open))];
const parts = await Promise.all(pages.map((p, k) => p.evaluate(({ from, step, i0, i1 }) => { const e = []; for (let i = i0; i < i1; i++) { const t = from + i * step; try { window.seek(t); } catch (x) { e.push([+t.toFixed(3), String(x.message || x).slice(0, 160)]); } } return e; },
  { from, step, i0: Math.floor(n * k / P), i1: Math.floor(n * (k + 1) / P) })));
const errs = parts.flat();   // ranges are consecutive, so this is in time order like the single-page scan
errs.slice(0, 20).forEach((x) => console.log('ERR', x[0], x[1]));
console.log(JSON.stringify({ duration: D, from, to, step, frames: Math.ceil((to - from) / step), errors: errs.length, first: errs[0] || null }));
await b.close();
