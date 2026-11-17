// ===== KD-009 The Monkey and the Carpenter: staging, acting, camera, lettering and sound =====
// World 1000 x 1230, ground y 900. All times are seconds on the final MP3 (cue words from planning/creative_plan.json).
const WW = 1000, WH = 1230, GR = 900, DUR = 165.29;
const B = (t, a, d) => K.beat(t, a, d, 'lin');
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const LK = (t, keys) => kfn(t, keys, 'lin');            // piecewise linear keys
const EK = (t, keys) => kfn(t, keys, 'inOut');          // eased keys
const IN = (t, a, b) => t >= a && t < b;
const DAY = (t) => t >= 51.2;

// ---------- log state: three keyed scalars ----------
const KERF = [[31.16, 0], [33.4, 0.55], [48.38, 0.55], [51.2, 0.78], [53, 0.85], [152.22, 0.85], [165.3, 0.97]];
const GAP = [[32.46, 0], [33.4, 0.35], [40.3, 0.35], [40.38, 0.7], [40.7, 0.7], [40.78, 1], [44.04, 1], [44.3, 0.67], [44.55, 0.67], [44.65, 1.08], [44.8, 0.97], [44.9, 1], [77.36, 1], [77.46, 0.9], [77.8, 1],
  [96.07, 1], [96.15, 0.94], [98.3, 0.94], [98.36, 0.9], [98.9, 0.9], [98.96, 0.86], [99.5, 0.86], [99.56, 0.8], [105.78, 0.8], [105.88, -0.09], [106.0, 0.03], [106.1, 0], [133.84, 0], [134.5, 0.8], [138.58, 0.8], [138.95, 0], [148.8, 0], [148.88, 1]];
const WOUT = [[38.74, 1], [39.3, 0.55], [40.3, 0.55], [40.36, 0.3], [40.7, 0.3], [40.76, 0], [96.07, 0], [96.15, 0.15], [98.3, 0.15], [98.36, 0.35], [98.9, 0.35], [98.96, 0.55], [99.5, 0.55], [99.56, 0.8], [100.42, 0.86], [101.6, 0.9], [101.73, 0.97], [102.47, 0.97], [102.48, 1], [148.8, 0.3], [148.88, 0]];
const kerfAt = (t) => (t < 31.16 ? 0 : LK(t, KERF)), gapAt = (t) => { let g = t < 32.46 ? 0 : LK(t, GAP); if (IN(t, 104.98, 105.78)) g += 0.03 * Math.sin(t * 60); return g; };
// where the wedge is: 'none' | 'cHand' | 'log' | 'mHand' | 'fly' | 'ground'
const wedgeState = (t) => (t < 35.4 ? 'none' : t < 39.0 ? 'cHand' : t < 102.48 ? 'log' : t < 103.94 ? 'mHand' : t < 104.9 ? 'fly' : t < 146.2 ? 'ground' : t < 148.75 ? 'none' : 'log');
const logOn = (t) => t >= 26.2;          // log resting on its chocks
const SNAP = 105.78;

// ---------- strike cycles (mallet) ----------
const HITS1 = [9.62, 10.04, 10.46, 10.88], HITS2 = []; for (let h = 15.95; h < 19.7; h += 0.55) HITS2.push(h);
const TAPS = [40.3, 40.7, 148.8];
function strike(t, hits, up = 0.32) { let lift = 0; for (const h of hits) { if (t >= h - up && t < h) { const u = (t - (h - up)) / up; lift = u < 0.7 ? K.ease.out(u / 0.7) : 1 - K.ease.in((u - 0.7) / 0.3); } else if (t >= h && t < h + 0.25) lift = Math.max(lift, 0.15 * Math.sin(Math.PI * (t - h) / 0.25)); } return lift; }
// saw strokes: offset -1..1, faster when fresh, slower when tired
const sawOff = (t) => { if (IN(t, 31.16, 33.5)) return Math.sin((t - 31.16) * 2 * Math.PI * 1.7); if (IN(t, 48.38, 52.98)) { const f = t < 51.2 ? 1.5 : 0.85; return Math.sin((t - 48.38) * 2 * Math.PI * f); } if (t >= 152.22) return Math.sin((t - 152.22) * 2 * Math.PI * 1.3); return 0; };
const sawing = (t) => IN(t, 31.16, 33.5) || IN(t, 48.38, 52.98) || t >= 152.22;

// ---------- the carpenter ----------
const CS = 0.92;
const CX1 = (t) => LK(t, [[2.55, 885], [3.5, 712]]);
const CX2 = (t) => LK(t, [[20.3, -140], [24.6, 500], [26.25, 500], [26.5, 530], [26.6, 530], [27.6, 760], [44.8, 760], [45.4, 805], [46.4, 805], [46.92, 760]]);
const CX4 = (t) => LK(t, [[57.4, 760], [59.6, 888]]);
const CX8 = (t) => LK(t, [[124.3, 888], [126.3, 712], [139.3, 712], [140.16, 830], [145.5, 830], [147.2, 760]]);
const FALLS_C = [...footfalls(CX1, 2.55, 3.5, 22), ...footfalls(CX2, 20.3, 27.6, 22), ...footfalls(CX4, 57.4, 59.6, 22), ...footfalls(CX8, 124.3, 126.3, 22)];
function carpP(t) {
  const P = { y: GR, s: CS, dir: -1, mouth: 'closed', seed: 4 };
  const wv = (xf, k = 1) => { const x = xf(t), v = speed(xf, t); P.x = x; P.ph = x / 22; P.amp = K.clamp(Math.abs(v) / 120) * k; };
  const headW = () => [P.x, P.y - 180 * CS];
  if (t < 2.55) return null;
  if (t < 19.74) {   // S1 morning routine
    wv(CX1); P.holdR = 'mallet'; P.toolRotR = -1.2; if (t < 3.7) { P.holdL = 'stool'; P.handL = [-28, -100]; }
    P.mouth = 'smile'; P.gaze = look(t, headW(), [[0, [600, 760]], [3.0, [700, 300]], [3.5, [600, 760]], [4.78, [318, 528]], [5.6, [620, 860]]]);
    if (IN(t, 3.85, 4.6)) { const k = Math.sin(Math.PI * K.clamp((t - 3.85) / 0.75)); P.aL = [-K.lerp(0.12, 2.65, k), -K.lerp(0.05, 2.95, k)]; P.aR = [K.lerp(0.12, 2.65, k), K.lerp(0.05, 2.95, k)]; P.lid = 0.9 * k; P.sq = 1 + 0.05 * k; }
    P.sq = (P.sq || 1) * anticipate(t, 3.7, 0.15, 0.05);
    P.sit = settleTo(t, 7.3, 0, 1, 0.4, 0.08); if (IN(t, 7.1, 7.3)) P.sq = anticipate(t, 7.1, 0.2, 0.06); if (t >= 7.6) P.sq = landSquash(t, 7.6, 0.06, 8);
    if (t >= 7.7) { P.lid = Math.max(P.lid || 0, 0.35); P.gaze = [-0.8, 0.5]; }
    const hammer = (hits) => { const l = strike(t, hits); P.handRW = [K.lerp(668, 700, l), K.lerp(846, 770, l)]; P.toolRotR = K.lerp(0.55, -1.3, l); P.lean = 0.18 + 0.05 * l; P.gaze = lookAt(headW(), [650, 868]); P.tongue = true; P.lid = 0.2; };
    if (IN(t, 9.2, 11.1)) hammer(HITS1);
    if (IN(t, 10.4, 11.1)) { P.tilt = 0.12 * Math.sin(Math.PI * K.clamp((t - 10.4) / 0.7)); P.gaze = lookAt(headW(), [812, 800]); }
    if (IN(t, 11.24, 12.3)) { const k = K.clamp((t - 11.24) / 0.3); P.handR = [K.lerp(60, 70, k), K.lerp(-60, -150, k)]; P.handL = [-20, -150]; if (t > 11.85) { P.handR = [84, -88 - 10 * Math.abs(Math.sin((t - 11.85) * 14))]; } P.gaze = lookAt(headW(), [600, 840]); P.mouth = 'smile'; }
    if (IN(t, 12.6, 13.7)) { P.handL = [18, -186]; P.lid = Math.max(0.5, blink(t, 4)); P.sq = 0.98; P.mouth = 'smile'; }
    if (t >= 13.78) hammer(HITS2);
    return P;
  }
  if (t < 20.3) return null;
  if (t < 34.9 || IN(t, 34.9, 51.2)) {   // S2 + S3: log, saw, wedge
    wv(CX2); P.dir = t < 27.6 ? 1 : -1; P.gaze = [1, 0.1];
    if (t < 25.9) { P.handL = [-14, -196]; P.handR = [30, -200]; P.tip = 0.08; P.mouth = 'o'; P.drop = 4;
      if (IN(t, 22.98, 24.1)) { P.x += 10 * Math.sin((t - 22.98) * 9) * (1 - (t - 22.98) / 1.12); P.lid = 0.7; P.tip = 0.08 + 0.05 * Math.sin((t - 22.98) * 9); }
      if (t >= 24.92) { P.sq = K.lerp(1, 0.9, K.ease.inOut(K.clamp((t - 24.92) / 0.7))); P.amp = 0; } }
    else if (t < 26.88) { const k = K.clamp((t - 25.9) / 0.25); P.aL = [-K.lerp(2.6, 1.4, k), -K.lerp(2.9, 1.6, k)]; P.aR = [K.lerp(2.6, 1.4, k), K.lerp(2.9, 1.6, k)]; P.sq = settleTo(t, 25.95, 0.9, 1, 0.4); P.mouth = 'o'; P.gaze = lookAt(headW(), [520, 840]); }
    else if (t < 30) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = lookAt(headW(), [LK(t, [[26.9, 360], [27.7, 660], [28.0, 520]]), 830]);
      if (IN(t, 27.82, 28.9)) { P.handR = [100, -120 + 4 * Math.sin(t * 6)]; P.gaze = lookAt(headW(), [670 - (t - 27.82) / 1.0 * 340, 840]); }
      if (IN(t, 28.92, 29.9)) { P.tilt = 0.1 * Math.sin((t - 28.92) * 9) * (1 - (t - 28.92)); P.handR = PERSON_HANDS.moustache.R; P.mouth = 'smile'; P.gaze = lookAt(headW(), [500, 800]); } }
    else if (t < 31.16) { P.holdR = t > 30.15 ? 'saw' : null; P.handR = [70, -120 + 6 * Math.sin(t * 40) * K.clamp(31 - t)]; P.toolRotR = -0.2; P.handL = [62, -128]; P.gaze = lookAt(headW(), [690, 790]); if (t > 30.6) P.brow = 0.3, P.mouth = 'frown';
      if (t < 30.15) { P.handR = [60, -40]; P.tip = 0.15; } }
    else if (t < 34.9) { P.holdR = t < 34.85 ? 'saw' : null; const o = sawOff(t); P.handRW = [706 + 24 * o, 830]; P.toolRotR = 0.0; P.handLW = [684, 784]; P.tip = 0.04 * o; P.gaze = lookAt(headW(), [650, 840]); P.lid = 0.25;
      if (t >= 33.74) { P.handRW = [720, 860]; P.wink = 'R'; P.tip = 0.12; P.drop = 6; P.mouth = 'o'; P.gaze = lookAt(headW(), [660, 830]); } }
    else if (t < 38.74) { // the wedge from the apron, held out at arm's length (v2: big, clear of his head)
      const k = K.clamp((t - 35.18) / 0.3), up = K.ease.out(K.clamp((t - 35.5) / 0.4)), dn = K.ease.inOut(K.clamp((t - 38.0) / 0.6));
      P.handR = t < 35.5 ? [K.lerp(40, 18, k), K.lerp(-60, -80, k)] : [K.lerp(K.lerp(20, 104, up), 65, dn), K.lerp(K.lerp(-80, -158, up), -152, dn)];
      P.holdR = t > 35.4 ? 'wedge' : null; P.holdS = t > 35.5 ? K.lerp(1.3, 2.4, up * (1 - dn)) : null; P.toolRotR = 0; P.gaze = lookAt(headW(), mkW(P, 104, -158)); P.mouth = 'smile'; P.handL = PERSON_HANDS.hipsHands.L; }
    else if (t < 39.5) { const k = K.clamp((t - 38.74) / 0.3); P.handRW = [K.lerp(700, 690, k), K.lerp(760, 826, k)]; P.holdR = t < 39.0 ? 'wedge' : null; P.toolRotR = 0; P.tip = 0.08; P.lid = 0.55; P.gaze = lookAt(headW(), [690, 826]); P.handLW = [684, 784]; }
    else if (t < 42.0) { const l = strike(t, TAPS); P.holdR = t < 41.9 ? 'mallet' : null; P.handRW = [K.lerp(700, 730, l), K.lerp(824, 760, l)]; P.toolRotR = K.lerp(0.2, -1.3, l); P.handLW = [684, 784]; P.gaze = lookAt(headW(), [680, 822]); P.lid = 0.3;
      if (t > 40.8) { P.tilt = 0.08 * Math.sin((t - 40.8) * 10) * K.clamp(41.6 - t); P.mouth = 'smile'; } if (t > 41.2) P.handRW = [770, 760 - 20 * K.clamp(t - 41.2)]; }
    else if (t < 46.92) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.gaze = lookAt(headW(), [660, 820]); P.mouth = 'smile';
      if (t >= 44.8) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.tilt = 0.06 * Math.sin((t - 45.4) * 5) * (t > 45.4 ? 1 : 0); }
      if (IN(t, 44.04, 44.62)) { P.handL = PERSON_HANDS.hipsHands.L; P.handRW = [652, LOG.top - logGeo(kerfAt(t), gapAt(t)).riseAt(652) - 8]; P.lean = 0.22; P.tip = 0.06; P.gaze = lookAt(headW(), [650, 822]); P.mouth = 'o'; } }
    else if (t < 48.38) { P.holdR = t > 47.2 ? 'saw' : null; P.handRW = t > 47.2 ? [712, 830] : [760, 870]; P.handLW = [684, 784]; P.gaze = lookAt(headW(), [650, 836]); P.mouth = 'smile'; }
    else { P.holdR = 'saw'; const o = sawOff(t); P.handRW = [702 + 26 * o, 832]; P.handLW = [684, 784]; P.tip = 0.03 * o; P.gaze = lookAt(headW(), [640, 836]);
      if (t >= 49.28) { P.mouth = 'whistle'; P.lid = 0.5; P.drop = 3 * Math.sin(t * 9); } }
    return P;
  }
  if (t < 59.9) {   // S4 tired, leaves
    wv(CX4, 0.7); P.dir = t < 57.3 ? -1 : 1; P.gaze = [-1, 0.3];
    if (t < 52.98) { P.holdR = 'saw'; const o = sawOff(t); P.handRW = [702 + 26 * o, 832]; P.handLW = [684, 784]; P.tip = 0.03 * o; P.lid = 0.35; P.gaze = lookAt(headW(), [640, 836]); }
    else if (t < 55.6) { P.holdR = 'saw'; P.handRW = [712, 846]; P.handLW = [684, 786]; P.sq = blend(t, 52.98, 53.6, 1, 0.96); P.tip = 0.08; P.lid = Math.max(0.5, blink(t, 4)); P.drop = 6;
      if (t >= 54.52) { const y = Math.sin(Math.PI * K.clamp((t - 54.52) / 0.8)); P.handLW = null; P.handRW = null; P.aL = [-K.lerp(0.3, 2.7, y), -K.lerp(0.1, 3.0, y)]; P.aR = [K.lerp(0.3, 2.7, y), K.lerp(0.1, 3.0, y)]; P.drop = -8 * y; P.tilt = -0.1 * y; P.lid = 1; P.mouth = t < 55.3 ? 'open' : 'closed'; P.eyes = t < 55.2 ? 'shut' : 'open'; P.sq = t < 55.32 ? 1 + 0.04 * y : blend(t, 55.32, 55.6, 1.04, 0.96); P.tip = t < 55.32 ? 0 : 0.08; }
      if (t >= 55.38) { P.handRW = [705, 884]; P.tip = 0.2; P.holdR = t < 55.55 ? 'saw' : null; } }
    else if (t < 57.18) { P.handR = [14, -104]; P.handL = [-20, -100]; P.lid = 0.5; P.sq = 0.97; P.gaze = lookAt(headW(), [840, 890]); }
    else { P.handL = [-34, -90]; P.drop = 10; P.lid = 0.5; P.sq = 0.97; P.tip = 0.06; P.gaze = [1, 0.4]; }
    return P;
  }
  if (t < 124.28) return null;   // inside (the window shows him)
  if (t < 142 || t < DUR) {   // S8 rescue + S9
    wv(CX8, 1.2); P.dir = -1; P.gaze = [-1, 0];
    const mHead = [528, 660];
    if (t < 126.3) { P.tip = 0.15; P.napkin = true; P.aL = [-1.2 * Math.sin(P.ph), -0.6]; P.aR = [1.2 * Math.sin(P.ph), 0.6]; P.mouth = 'o'; P.eyes = 'wide'; P.gaze = lookAt(headW(), mHead); }
    else if (t < 130.8) { P.napkin = true; P.sq = settleTo(t, 126.3, 0.92, 1, 0.4); P.eyes = t < 127.3 ? 'wide' : 'open'; P.gaze = look(t, headW(), [[126.3, mHead], [128.2, [598, 838]], [128.6, [860, 900]], [129.28, mHead]], 0.1); if (IN(t, 128.2, 129.28)) { P.lean = 0.12; P.drop = 4; }
      if (t >= 130.4) { P.handR = [92, -128]; }
      if (t >= 129.82) { P.tilt = 0.12 * Math.sin((t - 129.82) * 11) * K.clamp(130.7 - t); P.mouth = 'smile'; P.brow = -0.3; P.lid = 0.25; } }
    else if (t < 132.36) { P.napkin = true; P.handRW = t < 131.5 ? [690, 790] : [770, 850]; P.holdR = t > 131.7 ? 'bar' : null; P.toolRotR = 0.6; P.gaze = lookAt(headW(), mHead); P.mouth = 'smile'; P.brow = -0.3; }
    else if (t < 139.0) { P.napkin = true; P.kneel = settleTo(t, 132.36, 0, 1, 0.45, 0.06); P.x = blend(t, 132.36, 132.8, 712, 690); P.amp = 0;
      if (t < 133.02) { P.holdR = 'bar'; P.toolRotR = 0.7; P.handR = [60, -110]; P.gaze = lookAt(headW(), [668, 838]); }
      else { P.handRW = BAR_HAND; P.lean = t < 133.84 ? blend(t, 133.02, 133.5, 0.15, 0.3) : t >= 135.32 ? 0.42 : 0.3; P.gaze = lookAt(headW(), [650, 838]); P.lid = 0.3; P.mouth = 'closed';
        if (t >= 135.32) { P.tongue = true; P.handLW = tailHandC(t); } } }
    else if (t < 140.7) { P.kneel = blend(t, 138.95, 139.2, 1, 0); P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.gaze = lookAt(headW(), mHead); P.mouth = 'smile'; P.brow = -0.3; }
    else if (t < 145.5) { P.kneel = blend(t, 140.7, 141.1, 0, 0.55); P.handL = [40, -70]; P.handR = [50, -76]; P.mouth = 'smile'; P.gaze = t < 142.6 ? lookAt(headW(), mHead) : lookAt(headW(), [215, 470]); if (t > 142.6) P.kneel = blend(t, 142.6, 143, 0.55, 0); }
    else if (t < 149.9) { P.holdR = t > 147.4 ? 'mallet' : null; P.holdL = IN(t, 146.2, 148.75) ? 'wedge' : null; P.handL = [60, -110]; const l = strike(t, TAPS); P.handRW = t > 147.6 ? [K.lerp(700, 730, l), K.lerp(824, 760, l)] : null; P.toolRotR = K.lerp(0.2, -1.3, l); P.gaze = lookAt(headW(), [690, 830]); }
    else { P.gaze = lookAt(headW(), [650, 836]); P.handLW = [684, 784];
      if (t < 151.4) { P.handRW = [740, 860]; }
      else { P.holdR = t > 151.6 ? 'saw' : null; const o = sawOff(t); P.handRW = [706 + 24 * o, 832]; P.tip = 0.03 * o;
        if (t < 152.2) { P.gaze = lookAt(headW(), [210, 450]); P.mouth = 'smile'; } else if (t > 153) { P.mouth = 'whistle'; P.lid = 0.4; } } }
    return P;
  }
  return null;
}
const mkW = (P, lx, ly) => [P.x + lx * P.s * P.dir, P.y + ly * P.s];
// the carpenter in the window (eating, hears the cry)
function carpWindow(t) {
  if (!IN(t, 60.5, 124.28)) return null;
  const P = { x: 962, y: 848, s: CS, dir: -1, mouth: 'closed', seed: 4, gaze: [0.2, 0.6] }, sp = (t * 0.55) % 1;
  P.holdR = 'spoon'; P.handR = sp < 0.5 ? [40, -150 - 40 * Math.sin(Math.PI * sp / 0.5)] : [40, -150]; P.talk = sp > 0.45 && sp < 0.8 ? 0.4 : 0; P.lid = 0.35;
  if (t >= 121.68) { P.drop = -8 * K.clamp((t - 121.68) / 0.15); P.eyes = 'wide'; P.lid = 0; P.talk = 0; P.mouth = 'o'; P.handL = PERSON_HANDS.cupEar.R.map((v, i) => (i ? v : -v)); P.handR = [40, -150]; P.gaze = [-1, 0.3]; P.holdR = t < 123.4 ? 'spoon' : null; }
  return P;
}

// ---------- the monkey ----------
const MKS = 0.75, MKS2 = 0.9, PERCH = [215, 545], SEAT = [640, 783];
const HOPS5 = [[64.1, 0.3, 170, 215], [64.55, 0.3, 215, 258], [65.0, 0.3, 258, 300]];
function monkeyP(t) { const P = monkeyP0(t); if (P && logOn(t) && P.y > 760 && P.y < 800 && P.x > LOG.x0 && P.x < LOG.x1) P.y -= logGeo(kerfAt(t), gapAt(t)).riseAt(P.x); return P; }
function monkeyP0(t) {
  const P = { x: PERCH[0], y: PERCH[1], s: MKS, dir: 1, mouth: 'closed', seed: 9 };
  const head = () => mkToWorld(P, 8, -140);
  const carpHead = () => { const c = carpP(t); return c ? [c.x, c.y - 180 * CS] : [700, 720]; };
  if (t < 61.38) {   // S1-S4 on the perch
    P.gaze = lookAt(head(), carpHead()); P.ph = t * 1.4;
    if (IN(t, 14.48, 15.0)) { P.handLW = [178, 470]; P.handRW = [262, 462]; P.eyes = 'wide'; P.brow = -0.5; P.mouth = 'o'; }
    if (IN(t, 15.0, 15.9)) { P.tilt = 0.18 * Math.sin((t - 15.0) * 7); P.gaze = look(t, head(), [[15.0, [660, 860]], [15.3, [600, 830]], [15.55, [812, 800]], [15.75, [680, 820]]], 0.07); P.brow = -0.5; P.mouth = 'o'; P.lid = Math.max(pulse(t, 15.45, 0.12), pulse(t, 15.62, 0.12)); }
    if (IN(t, 15.9, 18.3)) { const l = strike(t - 0.07, HITS2); P.handR = [44, K.lerp(-96, -150, l)]; P.drop = 4 * (1 - l); P.mouth = 'smile'; P.brow = -0.3; if (t > 17.0) P.gaze = lookAt(head(), mkToWorld(P, 44, -96)); }
    if (IN(t, 18.3, 19.74)) { P.handR = [-12, -66]; P.gaze = lookAt(head(), [292, 528]); P.mouth = 'o'; P.brow = -0.4; P.drop = 4; }
    if (IN(t, 21.44, 23.2)) { const k = Math.sin(Math.PI * K.clamp((t - 21.44) / 1.76)); P.tip = 0.4 * k; P.gaze = lookAt(head(), [LK(t, [[20.3, -140], [24.6, 500]]) + 120, 750]); P.eyes = 'wide'; if (t > 22.6) { P.handL = [-10, 10]; P.mouth = 'o'; } }
    if (IN(t, 23.2, 37.68)) P.gaze = lookAt(head(), t < 30 ? [520, 800] : [690, 830]);
    P.y -= Math.abs(kick(t, [26.2], 6, 11, 7));
    if (IN(t, 33.74, 34.6)) P.lid = 0.75;
    if (IN(t, 37.68, 41.2)) { const k = K.clamp((t - 37.68) / 0.3); P.y = K.lerp(545, 668, K.ease.inOut(k)); P.aL = [-2.85, -3.05]; P.aR = [2.85, 3.05]; P.x += swing(t, 37.9, 14); P.gaze = lookAt(head(), [700, 826]); P.eyes = 'wide'; P.ph = 0; }
    if (IN(t, 46.0, 50.06)) P.gaze = lookAt(head(), carpHead());
    if (IN(t, 50.06, 51.2)) { P.holdR = 'twig'; const o = Math.sin((t - 50.06) * 2 * Math.PI * 1.5); P.handR = [60 + 18 * o, -86]; P.handL = [36, -84]; P.tongue = true; P.mouth = 'smile'; P.gaze = lookAt(head(), mkToWorld(P, 60, -86)); }
    if (IN(t, 57.18, 61.38)) { P.gaze = look(t, head(), [[57.18, carpHead()], [59.56, [885, 830]], [60.85, [885, 830]], [60.95, [640, 830]]], 0.08); P.mouth = t > 60.9 ? 'smirk' : 'o'; P.brow = t > 60.9 ? -0.6 : 0; P.ph = t * 3; }
    return P;
  }
  if (t < 64.1) {   // S5 descent
    P.gaze = look(t, head(), [[61.38, [0, 500]], [61.6, [900, 800]], [61.85, [600, 830]]], 0.07);
    if (t < 62.4) { P.sq = anticipate(t, 62.1, 0.3, 0.1); P.brow = -0.3; }
    else if (t < 62.62) { const u = K.ease.inOut((t - 62.4) / 0.22); P.x = K.lerp(215, 160, u); P.y = K.lerp(545, 640, u); P.dir = -1; P.handL = [10, -150]; P.handR = [30, -150]; }
    else if (t < 63.0) { P.x = 160; P.y = fallY(t, 62.62, 63.0, 640, 900); P.dir = -1; P.sq = 1.1; P.handL = [10, -160]; P.handR = [30, -150]; }
    else { P.x = 170; P.y = GR; P.dir = 1; P.sq = landSquash(t, 63.0, 0.2); P.gaze = lookAt(head(), [870, 830]); }
    P.s = t > 62.4 ? MKS2 : MKS; return P;
  }
  P.s = MKS2; P.y = GR;
  if (t < 76.52) {   // S5 on the ground: hops, knock, the idea
    let x = 300; for (const [a, d, x0, x1] of HOPS5) { if (t < a) { x = x0; break; } if (t < a + d) { const [hx, lift] = hop(t, a, d, x0, x1, 26); x = hx; P.y = GR - lift; break; } x = x1; }
    P.x = x; let sq = 1; for (const [a, d] of HOPS5) { sq *= anticipate(t, a - 0.12, 0.12, 0.08) * landSquash(t, a + d, 0.12); } P.sq = sq;
    P.gaze = lookAt(head(), t < 65.48 ? (t % 0.45 < 0.2 ? [870, 830] : [450, 840]) : [420, 820]); P.mouth = 'o';
    if (IN(t, 65.48, 66.16)) { P.handRW = [340, 830 - 14 * Math.abs(Math.sin((t - 65.48) * 18))]; P.tilt = 0.15; P.mouth = 'closed'; }
    if (t >= 66.16) { P.handR = [26, -150]; P.gaze = [0.6, -0.7]; P.mouth = 'closed'; P.brow = -0.3; }
    if (t >= 67.3) P.gaze = lookAt(head(), [520, 450]);
    if (IN(t, 69.58, 70.88)) P.drop = 4 * Math.sin((t - 69.58) * 10);
    if (IN(t, 70.88, 71.6)) { P.mouth = 'open'; P.lid = 0.7; P.handL = [10, -150]; P.handR = [30, -100]; }
    if (IN(t, 71.6, 73.88)) { P.mouth = 'smirk'; P.lid = 0.45; P.handL = [-60, -110]; P.handR = [70, -110]; P.tilt = 0.08 * Math.sin(t * 8); }
    if (IN(t, 73.26, 73.88)) { P.handR = [80, -150 + 14 * Math.sin((t - 73.26) * 20)]; }
    if (IN(t, 73.88, 76.52)) { P.sq = blend(t, 73.88, 74.6, 1, 1.06); P.mouth = 'smile'; P.gaze = lookAt(head(), [520, 450]); }
    if (IN(t, 75.86, 76.52)) { const b = Math.abs(Math.sin((t - 75.86) * 16)); P.handL = [6, -110 + 8 * b]; P.handR = [24, -110 - 8 * b]; P.mouth = 'grin'; P.tilt = -0.12; }
    return P;
  }
  if (t < 79.9) {   // hop onto the log, sit, tail drops
    const [hx, lift] = hop(t, 76.7, 0.66, 300, SEAT[0], 150); P.x = hx; P.y = K.lerp(GR, SEAT[1], K.clamp((t - 76.7) / 0.66)) - lift;
    P.sq = anticipate(t, 76.52, 0.18, 0.12) * landSquash(t, 77.36, 0.18); if (IN(t, 76.7, 77.36)) P.sq = 1.1;
    P.mouth = 'smile'; P.gaze = lookAt(head(), t < 78.7 ? [760, 870] : [830, 885]); if (t > 77.4) P.tilt = 0.05 * Math.sin((t - 77.4) * 12) * K.clamp(78.4 - t);
    return P;
  }
  P.x = SEAT[0]; P.y = SEAT[1];
  const WH_ = [680, 822];   // wedge head
  if (t < 102.48) {   // S6 the pull
    P.gaze = lookAt(head(), [690, 826]);
    if (IN(t, 80.38, 82.24)) { P.tip = blend(t, 80.38, 80.8, 0, 0.3); P.tilt = 0.15 * Math.sin((t - 80.38) * 4); P.brow = -0.5; P.eyes = 'wide'; P.lid = Math.max(pulse(t, 81.2, 0.14), pulse(t, 81.9, 0.14)); }
    if (IN(t, 82.24, 83.52)) { P.tip = 0.3; P.brow = -0.5; }
    if (IN(t, 83.52, 84.78)) { P.tip = 0.55; P.drop = 10; P.lid = 0.6; P.gaze = lookAt(head(), [680, 838]); }
    if (IN(t, 84.78, 86.08)) { P.handL = [-6, -190 + 6 * Math.sin(t * 30)]; P.brow = 0.4; P.mouth = 'smirk'; P.tilt = -0.1; }
    if (IN(t, 86.08, 87.42)) { P.gaze = lookAt(head(), [885, 830]); P.handL = [-60, -110]; P.handR = [70, -110]; P.mouth = 'frown'; if (t > 86.8) P.gaze = lookAt(head(), [690, 826]); }
    if (IN(t, 87.42, 88.88)) { P.tip = 0.3; P.handRW = [WH_[0] + 6 - 10 * pulse(t, 87.6, 0.3) - 10 * pulse(t, 88.1, 0.3), WH_[1]]; P.fit = true; P.brow = 0.3; }
    if (IN(t, 88.88, 91.94)) { const k = K.ease.inOut(K.clamp((t - 88.88) / 1.4)); P.tip = 0.35; P.fit = true; P.lid = 0.3; P.handRW = [K.lerp(640, WH_[0], k), K.lerp(740, WH_[1], k) + 4 * Math.sin(t * 20) * (1 - k)]; if (t >= 91.0) P.handLW = [WH_[0] - 6, WH_[1] - 8]; P.brow = 0.5; }
    if (IN(t, 91.94, 93.08)) { P.tip = 0.25; P.fit = true; P.handRW = WH_; P.handLW = [WH_[0] - 6, WH_[1] - 8]; P.sq = blend(t, 91.94, 92.6, 1, 1.06); P.mouth = 'o'; P.kick = 14; }
    const pull = (amt) => { P.tip = -0.25 * amt; P.fit = true; P.handRW = [WH_[0] + 2, WH_[1]]; P.handLW = [WH_[0] - 4, WH_[1] - 8]; P.lid = 0.9; P.mouth = 'teeth'; P.x += tremble(t, 2 * amt, 13); P.brow = 0.8; P.kick = 22; };
    if (IN(t, 93.08, 94.62)) { pull(1); P.flush = K.clamp((t - 93.08) / 0.8); }
    if (IN(t, 94.62, 95.4)) { P.sq = 0.94 + 0.03 * Math.sin(t * 25); P.lid = 0.55; P.mouth = 'open'; P.tongue = true; P.flush = K.clamp(1 - (t - 94.62) / 0.8); P.tip = 0.1; }
    if (IN(t, 95.4, 96.1)) { pull(0.8); P.lid = 0.6; }
    if (IN(t, 96.1, 97.32)) { P.tip = 0.2; P.fit = true; P.handRW = [WH_[0] + 8, WH_[1] + 2]; P.eyes = 'wide'; P.mouth = 'o'; }
    if (IN(t, 97.32, 98.08)) { P.tip = 0.2; P.fit = true; P.handRW = [WH_[0] + 8, WH_[1] + 2]; P.mouth = 'grin'; }
    if (IN(t, 98.08, 100.42)) { const b = countedBeats(t, [98.3, 98.9, 99.5], { ant: 0.18, decay: 5 }); pull(0.6 + 0.4 * b.accent); P.tip = -0.12 - 0.15 * b.accent + 0.08 * b.dip; P.handRW = [WH_[0] + 40 * WOUTat(t) + 2, WH_[1]]; P.handLW = [WH_[0] + 40 * WOUTat(t) - 4, WH_[1] - 8]; P.lid = 0.4; P.mouth = 'teeth'; }
    if (IN(t, 100.42, 101.3)) { P.tip = -0.1; P.fit = true; P.handRW = [WH_[0] + 40 * WOUTat(t) + 2, WH_[1]]; P.handLW = [WH_[0] + 40 * WOUTat(t) - 4, WH_[1] - 8]; P.eyes = 'wide'; P.mouth = 'o'; }
    if (IN(t, 101.3, 102.48)) { const k = K.clamp((t - 101.3) / 0.9); P.tip = K.lerp(0.05, 0.25, k); P.sq = K.lerp(1, 0.88, k); P.fit = true; P.handRW = [WH_[0] + 40 * WOUTat(t) + 2, WH_[1]]; P.handLW = [WH_[0] + 40 * WOUTat(t) - 4, WH_[1] - 8]; P.tongue = true; P.lid = 0.3; P.brow = 0.6; P.mouth = 'teeth'; }
    return P;
  }
  // S7 (v2): short tumble, rock back up to the seat, triumph with the wedge held high, toss, smug, SNAP, delayed take, upright scream
  if (t < 111.1) {
    P.eyes = 'open'; P.mouth = 'grin';
    if (t < 103.0) { const k = K.ease.out(K.clamp((t - 102.48) / 0.4)); P.tip = -1.2 * k; P.x = SEAT[0] - 26 * k; P.y = SEAT[1] - 24 * Math.sin(Math.PI * K.clamp((t - 102.48) / 0.52)); P.kick = 20 + 22 * k; P.eyes = 'wide'; P.mouth = 'o';
      P.aR = [2.6, 3.0]; P.aL = [-2.4, -2.8]; P.holdR = 'wedge'; P.holdRot = Math.PI / 2; return P; }
    if (t < 103.4) { const v = settleTo(t, 103.0, 1, 0, 0.4, 0.12); P.tip = -1.2 * v; P.x = SEAT[0] - 26 * v; P.kick = 20 * v; P.sq = anticipate(t, 103.0, 0.2, 0.06); P.aR = [K.lerp(2.95, 2.6, v), K.lerp(3.05, 3.0, v)]; P.aL = [-2.4, -2.8]; P.holdR = 'wedge'; P.holdRot = -Math.PI / 2; P.mouth = 'grin'; return P; }
    P.gaze = [0, 0.05]; P.lid = 0.35; P.mouth = 'smirk';
    if (t < 103.94) { P.aR = [2.95 + 0.04 * Math.sin(t * 9), 3.08]; P.holdR = 'wedge'; P.holdRot = -Math.PI / 2; P.sq = blend(t, 103.4, 103.6, 1, 1.05); P.handL = [-34, -40]; P.brow = -0.3; return P; }
    P.sq = 1.05;
    if (t < 104.3) { const k = K.clamp((t - 103.94) / 0.16); P.aR = [K.lerp(2.95, 1.9, k), K.lerp(3.08, 1.6, k)]; P.handL = [-34, -40]; return P; }
    if (t < 105.0) { const k = Math.abs(Math.sin((t - 104.3) * 14)); P.handL = [-6, -74 + 4 * k]; P.handR = [22, -74 - 4 * k]; return P; }   // dusts off his hands
    P.handL = [-40, -38]; P.handR = [50, -38]; P.lid = 0.4;   // leans back, smug
    if (t >= SNAP) P.y -= 6 * Math.abs(K.spring(t, SNAP, 1, 16, 8));
    if (t >= 108.36) { P.lid = 0; P.eyes = 'wide'; P.mouth = 'smirk'; P.sq = 1.0; }
    if (t >= 108.9) { P.gaze = lookAt(head(), [600, 850]); P.mouth = 'o'; P.brow = 0.5; P.x += tremble(t, K.clamp((t - 108.9) / 1.0) * 2, 14); P.handL = [-30, -50]; P.handR = [36, -50]; }
    if (t >= 109.98) { P.mouth = 'open'; P.eyes = 'shut'; P.wet = true; P.sq = 1.12; P.x = SEAT[0] + tremble(t, 3, 14); P.aR = [2.6, 2.95]; P.aL = [-2.6, -2.95]; P.brow = 0.8; P.drop = -6; }
    return P;
  }
  const SIT2 = [520, 783];
  if (t < 113.68) {
    const k = K.ease.inOut(K.clamp((t - 111.1) / 0.4)); P.x = K.lerp(SEAT[0], SIT2[0], k); P.y = SIT2[1]; P.dir = t < 111.35 ? 1 : -1; P.eyes = 'wide'; P.mouth = 'o'; P.wet = true; P.gaze = lookAt(head(), [215, 500]);
    if (IN(t, 111.5, 112.06)) P.sq = anticipate(t, 111.5, 0.56, 0.14);
    if (IN(t, 112.06, 112.68)) { const u = (t - 112.06); const up = u < 0.3 ? K.ease.out(u / 0.3) : 1 - K.ease.in(K.clamp((u - 0.34) / 0.28)); P.y = SIT2[1] - 80 * up; P.x = SIT2[0] - 46 * Math.min(1, u / 0.3) * (u < 0.34 ? 1 : 1 - (u - 0.34) / 0.28); P.sq = u < 0.34 ? 1.2 : 1.05; P.aL = [-2.6, -2.9]; P.aR = [2.4, 2.7]; P.eyes = 'wide'; P.mouth = 'o'; if (u > 0.3) { P.tip = -0.3; } }
    if (t >= 112.68) { P.sq = impactSquash(t, 112.68, 0.7); P.y = SIT2[1] - rebound(t, 112.68, 10); P.eyes = t < 113.2 ? 'shut' : 'open'; P.mouth = 'frown'; }
    return P;
  }
  P.x = SIT2[0]; P.y = SIT2[1]; P.dir = 1; P.wet = true; P.brow = -0.6; P.mouth = 'frown';
  const tailPts = () => tailState(t, P).pts;
  P.gaze = lookAt(head(), [600, 840]);
  if (t < 117.0) { if (t < 114.7) { const tp = tailPts(); P.fit = true; P.handLW = tp[7]; P.handRW = tp[10]; P.tip = -0.15 * pulse(t, 113.9, 0.4); if (t > 114.2) { P.mouth = 'open'; P.eyes = 'shut'; } } else { P.mouth = 'frown'; P.lid = 0.3; } return P; }
  if (t < 121.68) { P.x += 4 * Math.sin((t - 117) * 4) * K.clamp(119.5 - t); P.mouth = 'teeth'; P.lid = 0.4;
    for (const h of [118.1, 118.6, 119.1]) if (IN(t, h, h + 0.3)) { P.sq = 0.94; P.eyes = 'shut'; }
    if (t >= 119.5) { P.x = SIT2[0] + tremble(t, 1, 10); P.mouth = 'frown'; P.lid = 0.25; P.eyes = 'open'; }
    if (t >= 120.12) { P.gaze = lookAt(head(), [966, 676]); P.mouth = 'o'; }
    return P; }
  if (t < 142.1) {   // S8
    const carp = carpHead(); P.gaze = lookAt(head(), t < 124.3 ? [966, 676] : carp); P.x += tremble(t, K.clamp((140.7 - t) / 2) * 1.2, 10); P.mouth = 'frown'; P.lid = 0.2;
    if (IN(t, 127.26, 128.6)) { P.aR = [0.95, 0.95]; P.brow = -0.8; P.lid = 0; P.gaze = t < 128.2 ? lookAt(head(), carp) : lookAt(head(), [600, 840]); }
    if (IN(t, 128.6, 129.28)) { P.gaze = lookAt(head(), [300, 640]); P.tilt = -0.12; P.sq = 0.95; }
    if (IN(t, 130.8, 132.4)) P.sq = 0.94;
    if (IN(t, 133.84, 136.84)) { P.lid = 1; P.sq = 0.92; P.x += tremble(t, 2, 12); }
    if (IN(t, 136.84, 137.84)) { P.lid = t < 137.2 ? 0 : 0; P.eyes = 'wide'; P.mouth = 'o'; P.fit = true; const e = tailState(t, P).pts; if (t > 137.2) { P.handRW = e[e.length - 1]; P.handLW = e[e.length - 3]; } }
    if (t >= 137.84) { P.handR = [46, -66]; P.handL = [40, -80]; P.sq = blend(t, 137.84, 138.6, 0.96, 1) * breathe(t, 3, 0.03); P.lid = 0.3; P.mouth = 'closed'; P.brow = -0.5; }
    if (t >= 140.7) { P.sq = blend(t, 140.7, 141.8, 1.05, 0.94); P.drop = 8; P.mouth = 'o'; P.lid = Math.max(0.4, blink(t, 9)); P.gaze = lookAt(head(), mkToWorld(P, 46, -66)); }
    return P;
  }
  // S9 leap to the tree and the lesson
  if (t < 144.0) { P.dir = -1; if (t < 142.68) { P.sq = anticipate(t, 142.1, 0.58, 0.12); P.gaze = lookAt(head(), [215, 520]); P.handR = [46, -66]; }
    else { const [hx, lift] = hop(t, 142.68, 1.32, SIT2[0], PERCH[0], 170); P.x = hx; P.y = K.lerp(SIT2[1], PERCH[1], K.ease.inOut(K.clamp((t - 142.68) / 1.32))) - lift; P.sq = 1.12; P.aL = [-2.4, -2.8]; P.aR = [2.4, 2.8]; P.s = K.lerp(MKS2, MKS, K.clamp((t - 142.68) / 1.32)); }
    return P; }
  P.s = MKS; P.x = LK(t, [[145.06, PERCH[0]], [145.9, 195]]); P.y = PERCH[1]; P.dir = 1; P.sq = landSquash(t, 144.0, 0.2) * (t > 145.06 ? 0.93 : 1); P.handR = [46, -66]; P.handL = [40, -80]; P.brow = -0.5; P.wet = t < 150; P.lid = 0.35;
  P.gaze = lookAt(head(), carpHead());
  if (IN(t, 146.88, 148.6)) { P.drop = 10; P.mouth = 'o'; P.handR = [40, -92]; P.handL = [30, -100]; P.gaze = lookAt(head(), mkToWorld(P, 40, -92)); }
  if (IN(t, 148.8, 149.3)) { P.sq = 0.88; P.lid = 1; }
  // v2 lesson: the hand starts to copy the saw, the sore tail throbs, he stops it and tucks it away
  if (IN(t, 153.54, 154.3)) { const o = Math.sin((t - 153.54) * 2 * Math.PI * 2.6); P.handR = [84 + 24 * o, -104]; P.handL = [40, -80]; P.mouth = 'smirk'; P.lid = 0.3; P.brow = 0; P.wet = false; P.gaze = lookAt(head(), mkToWorld(P, 84 + 24 * o, -104)); }
  if (IN(t, 154.3, 155.2)) { P.handR = [92, -104]; P.handL = [40, -80]; P.eyes = 'wide'; P.mouth = 'o'; P.brow = 0.4; P.lid = 0; P.sq = t < 154.5 ? 0.94 : 1; P.gaze = lookAt(head(), TAILTIP(t, P)); }
  if (IN(t, 155.2, 157.66)) { const k = K.ease.inOut(K.clamp((t - 155.5) / 0.4)); P.tilt = 0.12 * Math.sin((t - 155.2) * 2 * Math.PI * 2.5) * K.clamp((156.0 - t) / 0.2); P.handR = [K.lerp(92, -28, k), K.lerp(-104, -96, k)]; P.handL = t < 155.5 ? [K.lerp(40, 80, K.clamp((t - 155.2) / 0.3)), -100] : [K.lerp(80, -6, k), K.lerp(-100, -92, k)]; P.brow = 0.5; P.mouth = 'frown'; P.lid = 0.2; P.gaze = lookAt(head(), mkToWorld(P, P.handR[0], P.handR[1])); }
  if (t >= 157.66) { P.handR = [-28, -96]; P.handL = [-6, -92]; P.mouth = 'closed'; P.lid = 0.3; }
  if (IN(t, 160.95, 161.24)) { P.eyes = 'wide'; P.gaze = lookAt(head(), [842, 860]); P.brow = 0.6; }
  if (t >= 161.24) { P.aL = [-2.3, -2.6]; P.aR = [2.3, 2.6]; P.tip = blend(t, 161.24, 161.7, 0, -0.12); P.sq = blend(t, 161.24, 161.7, 1, 0.93); P.lid = t < 162.4 ? 0.2 : Math.max(0.3, blink(t, 9)); P.eyes = t < 162.4 ? 'wide' : 'open'; P.mouth = t < 162.4 ? 'o' : 'closed'; P.gaze = lookAt(head(), [800, 870]); P.dx = -4; }
  if (t >= 162.6) { P.aL = null; P.aR = null; P.handR = [46, -66]; P.handL = [40, -80]; P.tip = -0.08; if (IN(t, 163.4, 164.4)) { P.drop = 8; P.mouth = 'o'; } }
  return P;
}
const TAILTIP = (t, P) => lapPath(P)[15];
const WOUTat = (t) => (t < 38.74 ? 1 : LK(t, WOUT));
// tail: where it is and in which layer ('back' before the monkey, 'log' inside the split log, 'front' after the monkey)
const gapEnd = (t) => { const g = logGeo(kerfAt(t), gapAt(t)); return [598, LOG.seam - g.riseAt(598) * 0.45 + 2]; };
const lapPath = (P) => K.bezier([-30, -34], [0, 12], [70, -6], [46, -66], 16).map(([x, y]) => mkToWorld(P, x, y));
function tailState(t, P) {
  const sore = t >= 107.86, kink = t >= 107.86 ? 1 : 0;
  if (t < 78.7) return { pts: tailCurl(P, P.ph || t * 1.2), layer: 'back' };
  if (t < 79.4) { const sw = Math.sin((t - 78.7) * 16) * K.clamp(79.0 - t) * 20; const u = K.ease.inOut(K.clamp((t - 78.9) / 0.5)); return { pts: mixPts(tailCurl({ ...P }, sw / 9), tailTo(P, gapEnd(t), [585, 812]), u), layer: u > 0.5 ? 'log' : 'back' }; }
  if (t < 136.22) {
    let ctrl = [585, 812]; if (t >= 111.1 && t < 113.68) ctrl = [590, 800]; if (t >= 113.68) ctrl = [600, 800];
    let end = gapEnd(t); if (IN(t, 83.52, 84.78)) end = [end[0] + 8 * Math.sin(t * 18), end[1] - 10 * Math.abs(Math.sin(t * 9))];
    else if (t >= 79.4 && t < 102.48) { const w = (t - 79.4) % 2.0; if (w < 0.35) end = [end[0] + 5 * Math.sin(Math.PI * w / 0.35), end[1] - 7 * Math.sin(2 * Math.PI * w / 0.35)]; }
    const pts = tailTo(P, end, ctrl); if (IN(t, 112.2, 112.68)) return { pts: tailTo(P, end, [(P.x + 650) / 2, (P.y + 790) / 2]), layer: 'log', sore, kink };
    return { pts, layer: 'log', sore, kink };
  }
  if (t < 137.84) { const e = tailHandC(Math.min(t, 136.84)); const pts = tailTo(P, e, [585, 812]); return { pts, layer: t < 136.5 ? 'log' : 'back', sore, kink }; }
  if (t < 142.68) { const u = K.ease.inOut(K.clamp((t - 137.84) / 0.5)); return { pts: mixPts(tailTo(P, tailHandC(136.84), [585, 812]), lapPath(P), u), layer: u > 0.4 ? 'front' : 'back', sore, kink }; }
  if (t < 144.0) { const b = mkToWorld(P, -30, -34); return { pts: K.bezier(b, [b[0] + 50, b[1] + 30], [b[0] + 110, b[1] + 50], [b[0] + 150, b[1] + 70 + 10 * Math.sin(t * 9)], 16), layer: 'back', sore, kink }; }
  return { pts: lapPath(P), layer: 'front', sore, kink };
}
// the carpenter's left hand under / lifting the tail
function tailHandC(t) { if (t < 135.32) return [650, 860]; if (t < 136.22) return [K.lerp(650, 604, K.clamp((t - 135.32) / 0.5)), 846]; const u = K.ease.inOut(K.clamp((t - 136.22) / 0.6)); return [K.lerp(604, 615, u), K.lerp(846, 768, u)]; }
const BAR_TIP = [672, 836], BAR_HAND = [704, 772];

// ---------- the bird ----------
const BPERCH = [318, 528];
function birdP(t) {
  const P = { s: 0.7, dir: -1, col: C.red, seed: 11 };
  const fly = (t0, d, a, b, h) => { const u = K.clamp((t - t0) / d); P.x = K.lerp(a[0], b[0], u); P.y = K.lerp(a[1], b[1], u) - h * Math.sin(Math.PI * u); P.fly = u < 1; P.flap = t * 30; P.dir = b[0] < a[0] ? -1 : 1; };
  if (t < 4.5) return null;
  if (t < 5.4) { fly(4.5, 0.9, [460, 330], BPERCH, 60); return P; }
  P.x = BPERCH[0]; P.y = BPERCH[1] + 3 * Math.abs(kick(t, [5.4], 4, 12, 8));
  if (t >= 18.3 && t < 110.48) { P.x = LK(t, [[18.3, BPERCH[0]], [18.6, 296]]); P.y = BPERCH[1] - 12 * pulse(t, 18.3, 0.3); }
  if (IN(t, 63.36, 64.1)) { P.y -= 60 * Math.sin(Math.PI * (t - 63.36) / 0.74); P.fly = true; P.flap = t * 30; }
  if (IN(t, 37.68, 41.2)) P.y -= 4 * Math.abs(Math.sin(t * 6));
  if (t >= 110.48 && t < 160.1) { if (t > 111.4) return null; fly(110.48, 0.9, [296, 528], [-90, 220], -40); return P; }
  if (t >= 160.1) { if (t < 161.0) { fly(160.1, 0.9, [1060, 480], [842, 866], 60); return P; } P.x = 842; P.y = 866 - 12 * pulse(t, 161.0, 0.25); P.dir = -1; P.lid = blink(t, 11); }
  return P;
}

// ---------- tools on the ground, props ----------
const toolHeld = (t) => { const c = carpP(t) || {}; return { saw: c.holdR === 'saw', mallet: c.holdR === 'mallet' || t < 19.74, bar: c.holdR === 'bar' || IN(t, 133.0, 139.0) }; };
function drawTools(ctx, t) {
  if (t < 19.74) return; const h = toolHeld(t);
  if (!h.bar) prybar(ctx, 790, 897, -0.02, 0.75);
  if (!h.saw) saw(ctx, 790, 890, 0.03, 0.72);
  if (!h.mallet) mallet(ctx, 800, 876, 0.02, 0.72);
  glint(ctx, 860, 885, t, 56.16); glint(ctx, 855, 872, t, 56.5); glint(ctx, 880, 896, t, 56.84);
}
function groundDress(ctx, t) {   // v2: worn path, shavings under the work spot, grass tufts in the foreground
  const r = K.rng(77); ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = LOGIN; ctx.beginPath(); ctx.ellipse(700, 935, 240, 18, 0, 0, 7); ctx.fill(); ctx.restore();
  if (t >= 26.2) for (let i = 0; i < 16; i++) { const x = 560 + r() * 200, y = 902 + r() * 16; shape(ctx, ell(x, y, 7 + r() * 5, 3, 8), LOGIN, { lw: 2.5, seed: 90 + i }); }
  ctx.save(); ctx.lineCap = 'round'; for (const [x, y] of [[60, 990], [250, 1030], [420, 975], [610, 1040], [900, 1000], [980, 960]]) for (let k = -2; k <= 2; k++) { ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + k * 7, y); ctx.lineTo(x + k * 12, y - 26 + Math.abs(k) * 6); ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = GREEN; ctx.stroke(); } ctx.restore();
}
function wedgeFly(t) { const u = K.clamp((t - 103.94) / 0.96), a = [700, 600], b = [870, 905]; const x = K.lerp(a[0], b[0], u); let y; if (u < 0.6) { const v = u / 0.6; y = K.lerp(a[1], b[1], v) - 160 * Math.sin(Math.PI * v); } else { const v = (u - 0.6) / 0.4; y = b[1] - 30 * Math.abs(Math.sin(Math.PI * v * 2)) * (1 - v); } return [x, y, u * 14]; }

// ---------- world ----------
let WMINV = null;
function drawWorld(ctx, t, cam) {
  const day = DAY(t);
  yardSky(ctx, day);
  if (!day) { const sy = t < 6.24 ? LK(t, [[0, 770], [6.24, 720]]) : K.lerp(720, 540, K.ease.back(K.clamp((t - 6.24) / 0.6))); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, WW, 752); ctx.clip(); sun(ctx, 640, sy, t); ctx.restore(); } else if (!IN(t, 67.3, 76.52)) sun(ctx, t < 158 ? 600 : K.lerp(600, 840, K.ease.inOut(K.clamp((t - 158) / 2))), 330, t);
  if (!IN(t, 67.3, 76.52)) { cloudFlat(ctx, 300 + ((t * 5) % 1300) - 200, 230, 0.8); if (day) { cloudFlat(ctx, 330 + 1.6 * (t - 51), 420, 0.75); cloudFlat(ctx, 880 - 1.2 * (t - 51), 360, 0.6); } }
  steam(ctx, 958, 400, t);
  yardBack(ctx, day);
  // window and door
  yardWindow(ctx, (c) => { const P = carpWindow(t); if (P) carpenter(c, P); });
  const open = t < 3.9 ? LK(t, [[2.3, 0], [2.6, 1], [3.6, 1], [3.9, 0]]) : t < 61 ? LK(t, [[58.2, 0], [58.5, 1], [60.35, 1], [60.85, 0]]) : t < 124.6 ? LK(t, [[124.2, 0], [124.33, 1]]) : LK(t, [[124.33, 1], [125.0, 0.7]]);
  yardDoor(ctx, open, (c) => { if (IN(t, 58.4, 61)) { shape(c, [[860, 850], [912, 850], [912, 858], [860, 858]], BARK, { lw: 3 }); shape(c, ell(886, 842, 16, 9, 14), C.white, { lw: 3 }); steam(c, 880, 830, t); } });
  // S1 props
  if (t < 19.74) { plankDoor(ctx, 805, 898, K.clamp((t - 10.4) / 0.8)); table(ctx, 600, 898, K.clamp((t - 11.24) / 0.9)); if (t >= 3.7) stool(ctx, 712, 898, landSquash(t, 3.7, 0.15)); if (IN(t, 9.3, 11.24)) shape(ctx, [[600, 878], [700, 878], [700, 894], [600, 894]], BARK, { lw: 3.5, seed: 70 });
    for (const h of HITS1) dustBurst(ctx, 652, 878, t - h, 4, 4, 7, 18, 0.4, Math.round(h * 10)); }
  groundDress(ctx, t);
  drawTools(ctx, t);
  // the log
  const M = monkeyP(t), TS = M ? tailState(t, M) : null;
  const sh = 0;
  if (logOn(t)) {
    const g = splitLog(ctx, { kerf: kerfAt(t), gap: gapAt(t), chalk: t < 31.16 ? K.clamp((t - 27.82) / 1.0) : 0, mid: (c, g) => { if (TS && TS.layer === 'log') drawTail(c, TS.pts, M.s, { ...TS, tuft: t < SNAP }); } });
    if (IN(t, 28.92, 30.2)) { const u = K.clamp((t - 28.92) / 0.4), a = K.clamp((30.2 - t) / 0.4); ctx.save(); ctx.globalAlpha = 0.55 * a; ctx.fillStyle = C.white; ctx.fillRect(LOG.x0, LOG.top - 30 * u, 340, 57); ctx.fillRect(LOG.x0, LOG.seam + 30 * u, 340, 55); ctx.globalAlpha = a; sfx(ctx, '1', 500, LOG.top - 30 * u + 28, 50, u * 1.5); sfx(ctx, '2', 500, LOG.seam + 30 * u + 28, 50, u * 1.5); ctx.restore(); }
    const ws = wedgeState(t); if (ws === 'log') wedgeInLog(ctx, g, WOUTat(t), 0, IN(t, 101.73, 102.48) ? 0.16 * Math.sin((t - 101.73) * 17) : 0);
    if (ws === 'fly') { const [x, y, r] = wedgeFly(t); wedge(ctx, x - 30, y, r, 1); }
    if (ws === 'ground') wedge(ctx, 840, 903 - 16 * pulse(t, 128.6, 0.3), 0.05 + 0.3 * pulse(t, 128.6, 0.3), 1);
    ringFlash(ctx, 600, 838, 40, t, 128.2, 0.8); ringFlash(ctx, 870, 902, 46, t, 128.6, 0.8);
    if (t >= 26.2 && t < 27.2) for (const lx of [340, 660]) dustBurst(ctx, lx, 896, t - 26.2, 6, 6, 12, 40, 0.7, lx);
    if (IN(t, SNAP, SNAP + 1.0)) for (const lx of [600, 680]) dustBurst(ctx, lx, 845, t - SNAP, 7, 6, 13, 60, 0.9, lx);
    sawdust(ctx, 668, 846, t, sawing(t) && carpP(t) && carpP(t).holdR === 'saw', 3);
    if (t >= 107.86 && t < 136.3) { const e = gapEnd(t); if (t >= 108.56) painPulse(ctx, e[0], e[1] - 4, t, 107.86 + Math.floor((t - 107.86) / 0.7) * 0.7, 0.8); painPulse(ctx, e[0], e[1] - 4, t, 107.86, 2.2, 0.7); for (const [h, sz] of [[118.1, 1], [118.6, 1.6], [119.1, 2.2]]) painPulse(ctx, e[0], e[1] - 4, t, h, sz, 0.55); }
  }
  // the monkey (tail first unless it is in the log or in front)
  if (M) { if (TS.layer === 'back') drawTail(ctx, TS.pts, M.s, TS); monkeyK(ctx, M); if (TS.layer === 'front') { drawTail(ctx, TS.pts, M.s, TS); if (TS.sore) painPulse(ctx, TS.pts[15][0], TS.pts[15][1], t, Math.floor(t / 0.9) * 0.9, 0.55); } }
  if (M && M.y < 700) { const part = t < 14.48 ? 0 : t < 145.94 ? K.ease.out(K.clamp((t - 14.48) / 0.4)) : 1, open2 = K.ease.inOut(K.clamp((t - 153.1) / 0.4)), deep = t < 145.94 ? 0 : 0.5 * K.clamp((t - 145.94) / 0.8) * (1 - open2); leafClumps(ctx, part, t, deep, 45 * open2); }
  else leafClumps(ctx, 1, t, 0);
  if (IN(t, 153.54, 154.5) && M) { const h = mkToWorld(M, M.handR[0], M.handR[1]); ctx.save(); ctx.globalAlpha = 0.5 * K.clamp((154.5 - t) / 0.2); ctx.setLineDash([8, 8]); saw(ctx, h[0] - 4, h[1] + 4, 0.15, 0.55); ctx.restore(); }
  if (M && TS && TS.layer === 'front' && IN(t, 154.18, 155.0)) painPulse(ctx, TS.pts[15][0], TS.pts[15][1], t, 154.18, 1.3, 0.8);
  leafFall(ctx, t, 144.0, 230, 470, 5); leafFall(ctx, t, 26.2, 250, 480, 2);
  // the carpenter (and what he carries)
  const P = carpP(t);
  if (IN(t, 20.3, 26.2)) { const cx = (P ? P.x : 500) + 10, cy = t < 25.9 ? GR - 232 + 4 * Math.sin(t * 9) + (t > 24.92 ? K.lerp(0, 18, K.clamp((t - 24.92) / 0.7)) : 0) : fallY(t, 25.9, 26.2, GR - 214, 839); logWhole(ctx, cx, cy, t < 25.9 ? 0.04 * Math.sin(t * 4) : 0); }
  if (P) { if (IN(t, 133.02, 138.95)) { seg(ctx, BAR_TIP[0], BAR_TIP[1], BAR_HAND[0] + 6, BAR_HAND[1] - 6, 12, IRON, 4); seg(ctx, BAR_HAND[0] - 8, BAR_HAND[1] + 8, BAR_HAND[0] + 10, BAR_HAND[1] - 10, 17, C.red, 4); } carpenter(ctx, P); }
  if (t >= 20.3 && t < 25.4) for (const f of FALLS_C) if (f.t > 20 && f.t < 25.4) dustBurst(ctx, f.x, GR - 4, t - f.t, 4, 4, 8, 20, 0.45, Math.round(f.t * 10));
  for (const f of FALLS_C) if (f.t > 124 && f.t < 126.5) dustBurst(ctx, f.x, GR - 4, t - f.t, 5, 5, 9, 26, 0.5, Math.round(f.t * 10));
  if (IN(t, 126.3, 127.2)) dustBurst(ctx, 765, GR - 4, t - 126.3, 7, 6, 11, 50, 0.8, 5);
  if (IN(t, 63.0, 63.8)) dustBurst(ctx, 170, GR - 4, t - 63.0, 5, 5, 9, 30, 0.6, 8);
  // bird
  const BP = birdP(t); if (BP) songbird(ctx, BP);
  if (t >= 110.48) { feather(ctx, t, { t0: 110.5, t1: 112.6, a: [296, 520], b: [330, 893], col: C.red }); feather(ctx, t, { t0: 110.6, t1: 113.0, a: [280, 510], b: [250, 893], col: C.red }); }
  // eye lines (the film's diagonal)
  const eyeL = (t0) => { const m = M ? mkToWorld(M, 8, -150) : [230, 430], c = P ? [P.x, P.y - 180 * CS] : [760, 720]; eyeLine(ctx, m, c, K.clamp((t - t0) / 0.5), K.clamp((t0 + 1.4 - t) / 0.3)); };
  if (IN(t, 17.24, 18.7)) eyeL(17.24); if (IN(t, 158.3, 159.7)) eyeL(158.3);
  // world-space accents
  ringFlash(ctx, 842, 850, 40, t, 161.0, 0.7);
  ringFlash(ctx, 680, 822, 46, t, 82.24, 1.1); if (P && IN(t, 132.36, 133.2)) { const h = mkW(P, 60, -110); ringFlash(ctx, h[0], h[1], 50, t, 132.36, 0.84); }
  if (IN(t, 36.32, 38.0) && P) { const hd = mkW(P, 104, -158); ringFlash(ctx, hd[0], hd[1], 92, t, 36.32, 1.68); }
  if (IN(t, 41.78, 43.0)) ringFlash(ctx, 680, 822, 46, t, 41.78, 1.2); ringFlash(ctx, 648, 822, 40, t, 44.3, 0.8);
  if (IN(t, 120.12, 123.4) && M) { const mo = mkToWorld(M, 14, -128), wi = [928, 670]; for (let i = 0; i < 3; i++) { const u = (t - 120.12) * 0.75 - i * 0.33; if (u < 0 || u > 1) continue; const x = K.lerp(mo[0] + 20, wi[0], u), y = K.lerp(mo[1], wi[1], u) - 30 * Math.sin(Math.PI * u); ctx.save(); ctx.globalAlpha = K.clamp((1 - u) / 0.25); ctx.lineCap = 'round';
    for (const r of [14, 28, 42]) { ctx.beginPath(); ctx.arc(x - 40, y, r, -0.75, 0.75); ctx.lineWidth = 11; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 5.5; ctx.strokeStyle = C.yellow; ctx.stroke(); } ctx.restore(); } }
  if (IN(t, 109.98, 111.1) && M) soundArcs(ctx, mkToWorld(M, 8, -150)[0], mkToWorld(M, 8, -150)[1], 1, t);
  if (IN(t, 49.28, 51) && P) for (let i = 0; i < 2; i++) { const u = ((t - 49.28) * 0.8 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); note(ctx, P.x - 30 - 20 * u, P.y - 200 - 70 * u, 0.9); ctx.restore(); }
  if (IN(t, 54.52, 55.4) && P) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); for (let i = 0; i < 20; i++) { const x = P.x - 20 + i * 3, y = P.y - 110 + 5 * Math.sin(i + t * 20); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
  if (IN(t, 119.6, 121.3) && M) teardrops(ctx, t, 119.6, 120.2, mkToWorld(M, -2, -146), { groundY: 783, rate: 2 });
  if (IN(t, SNAP - 0.03, SNAP + 0.07)) { ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = C.white; ctx.fillRect(0, 0, WW, WH); ctx.restore(); }
  if (IN(t, 100.42, 100.5)) { ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = C.white; ctx.fillRect(0, 0, WW, WH); ctx.restore(); }
}

// ---------- camera ----------
const two = (a, b) => twoShot(a, b, { margin: 170, maxZoom: 2.0 });
const WIDE = { x: 540, y: 565, zoom: 1.25 };   // v2 standard tall-panel wide: ground band about 14 %
const CAM = [
  [0, { x: 760, y: 720, zoom: 1.7 }], [3.56, { x: 760, y: 720, zoom: 1.7 }], [5.57, WIDE], [8.82, WIDE], [9.5, { x: 680, y: 760, zoom: 1.6 }], [14.03, { x: 680, y: 760, zoom: 1.6 }], [14.04, { x: 250, y: 560, zoom: 1.9 }], [17.24, { x: 250, y: 560, zoom: 1.9 }], [18.3, WIDE],
  [19.73, WIDE], [19.74, { x: 420, y: 700, zoom: 1.15 }], [24.0, { x: 470, y: 710, zoom: 1.2 }], [25.4, { x: 540, y: 720, zoom: 1.25 }], [31.78, { x: 560, y: 740, zoom: 1.25 }], [32.6, { x: 650, y: 790, zoom: 2.0 }], [36.88, { x: 650, y: 790, zoom: 2.0 }], [37.6, { x: 690, y: 810, zoom: 2.6 }],
  [40.59, { x: 690, y: 810, zoom: 2.6 }], [40.6, { x: 680, y: 800, zoom: 2.4 }], [45.9, { x: 680, y: 800, zoom: 2.4 }], [46.9, { x: 500, y: 690, zoom: 1.28 }],
  [51.19, { x: 500, y: 690, zoom: 1.28 }], [51.2, { x: 640, y: 740, zoom: 1.4 }], [57.18, { x: 640, y: 740, zoom: 1.4 }], [59.4, { x: 790, y: 740, zoom: 1.4 }], [60.0, { x: 790, y: 740, zoom: 1.4 }], [61.0, { x: 440, y: 680, zoom: 1.15 }],
  [61.6, { x: 260, y: 620, zoom: 1.5 }], [63.3, { x: 260, y: 720, zoom: 1.5 }], [64.1, { x: 260, y: 740, zoom: 1.5 }], [65.5, { x: 380, y: 760, zoom: 1.6 }], [66.16, { x: 380, y: 760, zoom: 1.6 }], [67.0, { x: 440, y: 640, zoom: 1.45 }], [76.4, { x: 440, y: 640, zoom: 1.45 }], [77.6, { x: 600, y: 760, zoom: 1.8 }], [78.7, { x: 600, y: 760, zoom: 1.8 }], [79.9, { x: 640, y: 790, zoom: 2.3 }],
  [80.6, { x: 660, y: 770, zoom: 2.0 }], [93.6, { x: 660, y: 770, zoom: 2.0 }], [93.94, { x: 650, y: 690, zoom: 2.6 }], [95.98, { x: 650, y: 690, zoom: 2.6 }], [96.0, { x: 650, y: 860, zoom: 3.2 }], [98.06, { x: 650, y: 860, zoom: 3.2 }], [98.08, { x: 660, y: 770, zoom: 2.0 }], [100.4, { x: 670, y: 790, zoom: 2.4 }],
  [102.4, { x: 670, y: 790, zoom: 2.4 }], [102.8, { x: 630, y: 740, zoom: 1.8 }], [104.98, { x: 630, y: 740, zoom: 1.8 }], [105.6, { x: 640, y: 800, zoom: 2.0 }], [108.3, { x: 640, y: 800, zoom: 2.0 }], [108.36, { x: 600, y: 730, zoom: 1.7 }], [111.0, { x: 600, y: 730, zoom: 1.7 }], [111.6, { x: 580, y: 720, zoom: 1.6 }],
  [114.7, { x: 580, y: 720, zoom: 1.6 }], [115.1, { x: 640, y: 825, zoom: 2.7 }], [116.9, { x: 640, y: 825, zoom: 2.7 }], [116.95, { x: 580, y: 740, zoom: 1.6 }], [121.3, { x: 560, y: 720, zoom: 1.85 }],
  [121.31, { x: 850, y: 710, zoom: 2.0 }], [124.28, { x: 850, y: 710, zoom: 2.0 }], [125.9, { x: 620, y: 700, zoom: 1.7 }], [132.4, { x: 620, y: 700, zoom: 1.7 }], [133.4, { x: 650, y: 760, zoom: 1.85 }], [138.99, { x: 650, y: 760, zoom: 1.85 }], [139.4, { x: 620, y: 730, zoom: 1.3 }],
  [142.1, { x: 620, y: 730, zoom: 1.3 }], [143.0, { x: 400, y: 660, zoom: 1.15 }], [144.6, { x: 400, y: 660, zoom: 1.15 }], [145.9, { x: 250, y: 560, zoom: 1.9 }], [150.18, { x: 250, y: 560, zoom: 1.9 }], [151.3, { x: 660, y: 760, zoom: 1.5 }], [153.49, { x: 660, y: 760, zoom: 1.5 }], [153.5, { x: 250, y: 560, zoom: 1.9 }],
  [157.66, { x: 250, y: 560, zoom: 1.9 }], [160.0, WIDE], [DUR, WIDE]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; c.y -= Math.min(55, 70 * (z - 1)); return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };

// ---------- lettering (upper band, never over a face) ----------
function overlays(ctx, t, cam, S) {
  const P = (x, y) => toPanel(x, y, cam), fade = (a, b) => K.clamp(Math.min((t - a) / 0.15, (b - t) / 0.3));
  const lab = (txt, a, b, x, y, o = {}) => { if (!IN(t, a, b)) return; ctx.save(); ctx.globalAlpha = fade(a, b); S.label(ctx, txt, K.clamp(x, 160, 840), K.clamp(y, 140, 1080), B(t, a, 0.5), { size: 54, align: 'center', ...o }); ctx.restore(); };
  const arr = (a, b, from, to, o = {}) => { if (!IN(t, a, b)) return; ctx.save(); ctx.globalAlpha = fade(a, b); S.arrow(ctx, P(...from), P(...to), B(t, a + 0.1, 0.4), o); ctx.restore(); };
  const word = (txt, a, b, x, y, size = 90, o = {}) => { if (!IN(t, a, b)) return; ctx.save(); ctx.globalAlpha = fade(a, b); sfx(ctx, txt, x, y, size, B(t, a, 0.35), o); ctx.restore(); };
  // S1
  { const [x, y] = P(215, 400); lab('CURIOUS!', 15.0, 16.8, x + 170, y - 120); arr(15.1, 16.8, [330, 330], [262, 405]); }
  if (IN(t, 19.9, 22.0)) { ctx.save(); ctx.globalAlpha = fade(19.9, 22.0); S.title(ctx, 'ONE DAY', 500, 200, B(t, 19.9, 0.8), { size: 72, align: 'center' }); ctx.restore(); }
  { const [x, y] = P(620, 760); word('ZZZ ZZZ', 31.3, 32.6, K.clamp(x, 200, 800), K.clamp(y - 260, 160, 1000), 70, { rot: -0.08 }); }
  { const [x, y] = P(660, 830); lab('GAP', 32.9, 34.4, x - 270, y - 230); arr(33.0, 34.4, [520, 720], [650, 832], { width: 18 }); }
  { const [x, y] = P(680, 822); lab('HOLDS IT OPEN', 41.78, 44.0, x - 120, y - 340); arr(41.9, 44.0, [600, 700], [660, 818], { width: 18 }); }
  if (IN(t, 43.14, 44.05)) { const p = B(t, 43.14, 0.3); ctx.save(); ctx.globalAlpha = fade(43.14, 44.05); S.arrow(ctx, P(600, 680), P(600, 758), p, { color: C.red, width: 28, bend: 0 }); S.arrow(ctx, P(600, 960), P(600, 898), p, { color: C.red, width: 28, bend: 0 }); ctx.restore(); }
  if (IN(t, 44.76, 45.95)) { const m = P(655, 821), p = B(t, 44.76, 0.3); ctx.save(); ctx.globalAlpha = fade(44.76, 45.95); S.arrow(ctx, m, [m[0], m[1] - 44], p, { color: C.yellow, width: 18, bend: 0 }); S.arrow(ctx, m, [m[0], m[1] + 44], p, { color: C.yellow, width: 18, bend: 0 }); ctx.restore(); }
  if (IN(t, 57.18, 60.9)) { const M = monkeyP(t), hd = mkToWorld(M, 8, -120), k = K.ease.back(K.clamp(Math.min((t - 57.18) / 0.3, (60.9 - t) / 0.2))), cx = 170, cy = 180, R = 115 * k;
    if (R > 2) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip(); ctx.translate(cx, cy); ctx.scale(2.4, 2.4); ctx.translate(-hd[0], -hd[1]); drawWorld(ctx, t, cam); ctx.restore(); ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.restore(); } }
  if (IN(t, 54.6, 55.5)) { const c = carpP(t); if (c) { const [x, y] = P(c.x, c.y - 250); word('YAWN', 54.6, 55.5, K.clamp(x - 60, 200, 800), Math.max(150, y), 80, { fill: C.white, rot: -0.1 }); } }
  if (IN(t, 50.6, 51.8)) S.transition(ctx, 1000, 1230, (t - 50.6) / 1.2, { caption: 'LATER...' });
  // S5
  if (IN(t, 67.3, 76.52)) { const M = monkeyP(t), hd = P(...mkToWorld(M, 8, -150)), cx = 560, cy = 330; const pop = t > 76.3 ? 1 - K.clamp((t - 76.3) / 0.22) : B(t, 67.3, 0.6);
    if (pop > 0) cloud(ctx, cx, cy, 300, 210, C.white, pop, { tail: [hd[0] - cx + 30, hd[1] - cy - 40], inside: (c) => thoughtInside(c, t) }); }
  { const M = monkeyP(t); if (M && IN(t, 73.26, 74.8)) { const [x, y] = P(...mkToWorld(M, 8, -150)); word('EASY!', 73.26, 74.8, K.clamp(x + 200, 200, 820), K.clamp(y - 60, 160, 1000), 96, { rot: -0.1 }); } }
  if (IN(t, 79.55, 80.4)) { const e = gapEnd(t); ctx.save(); ctx.globalAlpha = fade(79.55, 80.4); S.arrow(ctx, P(e[0] - 90, e[1] + 90), P(e[0] - 10, e[1] + 10), B(t, 79.55, 0.25), { color: C.red, width: 16 }); ctx.restore(); }
  // S6
  { const M = monkeyP(t); if (M && IN(t, 84.78, 86.0)) { const [x, y] = P(...mkToWorld(M, 8, -200)); word('?', 84.78, 86.0, x, Math.max(130, y - 40), 110, { fill: C.white }); }
    if (M && IN(t, 93.94, 95.0)) { const [x, y] = P(...mkToWorld(M, 8, -150)); word('HNNGH!', 93.94, 95.0, K.clamp(x - 40, 220, 780), K.clamp(y - 200, 140, 900), 92, { rot: -0.1 }); }
    if (IN(t, 100.42, 101.4)) { const [x, y] = P(712, 800); word('!', 100.42, 101.4, x, Math.max(140, y - 170), 120, { fill: C.white }); } }
  // S7
  if (IN(t, SNAP, 107.2)) { const [sx, sy] = P(640, 836), u = t - SNAP;   // v2: big SNAP burst over the seam + speed lines
    if (u < 0.2) { ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const a = -Math.PI * 0.95 + i * Math.PI * 0.9 / 7, r0 = 60 + 400 * u, r1 = r0 + 150; ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * r0, sy + Math.sin(a) * r0); ctx.lineTo(sx + Math.cos(a) * r1, sy + Math.sin(a) * r1); ctx.stroke(); } ctx.restore(); }
    const k = u < 0.1 ? K.lerp(0.4, 1.15, u / 0.1) : u < 0.167 ? K.lerp(1.15, 1, (u - 0.1) / 0.067) : 1, bx = sx + 20, by = sy - 150;
    ctx.save(); ctx.globalAlpha = K.clamp((107.2 - t) / 0.2); ctx.translate(bx, by); ctx.rotate(-0.06); ctx.scale(k, k);
    const pts = []; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, r = (i % 2 ? 150 : 235) * (i % 4 === 0 ? 1.06 : 1); pts.push([Math.cos(a) * r * 1.0, Math.sin(a) * r * 0.48]); }
    ctx.fillStyle = C.red; K.poly(ctx, pts, true); ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.22); K.poly(ctx, pts, true); ctx.fill(); ctx.restore();
    if (k > 0) { ctx.save(); ctx.globalAlpha = K.clamp((107.2 - t) / 0.2); sfx(ctx, 'SNAP!', bx, by + 6, 130 * k, 1, { rot: -0.06 }); ctx.restore(); } }
  { const M = monkeyP(t); if (M && IN(t, 109.98, 111.2)) { const [x, y] = P(...mkToWorld(M, 8, -150)); word('YEOWW!', 109.98, 111.2, K.clamp(x, 260, 740), K.clamp(y - 210, 150, 900), 130, { rot: -0.06 }); } }
  { const [x, y] = P(600, 838); lab('STUCK!', 116.16, 117.3, x + 20, y - 330); arr(116.25, 117.3, [650, 730], [604, 830], { width: 18 }); }
  for (const [h, sz] of [[118.1, 74], [118.6, 96], [119.1, 122]]) word('OW!', h, h + 0.5, 300 + (sz - 74) * 2, 230 - (sz - 74), sz, { fill: C.red, stroke: C.black });
  // S8
  if (IN(t, 126.58, 127.6)) { const c = carpP(t); if (c) { const [x, y] = P(c.x, c.y - 260); word('!', 126.58, 127.6, x, Math.max(140, y), 110, { fill: C.white }); } }
  if (IN(t, 128.2, 130.4)) { const pts = [P(598, 838), P(870, 902), P(528, 650)], L = t < 128.6 ? K.clamp((t - 128.2) / 0.4) : 1 + K.clamp((t - 128.6) / 0.68); ctx.save(); ctx.globalAlpha = fade(128.2, 130.4); ctx.setLineDash([4, 14]); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < 3; i++) { const u = K.clamp(L - (i - 1)); if (u <= 0) break; ctx.lineTo(K.lerp(pts[i - 1][0], pts[i][0], u), K.lerp(pts[i - 1][1], pts[i][1], u)); } ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore(); }
  { const c = carpP(t); if (c && IN(t, 129.28, 130.3)) { const [x, y] = P(c.x, c.y - 250); word('AH!', 129.28, 130.3, x + 40, Math.max(150, y), 96, { rot: 0.08 }); } }
  if (IN(t, 122.27, 123.6)) { const [x, y] = P(962, 600); word('?', 122.27, 123.6, Math.min(900, x), Math.max(140, y), 110, { fill: C.white }); }
  // S9
  { const M = monkeyP(t); if (M && IN(t, 156.36, 157.6)) { const [x, y] = P(...mkToWorld(M, 8, -150)); lab('NOPE!', 156.36, 157.6, x + 230, y - 110); } }
  if (t >= 162.4) S.title(ctx, 'THE END', 500, 200, B(t, 162.4, 0.8), { size: 84, align: 'center' });
}
// the thought cloud: the remembered carpenter working, then the monkey's fantasy of himself
function thoughtInside(c, t) {
  c.save(); c.fillStyle = '#fff3d6'; c.fillRect(-300, -220, 600, 440); c.fillStyle = dotPat(c, C.yellow, 10, 0.25); c.fillRect(-300, -220, 600, 440); const sw = t >= 74.37, pop = sw ? (t < 74.47 ? K.lerp(0.8, 1.1, (t - 74.37) / 0.1) : t < 74.57 ? K.lerp(1.1, 1, (t - 74.47) / 0.1) : 1) : 1; c.scale(2.4 * pop, 2.4 * pop); c.translate(-75, -32);   // v2: waist-up, figure big
  shape(c, [[-300, 90], [300, 90], [300, 220], [-300, 220]], '#d9a441', { lw: 0 });
  if (!sw) { const o = Math.sin(t * 2 * Math.PI * 1.4), hm = IN(t, 69.58, 70.8);
    logWhole(c, -70, 50, 0); c.save(); c.translate(0, 0);
    const P = { x: 120, y: 92, s: 0.62, dir: -1, mouth: 'smile', holdR: hm ? 'mallet' : 'saw', handR: hm ? [70, -80 - 40 * Math.max(0, Math.sin(t * 12))] : [64 + 22 * o, -84], toolRotR: hm ? -0.4 : 0, lid: 0.3, noBlink: true };
    carpenter(c, P); c.restore(); sun(c, K.lerp(-220, 220, K.clamp((t - 68.08) / 5.6)), -150, t);
  } else { const o = Math.sin(t * 2 * Math.PI * 1.6); logWhole(c, -80, 50, 0);
    for (let i = 0; i < 4; i++) shape(c, [[160, 82 - i * 16], [270, 82 - i * 16], [270, 94 - i * 16], [160, 94 - i * 16]], BARK, { lw: 3, seed: 80 + i });
    const P = { x: 110, y: 92, s: 0.7, dir: -1, mouth: 'grin', holdR: 'twig', handR: [70 + 20 * o, -86], sq: 1.06 };
    monkeyK(c, { ...P, holdR: null }); const hd = mkToWorld(P, 70 + 20 * o, -86); c.save(); c.translate(hd[0], hd[1]); c.scale(-1, 1); saw(c, 0, 0, 0.1, 0.6); c.restore();
    const cap = mkToWorld(P, 8, -178); shape(c, ell(cap[0], cap[1], 28, 13, 18), C.white, { lw: 4, seed: 81, dot: C.blue, pitch: 7, rad: 0.18, da: 0.35 });
    for (let i = 0; i < 3; i++) star(c, 30 + i * 45, -60 + 10 * Math.sin(t * 5 + i), 9, C.yellow, t * 2 + i); sfx(c, 'PRO!', 30, -30, 26, K.clamp((t - 74.5) / 0.3), { rot: -0.15 }); }
  c.restore();
}

const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const sh = K.spring(t, 26.2, 6, 10, 6) + K.spring(t, SNAP, 16, 11, 6) + [98.3, 98.9, 99.5].reduce((a, h) => a + K.spring(t, h, 3, 12, 8), 0) + K.spring(t, 112.68, 4, 11, 7);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / WW, ph / WH);
    const cam = camAt(t); ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t, cam); ctx.restore(); overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1); LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // sparse, quiet effects in narration pauses only (planning sfx list); the narration is the soundtrack
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    k.play('chime', 5.9, { note: 'E5', gain: 0.6 }); k.play('tick', 13.55, { gain: 0.8, pitch: 0.5 }); k.play('whoosh', 19.7, { gain: 0.6 }); k.play('thud', 26.3, { gain: 0.6 });
    k.play('tick', 34.8, { gain: 0.8, pitch: 0.5 }); k.play('click', 40.3, { pitch: 0.4, gain: 1.4 }); k.play('click', 40.7, { pitch: 0.4, gain: 1.4 }); k.play('thud', 60.9, { gain: 0.5 });
    k.play('pop', 79.8, { gain: 0.6 }); k.play('whoosh', 121.2, { gain: 0.5 }); k.play('pop', 126.3, { gain: 0.6 }); k.play('whoosh', 142.3, { gain: 0.5 });
    k.play('click', 148.8, { pitch: 0.4, gain: 1.4 }); k.play('pop', 153.2, { gain: 0.5 }); k.play('chime', 157.4, { note: 'C6', gain: 0.5 }); k.play('chime', 163.0, { note: 'C6', gain: 0.7 });
  },
};
window.SCENE = SCENE;
