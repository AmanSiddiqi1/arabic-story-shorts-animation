#!/usr/bin/env python3
"""Runner-side planner (job 'plan' of render.yml). Validates the request, applies the usage limits, skips duplicate renders
and writes the job matrix to $GITHUB_OUTPUT.
  plan.py --stories "KD-008 KD-010" --version v1 [--force] [--large-ok]
Limits (change here, in one place): HARD_MAX stories per submission; more than WARN_AT needs --large-ok (the client
asks the user first); at most DAY_RUNS render runs per rolling 24 h."""
import argparse, datetime, json, os, pathlib, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import common

HARD_MAX, WARN_AT, DAY_RUNS = 8, 3, 100   # DAY_RUNS: local runaway guard, not a GitHub limit (was 12 until 2026-11-18)

def gh_json(path):
    return json.loads(subprocess.check_output(['gh', 'api', '--paginate', path], text=True) or 'null')

def out(k, v):
    with open(os.environ.get('GITHUB_OUTPUT', os.devnull), 'a') as f: f.write(f'{k}={v}\n')

def summary(txt):
    with open(os.environ.get('GITHUB_STEP_SUMMARY', os.devnull), 'a') as f: f.write(txt + '\n')

def die(msg):
    summary(f'### Render request refused\n{msg}'); print('REFUSED:', msg); sys.exit(1)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--stories', required=True); ap.add_argument('--version', default='v1')
    ap.add_argument('--force', action='store_true'); ap.add_argument('--large-ok', action='store_true'); a = ap.parse_args()
    if not common.VER_RE.match(a.version): die(f'version "{a.version}" must look like v1, v2 ...')
    ids = list(dict.fromkeys(a.stories.replace(',', ' ').split()))
    if not ids: die('no stories given')
    bad = [i for i in ids if not common.ID_RE.match(i)]
    if bad: die(f'invalid story ids: {bad} (expected KD-### or AN-###)')
    if len(ids) > HARD_MAX: die(f'{len(ids)} stories exceeds the per-submission limit of {HARD_MAX}; split the batch')
    if len(ids) > WARN_AT and not a.large_ok: die(f'{len(ids)} stories is a large batch (more than {WARN_AT}); resubmit with large_ok=true after confirming')
    known = common.stories()
    for i in ids:
        d = common.REPO / 'Animations' / i
        if i not in known: die(f'{i} is not in production/state.json')
        if not (d / 'build.py').exists() or not (d / 'render.mjs').exists(): die(f'{i}: Animations/{i} has no build.py/render.mjs in this commit (not pushed?)')
    repo = os.environ.get('GITHUB_REPOSITORY')
    if repo and os.environ.get('GH_TOKEN'):
        since = (datetime.datetime.utcnow() - datetime.timedelta(hours=24)).strftime('%Y-%m-%dT%H:%M:%SZ')
        runs = gh_json(f'repos/{repo}/actions/workflows/{common.WORKFLOW}/runs?created=%3E{since}&per_page=100')
        n = sum(len(p.get('workflow_runs', [])) for p in (runs if isinstance(runs, list) else [runs]))
        if n > DAY_RUNS and not a.force: die(f'{n} render runs in the last 24 h (limit {DAY_RUNS}); use force only if this is intended')
        arts = gh_json(f'repos/{repo}/actions/artifacts?per_page=100')
        live = {x['name'] for p in (arts if isinstance(arts, list) else [arts]) for x in p.get('artifacts', []) if not x['expired']}
    else:
        live = set()
    include, skipped = [], []
    for i in ids:
        fp = common.fingerprint(i); name = common.artifact_name(i, a.version, fp)
        if name in live and not a.force: skipped.append((i, name))
        else: include.append({'id': i, 'version': a.version, 'fp': fp, 'artifact': name})
    lines = ['### Render plan', f'commit `{os.environ.get("GITHUB_SHA", "?")[:10]}`, version `{a.version}`, at most 10 renders at a time', '',
             '| story | action | fingerprint |', '|---|---|---|']
    lines += [f'| {x["id"]} | render | `{x["fp"][:12]}` |' for x in include]
    lines += [f'| {i} | skipped: identical render already exists (`{n}`); use force to repeat | |' for i, n in skipped]
    summary('\n'.join(lines)); print('\n'.join(lines))
    out('matrix', json.dumps({'include': include})); out('count', len(include))

if __name__ == '__main__': main()
