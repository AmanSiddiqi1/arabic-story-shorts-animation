// ===== AN-145 scenes S1-S6: arrival, the wall, the rumour, the order, the strikes, the time-lapse of costs =====
const M5_CAL = { costume: 'caliph', age: 0.35, seed: 11 }, M5_VIZ = { costume: 'vizier', age: 0.6, seed: 17 };
const M5_W1 = { costume: 'villager', age: 0.1, seed: 31 }, M5_W2 = { costume: 'servant', seed: 37 }, M5_W3 = { costume: 'carpenter', age: 0.55, seed: 41 };
const M5_X = [690, 815];   // the chalk X on the dig block
// S5/S6 working places: tip of the pick lands on the dig block (see notes.md)
const M5_WK = { w1: [527, 905, 1, 0.75], w3: [850, 915, -1, 0.78], w2: [960, 935, -1, 0.75] };
function m5Dust(ctx, falls, t, s = 0.5, gy = 900) { for (const f of falls) dustBurst(ctx, f.x + (f.odd ? 60 : -40) * s, gy - 2, t - f.t, 4, 6 * s * 2, 12 * s * 2, 40 * s * 2, 0.5, Math.round(f.t * 10)); }
function m5Spark(ctx, x, y, t, t0, s = 1) { const d = t - t0; if (d < 0 || d > 0.45) return; const u = d / 0.45, r = K.rng(Math.round(t0 * 100));
  ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const a = -Math.PI * (0.1 + 0.8 * r()), l = (30 + 40 * r()) * s; ctx.globalAlpha = 1 - u; ctx.lineWidth = 6 * s; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * l * u * 0.4, y + Math.sin(a) * l * u * 0.4); ctx.lineTo(x + Math.cos(a) * l * (0.4 + u), y + Math.sin(a) * l * (0.4 + u)); ctx.stroke(); ctx.lineWidth = 3 * s; ctx.strokeStyle = C.yellow; ctx.stroke(); }
  for (let i = 0; i < 3; i++) { const vx = (r() - 0.5) * 220 * s, vy = -160 * s - r() * 120 * s, x2 = x + vx * d, y2 = y + vy * d + 700 * s * d * d; shape(ctx, [[x2 - 6 * s, y2], [x2, y2 - 7 * s], [x2 + 6 * s, y2 + 1], [x2, y2 + 6 * s]], M5_STONE, { lw: 2.5, seed: 700 + i }); } ctx.restore(); }

// ---------- S1 arrival (0 - 9.06) ----------
const M5_S1X = (t) => K.lerp(-150, 240, K.ease.out(K.clamp((t - 2.2) / 3.2)));
const M5_S1V = (t) => K.lerp(-330, 60, K.ease.out(K.clamp((t - 2.9) / 2.75)));
const M5_S1F = footfalls(M5_S1X, 2.2, 5.6, GAIT.horse * 0.5), M5_S1G = footfalls(M5_S1V, 2.9, 5.8, GAIT.horse * 0.5);
function m5S1(ctx, t) {
  m5Far(ctx, { u: 0.22, t, extra: (c) => { // heat shimmer
    c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(255,250,240,0.55)'; for (let i = 0; i < 5; i++) { const y = 950 + i * 45, x0 = ((t * 30 + i * 230) % 1200) - 200; c.beginPath(); for (let k = 0; k <= 12; k++) c.lineTo(x0 + k * 12, y + 4 * Math.sin(k * 1.3 + t * 6 + i)); c.stroke(); } c.restore(); } });
  m5Dust(ctx, M5_S1G, t); m5Dust(ctx, M5_S1F, t);
  // vizier on the bay, one length behind
  const V = { ...walk(M5_S1V, t, { stride: GAIT.horse * 0.5 }), y: 900, s: 0.5, pal: 1, dir: 1, earL: 0.6, earR: 0.6, tailSwish: Math.sin(t * 2.3) * 0.5 };
  V.headDown = 0.6 * M5B(t, 7.95, 0.6); if (t > 5.6) { V.earL = 1; V.earR = 0.8; }
  const vz = { ...M5_VIZ, lurch: lurch(t, 5.62, 0.2), lid: 0.2, mouth: t > 7.88 ? 'o' : 'closed', gaze: t < 7.88 ? lookAt([M5_S1V(t) + 20, 760], [M5_S1X(t), 770]) : [0.5, -1] };
  if (t > 7.88) vz.brow = -0.5; m5Blink(vz, t, 17, vz.lid);
  rideOn(ctx, 'horse', V, vz);
  // the caliph on the white horse
  const Hc = { ...walk(M5_S1X, t, { stride: GAIT.horse * 0.5 }), y: 900, s: 0.5, dir: 1, earL: 0.5 + 0.5 * M5B(t, 4.6, 0.4), earR: 0.4 + 0.6 * M5B(t, 4.7, 0.4), tailSwish: swing(t, 5.4, 0.9, 1.2, 1.4) + 0.3 * Math.sin(t * 2) };
  const cg = t < 5.78 ? [1, -0.1] : (() => { const u = M5B(t, 5.78, 1.2); return [K.lerp(1, 0.6, u), K.lerp(-0.1, -1, u)]; })();
  const cp = { ...M5_CAL, lurch: lurch(t, 5.4, 0.24), gaze: cg, mouth: 'smile', brow: -0.6 * M5B(t, 5.9, 0.4), drop: -4 * M5B(t, 5.9, 0.6), tilt: -0.08 * M5B(t, 6.0, 0.8) };
  if (t > 6.2) cp.mouth = 'o';
  rideOn(ctx, 'horse', Hc, cp);
}
function m5O1(ctx, t, cam, S, P) {
  if (t < 2.7) { const off = -1300 * M5B(t, 2.05, 0.5, 'in'); ctx.save(); ctx.translate(off, 0); S.title(ctx, 'AL-MAAMUN AND', 500, 240, M5B(t, 0.3, 0.7), { size: 64, align: 'center' }); S.title(ctx, 'THE PYRAMIDS', 500, 330, M5B(t, 0.5, 0.7), { size: 72, align: 'center' }); ctx.restore(); }
  if (m5In(t, 5.16, 8.9)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 5.16, 8.9, 0.25); const [x, y] = P(330, 1010); S.label(ctx, 'EGYPT', x, y, M5B(t, 5.16, 0.35), { size: 54, align: 'center' }); S.arrow(ctx, [x - 10, y - 30 * cam.zoom], P(300, 915), M5B(t, 5.3, 0.4), { width: 16, bend: 0.2 }); ctx.restore(); }
}

// ---------- S2 the wall (9.06 - 13.10) ----------
function m5S2(ctx, t) {
  m5Face(ctx, { t, u: 0.24 });
  const tipB = -0.06 * M5B(t, 11.7, 0.6);
  // vizier in front of the first block, facing his master; raps the stone behind him
  const V = { ...M5_VIZ, x: 410, y: 915, s: 0.75, dir: -1, tip: tipB, mouth: 'closed' };
  V.handR = M5H.ledgerR; V.handL = m5Tr(t, [[0, M5H.lowL], [10.9, [-70, -150], 0.2], [11.15, [-62, -146], 0.06], [11.25, [-70, -150], 0.06], [11.35, [-62, -146], 0.06], [11.45, [-30, -120], 0.2]]);
  if (m5In(t, 11.45, 11.9)) V.handL = [V.handL[0] + tremble(t, 4, 11), V.handL[1]];
  V.gaze = m5Look(t, V, [[0, [250, 720]], [10.9, [470, 780]], [11.5, [450, 800]], [11.9, [470, 300]]]);
  if (m5In(t, 11.4, 11.9)) { V.mouth = 'frown'; V.brow = 0.5; }
  m5Blink(V, t, 17, m5In(t, 11.38, 11.52) ? 0.6 : 0);
  // the caliph: thrown back, then measures himself against the block
  const cx = m5Tr(t, [[0, 250], [9.1, 228, 0.35], [10.1, 268, 0.6]]);
  const P = { ...M5_CAL, x: cx, y: 905, s: 0.8, dir: 1, ph: (cx - 228) / 9, amp: m5In(t, 10.1, 10.7) ? 0.8 : 0, mouth: t < 10.0 ? 'o' : 'closed', eyes: t < 9.9 ? 'wide' : undefined, tip: tipB };
  P.sq = settleTo(t, 9.06, 1, 0.94, 0.25) * (t > 9.5 ? K.lerp(0.94, 1, M5B(t, 9.5, 0.3)) / 0.94 : 1);
  P.handL = m5Tr(t, [[0, M5H.hipL], [9.06, M5H.wideL, 0.2], [10.0, M5H.hipL, 0.4], [12.2, [-10, -236], 0.4]]);
  P.handR = m5Tr(t, [[0, M5H.hipR], [9.06, M5H.wideR, 0.2], [10.1, [24, -226], 0.35], [10.5, [64, -226], 0.4], [11.2, M5H.hipR, 0.4]]);
  P.gaze = t < 10.04 ? [0.5, -0.9] : t < 12.0 ? m5Look(t, P, [[10.04, [420, 735]], [10.35, [300, 720]], [10.6, [420, 735]], [11.0, [310, 760]], [11.6, [560, 300]]], 0.07) : [0.2, -1];
  if (t > 12.2) { P.mouth = 'smile'; P.drop = -4; } P.brow = -0.5;
  person(ctx, V); m5Ledger(ctx, ...m5Hand(V, 'R'), { open: 0, s: 0.5 });
  person(ctx, P);
  if (m5In(t, 11.1, 11.5)) { const k = m5Hand(V, 'L'); [0, 1, 2].forEach((i) => { const a = -0.6 + i * 0.6; seg(ctx, k[0] + 14 * Math.cos(a), k[1] + 14 * Math.sin(a) - 6, k[0] + 30 * Math.cos(a), k[1] + 30 * Math.sin(a) - 6, 3, C.black, 0); }); }
}
function m5O2(ctx, t, cam, S, P) {
  if (m5In(t, 10.84, 12.0)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 10.84, 12.0, 0.2); const a = P(290, 900), b = P(290, 730), k = M5B(t, 10.84, 0.35); S.arrow(ctx, [a[0], (a[1] + b[1]) / 2], [b[0], K.lerp((a[1] + b[1]) / 2, b[1], k)], 1, { width: 14, bend: 0 }); S.arrow(ctx, [a[0], (a[1] + b[1]) / 2], [a[0], K.lerp((a[1] + b[1]) / 2, a[1], k)], 1, { width: 14, bend: 0 }); ctx.restore(); }
  if (m5In(t, 11.1, 11.7)) { const [x, y] = P(430, 815); S.emphasis(ctx, x, y, 150 * cam.zoom, M5B(t, 11.1, 0.3) * 0.2, { ry: 0.7, seed: 4 }); }
  if (m5In(t, 11.7, 13.1)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 11.7, 13.1, 0.15); const a = P(205, 640), b = P(380, -60); S.arrow(ctx, a, [K.lerp(a[0], b[0], 1), K.lerp(a[1], b[1], 1)], M5B(t, 11.7, 1.2, 'in'), { width: 26, bend: 0.05 }); ctx.restore(); }
}

// ---------- S3 the rumour (13.10 - 21.80) ----------
function m5S3(ctx, t) {
  m5Face(ctx, { t, u: 0.24, xMark: 0 });
  // vizier at the left
  const V = { ...M5_VIZ, x: 110, y: 910, s: 0.75, dir: 1, handR: M5H.ledgerR, handL: M5H.lowL };
  V.gaze = m5Look(t, V, [[0, [520, 760]], [20.9, [250, 730]], [21.2, [690, 800]], [21.5, m5Hand(V, 'R')]], 0.12);
  V.brow = t > 20.9 ? -0.7 : -0.2; V.drop = 4 * m5Pulse(t, 21.55, 0.3); V.mouth = t > 20.9 ? 'frown' : 'closed';
  // gossip and w1
  const G = { costume: 'villageWoman', seed: 51, x: 520, y: 915, s: 0.72, dir: 1, tip: 0.08 * m5Win(t, 14.2, 15.2, 0.2) };
  G.handR = m5Tr(t, [[0, M5H.lowR], [14.2, PERSON_HANDS.cupMouth.R, 0.2], [15.2, M5H.lowR, 0.3], [16.86, PERSON_HANDS.hush.R, 0.2], [17.95, M5H.lowR, 0.3]]); G.handL = M5H.lowL;
  G.talk = talk(t, [[14.3, 15.1]]) * 0.8 + talk(t, [[16.0, 16.8]]) * 0.5;
  G.gaze = m5Look(t, G, [[0, [640, 740]], [14.7, [600, 300]], [14.95, [640, 740]], [17.1, [200, 780]], [17.5, [900, 780]], [17.9, [640, 740]]], 0.15); m5Blink(G, t, 51, m5In(t, 17.0, 17.9) ? 0.4 : 0);
  const W = { ...M5_W1, x: 640, y: 915, s: 0.75, dir: -1, eyes: m5In(t, 14.92, 16.0) ? 'wide' : undefined, brow: -0.5 };
  W.drop = 6 * (m5Pulse(t, 14.95, 0.2) + m5Pulse(t, 15.2, 0.2) + m5Pulse(t, 15.45, 0.2));
  W.handL = m5Tr(t, [[0, M5H.lowL], [15.2, [-60, -170], 0.25], [16.0, M5H.lowL, 0.3]]); W.handR = M5H.lowR;
  W.gaze = m5Look(t, W, [[0, [520, 740]], [15.3, [760, 640]], [15.7, [520, 740]], [17.1, [900, 780]], [17.5, [200, 780]], [17.9, [520, 740]]], 0.15); m5Blink(W, t, 31, m5In(t, 17.0, 17.9) ? 0.4 : 0);
  // the caliph: freezes, cups his ear, then turns to the wall and strokes his beard
  const turn = turnFlip(t, [[0, -1], [18.6, 1]], 0.5);
  const P = { ...M5_CAL, x: 250, y: 905, s: 0.8, dir: turn.dir, ph: 0.9, amp: t < 18.6 ? 0.5 : 0, brow: t > 18.6 ? -0.4 : -0.2 };
  P.tilt = 0.08 * m5Win(t, 13.6, 18.4, 0.3);
  P.handL = t < 18.6 ? m5Tr(t, [[0, M5H.hipL], [13.3, [-42, -200], 0.3]]) : M5H.hipL;
  P.handR = t < 18.6 ? M5H.hipR : [16 + 4 * Math.sin(t * 9), -160 + 6 * Math.sin(t * 4.5)];
  P.gaze = t < 13.3 ? [-1, 0] : t < 18.6 ? (() => { const u = M5B(t, 13.3, 0.3); return [K.lerp(-1, 1, u), 0.1]; })() : m5Look(t, P, [[18.6, [690, 815]]]);
  P.mouth = t > 19.3 ? 'smile' : 'closed'; m5Blink(P, t, 11, t > 18.8 ? 0.3 : 0);
  P.sq = anticipate(t, 21.5, 0.3, 0.06);
  person(ctx, V); m5Ledger(ctx, ...m5Hand(V, 'R'), { open: 0, s: 0.5 });
  person(ctx, P); person(ctx, G); person(ctx, W);
  // picture balloon: a pyramid with coins hidden inside
  if (m5In(t, 16.0, 19.6)) { const p = M5B(t, 16.0, 0.4, 'lin') * (1 - M5B(t, 19.2, 0.35)); const k = K.ease.back(K.clamp(p * 1.4)); if (k > 0) { const bx = 545, by = 540, h = m5Head(G);
    ctx.save(); ctx.translate(bx, by); ctx.scale(k, k); const pts = ell(0, 0, 150, 105, 40); shape(ctx, [[-30, 90], [h[0] - bx - 10, h[1] - by - 40], [24, 96]], C.white, { lw: 5, seed: 710 }); shape(ctx, pts, C.white, { lw: 7, seed: 711 });
    shape(ctx, [[-90, 70], [0, -70], [90, 70]], M5_STONE, { lw: 6, seed: 712, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); m5Glow(ctx, 0, 48, 34, 0.7); m5Mound(ctx, 0, 62, 60, 1, { seed: 4 });
    if (t > 17.92) { ctx.save(); ctx.setLineDash([8, 6]); ctx.lineWidth = 5; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(0, -78); ctx.lineTo(0, K.lerp(-78, 36, M5B(t, 17.92, 0.5))); ctx.stroke(); ctx.restore(); shape(ctx, [[-8, K.lerp(-78, 36, M5B(t, 17.92, 0.5)) - 6], [8, K.lerp(-78, 36, M5B(t, 17.92, 0.5)) - 6], [0, K.lerp(-78, 36, M5B(t, 17.92, 0.5)) + 8]], C.red, { lw: 3, seed: 713 }); }
    ctx.restore(); } }
  if (t > 20.14) { const pu = 1 + 0.12 * (m5Pulse(t, 20.5, 0.3) + m5Pulse(t, 20.85, 0.3)); ctx.save(); ctx.translate(700, 610); ctx.scale(pu, pu); m5Q(ctx, 0, 0, 130, M5B(t, 20.14, 0.35)); ctx.restore(); }
}

// ---------- S4 the order (21.80 - 32.96) ----------
const M5_S4W3 = (t) => m5Tr(t, [[0, 1100], [29.4, M5_WK.w3[0], 1.8]]), M5_S4W1 = (t) => m5Tr(t, [[0, 1180], [29.6, M5_WK.w1[0], 1.7]]), M5_S4W2 = (t) => m5Tr(t, [[0, 1150], [30.2, M5_WK.w2[0], 1.5]]);
const M5_S4F = [footfalls(M5_S4W3, 29.4, 31.3, 13 * Math.PI / 2), footfalls(M5_S4W1, 29.6, 31.4, 13 * Math.PI / 2), footfalls(M5_S4W2, 30.2, 31.8, 13 * Math.PI / 2)];
function m5Worker(t, base, xf, y, s, dir, seed) { const W = { ...base, ...m5Walk(xf, t, 13), y, s, dir: Math.abs(speed(xf, t)) > 5 ? -1 : dir }; return W; }
function m5S4(ctx, t) {
  m5Face(ctx, { t, u: 0.24, xMark: M5B(t, 24.6, 0.8, 'lin'), outline: M5B(t, 26.94, 2.0, 'lin') });
  const V = { ...M5_VIZ, x: 100, y: 910, s: 0.75, dir: 1, handL: M5H.lowL, mouth: m5In(t, 27.9, 29.4) ? 'o' : 'closed', brow: t > 27.72 ? -0.8 : -0.3 };
  V.handR = t < 27.72 ? M5H.ledgerR : t < 29.0 ? [62 + 18 * Math.sin((t - 27.72) * 14), -200 + 14 * Math.cos((t - 27.72) * 14)] : m5Tr(t, [[29.0, [62, -200]], [29.2, M5H.ledgerR, 0.4]]);
  V.gaze = t < 27.72 ? m5Look(t, V, [[21.8, [230, 720]], [24.2, [690, 815]], [25.2, [230, 720]]]) : t < 28.6 ? lookAt(m5Head(V), [600 + 300 * Math.sin((t - 27.72) * 3), 300 + 400 * ((t - 27.72) / 0.9)]) : t < 29.1 ? [0, 0.05] : m5Look(t, V, [[29.1, [900, 800]]]);
  m5Blink(V, t, 17);
  const P = { ...M5_CAL, x: 230, y: 905, s: 0.8, dir: 1, brow: t < 25.64 ? 0.6 : 0.2, eyes: m5In(t, 25.64, 26.9) ? 'wide' : undefined };
  P.sq = (t < 22.0 ? anticipate(t, 21.5, 0.5, 0.06) : 1) * (1 + 0.02 * m5Pulse(t, 25.7, 1.0)); P.tip = -0.05 * m5Win(t, 25.64, 27.4, 0.3);
  P.talk = talk(t, [[23.44, 24.1], [31.3, 32.0]]) * 0.8;
  const sweep = M5B(t, 25.64, 1.1); P.aR = t < 25.64 ? null : [K.lerp(1.6, 3.0, sweep) - 0.25 * Math.sin(Math.PI * sweep), K.lerp(1.7, 3.05, sweep)];
  if (t >= 27.2) P.aR = null;
  if (!P.aR) P.handR = m5Tr(t, [[0, M5H.hipR], [21.85, M5H.pointR, 0.3], [27.2, M5H.hipR, 0.5], [31.28, M5H.clapR, 0.12], [31.45, [30, -140], 0.1], [31.6, M5H.clapR, 0.1], [31.75, M5H.pointR, 0.25]]);
  P.handL = m5Tr(t, [[0, M5H.hipL], [31.28, M5H.clapL, 0.12], [31.45, [-30, -140], 0.1], [31.6, M5H.clapL, 0.1], [31.75, M5H.hipL, 0.3]]);
  P.gaze = m5Look(t, P, [[0, M5_X], [25.64, [700, 300]], [27.2, [800, 600]], [29.5, [900, 760]], [31.28, M5_X]]); m5Blink(P, t, 11);
  person(ctx, V); m5Ledger(ctx, ...m5Hand(V, 'L'), { open: 1, s: 0.42, fill: 0.2, rot: -0.2 });
  if (t < 28.9) m5Pen(ctx, ...m5Hand(V, 'R')); else { const u = K.clamp((t - 28.9) / 0.35), h = [m5Hand(V, 'R')[0], 0]; m5Pen(ctx, 160 + 10 * u, K.lerp(V.y - 150, 912, u * u), -0.6 + 2.5 * u); }
  person(ctx, P);
  if (m5In(t, 31.28, 31.75)) { const h = m5Hand(P, 'R'); [0.9, -0.2].forEach((a, i) => { const k = m5Pulse(t, 31.32 + i * 0.32, 0.15); if (k > 0) star(ctx, h[0] - 6, h[1] - 18, 16 * k, C.white, a); }); }
  // workers walk in; w2 drags his shovel
  for (const f of M5_S4F) m5Dust(ctx, f, t, 0.75, 915);
  const ws = [['w3', M5_W3, M5_S4W3, 32.12, 1], ['w1', M5_W1, M5_S4W1, 32.0, 1], ['w2', M5_W2, M5_S4W2, 32.25, 0.7]].map(([k, base, xf, tr, top]) => { const [x, y, dir, s] = M5_WK[k]; const W = m5Worker(t, base, xf, y, s, dir, 0); W.brow = 0; return [k, W, tr, top]; });
  ws.sort((a, b) => a[1].y - b[1].y).forEach(([k, W, tr, top]) => {
    let ang;
    if (k === 'w2') { W.lid = 0.3; W.gaze = [0, 0.8]; W.mouth = 'frown'; }
    else { W.gaze = m5Look(t, W, [[0, [230, 720]], [31.75, M5_X]]); if (k === 'w1') { W.mouth = 'smile'; W.sq = landSquash(t, 31.3, 0.1); } }
    if (t < tr - 0.3) { if (k === 'w2') { W.handL = [-50, -96]; W.handR = M5H.lowR; } else { W.handR = [24, -168]; W.handL = M5H.lowL; } }
    else { W.sq = (W.sq || 1) * anticipate(t, tr - 0.3, 0.3, 0.08); ang = m5StrikePose(W, top * M5B(t, tr, 0.45)); }
    m5Blink(W, t, W.seed, W.lid || 0); person(ctx, W);
    if (k === 'w2') { if (t < tr - 0.3) { const h = m5Hand(W, 'L'); m5Shovel(ctx, h[0], h[1], -Math.PI + 0.55 * (W.dir || 1), 0.75); if (t > 30.2) { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#a8741a'; ctx.beginPath(); ctx.moveTo(h[0] + 110, 945); ctx.lineTo(1010, 945); ctx.stroke(); ctx.restore(); } } else m5Pick(ctx, ...m5Hand(W, 'R'), ang, 0.75); }
    else if (t < tr - 0.3) { const h = m5Hand(W, 'R'); m5Pick(ctx, h[0], h[1], W.dir > 0 ? -2.5 : -0.64, 0.75); } else m5Pick(ctx, ...m5Hand(W, 'R'), ang, 0.75);
  });
}
function m5O4(ctx, t, cam, S, P) {
  if (m5In(t, 23.2, 25.0)) { const [x, y] = P(250, 600); ctx.save(); ctx.globalAlpha = m5Fade(t, 23.2, 25.0, 0.2); sfx(ctx, 'OPEN IT!', x, y, 84, M5B(t, 23.3, 0.3), { rot: -0.05 }); ctx.restore(); }
  if (m5In(t, 24.14, 26.2)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 24.14, 26.2, 0.2); S.arrow(ctx, P(330, 760), P(640, 800), M5B(t, 24.14, 0.5), { width: 20, color: C.red, bend: -0.2 }); ctx.restore(); }
}

// ---------- S5 the strikes (32.96 - 43.20) ----------
const M5_HIT = { w1: [34.76, 39.42], w3: [35.44], w2: [36.5] };
function m5S5(ctx, t) {
  const dig = 0.08 * M5B(t, 34.76, 0.1) + 0.04 * M5B(t, 35.44, 0.1) + 0.03 * M5B(t, 36.5, 0.1) + 0.02 * M5B(t, 39.42, 0.1);
  m5Face(ctx, { t, u: 0.24, xMark: 1, dig });
  // caliph and vizier (seen after the pull-out)
  const V = { ...M5_VIZ, x: 100, y: 910, s: 0.75, dir: 1, handL: [-14, -116], handR: M5H.ledgerR, brow: -0.4, mouth: 'frown' };
  V.gaze = m5Look(t, V, [[0, M5_X], [41.6, M5_X], [42.1, [230, 720]], [42.6, M5_X]]); m5Blink(V, t, 17);
  const P = { ...M5_CAL, x: 230, y: 905, s: 0.8, dir: 1, handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, brow: 0.7, mouth: 'frown' };
  const tap = t > 40.6 ? Math.max(0, Math.sin((t - 40.6) * Math.PI / 0.4)) : 0; P.ph = 1.2; P.amp = 0.25 * tap;
  P.gaze = m5Look(t, P, [[0, M5_X], [41.04, [500, 130]], [41.8, M5_X], [42.4, [100, 720]], [42.8, M5_X]]); m5Blink(P, t, 11);
  person(ctx, V); m5Ledger(ctx, ...m5Hand(V, 'L'), { open: 1, s: 0.42, fill: 0.3, rot: -0.2 }); person(ctx, P);
  // workers
  const order = ['w1', 'w3', 'w2'], lookTimes = { w1: 41.9, w3: 42.05, w2: 42.2 };
  for (const k of order) { const [x, y, dir, s] = M5_WK[k], base = k === 'w1' ? M5_W1 : k === 'w2' ? M5_W2 : M5_W3; const W = { ...base, x, y, s, dir }; let ang, bend = 0, holdUp = false;
    if (k === 'w1') { const st = m5Strike(t, M5_HIT.w1, { lift: t > 38 ? 0.9 : 0.45, top: t > 38 ? 0.75 : 1 }); ang = m5StrikePose(W, t < 33.6 ? 0.98 : st.r); if (st.contact != null && st.contact < 0.4) { W.x += tremble(t, 3, 14) * K.clamp(1 - st.contact / 0.4); W.lid = st.contact < 0.1 ? 1 : 0; W.mouth = 'open'; }
      if (t > 38.8) { W.lid = Math.max(W.lid || 0, 0.3); } W.gaze = m5Look(t, W, [[0, M5_X], [lookTimes.w1, [850, 760]], [42.5, [230, 720]]]); }
    if (k === 'w3') { const st = m5Strike(t, M5_HIT.w3, { rest: 0.1 }); let r = t < 33.6 ? 0.98 : st.r; if (st.contact != null) { r = Math.max(r, 1.1 * Math.exp(-st.contact * 3) * K.clamp(st.contact / 0.15)); W.x += 26 * M5B(t, 35.5, 0.4); W.sq = st.contact < 0.3 ? 1.06 : 1; W.eyes = st.contact < 0.8 ? 'wide' : undefined; }
      if (t > 39.58) { r = 0.05; ang = m5StrikePose(W, r); W.handL = null; W.aL = null; W.handL = [8, -214 + 4 * Math.sin(t * 8)]; ang = W.dir > 0 ? 1.45 : Math.PI - 1.45; W.aR = [0.5, 0.8]; W.sq = breathe(t, 3, 0.03); W.lid = m5Pulse(t, 39.8, 0.6) * 0.9; }
      else ang = m5StrikePose(W, r);
      W.gaze = m5Look(t, W, [[0, M5_X], [lookTimes.w3, [527, 720]], [42.5, [230, 720]]]); }
    if (k === 'w2') { const st = m5Strike(t, M5_HIT.w2, { top: 0.85 }); let r = t < 33.6 ? 0.7 : st.r;
      if (st.contact != null) { bend = M5B(t, 36.52, 0.3, 'out'); if (t > 36.75) { holdUp = true; r = K.lerp(st.r, 0.55, M5B(t, 36.75, 0.3)); } W.gaze = t < 37.0 ? [0, -0.9] : t < 37.7 ? m5Look(t, W, [[37.0, [900, 600]]]) : [0, 0.05]; W.lid = m5Pulse(t, 37.0, 0.5) * 0.9; }
      ang = m5StrikePose(W, r); if (holdUp) ang = W.dir > 0 ? -1.2 : Math.PI + 1.2;
      if (t > 40.2) { W.sit = M5B(t, 40.2, 0.5); W.seat = 'floor'; W.aL = null; W.aR = null; W.handL = M5H.lowL; W.handR = [40, -96]; W.lid = 0.6; W.mouth = 'frown'; W.gaze = m5Look(t, W, [[40.2, [960, 1000]], [lookTimes.w2, [850, 760]]]); } }
    if (k !== 'w2' || t < 40.2) m5Blink(W, t, W.seed, W.lid || 0);
    person(ctx, W);
    if (k === 'w2' && t > 40.2) m5Pick(ctx, W.x - 90, 930, -0.1, 0.75, 1);
    else m5Pick(ctx, ...m5Hand(W, 'R'), ang, 0.75, bend);
    if (k === 'w1' && t > 38.9 && t < 41) drops(ctx, m5Head(W)[0] + 30, m5Head(W)[1] - 20, t, 1); }
  m5Spark(ctx, 690, 833, t, 34.76); m5Spark(ctx, 687, 843, t, 35.44); m5Spark(ctx, 797, 868, t, 36.5, 0.7); m5Spark(ctx, 690, 840, t, 39.42, 0.6);
}
function m5O5(ctx, t, cam, S, P) {
  if (m5In(t, 35.44, 36.4)) { const [x, y] = P(760, 640); ctx.save(); ctx.globalAlpha = m5Fade(t, 35.44, 36.4, 0.15); sfx(ctx, 'CLANG!', x, y, 92, M5B(t, 35.44, 0.2), { rot: 0.08, fill: C.white }); ctx.restore(); }
  if (m5In(t, 37.38, 43.2)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 37.38, 43.2, 0.25); const k = m5Pop(t, 37.38, 0.3); ctx.translate(500, 140); ctx.scale(k, k);
    shape(ctx, K.rectPts(-210, -28, 420, 56), C.white, { lw: 7, seed: 720 }); const f = 0.03 * M5B(t, 37.7, 0.9, 'out'); shape(ctx, K.rectPts(-206, -24, Math.max(4, 412 * f), 48), C.red, { lw: 0 });
    ctx.font = K.font(46, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.strokeText(Math.round(f * 100) + '%', 222, 4); ctx.fillStyle = C.yellow; ctx.fillText(Math.round(f * 100) + '%', 222, 4); ctx.restore(); }
}

// ---------- S6 the time-lapse of costs (43.20 - 53.68) ----------
const M5_S6U = (t) => t < 46.4 ? K.lerp(0.2, 3.2, K.clamp((t - 43.2) / 3.2)) : 3.24;
const M5_S6H = { w1: Array.from({ length: 13 }, (_, i) => 43.3 + i * 0.5), w3: Array.from({ length: 13 }, (_, i) => 43.47 + i * 0.5), w2: Array.from({ length: 13 }, (_, i) => 43.62 + i * 0.5) };
const M5_S6CHEST = [190, 935], M5_S6HEAP = [700, 990];
const m5S6Fill = (t) => m5Tr(t, [[0, 1], [50.25, 0.7, 0.6], [51.18, 0.4, 0.6], [52.2, 0.05, 1.0]]);
const m5S6Count = (t) => Math.round(t < 47.66 ? 0 : t < 50.4 ? 10 * M5B(t, 47.7, 2.5, 'lin') : t < 51.14 ? K.lerp(10, 30, M5B(t, 50.46, 0.5)) : t < 52.14 ? K.lerp(30, 60, M5B(t, 51.14, 0.6)) : K.lerp(60, 100, M5B(t, 52.14, 1.2)));
function m5Arc(ctx, a, b, t, t0, d = 0.45, n = 3, h = 120) { for (let i = 0; i < n; i++) { const s = t0 + i * 0.08, u = K.clamp((t - s) / d); if (u <= 0 || u >= 1) continue; m5Coin(ctx, K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - h * Math.sin(Math.PI * u), 12, Math.cos((t - s) * 16)); } }
function m5S6(ctx, t) {
  const u = M5_S6U(t), d = dayCycle(u), sx = d.sun ? (500 - d.sun[0]) * 0.8 : 0;
  m5Face(ctx, { t, u, xMark: 1, dig: K.lerp(0.17, 0.4, M5B(t, 43.4, 3.0, 'lin')), shadow: d.sun ? sx : null });
  // the heap of ruined tools
  if (t > 51.0) { const k = m5Pop(t, 51.0, 0.3); ctx.save(); ctx.translate(M5_S6HEAP[0], M5_S6HEAP[1]); ctx.scale(k, k); for (let i = 0; i < 5; i++) m5Pick(ctx, -60 + i * 22, -10 - (i % 2) * 18, -0.3 + i * 0.35, 0.55, i % 2); if (t > 51.6) m5Pick(ctx, -10, -40, 0.9, 0.55, 1); ctx.restore(); }
  // vizier writing
  const V = { ...M5_VIZ, x: 300, y: 915, s: 0.75, dir: -1, brow: -0.6, handL: M5H.ledgerL };
  const wr = t > 48.46 ? 14 + 20 * K.clamp((t - 48.46) / 1.5) : 6; V.handR = m5In(t, 48.46, 48.75) ? M5H.mouth : [30 + 8 * Math.sin(t * wr), -116 + 4 * Math.cos(t * wr * 1.3)];
  V.gaze = m5Look(t, V, [[0, [300, 830]], [48.46, [190, 860]], [48.8, [300, 830]], [49.2, [190, 860]], [49.5, [300, 830]], [52.98, [190, 860]]], 0.07); m5Blink(V, t, 17);
  // caliph by his chest
  const P = { ...M5_CAL, x: 110, y: 905, s: 0.8, dir: 1, handL: M5H.hipL };
  P.handR = m5Tr(t, [[0, M5H.hipR], [46.3, m5Loc(P, [190, 830]), 0.15], [46.8, M5H.hipR, 0.4], [53.0, [60, -100], 0.3]]);
  P.mouth = m5In(t, 46.5, 52.9) ? 'smile' : 'closed'; P.brow = t > 52.98 ? -0.5 : -0.2; if (t > 52.98) P.mouth = 'frown';
  P.gaze = m5Look(t, P, [[0, M5_X], [46.3, [190, 830]], [47.66, [210, 150]], [48.3, [190, 830]], [50.2, [600, 800]], [51.14, M5_S6HEAP], [52.14, [800, 1060]], [52.98, [190, 840]]]); m5Blink(P, t, 11);
  person(ctx, P);
  m5Chest(ctx, ...M5_S6CHEST, { s: 0.6, open: M5B(t, 46.44, 0.35), fill: m5S6Fill(t) });
  if (m5In(t, 46.6, 50.2)) m5Glow(ctx, 190, 860, 70, 0.4 * m5Win(t, 46.6, 50.2, 0.3));
  person(ctx, V); m5Ledger(ctx, ...m5Hand(V, 'L'), { open: 1, s: 0.45, fill: K.clamp(0.25 + (t - 47.6) / 6), rot: 0.2 }); m5Pen(ctx, ...m5Hand(V, 'R'), -0.5);
  // workers: fast strike loop through the time-lapse, then they take their pay
  for (const k of ['w1', 'w3', 'w2']) { const [x, y, dir, s] = M5_WK[k], base = k === 'w1' ? M5_W1 : k === 'w2' ? M5_W2 : M5_W3; const W = { ...base, x, y, s, dir }; let ang;
    if (t < 50.0) { const st = m5Strike(t, M5_S6H[k], { lift: 0.18, whip: 0.08 }); ang = m5StrikePose(W, t > 49.6 ? K.lerp(st.r, 0.1, M5B(t, 49.6, 0.3)) : st.r); W.gaze = m5Look(t, W, [[0, M5_X]]); W.lid = k === 'w2' ? 0.4 : 0.2; }
    else { const tc = k === 'w1' ? 50.65 : k === 'w3' ? 50.75 : 50.95; W.aR = null; W.aL = null; W.handL = [-40, -128]; W.handR = [56, -132]; W.y -= hop(t, tc, 0.3, 0, 0, 14)[1]; W.mouth = t > tc ? 'smile' : 'closed'; W.gaze = m5Look(t, W, [[50.0, [190, 830]], [tc + 0.3, [x + dir * 40, y - 120]], [52.2, [800, 1060]]]); ang = null;
      if (k === 'w1' && m5In(t, 51.3, 51.75)) { W.handR = [60, -190]; } }
    m5Blink(W, t, W.seed, W.lid || 0); person(ctx, W);
    if (ang != null) m5Pick(ctx, ...m5Hand(W, 'R'), ang, 0.75); else if (k === 'w1' && m5In(t, 51.3, 51.75)) { const h = m5Hand(W, 'R'), u2 = M5B(t, 51.45, 0.3, 'lin'); m5Pick(ctx, K.lerp(h[0], 690, u2), K.lerp(h[1], 960, u2) - 80 * Math.sin(Math.PI * u2), -2 + 5 * u2, 0.55, 1); }
    if (t > 50.2) { const tc = k === 'w1' ? 50.65 : k === 'w3' ? 50.75 : 50.95; if (t > tc) m5Coin(ctx, ...m5Hand(W, 'R'), 12, 1); m5Arc(ctx, [190, 860], m5Hand(W, 'R'), t, tc - 0.45, 0.45, 1, 140); } }
  m5Arc(ctx, [190, 860], [M5_S6HEAP[0], M5_S6HEAP[1] - 30], t, 51.14, 0.5, 3, 160);
  // the camel hauls a block on a sled across the foreground
  if (m5In(t, 52.1, 53.68)) { const xf = (tt) => K.lerp(1200, 520, M5B(tt, 52.1, 1.6, 'lin')), Cm = { ...walk(xf, t, { stride: GAIT.camel * 0.55 }), y: 1120, s: 0.55, dir: -1, chew: (Math.sin(t * 9) + 1) / 2, lid: 0.4, saddle: true };
    const bx = Cm.x + 260; shape(ctx, [[bx - 80, 1122], [bx + 90, 1122], [bx + 100, 1110], [bx - 90, 1110]], '#7a4212', { lw: 4, seed: 730 }); m5Block(ctx, { n: 9, i: 2, x0: bx - 70, x1: bx + 70, y0: 1010, y1: 1110 });
    ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(Cm.x + 100, 1000); ctx.lineTo(bx - 70, 1050); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = '#a8741a'; for (const ry of [1126, 1140]) { ctx.beginPath(); ctx.moveTo(bx + 90, ry); ctx.lineTo(1010, ry); ctx.stroke(); } ctx.restore();
    camel(ctx, Cm); m5Arc(ctx, [190, 860], [Cm.x, 960], t, 52.3, 0.5, 3, 150); }
}
function m5O6(ctx, t, cam, S, P) {
  if (t > 43.3) { const day = t < 44.27 ? 1 : t < 44.88 ? 9 : 30; const fl = t < 44.88 ? m5Pulse(t, 44.27, 0.15) : m5Pulse(t, 44.88, 0.15); ctx.save(); ctx.translate(800, 125); ctx.scale(1, 1 - 0.8 * fl); S.label(ctx, 'DAY ' + day, 0, 20, m5Pop(t, 43.3, 0.3), { size: 56, align: 'center', fill: day === 30 ? C.yellow : C.white }); ctx.restore(); }
  if (t > 47.66) { const pu = 1 + 0.1 * (m5Pulse(t, 50.46, 0.2) + m5Pulse(t, 51.14, 0.2) + m5Pulse(t, 52.14, 0.2)); ctx.save(); ctx.translate(215, 130); ctx.scale(pu, pu); m5Tag(ctx, S, 0, 0, 'SPENT', m5S6Count(t), M5B(t, 47.66, 0.35), C.red); ctx.restore(); }
}
