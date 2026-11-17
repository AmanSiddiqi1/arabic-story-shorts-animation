#!/usr/bin/env python3
"""Compares a test render with the approved film over the same time span: narration sync and picture (subtitle) match.
  python3 tools/setup/sync_check.py <test.mp4> <final.mp4> <from_seconds>
Narration: cross-correlates 200 Hz loudness envelopes (lag 0 ms and correlation > 0.9 = in sync).
Picture: PSNR of frames at three times (> 35 dB = the same picture, subtitles included). Standard library + ffmpeg only."""
import math, re, struct, subprocess, sys
test, final, t0 = sys.argv[1], sys.argv[2], float(sys.argv[3])
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', test]))
def env(f, ss):
    a = ['ffmpeg', '-v', 'error'] + (['-ss', str(ss)] if ss else []) + ['-t', str(dur), '-i', f, '-ac', '1', '-ar', '8000', '-f', 's16le', '-']
    raw = subprocess.check_output(a); x = struct.unpack('<%dh' % (len(raw) // 2), raw)
    return [sum(v * v for v in x[i:i + 40]) / 40 for i in range(0, len(x) - 40, 40)]
def corr(a, b):
    n = min(len(a), len(b)); a, b = a[:n], b[:n]; ma, mb = sum(a) / n, sum(b) / n
    num = sum((x - ma) * (y - mb) for x, y in zip(a, b)); den = math.sqrt(sum((x - ma) ** 2 for x in a) * sum((y - mb) ** 2 for y in b))
    return num / den if den else 0
a, b = env(test, 0), env(final, t0)
best = max((corr(a[40:-40], b[40 + k:len(b) - 40 + k] if k >= 0 else b[40 + k:len(b) - 40 + k]), k) for k in range(-30, 31))
sync_ok = best[1] == 0 and best[0] > 0.9
print(f'narration: best lag {best[1] * 5} ms, correlation {best[0]:.3f} -> {"IN SYNC" if sync_ok else "CHECK"}')
pic_ok = True
for frac in (0.25, 0.5, 0.75):
    t = round(dur * frac, 2)
    e = subprocess.run(['ffmpeg', '-v', 'info', '-ss', str(t), '-i', test, '-ss', str(t0 + t), '-i', final, '-frames:v', '1', '-lavfi', '[0:v][1:v]psnr', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'average:(\S+)', e); p = float('inf') if m and m.group(1) == 'inf' else float(m.group(1)) if m else 0
    pic_ok &= p > 35; print(f'picture at +{t:.2f} s (film {t0 + t:.2f} s): PSNR {p:.1f} dB')
print('RESULT:', 'OK' if sync_ok and pic_ok else 'MISMATCH'); sys.exit(0 if sync_ok and pic_ok else 1)
