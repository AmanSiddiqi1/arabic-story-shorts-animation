#!/usr/bin/env node
// usage: node hp-stills.mjs <player.html> <t1> <t2> ... [--out dir] [--json] [--eval "<js>"]
// Renders still frames (JPEG, full size) of a built player. --json prints HP.debug.subtitle for each frame (font/lines/direction checks).
import fs from 'fs'; import path from 'path'; import { pathToFileURL } from 'url'; import { launch } from './lib/resolve.mjs';
const a = process.argv.slice(2), opt = (k) => { const i = a.indexOf('--' + k); return i < 0 ? null : a[i + 1]; };
const file = path.resolve(a[0] || ''); if (!a[0] || !fs.existsSync(file)) { console.error('usage: node hp-stills.mjs <player.html> t1 t2 ... [--out dir] [--json]'); process.exit(2); }
const outDir = path.resolve(opt('out') || path.join(path.dirname(file), 'stills')); fs.mkdirSync(outDir, { recursive: true });
const skip = new Set(); a.forEach((x, i) => { if (x.startsWith('--')) { skip.add(i); if (!['--json'].includes(x)) skip.add(i + 1); } });
const times = a.slice(1).filter((x, i) => !skip.has(i + 1)).map(Number).filter((x) => !Number.isNaN(x));
const { browser } = await launch([path.dirname(file)]); const p = await browser.newPage({ viewport: { width: 540, height: 960 } });
p.on('pageerror', (e) => console.log('PAGEERR', e.message)); await p.goto(pathToFileURL(file).href); await p.waitForFunction('window.__ready', null, { timeout: 60000 }).catch(() => { console.error('player did not become ready (see PAGEERR above)'); process.exit(3); });
for (const t of times) {
  const d = await p.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93); }, t), name = path.join(outDir, `still-${String(t).replace('.', '_')}.jpg`);
  fs.writeFileSync(name, Buffer.from(d.split(',')[1], 'base64')); console.log(name);
  if (a.includes('--json')) console.log(JSON.stringify(await p.evaluate(() => (window.HP && HP.debug && HP.debug.subtitle) || null)));
  if (opt('eval')) console.log(JSON.stringify(await p.evaluate(opt('eval'))));
}
await browser.close();
