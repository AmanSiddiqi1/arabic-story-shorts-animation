// ===== KD-022 sickroom scenes: S2 the diagnosis (21.55-45.05), S7 the drink (106.9-129.9), S8 the question (129.9-149.8), S9 the second drink (149.8-157.75), S10 the moral (157.75-174.9) =====
const K22STOOL = 885;   // the old physician's stool, in front of the bed head (y 955)
const k22still = (t) => k22in(t, 117.7, 118.22);
// ---------- the prince ----------
function k22prince(t) {
  const P = { ...K22PR, lie: 1, costume: 'prince', pal: { robe: C.white, dot: C.blue, pants: C.white }, lid: 0.6, brow: -0.6, mouth: 'frown', wet: true, gaze: [1, -0.3] };
  let pain = 1, rate = 1.6, cover = 0, hR = [12, -96], hL = [-12, -92], fx = { pale: 1 };
  if (t < 22.58) pain = 0.6; if (k22in(t, 25.0, 26.3)) { P.x += tremble(t, 1.2, 11); fx.sweat = 2; }
  if (t < 45.1) {
    P.gaze = t < 26.4 ? [1, -0.6] : k22eye(P, [905, 735]);
    if (t > 28.9) P.lid = 0.3;
    if (k22in(t, 30.5, 31.6)) { hR = [22 + tremble(t, 1.5, 10), -112]; pain = 1 + 0.4 * pulse(t, 30.7, 0.6); }
    if (t > 35.0) { P.lid = 0.45; P.gaze = k22eye(P, [905, 735]); }
  } else {
    P.gaze = k22eye(P, [700, 560]); P.lid = 0.55;
    if (t >= 116.2 && t < 117.9) { P.lie = K.lerp(1, 0.78, k22e(t, 116.3, 0.4)) ; P.gaze = k22eye(P, [720, 560]); P.mouth = 'closed'; }
    if (k22in(t, 116.88, 117.6)) P.lid = 1;
    if (t >= 117.6) { P.lie = K.lerp(0.78, 1, k22e(t, 117.6, 0.3)); P.lid = 0.55; P.gaze = [0, -1]; }
    if (t >= 118.22) { P.eyes = 'wide'; P.lid = null; P.brow = -0.8; P.mouth = 'o'; }
    if (t >= 119.74) { pain = K.lerp(1, 2.2, k22e(t, 119.74, 0.6)); rate = 3; P.mouth = 'open'; hR = [6, -106]; hL = [-6, -98]; P.x += tremble(t, 2.5, 11) * (t < 122.88 ? 1 : 0); }
    if (t >= 122.88) { const u = k22e(t, 122.88, 1.0); P.eyes = null; P.lid = K.lerp(0.4, 1, u); P.tilt = 0.3 * u; P.mouth = 'closed'; pain *= 1 - k22e(t, 122.9, 0.7); hR = k22lp([6, -106], [-16, -62], k22e(t, 122.95, 1.0, 'out')); P.brow = K.lerp(-0.8, 0, u); fx.pale = 1; }
    if (t >= 124.0) { pain = 0; cover = 0; P.noBlink = true; }
    if (t < 116.2 && t > 107) P.gaze = k22eye(P, t < 112.8 ? [360, 640] : [700, 600]);
    if (t >= 118.22 && t < 122.88) P.gaze = [0.2, -1];
  }
  if (P.lid != null && P.lid < 1 && !P.noBlink && !k22still(t)) P.lid = Math.max(P.lid, blink(t, 29));
  P.handR = hR; P.handL = hL; P.breath = 1;
  return { P, pain, rate, cover, fx, stomach: k22lieW(P, [10, -108]) };
}
// ---------- the king ----------
function k22king(t) {
  const P = { x: 640, y: K22GR, s: 1.4, dir: 1, costume: 'caliph', brow: -0.7, mouth: 'frown' }, fx = { t };
  const ph = k22prince(t).P, ph1 = k22head(ph);
  P.gaze = k22eye(P, ph1);
  if (t < 45.1) {
    if (k22in(t, 23.4, 24.4)) P.handRW = k22reach(P, 1, k22kv(t, [[23.4, [760, 760]], [23.7, [796, 704]], [23.95, [796, 704]], [24.15, [770, 730]]]));
    if (k22in(t, 33.5, 38.3)) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.tip = 0.06; P.brow = -0.6; P.gaze = k22eye(P, [905, 720]); P.noBlink = true; }
    if (k22in(t, 38.3, 40.9)) { P.mouth = 'smile'; P.brow = -0.2; P.handR = t < 39.2 ? PERSON_HANDS.wave.R : [40, -84]; P.gaze = k22eye(P, t < 39.2 ? [500, 640] : [905, 720]); P.drop = 4; }
    if (t >= 40.9) { P.brow = -0.7; P.gaze = k22eye(P, t < 44.2 ? [905, 720] : [640, 640]); }
    return { P, fx };
  }
  // S7
  if (t < 129.9) {
    if (k22in(t, 107.3, 113.5)) { const sx = k22sac(t, [[107.3, [360, 600]], [108.3, [360, 680]], [108.8, [80, 560]], [109.1, [360, 680]]]); P.gaze = k22eye(P, sx); }
    if (k22in(t, 108.3, 113.5)) { P.brow = -0.8; P.mouth = t < 108.84 ? 'open' : 'smile'; P.sq = 1.04; }
    if (k22in(t, 110.36, 113.5)) { P.gaze = [-0.6, -0.6]; P.drop = 5 * (pulse(t, 111.8, 0.3) + pulse(t, 112.1, 0.3)); const cl = pulse(t, 112.3, 0.25); P.handL = [-30 + 20 * cl, -130]; P.handR = [30 - 20 * cl, -130]; }
    if (k22in(t, 114.26, 116.2)) { P.gaze = k22eye(P, t < 114.9 ? [360, 700] : ph1); P.handL = t < 114.9 ? [-104, -160] : [-40, -84]; P.handR = t >= 114.9 ? [86, -80] : [40, -84]; P.mouth = 'closed'; P.brow = -0.3; }
    if (k22in(t, 116.2, 117.95)) { P.handRW = k22reach(P, 1, [ph1[0] - 16, ph1[1] + 32]); P.mouth = 'closed'; P.brow = -0.4; P.tip = 0.05; }
    if (k22in(t, 117.9, 120.9)) { P.brow = -0.8; P.mouth = 'o'; }
    if (k22in(t, 120.9, 125.6)) { P.handLW = k22reach(P, -1, k22lieW(ph, [-20, -150])); P.handRW = k22reach(P, 1, k22lieW(ph, [20, -150])); P.brow = -1; P.mouth = 'o'; P.tilt = 0.08; P.tip = 0.08; P.x += t < 122.9 ? tremble(t, 1.5, 7) : 0; }
    if (t >= 125.6) { P.kneel = k22e(t, 125.6, 0.5); P.tip = 0.22 * k22e(t, 125.7, 0.6); P.drop = 10 * k22e(t, 125.7, 0.6); P.lid = 0.8; P.wet = true; P.mouth = 'frown'; P.brow = -0.8; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R;
      P.x += t > 127.08 ? tremble(t, 1.2, 2.2) : 0; fx.tear = (t - 127.1) / 0.9; P.noBlink = true; }
    return { P, fx };
  }
  // S8: rises, strides round the foot of the bed, the question, the cold order
  const xf = (tt) => k22kv(tt, [[131.7, 640], [132.15, 420], [132.5, 470], [143.6, 470], [144.2, 560]], 'lin');
  P.kneel = 1 - k22e(t, 131.3, 0.4); P.wet = t < 142; P.tip = 0.22 * (1 - k22e(t, 130.5, 0.8)); P.drop = 10 * (1 - k22e(t, 130.5, 0.8));
  P.brow = K.lerp(-0.8, 1, k22e(t, 130.5, 0.8)); fx.flush = k22e(t, 130.5, 1.1) * (1 - k22e(t, 142.1, 0.9)); P.mouth = 'frown'; P.lid = 0.6 * (1 - k22e(t, 130.5, 0.8));
  if (t < 131.3) { P.gaze = [0, 0.2]; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
  if (t >= 131.3) { P.sq = anticipate(t, 131.3, 0.2, 0.06) * (t > 131.5 ? K.lerp(1, 1.06, k22e(t, 131.5, 0.25)) - 0.06 * k22e(t, 132.6, 0.4) : 1); if (t < 131.7) P.handR = [30, -238]; }
  if (t >= 131.7) { Object.assign(P, walk(xf, t, { stride: 40 })); P.dir = t < 143.6 ? -1 : -1; P.y = K22GR + 50 * k22e(t, 132.15, 0.35); P.gaze = k22eye(P, [300, 640]); }
  if (k22in(t, 133.0, 136.6)) { P.handR = PERSON_HANDS.pointFwd.R; }
  if (k22in(t, 136.6, 142.1)) { P.handL = k22lp([-60, -110], [-104, -150], k22e(t, 136.6, 0.25, 'back')); P.gaze = k22eye(P, t < 137.4 ? [620, 760] : [300, 640]); }
  if (t >= 142.1) { P.brow = K.lerp(1, 0, k22e(t, 142.1, 0.6)); P.lid = 0.3; P.mouth = 'closed'; P.handL = t < 143.56 ? [-40, -84] : t < 144.4 ? [-84, -112] : [-40, -84]; P.handR = t >= 144.4 && t < 146 ? [84, -112] : [40, -84]; P.gaze = k22eye(P, t < 145 ? [300, 640] : [300, 620]); }
  if (t >= 149.8) { P.gaze = k22eye(P, [300, 640]); P.noBlink = k22in(t, 152.2, 155.6); }
  if (t >= 157.75) { P.kneel = k22e(t, 157.8, 0.8); P.dir = 1; P.wet = true; P.lid = 0.6; P.brow = -0.7; P.mouth = 'frown'; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.gaze = k22eye(P, t < 166.58 ? ph1 : [455, 960]); P.tip = 0.04; P.drop = 4; P.noBlink = false; }
  if (P.lid != null && !P.noBlink && !k22still(t)) P.lid = Math.max(P.lid, blink(t, 41));
  return { P, fx };
}
// ---------- the old physician ----------
function k22doc(t) {
  const P = { y: 955, s: K22S, dir: -1, ...K22DOC, age: 1, lid: 0.5, brow: -0.5, mouth: 'closed', x: K22STOOL, sit: 1, seat: 'stool' }, fx = { t };
  let stick = null, gazeTo = k22head(k22prince(t).P);
  if (t < 28.9) {   // S2: in through the door, groping with the stick
    const xf = (tt) => { const u = K.clamp((tt - 27.0) / 1.85) * 3, k = Math.floor(u), f = u - k; return 110 + 62 * (Math.min(k, 3) + (k < 3 ? K.ease.inOut(K.clamp((f - 0.45) / 0.55)) : 0)); };
    Object.assign(P, walk(xf, t, { stride: 30 })); P.y = K22GR + 60 * k22e(t, 26.9, 0.6); P.sit = 0; P.dir = 1; P.front = true; P.lean = 0.06; P.drop = 6; gazeTo = [P.x + 120, 880];
    const tapF = (() => { const u = K.clamp((t - 27.0) / 1.85) * 3, f = u - Math.floor(u); return K.clamp(f / 0.4); })();
    P.handRW = [P.x + 48, P.y - 118]; stick = { h: P.handRW, tip: [P.x + 70 + 30 * tapF, P.y - 10 * Math.sin(Math.PI * tapF)] };
    P.handLW = [P.x - 8, P.y - 128]; if (t < 26.9) P.alpha = 0;
  } else if (t < 45.1) {
    P.tip = 0.12 * k22e(t, 28.9, 0.5); gazeTo = k22head(k22prince(t).P); P.lid = 0.55;
    if (k22in(t, 31.4, 32.46)) { P.tip = 0.14; P.lean = 0.35 * pulse(t, 31.4, 0.5) / 1; P.lid = t < 31.9 ? 1 : 0.6; P.handRW = t > 31.8 ? k22reach(P, 1, [760, 752]) : null; P.drop = 5 * k22tap(t, [31.9, 32.1, 32.3], 0.14); }
    if (k22in(t, 32.46, 35.0)) { P.tip = 0.02; P.handR = PERSON_HANDS.chin.R; P.lid = t < 33.6 ? 1 : 0.55; fx.dots = k22e(t, 32.6, 0.9); gazeTo = t < 33.6 ? gazeTo : null; P.gaze = t >= 33.6 ? k22sac(t, [[33.6, [-0.7, -0.6]], [33.85, [0.6, -0.7]], [34.1, [-0.3, -0.8]], [34.4, [0.4, -0.4]]]) : undefined; }
    if (k22in(t, 35.0, 39.2)) { P.lid = 0; P.brow = -0.2; P.mouth = 'smile'; P.handR = [44, -205 - 12 * (settleTo(t, 35.0, 0, 1, 0.3) - 1)]; P.tip = 0; gazeTo = [640, 420];
      if (t > 36.0) { const nb = (t > 36.8) + (t > 37.4) + (t > 37.7); P.handR = [40 + 6 * nb, -200 + 6 * Math.sin(t * 9)]; P.talk = 0.35 + 0.3 * Math.sin(t * 14); } }
    if (k22in(t, 39.2, 40.9)) { P.lid = 0.45; P.brow = -0.4; P.mouth = 'closed'; gazeTo = [790, 760]; P.handR = k22lp([40, -84], [80, -160], k22e(t, 40.14, 0.5)); }
    if (k22in(t, 40.9, 42.4)) { P.lid = 0.55; P.wet = true; P.handL = [-14 + tremble(t, 2, 8), -158]; P.handR = [18 + tremble(t, 2, 9), -152]; gazeTo = null; P.gaze = [0, 0.4]; P.drop = 6; }
    if (t >= 42.4) { P.lid = 0.6; P.wet = true; P.handR = t > 43.45 ? [10, -186 + 4 * k22tap(t, [43.6, 43.85], 0.15)] : [40, -84]; P.brow = -0.6; }
  } else if (t < 157.75) {   // S7-S9: on the stool
    P.lid = 0.55; P.tip = 0.03; P.handL = [-20, -84]; P.handR = [20, -86];
    if (t < 113.5) gazeTo = t > 107.3 ? [360, 640] : gazeTo;
    if (k22in(t, 113.5, 114.3)) { P.tip = 0.14 * pulse(t, 113.5, 0.8); P.lid = 0.7; P.brow = -0.6; P.handR = k22lp([20, -86], [92, -150], pulse(t, 113.5, 0.8)); gazeTo = [360, 700]; }
    if (k22in(t, 114.3, 122.88)) gazeTo = k22head(k22prince(t).P);
    if (t >= 118.22 && t < 122.88) { P.brow = -0.8; P.lid = 0.4; }
    if (t >= 122.88) { P.lid = 0.7; P.brow = -0.7; P.wet = true; }
    if (t >= 127.84) { P.handL = [-6, -188]; P.drop = 10 * k22e(t, 127.9, 0.6); P.tip = 0.08; gazeTo = [800, 900]; }
  } else {   // S10: up on the stick, three taps to the bed, the hand on the blanket
    const sitV = t < 160.2 ? 1 : t < 160.6 ? 1 - 0.45 * pulse(t, 160.2, 0.4) : 1 - k22e(t, 160.6, 0.4);
    const xf = (tt) => { if (tt < 160.7) return K22STOOL; if (tt > 171.6) return K.lerp(790, K22STOOL, k22e(tt, 171.6, 0.8)); const u = K.clamp((tt - 160.7) / 1.5) * 3, k = Math.floor(u), f = u - k; return K22STOOL - 32 * (Math.min(k, 3) + (k < 3 ? K.ease.inOut(K.clamp((f - 0.45) / 0.55)) : 0)); };
    Object.assign(P, walk(xf, t, { stride: 30 })); P.sit = t > 172.4 ? k22e(t, 172.4, 1.0) : sitV; P.wet = true; P.lid = 0.55; P.brow = -0.7;
    if (t < 158.84) { P.handL = [-6, -188]; P.drop = 10; P.tip = 0.08; gazeTo = [800, 900]; }
    else if (t < 160.2) { P.handL = k22lp([-6, -188], [-20, -84], k22e(t, 158.84, 0.5)); P.drop = 10 * (1 - k22e(t, 158.84, 0.6)); P.lid = Math.max(0.5, pulse(t, 159.3, 0.8)); }
    if (t >= 160.2 && t < 171.6) { const tapF = t > 160.7 && t < 162.2 ? (() => { const f = (K.clamp((t - 160.7) / 1.5) * 3) % 1; return K.clamp(f / 0.4); })() : 0;
      if (t < 162.2) { P.handRW = [P.x - 48, 955 - 118]; stick = { h: P.handRW, tip: [P.x - 70 - 30 * tapF, 955 - 10 * Math.sin(Math.PI * tapF)] }; P.tip = 0.06; } }
    if (t >= 162.2 && t < 171.6) { const slide = k22e(t, 163.1, 0.7, 'out'); P.handRW = k22reach(P, 1, k22lp([722, 742], [738, 800], slide)); P.tip = 0.12 - 0.04 * slide; P.drop = 10 * k22e(t, 163.06, 0.5); P.lid = Math.max(0.55, K.clamp(1 - Math.abs(t - 163.4) / 0.4)); fx.tear = (t - 163.8) / 0.9;
      stick = { h: k22L2W(P, [-34, -82]), tip: [P.x + 40, 955] }; P.handL = [-34, -82]; }
    if (t >= 171.6) { P.handL = [-34, -82]; stick = { h: k22L2W(P, [-34, -82]), tip: [P.x + 30, 955] }; }
    if (t >= 165.4 && t < 167.05) gazeTo = k22head(k22prince(t).P); if (t >= 167.05) gazeTo = [455, 960];
  }
  if (gazeTo) P.gaze = k22eye(P, gazeTo);
  if (!k22still(t) && P.lid < 1) P.lid = Math.max(P.lid, blink(t, 53));
  return { P, fx, stick };
}
// ---------- the officials ----------
function k22roomOfficials(t) {
  const O1 = { ...K22OFF1, y: K22GR, dir: 1, mouth: 'closed' }, O2 = { ...K22OFF2, y: K22GR, dir: 1, mouth: 'closed' }, prH = k22head(k22prince(t).P);
  let tray = null, bowl = null;
  if (t < 45.1) {   // S2: only the tall official
    const xf = (tt) => k22kv(tt, [[26.4, 60], [27.3, 250], [38.3, 250], [39.0, 600]], 'lin');
    Object.assign(O1, walk(xf, t, { stride: 34 })); O1.y = K22GR + 60 * k22e(t, 26.4, 0.5); O1.alpha = t < 26.4 ? 0 : 1; O1.front = t < 28.9;
    O1.gaze = k22eye(O1, t < 28 ? [600, 640] : [905, 720]); if (k22in(t, 26.4, 27.5)) O1.handRW = k22reach(O1, 1, [O1.x + 70, 790]);
    if (k22in(t, 36.0, 38.3)) { O1.talk = 0.25 * Math.abs(Math.sin(t * 9)); O1.drop = 3 * Math.abs(Math.sin(t * 2.5)); }
    if (t >= 38.3) { tray = [O1.x + 110, O1.y - 165]; O1.handRW = k22reach(O1, 1, [tray[0] + 20, tray[1] + 8]); O1.handLW = k22reach(O1, -1, [tray[0] - 30, tray[1] + 8]); tray = [(O1.handRW[0] + O1.handLW[0]) / 2, O1.handRW[1] - 6]; O1.tip = 0.06 * k22e(t, 39.0, 0.3); O1.mouth = 'smile'; }
    if (t >= 40.9) O1.mouth = 'closed';
    if (t >= 44.2) { O1.gaze = k22eye(O1, [700, 620]); O1.brow = -0.6; O1.handL = PERSON_HANDS.palmsUp.L; }
    return { O1, O2: null, tray };
  }
  const q = k22roomQuack(t).P, qh = k22head(q);
  const x1 = (tt) => k22kv(tt, [[107, 250], [114.4, 250], [114.9, 330], [115.1, 330], [116.2, 520], [131.0, 520], [131.6, 630], [145.0, 630], [145.6, 420], [150.3, 420], [151.2, 240]], 'lin');
  const x2 = (tt) => k22kv(tt, [[107, 130], [145.3, 130], [145.8, 170], [149.8, 150]], 'lin');
  Object.assign(O1, walk(x1, t, { stride: 34 })); Object.assign(O2, walk(x2, t, { stride: 34 }));
  O1.y = K22GR + 55 * k22e(t, 115.3, 0.6); if (t > 150.3) O1.y = K22GR + 55 * (1 - k22e(t, 150.3, 0.6));
  O1.gaze = k22eye(O1, qh); O2.gaze = k22eye(O2, qh);
  if (t < 107.43) O1.gaze = [0.5, 0.2]; if (t < 107.56) O2.gaze = [0.6, 0.2];
  if (t >= 115.0 && t < 150.1) { const kb = t >= 116.2 && t < 117.95, bw = t < 116.2 ? [O1.x + 70, O1.y - 165] : kb ? k22lp([O1.x + 70, O1.y - 165], [prH[0] - 16, prH[1] + 26], k22e(t, 116.2, 0.5)) : [O1.x + 70, O1.y - 150];
    let b = bw; if (t >= 136.6 && t < 142.1) b = [b[0], b[1] - 12 * k22e(t, 136.7, 0.3)]; if (t >= 145.0) b = [O1.x - 75, O1.y - 165];
    O1.dir = t >= 145.0 ? -1 : 1; if (kb) { bowl = b; O1.handL = PERSON_HANDS.folded.L; O1.handR = PERSON_HANDS.folded.R; } else { O1.handRW = k22reach(O1, 1, [b[0] + 14, b[1] + 8]); O1.handLW = k22reach(O1, -1, [b[0] - 14, b[1] + 8]); bowl = [(O1.handRW[0] + O1.handLW[0]) / 2, O1.handRW[1] - 6]; }
    O1.gaze = k22eye(O1, bowl); }
  if (k22in(t, 116.88, 117.7)) bowl.tilt = -0.7;
  if (t >= 118.22 && t < 127.84) { O1.gaze = k22eye(O1, prH); O2.gaze = k22eye(O2, prH); O1.brow = O2.brow = -0.7; O1.mouth = O2.mouth = 'o'; }
  if (t >= 127.84 && t < 129.9) { O1.drop = 9 * k22e(t, 127.9, 0.5); O2.drop = 9 * k22e(t, 128.05, 0.5); O1.lid = O2.lid = 0.7; O1.mouth = O2.mouth = 'frown'; O1.gaze = O2.gaze = [0, 1]; }
  if (k22in(t, 132.5, 133.2)) { O1.tip = -0.05 * pulse(t, 132.5, 0.5); O2.tip = -0.05 * pulse(t, 132.55, 0.5); O1.eyes = O2.eyes = 'wide'; }
  if (t >= 129.9 && t < 157.75) { O2.mouth = O1.mouth = 'closed'; O2.brow = 0.3; }
  if (t >= 157.75) { O1.drop = 9 * (1 - k22e(t, 165.34, 0.5)); O2.drop = 9 * (1 - k22e(t, 165.5, 0.5)); O1.lid = O2.lid = 0.55; O1.handL = O2.handL = PERSON_HANDS.folded.L; O1.handR = O2.handR = PERSON_HANDS.folded.R; O1.mouth = O2.mouth = 'frown';
    O1.gaze = k22eye(O1, t < 165.34 ? [600, 1000] : t < 166.75 ? prH : [455, 960]); O2.gaze = k22eye(O2, t < 165.5 ? [600, 1000] : t < 166.9 ? prH : [455, 960]); }
  for (const [O, sd] of [[O1, 23], [O2, 31]]) if (!k22still(t) && !O.eyes) O.lid = Math.max(O.lid || 0, blink(t, sd));
  return { O1, O2, bowl };
}
// ---------- the ignorant man in the sickroom ----------
function k22roomQuack(t) {
  const xf = (tt) => k22kv(tt, [[106.9, 60], [107.45, 360], [121.6, 360], [122.0, 320], [131.9, 320], [132.3, 300]], 'out');
  const P = { y: 920, s: K22S, dir: 1, mouth: 'smile', lid: 0.4, sq: 1.06, tip: -0.05 }, o = { t }; Object.assign(P, walk(xf, t, { stride: 34 }));
  let bowl = null, hL = null, hR = null, gazeTo = [700, 620];
  if (t < 107.6) { P.tip = t < 107.3 ? 0.1 : -0.18 * pulse(t, 107.3, 0.4); hR = [P.x + 52, 640]; o.trot = -0.2 * pulse(t, 107.3, 0.5); }
  if (k22in(t, 107.6, 112.8)) { hR = [P.x + 60, 760]; hL = [P.x + 20, 764]; }
  if (k22in(t, 112.8, 115.1)) { const bw = 0.32 * pulse(t, 112.82, 2.0) + (t > 113.8 ? 0.0 : 0); P.tip = bw; hR = [P.x + 74, 744]; hL = [P.x + 30, 748]; P.gaze = [1, -0.5]; gazeTo = null; if (t > 114.4) { hR = [P.x + 70, 740]; hL = [P.x + 34, 744]; P.tip = 0; } }
  if (t >= 115.1 && t < 121.56) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; gazeTo = [790, 740]; P.mouth = 'smile'; }
  if (t >= 117.7 && t < 118.22) P.noBlink = true;
  if (t >= 121.56) { P.mouth = 'closed'; P.sq = 1; P.tip = 0; o.sweat = 1; gazeTo = null; P.gaze = k22sac(t, [[121.56, [1, -0.2]], [121.8, [-1, -0.1]], [122.1, [-1, 0.1]], [122.4, [1, -0.3]]]); P.brow = -0.5; }
  if (t >= 128.56 && t < 129.9) { P.gaze = k22sac(t, [[128.56, [-1, 0]], [128.9, [-1, 0.1]]]); P.drop = 4 * pulse(t, 129.0, 0.3); P.mouth = 'o'; }
  // S8
  if (t >= 129.9 && t < 149.8) { P.sq = 1; P.tip = 0; P.mouth = 'o'; P.brow = -0.7; o.sweat = 2; P.gaze = k22eye(P, [470, 640]); P.lid = 0;
    if (k22in(t, 132.5, 132.9)) P.y -= hop(t, 132.5, 0.3, 0, 0, 18)[1];
    if (t >= 133.0) P.tip = -0.1;
    if (t >= 135.3) { P.sq = 1 - 0.06 * k22e(t, 135.3, 2.6); P.brow = -0.8; P.gaze = k22eye(P, Math.floor((t - 135.3) / 0.3) % 2 ? [400, 740] : [470, 610]); }
    if (k22in(t, 137.4, 138.88)) P.gaze = k22eye(P, k22sac(t, [[137.4, [620, 760]], [137.75, [790, 740]], [138.05, [470, 610]]]));
    if (k22in(t, 138.88, 140.7)) { P.talk = Math.abs(Math.sin((t - 138.88) * 7)) * 0.7; P.handR = k22lp(PERSON_HANDS.pointUp.R, [44, -140], k22e(t, 139.6, 0.5)); o.sweat = 3; }
    if (k22in(t, 140.7, 141.44)) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.mouth = 'smile'; P.talk = 0; }
    if (t >= 141.44) { P.sq = 0.9; P.tip = 0.06; o.slip = 14 * k22e(t, 141.5, 0.5); P.mouth = 'closed'; if (t < 142.6) P.handR = [12 + 3 * Math.sin(t * 30), -150]; }
    if (t >= 146.7) { P.tip = -0.14; P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; P.eyes = 'wide'; P.gaze = k22eye(P, [370, 700]); }
    if (t >= 148.74) { P.gaze = t < 149.0 ? k22eye(P, [790, 740]) : [0, 0.05]; P.drop = 5 * pulse(t, 149.4, 0.3); }
  }
  // S9
  if (t >= 149.8) { P.x = 300; P.y = 930; P.sq = 0.95; P.tip = 0; o.slip = 14; P.mouth = 'frown'; P.brow = -0.8; P.eyes = null; P.lid = 0.2;
    bowl = { p: [330, 735], lv: 0.5 };
    if (t < 150.1) { bowl = null; P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; }
    if (t >= 150.1) { bowl.p = [330 + tremble(t, 2, 9), 735]; P.gaze = k22eye(P, [560, 620]); }
    if (t >= 151.32) { P.lid = 1; P.brow = -0.6; P.sq = 0.95 * (1 + 0.04 * k22e(t, 151.4, 0.4)); bowl.p = [320 + tremble(t, 2, 9), 735 - 50 * k22e(t, 151.4, 0.6)]; }
    if (t >= 152.26) { const m = k22mouth(P); bowl.p = [m[0] + 6, m[1] + 6]; bowl.rot = -1.0 * k22e(t, 152.3, 0.3); bowl.lv = 0.5 * (1 - k22e(t, 152.4, 0.8)); P.drop = -6; P.tilt = -0.1; }
    if (t >= 153.32) { bowl.p = [330, 740]; bowl.rot = 0; bowl.lv = 0; P.drop = 0; P.tilt = 0; P.lid = 0; P.wink = 'R'; P.mouth = 'smile'; P.gaze = [0.3, -0.2]; P.noBlink = true; }
    if (t >= 154.1) { P.wink = null; P.eyes = 'wide'; P.mouth = 'o'; o.green = k22e(t, 154.1, 0.9); P.handL = [10, -106]; }
    if (t >= 155.08) { const f = k22e(t, 155.08, 0.4, 'in'); bowl.p = [bowl.p[0] + 20 * f, 740 + 300 * f]; bowl.rot = 2 * f; P.tip = 0.08 * Math.sin((t - 155.08) * 9); }
    if (t >= 155.62) { P.eyes = null; P.lid = 1; P.tip = -0.3 * k22e(t, 155.62, 0.5, 'in'); P.y = 930 + fallY(t, 155.62, 156.15, 0, 330); }
    if (bowl) { hR = [bowl.p[0] + 16, bowl.p[1] + 8]; hL = [bowl.p[0] - 18, bowl.p[1] + 8]; if (t >= 155.08) { hR = hL = null; P.handR = [40, -84]; } if (t >= 154.1) hL = null; }
  }
  if (hL) P.handLW = k22reach(P, -1, hL); if (hR) P.handRW = k22reach(P, 1, hR);
  if (bowl === null && t < 115.0 && (hL || hR)) bowl = { p: [((P.handRW || hR)[0] + (P.handLW || P.handRW)[0]) / 2, (P.handRW || hR)[1] - 6], lv: 1 };
  if (gazeTo) P.gaze = k22eye(P, gazeTo);
  if (!P.noBlink && !k22still(t) && P.lid < 1) P.lid = Math.max(P.lid, blink(t, 17));
  return { P, o, bowl };
}
// ---------- the room ----------
function k22drawRoom(ctx, t) {
  const pr = k22prince(t), kg = k22king(t), dc = k22doc(t), of = k22roomOfficials(t), S7 = t > 106, Q = S7 ? k22roomQuack(t) : null;
  const door = t < 45.1 ? k22e(t, 26.36, 0.4) * (1 - k22e(t, 28.6, 0.5)) : k22e(t, 106.8, 0.12) * (1 - k22e(t, 107.6, 0.5));
  k22roomBack(ctx, t, { door });
  const flame = t < 124.18 ? 1 : t < 125.2 ? (1 - k22e(t, 124.2, 1.0)) * (0.7 + 0.3 * Math.sin(t * 40)) : 0;
  k22lamp(ctx, K22LAMP[0], K22LAMP[1], t, flame, t > 125.2 ? (t - 125.2) / 1.8 : 0);
  k22bedBack(ctx);
  const front = [], back = [];
  (kg.P.y > 920 ? front : back).push(['king', kg]);
  if (back.length) k22person(ctx, kg.P, kg.fx);
  k22bedFront(ctx);
  person(ctx, pr.P); ctx.save(); k22headXf(ctx, pr.P); k22faceFx(ctx, { pale: pr.fx.pale, sweat: pr.fx.sweat, t }); ctx.restore();
  k22blanket(ctx, pr.P, pr.cover);
  k22pain(ctx, pr.stomach[0], pr.stomach[1], t, pr.pain, pr.rate);
  // left group (officials, the man) and the front group (doc, king when in front), by depth
  const list = [];
  const late = [];
  if (of.O1 && of.O1.alpha !== 0) (of.O1.front ? late : list).push([of.O1.y, () => person(ctx, of.O1)]);
  if (of.O2) list.push([of.O2.y - 1, () => person(ctx, of.O2)]);
  if (Q && !(t > 156.3)) list.push([Q.P.y > 940 ? 930 : Q.P.y, () => { if (t > 155.6) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, K22W, K22CHEST.bot - 4); ctx.clip(); } k22quack(ctx, Q.P, Q.o); if (Q.bowl) k22bowl(ctx, Q.bowl.p[0], Q.bowl.p[1], { level: Q.bowl.lv, rot: Q.bowl.rot || 0, s: 0.8 }); if (t > 155.6) ctx.restore(); }]);
  if (dc.P.alpha !== 0) (dc.P.front ? late : list).push([dc.P.y, () => { k22person(ctx, dc.P, dc.fx); if (dc.stick) k22stick(ctx, dc.stick.h, dc.stick.tip); }]);
  if (front.length) list.push([kg.P.y, () => k22person(ctx, kg.P, kg.fx)]);
  list.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f());
  if (of.tray) { shape(ctx, ell(of.tray[0], of.tray[1], 70, 16, 24), K22BRASS, { lw: 4, seed: 380, dot: K22BRASSD, pitch: 7, rad: 0.2, da: 0.4 }); k22mortar(ctx, of.tray[0], of.tray[1] - 2, { s: 0.55, level: 0 }); }
  if (of.bowl) k22bowl(ctx, of.bowl[0], of.bowl[1], { level: t < 116.9 ? 1 : t < 117.5 ? 1 - 0.5 * k22e(t, 116.9, 0.6) : 0.5, rot: of.bowl.tilt || 0, s: 0.8 });
  if (t >= 156.5) { const x = k22kv(t, [[156.6, 370], [157.15, 455]], 'out'), y = k22kv(t, [[156.6, 925], [157.15, 968]], 'out'); const rot = (x - 370) / 50 + swing(t, 157.15, 0.22, 2.2, 3.2); k22turban(ctx, x, y - 6, { rot, s: K22S * 0.9 }); }
  k22chest(ctx); late.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f());
  if (k22in(t, 106.9, 108)) k22speedLines(ctx, 0, Q.P.x - 40, 600, 860, t, 1, 1 - k22e(t, 107.45, 0.4));
  k22dim(ctx, t < 126.26 ? 0 : k22e(t, 126.26, 0.8) * (1 - 0.3 * k22e(t, 130.0, 1.0)));
  return { pr, kg, dc, of, Q };
}
