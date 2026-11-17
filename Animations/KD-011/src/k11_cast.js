// ===== KD-011 The Rats and the Iron: tracks and acting (merchant, friend, boy, buyer, passers-by, rats, hawk) =====
// Times are seconds on the final MP3 (planning/inputs/timeline.json word starts; silence-refined onsets from timing.json where a hit must land).
const K11DUR = 161.0;   // narration 157.506 s + 3.5 s THE END hold (creative plan)
const k11in = (t, a, b) => t >= a && t < b;
const k11fo = (t, b, d = 0.3) => K.clamp((b - t) / d);
const k11fi = (t, a, d = 0.3) => K.clamp((t - a) / d);
const K11B = (t, a, d, e = 'lin') => K.beat(t, a, d, e);
// k11step(t, keys, dur, rest): hold each key value and ease to the next over dur seconds. Values: number, [x, y], function(t) or null (= rest).
function k11step(t, keys, dur = 0.25, rest = null) {
  const val = (v) => (v == null ? rest : typeof v === 'function' ? v(t) : v);
  let i = -1; for (let k = 0; k < keys.length; k++) { if (keys[k][0] <= t) i = k; else break; }
  if (i < 0) return val(keys[0][1]);
  const cur = keys[i][1], prev = i > 0 ? keys[i - 1][1] : cur, d = keys[i][2] ?? dur, u = K.ease.inOut(K.clamp((t - keys[i][0]) / d));
  if (u >= 1) return cur == null ? null : val(cur);
  const a = val(prev), b = val(cur); if (a == null || b == null) return b ?? a;
  return Array.isArray(a) ? [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u)] : K.lerp(a, b, u);
}
const k11at = (t, keys) => { let v = keys[0][1]; for (const [k, x] of keys) if (t >= k) v = x; return v; };
// scene table (cuts): index 1..18
const K11CUTS = [0, 8.02, 21.7, 24.12, 32.6, 45.82, 54.72, 62.4, 67.78, 77.0, 81.28, 88.92, 98.98, 106.12, 117.24, 122.76, 136.74, 148.24];
const k11sc = (t) => { let s = 1; K11CUTS.forEach((c, i) => { if (t >= c) s = i + 1; }); return s; };
const K11HOUSE = [69.9, 77.0];   // inside the merchant's house
const k11world = (t) => (k11sc(t) === 6 ? 'store' : k11in(t, K11HOUSE[0], K11HOUSE[1]) ? 'house' : 'street');

// ---------- costumes ----------
const K11FPAL = { robe: C.yellow, dot: C.red, sash: C.red, head: 'cap', hc: C.red, hd: '#a8160f', band: C.yellow, beard: 'none', belly: 1, pants: CREAM };
const K11BPAL = { robe: C.yellow, dot: C.red, sash: C.red, head: 'cap', hc: C.red, hd: '#a8160f', band: C.yellow, shoes: 'bare', pants: CREAM };
const K11BUYPAL = { robe: '#7a4212', dot: '#5b3010', sash: C.yellow, hc: GREEN, hd: GREEND };
const K11MS = 1.05, K11FS = 0.97;
const K11REST = { L: [-37, -58], R: [37, -58] };
// promise pose (19.0, 131.44, 147.12): right hand flat on the chest, left hand raised high (arm angles read at phone size)
const K11PROMISE = { handR: [6, -122], aL: [-2.5, -2.85] };
// the friend's amazed poses (37.52 arms out, 40.24 hands to cheeks), copied by the merchant at 88.92
const K11AMAZE1 = { handL: PERSON_HANDS.armsOut.L, handR: PERSON_HANDS.armsOut.R, eyes: 'wide', brow: -0.8, mouth: 'o' };
const K11AMAZE2 = { handL: PERSON_HANDS.cheeks.L, handR: PERSON_HANDS.cheeks.R, eyes: 'wide', brow: -0.8, mouth: 'o' };
const k11head = (P) => [P.x, P.y - (P.child ? 118 : 195) * (P.s || 1) + (P.drop || 0) * (P.s || 1)];
// world point -> figure-local hand target
const k11loc = (P, w) => [(w[0] - P.x) / (P.s || 1) * Math.sign(P.dir || 1), (w[1] - P.y) / (P.s || 1)];

// ---------- merchant ----------
const K11MX = (t) => kfn(t, [[0, -150], [0.3, -150], [3.7, 330], [8.01, 330],
  [8.02, 400], [12.0, 400], [12.3, 425], [13.84, 425], [14.35, 405], [15.3, 690], [16.6, 690], [17.5, 330], [19.55, 330], [19.9, 395], [21.7, 395],   // S2
  [23.6, 120],                                                       // S3 away up the road
  [32.6, 120], [34.5, 340], [45.3, 340], [45.8, 395],                // S5 back
  [45.82, 640], [54.7, 640],                                         // S6 storeroom
  [54.72, 300], [60.4, 300], [60.85, 470], [61.1, 470], [62.39, 280], // S7 (walks off under the LATER card)
  [62.4, -1150], [63.24, -1150], [64.5, -720], [66.85, -720], [67.2, -660], [67.78, -660], [69.6, -345], [69.88, -345],   // S8, S9 street
  [69.9, 90], [70.9, 380], [71.25, 440], [73.2, 440], [73.6, 390], [76.98, 390],   // S9 interior
  [77.0, -330], [78.52, -330], [81.26, 260],                         // S10
  [81.28, 300], [136.72, 300],                                       // S11-S16
  [136.74, -80], [138.2, 250], [143.3, 250], [144.0, 360], [147.3, 360], [147.6, 410], [148.22, 410],   // S17
  [148.24, 430], [161, 430]]);
function k11MYS(t) { if (k11in(t, 21.7, 24.12)) { const u = K.ease.inOut(K.clamp((t - 21.7) / 1.9)); return [K.lerp(900, 812, u), K.lerp(K11MS, 0.47, u)]; }
  if (k11in(t, 32.6, 34.6)) { const u = K.ease.inOut(K.clamp((t - 32.6) / 1.9)); return [K.lerp(812, 900, u), K.lerp(0.47, K11MS, u)]; } return [900, K11MS]; }
const K11MD = (t) => K11MX(t) - (k11in(t, 21.7, 24.12) || k11in(t, 32.6, 34.6) ? 3.3 * (900 - k11MYS(t)[0])   : 0);   // walk distance incl. depth
const K11MFALLS = [...footfalls(K11MD, 0.3, 3.7, 26), ...footfalls(K11MX, 14.35, 15.3, 26), ...footfalls(K11MX, 61.62 + 1.62, 64.5, 26), ...footfalls(K11MX, 78.52, 81.26, 26), ...footfalls(K11MX, 136.74, 138.2, 26)];
function k11merchant(t) {
  const sc = k11sc(t), [y, s] = k11MYS(t), x = K11MX(t), v = speed(K11MX, t), w = walk(K11MD, t, { stride: 26 * s });
  const P = { x, y, s, costume: 'merchant', dir: 1, ph: w.ph, amp: K.clamp(w.amp * 1.3), seed: 11, mouth: 'closed', lid: 0.25 };
  if (sc === 6 || k11in(t, 16.6, 17.45) || k11in(t, 21.55, 24.12) || k11in(t, 61.0, 61.62)) P.dir = -1;
  if (sc === 6) P.dir = -1;
  // ---- gaze targets (world points), the head follows big moves
  const F = K11FX(t), fh = [F, 900 - 190 * K11FS];
  let g = fh;
  // ---- S1: pulling the cart in, nod, porter, wipe brow, pat stack, catch the falling bar
  if (sc === 1) {
    P.tip = t < 3.75 ? 0.07 * K.clamp(P.amp * 2) : 0; if (t < 3.8) { P.handLW = [x - 12, 831]; P.handRW = [x + 6, 833]; } P.mouth = 'smile'; g = [x + 300, 700];
    if (k11in(t, 2.5, 3.2)) g = [K11PCX(t), 760];
    if (k11in(t, 2.2, 2.6)) P.drop = 6 * pulse(t, 2.2, 0.4);
    if (k11in(t, 2.8, 3.5)) { P.tip = -0.05; P.lean = -0.04; }
    if (k11in(t, 3.8, 4.4)) { P.handL = null; P.handR = [24, -196]; P.sq = t < 4.1 ? 0.97 : 1; P.lid = Math.max(0.25, pulse(t, 4.15, 0.2)); }
    if (t >= 4.4) { P.handL = null; P.handR = k11step(t, [[4.4, null], [5.1, [4, -122]], [6.44, [-60, -150]], [7.4, PERSON_HANDS.clasp.R]], 0.2, K11REST.R); g = t < 5.6 ? [230, 760] : [700, 690]; P.drop = t >= 5.1 && t < 6.4 ? -6 : 0; P.lid = t >= 5.1 && t < 6.4 ? 0.3 : 0.2;
      if (t >= 5.1 && t < 6.44) P.handL = [-76, -171 + 6 * Math.sin(t * 14)];
      if (k11in(t, 6.44, 7.4)) { P.eyes = t < 6.55 ? 'wide' : 'open'; P.sq = anticipate(t, 6.44, 0.12, 0.06) * (t > 6.56 && t < 6.9 ? 1.05 : 1); P.handL = [-62, -147]; P.tip = -0.06; g = [200, 690]; P.mouth = t > 6.8 ? 'smile' : 'o'; }
      if (t >= 7.4) { P.handL = PERSON_HANDS.clasp.L; P.mouth = 'smile'; P.drop = 3 * Math.sin(t * 18) * K.clamp(7.9 - t); } }
  }
  // ---- S2: look down the road, bundle, knock, greet, ask, pull the cart in, I will be back, handshake, wave
  if (sc === 2) {
    g = fh; P.mouth = 'closed';
    if (t < 8.9) { g = gazePlan(t, [[8.02, [1000, 680]]]); P.look = blend(t, 8.1, 8.4, 0, 0.6); P.mouth = 'closed'; P.handR = PERSON_HANDS.chin.R; }
    if (k11in(t, 8.94, 10.4)) { P.look = 0.5; g = [1000, 700]; P.handR = k11step(t, [[8.94, null], [9.3, PERSON_HANDS.pointFwd.R]], 0.2, K11REST.R); P.drop = 8 * pulse(t, 9.0, 0.35); }
    if (k11in(t, 10.4, 11.3)) { g = [470, 760]; const hit = [10.62, 10.86, 11.1].reduce((m, h) => Math.min(m, Math.abs(t - h)), 9); P.handR = [62 - 22 * K.clamp(1 - hit / 0.11), -128]; P.tip = 0.04; }
    if (k11in(t, 11.3, 12.12)) { P.handR = null; P.tip = -0.03; P.brow = -0.3; P.mouth = 'smile'; }
    if (k11in(t, 12.12, 13.3)) { P.handRW = [K11HANDS(t), 770]; P.tip = 0.06; P.mouth = 'smile'; P.lid = 0.15; }
    if (k11in(t, 13.3, 14.35)) { P.handR = k11step(t, [[13.3, null], [13.34, PERSON_HANDS.palmsUp.R], [13.6, [90, -175]]], 0.18, K11REST.R); P.handL = PERSON_HANDS.palmsUp.L; P.brow = -0.5; P.tilt = 0.08; g = t < 13.6 ? [230, 820] : [515, 760]; }
    if (k11in(t, 14.35, 15.3)) { P.handL = [-40, -84]; P.handR = [-20, -84]; P.tip = 0.1; g = [x + 200, 860]; P.dir = 1; P.handLW = [x - 6, 830]; P.handRW = [x + 6, 832]; P.handL = null; P.handR = null; }
    if (k11in(t, 15.3, 16.6)) { P.handR = k11step(t, [[15.3, null], [15.42, PERSON_HANDS.chest.R], [16.0, PERSON_HANDS.pointDown.R]], 0.18, K11REST.R); P.drop = 6 * pulse(t, 16.0, 0.3); }
    if (k11in(t, 16.6, 17.5)) g = [515, 760];
    if (t >= 17.5) { P.mouth = 'smile'; }
    if (k11in(t, 19.0, 19.85)) { P.lid = 0.1; P.brow = -0.2; }
    if (k11in(t, 19.85, 20.7)) { P.handRW = [K11HANDS(t), 772 + 10 * Math.sin((t - 19.88) * 25) * K.clamp(20.6 - t)]; P.sq = t > 20.2 ? 0.97 : 1; P.mouth = 'smile'; }
    if (k11in(t, 20.7, 21.7)) { g = t < 21.0 ? [F - 30, 790] : fh; P.handR = t > 21.05 ? [64, -196 + 10 * Math.sin(t * 16)] : null; P.mouth = 'smile'; }
  }
  // ---- S3: walk away with staff and bundle, a look back and a wave
  if (sc === 3) { P.dir = -1; g = [90, 790]; P.mouth = 'smile';
    if (k11in(t, 22.2, 22.9)) { g = fh; P.look = -0.8; P.handL = [-60, -196 + 10 * Math.sin(t * 16)]; } }
  // ---- S5: back down the road, drop the bundle, knock, greet, ask, listen
  if (sc === 5) {
    P.mouth = 'smile'; g = t < 34.6 ? [600, 760] : fh;
    if (k11in(t, 34.56, 35.4)) { const hit = [34.95, 35.15, 35.35].reduce((m, h) => Math.min(m, Math.abs(t - h)), 9); P.handR = [80 - 20 * K.clamp(1 - hit / 0.09), -126]; g = [450, 760]; }
    if (k11in(t, 35.64, 36.6)) { P.handR = PERSON_HANDS.pointFwd.R; P.mouth = 'smile'; P.talk = talk(t, [[35.7, 36.5]]); }
    if (k11in(t, 36.6, 41.4)) { P.lid = 0.15; P.brow = t > 40.24 ? -0.5 : -0.1; P.tilt = t > 40.24 ? 0.1 : 0; P.mouth = t > 38.9 ? 'closed' : 'smile'; P.handR = PERSON_HANDS.chin.R; P.handL = PERSON_HANDS.folded.L; }
    if (k11in(t, 41.4, 44.42)) { P.handR = PERSON_HANDS.chin.R; P.brow = -0.3; P.tilt = 0.06; }
    if (k11in(t, 44.42, 45.24)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.tip = 0.08; P.brow = -0.6; P.talk = talk(t, [[44.5, 45.2]]); }
    if (t >= 45.24) { P.tip = 0.1 * pulse(t, 45.24, 0.6); P.tilt = -0.08 * pulse(t, 45.3, 0.5); g = [515, 760]; }
  }
  // ---- S6: storeroom: o-mouth, eyes sweep the dust outlines, watch the cloud, look back at the friend
  if (sc === 6) {
    g = gazePlan(t, [[45.82, [300, 870]], [46.6, [180, 880]], [47.2, [420, 880]], [47.9, [320, 330]], [53.34, [320, 330]], [53.5, [300, 880]], [53.75, [800, 716]]], 0.12);
    P.mouth = t < 47.7 ? 'o' : 'closed'; P.lid = 0.15; P.brow = t > 50.9 ? -0.4 : -0.2; if (k11in(t, 52.44, 53.4)) P.brow = -0.7;
    P.handR = PERSON_HANDS.chin.R;
  }
  // ---- S7: astonished, look to camera, rap the padlock, notice onlookers, almost accuse, curl back, stroke beard, nod, pat, walk off smiling
  if (sc === 7) {
    g = fh; P.lid = 0; P.noBlink = t < 55.4;
    P.drop = -settleTo(t, 54.72, 0, 10, 0.3) * (t < 55.44 ? 1 : 0.3); P.brow = -0.8; P.mouth = t < 56.0 ? 'o' : 'closed'; P.eyes = t < 55.4 ? 'wide' : 'open';
    if (k11in(t, 55.44, 56.08)) { P.gaze = [0, 0.05]; P.lid = pulse(t, 55.6, 0.45); P.look = 0; }
    if (k11in(t, 56.08, 56.82)) { P.handR = k11step(t, [[56.08, null], [56.2, [90, -128]], [56.55, [30, -170]]], 0.12, K11REST.R); g = t < 56.5 ? [515, 790] : [x + 40, 740]; P.brow = t > 56.5 ? -0.6 : -0.3; P.mouth = t > 56.5 ? 'frown' : 'closed'; }
    if (k11in(t, 56.82, 58.14)) { g = [135, 700]; P.look = -0.4; P.handR = null; }
    if (k11in(t, 58.14, 58.76)) { P.handR = PERSON_HANDS.pointFwd.R; P.sq = anticipate(t, 58.14, 0.15, 0.05); P.brow = 0.6; P.handR = [K.lerp(40, 100, K11B(t, 58.2, 0.3, 'out')), -150]; }
    if (k11in(t, 58.76, 59.54)) { P.handR = k11step(t, [[58.76, [100, -150]], [58.9, [40, -120]]], 0.3); P.brow = blend(t, 58.76, 59.3, 0.6, 0); }
    if (k11in(t, 59.54, 60.38)) { P.handR = PERSON_HANDS.chin.R; P.brow = -0.2; g = gazePlan(t, [[59.54, [x - 40, 560]], [59.8, [x - 120, 600]], [60.05, [x - 30, 540]]], 0.07); }
    if (t >= 60.38) { P.drop = 7 * pulse(t, 60.4, 0.35); g = t < 60.6 ? [135, 700] : fh; if (k11in(t, 60.75, 61.05)) P.handRW = [K11FX(t) - 40, 750]; P.mouth = t > 61.05 ? 'smile' : 'closed'; if (t > 61.05) g = [-100, 700]; }
  }
  // ---- S8: strolls in with a basket, humming; stops the ball, waves back, hands the ball over, the idea
  if (sc === 8) {
    g = [x + 300, 700]; P.handL = [-30, -100]; P.mouth = t < 64.6 ? 'smile' : 'closed'; P.lid = 0.2;
    if (t > 64.47) g = [K11BALL(t)[0], 860];
    if (k11in(t, 66.08, 66.8)) { g = [K11BX(t), 800]; P.mouth = 'smile'; }
    if (k11in(t, 66.8, 67.78)) { P.drop = 22 * pulse(t, 66.85, 0.9); P.tip = 0.12 * pulse(t, 66.85, 0.9); P.handR = [80, -100 + 40 * pulse(t, 66.85, 0.9)]; g = t < 67.35 ? [K11BX(t), 800] : (t < 67.55 ? [1000, 700] : [K11BX(t), 800]); P.mouth = 'smile'; P.lid = t > 67.55 ? 0.35 : 0.1; }
  }
  // ---- S9: leads the boy by the hand; tray; kneels; finger; wait here; hush and wink
  if (sc === 9) {
    P.mouth = 'smile'; P.lid = 0.15; g = [K11BX(t), 800];
    if (t < 69.9) { P.handR = [56, -108]; }
    else {
      if (t < 71.25) { g = gazePlan(t, [[69.9, [640, 800]]]); }
      if (k11in(t, 71.25, 72.6)) { P.handLW = [520 - 10, 760 + 80 * K11B(t, 71.5, 0.9, 'inOut')]; P.handRW = [565, 762 + 80 * K11B(t, 71.5, 0.9, 'inOut')]; P.drop = 10; P.tip = 0.08; g = [540, 860]; }
      if (t >= 72.6) { P.kneel = blend(t, 73.36, 73.9, 0, 1); }
      if (k11in(t, 73.9, 75.08)) { P.handR = PERSON_HANDS.pointUp.R; P.brow = -0.2; P.mouth = 'closed'; }
      if (k11in(t, 75.08, 75.8)) { P.handR = k11step(t, [[75.08, [70, -120]], [75.4, [100, -90]]], 0.2); P.mouth = 'closed'; }
      if (t >= 75.8) { P.handR = PERSON_HANDS.hush.R; if (k11in(t, 76.1, 76.55)) P.wink = 'R'; P.mouth = 'smile'; }
    }
  }
  // ---- S10: out of his door, straightens the turban, the mask goes on, measured steps, hands behind
  if (sc === 10) {
    g = [x + 300, 700]; P.lid = 0.2;
    if (k11in(t, 77.0, 77.7)) { P.handR = [20, -238]; P.handL = [-24, -232]; P.drop = 3 * Math.sin(t * 20); }
    if (k11in(t, 77.7, 78.1)) { P.mouth = 'smile'; P.handR = k11step(t, [[77.7, null], [77.9, [10, -170]]], 0.12, K11REST.R); }
    if (t >= 78.1) { P.mouth = 'frown'; P.brow = 0.25; P.handL = [-6, -96]; P.handR = [-10, -100]; }
    if (t > 80.8) g = [K11FX(t), 710];
  }
  // ---- S11: calm, upright, slow blinks, strokes his beard, steady gaze
  if (sc === 11) { P.lid = 0.3; g = fh; P.handR = t > 82.4 ? PERSON_HANDS.chin.R : null; P.mouth = 'closed'; P.brow = 0.1; P.handL = PERSON_HANDS.folded.L; if (k11in(t, 81.6, 82.4)) P.tip = -0.04;
    P.lid = Math.max(0.3, pulse(t, 84.2, 0.45), pulse(t, 87.2, 0.45)); }
  // ---- S12: finger, then the friend's amazed poses, deadpan; but...; spreads the arms for the size; waves goodbye with his fingers
  if (sc === 12) {
    P.mouth = 'closed'; P.lid = 0.3; g = fh; P.talk = talk(t, [[89.9, 90.7], [91.3, 92.7], [93.2, 98.3]]) * 0.6;
    if (k11in(t, 88.92, 89.6)) P.handR = PERSON_HANDS.pointUp.R;
    if (k11in(t, 89.6, 90.4)) Object.assign(P, K11AMAZE1, { lid: 0.3, eyes: 'open' });
    if (k11in(t, 90.4, 91.0)) Object.assign(P, K11AMAZE2, { lid: 0.3, eyes: 'open' });
    if (t >= 90.8) g = [500, 360];
    if (k11in(t, 92.78, 93.46)) { P.handR = PERSON_HANDS.pointUp.R; g = [500, 180]; }
    if (k11in(t, 94.22, 95.1)) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.brow = -0.4; }
    if (k11in(t, 97.56, 98.6)) { P.handR = [60, -190 + 6 * Math.sin(t * 26)]; P.mouth = 'smile'; }
    if (t >= 98.4) g = fh;
  }
  // ---- S13: folded arms, only blinks, one brow up and the start of a smile
  if (sc === 13) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; g = [K11FX(t), 716]; P.lid = 0.3; if (k11in(t, 101.6, 101.8)) P.lid = 1;
    if (t > 105.58) { P.brow = -0.35; P.mouth = 'smile'; } }
  // ---- S14: stillness, unfold, calm palm, sweep the skyline, point at the rats, shrug, look cloud, cloud, friend
  if (sc === 14) {
    P.lid = 0.3; g = fh; P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.talk = talk(t, [[107.0, 108.0], [109.4, 116.4]]) * 0.6;
    if (t >= 106.9) { P.handL = k11step(t, [[106.9, PERSON_HANDS.folded.L], [107.2, null]], 0.4, K11REST.L); P.handR = k11step(t, [[106.9, PERSON_HANDS.folded.R], [107.2, null], [108.18, [70, -150]]], 0.4, K11REST.R); P.mouth = t > 108.18 ? 'smile' : 'closed'; }
    if (k11in(t, 109.66, 110.4)) { P.handR = [K.lerp(-40, 110, K11B(t, 109.66, 0.7, 'inOut')), -205]; g = [K.lerp(250, 800, K11B(t, 109.66, 0.7, 'inOut')), 450]; }
    if (k11in(t, 110.4, 111.58)) { P.handR = [60, -120]; g = [265, 330]; }
    if (k11in(t, 111.58, 113.6)) { P.handR = [-50, -205]; P.dir = 1; g = [265, 330]; }
    if (k11in(t, 113.6, 114.6)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.brow = -0.5; P.drop = 5; }
    if (k11in(t, 114.6, 115.56)) { P.handR = null; g = [735, 330]; }
    if (t >= 115.56) { P.handR = null; g = gazePlan(t, [[115.56, [265, 330]], [115.8, [735, 330]], [116.1, fh]], 0.1); }
  }
  // ---- S15: still, then one raised brow and the smallest wink
  if (sc === 15) { P.lid = 0.3; g = fh; P.handR = PERSON_HANDS.folded.R; P.handL = PERSON_HANDS.folded.L; if (t > 120.28) P.brow = -0.5 * K11B(t, 120.28, 0.3); if (k11in(t, 120.65, 121.0)) P.wink = 'R'; if (t > 120.9) P.mouth = 'smile'; }
  // ---- S16: listens; brows soften; nod; holds out his hand; the handshake covered with the other hand
  if (sc === 16) { P.lid = 0.3; g = fh; P.handR = PERSON_HANDS.folded.R; P.handL = PERSON_HANDS.folded.L;
    if (t > 124.66 && t < 130.9) g = [500, 320];
    if (t > 130.04) { P.brow = -0.3; P.drop = 6 * pulse(t, 130.5, 0.4); P.mouth = 'smile'; }
    if (t > 133.18 && t < 135.0) g = t < 134.0 ? [380, 300] : [620, 300];
    if (t >= 134.94) { P.drop = 7 * pulse(t, 135.0, 0.4); P.handR = k11step(t, [[134.94, [80, -120]], [135.7, () => k11loc(P, [K11HANDS(t), 772])]], 0.25); }
    if (t >= 135.9) { P.handL = k11loc(P, [K11HANDS(t) - 4, 754]); P.lid = 0.45; }
  }
  // ---- S17: hand in hand with the boy; watches the reunion, hands behind his back; takes the coins and the purse; claps the friend's shoulder
  if (sc === 17) {
    P.mouth = 'smile'; P.lid = 0.25; g = [K11BX(t), 820];
    if (t < 138.3) P.handR = [56, -108];
    if (k11in(t, 139.0, 143.3)) { P.handL = [-6, -96]; P.handR = [-10, -100]; g = [K11FX(t), 760]; P.lid = 0.4; }
    if (k11in(t, 144.6, 147.12)) { P.handR = [92, -128 + 6 * pulse(t % 0.5 + 144, 144.1, 0.3)]; g = [455, 770]; }
    if (k11in(t, 146.34, 147.12)) { P.handR = [86, -132 - 8 * pulse(t, 146.6, 0.35)]; P.drop = 6 * pulse(t, 146.7, 0.35); }
    if (t >= 147.4) { P.handRW = [K11FX(t) - 30, 726]; g = fh; }
  }
  // ---- S18: on the doorstep; side look; hush; silent laugh; studies the sky; chuckle
  if (sc === 18) {
    P.sit = 1; P.seat = 'bench'; P.mouth = 'smile'; P.lid = 0.3; g = [530, 820]; P.handL = [-20, -60]; P.handR = [20, -58];
    if (k11in(t, 149.98, 150.46)) g = fh;
    if (k11in(t, 150.46, 151.4)) { P.handR = PERSON_HANDS.hush.R; g = fh; P.drop = 6 * pulse(t, 151.0, 0.3); }
    if (k11in(t, 151.68, 152.6)) { P.lid = 1; P.drop = 3 * Math.sin(t * 30); P.mouth = 'smile'; }
    if (k11in(t, 152.72, 153.1)) g = [K11RATX(t), 900];
    if (k11in(t, 153.1, 153.4)) g = fh;
    if (k11in(t, 153.4, 155.24)) { g = [430, 300]; P.look = -0.2; }
    if (k11in(t, 155.24, 155.82)) g = [430, 900];
    if (k11in(t, 155.82, 157.3)) { P.drop = 2 * Math.sin(t * 28) * K.clamp(157.3 - t); g = fh; }
    if (t > 157.3) g = [K11RATX(t), 900];
  }
  if (k11bundleOn(t)) P.handL = [-26, -172];
  if (P.gaze == null) P.gaze = lookAt(k11head(P), g);
  P.lid = Math.max(P.lid ?? 0, P.noBlink ? 0 : blink(t, P.seed));
  return P;
}
const k11bundleOn = (t) => k11in(t, 8.94, 13.3) || k11in(t, 21.3, 23.75) || k11in(t, 32.6, 34.56);

// ---------- friend ----------
const K11FX = (t) => kfn(t, [[0, 695], [11.3, 695], [11.95, 600], [12.12, 600], [12.35, 585], [13.84, 585], [14.15, 650], [14.3, 650], [14.75, 760], [16.0, 760], [16.55, 625], [17.4, 625], [17.8, 600], [19.55, 600], [19.9, 575], [21.7, 575], [24.11, 575],
  [24.12, 695], [24.6, 640], [27.9, 640], [28.4, 575], [30.24, 575], [30.5, 550], [32.6, 550],          // S4
  [32.61, 695], [35.0, 695], [35.5, 600], [45.24, 600], [45.8, 560],                                                    // S5
  [45.82, 800], [54.71, 800], [54.72, 600], [61.62, 600],                                                               // S6, S7
  [77.0, 640], [79.92, 640], [80.35, 700], [80.75, 630], [81.27, 650],                                                  // S10 pacing
  [81.28, 640], [82.25, 420], [88.91, 420],                                                                              // S11
  [88.92, 600], [102.62, 600], [102.9, 545], [105.2, 545], [105.6, 590], [106.12, 600], [136.73, 600],                  // S12-S16
  [136.74, 620], [143.3, 620], [144.0, 545], [148.23, 545], [148.24, 630], [161, 630]]);
const K11FTURN = [[0, -1], [80.18, 1], [80.6, -1], [80.95, 1]];
const K11HANDS = (t) => (K11MX(t) + K11FX(t)) / 2;   // where their hands meet
function k11friend(t) {
  const sc = k11sc(t), x = K11FX(t), w = walk(K11FX, t, { stride: 24 * K11FS });
  const P = { x, y: 900, s: K11FS, costume: 'villager', pal: K11FPAL, dir: -1, ph: w.ph, amp: K.clamp(w.amp * 1.3), seed: 23, mouth: 'smile', age: 0.3 };
  const M = K11MX(t), [my, ms] = k11MYS(t), mh = [M, my - 195 * ms];
  let g = mh, on = true;
  if (sc === 1 || (sc === 2 && t < 11.3)) on = false;
  if (sc === 2 && t >= 14.3 && t < 14.75) P.dir = 1;
  if (sc === 4 && t < 24.12) on = false;
  if (sc === 5 && t < 35.0) on = false;
  if ([8, 9].includes(sc)) on = false;
  if (sc === 10 && t < 79.6) on = false;
  if (sc === 6) P.dir = -1;
  P.on = on;
  // ---- S2
  if (sc === 2) {
    P.alpha = K.clamp((t - 11.3) / 0.15);
    if (k11in(t, 11.3, 12.12)) { const [, lift] = hop(t, 11.45, 0.4, 0, 0, 12); P.y -= lift; P.sq = landSquash(t, 11.85, 0.12); P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.brow = -0.7; P.eyes = 'wide'; P.mouth = 'open'; }
    if (k11in(t, 12.12, 13.3)) { P.handRW = [K11HANDS(t), 770]; P.handLW = [M + 40, 720 + 8 * pulse((t - 12.3) % 0.35 + 12.3, 12.3, 0.25)]; P.tip = 0.06; P.y -= 4 * pulse((t - 12.3) % 0.35 + 12.3, 12.3, 0.25); }
    if (k11in(t, 13.3, 13.84)) g = gazePlan(t, [[13.3, [230, 820]], [13.6, [515, 760]]], 0.12);
    if (k11in(t, 13.84, 14.3)) { P.dir = 1; P.handR = [-60, -140]; P.handL = [-90, -150]; P.tip = -0.1; g = [515, 760]; }
    if (k11in(t, 14.3, 16.0)) { g = [K11CARTX(t), 820]; P.handL = [-50, -120]; }
    if (k11in(t, 16.55, 17.45)) { P.dir = -1; P.handR = [90, -135]; P.handL = [70, -140]; g = [515, 780]; P.tip = 0.05; }
    if (k11in(t, 17.52, 18.9)) { P.drop = 9 * (pulse(t, 17.6, 0.35) + pulse(t, 18.05, 0.35)); P.mouth = 'open'; }
    if (k11in(t, 19.0, 19.85)) { Object.assign(P, K11PROMISE); P.brow = -0.3; P.drop = -6; P.mouth = 'closed'; }
    if (k11in(t, 19.85, 20.7)) { P.handRW = [K11HANDS(t), 772 + 10 * Math.sin((t - 19.88) * 25) * K.clamp(20.6 - t)]; P.mouth = 'smile'; }
    if (k11in(t, 20.7, 21.7)) { P.handR = k11step(t, [[20.7, [50, -196]], [21.15, [40, -84]]], 0.25); P.mouth = 'smile'; g = t < 21.0 ? [x - 50, 700] : mh; }
  }
  // ---- S3: waves him off, the hand sinks; the eyes slide to the padlock
  if (sc === 3) { g = mh; P.handR = k11step(t, [[21.7, null], [22.36, [64, -196]], [23.0, null]], 0.4, K11REST.R); if (P.handR && t < 23) P.handR = [P.handR[0], P.handR[1] + 8 * Math.sin(t * 14) * K.clamp(23 - t)];
    P.mouth = t < 22.9 ? 'smile' : 'closed'; if (t > 23.7) { g = [515, 790]; P.lid = 0.2; } }
  // ---- S4: purse and moth, pockets out, a coin idea, shifty unlock, the sale, coins, fat purse, guilty look
  if (sc === 4) {
    P.dir = -1; g = [x - 60, 820]; P.mouth = 'closed';
    if (k11in(t, 24.12, 25.6)) { P.handR = [70, -150]; P.handL = [50, -175]; g = [x - 70, 740]; P.mouth = t < 24.9 ? 'smile' : 'o'; if (t > 24.95) { g = [x - 70 + 40 * (t - 24.95), 740 - 160 * (t - 24.95)]; P.lid = pulse(t, 25.1, 0.4); } }
    if (k11in(t, 25.6, 27.38)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.brow = -0.7; P.mouth = 'frown'; P.sq = blend(t, 25.62, 26.0, 1, 0.96); g = [x, 820]; }
    if (k11in(t, 27.38, 27.92)) { P.brow = -0.5; P.mouth = 'closed'; P.noBlink = true; P.lid = 0; g = gazePlan(t, [[27.38, [x + 40, 600]], [27.5, [600, 720]], [27.62, [560, 760]], [27.74, [515, 790]]], 0.07); }
    if (k11in(t, 27.92, 29.44)) { g = gazePlan(t, [[27.92, [0, 700]], [28.05, [1000, 700]], [28.2, [0, 700]], [28.4, [515, 790]], [28.95, [K11BUYX(t), 700]]], 0.07); P.drop = -4; P.handR = t < 28.9 ? [80, -110] : [70, -170 + 12 * Math.sin(t * 20)]; }
    if (k11in(t, 29.44, 30.24)) { g = [x + 120, 650]; P.lid = 0.3; P.handR = [60, -120]; }
    if (k11in(t, 30.24, 31.02)) { P.handR = [100, -120 + 6 * [30.4, 30.62, 30.84].reduce((s, h) => s + pulse(t, h, 0.15), 0)]; g = [455, 790]; P.mouth = 'smile'; }
    if (k11in(t, 31.02, 31.72)) { P.handR = [60, -122 + 10 * Math.sin((t - 31.02) * 18) * K.clamp(31.6 - t)]; P.mouth = 'smile'; g = [x + 40, 800]; P.eyes = 'wide'; }
    if (t >= 31.72) { P.handR = PERSON_HANDS.chest.R; P.mouth = 'smile'; if (k11in(t, 31.9, 32.25)) P.gaze = [0, 0.05]; else g = [x - 120, 760]; }
  }
  // ---- S5: frozen smile, gulp, sweat; saccades; inhale and the mask; the secret; cheeks; searching; the rat; the idea; tug the sleeve
  if (sc === 5) {
    P.alpha = K.clamp((t - 35.0) / 0.15); P.mouth = 'smile'; g = mh;
    if (k11in(t, 35.2, 35.8)) { P.drop = 6 * pulse(t, 35.4, 0.3); }
    if (k11in(t, 36.74, 37.52)) { g = gazePlan(t, [[36.74, [515, 780]], [36.92, mh], [37.1, [x - 40, 900]], [37.28, mh]], 0.06); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = 'closed'; P.x += 4 * Math.sin(t * 14); }
    if (k11in(t, 37.52, 38.88)) { const inh = anticipate(t, 37.52, 0.35, -0.04); Object.assign(P, t > 37.9 ? K11AMAZE1 : {}); P.sq = inh; if (t > 37.9) P.drop = -6; }
    if (k11in(t, 38.88, 40.24)) { P.handR = PERSON_HANDS.cupMouth.R; P.tip = 0.1; P.mouth = 'o'; P.talk = talk(t, [[39.24, 40.2]]); if (k11in(t, 39.1, 39.4)) g = [x + 300, 700]; }
    if (k11in(t, 40.24, 41.48)) { Object.assign(P, K11AMAZE2); P.talk = talk(t, [[40.3, 41.5]]); }
    if (k11in(t, 41.48, 43.66)) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = Math.sin(t * 9) > 0 ? 'o' : 'closed'; P.brow = -0.4;
      g = gazePlan(t, [[41.48, [x - 80, 400]], [41.66, [x + 120, 420]], [41.86, [x - 20, 360]], [42.05, [x + 60, 430]], [42.3, [K11RATX(42.3), 895]]], 0.07); if (t > 42.3) g = [K11RATX(t), 895]; }
    if (k11in(t, 43.66, 44.42)) { P.eyes = t < 43.9 ? 'wide' : 'open'; P.mouth = t < 43.85 ? 'smile' : 'closed'; P.handR = PERSON_HANDS.pointUp.R; P.sq = settleTo(t, 43.66, 0.97, 1.02, 0.3); }
    if (t >= 45.24) { P.handRW = [M + 40, 770]; P.tip = 0.08; P.mouth = 'smile'; g = [515, 780]; }
    if (t > 35.6 && t < 45.3) P.wetSweat = 1;
  }
  // ---- S6: presents the room; mimes setting it down; nods; dusts hands; fingers scurry; chomps; shrugs smiling too hard
  if (sc === 6) {
    g = gazePlan(t, [[45.82, [300, 870]], [47.86, [320, 400]], [49.56, mh], [50.3, [320, 400]], [53.34, mh]], 0.15); P.mouth = 'smile'; P.talk = talk(t, [[46.9, 47.8], [48.3, 50.3], [50.6, 54.0]]) * 0.7;
    if (k11in(t, 45.82, 47.7)) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.brow = -0.5; }
    if (k11in(t, 47.86, 48.7)) { P.handL = PERSON_HANDS.reachBoth.L; P.handR = PERSON_HANDS.reachBoth.R; P.drop = 10 * K11B(t, 47.9, 0.5); P.sq = 1 - 0.06 * pulse(t, 47.9, 0.8); }
    if (k11in(t, 48.7, 49.56)) P.drop = 8 * pulse(t, 48.8, 0.35);
    if (k11in(t, 49.56, 50.92)) { P.handL = [20 + 8 * Math.sin(t * 30), -136]; P.handR = [30 - 8 * Math.sin(t * 30), -132]; P.brow = -0.6; }
    if (k11in(t, 50.92, 52.44)) { P.handR = [100 + 10 * Math.sin(t * 26), -120 + 8 * Math.cos(t * 31)]; P.handL = [60, -112 + 6 * Math.sin(t * 27)]; }
    if (k11in(t, 52.44, 53.34)) { const c = Math.abs(Math.sin(t * 16)); P.handL = [70, -150 + 18 * c]; P.handR = [80, -170 - 18 * c]; P.mouth = c > 0.5 ? 'open' : 'closed'; P.talk = 0; }
    if (t >= 53.34) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.mouth = 'smile'; P.brow = -0.6; P.drop = -4; }
  }
  // ---- S7: flinch behind his hands, peek with one eye, breathe out; patted on the shoulder
  if (sc === 7) { g = mh; P.mouth = 'smile'; P.brow = -0.6; if (t < 56.82) P.handL = PERSON_HANDS.palmsUp.L, P.handR = PERSON_HANDS.palmsUp.R;
    if (k11in(t, 58.14, 59.54)) { P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; P.sq = 0.93; P.lid = 1; P.mouth = 'frown'; }
    if (k11in(t, 59.54, 60.4)) { P.wink = 'L'; P.mouth = 'o'; P.sq = blend(t, 59.9, 60.3, 0.93, 1); }
    if (k11in(t, 60.75, 61.1)) { P.y += 4 * pulse(t, 60.8, 0.2); P.mouth = 'smile'; } if (t > 61.1) { g = [M, 700]; P.mouth = 'smile'; } }
  // ---- S10: paces in front of his door, wringing his hands; stops dead
  if (sc === 10) { const tf = turnFlip(t, K11FTURN, 0.35); P.dir = tf.dir * -1 * -1; P.dir = tf.dir; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = 'frown'; P.brow = -0.7; P.alpha = 1;
    g = gazePlan(t, [[79.6, [1000, 720]], [80.18, [0, 720]], [80.6, [1000, 720]], [80.95, mh]], 0.1); if (t > 80.95) { P.dir = -1; P.eyes = 'wide'; } }
  // ---- S11: runs to him, grabs his sleeves; trembling, wet eyes; the balloon; hand at the boy's height; up the road, down the road; points back; clutches his head
  if (sc === 11) {
    P.brow = -0.8; P.mouth = 'frown'; g = mh; P.wet = t > 83.7;
    if (t < 82.4) { P.tip = 0.12 + lurch(t, 82.25, 0.2); P.handL = [100, -150]; P.handR = [110, -140]; }
    if (k11in(t, 82.4, 85.5)) { P.handLW = [M + 40, 760]; P.handRW = [M + 34, 780]; P.tip = 0.08; P.talk = talk(t, [[82.6, 85.9]]); if (t > 83.7) P.x += tremble(t, 2); }
    if (k11in(t, 85.5, 85.98)) { P.handR = [70, -125 + tremble(t, 3)]; P.talk = talk(t, [[85.5, 85.98]]); }
    if (k11in(t, 85.98, 87.66)) { P.handR = [70, -125]; g = gazePlan(t, [[85.98, [1000, 760]], [86.6, [-200, 760]], [87.2, mh]], 0.1); P.look = t < 86.6 ? -0.6 : t < 87.2 ? 0.6 : 0; P.talk = talk(t, [[86.93, 87.66]]); }
    if (k11in(t, 87.66, 88.3)) { P.handR = [-80, -170]; P.tip = 0.05; P.talk = talk(t, [[87.66, 88.3]]); }
    if (t >= 88.3) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.talk = talk(t, [[88.3, 88.92]]); }
  }
  // ---- S12: hopeful toward the picture, half smile, follows the finger up, jaw hangs, rocks back
  if (sc === 12) { g = mh; P.mouth = 'closed'; P.brow = -0.6; P.wet = true;
    if (t > 90.8) { g = [500, 360]; P.tip = 0.06; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
    if (k11in(t, 92.08, 92.78)) P.mouth = 'smile';
    if (k11in(t, 92.78, 93.46)) { g = gazePlan(t, [[92.78, mh], [93.0, [500, 180]]], 0.15); }
    if (t >= 93.46) { P.eyes = 'wide'; P.mouth = t > 97.56 ? 'open' : 'o'; P.brow = -0.9; }
    if (t >= 98.5) { P.tip = -0.1 * settleTo(t, 98.5, 0, 1, 0.3); P.mouth = 'open'; } }
  // ---- S13: crouch, jump, land; arms up; IMPOSSIBLE; step in, palms up; bird flaps; heavy lift; points at the sky and shakes his head
  if (sc === 13) {
    P.brow = 0.9; P.mouth = 'open'; g = mh; P.talk = talk(t, [[99.75, 102.6], [103.17, 106.1]]);
    if (k11in(t, 98.98, 100.84)) { P.sq = anticipate(t, 99.4, 0.25, 0.1); const [, lift] = hop(t, 99.65, 0.45, 0, 0, 30); P.y -= lift; if (t > 100.1) P.sq = landSquash(t, 100.1, 0.14); P.handL = [-50, -110]; P.handR = [50, -110]; }
    if (k11in(t, 100.84, 102.62)) { P.aL = [-2.6, -2.9]; P.aR = [2.6, 2.9]; P.handL = null; P.handR = null; }
    if (k11in(t, 102.62, 104.18)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.tip = 0.12; P.brow = 0.6; }
    if (k11in(t, 104.18, 105.12)) { const f = Math.sin(t * 30); P.handL = [-50, -150 - 14 * f]; P.handR = [50, -150 - 14 * f]; P.brow = -0.7; P.mouth = 'smile'; }
    if (k11in(t, 105.12, 105.58)) { P.handL = [-30, -70]; P.handR = [30, -70]; P.sq = 0.9; P.drop = 8; P.mouth = 'frown'; P.x += tremble(t, 2); }
    if (t >= 105.58) { P.handR = [40, -215]; P.look = 0.5 * Math.sin((t - 105.58) * 18); g = [600, 300]; }
  }
  // ---- S14: panting; eyes follow the hand; head turns to his own lie; swallow; cloud, cloud, merchant; sinks
  if (sc === 14) {
    P.mouth = 'open'; P.brow = 0.3; P.sq = breathe(t, 3, 0.03) * (t > 116.3 ? 0.92 : 1); P.y += 3 * Math.sin(t * 9) * K.clamp(108 - t); g = mh;
    if (t > 109.66) g = t < 110.4 ? [K.lerp(250, 800, K11B(t, 109.66, 0.7, 'inOut')), 450] : [265, 330];
    if (t > 112.24) { P.mouth = 'closed'; P.drop = 8 * pulse(t, 112.4, 0.3); P.brow = -0.3; }
    if (t > 114.58) g = [735, 330];
    if (t >= 116.3) { g = gazePlan(t, [[116.3, [265, 330]], [116.55, [735, 330]], [116.85, mh]], 0.08); P.eyes = 'open'; P.brow = -0.6; P.handL = [-40, -66]; P.handR = [40, -66]; }
  }
  // ---- S15: mouth shut, hand covers it; frozen, one blink; pupils slide to the merchant; blush, sweat; shame
  if (sc === 15) {
    P.mouth = 'closed'; P.handR = t > 117.5 ? PERSON_HANDS.mouthCover.R : null; P.lid = 0; P.noBlink = true; g = [x - 80, 680]; P.brow = -0.4;
    if (k11in(t, 118.4, 118.6)) P.lid = 1;
    if (t >= 118.96) g = [K.lerp(x - 80, M, K11B(t, 118.96, 0.9, 'inOut')), 690];
    if (t >= 121.66) { const u = K11B(t, 121.66, 0.9, 'inOut'); g = t < 121.9 ? mh : [x - 40, 1000]; P.drop = 18 * u; P.sq = 1 - 0.05 * u; P.handR = null; P.brow = -0.6; }
    P.blush = K11B(t, 121.1, 0.6);
  }
  // ---- S16: exhale, meet the eyes, shake the head, thumb to chest, empty pocket, promise pose, offers, handshake
  if (sc === 16) {
    P.mouth = 'closed'; P.blush = K.clamp(1 - (t - 122.76) / 3); g = [x - 40, 950]; P.drop = 10; P.talk = talk(t, [[123.19, 127.4], [128.29, 131.44], [131.98, 135.9]]) * 0.8;
    if (t < 123.42) { P.sq = 1 - 0.04 * pulse(t, 122.8, 0.6); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.drop = 18 - 18 * K11B(t, 122.8, 0.5); }
    if (t >= 123.42) { g = mh; P.wet = true; P.brow = -0.6; P.drop = 0; }
    if (k11in(t, 124.66, 127.6)) g = [500, 320];
    if (k11in(t, 125.6, 126.6)) P.look = 0.5 * Math.sin((t - 125.6) * 12);
    if (k11in(t, 127.94, 128.64)) { P.handR = [10, -128]; g = [x, 950]; }
    if (k11in(t, 128.64, 130.04)) g = [500, 320];
    if (k11in(t, 130.04, 131.44)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.brow = -0.7; P.mouth = 'frown'; }
    if (k11in(t, 131.44, 133.18)) { Object.assign(P, K11PROMISE); P.sq = settleTo(t, 131.44, 1, 1.03, 0.4); P.brow = -0.3; }
    if (k11in(t, 133.18, 134.0)) { P.handL = [-80, -150]; g = [380, 300]; }
    if (k11in(t, 134.0, 135.7)) { P.handR = [-60, -150]; P.handL = [-80, -150]; g = [620, 300]; }
    if (t >= 135.7) { P.handRW = [K11HANDS(t), 772]; P.handL = null; P.handR = null; P.mouth = 'smile'; P.wet = true; }
  }
  // ---- S17: sees the boy, opens up, kneels, the hug and lift, a bite of bread, sets him down, the purse, coins, the whole purse, promise kept
  if (sc === 17) {
    P.mouth = 'frown'; P.brow = -0.7; g = [x - 300, 760];
    if (t > 138.3) { g = [K11BX(t), 820]; }
    if (k11in(t, 139.0, 140.42)) { P.eyes = t < 139.1 ? 'wide' : 'open'; P.mouth = 'open'; P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.brow = -0.8; P.wet = true; }
    if (k11in(t, 140.42, 141.44)) { P.kneel = settleTo(t, 140.42, 0, 1, 0.3); P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.wet = true; P.mouth = 'open'; P.sq = landSquash(t, 140.7, 0.1); }
    if (k11in(t, 141.44, 143.3)) { P.kneel = blend(t, 141.6, 142.1, 1, 0); P.handL = [40, -120]; P.handR = [50, -130]; P.wet = true; P.mouth = 'smile'; P.lid = t > 142.7 ? 0 : 0.6; P.sq = impactSquash(t, 141.44, 0.9);
      const tf = turnFlip(t, [[0, -1], [142.0, 1], [142.45, -1]], 0.4); P.dir = tf.dir; if (t > 142.7) { P.mouth = 'open'; P.eyes = 'wide'; P.lid = 0; } }
    if (k11in(t, 143.3, 144.84)) { P.handR = t < 143.8 ? [10, -118] : [70, -126]; P.mouth = 'smile'; g = mh; }
    if (k11in(t, 144.84, 146.34)) { P.handR = [95, -136]; P.handL = [60, -130]; g = [455, 770]; P.mouth = 'smile'; }
    if (k11in(t, 146.34, 147.12)) { P.handR = [100, -130]; g = mh; }
    if (t >= 147.12) { Object.assign(P, K11PROMISE); P.brow = -0.2; P.mouth = 'smile'; P.drop = -5; g = mh; }
  }
  // ---- S18: on the doorstep; about to speak; hush; silent laugh; studies the sky; pulls the boy close
  if (sc === 18) {
    P.sit = 1; P.seat = 'bench'; P.mouth = 'smile'; g = [530, 820]; P.handL = [-20, -60]; P.handR = [20, -58];
    if (k11in(t, 149.98, 150.46)) { P.handR = PERSON_HANDS.pointUp.R; P.mouth = 'open'; g = mh; }
    if (k11in(t, 150.56, 151.5)) { P.handR = PERSON_HANDS.hush.R; g = mh; P.drop = 6 * pulse(t, 151.1, 0.3); P.mouth = 'closed'; }
    if (k11in(t, 151.68, 152.6)) { P.lid = 1; P.drop = 3 * Math.sin(t * 30 + 1); P.mouth = 'open'; }
    if (k11in(t, 152.72, 153.1)) g = [K11RATX(t), 900];
    if (k11in(t, 153.1, 153.4)) g = mh;
    if (k11in(t, 153.4, 155.24)) { g = [700, 300]; P.look = 0.2; }
    if (k11in(t, 155.24, 155.82)) g = [630, 905];
    if (t >= 155.82) { P.handL = [-90, -150]; g = t < 156.0 ? [800, 320] : [530, 820]; }
    if (t > 157.3) g = [K11RATX(t), 900];
  }
  if (P.gaze == null) P.gaze = lookAt(k11head(P), g);
  P.lid = Math.max(P.lid ?? 0, P.noBlink ? 0 : blink(t, P.seed));
  return P;
}

// ---------- the boy ----------
const K11BX = (t) => kfn(t, [[0, -150], [64.47, -150], [65.6, -470], [66.08, -470], [66.8, -470], [67.2, -545], [67.78, -545], [69.6, -275], [69.88, -275],
  [69.9, 150], [70.9, 640], [76.98, 640],
  [136.74, -10], [138.2, 320], [138.3, 320], [139.0, 545], [143.3, 545], [143.6, 650], [148.23, 650], [148.24, 530], [161, 530]]);
const K11BALL = (t) => {   // [x, y, rot] of the ball: bounced, gets away, rolls to the merchant, handed back, carried
  if (t < 66.08) { const u = ((t - 64.47) / 0.42) % 1, x = K11BX(t) - 30; return [x, 900 - 16 - 90 * 4 * u * (1 - u) - 60, t * 6]; }
  if (t < 66.85) { const u = K11B(t, 66.08, 0.6, 'out'); return [K.lerp(K11BX(t) - 30, -705 + 30, u), 884 - 18 * Math.abs(Math.sin(u * 7)) * (1 - u), -u * 12]; }
  if (t < 67.3) { const u = K11B(t, 66.9, 0.4, 'inOut'); return [K.lerp(-675, K11BX(t) - 40, u), K.lerp(884, 790, u) - 40 * Math.sin(Math.PI * u), 0]; }
  return [K11BX(t) - 22, 800, 0];
};
function k11boy(t) {
  const sc = k11sc(t), x = K11BX(t), w = walk(K11BX, t, { stride: 12 });
  const P = { x, y: 900, s: 1, child: true, costume: 'villager', pal: K11BPAL, dir: -1, ph: w.ph, amp: K.clamp(w.amp * 1.6), seed: 37, mouth: 'smile', on: false };
  const M = K11MX(t), mh = [M, 900 - 195 * K11MS];
  let g = mh;
  if (sc === 8 && t >= 64.4) { P.on = true; g = [K11BALL(t)[0], K11BALL(t)[1]]; P.mouth = 'open';
    if (t < 66.08) { P.handR = [70, -60 - 30 * Math.abs(Math.sin((t - 64.47) / 0.42 * Math.PI))]; }
    if (k11in(t, 66.08, 66.85)) { P.mouth = 'o'; P.eyes = 'wide'; }
    if (k11in(t, 66.3, 66.9)) { g = mh; P.mouth = 'smile'; P.aR = [2.4, 2.8 + 0.3 * Math.sin(t * 18)]; }
    if (t >= 66.9) { g = t < 67.35 ? [K11BALL(t)[0], K11BALL(t)[1]] : mh; P.handR = [60, -80]; P.handL = [50, -70]; P.mouth = 'smile'; } }
  if (sc === 9) { P.on = true; P.dir = t < 69.9 ? 1 : 1; P.mouth = 'smile';
    if (t < 69.9) { P.handL = [-60, -70 + 14 * Math.sin(t * 9)]; P.handR = [50, -80]; g = [x + 200, 700]; }
    else { g = gazePlan(t, [[69.9, [300, 500]], [70.3, [700, 380]], [70.65, [900, 600]], [71.0, [560, 760]]], 0.12);
      if (t > 70.9) { P.sit = blend(t, 70.9, 71.1, 0, 1); P.seat = 'floor'; P.sq = landSquash(t, 71.1, 0.14); P.dir = -1; }
      if (k11in(t, 71.5, 72.58)) { g = [530, 860]; P.eyes = t > 72.0 ? 'wide' : 'open'; P.mouth = 'o'; }
      if (k11in(t, 72.58, 73.36)) { const c = Math.sin(t * 14); P.handL = [40, -72 + 10 * c]; P.handR = [50, -76 - 10 * c]; P.lid = 0.6; P.mouth = c > 0 ? 'closed' : 'smile'; P.cheek = c; }
      if (k11in(t, 73.36, 75.08)) { g = [K11MX(t), 790]; P.handL = [30, -60]; P.handR = [40, -64]; P.mouth = 'closed'; P.cheek = 0.6; }
      if (k11in(t, 75.08, 75.8)) { P.drop = 8 * (pulse(t, 75.2, 0.25) + pulse(t, 75.5, 0.25)); g = [K11MX(t), 790]; P.cheek = 0.6; P.mouth = 'closed'; }
      if (t >= 75.8) { g = [K11MX(t), 790]; P.lid = pulse(t, 76.2, 0.35); if (t > 76.5) P.mouth = 'open'; } } }
  if (sc === 17) { P.on = true; P.dir = 1; g = [700, 760];
    if (t < 138.3) { const [, lift] = hop(t, Math.floor((t - 136.74) / 0.36) * 0.36 + 136.74, 0.36, 0, 0, 10); P.y -= lift; P.handL = [-56, -78]; P.handR = [60, -90]; }
    if (k11in(t, 138.3, 139.1)) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.mouth = 'open'; g = [K11FX(t), 740]; }
    if (k11in(t, 139.1, 141.44)) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; g = [K11FX(t), 760]; }
    if (k11in(t, 141.44, 143.3)) { const tf = turnFlip(t, [[0, -1], [142.0, 1], [142.45, -1]], 0.4), fx = K11FX(t);
      P.x = fx + 28 * -tf.dir; P.y = 900 - 70 * blend(t, 141.6, 142.1, 0.3, 1) * (t < 143.1 ? 1 : 0); P.dir = -tf.dir; P.handL = [60, -90]; P.handR = [70, -100]; P.legSwing = swing(t, 141.6, 0.5);
      if (t > 142.7) { P.handR = [90, -120]; P.mouth = 'smile'; } g = [fx, 720]; }
    if (k11in(t, 143.3, 147.0)) { P.dir = -1; g = [455, 770]; P.mouth = 'smile'; }
    if (t >= 147.4) { P.dir = -1; Object.assign(P, K11PROMISE); P.mouth = 'smile'; g = [K11FX(t), 730]; } }
  if (sc === 18) { P.on = true; P.sit = 1; P.seat = 'bench'; P.dir = 1; P.mouth = 'smile'; g = [430, 700]; P.y = 900 - 24 + 24; P.handL = [-30, -60]; P.handR = [30, -60];
    if (k11in(t, 153.38, 154.3)) { P.handR = [100, -80]; g = [K11RATX(t), 900]; P.mouth = 'open'; }
    if (k11in(t, 155.24, 156.0)) { P.handR = [60, -200]; g = [700, 300]; P.mouth = 'open'; }
    if (t > 157.3) g = [K11RATX(t), 900];
    if (k11in(t, 159.4, 160.2)) { P.handR = [64, -196 + 12 * Math.sin(t * 16)]; P.gaze = [0, 0.05]; } }
  if (P.gaze == null) P.gaze = lookAt(k11head(P), g);
  P.lid = Math.max(P.lid ?? 0, P.noBlink ? 0 : blink(t, P.seed));
  return P;
}

// ---------- buyer and passers-by ----------
const K11BUYX = (t) => kfn(t, [[0, -250], [28.2, -250], [29.2, 300], [30.24, 300], [30.45, 345], [31.72, 345], [31.95, 300], [32.6, -150]]);
const K11CARTX = (t) => kfn(t, [[0, -320], [0.3, -320], [3.7, 230], [8.02, 230], [14.35, 230], [15.3, 515], [24.12, 515], [29.44, 515], [30.2, 470], [31.95, 470], [32.6, 25]]);
const K11CARTIN = (t) => (k11in(t, 15.3, 29.44) ? K11B(t, 15.3, 0.5, 'inOut') : k11in(t, 29.44, 29.9) ? 1 - K11B(t, 29.44, 0.46, 'inOut') : 0);   // into the storeroom depth
function k11buyer(t) { const x = K11BUYX(t), w = walk(K11BUYX, t, { stride: 24 }); const P = { x, y: 900, s: 0.95, costume: 'physician', pal: K11BUYPAL, age: 0.6, dir: speed(K11BUYX, t) < -5 ? -1 : 1, ph: w.ph, amp: K.clamp(w.amp * 1.3), seed: 41, mouth: 'smile', on: k11sc(t) === 4 && t > 28.1 };
  P.gaze = lookAt(k11head(P), [K11FX(t), 720]); P.lid = blink(t, 41);
  if (k11in(t, 29.44, 30.24)) { const r = Math.sin(t * 24); P.handL = [10 + 8 * r, -120]; P.handR = [20 - 8 * r, -116]; P.gaze = lookAt(k11head(P), [K11CARTX(t), 780]); }
  if (k11in(t, 30.24, 31.02)) { P.handR = [96, -128 - 10 * [30.4, 30.62, 30.84].reduce((s, h) => s + pulse(t, h - 0.08, 0.15), 0)]; P.gaze = lookAt(k11head(P), [455, 790]); }
  if (t >= 31.72) { P.handLW = [K11CARTX(t) - 175, 828]; P.handRW = [K11CARTX(t) - 170, 832]; P.tip = -0.06; }
  return P; }
const K11PAX = (t) => kfn(t, [[0, 980], [3.6, -170], [56.0, -170], [56.82, 80]], 'lin');
const K11PBX = (t) => kfn(t, [[0, -120], [2.2, -120], [4.4, 780], [56.1, -150], [56.9, 190]], 'lin');
const K11PCX = (t) => kfn(t, [[0, 1100], [2.4, 1100], [2.5, 900], [3.8, -200]], 'lin');
function k11passers(t) {
  const sc = k11sc(t), out = [];
  if (sc === 1 || sc === 7) {
    const ax = K11PAX(t), bx = K11PBX(t), wa = walk(K11PAX, t, { stride: 20 }), wb = walk(K11PBX, t, { stride: 22 });
    const A = { x: ax, y: 880, s: 0.85, costume: 'villager', pal: { robe: C.blue, dot: '#0d2f80' }, dir: speed(K11PAX, t) < 0 ? -1 : 1, ph: wa.ph, amp: K.clamp(wa.amp * 1.4), seed: 51, mouth: 'closed', handR: [20, -210], lane: 0 };
    const B = { x: bx, y: sc === 1 ? 930 : 880, s: sc === 1 ? 1.05 : 0.85, costume: 'villageWoman', dir: speed(K11PBX, t) < 0 ? -1 : 1, ph: wb.ph, amp: K.clamp(wb.amp * 1.4), seed: 53, mouth: 'closed', handL: [-50, -100], lane: sc === 1 ? 2 : 0 };
    if (sc === 1) { A.gaze = k11in(t, 2.4, 2.9) ? lookAt(k11head(A), [230, 800]) : [-1, 0]; B.gaze = [1, 0]; B.drop = 6 * pulse(t, 2.3, 0.4); }
    else { A.dir = 1; B.dir = 1; const turn = (i) => K11B(t, 57.2 + stagger(i, 0.13), 0.3, 'inOut'); const mx = K11MX(t), fx = K11FX(t);
      A.gaze = t > 57.2 ? lookAt(k11head(A), [K.lerp(mx, fx, turn(0) * (t > 58.14 ? 0 : 1)), 720]) : [1, 0]; B.gaze = t > 57.2 ? lookAt(k11head(B), [K.lerp(mx, fx, turn(1) * (t > 58.14 ? 0 : 1)), 720]) : [1, 0];
      if (t > 58.14 && t < 59.5) { A.mouth = 'o'; B.mouth = 'o'; B.handR = PERSON_HANDS.mouthCover.R; }
      if (t > 60.38) { A.drop = 6 * pulse(t, 60.5, 0.35); B.drop = 6 * pulse(t, 60.62, 0.35); } }
    out.push(A, B);
    if (sc === 1) { const cx = K11PCX(t), wc = walk(K11PCX, t, { stride: 22 }); out.push({ x: cx, y: 915, s: 0.9, costume: 'villager', pal: { robe: GREEN2, dot: GREEN, beard: 'none' }, dir: -1, ph: wc.ph, amp: 1, seed: 55, mouth: 'o', tip: 0.1, handL: [60, -150], handR: [70, -140], lane: 1, gaze: [-1, 0] }); }
  }
  return out;
}
// ---------- the real rat (S5 into its hole, S18 to the nail and away) ----------
const K11RATX = (t) => (t < 100 ? kfn(t, [[42.3, 920], [43.3, 640]], 'lin') : kfn(t, [[152.72, 1080], [153.38, 790], [157.5, 790], [157.6, 800], [158.3, 1100]], 'lin'));
function k11realRat(t) {
  const sc = k11sc(t); if (sc === 5 && k11in(t, 42.3, 43.35)) { const w = walk(K11RATX, t, { stride: GAIT.rat * 0.5 }); return { ...w, y: 902, s: 0.5, dir: -1, tailUp: 0.2, sniff: 0.3 }; }
  if (sc === 18 && t > 152.72) { const w = walk(K11RATX, t, { stride: GAIT.rat * 0.5 }), P = { ...w, y: 905, s: 0.5, dir: t < 157.6 ? -1 : 1 };
    if (k11in(t, 153.38, 157.5)) { P.sniff = 0.5 + 0.5 * Math.sin(t * 9); P.sit = t > 156.6 ? K11B(t, 156.6, 0.3) : 0; }
    if (k11in(t, 157.5, 157.8)) { P.chew = 1; P.sit = 1; }
    if (t >= 157.8) { P.ears = -1; P.eyes = t < 158.3 ? 'x' : 'open'; P.sit = t < 158.0 ? 1 : 0; P.y -= Math.abs(Math.sin((t - 157.8) * 10)) * 18; }
    return P; }
  return null;
}
