// ===== AN-014 village scenes: S1 (0-9.88), S2 (9.88-19.2), S3 (19.2-28.1), S4 (28.1-30.42), S7 (42.7-47.6) =====
const K14_ABOVE_GROUND = [-100, -100, 1200, 1003];   // everything above the low wall's base (y 903)
const K14_HD = (x, s = 0.9) => [x, 900 - 176 * s / 0.9];   // standing head centre at scale s

// ---------- S1: two doors, the loved man, the envier at the edge ----------
const K14_S1 = { gmX: [[1.5, 270], [2.3, 330], [7.9, 330], [8.1, 310]], vA: [[5.22, -90], [6.0, 95]], vB: [[5.5, -90], [6.3, 165]], vC: [[5.62, -70], [6.7, 228]] };
function k14S1(ctx, t) {
  const doorA = kfn(t, [[0.46, 0], [0.8, 0.85]]), doorB = kfn(t, [[0.9, 0], [1.25, 0.85]]);
  k14Village(ctx, t, { doorA, doorB, u: 0.3 });
  cloudFlat(ctx, 160 + t * 9, 210, 0.7);
  // envier: out of his door 0.4 s late, arms folded, at the edge
  if (t >= 0.95) {
    const E = k14EN(t, { x: 735, handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, drop: 4 });
    const st = K.clamp((t - 1.0) / 0.45); E.y = 880 + 20 * st; E.s = 0.82 + 0.06 * st; E.sq = landSquash(t, 1.45, 0.08);
    const tg = t < 1.9 ? [735, 640] : t < 8.6 ? K14_HD(kfn(t, K14_S1.gmX)) : [900, 900];
    if (t >= 8.74) { E.drop = 10; E.amp = pulse(t, 8.82, 0.32); E.ph = Math.PI / 2; E.handL = [-30, -100]; E.handR = [30, -100]; E.mouth = 'frown'; }
    const draw = () => k14Act(ctx, E, t, 3, tg);
    if (t < 1.2) k14Clip(ctx, [690, 640, 90, 270], draw); else draw();
    // the kicked pebble skips twice
    if (t >= 8.95) { const d = t - 8.95, px = 760 + d * 260, py = 900 - Math.abs(Math.sin(d * 7)) * 26 * Math.exp(-d * 1.5); shape(ctx, ell(px, py - 6, 8, 6, 10), STONE2, { lw: 3, seed: 501 }); for (const tk of [9.17, 9.62]) dustBurst(ctx, 760 + (tk - 8.95) * 260, 902, t - tk, 4, 4, 8, 18, 0.4, 5); }
  }
  // villagers walk in, staggered, different speeds; a heart over each as it stops
  const vils = [['villager', K14_S1.vA, 0.86, 11, { pal: { robe: C.blue, dot: NAVY } }], ['villageWoman', K14_S1.vB, 0.84, 12, {}], ['oldWoman', K14_S1.vC, 0.8, 13, {}]];
  vils.forEach(([cos, keys, s, seed, ex], i) => {
    if (t < keys[0][0]) return; const V = k14W({ costume: cos, y: 900, s, dir: 1, mouth: 'smile', ...ex }, keys, t, 27);
    if (t < keys[1][0]) V.handR = PERSON_HANDS.wave.R;
    if (i === 2) { V.brow = blend(t, 8.0, 8.4, -0.2, -0.6); if (t >= 7.94) { const lf = kfn(t, [[8.0, 0], [8.5, 1]]); V.handLW = [K.lerp(250, 262, lf), 805]; V.handRW = [K.lerp(270, 280, lf), 800]; V.mouth = t > 8.5 ? 'o' : 'smile'; } }
    k14Act(ctx, V, t, seed + i, K14_HD(kfn(t, K14_S1.gmX)));
    k14Heart(ctx, t, keys[1][0] + 0.05, keys[1][1], 640, 20);
  });
  // the kind man
  if (t >= 0.5) {
    const xf = k14X(K14_S1.gmX), P = k14Walk(k14GM(t, {}), xf, t);
    const [, lift] = hop(t, 0.72, 0.3, 0, 0, 16); P.y = 900 - lift; P.sq = landSquash(t, 1.02, 0.12);
    if (t < 0.72) { P.y = 884; P.s = 0.84; }
    if (t >= 1.05 && t < 1.55) { const k = Math.sin(Math.PI * K.clamp((t - 1.05) / 0.5)); P.aL = [-0.12 - 2.6 * k, -0.05 - 2.85 * k]; P.aR = [0.12 + 2.6 * k, 0.05 + 2.85 * k]; P.sq = 1 + 0.05 * k; }
    P.dir = t < 4.6 ? 1 : -1;
    let tg = t < 1.1 ? [400, 800] : t < 1.7 ? [330, 300] : t < 2.2 ? [735, 720] : t < 4.3 ? [600, 760] : t < 5.3 ? [P.x, 560] : t < 6.38 ? [90, 720] : t < 6.85 ? K14_HD(95) : t < 7.3 ? K14_HD(165) : K14_HD(228);
    if (t >= 4.3 && t < 5.2) P.mouth = 'smile';
    if (t >= 6.38 && t < 6.85) P.handR = PERSON_HANDS.wave.R;
    if (t >= 6.85 && t < 7.3) P.handR = PERSON_HANDS.chest.R;
    if (t >= 7.3 && t < 7.85) { P.drop = 10 * pulse(t, 7.3, 0.55); P.tip = 0.05 * pulse(t, 7.3, 0.55); }
    let loaf = null;
    if (t >= 7.94 && t < 8.6) { const u = K.clamp((t - 7.94) / 0.5), back = pulse(t, 7.94, 0.2); P.tip = -0.04 * back + 0.08 * K.clamp((t - 8.1) / 0.3); P.handRW = [K.lerp(318, 268, u), K.lerp(800, 800, u)]; loaf = [P.handRW[0] - 4, 794]; }
    if (t >= 8.6) loaf = [268, 795];
    const draw = () => k14Act(ctx, P, t, 1, tg);
    if (t < 0.72) k14Clip(ctx, [225, 640, 90, 270], draw); else draw();
    if (loaf) k14Loaf(ctx, loaf[0], loaf[1], 0.8);
  }
  k14LowWall(ctx);
  // v2: the dashed 'one neighbourhood' chain is replaced by a NEIGHBOURS label (k14Over)
}

// ---------- S2: envy at the wall, the swatted heart, the thought cloud ----------
const K14_S2H = [[13.14, 250, 690], [13.5, 230, 640], [13.86, 260, 720]];
const k14HeartPos = (t, h) => { const d = t - h[0]; return [h[1] + d * 210, h[2] + Math.sin(d * 3 + h[0]) * 20 - d * 10]; };
function k14S2(ctx, t) {
  k14Village(ctx, t, { doorA: 0, doorB: 0.85 });
  const E = k14EN(t, { x: 560, kneel: 1, dir: -1 }), u = K14B(t, 10.42, 0.4);
  E.y = kfn(t, [[10.42, 975], [11.0, 925], [11.7, 888]]);
  E.handLW = [520, kfn(t, [[10.3, 800], [10.6, 772]])]; E.handRW = [596, kfn(t, [[10.3, 800], [10.6, 772]])];
  E.lid = 0.35;
  let tg = [100, 760];
  if (t >= 11.9) { const f = K.clamp((t - 11.9) / 0.8); E.flush = f; E.brow = 0.6 + 0.4 * f; E.mouth = 'frown'; E.x += tremble(t, 1.5 * (t < 15.4 ? 1 : 0.3)); }
  if (t >= 13.14 && t < 14.6) { const i = t < 13.6 ? 0 : t < 14.0 ? 1 : 2; tg = k14HeartPos(t, K14_S2H[i]); }
  if (t >= 14.4 && t < 15.1) { const wind = pulse(t, 14.4, 0.2), sw = K.clamp((t - 14.6) / 0.12); E.handRW = [596 + 20 * wind - 120 * sw, 772 - 30 * wind - 40 * sw]; tg = [470, 700]; }
  if (t >= 15.4) { tg = [380, 470]; E.mouth = t < 17.96 ? 'frown' : 'smile'; E.lid = 0.25; if (t >= 15.8) E.mouth = t < 17.96 ? 'closed' : 'smile'; }
  if (t >= 17.04 && t < 17.96) { E.drop = 5 * (pulse(t, 17.04, 0.26) + pulse(t, 17.3, 0.26) + pulse(t, 17.6, 0.26)); E.handLW = [532 + 8 * Math.sin(t * 9), 766]; E.handRW = [574, 768]; }
  if (t >= 17.96) { const r = Math.sin(t * 22) * 8; E.handLW = [548 + r, 765]; E.handRW = [570 - r, 768]; E.sq = 1 + 0.02 * Math.sin(t * 16); E.brow = 1; }
  k14Clip(ctx, K14_ABOVE_GROUND, () => k14Act(ctx, E, t, 3, tg));   // v2: behind the wall nothing shows below its base
  k14LowWall(ctx);
  // hearts drift over the wall toward him; the third is swatted
  K14_S2H.forEach((h, i) => { if (t < h[0]) return; const [x, y] = k14HeartPos(t, h); if (i === 2 && t >= 14.72) return; const fade = i < 2 ? K.clamp((15.2 - t) / 0.3) : 1; if (fade <= 0) return; heart(ctx, x, y, 22 * K.ease.back(K.clamp((t - h[0]) / 0.25)), { alpha: fade }); });
  k14Burst(ctx, t, 14.72, ...k14HeartPos(14.72, K14_S2H[2]), 34);
  // thought cloud: the neighbour loses friends, hearts, house, everything
  const p = K14B(t, 15.4, 0.7);
  if (p > 0) thoughtCloud(ctx, 360, 430, 440, 330, t, { p, tail: [520, 690], bg: '#fff3d6', scale: 0.38, at: [500, 820], inside: (c) => k14EnvyDream(c, t) });
}
function k14EnvyDream(c, t) {
  c.fillStyle = '#3f7be6'; c.fillRect(0, 300, 1000, 900); ground(c);
  const gone = (t0) => t < t0 ? 1 : K.clamp(1 - (t - t0) / 0.18);
  const hs = gone(17.6);
  if (hs > 0) { c.save(); c.globalAlpha = hs;
    shape(c, [[320, 900], [320, 640], [680, 640], [680, 900]], '#f3e2b8', { lw: 7, seed: 510, dot: C.red, pitch: 12, rad: 0.15, da: 0.35 });
    if (t < 17.3) shape(c, [[290, 650], [500, 500], [710, 650]], C.red, { lw: 7, seed: 511 }); else k14Burst(c, t, 17.3, 500, 580, 60);
    if (t < 17.04) townDoor(c, 455, 545, 740, 900, 0, { arch: 'round' }); else k14Burst(c, t, 17.04, 500, 820, 50);
    c.restore(); } else k14Burst(c, t, 17.6, 500, 760, 90);
  const alone = t >= 17.96;
  person(c, { ...K14_GMV, pal: { ...K14_GMV.pal }, x: 420, y: 1010, s: 1.25, mouth: alone ? 'frown' : 'smile', brow: alone ? -0.5 : 0, handL: alone ? PERSON_HANDS.palmsUp.L : undefined, handR: alone ? PERSON_HANDS.palmsUp.R : undefined, noBlink: true });
  if (t < 16.5) person(c, { costume: 'villageWoman', x: 620, y: 1010, s: 1.15, mouth: 'smile', noBlink: true }); else k14Burst(c, t, 16.5, 620, 800, 70);
  [[16.62, 300, 560], [16.78, 430, 520], [16.94, 560, 560]].forEach(([t0, x, y]) => { if (t < t0) heart(c, x, y + Math.sin(t * 3 + x) * 8, 34); else k14Burst(c, t, t0, x, y, 40); });
}

// ---------- S3: rubbish over the wall, polite answer, day and night watching ----------
function k14S3(ctx, t) {
  const u = kfn(t, [[24.95, 0.3], [25.4, 0.76], [25.88, 0.76], [26.3, 1.3]]), doorA = kfn(t, [[20.52, 0], [20.8, 0.85], [23.2, 0.85], [23.7, 0], [26.64, 0], [26.95, 0.32]]);
  const night = k14Village(ctx, t, { doorA, doorB: 0, u, lit: dayCycle(u).night, shutB: 1 });
  const W = K14_VIL.win, ghost = t >= 26.9 ? K.clamp((t - 26.9) / 0.3) * K.clamp((28.0 - t) / 0.2) * 0.55 : 0;
  // rubbish on the doorstep, swept in three strokes
  const amt = t < 20.2 ? 0 : kfn(t, [[20.2, 0], [20.4, 1], [21.35, 1], [21.5, 0.66], [21.65, 0.66], [21.8, 0.33], [21.95, 0.33], [22.1, 0]]);
  k14Rubbish(ctx, 330, 908, amt);
  // the kind man
  if (t >= 20.52 && t < 23.7) {
    const P = k14GM(t, { x: kfn(t, [[20.6, 270], [20.9, 300], [22.16, 300], [22.5, 282], [22.96, 282], [23.3, 270]]), dir: 1 });
    P.sq = t < 20.9 ? 0.95 : landSquash(t, 20.9, 0.05); P.brow = t < 21.06 ? -0.5 : 0; P.mouth = 'closed';
    let tg = t < 20.75 ? [330, 905] : t < 21.06 ? [560, 740] : [340, 900];
    if (t >= 21.06 && t < 21.4) { P.drop = 6 * pulse(t, 21.06, 0.4); P.lid = 0.6 * pulse(t, 21.06, 0.4); }
    if (t >= 21.2 && t < 22.12) { const sw = Math.sin((t - 21.2) * Math.PI * 2 / 0.3); P.handRW = [330 + sw * 30, 800]; P.handLW = [318 + sw * 24, 760]; tg = [340 + sw * 40, 905]; }
    if (t >= 22.16) { P.handR = PERSON_HANDS.chest.R; tg = t < 22.6 ? K14_HD(560, 0.88) : [420, 900]; P.mouth = 'smile'; P.drop = t > 22.6 ? 4 : 0; }
    const draw = () => { k14Act(ctx, P, t, 1, tg); if (t >= 21.2 && t < 22.12) k14Broom(ctx, P.handRW, [P.handRW[0] + 24, 905]); };
    if (t < 20.62 || t > 23.0) k14Clip(ctx, [225, 640, 90, 270], draw); else draw();
    for (const tk of [21.35, 21.65, 21.95]) dustBurst(ctx, 360, 900, t - tk, 5, 6, 12, 26, 0.45, Math.round(tk * 10));
  }
  // peeking kind man (door crack) at the end
  if (t >= 26.9) { const P = k14GM(t, { x: 262, s: 0.88, mouth: 'closed', wet: t > 27.2, lid: t > 27.4 && t < 27.85 ? 0.95 : 0, drop: kfn(t, [[27.2, 0], [27.6, 8]]) }); k14Clip(ctx, [225, 640, 30, 270], () => k14Act(ctx, P, t, 1, t < 27.85 ? [560, 740] : [1000, 860])); }
  // the envier: over the wall, in the window at night, on the roof by day
  const E = k14EN(t, { x: 560, kneel: 1, lid: 0.3 });
  const wallUp = (t >= 19.2 && t < 20.45) || (t >= 22.16 && t < 22.95) || (t >= 24.44 && t < 25.14);
  if (t >= 19.2 && t < 25.14) {
    E.y = wallUp ? 888 : 980; if (t >= 24.44 && t < 24.54) E.y = K.lerp(980, 888, (t - 24.44) / 0.1);
    if (t >= 19.2 && t < 20.45) { const h = K.clamp((t - 19.75) / 0.4); E.handLW = [530 - 60 * h, 760 - 40 * h]; E.handRW = [590 - 40 * h, 752 - 50 * h]; E.sq = anticipate(t, 19.55, 0.2, 0.06); E.mouth = 'smile'; E.gaze = t < 19.6 ? [Math.sin(t * 14), 0] : [-1, 0.2]; }
    if (t >= 22.16 && t < 22.95) { E.mouth = t < 22.5 ? 'smile' : 'o'; E.brow = t < 22.5 ? 1 : -0.4; E.handLW = [530, 772]; E.handRW = [596, 772]; }
    if (t >= 24.44) { E.lid = 0.55; E.handLW = [530, 772]; E.handRW = [596, 772]; }
    if (E.y < 975) k14Clip(ctx, K14_ABOVE_GROUND, () => k14Act(ctx, E, t, 3, E.gaze ? null : [270, 760]));
    if (t >= 19.75 && t < 20.45) { const h = K.clamp((t - 19.75) / 0.4); k14Basket(ctx, 500 - 30 * h, 720 - 30 * h, 0.8, -2.2 * h); }
    if (t >= 19.95 && t < 20.4) { const r = K.rng(78); for (let i = 0; i < 7; i++) { const u2 = K.clamp((t - 19.95 - i * 0.02) / 0.4); shape(ctx, ell(K.lerp(480, 300 + r() * 70, u2), 700 + (900 - 700) * u2 * u2 - 90 * Math.sin(Math.PI * u2), 9, 6, 8), i % 2 ? '#7a4212' : C.white, { lw: 3, seed: 520 + i }); } }
  }
  if (t >= 25.14 && t < 25.9) { const P = k14EN(t, { x: 885, y: 800, s: 0.9, lid: 0.45, brow: 0.7 }); P.gaze = [-0.9 + 0.2 * Math.sin(t * 5), 0.25]; P.noBlink = true; k14Clip(ctx, [W[0], W[1], W[2], W[3]], () => k14Person(ctx, P)); }
  if (t >= 25.9 && t < 26.64) { const P = k14EN(t, { x: 770, y: 600, s: 0.9, handL: PERSON_HANDS.chin.R.map((v, i) => i ? v : -v), handR: PERSON_HANDS.chin.R, lid: 0.4, flush: 0.7 * pulse(t, 26.0, 0.5) }); k14Clip(ctx, [600, 200, 400, K14_VIL.roofY - 214], () => k14Act(ctx, P, t, 3, [270, 760])); }
  if (ghost > 0) { ctx.save(); ctx.globalAlpha = ghost;
    k14Clip(ctx, [400, 500, 300, 275], () => k14Person(ctx, k14EN(t, { x: 560, y: 888, kneel: 1, lid: 0.5, gaze: [-1, 0.2], noBlink: true })));
    k14Clip(ctx, W, () => k14Person(ctx, k14EN(t, { x: 885, y: 800, s: 0.9, lid: 0.5, gaze: [-1, 0.2], noBlink: true })));
    k14Clip(ctx, [600, 200, 400, K14_VIL.roofY - 214], () => k14Person(ctx, k14EN(t, { x: 770, y: 600, s: 0.9, lid: 0.5, gaze: [-1, 0.3], noBlink: true, handL: [-16, -160], handR: [16, -160] })));
    ctx.restore(); }
  k14LowWall(ctx, night);
}

// ---------- S4: he leaves; the neighbours wave; the envier hops ----------
const K14_S4X = [[29.25, 290], [29.6, 380], [30.42, 900]];
function k14S4(ctx, t) {
  const doorA = kfn(t, [[28.1, 0.85], [28.5, 0.85], [28.85, 0]]);
  k14Village(ctx, t, { doorA, doorB: 0, u: 0.3 });
  // neighbours at the left wave out of phase
  [['villager', 90, 0, { pal: { robe: C.blue, dot: NAVY } }], ['oldWoman', 165, 1.3, {}]].forEach(([cos, x, ph, ex], i) => {
    const V = { costume: cos, x, y: 900, s: 0.84, dir: 1, mouth: 'frown', wet: true, brow: -0.5, ...ex };
    if (t > 29.5) V.handR = [PERSON_HANDS.wave.R[0] + 14 * Math.sin(t * 9 + ph), PERSON_HANDS.wave.R[1]];
    if (i === 1 && t > 29.9) V.handR = [18, -196];   // dabs an eye
    k14Act(ctx, V, t, 20 + i, t > 29.95 && i === 0 ? K14_HD(560) : K14_HD(kfn(t, K14_S4X)));
  });
  // envier behind the wall: two victory hops, then dusts the wall when looked at
  const E = k14EN(t, { x: 560, kneel: 1, y: 900, lid: 0.3, mouth: 'smile' });
  let lift = 0; for (const h0 of [29.78, 30.02]) lift += hop(t, h0, 0.2, 0, 0, 26)[1];
  E.y = 900 - lift; E.sq = Math.min(landSquash(t, 29.98, 0.1), landSquash(t, 30.22, 0.1));
  if (t >= 29.78 && t < 30.24) { E.aL = K14_UP.aL; E.aR = K14_UP.aR; }
  if (t >= 30.24) { E.handLW = [520 + 30 * Math.sin(t * 20), 772]; E.handRW = [600, 772]; E.mouth = 'closed'; E.gaze = [0.3, 0.6]; }
  k14Clip(ctx, K14_ABOVE_GROUND, () => k14Act(ctx, E, t, 3, E.gaze ? null : K14_HD(kfn(t, K14_S4X))));
  k14LowWall(ctx);
  // the kind man: bindle, hand on his own door, then the walk out
  const P = k14W(k14GM(t, { mouth: 'closed' }), K14_S4X, t, 24);
  if (t < 29.25) { P.x = 290; P.ph = 0; P.amp = 0; }
  if (t >= 28.85 && t < 29.25) { P.handLW = [262, 790]; P.dir = -1; }
  P.drop = t < 29.3 ? 5 * K.clamp((t - 28.4) / 0.3) * K.clamp((29.3 - t) / 0.15 + 0.01) : 0; P.lid = t > 28.5 && t < 28.95 ? 0.95 : 0; P.sq = breathe(t, 2, 0.02);
  P.handR = [20, -150];
  k14Act(ctx, P, t, 1, t > 29.85 && t < 30.1 ? [100, 720] : t < 29.25 ? [270, 760] : [1000, 760]);
  const h = k14L2W(P, P.hands[1][0], P.hands[1][1]); k14Bindle(ctx, h[0], h[1], -2.2 + 0.06 * Math.sin(P.ph || 0), 0.8, 0.25 * Math.sin((P.ph || 0) - 0.4));
}

// ---------- S7: the passer-by's news, the envier at his window ----------
function k14S7(ctx, t) {
  k14Village(ctx, t, { doorA: 0, doorB: 0, u: 0.3, shutB: 1 });
  // passer-by along the lane, telling the news
  const V = k14W({ costume: "villager", pal: { robe: C.yellow, dot: C.red }, y: 900, s: 0.86, dir: 1, mouth: "smile" }, [[43.1, 480], [47.6, 720]], t, 27);
  V.talk = talk(t, [[43.2, 45.0], [45.1, 46.4]]); V.handR = t > 43.4 && t < 46.5 ? [60 + 10 * Math.sin(t * 6), -150] : undefined;
  k14Act(ctx, V, t, 31, [885, 600]);
  const vh = k14Head(V), W = K14_VIL.win;
  // envier leaning out of the window above the sill
  const E = k14EN(t, { x: 885, y: 805, s: 0.92, lid: 0.3 });
  const lean = K14B(t, 44.0, 0.6); E.x -= 26 * lean; E.tip = 0.12 * lean; if (t >= 44.0) E.handR = PERSON_HANDS.cupEar.R;
  let tg = vh;
  if (t >= 45.1) { tg = [600, 470]; }
  if (t >= 46.52) { const f = K.clamp((t - 46.52) / 0.5); E.flush = f; E.brow = 1; E.mouth = 'frown'; E.x += tremble(t, 2 * f); E.steam = t; E.handR = undefined; }
  if (t >= 47.3) E.gaze = [0, 0.05];
  k14Clip(ctx, [W[0] - 60, 300, W[2] + 160, W[1] + W[3] - 300 + 2], () => k14Act(ctx, E, t, 3, t >= 47.3 ? null : tg));
  // picture balloon over the passer-by
  const bp = K14B(t, 43.3, 0.4);
  k14Balloon(ctx, 600, 470, 250, 190, vh[0] + 10, vh[1] - 50, bp, (c) => {
    c.save(); c.scale(0.5, 0.5);
    shape(c, ell(0, 60, 150, 140, 40).filter(([, y]) => y <= 60).concat([[-150, 60]]), C.white, { lw: 8, seed: 530, dot: C.blue, pitch: 10, rad: 0.2, da: 0.4 });
    shape(c, K.rectPts(-190, 60, 380, 160), '#fff3d6', { lw: 8, seed: 531 });
    if (t >= 45.1) { person(c, { ...K14_GMY, pal: { ...K14_GMY.pal }, x: 0, y: 330, s: 1.0, mouth: 'smile', noBlink: true, handR: PERSON_HANDS.wave.R }); }
    if (t >= 45.86) { for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.6; const k = K14B(t, 45.86 + i * 0.08, 0.25); if (i === 2) star(c, Math.cos(a) * 210, 140 + Math.sin(a) * 210, 34 * k, C.yellow, t); else heart(c, Math.cos(a) * 210, 140 + Math.sin(a) * 200, 30 * k); } }
    c.restore();
  });
}
