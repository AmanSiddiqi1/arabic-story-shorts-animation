// ===== AN-084 palace half (S7-S12, 89.64-178.6): the guard, the arrival, the throne, the second ladder, the recognition, the door gag, the laugh, the payment =====
// Hall world 1000 x 1230, floor y 900, raised dais x 560..900 top 800 (status: the prince's head about 95 above the Bedouin's), own throne at x 730.
const AN84_DAIS = 800, AN84_TX = 730, AN84_SITY = AN84_DAIS - 12;
const AN84_POPS_H = [116.16, 119.1, 120.0, 120.9, 121.8, 122.6, 125.06];
const AN84_DROPS = [164.12, 164.98, 166.16, 167.52, 168.46, 169.32, 170.12];
const AN84_PILE = [560, 900];

// ---------- throne tip (radians, + = backward for a prince facing left) about the rear base point ----------
const an84ThroneRot = (t) => (t < 149.0 ? 0 : t < 149.1 ? -0.03 * pulse(t, 149.0, 0.2) : t < 150.0 ? 0.244 * an84E(t, 149.1, 0.35, 'out') + 0.01 * Math.sin(t * 20) * an84Env(t, 149.45, 150.0, 0.1) : t < 150.6 ? 0.244 * (1 - an84E(t, 150.0, 0.3, 'in')) - 0.035 * pulse(t, 150.3, 0.3) : 0);   // v2: about 14 degrees, anticipate, rebound
const AN84_PIVOT = [AN84_TX + 80, AN84_DAIS];

// ---------- the prince ----------
const AN84_P_TALK = [[92.16, 95.6], [112.32, 115.0], [118.2, 121.1], [150.9, 151.4], [154.1, 162.3]];
const an84MaanX7 = (t) => 470;   // v2: already settled when the wipe clears (no splayed entry squash)
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
    an84Aside(P, t, 130.13, 0.82);   // the desert aside repeated exactly: the recognition's visible cause
  } else {
    P.x = AN84_TX; P.y = AN84_SITY; P.s = 1; P.dir = -1; P.sit = 1; P.seat = 'bench'; P.mouth = 'closed';
    head = [AN84_TX + 22, AN84_SITY - 166];
    const press = (t0) => [t0, t0 + 0.7, (tt) => [72, -142 + 40 * K.ease.inOut(K.clamp((tt - t0 - 0.1) / 0.3))]];
    P.handR = an84Track(t, [[100.34, 111.9, [72, -104]], [112.32, 113.3, [72, -176]], [113.3, 114.4, an84MoneyRub], an84Press(118.2), press(119.1), press(120.0), press(120.9), press(121.8), press(122.6),
      [127.6, 130.13, [16, -160]], [132.8, 133.7, [80, -128]], [147.12, 149.0, (tt) => [86, -96 - 16 * Math.abs(Math.sin(tt * 10))]], [149.0, 150.3, [86, -110]], [150.4, 150.9, [22, -196]], [150.9, 151.7, (tt) => [56 - 18 * Math.abs(Math.sin((tt - 150.9) * 7.8)), -150]],
      [154.1, 156.4, [100, -150]], [160.6, 161.1, [76, -182]], [161.1, 161.4, [110, -150]], [161.4, 162.8, PERSON_HANDS.armsOut.R], [173.8, 178.6, (tt) => [58, -150 - 3 * Math.sin(tt * 9)]]], [70, -100]);
    P.handL = an84Track(t, [[147.12, 149.0, (tt) => [-80, -96 - 16 * Math.abs(Math.sin(tt * 10 + 1))]], [149.0, 150.3, [-80, -110]], [150.9, 151.7, (tt) => [10 + 18 * Math.abs(Math.sin((tt - 150.9) * 7.8)), -150]],
      [132.8, 133.7, [-72, -126]], [161.4, 162.8, PERSON_HANDS.armsOut.L], [174.52, 178.6, (tt) => [-14 + 6 * Math.sin(tt * 6), -232]]], [-60, -100]);
    P.gaze = lookAt(head, bedHead);
    if (an84In(t, 100.34, 112.3)) { P.lid = 0.3; P.brow = 0.2; P.tilt = -0.03; }
    if (an84In(t, 100.9, 101.6)) P.mouth = 'smile';
    if (an84In(t, 107.2, 109.0)) { P.tilt = -0.06; P.drop = -4; }
    if (an84In(t, 112.32, 113.3)) { P.gaze = [-0.8, -0.4]; P.lid = 0.35; P.brow = -0.3; }
    if (an84In(t, 113.3, 128.78)) { P.lid = 0.4; P.brow = 0.2; }
    if (an84In(t, 116.16, 116.9)) { P.brow = -0.6; P.lid = 0; }
    if (an84In(t, 127.6, 130.2)) { P.tip = 0.12 * an84Env(t, 127.6, 130.6, 0.4); P.lid = 0.45; P.mouth = 'smile'; }
    if (an84In(t, 131.08, 137.6)) { P.mouth = 'smile'; P.lid = 0.2; P.brow = -0.3; if (an84In(t, 134.4, 134.85)) P.wink = 'R'; }
    if (an84In(t, 131.85, 133.9)) { P.drop = 2 + tremble(t, 1.6, 5); P.sq = 1 + 0.015 * Math.abs(Math.sin(t * 16)); P.brow = -0.5; if (t >= 132.8) P.tilt = -0.06 * an84Env(t, 132.8, 133.8, 0.2); }   // openly smiling, shoulders shaking, the 'caught me' shrug
    if (an84In(t, 137.6, 147.12)) { P.mouth = 'smile'; P.lid = 0.25; }
    if (an84In(t, 141.92, 143.9)) P.gaze = [-1, 0.2];
    if (an84In(t, 147.12, 150.4)) { const bb = Math.abs(Math.sin(t * 10)); P.mouth = 'open'; P.eyes = 'shut'; P.lid = 0; P.brow = -0.45; P.tip = -0.04 - 0.08 * an84Env(t, 149.1, 150.1, 0.3); P.tilt = -0.05 + 0.05 * Math.sin(t * 9); P.drop = -5 * bb; P.sq = 1 + 0.03 * bb; P.talk = 0; }   // v2: a happy belly laugh, never shouting
    if (an84In(t, 150.4, 150.9)) { P.wet = true; P.mouth = 'smile'; P.lid = 0.3; }
    if (an84In(t, 150.9, 154.1) && treasHead) P.gaze = lookAt(head, treasHead);
    if (an84In(t, 154.1, 157.4)) { P.brow = -0.4; P.mouth = 'smile'; }
    if (an84In(t, 157.4, 160.6)) { P.gaze = [-0.5, -0.9]; P.mouth = 'smile'; P.lid = 0.2; }
    if (an84In(t, 160.6, 162.8)) { P.brow = -0.4; P.tilt = an84In(t, 160.6, 161.1) ? 0.06 * Math.sin(t * 20) : 0; }
    if (an84In(t, 162.8, 173.8)) { P.mouth = 'smile'; P.lid = 0.3; if (an84In(t, 166.5, 167.2)) P.drop = 6 * pulse(t, 166.5, 0.7); }
    if (t >= 173.8) { P.lid = 0.25; P.mouth = 'smile'; P.sq = 1 - 0.02 * Math.abs(Math.sin(t * 9)); P.brow = -0.3; P.gaze = lookAt(head, bedHead); }   // chewing, smiling, answers the salute
    P.talk = talk(t, AN84_P_TALK, 0.4) * 0.8;
    an84Aside(P, t, 130.13, 0.82);   // the desert aside repeated exactly: the recognition's visible cause
  }
  if ((P.lid == null || P.lid < 0.9) && P.eyes !== 'shut') P.lid = Math.max(P.lid || 0, blink(t, 11));
  return P;
}

// ---------- the Bedouin in the hall (faces right, toward the throne) ----------
const AN84_BH_TALK = [[109.82, 111.4], [115.38, 117.6], [125.06, 126.4], [137.66, 141.9], [143.56, 146.6]];
const an84BedXH = (t) => kfn(t, [[96.32, -90], [97.42, 180], [98.1, 196], [99.14, 430], [110.7, 430], [111.4, 500], [112.0, 500], [112.6, 430], [162.8, 430], [163.4, 396], [172.34, 396], [173.8, 205]], 'inOut');
const an84BrowWipe = (t0) => [t0, t0 + 1.0, (tt) => [26 + 22 * K.clamp((tt - t0 - 0.12) / 0.6), -214]];
function an84BedHall(t, maanHead, tagPt) {
  const P = { ...AN84_BED, s: 0.95, y: 900, dir: 1, mouth: 'smile', brow: 0 };
  const W = walk(an84BedXH, t, { stride: 20 }); Object.assign(P, W); if (t >= 172.34) P.dir = -1;
  if (an84In(t, 98.1, 99.14)) P.amp = W.amp * 0.6;
  if (t >= 172.34 && t < 173.9) P.y = 900 - 10 * Math.abs(Math.sin(W.ph)) * an84Env(t, 172.34, 173.9, 0.15);   // bouncy walk to the door
  if (an84In(t, 172.74, 173.15)) { const [, lift] = hop(t, 172.74, 0.36, 0, 0, 30); P.y = 900 - lift; }
  // jolt hop at 131.08
  if (an84In(t, 131.08, 131.6)) { const [, lift] = hop(t, 131.15, 0.38, 0, 0, 26); P.y = 900 - lift; }
  if (an84In(t, 170.12, 170.9)) { const [, lift] = hop(t, 170.4, 0.3, 0, 0, 14); P.y = 900 - lift; }
  const head = [P.x, P.y - 186];
  const wide = an84ArmsWide(114.4, 117.3);
  const carry = [[96.32, 109.82, [44, -100]], [109.82, 111.3, [70, -150]], [111.3, 111.95, [100, -172]]];
  P.handR = an84Track(t, [[96.32, 97.4, [70, -150]], [97.42, 98.1, [96, -150]], ...carry, wide[0], [119.1, 122.1, (tt) => [46 + 8 * Math.sin(tt * 14), -206]], an84BrowWipe(122.12),
    [124.4, 125.06, [20, -112]], [126.62, 127.2, [72, -206]], [127.2, 131.08, PERSON_HANDS.folded.R], [131.08, 131.6, PERSON_HANDS.armsOut.R], [131.6, 134.0, [100, -150]],
    [137.66, 140.0, PERSON_HANDS.hipsHands.R], [140.06, 140.9, [46, -206]], [140.5, 141.0, [40, -212]], [145.92, 147.0, [4, -120]], [147.3, 150.4, (tt) => [22, -112 + 4 * Math.sin(tt * 20)]],
    [161.72, 162.2, PERSON_HANDS.armsOut.R], [162.2, 163.6, PERSON_HANDS.cheeks.R], [164.12, 166.0, [92, -120]], [168.46, 169.3, [-26, -112]], [170.12, 170.6, [66, -204]], [170.6, 171.1, [10, -170]],
    [171.1, 178.6, [46, -70]]], AN84_REST.R);   // v2: bags at the hips
  P.handL = an84Track(t, [...carry.map(([a, b, v]) => [a, b, [v[0] - 14, v[1] + 4]]), wide[1], [124.4, 125.06, [-20, -112]], [127.2, 131.08, PERSON_HANDS.folded.L], [131.08, 131.6, PERSON_HANDS.armsOut.L],
    [137.66, 140.0, PERSON_HANDS.hipsHands.L], [141.0, 142.8, [-74, -176]], [147.3, 150.4, (tt) => [-8, -104 + 4 * Math.sin(tt * 20 + 1)]], [161.72, 162.2, PERSON_HANDS.armsOut.L], [162.2, 163.6, PERSON_HANDS.cheeks.L],
    [164.12, 166.0, [62, -120]], [171.1, 174.52, [-46, -70]], [174.52, 178.6, (tt) => [-78, -208 + 5 * Math.sin(tt * 6)]]], AN84_REST.L);   // then the far-side bag raised in salute (clear of his face and the donkey)
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
  if (an84In(t, 137.66, 140.0) || an84In(t, 147.12, 150.4)) { P.mouth = 'open'; P.lid = 0.8; P.tilt = -0.08; P.tip = -0.05; P.drop = 2 * Math.sin(t * 24); }
  if (an84In(t, 140.06, 141.0)) { P.brow = -0.6; P.mouth = 'smile'; }
  if (an84In(t, 141.0, 142.8)) { P.lid = 0.3; P.mouth = 'smile'; P.gaze = [-1, -0.1]; }
  if (an84In(t, 145.92, 147.0)) { P.lid = t < 146.6 ? 0.5 : 0; P.tip = 0.1 * an84Env(t, 145.92, 147.0, 0.2); P.gaze = t < 146.6 ? [0.3, 1] : lookAt(head, maanHead); P.mouth = 'smile'; P.brow = t < 146.6 ? 0.3 : -0.4; }
  if (an84In(t, 157.4, 161.72)) { P.gaze = [0.2, -1]; P.brow = -0.5; P.mouth = 'closed'; }
  if (an84In(t, 161.72, 164.12)) { P.eyes = 'wide'; P.mouth = 'o'; P.sq = 0.92 + 0.08 * an84E(t, 162.4, 0.6); }
  if (an84In(t, 164.12, 172.34)) { P.mouth = t < 166.16 ? 'o' : 'open'; P.eyes = t < 165.2 ? 'wide' : 'open'; P.wet = t > 166.16; if (t >= 166.16) P.lid = 0.3; }
  if (an84In(t, 164.12, 166.16)) P.gaze = [0.6, 0.8];
  if (an84In(t, 168.46, 169.3)) { P.mouth = 'o'; P.gaze = [-0.3, 0.6]; }
  if (an84In(t, 170.12, 171.1)) { P.gaze = [0.6, -0.8]; P.mouth = t < 170.6 ? 'open' : 'o'; P.lid = 0; }
  if (an84In(t, 147.12, 150.4)) P.tip = -0.08;
  if (t >= 171.0) { P.eyes = 'open'; P.wet = true; P.lid = 0.1; P.brow = -0.7; P.mouth = an84In(t, 172.6, 173.8) ? 'open' : 'smile'; P.talk = 0; P.gaze = t < 172.34 ? [0.7, 0.6] : t < 174.52 ? [1, -0.1] : [0, 0.05];
    if (t >= 173.1) P.sq = landSquash(t, 173.1, 0.12); }   // amazed, happy, wet eyes; looks back to the lens from the doorway
  P.talk = talk(t, AN84_BH_TALK, 1.3) * 0.75;
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 23));
  P.head = head;
  return P;
}
// world point of a standing person's local hand target
const an84StandPt = (P, hx, hy) => [P.x + (P.dir ?? 1) * P.s * hx, P.y + P.s * hy];

// ---------- the donkey at the palace ----------
const an84DonkHX = (t) => (t < 141.2 ? kfn(t, [[96.32, -160], [97.42, 120]], 'out') : t < 173.8 ? kfn(t, [[143.56, 60], [144.3, 104]], 'inOut') : kfn(t, [[173.8, 120], [174.7, 70]], 'inOut'));
function an84DonkeyHall(t) {
  const xf = an84DonkHX, W = walk(xf, t, { stride: GAIT.donkey * 0.9 }), P = { ...W, y: 900, s: 0.9, dir: 1, seed: 42, earL: 1, earR: 1 };
  P.front = t >= 141.2 && t < 173.8; if (t >= 173.8) P.dir = -1;   // v2: turns out through the arch (drawn behind the wall), gold panniers on its rump
  if (an84In(t, 141.92, 172.7)) { P.mouth = 'grit'; P.lid = 0.25; P.earR = 1 - 0.6 * Math.abs(Math.sin(t * 4)); P.chew = 0.5 + 0.5 * Math.sin(t * 10); }
  if (an84In(t, 143.56, 144.4)) { P.lid = 0; P.mouth = 'smile'; }
  if (t >= 172.74) { P.eyes = 'wide'; P.mouth = t < 173.8 ? 'o' : 'smile'; P.earL = P.earR = 1.1; P.lid = 0; P.headTurn = an84In(t, 172.85, 173.75) ? 0.9 * an84Env(t, 172.85, 173.75, 0.2) : 0; }   // ears snap up, looks back at its gold
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 42));
  return P;
}
// ---------- the guard ----------
// v2: both hands on the upright spear at rest (no frozen pointing arm); the arm goes out only for the "enter" gesture 97.4-99.0.
// Reactions: side-eye at the donkey mime, a real forehead slap, startled tug when the donkey chews the tassel, eyes on each falling tag,
// then at the end he steps clear of the arch and bows the Bedouin out.
const an84GuardX = (t) => kfn(t, [[172.34, 300], [173.0, 370]], 'inOut');
function an84Guard(t, maanX, bedHead) {
  const W = walk(an84GuardX, t, { stride: 20 }), gx = W.x, out = t >= 172.34, dir = out ? -1 : 1;
  const P = { costume: 'servant', seed: 61, pal: { robe: C.red, dot: '#a8160f', hc: C.yellow, sash: C.black }, ...W, y: 900, s: 1, dir, mouth: 'closed', brow: 0.2 };
  const head = [gx, 711];
  P.sq = (t < 90.3 ? 1 : settleTo(t, 90.3, 1, 1.05, 0.3, 0.12) - 0.05 * an84E(t, 90.8, 0.4)) + 0.01 * Math.sin(t * 2.1);   // breathing
  P.gaze = lookAt(head, [maanX, 700]);
  if (t >= 96.32) P.gaze = lookAt(head, bedHead);
  if (an84In(t, 93.88, 95.02)) P.gaze = [0.3, -1];
  if (an84In(t, 95.02, 95.72)) { P.gaze = [1, 0.05]; P.lid = 0.45; P.brow = 0.5; P.mouth = 'frown'; P.tilt = 0.05; }   // side-eye at the donkey mime
  if (an84In(t, 97.42, 98.1)) { P.gaze = [-1, 0.2]; P.drop = 4 * pulse(t, 97.7, 0.4); }
  if (an84In(t, 98.1, 99.0)) P.gaze = [1, -0.1];
  if (an84In(t, 116.16, 118.0)) P.tip = 0.06;
  if (an84In(t, 136.0, 137.4)) { P.drop = 6 * pulse(t, 136.0, 0.5); P.lid = 0.7; P.mouth = 'open'; P.tip = -0.05 * an84Env(t, 136.0, 137.2, 0.15); }
  if (an84In(t, 141.92, 147.0)) { P.gaze = [-1, 0.3]; P.lid = 0.45; P.brow = 0.6; P.tip = 0.06 * an84Env(t, 141.92, 147.0, 0.3); if (an84In(t, 141.92, 142.7) || an84In(t, 143.56, 144.6)) { P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; } }
  if (an84In(t, 147.12, 151.0)) P.mouth = 'smile';
  if (an84In(t, 164.0, 171.0)) { const dr = AN84_DROPS.filter((d) => t >= d - 0.15); const d = dr.length ? dr[dr.length - 1] : 164; P.gaze = gazePlan(t, [[d - 0.15, [0.5, -0.9]], [d + 0.15, [0.6, -0.2]], [d + 0.32, [0.7, 0.6]]], 0.08); P.lid = 0; }
  if (out) { P.tip = 0.1 * an84Env(t, 173.0, 178.6, 0.4); P.mouth = 'smile'; P.gaze = t < 174.52 ? lookAt(head, bedHead) : [0, 0.05]; if (t >= 173.0) P.drop = 4; }
  // spear: upright at the near hand; tilts when the donkey pulls the tassel (with a tug back and forth)
  const pullE = t >= 141.92 && t < 147 ? an84Env(t, 141.92, 147, 0.25) : 0;
  const rot = (an84In(t, 98.1, 99.0) ? -0.12 * pulse(t, 98.1, 0.9) : 0) - 0.35 * pullE + 0.12 * Math.sin(t * 9) * pullE;
  const sx = -40, onSpear = (h) => [sx * dir * dir + Math.sin(rot) * h * dir, -h * Math.cos(rot)];
  const gripL = onSpear(84), gripR = onSpear(108);
  P.handL = gripL;
  P.handR = an84Track(t, [[97.42, 99.0, [96, -152]], [136.0, 137.2, [14, -214], 0.12]], [gripR[0] + 4, gripR[1]]);
  if (P.lid == null || P.lid < 0.9) P.lid = Math.max(P.lid || 0, blink(t, 61));
  const tap = t < 90.3 ? 0 : -10 * pulse(t, 90.3, 0.25);
  return { P, head, spear: { x: gx + dir * sx, y: 900 + tap, rot } };
}
// ---------- courtiers and treasurer ----------
const AN84_COURT = [{ costume: 'servant', seed: 62, pal: { robe: C.white, dot: '#b9b4c6', hc: C.red } }, { costume: 'merchant', seed: 63, pal: { robe: AN84_GREEN, dot: AN84_GREEND, hc: C.yellow, hd: C.red } }];
function an84Courtier(t, i, bedHead, maanHead) {
  const d = stagger(i, 0.17), x0 = i ? 950 : 880, back = t >= 152.4 ? 55 * an84E(t, 152.4 + d, 0.6) : 0, lunge = i === 0 ? -60 * an84Env(t, 149.3, 150.4, 0.2) : 0;
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
  if (an84In(td, 147.4, 150.6)) { if (i === 0) { if (an84In(t, 149.3, 150.4)) { P.handR = [104, -150]; P.handL = [96, -140]; P.tip = 0.12 * an84Env(t, 149.3, 150.4, 0.15); } P.eyes = 'wide'; P.mouth = 'o'; } else { P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0.7; } }
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
