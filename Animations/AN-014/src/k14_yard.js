// ===== AN-014 road and yard scenes: S5 road (30.42-33.98); S6 prayer house, S8 false friend, S9 the shove, S13 rescue,
// S14 the sultan, S15 the cure, S16 joy (all in the shrine yard) =====
const K14_WELL = K14_YARD.well;
const k14Sit = (P) => k14Head(P);

// ---------- S5: the road away ----------
const K14_S5X = [[30.42, 520], [31.4, 880], [32.8, 1330], [33.2, 1420]];
function k14S5(ctx, t) {
  const gx = kfn(t, [[30.42, 520], [33.2, 1420]], 'out'), camX = gx - 430, u = k14Lin(t, [[30.42, 0.12], [33.6, 0.42]]);
  ctx.save(); ctx.translate(-camX, 0);
  countryRoad(ctx, { w: 3000, u, camX, city: 'left', t });
  { const a = Math.PI * K.clamp((u - 0.05) / 0.5); sun(ctx, camX + 500 - Math.cos(a) * 330, 760 - Math.sin(a) * 420, t); }
  const xf = (tt) => kfn(tt, [[30.42, 520], [33.2, 1420]], 'out');
  const P = k14Walk(k14GM(t, { mouth: 'closed', y: 900 }), xf, t, 24);
  P.sq = landSquash(t, 33.22, 0.06); P.drop = 3 * K.clamp((t - 31.4) / 1.2) * (t < 33.2 ? 1 : 0);
  let set = t >= 33.42;
  if (!set) P.handR = [20, -150]; else P.handRW = [gx + 34, 880];
  if (t >= 33.5) { P.handL = [-6, -214]; P.mouth = 'smile'; }
  k14Act(ctx, P, t, 1, t < 33.2 ? [gx + 400, 760] : [gx + 500, 600]);
  if (!set) { const h = k14L2W(P, P.hands[1][0], P.hands[1][1]); k14Bindle(ctx, h[0], h[1], -2.2 + 0.25 * K.clamp((t - 31.4) / 1.4) + 0.06 * Math.sin(P.ph || 0), 0.8, 0.25 * Math.sin((P.ph || 0) - 0.4)); }
  else k14Bindle(ctx, gx + 34, 880, -0.55, 0.8, 0);
  countryRoad(ctx, { w: 3000, front: true, occlude: [] });
  ctx.restore();
}
function k14S5Over(ctx, t, cam, S) { if (t >= 32.64 && t < 33.98) { k14Label(ctx, S, t, 'FAR AWAY', 700, 250, cam, 32.64, 33.98, { panel: true }); k14Arrow(ctx, S, t, [640, 330], [930, 330], cam, 32.7, 33.98, { panel: true, bend: -0.1, color: C.yellow }); } }

// ---------- S6: the prayer house; visitors come for advice ----------
const K14_SEATS = [470, 545, 620];
const K14_VIS = [['villager', { pal: { robe: C.blue, dot: NAVY } }, [[37.22, 1080], [38.3, 470]], 41], ['villageWoman', {}, [[37.5, 1080], [38.5, 545]], 42], ['oldWoman', {}, [[37.8, 1080], [39.0, 620]], 43]];
function k14Visitor(t, i, o = {}) {
  const [cos, ex, keys, seed] = K14_VIS[i], P = k14W({ costume: cos, ...ex, y: 900, s: 0.82, dir: -1, mouth: 'smile', seed }, keys, t, 26);
  const t0 = 38.48 + i * 0.28; P.sit = K.ease.out(K.clamp((t - t0) / 0.3)); P.seat = 'floor'; P.sq = landSquash(t, t0 + 0.3, 0.08);
  if (P.sit > 0) { P.amp = 0; } return Object.assign(P, o);
}
function k14S6(ctx, t) {
  const door = kfn(t, [[35.0, 0], [35.45, 1]]), lampHung = t >= 36.6;
  const d = k14Yard(ctx, t, { u: 0.3, door, lamp: lampHung ? 1 : null });
  if (lampHung) k14Spark(ctx, t, 36.62, K14_YARD.lampAt[0], K14_YARD.lampAt[1], 3, 40, 0.6);
  k14Spark(ctx, t, 36.9, 250, 420, 4, 50, 0.8);
  // visitors
  const gm = [300, 724];
  for (let i = 0; i < 3; i++) { if (t < K14_VIS[i][2][0][0]) continue; const V = k14Visitor(t, i), tA = K14_VIS[i][2][1][0];
    let tg = t < tA - 0.5 ? [250, 430] : gm;
    if (t >= 39.6) V.drop = 5 * pulse(t, [39.9, 40.4, 40.85][i], 0.4);
    if (i === 2) { V.brow = blend(t, 41.18, 41.7, -0.5, 0); V.mouth = t < 41.5 ? 'frown' : 'smile'; }
    k14Act(ctx, V, t, 40 + i, tg); }
  k14Heart(ctx, t, 41.7, 545, 700, 26, 1.0);
  // the kind man opens the door, hangs a lamp, speaks
  const P = k14GM(t, { x: kfn(t, [[35.4, 250], [35.9, 300]]), dir: 1 });
  if (t < 35.4) { P.y = 888; P.s = 0.86; P.aL = [1.4, 1.5]; P.aR = [1.45, 1.55]; P.tip = 0.08 * pulse(t, 35.0, 0.5); }
  else { const xf = k14X([[35.4, 250], [35.9, 300]]); k14Walk(P, xf, t); }
  if (t >= 36.16 && t < 36.7) { P.handRW = [K14_YARD.lampAt[0], kfn(t, [[36.16, 800], [36.5, 736]])]; P.sq = 1 + 0.03 * pulse(t, 36.3, 0.4); }
  P.talk = talk(t, [[39.54, 41.1]]);
  if (t >= 39.54 && t < 41.1) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; }
  const tg = t < 36.1 ? [600, 760] : t < 36.7 ? K14_YARD.lampAt : t < 37.3 ? [700, 760] : t < 39.54 ? [1000, 760] : gazePlan(t, [[39.54, k14Sit(k14Visitor(t, 0))], [40.1, k14Sit(k14Visitor(t, 1))], [40.6, k14Sit(k14Visitor(t, 2))]]);
  const draw = () => { k14Act(ctx, P, t, 1, tg); if (t >= 36.16 && t < 36.6) hangingLamp(ctx, P.handRW[0], P.handRW[1] + 30, t, { lit: 1, s: 0.5, chain: P.handRW[1] + 8 }); };
  if (t < 35.4) k14Clip(ctx, [200, 700, 100, 205], draw); else draw();
  k14WellFront(ctx, d.night);
}

// ---------- S8: the false friend ----------
const K14_S8E = [[48.0, 1080], [49.15, 790], [49.8, 790], [50.45, 412], [54.56, 412], [54.82, 372], [55.95, 615]];
const K14_S8G = [[54.56, 300], [55.85, 668]];
function k14S8(ctx, t) {
  const d = k14Yard(ctx, t, { u: 0.32, door: 1, lamp: 1 });
  // two listeners still sitting
  for (const i of [1, 2]) { const V = k14Visitor(t, i, { sit: 1, amp: 0, x: K14_SEATS[i] }); const tg = t > 53.8 && t < 54.6 ? k14Sit(k14Visitor(t, 3 - i, { sit: 1, x: K14_SEATS[3 - i] })) : [kfn(t, K14_S8G), 724]; if (t > 53.8 && t < 54.6) V.mouth = 'o'; k14Act(ctx, V, t, 40 + i, tg); }
  // kind man
  const P = k14W(k14GM(t, { dir: 1 }), K14_S8G, t);
  const ex = k14X(K14_S8E);
  let pt = t < 50.0 ? [ex(t), 724] : [ex(t), 726];
  if (t >= 50.45 && t < 51.12) { P.eyes = 'shut'; P.handRW = [ex(t) + 4, 800]; P.mouth = 'smile'; }
  if (t >= 52.95 && t < 53.6) pt = [790, 830];
  if (t >= 53.68 && t < 54.5) { P.handR = [86, -132]; P.drop = 5 * pulse(t, 54.0, 0.4); pt = [545, 830]; }
  if (t >= 54.56) pt = [1000, 760];
  // envier
  const E = k14W(k14EN(t, { dir: -1, mouth: 'frown', brow: 1 }), K14_S8E, t, t > 54.6 ? 18 : 27);
  let et = [300, 724];
  if (t < 49.2) { E.tip = 0.06; et = [300, 760]; }
  if (t >= 49.28 && t < 49.8) { const k = K.clamp((t - 49.28) / 0.3); E.handL = PERSON_HANDS.cheeks.L; E.handR = PERSON_HANDS.cheeks.R; E.mouth = k > 0.5 ? 'smile' : 'frown'; E.brow = K.lerp(1, -0.3, k); E.lid = 0.3; if (t > 49.62) E.handR = PERSON_HANDS.chin.R; }
  if (t >= 49.8) { E.mouth = 'smile'; E.brow = -0.3; E.lid = 0.3; }
  if (t >= 50.2 && t < 50.45) { E.handL = PERSON_HANDS.armsOut.L; E.handR = PERSON_HANDS.armsOut.R; }
  if (t >= 50.45 && t < 51.12) { E.handLW = [270, 790]; E.handRW = [334, 772]; const off = t >= 50.62 && t < 50.97; if (off) { E.mouth = 'frown'; E.brow = 1; et = [700, 700]; } }
  if (t >= 51.16 && t < 51.6) { E.handR = PERSON_HANDS.hush.R; et = [545, 820]; }
  if (t >= 51.6 && t < 52.4) { E.handR = PERSON_HANDS.cupMouth.R; E.tip = 0.1; }
  if (t >= 52.88 && t < 53.7) { E.handL = [-104, -166]; E.brow = -0.3 + 0.5 * Math.sin(t * 22); }
  if (t >= 54.56) { E.dir = 1; E.mouth = 'smile'; if (t > 55.0 && Math.abs(ex(t) - kfn(t, K14_S8G)) < 90) E.handRW = [kfn(t, K14_S8G) - 26, 806]; et = t > 55.15 && t < 55.5 ? [100, 760] : [kfn(t, K14_S8G), 726]; }
  const enFirst = t >= 50.45 && t < 51.12 ? false : true;
  if (enFirst) { k14Act(ctx, E, t, 3, et); k14Act(ctx, P, t, 1, pt); } else { k14Act(ctx, P, t, 1, pt); k14Act(ctx, E, t, 3, et); }
  if (t < 48.0) {} else if (t < 49.2) for (const tk of [48.3, 48.6, 48.9]) dustBurst(ctx, ex(tk) + 20, 902, t - tk, 4, 5, 10, 22, 0.4, 7);
  // the stone and the crow
  if (t < 56.44) shape(ctx, ell(812, 822, 9, 6, 10), STONE2, { lw: 3, seed: 540 });
  else if (t < 56.8) k14ClipOut(ctx, [700, 836, 160, 400], () => shape(ctx, ell(812 - 10 * (t - 56.44), fallY(t, 56.44, 56.75, 822, 960), 9, 6, 10), STONE2, { lw: 3, seed: 540 }));
  const fl = t >= 56.55, cd = t - 56.55;
  bird(ctx, { kind: 'crow', x: fl ? 840 + cd * 300 : 840, y: fl ? 668 - cd * 260 : 668, s: 0.55, dir: 1, fly: fl, flap: fl ? Math.sin(t * 30) : 0 });
  k14WellFront(ctx, d.night);
}

// ---------- S9: the shove ----------
function k14S9(ctx, t) {
  const d = k14Yard(ctx, t, { u: 0.33, door: 1, lamp: 1 });
  // the envier (behind and to the left)
  const run = t >= 63.24, bolt = t >= 63.54;
  const E = k14EN(t, { x: 600, dir: 1, mouth: 'smile', brow: -0.3, lid: 0.3 });
  let et = [690, 760];
  if (t < 58.1) { E.handR = [84, -72]; et = [790, 845]; }
  if (t >= 59.5) { et = gazePlan(t, [[59.5, [690, 760]], [59.55, [300, 720]], [59.8, [1000, 720]], [60.05, [700, 780]]], 0.07); E.gaze = lookAt(k14Head(E), et); et = null; }
  if (t >= 59.7) { E.mouth = 'closed'; E.brow = 1; E.lid = 0.15; }
  if (t >= 59.9 && t < 60.55) { E.handL = [24, -152]; E.handR = [34, -150]; E.tip = -0.12 * K.ease.inOut(K.clamp((t - 59.9) / 0.5)); E.sq = anticipate(t, 59.9, 0.6, 0.05); }
  if (t >= 60.55) { const u = K.clamp((t - 60.55) / 0.08); E.x = K.lerp(600, 636, u); E.tip = K.lerp(-0.12, 0.18, u); E.aL = K14_SHOVE.aL; E.aR = K14_SHOVE.aR; E.mouth = 'o'; E.noBlink = true; E.lid = 0; }
  if (t >= 61.3) { const u = K.clamp((t - 61.3) / 0.3); E.tip = K.lerp(0.18, 0, u); E.aL = E.aR = undefined; E.handL = [16, -128]; E.handR = [30, -130]; E.gaze = [0.2, 0.9]; E.mouth = t > 61.8 ? 'smile' : 'closed'; }
  if (t >= 62.34) { E.x = kfn(t, [[62.34, 636], [62.7, 662]]); E.tip = 0.15; E.handR = PERSON_HANDS.cupEar.R; E.handL = undefined; E.gaze = lookAt(k14Head(E), [790, 845]); E.drop = 5 * pulse(t, 62.9, 0.3); E.mouth = 'smile'; }
  if (run) { E.tip = 0.12; E.handR = [40, -140]; E.handL = [-30, -120]; E.ph = (t - 63.24) * 34; E.amp = 1; E.gaze = [1, 0]; E.mouth = 'o'; E.x = bolt ? kfn(t, [[63.54, 662], [64.0, 1160]], 'in') : 662; if (bolt) E.ph = E.x / 22; }
  // the kind man
  const gx = kfn(t, [[58.18, 668], [58.5, 680]]), P = k14GM(t, { x: gx, dir: 1, mouth: 'smile' });
  let pt = [600, 724];
  if (t < 58.18) pt = [790, 845];
  if (t >= 58.18) { const k = K.ease.inOut(K.clamp((t - 58.18) / 0.5)); P.tip = 0.15 * k; P.handLW = [712, 828]; P.handRW = [744, 826]; pt = [790, 845]; }
  let falling = false;
  if (t >= 60.55) {
    falling = true; const th = kfn(t, [[60.55, 0.15], [60.75, 0.9], [60.95, 1.9], [61.12, 2.7]]), hip = [kfn(t, [[60.55, 690], [61.12, 772]]), t < 61.12 ? kfn(t, [[60.55, 832], [61.12, 826]]) : fallY(t, 61.12, 61.45, 826, 1200)];
    const r = 68 * 0.9 / 0.9; P.x = hip[0] - r * Math.sin(th); P.y = hip[1] + r * Math.cos(th); P.rot = th; P.tip = 0; P.handLW = P.handRW = undefined;
    const w = (t - 60.55) * 40; P.aL = [-2 + Math.sin(w) * 1.2, -2.4 + Math.sin(w + 1) * 1.2]; P.aR = [2 + Math.cos(w) * 1.2, 2.4 + Math.cos(w + 1) * 1.2]; P.eyes = 'wide'; P.mouth = 'o'; P.noBlink = true;
  }
  if (!falling || t < 61.5) { if (falling) k14ClipOut(ctx, [700, 834, 170, 420], () => k14Act(ctx, P, t, 1, null)); }
  if (t >= 60.75) k14Sandal(ctx, 742, 826, 0.75, 0.1);
  if (!run || !bolt) { if (!falling) { k14WellFront(ctx, d.night); k14Act(ctx, P, t, 1, pt); k14Act(ctx, E, t, 3, et); } else { k14WellFront(ctx, d.night); k14Act(ctx, E, t, 3, et); } }
  else { k14WellFront(ctx, d.night); k14Act(ctx, E, t, 3, et); }
  dustBurst(ctx, 780, 828, t - 62.55, 6, 6, 12, 30, 0.6, 9);
  if (bolt) for (let k = 0; k < 4; k++) { const tk = 63.6 + k * 0.1; dustBurst(ctx, kfn(tk, [[63.54, 662], [64.0, 1160]], 'in') - 30, 902, t - tk, 4, 6, 12, 24, 0.45, 11 + k); }
  if (run && !bolt) dustBurst(ctx, 662, 902, t - 63.3, 5, 5, 10, 24, 0.3, 13);
}

// ---------- S13: dawn; the followers find him ----------
const K14_F1 = { costume: 'villager', pal: { robe: C.red, dot: '#a8160f' }, s: 0.86, y: 900 };
const K14_F2 = { costume: 'servant', s: 0.84, y: 900 };
const K14_F1X = [[99.5, 250], [100.2, 450], [101.08, 450], [101.6, 672], [105.5, 672], [105.8, 610]], K14_F2X = [[99.7, 250], [100.4, 600], [102.9, 600], [103.45, 885]];
const K14_HEAVE = [104.45, 104.8, 105.15];
function k14S13(ctx, t) {
  const u = kfn(t, [[98.14, 0.97], [99.4, 1.07]]), rope = t >= 104.34 ? 1100 : null;
  const d = k14Yard(ctx, t, { u, door: kfn(t, [[99.3, 0], [99.55, 1]]), lamp: 1, rope });
  const bucketLift = kfn(t, [[100.6, 0], [100.8, 50], [101.2, 50], [101.4, 0]]);
  k14Bucket(ctx, 600, 905, bucketLift, 0.2 * pulse(t, 100.6, 0.8));
  // the kind man comes up (clipped by the rim, then hops out)
  if (t >= 105.48) {
    const up = t < 105.95, P = k14GM(t, { x: up ? 780 : kfn(t, [[105.95, 780], [106.3, 710]]), dir: -1, mouth: 'smile' });
    if (up) { P.y = kfn(t, [[105.48, 1080], [105.95, 905]], 'out'); P.aL = K14_UP.aL; P.aR = K14_UP.aR; P.lid = 0.4; }
    else { P.y = 900 - hop(t, 105.95, 0.35, 0, 0, 30)[1]; P.sq = landSquash(t, 106.3, 0.14); P.lid = Math.max(0.6 * pulse(t, 106.45, 0.25), 0.6 * pulse(t, 106.8, 0.25)); }
    if (up) k14ClipOut(ctx, [700, 834, 170, 420], () => k14Act(ctx, P, t, 1, [780, 600]));
    else { k14WellFront(ctx, d.night); k14Act(ctx, P, t, 1, [640, 724]); for (const dx of [-30, 30]) dustBurst(ctx, 710 + dx, 900, t - 106.3, 5, 6, 12, 28, 0.6, 21); }
  }
  if (t < 105.95) k14WellFront(ctx, d.night);
  // followers
  const H = countedBeats(t, K14_HEAVE), H2 = countedBeats(t, K14_HEAVE.map((x) => x + 0.17));
  const F1 = k14W({ ...K14_F1, pal: { ...K14_F1.pal }, dir: 1, mouth: 'closed' }, K14_F1X, t), F2 = k14W({ ...K14_F2, dir: 1, mouth: 'closed' }, K14_F2X, t);
  let t1 = [700, 760], t2 = [700, 760];
  if (t < 100.24) { F1.handR = PERSON_HANDS.cupMouth.R; F1.talk = talk(t, [[99.6, 100.2]]); t1 = [Math.sin(t * 4) > 0 ? 900 : 100, 700]; F2.handR = PERSON_HANDS.cupMouth.R; F2.talk = talk(t, [[99.8, 100.3]], 1); t2 = [Math.sin(t * 4 + 2) > 0 ? 950 : 150, 700]; }
  if (t >= 100.24 && t < 101.5) { t2 = t < 100.55 ? [930, 600] : [600, 900]; if (t >= 100.6 && t < 101.2) { F2.handRW = [612, 860 - bucketLift]; F2.tip = 0.08; } if (t >= 101.2) { F2.handL = PERSON_HANDS.palmsUp.L; F2.handR = PERSON_HANDS.palmsUp.R; F2.mouth = 'frown'; F2.brow = -0.5; } }
  let sandal = t >= 101.9 ? (t < 106.0 ? 'held' : 'give') : 'rim';
  if (t >= 101.6 && t < 102.62) { t1 = t < 101.9 ? [742, 826] : [kfn(t, K14_F2X), 724]; if (t >= 101.9) { F1.handRW = [700, 760]; F1.mouth = 'o'; } }
  if (t >= 102.0 && t < 102.62) t2 = [742, 760];
  if (t >= 102.62 && t < 103.58) { F1.handR = PERSON_HANDS.cupEar.R; F2.handR = PERSON_HANDS.cupEar.R; t1 = t2 = [780, 836]; F2.dir = t > 103.4 ? -1 : 1; }
  if (t >= 103.58 && t < 104.34) { F1.tip = 0.12; F2.dir = -1; F2.tip = 0.12; F1.handRW = [760, 790 + 14 * Math.sin(t * 14)]; F2.handRW = [810, 790 + 14 * Math.sin(t * 14 + 1)]; F1.mouth = F2.mouth = 'smile'; t1 = t2 = [780, 860]; }
  if (t >= 104.34 && t < 105.6) { F2.dir = -1; F1.handLW = [776, 772]; F1.handRW = [782, 800]; F2.handLW = [794, 768]; F2.handRW = [790, 798]; F1.tip = -0.14 * H.accent - 0.03; F2.tip = -0.14 * H2.accent - 0.03; F1.sq = 1 - 0.06 * H.accent; F2.sq = 1 - 0.06 * H2.accent; F1.mouth = F2.mouth = 'frown'; F1.brow = F2.brow = 0.6; t1 = t2 = [780, 830]; }
  if (t >= 105.6) { F2.dir = -1; F1.mouth = F2.mouth = 'smile'; t1 = t2 = [720, 740]; if (t >= 106.3) { F1.handRW = [680, 800]; sandal = 'give'; } }
  if (t >= 101.6 && t < 106.3 && sandal === 'held' && !F1.handRW && !F1.handLW) F1.handRW = [705, 770];
  k14Act(ctx, F2, t, 51, t2); k14Act(ctx, F1, t, 52, t1);
  if (sandal === 'rim') k14Sandal(ctx, 742, 826, 0.75, 0.1);
  else { const hw = F1.handRW || F1.handLW || [705, 770]; k14Sandal(ctx, hw[0], hw[1] + 6, 0.75, -0.4); }
  if (t >= 102.62 && t < 103.7) soundArcs(ctx, 780, 800, 0, t);
}

// ---------- S14: the sultan arrives with his daughter ----------
const K14_SUX = [[108.6, 1080], [109.55, 560]], K14_PRX = [[110.3, 1080], [111.75, 700]];
const K14_SUF = footfalls(k14X(K14_SUX), 108.6, 109.6, 30 * 0.95);
function k14SultanP(t, o = {}) { const P = k14W({ ...K14_SULTAN, pal: { ...K14_SULTAN.pal }, y: 900, s: 0.95, dir: -1, mouth: 'frown', brow: -0.5 }, K14_SUX, t, 30); P.sq = 1 - 0.025 * Math.abs(Math.sin(P.ph || 0)) * (P.amp || 0); return Object.assign(P, o); }
function k14PrincessP(t, o = {}) { const P = k14W({ ...K14_PRINCESS, pal: { ...K14_PRINCESS.pal }, y: 900, s: 0.84, dir: -1, mouth: 'frown' }, K14_PRX, t, 22); return Object.assign(P, o); }
// the sultan's crown is a separate prop that trails his head (2-frame lag, its own wobble)
function k14SultanCrown(ctx, P, Plag, extra = 0, rot = 0) { const h = k14Head(Plag), hn = k14Head(P); k14Crown(ctx, h[0], Math.min(h[1], hn[1]) - 52 * (P.s || 1) - extra, 0.7 * (P.s || 1), rot); }
function k14Ill(P, t, amt = 1) { P.tip = (P.tip || 0) + 0.06 * amt * Math.sin(t * 2 * Math.PI / 1.6); P.spiral = amt > 0.02 ? Math.min(1, amt * 1.5) : 0; P.spinT = t * 3; P.pale = amt; P.aL = [-0.05, 0]; P.aR = [0.05, 0]; P.drop = 6 * amt; P.tilt = 0.12 * amt * Math.sin(t * 2 * Math.PI / 1.6 + 1); P.noBlink = true; P.lid = 0.2 * amt; return P; }
function k14S14(ctx, t) {
  const d = k14Yard(ctx, t, { u: 0.3, door: 1, lamp: 1 });
  k14WellFront(ctx, d.night);
  // kind man at the door
  const P = k14GM(t, { x: 300, dir: 1 });
  if (t >= 109.58 && t < 111.2) { P.handR = PERSON_HANDS.chest.R; P.drop = 5 * pulse(t, 109.7, 0.6); }
  if (t >= 111.9) { P.eyes = 'wide'; P.mouth = 'o'; P.noBlink = true; }
  const S1 = k14SultanP(t), Pr = k14PrincessP(t);
  // visitor bows
  const V = { costume: 'villager', pal: { robe: C.blue, dot: NAVY }, x: 420, y: 900, s: 0.84, dir: 1, mouth: 'smile', sq: anticipate(t, 109.4, 0.2, 0.05) };
  if (t >= 109.58) { const b = K.clamp((t - 109.58) / 0.3) * K.clamp((110.8 - t) / 0.3); V.drop = 14 * b; V.tip = 0.12 * b; V.handL = PERSON_HANDS.clasp.L; V.handR = PERSON_HANDS.clasp.R; }
  k14Act(ctx, V, t, 44, k14Head(S1));
  k14Act(ctx, P, t, 1, t >= 111.78 ? [k14Head(Pr)[0], k14Head(Pr)[1] - 10] : t > 108.7 ? k14Head(S1) : [600, 760]);
  // sultan
  if (t >= 110.36 && t < 111.2) { S1.handL = PERSON_HANDS.palmsUp.L; S1.handR = PERSON_HANDS.palmsUp.R; S1.wet = true; S1.brow = -0.7; S1.drop = 5; }
  if (t >= 111.2) { S1.handRW = [Pr.x + 26, 806]; S1.brow = -0.6; S1.wet = true; }
  const st = t < 111.2 ? k14Head(P) : k14Head(Pr);
  if (t >= 108.6) { k14Act(ctx, S1, t, 61, st); k14SultanCrown(ctx, S1, k14SultanP(t - 0.067)); }
  for (const f of K14_SUF) dustBurst(ctx, f.x, 902, t - f.t, 4, 6, 12, 22, 0.4, Math.round(f.t * 10));
  // princess
  if (t >= 110.3) { if (t >= 111.78) k14Ill(Pr, t, K.clamp((t - 111.6) / 0.3)); else { Pr.mouth = 'frown'; Pr.pale = 0.6; } k14Act(ctx, Pr, t, 62, k14Head(S1));
    if (t >= 111.6) { const h = k14Head(Pr); k14Wisp(ctx, h[0], h[1] - 10, t, { s: 0.42, r: 80, alpha: K.clamp((t - 111.6) / 0.4) }); } }
}

// ---------- S15: the cat, the hairs, the brazier; the spirit leaves ----------
const K14_CATX = [[112.44, 40], [113.8, 385]], K14_CATX2 = [[115.95, 385], [116.75, 236]], K14_CATX3 = [[124.7, 236], [125.6, 336]];
const K14_PLUCK = [114.5, 114.75, 115.0, 115.25, 115.5, 115.78, 116.05];
function k14CatP(t, o = {}) {
  const s = 0.42, P = { pal: 0, y: 905, s, dir: 1, tailUp: 1, tailHairs: 7, ears: 1 };
  let xf = k14X(K14_CATX); if (t >= 115.95) { xf = k14X(K14_CATX2); P.dir = -1; } if (t >= 124.7) { xf = k14X(K14_CATX3); P.dir = 1; }
  Object.assign(P, walk(xf, t, { stride: GAIT.cat * s }));
  return Object.assign(P, o);
}
function k14S15(ctx, t) {
  const d = k14Yard(ctx, t, { u: 0.3, door: 1, lamp: 1 });
  k14WellFront(ctx, d.night);
  const H = countedBeats(t, K14_PLUCK), n = H.n;
  // brazier and smoke
  const flare = t >= 116.36 ? Math.exp(-(t - 116.36) * 3) : 0;
  k14Brazier(ctx, 460, 905, t, flare, t >= 113.0 ? 1 : 0.6);
  if (t >= 116.5 && t < 121.2) { const pr = K.clamp((t - 116.5) / 2.4); ctx.save(); ctx.globalAlpha = 0.85 * K.clamp((121.2 - t) / 0.5);
    for (let i = 0; i < 16; i++) { const u = i / 15 * pr, x = K.lerp(460, 690, u) + Math.sin(u * 9 + t * 2) * 26, y = 830 - 200 * Math.sin(u * Math.PI * 0.9) - u * 40; ctx.beginPath(); ctx.arc(x, y, 12 + 10 * u, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#b9b4c6'; ctx.stroke(); }
    ctx.restore(); for (let i = 0; i < 7; i++) { const u = K.clamp(pr - i * 0.08); if (u > 0 && u < 1) star(ctx, K.lerp(460, 690, u) + Math.sin(u * 9 + t * 2) * 26, 830 - 200 * Math.sin(u * Math.PI * 0.9) - u * 40 - 26, 9, C.yellow, t * 3 + i); } }
  // kind man: kneels, strokes, plucks, burns
  const P = k14GM(t, { x: 300, dir: 1, mouth: 'smile' }), C1 = k14CatP(t);
  P.kneel = blend(t, 113.8, 114.1, 0, 1) * (1 - blend(t, 122.8, 123.2, 0, 1));
  let pt = [C1.x + 60, 860];
  if (t >= 113.96 && t < 114.45) { const u = (t - 113.96) / 0.45; P.handRW = [K.lerp(420, 345, u), K.lerp(835, 845, u)]; }
  if (t >= 114.45 && t < 116.3) { const pinch = H.accent; P.handRW = [326 + 4 * pinch, 790 + 6 * pinch]; P.handL = [30, -100]; pt = [326, 790]; }
  if (t >= 116.1 && t < 116.36) { P.handRW = [360, 760]; pt = [360, 740]; }
  if (t >= 116.36 && t < 117.2) { P.handRW = [K.lerp(400, 446, K.clamp((t - 116.36) / 0.15)), 832]; P.tip = -0.08 * Math.exp(-(t - 116.4) * 4); pt = [460, 800]; }
  if (t >= 117.22 && t < 118.9) { pt = [120, 300]; P.drop = 5 * pulse(t, 118.2, 0.4); }
  if (t >= 118.9) pt = [700, 700];
  if (t >= 121.8) pt = [700, 724];
  if (t >= 125.1) { P.handR = PERSON_HANDS.chest.R; }
  k14Act(ctx, P, t, 1, pt);
  if (t >= 114.5 && t < 116.4) { const h = P.handRW; k14Hairs(ctx, h[0], h[1], n, 0.45); }
  if (t >= 116.36 && t < 116.6) k14Hairs(ctx, 446, K.lerp(832, 860, (t - 116.36) / 0.24), 7, 0.45);
  // memory icons pop back out of his turban
  if (t >= 112.5 && t < 113.7) { const h = k14Head(P), a = K.clamp((113.7 - t) / 0.3); ctx.save(); ctx.globalAlpha = a; [[-50, '7'], [0, 'hair'], [50, 'cat']].forEach(([dx, k], i) => { const u = K.ease.back(K.clamp((t - 112.5 - i * 0.15) / 0.3)), x = h[0] + dx * u, y = h[1] - 60 - 50 * u; if (k === '7') sfx(ctx, '7', x, y, 40 * u, 1); else if (k === 'hair') k14Hairs(ctx, x, y + 20, 7, 0.4 * u); else cat(ctx, { x: x + 10, y: y + 22, s: 0.22 * u, silhouette: true, tailUp: 1, tailHairs: 7 }); }); ctx.restore(); }
  // the cat
  if (t >= 113.96 && t < 114.5) { C1.arch = 1; C1.lid = 1; C1.noBlink = true; }
  if (t >= 114.5 && t < 115.95) { C1.ears = 1 - 1.4 * H.accent; C1.tailHairs = 7 - n; }
  if (t >= 115.95) C1.tailHairs = 0;
  if (t >= 115.5 && t < 115.95) C1.lick = pulse(t, 115.5, 0.45);
  if (t >= 116.75 && t < 124.7) { C1.sit = 1; C1.gaze = [1, -0.2]; }
  if (t >= 125.6) { C1.tip = 0.06 * Math.sin(t * 6); C1.sit = 0; C1.lid = 0.5; }
  cat(ctx, C1);
  // princess and sultan
  const S1 = k14SultanP(t, { x: 820, amp: 0, ph: 0, dir: -1 }), Pr = k14PrincessP(t, { x: 680, amp: 0, ph: 0, dir: -1 });
  const ill = t < 121.76 ? 1 : K.clamp(1 - (t - 121.76) / 0.7);
  k14Ill(Pr, t, ill);
  if (t >= 121.76) { const dd = Math.min(t - 121.76, 0.64); Pr.spinT = 121.76 * 3 + 3 * dd * (1 - dd / 1.28); Pr.spiral = K.clamp((122.45 - t) / 0.25); Pr.pale = K.clamp(1 - (t - 121.76) / 1.2); Pr.lid = Math.max(pulse(t, 122.55, 0.18), pulse(t, 122.85, 0.18)); Pr.mouth = 'closed'; }
  if (t >= 123.14) { Pr.sq = settleTo(t, 123.14, 0.94, 1, 0.4); Pr.mouth = 'smile'; Pr.aL = Pr.aR = undefined; Pr.noBlink = false; }
  S1.wet = true; S1.brow = -0.5; let crot = 0;
  if (t >= 123.78) { S1.eyes = t < 124.2 ? 'wide' : 'open'; S1.mouth = t < 124.4 ? 'o' : 'smile'; S1.brow = -0.2; crot = -0.25 * K.clamp((t - 123.8) / 0.3); }
  if (t >= 125.14) { const u = K.clamp((t - 125.14) / 0.35); Pr.x = K.lerp(680, 742, u); S1.x = K.lerp(820, 792, u); S1.handLW = [Pr.x - 20, 790]; S1.handRW = [Pr.x + 4, 770]; Pr.handLW = [S1.x - 10, 780]; Pr.handRW = [S1.x + 20, 796]; Pr.lid = 0.9; S1.lid = 0.9; }
  k14Act(ctx, S1, t, 61, k14Head(Pr)); k14SultanCrown(ctx, S1, S1, 0, crot);
  k14Act(ctx, Pr, t, 62, t < 123.14 ? null : k14Head(S1));
  // the spirit: recoils, is drawn out, shoots up
  if (t < 121.2) { const h = k14Head(Pr), st = K.clamp((t - 120.18) / 0.4), lift = t > 120.55 ? (t - 120.55) * 2400 : 0;
    k14Wisp(ctx, h[0], h[1] - 10, t, { s: 0.42, r: t >= 119.0 ? 55 : 80, alarm: t >= 119.0 ? 1 : 0, stretch: st, lift, alpha: K.clamp((120.9 - t) / 0.15) }); }
  k14Flash(ctx, t, 120.72);
}

// ---------- S16: the sultan jumps for joy and bear-hugs him ----------
function k14S16(ctx, t) {
  const d = k14Yard(ctx, t, { u: 0.3, door: 1, lamp: 1 });
  k14WellFront(ctx, d.night);
  const C1 = { pal: 0, x: 300, y: 905, s: 0.42, dir: 1, sit: 1, tailUp: 0.6, tailHairs: 0 };
  const lifted = t >= 127.85, P = k14GM(t, { x: lifted ? 450 : 420, dir: 1, mouth: 'smile' });
  if (lifted) { P.y = 900 - 40 * K.clamp((t - 127.85) / 0.2); P.ph = swing(t, 127.9, 1.4, 1.6, 0.6); P.amp = 0.9; P.mouth = 'open'; P.eyes = t < 128.2 ? 'wide' : 'open'; }
  else { P.handR = t < 127.5 ? PERSON_HANDS.chest.R : undefined; }
  const H1 = hop(t, 126.1, 0.5, 0, 0, 70)[1], H2 = hop(t, 126.75, 0.5, 0, 0, 55)[1];
  const S1 = k14SultanP(t, { x: kfn(t, [[127.55, 600], [127.85, 492]]), amp: 0, ph: 0, dir: -1, mouth: 'smile', brow: -0.2 });
  S1.y = 900 - H1 - H2; S1.sq = Math.min(anticipate(t, 125.9, 0.2, 0.1), landSquash(t, 126.6, 0.16), landSquash(t, 127.25, 0.14)); if (t < 127.3 && (H1 > 0 || H2 > 0)) { S1.aL = K14_UP.aL; S1.aR = K14_UP.aR; S1.mouth = 'open'; }
  if (lifted) { S1.handLW = [P.x - 30, 810]; S1.handRW = [P.x + 30, 790]; S1.mouth = 'open'; }
  const Pr = k14PrincessP(t, { x: 760, amp: 0, ph: 0, mouth: 'smile' });
  if (t >= 128.54) { Pr.handR = PERSON_HANDS.mouthCover.R; Pr.handL = PERSON_HANDS.mouthCover.L; Pr.eyes = 'shut'; Pr.x += tremble(t, 1.2); }
  C1.gaze = lookAt([C1.x + 60, 820], [P.x, P.y]);
  cat(ctx, C1);
  k14Act(ctx, Pr, t, 62, k14Head(S1));
  if (lifted) { k14Act(ctx, P, t, 1, k14Head(S1)); k14Act(ctx, S1, t, 61, k14Head(P)); }
  else { k14Act(ctx, P, t, 1, k14Head(S1)); k14Act(ctx, S1, t, 61, [600, 500]); }
  // crown floats behind each jump and wobbles back on
  const lagLift = (hop(t - 0.12, 126.1, 0.5, 0, 0, 92)[1] + hop(t - 0.12, 126.75, 0.5, 0, 0, 74)[1]) - (H1 + H2);
  k14SultanCrown(ctx, S1, S1, Math.max(0, lagLift), swing(t, 126.72, 0.25, 2.2, 3) + swing(t, 127.37, 0.2, 2.2, 3));
}

// ---------- yard lettering ----------
function k14YardOver(ctx, t, cam, S) {
  k14Label(ctx, S, t, 'OLD WELL', 780, 600, cam, 55.9, 57.1); k14Arrow(ctx, S, t, [780, 630], [780, 790], cam, 55.95, 57.1, { bend: 0.05 });
  k14Word(ctx, S, t, 'SHOVE!', 700, 640, cam, 60.6, 61.6, 120);
  k14Word(ctx, S, t, 'DOWN HERE!', 800, 590, cam, 102.62, 103.7, 120);
  k14Label(ctx, S, t, 'THE SULTAN', 560, 540, cam, 109.58, 110.9); k14Arrow(ctx, S, t, [580, 570], [570, 640], cam, 109.62, 110.9, { bend: 0.1 });
  if (t >= 114.5 && t < 116.5) { const H = countedBeats(t, K14_PLUCK); ctx.save(); ctx.globalAlpha = K.clamp((116.5 - t) / 0.2); S.counter(ctx, H.n, 820, 300, 1, { size: 110 }); ctx.restore(); }
  if (t >= 117.22 && t < 118.9) k14Inset(ctx, 230, 280, 165, K.clamp((t - 117.22) / 0.35) * K.clamp((118.9 - t) / 0.2), (c) => {
    wellShaft(c); c.save(); c.globalAlpha = 0.5; c.fillStyle = NAVY2; c.fillRect(0, 0, 1000, 1230); c.restore();
    const G = k14GM(115, { x: 600, y: 1186, s: 0.85, dir: -1, tip: -0.1, handR: PERSON_HANDS.cupEar.R, mouth: 'closed', noBlink: true, gaze: [-1, 0] }); k14Person(c, G);
    soundArcs(c, 560, 1060, 1, t); }, { scale: 0.8, at: [600, 1080], bg: NAVY2 });
  k14Word(ctx, S, t, 'POOF!', 800, 470, cam, 120.4, 121.6, 110);
  k14Label(ctx, S, t, 'CURED!', 680, 560, cam, 123.14, 124.6);
  if (t >= 123.14 && t < 124.4) k14Spark(ctx, t, 123.14, ...k14P(680, 700, cam), 4, 90, 1.2);
  k14Word(ctx, S, t, 'HA HA!', 720, 520, cam, 128.54, 129.6, 100);
}
