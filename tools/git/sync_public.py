#!/usr/bin/env python3
"""Publish a neutralised snapshot of the PRIVATE development repository to the PUBLIC render repository.
  python3 tools/git/sync_public.py            dry run: export, compare with the public repo, show what would change
  python3 tools/git/sync_public.py --push     commit the snapshot to the public repo (ordinary commit + push, never forced)
Preconditions: clean private tree, private HEAD already pushed to origin. The snapshot is produced by tools/git/make_public.py (which scans for
personal data, secrets and media and refuses on any finding) and stamped with SOURCE_REVISION.json (private commit + content hash).
This is what the cloud renders: tools/cloud/cloud.py refuses to submit unless the public repo's snapshot matches the private HEAD."""
import json, pathlib, shutil, subprocess, sys
REPO = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(REPO / 'tools' / 'cloud')); import common
SLUG = json.loads((REPO / 'tools' / 'cloud' / 'target.json').read_text())['render_repo']

def run(*c, cwd=REPO, check=True):
    r = subprocess.run(list(c), cwd=cwd, text=True, capture_output=True)
    if check and r.returncode: sys.exit(f'{" ".join(c[:3])} failed: {(r.stderr or r.stdout)[-800:]}')
    return r.stdout

def main():
    push = '--push' in sys.argv
    subprocess.run(['git', 'fetch', '-q', 'origin', 'main'], cwd=REPO)
    if run('git', 'status', '--porcelain', '--untracked-files=no').strip(): sys.exit('private tree has uncommitted changes: commit first')
    head = run('git', 'rev-parse', 'HEAD').strip()
    if head != run('git', 'rev-parse', 'origin/main').strip(): sys.exit('private HEAD is not pushed to origin/main: push first')
    scratch = REPO / 'scratch' / 'public-sync'; scratch.mkdir(parents=True, exist_ok=True)
    exp, clone = scratch / 'export', scratch / 'clone'
    for d in (exp, clone): shutil.rmtree(d, ignore_errors=True)
    r = subprocess.run([sys.executable, str(REPO / 'tools' / 'git' / 'make_public.py'), str(exp)], cwd=REPO, text=True, capture_output=True); print(r.stdout.strip())
    if r.returncode: sys.exit('make_public.py found problems; nothing published')
    run('git', 'clone', '-q', f'https://github.com/{SLUG}.git', str(clone))
    for p in clone.iterdir():
        if p.name != '.git': shutil.rmtree(p) if p.is_dir() else p.unlink()
    for p in exp.iterdir(): (shutil.copytree if p.is_dir() else shutil.copy2)(p, clone / p.name)
    run('git', 'add', '-A', cwd=clone); stat = run('git', 'diff', '--cached', '--stat', cwd=clone).strip().splitlines()
    rev = json.loads((exp / 'SOURCE_REVISION.json').read_text())
    print(f'{len(stat) - 1 if stat else 0} files differ from {SLUG}@main' + (':\n' + '\n'.join(stat[-12:]) if stat else ''))
    changed = [l for l in run('git', 'diff', '--cached', '--name-only', cwd=clone).split('\n') if l and l != 'SOURCE_REVISION.json']
    if not changed and run('git', 'diff', '--cached', '--name-only', cwd=clone).strip() in ('', 'SOURCE_REVISION.json') and json.loads((clone / 'SOURCE_REVISION.json').read_text())['export_sha256'] == rev['export_sha256'] and not stat:
        print('public repository already holds this snapshot'); return
    if not push: print('dry run: add --push to publish'); return
    subj = run('git', 'log', '-1', '--format=%s').strip()
    run('git', 'commit', '-q', '-m', f'Snapshot of private {head[:10]}: {subj}', '-m', f'Private-Source: {head}\nExport-SHA256: {rev["export_sha256"]}\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>', cwd=clone)
    run('git', 'push', '-q', 'origin', 'main', cwd=clone); print(f'pushed snapshot of {head[:10]} to {SLUG}')

if __name__ == '__main__': main()
