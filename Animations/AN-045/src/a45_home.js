// ===== AN-045: the buyer's house (S13-S15, S17) and the dusk road (S16) =====
const A45_TBL = [520, 800], A45_WX = 720, A45_BXH = 360;
function a45Table(ctx) { const [x, top] = A45_TBL; shape(ctx, K.rectPts(x - 110, top, 220, 20), WOOD, { lw: 5, seed: 96, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.4 });
  for (const lx of [x - 90, x + 90]) seg(ctx, lx, top + 20, lx, 900, 12, EARTHD, 3); }
function a45SetHome(ctx, t, door = 0) { palaceHall(ctx, { variant: 'merchant', wall: 'ochre', u: 0.45, desk: false, window: { x0: 730, x1: 830, top: 320, bottom: 460 }, shelves: [{ x0: 240, x1: 420, y: 430, goods: 'jars' }], doorOpen: door, t }); }
const a45Wife = (o) => ({ ...A45_WIFE, x: A45_WX, y: 900, dir: -1, seed: 41, ...o });
const a45BuyerH = (o) => ({ ...A45_BUYER, x: A45_BXH, y: 900, seed: 31, ...o });
// the wife's stool (people sit with seat: 'bench'; the scene draws the stool)
const a45StoolFor = (ctx, x, s, dir) => a45Stool(ctx, x - 22 * s * dir, 900, s);
const a45RichOn = (ctx, t, o = {}) => a45Bundle(ctx, A45_TBL[0], A45_TBL[1], { s: 0.85, wrap: 'rich', t, ...o });

// ---------- S13 (125.3-134.5): the trophy and the boast ----------
const A45_BX13 = (t) => kfn(t, [[125.35, 120], [126.2, A45_BXH]], 'out');
function a45S13(ctx, t, cam) {
  a45SetHome(ctx, t, t < 126.4 ? 1 - A45B(t, 126.3, 0.4) : 0);
  const bx = A45_BX13(t), W = walk(A45_BX13, t, { stride: 26 * 1.3 }), B = a45BuyerH({ ...W, x: bx, mouth: 'smile', sq: 1.04, brow: -0.5, gaze: [0.8, 0.2] });
  const Wf = a45Wife({ sit: 1, seat: 'bench', gaze: [0, 1], handL: [-20, -95], handR: [24 + 6 * Math.sin(t * 6), -100 - 14 * Math.abs(Math.sin(t * 3))], mouth: 'closed' });
  let bun = null, brow = 0;
  if (t < 126.2) bun = { x: bx + 50, y: 820 - 6 * Math.abs(Math.sin(W.ph)) }; else if (t < 126.6) { const u = A45B(t, 126.2, 0.35); bun = { x: K.lerp(bx + 50, A45_TBL[0], u), y: K.lerp(820, A45_TBL[1], u) - 30 * Math.sin(Math.PI * u) }; }
  if (bun) { B.handLW = [bun.x - 44, bun.y - 30]; B.handRW = [bun.x + 44, bun.y - 30]; }
  if (t >= 126.6 && t < 127.3) { B.handR = [70, -200]; B.handL = [-28, -80]; B.gaze = lookAt(a45Eye(B), [A45_TBL[0], 740]); }
  if (t >= 126.6) { Wf.handR = [24, -120]; Wf.gaze = look(t, a45Eye(Wf), [[126.6, [A45_TBL[0], 740]], [127.0, a45Head(B)]], 0.15); Wf.drop = -4; }
  if (t >= 127.52) { Wf.sit = settleTo(t, 127.52, 1, 0, 0.4, 0.1); Wf.handR = PERSON_HANDS.pointFwd.R; Wf.talk = t < 128.6 ? 0.5 * Math.abs(Math.sin(t * 10)) : 0; Wf.tilt = 0.08; Wf.gaze = lookAt(a45Eye(Wf), a45Head(B)); }
  if (t >= 128.82) { Wf.handR = [40, -82]; Wf.handL = [-40, -82]; brow = -0.7; Wf.tilt = 0.1; }
  if (t >= 127.3) B.gaze = lookAt(a45Eye(B), a45Head(Wf));
  if (t >= 129.78 && t < 131.1) { B.handR = PERSON_HANDS.chest.R; B.handL = [-28, -80]; B.talk = 0.6 * Math.abs(Math.sin(t * 9)); B.tip = 0.04 * Math.sin((t - 129.78) * 6); B.sq = 1.05; }
  if (t >= 131.14 && t < 131.58) { B.handR = [60, -196]; B.talk = 0.4; }
  if (t >= 131.58 && t < 132.4) { B.handR = [34, -212]; B.lid = 0.5; B.talk = 0.3 * Math.abs(Math.sin(t * 8)); }
  if (t >= 132.4 && t < 133.6) { B.sq = anticipate(t, 132.35, 0.2, 0.06); const k = settleTo(t, 132.56, 0, 1, 0.35, 0.15); B.aL = [K.lerp(0.3, 2.0, k), K.lerp(0.1, 2.2, k)]; B.aR = B.aL; B.mouth = 'open'; B.lid = null; }
  if (t >= 133.6) { const c = Math.sin((t - 133.6) * 24); B.handL = [-8 + c * 8, -130]; B.handR = [8 - c * 8, -126]; B.lid = 1; B.mouth = 'smile';
    Wf.gaze = look(t, a45Eye(Wf), [[133.6, [300, 330]], [133.85, [A45_TBL[0], 740]], [134.1, a45Head(B)]], 0.07); brow = K.lerp(-0.7, 0.5, A45B(t, 133.7, 0.4)); Wf.handL = PERSON_HANDS.folded.L; Wf.handR = PERSON_HANDS.folded.R; Wf.tilt = 0; }
  if (B.lid == null) a45Lid(B, t, 31); a45Lid(Wf, t, 41);
  a45Table(ctx); a45StoolFor(ctx, A45_WX, 1.25, -1);
  if (!bun) a45RichOn(ctx, t, { tassel: swing(t, 126.6, 0.4) });
  a45Draw(ctx, Wf); a45Brows(ctx, Wf, brow); if (t < 127.5) { const h = a45Head(Wf); shape(ctx, K.rectPts(h[0] - 30, 820, 60, 34), A45_GREY, { lw: 3.5, seed: 97 }); }
  a45Draw(ctx, B);
  if (bun) { a45Bundle(ctx, bun.x, bun.y, { s: 0.85, wrap: 'rich' }); a45Hand(ctx, B.handLW[0], B.handLW[1], 1.3); a45Hand(ctx, B.handRW[0], B.handRW[1], 1.3); }
  return { B, Wf };
}
function a45O13(ctx, t, P, S, r, L) {
  if (a45In(t, 128.82, 129.8)) { const h = P(...a45Head(r.Wf)); a45Balloon(ctx, h[0] + 20, h[1] - 170, 110, 110, [h[0], h[1] - 70], (t - 128.82) / 0.25, (c) => { c.font = K.font(80, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.red; c.fillText('?', 0, 4); }); }
  if (a45In(t, 131.14, 134.4)) { const h = P(...a45Head(r.B)), p = Math.min(K.clamp((t - 131.14) / 0.25), K.clamp((134.4 - t) / 0.2));
    a45Balloon(ctx, h[0] + 30, 240, 280, 200, [h[0] + 10, h[1] - 80], p, (c) => { if (t < 132.56) for (let i = 0; i < 3; i++) a45Coin(c, (i - 1) * 56, 10, 22); else { const g = A45B(t, 132.56, 0.4, 'out'); a45CoinPile(c, 0, 80, Math.round(3 + 25 * g), 1.2); } }); }
}

// ---------- S14 (134.5-145.8): her questions ----------
const A45_WX14 = (t) => kfn(t, [[134.62, A45_WX], [135.3, 660]], 'out');
function a45S14(ctx, t, cam) {
  a45SetHome(ctx, t);
  const wx = A45_WX14(t), Wf = a45Wife({ x: wx, ...walk(A45_WX14, t, { stride: 30 }), x: wx, handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R, drop: 4, mouth: 'closed' }); let brow = 0.5;
  const B = a45BuyerH({ mouth: 'smile', brow: -0.4, handL: [-28, -80], handR: [28, -80], sq: 1.03 });
  Wf.gaze = lookAt(a45Eye(Wf), a45Head(B)); B.gaze = lookAt(a45Eye(B), a45Head(Wf));
  if (t >= 135.3) Wf.sq = landSquash(t, 135.3, 0.04);
  if (t >= 135.72 && t < 137.02) { Wf.handR = PERSON_HANDS.pointFwd.R; Wf.talk = 0.7 * Math.abs(Math.sin(t * 10)); Wf.tip = 0.04 * Math.abs(Math.sin(t * 5)); }
  if (t >= 136.38 && t < 138.9) { const f = 3 + 3 * K.clamp((t - 136.38) / 1.5); B.drop = 5 * Math.max(0, Math.sin((t - 136.38) * f * 2)); }
  if (t >= 137.02 && t < 138.9) { Wf.handRW = [565, 735]; Wf.handR = null; Wf.gaze = lookAt(a45Eye(Wf), [560, 740]); Wf.talk = 0.5 * Math.abs(Math.sin(t * 9)); B.gaze = lookAt(a45Eye(B), [520, 740]); }
  let rap = 1; if (t >= 138.9 && t < 139.6) { const k = Math.abs(Math.sin((t - 138.9) * Math.PI / 0.3)); Wf.handRW = [560, 680 - 30 * k]; Wf.handR = null; rap = 1 - 0.05 * Math.max(0, 1 - k * 3); B.lid = (t > 139.0 && t < 139.08) || (t > 139.3 && t < 139.38) ? 1 : null; B.mouth = 'closed'; }
  if (t >= 139.68) { Wf.handRW = null; Wf.handL = PERSON_HANDS.palmsUp.L; Wf.handR = PERSON_HANDS.palmsUp.R; Wf.tilt = -0.1; brow = -0.6; Wf.talk = t < 141.4 ? 0.5 * Math.abs(Math.sin(t * 9)) : 0; B.mouth = 'closed'; B.brow = 0; }
  if (t >= 141.6) { B.gaze = lookAt(a45Eye(B), [720, 420]); B.drop = 3 * pulse(t, 142.0, 0.3); Wf.talk = 0.5 * Math.abs(Math.sin(t * 9)); }
  if (t >= 143.06) B.gaze = t < 143.7 ? lookAt(a45Eye(B), [720, 420]) : lookAt(a45Eye(B), [520, 760]);
  if (t >= 144.62) { B.brow = -0.6; B.mouth = 'frown'; B.drop = 6 * pulse(t, 144.8, 0.35); B.handL = [-30, -86]; B.handR = [30, -86]; B.sq = 1; B.gaze = lookAt(a45Eye(B), [520, 760]); B.noBlink = true; Wf.talk = 0; }
  if (B.lid == null && !B.noBlink) a45Lid(B, t, 31); a45Lid(Wf, t, 41);
  a45Table(ctx); a45StoolFor(ctx, A45_WX, 1.25, -1);
  a45RichOn(ctx, t, { sq: rap });
  a45Draw(ctx, B); a45Draw(ctx, Wf); a45Brows(ctx, Wf, brow);
  if (t >= 144.8) a45Sweat(ctx, B.x + 50, a45Head(B)[1] - 30, (t - 144.8) / 0.8, 1.2);
  return { B, Wf };
}
function a45O14(ctx, t, P, S, r, L, cam) {
  if (a45In(t, 138.1, 141.0)) { const b = P(560, 740); L.word('?', b[0] + 20, b[1], 138.1, 141.0, 120, { rot: 0.12 * Math.sin((t - 138.1) * 8) * Math.exp(-(t - 138.1) * 2), fill: C.yellow }); }
  if (t >= 141.6) { const c = P(720, 420), h = P(...a45Head(r.Wf)), p = K.clamp((t - 141.6) / 0.3);
    a45Balloon(ctx, c[0], c[1], 300, 230, [h[0] + 20, h[1] - 60], p, (k) => {
      if (t < 143.06) { k.save(); k.filter = 'brightness(0)'; person(k, { ...A45_SELLER, x: -30, y: 110, s: 0.55 }); monkey(k, { x: 10, y: 6, s: 0.3 }); k.restore(); }
      else if (t < 144.62) { const q = 1 + 0.08 * Math.sin((t - 143.06) * 12); k.save(); k.scale(q, q); shape(k, [[-70, -40], [40, -40], [80, 0], [40, 40], [-70, 40]], C.yellow, { lw: 5, seed: 98 }); k.font = K.font(70, BF, 400); k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillStyle = C.black; k.fillText('3', -10, 4); k.restore(); seg(k, 100, -50, 100, 30, 10, C.red, 3); shape(k, [[84, 30], [116, 30], [100, 58]], C.red, { lw: 3 }); }
      else { star(k, -40, 0, 50, C.blue, 0.2); k.font = K.font(100, BF, 400); k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillStyle = C.red; k.fillText('?', 60, 6); } }); }
}

// ---------- S15 (145.8-156.1): she sees the trick ----------
function a45S15(ctx, t, cam) {
  a45SetHome(ctx, t);
  const Wf = a45Wife({ x: 660, handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R, lid: 0.4, mouth: 'closed' }); let brow = 0.3, peek = 0;
  const B = a45BuyerH({ mouth: 'frown', brow: -0.6, handL: [-30, -86], handR: [30, -86] });
  B.gaze = lookAt(a45Eye(B), [520, 760]);
  if (t < 148.34) { Wf.gaze = look(t, a45Eye(Wf), [[145.84, [520, 700]], [146.2, [470, 790]], [146.5, a45Head(B)], [146.8, [520, 700]]], 0.07); Wf.tip = 0.06; if (t >= 147.2) { brow = -0.8; Wf.lid = null; } }
  if (t >= 148.34 && t < 149.6) { const u = A45B(t, 148.34, 0.45); Wf.handRW = [K.lerp(620, 600, u), K.lerp(800, 700, u)]; Wf.handR = null; Wf.tip = 0.08; Wf.gaze = lookAt(a45Eye(Wf), [600, 740]); peek = u; brow = -0.3; }
  if (t >= 149.6) peek = 1;
  if (t >= 149.52) { B.handL = PERSON_HANDS.headHold.L; B.handR = PERSON_HANDS.headHold.R; B.eyes = 'wide'; B.mouth = 'o'; B.drop = settleTo(t, 149.52, 0, -12, 0.25, 0.3); B.tilt = -0.08 * pulse(t, 149.52, 0.6); B.gaze = lookAt(a45Eye(B), [620, 780]); }
  if (t >= 150.26) { Wf.handR = [44 + 14 * Math.sin((t - 150.26) * 10), -205]; Wf.handRW = null; Wf.lid = null; brow = 0.6; Wf.talk = t < 152.0 ? 0.6 * Math.abs(Math.sin(t * 9)) : 0; Wf.gaze = lookAt(a45Eye(Wf), a45Head(B)); Wf.tip = 0;
    B.handL = PERSON_HANDS.cheeks.L; B.handR = PERSON_HANDS.cheeks.R; B.sq = 1 - 0.07 * A45B(t, 150.26, 0.4); B.tip = -0.06 * A45B(t, 150.26, 0.4); B.eyes = null; B.mouth = 'frown'; B.drop = 0; B.gaze = lookAt(a45Eye(B), a45Head(Wf)); }
  if (t >= 152.0) { Wf.handR = PERSON_HANDS.hipsHands.R; }
  if (t >= 152.28) { B.handR = [56, -120]; B.handL = [-30, -86]; B.gaze = lookAt(a45Eye(B), [B.x + 70, 740]); B.wet = true; B.lid = t > 152.6 && t < 153.0 ? 0.95 : 0.35; B.noBlink = true; B.tip = -0.03; }
  for (const tt of [153.42, 154.84]) if (t >= tt && t < tt + 0.4) { Wf.handR = [70, -170 + 20 * pulse(t, tt, 0.4)]; Wf.talk = 0.5; }
  if (t >= 154.84) { B.drop = 4 * pulse(t, 155.0, 0.4); }
  if (t >= 155.6) { B.drop = settleTo(t, 155.6, 0, 14, 0.4, 0.15); B.sq = 0.93; B.gaze = lookAt(a45Eye(B), [520, 780]); B.handR = [30, -86]; }
  if (Wf.lid == null || Wf.lid < 0.9) a45Lid(Wf, t, 41);
  a45Table(ctx); a45StoolFor(ctx, A45_WX, 1.25, -1);
  a45RichOn(ctx, t, { peek });
  a45Draw(ctx, B); a45Draw(ctx, Wf); a45Brows(ctx, Wf, brow);
  return { B, Wf };
}
function a45O15(ctx, t, P, S, r, L) {
  if (a45In(t, 149.52, 151.4)) L.stamp('A TRICK!', 250, 220, 149.52, 151.4, 80, { rot: -0.1 });
  if (t >= 153.42) { const p = K.clamp((t - 153.42) / 0.25), h = P(...a45Head(r.Wf));
    a45Balloon(ctx, 500, 250, 440, 220, [h[0] - 20, h[1] - 70], p, (c) => {
      // icon 1: a hand grabbing a bundle
      a45Bundle(c, -100, 50, { s: 0.55, wrap: 'plain' }); a45Hand(c, -100, -30, 1.5); seg(c, -100, -30, -150, -80, 14, '#141414', 3); a45Cross(c, -100, 0, 70, (t - 153.42) / 0.4);
      if (t >= 154.84) { const k = K.ease.back(K.clamp((t - 154.84) / 0.25)); c.save(); c.translate(110, 0); c.scale(k, k); a45Bundle(c, 0, 50, { s: 0.55, wrap: 'plain' }); c.font = K.font(70, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.red; c.fillText('?', 0, 10); c.restore(); a45Cross(c, 110, 0, 70, (t - 155.0) / 0.4); } }); }
}

// ---------- S16 (156.1-160.4): the dusk road ----------
const A45_TX16 = (t) => kfn(t, [[156.2, 250], [160.4, 720]], 'lin');
function a45S16(ctx, t, cam) {
  skyCycle(ctx, 0.45, { t }); townFarCity(ctx, 200, 760, 0.7); hillTrees(ctx); ground(ctx);
  const tx = A45_TX16(t), W = walk(A45_TX16, t, { stride: A45_ST }), T = a45Thief({ ...W, seed: 11, mouth: 'o', talk: 0, gaze: [0.6, 0], handL: [-18, -96] });
  T.mouth = Math.sin(t * 6) > 0 ? 'o' : 'closed';
  let coins = [];
  if (t >= 157.6 && t < 158.78) { const hx = tx + 70, hy = 770; T.handRW = [hx, hy + 6 * Math.abs(Math.sin((t - 157.8) * 10))]; T.mouth = 'closed';
    for (let i = 0; i < 3; i++) { const u = ((t - 157.82 - i * 0.18) % 0.55) / 0.55; coins.push(t < 157.82 + i * 0.18 ? [hx, hy - 10 - i * 6] : [hx + 6 * (i - 1), hy - 10 - 120 * 4 * u * (1 - u)]); }
    const top = coins.reduce((a, b) => (b[1] < a[1] ? b : a)); T.gaze = lookAt(a45Eye(T), top); }
  if (t >= 158.78) { T.handR = [30, -82 + 6 * Math.abs(Math.sin((t - 158.9) * 12)) * (t < 159.5 ? 1 : 0)]; T.lid = 0.45; T.mouth = 'closed'; }
  a45Lid(T, t, 11);
  const sh = a45Shoulder(T), M = a45MonkeyBase({ x: sh[0], y: sh[1], gaze: [0.6, 0.2], ph: t * 2, fezLag: Math.sin(t * 7) * 0.05 });
  if (t >= 159.76) { M.gaze = [0, 0.1]; M.mouth = 'smirk'; M.handL = [-10, -230]; M.fezUp = 12 * pulse(t, 159.76, 0.5); M.handR = [60 + 12 * Math.sin(t * 16), -190]; }
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = NAVY2; ctx.beginPath(); ctx.ellipse(tx - 70, 905, 130, 12, 0, 0, 7); ctx.fill(); ctx.restore();
  a45Draw(ctx, T); a45Monkey(ctx, M); coins.forEach(([x, y]) => a45Coin(ctx, x, y, 13));
  return { T, M, iris: [M.x + 6, M.y - 100] };
}
function a45O16() {}

// ---------- S17 (160.4-171.43): the buyer opens it ----------
function a45S17(ctx, t, cam) {
  a45SetHome(ctx, t);
  const B = a45BuyerH({ x: 400, mouth: 'frown', brow: -0.6, lid: 0.3, handL: [-30, -86], handR: [30, -86], gaze: lookAt([400, 650], [520, 720]) });
  const wx = kfn(t, [[167.9, 720], [168.6, 520]]), Wf = a45Wife({ x: wx, ...walk((tt) => kfn(tt, [[167.9, 720], [168.6, 520]]), t, { stride: 30 }), x: wx, handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, mouth: 'closed' }); let brow = 0.4;
  Wf.gaze = lookAt(a45Eye(Wf), [470, 760]);
  let open = 0, shirt = null;
  if (t < 162.92) { const u = A45B(t, 160.5, 1.3); B.handRW = [500 + 30 * Math.sin(t * 5) * u * (t > 161.0 && t < 161.2 ? 0 : 1), 715]; B.handLW = [470, 760]; }
  if (t >= 161.9 && t < 162.9) Wf.lid = t > 162.3 && t < 162.6 ? 1 : null;
  if (t >= 162.92) { open = A45B(t, 162.92, 0.9, 'lin'); B.handLW = null; B.handRW = null; }
  if (t >= 163.86 && t < 164.5) { B.drop = -8 * pulse(t, 163.86, 0.4); B.tip = -0.05 * pulse(t, 163.86, 0.4); B.eyes = 'wide'; B.lid = null; B.gaze = lookAt([400, 640], [500, 500]); }
  if (t >= 164.5 && t < 166.8) { const eye = a45Eye(B), up = A45B(t, 164.5, 0.35), hole = [A45_HOLE[0] * 0.8, A45_HOLE[1] * 0.8], held = [eye[0] + 17 - hole[0], eye[1] - hole[1]], heap = [516, 745];
    shirt = [K.lerp(heap[0], held[0], up), K.lerp(heap[1], held[1], up)]; B.handRW = [shirt[0] + 22, shirt[1] - 54]; B.eyes = null; B.lid = 0.2; Wf.gaze = lookAt(a45Eye(Wf), [shirt[0], shirt[1]]); }
  if (t >= 166.8) { const k = A45B(t, 166.8, 0.9, 'in'); B.sit = k; B.seat = 'bench'; B.sq = landSquash(t, 167.72, 0.08) * (t > 167.72 ? breathe(t, 3, 0.015) : 1); B.handL = PERSON_HANDS.headHold.L; B.handR = [30, -70]; shirt = [430, 820 + 0 * k];
    B.gaze = t < 167.3 ? lookAt(a45Eye(B), a45Head(Wf)) : [0.5, 0.8]; B.drop = t < 167.3 ? -4 : settleTo(t, 167.3, -4, 14, 0.5, 0.12); B.lid = t < 167.3 ? 0.2 : 0.55; B.brow = -0.6; }
  if (t >= 167.7) { Wf.tilt = 0.1 * Math.sin((t - 167.7) * 14) * (t < 168.15 ? 1 : 0); brow = K.lerp(0.4, 0, A45B(t, 167.9, 0.6)); Wf.gaze = lookAt(a45Eye(Wf), a45Head(B)); }
  if (t >= 168.4) { Wf.handL = PERSON_HANDS.folded.L; Wf.handR = null; Wf.handRW = [432, 752 + 2 * Math.sin(t * 2)]; Wf.handL = [-30, -86]; Wf.sq = breathe(t, 5, 0.012); }
  if (B.lid == null) a45Lid(B, t, 31); else if (B.lid < 0.9) a45Lid(B, t, 31); a45Lid(Wf, t, 41);
  a45Table(ctx); a45StoolFor(ctx, 400, 1.3, 1);
  a45RichOn(ctx, t, { open, contents: 'rags', shirt: !shirt && t < 164.5, tassel: swing(t, 162.92, 0.5) + 0.25 * Math.sin(t * 3) * (t < 162.9 && t > 160.5 ? 1 : 0) });
  if (t >= 167.9) { a45Draw(ctx, B); a45Draw(ctx, Wf); } else { a45Draw(ctx, Wf); a45Draw(ctx, B); }
  a45Brows(ctx, Wf, brow);
  if (t < 162.92) a45Hand(ctx, B.handRW[0], B.handRW[1], 1.3);
  if (shirt) { a45Shirt(ctx, shirt[0], shirt[1], 0.8, { eye: t >= 164.75 && t < 166.8 ? [1, 0] : null, sway: swing(t, 166.8, 0.6) + (t > 168 ? 0 : 0) , rot: t >= 166.8 ? 0.2 : 0 }); if (t < 166.8) a45Hand(ctx, shirt[0] + 22, shirt[1] - 54, 1.3); }
  a45Moth(ctx, 520, 760, t, 163.86, 1.5, 3);
  return { B, Wf };
}
function a45O17(ctx, t, P, S, r, L) {
  if (t >= 165.8 && t < 168.1) { const k = A45B(t, 165.8, 0.35); ctx.save(); ctx.globalAlpha = a45Fade(t, 165.8, 168.1, 0.25); S.box(ctx, 620, 110, 330, 190, k, { fill: C.white, lw: 7, seed: 8 });
    if (k > 0.5) { ctx.font = K.font(60, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('PAID: 3', 660, 165);
      if (t >= 166.3) { const b = -Math.abs(Math.sin((t - 166.6) * 9)) * 12 * Math.exp(-Math.max(0, t - 166.6) * 4) * (t > 166.6 ? 1 : 0); ctx.fillText('WORTH:', 660, 245); ctx.fillStyle = C.red; ctx.fillText('0', 870, 245 + b); } }
    ctx.restore(); }
}
