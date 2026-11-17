// ===== AN-040 The Cat and the Crow: staging, acting, camera, lettering and sound (plan: planning/creative_plan.md) =====
// Sets: forestEdge (world 2500 x 1230) 0-64 and 122.4-167.1; pasture (world 2300) 64-100.9; chaseRoad (view strip) 100.9-122.4.
// Ground y 900 everywhere. Every frame is a pure function of t. Positions measured on the sets: notes.md.
(() => {
const DUR = 167.1, GR = 900, VH = 1230, FW = 2500, PW = 2500;
const cl = K.clamp, lerp = K.lerp, E = K.ease;
const ramp = (t, a, b) => cl((t - a) / (b - a));
const bl = (t, a, b, v0, v1, e = 'inOut') => blend(t, a, b, v0, v1, e);
const inR = (t, a, b) => t >= a && t < b;
const B = (t, a, d) => K.beat(t, a, d, 'lin');
const qb = (a, c, b, u) => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];
const pk = (t, a, d) => pulse(t, a, d);
const setAt = (t) => (t < 64.0 ? 'F' : t < 100.9 ? 'P' : t < 122.4 ? 'C' : 'F');
const sgn = (v) => (v < 0 ? -1 : 1);

// ---------- places ----------
const CX0 = 1080, CRX = 1255, PERCH = AN40_BRANCH.perch, BUSH = { x: 1350, w: 240, h: 150 }, EYESB = [1305, 856];
const FLAT = [1300, 1520, 1740];   // the dogs' guard post in the pasture (flattened grass when they leave)

// ---------- time of day (forest) ----------
const U = (t) => { if (t < 3.92) return 0.25; if (t < 4.47) return lerp(0.06, 0.44, ramp(t, 3.92, 4.47)); if (t < 5.02) return lerp(0.06, 0.44, ramp(t, 4.47, 5.02)); if (t < 5.7) return lerp(0.06, 0.25, E.out(ramp(t, 5.02, 5.7)));
  if (t < 147) return 0.25; if (t < 157) return lerp(0.25, 0.38, E.inOut(ramp(t, 147, 157))); return 0.38; };
const DAYN = (t) => (t < 4.47 ? 1 : t < 5.02 ? 2 : 3);

// ---------- the branch ----------
const dip = (t) => swing(t, 38.54, 14, 1.4, 2.2) + swing(t, 61.62, 6, 2, 3) + swing(t, 61.92, 6, 2, 3) + swing(t, 71.3, -12, 1.6, 2.5) + swing(t, 124.1, 13, 1.4, 2.2) + swing(t, 149.06, -10, 1.6, 2.5);
const perchY = (t) => PERCH[1] + dip(t) * 0.69;

// ======================================================================= LEOPARD
// body x (forest); the nose is about 234 ahead of x at s 1
const LX = (t) => {
  if (t < 62) return kfn(t, [[24.74, 150], [26.82, 150], [28.2, 260], [30.48, 260], [30.88, 290], [31.28, 290], [31.68, 320], [32.08, 320], [32.48, 350], [32.88, 350], [33.28, 380], [46.1, 380], [46.6, 410], [52.4, 410], [53.4, 450], [58.6, 450], [59.9, 560], [62, 600]]);
  if (t < 134.3) return kfn(t, [[100, 1820], [105.6, 1760], [106.4, 1560]]);
  if (t < 140.35) return kfn(t, [[134.4, 1560], [135.3, 1480], [135.44, 1480], [135.6, 1450], [135.8, 1450], [135.96, 1420], [136.14, 1420], [136.3, 1390], [139.9, 1390]]);
  return kfn(t, [[140.35, 1390], [141.3, 380], [142.6, -300]], 'in');
};
const leoOn = (t) => inR(t, 25.4, 62) || inR(t, 104.9, 143);
const LEO_FLIP = [[0, -1], [134.3, 1], [139.68, -1]];
function leoP(t) {
  const x = LX(t), s = 1, P = { x, y: GR, s, dir: t < 62 ? 1 : 1, ...walk(LX, t, { stride: AN40_LEO_STRIDE * s }), seed: 17 };
  P.amp = cl(P.amp * 1.4);
  if (t < 62) {
    P.dir = 1; P.ears = 0.8; P.brow = 0.8; P.gaze = [1, 0.1];
    if (t < 26.2) { P.gaze = [Math.sin(t * 1.4) * 0.9, 0.2]; P.nod = 0.15; }                 // the head out: the gaze sweeps the meadow
    P.snarl = pk(t, 25.84, 0.55); if (P.snarl) P.whisk = -1;
    P.tw = Math.sin(t * 2.3) * 0.6;
    if (t >= 28.6 && t < 29.4) P.lick = pk(t, 28.7, 0.6);
    if (t >= 29.14) { P.gaze = lookAt(an40LeoHead(P), [CX0 + 60, GR - 80]); P.noBlink = t < 29.6; }
    if (t >= 29.4) P.crouch = bl(t, 29.56, 30.1, 0, 1);
    if (t >= 33.4) P.crouch = bl(t, 40.0, 41.0, 1, 0.75);
    if (t >= 30.48 && t < 33.6) { const hold = Math.abs(speed(LX, t)) < 1; P.tw = hold ? Math.sin(t * 22) * 0.8 : 0; }   // tail tip twitches on every hold
    if (t >= 59.0) { P.crouch = 0.6; }
  } else {
    // S11 inset + S13/S14
    const tf = turnFlip(t, LEO_FLIP, 0.32); P.dir = tf.dir; P.crouch = 0.3 + 0.25 * tf.sink;
    P.raise = t < 134.3 ? bl(t, 105.9, 106.4, 0, 1) : bl(t, 134.3, 134.5, 1, 0); P.brow = 0.6; P.mouth = 'smile'; P.lid = Math.max(0.3, blink(t, 17));
    P.gaze = lookAt(an40LeoHead(P), EYESB); P.tw = Math.sin(t * 2.0) * 0.7;
    if (t >= 122.96 && t < 127.4) { const d = pk(t, 123.3, 0.7); P.crouch += 0.3 * d; P.nod = 0.2 * d; if (t >= 123.3) { P.gaze = [0.3, -1]; P.brow = 1; P.mouth = 'closed'; P.lid = 0; } if (t >= 124.4) P.gaze = lookAt(an40LeoHead(P), EYESB); }
    if (t >= 127.42) { P.headTurn = t < 134.3 ? bl(t, 127.42, 127.7, 0, 1) : 0; P.eyes = 'wide'; P.lid = 0; P.noBlink = true; P.tw = 0; P.mouth = 'o'; P.brow = 0; P.gaze = [1, 0]; }
    if (t >= 134.3) { P.ears = -0.6; P.crouch = 0.5; P.mouth = 'grit'; P.whisk = -1; P.gaze = [1, 0.1];
      for (const b of [135.44, 135.8, 136.14]) if (t >= b && t < b + 0.3) { P.sq = 0.93; P.ears = -1; } }
    if (t >= 136.74) { const k = bl(t, 136.74, 137.1, 0, 1); P.ears = -1; P.tailTuck = k; P.brow = -0.6 * k; P.sq = lerp(1, 0.88, k); P.tip = -0.12 * k; P.x += tremble(t, 2); P.mouth = 'frown'; P.crouch = 0.55;
      if (t >= 137.82) P.gaze = gazePlan(t, [[0, [1, 0]], [137.82, [1, -0.3]], [138.1, [0.9, 0.2]], [138.38, [1, -0.1]]], 0.07); }
    if (t >= 139.68) { P.tailTuck = 1; P.sq = 1; P.tip = 0; P.gaze = [-1, 0]; }
    if (t >= 140.02 && t < 140.35) { P.ph = an40RunInPlace(LX, t, 140.02, 140.35, AN40_LEO_STRIDE * 1.4, 26); P.amp = 1; P.stride = 40; P.sq = 0.92; }
    if (t >= 140.35) { P.ph = an40RunInPlace(LX, t, 140.02, 140.35, AN40_LEO_STRIDE * 1.4, 26); P.amp = 1; P.stride = 42; P.sq = bl(t, 140.35, 140.6, 1.15, 1.05); P.tailTuck = bl(t, 140.35, 140.8, 1, 0); P.tailUp = 0.6; P.ears = -1; }
  }
  return P;
}

// ======================================================================= CAT
const CAT_FLIP = [[0, 1], [14.98, -1], [15.32, 1], [37.3, -1], [156.35, 1]];
const CXF = (t) => {
  if (t < 60) return kfn(t, [[45.0, CX0], [46.1, CX0], [46.3, CX0 + 22], [53.54, CX0 + 22], [53.9, CX0 + 62], [54.15, CX0 + 62], [54.45, CX0 + 100], [54.6, CX0 + 100], [54.85, CX0 + 125]]);
  return kfn(t, [[144.5, 1350], [144.75, 1306], [144.95, 1306], [145.05, 1290], [145.25, 1290], [145.36, 1276], [146.5, 1200], [154.95, 1200], [156.2, 1072], [156.6, CX0]]);
};
function catP(t) {
  const s = 0.9, P = { x: CXF(t), y: GR, s, pal: 1, dir: turnFlip(t, CAT_FLIP, 0.34).dir, sit: 1, tailCurl: 0.6 + 0.3 * Math.sin(t * 1.3), ears: 0.7, seed: 23 };
  const tf = turnFlip(t, CAT_FLIP, 0.34); P.sq = 1 - 0.06 * tf.sink;
  const crowAt = crowF(t, true), head = BEAST.world(P, [72, -115]);
  if (t < 20.4) {
    P.lid = Math.max(0.25, blink(t, 23)); P.gaze = t < 0.84 ? [0.7, -0.6] : lookAt(head, [crowAt.x, crowAt.y - 60]);
    if (t >= 1.84 && t < 2.9) { const b = pk(t, 1.84, 1.0); P.tip = 0.1 * b; P.x += 26 * b; P.lid = Math.max(P.lid, b > 0.3 ? 1 : 0.25); }
    for (const a of [3.92, 4.47, 5.02]) if (t >= a && t < a + 0.5) P.sq = anticipate(t, a, 0.3, 0.06);
    if (t >= 10.52 && t < 11.8) P.gaze = lookAt(head, [crowAt.x, crowAt.y - 60]);
    if (t >= 11.8 && t < 12.55) { const y = pk(t, 11.8, 0.75); P.mouth = y > 0.25 ? 'open' : 'closed'; P.talk = y; P.lid = Math.max(P.lid, y > 0.2 ? 1 : 0.25); P.ears = 0.7 - 0.9 * y; P.nod = -0.25 * y; }
    if (t >= 12.6 && t < 14.5) P.gaze = t < 13.3 ? lookAt(head, [crowAt.x, crowAt.y - 50]) : lookAt(head, [1170, 895]);
    if (t >= 14.5) { P.sit = bl(t, 14.5, 14.75, 1, 0); P.tip = 0.15 * pk(t, 14.55, 0.5); P.lid = 0.5; P.mouth = t < 14.9 && t > 14.6 ? 'o' : 'closed'; }
    if (t >= 15.3) { P.lie = bl(t, 15.62, 16.0, 0, 1, 'out'); P.sit = 0; P.lid = 1; P.sq = breathe(t, 2, 0.03); P.ears = 0.6 + (Math.sin(t * 4.8) > 0.97 ? -0.6 : 0); }
    if (t >= 16.85) { const w = t < 17.15 ? 0.4 : bl(t, 17.15, 17.3, 0.4, 0.1); P.lid = Math.max(w, blink(t, 23)); P.lie = bl(t, 17.05, 17.4, 1, 0); P.sit = bl(t, 17.05, 17.45, 0, 1); P.shake = t < 17.7 && t > 17.4 ? t : 0; P.gaze = lookAt(head, [crowAt.x, crowAt.y - 60]); P.sq = 1; }
    if (t >= 18.72) { P.nod = t < 19.3 ? 0.12 * Math.max(0, Math.sin(t * 9)) : 0; P.talk = talk(t, [[19.3, 19.85]]); P.tailCurl = 0.6 + 0.5 * Math.sin(t * 5); }
    return P;
  }
  if (t < 41.0) {   // asleep through the arrival and the stalk; wakes on the CAW
    P.sit = 0; P.lie = 1; P.lid = 1; P.sq = breathe(t, 2, 0.03); P.ears = 0.6 + 0.4 * pk(t, 27.6, 0.8) + (Math.sin(t * 4.1) > 0.97 ? -0.6 : 0);
    if (t >= 22.7 && t < 23.6) P.tailCurl = 0.6 + 0.8 * pk(t, 22.7, 0.9);
    if (t >= 36.1) { P.ears = bl(t, 36.1, 36.2, 0.6, 1); P.lid = bl(t, 36.22, 36.32, 1, 0); P.eyes = t >= 36.32 ? 'wide' : 'open'; P.noBlink = true;
      P.lie = bl(t, 36.35, 36.75, 1, 0, 'out'); P.sit = 0; P.sq = t < 36.8 ? 1 + 0.1 * pk(t, 36.35, 0.4) : 1; P.gaze = lookAt(head, [LX(t) + 230, GR - 150]); P.mouth = 'o'; }
    if (t >= 37.3) { P.gaze = lookAt(head, [LX(t) + 230, GR - 150]); P.arch = bl(t, 37.8, 38.4, 0, 0.5); P.puff = bl(t, 37.8, 38.4, 0, 0.4); P.ears = -0.4; P.mouth = 'closed'; }
    if (t >= 38.6) P.gaze = gazePlan(t, [[0, lookAt(head, [LX(t) + 230, GR - 150])], [38.7, lookAt(head, [PERCH[0], perchY(t) - 50])], [39.6, lookAt(head, [LX(t) + 230, GR - 150])]], 0.15);
    return P;
  }
  if (t < 60) {     // S5, S6: puffed up, trapped, the appeal
    P.sit = 0; P.eyes = 'wide'; P.noBlink = t < 44.9; P.arch = 1; P.puff = 0.75; P.ears = -1; P.sq = 1.05; P.x += tremble(t, 2); P.mouth = 'frown';
    const lh = [LX(t) + 230, GR - 150];
    P.gaze = gazePlan(t, [[0, lookAt(head, lh)], [42.78, [1, 0]], [43.5, [-1, 0.05]], [44.4, lookAt(head, lh)], [48.96, lookAt(head, [760, 880])], [49.6, lookAt(head, [760, 520])], [50.4, lookAt(head, lh)]], 0.07);
    if (t >= 43.5 && t < 46) P.tip = -0.1 * bl(t, 43.5, 43.8, 0, 1);
    P.drop = 6 * pk(t, 44.95, 0.35);
    if (t >= 46.1 && t < 46.6) P.sq = 0.92;
    if (t >= 52.8 && t < 53.5) { P.lid = 1; } if (t >= 53.3) P.wet = true;
    if (t >= 53.54) { P.arch = bl(t, 53.54, 54.6, 1, 0.4); P.puff = bl(t, 53.54, 54.6, 0.75, 0.35); P.tailUp = 0.1; Object.assign(P, { ph: CXF(t) / (GAIT.cat * s), amp: cl(Math.abs(speed(CXF, t)) / 70) }); }
    if (t >= 54.92) { const up = bl(t, 54.92, 55.4, 0, 1); P.nod = 0.6 * up; P.ears = lerp(-1, 0.1, up); P.gaze = lookAt(head, [crowAt.x, crowAt.y - 60]); }
    if (t >= 55.62 && t < 56.3) { const m = Math.max(pk(t, 55.62, 0.32), pk(t, 55.96, 0.32)); P.talk = m; P.mouth = m > 0.3 ? 'open' : 'o'; }
    if (t >= 57.72) { P.raise = bl(t, 57.72, 58.0, 0, 1); P.ears = -0.6; P.brow = -0.6; P.mouth = 'frown'; }
    return P;
  }
  // S15, S16: out of the bush, thanks, home
  P.sit = 0; P.crouch = bl(t, 145.3, 146.6, 1, 0.3); P.puff = bl(t, 147.96, 148.8, 0.45, 0); P.arch = bl(t, 147.96, 148.8, 0.5, 0); P.ears = -0.3;
  if (t < 146.6) { P.ears = t < 145.2 ? -1 : bl(t, 145.2, 145.5, -1, 0.4); P.eyes = 'wide'; }
  Object.assign(P, { ph: CXF(t) / (GAIT.cat * s), amp: cl(Math.abs(speed(CXF, t)) / 70) });
  P.dir = turnFlip(t, CAT_FLIP, 0.34).dir;
  if (t >= 146.18 && t < 146.6) P.shake = t;
  P.gaze = gazePlan(t, [[0, [-1, 0]], [146.98, [-1, -0.1]], [147.45, [1, -0.1]], [147.9, [-0.4, 0.3]], [149.5, lookAt(head, [crowAt.x + 20, crowAt.y - 70])]], 0.22);
  if (t >= 147.96 && t < 148.8) P.sq = lerp(0.95, 1, ramp(t, 148.3, 148.8));
  if (t >= 149.72) { P.ears = 0.8; P.wet = t < 154.4; P.nod = -0.12; }
  if (t >= 151.4 && t < 153.4) { const b = pk(t, 151.4, 2.0); P.tip = 0.12 * b; P.x -= 14 * b; P.lid = b > 0.2 ? 1 : P.lid; P.y += tremble(t, 0.8 * b, 14); }
  if (t >= 154.34) { P.sit = bl(t, 154.34, 154.7, 0, 1); P.tailCurl = 1; }
  if (t >= 154.95) { P.sit = bl(t, 154.95, 155.15, 1, 0); P.tailUp = 0.95; P.tailCurl = 0.8; P.gaze = [-1, 0]; }
  if (t >= 156.6) { P.sit = bl(t, 156.6, 157.0, 0, 1); P.lid = Math.max(0.25, blink(t, 23)); P.gaze = lookAt(head, [CRX, GR - 60]); P.sq = breathe(t, 2, 0.015); P.ears = 0.7; P.tailCurl = 0.6 + 0.3 * Math.sin(t * 1.3); P.tailUp = 0.5; }
  if (t >= 161.04 && t < 163.2) P.ears = 0.7 + (t > 162.0 && t < 162.3 ? -0.5 : 0);   // one ear flick at the CAW; the cat does not look round
  if (t >= 163.2) { const y = pk(t, 163.2, 0.7); P.talk = y; P.mouth = y > 0.25 ? 'open' : 'closed'; P.lid = y > 0.2 ? 1 : bl(t, 163.9, 164.2, 0.3, 1); P.sit = bl(t, 163.6, 163.9, 1, 0); P.lie = bl(t, 163.6, 164.1, 0, 1, 'out'); if (t > 164.1) P.sq = breathe(t, 2, 0.03); }
  return P;
}
const catVisible = (t) => t < 59.9 || t >= 144.6;

// ======================================================================= CROW
function crowBase(x, y) { return { x, y, s: 0.95, kind: 'crow', dir: -1, seed: 31 }; }
function flyPose(P, t, rate = 16, amt = 1) { P.fly = true; P.flap = Math.sin(t * rate) * amt; return P; }
// forest
function crowF(t, lite) {
  const catHead = (tt) => (lite ? [CXF(tt) + 60, GR - 100] : BEAST.world(catP(tt), [72, -115]));
  const P = crowBase(CRX, GR), headOf = (Q) => [Q.x + (Q.dir ?? -1) * 30, Q.y - 62];
  if (t < 1.3) { const u = E.out(ramp(t, 0.45, 1.3)), p = qb([1750, 420], [1450, 560], [1290, GR], u); P.x = p[0]; P.y = p[1]; flyPose(P, t, 18, 1 - 0.4 * u); if (t > 1.16) P.flap = -1; P.rot = -0.25 * (1 - u); return P; }
  if (t < 1.56) { const [x, h] = hop(t, 1.3, 0.26, 1290, CRX, 14); P.x = x; P.y = GR - h; P.sq = landSquash(t, 1.3, 0.15); }
  P.sq = (P.sq || 1) * landSquash(t, 1.56, 0.1);
  if (t < 20.4) {
    P.gaze = lookAt(headOf(P), [CXF(t) + 70, GR - 110]);
    if (t >= 1.84 && t < 2.9) { const b = pk(t, 1.9, 0.9); P.x += 14 * b; P.sq = 1 - 0.1 * b; P.tip = -0.1 * b; }
    for (const a of [3.92, 4.47, 5.02]) if (t >= a && t < a + 0.45) { const [, h] = hop(t, a, 0.45, CRX, CRX, 70); P.y = GR - h; if (h > 4) flyPose(P, t, 30, 0.8); }
    if (t >= 10.52 && t < 11.18) { P.gaze = [0.6, -0.8]; P.sq = anticipate(t, 10.75, 0.43, 0.15); }
    if (t >= 11.18 && t < 12.6) { const u = E.in(ramp(t, 11.18, 12.0)), p = qb([CRX, GR], [1360, 640], [1900, 220], u); P.x = p[0]; P.y = p[1]; P.dir = 1; flyPose(P, t, 22); P.sq = t < 11.3 ? 1.1 : 1; P.rot = -0.3; }
    if (t >= 12.6 && t < 13.35) { const u = E.out(ramp(t, 12.6, 13.35)), p = qb([1900, 300], [1500, 560], [CRX, GR], u); P.x = p[0]; P.y = p[1]; flyPose(P, t, 18, 1 - 0.5 * u); if (t > 13.25) P.flap = -1; }
    if (t >= 13.35) { P.sq = landSquash(t, 13.35, 0.15); P.drop = -4 * bl(t, 13.35, 13.6, 0, 1); }
    if (t >= 13.6 && t < 15.6) { P.gaze = lookAt(headOf(P), [1170, 895]); if (t >= 15.2) { const j = pk(t, 15.2, 0.35); P.drop = 14 * j; P.headRot = 0.45 * j; } }
    if (t >= 16.52 && t < 17.45) { const a = t < 17.1 ? hop(t, 16.52, 0.28, CRX, 1215, 16) : hop(t, 17.1, 0.3, 1215, CRX, 16); P.x = a[0]; P.y = GR - a[1]; if (t >= 16.85 && t < 17.1) { const j = pk(t, 16.85, 0.25); P.headRot = 0.5 * j; P.drop = 10 * j; } }
    if (t >= 18.72 && t < 19.3) { P.beak = talk(t, [[18.72, 19.28]]) * 1.2; P.sag = -0.4 * Math.max(0, Math.sin(t * 7)); }
    if (t >= 19.3) P.drop = 4 * Math.max(0, Math.sin(t * 9));
    return P;
  }
  if (t < 36.82) {   // S3, S4: pecking about, then the alarm
    const pe = Math.max(0, Math.sin(t * 9)) * (Math.sin(t * 1.3) > -0.2 ? 1 : 0); P.drop = 12 * pe; P.headRot = 0.25 * pe; P.gaze = [-0.4, 0.8];
    if (t >= 22.7 && t < 23.4) { P.drop = 12 * (1 - ramp(t, 22.75, 22.95)); P.headRot = -0.4 * pk(t, 22.9, 0.4); P.beak = t > 22.95 && t < 23.05 ? 1 : 0; }
    if (t >= 34.3) { P.drop = t < 34.37 ? lerp(6, -6, ramp(t, 34.3, 34.37)) : -6; P.headRot = 0; P.eyes = 'wide'; P.noBlink = true; P.gaze = [0.2, -0.2]; }
    if (t >= 35.8) { P.gaze = lookAt(headOf(P), an40LeoHead(leoP(t))); P.sq = bl(t, 35.8, 35.95, 1, 1.1); P.sag = -0.4; }
    if (t >= 36.1 && t < 36.5) { const c = pk(t, 36.1, 0.4); P.beak = 1.5 * c; P.headRot = -0.3 * c; }
    if (t >= 36.55) P.sq = anticipate(t, 36.55, 0.27, 0.15);
    return P;
  }
  if (t < 38.54) { const u = E.inOut(ramp(t, 36.82, 38.54)), p = qb([CRX, GR], [1330, 380], PERCH, u); P.x = p[0]; P.y = p[1] + (u > 0.9 ? dip(t) * 0.69 : 0); flyPose(P, t, 28); P.rot = -0.6 * (1 - u); P.sq = t < 37.0 ? 1.15 : 1; P.gaze = [-0.5, -0.5]; return P; }
  if (t < 71.5) {   // on the high branch
    P.x = PERCH[0]; P.y = perchY(t); P.sq = landSquash(t, 38.54, 0.16); const fl = t >= 39.6 ? 1 : -1; P.dir = fl * (t >= 39.6 && t < 39.72 ? 0.75 : 1);
    const ch = catHead(Math.min(t, 59.8)), head = [P.x + P.dir * 30, P.y - 62];
    P.gaze = lookAt(head, ch);
    if (t >= 56.24 && t < 59.9) { P.tip = 0.12 * bl(t, 56.24, 56.6, 0, 1) + 0.03 * Math.sin(t * 12); P.headRot = 0.5 * bl(t, 56.24, 56.6, 0, 1); P.brow = -0.5;
      P.gaze = gazePlan(t, [[0, lookAt(head, ch)], [57.04, lookAt(head, ch)], [57.34, lookAt(head, an40LeoHead(leoP(t)))], [57.64, lookAt(head, ch)]], 0.07);
      P.sag = -0.6 * pk(t, 57.2, 0.6); }
    if (t >= 59.9) { P.headRot = 0; P.tip = 0; P.brow = 0;
      P.gaze = gazePlan(t, [[0, [-0.7, 0.3]], [59.95, [-1, 0]], [60.2, [1, 0]], [60.45, [0.2, -1]], [60.7, [-0.8, -0.4]], [60.95, [0.9, 0.3]], [61.2, [0, -1]], [62.05, [-1, 0.2]], [62.25, [1, -0.3]], [62.45, [-0.6, -0.8]], [62.72, [1, 0]]], 0.07);
      P.headRot = t < 62.72 ? 0.12 * Math.sin(t * 9) : 0; P.y -= 3 * Math.max(0, Math.sin(t * 14)) * (t < 61.4 ? 1 : 0);
      if (t >= 61.4 && t < 62.0) { const a = t < 61.7 ? hop(t, 61.4, 0.22, PERCH[0], PERCH[0] + 30, 12) : hop(t, 61.7, 0.22, PERCH[0] + 30, PERCH[0], 12); P.x = a[0]; P.y = perchY(t) - a[1]; }
      if (t >= 62.72) { P.eyes = t < 63.1 ? 'wide' : 'open'; P.noBlink = true; P.tip = 0.12 * bl(t, 63.0, 63.8, 0, 1); }
      if (t >= 64.0) { P.tip = 0.12; P.gaze = [1, 0]; P.lid = t >= 70.72 ? bl(t, 70.72, 70.9, 0, 0.45) : blink(t, 31); P.drop = 6 * pk(t, 70.9, 0.3); }
      if (t >= 71.2) { P.sq = anticipate(t, 71.2, 0.2, 0.15); if (t > 71.38) { flyPose(P, t, 30); P.y -= 40 * ramp(t, 71.38, 71.5); P.x += 60 * ramp(t, 71.38, 71.5); } } }
    return P;
  }
  // S13 on: the arrival over the leopard, the branch, the thanks, home
  if (t < 124.1) { if (t < 122.96) { P.x = -999; return P; }
    if (t < 123.45) { const u = ramp(t, 122.96, 123.45), p = [lerp(2600, 1360, u), lerp(560, 640, E.out(u))]; P.x = p[0]; P.y = p[1]; flyPose(P, t, 26); P.rot = 0.1; return P; }
    const u = E.out(ramp(t, 123.45, 124.1)), p = qb([1360, 640], [1080, 560], PERCH, u); P.x = p[0]; P.y = p[1] + (u > 0.9 ? dip(t) * 0.69 : 0); flyPose(P, t, 22, 1 - 0.5 * u); P.rot = -0.4 * (1 - u); return P; }
  if (t < 149.06) { P.x = PERCH[0]; P.y = perchY(t); P.sq = landSquash(t, 124.1, 0.16); P.dir = t < 124.6 ? -1 : t < 124.7 ? 0.75 : 1;
    const head = [P.x + P.dir * 30, P.y - 62]; P.gaze = t < 126.84 ? lookAt(head, [2200, 760]) : lookAt(head, an40LeoHead(leoP(t)));
    if (t >= 131.0) { P.lid = Math.max(0.3, blink(t, 31)); P.sq = 0.95 + 0.05 * (1 - ramp(t, 131.0, 131.4)); P.drop = 4 * ramp(t, 131.0, 131.4); P.mouth = 'smile'; }
    if (t >= 140.0) P.gaze = lookAt(head, an40LeoHead(leoP(t)));
    if (t >= 143.0) P.gaze = lookAt(head, EYESB);
    if (t >= 144.6) P.gaze = lookAt(head, catHead(t));
    return P; }
  if (t < 149.7) { const u = E.inOut(ramp(t, 149.06, 149.7)), p = qb([PERCH[0], perchY(t)], [1060, 560], [1000, GR], u); P.x = p[0]; P.y = p[1]; P.dir = 1; flyPose(P, t, 20, 1 - 0.6 * u); if (t > 149.58) P.flap = -1; return P; }
  P.dir = 1; P.x = 1000; P.sq = landSquash(t, 149.7, 0.12);
  const ch = catHead(t), head = [P.x + 30, P.y - 62];
  P.gaze = lookAt(head, ch);
  if (t >= 150.68) { P.headRot = 0.3 * bl(t, 150.68, 150.95, 0, 1) * (t < 151.4 ? 1 : 1 - ramp(t, 151.4, 151.6)); const [x, h] = hop(t, 150.9, 0.2, 1000, 1018, 8); P.x = x; P.y = GR - h; }
  if (t >= 151.4 && t < 153.4) { const b = pk(t, 151.4, 2.0); P.sq = 1 - 0.1 * b; P.x -= 10 * b; P.tip = -0.1 * b; P.lid = b > 0.4 ? 0.6 : 0; }
  if (t >= 152.46 && t < 154.4) { P.gaze = [-1, -0.3]; P.headRot = 0.5 * pk(t, 152.8, 0.8); P.drop = 6 * pk(t, 152.8, 0.8); P.sq = 1.04; }
  if (t >= 154.4 && t < 155.04) { const a = hop(t, 154.6, 0.4, 1018, 1210, 80); P.x = a[0]; P.y = GR - a[1] - (t > 154.6 ? 100 * ramp(t, 154.6, 155.0) : 0); P.dir = -1; if (a[1] > 4) flyPose(P, t, 24, 0.7); }
  if (t >= 155.04 && t < 155.76) { const c = lite ? { x: CXF(t), ph: 0, dir: -1, amp: 0 } : catP(t); P.x = c.x + 12; P.y = GR - 100 + BEAST.bob(c.ph * Math.sign(c.dir), c.amp, 3); P.dir = -1; P.gaze = [-1, 0]; P.sq = 1; }
  if (t >= 155.76) { const c = { x: CXF(155.76) }, [x, h] = hop(t, 155.76, 0.4, c.x + 12, CRX, 40); P.x = x; P.y = lerp(GR - 100, GR, ramp(t, 155.76, 156.16)) - h; P.dir = -1; if (t < 156.16) flyPose(P, t, 24, 0.6); P.sq = landSquash(t, 156.16, 0.15);
    P.gaze = lookAt([P.x - 30, P.y - 62], catHead(t)); }
  if (t >= 158.76 && t < 159.5) P.sag = -0.8 * pk(t, 158.85, 0.6);
  if (t >= 161.98 && t < 162.5) { const c = pk(t, 161.98, 0.5); P.beak = 1.5 * c; P.headRot = -0.25 * c; P.sq = 1 + 0.05 * c; P.gaze = [-1, 0]; }
  if (t >= 163.2) { P.drop = 10 * bl(t, 163.4, 163.9, 0, 1); P.lid = bl(t, 163.5, 163.9, 0, 1); P.sq = breathe(t, 5, 0.02) * (1 - 0.05 * ramp(t, 163.4, 163.9)); P.headRot = 0.3 * ramp(t, 163.4, 163.9); }
  return P;
}
// pasture (S8 - S10)
const L0 = 1010, L1 = 560, L2 = 400, L3 = 230;
function crowP(t) {
  const P = crowBase(L0, GR); P.dir = 1;
  if (t < 74.34) { if (t < 71.5) { P.x = -999; return P; }
    if (t < 73.9) { const u = ramp(t, 71.5, 73.9), p = qb([460, 220], [700, 180], [910, 560], u); P.x = p[0]; P.y = p[1]; flyPose(P, t, 18); P.rot = 0.1; return P; }
    const u = E.in(ramp(t, 73.9, 74.34)), p = qb([910, 560], [950, 820], [970, GR], u); P.x = p[0]; P.y = p[1]; P.fly = true; P.flap = t > 74.2 ? -1 : 0.4; P.rot = 0.7 * (1 - ramp(t, 74.15, 74.34)); return P; }
  P.sq = landSquash(t, 74.34, 0.18) * landSquash(t, 74.62, 0.1) * landSquash(t, 74.88, 0.08);
  P.x = t < 74.62 ? hop(t, 74.34, 0.28, 970, 990, 10)[0] : hop(t, 74.62, 0.26, 990, L0, 8)[0]; P.y = GR - (t < 74.62 ? hop(t, 74.34, 0.28, 0, 0, 10)[1] : hop(t, 74.62, 0.26, 0, 0, 8)[1]);
  const dh = [DXP[0](t) - 150, GR - 150]; P.gaze = lookAt([P.x + 30, P.y - 62], dh);
  if (t >= 75.94 && t < 79.9) { const a = t < 76.2 ? hop(t, 75.94, 0.2, L0, L0 + 15, 6) : hop(t, 76.2, 0.2, L0 + 15, L0 + 30, 6); P.x = t < 76.4 ? a[0] : L0 + 30; P.y = GR - (t < 76.4 ? a[1] : 0); P.drop = -4; P.sq = 1.04; if (t >= 76.2 && t < 76.7) P.gaze = [-1, -0.1]; }
  if (t >= 76.76 && t < 78.4) { flyPose(P, t, 50, 1); P.y = GR - 12 * Math.abs(Math.sin(t * 25)); P.beak = 0.8; P.shake = Math.sin(t * 60) * 1.5; }
  if (t >= 79.9 && t < 81.5) { const [x, h] = hop(t, 79.95, 0.65, L0 + 30, L0 + 50, 210); P.x = x; P.y = GR - h; if (h > 5) { P.fly = true; P.flap = Math.sin(t * 30) * 0.6; } P.sq = landSquash(t, 80.6, 0.1); P.gaze = [-0.3, 1]; }
  if (t >= 81.5) { const [x, h] = hop(t, 81.5, 0.2, L0 + 50, L0 + 20, 10); P.x = x; P.y = GR - h; }
  if (t >= 82.6 && t < 83.44) { P.headRot = 0.3; P.gaze = [1, 0.4]; }
  if (t >= 83.44 && t < 85.1) { P.tailDrop = -0.6 * Math.sin(t * 30) * (t < 84.4 ? 1 : 0); P.sq = anticipate(t, 84.7, 0.4, 0.15); P.gaze = [1, 0]; }
  if (t >= 85.1 && t < 89.0) { P.dir = -1; const [x, h] = hop(t, 85.1, 0.55, L0 + 20, L1, 170); P.x = t < 85.65 ? x : L1; P.y = GR - (t < 85.65 ? h : 0); if (t < 85.62) { flyPose(P, t, 24); } P.sq = landSquash(t, 85.65, 0.14); P.gaze = [1, 0];
    if (t >= 87.48) { P.dir = t < 87.7 ? -1 : 1; const [, hh] = hop(t, 87.6, 0.2, 0, 0, 14); P.y = GR - hh; }
    if (t >= 88.36) { const u = ramp(t, 88.36, 89.0); P.x = L1 + 420 * Math.sin(Math.PI * u); P.y = GR - 300 * Math.sin(Math.PI * u) - 60 * Math.sin(2 * Math.PI * u); P.dir = u < 0.5 ? 1 : -1; if (u < 0.97) flyPose(P, t, 26); P.sq = 1; } }
  if (t >= 89.0 && t < 96.06) { P.dir = -1; P.x = L1; P.sq = landSquash(t, 89.0, 0.12);
    if (t < 91.42) { P.headRot = 0.7 * Math.max(0, Math.sin(t * 5)) ; P.drop = 6; P.gaze = [1, 0.5]; P.lid = 0.4; }   // preening, pretending not to notice
    if (t >= 91.42) { const [x, h] = hop(t, 91.42, 0.5, L1, L2, 110); P.x = t < 91.92 ? x : L2; P.y = GR - (t < 91.92 ? h : 0); if (t < 91.9) flyPose(P, t, 26); P.sq = landSquash(t, 91.92, 0.14); P.gaze = [1, 0]; }
    if (t >= 92.98) { const [x, h] = hop(t, 92.98, 0.55, L2, L3, 130); P.x = t < 93.53 ? x : L3; P.y = GR - (t < 93.53 ? h : 0); if (t < 93.5) flyPose(P, t, 26); P.sq = landSquash(t, 93.53, 0.14); } }
  if (t >= 96.06) { P.dir = -1; P.x = L3 - 10 * ramp(t, 96.06, 96.5); P.y = lerp(GR, 760, E.out(ramp(t, 96.06, 96.5))) + 6 * Math.sin(t * 6); flyPose(P, t, 22); P.gaze = [1, 0.3]; P.sag = -0.6 * pk(t, 96.8, 0.4);
    if (t >= 99.08) { P.x = lerp(L3 - 10, -260, E.in(ramp(t, 99.08, 100.0))); P.gaze = [-1, 0]; } }
  return P;
}
// chase (S11, S12): view-space strip
const DD = (t) => kfn(t, [[100.9, 0], [108.76, 3800], [110.0, 4250], [114.2, 6250], [122.4, 10400]], 'lin');
function crowC(t) {
  const P = crowBase(220, 560); flyPose(P, t, t < 106.7 ? 18 : t < 108.76 ? 24 : 18); P.gaze = [-1, 0];
  if (t < 102.2) { P.x = lerp(-150, 220, E.out(ramp(t, 100.9, 102.2))); P.rot = -0.1 * (1 - ramp(t, 101.0, 101.8)); }
  if (t >= 106.7 && t < 108.76) { P.drop = 4; P.x = 220 - 20 * ramp(t, 106.7, 107.0); }
  if (t >= 107.3 && t < 108.0) { P.gaze = [1, 0.3]; }
  if (t >= 108.76 && t < 109.54) { P.flap = -0.6; }
  if (t >= 109.54) P.y = lerp(560, 790, E.inOut(ramp(t, 109.54, 110.24)));
  if (t >= 114.2) { P.x = 330; P.y = 790 + 8 * Math.sin(t * 6); }
  if (t >= 108.76 && t < 112.0) P.x = 200 + 30 * pk(t, 108.76, 3.2);
  if (t >= 120.72 && t < 121.22) P.gaze = [1, 0.2];
  if (t >= 121.22 && t < 121.75) { P.gaze = [0, 0.05]; P.noBlink = true; P.lid = 0; }
  return P;
}

// ======================================================================= DOGS
// three personalities: dog1 bold (pal 0, s .95), dog2 copycat (pal 1, s .9), dog3 slow and puzzled (pal 2, s .85)
const DOGS = [{ pal: 0, s: 0.95 }, { pal: 1, s: 0.9 }, { pal: 2, s: 0.85 }];
const DXP = [   // pasture x keys
  (t) => kfn(t, [[79.9, 1300], [80.55, 820], [80.75, 800], [89.0, 800], [90.88, 780], [92.3, 780], [92.9, 620], [99.08, 620], [100.6, -300]], 'inOut'),
  (t) => kfn(t, [[81.2, 1520], [81.82, 1220], [86.68, 1220], [87.4, 1050], [89.0, 1050], [90.88, 1030], [92.4, 1030], [93.0, 870], [99.2, 870], [100.8, -300]], 'inOut'),
  (t) => kfn(t, [[69.82, 1740], [70.3, 1840], [70.8, 1780], [71.2, 1740], [82.05, 1740], [82.6, 1420], [86.9, 1420], [87.7, 1300], [89.0, 1300], [90.88, 1280], [92.6, 1280], [93.3, 1120], [99.35, 1120], [100.9, -300]], 'inOut') ];
const DXF = [   // forest x keys (S13, S14, S16)
  (t) => (t < 155 ? kfn(t, [[123.8, 2600], [124.36, 2060], [124.6, 2050], [132.65, 2050], [133.05, 2065], [134.0, 1930], [135.44, 1930], [136.6, 1830], [140.35, 1830], [141.6, 640], [144.3, 640]], 'inOut') : kfn(t, [[157.56, 520], [159.6, 1600]], 'lin')),
  (t) => (t < 155 ? kfn(t, [[123.95, 2680], [125.28, 2110], [125.4, 2100], [125.8, 2125], [132.65, 2125], [133.15, 2140], [134.1, 2005], [135.5, 2005], [136.6, 1905], [140.45, 1905], [141.7, 720], [144.3, 720]], 'inOut') : kfn(t, [[157.7, 390], [159.9, 1600]], 'lin')),
  (t) => (t < 155 ? kfn(t, [[124.1, 2760], [125.38, 2175], [125.5, 2165], [125.9, 2190], [132.65, 2190], [133.25, 2205], [134.2, 2080], [135.6, 2080], [136.6, 1980], [140.6, 1980], [141.85, 800], [144.3, 800]], 'inOut') : kfn(t, [[157.85, 260], [158.76, 920], [159.3, 920], [160.5, 1600]], 'inOut')) ];
function dogBase(i, x, t) { const d = DOGS[i]; return { x, y: GR, s: d.s, pal: d.pal, dir: -1, seed: 41 + i * 7, tailWag: t * 9 + i, wagAmp: 0.25, tailUp: 0.5 }; }
function gaitOf(P, xf, t, i) { const st = AN40_DOG_STRIDE * P.s, v = Math.abs(speed(xf, t)); P.ph = xf(t) / st; P.amp = cl(v / 60); P.gallop = cl((v - 260) / 200); if (P.gallop > 0) { P.earStream = P.gallop; P.tongue = 0.8 * P.gallop; } return P; }
function dogP(i, t) {
  const st = stagger(i, 0.1);
  if (t < 100.9) {   // pasture
    const xf = DXP[i], P = gaitOf(dogBase(i, xf(t), t), xf, t, i), crow = crowP(t), head = an40DogHead(P);
    P.gaze = lookAt(head, [crow.x, crow.y - 50]); P.dir = sgn(crow.x - P.x) || -1;
    if (t < 75.22 + st) { P.gaze = [-1, 0.1]; P.dir = -1;
      if (i === 0) { P.sq = 1 + 0.06 * pk(t, 69.0, 0.5); P.bark = pk(t, 69.0, 0.4); P.drop = -4; }
      if (i === 1) { P.sit = 1; P.ears = 0.8; P.gaze = [-1, -0.1]; }
      if (i === 2) { P.dir = t < 69.82 ? (Math.sin(t * 0.9) > 0 ? -1 : 1) : t < 70.3 ? 1 : -1; P.x += t < 69.82 ? 30 * Math.sin(t * 0.9) : 0; P.gaze = [P.dir, 0.4]; P.wagAmp = 0.1; if (t < 69.82) { P.ph = t * 3; P.amp = 0.8; } } }
    else { P.ears = 0.6; if (i === 1) P.sit = bl(t, 75.4, 75.8, 1, 0); }
    if (t >= 78.4 + st && t < 79.9) { P.crouch = bl(t, 78.4 + st, 78.7 + st, 0, 1); P.brow = 1; P.mouth = 'grit'; P.tailUp = 0.9; P.wagAmp = 0; P.dir = -1; P.x += 4 * Math.sin(t * 40) * (i === 0 ? 1 : 0.5); }
    if (i === 0 && t >= 79.9 && t < 81.6) { P.dir = -1; P.sq = t < 80.4 ? 1.12 : impactSquash(t, 80.55, 0.8); P.rot = t > 80.4 && t < 80.9 ? -0.15 : 0; P.crouch = t < 80.0 ? 1 : 0; P.gallop = 0.8; P.mouth = 'open'; P.brow = 1; P.eyes = t > 80.55 && t < 81.0 ? 'x' : 'open'; if (t >= 80.55) { P.gallop = 0; P.amp = 0; } }
    if (i === 0 && t >= 81.0 && t < 86.68) { P.dir = 1; P.gaze = lookAt(head, [crow.x, crow.y - 50]); }
    if (i === 1 && t >= 81.2 && t < 82.6) { P.dir = -1; P.sq = t < 81.82 ? 1.1 : 1; P.bark = pk(t, 81.82, 0.3); P.brow = 1; P.crouch = 0.4 * pk(t, 81.0, 0.3); }
    if (i === 2 && t >= 82.05 && t < 82.6) { P.dir = -1; P.sq = 1.1; P.gallop = 0.8; P.mouth = 'open'; }
    if ((i === 1 || i === 2) && t >= 82.6 && t < 86.68) { P.sit = bl(t, 82.6, 82.75, 0, 1); P.eyes = t < 83.4 ? 'x' : 'open'; P.sq = impactSquash(t, 82.6, 0.85); P.dir = -1; P.ears = -0.5; P.headTilt = 0.15 * Math.sin(t * 6); }
    if (t >= 86.68 + st * 3 && t < 89.0) { P.dir = -1; P.ears = 0.8; P.brow = 0.6; }
    if (t >= 88.36 && t < 89.0) { P.dir = sgn(crow.x - P.x); if (i === 2) P.dir = Math.sin((t - 88.5) * 18) > 0 ? -1 : 1; P.gaze = lookAt(head, [crow.x, crow.y - 40]); }
    if (t >= 89.0 && t < 92.3) { P.dir = -1; P.crouch = 0.55; P.gaze = lookAt(head, [crow.x + 40, GR - 50]); P.brow = 0.5; if (i === 1) P.tongue = pk(t, 89.6, 0.6); P.amp *= 0.6; }
    if (i === 0 && t >= 91.42 && t < 92.6) { P.crouch = 0; P.bark = pk(t, 91.42, 0.25); P.nod = t > 92.14 && t < 92.4 ? -0.35 * pk(t, 92.14, 0.26) : 0; }
    if (t >= 92.3) { P.dir = -1; P.gaze = lookAt(head, [crow.x, crow.y - 40]); }
    if (t >= 96.0 && t < 99.08) { P.ears = 0.9; P.tailUp = 0.8; P.wagAmp = 0.5; }
    if (t >= 99.08) { P.dir = -1; P.gaze = [-1, 0]; }
    return P;
  }
  if (t < 122.4) {   // chase: view space, legs from the distance travelled
    const D = DD(t), S12 = t >= 114.2, base = S12 ? [600, 780, 950][i] : [470, 700, 930][i];
    let x = base; if (!S12 && i === 2) x += 100 * pk(t, 107.0, 5.0);
    const P = dogBase(i, x, t); P.y = S12 && i === 1 ? 890 : GR; P.ph = (x - D) / (AN40_DOG_STRIDE * P.s * 1.6); P.amp = 1; P.gallop = 1; P.earStream = 1; P.tongue = 0.9; P.tailUp = 0.7; P.wagAmp = 0.15;
    const c = crowC(t), head = an40DogHead(P); P.gaze = lookAt(head, [c.x, c.y - 40]);
    if (i === 2 && t >= 107.2 && t < 109.0) { P.gaze = [1, -0.2]; P.headTilt = 0.15; }
    if (i === 0 && t >= 110.24 && t < 110.8) { P.y -= 50 * pk(t, 110.24, 0.5); P.sq = 1.08; P.bark = pk(t, 110.4, 0.25); }
    if (t >= 119.06 + (i === 2 ? 0 : i === 1 ? 0.76 : 0.89)) { P.brow = -0.6; if (i === 2) P.headTilt = 0.12; }
    return P;
  }
  // forest
  const xf = DXF[i], P = gaitOf(dogBase(i, xf(t), t), xf, t, i), head = an40DogHead(P);
  if (t < 155) {
    P.dir = -1; const crow = crowF(t), lh = an40LeoHead(leoP(t));
    P.gaze = lookAt(head, [crow.x, crow.y - 50]);
    if (i === 0 && t >= 124.36 && t < 124.9) { P.sq = 0.85 + 0.15 * ramp(t, 124.6, 124.9); P.tip = -0.12 * pk(t, 124.36, 0.5); P.gallop = 0; P.amp = 0; }
    if (t >= 125.28 + st * 0.6 && t < 125.8 + st) { P.sq = 0.82 + 0.18 * ramp(t, 125.4 + st, 125.8 + st); P.eyes = 'x'; }
    if (t >= 126.84 + st) { P.gaze = lookAt(head, lh); P.noBlink = t < 127.4; }
    if (t >= 130.0 && t < 130.7) P.brow = -0.5;
    if (t >= 131.82 + st * 0.5) { P.hackles = bl(t, 131.82 + st * 0.5, 132.3 + st * 0.5, 0, 1); P.brow = 1; P.mouth = 'grit'; P.drop = 10; P.tailUp = 0.9; P.wagAmp = 0; }
    if (t >= 132.65 && t < 133.05) P.crouch = bl(t, 132.65, 132.9, 0, 0.6);
    if (t >= 135.44) { const b = Math.max(pk(t, 135.44 + st, 0.28), pk(t, 135.8 + st, 0.28), pk(t, 136.14 + st, 0.28)); P.bark = b; P.mouth = b > 0.05 ? 'closed' : 'grit'; P.ears = 0.6; }
    if (t >= 136.6 && t < 140.3) { P.bark = pk(t, 137.0 + i * 0.4, 0.3) + pk(t, 138.62 + i * 0.25, 0.3) * 0.8; }
    if (t >= 140.35) { P.hackles = bl(t, 141.6, 142.4, 1, 0); P.gaze = lookAt(head, lh); }
    if (t >= 141.6) { P.bark = i === 2 ? pk(t, 141.75, 0.25) + pk(t, 142.1, 0.25) : 0; P.gaze = [-1, 0]; P.mouth = 'closed'; P.brow = 0; }
    if (t >= 143.4) { P.dir = i === 0 ? 1 : i === 1 ? -1 : -1; P.tailUp = 0.9; P.wagAmp = 0.6; P.tailWag = t * 14 + i; P.mouth = 'smile'; P.drop = -6; P.hackles = 0; if (i === 1) P.x += 6 * Math.sin(t * 20) * (t < 144.1 ? 1 : 0); P.gaze = i === 0 ? [1, 0] : [-1, 0]; }
    return P;
  }
  // S16: trot home across the foreground
  P.dir = 1; P.y = 935; P.s *= 1.08; P.tongue = 0.7; P.tailUp = 0.85; P.wagAmp = 0.5; P.tailWag = t * 10 + i * 2; P.gaze = [1, -0.2];
  if (i === 2 && t >= 158.76 && t < 159.3) { P.headTilt = 0.35 * pk(t, 158.76, 0.54); P.gaze = lookAt(head, [CRX, GR - 60]); P.amp = 0; }
  return P;
}
const dogsOnF = (t) => t >= 123.7 && t < 144.3 || t >= 157.5 && t < 160.7;

// ======================================================================= SHEEP + SHEPHERDS (pasture)
const SHEEP = [[1950, 900, 0.82, 0], [2060, 884, 0.74, 1], [2170, 900, 0.8, 0], [2260, 884, 0.72, 1], [2350, 900, 0.78, 0]];
function sheepP(k, t) { const [x0, y, s, pal] = SHEEP[k], xf = (tt) => x0 + 18 * Math.sin(tt * 0.21 + k * 1.3) + 10 * tt * 0.0;
  const P = { x: xf(t), y, s, pal, dir: k % 2 ? 1 : -1, ...walk(xf, t, { stride: GAIT.sheep * s }), headDown: Math.max(0, Math.sin(t * 0.7 + k * 2.1)), chew: t * 0.4 + k, seed: 60 + k };
  P.amp = cl(P.amp * 3);
  if (k === 0 && t >= 69.82 && t < 71.2) { P.x = x0 - 70 + 70 * E.out(ramp(t, 70.3, 70.8)); P.hop = pk(t, 70.3, 0.45); P.dir = -1; P.headDown = t < 70.3 ? 1 : 0; }
  if (k === 0 && t >= 97.54) { P.headDown = 0; P.gaze = t < 98.4 ? [-1, 0.2] : [0, 0.05]; P.chew = t * 3; P.noBlink = true; }
  return P; }
function shepherdP(k, t) { const x0 = k ? 2420 : 1880, xf = (tt) => x0 + 3 * (tt - 64) + (k ? -60 : 0), P = { x: xf(t), y: k ? 900 : 884, s: 0.8, costume: k ? 'villager' : 'bedouin', hold: 'stick', ...walk(xf, t), seed: 71 + k };
  if (k === 1) { P.pal = { robe: C.blue }; P.age = 0.2; if (t >= 65.68 && t < 66.6) { P.aR = [2.45, 2.85]; P.talk = 0.4; } }
  if (k === 0 && t >= 98.16 && t < 99.5) { P.aR = [2.45, 2.85]; P.mouth = 'open'; P.talk = 0.8; P.amp = 0; }
  return P; }

// ======================================================================= DRAW: forest
function treetops(ctx, t) {
  const tops = [[150, 470, 64], [280, 500, 60], [420, 480, 58]];
  tops.forEach(([x, y, r], k) => an40ShakeTop(ctx, x, y, r, pk(t, 24.4 + (2 - k) * 0.1, 0.7) + 0.6 * pk(t, 9.0, 0.8) * (k === 2 ? 1 : 0)));
  [[400, 470, 56], [260, 500, 44], [110, 480, 34]].forEach(([x, y, r], k) => an40ShakeTop(ctx, x, y, r, pk(t, 141.56 + k * 0.09, 0.35)));
  an40ShakeTop(ctx, 80, 450, 30, pk(t, 162.6, 0.5));
}
function glowEyes(ctx, x, y, s, lid, look = 0) { if (lid >= 0.98) return; for (const ex of [-18, 18]) { ctx.save(); ctx.translate(x + ex * s, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 13, 9 * (1 - lid), 0, 0, 7); ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(look * 5, 0, 2.5, 8 * (1 - lid), 0, 0, 7); ctx.fill(); ctx.restore(); } }
function forestShade(ctx) { const g = ctx.createLinearGradient(300, 0, 480, 0); g.addColorStop(0, 'rgba(13,34,96,0.6)'); g.addColorStop(1, 'rgba(13,34,96,0)'); ctx.fillStyle = g; ctx.fillRect(-300, 300, 880, 602); }
function drawForest(ctx, t, cam) {
  const u = U(t), d = an40Sky(ctx, u, t);
  ctx.drawImage(an40ForestBake(), 0, 0, FW, VH);
  if (d.warm > 0.01 || u > 0.3) { ctx.save(); ctx.globalAlpha = 0.1 * cl((u - 0.25) / 0.17); ctx.fillStyle = '#ff9a2a'; ctx.fillRect(0, 0, FW, VH); ctx.restore(); }
  // the shade patch under the tree (swings with the sun in the montage)
  { const sx = d.sun ? (300 + (d.sun[0] - 60) * 1.45) : 1000, cx = 1000 - (sx - 1000) * 0.25, a = t >= 16.02 && t < 20.4 ? 0.55 : 0.4; ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.ellipse(cx, 906, 270, 22, 0, 0, 7); ctx.fillStyle = dotPat(ctx, NAVY2, 7, 0.36); ctx.fill(); ctx.restore(); }
  an40Branch(ctx, dip(t)); treetops(ctx, t);
  // the leopard
  if (t >= 24.74 && t < 25.4) glowEyes(ctx, 336, 726, 1, t < 24.85 ? 1 - ramp(t, 24.74, 24.85) : pk(t, 25.0, 0.18) > 0.5 ? 1 : 0, 0.5);
  if (leoOn(t) && t < 62) an40Leopard(ctx, leoP(t));
  if (t >= 161.04 && t < 162.9) { const g = t < 161.3 ? 1 - ramp(t, 161.04, 161.3) : t > 162.42 ? (t < 162.55 ? 1 : ramp(t, 162.55, 162.9)) : pk(t, 161.9, 0.16) > 0.5 ? 1 : 0; glowEyes(ctx, 250 - 30 * ramp(t, 162.55, 162.9), 760, 0.6, g, -0.4); }
  forestShade(ctx); an40FrontTrunks(ctx);
  // worms
  if (t >= 13.0 && t < 15.45) { const fx = t < 13.25 ? [lerp(1215, 1170, ramp(t, 13.0, 13.25)), lerp(830, 895, ramp(t, 13.0, 13.25) ** 2)] : [1170, 895]; worm(ctx, fx[0], fx[1], t); }
  if (t >= 12.6 && t < 13.0) { const c = crowF(t); worm(ctx, c.x - 50, c.y - 52, t); }
  if (t >= 22.7 && t < 23.6) { const c = crowF(t), u2 = ramp(t, 22.95, 23.45); worm(ctx, t < 22.95 ? c.x - 52 : lerp(c.x - 52, 1330, u2), t < 22.95 ? c.y - 52 : lerp(GR - 60, 897, u2) - 90 * Math.sin(Math.PI * u2), t); }
  if (catVisible(t)) an40CatLie(ctx, catP(t));
  // bush (shivers while the cat is inside and the leopard looms)
  { const sh = inR(t, 104.6, 107.1) || inR(t, 122.4, 144.66) ? tremble(t, 1.5, 7) : inR(t, 144.6, 145.4) ? tremble(t, 3, 11) : 0; ctx.save(); ctx.translate(sh, 0); bush(ctx, { x: BUSH.x, w: BUSH.w, h: BUSH.h, seed: 7 }); ctx.restore(); }
  if (inR(t, 104.6, 107.1) || inR(t, 122.4, 144.66)) { const look = t < 108 ? Math.sin(t * 7) : t < 128.7 ? 0.4 : t < 140.3 ? 1 : -1, bl2 = (pk(t, 128.95, 0.12) + pk(t, 129.2, 0.12) + (t > 133.1 && t < 133.3 ? 1 : 0)) > 0.5 || inR(t, 106.12, 107.1); peekEyes(ctx, EYESB[0], EYESB[1], look, bl2); }
  if (leoOn(t) && t >= 62 && t < 143) an40Leopard(ctx, leoP(t));
  // the leaf on the cat's head, shaken off
  if (t >= 144.6 && t < 147.2) { const c = catP(t), h = BEAST.world(c, [70, -150]), u2 = ramp(t, 146.18, 147.2); ctx.save(); ctx.translate(h[0] + 90 * u2, h[1] - 60 * Math.sin(Math.PI * u2) + 120 * u2 * u2); ctx.rotate(u2 * 9); shape(ctx, ell(0, 0, 16, 8, 14), GREEN, { lw: 4, seed: 9 }); ctx.restore(); }
  // dogs
  if (dogsOnF(t)) { const order = t >= 157 ? [0, 1, 2] : [2, 1, 0]; for (const i of order) { if (t >= 157.5 && t < 160.7 || t < 155) an40Dog(ctx, dogP(i, t)); } }
  // dust: the brake furrows, the charge, the run-in-place, the dogs' trot
  if (t >= 124.36 && t < 125.4) { for (let k = 0; k < 4; k++) dustBurst(ctx, 2060 + 30 + k * 18, GR - 6, t - 124.36 - k * 0.06, 4, 8, 18, 40, 0.6, k + 3); }
  if (t >= 133.05 && t < 134.2) for (let i = 0; i < 3; i++) { const P = dogP(i, t); dustBurst(ctx, P.x + 90, GR - 6, t - 133.1 - i * 0.05, 5, 8, 18, 60, 0.6, 20 + i); }
  if (t >= 140.02 && t < 140.9) for (let k = 0; k < 4; k++) dustBurst(ctx, 1390 + 120, GR - 8, t - 140.02 - k * 0.09, 4, 8, 20, 50, 0.5, 30 + k);
  if (t >= 36.82 && t < 37.6) dustBurst(ctx, CRX, GR - 6, t - 36.82, 6, 6, 14, 50, 0.6, 5);
  if (t >= 11.18 && t < 11.9) dustBurst(ctx, CRX, GR - 6, t - 11.18, 4, 5, 10, 30, 0.5, 6);
  // the crow
  { const c = crowF(t); if (c.x > -500) bird(ctx, c); }
  // feathers and leaves
  feather(ctx, t, { t0: 36.85, t1: 38.6, a: [CRX, 830], b: [CRX - 30, 896], col: '#2a2a33' });
  for (const [t0, x] of [[6.3, 900], [6.5, 680], [142.5, 360], [142.7, 470]]) feather(ctx, t, { t0, t1: t0 + 2.2, a: [x, 420], b: [x + 40, 896], col: GREEN });
  if (t >= 142.48 && t < 143.4) dustBurst(ctx, 315, 840, t - 142.48, 6, 10, 26, 60, 0.9, 12);
}

// ======================================================================= DRAW: pasture
function drawPasture(ctx, t, cam) {
  if (cam.zoom < 1) { ctx.fillStyle = C.blue; ctx.fillRect(-600, -900, PW + 1200, 920); ctx.fillStyle = dotPat(ctx, SKYDOT, 13, 0.3); ctx.fillRect(-600, -900, PW + 1200, 920); }
  ctx.drawImage(an40PastureBake(), 0, 0, PW, VH);
  if (cam.zoom < 1) { ctx.fillStyle = SAND; ctx.fillRect(-600, 1200, PW + 1200, 800); ctx.fillStyle = dotPat(ctx, C.red, 11, 0.2); ctx.fillRect(-600, 1200, PW + 1200, 800); }
  sun(ctx, 2000, 170, t); cloudFlat(ctx, 700 + t * 6, 200, 0.9);
  // flattened grass where the dogs stood
  if (t >= 80.0) for (const x of FLAT) { ctx.save(); ctx.globalAlpha = 0.85 * ramp(t, 82.0, 84.0); ctx.beginPath(); ctx.ellipse(x, 900, 90, 12, 0, 0, 7); ctx.fillStyle = '#9cd46a'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = GREEND; ctx.stroke(); ctx.restore(); }
  for (const k of [1, 0]) person(ctx, shepherdP(k, t));
  for (const k of [3, 1, 4, 2, 0]) sheep(ctx, sheepP(k, t));
  if (t >= 65.68 && t < 66.9) note(ctx, shepherdP(1, t).x + 30, 640 - 40 * ramp(t, 65.68, 66.9), 0.9, C.black);
  // the dotted hop trail
  const trail = [[L0 + 30, L1, 85.1], [L1, L2, 91.42], [L2, L3, 92.98]];
  ctx.save(); ctx.setLineDash([4, 16]); ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.white;
  trail.forEach(([a, b, t0], k) => { const p = ramp(t, t0, t0 + 0.55); if (p <= 0 || t >= 100.9) return; ctx.globalAlpha = 0.9; ctx.beginPath(); for (let j = 0; j <= 24 * p; j++) { const u2 = j / 24, x = lerp(a, b, u2), y = GR - 30 - (k === 0 ? 150 : k === 1 ? 110 : 130) * Math.sin(Math.PI * u2); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); });
  ctx.restore();
  trail.forEach(([, b, t0], k) => { if (t < t0 + 0.55 || t >= 100.9) return; const x = b + 20, k2 = E.back(ramp(t, t0 + 0.55, t0 + 0.8)); seg(ctx, x, GR, x, GR - 70 * k2, 6, WOOD, 3); shape(ctx, [[x, GR - 70 * k2], [x + 40 * k2, GR - 58 * k2], [x, GR - 46 * k2]], C.red, { lw: 3, seed: k }); });
  // dogs (back to front) and the crow
  const order = [2, 1, 0]; for (const i of order) an40Dog(ctx, dogP(i, t));
  if (t >= 80.4 && t < 81.2) { const P = dogP(0, t); for (let k = 0; k < 3; k++) dustBurst(ctx, P.x - 120 + k * 40, GR - 6, t - 80.45 - k * 0.04, 5, 6, 14, 40, 0.6, 40 + k); }
  if (t >= 99.08 && t < 100.9) for (let i = 0; i < 3; i++) { const P = dogP(i, t); dustBurst(ctx, P.x + 80, GR - 6, ((t - 99.1) % 0.3), 3, 6, 12, 30, 0.3, 50 + i); }
  if (t >= 82.6 && t < 83.4) { for (const i of [1, 2]) { const h = an40DogHead(dogP(i, t)); dizzy(ctx, h[0], h[1] - 50, t + i, 40); } }
  if (t >= 92.14 && t < 92.6) { const h = an40DogHead(dogP(0, t)); dustBurst(ctx, h[0] - 40, h[1] + 10, t - 92.14, 5, 6, 14, 40, 0.45, 77); }
  { const c = crowP(t); if (c.x > -500) bird(ctx, c); }
  feather(ctx, t, { t0: 91.45, t1: 92.1, a: [L1 + 50, 850], b: [an40DogHead(dogP(0, 92.1))[0] - 46, an40DogHead(dogP(0, 92.1))[1] + 4], col: '#2a2a33' });
  if (t >= 92.1 && t < 92.2) feather(ctx, t, { t0: 91.45, t1: 92.1, a: [L1 + 50, 850], b: [an40DogHead(dogP(0, t))[0] - 46, an40DogHead(dogP(0, t))[1] + 4], col: '#2a2a33' });
}

// ======================================================================= DRAW: chase strip (view space)
function drawChase(ctx, t) {
  const D = DD(t), dogsX = [0, 1, 2].map((i) => dogP(i, t).x), cX = crowC(t);
  an40Chase(ctx, D, t, { treeS: lerp(0.22, 0.65, ramp(t, 100.9, 122.4)), treeX: 120 + 40 * ramp(t, 100.9, 122.4),
    flat: (x) => Math.max(...dogsX.map((dx) => cl(1 - Math.abs(x - dx + 40) / 90)), cX.y > 700 ? 0.4 * cl(1 - Math.abs(x - cX.x - 40) / 60) : 0) });
  const order = t >= 114.2 ? [1, 2, 0] : [2, 1, 0]; for (const i of order) { const P = dogP(i, t); an40Dog(ctx, P); const k = ((P.ph % Math.PI) + Math.PI) % Math.PI; if (k < 0.5) dustBurst(ctx, P.x + 70 * P.s, GR - 6, k / 3, 3, 5, 10, 24, 0.25, 9 + i); }
  bird(ctx, cX);
}

// ======================================================================= CAMERA
const CK = [
  [0, 1165, 770, 2.1], [5.6, 1165, 770, 2.1], [7.6, 900, 615, 1.0], [7.7, 900, 615, 1.0], [9.6, 620, 615, 1.0], [10.0, 800, 615, 1.0],
  [11.2, 800, 615, 1.0], [12.4, 1000, 560, 1.12], [12.6, 1000, 560, 1.12], [13.6, 1100, 650, 1.12], [14.4, 1120, 700, 1.3], [17.2, 1160, 770, 2.0], [20.39, 1160, 770, 2.0],
  [20.4, 900, 660, 1.05], [24.06, 900, 660, 1.05], [24.74, 440, 700, 1.5], [27.6, 440, 700, 1.5], [28.6, 790, 615, 1.0],
  [34.3, 790, 615, 1.0], [34.6, 1200, 800, 1.9], [36.8, 1200, 800, 1.9], [39.2, 960, 470, 1.5], [39.4, 960, 470, 1.5], [40.4, 900, 615, 1.0],
  [41.3, 860, 615, 1.0], [41.8, 1080, 780, 1.5], [42.8, 820, 615, 1.0], [46.0, 820, 615, 1.0], [52.8, 840, 650, 1.15], [53.19, 840, 650, 1.15],
  [53.2, 1220, 790, 1.8], [54.9, 1220, 790, 1.8], [56.2, 1100, 600, 1.15], [59.89, 1100, 600, 1.15],
  [59.9, 960, 400, 2.3], [63.9, 990, 400, 2.3], [63.99, 1050, 400, 2.3],
  [64.0, 1850, 615, 0.8], [68.0, 1850, 615, 0.8], [68.4, 1500, 760, 1.5], [71.49, 1500, 760, 1.5],
  [71.5, 1000, 640, 1.0], [73.9, 1000, 640, 1.0], [75.2, 1150, 780, 1.6], [79.9, 1150, 780, 1.6], [80.6, 1050, 760, 1.5], [85.1, 1050, 760, 1.5], [86.6, 800, 760, 1.5], [88.4, 850, 760, 1.5],
  [91.4, 800, 760, 1.5], [93.5, 640, 760, 1.5], [94.64, 640, 760, 1.5], [96.2, 1000, 500, 0.62], [99.0, 1000, 500, 0.62], [100.6, 806, 500, 0.62], [100.89, 806, 500, 0.62],
  [100.9, 560, 615, 1.0], [109.3, 560, 615, 1.0], [110.4, 560, 615, 1.0], [114.19, 560, 615, 1.0],
  [114.2, 700, 790, 1.7], [119.0, 700, 790, 1.7], [119.6, 520, 780, 1.7], [121.2, 520, 780, 1.7], [121.5, 360, 760, 2.1], [122.39, 360, 760, 2.1],
  [122.4, 1700, 615, 1.0], [126.8, 1700, 615, 1.0], [127.2, 1690, 760, 1.4], [133.1, 1690, 760, 1.4], [133.6, 1750, 640, 1.05], [136.59, 1750, 640, 1.05],
  [136.6, 1520, 780, 1.5], [140.0, 1500, 780, 1.5], [141.4, 580, 760, 1.2], [144.29, 580, 760, 1.2],
  [144.3, 1290, 790, 1.6], [149.0, 1260, 790, 1.6], [149.7, 1130, 790, 1.5], [154.3, 1100, 800, 1.9], [155.0, 1100, 800, 1.9], [157.0, 900, 615, 1.0],
  [161.0, 900, 615, 1.0], [161.6, 640, 615, 1.0], [163.0, 640, 615, 1.0], [163.6, 860, 615, 1.0], [DUR, 860, 615, 1.0]];
const CAM = CK.map(([t, x, y, zoom]) => [t, { x, y, zoom }]);
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom, w = setAt(t) === 'F' ? FW : setAt(t) === 'P' ? PW : 1000;
  return { x: cl(c.x, 500 / z, w - 500 / z), y: z >= 1 ? cl(c.y, 615 / z, VH - 615 / z) : c.y, zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

function drawWorld(ctx, t, cam) { const s = setAt(t); if (s === 'F') drawForest(ctx, t, cam); else if (s === 'P') drawPasture(ctx, t, cam); else drawChase(ctx, t); }

// ======================================================================= INSETS (panel space)
function insetForest(ctx, t, cx, cy, r, cam, extra) {   // draws the forest set through its own camera, centred in the circle
  ctx.save(); ctx.translate(cx, cy); ctx.scale(cam.zoom, cam.zoom); ctx.translate(-cam.x, -cam.y); drawForest(ctx, t, cam); if (extra) extra(ctx); ctx.restore(); }
function insets(ctx, t, S) {
  // the crow watching from the branch (64.0 - 71.5); swells to fill the panel as it dives
  if (t >= 64.0 && t < 71.5) { const sw = ramp(t, 71.2, 71.5), r = lerp(110, 820, E.in(sw)), cx = lerp(170, 500, sw), cy = lerp(200, 615, sw);
    an40Inset(ctx, cx, cy, r, ramp(t, 64.0, 64.25), (c) => { insetForest(c, t, cx, cy, r, { x: PERCH[0] + 20, y: PERCH[1] - 50, zoom: 2.4 }); if (t >= 70.72 && t < 71.4) bulb(c, cx + 50, cy - 70, B(t, 70.72, 0.3)); }); }
  // the cat in the bush, the leopard's shadow and paw (104.6 - 107.1)
  if (t >= 104.6 && t < 107.0) { const p = t < 106.7 ? ramp(t, 104.6, 104.85) : 1 - ramp(t, 106.7, 106.95);
    an40Inset(ctx, 830, 230, 130, p, (c) => { insetForest(c, t, 830, 230, 130, { x: 1360, y: 820, zoom: 2.2 }, (k) => { if (t >= 105.6) halftoneShadow(k, 1350, 880, 160 * ramp(t, 105.6, 106.1), 0.55); }); }); }
  // the shepherd pats dog1 (160.0 - 161.5)
  if (t >= 160.0 && t < 161.5) { const p = t < 161.2 ? ramp(t, 160.0, 160.25) : 1 - ramp(t, 161.2, 161.45);
    an40Inset(ctx, 830, 230, 120, p, (c) => { c.save(); c.translate(830, 230); c.scale(0.8, 0.8); c.translate(-1815, -790); c.drawImage(an40PastureBake(), 0, 0, PW, VH);
      for (const k of [3, 1]) sheep(c, { ...sheepP(k, t), x: SHEEP[k][0] - 160 });
      const pat = Math.max(0, Math.sin((t - 160.3) * 10)) * (t > 160.3 ? 1 : 0); person(c, { x: 1780, y: 900, s: 0.8, costume: 'bedouin', hold: 'stick', mouth: 'smile', handL: [-30, -90 + 12 * pat] });
      an40Dog(c, { x: 1855, y: 900, s: 0.85, pal: 0, dir: -1, sit: 1, tailWag: t * 16, wagAmp: 0.7, tailUp: 0.4, mouth: 'smile', tongue: 0.6, lid: 0.6, nod: 0.08 * pat }); c.restore(); }); }
}

// ======================================================================= LETTERING
function overlays(ctx, t, cam, S) {
  const P = (x, y) => toPanel(x, y, cam);
  const lab = (text, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, b - 0.25, b); S.label(ctx, text, cl(x, 160, 840), cl(y, 110, 1120), ramp(t, a, a + 0.4), { size: 44, align: 'center', ...o }); ctx.restore(); };
  const arr = (from, to, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, b - 0.25, b); S.arrow(ctx, from, to, ramp(t, a, a + (o.dur || 0.4)), { color: C.yellow, width: 18, bend: 0.1, ...o }); ctx.restore(); };
  const word = (text, x, y, a, d, size = 88, o = {}) => { if (t < a || t >= a + d) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, a + d - 0.25, a + d); sfx(ctx, text, cl(x, 150, 850), cl(y, 120, 1120), size, ramp(t, a, a + 0.25), { rot: -0.08, ...o }); ctx.restore(); };
  const s = setAt(t);
  if (s === 'F') {
    // S1
    if (t < 3.6) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, 3.3, 3.6); S.title(ctx, 'THE CAT AND THE CROW', 500, 140, B(t, 0.05, 0.6), { size: 60, align: 'center' }); ctx.restore(); }
    if (t < 3.0) { const c = catP(t), h = P(...BEAST.world(c, [20, -170])); lab('CAT', h[0] - 110, h[1] - 80, 0.36, 2.8); arr([h[0] - 90, h[1] - 40], [h[0] - 10, h[1] + 20], 0.36, 2.8, { width: 14 });
      const w2 = crowF(t), q = P(w2.x, w2.y - 120); if (t >= 1.3) { lab('CROW', q[0] + 90, q[1] - 110, 1.3, 2.9); arr([q[0] + 80, q[1] - 70], [q[0] + 10, q[1] - 10], 1.3, 2.9, { width: 14, bend: -0.1 }); } }
    if (t >= 1.95 && t < 3.6) { const c = catP(t), w2 = crowF(t), m = P((c.x + 70 + w2.x) / 2, GR - 150 - 60 * ramp(t, 1.95, 3.6)); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 3.2, 3.6); heart(ctx, m[0], m[1], 30 * E.back(ramp(t, 1.95, 2.25))); ctx.restore(); }
    if (t >= 3.92 && t < 6.2) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, 5.9, 6.2); S.label(ctx, 'DAY', 150, 130, ramp(t, 3.92, 4.2), { size: 40, align: 'center' }); S.counter(ctx, DAYN(t), 150, 240, ramp(t, [3.92, 4.47, 5.02][DAYN(t) - 1], [3.92, 4.47, 5.02][DAYN(t) - 1] + 0.3), { size: 64 }); ctx.restore(); }
    { const tr = P(760, 560); lab('BIG TREE', tr[0] + 150, tr[1] - 60, 6.9, 8.4); arr([tr[0] + 100, tr[1] - 20], [tr[0] + 20, tr[1] + 60], 6.9, 8.4); }
    { const fe = P(430, 420); lab('FOREST EDGE', fe[0] + 60, fe[1] - 60, 9.0, 10.6, { fill: C.yellow }); }
    // S2
    { const wp = P(1170, 890); lab('FOOD!', wp[0] - 40, wp[1] - 190, 13.6, 14.7); arr([wp[0] - 40, wp[1] - 140], [wp[0], wp[1] - 20], 13.6, 14.7, { width: 14 }); }
    { const sp = P(980, 910); lab('SHADE', sp[0] - 60, sp[1] + 70, 16.02, 17.3, { fill: C.yellow }); }
    if ((t >= 15.9 && t < 16.85) || (t >= 20.9 && t < 36.1)) { const c = catP(t), h = P(...BEAST.world(c, [90, -120])); zzz(ctx, h[0] + 20, h[1] - 30, t); }
    if (t >= 18.72 && t < 19.9) { const w2 = crowF(t), q = P(w2.x - 40, w2.y - 110); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 19.6, 19.9); soundArcs(ctx, q[0], q[1], -1, t, C.white); ctx.restore(); }
    // S3
    { const L = leoP(t), h = P(...an40LeoHead(L)); if (t >= 25.4 && t < 27.4) { lab('LEOPARD', h[0] + 40, h[1] - 170, 25.4, 27.4); arr([h[0] + 30, h[1] - 120], [h[0] + 5, h[1] - 50], 25.4, 27.4, { width: 14 }); }
      if (t >= 25.84 && t < 26.5) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 7; ctx.lineCap = 'round'; const k = ramp(t, 25.84, 26.0); for (const a of [-0.6, -0.15, 0.3]) { ctx.beginPath(); ctx.moveTo(h[0] + 60 + Math.cos(a) * 40, h[1] + Math.sin(a) * 40); ctx.lineTo(h[0] + 60 + Math.cos(a) * (40 + 40 * k), h[1] + Math.sin(a) * (40 + 40 * k)); ctx.stroke(); } ctx.restore(); }
      // S4: the eye line to the sleeping cat
      if (t >= 32.26 && t < 34.3) { const c = catP(t), ch = P(...BEAST.world(c, [40, -90])), k = ramp(t, 32.26, 32.96); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 34.0, 34.3); ctx.setLineDash([6, 18]); ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(h[0] + 10, h[1]); ctx.lineTo(lerp(h[0] + 10, ch[0], k), lerp(h[1], ch[1], k)); ctx.stroke(); ctx.restore();
        if (k >= 1) arr([lerp(h[0], ch[0], 0.85), lerp(h[1], ch[1], 0.85)], ch, 32.96, 34.3, { color: C.red, width: 14, bend: 0, dur: 0.2 });
        if (t >= 33.22 && t < 34.1) { ctx.save(); ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 30); lab('LUNCH?', ch[0] + 20, ch[1] - 150, 33.22, 34.1, { size: 36 }); ctx.restore(); } } }
    if (t >= 36.1 && t < 36.9) { const w2 = crowF(t), q = P(w2.x, w2.y - 80); word('CAW!', q[0] - 140, q[1] - 120, 36.1, 0.8, 80); }
    if (t >= 37.3 && t < 38.6) { const w2 = crowF(t), q = P(w2.x, w2.y - 40); ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(q[0] + 30 + k * 10, q[1] + 40 + k * 26); ctx.lineTo(q[0] + 90 + k * 10, q[1] + 120 + k * 26); ctx.stroke(); } ctx.restore(); }
    { const q = P(PERCH[0], PERCH[1]); lab('HIGH BRANCH', q[0] + 30, q[1] - 170, 39.16, 40.9); arr([q[0] - 150, q[1] + 40], [q[0] - 150, q[1] - 90], 39.3, 40.9, { width: 16, bend: 0 }); }
    // S5: no way out
    const cpt = P(CX0, 830), lpt = P(LX(t) + 234, 830);
    const path = (a, b, t0, t1) => { if (t < t0 || t >= t1) return; const k = ramp(t, t0, t0 + 0.6); ctx.save(); ctx.globalAlpha = 1 - ramp(t, t1 - 0.3, t1); ctx.setLineDash([5, 16]); ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore(); };
    const xmark = (x, y, t0, t1) => { if (t < t0 || t >= t1) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, t1 - 0.3, t1); const k = E.back(ramp(t, t0, t0 + 0.25)); ctx.translate(x, y); ctx.scale(k, k); for (const sg of [1, -1]) seg(ctx, -34, -34 * sg, 34, 34 * sg, 18, C.red, 4); ctx.restore(); };
    path([cpt[0] + 60, cpt[1] + 20], [1000, cpt[1] + 20], 42.78, 46.0);
    path([cpt[0] - 70, cpt[1] + 20], [lpt[0] + 10, lpt[1] + 20], 43.5, 46.0);
    xmark((cpt[0] - 70 + lpt[0]) / 2, cpt[1] + 20, 44.2, 46.0); xmark(lerp(cpt[0] + 60, 1000, 0.6), cpt[1] + 20, 44.9, 46.0);
    const bar = (x0, x1, y, col, t0, d, text, t1) => { if (t < t0 || t >= t1) return; const k = E.out(ramp(t, t0, t0 + d)); ctx.save(); ctx.globalAlpha = 1 - ramp(t, t1 - 0.3, t1); shape(ctx, [[x0, y - 12], [lerp(x0, x1, k), y - 12], [lerp(x0, x1, k), y + 12], [x0, y + 12]], col, { lw: 5, seed: 3 }); if (k > 0.95) S.label(ctx, text, (x0 + x1) / 2, y + 62, ramp(t, t0 + d, t0 + d + 0.3), { size: 34, align: 'center' }); ctx.restore(); };
    { const tl = P(700, 0)[0], trr = P(820, 0)[0], gy = P(0, 925)[1]; bar(lpt[0] - 10, tl, gy, C.yellow, 46.98, 0.35, '2 STEPS', 49.9); bar(P(CXF(t) - 95, 0)[0], trr, gy + 120, C.red, 47.46, 1.05, '6 STEPS', 50.3); }
    if (t >= 48.96 && t < 50.4) { const a = P(760, 880), b = P(760, 330); ctx.save(); ctx.globalAlpha = (1 - ramp(t, 50.1, 50.4)) * (0.6 + 0.4 * Math.sin(t * 20)); ctx.lineWidth = 10; ctx.strokeStyle = C.yellow; ctx.strokeRect(a[0] - 70 * cam.zoom, b[1], 140 * cam.zoom, a[1] - b[1]); ctx.restore(); arr([a[0] + 110, a[1] - 40], [a[0] + 110, b[1] + 20], 49.1, 50.4, { width: 18, bend: 0 }); }
    if (t >= 50.4 && t < 53.4) { const c = catP(t), hh = P(...BEAST.world(c, [72, -120])), pp = t < 53.0 ? 1 : 1 - ramp(t, 53.0, 53.25);
      thoughtCloud(ctx, 600, 300, 520, 330, t, { p: Math.min(ramp(t, 50.4, 51.0), pp), tail: [hh[0] - 10, hh[1] - 40], bg: C.yellow, scale: 0.62, at: [640, 790], inside: (k, tt) => {
        ground(k, { w: 1400 }); tree(k, 590, 900, { w: 100, top: 420, crowns: [[640, 380, 120]] });
        const cx2 = tt < 51.74 ? lerp(1020, 770, ramp(tt, 50.7, 51.74)) : lerp(770, 840, ramp(tt, 51.74, 52.2)), lx2 = lerp(200, 400, E.out(ramp(tt, 50.8, 51.74)));
        cat(k, { x: cx2, y: 900, s: 1.1, pal: 1, dir: -1, ph: cx2 / (GAIT.cat * 1.1), amp: tt < 52.2 ? 1 : 0, eyes: 'wide', ears: -0.6, tip: tt > 51.74 && tt < 52.3 ? -0.15 : 0 });
        an40Leopard(k, { x: lx2, y: 900, s: 0.9, dir: 1, ph: lx2 / (AN40_LEO_STRIDE * 0.9), amp: tt < 51.74 ? 1 : 0, raise: tt > 51.74 ? 1 : 0, brow: 0.8, mouth: 'smile' });
        if (tt >= 51.74 && tt < 52.5) dustBurst(k, cx2 + 60, 892, tt - 51.74, 5, 10, 20, 50, 0.6, 8); } });
      xmark(600, 300, 52.78, 53.3); }
    // S6: the call
    if (t >= 55.62 && t < 56.8) { const c = catP(t), hh = P(...BEAST.world(c, [72, -150])); word('MEOW!', hh[0] - 40, hh[1] - 150, 55.62, 1.1, 80, { rot: 0.1 }); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 56.5, 56.8); soundArcs(ctx, hh[0] - 30, hh[1] - 40, -1, t, C.white); ctx.restore(); }
    if (t >= 57.8 && t < 59.9) { const c = catP(t); teardrops(ctx, t, 57.8, 58.6, () => BEAST.world(c, [80, -112]), { groundY: 896, rate: 2 }); }
    if (t >= 58.54 && t < 59.9) { const c = catP(t), hh = P(...BEAST.world(c, [40, -160])); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 59.6, 59.9); bubble(ctx, hh[0] + 150, hh[1] - 170, 190, 110, hh[0] + 40, hh[1] - 60, ramp(t, 58.54, 58.8), 'HELP!', { size: 56, spiky: true }); ctx.restore(); }
    // S7 close: thinking ticks, the whip
    if (t >= 62.02 && t < 62.72) { const q = P(PERCH[0] + 20, PERCH[1] - 120); ctx.save(); ctx.translate(q[0] + 110, q[1] - 30); ctx.rotate(t * (8 + 14 * ramp(t, 62.02, 62.72))); for (let k = 0; k < 3; k++) { ctx.rotate(Math.PI * 2 / 3); seg(ctx, 40, 0, 64, 0, 8, C.yellow, 3); } ctx.restore(); }
    if (t >= 62.72 && t < 63.3) { const q = P(PERCH[0] + 30, PERCH[1] - 90); word('!', q[0] + 120, q[1] - 90, 62.72, 0.6, 110); }
    // S13
    if (t >= 127.42 && t < 128.9) { const h = P(...an40LeoHead(leoP(t))); lab('LEOPARD!', h[0] + 30, h[1] - 170, 127.42, 128.9); arr([h[0] + 20, h[1] - 120], [h[0] + 5, h[1] - 50], 127.42, 128.9, { width: 14 }); }
    { const e = P(EYESB[0], EYESB[1]); lab('THE CAT', e[0] - 40, e[1] + 150, 128.7, 130.2, { size: 38 }); arr([e[0] - 40, e[1] + 110], [e[0] - 10, e[1] + 30], 128.7, 130.2, { width: 14 }); }
    if (t >= 129.95 && t < 130.9) for (let i = 0; i < 3; i++) { const h = P(...an40DogHead(dogP(i, t))), popT = 130.4 + i * 0.1, k = t < popT ? E.back(ramp(t, 129.95 + i * 0.05, 130.2 + i * 0.05)) : 0;
      if (k > 0) { ctx.save(); ctx.translate(h[0], h[1] - 120); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 46, 0, 7); ctx.fillStyle = 'rgba(255,250,240,0.85)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke(); bird(ctx, { x: -6, y: 20, s: 0.4, kind: 'crow', dir: -1, silhouette: true }); ctx.restore(); }
      else if (t < popT + 0.3) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, popT, popT + 0.3); for (let k2 = 0; k2 < 8; k2++) { const a = k2 * Math.PI / 4; seg(ctx, h[0] + Math.cos(a) * 40, h[1] - 120 + Math.sin(a) * 40, h[0] + Math.cos(a) * 64, h[1] - 120 + Math.sin(a) * 64, 6, C.white, 3); } ctx.restore(); } }
    if (t >= 130.4 && t < 131.3) { const h = P(...an40DogHead(dogP(1, t))); word('POP!', h[0] + 10, h[1] - 230, 130.4, 0.9, 64); }
    if (t >= 135.44 && t < 136.9) for (let i = 0; i < 3; i++) { const h = P(...an40DogHead(dogP(i, t))), t0 = 135.44 + i * 0.34; word('WOOF!', h[0] - 60 + i * 20, h[1] - 140 - i * 70, t0, 136.9 - t0, 64 + i * 6, { rot: -0.12 + i * 0.08 }); if (t >= t0) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, 136.5, 136.9); soundArcs(ctx, h[0] - 70, h[1], -1, t + i * 0.3, C.white); ctx.restore(); } }
    // S14
    if (t >= 137.82 && t < 138.9) { const h = P(...an40LeoHead(leoP(t))); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 138.6, 138.9); drops(ctx, h[0] - 60, h[1] - 50, t, 1, '#9cc4ff'); ctx.restore(); }
    if (t >= 138.62 && t < 140.1) { for (let i = 0; i < 3; i++) { const h = P(...an40DogHead(dogP(i, t))), t0 = 138.62 + i * 0.22; if (t >= t0) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, 139.8, 140.1); S.counter(ctx, i + 1, h[0], h[1] - 130, ramp(t, t0, t0 + 0.25), { size: 50 }); ctx.restore(); } }
      const h = P(...an40DogHead(dogP(1, t))); lab('DOGS', h[0] + 10, h[1] - 230, 139.0, 140.1, { size: 36 }); }
    if (t >= 139.3 && t < 140.4) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, 140.1, 140.4); const tip = 0.18 * E.out(ramp(t, 139.5, 139.9)); ctx.translate(820, 150); ctx.rotate(-tip); S.box(ctx, -150, -46, 300, 92, ramp(t, 139.3, 139.5), { fill: C.white, lw: 8, seed: 5 }); ctx.font = K.font(60, 'Bangers', 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('3', -90, 4); ctx.fillStyle = C.black; ctx.fillText('V', 0, 4); ctx.fillStyle = C.blue; ctx.fillText('1', 90, 4); ctx.restore(); }
    { const q = P(315, 760); word('ZIP!', q[0] + 40, q[1] - 140, 142.48, 1.0, 84); }
    // S15
    if (t >= 147.96 && t < 148.9) { const c = catP(t), hh = P(...BEAST.world(c, [110, -100])); ctx.save(); ctx.globalAlpha = 0.9 * pk(t, 147.96, 0.9); shape(ctx, ell(hh[0] - 40 - 40 * ramp(t, 147.96, 148.9), hh[1] - 10, 22 + 14 * ramp(t, 147.96, 148.9), 14, 16), C.white, { lw: 4, seed: 4 }); ctx.restore(); }
    if (t >= 151.4 && t < 153.2) { const c = catP(t), w2 = crowF(t), m = P((BEAST.world(c, [72, 0])[0] + w2.x) / 2 + 10, GR - 170 - 70 * ramp(t, 151.4, 153.2)); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 152.9, 153.2); heart(ctx, m[0], m[1], 32 * E.back(ramp(t, 151.4, 151.7))); ctx.restore(); }
    if (t >= 153.4 && t < 154.7) { const c = catP(t), hh = P(...BEAST.world(c, [72, -150])), pp = t < 154.34 ? ramp(t, 153.4, 153.9) : 1 - ramp(t, 154.34, 154.65);
      thoughtCloud(ctx, 640, 330, 400, 280, t, { p: pp, tail: [hh[0], hh[1] - 20], bg: C.blue, scale: 0.55, at: [930, 520], inside: (k, tt) => { k.drawImage(an40ForestBake(), 0, 0, FW, VH); an40Branch(k, 0);
        const u2 = ramp(tt, 153.9, 154.3), p2 = qb(PERCH, [1100, 360], [1300, 760], u2); bird(k, { x: p2[0], y: p2[1], s: 0.95, kind: 'crow', dir: 1, fly: u2 > 0, flap: Math.sin(tt * 24), gaze: [0.4, 1] }); } }); }
    // S16
    if (t >= 161.98 && t < 162.6) { const w2 = crowF(t), q = P(w2.x - 40, w2.y - 90); word('CAW!', q[0] - 150, q[1] - 100, 161.98, 0.62, 72); }
    { const q = P(250, 760); lab('FAR AWAY', q[0] + 140, q[1] - 170, 162.42, 163.7); arr([q[0] + 110, q[1] - 120], [q[0] + 10, q[1] - 20], 162.42, 163.7, { width: 14 }); }
  }
  if (s === 'P') {
    { const q = P(shepherdP(0, t).x, 700); lab('SHEPHERDS', q[0], q[1] - 180, 64.9, 66.5); }
    { const q = P(2000, 760); lab('SHEEP', q[0], q[1] - 160, 66.58, 68.0); }
    { const q = P(1520, 760); lab('GUARD DOGS', q[0], q[1] - 220, 68.4, 69.9); }
    if (t >= 69.0 && t < 69.6) { const h = P(...an40DogHead(dogP(0, t))); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 69.4, 69.6); S.emphasis(ctx, h[0] - 40, h[1] + 10, 90, B(t, 69.0, 0.3), {}); ctx.restore(); }
    if (t >= 73.9 && t < 74.4) { const c = crowP(t), q = P(c.x, c.y - 40); ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(q[0] - 40 - k * 16, q[1] - 40 - k * 6); ctx.lineTo(q[0] - 90 - k * 16, q[1] - 140 - k * 6); ctx.stroke(); } ctx.restore(); }
    if (t >= 76.76 && t < 78.4) { const c = crowP(t), q = P(c.x, c.y - 60); for (const [t0, sd] of [[76.76, -1], [77.4, 1], [77.9, -1]]) word('FLAP!', q[0] + sd * 170, q[1] - 90 - (sd > 0 ? 40 : 0), t0, Math.min(0.8, 78.4 - t0), 60, { rot: sd * 0.1 }); }
    { const h = P(...an40DogHead(dogP(1, Math.min(t, 82.0)))); word('SNAP!', h[0] - 60, h[1] - 170, 81.82, 0.9, 80); }
    if (t >= 85.1 && t < 100.9) { const n = t < 91.42 ? 1 : t < 92.98 ? 2 : 3, t0 = [85.1, 91.42, 92.98][n - 1]; ctx.save(); ctx.globalAlpha = 1 - ramp(t, 99.0, 99.4); S.label(ctx, 'HOP', 150, 140, ramp(t, 85.1, 85.4), { size: 40, align: 'center' }); S.counter(ctx, n, 150, 250, ramp(t, t0, t0 + 0.3), { size: 64 }); ctx.restore(); }
    { const q = P((L0 + L1) / 2, GR - 200); lab('NOT FAR', q[0], q[1] - 60, 85.78, 87.2, { size: 38 }); }
    if (t >= 94.64 && t < 96.8) { arr(P(L0 + 40, GR + 60), P(L3 - 60, GR + 60), 94.64, 96.8, { color: C.yellow, width: 22, bend: 0, dur: 1.0 }); }
    { const q = P(1520, 860); lab('NO GUARDS', q[0], q[1] - 260, 97.54, 98.9, { fill: C.yellow }); }
    { const h = P(shepherdP(0, t).x, 680); word('HEY!', h[0] - 20, h[1] - 120, 98.16, 1.0, 62); }
  }
  if (s === 'C') {
    { const q = P(120 + 40 * ramp(t, 100.9, 122.4), 700); lab('THE TREE', q[0] + 120, q[1] - 200, 103.88, 105.3, { size: 40 }); arr([q[0] + 90, q[1] - 160], [q[0] + 10, q[1] - 60], 103.88, 105.3, { width: 14 }); }
    if (t >= 109.54 && t < 110.9) { const c = crowC(t), q = P(c.x, c.y), top = P(300, 560); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 110.6, 110.9); ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.setLineDash([6, 12]); ctx.beginPath(); ctx.moveTo(q[0] - 110, top[1] - 40); ctx.lineTo(q[0] - 110, q[1] - 40); ctx.stroke(); ctx.restore(); arr([q[0] - 110, top[1] - 40], [q[0] - 110, q[1] - 30], 109.54, 110.9, { width: 16, bend: 0 }); lab('LOW', q[0] - 200, (top[1] + q[1]) / 2 - 40, 109.6, 110.9, { size: 40 }); }
    if (t >= 110.3 && t < 110.9) { const h = P(...an40DogHead(dogP(0, t))); word('SNAP!', h[0] - 20, h[1] - 140, 110.3, 0.6, 58); }
    if (t >= 111.96 && t < 113.5) { const c = crowC(t), q = P(c.x + 20, c.y - 40); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 113.2, 113.5); ctx.setLineDash([4, 14]); ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.red;
      for (let i = 0; i < 3; i++) { const h = P(...an40DogHead(dogP(i, t))), k = ramp(t, 111.96 + i * 0.1, 112.5 + i * 0.1); ctx.beginPath(); ctx.moveTo(h[0] - 20, h[1] - 10); ctx.lineTo(lerp(h[0] - 20, q[0], k), lerp(h[1] - 10, q[1], k)); ctx.stroke(); } ctx.restore(); }
    if (t >= 117.5 && t < 118.2) { ctx.save(); ctx.globalAlpha = pk(t, 117.5, 0.7); ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.lineCap = 'round'; const r = K.rng(5); for (let k = 0; k < 9; k++) { const y = 160 + r() * 800, x = r() * 700 + ((t * 2400) % 300); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 180, y); ctx.stroke(); } ctx.restore(); }
    for (const [i, t0] of [[2, 119.06], [1, 119.82], [0, 119.95]]) if (t >= t0 && t < 122.4) { const h = P(...an40DogHead(dogP(i, t))); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 122.1, 122.4); sfx(ctx, '?', h[0] - 10, h[1] - 110 - (i === 1 ? 20 : 0), 80, ramp(t, t0, t0 + 0.25), { rot: 0.1 }); ctx.restore(); }
  }
  // the ONE DAY... card over the pause
  if (t >= 19.9 && t < 20.9) S.transition(ctx, 1000, 1230, (t - 19.9) / 1.0, { caption: 'ONE DAY...' });
  // whips between sets
  for (const [a, b] of [[63.85, 64.15], [100.8, 101.0], [122.3, 122.5]]) if (t >= a && t < b) { const k = pk(t, a, b - a); ctx.save(); ctx.globalAlpha = 0.85 * k; ctx.fillStyle = C.white; const r = K.rng(Math.round(a)); for (let i = 0; i < 26; i++) { const y = r() * 1230, w = 200 + r() * 500; ctx.fillRect(r() * 1000 - w / 2, y, w, 6 + r() * 10); } ctx.restore(); }
  if (t >= 164.3) S.title(ctx, 'THE END', 500, 190, B(t, 164.3, 0.8), { size: 84, align: 'center' });
}

// ======================================================================= SCENE
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const bark = t >= 135.4 && t < 136.5 ? 3 * Math.sin(t * 80) * Math.max(pk(t, 135.44, 0.2), pk(t, 135.8, 0.2), pk(t, 136.14, 0.2)) : 0, gal = t >= 114.2 && t < 122.4 ? 2 * Math.sin(DD(t) / 40) : 0;
    const sh = bark + gal + (t >= 80.5 && t < 80.8 ? 3 * Math.sin(t * 90) : 0);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / VH);
    const cam = camAt(t); ctx.save(); K.camera(ctx, 1000, VH, cam); drawWorld(ctx, t, cam); ctx.restore(); insets(ctx, t, S); overlays(ctx, t, cam, S);
    ctx.restore(); LIFE.t = null; subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);
  },
  score(k, S) {   // the plan's effect cues, all inside narration pauses (master 0.6 at render)
    k.play('pop', 3.4, { pitch: 1.3, gain: 0.35 });
    k.play('pop', 13.6, { pitch: 1.5, gain: 0.35 });
    k.play('whoosh', 20.3, { dur: 0.35, gain: 0.3 });
    k.play('paper', 24.4, { gain: 0.25 });
    k.play('thud', 28.6, { gain: 0.35 });
    k.play('thud', 40.6, { gain: 0.4 });
    k.play('thud', 46.1, { gain: 0.45 });
    k.play('whoosh', 122.3, { dur: 0.3, gain: 0.3 });
    k.play('chime', 144.3, { note: 'E6', gain: 0.35 });
    k.play('pop', 149.4, { pitch: 1.2, gain: 0.3 });
    k.play('chime', 164.5, { note: 'C6', gain: 0.55 });
  },
};
window.SCENE = SCENE;
})();
