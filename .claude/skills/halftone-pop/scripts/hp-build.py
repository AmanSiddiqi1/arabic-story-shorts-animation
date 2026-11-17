#!/usr/bin/env python3
"""Assemble one self-contained Halftone Pop player (HTML) from a project folder.

usage: python3 hp-build.py [project_dir] [--config halftone.config.json] [--out file.html]

Reads halftone.config.json in the project folder (see templates/halftone.config.json) and writes <output>.html plus <output>.hp.json
(a small sidecar used by hp-render.mjs). Nothing outside the project folder is written. Needs only Python 3.8+ (standard library).
Order of inclusion: original engine -> config -> enhanced helpers/stage/subtitle -> optional example characters -> timing -> your scenes -> player.
"""
import argparse, base64, json, pathlib, sys

SKILL = pathlib.Path(__file__).resolve().parent.parent
b64 = lambda p: base64.b64encode(pathlib.Path(p).read_bytes()).decode()
rd = lambda p: pathlib.Path(p).read_text(encoding='utf8')

def merge(a, b):
    o = dict(a)
    for k, v in (b or {}).items(): o[k] = merge(a[k], v) if isinstance(v, dict) and isinstance(a.get(k), dict) else v
    return o

def fail(msg): print('hp-build: ' + msg, file=sys.stderr); sys.exit(1)

ap = argparse.ArgumentParser(); ap.add_argument('project', nargs='?', default='.'); ap.add_argument('--config', default='halftone.config.json'); ap.add_argument('--out')
a = ap.parse_args(); P = pathlib.Path(a.project).resolve(); cfgp = P / a.config
if not cfgp.exists(): fail(f'{cfgp} not found (create it with: node {SKILL}/scripts/new-project.mjs {P})')
cfg = json.loads(rd(cfgp)); layout = cfg.get('layout', '9x16')
if layout != '9x16': print(f'hp-build: note: layout "{layout}" is EXPERIMENTAL (only 9x16 has been rendered and checked)', file=sys.stderr)
fonts_css, specs, hp = [], [['400 60px "Bangers"', 'Abc']], {'layout': layout}
FD = SKILL / 'assets' / 'fonts'
fonts_css.append(f"@font-face{{font-family:'Bangers';font-weight:400;src:url(data:font/woff2;base64,{b64(FD/'bangers-latin-400.woff2')}) format('woff2');}}")
preset = cfg.get('preset')
if preset:
    pj = SKILL / 'presets' / f'{preset}.json'
    if not pj.exists(): fail(f'preset "{preset}" not found in {SKILL/"presets"}')
    pr = json.loads(rd(pj)); key = cfg.get('arabicFont', pr.get('defaultFont'))
    if key not in pr['fonts']: fail(f'font "{key}" not in preset {preset}: choose one of {list(pr["fonts"])}')
    f = pr['fonts'][key]; rng = pr['unicodeRange']
    for sub in ('arabic', 'latin'):
        fonts_css.append(f"@font-face{{font-family:'{f['family']}';font-weight:200 1000;src:url(data:font/woff2;base64,{b64(FD/f['files'][sub])}) format('woff2');unicode-range:{rng[sub]};}}")
    sub = json.loads(json.dumps(pr['subtitle']).replace('{{arabicFamily}}', f['family']).replace('"{{arabicWeight}}"', str(f['weight'])))
    hp['subtitle'] = merge(sub, cfg.get('subtitle', {})); hp['layout'] = cfg.get('layout', pr.get('layout', '9x16')); layout = hp['layout']
    specs.append([f"{f['weight']} 60px \"{f['family']}\"", pr['fontSampleText']])
    hp['preset'] = {'name': preset, 'font': key, 'family': f['family'], 'weight': f['weight']}
elif cfg.get('subtitle'): hp['subtitle'] = cfg['subtitle']
hp['fontSpecs'] = specs
if 'subtitle' in hp and 'subtitle' in cfg.get('disable', []): hp.pop('subtitle')
narr = cfg.get('narration'); audio_tag = ''; sidecar = {'layout': layout, 'audio': None}
if narr:
    n = (P / narr)
    if not n.exists(): fail(f'narration file not found: {n}')
    mime = 'audio/mpeg' if n.suffix.lower() == '.mp3' else 'audio/mp4' if n.suffix.lower() in ('.m4a', '.aac') else 'audio/wav' if n.suffix.lower() == '.wav' else 'application/octet-stream'
    audio_tag = f'<audio id="nar" preload="auto" src="data:{mime};base64,{b64(n)}"></audio>'; sidecar['audio'] = narr
timing = ''
if cfg.get('timing'):
    tp = P / cfg['timing']
    if not tp.exists(): fail(f'timing file not found: {tp}')
    timing = f"<script>const TIMING = {json.dumps(json.loads(rd(tp)), ensure_ascii=False)};</script>"
chars = []
for c in cfg.get('characters', []):
    cp = SKILL / 'examples' / 'characters' / f'{c}.js'
    if not cp.exists(): fail(f'example character library "{c}" not found in {cp.parent}')
    chars.append(cp)
scenes = []
for s in cfg.get('scenes', ['scene.js']):
    sp = P / s
    if not sp.exists(): fail(f'scene file not found: {sp}')
    scenes.append(sp)
E = SKILL / 'engine'
def motion_engine(n):   # the original Creator OS engine is not bundled: it comes from the installed claude-motion-faceless-skills repo (MIT)
    import os
    rel = {'kit.js': 'engine/kit.js', 'sound.js': 'engine/sound.js', 'halftone-pop.js': 'styles/halftone-pop.js'}[n]
    roots = ([pathlib.Path(os.environ['MOTION_STYLES'])] if os.environ.get('MOTION_STYLES') else []) + \
            [d / 'claude-motion-faceless-skills' / 'skills' / 'motion-styles' for d in SKILL.resolve().parents] + [pathlib.Path.home() / '.claude' / 'skills' / 'motion-styles']
    for r in roots:
        if (r / rel).exists(): return r / rel
    fail('Creator OS engine not found: clone https://github.com/kevinbadi/claude-motion-faceless-skills next to this project, or set MOTION_STYLES')
W, H = {'9x16': (1080, 1920), '9x16-nocaption': (1080, 1920), '16x9': (1920, 1080), '1x1': (1080, 1080)}.get(layout, (1080, 1920))
title = cfg.get('title', 'Halftone Pop film'); out = pathlib.Path(a.out) if a.out else P / (cfg.get('output', 'film') + '.html')
scripts = [f"<script>window.MS = {{ styles: {{}}, register(s) {{ this.styles[s.id] = s; }} }};</script>"] + [f'<script>{rd(motion_engine(n))}</script>' for n in ('kit.js', 'sound.js', 'halftone-pop.js')]
scripts.append(f"<script>window.HP_CONFIG = {json.dumps(hp, ensure_ascii=False)};</script>")
scripts += [f'<script>{rd(E/"enhanced"/n)}</script>' for n in ('helpers.js', 'stage.js', 'subtitle.js')]
scripts += [f'<script>{rd(c)}</script>' for c in chars] + ([timing] if timing else []) + [f'<script>{rd(s)}</script>' for s in scenes] + [f'<script>{rd(E/"enhanced"/"player.js")}</script>']
html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} (Halftone Pop {layout})</title>
<style>{chr(10).join(fonts_css)}
html,body{{margin:0;height:100%;background:#15130f;color:#eee;font:14px system-ui,sans-serif}}
#wrap{{display:flex;flex-direction:column;align-items:center;height:100%}}
#stage{{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;width:100%}}
canvas{{max-height:100%;max-width:100%;aspect-ratio:{W}/{H};background:#000}}
#bar{{display:flex;gap:12px;align-items:center;padding:8px 14px;width:min(100%,640px);box-sizing:border-box}}
#bar button{{background:#ffd21f;color:#141414;border:0;border-radius:6px;padding:6px 14px;font-weight:700;cursor:pointer}}
#bar input[type=range]{{flex:1}} #bar label{{white-space:nowrap}} #tm{{font-variant-numeric:tabular-nums;min-width:96px}}
</style></head><body>
<div id="wrap"><div id="stage"><canvas id="c" width="{W}" height="{H}"></canvas></div>
<div id="bar"><button id="pp">Play</button><input id="sc" type="range" min="0" max="1000" value="0"><span id="tm">0:00 / 0:00</span>
<label><input id="snd" type="checkbox" checked> sound</label><label><input id="lp" type="checkbox" checked> loop</label></div></div>
{audio_tag}
{chr(10).join(scripts)}
</body></html>"""
out.write_text(html, encoding='utf8'); out.with_suffix('.hp.json').write_text(json.dumps(sidecar, indent=1)); print(f'built {out} ({len(html)/1e6:.2f} MB), layout {layout}' + (f', preset {preset}/{hp["preset"]["font"]}' if preset else ''))
