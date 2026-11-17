// ===== the story: the monkey and the turtle =====
const WW = 1000, WH = 1230, WATER = 772, BANK = 700, ISL = 742, ISX = 680, DUR = 182;
const FIGS = [13.7, 15.3, 16.9];
const BR1 = [300, 422], BR2 = [300, 306];
const tY = (x) => 800 - 58 * K.smooth(ISX - 20, ISX + 20, x);
const wy = (x, t) => WATER + 3 * Math.sin(x * 0.05 + t * 2.2);
function layer1(key, w, h, draw) { return K.cached(key, () => { const c = K.layer(w * 2, h * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }
const skyL = () => layer1('sky', WW, 800, (x) => {
  x.fillStyle = C.blue; x.fillRect(0, 0, WW, 800); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(0, 0, WW, 800);
  for (const [bx, by, br, col] of [[130, 700, 220, '#2a62c9'], [520, 720, 260, '#2457b8'], [900, 690, 230, '#2a62c9']]) { x.beginPath(); x.ellipse(bx, by, br, br * 0.45, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); }
});
const landL = () => layer1('land', WW, WH, (x) => {
  // bank (left) with grass top
  const bank = [[-10, BANK], [280, BANK], [332, 778], [336, WH], [-10, WH]]; shape(x, bank, '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(x, [[-10, BANK - 6], [280, BANK - 6], [300, BANK + 18], [-10, BANK + 18]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 });
  // island (right) + hut
  const isl = [[ISX + 40, ISL], [1010, ISL], [1010, WH], [ISX - 8, WH], [ISX - 8, 790]]; shape(x, isl, '#d9a441', { lw: 8, seed: 22, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(x, [[ISX + 20, ISL - 6], [1010, ISL - 6], [1010, ISL + 16], [ISX + 30, ISL + 16], [ISX + 8, 770]], GREEN, { lw: 6, seed: 23, dot: GREEND, pitch: 8, rad: 0.2 });
  shape(x, [[ISX + 14, 470], [1010, 470], [1010, ISL - 6], [ISX + 14, ISL - 6]], '#f3e2b8', { lw: 7, seed: 24, dot: C.red, pitch: 12, rad: 0.15, da: 0.35 });
  shape(x, [[ISX - 10, 482], [ISX + 175, 360], [1010, 482]], C.red, { lw: 8, seed: 25, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.5 });
  shape(x, [[860, 696], [1010, 696], [1010, ISL - 6], [860, ISL - 6]], WOOD, { lw: 6, seed: 26 }); shape(x, [[855, 640], [875, 640], [875, ISL - 6], [855, ISL - 6]], WOOD, { lw: 6, seed: 27 });
  shape(x, ell(930, 684, 40, 16, 16), C.white, { lw: 5, seed: 28 });
  shape(x, K.rectPts(ISX + 40, 560, 70, 62), C.blue, { lw: 7, seed: 29 }); seg(x, ISX + 75, 560, ISX + 75, 622, 4, C.black, 0); seg(x, ISX + 40, 591, ISX + 110, 591, 4, C.black, 0);
  // fig tree: trunk, branches, canopy, figs
  shape(x, [[148, BANK + 6], [172, 300], [224, 300], [262, BANK + 6]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  for (const b of [[[200, 440], [390, 414], [394, 446], [210, 480]], [[196, 314], [370, 288], [374, 320], [204, 354]]]) shape(x, b, WOOD, { lw: 7, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  const can = [[210, 190, 110], [100, 250, 90], [320, 215, 100], [390, 290, 62], [40, 330, 66], [250, 300, 70], [160, 330, 60]];
  for (const [cx, cy, cr] of can) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); }
  for (const [cx, cy, cr] of can) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); }
  x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of can) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); }
  for (const [fx, fy] of [[330, 396], [150, 372], [260, 372], [372, 336], [90, 336], [220, 262], [320, 258], [60, 292]]) fig(x, fx, fy, 15);
});
function sunMoon(ctx, t) {
  let sx = 760, sy = 150, dark = 0, mx = null, my = 0;
  if (t >= 42.6 && t < 48.2) { const u = (t - 42.6) / 5.6, ps = u * 3 * Math.PI; sx = 500 - 420 * Math.cos(ps); sy = 640 - 540 * Math.sin(ps); dark = K.clamp(-Math.sin(ps) * 2.2); mx = 500 + 420 * Math.cos(ps); my = 640 + 540 * Math.sin(ps); }
  else if (t >= 48.2 && t < 49.4) { const u = K.ease.inOut((t - 48.2) / 1.2); sx = K.lerp(920, 760, u); sy = K.lerp(640, 150, u); }
  if (t >= 75.5 && t < 81.8) dark = kfn(t, [[75.5, 0], [79, 0.55], [81.6, 0.62]]);
  if (t >= 81.8 && t < 92) { dark = kfn(t, [[81.8, 0.5], [86, 0]]); sy = kfn(t, [[81.8, 540], [92, 150]]); }
  return { sx, sy, dark, mx, my };
}
function drawSun(ctx, x, y) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } const p = ell(x, y, 70, 70, 40); shape(ctx, p, C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }
function ripple(ctx, x, y, t0, t, sz = 1) { const u = (t - t0) / 1.4; if (u < 0 || u > 1) return; for (let i = 0; i < 2; i++) { const v = K.clamp(u - i * 0.18); if (v <= 0) continue; ctx.save(); ctx.globalAlpha = 1 - v; ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(x, y, (20 + v * 70) * sz, (6 + v * 16) * sz, 0, 0, 7); ctx.stroke(); ctx.restore(); } }

// camera
const CAM = [[0, { x: 500, y: 560, zoom: 1.0 }], [3.4, { x: 500, y: 560, zoom: 1.0 }], [5.2, { x: 270, y: 440, zoom: 1.9 }], [10.0, { x: 300, y: 480, zoom: 2.1 }], [12.4, { x: 340, y: 650, zoom: 1.7 }], [17.0, { x: 420, y: 700, zoom: 1.5 }], [23.8, { x: 460, y: 720, zoom: 1.7 }], [30.5, { x: 420, y: 640, zoom: 1.5 }],
  [37.0, { x: 370, y: 570, zoom: 1.6 }], [42.4, { x: 420, y: 520, zoom: 1.25 }], [44.0, { x: 300, y: 560, zoom: 1.4 }], [47.8, { x: 330, y: 700, zoom: 1.9 }], [54.0, { x: 330, y: 700, zoom: 1.9 }], [58.0, { x: 560, y: 720, zoom: 1.5 }], [60.6, { x: 760, y: 640, zoom: 1.7 }], [61.6, { x: 750, y: 620, zoom: 2.0 }], [81.0, { x: 750, y: 620, zoom: 2.0 }],
  [82.6, { x: 330, y: 660, zoom: 1.7 }], [96.8, { x: 350, y: 690, zoom: 1.8 }], [100.0, { x: 440, y: 720, zoom: 1.7 }], [104.4, { x: 520, y: 700, zoom: 1.8 }], [126.0, { x: 520, y: 700, zoom: 1.8 }], [128.4, { x: 500, y: 600, zoom: 1.9 }], [136.0, { x: 500, y: 620, zoom: 1.8 }], [140.0, { x: 500, y: 700, zoom: 1.7 }], [146.0, { x: 380, y: 640, zoom: 1.5 }], [150.0, { x: 320, y: 500, zoom: 1.5 }],
  [153.5, { x: 330, y: 420, zoom: 1.8 }], [165.4, { x: 330, y: 420, zoom: 1.8 }], [166.6, { x: 450, y: 600, zoom: 1.4 }], [172.0, { x: 500, y: 560, zoom: 1.05 }], [182, { x: 500, y: 560, zoom: 1.05 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- the turtle ----------
const TX = [[17.2, 430], [24.0, 440], [27.6, 488], [29.6, 488], [31.0, 440], [54.4, 425], [60.4, 690], [61.4, 725], [81.2, 725], [81.5, 430], [99.4, 430], [104.2, 520], [140.4, 520], [149.8, 420], [168.4, 420], [177, 640]];
const TD = [[0, -1], [23.4, -1], [24.4, 1], [28.4, 1], [29.4, -1], [54.0, -1], [54.8, 1], [81.3, 1], [81.6, -1], [99.0, -1], [99.8, 1], [140.2, 1], [141.4, -1], [168.4, -1], [169.2, 1]];
function turtleP(t) {
  const x = kfn(t, TX, 'inOut'), v = (kfn(t + 0.05, TX, 'inOut') - kfn(t - 0.05, TX, 'inOut')) / 0.1, hut = K.smooth(ISX - 10, ISX + 60, x);
  const P = { x, y: tY(x) + kfn(t, [[17.0, 120], [18.4, 0]]), s: K.lerp(0.85, 0.6, hut), dir: kfn(t, TD), ph: t * (Math.abs(v) > 6 ? 5 : 1.6), paddle: Math.abs(v) > 6 ? 1 : 0.25, eyes: 'open', mouth: 'closed' };
  if (t < 17.2) P.y = 1000;
  const talkIn = (l) => talk(t, l, 0.7);
  if (t >= 24 && t < 28.4) { P.eyes = 'wide'; } if (t >= 28.2 && t < 29.4) P.mouth = Math.sin(t * 22) > 0 ? 'open' : 'closed'; if (t >= 29.4 && t < 31.3) { P.mouth = 'smile'; P.eyes = 'shut'; }
  P.talk = talkIn([[31.4, 36.9], [48.2, 49.4], [50.4, 51.4], [53.4, 54.4], [84.1, 86], [86.3, 87.4], [88.3, 95.6], [114.0, 121.8], [61.6, 62.4]]);
  if (t >= 36.9 && t < 42) P.mouth = 'smile'; if (t >= 41.1 && t < 41.6) P.mouth = 'open';
  if (t >= 54.6 && t < 60.8) { P.mouth = 'frown'; }
  if (t >= 61.4 && t < 76.3) { P.eyes = 'open'; P.mouth = 'frown'; P.drop = 2; }
  if (t >= 76.3 && t < 77.9) { P.mouth = 'frown'; P.drop = 10; P.eyes = 'shut'; P.ext = 0.7; }
  if (t >= 77.9 && t < 81.3) { P.mouth = 'smile'; P.brow = 1; P.drop = 0; }
  if (t >= 95.6 && t < 140) P.mouth = 'smile';
  if (t >= 104.2 && t < 114) { P.mouth = 'closed'; P.eyes = 'wide'; } if (t >= 113.7 && t < 121.9) { P.mouth = 'frown'; P.eyes = 'open'; }
  if (t >= 122 && t < 140.4) P.mouth = 'frown';
  if (t >= 145 && t < 154.1) { P.mouth = 'smile'; } if (t >= 154.1 && t < 165.9) { P.eyes = 'wide'; P.mouth = 'o'; } if (t >= 163.8 && t < 165.9) P.mouth = 'frown';
  if (t >= 165.9) { const u = K.beat(t, 165.9, 0.8); P.ext = K.lerp(1, 0.4, u); P.drop = 14 * u; P.eyes = 'shut'; P.mouth = 'frown'; }
  P.ext = P.ext ?? 1; return P;
}
function monkeyP(t, T) {
  const P = { dir: 1, s: 1, ph: t * 3, look: 0.7, eyes: 'open', mouth: 'closed' };
  const hush = (l) => talk(t, l, 0);
  if (t < 43.2) { P.x = BR1[0]; P.y = BR1[1]; }
  else if (t < 46.4) { const u = K.ease.inOut((t - 43.2) / 3.2); P.x = K.lerp(BR1[0], 262, u) + Math.sin(u * 9) * 14; P.y = K.lerp(BR1[1], BANK + 2, u); P.rot = Math.sin(u * 7) * 0.12; P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; }
  else if (t < 97.4) { P.x = 262; P.y = BANK + 2; }
  else if (t < 98.8) { const u = (t - 97.4) / 1.4, to = [T.x - 8, T.y - 100 * T.s]; P.x = K.lerp(262, to[0], K.ease.out(u)); P.y = K.lerp(BANK + 2, to[1], u) - 120 * Math.sin(Math.PI * u); P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; P.rot = -0.2 * Math.sin(Math.PI * u); }
  else if (t < 150.2) { P.x = T.x - 8 * T.dir; P.y = T.y - 100 * T.s; if (t > 141) P.dir = -1; }
  else if (t < 152.4) { const u = (t - 150.2) / 2.2, from = [420 - 8, 800 - 100 * 0.85]; P.x = K.lerp(from[0], BR2[0], K.ease.out(u)); P.y = K.lerp(from[1], BR2[1], u) - 220 * Math.sin(Math.PI * u); P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; P.mouth = 'o'; P.eyes = 'wide'; }
  else { P.x = BR2[0]; P.y = BR2[1]; }
  // expressions
  if (t < 17) P.eat = 0.5 + 0.5 * Math.sin(t * 3.4), P.hold = 'fig';
  if (t >= 31 && t < 37.3) P.look = 1;
  if (t >= 37.4 && t < 39.4) { P.eyes = 'shut'; P.mouth = 'open'; P.tilt = Math.sin(t * 22) * 0.12; P.rot = Math.sin(t * 22) * 0.04; }
  if (t >= 39.4 && t < 41.6) { const u = K.clamp((t - 39.4) / 0.6); P.aR = [K.lerp(2.4, 0.6, u), K.lerp(2.4, 0.9, u)]; P.hold = t < 39.8 ? 'fig' : null; P.mouth = 'smile'; }
  if (t >= 41.6 && t < 43.2) { P.aR = [2.5 + Math.sin(t * 9) * 0.25, 3.0]; P.mouth = 'smile'; }
  if (t >= 46.4 && t < 54.4) { P.eat = 0.5 + 0.5 * Math.sin(t * 3.2); P.hold = 'fig'; P.talk = hush([[48.2, 49.4], [50.6, 51.4]]); }
  if (t >= 54.5 && t < 61) { P.aR = [2.4 + Math.sin(t * 8) * 0.3, 3.0]; P.mouth = 'smile'; }
  if (t >= 82 && t < 95.6) P.look = 1;
  if (t >= 95.6 && t < 97.4) { P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; P.mouth = 'smile'; P.eyes = 'open'; }
  if (t >= 98.8 && t < 104.2) { P.mouth = 'smile'; P.aR = [0.5, 0.5]; P.aL = [-0.5, -0.5]; }
  if (t >= 104.2 && t < 104.9) P.tilt = 0.25 * Math.sin((t - 104.2) * 12);
  if (t >= 108.7 && t < 113.7) { P.eyes = 'wide'; P.talk = hush([[108.8, 110.4], [110.5, 112.2], [112.3, 113.7]]); }
  if (t >= 113.7 && t < 127) { P.eyes = 'wide'; P.mouth = t < 122 ? 'o' : 'frown'; P.dx = Math.sin(t * 40) * 2.5; P.kick = Math.sin(t * 30) * 4; }
  if (t >= 127 && t < 140.5) { P.eyes = 'open'; P.brow = 0.6; P.mouth = 'smile'; P.talk = hush([[127.9, 140.2]]); P.aR = t > 136.6 ? [2.6, 2.6] : [0.9, 1.8]; }
  if (t >= 152.4 && t < 163.8) { P.talk = hush([[154.2, 163.6]]); P.aR = [1.9 + Math.sin(t * 6) * 0.15, 2.0]; P.brow = 0.5; P.mouth = 'smile'; }
  if (t >= 163.8 && t < 166) { P.eyes = 'shut'; P.mouth = 'open'; P.tilt = Math.sin(t * 22) * 0.1; }
  if (t >= 166) { P.eat = 0.5 + 0.5 * Math.sin(t * 3.2); P.hold = 'fig'; P.look = 1; }
  return P;
}
function waterFront(ctx, t) {
  const x0 = 330, x1 = ISX - 6, pts = []; for (let x = x0; x <= x1; x += 10) pts.push([x, wy(x, t)]);
  const poly = [...pts, [x1, WH], [x0, WH]];
  ctx.save(); K.poly(ctx, poly, true); ctx.fillStyle = 'rgba(29,91,208,0.58)'; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.white, 14, 0.18); ctx.globalAlpha = 0.5; ctx.fillRect(x0, WATER - 6, x1 - x0, WH); ctx.restore();
  ctx.save(); ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.white; K.poly(ctx, pts.map(([x, y]) => [x, y + 8])); ctx.stroke(); ctx.restore();
}
function waterBack(ctx, t) { ctx.fillStyle = '#17409a'; ctx.fillRect(0, WATER, WW, WH - WATER); ctx.fillStyle = dotPat(ctx, '#2a62c9', 14, 0.3); ctx.fillRect(0, WATER, WW, WH - WATER); }
function figPos(i, t) { const t0 = FIGS[i]; if (t < t0 - 0.7) return null; if (t < t0) { const u = (t - (t0 - 0.7)) / 0.7; return { x: 345 + i * 3, y: K.lerp(450, WATER - 8, u * u), r: u * 5 }; } return { x: 345 + i * 3 + (t - t0) * 10, y: WATER - 12 + Math.sin(t * 2 + i) * 3, r: 0.4 * Math.sin(t * 2 + i) }; }

function drawWorld(ctx, t, cam) {
  const sm = sunMoon(ctx, t);
  ctx.drawImage(skyL(), 0, 0, WW, 800);
  if (sm.dark < 0.95) drawSun(ctx, sm.sx, sm.sy); if (sm.mx != null && sm.dark > 0.05) { const p = ell(sm.mx, sm.my, 50, 50, 30); shape(ctx, p, C.white, { lw: 7, seed: 41, dot: '#9bb6e8', pitch: 9, rad: 0.2 }); }
  cloudFlat(ctx, 120 + ((t * 3) % 1100), 110, 1.0); cloudFlat(ctx, ((t * 2 + 700) % 1200) - 100, 230, 0.8);
  waterBack(ctx, t);
  ctx.drawImage(landL(), 0, 0, WW, WH);
  if (sm.dark > 0.01) { ctx.fillStyle = `rgba(13,34,96,${0.6 * sm.dark})`; ctx.fillRect(0, 0, WW, WH); }
  for (let i = 0; i < 3; i++) ripple(ctx, 345 + i * 3 + 14, WATER, FIGS[i], t);
  const T = turtleP(t), Mo = monkeyP(t, T);
  // floating figs
  for (let i = 0; i < 3; i++) { if (i === 0 && t >= 28.4) continue; if (t >= 34 + i) continue; const f = figPos(i, t); if (f) { ctx.save(); ctx.globalAlpha = t > 32 ? 1 - K.clamp((t - 32 - i) / 2) : 1; fig(ctx, f.x, f.y, 13, f.r); ctx.restore(); } }
  if (t >= 39.8 && t < 41.3) { const u = (t - 39.8) / 1.5, p = [K.lerp(340, 350, u), K.lerp(412, 752, u) - 140 * Math.sin(Math.PI * u)]; fig(ctx, p[0], p[1], 13, u * 12); }
  // the wife in bed (island hut)
  const W = { x: 935, y: 716, s: 0.6, dir: -1, shell: C.red, wife: true, eyes: t < 69 ? 'open' : 'shut', mouth: 'closed', ph: t, paddle: 0, ext: 1 };
  if (t < 68.4) { W.brow = 1; W.talk = talk(t, [[61.5, 63.8], [63.9, 68]], 0.2); } else { W.drop = 8; W.eyes = 'squint'; W.ext = 0.8; W.mouth = 'frown'; W.talk = talk(t, [[71.6, 76.3]], 0.4) * 0.8; W.tilt = 0.1; }
  if (t >= 59 && t < 81.5) turtle(ctx, W);
  if (t >= 59 && t < 81.5) shape(ctx, [[868, 706], [1010, 706], [1010, ISL - 6], [868, ISL - 6]], C.red, { lw: 7, seed: 50, dot: C.white, pitch: 11, rad: 0.2, da: 0.8 }); if (t >= 59 && t < 81.5) shape(ctx, [[868, 706], [1010, 706], [1010, 720], [868, 720]], C.yellow, { lw: 5, seed: 51 });
  if (t >= 17.0) turtle(ctx, T); monkey(ctx, Mo);
  waterFront(ctx, t);
  worldFX(ctx, t, cam, T, Mo);
}
function worldFX(ctx, t, cam, T, Mo) {
  const hd = (T) => [T.x + T.dir * (96 + 38 * T.ext) * T.s, T.y - 52 * T.s];
  const B = (a, b) => K.beat(t, a, b, 'lin');
  FIGS.forEach((h, i) => { if (t >= h - 0.1 && t < h + 0.5) sfx(ctx, 'PLOP', 345 + i * 3, 700 + (i % 2) * 16, 40, B(h, 0.15), { rot: -0.1 + i * 0.1, fill: C.white }); });
  if (t >= 17.3 && t < 19.5) sfx(ctx, 'SPLASH', 500, 700, 54, B(17.5, 0.2), { rot: 0.08, fill: C.white });
  if (t >= 24.2 && t < 27) sfx(ctx, '!', hd(T)[0], hd(T)[1] - 110, 90, B(24.2, 0.2), { fill: C.red });
  if (t >= 28.2 && t < 29.6) sfx(ctx, 'NOM!', 520, 700, 56, B(28.2, 0.15), { rot: -0.1 });
  if (t >= 29.4 && t < 31.4) for (let i = 0; i < 3; i++) { const u = ((t - 29.4) * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - u * u; heart(ctx, hd(T)[0] - 20 + i * 38, hd(T)[1] - 60 - u * 120, 11 + i * 2); ctx.restore(); }
  if (t >= 31.4 && t < 37) { const h = hd(T); bubble(ctx, h[0] + 150, h[1] - 120, 310, 104, h[0] + 20, h[1] - 30, B(31.4, 0.3), 'THANK YOU!', { size: 50 }); }
  if (t >= 37.5 && t < 39.5) sfx(ctx, 'HA HA!', 440, 330, 62, B(37.5, 0.2), { rot: 0.12 });
  if (t >= 48.2 && t < 51.6) { bubble(ctx, 330, 560, 150, 84, 285, 650, B(48.2, 0.2), 'HA!', { size: 46 }); }
  if (t >= 50.5 && t < 54) bubble(ctx, 470, 640, 150, 84, 430, 745, B(50.5, 0.2), 'YUM!', { size: 46, fill: C.yellow });
  if (t >= 54.6 && t < 60.4) clockFace(ctx, 560, 620, 62, t - 54.6, B(54.6, 0.3));
  if (t >= 61.5 && t < 68.4) bubble(ctx, 880, 560, 190, 100, 900, 640, B(61.5, 0.25), '!?', { size: 62, fill: C.yellow });
  if (t >= 69.4 && t < 71.6) sfx(ctx, 'OHHH...', 835, 585, 48, B(69.4, 0.25), { rot: -0.08, fill: C.white });
  if (t >= 71.6 && t < 76.3) { bubble(ctx, 850, 555, 190, 130, 890, 650, B(71.6, 0.3), '', {}); heart(ctx, 850, 555, 52, C.red); }
  if (t >= 76.3 && t < 77.9) { for (let i = 0; i < 2; i++) { const u = ((t * 1.2 + i / 2) % 1), h = hd(T); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[h[0] - 4, h[1] + 4 + u * 34], [h[0] + 4, h[1] + 20 + u * 34], [h[0] - 4, h[1] + 30 + u * 34], [h[0] - 12, h[1] + 20 + u * 34]], '#5fa0ff', { lw: 3 }); ctx.restore(); } }
  if (t >= 78 && t < 81.4) bulb(ctx, hd(T)[0] - 10, hd(T)[1] - 150, B(78, 0.3));
  if (t >= 84.1 && t < 95.8) { const h = hd(T); bubble(ctx, h[0] + 190, h[1] - 190, 250, 150, h[0] + 20, h[1] - 30, B(84.6, 0.3), '', {}); islandIcon(ctx, h[0] + 190, h[1] - 190, B(88.0, 0.4)); }
  if (t >= 97.5 && t < 99.2) sfx(ctx, 'HOP!', 330, 560, 60, B(97.5, 0.15), { rot: -0.1 });
  if (t >= 104.2 && t < 106.4) { sfx(ctx, 'STOP!', T.x - 40, 560, 62, B(104.2, 0.15), { rot: 0.1 }); ripple(ctx, T.x, WATER, 104.2, t, 1.5); }
  if (t >= 108.8 && t < 113.7) { const m = [Mo.x + 40, Mo.y - 150]; bubble(ctx, m[0] + 60, m[1] - 60, 280, 100, m[0], m[1], B(108.8, 0.25), 'DANGER?', { size: 50 }); }
  if (t >= 113.7 && t < 115.6) for (let i = 0; i < 3; i++) { const u = (t - 113.7) / 1.9; ctx.save(); ctx.globalAlpha = 1 - u; cloudFlat(ctx, hd(T)[0] + 60 + i * 22, hd(T)[1] - 20 - u * 60 - i * 12, 0.3 + i * 0.1); ctx.restore(); }
  if (t >= 115.4 && t < 121.9) { const h = hd(T); bubble(ctx, h[0] + 20, h[1] - 170, 230, 150, h[0], h[1] - 40, B(115.4, 0.3), '', {}); heart(ctx, h[0] + 20, h[1] - 170, 48, C.red); }
  if (t >= 122.7 && t < 127) { sfx(ctx, '!!', Mo.x + 30, Mo.y - 230, 80, B(122.7, 0.2), { fill: C.red }); for (let i = 0; i < 3; i++) { const u = ((t * 1.4 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[Mo.x - 48 + i * 10, Mo.y - 170 + u * 40], [Mo.x - 40 + i * 10, Mo.y - 150 + u * 40], [Mo.x - 48 + i * 10, Mo.y - 140 + u * 40], [Mo.x - 56 + i * 10, Mo.y - 150 + u * 40]], '#5fa0ff', { lw: 3 }); ctx.restore(); } }
  if (t >= 127 && t < 129.2) bulb(ctx, Mo.x + 10, Mo.y - 270, B(127, 0.3));
  if (t >= 129.2 && t < 136.6) cloud(ctx, Mo.x - 70, Mo.y - 290, 190, 120, C.blue, B(129.2, 0.5), { tail: [150, 190], inside: (c) => treeIcon(c, t) });
  if (t >= 140.8 && t < 144) sfx(ctx, 'U-TURN!', T.x + 40, 600, 54, B(140.8, 0.2), { rot: -0.08 });
  if (t >= 150.3 && t < 152.2) sfx(ctx, 'BOING!', 360, 280, 64, B(150.3, 0.15), { rot: 0.12 });
  if (t >= 156.6 && t < 163.8) { bubble(ctx, 450, 300, 230, 150, 372, 290, B(156.6, 0.3), '', {}); heart(ctx, 450, 296, 46, C.red); if (t >= 158) { ctx.save(); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(414, 262); ctx.lineTo(486, 334); ctx.moveTo(486, 262); ctx.lineTo(414, 334); ctx.stroke(); ctx.restore(); } }
  if (t >= 166.2 && t < 172) { const h = hd(T); ctx.save(); ctx.globalAlpha = K.env(t, 166.2, 172, 0.4, 0.6); cloudFlat(ctx, h[0], h[1] - 130, 0.8); for (let i = 0; i < 4; i++) { const u = ((t * 1.5 + i / 4) % 1); seg(ctx, h[0] - 40 + i * 26, h[1] - 100 + u * 70, h[0] - 40 + i * 26, h[1] - 88 + u * 70, 5, '#5fa0ff', 2); } ctx.restore(); }
}
function islandIcon(ctx, x, y, p) { if (p <= 0) return; ctx.save(); ctx.translate(x, y + 24); ctx.scale(K.ease.back(p), K.ease.back(p)); shape(ctx, [[-90, 20], [-70, -8], [70, -8], [90, 20], [60, 44], [-60, 44]], '#d9a441', { lw: 5, seed: 60 }); shape(ctx, [[-4, -8], [4, -8], [6, -62], [-6, -62]], WOOD, { lw: 4, seed: 61 }); for (const a of [-0.9, -0.3, 0.3, 0.9]) shape(ctx, [[0, -62], [Math.sin(a) * 58, -62 - Math.cos(a) * 14 + 8], [Math.sin(a) * 30, -40]], GREEN, { lw: 3.5, seed: 62 }); ctx.restore(); }
function treeIcon(c, t) { c.fillStyle = C.blue; c.fillRect(-250, -170, 500, 340); shape(c, [[-120, 110], [-90, -20], [-60, -20], [-30, 110]], WOOD, { lw: 5, seed: 63 }); for (const [cx, cy, r] of [[-75, -60, 70], [-130, -30, 46], [-20, -40, 46]]) { c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fillStyle = GREEN; c.fill(); c.lineWidth = 6; c.strokeStyle = C.black; c.stroke(); } heart(c, -70, -45, 34, C.red, 4); shape(c, [[-250, 140], [250, 140], [250, 180], [-250, 180]], GREEN, { lw: 5, seed: 64 }); star(c, 70, -50, 22, C.white, t); }

// ---------- subtitles ----------
function subtitle(ctx, W, H, t, s) {
  const ch = TIMING.chunks; let cur = null;
  for (let i = 0; i < ch.length; i++) { const e = ch[i], nx = ch[i + 1], endAt = nx && nx.a - e.b < 1.4 ? nx.a - 0.1 : e.b + 0.6; if (t >= e.a - 0.12 && t < endAt) { cur = e; break; } }
  const bx = 54, by = 1296, bw = 972, bh = 566;
  S0.box(ctx, bx, by, bw, bh, 1, { fill: C.white, lw: 9, seed: 13 });
  if (!cur) return;
  const a = K.clamp((t - cur.a + 0.12) / 0.14), maxW = bw - 90; ctx.save(); ctx.globalAlpha = a;
  let fs = 70, lines, lh; ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (; fs >= 44; fs -= 2) { ctx.font = K.font(fs, AF, AW); lines = K.wrap(ctx, cur.ar, maxW); lh = fs * 1.72; if (lines.length * lh <= 340) break; }
  let es = 44, enL, elh; ctx.direction = 'ltr';
  for (; es >= 30; es -= 2) { ctx.font = K.font(es, BF, 400); enL = K.wrap(ctx, cur.en, maxW); elh = es * 1.25; if (enL.length * elh <= 150) break; }
  const total = lines.length * lh + 22 + enL.length * elh, y0 = by + (bh - total) / 2;
  ctx.direction = 'rtl'; ctx.font = K.font(fs, AF, AW); ctx.fillStyle = C.black; lines.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + (i + 0.5) * lh));
  ctx.direction = 'ltr'; ctx.font = K.font(es, BF, 400); ctx.fillStyle = C.blue; ctx.letterSpacing = '1px'; enL.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + lines.length * lh + 22 + (i + 0.5) * elh)); ctx.letterSpacing = '0px';
  ctx.restore();
}
let S0 = null;
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; const shake = K.spring(t, 150.3, 5, 9, 6) + K.spring(t, 104.2, 8, 9, 6) + K.spring(t, 163.9, 7, 9, 7);
    ctx.save(); ctx.translate(shake * 0.8, -shake * 0.5);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px, py); ctx.scale(pw / WW, ph / WH);
    const cam = camAt(t);
    ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t, cam); ctx.restore();
    overlays(ctx, t, cam, S);
    if (t > 80.8 && t < 82.4) { ctx.save(); S.transition(ctx, WW, WH, K.clamp((t - 80.8) / 1.6), { caption: 'NEXT MORNING...' }); ctx.restore(); }
    ctx.restore(); subtitle(ctx, W, H, t, 1); ctx.restore();
    S.finish(ctx, W, H, t);
  },
  score(k, S) {
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    [0.3, 0.75, 1.2, 1.65].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.08, gain: 0.4 }));
    FIGS.forEach((h) => k.play('pop', h, { pitch: 0.6, gain: 0.4 })); k.play('whoosh', 17.3, { dur: 0.6, gain: 0.35 });
    k.play('pop', 24.3, { pitch: 1.3, gain: 0.5 }); k.play('pop', 28.3, { pitch: 0.8, gain: 0.5 }); k.play('chime', 29.6, { note: 'E6', gain: 0.35 }); k.play('pop', 31.5, { gain: 0.5 });
    k.play('pop', 37.6, { pitch: 1.2, gain: 0.5 }); k.play('whoosh', 39.8, { dur: 0.5, gain: 0.4 }); k.play('pop', 41.2, { pitch: 0.9, gain: 0.5 });
    k.play('whoosh', 42.8, { dur: 1.2, gain: 0.35 }); k.play('whoosh', 45.5, { dur: 1.2, gain: 0.3 }); k.play('pop', 48.3, { gain: 0.5 }); k.play('pop', 50.6, { pitch: 1.2, gain: 0.5 });
    for (let t0 = 54.7; t0 < 60.4; t0 += 0.5) k.play('tick', t0, { gain: 0.45 });
    k.play('stamp', 61.6, { gain: 0.4 }); k.play('pop', 61.7, { pitch: 1.3, gain: 0.5 }); k.play('wrong', 69.5, { gain: 0.5 }); k.play('pop', 71.7, { pitch: 0.8, gain: 0.5 }); k.play('count', 72.0, { dur: 0.6, gain: 0.4 }); k.play('wrong', 76.5, { gain: 0.35 }); k.play('ding', 78.2, { gain: 0.5 });
    k.play('whoosh', 80.8, { dur: 0.9, gain: 0.55 }); k.play('pop', 84.7, { gain: 0.5 }); k.play('pop', 88.1, { pitch: 1.2, gain: 0.5 }); k.play('pop', 97.5, { pitch: 1.2, gain: 0.5 }); k.play('thud', 98.7, { gain: 0.4 });
    k.play('stamp', 104.3, { gain: 0.8 }); k.play('thud', 104.3, { gain: 0.6 }); k.play('pop', 108.9, { gain: 0.5 }); k.play('wrong', 113.8, { gain: 0.5 }); k.play('pop', 115.5, { pitch: 0.8, gain: 0.5 });
    k.play('stamp', 122.8, { gain: 0.4 }); k.play('ding', 127.1, { gain: 0.5 }); k.play('pop', 129.3, { pitch: 1.1, gain: 0.5 }); k.play('whoosh', 140.9, { dur: 0.7, gain: 0.4 });
    k.play('whoosh', 150.3, { dur: 0.5, gain: 0.5 }); k.play('thud', 152.3, { gain: 0.6 }); k.play('pop', 156.7, { pitch: 1.2, gain: 0.5 }); k.play('stamp', 163.9, { gain: 0.9 }); k.play('thud', 163.9, { gain: 0.7 });
    k.play('wrong', 166.5, { gain: 0.5 }); k.play('whoosh', 169.3, { dur: 0.8, gain: 0.3 }); k.play('stamp', 177.6, { gain: 0.7 }); k.play('chime', 178.0, { note: 'C6', gain: 0.9 });
  },
};
function overlays(ctx, t, cam, S) {
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Monkey and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Turtle', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  if (t >= 42.8 && t < 47.6) { ctx.save(); ctx.globalAlpha = K.env(t, 42.8, 47.6, 0.2, 0.5); S.label(ctx, 'DAYS PASS', 500, 190, K.beat(t, 42.8, 0.4, 'lin'), { align: 'center', size: 70, fill: C.yellow }); ctx.restore(); }
  if (t >= 72.2 && t < 76.2) { ctx.save(); ctx.globalAlpha = K.env(t, 72.2, 76.2, 0.1, 0.4); S.counter(ctx, 1, 190, 330, K.beat(t, 72.2, 0.4, 'lin'), { size: 100 }); S.label(ctx, 'heart', 190, 450, K.beat(t, 72.7, 0.3, 'lin'), { align: 'center', size: 44, fill: C.yellow }); ctx.restore(); }
  if (t >= 136.8 && t < 140.3) { ctx.save(); ctx.globalAlpha = K.env(t, 136.8, 140.3, 0.1, 0.4); S.arrow(ctx, [640, 360], [330, 360], K.beat(t, 136.9, 0.6, 'out'), { bend: -0.12, width: 26 }); ctx.restore(); }
  if (t >= 163.8 && t < 166.8) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 166) / 0.8); const [cx, cy] = toPanel(300, 300, cam); S.emphasis(ctx, cx, cy, 190, K.beat(t, 163.8, 0.45, 'lin'), { word: 'GOTCHA!', wx: 0.8, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 177.5) S.title(ctx, 'THE END', 500, 190, K.beat(t, 177.5, 0.8, 'lin'), { size: 80, align: 'center' });
}
window.SCENE = SCENE;
