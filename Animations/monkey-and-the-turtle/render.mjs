// node render.mjs [--html player.html] [--out file.mp4] [--fps 30] [--workers 3] [--from s] [--to s] [--frames dir] [--tag "Noto Naskh Arabic"] [--force]
// Loads the built player headless, seeks every frame (pure function of t), pipes JPEGs to ffmpeg with the narration + synthesized effects.
// Default output: MP4s/<title> - Halftone Pop 9x16 - <font>.mp4 in this repository (Library/media.mjs local mode; <shared root>/final-mp4s/ only when a shared media root is set). Refuses to overwrite an existing file unless --force.
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path'; import { spawnSync } from 'child_process';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar library not found: set LIB=/path/to/lemo-opuscar'); } };
const findUp = (d, name) => { for (let x = d; ; x = path.dirname(x)) { if (fs.existsSync(path.join(x, 'Library', 'lib.py'))) return path.join(x, name); if (path.dirname(x) === x) throw new Error('Kalila wa Dimna folder not found'); } };
const LIB = findLib(path.dirname(fileURLToPath(import.meta.url))), req = createRequire(path.join(LIB, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(LIB, 'core/render/browser.mjs')).href);
const here = path.dirname(fileURLToPath(import.meta.url)), CFG = JSON.parse(fs.readFileSync(path.join(here, 'story.json'), 'utf8'));
const M = await import(pathToFileURL(findUp(here, 'Library/media.mjs')).href); // media resolver (media.config.json: local folders by default)
const a = process.argv.slice(2), opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : a[i + 1]; };
const TAG = opt('tag', 'Noto Naskh Arabic'), file = path.resolve(opt('html', M.resolve(path.join(here, `${CFG.title} - Halftone Pop 9x16 - ${TAG}.html`))));
const FPS = +opt('fps', 30), N = +opt('workers', 3), outFile = opt('out', path.join(M.finalDir(), `${CFG.title} - Halftone Pop 9x16 - ${TAG}.mp4`));
if (fs.existsSync(outFile) && !a.includes('--force')) { console.log('refusing to overwrite ' + outFile + ' (use --out for a test, or --force)'); process.exit(1); }
fs.mkdirSync(path.dirname(outFile), { recursive: true });
const dir = opt('frames', path.dirname(M.out(path.join(here, 'frames', 'x')))); fs.mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: EXE, args: ARGS });
const open = async () => { const p = await b.newPage({ viewport: { width: 540, height: 960 } }); p.on('pageerror', (e) => console.log('PAGEERR', e.message)); await p.goto(pathToFileURL(file).href); await p.waitForFunction('window.__ready', null, { timeout: 120000 }); return p; };
const pages = []; for (let i = 0; i < N; i++) pages.push(await open());
const D = await pages[0].evaluate('window.DURATION');
const f0 = Math.round(+opt('from', 0) * FPS), f1 = Math.min(Math.ceil(D * FPS), Math.round(+opt('to', D) * FPS)), total = f1 - f0; console.log('frames', f0, f1, 'duration', D);
// 1. effects track (the same score the player plays), rendered offline
const sfxFile = path.join(dir, 'sfx.f32'); fs.rmSync(sfxFile, { force: true });
const n = await pages[0].evaluate(async () => { window.__sfx = await SND.renderOffline(window.scoreSound, DURATION, 48000, { master: 0.6 }); return window.__sfx.length; });
for (let o = 0; o < n; o += 4000000) { const s = await pages[0].evaluate(([o, l]) => { const v = new Uint8Array(window.__sfx.buffer, o * 4, Math.min(l, window.__sfx.length - o) * 4); let s = ''; for (let i = 0; i < v.length; i += 32768) s += String.fromCharCode.apply(null, v.subarray(i, i + 32768)); return btoa(s); }, [o, 4000000]); fs.appendFileSync(sfxFile, Buffer.from(s, 'base64')); }
// 2. frames
let done = 0, t0 = Date.now();
await Promise.all(pages.map(async (p, w) => { for (let i = f0 + w; i < f1; i += N) { const d = await p.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93); }, i / FPS); fs.writeFileSync(path.join(dir, `f${String(i).padStart(5, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')); if (++done % 100 === 0) console.log(done + '/' + total, Math.round((Date.now() - t0) / 1000) + 's'); } }));
await b.close();
// 3. mux: narration (offset for partial renders) + effects, mastered gently. Without narration.mp3, the effects alone.
const nar = M.resolve(path.join(here, CFG.narration || 'narration.mp3')), hasNar = fs.existsSync(nar), ss = String(f0 / FPS);
const ins = ['-framerate', String(FPS), '-start_number', String(f0), '-i', path.join(dir, 'f%05d.jpg'), ...(hasNar ? ['-ss', ss, '-i', nar] : []), '-f', 'f32le', '-ar', '48000', '-ac', '2', '-ss', ss, '-i', sfxFile];
const mix = hasNar ? `[1:a]aresample=48000,aformat=channel_layouts=stereo,apad[n];[2:a]aformat=channel_layouts=stereo[s];[n][s]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-15:TP=-1.5:LRA=11,aresample=48000[a]` : `[1:a]aformat=channel_layouts=stereo,loudnorm=I=-15:TP=-1.5:LRA=11,aresample=48000[a]`;
const ff = ['-y', '-v', 'error', ...ins, '-filter_complex', mix, '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', opt('crf', '20'), '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
  '-c:a', 'aac', '-b:a', '192k', '-t', String(total / FPS), '-movflags', '+faststart', outFile];
const r = spawnSync('ffmpeg', ff, { stdio: 'inherit' }); console.log('ffmpeg exit', r.status, outFile);
