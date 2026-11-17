# Builds a review pack for a Fable (or human) review of a rendered film:
#   python3 make_pack.py <video.mp4> <timing.json> <out dir> [--fps 4] [--span 6] [--size 270:480]
# For a comparison pack, first make a side-by-side video (tools/review/sbs.sh) and use --size 540:480.
# out/strips/strip_<t0>-<t1>s.jpg : <fps> frames per second, <span> seconds per strip, each frame stamped with its time
# out/narration.txt                : subtitle chunks (Arabic + English) with start/end times, and every word with its time
import json, pathlib, subprocess, sys
a = sys.argv[1:]; opt = lambda k, d: a[a.index('--' + k) + 1] if '--' + k in a else d
video, timing, out = pathlib.Path(a[0]), pathlib.Path(a[1]), pathlib.Path(a[2]); fps, span, size = float(opt('fps', 4)), float(opt('span', 6)), opt('size', '270:480')
(out / 'strips').mkdir(parents=True, exist_ok=True)
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(video)]))
FONT = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
n = int(fps * span); cols = 6; rows = (n + cols - 1) // cols
t = 0.0
while t < dur - 0.01:
    t1 = min(dur, t + span)
    vf = f"fps={fps},scale={size},drawtext=fontfile='{FONT}':text='%{{eif\\:t+{t}\\:d}}.%{{eif\\:mod((t+{t})*10\\,10)\\:d}}s':x=6:y=6:fontsize=26:fontcolor=white:box=1:boxcolor=black@0.75:boxborderw=4,tile={cols}x{rows}:padding=3:color=white"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.3f}', '-t', f'{span:.3f}', '-i', str(video), '-vf', vf, '-frames:v', '1', str(out / 'strips' / f'strip_{t:06.1f}-{t1:06.1f}s.jpg')], check=True)
    t += span
T = json.loads(timing.read_text(encoding='utf8'))
lines = ['# Narration (subtitle chunks; times in seconds)', '']
for c in T['chunks']: lines += [f"{c['a']:7.2f}-{c['b']:7.2f}  {c['en']}", f"                 {c['ar']}"]
lines += ['', '# Every word (paragraph, chunk, start-end, word)', '']
lines += [f"p{w.get('p', 0)} c{w.get('c', 0)}  {w['a']:7.2f}-{w['b']:7.2f}  {w['t']}" for w in T.get('words', [])]
(out / 'narration.txt').write_text('\n'.join(lines), encoding='utf8')
print('strips', len(list((out / 'strips').glob('*.jpg'))), 'duration', round(dur, 2))
