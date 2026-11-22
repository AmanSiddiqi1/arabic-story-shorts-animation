// ===== ALI-05 series sets, props and effects (new in episode 5, for episode 6: copy this file into ALI-06 src/ and extend there) =====
// dinnerRoom (DR anchors: a 1600 x 1230 family dining room, floor y 900, baked plate + live lamps, bead curtain, door and window
// views, cushions, the low table in a front pass), shopFront (a coral and cream booth over the market: Morgiana's shop in episode 6),
// props (giftBox, crate, teaCup, ewer, lentilBowl, the table food), effects (voiceWave, clueCounter, windowView, memoryPanel) and the
// cupFumble motion. Colours are warm and bright (amber and teal room, six cushion colours); no tint over the cast.
// Every drawing is a pure function of its arguments (and t).

// ---------- dinnerRoom anchors (world 1600 x 1230; the back wall meets the floor at y 790) ----------
const DR = {
  w: 1600, gr: 900, wallBase: 790,
  win: { x: 120, y: 420, w: 200, h: 200 }, niche: { x0: 400, x1: 600, top: 380, bot: 600 },
  lamps: [[380, 250], [800, 230], [1220, 250]], table: { x0: 560, x1: 1040, cx: 800, top: 820, y: 880 },
  arch: { x0: 1040, x1: 1170, top: 470, bot: 790 }, door: { x0: 1340, x1: 1480, top: 500, bot: 880 }, chest: { x0: 1500, x1: 1590, top: 812, y: 884 },
  seats: { ali: 480, wife: 640, kid: 780, neph: 930, guest: 1220, honour: 560 }, backY: 878, frontY: 905,
  cush: { ali: '#e8364f', wife: '#f2a71b', kid: '#3f7ad0', neph: '#8e4a8e', guest: '#2a9a96', honour: '#f08aa8' },
};
// ---------- the plate (walls, frieze, niche, shelves, tapestry, floor and rugs), baked once ----------
function drPlate() {
  return abBakeAt('a5dinner', 1600, 1230, (c, w) => {
    abGrad(c, 0, 0, w, 800, [[0, '#e2a26a'], [0.3, '#f4c88e'], [1, '#eeb47c']]);
    for (const [lx, ly] of DR.lamps) abGlaze(c, lx, ly + 80, 380, '#fff2c8', 0.55);
    // ceiling beams and the teal frieze with gold diamonds
    c.fillStyle = '#8a5232'; c.fillRect(0, 0, w, 64); for (let x = -20; x < w; x += 190) { celShade(c, K.rectPts(x, 52, 46, 34), '#a8663a', '#6a3a1e', { light: [-1, -1], off: 6, lw: 3, line: '#4a2410' }); }
    c.fillStyle = '#1f8a8a'; c.fillRect(0, 300, w, 38); c.fillStyle = '#ffcf3a'; for (let x = 10; x < w; x += 44) { c.beginPath(); c.moveTo(x, 319); c.lineTo(x + 10, 307); c.lineTo(x + 20, 319); c.lineTo(x + 10, 331); c.closePath(); c.fill(); }
    // tiled dado
    c.fillStyle = '#e8f0f0'; c.fillRect(0, 680, w, 110); const tl = ['#2f7ad0', '#2a9a96', '#e8742a'];
    for (let x = 0, i = 0; x < w; x += 40, i++) for (let y = 690, j = 0; y < 780; y += 40, j++) { c.fillStyle = tl[(i + j) % 3]; c.save(); c.translate(x + 20, y + 20); c.rotate(Math.PI / 4); c.fillRect(-11, -11, 22, 22); c.restore(); }
    c.fillStyle = '#c8644a'; c.fillRect(0, 676, w, 10); c.fillRect(0, 780, w, 12);
    // niche with brass pots and a blue vase
    const N = DR.niche, np = townArchPts(N.x0, N.x1, N.top, N.bot, 'pointed'); celShade(c, townArchPts(N.x0 - 14, N.x1 + 14, N.top - 14, N.bot + 6, 'pointed'), '#fbe0b0', '#d8a878', { light: [-1, -1], off: 6, lw: 3, line: '#8a5a3a' });
    c.save(); K.poly(c, np, true); c.clip(); abGrad(c, N.x0, N.top, 200, 220, [[0, '#9a4a3a'], [1, '#c8704a']]); c.restore();
    seg(c, N.x0, 520, N.x1, 520, 8, '#8a5232', 2); abBlob(c, 450, 500, 26, 22, '#ffcf3a', '#c08a1a', { lw: 2.5, hi: '#fff3b0' }); abBlob(c, 505, 488, 22, 32, '#2f7ad0', '#1a4aa0', { lw: 2.5, hi: '#9ac8ff' }); abBlob(c, 556, 502, 24, 18, '#e8a040', '#b06a1a', { lw: 2.5 });
    abBlob(c, 470, 586, 30, 14, '#ffcf3a', '#c08a1a', { lw: 2.5 }); abBlob(c, 540, 582, 26, 18, '#e8364f', '#a81a2a', { lw: 2.5 });
    // tapestry over the table (red and gold with a teal medallion)
    celShade(c, K.rectPts(650, 370, 300, 200), '#c8343a', '#8a1a22', { light: [-1, -1], off: 10, lw: 3, line: '#5a0a14' }); c.strokeStyle = '#ffcf3a'; c.lineWidth = 6; c.strokeRect(664, 384, 272, 172);
    abBlob(c, 800, 470, 60, 44, '#2a9a96', '#1a6a6a', { lw: 3, line: '#0a3a3a' }); abBlob(c, 800, 470, 24, 18, '#ffcf3a', '#c08a1a', { lw: 2 }); seg(c, 640, 366, 960, 366, 7, '#8a5232', 2);
    for (let x = 670; x <= 930; x += 26) seg(c, x, 570, x, 590, 4, '#ffcf3a', 0);
    // kitchen arch (warm passage; the bead curtain is live)
    const A = DR.arch; celShade(c, townArchPts(A.x0 - 16, A.x1 + 16, A.top - 16, A.bot, 'round'), '#fbe0b0', '#d8a878', { light: [-1, -1], off: 6, lw: 3, line: '#8a5a3a' });
    c.save(); K.poly(c, townArchPts(A.x0, A.x1, A.top, A.bot, 'round'), true); c.clip(); abGrad(c, A.x0, A.top, 130, 330, [[0, '#ffcf8a'], [1, '#e8945a']]); abBlob(c, 1105, 700, 40, 14, '#b8643a', '#7a3a1e', { lw: 2 }); seg(c, A.x0, 640, A.x1, 640, 6, '#8a5232', 1.5);
    for (const [px, col] of [[1070, '#2f7ad0'], [1100, '#ffcf3a'], [1135, '#e8364f']]) abBlob(c, px, 626, 12, 14, col, abDark(col, 0.3), { lw: 2 }); c.restore();
    // shelf with plates between the arch and the door
    seg(c, 1190, 560, 1320, 560, 10, '#8a5232', 2); for (const [px, col] of [[1210, '#2f7ad0'], [1250, '#fffaf0'], [1290, '#e8742a']]) abBlob(c, px, 530, 18, 28, col, abDark(col, 0.25), { lw: 2.5 });
    // courtyard door frame (the view and the leaf are live)
    const D = DR.door; celShade(c, townArchPts(D.x0 - 18, D.x1 + 18, D.top - 18, D.bot, 'pointed'), '#fbe0b0', '#d8a878', { light: [-1, -1], off: 6, lw: 3, line: '#8a5a3a' });
    // street window frame recess (the view and the lattice are live)
    const W = DR.win; celShade(c, K.rectPts(W.x - 16, W.y - 16, W.w + 32, W.h + 34), '#fbe0b0', '#d8a878', { light: [-1, -1], off: 6, lw: 3, line: '#8a5a3a' });
    // floor: warm tiles, two rugs, scattered floor cushions and a brass tray stand
    abGrad(c, 0, 790, w, 440, [[0, '#d8925e'], [1, '#b8704a']]); c.strokeStyle = 'rgba(122,62,34,0.35)'; c.lineWidth = 2; for (let y = 820; y < 1230; y += 46) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    for (let x = -400; x < w + 400; x += 90) { c.beginPath(); c.moveTo(x, 790); c.lineTo(x + (x - 800) * 0.5, 1230); c.stroke(); }
    const rug = (x0, x1, y0, y1, col, bd, md) => { const sk = 60; celShade(c, [[x0 + sk, y0], [x1 - sk, y0], [x1, y1], [x0, y1]], col, abDark(col, 0.25), { light: [-1, -1], off: 8, lw: 3, line: abDark(col, 0.6) });
      c.strokeStyle = bd; c.lineWidth = 10; c.beginPath(); c.moveTo(x0 + sk + 20, y0 + 14); c.lineTo(x1 - sk - 20, y0 + 14); c.lineTo(x1 - 24, y1 - 14); c.lineTo(x0 + 24, y1 - 14); c.closePath(); c.stroke();
      for (let k = 0; k < 3; k++) { const mx = K.lerp(x0 + 160, x1 - 160, k / 2), my = (y0 + y1) / 2; c.fillStyle = md; c.beginPath(); c.moveTo(mx, my - 40); c.lineTo(mx + 60, my); c.lineTo(mx, my + 40); c.lineTo(mx - 60, my); c.closePath(); c.fill(); }
      for (let x = x0 + 10; x < x1; x += 16) seg(c, x, y1, x, y1 + 14, 3, '#fff1d8', 0); };
    rug(330, 1330, 850, 1150, '#c8343a', '#ffcf3a', '#2a9a96'); rug(1250, 1600, 900, 1060, '#2f5ab8', '#f2a71b', '#fff1d8'); rug(-40, 300, 920, 1080, '#2a9a96', '#ffcf3a', '#e8742a');
    for (const [x, y, col] of [[60, 1170, '#f2a71b'], [1480, 1180, '#e8364f'], [250, 1190, '#8e4a8e']]) abBlob(c, x, y, 70, 26, col, abDark(col, 0.3), { lw: 3, hi: abLight(col, 0.3) });
    // plants in pots at both ends
    for (const px of [40, 1560]) { celShade(c, [[px - 30, 790], [px + 30, 790], [px + 22, 740], [px - 22, 740]], '#c8643a', '#8a3a1e', { off: 6, lw: 3 }); for (let k = 0; k < 6; k++) { c.save(); c.translate(px, 742); c.rotate(-0.9 + k * 0.36); celShade(c, ell(0, -50, 14, 50, 14), '#4fae6a', '#2a7a50', { off: 5, lw: 2.5, line: '#1a4a30' }); c.restore(); } }
  });
}
// the chest by the door (gift box on top is drawn by the scene)
function drChest(ctx) { const C0 = DR.chest; celShade(ctx, K.rectPts(C0.x0, C0.top, C0.x1 - C0.x0, C0.y - C0.top), '#a8522c', '#64281a', { light: [-1, -1], off: 10, lw: 3.5, line: '#3a160c' });
  for (const bx of [C0.x0 + 14, C0.x1 - 22]) shape(ctx, K.rectPts(bx, C0.top, 8, C0.y - C0.top), '#ffcf3a', { lw: 2, line: '#8a5a12' }); shape(ctx, K.rectPts((C0.x0 + C0.x1) / 2 - 9, C0.top + 22, 18, 18), '#ffcf3a', { lw: 2 }); }
// the bead curtain of the kitchen arch: strings sway on twos; part 0..1 opens a gap at x (somebody passing)
function drBeads(ctx, t, part = 0, px = 1105) { const A = DR.arch, tc = AB_T2(t), cols = ['#ffcf3a', '#e8364f', '#2a9a96', '#fffaf0'];
  for (let i = 0; i < 9; i++) { const x0 = A.x0 + 10 + i * 13.5, dx = x0 - px, push = part * Math.sign(dx || 1) * Math.max(0, 70 - Math.abs(dx)) * 0.9, sw = 3 * Math.sin(tc * 2.2 + i * 0.9);
    for (let k = 0; k < 14; k++) { const u = k / 13, x = x0 + (push + sw) * u * u, y = A.top + 40 + k * 21; ctx.fillStyle = cols[(i + k) % 4]; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); } } }
// a floor cushion (seat), squash sq (1 = round), spin (radians, a knocked cushion)
function drCushion(ctx, x, y, col, sq = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, sq); abBlob(ctx, 0, -12, 74, 24, col, abDark(col, 0.3), { lw: 3, hi: abLight(col, 0.35), line: abDark(col, 0.6) });
  for (const sd of [-1, 1]) abBlob(ctx, sd * 70, -12, 9, 9, '#ffcf3a', '#c08a1a', { lw: 2 }); ctx.restore(); }
// hanging lamps (brass, on chains) with live halation, flicker on twos
function drLamps(ctx, t, k = 1) { const tc = AB_T2(t); DR.lamps.forEach(([lx, ly], i) => { const f = 0.86 + 0.14 * Math.sin(tc * 11 + i * 2.3) * Math.sin(tc * 5.3 + i);
  seg(ctx, lx, 64, lx, ly - 30, 3, '#6a4a2a', 0); celShade(ctx, [[lx - 34, ly - 30], [lx + 34, ly - 30], [lx + 22, ly + 8], [lx - 22, ly + 8]], '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 6, hi: '#fff3b0', lw: 2.5, line: '#6a4410' });
  celShade(ctx, [[lx - 12, ly + 8], [lx + 12, ly + 8], [lx, ly + 30]], '#e8742a', '#b04a1a', { off: 3, lw: 2 }); abGlow(ctx, lx, ly, 260 * f, 0.5 * k, '#ffd890'); abGlow(ctx, lx, ly - 6, 60, 0.9 * k * f, '#fff6d0'); }); }
// the low table: a round brass tray on a carved stand with the evening's food (baked), front pass; steam live (o.steam 0..1)
function drTableImg() { return abBakeAt('a5table', 620, 200, (c) => { c.translate(310 - DR.table.cx, -720);
  const T = DR.table; celShade(c, [[T.x0 + 30, T.top + 20], [T.x1 - 30, T.top + 20], [T.x1 - 60, T.y], [T.x0 + 60, T.y]], '#8a4a2a', '#5a2a16', { light: [-1, -1], off: 10, lw: 3, line: '#3a160c' });
  for (let x = T.x0 + 90; x < T.x1 - 80; x += 60) shape(c, ell(x, T.top + 46, 14, 18, 12), '#ffcf3a', { lw: 2, line: '#8a5a12' });
  drTableFood(c);
  celShade(c, ell(T.cx, T.top, 262, 34, 40).filter(([, y]) => y >= T.top - 1).concat([[T.cx - 262, T.top]]), '#e8b040', '#b07a1a', { lw: 3, line: '#6a4410' }); }); }
function drTableFood(c) { const T = DR.table, y = T.top;
  abBlob(c, T.cx, y - 4, 252, 30, '#ffcf3a', '#d89a1a', { lw: 3.5, hi: '#fff3b0', line: '#6a4410' });   // the tray
  abBlob(c, 720, y - 30, 66, 40, '#fff6dc', '#e8d29a', { lw: 3, hi: '#ffffff' }); for (let k = 0; k < 10; k++) abBlob(c, 690 + (k * 37) % 64, y - 40 - (k * 13) % 26, 6, 4, '#e8742a', '#b04a1a', { lw: 0 });   // rice mountain with saffron
  abBlob(c, 860, y - 26, 48, 30, '#c8743a', '#8a4a1e', { lw: 3, hi: '#f0a860' }); seg(c, 890, y - 40, 912, y - 58, 9, '#f6e2c0', 2);   // the roast
  celShade(c, [[592, y - 30], [648, y - 30], [640, y - 4], [600, y - 4]], '#d8a050', '#a06a2a', { lw: 2.5 }); for (const bx of [604, 622, 640]) abBlob(c, bx, y - 34, 12, 8, '#f0c47a', '#c08a4a', { lw: 2 });   // bread basket
  abBlob(c, 962, y - 16, 34, 12, '#2f7ad0', '#1a4aa0', { lw: 2.5 }); for (const bx of [948, 962, 976]) abBlob(c, bx, y - 24, 7, 5, '#7a2a1a', '#4a1408', { lw: 0 });   // dates
  for (const [bx, col] of [[790, '#7ae08a'], [1000, '#e8364f'], [660, '#ff9a2a']]) abBlob(c, bx, y - 10, 16, 12, col, abDark(col, 0.3), { lw: 2 }); }
function drTable(ctx, t, o = {}) { const T = DR.table; ctx.drawImage(drTableImg(), T.cx - 310, 720);
  if ((o.steam ?? 1) > 0) a5Steam(ctx, 720, T.top - 70, t, o.steam ?? 1, 3); }
// steam curls on twos (n wisps) rising from (x, y)
function a5Steam(ctx, x, y, t, k = 1, n = 2) { const tc = AB_T2(t); ctx.save(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const ph = (tc * 0.7 + i / n) % 1; ctx.globalAlpha = k * 0.6 * Math.sin(Math.PI * ph); ctx.beginPath(); for (let j = 0; j <= 6; j++) ctx.lineTo(x - 16 + i * 16 + 7 * Math.sin(j * 1.2 + tc * 5 + i), y - ph * 60 - j * 9); ctx.stroke(); } ctx.restore(); }
// the courtyard door leaf (open 0..1) and the view through it (o.view(ctx) draws the yard, already clipped); the curtain stirs
function drDoor(ctx, t, o = {}) { const D = DR.door, pts = townArchPts(D.x0, D.x1, D.top, D.bot, 'pointed');
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); if (o.view) o.view(ctx); else abGrad(ctx, D.x0, D.top, 140, 380, [[0, '#3e5aa0'], [1, '#8a8cbc']]); ctx.restore();
  const tc = AB_T2(t), op = o.open ?? 1, lw = 140 * (1 - op) + 18; celShade(ctx, K.rectPts(D.x1 - lw, D.top + 30, lw, D.bot - D.top - 30), '#3f7ad0', '#2a5a9a', { light: [-1, -1], off: 6, lw: 3, line: '#1a3a6a' });
  const blow = o.blow || 0, sw = 6 * Math.sin(tc * 2.6) + blow * 60; ctx.save(); ctx.globalAlpha = 0.9; celShade(ctx, [[D.x0 + 4, D.top + 40], [D.x0 + 40 + sw * 0.4, D.top + 40], [D.x0 + 30 + sw, D.bot - 80], [D.x0 + 4, D.bot - 60]], '#f2a71b', '#c07a10', { off: 6, lw: 2.5, line: '#7a4a08' }); ctx.restore(); }
// the street window: the view (o.view(ctx) inside the rect, already clipped) and a carved wooden lattice half (shutters open)
function drWindow(ctx, t, o = {}) { const W = DR.win; windowView(ctx, [W.x, W.y, W.w, W.h], o.view || ((c) => abGrad(c, W.x, W.y, W.w, W.h, [[0, '#2f6f8e'], [1, '#ffb08a']])));
  ctx.save(); ctx.strokeStyle = '#8a5232'; ctx.lineWidth = 7; ctx.strokeRect(W.x, W.y, W.w, W.h); seg(ctx, W.x + W.w / 2, W.y, W.x + W.w / 2, W.y + W.h, 6, '#8a5232', 0); ctx.restore();
  for (const sd of [0, 1]) { const x = sd ? W.x + W.w : W.x - 46; celShade(ctx, K.rectPts(x, W.y, 46, W.h), '#2a9a96', '#1a6a6a', { light: [-1, -1], off: 5, lw: 3, line: '#0a3a3a' }); for (let y = W.y + 20; y < W.y + W.h; y += 30) seg(ctx, x + 8, y, x + 38, y, 4, '#1a6a6a', 0); }
  celShade(ctx, K.rectPts(W.x - 20, W.y + W.h, W.w + 40, 18), '#fbe0b0', '#d8a878', { off: 4, lw: 3, line: '#8a5a3a' }); }
// dinnerRoom(ctx, t, cam, o): the room behind the cast. o: {door {open, view, blow}, win {view}, beads (part), bpx, steam, lampK}
function dinnerRoom(ctx, t, cam, o = {}) { ctx.drawImage(drPlate(), 0, 0); drWindow(ctx, t, o.win || {}); drDoor(ctx, t, o.door || {}); drBeads(ctx, t, o.beads || 0, o.bpx);
  drChest(ctx); drLamps(ctx, t, o.lampK ?? 1); }

// ---------- windowView and memoryPanel ----------
// windowView(ctx, [x, y, w, h], draw): a frame within the frame: draw(ctx) clipped into the rect (any world drawn at its own scale)
function windowView(ctx, rect, draw) { const [x, y, w, h] = rect; ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); draw(ctx); ctx.restore(); }
// a scaled mini world inside a view: f(ctx) is drawn with world point (wx, wy) at view point (vx, vy) and scale s
function a5Mini(ctx, vx, vy, wx, wy, s, f) { ctx.save(); ctx.translate(vx, vy); ctx.scale(s, s); ctx.translate(-wx, -wy); f(ctx); ctx.restore(); }
// memoryPanel(ctx, t, rect, p, draw, o): a remembered picture (panel units): cream rounded border, a light pale wash over the
// memory (no tint over a hand: o.wash 0 keeps full colour), slow drift, soft tape lines; p 0..1 opens it
function memoryPanel(ctx, t, rect, p, draw, o = {}) { if (p <= 0) return; const [x, y, w, h] = rect, k = K.ease.out(K.clamp(p));
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); ctx.translate(-x - w / 2, -y - h / 2); ctx.globalAlpha *= k;
  ctx.fillStyle = '#fff1d8'; ctx.beginPath(); ctx.roundRect(x - 14, y - 14, w + 28, h + 28, 30); ctx.fill(); ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 5; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 20); ctx.clip(); draw(ctx); if ((o.wash ?? 0.18) > 0) { ctx.fillStyle = K.rgba('#fff6e8', o.wash ?? 0.18); ctx.fillRect(x, y, w, h); }
  const R = K.rng(1 + Math.floor(t * 8)); ctx.fillStyle = 'rgba(255,255,255,0.2)'; for (let i = 0; i < 3; i++) ctx.fillRect(x, y + R() * h, w, 2); ctx.restore();
  ctx.restore(); }

// ---------- voiceWave and clueCounter ----------
// voiceWave(ctx, from, to, t, o): a ribbon of sound from a mouth (world or panel units). o: {col, p (draw-on 0..1), amp, waves, jag 0..1
// (spikes: a broken voice), brk 0..1 (a gap opens in the middle), w (thickness), alpha}
function voiceWave(ctx, from, to, t, o = {}) { const p = K.clamp(o.p ?? 1); if (p <= 0) return; const [x0, y0] = from, [x1, y1] = to, L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, n = 60, amp = o.amp ?? 22, wv = o.waves ?? 4, jag = o.jag || 0, tc = AB_T2(t);
  const pt = (u) => { const ph = u * wv * Math.PI * 2 - tc * 8, sm = Math.sin(ph), sp = (Math.abs(((u * wv * 4 + tc * 2) % 1) - 0.5) * 4 - 1), a = amp * Math.sin(Math.PI * u) * K.lerp(sm, sp * 1.6, jag); return [x0 + ux * L * u - uy * a, y0 + uy * L * u + ux * a]; };
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [lw, col] of [[(o.w || 9) + 6, '#2b1a3a'], [o.w || 9, o.col || '#f08a5a']]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); let pen = false;
    for (let i = 0; i <= n * p; i++) { const u = i / n; if ((o.brk || 0) > 0 && Math.abs(u - 0.5) < 0.12 * o.brk) { pen = false; continue; } const [x, y] = pt(u); if (!pen) { ctx.moveTo(x, y); pen = true; } else ctx.lineTo(x, y); } ctx.stroke(); }
  ctx.restore(); }
// clueCounter(ctx, S, t, x, y, n, tTick, o): the chrome counter CLUES n in the panel corner (panel units); pops at tTick; o.alpha
function clueCounter(ctx, S, t, x, y, n, tTick, o = {}) { if (n <= 0) return; ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; const pop = 1 + 0.25 * Math.max(0, 1 - (t - tTick) / 0.25);
  ctx.translate(x, y); ctx.scale(pop, pop); S.label(ctx, 'CLUES', -70, 0, 1, { size: 34 }); S.counter(ctx, n, 60, 2, 1, { size: 72 }); ctx.restore(); }

// ---------- shopFront: a small booth (x 960..1260) over the market; awning 0..1 unrolled (bounce), sign swing radians ----------
const SF = { x0: 960, x1: 1260, cx: 1110, pole: [975, 1245], top: 520, aw: 600, counter: 770 };
function shopFront(ctx, t, o = {}) { const tc = AB_T2(t), aw = K.clamp(o.awning ?? 1), bo = o.bounce || 0;
  celShade(ctx, K.rectPts(SF.x0 + 20, 600, SF.x1 - SF.x0 - 40, 300), '#f6dcb0', '#d8b080', { light: [-1, -1], off: 8, lw: 3, line: '#8a5a3a' });   // back wall
  for (const sy of [660, 720]) seg(ctx, SF.x0 + 30, sy, SF.x1 - 30, sy, 8, '#8a5232', 2);
  for (let i = 0; i < 6; i++) { const lx = SF.x0 + 60 + i * 38, ly = i % 2 ? 712 : 652; brassLamp(ctx, lx, ly, 0.8, { glint: ((tc * 0.6 + i * 0.37) % 1) }); }
  for (const px of SF.pole) seg(ctx, px, 900, px, SF.top - 10, 12, '#8a5232', 3);
  // awning: stripes coral / cream with a scalloped edge, unrolled to aw, bounce in y
  const ay = SF.top + bo, ah = 80 * aw; if (aw > 0.02) { for (let i = 0; i < 8; i++) { const x = SF.x0 - 10 + i * 40; celShade(ctx, [[x, ay], [x + 40, ay], [x + 44, ay + ah], [x - 4, ay + ah]], i % 2 ? '#fff1d8' : '#f08a5a', i % 2 ? '#e8d0a8' : '#c8643a', { light: [-1, -1], off: 6, lw: 2.5, line: '#8a3a1a' });
    if (aw > 0.9) abBlob(ctx, x + 20, ay + ah, 20, 12, i % 2 ? '#fff1d8' : '#f08a5a', i % 2 ? '#e8d0a8' : '#c8643a', { lw: 2.5, line: '#8a3a1a' }); } }
  else { celShade(ctx, ell(SF.cx, ay - 6, 160, 16, 20), '#f08a5a', '#c8643a', { lw: 2.5 }); }
  // hanging sign at the left pole (hangs out over the lane) (a brass lamp pictogram, no words)
  if (o.sign != null) { const sx = SF.pole[0] - 6, sy = 560; ctx.save(); ctx.translate(sx, sy); ctx.rotate(o.sign); seg(ctx, 2, 0, -86, 0, 6, '#8a5232', 1.5); seg(ctx, -14, 0, -14, 20, 2, '#3a2a1a', 0); seg(ctx, -66, 0, -66, 20, 2, '#3a2a1a', 0);
    celShade(ctx, K.rectPts(-80, 20, 76, 54), '#2a9a96', '#1a6a6a', { light: [-1, -1], off: 5, lw: 3, line: '#0a3a3a' }); brassLamp(ctx, -42, 58, 0.7, {}); ctx.restore(); }
}
function shopCounter(ctx, t) { celShade(ctx, K.rectPts(SF.x0 + 14, SF.counter, SF.x1 - SF.x0 - 28, 900 - SF.counter), '#c8643a', '#8a3a1e', { light: [-1, -1], off: 10, lw: 3.5, line: '#4a1a0a' });
  for (let x = SF.x0 + 40; x < SF.x1 - 30; x += 52) shape(ctx, ell(x, 836, 12, 22, 12), '#ffcf3a', { lw: 2, line: '#8a5a12' }); seg(ctx, SF.x0 + 6, SF.counter, SF.x1 - 6, SF.counter, 12, '#e8b040', 2);
  for (const [x, s] of [[1010, 0.9], [1200, 1]]) brassLamp(ctx, x, SF.counter - 4, s, { glint: ((AB_T2(t) * 0.5 + x * 0.001) % 1) }); }
// a small brass oil lamp (the shop's goods), spout to +x; glint 0..1
function brassLamp(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  celShade(ctx, [[-22, 0], [22, 0], [36, -10], [24, -18], [-16, -20], [-26, -10]], '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 5, hi: '#fff3b0', lw: 2.5, line: '#6a4410' }); seg(ctx, -24, -12, -34, -22, 4, '#c08a1a', 1); ctx.restore();
  if (o.glint) abGlint(ctx, x - 4 * s, y - 14 * s, 18 * s, o.glint); }

// ---------- props ----------
// giftBox: plum cloth, gold ribbon and bow; 44 x 34 at s 1 (bottom centre x, y); o.glint 0..1, rot
function giftBox(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  celShade(ctx, K.rectPts(-22, -34, 44, 34), '#8e3a9a', '#5e1a6a', { light: [-1, -1], off: 6, lw: 2.5, line: '#3a0a44' }); seg(ctx, 0, -34, 0, 0, 6, '#ffcf3a', 0); seg(ctx, -22, -17, 22, -17, 5, '#ffcf3a', 0);
  for (const sd of [-1, 1]) celShade(ctx, [[0, -34], [sd * 14, -46], [sd * 16, -36]], '#ffcf3a', '#c08a1a', { off: 2, lw: 2, line: '#6a4410' }); ctx.restore();
  if (o.glint) abGlint(ctx, x + 8 * s, y - 38 * s, 22 * s, o.glint); }
// crate: slatted wooden box of oranges 90 x 64 at s 1 (bottom centre)
function a5Crate(ctx, x, y, s = 1, rot = 0, fruit = '#ff9a2a') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const fx of [-30, -10, 10, 30]) abBlob(ctx, fx, -62, 11, 10, fruit, abDark(fruit, 0.3), { lw: 2, off: 3, hi: abLight(fruit, 0.4) });
  celShade(ctx, K.rectPts(-45, -64, 90, 64), '#d8a060', '#a06a30', { light: [-1, -1], off: 8, lw: 3, line: '#5a3410' }); for (const sy of [-44, -22]) seg(ctx, -44, sy, 44, sy, 3, '#a06a30', 0); ctx.restore(); }
// teaCup: a small glass cup of amber tea 22 x 26 at s 1 (bottom centre); o.tea 0..1 fill, rot
function teaCup(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const tea = K.clamp(o.tea ?? 0.8); celShade(ctx, [[-13, -28], [13, -28], [9, 0], [-9, 0]], '#e8f6ff', '#b8d0e0', { light: [-1, -1], off: 3, lw: 2, line: '#4a6a8a' });
  if (tea > 0) { ctx.fillStyle = '#d8781a'; ctx.beginPath(); ctx.moveTo(-9 - 4 * tea, -26 * tea); ctx.lineTo(9 + 4 * tea, -26 * tea); ctx.lineTo(9, 0); ctx.lineTo(-9, 0); ctx.closePath(); ctx.fill(); }
  seg(ctx, -14, -28, 14, -28, 3, '#ffcf3a', 0); ctx.restore(); }
// ewer: a tall brass ewer (spout to +x) held at its handle point (x, y); tilt radians; o.pour 0..1 an amber stream length factor, o.to [x, y] stream end
function ewer(ctx, x, y, tilt = 0, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s);
  celShade(ctx, [[-14, -40], [14, -40], [26, -10], [20, 30], [-20, 30], [-26, -10]], '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 6, hi: '#fff3b0', lw: 2.5, line: '#6a4410' });
  seg(ctx, 18, -6, 52, -36, 6, '#e8b040', 1.5); seg(ctx, -24, -30, -34, 10, 5, '#c08a1a', 1.5); celShade(ctx, ell(0, -44, 12, 6, 10), '#e8b040', '#b07a1a', { lw: 2 }); ctx.restore();
  if ((o.pour || 0) > 0.02 && o.to) { const sx = x + s * (52 * Math.cos(tilt) + 36 * Math.sin(tilt)), sy = y + s * (52 * Math.sin(tilt) - 36 * Math.cos(tilt)), ex = K.lerp(sx, o.to[0], o.pour), ey = K.lerp(sy, o.to[1], o.pour);
    ctx.save(); ctx.strokeStyle = '#e8902a'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(ex, sy, ex, ey); ctx.stroke(); ctx.restore(); } }
// lentilBowl: the plain clay bowl of lentils with one flat bread (bottom centre), s
function lentilBowl(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); abBlob(ctx, 34, -6, 30, 9, '#f0c47a', '#c08a4a', { lw: 2.5 });
  celShade(ctx, [[-30, -22], [30, -22], [20, 0], [-20, 0]], '#c8743a', '#8a4a1e', { light: [-1, -1], off: 5, lw: 2.5, line: '#4a2010' }); abBlob(ctx, 0, -22, 28, 7, '#a86a2a', '#7a4a1a', { lw: 2 }); ctx.restore(); }
// a stack of tied crates on the cart / ground (n crates, wobble radians at the top)
function a5CrateStack(ctx, x, y, n, s = 1, wob = 0) { for (let i = 0; i < n; i++) { const u = i / Math.max(1, n - 1); a5Crate(ctx, x + Math.sin(wob) * 64 * s * i, y - 66 * s * i, s, wob * u, ['#ff9a2a', '#e8364f', '#7ae08a'][i % 3]); } }

// ---------- cupFumble: the cup's flight over [t0, t0 + 1.52] relative to the catcher's chest point (x, y): drop, bat up left, bat
// right, caught against the chest. Returns {dx, dy, rot, spill 0..1 (tea flying), caught}
const A5_FUMBLE = [[0, [30, -40, 0]], [0.28, [40, 30, 0.6]], [0.5, [-30, -50, -0.8]], [0.86, [50, -70, 1.4]], [1.2, [10, -10, 0.3]], [1.52, [0, 0, 0]]];
function cupFumble(t, t0) { const u = t - t0; if (u <= 0) return { dx: 30, dy: -40, rot: 0, spill: 0, caught: false }; const ks = A5_FUMBLE;
  const v = (j) => flow(u, ks.map(([a, p]) => [a, p[j]])); return { dx: v(0), dy: v(1), rot: v(2), spill: K.clamp((u - 0.4) / 0.6) * (1 - K.clamp((u - 1.1) / 0.3)), caught: u >= 1.4 }; }
