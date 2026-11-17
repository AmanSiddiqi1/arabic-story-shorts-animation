// ===== AN-111 market: a 1600-wide street strip (S3, S6, S10, S11, S12) =====
const A111_MKT_A = { w: 1600, palace: false, stalls: [{ x: 380, kind: 'cloth', cols: [C.blue, C.white] }, { x: 1200, kind: 'fruit', cols: [C.red, C.yellow] }], props: [['sacks', 800, {}]] };
const A111_MKT_B = { w: 1600, palace: false, stalls: [{ x: 380, kind: 'cloth', cols: [C.blue, C.white] }, { x: 1120, kind: 'empty', cols: [C.yellow, C.blue] }], props: [['sacks', 800, {}], ['basket', 1420, {}]] };
const a111Mkt = (ctx, t, cam, o) => marketStreet(ctx, { ...o, t, camX: cam ? cam.x - 500 / cam.zoom : 0 });
// a plain counter front (redrawn over a stallholder so he stands behind it)
function a111Counter(ctx, x0, x1, top) { shape(ctx, [[x0, top], [x1, top], [x1, 902], [x0, 902], [x0, top]], BARKY, { lw: 6, seed: 741, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 }); shape(ctx, [[x0 - 8, top - 14], [x1 + 8, top - 14], [x1 + 8, top + 4], [x0 - 8, top + 4], [x0 - 8, top - 14]], WOOD, { lw: 5, seed: 742 }); }
// the cloth-stall keeper (S3, S6) and the food-stall keeper (S3)
function a111Keeper(ctx, t, x, base, o = {}) { const P = a111P(base, { x, y: 900, s: 0.8, ...o }); a111Draw(ctx, t, P); return P; }
// coins falling from a hand into a palm: list of start times
function a111CoinDrops(ctx, t, from, to, times, r = 10) { times.forEach((a, i) => { if (t < a) return; const u = K.clamp((t - a) / 0.35), x = K.lerp(from[0], to[0], u), y = K.lerp(from[1], to[1], u * u) - (u >= 1 ? 6 * Math.abs(Math.sin((t - a - 0.35) * 14)) * Math.exp(-(t - a - 0.35) * 8) : 0); a111Coin(ctx, x + i * 7 - 7, y - i * 4, r, Math.cos(t * 10 + i)); }); }

// ---------- S3 (10.90-17.90): the daily round: sell, buy cotton, buy bread; zero left, and that is normal ----------
const A111_S3X = a111X([[10.9, 160], [11.55, 330], [12.9, 330], [13.6, 740], [15.0, 740], [15.5, 1120], [17.9, 1120]]);
function a111S3(ctx, t, cam) {
  a111Mkt(ctx, t, cam, A111_MKT_A);
  const K1 = a111Keeper(ctx, t, 450, { costume: 'bedouin', seed: 41 }, { mouth: 'smile', hR: a111In(t, 11.4, 12.5) ? { w: [400, 740] } : [30, -100], gaze: [-0.6, 0.3] });
  a111Counter(ctx, 224, 536, 790);
  const K2 = a111Keeper(ctx, t, 1250, { costume: 'oldWoman', seed: 43 }, { mouth: 'smile', hL: a111In(t, 15.6, 16.3) ? { w: [1160, 760] } : [-30, -100], gaze: [-0.7, 0.3] });
  a111Counter(ctx, 1044, 1356, 790); for (let i = 0; i < 5; i++) a111Bread(ctx, 1150 + i * 40, 772 - (i % 2) * 8, 0.8);
  if (t > 11.3) a111Skein(ctx, 300, 778, { n: 3, s: 0.6 });
  const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S3X, t), mouth: 'smile' }), hx = Hh.x;
  const sell = a111In(t, 11.2, 13.0), cotton = t > 14.2, bread = t > 16.05, palm = sell || a111In(t, 13.0, 16.0);
  Hh.hL = t < 11.2 ? [-36, -70] : a111HT(t, Hh, [[11.2, [-36, -70]], [11.22, { w: [300, 774] }, 0.3], [11.7, [-36, -70], 0.3], [14.16, [-30, -150], 0.35], [16.7, A111H.palmL, 0.3]]);
  Hh.hR = a111HT(t, Hh, [[0, [36, -70]], [11.5, A111H.palmR, 0.3], [13.0, [40, -110], 0.3], [13.65, { w: [800, 840] }, 0.3], [14.0, [40, -110], 0.3], [15.6, () => ({ w: [1160, 776] }), 0.3], [16.1, [40, -170], 0.35], [16.7, A111H.palmR, 0.3]]);
  Hh.drop = 6 * pulse(t, 16.85, 0.5) + 4 * pulse(t, 14.1, 0.3); Hh.sq = anticipate(t, 14.0, 0.2, 0.05) * (t > 14.4 ? settleTo(t, 14.4, 0.94, 1, 0.5, 0.05) : 1); Hh.brow = t > 16.8 ? -0.35 : -0.2;
  Hh.lid = a111In(t, 12.3, 12.55) ? 0.8 : null;
  a111Gz(Hh, t < 11.5 ? [hx + 200, 760] : t < 12.6 ? (Hh.HR || [hx + 50, 800]) : t < 13.0 ? [hx + 50, 820] : t < 13.6 ? [hx + 200, 800] : t < 15.0 ? [800, 850] : t < 15.6 ? [1200, 760] : t < 16.7 ? [hx + 40, 740] : [hx - 200, 820]);
  if (t > 17.3) Hh.look = -0.5 * a111B(t, 17.3, 0.3);
  Hh.after = (c, Q) => {
    if (t < 11.3) a111Basket(c, Q.HL[0], Q.HL[1] + 30, { fill: 0, s: 0.5 }), a111Skein(c, Q.HL[0], Q.HL[1] + 2, { n: 3, s: 0.55 });
    else if (t < 11.7) a111Basket(c, Q.HL[0], Q.HL[1] + 30, { fill: 0, s: 0.5 });
    if (cotton) { const sh = a111W(Q, [-34, -150]), u = a111B(t, 14.2, 0.35); a111Sack(c, K.lerp(800, sh[0], u), K.lerp(890, sh[1] + 30, u), 0.28, { col: C.white, mark: false }); }
    if (bread) { a111Bread(c, Q.HR[0], Q.HR[1] - 8, 0.8); a111Date(c, Q.HR[0] + 18, Q.HR[1] + 4); a111Date(c, Q.HR[0] + 10, Q.HR[1] + 8); }
    const n = t < 11.6 ? 0 : t < 13.7 ? 3 : t < 13.9 ? 2 : t < 15.86 ? 1 : 0; if (palm && n > 0 && t > 12.3) for (let i = 0; i < n; i++) a111Coin(c, Q.HR[0] - 6 + i * 6, Q.HR[1] - 10 - i * 4, 9, 0.6);
  };
  a111Draw(ctx, t, Hh);
  if (a111In(t, 11.6, 12.3)) a111CoinDrops(ctx, t, [400, 740], Hh.HR, [11.6, 11.85, 12.1].filter((a) => t < 12.3), 9);
  if (a111In(t, 13.65, 14.4)) [13.7, 13.9].forEach((a) => { if (t > a) { const u = a111B(t, a, 0.3); a111Coin(ctx, K.lerp(Hh.HR[0], 830, u), K.lerp(Hh.HR[1], 860, u) - 40 * Math.sin(Math.PI * u), 9, Math.cos(t * 9)); } });
  if (a111In(t, 15.86, 16.2)) { const u = a111B(t, 15.86, 0.3); a111Coin(ctx, K.lerp(Hh.HR[0], 1170, u), K.lerp(Hh.HR[1], 760, u) - 20 * Math.sin(Math.PI * u), 9, Math.cos(t * 9)); }
}

// ---------- S6 (24.00-37.00): the friend in need; he gives all of it ----------
const A111_S6HX = a111X([[24.0, 330], [25.8, 330], [26.5, 430], [32.45, 430], [32.75, 470], [37, 470]]);
const A111_S6FX = a111X([[26.5, 990], [27.85, 640], [36.3, 640], [37.3, 940]]);
const A111_PALM6 = [556, 780];
function a111S6(ctx, t, cam) {
  a111Mkt(ctx, t, cam, A111_MKT_A);
  a111Keeper(ctx, t, 450, { costume: 'bedouin', seed: 41 }, { mouth: 'smile', hR: a111In(t, 24.1, 25.1) ? { w: [400, 740] } : [30, -100], gaze: t < 25.5 ? [-0.6, 0.3] : [0.2, 0.2] });
  a111Counter(ctx, 224, 536, 790); a111Skein(ctx, 300, 778, { n: 3, s: 0.6 });
  const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S6HX, t) }), F = a111P(A111_FRIEND, { y: 900, ...a111Walk(A111_S6FX, t, 0.7) });
  const fx = F.x, leaving = t > 36.3;
  // friend: heavy walk in, the turned-out purse, hand on his empty stomach, the palm, the coins to his heart, walks out taller
  F.tip = leaving ? 0 : t < 27.9 ? -0.08 : -0.04; F.drop = leaving ? 0 : 7; F.lid = leaving ? null : Math.max(0.4, blink(t, 5)); F.wet = t > 28.5 && t < 36.4; F.sq = t > 28.56 && t < 32.8 ? 0.97 : 1;
  F.talk = a111In(t, 28.56, 31.0) ? a111Talk(t, 0.7, 1) : 0; F.mouth = t > 35.3 ? 'smile' : t > 34.64 ? 'o' : 'frown'; F.eyes = a111In(t, 34.64, 35.3) ? 'wide' : 'open';
  F.hR = a111HT(t, F, [[0, [36, -70]], [28.56, [52, -116], 0.3], [31.0, [36, -70], 0.4]]);
  F.hL = a111HT(t, F, [[0, [-36, -70]], [29.94, A111H.bellyL, 0.3], [32.6, { w: A111_PALM6 }, 0.3], [35.2, [-6, -122], 0.35], [36.4, [-36, -80], 0.4]]);
  if (a111In(t, 29.94, 31.0)) F.x += tremble(t, 1, 9);
  F.tip += (t > 35.3 && t < 36.2 ? -0.1 * pulse(t, 35.3, 0.9) : 0);
  a111Gz(F, gazePlan(t, [[0, [fx - 100, 900]], [28.8, () => a111Head(Hh)], [29.3, [fx - 40, 900]], [31.0, () => a111Head(Hh)], [34.64, A111_PALM6], [35.0, () => a111Head(Hh)], [36.3, [fx + 200, 760]]], 0.12));
  F.after = (c, Q) => { if (a111In(t, 28.56, 31.2)) a111Purse(c, Q.HR[0], Q.HR[1] + 4, 0.7, { out: true, rot: 0.1 * Math.sin(t * 3) }); const n = t < 33.84 ? 0 : t < 34.09 ? 1 : t < 34.34 ? 2 : 3; if (n && t < 35.2) for (let i = 0; i < n; i++) a111Coin(c, Q.HL[0] - 4 + i * 5, Q.HL[1] - 8 - i * 3, 8, 0.6); };
  // hero: sells, fist, greeting, the smile fades, listens, hand to chest, the decision blink, steps in and gives everything
  const fistW = () => a111W(Hh, [40, -112]), G = a111Give(t, 32.86, fistW(), [A111_PALM6[0], A111_PALM6[1] - 16], a111Head(F));
  Hh.hR = a111HT(t, Hh, [[0, A111H.palmR], [25.7, [40, -112], 0.25], [27.5, A111H.out, 0.3], [28.0, [40, -112], 0.4], [32.5, () => ({ w: G.h }), 0.01], [35.6, () => ({ w: [F.HL ? F.HL[0] + 6 : 560, F.HL ? F.HL[1] - 6 : 780] }), 0.2], [36.0, () => ({ w: [592 + 4 * Math.sin(t * 16), 800] }), 0.2], [36.4, [40, -80], 0.4]]);
  Hh.hL = a111HT(t, Hh, [[0, [-36, -70]], [27.5, A111H.outL, 0.3], [28.0, [-36, -70], 0.4], [31.08, A111H.chestL, 0.35], [32.6, [-36, -76], 0.4]]);
  Hh.mouth = t < 28.2 || t > 35.6 ? 'smile' : 'closed'; Hh.brow = blend(t, 28.0, 28.5, -0.2, -0.6) + (t > 35.6 ? 0.35 : 0); Hh.wet = t > 31.08 && t < 35.6; Hh.drop = 5 * pulse(t, 25.75, 0.35) + 5 * pulse(t, 36.0, 0.4);
  Hh.lid = a111In(t, 32.15, 32.6) ? Math.sin(Math.PI * (t - 32.15) / 0.45) : t > 35.6 ? Math.max(0.3, blink(t, 3)) : null; Hh.look = t > 26 ? 0.4 : 0;
  a111Gz(Hh, gazePlan(t, [[0, [400, 760]], [24.2, [400, 790]], [25.9, [800, 840]], [27.5, () => a111Head(F)], [31.6, fistW], [32.0, () => a111Head(F)], [36.3, () => a111Head(F)]], 0.09));
  Hh.after = (c, Q) => { const n = t < 24.2 ? 0 : t < 24.5 ? 1 : t < 24.8 ? 2 : t < 25.7 ? 3 : 0; for (let i = 0; i < n; i++) a111Coin(c, Q.HR[0] - 6 + i * 6, Q.HR[1] - 10 - i * 4, 9, 0.6); };
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, F);
  if (a111In(t, 24.2, 25.0)) a111CoinDrops(ctx, t, [400, 740], Hh.HR, [24.2, 24.5, 24.8].filter((a) => t < a + 0.36), 9);
  if (a111In(t, 33.84, 34.7)) [33.84, 34.09, 34.34].forEach((a) => { if (t > a && t < a + 0.3) { const u = (t - a) / 0.3; a111Coin(ctx, K.lerp(Hh.HR[0], F.HL[0], u), K.lerp(Hh.HR[1] + 6, F.HL[1] - 8, u), 8, Math.cos(t * 12)); } });
  // the friend's need: an empty bowl and a thin child
  if (a111In(t, 29.94, 31.2)) { const p = a111B(t, 29.94, 0.3, 'lin') * (1 - a111B(t, 30.95, 0.25));
    a111Balloon(ctx, 680, 478, 210, 160, p, a111W(F, [30, -250]), (c) => { c.fillStyle = '#fff3d6'; c.fillRect(-130, -100, 260, 200); a111Bowl(c, -45, 40, 0.6);
      const k = a111P(A111_CHILD, { x: 45, y: 72, s: 0.45, noBlink: true, mouth: 'frown', wet: true, lid: 0.3, sq: 1.08 }); k.gaze = [0, 0.4]; k.hL = A111H.bellyL; a111Draw(c, t, k); }); }
}

// ---------- S10 (58.90-64.70): nobody wants the platter or the jar ----------
const A111_S10HX = a111X([[58.9, 420], [59.8, 640]]), A111_S10LX = a111X([[60.0, 1080], [60.55, 790], [61.3, 790], [62.7, 230]]), A111_S10SX = a111X([[61.35, 210], [61.85, 520], [62.45, 520], [63.3, 160]]);
function a111S10(ctx, t, cam) {
  a111Mkt(ctx, t, cam, A111_MKT_B); a111Counter(ctx, 964, 1276, 790);
  const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S10HX, t) }), L = a111P(A111_LADY, { y: 892, ...a111Walk(A111_S10LX, t, 0.86) }), Sv = a111P(A111_SERVANT, { y: 904, ...a111Walk(A111_S10SX, t, 0.86) });
  const sink = 12 * a111B(t, 61.3, 0.3) + 16 * a111B(t, 63.46, 0.35);
  Hh.hR = t < 59.8 ? [26, -128] : a111Mix([26, -128], [70 - sink, -138 + sink * 2], a111B(t, 59.8, 0.3)); Hh.hL = t < 59.8 ? [-26, -128] : a111Mix([-26, -128], [-70 + sink, -138 + sink * 2], a111B(t, 59.8, 0.3));
  Hh.sq = t > 63.46 ? 0.97 : 1; Hh.lid = t > 63.46 && t < 64.4 ? Math.max(0.4, blink(t, 3)) : null; Hh.mouth = t < 61.3 ? 'smile' : 'closed'; Hh.brow = t > 64.4 ? -0.6 : -0.3;
  Hh.drop = t > 63.46 && t < 64.4 ? 6 : -4 * pulse(t, 64.5, 0.3); Hh.look = t > 64.4 ? 0.6 * a111B(t, 64.4, 0.2) : 0;
  a111Gz(Hh, gazePlan(t, [[0, [800, 760]], [60.5, () => a111Head(L)], [61.5, () => a111Head(Sv)], [63.46, [640, 860]], [64.4, [1100, 780]]], 0.12));
  Hh.after = (c, Q) => { a111Platter(c, Q.HR[0] + 10, Q.HR[1] - 18, { r: 34, ry: 0.92, crack: 1 }); a111Jar(c, Q.HL[0] - 6, Q.HL[1] + 22, { h: 70, chip: true, rot: swing(t, 62.0, 0.12, 3, 4) }); };
  L.mouth = a111In(t, 60.7, 61.4) ? 'frown' : 'closed'; L.look = a111In(t, 60.8, 61.3) ? 0.7 * Math.sin((t - 60.8) * 25) : 0; L.hR = [30, -110]; L.hL = [-30, -100];
  a111Gz(L, t < 61.3 ? [Hh.x + 80, 760] : [200, 800]);
  Sv.hR = a111HT(t, Sv, [[0, [36, -70]], [61.85, () => ({ w: Hh.HL ? [Hh.HL[0] - 10, Hh.HL[1] + 2] : [600, 800] }), 0.2], [62.15, [36, -70], 0.2]]);
  Sv.hL = a111In(t, 62.2, 62.8) ? [-60 + 10 * Math.sin(t * 22), -190] : [-36, -70]; Sv.brow = a111In(t, 61.8, 62.8) ? -0.5 : 0; Sv.mouth = t > 62.2 ? 'frown' : 'closed';
  a111Gz(Sv, t < 62.4 ? [Hh.x - 70, 790] : [100, 800]);
  a111Draw(ctx, t, L); a111Draw(ctx, t, Hh); a111Draw(ctx, t, Sv);
  if (a111In(t, 62.0, 62.6) && Hh.HL) soundArcs(ctx, Hh.HL[0] - 30, Hh.HL[1] - 10, -1, t - 62.0, C.black);
}

// ---------- S11 (64.70-75.30): the fish stall: one swollen, stinking fish that nobody wants ----------
const A111_FISH = [1060, 764], A111_S11HX = a111X([[73.3, 640], [75.3, 880]]), A111_S11PX = a111X([[73.4, 1560], [73.85, 1330], [74.0, 1330], [74.8, 1640]]);
function a111FishStall(ctx, t, cam, seller, extra) { a111Mkt(ctx, t, cam, A111_MKT_B); a111Draw(ctx, t, seller); a111Counter(ctx, 924, 1276, 790); if (extra) extra(); }
function a111SellerS11(t) {
  const P = a111P(A111_SELLER, { x: 1160, y: 866 }), fan = a111In(t, 66.58, 67.7);
  P.hL = a111HT(t, P, [[0, [-36, -80]], [66.5, () => ({ w: [1072 + 22 * Math.sin(t * 11), 726] }), 0.25], [67.7, { w: [1052, 770] }, 0.25], [72.02, [-10, -186], 0.25], [74.48, { w: [1110, 788] }, 0.3]]);
  P.hR = a111HT(t, P, [[0, [36, -80]], [67.7, { w: [1120, 770] }, 0.25], [74.48, { w: [1190, 788] }, 0.3]]);
  P.tip = t > 66.5 && t < 72 ? -0.1 : 0; P.talk = a111In(t, 66.58, 68.3) ? a111Talk(t, 0.9, 3) : 0; P.mouth = t > 74.48 ? 'frown' : 'smile'; P.brow = t < 74.4 ? -0.5 : 0.1;
  P.wet = t > 72.02 && t < 74.4; P.lid = t > 74.48 ? Math.max(0.6, blink(t, 13)) : t > 72.02 ? Math.max(0.5, blink(t, 13)) : null; P.sq = t > 74.48 ? 0.93 : 1; P.drop = t > 74.48 ? 10 : 0;
  a111Gz(P, gazePlan(t, [[0, [800, 820]], [66.9, [1400, 820]], [67.3, [800, 820]], [67.7, [700, 800]], [68.5, A111_FISH], [70.4, [700, 800]], [73.5, [1340, 760]], [74.5, A111_FISH]], 0.07));
  P.after = (c, Q) => { if (t < 72.0) a111Fan(c, Q.HL[0], Q.HL[1], -0.4 + (fan ? 0.5 * Math.sin(t * 11) : 0), 0.9); a111Sigh(c, Q, t, 74.6, -1); };
  return P;
}
function a111S11(ctx, t, cam) {
  const Sl = a111SellerS11(t), puff = t < 69.34 ? 0 : settleTo(t, 69.34, 0, 1, 0.8, 0.15);
  a111FishStall(ctx, t, cam, Sl);
  a111Fish(ctx, A111_FISH[0], A111_FISH[1] - 6 * puff, { s: 0.74, puff, rot: 0.04 * pulse(t, 70.0, 0.25) - 0.04 * pulse(t, 70.25, 0.25) });
  a111Stink(ctx, A111_FISH[0], A111_FISH[1] - 30, t, a111B(t, 71.18, 0.5), { n: 4 });
  const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S11HX, t) }); Hh.hR = [70, -138 + 28]; Hh.hL = [-70, -138 + 28]; Hh.brow = t < 66.2 ? 0.3 : -0.3; Hh.tip = -0.03 * a111B(t, 64.9, 0.3) * (1 - a111B(t, 66.2, 0.4));
  a111Gz(Hh, [1060, 760]); Hh.look = 0.5; Hh.after = (c, Q) => { a111Platter(c, Q.HR[0] + 10, Q.HR[1] - 18, { r: 34, ry: 0.92, crack: 1 }); a111Jar(c, Q.HL[0] - 6, Q.HL[1] + 22, { h: 70, chip: true }); };
  if (t < 66.4 || t > 73.3) a111Draw(ctx, t, Hh);
  const Pp = a111P(A111_PASSER, { y: 904, ...a111Walk(A111_S11PX, t, 0.88) });
  if (a111In(t, 73.4, 74.9)) { const back = t > 73.95; Pp.dir = back ? -1 : 1; Pp.eyes = t > 73.8 ? 'wide' : 'open'; Pp.hR = t > 73.85 ? A111H.mouth : [36, -70]; Pp.hL = t > 73.85 ? A111H.mouthL : [-36, -70]; Pp.sq = a111In(t, 73.85, 74.0) ? 0.9 : 1; a111Gz(Pp, t < 73.85 ? A111_FISH : [1700, 760]); a111Draw(ctx, t, Pp); }
}

// ---------- S12 (75.30-84.60): the swap ----------
const A111_S12HX = a111X([[75.3, 870], [78.0, 870], [78.3, 985], [78.9, 985], [79.05, 935], [80.4, 935], [80.9, 862], [83.6, 862], [84.6, 760]]), A111_S12SX = a111X([[75.3, 1160], [77.4, 1150], [81.1, 1150], [81.55, 1010]]);
function a111S12(ctx, t, cam) {
  const Sl = a111P(A111_SELLER, { y: 866, ...a111Walk(A111_S12SX, t, 0.92) }), Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S12HX, t) });
  const shake = a111In(t, 78.38, 78.9) ? 8 * Math.sin((t - 78.38) * Math.PI * 4) : 0, HS = [1050, 722 + shake];
  const placed = t > 79.2, lifted = t > 79.75, fishHand = () => Hh.HR || [1000, 760];
  // seller: looks at the platter, tilts his head, shakes, hugs the platter, plants the fan in the jar, waves, a free breath
  Sl.hL = a111HT(t, Sl, [[0, [-36, -80]], [78.2, { w: HS }, 0.2], [78.95, [-36, -80], 0.3], [81.62, { w: [975, 784] }, 0.25], [81.95, [-6, -126], 0.3], [82.3, { w: [950, 712] }, 0.3], [82.8, [-20, -130], 0.3]]);
  Sl.hR = a111HT(t, Sl, [[0, [36, -80]], [81.62, [10, -126], 0.3], [83.22, [62 + 8 * Math.sin(t * 16), -196], 0.25]]);
  Sl.tilt = 0.2 * a111B(t, 76.56, 0.25) * (1 - a111B(t, 77.6, 0.3)); Sl.brow = a111In(t, 75.4, 77.6) ? -0.5 : 0; Sl.mouth = t > 78.2 ? 'smile' : 'closed';
  Sl.tip = (a111In(t, 78.1, 78.95) ? -0.1 : 0) + (a111In(t, 82.2, 82.9) ? -0.12 : 0) + 0.06 * (pulse(t, 82.0, 0.3) + pulse(t, 82.9, 0.3)); Sl.sq = t > 83.22 ? 1 + 0.04 * a111B(t, 83.3, 0.4) : 1; Sl.lid = a111In(t, 83.4, 83.85) ? 1 : null;
  a111Gz(Sl, gazePlan(t, [[0, () => (Hh.HR || [960, 780])], [76.5, () => (Hh.HR || [960, 780])], [77.6, () => a111Head(Hh)], [79.2, [975, 780]], [81.9, [975, 780]], [83.2, () => a111Head(Hh)]], 0.12));
  Sl.after = (c, Q) => { if (t > 81.85) a111Platter(c, (Q.HL[0] + Q.HR[0]) / 2, Q.HR[1] - 4, { r: 32, ry: 0.92, crack: 1 }); if (t < 82.5) a111Fan(c, Q.HL[0], Q.HL[1], -0.4, 0.8); };
  a111FishStall(ctx, t, cam, Sl, () => {
    if (placed && t < 81.8) a111Platter(ctx, 978, 782, { r: 32, ry: 0.4, crack: 1 });
    if (placed) { a111Jar(ctx, 944, 792, { h: 70, chip: true }); if (t > 82.5) a111Fan(ctx, 946, 728, 0.15, 0.8); }
    if (!lifted) a111Fish(ctx, A111_FISH[0], A111_FISH[1] - 6, { s: 0.74, puff: 1 });
  });
  Hh.hR = a111HT(t, Hh, [[0, [70, -110]], [78.2, { w: HS }, 0.2], [78.95, [70, -110], 0.25], [79.06, { w: [976, 782] }, 0.25], [79.45, { w: [992, 764] }, 0.2], [79.75, [96, -150], 0.4]]);
  Hh.hL = a111HT(t, Hh, [[0, [-70, -110]], [79.06, { w: [946, 786] }, 0.25], [79.45, [-36, -80], 0.3]]);
  Hh.brow = a111In(t, 75.4, 77.6) ? -0.55 : -0.2; Hh.tilt = -0.2 * a111B(t, 76.56 + a111St(1), 0.25) * (1 - a111B(t, 77.6, 0.3)); Hh.mouth = a111In(t, 78.2, 79.2) ? 'smile' : 'closed';
  Hh.lid = t > 79.3 ? Math.max(0.3, blink(t, 3)) : null; Hh.look = t > 79.5 ? -0.6 : 0.4; Hh.sq = anticipate(t, 79.3, 0.3, 0.04);
  a111Gz(Hh, gazePlan(t, [[0, A111_FISH], [77.6, () => a111Head(Sl)], [79.06, [960, 790]], [79.6, [700, 820]], [83.2, () => a111Head(Sl)], [83.6, [600, 820]]], 0.12));
  Hh.after = (c, Q) => { if (!placed) { a111Platter(c, Q.HR[0] + 10, Q.HR[1] - 18, { r: 34, ry: 0.92, crack: 1 }); a111Jar(c, Q.HL[0] - 6, Q.HL[1] + 22, { h: 70, chip: true }); }
    if (lifted) { const h = fishHand(), sw = swing(t, 79.9, 0.35, 1.3, 1.6) + swing(t, 83.6, 0.2, 1.6, 2); c.save(); c.translate(h[0], h[1]); c.rotate(1.15 + sw); a111Fish(c, 70, 0, { s: 0.7, puff: 1, tail: 0.3 * Math.sin(t * 4) }); c.restore(); a111Stink(c, h[0] + 30, h[1] + 40, t, 0.8, { n: 2, h: 110, flies: 1 }); } };
  a111Draw(ctx, t, Hh);
  if (!lifted) a111Stink(ctx, A111_FISH[0], A111_FISH[1] - 30, t, 1, { n: 4 });
}
