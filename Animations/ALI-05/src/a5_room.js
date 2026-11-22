// ===== ALI-05 the dinner room as continuity data (51 - 122.6 s): every person's pose over the whole evening, the props on the floor,
// the views, and one world function a5RoomWorld that every dinner shot draws through its own camera (so nothing can jump between cuts).
// Seats (DR.seats): Ali Baba at the left end (480), wife 640, child 780, nephew 930 behind the table, the guest at the right end (1220)
// by the courtyard door; Morgiana serves (kneels at 1110 from S11). All poses on twos (AB_T2), blinks on threes.
const A5_RM = 'lamp';
const A5_GUEST_X = (u) => kfn(u, [[51, 1120], [59.7, 1120], [60.4, 1220], [119.9, 1220], [121.1, 1330], [121.58, 1345], [122.4, 1700]]);
const A5_SIT_T = 60.46, A5_UP_T = 118.98;   // the guest sits / springs to his feet
const A5_RING_BARE = [[13.04, 13.7], [34.3, 34.6], [41.6, 51.0], [105.5, 106.6]];   // windows where his right cuff is back (the ring shows)
const a5RingShown = (t) => A5_RING_BARE.some(([a, b]) => t >= a && t < b);

// ---------- the guest at dinner ----------
function a5GuestR(t) {
  const tc = AB_T2(t), x = A5_GUEST_X(tc), sitting = tc >= A5_SIT_T && tc < A5_UP_T + 0.4, W = walk(A5_GUEST_X, tc, { stride: 28 });
  const P = { ...a5Base(t, 501), x, y: sitting ? 905 : 920, dir: -1, mouth: 'smile', brow: 0.55, lid: Math.max(0.3, abLid(t, 501)), gaze: [-1, 0], look: -0.3, handL: [-26, -108], handR: [24, -112] }, o = { fine: 1, kick: 0, cuffR: a5RingShown(t) ? 0 : 1, feather: lagged((u) => idleSway(u, 505, 0.15, 2.2), tc, 0.25, 1) };
  if (tc < 53.5) { P.gaze = gazePlan(tc, [[51, [-0.6, -0.6]], [52.2, [0.4, -0.8]], [52.9, [-1, -0.3]]]); P.look = -0.4; }
  else if (tc < 54.36) { const f = flow(tc, [[53.5, 0], [53.8, 1.1], [54.0, 1]]); P.handL = [K.lerp(-26, -95, f), K.lerp(-108, -160, f)]; P.handR = [K.lerp(24, 95, f), K.lerp(-112, -160, f)]; P.gaze = [-0.4, -0.7]; P.sq *= 1 + 0.02 * f; }
  else if (tc < 55.4) { P.handL = [-95, -160]; P.handR = [95, -160]; P.talk = abTalk(t, 54.36, 55.2, 2); if (P.talk) P.mouth = 'open'; P.gaze = [-1, -0.1]; }
  else if (tc < 58.6) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.gaze = [-1, 0]; }
  else if (tc < 59.7) { P.dir = 1; P.handL = [-50, -170]; P.handR = [80, -80]; P.tilt = 0.1; P.mouth = 'grin'; P.talk = abTalk(t, 58.6, 59.5, 3, 0.5); P.gaze = [1, 0.4]; P.brow = -0.2; }
  else if (tc < A5_SIT_T) { Object.assign(P, W); P.dir = 1; P.gaze = [1, 0.3]; P.handL = [-20, -104]; P.handR = [20, -106]; }
  if (sitting) { const s = K.clamp((tc - A5_SIT_T) / 0.3); P.sit = s; P.seat = 'floor'; P.sq *= landSquash(tc, A5_SIT_T + 0.3, 0.07); o.kick = 0.4 * swing(tc, A5_SIT_T + 0.3, 1, 1.6, 3); P.dir = -1; }
  // the three glances to the door (eyes only; the head stays with the family)
  if (tc >= 63.5 && tc < 68.6) { P.look = -0.5; P.gaze = gazePlan(tc, [[63.5, [1, -0.1]], [63.9, [-1, 0]], [64.6, [1, -0.1]], [65.0, [-1, 0]], [65.5, [1, -0.1]], [65.9, [-1, 0]], [66.3, [0.8, 0]], [67.7, [-1, 0]]], 0.08);
    if (tc > 62.5 && tc < 63.4) P.handLW = [1110, 820]; P.talk = abTalk(t, 64.0, 64.5, 4, 0.4); if (P.talk) P.mouth = 'open'; }
  if (tc >= 62.5 && tc < 63.5) { P.handLW = [1118, 812 + 6 * beatIn(tc, 62.5, 62.9)]; P.gaze = [-1, 0.1]; }
  if (tc >= 68.6 && tc < 80.6) { P.gaze = [-1, 0]; P.talk = abTalk(t, 69, 79, 5, 0.45) * (osc(tc, 3.1) > 0.2 ? 1 : 0); if (P.talk) P.mouth = 'open'; P.handR = [30 + 20 * osc(tc, 1.4), -140]; }
  // S11: the bowl, the roast, the bowl again; the grand wave and the bubbles; the swat and the cough
  if (tc >= 80.6 && tc < 88.6) { P.gaze = gazePlan(tc, [[80.6, [-1, 0]], [82.1, [-0.6, 0.2]], [82.6, [-1, -0.3]], [82.9, [-0.6, 0.25]], [83.15, [-1, -0.3]], [83.38, [-0.5, 0.9]], [83.7, [-1, -0.1]], [84.1, [-0.4, 0.9]], [84.6, [-0.8, 0.2]], [86.1, [-0.3, -0.8]], [87.04, [0.2, -1]], [87.6, [-1, 0]]], 0.08);
    P.mouth = tc > 83.3 && tc < 84.4 ? (Math.floor(tc * 6) % 2 ? 'smile' : 'grin') : tc >= 82.9 && tc < 83.0 ? 'closed' : 'smile';   // rev 1: the mask twitches down one drawing at the bowl
    if (tc >= 85.2 && tc < 86.1) P.handR = PERSON_HANDS.chin.R;
    if (tc >= 86.1 && tc < 87.04) { const f = flow(tc, [[86.1, 0], [86.35, 1.15], [86.6, 1]]); P.handR = [K.lerp(24, 70, f), K.lerp(-112, -205, f)]; P.talk = abTalk(t, 86.1, 87.0, 6); if (P.talk) P.mouth = 'open'; }
    if (tc >= 87.04 && tc < 87.5) { const f = flow(tc, [[87.04, 0], [87.18, 1.2], [87.3, -0.2], [87.5, 0]]); P.handL = [-40 + 80 * f, -200 + 20 * f]; P.tip = -0.04; }
    if (tc >= 87.5 && tc < 88.2) { P.handR = PERSON_HANDS.mouthCover.R; P.sq *= 1 - 0.03 * Math.abs(Math.sin(tc * 18)); P.lid = 0.7; } }
  // S12: MY FIRST TIME IN THIS TOWN!, head shakes, chatting with the bread, the slip, bread stuffed in
  if (tc >= 88.6 && tc < 98.7) { P.gaze = [1, 0]; P.look = 0.3; P.dir = -1;
    if (tc >= 89.06 && tc < 90.4) { const f = flow(tc, [[89.06, 0], [89.3, 1.1], [89.5, 1]]); P.handL = [K.lerp(-26, -100, f), K.lerp(-108, -165, f)]; P.handR = [K.lerp(24, 100, f), K.lerp(-112, -165, f)]; P.talk = abTalk(t, 89.06, 90.3, 7); if (P.talk) P.mouth = 'open'; P.sq *= 1 + 0.02 * f; }
    else if (tc < 91.2) { P.look = 0.6 * Math.sin((tc - 90.4) * Math.PI * 3.6); P.lid = 1; P.handR = PERSON_HANDS.chest.R; P.mouth = 'smile'; }
    else if (tc < 92.5) { P.gaze = [-1, 0]; P.look = -0.4; P.handR = [30, -150]; }
    else if (tc < 98.0) { P.gaze = tc < 95 ? [-0.6, -0.2] : [1, 0]; P.look = tc < 95 ? -0.3 : 0.3; P.talk = abTalk(t, 92.5, 97.9, 8, 0.6); if (P.talk) P.mouth = 'open'; P.handR = [60 + 30 * osc(tc, 0.9), -150 - 20 * osc(tc, 0.9, 0.25)]; if (tc > 96.9) { P.tilt = -0.06; P.brow = -0.4; P.mouth = P.talk ? 'open' : 'grin'; } }
    else { P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0; P.mouth = 'closed'; P.gaze = [1, 0]; P.sq *= landSquash(tc, 98.08, 0.05); } }
  // S13: the cup to the lips, the freeze, N-NO!, the fumble, the catch, the false laugh
  if (tc >= 98.7 && tc < 106.6) { P.gaze = [1, 0.1]; P.look = 0.2;
    if (tc >= 100.6 && tc < 104.04) { P.handR = [30, -168]; }
    if (tc >= 102.14 && tc < 104.04) { P.lid = 0; P.mouth = 'smile'; P.gaze = [1, 0]; P.brow = -0.6; P.tip = 0; if (tc >= 102.6 && tc < 103.6) { P.talk = abTalk(t, 102.6, 103.4, 9, 0.5); if (P.talk) P.mouth = 'o'; } }
    if (tc >= 104.04 && tc < 105.56) { const cf = cupFumble(tc - 0.07, 104.04), ce = cupFumble(Math.floor(tc / 0.07) * 0.07, 104.04), side = cf.dx < 0; P.lid = 0; P.mouth = 'o'; P.brow = -0.8; P.tip = 0.06 * Math.sign(-cf.dx);
      P.gaze = [K.clamp(-ce.dx / 80, -1, 1), K.clamp((ce.dy + 60) / 120, -1, 1)]; P.look = K.clamp(-ce.dx / 120, -0.6, 0.6);   // eyes follow the cup (saccades), hands a drawing late
      const ch = a2BodyPt({ ...P, sit: 1, seat: 'floor' }, 0, -130, A5_NM); if (side) P.handLW = [ch[0] - cf.dx * 0.8, ch[1] + cf.dy * 0.85 + 10]; else P.handRW = [ch[0] - cf.dx * 0.8, ch[1] + cf.dy * 0.85 + 10]; }
    if (tc >= 105.5 && tc < 106.6) { o.ringR = 12; o.ring = tc < 106.0 ? K.clamp((tc - 105.56) / 0.4) : 0; }
    if (tc >= 105.5) { P.handL = [6, -96]; P.handR = [-4, -94]; P.mouth = 'grin'; P.lid = 0.6; P.brow = -0.5; P.sq *= 1 + 0.03 * Math.abs(Math.sin((tc - 105.5) * 14)) * (tc < 106.4 ? 1 : 0); } }
  // S14: busy with his napkin; S15: laughing, the window, the freeze, I MUST GO!, three bows, the bolt
  if (tc >= 106.6 && tc < 113) { P.gaze = tc >= 110.3 && tc < 111.6 ? [0, 0.9] : [0.2, 0.6]; P.handR = [18 + 6 * osc(tc, 0.5), -150]; P.mouth = 'smile'; P.lid = tc >= 110.3 && tc < 111.6 ? 0.55 : 0.45; }   // rev 1: eyes down to his cup during the signal
  if (tc >= 113 && tc < 122.6) { P.gaze = [-0.4, 0]; P.look = -0.3;
    if (tc >= 115.5 && tc < 116.98) { P.mouth = 'grin'; P.sq *= 1 + 0.02 * Math.abs(Math.sin(tc * 11)); P.lid = 0.7; P.gaze = gazePlan(tc, [[115.5, [0.4, 0]], [116.3, [-0.6, -0.1]], [116.7, [-1, -0.2]]]); }
    if (tc >= 116.98 && tc < A5_UP_T) { P.lid = 0; P.mouth = 'grin'; P.gaze = [-1, -0.25]; P.brow = -0.7; P.tip = 0; P.sq = 1; }
    if (tc >= A5_UP_T - 0.4 && tc < 119.9) { const u = tc - (A5_UP_T - 0.4); P.sit = 1 - K.clamp((u - 0.25) / 0.3); P.seat = 'floor'; P.sq = u < 0.25 ? 0.94 : u < 0.55 ? 1.06 : 1; o.kick = 0.6 * swing(tc, A5_UP_T + 0.15, 1, 1.6, 3);
      if (tc >= A5_UP_T) { P.handR = [10, -118]; P.handL = [-40, -150]; P.talk = abTalk(t, A5_UP_T, 119.8, 10); P.mouth = P.talk ? 'open' : 'grin'; P.lid = 0.3; } }
    if (tc >= 119.9 && tc < 121.58) { const k = Math.floor((tc - 119.9) / 0.4); P.tip = [0.18, 0.12, 0.06, 0][Math.min(3, k)] * Math.sin(Math.PI * (((tc - 119.9) / 0.4) % 1)); P.gaze = [1, 0]; P.dir = -1; P.handR = PERSON_HANDS.chest.R; P.mouth = 'grin'; const Wb = walk(A5_GUEST_X, tc, { stride: 18 }); P.ph = Wb.ph; P.amp = Wb.amp * 0.8; }
    if (tc >= 121.58) { Object.assign(P, walk(A5_GUEST_X, tc, { stride: 40 })); P.dir = 1; P.tip = 0.16; P.amp = 1; P.gaze = [1, 0]; P.mouth = 'o'; P.handL = [-50, -140]; P.handR = [60, -150]; o.stream = 1; P.sq = 1.04; } }
  if (!sitting && tc >= 60.46 && tc < A5_UP_T - 0.4) P.sit = 1;
  return { P, o };
}
// ---------- Morgiana at dinner ----------
const A5_MX = (u) => kfn(u, [[52.6, 1105], [54.9, 1290], [58.2, 1290], [59.4, 1000], [68.5, 1000], [69.0, 1105], [80.6, 1105], [81.3, 1075]]);
function a5MorgR(t) {
  const tc = AB_T2(t), P = { ...a5Base(t, 521), x: A5_MX(tc), y: tc < 80.6 ? 852 : kfn(tc, [[80.6, 850], [81.3, 918]]), dir: 1, mouth: 'smile', gaze: [1, 0], handL: [-28, -104], handR: [28, -106] }, o = { kick: 0 };
  let tray = null, ewerP = null, vis = tc >= 52.6 && tc < 69.05 || tc >= 80.6 && tc < 122.0, beads = 0;
  if (tc < 55.0) { Object.assign(P, walk(A5_MX, tc, { stride: 16 })); P.handL = [30, -128]; P.handR = [50, -130]; tray = 1; P.gaze = [1, 0]; beads = 1 - K.clamp((tc - 52.6) / 0.6); }
  else if (tc < 58.2) { P.ph = 1.1; P.amp = 1; if (tc > 55.6) { P.amp = 1 - K.clamp((tc - 55.6) / 0.2); } P.handL = [30, -128]; P.handR = [50, -130]; tray = 1; P.gaze = gazePlan(tc, [[55.0, [1, 0]], [55.08, [-1, 0.1]], [57.38, [-1, 0.2]]], 0.06); P.look = tc > 55.16 ? -0.5 : 0; P.dir = 1;
    if (tc > 56.26 && tc < 56.9) { P.handL = [-6, -132]; } if (tc > 57.38) { P.brow = 0.5; P.mouth = 'closed'; } P.lid = tc > 55.0 && tc < 55.6 ? 0 : P.lid; }
  else if (tc < 59.4) { Object.assign(P, walk(A5_MX, tc, { stride: 16 })); P.dir = -1; P.gaze = [-1, 0]; tray = 1; P.handL = [30, -128]; P.handR = [50, -130]; }
  else if (tc < 68.5) { P.dir = -1; P.gaze = gazePlan(tc, [[59.4, [-1, 0.4]], [64.0, [1, 0.2]], [64.5, [-0.6, 0.4]], [65.7, [1, 0.1]], [66.4, [1, 0]], [67.8, [-1, 0.4]]], 0.1); P.look = tc > 65.7 && tc < 67.8 ? 0.4 : -0.2;
    ewerP = { tilt: tc > 65.2 && tc < 66.2 ? -0.7 * a5Win(tc, 65.2, 66.0) : 0, pour: a5Win(tc, 65.3, 65.95, 0.12, 0.12) }; P.handR = [52, -120]; P.handL = [-10, -110]; }
  else if (tc < 69.05) { Object.assign(P, walk(A5_MX, tc, { stride: 16 })); P.dir = 1; P.gaze = tc < 68.8 ? [-1, 0] : [1, 0]; beads = K.clamp((tc - 68.7) / 0.3); P.handL = [-34, -100]; }
  else if (tc < 81.3) { Object.assign(P, walk(A5_MX, tc, { stride: 16 })); P.dir = 1; tray = 2; P.handL = [30, -128]; P.handR = [50, -130]; beads = 1 - K.clamp((tc - 80.6) / 0.5); P.mouth = 'smile'; P.lid = 0.3; }
  else { P.kneel = K.clamp((tc - 81.0) / 0.4); P.sq *= landSquash(tc, 81.4, 0.05); P.dir = 1; P.gaze = [1, 0.2]; P.lid = Math.max(0.15, P.lid); P.handL = [-20, -110]; P.handR = [20, -112]; }
  if (tc >= 81.3 && tc < 122) {
    // rev 1: the simple food held up between them at chest height (80.9-83.4), then set on a small brass tray in clear view
    if (tc >= 81.3 && tc < 83.4) { tray = 3; const up = beatIn(tc, 81.3, 81.6); P.handL = [K.lerp(-20, 46, up), K.lerp(-110, -150, up)]; P.handR = [K.lerp(20, 66, up), K.lerp(-112, -152, up)]; P.gaze = [1, -0.1]; P.lid = 0.3; P.mouth = 'smile'; }
    if (tc >= 83.4 && tc < 83.9) { P.handRW = [1140, 905]; P.handLW = [1124, 900]; P.tip = 0.12; P.lid = 0.5; }
    if (tc >= 84.1 && tc < 85.1) { ewerP = { tilt: -0.8 * a5Win(tc, 84.1, 84.9), pour: a5Win(tc, 84.25, 84.85, 0.12, 0.12) }; P.handR = [56, -112]; P.gaze = [1, 0.7]; }
    if (tc >= 85.22 && tc < 86.4) { P.tilt = 0.12; P.talk = abTalk(t, 85.22, 86.3, 11, 0.6); P.mouth = P.talk ? 'open' : 'smile'; P.gaze = [1, -0.1]; P.lid = 0.15; }
    if (tc >= 87.8 && tc < 88.6) { P.lid = 0.55; P.gaze = [0.6, 0.8]; }
    if (tc >= 89 && tc < 98.7) { P.gaze = [1, -0.1]; ewerP = tc > 92.6 && tc < 94.4 ? { tilt: tc < 93.46 ? -0.6 : -0.15, pour: tc < 93.46 ? 1 : 0 } : null; if (ewerP) P.handR = [56, -112]; if (tc >= 93.46) { P.gaze = [1, -0.15]; P.lid = 0.1; P.brow = tc > 95.68 ? -0.4 : 0.2; } }
    if (tc >= 98.98 && tc < 100.6) { ewerP = { tilt: -0.7, pour: a5Win(tc, 99.1, 100.3, 0.1, 0.1) }; P.handR = [56, -112]; P.talk = abTalk(t, 98.98, 100.4, 12, 0.5); P.mouth = P.talk ? 'open' : 'smile'; P.gaze = [1, 0.3]; }
    if (tc >= 100.6 && tc < 106.6) { P.gaze = tc > 105.5 ? [1, -0.05] : [1, 0]; P.lid = tc > 102.1 ? 0.05 : 0.2; }
    if (tc >= 106.6 && tc < 113) { P.gaze = [-1, -0.1]; P.look = -0.5;
      // revision 1: the signal behind her back, under his nose: eyes to Ali Baba, head a drawing later, left hand up on the far side, two taps on the ring finger
      if (tc >= 110.3 && tc < 111.2) { P.gaze = [-1, 0]; P.look = tc < 110.42 ? 0 : -0.7; const up = beatIn(tc, 110.36, 110.5); P.handL = [K.lerp(-20, -72, up), K.lerp(-110, -192, up)];
        const tap = (tc >= 110.5 && tc < 110.62) || (tc >= 110.8 && tc < 110.92); P.handR = [K.lerp(20, -46, up), K.lerp(-112, tap ? -174 : -188, up)]; P.mouth = 'smile'; }
      if (tc >= 111.2 && tc < 111.56) { P.gaze = [1, 0]; P.look = 0.3; P.tilt = 0.12; P.handR = PERSON_HANDS.hush.R; P.handL = [-60, -170]; P.mouth = 'closed'; }
      if (tc >= 111.56 && tc < 111.9) { P.gaze = [-1, 0]; P.look = -0.5; P.handL = [-90, -176]; } }
    if (tc >= 113 && tc < 122) { P.gaze = tc > 120.7 ? [1, -0.1] : [1, 0]; P.look = tc > 120.7 ? 0.5 : 0; P.lid = 0.2; }
  }
  return { P, o, tray, ewer: ewerP, vis, beads };
}
// ---------- the family ----------
function a5AliR(t) { const tc = AB_T2(t), P = { ...a5Base(t, 541), x: DR.seats.ali, y: 905, dir: 1, sit: 1, seat: 'floor', mouth: 'smile', gaze: [1, 0], handL: [-26, -104], handR: [26, -106] };
  if (tc >= 51.2 && tc < 52.2) P.handRW = [K.lerp(560, 600, beatIn(tc, 51.2, 51.7)), 812];
  if (tc >= 58.1 && tc < 58.9) { P.handLW = [400, 880 - 14 * Math.abs(Math.sin((tc - 58.1) * Math.PI * 2.6))]; P.gaze = [1, -0.1]; P.brow = -0.5; P.tip = -0.05; }
  if (tc >= 69 && tc < 106) { P.gaze = [1, -0.05]; if (osc(tc, 4.3) > 0.6) { P.mouth = 'grin'; P.sq *= 1 + 0.015 * Math.abs(Math.sin(tc * 10)); } }
  if (tc >= 91.8 && tc < 92.5) { P.handR = [60, -170 - 14 * beatIn(tc, 91.8, 92.0)]; P.mouth = 'open'; P.lid = 0.2; P.gaze = [1, -0.1]; P.tip = -0.04; }   // rev 1: the cup raised to the guest (the cutaway)
  if (tc >= 105.9 && tc < 106.8) { P.mouth = 'grin'; P.sq *= 1 + 0.02 * Math.abs(Math.sin(tc * 12)); P.lid = 0.6; }
  if (tc >= 110.8 && tc < 113) { const dt = tc - 111.88; P.handR = dt < 0.35 ? [40, -165] : PERSON_HANDS.chest.R; P.gaze = dt < 0 ? [1, -0.05] : [1, 0.05]; P.look = dt > 0.15 ? 0.5 : 0; P.lid = dt > 0 ? 0 : P.lid; P.mouth = dt > 0 ? 'o' : 'smile';
    P.tip = dt > 0.3 ? -0.06 : 0; P.brow = dt > 0 ? -0.8 : 0; if (dt > 0.32) { P.handL = [70, -120]; } }
  if (tc >= 113 && tc < 122.6) { P.gaze = tc < 116 ? [-1, -0.2] : [1, 0]; P.lid = 0.1; P.mouth = 'closed'; P.brow = -0.6; if (tc > 120.7) { P.sit = 1 - 0.4 * beatIn(tc, 120.7, 121.0); P.handR = [90, -150]; P.mouth = 'o'; } }
  return P; }
function a5WifeR(t) { const tc = AB_T2(t), P = { ...a5Base(t, 551), x: DR.seats.wife, y: DR.backY, dir: tc < 80 ? 1 : -1, sit: 1, seat: 'floor', mouth: 'smile', gaze: [1, 0.2], handL: [-26, -104], handR: [26, -106] };
  if (tc >= 51.2 && tc < 52.4) { P.handRW = [K.lerp(700, 720, Math.sin(tc * 9) * 0.5 + 0.5), 800]; P.gaze = [1, 0.8]; } if (tc >= 51.8 && tc < 52.2) P.handLW = [760, 806];
  if (tc >= 87.8 && tc < 88.6) { P.handRW = [690, 808]; P.gaze = [0.2, 0.8]; }
  if (tc >= 105.9 && tc < 107) { P.dir = 1; P.handR = [80, -130]; P.gaze = [1, 0]; }
  if (tc >= 112.3 && tc < 122.6) { P.lid = 0; P.mouth = 'closed'; P.gaze = [-1, 0]; P.tip = 0; P.sq = 1; P.handR = PERSON_HANDS.mouthCover.R; }
  return P; }
function a5KidR(t) { const tc = AB_T2(t), P = { ...a5Base(t, 561), x: DR.seats.kid, y: DR.backY, dir: 1, sit: 1, seat: 'floor', mouth: 'smile', gaze: [0.4, 0.3], handL: [-20, -100], handR: [20, -102] };
  if (tc >= 51.2 && tc < 52.2) { P.handRW = tc < 51.8 ? [K.lerp(820, 955, beatIn(tc, 51.2, 51.7)), 808] : [800, 830]; P.gaze = [1, 0.6]; if (tc > 51.85) P.mouth = 'grin'; }
  if (tc >= 57.38 && tc < 58.4) P.gaze = gazePlan(tc, [[57.38, [1, -0.1]], [57.8, [1, 0]], [58.1, [1, -0.1]]], 0.06);
  if (tc >= 83.3 && tc < 84.2 || tc >= 105.9 && tc < 106.8) { P.handR = PERSON_HANDS.mouthCover.R; P.mouth = 'grin'; P.sq *= 1 + 0.03 * Math.abs(Math.sin(tc * 14)); P.lid = 0.6; P.gaze = [1, 0]; }
  if (tc >= 112.2 && tc < 122.6) { P.gaze = [-1, -0.5]; P.mouth = 'o'; P.dir = -1; P.tip = -0.08; }
  return P; }
const A5_NX = (u) => kfn(u, [[51, 1430], [52.6, 1430], [56.0, 930]]);
function a5NephR(t) { const tc = AB_T2(t), seated = tc >= 56.3, P = { ...a5Base(t, 571), x: A5_NX(tc), y: seated ? DR.backY : kfn(tc, [[52.6, 905], [55.4, 905], [56.0, DR.backY]]), dir: seated ? -1 : 1, mouth: 'smile', gaze: [1, 0], handL: [-20, -104], handR: [20, -106] }, o = {};
  if (tc < 52.6) { P.gaze = [1, 0.3]; if (tc < 52.2) { P.handRW = [K.lerp(1470, 1545, beatIn(tc, 51.5, 52.1)), 812 - 30 * (1 - beatIn(tc, 51.5, 52.1))]; P.handLW = [P.handRW[0] - 22, P.handRW[1]]; o.boxW = tc < 52.1 ? 1 : 0; } P.tip = 0.05; P.mouth = 'grin'; }
  else if (tc < 56.3) { Object.assign(P, walk(A5_NX, tc, { stride: 20 })); P.dir = -1; P.gaze = [-1, 0]; }
  else { P.sit = K.clamp((tc - 56.0) / 0.3); P.seat = 'floor'; P.gaze = [1, 0]; }
  if (tc >= 62.4 && tc < 63.4) { P.handRW = [K.lerp(980, 1105, beatIn(tc, 62.4, 62.8)), 812]; P.tip = -0.12; P.dir = 1; o.bread = 1; }
  if (tc >= 89 && tc < 98.7) { P.gaze = [1, 0]; if (tc > 91.2 && tc < 92.2) P.tilt = 0.08 * Math.sin((tc - 91.2) * Math.PI * 4); if (tc >= 98.08) { P.tilt = 0.16; P.mouth = 'closed'; P.brow = -0.5; } }
  if (tc >= 113 && tc < 122.6) { P.gaze = [1, 0]; P.mouth = tc > 120.7 ? 'o' : 'smile'; P.lid = tc > 120.7 ? 0 : P.lid; }
  return { P, o }; }

// ---------- the room world for any dinner shot ----------
// o: {win (street view opts), dotted p, arrow, band {..} (the light band on the guest, S14), guestDraw(ctx, P, o) override}
function a5RoomWorld(ctx, t, cam, o = {}) {
  const tc = AB_T2(t), M = a5MorgR(t), G = a5GuestR(t), N = a5NephR(t);
  dinnerRoom(ctx, t, cam, { door: { open: 1, blow: t > 121.5 && t < 122.6 ? swing(t, 121.6, 1, 1.4, 2) : 0, view: (c) => a5YardView(c, t, { bar: t > 79.36 ? 1 : 0 }) },
    win: { view: (c) => a5StreetView(c, t, { m: t < 69 ? 'evening' : 'night', fig: o.winFig }) }, beads: M.beads, bpx: 1105 });
  // gift box on the chest (from 52.1)
  if (t >= 52.1) giftBox(ctx, 1545, DR.chest.top, 1.7, { glint: t > 52.1 && t < 52.6 ? (t - 52.1) / 0.5 : t > 120.7 && t < 121.3 ? (t - 120.7) / 0.6 : 0 });
  // cushions (seats): the honour cushion, the guest's teal one (squash on the sit; knocked over at 120.3)
  drCushion(ctx, 395, 912, DR.cush.honour, 1, 0);
  const kn = t > 120.3 ? Math.min(1, (t - 120.3) / 0.3) : 0, gsq = t > A5_SIT_T + 0.25 && t < A5_SIT_T + 0.6 ? 0.8 : 1; drCushion(ctx, 1220 + 40 * kn, 915 + 4 * kn, DR.cush.guest, gsq, kn * (1.2 + (t > 121.58 ? (t - 121.58) * 6 : 0)));
  // behind the table: wife, child, nephew (and Morgiana when she stands behind the table)
  const back = [{ y: DR.backY, d: (c) => abWife(c, a5WifeR(t), A5_RM) }, { y: DR.backY + 1, d: (c) => abKid(c, a5KidR(t), A5_RM) }];
  for (const [x, col] of [[640, DR.cush.wife], [780, DR.cush.kid], [930, DR.cush.neph]]) drCushion(ctx, x, DR.backY + 6, col, 0.9);
  const nb = (c) => { abNephew(c, t, N.P, A5_RM, { shc: A5_RSH, box: N.o.boxW ? 1.4 : 0 }); if (N.o.bread) { const [hx, hy] = a2Hand(N.P, 1, A5_NEPH); abBlob(c, hx, hy - 4, 22, 9, '#f0c47a', '#c08a4a', { lw: 2 }); } };
  const mb = (c) => { if (!M.vis) return; const P = M.P; morgiana(c, t, P, A5_RM, { shc: A5_RSH, kick: P.amp ? 0.3 : 0 }); if (M.tray) { const [hx, hy] = a2Hand(P, 1, A3_MORG); const tx = hx - 14; abBlob(c, tx, hy - 4, 46, 9, '#ffcf3a', '#c08a1a', { lw: 2.5 });
      const rat = t > 56.26 && t < 56.9 ? 2 * Math.sin(t * 60) : 0; if (M.tray === 1) for (const dx of [-26, 0, 26]) teaCup(c, tx + dx + rat, hy - 8, 0.9, { tea: 0 }); else if (M.tray === 3) { const [lx, ly] = a2Hand(P, 0, A3_MORG); lentilBowl(c, (lx + hx) / 2 + 2, Math.min(ly, hy) + 4, 1.4, { pale: 1, t }); } else { lentilBowl(c, tx, hy - 8, 0.8); } }
    if (M.ewer) { const [hx, hy] = a2Hand(P, 1, A3_MORG); ewer(c, hx, hy, M.ewer.tilt * Math.sign(P.dir || 1), 0.9, { pour: M.ewer.pour, to: t < 70 ? [P.x - 70, 830] : [1170, 925] }); }
    if (t >= 68.6 && t < 69.1) { const [hx, hy] = a2Hand(P, 0, A3_MORG); abBlob(c, hx, hy + 20, 18, 26, '#c8743a', '#8a4a1e', { lw: 2.5 }); } };
  const backList = [...back, { y: DR.backY + 2, d: nb }]; if (M.vis && M.P.y < 870) backList.push({ y: M.P.y - 30, d: mb });
  for (const b of abByY(backList)) b.d(ctx);
  // the table front pass, then the people in front of it
  drTable(ctx, t, { steam: 1 }); a5Steam(ctx, 860, DR.table.top - 64, t + 0.4, 0.8, 2);
  if (t < 80.6 || t >= 104.04) teaCup(ctx, 1000, DR.table.top - 8, 1.3, { tea: 0.8 });
  const front = [{ y: 905, d: (c) => a2Ali(c, a5AliR(t), A5_RM, { shc: A5_RSH }) }];
  front.push({ y: G.P.y, d: (c) => { if (o.band) disguiseWipe(c, o.band, (cc) => abNewMerchant(cc, t, G.P, A5_RM, { ...G.o, shc: A5_RSH }), (cc) => a5LeaderAs(cc, t, G.P, A5_RM, {}), t); else abNewMerchant(c, t, G.P, A5_RM, { ...G.o, shc: A5_RSH }); } });
  if (M.vis && M.P.y >= 870) front.push({ y: M.P.y + 1, d: mb });
  // props on the rug by the guest: the lentil bowl (82.04), his tea cup (84.1; in his hand 100.6-104; the fumble; caught)
  if (t >= 83.8) { abBlob(ctx, 1135, 938, 46, 10, '#ffcf3a', '#c08a1a', { lw: 2.5 }); lentilBowl(ctx, 1135, 932, 1.3, { pale: 1, t }); }
  for (const f of abByY(front)) f.d(ctx);
  a5GuestCup(ctx, t, G.P);
  if (t >= 105.5 && t < 106.6) for (let k = 0; k < 3; k++) { const u = beatIn(t, 105.5 + k * 0.12, 105.75 + k * 0.12); if (u > 0) abBlob(ctx, 1150 + k * 26, K.lerp(860, 945, u), 5, u < 1 ? 7 : 3, '#d8781a', '#a8501a', { lw: 0 }); }
  // the dotted escape route (66.2 - 69): his cushion -> the door -> through the view to the gate
  if (t >= 66.2 && t < 69) { const pts = K.bezier([1235, 870], [1330, 880], [1390, 840], [1398, 790], 40), n = Math.floor(pts.length * beatIn(t, 66.2, 67.66)); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 68.6) / 0.4); ctx.fillStyle = '#7fe3ff'; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 10;
    for (let i = 0; i < n; i += 2) { ctx.beginPath(); ctx.arc(pts[i][0], pts[i][1], i > 30 ? 3.5 : 6, 0, 7); ctx.fill(); } if (t > 67.6) abGlow(ctx, 1398, 790, 50, 0.6 + 0.4 * Math.sin(t * 12), '#7fe3ff'); ctx.restore(); }
}
// the guest's tea cup: on the rug, raised to sip (100.6), the freeze, the fumble (104.04), caught at the chest (105.5)
function a5GuestCup(ctx, t, P) { if (t < 84.2) return; const tea = t < 84.5 ? K.clamp((t - 84.2) / 0.3) * 0.9 : t < 99.1 ? 0.6 : t < 100.3 ? 0.6 + 0.4 * beatIn(t, 99.1, 100.3) : t < 104.5 ? 1 : 0.2;
  if (t < 100.6 || t > 106.6) { teaCup(ctx, 1165, 940, 1.5, { tea }); return; }
  const [hx, hy] = a2Hand(P, 1, A5_NM);
  if (t < 104.04) { teaCup(ctx, hx - 4, hy + 6, 1.5, { tea, rot: t > 102.14 ? 0.03 * Math.sin(t * 40) : 0 }); return; }
  const ch = a2BodyPt(P, 0, -130, A5_NM), cf = cupFumble(t, 104.04); teaCup(ctx, ch[0] - cf.dx, ch[1] + cf.dy + 10, 1.5, { tea, rot: cf.rot });
  if (cf.spill > 0) { ctx.save(); ctx.fillStyle = '#e8902a'; for (let k = 0; k < 6; k++) { const a = -1.2 + k * 0.4, r = 20 + 40 * cf.spill; ctx.globalAlpha = cf.spill; ctx.beginPath(); ctx.arc(ch[0] - cf.dx + Math.cos(a) * r, ch[1] + cf.dy - 10 + Math.sin(a) * r * 0.7, 5, 0, 7); ctx.fill(); } ctx.restore(); } }
