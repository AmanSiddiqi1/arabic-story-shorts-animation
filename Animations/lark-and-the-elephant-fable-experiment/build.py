# builds one self-contained HTML player: engine + style + scene + fonts + narration, all inline
import base64, json, pathlib, sys
FONTS = {'cairo': ('Cairo', 800, 'cairo-arabic-800', 'cairo-latin-800', 'Cairo'), 'naskh': ('Noto Naskh Arabic', 700, 'naskh-arabic-700', 'naskh-latin-700', 'Noto Naskh Arabic'), 'scheherazade': ('Scheherazade New', 700, 'sch-arabic-700', 'sch-latin-700', 'Scheherazade New')}
KEY = sys.argv[1] if len(sys.argv) > 1 else 'naskh'
FAM, WT, FA, FL, TAG = FONTS[KEY]
H = pathlib.Path(__file__).parent
S = H / 'src'
b64 = lambda p: base64.b64encode(pathlib.Path(p).read_bytes()).decode()
rd = lambda n: (S / n).read_text(encoding='utf8')
# Creator OS engine (kit.js, sound.js, halftone-pop.js) comes from the installed claude-motion-faceless-skills repo (Library/engine.py)
import sys as _sys; _sys.path.insert(0, str(H.resolve().parents[1] / 'Library')); from engine import engine_js
timing = json.loads((H / 'timing.json').read_text(encoding='utf8'))
arabic_range = 'U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC'
fonts = f"""
@font-face{{font-family:'Bangers';font-weight:400;src:url(data:font/woff2;base64,{b64(H/'fonts'/'bangers-latin-400.woff2')}) format('woff2');}}
@font-face{{font-family:'{FAM}';font-weight:200 1000;src:url(data:font/woff2;base64,{b64(H/'fonts'/(FA+'.woff2'))}) format('woff2');unicode-range:{arabic_range};}}
@font-face{{font-family:'{FAM}';font-weight:200 1000;src:url(data:font/woff2;base64,{b64(H/'fonts'/(FL+'.woff2'))}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122;}}
"""
audio = b64(H / 'narration.mp3')
html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Lark and the Elephant - Fable director experiment (9:16)</title>
<style>{fonts}
html,body{{margin:0;height:100%;background:#15130f;color:#eee;font:14px system-ui,sans-serif}}
#wrap{{display:flex;flex-direction:column;align-items:center;height:100%}}
#stage{{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;width:100%}}
canvas{{height:100%;max-width:100%;aspect-ratio:9/16;background:#000}}
#bar{{display:flex;gap:12px;align-items:center;padding:8px 14px;width:min(100%,640px);box-sizing:border-box}}
#bar button{{background:#ffd21f;color:#141414;border:0;border-radius:6px;padding:6px 14px;font-weight:700;cursor:pointer}}
#bar input[type=range]{{flex:1}} #bar label{{white-space:nowrap}} #tm{{font-variant-numeric:tabular-nums;min-width:96px}}
</style></head><body>
<div id="wrap"><div id="stage"><canvas id="c" width="1080" height="1920"></canvas></div>
<div id="bar"><button id="pp">Play</button><input id="sc" type="range" min="0" max="1000" value="0"><span id="tm">0:00 / 0:00</span>
<label><input id="snd" type="checkbox" checked> sound</label><label><input id="lp" type="checkbox" checked> loop</label></div></div>
<audio id="nar" preload="auto" src="data:audio/mpeg;base64,{audio}"></audio>
<script>window.MS = {{ styles: {{}}, register(s) {{ this.styles[s.id] = s; }} }};</script>
<script>{engine_js('kit.js')}</script>
<script>{engine_js('sound.js')}</script>
<script>{engine_js('halftone-pop.js')}</script>
<script>window.ARABIC_FONT = {json.dumps(FAM)}; window.ARABIC_WEIGHT = {WT};</script>
<script>const TIMING = {json.dumps(timing, ensure_ascii=False)};</script>
<script>{rd('scene_a.js')}
{rd('birds.js')}
{rd('subtitle.js')}
{rd('seq_tragedy.js')}
{rd('scene_d.js')}</script>
<script>{rd('player.js')}</script>
</body></html>"""
out = H / f'The Lark and the Elephant - Halftone Pop 9x16 - {TAG}.html'
out.write_text(html, encoding='utf8')
print(out.name, round(len(html) / 1e6, 2), 'MB')
