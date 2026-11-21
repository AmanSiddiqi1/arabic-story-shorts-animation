#!/usr/bin/env python3
"""Moves this checkout's media (files Git ignores) into the media folder named by .media-root / $ARABIC_STORY_MEDIA,
following the map in media.config.json (Audio/Final, Audio/Earlier versions, Renders, Final MP4s, Working files).
  python3 tools/media/move_to_media_root.py            dry run: what would move where, sizes, conflicts
  python3 tools/media/move_to_media_root.py --move     move (rename on the same disk; nothing is copied or deleted)
Only files that Git ignores AND whose path has a map entry move: tracked files (code, timings, reviews) and unmapped
folders (scratch/, Spreadsheets/, production/) stay. A destination that already exists is a CONFLICT and is left alone.
Empty folders left behind in the repository are removed. Writes a TSV log to checksums/media_move_<time>.tsv."""
import collections, datetime, os, pathlib, subprocess, sys
REPO = pathlib.Path(__file__).resolve().parents[2]; sys.path.insert(0, str(REPO / 'Library')); import media

def main(move):
    if media.is_local(): sys.exit('local mode: set .media-root (or $ARABIC_STORY_MEDIA) to the media folder first')
    root = media.root(); print('media folder:', root)
    files = [f for f in subprocess.check_output(['git', '-C', str(REPO), 'ls-files', '--others', '--ignored', '--exclude-standard', '-z']).decode().split('\0') if f]
    plan, skipped, conflicts = [], collections.Counter(), []
    for f in files:
        src = REPO / f
        if not src.is_file() or src.is_symlink(): continue
        if f.startswith(('scratch/', '.claude/', 'production/', 'Spreadsheets/', 'checksums/', 'Library/')): skipped[f.split('/')[0]] += 1; continue
        dst = media.to_media(f)
        if dst is None: skipped[f.split('/')[0]] += 1; continue
        if dst.exists(): conflicts.append((f, dst)); continue
        plan.append((f, dst, src.stat().st_size))
    by = collections.defaultdict(lambda: [0, 0])
    for f, dst, n in plan:
        top = '/'.join(dst.relative_to(root).parts[:2]) if dst.relative_to(root).parts[0] == 'Audio' else dst.relative_to(root).parts[0]
        by[top][0] += 1; by[top][1] += n
    print(f'{len(plan)} files, {sum(n for *_, n in plan) / 1e9:.2f} GB to move:')
    for k, (c, n) in sorted(by.items()): print(f'  {k:28} {c:6d} files {n / 1e9:7.2f} GB')
    print('stay in the repository (unmapped):', dict(skipped))
    print('conflicts (destination exists, left alone):', len(conflicts))
    for f, d in conflicts[:20]: print('  ', f, '->', d)
    if not move: print('dry run: add --move to move'); return
    log = REPO / 'checksums' / f'media_move_{datetime.datetime.now():%Y%m%d_%H%M%S}.tsv'; log.parent.mkdir(exist_ok=True)
    moved = 0
    with open(log, 'w', encoding='utf8') as L:
        L.write('repository_path\tmedia_path\tbytes\n')
        for f, dst, n in plan:
            dst.parent.mkdir(parents=True, exist_ok=True); os.rename(REPO / f, dst); L.write(f'{f}\t{dst}\t{n}\n'); moved += 1
    # remove folders left empty in the repository (deepest first), never the top-level code folders
    for d in sorted({(REPO / f).parent for f, _, _ in plan}, key=lambda p: -len(p.parts)):
        p = d
        while p != REPO and p.exists() and not any(p.iterdir()) and p.name not in ('Animations', 'Library', 'tools'):
            p.rmdir(); p = p.parent
    print(f'moved {moved} files; log: {log.relative_to(REPO)}')

if __name__ == '__main__':
    main('--move' in sys.argv)
