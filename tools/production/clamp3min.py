#!/usr/bin/env python3
"""Caps an accepted plan at the 3-minute series limit (180.0 s) without re-planning: end_hold = min(end_hold, 180 - duration);
any scene end, action, lettering, sfx or ending time past 180 s is pulled to 179.9 s. Records the change in creative_plan.md
and planning_metadata.json, then re-validates.   python3 tools/production/clamp3min.py ID [ID...]"""
import json, math, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db, plancheck
MAXF = 180.0
for sid in sys.argv[1:]:
    d = db.REPO / 'Animations' / sid / 'planning'; pj = d / 'creative_plan.json'
    P = json.loads(pj.read_text(encoding='utf8')); dur = P['duration']; old = P['end_hold']
    P['end_hold'] = min(old, math.floor((MAXF - dur) * 100) / 100); moved = 0
    cap = lambda t: min(t, MAXF - 0.1)
    for s in P['scenes']:
        if s['end'] > MAXF: s['end'] = round(dur + P['end_hold'], 2); moved += 1
        for k in ('actions', 'lettering', 'sfx'):
            for x in s.get(k, []):
                for f in ('t', 'end'):
                    if isinstance(x.get(f), (int, float)) and x[f] > MAXF - 0.1: x[f] = cap(x[f]); moved += 1
        tr = s.get('transition_out', {})
        if isinstance(tr.get('t'), (int, float)) and tr['t'] > MAXF: tr['t'] = round(dur + P['end_hold'], 2)
    if P.get('ending', {}).get('t', 0) > MAXF - 0.1: P['ending']['t'] = cap(P['ending']['t']); moved += 1
    P.setdefault('warnings', []).append(f'Coordinator 2026-11-16: capped at the 3-minute limit (end_hold {old} -> {P["end_hold"]} s; {moved} times past 180 s pulled to 179.9).')
    pj.write_text(json.dumps(P, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    md = d / 'creative_plan.md'
    md.write_text(md.read_text(encoding='utf8') + f'\n\n## Coordinator adjustment (2026-11-16): 3-minute limit\nThe film must be at most 180.0 s. end_hold changed from {old} s to {P["end_hold"]} s (film {dur + P["end_hold"]:.2f} s); {moved} cue times after 180 s were pulled to 179.9 s. THE END appears under the closing words where needed. Nothing else changed.\n', encoding='utf8')
    E, W, _ = plancheck.check(sid)
    mp = d / 'planning_metadata.json'
    if mp.exists():
        M = json.loads(mp.read_text(encoding='utf8')); M['coordinator_adjustment'] = f'3-minute cap: end_hold {old} -> {P["end_hold"]}'; M['validation_warnings'] = W
        mp.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    print(sid, 'VALID' if not E else E, f'film {dur + P["end_hold"]:.2f} s')
