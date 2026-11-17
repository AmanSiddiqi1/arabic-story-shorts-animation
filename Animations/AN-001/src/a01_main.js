// ===== AN-001 main: timelines (bull, donkey, merchant, worker), world draw, camera, lettering, inset, card, sound =====
const A01B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a01Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const a01Pop = (t, a, d = 0.3) => K.clamp((t - a) / d);
const a01In = (t, a, b) => t >= a && t < b;
const a01IsField = (t) => (t >= 5.2 && t < 13.7) || (t >= 97.4 && t < 109.2);
const A01_TALK_BULL = [[28.34, 31.3], [31.67, 36.9], [118.5, 119.8], [120.5, 122.7]];
const A01_TALK_DON = [[47.35, 50.1], [51.5, 53.4], [54.0, 56.6], [57.84, 61.2], [61.84, 66.6], [134.7, 135.1], [136.21, 141.7], [141.82, 143.9]];
const A01_TALK_MER = [[94.11, 97.5]];
const A01_TALK_WRK = [[79.3, 82.0]];
const A01_BX0 = 300, A01_DX0 = 700, A01_DX7 = 770, A01_DLX = 720, A01_DLY = 874;   // home marks (bull stands/lies at 300; donkey stands at 700, lies on the straw at 720)
const A01_BH_LIE = [441, 812], A01_BH_UP = [441, 744], A01_DH_LIE = [586, 764], A01_DH_UP = [566, 724];
const A01_TR_B = 415, A01_TR_D = 585, A01_TR_Y = 800;   // troughs (centre x) and top edge
const A01_CLOUD_AT = [500, 700];

// ---------- time of day ----------
const a01U = (t) => kfn(t, [[0, 0.24], [5.2, 0.25], [13.7, 0.27], [22.6, 0.31], [23.4, 0.5], [37, 0.58], [45.05, 0.66], [56.0, 0.74], [67.34, 0.77], [67.35, 0.2], [97.4, 0.25],
  [109.2, 0.46], [110.9, 0.51], [123.1, 0.58], [143.8, 0.66], [152.82, 0.74], [153.3, 0.86], [154.0, 1.0], [156.5, 1.18], [160.7, 1.22], [166.9, 1.24], [A01_DUR, 1.28]], 'lin');
const a01FU = (t) => t < 50 ? kfn(t, [[5.2, 0.25], [11.1, 0.27], [11.7, 0.5], [13.7, 0.51]], 'lin') : kfn(t, [[97.4, 0.24], [102.3, 0.25], [104.8, 0.48], [109.2, 0.5]], 'lin');
const a01Lit = (t) => { const u = ((a01U(t) % 1) + 1) % 1; return K.clamp(Math.min((u - 0.44) / 0.05, (0.96 - u) / 0.04)); };

// ---------- position functions ----------
// S2 bull ploughs (6.22-11.1) then trudges home at dusk; S13 trot; S18 march out
const A01_BXF = (t) => kfn(t, [[6.22, 520], [11.1, 1080]]);
const A01_BXH = (t) => kfn(t, [[11.15, 1000], [12.4, 880]], 'out');
const A01_BXQ = (t) => kfn(t, [[160.75, 300], [161.75, 830], [163.5, 830], [164.42, 1080], [166.12, 1300], [166.9, 1420]], 'lin');
const A01_PLW = 960;   // S18 plough waits at the field edge (share x)
// S10 donkey: yoke, scrabble, start, three time-lapse passes (left to right), stop
const A01_PASS = [[102.3, 103.05], [103.05, 103.88], [103.88, 104.8]];
const a01DXF = (t) => { if (t < 101.2) return 420; if (t < 102.3) return kfn(t, [[101.2, 420], [102.3, 560]]); for (let i = 0; i < 3; i++) { const [a, b] = A01_PASS[i]; if (t < b) return K.lerp(i ? 250 : 560, i === 2 ? 1150 : 1350, (t - a) / (b - a)); } return 1150; };
// S12 donkey hobbles in
const A01_DXIN = (t) => kfn(t, [[109.3, 960], [110.9, 742]], 'lin');
// S7 worker
const A01_WX7 = (t) => kfn(t, [[70.4, 960], [71.6, 545], [74.6, 545], [74.8, 515], [76.4, 515], [76.8, 128], [78.5, 128]], 'lin');
const A01_WX8 = (t) => kfn(t, [[78.5, 930], [79.6, 1090]], 'out');
const A01_WX18 = (t) => kfn(t, [[160.9, 1380], [161.9, 1085], [165.0, 1085], [166.9, 1260]], 'lin');
const A01_MX8 = (t) => kfn(t, [[79.6, 1440], [80.7, 1300]]);
const A01_MXW = (t) => kfn(t, [[56.68, 360], [57.55, 500], [66.55, 500], [67.2, 650]]);
const A01_FALLS = [...footfalls(A01_BXF, 6.3, 11.1, A01_GAIT_BULL * 0.8), ...footfalls(A01_BXQ, 160.75, 166.9, A01_GAIT_BULL * 0.8)];
const A01_DFALLS = footfalls(A01_DXIN, 109.3, 110.9, GAIT.donkey * 0.8);

// ---------- the bull ----------
function a01BullP(t) {
  const P = { x: A01_BX0, y: A01_GR, s: 0.8, dir: 1, seed: 11, tailSwish: 0.35 * Math.sin(t * 1.3), ears: 0.1 };
  const look = (to) => lookAt(a01BullHead(P), to);
  if (t < 5.2) {   // S1 at the trough, lifts his head, looks out at the sun
    P.headDown = t < 3.2 ? 0.55 + 0.05 * Math.sin(t * 5) : settleTo(t, 3.2, 0.55, 0, 0.45); P.chew = t < 3.2 ? 0.5 + 0.5 * Math.sin(t * 9) : 0;
    P.gaze = t < 3.2 ? [0.6, 0.6] : t < 4.7 ? [0.3, -0.6] : [1, -0.35]; P.ears = a01In(t, 3.25, 4.6) ? 0.7 : 0.1; P.tailSwish += 0.8 * pulse(t, 3.4, 0.6);
    P.lid = Math.max(0, pulse(t, 3.6, 0.45)); if (t >= 4.7) { P.brow = -0.4; P.snort = pulse(t, 4.8, 0.5); P.drop = 6 * A01B(t, 4.7, 0.3); }
    return P;
  }
  if (t < 13.7) {   // S2 the field
    if (t < 11.1) { Object.assign(P, walk(A01_BXF, t, { stride: A01_GAIT_BULL * 0.8 })); P.x = A01_BXF(t); P.yoke = true; P.headDown = 0.3; P.gaze = [0.8, 0.5]; P.brow = 0.3;
      P.tip = 0.07 * A01B(t, 5.6, 0.5) + 0.02 * Math.sin(P.ph * 2); P.sq = anticipate(t, 5.75, 0.45, 0.07); P.mouth = 'grit';
      if (t >= 10.2) { P.lid = 0.6; P.gaze = [0.3, -1]; P.tongue = 0.4 * A01B(t, 10.3, 0.3); P.mouth = 'open'; P.talk = 0.2; P.brow = -0.3; }
    } else { const W = walk(A01_BXH, t, { stride: A01_GAIT_BULL * 0.8 * 0.5 }); Object.assign(P, W); P.amp = W.amp * 0.17; P.dir = -1; P.sag = 0.9; P.headDown = 0.5; P.ears = -0.6; P.lid = 0.55; P.gaze = [-0.5, 0.8];
      if (t >= 12.2) { P.sag = 1; P.tongue = A01B(t, 12.3, 0.4); P.ears = -1; P.lid = 0.7; P.sq = settleTo(t, 12.4, 1, 0.93, 0.5) * breathe(t, 3, 0.03); P.mouth = 'open'; } }
    return P;
  }
  if (t < 22.6) {   // S3 flops in his stall
    P.lie = A01B(t, 13.72, 0.25, 'in'); P.sq = impactSquash(t, 13.97, 0.8) * breathe(t, 2, 0.02); P.headDown = settleTo(t, 13.9, 0.2, 1.0, 0.4); P.sag = 0.4; P.ears = -0.6; P.lid = 0.7; P.gaze = [0.6, 0.3];
    return P;
  }
  if (t < 37) {   // S4 the complaint
    P.lie = 1; P.sq = breathe(t, 2, 0.015); P.headDown = t < 24.35 ? 1 : settleTo(t, 24.35, 1, 0.15, 0.6); P.ears = t < 24.35 ? -0.5 : 0.2;
    if (t < 24.4) { P.tip = 0.025 * Math.sin(t * 8) * A01B(t, 23.6, 0.2); P.lid = 0.6; P.brow = -0.5; P.gaze = [0.4, 0.5]; }
    else P.gaze = look(A01_DH_LIE);
    if (a01In(t, 27.4, 29.0)) { P.neck = 0.6 * Math.sin(Math.PI * K.clamp((t - 27.4) / 1.6)); P.brow = 0.4; }
    P.talk = talk(t, A01_TALK_BULL);
    if (t >= 31.8) { P.wet = true; P.yokeMark = true; P.brow = -0.7; P.headDown = 0.15 + 0.5 * pulse(t, 31.95, 0.4) + 0.08 * Math.sin(t * 13) * pulse(t, 32.5, 0.9); }
    if (t >= 34.6) { P.headDown = settleTo(t, 34.7, 0.15, 0.9, 0.5); P.ears = settleTo(t, 34.95, 0.2, -0.6, 0.4); P.tailDown = 0.6 * A01B(t, 35.0, 0.4); P.gaze = [0.6, 0.6]; }
    if (t >= 36.0) { P.lid = Math.max(0.35, 0.8 * (pulse(t, 36.24, 0.3) + pulse(t, 36.6, 0.3))); }
    return P;
  }
  if (t < 45.05) { P.lie = 1; P.headDown = 0.85; P.lid = 0.6; P.ears = -0.5; P.sq = breathe(t, 2, 0.015); P.yokeMark = true; P.gaze = look(A01_DH_LIE); return P; }   // S5
  if (t < 67.35) {   // S6 the plan
    P.lie = 1; P.headDown = 0.15; P.ears = 0.4; P.yokeMark = true; P.gaze = look(A01_DH_LIE);
    if (a01In(t, 49.45, 49.95)) { P.tongue = 1; P.eyes = 'x'; P.chinUp = 0.5; P.mouth = 'open'; P.sq = 1.04; }
    else if (a01In(t, 49.95, 50.4)) { P.tongue = 0.5; P.lid = 0.7; }
    if (t >= 50.4) P.gaze = look(t < 56.7 ? [470, 430] : [330, 330]);
    if (a01In(t, 58.3, 59.6)) { P.gaze = look([kfn(t, [[58.3, 420], [59.5, 330]]), 345]); P.drop = 4 * pulse(t, 59.2, 0.3); P.mouth = 'o'; }
    if (a01In(t, 60.2, 61.4)) { P.brow = -0.8; P.mouth = 'frown'; if (t > 60.6 && t < 61.0) P.gaze = [0.6, 1]; }
    if (t >= 65.9) { P.mouth = 'smile'; P.headDown = 0.15 + 0.25 * (pulse(t, 66.0, 0.32) + pulse(t, 66.36, 0.32)); P.tailSwish = 0.9 * Math.sin(t * 7); }
    return P;
  }
  if (t < 97.4) {   // S7 the sick act (and lying so through S8-S9)
    P.lie = 1; P.yokeMark = true;
    if (t < 67.7) { P.headDown = 0.1; P.gaze = [1, -0.1]; }
    else { P.headDown = settleTo(t, 67.75, 0.1, 1.0, 0.45); P.legUp = A01B(t, 67.95, 0.35, 'out'); P.tongue = 0.6 * A01B(t, 68.1, 0.3); P.sq = impactSquash(t, 68.0, 0.9); P.mouth = 'open';
      P.gaze = t < 68.5 ? [1, 0] : look(A01_DH_UP); P.lid = t < 68.95 ? 0 : 1; }
    if (a01In(t, 73.95, 74.34)) { P.lid = t < 74.25 ? 0.62 : 1; P.gaze = [0.5, -0.1]; P.drop = -4; }
    if (a01In(t, 74.8, 76.45)) { P.neck = 0.65 + 0.25 * Math.sin(t * 9); P.sq = 0.98; }
    if (t >= 76.85) P.x = A01_BX0 + 20 * A01B(t, 76.85, 0.25, 'out') + swing(t, 77.1, 5, 2.2, 3.5);
    if (a01In(t, 76.85, 77.3)) P.tip = -0.03 * Math.sin(Math.PI * (t - 76.85) / 0.45);
    if (t >= 95.85) { P.x = A01_BX0 + 20; P.lid = t < 96.75 ? 1 : 0; P.legUp = 1 - A01B(t, 96.7, 0.3); if (t >= 96.75) { P.mouth = 'smile'; P.tongue = 0; P.headDown = settleTo(t, 96.75, 1, 0.3, 0.4); P.gaze = look(A01_DH_UP); } }
    else if (t >= 78.4) P.x = A01_BX0 + 20;
    return P;
  }
  if (t < 109.2) return null;   // S10-S11 the bull rests (off screen)
  if (t < 114.1) { P.ears = 0.6; P.mouth = 'smile'; P.tailSwish = 0.6 * Math.sin(t * 2.2); P.gaze = look(a01DonkeyHead(a01DonkeyP(t))); return P; }   // S12 watches him come
  if (t < 123.1) {   // S13 thanks
    P.x = kfn(t, [[114.3, 300], [115.6, 345]]); P.y -= 14 * (pulse(t, 114.35, 0.5) + pulse(t, 114.95, 0.5)) + 22 * pulse(t, 116.15, 0.42); P.tailUp = 1; P.ears = 0.8;
    P.sq = 1 + 0.05 * (pulse(t, 114.35, 0.5) + pulse(t, 114.95, 0.5)) - 0.12 * Math.exp(-Math.max(0, t - 116.57) * 12) * (t > 116.57 ? 1 : 0); P.ph = (P.x - 300) / 20; P.amp = t < 115.6 ? 0.4 : 0;
    P.mouth = t >= 116.0 ? 'smile' : 'closed'; if (a01In(t, 116.1, 117.0)) P.lid = 1;
    P.headDown = t < 118.2 ? 0 : t < 119.4 ? settleTo(t, 118.3, 0, 0.7, 0.5) : settleTo(t, 119.4, 0.7, 0.05, 0.5);
    P.talk = talk(t, A01_TALK_BULL); P.gaze = look(A01_DH_LIE);
    if (t >= 121.9) { P.stretch = A01B(t, 121.9, 0.5) * (1 - A01B(t, 122.8, 0.3)); P.lid = Math.max(0, pulse(t, 122.1, 0.7)); P.mouth = 'smile'; }
    return P;
  }
  P.x = 345;
  if (t < 133.05) {   // S14 shrugs and eats
    P.headDown = t < 124.2 ? 0.05 : t < 125.2 ? 0.05 : settleTo(t, 125.2, 0.05, 0.75, 0.5); P.headTurn = 0.15 * pulse(t, 124.3, 0.8); P.sq = 1 - 0.04 * pulse(t, 124.9, 0.4);
    P.chew = t > 125.5 ? 0.5 + 0.5 * Math.sin(t * 9) : 0; P.tailSwish = 0.8 * Math.sin(t * 3.1); P.mouth = 'smile'; P.gaze = t < 125.2 ? look(A01_DH_LIE) : [0.6, 0.8];
    return P;
  }
  if (t < 143.8) {   // S15 listens; the butcher
    P.headDown = t < 134.8 ? 0.75 : settleTo(t, 134.8, 0.75, 0.15, 0.4); P.chew = t < 138.8 ? 0.5 + 0.5 * Math.sin(t * 8) : 0; P.gaze = look(A01_DH_LIE); P.ears = 0.3;
    if (t >= 140.2) { P.drop = 5 * pulse(t, 140.25, 0.35); P.ears = settleTo(t, 140.3, 0.3, -0.5, 0.6); P.brow = -0.4; }
    if (t >= 143.12) { P.eyes = 'wide'; P.noBlink = true; P.ears = -0.8; P.mouth = 'o'; P.brow = -0.8; }
    return P;
  }
  if (t < 152.82) {   // S16 trembles
    const amp = t < 145.3 ? K.lerp(2, 5, A01B(t, 143.9, 1.4)) : t < 149.5 ? 5 : K.lerp(5, 1.5, A01B(t, 149.5, 2)); P.x += tremble(t, amp, 11);
    P.eyes = 'wide'; P.noBlink = true; P.brow = -0.8; P.mouth = 'o'; P.ears = -0.8; P.headDown = 0.15; P.ring = swing(t, 145.4, 0.5, 2.4, 2);
    if (t >= 145.3) { P.tailDown = A01B(t, 145.3, 0.3); P.ears = -1; P.sq = 1 - 0.03 * Math.abs(Math.sin(t * 22)) * (t < 146 ? 1 : 0.3); }
    P.gaze = gazePlan(t, [[0, [0.3, 0.6]], [145.9, [1, -0.1]], [146.3, [0.2, 1]], [146.7, [0.6, 0.3]], [148.2, look(A01_DH_LIE)], [149.3, [0.4, 0.8]]], 0.07);
    if (t >= 145.9 && t < 147.0) { P.drop = 7 * pulse(t, 145.95, 0.3); P.lid = 0.8 * pulse(t, 145.95, 0.2); P.noBlink = true; }
    return P;
  }
  if (t < 160.7) {   // S17 next morning: spring up, eat everything
    const up = t >= 156.2; P.lie = up ? 1 - A01B(t, 156.2, 0.13, 'out') : 1; P.tired = true;
    if (!up) { P.headDown = 0.4; P.lid = 0.45 + 0.15 * Math.sin(t * 5) * (t > 154 ? 1 : 0); P.gaze = [1, -0.1]; P.sq = anticipate(t, 155.9, 0.3, 0.12); }
    else { P.y -= 30 * pulse(t, 156.2, 0.22); P.sq = t < 156.42 ? 1.12 : landSquash(t, 156.42, 0.16); P.eyes = 'wide'; P.ears = 0.8; P.gaze = [1, -0.1]; }
    if (t >= 157.1) { P.tip = -0.04; P.eyes = 'open'; P.gaze = gazePlan(t, [[0, [1, -0.1]], [157.5, [1, 0.1]], [157.8, [0.6, 0.6]]], 0.07); P.tailUp = 0.6; }
    if (t >= 158.0) { P.tip = 0; P.headDown = 0.6 + 0.35 * Math.abs(Math.sin((t - 158) * 9)); P.chew = 1; P.lid = 0.3; }
    if (t >= 159.9) { P.headDown = settleTo(t, 159.95, 0.7, 0.55, 0.3); P.tongue = 0.7 * Math.abs(Math.sin((t - 159.9) * 8)) * (t < 160.4 ? 1 : 0); if (t >= 160.3) { P.headDown = settleTo(t, 160.3, 0.55, 0, 0.35); P.gaze = [1, -0.2]; P.mouth = 'smile'; P.tip = -0.03; } }
    return P;
  }
  if (t < 166.9) {   // S18 out to the plough
    Object.assign(P, walk(A01_BXQ, t, { stride: A01_GAIT_BULL * 0.8 })); P.ears = 0.8; P.tailSwish = 0.7 * Math.sin(t * 4); P.gaze = [1, 0.1];
    if (a01In(t, 161.75, 162.8)) P.gaze = lookAt(a01BullHead(P), [kfn(t, [[161.75, 1300], [161.9, 1085]]), 705]);
    if (t >= 162.8) { P.yoke = t >= 162.98; P.headDown = t < 163.2 ? 0.5 * pulse(t, 162.8, 0.4) : 0; }
    if (t >= 163.5) { P.tip = -0.03; P.mouth = 'smile'; P.amp = Math.min(1, P.amp * 1.2); }
    if (t >= 165.9) { P.tip = 0.06; P.headDown = 0.3; P.mouth = 'grit'; P.brow = 0.3; }
    return P;
  }
  return null;
}

// ---------- the donkey (Library donkey) ----------
function a01DonkeyP(t) {
  const P = { x: A01_DX0, y: A01_GR, s: 0.8, dir: -1, seed: 23, pal: 0, tailSwish: 0.4 * Math.sin(t * 1.7 + 1) };
  const lieOn = () => { P.x = A01_DLX; P.y = A01_DLY; P.lie = 1; };
  const lk = (to) => lookAt(a01DonkeyHead(P), to);
  if (t < 5.2) {   // S1 chewing, lazy ears
    P.chew = 0.5 + 0.5 * Math.sin(t * 8); P.lid = Math.max(0.35, blink(t, 23)); P.headDown = t < 4.2 ? 0.45 : settleTo(t, 4.2, 0.45, 0, 0.6);
    P.earL = t < 3.9 ? 0.2 : settleTo(t, 3.9, 0.2, 1, 0.3); P.earR = t < 4.15 ? 0.2 : settleTo(t, 4.15, 0.2, 0.9, 0.3); P.gaze = t < 4.0 ? [0.3, 0.6] : [-0.4, -0.2]; P.mouth = 'smile';
    return P;
  }
  if (t < 13.7) return null;
  if (t < 22.6) {   // S3 the soft day
    lieOn(); P.mouth = 'smile'; P.lid = Math.max(0.5, blink(t, 23)); P.tailSwish = Math.sin(t * 5); P.gaze = gazePlan(t, [[0, [-0.6, 0.2]], [14.6, lk(A01_BH_LIE)], [15.3, [-0.3, 0.6]]]);
    P.neck = 0.6 * pulse(t, 16.4, 0.9); if (a01In(t, 16.5, 17.2)) P.lid = Math.max(P.lid, pulse(t, 16.5, 0.7));
    if (t >= 17.3) { P.headDown = t < 18.0 ? A01B(t, 17.3, 0.35) : settleTo(t, 18.0, 1, 0.25, 0.3); P.lid = t < 18.2 ? 1 : 0.6; P.earL = -0.3; P.earR = -0.3; }
    if (t >= 18.2) { P.chew = 0.5 + 0.5 * Math.sin(t * 7); P.earR = 0.4 * Math.sin(t * 3); P.earL = 0.3; P.mouth = 'smile'; }
    if (t >= 19.8) { const yawn = pulse(t, 19.95, 0.85); P.bray = 0.6 * yawn; P.chew = 0; P.lid = 1; P.headDown = t < 20.5 ? -0.2 * A01B(t, 19.8, 0.15) : settleTo(t, 20.5, -0.2, 0.8, 0.5); }
    if (t >= 20.8) { P.lid = 1; P.sq = breathe(t, 5, 0.04); P.earR = t > 21.5 && t < 21.7 ? 0.6 : -0.2; P.earL = -0.3; P.mouth = 'closed'; }
    return P;
  }
  lieOn();
  if (t < 37) {   // S4 listening
    P.headDown = 0; P.chew = t < 25.9 ? 0.5 + 0.5 * Math.sin(t * 7) : 0; P.straw = t >= 25.9; P.lid = t < 25.9 ? 0.45 : 0; P.gaze = t < 25.9 ? [-0.3, 0.5] : lk(A01_BH_LIE);
    P.earL = t < 25.9 ? 0.1 : settleTo(t, 25.9, 0.1, 1, 0.3); P.earR = t < 26.0 ? 0.1 : settleTo(t, 26.0, 0.1, 0.9, 0.3);
    if (t >= 28.6) { P.earL = -0.3; P.earR = 0.6; P.mouth = 'smile'; P.brow = -0.3; }
    if (a01In(t, 30.5, 31.2)) { P.gaze = [0.3, 1]; P.lid = 0.3; P.mouth = 'closed'; }
    if (t >= 31.4) { P.mouth = 'closed'; P.brow = -0.2; }
    return P;
  }
  if (t < 45.05) {   // S5 pity, then the idea
    P.straw = false; P.headDown = 0; P.gaze = lk(A01_BH_LIE);
    P.earL = settleTo(t, 37.2, 0.6, -0.6, 1.0); P.earR = settleTo(t, 37.4, 0.6, -0.6, 1.0); P.brow = -0.6; P.mouth = 'frown';
    if (t >= 38.9) { P.wet = true; P.lid = Math.max(0, pulse(t, 39.0, 0.6)); P.tip = -0.04 * A01B(t, 38.9, 0.4); P.neck = 0.5 * pulse(t, 39.05, 0.6); }
    if (t >= 40.2) { P.wet = false; P.tip = 0; P.earL = 0.9; P.earR = -0.5; P.gaze = gazePlan(t, [[0, [-0.3, 0]], [40.3, [-0.7, -0.7]], [40.75, [0.6, -0.7]], [41.15, [0, -1]]], 0.07); P.mouth = 'closed'; P.brow = 0; }
    if (t >= 42.3) { P.gaze = gazePlan(t, [[0, [0, -1]], [42.35, lk(A01_BH_LIE)], [42.75, [1, -0.1]], [43.15, lk(A01_BH_LIE)]], 0.07); P.mouth = 'smirk'; P.lid = 0.3; P.brow = -0.3; }
    if (t >= 43.86) { P.earL = settleTo(t, 43.86, 0.9, 1, 0.3); P.earR = settleTo(t, 43.9, -0.5, 1, 0.3); P.sq = settleTo(t, 43.86, 1, 1.06, 0.4); P.lid = 0; P.gaze = [-0.3, -0.6]; }
    return P;
  }
  if (t < 67.35) {   // S6 the plan
    P.headDown = 0.3; P.earL = -0.4; P.earR = -0.4; P.tip = 0.08 * A01B(t, 46.3, 0.5); P.talk = talk(t, A01_TALK_DON, 1); P.gaze = lk(A01_BH_LIE); P.mouth = 'smirk';
    if (t < 46.8) P.gaze = gazePlan(t, [[0, [1, 0]], [45.6, [1, -0.2]], [46.0, [0.3, -1]], [46.4, lk(A01_BH_LIE)]], 0.07);
    if (a01In(t, 47.7, 48.6)) { P.tongue = true; P.lid = 0.8; P.gaze = [0, -1]; P.headDown = 0.1 + 0.15 * Math.abs(Math.sin(t * 12)); P.mouth = 'open'; }
    if (a01In(t, 48.6, 49.3)) P.mouth = 'smile';
    if (a01In(t, 49.95, 50.5)) P.headTurn = 0.12 * Math.abs(Math.sin((t - 49.95) * 12));
    if (t >= 50.2) P.gaze = lk(t < 56.7 ? [470, 430] : [330, 330]);
    if (a01In(t, 53.5, 55.0)) { P.earL = settleTo(t, 53.6, -0.4, -1, 0.15); P.earR = settleTo(t, 53.65, -0.4, -1, 0.15); }
    if (a01In(t, 55.5, 56.4)) P.headTurn = 0.14 * Math.abs(Math.sin((t - 55.5) * 7));
    if (t >= 61.3 && t < 65.9) P.gaze = gazePlan(t, [[0, lk([330, 330])], [62.6, lk(A01_BH_LIE)], [63.4, lk([330, 330])]], 0.15);
    if (t >= 65.9) { P.gaze = [-0.2, 0.15]; P.lid = t > 66.05 && t < 66.35 ? 1 : 0; P.headTurn = 0.18 * A01B(t, 65.9, 0.15) * (1 - A01B(t, 66.5, 0.3)); P.mouth = 'smirk'; }
    return P;
  }
  // standing at the trough (S7 - S9)
  if (t < 97.4) { P.x = A01_DX7; P.y = A01_GR; P.lie = 0;
    P.headDown = 0.1; P.gaze = lk(A01_BH_LIE); P.earL = 0.5; P.earR = 0.5;
    if (a01In(t, 67.35, 69.4)) P.headDown = 0.1 + 0.18 * (pulse(t, 68.65, 0.3) + pulse(t, 68.95, 0.3));
    if (t >= 69.5) { P.earR = t < 70.3 ? settleTo(t, 69.5, 0.5, 1, 0.2) : 0.5; P.headDown = t < 70.3 ? 0.1 : settleTo(t, 70.3, 0.1, 0.7, 0.4); P.chew = t > 70.6 ? 0.5 + 0.5 * Math.sin(t * 8) : 0; P.lid = 0.3; P.gaze = t < 71.5 ? [0.2, 1] : lk([kfn(t, [[71.5, 900], [72.6, 560]]), 720]); }
    if (t >= 74.8) P.gaze = lk([kfn(t, [[74.8, 470], [76.4, 470], [76.8, 160]]), 780]);
    if (t >= 77.3) { P.headDown = settleTo(t, 77.3, 0.7, 1.0, 0.3); P.x += tremble(t, 1.5, 8); P.lid = 0.65; P.mouth = 'smile'; P.earL = 0.3 + 0.3 * Math.sin(t * 9); P.chew = 0; }
    if (t >= 78.5) { P.headDown = 0.6; P.x = A01_DX7; P.chew = 0.5 + 0.5 * Math.sin(t * 8); P.lid = Math.max(0.4, blink(t, 23)); P.mouth = 'smile'; P.earL = 0.4; P.gaze = [0.2, 0.8]; }
    if (t >= 95.0) { P.headDown = settleTo(t, 95.0, 0.6, 0.1, 0.4); P.mouth = 'smile'; P.lid = 0.4; P.chew = 0.5 + 0.5 * Math.sin(t * 8); P.barley = true; P.gaze = [-0.3, 0.2]; }
    if (t >= 96.2) { P.chew = 0; P.eyes = 'wide'; P.noBlink = true; P.lid = 0; P.earL = settleTo(t, 96.2, 0.4, 1, 0.12); P.earR = settleTo(t, 96.22, 0.4, 1, 0.12); P.mouth = 'o'; P.gaze = [0.3, -0.05]; P.barley = t < 96.8; P.sq = settleTo(t, 96.2, 1, 1.05, 0.2); }
    if (t >= 96.8) { P.raise = A01B(t, 96.8, 0.25); P.earL = settleTo(t, 97.0, 1, -0.5, 0.25); P.earR = settleTo(t, 97.2, 1, -0.5, 0.25); }
    return P;
  }
  if (t < 109.2) {   // S10-S11 the field
    P.y = A01_GR; P.lie = 0; P.dir = 1; P.yoke = t >= 98.4 && t < 108.9; P.x = a01DXF(t);
    if (t < 100.3) { P.gaze = t < 98.6 ? [-0.6, -0.3] : [-1, 0.3]; P.sq = t < 98.4 ? 1 : landSquash(t, 98.4, 0.1); P.earL = 0.2; P.earR = 0.2; P.mouth = 'frown'; P.brow = -0.4; P.headDown = 0.15; }
    else if (t < 101.2) { P.ph = (t - 100.3) * 16; P.amp = 1; P.earL = -1; P.earR = -1; P.mouth = 'grit'; P.brow = 0.6; P.tip = 0.12; P.headDown = 0.3; P.gaze = [1, 0.3]; }
    else if (t < 102.3) { Object.assign(P, walk(a01DXF, t, { stride: GAIT.donkey * 0.8 })); P.earL = -0.6; P.earR = -0.6; P.mouth = 'grit'; P.tip = 0.08; P.headDown = 0.3; P.gaze = [1, 0.4]; }
    else if (t < 104.8) { const k = (t - 102.3) / 2.5; P.ph = t * 13; P.amp = 1; P.sag = 0.8 * k; P.earL = -0.6 - 0.4 * k; P.earR = -0.6 - 0.4 * k; P.mouth = 'grit'; P.tip = 0.08; P.headDown = 0.3 + 0.3 * k; P.gaze = [1, 0.5]; }
    else { P.sag = 0.8; P.x += tremble(t, 2, 12) * (t < 106.5 ? 1 : 0.5); P.tongue = true; P.mouth = 'open'; P.headDown = 0.5; P.earL = -1; P.earR = -1;
      if (t >= 105.3) { P.brow = -0.8; P.mouth = 'o'; P.tongue = false; P.gaze = gazePlan(t, [[0, [1, 0.3]], [105.4, [-1, 0.2]], [106.0, [0.3, 1]]], 0.12); P.headDown = 0.4; }
      if (t >= 106.8) { P.sq = 1 + 0.05 * Math.sin(t * 16); P.mouth = 'open'; P.tongue = true; P.gaze = [0.6, 0.4]; }
      if (t >= 107.5) { P.lid = 0.7 * (pulse(t, 107.6, 0.3) + 0.8 * pulse(t, 108.0, 0.3) + 0.6 * pulse(t, 108.35, 0.3)); P.headDown = 0.45 + 0.08 * pulse(t, 107.6, 0.3); }
      if (t >= 108.6) { P.sag = settleTo(t, 108.85, 0.8, 1, 0.4); P.headDown = settleTo(t, 108.85, 0.5, 0.8, 0.4); P.earL = -1; P.earR = settleTo(t, 109.0, -0.6, -1, 0.2); } }
    return P;
  }
  if (t < 114.1) {   // S12 hobbles in and collapses
    if (t < 110.9) { P.y = A01_GR; P.lie = 0; Object.assign(P, walk(A01_DXIN, t, { stride: GAIT.donkey * 0.8 })); P.amp *= 0.6; P.y -= 4 * Math.abs(Math.sin(P.ph)); P.sag = 1; P.headDown = 0.7; P.earL = -1; P.earR = -0.8; P.lid = 0.6; P.mouth = 'open'; P.gaze = [0.4, 0.8]; }
    else { const a = A01B(t, 110.9, 0.4, 'in'), b = A01B(t, 111.35, 0.4, 'in'); P.x = 742; P.lie = 0.5 * a + 0.5 * b; P.y = K.lerp(A01_GR, A01_DLY, b); P.tip = 0.18 * a * (1 - b); P.sag = 1; P.earL = -1; P.earR = -1;
      P.headDown = t < 111.8 ? 0.7 : 1; P.sq = impactSquash(t, 111.8, 0.85); P.lid = 0.8; P.wet = t >= 111.8; P.mouth = 'open'; P.gaze = [0, 0.5]; P.x = K.lerp(742, A01_DLX, b); }
    return P;
  }
  if (t < 123.1) {   // S13 flat, only the pupils move
    P.headDown = 1; P.earL = -1; P.earR = -1 + 0.5 * pulse(t, 119.6, 0.25); P.sag = 0.6; P.lid = 0.6; P.noBlink = t >= 119.0; P.mouth = 'closed';
    P.gaze = t < 119.04 ? [-0.2, 0.6] : lk([kfn(t, [[114.3, 330], [115.6, 380]]) + 140, 700]);
    return P;
  }
  if (t < 133.05) {   // S14 anger, bonk, the second idea
    P.headDown = 0.9; P.earL = -0.8; P.earR = -0.8; P.sag = 0.5; P.headTurn = settleTo(t, 123.3, 0, 0.62, 0.6); P.mouth = 'frown'; P.brow = 0.5; P.gaze = [0.2, 0.4];
    if (t >= 126.8) { P.flush = A01B(t, 126.85, 0.9) * (1 - A01B(t, 128.0, 0.3)); P.snort = K.clamp(pulse(t, 127.2, 0.6) + pulse(t, 127.6, 0.4)); P.brow = 1; P.earL = -1; P.earR = -1; }
    if (t >= 127.8) { P.headDown = 0.9 + 0.25 * pulse(t, 127.85, 0.3); P.sq = impactSquash(t, 128.0, 0.92); P.lid = t < 128.6 ? 0.9 : 0; P.brow = 0; }
    if (t >= 128.6) { P.lid = 0.15; P.noBlink = true; P.gaze = t < 129.3 ? [0.2, 0.3] : gazePlan(t, [[0, [0.2, 0.3]], [129.35, [-0.8, -0.4]], [129.65, [0.8, -0.4]], [129.92, [-0.6, -0.8]], [130.66, [0.6, -0.8]], [131.0, [-0.6, -0.8]]], 0.07); }
    if (t >= 131.2) { P.earL = settleTo(t, 131.25, -0.8, 0.8, 0.5); P.earR = settleTo(t, 131.8, -0.8, 0.9, 0.5); P.mouth = 'smirk'; P.lid = 0.3; P.gaze = [0.3, 0]; }
    return P;
  }
  if (t < 143.8) {   // S15 the lie
    P.lie = 1 - 0.45 * A01B(t, 133.25, 0.9); P.y = A01_DLY + 10 * A01B(t, 133.25, 0.9); P.headTurn = 0.62 * (1 - A01B(t, 133.2, 0.4)); P.headDown = 0.05; P.brow = -0.7; P.mouth = 'frown'; P.earL = 0.2; P.earR = 0.2; P.talk = talk(t, A01_TALK_DON, 2); P.gaze = lk(A01_BH_UP);
    if (a01In(t, 134.7, 135.1)) P.sq = 1 - 0.04 * Math.sin((t - 134.7) * 30);
    if (a01In(t, 135.8, 137.4)) { P.earR = 1; P.earL = 0.6; P.gaze = t < 136.4 ? lk([500, 470]) : lk(A01_BH_UP); }
    if (t >= 141.8) { P.raise = A01B(t, 141.8, 0.3) * (1 - A01B(t, 143.0, 0.3)); P.gaze = lk(A01_BH_UP); }
    return P;
  }
  if (t < 152.82) {   // S16 mask on, mask off
    P.lie = 0.55; P.y = A01_DLY + 10; P.headDown = 0.05; P.earL = 0.2; P.earR = 0.2; P.brow = -0.7; P.mouth = 'frown'; P.gaze = lk(A01_BH_UP);
    const off = (t >= 147.12 && t < 148.22) || (t >= 149.3 && t < 151.7);
    if (off) { P.headTurn = 0.7; P.mouth = 'smirk'; P.lid = 0.35; P.brow = 0; P.gaze = [0.3, 0.2]; P.earR = 0.6; }
    else if (t >= 148.22 && t < 149.3) { P.headTurn = 0.7 * (1 - A01B(t, 148.22, 0.1)); P.brow = -0.7; P.mouth = 'frown'; P.lid = 0; }
    if (t >= 147.12 && t < 147.3) P.headTurn = 0.7 * A01B(t, 147.12, 0.18);
    if (t >= 149.3 && t < 149.45) P.headTurn = 0.7 * A01B(t, 149.3, 0.15);
    if (t >= 151.7) { P.headTurn = 0.35; P.gaze = [0, 0.05]; P.mouth = 'smirk'; P.lid = t > 151.9 && t < 152.25 ? 1 : 0; if (t >= 152.25) { P.headTurn = 0.35 * (1 - A01B(t, 152.25, 0.4)); P.lie = 0.55 + 0.45 * A01B(t, 152.25, 0.5); P.headDown = 0.9 * A01B(t, 152.3, 0.5); P.lid = A01B(t, 152.35, 0.3); } }
    return P;
  }
  if (t < 166.9) {   // S17-S18 asleep on the straw
    P.headDown = 0.9; P.lid = 1; P.earL = -0.7; P.earR = -0.7; P.sq = breathe(t, 5, 0.03); P.sag = 0.4;
    if (a01In(t, 159.04, 159.95)) { P.lid = t < 159.2 ? 1 - 0.5 * A01B(t, 159.04, 0.15) : t < 159.7 ? 0.5 : 0.5 + 0.5 * A01B(t, 159.7, 0.2); P.gaze = lk(A01_BH_UP); P.mouth = 'smile'; }
    return P;
  }
  // S19 recovering
  P.headDown = 0.95; P.sag = 0.6; P.earL = -1; P.earR = -1; P.lid = 0.7; P.sq = breathe(t, 5, 0.05); P.cloth = true; P.wet = false; P.gaze = [-0.3, 0.3];
  if (t >= 168.6 && t < 169.7) { P.headDown = 0.95 - 0.35 * pulse(t, 168.65, 0.9); P.lid = 0.85; P.brow = -0.5; }
  if (t >= 170.5 && t < 171.5) { P.sq = 1 + 0.05 * pulse(t, 170.55, 0.5) - 0.04 * pulse(t, 171.0, 0.45); P.snort = pulse(t, 171.0, 0.45); }
  if (t >= 173.2) { P.lid = 0.35; P.gaze = lk([kfn(t, [[173.2, 470], [176.3, 545]], 'lin'), 500]); P.x += tremble(t, 2, 10) * (t > 173.5 && t < 174.0 ? 1 : 0); }
  if (t >= 174.6) { P.mouth = 'smirk'; P.earR = settleTo(t, 174.7, -1, 0.8, 0.5) * (t < 176.3 ? 1 : 1) - (t >= 176.6 ? 1.6 * A01B(t, 176.6, 0.8) : 0); P.brow = -0.3; }
  if (t >= 176.3) { P.lid = A01B(t, 176.3, 0.6); P.earL = -1 + 0.6 * pulse(t, 177.8, 0.3); }
  return P;
}

// ---------- the merchant and the worker (Library person) ----------
const A01_MER = { costume: 'merchant', pal: { hc: C.yellow, hd: C.red, sash: C.red, trim: C.red } };
const A01_WRK = { costume: 'servant', pal: { hc: C.white, robe: '#f2e6c8', dot: '#d9b98a' } };
function a01MerchP(t) {
  const P = { ...A01_MER, x: 1150, y: A01_GR, s: 1, dir: -1, seed: 31 };
  if (t < 5.2) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = t < 0.5 || t > 2.2 ? PERSON_HANDS.hipsHands.R : PERSON_HANDS.armsOut.R; P.mouth = 'smile'; P.lid = pulse(t, 1.2, 0.2); P.gaze = t < 1.5 ? [-0.6, 0] : [-1, 0.1]; P.drop = -3; return P; }
  if (t >= 56.6 && t < 67.3) {   // at the stable window (drawn behind the wall)
    Object.assign(P, walk(A01_MXW, t)); P.amp = Math.min(1, P.amp); P.x = A01_MXW(t); P.y = 636; P.s = 0.85; P.dir = 1; P.gaze = [-0.2, 0.9]; P.brow = -0.4; P.window = true;
    if (t >= 61.32) { P.handR = PERSON_HANDS.cupEar.R; P.mouth = t > 61.9 ? 'smile' : 'closed'; }
    if (t >= 66.2) { P.handR = PERSON_HANDS.moustache.R; P.mouth = 'smile'; }
    return P;
  }
  if (t >= 78.5 && t < 97.4) {   // the yard
    P.x = A01_MX8(t); if (t < 80.8) Object.assign(P, walk(A01_MX8, t)); P.x = A01_MX8(t); P.dir = -1; P.scroll = true; P.handL = [10, -122]; P.brow = -0.3; P.gaze = lookAt([P.x, 705], [A01_WX8(t), 705]);
    if (t < 79.6) P.alpha = 0;
    if (t >= 82.8) { P.gaze = [-1, 0.1]; P.lid = pulse(t, 83.4, 0.4); P.mouth = 'smile'; P.brow = -0.4; }
    if (t >= 85.2) { const tap = Math.max(pulse(t, 85.3, 0.35), pulse(t, 85.75, 0.35)); P.handR = [K.lerp(30, 42, tap), K.lerp(-150, -200, tap)]; P.mouth = 'smile'; }
    if (t >= 86.4) { P.handR = PERSON_HANDS.cupEar.R; P.gaze = [-0.8, -0.2]; }
    if (t >= 88.6) { P.handR = PERSON_HANDS.moustache.R; P.gaze = [0, 0.05]; P.wink = t > 89.15 && t < 89.65 ? 'L' : null; P.mouth = 'smile'; }
    if (t >= 90.3) { P.handR = PERSON_HANDS.pointUp.R; P.mouth = 'closed'; P.brow = 0; P.gaze = lookAt([P.x, 705], [A01_WX8(t), 705]); P.wink = null; }
    if (t >= 93.8) { const w = Math.sin((t - 93.8) * 9); P.handR = [K.lerp(80, 100, 0.5 + 0.5 * w), K.lerp(-150, -120, 0.5 + 0.5 * w)]; P.gaze = [-1, 0]; }
    if (t >= 95.6) { const k = settleTo(t, 95.6, 0, 1, 0.3, 0.2); P.handR = [K.lerp(60, 108, k), -158]; P.lean = 0.06 * k; P.gaze = [-1, 0]; }
    P.talk = talk(t, A01_TALK_MER, 2);
    return P;
  }
  return null;
}
function a01WorkP(t) {
  const P = { ...A01_WRK, x: 0, y: A01_GR, s: 0.95, dir: 1, seed: 41 };
  if (t >= 5.2 && t < 11.1) {   // S2 behind the plough
    const sx = A01_BXF(t) - 330, g = [sx - 34, A01_GR - 112]; P.x = g[0] - 46; Object.assign(P, walk((tt) => A01_BXF(tt) - 330 - 80, t)); P.x = g[0] - 46; P.lean = 0.12; P.handRW = [g[0], g[1]]; P.handLW = [g[0] - 2, g[1] + 6]; P.gaze = [1, 0.6];
    if (a01In(t, 9.5, 10.2)) { P.handLW = null; P.handL = [-6, -206 + 10 * Math.sin((t - 9.5) * 14)]; }
    return P;
  }
  if (t >= 70.3 && t < 78.5) {   // S7 the worker cannot shift the bull
    P.x = A01_WX7(t); P.dir = t < 76.4 ? -1 : 1; P.ph = P.x / 20; P.amp = K.clamp(Math.abs(speed(A01_WX7, t)) / 120); P.carry = t < 74.8;
    if (P.carry) { P.handL = [-24, -196]; P.handR = [20, -190]; }
    if (t >= 71.62) { P.drop = 9 * pulse(t, 71.65, 0.35) - 4 * pulse(t, 72.0, 0.3); P.eyes = t < 72.6 ? 'wide' : 'open'; P.brow = -0.6; P.gaze = lookAt([P.x, 700], A01_BH_LIE); }
    if (a01In(t, 73.5, 74.25)) P.gaze = [1, -0.2];
    if (a01In(t, 74.8, 76.4)) { const h = [A01_BX0 + 128 + 10 * Math.sin(t * 9), 748]; P.handLW = h; P.handRW = [h[0] + 6, h[1] + 14]; P.lean = -0.25; P.x += tremble(t, 3, 7); P.mouth = 'grit'; P.brow = 0.8; P.eyes = 'open'; }
    if (a01In(t, 76.4, 76.85)) { P.amp = 1.3; P.eyes = 'open'; P.brow = 0.3; }
    if (a01In(t, 76.85, 77.4)) { P.handLW = [178, 800]; P.handRW = [176, 820]; P.lean = 0.3; P.mouth = 'grit'; P.brow = 0.8; P.amp = 0; }
    if (t >= 77.4) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.drop = 6 * A01B(t, 77.4, 0.4); P.mouth = 'frown'; P.brow = -0.6; P.amp = 0; P.gaze = [-0.2, 0.3]; P.dir = -1; }
    return P;
  }
  if (t >= 78.5 && t < 97.4) {   // S8-S9 the report
    P.x = A01_WX8(t); P.dir = 1; if (t < 79.6) { Object.assign(P, walk(A01_WX8, t)); P.x = A01_WX8(t); P.amp = Math.min(1.3, P.amp * 1.4); P.handL = [-50, -150 + 30 * Math.sin(P.ph)]; P.handR = [50, -150 - 30 * Math.sin(P.ph)]; }
    P.tip = -0.12 * pulse(t, 79.5, 0.4); P.brow = -0.5; P.talk = talk(t, A01_TALK_WRK, 3); P.gaze = lookAt([P.x, 705], [A01_MX8(t), 705]);
    if (a01In(t, 81.3, 82.0)) P.handL = [-100, -150];
    if (a01In(t, 82.0, 82.8)) { P.mouth = 'o'; P.tilt = 0.18; P.handL = [-34, -214]; P.handR = [34, -214]; }
    if (t >= 82.8) { P.mouth = 'o'; P.brow = -0.3; }
    if (a01In(t, 92.7, 93.9)) { P.drop = 5 * (pulse(t, 92.9, 0.3) + pulse(t, 93.35, 0.3)); P.mouth = 'closed'; }
    if (t >= 95.7) { P.gaze = [-1, 0]; P.eyes = 'wide'; }
    return P;
  }
  if (t >= 97.4 && t < 109.2) {   // S10-S11
    const D = a01DonkeyP(t), dx = D.x, sh = dx - 290, g = [sh - 34, A01_GR - 112];
    if (t < 99.5) { P.behind = true; P.x = dx + 110; P.dir = -1; const n = a01DonkeyNeck(D); P.handLW = [n[0] - 8, n[1] - 6 - 30 * (1 - A01B(t, 97.6, 0.8))]; P.handRW = [n[0] + 10, n[1] - 10 - 30 * (1 - A01B(t, 97.6, 0.8))]; P.gaze = lookAt([P.x, 705], n); P.lean = 0.1; if (t > 98.4) P.handRW = [n[0] + 14, n[1] - 4 + 6 * Math.sin(t * 20) * (t < 98.9 ? 1 : 0)]; return P; }
    if (t < 100.3) { P.x = kfn(t, [[99.5, dx + 130], [100.2, g[0] - 46]]); P.dir = t < 99.85 ? -1 : 1; P.ph = P.x / 20; P.amp = 0.8; P.gaze = [1, 0.4]; return P; }
    if (t < 106.0) { P.x = g[0] - 46; P.handRW = g; P.handLW = [g[0] - 2, g[1] + 6]; P.lean = 0.1; P.gaze = [1, 0.5]; if (t >= 101.2 && t < 104.8) { P.ph = t >= 102.3 ? t * 13 : P.x / 20; P.amp = 1; } P.mouth = t > 101.2 && t < 101.6 ? 'o' : 'closed'; return P; }
    // walks round behind the donkey and lifts the yoke off
    P.x = kfn(t, [[106.0, 1150 - 290 - 80], [107.5, 1185]]); P.ph = P.x / 20; P.amp = t < 107.5 ? 1 : 0; P.dir = 1; P.behind = true; P.gaze = [1, 0.4];
    if (t >= 108.5) { const n = a01DonkeyNeck({ ...D, sag: 0.8 }), up = A01B(t, 108.6, 0.35); P.handLW = [n[0] - 6, n[1] - 4 - 70 * up]; P.handRW = [n[0] + 14, n[1] - 8 - 70 * up]; P.yokeUp = up; P.gaze = [0.4, 0.6]; }
    return P;
  }
  if (t >= 160.9 && t < 166.9) {   // S18
    P.x = A01_WX18(t); P.dir = t < 163.6 ? -1 : 1; P.ph = P.x / 20; P.behind = t >= 163.3; P.amp = K.clamp(Math.abs(speed(A01_WX18, t)) / 100);
    if (t < 162.82) { P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; P.carry = 'hands'; P.lean = -0.08 * A01B(t, 161.7, 0.3); P.brow = 0.6; P.mouth = 'grit'; P.gaze = lookAt([P.x, 705], [960, 740]);
      if (t >= 162.1) { P.brow = -0.7; P.mouth = 'o'; P.eyes = 'wide'; } }
    else if (t < 163.3) { P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; P.brow = -0.8; P.mouth = 'o'; P.eyes = 'wide'; P.gaze = [-1, 0.2]; }
    else { P.handL = t < 163.9 ? PERSON_HANDS.palmsUp.L : [-6, -150]; P.handR = t < 163.9 ? PERSON_HANDS.palmsUp.R : [36, -214 + 8 * Math.sin(t * 16)]; P.brow = -0.6; P.mouth = 'o'; P.gaze = lookAt([P.x, 705], a01BullHead(a01BullP(t))); }
    return P;
  }
  return null;
}

// ---------- in-cloud plan (S6): drawn in cloud world units around A01_CLOUD_AT ----------
function a01PlanInside(c, t) {
  shape(c, [[-300, 900], [1300, 900], [1300, 1000], [-300, 1000]], '#3f9d4a', { lw: 6, seed: 180 });
  const drop = t < 51.9 ? null : fallY(t, 51.9, 52.3, -520, 0), lieT = 53.62, P = { x: 470, y: 900, s: 1, dir: 1, seed: 51, ears: 0.6, mouth: 'smile', gaze: [0.6, 0] };
  if (drop != null && drop >= 0) { P.yoke = true; P.sq = impactSquash(t, 52.3, 0.88); P.mouth = 'o'; P.eyes = 'wide'; }
  if (t >= lieT) { P.lie = A01B(t, lieT, 0.2, 'in'); P.sq = impactSquash(t, lieT + 0.2, 0.8); P.tongue = 1; P.eyes = 'shut'; P.mouth = 'open'; P.headDown = 0.8; P.legUp = 0.7 * A01B(t, lieT + 0.2, 0.3); P.ears = -0.6; }
  if (t >= 60.2 && t < 63.3) { P.headDown = 0.3; P.chinUp = 0.6 * A01B(t, 60.3, 0.3); P.eyes = 'shut'; P.tongue = 0; P.mouth = 'closed'; }
  if (t >= 64.6) { P.mouth = 'smile'; P.tongue = 0; P.headDown = 0.8; P.eyes = 'shut'; }
  if (drop != null) a01Plough(c, P.x - 330 + 0, 900 + Math.min(0, drop), 1, { yoke: drop >= 0 ? a01BullYokeW(P) : null, taut: 0.4 });
  a01Bull(c, P);
  if (drop != null && drop < 0) a01Yoke(c, P.x + 102, 900 - 0.8 * 228 + drop, 1, 1);
  if (t >= 55.5 && t < 56.9) { S0.arrow(c, [470, 560], [470, 300], A01B(t, 55.5, 0.3), { width: 50 }); a01Cross(c, 470, 420, 2.2, a01Pop(t, 55.9, 0.25)); }
  if (t >= 58.3) { const tx = kfn(t, [[58.3, 1250], [59.2, 760]], 'out'); a01Trough(c, tx, 830, 1, { w: 180 }); if (t >= 60.6) a01Cross(c, tx, 800, 1.6, a01Pop(t, 60.6, 0.25)); }
  if (t >= 63.3) { const wx = kfn(t, [[63.3, 1250], [63.9, 960], [64.6, 960], [65.6, 1400]], 'lin'), W = { ...A01_WRK, x: wx, y: 900, s: 1.1, dir: t < 64.6 ? -1 : 1, ph: wx / 20, amp: (t < 63.9 || t > 64.6) ? 1 : 0, brow: -0.6, mouth: 'o' };
    if (t >= 63.9 && t < 64.6) { W.handR = PERSON_HANDS.headHold.R; W.handL = [-20, -120]; sfx(c, '?', wx + 10, 560, 130, a01Pop(t, 63.95, 0.2), { fill: C.yellow }); } person(c, W); }
  if (t >= 64.9) zzz(c, 560, 650, t);
}
// mini icons for balloons and small clouds
function a01MiniDonkey(c, x, y, s, o = {}) { donkey(c, { x, y, s, dir: -1, lie: 1, headDown: 0.6, lid: 1, earL: -0.3, earR: -0.3, noBlink: true, ...o }); }
function a01MiniBull(c, x, y, s, o = {}) { a01Bull(c, { x, y, s, dir: 1, noBlink: true, ...o }); }
function a01Balloon(ctx, cx, cy, w, h, tx, ty, p, draw) { bubble(ctx, cx, cy, w, h, tx, ty, p, ''); const k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.beginPath(); ctx.ellipse(0, 0, w / 2 - 6, h / 2 - 6, 0, 0, 7); ctx.clip(); draw(ctx); ctx.restore(); }
function a01MerchHead(c, x, y, s) { c.save(); c.beginPath(); c.arc(x, y - 200 * s, 70 * s, 0, 7); c.clip(); person(c, { ...A01_MER, x, y, s, dir: -1, mouth: 'smile', noBlink: true }); c.restore(); }

// ---------- world ----------
function a01World(ctx, t, cam, o = {}) {
  if (a01IsField(t)) return a01FieldWorld(ctx, t, cam);
  const u = a01U(t), lit = a01Lit(t), M = a01MerchP(t);
  const behind = (c) => {
    if (M && M.window) { person(c, M); }
    if (t >= 166.9) { shape(c, [[430, 540], [430, 500], [500, 492], [570, 500], [570, 540]], '#3f9d4a', { lw: 3, seed: 190 }); const bx = 380 + ((t - 166.9) % 6) / 6 * 260;
      a01Plough(c, bx - 40, 520, 1, { s: 0.14, dig: 1, yoke: [bx + 14, 494] }); a01Bull(c, { x: bx, y: 520, s: 0.15, dir: 1, ph: bx / 6, amp: 1, yoke: true, noBlink: true }); }
  };
  a01Stable(ctx, u, t, { behind, lit, smoke: t > 153.9 && t < 155.1 ? (t - 153.9) / 1.2 : 0, lampSwing: 0.04 * Math.sin(t * 1.3) * lit });
  if (M && !M.window && M.alpha !== 0) { person(ctx, M); if (M.scroll) { const h = [M.x - 12, M.y - 122]; shape(ctx, [[h[0] - 8, h[1] - 30], [h[0] + 10, h[1] - 30], [h[0] + 12, h[1] + 26], [h[0] - 6, h[1] + 26], [h[0] - 8, h[1] - 30]], C.white, { lw: 3.5, seed: 191 }); } }
  // S18 plough waiting at the field edge, then hooked and dragged
  const BP = a01BullP(t), DP = a01DonkeyP(t), WP = a01WorkP(t);
  if (t >= 160.7 && t < 166.9) { const hook = t >= 164.42, sx = Math.max(A01_PLW, (BP ? BP.x : 0) - 330), y = a01BullYokeW(BP);
    if (sx > A01_PLW + 1) shape(ctx, [[A01_PLW, 900], [sx, 900], [sx, 912], [A01_PLW, 913]], '#5b3010', { lw: 3, seed: 192 });
    a01Plough(ctx, sx, A01_GR, 1, { dig: sx > A01_PLW + 1 ? 1 : 0, yoke: hook ? y : null, taut: K.clamp((BP.x - 330 - A01_PLW + 40) / 40) }); }
  // troughs behind lying animals, in front of standing ones
  const bFill = t < 13.7 ? 0.35 : t < 152.82 ? 0.3 : t < 158.0 ? 0.65 : t < 159.96 ? K.lerp(0.6, 0.1, Math.floor((t - 158) / 0.25) / 7) : 0;
  const dFill = t < 17.4 ? 1 : t < 37 ? 0.8 : t < 67.35 ? 0.75 : 0.9, dDx = t >= 39.0 && t < 67.35 ? -20 * A01B(t, 39.0, 0.5) : 0;
  const trB = () => a01Trough(ctx, A01_TR_B, A01_TR_Y, bFill, { seed: 5, sparkle: t >= 159.96 && t < 160.9 ? a01Fade(t, 159.96, 160.9, 0.15) : 0 });
  const trD = () => a01Trough(ctx, A01_TR_D, A01_TR_Y, dFill, { seed: 6, dx: dDx });
  const bBack = !BP || (BP.lie || 0) > 0.5 || BP.x > 600, dBack = !DP || (DP.lie || 0) > 0.3 || DP.x > 760;
  if (bBack) trB(); if (dBack) trD();
  if (WP && WP.behind) a01Worker(ctx, WP, t);
  if (BP) { a01Bull(ctx, BP); }
  if (DP) { donkey(ctx, DP); a01DonkeyExtras(ctx, DP, t); }
  if (!bBack) trB(); if (!dBack) trD();
  a01StableFrontMix(ctx, u);
  if (WP && !WP.behind) a01Worker(ctx, WP, t);
  a01StableFx(ctx, t, BP, DP, WP, M, o);
}
function a01Worker(ctx, WP, t) {
  person(ctx, WP);
  if (WP.carry === true) a01Yoke(ctx, WP.x - 4, WP.y - 196 * WP.s, 0.75, -1, -0.25);
  if (WP.carry === 'hands') a01Yoke(ctx, WP.x - 10, WP.y - 200 * WP.s, 0.75, -1, 0.1);
  if (t >= 74.8 && t < 78.5) a01Yoke(ctx, 600, 892, 0.75, -1, 0.05);
  if (t >= 162.82 && t < 162.98) { const u = A01B(t, 162.82, 0.16), B = a01BullYokeW(a01BullP(162.98)); a01Yoke(ctx, K.lerp(WP.x - 10, B[0] + 4, u), K.lerp(WP.y - 200 * WP.s, B[1] - 10, u) - 30 * Math.sin(Math.PI * u), 0.75, -1, 0.1); }
  if (WP.yokeUp != null) a01Yoke(ctx, WP.handLW[0] + 8, WP.handLW[1] - 6, 0.75, 1, -0.1);
}
// donkey props: straw in the mouth, barley, wet cloth, flush, yoke
function a01DonkeyExtras(ctx, P, t) {
  const H = a01DonkeyHead(P), d = P.dir ?? 1, s = P.s;
  const mouth = [H[0] + d * s * 40, H[1] + s * 22];
  if (P.straw) { seg(ctx, mouth[0], mouth[1], mouth[0] + d * 34, mouth[1] + 18 + 4 * Math.sin(t * 3), 3.5, C.yellow, 1.5); }
  if (P.barley) for (let i = 0; i < 4; i++) seg(ctx, mouth[0] + d * (4 + i * 6), mouth[1] - 2, mouth[0] + d * (16 + i * 8), mouth[1] + 12 + i * 3, 3, C.yellow, 1.5);
  if (P.cloth) shape(ctx, [[H[0] - 34, H[1] - 30], [H[0] + 30, H[1] - 38], [H[0] + 34, H[1] - 22], [H[0] - 30, H[1] - 14], [H[0] - 34, H[1] - 30]], C.white, { lw: 4, seed: 193, dot: '#9cc4ff', pitch: 6, rad: 0.25, da: 0.5 });
  if (P.flush) { a01Flush(ctx, H[0], H[1] - 6, P.flush, 56); }
  if (P.yoke) { const n = a01DonkeyNeck(P); a01Yoke(ctx, n[0] + 4 * d, n[1] - 4, 0.66, d, 0.15 * d); }
}
// world-space effects in the stable
function a01StableFx(ctx, t, BP, DP, WP, M, o) {
  const BH = BP ? a01BullHead(BP) : A01_BH_LIE, DH = DP ? a01DonkeyHead(DP) : A01_DH_LIE;
  const dust = (t0, x, n = 8, sz = 1) => { if (t >= t0 && t < t0 + 0.6) dustBurst(ctx, x, A01_GR - 6, t - t0, n, 7 * sz, 16 * sz, 60 * sz, 0.55, Math.round(t0 * 10)); };
  dust(13.97, 300, 10, 1.2); dust(68.0, 330, 6); dust(111.4, 700, 8); dust(111.82, 650, 6, 0.8);
  for (const x of [190, 250, 360, 420]) dust(156.42, x, 4, 0.8);
  for (const f of A01_FALLS) if (f.t > 160 && t >= f.t && t < f.t + 0.5) dustBurst(ctx, f.x + 40, A01_GR - 4, t - f.t, 4, 5, 11, 26, 0.45, Math.round(f.t * 10));
  for (const f of A01_DFALLS) if (t >= f.t && t < f.t + 0.5) dustBurst(ctx, f.x, A01_GR - 4, t - f.t, 3, 5, 10, 22, 0.45, Math.round(f.t * 10));
  if (a01In(t, 74.8, 76.45)) for (let k = 0; k < 8; k++) { const t0 = 74.8 + k * 0.2; dust(t0, 520, 3, 0.6); }
  if (a01In(t, 76.4, 76.85)) for (let k = 0; k < 4; k++) dust(76.4 + k * 0.11, A01_WX7(76.4 + k * 0.11), 3, 0.6);
  // S3: grains, heart, ZZZ
  if (a01In(t, 18.4, 19.9)) for (const t0 of [18.5, 19.2]) if (t >= t0 && t < t0 + 0.6) { const u = (t - t0) / 0.6; seg(ctx, DH[0] - 40, DH[1] + 30 + u * 70, DH[0] - 32, DH[1] + 26 + u * 70, 3, C.yellow, 1.5); }
  if (a01In(t, 18.92, 19.9)) heart(ctx, 585, 730 - 30 * a01Pop(t, 18.92, 0.6), 24 * K.ease.back(a01Pop(t, 18.92, 0.3)), { alpha: a01Fade(t, 18.92, 19.9, 0.2) });
  if (a01In(t, 20.84, 22.6)) zzz(ctx, DH[0] + 10, DH[1] - 60, t);
  if (a01In(t, 176.6, A01_DUR)) zzz(ctx, DH[0] + 10, DH[1] - 60, t);
  // S4 speech pictures above the post
  const bub = (a, b, draw, cx = 400, cy = 470, w = 230, h = 170) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a01Fade(t, a, b, 0.2); a01Balloon(ctx, cx, cy, w, h, BH[0] - 10, BH[1] - 40, K.clamp((t - a) / 0.3), draw); ctx.restore(); };
  bub(29.4, 30.42, (c) => { a01MiniDonkey(c, 20, 40, 0.38); zzz(c, 20, -10, t); });
  bub(30.42, 31.6, (c) => { a01Trough(c, 0, 0, 1, { w: 150 }); });
  if (a01In(t, 30.5, 31.6)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 30.5, 31.6, 0.2); S0.arrow(ctx, [450, 560], [560, 760], A01B(t, 30.5, 0.4), { width: 22, bend: -0.2 }); ctx.restore(); }
  bub(33.4, 35.2, (c) => { a01Plough(c, -40, 50, 1, { s: 0.45 }); const v = A01B(t, 33.5, 1.2, 'lin'); c.save(); c.translate(K.lerp(-90, 90, v), -10 - 45 * Math.sin(Math.PI * v)); c.scale(0.28, 0.28); sun(c, 0, 0, t); c.restore(); });
  if (t >= 36.0 && t < 36.95) { a01Pain(ctx, 380, 790, t, 36.1); a01Pain(ctx, 200, 800, t, 36.45, 0.8); }
  // S5: ? dots, bulb
  if (a01In(t, 41.6, 43.86)) for (let i = 0; i < 3; i++) { const t0 = 41.6 + i * 0.2; if (t < t0) continue; const p = [DH[0] - 10 + i * 18, DH[1] - 80 - i * 34]; ctx.save(); ctx.globalAlpha = a01Fade(t, t0, 43.86, 0.15); if (i < 2) sfx(ctx, '?', p[0], p[1], 40 + i * 6, a01Pop(t, t0, 0.2), { fill: C.white }); ctx.restore(); }
  if (a01In(t, 41.78, 43.86)) { ctx.save(); ctx.globalAlpha = 0.35; bulb(ctx, DH[0] + 26, DH[1] - 190, 0.6 * a01Pop(t, 41.78, 0.3)); ctx.restore(); }
  if (a01In(t, 43.86, 45.05)) bulb(ctx, DH[0] + 26, DH[1] - 190, 0.6 + 0.4 * K.ease.back(a01Pop(t, 43.86, 0.3)));
  // S6: tomorrow sun, the plan cloud
  if (a01In(t, 46.7, 47.9)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 46.7, 47.9, 0.2); a01SunIcon(ctx, DH[0] + 10, DH[1] - 100 - 40 * A01B(t, 46.7, 0.8), 0.32, t); ctx.restore(); }
  if (a01In(t, 50.2, 66.85)) { const k = A01B(t, 56.4, 0.5), cx = K.lerp(500, 300, k), cy = K.lerp(420, 310, k), w = K.lerp(390, 300, k), h = K.lerp(250, 196, k);
    ctx.save(); ctx.globalAlpha = a01Fade(t, 50.2, 66.85, 0.3); thoughtCloud(ctx, cx, cy, w, h, t, { p: K.clamp((t - 50.2) / 0.8), tail: [DH[0] - 20, DH[1] - 50], inside: a01PlanInside, scale: K.lerp(0.3, 0.235, k), at: A01_CLOUD_AT, bg: '#fff6dc' }); ctx.restore(); }
  // S11-S12 pain, dizzy stars
  if (a01In(t, 111.82, 113.9)) { dizzy(ctx, DH[0] + 6, DH[1] - 50, t, 46); }
  if (a01In(t, 112.2, 113.0)) a01Pain(ctx, DH[0] + 110, DH[1] - 20, t, 112.2, 0.9);
  // S13 the bull's speech picture
  if (a01In(t, 120.7, 122.9)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 120.7, 122.9, 0.2); a01Balloon(ctx, 420, 470, 250, 180, BH[0] - 10, BH[1] - 40, K.clamp((t - 120.7) / 0.3), (c) => { a01MiniBull(c, -20, 60, 0.32, { lie: 1, headDown: 0.7, eyes: 'shut', mouth: 'smile' }); a01Trough(c, 70, 30, 1, { w: 70 }); zzz(c, -20, 10, t); c.save(); c.translate(70, -50); c.scale(0.22, 0.22); sun(c, 0, 0, t); c.restore(); }); ctx.restore(); }
  // S14 flush steam, door and plough icons
  if (DP && DP.snort > 0.01 && t < 133.05) { ctx.save(); ctx.globalAlpha = K.clamp(DP.snort * 1.5); steam(ctx, DH[0], DH[1] - 80, t); ctx.restore(); }
  if (a01In(t, 129.92, 132.7)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 129.92, 132.7, 0.2); const p = K.ease.back(a01Pop(t, 129.92, 0.25)); ctx.save(); ctx.translate(DH[0] - 50, DH[1] - 175); ctx.scale(p, p); shape(ctx, ell(0, 0, 58, 58, 24), C.white, { lw: 5, seed: 195 }); a01DoorIcon(ctx, 0, 6, 0.7); ctx.restore();
    if (t >= 130.66) { const q = K.ease.back(a01Pop(t, 130.66, 0.25)); ctx.save(); ctx.translate(DH[0] + 85, DH[1] - 160); ctx.scale(q, q); shape(ctx, ell(0, 0, 58, 58, 24), C.white, { lw: 5, seed: 196 }); a01Plough(ctx, -40, 30, 1, { s: 0.4 }); ctx.restore(); } ctx.restore(); }
  // S15 the long speech balloon: owner, bull ill, tomorrow, butcher (read right to left)
  if (a01In(t, 136.4, 143.8)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 136.4, 143.8, 0.2); const p = K.clamp((t - 136.4) / 0.3), cx = 470, cy = 455;
    a01Balloon(ctx, cx, cy, 560, 190, DH[0] - 30, DH[1] - 50, p, (c) => {
      if (t >= 136.68) { c.save(); c.translate(180, 0); c.scale(K.ease.back(a01Pop(t, 136.68, 0.25)), K.ease.back(a01Pop(t, 136.68, 0.25))); a01MerchHead(c, 0, 160, 0.62); c.restore(); }
      if (t >= 138.8) { c.save(); c.translate(40, 20); c.scale(K.ease.back(a01Pop(t, 138.8, 0.25)), K.ease.back(a01Pop(t, 138.8, 0.25))); a01MiniBull(c, -20, 50, 0.3, { lie: 1, tongue: 1, legUp: 1, eyes: 'shut', headDown: 0.6, mouth: 'open' }); c.restore(); }
      if (t >= 141.04) { c.save(); c.translate(-95, 20); const k = K.ease.back(a01Pop(t, 141.04, 0.25)); c.scale(k, k); a01SunIcon(c, 0, 0, 0.3, t); c.restore(); }
    }); ctx.restore(); }
  if (a01In(t, 143.12, 145.2)) { const k = K.ease.back(a01Pop(t, 143.12, 0.12)); ctx.save(); ctx.globalAlpha = a01Fade(t, 143.12, 145.2, 0.3); ctx.translate(330, 420); ctx.scale(k, k); a01Sign(ctx, 0, 0, 1.0, swing(t, 143.2, 0.25, 1.6, 2)); ctx.restore(); }
  // S16 feed falls, GULP neck, thought picture
  if (a01In(t, 143.9, 144.7) && BP) for (let i = 0; i < 4; i++) { const u = K.clamp((t - 143.9 - i * 0.08) / 0.5); if (u <= 0 || u >= 1) continue; seg(ctx, BH[0] + 40 + i * 6, BH[1] + 30 + u * 70, BH[0] + 52 + i * 6, BH[1] + 26 + u * 70, 3, C.yellow, 1.5); }
  if (a01In(t, 150.3, 151.75)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 150.3, 151.75, 0.2); thoughtCloud(ctx, 690, 430, 300, 200, t, { p: K.clamp((t - 150.3) / 0.5), tail: [DH[0] + 10, DH[1] - 60], scale: 0.24, at: [520, 760], bg: '#fff6dc', inside: (c) => {
    shape(c, [[0, 900], [1100, 900], [1100, 1000], [0, 1000]], '#3f9d4a', { lw: 6, seed: 181 }); a01Plough(c, 260, 900, 1, { yoke: [690, 718], taut: 1 }); a01Bull(c, { x: 590, y: 900, s: 1, dir: 1, yoke: true, headDown: 0.3, mouth: 'grit', noBlink: true });
    a01MiniDonkey(c, 980, 880, 0.9); a01Tick(c, 560, 520, 2.4, a01Pop(t, 150.7, 0.3)); } }); ctx.restore(); }
  // S17 speed lines
  if (a01In(t, 156.3, 157.9) && BP) { ctx.save(); ctx.globalAlpha = a01Fade(t, 156.3, 157.9, 0.2) * 0.8; for (let i = 0; i < 6; i++) BEAST.line(ctx, [[BP.x - 150 - i * 6, 700 + i * 30], [BP.x - 260 - (i % 2) * 40, 700 + i * 30]], 5, C.white); ctx.restore(); }
  if (a01In(t, 158.0, 159.6) && BP) for (let k = 0; k < 6; k++) { const t0 = 158.05 + k * 0.25, u = (t - t0) / 0.5; if (u < 0 || u > 1) continue; const a = -1.2 - (k % 3) * 0.6; seg(ctx, A01_TR_B + Math.cos(a) * 80 * u, 780 + Math.sin(a) * 90 * u + 60 * u * u, A01_TR_B + Math.cos(a) * 80 * u + 12, 776 + Math.sin(a) * 90 * u + 60 * u * u, 3, C.yellow, 1.5); }
  // S19 breath puff and the shudder memory
  if (DP && DP.snort > 0.02 && t >= 166.9) { ctx.save(); ctx.globalAlpha = DP.snort; for (const [dx, r] of [[-60, 10], [-80, 14], [-104, 18]]) shape(ctx, ell(DH[0] + dx, DH[1] + 16, r, r * 0.8, 12), C.white, { lw: 3, seed: 194 }); ctx.restore(); }
  if (a01In(t, 173.32, 174.4)) { ctx.save(); ctx.globalAlpha = a01Fade(t, 173.32, 174.4, 0.15); thoughtCloud(ctx, DH[0] + 160, DH[1] - 170, 260, 190, t, { p: K.clamp((t - 173.32) / 0.3), tail: [DH[0] + 20, DH[1] - 40], scale: 0.26, at: [500, 760], bg: '#fff6dc', inside: (c) => {
    shape(c, [[0, 900], [1100, 900], [1100, 1000], [0, 1000]], '#3f9d4a', { lw: 6, seed: 182 }); a01Plough(c, 250, 900, 1, { yoke: [600, 735], taut: 1 }); donkey(c, { x: 540, y: 900, s: 1, dir: 1, sag: 0.8, mouth: 'grit', earL: -1, earR: -1, noBlink: true }); a01Yoke(c, 620, 740, 0.8, 1, 0.15); } }); ctx.restore(); }
  if (a01In(t, 168.65, 169.5)) a01Pain(ctx, DH[0] + 120, DH[1] - 10, t, 168.7, 0.8);
  // S8 animal speech floating into the merchant's ear
  if (a01In(t, 86.4, 87.6) && M) for (let i = 0; i < 2; i++) { const u = K.clamp((t - 86.4 - i * 0.25) / 0.9); if (u <= 0 || u >= 1) continue; const p = [K.lerp(930, M.x - 30, u), K.lerp(560, 705, u) - 60 * Math.sin(Math.PI * u)], k = 1 - 0.7 * u;
    ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(k, k); bubble(ctx, 0, 0, 90, 70, -40, 30, 1, ''); ctx.beginPath(); ctx.ellipse(0, 0, 40, 30, 0, 0, 7); ctx.clip(); if (i === 0) a01MiniBull(ctx, -50, 40, 0.25, { headDown: 0.2 }); else donkey(ctx, { x: 50, y: 50, s: 0.25, dir: -1, noBlink: true, talk: 0.6 }); ctx.restore(); }
  // S2/S10 sweat: in the field function; S7 nothing extra
}
// ---------- the field world ----------
function a01FieldWorld(ctx, t, cam) {
  const u = a01FU(t), sunAt = t < 13.7 ? [cam.x + 260 / cam.zoom, cam.y - 415 / cam.zoom] : (t >= 105.1 ? [cam.x - 330 / cam.zoom, cam.y - 440 / cam.zoom] : t >= 102.3 ? null : [cam.x + 280 / cam.zoom, cam.y - 400 / cam.zoom]);
  const sunS = t < 13.7 ? 0.8 + 0.3 * A01B(t, 10.2, 0.4) * (1 - A01B(t, 11.0, 0.15)) * (1 + 0.08 * Math.sin(t * 12)) : 0.8;
  let rows = 0, live = null;
  if (t >= 97.4) { rows = t < 102.86 ? 0 : t < 104.8 ? 5 * (t - 102.86) / 1.94 : 5; }
  const BP = t < 13.7 ? a01BullP(t) : null, DP = t >= 97.4 ? a01DonkeyP(t) : null, WP = a01WorkP(t);
  // plough and live furrow
  let pl = null;
  if (BP && t < 11.1) { const sx = BP.x - 330, dig = A01B(t, 8.42, 0.4); pl = { sx, dir: 1, dig, yoke: a01BullYokeW(BP), taut: 0.4 + 0.6 * A01B(t, 6.1, 0.3) }; if (t >= 8.42) live = [A01_BXF(8.42) - 330, sx]; }
  if (DP && t < 108.9 && t >= 98.0) { const sx = DP.x - 290, dig = t < 99.72 ? 0 : A01B(t, 99.72, 0.3); pl = { sx, dir: 1, dig, yoke: a01DonkeyNeck(DP), taut: t < 99.72 ? 0.2 : 1 }; if (t >= 101.2 && t < 102.3) live = [420 - 290, sx]; else if (t >= 102.3 && t < 104.8) { const i = A01_PASS.findIndex(([a, b]) => t >= a && t < b); live = [(i ? 250 : 560) - 290, sx]; } else if (t >= 104.8) live = [250 - 290, 1150 - 290]; }
  if (DP && t >= 108.9) pl = { sx: 1150 - 290, dir: 1, dig: 1 };
  a01Field(ctx, u, t, { rows, live, sunAt, sunS, sx0: 300, sx1: 1300 });
  if (pl) a01Plough(ctx, pl.sx, A01_GR, pl.dir, pl);
  if (WP && WP.behind) a01Worker(ctx, WP, t);
  if (BP) a01Bull(ctx, BP);
  if (DP) { donkey(ctx, DP); a01DonkeyExtras(ctx, DP, t); }
  if (WP && !WP.behind) a01Worker(ctx, WP, t);
  if (t >= 97.4 && t < 99.5) a01Yoke(ctx, ...(() => { const n = a01DonkeyNeck(DP), k = A01B(t, 97.6, 0.8); return [n[0] + 4, n[1] - 4 - 30 * (1 - k)]; })(), 0.66, 1, 0.15);
  // dust: footfalls, clods, scrabble
  for (const f of A01_FALLS) if (f.t < 12 && t >= f.t && t < f.t + 0.5) dustBurst(ctx, f.x + 40, A01_GR - 4, t - f.t, 4, 5, 12, 28, 0.45, Math.round(f.t * 10));
  if (pl && pl.dig > 0.5) for (let k = 0; k < 4; k++) { const t0 = Math.floor(t / 0.3) * 0.3 - k * 0.3, d = t - t0; if (d >= 0 && d < 0.7) dustBurst(ctx, pl.sx + 30, A01_GR - 2, d, 3, 5, 10, 30, 0.7, Math.round(t0 * 10)); }
  if (a01In(t, 100.3, 101.2)) for (let k = 0; k < 5; k++) { const t0 = 100.3 + k * 0.18, d = t - t0; if (d >= 0 && d < 0.5) dustBurst(ctx, 420 + (k % 2 ? 40 : -50), A01_GR - 4, d, 4, 6, 12, 40, 0.5, k); }
  if (a01In(t, 99.6, 100.2)) dustBurst(ctx, DP.x - 260, A01_GR - 4, t - 99.72, 6, 6, 14, 40, 0.5, 99);
  // sweat drops
  if (BP && a01In(t, 10.2, 11.1)) { const H = a01BullHead(BP); for (const [t0, dx] of [[10.35, 1], [10.55, -1], [10.75, 1]]) a01Drop(ctx, H[0] - 20, H[1] - 50, t, t0, dx); }
  if (DP && a01In(t, 106.8, 107.8)) { const H = a01DonkeyHead(DP); a01Drop(ctx, H[0] - 30, H[1] - 40, t, 106.85, -1); }
  if (DP && t >= 107.5 && t < 109.2) { const b = [DP.x - 30, 760]; a01Pain(ctx, DP.x + 70, 750, t, 107.6, 0.9); a01Pain(ctx, b[0], b[1] - 10, t, 108.0, 0.8); a01Pain(ctx, DP.x - 90, 770, t, 108.35, 0.7); }
  // time-lapse jump flashes
  for (const [a] of A01_PASS.slice(1)) if (t >= a && t < a + 0.07) { ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = C.white; ctx.fillRect(0, 0, A01_WW, A01_VH); ctx.restore(); }
}

// ---------- camera ----------
const A01_CAM = [
  [0, { x: 1100, y: 690, zoom: 1.0 }], [1.5, { x: 1100, y: 690, zoom: 1.0 }], [3.3, { x: 500, y: 690, zoom: 1.12 }], [5.19, { x: 500, y: 690, zoom: 1.12 }],
  [13.7, { x: 600, y: 720, zoom: 1.35 }], [20.0, { x: 600, y: 730, zoom: 1.6 }], [22.6, { x: 600, y: 730, zoom: 1.6 }], [23.4, { x: 500, y: 700, zoom: 1.3 }], [31.8, { x: 500, y: 700, zoom: 1.3 }],
  [32.4, { x: 420, y: 700, zoom: 1.6 }], [35.6, { x: 420, y: 700, zoom: 1.6 }], [36.3, { x: 500, y: 700, zoom: 1.3 }], [36.99, { x: 500, y: 700, zoom: 1.3 }],
  [37.0, { x: 600, y: 690, zoom: 1.7 }], [44.6, { x: 610, y: 680, zoom: 1.9 }], [45.04, { x: 610, y: 680, zoom: 1.9 }],
  [45.05, { x: 500, y: 660, zoom: 1.35 }], [67.34, { x: 500, y: 640, zoom: 1.35 }],
  [67.35, { x: 470, y: 700, zoom: 1.15 }], [78.49, { x: 470, y: 700, zoom: 1.15 }],
  [78.5, { x: 1200, y: 620, zoom: 1.3 }], [82.8, { x: 1200, y: 620, zoom: 1.3 }], [84.0, { x: 1270, y: 640, zoom: 1.9 }], [90.2, { x: 1270, y: 640, zoom: 1.9 }], [90.7, { x: 1200, y: 620, zoom: 1.3 }],
  [95.6, { x: 1200, y: 620, zoom: 1.3 }], [95.85, { x: 640, y: 690, zoom: 1.7 }], [97.39, { x: 640, y: 690, zoom: 1.7 }],
  [109.2, { x: 900, y: 700, zoom: 1.2 }], [111.0, { x: 600, y: 700, zoom: 1.2 }], [114.09, { x: 600, y: 700, zoom: 1.2 }],
  [114.1, { x: 500, y: 700, zoom: 1.3 }], [123.09, { x: 500, y: 700, zoom: 1.3 }],
  [123.1, { x: 660, y: 760, zoom: 1.8 }], [131.8, { x: 660, y: 760, zoom: 2.1 }], [133.04, { x: 660, y: 760, zoom: 2.1 }],
  [133.05, { x: 500, y: 690, zoom: 1.3 }], [141.8, { x: 480, y: 690, zoom: 1.5 }], [143.08, { x: 480, y: 690, zoom: 1.5 }], [143.15, { x: 410, y: 700, zoom: 2.0 }], [144.2, { x: 410, y: 700, zoom: 2.0 }],
  [147.4, { x: 500, y: 690, zoom: 1.3 }], [152.81, { x: 500, y: 690, zoom: 1.3 }],
  [152.82, { x: 420, y: 700, zoom: 1.4 }], [160.69, { x: 420, y: 700, zoom: 1.4 }],
  [160.7, { x: 640, y: 700, zoom: 1.15 }], [161.0, { x: 640, y: 700, zoom: 1.15 }], [162.0, { x: 860, y: 700, zoom: 1.15 }], [164.4, { x: 1050, y: 700, zoom: 1.15 }], [166.89, { x: 1170, y: 700, zoom: 1.15 }],
  [166.9, { x: 660, y: 740, zoom: 1.7 }], [172.4, { x: 660, y: 740, zoom: 1.7 }], [176.0, { x: 560, y: 690, zoom: 1.2 }], [A01_DUR, { x: 560, y: 690, zoom: 1.2 }]];
function a01Cam(t) {
  let c;
  if (t >= 5.2 && t < 11.1) c = { x: A01_BXF(t) - 60, y: 700, zoom: 1.15 };
  else if (t >= 11.1 && t < 13.7) c = { x: 880, y: 700, zoom: 1.25 };
  else if (t >= 97.4 && t < 102.3) c = { x: a01DXF(t) - 40, y: 700, zoom: 1.15 };
  else if (t >= 102.3 && t < 105.1) c = { x: 800, y: 720, zoom: 1.0 };
  else if (t >= 105.1 && t < 109.2) c = { x: 1225, y: 700, zoom: 1.9 };
  else { c = K.camAt(A01_CAM, t); c = { ...c, y: c.y - 40 }; }   // keys follow the plan; the floor sits a little lower in the panel
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, A01_WW - 500 / z), y: K.clamp(c.y, 615 / z, A01_VH - 615 / z), zoom: z };
}
const a01P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const a01Shake = (t) => K.spring(t, 75.6, 3, 14, 7) + K.spring(t, 76.9, 3, 14, 7) + K.spring(t, 143.12, 5, 16, 6);

// ---------- panel-space overlays: labels, lettering, counter, inset ----------
function a01Over(ctx, t, cam, S) {
  const P = (x, y) => a01P(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a01Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, A01B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a01Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, A01B(t, a, 0.4), o); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 76, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a01Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, a01Pop(t, a, 0.25), o); ctx.restore(); };
  // S1 labels
  if (t < 5.2) { const b = P(330, 640), d = P(700, 650); lab('BULL', b[0] - 20, b[1] - 150, 3.36, 5.2); arr([b[0] - 20, b[1] - 120], [b[0] + 10, b[1] - 30], 3.4, 5.2, { width: 18 }); lab('DONKEY', d[0] + 10, d[1] - 170, 3.88, 5.2); arr([d[0] + 10, d[1] - 140], [d[0] - 20, d[1] - 50], 3.9, 5.2, { width: 18, bend: -0.12 }); }
  { const p = P(880, 640); word('PHEW!', p[0] + 40, p[1] - 150, 12.4, 13.6, 84, { rot: -0.1 }); }
  { const p = P(470, 560); word('FLOP!', 760, 250, 53.9, 55.2, 80, { rot: 0.1, fill: C.red }); void p; }
  { word('NOPE!', 330, 330, 76.7, 78.0, 92, { rot: -0.08, fill: C.red }); }
  { word('AHA!', 760, 250, 88.7, 90.0, 96, { rot: 0.08 }); }
  { word('ME?!', 720, 300, 96.95, 97.4, 104, { rot: -0.06, fill: C.red }); }
  { const p = P(700, 760); word('OUCH!', p[0] + 90, p[1] - 230, 112.0, 113.6, 84, { rot: 0.08, fill: C.red }); }
  { word('GULP!', 280, 330, 145.95, 147.0, 92, { rot: -0.1 }); }
  { const p = P(330, 620); word('ZOOM!', p[0] + 40, p[1] - 200, 157.26, 158.2, 88, { rot: -0.1 }); }
  { const p = P(415, 760); word('CHOMP!', p[0] + 200, p[1] - 230, 159.2, 160.0, 84, { rot: 0.08, fill: C.red }); }
  // S10 HOURS counter
  if (t >= 102.3 && t < 105.0) { const n = Math.min(8, 1 + Math.floor((t - 102.3) / 2.5 * 8)); ctx.save(); ctx.globalAlpha = a01Fade(t, 102.3, 105.0, 0.2); S.counter(ctx, n, 175, 210, a01Pop(t, 102.3, 0.4), { size: 110 }); S.label(ctx, 'HOURS', 175, 330, a01Pop(t, 102.4, 0.4), { size: 44, align: 'center', fill: C.yellow }); ctx.restore(); }
  // S15 the hoof's line to the door
  if (t >= 141.82 && t < 143.1) { const a = P(560, 820), b = [990, a[1] - 40]; arr(a, b, 141.85, 143.1, { width: 22, bend: 0.1 }); }
  // inset circle: last night at the window (87.6-90.3)
  if (t >= 87.6 && t < 90.35) { const r = 190 * K.ease.out(a01Pop(t, 87.6, 0.35)) * K.clamp((90.35 - t) / 0.3); if (r > 1) { const cx = 260, cy = 330, tw = 61.6 + (t - 87.6) * 0.5;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.fillStyle = NAVY2; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.translate(cx, cy); ctx.scale(1.15, 1.15); ctx.translate(-470, -440); a01World(ctx, tw, { x: 470, y: 440, zoom: 1.15 }, { inset: true });
    ctx.restore(); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.globalAlpha = 0.28; ctx.fillStyle = dotPat(ctx, C.blue, 10, 0.4); ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.restore();
    ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore();
    } }
}

const SCENE = {
  duration: A01_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = a01Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / A01_VW, ph / A01_VH);
    const cam = a01Cam(t); ctx.save(); K.camera(ctx, A01_VW, A01_VH, cam); a01World(ctx, t, cam); ctx.restore();
    // whip pan streaks (95.6-95.85)
    if (t >= 95.6 && t < 95.85) { const u = (t - 95.6) / 0.25; ctx.save(); ctx.globalAlpha = 0.8 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(95); for (let i = 0; i < 26; i++) ctx.fillRect(-100 + r() * 1100 - u * 300, r() * 1230, 220 + r() * 300, 6 + r() * 8); ctx.restore(); }
    // the butcher flash (2 frames)
    if (t >= 143.12 && t < 143.19) { ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = C.white; ctx.fillRect(0, 0, A01_VW, A01_VH); ctx.restore(); }
    a01Over(ctx, t, cam, S);
    if (t >= 66.8 && t < 67.9) S.transition(ctx, A01_VW, A01_VH, (t - 66.8) / 1.1, { caption: 'NEXT MORNING...' });
    if (t >= 176.3) S.title(ctx, 'THE END', 735, 205, A01B(t, 176.3, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's nine quiet effects, all in narration pauses or after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, A01_DUR, 0.5);
    k.play('pop', 5.2, { gain: 0.4 });
    k.play('thud', 13.7, { gain: 0.45 });
    k.play('whoosh', 22.6, { dur: 0.45, gain: 0.3 });
    k.play('chime', 45.05, { note: 'E6', gain: 0.5 });
    k.play('whoosh', 67.2, { dur: 0.45, gain: 0.3 });
    k.play('thud', 114.05, { gain: 0.45 });
    k.play('chime', 133.05, { note: 'E6', gain: 0.5 });
    k.play('whoosh', 152.82, { dur: 0.45, gain: 0.3 });
    k.play('chime', 176.6, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
