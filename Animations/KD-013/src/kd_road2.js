// ===== KD-013 road scenes 2: S10 (83.9-95) thief 3 at the wall, S11 (95-101.7) the inspection, S12-S14 (101.7-127.6) on the wall,
// S15 (127.6-134) the untying, S16 (134-140.2) he leaves, S17 (140.2-148.1) the ambush, S18 (148.1-153.8) the laughing thieves =====
// the seller's face for thought clouds (head at 0, 0); o: brow, wink, mouth, hat ('star' sorcerer), hands ('rub' | 'spread')
function kdSellerFace(c, t, o = {}) {
  const P = { costume: 'villager', pal: { apron: C.white, head: 'cap', hc: C.red }, x: 0, y: 194, s: 1, dir: o.dir || 1, mouth: o.mouth || 'smile', brow: o.brow ?? -0.2, wink: o.wink, gaze: o.gaze || [0, 0.1], lid: o.lid || 0 };
  if (o.hands === 'rub') { P.handL = [-6 + 6 * Math.sin(t * 24), -112]; P.handR = [10 - 6 * Math.sin(t * 24), -116]; }
  if (o.hands === 'spread') { P.aL = [-2.2 + 0.15 * Math.sin(t * 20), -2.5]; P.aR = [2.2 - 0.15 * Math.sin(t * 20), 2.5]; }
  person(c, P);
  if (o.hat) { shape(c, [[-44, -26], [44, -26], [6, -150], [-2, -152]], C.blue, { lw: 5, seed: 101 }); star(c, -6, -70, 12, C.yellow, t); star(c, 10, -110, 9, C.yellow, -t); shape(c, ell(0, -26, 52, 10, 20), C.blue, { lw: 4, seed: 102 }); }
}
// ================= S10: thief 3 strides in at the wall =================
const KD_AX10 = (t) => kfn(t, [[83.96, 1850], [87.4, 2110]], 'out');
const KD_GX10 = (t) => KD_AX10(t - 0.3) - 215;   // v2: far enough back that the goat's head stays clear of his robe (goat drawn in front)
const KD_FALLS10 = footfalls(KD_AX10, 83.96, 87.5, 26);
const KD_TX10 = (t) => (t < 94.3 ? kfn(t, [[85.58, 2600], [87.44, 2250]], 'lin') : kfn(t, [[94.5, 2250], [95.0, 2420]], 'lin'));   // v2: thief 3 leaves RIGHT (toward the wall and tree), gone by 95.3
const KD_TFALLS10 = footfalls(KD_TX10, 85.58, 87.5, 30);
function kdAsc10(t) {
  const P = kdAscWalk(KD_AX10, t, { dir: 1, brow: -0.4, mouth: 'closed', handL: [-40, -112], tip: 0.05 }); const T = [KD_TX10(t), 700]; let tg = Math.floor(t * 1.4) % 2 ? kdGoatHead(kdGoat10(t)) : [P.x + 300, 700];
  if (t >= 85.58) { tg = T; P.tip = blend(t, 85.6, 86.2, 0.05, 0); }
  if (t >= 88.06 && t < 90.02) tg = T;
  if (t >= 90.02 && t < 91.14) { P.sq = settleTo(t, 90.1, 1, 0.97); tg = [T[0], 640]; }
  if (t >= 91.14) { P.sq = 0.97; tg = t < 91.9 ? kdGoatHead(kdGoat10(t)) : T; P.brow = -0.6; }
  if (t >= 93.5) { tg = gazePlan(t, [[93.5, T], [93.8, [P.x - 200, 440]]], 0.3); }
  if (t >= 94.6) tg = gazePlan(t, [[94.6, [P.x - 200, 440]], [94.8, [KD_TX10(t), 700]]], 0.2);
  return kdLife(P, t, 3, tg);
}
function kdThief10(t) {
  const P = kdThief(2, { ...walk(KD_TX10, t, { stride: 30 }), dir: -1, lid: 0.35, drop: -5, mouth: 'smile' }); const A = { costume: 'ascetic', x: KD_AX10(t), y: KD_GR, s: 1, dir: 1 }, ah = kdHead(A), gh = kdGoatHead(kdGoat10(t)); let tg = ah;
  if (t < 87.44) { P.aL = [0.5 * Math.sin(P.ph), 0.3 * Math.sin(P.ph)]; P.aR = [-0.5 * Math.sin(P.ph), -0.3 * Math.sin(P.ph)]; }
  if (t >= 86.42 && t < 87.0) { P.aL = null; P.handL = [-30, -205]; }
  if (t >= 87.44 && t < 88.06) P.sq = landSquash(t, 87.44, 0.06);
  if (t >= 88.06 && t < 90.02) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; tg = t < 89.2 ? [gh[0] - 60 + 60 * KB(t, 88.1, 1.0), gh[1] + 30] : ah; P.drop = -5 + 8 * pulse(t, 89.2, 0.7); }
  if (t >= 90.02 && t < 91.14) { P.handL = PERSON_HANDS.hipsHands.L; P.handRW = kdL2W(A, 31, -128); }
  if (t >= 91.14 && t < 92.0) { P.handR = [100, -110]; P.handL = PERSON_HANDS.hipsHands.L; tg = gh; P.talk = talk(t, [[91.14, 91.9]]) * 0.6; }
  if (t >= 92.0 && t < 93.5) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.lid = t < 92.6 ? 1 : 0.35; P.drop = -5 + 7 * pulse(t, 92.7, 0.6); }
  if (t >= 93.5 && t < 94.26) { P.tip = 0.1; P.handR = PERSON_HANDS.cupMouth.R; P.handL = [60, -160]; P.talk = talk(t, [[93.5, 94.2]]) * 0.5; }
  if (t >= 94.26 && t < 94.5) { P.handRW = kdL2W(A, 31, -128 + 8 * Math.abs(Math.sin((t - 94.26) * 18))); }
  if (t >= 94.5) { P.dir = 1; const sw = Math.sin(P.ph); P.aL = [0.5 * sw, 0.3 * sw]; P.aR = [-0.5 * sw, -0.3 * sw]; tg = [P.x + 300, 690]; P.mouth = 'smile'; }
  if (t >= 88.06 && t < 94.26 && !P.talk) P.talk = talk(t, [[90.2, 91.1], [92.0, 93.4]]) * 0.5;
  kdLife(P, t, 33, tg); return P;
}
function kdGoat10(t) { const G = kdGoatAt(KD_GX10, t); G.gaze = [1, -0.1]; if (t >= 91.14 && t < 91.9) G.gaze = [0.8, -0.6]; if (t >= 91.9 && t < 92.6) { G.gaze = [0, 0.1]; G.dir = 1; } return G; }
const KS10 = {
  a: 83.9, ww: KD_RW,
  cam: [[83.9, { x: 2140, y: 670, zoom: 1.6 }], [87.4, { x: 2140, y: 670, zoom: 1.6 }], [88.2, { x: 2075, y: 730, zoom: 1.95 }], [90.0, { x: 2075, y: 730, zoom: 1.95 }], [90.6, { x: 2078, y: 735, zoom: 2.0 }], [95.1, { x: 2078, y: 735, zoom: 2.0 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 2050);
    const A = kdAsc10(t), G = kdGoat10(t), T = kdThief10(t);
    kdDrawRoadTrio(ctx, t, A, G, null, 140, 0, true);
    const T2 = { ...T, y: KD_GR + (t > 94.3 ? 10 : 0) }; halftoneShadow(ctx, T2.x, KD_GR + 6, 62, 0.3); person(ctx, T2); kdTallTurban(ctx, T2);
    for (const f of KD_FALLS10) if (Math.abs(t - f.t) < 0.6) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 3, 5, 9, 18, 0.45, Math.round(f.t * 10));
    for (const f of KD_TFALLS10) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 3, 6, 12, 24, 0.45, Math.round(f.t * 10) + 1);
  },
  over(ctx, t, cam, S) {
    const T = kdThief10(t), [hx, hy] = kdP(...kdHead(T), cam);
    if (t >= 86.42 && t < 88.0) { ctx.save(); ctx.globalAlpha = kdFade(t, 86.42, 88.0, 0.2); S.label(ctx, 'THIEF 3', hx + 60, hy - 260, KB(t, 86.45, 0.3), { align: 'center', size: 50, fill: C.yellow }); S.arrow(ctx, [hx + 50, hy - 220], [hx + 10, hy - 140], KB(t, 86.55, 0.3, 'out'), { width: 16 }); ctx.restore(); }
    if (t >= 91.46 && t < 93.4) { ctx.save(); ctx.globalAlpha = kdFade(t, 91.46, 93.4, 0.2); const bx = hx + 150, by = hy - 230; bubble(ctx, bx, by, 240, 190, hx + 40, hy - 80, KB(t, 91.48, 0.3), ''); if (t > 91.55) kdDogIcon(ctx, bx - 14, by + 4, 60, { q: false }); ctx.restore(); }
    kdDogCounter(ctx, t, S);
    if (t >= 93.72) { const [ax, ay] = kdP(...kdHead(kdAsc10(t)), cam); thoughtCloud(ctx, ax - 170, ay - 250, 230, 190, t, { p: KB(t, 93.72, 0.4), tail: [ax - 20, ay - 60], inside: (c) => { c.scale(0.8, 0.8); kdSellerFace(c, t); sfx(c, '?', 80, -40, 60, 1, { fill: C.red }); }, at: [0, 0], scale: 1 }); }
  },
};
// ================= S11: the close look =================
const KD_GOAT11 = 1925;   // v2: goat head at his hands, in front of his robe
function kdAsc11(t) {
  const P = { costume: 'ascetic', s: 1, dir: -1, x: 2110, y: KD_GR, brow: -0.5, mouth: 'closed', handL: [-34, -100] }; const gh = [KD_GOAT11 + 68, 785]; let tg = gh;
  if (t >= 95.34 && t < 99.02) { P.tip = settleTo(t, 95.34, 0, 0.2, 0.5); P.lid = 0.5; P.handR = [44, -86]; P.handL = [-6, -84]; }
  // 96.68 two fingers lift one ear and let it drop; 97.44 tap on a horn (TOK); 97.84 the goat answers MEH? to his face
  if (t >= 96.4 && t < 97.3) { P.handR = null; P.handRW = [KD_GOAT11 + 52, 790 - 26 * KB(t, 96.68, 0.25) * (t < 97.15 ? 1 : 0)]; }
  if (t >= 97.3 && t < 97.84) { P.handR = null; P.handRW = [KD_GOAT11 + 46, 742 - 12 * Math.abs(Math.sin((t - 97.44) * Math.PI / 0.18)) * (t > 97.44 && t < 97.8 ? 1 : 0)]; tg = [KD_GOAT11 + 50, 745]; }
  if (t >= 97.84 && t < 98.9) { P.handR = null; P.handRW = [KD_GOAT11 + 70, 760]; P.eyes = 'wide'; P.tip = 0.12; tg = gh; }
  if (t >= 99.02) { P.tip = blend(t, 99.02, 99.5, 0.2, 0); P.handR = null; P.handRW = null; P.lid = 0.15; tg = [1600, 760]; P.handL = [-34, -96]; }
  if (t >= 99.56) { P.handR = PERSON_HANDS.chest.R; P.sq = 1 + 0.02 * Math.sin(t * 14); }
  if (t >= 100.18) { P.brow = -0.9; P.x += tremble(t, 1.2, 11); P.mouth = 'frown'; }
  if (t >= 100.98) { const k = Math.floor((t - 100.98) / 0.24) % 3; tg = [gh, [1500, 700], gh][k]; }
  return kdLife(P, t, 3, tg);
}
function kdGoat11(t) {
  const G = { s: 0.85, y: KD_GR, dir: 1, x: KD_GOAT11, fat: 1, chew: t, t, gaze: lookAt([KD_GOAT11 + 68, 785], kdHead(kdAsc11(t))) };
  if (t >= 96.68 && t < 97.15) G.earLift = KB(t, 96.68, 0.25); if (t >= 97.15) G.earLift = swing(t, 97.15, 1.0, 2.2, 3);
  if (t >= 97.44 && t < 97.84) { G.headTilt = 0.08 * Math.abs(Math.sin((t - 97.44) * Math.PI / 0.18)); G.lid = 0.6; }
  if (t >= 97.84 && t < 98.5) { G.talk = 0.6 * pulse(t, 97.86, 0.6); G.headTilt = -0.15; G.chew = null; }
  if (t >= 100.98) G.headTilt = 0.22 * KB(t, 101.0, 0.3);
  return G;
}
const KS11 = {
  a: 95.0, ww: KD_RW,
  cam: [[95.0, { x: 2040, y: 770, zoom: 2.0 }], [101.7, { x: 2060, y: 770, zoom: 2.0 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 2050);
    const A = kdAsc11(t), G = kdGoat11(t); kdDrawRoadTrio(ctx, t, A, G, null, 120, 0, true); if (t >= 96.4 && t < 98.9) kdHandsOver(ctx, A, [1]);
    if (t >= 97.44 && t < 97.84) { const h = kdHand(A, 1); ctx.save(); ctx.globalAlpha = kdFade(t, 97.44, 97.84, 0.08); sfx(ctx, 'TOK', h[0] - 40, h[1] - 40, 22, KB(t, 97.46, 0.12), { fill: C.white, rot: -0.2 }); ctx.restore(); }
    const h = kdHead(A); kdSweat(ctx, h[0] - 36, h[1] - 18, t, 100.25); kdSweat(ctx, h[0] + 36, h[1] - 10, t, 100.5);
  },
  over(ctx, t, cam, S) {
    if (t >= 97.86 && t < 98.9) { const [gx, gy] = kdP(KD_GOAT11 + 80, 760, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 97.86, 98.9, 0.15); sfx(ctx, 'MEH?', gx - 50, gy - 120, 44, KB(t, 97.88, 0.25), { fill: C.white, rot: -0.1 }); ctx.restore(); }
    if (t >= 100.98) { const [hx, hy] = kdP(...kdHead(kdAsc11(t)), cam); [[-150, -120, 101.0], [0, -190, 101.2], [150, -120, 101.4]].forEach(([dx, dy, t0]) => kdQ(ctx, hx + dx, hy + dy, KB(t, t0, 0.25), 84, dx * 0.001)); }
  },
};
// ================= S12-S14: on the wall: the scale, the doubt, the decision =================
const KD_AX12 = (t) => kfn(t, [[101.74, 2110], [102.5, 2140]], 'out');
const kdSit12 = (t) => (t < 120.74 ? KB(t, 102.4, 0.7, 'inOut') : 1 - KB(t, 121.6, 0.8, 'inOut'));
const KD_GOAT15 = 2360;   // v2: the goat's place right of the wall (S12-S17), head clear of him
const KD_GX12 = (t) => kfn(t, [[101.9, 1960], [103.3, 2330], [123.78, 2330], [124.1, KD_GOAT15]], 'inOut');
function kdAsc12(t) {
  const sit = kdSit12(t), P = { costume: 'ascetic', s: 1, dir: 1, x: KD_AX12(t), y: K.lerp(KD_GR, KD_SEATY, sit), sit, seat: 'bench', brow: -0.6, mouth: 'closed', handL: [-30, -80], handR: [36, -76] };
  const cl = [2240, 330]; let tg = [2240, 840];
  if (t >= 102.4 && t < 103.6) { P.sq = 1 - 0.05 * pulse(t, 102.9, 0.6); P.drop = 4; }
  if (t >= 103.68 && t < 112.9) { tg = cl; P.drop = 0; }
  if (t >= 104.8 && t < 105.78) P.handR = [20, -195];
  if (t >= 105.78 && t < 107.86) { P.mouth = 'smile'; P.handR = [60, -170]; P.brow = -0.3; P.drop = 3 * pulse(t, 106.8, 0.5); }
  if (t >= 107.86 && t < 108.56) { P.handR = [K.lerp(60, 40, KB(t, 107.9, 0.6)), K.lerp(-170, -90, KB(t, 107.9, 0.6))]; P.brow = -0.6; }
  if (t >= 108.56 && t < 111.04) { P.sq = 1 - 0.02 * [108.6, 109.1, 109.6].reduce((s, x) => s + pulse(t, x, 0.2), 0); if (t >= 110.08) { const k = Math.min(2, Math.floor((t - 110.08) / 0.3)); tg = [2240 + (k - 1) * 120, 300]; } }
  if (t >= 111.04 && t < 112.9) { P.drop = blend(t, 111.5, 112.2, 0, 8); P.tip = blend(t, 111.5, 112.2, 0, 0.08); P.mouth = 'frown'; }
  // S13
  if (t >= 112.9) { tg = cl; P.drop = 4; P.tip = 0.05; }
  if (t >= 113.94 && t < 115.18) { P.brow = 0.5; P.mouth = 'frown'; P.aR = [2.0, 2.4]; }
  if (t >= 115.18 && t < 115.86) { P.brow = -0.8; P.handR = [20 + 8 * Math.sin(t * 20) * (t < 115.5 ? 1 : 0), -192]; tg = [2140, 900]; P.aR = null; }
  if (t >= 115.86 && t < 117.84) { P.handL = [-14, -196 + 4 * Math.sin(t * 26)]; P.handR = [14, -196 - 4 * Math.sin(t * 26)]; P.lid = 1; P.drop = 8; }
  if (t >= 117.84) { P.eyes = 'wide'; P.wet = true; P.drop = 0; tg = [2245, 800]; P.mouth = 'o'; }
  if (t >= 118.7 && t < 119.8) { const turns = [[118.7, -1, 1], [118.95, 1, 0.75], [119.25, -1, 0.5], [119.5, 1, 0.3]]; let lk = 0; for (const [t0, d, a] of turns) if (t >= t0) lk = d * a; P.look = lk; tg = [2245 + lk * 160, 560]; }
  if (t >= 119.8) { P.eyes = 'open'; P.look = 0; P.drop = blend(t, 119.8, 120.5, 0, 14); P.lid = t > 120.2 && t < 120.6 ? 1 : 0.6; P.tip = 0.1; tg = [2200, 900]; P.mouth = 'frown'; }
  // S14
  if (t >= 120.74) { P.eyes = 'open'; P.wet = false; P.drop = blend(t, 120.74, 121.1, 14, 0); P.lid = 0; P.tip = 0; P.mouth = 'closed'; P.brow = 0.4; tg = [2600, 640];
    P.handL = t < 121.4 ? [-30, -80 + 20 * pulse(t, 121.0, 0.3)] : [-34, -96]; P.handR = t < 121.4 ? [36, -76 + 20 * pulse(t, 121.0, 0.3)] : [40, -98]; P.sq = anticipate(t, 121.3, 0.3, 0.06) * (t > 121.6 && t < 122.6 ? settleTo(t, 121.6, 1, 1.05, 0.6) : 1); }
  if (t >= 122.8 && t < 123.7) { P.drop = 7 * pulse(t, 122.85, 0.35) + 10 * pulse(t, 123.25, 0.4); }
  if (t >= 123.78 && t < 124.86) { P.handL = [14, -132]; P.handR = [t < 123.95 ? 60 : 18, t < 123.95 ? -160 : -138]; P.brow = 0.8; }
  if (t >= 124.86) { tg = [2420, 380]; P.brow = 0.6; }
  if (t >= 125.64 && t < 126.46) { P.tip = -0.06 * KB(t, 125.7, 0.4); P.eyes = 'wide'; }
  if (t >= 126.46 && t < 127.06) { P.drop = -6 * (1 - KB(t, 126.5, 0.4)); P.tip = -0.06; P.eyes = 'wide'; P.mouth = 'o'; }
  if (t >= 127.06) { P.tip = 0; P.brow = 1; P.mouth = 'frown'; P.eyes = t < 127.6 ? 'wide' : 'open'; }
  return kdLife(P, t, 3, tg);
}
const kdSlowBlink = (t, ts) => ts.reduce((m, x) => Math.max(m, pulse(t, x, 0.55)), 0);
function kdGoat12(t) {
  const G = kdGoatAt(KD_GX12, t); const tf = turnFlip(t, [[0, 1], [103.3, -1]], 0.6); G.dir = tf.dir; G.y += 6 * tf.sink; G.gaze = [-1, -0.1];
  if (t >= 104) G.lid = kdSlowBlink(t, [106.4, 108.0, 110.6, 113.6, 115.4, 121.8, 125.2]);
  if (t >= 111.52 && t < 112.9) { G.gaze = t < 112.2 ? [-0.3, -1] : [0, 0.1]; G.headTilt = t < 112.2 ? -0.2 : 0; }
  if (t >= 116.42 && t < 117.75) { const u = (t - 116.42) / 1.33; G.asDog = Math.min(1, 0.75 + 0.25 * Math.abs(Math.sin(u * Math.PI * 3))) * K.clamp((t - 116.42) / 0.15); G.x += 6 * Math.sin(t * 30); G.chew = null; G.talk = 0.4 * Math.abs(Math.sin(t * 7)); G.gaze = [-0.4, -0.5]; }
  if (t >= 119.8 && t < 120.74) { G.x = KD_GX12(t) - 22 * pulse(t, 119.9, 0.7); G.headDown = 0.45 * pulse(t, 119.9, 0.7); }
  if (t >= 123.78 && t < 124.4) { G.sq = 1.06 - 0.06 * KB(t, 123.8, 0.4); G.earLift = 1; G.lid = 0; }
  if (t >= 127.06 && t < 127.6) { G.talk = 0.9; G.headTilt = -0.2; }
  if (t >= 112.9 && t < 116.4) G.gaze = [-0.8, -0.4];
  if (t >= 117.75 && t < 118.7) { G.gaze = [0, 0.1]; G.lid = kdSlowBlink(t, [118.0]); }
  return G;
}
const kdWash = (t) => (t < 116.3 || t > 117.95 ? 0 : Math.min(K.clamp((t - 116.3) / 0.15), K.clamp((117.95 - t) / 0.15)));
const KS12 = {
  a: 101.7, ww: KD_RW,
  cam: [[101.7, { x: 2180, y: 680, zoom: 1.7 }], [103.0, { x: 2190, y: 600, zoom: 1.6 }], [115.2, { x: 2190, y: 600, zoom: 1.6 }], [115.9, { x: 2190, y: 760, zoom: 1.9 }], [120.74, { x: 2190, y: 760, zoom: 1.9 }], [120.75, { x: 2230, y: 700, zoom: 1.6 }], [126.3, { x: 2230, y: 700, zoom: 1.6 }], [126.6, { x: 2235, y: 690, zoom: 2.0 }], [127.6, { x: 2235, y: 690, zoom: 2.0 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 2050);
    const A = kdAsc12(t), G = kdGoat12(t); person(ctx, A); kdGoatShadow(ctx, G); kdGoat(ctx, G);   // v2: goat in front of him
    const nk = kdGoatNeck(G); kdLoop(ctx, nk, 0.85); kdRope(ctx, kdHand(A, 1), nk, 170);
    if (t >= 127.06 && t < 127.6) kdSpiralEyes(ctx, A, t, K.ease.back(KB(t, 127.06, 0.15)));
    if (t >= 123.78 && t < 124.2) sfx(ctx, 'SMACK', kdHand(A, 1)[0] + 40, kdHand(A, 1)[1] - 40, 26, KB(t, 123.95, 0.15), { fill: C.white });
  },
  over(ctx, t, cam, S) {
    const A = kdAsc12(t), [hx, hy] = kdP(...kdHead(A), cam);
    // S12 big cloud with the balance scale (inflates 103.68)
    if (t >= 103.68 && t < 115.8) {
      const pop = t > 115.5 ? 1 - KB(t, 115.5, 0.3) : 1;
      ctx.save(); ctx.globalAlpha = pop;
      thoughtCloud(ctx, 520, 330, 760, 460, t, { p: KB(t, 103.68, 0.9), tail: [hx + 10, hy - 70], at: [0, 0], scale: 1, inside: (c) => {
        if (t < 112.9) kdScaleThought(c, t);
        else { const ir = 260 * KB(t, 112.9, 0.35); c.save(); c.beginPath(); c.arc(0, 0, ir, 0, 7); c.clip(); c.fillStyle = C.yellow; c.fillRect(-400, -300, 800, 600); c.scale(1.5, 1.5); c.translate(0, 40);
          kdSellerFace(c, t, { brow: 0.6, wink: 'L', mouth: 'smile', hands: 'rub', gaze: [0.8, 0.2] }); sfx(c, 'HEH HEH', 110, -70, 36, KB(t, 113.3, 0.3), { fill: C.white, rot: 0.1 }); c.restore(); } } });
      ctx.restore();
    }
    if (t >= 111.52 && t < 112.95) { ctx.save(); ctx.globalAlpha = kdFade(t, 111.52, 112.95, 0.15); S.label(ctx, '1 vs 3', 520, 640, KB(t, 111.6, 0.3), { align: 'center', size: 60, fill: C.yellow }); ctx.restore(); }
    // S13: the dream wash (his view) + the GOAT / DOG signs
    if (kdWash(t) > 0) kdDreamWash(ctx, kdWash(t));
    if (t >= 118.7 && t < 120.3) { const G = kdGoat12(t), [gx, gy] = kdP(...kdGoatHead(G), cam), f = Math.min(K.clamp((t - 118.7) / 0.2), K.clamp((120.3 - t) / 0.4));
      ctx.save(); ctx.globalAlpha = f; S.label(ctx, 'GOAT', gx - 170, gy - 230, KB(t, 118.75, 0.25), { align: 'center', size: 50, fill: C.yellow }); S.label(ctx, 'DOG', gx + 110, gy - 230, KB(t, 119.0, 0.25), { align: 'center', size: 50, fill: C.blue, color: C.white }); ctx.restore(); }
    // S14: the sorcerer seller, the sparkles, ZAP!
    if (t >= 124.86 && t < 127.6) { const pop = t > 127.3 ? 1 - KB(t, 127.3, 0.3) : 1; ctx.save(); ctx.globalAlpha = pop;
      thoughtCloud(ctx, 690, 300, 480, 330, t, { p: KB(t, 124.86, 0.5), tail: [hx + 30, hy - 80], at: [0, 0], scale: 1, inside: (c) => { c.scale(1.15, 1.15); c.translate(0, 40); kdSellerFace(c, t, { hat: true, hands: t > 125.64 ? 'spread' : null, mouth: 'smile', brow: 0.5, gaze: [-0.8, 0.3] }); } });
      ctx.restore();
      if (t >= 125.64 && t < 126.7) for (let i = 0; i < 9; i++) { const u = K.clamp((t - 125.64 - i * 0.07) / 0.75); if (u <= 0 || u >= 1) continue; const sx = K.lerp(620, hx, u) + 30 * Math.sin(i * 2.1 + u * 6), sy = K.lerp(380, hy - 4, u) + 24 * Math.cos(i * 1.7 + u * 5); star(ctx, sx, sy, 12 + 6 * Math.sin(i), C.yellow, t * 4 + i); } }
    if (t >= 126.46 && t < 127.5) { ctx.save(); ctx.globalAlpha = kdFade(t, 126.46, 127.5, 0.15); S.emphasis(ctx, hx, hy, 130, KB(t, 126.46, 0.4), { word: 'ZAP!', wx: -1.2, wy: 0.9 }); ctx.restore(); }
  },
};
// the balance scale inside the S12 cloud (coordinates centred on the cloud)
function kdScaleThought(c, t) {
  if (t < 104.8) return; const appear = K.ease.back(KB(t, 104.8, 0.4));
  const drops = [108.6, 109.1, 109.6], nIn = drops.filter((x) => t >= x + 0.25).length;
  let ang = 0; if (t >= 105.78) ang = -0.14 * KB(t, 105.9, 0.3);
  drops.forEach((d, i) => { if (t >= d + 0.25) ang = K.lerp(ang, [-0.02, 0.1, 0.22][i], KB(t, d + 0.25, 0.3)); });
  if (t >= 111.04) ang = settleTo(t, 111.3, 0.22, 0.5, 0.45, 0.2);
  c.save(); c.scale(appear * 1.35, appear * 1.35); c.translate(0, -20);
  kdScale(c, 0, 170, 1, ang, (k) => {
    if (false) { const s = 1; k.save(); k.translate(-30, -30 - (t >= 105.78 ? 0 : 0)); k.scale(s * 0.5, s * 0.5); shape(k, ell(0, 0, 36, 37, 30), C.white, { dot: C.skin, pitch: 6, rad: 0.3, lw: 6, seed: 120 }); personBeard(k, 0, 0, { beard: 'long', beardCol: C.white, tache: true }); for (const ex of [-13, 13]) eye2(k, ex, -4, 'wide', 1, 0); k.restore(); }
    if (t >= 105.78) { const u = K.clamp((t - 105.78) / 0.25), y = -160 * (1 - u * u); if (t > 106.74) { k.save(); k.globalAlpha = KB(t, 106.74, 0.4); shape(k, [[-10, -70], [60, -70], [70, -50], [-20, -50]], C.red, { lw: 3.5, seed: 121 }); seg(k, -4, -50, -4, -8, 4, WOOD, 2); seg(k, 56, -50, 56, -8, 4, WOOD, 2); k.restore(); } kdGoatIcon(k, 34, y - 22, 34); }
  }, (k) => {
    drops.forEach((d, i) => { if (t < d) return; const u = K.clamp((t - d) / 0.25), y = -180 * (1 - u * u), x = (i - 1) * 40; kdThiefHead(k, x, y - 32 - (i === 1 ? 18 : 0), 28, i === 0 ? 0 : i === 1 ? 1 : 2, { talk: t >= 110.08 + i * 0.3 && t < 110.4 + i * 0.3 });
      if (t >= 110.08 + i * 0.3 && t < 111.04) sfx(k, '!', x + 20, y - 84, 36, 1, { fill: C.white });
      if (t >= 111.04 + i * 0.12) kdDogIcon(k, x, y - 112 - (i === 1 ? 18 : 0), 23 * K.ease.back(KB(t, 111.04 + i * 0.12, 0.25))); });
  });
  c.restore();
}
// ================= S15: he unties the rope =================
// v2: profile staging with air between them: he stands at the wall facing right, the goat faces him with its head clear, drawn in front;
// his hands are redrawn over the goat so the knot work reads. 128.78 (real onset of فك) hands at the knot; 129.22 knot opens; 129.96 loop up and
// over the horns; 130.5 the goat looks up (wet, slow blink, MEH?) and he looks AWAY; 131.3 wrist flick (the leader's mime) and the rope falls.
const KD_A15 = 2205, KD_ROPEG = [2200, 2320];
// 130.0-130.55 he steps back half a pace with the loop held up, which leaves clear air between his hand and the goat's face
const KD_AX15 = (u) => (u < 132.0 ? kfn(u, [[130.0, KD_A15], [130.55, 2160]], 'inOut') : kfn(u, [[132.0, 2160], [134.0, 2040]], 'in'));
const KD_AX15w = KD_AX15;
function kdAsc15(t) {
  const P = { costume: 'ascetic', s: 1, dir: t < 131.75 ? 1 : -1, ...walk(KD_AX15, t), y: KD_GR, kneel: 0, brow: 0.6, mouth: 'frown', tip: t < 131.6 ? 0.2 * KB(t, 127.7, 0.4) : 0 };
  const G = kdGoat15(t), nk = kdGoatNeck(G); let tg = nk;
  if (t >= 132.0) { Object.assign(P, walk(KD_AX15w, t)); P.dir = -1; }
  // hands work the knot UNDER the chin so the goat's face stays clear
  if (t < 128.78) { P.handLW = [nk[0] - 20, nk[1] + 24]; P.handRW = [nk[0] + 2, nk[1] + 18]; }
  else if (t < 129.22) { const w = 5 * Math.sin(t * 38); P.handLW = [nk[0] - 20 + w, nk[1] + 24]; P.handRW = [nk[0] + 2 - w, nk[1] + 18 + w]; }
  else if (t < 129.96) { const u = KB(t, 129.22, 0.4); P.handLW = [nk[0] - 20 - 10 * u, nk[1] + 26]; P.handRW = [nk[0] + 2 + 4 * u, nk[1] + 18 + 6 * u]; }
  else if (t < 130.5) { const u = KB(t, 129.96, 0.45, 'inOut'); const lp = kdLoop15(t, nk); P.handLW = [lp[0] - 14, lp[1] - 6]; P.handRW = [lp[0] + 8, lp[1] - 10]; tg = lp; P.tip = 0.2 - 0.12 * u; }
  else if (t < 131.3) { P.tip = 0.04; P.handR = [50, -196]; P.handL = [-30, -100]; tg = [P.x - 300, 640]; P.mouth = 'closed'; P.brow = 0.8; P.lid = 0.35; }
  else if (t < 131.75) { P.tip = 0.04; P.handR = [50 + 10 * KB(t, 131.3, 0.15), -196 + 22 * KB(t, 131.3, 0.15)]; P.handL = [-30, -100]; tg = [nk[0] - 40, KD_GR]; P.mouth = 'closed'; }
  if (t >= 131.75) { P.handR = null; P.handL = null; P.aL = [0.2, 0.0]; P.aR = [-0.2, 0.0]; tg = [1600, 700]; }
  if (t >= 131.75 && t < 132.0) P.sq = anticipate(t, 131.75, 0.25, 0.05);
  return kdLife(P, t, 3, tg);
}
// the loop's centre while it is lifted over the horns (129.96-130.5), then hanging from his raised hand
function kdLoop15(t, nk) { const u = KB(t, 129.96, 0.5, 'inOut'), arc = Math.sin(Math.PI * u); return [nk[0] - 95 * u, nk[1] - 60 * arc - 50 * u]; }
function kdGoat15(t) {
  const xw = (u) => (u < 132.36 ? KD_GOAT15 : kfn(u, [[132.36, KD_GOAT15], [132.8, KD_GOAT15 - 24]]));
  const G = { s: 0.85, y: KD_GR, dir: -1, x: xw(t), fat: 1, chew: t < 128.6 || t > 133.0 ? t : null, t, gaze: [-0.8, -0.3] };
  if (t >= 132.36) Object.assign(G, walk(xw, t, { stride: 16 }));
  G.lid = kdSlowBlink(t, [128.0]);
  if (t >= 128.78 && t < 129.96) { G.gaze = [-0.9, -0.5]; G.headTilt = 0.05 * Math.sin(t * 20) * (t < 129.22 ? 1 : 0); }
  if (t >= 129.96 && t < 130.5) { G.headDown = 0.25 * pulse(t, 129.96, 0.5); G.lid = 0.7; G.earLift = t > 130.25 ? swing(t, 130.25, 1, 2.4, 3) : -0.4; }
  if (t >= 130.5 && t < 132.3) { G.wet = true; G.headTilt = -0.25 * KB(t, 130.5, 0.3); G.gaze = [-0.7, -0.75]; G.talk = 0.5 * pulse(t, 130.6, 0.45); G.lid = Math.max(0.15, kdSlowBlink(t, [130.95])); }
  if (t >= 132.3) { G.headDown = KB(t, 132.9, 0.5); G.earLift = t < 133.0 ? -0.8 : 0.3; G.gaze = [-0.6, 0.6]; }
  return G;
}
// the dropped rope: falls from his hand (131.3) with gravity, small rebound, then lies on the ground in front of the goat
function kdRopeFall(ctx, t, h) {
  const tf = 131.42, u = K.clamp((t - tf) / 0.32);
  if (t < tf) { kdLoop(ctx, [h[0], h[1] + 22], 0.85, 1.5); kdRope(ctx, [h[0], h[1] + 34], [h[0] + 10, KD_GR - 10], 140); return; }
  if (u < 1) { const y = fallY(t, tf, tf + 0.32, h[1] + 22, KD_GR - 22), x = K.lerp(h[0], (KD_ROPEG[0] + KD_ROPEG[1]) / 2, u); kdLoop(ctx, [x, y], 0.85, 1.5 - 0.3 * u); kdRope(ctx, [x, y + 12], [x + 40 * u, KD_GR - 6], 90); return; }
  kdRopeGround(ctx, KD_ROPEG[0], KD_ROPEG[1], KD_GR - 4 - rebound(t, tf + 0.32, 6, 0.18));
}
const KS15 = {
  a: 127.6, ww: KD_RW,
  cam: [[127.6, { x: 2262, y: 770, zoom: 2.6 }], [130.9, { x: 2262, y: 770, zoom: 2.6 }], [131.5, { x: 2262, y: 770, zoom: 2.5 }], [133.3, { x: 2215, y: 640, zoom: 1.4 }], [134.1, { x: 2215, y: 640, zoom: 1.4 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 2050); shape(ctx, [[2180, 902], [2186, 880], [2194, 900], [2200, 876], [2208, 902]], '#3f9d4a', { lw: 3, seed: 130 });
    const A = kdAsc15(t), G = kdGoat15(t); halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A); kdGoatShadow(ctx, G); kdGoat(ctx, G); const nk = kdGoatNeck(G);
    if (t < 129.96) { kdLoop(ctx, nk, 0.85, t < 129.22 ? 1 : 1 + 0.5 * KB(t, 129.22, 0.4)); kdRope(ctx, [nk[0] - 4, nk[1] + 14], [KD_ROPEG[0], KD_GR - 6], 150); }
    else if (t < 130.5) { const lp = kdLoop15(t, nk); kdLoop(ctx, lp, 0.85, 1.5); kdRope(ctx, [lp[0], lp[1] + 18], [KD_ROPEG[0], KD_GR - 6], 150); }
    else kdRopeFall(ctx, t, kdHand(A, 1));
    if (t < 131.75) kdHandsOver(ctx, A, t < 130.5 ? [0, 1] : [1]);
    if (t >= 132.0) for (const f of footfalls(KD_AX15w, 132.0, 134.0, 26)) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 3, 5, 10, 20, 0.45, 15);
  },
  over(ctx, t, cam, S) {
    if (t >= 130.6 && t < 131.6) { const G = kdGoat15(t), [gx, gy] = kdP(...kdGoatHead(G), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 130.6, 131.6, 0.12); sfx(ctx, 'MEH?', gx - 115, gy - 30, 34, KB(t, 130.62, 0.25), { fill: C.white, rot: 0.1 }); ctx.restore(); }
    if (t >= 133.34 && t < 134.6) { const [gx, gy] = kdP(KD_GOAT15 - 24, 760, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 133.34, 134.6, 0.2); S.label(ctx, 'LEFT BEHIND', gx + 20, gy - 230, KB(t, 133.4, 0.3), { align: 'center', size: 50, fill: C.yellow }); S.arrow(ctx, [gx + 20, gy - 190], [gx, gy - 70], KB(t, 133.5, 0.3, 'out'), { width: 16 }); ctx.restore(); }
  },
};
// ================= S16: he stomps off; the calm before the ambush (static wide) =================
const KD_AX16 = (t) => kfn(t, [[134.98, 2060], [139.0, 1955], [139.95, 1870]], 'lin');
const kdS16 = (t) => blend(t, 134.98, 139.95, 1, 0.55, 'lin');
function kdAsc16(t) {
  const sc = kdS16(t), P = { costume: 'ascetic', ...walk((u) => KD_AX16(u) / kdS16(u), t), dir: -1, s: sc, y: K.lerp(KD_GR, 858, (1 - sc) / 0.45), brow: 1, mouth: 'frown' }; P.x = KD_AX16(t);
  let tg = [1500, 680];
  if (t < 134.98) { P.aL = [0.3, 0.1]; P.aR = [-0.3, -0.1]; P.sq = settleTo(t, 134.1, 1, 1.03); }
  else { P.tip = 0.1; const sw = Math.sin(P.ph); P.aL = [0.5 * sw, 0.9 * sw + 0.4]; P.aR = [-0.5 * sw, -0.9 * sw + 0.4]; }
  if (t >= 136.94 && t < 137.8) { P.handR = [36, -200]; P.aR = null; tg = [1300, 700]; }
  if (t >= 137.86 && t < 139.0) { P.aR = [2.5, 2.8 + 0.3 * Math.sin(t * 22)]; }
  return kdLife(P, t, 3, tg);
}
function kdGoat16(t) { const G = { s: 0.85, y: KD_GR, dir: -1, x: KD_GOAT15 - 24, fat: 1, chew: t, t, headDown: t < 139.12 ? 1 : 1 - KB(t, 139.12, 0.4), gaze: [-1, 0.4] }; if (t >= 139.12) { G.gaze = t < 139.6 ? [-1, -0.1] : [0.35, 0.1]; G.headTilt = 0.15; } if (t >= 139.6 && t < 140.1) G.talk = 0.6 * pulse(t, 139.6, 0.5); return G; }
const KS16 = {
  a: 134.0, ww: KD_RW,
  cam: [[134.0, { x: 2215, y: 640, zoom: 1.4 }], [140.3, { x: 2215, y: 640, zoom: 1.4 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 2050); shape(ctx, [[2180, 902], [2186, 880], [2194, 900], [2200, 876], [2208, 902]], '#3f9d4a', { lw: 3, seed: 130 });
    kdRopeGround(ctx, KD_ROPEG[0], KD_ROPEG[1], KD_GR - 4);
    const G = kdGoat16(t); kdGoatShadow(ctx, G); kdGoat(ctx, G);
    if (t < 140.0) { const A = kdAsc16(t); halftoneShadow(ctx, A.x, A.y + 4, 60 * A.s, 0.3); person(ctx, A); kdFlush(ctx, A, blend(t, 136.12, 136.9, 0, 0.8)); const h = kdHead(A); if (t >= 136.12) steam(ctx, h[0], h[1] - 60 * A.s, t);
      if (t >= 134.98) for (const f of footfalls(KD_AX16, 134.98, 140, 26 * 0.8)) if (Math.abs(t - f.t) < 0.6) dustBurst(ctx, f.x, A.y - 2, t - f.t, 4, 5, 11, 22, 0.45, Math.round(f.t * 10)); }
    if (t >= 139.3) { const u = K.clamp((t - 139.3) / 1.4); if (u < 1) shape(ctx, ell(2600 - 50 * u + 20 * Math.sin(u * 8), 480 + u * 400, 12, 6, 10), '#3f9d4a', { lw: 3, seed: 131 }); }
  },
  over(ctx, t, cam, S) {
    if (t >= 137.86 && t < 139.2) { const A = kdAsc16(t), [hx, hy] = kdP(...kdHead(A), cam); thoughtCloud(ctx, hx - 120, hy - 130, 150, 120, t, { p: KB(t, 137.86, 0.3), tail: [hx - 20, hy - 40], at: [0, 0], scale: 1, inside: (c) => { c.scale(0.5, 0.5); kdSellerFace(c, t); } }); }
    if (t >= 139.4 && t < 140.25) { const [gx, gy] = kdP(...kdGoatHead(kdGoat16(t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 139.4, 140.25, 0.12); sfx(ctx, 'MEH?', gx + 10, gy - 110, 44, KB(t, 139.42, 0.25), { fill: C.white, rot: 0.08 }); ctx.restore(); }
  },
};
// ================= S17 + S18: the ambush; they walk off laughing =================
// approach targets: leader right of the goat, thief 2 behind-left, thief 3 over the wall to the left; then a line walking right
const KD_LINE = (t) => kfn(t, [[147.4, 0], [147.9, 18], [154.4, 520]], 'lin');
// v2: one clean pop per hiding place, left to right, on the words (141.77 real onset of خرج): wall (thief 3), bush (thief 2), tree (leader)
const KD_T17 = [
  { i: 0, pop: 142.62, hide: 2625, x1: 2470, t1: 143.74, d: 1.1 },
  { i: 1, pop: 142.2, hide: 2440, x1: 2165, t1: 143.86, d: 1.0 },
  { i: 2, pop: 141.77, hide: 2150, x1: 2060, t1: 143.98, d: 0.8 },
];
const kdLineDelay = [0, 0.4, 0.55];
function kdTx17(k, t) { const d = KD_T17[k]; return kfn(t, [[d.t1, d.hide], [d.t1 + d.d, d.x1]], 'inOut') + KD_LINE(t - kdLineDelay[k]); }
const KD_GX17 = (t) => KD_GOAT15 - 24 + KD_LINE(t - 0.2);
function kdThief17(k, t) {
  const d = KD_T17[k], xf = (u) => kdTx17(k, u), P = kdThief(d.i, { ...walk(xf, t, { stride: 26 * KD_THIEF[d.i].s }), dir: t < 147.3 ? -1 : 1 });
  const g = [KD_GX17(t) - 60, 790]; let tg = g; P.behind = t < d.t1 + 0.15; P.y = KD_GR;
  if (t >= d.t1 + d.d - 0.1 && t < 147.3) P.dir = KD_GX17(t) > P.x ? 1 : -1;
  if (k === 0 && t < d.t1) { P.x = d.hide - 65 * (1 - KB(t, d.pop, 0.3, 'out')); P.tip = -0.12 * settleTo(t, d.pop, 0, 1, 0.3); P.handRW = [2590, 700]; P.sq = settleTo(t, d.pop, 0.9, 1, 0.3); }
  if (k === 1 && t < d.t1) { P.y = KD_GR - 95 * (1 - KB(t, d.t1 - 0.3, 0.3)) + 275 * (1 - KB(t, d.pop, 0.35, 'out')); P.sq = settleTo(t, d.pop + 0.3, 0.92, 1, 0.3); }
  if (k === 2 && t < d.t1) { P.y = KD_GR + 230 * (1 - KB(t, d.pop, 0.35, 'out')); P.sq = settleTo(t, d.pop + 0.3, 0.92, 1, 0.3); P.dir = 1; }
  if (t >= d.pop && t < 143.2) { const lk = Math.sin((t - d.pop) * 7) > 0 ? -1 : 0.6; P.look = lk; tg = [1700, 700]; if (t > d.pop + 0.6) { tg = g; P.look = 0; } P.mouth = 'smile'; }
  if (t >= d.t1 && t < 144.98) { P.aL = [-1.0, -1.6]; P.aR = [1.0, 1.6]; P.y = KD_GR - 14 * Math.abs(Math.sin(P.ph)); P.mouth = 'o'; }
  if (k === 0 && t >= 144.98 && t < 146.38) { P.tip = 0.25 * pulse(t, 144.98, 1.0); P.handRW = t < 145.5 ? [KD_GX17(t) + 70, KD_GR - 10 - 90 * KB(t, 145.2, 0.3)] : [KD_GX17(t) + 110, 790]; P.mouth = 'smile'; P.lid = 0.3; }
  if (k === 1 && t >= 145.5 && t < 146.3) { const u = KB(t, 145.72, 0.35, 'inOut'); const hz = kdGoatHead(kdGoat17(t)); P.handLW = [hz[0] - 4, hz[1] - 70 + 76 * u]; P.handRW = [hz[0] + 14, hz[1] - 70 + 76 * u]; P.tip = 0.08; P.eyes = 'wide'; P.mouth = 'smile'; tg = hz; }
  if (k === 0 && t >= 146.38 && t < 147.4) { P.aR = [-2.75, -3.0]; P.mouth = 'open'; tg = [P.x, 400]; }
  if (k === 1 && t >= 146.38 && t < 147.4) { P.handL = [-8 + 10 * Math.abs(Math.sin(t * 20)), -130]; P.handR = [8 - 10 * Math.abs(Math.sin(t * 20)), -130]; P.mouth = 'smile'; tg = [kdTx17(0, t), 560]; }
  if (k === 2 && t >= 146.38 && t < 147.4) { P.tip = 0.3 * pulse(t, 146.4, 0.9); P.handR = PERSON_HANDS.chest.R; P.mouth = 'smile'; }
  if (t >= 147.4) { tg = [P.x + 300, 690]; P.mouth = 'smile'; }
  // S18
  if (k === 1 && t >= 148.1 && t < 149.3) { P.handR = t < 148.5 ? [20, -175] : [-50 + 120 * KB(t, 148.5, 0.25), -230]; P.dir = 1; }
  if (t >= 149.42 && t < 150.28) { P.mouth = 'open'; P.lid = 0.7; const s = Math.sin(t * 30 + k); if (k === 0) { P.drop = -8; P.x += tremble(t, 1.5); } if (k === 1) { P.tip = 0.3; } if (k === 2) { P.handR = [40, -90 + 16 * s]; P.tip = 0.08; } }
  if (k === 2 && t >= 150.28 && t < 150.75) { P.handR = [30, -230]; P.handL = [-30, -230]; tg = [P.x, kdHead(P)[1] - 150 * Math.sin(Math.PI * KB(t, 150.28, 0.42))]; }
  if (k === 0 && t >= 150.8 && t < 151.6) { P.handR = [42, -206 + 6 * Math.abs(Math.sin((t - 150.8) * Math.PI / 0.2))]; P.mouth = 'smile'; P.lid = 0.5; }
  if (k === 0 && t >= 151.64 && t < 152.3) { P.dir = 1; P.handL = [-90, -170]; tg = [kdTx17(1, t), 720]; }
  if (k === 1 && t >= 151.64 && t < 152.3) { P.handR = [100, -175]; tg = [kdTx17(0, t), 700]; }
  if (k === 1 && t >= 152.34) { const fl = Math.sin(t * 14) > 0; P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.dir = fl ? 1 : 1; P.eyes = 'wide'; P.mouth = 'o'; tg = [P.x, 600]; }
  kdLife(P, t, 40 + k, tg); return P;
}
function kdGoat17(t) {
  const G = kdGoatAt(KD_GX17, t); const tf = turnFlip(t, [[0, -1], [146.9, 1]], 0.5); G.dir = tf.dir; G.y += 5 * tf.sink; G.gaze = t < 147.4 ? [-1, 0] : [1, -0.1]; G.headDown = t < 141.6 ? 1 : 1 - KB(t, 141.6, 0.3);
  G.lid = kdSlowBlink(t, [143.3, 145.0]);
  // it looks from one pop to the next, unbothered (chewing), then at the leader
  if (t >= 141.77 && t < 143.4) { const k = t < 142.2 ? 0 : t < 142.62 ? 1 : 2; G.gaze = [[-0.7, -0.5], [0.9, -0.5], [0.9, -0.6]][k]; }
  if (t >= 143.4 && t < 145.5) G.gaze = lookAt(kdGoatHead(G), kdHead(kdThief17(1, t)));
  if (t >= 145.5 && t < 146.9) { G.gaze = [0, 0.1]; G.lid = Math.max(G.lid, 0.3); }
  if (t >= 151.64 && t < 152.3) G.headDown = 0.5 * pulse(t, 151.7, 0.6);
  return G;
}
function kdDrawGang(ctx, t, cam) {
  const T = [0, 1, 2].map((k) => kdThief17(k, t)), G = kdGoat17(t);
  const skew = 0.5, slip = 1;
  const deco = (k, P) => { if (k === 0) kdTurban(ctx, P, skew); if (k === 1 && t < 148.6) kdFalseBeard(ctx, P, slip, 0.2 * Math.sin(t * 5)); if (k === 2) { const lift = t >= 150.28 && t < 150.75 ? 150 * Math.sin(Math.PI * KB(t, 150.28, 0.42)) : 0; kdTallTurban(ctx, P, lift, 0.25 + (lift ? t * 14 : 0)); } };
  // hidden or rising: drawn first, the cover redrawn over them
  for (const k of [2, 1, 0]) if (T[k].behind && t >= KD_T17[k].pop - 0.05) { if (k === 0) { person(ctx, T[k]); deco(k, T[k]); } else kdBehind(ctx, () => { person(ctx, T[k]); deco(k, T[k]); }); }
  kdFront(ctx, [3, 4, 5]);
  // ground items: the rope (until picked up), the beard, the sack
  if (t < 145.2) kdRopeGround(ctx, KD_ROPEG[0], KD_ROPEG[1], KD_GR - 4);
  if (t >= 148.6) { const u = K.clamp((t - 148.6) / 0.6), bx0 = kdHead(kdThief17(1, 148.6)); const bx = K.lerp(bx0[0] + 40, bx0[0] - 140, u), by = K.lerp(bx0[1], KD_GR - 8, u) - 120 * Math.sin(Math.PI * u); ctx.save(); ctx.translate(bx, by); ctx.rotate(u * 5); shape(ctx, [[-26, 0], [26, 0], [10, 40], [0, 50], [-10, 40]], '#4a2a12', { lw: 3.5, seed: 83 }); ctx.restore(); }
  const sackX = t >= 152.9 ? kdTx17(1, 152.9) - 40 : null;
  if (sackX) kdSack(ctx, sackX, KD_GR + 2 - 0 * fallY(t, 152.9, 153.2, 0, 0), 0.6, 0.6);
  const order = t < 147.4 ? [0, 1, 2, 'g'] : [2, 1, 'g', 0];
  for (const k of order) {
    if (k === 'g') { kdGoatShadow(ctx, G); kdGoat(ctx, G); const nk = kdGoatNeck(G);
      if (t >= 145.5 && t < 146.1) { const u = KB(t, 145.72, 0.35, 'inOut'), hz = kdGoatHead(G), lp = [K.lerp(hz[0] + 4, nk[0], u), K.lerp(hz[1] - 64, nk[1], u)]; kdLoop(ctx, lp, 0.85, K.lerp(1.6, 1, u)); kdRope(ctx, kdHand(T[0], 1), [lp[0], lp[1] + 16], 150); kdHandsOver(ctx, T[1]); }
      else if (t >= 146.1) { kdLoop(ctx, nk, 0.85); kdRope(ctx, kdHand(T[0], 1), nk, 120); }
      else if (t >= 145.2) kdRope(ctx, kdHand(T[0], 1), [KD_ROPEG[0] + 20, KD_GR - 6], 160); continue; }
    if (T[k].behind) continue; halftoneShadow(ctx, T[k].x, KD_GR + 4, 55 * T[k].s, 0.3); person(ctx, T[k]); deco(k, T[k]);
    if (k === 1 && t < 152.9) { const h = kdHand(T[1], 0); kdSack(ctx, h[0], h[1] + 46, 0.5, 0.6); }
  }
  for (const k of [0, 1, 2]) for (const f of footfalls((u) => kdTx17(k, u), 147.4, 154.4, 26)) if (Math.abs(t - f.t) < 0.6) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 3, 5, 9, 18, 0.45, k * 7 + Math.round(f.t * 10));
}
const KS17 = {
  a: 140.2, ww: KD_RW,
  cam: [[140.2, { x: 2215, y: 640, zoom: 1.4 }], [141.5, { x: 2330, y: 650, zoom: 1.3 }], [143.9, { x: 2330, y: 650, zoom: 1.3 }], [144.9, { x: 2300, y: 690, zoom: 1.75 }], [147.4, { x: 2300, y: 690, zoom: 1.75 }], [148.1, { x: 2300, y: 680, zoom: 1.7 }]],
  draw(ctx, t, cam) { kdRoad(ctx, cam, 2050); kdDrawGang(ctx, t, cam); },
  over(ctx, t, cam, S) {
    // one number beside each head as it pops (1 wall, 2 bush, 3 tree), THE THIEVES on الثلاثة
    if (t >= 141.77 && t < 144.5) { ctx.save(); ctx.globalAlpha = kdFade(t, 141.77, 144.5, 0.2);
      [2, 1, 0].forEach((k, n) => { const d = KD_T17[k]; if (t < d.pop) return; const [hx, hy] = kdP(...kdHead(kdThief17(k, t)), cam); S.counter(ctx, n + 1, hx + (k === 0 ? -40 : k === 1 ? 10 : 0), hy - 140, KB(t, d.pop, 0.3), { size: 76 }); });
      S.label(ctx, 'THE THIEVES', 500, 200, KB(t, 142.9, 0.3), { align: 'center', size: 50, fill: C.yellow }); ctx.restore(); }
    if (t >= 146.38 && t < 147.9) { const [hx, hy] = kdP(...kdHead(kdThief17(0, t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 146.38, 147.9, 0.2); sfx(ctx, 'TOO EASY!', Math.min(hx, 760), hy - 260, 66, KB(t, 146.45, 0.3), { rot: -0.08 }); ctx.restore(); }
  },
};
const KS18 = {
  a: 148.1, ww: KD_RW,
  cam: (() => { const k = [[148.1, { x: 2300, y: 680, zoom: 1.7 }]]; for (let t = 148.8; t <= 153.0; t += 0.4) k.push([t, { x: kdTx17(0, t) - 180, y: 690, zoom: 1.55 }]); k.push([154.2, { x: kdTx17(0, 153.0) - 180, y: 690, zoom: 1.55 }]); return k; })(),   // v2: wider so all three laughing thieves stay in frame
  draw(ctx, t, cam) { kdRoad(ctx, cam, 2050 + 0.3 * (cam.x - 2300)); kdDrawGang(ctx, t, cam); },
  over(ctx, t, cam, S) {
    if (t >= 149.42 && t < 150.6) { const [hx, hy] = kdP(...kdHead(kdThief17(1, t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 149.42, 150.6, 0.2); sfx(ctx, 'HA HA HA!', hx - 60, hy - 230, 70, KB(t, 149.45, 0.3), { rot: -0.1 }); ctx.restore(); }
  },
};
