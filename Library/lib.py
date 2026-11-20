# Kalila wa Dimna shared library: helpers for a story's build.py.
#   import sys, pathlib; sys.path.insert(0, str(find_library()))   (see template/build.py)
#   from lib import head_scripts, font_css, FONTS
# head_scripts(...) returns the <script> tags for the engine + the whole library, in load order, all inline.
import base64, json, pathlib
from engine import engine_js   # Creator OS engine from the installed claude-motion-faceless-skills repo (not in this repository)
import style as _style         # style profiles: Library/styles/<id>/ (style.json, theme.js, look.md)

LIB = pathlib.Path(__file__).resolve().parent
FONTS = LIB / 'fonts'
# load order matters: engine, the style theme (styles/<id>/theme.js: palette, lettering font, dot texture, brush; added by
# library_js), helpers (uses ARABIC_FONT), cast, props, fx, sets, motion, registry (wraps the cast)
ORDER = ['core/helpers.js',
         'cast/lion.js', 'cast/hare.js', 'cast/deer.js', 'cast/fox.js', 'cast/monkey.js', 'cast/turtle.js', 'cast/birds.js', 'cast/elephant.js', 'cast/frog.js', 'cast/people.js',
         'cast/hooves.js', 'cast/small.js', 'cast/birds2.js',
         'props/nest.js', 'props/things.js', 'fx/fx.js',
         'sets/sky.js', 'sets/ground.js', 'sets/trees.js', 'sets/places.js', 'sets/towns.js',
         'motion.js', 'registry.js']
ARABIC = _style.ARABIC   # Library/fonts/arabic.json (a style profile may add its own: arabic(key, style))
arabic = _style.arabic
ARABIC_RANGE = 'U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC'

def _b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def read(rel): return (LIB / rel).read_text(encoding='utf8')

def font_css(key='naskh', style=None):
    """the style's lettering fonts (style.json "fonts", files in Library/fonts or the profile folder) + the Arabic subtitle font"""
    fam, wt, fa, fl = arabic(key, style); P = _style.load(style)
    def ff(f): return P['dir'] / f['file'] if (P['dir'] / f['file']).exists() else FONTS / f['file']
    def af(n): return P['dir'] / (n + '.woff2') if (P['dir'] / (n + '.woff2')).exists() else FONTS / (n + '.woff2')
    lettering = ''.join(f"\n@font-face{{font-family:'{f['family']}';font-weight:{f['weight']};font-style:{f.get('style', 'normal')};src:url(data:font/woff2;base64,{_b64(ff(f))}) format('woff2');}}" for f in P['fonts'])
    return f"""{lettering}
@font-face{{font-family:'{fam}';font-weight:200 1000;src:url(data:font/woff2;base64,{_b64(af(fa))}) format('woff2');unicode-range:{ARABIC_RANGE};}}
@font-face{{font-family:'{fam}';font-weight:200 1000;src:url(data:font/woff2;base64,{_b64(af(fl))}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122;}}
"""

def theme_rel(style=None):
    P = _style.load(style); return (P['dir'] / P.get('theme', 'theme.js')).relative_to(LIB).as_posix()

def library_js(style=None):
    """the style theme first, then the shared library (same code for every style)"""
    return '\n'.join(f'// ---------- Library/{rel} ----------\n' + read(rel) for rel in [theme_rel(style)] + ORDER)

def style_module_js(style=None):
    """the style module: the profile's own file (style.json "module") or the Creator OS styles/<engineStyle>.js"""
    P = _style.load(style)
    return (P['dir'] / P['module']).read_text(encoding='utf8') if P.get('module') else engine_js(P['engineStyle'] + '.js')

def engine_scripts(style=None):
    """kit.js + sound.js + the style module, as one script text (tests)"""
    return '\n'.join([engine_js('kit.js'), engine_js('sound.js'), style_module_js(style)])

def style_info(style=None):
    """the part of the profile the player reads (window.STYLE)"""
    P = _style.load(style)
    return {k: P[k] for k in ('id', 'name', 'engineStyle', 'fonts')}

def head_scripts(key='naskh', timing=None, style=None):
    """engine + style module + library (theme first) + TIMING, in load order. The story's own scene files and core/subtitle.js + core/player.js follow."""
    fam, wt = arabic(key, style)[:2]; P = _style.load(style)
    timing = timing if timing is not None else {'chunks': [], 'words': []}
    return f"""<script>window.MS = {{ styles: {{}}, register(s) {{ this.styles[s.id] = s; }} }};</script>
<script>{engine_js('kit.js')}</script>
<script>{engine_js('sound.js')}</script>
<script>{style_module_js(style)}</script>
<script>window.STYLE = {json.dumps(style_info(style), ensure_ascii=False)};</script>
<script>window.ARABIC_FONT = {json.dumps(fam)}; window.ARABIC_WEIGHT = {wt};</script>
<script>const TIMING = {json.dumps(timing, ensure_ascii=False)};</script>
<script>{library_js(style)}</script>"""
