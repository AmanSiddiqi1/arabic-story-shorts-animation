#!/usr/bin/env node
// usage: node hp-render.mjs <player.html> [--out film.mp4] [--fps 30] [--workers 3] [--crf 20] [--from s] [--to s]
//        [--audio narration.mp3] [--frames dir] [--keep-frames] [--loudness -15|off] [--force]
// Renders a built player to MP4: every frame is a pure function of time, so frames are captured with seek(t) in headless Chromium
// (JPEG, parallel pages), the sound effects are rendered offline with the same score the player uses, mixed with the narration
// (from the .hp.json sidecar written by hp-build.py, or --audio), loudness-normalised, and encoded H.264 + AAC 48 kHz (BT.709).
// Protections learned the hard way: an existing output is never overwritten without --force; the frames folder is only deleted
// AFTER ffmpeg has finished successfully (deleting it early once truncated a render); a short --from/--to range is a cheap test.
import fs from 'fs'; import os from 'os'; import path from 'path'; import { spawnSync } from 'child_process'; import { pathToFileURL } from 'url'; import { launch, ffmpegOk } from './lib/resolve.mjs';
const a = process.argv.slice(2), opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : a[i + 1]; };
const file = path.resolve(a[0] || ''); if (!a[0] || !fs.existsSync(file)) { console.error('usage: node hp-render.mjs <player.html> [options]'); process.exit(2); }
if (!ffmpegOk()) { console.error('ffmpeg not found: install it first (node check-deps.mjs explains)'); process.exit(2); }
const FPS = +opt('fps', 30), N = +opt('workers', 3), CRF = opt('crf', '20'), outFile = path.resolve(opt('out', file.replace(/\.html$/, '') + '.mp4')), LOUD = opt('loudness', '-15');
if (fs.existsSync(outFile) && !a.includes('--force')) { console.error(`refusing to overwrite ${outFile} (use --out for a new file, or --force)`); process.exit(2); }
let side = {}; try { side = JSON.parse(fs.readFileSync(file.replace(/\.html$/, '.hp.json'), 'utf8')); } catch {}
const audio = opt('audio', side.audio ? path.resolve(path.dirname(file), side.audio) : null); if (audio && !fs.existsSync(audio)) { console.error('narration file not found: ' + audio); process.exit(2); }
const frames = path.resolve(opt('frames', fs.mkdtempSync(path.join(os.tmpdir(), 'hp-frames-')))); fs.mkdirSync(frames, { recursive: true });
const { browser } = await launch([path.dirname(file)]);
const open = async () => { const p = await browser.newPage({ viewport: { width: 540, height: 960 } }); p.on('pageerror', (e) => console.log('PAGEERR', e.message)); await p.goto(pathToFileURL(file).href); await p.waitForFunction('window.__ready', null, { timeout: 120000 }); return p; };
const pages = []; for (let i = 0; i < N; i++) pages.push(await open());
const D = await pages[0].evaluate('window.DURATION'), t0s = +opt('from', 0), t1s = Math.min(D, +opt('to', D)), f0 = Math.round(t0s * FPS), f1 = Math.round(t1s * FPS), total = f1 - f0;
console.log(`frames ${f0}..${f1} of ${Math.ceil(D * FPS)} (${D}s), ${N} workers -> ${outFile}`);
const sfxFile = path.join(frames, 'sfx.f32'); fs.rmSync(sfxFile, { force: true });
const n = await pages[0].evaluate(async () => { window.__sfx = await SND.renderOffline(window.scoreSound, DURATION, 48000, { master: 0.6 }); return window.__sfx.length; });
for (let o = 0; o < n; o += 4000000) { const s = await pages[0].evaluate(([o, l]) => { const v = new Uint8Array(window.__sfx.buffer, o * 4, Math.min(l, window.__sfx.length - o) * 4); let s = ''; for (let i = 0; i < v.length; i += 32768) s += String.fromCharCode.apply(null, v.subarray(i, i + 32768)); return btoa(s); }, [o, 4000000]); fs.appendFileSync(sfxFile, Buffer.from(s, 'base64')); }
let done = 0, tm = Date.now();
await Promise.all(pages.map(async (p, w) => { for (let i = f0 + w; i < f1; i += N) { const d = await p.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93); }, i / FPS); fs.writeFileSync(path.join(frames, `f${String(i).padStart(5, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')); if (++done % 100 === 0) console.log(done + '/' + total, Math.round((Date.now() - tm) / 1000) + 's'); } }));
await browser.close();
const ss = t0s > 0 ? ['-ss', String(t0s)] : [], inputs = ['-y', '-v', 'error', '-framerate', String(FPS), '-start_number', String(f0), '-i', path.join(frames, 'f%05d.jpg')]; let fc;
const norm = LOUD === 'off' ? '' : `,loudnorm=I=${LOUD}:TP=-1.5:LRA=11`;
if (audio) { inputs.push(...ss, '-i', audio, ...ss, '-f', 'f32le', '-ar', '48000', '-ac', '2', '-i', sfxFile); fc = `[1:a]aresample=48000,aformat=channel_layouts=stereo,apad[n];[2:a]aformat=channel_layouts=stereo[s];[n][s]amix=inputs=2:duration=longest:normalize=0${norm},aresample=48000[a]`; }
else { inputs.push(...ss, '-f', 'f32le', '-ar', '48000', '-ac', '2', '-i', sfxFile); fc = `[1:a]aformat=channel_layouts=stereo${norm},aresample=48000[a]`; }
const ff = [...inputs, '-filter_complex', fc, '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF, '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(total / FPS), '-movflags', '+faststart', outFile];
const r = spawnSync('ffmpeg', ff, { stdio: 'inherit' }); console.log('ffmpeg exit', r.status, outFile);
if (r.status === 0 && !a.includes('--keep-frames') && !opt('frames', null)) fs.rmSync(frames, { recursive: true, force: true }); else console.log('frames kept in ' + frames);
process.exit(r.status || 0);
