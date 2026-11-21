# Media resolver (Python). One setting decides where large media live: $ARABIC_STORY_MEDIA,
# else the one-line file <repo>/.media-root, else defaultRoot in <repo>/media.config.json.
# LOCAL mode (the default, defaultRoot "."): the root is the repository folder itself and every path is used exactly as
# it is (Animations/<story>/narration.mp3, MP4s/, Audio Files/...): the original layout on the main account.
# SHARED mode (root is any other folder, e.g. /Users/Shared/ArabicStoryShorts for a second account): a repository path
# maps to a media path through the prefix table in media.config.json, and resolve() prefers that copy, falling back
# to the local file.
import json, os, pathlib, re
REPO = pathlib.Path(__file__).resolve().parent.parent
CFG = json.loads((REPO / 'media.config.json').read_text(encoding='utf8'))

def root():
    v = os.environ.get(CFG['envVar'])
    if not v and (REPO / '.media-root').exists(): v = (REPO / '.media-root').read_text(encoding='utf8').strip()
    p = pathlib.Path(os.path.expanduser(v or CFG['defaultRoot']))
    return pathlib.Path(os.path.normpath(p if p.is_absolute() else REPO / p))

def is_local():
    """True when media live in the repository's own folders (no mapping)"""
    return os.path.realpath(root()) == os.path.realpath(REPO)

def rel(p):
    """repository-relative POSIX path of p (absolute or relative to the repository)"""
    p = pathlib.Path(p); p = p if p.is_absolute() else REPO / p
    return pathlib.Path(os.path.normpath(p)).relative_to(REPO).as_posix()

# map entries [repository prefix, media prefix]; '*' matches one path segment and is carried over to the same '*' on the
# other side (Animations/*/renders/ -> Renders/*/). The most specific (longest) entry wins.
def _rx(pat): return re.compile('^' + re.escape(pat).replace(r'\*', '([^/]+)'))
_MAP = sorted(((a, b, _rx(a), _rx(b)) for a, b in CFG['map']), key=lambda m: -len(m[0]))
def _sub(pat, groups):
    g = iter(groups); return re.sub(r'\*', lambda _: next(g), pat)

def to_media(p):
    """media path for a repository path: the path itself in local mode; else mapped (None when no entry matches)"""
    r = rel(p)
    if is_local(): return REPO / r
    for a, b, ra, _ in _MAP:
        m = ra.match(r)
        if m: return root() / (_sub(b, m.groups()) + r[m.end():])
    return None

def out(p):
    """where to WRITE a media file for repository path p: p itself in local mode (or when the shared root is missing),
    else its media path; parent folders are created"""
    t = to_media(p) if not is_local() and root().is_dir() else None
    t = pathlib.Path(t) if t is not None else pathlib.Path(os.path.normpath(p if pathlib.Path(p).is_absolute() else REPO / p))
    t.parent.mkdir(parents=True, exist_ok=True); return t

def logical(p):
    """repository-style path (str, POSIX) of a file given by its media path or repository path; used for records"""
    p = pathlib.Path(os.path.normpath(p if pathlib.Path(p).is_absolute() else REPO / p))
    try: return p.relative_to(REPO).as_posix()
    except ValueError: pass
    try: r = p.relative_to(root()).as_posix()
    except ValueError: return str(p)
    for a, b, _, rb in sorted(_MAP, key=lambda m: -len(m[1])):
        m = rb.match(r)
        if m: return _sub(a, m.groups()) + r[m.end():]
    return str(p)

def resolve(p):
    """local mode: the local path; shared mode: the shared copy when it exists, else the local path"""
    local = pathlib.Path(os.path.normpath(p if pathlib.Path(p).is_absolute() else REPO / p))
    if is_local(): return local
    m = to_media(p)
    return m if m is not None and m.exists() else local

def final_dir():
    """where finished MP4s go: <repo>/MP4s in local mode (or when the shared root is missing), else <root>/final-mp4s"""
    return REPO / 'MP4s' if is_local() or not root().is_dir() else to_media('MP4s/x').parent

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        for a in sys.argv[1:]: print(resolve(a))
    else: print(root())
