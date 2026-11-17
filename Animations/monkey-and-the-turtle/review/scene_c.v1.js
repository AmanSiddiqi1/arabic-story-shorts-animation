// ===== the story: the monkey and the turtle =====
const WW = 1000, WH = 1230, WATER = 772, BANK = 700, ISL = 742, ISX = 680, DUR = 182;
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
const CAM = [[0, { x: 500, y: 560, zoom: 1.0 }], [3.4, { x: 500, y: 560, zoom: 1.0 }], [5.2, { x: 270, y: 440, zoom: 1.9 }], [10.0, { x: 300, y: 480, zoom: 2.1 }], [12.4, { x: 385, y: 600, zoom: 1.5 }], [17.0, { x: 440, y: 680, zoom: 1.5 }], [23.8, { x: 500, y: 730, zoom: 1.7 }], [30.5, { x: 420, y: 640, zoom: 1.5 }],
  [37.0, { x: 370, y: 570, zoom: 1.6 }], [42.2, { x: 340, y: 560, zoom: 1.5 }], [43.4, { x: 320, y: 640, zoom: 1.7 }], [47.8, { x: 330, y: 680, zoom: 1.9 }], [57.9, { x: 330, y: 690, zoom: 1.9 }], [58.9, { x: 560, y: 720, zoom: 1.5 }], [60.6, { x: 760, y: 660, zoom: 1.8 }], [62.0, { x: 835, y: 665, zoom: 2.7 }], [76.0, { x: 835, y: 665, zoom: 2.7 }], [77.0, { x: 795, y: 675, zoom: 3.0 }], [81.0, { x: 795, y: 675, zoom: 3.0 }],
  [82.6, { x: 330, y: 660, zoom: 1.7 }], [84.3, { x: 300, y: 650, zoom: 1.9 }], [96.8, { x: 320, y: 680, zoom: 1.9 }], [100.0, { x: 440, y: 720, zoom: 1.7 }], [104.0, { x: 530, y: 750, zoom: 1.9 }], [113.7, { x: 530, y: 750, zoom: 1.9 }], [122.6, { x: 520, y: 690, zoom: 2.2 }], [126.1, { x: 520, y: 690, zoom: 2.2 }], [126.4, { x: 430, y: 640, zoom: 1.5 }], [126.9, { x: 430, y: 640, zoom: 1.5 }], [127.3, { x: 520, y: 680, zoom: 2.0 }],
  [140.0, { x: 520, y: 700, zoom: 1.9 }], [143.4, { x: 470, y: 690, zoom: 1.7 }], [149.0, { x: 380, y: 640, zoom: 1.6 }], [150.0, { x: 385, y: 500, zoom: 1.3 }], [156.8, { x: 385, y: 500, zoom: 1.3 }], [163.8, { x: 400, y: 480, zoom: 1.55 }], [169.2, { x: 400, y: 480, zoom: 1.55 }], [172.0, { x: 500, y: 560, zoom: 1.05 }], [182, { x: 500, y: 560, zoom: 1.05 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- the turtle ----------
// ---------- acting layer (2026-11-15 upgrade, Fable 5.2 direction). Film time = scene time here. ----------
const FIGS = [14.0, 15.3, 16.9];
const TX = [[17.2, 590], [23.9, 590], [27.6, 530], [31.32, 530], [32.4, 440], [54.4, 425], [57.9, 425], [60.4, 690], [61.4, 715], [81.2, 715], [81.4, 600], [84.0, 430], [99.7, 430]];
const TURNS = [[0, -1], [57.95, 1], [81.4, -1], [99.0, 1], [142.94, -1], [169.26, 1]];
const turtleX = (t) => { if (t < 99.7) return kfn(t, TX, 'inOut'); if (t < 105.98) return K.lerp(430, 520, (t - 99.7) / 6.28); if (t < 143.64) return 520;
  if (t < 149.0) return K.lerp(520, 420, K.ease.out((t - 143.64) / 5.36)); if (t < 169.96) return 420; return K.lerp(420, 640, K.ease.inOut(K.clamp((t - 169.96) / 7.04))); };
const MOH = (P) => [P.x + 8 * Math.sign(P.dir || 1) * (P.s || 1), P.y - 140 * (P.s || 1)];            // monkey head
const TUH = (T) => [T.x + Math.sign(T.dir) * (96 + 38 * T.ext) * T.s, T.y - 52 * T.s];                  // turtle head
const between = (t, a, b) => t >= a && t < b;
const FAR = [150, 600], TREEPT = [250, 380], ISLE = [900, 600];
function figPos(i, t) {
  const t0 = FIGS[i]; if (t < t0 - 0.8) return null;
  if (t < t0) { const u = (t - (t0 - 0.8)) / 0.8, y0 = i === 0 ? 290 : 450, x0 = i === 0 ? 338 : 345 + i * 3; return { x: K.lerp(x0, 345, u), y: K.lerp(y0, WATER - 8, u * u), r: u * 5 }; }
  let x = 345 + i * 3 + Math.min((t - t0) * 10, 62 + i * 22), y = WATER - 12 + Math.sin(t * 2 + i) * 3;
  if (i === 0 && t > 27.0) x += 10 * pulse(t, 27.0, 0.8);                                              // nudged by his nose, bobs away and back
  return { x, y, r: 0.4 * Math.sin(t * 2 + i) };
}
function sunPos(t) { const s = sunMoon(null, t); return s.dark > 0.5 && s.mx != null ? [s.mx, s.my] : [s.sx, s.sy]; }
function turtleP(t) {
  const x = turtleX(t), hut = K.smooth(ISX - 10, ISX + 60, x), tf = turnFlip(t, TURNS, t > 169 ? 1.0 : 0.7), sp = swimPhase(turtleX, t);
  const P = { x, y: tY(x), s: K.lerp(0.85, 0.6, hut), dir: tf.dir, ph: sp.ph, paddle: sp.paddle, eyes: 'open', mouth: 'closed', ext: 1, brow: 0 };
  P.y += kfn(t, [[17.2, 120], [18.0, -8], [18.4, 0]]) + 8 * tf.sink + (sp.moving ? 3 * Math.sin(sp.ph) : 1.5 * Math.sin(t * 1.9));
  if (t < 17.2) P.y = 1000;
  P.talk = talk(t, [[31.4, 36.9], [49.5, 50.5], [84.1, 86], [86.3, 87.4], [88.3, 95.6], [114.0, 118.3], [118.6, 121.8], [61.6, 62.4]], 0.7);
  P.lid = blink(t, 13);
  const me = TUH(P), mo = monkeyPos(t, P);
  let gaze = MOH(mo);
  // surfacing, shaking off the water, looking around, then the fig
  if (between(t, 18.4, 19.4)) P.tilt = 0.2 * Math.sin((t - 18.4) * 4 * Math.PI);
  if (between(t, 19.9, 22.2)) gaze = t < 20.6 ? [800, 760] : t < 21.3 ? [380, 760] : [590, 500];
  if (between(t, 22.2, 28.4)) { const f = figPos(0, t); if (f) gaze = [f.x, f.y]; }
  if (between(t, 23.9, 28.16)) { P.eyes = 'wide'; P.lid = pulse(t, 24.2, 0.15); }
  if (between(t, 28.16, 28.4)) { P.ext = t < 28.33 ? 0.7 : 1.1; P.mouth = t > 28.3 ? 'open' : 'closed'; }
  if (between(t, 28.4, 29.4)) { P.mouth = Math.sin((t - 28.4) * 19) > 0 ? 'open' : 'closed'; P.drop = 2 * Math.abs(Math.sin((t - 28.4) * 9.5)); }
  if (between(t, 29.4, 30.6)) { P.eyes = t < 29.7 ? 'wide' : 'shut'; P.mouth = 'smile'; P.tilt = 0.08 * Math.sin(t * 14); }
  if (between(t, 31.32, 37.0)) { P.tilt = -0.32 * K.beat(t, 32.0, 0.5, 'out'); }
  if (between(t, 36.94, 42.6)) { P.mouth = 'smile'; P.tilt = -0.28; }
  if (between(t, 38.6, 39.2)) P.drop = 4 * pulse(t, 38.7, 0.4);
  if (between(t, 39.2, 40.4)) { P.mouth = 'open'; const f = tossPos(t); if (f) gaze = f; }
  if (between(t, 40.4, 41.4)) { P.ext = 1 - 0.12 * pulse(t, 40.4, 0.25); P.mouth = Math.sin((t - 40.4) * 19) > 0 ? 'open' : 'smile'; }
  // friends: vignettes, conversation, passing a fig, the low sun
  if (between(t, 43.4, 45.0)) { P.tilt = -0.3; if (t > 44.2) P.mouth = Math.sin(t * 19) > 0 ? 'open' : 'closed'; }
  if (between(t, 45.0, 46.6)) { gaze = sunPos(t); P.lid = 0; }
  if (between(t, 46.6, 48.1)) { P.mouth = 'open'; P.tilt = 0.06 * Math.sin(t * 20); }
  if (between(t, 48.14, 49.5)) { P.drop = 3 * pulse(t, 48.6, 0.3) + 3 * pulse(t, 49.1, 0.3); P.mouth = 'smile'; }
  if (between(t, 50.6, 51.38)) { P.mouth = 'open'; P.tilt = 0.06 * Math.sin(t * 20); }
  if (between(t, 51.38, 54.46)) { P.tilt = -0.3 * (t < 52.4 ? 1 : 0.4); if (between(t, 52.4, 53.4)) P.mouth = Math.sin(t * 19) > 0 ? 'open' : 'closed'; else P.mouth = 'smile'; }
  if (between(t, 54.46, 57.56)) P.mouth = 'smile';
  if (between(t, 57.56, 59.0)) { gaze = sunPos(t); P.eyes = 'wide'; P.drop = 4 * pulse(t, 57.9, 0.3); }
  // the hut: small smile that dies, recoil, scolded, alarm, the heart, grief, decision
  if (t >= 59.0 && t < 81.3) {
    const W = wifeP(t); gaze = TUH(W);
    if (t < 61.0) P.mouth = 'smile';
    if (between(t, 61.42, 68.98)) { P.ext = 0.7 - 0.2 * pulse(t, 61.42, 0.4); P.mouth = 'frown'; P.brow = -0.4; P.lid = Math.max(P.lid, pulse(t, 61.45, 0.2)); }
    if (between(t, 67.4, 68.98)) gaze = t < 67.9 ? FAR : [me[0] + 40, me[1] + 120];
    if (between(t, 68.98, 71.6)) { P.x += 10 * K.beat(t, 69.0, 0.5, 'out'); P.ext = 1.05; P.brow = -0.6; P.mouth = 'o'; }
    if (between(t, 71.6, 75.48)) { P.x += 10; P.ext = 0.9; P.brow = -0.5; P.mouth = 'frown'; }
    if (between(t, 75.48, 76.3)) { P.x += 10; P.ext = 0.6; P.eyes = 'wide'; P.lid = 0; gaze = t < 76.0 ? FAR : gaze; }
    if (t >= 76.3) { P.x += 10; P.drop = 12 * K.beat(t, 76.3, 1.2, 'inOut'); P.wet = true; P.lid = 0.6; P.mouth = 'frown'; gaze = [me[0] - 20, me[1] + 140]; }
    if (t >= 77.94) gaze = TUH(W);
    if (t >= 79.14) { P.lid = Math.max(0.2, pulse(t, 79.14, 0.35)); P.sq = 1 + 0.03 * pulse(t, 79.5, 0.6); P.drop = K.lerp(12, 0, K.beat(t, 79.3, 0.6)); P.mouth = 'closed'; P.brow = 0.3; P.wet = false; }
    if (t >= 80.08) { gaze = FAR; P.lid = 0.35; }
  }
  // morning: the guilty host
  if (between(t, 81.4, 84.3)) { P.mouth = 'frown'; gaze = [me[0] - 60, me[1] + 120]; P.y += 6; }
  if (between(t, 84.3, 95.6)) { P.mouth = 'smile'; P.drop = 4 * pulse(t, 84.6, 0.3);
    gaze = t < 86.26 ? gaze : t < 87.4 ? MOH(mo) : t < 89.3 ? [me[0] - 60, me[1] + 120] : t < 91.02 ? ISLE : [me[0] - 60, me[1] + 120];
    if (between(t, 87.87, 88.8)) P.tilt = 0.15 * (pulse(t, 87.9, 0.4) + pulse(t, 88.35, 0.4));
    P.drop = (P.drop || 0) + 4 * (pulse(t, 92.72, 0.35) + pulse(t, 94.8, 0.35)); }
  if (between(t, 95.6, 96.9)) { P.mouth = 'frown'; gaze = [me[0] - 40, me[1] + 140]; }
  if (between(t, 96.9, 99.0)) P.mouth = 'smile';
  // the monkey lands on his back
  if (between(t, 97.96, 98.6)) { P.y += 16 * Math.exp(-(t - 97.96) * 5) * Math.cos((t - 97.96) * 19); if (t < 98.3) { P.eyes = 'wide'; P.mouth = 'o'; } }
  // the ride out: no smile, eyes ahead, one glance back; the stop; the question; the sigh; the confession
  if (between(t, 99.0, 108.72)) { gaze = [me[0] + 300, me[1] + 20]; P.lid = Math.max(P.lid, 0.3); if (between(t, 104.9, 105.4)) gaze = MOH(mo); }
  if (between(t, 105.98, 106.3)) { P.tip = 0.08 * pulse(t, 105.98, 0.3); }
  if (between(t, 108.72, 113.66)) { gaze = [me[0] + 120, me[1] + 60]; P.drop = 4 * K.beat(t, 109, 1); P.lid = Math.max(P.lid, pulse(t, 111.0, 0.5)); }
  if (between(t, 113.66, 116.14)) { P.drop = 4 - 5 * pulse(t, 113.7, 0.5) + 8 * K.beat(t, 114.2, 0.6); P.lid = t > 114.2 ? 0.7 : P.lid; gaze = [me[0] + 100, me[1] + 100]; }
  if (between(t, 116.14, 119.54)) { P.drop = 6; gaze = t < 117.6 ? MOH(mo) : [me[0] + 80, me[1] + 120]; P.lid = t < 117.6 ? 0 : 0.5; }
  if (between(t, 119.54, 127.88)) { P.eyes = 'shut'; P.wet = true; P.drop = 6; P.mouth = 'frown'; }
  // the lie: he looks up at his friend, follows the pointing arm to the tree, believes, nods, turns home
  if (between(t, 127.88, 142.94)) { P.eyes = 'open'; P.wet = false; P.drop = 0; gaze = MOH(mo); P.mouth = 'closed';
    if (between(t, 133.2, 136.6)) { gaze = TREEPT; P.mouth = 'o'; P.brow = -0.5; }
    if (between(t, 139.4, 140.3)) gaze = [me[0] + 300, me[1]];
    if (t >= 140.48) { P.mouth = 'smile'; P.drop = 4 * (pulse(t, 140.7, 0.35) + pulse(t, 141.3, 0.35)); } }
  if (between(t, 143.4, 149.0)) { P.mouth = 'smile'; gaze = [me[0] - 300, me[1]]; if (between(t, 146.0, 146.5)) gaze = MOH(mo); }
  if (between(t, 149.0, 150.1)) { P.tilt = -0.15 * K.beat(t, 149.2, 0.5); P.mouth = 'o'; gaze = MOH(mo); }
  // the leap: the shell is shoved down and springs back; he tracks the monkey up into the tree
  if (t >= 150.04 && t < 151.5) { const d = t - 150.04; P.y += 14 * Math.exp(-d * 4) * Math.cos(d * 14); P.x += 10 * Math.exp(-d * 4) * Math.sin(d * 9); }
  if (between(t, 150.1, 157.0)) { P.tilt = -0.3; P.mouth = 'o'; P.eyes = 'wide'; P.lid = pulse(t, 152.6, 0.25) + pulse(t, 153.4, 0.25); gaze = MOH(mo); }
  // the taunt: puzzled, realising, ashamed; flinch on "تخدعني"
  if (between(t, 157.0, 161.2)) { P.tilt = -0.25 + 0.1 * Math.sin((t - 157) * 2); P.brow = -0.3; P.mouth = 'closed'; gaze = MOH(mo); }
  if (between(t, 161.2, 162.6)) { P.tilt = -0.25; P.eyes = 'wide'; P.mouth = 'o'; P.lid = 0; gaze = MOH(mo); }
  if (between(t, 162.6, 165.86)) { P.tilt = -0.1; P.brow = -0.6; P.mouth = 'frown'; P.ext = 0.8; gaze = [me[0] - 120, me[1] + 120]; if (t >= 165.0) { P.ext = K.lerp(0.8, 0.5, K.clamp((t - 165) / 0.1)); P.eyes = 'shut'; } }
  // the ending: head goes down slowly, one last look up, swims away slowly
  if (t >= 165.86) { const u = K.beat(t, 165.86, 1.9, 'inOut'); P.drop = 16 * u; P.ext = K.lerp(0.5, 0.45, u); P.lid = K.lerp(0.3, 1, u); P.wet = true; P.mouth = 'frown'; gaze = [me[0], me[1] + 100];
    if (between(t, 168.52, 169.0)) { P.lid = 0.1; P.drop = 10; gaze = MOH(mo); }
    if (t >= 169.0) { P.lid = 0.6; P.drop = 8; P.ext = 0.6; P.paddle *= 0.6; } }
  P.ext *= 1 - 0.65 * tf.tuck;
  P.gaze = lookAt(me, gaze);
  return P;
}
function wifeP(t) {
  const W = { x: 905, y: tY(905), s: 0.6, dir: -1, shell: C.red, wife: true, eyes: 'open', mouth: 'closed', ph: t, paddle: 0, ext: 1, brow: 1 };
  const hus = [kfn(t, TX, 'inOut') + 10 * K.beat(t, 69.0, 0.5, 'out'), 742];
  W.lid = blink(t, 17); W.talk = talk(t, [[61.5, 63.8], [63.9, 68]], 0.2);
  let gaze = [hus[0] + (96 + 38) * 0.67, hus[1] - 40];
  if (t < 61.4) gaze = [kfn(t, TX, 'inOut') + 90, 740];
  if (between(t, 61.42, 68.28)) { W.x -= 14 * K.beat(t, 61.42, 0.25, 'out') + 10 * (pulse(t, 63.84, 0.25) + pulse(t, 65.78, 0.25) + pulse(t, 67.26, 0.25)); W.tip = 0.12; if (t >= 67.26) gaze = FAR; }
  if (between(t, 68.28, 68.98)) { W.talk = 0; gaze = [1000, 600]; W.lid = 0.5; W.brow = 0.4; }
  if (t >= 68.98) { const u = K.ease.inOut(K.clamp((t - 68.98) / 0.7)); W.x = K.lerp(891, 945, u); W.y = K.lerp(742, 716, u); W.tilt = -0.25 * pulse(t, 68.98, 0.9); W.brow = 0; }
  if (t >= 69.72) { W.ext = 0.75; W.drop = 10; W.eyes = 'shut'; W.mouth = 'frown'; W.lid = 0;
    if (between(t, 70.2, 70.7)) { W.eyes = 'open'; W.lid = 0.75; }
    if (between(t, 71.6, 76.3)) W.talk = talk(t, [[71.6, 76.3]], 0.4) * 0.5;
    if (between(t, 75.02, 76.3)) { W.eyes = 'open'; W.lid = 0; W.brow = 1; }
    if (between(t, 77.94, 78.3)) { W.eyes = 'open'; W.lid = 0.75; } }
  W.gaze = lookAt(TUH(W), gaze);
  return W;
}
// where the monkey is (shared by the turtle's eye lines and the monkey's own pose)
function monkeyPos(t, T) {
  const ride = (T) => ({ x: T.x - 8 * Math.sign(T.dir), y: T.y - 100 * T.s, dir: Math.sign(T.dir), s: 1 });
  if (t < 42.3) return { x: BR1[0], y: BR1[1], dir: 1, s: 1 };
  if (t < 42.6) return { x: BR1[0], y: BR1[1] + 60, dir: 1, s: 1 };
  if (t < 42.95) { const u = (t - 42.6) / 0.35; return { x: K.lerp(BR1[0], 262, u), y: fallY(t, 42.6, 42.95, BR1[1] + 60, BANK + 2), dir: 1, s: 1 }; }
  if (t < 97.46) return { x: 262, y: BANK + 2, dir: 1, s: 1 };
  if (t < 97.96) { const u = (t - 97.46) / 0.5, to = ride(T); return { x: K.lerp(262, to.x, u), y: K.lerp(BANK + 2, to.y, u) - 60 * Math.sin(Math.PI * u), dir: 1, s: 1 }; }
  if (t < 150.04) return ride(T);
  const r0 = { x: 420 + 8, y: 800 - 100 * 0.85 };
  if (t < 150.44) { const u = (t - 150.04) / 0.4; return { x: K.lerp(r0.x, BR1[0], u), y: K.lerp(r0.y, BR1[1], u) - 40 * Math.sin(Math.PI * u), dir: -1, s: 1 }; }
  if (t < 150.54) return { x: BR1[0], y: BR1[1], dir: -1, s: 1 };
  if (t < 150.94) { const u = (t - 150.54) / 0.4; return { x: BR1[0], y: K.lerp(BR1[1], BR2[1], u) - 30 * Math.sin(Math.PI * u), dir: 1, s: 1 }; }
  return { x: BR2[0], y: BR2[1], dir: 1, s: 1 };
}
const tossPos = (t) => { if (t < 39.5 || t >= 40.4) return null; const u = (t - 39.5) / 0.9, a = [BR1[0] + 40, BR1[1] - 110], b = TUH(turtleP(40.4)); return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 130 * Math.sin(Math.PI * u)]; };
function monkeyP(t, T) {
  const m = monkeyPos(t, T), P = { ...m, ph: t * 3, look: 0.7, eyes: 'open', mouth: 'closed' }, th = TUH(T);
  const hush = (l) => talk(t, l, 0);
  let gaze = th; P.lid = blink(t, 7);
  // eating on the branch; one real bite; the next fig slips; he watches it fall; leans to look; shrugs
  if (t < 12.58) { P.hold = 'fig'; P.eat = between(t, 10.0, 10.7) ? pulse(t, 10.0, 0.7) * 0.9 + 0.1 : 0.15; P.talk = between(t, 10.7, 12.4) ? 0.3 * Math.abs(Math.sin(t * 9)) : 0; gaze = [BR1[0] + 60, BR1[1] - 120]; }
  if (between(t, 12.58, 13.2)) { P.aR = [2.3, 2.6]; P.hold = 'fig'; gaze = [BR1[0] + 70, BR1[1] - 230]; }
  if (between(t, 13.2, 14.2)) { P.aR = [2.0 + 0.4 * pulse(t, 13.2, 0.2), 2.3]; const f = figPos(0, t); if (f) gaze = [f.x, f.y]; P.mouth = 'o'; P.eyes = 'wide'; P.lid = 0; }
  if (between(t, 14.2, 15.3)) { P.tip = 0.25 * K.beat(t, 14.2, 0.3, 'out'); gaze = [380, WATER]; P.drop = 4 * pulse(t, 15.0, 0.3); }
  if (between(t, 15.3, 31.32)) { P.eat = 0.5 + 0.5 * Math.sin(t * 2.4); P.hold = 'fig'; gaze = [BR1[0] + 60, BR1[1] - 120]; }
  // the thanks: freeze mid-bite, look left, right, down; delight; laugh; pluck; wind-up; throw; cheer
  if (between(t, 31.32, 37.42)) { P.hold = 'fig'; P.eat = 0.6; gaze = t < 32.3 ? [BR1[0] + 60, BR1[1] - 120] : t < 32.6 ? [50, 350] : t < 33.0 ? [650, 350] : th;
    if (t >= 33.0) { P.mouth = t < 33.4 ? 'o' : 'smile'; P.tip = 0.2 * K.beat(t, 33.4, 0.5, 'out'); } }
  if (between(t, 37.42, 38.6)) { P.eyes = 'shut'; P.mouth = 'open'; P.tilt = Math.sin(t * 22) * 0.12; P.y -= 6 * Math.abs(Math.sin(t * 11)); P.tip = 0.15; }
  if (between(t, 38.6, 39.22)) { P.aR = t < 38.9 ? [2.6, 2.9] : [1.2, 2.0]; P.hold = t >= 38.75 ? 'fig' : null; P.brow = -0.5; P.mouth = 'smile'; P.tip = 0.15; }
  if (between(t, 39.22, 39.5)) { P.aR = [-0.8, -0.4]; P.hold = 'fig'; P.tip = 0.05; }
  if (between(t, 39.5, 40.4)) { P.aR = [1.9, 1.7]; const f = tossPos(t); if (f) gaze = f; P.mouth = 'smile'; }
  if (between(t, 40.4, 42.3)) { P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; P.mouth = 'smile'; P.y -= 5 * Math.abs(Math.sin(t * 8)); }
  // down from the tree: hang, drop, land
  if (between(t, 42.3, 43.4)) { P.aL = [-2.9, -3.0]; P.aR = [2.9, 3.0]; if (t >= 42.95) { P.sq = landSquash(t, 42.95, 0.25); P.aL = P.aR = undefined; } }
  // friends: a fig handed down, the moon, a laugh, taking turns, eating together, goodbye
  if (between(t, 43.4, 45.0)) { P.handR = [70, t < 44.2 ? 20 : -60]; P.hold = t < 44.2 ? 'fig' : null; P.tip = 0.15; P.mouth = 'smile'; }
  if (between(t, 45.0, 46.6)) { gaze = sunPos(t); P.lid = 0; }
  if (between(t, 46.6, 48.1)) { P.eyes = 'shut'; P.mouth = 'open'; P.tilt = Math.sin(t * 20) * 0.1; }
  if (between(t, 48.14, 49.5)) { P.talk = hush([[48.2, 49.4]]); P.handR = [60, -110 + 10 * Math.sin(t * 6)]; }
  if (between(t, 49.5, 50.6)) { P.drop = 3 * pulse(t, 49.9, 0.3) + 3 * pulse(t, 50.3, 0.3); P.mouth = 'smile'; }
  if (between(t, 50.6, 51.38)) { P.eyes = 'shut'; P.mouth = 'open'; P.tilt = Math.sin(t * 20) * 0.1; }
  if (between(t, 51.38, 54.46)) { P.hold = 'fig'; if (t < 52.2) { P.handR = [72, 10]; P.tip = 0.15; } else { P.eat = 0.5 + 0.5 * Math.sin(t * 6); P.hold = 'fig'; } P.mouth = t > 53.5 ? 'smile' : P.mouth; }
  if (between(t, 54.46, 57.56)) { P.talk = hush([[54.6, 56.8]]); P.handR = [58, -120 + 10 * Math.sin(t * 5)]; P.mouth = 'smile'; }
  if (between(t, 57.56, 61.4)) { P.aR = [2.4 + Math.sin(t * 8) * 0.3, 3.0]; P.mouth = 'smile'; }
  if (between(t, 61.4, 81.5)) gaze = [700, 740];
  // morning: waves, listens, looks where he looks, delight, joy
  if (between(t, 81.5, 84.3)) { P.aR = [2.4 + Math.sin(t * 8) * 0.3, 3.0]; P.hold = 'fig'; P.mouth = 'smile'; }
  if (between(t, 84.3, 95.6)) { P.mouth = 'closed'; P.drop = 3 * (pulse(t, 86.6, 0.3) + pulse(t, 88.2, 0.3)); if (between(t, 89.3, 91.0)) { gaze = ISLE; P.tilt = 0.1; }
    if (between(t, 93.64, 94.8)) { P.eyes = t < 94.1 ? 'wide' : 'open'; P.mouth = t < 94.1 ? 'o' : 'smile'; } if (t >= 94.8) { P.mouth = 'smile'; P.y -= 8 * pulse(t, 94.8, 0.3); } }
  if (between(t, 95.6, 96.9)) { P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; P.mouth = 'smile'; P.eyes = 'shut'; }
  // hop aboard: crouch, launch, land, windmill, sit and grip
  if (between(t, 96.9, 97.46)) { P.sq = anticipate(t, 96.9, 0.56, 0.18); P.aL = [-0.7, -0.4]; P.aR = [-0.6, -0.3]; gaze = th; }
  if (between(t, 97.46, 97.96)) { P.sq = 1.15; P.aL = [-2.4, -2.9]; P.aR = [2.4, 2.9]; }
  if (between(t, 97.96, 98.9)) { P.sq = landSquash(t, 97.96, 0.2); const w = t * 14; P.aL = [-1.6 - 0.8 * Math.sin(w), -2]; P.aR = [1.6 + 0.8 * Math.sin(w), 2]; P.tip = 0.12 * Math.exp(-(t - 97.96) * 3) * Math.sin((t - 97.96) * 16); }
  const onShell = t >= 98.9 && t < 150.04;
  if (onShell) { P.handL = [-34, -12]; P.handR = [34, -12]; }
  if (between(t, 99.0, 99.7)) { P.sq = 1 - 0.08 * pulse(t, 99.25, 0.25); P.aL = [-1.6, -1.6]; P.aR = [1.6, 1.6]; }
  // the ride: delighted; the stop throws him forward; the question; the confession
  if (between(t, 99.7, 105.98)) { P.mouth = 'smile'; P.ph = t * 5; gaze = t < 101 ? th : t < 102 ? ISLE : t < 103 ? TREEPT : t < 104 ? [600, 880] : ISLE; }
  if (t >= 105.98 && t < 107.0) { P.tip = lurch(t, 105.98, 0.28); if (t < 106.25) { P.handL = undefined; P.handR = undefined; P.aL = [-1.8, -2.2]; P.aR = [1.8, 2.2]; } P.mouth = 'o'; }
  if (between(t, 107.0, 108.72)) { P.lid = Math.max(P.lid, pulse(t, 107.5, 0.2)); gaze = th; }
  if (between(t, 108.72, 113.66)) { P.tip = 0.18; P.talk = hush([[108.8, 110.4], [110.5, 112.2], [112.3, 113.7]]); gaze = th;
    if (between(t, 110.32, 112.14)) { P.handL = [-62, -96]; P.handR = [62, -96]; P.drop = -3; }
    if (t >= 112.14) { P.tip = 0.05; gaze = t < 112.7 ? [300, 600] : t < 113.1 ? [820, 600] : [520, 900]; P.ph = 2; } }
  if (between(t, 113.66, 119.54)) { P.brow = -0.5; P.tilt = 0.12; P.mouth = 'frown'; P.drop = 4 * pulse(t, 117.2, 0.4); }
  if (between(t, 119.54, 122.66)) { P.lid = Math.max(P.lid, pulse(t, 119.54, 0.2)); if (t >= 120.06) { P.eyes = 'wide'; P.lid = 0; P.ph = 0.4; P.mouth = 'o'; } if (t >= 120.7) { gaze = [P.x + 10, P.y - 60]; P.handR = [14, -80]; } }
  // fear, then quick thinking, then the mask
  if (between(t, 122.66, 124.26)) { P.sq = 0.9; P.tip = -0.15; P.x += tremble(t, 2.5); P.kick = Math.sin(t * 30) * 4; P.brow = -0.6; P.eyes = 'wide'; P.mouth = 'frown'; gaze = t < 123.3 ? FAR : t < 123.8 ? [300, 880] : [760, 880]; }
  if (between(t, 124.26, 125.76)) { P.drop = 4 * pulse(t, 124.3, 0.35); P.mouth = 'closed'; gaze = th; P.brow = -0.3; }
  if (between(t, 125.76, 127.02)) { P.lid = 0.35; P.ph = t * 9; gaze = t < 126.0 ? [300, 560] : t < 126.2 ? [520, 350] : t < 126.3 ? [800, 560] : TREEPT; }
  if (between(t, 127.02, 140.48)) { P.lid = pulse(t, 127.02, 0.2); P.brow = -0.5; P.mouth = 'smile'; P.talk = hush([[127.9, 140.2]]); gaze = th;
    if (between(t, 127.88, 129.26)) { P.handR = [40, -10 - 22 * (pulse(t, 128.1, 0.25) + pulse(t, 128.5, 0.25))]; P.tip = 0.12; }
    if (between(t, 129.26, 133.2)) { P.handL = [-62, -96]; P.handR = [62, -96]; P.tilt = 0.12 * Math.sin((t - 129.26) * 3); }
    if (between(t, 133.2, 135.04)) { P.handR = t < 135.0 ? [14, -84 - 10 * (pulse(t, 134.54, 0.2) + pulse(t, 134.85, 0.2))] : [62, -100]; }
    if (between(t, 135.04, 136.6)) { P.handL = [-112, -150]; gaze = TREEPT; }
    if (between(t, 136.6, 139.4)) { P.y -= 8 * pulse(t, 137.66, 0.3); const a = (t - 137.8) * 6; if (t > 137.8 && t < 138.9) P.handR = [50 + 18 * Math.cos(a), -130 + 18 * Math.sin(a)]; }
    if (between(t, 139.4, 140.3)) { P.mouth = 'closed'; P.drop = 4 * pulse(t, 139.5, 0.3); P.x += tremble(t, 1); gaze = th; P.brow = -0.2; } }
  // the ride back: eyes locked on his branch; the smile flashes on when the turtle looks back
  if (between(t, 140.48, 143.4)) { P.mouth = 'smile'; gaze = th; }
  if (between(t, 143.4, 149.5)) { P.sq = 0.92; gaze = [BR2[0], BR2[1] - 40]; P.mouth = 'closed'; P.lid = 0.3; P.ph = 1.2; if (between(t, 146.0, 146.5)) { P.mouth = 'smile'; P.lid = 0; gaze = th; } }
  if (between(t, 149.5, 150.04)) { P.sq = anticipate(t, 149.5, 0.54, 0.22); P.aL = [-0.7, -0.4]; P.aR = [-0.6, -0.3]; gaze = [BR2[0], BR2[1] - 40]; P.handL = P.handR = undefined; }
  // the leap: two stages, a touch on the low branch, landed; clinging, heaving; then sitting safe
  if (between(t, 150.04, 151.0)) { P.sq = t < 150.14 ? 1.2 : t < 150.54 && t >= 150.44 ? 0.9 : 1.08; P.aL = [-2.5, -2.9]; P.aR = [2.5, 2.9]; P.mouth = 'o'; P.eyes = 'wide'; gaze = [BR2[0], BR2[1] - 60]; }
  if (between(t, 151.0, 152.44)) { P.sq = landSquash(t, 151.0, 0.2) * (1 + 0.04 * Math.sin((t - 151.0) * 2 * Math.PI * 3)); P.aL = [-2.7, -2.9]; P.aR = [2.7, 2.9]; P.eyes = 'shut'; P.mouth = 'o'; }
  if (between(t, 152.44, 154.8)) { P.mouth = 'smile'; P.lid = 0.3; gaze = th; }
  // the taunt: leans out, amused; taps his chest; open palm and shrug; then the accusation
  if (between(t, 154.8, 163.82)) { P.tip = 0.25; gaze = th; P.lid = Math.max(0.3, P.lid); P.mouth = 'smirk'; P.brow = -0.4; P.talk = hush([[154.2, 163.6]]);
    if (between(t, 161.18, 161.9)) P.handR = [14, -84 - 10 * (pulse(t, 161.18, 0.25) + pulse(t, 161.5, 0.25))];
    if (between(t, 161.98, 163.82)) { P.handR = [70, -110]; P.handL = [-50, -110]; P.drop = 4 * pulse(t, 162.6, 0.4); } }
  if (between(t, 163.82, 165.86)) { P.tip = 0.3; P.brow = 1; P.mouth = 'open'; P.talk = hush([[163.9, 165.8]]); P.handR = [96, -60]; gaze = th; P.lid = 0; }
  // the ending: watches him go; leans back; one deliberate bite; looks out at the river
  if (t >= 165.86) { P.mouth = 'closed'; P.brow = 0; gaze = th; P.lid = Math.max(P.lid, t > 169.6 && t < 170.0 ? pulse(t, 169.6, 0.4) : 0); P.sq = 0.97;
    if (t >= 173) { P.tip = -0.08 * K.beat(t, 173, 1); P.sq = 0.97 + 0.03 * pulse(t, 173.5, 1.5); }
    if (t >= 176.6) { P.hold = t < 179.6 ? 'fig' : null; P.eat = t < 177.6 ? pulse(t, 176.6, 1.0) : 0.2; P.talk = between(t, 177.4, 178.3) ? 0.3 * Math.abs(Math.sin(t * 8)) * (1 - K.clamp((t - 177.4) / 0.9)) : 0; }
    if (t >= 178.32) gaze = [640, 800]; }
  P.gaze = lookAt(MOH(P), gaze);
  return P;
}
function waterFront(ctx, t) {
  const x0 = 330, x1 = ISX - 6, pts = []; for (let x = x0; x <= x1; x += 10) pts.push([x, wy(x, t)]);
  const poly = [...pts, [x1, WH], [x0, WH]];
  ctx.save(); K.poly(ctx, poly, true); ctx.fillStyle = 'rgba(29,91,208,0.58)'; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.white, 14, 0.18); ctx.globalAlpha = 0.5; ctx.fillRect(x0, WATER - 6, x1 - x0, WH); ctx.restore();
  ctx.save(); ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.white; K.poly(ctx, pts.map(([x, y]) => [x, y + 8])); ctx.stroke(); ctx.restore();
}
function waterBack(ctx, t) { ctx.fillStyle = '#17409a'; ctx.fillRect(0, WATER, WW, WH - WATER); ctx.fillStyle = dotPat(ctx, '#2a62c9', 14, 0.3); ctx.fillRect(0, WATER, WW, WH - WATER); }

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
  { const p = tossPos(t); if (p) fig(ctx, p[0], p[1], 13, (t - 39.5) * 12); }
  // the wife: out of bed to meet him, then the swoon back into bed under the blanket
  const blanket = () => { shape(ctx, [[868, 706], [1010, 706], [1010, ISL - 6], [868, ISL - 6]], C.red, { lw: 7, seed: 50, dot: C.white, pitch: 11, rad: 0.2, da: 0.8 }); shape(ctx, [[868, 706], [1010, 706], [1010, 720], [868, 720]], C.yellow, { lw: 5, seed: 51 }); };
  if (t >= 59 && t < 81.5) { if (t < 69.4) { blanket(); turtle(ctx, wifeP(t)); } else { turtle(ctx, wifeP(t)); blanket(); } }
  // wake behind the turtle while he swims, ripples where something lands or brakes
  for (let k = 0; k < 4; k++) { const t0 = Math.floor(t / 0.5) * 0.5 - k * 0.5; if (t0 > 17.5 && Math.abs(speed(turtleX, t0)) > 20) { const sp = turtleP(t0); ripple(ctx, sp.x - Math.sign(sp.dir) * 120 * sp.s, WATER, t0, t, 0.6); } }
  for (const [h, x, z] of [[17.3, 590, 1.3], [17.6, 560, 0.9], [97.96, T.x, 1.2], [98.2, T.x + 30, 0.8], [105.98, T.x + 140, 1.4], [150.04, 420, 1.3], [150.3, 450, 0.9]]) ripple(ctx, x, WATER, h, t, z);
  if (t >= 17.0) turtle(ctx, T); monkey(ctx, Mo);
  if (t >= 42.95 && t < 43.6) dustBurst(ctx, 262, BANK, t - 42.95, 5, 6, 12, 26, 0.5, 3);
  if (t >= 179.6 && t < 180.4) { const u = (t - 179.6) / 0.7; if (u < 1) fig(ctx, K.lerp(BR2[0] + 40, 345, u), K.lerp(BR2[1] - 80, WATER - 8, u * u), 12, u * 6); }
  ripple(ctx, 345, WATER, 180.3, t, 0.9);
  waterFront(ctx, t);
  worldFX(ctx, t, cam, T, Mo);
}
function worldFX(ctx, t, cam, T, Mo) {
  const hd = (T) => [T.x + T.dir * (96 + 38 * T.ext) * T.s, T.y - 52 * T.s];
  const B = (a, b) => K.beat(t, a, b, 'lin');
  FIGS.forEach((h, i) => { if (t >= h - 0.1 && t < h + 0.5) sfx(ctx, 'PLOP', 345 + i * 3, 700 + (i % 2) * 16, 40, B(h, 0.15), { rot: -0.1 + i * 0.1, fill: C.white }); });
  if (t >= 17.3 && t < 19.5) sfx(ctx, 'SPLASH', 500, 700, 54, B(17.5, 0.2), { rot: 0.08, fill: C.white });
  if (t >= 24.0 && t < 24.8) sfx(ctx, '!', hd(T)[0], hd(T)[1] - 110, 90, B(24.2, 0.2), { fill: C.red });
  if (t >= 28.2 && t < 29.6) sfx(ctx, 'NOM!', 520, 700, 56, B(28.2, 0.15), { rot: -0.1 });
  if (t >= 29.4 && t < 31.4) for (let i = 0; i < 3; i++) { const u = ((t - 29.4) * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - u * u; heart(ctx, hd(T)[0] - 20 + i * 38, hd(T)[1] - 60 - u * 120, 11 + i * 2); ctx.restore(); }
  if (t >= 31.4 && t < 37) { const h = hd(T); bubble(ctx, h[0] + 150, h[1] - 120, 310, 104, h[0] + 20, h[1] - 30, B(31.4, 0.3), 'THANK YOU!', { size: 50 }); }
  if (t >= 37.5 && t < 39.5) sfx(ctx, 'HA HA!', 440, 330, 62, B(37.5, 0.2), { rot: 0.12 });
  if (t >= 54.6 && t < 59.4) clockFace(ctx, 560, 600, 62, t - 54.6, B(54.6, 0.3));
  if (t >= 61.5 && t < 63.2) bubble(ctx, 900, 540, 170, 90, 880, 620, B(61.5, 0.25), '!?', { size: 56, fill: C.yellow });
  if (t >= 69.4 && t < 71.6) sfx(ctx, 'OHHH...', 835, 585, 48, B(69.4, 0.25), { rot: -0.08, fill: C.white });
  if (t >= 75.02 && t < 76.6) { bubble(ctx, 850, 545, 170, 120, 860, 640, B(75.02, 0.3), '', {}); heart(ctx, 850, 545, 46); }
  if (t >= 76.3 && t < 79.0) { for (let i = 0; i < 1; i++) { const u = ((t * 1.2 + i / 2) % 1), h = hd(T); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[h[0] - 4, h[1] + 4 + u * 34], [h[0] + 4, h[1] + 20 + u * 34], [h[0] - 4, h[1] + 30 + u * 34], [h[0] - 12, h[1] + 20 + u * 34]], '#5fa0ff', { lw: 3 }); ctx.restore(); } }
  if (t >= 89.3 && t < 95.8) { const h = hd(T); bubble(ctx, h[0] + 190, h[1] - 190, 250, 150, h[0] + 20, h[1] - 30, B(89.3, 0.3), '', {}); islandIcon(ctx, h[0] + 190, h[1] - 190, B(89.3, 0.4)); }
  if (t >= 112.1 && t < 113.66) { const m = [Mo.x + 40, Mo.y - 190]; bubble(ctx, m[0] + 130, m[1] - 90, 260, 96, m[0] + 30, m[1] - 20, B(112.1, 0.25), 'DANGER?', { size: 48 }); }
  if (t >= 113.7 && t < 115.6) for (let i = 0; i < 3; i++) { const u = (t - 113.7) / 1.9; ctx.save(); ctx.globalAlpha = 1 - u; cloudFlat(ctx, hd(T)[0] + 60 + i * 22, hd(T)[1] - 20 - u * 60 - i * 12, 0.3 + i * 0.1); ctx.restore(); }
  if (t >= 119.54 && t < 121.9) { const h = hd(T); bubble(ctx, h[0] + 20, h[1] - 125, 150, 104, h[0] + 6, h[1] - 30, B(119.54, 0.3), '', {}); heart(ctx, h[0] + 20, h[1] - 125, 34); }
  if (t >= 122.7 && t < 123.9) { sfx(ctx, '!!', Mo.x + 30, Mo.y - 230, 80, B(122.7, 0.2), { fill: C.red }); }
  if (t >= 126.6 && t < 127.4) bulb(ctx, Mo.x + 10, Mo.y - 270, B(126.6, 0.3));
  if (t >= 134.54 && t < 136.8) cloud(ctx, Mo.x - 175, Mo.y - 215, 145, 98, C.blue, B(134.54, 0.4), { tail: [125, 70], inside: (c) => treeIcon(c, t) });
  if (t >= 161.18 && t < 163.8) { bubble(ctx, 470, 250, 200, 130, 372, 270, B(161.18, 0.3), '', {}); heart(ctx, 470, 246, 42); if (t >= 162.6) { ctx.save(); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(436, 214); ctx.lineTo(504, 282); ctx.moveTo(504, 214); ctx.lineTo(436, 282); ctx.stroke(); ctx.restore(); } }
}
function islandIcon(ctx, x, y, p) { if (p <= 0) return; ctx.save(); ctx.translate(x, y + 24); ctx.scale(K.ease.back(p), K.ease.back(p)); shape(ctx, [[-90, 20], [-70, -8], [70, -8], [90, 20], [60, 44], [-60, 44]], '#d9a441', { lw: 5, seed: 60 }); shape(ctx, [[-4, -8], [4, -8], [6, -62], [-6, -62]], WOOD, { lw: 4, seed: 61 }); for (const a of [-0.9, -0.3, 0.3, 0.9]) shape(ctx, [[0, -62], [Math.sin(a) * 58, -62 - Math.cos(a) * 14 + 8], [Math.sin(a) * 30, -40]], GREEN, { lw: 3.5, seed: 62 }); ctx.restore(); }
function treeIcon(c, t) { c.fillStyle = C.blue; c.fillRect(-250, -170, 500, 340); shape(c, [[-120, 110], [-90, -20], [-60, -20], [-30, 110]], WOOD, { lw: 5, seed: 63 }); for (const [cx, cy, r] of [[-75, -60, 70], [-130, -30, 46], [-20, -40, 46]]) { c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fillStyle = GREEN; c.fill(); c.lineWidth = 6; c.strokeStyle = C.black; c.stroke(); } heart(c, -70, -45, 34, { lw: 4 }); shape(c, [[-250, 140], [250, 140], [250, 180], [-250, 180]], GREEN, { lw: 5, seed: 64 }); star(c, 70, -50, 22, C.white, t); }

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
    S0 = S; const shake = K.spring(t, 105.98, 4, 9, 7);
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
    k.play('pop', 24.05, { pitch: 1.3, gain: 0.4 }); k.play('pop', 28.3, { pitch: 0.8, gain: 0.5 }); k.play('chime', 29.6, { note: 'E6', gain: 0.35 }); k.play('pop', 31.5, { gain: 0.5 });
    k.play('pop', 37.6, { pitch: 1.2, gain: 0.5 }); k.play('whoosh', 39.8, { dur: 0.5, gain: 0.4 }); k.play('pop', 41.2, { pitch: 0.9, gain: 0.5 });
    k.play('whoosh', 42.8, { dur: 1.2, gain: 0.35 }); k.play('whoosh', 45.5, { dur: 1.2, gain: 0.3 }); k.play('whoosh', 42.6, { dur: 0.35, up: false, gain: 0.3 }); k.play('thud', 42.95, { gain: 0.35 });
    for (let t0 = 54.7; t0 < 60.4; t0 += 0.5) k.play('tick', t0, { gain: 0.45 });
    k.play('stamp', 61.6, { gain: 0.4 }); k.play('pop', 61.7, { pitch: 1.3, gain: 0.5 }); k.play('wrong', 69.5, { gain: 0.5 }); k.play('pop', 75.05, { pitch: 0.8, gain: 0.4 }); k.play('wrong', 76.5, { gain: 0.35 }); k.play('ding', 78.2, { gain: 0.5 });
    k.play('whoosh', 80.8, { dur: 0.9, gain: 0.55 }); k.play('pop', 89.3, { pitch: 1.2, gain: 0.45 }); k.play('whoosh', 97.46, { dur: 0.4, gain: 0.3 }); k.play('thud', 97.96, { gain: 0.45 });
    k.play('thud', 105.98, { gain: 0.5 }); k.play('pop', 112.15, { gain: 0.4 }); k.play('wrong', 113.8, { gain: 0.5 }); k.play('pop', 119.6, { pitch: 0.8, gain: 0.4 });
    k.play('stamp', 122.8, { gain: 0.4 }); k.play('ding', 126.65, { gain: 0.45 }); k.play('pop', 134.6, { pitch: 1.1, gain: 0.4 }); k.play('whoosh', 142.95, { dur: 0.7, gain: 0.35 });
    k.play('whoosh', 150.04, { dur: 0.5, gain: 0.45 }); k.play('thud', 150.44, { gain: 0.3 }); k.play('thud', 151.0, { gain: 0.5 }); k.play('pop', 161.2, { pitch: 1.2, gain: 0.4 });
    k.play('wrong', 166.5, { gain: 0.5 }); k.play('whoosh', 169.3, { dur: 0.8, gain: 0.3 }); k.play('pop', 180.3, { pitch: 0.6, gain: 0.35 }); k.play('stamp', 180.75, { gain: 0.7 }); k.play('chime', 181.0, { note: 'C6', gain: 0.9 });
  },
};
function overlays(ctx, t, cam, S) {
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Monkey and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Turtle', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  if (t >= 42.8 && t < 47.6) { ctx.save(); ctx.globalAlpha = K.env(t, 42.8, 47.6, 0.2, 0.5); S.label(ctx, 'DAYS PASS', 500, 190, K.beat(t, 42.8, 0.4, 'lin'), { align: 'center', size: 70, fill: C.yellow }); ctx.restore(); }
  if (false && t >= 72.2 && t < 76.2) { ctx.save(); ctx.globalAlpha = K.env(t, 72.2, 76.2, 0.1, 0.4); S.counter(ctx, 1, 190, 330, K.beat(t, 72.2, 0.4, 'lin'), { size: 100 }); S.label(ctx, 'heart', 190, 450, K.beat(t, 72.7, 0.3, 'lin'), { align: 'center', size: 44, fill: C.yellow }); ctx.restore(); }
  if (false && t >= 136.8 && t < 140.3) { ctx.save(); ctx.globalAlpha = K.env(t, 136.8, 140.3, 0.1, 0.4); S.arrow(ctx, [640, 360], [330, 360], K.beat(t, 136.9, 0.6, 'out'), { bend: -0.12, width: 26 }); ctx.restore(); }
  if (false && t >= 163.8 && t < 166.8) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 166) / 0.8); const [cx, cy] = toPanel(300, 300, cam); S.emphasis(ctx, cx, cy, 190, K.beat(t, 163.8, 0.45, 'lin'), { word: 'GOTCHA!', wx: 0.8, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 180.7) S.title(ctx, 'THE END', 650, 880, K.beat(t, 180.7, 0.8, 'lin'), { size: 80, align: 'center' });
}
window.SCENE = SCENE;
