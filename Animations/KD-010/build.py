# builds one self-contained HTML player: engine + shared Library + this story's scene + fonts + narration, all inline
#   python3 build.py [naskh|cairo|scheherazade]
# story.json: title, style (a profile in Library/styles/, default halftone-pop), arabicFont, scenes (files in src/, in load order),
#   optional narration (default narration.mp3),
#   BUILD_OUT_DIR=<dir> writes the player there instead of next to this file (tests); narration resolves through Library/media.py
#   optional subtitle: 'library' (default, core/subtitle.js) or 'scene' (the scene files define subtitle() and S0)
import base64, json, pathlib, sys
H = pathlib.Path(__file__).resolve().parent
LIBDIR = next((p / 'Library' for p in H.parents if (p / 'Library' / 'lib.py').exists()), None)
assert LIBDIR, 'Kalila wa Dimna/Library not found above ' + str(H)
sys.path.insert(0, str(LIBDIR)); from lib import head_scripts, font_css, read, arabic
import style   # style profile (Library/styles/<id>/style.json): engine module, theme, fonts, file names
import media, os  # media resolver (media.config.json): local narration by default, a shared media root only if one is set
CFG = json.loads((H / 'story.json').read_text(encoding='utf8'))
STY = style.load(CFG); UI = STY['player']
KEY = sys.argv[1] if len(sys.argv) > 1 else CFG.get('arabicFont', STY.get('arabicFont', 'naskh')); FAM = arabic(KEY, CFG)[0]
tj = H / 'timing.json'; timing = json.loads(tj.read_text(encoding='utf8')) if tj.exists() else {'chunks': [], 'words': []}
nar = media.resolve(H / CFG.get('narration', 'narration.mp3')); audio = f'src="data:audio/mpeg;base64,{base64.b64encode(nar.read_bytes()).decode()}"' if nar.exists() else ''
scenes = '\n'.join((H / 'src' / f).read_text(encoding='utf8') for f in CFG['scenes'])
html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{CFG['title']} - {STY['playerTitle']}</title>
<style>{font_css(KEY, CFG)}
html,body{{margin:0;height:100%;background:{UI['page']};color:#eee;font:14px system-ui,sans-serif}}
#wrap{{display:flex;flex-direction:column;align-items:center;height:100%}}
#stage{{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;width:100%}}
canvas{{height:100%;max-width:100%;aspect-ratio:9/16;background:#000}}
#bar{{display:flex;gap:12px;align-items:center;padding:8px 14px;width:min(100%,640px);box-sizing:border-box}}
#bar button{{background:{UI['button']};color:{UI['buttonText']};border:0;border-radius:6px;padding:6px 14px;font-weight:700;cursor:pointer}}
#bar input[type=range]{{flex:1}} #bar label{{white-space:nowrap}} #tm{{font-variant-numeric:tabular-nums;min-width:96px}}
</style></head><body>
<div id="wrap"><div id="stage"><canvas id="c" width="1080" height="1920"></canvas></div>
<div id="bar"><button id="pp">Play</button><input id="sc" type="range" min="0" max="1000" value="0"><span id="tm">0:00 / 0:00</span>
<label><input id="snd" type="checkbox" checked> sound</label><label><input id="lp" type="checkbox" checked> loop</label></div></div>
<audio id="nar" preload="auto" {audio}></audio>
{head_scripts(KEY, timing, CFG)}
<script>{read('core/subtitle.js') if CFG.get('subtitle', 'library') == 'library' else ''}
{scenes}</script>
<script>{read('core/player.js')}</script>
</body></html>"""
name = style.film_name(CFG, FAM) + '.html'   # the player: next to this file, or in the media folder's Working files (media.out)
out = pathlib.Path(os.environ['BUILD_OUT_DIR']) / name if os.environ.get('BUILD_OUT_DIR') else media.out(H / name)
out.write_text(html, encoding='utf8'); print(out.name, round(len(html) / 1e6, 2), 'MB')
