// ===== AN-046 acts 2: S6 the told flashback (glade, dream wash), S7 "I must go", S8 the king's ruling (THE POSE) =====

// ---------------------------------------------------------------- S6 glade 50.3-64.7 (also replayed inside thought clouds)
const A46_S6 = { peek: 50.58, enter: 51.2, kneel: 52.74, spread: 53.28, sow: [55.26, 55.73, 56.2], hide: 56.84, crows: 59.0, waddle: 60.14, peck: 60.94, snap: 63.1, up: 63.12, drop: 63.85 };
const A46_HX = (t) => kfn(t, [[A46_S6.enter, 1300], [52.6, 935], [A46_S6.hide, 935], [57.5, A46_BUSH + 10]]);
function a46s6Hunter(t) {
  const P = { ...A46_HUNT, y: A46_GR, dir: -1, ...walk(A46_HX, t, { stride: 26 }) };
  // sneak: high knees with a hold on each toe, lean in, eyes darting
  if (t < 52.6) { P.amp = Math.min(1, P.amp * 1.4) * (0.6 + 0.4 * Math.abs(Math.sin(P.ph))); P.lean = 0.1; P.look = Math.sign(Math.sin(t * 3.3)); P.brow = -0.4; P.mouth = 'closed'; P.handL = [-28, -150]; }
  if (a46in(t, A46_S6.kneel - 0.14, A46_S6.hide)) { P.kneel = a46e(t, A46_S6.kneel - 0.14, 0.3); P.lean = 0.25 * P.kneel; P.handLW = [K.lerp(905, 870, a46e(t, A46_S6.kneel, 0.54)), 880]; P.handRW = [P.handLW[0] + 14, 886]; }
  if (a46in(t, A46_S6.sow[0] - 0.3, A46_S6.hide)) { P.kneel = 0.4; P.lean = 0.12; P.handLW = null; P.handL = [-30, -120];
    const f = a46tap(t, A46_S6.sow, 0.3); P.handR = [40 + 30 * f, -150 + 10 * f]; P.look = a46sac(t, [[55.0, -1], [55.45, 1], [55.9, -1], [56.4, 1]]); P.brow = -0.4; P.mouth = 'smirk'; }
  if (t >= A46_S6.hide) { P.kneel = a46e(t, 57.3, 0.3); P.lean = 0.5 * a46e(t, 57.3, 0.3); P.sq = 1 - 0.18 * a46e(t, 57.3, 0.3); P.handR = [40, -110]; P.handL = [-20, -120]; P.look = 1; }
  if (t >= A46_S6.up) { const k = settleTo(t, A46_S6.up, 0, 1, 0.25, 0.12); P.kneel = 1 - Math.min(1, k); P.lean = -0.22 * k; P.sq = 0.82 + 0.18 * k; P.handR = P.handL = null; const hl = 14 * a46tap(t, [63.4, 63.75], 0.3); P.handLW = [1050 + hl, 800]; P.handRW = [1078 + hl, 780]; P.mouth = 'smile'; P.brow = -0.5; P.look = -1; P.dir = -1; }   // v2: stands up out of the bush hauling the rope
  P.lid = Math.max(0, blink(t, 37)); return P;
}
const A46_CROW = [{ land: 59.1, x0: 560, x1: 700, s: 1.22, from: [-80, 380] }, { land: 59.27, x0: 470, x1: 610, s: 1.14, from: [-170, 380] }];   // v2: 90 apart, the second 5 frames behind
function a46s6Crow(i, t) {
  const C0 = A46_CROW[i], d = i * 0.17, P = { kind: 'crow', s: C0.s, dir: 1, seed: 80 + i, y: A46_GR };
  if (t < C0.land) { if (t < C0.land - 1.2) return null; Object.assign(P, a46fly(t, [[C0.land - 1.2, C0.from[0], C0.from[1]], [C0.land, C0.x0, A46_GR]], { hz: 4, arc: -30, ph: i })); P.fly = true; return P; }
  const xf = (tt) => kfn(tt, [[A46_S6.waddle + d, C0.x0], [A46_S6.peck + d - 0.1, C0.x1]]);
  P.x = xf(t); P.sq = landSquash(t, C0.land, 0.28); P.drop = 10; P.tailDrop = -0.5; P.tip = 0.12;
  if (t < A46_S6.peck) { P.gaze = [1, 0.8]; P.y -= Math.abs(Math.sin((P.x - C0.x0) / 18)) * 6; P.rot = 0.06 * Math.sin((P.x - C0.x0) / 18); }
  if (t >= A46_S6.peck + d) { const ph = ((t - A46_S6.peck - d) / 0.5) % 1, j = ph < 0.4 ? Math.sin(ph / 0.4 * Math.PI) : 0; P.drop = 10 + 26 * j; P.headRot = 0.6 * j; P.eyes = ph > 0.45 && ph < 0.75 ? 'shut' : 'open'; P.tip = 0.12 + 0.18 * j; }
  return P;
}
// the told scene, drawable at any S6 clock tt (o.inside: inside a thought cloud: no sparrow, no labels)
function a46s6World(ctx, tt, o = {}) {
  const u = 0.3;
  if (!o.noSet) a46glade(ctx, tt, u);
  const snapK = K.clamp((tt - A46_S6.snap) / 0.13);
  // the nest and the witness
  if (!o.inside) {
    const rise = a46e(tt, 50.62, 0.3) * (1 - a46e(tt, A46_S6.drop, 0.2)) - 0.5 * pulse(tt, 54.56, 0.4);
    const sp = a46sp({ x: A46_NEST[0] - 6, y: A46_NEST[1] + 34 - 14 * rise, dir: 1, seed: 7, noBlink: false, badge: true });
    const H = a46sHead(sp);
    sp.gaze = tt < 50.62 ? [1, 0.1] : lookAt(H, gazePlan(tt, [[51.0, [1000, 820]], [53.0, [760, 890]], [57.7, [760, 890]], [58.0, [1060, 780]], [58.4, [760, 890]], [59.0, [560, 850]], [60.3, [700, 880]]], 0.1));
    if (a46in(tt, 61.6, A46_S6.snap)) { sp.sag = -0.6; sp.headRot = 0.12 * Math.sin(tt * 22); sp.x += tremble(tt, 1.5); sp.eyes = 'wide'; }
    if (tt >= A46_S6.snap) { sp.eyes = 'wide'; sp.gaze = [1, 0.4]; }
    a46nest(ctx, swing(tt, A46_S6.drop, 0.04, 2, 3));
    ctx.save(); ctx.beginPath(); ctx.rect(A46_NEST[0] - 90, A46_NEST[1] - 200, 180, 200 - 8); ctx.clip(); a46bird(ctx, sp); ctx.restore();
    a46nest(ctx, swing(tt, A46_S6.drop, 0.04, 2, 3), true);
    if (tt >= A46_S6.drop + 0.2) for (const dx of [-12, 12]) eye2(ctx, A46_NEST[0] + 10 + dx, A46_NEST[1] - 36, 'wide', 0.6, 0.2, 0, C.white, false);
  }
  // the net: rolled on the shoulder, unrolled, spread with grain and a rope to the bush, then the snap
  const rope = [[880, 896], [980, 892], [A46_BUSH - 20, tt >= A46_S6.snap ? 820 : 890]];
  if (tt >= A46_S6.kneel && tt < A46_S6.snap) a46net(ctx, 'spread', { x: A46_NETX, u: a46e(tt, A46_S6.kneel, 0.54), rope: tt >= A46_S6.hide ? rope.slice(1) : null });
  if (tt >= A46_S6.sow[0]) { const fill = K.clamp((tt - A46_S6.sow[0]) / 1.2) * (1 - 0.6 * K.clamp((tt - A46_S6.peck) / 2)); if (tt < A46_S6.snap) a46grain(ctx, A46_NETX, A46_GR - 2, fill); }
  for (const ts of A46_S6.sow) for (let g = 0; g < 6; g++) { const d = tt - ts - g * 0.04; if (d < 0 || d > 0.45) continue; const u2 = d / 0.45, gx = K.lerp(910, A46_NETX - 30 + g * 12, u2), gy = K.lerp(780, A46_GR - 4, u2) - 70 * Math.sin(Math.PI * u2); a46grainDot(ctx, gx, gy, d * 9); }
  // crows
  const crows = [a46s6Crow(1, tt), a46s6Crow(0, tt)];
  if (tt < A46_S6.snap + 0.05) for (const P of crows) if (P) a46bird(ctx, P);
  if (tt >= A46_S6.snap) {
    const wob = tt - A46_S6.snap;
    const bx = A46_NETX - 40, sh = 1 + 0.05 * Math.sin(tt * 18) * Math.exp(-wob * 1.5);
    a46net(ctx, 'bag', { x: bx, k: snapK, ground: true, light: true, wob: wob < 1.5 ? wob : 0, rope: [[1050, 800], [1064, 790]], inside: (c) => { for (let i = 0; i < 2; i++) { const P = { kind: 'crow', x: bx - 30 + i * 60, y: A46_GR - 8 - 22 * i + 6 * Math.sin(tt * 14 + i * 2), s: 0.85, dir: i ? -1 : 1, rot: 0.3 * Math.sin(tt * 9 + i), eyes: 'wide', sag: -0.8 * Math.abs(Math.sin(tt * 12 + i)), noBlink: true }; a46bird(c, P); } } });
    if (snapK > 0.9) { ctx.save(); ctx.translate(bx, A46_GR); ctx.scale(sh, 1 / sh);   // two beaks and a tail poking through the mesh
      shape(ctx, [[-86, -62], [-118, -54 + 4 * Math.sin(tt * 16)], [-86, -48]], '#3a3a4a', { lw: 3.5, seed: 150 }); shape(ctx, [[54, -108], [76, -136 + 4 * Math.sin(tt * 13)], [64, -100]], '#3a3a4a', { lw: 3.5, seed: 151 });
      shape(ctx, [[88, -34], [128, -50 + 6 * Math.sin(tt * 11)], [132, -30], [126, -14], [88, -20]], C.black, { lw: 3, seed: 152 }); ctx.restore(); }
  }
  // the hunter, then the bush over him
  if (tt >= A46_S6.enter) { const P = a46s6Hunter(tt); a46hunter(ctx, P);
    if (tt < A46_S6.kneel + 0.3) { const sh = a46L2W(P, [-36, -150]); a46net(ctx, 'roll', { x: sh[0], y: sh[1], rot: 0.3 }); }
  }
  a46bushFront(ctx);
  if (tt >= A46_S6.up) a46upper(ctx, a46s6Hunter(tt), 818, a46hunter);
  if (a46in(tt, A46_S6.hide + 0.7, A46_S6.up)) { const P = a46s6Hunter(tt), f = a46featherW(P); a46feather(ctx, f[0] + 30, f[1] + 70 - 4 * a46tap(tt, [57.9, 61.0], 0.3), -0.3 + 0.2 * a46tap(tt, [57.9], 0.3), 1); }
  // a leaf falls in the still beat
  if (a46in(tt, 57.7, 59.4)) a46featherFall(ctx, tt, 57.7, 59.2, [420, 470], [520, 890], 1, GREEN);
  void u;
}
function a46s6(ctx, t) { a46s6World(ctx, t); }
function a46o6(ctx, t, cam, S, tp) {
  if (a46in(t, A46_S6.spread, 55.3)) { const p = a46e(t, A46_S6.spread, 0.3) * (1 - K.clamp((t - 55.1) / 0.2)), [x, y] = tp(A46_NETX, 790); S.label(ctx, 'NET', x, y, p, { size: 44, align: 'center' }); if (p > 0.5) S.arrow(ctx, [x, y + 20], tp(A46_NETX, 880), K.clamp((t - 53.5) / 0.3), { width: 14 }); }
  if (a46in(t, 54.56, 55.3)) { const p = 1 - K.clamp((t - 55.1) / 0.2); S.arrow(ctx, tp(660, 880), tp(380, 600), a46e(t, 54.56, 0.35) * p, { width: 16, bend: 0.25 }); const [x, y] = tp(480, 720); S.label(ctx, 'MY NEST', x, y, a46e(t, 54.7, 0.3) * p, { size: 40, align: 'center', fill: C.yellow }); }
  if (a46in(t, 56.3, 57.6)) { const [x, y] = tp(A46_NETX, 830); S.label(ctx, 'GRAIN', x, y - 30, a46e(t, 56.3, 0.3) * (1 - K.clamp((t - 57.4) / 0.2)), { size: 40, align: 'center', fill: C.yellow }); }
  if (a46in(t, A46_S6.snap, 64.3)) { const [x, y] = tp(A46_NETX - 40, 625); a46word(ctx, 'SNAP!', x, y, 84, a46e(t, A46_S6.snap, 0.2) * (1 - K.clamp((t - 64.1) / 0.2)), { rot: -0.1, fill: C.red }); }
}

// ---------------------------------------------------------------- S7 summit 64.7-72.3: "I must go"
const A46_SP7 = [640, 900];
function a46s7Sp(t) {
  const P = a46sp({ x: A46_SP7[0], y: A46_SP7[1], dir: 1, seed: 7, badge: true });
  const H = a46sHead(P), kH = a46peaHead(a46kingSeat(t));
  P.gaze = lookAt(H, kH); P.sq = 1 + 0.03 * Math.sin(t * 2 * Math.PI * 2.5) * (t < 67 ? 1 : 0.3);
  P.beak = talk(t, [[64.8, 66.2], [66.4, 68.2], [68.8, 70.2], [70.5, 72.0]]) * 0.9;
  if (t < 66.3) P.sag = -0.8 * pulse(t, 64.7, 1.4);
  if (t >= 68.26) { P.sq = (t < 68.6 ? 0.95 : 1.05) * (t > 69 ? 0.97 : 1); P.brow = 0.4; }
  if (a46in(t, 68.78, 70.38)) { const k = a46e(t, 68.78, 0.2); P.sag = -0.85 * k; P.tip = 0.12 * k; P.gaze = [1, -0.1]; P.ph = 1.2 * k; P.amp = 0.4 * k; }
  if (t >= 70.38) { P.x += tremble(t, 2.5); P.sq = 0.9; P.eyes = 'wide'; P.wet = true; P.gaze = t < 71.0 ? [-1, -0.2] : lookAt(H, kH); P.brow = -0.4; }
  return P;
}
function a46s7(ctx, t) {
  a46summit(ctx, t, 0.34);
  const king = a46kingSeat(t), kH = a46peaHead(king), sp = a46s7Sp(t), sH = a46sHead(sp);
  king.gaze = lookAt(kH, sH); king.bow = 0.25 + 0.15 * a46tap(t, [66.3, 67.62, 69.2], 0.4); king.lid = Math.max(0.2, a46tap(t, [67.0], 0.6), blink(t, 61));
  if (t >= 70.38) king.brow = -0.3;
  a46pea(ctx, king);
  // the bindle: lying beside him, then shouldered (the bundle swings a beat late)
  if (t < 68.26) a46bindle(ctx, 600, 896, 0, 1); else { const k = a46e(t, 68.26, 0.3); const sh = [sp.x + 10, sp.y - 40]; a46bindle(ctx, K.lerp(600, sh[0], k), K.lerp(896, sh[1], k), K.lerp(0, 0.6, k), 1, swing(t, 68.56, 0.5, 1.6, 2.5) + (t >= 70.38 ? 0.08 * Math.sin(t * 50) : 0)); }
  a46bird(ctx, sp);
  if (t >= 71.56) thoughtCloud(ctx, 500, 650, 230, 160, t, { p: a46e(t, 71.56, 0.5, 'lin'), tail: [sH[0] - 10, sH[1] - 20], scale: 0.3, at: [640, 760], bg: C.paper, inside: (c, tt) => {
    c.save(); c.filter = 'brightness(0)'; a46hunter(c, { ...A46_HUNT, x: 560, y: 900, dir: 1, aR: [2.6, 2.9], noBlink: true }, { stubble: false }); c.restore();
    c.save(); c.translate(700, 760); c.rotate(0.12 * Math.sin(tt * 3)); c.translate(-700, -760); a46net(c, 'bag', { x: 700, y: 980, k: 1, rope: [[640, 760]] }); c.restore(); } });
}
function a46o7(ctx, t, cam, S, tp) {
  if (a46in(t, 68.9, 70.4)) { const p = 1 - K.clamp((t - 70.2) / 0.2); S.arrow(ctx, tp(700, 830), [1010, 560], a46e(t, 68.9, 0.4) * p, { width: 16, bend: -0.2 }); const [x, y] = tp(760, 700); S.label(ctx, 'I MUST GO!', Math.min(x, 820), y, a46e(t, 69.0, 0.3) * p, { size: 42, align: 'center', balloon: true }); }
}

// ---------------------------------------------------------------- S8 summit 72.3-84.4: the ruling
const A46_S8 = { stop: 72.36, rise: 73.7, no: 75.34, home: 76.72, fan: 77.32, hope: 78.46, catch: 79.44, pose: 80.22, look: 81.02, bow: 82.2, fold: 83.3, go: 84.02 };
function a46s8King(t) {
  const P = a46kingSeat(t); P.sit = 1 - a46e(t, A46_S8.rise, 0.45); P.y = A46_THRONE_P[1] + 2;
  const H = a46peaHead(P), sH = a46sHead(a46s8Sp(t, true));
  P.gaze = lookAt(H, sH); P.lid = Math.max(t >= A46_S8.rise ? 0.35 : 0.1, blink(t, 61));
  if (t >= A46_S8.rise) P.neck = 1 + 0.1 * a46e(t, A46_S8.rise, 0.4);
  // wing: up "stop" with overshoot, sweep down to point home, swing round to stop the hop, then to the sky (THE POSE)
  P.wing = Math.min(1.08, settleTo(t, A46_S8.stop, 0, 1, 0.25, 0.1)); P.wingA = a46kv(t, [[A46_S8.stop, -1.0], [A46_S8.home, -1.0], [A46_S8.home + 0.35, 0.9], [A46_S8.catch, 0.9], [A46_S8.catch + 0.25, 0.25], [A46_S8.pose - 0.3, 0.25], [A46_S8.pose, A46_FATE.wingA]]);
  if (a46in(t, A46_S8.no, A46_S8.home)) { P.headRot = 0.16 * Math.sin((t - A46_S8.no) * Math.PI / 0.6); P.talk = talk(t, [[75.34, 76.6]]) * 0.6; }
  P.talk = Math.max(P.talk || 0, talk(t, [[73.75, 74.9], [76.0, 76.6], [77.3, 79.3], [79.5, 80.1], [80.3, 81.9]]) * 0.55);
  P.crest = a46crestLag(t, [A46_S8.rise, 75.6, 76.2, A46_S8.pose]);
  P.fan = t < A46_S8.fan ? 0 : 1.0 * K.clamp((t - A46_S8.fan) / 2.9);
  if (t >= A46_S8.pose) { Object.assign(P, { fan: 1, wing: 1, wingA: A46_FATE.wingA, neck: A46_FATE.neck, headRot: A46_FATE.headRot, brow: A46_FATE.brow, lid: A46_FATE.lid }); P.fanShake = 0.3; P.gaze = [-0.3, 0.5]; }
  if (t >= A46_S8.fold) { P.fan = 1 - 0.8 * a46e(t, A46_S8.fold, 0.5); P.wing = 1 - a46e(t, A46_S8.fold - 0.6, 0.5); P.bow = 0.2 * pulse(t, A46_S8.fold, 0.5); P.lid = Math.max(0.3, a46tap(t, [83.9], 0.35)); P.gaze = t > 84.0 ? [-1, 0.1] : P.gaze; P.headRot = 0; P.fanShake = 0; }
  return P;
}
function a46s8Sp(t, posOnly) {
  const P = a46sp({ x: A46_SP7[0], y: A46_SP7[1], dir: 1, seed: 7, badge: true });
  if (t >= A46_S8.go) { Object.assign(P, a46fly(t, [[A46_S8.go + 0.08, P.x, P.y], [84.42, P.x - 330, 640]], { hz: 11, arc: -40 })); P.dir = -1; P.fly = t > A46_S8.go + 0.08; }
  if (posOnly) return P;
  const H = a46sHead(P), kH = a46peaHead(a46s8King(t));
  P.gaze = lookAt(H, kH); P.sq = 1;
  if (t < A46_S8.hope) { P.eyes = 'wide'; P.brow = -0.3; }
  if (a46in(t, A46_S8.hope, A46_S8.bow)) { const k = a46e(t, A46_S8.hope, 0.4); P.sq = 1 - 0.1 * k; P.drop = 4 * k; P.gaze = [-0.5, -1]; P.eyes = 'open'; P.brow = 0; P.lid = Math.max(0.15, a46tap(t, [79.2], 0.7)); }   // v2: shrinks under the opening fan, one slow blink
  if (a46in(t, A46_S8.look, A46_S8.bow)) { P.gaze = lookAt(H, a46sac(t, [[81.02, kH], [81.4, [600, 896]], [81.75, kH]])); P.brow = -0.5 * a46e(t, 81.5, 0.4); }
  if (a46in(t, A46_S8.bow, A46_S8.go)) { const k = a46e(t, A46_S8.bow, 0.6); P.sq = 1 - 0.08 * k; P.drop = 8 * k; P.tip = 0.12 * k; P.lid = a46in(t, 82.6, 83.3) ? 1 : 0; P.gaze = [0.4, 1]; }
  if (t >= A46_S8.go - 0.18) { P.sq = anticipate(t, A46_S8.go - 0.18, 0.18, 0.15) * (t > A46_S8.go ? 1.1 : 1); P.drop = 0; P.gaze = t > 84.2 ? [1, 0] : [-1, -0.3]; }
  return P;
}
function a46s8(ctx, t) {
  a46summit(ctx, t, 0.34, { sun: false });
  const king = a46s8King(t); a46pea(ctx, king);
  const sp = a46s8Sp(t);
  // the bindle: on his shoulder, bouncing in the hope hop, then laid down (it sags)
  if (t < A46_S8.bow) a46bindle(ctx, sp.x + 10, sp.y - 40, 0.6, 1, swing(t, A46_S8.hope, 0.3, 2, 2.5));
  else { const k = a46e(t, A46_S8.bow, 0.6) * (1 - a46e(t, 83.5, 0.4)); a46bindle(ctx, K.lerp(sp.x + 10 * sp.dir, 600, k), K.lerp(sp.y - 40, 896, k), K.lerp(0.6 * sp.dir, 0, k), 1, 0.3 * k + swing(t, 84.1, 0.4, 2, 2.5)); }   // v2: picks it up again before take-off
  a46bird(ctx, sp);
  if (a46in(t, 72.3, 72.7)) thoughtCloud(ctx, 500, 650, 230, 160, t, { p: 1 - a46e(t, 72.36, 0.3), tail: [a46sHead(sp)[0] - 10, a46sHead(sp)[1] - 20] });
  if (a46in(t, A46_S8.home + 0.3, A46_S8.fan + 1.0)) { const p = a46e(t, A46_S8.home + 0.3, 0.3) * (1 - a46e(t, A46_S8.fan + 0.7, 0.3)); ctx.save(); ctx.globalAlpha = p; ctx.save(); ctx.translate(470, 880); ctx.scale(0.45, 0.45); nestDraw(ctx, 0, 0, { eggs: 0 }); ctx.restore(); ctx.restore(); }
}
function a46o8(ctx, t, cam, S, tp) {
  if (a46in(t, A46_S8.home + 0.3, A46_S8.fan + 1.0)) { const p = 1 - a46e(t, A46_S8.fan + 0.7, 0.3); S.arrow(ctx, tp(660, 700), tp(500, 850), a46e(t, A46_S8.home + 0.3, 0.3) * p, { width: 14, bend: 0.2 }); }
  if (a46in(t, 75.5, 76.7)) { const H = a46peaHead(a46s8King(t)), [bx, by] = tp(H[0] - 34, H[1] + 4), [x, y] = tp(H[0] - 210, H[1] - 120); bubble(ctx, x, y, 220, 110, bx, by, a46e(t, 75.5, 0.25) * (1 - K.clamp((t - 76.5) / 0.2)), 'STAY!', { size: 56 }); }
  if (a46in(t, A46_S8.pose, 82.25)) a46word(ctx, 'FATE', 185, 215, 96, a46e(t, A46_S8.pose, 0.25) * (1 - K.clamp((t - 82.05) / 0.2)), { rot: -0.08 });   // v2: headline in the clear sky left of the fan
}
