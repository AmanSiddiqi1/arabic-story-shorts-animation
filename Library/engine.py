# Creator OS motion-style engine (kit.js, sound.js, halftone-pop.js), used as an external dependency.
# It is NOT stored in this repository. It comes from https://github.com/kevinbadi/claude-motion-faceless-skills (MIT),
# cloned next to this project folder, e.g. ~/Downloads/Claude Code/claude-motion-faceless-skills (like lemo-opuscar).
# Found, in order: $MOTION_STYLES (the skills/motion-styles folder), a 'claude-motion-faceless-skills' folder in any parent
# directory of this file, ~/.claude/skills/motion-styles (where its install.sh puts it).
import os, pathlib

FILES = {'kit.js': 'engine/kit.js', 'sound.js': 'engine/sound.js', 'halftone-pop.js': 'styles/halftone-pop.js'}
REPO_URL = 'https://github.com/kevinbadi/claude-motion-faceless-skills'

def motion_root(start=None):
    cands = []
    if os.environ.get('MOTION_STYLES'): cands.append(pathlib.Path(os.environ['MOTION_STYLES']))
    for d in pathlib.Path(start or __file__).resolve().parents:
        cands.append(d / 'claude-motion-faceless-skills' / 'skills' / 'motion-styles')
    cands.append(pathlib.Path.home() / '.claude' / 'skills' / 'motion-styles')
    for c in cands:
        if all((c / f).exists() for f in FILES.values()): return c
    raise SystemExit(f'Creator OS motion-style engine not found. Clone {REPO_URL} next to this project folder '
                     f'(or set MOTION_STYLES=/path/to/claude-motion-faceless-skills/skills/motion-styles).')

def engine_path(name, start=None): return motion_root(start) / FILES[name]
def engine_js(name, start=None): return engine_path(name, start).read_text(encoding='utf8')

if __name__ == '__main__':
    import sys
    print(engine_path(sys.argv[1]) if len(sys.argv) > 1 else motion_root())
