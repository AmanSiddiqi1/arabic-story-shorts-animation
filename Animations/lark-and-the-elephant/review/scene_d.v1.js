// ===== the story: the lark and the elephant =====
const WW = 1000, WH = 1230, GR = 900, PIT = [580, 880, 1180], NEST = [420, GR - 12], DUR = 195;
const PERCH_L = [[130, 604], [180, 604], [285, 604]], PERCH_C = [[790, 604], [840, 604], [890, 604]];
function layer1(key, w, h, draw) { return K.cached(key, () => { const c = K.layer(w * 2, h * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }
const skyL = () => layer1('sky', WW, 920, (x) => {
  x.fillStyle = C.blue; x.fillRect(0, 0, WW, 920); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(0, 0, WW, 920);
  for (const [bx, by, br, col] of [[150, 880, 260, '#2a62c9'], [560, 900, 300, '#2457b8'], [940, 880, 250, '#2a62c9']]) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); }
  const r = K.rng(4); for (let i = 0; i < 12; i++) { const cx = 40 + i * 84 + r() * 30, h = 70 + r() * 60, cr = 38 + r() * 14; x.beginPath(); x.arc(cx, GR - h, cr, 0, 7); x.fillStyle = GREEND; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); x.fillStyle = WOOD; x.fillRect(cx - 6, GR - h + cr - 4, 12, h - cr + 6); }
});
const treesL = () => layer1('trees', WW, GR + 10, (x) => {
  const tree = (tx, tw, cans, br) => { shape(x, [[tx, GR + 4], [tx + 8, 480], [tx + tw - 8, 480], [tx + tw, GR + 4]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 }); shape(x, br, WOOD, { lw: 7, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
    for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); } for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); } x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); } };
  tree(26, 74, [[70, 390, 130], [190, 440, 90], [20, 470, 70], [140, 340, 80]], [[90, 612], [310, 598], [310, 628], [90, 644]]);
  tree(922, 74, [[950, 390, 130], [830, 450, 90], [1000, 470, 70], [880, 340, 80]], [[930, 612], [730, 598], [730, 628], [930, 644]]);
});
const pitBackL = () => layer1('pit', WW, WH, (x) => { x.fillStyle = NAVY2; x.fillRect(PIT[0], GR, PIT[1] - PIT[0], PIT[2] - GR); x.fillStyle = dotPat(x, '#274fae', 12, 0.2); x.fillRect(PIT[0], GR, PIT[1] - PIT[0], PIT[2] - GR); });
const groundL = () => layer1('ground', WW, WH, (x) => {
  const g = [[-10, GR], [PIT[0], GR], [PIT[0] - 6, PIT[2]], [PIT[1] + 6, PIT[2]], [PIT[1], GR], [1010, GR], [1010, WH], [-10, WH]];
  shape(x, g, '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  for (const [a, b] of [[-10, PIT[0] - 4], [PIT[1] + 4, 1010]]) { shape(x, [[a, GR - 8], [b, GR - 8], [b, GR + 22], [a, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = a + 10; px < b; px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5); }
  shape(x, [[250, GR + 22], [560, GR + 22], [560, GR + 40], [250, GR + 40]], '#f2d27a', { lw: 5, seed: 22 });
  const pond = ell(215, GR + 4, 92, 20, 28); shape(x, pond, C.blue, { lw: 7, seed: 23, dot: C.white, pitch: 9, rad: 0.15, da: 0.6 }); for (const rx of [118, 130, 305, 316]) { seg(x, rx, GR, rx - 2, GR - 50, 5, GREEND, 2.5); shape(x, ell(rx - 2, GR - 56, 5, 12, 8), '#7a4e12', { lw: 3 }); }
});
function drawSun(ctx, x, y) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } shape(ctx, ell(x, y, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }
// ---------- upgrade (Fable 5.2 direction, review 1): everything outside the approved 20.2-46.5 sequence is restaged so every listener acts ----------
const win = (t, a, b) => t >= a && t < b;
const ss = (t, a, b) => K.ease.inOut(K.clamp((t - a) / (b - a)));
const bz = (u, p0, p1, p2, p3) => { const v = 1 - u; return [v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]]; };
// a flight along a cubic path between two times: position, facing from the velocity, flap rate from speed, glide on descents, bank
function flyBz(t, a, b, p0, p1, p2, p3, dirHold = 1) {
  const U = (tt) => K.ease.inOut(K.clamp((tt - a) / (b - a))), q = bz(U(t), p0, p1, p2, p3), q0 = bz(U(t - 0.04), p0, p1, p2, p3), q1 = bz(U(t + 0.04), p0, p1, p2, p3);
  const vx = (q1[0] - q0[0]) / 0.08, vy = (q1[1] - q0[1]) / 0.08, sp = Math.hypot(vx, vy), dir = Math.abs(vx) > 20 ? Math.sign(vx) : dirHold;
  const P = { x: q[0], y: q[1], dir, fly: t > a && t < b, flap: 0 };
  if (P.fly) { P.flap = vy > 200 && sp < 650 ? 0.3 + 0.08 * Math.sin(t * 9) : Math.sin(t * (15 + Math.min(sp, 700) / 45)); P.rot = K.clamp(vy / 1500, -0.22, 0.22) * dir; if (t > b - 0.25) P.rot = -0.28 * dir * Math.sin(Math.PI * (t - b + 0.25) / 0.25); }
  return P;
}
const hover = (t, mx, my, seed = 0) => [mx + 6 * (Math.sin(t * 1.7 + seed) + 0.6 * Math.sin(t * 2.9 + 1 + seed)), my + 5 * (Math.sin(t * 1.3 + 2 + seed) + 0.5 * Math.sin(t * 3.7 + seed))];

const CAM = [[0, { x: 500, y: 640, zoom: 1.0 }], [3.4, { x: 500, y: 640, zoom: 1.0 }], [4.6, { x: 300, y: 620, zoom: 2.0 }], [5.2, { x: 300, y: 620, zoom: 2.0 }], [6.0, { x: 380, y: 720, zoom: 1.8 }], [7.4, { x: 380, y: 730, zoom: 1.9 }], [12.0, { x: 400, y: 730, zoom: 2.1 }], [19.0, { x: 360, y: 720, zoom: 1.8 }], ...CAM_SEQ,
  [47.3, { x: 600, y: 690, zoom: 1.65 }], [48.6, { x: 690, y: 700, zoom: 2.0 }], [56.8, { x: 690, y: 700, zoom: 2.0 }], [57.9, { x: 560, y: 700, zoom: 1.45 }], [62.6, { x: 560, y: 700, zoom: 1.45 }], [63.3, { x: 690, y: 700, zoom: 1.9 }], [64.4, { x: 690, y: 700, zoom: 1.9 }], [67.0, { x: 540, y: 720, zoom: 1.3 }], [70.5, { x: 520, y: 700, zoom: 1.3 }],
  [73.4, { x: 208, y: 580, zoom: 2.4 }], [83.4, { x: 208, y: 580, zoom: 2.4 }], [85.9, { x: 700, y: 650, zoom: 1.7 }], [94.4, { x: 700, y: 650, zoom: 1.7 }], [97.5, { x: 610, y: 670, zoom: 1.7 }], [102.8, { x: 610, y: 670, zoom: 1.7 }], [104.6, { x: 430, y: 720, zoom: 1.6 }], [106.2, { x: 330, y: 720, zoom: 1.6 }], [112.79, { x: 330, y: 720, zoom: 1.6 }], [112.8, { x: 400, y: 720, zoom: 1.5 }],
  [123.8, { x: 400, y: 720, zoom: 1.5 }], [126.4, { x: 230, y: 770, zoom: 2.2 }], [143.0, { x: 230, y: 770, zoom: 2.2 }], [146.5, { x: 470, y: 760, zoom: 1.2 }], [157.6, { x: 470, y: 760, zoom: 1.2 }], [160.5, { x: 520, y: 790, zoom: 1.5 }], [162.9, { x: 540, y: 800, zoom: 1.5 }], [163.6, { x: 715, y: 1010, zoom: 1.5 }], [165.0, { x: 715, y: 960, zoom: 1.45 }], [167.3, { x: 715, y: 960, zoom: 1.45 }],
  [169.8, { x: 737, y: 906, zoom: 1.9 }], [177.5, { x: 737, y: 906, zoom: 1.9 }], [178.2, { x: 643, y: 791, zoom: 1.4 }], [195, { x: 643, y: 791, zoom: 1.4 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- the elephant: one route that removes the foot over the pit and makes the trap readable ----------
// [t0, t1, x0, x1, steps]: steps 0 = a smooth walk; steps n = a blind grope (the trunk taps ahead, then a short step, n times)
const SEG = [[47.6, 48.4, 520, 470, 0], [99.35, 99.75, 470, 450, 0], [100.85, 101.5, 450, 430, 0],
  [105.9, 110.3, 430, 250, 6], [110.3, 112.8, 250, 150, 3], [112.8, 112.801, 150, 440, 0], [113.3, 115.66, 440, 400, 2], [117.4, 117.8, 400, 412, 0], [119.76, 120.6, 412, 370, 1], [122.5, 128.6, 370, -200, 0],
  [150.6, 152.48, -200, -40, 3], [153.0, 154.6, -40, 60, 2], [157.58, 161.14, 60, 478, 0], [161.98, 162.92, 478, 505, 0], [162.92, 163.6, 505, 715, 0]];
function eX(t) { let x = 520; for (const [a, b, x0, x1, n] of SEG) { if (t < a) break; if (t >= b) { x = x1; continue; } const u = (t - a) / (b - a); if (!n) return K.lerp(x0, x1, a === 162.92 ? u : K.ease.inOut(u)); const v = u * n, k = Math.floor(v), f = v - k; return K.lerp(x0, x1, (k + K.ease.inOut(K.clamp((f - 0.4) / 0.6))) / n); } return x; }
function gropeTap(t) { for (const [a, b, , , n] of SEG) if (n && t >= a && t < b) { const f = ((t - a) / (b - a) * n) % 1; return f < 0.4 ? Math.sin(Math.PI * f / 0.4) : 0; } return 0; }
const FF_E = [...footfalls(eX, 46.6, 129, 26), ...footfalls(eX, 150.6, 161.98, 26)].filter((f) => f.t < 112.7 || f.t > 112.9);
const STRIKES = [[98.62, 0], [99.4, 1], [100.1, 2], [100.9, 0], [101.3, 1]];
const eyeOf = (P) => [P.x + 152 * Math.sign(P.dir || 1), P.y - (236 - (P.drop || 0)) * 0.8];
function graze(t, t0) { const c = ((t - t0) % 3.2 + 3.2) % 3.2, down = c < 1.0 ? ss(c, 0, 0.6) : c < 1.2 ? 1 : 1 - ss(c, 1.2, 1.9);
  return { drop: 4 + 18 * down, trunk: c < 1.2 ? 0.02 : c < 1.9 ? 0.7 * ss(c, 1.2, 1.9) : 0.7 - 0.58 * ss(c, 2.6, 3.2), reach: 0.35 * down + 0.15 * pulse(c, 0.95, 0.2), hbob: c > 1.9 && c < 3.0 ? 2 * Math.sin(t * 12) : 0 }; }
function elephantP(t, inner = false) {
  if (inSeq(t)) return elephantSeq(t);
  if (t < 22.5) return { s: 0.8, dir: 1, eyes: 'open', trunk: 0, y: GR, x: -250 };
  const x = eX(t), v = (eX(t + 0.05) - eX(t - 0.05)) / 0.1, tf = turnFlip(t, [[0, 1], [105.5, -1], [140, 1]], 0.6);
  const P = { s: 0.8, dir: tf.dir, y: GR, x, ph: x / 26, amp: K.clamp(Math.abs(v) / 90), eyes: 'open', trunk: 0.12 + 0.12 * Math.sin(x / 26) * K.clamp(Math.abs(v) / 90), drop: 0, tail: Math.sin(t * 2.1) * 0.2, sq: breathe(t, 3, 0.008), lid: 0.35 };
  const Lk = inner ? null : larkP(t), lookL = () => { P.gaze = Lk ? lookAt(eyeOf(P), [Lk.x, Lk.y - 40]) : [1, 0]; };
  // ---- the appeal (46.5-66): startled, then the act of not caring, then "Yes!" ----
  if (t < 66.0) {
    P.earOff = K.spring(t, 47.3, 0.35, 3, 4) + K.spring(t, 53.4, 0.4, 3, 4) + (t > 62.24 ? K.spring(t, 62.4, 0.45, 3, 4) : 0);
    if (t >= 47.6) { lookL(); P.drop = -6 * pulse(t, 47.6, 0.9); P.lid = t < 48.4 ? 0 : K.lerp(0, 0.5, ss(t, 48.4, 48.9)); }
    if (win(t, 50.4, 50.75)) P.lid = Math.max(P.lid, Math.sin(Math.PI * (t - 50.4) / 0.35));
    if (win(t, 52.0, 52.55)) P.gaze = lookAt(eyeOf(P), [420, 888]);
    P.trunk += 0.4 * pulse(t, 54.5, 0.9);
    if (win(t, 56.0, 60.0)) { P.gaze = [0.75, -0.65]; P.drop = -8 * ss(t, 56.0, 56.6); }
    if (win(t, 60.0, 60.82)) { P.drop = -8 * (1 - ss(t, 60.0, 60.5)); P.lid = 0.3; }
    if (win(t, 60.82, 61.56)) { const u = ss(t, 60.82, 61.4); P.drop = -14 * u; P.sq = 1 + 0.04 * u; P.eyes = 'smug'; P.trunk = 0.12 + 0.5 * u; P.brow = -0.5; }
    if (win(t, 61.56, 62.24)) { const u = ss(t, 61.56, 61.7); P.drop = K.lerp(-14, 6, u); P.reach = 0.7 * pulse(t, 61.56, 0.6); P.trunk = 0.6 - 0.4 * u; P.tongue = t < 62.1; P.eyes = 'smug'; P.brow = -0.5; }
    if (win(t, 62.24, 64.4)) { P.eyes = 'shut'; P.drop = -12 * ss(t, 62.24, 62.6); P.trunk = 0.3; P.gaze = null; P.lid = null; }
    if (win(t, 64.4, 66.0)) { P.drop = -12 * (1 - ss(t, 64.4, 65.2)); P.lid = 0.55; P.gaze = [1, 0.1]; }
  }
  // ---- at ease: he grazes while they plan against him ----
  if (win(t, 66.0, 97.0)) { Object.assign(P, graze(t, 66.0)); P.lid = 0.3; P.gaze = [1, 0.4]; P.earOff = 0.15 * Math.max(0, Math.sin(t * 0.9)) * Math.sin(t * 9);
    for (const up of [71.4, 84.4]) if (win(t, up, up + 0.8)) { const k = pulse(t, up, 0.8); P.drop = K.lerp(P.drop, -4, k); P.trunk = K.lerp(P.trunk, 0.3, k); lookL(); P.lid = 0.45; }
    if (win(t, 91.3, 91.8)) P.lid = Math.max(P.lid, Math.sin(Math.PI * (t - 91.3) / 0.5)); }
  // ---- the attack: contempt, then panic, then blind ----
  if (win(t, 97.0, 102.8)) {
    P.drop = 4 * (1 - ss(t, 97.0, 97.4)); P.trunk = 0.15; P.earOff = K.spring(t, 97.2, 0.35, 3, 4);
    if (t >= 97.5) { P.gaze = [0.35, -0.94]; P.lid = 0.5; }
    if (win(t, 98.0, 98.55)) { const k = pulse(t, 98.0, 0.55); P.trunk = 0.15 + 0.85 * k; P.reach = 0.6 * k; }
    for (const [ts] of STRIKES) if (t >= ts && t < ts + 0.8) { P.drop -= 12 * K.spring(t, ts, 1, 4, 6); P.earUp = (P.earUp || 0) + 0.5 * pulse(t, ts, 0.5); if (t < ts + 0.35) P.lid = 1; }
    if (t >= 98.62) { P.gaze = null; if (P.lid < 1) P.lid = 0.15; P.eyes = 'wide'; P.lid = null; for (const [ts] of STRIKES) if (t >= ts && t < ts + 0.35) { P.eyes = 'shut'; } }
    if (win(t, 99.4, 100.1)) P.trunk = 0.5 + 0.4 * Math.sin(t * 9);
    if (win(t, 100.1, 100.85)) P.rot = 0.08 * Math.sin((t - 100.1) * 18) * (1 - (t - 100.1) / 0.75);
    if (win(t, 100.9, 101.8)) { P.tongue = true; P.drop = -14 * pulse(t, 100.9, 0.9); P.trunk = 0.8; }
    if (t >= 101.2) { P.eyes = 'x'; P.lid = null; }
    for (const ls of [102.0, 102.45]) if (win(t, ls, ls + 0.4)) { const k = pulse(t, ls, 0.4); P.trunk = 0.15 + 0.85 * k; P.reach = 0.9 * k; }
    if (t >= 102.45) P.earUp = 0.4;
  }
  // ---- blind: groping, the near misses, the long walk, the sounds ----
  if (t >= 102.8) { P.eyes = t < 103.5 ? 'x' : 'shut'; P.lid = null; P.gaze = null; P.brow = t < 103.5 ? 0 : -0.6; }
  if (win(t, 102.8, 105.9)) { P.earUp = 0.4; P.reach = 0.6 * pulse(t, 102.95, 0.6) + 0.6 * pulse(t, 103.8, 0.6); P.trunk = 0.3 + 0.2 * Math.sin(t * 3); P.rot = 0.02 * Math.sin(t * 2.4); P.lift = 30 * pulse(t, 104.3, 0.6); }
  if (win(t, 105.9, 112.8)) { const g = gropeTap(t); P.drop = K.lerp(10, 16, ss(t, 105.9, 112)); P.earUp = 0.3; P.trunk = 0.02; P.reach = 0.25 + 0.45 * g; P.rot = 0.015 * Math.sin(t * 1.6);
    if (win(t, 108.94, 109.6)) { const k = pulse(t, 108.94, 0.66); P.trunk = K.lerp(0.02, 1, k); P.reach = K.lerp(P.reach, 0.3, k); P.drop = K.lerp(P.drop, -4, k); }
    if (win(t, 109.6, 110.3)) { const k = pulse(t, 109.6, 0.7); P.reach = K.lerp(P.reach, 0.8, k); P.drop = K.lerp(P.drop, 18, k); } }
  if (win(t, 112.8, 128.6)) { P.drop = 16; P.earUp = -0.3; P.trunk = 0; P.reach = 0.15 + 0.3 * gropeTap(t); P.tongue = t >= 114.98; P.flapEar = 0.15;
    if (win(t, 115.66, 117.2)) { P.tip = 0.03 * Math.sin((t - 115.66) * 2.2); P.sq = 0.96; }
    if (t >= 117.2) { P.earOff = K.spring(t, 117.2, -0.45, 2.5, 3) + K.spring(t, 119.2, -0.35, 3, 4); }
    if (win(t, 118.4, 119.76)) { const k = ss(t, 118.4, 118.7) * (1 - ss(t, 119.4, 119.76)); P.earUp = K.lerp(-0.3, 0.5, k); P.drop = K.lerp(16, -8, k); P.trunk = 0.6 * k; P.reach = 0.2 * k + 0.2 * k * pulse(t, 118.9, 0.3); }
    if (win(t, 120.6, 122.8)) { const k = ss(t, 120.6, 121.0); P.trunk = k; P.reach = 0.2 + 0.15 * Math.sin(t * 8) * k; P.drop = K.lerp(16, -6, k); P.earUp = 0.3; }
    if (t >= 122.8) { P.trunk = Math.max(0, 0.6 * Math.exp(-(t - 122.8) * 3) * Math.cos((t - 122.8) * 9)); P.drop = 14; } }
  // ---- the trap: he hears the frogs from far away, walks past the silent real pond, and reaches for water that is not there ----
  if (win(t, 150.6, 157.58)) { P.drop = 14; P.earUp = -0.2; P.tongue = true; P.trunk = 0.02; P.reach = 0.2 + 0.4 * gropeTap(t);
    if (t >= 152.48) { P.earUp = settleTo(t, 152.48, -0.2, 0.8, 0.3, 0.25); }
    if (win(t, 152.48, 153.0)) { P.lift = 40; P.drop = K.lerp(14, -4, ss(t, 152.6, 152.9)); }
    if (t >= 153.0) P.drop = -4;
    if (t >= 154.74) { P.trunk = 0.5; P.reach = 0.5 * pulse(t, 155.0, 0.35) + 0.5 * pulse(t, 155.5, 0.35); P.earOff = K.spring(t, 155.9, 0.4, 3, 4) + K.spring(t, 156.3, 0.4, 3, 4); P.hbob = -3 * pulse(t, 156.8, 0.3); } }
  if (win(t, 157.58, 161.98)) { P.drop = -6; P.trunk = 0.45; P.reach = 0.5; P.earUp = 0.4; P.tongue = false; P.flapEar = 0.6;
    if (t >= 161.14) { const k = ss(t, 161.14, 161.5); P.drop = K.lerp(-6, 30, k); P.trunk = K.lerp(0.45, 0, k); P.reach = K.lerp(0.5, 0.8 + 0.2 * Math.sin(t * 7), k); P.tip = 0.08 * k; } }
  if (win(t, 161.98, 162.92)) { P.drop = 20; P.trunk = 0; P.reach = 0.9; P.tip = 0.08; P.lift = 60 * pulse(t, 161.98, 0.5); P.rot = 0.22 * ss(t, 162.25, 162.5) + (t > 162.5 ? 0.02 * Math.sin(t * 20) : 0);
    if (t >= 162.25) { P.earUp = 0.9; P.trunk = 1; P.reach = 0.2; P.tail = -0.6; P.drop = 0; P.amp = 0.8; P.ph = (t - 162.25) * 20; } }
  if (win(t, 162.92, 163.6)) { const u = (t - 162.92) / 0.68; P.y = fallY(t, 162.92, 163.6, GR, GR + 276); P.rot = K.lerp(0.22, 0.1, u) + 0.28 * Math.sin(Math.PI * u); P.sq = 1.07; P.earUp = 0.9; P.trunk = 1; P.reach = 0.1; P.tail = -0.6; P.amp = 0; P.tip = 0; }
  if (t >= 163.6) { P.y = GR + 276 - rebound(t, 163.6, 10, 0.22); P.amp = 0; P.tip = 0; P.sq = impactSquash(t, 163.6, 0.8) * breathe(t, 3, 0.008); P.rot = K.lerp(0.1, -0.06, ss(t, 163.65, 164.3)); P.drop = settleTo(t, 163.65, 0, 16, 0.5); P.trunk = 0.1; P.earUp = settleTo(t, 163.6, 0.9, -0.1, 0.5);
    // two failed climbs, the second weaker
    if (win(t, 165.0, 165.95)) { const up = ss(t, 165.0, 165.4) * (1 - ss(t, 165.6, 165.9)); P.rot = K.lerp(-0.06, -0.16, up); P.lift = 100 * up; P.trunk = K.lerp(0.1, 0.75, up); P.drop = K.lerp(16, -6, up); P.sq *= 1 - 0.04 * pulse(t, 165.9, 0.2); }
    if (win(t, 165.95, 166.6)) { const up = ss(t, 165.95, 166.2) * (1 - ss(t, 166.25, 166.5)); P.rot = K.lerp(-0.06, -0.1, up); P.lift = 70 * up; P.trunk = K.lerp(0.1, 0.55, up); P.drop = K.lerp(16, 0, up); P.sq *= 1 - 0.03 * pulse(t, 166.5, 0.2); }
    if (t >= 166.6) { P.drop = 18; P.earUp = -0.3; P.trunk = 0; P.reach = 0; P.sq *= 1 - 0.03 * pulse(t, 166.7, 1.0); }
    // the reckoning: he lifts his face to her voice, hears every friend, and sinks on "your pride"
    if (t >= 169.44) { const k = ss(t, 169.6, 170.2); P.drop = K.lerp(18, -10, k); P.earUp = K.lerp(-0.3, 0.4, k); P.earOff = K.spring(t, 170.5, 0.4, 3, 4) + K.spring(t, 179.5, -0.35, 3, 4) + K.spring(t, 179.75, 0.35, 3, 4) + K.spring(t, 180.0, -0.3, 3, 4); P.trunk = 0.1 + 0.6 * pulse(t, 170.5, 1.6); }
    if (t >= 174.4) P.drop = K.lerp(-10, -2, ss(t, 174.4, 175.2));
    if (win(t, 179.5, 182.06)) P.rot = -0.06 + 0.03 * (t < 179.75 ? -1 : t < 180.0 ? 1 : -1) * ss(t, 179.5, 179.6);
    if (t >= 183.92) { const k = ss(t, 183.92, 184.72); P.drop = K.lerp(-2, 22, k); P.earUp = K.lerp(0.4, -0.45, k); P.trunk = 0.45 * k; P.sq *= 1 - 0.03 * pulse(t, 184.1, 1.2); P.flapEar = 0; }
  }
  return P;
}

// ---------- the lark ----------
// the approved film's feeding loop, needed exactly for 20.2-20.3 (the first frames of the approved sequence)
function shuttle(t) { const u = ((t - 15.5) % 1.5) / 1.5, out = [300, 780], home = [420, 848], a = u < 0.5 ? K.ease.inOut(u / 0.5) : K.ease.inOut((u - 0.5) / 0.5);
  return u < 0.5 ? { x: K.lerp(home[0], out[0], a), y: K.lerp(home[1], out[1], a) - 40 * Math.sin(Math.PI * a), dir: -1 } : { x: K.lerp(out[0], home[0], a), y: K.lerp(out[1], home[1], a) - 40 * Math.sin(Math.PI * a), dir: 1, carry: true, arrive: u > 0.5 && u < 0.62 }; }
const rimY = (nb) => 870 - 19 * nb;
const nbAt = (t) => 0.3 + 0.35 * K.clamp((t - 8.8) / 0.15) + 0.35 * K.clamp((t - 9.9) / 0.15);
function larkP(t) {
  if (t >= 38.2 && t < SEQ_B) return larkSeq(t);
  const P = { s: 0.85, dir: 1, kind: 'lark', eyes: 'open', fly: false, flap: 0 };
  if (inSeq(t) && t < 20.3) { const S = shuttle(t); P.x = S.x; P.y = S.y; P.dir = S.dir; P.fly = true; P.flap = Math.sin(t * 20); return P; }
  if (inSeq(t)) { // 20.3-38.2: exactly as approved
    let x, y; const fly = () => { P.fly = true; P.flap = Math.sin(t * 20); };
    const wp = (keys) => { const xs = keys.map(([a, b]) => [a, b]), ys = keys.map(([a, , c]) => [a, c]); x = kfn(t, xs); y = kfn(t, ys); const d = Math.hypot(kfn(t + 0.05, xs) - kfn(t - 0.05, xs), kfn(t + 0.05, ys) - kfn(t - 0.05, ys)); if (d > 0.4) fly(); P.dir = (kfn(t + 0.1, xs) - kfn(t - 0.1, xs)) >= 0 ? 1 : -1; };
    wp([[20.2, 430, 830], [21.8, -120, 480], [38.0, -120, 480]]); P.x = x; P.y = y; return P;
  }
  const at = (x, y, dir) => { P.x = x; P.y = y; P.dir = dir; }, use = (F) => Object.assign(P, F);
  const E = () => elephantP(t, true), eyeL = () => [P.x + 32 * 0.85 * P.dir, P.y - 64 * 0.85], gazeTo = (p) => { P.gaze = lookAt(eyeL(), p); };
  // ---- 0-20.2: a home worth losing ----
  if (t < 20.2) {
    const R = rimY(nbAt(t));
    if (t < 3.3) use(flyBz(t, 0, 3.3, [-80, 520], [60, 470], [200, 540], [285, 604], 1));
    else if (t < 6.55) { at(285, 604, 1); P.sq = landSquash(t, 3.3) * anticipate(t, 6.3, 0.25, 0.15); P.gaze = gazePlan(t, [[3.3, [0, 0]], [3.6, [-1, -0.2]], [4.2, [1, -0.1]], [4.98, [0.4, 0.9]]]); P.headRot = 0.3 * ss(t, 4.98, 5.3); }
    else if (t < 7.1) use(flyBz(t, 6.55, 7.1, [285, 604], [320, 600], [380, 820], [392, 892], 1));
    else if (t < 7.4) { at(392, 892, 1); P.sq = landSquash(t, 7.1); P.gaze = [0.6, 0.6]; }
    else if (t < 7.85) use(flyBz(t, 7.4, 7.85, [392, 892], [370, 830], [320, 830], [300, 892], -1));
    else if (t < 8.25) { at(300, 892, -1); P.drop = 10 * pulse(t, 7.9, 0.3); P.carry = t > 8.0; }
    else if (t < 8.7) { use(flyBz(t, 8.25, 8.7, [300, 892], [320, 800], [345, 800], [360, R], 1)); P.carry = true; }
    else if (t < 8.95) { at(360, R, 1); P.drop = 10 * pulse(t, 8.7, 0.22); P.headRot = 0.4 * pulse(t, 8.7, 0.22); P.carry = t < 8.8; }
    else if (t < 9.3) use(flyBz(t, 8.95, 9.3, [360, R], [340, 820], [310, 830], [296, 892], -1));
    else if (t < 9.55) { at(296, 892, -1); P.drop = 10 * pulse(t, 9.33, 0.25); P.carry = t > 9.42; }
    else if (t < 9.85) { use(flyBz(t, 9.55, 9.85, [296, 892], [315, 810], [345, 805], [360, R], 1)); P.carry = true; }
    else if (t < 10.05) { at(360, R, 1); P.drop = 10 * pulse(t, 9.85, 0.2); P.headRot = 0.4 * pulse(t, 9.85, 0.2); P.carry = t < 9.9; }
    else if (t < 10.35) { const [hx, hy] = hop(t, 10.05, 0.3, 360, 420, 26); at(hx, K.lerp(R, 848, ss(t, 10.05, 10.35)) - hy, 1); }
    else if (t < 11.66) { at(420, 848, 1); P.sq = 0.9; P.rot = win(t, 10.4, 10.9) ? 0.06 * Math.sin(t * 14) : 0; P.lid = t > 10.9 ? 0.6 : null; }
    else if (t < 11.95) { const [hx, hy] = hop(t, 11.66, 0.29, 420, 372, 24); at(hx, K.lerp(848, R, ss(t, 11.66, 11.95)) - hy, 1); P.sq = K.lerp(0.9, 1, ss(t, 11.66, 11.75)); }
    else if (t < 17.8) { at(372, R, 1); P.sq = landSquash(t, 11.95); P.gaze = [0.7, 0.7]; P.headRot = 0.3 * ss(t, 11.95, 12.2);
      if (win(t, 13.95, 14.3)) { const [hx, hy] = hop(t, 13.95, 0.35, 372, 356, 18); P.x = hx; P.y = R - hy; P.eyes = 'wide'; P.headRot = 0; }
      if (win(t, 14.3, 15.6)) { P.x = 356 + 16 * ss(t, 14.3, 14.6); P.tip = 0.12 * ss(t, 14.4, 14.7); P.headRot = 0.2; }
      if (t >= 15.6) { P.headRot = 0.25 + 0.3 * (pulse(t, 16.0, 0.3) + pulse(t, 16.5, 0.3)); P.drop = 8 * (pulse(t, 16.0, 0.3) + pulse(t, 16.5, 0.3)); } }
    else if (t < 18.0) use(flyBz(t, 17.8, 18.0, [372, R], [360, 840], [335, 850], [322, 892], -1));
    else if (t < 18.1) { at(322, 892, -1); P.drop = 10 * pulse(t, 18.0, 0.1); P.worm = t > 18.05; }
    else if (t < 18.3) { use(flyBz(t, 18.1, 18.3, [322, 892], [335, 830], [360, 830], [372, R], 1)); P.worm = true; }
    else if (t < 19.02) { at(372, R, 1); P.sq = landSquash(t, 18.3); P.headRot = 0.35 * ss(t, 18.35, 18.5) * (1 - ss(t, 18.8, 19.0)); P.drop = 6 * pulse(t, 18.35, 0.5); P.worm = t < 18.6; P.feed = win(t, 18.35, 18.8); P.gaze = [0.7, 0.7]; }
    else if (t < 19.25) { const [hx, hy] = hop(t, 19.02, 0.23, 372, 465, 22); at(hx, R - hy, t < 19.2 ? 1 : -1); }
    else if (t < 19.95) { at(465, R, -1); P.sq = landSquash(t, 19.25) * anticipate(t, 19.85, 0.1, 0.12); P.sag = 0.5 * ss(t, 19.3, 19.6); P.gaze = [-0.6, 0.8]; if (win(t, 19.4, 19.8)) P.lid = Math.sin(Math.PI * (t - 19.4) / 0.4); }
    else { const S = shuttle(20.2), u = K.ease.out(K.clamp((t - 19.95) / 0.25)); at(K.lerp(465, S.x, u), K.lerp(R, S.y, u) - 14 * Math.sin(Math.PI * u), -1); P.fly = true; P.flap = Math.sin(t * 20); }
    return P;
  }
  // ---- 46.5-70.8: the appeal ----
  if (t < 70.8) {
    const MK = [770, 712];
    if (t < 48.6) { use(flyBz(t, 46.5, 48.6, [385, 878], [430, 560], [830, 520], MK, 1)); if (t > 48.2) { P.dir = -1; } }
    else {
      let mx = MK[0], my = MK[1];
      if (t >= 61.56) { const u = K.ease.out(K.clamp((t - 61.56) / 0.6)); mx = K.lerp(770, 850, u); my = K.lerp(712, 700, u); }
      if (t >= 63.0) { const u = ss(t, 63.0, 63.35); mx = K.lerp(850, 700, u); my = K.lerp(700, 705, u); }
      if (t >= 67.3) { const u = ss(t, 67.3, 69.6); mx = K.lerp(700, 760, u); my = K.lerp(705, 645, u); }
      const [hx, hy] = hover(t, mx, my); at(hx, hy, -1); P.fly = true; P.flap = Math.sin(t * 17);
      if (win(t, 49.98, 59.6)) P.beak = talk(t, [[49.98, 51.3], [51.32, 52.5], [52.64, 54.1], [54.12, 56.1], [56.16, 59.6]], 0);
      if (win(t, 49.98, 51.32)) { P.rot = -0.15 * ss(t, 49.98, 50.2); P.brow = 1; P.crest = -0.8; P.x -= 10 * pulse(t, 49.98, 0.3); }
      if (win(t, 51.32, 52.46)) { P.sag = -0.9 * pulse(t, 51.32, 1.1); P.headRot = -0.45 * pulse(t, 51.32, 0.75); gazeTo([420, 888]); P.brow = 0.8; }
      if (win(t, 52.64, 54.12)) { P.wet = true; P.y += 15 * pulse(t, 52.7, 0.9); P.flap = Math.sin(t * 11); P.crest = 0.5; P.brow = 0.4; }
      if (win(t, 54.12, 59.6)) { P.sq = 1.05; P.crest = -0.4; P.brow = 0.6; P.wet = t < 55.0; }
      if (win(t, 48.6, 61.56) && !P.gaze) { const e = E(); P.gaze = lookAt(eyeL(), eyeOf(e)); }
      if (win(t, 61.56, 62.2)) { P.rot = -2 * Math.PI * K.ease.inOut(K.clamp((t - 61.56) / 0.55)); P.crest = -1; P.eyes = 'wide'; P.flap = Math.sin(t * 30); }
      if (win(t, 62.2, 63.0)) { P.crest = -0.6; P.eyes = 'open'; const e = E(); P.gaze = lookAt(eyeL(), eyeOf(e)); }
      if (win(t, 63.0, 64.4)) { P.brow = 1; P.crest = -1; P.sq = 1.08; P.x += tremble(t, 2, 9); P.flap = Math.sin(t * 26); const e = E(); P.gaze = lookAt(eyeL(), eyeOf(e)); }
      if (win(t, 64.4, 67.3)) { P.brow = K.lerp(1, 0.4, ss(t, 64.4, 66.6)); P.crest = -0.6; P.sq = 1.06; P.gaze = lookAt(eyeL(), gazePlan(t, [[64.4, [592, 729]], [64.95, [520, 760]], [65.5, [562, 860]], [66.05, [562, 895]]], 0.18)); }
      if (win(t, 67.3, 69.6)) { const u = ss(t, 67.3, 68.6); P.sq = K.lerp(1.06, 1, u); P.crest = K.lerp(-0.6, 0.4, u); P.brow = K.lerp(0.4, 0, u); P.gaze = [-0.3, 0.8]; P.flap = Math.sin(t * 13); }
      if (t >= 69.6) { P.crest = 0.4; P.gaze = t < 70.0 ? [1, -0.2] : t < 70.2 ? [-1, 0] : lookAt(eyeL(), [110, 600]); }
    }
    return P;
  }
  // ---- 70.8-83.9: the three birds ----
  if (t < 83.9) {
    if (t < 73.2) use(flyBz(t, 70.8, 73.2, [760, 645], [620, 500], [380, 500], [304, 604], -1));
    else { at(304, 604, -1); P.sq = landSquash(t, 73.2) * anticipate(t, 83.7, 0.2, 0.15);
      if (win(t, 73.8, 75.8)) { P.beak = talk(t, [[73.8, 75.8]], 0); P.sag = -0.5 * pulse(t, 73.9, 1.2); P.headRot = 0.3 * ss(t, 74.6, 75.0); P.crest = 1 * ss(t, 74.6, 75.0); P.wet = t > 74.8; P.gaze = [0.5, 0.8]; }
      if (win(t, 75.8, 81.04)) { P.crest = 0.6; P.headRot = 0.15; P.gaze = lookAt(eyeL(), [172, 560]); P.wet = t < 77; }
      if (win(t, 81.04, 83.26)) { P.drop = 6; P.headRot = 0.25; P.crest = 0.6; P.gaze = gazePlan(t, [[81.04, [-0.3, 0.6]], [81.3, [0.6, 0.8]], [81.8, [1, -0.3]], [82.3, [-0.5, 0.8]], [82.8, [0, 0.9]]], 0.07); }
      if (t >= 83.26) { P.crest = settleTo(t, 83.26, 0.6, -0.8, 0.3, 0.25); P.brow = 1; P.lid = 0.25; P.gaze = [1, 0]; } }
    return P;
  }
  // ---- 83.9-123.8: the crows, the attack, the long blind walk (she watches from the crows' branch) ----
  if (t < 123.8) {
    if (t < 85.9) use(flyBz(t, 83.9, 85.9, [304, 604], [380, 470], [650, 470], [742, 604], 1));
    else { const sx = t < 89.2 ? 742 : K.lerp(742, 752, ss(t, 89.2, 89.45)); at(sx, 604 - (win(t, 89.2, 89.45) ? 10 * Math.sin(Math.PI * (t - 89.2) / 0.25) : 0), 1); P.sq = landSquash(t, 85.9);
      const e = E(), eh = [e.x + 122 * Math.sign(e.dir), e.y - 171 + (e.drop || 0) * 0.8];
      P.gaze = lookAt(eyeL(), [800, 560]);
      if (win(t, 86.92, 94.48)) P.beak = talk(t, [[86.92, 90.3], [90.38, 92.2], [92.24, 94.48]], 0);
      if (win(t, 86.92, 90.38)) { P.drop = 6; P.headRot = -0.15; }
      if (win(t, 90.38, 90.95)) { const k = pulse(t, 90.4, 0.22) + pulse(t, 90.64, 0.22); P.drop = 10 * k; P.headRot = 0.25 * k; P.beak = 0.3; }
      if (win(t, 91.0, 92.24)) { P.headRot = 0.55; P.sag = -0.6; P.gaze = lookAt(eyeL(), eh); }
      if (win(t, 92.24, 93.1)) { P.lid = 1; P.headRot = 0.25 * Math.sin((t - 92.24) * 8); }
      if (win(t, 94.48, 102.8)) { P.brow = 0.6; P.gaze = lookAt(eyeL(), eh); }
      if (t >= 102.8) { P.brow = 0.3; P.gaze = lookAt(eyeL(), t < 122.9 ? eh : [215, 895]); if (win(t, 103.6, 104.1)) P.lid = Math.sin(Math.PI * (t - 103.6) / 0.5); P.sag = -0.5 * pulse(t, 119.2, 0.3); } }
    return P;
  }
  // ---- 123.8-145.9: the frogs ----
  if (t < 145.9) {
    if (t < 126.6) use(flyBz(t, 123.8, 126.6, [752, 604], [650, 520], [420, 700], [345, 898], -1));
    else { at(345, 898, -1); P.sq = landSquash(t, 126.6); P.gaze = t < 128.8 ? [-1, 0] : lookAt(eyeL(), [212, 850]);
      if (win(t, 132.5, 145.38)) P.beak = talk(t, [[132.5, 135.4], [135.42, 137.7], [137.84, 139.6], [139.68, 142.3], [142.4, 145.38]], 0);
      if (win(t, 132.5, 133.4)) { P.drop = 8 * pulse(t, 132.5, 0.9); P.headRot = 0.3 * pulse(t, 132.5, 0.9); }
      if (win(t, 135.42, 136.3)) { P.sag = -0.8 * pulse(t, 135.42, 0.88); P.headRot = -0.2; P.gaze = [1, -0.1]; }
      if (win(t, 136.3, 137.3)) { const k = pulse(t, 136.3, 1.0); P.tip = 0.15 * k; P.headRot = 0.6 * k; P.gaze = [0.2, 1]; }
      if (win(t, 137.84, 139.68)) P.sq = K.lerp(1, 0.85, ss(t, 137.84, 138.1)) + 0.15 * ss(t, 139.4, 139.68);
      if (win(t, 141.4, 142.0)) { P.headRot = -0.45 * ss(t, 141.4, 141.8); P.beak = t > 141.8 ? 1.2 : P.beak; }
      if (win(t, 142.0, 142.8)) { P.headRot = 0; P.beak = 0; P.gaze = [-1, 0]; P.eyes = 'wide'; }
      if (win(t, 145.3, 145.9)) { P.drop = 12 * pulse(t, 145.3, 0.45); P.headRot = 0.4 * pulse(t, 145.3, 0.45) - 0.2 * pulse(t, 145.75, 0.15); P.gaze = t < 145.7 ? [-0.3, 1] : [1, 0]; } }
    return P;
  }
  // ---- 145.9-167.3: back on the left branch, watching the trap ----
  if (t < 167.3) {
    if (t < 146.1) { at(345, 898, -1); P.sq = anticipate(t, 145.9, 0.2, 0.15); }
    else if (t < 148.2) use(flyBz(t, 146.1, 148.2, [345, 898], [360, 760], [330, 600], [285, 604], -1));
    else { at(285, 604, -1); P.sq = landSquash(t, 148.2); const e = E(); P.gaze = t < 152.4 ? [-1, 0.25] : lookAt(eyeL(), eyeOf(e)); if (t >= 163.6) P.gaze = lookAt(eyeL(), [715, 1050]); }
    return P;
  }
  // ---- 167.3-195: the reckoning and the ending ----
  if (t < 169.44) { use(flyBz(t, 167.3, 169.44, [285, 604], [450, 440], [820, 500], [895, GR], 1)); return P; }
  { const sx = t < 169.9 ? 895 : K.lerp(895, 885, ss(t, 169.9, 170.1)); at(sx, GR - (win(t, 169.9, 170.1) ? 10 * Math.sin(Math.PI * (t - 169.9) / 0.2) : 0), t < 169.6 ? 1 : -1); P.sq = landSquash(t, 169.44);
    const e = E(), eh = [e.x + 122, e.y - 171 + (e.drop || 0) * 0.8]; P.gaze = lookAt(eyeL(), eh);
    if (win(t, 170.16, 184.72)) P.beak = talk(t, [[170.16, 174.3], [174.4, 177.4], [177.54, 180.7], [180.76, 184.72]], 0);
    if (win(t, 172.2, 174.4)) { const k = ss(t, 172.2, 172.6) * (1 - ss(t, 174.0, 174.4)); P.tip = 0.15 * k; P.headRot = 0.3 * k; P.brow = 0.3; }
    if (win(t, 178.46, 179.6)) { P.sag = -0.8 * pulse(t, 178.46, 1.1); P.gaze = [-1, 0]; }
    if (win(t, 184.4, 185.4)) P.gaze = [-0.3, -0.2];
    if (win(t, 185.4, 186.3)) { P.gaze = lookAt(eyeL(), [545, 860]); P.drop = 6 * pulse(t, 185.4, 0.4); }
    if (win(t, 186.3, 187.2)) { P.gaze = lookAt(eyeL(), [375, 860]); P.drop = 6 * pulse(t, 186.3, 0.4); }
    if (win(t, 187.2, 188.52)) { P.gaze = lookAt(eyeL(), [840, 560]); P.drop = 6 * pulse(t, 187.2, 0.4); P.headRot = -0.3; }
    if (win(t, 190.22, 190.8)) P.sag = -0.5 * pulse(t, 190.22, 0.55);
    if (t >= 191.3) P.gaze = [-0.4, 0.9];
    if (t >= 192.9) { P.gaze = [-1, -0.1]; P.crest = 0.6 * ss(t, 192.9, 193.4); if (win(t, 193.4, 194.1)) P.lid = Math.sin(Math.PI * (t - 193.4) / 0.7); } }
  return P;
}

// ---------- the three birds (three personalities: yellow soft, red hot, blue timid), the crows, the frogs ----------
const PF = [86, 150, 214], PF2 = [66, 120, 174], FK = ['y', 'r', 'b'], LAND_F = [330, 375, 420];
function friendP(t, i) {
  if (t < 66.0) return null;
  const P = { s: 0.7, dir: 1, kind: FK[i], x: PF[i], y: 604, seed: 11 + i * 7 }, L = larkP(t), E = elephantP(t), hd = () => [P.x + 32 * 0.7 * P.dir, P.y - 64 * 0.7], gazeTo = (p) => { P.gaze = lookAt(hd(), p); };
  const ta = 66.0 + i * 0.35, tl = 67.6 + i * 0.35;
  if (t < tl) { Object.assign(P, flyBz(t, ta, tl, [-60, 520 - i * 20], [20, 470], [PF[i] - 60, 540], [PF[i], 604], 1)); P.s = 0.7; P.kind = FK[i]; return P; }
  P.sq = landSquash(t, tl);
  if (t >= 120.3 + i * 0.12) { const [hx, hy] = hop(t, 120.3 + i * 0.12, 0.25, PF[i], PF2[i], 12); P.x = hx; P.y = 604 - hy; }
  gazeTo(win(t, 70.8, 167.3) && Math.abs(L.x - P.x) < 400 ? [L.x, L.y - 40] : eyeOf(E));
  if (win(t, 73.8, 75.8)) {
    if (i === 0) { P.eyes = t < 74.9 && t > 74.3 ? 'wide' : 'open'; if (t >= 74.9) { P.lid = 0.4; P.drop = 4; } }
    if (i === 1) { P.brow = t > 74.6 ? 1 : 0; P.sq = t > 74.6 ? 1.08 : 1; if (t >= 75.2) { const [hx, hy] = hop(t, 75.2, 0.25, PF[1], PF[1] + 12, 10); P.x = hx; P.y = 604 - hy; } }
    if (i === 2) { P.sq = 0.9; P.drop = 4; P.gaze = [0.8, 0.3]; } }
  if (i === 1 && win(t, 75.45, 78.8)) { P.x = PF[1] + 12; P.brow = 1; P.sq = 1.08; }
  if (win(t, 75.76, 81.04)) P.beak = talk(t, [[75.76, 79.3]], i * 1.7) * (i === 2 ? 0.6 : 1);
  if (win(t, 76.0, 76.9)) P.gaze = [i === 0 ? 1 : -1, 0];
  if (win(t, 78.64 + i * 0.1, 79.3)) { P.gaze = [0.6, 0.8]; if (i === 0) { P.sag = -0.7 * pulse(t, 78.9, 0.5); if (t > 78.95) P.gaze = [-0.5, 0.3]; } if (i === 1) { P.sq = K.lerp(1.08, 1, ss(t, 78.8, 79.1)); P.brow = 0.3; } if (i === 2) P.shake = 3 * Math.sin(t * 30) * pulse(t, 78.8, 0.6); }
  if (win(t, 79.3, 83.9)) { gazeTo([L.x, L.y - 40]); P.headRot = -[0.12, 0.18, 0.24][i]; }
  if (win(t, 83.26, 84.2)) P.tip = 0.08 * pulse(t, 83.26, 0.94);
  if (win(t, 108.94 + i * 0.1, 109.9)) { P.tip = -0.12 * ss(t, 108.94 + i * 0.1, 109.1 + i * 0.1); P.eyes = 'wide'; }
  if (i === 1 && win(t, 118.4, 118.7)) P.beak = 1;
  if (win(t, 120.6, 122.8)) { P.eyes = 'wide'; if (i === 1) P.tip = -0.12; }
  if (win(t, 149.8, 152.4)) P.gaze = [-1, 0.2];
  // ending: fly down to the ground on "my friends", land one after another
  const tf = 178.46 + i * 0.2, tg = tf + 0.45 + i * 0.1;
  if (t >= tf) { if (t < tg) { Object.assign(P, flyBz(t, tf, tg, [PF2[i], 604], [PF2[i] + 80, 520], [LAND_F[i] - 60, 760], [LAND_F[i], GR], 1)); P.s = 0.7; P.kind = FK[i]; return P; }
    P.x = LAND_F[i]; P.y = GR; P.dir = 1; P.sq = landSquash(t, tg); gazeTo(eyeOf(E));
    if (win(t, 186.5, 187.2)) P.y -= 8 * pulse(t, 186.5 + i * 0.08, 0.3);
    if (win(t, 190.22, 191.3)) { const k = pulse(t, 190.22 + i * 0.1, 0.55); P.y -= 34 * k; if (k > 0) { P.fly = true; P.flap = Math.sin(t * 22); } }
    if (t >= 191.3) P.gaze = [0.8, 0.6]; }
  return P;
}
function crowCircle(t, i) { const a = (t - 96.5) * 2.2 + i * 2.1; return [650 + 160 * Math.cos(a), 450 + 80 * Math.sin(a)]; }
function crowP(t, i) {
  const P = { s: 0.75, dir: -1, kind: 'crow', x: PERCH_C[i][0], y: PERCH_C[i][1] };
  if (t < SEQ_B) return P;
  P.seed = 31 + i * 5; const L = larkP(t), E = elephantP(t), hd = () => [P.x + 32 * 0.75 * P.dir, P.y - 64 * 0.75], gazeTo = (p) => { P.gaze = lookAt(hd(), p); };
  const launch = [96.56, 96.76, 96.96][i], back0 = 101.6 + i * 0.15, back1 = back0 + 1.5;
  if (t >= launch && t < back1) {
    let pos;
    if (t < launch + 0.8) { const u = ss(t, launch, launch + 0.8), c = crowCircle(launch + 0.8, i); pos = [K.lerp(PERCH_C[i][0], c[0], u), K.lerp(604, c[1], u) - 50 * Math.sin(Math.PI * u)]; }
    else pos = crowCircle(t, i);
    for (const [ts, who] of STRIKES) if (who === i) {
      const eye = eyeOf(elephantP(ts)), tgt = [eye[0] + 40, eye[1] - 30];
      if (win(t, ts - 0.32, ts)) { const u = K.ease.in((t - ts + 0.32) / 0.32), c = crowCircle(ts - 0.32, i); pos = [K.lerp(c[0], tgt[0], u), K.lerp(c[1], tgt[1], u)]; P.beak = u > 0.8 ? 0.8 : 0; }
      if (win(t, ts, ts + 0.35)) { const u = K.ease.out((t - ts) / 0.35), c = crowCircle(ts + 0.35, i); pos = [K.lerp(tgt[0], c[0], u), K.lerp(tgt[1], c[1] - 40, u)]; }
    }
    if (t >= back0) { const u = ss(t, back0, back1), c = crowCircle(back0, i); pos = [K.lerp(c[0], PERCH_C[i][0], u), K.lerp(c[1], 604, u) - 50 * Math.sin(Math.PI * u)]; }
    const pr = (tt) => { const s = Math.min(Math.max(tt, launch), back1 - 0.001); return s; };
    P.x = pos[0]; P.y = pos[1]; P.fly = true; P.flap = Math.sin(t * 22 + i);
    const ahead = t < back0 ? crowCircle(t + 0.05, i) : [PERCH_C[i][0], 604]; P.dir = ahead[0] < P.x - 1 ? -1 : 1; if (t >= back0) P.dir = PERCH_C[i][0] < P.x ? 1 : -1;
    P.gaze = lookAt(hd(), eyeOf(E)); void pr;
    return P;
  }
  if (t >= back1) P.sq = landSquash(t, back1);
  gazeTo(win(t, 85.9, 96.5) ? [L.x, L.y - 40] : eyeOf(E));
  if (win(t, 85.9, 89.4)) { if (i === 1) { P.headRot = 0.9 + 0.15 * Math.sin(t * 7); P.gaze = [0.3, 1]; } if (i === 2) P.eyes = 'wide'; if (i === 0 && t > 89.0) P.headRot = 0.2; }
  if (win(t, 91.0 + i * 0.1, 92.24)) P.gaze = lookAt(hd(), eyeOf(E));
  if (win(t, 92.24, 93.6)) P.gaze = [i === 0 ? 1 : -1, 0];
  if (i === 0 && win(t, 93.6, 94.1)) P.lid = Math.sin(Math.PI * (t - 93.6) / 0.5);
  if (win(t, 94.48, 95.0)) P.gaze = [i === 2 ? -1 : 1, 0];
  if (win(t, 95.0, 96.56)) { P.drop = 8 * pulse(t, 95.0 + i * 0.1, 0.25); P.beak = 0.8 * pulse(t, 95.05 + i * 0.1, 0.12); if (t > 95.6) P.gaze = lookAt(hd(), eyeOf(E)); P.sq = anticipate(t, 96.2 + i * 0.2, 0.3, 0.15); }
  if (i === 0 && win(t, 117.2, 117.6)) P.beak = 1.2 * pulse(t, 117.2, 0.4);
  if (t >= 178.2) { P.tip = 0.12 * ss(t, 178.2, 178.6); P.gaze = lookAt(hd(), eyeOf(E)); if (i === 0) { P.beak = 0.8 * pulse(t, 180.0, 0.12); P.drop = 8 * pulse(t, 187.4, 0.4); } P.sag = -1 * pulse(t, 190.22 + i * 0.1, 0.6); }
  return P;
}
const HOME_F = [172, 212, 256], LIP_F = [515, 545, 575], ASIDE_F = [250, 285, 320], HOP0 = [146.4, 146.15, 145.9], CROAK0 = [151.3, 150.9, 150.46], CPER = [0.95, 0.85, 0.75];
function croakAt(t, i) { if (t < CROAK0[i] || t >= 161.2) return 0; const per = t < 160.9 ? CPER[i] : 0.45, c = ((t - CROAK0[i]) % per) / per; return c < 0.4 ? Math.sin(Math.PI * c / 0.4) : 0; }
function frogP(t, i) {
  const P = { s: 0.9, dir: 1, x: HOME_F[i], y: GR - 4 };
  if (inSeq(t)) { P.eyes = 'open'; frogSeq(t, i, P); return P; }
  P.seed = 51 + i * 3; const L = larkP(t), E = elephantP(t), hd = () => [P.x, P.y - 50];
  P.gaze = lookAt(hd(), t < 20.2 ? [L.x, L.y - 40] : eyeOf(E));
  if (t >= 46.5 && t < 109.6) { if (Math.abs(L.x - P.x) < 500) P.gaze = lookAt(hd(), [L.x, L.y - 40]); }
  // duck to the eyes as the blind elephant's trunk passes over the pond; come up one at a time after he has gone
  const up = [128.8, 129.2, 129.7][i];
  if (win(t, 109.6, up + 0.6)) { P.duck = 36 * ss(t, 109.6 + i * 0.1, 109.85 + i * 0.1) * (1 - ss(t, up, up + 0.5)); P.gaze = lookAt(hd(), eyeOf(E)); if (t < 124) P.eyes = 'wide'; }
  if (win(t, up + 0.5, up + 0.8)) P.lid = Math.sin(Math.PI * (t - up - 0.5) / 0.3);
  if (win(t, up + 0.8, 145.9)) P.gaze = t < up + 1.4 ? [-1, 0] : lookAt(hd(), [L.x, L.y - 50]);
  if (win(t, 132.6, 133.4)) P.gaze = [i === 0 ? 1 : -1, 0];
  if (win(t, 135.6 + i * 0.1, 137.3)) { P.gaze = [1, 0]; P.tip = 0.08; }
  if (i === 0 && win(t, 137.9, 139.68)) P.sq = 0.88;
  if (i === 1 && win(t, 141.9, 142.35)) { P.croak = pulse(t, 141.95, 0.35); P.sq = 1.08; }
  if (win(t, 142.0, 142.8)) { P.gaze = [-1, 0]; P.eyes = 'wide'; if (i === 1) P.duck = 30 * ss(t, 142.3, 142.45) * (1 - ss(t, 143.0, 143.4)); }
  if (i === 2 && win(t, 145.3, 145.9)) { P.gaze = t < 145.6 ? [-0.6, 0.6] : [1, 0]; P.croak = 0.4 * ss(t, 145.6, 145.8); }
  // to the pit: four crouch-hop-land cycles each, not in step
  if (t >= HOP0[i]) {
    const per = 0.95, u = (t - HOP0[i]) / per, k = Math.min(3, Math.floor(u)), f = u - Math.floor(u), done = u >= 4;
    const xA = K.lerp(HOME_F[i], LIP_F[i], k / 4), xB = K.lerp(HOME_F[i], LIP_F[i], (k + 1) / 4);
    if (!done) { const air = K.clamp((f - 0.15) / 0.5); P.x = K.lerp(xA, xB, K.ease.inOut(air)); P.y = GR - 4 - 55 * Math.sin(Math.PI * air); P.sq = f < 0.15 ? anticipate(f, 0, 0.15, 0.15) : f > 0.65 ? landSquash(f, 0.65, 0.18, 12) : 1.06; P.gaze = [1, 0]; P.duck = 0; P.croak = 0; }
    else { const ta = HOP0[i] + 4 * per; P.x = LIP_F[i]; P.dir = t < ta + 0.2 ? 1 : -1; P.gaze = [-1, 0];
      if (i === 2 && win(t, 149.75, 150.3)) { P.dir = 1; P.duck = 10; P.gaze = [0.6, 0.8]; }
      const c = croakAt(t, i); P.croak = c; if (t >= CROAK0[i] - 0.25 && t < CROAK0[i]) P.sq = 1.1;
      if (t >= 152.4) P.gaze = lookAt(hd(), eyeOf(E));
      if (t >= 160.9) P.eyes = 'wide';
      const ts = 161.2 + i * 0.06;
      if (t >= ts) { const [hx, hy] = hop(t, ts, 0.5, LIP_F[i], ASIDE_F[i], 70); P.x = hx; P.y = GR - 4 - hy; P.croak = 0; P.dir = -1; P.gaze = lookAt(hd(), eyeOf(E)); P.eyes = 'wide'; }
      if (t >= 163.6) P.y -= 12 * pulse(t, 163.6 + i * 0.07, 0.25);
      const tb = 164.5 + i * 0.15;
      if (t >= tb) { const [hx, hy] = hop(t, tb, 0.45, ASIDE_F[i], LIP_F[i], 40); P.x = hx; P.y = GR - 4 - hy; P.dir = 1; P.eyes = 'open'; P.gaze = [1, 0.4]; }
      if (t >= 166.6) { P.tip = 0.15 * ss(t, 166.6, 166.9); P.gaze = t < 167.0 || t > 167.6 ? lookAt(hd(), eyeOf(E)) : [-1, 0]; }
      if (t >= 177.5) { P.tip = 0.06; P.gaze = lookAt(hd(), eyeOf(E)); if (i === 2) P.croak = pulse(t, 179.5, 0.35); P.croak = Math.max(P.croak || 0, 0.5 * pulse(t, 185.6 + i * 0.1, 0.4)); if (win(t, 185.5, 185.9)) P.lid = Math.sin(Math.PI * (t - 185.5) / 0.4); P.y -= 40 * pulse(t, 190.22 + i * 0.08, 0.4); if (t >= 191.3) P.gaze = [0.7, 0.7]; } }
  }
  return P;
}
function friendsP(t) { const out = []; for (let i = 0; i < 3; i++) { const f = friendP(t, i); if (f) out.push(f); } for (let i = 0; i < 3; i++) out.push(crowP(t, i)); return out; }
function frogsP(t) { return [0, 1, 2].map((i) => frogP(t, i)); }

function drawWorld(ctx, t, cam) {
  ctx.drawImage(skyL(), 0, 0, WW, 920); drawSun(ctx, 760, 130); cloudFlat(ctx, 120 + ((t * 3) % 1100), 110, 1.0); cloudFlat(ctx, ((t * 2 + 700) % 1200) - 100, 250, 0.8);
  ctx.drawImage(treesL(), 0, 0, WW, GR + 10); ctx.drawImage(pitBackL(), 0, 0, WW, WH);
  const E = elephantP(t), L = larkP(t);
  // nest
  let nestO;
  if (inSeq(t) || t >= SEQ_B) { // as approved
    const eggT = [10.1, 10.6, 11.1], hatch = [12.5, 12.8, 13.1];
    const nb = K.clamp((t - 7.2) / 3.6); nestO = { nb, t, eggs: t >= 10.1 ? 3 : 0, egg: eggT.map((a) => (t - a) / 0.3), chicks: 0, ruin: K.beat(t, 34.4, 0.6, 'lin') };
    nestO.chicks = hatch.filter((h) => t >= h).length; if (nestO.chicks > 0) nestO.eggs = 3;
    nestO.feed = t >= 15.5 && t < 20.3 && L.arrive; nestO.ruin = t >= 34.4 ? K.beat(t, 34.4, 0.6, 'lin') : 0;
    if (inSeq(t) && t < STOMP) { nestO.ck = chicksSeq(t, L); nestO.rock = K.spring(t, 27.95, 0.06, 3, 4); }
    if (t >= STOMP) { nestO.ruinT = t - STOMP; nestO.nudge = K.spring(t, 42.05, 0.35, 2.2, 4); }
  } else { // the opening: the nest grows on each tuck, eggs appear when she stands up, they rock and hatch on the word
    const hatch = [13.92, 14.2, 14.5];
    nestO = { nb: nbAt(t), t, eggs: t >= 11.66 ? 3 : 0, egg: [0, 1, 2].map((k) => (t - 11.66 - k * 0.06) / 0.2), chicks: hatch.filter((h) => t >= h).length, feed: !!L.feed,
      rock: [12.6, 12.95, 13.3, 13.65].reduce((a, h) => a + K.spring(t, h, 0.035, 4, 5), 0) };
  }
  if (t >= 7.1) nestDraw(ctx, NEST[0], NEST[1], nestO);
  seqShadow(ctx, t);
  const frogsBehind = t >= 161.2 && t < 163.6;   // the frogs spring aside behind his legs
  if (frogsBehind) for (const f of frogsP(t)) frog(ctx, f);
  if (t >= 22.5 || inSeq(t)) elephant(ctx, E);
  if (!frogsBehind) for (const f of frogsP(t)) frog(ctx, f);
  for (const b of friendsP(t)) bird(ctx, b);
  if (L.carry) { const sx = L.x + 30 * L.dir, sy = L.y - 52 * L.s; seg(ctx, sx, sy, sx + 36 * L.dir, sy + 4, 4, '#f2d27a', 2); }
  if (L.worm) worm(ctx, L.x + 62 * L.dir, L.y - 54 * L.s, t);
  bird(ctx, L);
  ctx.drawImage(groundL(), 0, 0, WW, WH);
  worldFX(ctx, t, cam, E, L);
  seqFX(ctx, t);
}
function worldFX(ctx, t, cam, E, L) {
  if (inSeq(t)) return;
  const B = (a, b) => K.beat(t, a, b, 'lin'), eye = eyeOf(E), mouth = [E.x + 172 * Math.sign(E.dir), E.y - (214 - 70 - (E.drop || 0)) * 0.8];
  if (t >= 14.0 && t < 14.9) sfx(ctx, 'CHEEP!', 520, 690, 40, B(14.0, 0.15), { rot: -0.08, fill: C.white });
  // footfall dust for every elephant step outside the approved sequence
  for (const f of FF_E) { const d = t - f.t; if (d >= 0 && d < 0.5) { const fx = eX(f.t) + (f.odd ? 92 : -40) * Math.sign(E.dir); dustBurst(ctx, fx, GR + 2, d, 5, 7, 13, 34, 0.5, Math.round(f.t * 10)); } }
  // "Yes!": a snort that blows her back; his balloon, tail to his mouth
  if (t >= 61.56 && t < 62.1) for (let i = 0; i < 3; i++) { const u = K.clamp((t - 61.56 - i * 0.05) / 0.4); if (u <= 0 || u >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.white; const y0 = mouth[1] - 40 + i * 30, x0 = mouth[0] + 30 + u * 140; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + 60, y0 - 6); ctx.stroke(); ctx.restore(); }
  if (t >= 61.56 && t < 62.6) bubble(ctx, 560, 520, 230, 110, mouth[0] - 10, mouth[1] - 40, B(61.56, 0.15), 'YES!', { size: 70, fill: C.yellow });
  // each strike: a two-frame white flash covers the contact
  for (const [ts] of STRIKES) if (t >= ts && t < ts + 0.08) star(ctx, eye[0] + 10, eye[1] - 6, 46, C.white, ts * 3);
  // the long walk: after the time cut his footprints loop back on themselves
  if (t >= 112.8 && t < 128.6) { ctx.save(); ctx.globalAlpha = 0.55 * (1 - K.clamp((t - 127.6) / 1)); ctx.fillStyle = '#9a6a14'; for (let k = 0; k < 26; k++) { const a = k * 0.62, px = 330 + Math.cos(a) * (120 + k * 3) + Math.sin(k * 1.7) * 20, py = GR + 12 + Math.sin(a) * 9; ctx.beginPath(); ctx.ellipse(px, py, 15, 5, 0, 0, 7); ctx.fill(); } ctx.restore(); }
  // sounds he hears while blind come from sources we can see
  if (t >= 117.2 && t < 118.0) soundArcs(ctx, PERCH_C[0][0] - 60, 540, -1, t);
  if (t >= 118.4 && t < 119.2) soundArcs(ctx, PF2[1] + 40, 540, 1, t);
  // the frogs' croaks travel left along the ground toward where he will come from
  if (t >= 150.46 && t < 161.2) for (let i = 0; i < 4; i++) { const u = ((t - 150.46) * 0.55 + i / 4) % 1; ctx.save(); ctx.globalAlpha = (1 - u) * 0.85 * K.clamp((t - 150.46) / 0.3); ctx.lineWidth = 7; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(545, 850, 60 + u * 620, Math.PI - 0.22, Math.PI + 0.22); ctx.stroke(); ctx.restore(); }
  if (t >= 150.5 && t < 151.3) sfx(ctx, 'RIBBIT!', 560, 770, 44, B(150.5, 0.15), { rot: -0.1, fill: C.white });
  if (t >= 153.4 && t < 154.2) sfx(ctx, 'RIBBIT!', 530, 750, 44, B(153.4, 0.15), { rot: 0.1, fill: C.white });
  if (t >= 154.9 && t < 157.2) cloud(ctx, 420, 440, 120, 84, C.blue, B(154.9, 0.4), { tail: [E.x + 122 - 420, 640 - 440], inside: (c) => { shape(c, ell(0, 20, 72, 22, 22), '#5fa0ff', { lw: 5, seed: 2, dot: C.white, pitch: 9, rad: 0.15, da: 0.6 }); shape(c, [[-10, -50], [-30, -4], [10, -4]], '#5fa0ff', { lw: 4, seed: 2 }); } });
  // his footfall shivers the real pond as he strides past it
  if (t >= 159.0 && t < 160.2) for (let i = 0; i < 2; i++) { const u = K.clamp((t - 159.0 - i * 0.2) / 0.9); if (u <= 0 || u >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(215, GR + 4, 20 + u * 66, 4 + u * 12, 0, 0, 7); ctx.stroke(); ctx.restore(); }
  // teeter: the rear feet scrabble, two clods break off the lip
  for (const st of [162.3, 162.55]) dustBurst(ctx, E.x - 40, GR + 2, t - st, 5, 6, 12, 30, 0.45, Math.round(st * 10));
  if (t >= 162.4 && t < 163.4) for (let i = 0; i < 2; i++) { const d = t - 162.4 - i * 0.12; if (d < 0) continue; ctx.save(); ctx.fillStyle = '#b0801a'; ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(585 + i * 12 + d * 20, GR + 4 + 500 * d * d, 9, 7, d * 4, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
  // impact: a column of dust out of the pit mouth
  if (t >= 163.6 && t < 164.6) { dustBurst(ctx, 730, GR + 10, t - 163.6, 9, 18, 34, 120, 0.9, 7); dustBurst(ctx, 680, GR + 10, t - 163.68, 7, 14, 28, 90, 0.8, 13); }
  // failed climbs: scrape marks on the wall
  for (const [a, b] of [[165.6, 166.3], [166.3, 166.9]]) if (t >= a && t < b + 1.2) { ctx.save(); ctx.globalAlpha = 0.8 * (1 - K.clamp((t - b) / 1.2)); ctx.lineWidth = 4; ctx.strokeStyle = '#8fa8e8'; ctx.lineCap = 'round'; const n = a === 165.6 ? 0 : 1; for (let k = 0; k < 2; k++) { const x0 = 820 + k * 14 + n * 30, len = 60 * K.clamp((t - a) / 0.3); ctx.beginPath(); ctx.moveTo(x0, 960 + n * 20); ctx.lineTo(x0 - 4, 960 + n * 20 + len); ctx.stroke(); } ctx.restore(); }
  // the friends' voices, one after another
  if (t >= 179.5 && t < 180.3) soundArcs(ctx, LIP_F[2] + 30, 840, 1, t);
  if (t >= 179.75 && t < 180.5) soundArcs(ctx, LAND_F[1] + 40, 830, 1, t);
  if (t >= 180.0 && t < 180.8) soundArcs(ctx, PERCH_C[0][0] - 50, 560, -1, t);
}
// ---------- the scene ----------

const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = inSeq(t) ? null : t;
    const shake = K.spring(t, 34.4, 8, 9, 6) + K.spring(t, 163.6, 12, 8, 5) + K.spring(t, 101.4, 5, 10, 7) + (inSeq(t) ? fallKick(t, 2.5, 11, 9) : 0);
    ctx.save(); ctx.translate(shake * 0.8, -shake * 0.5);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px, py); ctx.scale(pw / WW, ph / WH);
    const cam = camAt(t);
    ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t, cam); ctx.restore();
    overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1); ctx.restore();
    LIFE.t = null;
    S.finish(ctx, W, H, t);
  },
  score(k, S) {
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    [0.3, 0.75, 1.2, 1.65].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.08, gain: 0.4 }));
    // opening
    k.play('pop', 3.3, { pitch: 1.6, gain: 0.22 }); k.play('paper', 8.75, { gain: 0.5 }); k.play('paper', 9.88, { gain: 0.5 });
    [11.7, 11.85, 12.0].forEach((h) => k.play('ding', h, { gain: 0.35 })); [12.6, 13.3].forEach((h) => k.play('tick', h, { gain: 0.35 })); [13.92, 14.2, 14.5].forEach((h) => k.play('pop', h, { pitch: 1.5, gain: 0.35 })); k.play('pop', 18.4, { pitch: 1.4, gain: 0.3 });
    // the approved sequence (unchanged)
    FOOTFALLS.forEach((f) => k.play('thud', f.t, { gain: 0.24 })); k.play('click', 27.95, { gain: 0.3 }); k.play('pop', 28.25, { pitch: 1.7, gain: 0.25 }); k.play('pop', 30.35, { pitch: 0.7, gain: 0.45 }); k.play('stamp', 34.4, { gain: 0.9 }); k.play('thud', 34.4, { gain: 0.8 });
    k.play('pop', 39.85, { pitch: 0.6, gain: 0.35 });
    // the elephant's footfalls everywhere else
    FF_E.forEach((f) => k.play('thud', f.t, { gain: f.t > 157 ? 0.3 : 0.18 }));
    // appeal
    k.play('whoosh', 46.6, { dur: 0.8, gain: 0.3 }); k.play('whoosh', 61.56, { dur: 0.45, up: false, gain: 0.45 }); k.play('stamp', 61.56, { gain: 0.4 }); k.play('whoosh', 63.0, { dur: 0.3, gain: 0.22 });
    k.play('pop', 73.2, { pitch: 1.3, gain: 0.25 }); k.play('pop', 85.9, { pitch: 1.3, gain: 0.25 });
    // crows agree, attack
    [95.0, 95.1, 95.2].forEach((h) => k.play('click', h, { gain: 0.3 })); k.play('whoosh', 96.56, { dur: 1.0, gain: 0.35 });
    STRIKES.forEach(([h]) => { k.play('click', h, { gain: 0.7 }); k.play('pop', h + 0.02, { pitch: 0.6, gain: 0.35 }); }); k.play('stamp', 101.4, { gain: 0.8 }); k.play('whoosh', 102.0, { dur: 0.35, gain: 0.25 }); k.play('whoosh', 102.45, { dur: 0.35, gain: 0.22 });
    // blind: the time cut, sounds with visible sources
    k.play('whoosh', 112.0, { dur: 0.8, gain: 0.35 }); k.play('pop', 117.2, { pitch: 0.5, gain: 0.4 }); k.play('pop', 117.35, { pitch: 0.45, gain: 0.35 }); k.play('pop', 118.4, { pitch: 1.8, gain: 0.3 }); k.play('pop', 118.55, { pitch: 2.0, gain: 0.25 });
    // frogs
    k.play('pop', 126.6, { pitch: 1.3, gain: 0.25 }); k.play('blip', 142.0, { note: 'G3', gain: 0.5, dur: 0.18 });
    for (let i = 0; i < 3; i++) for (let h = CROAK0[i]; h < 161.2; h += h < 160.9 ? CPER[i] : 0.45) k.play('blip', h, { note: ['G3', 'A3', 'E3'][i], gain: 0.32, dur: 0.16 });
    // the fall
    k.play('tick', 162.3, { gain: 0.3 }); k.play('tick', 162.55, { gain: 0.3 }); k.play('whoosh', 162.92, { dur: 0.6, up: false, gain: 0.45 }); k.play('stamp', 163.6, { gain: 1 }); k.play('thud', 163.6, { gain: 1 });
    k.play('paper', 165.6, { dur: 0.3, gain: 0.5 }); k.play('thud', 165.9, { gain: 0.55 }); k.play('paper', 166.3, { dur: 0.25, gain: 0.4 }); k.play('thud', 166.5, { gain: 0.4 });
    // the ending
    k.play('pop', 169.44, { pitch: 1.3, gain: 0.25 }); k.play('blip', 179.5, { note: 'G3', gain: 0.4, dur: 0.16 }); k.play('pop', 179.75, { pitch: 1.8, gain: 0.3 }); k.play('click', 180.0, { gain: 0.35 });
    [190.22, 190.3, 190.38].forEach((h, i) => k.play('pop', h, { pitch: 1.2 + i * 0.2, gain: 0.28 })); k.play('chime', 193.0, { note: 'G5', gain: 0.8 });
  },
};
function overlays(ctx, t, cam, S) {
  seqOverlay(ctx, t, cam, S);
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Lark and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Elephant', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  if (t > 112.0 && t < 113.6) { ctx.save(); S.transition(ctx, WW, WH, K.clamp((t - 112.0) / 1.6), { caption: 'LATER...' }); ctx.restore(); }
  if (t >= 163.6 && t < 164.6) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 164.2) / 0.4); const [cx, cy] = toPanel(730, 700, cam); S.emphasis(ctx, cx, cy, 190, K.beat(t, 163.6, 0.4, 'lin'), { word: 'CRASH!', wx: 0.8, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 193.0) S.title(ctx, 'THE END', 500, 190, K.beat(t, 193.0, 0.8, 'lin'), { size: 80, align: 'center' });
}
window.SCENE = SCENE;
