#!/usr/bin/env python3
"""Refuses a commit that would put media, oversized files or credentials into Git.
usage: python3 tools/git/check_staged.py [--max-mb 10]     (checks what is staged: git diff --cached)
Exit 0 = clean, 1 = problems (listed). Used by tools/backup.sh and the pre-commit hook."""
import json, pathlib, re, subprocess, sys
REPO = pathlib.Path(__file__).resolve().parents[2]
CFG = json.loads((REPO / 'media.config.json').read_text(encoding='utf8'))
MAX = float(sys.argv[sys.argv.index('--max-mb') + 1]) if '--max-mb' in sys.argv else 10.0
MEDIA = {'.' + e for e in CFG['mediaExtensions']}
BAD_PATHS = [r'^MP4s/', r'^Originals/', r'(^|/)\.media-root$', r'(^|/)\.env(\..*)?$', r'\.(pem|key|p12|mobileprovision)$',
             r'(^|/)credentials[^/]*\.json$', r'(^|/)secrets[^/]*\.json$', r'(^|/)settings\.local\.json$', r'(^|/)local\.json$',
             r'(^|/)node_modules/', r'(^|/)\.venv/', r'(^|/)frames(-[^/]*)?/', r'\.f32$']
SECRETS = re.compile(r'(gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-(ant-)?[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY|xox[baprs]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{30,})')
git = lambda *a, inp=None: subprocess.run(['git', '-C', str(REPO), *a], input=inp, capture_output=True, check=True).stdout.decode('utf8', 'replace')
names = [n for n in git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').split('\0') if n]
probs = []
for n in names:
    low = n.lower(); ext = pathlib.Path(low).suffix
    if ext in MEDIA: probs.append(f'media file: {n}')
    if CFG['playerPattern'] in n and low.endswith('.html'): probs.append(f'built player (embeds narration audio): {n}')
    for pat in BAD_PATHS:
        if re.search(pat, n): probs.append(f'excluded path ({pat}): {n}'); break
sizes = git('cat-file', '--batch-check=%(objectsize)', inp=''.join(':' + n + '\n' for n in names).encode()).split()
for n, size in zip(names, map(int, sizes)):
    if size > MAX * 1e6: probs.append(f'larger than {MAX:g} MB ({size / 1e6:.1f} MB): {n}')
added = git('diff', '--cached', '-U0', '--no-color', '--diff-filter=ACMR')  # binary files are skipped by git
cur = None
for line in added.splitlines():
    if line.startswith('+++ b/'): cur = line[6:]
    elif line.startswith('+') and not line.startswith('+++') and SECRETS.search(line):
        probs.append(f'possible credential in {cur}: {SECRETS.search(line).group(0)[:12]}...')
if probs:
    print('STAGED-FILE CHECK FAILED (%d problem(s)):' % len(probs)); [print('  -', p) for p in probs]
    print('Media stays in the local media folders (or a shared media root, media.config.json); credentials never belong in Git.'); sys.exit(1)
print(f'staged-file check OK: {len(names)} file(s), no media, nothing over {MAX:g} MB, no credentials found')
