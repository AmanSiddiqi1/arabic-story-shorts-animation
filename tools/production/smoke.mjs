// node tools/production/smoke.mjs <player.html> [--n 40] [--stills dir]
// Headless smoke test of a built player WITHOUT rendering the film: loads it, reads window.DURATION, seeks N evenly spaced
// times (plus 0 and the end), and reports page errors, blank frames and draw time. Prints one JSON line. Uses Lemo-Opuscar's Chromium.
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const a = process.argv.slice(2), opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : a[i + 1]; };
const file = path.resolve(a[0]), N = +opt('n', 40), sdir = opt('stills', null);
const R = { html: file, errors: [], blank: [], times: 0 };
const b = await chromium.launch({ executablePath: EXE, args: ARGS }); const p = await b.newPage({ viewport: { width: 540, height: 960 } });
p.on('pageerror', (e) => R.errors.push('PAGEERR ' + e.message)); p.on('console', (m) => m.type() === 'error' && R.errors.push('CONSOLE ' + m.text()));
try {
  await p.goto(pathToFileURL(file).href); await p.waitForFunction('window.__ready', null, { timeout: 120000 });
  R.duration = await p.evaluate('window.DURATION');
  const ts = [0]; for (let i = 1; i < N; i++) ts.push(+(R.duration * i / N).toFixed(2)); ts.push(Math.max(0, R.duration - 0.05));
  const t0 = Date.now(); if (sdir) fs.mkdirSync(sdir, { recursive: true });
  for (const t of ts) {
    const r = await p.evaluate((t) => { window.seek(t); const c = document.getElementById('c'), x = c.getContext('2d');
      const d = x.getImageData(0, 0, c.width, Math.floor(c.height * 0.66)).data; let s = 0, s2 = 0, n = 0;
      for (let i = 0; i < d.length; i += 4 * 97) { const v = (d[i] + d[i + 1] + d[i + 2]) / 3; s += v; s2 += v * v; n++; }
      const m = s / n; return { mean: m, sd: Math.sqrt(Math.max(0, s2 / n - m * m)), jpg: null }; }, t);
    if (r.sd < 4) R.blank.push(t);
    if (sdir && (ts.indexOf(t) % 5 === 0)) { const u = await p.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.8)); fs.writeFileSync(path.join(sdir, `smoke_${String(t.toFixed(2)).padStart(7, '0')}.jpg`), Buffer.from(u.split(',')[1], 'base64')); }
    R.times++;
  }
  R.ms_per_frame = Math.round((Date.now() - t0) / ts.length);
  // caption fit: same loops as Library/core/subtitle.js; English must fit 150 px at >= 30 px, Arabic 340 px at >= 44 px
  R.fit = await p.evaluate(() => { try {
    const c = document.createElement('canvas').getContext('2d'), maxW = 972 - 90, bad = [];
    for (const ch of (window.TIMING || TIMING).chunks) {
      let fs = 70, n; c.direction = 'rtl'; for (; fs >= 44; fs -= 2) { c.font = K.font(fs, AF, AW); n = K.wrap(c, ch.ar, maxW).length; if (n * fs * 1.72 <= 340) break; }
      let es = 44, m; c.direction = 'ltr'; for (; es >= 30; es -= 2) { c.font = K.font(es, BF, 400); m = K.wrap(c, ch.en, maxW).length; if (m * es * 1.25 <= 150) break; }
      if (fs < 44 || es < 30) bad.push({ p: ch.p, c: ch.c, ar_px: Math.max(fs, 44), en_px: Math.max(es, 30), en_lines: m });
    } return bad; } catch (e) { return [{ error: String(e) }]; } });
} catch (e) { R.errors.push('LOAD ' + e.message); }
await b.close(); console.log(JSON.stringify(R));
