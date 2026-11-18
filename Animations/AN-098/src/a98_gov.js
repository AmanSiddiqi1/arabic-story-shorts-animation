// ===== AN-098 Abdullah's hall in Armenia (palaceHall, blue wall): S5-S7 (35.0-67.0), S9 (72.62-83.28), S11-S12 (105.04-129.68)
// measured on the set: door arch x 40..250 (top 480), dais x 560..900 top 860, throne x 730 (sitY 848), stool x 300 (forger sits at x 322)
const A98_THX = 730, A98_SITY = 848, A98_DAIS = 860, A98_STOOLX = 322;
const A98_AX6 = 670;                                      // v2: Abdullah stands here in S6 (on the dais) weighing the two fates on his palms
// local hand targets in S6: right palm (toward the forger) carries the reward box, left palm the punishment box (it sinks at 58.94)
function a98BargainHands(t) { const kR = a98E(t, 54.32, 0.3), kL = a98E(t, 57.06, 0.3), dropL = 20 * a98E(t, 58.94, 0.3);
  return { R: [K.lerp(30, 106, kR), K.lerp(-95, -138, kR)], L: [K.lerp(-30, -100, kL), K.lerp(-95, -138, kL) + dropL], tip: 0.1 * a98E(t, 59.6, 0.35) }; }
// box centre above a palm (world): Abdullah faces left (dir -1), s 1.05, feet on the dais (860)
function a98BoxAt(t, side) { const B = a98BargainHands(Math.min(t, 60.59)), h = B[side]; return [A98_AX6 - 1.05 * (h[0] + -h[1] * Math.sin(B.tip)), A98_DAIS + 1.05 * h[1] - 50]; }
const A98_BOXC = [559, 665], A98_BOXS = [775, 686];       // resting positions of the bargain boxes (for gazes)
const A98_GCAM = [   // v2: one establishing wide per visit, then dialogue framing (zoom 1.45-1.9, feet near the panel bottom)
  [35.0, { x: 500, y: 615, zoom: 1.0 }], [36.5, { x: 500, y: 615, zoom: 1.0 }], [36.55, { x: 560, y: 750, zoom: 1.6 }], [39.76, { x: 560, y: 750, zoom: 1.6 }], [43.3, { x: 610, y: 690, zoom: 1.45 }], [50.39, { x: 610, y: 690, zoom: 1.45 }],
  [50.4, { x: 600, y: 730, zoom: 1.6 }], [56.4, { x: 600, y: 730, zoom: 1.6 }], [59.6, { x: 580, y: 720, zoom: 1.75 }], [60.59, { x: 580, y: 720, zoom: 1.75 }],
  [60.6, { x: 430, y: 760, zoom: 1.7 }], [64.2, { x: 430, y: 760, zoom: 1.7 }], [65.6, { x: 530, y: 740, zoom: 1.45 }], [67.0, { x: 560, y: 730, zoom: 1.4 }],
  [72.62, { x: 420, y: 680, zoom: 1.45 }], [83.28, { x: 430, y: 680, zoom: 1.45 }],
  [105.04, { x: 680, y: 680, zoom: 1.5 }], [108.8, { x: 680, y: 680, zoom: 1.5 }], [109.8, { x: 570, y: 770, zoom: 1.35 }], [119.67, { x: 570, y: 770, zoom: 1.35 }],
  [119.68, { x: 650, y: 620, zoom: 1.9 }], [127.9, { x: 650, y: 610, zoom: 2.0 }], [129.68, { x: 650, y: 610, zoom: 2.0 }]];
const a98GovCam = (t) => K.camAt(A98_GCAM, t);
const a98HW = (P, h) => [P.x + h[0] * (P.s || 1) * Math.sign(P.dir || 1), P.y + h[1] * (P.s || 1)];   // standing local hand -> world
const a98U9 = (t) => kfn(t, [[72.62, 0.25], [74.4, 1.25], [76.0, 2.25], [77.3, 3.1]]);
const a98Talk = (t, a, b) => (t >= a && t < b ? 0.35 + 0.45 * Math.abs(Math.sin(t * 9)) : 0);

// door view: sky, sand, the hitching post and the horses (heads in the arch)
function a98GovOutside(c, t, u) {
  skyCycle(c, u, { t, hills: false });
  shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], '#edc65a', { lw: 5, seed: 620, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 });
  if (t < 112.4 || t >= 119.68) { seg(c, 150, 870, 150, 760, 12, A98_WOOD, 4); seg(c, 132, 772, 168, 772, 8, A98_WOOD, 3); return; }
  const H = [[2, 0.55, 862, -60, 113.0], [1, 0.75, 905, -10, 112.75], [2, 0.75, 905, 60, 112.5]];   // pal, s, y, target x, arrival
  for (const [pal, s, y, x1, ta] of H) { const x = kfn(t, [[ta - 0.4, -320], [ta, x1]], 'out');
    horse(c, { x, y, s, dir: 1, pal, headDown: 0.2 + 0.15 * Math.sin(t * 2.2 + x1), earL: 0.6, earR: 0.4, tailSwish: Math.sin(t * 1.7 + x1) }); }
}

// ---------- the governor ----------
function a98AbdGov(t, fh) {
  const P = a98Abd({ x: A98_THX, y: A98_SITY, sit: 1, seat: 'bench', mouth: 'closed', brow: 0.3 }); const o = { P };
  if (t < 50.4) { // S5 on the throne
    P.gaze = lookAt([A98_THX, 672], fh); P.handLW = [A98_THX - 10, 790]; P.handRW = [A98_THX - 40, 795]; o.paper = t < 38.3;
    if (t < 35.86) { P.gaze = [-0.2, 0.7]; P.lid = 0.3; } else if (t < 36.9) { P.brow = -0.3; P.lid = 0.25; }
    if (t >= 38.3 && t < 39.76) { const k = a98Env(t, 38.3, 39.1, 0.25); P.handRW = [K.lerp(A98_THX - 40, 590, k), K.lerp(795, 735, k)]; P.tip = 0.12 * k; o.scroll = t >= 38.55 ? { at: P.handRW, roll: 1 } : null; P.gaze = lookAt([A98_THX, 672], [590, 735]); }
    if (t >= 39.76) { const ur = 1 - a98E(t, 39.8, 0.45); P.handLW = [A98_THX + 14, 760]; P.handRW = [A98_THX - 34, 760]; o.scroll = { at: [A98_THX - 10, 772], roll: ur, open: true }; P.drop = 4;
      const sweep = (tt) => [0.6 - 1.2 * (((tt - 40.3) / 0.6) % 1), 0.7 + 0.1 * Math.floor(((tt - 40.3) / 0.6) % 3)];
      P.gaze = t < 40.3 ? [0, 0.7] : sweep(t);
      if (t >= 42.42) { P.gaze = [0, 0.45]; P.tilt = 0.05; P.brow = -0.5; }
      if (t >= 43.26) { P.lid = 0.5; P.brow = 0.7; P.tilt = 0; const g = gazePlan(t, [[0, fh], [43.26, fh], [43.8, [A98_THX - 10, 780]], [44.3, fh], [44.9, [A98_THX - 10, 740]], [45.55, fh], [46.3, [A98_THX - 10, 740]]], 0.25); P.gaze = lookAt([A98_THX, 672], g); P.lid = Math.max(0.5, blink(t, 23)); }
      if (t >= 46.74 && t < 49.6) { P.gaze = [-0.4, -0.6]; P.brow = 0.5; }
      if (t >= 49.86) { P.brow = -0.6; P.mouth = 'o'; P.handRW = [A98_THX - 8, 712 - 6 * (pulse(t, 49.95, 0.15) + pulse(t, 50.15, 0.15))]; P.gaze = [0, 0.5]; } }
    o.looking = t >= 43.26 && ((t < 43.8) || (t >= 44.3 && t < 44.9) || t >= 45.55);
    return o; }
  if (t < 67.0) { // S6-S7: the bargain, then back to the throne
    const up = a98E(t, 50.42, 0.35), xf = (tt) => kfn(tt, [[50.75, A98_THX], [51.25, A98_AX6], [61.8, A98_AX6], [62.5, A98_THX]]);
    Object.assign(P, walk(xf, t, { stride: 30 })); P.sit = t < 62.5 ? 1 - up : a98E(t, 62.5, 0.4); P.y = K.lerp(A98_SITY, A98_DAIS, 1 - P.sit); P.sq = anticipate(t, 50.3, 0.12, 0.06) * settleTo(t, 50.5, 1, 1.05, 0.3, 0.15);
    P.dir = t >= 61.8 && t < 62.5 ? 1 : -1; P.gaze = lookAt([P.x, P.y - 205], fh); P.talk = Math.max(a98Talk(t, 51.38, 52.3), a98Talk(t, 54.3, 56.3), a98Talk(t, 57.0, 60.4)); P.brow = 0.4;
    o.scrollSash = true;
    if (t >= 51.38 && t < 52.4) { P.handR = PERSON_HANDS.pointFwd.R; o.scrollSash = false; o.scroll = { at: a98HW(P, [104, -150]), roll: 1 }; }
    if (t >= 54.0 && t < 60.6) { const B = a98BargainHands(t); P.handR = B.R; if (t >= 56.8) P.handL = B.L; P.tip = B.tip; P.brow = t < 57.06 ? -0.2 : 0.6; if (t >= 57.06) P.lid = 0.3;
      if (t >= 58.94) { P.brow = -0.8; P.mouth = 'frown'; } if (t >= 59.6) { P.lid = 0.1; P.gaze = lookAt([P.x, P.y - 205], fh); } }
    if (t >= 60.6 && t < 61.4) { P.handR = PERSON_HANDS.pointFwd.R; P.gaze = [-1, 0.3]; P.brow = 0.6; P.talk = a98Talk(t, 60.6, 61.3); }
    if (t >= 61.4) { P.gaze = [1, -0.1]; P.brow = 0.3; }
    if (t >= 63.0) P.gaze = [0.3, 0.6], P.lid = 0.4, P.handLW = [A98_THX - 10, 790], P.handRW = [A98_THX - 40, 795];
    if (t >= 65.76) { const c = Math.abs(Math.sin((t - 65.76) * 9)); P.handL = [-10 - 30 * c, -150]; P.handR = [10 + 30 * c, -150]; P.handLW = P.handRW = undefined; P.gaze = [-0.8, 0.4]; P.lid = 0; if (t > 66.4) { P.handL = P.handR = undefined; } }
    return o; }
  if (t < 83.28) { P.gaze = [0.2, 0.6]; P.lid = Math.max(0.45, blink(t, 23)); P.handLW = [A98_THX - 10, 790]; P.handRW = [A98_THX - 40, 795]; o.paper = true; return o; }
  if (t < 119.68) { // S11: the reply, joy, the gifts
    o.scroll = { at: [A98_THX - 10, 750], roll: 0, open: true, seal: C.yellow }; P.handLW = [A98_THX + 14, 760]; P.handRW = [A98_THX - 34, 760]; P.gaze = [0, 0.7]; P.drop = 4; P.brow = -0.2;
    if (t >= 105.4) { P.brow = -0.6; P.mouth = 'smile'; }
    if (t >= 105.75) { const hp = hop(t, 105.9, 0.45, 0, 0, 34)[1]; P.sit = 1 - a98E(t, 105.75, 0.2); P.y = K.lerp(A98_SITY, A98_DAIS, 1 - P.sit) - hp; P.drop = 0;
      P.sq = anticipate(t, 105.7, 0.2, 0.08) * landSquash(t, 106.35, 0.1) * (t > 105.9 && t < 106.35 ? 1.05 : 1); P.handLW = P.handRW = undefined;
      P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; o.scroll = { at: a98HW(P, PERSON_HANDS.armsOut.R), roll: 0.4, seal: C.yellow }; P.gaze = [0, -0.2]; P.mouth = 'open'; }
    if (t >= 107.02) { P.handR = PERSON_HANDS.chest.R; P.handL = undefined; o.scroll = { at: a98HW(P, [10, -125]), roll: 0.6, seal: C.yellow }; P.lid = t < 107.5 ? 1 : 0; P.drop = 3 * Math.abs(Math.sin(t * 14)) * (t < 108 ? 1 : 0); P.mouth = 'open'; }
    if (t >= 108.8) { const c = pulse(t, 108.85, 0.2) + pulse(t, 109.1, 0.2); P.aL = [-2.75 + 0.25 * c, -3.0]; P.aR = [2.75 - 0.25 * c, 3.0]; P.handR = P.handL = undefined; o.scroll = { at: [A98_THX + 30, 790], roll: 1, seal: C.yellow, sash: true }; P.gaze = [-0.6, 0.3]; P.mouth = 'smile'; P.lid = 0; }
    if (t >= 109.35) { P.aL = P.aR = undefined; P.handR = PERSON_HANDS.pointFwd.R; P.talk = a98Talk(t, 109.35, 110.0); }
    if (t >= 110.2) { P.handR = undefined; P.handL = PERSON_HANDS.hipsHands.L; P.gaze = lookAt([A98_THX, 655], [A98_HEAPX, 860]); }
    if (t >= 112.4) P.gaze = lookAt([A98_THX, 655], [150, 700]);
    if (t >= 115.3) P.gaze = lookAt([A98_THX, 655], [635, 830]);
    if (t >= 117.8) P.gaze = lookAt([A98_THX, 655], [A98_SRVX[0], 720]);
    if (t >= 116.5) P.gaze = lookAt([A98_THX, 655], fh);
    return o; }
  // S12: seated on the throne exactly as in S11 (v2), the letter on his lap; the feud picture hangs on the wall to his upper left
  P.handLW = [A98_THX + 14, 770]; P.handRW = [A98_THX - 34, 770]; o.scroll = { at: [A98_THX - 10, 762], roll: 0, open: true, seal: C.yellow };
  P.gaze = [0, 0.8]; P.mouth = 'smile'; P.brow = -0.3; P.lid = Math.max(0.2, blink(t, 23)); P.drop = 3;
  const up = [-0.75, -0.65];   // toward the medallions
  if (t >= 121.34) { const k = a98E(t, 121.34, 0.7); P.gaze = [K.lerp(0, up[0], k), K.lerp(0.8, up[1], k)]; P.mouth = 'closed'; P.drop = 3 * (1 - k); }
  if (t >= 122.54) P.gaze = up;
  if (t >= 123.76) { P.brow = 0.5 * a98Env(t, 123.76, 124.6, 0.15); P.tilt = 0.06 * Math.sin((t - 123.76) * 14) * a98Env(t, 123.76, 124.5, 0.1); P.gaze = gazePlan(t, [[0, up], [123.8, [-1, -0.4]], [124.0, [-0.4, -0.8]], [124.2, up]], 0.07); P.lid = a98In(t, 124.2, 124.55) ? 1 : 0; }
  if (t >= 124.62) { P.gaze = up; P.mouth = 'smile'; P.brow = -0.3; P.tilt = 0; }
  if (t >= 126.7) { P.handRW = undefined; P.handR = PERSON_HANDS.chest.R; P.mouth = 'smile'; P.lid = 0.25; P.drop = 6 * pulse(t, 126.9, 0.45); }
  if (t >= 127.88) { P.gaze = [-1, -0.2]; P.drop = 5 * pulse(t, 128.3, 0.45); P.lid = 0.3; }
  return o;
}

// ---------- the forger in the hall ----------
function a98FGov(t, ah, A) {
  const P = a98F(t, { x: 480, mouth: 'smile', brow: -0.2 }), o = { P };
  if (t < 50.4) {
    const xf = (tt) => kfn(tt, [[35.0, 90], [36.0, 480]]); Object.assign(P, walk(xf, t, { stride: 30 })); P.tip = -0.04; P.gaze = lookAt(a98Head(P), ah);
    o.scrollSash = t < 37.6;
    if (t >= 37.18 && t < 38.0) { P.tip = 0.35 * a98Env(t, 37.25, 37.85, 0.2) - 0.04; P.sq = anticipate(t, 37.1, 0.15, 0.05); P.handR = [60, -170 + 60 * a98Env(t, 37.25, 37.85, 0.2)]; }
    if (t >= 37.6 && t < 38.95) { P.handRW = [575, 738]; P.handLW = [565, 748]; if (t < 38.55) o.scroll = { at: [571, 738], roll: 1 }; P.tip = 0.03; }
    if (t >= 39.14) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.lid = 0.3; P.sq = settleTo(t, 39.14, 1, 1.04, 0.3, 0.1); }
    if (t >= 43.26) { const look = A.looking; P.mouth = look ? 'smile' : 'closed'; P.lid = look ? 0 : 0.15; P.gaze = lookAt(a98Head(P), ah); P.sq = 1;
      if (t >= 44.95 && t < 45.3) P.gaze = [-1, 0]; P.drop = 5 * pulse(t, 45.1, 0.3); if (look && t >= 45.55) P.mouth = 'smile'; }
    return o; }
  if (t < 60.6) { // S6
    P.x = 480; P.gaze = lookAt(a98Head(P), ah); P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.lid = 0.3;
    if (t >= 51.6) { const k = a98E(t, 51.6, 0.3); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.lid = 0; P.mouth = 'smile'; P.brow = -0.5; }
    if (t >= 55.26) { P.gaze = lookAt(a98Head(P), A98_BOXC); P.brow = -0.7; P.mouth = t < 55.95 ? 'smile' : 'closed'; }
    if (t >= 57.52) { const g = gazePlan(t, [[0, A98_BOXC], [57.52, A98_BOXS]], 0.5); P.gaze = lookAt(a98Head(P), g); P.mouth = t < 57.8 ? 'closed' : 'o'; }
    if (t >= 59.6) { P.sq = 1 - 0.08 * pulse(t, 59.6, 0.5); P.drop = 6 * pulse(t, 59.6, 0.4); P.handR = [30, -190]; P.x = 480 + tremble(t, 1.5); P.mouth = 'o'; P.eyes = 'wide';
      if (t >= 59.95 && t < 60.3) P.gaze = [0, 0.05]; }
    return o; }
  if (t < 67.0) { // S7: to the stool
    const xf = (tt) => kfn(tt, [[61.83, 480], [62.9, A98_STOOLX]]); Object.assign(P, walk(xf, t, { stride: 16 })); P.dir = t < 62.9 ? -1 : 1; P.drop = 6; P.mouth = 'closed'; P.brow = -0.5;
    P.sit = 0.9 * a98E(t, 62.95, 0.35); P.gaze = t < 62.9 ? [-0.6, 0.4] : lookAt(a98Head(P), ah);
    if (t < 61.83) { P.gaze = lookAt(a98Head(P), ah); P.mouth = 'o'; }
    if (t >= 63.6) { P.gaze = [0.2, 0.9]; P.lid = 0.3; }
    if (t >= 63.22) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
    if (t >= 64.12) { const w = Math.sin(t * 19); P.handL = [24 + 3 * w, -140]; P.handR = [30 - 3 * w, -134]; P.sq = 1 - 0.01 * Math.abs(Math.sin(t * 7)); }
    if (t >= 64.92) { const g = gazePlan(t, [[0, A98_BOXC], [64.92, A98_BOXC], [65.35, A98_BOXS]], 0.07); P.gaze = lookAt(a98Head(P), g); P.lid = a98In(t, 65.2, 65.33) ? 1 : 0; }
    if (t >= 65.76) { P.gaze = lookAt(a98Head(P), [540, 700]); P.lid = 0; }
    return o; }
  if (t < 83.28) { // S9: days of waiting
    const xf = (tt) => kfn(tt, [[74.36, A98_STOOLX], [75.6, 620], [75.75, 620], [76.7, 460]]);
    Object.assign(P, walk(xf, t, { stride: 22 })); P.dir = t < 75.68 ? 1 : -1; P.mouth = 'closed'; P.brow = -0.5;
    if (t < 74.0) { P.sit = 1 - a98E(t, 73.8, 0.3); const sl = a98Env(t, 72.85, 73.5, 0.12); P.lid = sl > 0.5 ? 1 : 0.2; P.drop = 8 * sl; P.gaze = [0.2, 0.6]; }
    else if (t < 76.76) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.lid = Math.max(0.4, blink(t, 11)); P.drop = 6; P.gaze = P.dir > 0 ? [1, 0.4] : [-1, 0.1];
      let sq = 1; for (const f of footfalls(xf, 74.36, 76.7, 22)) sq *= landSquash(t, f.t, 0.05); P.sq = sq * (1 - 0.1 * pulse(t, 75.6, 0.18)); if (P.x < 420 || (t > 75.75 && P.x < 480)) P.gaze = [-1, -0.1]; }
    else { P.dir = 1; P.x = 460; P.ph = 0; P.amp = 0; P.gaze = [0.1, -1]; P.mouth = 'o';
      if (t >= 78.72) { P.gaze = [-0.5, -0.9]; P.mouth = 'smile'; P.lid = 0.2; P.sq = settleTo(t, 78.72, 1, 1.04, 0.3, 0.1); }
      if (t >= 79.98) { const k = a98E(t, 79.98, 0.4); P.gaze = [K.lerp(-0.5, 0.5, k), -0.9]; P.mouth = k > 0.5 ? 'frown' : 'smile'; P.brow = -0.7; P.sq = 1; P.lid = 0; }
      if (t >= 81.2) { P.sq = 0.96; P.x = 460 + tremble(t, 1.2); }
      if (t >= 81.94) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.sq = settleTo(t, 81.94, 0.96, 0.9, 0.3, 0.1); P.wet = true; P.lid = 0.6; P.gaze = [0, 0.3]; P.x = 460 + tremble(t, 2);
        if (t >= 82.6) { P.wink = 'R'; P.lid = 0; P.gaze = [-1, 0]; } } }
    return o; }
  if (t < 119.68) { // S11: the gifts
    const xf = (tt) => kfn(tt, [[108.6, A98_STOOLX], [109.0, A98_FX11]]); Object.assign(P, walk(xf, t, { stride: 18 }));
    P.sit = 1 - a98E(t, 107.9, 0.7); P.x = t < 107.9 ? A98_STOOLX + tremble(t, 1.2) : P.x; P.mouth = 'closed'; P.brow = -0.6; P.gaze = lookAt(a98Head(P), ah); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R;
    if (t >= 107.56) { P.sq = 1 - 0.07 * pulse(t, 107.56, 0.25); P.mouth = 'o'; }
    if (t >= 108.0) { P.handL = P.handR = undefined; P.mouth = 'open'; }
    if (t >= 110.04) { P.gaze = lookAt(a98Head(P), [A98_HEAPX, K.lerp(420, 880, K.clamp((t - 110.04) / 1.1))]); P.mouth = 'open'; P.eyes = undefined; }
    if (t >= 111.32) { const hb = hop(t, 111.4, 0.3, 0, 0, 10)[1]; P.y = 900 - hb; P.x -= 8 * a98E(t, 111.4, 0.3); P.sq = landSquash(t, 111.7, 0.05); P.gaze = [0.3, 1]; P.mouth = 'o'; }
    if (t >= 112.4) { P.gaze = [-1, -0.1]; P.tilt = -0.05; P.mouth = 'o'; }
    if (t >= 113.88) { P.sq = settleTo(t, 113.95, 0.92, 1, 0.3, 0.1); P.tilt = -0.12 * a98Env(t, 113.95, 114.9, 0.15); P.mouth = t > 114.3 ? 'smile' : 'o'; P.gaze = [-1, -0.3]; }
    if (t >= 115.3) { P.gaze = lookAt(a98Head(P), [635, 830]); P.mouth = 'o'; P.tilt = 0; }
    if (t >= 116.3) { P.gaze = lookAt(a98Head(P), [A98_FX11 + 78, 720]); P.mouth = 'o'; }
    if (t >= 116.9) { P.gaze = [0, 1]; P.handR = [10, -130]; P.wet = true; P.mouth = 'smile'; }
    if (t >= 117.8) { P.handR = undefined; P.tip = 0.45 * a98Env(t, 118.0, 118.45, 0.15); P.gaze = [1, 0.3]; }
    if (t >= 118.52) { P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.eyes = 'wide'; P.mouth = 'o'; P.tip = 0; P.sq = 1 + 0.035 * Math.sin(t * 22); P.gaze = lookAt(a98Head(P), [A98_CHX[1], 790]); P.wet = true; }
    return o; }
  return o;
}

// ---------- the hall ----------
function a98GovWorld(ctx, t, cam) {
  const s9 = t >= 72.62 && t < 83.28, s12 = t >= 119.68, u = s9 ? a98U9(t) : 0.25, night = s9 ? dayCycle(u).night : 0, out = {};
  palaceHall(ctx, { wall: 'blue', t, stools: [300], lampsLit: night > 0.35 ? 1 : 0, outside: (c) => a98GovOutside(c, t, u) });
  let fP = null; if (!s12) { fP = a98FGov(t, [A98_THX, 660], {}).P; }
  const fh = fP ? a98Head(fP) : [480, 710];
  const A = a98AbdGov(t, fh); const ah = a98Head(A.P); out.ah = ah;
  const F = s12 ? null : a98FGov(t, ah, A);
  // the white horse comes in through the arch (S11)
  if (t >= 113.4 && t < 119.68) { const hx = kfn(t, [[113.4, -160], [114.05, 150], [114.9, 150], [115.3, 110]]);
    horse(ctx, { ...walk((tt) => kfn(tt, [[113.4, -160], [114.05, 150], [114.9, 150], [115.3, 110]]), t, { stride: GAIT.horse * 0.85 }), y: 900, s: 0.85, dir: 1, pal: 0, headDown: 0.3 * a98Env(t, 113.9, 114.9, 0.2) + 0.1, earL: 0.8, earR: 0.6, tailSwish: Math.sin(t * 2), mouth: a98In(t, 114, 114.8) ? 'smile' : 'closed' }); }
  person(ctx, A.P);
  const sc = A.scroll; if (sc) { if (sc.open) a98Scroll(ctx, sc.at[0], sc.at[1], 0.9, { roll: sc.roll, seal: sc.seal || C.red }); else a98Scroll(ctx, sc.at[0], sc.at[1], 0.6, { roll: sc.roll, seal: sc.seal || C.red, rot: -0.3 }); }
  if (A.scrollSash) a98Scroll(ctx, A.P.x - 10, A.P.y - 92 * 1.05, 0.55, { roll: 1, seal: C.red, rot: 0.4 });
  if (A.paper) shape(ctx, [[A98_THX - 50, 786], [A98_THX + 10, 780], [A98_THX + 14, 792], [A98_THX - 46, 798]], A98_PAPER, { lw: 3, seed: 621 });
  if (a98In(t, 38.75, 39.25)) a98Glint(ctx, 590, 728, 20, (t - 38.75) / 0.5);
  // the forger and his things
  if (F) { const P = F.P; out.fh = a98Head(P);
    if (t >= 114.4 && t < 119.68) a98Gifts(ctx, t, 'back');
    person(ctx, P);
    if (F.scrollSash || (t >= 35 && t < 37.6)) a98Scroll(ctx, P.x + 14, 900 - 92 * 0.95, 0.55, { roll: 1, seal: C.red, rot: -0.5 });
    if (F.scroll) a98Scroll(ctx, F.scroll.at[0], F.scroll.at[1], 0.6, { roll: 1, seal: C.red, rot: 0.1 });
    if (t < 37 && t >= 35) for (const f of footfalls((tt) => kfn(tt, [[35.0, 90], [36.0, 480]]), 35.0, 36.0, 30)) dustBurst(ctx, f.x, 902, t - f.t, 3, 4, 8, 16, 0.4, Math.round(f.t * 10));
    if (a98In(t, 59.7, 60.5)) a98Sweat(ctx, out.fh[0] + 34, out.fh[1] - 20, (t - 59.7) / 0.8);
    if (t >= 105.04 && t < 119.68) a98Gifts(ctx, t, 'front', P); }
  // the envoy (S7)
  if (t >= 64.4 && t < 67.0) { const xf = (tt) => kfn(tt, [[64.4, 60], [65.6, 520], [65.9, 520], [66.2, 548]]);
    const E = { ...A98_ENV, ...walk(xf, t, { stride: 26 }), y: 900, dir: 1, gaze: lookAt([520, 700], ah), mouth: 'closed', tip: 0.25 * a98Env(t, 66.25, 66.8, 0.15) }; person(ctx, E); a98Satchel(ctx, E.x - 20, 820, 0.9); }
  // the bargain boxes (S6, shrink in S7)
  if (t >= 54.32 && t < 61.0) { const sh = 1 - a98E(t, 60.6, 0.4), bR = a98BoxAt(t, 'R'), bL = a98BoxAt(t, 'L');
    a98IconBox(ctx, bR[0], bR[1], 100, 88, K.clamp((t - 54.32) / 0.35) * sh, 'coins', { fill: a98E(t, 55.26, 0.6, 'out') });
    if (a98In(t, 55.7, 56.2)) a98Glint(ctx, bR[0] + 24, bR[1] + 8, 16, (t - 55.7) / 0.5);
    if (t >= 57.06) a98IconBox(ctx, bL[0], bL[1], 100, 88, K.clamp((t - 57.06) / 0.35) * sh, 'stick', { stickT: t - 58.94 }); }
  // thought clouds
  if (a98In(t, 46.74, 49.8)) { const p = Math.min(K.clamp((t - 46.74) / 0.5), 1 - K.clamp((t - 49.4) / 0.4));
    thoughtCloud(ctx, 520, 450, 420, 250, t, { p, tail: [ah[0] - 20, ah[1] - 60], scale: 0.42, at: [500, 760], bg: '#e8f0ff', inside: (c, tt) => a98CloudFeud(c, tt, 46.9, 47.3, 47.5, 46.9) }); }
  if (a98In(t, 76.76, 82.6)) { const p = Math.min(K.clamp((t - 76.76) / 0.5), 1 - K.clamp((t - 82.25) / 0.35));
    thoughtCloud(ctx, 420, 492, 640, 360, t, { p, tail: [fh[0], fh[1] - 60], scale: 0.66, at: [500, 760], inside: (c, tt) => a98CloudSplit(c, tt) }); }   // v2: 1.25x
  // S12 banner (panel space) is drawn by the overlay; return the letter header point
  if (s12) out.header = [A98_THX - 10, 722];
  return out;
}
// split cloud of S9: wealth (left, yellow) or the stick (right, blue-grey)
function a98CloudSplit(c, t) {
  const lit = a98E(t, 78.72, 0.3), dark = a98E(t, 81.2, 0.3);
  c.fillStyle = mixHex('#f4e6b0', C.yellow, lit); c.fillRect(-200, 300, 700, 900); c.fillStyle = mixHex('#c9d2e0', '#7f8ca6', dark); c.fillRect(500, 300, 800, 900);
  seg(c, 500, 300, 500, 1200, 10, C.black, 0); a98Scroll(c, 500, 560, 1.4, { roll: 1, seal: C.red });
  if (lit > 0) { c.save(); c.globalAlpha *= 0.4 + 0.6 * lit; a98Rays(c, 260, 760, 260, lit * 0.6, t); a98CoinPile(c, 260, 940, 1, 360, 9);
    person(c, a98F(0, { x: 260, y: 860, s: 1.1, mouth: 'smile', handL: PERSON_HANDS.armsOut.L, handR: PERSON_HANDS.armsOut.R, gaze: [0, -0.4], sq: 1 + 0.03 * Math.sin(t * 8) }));
    for (let i = 0; i < 4; i++) { const ph = (t * 1.6 + i * 0.25) % 1; a98Coin(c, 150 + i * 70, 860 - 120 * Math.sin(Math.PI * ph), 14, Math.cos(t * 9 + i)); } c.restore(); }
  if (dark > 0) { c.save(); c.globalAlpha *= dark;
    person(c, a98F(0, { x: 720, y: 940, s: 1.1, kneel: 0.6, handL: PERSON_HANDS.headHold.L, handR: PERSON_HANDS.headHold.R, mouth: 'o', eyes: 'wide', gaze: [0.6, -0.6] }));
    // v2: the bargain's stick, raised and wobbling above him (never touching), and the box's red cross badge
    const sw = -0.5 + swing(t, 81.2, 0.22, 1.5, 0.7) + 0.05 * Math.sin(t * 6); a98Stick(c, 850, 770, 190, sw);
    c.save(); c.translate(900, 880); shape(c, ell(0, 0, 40, 40, 20), C.white, { lw: 5, seed: 572 }); seg(c, -18, -18, 18, 18, 10, C.red, 0); seg(c, 18, -18, -18, 18, 10, C.red, 0); c.restore(); c.restore(); }
}
// the gifts in S11, v2: each gift has its own floor spot left to right in front of the dais (forger 340 at the left end, heap 455,
// chest A 590, chest B 680 with the jewel casket on top); one servant brings the cloak and steps back right; two servants bow at the far right
const A98_FX11 = 340, A98_HEAPX = 455, A98_CHX = [590, 680], A98_CHT = [115.3, 115.55], A98_SRVX = [838, 900];
const a98Serv0X = (tt) => kfn(tt, [[115.55, 1010], [116.35, A98_FX11 + 78], [116.95, A98_FX11 + 78], [117.65, A98_SRVX[0]]]);
const a98Serv1X = (tt) => kfn(tt, [[117.05, 1040], [117.75, A98_SRVX[1]]]);
function a98Gifts(ctx, t, pass, P) {
  if (pass === 'back') return;
  // coins rain into the heap
  const pile = A98_HEAPX, fill = a98E(t, 110.1, 1.1, 'out');
  for (let i = 0; i < 10; i++) { const t0 = 110.04 + i * 0.1; if (t >= t0 && t < t0 + 0.4) a98Coin(ctx, pile - 60 + (i * 37) % 120, fallY(t, t0, t0 + 0.4, 380, 880 - 60 * fill), 11, Math.cos(t * 12 + i)); }
  a98CoinPile(ctx, pile, 902, fill, 170, 4);
  if (t >= 111.32 && t < 113) { const u = a98E(t, 111.32, 0.5, 'out'); a98Coin(ctx, K.lerp(pile - 60, A98_FX11 + 22, u), 893, 9, Math.cos(u * 12)); }
  else if (t >= 113) a98Coin(ctx, A98_FX11 + 22, 893, 9, 0.6);
  // the two chests drop in, one after the other; A opens on its cloth, B stays shut and takes the casket
  for (let i = 0; i < 2; i++) { const t0 = A98_CHT[i]; if (t < t0) continue; const land = t0 + 0.28, y = t < land ? fallY(t, t0, land, 560, 902) : 902;
    a98Chest(ctx, A98_CHX[i], y, 0.8, { open: i === 0 ? a98E(t, land + 0.3, 0.25, 'out') : 0, content: 'cloth', sq: landSquash(t, land, 0.12) });
    dustBurst(ctx, A98_CHX[i], 904, t - land, 5, 4, 9, 26, 0.5, 70 + i); }
  // the casket drops onto chest B, opens, sparkles (nothing in front of it)
  if (t >= 118.3) { const land = 118.52, y = t < land ? fallY(t, 118.3, land, 600, 826) : 826, op = a98E(t, 118.75, 0.3, 'out');
    a98Casket(ctx, A98_CHX[1], y, 0.9, op, op * 0.9, t); if (a98In(t, 119.0, 119.5)) a98Glint(ctx, A98_CHX[1] + 20, 760, 20, (t - 119.0) / 0.5); }
  // the servants (from the right edge): one with the cloak, then both bow at the far right
  for (let i = 1; i >= 0; i--) { const xs = i ? a98Serv1X : a98Serv0X; if (t < (i ? 117.05 : 115.55)) continue; const x = xs(t);
    const S = { ...A98_SERV[i], ...walk(xs, t, { stride: 30 }), y: 900, dir: (i === 0 && t >= 116.95 && t < 117.65) ? 1 : -1, gaze: [-1, 0.3], mouth: 'closed' };
    if (i === 0 && t < 116.56) { S.handLW = [x - 30, 812]; S.handRW = [x - 52, 806]; S.tip = 0.05; }
    if (i === 0 && t >= 116.56 && t < 116.95) { S.handLW = [x - 52, 770]; S.handRW = [x - 70, 770]; S.gaze = lookAt([x, 720], [A98_FX11, 740]); S.tip = 0.08; }
    if (t >= 117.8 + i * 0.13) { S.tip = 0.3 * a98Env(t, 117.8 + i * 0.13, 118.45 + i * 0.13, 0.15); S.mouth = 'smile'; S.gaze = [-1, 0.2]; }
    person(ctx, S);
    if (i === 0 && t < 116.56) shape(ctx, [[x - 74, 796], [x - 20, 796], [x - 24, 822], [x - 70, 822]], C.yellow, { lw: 4, seed: 631, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 }); }
  // the cloak goes from his arms onto the forger's shoulders
  if (t >= 116.56 && t < 116.92 && P) { const sx = a98Serv0X(t), u = a98E(t, 116.56, 0.34), a = [sx - 62, 770], b = [P.x, 900 - 150 * 0.95];
    const cx = K.lerp(a[0], b[0], u), cy = K.lerp(a[1], b[1], u) - 30 * Math.sin(Math.PI * u);
    shape(ctx, [[cx - 36, cy - 6], [cx + 36, cy - 6], [cx + 44, cy + 70 - 20 * u], [cx - 44, cy + 70 - 20 * u]], C.yellow, { lw: 4.5, seed: 631, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 }); seg(ctx, cx - 36, cy - 6, cx + 36, cy - 6, 6, C.red, 2); }
}
