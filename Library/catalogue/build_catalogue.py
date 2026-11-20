# Builds catalogue.html: every cast member in its sample poses, an acting demo, props and sets. Render it with: node catalogue.mjs
#   python3 build_catalogue.py [--style <id>]   (default halftone-pop -> this folder; another style -> Library/styles/<id>/catalogue/,
#   render it with: node catalogue.mjs --style <id>)
import pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE.parent))
from lib import head_scripts, font_css
import style
STY = sys.argv[sys.argv.index('--style') + 1] if '--style' in sys.argv else style.DEFAULT
P = style.load(STY); OUT = HERE if STY == style.DEFAULT else P['dir'] / 'catalogue'
page = f"""<!doctype html><html><head><meta charset="utf-8"><title>Kalila wa Dimna library catalogue</title>
<style>{font_css('naskh', STY)} body{{margin:0;background:{P['catalogue']['background'] if 'catalogue' in P else '#fff'}}} canvas{{display:block}}</style></head><body>
<canvas id="cast"></canvas><canvas id="sets"></canvas><canvas id="people"></canvas><canvas id="animals"></canvas>
{head_scripts('naskh', None, STY)}
<script>
const T = 2.0, CW = 300, CH = 330, LW = 230;
function label(c, text, x, y, size = 30, col = C.black) {{ c.font = K.font(size, BF, 400); c.fillStyle = col; c.textAlign = 'center'; c.fillText(text, x, y); }}
function drawCast() {{
  const G = Object.keys(PERSON_HANDS), gest = (ks) => ks.map((k) => ({{ label: k, P: {{ kind: 'owner', handL: PERSON_HANDS[k].L, handR: PERSON_HANDS[k].R, mouth: 'smile' }} }}));
  const rows = [...CAST.map((e) => ({{ name: e.name, from: e.from, h: e.h, w: e.w, cells: e.poses }})),
    {{ name: 'gestures', from: 'person handL/handR = PERSON_HANDS.<name>', h: 300, w: 180, cells: gest(G.slice(0, 8)), fn: 'person' }},
    {{ name: 'gestures', from: '(continued)', h: 300, w: 180, cells: gest(G.slice(8, 16)), fn: 'person' }},
    {{ name: 'gestures', from: '(continued) + wink', h: 300, w: 180, cells: [...gest(G.slice(16)), {{ label: 'wink', P: {{ kind: 'owner', wink: 'R', mouth: 'smile', handR: PERSON_HANDS.moustache.R }} }}], fn: 'person' }},
    {{ name: 'acting', from: 'shared fields, every character', h: 290, w: 440, cells: [{{ label: 'gaze left', P: {{ gaze: [-1, 0] }} }}, {{ label: 'gaze up', P: {{ gaze: [0.3, -1] }} }}, {{ label: 'lid 0.6', P: {{ lid: 0.6 }} }}, {{ label: 'wet', P: {{ wet: true, gaze: [1, 0.3] }} }}, {{ label: 'sq 0.85', P: {{ sq: 0.85 }} }}, {{ label: 'sq 1.1, tip', P: {{ sq: 1.1, tip: 0.12 }} }}], fn: 'lion' }}];
  const cols = Math.max(...rows.map((r) => r.cells.length)), cv = document.getElementById('cast'), c = cv.getContext('2d');
  cv.width = LW + cols * CW; cv.height = rows.length * CH + 20; c.fillStyle = C.paper; c.fillRect(0, 0, cv.width, cv.height);
  rows.forEach((r, i) => {{ const y0 = i * CH + 10; label(c, r.name.toUpperCase(), LW / 2, y0 + CH / 2, 50); c.font = '16px sans-serif'; c.fillStyle = '#555'; c.fillText(r.from, LW / 2, y0 + CH / 2 + 30);
    r.cells.forEach((cell, j) => {{ const x0 = LW + j * CW; c.strokeStyle = '#d8cba6'; c.lineWidth = 2; c.strokeRect(x0 + 4, y0 + 4, CW - 8, CH - 8);
      const s = Math.min(1, (CH - 90) / r.h, (CW - 30) / r.w) * 0.95, name = r.fn || r.name, P = {{ x: x0 + CW / 2, y: y0 + CH - 60, s, dir: 1, ...(cell.P || {{}}) }};
      if (name === 'songbird') P.y -= 40; if (name === 'turtle') P.s *= 0.85;
      if (name === 'person') P.s *= 0.95;
      c.save(); window[name](c, P); c.restore(); label(c, cell.label, x0 + CW / 2, y0 + CH - 18, 24); }}); }});
}}
function drawSets() {{
  const cv = document.getElementById('sets'), c = cv.getContext('2d'), n = SETS.length + 1, cols = 4, cw = 400, ch = 520, rowsN = Math.ceil(n / cols);
  cv.width = cols * cw + 20; cv.height = rowsN * ch + 20; c.fillStyle = C.paper; c.fillRect(0, 0, cv.width, cv.height);
  const off = K.layer(1000, 1450), o = off.getContext('2d');
  SETS.forEach((e, i) => {{ o.setTransform(1, 0, 0, 1, 0, 0); o.fillStyle = C.paper; o.fillRect(0, 0, 1000, 1450); o.save(); e.draw(o, T); o.restore();
    const x0 = 10 + (i % cols) * cw, y0 = 10 + Math.floor(i / cols) * ch; c.drawImage(off, 0, 0, 1000, 1230, x0 + 8, y0 + 8, cw - 16, (cw - 16) * 1.23); c.strokeStyle = C.black; c.lineWidth = 4; c.strokeRect(x0 + 8, y0 + 8, cw - 16, (cw - 16) * 1.23);
    c.font = '17px sans-serif'; c.fillStyle = C.black; c.textAlign = 'center'; c.fillText(e.name, x0 + cw / 2, y0 + ch - 14); }});
  // props cell
  const i = SETS.length, x0 = 10 + (i % cols) * cw, y0 = 10 + Math.floor(i / cols) * ch; label(c, 'PROPS', x0 + cw / 2, y0 + 40, 36);
  PROPS.forEach((p, k) => {{ const px = x0 + 90 + (k % 2) * 200, pyy = y0 + 150 + Math.floor(k / 2) * 140; c.save(); c.translate(px, pyy); c.scale(0.8, 0.8); p.draw(c, 0, 0, T); c.restore(); c.font = '14px sans-serif'; c.fillStyle = '#333'; c.fillText(p.label, px, pyy + 36); }});
}}
function drawPeople() {{
  const cv = document.getElementById('people'), c = cv.getContext('2d'), cols = Math.max(...PEOPLE_SHEET.map((r) => r.cells.length)), PH = 360;
  cv.width = LW + cols * CW; cv.height = PEOPLE_SHEET.length * PH + 20; c.fillStyle = C.paper; c.fillRect(0, 0, cv.width, cv.height);
  PEOPLE_SHEET.forEach((r, i) => {{ const y0 = i * PH + 10; label(c, r.name.toUpperCase(), LW / 2, y0 + PH / 2, 44); c.font = '16px sans-serif'; c.fillStyle = '#555'; c.fillText(r.from, LW / 2, y0 + PH / 2 + 30);
    r.cells.forEach((cell, j) => {{ const x0 = LW + j * CW; c.strokeStyle = '#d8cba6'; c.lineWidth = 2; c.strokeRect(x0 + 4, y0 + 4, CW - 8, PH - 8);
      const P = {{ x: x0 + CW / 2 + (cell.dx || 0), y: y0 + PH - 60 + (cell.dy || 0), s: 1, dir: 1, ...(cell.P || {{}}) }};
      if (cell.world) {{ if (P.handLW) P.handLW = [P.x + P.handLW[0], P.y + P.handLW[1]]; if (P.handRW) P.handRW = [P.x + P.handRW[0], P.y + P.handRW[1]]; }}
      c.save(); person(c, P); c.restore(); label(c, cell.label, x0 + CW / 2, y0 + PH - 18, 24); }}); }});
}}
function drawAnimals() {{
  const cv = document.getElementById('animals'), c = cv.getContext('2d'), AW = 330, AH = 420, cols = Math.max(...ANIMAL_SHEET.map((r) => r.cells.length));
  cv.width = LW + cols * AW; cv.height = ANIMAL_SHEET.length * AH + 20; c.fillStyle = C.paper; c.fillRect(0, 0, cv.width, cv.height);
  ANIMAL_SHEET.forEach((r, i) => {{ const y0 = i * AH + 10; label(c, r.name.toUpperCase(), LW / 2, y0 + AH / 2, 40);
    r.cells.forEach((cell, j) => {{ const x0 = LW + j * AW; c.strokeStyle = '#d8cba6'; c.lineWidth = 2; c.strokeRect(x0 + 4, y0 + 4, AW - 8, AH - 8);
      c.save(); c.beginPath(); c.rect(x0 + 4, y0 + 4, AW - 8, AH - 8); c.clip(); c.strokeStyle = '#c9b88a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0 + 10, y0 + AH - 60); c.lineTo(x0 + AW - 10, y0 + AH - 60); c.stroke();
      try {{ cell.draw(c, x0 + AW / 2, y0 + AH - 60, r.s); }} catch (e) {{ console.error('animals ' + r.name + ' ' + cell.label + ': ' + e.stack); }} c.restore(); label(c, cell.label, x0 + AW / 2, y0 + AH - 18, 22); }}); }});
}}
Promise.all([document.fonts.load('40px "' + BF + '"'), document.fonts.ready]).then(() => {{ try {{ drawCast(); }} catch (e) {{ console.error("cast: " + e.stack); }} try {{ drawSets(); }} catch (e) {{ console.error("sets: " + e.stack); }} try {{ drawPeople(); }} catch (e) {{ console.error("people: " + e.stack); }} try {{ drawAnimals(); }} catch (e) {{ console.error("animals: " + e.stack); }} window.__ready = true; }});
</script></body></html>"""
OUT.mkdir(parents=True, exist_ok=True); (OUT / 'catalogue.html').write_text(page, encoding='utf8'); print(OUT / 'catalogue.html', round(len(page) / 1e6, 2), 'MB')
