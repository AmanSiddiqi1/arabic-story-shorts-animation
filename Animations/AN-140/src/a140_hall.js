// ===== AN-140 the Barmakid hall (palace, blue): S7-S9 63.1-86.6; the letter flashback: caliph's hall (paper) S14 128.3-143.6, the vault S15 143.6-149.6 =====
// dais 560..900 (top 860), seat cushions at 660 (al-Fadl) and 810 (Jaafar), sitting brothers stand at y 878; Said's floor cushion at 380.
const A140_BH = { fx: 660, jx: 810, by: 878, sx: 380 };
// an open chest with coins, bottom centre, 130 x 70 at s 1; open 0..1
function a140Chest(ctx, x, y, s = 1, open = 0, sq = 1) { const op = K.clamp(open);
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 + (1 - sq) * 0.6), s * sq);
  if (op > 0.05) { ctx.save(); ctx.translate(0, -70); const lh = 34 * op; shape(ctx, [[-66, 0], [66, 0], [60, -lh], [-60, -lh]], '#7a4212', { lw: 4.5, seed: 710 }); ctx.restore();
    for (let i = 0; i < 6; i++) a140Coin(ctx, -45 + i * 18, -76 - (i % 2) * 6, 9, 0.7); }
  shape(ctx, K.rectPts(-65, -70, 130, 70), A140_WOOD, { lw: 5, seed: 711, dot: A140_BROWND, pitch: 8, rad: 0.2, da: 0.4 });
  for (const bx of [-42, 42]) shape(ctx, K.rectPts(bx - 6, -70, 12, 70), C.yellow, { lw: 3, seed: 712 });
  if (op <= 0.05) shape(ctx, [[-68, -70], [68, -70], [62, -88], [40, -96], [-40, -96], [-62, -88]], '#a8641a', { lw: 5, seed: 713 });
  shape(ctx, K.rectPts(-8, -58, 16, 16), C.yellow, { lw: 3, seed: 714 }); ctx.restore(); }
// the two brothers seated (S7, S8 and the S17 cloud): shared pose function. mode: 'listen' | 'pray' | 'lap'
function a140Brother(who, t, o = {}) { const base = who === 'fadl' ? A140_FADL : A140_JAAF, x = who === 'fadl' ? A140_BH.fx : A140_BH.jx, d = who === 'fadl' ? 0 : stagger(1);
  const P = a140Who(base, { x, y: A140_BH.by, dir: -1, sit: 1, seat: 'bench', mouth: 'closed', lid: null, ...A140_LAP });
  if (o.mode === 'pray') { const u = a140E(t, o.t0 + d, 0.3); P.handL = a140Lp(A140_LAP.handL, A140_PRAY.handL, u); P.handR = a140Lp(A140_LAP.handR, A140_PRAY.handR, u); if (u > 0.5) { P.gaze = A140_PRAY.gaze; P.lid = A140_PRAY.lid; } }
  return P;
}
function a140HallSet(ctx, t, o = {}) { return palaceHall(ctx, { variant: 'palace', wall: 'blue', throne: false, cushions: [A140_BH.fx, A140_BH.jx], lampsLit: true, t, ...o }); }
function a140S789World(ctx, t, cam) {
  const W = {}; a140HallSet(ctx, t);
  a140Cushion(ctx, A140_BH.sx, 905, 130);
  // Said
  const S = a140Who(A140_SAID, { x: 150, y: 900, dir: 1, mouth: 'closed', brow: -0.4, handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R });
  if (t < 83.9) { const xf = (tt) => kfn(tt, [[64.3, 150], [66.6, A140_BH.sx]]); Object.assign(S, walk(xf, t, { stride: 18, amp: 150 })); S.tip = 0.05 * K.clamp(S.amp * 2);
    S.gaze = t < 64.3 ? [0.3, -1] : lookAt(a140Head(S), [735, 715]); S.drop = -4 * pulse(t, 63.6, 0.3);
    if (t >= 68.64) { S.tip = 0.3 * pulse(t, 68.64, 0.75); S.handR = PERSON_HANDS.chest.R; S.handL = [-24, -100]; }
    if (t >= 69.48) { S.sit = a140E(t, 69.6, 0.4); S.seat = 'floor'; S.handL = PERSON_HANDS.palmsUp.L; S.handR = PERSON_HANDS.palmsUp.R; S.brow = -0.6; S.talk = talk(t, [[69.6, 71.5]]); }
    if (t >= 70.52) { S.gaze = lookAt(a140Head(S), a140W(S, [-20, -110])); S.handL = [-20, -110]; S.handR = [6 + 5 * Math.sin(t * 14), -114]; }
    if (t >= 70.9) { const k = settleTo(t, 70.9, 0, 1, 0.35); S.handL = a140Lp([-20, -110], PERSON_HANDS.armsOut.L, k); S.handR = a140Lp([6, -114], PERSON_HANDS.armsOut.R, k); S.gaze = lookAt(a140Head(S), [735, 715]); }
    if (t >= 71.6) { S.talk = talk(t, [[71.6, 72.2]]); S.handL = PERSON_HANDS.palmsUp.L; S.handR = PERSON_HANDS.palmsUp.R; S.brow = -0.5; }
    if (t >= 74.58) { const u = a140E(t, 74.58, 0.3); S.handL = a140Lp(PERSON_HANDS.palmsUp.L, A140_PRAY.handL, u); S.handR = a140Lp(PERSON_HANDS.palmsUp.R, A140_PRAY.handR, u); S.gaze = [0.1, -1]; S.mouth = 'smile'; S.brow = -0.4; S.talk = 0; }
    if (t >= 76.66) { S.gaze = lookAt(a140Head(S), [700, 730]); S.handR = a140Lp(A140_PRAY.handR, [92, -140], a140E(t, 76.9, 0.5)); }
    if (t >= 78.06) S.mouth = 'smile';
    if (t >= 79.68) { S.gaze = lookAt(a140Head(S), gazePlan(t, [[0, [700, 730]], [79.68, [640, 790]], [80.0, [790, 790]], [80.4, a140W(S, [92, -140])]], 0.07)); S.brow = -0.7; }
    if (t >= 80.4) S.gaze = gazePlan(t, [[0, S.gaze], [80.4, [0.6, 0.8]]], 0.4);
    if (t >= 80.98) S.handR = a140Lp([92, -140], [40, -112], a140E(t, 81.1, 0.9));
    if (t >= 82.24) { S.mouth = t < 82.6 ? 'smile' : t < 82.75 ? 'closed' : 'frown'; S.lid = Math.max(0.45 * a140E(t, 82.24, 0.5), pulse(t, 82.9, 0.45)); S.drop = 8 * a140E(t, 82.4, 0.6); }
  } else { // S9: up, a short bow, back to the door
    const xf = (tt) => kfn(tt, [[84.8, A140_BH.sx], [85.7, 150], [86.0, 150], [86.6, 70]]); Object.assign(S, walk(xf, t, { stride: 16, amp: 150 }));
    S.sit = 1 - a140E(t, 83.96, 0.4); S.seat = 'floor'; S.handL = [-24, -84]; S.handR = [24, -84]; S.drop = 8; S.mouth = 'frown'; S.lid = 0.4; S.gaze = [0, 0.7];
    if (t >= 84.35) S.tip = 0.15 * pulse(t, 84.35, 0.45);
    if (t >= 84.8) S.dir = -1;
    if (t >= 85.7) S.sq = 1 - 0.05 * pulse(t, 85.7, 0.4); }
  const sH = a140Head(S); W.said = sH;
  // the brothers
  const F = a140Brother('fadl', t), J = a140Brother('jaafar', t), FH = a140Head(F), JH = a140Head(J);
  for (const [P, H, i] of [[F, FH, 0], [J, JH, 1]]) { P.gaze = lookAt(H, sH); P.mouth = 'closed'; P.lid = 0.15;
    if (t < 64.9 && i === 0) P.gaze = lookAt(H, JH);
    if (i === 1 && t < 65.6) { P.handR = [46, -118]; P.gaze = lookAt(H, a140W(P, [46, -130])); }
    if (i === 1 && a140In(t, 65.6, 66.0)) P.handRW = a140Lp(a140W(P, [46, -118]), [878, 852], a140E(t, 65.6, 0.3));
    if (i === 1 && t >= 65.5) P.mouth = 'smile';
    if (t >= 68.64) P.drop = 6 * pulse(t, 68.8 + stagger(i), 0.4);
    if (i === 0 && a140In(t, 69.48, 70.3)) P.handR = [80, -70];
    if (a140In(t, 71.08 + stagger(i), 71.6)) P.gaze = lookAt(H, [sH[0], sH[1] - 160]);
    if (t >= 71.78 && t < 83.9) { if (i === 0) P.handR = [16 + 3 * Math.sin(t * 5), -160]; else { P.tip = 0.08; P.handR = [30, -90]; }
      P.drop = 4 * (i === 0 ? pulse(t, 72.2, 0.4) + pulse(t, 73.1, 0.4) : pulse(t, 72.5, 0.4)); P.mouth = 'closed'; P.lid = 0.1;
      if (a140In(t, 72.76, 73.16)) P.gaze = lookAt(H, i === 0 ? JH : FH);
      if (t >= 73.7) { const B = a140Brother(i === 0 ? 'fadl' : 'jaafar', t, { mode: 'pray', t0: 73.7 }); P.handL = B.handL; P.handR = B.handR; P.tip = 0; if (B.gaze) { P.gaze = B.gaze; P.lid = B.lid; } P.talk = t >= 75.34 && t < 77.5 ? 0.3 * Math.abs(Math.sin(t * 9 + i)) : 0; P.drop = 0; }
      if (t >= 77.6) { const u = a140E(t, 77.6, 0.22), v = a140E(t, 77.9, 0.3); P.handL = a140Lp(a140Lp(A140_PRAY.handL, [-14, -192], u), A140_LAP.handL, v); P.handR = a140Lp(a140Lp(A140_PRAY.handR, [14, -192], u), A140_LAP.handR, v); P.lid = a140In(t, 77.7, 77.95) ? 1 : 0.2; P.gaze = lookAt(H, sH); P.talk = 0; }
      if (t >= 78.06) { P.handL = A140_LAP.handL; P.handR = A140_LAP.handR; P.lid = null; P.gaze = lookAt(H, sH); } }
    if (t >= 83.9) { P.handL = A140_LAP.handL; P.handR = A140_LAP.handR; P.tip = 0; P.lid = null; P.gaze = lookAt(H, sH); P.drop = 0; }
  }
  // the cup Jaafar sets down
  const cup = t < 65.6 ? a140W(J, [46, -130]) : t < 65.9 ? a140Lp(a140W(J, [46, -130]), [878, 840], a140E(t, 65.6, 0.3)) : [878, 840];
  person(ctx, F); person(ctx, J);
  shape(ctx, [[cup[0] - 10, cup[1] + 14], [cup[0] + 10, cup[1] + 14], [cup[0] + 13, cup[1] - 6], [cup[0] - 13, cup[1] - 6]], C.yellow, { lw: 3.5, seed: 720 });
  // rays over the prayer
  if (t >= 75.34 && t < 77.7) for (const P of [F, J]) { const h = a140W(P, [0, -150]); a140Rays(ctx, h[0], h[1] - 20, 120, 0.55 * a140Env(t, 75.34, 77.7, 0.4), t, 9); }
  // Said (silhouette in the bright arch as he leaves)
  if (t >= 85.6) { const k = a140E(t, 85.6, 0.4); ctx.save(); ctx.filter = `brightness(${1 - 0.75 * k})`; ctx.globalAlpha *= 1 - a140E(t, 86.2, 0.35); person(ctx, S); ctx.restore(); } else person(ctx, S);
  W.fadl = FH; W.jaafar = JH; W.palm = a140W(S, [92, -140]); W.saidP = S;
  return W;
}
const A140_CAMHALL = [[63.1, { x: 500, y: 615, zoom: 1.0 }], [64.3, { x: 500, y: 615, zoom: 1.0 }], [69.4, { x: 560, y: 650, zoom: 1.25 }], [71.59, { x: 560, y: 650, zoom: 1.25 }],
  [71.6, { x: 600, y: 690, zoom: 1.4 }], [78.0, { x: 600, y: 690, zoom: 1.4 }], [79.0, { x: 420, y: 740, zoom: 2.0 }], [83.89, { x: 415, y: 745, zoom: 2.05 }],
  [83.9, { x: 500, y: 640, zoom: 1.05 }], [86.6, { x: 500, y: 640, zoom: 1.05 }]];

// ================= the letter flashback =================
// S14: the caliph's hall (paper); the brothers walk in and plead; Said's medallion; the order
function a140S14World(ctx, t, cam) {
  const W = {}, A = palaceHall(ctx, { variant: 'palace', wall: 'paper', t });
  const K0 = A.throne, CL = a140Who(A140_CAL, { x: K0.x, y: K0.sitY, dir: -1, sit: 1, seat: 'bench', mouth: 'closed', handL: A140_LAP.handL, handR: A140_LAP.handR }), CH = a140Head(CL);
  const fx = (tt) => kfn(tt, [[129.18, -80], [130.25, 360]]), jx = (tt) => kfn(tt, [[129.32, -190], [130.4, 470]]);
  const F = a140Who(A140_FADL, { y: 900, dir: 1, ...walk(fx, t), mouth: 'closed', handL: [-30, -100], handR: [30, -100] }), J = a140Who(A140_JAAF, { y: 900, dir: 1, ...walk(jx, t), mouth: 'closed', handL: [-30, -100], handR: [30, -100] });
  const FH = a140Head(F), JH = a140Head(J);
  for (const [P, H, i] of [[F, FH, 0], [J, JH, 1]]) { P.gaze = lookAt(H, CH); P.tip = 0.25 * pulse(t, 130.3 + stagger(i, 0.15), 0.8) + 0.3 * pulse(t, 142.46 + stagger(i, 0.2), 0.9);
    if (a140In(t, 134.5, 135.4)) P.gaze = [-0.8, -0.6];
    if (t >= 138.8) P.mouth = 'smile'; if (a140In(t, 138.9, 139.45)) P.gaze = lookAt(H, i === 0 ? JH : FH); }
  if (t >= 130.94) { J.talk = talk(t, [[130.94, 133.3]]); J.handR = PERSON_HANDS.palmsUp.R; F.handR = [52, -222]; }
  if (t >= 133.6) { F.handR = [30, -100]; J.handR = [30, -100]; J.talk = 0; }
  CL.gaze = lookAt(CH, FH);
  if (t >= 130.94) CL.gaze = lookAt(CH, [F.x + 60, 640]);
  if (t >= 131.64) { CL.tip = 0.08 * a140E(t, 131.64, 0.4); CL.brow = -0.3; CL.handR = PERSON_HANDS.chin.R; }
  if (t >= 133.42) { CL.drop = -5 * pulse(t, 133.3, 0.2); const k = settleTo(t, 133.5, 0, 1, 0.35, 0.15); CL.handR = a140Lp(PERSON_HANDS.chin.R, PERSON_HANDS.pointFwd.R, k); CL.brow = 0; CL.gaze = lookAt(CH, JH); CL.tip = 0.04; }
  if (t >= 137.92) { CL.gaze = t < 138.5 ? [0.2, -1] : lookAt(CH, JH); CL.mouth = 'smile'; CL.handR = PERSON_HANDS.pointUp.R; CL.handL = [-40, -205]; }
  if (t >= 139.6) { CL.handL = A140_LAP.handL; CL.handR = [60, -110]; }
  if (t >= 142.46) CL.drop = 5 * pulse(t, 142.6, 0.5);
  person(ctx, CL); person(ctx, J); person(ctx, F);
  // Said's medallion held up by al-Fadl, and his bills beside it
  if (t >= 130.94 && t < 143.6) { const hp = a140W(F, [52, -222]), k = K.ease.back(K.clamp((t - 130.94) / 0.35)), mp = [hp[0] + 6, hp[1] - 44];
    const sm = t >= 140.7, g = a140In(t, 132.4, 133.4) ? [1, 0.3] : [1, -0.2];
    if (t < 133.6) a140Medal(ctx, mp[0], mp[1], 34 * k, 'said', { brow: t >= 132.5 ? -0.6 : -0.3, gaze: g, mouth: sm ? 'smile' : 'frown' });
    else { const p = a140Lp(mp, [F.x + 80, 610], a140E(t, 133.6, 0.4)); a140Medal(ctx, p[0], p[1], 34, 'said', { brow: t >= 140.7 ? -0.2 : -0.6, gaze: g, mouth: sm ? 'smile' : 'frown' }); }
    if (t >= 132.32) { const bp = t < 133.6 ? [mp[0] + 70, mp[1] + 10] : [F.x + 150, 620], kb = K.ease.back(K.clamp((t - 132.32) / 0.3));
      for (let i = 0; i < 3; i++) a140Bill(ctx, bp[0] + i * 8 - 8, bp[1] - i * 10, 0.42 * kb, { rot: (i - 1) * 0.15, struck: i === 2 ? a140E(t, 136.0, 0.35) : 0 }); } }
  W.fadl = FH; W.jaafar = JH; W.cal = CH;
  return W;
}
// S15: the brothers' own treasury: the vault opens, two chests of their own money
function a140S15World(ctx, t, cam) {
  const W = {}, vo = a140E(t, 143.6, 0.4) * 0.9;
  a140HallSet(ctx, t, { dais: false, cushions: [], vault: { x0: 700, x1: 880, top: 520, open: vo } });
  const fx = (tt) => kfn(tt, [[143.8, 790], [144.9, 500]]), jx = (tt) => kfn(tt, [[144.72, 790], [145.5, 660]]);
  const F = a140Who(A140_FADL, { y: 900, dir: -1, ...walk(fx, t), mouth: 'closed', handL: [-40, -112], handR: [40, -112] });
  const J = a140Who(A140_JAAF, { y: 900, dir: -1, ...walk(jx, t), mouth: 'smile', handL: [-40, -112], handR: [40, -112] });
  const cF = [430, 900], cJ = [590, 900];
  const draw = (P, t0, t1, tSet, cpos, i) => { if (t < t0) return null; const a = a140E(t, t0, 0.2); let chest;
    if (t < tSet) { P.sq = 1 - 0.03 * Math.abs(Math.sin(P.ph || 0)); chest = [P.x - 0 * (P.s || 1), 900 - 112 * (P.s || 1) + 34]; }
    else { const u = a140E(t, tSet, 0.25); P.sq = 1 - 0.06 * pulse(t, tSet, 0.4); chest = a140Lp([P.x, 900 - 112 * (P.s || 1) + 34], cpos, u); P.handLW = [chest[0] - 50, chest[1] - 40]; P.handRW = [chest[0] + 50, chest[1] - 40]; P.handL = P.handR = null;
      if (t >= tSet + 0.4) { P.handLW = P.handRW = null; P.handL = A140_LAP.handL; P.handR = A140_LAP.handR; P.dir = i === 0 ? 1 : -1; } }
    ctx.save(); ctx.globalAlpha *= a; person(ctx, P); ctx.restore();
    const lid = t >= tSet + 0.3 ? settleTo(t, tSet + 0.3, 0, 1, 0.4, 0.2) : 0; a140Chest(ctx, chest[0], chest[1], 0.75, lid, impactSquash(t, tSet + 0.2, 0.85)); return chest; };
  const FH = a140Head(F), JH = a140Head(J);
  for (const [P, H, i] of [[F, FH, 0], [J, JH, 1]]) { P.gaze = lookAt(H, i === 0 ? [430, 860] : [590, 860]);
    if (t >= 146.0) { P.gaze = [0, 0.1]; P.mouth = 'smile'; }
    if (a140In(t, 146.56 + 0.8 * i, 147.2 + 0.8 * i)) { P.handR = PERSON_HANDS.chest.R; P.drop = 3 * (pulse(t, 146.7 + 0.8 * i, 0.2) + pulse(t, 146.95 + 0.8 * i, 0.2)); }
    if (a140In(t, 147.6, 148.4)) P.gaze = lookAt(H, i === 0 ? JH : FH); }
  if (t >= 148.46) { J.handR = PERSON_HANDS.hush.R; J.wink = t >= 148.6 && t < 149.2 ? 'R' : null; J.gaze = [0, 0.05]; F.drop = 5 * pulse(t, 148.7, 0.4); F.gaze = lookAt(FH, JH); }
  draw(J, 144.72, 0, 145.6, cJ, 1); draw(F, 143.8, 0, 145.0, cF, 0);
  W.fadl = FH; W.jaafar = JH; return W;
}
const A140_CAMLET = [[128.3, { x: 560, y: 650, zoom: 1.1 }], [133.0, { x: 560, y: 650, zoom: 1.1 }], [133.7, { x: 640, y: 680, zoom: 1.3 }], [143.59, { x: 640, y: 680, zoom: 1.3 }], [143.6, { x: 620, y: 690, zoom: 1.3 }], [149.6, { x: 620, y: 690, zoom: 1.3 }]];

// ================= thought-cloud insides (drawn in cloud world units) =================
// S17: the brothers as Said saw them, then what really happened (setup and payoff)
function a140CloudTruth(c, t) {
  a140HallSet(c, t);
  a140Cushion(c, A140_BH.sx, 905, 130);
  const S = a140Who(A140_SAID, { x: A140_BH.sx, y: 900, dir: 1, sit: 1, seat: 'floor', mouth: 'closed', brow: -0.5, ...{ handL: PERSON_HANDS.palmsUp.L, handR: PERSON_HANDS.palmsUp.R }, gaze: [1, -0.4] });
  if (t >= 162.22) { S.handL = A140_PRAY.handL; S.handR = A140_PRAY.handR; S.gaze = [0, -1]; S.mouth = 'smile'; }
  if (t >= 163.5) { const xf = (tt) => kfn(tt, [[163.95, A140_BH.sx], [165.2, 60]]); Object.assign(S, walk(xf, t, { stride: 18 })); S.sit = 1 - a140E(t, 163.5, 0.4); S.dir = t >= 163.78 ? -1 : 1; S.handL = [-24, -84]; S.handR = [24, -84]; S.drop = 8; S.gaze = [-1, 0.5]; S.mouth = 'frown'; }
  const F = a140Brother('fadl', t), J = a140Brother('jaafar', t);
  for (const [P, i] of [[F, 0], [J, 1]]) { const H = a140Head(P); P.gaze = lookAt(H, a140Head(S)); P.lid = 0.15;
    if (t >= 162.22) { const B = a140Brother(i ? 'jaafar' : 'fadl', t, { mode: 'pray', t0: 162.22 }); P.handL = B.handL; P.handR = B.handR; if (B.gaze) { P.gaze = B.gaze; P.lid = B.lid; } }
    if (t >= 163.5) { P.handL = A140_LAP.handL; P.handR = A140_LAP.handR; P.lid = 0.1; P.gaze = lookAt(H, a140Head(S)); }
    if (t >= 163.85) { const d = stagger(i, 0.1); P.drop = -6 * pulse(t, 163.85 + d, 0.2); P.sit = 1 - a140E(t, 163.95 + d, 0.3); P.y = K.lerp(A140_BH.by, 860, a140E(t, 163.95 + d, 0.3)); P.seat = 'bench'; P.handL = [-30, -100]; P.handR = [30, -100]; P.mouth = 'smile'; }
    if (a140In(t, 164.3, 164.85)) P.gaze = lookAt(H, i === 0 ? a140Head(J) : a140Head(F));
    if (t >= 165.04) { const x0 = i === 0 ? A140_BH.fx : A140_BH.jx, xf = (tt) => kfn(tt, [[165.04, x0], [166.6, x0 + 420]], 'lin'); Object.assign(P, walk(xf, t, { stride: 14 })); P.dir = 1; P.y = 860 - 8 * Math.abs(Math.sin(P.ph)); P.gaze = [1, 0];
      if (i === 1) { P.handR = PERSON_HANDS.hush.R; P.wink = 'R'; P.gaze = [0, 0.05]; P.handL = [-40, -110]; } } }
  person(c, F); person(c, J); person(c, S);
  if (t >= 165.04) { const hp = a140W(J, [-40, -110]); a140Letter(c, hp[0], hp[1] - 10, 0.5, { roll: 1, seal: true, rot: 0.4 }); }
}
// S5: his fear: the giant brothers look down on a tiny Said
function a140CloudFear(c, t) {
  c.fillStyle = '#ffe9a8'; c.fillRect(-200, 0, 1400, 1300); c.fillStyle = dotPat(c, C.red, 14, 0.2); c.fillRect(-200, 0, 1400, 1300);
  shape(c, K.rectPts(-200, 1080, 1400, 200), C.blue, { lw: 6, seed: 730, dot: NAVY, pitch: 12, rad: 0.2, da: 0.4 });
  const rise = 240 * (1 - a140E(t, 46.6, 0.6, 'out'));
  const B = (base, x, i) => { const P = a140Who(base, { x, y: 1330 + rise, s: 3.0, dir: i ? -1 : 1, lid: 0.5, brow: 0.5, tilt: -0.12 * (i ? -1 : 1), mouth: 'closed', handL: [-30, -100], handR: [30, -100], gaze: [0, 0.7], noBlink: true });
    if (t >= 48.38) P.talk = talk(t, [[48.4 + i * 0.4, 48.8 + i * 0.4], [49.2 + i * 0.3, 49.6 + i * 0.3]]);
    if (t >= 48.38 && i === 1) P.handR = [70 + 20 * Math.sin(t * 14), -150];
    if (t >= 49.96) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.gaze = [i ? 1 : -1, -0.3]; P.lid = a140In(t, 49.96, 50.6) ? 1 : 0.5; P.talk = 0; }
    return P; };
  person(c, B(A140_FADL, 260, 0)); person(c, B(A140_JAAF, 740, 1));
  const S = a140Who(A140_SAID, { x: 500, y: 1110, s: 0.95, dir: 1, gaze: [0, -1], brow: -0.6, mouth: 'o', handL: [-24, -100], handR: [24, -100], noBlink: true });
  if (t >= 49.12) { S.sq = 1 - 0.15 * a140E(t, 49.12, 0.3); S.handR = PERSON_HANDS.reach.R; }
  person(c, S);
  return a140W(S, PERSON_HANDS.reach.R);
}
// S11: his creditors waiting at his door
function a140CloudDoor(c, t) {
  c.fillStyle = '#9cc4ff'; c.fillRect(-200, 0, 1400, 1300);
  shape(c, [[-200, 300], [1200, 300], [1200, 900], [-200, 900]], '#e8b25a', { lw: 7, seed: 735, dot: C.red, pitch: 12, rad: 0.15, da: 0.35 });
  shape(c, K.rectPts(-200, 900, 1400, 400), '#d9c69a', { lw: 6, seed: 736, dot: '#b9a06a', pitch: 12, rad: 0.18, da: 0.4 });
  townDoor(c, 450, 590, 560, 900, 0, { arch: 'round', paint: WOOD });
  const xs = [390, 700, 820];
  for (let i = 0; i < 3; i++) { const t0 = 102.62 + stagger(i, 0.3), a = a140E(t, t0, 0.3); if (a <= 0) continue;
    const P = a140Cred(i, t, xs[i], { dir: i === 0 ? 1 : -1, tip: i === 0 ? 0.08 : -0.06, gaze: lookAt([xs[i], 700], [520, 700]), handL: [-30, -110], handR: i === 2 ? [40, -90] : [30, -110], noBlink: false });
    if (i === 0) P.y -= 3 * Math.abs(Math.sin(t * 8)); if (i === 1) P.gaze = [0.3, 0.8]; if (i === 2) P.handR = [40 + 8 * Math.abs(Math.sin(t * 7)), -90];
    if (t >= 103.52) { P.gaze = [0, 0.05]; P.brow = 0.8; P.mouth = 'frown'; }
    c.save(); c.globalAlpha *= a; person(c, P); a140HeldBill(c, a140W(P, P.handL), 0.6, 0.1); c.restore(); }
}
