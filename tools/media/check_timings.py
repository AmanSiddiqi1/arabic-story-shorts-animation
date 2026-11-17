#!/usr/bin/env python3
"""Checks that every word-timing file matches the recording it was made from, reading the MP3s through Library/media.py (local folders by default).
  python3 tools/media/check_timings.py
- <name>.mp3.words.json (anywhere in the repository): the MP3 must resolve; words in time order; the last word ends
  inside the recording and covers at least 80 % of it.
- Animations/<story>/timing.json: the same against the narration the story's build uses."""
import json, pathlib, subprocess, sys
REPO = pathlib.Path(__file__).resolve().parents[2]; sys.path.insert(0, str(REPO / 'Library')); import media
dur = lambda p: float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)]))
bad = good = 0
def check(label, mp3, words):
    global bad, good
    if not mp3.exists(): print('MISSING MP3 ', label, '->', mp3); bad += 1; return
    D = dur(mp3); ends = [w['b'] for w in words]; starts = [w['a'] for w in words]
    ordered = all(x <= y + 1e-6 for x, y in zip(starts, starts[1:]))
    ok = words and ordered and ends[-1] <= D + 0.3 and ends[-1] >= 0.8 * D
    if ok: good += 1
    else: bad += 1; print('MISMATCH    ', label, f'mp3 {D:.2f} s, last word ends {ends[-1] if ends else None}, in order {ordered}')
for j in sorted(REPO.rglob('*.mp3.words.json')):
    if '.git' in j.parts: continue
    segs = json.loads(j.read_text(encoding='utf8')); words = [w for s in segs for w in s.get('w', [])]
    check(j.relative_to(REPO).as_posix(), media.resolve(j.with_name(j.name[:-len('.words.json')])), words)
for t in sorted((REPO / 'Animations').glob('*/timing.json')):
    cfg = json.loads((t.parent / 'story.json').read_text(encoding='utf8')) if (t.parent / 'story.json').exists() else {}
    tj = json.loads(t.read_text(encoding='utf8')); words = tj.get('words') or [{'a': c['a'], 'b': c['b']} for c in tj.get('chunks', [])]
    check(t.relative_to(REPO).as_posix(), media.resolve(t.parent / cfg.get('narration', 'narration.mp3')), words)
print(f'{good} timing file(s) match their recordings, {bad} problem(s)'); sys.exit(1 if bad else 0)
