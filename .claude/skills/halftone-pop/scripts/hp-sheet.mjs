#!/usr/bin/env node
// usage: node hp-sheet.mjs <out.jpg> <image1> <image2> ...   contact sheet (3 columns, 360x640 thumbnails) using ffmpeg only
import { spawnSync } from 'child_process'; const [out, ...f] = process.argv.slice(2); if (!out || !f.length) { console.error('usage: node hp-sheet.mjs out.jpg img1 img2 ...'); process.exit(2); }
const cols = 3, n = f.length, rows = Math.ceil(n / cols), args = ['-y', '-v', 'error']; f.forEach((x) => args.push('-i', x));
let fc = f.map((_, i) => `[${i}:v]scale=360:640,setsar=1[v${i}]`).join(';'), lay = f.map((_, i) => `${(i % cols) * 360}_${Math.floor(i / cols) * 640}`).join('|');
fc += `;${f.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${n}:layout=${lay}:fill=white[o]`;
const r = spawnSync('ffmpeg', [...args, '-filter_complex', fc, '-map', '[o]', '-frames:v', '1', out], { stdio: 'inherit' }); process.exit(r.status || 0);
