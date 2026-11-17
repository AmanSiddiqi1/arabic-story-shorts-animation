// ===== AN-097 cast: looks, the shared builders (Harun on the throne, Salih with his spear) and the scene composers for the palace, the merchant house and the street =====
// A composer returns { actors: [P...], under: [fn], over: [fn] }: under is drawn after the set and before the cast, over after the cast (world units).
const A97_LOOK = {
  harun: { costume: 'caliph', age: 0.35, pal: { beard: C.black }, seed: 71 },
  salih: { costume: 'servant', age: 0.3, pal: { robe: C.blue, dot: NAVY, sash: C.yellow, len: 'knee', head: 'helm', pants: C.white }, seed: 72, helm: true },
  mansur: { costume: 'merchant', pal: { robe: A97_GREEN, dot: A97_GREEND, hc: C.yellow, hd: C.red }, seed: 73 },
  yahya: { costume: 'vizier', age: 0.8, seed: 74 },
  treas: { costume: 'servant', age: 0.5, pal: { robe: '#f4ecd8', dot: '#c9bfa6', hc: C.yellow, sash: C.blue }, seed: 75 },
  runA: { costume: 'servant', pal: { hc: C.red }, seed: 76 },
  runB: { costume: 'servant', pal: { hc: C.blue, sash: C.blue }, seed: 77 },
  fadl: { costume: 'prince', pal: { robe: A97_GREEN, dot: A97_GREEND }, seed: 78 },
  jaafar: { costume: 'prince', pal: { robe: C.red, dot: '#a8160f' }, seed: 79 },
  oldW: { costume: 'oldWoman', seed: 80 },
  vill: { costume: 'villager', age: 0.55, seed: 81 },
};
const a97Mk = (name, o) => ({ ...A97_LOOK[name], ...o });
const A97_MS = 0.95;                       // Mansur's scale
const A97_SITY = 848, A97_TX = 730;        // throne sitting y and x (palaceHall anchors)
const A97_CX = 740, A97_CY = 882, A97_DY = 860;   // Yahya's cushion x, his sitting y, the dais top
// world hand targets on both sides of an object (cx, cy), for a figure facing dir
const a97Carry = (P, cx, cy, half) => { P.handLW = [cx - (P.dir || 1) * half, cy]; P.handRW = [cx + (P.dir || 1) * half, cy]; };
const a97Lid = (P, t) => { if (P.lid != null && P.lid < 0.9 && !P.noBlink) P.lid = Math.max(P.lid, blink(t, P.seed || 1)); };
// draw one actor: pre (behind), the figure, helmet, spear, post (in front)
function a97Draw(ctx, P) {
  if (P.hidden) return; for (const f of P.pre || []) f(ctx);
  person(ctx, P); if (P.helm) a97Helmet(ctx, P); if (P.spear) a97Spear(ctx, P, P.spear.hand, P.spear.rot || 0, P.spear);
  for (const f of P.post || []) f(ctx);
}

// ---------- Harun on the throne (S1, S2, S13, S14) ----------
const A97_H_TALK = [[0.4, 1.8], [6.3, 9.6], [10.5, 12.0], [12.4, 13.4], [14.0, 16.6], [16.72, 18.0], [140.9, 141.6]];
function a97HarunP(t) {
  const P = a97Mk('harun', { x: A97_TX, y: A97_SITY, s: 1, dir: -1, sit: 1, seat: 'bench', brow: 0.6, mouth: 'closed' });
  const gavel = (tt) => { if (tt < 16.72) return [44, K.lerp(-150, -208, a97E(tt, 16.3, 0.3))]; const d = tt - 16.72; return [70, -150 - 14 * Math.exp(-d * 7) * Math.cos(d * 26)]; };
  P.handR = a97Tr(t, [[0.12, 2.6, (tt) => [44, -205 + 6 * Math.exp(-(tt - 0.5) * 6) * Math.cos((tt - 0.5) * 20)]], [6.3, 6.85, PERSON_HANDS.palmsUp.R], [6.85, 7.8, [62, -150]],
    [10.48, 12.3, PERSON_HANDS.pointFwd.R], [12.3, 14.0, [60, -128]], [16.2, 18.1, gavel, 0.12],
    [129.86, 131.4, [40, -110]], [135.86, 138.34, [10, -98]], [138.34, 140.6, PERSON_HANDS.chest.R], [140.78, 142.84, [96, -146]]], [40, -98]);
  P.handL = a97Tr(t, [[135.86, 140.7, [-36, -98]], [140.78, 141.7, [70, -168]], [141.74, 142.84, (tt) => [64 + 14 * Math.sin(tt * 18), -184]]], [-40, -98]);
  P.drop = 4 * pulse(t, 0, 0.3) - 3 * (t > 0.3 && t < 1.2 ? Math.exp(-(t - 0.3) * 5) : 0);
  if (a97In(t, 12.3, 18.1)) { P.tip = 0.1 * a97E(t, 12.3, 0.5) * (1 - a97E(t, 17.7, 0.4)); P.lid = 0.3; P.brow = 0.9; P.noBlink = t < 16.72; }
  if (a97In(t, 129.06, 130.48)) { P.brow = -0.4; P.lid = 0.2; }
  if (a97In(t, 130.48, 134.58)) { P.brow = -0.2; P.lid = 0; P.noBlink = true; P.mouth = 'o'; }
  if (a97In(t, 134.58, 135.86)) { P.brow = 0.7; P.lid = 0.3; P.mouth = 'frown'; }
  if (a97In(t, 135.86, 138.34)) { P.eyes = 'wide'; P.brow = -0.7; P.mouth = 'o'; P.tip = 0.06 * a97E(t, 135.86, 0.3); }
  if (a97In(t, 138.34, 140.78)) { P.wet = true; P.brow = -0.3; P.lid = a97In(t, 138.6, 139.05) ? 1 : 0.3; P.mouth = t > 139.14 ? 'smile' : 'closed'; }
  if (t >= 140.78) { P.mouth = 'smile'; P.brow = -0.2; P.lid = 0.2; P.wet = true; P.tip = 0.06 * a97Env(t, 140.78, 142.84, 0.3); }
  P.talk = talk(t, A97_H_TALK, 0.3) * 0.6;
  return P;
}
// ---------- Salih (spear in the right hand at REST.R) ----------
const A97_S_HAND = [40, -100];
function a97SalihBase(o) { return a97Mk('salih', { y: 900, s: 1, dir: 1, brow: 0.4, mouth: 'closed', handR: A97_S_HAND, spear: { hand: A97_S_HAND, rot: 0 }, ...o }); }
const a97Walker = (xf, t, stride = 26) => walk(xf, t, { stride });
const a97Dir = (xf, t, d0) => { const v = speed(xf, t); return Math.abs(v) > 8 ? Math.sign(v) : d0; };

// ---------- S1-S2 palace: the order ----------
const a97S1X = (t) => (t < 19.4 ? kfn(t, [[2.3, -80], [4.0, 360]], 'inOut') : kfn(t, [[19.45, 360], [20.52, -60]], 'in'));
const A97_SUN_DOOR = [150, 640];
function a97ScenePalaceA(t) {
  const H = a97HarunP(t), W = a97Walker(a97S1X, t, 26);
  const S = a97SalihBase({ ...W, dir: t < 19.4 ? 1 : -1 });
  if (t >= 4.0 && t < 4.3) S.sq = 1 - 0.06 * pulse(t, 4.0, 0.12) + 0.04 * pulse(t, 4.1, 0.2);
  if (a97In(t, 4.1, 5.6)) { S.tip = 0.22 * a97Env(t, 4.1, 5.0, 0.25) + 0.04 * a97Env(t, 4.9, 5.6, 0.2); S.lid = a97In(t, 4.25, 4.85) ? 1 : 0; S.handL = PERSON_HANDS.chest.R.map((v, i) => (i ? v : -v)); }
  if (a97In(t, 9.0, 10.4)) { S.brow = -0.6; S.drop = -6 * a97Env(t, 9.0, 10.4, 0.15); S.eyes = 'wide'; }
  if (a97In(t, 18.14, 19.0)) { S.drop = 5 * pulse(t, 18.14, 0.5); S.lid = a97In(t, 18.2, 18.62) ? 1 : 0; S.brow = -0.5; }
  if (a97In(t, 19.04, 19.4)) S.tip = 0.18 * pulse(t, 19.04, 0.36);
  S.spear.rot = swing(t, 9.0, 0.07, 1.8, 2.5) + swing(t, 4.0, 0.04, 2, 3) - (t > 19.4 ? 0.06 * S.amp * Math.sin(S.ph * 2) + 0.05 : 0) * S.dir + (S.tip || 0) * 0.3;
  const hH = a97Head(H), hS = a97Head(S), BAL = [560, 470], CNT = [330, 380];
  H.gaze = gazePlan(t, [[0, [-1, 0.05]], [2.48, lookAt(hH, hS)], [7.8, lookAt(hH, BAL)], [9.0, lookAt(hH, hS)], [10.48, lookAt(hH, A97_SUN_DOOR)], [11.7, lookAt(hH, hS)], [12.3, [-1, 0.2]], [14.02, lookAt(hH, [560, 520])], [15.0, [-1, 0.25]],
    [19.1, lookAt(hH, hS)], [20.0, [0.5, -0.8]]]);
  S.gaze = gazePlan(t, [[0, lookAt(hS, hH)], [7.9, lookAt(hS, BAL)], [9.0, lookAt(hS, CNT)], [9.9, lookAt(hS, hH)], [10.7, lookAt(hS, A97_SUN_DOOR)], [11.6, lookAt(hS, hH)], [18.2, [0.3, 0.9]], [18.7, lookAt(hS, hH)], [19.4, [-1, 0]]]);
  if (t >= 19.4) S.gaze = [-1, 0];
  a97Lid(H, t); a97Lid(S, t);
  return { actors: [H, S], under: [], over: [], heads: { H: hH, S: hS } };
}

// ---------- S3-S4a merchant house: six coins, fear, the guard's pity ----------
const A97_MX3 = 600, A97_TABLE = [340, 520, 800];
const a97S4SalX = (t) => kfn(t, [[31.18, 150], [32.0, 500], [32.8, 500], [33.5, 430]], 'inOut');
const a97S4ManX = (t) => kfn(t, [[32.7, A97_MX3], [33.5, 520]], 'inOut');
// coin fall from the purse to the table (6 coins)
const A97_COINS = [0, 1, 2, 3, 4, 5].map((i) => ({ t0: 20.75 + i * 0.09, x: 470 + (i - 2.5) * 14 + (i % 2 ? 5 : -5) }));
function a97SceneMerchant(t) {
  // Mansur
  const M = a97Mk('mansur', { x: A97_MX3, y: 900, s: A97_MS, dir: -1, seat: 'stool', brow: -0.4, mouth: 'frown' });
  M.sit = t < 26.94 ? 0 : t < 32.06 ? a97E(t, 26.94, 0.45, 'in') : 1 - a97E(t, 32.25, 0.45);
  if (t >= 32.7) { Object.assign(M, a97Walker(a97S4ManX, t, 24)); M.sit = 0; }
  if (a97In(t, 27.39, 27.9)) M.sq = landSquash(t, 27.39, 0.1);
  if (a97In(t, 32.06, 32.3)) M.sq = anticipate(t, 32.06, 0.24, 0.07);
  const purse = [515, 735];
  M.handRW = t < 22.6 ? a97L2([560, 800], purse, a97Env(t, 20.0, 22.6, 0.3)) : null;
  M.handR = M.handRW ? null : a97Tr(t, [[25.82, 26.94, PERSON_HANDS.cheeks.R], [27.78, 29.4, PERSON_HANDS.headHold.R], [29.4, 31.3, [30, -150]]], [36, -70]);
  M.handL = a97Tr(t, [[25.82, 26.94, PERSON_HANDS.cheeks.L], [27.78, 29.4, PERSON_HANDS.headHold.L], [29.4, 31.3, [-24, -150]]], [-30, -70]);
  if (t >= 25.82 && t < 26.94) { M.eyes = 'wide'; M.mouth = 'o'; M.brow = -0.8; M.sq = 0.95; M.x += tremble(t, 3); M.wet = t > 26.5; }
  if (a97In(t, 26.94, 29.86)) { M.brow = -0.8; M.wet = true; M.mouth = 'frown'; }
  if (a97In(t, 29.04, 29.86)) { M.lid = 0.6; M.drop = 8 * a97E(t, 29.04, 0.3); }
  if (a97In(t, 29.86, 32.06)) { M.wet = true; M.brow = -0.7; M.lid = 0.3; M.drop = 8 * (1 - a97E(t, 31.2, 0.4)); }
  if (t >= 32.06) { M.brow = -0.5; M.mouth = 'closed'; M.wet = true; }
  // Salih in the doorway, then across to Mansur
  const walking = t >= 31.18, W = walking ? a97Walker(a97S4SalX, t, 26) : { x: 150, ph: 0, amp: 0 };
  const S = a97SalihBase({ ...W, dir: t < 32.8 ? 1 : -1, brow: 0.4 });
  const leanSpear = t >= 29.86 + 0.6;   // he leans the spear on the door frame as he softens
  if (leanSpear) { S.spear = null; S.handR = null; }
  if (a97In(t, 25.04, 25.82)) { S.handL = [-40, -214]; S.lid = 0.3; }
  if (t >= 29.86) { S.brow = settleTo(t, 30.45, 0.4, -0.4, 0.6, 0.1); S.lid = a97In(t, 30.5, 30.95) ? 0.9 : 0; S.mouth = t > 30.7 ? 'frown' : 'closed'; }
  const hM = a97Head(M);
  if (a97In(t, 31.9, 32.6)) S.handRW = [hM[0] + 26, hM[1] + 62];
  if (a97In(t, 32.06, 33.5)) { S.handR = a97In(t, 32.6, 33.5) ? PERSON_HANDS.pointFwd.R : S.handR; if (!a97In(t, 32.6, 33.5)) S.handRW = [hM[0] + 30, hM[1] + 64]; }
  const hS = a97Head(S), PILE = [470, 790], BAR = [300, 330], HG = [880, 300];
  M.gaze = gazePlan(t, [[20.0, [-0.7, 0.6]], [23.54, lookAt(hM, PILE)], [23.9, lookAt(hM, BAR)], [25.1, lookAt(hM, hS)], [25.82, [0, 0.05]], [27.0, [-0.3, 0.6]],
    [27.78, lookAt(hM, PILE)], [28.05, lookAt(hM, BAR)], [28.3, lookAt(hM, HG)], [28.55, lookAt(hM, PILE)], [28.8, lookAt(hM, BAR)], [29.04, [0.1, 0.7]], [31.3, lookAt(hM, hS)], [32.7, [-1, 0.1]]], t > 27.7 && t < 29 ? 0.07 : 0.22);
  S.gaze = gazePlan(t, [[20.0, lookAt(hS, hM)], [25.04, [0.9, -0.9]], [25.6, lookAt(hS, hM)], [32.6, [-1, 0]], [33.0, lookAt(hS, hM)]]);
  a97Lid(M, t); a97Lid(S, t);
  const under = [(c) => { if (leanSpear) a97SpearFree(c, 214, 900, -0.12 * a97E(t, 30.4, 0.4, 'out'), 300); }];
  const over = [(c) => {
    if (t < 22.6 && M.handRW) { const tilt = a97E(t, 20.52, 0.3) * 2.2; c.save(); c.translate(purse[0] - 6, purse[1] + 6); c.rotate(-tilt); a97Purse(c, 0, 18, 0.9); c.restore(); }
    let landed = 0; for (const k of A97_COINS) { if (t < k.t0) continue; const y = fallY(t, k.t0, k.t0 + 0.32, purse[1] + 20, A97_TABLE[2] - 10); if (t < k.t0 + 0.32) a97Coin(c, k.x - 30 * (1 - a97B(t, k.t0, 0.32)) + 30, y, 9, 0.8); else landed++; }
    if (landed) a97CoinPile(c, 470, A97_TABLE[2], landed, 9);
  }];
  return { actors: [S, M], under, over, heads: { M: hM, S: hS } };
}

// ---------- S11-S12 the street at dusk (world 1600 wide) ----------
const a97MX11 = (t) => kfn(t, [[104.0, 380], [105.92, 500], [110.0, 620], [115.5, 760]], 'lin');
const a97SX11 = (t) => a97MX11(Math.min(t, 115.14)) - 190;
function a97SalX12(t) { const x0 = a97MX11(115.14) - 190; return t < 125.38 ? x0 : kfn(t, [[125.38, x0], [126.22, x0 + 90]], 'in'); }
function a97SceneStreet(t) {
  const mw = { ...a97Walker(a97MX11, t, 24) }; if (t >= 115.5) { mw.x = a97MX11(115.5); mw.amp = 0; }
  const M = a97Mk('mansur', { ...mw, y: 900, s: A97_MS, dir: t < 117.66 ? 1 : -1, brow: -0.6, mouth: 'closed', lid: 0.3 });
  if (t < 115.5) M.amp *= t < 105.92 ? 1 : 0.7;
  const sackPt = (P) => [P.x + P.dir * 34 * P.s, P.y - 80 * P.s];
  // sack hug
  let sq = 1 + kick(t, A97_FALLS11, 0.03, 9, 8); if (a97In(t, 119.26, 120.6)) sq = 0.92 + 0.08 * a97E(t, 120.0, 0.6);
  if (a97In(t, 105.92, 117.6)) M.sq = 0.96; if (a97In(t, 119.26, 120.6)) { M.sq = 0.92 + 0.06 * a97E(t, 120.0, 0.6); M.tip = -0.1 * a97Env(t, 119.26, 120.6, 0.2); M.eyes = 'wide'; }
  if (a97In(t, 108.14, 110.0)) { M.x += tremble(t, 2.5); M.wet = true; M.brow = -0.8; }
  const hold = !a97In(t, 110.0, 117.66);
  const sp = sackPt(M);
  if (hold) a97Carry(M, sp[0], sp[1] + 4, 46);
  else { M.handLW = [sp[0] - M.dir * 46, sp[1] + 4]; M.handR = a97Tr(t, [[110.02, 115.8, (tt) => [70, -196 + 6 * Math.sin(tt * 6)]], [115.86, 117.6, PERSON_HANDS.palmsUp.R]], [46, -120]); }
  if (a97In(t, 110.02, 115.8)) { M.talk = 0.4 + 0.4 * Math.abs(Math.sin(t * 6.5)); M.lid = 0.25; M.brow = -0.3; M.sq = anticipate(t, 110.02, 0.3, -0.04); M.tilt = -0.05; }
  if (a97In(t, 115.86, 117.66)) { M.lid = 0.5; M.mouth = 'closed'; M.drop = 3; M.tilt = 0.05; M.sq = 1 - 0.03 * pulse(t, 115.9, 0.5); }
  if (t >= 117.66) { M.brow = -0.6; M.mouth = 'frown'; }
  if (a97In(t, 124.34, 126.22)) { M.lid = t < 124.84 ? 0 : 0.7; M.drop = t < 124.84 ? -2 : 10 * a97E(t, 124.84, 0.4); }
  // Salih behind with the chest on his shoulder
  const sx = t < 115.14 ? a97Walker(a97SX11, t, 26) : t < 125.38 ? { x: a97SalX12(t), ph: 0, amp: 0 } : a97Walker(a97SalX12, t, 26);
  if (t < 115.14 && t > 114.9) sx.amp *= 0.5;
  const S = a97SalihBase({ ...sx, brow: 0.2 });
  const shoulderChest = !a97In(t, 117.66, 125.6);
  S.handL = shoulderChest ? [-36, -206] : a97Tr(t, [[118.4, 119.2, (tt) => [-60 + 160 * a97E(tt, 118.5, 0.25), -200]]], [-30, -100]);
  if (a97In(t, 115.14, 117.66)) { S.sq = landSquash(t, 115.14, 0.06); S.brow = -0.5; S.eyes = t < 116.2 ? 'wide' : 'open'; }
  if (a97In(t, 117.66, 125.38)) { S.brow = 0.9; S.mouth = 'open'; S.talk = talk(t, [[117.7, 118.6], [120.4, 122.1], [122.84, 123.6]], 0.7) * 0.9; S.mouth = S.talk ? 'closed' : 'frown'; }
  if (a97In(t, 120.4, 121.6)) { S.handR = [100 + 12 * Math.sin((t - 120.4) * 16), -168]; S.spear = null; S.tip = 0.08; }
  if (a97In(t, 123.74, 125.0)) { S.handR = [52, -212]; S.spear = null; }
  const spearDown = a97In(t, 117.66, 125.6);   // planted spear while he scolds
  if (spearDown) S.spear = null;
  if (a97In(t, 125.38, 126.22)) { S.drop = 0; S.brow = 0.5; }
  const hM = a97Head(M), hS = a97Head(S), HUD = a97V2W(t, 500, 250);
  M.gaze = gazePlan(t, [[104, [1, 0.1]], [104.3, [-1, -0.2]], [104.6, [1, 0.1]], [105.1, [-0.9, -0.6]], [105.4, [1, 0.1]], [107.6, [0.4, -0.9]], [108.4, [1, 0.3]], [110.02, [0.6, -0.5]], [115.14, [1, 0.6]],
    [117.66, lookAt(hM, hS)], [119.3, [0.3, 0.9]], [120.4, lookAt(hM, hS)], [122.2, [0.4, 0.8]], [124.34, lookAt(hM, HUD)], [124.84, [0.7, 0.9]]], t > 104 && t < 105.6 ? 0.07 : 0.22);
  S.gaze = gazePlan(t, [[104, lookAt(hS, hM)], [107.0, [1, -0.1]], [115.14, lookAt(hS, hM)], [123.74, [0.4, -1]], [124.3, lookAt(hS, hM)], [125.38, [1, 0]]]);
  a97Lid(M, t); a97Lid(S, t);
  const chestS = 0.55;
  const pre = [], postS = [];
  if (shoulderChest) pre.push((c) => { const p = a97Pt(S, -64, -150 + (S.drop || 0) * 0.3); a97Chest(c, p[0], p[1] + kick(t, A97_FALLS11S, 2, 9, 8), chestS, { rot: -0.08 * S.dir, band: C.red }); });
  S.pre = pre;
  const chestX = a97SalX12(117.66) - 70;
  const under = [(c) => { if (!shoulderChest) a97Chest(c, chestX, 900, chestS, { band: C.red, sqy: impactSquash(t, 117.86, 0.9), sqx: 1 }); if (spearDown) a97SpearFree(c, a97SalX12(t) + 42, 900, 0, 300); }];
  M.post = [(c) => { const p = sackPt(M), q = M.dir; a97Sack(c, p[0], p[1] + 70 * A97_MS, 0.55, { sq }); a97Casket(c, p[0] + q * 58, p[1] + 12, 0.6, { open: 0 }); }];
  return { actors: [S, M], under, over: [], heads: { M: hM, S: hS } };
}
const A97_FALLS11 = footfalls(a97MX11, 104.0, 115.5, 24);
const A97_FALLS11S = footfalls(a97SX11, 104.0, 115.14, 26);
