#!/usr/bin/env python3
"""Cloud rendering client (runs on the Mac, uses the GitHub CLI `gh`). Normal production path; local render_queue.py is the fallback.
  inputs  ID...                      upload the narration MP3s (not in Git) to the 'narration-inputs' release of the PRIVATE repo (read by the
                                     public runner through the NARRATION_TOKEN secret). Only with --to-render-repo --confirm-public-rights are they
                                     put in the public render repository's release (publishing them: the owner must have cleared the rights)
  sync-check                         verify the public repo's snapshot is exactly the current private HEAD
  (global) --private                 target the private repository (fallback pipeline) instead of the public render repository
  submit  ID... [--version v1] [--yes] [--force] [--when-idle]   start a render run (one run at a time, up to 10 films at a time inside it)
  status  [RUN]  [--watch]           progress of a run (default: the latest)
  fetch   [RUN]  [--force] [--purge] download MP4 + QC report into Animations/<ID>/renders|qc, record in production.db
  list                               recent render runs (works after an interrupted session: no local state needed)
  retry   RUN                        re-run failed jobs of a run (once per run)
  publish ID --run RUN --version v1 --approved [--local]   save an APPROVED, QC-passed film as a GitHub Release asset
  purge                              delete live render artifacts (frees the 500 MB artifact quota)
Guards: clean+pushed source, narration uploaded, no run already active, artifact quota, <=10 films per submit (>3 needs --yes),
<=100 submissions per rolling 24 h (runaway backstop; GitHub itself has no such limit), and no third attempt of an unchanged source that already failed twice."""
import argparse, base64, hashlib, json, pathlib, re, shutil, subprocess, sys, tempfile, time, uuid
sys.path.insert(0, str(pathlib.Path(__file__).parent)); sys.path.insert(0, str(pathlib.Path(__file__).parents[1] / 'production'))
import common
REPO = common.REPO; WF = common.WORKFLOW; INPUTS = common.DEPS['render']['release_tag_inputs']
SLUG = json.loads((pathlib.Path(__file__).parent / 'target.json').read_text())['render_repo']   # render repository (set in main)
PUBLIC = True
LEDGER = REPO / 'production' / 'cloud' / 'ledger.json'     # local, Git-ignored; everything can be rebuilt from `gh run list`
MB = 1 << 20; QUOTA_MB, FILM_MB = 480, 235; WARN_AT, HARD_MAX, DAY_SUBMITS = 3, 10, 100   # HARD_MAX matches max-parallel 10 (was 8 until 2026-11-18); DAY_SUBMITS: local runaway guard (was 12 until 2026-11-18)

def origin_slug():
    m = re.search(r'github\.com[:/]([^/]+/[^/.]+?)(\.git)?$', common.git('remote', 'get-url', 'origin').strip()); return m.group(1)
def gh(*a, check=True, capture=True):
    a = list(a)
    if a and a[0] in ('run', 'workflow', 'release') and '-R' not in a: a += ['-R', SLUG]    # every call targets the render repository explicitly
    r = subprocess.run(['gh'] + a, cwd=REPO, text=True, capture_output=capture)
    if check and r.returncode: sys.exit(f'gh {" ".join(a[:3])} failed: {(r.stderr or r.stdout).strip()}')
    return r.stdout
def ghj(*a): return json.loads(gh(*a) or 'null')
def slug(): return SLUG
def ledger():
    try: return json.loads(LEDGER.read_text())
    except Exception: return {'requests': [], 'failures': {}, 'retried': [], 'fetched': []}
def save(L): LEDGER.parent.mkdir(parents=True, exist_ok=True); LEDGER.write_text(json.dumps(L, indent=1))
def ids_of(xs):
    bad = [x for x in xs if not common.ID_RE.match(x)]
    if bad: sys.exit(f'invalid story ids {bad}')
    return list(dict.fromkeys(xs))
def mp3_of(sid):
    s = common.stories().get(sid) or sys.exit(f'{sid} not in production/state.json')
    return REPO / 'Audio Files' / 'Final Done' / s['mp3_file'], s

def runs(n=20):
    return ghj('run', 'list', '-w', WF, '-L', str(n), '--json', 'databaseId,displayTitle,status,conclusion,createdAt,updatedAt,headSha,url')
def active(): return [r for r in runs(30) if r['status'] != 'completed']
def quota_used_mb():
    a = ghj('api', '--paginate', f'repos/{slug()}/actions/artifacts?per_page=100'); a = a if isinstance(a, list) else [a]
    return sum(x['size_in_bytes'] for p in a for x in p.get('artifacts', []) if not x['expired']) / MB

# ---------------------------------------------------------------- inputs
def narration_repo(public_release=False):
    """Where the narration MP3s are stored: the private origin repository's release (default), or the render repository's own release."""
    return SLUG if public_release else origin_slug()
def release_assets(repo):
    r = subprocess.run(['gh', 'release', 'view', INPUTS, '-R', repo, '--json', 'assets'], cwd=REPO, text=True, capture_output=True)
    return {x['name']: x['size'] for x in json.loads(r.stdout)['assets']} if r.returncode == 0 else None
def cmd_inputs(a):
    repo = narration_repo(a.to_render_repo)
    if a.to_render_repo and not a.confirm_public_rights: sys.exit('--to-render-repo publishes the recordings on the PUBLIC repository. Only after the owner has cleared the rights (AI-voice terms, text source): add --confirm-public-rights')
    if a.to_render_repo and repo == origin_slug(): sys.exit('render repository is the private one; nothing to publish')
    have = release_assets(repo)
    if have is None:
        gh('release', 'create', INPUTS, '-R', repo, '--prerelease', '--title', 'Narration inputs (not source)', '--notes', 'Narration MP3s the cloud renderer downloads. Not part of Git history.'); have = {}
    for sid in ids_of(a.ids):
        mp3, s = mp3_of(sid)
        if not mp3.exists(): sys.exit(f'{mp3} missing locally')
        if hashlib.sha256(mp3.read_bytes()).hexdigest() != s['mp3_sha']: sys.exit(f'{mp3.name}: checksum differs from production/state.json; refusing to upload')
        if have.get(mp3.name) == mp3.stat().st_size: print(f'{sid}: narration already in {repo}'); continue
        gh('release', 'upload', INPUTS, str(mp3), '--clobber', '-R', repo); print(f'{sid}: uploaded {mp3.name} to {repo}')

def secrets_set():
    r = subprocess.run(['gh', 'secret', 'list', '-R', SLUG, '--json', 'name'], cwd=REPO, text=True, capture_output=True)
    return {x['name'] for x in json.loads(r.stdout)} if r.returncode == 0 else set()
def narration_ok(sid):
    """The runner finds the narration either in the render repository's own release, or (secure arrangement) in the private repository's release through the secrets NARRATION_REPO + NARRATION_TOKEN."""
    mp3, s = mp3_of(sid); own = release_assets(SLUG) or {}
    if mp3.name in own: return 'render-repo release'
    if not PUBLIC: return None
    need = {'NARRATION_REPO', 'NARRATION_TOKEN'}
    if not need <= secrets_set(): return None
    return 'private release via secrets' if mp3.name in (release_assets(origin_slug()) or {}) else None

# ---------------------------------------------------------------- public snapshot check
def export_dir():
    d = pathlib.Path(tempfile.mkdtemp(prefix='public-export-', dir=REPO / 'scratch')) if (REPO / 'scratch').exists() else pathlib.Path(tempfile.mkdtemp())
    shutil.rmtree(d); r = subprocess.run([sys.executable, str(REPO / 'tools' / 'git' / 'make_public.py'), str(d)], cwd=REPO, text=True, capture_output=True)
    if r.returncode: sys.exit('make_public.py reported problems:\n' + r.stdout[-1500:] + r.stderr[-500:])
    return d
def public_revision():
    r = subprocess.run(['gh', 'api', f'repos/{SLUG}/contents/SOURCE_REVISION.json'], text=True, capture_output=True)
    if r.returncode: return None, None
    j = json.loads(r.stdout); return json.loads(base64.b64decode(j['content'])), None
def verify_public_sync():
    """The public repository's main must be the snapshot of the private HEAD we are about to render. Returns (export folder, public main sha)."""
    head = common.git('rev-parse', 'HEAD').strip(); rev, _ = public_revision()
    if not rev: sys.exit(f'{SLUG} has no SOURCE_REVISION.json: publish a snapshot first: python3 tools/git/sync_public.py --push')
    if rev['private_commit'] != head: sys.exit(f'public snapshot is of private commit {rev["private_commit"][:10]}, but private HEAD is {head[:10]}: python3 tools/git/sync_public.py --push')
    d = export_dir(); mine = json.loads((d / 'SOURCE_REVISION.json').read_text())
    if mine['export_sha256'] != rev['export_sha256']: sys.exit('public snapshot content differs from a fresh export of this commit (changed by hand, or make_public.py changed): re-run sync_public.py --push')
    sha = ghj('api', f'repos/{SLUG}/commits/main')['sha']; print(f'public snapshot verified: private {head[:10]} == {SLUG}@{sha[:10]} (export {mine["export_sha256"][:12]})')
    return d, sha
def cmd_sync_check(a): verify_public_sync()

# ---------------------------------------------------------------- submit
def clean_and_pushed(ids):
    subprocess.run(['git', 'fetch', '-q', 'origin', 'main'], cwd=REPO)
    if common.git('rev-parse', '--abbrev-ref', 'HEAD').strip() != 'main': sys.exit('submit from the main branch (the workflow renders main)')
    paths = [f'Animations/{i}' for i in ids] + ['Library', 'tools/cloud', 'tools/production', 'production/state.json', '.github', 'media.config.json']
    dirty = common.git('status', '--porcelain', '--', *paths).strip()
    if dirty: sys.exit('uncommitted changes in files the render uses; commit and push first:\n' + dirty[:600])
    if common.git('rev-parse', 'HEAD').strip() != common.git('rev-parse', 'origin/main').strip(): sys.exit('local main differs from origin/main; push (or pull) first so the cloud renders exactly this source')

def cmd_submit(a):
    ids = ids_of(a.ids); L = ledger(); now = time.time()
    if not ids: sys.exit('no stories')
    if len(ids) > HARD_MAX: sys.exit(f'{len(ids)} stories: limit is {HARD_MAX} per submission')
    if len(ids) > WARN_AT and not a.yes: sys.exit(f'LARGE BATCH ({len(ids)} films, about {len(ids)*FILM_MB} MB of temporary artifacts, roughly {len(ids)*30} runner minutes).\nAsk the owner, then repeat with --yes.')
    if sum(1 for r in L['requests'] if now - r['t'] < 86400) >= DAY_SUBMITS and not a.override: sys.exit(f'{DAY_SUBMITS} submissions in the last 24 h; wait or use --override')
    clean_and_pushed(ids)
    print(f'target repository: {SLUG}' + ('' if PUBLIC else '  (PRIVATE fallback)'))
    exp, pub_sha = (verify_public_sync() if PUBLIC else (REPO, None))
    for i in ids:
        if not narration_ok(i): sys.exit(f'{i}: narration is not reachable by the runner. Private-secure route: python3 tools/cloud/cloud.py inputs {i}, and set the secrets NARRATION_REPO and NARRATION_TOKEN on {SLUG} (see tools/cloud/README.md)')
        fp = common.fingerprint(i, exp)
        if L['failures'].get(f'{i}:{fp[:12]}', 0) >= 2 and not a.override: sys.exit(f'{i}: this exact source already failed 2 renders; fix the source (see `fetch` diagnostics) before rendering again')
    while active():
        if not a.when_idle: sys.exit('a render run is already active (' + ', '.join(str(r['databaseId']) for r in active()) + '); wait for it or use --when-idle')
        print('waiting for the active run ...'); time.sleep(60)
    est = quota_used_mb() + len(ids) * FILM_MB if not PUBLIC else 0    # the 500 MB artifact quota applies to private repositories only
    if est > QUOTA_MB and not a.override: sys.exit(f'artifact storage would reach about {est:.0f} MB (free quota 500 MB). Fetch finished films and run: python3 tools/cloud/cloud.py purge')
    req = uuid.uuid4().hex[:8]
    gh('workflow', 'run', WF, '--ref', 'main', '-f', f'stories={" ".join(ids)}', '-f', f'version={a.version}', '-f', f'request_id={req}',
       '-f', f'force={"true" if a.force else "false"}', '-f', f'large_ok={"true" if len(ids) > WARN_AT else "false"}')
    run = None
    for _ in range(30):
        time.sleep(4); run = next((r for r in runs(10) if f'[{req}]' in r['displayTitle']), None)
        if run: break
    if not run: sys.exit(f'dispatched (request {req}) but the run id was not found yet; use `list`')
    if pub_sha and run.get('headSha') != pub_sha: print(f'WARNING: run is on {run.get("headSha","?")[:10]}, not the verified public commit {pub_sha[:10]} (the public repo moved during submit); check the run')
    L['requests'].append({'req': req, 'run': run['databaseId'], 'repo': SLUG, 'ids': ids, 'version': a.version, 't': now, 'sha': common.git('rev-parse', 'HEAD').strip(), 'public_sha': pub_sha, 'fp': {i: common.fingerprint(i, exp) for i in ids}})
    save(L)
    if exp != REPO: shutil.rmtree(exp, ignore_errors=True)
    print(f'submitted to {SLUG}: run {run["databaseId"]}  {run["url"]}\nnext: python3 tools/cloud/cloud.py status {run["databaseId"]} --watch ; fetch {run["databaseId"]}')

# ---------------------------------------------------------------- status / list
def run_info(rid): return ghj('run', 'view', str(rid), '--json', 'databaseId,displayTitle,status,conclusion,createdAt,updatedAt,jobs,url,headSha')
def show(info):
    print(f'run {info["databaseId"]}  {info["displayTitle"]}  [{info["status"]}{"/" + info["conclusion"] if info["conclusion"] else ""}]  {info["url"]}')
    for j in info['jobs']:
        print(f'  {j["name"]:<28} {j["status"]:<12} {j.get("conclusion") or ""}')
def latest():
    L = ledger(); r = L['requests'][-1]['run'] if L['requests'] else None
    return r or (runs(1) or sys.exit('no render runs'))[0]['databaseId']
def count_failures(info):
    L = ledger(); req = next((r for r in L['requests'] if r['run'] == info['databaseId']), None)
    if not req or info['databaseId'] in L.get('counted', []): return
    for j in info['jobs']:
        m = re.match(r'render (\S+) ', j['name'])
        if m and j.get('conclusion') == 'failure' and m.group(1) in req['fp']:
            k = f'{m.group(1)}:{req["fp"][m.group(1)][:12]}'; L['failures'][k] = L['failures'].get(k, 0) + 1
    L.setdefault('counted', []).append(info['databaseId']); save(L)
def cmd_status(a):
    rid = a.run or latest()
    while True:
        info = run_info(rid); show(info)
        if info['status'] == 'completed': count_failures(info); print('completed:', info['conclusion']); return
        if not a.watch: return
        print('---'); time.sleep(45)
def cmd_list(a):
    for r in runs(15): print(r['databaseId'], r['status'], r['conclusion'] or '-', r['createdAt'], r['displayTitle'])

# ---------------------------------------------------------------- fetch
def record_db(sid, ver, rel, man):
    try:
        import db; c = db.connect(); q = man['qc']
        c.execute('INSERT OR REPLACE INTO renders VALUES (?,?,?,?,?,?,?,?)', (sid, ver, rel, None, q['format']['duration'], q['result'], json.dumps(dict(q, cloud_run=man['run_id'], cloud_commit=man['commit'])), db.now()))
        c.commit(); db.log(c, sid, 'cloud-render', f'{ver}: {q["result"]} run {man["run_id"]} commit {man["commit"][:10]}')
    except Exception as e: print('  (production.db not updated:', e, ')')
def cmd_fetch(a):
    rid = a.run or latest(); info = run_info(rid); show(info)
    if info['status'] != 'completed': sys.exit('run not finished; use status --watch')
    count_failures(info)
    arts = ghj('api', f'repos/{slug()}/actions/runs/{rid}/artifacts')['artifacts']
    work = REPO / 'scratch' / 'cloud' / str(rid); work.mkdir(parents=True, exist_ok=True); L = ledger(); got = 0
    for art in arts:
        if art['expired']: print('expired:', art['name']); continue
        d = work / art['name']
        if not d.exists(): gh('run', 'download', str(rid), '-n', art['name'], '-D', str(d))
        if art['name'].startswith('FAILED-'):
            print(f'\n=== diagnostics {art["name"]} ===\n' + ((d / 'report.md').read_text() if (d / 'report.md').exists() else '(no report)') + f'\n(log: {d / "render.log"})'); continue
        man = json.loads((d / 'manifest.json').read_text()); sid, ver = man['story'], man['version']; mp4 = d / man['mp4']['file']
        if hashlib.sha256(mp4.read_bytes()).hexdigest() != man['mp4']['sha256']: print(f'{sid}: CHECKSUM MISMATCH, not installed'); continue
        dest = REPO / 'Animations' / sid / 'renders' / mp4.name
        if dest.exists() and not a.force: print(f'{sid}: {dest.relative_to(REPO)} exists; kept your file. Cloud copy: {mp4} (use --force to replace, old moved to _superseded/)'); continue
        if dest.exists(): s = dest.parent / '_superseded'; s.mkdir(exist_ok=True); shutil.move(str(dest), str(s / f'{dest.stem}.{int(time.time())}.mp4'))
        dest.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(mp4, dest)
        q = REPO / 'Animations' / sid / 'qc'; q.mkdir(exist_ok=True); shutil.copy2(d / f'{sid}_{ver}.qc.json', q / (mp4.name + '.qc.json')); shutil.copy2(d / 'manifest.json', q / f'{sid}_{ver}.cloud-manifest.json')
        record_db(sid, ver, str(dest.relative_to(REPO)), man); got += 1
        print(f'\n{sid} {ver}: {man["result"]}  -> {dest.relative_to(REPO)}  ({man["mp4"]["bytes"]/MB:.0f} MB, wall {man["timings_s"]["wall"]:.0f} s)\n' + (d / 'report.md').read_text())
        if a.purge: gh('api', '-X', 'DELETE', f'repos/{slug()}/actions/artifacts/{art["id"]}'); print('  artifact purged from GitHub')
        L['fetched'].append({'run': rid, 'id': sid, 'version': ver})
    save(L); print(f'\n{got} film(s) installed.'); 
    if info['conclusion'] != 'success': print('Some jobs failed: read the diagnostics above, fix the source, push, submit again.')

def cmd_retry(a):
    L = ledger()
    if a.run in L['retried']: sys.exit('this run was already retried once; fix the source instead')
    gh('run', 'rerun', str(a.run), '--failed'); L['retried'].append(a.run); save(L); print('re-running failed jobs of', a.run)
def cmd_purge(a):
    n = 0
    for x in [x for p in (lambda r: r if isinstance(r, list) else [r])(ghj('api', '--paginate', f'repos/{slug()}/actions/artifacts?per_page=100')) for x in p.get('artifacts', [])]:
        if not x['expired']: gh('api', '-X', 'DELETE', f'repos/{slug()}/actions/artifacts/{x["id"]}'); n += 1
    print(n, 'artifact(s) deleted')

# ---------------------------------------------------------------- publish
def cmd_publish(a):
    if not a.approved: sys.exit('publishing is permanent-ish and needs the owner\'s approval of the film: add --approved once they have said so')
    sid, ver = ids_of([a.id])[0], a.version
    if a.local:   # artifact already purged/expired: upload the fetched local file, verified against the cloud manifest
        mf = REPO / 'Animations' / sid / 'qc' / f'{sid}_{ver}.cloud-manifest.json'; mp4 = REPO / 'Animations' / sid / 'renders' / f'{sid}_{ver}.mp4'
        man = json.loads(mf.read_text()); assert man['result'] == 'PASS' and not man['qc']['fails'], 'QC did not pass'
        if hashlib.sha256(mp4.read_bytes()).hexdigest() != man['mp4']['sha256']: sys.exit('local MP4 differs from the cloud render (was it modified?)')
        gh('release', 'create', f'{sid}-{ver}', str(mp4), str(REPO / 'Animations' / sid / 'qc' / f'{mp4.name}.qc.json'), '--target', man['commit'], '--title', f'{sid} {ver}',
           '--notes', f'Cloud render of {sid} {ver}, QC PASS. Source commit {man["commit"]}. Render run {man["run_id"]}. sha256 {man["mp4"]["sha256"]}. Uploaded from the verified local copy.')
        print('released', f'{sid}-{ver}'); return
    gh('workflow', 'run', 'publish.yml', '--ref', 'main', '-f', f'story={sid}', '-f', f'run_id={a.run}', '-f', f'version={ver}'); print('publish workflow started; follow with: gh run list -w publish.yml')

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter); sp = ap.add_subparsers(dest='cmd', required=True)
    ap.add_argument('--private', action='store_true', help='target the private origin repository (fallback) instead of the public render repository')
    p = sp.add_parser('inputs'); p.add_argument('ids', nargs='+'); p.add_argument('--to-render-repo', action='store_true'); p.add_argument('--confirm-public-rights', action='store_true'); p.set_defaults(f=cmd_inputs)
    p = sp.add_parser('sync-check'); p.set_defaults(f=cmd_sync_check)
    p = sp.add_parser('submit'); p.add_argument('ids', nargs='+'); p.add_argument('--version', default='v1'); p.add_argument('--yes', action='store_true'); p.add_argument('--force', action='store_true')
    p.add_argument('--override', action='store_true'); p.add_argument('--when-idle', action='store_true'); p.set_defaults(f=cmd_submit)
    p = sp.add_parser('status'); p.add_argument('run', nargs='?'); p.add_argument('--watch', action='store_true'); p.set_defaults(f=cmd_status)
    p = sp.add_parser('list'); p.set_defaults(f=cmd_list)
    p = sp.add_parser('fetch'); p.add_argument('run', nargs='?'); p.add_argument('--force', action='store_true'); p.add_argument('--purge', action='store_true'); p.set_defaults(f=cmd_fetch)
    p = sp.add_parser('retry'); p.add_argument('run', type=int); p.set_defaults(f=cmd_retry)
    p = sp.add_parser('purge'); p.set_defaults(f=cmd_purge)
    p = sp.add_parser('publish'); p.add_argument('id'); p.add_argument('--run'); p.add_argument('--version', default='v1'); p.add_argument('--approved', action='store_true'); p.add_argument('--local', action='store_true'); p.set_defaults(f=cmd_publish)
    a = ap.parse_args()
    global SLUG, PUBLIC
    if a.private: SLUG, PUBLIC = origin_slug(), False
    a.f(a)

if __name__ == '__main__': main()
