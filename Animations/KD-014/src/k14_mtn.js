// ===== KD-014 S10-S14 (100.32-168.00): at the foot of the mountain. The mouse; the refusal; her choice; going home. =====
// World x -110..1110, y -270..1230 so the crane-outs reach zoom 0.82 (the whole mountain and the sky above it). Ground y 900.
// People s 0.95 here; the mice s 0.85 read through zoom 2.2-2.8 (>= 110 px on screen when they act).
const K14M_bake = () => bake('k14mtnset', 1220, 1500, (x) => { x.translate(110, 270);
  x.fillStyle = C.blue; x.fillRect(-110, -270, 1220, 280); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(-110, -270, 1220, 280);
  x.save(); x.translate(-110, 0); sky(x, { w: 1220 }); hillTrees(x, { y: 905, seed: 21, n: 15 }); ground(x, { w: 1220 }); x.restore(); });
const K14M_FATHER_X = (t) => kfn(t, [[100.32, 40], [102.2, 40], [104.3, 300], [106.32, 300], [107.36, 300], [107.6, 280], [126.74, 280], [127.28, 300], [128.4, 520], [155.7, 520], [156.0, 505], [159.3, 505], [159.8, 545], [162.3, 545], [167.6, 120]]);
const K14M_MAID_X = (t) => kfn(t, [[100.32, 130], [102.2, 130], [104.1, 390], [107.36, 390], [107.6, 245], [108.4, 245], [109.0, 360], [126.74, 360], [127.4, 390], [128.6, 450], [137.3, 450], [137.75, 590], [155.34, 590], [155.6, 565]]);
const K14M_HIM_X = (t) => kfn(t, [[126.74, 650], [137.78, 650], [138.0, 730], [139.3, 730], [139.7, 680], [144.22, 680], [144.8, 700], [158.5, 700], [158.9, 680], [159.22, 680], [160.1, 740]]);
const K14M_HER_X = (t) => kfn(t, [[157.4, 590], [158.6, 590], [158.9, 650], [159.22, 650], [160.1, 700]]);
const K14M_BOULDER = (t) => { if (t < 119.7) return null; if (t < 126.74) { const u = K.clamp((t - 119.9) / 0.6), x = K.lerp(905, 700, K.ease.in(u)), y = K.lerp(548, 872, K.ease.in(u)); return { x, y, rot: (905 - x) / 26, sq: impactSquash(t, 120.5, 0.8) }; } return { x: 845, y: 874, rot: 1.2, sq: 1 }; };
function k14mMtn(t) {
  const M = { lid: 1, mouth: 'line', gaze: [0, 0.3], holeB: t >= 120.92 ? K14B(t, 120.92, 0.2) : 0, lit: t >= 160.9 ? K14B(t, 160.9, 0.4) : 0 };
  if (t >= 106.32) { M.lidL = blend(t, 106.32, 106.9, 1, 0); M.lidR = blend(t, 106.4, 106.98, 1, 0); M.lid = undefined; M.gaze = lookAt([610, 380], [340, 760]); }
  if (t >= 107.0) { M.lidL = M.lidR = Math.max(0.35, blink(t, 81)); }
  if (t >= 107.5 && t < 113.3) M.talk = 0.45 * Math.abs(Math.sin((t - 107.5) * 4));
  if (t >= 108.02) { M.gaze = [0.5, 1]; M.brow = -0.5; }
  if (t >= 111.78 && t < 113.34) M.lidR = 0.2;
  if (t >= 113.34) M.gaze = [0.6, 1];
  if (t >= 118.72 && t < 119.7) { M.gazeL = [0.8, 0.2]; M.gazeR = [-0.8, 0.2]; M.mouth = 'wobble'; M.talk = 0; M.lidL = 0.35 + 0.3 * Math.abs(Math.sin(t * 36)); M.brow = -0.3; }
  if (t >= 120.92 && t < 126.74) { M.brow = -0.8; M.lidL = M.lidR = 0.55; M.mouth = 'frown'; }
  if (t >= 126.74) { M.lidL = M.lidR = Math.max(0.45, blink(t, 81)); M.gaze = [0.4, 1]; M.mouth = 'line'; }
  if (t >= 162.98) { M.gaze = [0.4, 1]; M.mouth = 'smile'; }
  if (t >= 164.12) { M.lidL = M.lidR = blend(t, 164.12, 164.9, 0.45, 1); }
  return M;
}
function k14mFather(t) {
  const fx = K14M_FATHER_X, P = { ...walk(fx, t, { stride: 20 }), y: 900, s: 0.95, dir: 1, costume: 'ascetic', age: 1, hold: 'stick', mouth: 'closed', seed: 11 };
  P.amp *= 0.8; P.lid = blink(t, 11); const head = [P.x, 690], mh = [K14M_MAID_X(t), 690];
  P.gaze = lookAt(head, [600, 350]);
  if (t < 104.98) { P.gaze = lookAt(head, mh); if (t >= 102.2) { P.tip = 0.06; P.mouth = 'o'; } }
  if (t >= 104.98 && t < 106.32) { P.tip = -0.15; P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.hold = null; P.gaze = [0.2, -1]; P.mouth = 'o'; }
  if (t >= 107.36 && t < 108.0) { P.sq = 0.92; P.handL = [-90, -150]; P.gaze = [0.6, -1]; P.mouth = 'o'; }
  if (t >= 108.0 && t < 122.3) { P.gaze = lookAt(head, t < 109.0 ? [600, 400] : [700, 885]); }
  if (t >= 122.3 && t < 126.74) { P.gaze = lookAt(head, mh); P.mouth = 'o'; if (t >= 124.06) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.hold = null; P.brow = -1; } if (t >= 124.74 && t < 125.9) { P.gaze = [0, 0.05]; P.lid = 0; } }
  // S12: arrives, points down, kneels to mouse level
  if (t >= 126.74) { P.gaze = lookAt(head, [K14M_HIM_X(t), 870]); P.mouth = 'smile'; }
  if (t >= 127.8 && t < 129.9) { P.handL = [-60, -80]; P.aR = [0.6, 0.9]; P.hold = null; }
  if (t >= 129.92 && t < 144.4) { P.kneel = settleTo(t, 129.92, 0, 1, 0.45, 0.08); P.hold = null; P.handR = PERSON_HANDS.chest.R; P.lid = Math.max(0.1, blink(t, 11)); }
  if (t >= 130.54 && t < 131.8) { P.talk = 0.3 + 0.35 * Math.abs(Math.sin(t * 9)); P.handL = [-92, -150]; P.handR = PERSON_HANDS.chest.R; }
  if (t >= 132.62 && t < 134.2) P.gaze = lookAt(head, mh);
  if (t >= 141.18 && t < 144.22) P.gaze = lookAt(head, [740, 690]);
  // S13: stands; her hands; the memory; tears; the hug; prayer; POOF
  if (t >= 144.22) { P.kneel = 1 - blend(t, 144.3, 144.8, 0, 1); P.hold = null; P.gaze = lookAt(head, mh); P.handR = null; P.handL = null; }
  if (t >= 146.76 && t < 155.34) { const k = blend(t, 146.76, 147.3, 0, 1); P.handLW = [K.lerp(P.x - 40, 552, k), K.lerp(810, 790, k)]; P.handRW = [K.lerp(P.x + 40, 556, k), K.lerp(810, 780, k)];
    if (t >= 147.54 && t < 148.8) { P.brow = -0.5; P.gaze = lookAt(head, [K14M_MAID_X(t) + gazePlan(t, [[147.54, [-8, 0]], [147.9, [8, 0]], [148.25, [-8, 0]], [148.6, [0, 0]]], 0.07)[0], 680]); }
    if (t >= 151.3) { P.wet = true; P.lid = Math.max(0.3, blink(t, 11)); P.handLW = null; P.handRW = null; P.handR = [44, -108]; P.gaze = [0.5, 1]; P.mouth = 'smile'; }
    if (t >= 152.38) P.gaze = lookAt(head, [K14M_HIM_X(t), 870]);
    if (t >= 154.28) { P.lid = t < 154.7 ? 1 : blink(t, 11); P.handR = t >= 154.7 && t < 155.05 ? [16, -182] : PERSON_HANDS.chest.R; P.drop = 8 * pulse(t, 155.0, 0.35); P.gaze = lookAt(head, mh); } }
  if (t >= 155.34 && t < 159.3) { P.wet = true; P.mouth = 'smile';
    if (t < 155.75) { P.handLW = [585, 760]; P.handRW = [590, 790]; P.lid = 0.8; }
    else { const k = settleTo(t, 155.75, 0, 1, 0.4); P.aL = [K.lerp(-0.3, -2.55, k), K.lerp(-0.2, -2.9, k)]; P.aR = [K.lerp(0.3, 2.55, k), K.lerp(0.2, 2.9, k)]; P.lid = t < 157.3 ? 1 : blink(t, 11); P.drop = -6; }
    if (t >= 157.46) { P.aL = P.aR = null; P.gaze = lookAt(head, [590, 880]); P.mouth = 'o'; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; if (t >= 158.5) { P.mouth = 'smile'; P.handL = P.handR = null; } } }
  // S14: kneels to wave; picks up the scarf; walks home with it
  if (t >= 159.3) { P.wet = true; P.mouth = 'smile'; P.kneel = blend(t, 159.8, 160.2, 0, 1) * (1 - blend(t, 162.0, 162.4, 0, 1)); P.gaze = lookAt(head, [K14M_HER_X(t), 880]); P.hold = null;
    if (t >= 160.4 && t < 161.1) { P.handR = [60 + 8 * Math.sin(t * 16), -170]; P.lid = Math.max(pulse(t, 160.7, 0.35), 0); }
    if (t >= 161.1) P.gaze = lookAt(head, K14_HOLE_A);
    if (t >= 161.18 && t < 161.6) { P.handRW = [584, 886]; P.tip = 0.22 * pulse(t, 161.18, 0.42) / 1; }
    if (t >= 161.6) { P.handR = PERSON_HANDS.chest.R; P.handL = [12, -114]; P.lid = Math.max(0.3, blink(t, 11)); }
    if (t >= 162.3) { P.dir = -1; P.hold = 'stick'; P.handR = null; P.gaze = t >= 163.4 && t < 164.2 ? [1, 0.2] : [-1, 0]; } }
  return P;
}
function k14mMaiden(t) {
  const mx = K14M_MAID_X, P = { ...walk(mx, t, { stride: 18 }), y: 900, s: 0.95, dir: 1, costume: 'maiden', mouth: 'smile', seed: 51 };
  P.lid = blink(t, 51); const head = [P.x, 680], fh = [K14M_FATHER_X(t), 690];
  P.gaze = lookAt(head, [600, 350]);
  if (t < 101.44) { const [_, hy] = hop(t, 100.62, 0.5, 0, 0, 60); P.y = 900 - hy; P.sq = anticipate(t, 100.32, 0.3, 0.12) * landSquash(t, 101.12); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = 'open'; P.gaze = lookAt(head, [600, 300]); }
  if (t >= 101.44 && t < 102.2) { const k = settleTo(t, 101.44, 0, 1, 0.3); P.aR = [K.lerp(0.3, 2.3, k), K.lerp(0.3, 2.5, k)]; P.gaze = lookAt(head, t < 101.7 ? fh : [600, 300]); }
  if (t >= 102.2 && t < 104.3) { P.handLW = [K14M_FATHER_X(t) + 30, 790]; P.gaze = [1, -0.4]; }
  if (t >= 104.98 && t < 106.32) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = [0.2, -1]; P.mouth = 'o'; }
  if (t >= 107.36 && t < 109.0) { P.sq = 0.9 + 0.1 * K14B(t, 107.6, 0.3); P.mouth = 'o'; P.gaze = lookAt(head, [610, 400]); P.handL = PERSON_HANDS.mouthCover.L; }
  if (t >= 109.0 && t < 122.32) P.gaze = lookAt(head, t < 113.34 ? [700, 885] : [665, 880]);
  if (t >= 113.34 && t < 114.2) P.mouth = 'o';
  if (t >= 122.32 && t < 126.74) { P.gaze = lookAt(head, gazePlan(t, [[122.32, [665, 880]], [122.6, fh]], 0.3)); P.tilt = -0.05 * blend(t, 122.4, 122.8, 0, 1); P.mouth = 'o'; if (t >= 124.74) { P.handR = PERSON_HANDS.mouthCover.R; if (t < 125.9) { P.gaze = [0, 0.05]; P.lid = 0; } } }
  // S12
  if (t >= 126.74) { P.gaze = lookAt(head, [K14M_HIM_X(t), 870]); }
  if (t >= 132.62 && t < 134.0) { P.handR = [60 + 6 * Math.sin(t * 12), -150]; P.mouth = 'smile'; P.tilt = 0.08; }
  if (t >= 136.12 && t < 137.2) { P.gaze = [0.1, 1]; P.handL = [-24, -110]; P.handR = [26, -110]; P.mouth = 'o'; }
  if (t >= 137.75 && t < 139.5) { P.kneel = blend(t, 137.75, 138.0, 0, 1) * (1 - blend(t, 139.2, 139.5, 0, 1)); P.handRW = t < 138.4 ? [640, 880] : [695, 882]; P.tip = 0.1; P.gaze = lookAt([P.x, 760], [680, 885]); if (t >= 138.6) P.mouth = 'o'; }
  if (t >= 141.18 && t < 144.22) { P.gaze = lookAt(head, [760, 690]); if (t >= 143.26) { P.handR = [30, -214]; P.lid = Math.max(pulse(t, 143.5, 0.5), 0); P.tilt = 0.05 * Math.sin(t * 40) * pulse(t, 143.26, 0.4); } }
  // S13
  if (t >= 144.22) { P.dir = -1; P.gaze = lookAt(head, fh); }
  if (t >= 144.5 && t < 145.14) { P.gaze = [1, -0.3]; P.mouth = 'closed'; P.dir = 1; }
  if (t >= 145.14 && t < 146.76) { P.mouth = t < 145.5 ? 'closed' : 'smile'; P.lid = Math.max(0.2, blink(t, 51)); P.drop = 3 * blend(t, 145.14, 145.7, 0, 1); }
  if (t >= 146.76 && t < 152.38) { const k = blend(t, 146.76, 147.3, 0, 1); P.handLW = [K.lerp(P.x - 40, 556, k), K.lerp(810, 780, k)]; P.handRW = [K.lerp(P.x + 40, 552, k), K.lerp(810, 790, k)]; if (t >= 148.88 && t < 149.9) P.talk = 0.25 + 0.3 * Math.abs(Math.sin(t * 8)); }
  if (t >= 152.38 && t < 153.64) { P.dir = 1; const k = settleTo(t, 152.38, 0, 1, 0.3); P.aR = [K.lerp(0.3, 0.95, k), K.lerp(0.3, 0.75, k)]; P.gaze = lookAt(head, [700, 880]); P.mouth = 'smile'; }
  if (t >= 153.64 && t < 155.34) P.gaze = lookAt(head, fh);
  if (t >= 155.34) { P.handLW = [530, 760]; P.handRW = [535, 790]; P.lid = 0.8; P.mouth = 'smile'; if (t >= 155.75) { P.handLW = P.handRW = null; P.gaze = lookAt(head, fh); P.lid = blink(t, 51); } }
  return P;
}
function k14mHim(t) {
  const hx = K14M_HIM_X, P = { ...walk(hx, t, { stride: GAIT.rat * 0.85 }), y: 900, s: 0.85, who: 'him', dir: -1, t, ears: 0.5, seed: 91 };
  P.lid = blink(t, 91); P.gaze = [-1, -0.2];
  if (t < 113.34) return null;
  if (t < 114.2) { const [x, hy] = hop(t, 113.34, 0.3, 700, 665, 24); P.x = x; P.y = 900 - hy; P.sq = landSquash(t, 113.64); P.sit = blend(t, 113.7, 113.9, 0, 1); P.sniff = 1; P.wave = t > 113.8 ? 1 : 0; return P; }
  if (t < 120.92) return null;
  if (t < 126.74) { const [x, hy] = hop(t, 120.92, 0.28, 636, 600, 20); P.x = x; P.y = 900 - hy; P.sq = landSquash(t, 121.2); P.sit = blend(t, 121.3, 121.5, 0, 1); P.paw = t > 121.4 && t < 121.9 ? 'out' : null; P.gaze = [1, -0.3]; P.drop = t > 121.9 ? -6 * pulse(t, 121.9, 0.5) : 0; P.mouth = 'smile'; return P; }
  // S12 sweeping at his door
  P.mouth = 'smile';
  if (t < 128.52) { P.broom = 1; P.broomA = 0.35 + 0.35 * Math.sin(t * Math.PI / 0.4); P.gaze = [-0.3, 1]; P.y -= Math.abs(kick(t, k14mFalls(), 3, 11, 9)); }
  if (t >= 127.6 && t < 128.52) { P.gaze = [-1, 0.2]; P.ears = 1; }
  if (t >= 128.52 && t < 129.92) { const up = blend(t, 128.52, 129.0, 0, 1); P.broom = 1; P.broomA = 0.3; P.gaze = [-0.3, -1]; P.drop = -6 * up; P.tip = t < 129.1 ? -0.5 * blend(t, 128.8, 129.1, 0, 1) : -0.5 + 0.5 * K14B(t, 129.5, 0.3); P.y -= rebound(t, 129.1, 8); P.eyes = 'wide'; }
  if (t >= 129.92) { P.sit = 1; P.gaze = lookAt([P.x, 840], [K14M_FATHER_X(t) + 30, 730]); P.paw = t < 130.5 ? 'head' : null; P.broom = t < 133.78 ? 1 : 0; P.broomA = 0.2; }
  if (t >= 132.62 && t < 133.78) P.gaze = [-0.5, -1];
  if (t >= 133.78 && t < 134.3) { P.eyes = 'wide'; P.ears = 1; P.gaze = [-0.4, -1]; }
  if (t >= 134.3 && t < 135.08) { P.paw = 'out'; P.talk = 0.3 + 0.4 * Math.abs(Math.sin(t * 10)); P.ears = 0; P.brow = -0.5; }
  if (t >= 135.08 && t < 136.12) { P.paw = t < 135.55 ? 'head' : 'point'; P.gaze = t < 135.55 ? [0, -1] : [-0.6, -1]; P.talk = 0.3 * Math.abs(Math.sin(t * 9)); }
  if (t >= 137.2 && t < 137.78) { P.paw = 'door'; P.dir = 1; P.tip = 0.25 * pulse(t, 137.3, 0.45); P.sit = 0.5; }
  if (t >= 137.78 && t < 139.7) { P.sit = t < 138.0 ? 0 : 1; P.dir = -1; P.gaze = [-1, 0]; if (t >= 138.4) { P.paw = 'eyes'; P.ears = -0.5; } }
  if (t >= 139.7 && t < 144.22) { P.sit = 1; P.paw = t < 141.18 ? 'heart' : null; P.lid = 0.15; P.gaze = lookAt([P.x, 840], [K14M_MAID_X(t), 690]); if (t >= 142.46 && t < 143.2) { P.nod = 0.15 * Math.sin((t - 142.46) * 25); P.lid = 1; } }
  if (t >= 144.22 && t < 153.64) { P.sit = 1; P.gaze = lookAt([P.x, 840], [K14M_MAID_X(t), 690]); if (t >= 146.06 && t < 146.8) { P.nod = -0.2; P.paw = 'out'; P.ears = 0.2; } }
  if (t >= 153.64 && t < 156.32) { P.sit = 1; P.paw = 'self'; P.ears = 1; P.blush = 1; P.tailCurl = 1; P.tailUp = 1; P.sq = 1 + 0.12 * settleTo(t, 153.64, 0, 1, 0.3) * (1 - blend(t, 154.6, 155.0, 0, 1)); P.x += tremble(t, 1.5 * (t > 154.0 ? 1 : 0), 12); P.eyes = 'wide'; }
  if (t >= 156.32) { P.sit = t < 158.5 ? 1 : 0; P.gaze = lookAt([P.x, 860], [K14M_HER_X(t), 880]); P.eyes = t < 157.46 ? 'wide' : 'open'; }
  if (t >= 158.5 && t < 159.22) { P.paw = 'out'; P.ears = -0.5; P.blush = 1; P.mouth = 'smile'; }
  if (t >= 159.22) { P.gaze = [-1, 0]; P.blush = 0.6; }
  if (t >= 160.0 && t < 160.66) { P.dir = -1; P.paw = 'door'; P.tip = 0.3 * K14B(t, 160.0, 0.2); P.sit = 0; }
  if (t >= 160.66) { const k = K.clamp((t - 160.9) / 0.2); if (k >= 1) return null; P.x = K.lerp(740, 702, K.clamp((t - 160.66) / 0.25)); P.dir = -1; P.alpha = 1 - k; P.sq = 1 - 0.3 * k; }
  return P;
}
function k14mHer(t) {
  if (t < 157.46) return null;
  const hx = K14M_HER_X, P = { ...walk(hx, t, { stride: GAIT.rat * 0.8 }), y: 896, s: 0.8, who: 'her', dir: 1, t, bow: true, ears: 0.6, seed: 93 };
  P.lid = blink(t, 93);
  if (t < 158.5) { P.sit = 1; P.gaze = [0.2, 1]; P.lid = Math.max(pulse(t, 157.6, 0.3), pulse(t, 157.95, 0.3)); if (t > 158.0) { P.twitch = t; P.gaze = [1, -0.2]; } }
  if (t >= 158.5) { P.y = 900; P.tailUp = 1; P.gaze = [1, 0]; P.mouth = 'smile'; }
  if (t >= 160.1 && t < 160.66) { P.dir = -1; P.sit = settleTo(t, 160.34, 0, 1, 0.2); P.wave = t > 160.4 ? 1 : 0; P.gaze = lookAt([700, 860], [545, 720]); }
  if (t >= 160.66) { const k = K.clamp((t - 160.66) / 0.25); if (k >= 1) return null; P.dir = 1; P.x = 700; P.alpha = 1 - k; P.sq = 1 - 0.3 * k; P.tailUp = 1; }
  return P;
}
let K14M_FALLS = null; function k14mFalls() { if (!K14M_FALLS) K14M_FALLS = footfalls(K14M_FATHER_X, 127.28, 128.4, 20).concat(footfalls(K14M_MAID_X, 127.4, 128.6, 18)); return K14M_FALLS; }
function k14mScarf(ctx, t) {
  if (t < 156.5) return;
  if (t < 161.18) { const y = Math.min(898, K.lerp(780, 898, K.ease.out(K.clamp((t - 156.5) / 0.95)))); scarfCloth(ctx, 590, y, 0.95, 0, y < 898 ? 0.3 * Math.sin(t * 6) : 0, y < 898 ? Math.sin(t * 10) : 0); return; }
  const F = k14mFather(t);
  if (t < 161.6) { scarfCloth(ctx, K.lerp(590, 584, K.clamp((t - 161.18) / 0.2)), K.lerp(898, 880, K.clamp((t - 161.3) / 0.3)), 0.95, 0, 0); return; }
  const kn = K.clamp(F.kneel || 0), fold = K14B(t, 161.6, 0.35, 'inOut'), cy = F.y - (125 - 50 * kn) * 0.95;
  scarfCloth(ctx, F.x + 6 * (F.dir || 1), cy, 0.95, fold, 0.1, 0);
}
const K14_MOUNT = {
  a: 100.32, b: 168.0, bounds: [-110, 1110, -270, 1230],
  cam: [[100.32, { x: 210, y: 740, zoom: 1.7 }], [102.2, { x: 230, y: 740, zoom: 1.7 }], [104.46, { x: 420, y: 620, zoom: 1.05 }], [105.6, { x: 500, y: 480, zoom: 0.82 }], [106.32, { x: 500, y: 480, zoom: 0.82 }],
    [106.33, { x: 560, y: 520, zoom: 0.9 }], [109.06, { x: 560, y: 520, zoom: 0.9 }], [110.3, { x: 690, y: 840, zoom: 2.2 }], [119.7, { x: 690, y: 840, zoom: 2.2 }], [120.4, { x: 680, y: 740, zoom: 1.3 }], [122.3, { x: 680, y: 740, zoom: 1.3 }],
    [123.0, { x: 330, y: 730, zoom: 2.0 }], [126.73, { x: 330, y: 730, zoom: 2.0 }], [126.74, { x: 640, y: 850, zoom: 2.7 }], [132.62, { x: 640, y: 850, zoom: 2.7 }], [133.5, { x: 500, y: 690, zoom: 1.6 }], [134.2, { x: 640, y: 850, zoom: 2.7 }],
    [137.2, { x: 640, y: 850, zoom: 2.7 }], [137.6, { x: 650, y: 830, zoom: 2.3 }], [139.7, { x: 650, y: 820, zoom: 2.2 }], [144.22, { x: 650, y: 820, zoom: 2.2 }], [144.9, { x: 600, y: 730, zoom: 1.55 }], [146.76, { x: 600, y: 730, zoom: 1.55 }],
    [147.4, { x: 560, y: 720, zoom: 2.0 }], [151.3, { x: 560, y: 720, zoom: 2.0 }], [152.4, { x: 600, y: 760, zoom: 1.7 }], [155.3, { x: 600, y: 760, zoom: 1.7 }], [156.0, { x: 570, y: 700, zoom: 1.5 }], [157.4, { x: 570, y: 760, zoom: 1.6 }],
    [158.0, { x: 630, y: 850, zoom: 2.4 }], [159.22, { x: 650, y: 850, zoom: 2.4 }], [160.3, { x: 640, y: 800, zoom: 1.8 }], [162.3, { x: 640, y: 800, zoom: 1.8 }], [164.6, { x: 500, y: 480, zoom: 0.82 }], [168.0, { x: 500, y: 480, zoom: 0.82 }]],
  draw(ctx, t) {
    ctx.drawImage(K14M_bake(), -110, -270, 1220, 1500);
    // S14: the sky cast looking down at the little light
    if (t >= 159.22) { const hole = K14_HOLE_A;
      sunFace(ctx, 900, 40, 80, t, { gaze: lookAt([900, 40], hole), lidL: blink(t, 61), lidR: blink(t, 61), mouth: 'smile' });
      cloudFace(ctx, 170 + 10 * Math.sin(t * 0.6), 150, 1.4, t, { gaze: lookAt([170, 150], hole), lid: Math.max(0.3, blink(t, 65)), mouth: 'smile' });
      windSpirit(ctx, 20, 380, 0.5, t, { dir: 1, gaze: lookAt([20, 380], hole), lid: Math.max(0.2, blink(t, 71)), mouth: 'smile', stretch: 0.6 }); }
    mountainMassif(ctx, t, k14mMtn(t));
    // pebbles skitter on the wake-up rumble
    if (t >= 106.32 && t < 108.0) for (let i = 0; i < 5; i++) { const r = K.rng(700 + i), x0 = 300 + r() * 600, d = t - 106.32 - r() * 0.4; if (d > 0) { const y = Math.min(900, 400 + r() * 200 + 300 * d * d + 80 * d); shape(ctx, ell(x0 + 40 * d, y, 7, 6, 8), K14_ROCKL, { lw: 3, seed: 710 + i }); } }
    // boulder
    const Bo = K14M_BOULDER(t); if (Bo) { mountainBoulder(ctx, Bo.x, Bo.y, 26, Bo.rot, Bo.sq); if (t >= 120.5 && t < 121.3) dustBurst(ctx, 700, 895, t - 120.5, 6, 6, 12, 40, 0.8, 72); }
    if (t >= 120.92 && t < 121.5) for (let i = 0; i < 4; i++) { const d = t - 120.92, a = -0.5 - i * 0.7; shape(ctx, ell(636 + Math.cos(a) * 80 * d, 880 + Math.sin(a) * 80 * d + 160 * d * d, 5, 4, 8), K14_ROCKL, { lw: 2.5, seed: 720 + i }); }
    if (t >= 121.0 && t < 122.2) { const d = t - 121.0; ctx.save(); ctx.globalAlpha = 0.7 * (1 - d / 1.2); shape(ctx, ell(610 - 30 * d, 560 + 20 * d, 40 + 40 * d, 24 + 20 * d, 18), '#c9c4d6', { lw: 0 }); ctx.restore(); }
    // glints in the hole
    if (t >= 111.78 && t < 113.34) { const b = Math.max(blink(t, 95) , 0) > 0.5; if (!b) for (const dx of [-5, 5]) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(K14_HOLE_A[0] + dx, K14_HOLE_A[1] + 1, 2.6, 0, 7); ctx.fill(); } if (t >= 112.6) { ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 1.5; for (const a of [-0.2, 0.2]) { ctx.beginPath(); ctx.moveTo(K14_HOLE_A[0] - 8, K14_HOLE_A[1] + 6); ctx.lineTo(K14_HOLE_A[0] - 22, K14_HOLE_A[1] + 6 + a * 20); ctx.stroke(); } ctx.restore(); } }
    // her shadow on the rock (144.5-147): head and two buns = a mouse
    if (t >= 144.5 && t < 147.2) { const a = 0.35 * K14B(t, 144.5, 0.4) * (1 - K14B(t, 146.7, 0.5)), mx = K14M_MAID_X(t); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = K14_HOLE;
      const sx = mx + 150, sy = 600; ctx.beginPath(); ctx.ellipse(sx, sy, 40, 44, 0, 0, 7); ctx.ellipse(sx - 36, sy - 40, 24, 24, 0, 0, 7); ctx.ellipse(sx + 36, sy - 40, 24, 24, 0, 0, 7); ctx.ellipse(sx, sy + 120, 50, 90, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(sx + 10, sy + 40); ctx.lineTo(sx, sy + 58); ctx.lineTo(sx - 10, sy + 40); ctx.fill(); ctx.restore(); }
    // sandal by the door
    if (t >= 137.78 && t < 144.22) { const y = Math.min(898, fallY(t, 137.78, 137.98, 860, 898)); sandal(ctx, 640, y, 1); }
    // cast
    const F = k14mFather(t), M = k14mMaiden(t);
    const lightA = 0.45 * K14B(t, 155.75, 0.5) * (1 - K14B(t, 157.0, 0.6)); skyLight(ctx, 590, -270, 910, 360, lightA);
    person(ctx, F);
    if (t < 156.32) person(ctx, M);
    else if (t < 157.1) { const d = t - 156.32; ctx.save(); ctx.filter = 'brightness(0)'; person(ctx, { ...M, sq: K.lerp(1, 0.25, K.clamp(d / 0.7)), alpha: 1 - K.clamp((d - 0.5) / 0.2) }); ctx.restore(); }
    k14mScarf(ctx, t);
    const H = k14mHim(t); if (H) k14Mouse(ctx, H);
    const R = k14mHer(t); if (R) k14Mouse(ctx, R);
    if (t >= 158.85 && t < 159.9) heart(ctx, 668, 830 - 30 * K14B(t, 158.85, 1.0), 14 * K.ease.back(K14B(t, 158.85, 0.3)));
    if (t >= 156.32) poofBurst(ctx, 590, 790, t - 156.32, 170, 5);
    if (t >= 129.1 && t < 129.7) for (let i = 0; i < 3; i++) { const a = (t - 129.1) * 8 + i * 2.1; star(ctx, 650 + Math.cos(a) * 26, 830 + Math.sin(a) * 8, 6, C.yellow, a); }
    // broom drop
    if (t >= 133.78 && t < 144.22) { const y = Math.min(896, fallY(t, 133.78, 134.0, 860, 896)) - rebound(t, 134.0, 6); ctx.save(); ctx.translate(615, y); ctx.rotate(t < 134.0 ? 1.0 : 1.5); seg(ctx, -30, 0, 30, 0, 3.4, '#a8741a', 1.6); ctx.restore(); }
    // thought clouds
    { const p = K14B(t, 141.18, 0.5) * (1 - K14B(t, 144.0, 0.3)); if (p > 0) thoughtCloud(ctx, 760, 700, 240, 170, t, { p, tail: [680, 840], bg: C.yellow, scale: 0.22, at: [500, 760], inside: (c) => {
      k14Mouse(c, { x: 330, y: 900, s: 2.4, who: 'him', dir: 1, t, sit: 1, mouth: 'smile' });
      if (t < 143.26) { k14Mouse(c, { x: 680, y: 900, s: 2.4, who: 'her', dir: -1, t, sit: 1, bow: true, mouth: 'smile' }); heart(c, 500, 640, 60); }
      else { const k = K.ease.back(K14B(t, 143.26, 0.35)); c.save(); c.translate(690, 920); c.scale(k, k); shape(c, [[-120, 0], [-110, -60], [-40, -90], [120, -70], [150, -20], [140, 0]], C.white, { lw: 10, seed: 730, dot: C.skin, pitch: 12, rad: 0.3 }); c.restore();
        c.save(); c.lineWidth = 26; c.strokeStyle = C.red; c.strokeRect(540, 760, 300, 200); c.beginPath(); c.moveTo(540, 760); c.lineTo(840, 960); c.moveTo(840, 760); c.lineTo(540, 960); c.stroke(); c.restore(); }
    } }); }
    { const p = K14B(t, 150.0, 0.5) * (1 - K14B(t, 152.3, 0.3)); if (p > 0) thoughtCloud(ctx, 556, 520, 250, 180, t, { p, tail: [556, 660], bg: C.yellow, scale: 0.25, at: [500, 760], inside: (c) => {
      for (const sd of [-1, 1]) shape(c, ell(500 + sd * 90, 860, 120, 50, 20), C.white, { lw: 10, seed: 740 + sd, dot: C.skin, pitch: 12, rad: 0.3 });
      k14Mouse(c, { x: 480, y: 830, s: 2.6, who: 'her', dir: -1, t, sit: 0.4, ears: 0.3, lid: 0.3 });
    } }); }
    // speech balloon (131.8): two rings and a question mark
    if (t >= 131.8 && t < 133.6) { const k = K14B(t, 131.8, 0.3); bubble(ctx, 640, 720, 130, 90, 585, 745, k, ''); if (k > 0.6) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; for (const dx of [-30, -12]) { ctx.beginPath(); ctx.arc(640 + dx, 722, 11, 0, 7); ctx.stroke(); } ctx.restore(); ctx.save(); ctx.font = K.font(46, BF, 400); ctx.fillStyle = C.red; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 668, 724); ctx.restore(); } }
    // measuring arrow (132.62-133.8)
    if (t >= 132.62 && t < 133.8) { const k = K14B(t, 132.8, 0.4, 'out'), x = 400, y0 = 900, y1 = K.lerp(900, 668, k); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); for (const [yy, sd] of [[y0, 1], [y1, -1]]) { ctx.beginPath(); ctx.moveTo(x - 10, yy + sd * -12 * -1); ctx.lineTo(x, yy); ctx.lineTo(x + 10, yy + sd * -12 * -1); ctx.stroke(); } ctx.restore(); }
  },
  over(ctx, t, cam, S) {
    k14Sfx(ctx, cam, 260, 580, 'THAT ONE!', t, 101.5, 1.2, 70, { rot: -0.08 });
    k14Label(ctx, S, cam, 600, 300, 'THE GREAT MOUNTAIN', t, 104.98, 106.3, { size: 44 });
    k14Arrow(ctx, S, cam, [600, 770], [690, 868], t, 109.68, 111.6, { width: 12 }); k14Label(ctx, S, cam, 600, 750, 'SMALL...', t, 109.68, 111.6, { size: 34 });
    k14Sfx(ctx, cam, 640, 790, 'SQUEAK!', t, 113.4, 1.0, 52, { rot: -0.08 });
    k14Sfx(ctx, cam, 600, 800, 'POP!', t, 121.0, 0.9, 52, { rot: 0.08 });
    if (t >= 124.74 && t < 126.6) k14Sfx(ctx, cam, 335, 600, '!', t, 124.8, 1.8, 110, { fill: C.red });
    k14Label(ctx, S, cam, 470, 600, 'A BIT TALL', t, 132.9, 133.8, { size: 36 });
    k14Arrow(ctx, S, cam, [560, 820], [520, 760], t, 136.12, 137.2, { width: 12 }); k14Label(ctx, S, cam, 580, 840, 'HUMAN', t, 136.12, 137.2, { size: 34 });
    k14Arrow(ctx, S, cam, [610, 760], [690, 860], t, 137.2, 137.9, { width: 12 }); k14Label(ctx, S, cam, 590, 745, 'MY HOME', t, 137.2, 137.9, { size: 34 });
    k14Sfx(ctx, cam, 640, 780, 'BONK!', t, 138.5, 0.9, 50, { rot: -0.1 });
    k14Label(ctx, S, cam, 760, 590, 'A MOUSE LIKE ME', t, 141.3, 143.2, { size: 30 });
    k14Sfx(ctx, cam, 720, 760, 'ME?!', t, 153.7, 1.3, 56, { rot: 0.06 });
    k14Sfx(ctx, cam, 680, 640, 'POOF!', t, 156.4, 1.1, 90, { rot: -0.08 });
    // cutaway: inside the rock (114.2-118.7)
    if (t >= 114.2 && t < 118.75) { const k = K.ease.back(K14B(t, 114.2, 0.35)) * (1 - K14B(t, 118.45, 0.3)), cx = 330, cy = 420, r = 230 * k; if (r > 4) {
      const [hx, hy] = k14P(K14_HOLE_A[0], K14_HOLE_A[1], cam); ctx.save(); ctx.setLineDash([10, 10]); ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(cx + r * 0.7, cy + r * 0.7); ctx.lineTo(hx, hy - 20); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#4a4656'; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, '#6a6676', 10, 0.3); ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      const tun = (pts, t0) => { const q = K.trim(pts, K14B(t, t0, 0.6, 'inOut')); if (q.length < 2) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 40; ctx.strokeStyle = '#2a2632'; K.poly(ctx, q); ctx.stroke(); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.white; K.poly(ctx, q); ctx.stroke(); ctx.restore(); };
      tun([[cx + 240, cy + 120], [cx + 60, cy + 120], [cx - 20, cy + 80]], 114.2); tun([[cx + 60, cy + 120], [cx + 40, cy + 20], [cx - 60, cy - 20]], 115.42); tun([[cx + 20, cy + 120], [cx - 40, cy + 170]], 115.62);
      if (t >= 116.28) { const k2 = K14B(t, 116.28, 0.8, 'out'); shape(ctx, ell(cx - 90, cy - 30, 70 * k2 + 1, 46 * k2 + 1, 24), '#2a2632', { lw: 4, seed: 750 }); mouseRoomProps(ctx, cx - 90, cy + 8, 1.5, K14B(t, 117.88, 0.25), K14B(t, 118.08, 0.25), K14B(t, 118.28, 0.25)); }
      const mxp = t < 115.42 ? [cx - 10, cy + 100] : t < 116.28 ? [cx - 50, cy] : [cx - 60 - 20 * K14B(t, 116.28, 1.0), cy + 14];
      k14Mouse(ctx, { x: mxp[0], y: mxp[1], s: 1.1, who: 'him', dir: -1, t, ph: t * 40, amp: t < 116.28 ? 0.7 : 0.4, rot: 0.08 * Math.sin(t * 40), tip: t >= 116.28 && t < 117.8 ? 0.2 : 0, gaze: [-1, 0.2], mouth: 'grit' });
      if (t < 117.8) for (let i = 0; i < 5; i++) { const ph = ((t * 3 + i * 0.2) % 1); shape(ctx, ell(mxp[0] + 30 + ph * 60, mxp[1] - 30 - 40 * Math.sin(ph * 3) + ph * ph * 40, 4, 3, 6), K14_ROCKL, { lw: 2, seed: 760 + i }); }
      ctx.restore(); ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore();
      if (t >= 115.5 && t < 117.0) { ctx.save(); sfx(ctx, 'DIG DIG DIG', cx, cy - 170, 46, K14B(t, 115.5, 0.3), { rot: -0.06 }); ctx.restore(); }
      if (t >= 117.88) S.label(ctx, 'HOME', cx - 90, cy - 100, K14B(t, 117.9, 0.3), { size: 40, align: 'center' }); } }
    // cutaway: her fingertip knocks over the tiny bed (138.4-139.2)
    if (t >= 138.4 && t < 139.4) { const k = K.ease.back(K14B(t, 138.4, 0.2)) * (1 - K14B(t, 139.15, 0.25)), cx = 700, cy = 360, r = 170 * k; if (r > 4) {
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#4a4656'; ctx.fill(); ctx.clip(); shape(ctx, ell(cx, cy + 20, 150, 100, 24), '#2a2632', { lw: 0 });
      const fx = K.lerp(cx + 220, cx + 40, K14B(t, 138.45, 0.25, 'out')); shape(ctx, [[cx + 300, cy - 30], [fx + 30, cy - 30], [fx, cy - 10], [fx, cy + 20], [fx + 30, cy + 34], [cx + 300, cy + 34]], C.white, { lw: 6, seed: 770, dot: C.skin, pitch: 8, rad: 0.3 });
      mouseRoomProps(ctx, cx - 40, cy + 80, 2.2, 1, 1, 1, -1.2 * K14B(t, 138.65, 0.2, 'out'));
      ctx.restore(); ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore(); } }
  },
};
