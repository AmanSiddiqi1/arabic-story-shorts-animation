"""Shared helpers for the cloud-render tools (standard library only; runs on the runner and on the Mac)."""
import hashlib, json, pathlib, re, subprocess

REPO = pathlib.Path(__file__).resolve().parents[2]
DEPS = json.loads((pathlib.Path(__file__).parent / 'deps.json').read_text())
ID_RE = re.compile(r'^(KD|AN)-\d{3}$|^[A-Z]{2,6}-\d{2,3}(-[A-Z0-9]{2,10})?$')   # KD-009, AN-145, ALI-01-POPUP
VER_RE = re.compile(r'^v\d{1,3}$')
WORKFLOW = 'render.yml'
# source folders inside Animations/<ID>/ that do not influence the film (outputs, stills, notes)
EXCLUDE = ('renders/', 'qc/', 'stills/', 'review/', 'planning/', '_pre_upgrade/', 'frames')

def git(*a):
    return subprocess.check_output(['git', '-C', str(REPO)] + list(a), text=True)

def tracked_files(root=REPO):
    """Paths of the source files under root: `git ls-files` in a checkout, or a directory walk of an export folder."""
    root = pathlib.Path(root)
    if (root / '.git').exists():
        return [f for f in subprocess.check_output(['git', '-C', str(root), 'ls-files', '-z']).decode().split('\0') if f]
    return sorted(str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() and '.git' not in p.relative_to(root).parts)

def stories(root=REPO):
    return {s['id']: s for s in json.loads((pathlib.Path(root) / 'production' / 'state.json').read_text(encoding='utf8'))['stories']}

def fingerprint(sid, root=REPO):
    """sha256 of everything that determines the picture and sound of a film: the story's source files, the shared Library, the
    render/QC code, the pinned external engines, the render settings and the narration checksum (all by CONTENT, so a checkout on
    the runner and an export folder on the Mac give the same value). Same inputs -> same fingerprint -> a duplicate render is skipped."""
    root = pathlib.Path(root); h = hashlib.sha256(); entries = []
    own = f'Animations/{sid}/'
    for path in tracked_files(root):
        if path.startswith(own):
            if any(path[len(own):].startswith(x) for x in EXCLUDE): continue
        elif not (path.startswith('Library/') and not path.startswith(('Library/catalogue', 'Library/tests'))) and path not in (
                'tools/production/qc.py', 'tools/production/db.py', 'tools/cloud/render_one.py', 'tools/cloud/deps.json'): continue
        entries.append(f'{path} {hashlib.sha256((root / path).read_bytes()).hexdigest()}')
    h.update('\n'.join(sorted(entries)).encode())
    s = stories(root).get(sid, {})
    h.update(json.dumps({'mp3_sha': s.get('mp3_sha'), 'mp3_duration': s.get('mp3_duration'), 'deps': DEPS}, sort_keys=True).encode())
    return h.hexdigest()

def artifact_name(sid, version, fp):
    return f'render-{sid}-{version}-{fp[:12]}'
