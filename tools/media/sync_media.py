#!/usr/bin/env python3
"""Copies the project's large media into a shared media folder (SHARED mode only; refuses in local mode) and verifies them (never deletes or overwrites).
  python3 tools/media/sync_media.py inventory     list media in this checkout with sizes and SHA-256 (writes a TSV)
  python3 tools/media/sync_media.py copy          copy missing files (APFS clone when possible), verify each by SHA-256
  python3 tools/media/sync_media.py verify        re-hash every listed file on both sides and compare
Media = files with a media extension (media.config.json), built HTML players, and everything in MP4s/ and Originals/.
Paths map through media.config.json. A destination file that exists with different content is reported as a CONFLICT
and left alone. Manifests: <media root>/manifests/ and checksums/ in the repository."""
import datetime, hashlib, json, os, pathlib, shutil, subprocess, sys
REPO = pathlib.Path(__file__).resolve().parents[2]; sys.path.insert(0, str(REPO / 'Library')); import media
CFG = media.CFG; EXT = {'.' + e for e in CFG['mediaExtensions']}
SKIP_DIRS = {'.git', 'node_modules', '.venv', 'frames', '__pycache__'}

def is_media(rel):
    p = pathlib.PurePosixPath(rel); low = rel.lower()
    if p.name in ('.DS_Store',) or p.name.startswith('._'): return False
    if rel.startswith(('MP4s/', 'Originals/')): return True
    if p.suffix.lower() in EXT: return True
    return low.endswith('.html') and CFG['playerPattern'] in rel and rel.startswith('Animations/')

def scan():
    out = []
    for d, dirs, files in os.walk(REPO):
        dirs[:] = sorted(x for x in dirs if x not in SKIP_DIRS and not x.startswith('frames'))
        for f in sorted(files):
            rel = pathlib.Path(d, f).relative_to(REPO).as_posix()
            if is_media(rel): out.append(rel)
    return out

def sha(p, bs=8 << 20):
    h = hashlib.sha256()
    with open(p, 'rb') as fh:
        for b in iter(lambda: fh.read(bs), b''): h.update(b)
    return h.hexdigest()

def clone(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(['cp', '-c', '-p', str(src), str(dst)], capture_output=True)  # APFS clone: no extra disk space
    if r.returncode != 0: shutil.copy2(src, dst)

def main(mode):
    if media.is_local():
        sys.exit('media root is this repository (local mode): nothing to inventory, copy or verify. To use a shared folder, run with\n'
                 '  ARABIC_STORY_MEDIA=/Users/Shared/ArabicStoryShorts python3 tools/media/sync_media.py ' + mode)
    root = media.root(); stamp = datetime.date.today().isoformat()
    rels = scan(); rows = []; conflicts = []; unmapped = []; copied = skipped = 0
    for rel in rels:
        src = REPO / rel; dst = media.to_media(rel)
        if dst is None: unmapped.append(rel); continue
        size = src.stat().st_size; h = sha(src)
        if mode == 'copy':
            if dst.exists():
                if dst.stat().st_size == size and sha(dst) == h: skipped += 1
                else: conflicts.append(rel); continue
            else:
                clone(src, dst)
                if sha(dst) != h: conflicts.append(rel + ' (copy did not verify)'); continue
                copied += 1
        if mode == 'verify':
            ok = dst.exists() and dst.stat().st_size == size and sha(dst) == h
            if not ok: conflicts.append(rel + (' (missing)' if not dst.exists() else ' (differs)'))
        rows.append((rel, os.path.relpath(dst, root) if dst else '', size, h))
    tsv = 'repo_path\tmedia_path\tbytes\tsha256\n' + ''.join('%s\t%s\t%d\t%s\n' % r for r in rows)
    total = sum(r[2] for r in rows)
    if mode in ('inventory', 'copy'):
        (REPO / 'checksums').mkdir(exist_ok=True); (REPO / 'checksums' / f'media-{mode}-{stamp}.tsv').write_text(tsv, encoding='utf8')
        if root.is_dir(): (root / 'manifests').mkdir(exist_ok=True); (root / 'manifests' / f'media-{mode}-{stamp}.tsv').write_text(tsv, encoding='utf8')
    print(f'{mode}: {len(rows)} files, {total / 1e9:.2f} GB, media root {root}')
    if mode == 'copy': print(f'  copied {copied}, already present and identical {skipped}')
    for u in unmapped: print('  UNMAPPED (not copied):', u)
    for c in conflicts: print('  CONFLICT:', c)
    print('RESULT:', 'OK' if not conflicts and not unmapped else 'PROBLEMS'); sys.exit(1 if conflicts or unmapped else 0)

if __name__ == '__main__':
    m = sys.argv[1] if len(sys.argv) > 1 else ''
    if m not in ('inventory', 'copy', 'verify'): print(__doc__); sys.exit(2)
    main(m)
