// ===== AN-084 palace half (S7-S12, 89.64-178.6): the guard, the arrival, the throne, the second ladder, the recognition, the door gag, the laugh, the payment =====
// Hall world 1000 x 1230, floor y 900, raised dais x 560..900 top 800 (status: the prince's head about 95 above the Bedouin's), own throne at x 730.
const AN84_DAIS = 800, AN84_TX = 730, AN84_SITY = AN84_DAIS - 12;
const AN84_POPS_H = [116.16, 119.1, 120.0, 120.9, 121.8, 122.6, 125.06];
const AN84_DROPS = [164.12, 164.98, 166.16, 167.52, 168.46, 169.32, 170.12];
const an84ColH = (i) => [360 + i * 36, AN84_COLY[i]];   // mirror of the desert staircase
const an84RowX = (i) => 215 + i * 98;
const AN84_PILE = [560, 900];

// ---------- throne tip (radians, + = backward for a prince facing left) about the rear base point ----------
const an84ThroneRot = (t) => (t < 149.0 ? 0 : t < 149.9 ? 0.105 * an84E(t, 149.0, 0.4, 'out') : t < 150.5 ? 0.105 * (1 - an84E(t, 149.9, 0.35, 'in')) - 0.02 * pulse(t, 150.2, 0.3) : 0);
const AN84_PIVOT = [AN84_TX + 80, AN84_DAIS];

// ---------- the prince ----------
const AN84_P_TALK = [[92.16, 95.6], [112.32, 115.0], [118.2, 121.1], [150.9, 151.4], [154.1, 162.3]];
const an84MaanX7 = (t) => kfn(t, [[89.64, 690], [90.5, 470]], 'out');
function an84MaanHall(t, bedHead, guardHead, treasHead) {
  const seated = t >= 96.32;
  const P = { ...AN84_MAAN_P, mouth: 'smile', brow: 0 };
  let head;
  if (!seated) {
    Object.assign(P, walk(an84MaanX7, t, { stride: 24 })); P.y = 900; P.s = 1; P.dir = -1; head = [P.x, 900 - 189];
    P.handR = an84Track(t, [[92.16, 93.8, (tt) => [70 + 30 * Math.sin(tt * 7), -150]], [93.88, 95.0, [70, -168]], [95.02, 95.9, (tt) => [44, -214 - 6 * Math.abs(Math.sin(tt * 12))]]], AN84_REST.R);
    P.handL = an84Track(t, [[93.88, 95.0, [-10, -160]], [95.02, 95.9, (tt) => [-44, -214 - 6 * Math.abs(Math.sin(tt * 12 + 1))]]], AN84_REST.L);
    P.gaze = lookAt(head, guardHead);
    if (an84In(t, 92.16, 95.9)) { P.tip = 0.06; P.brow = -0.5; P.lid = 0.3; }
    P.talk = talk(t, AN84_P_TALK, 0.4) * 0.8;
  } else {
    P.x = AN84_TX; P.y = AN84_SITY; P.s = 1; P.dir = -1; P.sit = 1; P.seat = 'bench'; P.mouth = 'closed';
    head = [AN84_TX + 22, AN84_SITY - 166];
    const press = (t0) => [t0, t0 + 0.7, (tt) => [72, -142 + 40 * K.ease.inOut(K.clamp((tt - t0 - 0.1) / 0.3))]];
    P.handR = an84Track(t, [[100.34, 111.9, [72, -104]], [112.32, 113.3, [72, -176]], [113.3, 114.4, an84MoneyRub], an84Press(118.2), press(119.1), press(120.0), press(120.9), press(121.8), press(122.6),
      [127.6, 130.2, [16, -160]], [147.12, 149.0, (tt) => [86, -96 - 16 * Math.abs(Math.sin(tt * 10))]], [149.0, 150.3, [86, -110]], [150.4, 150.9, [22, -196]], [150.9, 151.7, (tt) => [56 - 18 * Math.abs(Math.sin((tt - 150.9) * 7.8)), -150]],
      [154.1, 156.4, [100, -150]], [160.6, 161.1, [76, -182]], [161.1, 161.4, [110, -150]], [161.4, 162.8, PERSON_HANDS.armsOut.R], [173.8, 178.6, (tt) => [62 + 8 * Math.sin(tt * 9), -198]]], [70, -100]);
    P.handL = an84Track(t, [[147.12, 149.0, (tt) => [-80, -96 - 16 * Math.abs(Math.sin(tt * 10 + 1))]], [149.0, 150.3, [-80, -110]], [150.9, 151.7, (tt) => [10 + 18 * Math.abs(Math.sin((tt - 150.9) * 7.8)), -150]],
      [161.4, 162.8, PERSON_HANDS.armsOut.L], [173.8, 178.6, (tt) => [6, -172 + 4 * Math.sin(tt * 8)]]], [-60, -100]);
    P.gaze = lookAt(head, bedHead);
    if (an84In(t, 100.34, 112.3)) { P.lid = 0.3; P.brow = 0.2; P.tilt = -0.03; }
    if (an84In(t, 100.9, 101.6)) P.mouth = 'smile';
    if (an84In(t, 107.2, 109.0)) { P.tilt = -0.06; P.drop = -4; }
    if (an84In(t, 112.32, 113.3)) { P.gaze = [-0.8, -0.4]; P.lid = 0.35; P.brow = -0.3; }
    if (an84In(t, 113.3, 128.78)) { P.lid = 0.4; P.brow = 0.2; }
    if (an84In(t, 116.16, 116.9)) { P.brow = -0.6; P.lid = 0; }
    if (an84In(t, 127.6, 130.2)) { P.tip = 0.12 * an84Env(t, 127.6, 130.6, 0.4); P.lid = 0.45; P.mouth = 'smile'; }
    if (an84In(t, 130.2, 131.08)) { P.wink = an84In(t, 130.3, 130.75) ? 'R' : undefined; P.mouth = 'smile'; P.tip = 0.08; }
    if (an84In(t, 131.08, 137.6)) { P.mouth = 'smile'; P.lid = 0.15; if (an84In(t, 134.4, 134.85)) P.wink = 'R'; }
    if (an84In(t, 137.6, 147.12)) { P.mouth = 'smile'; P.lid = 0.25; }
    if (an84In(t, 141.92, 143.9)) P.gaze = [-1, 0.2];
    if (an84In(t, 147.12, 150.4)) { P.mouth = 'open'; P.lid = 1; P.tip = -0.1 - 0.12 * an84Env(t, 148.8, 150.2, 0.3); P.tilt = 0.08 * Math.sin(t * 9); P.drop = 3 * Math.sin(t * 22); }
    if (an84In(t, 150.4, 150.9)) { P.wet = true; P.mouth = 'smile'; P.lid = 0.3; }
    if (an84In(t, 150.9, 154.1) && treasHead) P.gaze = lookAt(head, treasHead);
    if (an84In(t, 154.1, 157.4)) { P.brow = -0.4; P.mouth = 'smile'; }
    if (an84In(t, 157.4, 160.6)) { P.gaze = [-0.5, -0.9]; P.mouth = 'smile'; P.lid = 0.2; }
    if (an84In(t, 160.6, 162.8)) { P.brow = -0.4; P.tilt = an84In(t, 160.6, 161.1) ? 0.06 * Math.sin(t * 20) : 0; }
    if (an84In(t, 162.8, 173.8)) { P.mouth = 'smile'; P.lid = 0.3; if (an84In(t, 166.5, 167.2)) P.drop = 6 * pulse(t, 166.5, 0.7); }
    if (t >= 173.8) { P.lid = 0.4; P.mouth = an84In(t % 0.5, 0, 0.25) ? 'o' : 'closed'; P.drop = 2 * Math.sin(t * 12); P.gaze = lookAt(head, bedHead); }
    P.talk = talk(t, AN84_P_TALK, 0.4) * 0.8;
  }
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 11));
  return P;
}

// ---------- the Bedouin in the hall (faces right, toward the throne) ----------
const AN84_BH_TALK = [[109.82, 111.4], [115.38, 117.6], [125.06, 126.4], [137.66, 141.9], [143.56, 146.6]];
const an84BedXH = (t) => kfn(t, [[96.32, -90], [97.42, 180], [98.1, 196], [99.14, 430], [110.7, 430], [111.4, 500], [112.0, 500], [112.6, 430], [162.8, 430], [163.4, 396], [172.34, 396], [174.3, 186]], 'inOut');
const an84BrowWipe = (t0) => [t0, t0 + 1.0, (tt) => [26 + 22 * K.clamp((tt - t0 - 0.12) / 0.6), -214]];
function an84BedHall(t, maanHead, tagPt) {
  const P = { ...AN84_BED, s: 0.95, y: 900, dir: 1, mouth: 'smile', brow: 0 };
  const W = walk(an84BedXH, t, { stride: 20 }); Object.assign(P, W); if (t >= 172.34) P.dir = -1;
  if (an84In(t, 98.1, 99.14)) P.amp = W.amp * 0.6;
  if (t >= 172.34 && t < 174.3) P.y = 900 - 8 * Math.abs(Math.sin(W.ph));
  // jolt hop at 131.08
  if (an84In(t, 131.08, 131.6)) { const [, lift] = hop(t, 131.15, 0.38, 0, 0, 26); P.y = 900 - lift; }
  if (an84In(t, 170.12, 170.9)) { const [, lift] = hop(t, 170.4, 0.3, 0, 0, 14); P.y = 900 - lift; }
  const head = [P.x, P.y - 186];
  const wide = an84ArmsWide(114.4, 117.3);
  const carry = [[96.32, 109.82, [44, -100]], [109.82, 111.6, [70, -150]]];
  P.handR = an84Track(t, [[96.32, 97.4, [70, -150]], [97.42, 98.1, [96, -150]], ...carry, wide[0], [119.1, 122.1, (tt) => [46 + 8 * Math.sin(tt * 14), -206]], an84BrowWipe(122.12),
    [124.4, 125.06, [20, -112]], [126.62, 127.2, [72, -206]], [127.2, 131.08, PERSON_HANDS.folded.R], [131.08, 131.6, PERSON_HANDS.armsOut.R], [131.6, 134.0, [100, -150]],
    [137.66, 140.0, PERSON_HANDS.hipsHands.R], [140.06, 140.9, [46, -206]], [140.5, 141.0, [40, -212]], [145.92, 147.0, [4, -120]], [148.0, 150.4, PERSON_HANDS.hipsHands.R],
    [161.72, 162.2, PERSON_HANDS.armsOut.R], [162.2, 163.6, PERSON_HANDS.cheeks.R], [164.12, 166.0, [92, -120]], [168.46, 169.3, [-26, -112]], [170.12, 170.6, [66, -204]], [170.6, 171.1, [10, -170]],
    [172.34, 178.6, [34, -204]]], AN84_REST.R);
  P.handL = an84Track(t, [...carry.map(([a, b, v]) => [a, b, [v[0] - 14, v[1] + 4]]), wide[1], [124.4, 125.06, [-20, -112]], [127.2, 131.08, PERSON_HANDS.folded.L], [131.08, 131.6, PERSON_HANDS.armsOut.L],
    [137.66, 140.0, PERSON_HANDS.hipsHands.L], [141.0, 142.8, [-74, -176]], [148.0, 150.4, PERSON_HANDS.hipsHands.L], [161.72, 162.2, PERSON_HANDS.armsOut.L], [162.2, 163.6, PERSON_HANDS.cheeks.L],
    [164.12, 166.0, [62, -120]], [172.34, 178.6, [-34, -204]]], AN84_REST.L);
  P.gaze = lookAt(head, maanHead);
  if (t < 98.1) P.gaze = [1, 0.1];
  if (an84In(t, 98.1, 99.14)) P.gaze = gazePlan(t, [[98.1, [1, -0.6]], [98.4, [-0.3, -1]], [98.7, [0.8, -0.2]]], 0.07);
  if (an84In(t, 99.14, 100.3)) { P.eyes = 'wide'; P.sq = 0.94; P.mouth = 'o'; }
  if (an84In(t, 100.3, 104.68)) { P.sq = 0.96; P.mouth = 'closed'; P.lid = 0; }
  if (an84In(t, 104.68, 105.6)) { P.tip = 0.25 * an84Env(t, 104.68, 105.6, 0.25); P.gaze = [0.3, 1]; }
  if (an84In(t, 105.6, 107.2)) { P.mouth = 'closed'; }
  if (an84In(t, 107.22, 108.6)) { P.lid = 0.6; P.tilt = 0.07; P.mouth = 'closed'; }
  if (an84In(t, 109.82, 111.6)) { P.tip = 0.1; P.mouth = 'smile'; }
  if (an84In(t, 114.4, 117.3)) { P.sq = an84In(t, 114.4, 115.6) ? 1 + 0.05 * an84E(t, 114.4, 0.5) : 1.05 - 0.03 * an84E(t, 115.6, 0.5); P.brow = -0.4; P.tilt = -0.05; }
  if (an84In(t, 119.1, 122.12)) { const n = t < 120 ? 1 : t < 120.9 ? 2 : t < 121.8 ? 3 : 4; P.sq = 1 - 0.012 * n; P.drop = 3 * n; P.brow = 0.3; }
  if (an84In(t, 122.12, 124.4) && tagPt) { P.brow = -0.5; P.gaze = gazePlan(t, [[122.12, lookAt(head, tagPt[3])], [122.9, lookAt(head, tagPt[2])], [123.4, lookAt(head, tagPt[1])], [123.9, lookAt(head, tagPt[0])]], 0.08); }
  if (an84In(t, 124.4, 125.06)) { P.lid = 1; P.brow = 0.6; P.sq = 1.04; P.mouth = 'closed'; }
  if (an84In(t, 125.06, 126.62)) { P.lid = 0; P.wink = 'R'; P.brow = 0.4; P.mouth = 'closed'; }
  if (an84In(t, 126.62, 128.78)) { P.brow = 1; P.sq = settleTo(t, 126.62, 1, 1.05, 0.35, 0.15) - 0.05 * an84E(t, 127.4, 0.5); P.mouth = 'closed'; P.tilt = -0.04; }
  if (an84In(t, 128.78, 131.08) && tagPt) { P.lid = 0.5; P.brow = 0.6; P.mouth = 'closed'; P.gaze = gazePlan(t, [[128.78, lookAt(head, tagPt[6])], [129.5, lookAt(head, [maanHead[0] - 40, maanHead[1] + 60])], [130.2, lookAt(head, maanHead)]], 0.07); }
  if (an84In(t, 131.08, 134.0)) { P.eyes = 'wide'; P.mouth = 'o'; P.lid = 0; P.sq = t < 131.15 ? 0.9 : landSquash(t, 131.53, 0.12); }
  if (an84In(t, 134.0, 137.66)) { P.mouth = 'smile'; }
  if (an84In(t, 137.66, 140.0) || an84In(t, 148.0, 150.4)) { P.mouth = 'open'; P.lid = 0.8; P.tilt = -0.08; P.tip = -0.05; P.drop = 2 * Math.sin(t * 24); }
  if (an84In(t, 140.06, 141.0)) { P.brow = -0.6; P.mouth = 'smile'; }
  if (an84In(t, 141.0, 142.8)) { P.lid = 0.3; P.mouth = 'smile'; P.gaze = [-1, -0.1]; }
  if (an84In(t, 145.92, 147.0)) { P.lid = t < 146.6 ? 0.5 : 0; P.tip = 0.1 * an84Env(t, 145.92, 147.0, 0.2); P.gaze = t < 146.6 ? [0.3, 1] : lookAt(head, maanHead); P.mouth = 'smile'; P.brow = t < 146.6 ? 0.3 : -0.4; }
  if (an84In(t, 157.4, 161.72)) { P.gaze = [0.2, -1]; P.brow = -0.5; P.mouth = 'closed'; }
  if (an84In(t, 161.72, 164.12)) { P.eyes = 'wide'; P.mouth = 'o'; P.sq = 0.92 + 0.08 * an84E(t, 162.4, 0.6); }
  if (an84In(t, 164.12, 172.34)) { P.mouth = t < 166.16 ? 'o' : 'open'; P.eyes = t < 165.2 ? 'wide' : 'open'; P.wet = t > 166.16; if (t >= 166.16) P.lid = 0.3; }
  if (an84In(t, 164.12, 166.16)) P.gaze = [0.6, 0.8];
  if (an84In(t, 168.46, 169.3)) { P.mouth = 'o'; P.gaze = [-0.3, 0.6]; }
  if (an84In(t, 170.12, 171.1)) { P.gaze = [0.6, -0.8]; P.mouth = t < 170.6 ? 'open' : 'o'; P.lid = 0; }
  if (t >= 172.34) { P.mouth = 'smile'; P.wet = true; P.lid = 0.15; P.gaze = t < 174.52 ? [1, -0.2] : [0, 0.05]; if (t >= 174.52) P.brow = -0.8; }
  P.talk = talk(t, AN84_BH_TALK, 1.3) * 0.75;
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 23));
  P.head = head;
  return P;
}
// world point of a standing person's local hand target
const an84StandPt = (P, hx, hy) => [P.x + (P.dir ?? 1) * P.s * hx, P.y + P.s * hy];

// ---------- the donkey at the palace ----------
const an84DonkHX = (t) => (t < 141.2 ? kfn(t, [[96.32, -160], [97.42, 120]], 'out') : kfn(t, [[143.56, 60], [144.3, 104]], 'inOut'));
function an84DonkeyHall(t) {
  const xf = an84DonkHX, W = walk(xf, t, { stride: GAIT.donkey * 0.9 }), P = { ...W, y: 900, s: 0.9, dir: 1, seed: 42, earL: 1, earR: 1 };
  P.front = t >= 141.2;
  if (an84In(t, 141.92, 172.7)) { P.mouth = 'grit'; P.lid = 0.25; P.earR = 1 - 0.6 * Math.abs(Math.sin(t * 4)); P.chew = 0.5 + 0.5 * Math.sin(t * 10); }
  if (an84In(t, 143.56, 144.4)) { P.lid = 0; P.mouth = 'smile'; }
  if (t >= 172.74) { P.eyes = 'wide'; P.mouth = 'o'; P.earL = 1; P.earR = t > 173.3 ? 0.1 : 1; P.headTurn = an84In(t, 173.2, 174.2) ? 0.9 * an84Env(t, 173.2, 174.2, 0.25) : 0; }
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 42));
  return P;
}
// ---------- the guard ----------
function an84Guard(t, maanX, bedHead) {
  const P = { costume: 'servant', seed: 61, pal: { robe: C.red, dot: '#a8160f', hc: C.yellow, sash: C.black }, x: 300, y: 900, s: 1, dir: 1, mouth: 'closed', brow: 0.2 };
  const head = [300, 711];
  P.sq = t < 90.3 ? 1 : settleTo(t, 90.3, 1, 1.05, 0.3, 0.12) - 0.05 * an84E(t, 90.8, 0.4);
  P.gaze = lookAt(head, [maanX, 700]);
  if (t >= 96.32) P.gaze = lookAt(head, bedHead);
  if (an84In(t, 93.88, 95.3)) P.gaze = [0.3, -1];
  if (an84In(t, 95.02, 95.72)) { P.brow = -0.7; if (an84In(t, 95.2, 95.42)) P.gaze = [0, 0.05]; }
  if (an84In(t, 97.42, 98.1)) { P.gaze = [-1, 0.2]; P.drop = 4 * pulse(t, 97.7, 0.4); }
  if (an84In(t, 116.16, 118.0)) P.tip = 0.06;
  if (an84In(t, 136.0, 137.4)) { P.drop = 6 * pulse(t, 136.0, 0.5); P.lid = 0.6; }
  if (an84In(t, 141.92, 147.0)) { P.gaze = [-1, 0.3]; P.lid = 0.45; P.brow = 0.6; if (an84In(t, 143.56, 144.6)) { P.eyes = 'wide'; P.lid = 0; } }
  if (an84In(t, 148.0, 151.0)) P.mouth = 'smile';
  P.handR = an84Track(t, [[95.42, 95.72, [30, -214]], [136.0, 137.4, PERSON_HANDS.headHold.R]], AN84_REST.R);
  P.handL = [-34, -110];
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 61));
  const rot = (an84In(t, 98.1, 99.0) ? -0.35 * pulse(t, 98.1, 0.9) : 0) + (t >= 141.92 && t < 147 ? -0.5 * an84Env(t, 141.92, 147, 0.25) : 0);
  const tap = t < 90.3 ? 0 : -10 * pulse(t, 90.3, 0.25);
  return { P, head, spear: { x: 300 - 46, y: 900 + tap, rot } };
}
// ---------- courtiers and treasurer ----------
const AN84_COURT = [{ costume: 'servant', seed: 62, pal: { robe: C.white, dot: '#b9b4c6', hc: C.red } }, { costume: 'merchant', seed: 63, pal: { robe: AN84_GREEN, dot: AN84_GREEND, hc: C.yellow, hd: C.red } }];
function an84Courtier(t, i, bedHead, maanHead) {
  const d = stagger(i, 0.17), x0 = i ? 950 : 880, back = t >= 152.4 ? 55 * an84E(t, 152.4 + d, 0.6) : 0, lunge = i === 0 ? -50 * an84Env(t, 149.0, 150.4, 0.2) : 0;
  const P = { ...AN84_COURT[i], x: x0 + back + lunge, y: 900, s: 0.9, dir: -1, mouth: 'closed', brow: 0 };
  const head = [P.x, 900 - 180];
  P.gaze = lookAt(head, bedHead);
  const td = t - d;
  if (an84In(td, 100.34, 104.0)) P.gaze = lookAt(head, maanHead);
  if (an84In(td, 104.12, 105.6)) { if (i === 0) { P.handR = PERSON_HANDS.cupMouth.R; P.gaze = [1, -0.2]; } else { P.brow = -0.6; P.gaze = [-0.6, 0.9]; } }
  if (an84In(td, 111.62, 113.0)) { if (i === 0) { P.tip = 0.1; P.brow = -0.5; P.gaze = [-0.7, 0.7]; } else { P.handR = PERSON_HANDS.mouthCover.R; P.mouth = 'open'; P.lid = 0.6; } }
  if (an84In(td, 116.16, 117.6)) { P.mouth = 'o'; P.eyes = 'wide'; P.brow = -0.8; }
  if (an84In(t, 119.1, 122.8)) { const k = Math.floor((t - 119.1 - (i ? 0.25 : 0)) / 0.9); P.gaze = k % 2 ? lookAt(head, maanHead) : lookAt(head, bedHead); }
  if (an84In(td, 131.2, 133.9)) { P.eyes = 'wide'; P.mouth = 'o'; }
  if (an84In(td, 136.0, 137.6)) { const k = Math.floor((td - 136.0) / 0.5); P.gaze = [[-0.9, -0.5], [0.2, -0.3], [i ? -1 : 1, 0]][Math.min(2, k)]; P.brow = -0.5; }
  if (an84In(td, 147.4, 150.6)) { if (i === 0) { P.handR = an84In(t, 149.0, 150.4) ? [100, -150] : undefined; P.eyes = 'wide'; P.mouth = 'o'; } else { P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0.7; } }
  if (an84In(td, 167.52, 171.0)) { P.tip = 0.08; P.mouth = 'o'; }
  if (an84In(td, 157.4, 162.7)) P.gaze = [-0.4, -0.9];
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 62 + i));
  return P;
}
const an84TreasX = (t) => kfn(t, [[152.84, 1110], [153.8, 868]], 'out');
function an84Treasurer(t, maanHead, bedHead) {
  if (t < 152.7) return null;
  const P = { costume: 'vizier', age: 0.6, seed: 64, ...walk(an84TreasX, t, { stride: 16 }), y: 900, s: 0.95, dir: -1, mouth: 'closed', brow: 0 };
  const head = [P.x, 900 - 180];
  P.gaze = lookAt(head, maanHead);
  if (an84In(t, 153.9, 154.6)) P.tip = 0.2 * pulse(t, 153.9, 0.7);
  P.handL = an84Track(t, [[162.74, 172.0, [40, -140]]], [-30, -100]);
  P.handR = an84Track(t, [[157.4, 158.9, (tt) => [40, -206 + 4 * Math.sin(tt * 12)]], [162.74, 172.0, [90, -140]], [169.32, 170.2, [30, -214]]], [26, -100]);
  if (an84In(t, 157.4, 158.9)) { P.gaze = [-0.4, -0.9]; P.talk = 0.4 + 0.3 * Math.abs(Math.sin(t * 11)); }
  if (an84In(t, 158.94, 162.7)) { P.gaze = [-0.4, -0.9]; P.brow = -0.3 - 0.15 * Math.min(7, Math.floor((t - 158.94) / 0.2)); P.tilt = -0.06; P.eyes = 'wide'; }
  if (an84In(t, 162.74, 172.0)) { P.lid = 0.5; P.gaze = lookAt(head, bedHead); }
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 64));
  return P;
}
// ledger scroll: under the arm (rolled) or held open between the hands
function an84Scroll(ctx, a, b, open) {
  if (!open) { ctx.save(); ctx.translate(a[0], a[1]); ctx.rotate(-0.5); shape(ctx, K.rectPts(-40, -9, 80, 18), C.white, { lw: 4, seed: 65 }); shape(ctx, ell(40, 0, 6, 9, 10), '#efdcae', { lw: 3, seed: 66 }); ctx.restore(); return; }
  const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), y = (a[1] + b[1]) / 2;
  shape(ctx, K.rectPts(x0, y - 10, x1 - x0, 80), C.white, { lw: 4, seed: 67 }); ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#8c8a94'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x0 + 10, y + 8 + k * 16); ctx.lineTo(x1 - 10, y + 8 + k * 16); ctx.stroke(); } ctx.restore();
  for (const xx of [x0, x1]) shape(ctx, ell(xx, y + 30, 9, 44, 12), '#efdcae', { lw: 3.5, seed: 68 });
}
