# Quality check of an upgraded film against its original:  <lemo venv python> qc.py <new.mp4> <original.mp4>
# Prints format, duration, a full decode (playability), loudness, and the narration sync (cross-correlation of the audio envelopes).
import json, subprocess, sys, tempfile, os
import numpy as np
new, orig = sys.argv[1], sys.argv[2]
def probe(f):
    j = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height,r_frame_rate,sample_rate,nb_frames', '-of', 'json', f]))
    return j['format']['duration'], [(s.get('codec_name'), s.get('width'), s.get('height'), s.get('r_frame_rate'), s.get('sample_rate'), s.get('nb_frames')) for s in j['streams']]
for f in (new, orig): print(os.path.basename(f), probe(f))
dec = subprocess.run(['ffmpeg', '-v', 'error', '-i', new, '-f', 'null', '-'], capture_output=True, text=True)
print('full decode:', 'OK' if dec.returncode == 0 and not dec.stderr.strip() else 'ERRORS ' + dec.stderr[:400])
for f in (new, orig):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    print('loudness', os.path.basename(f), [l.strip() for l in e.splitlines() if l.strip().startswith('I:')][-1])
def env(f):
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '8000', '-f', 'f32le', '-'])
    a = np.frombuffer(raw, np.float32); return np.convolve(a * a, np.ones(400), 'same')[::40]  # 200 Hz envelope
a, b = env(new), env(orig); n = min(len(a), len(b)); a, b = a[:n], b[:n]
best = max(((np.corrcoef(a[200:-200], np.roll(b, k)[200:-200])[0, 1], k) for k in range(-40, 41)))
print(f'narration sync: best lag {best[1] * 5} ms, correlation {best[0]:.3f}  (0 ms and > 0.9 means unchanged and in sync)')
