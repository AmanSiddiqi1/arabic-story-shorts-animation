// usage: node ptest.mjs <path to a built player .html>
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import path from 'path'; import fs from 'fs';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar not found: set LIB'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const b = await chromium.launch({ executablePath: EXE, args: [...ARGS, '--autoplay-policy=no-user-gesture-required'] }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
p.on('pageerror', (e) => console.log('PAGEERR', e.message));
await p.addInitScript(() => { window.__ctx = 0; window.__open = 0; const A = window.AudioContext; window.AudioContext = function () { const c = new A(); window.__ctx++; window.__open++; const cl = c.close.bind(c); c.close = () => { window.__open--; return cl(); }; return c; }; });
await p.goto(pathToFileURL(path.resolve(process.argv[2])).href); await p.waitForFunction('window.__ready');
const st = () => p.evaluate(() => ({ tm: document.getElementById('tm').textContent, btn: document.getElementById('pp').textContent, ctx: window.__ctx, open: window.__open, narPaused: document.getElementById('nar').paused }));
await p.click('#pp'); await p.waitForTimeout(1500); console.log('playing', await st());
await p.evaluate(() => { const s = document.getElementById('sc'); s.value = 500; s.dispatchEvent(new Event('input')); }); await p.waitForTimeout(600); console.log('after scrub', await st());
await p.evaluate(() => { const s = document.getElementById('sc'); s.value = 999; s.dispatchEvent(new Event('input')); }); await p.waitForTimeout(1500); console.log('after loop', await st());
await p.click('#pp'); await p.waitForTimeout(300); console.log('paused', await st());
await b.close();
