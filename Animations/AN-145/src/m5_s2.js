// ===== AN-145 scenes S7-S11: the tiny tunnel, the find, the weighing, the realisation, the departure =====
// small-scale strike for the tunnel figures (s 0.24): tip lands at x + 52 * dir
function m5Tiny(ctx, W, r, bend = 0) { const ang = m5StrikePose(W, r); person(ctx, W); m5Pick(ctx, ...m5Hand(W, 'R'), ang, W.s, bend); }
function m5Hoard(ctx, x, y, s, t, o = {}) { m5Glow(ctx, x, y - 40 * s, 120 * s, 0.5 * (o.glow ?? 1)); m5Mound(ctx, x + 70 * s, y, 110 * s, 1, { seed: 6 }); m5Chest(ctx, x - 20 * s, y, { s: s * 0.75, old: true, open: o.open || 0, fill: 1, jewels: true });
  if (o.glints) for (let i = 0; i < 4; i++) { const k = m5Pulse(t, o.glints + i * 0.22, 0.4); if (k > 0) star(ctx, x + (-40 + i * 40) * s, y - (60 + (i % 2) * 30) * s, 18 * s * k, C.white, t * 3); } }

// ---------- S7 the cutaway (53.68 - 65.06) ----------
function m5S7(ctx, t) {
  const len = K.lerp(0.15, 1, M5B(t, 55.24, 1.2, 'out')), sweep = m5Tr(t, [[0, 0], [61.26, -0.6, 0.35], [61.7, 0.6, 0.45], [62.2, 0, 0.3]]), low = M5B(t, 63.82, 0.8);
  const W3 = { ...M5_W3, x: 270, y: 850, s: 0.24, dir: 1, brow: t > 61.26 ? -0.4 : 0, drop: 6 * low }; W3.handL = M5H.lowL; W3.aR = [2.0 + sweep, 2.2 + sweep];
  const torch = t > 56.44 ? (() => { const h = m5Hand(W3, 'R'); return h; })() : null, tf = torch ? [torch[0] + Math.sin(sweep) * 16, torch[1] - 16] : [300, 815];
  m5Section(ctx, { t, u: 0.26, len, light: t > 56.44 ? { x: tf[0], y: tf[1], r: 70 * (1 - 0.5 * low), a: 0.65 } : null });
  // the caliph waits outside at the mouth
  const P = { ...M5_CAL, x: 40, y: 900, s: 0.3, dir: 1, handL: M5H.hipL, handR: M5H.hipR, gaze: [1, -0.3] }; person(ctx, P);
  if (t > 56.44) { const fa = M5B(t, 56.44, 0.4); ctx.save(); ctx.globalAlpha = fa;
    W3.gaze = t < 61.26 ? [1, 0] : [Math.sin(sweep) * 1.4, -0.4]; m5Blink(W3, t, 41, 0.8 * m5Pulse(t, 63.9, 0.9)); person(ctx, W3); m5Torch(ctx, ...m5Hand(W3, 'R'), t, { s: 0.3, ang: sweep, light: 1 - 0.5 * low });
    const W1 = { ...M5_W1, x: 315, y: 850, s: 0.24, dir: 1 };
    if (t < 62.06) { const hits = Array.from({ length: 8 }, (_, i) => 57.0 + i * 0.6); m5Tiny(ctx, W1, m5Strike(t, hits, { lift: 0.25, whip: 0.08 }).r); m5Spark(ctx, 367, 830, t, hits.find((h) => t >= h && t < h + 0.45) ?? -9, 0.25); }
    else { const tn = turnFlip(t, [[0, 1], [62.06, -1]], 0.4); Object.assign(W1, { dir: tn.dir, handL: PERSON_HANDS.palmsUp.L, handR: PERSON_HANDS.palmsUp.R, mouth: 'frown', sq: 0.96, gaze: [-1, 0] }); person(ctx, W1); m5Pick(ctx, 345, 846, -0.2, 0.24); }
    ctx.restore();
    // thought balloon: coins, struck out, deflating
    if (m5In(t, 62.96, 64.6)) { const k = m5Pop(t, 62.96, 0.3) * (1 - M5B(t, 64.2, 0.4, 'in')); if (k > 0) { ctx.save(); ctx.translate(340, 740); ctx.scale(k, k); shape(ctx, ell(0, 0, 42, 30, 24), C.white, { lw: 3, seed: 740 }); [[-8, 30], [-14, 42]].forEach(([dx, dy], i) => shape(ctx, ell(dx, dy, 5 - i * 2, 5 - i * 2, 10), C.white, { lw: 2, seed: 741 })); m5Mound(ctx, 0, 14, 44, 1, { seed: 7 });
      const x = M5B(t, 63.3, 0.3); ctx.lineCap = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(-26, -20); ctx.lineTo(-26 + 52 * x, -20 + 40 * x); if (x >= 1) { ctx.moveTo(26, -20); ctx.lineTo(26 - 52 * M5B(t, 63.6, 0.25), -20 + 40 * M5B(t, 63.6, 0.25)); } ctx.stroke(); ctx.restore(); } } }
}
function m5O7(ctx, t, cam, S, P) {
  if (m5In(t, 58.12, 59.95)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 58.12, 59.95, 0.2); const k = M5B(t, 58.12, 0.5); const br = (x0, x1, y, col) => { const a = P(x0, y), b = P(K.lerp(x0, x1, k), y); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1] - 14); ctx.lineTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0], b[1] - 14); ctx.stroke(); };
    br(60, 940, 950, C.white); br(100, 369, 930, C.red); ctx.restore(); }
  if (m5In(t, 59.08, 61.1)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 59.08, 61.1, 0.2); const [x, y] = P(330, 1040); S.label(ctx, 'TINY!', x, y, M5B(t, 59.08, 0.35), { size: 60, align: 'center', fill: C.yellow }); S.arrow(ctx, [x - 40, y - 50], P(240, 860), M5B(t, 59.2, 0.4), { width: 16, bend: -0.2 }); ctx.restore(); }
}

// ---------- S8 the find (65.06 - 72.30) ----------
function m5S8(ctx, t) {
  const breach = t < 66.05 ? 0 : t < 66.68 ? 0.12 : K.lerp(0.12, 1, M5B(t, 66.68, 0.5, 'in')), gold = M5B(t, 66.7, 0.5);
  const W3 = { ...M5_W3, x: 285, y: 850, s: 0.24, dir: 1, handL: M5H.lowL, mouth: t > 67.2 ? 'o' : 'closed', brow: t > 67.2 ? -0.8 : 0, tip: 0.08 * M5B(t, 67.3, 0.8), eyes: m5In(t, 66.7, 68.9) ? 'wide' : undefined };
  W3.aR = [K.lerp(2.0, 2.7, M5B(t, 67.2, 0.4)), K.lerp(2.2, 2.9, M5B(t, 67.2, 0.4))]; W3.gaze = t < 66.7 ? [1, 0] : lookAt(m5Head(W3), [420, 830]);
  const tor = m5Hand(W3, 'R');
  m5Section(ctx, { t, u: 0.26, len: 1, niche: true, breach, light: { x: tor[0], y: tor[1] - 16, r: 40 + 30 * (1 - gold), a: 0.65 }, hoard: (c) => m5Hoard(c, 425, 850, 0.32, t, { open: M5B(t, 70.02, 0.7), glints: 68.9 }) });
  if (gold > 0) { ctx.save(); ctx.beginPath(); K.poly(ctx, m5TunnelPts(1), true); ctx.rect(372, 770, 98, 80); ctx.clip(); m5Glow(ctx, 430, 815, 60 + 140 * gold, 0.55 * gold); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.6 * gold * (0.8 + 0.2 * Math.sin(t * 5)); ctx.lineWidth = 3; ctx.strokeStyle = C.yellow; for (let i = 0; i < 7; i++) { const a = Math.PI * (0.6 + 0.8 * i / 6); ctx.beginPath(); ctx.moveTo(420 + Math.cos(a) * 30, 812 + Math.sin(a) * 20); ctx.lineTo(420 + Math.cos(a) * (60 + 30 * gold), 812 + Math.sin(a) * (34 + 14 * gold)); ctx.stroke(); } ctx.restore(); }
  m5Blink(W3, t, 41, m5In(t, 65.1, 66.0) ? 0.3 : 0); person(ctx, W3); m5Torch(ctx, ...tor, t, { s: 0.3, ang: -0.2, light: 1 - 0.4 * gold });
  // w1: one more tired swing, the pick goes through, he stumbles; then joy
  const W1 = { ...M5_W1, x: 330 + 6 * M5B(t, 66.08, 0.3), y: 850, s: 0.24, dir: 1, lid: 0.4 };
  if (t < 71.06) { const st = m5Strike(t, [66.05], { lift: 0.6, top: 0.8 }); W1.tip = 0.1 * m5Win(t, 66.05, 66.9, 0.15); if (t > 66.7) { W1.lid = 0; W1.eyes = 'wide'; W1.gaze = [1, 0.1]; W1.mouth = t > 68.88 ? 'smile' : 'o'; }
    const r = t > 66.3 ? K.lerp(st.r, 0.05, M5B(t, 66.3, 0.4)) : st.r; m5Tiny(ctx, W1, r); }
  else { const tn = turnFlip(t, [[0, 1], [71.5, -1]], 0.3); Object.assign(W1, { dir: tn.dir, lid: 0, mouth: 'smile', eyes: 'wide', y: 850 - hop(t, 71.06, 0.35, 0, 0, 10)[1] - hop(t, 71.45, 0.3, 0, 0, 8)[1] }); W1.handL = t > 71.8 ? [40, -150] : PERSON_HANDS.armsOut.L; W1.handR = t > 71.8 ? [60, -152] : PERSON_HANDS.armsOut.R; W1.gaze = [-1, -0.1];
    if (t > 71.8) { W3.x += tremble(t, 2, 6); } person(ctx, W1); m5Pick(ctx, 352, 848, -0.1, 0.24); }
  if (m5In(t, 66.05, 66.8)) m5Spark(ctx, 372, 822, t, 66.05, 0.3);
}
function m5O8(ctx, t, cam, S, P) {
  if (m5In(t, 66.0, 66.6)) { const [x, y] = P(375, 820); S.emphasis(ctx, x, y, 70, M5B(t, 66.0, 0.25) * 0.24, { seed: 8 }); }
  if (m5In(t, 69.4, 72.3)) { const [x, y] = P(430, 745); ctx.save(); ctx.globalAlpha = m5Fade(t, 69.4, 72.3, 0.2); sfx(ctx, 'GOLD!', x, y, 110, M5B(t, 69.4, 0.3), { rot: -0.06 }); ctx.restore(); }
}

// ---------- S9 the weighing (72.30 - 87.56). FOUND is on the left pan (the caliph's side), SPENT on the right (the vizier's) ----------
const M5_SC = { x: 500, y: 950 }, M5_S9C = [200, 935], M5_S9V = [800, 935];
function m5Tilt(t) { // + = right pan down
  let a = t < 76.94 ? -0.22 * M5B(t, 74.6, 2.3) : t < 78.32 ? K.lerp(-0.22, 0.14, M5B(t, 76.94, 1.38)) : t < 82.32 ? 0.14 * Math.cos(2 * Math.PI * 0.9 * (t - 78.32)) * (1 - (t - 78.32) / 4) ** 2 : 0;
  return a - 0.06 * swing(t, 85.78, 1, 1.6, 4.5) * (t > 85.78 ? 1 : 0) * 1 + 0.06 * swing(t, 86.88, 1, 1.6, 4.5) * (t > 86.88 ? 1 : 0); }
const m5Found = (t) => Math.round(t < 74.6 ? 0 : t < 81.52 ? 86 * M5B(t, 74.6, 2.3, 'lin') : K.lerp(86, 100, M5B(t, 81.52, 0.78, 'out')));
const m5Spent = (t) => Math.round(t < 76.94 ? 0 : t < 81.52 ? 92 * M5B(t, 76.94, 1.36, 'lin') : K.lerp(92, 100, M5B(t, 81.52, 0.78, 'out')));
function m5S9(ctx, t) {
  m5Face(ctx, { t, u: 0.27, dig: 1, glow: 0.4 });
  const tilt = m5Tilt(t), still = m5In(t, 82.32, 82.52);
  // the chest of the find, carried in by the foreman
  const chX = (tt) => m5Tr(tt, [[0, 1150], [72.3, 370, 0.9]]), W3x = (tt) => m5Tr(tt, [[0, 1220], [72.3, 440, 0.9], [73.8, 1250, 1.0]]);
  if (t < 74.9) { const W3 = { ...M5_W3, ...m5Walk(W3x, t, 13), y: 975, s: 0.78, dir: t < 73.5 ? -1 : 1, handL: [70, -120], handR: [86, -116], mouth: 'smile', gaze: [-1, 0.4] }; if (t > 73.5) { W3.handL = M5H.lowL; W3.handR = M5H.lowR; } person(ctx, W3); }
  const chestOpen = M5B(t, 73.4, 0.4); m5Chest(ctx, chX(t), 1010 - (t < 73.16 ? 60 : 60 * (1 - M5B(t, 73.16, 0.3))), { s: 0.55, old: true, open: chestOpen, fill: K.lerp(1, 0.2, M5B(t, 74.6, 2.3)), jewels: t < 76 });
  const sc = m5Scale(ctx, M5_SC.x, M5_SC.y, tilt, { level: still || m5In(t, 82.32, 83.7) ? m5Win(t, 82.32, 83.7, 0.1) : 0,
    left: (c, x, y) => { const f = M5B(t, 74.6, 2.3); if (f > 0) { m5Mound(c, x, y, 120, Math.max(0.15, f), { seed: 8 }); if (f > 0.5) { m5Gem(c, x - 20, y - 40 * f, 10, C.red); m5Gem(c, x + 18, y - 34 * f, 10, C.blue); } } },
    right: (c, x, y) => { const f = M5B(t, 76.94, 1.36); if (f > 0) m5Mound(c, x, y, 120, Math.max(0.2, f), { ghost: true }); } });
  for (let i = 0; i < 14; i++) { const s0 = 74.6 + i * 0.16, u = K.clamp((t - s0) / 0.4); if (u > 0 && u < 1) { const a = [370, 930], b = [sc.pans[0][0], sc.pans[0][1] - 20]; (i % 4 === 3 ? (c, x, y) => m5Gem(c, x, y, 9, [C.red, C.blue, '#2f9a3e'][i % 3]) : (c, x, y) => m5Coin(c, x, y, 11, Math.cos(t * 14 + i)))(ctx, K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 110 * Math.sin(Math.PI * u)); } }
  for (let i = 0; i < 6; i++) { const s0 = 76.94 + i * 0.22, u = K.clamp((t - s0) / 0.3); if (u > 0 && u < 1) { const b = sc.pans[1]; m5Ghost(ctx, b[0] - 30 + (i % 3) * 30, K.lerp(b[1] - 160, b[1] - 20, u * u), 14); } }
  // the caliph
  const P = { ...M5_CAL, x: m5Tr(t, [[0, 140], [72.3, M5_S9C[0], 0.5]]), y: M5_S9C[1], s: 0.8, dir: 1, mouth: 'smile', brow: -0.2 };
  P.ph = P.x / 9; P.amp = m5In(t, 72.3, 72.8) ? 0.8 : 0;
  P.handL = m5Tr(t, [[0, M5H.hipL], [74.6, [16, -128], 0.3], [80.1, M5H.hipL, 0.4]]);
  P.handR = m5Tr(t, [[0, M5H.hipR], [72.4, [60, -190], 0.2], [72.9, [56, -186], 0.08], [73.1, M5H.hipR, 0.4], [74.6, [-10, -130], 0.3], [80.1, M5H.hipR, 0.4], [85.44, m5Loc({ ...P, x: M5_S9C[0] }, [sc.pans[0][0] + 40, sc.pans[0][1] - 4]), 0.3], [86.3, M5H.hipR, 0.4]]);
  if (m5In(t, 74.6, 80.1)) { P.handL = [P.handL[0] + 8 * Math.sin(t * 16), P.handL[1]]; P.sq = 1 + 0.03 * Math.max(0, Math.sin(t * 6)); }
  if (t > 76.94) P.mouth = t < 78.3 ? 'smile' : 'o';
  P.look = t > 78.32 && t < 82.32 ? -K.clamp(tilt * 6, -1, 1) : 0; P.tilt = t > 78.32 && t < 82.32 ? tilt * 0.8 : 0;
  P.tip = 0.12 * m5Win(t, 80.16, 83.9, 0.4); if (t > 80.16 && t < 83.7) { P.eyes = 'wide'; P.brow = -0.9; P.noBlink = true; P.mouth = 'o'; }
  if (t > 84.26) { P.mouth = 'closed'; P.brow = m5In(t, 85.44, 86.0) ? -0.5 : 0; }
  P.gaze = t < 78.32 ? m5Look(t, P, [[0, [370, 930]], [76.94, sc.pans[1]]]) : t < 82.32 ? lookAt(m5Head(P), sc.pans[tilt > 0 ? 1 : 0]) : t < 83.7 ? m5Look(t, P, [[82.32, sc.pans[0]], [82.9, sc.pans[1]], [83.3, sc.pans[0]]], 0.06) : m5Look(t, P, [[83.7, sc.pivot], [85.44, sc.pans[0]], [86.38, [800, 760]]]);
  if (!P.noBlink) m5Blink(P, t, 11);
  person(ctx, P);
  // the vizier and the ledger
  const V = { ...M5_VIZ, x: M5_S9V[0], y: M5_S9V[1], s: 0.75, dir: -1, brow: -0.3 };
  V.handL = m5Tr(t, [[0, M5H.ledgerL], [84.26, [-30, -170], 0.15], [85.2, M5H.ledgerL, 0.4]]);
  V.handR = t < 79.1 ? (m5In(t, 74.0, 74.3) ? M5H.mouth : m5In(t, 75.52, 76.9) ? [20, -100 + 30 * M5B(t, 75.52, 1.3)] : [28 + 6 * Math.sin(t * 12), -116]) : m5Tr(t, [[79.1, [40, -160], 0.3], [84.26, [40, -180], 0.15], [86.38, m5Loc({ ...V }, [sc.pans[1][0] - 40, sc.pans[1][1] - 4]), 0.3], [87.1, [60, -120], 0.3]]);
  V.talk = talk(t, [[75.52, 76.9]]) * 0.3; V.gaze = m5Look(t, V, [[0, [800, 840]], [74.6, sc.pans[0]], [75.52, [790, 840]], [78.32, sc.pivot], [82.32, sc.pans[1]], [84.26, [790, 840]], [84.8, M5_S9C], [86.38, sc.pans[1]], [87.0, m5Head(P)]]);
  if (t > 86.9) { V.brow = -0.6; V.drop = -4 * m5Pulse(t, 87.0, 0.5); }
  m5Blink(V, t, 17); person(ctx, V);
  const lp = t < 84.26 ? m5Hand(V, 'L') : [V.x - 30, V.y - 87]; m5Ledger(ctx, lp[0], lp[1], { s: 0.45, fill: 0.3 + 0.5 * M5B(t, 75.5, 3), rot: 0.15 });
  m5Pen(ctx, ...m5Hand(V, 'R'), -0.4);
}
function m5O9(ctx, t, cam, S, P) {
  if (t > 74.6) { const pu = 1 + 0.12 * m5Pulse(t, 82.3, 0.25); ctx.save(); ctx.translate(240, 300); ctx.scale(pu, pu); m5Tag(ctx, S, 0, 0, 'FOUND', m5Found(t), M5B(t, 74.6, 0.35), C.yellow); ctx.restore(); }
  if (t > 76.94) { const pu = 1 + 0.12 * m5Pulse(t, 82.3, 0.25); ctx.save(); ctx.translate(760, 300); ctx.scale(pu, pu); m5Tag(ctx, S, 0, 0, 'SPENT', m5Spent(t), M5B(t, 76.94, 0.35), C.red); ctx.restore(); }
  if (t > 82.94) sfx(ctx, '=', 500, 290, 130, M5B(t, 82.94, 0.3), { fill: C.white });
  if (t > 84.26) { const k = t < 84.33 ? 1.3 : 1; ctx.save(); ctx.translate(500, 450); ctx.scale(k, k); sfx(ctx, 'EXACTLY!', 0, 0, 96, M5B(t, 84.26, 0.12), { rot: -0.08, fill: C.yellow }); ctx.restore(); }
}

// ---------- S10 the realisation (87.56 - 97.28) ----------
function m5S10(ctx, t) {
  m5Face(ctx, { t, u: 0.27, dig: 1 });
  const sc = m5Scale(ctx, M5_SC.x, M5_SC.y, 0, { left: (c, x, y) => m5Mound(c, x, y, 120, 1, { seed: 8 }), right: (c, x, y) => m5Mound(c, x, y, 120, 1, { ghost: true }) });
  const P = { ...M5_CAL, x: M5_S9C[0], y: M5_S9C[1], s: 0.8, dir: 1, eyes: t < 88.7 ? 'wide' : undefined, mouth: t < 90.14 ? 'o' : t < 91.74 ? 'frown' : 'closed', tip: 0.12 * (1 - M5B(t, 87.56, 1.0)) };
  P.brow = t < 90.14 ? -0.6 : t < 91.74 ? -0.5 : 0; P.handL = M5H.hipL;
  P.handR = m5Tr(t, [[0, M5H.hipR], [90.14, [22, -236], 0.3], [90.9, M5H.hipR, 0.4], [96.0, M5H.chestR, 0.4]]); if (m5In(t, 90.44, 90.9)) P.handR = [22 + 6 * Math.sin(t * 30), -236];
  P.tilt = 0.1 * m5Win(t, 90.14, 91.0, 0.2); P.drop = 8 * M5B(t, 91.74, 0.6); P.sq = 1 - 0.04 * m5Win(t, 91.74, 93.0, 0.4);
  const lid = (t > 91.74 && t < 94.34 ? 0.4 : 0) + 0.9 * (m5Pulse(t, 87.9, 0.4) + m5Pulse(t, 88.4, 0.4) + m5Pulse(t, 94.7, 0.18));
  P.gaze = t < 88.7 ? [0.2, 0] : t < 89.7 ? m5Look(t, P, [[88.7, sc.pans[0]], [89.05, sc.pans[1]], [89.4, sc.pans[0]]], 0.06) : t < 91.74 ? [0.3, -0.5] : t < 94.34 ? [0.2, 0.8] : t < 95.2 ? [0, 0.05] : m5Look(t, P, [[95.2, [800, 760]]]);
  m5Blink(P, t, 11, Math.min(1, lid)); person(ctx, P);
  const V = { ...M5_VIZ, x: M5_S9V[0], y: M5_S9V[1], s: 0.75, dir: -1, brow: -0.6, mouth: t > 96.12 ? 'smile' : 'closed' };
  V.gaze = t < 96.12 ? [0.3, -1] : t < 96.6 ? [-1, 0] : [-0.3, 0.6];
  V.handR = t < 96.12 ? [40 + 10 * Math.sin(t * 14), -170] : [50, -200]; V.handL = t < 96.12 ? M5H.ledgerL : [-20, -200];
  m5Blink(V, t, 17); person(ctx, V);
  if (t < 96.12) m5Ledger(ctx, ...m5Hand(V, 'R'), { open: 0, s: 0.45, rot: 0.6 * Math.sin(t * 14) });
  else { const h = m5Hand(V, 'R'), h2 = m5Hand(V, 'L'), cx = (h[0] + h2[0]) / 2, cy = (h[1] + h2[1]) / 2 - 10, rot = Math.PI * M5B(t, 96.12, 0.4); m5Chest(ctx, cx, cy + 30 * Math.sin(rot), { s: 0.35, open: 1, fill: 0, rot });
    if (t > 96.5) { const d = t - 96.5, x = cx + 50 * d - (d > 0.35 ? 140 * (d - 0.35) : 0), y = Math.min(cy + 30 + 600 * d * d, 975); m5Coin(ctx, x, y, 11, Math.cos(d * 14)); } }
}
function m5O10(ctx, t, cam, S, P) {
  ctx.save(); ctx.globalAlpha = 1 - M5B(t, 95.0, 0.4); [[240, 'FOUND', C.yellow], [760, 'SPENT', C.red]].forEach(([x, l, col]) => { ctx.save(); ctx.translate(x, 160); ctx.scale(0.75, 0.75); m5Tag(ctx, S, 0, 0, l, 100, 1, col); ctx.restore(); });
  if (m5In(t, 90.92, 92.6)) { const k = M5B(t, 90.92, 0.5); S.arrow(ctx, [370, 120], [630, 120], k, { width: 16, bend: -0.35 }); S.arrow(ctx, [630, 210], [370, 210], M5B(t, 91.2, 0.5), { width: 16, bend: -0.35 }); }
  ctx.restore();
  if (m5In(t, 93.42, 95.6)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 93.42, 95.6, 0.2); const k = m5Pop(t, 93.42, 0.3); ctx.translate(740, 400); ctx.scale(k, k);
    shape(ctx, [[-170, -60], [150, -60], [175, 0], [150, 60], [-170, 60]], C.white, { lw: 7, seed: 750 }); ctx.font = K.font(60, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('PROFIT', -150, 4);
    const u = M5B(t, 93.76, 0.5, 'in'), lay = t > 94.26 ? K.clamp(0.3 * Math.exp(-(t - 94.26) * 6) * Math.cos((t - 94.26) * 30) + 1, 0, 1.3) : 0; ctx.save(); ctx.translate(95, K.lerp(-160, 4, u)); ctx.rotate(t < 94.26 ? (t - 93.76) * 8 : 0); ctx.scale(1, t > 94.26 ? Math.max(0.6, 1 - 0.4 * K.clamp((t - 94.26) / 0.3) + 0.15 * (lay - 1)) : 1);
    ctx.font = K.font(130, BF, 400); ctx.textAlign = 'center'; ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.strokeText('0', 0, 0); ctx.fillStyle = C.red; ctx.fillText('0', 0, 0); ctx.restore(); ctx.restore(); }
}

// ---------- S11 the departure (97.28 - 107.66) ----------
function m5S11(ctx, t) {
  const wipe = t < 100.62 ? M5B(t, 99.7, 0.5, 'lin') * (0.7 + 0.3 * Math.sin(t * 40)) : 1 - M5B(t, 100.62, 0.4, 'lin');
  m5Far(ctx, { u: 0.3, t, scar: 1, outline: wipe });
  const ride = (tt) => K.lerp(160, -320, M5B(tt, 105.34, 2.3, 'in')), vr = (tt) => K.lerp(90, -420, M5B(tt, 105.5, 2.2, 'in')), cr = (tt) => K.lerp(400, -260, M5B(tt, 105.7, 2.0, 'in'));
  // vizier waits mounted at the left
  const V = { ...walk(vr, t, { stride: GAIT.horse * 0.5 }), y: 905, s: 0.5, pal: 1, dir: -1, earL: 0.6, earR: 0.6, tailSwish: Math.sin(t * 2) * 0.4 };
  rideOn(ctx, 'horse', V, { ...M5_VIZ, gaze: t > 106.4 && t < 107.0 ? [1, -0.4] : [1, 0], mouth: 'closed' });
  // the camel: kneels, takes the chest, rises rear first
  const Cm = { ...walk(cr, t, { stride: GAIT.camel * 0.5 }), y: 905, s: 0.5, dir: -1, kneel: m5Tr(t, [[0, 1], [98.14, 0, 0.66]]), chew: (Math.sin(t * 8) + 1) / 2, lid: 0.4, talk: m5Pulse(t, 98.2, 0.5), saddle: true, load: t > 98.1 ? ['chest'] : undefined };
  camel(ctx, Cm);
  if (t < 98.1) { const u = M5B(t, 97.4, 0.7); m5Chest(ctx, K.lerp(470, 420, u), K.lerp(905, 830, u), { s: 0.32, old: true }); }
  // the caliph on foot, then mounted
  if (t < 104.6) { const H = { x: 160, y: 905, s: 0.5, dir: -1, earL: 1, earR: 1, tailSwish: Math.sin(t * 2.5) * 0.5 }; horse(ctx, H);
    const P = { ...M5_CAL, x: 250, y: 905, s: 0.5, dir: -1, brow: -0.3, mouth: 'closed' }; P.dir = turnFlip(t, [[0, -1], [98.8, 1], [104.0, -1]], 0.4).dir;
    P.gaze = t < 98.8 ? [1, 0.2] : t < 100.6 ? m5Look(t, P, [[98.8, [560, 250]]], 0.6) : [1, 0];
    P.look = t > 100.62 && t < 101.6 ? Math.sin((t - 100.62) * 14) : 0; m5Blink(P, t, 11, t > 100.62 && t < 102.2 ? 0.3 : 0); if (t > 100.62 && t < 102.2) P.mouth = 'smile';
    P.handR = m5Tr(t, [[0, M5H.hipR], [100.9, [80, -160], 0.25], [101.2, [40, -130], 0.2], [101.5, M5H.hipR, 0.3], [102.22, [70, -200], 0.25], [103.4, M5H.hipR, 0.4]]); P.handL = M5H.hipL;
    P.y -= hop(t, 104.3, 0.3, 0, 0, 30)[1]; if (t > 104.3) P.x = K.lerp(250, 175, M5B(t, 104.3, 0.3)); person(ctx, P); }
  else { const H = { ...walk(ride, t, { stride: GAIT.horse * 0.5 }), y: 905, s: 0.5, dir: -1, earL: 1, earR: 1, tailSwish: Math.sin(t * 2.5) * 0.5 }; rideOn(ctx, 'horse', H, { ...M5_CAL, gaze: [-1, 0], mouth: 'closed', lurch: -lurch(t, 104.6, 0.2) }); }
  // workers
  [['w3', M5_W3, 470, 0], ['w1', M5_W1, 535, 1], ['w2', M5_W2, 600, 2]].forEach(([k, base, x, i]) => { const W = { ...base, x, y: 912, s: 0.5, dir: -1 };
    if (t < 98.1 && k !== 'w2') { W.handL = [70, -110]; W.handR = [80, -120]; W.x = x - 10; }
    else W.handL = M5H.lowL;
    const drop = k === 'w2' ? 103.2 : k === 'w3' ? 103.5 : 104.1; W.handR = W.handR || (t < drop ? [40, -150] : M5H.lowR);
    W.gaze = t < 102.22 ? [-1, -0.2] : m5Look(t, W, [[102.22, [250, 820]], [104.0, [300, 890]], [104.6, [100, 820]]]); if (k === 'w2' && t > 103.2) W.mouth = 'smile';
    person(ctx, W); const h = m5Hand(W, 'R');
    if (t < drop) (k === 'w2' ? m5Shovel : m5Pick)(ctx, h[0], h[1], -1.9, 0.5); else { const u = M5B(t, drop, 0.3, 'in'); (k === 'w2' ? m5Shovel : m5Pick)(ctx, h[0] + 10 * u, K.lerp(h[1], 905, u), K.lerp(-1.9, -3.0, u), 0.5); } });
  // his thought balloon: throne and scroll replace the pyramid
  if (t > 105.6) { const hx = ride(t) + 10, k = m5Pop(t, 105.6, 0.4); thoughtCloud(ctx, hx + 70, 600, 200, 140, t, { p: M5B(t, 105.6, 0.6, 'lin'), tail: [hx + 10, 760], scale: 1, at: [0, 0], inside: (c) => { const sw = M5B(t, 106.2, 0.4); if (sw < 1) m5Icon(c, 'pyramid', 0, 0, 1 - sw); if (sw > 0) { m5Icon(c, 'throne', -30, 4, 0.8 * sw); m5Icon(c, 'scroll', 40, 10, 0.7 * sw); } } }); }
}
function m5O11(ctx, t, cam, S, P) {
  if (m5In(t, 103.12, 104.6)) { const [x, y] = P(330, 640); ctx.save(); ctx.globalAlpha = m5Fade(t, 103.12, 104.6, 0.15); sfx(ctx, 'STOP!', x, y, 100, M5B(t, 103.12, 0.25), { fill: C.red, rot: -0.05 }); ctx.restore(); }
}
