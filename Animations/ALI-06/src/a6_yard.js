// ===== ALI-06 the night courtyard S1-S10 (0-71.14) as continuity data: one pose function per person for the whole stand-off, one
// world function for every courtyard shot (the shots in a6_s1.js only frame it and add balloons). Blocking (world x, ground y 908):
// the house door K 170, bench 320..480, lemon tree 600, street gate cx 730 (bar 780, padlock), lantern 840, jars 890..1120,
// back gate cx 1590. Opening = ALI-05's last frame (Morgiana at 170 holding up the gift, the guest at 499 by the lemon tree, the
// helmets behind the coping, Ali Baba and the nephew in the doorway).
const A6_NSH = '#4a3a7a', A6_DSH = '#3a2a4a', A6_ESH = '#7a4a5a';
const A6_GY = 908;
const a6Streak = (ctx, S, from, to, t, a, b) => { if (t < a || t > b + 0.3) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - b) / 0.3); S.arrow(ctx, from, to, K.clamp((t - a) / 0.35), { color: '#7fe3ff', bend: -0.2 }); ctx.restore(); };
// a walker: x, ph, amp from a position function, dir from its velocity (def while standing)
function a6Walk(xf, tc, def = 1, stride = 16) { const W = walk(xf, tc, { stride }), v = xf(tc + 0.04) - xf(tc - 0.04); return { ...W, dir: Math.abs(v) > 0.4 ? Math.sign(v) : def }; }
function a6Drop(ctx, x, y, p) { if (p <= 0 || p >= 1) return; ctx.save(); ctx.translate(x, y + 30 * p); ctx.globalAlpha *= 1 - p * 0.6; shape(ctx, [[0, -14], [7, 0], [0, 7], [-7, 0]], '#9ad8ff', { lw: 2, line: '#2a5a8a' }); ctx.restore(); }

// ---------- positions (x keys) ----------
const A6_MX = (u) => kfn(u, [[0, 215], [0.15, 215], [1.4, 390], [11.74, 390], [12.1, 372], [23.6, 372], [24.1, 440], [44.78, 440], [45.6, 470], [55.0, 470], [56.0, 600], [59.98, 600], [61.2, 650], [66.9, 650], [67.28, 708], [67.9, 708], [68.6, 620]]);
const A6_GX = (u) => kfn(u, [[0, 660], [0.25, 660], [1.3, 500], [1.5, 488], [16.45, 488], [17.1, 518], [18.42, 520], [19.2, 690], [36.84, 690], [37.8, 640], [55.0, 640], [57.0, 760], [68.6, 760], [69.4, 748], [69.75, 748], [70.6, 715]]);
const A6_AX = (u) => kfn(u, [[11.2, 175], [11.3, 175], [11.9, 250], [23.6, 250], [23.75, 250], [24.4, 330], [28.06, 330], [28.6, 300], [54.6, 300], [56.4, 500], [67.6, 500], [68.4, 470]]);
const A6_NX = (u) => kfn(u, [[11.2, 172], [27.8, 172], [28.1, 222], [28.4, 205], [44.78, 205], [45.6, 400]]);
const A6_GUARDX = [ // tall, stout, young, captain: in by the back gate, to the half ring; out with the procession
  // revision 1 (notes 1, 7): a staggered half ring (captain 60 px further right), then the procession in profile with ~110 px gaps:
  // guest 748, young guard 870, captain 970, tall 1080, stout 1190; nobody crosses the guest; the neighbour stays at the back gate
  (u) => kfn(u, [[55.2, 1590], [57.08, 1080], [70.0, 1080], [70.6, 1010]]),
  (u) => kfn(u, [[55.45, 1590], [57.2, 1190], [70.0, 1190], [70.6, 1120]]),
  (u) => kfn(u, [[55.7, 1590], [57.3, 1300], [62.7, 1300], [63.5, 870], [70.0, 870], [70.6, 800]]),
  (u) => kfn(u, [[54.96, 1590], [57.0, 970], [70.0, 970], [70.6, 900]]),
];
const A6_NEIGHX = (u) => kfn(u, [[56.38, 1590], [57.6, 1530]]);

// ---------- Morgiana ----------
function a6M(t) { const tc = AB_T2(t), W = a6Walk(A6_MX, tc, 1, 15);
  const P = { ...a5Base(t, 601), ...W, y: 916 - 8 * beatIn(tc, 0.15, 0.6), dir: 1, mouth: 'smile', gaze: [1, 0.1], handL: [-24, -104], handR: [30, -110] }, o = { kick: 0 }; let box = null, key = 'sash';
  if (tc < 1.52) { const u = beatIn(tc, 0.3, 0.9); P.handL = [52, -140]; P.handR = [70, -142]; P.gaze = [1, K.lerp(0, 0.35, u)]; box = 'R'; P.mouth = 'smile';   // rev 1: ALI-05's last frame
    P.lid = Math.max(P.lid, K.lerp(0.42, 0.15, u)); P.brow = K.lerp(-0.35, 0, u); P.tilt = K.lerp(0.05, 0, u); }
  else if (tc < 2.1) { const u = beatIn(tc, 1.52, 2.0); P.handRW = [K.lerp(420, 432, u), K.lerp(772, 732, K.ease.out(u))]; P.handL = [36, -128]; P.gaze = [1, 0.5]; P.tip = 0.06; o.kick = 0.4; }
  else if (tc < 7.6) { P.gaze = [1, 0.25]; P.mouth = tc < 2.8 ? 'smile' : 'closed'; P.brow = 0.15; }
  else if (tc < 11.74) { P.mouth = 'closed'; P.brow = 0.1; P.gaze = gazePlan(tc, [[7.6, [1, 0.25]], [7.76, [-0.5, -0.8]], [10.2, [1, 0.2]]], 0.18); P.lid = Math.max(P.lid, abBlinkAt(AB_T3(t), 7.8)); P.tilt = tc > 7.76 && tc < 10.2 ? -0.05 : 0; }
  else if (tc < 16.45) { P.mouth = 'closed'; P.brow = 0.35; const up = beatIn(tc, 11.9, 12.3) * (1 - beatIn(tc, 15.2, 15.8)); P.handR = [K.lerp(30, 104, up), K.lerp(-110, -156, up)]; P.tip = -0.04 * up; P.gaze = [1, 0];
    P.talk = abTalk(t, 12.44, 15.0, 21, 0.5); if (P.talk) P.mouth = 'open'; }
  else if (tc < 22.86) { P.mouth = 'closed'; P.brow = 0.3; P.gaze = gazePlan(tc, [[16.45, [1, 0]], [18.5, [1, -0.1]]], 0.2); P.look = tc > 18.4 ? 0.3 : 0; }
  else if (tc < 23.6) { const u = beatIn(tc, 22.86, 23.1); P.handR = [K.lerp(30, 40, u), K.lerp(-110, -196, u)]; P.brow = -0.35; P.mouth = 'smile'; P.gaze = [1, 0]; key = 'hand'; }
  else if (tc < 35.58) { P.gaze = [1, 0]; P.mouth = 'closed'; P.brow = 0.3;
    if (tc < 24.5) { const u = 1 - beatIn(tc, 24.0, 24.45); P.handR = [K.lerp(30, 40, u), K.lerp(-110, -196, u)]; key = tc < 24.3 ? 'hand' : 'sash'; }   // rev 1 note 6: the key held up, lowered by 24.5
    if (tc >= 23.7 && tc < 28.58) { const a = beatIn(tc, 23.7, 23.92) * (1 - beatIn(tc, 28.3, 28.58)); P.handL = [K.lerp(-24, -112, a), K.lerp(-104, -128, a)]; o.kick = 0.5 * swing(tc, 23.8, 1, 1.4, 3); }   // rev 1 note 3: the near arm straight back, palm in the gap
    if (tc >= 24.0 && tc < 24.55) { P.gaze = [-1, 0]; P.look = -0.15; }   // eyes flick to him one drawing late, head stays on the guest
    if (tc >= 29.18) { const a = beatIn(tc, 29.18, 29.5); P.handL = [K.lerp(-24, -40, a), K.lerp(-104, -82, a)]; P.handR = [K.lerp(30, 40, a), K.lerp(-110, -82, a)]; P.x += 6 * a; P.brow = 0.4; }
    P.talk = abTalk(t, 30.48, 34.2, 22, 0.5); if (P.talk) P.mouth = 'open'; }
  else if (tc < 54.21) { P.gaze = tc > 44.78 && tc < 46.8 ? [1, 0] : [1, 0]; P.mouth = 'closed'; P.brow = 0.3; const f = beatIn(tc, 39.9, 40.3);
    P.handL = f > 0 ? PERSON_HANDS.folded.L : PERSON_HANDS.hipsHands.L; P.handR = f > 0 ? PERSON_HANDS.folded.R : PERSON_HANDS.hipsHands.R; P.y = tc > 45.6 ? 896 : A6_GY;
    if (tc > 38.2 && tc < 41.0) P.tip += 0.02 * beatIn(tc, 38.2, 38.6) * (1 - beatIn(tc, 40.6, 41.0));   // rev 1 note 9: a weight shift
    if (tc >= 50.46) { P.tip = 0.07 * beatIn(tc, 50.46, 50.8) * (1 - beatIn(tc, 53.4, 54.0)); P.lid = Math.max(P.lid, 0.35); P.brow = 0.45; } }
  else if (tc < 59.98) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.mouth = 'closed'; P.gaze = tc < 57.6 ? [1, 0] : [1, 0.05]; }
  else if (tc < 67.28) { P.dir = 1; P.gaze = [1, 0]; P.mouth = 'closed'; P.brow = 0.2;
    if (tc >= 61.74 && tc < 63.5) { const a = beatIn(tc, 61.74, 62.0); P.handR = [K.lerp(30, 70, a), K.lerp(-110, -190, a)]; P.gaze = [1, -0.5]; }
    else if (tc >= 63.5) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; } }
  else { P.mouth = 'closed'; P.brow = 0.15; P.gaze = [1, 0];
    if (tc < 67.6) { P.handRW = [726, 806 + 3 * Math.sin(tc * 30)]; P.handL = [30, -120]; }
    else if (tc < 67.9) { const u = beatIn(tc, 67.6, 67.85); P.handLW = [700, 782 - 56 * u]; P.handRW = [758, 782 - 56 * u]; }
    else { P.dir = tc < 68.6 ? -1 : 1; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; if (tc > 69.48) { P.gaze = [1, -0.05]; P.lid = Math.max(P.lid, 0.1); P.brow = 0; } } }
  return { P, o, box, key }; }

// ---------- the guest ----------
function a6G(t) { const tc = AB_T2(t), W = a6Walk(A6_GX, tc, -1, tc > 18.4 && tc < 19.3 ? 40 : 16);
  const P = { ...a5Base(t, 611), ...W, y: A6_GY, dir: -1, mouth: 'grin', lid: 0.45, brow: -0.2, gaze: [-1, 0], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R };
  const o = { cuffR: tc < 1.52 ? 1 : 1 - beatIn(tc, 1.52, 1.7), cuffL: 1, ring: 0, stream: 0, kick: 0, droop: 0, feather: lagged((u) => A6_GX(u) * 0.004, tc, 0.25, 1) }; let box = null, sweat = 0, rope = false;
  if (tc < 0.7) { P.handR = [-12, -128]; P.handL = [-24, -104]; P.mouth = 'grin'; P.brow = -0.4; P.lid = 0; P.gaze = [-1, 0]; }   // rev 1: ALI-05's last frame (grin, at the gate)
  else if (tc < 1.52) { const u = beatIn(tc, 0.7, 1.1); P.handR = [K.lerp(-12, 70, u), K.lerp(-128, -130, u)]; P.handL = [-26, -104]; P.mouth = 'smile'; P.lid = 0.3; P.tip = -0.03; P.gaze = gazePlan(tc, [[0.7, [-1, 0]], [0.95, [1, 0]], [1.2, [-1, 0.3]]], 0.06); }
  else if (tc < 7.6) { P.handR = [70, -130]; P.handL = [-26, -104]; box = 'R'; const fz = pulse(tc, 2.06, 0.5); P.sq *= 1 + 0.06 * fz; P.drop = -6 * fz; P.gaze = tc < 2.06 ? [-1, 0.3] : [-0.5, 0.9]; P.mouth = tc < 2.6 ? 'smile' : 'closed'; P.brow = tc < 2.6 ? 0.2 : 0.8; P.lid = 0.3;
    o.ring = tc > 2.78 && tc < 3.5 ? (tc - 2.78) / 0.72 : 0; }
  else if (tc < 13.2) { P.handR = [70, -130]; P.handL = [-26, -104]; box = 'R'; P.mouth = 'closed'; P.brow = 0.8; P.lid = 0.3; P.gaze = [-1, 0.2];
    if (tc >= 10.2) { const u = beatIn(tc, 10.2, 10.5); P.handR = [K.lerp(70, 34, u), K.lerp(-130, -118, u)]; P.handL = [K.lerp(-26, 30, u), K.lerp(-104, -122, u)]; P.gaze = [1, 0]; P.look = 0.3; } }
  else if (tc < 16.45) { P.handR = [34, -118]; P.handL = [30, -122]; P.mouth = 'o'; P.brow = 0.9; P.lid = 0; P.tip = -0.05 * beatIn(tc, 13.2, 13.5);
    P.gaze = tc < 13.6 ? [-0.3, 1] : tc < 15.4 ? [-1, 0] : gazePlan(tc, [[15.4, [-1, 0]], [15.6, [-1, -0.2]], [15.85, [1, 0]], [16.1, [-1, 0.1]]], 0.06); P.sq *= 1 + 0.02 * Math.sin(tc * 14); }
  else if (tc < 18.42) { P.handR = [40, -150]; P.handL = [-40, -150]; P.mouth = Math.floor(tc * 6) % 3 === 0 ? 'smile' : 'closed'; P.brow = 0.8; P.lid = 0.2; P.gaze = tc < 17.68 ? [-1, 0] : [1, 0];
    if (tc >= 17.68) { P.sq *= anticipate(tc, 17.68, 0.7, 0.08); P.drop = 10 * beatIn(tc, 17.68, 18.0); P.tip = -0.08; } }
  else if (tc < 19.28) { P.dir = 1; P.tip = 0.14; P.amp = 1; o.stream = 1; P.handL = [-50, -140]; P.handR = [60, -150]; P.mouth = 'o'; P.brow = 0.7; P.lid = 0.1; P.gaze = [1, 0]; }
  else if (tc < 21.9) { P.dir = 1; P.amp = 0; P.mouth = 'closed'; P.brow = 0.9; P.gaze = [1, -0.1]; P.lid = 0.2;
    const hv = Math.max(pulse(tc, 19.3, 0.7), 0.6 * pulse(tc, 21.08, 0.35), 0.3 * pulse(tc, 21.45, 0.35)); P.tip = -0.12 * hv; P.sq *= 1 - 0.06 * hv; P.handLW = [712 + 10 * hv, 762]; P.handRW = [744 + 10 * hv, 760]; P.tilt = tc > 21.08 ? 0.06 : 0; }
  else if (tc < 22.86) { const tr = tc > 22.2; P.dir = tr ? -1 : 1; P.lid = Math.max(abBlinkAt(AB_T3(t), 22.16), 0.25); P.tip = -0.04; P.drop = 6; P.gaze = tr ? [-1, 0.1] : [1, 0]; P.mouth = 'closed'; P.brow = 0.85; P.handL = [-26, -104];
    P.handR = tr && tc > 22.3 ? [20, -215] : [26, -104]; P.tilt = tc < 22.5 ? 0.06 : 0; }
  else if (tc < 35.58) { P.dir = -1; P.mouth = 'closed'; P.brow = 0.85; P.lid = 0.25; P.handL = [-26, -104]; P.handR = [26, -104]; P.sq *= 1 + 0.012 * Math.sin(tc * 7);
    P.gaze = tc < 23.7 ? gazePlan(tc, [[22.86, [1, 0.3]], [23.15, [-1, -0.35]], [23.45, [-1, 0.05]]], 0.06) : tc < 31.3 ? [-1, 0.05] : tc < 33.58 ? gazePlan(tc, [[31.3, [-1, 0]], [31.55, [1, 0]], [31.8, [0.2, -1]], [32.05, [1, 0.1]], [32.3, [-1, 0]]], 0.06) : gazePlan(tc, [[33.66, [0.5, -0.9]], [34.4, [-1, 0.05]]], 0.08);
    P.look = P.gaze[0] * 0.3; sweat = tc > 31.8 && tc < 33.0 ? (tc - 31.8) / 1.2 : 0; if (tc > 33.9 && tc < 34.3) P.drop = 4 * Math.sin(Math.PI * beatIn(tc, 33.9, 34.3)); }
  else if (tc < 44.78) { P.dir = -1; P.gaze = [-1, 0]; const st = Math.min(2, Math.floor(Math.max(0, tc - 35.58) / 0.24)); P.brow = [0.7, 0.45, 0.2][st]; P.lid = 0.3; P.mouth = ['closed', 'smile', 'grin'][st];
    if (tc < 35.95) P.handR = [20, -205]; else if (tc < 36.4) { P.handL = [-20, -100 + 8 * Math.sin(tc * 20)]; P.handR = [20, -100]; }
    else if (tc < 38.5) { const a = beatIn(tc, 36.84, 37.2); P.handL = [K.lerp(-26, -95, a), K.lerp(-104, -130, a)]; P.handR = [K.lerp(26, 95, a), K.lerp(-104, -130, a)]; P.tip = 0.06 * pulse(tc, 37.4, 0.7); }
    else if (tc < 40.72) { P.handL = [-60, -110]; P.handR = tc > 39.26 && tc < 39.6 ? [12, -112 + 6 * Math.sin(tc * 30)] : tc >= 39.6 ? [K.lerp(40, 95, beatIn(tc, 39.6, 39.9)), -132 + 4 * Math.abs(Math.sin(tc * 18))] : [60, -120]; P.gaze = tc > 39.4 ? [-0.6, 0.3] : [-1, 0]; }
    else if (tc < 42.48) { P.handR = PERSON_HANDS.chest.R; P.handL = [-34 + 10 * Math.cos(tc * 9), -175 + 10 * Math.sin(tc * 9)]; P.mouth = tc < 41.84 ? 'open' : 'o'; P.gaze = [-0.6, -0.8]; P.look = -0.2; }
    else if (tc < 44.02) { P.handR = PERSON_HANDS.chest.R; P.handL = [-30, -120]; const rel = pulse(tc, 43.4, 0.4); P.sq *= 1 + 0.05 * rel; P.y -= 10 * rel; }
    else { P.handL = [-22, -205]; P.handR = [26, -104]; sweat = (tc - 44.02) / 0.76; P.mouth = Math.floor(tc * 4) % 2 ? 'smile' : 'closed'; P.brow = 0.5; }
    if (tc >= 38.5) { P.talk = abTalk(t, 38.5, 40.6, 31, 0.6) || abTalk(t, 42.48, 43.9, 32, 0.6); if (P.talk) P.mouth = 'open'; } }
  else if (tc < 54.21) { P.dir = -1; P.mouth = tc < 46.8 ? 'grin' : 'smile'; P.lid = 0.3; P.brow = tc < 46.8 ? 0.2 : 0.5; P.gaze = [-1, 0.05]; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R;
    if (tc >= 48.46 && tc < 49.7) { P.talk = abTalk(t, 48.46, 49.0, 33, 0.8); P.mouth = P.talk ? 'open' : 'o'; P.handR = tc > 48.8 ? [56, -225] : [40, -150]; P.lid = 0; }
    else if (tc >= 49.7 && tc < 53.3) { P.handL = PERSON_HANDS.mouthCover.L; P.handR = PERSON_HANDS.mouthCover.R; P.lid = 0; P.brow = 0.9; P.mouth = 'closed';
      if (tc > 52.7) { P.sq *= 0.93 + 0.004 * Math.sin(tc * 50); P.drop = 14; P.x += tremble(tc, 1, 9); P.gaze = [1, 0]; } }
    else if (tc >= 53.3) { P.drop = 14 * (1 - beatIn(tc, 53.3, 53.8)); P.handL = [-26, -104]; P.handR = [26, -104]; P.mouth = tc < 53.9 ? 'smile' : 'closed'; P.brow = 0.7; } }
  else if (tc < 59.98) { P.dir = -1; P.mouth = 'closed'; P.brow = 0.85; P.lid = 0.2; P.handL = [-30, -110]; P.handR = [30, -110]; P.amp = Math.min(P.amp, 0.6);
    P.gaze = tc < 58.26 ? [1, 0] : gazePlan(tc, [[58.26, [-1, 0]], [58.45, [1, 0]], [58.62, [0.2, -1]]], 0.06);
    if (tc >= 58.74) { const u = K.ease.inOut(beatIn(tc, 58.74, 59.6)); P.handL = [K.lerp(-30, -58, u), K.lerp(-110, -196, u)]; P.handR = [K.lerp(30, 58, u), K.lerp(-110, -196, u)]; P.drop = 8 * beatIn(tc, 58.74, 59.0); P.lid = 0.45; P.gaze = [-1, 0.3];
      o.cuffL = 1 - u; o.cuffR = 0; o.droop = u; } }
  else if (tc < 67.28) { P.dir = -1; P.mouth = 'closed'; P.brow = 0.85; P.lid = tc > 66.54 ? 1 : 0.45; P.drop = 8; P.handL = [-58, -196 + tremble(tc, 1.5, 4)]; P.handR = [58, -196]; o.cuffL = 0; o.cuffR = 0; o.droop = 1;
    o.ring = tc > 62.58 && tc < 63.3 ? (tc - 62.58) / 0.7 : 0; P.gaze = tc < 63.58 ? [-1, 0.2] : [1, 0.3]; }
  else { P.mouth = 'closed'; P.brow = 0.8; P.lid = 0.45; P.drop = 8; o.cuffL = 0; o.cuffR = 0; o.droop = 1; rope = true; P.handL = [20, -112]; P.handR = [30, -108]; P.dir = -1;
    P.tip = 0.04; P.sq *= 0.96; P.handL = [14, -100]; P.handR = [26, -98];   // rev 1 note 1: hands low together, tipped forward
    if (tc >= 69.48 && tc < 70.0) { P.gaze = [-1, 0]; P.look = -0.4; P.lid = Math.max(0.2, abBlinkAt(AB_T3(t), 69.62)); P.amp = 0; } else if (tc >= 70.0) { P.gaze = [-0.4, 0.9]; P.lid = 0.55; } else P.gaze = [-1, 0.4]; }
  return { P, o, box, sweat, rope }; }

// ---------- Ali Baba, the nephew, the wife and the kid ----------
function a6A(t) { const tc = AB_T2(t);
  if (tc < 11.2) return { P: { ...a5Base(t, 621), x: 150, y: 892, dir: 1, gaze: [1, 0], mouth: 'o', brow: -0.6, handL: [-26, -104], handR: [26, -104] }, inDoor: true };
  const W = a6Walk(A6_AX, tc, 1, 16), P = { ...a5Base(t, 621), ...W, y: 910, dir: 1, gaze: [1, 0], mouth: 'closed', brow: 0.3, handL: [-26, -104], handR: [26, -104] };
  if (tc < 16.45) { const k = beatIn(tc, 14.6, 14.85); if (tc > 14.5) { P.mouth = 'o'; P.brow = -0.6; P.lid = 0; P.handL = [K.lerp(-26, -60, k), K.lerp(-104, -205, k)]; P.handR = [K.lerp(26, 60, k), K.lerp(-104, -205, k)]; P.sq *= 1 + 0.08 * pulse(tc, 14.6, 0.4); } }
  else if (tc < 23.6) { P.gaze = tc > 18.4 ? [1, -0.05] : [1, 0]; }
  else if (tc < 28.6) { P.brow = 0.55; P.handL = [-30, -130]; P.handR = [36, -132]; P.tip = tc < 24.4 ? 0.08 : 0.02;
    if (tc >= 24.4 && tc < 28.06) { P.ph = 1.25; P.amp = 1; P.tip = 0.05; P.drop = 2; P.handL = [-40, -150]; P.handR = [52, -150]; P.gaze = gazePlan(tc, [[24.4, [1, 0]], [25.2, [0.7, 0.35]], [26.4, [1, 0]]], 0.1); P.brow = 0.1; P.mouth = 'o'; }   // rev 1 note 3: frozen mid-step, rear foot up
    if (tc >= 28.06) { P.dir = 1; P.sq *= 1 - 0.04 * pulse(tc, 28.1, 0.4); P.handL = [-92, -140]; P.brow = 0.2; P.mouth = 'closed'; } }
  else if (tc < 54.21) { P.handL = tc < 30 ? [-92, -140] : [-26, -104]; P.gaze = tc > 39.9 && tc < 40.4 ? [-1, 0] : [1, 0]; if (tc > 36.0 && tc < 41.2) P.tip += 0.025 * beatIn(tc, 37.0, 37.4) * (1 - beatIn(tc, 40.8, 41.2));   // rev 1 note 9
    if (tc >= 51.46) { P.handR = PERSON_HANDS.moustache.R; P.handR = [20, -160 + 6 * Math.sin(tc * 8)]; P.tip = 0.06 * beatIn(tc, 51.46, 51.8) * (1 - beatIn(tc, 53.4, 54.0)); P.brow = 0.5; P.lid = Math.max(P.lid, 0.3); } }
  else if (tc < 59.98) { P.gaze = [1, 0]; P.brow = 0.5; if (tc > 59.3) P.sq *= 1 - 0.03 * pulse(tc, 59.3, 0.6); }
  else { P.gaze = [1, 0]; P.brow = 0.2; if (tc > 66.54 && tc < 67.6) { P.drop = 6 * Math.abs(Math.sin((tc - 66.54) * 6)); P.mouth = 'closed'; } }
  return { P, inDoor: false }; }
function a6N(t) { const tc = AB_T2(t);
  if (tc < 12.3) return { P: { ...a5Base(t, 631), x: 220, y: 892, hidden: tc < 7.6, dir: -1, gaze: [1, 0], mouth: 'o', handL: [-20, -104], handR: [20, -106] }, inDoor: true };
  const W = a6Walk(A6_NX, tc, 1, 15), P = { ...a5Base(t, 631), ...W, y: 916, dir: 1, gaze: [1, 0], mouth: 'closed', brow: 0.2, handL: [-22, -104], handR: [24, -104] };
  if (tc < 16.45) { if (tc > 14.82) { const k = beatIn(tc, 14.82, 15.05); P.handL = [K.lerp(-22, -44, k), K.lerp(-104, -210, k)]; P.handR = [K.lerp(24, 44, k), K.lerp(-104, -210, k)]; P.mouth = 'o'; P.brow = -0.6; P.lid = 0; } }
  else if (tc < 44.78) { if (tc > 28.0 && tc < 28.4) { P.tip = -0.08 * pulse(tc, 28.05, 0.35); } P.gaze = tc > 39.9 && tc < 40.3 ? [1, 0] : tc > 40.0 && tc < 40.5 ? [-1, 0] : [1, 0]; if (tc > 39.9 && tc < 40.5) { P.gaze = [1, -0.35]; P.tilt = 0.07; P.brow = 0.4; } if (tc > 35.6 && tc < 43.3) P.tip += 0.02 * beatIn(tc, 38.0, 38.4);   // rev 1 note 9: the glance at Ali Baba on 'traveller', a weight shift
    if (tc > 43.3) { P.brow = -0.4; P.tilt = 0.08; P.handR = [20, -215]; P.gaze = [0.3, -0.8]; } }
  else if (tc < 54.21) { P.handR = tc < 48.4 ? PERSON_HANDS.pointUp.R : [24, -104]; P.tip = tc < 45.6 ? 0.05 : 0; P.brow = -0.2; P.mouth = 'smile';
    P.talk = abTalk(t, 46.24, 47.7, 41, 0.6); if (P.talk) P.mouth = 'open';
    if (tc > 51.46) { P.tip = 0.06 * beatIn(tc, 51.56, 51.9) * (1 - beatIn(tc, 53.4, 54)); P.mouth = 'o'; P.brow = 0.3; } }
  else { P.x = 400; P.amp = 0; const sit = beatIn(tc, 59.3, 59.5); if (tc < 67.28) { P.sit = sit; P.seat = 'bench'; if (sit > 0) P.sq *= landSquash(tc, 59.5, 0.08); P.gaze = [1, 0]; P.mouth = 'o'; }
    else { P.sit = 1 - beatIn(tc, 67.4, 67.7); P.seat = 'bench'; P.gaze = [1, 0]; } }
  return { P, inDoor: false }; }
function a6Wife(t) { const tc = AB_T2(t), P = { ...a5Base(t, 641), x: 62, y: 900, dir: 1, gaze: [1, 0], mouth: 'closed', handL: [-24, -104], handR: [26, -104] };
  if (tc > 14.7 && tc < 16.45) { P.handR = [60, -110]; P.mouth = 'o'; P.brow = -0.4; }
  if (tc > 51.66 && tc < 54.0) { P.tip = 0.06 * beatIn(tc, 51.66, 52.0) * (1 - beatIn(tc, 53.4, 54)); P.lid = Math.max(P.lid, 0.3); }
  return P; }
function a6Kid(t) { const tc = AB_T2(t), P = { ...a5Base(t, 651), x: 108, y: 902, dir: 1, gaze: [1, 0], mouth: 'smile', handL: [-20, -60], handR: [20, -60] };
  if (tc > 14.75 && tc < 15.15) { P.x = 78; P.mouth = 'o'; } else if (tc >= 15.15 && tc < 16.45) { P.x = 92; P.tip = 0.1; P.mouth = 'o'; P.gaze = [1, 0.1]; }
  if (tc >= 28.58 && tc < 29.6) { P.handR = [80, -110]; P.mouth = 'grin'; P.y -= 6 * Math.abs(Math.sin((tc - 28.58) * 10)); }
  if (tc > 51.86 && tc < 54.0) { P.tip = 0.09 * beatIn(tc, 51.86, 52.1) * (1 - beatIn(tc, 53.4, 54)); P.mouth = 'o'; }
  return P; }

// ---------- the guards, the captain, the old neighbour ----------
function a6Guard(t, k) { const tc = AB_T2(t), xf = A6_GUARDX[k], W = a6Walk(xf, tc, -1, 18), cap = k === 3;
  const P = { ...a5Base(t, 661 + k * 7), ...W, y: A6_GY + [4, -8, 14, 16][k], dir: W.dir, gaze: [-1, 0], mouth: 'closed', brow: 0.2, handL: [-26, -104], handR: [30, -120] };
  const o = { spear: 'up', kick: 0, lantern: cap ? { open: 1 } : null, alpha: K.clamp((tc - (cap ? 54.96 : 55.2 + 0.25 * k)) / 0.25), exit: tc > 69.9 && xf(tc) < 770 };
  if (cap) { P.handL = [-40, -150]; if (tc > 57.08 && tc < 59.98) P.handR = [70, -175]; P.kick = 0; o.kick = 0.4 * W.amp; }
  if (!cap && tc > 57.08 + 0.25 * k && tc < 57.6 + 0.25 * k) { P.sq *= landSquash(tc, 57.1 + 0.25 * k, 0.05); }
  if (tc >= 59.98 && tc < 67.28) { P.dir = -1; if (cap && tc > 62.58 && tc < 63.6) { P.tip = 0.08 * pulse(tc, 62.58, 1.0); P.drop = 6 * Math.abs(Math.sin((tc - 62.9) * 9)) * (tc > 62.9 ? 1 : 0); P.gaze = [-1, 0.3]; }
    if (k === 2 && tc >= 63.58 && tc < 66.9) { P.handLW = [760, 812]; P.gaze = [-1, 0.4]; o.roll = tc < 64.64 ? 'hand' : 'open'; } if (k === 2 && tc >= 64.64 && tc < 66.9) { delete P.handLW; P.handL = [-50, -205 + 4 * Math.sin(tc * 9)]; P.gaze = [-0.3, -1]; } }   // rev 1 note 7: the map held up toward the card
  if (cap && tc >= 69.0 && tc < 69.9) { P.dir = -1; P.gaze = [-1, 0]; P.handR = [70, -190]; P.talk = abTalk(t, 69.16, 69.9, 51, 0.6); P.mouth = P.talk ? 'open' : 'closed'; }
  if (k === 2 && tc >= 66.9) o.roll = 'tuck';
  return { P, o }; }
function a6Neigh(t) { const tc = AB_T2(t), W = a6Walk(A6_NEIGHX, tc, -1, 14), P = { ...a5Base(t, 691), ...W, y: A6_GY + 8, dir: W.dir, gaze: [-1, 0], mouth: 'grin', handL: [-24, -104], handR: [26, -104] };
  if (tc > 56.6 && tc < 58.0) { P.handR = [90, -160]; P.mouth = 'open'; } return { P, alpha: K.clamp((tc - 56.38) / 0.25) }; }

// ---------- the world (every courtyard shot) ----------
function a6Gift(ctx, t, M, G) { const tc = AB_T2(t);
  if (M.box === 'R') { const [hx, hy] = a2Hand(M.P, 1, A3_MORG); giftBox(ctx, hx, hy + 6, 1.6, { glint: tc < 0.4 ? (tc * 2.5) % 1 : 0 }); return; }
  if (tc < 13.2 && G.box) { const [hx, hy] = a2Hand(G.P, 1, A5_NM); giftBox(ctx, hx, hy + 22, 1.6); return; }
  if (tc >= 13.2) { const u = beatIn(tc, 13.2, 13.5), b = tc > 13.5 ? 10 * Math.abs(Math.sin((tc - 13.5) * 10)) * Math.exp(-(tc - 13.5) * 6) : 0; giftBox(ctx, K.lerp(412, 440, u), K.lerp(806, 922, u * u) - b, 1.6, { rot: 0.5 * u }); } }
function a6YardWorld(ctx, t, cam) {
  const tc = AB_T2(t), M = a6M(t), G = a6G(t), A = a6A(t), N = a6N(t);
  const gateOpen = tc < 67.9 ? (tc > 19.28 && tc < 21.9 ? 0.02 * Math.max(pulse(tc, 19.3, 0.7), pulse(tc, 21.08, 0.35)) : 0) : beatIn(tc, 67.9, 68.4);
  const bar = tc < 67.6 ? 1 : 1 - beatIn(tc, 67.6, 67.85), backOpen = tc < 54.21 ? 0 : tc < 58.0 ? beatIn(tc, 54.21, 54.6) : 1 - beatIn(tc, 58.0, 58.4);
  const exits = [];   // figures already through the street gate (drawn inside the arch, smaller, fading)
  const inside = (c) => { if (tc < 11.2) a2Ali(c, A.P, "night", { shadow: false }); if (tc < 12.3 && !N.P.hidden) abNephew(c, t, N.P, 'night', { shadow: false }); };
  courtyard(ctx, t, cam, { m: 'night', moon: [1000, 170], K: { open: 1, lit: 1, inside }, gate: { open: gateOpen, bar: null, inside: (c) => { for (const f of exits) f(c); } }, back: [backOpen, backOpen > 0 ? 0 : 1], bwin: 0.7 });
  // helmets behind the coping: sinking at the opening; passing along the lane 32.36-35.58
  const top = CY.wall.top - 2; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 2200, top); ctx.clip();
  // rev 1 (ALI-05 continuity): the four helmets with faces over the coping above the gate (x 615/688/762/836, captain 762), sinking 0.3-1.4
  if (tc < 1.6) [[615, 0], [688, 0.12], [762, 0.3], [836, 0.24]].forEach(([x, dl], i) => { const dn = beatIn(tc, 0.3 + dl, 0.9 + dl); a6Helmet(ctx, x, CY.wall.top - 44 + 104 * dn + 3 * Math.sin(tc * 2 + i), 1.1, { plume: i === 2, pl: lagged((u) => Math.sin(u * 3 + 1), tc, 0.3, 1), face: 1 }); });
  // rev 1 note 4: three helmet points and spear tips rise over the coping one per word (32.36, 33.04, 33.58) and bob along it left to right
  if (tc > 32.2 && tc < 36.2) [32.36, 33.04, 33.58].forEach((w, i) => { if (tc < w) return; const x = 610 + 150 * (tc - w), up = beatIn(tc, w, w + 0.2), bob = 4 * Math.abs(Math.sin((tc + 0.2 * i) * 6));
    a6Helmet(ctx, x, top + 6 + 50 * (1 - up) - bob, 1.0, { plume: i === 0, pl: Math.sin(tc * 5), tip: 1, glint: tc < w + 0.5 ? (tc - w) / 0.5 : 0 }); });
  ctx.restore();
  for (const jx of [1350, 1460]) { a3Shadow(ctx, jx, CY.jarY + 2, 108, 0, A6_NSH); oilJar(ctx, jx, CY.jarY, CY.jarS, { xs: CY.jarXs }); }   // the three plain jars at the far end (nobody stands in front of them)
  // the cat on the coping: sits, arches at 15.4, walks along the wall 34.4-35.58, leans in at 52.3, looks down at him from 58.4
  const cxf = (u) => kfn(u, [[34.4, 905], [35.5, 1080]]), cw = walk(cxf, tc, { stride: 9 });
  a5Cat(ctx, t, { x: tc < 34.4 ? 905 : cw.x, y: top, gy: top, dir: tc > 34.3 && tc < 35.6 ? 1 : -1, sit: tc > 34.3 && tc < 35.6 ? 0 : 1, ph: cw.ph, amp: tc > 34.4 && tc < 35.5 ? cw.amp : 0, arch: tc > 15.4 && tc < 16.6 ? 0.6 : 0, tip: tc > 52.3 && tc < 53.8 ? -0.12 : 0,
    gaze: tc > 58.4 ? [-1, 0.9] : tc > 33.5 && tc < 34.4 ? [1, 0] : [-1, 0.5] }, 'rgba(43,26,58,0.3)');
  // the street gate bar and padlock (front pass: the lemon tree stands in front of the gate)
  gateBar(ctx, CY.gate.cx, CY.gate.bar, { down: bar }); const lockOpen = tc > 67.3 ? 1 : 0;
  if (bar > 0.95) padlock(ctx, CY.gate.cx, CY.gate.bar + 8, 1.1, { open: lockOpen, swing: tc > 19.28 && tc < 22.8 ? 0.35 * swing(tc, 19.35, 1, 1.6, 1.4) + 0.2 * swing(tc, 21.1, 1, 1.8, 2) : 0.03 * Math.sin(tc * 2), glint: tc > 20.3 && tc < 20.9 ? (tc - 20.3) / 0.6 : 0 });
  const L = [];
  // household
  if (tc >= 12.9 && tc < 54.21) { const Wf = a6Wife(t), Kd = a6Kid(t), aw = K.clamp((tc - 12.9) / 0.3), ak = K.clamp((tc - 13.4) / 0.3); if (ak > 0) L.push({ y: Kd.y - 0.5, d: () => { ctx.save(); ctx.globalAlpha *= ak; a3Shadow(ctx, Kd.x, Kd.y, 70, 0, A6_NSH); abKid(ctx, Kd, 'night'); ctx.restore(); } }); L.push({ y: Wf.y, d: () => { ctx.save(); ctx.globalAlpha *= aw; a3Shadow(ctx, Wf.x, Wf.y, 96, 0, A6_NSH); abWife(ctx, Wf, 'night'); ctx.restore(); } }); }
  if (!A.inDoor) L.push({ y: A.P.y, d: () => a2Ali(ctx, A.P, 'night', { shc: A6_NSH }) });
  if (!N.inDoor) L.push({ y: N.P.y - (N.P.sit ? 30 : 0), d: () => abNephew(ctx, t, N.P, 'night', { shc: A6_NSH }) });
  L.push({ y: M.P.y, d: () => { morgiana(ctx, t, M.P, 'night', { shc: A6_NSH, kick: M.o.kick }); const [sx, sy] = a2BodyPt(M.P, 16, -92, A3_MORG);
    if (M.key === 'sash' && tc >= 23.4) gateKey(ctx, sx, sy, 0.9, { swing: 0.12 * Math.sin(AB_T2(t) * 2.4), ribbon: 14 }); else { const [hx, hy] = a2Hand(M.P, 1, A3_MORG); gateKey(ctx, hx, hy - 4, tc > 22.8 ? 1.1 + 0.5 * beatIn(tc, 22.86, 23.1) : 1.1, { swing: 0.5 * swing(tc, 22.95, 1, 1.4, 2.5), glint: tc > 23.0 && tc < 23.6 ? (tc - 23.0) / 0.6 : 0 }); }
    if (tc >= 67.28 && tc < 67.6) { const [hx, hy] = a2Hand(M.P, 1, A3_MORG); gateKey(ctx, hx - 4, hy - 30, 0.9, { swing: 1.4 }); } } });
  const drawG = (c, P) => { const band = tc >= 14.26 && tc < 15.1 ? { x: K.lerp(G.P.x - 140, G.P.x + 140, beatIn(tc, 14.26, 15.0)), y: 760, w: 150, k: 1 } : null;
    disguiseWipe(c, band, (cc) => a6Guest(cc, t, P, 'night', { ...G.o, shc: A6_NSH }), (cc) => a5LeaderAs(cc, t, { ...P, mouth: 'closed', brow: 0.9 }, 'night', { shc: A6_NSH }), t);
    if (G.sweat > 0) { const [hx, hy] = a2HeadPt(P, -26, -10, A5_NM); a6Drop(c, hx, hy, G.sweat); }
    if (tc < 63.58) { const [rx, ry] = a2BodyPt(P, 12, -96, A5_NM); if (tc > 54) celShade(c, K.rectPts(rx - 4, ry - 26, 9, 30), '#fff1d0', '#d8c098', { off: 2, lw: 2 }); }
    if (G.rope) { const [ax, ay] = a2Hand(P, 0, A5_NM), [bx, by] = a2Hand(P, 1, A5_NM); c.strokeStyle = '#c8a070'; c.lineWidth = 4; c.beginPath(); c.moveTo(ax, ay); c.quadraticCurveTo((ax + bx) / 2, Math.max(ay, by) + 22, bx, by); c.stroke(); } };
  if (tc < 70.6) { if (G.P.x < 770 && tc > 70.0) exits.push((c) => { c.save(); c.globalAlpha *= 1 - beatIn(tc, 70.0, 70.6); drawG(c, { ...G.P, y: 872, s: 0.9 }); c.restore(); }); else L.push({ y: G.P.y, d: () => drawG(ctx, G.P) }); }
  if (tc >= 54.96) for (let k = 0; k < 4; k++) { const Q = a6Guard(t, k); if (Q.o.alpha <= 0) continue;
    const d = (c, P) => { c.save(); c.globalAlpha *= Q.o.alpha; guard(c, t, k, P, 'night', { spear: Q.o.spear, lantern: Q.o.lantern, kick: Q.o.kick, shc: A6_NSH, glint: k === 0 && tc > 57.2 && tc < 57.7 ? (tc - 57.2) / 0.5 : 0 });
      if (Q.o.roll === 'hand') { const [hx, hy] = a2Hand(P, 0, A4_GUARDS[k]); celShade(c, K.rectPts(hx - 5, hy - 30, 10, 34), '#fff1d0', '#d8c098', { off: 2, lw: 2 }); }
      if (Q.o.roll === 'open') { const [hx, hy] = a2Hand(P, 0, A4_GUARDS[k]); celShade(c, K.rectPts(hx - 30, hy - 40, 60, 44), '#fff1d0', '#d8c098', { off: 3, lw: 2 }); c.strokeStyle = '#e8364f'; c.setLineDash([5, 5]); c.lineWidth = 3; c.beginPath(); c.moveTo(hx - 22, hy - 10); c.lineTo(hx + 20, hy - 30); c.stroke(); c.setLineDash([]); }
      c.restore(); };
    if (Q.o.exit) exits.push((c) => { c.save(); c.globalAlpha *= 1 - beatIn(tc, 70.0, 70.6); d(c, { ...Q.P, y: 872, s: (Q.P.s || A4_GUARDS[k].s) * 0.9 }); c.restore(); });
    else { if (Q.P.x > 1560) { Q.P.y -= 24 * (1 - K.clamp((1590 - Q.P.x + 30) / 30)); } L.push({ y: Q.P.y, d: () => d(ctx, Q.P) }); } }
  if (tc >= 56.38) { const Nb = a6Neigh(t); L.push({ y: Nb.P.y, d: () => { ctx.save(); ctx.globalAlpha *= Nb.alpha; a3Neighbour(ctx, t, Nb.P, 'night', { broom: tc > 56.6 && tc < 58 ? 40 : 0, lift: tc > 56.6 && tc < 58 ? 0.9 : tc > 67.6 ? 0.6 : 0, shc: A6_NSH }); ctx.restore(); } }); }
  for (const q of abByY(L)) q.d();
  a6Gift(ctx, t, M, G);
  if (tc >= 18.42 && tc < 19.3) abDust(ctx, G.P.x - 30, 912, 140, 50, t, 0.6, '#b8b0d8');
  if (tc >= 57.08 && tc < 57.9) for (let k = 0; k < 3; k++) { const tk = 57.08 + 0.25 * k; if (tc > tk) abDust(ctx, A6_GUARDX[k](tc) + 20, 914, 70, 30, t, 0.6 * (1 - beatIn(tc, tk, tk + 0.5)), '#b8b0d8'); }
  return { M, G, A, N };
}
