// ===== KD-014 S10-S14 (100.32-168.00): at the foot of the mountain. The mouse; the refusal; her choice; going home. =====
// World x -110..1110, y -270..1230 so the crane-outs reach zoom 0.82 (the whole mountain and the sky above it). Ground y 900.
// v2 (Fable round 1): people s 0.95 and mice s K14_MS (0.34), so a person is at least 4.5 times a mouse's height. The mouse's front door
// is hole B (636) once the boulder has plugged hole A (700). Mouse-level shots use zoom 5.5-6; three-shots zoom 3.0-3.4 (mouse >= 150 px).
const K14M_bake = () => bake('k14mtnset', 1220, 1500, (x) => { x.translate(110, 270);
  x.fillStyle = C.blue; x.fillRect(-110, -270, 1220, 280); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(-110, -270, 1220, 280);
  x.save(); x.translate(-110, 0); sky(x, { w: 1220 }); hillTrees(x, { y: 905, seed: 21, n: 15 }); ground(x, { w: 1220 }); x.restore(); });
const K14M_DOOR = K14_HOLE_B;
// positions (cuts at 126.74 hide the father's and daughter's jump to the door)
const K14M_FATHER_X = (t) => kfn(t, [[100.32, 40], [102.2, 40], [104.3, 300], [106.32, 300], [107.36, 300], [107.6, 260], [126.73, 260], [126.74, 380], [128.4, 505], [144.3, 505], [144.8, 460], [163.0, 460], [167.6, 150]]);
const K14M_MAID_X = (t) => kfn(t, [[100.32, 130], [102.2, 130], [104.1, 400], [126.73, 400], [126.74, 400], [128.6, 420], [136.3, 420], [136.6, 405], [137.59, 405], [137.6, 548], [137.78, 572], [139.59, 572], [139.6, 405], [140.4, 420], [144.3, 420], [144.8, 380], [152.38, 380], [153.3, 545]]);
const K14M_HIM_X = (t) => kfn(t, [[126.74, 606], [159.22, 606], [159.75, 700], [161.35, 700], [161.66, 645]]);
const K14M_HER_X = (t) => kfn(t, [[157.46, 545], [159.4, 545], [160.3, 606], [161.1, 606], [161.35, 634]]);
const K14M_BOULDER = (t) => { if (t < 119.7) return null; const u = K.clamp((t - 119.9) / 0.6), x = K.lerp(905, 700, K.ease.in(u)), y = K.lerp(548, 876, K.ease.in(u)); return { x, y, rot: (905 - x) / 22, sq: impactSquash(t, 120.5, 0.8) }; };
const k14mHead = (P) => [P.x + 4 * (P.dir || 1), 900 - 199 * 0.95 + 26 * K.clamp(P.kneel || 0)];
function k14mMtn(t) {
  const M = { lid: 1, mouth: 'line', gaze: [0, 0.3], holeB: t >= 120.92 ? K14B(t, 120.92, 0.2) : 0, litB: t >= 161.75 ? K14B(t, 161.75, 0.3) : 0, glowBig: K14B(t, 163.2, 1.4) };
  if (t >= 106.32) { M.lidL = blend(t, 106.32, 106.9, 1, 0); M.lidR = blend(t, 106.4, 106.98, 1, 0); M.lid = undefined; M.gaze = lookAt([610, 380], [340, 760]); }
  if (t >= 107.0) { M.lidL = M.lidR = Math.max(0.35, blink(t, 81)); }
  // v2: the mountain talks on its own quoted words (108.02-113.34 and 119.70-122.32), not on "said"
  if (t >= 106.9 && t < 108.02) M.brow = -0.5 * K14B(t, 107.36, 0.3);
  if (t >= 108.02 && t < 113.3) M.talk = 0.45 * Math.abs(Math.sin((t - 108.02) * 4.4));
  if (t >= 108.02) { M.gaze = [0.5, 1]; M.brow = -0.5; }
  if (t >= 111.78 && t < 113.34) M.lidR = 0.2;
  if (t >= 113.34) M.gaze = [0.6, 1];
  if (t >= 118.72 && t < 119.7) { M.gazeL = [0.8, 0.2]; M.gazeR = [-0.8, 0.2]; M.mouth = 'wobble'; M.talk = 0; M.lidL = 0.35 + 0.3 * Math.abs(Math.sin(t * 36)); M.brow = -0.3; }
  if (t >= 119.7 && t < 122.32) { M.brow = -0.8; M.lidL = M.lidR = 0.55; M.mouth = 'frown'; M.gaze = [0.3, 1]; M.talk = 0.4 * Math.abs(Math.sin((t - 119.7) * 4.6)) * (t < 120.5 || t > 120.62 ? 1 : 0); }
  if (t >= 122.32) { M.lidL = M.lidR = Math.max(0.45, blink(t, 81)); M.gaze = [0.4, 1]; M.mouth = 'line'; }
  if (t >= 162.98) { M.mouth = 'smile'; M.gaze = undefined; M.gazeL = lookAt([520, 380], K14M_DOOR); M.gazeR = lookAt([700, 380], K14M_DOOR); M.lidL = Math.max(0.45, blink(t, 81)); M.lidR = Math.max(0.45, blink(t, 83)); }
  return M;
}
function k14mFather(t) {
  const fx = K14M_FATHER_X, P = { ...walk(fx, t, { stride: 20 }), y: 900, s: 0.95, dir: 1, costume: 'ascetic', age: 1, hold: 'stick', mouth: 'closed', seed: 11 };
  P.amp *= 0.8; P.lid = blink(t, 11); const head = [P.x, 690], mh = [K14M_MAID_X(t), 690];
  P.gaze = lookAt(head, [600, 350]);
  if (t < 104.98) { P.gaze = lookAt(head, mh); if (t >= 102.2) { P.tip = 0.06; P.mouth = 'o'; } }
  if (t >= 104.98 && t < 106.32) { P.tip = -0.15; P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.hold = null; P.gaze = [0.2, -1]; P.mouth = 'o'; }
  if (t >= 107.36 && t < 108.0) { P.sq = 0.92; P.handL = [-90, -150]; P.gaze = [0.6, -1]; P.mouth = 'o'; }
  if (t >= 108.0 && t < 122.3) { P.gaze = lookAt(head, t < 109.0 ? [600, 400] : t < 120.92 ? [700, 885] : [620, 885]); }
  // 122.32-126.74: he answers her look with a shrug (6 frames after her turn), then the one look to camera
  if (t >= 122.3 && t < 126.74) { P.gaze = lookAt(head, t < 124.26 ? [620, 885] : mh); P.mouth = 'o'; if (t >= 124.26) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.hold = null; P.brow = -1; P.drop = -3 * pulse(t, 124.26, 0.4); } if (t >= 124.74 && t < 125.54) { P.gaze = [0, 0.05]; P.lid = 0; } }
  // S12: his feet arrive at mouse level, he kneels into frame and asks
  if (t >= 126.74) { P.gaze = lookAt(head, [K14M_HIM_X(t), 870]); P.mouth = 'smile'; P.hold = null; }
  if (t >= 128.52 && t < 129.92) { P.gaze = lookAt(head, [606, 880]); P.mouth = 'o'; }
  if (t >= 129.92 && t < 144.3) { P.kneel = settleTo(t, 129.92, 0, 1, 0.45, 0.08); P.hold = null; P.handL = null; P.handR = PERSON_HANDS.chest.R; P.tip = 0.06; P.lid = Math.max(0.1, blink(t, 11)); P.gaze = lookAt(k14mHead(P), [606, 860]); P.mouth = 'smile'; }
  if (t >= 130.54 && t < 131.8) { P.talk = 0.3 + 0.35 * Math.abs(Math.sin(t * 9)); P.handR = [62, -118]; }
  if (t >= 131.8 && t < 132.62) P.handR = [62, -118];
  if (t >= 132.62 && t < 133.78) P.gaze = lookAt(k14mHead(P), mh);
  if (t >= 135.08 && t < 136.4) P.gaze = lookAt(k14mHead(P), [606, 860]);
  if (t >= 136.4 && t < 137.2) P.gaze = lookAt(k14mHead(P), [K14M_MAID_X(t), 680]);
  if (t >= 137.2 && t < 139.7) P.gaze = lookAt(k14mHead(P), [600, 880]);
  if (t >= 141.18 && t < 144.22) P.gaze = lookAt(k14mHead(P), [600, 700]);
  if (t >= 143.26 && t < 144.22) P.gaze = lookAt(k14mHead(P), mh);
  // S13: stands and steps back; her hands; the memory; tears; the nod; prayer; POOF; hands to chest
  if (t >= 144.3) { P.kneel = 1 - blend(t, 144.3, 144.8, 0, 1); P.hold = null; P.handR = null; P.handL = null; P.tip = 0; P.gaze = lookAt(head, mh); P.mouth = 'smile'; }
  if (t >= 144.5 && t < 145.14) P.gaze = lookAt(head, [590, 600]);
  if (t >= 146.76 && t < 152.38) { P.dir = -1; const k = blend(t, 146.76, 147.3, 0, 1); P.handLW = [K.lerp(P.x + 40, 424, k), K.lerp(810, 790, k)]; P.handRW = [K.lerp(P.x + 40, 420, k), K.lerp(810, 780, k)]; P.gaze = lookAt(head, mh);
    if (t >= 147.54 && t < 148.8) { P.brow = -0.5; P.gaze = lookAt(head, [K14M_MAID_X(t) + gazePlan(t, [[147.54, [-8, 0]], [147.9, [8, 0]], [148.25, [-8, 0]], [148.6, [0, 0]]], 0.07)[0], 680]); }
    if (t >= 151.3) { P.handLW = null; P.handRW = null; P.handR = PERSON_HANDS.chest.R; P.lid = Math.max(0.3, blink(t, 11)); } }
  if (t >= 151.3) P.wet = true;
  if (t >= 152.38 && t < 155.34) { P.dir = 1; P.gaze = lookAt(head, t < 153.64 ? [606, 870] : mh); P.handR = PERSON_HANDS.chest.R; P.lid = Math.max(0.3, blink(t, 11));
    if (t >= 154.28) { const n = settleTo(t, 154.28, 0, 1, 0.5, 0.1); P.drop = 9 * n * (1 - blend(t, 154.9, 155.3, 0, 1)); P.lid = t < 155.0 ? Math.min(1, blend(t, 154.28, 154.45, 0.3, 1)) : blink(t, 11); P.mouth = 'smile'; P.gaze = lookAt(head, mh); } }
  if (t >= 155.34 && t < 157.46) { P.mouth = 'smile'; const k = settleTo(t, 155.34, 0, 1, 0.45); P.aL = [K.lerp(-0.3, -2.55, k), K.lerp(-0.2, -2.9, k)]; P.aR = [K.lerp(0.3, 2.55, k), K.lerp(0.2, 2.9, k)]; P.lid = t < 157.2 ? 1 : blink(t, 11); P.drop = -6; P.gaze = [0.3, -1]; }
  if (t >= 157.46 && t < 159.22) { const k = blend(t, 157.46, 157.9, 0, 1); P.aL = P.aR = null; P.handR = PERSON_HANDS.chest.R; P.handL = [12, -114]; P.mouth = 'smile'; P.gaze = lookAt(head, [K14M_HER_X(t), 885]); P.tip = 0.08 * k; P.lid = Math.max(0.15, blink(t, 11)); }
  // S14: kneels and waves her in; picks up and folds the scarf; long blink; walks home with it
  if (t >= 159.22) { P.mouth = 'smile'; P.hold = null; P.kneel = blend(t, 159.8, 160.2, 0, 1) * (1 - blend(t, 162.6, 163.0, 0, 1)); P.gaze = lookAt(k14mHead(P), [K14M_HER_X(t), 880]); P.handR = PERSON_HANDS.chest.R; P.handL = [12, -114]; P.lid = Math.max(0.15, blink(t, 11)); P.tip = 0.06;
    if (t >= 160.34 && t < 161.15) { P.handR = [56 + 6 * Math.sin(t * 16), -172]; P.handL = [12, -114]; }
    if (t >= 161.15) P.gaze = lookAt(k14mHead(P), K14M_DOOR);
    if (t >= 161.8 && t < 162.05) { P.handRW = [545, 890]; P.handR = null; P.tip = 0.2 * pulse(t, 161.75, 0.4); P.gaze = lookAt(k14mHead(P), [545, 892]); }
    if (t >= 162.05) { P.handR = PERSON_HANDS.chest.R; P.handL = [12, -114]; P.tip = 0.04; P.gaze = lookAt(k14mHead(P), K14M_DOOR); }
    if (t >= 162.2 && t < 162.75) P.lid = 1;
    if (t >= 163.0) { P.dir = -1; P.handR = PERSON_HANDS.chest.R; P.handL = [12, -114]; P.tip = 0.04; P.gaze = t >= 164.0 && t < 164.9 ? [1, 0.25] : [-1, 0]; } }
  return P;
}
function k14mMaiden(t) {
  const mx = K14M_MAID_X, P = { ...walk(mx, t, { stride: 18 }), y: 900, s: 0.95, dir: 1, costume: 'maiden', mouth: 'smile', seed: 51 };
  P.lid = blink(t, 51); const head = [P.x, 680], fh = [K14M_FATHER_X(t), 700];
  P.gaze = lookAt(head, [600, 350]);
  if (t < 101.44) { const [_, hy] = hop(t, 100.62, 0.5, 0, 0, 60); P.y = 900 - hy; P.sq = anticipate(t, 100.32, 0.3, 0.12) * landSquash(t, 101.12); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = 'open'; P.gaze = lookAt(head, [600, 300]); }
  if (t >= 101.44 && t < 102.2) { const k = settleTo(t, 101.44, 0, 1, 0.3); P.aR = [K.lerp(0.3, 2.3, k), K.lerp(0.3, 2.5, k)]; P.gaze = lookAt(head, t < 101.7 ? fh : [600, 300]); }
  if (t >= 102.2 && t < 104.3) { P.handLW = [K14M_FATHER_X(t) + 30, 790]; P.gaze = [1, -0.4]; }
  if (t >= 104.98 && t < 106.32) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = [0.2, -1]; P.mouth = 'o'; }
  // the rumble: a fright hop and a clutch in place (no side swap)
  if (t >= 107.36 && t < 109.0) { const [, hy] = hop(t, 107.36, 0.3, 0, 0, 22); P.y = 900 - hy; P.sq = landSquash(t, 107.66); P.mouth = 'o'; P.gaze = lookAt(head, [610, 400]); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
  if (t >= 109.0 && t < 122.32) P.gaze = lookAt(head, t < 113.34 ? [700, 885] : t < 120.92 ? [680, 880] : [620, 880]);
  if (t >= 113.34 && t < 114.2) P.mouth = 'o';
  // نظرت (122.32): snaps to the mouse; أبيها (124.06): turns to her father, brow up, finger back at the mouse
  if (t >= 122.32 && t < 126.74) { P.mouth = 'o'; P.gaze = lookAt(head, [620, 880]); if (t >= 124.06) { P.gaze = lookAt(head, gazePlan(t, [[124.06, [620, 880]], [124.1, fh]], 0.12)); P.brow = -1; P.handR = [70, -150]; P.tilt = -0.06; } }
  // S12
  if (t >= 126.74) { P.gaze = lookAt(head, [606, 870]); }
  if (t >= 132.62 && t < 134.0) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = 'smile'; P.tilt = 0.08; P.drop = 3 * pulse(t, 132.9, 0.4); }
  if (t >= 135.08 && t < 136.12) { P.gaze = lookAt(head, [606, 860]); P.mouth = 'smile'; }
  if (t >= 136.12 && t < 137.2) { P.gaze = [0.05, 1]; P.handL = [-6, -112]; P.handR = [30, -108]; P.mouth = 'o'; P.brow = -1; P.tilt = -0.05; }
  if (t >= 137.2 && t < 139.6) { P.mouth = 'smile'; P.gaze = lookAt(head, [636, 880]); if (t < 137.6) P.gaze = lookAt(head, [640, 860]);
    if (t >= 137.85) { P.kneel = settleTo(t, 137.85, 0, 1, 0.5, 0.06) * (1 - blend(t, 139.2, 139.6, 0, 1)); P.tip = 0.12 * P.kneel; P.gaze = lookAt([P.x, 740], [636, 880]); }
    if (t >= 138.2 && t < 139.2) { P.handRW = [K.lerp(600, 624, K14B(t, 138.2, 0.2, 'out')), 872]; if (t >= 138.5) P.mouth = 'o'; } }
  if (t >= 139.6 && t < 140.4) { P.dir = -1; P.gaze = lookAt(head, [300, 700]); }
  if (t >= 140.4 && t < 141.18) P.gaze = lookAt(head, [606, 860]);
  if (t >= 141.18 && t < 144.22) { P.gaze = lookAt(head, [600, 690]); if (t >= 143.26) { P.handR = [30, -214]; P.brow = -0.8; P.lid = Math.max(pulse(t, 143.5, 0.5), 0); P.tilt = 0.05 * Math.sin(t * 40) * pulse(t, 143.26, 0.4); } }
  // S13
  if (t >= 144.22) { P.gaze = lookAt(head, fh); }
  if (t >= 144.5 && t < 145.14) { P.gaze = [1, -0.3]; P.mouth = 'closed'; }
  if (t >= 145.14 && t < 146.76) { P.mouth = t < 145.5 ? 'closed' : 'smile'; P.lid = Math.max(0.2, blink(t, 51)); P.drop = 3 * blend(t, 145.14, 145.7, 0, 1); P.gaze = lookAt(head, fh); }
  if (t >= 146.76 && t < 152.38) { const k = blend(t, 146.76, 147.3, 0, 1); P.handLW = [K.lerp(P.x - 40, 420, k), K.lerp(810, 780, k)]; P.handRW = [K.lerp(P.x + 40, 424, k), K.lerp(810, 790, k)]; P.gaze = lookAt(head, fh);
    P.talk = talk(t, [[148.88, 150.0], [150.72, 151.3]]); }
  if (t >= 152.38 && t < 155.34) { P.dir = 1; P.talk = talk(t, [[152.38, 154.28]]); P.gaze = lookAt(head, t < 153.64 ? [606, 870] : fh); P.mouth = 'smile';
    if (t >= 153.0 && t < 154.2) { const k = settleTo(t, 153.0, 0, 1, 0.3); P.aR = [K.lerp(0.3, 0.95, k), K.lerp(0.3, 0.75, k)]; }
    if (t >= 153.64) P.dir = -1; }
  if (t >= 155.34) { P.dir = -1; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.lid = 0.7; P.mouth = 'smile'; P.gaze = [-0.2, -1]; }
  return P;
}
function k14mHim(t) {
  const hx = K14M_HIM_X, s = K14_MS, P = { ...walk(hx, t, { stride: GAIT.rat * s }), y: 900, s, who: 'him', dir: -1, t, ears: 0.5, seed: 91 };
  P.lid = blink(t, 91); P.gaze = [-1, -0.2];
  if (t < 113.34) return null;
  if (t < 114.2) { const [x, hy] = hop(t, 113.34, 0.3, 700, 676, 14); P.x = x; P.y = 900 - hy; P.sq = landSquash(t, 113.64); P.sit = blend(t, 113.7, 113.9, 0, 1); P.sniff = 1; P.wave = t > 113.8 ? 1 : 0; return P; }
  if (t < 120.92) return null;
  if (t < 126.74) { const [x, hy] = hop(t, 120.92, 0.28, 636, 606, 14); P.x = x; P.y = 900 - hy; P.sq = landSquash(t, 121.2); P.sit = blend(t, 121.3, 121.5, 0, 1); P.paw = t > 121.4 && t < 121.9 ? 'out' : null; P.gaze = [1, -0.3]; P.drop = t > 121.9 ? -6 * pulse(t, 121.9, 0.5) : 0; P.mouth = 'smile'; return P; }
  // S12 sweeping at his door; the giant's footfalls bounce him
  P.mouth = 'smile';
  if (t < 128.52) { P.broom = 1; P.broomA = 0.35 + 0.35 * Math.sin(t * Math.PI / 0.4); P.gaze = [-0.3, 1]; P.y -= Math.abs(kick(t, k14mFalls(), 3, 11, 9)); }
  if (t >= 127.6 && t < 128.52) { P.gaze = [-1, 0.2]; P.ears = 1; }
  if (t >= 128.52 && t < 129.92) { const up = blend(t, 128.52, 129.0, 0, 1); P.broom = 1; P.broomA = 0.3; P.gaze = [-0.3, -1]; P.drop = -6 * up; P.tip = t < 129.1 ? -0.3 * blend(t, 128.8, 129.1, 0, 1) : -0.3 + 0.3 * K14B(t, 129.5, 0.3); P.y -= rebound(t, 129.1, 6); P.eyes = 'wide'; }
  if (t >= 129.92) { P.sit = 1; P.gaze = lookAt([P.x, 860], [505, 740]); P.paw = t < 130.5 ? 'head' : null; P.broom = t < 133.78 ? 1 : 0; P.broomA = 0.2; }
  if (t >= 132.62 && t < 133.78) P.gaze = [-0.5, -1];
  if (t >= 133.78 && t < 134.3) { P.eyes = 'wide'; P.ears = 1; P.gaze = [-0.4, -1]; }
  if (t >= 134.3 && t < 135.08) { P.paw = 'out'; P.ears = 0; P.brow = -0.5; P.gaze = lookAt([P.x, 860], [505, 740]); }
  // لكنها (135.08): looks up past the father to her, one paw raised toward her
  if (t >= 135.08 && t < 137.2) { P.paw = 'point'; P.gaze = [-0.6, -1]; P.brow = -0.5; P.nod = -0.15; }
  if (t >= 137.2 && t < 137.66) { P.paw = 'door'; P.dir = 1; P.gaze = [1, 0.2]; P.sit = 0.5; }
  if (t >= 137.66 && t < 140.3) { const [x, hy] = t < 140.0 ? hop(t, 137.66, 0.27, 606, 670, 22) : hop(t, 140.0, 0.3, 670, 606, 14); P.x = x; P.y = 900 - hy; P.sq = landSquash(t, t < 140.0 ? 137.93 : 140.3); P.dir = -1; P.sit = t < 137.95 ? 0 : 1; P.gaze = [-1, -0.2]; P.ears = -0.5; P.eyes = 'wide'; if (t >= 138.4 && t < 139.7) P.paw = 'eyes'; }
  if (t >= 140.3 && t < 144.22) { P.sit = 1; P.paw = t < 141.18 ? 'heart' : null; P.lid = 0.15; P.gaze = lookAt([P.x, 860], [K14M_MAID_X(t), 690]); if (t >= 142.46 && t < 143.2) { P.nod = 0.15 * Math.sin((t - 142.46) * 25); P.lid = 1; } }
  if (t >= 144.22 && t < 153.64) { P.sit = 1; P.gaze = lookAt([P.x, 860], [K14M_MAID_X(t), 690]); if (t >= 146.06 && t < 146.8) { P.nod = -0.2; P.paw = 'out'; P.ears = 0.2; } }
  if (t >= 153.64 && t < 156.32) { P.sit = 1; P.paw = 'self'; P.ears = 1; P.blush = 1; P.tailCurl = 1; P.tailUp = 1; P.sq = 1 + 0.12 * settleTo(t, 153.64, 0, 1, 0.3) * (1 - blend(t, 154.6, 155.0, 0, 1)); P.x += tremble(t, 0.6 * (t > 154.0 ? 1 : 0), 12); P.eyes = 'wide'; P.gaze = [-0.6, -1]; }
  if (t >= 156.32 && t < 159.22) { P.sit = t < 158.3 ? 1 : 0.4; P.gaze = lookAt([P.x, 870], [K14M_HER_X(t), 880]); P.eyes = t < 157.46 ? 'wide' : 'open'; }
  if (t >= 158.3 && t < 159.22) { P.ears = -0.5; P.blush = 1; P.mouth = 'smile'; P.nod = 0.12 * pulse(t, 158.4, 0.4); }
  // S14: steps aside and bows her in, then follows her inside
  if (t >= 159.22) { P.gaze = lookAt([P.x, 870], [K14M_HER_X(t), 880]); P.blush = 0.6; P.sit = 0; }
  if (t >= 159.22 && t < 159.7) P.dir = 1;
  if (t >= 159.7 && t < 160.4) { P.dir = -1; P.paw = 'door'; P.tip = 0.35 * K14B(t, 159.75, 0.25) * (1 - K14B(t, 160.2, 0.2)); }
  if (t >= 160.4 && t < 161.35) { P.dir = -1; P.sit = 0.6; P.paw = t >= 160.5 && t < 161.1 ? 'out' : null; }
  if (t >= 161.35) { P.dir = -1; const k = K.clamp((t - 161.48) / 0.16); if (k >= 1) return null; P.dark = k; }
  return P;
}
function k14mHer(t) {
  if (t < 157.46) return null;
  const hx = K14M_HER_X, s = K14_MS * 0.94, P = { ...walk(hx, t, { stride: GAIT.rat * s }), y: 897, s, who: 'her', dir: 1, t, bow: true, ears: 0.6, seed: 93 };
  P.lid = blink(t, 93);
  if (t < 158.3) { P.sit = 1; P.paw = 'self'; P.gaze = [0.2, 1]; P.lid = Math.max(pulse(t, 157.6, 0.3), pulse(t, 157.95, 0.3)); if (t > 158.0) { P.twitch = t; P.gaze = [1, -0.2]; P.paw = null; } }
  if (t >= 158.3 && t < 159.22) { P.sit = 0.4; P.gaze = [1, 0]; P.mouth = 'smile'; P.tailUp = 1; }
  if (t >= 159.22) { P.y = 900; P.tailUp = 1; P.gaze = [1, 0]; P.mouth = 'smile'; }
  if (t >= 160.34 && t < 161.1) { P.dir = -1; P.sit = settleTo(t, 160.34, 0, 1, 0.2); P.wave = t > 160.42 ? 1 : 0; P.gaze = lookAt([606, 860], [460, 760]); }
  if (t >= 161.1) { P.dir = 1; const k = K.clamp((t - 161.3) / 0.18); if (k >= 1) return null; P.dark = k; P.tailUp = 0.3; }
  return P;
}
// a mouse going into the dark doorway: darkens and fades from the head first (dark 0..1)
function k14mInDoor(ctx, P) {
  if (!P.dark) { k14Mouse(ctx, P); return; }
  const dx = K14M_DOOR[0], d = P.dark, edge = P.dir > 0 ? K.lerp(dx + 30, dx - 26, d) : K.lerp(dx - 30, dx + 26, d);
  ctx.save(); ctx.beginPath(); if (P.dir > 0) ctx.rect(edge - 4000, -4000, 4000, 8000); else ctx.rect(edge, -4000, 4000, 8000); ctx.clip();
  ctx.filter = `brightness(${1 - 0.6 * d})`; k14Mouse(ctx, P); ctx.restore();
}
let K14M_FALLS = null; function k14mFalls() { if (!K14M_FALLS) K14M_FALLS = footfalls(K14M_FATHER_X, 127.28, 128.4, 20); return K14M_FALLS; }
function k14mScarf(ctx, t) {
  if (t < 156.5) return;
  if (t < 161.8) { const y = Math.min(898, K.lerp(780, 898, K.ease.out(K.clamp((t - 156.5) / 0.95)))); scarfCloth(ctx, 545, y, 0.95, 0, y < 898 ? 0.3 * Math.sin(t * 6) : 0, y < 898 ? Math.sin(t * 10) : 0); return; }
  const F = k14mFather(t);
  if (t < 162.05) { scarfCloth(ctx, 545, K.lerp(898, 880, K.clamp((t - 161.9) / 0.15)), 0.95, 0, 0); return; }
  const kn = K.clamp(F.kneel || 0), fold = K14B(t, 162.05, 0.45, 'inOut'), cy = F.y - (125 - 26 * kn) * 0.95;
  scarfCloth(ctx, F.x + 8 * (F.dir || 1), cy, 0.95, fold, 0.1, 0);
}
const K14M_T3 = { x: 515, y: 754, zoom: 3.2 };
const K14_MOUNT = {
  a: 100.32, b: 168.0, bounds: [-110, 1110, -270, 1230],
  cam: [[100.32, { x: 210, y: 740, zoom: 1.7 }], [102.2, { x: 230, y: 740, zoom: 1.7 }], [104.46, { x: 420, y: 620, zoom: 1.05 }], [105.6, { x: 500, y: 480, zoom: 0.82 }], [106.32, { x: 500, y: 480, zoom: 0.82 }],
    [106.33, { x: 560, y: 520, zoom: 0.9 }], [109.06, { x: 560, y: 520, zoom: 0.9 }], [110.3, { x: 680, y: 846, zoom: 4.0 }], [119.7, { x: 680, y: 846, zoom: 4.0 }], [120.4, { x: 600, y: 695, zoom: 1.15 }], [120.92, { x: 600, y: 695, zoom: 1.15 }],
    [121.3, { x: 625, y: 805, zoom: 2.6 }], [122.3, { x: 625, y: 805, zoom: 2.6 }], [123.0, { x: 330, y: 730, zoom: 2.0 }], [126.73, { x: 330, y: 730, zoom: 2.0 }],
    // S12: mouse level (zoom 6), tilt up as he kneels, tilt up her height to the three-shot, back to mouse level, three-shot for HUMAN
    [126.74, { x: 565, y: 832, zoom: 6 }], [129.92, { x: 565, y: 832, zoom: 6 }], [130.4, { x: 552, y: 806, zoom: 6 }], [132.62, { x: 552, y: 806, zoom: 6 }], [133.3, K14M_T3], [133.77, K14M_T3],
    [133.78, { x: 560, y: 822, zoom: 5.5 }], [135.08, { x: 560, y: 822, zoom: 5.5 }], [135.45, K14M_T3], [137.59, K14M_T3], [137.6, { x: 598, y: 842, zoom: 5.5 }], [139.59, { x: 598, y: 842, zoom: 5.5 }], [139.6, K14M_T3], [144.22, K14M_T3],
    // S13
    [144.9, { x: 500, y: 722, zoom: 3.0 }], [146.76, { x: 500, y: 722, zoom: 3.0 }], [147.4, { x: 472, y: 754, zoom: 3.0 }], [152.38, { x: 472, y: 754, zoom: 3.0 }], [153.0, { x: 520, y: 754, zoom: 3.0 }], [155.3, { x: 520, y: 754, zoom: 3.0 }],
    [155.8, { x: 520, y: 730, zoom: 2.8 }], [157.4, { x: 520, y: 730, zoom: 2.8 }], [158.0, { x: 545, y: 778, zoom: 3.4 }], [159.22, { x: 545, y: 778, zoom: 3.4 }],
    // S14
    [159.8, { x: 553, y: 790, zoom: 3.3 }], [162.98, { x: 553, y: 790, zoom: 3.3 }], [164.6, { x: 500, y: 480, zoom: 0.82 }], [168.0, { x: 500, y: 480, zoom: 0.82 }]],
  draw(ctx, t) {
    ctx.drawImage(K14M_bake(), -110, -270, 1220, 1500);
    // the sky cast looking down at the little lit door (cloud left, wind between cloud and mountain, sun right); staggered blinks
    if (t >= 162.3) { const d = K14M_DOOR, wy = 470 + 8 * Math.sin(t * 1.3);
      sunFace(ctx, 950, 95, 78, t, { gaze: lookAt([950, 95], d), lidL: Math.max(0.2, blink(t, 61)), lidR: Math.max(0.2, blink(t, 61)), mouth: 'smile' });
      cloudFace(ctx, 115 + 8 * Math.sin(t * 0.6), 215, 1.3, t, { gaze: lookAt([115, 215], d), lid: Math.max(0.3, blink(t, 65)), mouth: 'smile' });
      windSpirit(ctx, 225, wy, 1.0, t, { dir: 1, gaze: lookAt([225, wy], d), lid: Math.max(0.25, blink(t, 71)), mouth: 'smile', stretch: 0.55 }); }
    mountainMassif(ctx, t, k14mMtn(t));
    // pebbles skitter on the wake-up rumble
    if (t >= 106.32 && t < 108.0) for (let i = 0; i < 5; i++) { const r = K.rng(700 + i), x0 = 300 + r() * 600, d = t - 106.32 - r() * 0.4; if (d > 0) { const y = Math.min(900, 400 + r() * 200 + 300 * d * d + 80 * d); shape(ctx, ell(x0 + 40 * d, y, 7, 6, 8), K14_ROCKL, { lw: 3, seed: 710 + i }); } }
    // boulder: plugs hole A (120.5) and stays there
    const Bo = K14M_BOULDER(t); if (Bo) { mountainBoulder(ctx, Bo.x, Bo.y, 22, Bo.rot, Bo.sq); if (t >= 120.5 && t < 121.3) dustBurst(ctx, 700, 895, t - 120.5, 6, 6, 12, 40, 0.8, 72); }
    if (t >= 120.92 && t < 121.5) for (let i = 0; i < 4; i++) { const d = t - 120.92, a = -0.5 - i * 0.7; shape(ctx, ell(636 + Math.cos(a) * 60 * d, 878 + Math.sin(a) * 60 * d + 120 * d * d, 3.5, 3, 8), K14_ROCKL, { lw: 2, seed: 720 + i }); }
    if (t >= 121.0 && t < 122.2) { const d = t - 121.0; ctx.save(); ctx.globalAlpha = 0.7 * (1 - d / 1.2); shape(ctx, ell(610 - 30 * d, 560 + 20 * d, 40 + 40 * d, 24 + 20 * d, 18), '#c9c4d6', { lw: 0 }); ctx.restore(); }
    // glints in the hole
    if (t >= 111.78 && t < 113.34) { const b = Math.max(blink(t, 95), 0) > 0.5; if (!b) for (const dx of [-4, 4]) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(K14_HOLE_A[0] + dx, K14_HOLE_A[1] - 4, 2.2, 0, 7); ctx.fill(); } if (t >= 112.6) { ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 1.2; for (const a of [-0.2, 0.2]) { ctx.beginPath(); ctx.moveTo(K14_HOLE_A[0] - 6, K14_HOLE_A[1]); ctx.lineTo(K14_HOLE_A[0] - 17, K14_HOLE_A[1] + a * 14); ctx.stroke(); } ctx.restore(); } }
    // her shadow on the rock (144.5-147): head and two buns = a mouse
    if (t >= 144.5 && t < 147.2) { const a = 0.35 * K14B(t, 144.5, 0.4) * (1 - K14B(t, 146.7, 0.5)), mx = K14M_MAID_X(t); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = K14_HOLE;
      const sx = mx + 170, sy = 590; ctx.beginPath(); ctx.ellipse(sx, sy, 40, 44, 0, 0, 7); ctx.ellipse(sx - 36, sy - 40, 24, 24, 0, 0, 7); ctx.ellipse(sx + 36, sy - 40, 24, 24, 0, 0, 7); ctx.ellipse(sx, sy + 120, 50, 90, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(sx + 10, sy + 40); ctx.lineTo(sx, sy + 58); ctx.lineTo(sx - 10, sy + 40); ctx.fill(); ctx.restore(); }
    // cast: she stands behind the kneeling father (depth), so she is drawn first
    const F = k14mFather(t), M = k14mMaiden(t);
    const lightA = 0.45 * K14B(t, 155.6, 0.5) * (1 - K14B(t, 157.0, 0.6)); skyLight(ctx, 545, -270, 910, 300, lightA);
    // her sandal sole under her near foot as she steps in beside the door (137.6-139.6): about twice the door's width
        if (t < 156.32) person(ctx, M);
    else if (t < 157.1) { const d = t - 156.32; ctx.save(); ctx.filter = 'brightness(0)'; person(ctx, { ...M, sq: K.lerp(1, 0.25, K.clamp(d / 0.7)), alpha: 1 - K.clamp((d - 0.5) / 0.2) }); ctx.restore(); }
    if (t >= 137.6 && t < 139.6) k14Sole(ctx, M.x + 22 - 22 * K.clamp(M.kneel || 0), 903, 1.05);
    if (t >= 137.78 && t < 138.4) dustBurst(ctx, M.x + 50, 898, t - 137.78, 5, 4, 8, 22, 0.6, 77);
    person(ctx, F);
    // the giant's footfalls: dust puffs at his feet (127.28-128.4)
    if (t >= 127.28 && t < 129.2) for (const f of k14mFalls()) dustBurst(ctx, f.x + (f.odd ? 18 : -6), 899, t - f.t, 5, 2.5, 5, 16, 0.5, 80 + Math.round(f.t * 10) % 30);
    // one tear on جديد (158.50)
    if (t >= 158.5 && t < 159.3) { const d = t - 158.5, h = k14mHead(F); ctx.save(); ctx.globalAlpha = 1 - K.clamp((d - 0.55) / 0.25); shape(ctx, [[h[0] + 16, h[1] + 4 + 40 * d * d + 6 * d], [h[0] + 12, h[1] + 12 + 40 * d * d + 6 * d], [h[0] + 16, h[1] + 16 + 40 * d * d + 6 * d], [h[0] + 20, h[1] + 12 + 40 * d * d + 6 * d]], '#9cc4ff', { lw: 2.5, seed: 790 }); ctx.restore(); }
    k14mScarf(ctx, t);
    const H = k14mHim(t); if (H) k14mInDoor(ctx, H);
    const R = k14mHer(t); if (R) k14mInDoor(ctx, R);
    // tail flick at the door (2 frames) after both are inside
    if (t >= 161.65 && t < 161.72) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(K14M_DOOR[0] + 4, 896); ctx.quadraticCurveTo(K14M_DOOR[0] - 10, 886, K14M_DOOR[0] - 4, 876); ctx.stroke(); ctx.strokeStyle = '#f4a8b4'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    if (t >= 158.5 && t < 159.6) heart(ctx, 576, 852 - 26 * K14B(t, 158.5, 1.0), 8 * K.ease.back(K14B(t, 158.5, 0.3)));
    if (t >= 156.32) poofBurst(ctx, 545, 800, t - 156.32, 112, 5);   // v2: same burst as 23.2, sized to match its screen size
    if (t >= 129.1 && t < 129.7) for (let i = 0; i < 3; i++) { const a = (t - 129.1) * 8 + i * 2.1; star(ctx, 606 + Math.cos(a) * 12, 852 + Math.sin(a) * 4, 3, C.yellow, a); }
    // broom drop (133.78)
    if (t >= 133.78 && t < 144.22) { const y = Math.min(897, fallY(t, 133.78, 134.0, 875, 897)) - rebound(t, 134.0, 3); ctx.save(); ctx.translate(590, y); ctx.rotate(t < 134.0 ? 1.0 : 0.08); seg(ctx, -12, 0, 12, 0, 1.6, '#a8741a', 0.8); ctx.restore(); }
  },
  over(ctx, t, cam, S) {
    k14Sfx(ctx, cam, 260, 580, 'THAT ONE!', t, 101.5, 1.2, 70, { rot: -0.08 });
    k14Label(ctx, S, cam, 600, 300, 'THE GREAT MOUNTAIN', t, 104.98, 106.3, { size: 44 });
    k14Arrow(ctx, S, cam, [640, 790], [696, 862], t, 109.68, 111.6, { width: 12 }); k14Label(ctx, S, cam, 630, 770, 'SMALL...', t, 109.68, 111.6, { size: 34 });
    k14Sfx(ctx, cam, 660, 815, 'SQUEAK!', t, 113.4, 1.0, 52, { rot: -0.08 });
    k14Sfx(ctx, cam, 600, 830, 'POP!', t, 121.0, 0.9, 52, { rot: 0.08 });
    if (t >= 124.74 && t < 126.6) k14Sfx(ctx, cam, 300, 600, '!', t, 124.8, 1.8, 110, { fill: C.red });
    // the question balloon: two rings and a question mark (131.8), drawn in panel space
    if (t >= 131.8 && t < 133.4) { const k = K14B(t, 131.8, 0.3), [bx, by] = k14P(585, 770, cam), [tx, ty] = k14P(532, 760, cam); bubble(ctx, bx, by, 260, 180, tx, ty, k, '');
      if (k > 0.6) { ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; for (const dx of [-62, -26]) { ctx.beginPath(); ctx.arc(bx + dx, by + 4, 22, 0, 7); ctx.stroke(); } ctx.font = K.font(92, BF, 400); ctx.fillStyle = C.red; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', bx + 52, by + 6); ctx.restore(); } }
    // her height bracket (132.62-133.78)
    if (t >= 132.62 && t < 133.78) { const k = K14B(t, 132.85, 0.4, 'out'), [x, y0] = k14P(368, 900, cam), y1 = K.lerp(y0, k14P(368, 650, cam)[1], k); ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); for (const yy of [y0, y1]) { ctx.beginPath(); ctx.moveTo(x - 14, yy); ctx.lineTo(x + 14, yy); ctx.stroke(); } ctx.restore(); }
    k14Label(ctx, S, cam, 455, 612, 'A BIT TALL', t, 132.9, 133.78, { size: 38 });
    // HUMAN on her (136.12): label beside her, arrow tip on her head
    k14Arrow(ctx, S, cam, [398, 634], [414, 659], t, 136.12, 137.2, { width: 14 }); k14Label(ctx, S, cam, 395, 622, 'HUMAN', t, 136.12, 137.2, { size: 38 });
    k14Arrow(ctx, S, cam, [636, 806], [637, 860], t, 137.2, 137.6, { width: 14 }); k14Label(ctx, S, cam, 610, 790, 'MY HOME', t, 137.2, 137.6, { size: 38 });
    k14Sfx(ctx, cam, 655, 810, 'BONK!', t, 138.5, 0.9, 64, { rot: -0.1 });
    k14Sfx(ctx, cam, 640, 800, 'ME?!', t, 153.7, 1.3, 60, { rot: 0.06 });
    k14Sfx(ctx, cam, 600, 650, 'POOF!', t, 156.4, 1.1, 90, { rot: -0.08 });
    // the mouse's thought: A MOUSE LIKE ME; on إنسانة the maiden's own head with a red no-entry bar (panel space)
    { const p = K14B(t, 141.18, 0.5) * (1 - K14B(t, 144.0, 0.3)); if (p > 0) { const [cx, cy] = k14P(596, 668, cam); thoughtCloud(ctx, cx, cy, 400, 300, t, { p, tail: k14P(602, 846, cam), lw: 7, bg: C.yellow, scale: 0.3, at: [500, 760], inside: (c) => {
        k14Mouse(c, { x: 330, y: 900, s: 2.2, who: 'him', dir: 1, t, sit: 1, mouth: 'smile' });
        if (t < 143.26) { k14Mouse(c, { x: 690, y: 900, s: 2.1, who: 'her', dir: -1, t, sit: 1, bow: true, mouth: 'smile' }); heart(c, 505, 640, 56); }
        else { const k = K.ease.back(K14B(t, 143.26, 0.35)); c.save(); c.translate(690, 760); c.scale(k, k); c.beginPath(); c.arc(0, 0, 175, 0, 7); c.save(); c.clip(); c.fillStyle = C.white; c.fillRect(-200, -200, 400, 400);
          person(c, { x: 0, y: 2.1 * 199 + 30, s: 2.1, costume: 'maiden', mouth: 'smile', gaze: [-0.2, 0], seed: 51 }); c.restore();
          c.lineWidth = 30; c.strokeStyle = C.red; c.beginPath(); c.arc(0, 0, 175, 0, 7); c.stroke(); c.beginPath(); c.moveTo(-124, -124); c.lineTo(124, 124); c.stroke(); c.restore(); }
      } }); } }
    k14Label(ctx, S, cam, 618, 775, 'A MOUSE LIKE ME', t, 141.3, 143.2, { size: 32 });
    // the memory: the little mouse on his cupped palms (150.0-152.3)
    { const p = K14B(t, 150.0, 0.5) * (1 - K14B(t, 152.3, 0.3)); if (p > 0) { const [cx, cy] = k14P(452, 598, cam); thoughtCloud(ctx, cx, cy, 360, 230, t, { p, tail: k14P(424, 652, cam), lw: 7, bg: C.yellow, scale: 0.26, at: [500, 790], inside: (c) => {
        for (const sd of [-1, 1]) shape(c, ell(500 + sd * 90, 860, 120, 50, 20), C.white, { lw: 10, seed: 740 + sd, dot: C.skin, pitch: 12, rad: 0.3 });
        k14Mouse(c, { x: 480, y: 830, s: 2.6, who: 'her', dir: -1, t, sit: 0.4, ears: 0.3, lid: 0.3 });
      } }); } }
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
    // cutaway: her fingertip knocks over the tiny bed (138.4-139.4), top left, clear of both faces
    if (t >= 138.4 && t < 139.4) { const k = K.ease.back(K14B(t, 138.4, 0.2)) * (1 - K14B(t, 139.15, 0.25)), cx = 215, cy = 225, r = 150 * k; if (r > 4) {
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#4a4656'; ctx.fill(); ctx.clip(); shape(ctx, ell(cx, cy + 20, 135, 90, 24), '#2a2632', { lw: 0 });
      const fx = K.lerp(cx + 200, cx + 36, K14B(t, 138.45, 0.25, 'out')); shape(ctx, [[cx + 280, cy - 28], [fx + 28, cy - 28], [fx, cy - 9], [fx, cy + 18], [fx + 28, cy + 30], [cx + 280, cy + 30]], C.white, { lw: 6, seed: 770, dot: C.skin, pitch: 8, rad: 0.3 });
      mouseRoomProps(ctx, cx - 36, cy + 72, 2.0, 1, 1, 1, -1.2 * K14B(t, 138.65, 0.2, 'out'));
      ctx.restore(); ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore(); } }
  },
};
// her sandal seen from the side: a long flat sole with a toe strap (drawn under her foot, story-local)
function k14Sole(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-34, 0], [-38, -5], [-32, -9], [36, -9], [44, -5], [40, 0]], '#7a4212', { lw: 3.5, seed: 241 }); shape(ctx, [[-30, -9], [34, -9], [38, -6], [-34, -6]], '#c8925a', { lw: 0, seed: 242 });
  ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(8, -9); ctx.quadraticCurveTo(22, -26, 34, -9); ctx.stroke(); ctx.strokeStyle = '#a8741a'; ctx.lineWidth = 4.5; ctx.stroke(); ctx.restore(); }
