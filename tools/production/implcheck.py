#!/usr/bin/env python3
"""Code-only validation of a story implementation (no full render).
  python3 tools/production/implcheck.py <ID> [--stills]
Checks: story.json, scene files and narration resolve; timing.json chunks are verbatim (Arabic and English, word for word against
story/arabic.txt and story/english.txt), in order, inside the narration; build.py builds the player; the player loads headless with
no page errors, reads DURATION <= 180.0 s and = MP3 + end hold (1.0..6.5 s, or exactly 180 s when clamped), and N seeks across the
whole film draw non-blank frames (tools/production/smoke.mjs); every frame (1/30 s) is seeked once to catch
errors on single frames (tools/production/scan.mjs); every caption fits the panel. Writes Animations/<ID>/qc/implcheck.json and render_job.json
(the exact deferred render command). Exit 0 = PASS."""
import json, os, pathlib, re, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db

REPO = db.REPO
sys.path.insert(0, str(REPO / 'Library')); import style   # style profile: player file name
AR_STRIP = re.compile('[ؐ-ًؚ-ٰٟۖ-ۭـ]')

def words(s, ar):
    s = AR_STRIP.sub('', s) if ar else s.lower()
    s = re.sub(r'[–—\-]', ' ', s)
    return [w for w in re.sub(r'[^\w\s]', ' ', s).split() if w]

def mp3_duration(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)]).strip())

def run(sid, stills=False):
    d = REPO / 'Animations' / sid; E, W, R = [], [], {'story': sid, 'checked': db.now()}
    cfg = json.loads((d / 'story.json').read_text(encoding='utf8'))
    for f in cfg.get('scenes', []):
        if not (d / 'src' / f).exists(): E.append(f'scene file missing: src/{f}')
    if not cfg.get('scenes'): E.append('story.json has no scenes')
    if cfg.get('arabicFont', 'naskh') != 'naskh': E.append(f"arabicFont is {cfg.get('arabicFont')}, series default is naskh")
    nar = (d / cfg.get('narration', 'narration.mp3')).resolve()
    if not nar.exists(): E.append(f'narration not found: {nar}'); dur = None
    else: dur = mp3_duration(nar); R['mp3'] = str(nar.relative_to(REPO)); R['mp3_duration'] = dur
    c = db.connect(); s = c.execute('SELECT mp3_file FROM stories WHERE id=?', (sid,)).fetchone()
    if s and nar.name != s['mp3_file']: E.append(f"narration {nar.name} is not the final MP3 {s['mp3_file']}")
    tj = d / 'timing.json'
    if not tj.exists(): E.append('timing.json missing (run align.py)')
    else:
        T = json.loads(tj.read_text(encoding='utf8')); ch = T.get('chunks', [])
        R['chunks'] = len(ch)
        if not ch: E.append('timing.json has no chunks')
        for lang, key, ar in (('arabic', 'ar', True), ('english', 'en', False)):
            src = d / 'story' / f'{lang}.txt'
            if not src.exists(): E.append(f'story/{lang}.txt missing'); continue
            want, got = words(src.read_text(encoding='utf8'), ar), words(' '.join(x.get(key, '') for x in ch), ar)
            if want != got:
                i = next((k for k, (x, y) in enumerate(zip(want, got)) if x != y), min(len(want), len(got)))
                E.append(f'{key} subtitles not verbatim: {len(got)} vs {len(want)} words, first difference at word {i}: {got[i:i+4]} vs {want[i:i+4]}')
        prev = -1
        for x in ch:
            if x['a'] < prev - 1e-3: E.append(f"chunk p{x['p']} c{x['c']} starts before the previous one"); break
            if x['b'] <= x['a']: E.append(f"chunk p{x['p']} c{x['c']} has no length"); break
            prev = x['a']
        if dur and ch and ch[-1]['b'] > dur + 0.5: E.append(f"last chunk ends {ch[-1]['b']:.2f} s after the narration ({dur:.2f} s)")
        if any(re.search('[–—]', x.get('en', '') + x.get('ar', '')) for x in ch): W.append('chunk text contains en/em dashes (display must replace them)')
    b = subprocess.run([sys.executable, 'build.py'], cwd=d, capture_output=True, text=True)
    if b.returncode: E.append('build.py failed: ' + (b.stderr or b.stdout)[-400:]); html = None
    else:
        html = d / (style.film_name(cfg) + '.html')
        if not html.exists(): E.append(f'player not found after build: {html.name}'); html = None
    if html:
        args = ['node', str(REPO / 'tools' / 'production' / 'smoke.mjs'), str(html), '--n', '48']
        if stills: args += ['--stills', str(d / 'stills' / 'smoke')]
        o = subprocess.run(args, capture_output=True, text=True, timeout=900)
        try: S = json.loads(o.stdout.strip().splitlines()[-1])
        except Exception: S = {'errors': ['smoke test produced no result: ' + (o.stderr or o.stdout)[-300:]]}
        R['smoke'] = {k: S.get(k) for k in ('duration', 'times', 'ms_per_frame', 'blank')}
        E += S.get('errors', [])[:5]
        if S.get('blank'): W.append(f"blank-looking frames at {S['blank'][:6]}")
        R['caption_fit'] = S.get('fit')
        if S.get('fit'): E.append(f"subtitle chunk(s) do not fit the caption panel at the minimum size: {S['fit'][:4]}")
        D = S.get('duration')
        if D is not None:
            R['film_duration'] = D
            if D > 180.05: E.append(f'film is {D:.2f} s (> 180 s)')
            if dur and not (1.0 <= D - dur <= 6.5 or (dur > 178.5 and abs(D - 180) < 0.1)): E.append(f'end hold {D - dur:.2f} s outside 1.0..6.5 s')
            sc = subprocess.run(['node', str(REPO / 'tools' / 'production' / 'scan.mjs'), str(html)], capture_output=True, text=True, timeout=1800)
            try: SC = json.loads(sc.stdout.strip().splitlines()[-1])
            except Exception: SC = {'errors': -1, 'first': (sc.stderr or sc.stdout)[-200:]}
            R['frame_scan'] = SC
            if SC.get('errors'): E.append(f"frame scan: {SC['errors']} frame(s) throw, first {SC.get('first')}")
            if S.get('ms_per_frame'): R['est_render_min'] = round(D * 30 * S['ms_per_frame'] / 3 / 60000 * 1.6, 1)
    R.update(status='PASS' if not E else 'FAIL', errors=E, warnings=W)
    (d / 'qc').mkdir(exist_ok=True)
    (d / 'qc' / 'implcheck.json').write_text(json.dumps(R, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    job = {'story': sid, 'cwd': f'Animations/{sid}', 'build': 'python3 build.py',
           'render': f'node render.mjs --workers 3 --crf 20 --frames ../../scratch/render-queue/{sid}/frames --out renders/{sid}_v1.mp4',
           'qc': f'python3 tools/production/qc.py {sid} Animations/{sid}/renders/{sid}_v1.mp4 --record v1',
           'notes': 'run from the repository root with tools/production/render_queue.py; frames are deleted only after "ffmpeg exit 0"',
           'implcheck': R['status'], 'film_duration': R.get('film_duration')}
    (d / 'render_job.json').write_text(json.dumps(job, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    return R

if __name__ == '__main__':
    r = run(sys.argv[1], '--stills' in sys.argv)
    print(r['status'], json.dumps({k: r.get(k) for k in ('film_duration', 'mp3_duration', 'chunks', 'smoke', 'est_render_min')}))
    for e in r['errors']: print('ERROR', e)
    for w in r['warnings']: print('WARN', w)
    sys.exit(0 if r['status'] == 'PASS' else 1)
