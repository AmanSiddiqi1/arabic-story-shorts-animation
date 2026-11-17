// ===== KD-012 lakeShore at night and dawn: S8 the moon on the water, S9 the trunk, S10 the order, S11 homecoming =====
const MO_N = (c, t, a = 1) => { halo(c, MOON_N[0], MOON_N[1], MOON_N[2], 300, 0.4 + 1.8 * pulse(t, 110.48, 0.7), a * (t > 102 && t < 109.9 ? B(t, 107.14, 2.0) : 1)); const ma = t > 102 && t < 109.9 ? B(t, 107.0, 0.6) : 1; if (ma > 0) { c.save(); c.globalAlpha *= ma; moon(c, MOON_N[0], MOON_N[1], MOON_N[2]); c.restore(); }
  for (let i = 0; i < 3; i++) { const t0 = 110.48 + i * 0.16, k = pulse(t, t0, 0.55); if (k > 0) { const a2 = -2.3 + i * 1.1; star(c, MOON_N[0] + Math.cos(a2) * 150, MOON_N[1] + Math.sin(a2) * 130, 26 * k, C.white, t); } } };
// reflection state over S8-S9: {alpha, wobble, breakUp, tint}
function reflState(t) {
  let al = B(t, 113.04, 0.5), wob = 0.08, br = 0, tint = 0;
  if (t >= 127.92) wob = 0.25; if (t >= 130.12) { wob = 1; br = 0.5 * B(t, 130.12, 1.2); }
  if (t >= 132.08) { br = 0.5 + 0.5 * B(t, 132.08, 0.5); al = 1 - B(t, 132.1, 0.6); }
  if (t >= 136.7) { al = B(t, 136.7, 0.6); br = K.lerp(1, 0.3, B(t, 136.7, 1.1)); wob = 0.6; tint = 1; }
  if (t >= 137.8) { br = 0.3 * (1 - B(t, 137.8, 2.5)); wob = K.lerp(0.6, 0.1, B(t, 137.8, 3)); tint = 1 - B(t, 139.5, 2.5); }
  return { alpha: al, wobble: wob, breakUp: br, tint };
}
// ================= S8 + S9: the king at the water =================
const K8 = (t) => (t < 106 ? kfn(t, [[104.24, 760], [105.9, 1280]]) : t < 140.7 ? kfn(t, [[118.6, 1280], [119.4, 1268]]) : t < 142.4 ? kfn(t, [[140.7, 1268], [142.0, 1222]]) : kfn(t, [[142.4, 1222], [142.9, 1238]]));
const TIPTOE = [104.42, 104.84, 105.26, 105.66];
// v3: the bend on انحنى, about double the v2 lowering (drop 15 to 56, tip 0.1); trunk hangs straight (no curl to the cheek)
const BEND = { drop: 90, tip: 0.22, trunk: 0.25, sag: 0.4, sagDrop: 6 };
const TOUCH = [126.16, 126.74, 127.1, 127.45, 127.8];
function king89(t) {
  const w = walk(K8, t), P = { ...KINGB, y: 902, dir: 1, ...w, amp: w.amp * 0.35, flapEar: 0.25 }, RF = [REFL[0], REFL[1]], MN = [MOON_N[0], MOON_N[1]];
  if (t < 106) { P.lift = 75 * TIPTOE.reduce((a, s) => a + pulse(t, s - 0.2, 0.36), 0); P.gaze = [0.3, 1]; P.tongue = t > 104.2; P.trunk = t > 104.2 ? 0.6 : 0.2; P.drop = -8; }
  const e = elEye(P);
  if (t >= 105.9) { P.sq = settleTo(t, 105.9, 0.97, 1, 0.5); P.gaze = lookAt(e, [1500, 960]); P.trunk = blend(t, 105.9, 106.6, 0.6, 0.1); }
  if (t >= 108.5) { P.drop = blend(t, 108.5, 109.9, 0, -16); P.earUp = 0.3 + 0.25 * B(t, 110.48, 0.25); P.talk = 0.25; P.gaze = lookAt(e, MN); }
  if (t >= 109.9 && t < 111.9) P.wet = true;
  if (t >= 111.9) { P.wet = false; P.gaze = lookAt(e, gazePlan(t, [[111.9, MN], [113.0, RF]], 1.0)); P.drop = blend(t, 111.9, 113.2, -16, 0); P.talk = 0; }
  if (t >= 114.24 && t < 115.3) { P.gaze = lookAt(e, gazePlan(t, [[114.24, MN], [114.46, RF], [114.66, MN], [114.86, RF]], 0.07)); P.hbob = 9 * P.gaze[1]; P.earUp = 0.6; P.eyes = 'wide'; }
  if (t >= 114.95) { P.talk = 0.8 * B(t, 114.95, 0.2); P.earUp = 0.6; P.gaze = lookAt(e, RF); }
  if (t >= 116.4) { P.talk = 0.8 * (1 - B(t, 116.4, 0.4)); P.earUp = 0.4; }
  if (t >= 118.6) { P.drop = blend(t, 118.6, 119.3, 0, 15); P.sq = 1.03; }
  if (t >= 119.43) { P.earUp = blend(t, 119.43, 119.7, 0.4, -0.35); P.noBlink = true; P.lid = 0; }
  if (t >= 120.6) P.hbob = 7 * pulse(t, 120.95, 0.4);
  if (t >= 120.6) { const rs = reflState(t); P.gaze = lookAt(e, [RF[0] + Math.sin(t * 5) * 18 * rs.wobble * 4, RF[1]]); }
  // S9: bend, the forgotten trunk, the touch, the fright, the bow, the retreat
  if (t >= 121.56) { P.sq = 1; P.brow = 0; P.tip = blend(t, 122.06, 123.06, 0, BEND.tip) + blend(t, 124.5, 126.16, 0, 0.03); P.drop = blend(t, 122.06, 123.06, 15, BEND.drop) + blend(t, 124.5, 126.16, 0, BEND.sagDrop); P.trunk = blend(t, 122.06, 123.06, 0, BEND.trunk) * (1 - BEND.sag * B(t, 124.5, 1.66, 'in')); P.reach = t < 124.4 ? 0.07 * Math.sin((t - 122.06) * 3.2) * B(t, 122.4, 0.5) : 0; P.earUp = 0.3; P.earOff = 0; P.eyes = t < 127.92 ? 'wide' : 'open'; P.gaze = lookAt(e, RF); P.lid = 0; P.noBlink = true; }
  if (t >= 124.4 && t < 131.46) { P.reach = 0.12 * Math.sin((t - 124.4) * 1.8) * (t < 126.7 ? 1 : 0) + (t >= 126.7 && t < 127.9 ? 0.18 * Math.sin((t - 126.7) * 9) : 0); }
  if (t >= 127.92) P.brow = 0.3; if (t >= 127.92 && t < 128.1) P.lid = 1;
  if (t >= 129.4 && t < 130.0) P.drop -= 6 * pulse(t, 129.4, 0.6);
  if (t >= 130.12) { P.eyes = t > 130.6 ? 'wide' : 'open'; P.earUp = 0.25 * Math.floor(K.clamp((t - 130.12) / 1.2) * 3); }
  if (t >= 131.46) { P.drop = blend(t, 131.46, 131.6, BEND.drop + BEND.sagDrop, 28); P.tip = blend(t, 131.46, 131.6, BEND.tip + 0.03, 0.04); P.trunk = blend(t, 131.46, 131.6, 0, 0.8); P.reach = 0; P.sq = t < 131.7 ? 1.06 : t < 132.0 ? 0.96 : 1; P.eyes = 'wide'; }
  if (t >= 133.1 && t < 133.92) { P.noBlink = true; P.earOff = tremble(t, 0.06, 11); }
  if (t >= 133.92) { P.eyes = 'wide'; P.gaze = lookAt(e, [STONE_P[0] + 10, STONE_P[1] - 85]); P.earUp = 0.4; }
  if (t >= 135.65) { P.sq = 1 - 0.04 * B(t, 135.65, 0.25) - 0.04 * B(t, 137.06, 0.25); P.earUp = 0.4 - 0.4 * B(t, 135.65, 0.3) - 0.4 * B(t, 137.06, 0.3); if (t >= 137.06 && t < 137.86) P.x += tremble(t, 2.5, 9); }
  if (t >= 136.7) { P.tip = blend(t, 136.7, 137.0, 0.04, -0.05); P.gaze = lookAt(e, RF); }
  if (t >= 137.86) { P.x += tremble(t, 3, 8); P.earUp = -0.4; P.wet = true; P.brow = -0.6; P.eyes = 'open'; P.crownSlip = t < 138.6 ? B(t, 137.95, 0.25, 'out') : 1 - 0.65 * B(t, 138.6, 0.4); P.trunk = t > 138.4 && t < 139.2 ? 0.95 : 0.8; }
  if (t >= 139.28) { P.drop = blend(t, 139.28, 139.9, 28, 72); P.tip = blend(t, 139.28, 139.9, -0.05, 0.12); P.eyes = 'shut'; P.trunk = 0.55; P.crownSlip = 0.35; }
  if (t >= 140.7) { P.drop = blend(t, 140.7, 141.2, 72, 20); P.tip = blend(t, 140.7, 141.2, 0.12, 0); P.eyes = 'open'; P.gaze = lookAt(e, RF); P.amp = w.amp * 0.6; }
  if (t >= 142.04 && t < 142.85) { P.amp = 0; P.lift = 60 * (t < 142.6 ? B(t, 142.04, 0.1, 'out') : 1 - B(t, 142.6, 0.25)); P.earUp = 0.5; P.eyes = 'wide'; }
  if (t >= 142.04) { P.earOff = -0.3 * B(t, 142.1, 0.15); if (t > 142.3) P.gaze = [-1, 0.45]; P.hbob = 8 * pulse(t, 142.5, 0.5); }
  return P;
}
function hero89(t) {
  const h = hops(t, [1150, GR], [[103.4, 0.38, 1310, 893, 45], [103.85, 0.38, 1460, 893, 45], [104.65, 0.4, 1610, 893, 45], [105.2, 0.45, STONE_P[0], 888, 45]]);
  const P = { pal: 0, s: 0.6, seed: 5, x: h.x, y: h.y, sq: h.sq, dir: t < 105.9 ? (t >= 104.2 && t < 104.6 ? -1 : 1) : turnTo(t, 105.9, 1, -1), ears: 1, gaze: h.air ? [1, 0] : [-1, 0], lid: 0.2 };
  if (t >= 104.24 && t < 104.6) { P.raise = 1.1 + 0.3 * Math.sin((t - 104.24) * 22); P.mouth = 'smile'; }
  const kk = (tt) => elEye(king89(tt));
  if (t >= 105.9) P.gaze = lookAt(hHead(P), [1430, 760]);
  if (t >= 110.5 && t < 111.4) { P.nod = 0.3 * B(t, 110.5, 0.3); P.lid = 0.6; P.gaze = [-0.3, -1]; }
  if (t >= 115.3) { P.sq = 1.05; P.lid = 0.35; P.earWig = 0.2; }
  if (t >= 117.2 && t < 117.38) P.sq = anticipate(t, 117.2, 0.18, 0.08);
  if (t >= 117.38 && t < 119.43) { P.raise = -0.6; P.tip = 0.1; P.ears = 1.2; P.gaze = lookAt(hHead(P), [REFL[0], REFL[1]]); }
  if (t >= 119.43 && t < 121.56) { P.raise = 0.9; P.tip = 0.12 * B(t, 119.43, 0.25); P.brow = -0.6; P.lid = 0.15; P.gaze = lookAt(hHead(P), kk(Math.min(t, 121))); }
  if (t >= 121.56) { P.lid = 0.35; P.gaze = lookAt(hHead(P), kk(t)); P.raise = 0; P.brow = 0.2; }
  if (t >= 125.58 && t < 126.2) { P.gaze = t < 125.75 ? lookAt(hHead(P), elTrunk(king89(t))) : P.gaze; P.mouth = 'smile'; P.earWig = 0.3 * Math.sin(t * 40); }
  if (t >= 133.67) { P.sq = anticipate(t, 133.67, 0.25, 0.12); }
  if (t >= 133.92 && t < 135.28) { P.y -= 22 * pulse(t, 133.92, 0.45); P.sq = 1.15; P.raise = 1.8; P.eyes = 'wide'; P.mouth = 'o'; P.lid = 0; }
  if (t >= 135.28 && t < 139.28) { P.brow = t < 137.06 ? 0.5 : -0.8; P.tip = 0.12; P.lid = 0; P.ears = 1.25; P.raise = t < 135.65 ? 0 : t < 137.06 ? -0.7 * B(t, 135.65, 0.15, 'out') : K.lerp(-0.7, 1.0, B(t, 137.06, 0.18, 'out')); P.gaze = t < 137.06 ? lookAt(hHead(P), [REFL[0], REFL[1]]) : lookAt(hHead(P), kk(t)); P.sq = 1.05; }
  if (t >= 139.28) { P.lid = 0.45; P.mouth = 'smile'; P.brow = 0; P.tip = 0; P.raise = 0; }
  P.talk = talk(t, [[115.91, 117.0], [117.38, 118.5], [119.43, 120.55], [134.3, 139.1]], 0.3);
  return P;
}
function drawNight89(ctx, t) {
  lakeBase(ctx, t, 'night', (c) => MO_N(c, t));
  const tipP = elTrunk(king89(t)), k = king89(t);
  // trunk tip in world space with the body tilt
  const rot = (P, pt) => { const a = (P.tip || 0) * (P.dir ?? 1), dx = pt[0] - P.x, dy = pt[1] - P.y; return [P.x + dx * Math.cos(a) - dy * Math.sin(a), P.y + dx * Math.sin(a) + dy * Math.cos(a)]; };
  const TP = rot(k, tipP), rs = reflState(t);
  moonReflection(ctx, { x: REFL[0], y: REFL[1], r: REFL[2], t, ...rs, seed: 11 });
  if (t >= 120.6 && t < 121.6) { const u = (t - 120.6) / 1.0; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); const lx = REFL[0] - 110 + 220 * u; for (let i = 0; i <= 8; i++) { const x = lx - 50 + i * 12.5, y = REFL[1] + 8 + 4 * Math.sin(i * 1.4 + t * 6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
  for (const s0 of TOUCH) ringOut(ctx, TP[0] + 4, TP[1] + 6, s0, t, 220, 1.8); ringOut(ctx, 1520, 960, 129.95, t, 200, 1.6); ringOut(ctx, 1520, 960, 131.46, t, 260, 1.4);
  if (t >= 129.6 && t < 129.95) shape(ctx, ell(TP[0] + 4, fallY(t, 129.6, 129.95, TP[1] + 4, 960), 5, 8, 10), '#9cc4ff', { lw: 2.5, seed: 4 });
  if (t >= 131.46 && t < 132.3) drops(ctx, TP[0], TP[1], (t - 131.46) * 1.4, 4, '#9cc4ff');
  // ears of hidden hares duck as the king's shadow passes; the squeak from B4
  for (const [x, i] of [[840, 0], [1330, 1], [1060, 2]]) if (t < 106.5) { const far = Math.abs(K8(t) + 60 - x) > 170; hareUp(ctx, { pal: 1, s: 0.46, seed: 60 + i, x, y: GR + 8, dir: -1, ears: 1 }, far ? 0.26 : 0.05); }
  if (t >= 142.04) hareUp(ctx, { pal: 1, s: 0.46, seed: 62, x: 1170, y: GR + 4, dir: 1, ears: 0.9, eyes: 'wide', mouth: 'o', gaze: [0.4, -1] }, 0.62 * B(t, 142.04, 0.15, 'out'));
  mounds(ctx, t); if (t >= 142.04 && t < 142.75) soundArcs(ctx, 1170, 850, 1, t); halftoneShadow(ctx, k.x + 40, GR + 6, 160, 0.28); elephantK(ctx, k); hare(ctx, hero89(t));
}
const S8 = { a: 102.85, b: 121.56, ww: LW, cam: [[102.85, { x: 1050, y: 757, zoom: 1.3 }], [103.4, { x: 1050, y: 757, zoom: 1.3 }], [104.4, { x: 1150, y: 757, zoom: 1.3 }], [105.4, { x: 1420, y: 757, zoom: 1.3 }], [106.6, { x: 1500, y: 757, zoom: 1.3 }], [107.14, { x: 1500, y: 757, zoom: 1.3 }], [109.9, { x: 1500, y: 492, zoom: 1.25 }], [111.9, { x: 1500, y: 492, zoom: 1.25 }], [113.4, { x: 1500, y: 690, zoom: 1.25 }], [116.14, { x: 1500, y: 690, zoom: 1.25 }], [116.7, { x: 1580, y: 800, zoom: 1.55 }]], draw: drawNight89,
  over(ctx, t, cam, S) {
    if (t >= 104.6 && t < 106.0) { ctx.save(); ctx.globalAlpha = K.clamp((106.0 - t) / 0.3); const [px, py] = toPanel(K8(t) + 120, 600, cam); sfx(ctx, 'TIP TOE', px, py, 60, B(t, 104.6, 0.2), { rot: -0.06, fill: C.white }); ctx.restore(); }
    if (t >= 117.4 && t < 118.9) { const a = toPanel(1715, 845, cam), b = toPanel(REFL[0] + 40, REFL[1] - 40, cam); ctx.save(); ctx.globalAlpha = K.clamp((118.9 - t) / 0.25); S.arrow(ctx, a, b, B(t, 117.4, 0.35, 'out'), { width: 14, bend: 0.2 }); ctx.restore(); }
    if (t >= 111.9 && t < 114.0) { const a = toPanel(MOON_N[0], MOON_N[1] + 95, cam), b = toPanel(REFL[0], REFL[1] - 70, cam); ctx.save(); ctx.globalAlpha = K.clamp((114.0 - t) / 0.3); S.arrow(ctx, a, b, B(t, 111.9, 1.0, 'inOut'), { width: 18, bend: 0 }); ctx.restore(); }
  } };
const S9 = { a: 121.56, b: 142.96, ww: LW, cam: [[121.56, { x: 1580, y: 800, zoom: 1.55 }], [123.1, { x: 1580, y: 800, zoom: 1.55 }], [124.4, { x: 1535, y: 880, zoom: 1.75 }], [133.9, { x: 1535, y: 880, zoom: 1.75 }], [134.5, { x: 1590, y: 790, zoom: 1.55 }], [139.28, { x: 1590, y: 790, zoom: 1.55 }], [139.9, { x: 1500, y: 720, zoom: 1.3 }], [140.7, { x: 1500, y: 720, zoom: 1.3 }], [142.5, { x: 1380, y: 720, zoom: 1.3 }]], draw: drawNight89,
  over(ctx, t, cam, S) {
    if (t >= 131.5 && t < 132.6) { const [px, py] = toPanel(1590, 870, cam); sfx(ctx, 'SPLISH!', px, py, 80, B(t, 131.5, 0.12), { rot: 0.1, fill: C.white }); }
    if (t >= 134.2 && t < 135.3) { const [px, py] = toPanel(1700, 640, cam); sfx(ctx, 'AAH!', px, py, 90, B(t, 134.2, 0.12), { rot: -0.1, fill: C.yellow }); }
  } };

// ================= S10: the king gathers his herd =================
function herd10(t) {
  const k = { ...KINGB, x: 1045, y: 902, dir: -1, flapEar: 0.3 }, cx = (tt) => kfn(tt, [[144.86, -300], [146.0, 420]]), sx = (tt) => kfn(tt, [[145.0, -520], [146.2, 210]]);
  const c = { ...COWB, y: 890, dir: 1, ...walk(cx, t), eyes: 'open' }, s = { ...SCOUTB, y: 896, dir: 1, ...walk(sx, t), tip: lurch(t, 146.2, 0.2), flapEar: 0.6 };
  k.sq = anticipate(t, 142.7, 0.26, 0.06); k.trunk = t < 144.0 ? blend(t, 142.8, 143.0, 0.1, 1) : blend(t, 144.0, 144.5, 1, 0.15); k.earUp = t < 144.5 ? 0.4 : 0.1; k.gaze = [-1, -0.1];
  if (t >= 146.0) { k.gaze = t < 146.6 ? [1, 0] : lookAt(elEye(k), elEye(c)); k.drop = blend(t, 146.6, 147.0, 0, 25); k.trunk = 0.4; k.reach = 0.4; }
  if (t >= 147.66) { k.trunk = 0.5; k.reach = blend(t, 147.66, 148.0, 0.4, 1); k.brow = 0.3; k.drop = 10; }
  if (t >= 149.4) { k.reach = blend(t, 149.4, 149.8, 1, 0.4); k.trunk = 0.3; k.gaze = lookAt(elEye(k), elEye(c)); }
  if (t >= 151.08 && t < 151.9) { k.gaze = [Math.sin((t - 151.08) * 9) > 0 ? -1 : -0.2, 0.2]; k.earOff = 0.15 * Math.sin((t - 151.08) * 9); }
  if (t >= 151.9) { k.trunk = blend(t, 151.9, 152.2, 0.3, 0.5) - blend(t, 152.44, 152.7, 0, 0.32); k.reach = 0; k.drop = blend(t, 151.9, 152.44, 10, 40); k.lid = t > 152.9 && t < 153.25 ? 1 : 0.15; k.brow = -0.4; k.wet = true; k.earUp = 0.15; k.noBlink = true; k.gaze = lookAt(elEye(k), [818, 858]); }
  k.talk = talk(t, [[148.23, 151.0]], 0.2) * 0.6;
  c.gaze = lookAt(elEye(c), elEye(k)); s.gaze = lookAt(elEye(s), elEye(k));
  if (t >= 147.9 && t < 149.4) { c.gaze = [-1, -0.2]; s.gaze = [-1, -0.2]; }
  if (t >= 149.14 && t < 150.3) s.tongue = true;
  if (t >= 150.3) { c.hbob = 6 * (pulse(t, 150.35, 0.3) + pulse(t, 150.7, 0.3)); s.gaze = [1, -0.1]; s.earUp = -0.2; }
  if (t >= 151.4) { s.gaze = [-1, 0.1]; s.lid = 0.3; }
  return { k, c, s };
}
function drawS10(ctx, t) {
  lakeBase(ctx, t, 'night', (c) => MO_N(c, t));
  moonReflection(ctx, { x: REFL[0], y: REFL[1], r: REFL[2], t, wobble: 0.1, alpha: 1 });
  const { k, c, s } = herd10(t); for (const P of [c, s, k]) { halftoneShadow(ctx, P.x + P.dir * 40 * P.s, GR + 6, 190 * P.s, 0.25); elephantK(ctx, P); }
  dustBurst(ctx, s.x + 60, GR, t - 146.2, 6, 6, 12, 36, 0.5, 3);
  if (t >= 142.96 && t < 144.3) soundArcs(ctx, ...elTrunk(k), -1, t);
  const touch = 152.7, kh = hops(t, [840, GR + 4], [[151.98, 0.28, 800, GR + 12, 24]]);
  const kit = { pal: 1, s: 0.38, seed: 9, x: kh.x, y: kh.y, sq: kh.sq * (t >= touch ? settleTo(t, touch, 1, 1.08, 0.3) : 1), dir: 1, ears: t < touch ? 0.5 : settleTo(t, touch, 0.5, 1.25, 0.3), earWig: t < touch ? 0.12 * Math.sin(t * 40) : 0, gaze: t < touch ? lookAt([812, 860], elEye(k)) : [0.6, -0.6], eyes: t < touch ? 'wide' : 'open', mouth: t > touch + 0.1 ? 'smile' : 'closed', lid: t > touch + 0.3 ? 0.3 : 0 };
  if (t >= 151.6 && t < 151.98) hareUp(ctx, kit, B(t, 151.6, 0.38, 'out'));
  mounds(ctx, t); if (t >= 151.98) hare(ctx, kit);
  if (t >= 149.14 && t < 150.6) cloud(ctx, 680, 400, 190, 120, C.white, B(t, 149.14, 0.4) * (1 - B(t, 150.4, 0.2)), { tail: [200, 270], inside: (c2) => { c2.save(); c2.fillStyle = '#2457b8'; c2.beginPath(); c2.ellipse(0, 40, 200, 70, 0, Math.PI, 0); c2.fill(); c2.fillStyle = GREEN; c2.fillRect(-200, 40, 400, 60); pond(c2, { x: -10, y: 62, w: 130, h: 30, level: 1, t }); c2.restore(); } });
}
const S10 = { a: 142.96, b: 153.4, ww: LW, cam: [[142.96, { x: 900, y: 690, zoom: 1.35 }], [145.5, { x: 900, y: 690, zoom: 1.35 }], [146.4, { x: 640, y: 615, zoom: 1.0 }], [147.66, { x: 640, y: 615, zoom: 1.0 }], [148.4, { x: 760, y: 680, zoom: 1.15 }], [152.2, { x: 760, y: 680, zoom: 1.15 }], [152.9, { x: 860, y: 820, zoom: 2.2 }]], draw: drawS10,
  over(ctx, t, cam, S) { if (t >= 149.3 && t < 150.5) { const a = toPanel(590, 410, cam), b = toPanel(670, 440, cam); S.arrow(ctx, [a[0] + 120, a[1] - 30], [b[0] - 60, b[1] + 10], B(t, 149.4, 0.4, 'out'), { width: 14, bend: 0.2 }); } } };

// ================= S11: dawn, the herd leaves, the hares come home =================
const RET = [['A', 1, 0.5, 51, 1560, 812, 156.52], ['M', 1, 0.5, 53, 1620, 905, 156.64], ['kit', 1, 0.38, 9, 1680, 985, 156.76], ['B', 1, 0.46, 57, 1720, 1132, 156.88], ['C', 1, 0.52, 56, 1760, 1300, 157.0], ['E', 1, 0.5, 55, 1800, 1215, 157.12], ['elder', 2, 0.62, 7, 1840, 1030, 157.35]];
const homeHops = (x0, x1, t0, per = 0.34) => { const n = Math.ceil(Math.abs(x1 - x0) / 175), L = []; for (let i = 0; i < n; i++) L.push([t0 + i * per, per * 0.9, K.lerp(x0, x1, (i + 1) / n), GR, 40]); return L; };
const KX11 = (tt) => kfn(tt, [[154.27, 445], [155.6, 385], [156.3, 385], [156.95, -110]]);
const KFALL11 = footfalls(KX11, 154.27, 157.0);
function herd11(t) {
  // v3: the king starts clear of the rock (left of it), walks left from رحلت (154.27), stops at 155.6, salutes against the sky on 155.84, exits left by about 156.9
  const kx = KX11, cx = (tt) => kfn(tt, [[153.4, 230], [155.9, -420]], 'lin'), sx = (tt) => kfn(tt, [[153.5, 40], [155.7, -380]], 'lin');
  const k = { ...KINGB, y: 902, dir: -1, ...walk(kx, t), crownSlip: 0.0 }, c = { ...COWB, y: 890, dir: -1, ...walk(cx, t) }, s = { ...SCOUTB, y: 896, dir: -1, ...walk(sx, t) };
  for (const P of [k, c, s]) P.amp *= 0.8; k.gaze = [-1, 0];
  if (t >= 155.6 && t < 156.45) { k.gaze = lookAt(elEye(k), [690, 560]); k.trunk = blend(t, 155.84, 156.05, 0, 1) * (1 - B(t, 156.3, 0.15)); k.reach = 0.3 * B(t, 155.84, 0.2); k.hbob = 8 * pulse(t, 156.0, 0.4); k.earUp = 0.4 * B(t, 155.7, 0.2); }
  return { k, c, s };
}
function retHare(t, R, i) {
  const [nm, pal, s, seed, x0, x1, t0] = R, L = homeHops(x0, x1, t0, nm === 'elder' ? 0.44 : 0.34), h = hops(t, [x0, GR], L), P = { pal, s, seed, x: h.x, y: h.y, sq: h.sq, dir: -1, ears: nm === 'elder' ? 0.5 : 1, mouth: 'closed' };
  const landed = t > L[L.length - 1][0] + L[L.length - 1][1];
  if (landed && t < 158.78) { P.gaze = [Math.sin(t * 2.2 + i) > 0 ? -1 : 1, 0.1]; P.sq *= 1 + 0.03 * Math.sin(t * 14) * pulse(t, 157.8 + i * 0.1, 0.5); }
  if (t >= 159.66 && nm !== 'elder') { const tb = 159.66 + i * 0.15; P.y -= 30 * pulse(t, tb, 0.32); P.sq = t > tb && t < tb + 0.32 ? 1.12 : P.sq; P.mouth = 'smile'; P.earWig = 0.2 * Math.sin(t * 13 + i); }
  if (t >= 162.12) P.gaze = lookAt(hHead(P), [900, 800]);
  if (t >= 166.9 && t < 168.8) { P.mouth = 'smile'; P.earWig = 0.25 * Math.sin(t * 22 + i); P.y -= 6 * Math.abs(Math.sin(t * 9 + i)); P.gaze = [1, 0.2]; P.lid = 0.3; }
  if (nm === 'elder') { P.tip = 0.06; P.nod = 0.12 * pulse(t, 163.3, 0.5); }
  return P;
}
function hero11(t) {
  const h = hops(t, [ROCK.top[0], ROCK.top[1]], [[162.12, 0.4, 770, GR, 40], [162.6, 0.35, 840, GR, 30], [163.0, 0.35, 900, GR, 25]]);
  const P = { pal: 0, s: 0.6, seed: 5, x: h.x, y: h.y, sq: h.sq, dir: t < 162.0 ? -1 : 1, ears: 1, gaze: [-1, 0.2], lid: 0.2 };
  if (t >= 154.8 && t < 155.9) { P.raise = 1.2; P.lid = t > 155.2 && t < 155.55 ? 1 : 0.25; }
  if (t >= 155.84 && t < 157) P.gaze = lookAt(hHead(P), elEye(herd11(t).k));
  if (t >= 157.0 && t < 162.1) { P.gaze = [1, 0.4]; P.mouth = 'smile'; }
  if (t >= 163.4) { P.gaze = [0.6, 0.2]; P.mouth = 'smile'; }
  if (t >= 163.68 && t < 164.6) { P.gaze = [0, 0.05]; P.lid = 0.3; }
  if (t >= 166.9) { P.earWig = 0.2 * Math.sin(t * 20); P.gaze = [1, 0.2]; }
  return P;
}
function drawS11(ctx, t) {
  const sy = kfn(t, [[153.4, 780], [164.9, 260]], 'out');
  lakeBase(ctx, t, 'dawn', (c) => sun(c, 1620, sy, t));
  if (t >= 164.9) { const pk = 166.5; moonReflection(ctx, { x: 1505, y: 978, r: 34, t, alpha: B(t, 164.9, 0.7) * 0.9, wobble: 0.04 + (t > pk ? 0.9 * Math.exp(-(t - pk) * 1.6) : 0), seed: 5 }); ringOut(ctx, 1470, 960, pk, t, 140, 1.4); }
  const { k, c, s } = herd11(t); for (const P of [c, s, k]) { halftoneShadow(ctx, P.x - 120 * P.s, GR + 6, 200 * P.s, 0.25); elephantK(ctx, P); }
  for (const f of KFALL11) dustBurst(ctx, f.x - 60, GR + 4, t - f.t, 4, 5, 10, 24, 0.45, Math.round(f.t * 10));
  // A and C dive into their whole burrows and pop back out
  const hs = RET.map((R, i) => retHare(t, R, i)), A = hs[0], Cc = hs[4];
  for (const [P, x] of [[A, 840], [Cc, 1330]]) if (t >= 158.78 && t < 159.9) { hareUp(ctx, { ...P, x }, t < 159.66 ? 1 - B(t, 158.8, 0.15) : B(t, 159.66, 0.18)); }
  mounds(ctx, t);
  hs.forEach((P, i) => { if ((i === 0 || i === 4) && t >= 158.78 && t < 159.9) return; if (RET[i][0] === 'kit') return; hare(ctx, P); });
  // digging dust at B2 and B4
  for (const x of [930, 1150]) for (let d = 158.8; d < 159.6; d += 0.2) dustBurst(ctx, x + 30, GR, t - d, 4, 5, 10, 30, 0.35, Math.round(d * 10));
  for (const [tr, x] of [[161.0, 950], [161.4, 1060], [161.8, 1170]]) if (t >= tr && t < tr + 0.6) star(ctx, x + 40, 840 - 30 * B(t, tr, 0.5), 22 * K.ease.back(B(t, tr, 0.25)) * (1 - B(t, tr + 0.35, 0.25)), C.white, t);
  // the kit: home, hugs the hero, then off to poke the sun on the water
  const kitR = retHare(t, RET[2], 2), kh = hops(t, [985, GR], [[163.15, 0.3, 930, GR, 20], [165.4, 0.35, 1100, GR, 30], [165.8, 0.35, 1270, GR, 30], [166.2, 0.3, 1430, 905, 24], [166.7, 0.25, 1400, 905, 16]]);
  const kit = t < 163.15 ? kitR : { ...kitR, x: kh.x, y: kh.y, sq: kh.sq, dir: t < 165.3 ? -1 : 1 };
  if (t >= 163.45 && t < 165.3) { kit.tip = -0.15; kit.lid = 0.5; kit.mouth = 'smile'; }
  if (t >= 166.4 && t < 166.7) { kit.raise = -0.5; kit.tip = 0.12; kit.gaze = [0.6, 0.6]; }
  if (t >= 166.7) { kit.sq = t < 166.95 ? 0.9 : kit.sq; kit.dir = 1; kit.mouth = 'smile'; kit.talk = t > 167 ? 0.4 + 0.4 * Math.abs(Math.sin(t * 14)) : 0; kit.eyes = t < 167 ? 'wide' : 'open'; }
  hare(ctx, kit); hare(ctx, hero11(t));
}
const S11 = { a: 153.4, b: 168.8, ww: LW, cam: [[153.4, { x: 520, y: 640, zoom: 1.1 }], [156.9, { x: 520, y: 640, zoom: 1.1 }], [157.6, { x: 1000, y: 740, zoom: 1.45 }], [162.8, { x: 1000, y: 720, zoom: 1.4 }], [163.6, { x: 1250, y: 660, zoom: 1.1 }]], draw: drawS11,
  over(ctx, t, cam, S) {
    if (t >= 160.7 && t < 163.0) { ctx.save(); ctx.globalAlpha = K.clamp((163.0 - t) / 0.3); const v = t < 161.0 ? 2 : t < 161.4 ? 3 : t < 161.8 ? 4 : 5; S.label(ctx, 'SAFE HOMES', 180, 120, B(t, 160.7, 0.3), { align: 'center', size: 40, fill: C.white }); S.counter(ctx, v, 180, 280, B(t, 160.75, 0.3), { size: 100, seed: 77 + v }); ctx.restore(); }
    if (t >= 161.0 && t < 162.3) { ctx.save(); ctx.globalAlpha = K.clamp((162.3 - t) / 0.3); sfx(ctx, 'SAFE!', 640, 260, 96, B(t, 161.0, 0.15), { rot: -0.08, fill: C.yellow }); ctx.restore(); }
    if (t >= 164.9) S.title(ctx, 'THE END', 500, 190, B(t, 164.9, 0.8), { size: 80, align: 'center' });
    if (t >= 167.0) { const [px, py] = toPanel(1300, 700, cam); sfx(ctx, 'HA HA!', px, py, 70, B(t, 167.0, 0.15), { rot: 0.08, fill: C.white }); }
  } };
