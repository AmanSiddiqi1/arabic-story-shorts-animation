# Kalila wa Dimna shared library: helpers for a story's build.py.
#   import sys, pathlib; sys.path.insert(0, str(find_library()))   (see template/build.py)
#   from lib import head_scripts, font_css, FONTS
# head_scripts(...) returns the <script> tags for the engine + the whole library, in load order, all inline.
import base64, json, pathlib
from engine import engine_js   # Creator OS engine from the installed claude-motion-faceless-skills repo (not in this repository)

LIB = pathlib.Path(__file__).resolve().parent
FONTS = LIB / 'fonts'
# load order matters: engine, helpers (uses ARABIC_FONT), palette, cast, props, fx, sets, motion, registry (wraps the cast)
ORDER = ['core/helpers.js', 'palette.js',
         'cast/lion.js', 'cast/hare.js', 'cast/deer.js', 'cast/fox.js', 'cast/monkey.js', 'cast/turtle.js', 'cast/birds.js', 'cast/elephant.js', 'cast/frog.js', 'cast/people.js',
         'cast/hooves.js', 'cast/small.js', 'cast/birds2.js',
         'props/nest.js', 'props/things.js', 'fx/fx.js',
         'sets/sky.js', 'sets/ground.js', 'sets/trees.js', 'sets/places.js', 'sets/towns.js',
         'motion.js', 'registry.js']
ARABIC = {'naskh': ('Noto Naskh Arabic', 700, 'naskh-arabic-700', 'naskh-latin-700'),
          'cairo': ('Cairo', 800, 'cairo-arabic-800', 'cairo-latin-800'),
          'scheherazade': ('Scheherazade New', 700, 'sch-arabic-700', 'sch-latin-700')}
ARABIC_RANGE = 'U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC'

def _b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def read(rel): return (LIB / rel).read_text(encoding='utf8')

def font_css(key='naskh'):
    fam, wt, fa, fl = ARABIC[key]
    return f"""
@font-face{{font-family:'Bangers';font-weight:400;src:url(data:font/woff2;base64,{_b64(FONTS / 'bangers-latin-400.woff2')}) format('woff2');}}
@font-face{{font-family:'{fam}';font-weight:200 1000;src:url(data:font/woff2;base64,{_b64(FONTS / (fa + '.woff2'))}) format('woff2');unicode-range:{ARABIC_RANGE};}}
@font-face{{font-family:'{fam}';font-weight:200 1000;src:url(data:font/woff2;base64,{_b64(FONTS / (fl + '.woff2'))}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122;}}
"""

def library_js():
    return '\n'.join(f'// ---------- Library/{rel} ----------\n' + read(rel) for rel in ORDER)

def head_scripts(key='naskh', timing=None):
    """engine + library + TIMING, in load order. The story's own scene files and core/subtitle.js + core/player.js follow."""
    fam, wt = ARABIC[key][:2]
    timing = timing if timing is not None else {'chunks': [], 'words': []}
    return f"""<script>window.MS = {{ styles: {{}}, register(s) {{ this.styles[s.id] = s; }} }};</script>
<script>{engine_js('kit.js')}</script>
<script>{engine_js('sound.js')}</script>
<script>{engine_js('halftone-pop.js')}</script>
<script>window.ARABIC_FONT = {json.dumps(fam)}; window.ARABIC_WEIGHT = {wt};</script>
<script>const TIMING = {json.dumps(timing, ensure_ascii=False)};</script>
<script>{library_js()}</script>"""
