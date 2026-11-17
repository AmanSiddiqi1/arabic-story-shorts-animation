"""Validates a creative plan (Animations/<ID>/planning/creative_plan.json + .md) against the story's narration timeline.

Errors make the plan invalid; warnings are recorded but do not block. Schema: production/schema/creative_plan.md.
"""
import json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import arabic, db

REPO = db.REPO
SHOTS = {'wide', 'medium', 'close', 'extreme-close', 'two-shot', 'over-shoulder', 'insert', 'establishing', 'full'}
MOVES = {'static', 'push-in', 'pull-out', 'pan', 'tilt', 'track', 'shake', 'whip', 'zoom', 'drift', 'crane'}
BEAT_KINDS = {'setup', 'inciting', 'rising', 'turn', 'surprise', 'climax', 'resolution', 'moral', 'comic', 'suspense', 'emotion', 'reveal'}
ASSET_TYPES = {'character', 'pose', 'expression', 'set', 'prop', 'effect', 'motion', 'camera'}
TRANSITIONS = {'cut', 'wipe', 'iris', 'later', 'zoom', 'match-cut', 'dissolve', 'whip', 'page-turn', 'none'}
DASHES = re.compile('[–—]')

def library_names():
    names = set()
    for f in list((REPO / 'Library').glob('*/*.js')) + list((REPO / 'Library').glob('*.js')):
        names |= set(re.findall(r'^(?:async )?function ([A-Za-z0-9_]+)', f.read_text(encoding='utf8'), re.M))
    return names

def check(sid, write_report=True):
    d = REPO / 'Animations' / sid / 'planning'
    E, W = [], []
    tl = json.loads((d / 'inputs' / 'timeline.json').read_text(encoding='utf8'))
    pj, pm = d / 'creative_plan.json', d / 'creative_plan.md'
    if not pj.exists(): return ['creative_plan.json missing'], W, None
    try: P = json.loads(pj.read_text(encoding='utf8'))
    except Exception as e: return [f'creative_plan.json is not valid JSON: {e}'], W, None
    if not pm.exists() or pm.stat().st_size < 3000: E.append('creative_plan.md missing or under 3 KB')
    else:
        md = pm.read_text(encoding='utf8').lower()
        for h in ['narrative', 'storyboard', 'acting', 'camera', 'asset', 'implementation']:
            if h not in md: E.append(f"creative_plan.md has no section mentioning '{h}'")
    words = [(arabic.norm(w[0]), w[1], w[2]) for p in tl['paragraphs'] for w in p['words']]
    dur, last = tl['duration'], tl['last_word_end']
    req = {'schema': str, 'story_id': str, 'title': str, 'duration': (int, float), 'end_hold': (int, float), 'logline': str, 'moral': str,
           'tone': str, 'beats': list, 'cast': list, 'sets': list, 'props': list, 'scenes': list, 'ending': dict, 'new_assets': list,
           'implementation_notes': list, 'warnings': list}
    for k, t in req.items():
        if not isinstance(P.get(k), t): E.append(f'top-level "{k}" missing or wrong type')
    if E and any('top-level' in e for e in E): return E, W, P
    if P['story_id'] != sid: E.append(f"story_id {P['story_id']} != {sid}")
    if abs(P['duration'] - dur) > 0.06: E.append(f"duration {P['duration']} != MP3 duration {dur}")
    MAXF = 180.0  # series rule: a finished film is at most 3 minutes
    need = min(1.5, round(MAXF - dur, 2))
    if not need - 0.01 <= P['end_hold'] <= 6: E.append(f'end_hold must be {need}..6 s (THE END held after the audio; shorter only to fit the 3-minute limit)')
    if dur + P['end_hold'] > MAXF + 0.01: E.append(f'film runs {dur + P["end_hold"]:.2f} s; the limit is {MAXF:.0f} s (3 minutes): end_hold <= {MAXF - dur:.2f}')

    def cue_ok(cue, where):
        if not isinstance(cue, dict) or not isinstance(cue.get('word'), str) or not isinstance(cue.get('t'), (int, float)):
            E.append(f'{where}: cue must be {{"word": <Arabic script word>, "t": <its start time>}}'); return
        n = arabic.norm(cue['word'].split()[0]) if cue['word'].split() else ''
        near = [w for w in words if abs(w[1] - cue['t']) <= 0.5]
        if not any(w[0] == n or (n and arabic._sim(n, w[0]) > 0.5) for w in near):
            cands = ', '.join(f'{w[1]:.2f}' for w in words if w[0] == n)[:80]
            E.append(f"{where}: cue word '{cue['word']}' is not spoken at {cue['t']:.2f} s (±0.5)" + (f'; it is spoken at {cands}' if cands else '; not found in the script'))

    ids = {k: {x.get('id') for x in P[k] if isinstance(x, dict)} for k in ('cast', 'sets', 'props')}
    libs = library_names()
    for k in ('cast', 'sets', 'props'):
        for x in P[k]:
            if not isinstance(x, dict) or not x.get('id'): E.append(f'{k}: every entry needs an id'); continue
            lib = x.get('library')
            if lib and str(lib).split('(')[0].split('.')[0].split()[0] not in libs:
                W.append(f"{k} {x['id']}: library '{lib}' is not a Library function (treat as new?)")
            if not lib and not x.get('new'): W.append(f"{k} {x['id']}: no library function and not marked new")
    for i, b in enumerate(P['beats']):
        if b.get('kind') not in BEAT_KINDS: W.append(f'beat {i}: kind {b.get("kind")} not in {sorted(BEAT_KINDS)}')
        cue_ok(b.get('cue'), f"beat {b.get('id', i)}")
    S = P['scenes']
    if not S: E.append('no scenes')
    else:
        if S[0].get('start', 1) > 0.05: E.append('first scene must start at 0')
        if S[-1].get('end', 0) < last - 0.05: E.append(f'last scene ends {S[-1].get("end")} before the last word ({last:.2f})')
        if S[-1].get('end', 0) > dur + P['end_hold'] + 0.1: E.append('last scene runs past duration + end_hold')
        if S[-1].get('end', 0) > 180.01: E.append('last scene ends after 180 s (3-minute limit)')
    covered = set(); n_actions = 0; moves = 0
    for i, s in enumerate(S):
        w = f"scene {s.get('id', i)}"
        for k, t in {'id': str, 'start': (int, float), 'end': (int, float), 'paragraphs': list, 'set': str, 'cast': list, 'summary': str,
                     'camera': dict, 'composition': str, 'actions': list, 'lettering': list, 'sfx': list, 'transition_out': dict}.items():
            if not isinstance(s.get(k), t): E.append(f'{w}: "{k}" missing or wrong type')
        if any(e.startswith(w + ':') for e in E): continue
        if s['end'] <= s['start']: E.append(f'{w}: end <= start')
        if i and abs(s['start'] - S[i - 1]['end']) > 0.06: E.append(f'{w}: starts {s["start"]} but previous scene ends {S[i-1]["end"]} (scenes must be contiguous)')
        if s['end'] - s['start'] > 30: W.append(f'{w}: {s["end"]-s["start"]:.1f} s long; consider splitting (something should change every 1-2 s)')
        covered |= set(s['paragraphs'])
        if s['set'] not in ids['sets']: E.append(f"{w}: set '{s['set']}' not declared in sets")
        for c in s['cast']:
            if c not in ids['cast']: E.append(f"{w}: cast '{c}' not declared in cast")
        cam = s['camera']
        if cam.get('shot') not in SHOTS: E.append(f"{w}: camera.shot must be one of {sorted(SHOTS)}")
        if cam.get('move') not in MOVES: E.append(f"{w}: camera.move must be one of {sorted(MOVES)}")
        if cam.get('move') != 'static': moves += 1
        if not s['actions']: E.append(f'{w}: no actions')
        for j, a in enumerate(s['actions']):
            aw = f'{w} action {j}'
            if not isinstance(a.get('t'), (int, float)) or not a.get('who') or not a.get('action') or not isinstance(a.get('acting'), str):
                E.append(f'{aw}: needs t, who, action, acting'); continue
            if not s['start'] - 0.06 <= a['t'] <= s['end'] + 0.06: E.append(f'{aw}: t {a["t"]} outside the scene {s["start"]}-{s["end"]}')
            if a['who'] not in ids['cast'] | ids['props'] | {'camera', 'fx', 'set', 'lettering'}: E.append(f"{aw}: who '{a['who']}' is not a cast/prop id or camera/fx/set")
            if 'cue' in a:
                cue_ok(a['cue'], aw)
                if isinstance(a.get('cue'), dict) and isinstance(a['cue'].get('t'), (int, float)) and abs(a['t'] - a['cue']['t']) > 1.5:
                    E.append(f'{aw}: t {a["t"]} is more than 1.5 s from its cue word ({a["cue"]["t"]})')
            n_actions += 1
        for L in s['lettering']:
            if DASHES.search(str(L.get('text', ''))): E.append(f"{w}: lettering '{L.get('text')}' contains an en/em dash")
            if not isinstance(L.get('t'), (int, float)): E.append(f'{w}: lettering needs t')
        for x in s['sfx']:
            t = x.get('t')
            if not isinstance(t, (int, float)): E.append(f'{w}: sfx needs t'); continue
            hit = [wd for wd in words if wd[1] + 0.06 < t < wd[2] - 0.06]
            if hit: E.append(f'{w}: sfx {x.get("kind")} at {t:.2f} s falls inside a spoken word ({hit[0][1]:.2f}-{hit[0][2]:.2f}); place effects in pauses')
        tr = s['transition_out']
        if str(tr.get('type', '')).lower() not in TRANSITIONS: E.append(f"{w}: transition_out.type must be one of {sorted(TRANSITIONS)}")
    nsfx = sum(len(s.get('sfx', [])) for s in S if isinstance(s, dict))
    nlet = sum(len(s.get('lettering', [])) for s in S if isinstance(s, dict))
    if nlet > 20: W.append(f'{nlet} lettering items; keep to the lettering diet (about 20 or fewer; labels only on key beats)')
    if nsfx > 16: W.append(f'{nsfx} sound effects; effects must be sparse and quiet (aim for 16 or fewer, only in real pauses)')
    allp = {p['n'] for p in tl['paragraphs']}
    if covered != allp: E.append(f'scenes cover paragraphs {sorted(covered)}, script has {sorted(allp)}')
    if n_actions < dur / 3.5: E.append(f'only {n_actions} actions for {dur:.0f} s; something should change every 1-2 s (aim for >= {int(dur/2.5)})')
    if not any(str(s.get('transition_out', {}).get('type', '')).lower() == 'later' for s in S if isinstance(s, dict)):
        W.append('no LATER transition (one is expected when time passes)')
    sub = P.get('subtitles')
    if sub is None: W.append('no "subtitles" chunk marks (the animator will have to chunk the subtitles)')
    else:
        script = json.loads((REPO / 'Animations' / sid / 'story' / 'script.json').read_text(encoding='utf8'))['paragraphs']
        byn = {x.get('p'): x for x in sub if isinstance(x, dict)}
        for sp in script:
            x = byn.get(sp['n'])
            if not x: E.append(f"subtitles: paragraph {sp['n']} missing"); continue
            ar, en = str(x.get('ar', '')), str(x.get('en', ''))
            if ar.replace('|', ' ').split() != sp['ar'].split(): E.append(f"subtitles P{sp['n']}: Arabic is not the verbatim script with | marks")
            if en.replace('|', ' ').split() != sp['en'].split(): E.append(f"subtitles P{sp['n']}: English is not the verbatim translation with | marks")
            na, ne = ar.count('|') + 1, en.count('|') + 1
            if na != ne or not 2 <= na <= 4: E.append(f"subtitles P{sp['n']}: {na} Arabic and {ne} English chunks (need the same count, 2-4)")
    for a in P['new_assets']:
        if a.get('type') not in ASSET_TYPES: E.append(f"new_assets: type {a.get('type')} not in {sorted(ASSET_TYPES)}")
        if not a.get('name') or not a.get('description') or not a.get('implementation'): E.append('new_assets: each needs name, description, implementation')
    if write_report:
        (d / 'validation.json').write_text(json.dumps({'story_id': sid, 'checked': db.now(), 'valid': not E, 'errors': E, 'warnings': W,
            'scenes': len(S), 'actions': n_actions}, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    return E, W, P

if __name__ == '__main__':
    e, w, _ = check(sys.argv[1])
    for x in e: print('ERROR  ', x)
    for x in w: print('warning', x)
    print('VALID' if not e else f'INVALID ({len(e)} errors)'); sys.exit(1 if e else 0)
