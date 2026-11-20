// node catalogue.mjs [--style <id>]  -> cast.png, sets.png, people.png and animals.png next to this file (another style: in Library/styles/<id>/catalogue/) (renders catalogue.html headless with the Lemo-Opuscar Chromium)
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const self = path.dirname(fileURLToPath(import.meta.url)), si = process.argv.indexOf('--style'), sty = si < 0 ? 'halftone-pop' : process.argv[si + 1];
const here = sty === 'halftone-pop' ? self : path.join(self, '..', 'styles', sty, 'catalogue'), LIB = findLib(here), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const b = await chromium.launch({ executablePath: EXE, args: ARGS }); const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto(pathToFileURL(path.join(here, 'catalogue.html')).href); await p.waitForFunction('window.__ready', null, { timeout: 60000 }).catch(() => {});
for (const id of ['cast', 'sets', 'people', 'animals']) { const d = await p.evaluate((id) => document.getElementById(id).toDataURL('image/png'), id); fs.writeFileSync(path.join(here, id + '.png'), Buffer.from(d.split(',')[1], 'base64')); console.log(id + '.png'); }
await b.close(); if (errs.length) { console.log('ERRORS:\n' + errs.join('\n')); process.exit(1); }
