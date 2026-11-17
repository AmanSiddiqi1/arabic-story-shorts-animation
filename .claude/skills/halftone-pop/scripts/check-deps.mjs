#!/usr/bin/env node
// Reports what Halftone Pop needs and what is missing. usage: node check-deps.mjs [--sync] [--no-browser] [--save]
// --save remembers the playwright-core it found in ../local.json (machine-local; delete the file to forget).
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url'; import { execSync, spawnSync } from 'child_process'; import { findPlaywright, launch, ffmpegOk } from './lib/resolve.mjs';
const a = process.argv.slice(2), rows = []; let bad = 0;
const row = (name, ok, info, fix) => { rows.push([ok ? 'OK ' : 'MISSING', name, info, ok ? '' : fix]); if (!ok) bad++; };
row('node >= 18', parseInt(process.versions.node) >= 18, 'v' + process.versions.node, 'install Node 18 or newer');
let ff = ffmpegOk(); row('ffmpeg', ff, ff ? execSync('ffmpeg -version').toString().split('\n')[0] : '', 'install ffmpeg (macOS: brew install ffmpeg or MacPorts; Linux: apt install ffmpeg)');
const py = spawnSync('python3', ['--version']); row('python3 (hp-build.py)', py.status === 0, String(py.stdout || py.stderr).trim(), 'install Python 3.8+');
try { const pw = findPlaywright(); row('playwright-core', true, pw.dir + ' (' + pw.how + ')', ''); if (a.includes('--save')) { fs.writeFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'local.json'), JSON.stringify({ playwright: pw.dir }, null, 1)); console.log('saved playwright path to local.json'); } if (!a.includes('--no-browser')) { try { const { browser } = await launch(); const p = await browser.newPage(); await p.setContent('<canvas id=c></canvas>'); const ok = await p.evaluate(() => !!document.getElementById('c').getContext('2d')); await browser.close(); row('chromium (launch + canvas 2D)', ok, 'launched', 'canvas 2D unavailable'); } catch (e) { row('chromium', false, '', e.message); } } }
catch (e) { row('playwright-core', false, '', e.message); }
if (a.includes('--sync')) { const w = spawnSync('python3', ['-c', 'import faster_whisper,sys;print(faster_whisper.__version__)']); row('faster-whisper (narration sync only)', w.status === 0, String(w.stdout).trim(), 'see modules/narration-sync/README.md to create a venv (it downloads a model on first use)'); }
for (const r of rows) console.log(r[0].padEnd(8), r[1].padEnd(36), r[2], r[3] ? '\n         -> ' + r[3] : '');
console.log(bad ? `\n${bad} requirement(s) missing.` : '\nAll requirements found.'); process.exit(bad ? 1 : 0);
