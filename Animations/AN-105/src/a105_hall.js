// ===== AN-105 the police hall (S3, S5-S9, S14-S16, S19, S20, S22): every person in the hall as a function of t =====
// palaceHall: door arch x 40..250 (left), low table x 560..740 (top 852), dais 760..990 (top 860) with the chief's cushion at x 870.
// Upstage row y 868 (the four guests), downstage line y 925-930 (soldier, sharper). The purse sits on the table at A105_PURSE from 59.2 to 130.82.
const A105_CHX = 880, A105_CHY = 882, A105_DAIS = [790, 995, 860];
const A105_GX = [270, 355, 440, 525], A105_GY = 868;
const A105_PURSE = [700, 852];
const A105_BUNDLE = [330, 925];
const a105Night = (t) => t < 26;          // the night visit (S3)

// ---------- the chief ----------
function a105ChiefP(t) {
  const P = a105Mk('chief', { x: A105_CHX, y: A105_CHY, dir: -1, sit: 1, seat: 'bench', lid: 0.35, brow: 0.3, mouth: 'closed' });
  // S3 night: dozing, jolt, listen, test the slit, stand, point
  if (t < 26) {
    if (t < 19.78) { P.lid = 1; P.drop = 6 + 2 * Math.sin(t * 2.5); P.handR = PERSON_HANDS.chin.R; P.tilt = 0.1; P.noBlink = true; }
    else { const j = a105E(t, 19.78, 0.15); P.lid = K.lerp(0.9, 0, j); P.sq = 1 + 0.06 * pulse(t, 19.78, 0.25); P.tilt = swing(t, 19.9, 0.16, 2, 3); P.brow = t < 20.4 ? -0.6 : 0.5;
      P.handR = a105Tr(t, [[19.9, 20.6, [30, -228]]], null); }
    if (a105In(t, 22.16, 26)) P.brow = 0.4;
    if (a105In(t, 23.16, 23.9)) { P.brow = 1; P.look = 0.6 * Math.sin((t - 23.16) * 14) * a105Env(t, 23.3, 23.9, 0.15); P.tip = 0.12 * a105Env(t, 23.16, 23.9, 0.2); }
    if (t >= 23.8) { P.sq = anticipate(t, 23.8, 0.2, 0.06); P.sit = 1 - a105E(t, 24.0, 0.3); P.y = K.lerp(A105_CHY, 862, a105E(t, 24.0, 0.3)); }
    if (a105In(t, 24.1, 25.1)) { P.handR = [36, -128]; P.handL = [-8, -126]; P.brow = 1; P.sq = (P.sq || 1) * (1 + 0.03 * pulse(t, 24.25, 0.15)); }
    if (t >= 25.16) { P.handR = PERSON_HANDS.pointFwd.R; P.tip = 0.08 * a105E(t, 25.16, 0.2); P.mouth = 'open'; P.talk = a105Talk(t, [[25.16, 25.9]], 1); P.brow = 1; }
    return P;
  }
  // S5-S9 day
  if (a105In(t, 37.9, 38.7)) { const u = a105B(t, 37.9, 0.7); P.handR = [100, -150 + 20 * u]; P.lid = 0.45; P.drop = -3; }
  if (a105In(t, 59.96, 61.1)) { P.tip = 0.08 * a105Env(t, 59.96, 61.1, 0.25); P.handL = [-6 + 5 * Math.sin(t * 9), -158]; P.lid = 0.3; }
  if (a105In(t, 61.16, 62.4)) { P.handR = a105Tr(t, [[61.16, 62.4, [100, -168]]], null); P.brow = 0.6; P.tip = 0.05; }
  if (a105In(t, 67.3, 68.1)) { P.drop = 5 * pulse(t, 67.3, 0.5); P.lid = 0.3; const c = a105Env(t, 67.55, 67.95, 0.12); P.handR = a105L2([55, -110], [22, -130], c); P.handL = a105L2([-45, -110], [-6, -130], c); P.mouth = 'smile'; }
  if (a105In(t, 79.06, 80.1)) { P.brow = -0.3; P.lid = 0; }
  if (a105In(t, 80.12, 82.1)) { P.sit = 1 - 0.6 * a105Env(t, 80.12, 82.7, 0.3); P.tilt = 0.18 * a105Env(t, 80.3, 81.0, 0.15) + swing(t, 81.0, 0.06, 2, 3); P.handR = a105Tr(t, [[80.6, 81.2, [34, -232]]], null); P.brow = -0.5; }
  if (a105In(t, 81.34, 82.8)) { P.eyes = 'wide'; P.brow = -0.7; P.mouth = 'o'; P.noBlink = true; P.lid = 0; P.sit = 0.4; }
  if (a105In(t, 82.18, 84.4)) { P.handR = PERSON_HANDS.palmsUp.R; P.handL = PERSON_HANDS.palmsUp.L; P.sq = 1 + 0.04 * pulse(t, 82.18, 0.4); P.sit = K.lerp(0.4, 1, a105E(t, 83.6, 0.5)); P.brow = -0.4; }
  if (a105In(t, 82.76, 88.3)) P.tip = 0.08 * a105E(t, 82.8, 0.4);
  if (a105In(t, 84.4, 88.3)) { P.handL = PERSON_HANDS.chin.R.map((v, i) => (i ? v + 6 : -v)); P.lid = 0.2; P.brow = -0.2; }
  if (a105In(t, 115, 123.5)) { P.lid = 0.15; P.mouth = 'o'; P.brow = -0.3; P.tip = 0.06; }
  if (a105In(t, 118.7, 119.5)) P.handL = [-6 + 6 * Math.sin(t * 10), -156];
  if (a105In(t, 120.2, 121.0)) { P.handR = [70 + 14 * Math.sin((t - 120.2) * 16), -150]; P.lid = 0.4; P.mouth = 'smile'; }
  // S15-S16: steps down to the dais edge and bends over the table; topples
  if (a105In(t, 124.56, 135.4)) {
    const xf = (tt) => kfn(tt, [[124.56, A105_CHX], [125.3, 830]]); Object.assign(P, a105Walk(xf, t, 22)); P.sit = 1 - a105E(t, 124.56, 0.3); P.y = K.lerp(A105_CHY, 862, a105E(t, 124.56, 0.3));
    P.tip = 0.15 * a105E(t, 125.0, 0.6); P.lid = 0; P.brow = -0.3; P.handL = PERSON_HANDS.chin.R.map((v, i) => (i ? v : -v));
    if (t >= 129.8 && t < 130.82) { P.mouth = 'smile'; P.lid = 0.3; }
    if (t >= 130.82) { P.tip = 0.15 - 0.2 * a105E(t, 130.82, 0.2); P.eyes = 'wide'; P.mouth = 'o'; P.brow = -0.8; P.handL = null; P.noBlink = true; }
    if (t >= 134.12) { P.tip = K.lerp(-0.05, 0.4, a105E(t, 134.12, 0.25, 'in')); P.sit = a105E(t, 134.3, 0.1); P.seat = 'floor'; if (t > 134.37) { P.tip = 0.25; P.sq = landSquash(t, 134.37, 0.15); } }
    return P;
  }
  // S19 the ruling
  if (a105In(t, 152.84, 165.7)) {
    P.tilt = 0.14 * (1 - a105E(t, 152.9, 0.6)); P.handR = a105Tr(t, [[152.84, 153.4, [30, -230], 0.12], [153.4, 153.9, PERSON_HANDS.chin.R, 0.12],
      [154.98, 156.5, PERSON_HANDS.pointUp.R], [159.22, 159.9, [74, -176], 0.12], [161.26, 162.1, (tt) => [100, -150 + 50 * a105B(tt, 161.3, 0.7)]], [162.9, 163.25, PERSON_HANDS.folded.R, 0.1], [163.25, 163.7, PERSON_HANDS.palmsUp.R, 0.1],
      [165.0, 165.7, (tt) => (tt < 165.5 ? [96, -150 + 140 * a105E(tt, 165.15, 0.35, 'in')] : [96, -10])]], null);
    P.handL = a105Tr(t, [[162.9, 163.25, PERSON_HANDS.folded.L, 0.1], [163.25, 163.7, PERSON_HANDS.palmsUp.L, 0.1]], null);
    P.drop = -3; P.lid = 0.4; P.brow = 0.4; if (a105In(t, 153.2, 153.6)) P.lid = 1;
    P.talk = a105Talk(t, [[154.98, 156.5], [157.0, 158.6], [159.22, 159.8], [161.3, 162.1]], 0.6);
    if (a105In(t, 162.9, 163.7)) { P.lid = 1; P.look = 0.5 * Math.sin((t - 162.9) * 12); }
    if (a105In(t, 163.7, 164.7)) { P.gaze = [0.1, -1]; P.lid = 0.3; }
    if (t >= 165.0) { P.tip = 0.22 * a105Env(t, 165.0, 165.75, 0.2); P.brow = 0.8; }
    if (t >= 165.5) P.sq = landSquash(t, 165.5, 0.05);
  }
  if (a105In(t, 165.7, 171.3)) { P.brow = 0.5; P.lid = 0.3; }
  // S22 alone at dusk
  if (t >= 173.7) {
    P.lid = 0.4; P.drop = 7; P.sq = 0.96; P.brow = -0.2; P.mouth = 'frown';
    if (t >= 175.72) { P.flush = a105E(t, 175.72, 0.8); P.brow = 0.8; P.drop = 4; P.sq = 1 + 0.03 * Math.sin(t * 20) * a105Env(t, 175.8, 177.2, 0.2); }
    if (t >= 177.34) { P.handR = PERSON_HANDS.headHold.R; P.handL = PERSON_HANDS.headHold.L; P.sq = K.lerp(0.98, 0.9, a105E(t, 177.4, 0.6)); P.drop = 10 * a105E(t, 177.4, 0.6); P.cover = a105E(t, 177.4, 0.5); }
    if (t >= 178.0) { P.handR = [36, -120]; P.handL = [-30, -118]; }
    if (t >= 179.6) P.peek = a105Env(t, 179.6, 180.2, 0.08);
  }
  return P;
}
// gaze plan for the chief (world points), set after everyone's head is known
function a105ChiefGaze(t, P, H) {
  const h = a105Head(P);
  if (t < 26) { P.gaze = gazePlan(t, [[19.78, [-0.2, -0.9]], [20.0, lookAt(h, H.so)], [21.0, lookAt(h, [480, 300])], [21.5, lookAt(h, H.so)], [25.16, [-1, 0]]]); return; }
  if (t >= 173.7) { P.gaze = gazePlan(t, [[173.7, [-0.4, 0.8]], [174.96, lookAt(h, A105_PURSE)], [175.25, lookAt(h, [150, 760])], [175.55, [0, 0.05]], [176.6, [-0.5, 0.6]]], 0.08); return; }
  const plan = [[33.2, lookAt(h, [420, 760])], [36.0, lookAt(h, A105_BUNDLE)], [36.6, lookAt(h, [420, 760])], [37.9, lookAt(h, [300, 730])], [38.6, lookAt(h, [530, 730])], [40.2, lookAt(h, H.so)],
    [45.0, lookAt(h, [300, 560])], [50.9, lookAt(h, H.sh)], [57.9, lookAt(h, A105_PURSE)], [61.16, lookAt(h, H.so)], [62.4, lookAt(h, A105_PURSE)], [66.3, lookAt(h, H.sh)],
    [79.06, lookAt(h, A105_PURSE)], [79.36, lookAt(h, H.sh)], [79.66, lookAt(h, A105_PURSE)], [79.96, lookAt(h, H.sh)],
    [115, lookAt(h, H.sh)], [116.68, lookAt(h, H.sh)], [126.2, lookAt(h, H.pu)], [131, lookAt(h, H.sh)], [134.1, [-0.6, 0.6]],
    [152.84, lookAt(h, H.so)], [156.0, [0.1, -0.6]], [157.0, lookAt(h, H.so)], [161.26, lookAt(h, [400, 720])], [162.2, lookAt(h, H.so)], [165.7, lookAt(h, H.so)], [167.5, lookAt(h, [150, 760])]];
  P.gaze = P.gaze || gazePlan(t, plan, t > 79 && t < 80.2 ? 0.07 : 0.2);
}

// ---------- the soldier in the hall ----------
const a105SoX3 = (t) => (t < 20.9 ? kfn(t, [[18.76, 30], [19.55, 430]], 'out') : kfn(t, [[20.9, 430], [21.8, 680]]));
const a105SoX7 = (t) => kfn(t, [[61.16, 160], [61.85, 620], [62.3, 620], [62.9, 300]]);
const a105SoX20 = (t) => kfn(t, [[165.84, 600], [167.0, 150], [168.4, 150], [169.3, -60]], 'lin');
function a105SoldierHallP(t) {
  const bag = { bulge: 0, slit: 1 };
  const P = a105Mk('soldier', { x: 160, y: 935, dir: 1, brow: 0.2, mouth: 'closed', bag });
  if (t < 26) {
    Object.assign(P, a105Walk(a105SoX3, t, 30)); P.brow = -0.6; P.wet = t > 22; P.mouth = 'open';
    if (t < 19.6) { P.tip = 0.12 * P.amp; P.amp = Math.min(1, P.amp * 1.4); }
    if (a105In(t, 19.55, 20.2)) { P.tip = 0.1 * pulse(t, 19.55, 0.4); P.sq = 1 + 0.04 * Math.sin((t - 19.55) * 18); }
    if (a105In(t, 19.6, 22.1)) P.sq = (P.sq || 1) * (1 + 0.02 * Math.sin(t * 16));
    if (a105In(t, 22.1, 23.85)) { P.handRW = [P.x + 82, 770]; P.handL = PERSON_HANDS.palmsUp.L; P.talk = a105Talk(t, [[22.16, 23.1]], 0.9); P.brow = -0.7; P.bag = { ...bag, hand: [P.x + 82, 770] }; P.mouth = 'closed'; }
    if (t >= 23.85) { P.mouth = 'o'; P.brow = -0.3; }
    if (t >= 24.6) { P.dir = 1; }
    return P;
  }
  // S5-S9
  P.handR = a105Tr(t, [[33.2, 43.2, PERSON_HANDS.folded.R], [43.4, 44.4, (tt) => [16 + 8 * Math.sin(tt * 22), -128]], [82.8, 84.3, [34, -236]]], null);
  P.handL = a105Tr(t, [[33.2, 43.2, PERSON_HANDS.folded.L], [43.4, 44.4, (tt) => [-10 - 8 * Math.sin(tt * 22), -124]]], null);
  if (a105In(t, 41.22, 42.3)) { P.ph = Math.PI / 2; P.amp = 0.12 * Math.max(0, Math.sin((t - 41.22) * Math.PI / 0.4)); P.lid = 0.3; }
  if (a105In(t, 42.38, 43.3)) { P.tip = 0.06; P.brow = 0.4; P.drop = -4; }
  if (a105In(t, 43.26, 44.5)) { P.mouth = 'smile'; P.brow = -0.3; P.lid = 0.25; }
  if (a105In(t, 44.9, 50.7)) { P.brow = -0.5; P.mouth = 'frown'; }
  if (a105In(t, 54.36, 55.4)) { P.mouth = 'o'; P.sq = settleTo(t, 54.36, 1, 1.05, 0.3) - (t > 54.8 ? 0.05 * a105E(t, 54.8, 0.4) : 0); P.eyes = 'wide'; P.noBlink = true; }
  if (a105In(t, 57.9, 61.1)) { P.mouth = 'o'; P.brow = -0.4; P.eyes = 'wide'; }
  if (a105In(t, 61.16, 63.0)) { Object.assign(P, a105Walk(a105SoX7, t, 26)); P.y = 955; P.y -= a105In(t, 61.16, 61.86) ? Math.abs(Math.sin((t - 61.16) * Math.PI / 0.35)) * 14 : 0; P.dir = 1; P.mouth = 'smile'; P.eyes = 'open';
    P.handR = a105Tr(t, [[61.16, 61.8, PERSON_HANDS.clasp.R], [61.8, 62.2, [104, -120]]], null); P.handL = a105Tr(t, [[61.16, 61.8, PERSON_HANDS.clasp.L]], null);
    if (t > 62.2) { P.mouth = 'frown'; P.brow = -0.5; } }
  if (t >= 63.0 && t < 123.5) P.x = 300;
  if (a105In(t, 63.0, 66.2)) { P.mouth = 'smile'; P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; }
  if (a105In(t, 66.26, 67.3)) { const c = Math.max(0, Math.sin((t - 66.26) * 18)); P.handR = a105L2([50, -118], [16, -128], c); P.handL = a105L2([-40, -118], [-4, -126], c); }
  if (a105In(t, 78.12, 80.0)) { P.brow = -0.5; P.tilt = 0.12; P.mouth = 'frown'; }
  if (a105In(t, 82.76, 88.3)) { P.tip = 0.07 * a105E(t, 82.8, 0.4); P.mouth = 'o'; P.lid = 0.1; }
  if (a105In(t, 115, 123.5)) { P.tip = 0.06; P.mouth = 'o'; P.lid = 0.15; if (a105In(t, 118.7, 119.5)) P.drop = 5 * (pulse(t, 118.7, 0.35) + pulse(t, 119.1, 0.35)); }
  // S15-S16: closer, holds out a hand, spun like a turnstile, sits down
  if (a105In(t, 123.48, 135.4)) {
    P.x = kfn(t, [[123.48, 300], [124.3, 380]]); if (t < 124.3) Object.assign(P, a105Walk((tt) => kfn(tt, [[123.48, 300], [124.3, 380]]), t, 22));
    P.tip = 0.12 * a105E(t, 125.28, 0.6); P.mouth = 'o';
    if (a105In(t, 128.82, 130.82)) { P.handR = PERSON_HANDS.palmsUp.R; P.mouth = 'smile'; P.lid = 0.5; }
    if (t >= 130.82) { P.eyes = 'wide'; P.mouth = 'o'; P.tip = -0.04; P.noBlink = true; }
    const sp = a105Spin(t, 133.62, 0.5, 4, 1); if (sp) { P.dir = sp.dir * sp.sqx; P.handR = PERSON_HANDS.armsOut.R; P.handL = PERSON_HANDS.armsOut.L; P.tip = 0; }
    if (t >= 134.12) { P.sit = a105E(t, 134.12, 0.2); P.seat = 'floor'; P.sq = landSquash(t, 134.32, 0.15); P.handR = [70 - 30 * a105E(t, 134.4, 0.3), -120]; P.tip = 0; P.dizzy = true; }
  }
  // S19-S20
  if (a105In(t, 152.84, 171.3)) {
    P.x = 600; P.brow = -0.4; P.lid = 0.1;
    if (a105In(t, 153.76, 159.9)) { P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; P.mouth = 'closed'; }
    if (a105In(t, 159.9, 161.3)) { P.gaze = [0, 0.05]; P.mouth = 'o'; P.noBlink = true; P.lid = 0; P.drop = 3 * a105E(t, 159.9, 0.8); }
    if (a105In(t, 163.7, 164.6)) { const k = Math.floor((t - 163.7) / 0.3); P.dir = k === 1 ? 1 : -1; P.handR = k === 0 ? [96, -190] : k === 1 ? PERSON_HANDS.pointDown.R : PERSON_HANDS.pointFwd.R; P.brow = -0.8; P.mouth = 'open'; P.talk = 0; }
    if (t >= 165.84) { Object.assign(P, a105Walk(a105SoX20, t, 16)); P.amp *= 0.6; P.dir = -1; P.tip = 0.12; P.drop = 8; P.wet = true; P.brow = -0.6; P.mouth = 'frown'; P.bag = { ...bag, rot: 0.3 }; }
    if (a105In(t, 167.08, 167.9)) { const hp = [P.x - 70, 770 + 12 * Math.sin(t * 30)]; P.handLW = hp; P.handRW = [hp[0] + 30, hp[1]]; P.bag = { ...bag, hand: hp, upside: true }; P.tip = 0.04; P.dir = -1; P.gaze = [-0.5, 0.4]; }
    if (a105In(t, 167.9, 168.45)) { P.handR = PERSON_HANDS.palmsUp.R; P.handL = PERSON_HANDS.palmsUp.L; P.gaze = [0, 0.8]; P.sq = 0.94; P.tip = 0; P.bag = { ...bag, rot: 0.3 }; }
    if (t > 169.3) P.hidden = true;
  }
  if (t >= 171.3) P.hidden = true;
  return P;
}
function a105SoldierGaze(t, P, H) {
  if (P.gaze) return; const h = a105Head(P);
  if (t < 26) { P.gaze = gazePlan(t, [[18.76, [1, 0]], [19.7, lookAt(h, H.ch)], [22.16, lookAt(h, [P.x + 82, 760])], [22.5, lookAt(h, H.ch)], [25.2, [-1, 0.1]]]); return; }
  P.gaze = gazePlan(t, [[33.2, lookAt(h, H.ch)], [36.2, lookAt(h, H.cane)], [40.3, lookAt(h, H.ch)], [41.22, lookAt(h, H.cane)], [42.38, lookAt(h, H.ch)], [43.3, [0.4, -0.8]], [44.5, lookAt(h, H.cane)],
    [47.9, lookAt(h, H.sh)], [55.0, lookAt(h, H.ch)], [57.9, lookAt(h, H.pu)], [62.4, lookAt(h, H.ch)], [63.2, lookAt(h, H.pu)], [66.26, lookAt(h, H.sh)], [79.06, lookAt(h, H.ch)], [81.0, lookAt(h, H.sh)],
    [115, lookAt(h, H.sh)], [126.2, lookAt(h, H.pu)], [129.0, lookAt(h, H.pu)], [131, lookAt(h, H.sh)], [134.2, [0.6, -0.6]],
    [152.84, lookAt(h, H.ch)], [156.6, [0.3, -0.9]], [158.0, lookAt(h, H.ch)], [161.3, lookAt(h, H.ch)], [164.7, lookAt(h, H.ch)]]);
}

// ---------- the sharper in the hall ----------
const a105ShX6 = (t) => kfn(t, [[46.66, 398], [47.9, 398], [48.9, 520]]);
const a105ShY6 = (t) => kfn(t, [[47.9, 846], [48.9, 925]]);
const a105ShX7 = (t) => kfn(t, [[58.56, 520], [59.0, 600], [59.5, 600], [60.3, 540]]);
const a105ShX16 = (t) => kfn(t, [[133.38, 600], [134.35, 140], [134.75, 20]], 'in');
function a105SharperHallP(t) {
  const P = a105Mk('sharper', { x: 520, y: 925, dir: -1, brow: -0.4, mouth: 'smile', lid: 0.25 });
  P.purse = null;   // world point of the purse when he holds it
  if (t < 46.66) { P.hidden = true; return P; }
  if (t < 48.95) {
    const xf = t < 47.9 ? () => 398 : a105ShX6; Object.assign(P, a105Walk(xf, t, 22)); P.y = a105ShY6(t); P.dir = 1;
    if (t < 47.9) { P.handR = PERSON_HANDS.armsOut.R; P.handL = PERSON_HANDS.armsOut.L; P.amp = 0.15; P.ph = t * 6; P.lid = 0.2; P.mouth = 'closed'; P.brow = -0.2; }
    else { P.handR = [36 + 10 * Math.sin(t * 14), -100]; P.handL = [-10, -120 + 6 * Math.sin(t * 14)]; P.gaze = [0, 0.6]; }
    if (t < 47.0) P.clipY = K.lerp(700, 900, a105E(t, 46.66, 0.4));
    return P;
  }
  P.x = 520; P.dir = 1;
  if (a105In(t, 50.02, 51.0)) { P.sq = t < 50.25 ? anticipate(t, 50.02, 0.23, 0.06) : settleTo(t, 50.25, 1, 1.06, 0.3) - 0.06 * a105E(t, 50.7, 0.3); P.aR = [2.45, 2.85]; P.handL = PERSON_HANDS.cupMouth.R.map((v, i) => (i ? v : -v)); P.mouth = 'open'; P.brow = 0.4; P.lid = 0; P.talk = a105Talk(t, [[50.25, 50.9]], 1); }
  if (a105In(t, 51.78, 53.0)) { const u = a105B(t, 51.78, 1.2); P.dir = -1; P.handR = [80 + 20 * u, -130 - 30 * u]; P.brow = -0.6; P.lid = 0; P.mouth = 'closed'; P.talk = a105Talk(t, [[51.8, 52.9]], 0.6); }
  if (a105In(t, 53.14, 54.3)) { P.handR = PERSON_HANDS.chest.R; P.drop = -6; P.lid = 0.3; P.mouth = 'smile'; P.talk = a105Talk(t, [[54.36, 55.4]], 0.7); }
  if (a105In(t, 54.3, 55.5)) { P.handR = PERSON_HANDS.chest.R; P.talk = a105Talk(t, [[54.36, 55.4]], 0.8); P.mouth = 'closed'; }
  // S7 sleeve trick and the purse to the table
  if (a105In(t, 55.6, 56.6)) { P.handR = [62, -110 + 6 * Math.sin(t * 30)]; P.handL = [-62, -110 + 6 * Math.sin(t * 30 + 1)]; P.gaze = [0, 0.05]; P.lid = 0.4; P.mouth = 'smile'; }
  if (a105In(t, 56.66, 57.9)) { const u = a105B(t, 56.66, 1.1); P.handR = [56, -110]; P.handL = [K.lerp(40, 66, u), K.lerp(-112, -120, u)]; P.gaze = [0.2, -0.9]; P.lid = 0; P.brow = -0.6; P.mouth = 'o';
    P.post = [(c) => { const b = a105Pt(P, K.lerp(40, 66, u) - 10, -116); shape(c, ell(b[0], b[1], 14, 10, 12), A105_GREEND, { lw: 3, seed: 440 }); }]; }
  if (a105In(t, 57.9, 58.6)) { P.handL = [40, -230]; P.handR = [56, -110]; P.lid = 0.2; P.mouth = 'smile'; const hp = a105Pt(P, 40, -230); P.purse = [hp[0], hp[1] + 26]; P.purseGlint = a105B(t, 58.0, 0.5); }
  if (a105In(t, 58.56, 60.4)) { Object.assign(P, a105Walk(a105ShX7, t, 22)); P.dir = t < 59.6 ? 1 : -1;
    if (t < 59.2) { const k = a105E(t, 58.56, 0.6); const hp0 = a105Pt(P, 40, -230), tgt = [A105_PURSE[0], A105_PURSE[1] - 26]; P.handRW = a105L2(hp0, tgt, k); P.purse = [P.handRW[0], P.handRW[1] + 26]; P.tip = 0.12 * k; }
    else { P.tip = 0.12 * (1 - a105E(t, 59.2, 0.4)); P.lid = t < 59.6 ? 1 : 0.25; P.handR = PERSON_HANDS.chest.R; } }
  if (t >= 60.4 && t < 84.4) P.x = 540;
  // S8 applause, bow, the boast
  if (a105In(t, 66.26, 68.0)) { P.dir = 1; P.mouth = 'smile'; P.lid = 0.2; P.gaze = [-0.6, -0.3]; }
  if (a105In(t, 68.08, 69.85)) { P.handR = PERSON_HANDS.chest.R; P.tip = 0.22 * a105Env(t, 68.08, 69.85, 0.35); P.lid = t < 69.6 ? 1 : 0.2; P.noBlink = true; P.dir = 1; }
  if (a105In(t, 69.9, 71.6)) { P.handR = PERSON_HANDS.pointUp.R; P.brow = -0.4; P.lid = 0.25; P.mouth = 'smile'; P.talk = a105Talk(t, [[69.9, 71.5]], 0.6); P.dir = 1; }
  if (a105In(t, 71.62, 72.45)) { P.handR = [50, -150]; P.handL = [40, -100]; P.gaze = [0.6, 0.7]; P.lid = 0.5; P.dir = 1; }
  if (a105In(t, 72.48, 73.4)) { P.lid = 1; P.look = 0.5 * Math.sin((t - 72.48) * 13); P.noBlink = true; P.dir = 1; P.talk = a105Talk(t, [[72.5, 73.4]], 0.5); }
  if (a105In(t, 73.4, 76.36)) { P.dir = 1; P.handR = PERSON_HANDS.palmsUp.R; P.talk = a105Talk(t, [[73.5, 76.3]], 0.6); P.brow = -0.3; }
  if (a105In(t, 76.36, 78.1)) { P.dir = 1; P.tip = 0.1; P.handR = PERSON_HANDS.cupMouth.R; P.talk = a105Talk(t, [[76.4, 77.9]], 0.7); P.brow = -0.5; P.lid = 0.3; }
  if (a105In(t, 78.12, 79.0)) { P.dir = 1; P.wink = 'L'; P.gaze = [0, 0.05]; P.mouth = 'smile'; P.lid = 0; P.noBlink = true; }
  if (a105In(t, 79.0, 84.4)) { P.dir = 1; P.mouth = 'smile'; P.lid = 0.3; P.brow = -0.3; }
  // S9 the storyteller takes the floor
  if (a105In(t, 84.4, 88.3)) { const xf = (tt) => kfn(tt, [[84.4, 540], [84.9, 560]]); Object.assign(P, a105Walk(xf, t, 22)); P.dir = -1; }
  if (a105In(t, 84.46, 84.9)) { P.handR = [14, -168]; P.lid = 1; P.noBlink = true; P.drop = 3; }
  if (a105In(t, 84.9, 86.2)) { P.handR = a105Tr(t, [[84.9, 85.5, [-10, -110]]], null); P.handL = a105Tr(t, [[85.5, 86.2, [30, -110]]], null); P.mouth = 'smile'; P.lid = 0.3; }
  if (a105In(t, 86.26, 88.3)) { const u = a105E(t, 86.26, 0.9); P.handR = [60 + 50 * Math.cos(Math.PI * (1 - u)), -170 - 50 * Math.sin(Math.PI * u)]; P.gaze = t < 87.16 ? [0.5, -0.5] : [-0.6, -0.5]; P.lid = 0.3; P.mouth = 'smile'; P.talk = a105Talk(t, [[87.2, 88.2]], 0.5); }
  // S14-S16: back in the hall beside the table
  if (a105In(t, 115, 136)) {
    P.x = 600; P.dir = 1; P.talk = a105Talk(t, [[115.1, 116.6], [117.2, 119.4], [119.52, 120.1], [121.1, 123.3], [123.5, 126.1], [127.0, 130.1]], 0.55); P.mouth = 'smile'; P.lid = 0.2; P.brow = -0.3;
    if (a105In(t, 115.8, 121.1)) { const k = a105E(t, 115.8, 2.0); P.handRW = a105L2(a105Pt(P, 50, -100), [A105_PURSE[0] - 30, A105_PURSE[1] - 50], k); P.handL = [-50, -150 + 10 * Math.sin(t * 3)]; }
    if (a105In(t, 119.52, 120.1)) { P.handL = PERSON_HANDS.palmsUp.L; P.brow = -0.5; P.eyes = 'wide'; P.dir = 1; }
    if (t >= 121.1 && t < 130.82) {   // THE MOVE: finger and thumb on the purse neck, arm held away (arm angles)
      const lift = a105E(t, 122.06, 1.2); P.aR = [K.lerp(1.55, 1.9, lift), K.lerp(1.75, 2.3, lift)]; P.handRW = null; P.handL = PERSON_HANDS.chest.R.map((v, i) => (i ? v : -v));
      if (t >= 126.2) { const a = (t - 126.2) * 2.2; P.aR = [1.9 + 0.08 * Math.sin(a), 2.35 + 0.15 * Math.sin(a)]; }
      P.pinch = true; P.lid = 0.3; P.brow = -0.5; }
    if (a105In(t, 129.28, 130.82)) { P.sq = 1 - 0.035 * a105E(t, 129.3, 0.6); P.feetTurn = true; P.mouth = 'smile'; }
    if (t >= 130.82) { P.aR = null; P.pinch = false; P.handR = PERSON_HANDS.chest.R; P.mouth = 'smile'; P.brow = 0.2; P.lid = 0.1; P.sq = 1 + 0.04 * pulse(t, 130.82, 0.15); P.noBlink = true; P.purse = a105Pt(P, 10, -96); }
    if (t >= 132.54 && t < 133.38) { P.dir = -1; P.ph = (t - 132.54) * 40; P.amp = 1; P.tip = 0.08; P.dust = true; }
    if (t >= 133.38) { Object.assign(P, a105Walk(a105ShX16, t, 30)); P.amp = 1; P.dir = -1; P.tip = 0.2; P.purse = a105Pt(P, 10, -96); if (t > 134.75) P.hidden = true; }
  }
  if (a105In(t, 136, 1e9)) P.hidden = true;
  if (a105In(t, 88.3, 115)) P.hidden = true;
  return P;
}
function a105SharperGaze(t, P, H) {
  if (P.gaze) return; const h = a105Head(P);
  const door = [140, 760];
  P.gaze = gazePlan(t, [[46.66, [0, 0.4]], [48.0, [1, 0.2]], [50.0, lookAt(h, H.cane)], [50.9, lookAt(h, H.ch)], [51.78, lookAt(h, [380, 720])], [53.14, lookAt(h, H.ch)], [56.6, [0, 0.05]],
    [58.0, lookAt(h, H.pu)], [59.6, lookAt(h, H.ch)], [62.4, lookAt(h, H.so)], [69.9, lookAt(h, H.ch)], [73.5, lookAt(h, [380, 720])], [74.6, lookAt(h, H.so)], [76.4, lookAt(h, [340, 720])],
    [79.06, lookAt(h, H.ch)], [84.9, lookAt(h, [380, 720])],
    [115, lookAt(h, [380, 760])], [116.6, lookAt(h, H.ch)], [118.0, lookAt(h, [380, 760])], [119.52, lookAt(h, H.ch)], [121.1, lookAt(h, H.pu)], [123.5, lookAt(h, [400, 720])],
    [126.76, lookAt(h, door)], [126.95, lookAt(h, H.pu)], [127.15, lookAt(h, door)], [127.35, lookAt(h, H.pu)], [129.28, lookAt(h, door)], [129.5, lookAt(h, H.pu)], [130.22, lookAt(h, door)], [130.4, lookAt(h, H.pu)], [130.6, lookAt(h, door)], [132.54, [-1, 0]]],
    t > 126.6 && t < 131 ? 0.07 : 0.2);
}

// ---------- the guards ----------
const a105GaX = (t) => kfn(t, [[35.4, 680], [36.05, 400], [41.0, 400], [43.5, 380], [123.48, 380], [124.6, 760], [152.0, 760], [152.84, 380], [170.3, 380], [170.6, 360]]);
function a105GuardAP(t) {
  const P = a105Mk('guardA', { x: 610, y: 878, dir: -1, brow: 0.5, mouth: 'closed', lid: 0.2 });
  P.cane = null;
  if (t < 26) { P.x = 520; P.y = 868; P.dir = -1; P.sq = 1 - 0.05 * pulse(t, 24.58, 0.25); P.helmRot = swing(t, 24.6, 0.12, 3, 4); P.lid = t < 24.58 ? 0.6 : 0; P.handR = t > 24.6 ? [10, -228] : null; return P; }
  Object.assign(P, a105Walk(a105GaX, t, 26)); P.y = K.lerp(905, 875, K.clamp((P.x - 450) / 200)); P.dir = a105Dir(a105GaX, t, t < 41 ? -1 : t < 123 ? 1 : -1);
  if (t >= 43.5 && t < 123.48) P.dir = 1;
  // the cane: picked from the bundle at 36.14, bent, swished, raised over guest A, frozen, sunk, tucked
  const grip = [40, -120];
  if (a105In(t, 36.14, 123.48)) {
    let ang = 0.3, bend = 0;
    if (t < 37.0) { bend = 0.9 * a105Env(t, 36.3, 36.85, 0.25) + swing(t, 36.85, 0.3, 4, 5); P.handL = [70, -190]; ang = 0.2; }
    else if (t < 37.8) { const u = a105B(t, 37.08, 0.5); ang = K.lerp(-0.8, 1.6, K.ease.in(u)) ; bend = -0.4 * Math.sin(Math.PI * u); P.handR = [60, -150]; }
    else if (t < 44.9) ang = 0.3;
    else if (t < 55.0) { const up = a105E(t, 44.9, 0.5); ang = K.lerp(0.3, -1.25, up) + 0.04 * Math.sin(t * 30) * (t > 45.4 ? 1 : 0) + swing(t, 50.78, 0.12, 3, 3); P.aR = [K.lerp(1.0, 2.6, up), K.lerp(1.2, 2.9, up)]; P.tip = -0.05 * up; P.brow = 0.8; }
    else if (t < 63.38) { const dn = a105E(t, 55.0, 0.5); ang = K.lerp(-1.25, -0.5, dn); P.aR = [K.lerp(2.6, 1.6, dn), K.lerp(2.9, 1.8, dn)]; }
    else ang = 1.4;
    P.cane = { ang, bend, tuck: t >= 63.38 };
    if (t >= 63.38) { if (t < 64.0) { P.amp = 0.45 * pulse(t, 63.5, 0.4); P.ph = -1.2; } P.aR = null; P.handR = [20, -120]; P.lid = 0.3; P.brow = 0.2; P.sq = 1 - 0.02 * pulse(t, 63.4, 0.5); }
    if (a105In(t, 50.78, 52.0)) { P.tilt = -0.12; P.look = -0.8; }
    if (a105In(t, 85.4, 86.0)) { P.brow = 1; P.handR = PERSON_HANDS.pointUp.R; }
  }
  if (a105In(t, 124.6, 135.4)) { P.cane = { ang: 0.05, bend: 0.15, lean: true }; P.handR = [70, -100]; P.tip = 0.12 * a105E(t, 125.3, 0.6); P.dir = -1; P.lid = 0; P.mouth = 'o'; P.brow = -0.2;
    if (t >= 130.82) { P.eyes = 'wide'; P.tip = 0; P.noBlink = true; }
    if (t >= 134.12) { P.cane = { ang: -2.4 + 3 * a105E(t, 134.12, 0.6), bend: 0, fly: true, fx: P.x + 40, fy: 760 - 220 * Math.sin(Math.PI * a105B(t, 134.12, 0.7)) }; P.tip = K.lerp(0, 0.45, a105E(t, 134.12, 0.25, 'in')); P.sit = a105E(t, 134.35, 0.1); P.seat = 'floor'; if (t > 134.45) { P.tip = 0.2; P.dizzy = true; } } }
  if (a105In(t, 152.84, 171.3)) { P.cane = null; P.dir = 1; P.handR = PERSON_HANDS.folded.R; P.handL = PERSON_HANDS.folded.L; P.brow = 0.2; P.lid = 0.3;
    if (t >= 170.54) { P.handR = [70, -60]; P.handL = [50, -60]; P.tip = 0.25 * a105Env(t, 170.54, 171.3, 0.2); P.gaze = [0.4, 0.9]; P.lid = 0.5; P.mouth = 'frown'; } }
  if (t >= 173.7) { P.x = 560; P.y = 885; P.dir = -1; P.cane = null; P.gaze = [0.1, -1]; P.mouth = 'o'; P.tip = 0.05 * Math.sin(t * 3.2); P.lid = 0; P.noBlink = false; P.hidden = t < 176.5; }
  return P;
}
const a105GbX = (t) => kfn(t, [[34.6, -40], [35.5, A105_BUNDLE[0] - 40], [35.75, A105_BUNDLE[0] - 40], [36.6, 760], [123.48, 760], [124.4, 270]], 'lin');
function a105GuardBP(t) {
  const P = a105Mk('guardB', { x: 760, y: 905, dir: 1, brow: 0.3, mouth: 'closed', lid: 0 });
  if (t < 26) { P.x = 200; P.sq = 1 - 0.06 * pulse(t, 24.78, 0.25); P.helmRot = swing(t, 24.8, 0.2, 3, 3); P.handR = t > 24.8 ? [10, -228] : null; P.mouth = t > 24.8 ? 'o' : 'closed'; return P; }
  if (t < 134.12) { Object.assign(P, a105Walk(a105GbX, t, 20)); P.dir = a105Dir(a105GbX, t, 1); }
  if (a105In(t, 34.6, 35.52)) { P.y = 885 + 8 * Math.sin(t * 9); P.x += 14 * Math.sin(t * 7); P.aR = [2.5, 2.9]; P.aL = [-2.5, -2.9]; P.brow = -0.5; P.mouth = 'o'; P.carry = true; }
  if (a105In(t, 35.52, 36.0)) { P.sq = 1 - 0.08 * pulse(t, 35.52, 0.3); P.brow = -0.3; P.mouth = 'open'; }
  if (a105In(t, 63.4, 64.0)) { P.drop = 4 * pulse(t, 63.4, 0.5); P.lid = 0.5; }
  if (a105In(t, 84.92, 86.4)) { P.sit = a105Env(t, 85.0, 85.6, 0.25); P.seat = 'floor'; if (t > 85.5) { P.y -= 30 * pulse(t, 85.5, 0.5); P.brow = -0.4; P.mouth = 'o'; P.gaze = lookAt(a105Head(P), [400, 700]); } }
  if (a105In(t, 123.48, 134.12)) { P.dir = 1; P.cane = { ang: 0.1, bend: 0.1, lean: true }; P.handR = [70, -100]; P.tip = 0.1 * a105E(t, 125.3, 0.6); P.mouth = 'o'; if (t >= 130.82) { P.eyes = 'wide'; P.noBlink = true; } }
  if (a105In(t, 134.12, 135.4)) { P.x = 270; P.dir = -1; P.handR = [100, -150]; P.handL = [-60, -170]; const f = a105E(t, 134.74, 0.25, 'in'); P.rot = -1.4 * f; P.y = 885 + 20 * f; P.eyes = 'wide'; P.mouth = 'o'; if (t > 135.0) P.sq = landSquash(t, 134.99, 0.2); }
  if (a105In(t, 152.84, 171.3)) { P.x = 760; P.dir = -1; P.handR = PERSON_HANDS.folded.R; P.handL = PERSON_HANDS.folded.L; P.lid = 0.2; if (t > 168.5) P.gaze = [-0.9, 0.2]; }
  if (t >= 173.7) { P.x = 470; P.y = 892; P.dir = 1; P.gaze = [-0.1, -1]; P.mouth = 'o'; P.tip = -0.05 * Math.sin(t * 2.7 + 1); P.hidden = t < 176.5; }
  return P;
}

// ---------- the four guests ----------
function a105GuestP(t, i) {
  const name = A105_GUESTS[i], x0 = A105_GX[i], st = a105St(i);
  const P = a105Mk(name, { x: x0, y: A105_GY, dir: i < 2 ? 1 : -1, brow: -0.3, mouth: 'frown', lid: 0.1 });
  if (t < 33.2 || t >= 171.3) { P.hidden = true; return P; }
  P.sq = breathe(t, i + 3, 0.012) + 0; P.dir = i % 2 ? -1 : 1;
  if (i === 0) { P.handR = [10, -112]; P.handL = [-6, -118]; P.lid = 0.5; P.pillow = true; }
  if (i === 2) { P.brow = 0.6; P.mouth = 'frown'; }
  if (i === 3) { P.mouth = t < 37 ? 'closed' : 'frown'; P.talk = a105In(t, 33.2, 36.8) ? 0.3 * Math.abs(Math.sin(t * 9)) : 0; }
  if (a105In(t, 35.52, 36.4)) P.y -= Math.abs(K.spring(t, 35.52 + st * 0.3, 6, 12, 7));
  if (a105In(t, 37.08 + st, 37.9 + st)) { P.tip = -0.1 * a105Env(t, 37.08 + st, 37.9 + st, 0.12); P.eyes = 'wide'; P.handR = PERSON_HANDS.shield.R; }
  if (a105In(t, 38.68 + st, 39.2 + st)) { P.drop = 5 * pulse(t, 38.68 + st, 0.4); P.eyes = 'wide'; }
  if (a105In(t, 39.32 + st, 40.3 + st)) { P.dir = i < 3 ? 1 : -1; P.handR = PERSON_HANDS.pointFwd.R; P.brow = 0.4; if (i === 3 && t > 39.9) { P.handR = a105L2(PERSON_HANDS.pointFwd.R, [30, -110], a105E(t, 39.9, 0.2)); P.gaze = [0.1, -1]; } }
  if (a105In(t, 44.9 + st * 0.3, 50.78 + st)) { P.lid = 1; P.noBlink = true; P.handR = PERSON_HANDS.shield.R; P.handL = PERSON_HANDS.shield.L; P.x += tremble(t + i, 2); P.drop = 4; P.mouth = 'frown'; if (i === 0 && a105In(t, 46.16, 46.6)) { P.lid = 0; P.wink = 'L'; } }
  if (a105In(t, 46.66, 49.6)) { if (i === 1) P.tip = 0.12 * a105Env(t, 46.7, 49.6, 0.25) * -P.dir; if (i === 2) P.tip = 0.12 * a105Env(t, 46.75, 49.6, 0.25) * P.dir; }
  if (a105In(t, 50.78 + st, 53.0)) { P.lid = Math.max(0, 1 - a105E(t, 51.78 + st * 2, 0.25)); P.handR = null; P.handL = null; P.brow = -0.5; }
  if (a105In(t, 53.0, 57.9)) { P.brow = -0.5; P.mouth = 'o'; }
  if (a105In(t, 62.36 + st, 63.4 + st)) { const u = a105B(t, 62.36 + st, 1.0); P.sq = u < 0.45 ? 1 + 0.06 * K.ease.out(u / 0.45) : 1.06 - 0.13 * K.ease.inOut((u - 0.45) / 0.55); P.mouth = 'o'; P.lid = 0.4; }
  if (a105In(t, 63.4, 66.26)) { P.mouth = 'smile'; P.brow = -0.2; }
  if (a105In(t, 64.38, 66.2)) {
    if (i === 0) P.handR = [40 + 30 * Math.sin((t - 64.38) * 6), -216];
    if (i === 1) { P.gaze = [0, -1]; P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; }
    if (i === 2) { P.handR = [56 + 16 * Math.sin(t * 22), -186]; P.lid = 0.4; }
  }
  if (i === 3 && a105In(t, 64.38, 66.3)) { P.sit = a105Env(t, 64.4, 66.3, 0.4); P.seat = 'floor'; P.lid = 0.5; }
  if (a105In(t, 66.26, 77.62 + st)) { const c = Math.max(0, Math.sin((t - 66.26 + i * 0.13) * 17)) * a105Env(t, 66.26, 77.62 + st, 0.2) * (t > 70 ? 0.6 : 1); P.handR = a105L2([46, -118], [14, -128], c); P.handL = a105L2([-40, -118], [-4, -126], c); P.mouth = 'smile'; P.drop = 2 * Math.sin(t * 6 + i); }
  if (a105In(t, 77.62 + st, 82.7)) { P.handR = [44, -122]; P.handL = [-38, -122]; P.mouth = 'o'; }
  if (a105In(t, 82.76 + st, 85.0)) P.tip = 0.08 * a105E(t, 82.8 + st, 0.3) * Math.sign(520 - x0 || 1) * P.dir;
  // story time: sit on the floor (D, then A, then B; C last, grumbling)
  const sitT = [85.2, 85.6, 84.92, 86.0][i] ;
  if (a105In(t, sitT, 123.6)) { P.sit = a105E(t, sitT, 0.3) * (1 - a105E(t, 123.48 + st, 0.3)); P.seat = 'floor'; P.handR = PERSON_HANDS.chin.R; P.lid = 0.15; P.mouth = 'o'; P.tip = 0; P.dir = x0 < 480 ? 1 : -1; P.brow = -0.3; }
  // S15: shuffle closer and lean in; S16 topple into a heap
  if (a105In(t, 123.48, 135.4)) {
    const xs = [300, 390, 480, 555][i], xf = (tt) => kfn(tt, [[123.48 + st, x0], [124.4 + st, xs]]); Object.assign(P, a105Walk(xf, t, 18)); P.dir = i < 3 ? 1 : -1;
    P.tip = (0.1 + 0.02 * i) * a105E(t, 125.28 + st, 0.6); P.mouth = 'o'; P.lid = 0; P.handR = i === 3 ? PERSON_HANDS.chin.R : null;
    if (t >= 130.82 + st) { P.eyes = 'wide'; P.noBlink = true; }
    if (t >= 134.12 + st) { P.tip = K.lerp(P.tip, 0.6, a105E(t, 134.12 + st, 0.25, 'in')); if (t > 134.37 + st) { P.sit = 1; P.seat = 'floor'; P.tip = 0.25; P.sq = landSquash(t, 134.37 + st, 0.18); P.dizzy = i % 2 === 0; } }
  }
  // S19-S20
  if (a105In(t, 152.84, 171.3)) {
    P.mouth = 'closed'; P.brow = -0.3;
    if (a105In(t, 162.22 + st, 165.0)) { P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; P.gaze = [0, -1]; P.brow = -0.6; P.lid = 0; P.mouth = 'smile'; if (i === 3) { P.handR = [30 + 14 * Math.cos(t * 9), -258 + 6 * Math.sin(t * 9)]; P.halo = true; } }
    if (t >= 168.48 + st * 1.2) { const xf = (tt) => kfn(tt, [[168.48 + st * 1.2, x0], [170.4 + st * 1.2, 30]], 'lin'); Object.assign(P, a105Walk(xf, t, 16)); P.dir = -1; P.amp *= 0.8; P.sq = 0.97; P.mouth = 'closed'; P.gaze = [1, -0.1]; P.drop = 4;
      if (i === 3) { const hp = a105In(t, 169.5, 169.9) ? hop(t, 169.5, 0.4, 0, 0, 50)[1] : 0; P.y -= hp; if (t > 169.9) P.sq = landSquash(t, 169.9, 0.15); }
      if (i === 0 && a105In(t, 169.7, 170.2)) P.handR = [24, -222];
      if (P.x < 120) P.alpha = K.clamp((P.x - 30) / 90); }
  }
  return P;
}
function a105GuestGaze(t, P, i, H) {
  if (P.gaze) return; const h = a105Head(P), st = a105St(i);
  P.gaze = gazePlan(t, [[33.2, lookAt(h, H.ch)], [34.8, lookAt(h, H.gb)], [36.2, lookAt(h, H.cane)], [37.9, lookAt(h, H.ch)], [39.32 + st, i < 3 ? [1, 0.1] : lookAt(h, H.ga)], [40.4, lookAt(h, H.ch)],
    [44.9, lookAt(h, H.cane)], [50.78 + st, lookAt(h, H.sh)], [55.0 + st, lookAt(h, H.ch)], [57.9 + st * 0.5, lookAt(h, H.pu)], [59.6, lookAt(h, H.ch)], [62.4, [0, -0.3]], [66.26, lookAt(h, H.sh)],
    [115, lookAt(h, H.sh)], [126.2 + st, lookAt(h, H.pu)], [130.9, lookAt(h, H.sh)], [133.4, lookAt(h, [140, 760])], [134.2, [0.3 - i * 0.2, -0.7]],
    [152.84, lookAt(h, H.ch)], [155.0, lookAt(h, H.so)], [157.0, lookAt(h, H.ch)], [168.5, [-1, 0]]], 0.15);
}

// ---------- compose the hall: actors + props, depth sorted ----------
function a105HallScene(t) {
  const night = a105Night(t);
  const CH = a105ChiefP(t), SO = a105SoldierHallP(t), SH = a105SharperHallP(t), GA = a105GuardAP(t), GB = a105GuardBP(t);
  const guests = night ? [] : [0, 1, 2, 3].map((i) => a105GuestP(t, i));
  // purse position (world, bottom centre)
  let purse = null, pinch = false;
  if (SH.purse && !SH.hidden) purse = SH.purse;
  else if (t >= 59.2 && t < 121.1) purse = A105_PURSE;
  // the pinch: purse hangs from the sharper's fingers (computed after drawing, see below)
  const heads = { ch: a105Head(CH), so: a105Head(SO), sh: SH.hidden ? [480, 700] : a105Head(SH), ga: a105Head(GA), gb: a105Head(GB), pu: purse ? [purse[0], purse[1] - 30] : [A105_PURSE[0], A105_PURSE[1] - 30], cane: [GA.x + 40, 600] };
  if (SH.pinch) { pinch = true; heads.pu = a105Pt(SH, 0, 0); }
  a105ChiefGaze(t, CH, heads); a105SoldierGaze(t, SO, heads); a105SharperGaze(t, SH, heads); guests.forEach((G, i) => a105GuestGaze(t, G, i, heads));
  GA.gaze = GA.gaze || gazePlan(t, [[24, lookAt(heads.ga, heads.ch)], [33.2, lookAt(heads.ga, heads.ch)], [36.2, [0.3, 0.8]], [37.08, [-0.6, -0.6]], [38, lookAt(heads.ga, [400, 730])], [45.0, lookAt(heads.ga, [300, 700])], [50.9, lookAt(heads.ga, heads.sh)], [56, lookAt(heads.ga, heads.pu)], [66.3, lookAt(heads.ga, heads.sh)], [126.2, lookAt(heads.ga, heads.pu)], [131, lookAt(heads.ga, heads.sh)], [152.84, lookAt(heads.ga, heads.ch)]]);
  GB.gaze = GB.gaze || gazePlan(t, [[24, lookAt(heads.gb, heads.ch)], [33.2, lookAt(heads.gb, heads.ch)], [34.6, [1, -0.2]], [36.0, lookAt(heads.gb, heads.ga)], [50.95, lookAt(heads.gb, heads.sh)], [56, lookAt(heads.gb, heads.pu)], [66.4, lookAt(heads.gb, heads.sh)], [126.3, lookAt(heads.gb, heads.pu)], [131.1, lookAt(heads.gb, heads.sh)], [152.84, lookAt(heads.gb, heads.ch)]]);
  [CH, SO, SH, GA, GB, ...guests].forEach((P) => a105Lid(P, t));
  // extras on actors
  if (SO.dizzy || GA.dizzy) for (const P of [SO, GA]) if (P.dizzy) P.post = [...(P.post || []), (c) => { const h = a105Head(P); dizzy(c, h[0], h[1] - 50, t, 34); }];
  guests.forEach((G) => {
    const extra = [];
    if (G.pillow) extra.push((c) => { const p = a105Pt(G, 10, -118); shape(c, ell(p[0], p[1], 30, 18, 16), C.white, { lw: 4, seed: 441, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 }); });
    if (G.halo) extra.push((c) => { const h = a105Head(G); c.save(); c.lineWidth = 7; c.strokeStyle = C.black; c.beginPath(); c.ellipse(h[0], h[1] - 52, 26, 7, 0, 0, 7); c.stroke(); c.lineWidth = 4; c.strokeStyle = C.yellow; c.stroke(); c.restore(); });
    if (G.dizzy) extra.push((c) => { const h = a105Head(G); dizzy(c, h[0], h[1] - 46, t, 26); });
    G.post = extra;
  });
  // chief's turban over his eyes (S22)
  if (CH.cover) CH.post = [(c) => a105OnBody(c, CH, (cc) => { const hx = 0, hy = a105HdY(CH); cc.save(); cc.translate(hx, hy); const k = CH.cover, pk = CH.peek || 0;
    shape(cc, [[-40, -40 + 30 * k - 30], [40, -40 + 30 * k - 30], [42, -6 + 24 * k - 8 * pk], [-42, -6 + 24 * k], [-40, -40 + 30 * k - 30]], C.white, { lw: 5, seed: 442, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 });
    if (pk > 0.05) eyeAt(cc, 13, 8, 'open', 0); cc.restore(); }, true)];
  // the guard's cane (in the hand frame)
  const caneFn = (P) => (c) => { const C2 = P.cane; if (!C2) return; if (C2.fly) { a105Cane(c, C2.fx, C2.fy, C2.ang, 200, 0); return; }
    const hi = P.hands ? a105Hand(P, 1) : a105Pt(P, 40, -120); if (C2.lean) { a105Cane(c, hi[0] + 2, hi[1] + 6 + 120, C2.ang * (P.dir || 1), 130, C2.bend); return; }
    if (C2.tuck) { a105Cane(c, hi[0] + 70 * (P.dir || 1), hi[1] + 10, -1.45 * (P.dir || 1), 200, 0); return; }
    a105Cane(c, hi[0], hi[1] + 30, C2.ang * (P.dir || 1), 230, C2.bend * (P.dir || 1)); };
  GA.post = [...(GA.post || []), caneFn(GA)]; GB.post = [...(GB.post || []), caneFn(GB)];
  if (GB.carry) GB.post.push((c) => { const h = a105Head(GB); a105Bundle(c, h[0] + 6, h[1] - 52, { rot: 0.08 * Math.sin(t * 7), n: 7 }); });
  // the purse when held in the sharper's hand / pinch
  const items = [];
  const drawPurse = (c) => {
    if (SH.pinch) { const hp = a105Hand(SH, 1); const sw = Math.sin((t - 122.06) * 4.2) * 0.25 * a105Env(t, 122.06, 130.8, 0.3) + (t > 126.2 ? 0.2 * Math.sin((t - 126.2) * 2.2) : 0); a105Purse(c, hp[0] + 2, hp[1] + 64, 0.72, { rot: sw }); return; }
    if (!purse) return; const land = t >= 59.2 && t < 59.6 ? impactSquash(t, 59.2, 0.85) : 1, hop2 = t > 165.5 && t < 165.8 ? 0 : 0;
    a105Purse(c, purse[0], purse[1] - hop2, 0.72, { sq: land, glint: SH.purseGlint ?? (t > 116.68 && t < 117.5 ? a105B(t, 116.7, 0.6) : null) });
  };
  // table hop at the chief's slap
  const tdy = t > 165.5 && t < 165.9 ? -Math.abs(K.spring(t, 165.5, 8, 14, 8)) : 0;
  const bundleSpread = t < 134.12 ? 0 : t < 170.54 ? a105E(t, 134.12, 0.4) : 1 - a105E(t, 170.54, 0.6);
  const bundleX = A105_BUNDLE[0] + (t > 63.6 && t < 152 ? 20 * a105E(t, 63.6, 0.3) : 0);
  const bundleDrop = t < 35.52 ? null : t < 36.4 ? Math.abs(K.spring(t, 35.52, 18, 9, 6)) : 0;
  items.push({ y: 905, draw: (c) => { a105Table(c, tdy); if (!SH.pinch && purse && (purse === A105_PURSE)) drawPurse(c); } });
  if (bundleDrop != null && !(t >= 173.7)) items.push({ y: 922, draw: (c) => a105Bundle(c, bundleX, A105_BUNDLE[1] - bundleDrop, { rot: 0.02, spread: bundleSpread }) });
  const actors = [CH, SO, SH, GA, GB, ...guests].filter((P) => !P.hidden);
  for (const P of actors) items.push({ y: P.y + (P === CH ? -40 : 0), draw: (c) => { a105Draw(c, P); if (P === SH) drawPurse(c); if (P.dust) for (let k = 0; k < 3; k++) dustBurst(c, P.x + 10, P.y, (t - 132.54 - k * 0.2) % 0.6, 4, 6, 12, 26, 0.5, k); } });
  if (SO.bag && SO.bag.hand && t > 167.2 && t < 168.6) items.push({ y: 2000, draw: (c) => { const u = t - 167.2; a105Moth(c, SO.bag.hand[0] - 20 * u + 30 * Math.sin(u * 9), SO.bag.hand[1] - 40 - 160 * u, t, 0.9); } });
  if (t > 167.9 && t < 169) items.push({ y: 2000, draw: (c) => { const u = t - 167.2; a105Moth(c, SO.x - 30 - 20 * u + 30 * Math.sin(u * 9), 730 - 160 * u, t, 0.9); } });
  items.sort((a, b) => a.y - b.y);
  return { items, heads, CH, SO, SH, GA, GB, guests, purse };
}

// ---------- outside the hall door (drawn in the door arch): sky, the street, passers-by ----------
function a105HallOutside(t) {
  const u = t < 26 ? 0.8 : t >= 173.7 ? 0.5 : 0.3;
  return (c) => {
    skyCycle(c, u, { sun: false, moon: t < 26, hills: false, t });
    shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], '#e8c690', { lw: 5, seed: 201, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 });
    if (u > 0.6) { c.save(); c.globalAlpha = 0.45; c.fillStyle = NAVY2; c.fillRect(0, 400, 300, 520); c.restore(); }
    // the yellow turban passes outside (S5)
    if (a105In(t, 44.1, 44.9)) { const P = a105Mk('sharper', { ...a105Walk((tt) => kfn(tt, [[44.1, 270], [44.9, 120]], 'lin'), t, 20), y: 905, s: 0.6, dir: -1, gaze: [0.6, 0.2] }); a105Draw(c, P); }
    // the freed guests leap for joy outside (S20)
    if (a105In(t, 170.6, 171.3)) for (let i = 0; i < 4; i++) { const t0 = 170.76 + i * 0.1, h = hop(t, t0, 0.35, 0, 0, 40)[1]; const P = a105Mk(A105_GUESTS[i], { x: 60 + i * 50, y: 905 - h, s: 0.5, dir: -1, aL: [-2.45, -2.8], aR: [2.45, 2.8], mouth: 'smile' }); a105Draw(c, P); }
  };
}
