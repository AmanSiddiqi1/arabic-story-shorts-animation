#!/usr/bin/env python3
"""Technical QC of a story render against its final narration (standard library + ffmpeg).
  python3 tools/production/qc.py <ID> <render.mp4> [--record VERSION]
Checks: H.264 1080x1920 30 fps + AAC 48 kHz; full decode; duration = MP3 + 1.5..6.5 s end hold; loudness about -15 LUFS;
narration sync (200 Hz loudness envelope of the film vs the final MP3: lag 0 +-10 ms, correlation > 0.8); no black or frozen
stretches inside the story. Writes Animations/<ID>/qc/<render>.qc.json (in Git); with --record also stores it in the production database.
Visual quality (acting, staging, subtitles legible) is NOT judged here: that is the Fable review."""
import json, math, pathlib, re, struct, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db

def probe(f):
    j = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate',
                                            '-of', 'json', str(f)]))
    return float(j['format']['duration']), j['streams']

def env(f, dur):
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-t', str(dur), '-i', str(f), '-ac', '1', '-ar', '8000', '-f', 's16le', '-'])
    x = struct.unpack('<%dh' % (len(raw) // 2), raw)
    return [math.sqrt(sum(v * v for v in x[i:i + 40]) / 40) for i in range(0, len(x) - 40, 40)]

def corr(a, b):
    n = min(len(a), len(b)); a, b = a[:n], b[:n]; ma, mb = sum(a) / n, sum(b) / n
    num = sum((x - ma) * (y - mb) for x, y in zip(a, b)); den = math.sqrt(sum((x - ma) ** 2 for x in a) * sum((y - mb) ** 2 for y in b))
    return num / den if den else 0

def run(sid, mp4, record=None):
    c = db.connect(); s = c.execute('SELECT * FROM stories WHERE id=?', (sid,)).fetchone()
    mp3 = db.REPO / 'Audio Files' / 'Final Done' / s['mp3_file']; R = {}; fails = []
    dur, st = probe(mp4); v = next((x for x in st if x['codec_type'] == 'video'), {}); a = next((x for x in st if x['codec_type'] == 'audio'), {})
    R['format'] = {'video': [v.get('codec_name'), v.get('width'), v.get('height'), v.get('r_frame_rate')], 'audio': [a.get('codec_name'), a.get('sample_rate')], 'duration': round(dur, 3)}
    if [v.get('codec_name'), v.get('width'), v.get('height'), v.get('r_frame_rate')] != ['h264', 1080, 1920, '30/1']: fails.append('video is not H.264 1080x1920 30 fps')
    if [a.get('codec_name'), a.get('sample_rate')] != ['aac', '48000']: fails.append('audio is not AAC 48 kHz')
    hold = dur - s['mp3_duration']; R['end_hold'] = round(hold, 2)
    if dur > 180.05: fails.append(f'film is {dur:.2f} s; the series limit is 180 s (3 minutes)')
    if not min(1.4, 180.0 - s['mp3_duration'] - 0.1) <= hold <= 6.6: fails.append(f'duration {dur:.2f} s: end hold {hold:.2f} s outside 1.5..6.5 s after the {s["mp3_duration"]:.2f} s narration')
    d = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(mp4), '-f', 'null', '-'], capture_output=True, text=True)
    R['decode'] = 'OK' if d.returncode == 0 and not d.stderr.strip() else d.stderr[:300]
    if R['decode'] != 'OK': fails.append('full decode reported errors')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(mp4), '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.findall(r'I:\s+(-?[\d.]+) LUFS', e); R['lufs'] = float(m[-1]) if m else None
    if R['lufs'] is None or not -16.5 <= R['lufs'] <= -13.5: fails.append(f'loudness {R["lufs"]} LUFS (target -15)')
    A, B = env(mp4, s['mp3_duration']), env(mp3, s['mp3_duration'])
    best = max((corr(A[40:-40], B[40 + k:len(B) - 40 + k]), k) for k in range(-6, 7))
    R['sync'] = {'lag_ms': best[1] * 5, 'corr': round(best[0], 3)}
    if abs(best[1]) > 2 or best[0] < 0.8: fails.append(f'narration sync: lag {best[1]*5} ms, correlation {best[0]:.3f}')
    bd = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(mp4), '-vf', 'blackdetect=d=0.5:pix_th=0.05,freezedetect=n=0.001:d=5', '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
    R['black'] = re.findall(r'black_start:(\S+) black_end:(\S+)', bd)
    fz = re.findall(r'freeze_start: (\S+)', bd); R['frozen_from'] = [float(x) for x in fz if float(x) < s['mp3_duration'] - 1]
    if R['black']: fails.append(f'black stretches {R["black"]}')
    if R['frozen_from']: fails.append(f'picture frozen for 5 s or more from {R["frozen_from"]} s')
    R['result'] = 'PASS' if not fails else 'FAIL'; R['fails'] = fails; R['checked'] = db.now()
    out = db.REPO / 'Animations' / sid / 'qc' / (pathlib.Path(mp4).name + '.qc.json'); out.parent.mkdir(parents=True, exist_ok=True); out.write_text(json.dumps(R, indent=1) + '\n', encoding='utf8')
    if record:
        c.execute('INSERT OR REPLACE INTO renders VALUES (?,?,?,?,?,?,?,?)', (sid, record, str(pathlib.Path(mp4).resolve().relative_to(db.REPO)) if str(pathlib.Path(mp4).resolve()).startswith(str(db.REPO)) else str(mp4),
                  None, round(dur, 3), R['result'], json.dumps(R), db.now()))
        c.commit(); db.log(c, sid, 'qc', f'{record}: {R["result"]} {"; ".join(fails)}')
    return R

if __name__ == '__main__':
    a = sys.argv[1:]; R = run(a[0], a[1], a[a.index('--record') + 1] if '--record' in a else None)
    print(json.dumps({k: R[k] for k in ('format', 'end_hold', 'decode', 'lufs', 'sync', 'black', 'frozen_from')}))
    print('QC', R['result'], *R['fails'], sep='\n  ' if R['fails'] else ' '); sys.exit(0 if R['result'] == 'PASS' else 1)
