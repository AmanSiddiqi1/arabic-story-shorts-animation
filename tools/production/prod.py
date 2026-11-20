#!/usr/bin/env python3
"""Arabic Story Shorts production CLI. The SQLite database (production/production.db) is the production record;
the coordinator conversation uses these commands instead of remembering state.

  prod.py import                         read Script_Updated.xlsx, match MP3 + .words.json, write story inputs
  prod.py status [ID]                    progress summary, or one story in detail
  prod.py next plan|animate [--n N] [--ids A,B]  claim the next eligible stories for a stage (respects limits and pauses)
  prod.py running                        tasks in progress (what the agents are doing)
  prod.py agent ID STAGE AGENT_ID        record the agent id working on a claimed task
  prod.py accept-plan ID                 verify the agent's model, validate the plan, write planning_metadata.json
  prod.py fail ID STAGE "reason"         mark a running task failed (it is retried until max attempts)
  prod.py release ID STAGE               put a stuck running task back in the queue (no agent alive for it)
  prod.py limit-scan AGENT_ID            does the agent's transcript end in a usage / rate / credit limit error?
  prod.py interrupted ID STAGE "why"     agent stopped by a limit: keep partial files in planning/partial/, story stays eligible,
                                         not counted as a failed attempt
  prod.py stale                          plans whose script / MP3 / timings changed since planning
  prod.py model AGENT_ID                 models recorded in a subagent's transcript
  prod.py config [KEY VALUE]             limits and pauses (max_fable, pause_planning, ...)
  prod.py export | restore               write production/state.json (Git) | rebuild the .db from it
  prod.py review-queue                   stories waiting for the owner's review
  prod.py done ID STAGE [VERSION]        finish animate/revise/fix (model + QC PASS) or review/review2 (model + review file)
  prod.py finalize ID                    copy the last passing render to MP4s/ (never overwrites); approval=pending
  prod.py approve ID | reject ID "why"   the owner's decision on a finished film
  prod.py assets                         rebuild production/planned_assets.md from all validated plans
  Phase 2 (v1-only campaign):
  prod.py board [--all]                  one line per story: its production state (see STATES)
  prod.py next implement --n K           claim stories for code-only implementation (Implementation complete - Awaiting render)
  python3 tools/production/implcheck.py ID   code-only validation + render_job.json (needed by done ID implement)
  python3 tools/production/render_queue.py   deferred renders + QC for stories awaiting render (no model calls)
  prod.py block ID STAGE "why"           flag a story for later attention (plan ambiguity, bad input); next skips it
  prod.py tokens AGENT_ID                token usage recorded in a subagent's transcript
  prod.py meter PCT RESETS ["note"]      log the account's weekly usage % (from the app's get_usage) for budgeting
  prod.py budget                         measured cost per v1 and how many new stories may start now
"""
import glob, json, os, pathlib, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db

REPO = db.REPO
MODELS = {'fable': 'claude-fable-5-2', 'opus': 'claude-opus-5-5'}
STAGE_MODEL = {'plan': 'fable', 'review': 'fable', 'review2': 'fable', 'animate': 'opus', 'revise': 'opus', 'fix': 'opus', 'library': 'opus', 'implement': 'opus'}
LIMIT_KEY = {'fable': 'max_fable', 'opus': 'max_opus'}

def transcripts_dir():
    slug = str(REPO).replace('/', '-').replace(' ', '-')
    return pathlib.Path.home() / '.claude' / 'projects' / slug

def agent_models(agent_id):
    files = glob.glob(str(transcripts_dir() / '*' / 'subagents' / f'agent-{agent_id}.jsonl'))
    if not files: return None, None
    models = {}
    for line in open(files[0], encoding='utf8'):
        try: r = json.loads(line)
        except ValueError: continue
        m = (r.get('message') or {}).get('model') if r.get('type') == 'assistant' else None
        if m and m != '<synthetic>': models[m] = models.get(m, 0) + 1
    return models, files[0]

def library_rev():
    try: return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD:Library'], cwd=REPO, text=True).strip()
    except Exception: return 'unknown'

def has_valid_plan(c, sid):
    return c.execute("SELECT 1 FROM plans WHERE story_id=? AND status='validated'", (sid,)).fetchone() is not None

def cmd_status(c, a):
    if a:
        s = c.execute('SELECT * FROM stories WHERE id=?', (a[0],)).fetchone()
        if not s: sys.exit('unknown story')
        print(json.dumps(dict(s), ensure_ascii=False, indent=1))
        for t in ('plans', 'tasks', 'renders', 'reviews'):
            for r in c.execute(f'SELECT * FROM {t} WHERE story_id=?', (a[0],)): print(t, json.dumps({k: r[k] for k in r.keys() if k not in ('new_assets',)}, ensure_ascii=False)[:400])
        return
    q = lambda sql, *p: c.execute(sql, p).fetchone()[0]
    el = q('SELECT count(*) FROM stories WHERE eligible=1')
    print(f"stories: {q('SELECT count(*) FROM stories')} ({q('SELECT count(*) FROM stories WHERE completed_before=1')} approved earlier, {el} eligible)")
    for st in ('ok', 'warn', 'blocked'):
        print(f"  inputs {st:8s} {q('SELECT count(*) FROM stories WHERE eligible=1 AND input_status=?', st)}")
    nv = q("SELECT count(DISTINCT story_id) FROM plans WHERE status='validated'")
    print(f"plans validated: {nv} / {el}")
    for r in c.execute("SELECT stage, status, count(*) n FROM tasks GROUP BY stage, status ORDER BY stage, status"):
        print(f"  task {r['stage']:8s} {r['status']:12s} {r['n']}")
    npend = q("SELECT count(*) FROM stories WHERE approval='pending'")
    print(f"renders: {q('SELECT count(*) FROM renders')}; awaiting owner review: {npend}")
    pz = [k for k in ('pause_planning', 'pause_production', 'pause_render') if db.cfg(c, k) == '1']
    if pz: print('PAUSED:', ', '.join(pz))

def cmd_next(c, a):
    stage = a[0]; n = int(a[a.index('--n') + 1]) if '--n' in a else 1
    model = STAGE_MODEL[stage]
    if stage == 'plan' and db.cfg(c, 'pause_planning') == '1': sys.exit('planning is paused (prod.py config pause_planning 0)')
    if stage != 'plan' and db.cfg(c, 'pause_production') == '1': sys.exit('production is paused')
    busy = c.execute("SELECT count(*) FROM tasks WHERE status='running' AND model=?", (model,)).fetchone()[0]
    room = int(db.cfg(c, LIMIT_KEY[model])) - busy
    if room <= 0: sys.exit(f'{model} limit reached ({busy} running)')
    maxa = int(db.cfg(c, 'max_plan_attempts'))
    out = []
    for s in c.execute("SELECT id FROM stories WHERE eligible=1 AND input_status IN ('ok','warn') ORDER BY CASE WHEN id LIKE 'KD-%' THEN 0 ELSE 1 END, id"):
        if len(out) >= min(n, room): break
        sid = s['id']
        hold = c.execute("SELECT value FROM config WHERE key='hold_prefixes'").fetchone()
        if hold and hold[0] and any(sid.startswith(x) for x in hold[0].split(',')): continue
        only = c.execute("SELECT value FROM config WHERE key='only_ids'").fetchone()
        if only and only[0] and sid not in only[0].split(','): continue
        if '--ids' in a and sid not in a[a.index('--ids') + 1].split(','): continue
        same = ('animate', 'implement') if stage in ('animate', 'implement') else (stage,)
        if c.execute(f"SELECT 1 FROM tasks WHERE story_id=? AND stage IN ({','.join('?' * len(same))}) AND status IN ('running','done','blocked')", (sid, *same)).fetchone(): continue
        if c.execute("SELECT 1 FROM stories WHERE id=? AND (approval='approved' OR completed_before=1)", (sid,)).fetchone(): continue
        if stage == 'plan' and has_valid_plan(c, sid): continue
        if stage != 'plan' and not has_valid_plan(c, sid): continue
        tries = c.execute("SELECT count(*) FROM tasks WHERE story_id=? AND stage=? AND status='failed'", (sid, stage)).fetchone()[0]
        if tries >= maxa: continue
        c.execute("INSERT INTO tasks (story_id, stage, status, model, attempt, started) VALUES (?,?,?,?,?,?)", (sid, stage, 'running', model, tries + 1, db.now()))
        out.append(sid)
    c.commit()
    for sid in out: db.log(c, sid, 'claim', f'{stage} claimed ({model})')
    print(' '.join(out) if out else 'nothing eligible')

def running_task(c, sid, stage):
    r = c.execute("SELECT * FROM tasks WHERE story_id=? AND stage=? AND status='running' ORDER BY id DESC", (sid, stage)).fetchone()
    if not r: sys.exit(f'no running {stage} task for {sid}')
    return r

def cmd_agent(c, a):
    sid, stage, aid = a; t = running_task(c, sid, stage)
    c.execute('UPDATE tasks SET agent_id=? WHERE id=?', (aid, t['id'])); c.commit(); db.log(c, sid, 'agent', f'{stage} agent {aid}')

def cmd_accept_plan(c, a):
    import plancheck
    sid = a[0]; t = running_task(c, sid, 'plan')
    if not t['agent_id']: sys.exit('record the agent id first: prod.py agent ID plan AGENT_ID')
    models, path = agent_models(t['agent_id'])
    if models is None: sys.exit(f"no transcript found for agent {t['agent_id']}; model cannot be verified")
    want = MODELS['fable']
    if set(models) != {want}:
        c.execute("UPDATE tasks SET status='failed', finished=?, notes=? WHERE id=?", (db.now(), f'model mismatch: {models}', t['id'])); c.commit()
        db.log(c, sid, 'model-mismatch', json.dumps(models)); sys.exit(f'MODEL MISMATCH: transcript shows {models}, expected only {want}; plan not accepted')
    E, W, P = plancheck.check(sid)
    if E:
        print('\n'.join('ERROR ' + e for e in E)); sys.exit(f'plan invalid ({len(E)} errors); task stays running so the agent can fix it, or use prod.py fail')
    s = c.execute('SELECT * FROM stories WHERE id=?', (sid,)).fetchone()
    tl = json.loads((REPO / 'Animations' / sid / 'planning' / 'inputs' / 'timeline.json').read_text(encoding='utf8'))
    for k, col in (('script_sha256', 'script_sha'), ('mp3_sha256', 'mp3_sha'), ('words_sha256', 'words_sha')):
        if tl[k] != s[col]: sys.exit(f'timeline inputs out of date ({k}); rerun prod.py import')
    v = (c.execute('SELECT max(version) FROM plans WHERE story_id=?', (sid,)).fetchone()[0] or 0) + 1
    n_act = sum(len(x['actions']) for x in P['scenes'])
    meta = {'story_id': sid, 'title': s['title_en'], 'plan_version': v, 'status': 'validated', 'planned': db.now(),
            'model': want, 'model_verified_from': os.path.basename(path), 'agent_id': t['agent_id'], 'model_messages': models,
            'script': {'source': 'Spreadsheets/Script_Updated.xlsx', 'sha256': s['script_sha'], 'paragraphs': s['n_paragraphs'], 'segments': json.loads(s['segments'])},
            'mp3': {'file': f"Audio Files/Final Done/{s['mp3_file']}", 'sha256': s['mp3_sha'], 'duration': s['mp3_duration']},
            'timing': {'file': f"Audio Files/Final Done/{s['words_file']}", 'sha256': s['words_sha'], 'manifest_status': s['words_status'], 'script_match': s['match_ratio']},
            'library_rev': library_rev(), 'scenes': len(P['scenes']), 'actions': n_act,
            'new_assets': [{'type': x.get('type'), 'name': x.get('name'), 'effort': x.get('effort')} for x in P['new_assets']],
            'input_notes': s['input_notes'], 'validation_warnings': W, 'plan_warnings': P.get('warnings', [])}
    d = REPO / 'Animations' / sid / 'planning'
    (d / 'planning_metadata.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    c.execute('INSERT INTO plans VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (sid, v, 'validated', f'Animations/{sid}/planning/creative_plan.md',
              f'Animations/{sid}/planning/creative_plan.json', want, t['agent_id'], db.now(), s['script_sha'], s['mp3_sha'], s['words_sha'],
              meta['library_rev'], len(P['scenes']), n_act, json.dumps(meta['new_assets'], ensure_ascii=False), json.dumps(W, ensure_ascii=False)))
    c.execute("UPDATE tasks SET status='done', finished=?, outputs=? WHERE id=?", (db.now(), f'plan v{v}', t['id'])); c.commit()
    db.log(c, sid, 'plan-accepted', f'v{v} {len(P["scenes"])} scenes {n_act} actions {len(W)} warnings')
    cmd_assets(c)
    print(f'ACCEPTED {sid} plan v{v}: {len(P["scenes"])} scenes, {n_act} actions, {len(P["new_assets"])} new assets, {len(W)} warnings; model {want} verified')

def cmd_fail(c, a):
    sid, stage, why = a; t = running_task(c, sid, stage)
    c.execute("UPDATE tasks SET status='failed', finished=?, notes=? WHERE id=?", (db.now(), why, t['id'])); c.commit(); db.log(c, sid, 'fail', f'{stage}: {why}')

def cmd_release(c, a):
    sid, stage = a; t = running_task(c, sid, stage)
    c.execute("UPDATE tasks SET status='released', finished=?, notes='released for retry' WHERE id=?", (db.now(), t['id'])); c.commit()
    db.log(c, sid, 'release', stage)

LIMIT_WORDS = ('limit', 'usage limit', 'rate limit', 'rate_limit', 'credit', 'quota', 'overloaded', 'insufficient', 'exceeded', ' 429', ' 529', 'billing')

def limit_scan(agent_id):
    """(hit, info): whether the transcript's last records include an API error message about a usage/rate/credit limit"""
    files = glob.glob(str(transcripts_dir() / '*' / 'subagents' / f'agent-{agent_id}.jsonl'))
    if not files: return None, 'no transcript'
    errs = []
    for line in open(files[0], encoding='utf8').read().splitlines()[-12:]:
        try: r = json.loads(line)
        except ValueError: continue
        if r.get('isApiErrorMessage') or r.get('error'):
            m = r.get('message') or {}; cont = m.get('content') if isinstance(m, dict) else m
            errs.append(json.dumps(cont if cont else r.get('error'), ensure_ascii=False)[:300])
    if not errs: return False, 'no API error in the last records'
    txt = ' '.join(errs).lower()
    return any(w in txt for w in LIMIT_WORDS), errs[-1]

def cmd_limit_scan(c, a):
    hit, info = limit_scan(a[0]); print('LIMIT' if hit else ('UNKNOWN' if hit is None else 'no limit error'), info)

def cmd_interrupted(c, a):
    import shutil
    sid, stage, why = a; t = running_task(c, sid, stage)
    d = REPO / 'Animations' / sid / 'planning'; kept = []
    if stage == 'plan':
        part = d / 'partial' / db.now().replace(':', '')
        for f in ('creative_plan.json', 'creative_plan.md', 'validation.json'):
            if (d / f).exists(): part.mkdir(parents=True, exist_ok=True); shutil.move(str(d / f), str(part / f)); kept.append(f)
    c.execute("UPDATE tasks SET status='interrupted', finished=?, notes=? WHERE id=?", (db.now(), why + (f'; partial kept: {kept}' if kept else ''), t['id'])); c.commit()
    db.log(c, sid, 'interrupted', f'{stage}: {why}; kept {kept}')
    print(f'INTERRUPTED {sid} {stage}: story stays eligible; partial files kept: {kept or "none"}')

def cmd_running(c, a):
    rows = c.execute("SELECT * FROM tasks WHERE status='running' ORDER BY started").fetchall()
    if not rows: print('no tasks running')
    for r in rows: print(f"{r['story_id']:8s} {r['stage']:8s} {r['model']:6s} agent={r['agent_id'] or '-'} pid={r['pid'] or '-'} since {r['started']}")

def cmd_stale(c, a):
    n = 0
    for p in c.execute("SELECT p.*, s.script_sha cs, s.mp3_sha cm, s.words_sha cw FROM plans p JOIN stories s ON s.id=p.story_id WHERE p.status='validated'"):
        why = [k for k, x, y in (('script', p['script_sha'], p['cs']), ('mp3', p['mp3_sha'], p['cm']), ('timings', p['words_sha'], p['cw'])) if x != y]
        if why:
            n += 1; print(f"STALE {p['story_id']} v{p['version']}: {', '.join(why)} changed since planning")
            if '--mark' in a: c.execute("UPDATE plans SET status='stale' WHERE story_id=? AND version=?", (p['story_id'], p['version']))
    c.commit(); print(f'{n} stale plan(s)')

def cmd_config(c, a):
    if len(a) == 2: c.execute('INSERT OR REPLACE INTO config VALUES (?,?)', a); c.commit(); db.log(c, None, 'config', f'{a[0]}={a[1]}')
    for r in c.execute('SELECT * FROM config ORDER BY key'): print(f"{r['key']:20s} {r['value']}")

def verify_model(c, t, stage):
    want = MODELS[STAGE_MODEL[stage]]
    if not t['agent_id']: sys.exit(f'record the agent id first: prod.py agent ID {stage} AGENT_ID')
    models, path = agent_models(t['agent_id'])
    if models is None: sys.exit(f"no transcript for agent {t['agent_id']}; model cannot be verified")
    if set(models) != {want}:
        c.execute("UPDATE tasks SET status='failed', finished=?, notes=? WHERE id=?", (db.now(), f'model mismatch: {models}', t['id'])); c.commit()
        sys.exit(f'MODEL MISMATCH: {models}, expected only {want}')
    return want

def cmd_done(c, a):
    sid, stage = a[0], a[1]; t = running_task(c, sid, stage); want = verify_model(c, t, stage)
    if stage == 'implement':
        d = REPO / 'Animations' / sid; f = d / 'qc' / 'implcheck.json'
        if not f.exists() or not (d / 'render_job.json').exists(): sys.exit(f'run python3 tools/production/implcheck.py {sid} first')
        r = json.loads(f.read_text(encoding='utf8'))
        if r['status'] != 'PASS': sys.exit(f"implcheck is {r['status']}: {r['errors'][:3]}")
        out = f"Implementation Complete - Awaiting Render (film {r.get('film_duration')} s, est. render {r.get('est_render_min')} min)"
        tk = agent_tokens(t['agent_id'])
        if tk: c.execute('UPDATE tasks SET notes=? WHERE id=?', ((t['notes'] + '; ' if t['notes'] else '') + 'tokens ' + json.dumps(tk), t['id']))
    elif stage in ('animate', 'revise', 'fix'):
        ver = a[2] if len(a) > 2 else {'animate': 'v1', 'revise': 'v2', 'fix': 'v3'}[stage]
        r = c.execute('SELECT * FROM renders WHERE story_id=? AND version=?', (sid, ver)).fetchone()
        if not r: sys.exit(f'no QC record for {ver}: python3 tools/production/qc.py {sid} <mp4> --record {ver}')
        if r['status'] != 'PASS': sys.exit(f'{ver} QC is {r["status"]}: {json.loads(r["qc"]).get("fails")}')
        out = f'{ver} {r["path"]}'
        tk = agent_tokens(t['agent_id'])
        if tk: c.execute('UPDATE tasks SET notes=? WHERE id=?', ((t['notes'] + '; ' if t['notes'] else '') + 'tokens ' + json.dumps(tk), t['id']))
        if stage == 'animate': out += ' | Initial Animation Complete - Awaiting Creative Review'
    else:
        n = {'review': 1, 'review2': 2}[stage]; f = REPO / 'Animations' / sid / 'review' / f'fable_review_{n}.md'
        if not f.exists(): sys.exit(f'{f} missing')
        txt = f.read_text(encoding='utf8'); vl = next((l for l in txt.splitlines() if l.strip().lower().startswith('verdict:')), txt[:600]); verdict = next((v for v in ('REVISE', 'PASS WITH NOTES', 'PASS') if v in vl), 'UNKNOWN')
        c.execute('INSERT OR REPLACE INTO reviews VALUES (?,?,?,?,?,?,?)', (sid, n, want, t['agent_id'], str(f.relative_to(REPO)), verdict, db.now()))
        out = f'review {n}: {verdict}'
    c.execute("UPDATE tasks SET status='done', finished=?, outputs=? WHERE id=?", (db.now(), out, t['id'])); c.commit()
    db.log(c, sid, 'done', f'{stage} {out} ({want})'); print(f'DONE {sid} {stage}: {out}; model {want} verified')

def agent_tokens(agent_id):
    files = glob.glob(str(transcripts_dir() / '*' / 'subagents' / f'agent-{agent_id}.jsonl')) if agent_id else []
    if not files: return None
    t, seen = {'turns': 0}, set()
    for line in open(files[0], encoding='utf8'):
        try: r = json.loads(line)
        except ValueError: continue
        if r.get('type') != 'assistant': continue
        m = r.get('message') or {}; mid = m.get('id')
        if not mid or mid in seen: continue
        seen.add(mid); t['turns'] += 1
        for k, v in (m.get('usage') or {}).items():
            if isinstance(v, int): t[k] = t.get(k, 0) + v
    return t

def cmd_tokens(c, a): print(json.dumps(agent_tokens(a[0])))

STATES = ['Ready for implementation', 'Implementation underway', 'Implementation complete - Awaiting render', 'Rendering',
          'Rendered - Awaiting technical QC', 'Rendered - Awaiting creative review', 'Final approved', 'Blocked or interrupted',
          'Final MP4 - Awaiting owner review', 'Not planned', 'Creative review stage']

def story_stage(c, sid):
    """(state, detail) derived from tasks, renders and the render lock; state is one of STATES"""
    s = c.execute('SELECT * FROM stories WHERE id=?', (sid,)).fetchone()
    if s['completed_before'] or s['approval'] == 'approved': return 'Final approved', 'before production system' if s['completed_before'] else ''
    if s['approval'] == 'pending': return 'Final MP4 - Awaiting owner review', ''
    if not has_valid_plan(c, sid): return 'Not planned', ''
    T = {}
    for r in c.execute('SELECT * FROM tasks WHERE story_id=? ORDER BY id', (sid,)): T[r['stage']] = r
    for st in ('review2', 'revise', 'review'):
        if st in T: return 'Creative review stage', f"{st} {T[st]['status']}"
    lock = REPO / 'production' / 'render.lock'
    try: rendering = lock.exists() and json.loads(lock.read_text()).get('story') == sid
    except Exception: rendering = False
    if rendering: return 'Rendering', ''
    R = c.execute("SELECT * FROM renders WHERE story_id=? AND status!='SUPERSEDED' ORDER BY created DESC", (sid,)).fetchone()
    if not R and c.execute("SELECT 1 FROM renders WHERE story_id=? AND status='SUPERSEDED'", (sid,)).fetchone():
        return 'Implementation complete - Awaiting render', 're-render: English subtitles corrected'
    if R and R['status'] == 'PASS': return 'Rendered - Awaiting creative review', R['version']
    if R: return 'Blocked or interrupted', f"render {R['version']} QC {R['status']}: technical correction required"
    if any((REPO / 'Animations' / sid / 'renders').glob('*.mp4')): return 'Rendered - Awaiting technical QC', ''
    rq = T.get('render')
    if rq and rq['status'] in ('failed', 'interrupted'): return 'Blocked or interrupted', f"render {rq['status']} (correction required): {(rq['notes'] or '')[:40]}"
    w = T.get('implement') or T.get('animate')
    if not w: return 'Ready for implementation', ''
    if w['status'] == 'done': return 'Implementation complete - Awaiting render', w['stage']
    if w['status'] == 'running': return 'Implementation underway', w['stage']
    return 'Blocked or interrupted', f"{w['stage']} {w['status']}: {(w['notes'] or '')[:60]}"

def cmd_board(c, a):
    rows = c.execute('SELECT id, title_en FROM stories ORDER BY CASE WHEN id LIKE "KD-%" THEN 0 ELSE 1 END, id').fetchall()
    counts = {}
    for r in rows:
        st, det = story_stage(c, r['id']); counts[st] = counts.get(st, 0) + 1
        if '--all' in a or st not in ('Ready for implementation', 'Not planned'):
            print(f"{r['id']:8s} {st:42s} {det[:50]:50s} ({r['title_en']})")
    print('---'); [print(f'{counts[k]:4d}  {k}') for k in STATES if counts.get(k)]

def cmd_block(c, a):
    sid, stage, why = a
    r = c.execute("SELECT * FROM tasks WHERE story_id=? AND stage=? AND status='running' ORDER BY id DESC", (sid, stage)).fetchone()
    if r: c.execute("UPDATE tasks SET status='blocked', finished=?, notes=? WHERE id=?", (db.now(), why, r['id']))
    else: c.execute("INSERT INTO tasks (story_id, stage, status, model, started, finished, notes) VALUES (?,?,?,?,?,?,?)", (sid, stage, 'blocked', STAGE_MODEL[stage], db.now(), db.now(), why))
    c.commit(); db.log(c, sid, 'blocked', f'{stage}: {why}'); print(f'BLOCKED {sid} {stage}: {why}')

def v1_done(c):
    return c.execute("SELECT count(*) FROM tasks WHERE stage IN ('animate','implement') AND status='done'").fetchone()[0]

def cmd_meter(c, a):
    pct, resets = float(a[0]), a[1]; note = a[2] if len(a) > 2 else ''
    active = c.execute("SELECT count(*) FROM tasks WHERE status='running' AND model='opus'").fetchone()[0]
    c.execute('INSERT INTO usage_log (t, weekly_pct, resets, done_v1, active, note) VALUES (?,?,?,?,?,?)', (db.now(), pct, resets, v1_done(c), active, note)); c.commit()
    cmd_budget(c, [])

def cmd_budget(c, a):
    """cost per v1 in weekly-% from the meter log (campaign = rows since config campaign_start_meter); prior is a labelled estimate"""
    L = c.execute('SELECT * FROM usage_log ORDER BY id').fetchall()
    if not L: sys.exit('no meter readings yet: prod.py meter PCT RESETS')
    start = int(c.execute("SELECT value FROM config WHERE key='campaign_start_meter'").fetchone()[0]) if c.execute("SELECT 1 FROM config WHERE key='campaign_start_meter'").fetchone() else L[0]['id']
    L = [r for r in L if r['id'] >= start]; first, last = L[0], L[-1]
    prior = float(db.cfg(c, 'v1_cost_prior_pct')) if c.execute("SELECT 1 FROM config WHERE key='v1_cost_prior_pct'").fetchone() else 6.0
    work = (last['done_v1'] - first['done_v1']) + 0.5 * max(0, last['active'] - first['active'])   # finished stories + half credit for new active ones
    if last['resets'] != first['resets']:
        print('WEEKLY WINDOW RESET since campaign start: campaign budget was the previous window; new launches need the owner'); return
    used = last['weekly_pct'] - first['weekly_pct']
    if last['done_v1'] - first['done_v1'] >= 1 and work > 0: cost, how = used / work, f'measured: {used:.1f}% over {work:g} story-units'
    else: cost, how = prior, f'ESTIMATE (prior {prior}%/story; no story finished yet in this campaign)'
    rf = float(db.cfg(c, 'reserve_factor')); stop = float(db.cfg(c, 'stop_new_at_pct'))
    active = c.execute("SELECT count(*) FROM tasks WHERE status='running' AND model='opus'").fetchone()[0]
    left = 100 - last['weekly_pct']; reserve = active * cost * rf
    can = int(max(0, left - reserve) // (cost * rf)) if last['weekly_pct'] < stop else 0
    target = min(int(db.cfg(c, 'max_opus')), active + can)
    print(f"weekly {last['weekly_pct']:.0f}% (resets {last['resets']}); cost/v1 {cost:.2f}% [{how}]")
    print(f"active {active}; reserve for active {reserve:.1f}% (x{rf}); left {left:.0f}%; new stories affordable {can}; target concurrency {target}")
    if target > active: print(f'NEW LAUNCHES PERMITTED: {target - active}')
    elif can > 0: print('AT CONCURRENCY LIMIT: a new story may start when a slot frees')
    else: print('NO NEW LAUNCHES (wind-down: finish active stories only)')

def cmd_finalize(c, a):
    import shutil
    sid = a[0]; s = c.execute('SELECT * FROM stories WHERE id=?', (sid,)).fetchone()
    if s['completed_before']: sys.exit('approved earlier film; never finalised again')
    r = c.execute("SELECT * FROM renders WHERE story_id=? AND status='PASS' ORDER BY version DESC", (sid,)).fetchone()
    if not r: sys.exit('no passing render')
    src = REPO / r['path']; sys.path.insert(0, str(REPO / 'Library')); import style   # the story's style profile names the file
    dst = REPO / 'MP4s' / (style.story_film_name(REPO / 'Animations' / sid, title=s['title_en']) + '.mp4')
    if dst.exists(): sys.exit(f'refusing to overwrite {dst.name}')
    shutil.copy2(src, dst)
    c.execute("UPDATE stories SET approval='pending', updated=? WHERE id=?", (db.now(), sid)); c.commit()
    db.log(c, sid, 'finalized', f'{r["version"]} -> MP4s/{dst.name}'); print(f'FINAL {sid}: MP4s/{dst.name} (Production Complete, Pending User Review)')

def cmd_approve(c, a, val='approved'):
    c.execute('UPDATE stories SET approval=?, updated=? WHERE id=?', (val, db.now(), a[0])); c.commit(); db.log(c, a[0], val, ' '.join(a[1:]))

def cmd_assets(c, a=None):
    """aggregate new assets from validated plans so later planners reuse the same names"""
    agg = {}
    for p in c.execute("SELECT story_id, json_path FROM plans WHERE status='validated' ORDER BY story_id"):
        try: P = json.loads((REPO / p['json_path']).read_text(encoding='utf8'))
        except Exception: continue
        for x in P.get('new_assets', []):
            k = (x.get('type'), str(x.get('name')).strip())
            e = agg.setdefault(k, {'stories': [], 'desc': x.get('description', ''), 'impl': x.get('implementation', ''), 'reusable': x.get('reusable')})
            e['stories'].append(p['story_id'])
    L = ['# Planned new assets (generated by `prod.py assets`; do not edit by hand)', '',
         'New characters, sets, props, poses and techniques requested by validated creative plans. Planners: reuse a name here when it fits '
         'your story (same drawing, different costume/palette/pose) instead of inventing a new one. None of these exist in `Library/` yet '
         'unless the guide says so.', '']
    for t in ['character', 'set', 'prop', 'pose', 'expression', 'motion', 'effect', 'camera']:
        rows = sorted(((k[1], v) for k, v in agg.items() if k[0] == t), key=lambda r: (-len(r[1]['stories']), r[0].lower()))
        if not rows: continue
        L += [f'## {t} ({len(rows)})', '']
        for n, v in rows:
            L.append(f"- **{n}** ({len(v['stories'])}: {', '.join(v['stories'][:8])}{'...' if len(v['stories']) > 8 else ''}): {v['desc'][:600]}")
        L.append('')
    if not agg: L.append('_No plans validated yet._')
    out = REPO / 'production' / 'planned_assets.md'; out.write_text('\n'.join(L) + '\n', encoding='utf8'); print(out, len(agg), 'assets')
    Q = ['# Owner questions from creative plans (generated by `prod.py assets`; earlier ones: owner_decisions.md)', '',
         'Each plan proceeds with its stated default unless you say otherwise. Answer by story ID.', '']
    for p in c.execute("SELECT story_id, json_path FROM plans WHERE status='validated' ORDER BY story_id"):
        try: P = json.loads((REPO / p['json_path']).read_text(encoding='utf8'))
        except Exception: continue
        qs = P.get('owner_questions') or []
        if qs: Q += [f"## {p['story_id']} {P.get('title', '')}", ''] + [f'- {q}' for q in qs] + ['']
    (REPO / 'production' / 'owner_questions.md').write_text('\n'.join(Q) + '\n', encoding='utf8')

def main():
    a = sys.argv[1:]
    if not a or a[0] in ('-h', '--help'): print(__doc__); return
    if a[0] == 'restore': db.restore(); print('restored from', db.STATE); return
    c = db.connect(); cmd, rest = a[0], a[1:]
    if cmd == 'import':
        import importer
        rep = importer.run(write='--dry' not in rest)
        for st in ('blocked', 'warn'):
            for r in rep:
                if r[1] == st: print(f'{st.upper():8s} {r[0]} match={r[2]} {r[3]}')
        print({s: sum(1 for r in rep if r[1] == s) for s in ('ok', 'warn', 'blocked')})
    elif cmd == 'model':
        m, p = agent_models(rest[0]); print(m, p)
    elif cmd == 'export': print(db.export(c))
    elif cmd == 'review-queue':
        for r in c.execute("SELECT id, title_en FROM stories WHERE approval='pending'"): print(r['id'], r['title_en'])
    else:
        f = {'status': cmd_status, 'next': cmd_next, 'agent': cmd_agent, 'accept-plan': cmd_accept_plan, 'fail': cmd_fail,
             'release': cmd_release, 'limit-scan': cmd_limit_scan, 'interrupted': cmd_interrupted, 'running': cmd_running, 'stale': cmd_stale, 'config': cmd_config, 'assets': cmd_assets, 'done': cmd_done, 'finalize': cmd_finalize,
             'approve': cmd_approve, 'reject': lambda c, a: cmd_approve(c, a, 'rejected'), 'board': cmd_board, 'block': cmd_block, 'tokens': cmd_tokens, 'meter': cmd_meter, 'budget': cmd_budget}.get(cmd)
        if not f: sys.exit(__doc__)
        f(c, rest)

if __name__ == '__main__':
    main()
