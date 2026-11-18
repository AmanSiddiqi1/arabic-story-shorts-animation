// ===== AN-138 hall scenes: S6 (a thousand every day), S7 (food, no end date), S14b (the report), S15 (not angry), S16 (if he had stayed) =====
const YP_TX = (t) => kfn(t, [[44.3, 30], [45.15, 430]], 'out');
const YP_YH = [730, 548];   // Yahya's seated head (world), for gazes

function ypYahHall(t) {
  const P = ypYahya({ x: YP_YSEAT[0], y: YP_YSEAT[1], sit: 1, seat: 'floor', dir: -1, mouth: 'smile', handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, sq: breathe(t, 5, 0.01) });
  const tr = [YP_TX(Math.min(t, 61)), 680];
  P.gaze = lookAt(YP_YH, tr);
  if (t < 50.88) {
    if (ypIn(t, 43.2, 45.2)) P.gaze = lookAt(YP_YH, [150, 700]);
    if (ypIn(t, 43.3, 43.9)) { const c = Math.max(pulse(t, 43.32, 0.2), pulse(t, 43.6, 0.2)); P.handR = ypL2([40, -146], [10, -142], c); P.handL = ypL2([-26, -140], [4, -140], c); }
    if (ypIn(t, 46.3, 50.88)) { const up = ypE(t, 46.3, 1.1), tipf = ypE(t, 47.48, 0.4); P.sq = 1 + 0.02 * up * (1 - tipf); P.handR = ypL2(ypL2([30, -110], [62, -158], up), [96, -126], tipf); P.mouth = 'smile'; }
  } else if (t < 61.28) {
    if (ypIn(t, 57.56, 58.6)) { P.look = 0.55 * Math.sin((t - 57.56) * 2 * Math.PI / 0.5) * ypEnv(t, 57.56, 58.6, 0.15); P.handR = [72, -108]; P.gaze = [P.look * -1, 0.1]; }
    if (ypIn(t, 59.2, 59.75)) P.handR = ypL2([72, -108], [104, -160], Math.sin(Math.PI * K.clamp((t - 59.25) / 0.4)));
  } else if (t < 138.8) {   // S14b: reading, then the report
    P.handR = [28, -132]; P.handL = [-8, -130]; P.gaze = [0.2, 0.7]; P.drop = 4; P.mouth = 'closed';
    if (t >= 133.0) { const k = ypE(t, 133.0, 0.4); P.handR = ypL2([28, -132], [24, -96], k); P.handL = ypL2([-8, -130], [-10, -94], k); P.drop = 4 * (1 - k); P.brow = -0.3 * k;
      P.gaze = lookAt(YP_YH, gazePlan(t, [[133.0, [470, 690]], [133.8, [380, 690]], [134.5, [470, 690]], [135.0, [380, 690]], [136.3, [300, 420]], [137.2, [470, 690]]], 0.18)); }
  } else if (t < 150.14) {   // S15: no anger
    P.brow = 0; P.gaze = lookAt(YP_YH, [470, 690]); P.mouth = t < 139.9 ? 'closed' : 'smile'; P.lid = pulse(t, 139.64, 0.7);
    if (ypIn(t, 141.6, 143.4)) { P.gaze = lookAt(YP_YH, [330, 690]); }
    if (ypIn(t, 142.2, 143.5)) { P.handR = ypTr(t, [[142.25, 143.5, [74, -196], 0.15]], P.handR); }
    if (ypIn(t, 144.4, 149.0)) { P.handR = PERSON_HANDS.chin.R; P.tilt = -0.07 * ypEnv(t, 144.4, 149.0, 0.3); P.brow = -0.5; P.gaze = [-1, 0.05]; }
    if (t >= 149.06) { const b = ypEnv(t, 149.1, 149.7, 0.08); P.handR = PERSON_HANDS.chest.R; P.handL = PERSON_HANDS.folded.L; P.mouth = 'smile'; P.tilt = 0; P.brow = 0;
      P.lid = t < 149.7 ? 1 : 0.6 * (1 - ypE(t, 149.7, 0.3)); P.sq = 1 + b * (Math.sin((t - 149.1) * 2 * Math.PI * 4) > 0 ? 0.02 : -0.03); P.look = 0.5 * Math.sin((t - 149.06) * 2 * Math.PI / 0.9) * ypEnv(t, 149.06, 150.0, 0.15); }
  } else {   // S16: he speaks; then watches the vision
    P.talk = ypIn(t, 150.14, 152.7) ? 0.45 * talk(t, [[150.14, 152.7]]) : 0; P.handR = ypIn(t, 150.14, 152.9) ? ypTr(t, [[150.14, 152.9, PERSON_HANDS.palmsUp.R, 0.3]], PERSON_HANDS.chest.R) : PERSON_HANDS.folded.R; P.mouth = 'smile'; P.gaze = lookAt(YP_YH, [430, 690]);
    if (t >= 152.9) { P.gaze = [-0.6, -0.8]; P.lid = 0.15; }
  }
  return P;
}

// ---------- S6 + S7 ----------
function ypTreasP(t) {
  const T = ypTreas({ ...walk(YP_TX, t, { stride: 26 * 1.1 * 0.55 }), dir: 1, mouth: 'closed' }), th = [YP_TX(t), 680];
  T.gaze = lookAt(th, YP_YH);
  if (ypIn(t, 45.1, 45.7)) T.tip = 0.14 * pulse(t, 45.15, 0.5);
  T.brow = 0;
  if (t >= 48.7 && t < 50.88) { T.sq = 1 + 0.03 * ypEnv(t, 48.7, 49.8, 0.1); T.lid = 0; T.brow = -0.4; }
  if (ypIn(t, 49.95, 50.24)) T.gaze = [0, 0.05];
  if (t >= 50.24 && t < 57.2) { T.drop = 5 * pulse(t, 50.84, 0.3); T.brow = -0.6; T.gaze = [0.3, 0.9]; }
  if (ypIn(t, 50.24, 50.84)) { T.gaze = [0, 0]; T.eyes = 'wide'; T.brow = 0.6; T.sq = 1 - 0.06 * pulse(t, 50.42, 0.3); T.mouth = 'o'; }   // look to camera, gulp
  if (t >= 57.2) { T.tip = 0.06 * ypE(t, 57.2, 0.3); T.brow = -0.5; T.lid = Math.max(pulse(t, 59.45, 0.18), pulse(t, 59.75, 0.18)); }
  if (t >= 60.34) { const sh = pulse(t, 60.34, 0.45); T.drop = -6 * sh; T.tip = 0.15 * pulse(t, 60.7, 0.5); T.mouth = 'smile'; T.brow = 0; }
  return T;
}
function ypLedgerState(t) {   // where the ledger is and how open
  if (t < 45.34) return null;
  if (t < 57.2) { const o = ypE(t, 45.34, 0.3); return { x: 512, y: 770 + 40 * ypEnv(t, 50.24, 50.84, 0.12), s: 0.9, open: o, n: t > 50.84 ? Math.min(12, (t - 50.84) * 14) : 0, until: false }; }
  const up = ypE(t, 57.2, 0.35) * (1 - ypE(t, 60.5, 0.35)); return { x: K.lerp(512, 575, up), y: K.lerp(770, 715, up), s: K.lerp(0.9, 1.15, up), open: t < 60.4 ? 1 : 1 - ypE(t, 60.4, 0.12), n: 12, until: true };
}
function ypSceneHall67(ctx, t, F) {
  ypHall(ctx, t, { u: 0.3 });
  const Y = ypYahHall(t); person(ctx, Y);
  if (t >= 44.3) {
    const T = ypTreasP(t), L = ypLedgerState(t);
    if (L) { T.handLW = [L.x - 50 * L.s, L.y + 30 * L.s]; T.handL = null;
      const wr = t > 50.84, q = t >= 57.2 ? [L.x + 30 * L.s, L.y + 4 * L.s - 26 * ypE(t, 57.5, 0.3)] : [L.x + 16 + (wr ? 14 * K.noise(t * 9, 3) : 0), L.y - 8 + (wr ? 8 * K.noise(t * 11, 5) : 0)];
      T.handRW = q; T.handR = null; }
    else T.handR = [40, -70];
    person(ctx, T);
    ypOnBody(ctx, T, (c) => ypKeys(c, 26, -82, swing(t, 45.15, 0.6, 1.6, 2) + (t < 45.15 ? 0.4 * Math.sin(t * 14) : 0)));
    if (!L) ypOnBody(ctx, T, (c) => ypLedger(c, -40, -112, 0.7, { open: 0 }));
    else { ypLedger(ctx, L.x, L.y, L.s, { open: L.open, n: L.n, until: L.until }); if (L.open > 0.5) ypQuill(ctx, T.handRW[0], T.handRW[1], -0.5, 0.8); }
    if (ypIn(t, 50.3, 51.1)) ypSweat(ctx, ...ypPt(T, -34, -236), (t - 50.3) / 0.8);
    F.heads.T = ypHead(T); F.ledger = L;
  }
  // S7: a covered tray crosses the hall
  if (ypIn(t, 50.88, 55.6)) { const sx = (tt) => kfn(tt, [[50.88, 40], [52.6, 300], [54.4, 300], [55.6, -60]], 'inOut'), S = ypServA({ ...ypWalk(sx, t, 1.05), dir: t < 54.4 ? 1 : -1, gaze: [1, 0.7], mouth: 'closed' });
    const tp = [sx(t) + 62 * Math.sign(S.dir), 786]; S.handRW = [tp[0] + 16, tp[1] + 4]; S.handLW = [tp[0] - 26, tp[1] + 6]; person(ctx, S);
    ypTray(ctx, tp[0], tp[1], 0.75, { cover: 1 - ypE(t, 52.8, 0.35), t });
    for (let i = 0; i < 3; i++) { const p = (t - 52.95 - i * 0.12) / 0.6; if (p > 0 && p < 1) star(ctx, tp[0] - 50 + i * 50, tp[1] - 60 - i * 12, 14 * Math.sin(Math.PI * p), C.yellow, t * 3); }
    F.heads.S = ypHead(S); }
  F.heads.Y = ypHead(Y);
}

// ---------- S14b-S16: the report, the non-reaction, the vision ----------
function ypServantsHall(t) {
  const ax = (tt) => kfn(tt, [[131.44, 40], [132.3, 470]], 'out'), bx = (tt) => kfn(tt, [[131.6, -60], [132.45, 340], [141.74, 340], [142.34, 250], [143.6, 250], [144.4, 340]], 'inOut');
  const A = ypServA({ ...ypWalk(ax, t, 1.05), dir: 1, mouth: 'o' }), B = ypServB({ ...ypWalk(bx, t, 1.05), dir: 1, mouth: 'o' });
  A.gaze = lookAt([A.x, 690], YP_YH); B.gaze = lookAt([B.x, 690], YP_YH);
  if (t < 138.8) {
    if (ypIn(t, 134.16, 135.4)) { A.handR = [92 + 14 * Math.sin((t - 134.16) * 14), -118]; A.talk = 0.8 * talk(t, [[134.16, 135.4]]); }
    if (ypIn(t, 134.82, 135.25)) B.handR = PERSON_HANDS.hush.R;
    if (ypIn(t, 135.25, 136.3)) { B.handLW = [150, 700]; B.gaze = lookAt([B.x, 690], [150, 700]); B.talk = 0.8 * talk(t, [[135.25, 136.3]], 1); }
    if (t >= 138.16) { const k = ypE(t, 138.16, 0.15); A.handL = PERSON_HANDS.shield.L; A.handR = PERSON_HANDS.shield.R; A.tip = -0.08 * k; A.lid = 0.8; B.wink = 'L'; B.tip = -0.06 * k; B.mouth = 'frown'; B.brow = -0.6; }
  } else if (t < 150.14) {
    A.handL = PERSON_HANDS.shield.L; A.handR = PERSON_HANDS.shield.R; A.lid = 0.8; A.tip = -0.08; B.wink = 'L'; B.tip = -0.06; B.mouth = 'frown';
    if (t >= 139.9) { A.handL = null; A.lid = 0; A.mouth = 'o'; A.handR = ypL2(PERSON_HANDS.shield.R, [30, -150], ypE(t, 139.9, 0.4)); A.tip = -0.08 * (1 - ypE(t, 140.6, 0.4)); }
    if (t >= 140.74) { B.wink = null; B.tip = 0; B.mouth = 'o'; if (t < 141.5) { A.gaze = lookAt([A.x, 690], [B.x, 690]); B.gaze = lookAt([B.x, 690], [A.x, 690]); } }
    if (t >= 141.5) { A.handR = null; A.mouth = 'smile'; }
    const tf = turnFlip(t, [[0, 1], [141.62, -1], [143.6, 1]], 0.3); B.dir = tf.dir;
    if (ypIn(t, 141.6, 142.34)) { B.sq = 1 - 0.08 * pulse(t, 141.6, 0.18); B.handR = PERSON_HANDS.pointFwd.R; B.mouth = 'open'; B.gaze = [-1, 0]; }
    if (ypIn(t, 142.34, 143.2)) { B.tip = -0.18 * lurch(t, 142.34, 1) - 0.06; B.handR = PERSON_HANDS.pointFwd.R; B.amp = 0.45; B.ph = 1.3; B.gaze = lookAt([B.x, 690], YP_YH); B.mouth = 'o'; }
    if (ypIn(t, 143.2, 144.4)) { B.handR = [40 + 6 * Math.sin(t * 20), -216]; B.brow = -0.5; B.mouth = 'closed'; B.gaze = lookAt([B.x, 690], YP_YH); }
    if (t >= 144.4) { A.gaze = [-0.2, -0.9]; B.gaze = [-0.1, -0.9]; }
    if (t >= 149.06) { const r = ypE(t, 149.2, 0.4); A.drop = 6 * r; B.drop = 6 * r; A.tip = 0; B.tip = 0; A.handR = null; B.handR = null; A.handL = null; B.handL = null; A.lid = 0.3 * r; B.lid = 0.3 * r;
      A.mouth = t > 149.4 ? 'smile' : 'o'; B.mouth = t > 149.5 ? 'smile' : 'o'; A.gaze = ypIn(t, 149.4, 149.9) ? lookAt([A.x, 690], [B.x, 690]) : lookAt([A.x, 690], YP_YH); B.gaze = ypIn(t, 149.45, 149.9) ? lookAt([B.x, 690], [A.x, 690]) : lookAt([B.x, 690], YP_YH); }
  } else {
    A.mouth = 'smile'; B.mouth = 'smile'; A.tilt = 0.08; B.tilt = -0.06; A.drop = 6; B.drop = 6;
    if (t >= 152.9) { A.gaze = [0.1, -1]; B.gaze = [0.2, -1]; A.mouth = 'o'; B.mouth = 'o'; }
    if (t >= 160.44) { A.gaze = lookAt([A.x, 690], [B.x, 690]); B.gaze = lookAt([B.x, 690], [A.x, 690]); A.mouth = 'smile'; B.mouth = 'smile'; }
  }
  return [A, B];
}
function ypSceneHallLate(ctx, t, F) {
  ypHall(ctx, t, { u: 0.33 });
  const Y = ypYahHall(t), [A, B] = ypServantsHall(t);
  person(ctx, Y);
  if (t < 138.8) { const k = t < 133.0 ? 0 : ypE(t, 133.0, 0.4); ypOnBody(ctx, Y, (c) => { c.save(); c.translate(10, K.lerp(-138, -100, k)); seg(c, -40, 0, 40, 0, 26, C.white, 3.5); seg(c, -44, -14, -44, 14, 10, YP_BROWN, 2.5); seg(c, 44, -14, 44, 14, 10, YP_BROWN, 2.5); c.restore(); }); }
  person(ctx, B); person(ctx, A);
  F.heads.Y = ypHead(Y); F.heads.A = ypHead(A); F.heads.B = ypHead(B);
}
