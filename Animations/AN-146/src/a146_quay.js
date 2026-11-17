// ===== AN-146 the port: S13 to the storeroom, S14 inside the storeroom, S15 reloading, S16 the thief catches up, S17 the cloak and the parting =====
const A146_ARROW = [[520, 884], [1200, 892], [1330, 772], [1440, 764]];
const a146PolyAt = (pts, u) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let r = u * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const f = r / L[i]; return [K.lerp(pts[i][0], pts[i + 1][0], f), K.lerp(pts[i][1], pts[i + 1][1], f)]; } r -= L[i]; } return pts[pts.length - 1]; };

// ---------- S13 123.6..132.6 ----------
const A146_S13M = a146X([[123.6, 150], [125.4, 410]]), A146_S13D = a146X([[123.6, 330], [125.72, 880]]), A146_S13C = a146X([[123.6, 120], [125.8, 680]]);
function a146S13(ctx, t) {
  const door = t < 131.54 ? 0 : settleTo(t, 131.95, 0, 0.7, 0.45, 0.08);
  a146Quay(ctx, { t, door });
  const Cm = { ...walk(A146_S13C, t, { stride: GAIT.camel * 1.0 }), y: 900, s: 1.0, dir: 1, pal: 0, chew: (t % 1.3) / 1.3, lid: 0.5 }; Cm.rot = swing(t, 125.8, 0.025, 1.2, 2);
  const dtf = turnFlip(t, [[0, 1], [125.5, -1]], 0.35), D = a146Drv(A146_S13D(t), { ...a146Walk(A146_S13D, t, 1.2), dir: dtf.dir, drop: 8 * dtf.tuck });
  D.hR = a146HT(t, D, [[123.6, [60, -110]], [124.2, PERSON_HANDS.wave.R, 0.2], [124.7, [60, -110], 0.2], [125.72, PERSON_HANDS.pointFwd.R, 0.2], [127.0, A146H.rest, 0.3]]); D.gaze = t < 125.5 ? [-0.8, 0] : a146LookAt(D, [410, 700]);
  const mtf = turnFlip(t, [[0, 1], [130.24, -1], [130.6, 1]], 0.3), M = a146Mer(A146_S13M(t), { ...a146Step(A146_S13M, t), dir: mtf.dir, drop: 8 * mtf.tuck });
  M.tip = (t < 125.4 ? 0.06 : 0) - 0.1 * pulse(t, 131.3, 0.4) + 0.15 * K.clamp((t - 131.7) / 0.25) * (t < 132.4 ? 1 : 0); M.brow = 0.4; M.sq = anticipate(t, 130.76, 0.25, 0.05);
  M.gaze = t < 125.4 ? [1, 0] : t < 126.4 ? a146LookAt(M, [410, 620]) : t < 130.24 ? a146LookAt(M, [1400, 700]) : a146LookAt(M, [410, 700]);
  M.hL = a146HT(t, M, [[123.6, [-40, -86]], [130.76, [20, -110], 0.15], [131.1, [-40, -86], 0.2], [131.5, { w: [350, 720] }, 0.3]]);
  M.hR = a146HT(t, M, [[123.6, A146H.rest], [130.76, [-10, -120], 0.15], [131.1, A146H.rest, 0.2], [131.5, { w: [470, 720] }, 0.3]]);
  camel(ctx, Cm); a146Person(ctx, D); a146Person(ctx, M);
  ctx.save(); ctx.translate(M.HL[0], M.HL[1]); ctx.rotate(0.2 * Math.sin(t * 6) * K.clamp(M.amp)); seg(ctx, 0, 0, 0, 22, 4, A146_ROPED, 1.5); shape(ctx, [[-7, 20], [7, 20], [11, 46], [-11, 46], [-7, 20]], C.yellow, { lw: 3, seed: 303, dot: C.red, pitch: 5, rad: 0.2, da: 0.4 }); ctx.restore();
  // the thief's plan: a dotted path from the storeroom door to the ship, four ghost bales hopping along it
  if (a146In(t, 128.18, 130.4)) { const p = K.clamp((t - 128.18) / 0.8), fade = K.clamp((130.4 - t) / 0.3), n = 40; ctx.save(); ctx.globalAlpha = fade;
    for (let i = 0; i < n * p; i++) { const q = a146PolyAt(A146_ARROW, i / n); shape(ctx, ell(q[0], q[1] - 12, 11, 11, 10), C.yellow, { lw: 4, seed: 640 }); } if (p >= 1) S0.arrow(ctx, [1380, 740], [1450, 720], 1, { width: 22, bend: 0 }); ctx.restore();
    for (let k = 0; k < 4; k++) { const u = K.clamp((t - 129.04 - k * 0.15) / 1.0); if (u <= 0 || u >= 1) continue; const q = a146PolyAt(A146_ARROW, u); ctx.save(); ctx.globalAlpha = fade; a146Bale(ctx, q[0], q[1] - 20 - Math.abs(Math.sin(u * 12)) * 30, { ghost: true, s: 0.5, ghostCol: C.white }); ctx.restore(); } }
  return { M, D, Cm };
}

// ---------- S14 132.6..146.9: the storeroom ----------
const A146_SX = 710, A146_TAPS = [136.92, 137.15, 137.4, 137.64];
const A146_S14M = a146X([[132.8, 125], [134.6, 400], [136.0, 400], [136.3, 500], [145.0, 500], [145.5, 270], [145.7, 270], [146.3, 480]]);
function a146S14(ctx, t) {
  const D = a146Store(ctx, { t }), pts = a146StackPts(A146_SX, 900);
  const lift = K.clamp((t - 136.36) / 0.55), held = t >= 140.8, gone = t >= 145.1;
  const tap = (i) => 1 - 0.06 * pulse(t, A146_TAPS[[0, 3, 2, 1].indexOf(i)], 0.22);
  a146Stack(ctx, A146_SX, 900, { sq: [0, 1, 2, 3].map(tap), tassel: swing(t, 137.64, 0.4) + swing(t, 138.95, 0.5), only: gone ? [1, 2, 3] : undefined });
  if (!held) a146CloakDrape(ctx, A146_SX, 900, 1, lift, t);
  const M = a146Mer(A146_S14M(t), { ...a146Step(A146_S14M, t), dir: t > 145.0 && t < 145.7 ? -1 : 1 }); if (t >= 144.0) { M.pal = { cape: C.red, capeDot: '#8a1410' }; M.cloak = 1; }
  M.alpha = K.clamp((t - 132.6) / 0.3);
  if (a146In(t, 135.72, 136.0)) M.ph = 1.0, M.amp = 0;
  const knot = [pts[2][0] + 40, pts[2][1] - 55];
  if (t < 134.14) M.gaze = [1, 0.1];
  else if (t < 135.72) M.gaze = a146Gaze(t, M, [[134.14, [300, 760]], [134.5, [410, 800]], [134.85, [700, 420]], [135.3, [930, 860]]], 0.07);
  else if (t < 137.64) { M.gaze = a146LookAt(M, t < 136.92 ? [600, 820] : pts[[0, 3, 2, 1][Math.max(0, countedBeats(t, A146_TAPS).n - 1)]]); M.brow = -0.4; M.sq = 1.03; M.mouth = t > 137.0 ? 'smile' : 'o'; }
  else if (t < 139.98) { M.gaze = a146LookAt(M, knot); M.mouth = 'smile'; M.drop = a146Nods(t, [139.0], 0.4, 6); if (a146In(t, 139.24, 139.9)) { M.lid = 1; M.sq = 1 + 0.04 * pulse(t, 139.24, 0.7); } }
  else if (t < 142.72) { M.gaze = a146LookAt(M, held ? M.HR || [640, 700] : [700, 720]); M.tilt = 0.05; M.mouth = held ? 'frown' : 'closed'; M.brow = held ? 0.2 : 0; }
  else if (t < 143.56) { M.gaze = [0, 0.05]; M.lid = 0.45; M.brow = -0.4; M.mouth = 'smile'; }
  else { M.gaze = t < 145.5 ? a146LookAt(M, [300, 760]) : [0, 0.05]; M.mouth = 'smile'; if (a146In(t, 146.38, 146.9)) M.wink = 'R'; }
  M.sq = (M.sq ?? 1) * anticipate(t, 144.8, 0.2, 0.1) * anticipate(t, 143.3, 0.25, 0.04); M.tip = (a146In(t, 145.0, 145.6) ? -0.08 : 0) + 0.06 * pulse(t, 138.7, 0.4);
  const tp = (i) => [pts[i][0] - 30, pts[i][1] - 70];
  M.hR = a146HT(t, M, [[132.6, A146H.rest], [136.36, { w: [575, 860] }, 0.15], [136.6, (tt) => ({ w: [K.lerp(575, 600, lift), K.lerp(860, 730, lift)] }), 0.05], [136.9, { w: tp(0) }, 0.1], [137.05, { w: tp(3) }, 0.1], [137.3, { w: tp(2) }, 0.1], [137.55, { w: tp(1) }, 0.1],
    [137.9, A146H.rest, 0.3], [138.5, { w: [knot[0] - 4, knot[1]] }, 0.2], [138.8, { w: [knot[0] - 8, knot[1] + 20] }, 0.1], [139.1, { w: [pts[2][0], pts[2][1] - 90] }, 0.2], [139.6, A146H.rest, 0.3],
    [140.8, { w: [650, 690] }, 0.25], [141.1, PERSON_HANDS.reach.R, 0.35], [143.3, { a: [2.7, 2.8] }, 0.25], [143.6, { a: [-1.2, -0.6] }, 0.3], [144.1, A146H.rest, 0.3],
    [144.8, { w: [pts[0][0] - 40, 850] }, 0.2], [145.0, [20, -205], 0.3], [145.55, PERSON_HANDS.reach.R, 0.15], [145.8, A146H.rest, 0.3], [146.38, [-18, -150], 0.2], [146.8, A146H.rest, 0.2]]);
  M.hL = a146HT(t, M, [[132.6, A146H.restL], [138.5, { w: [knot[0] - 20, knot[1] + 6] }, 0.2], [139.6, A146H.restL, 0.3], [140.8, [-10, -130], 0.3], [141.6, A146H.restL, 0.3], [144.8, { w: [pts[0][0] - 60, 870] }, 0.2], [145.0, [-24, -200], 0.3], [145.55, A146H.restL, 0.3]]);
  // the held cloak hangs from his pinch; the throw round his shoulders
  a146Person(ctx, M);
  if (a146In(t, 140.8, 143.56)) a146Cloak(ctx, M.HR[0], M.HR[1], { tw: 26, bw: 150, h: 180, rot: swing(t, 141.1, 0.18) + 0.02 * Math.sin(t * 2), t, wave: 0.3 });
  if (a146In(t, 143.56, 144.05)) { const u = (t - 143.56) / 0.49, sh = a146W(M, [0, -150]); a146Cloak(ctx, K.lerp(M.HR[0], sh[0], u), K.lerp(M.HR[1], sh[1], u) - 60 * Math.sin(Math.PI * u), { tw: K.lerp(26, 70, u), bw: 180, h: K.lerp(180, 120, u), rot: K.lerp(-2.2, 0, u), t, wave: 1 }); }
  if (a146In(t, 145.0, 145.55)) { const h = a146Head(M); a146Bale(ctx, h[0] + 10, h[1] - 30, { col: 'red', s: 0.85, rot: -0.1 }); }
  // the driver's arms at the doorway take the bale
  if (a146In(t, 145.2, 146.3)) { const Dr = a146Drv(150, { dir: 1, alpha: Math.min(K.clamp((t - 145.2) / 0.2), K.clamp((146.3 - t) / 0.2)), hR: PERSON_HANDS.reachBoth.R, hL: PERSON_HANDS.reachBoth.L, gaze: [1, 0] }); a146Person(ctx, Dr);
    if (t > 145.55) a146Bale(ctx, (Dr.HR[0] + Dr.HL[0]) / 2, Dr.HR[1] + 50, { col: 'red', s: 0.75 }); }
  // dark room, the light cone reaching the stack
  const dark = kfn(t, [[132.6, 0.7], [134.14, 0.7], [135.5, 0.35]]), reach = kfn(t, [[132.6, 0.45], [135.7, 1]]);
  a146Dark(ctx, dark, [-60, -60, 1120, 1360], [a146StoreCone(D, reach), [M.x, 700, 120 * reach]]);
  return { M, knot };
}

// ---------- S15 146.9..154.3 and S16 154.3..168.3 and S17 168.3..179.98: one quay timeline ----------
const A146_QM = a146X([[146.9, 470], [150.64, 470], [154.3, 920], [156.32, 980], [174.12, 980], [177.2, 1640]]);
const A146_QC = a146X([[146.9, 600], [150.64, 600], [154.3, 1130], [156.32, 1190], [174.2, 1190], [177.4, 1900]]);
const A146_QD = a146X([[146.9, 780], [150.64, 780], [154.3, 1360], [156.32, 1420], [174.25, 1420], [177.6, 2100]]);
const A146_QI = a146X([[153.0, 520], [155.7, 790], [174.64, 790], [177.0, 300]]);
const A146_QLAND = [148.2, 148.5, 148.8, 149.1], A146_TICKS = [163.0, 163.3, 163.68, 164.1];
function a146Quay2(ctx, t) {
  a146Quay(ctx, { t, door: 0.7, sail: t > 176.6 ? 0.5 + 0.5 * K.clamp((t - 176.6) / 0.6) : 0.5 });
  const nb = A146_QLAND.filter((a) => t >= a).length;
  // camel: kneeling to 149.8, walks, stops 156.32 and looks back, grins at the laugh, leaves
  const Cm = { ...walk(A146_QC, t, { stride: GAIT.camel * 1.0 }), y: 900, s: 1.0, dir: 1, pal: 0, chew: (t % 1.3) / 1.3, lid: 0.5 };
  Cm.kneel = t < 149.8 ? 1 : 1 - K.ease.inOut(K.clamp((t - 149.8) / 0.8)); Cm.rot = swing(t, 150.6, 0.03, 1.2, 2); Cm.sq = A146_QLAND.reduce((s, a) => s * (1 - 0.03 * pulse(t, a, 0.25)), 1);
  Cm.headTurn = t < 156.32 ? 0 : t < 174.0 ? (t < 156.7 ? K.ease.inOut((t - 156.32) / 0.38) : 1 - (a146In(t, 157.32, 158.6) ? 0.25 * (1 - Math.cos((t - 157.32) / 1.28 * Math.PI * 2)) / 2 * 2 : 0)) : 1 - K.clamp((t - 174.0) / 0.4);
  Cm.headTurn *= 0.62;   // over the shoulder (a full turn hides the head behind the load)
  if (a146In(t, 157.32, 158.6)) Cm.lid = Math.max(0.5, pulse(t, 157.6, 0.18), pulse(t, 158.2, 0.18)); if (a146In(t, 169.64, 171.0)) { Cm.mouth = 'smile'; Cm.talk = 0.5 * Math.abs(Math.sin(t * 8)); }
  // driver
  const D = a146Drv(A146_QD(t), { ...a146Walk(A146_QD, t, 1.2), dir: t < 150.4 ? -1 : 1 }); D.tip = lurch(t, 156.32, 0.12); D.gaze = t < 150.6 ? a146LookAt(D, [600, 700]) : t < 152 ? a146LookAt(D, [1190, 600]) : t < 156.32 ? [1, 0] : [-1, 0.1];
  if (a146In(t, 169.64, 171.2)) { D.mouth = 'open'; D.lid = 0.6; }
  // merchant (red cloak from the storeroom until 170.6)
  const mtf = turnFlip(t, [[0, 1], [156.32, -1], [173.44, 1]], 0.4), M = a146Mer(A146_QM(t), { ...a146Step(A146_QM, t), dir: mtf.dir, drop: 8 * mtf.tuck });
  const cloakM = t < 170.6; if (cloakM) { M.pal = { cape: C.red, capeDot: '#8a1410' }; M.cloak = 1; }
  const tf2 = turnFlip(t, [[0, 1], [173.57, -1]], 0.4), I = a146Imp(A146_QI(t), { ...a146Step(A146_QI, t), dir: tf2.dir, drop: 8 * tf2.tuck }); I.hidden = t < 153.0;
  const cloakI = t >= 171.9; I.pal = cloakI ? { ...A146_IMP_PAL } : { beard: A146_IMP_PAL.beard }; I.cloak = cloakI ? 1 : 0;
  const mh = a146Head(M), ih = a146Head(I), seat = mountSeat('camel', Cm), load = [seat.x, seat.y - 30];
  // merchant acting
  M.mouth = 'smile'; M.gaze = t < 150.64 ? a146LookAt(M, load) : t < 156.32 ? [1, 0] : t < 168.52 ? a146LookAt(M, ih) : t < 173.44 ? a146LookAt(M, ih) : [1, 0];
  if (a146In(t, 160.46, 167.52)) { M.brow = -0.3; M.lid = 0.35; M.mouth = 'closed'; M.drop = (M.drop || 0) + a146Nods(t, [163.7, 164.2], 0.35, 5); }
  if (a146In(t, 167.52, 168.52)) { M.gaze = a146Gaze(t, M, [[167.52, a146W(M, [-24, -150])], [167.95, ih]], 0.25); M.mouth = 'closed'; }
  if (a146In(t, 168.52, 170.4)) { M.eyes = 'shut'; M.mouth = 'open'; M.tilt = -0.14; M.sq = [168.6, 168.95, 169.3, 169.65].reduce((s, a) => s + 0.05 * pulse(t, a, 0.3) - 0.03 * pulse(t, a + 0.17, 0.15), 1); }
  if (a146In(t, 172.6, 173.2)) { M.wink = 'R'; M.brow = -0.4; }
  M.hR = a146HT(t, M, [[146.9, A146H.rest], [147.2, { w: [560, 770] }, 0.2], [148.0, (tt) => ({ w: [seat.x - 30, seat.y - 20 - 50 * A146_QLAND.reduce((s, a) => s + pulse(tt, a - 0.3, 0.3), 0)] }), 0.2], [148.96, { w: [seat.x - 20, seat.y - 60] }, 0.12], [149.2, A146H.rest, 0.3],
    [160.46, PERSON_HANDS.folded.R, 0.3], [167.52, PERSON_HANDS.folded.R], [170.48, { a: [2.7, 2.6] }, 0.3], [170.9, { a: [1.5, 1.3] }, 0.15], [171.3, A146H.rest, 0.3], [172.14, PERSON_HANDS.palmsUp.R, 0.25], [173.3, A146H.rest, 0.3], [175.68, PERSON_HANDS.wave.R, 0.25], [176.4, A146H.rest, 0.3]]);
  M.hL = a146HT(t, M, [[146.9, A146H.restL], [147.2, { w: [540, 790] }, 0.2], [149.2, A146H.restL, 0.3], [160.46, PERSON_HANDS.folded.L, 0.3], [168.4, A146H.restL, 0.3], [172.14, PERSON_HANDS.palmsUp.L, 0.25], [173.3, A146H.restL, 0.3]]);
  M.tip = (a146In(t, 170.3, 170.9) ? -0.1 : 0) + 0.04 * pulse(t, 148.96, 0.4);
  // impostor acting: sprint, shout, the climb of his eyes, counting, slump, sheepish, pointing, pleading, the shiver; the nervous laugh, the bow, leaving
  I.tilt = t < 171.9 ? (t < 159.6 ? 0.14 : 0.22) : 0; I.mouth = t < 156.0 ? 'open' : 'closed';
  if (t < 156.32) { I.gaze = a146LookAt(I, mh); I.sq = 1 + 0.02 * Math.sin(t * 18); }
  else if (t < 158.1) I.gaze = a146LookAt(I, mh);
  else if (t < 159.6) { I.gaze = a146LookAt(I, load); I.mouth = 'o'; }
  else if (t < 160.46) { I.sq = 0.9; I.tip = 0.08; I.lid = 0.5; I.gaze = [0, 0.4]; I.mouth = 'frown'; }
  else if (t < 165.4) { I.mouth = 'smile'; I.talk = talk(t, [[160.5, 165.3]]) * 0.7; I.brow = -0.5; I.gaze = a146In(t, 162.6, 164.5) ? a146LookAt(I, load) : a146LookAt(I, mh); }
  else if (t < 168.52) { I.gaze = a146In(t, 165.4, 166.68) ? a146Gaze(t, I, [[165.4, a146W(M, [-24, -150])], [165.75, mh], [166.1, a146W(M, [-24, -150])], [166.4, mh]], 0.07) : a146LookAt(I, mh); I.brow = -0.7;
    if (t >= 166.68) { I.kneel = 0.3 * K.clamp((t - 166.68) / 0.3); I.wet = true; } if (t >= 167.52) { I.x += tremble(t, 2, 12); I.sq = 0.96; } }
  else if (t < 171.28) { I.gaze = t < 169.9 ? a146LookAt(I, a146W(M, [-24, -150])) : a146LookAt(I, mh); I.talk = a146In(t, 169.9, 170.6) ? 0.5 * Math.abs(Math.sin(t * 12)) : 0; I.mouth = 'smile'; I.brow = -0.5; }
  else { I.gaze = t < 173.57 ? a146LookAt(I, mh) : a146In(t, 175.68, 176.3) ? [1, 0] : [-1, 0]; I.mouth = 'smile'; I.tip = 0.3 * pulse(t, 172.14, 0.8); if (a146In(t, 175.68, 176.3)) I.look = 1; if (t > 174.64) I.sq = 0.97; }
  if (t > 171.9 && t < 172.3) I.drop = -8 * pulse(t, 171.9, 0.35);
  const cnt = [158.62, 158.9, 159.15, 159.4], cb = countedBeats(t, cnt);
  I.hR = a146HT(t, I, [[153.0, [60, -150]], [155.8, PERSON_HANDS.cupMouth.R, 0.15], [156.5, A146H.rest, 0.3], [158.5, (tt) => [96, -150 + 14 * countedBeats(tt, cnt).n], 0.15], [159.6, A146H.rest, 0.3], [160.46, PERSON_HANDS.palmsUp.R, 0.25],
    [162.16, PERSON_HANDS.pointFwd.R, 0.2], [162.6, PERSON_HANDS.pointUp.R, 0.2], [163.4, PERSON_HANDS.palmsUp.R, 0.25], [165.4, [60, -132], 0.2], [166.68, PERSON_HANDS.clasp.R, 0.25], [167.52, PERSON_HANDS.folded.R, 0.2],
    [168.6, A146H.rest, 0.3], [172.14, A146H.chest, 0.2], [172.9, A146H.rest, 0.3], [175.68, PERSON_HANDS.wave.R, 0.25], [176.3, A146H.rest, 0.3]]);
  I.hL = a146HT(t, I, [[153.0, [-60, -150]], [156.5, A146H.restL, 0.3], [160.46, PERSON_HANDS.palmsUp.L, 0.25], [165.4, A146H.restL, 0.3], [166.68, PERSON_HANDS.clasp.L, 0.25], [167.52, PERSON_HANDS.folded.L, 0.2], [168.6, A146H.restL, 0.3], [174.64, [-10, -132], 0.3]]);
  if (t >= 174.64) I.hR = I.hR;
  // bales: on the ground by the door until each one lands on the camel
  const gp = a146StackPts(380, 900, 0.7); [0, 1, 2, 3].forEach((k) => { if (t < A146_QLAND[k] - 0.3) a146Bale(ctx, gp[k][0], gp[k][1], { col: ['red', 'blue', 'yellow', 'green'][k], s: 0.7, knot: k === 2 }); });
  camel(ctx, Cm); a146CamelLoad(ctx, Cm, nb, { t, land: A146_QLAND, tassel: swing(t, 149.1, 0.4) + 0.2 * Math.sin(t * 4) * (Cm.amp > 0.1 ? 1 : 0), ticks: A146_TICKS });
  A146_QLAND.forEach((a, k) => { if (a146In(t, a - 0.3, a)) { const q = (t - a + 0.3) / 0.3, x = K.lerp(gp[k][0], seat.x, q), y = K.lerp(gp[k][1] - 40, seat.y, q) - 90 * Math.sin(Math.PI * q); a146Bale(ctx, x, y + 30, { col: ['red', 'blue', 'yellow', 'green'][k], s: 0.6, rot: q * 1.5, knot: k === 2 }); } });
  a146Person(ctx, D); a146Person(ctx, M);
  // the cloak: thrown at 170.9, over his head 171.28..171.9, then his cape again
  if (!I.hidden) a146Person(ctx, I);
  if (a146In(t, 170.9, 171.28)) { const u = (t - 170.9) / 0.38; a146Cloak(ctx, K.lerp(M.HR[0], ih[0], u), K.lerp(M.HR[1], ih[1] - 60, u) - 120 * Math.sin(Math.PI * u), { tw: 40, bw: 170, h: 150, rot: K.lerp(-1.5, 0, u), t, wave: 1 }); }
  if (a146In(t, 171.28, 171.9)) { const sq = landSquash(t, 171.28, 0.15); a146Cloak(ctx, ih[0], ih[1] - 46, { tw: 70, bw: 170, h: 230 * sq, t, wave: 0.2 }); }
  if (a146In(t, 155.84, 156.6)) soundArcs(ctx, ih[0] + 50, ih[1] + 10, 1, t, C.black);
  if (a146In(t, 154.56, 155.8)) for (const f of footfalls(A146_QI, 154.56, 155.7, 24 * 1.25)) if (t >= f.t && t < f.t + 0.5) dustBurst(ctx, f.x, 902, t - f.t, 3, 5, 10, 22, 0.5, Math.round(f.t * 10));
  if (a146In(t, 158.62, 159.6)) { const n = cb.n; if (n) { ctx.save(); ctx.font = K.font(54, BF, 400); ctx.textAlign = 'center'; ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.strokeText(String(n), ih[0] - 70, ih[1] - 70); ctx.fillStyle = C.yellow; ctx.fillText(String(n), ih[0] - 70, ih[1] - 70); ctx.restore(); } }
  if (a146In(t, 159.6, 160.4)) { const u = (t - 159.6) / 0.8; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(ih[0] + 40 + u * 30, ih[1] + 20, 14 + u * 10, 10 + u * 6, 12), C.white, { lw: 3, seed: 650 }); ctx.restore(); }
  return { M, I, D, Cm, seat, load };
}
