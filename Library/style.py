# Style profiles: Library/styles/<id>/ (style.json + theme.js + look.md). A story picks one with "style" in story.json;
# without it the story uses DEFAULT (halftone-pop), which is how every film made before style profiles renders.
#   import style; P = style.load(cfg)            -> profile dict (+ 'dir')
#   style.film_name(cfg[, font])                 -> "<title> - <fileLabel> - <Arabic font family>" (player .html / MP4 name, no extension);
#                                                   the font defaults to the story's arabicFont (else the profile's)
#   style.arabic(key, cfg)                       -> (family, weight, arabic file, latin file) from Library/fonts/arabic.json + the profile's arabicFonts
#   python3 Library/style.py [id]                -> list the profiles, or print one profile
#   python3 Library/style.py --check             -> check every profile (files, fonts, engine style module); exit 1 on a problem
import json, pathlib, sys

LIB = pathlib.Path(__file__).resolve().parent
STYLES = LIB / 'styles'
DEFAULT = 'halftone-pop'

def style_id(cfg=None):
    if isinstance(cfg, str): return cfg
    return (cfg or {}).get('style') or DEFAULT

def load(cfg=None):
    sid = style_id(cfg); d = STYLES / sid; f = d / 'style.json'
    if not f.exists():
        raise SystemExit(f'style profile "{sid}" not found ({f}); profiles: {", ".join(available())}')
    P = json.loads(f.read_text(encoding='utf8')); P['dir'] = d
    assert P['id'] == sid, f'{f}: id {P["id"]!r} does not match its folder {sid!r}'
    return P

def available():
    return sorted(p.parent.name for p in STYLES.glob('*/style.json'))

ARABIC = {k: tuple(v) for k, v in json.loads((LIB / 'fonts' / 'arabic.json').read_text(encoding='utf8')).items() if k != '_'}

def arabic_fonts(cfg=None):
    P = load(cfg); return {**ARABIC, **{k: tuple(v) for k, v in P.get('arabicFonts', {}).items()}}

def arabic_key(cfg=None):
    return (cfg or {}).get('arabicFont') if isinstance(cfg, dict) and cfg.get('arabicFont') else load(cfg).get('arabicFont', 'naskh')

def arabic(key=None, cfg=None):
    F = arabic_fonts(cfg); key = key or arabic_key(cfg)
    if key not in F: raise SystemExit(f'Arabic font "{key}" unknown for style {style_id(cfg)}; known: {", ".join(F)}')
    return F[key]

def film_name(cfg, font_family=None, title=None):
    return f"{title or cfg['title']} - {load(cfg)['fileLabel']} - {font_family or arabic(None, cfg)[0]}"

def story_film_name(story_dir, font_family=None, title=None):
    cfg = json.loads((pathlib.Path(story_dir) / 'story.json').read_text(encoding='utf8'))
    return film_name(cfg, font_family, title)

REQUIRED = ('id', 'name', 'engineStyle', 'fileLabel', 'playerTitle', 'fonts', 'player')   # engineStyle = the id the style module registers

def check(sid):
    """problems with one profile (empty list = usable)"""
    try: P = load(sid)
    except (SystemExit, AssertionError, ValueError) as e: return [str(e)]
    E = [f'style.json has no "{k}"' for k in REQUIRED if k not in P]
    for k in ('theme', 'look'):
        if not (P['dir'] / P.get(k, k + ('.js' if k == 'theme' else '.md'))).exists(): E.append(f'{k} file missing in {P["dir"].name}/')
    for f in P.get('fonts', []):
        if not ((P['dir'] / f['file']).exists() or (LIB / 'fonts' / f['file']).exists()): E.append(f'font file {f["file"]} not in the profile folder or Library/fonts')
    for k in ('page', 'button', 'buttonText'):
        if k not in P.get('player', {}): E.append(f'player.{k} missing')
    for k, (fam, wt, fa, fl) in P.get('arabicFonts', {}).items():
        for f in (fa, fl):
            if not ((P['dir'] / (f + '.woff2')).exists() or (LIB / 'fonts' / (f + '.woff2')).exists()): E.append(f'Arabic font file {f}.woff2 missing')
    if P.get('module'):   # the profile's own style module (MS.register({ id: engineStyle, ... }))
        m = P['dir'] / P['module']
        if not m.exists(): E.append(f'style module {P["module"]} missing')
        elif f"id: '{P['engineStyle']}'" not in m.read_text(encoding='utf8'): E.append(f"style module does not register id '{P['engineStyle']}'")
    else:
        sys.path.insert(0, str(LIB)); import engine
        try: engine.engine_path(P['engineStyle'] + '.js')
        except SystemExit as e: E.append(str(e))
    return E

if __name__ == '__main__':
    if sys.argv[1:] == ['--check']:
        bad = 0
        for s in available():
            E = check(s); bad += bool(E); print(('ok   ' if not E else 'FAIL ') + s + ('' if not E else ': ' + '; '.join(E)))
        sys.exit(1 if bad else 0)
    if len(sys.argv) > 1:
        P = load(sys.argv[1]); P['dir'] = str(P['dir']); print(json.dumps(P, indent=2, ensure_ascii=False))
    else:
        for s in available(): P = load(s); print(f"{s:20} {P['name']}  (engine style {P['engineStyle']}, files '... - {P['fileLabel']} - ...')")
