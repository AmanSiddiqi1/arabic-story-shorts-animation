// ===== AN-084 desert half (S1-S6, 0.0-89.64): the hunt, the meeting, the drought cloud, the price ladder, the donkey threat, the ride off =====
// Strip world 2400 x 1230, ground y 900. Horse (Ma'an) faces right at x 1560, donkey (Bedouin) faces left at x 1920 (v2: 70 further right so the two muzzles are truly nose to nose).
const AN84_SW = 2400, AN84_HS = 1.0, AN84_DS = 0.9, AN84_MPS = 0.95, AN84_BPS = 0.9;
// Ma'an: one face in both halves (caliph body: full black beard, age 0.3, blue robe); desert = red head cloth, no cape
const AN84_MAAN_D = { costume: 'caliph', age: 0.3, seed: 11, pal: { robe: C.blue, dot: NAVY, head: 'keffiyeh', hc: C.red, hd: '#ff8a7a', cape: null, belly: 0, trim: C.yellow, sash: C.yellow } };
const AN84_MAAN_P = { costume: 'caliph', age: 0.3, seed: 11, pal: { robe: C.blue, dot: NAVY, cape: C.red, capeDot: '#a8160f', belly: 0.3 } };
const AN84_BED = { costume: 'bedouin', age: 0.5, seed: 23, pal: { shoes: 'bare' } };
// price ladder in the desert: pops on the spoken numbers (1000 and 500 on measured onsets), column right-aligned at strip x 2000
const AN84_POPS_D = [51.09, 57.94, 65.04, 67.04, 68.88, 70.26, 72.48];

// ---------- travel ----------
const an84HX = (t) => (t < 86.5 ? kfn(t, [[2.75, 300], [3.3, 370], [3.8, 500], [7.2, 1490], [7.8, 1550], [8.3, 1560]], 'lin') : kfn(t, [[86.75, 1560], [88.5, 2760]], 'in'));
const an84DX = (t) => kfn(t, [[8.96, 2380], [11.86, 1920]], 'out');
const an84GX = (t) => kfn(t, [[2.5, 560], [4.0, 900], [6.66, 1720], [7.0, 1880]], 'lin');
const AN84_FALLS_H = [...footfalls(an84HX, 2.75, 8.3, GAIT.horse * AN84_HS), ...footfalls(an84HX, 86.75, 88.5, GAIT.horse * AN84_HS)];
const AN84_FALLS_D = footfalls(an84DX, 8.96, 11.86, GAIT.donkey * AN84_DS);
const AN84_BOUNDS = [2.9, 3.62, 4.3, 4.9, 5.45, 5.95, 6.4, 6.8];   // gazelle landings

// ---------- the horse ----------
function an84HorseD(t) {
  const W = walk(an84HX, t, { stride: GAIT.horse * AN84_HS }), lane = an84E(t, 86.45, 0.5), P = { ...W, y: 900 + 34 * lane, s: AN84_HS * (1 + 0.06 * lane), dir: 1, pal: 0, seed: 31, earL: 0.6, earR: 0.6 };   // v2: nearer lane for the gallop past the donkey
  P.gallop = K.clamp(W.amp * 2.2 - 0.6);
  P.rear = 0.35 * pulse(t, 2.35, 0.55) + 0.3 * pulse(t, 86.2, 0.55);
  if (P.gallop > 0.2) { P.earL = P.earR = -0.5; P.tailUp = 0.8 * P.gallop; }
  if (an84In(t, 7.9, 8.6)) P.snort = pulse(t, 7.9, 0.7);
  P.headDown = 0.4 * an84Env(t, 11.9, 13.3, 0.3) + 0.25 * an84Env(t, 8.1, 9.0, 0.3);
  P.headTurn = 0.95 * an84Env(t, 34.3, 35.7, 0.3);
  if (an84In(t, 34.3, 35.7)) { P.earL = 0.9; P.earR = -0.2; P.lid = Math.max(0.15, blink(t, 31)); }
  if (an84In(t, 51.44, 52.6)) P.earL = P.earR = -0.9;
  if (an84In(t, 59.4, 84.1)) P.tailSwish = 0.8 * Math.sin(t * 3.1);
  if (an84In(t, 81.78, 86.2)) P.tailSwish = Math.sin(t * 9);
  if (t >= 86.2) { P.earL = P.earR = 0.9; }
  return P;
}
// ---------- Ma'an on the horse ----------
const AN84_M_TALK = [[15.2, 16.0], [16.62, 19.2], [41.02, 42.6], [45.58, 48.7], [52.24, 56.3], [59.44, 62.1]];
const an84Press = (t0) => [t0, t0 + 0.85, (t) => [72, -142 + 40 * K.ease.inOut(K.clamp((t - t0 - 0.12) / 0.4))]];
const an84MoneyRub = (t) => [44 + 4 * Math.sin(t * 24), -140 + 2 * Math.cos(t * 24)];
function an84MaanD(t, head, bedHead, gazelleHead, cloud) {
  const P = { ...AN84_MAAN_D, s: AN84_MPS, mouth: 'closed', brow: 0 };
  const R = an84Track(t, [[0.3, 2.55, [22, -222]], [2.6, 4.6, [100, -150]], [8.35, 9.5, [62, -100]], [15.2, 16.3, [58, -205]], [17.58, 18.3, [100, -150]], [18.3, 19.7, [62, -104]],
    [33.75, 36.3, [10, -172]], [38.8, 40.7, (tt) => [18 + 6 * Math.sin(tt * 7), -148]], [45.58, 46.6, an84MoneyRub], [46.6, 47.5, [100, -160]],
    [53.62, 54.8, (tt) => [70 + 16 * Math.sin(tt * 9), -140]], [54.8, 56.4, (tt) => [72, -142 + 40 * K.ease.inOut(K.clamp((tt - 54.8) / 1.4))]],
    an84Press(59.5), an84Press(61.4), an84Press(66.6), an84Press(68.2), an84Press(69.7), an84Press(71.1), [73.46, 76.9, [72, -146]],
    [84.12, 86.5, (tt) => [56, -88 - 22 * Math.abs(Math.sin(tt * 9))]], [86.96, 88.6, (tt) => [60 + 8 * Math.sin(tt * 12), -198]]], AN84_REINS.R);
  const L = an84Track(t, [[8.35, 9.5, [-62, -100]]], AN84_REINS.L);
  P.handR = R; P.handL = L;
  // gaze
  let g = lookAt(head, bedHead);
  if (t < 2.6) g = gazePlan(t, [[0, [1, 0.1]], [0.7, [-0.4, 0]], [1.3, [0.7, -0.1]], [1.95, [1, 0.25]]], 0.07);
  else if (t < 8.1) g = lookAt(head, gazelleHead);
  else if (t < 9.62) g = [-1, 0];
  else if (cloud && (an84In(t, 21.8, 24.5) || an84In(t, 26.0, 29.0) || an84In(t, 31.2, 33.3) || an84In(t, 37.9, 38.8))) g = lookAt(head, cloud);
  if (an84In(t, 33.4, 33.75) || an84In(t, 42.7, 43.1)) g = [0, 0.05];
  if (t >= 86.9) g = [-1, -0.1];
  P.gaze = g;
  // face and body
  if (an84In(t, 0.3, 2.6)) P.brow = -0.3;
  if (an84In(t, 2.6, 8.1)) { P.brow = 0.6; P.mouth = 'smile'; P.tip = 0.12 * an84Env(t, 2.6, 8.1, 0.3); }
  if (an84In(t, 8.1, 9.62)) { P.brow = -0.5; P.drop = 4 * an84Env(t, 8.1, 9.6, 0.3); }
  if (an84In(t, 9.62, 20.0)) { P.brow = -0.4; P.mouth = 'smile'; }
  if (an84In(t, 15.2, 16.3)) { P.tip = 0.05; P.drop = 3; P.lid = 0.2; }
  if (an84In(t, 17.58, 19.7)) { P.brow = -0.5; P.tilt = -0.06; }
  if (an84In(t, 20.0, 41.0)) { P.brow = -0.4; P.lid = 0.25; }
  if (an84In(t, 24.6, 25.6)) { P.drop = 5 * Math.sin((t - 24.6) * Math.PI * 2) ** 2; P.tilt = 0.05; }
  if (an84In(t, 25.05, 25.35)) P.lid = 1;
  if (an84In(t, 33.4, 33.75)) { P.brow = -0.8; P.lid = 0; P.eyes = 'wide'; }
  if (an84In(t, 33.75, 36.3)) { P.lid = 0.4; P.brow = -0.3; }
  if (an84In(t, 38.8, 41.0)) { P.mouth = 'smile'; P.lid = 0.3; }
  if (an84In(t, 41.02, 42.6)) P.tip = 0.08 * an84Env(t, 41.02, 42.6, 0.3);

  if (an84In(t, 45.58, 48.0)) { P.brow = -0.5; P.tilt = 0.05; }
  if (an84In(t, 51.44, 52.24)) { P.tip = -0.1 * an84Env(t, 51.44, 52.24, 0.12); P.mouth = 'o'; P.brow = -1; P.eyes = 'wide'; }
  if (an84In(t, 52.24, 53.62)) { P.lid = 0.5; P.sq = 1.03; }
  if (an84In(t, 53.62, 56.4)) P.brow = 0.4;
  if (an84In(t, 56.4, 59.4)) { P.lid = 0.3; P.brow = 0.2; if (an84In(t, 58.2, 58.7)) P.mouth = 'smile'; }
  if (an84In(t, 59.44, 73.4)) { P.lid = 0.35; P.brow = 0.25; P.bob = 2 * K.clamp((t - 59.44) / 13); }
  if (an84In(t, 73.46, 74.1)) P.brow = -0.6;
  if (an84In(t, 74.1, 78.3)) { P.brow = -0.5; P.mouth = 'o'; }
  if (an84In(t, 78.3, 81.78)) { P.brow = -0.4; P.lid = 0.3; }
  if (an84In(t, 81.78, 84.12)) { P.eyes = t < 82.4 ? 'wide' : 'open'; P.lid = t < 82.4 ? 0 : 0.5; P.brow = -0.6; P.sq = 1.03; P.lurch = 0.025 * Math.sin(t * 55) * K.clamp((t - 82.2) / 1.2); P.mouth = 'smile'; }
  if (an84In(t, 84.12, 89.7)) { P.mouth = 'open'; P.lid = 0.9; P.tip = -0.12 * an84Env(t, 84.12, 86.6, 0.2); P.lurch = 0.03 * Math.sin(t * 50); if (t > 86.6) { P.lid = 0.3; P.mouth = 'smile'; } }
  P.talk = talk(t, AN84_M_TALK, 0.4) * 0.8; if (an84In(t, 84.12, 86.6)) P.talk = 0;
  an84Aside(P, t, 42.64);   // the SHH aside (same pose function as the throne wink at 130.13)
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 11));
  return P;
}

// ---------- the donkey ----------
function an84DonkeyD(t) {
  const W = walk(an84DX, t, { stride: GAIT.donkey * AN84_DS }), P = { ...W, y: 900, s: AN84_DS, dir: -1, pal: 0, seed: 41, earL: 0.55, earR: 0.55, lid: 0.35 };
  if (W.amp > 0.1) { P.earL = 0.3 + 0.5 * Math.sin(W.ph * 2); P.earR = 0.3 - 0.5 * Math.sin(W.ph * 2); }
  if (an84In(t, 11.86, 12.5)) { P.earL = P.earR = 1; P.tip = -0.05 * an84Env(t, 11.86, 12.6, 0.15); P.lid = 0; }
  if (an84In(t, 12.5, 20)) { P.earL = 1; P.earR = 0.2; P.lid = 0.2; }
  if (an84In(t, 29.3, 30.7)) { P.neck = 0.6 * an84Env(t, 29.3, 30.7, 0.3); P.lid = 0; }
  if (an84In(t, 47.4, 49.0)) P.earR = 0.55 + 0.5 * Math.abs(Math.sin((t - 47.4) * 6));
  if (an84In(t, 50.78, 52.0)) P.headDown = 0.35 * Math.abs(Math.sin((t - 50.78) * 5));
  if (an84In(t, 56.5, 57.9)) { P.headTurn = 0.9 * an84Env(t, 56.5, 57.9, 0.25); P.lid = 0; }
  const droop = t < 65 ? 0 : t < 68.88 ? 0.3 : t < 70.26 ? 0.6 : t < 74.1 ? 0.85 : 0;
  if (t >= 59.4 && t < 74.1) { P.earL = P.earR = 0.55 - 1.1 * droop; P.sag = droop * 0.6; }
  if (an84In(t, 74.1, 80.42)) { P.earL = P.earR = 1; P.lid = 0.1; }
  if (an84In(t, 80.42, 84.12)) { P.earL = P.earR = 1; P.neck = 0.5; P.mouth = 'grit'; P.lid = 0.3; }
  if (an84In(t, 86.7, 87.9)) { P.earL = P.earR = -0.9; P.lid = 0.6; P.tip = -0.04 * an84Env(t, 86.7, 87.9, 0.2); }   // ears flat as the horse thunders past
  if (an84In(t, 85.0, 86.6)) { P.headTurn = 0.9 * an84Env(t, 85.2, 86.6, 0.25); P.earL = 0.9 * Math.sin((t - 85) * 5); P.earR = -P.earL; P.lid = 0; }
  if (t >= 88.4) { P.headTurn = 0.9 * an84E(t, 88.4, 0.4); P.earL = P.earR = 0.8; P.lid = 0; }
  P.lid = Math.max(P.lid || 0, blink(t, 41));
  return P;
}
// ---------- the Bedouin on the donkey (dir -1: local +x = toward Ma'an) ----------
const AN84_B_TALK = [[20.04, 24.9], [25.74, 30.6], [30.98, 34.9], [36.22, 39.6], [49.6, 51.9], [57.94, 58.9], [65.04, 65.6], [67.04, 67.8], [68.88, 69.5], [70.26, 71.0], [72.48, 73.9], [74.1, 78.3], [78.98, 83.9]];
const an84ArmsWide = (t0, t1) => [[t0, t1, [96, -162]], [t0, t1, [-96, -162]]];
function an84BedD(t, head, maanHead, cloud, tagHead) {
  const P = { ...AN84_BED, s: AN84_BPS, mouth: 'smile', brow: 0 };
  const wide = an84ArmsWide(49.04, 52.6);
  const R = an84Track(t, [[16.06, 17.4, [4, -120]], [19.5, 20.6, [44, -206]], [20.6, 24.2, (tt) => [70, -122 + 12 * Math.sin(tt * 4)]], [24.3, 25.6, [46, -208]],
    [26.0, 28.7, (tt) => [72, -150 + 10 * Math.sin(tt * 5)]], [28.98, 31.0, [56, -214]], [31.0, 33.3, [90, -160]], [36.22, 36.9, [42, -200]], [36.9, 38.7, [96, -150]],
    [47.4, 49.0, (tt) => [16, -158 + 6 * Math.abs(Math.sin((tt - 47.4) * 6))]], wide[0], [57.94, 59.4, [62, -202]], [65.04, 66.5, [46, -206]], [67.04, 68.6, [46, -206]],
    [68.88, 69.9, (tt) => [26 + 22 * K.clamp((tt - 69.0) / 0.6), -214]], [70.26, 71.0, [62, -192]], [71.1, 72.48, [20, -112]],
    [74.1, 76.78, [72, -206]], [76.78, 77.6, (tt) => [44 + 14 * Math.sin(tt * 18), -206]], [77.6, 78.3, [30, -224]], [78.32, 80.3, [44, -212]], [80.42, 81.6, [70, -60]],
    [83.32, 84.4, [62, -100]], [87.58, 88.2, (tt) => [70 + 16 * Math.sin(tt * 14), -168]], [88.2, 89.0, [34, -178]]], AN84_REINS.R);
  const L = an84Track(t, [[14.3, 15.1, (tt) => [-64, -78 - 8 * Math.abs(Math.sin(tt * 10))]], [31.0, 33.3, [60, -150]], [36.9, 38.7, [-96, -150]], [44.7, 45.6, [-64, -76]],
    wide[1], [71.1, 72.48, [-20, -112]], [83.32, 84.4, [-62, -100]]], AN84_REINS.L);
  P.handR = R; P.handL = L;
  let g = lookAt(head, maanHead);
  if (t < 11.86) g = [-1, 0.25];
  if (cloud && (an84In(t, 21.6, 24.2) || an84In(t, 25.74, 28.9) || an84In(t, 30.98, 33.2) || an84In(t, 37.8, 38.6) || an84In(t, 78.3, 79.6))) g = lookAt(head, cloud);
  if (an84In(t, 44.7, 45.6) || an84In(t, 80.42, 81.6)) g = [0.6, 0.8];
  if (an84In(t, 47.4, 49.0)) g = gazePlan(t, [[47.4, [-0.4, -1]], [47.8, [0.3, -0.9]], [48.3, [-0.6, -0.8]]], 0.07);
  if (an84In(t, 55.74, 56.3) && tagHead) g = lookAt(head, tagHead);
  if (an84In(t, 56.38, 57.94)) g = gazePlan(t, [[56.38, lookAt(head, tagHead || head)], [56.8, lookAt(head, maanHead)], [57.2, [0.7, 0.7]], [57.6, lookAt(head, maanHead)]], 0.07);
  if (an84In(t, 67.04, 67.6)) g = [0.7, 0.7];
  if (an84In(t, 85.6, 86.4)) g = [0.7, 0.7];
  if (t >= 86.5) g = lookAt(head, [maanHead[0] + 60, maanHead[1]]);   // follows the horse as it gallops past
  P.gaze = g;
  if (an84In(t, 8.9, 11.86)) { P.lid = 0.3; P.bob = 3 * Math.abs(Math.sin(t * 8)); }
  P.lurch = lurch(t, 11.86, 0.22);
  if (an84In(t, 14.3, 15.2)) { P.lid = 0.4; P.tilt = 0.05; }
  if (an84In(t, 16.06, 17.4)) P.drop = 5 * pulse(t, 16.06, 0.6);
  if (an84In(t, 19.5, 20.1)) { P.sq = 1 + 0.04 * an84Env(t, 19.5, 20.1, 0.15); P.brow = -0.3; P.lid = 0; }
  if (an84In(t, 23.68, 25.7)) { P.brow = 0.3; P.lid = 0.4; P.mouth = 'frown'; }
  if (an84In(t, 28.98, 33.3)) { P.lid = 0.3; P.tilt = -0.04; }
  if (an84In(t, 36.22, 38.7)) { P.eyes = 'wide'; P.tip = 0.06; }
  if (an84In(t, 44.7, 45.6)) P.mouth = 'smile';
  if (an84In(t, 47.4, 49.0)) P.mouth = 'closed';
  if (an84In(t, 49.04, 52.6)) { P.sq = an84In(t, 49.04, 50.5) ? 1 + 0.05 * an84E(t, 49.04, 0.5) : 1.05 - 0.03 * an84E(t, 50.5, 0.4); P.brow = -0.4; P.tilt = -0.05; }
  if (an84In(t, 56.38, 57.94)) { P.mouth = 'closed'; P.lid = 0.2; P.brow = 0.2; P.sq = 1 - 0.03 * pulse(t, 57.5, 0.35); }
  if (an84In(t, 57.94, 59.4)) P.mouth = 'smile';
  const notch = t < 62.18 ? 0 : t < 70.26 ? 0.02 : 0.05;
  if (an84In(t, 62.18, 74.1)) { P.sq = 1 - notch; P.brow = 0.3; P.drop = notch * 120; }
  if (an84In(t, 67.04, 68.88)) P.mouth = 'closed';
  if (an84In(t, 70.26, 71.1)) { P.lid = 0.5; P.mouth = 'frown'; }
  if (an84In(t, 71.1, 72.48)) { P.lid = 1; P.brow = 0.6; P.sq = 1.04; P.mouth = 'closed'; }
  if (an84In(t, 72.48, 74.1)) { P.lid = 0; P.wink = 'R'; P.mouth = 'closed'; P.brow = 0.4; }
  if (an84In(t, 74.1, 78.3)) { P.brow = 1; P.sq = settleTo(t, 74.1, 1, 1.06, 0.35, 0.15) - 0.06 * an84E(t, 75.0, 0.5); P.mouth = 'closed'; P.tilt = -0.04; P.drop = -4; }
  if (an84In(t, 78.32, 83.32)) { P.lid = 0.4; P.brow = 0.5; P.mouth = 'smile'; }
  if (an84In(t, 83.32, 84.6)) { P.brow = -0.8; P.lid = 0.4; P.tilt = 0.08; }
  if (an84In(t, 84.6, 86.5)) { P.brow = -0.7; P.mouth = 'o'; }
  if (an84In(t, 86.9, 88.2)) { P.lid = 0.7; P.mouth = 'o'; P.tilt = -0.06 * an84Env(t, 87.3, 88.1, 0.15); }
  if (an84In(t, 88.0, 88.9)) { P.lid = 1; P.sq = 1 - 0.04 * Math.abs(Math.sin((t - 88.0) * 14)); P.drop = 4 * Math.abs(Math.sin((t - 88.0) * 14)); }   // coughs in the dust
  if (an84In(t, 88.2, 89.7)) { P.mouth = 'open'; }
  P.talk = talk(t, AN84_B_TALK, 1.3) * 0.75;
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 23));
  return P;
}
// ---------- the gazelle ----------
function an84Gazelle(ctx, t) {
  if (t > 7.75) return;
  let x = t < 2.5 ? 560 : an84GX(t), lift = 0, sc = 0.6, a = 1;
  const P = { y: 900, s: sc, dir: 1, seed: 51, eyes: 'open' };
  if (t < 1.9) { P.graze = 1; }
  else if (t < 2.5) { P.sq = 0.9 + 0.2 * an84E(t, 2.3, 0.2); P.gaze = [-0.8, 0]; }
  else if (t < 7.0) { const u = (x - 560) / 160; lift = 62 * Math.abs(Math.sin(Math.PI * u)); Object.assign(P, walk(an84GX, t, { stride: 26 * sc })); P.amp = 1; P.sq = lift > 10 ? 1.1 : 0.94; P.gaze = [1, 0]; }
  else { const u = K.clamp((t - 7.0) / 0.6); x = K.lerp(1880, 2000, u); lift = 160 * Math.sin(Math.PI * Math.min(u, 0.5)) + 40 * u; sc = 0.6 - 0.3 * u; a = 1 - K.clamp((u - 0.5) / 0.5); P.amp = 1; P.ph = u * 3; P.sq = 1.1; }
  P.x = x; P.y = 900 - lift; P.s = sc; P.alpha = a;
  deer(ctx, P);
  return [x + 60 * sc, 900 - lift - 230 * sc];
}
// ---------- Ma'an's two men on the far crest ----------
function an84Men(ctx, t) {
  if (t > 9) return;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1400, 712); ctx.clip();
  [[250, 0, C.red], [320, 1, C.yellow]].forEach(([x0, i, col]) => {
    const tt = t - 4.14 - stagger(i, 0.13), away = Math.max(0, tt), s = 0.4 - 0.12 * K.clamp(away / 3), x = x0 - 40 * away;
    const wave = an84In(tt, 0, 1.6) ? Math.sin(tt * 14) * 0.3 : 0;
    person(ctx, { x, y: 740, s, costume: 'servant', seed: 60 + i, pal: { robe: col, dot: i ? C.red : '#a8160f' }, aR: [2.5 + wave, 2.7 + wave], gaze: [1, 0] });
    seg(ctx, x + 30 * s, 740 - 260 * s + wave * 20 * s, x + 26 * s, 740 - 60 * s, 3, C.black, 0);
  });
  ctx.restore();
}
// ---------- the thought clouds (inside drawn in world units, at [500, 700] x scale) ----------
function an84CloudDrought(c, t) {
  c.fillStyle = '#ffe9a8'; c.fillRect(-400, 200, 1800, 1100);
  const sp = 1 + 0.12 * pulse(t, 24.3, 0.3) + 0.12 * pulse(t, 24.75, 0.3), wet = K.clamp((t - 25.74) / 1.0);
  c.save(); c.globalAlpha = 1 - 0.6 * wet; shape(c, ell(250, 420, 130 * sp, 130 * sp, 30), C.yellow, { lw: 8, seed: 70, dot: C.red, pitch: 12, rad: 0.25, da: 0.6 });
  c.lineWidth = 8; c.strokeStyle = '#e2701a'; for (let k = 0; k < 3; k++) { c.beginPath(); for (let x = 420; x < 1100; x += 20) c.lineTo(x, 380 + k * 70 + 12 * Math.sin(x * 0.04 + t * 6)); c.stroke(); } c.restore();
  shape(c, [[-400, 860], [1400, 860], [1400, 1300], [-400, 1300]], '#e0a13a', { lw: 6, seed: 71, dot: C.red, pitch: 12, rad: 0.2, da: 0.4 });
  c.lineWidth = 6; c.strokeStyle = C.black; const r = K.rng(72); for (let k = 0; k < 9; k++) { let x = -200 + k * 170, y = 880; c.beginPath(); c.moveTo(x, y); for (let j = 0; j < 4; j++) { x += 30 * (r() - 0.5) * 3; y += 60; c.lineTo(x, y); } c.stroke(); }
  if (t < 26.8) { c.lineWidth = 7; c.strokeStyle = '#7a4212'; c.beginPath(); c.moveTo(860, 860); c.quadraticCurveTo(900, 760, 840, 720); c.stroke(); }
  if (wet > 0) { // rain cloud slides in, rain, the ground greens left to right
    const cx = K.lerp(1300, 520, an84E(t, 25.74, 0.6)); cloudFlat(c, cx, 330, 1.2);
    if (t < 27.4) { c.lineWidth = 6; c.strokeStyle = C.blue; for (let k = 0; k < 14; k++) { const x = cx - 200 + k * 30, y = 420 + ((t * 600 + k * 53) % 400); c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 40); c.stroke(); } }
    c.save(); c.beginPath(); c.rect(-400, 855, K.lerp(0, 1800, wet), 450); c.clip(); shape(c, [[-400, 860], [1400, 860], [1400, 1300], [-400, 1300]], '#7cc56a', { lw: 6, seed: 73, dot: AN84_GREEND, pitch: 12, rad: 0.2, da: 0.5 }); c.restore();
  }
  if (t >= 26.8) for (let k = 0; k < 3; k++) { const g = an84E(t, 26.8 + k * 0.25, 0.6), vx = 120 + k * 330; if (g <= 0) continue;
    c.lineWidth = 12; c.strokeStyle = C.black; c.lineCap = 'round'; c.beginPath(); c.moveTo(vx, 870); c.bezierCurveTo(vx + 40, 870 - 120 * g, vx + 150 * g, 840 - 160 * g, vx + 220 * g, 860 - 90 * g); c.stroke(); c.lineWidth = 6; c.strokeStyle = AN84_GREEN; c.stroke();
    for (let j = 0; j < 2; j++) { const pp = K.clamp((t - 28.98 - (k * 2 + j) * 0.12) / 0.25); if (pp > 0) an84Cucumber(c, vx + 70 + j * 110, 850 - j * 40, 1.6 * K.ease.back(pp), 0.4 - j * 0.6); } }
  const stand = an84E(t, 26.8, 0.5), hd = 6 * (1 - stand);
  person(c, { x: 620, y: 900, s: 1.15, ...AN84_BED, seed: 24, kneel: 1 - stand, drop: hd, wet: t < 25.9, mouth: stand > 0.5 ? 'open' : 'frown', gaze: stand > 0.5 ? [0, -1] : [0, 1],
    ...(stand > 0.5 ? { aL: [-2.5, -2.8], aR: [2.5, 2.8] } : { handL: PERSON_HANDS.palmsUp.L, handR: PERSON_HANDS.palmsUp.R }) });
  if (t < 26.8) { const r2 = K.rng(74); c.fillStyle = '#c98a3a'; for (let k = 0; k < 6; k++) { const u = ((t * 1.5 + k / 6) % 1); c.beginPath(); c.arc(600 + 60 * (r2() - 0.5), 840 + 70 * u, 6, 0, 7); c.fill(); } }
}
function an84CloudEmir(c, t) {
  c.fillStyle = '#cfe0ff'; c.fillRect(-400, 200, 1800, 1100);
  c.fillStyle = dotPat(c, C.white, 14, 0.3); c.fillRect(-400, 200, 1800, 1100);
  c.save(); c.filter = 'brightness(0)'; c.save(); c.translate(420, 900); c.scale(1.5, 1.5); c.translate(-420, -900); an84ThroneBack(c, 420, 900); person(c, { x: 420, y: 888, s: 1.4, costume: 'caliph', seed: 71, sit: 1, seat: 'bench', handR: [96, -150], noBlink: true, lid: 0 }); an84ThroneArms(c, 420, 900); c.restore(); c.restore();
  const hx = 420 + 22 * 2.1, hy = 900 - (12 + 172 * 1.4) * 1.5;
  shape(c, [[hx - 70, hy - 50], [hx - 80, hy - 140], [hx - 40, hy - 95], [hx, hy - 160], [hx + 40, hy - 95], [hx + 80, hy - 140], [hx + 70, hy - 50], [hx - 70, hy - 50]], C.yellow, { lw: 8, seed: 75, dot: C.red, pitch: 10, rad: 0.2, da: 0.5 });
  c.font = K.font(110, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.yellow; c.fillText('?', hx, hy + 10);
  const hand = [420 + 1.5 * 1.4 * (96 - 22), 900 - 1.5 * (12 + 1.4 * (150 - 23))];
  for (let k = 0; k < 10; k++) { const u = ((t * 0.9 + k / 10) % 1), x = hand[0] + 20 * Math.sin(k * 2.1), y = hand[1] + u * 300; an84Coin(c, x + (t > 37.8 ? u * 240 : 0), y, 16, Math.cos(t * 6 + k)); }
  if (t > 37.8) { person(c, { x: 850, y: 900, s: 1.1, ...AN84_BED, seed: 25, kneel: 1, handL: PERSON_HANDS.reachBoth.L, handR: PERSON_HANDS.reachBoth.R, mouth: 'smile', gaze: [-0.7, -0.7], dir: -1 });
    for (let k = 0; k < 3; k++) { const u = K.clamp((t - 38.0 - k * 0.3) / 1.4); if (u > 0 && u < 1) heart(c, 820 + k * 60, 620 - u * 260, 30, { alpha: 1 - u }); } }
}
function an84CloudHall(c, t) {
  palaceHall(c, { t, cushions: [] });
  const u = K.clamp((t - 80.42) / 2.6), x = K.lerp(140, 520, u), xf = (tt) => K.lerp(140, 520, K.clamp((tt - 80.42) / 2.6));
  for (let k = 0; k < 6; k++) { const px = 200 + k * 60; if (px < x - 40) { c.fillStyle = '#7a4212'; c.beginPath(); c.ellipse(px, 930 + (k % 2) * 12, 9, 5, 0, 0, 7); c.fill(); } }
  const DP = { ...walk(xf, t, { stride: GAIT.donkey }), y: 930, s: 1, dir: 1, seed: 44, earL: 1, earR: 1, mouth: 'smile' };
  if (t < 80.42) DP.amp = 0;
  rideOn(c, 'donkey', DP, { ...AN84_BED, seed: 26, mouth: 'smile', gaze: [1, -0.2] });
}
