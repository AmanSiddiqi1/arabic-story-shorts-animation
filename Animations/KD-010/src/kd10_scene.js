// ===== KD-010 The Louse and the Flea: staging, acting, camera, timing and sound (plan: planning/creative_plan.json, 16 scenes).
// Three worlds, each 1000 x 1230: ROOM (bedchamber, floor y 900), BED (macro on the bedding, blanket y 900), FLOOR (macro on the tiles,
// crack x 620..700). All times are seconds on the final MP3 (word starts from timing.json). Every frame is a pure function of t.
const KD10_DUR = 169.84;
const KD10_Z = (t, a, d) => K.clamp((t - a) / d);
const KD10_IN = (t, a, b) => t >= a && t < b;
const KD10_kf = (t, keys, e = 'inOut') => kfn(t, keys, e);
// gaze from a world point to a world point, expressed for a figure facing dir
const KD10_gz = (from, to, dir = 1) => { const g = lookAt(from, to); return [g[0] * dir, g[1]]; };
const KD10_CAMG = [0, 0.1];   // looking into the lens
const KD10_FG = 945;
const KD10_MS = 1.6;            // v2: SLEEP meter scale (was 1.3)
const KD10_CHOMP = [300, 330];   // v2: CHOMP! below the meter, clear of the giant's eyelid          // v2: floor-macro ground line (the flea stands on the tile plane, the crack lies at y 928..979)
// which world is on screen
function kd10World(t) {
  if (t < 13.7) return 'room'; if (t < 20.2) return 'bed'; if (t < 26.9) return 'room'; if (t < 92.06) return 'bed'; if (t < 116.74) return 'room';
  if (t < 120.9) return 'bed'; if (t < 125.04) return 'floor'; if (t < 138.14) return 'bed'; if (t < 147.44) return 'room'; if (t < 154.4) return 'floor';
  if (t < 157.2) return 'bed'; if (t < 159.94) return 'floor'; return 'room';
}
// ---------- camera tables (absolute times; a key pair 0.01 apart is a cut) ----------
const KD10_CAM = {
  room: [[0, { x: 500, y: 640, zoom: 1.0 }], [0.5, { x: 500, y: 640, zoom: 1.0 }], [1.9, { x: 600, y: 700, zoom: 1.45 }], [2.9, { x: 600, y: 700, zoom: 1.45 }], [3.4, { x: 560, y: 640, zoom: 1.15 }],
    [13.7, { x: 560, y: 640, zoom: 1.15 }], [20.2, { x: 420, y: 520, zoom: 1.5 }], [23.0, { x: 430, y: 560, zoom: 1.5 }], [25.96, { x: 440, y: 580, zoom: 1.5 }], [26.9, { x: 560, y: 680, zoom: 1.6 }],
    [92.06, { x: 740, y: 700, zoom: 2.2 }], [97.3, { x: 740, y: 700, zoom: 2.2 }], [98.4, { x: 600, y: 620, zoom: 1.3 }], [100.3, { x: 600, y: 620, zoom: 1.3 }], [100.8, { x: 560, y: 600, zoom: 1.5 }],
    [103.84, { x: 560, y: 600, zoom: 1.5 }], [103.85, { x: 400, y: 640, zoom: 1.25 }], [107.9, { x: 400, y: 640, zoom: 1.25 }], [108.9, { x: 520, y: 640, zoom: 1.15 }], [114.3, { x: 520, y: 640, zoom: 1.15 }], [115.0, { x: 600, y: 700, zoom: 1.45 }],
    [116.74, { x: 600, y: 700, zoom: 1.45 }], [138.14, { x: 515, y: 600, zoom: 1.2 }], [140.4, { x: 515, y: 600, zoom: 1.2 }], [140.9, { x: 480, y: 760, zoom: 1.45 }],
    [143.0, { x: 480, y: 760, zoom: 1.45 }], [144.2, { x: 520, y: 640, zoom: 1.1 }], [147.44, { x: 520, y: 640, zoom: 1.1 }],
    [159.94, { x: 400, y: 560, zoom: 1.5 }], [162.72, { x: 400, y: 560, zoom: 1.5 }], [164.7, { x: 500, y: 640, zoom: 1.0 }]],
  bed: [[13.7, { x: 260, y: 800, zoom: 1.6 }], [14.05, { x: 330, y: 790, zoom: 1.35 }], [17.4, { x: 450, y: 790, zoom: 1.35 }], [19.0, { x: 450, y: 790, zoom: 1.35 }], [20.2, { x: 500, y: 690, zoom: 1.05 }],
    [26.9, { x: 330, y: 760, zoom: 1.3 }], [29.3, { x: 330, y: 760, zoom: 1.3 }], [29.31, { x: 300, y: 790, zoom: 1.9 }], [32.6, { x: 300, y: 790, zoom: 1.9 }], [36.0, { x: 300, y: 800, zoom: 2.05 }], [38.38, { x: 300, y: 800, zoom: 2.05 }], [39.5, { x: 480, y: 640, zoom: 1.15 }],
    [40.02, { x: 480, y: 640, zoom: 1.15 }], [40.64, { x: 240, y: 800, zoom: 2.2 }], [41.2, { x: 320, y: 780, zoom: 1.7 }], [47.36, { x: 320, y: 780, zoom: 1.7 }], [48.6, { x: 470, y: 640, zoom: 1.2 }],
    [53.0, { x: 470, y: 640, zoom: 1.2 }], [53.8, { x: 320, y: 770, zoom: 1.6 }], [62.02, { x: 320, y: 770, zoom: 1.6 }], [62.6, { x: 380, y: 780, zoom: 1.9 }], [68.0, { x: 380, y: 780, zoom: 1.9 }],
    [69.0, { x: 440, y: 770, zoom: 1.7 }], [70.4, { x: 440, y: 770, zoom: 1.7 }], [71.9, { x: 440, y: 780, zoom: 2.0 }], [74.5, { x: 440, y: 780, zoom: 2.0 }], [75.1, { x: 560, y: 700, zoom: 1.3 }],
    [76.3, { x: 560, y: 700, zoom: 1.3 }], [77.0, { x: 520, y: 740, zoom: 1.7 }], [79.6, { x: 520, y: 740, zoom: 1.7 }], [80.4, { x: 210, y: 830, zoom: 2.4 }], [84.34, { x: 210, y: 830, zoom: 2.4 }],
    [84.35, { x: 600, y: 560, zoom: 1.15 }], [86.0, { x: 600, y: 560, zoom: 1.15 }], [86.6, { x: 470, y: 780, zoom: 1.7 }], [87.12, { x: 470, y: 780, zoom: 1.7 }], [88.8, { x: 720, y: 600, zoom: 1.9 }],
    [90.0, { x: 720, y: 600, zoom: 1.9 }], [90.2, { x: 700, y: 560, zoom: 2.4 }], [92.06, { x: 700, y: 560, zoom: 2.4 }],
    [116.74, { x: 600, y: 760, zoom: 1.6 }], [119.9, { x: 600, y: 760, zoom: 1.6 }], [120.9, { x: 590, y: 1000, zoom: 1.6 }],
    [125.04, { x: 230, y: 820, zoom: 2.0 }], [130.78, { x: 230, y: 820, zoom: 2.0 }], [131.4, { x: 210, y: 840, zoom: 2.6 }], [133.72, { x: 210, y: 840, zoom: 2.6 }], [134.5, { x: 320, y: 640, zoom: 1.3 }],
    [135.34, { x: 320, y: 640, zoom: 1.3 }], [135.6, { x: 220, y: 820, zoom: 2.4 }], [136.3, { x: 220, y: 820, zoom: 2.4 }], [136.31, { x: 240, y: 760, zoom: 1.8 }], [138.14, { x: 240, y: 740, zoom: 1.8 }],
    [154.4, { x: 280, y: 830, zoom: 2.0 }], [157.2, { x: 280, y: 830, zoom: 2.08 }]],
  floor: [[120.9, { x: 420, y: 560, zoom: 1.4 }], [121.94, { x: 470, y: 780, zoom: 1.5 }], [123.3, { x: 560, y: 800, zoom: 1.5 }], [123.8, { x: 660, y: 900, zoom: 2.6 }], [125.04, { x: 660, y: 900, zoom: 2.6 }],
    [147.44, { x: 660, y: 890, zoom: 2.4 }], [149.0, { x: 660, y: 890, zoom: 2.4 }], [149.9, { x: 720, y: 860, zoom: 2.0 }], [150.8, { x: 660, y: 780, zoom: 1.4 }], [152.9, { x: 660, y: 780, zoom: 1.4 }], [154.2, { x: 520, y: 460, zoom: 1.2 }],
    [157.2, { x: 600, y: 820, zoom: 1.5 }], [159.94, { x: 600, y: 820, zoom: 1.5 }]],
};
function kd10CamAt(world, t) { const c = { ...K.camAt(KD10_CAM[world], t) }, z = c.zoom; if (world === 'bed') c.y -= 60; return { x: K.clamp(c.x, 500 / z, 1000 - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const kd10ToPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ======================================================================
// SLEEP meter value and visibility
function kd10MeterV(t) {
  if (t < 57.06) return 3; if (t < 57.9) return t < 57.56 ? K.lerp(3, 9, K.ease.out(KD10_Z(t, 57.06, 0.5))) : 9; if (t < 58.3) return K.lerp(9, 3, KD10_Z(t, 57.9, 0.4));
  if (t < 64) return 3; if (t < 68) return K.lerp(3, 4, KD10_Z(t, 64, 0.6)); if (t < 75.5) return K.lerp(4, 5, KD10_Z(t, 70.4, 0.9));
  if (t < 83.45) return t < 75.7 ? K.lerp(5, 3, KD10_Z(t, 75.5, 0.2)) : 3; if (t < 83.95) return 4; if (t < 84.4) return 5; if (t < 95.8) return K.lerp(5, 7, K.ease.inOut(KD10_Z(t, 84.4, 0.9)));
  if (t < 145.34) return K.lerp(7, 0, KD10_Z(t, 95.8, 0.12)); return K.lerp(0, 10, K.ease.inOut(KD10_Z(t, 145.34, 1.2)));
}

// ======================================================================
// LOUSE (bed world). Returns insect fields + depth (0 out .. 1 deep in the dark nook) + extras
function kd10Louse(t) {
  const P = { kind: 'louse', x: 190, y: 900, s: 0.85, dir: 1, depth: 1, ant: 0.3, mouth: 'closed', seed: 3 };
  const head = () => [P.x + 50 * P.s * P.dir, P.y - 58 * P.s];
  // S1 in the lens
  if (t < 13.7) {
    P.depth = 1; P.gaze = [0.6, 0.2];
    if (t >= 1.1) { const u = K.ease.inOut(KD10_Z(t, 1.4, 0.8)); P.x = K.lerp(180, 214, u); P.depth = K.lerp(1, 0.15, u); P.gaze = gazePlan(t, [[0, [-0.7, 0.5]], [1.9, [0, 0.1]], [2.05, [0.8, 0]]], 0.07); P.lid = 0.3; P.mouth = 'smile'; P.ant = 0.5; }
    if (t >= 2.54) { const k = Math.sin(KD10_Z(t, 2.54, 0.9) * Math.PI * 3); P.arm = [70 + 6 * k, -6 - 12 * Math.max(0, k)]; P.headRot = -0.07; P.lid = Math.max(0.3, pulse(t, 2.9, 0.4)); }
    if (t >= 3.4) { P.arm = null; P.headRot = 0; }
    if (t >= 4.3) { const u = K.ease.in(KD10_Z(t, 4.3, 0.18)); P.x = K.lerp(214, 176, u); P.depth = K.lerp(0.15, 1, u); P.eyes = t < 4.42 ? 'wide' : 'open'; P.mouth = 'o'; P.lid = 0; P.antW = swing(t, 4.4, 0.4, 2, 3); }
    if (t >= 5.9) { P.mouth = 'closed'; P.gaze = gazePlan(t, [[0, [0.2, -0.6]], [6.6, [0.9, -0.5]], [7.6, [0.3, -0.8]], [8.6, [0.9, 0.2]]], 0.25); }
    if (t >= 6.88) { P.sq = 1 - 0.15 * pulse(t, 6.88, 0.3) + 0.05 * pulse(t, 7.18, 0.3); P.antW = swing(t, 6.9, 0.35, 2.2, 2.5); }
    if (t >= 9.56 && t < 10.9) { const u = K.ease.inOut(KD10_Z(t, 9.56, 0.4)) - K.ease.inOut(KD10_Z(t, 10.5, 0.35)); P.x = 176 + 20 * u; P.depth = 1 - 0.55 * u; P.headRot = 0.12 * Math.sin(KD10_Z(t, 9.96, 0.5) * Math.PI * 4) * (t < 10.46 ? 1 : 0); P.gaze = [0.5, -0.8]; P.brow = -0.4; }
    if (t >= 13.35) { const u = K.ease.out(KD10_Z(t, 13.35, 0.2)); P.x = K.lerp(176, 214, u); P.depth = K.lerp(1, 0, u); P.gaze = gazePlan(t, [[0, [-0.9, 0]], [13.48, [0.9, 0]], [13.6, [0.9, 0]]], 0.07); P.mouth = 'smile'; P.ant = 0.6; }
    return P;
  }
  // S2 tiptoe to the fingertip
  if (t < 20.2) {
    const LX = (tt) => KD10_kf(tt, [[13.7, 214], [14.74, 240], [17.5, 400], [18.04, 400], [18.3, 452], [19.1, 452], [20.2, 330]], 'inOut');
    Object.assign(P, walk(LX, t, { stride: 14 })); P.depth = 0; P.sq = 0.92; P.ant = 0.6; P.gaze = KD10_gz(head(), [560, 820]); P.mouth = 'closed';
    if (KD10_IN(t, 15.48, 16.6)) { P.arm = [58, -46]; P.gaze = KD10_CAMG; P.lid = 0.2; P.mouth = 'smile'; P.amp = 0; }
    if (KD10_IN(t, 17.5, 18.04)) { P.ph = walk(LX, 17.49, { stride: 14 }).ph; P.amp = 0.6; P.gaze = KD10_gz(head(), [800, 420]); P.noBlink = true; P.eyes = 'wide'; }
    if (KD10_IN(t, 18.3, 18.9)) { P.lid = 1; P.headRot = 0.25 * pulse(t, 18.35, 0.25); P.amp = 0; }
    if (t >= 18.9) { P.dir = t >= 19.1 ? -1 : 1; P.lid = 0.4; P.mouth = 'smile'; P.antW = 0.15 * Math.sin(t * 5); if (t < 19.5) P.arm = [20 + 8 * Math.sin(t * 16), -20]; P.gaze = [0.8, 0]; }
    return P;
  }
  // S3-S8: at home
  if (t < 92.06) {
    P.x = 190; P.depth = 1; P.gaze = [0.8, -0.2];
    if (t >= 28.52) { const u = K.ease.out(KD10_Z(t, 28.52, 0.25)); P.x = K.lerp(186, 206, u); P.depth = K.lerp(1, 0.25, u); P.eyes = 'wide'; P.ant = 0.6 + 0.4 * kick(t, [28.55, 28.85], 1, 10, 6); P.gaze = KD10_gz(head(), [420, 820]); P.mouth = 'o'; }
    if (t >= 29.3) { P.x = 210; P.depth = 0.2; P.eyes = 'open'; P.mouth = 'closed'; P.gaze = KD10_gz(head(), [380, 790]); }
    if (t >= 30.04 && t < 32.2) { P.x = 210 - 10 * pulse(t, 30.04, 2.1); P.gaze = KD10_gz(head(), [400 + 60 * Math.sin((t - 30.76) * 9) * pulse(t, 30.76, 0.8), 760 - 30 * pulse(t, 30.76, 0.8)]); P.headRot = -0.06 * pulse(t, 30.04, 2.1); }
    if (KD10_IN(t, 32.78, 33.0)) P.lid = 1;
    if (t >= 31.94) { P.mouth = 'smile'; P.brow = -0.2; P.headRot = 0.08 * pulse(t, 31.94, 0.4); }
    if (t >= 36.18) { const u = K.ease.out(KD10_Z(t, 36.18, 0.5)); P.x = K.lerp(210, 228, u); P.depth = K.lerp(0.2, 0, u); P.arm = t < 37.6 ? [K.lerp(40, 80, u), -40] : null; P.tip = 0.08 * pulse(t, 36.4, 0.8); P.lid = Math.max(0, pulse(t, 36.7, 0.4)); P.mouth = 'smile'; }
    if (t >= 38.38) { P.mouth = 'closed'; P.brow = 0; P.gaze = lookAt([0, 0], gazePlan(t, [[0, [380, 790]], [38.5, [800, 420]]], 0.5).map((v, i) => v - head()[i])); P.ant = K.lerp(0.3, -0.3, KD10_Z(t, 38.4, 0.6)); }
    if (t >= 40.02) { P.brow = -0.7; P.arm = [44 + 6 * Math.sin(t * 13), -36 + 4 * Math.cos(t * 13)]; P.x = 228 + tremble(t, 1); P.sweat = KD10_Z(t, 40.1, 0.2); P.gaze = t < 40.3 ? KD10_gz(head(), [380, 790]) : KD10_gz(head(), [800, 420]); }
    // S5 the warning (she speaks 43.43-53.78)
    if (t >= 40.64) { P.sweat = 0; P.brow = 0; P.arm = null; P.x = 228; P.gaze = KD10_gz(head(), [380, 780]); P.sq = 1 - 0.05 * pulse(t, 40.9, 0.4) + 0.03 * pulse(t, 41.3, 0.4); P.ant = 0.3; }
    if (t >= 42.96) { P.talk = talk(t, [[43.43, 44.78], [45.24, 47.36], [48.46, 53.78], [54.73, 57.83], [58.13, 60.36], [60.67, 61.62]], 1); P.headRot = 0.07 * pulse(t, 43.2, 0.35) + 0.07 * pulse(t, 43.6, 0.35); P.mouth = 'smile'; }
    if (t >= 44.78) { P.mouth = 'closed'; P.arm = [62, K.lerp(-40, -96, settleTo(t, 44.78, 0, 1, 0.3))]; }
    if (t >= 45.7) { P.arm = t < 46.2 ? [52, -66] : [96, -44]; P.tip = 0.1 * KD10_Z(t, 45.7, 0.3); P.brow = 0.3; }
    if (t >= 46.6) { P.tip = 0.1 * (1 - KD10_Z(t, 46.6, 0.4)); P.arm = null; P.brow = 0; }
    if (t >= 47.36) { const u = K.ease.inOut(KD10_Z(t, 47.36, 0.5)); P.arm = [K.lerp(40, 66, u), K.lerp(-30, -120, u)]; P.gaze = KD10_gz(head(), [800, 420]); P.antW = swing(t, 47.7, 0.3, 1.6, 2.5); P.headRot = -0.15 * u; }
    if (t >= 52.94) { const k = Math.abs(Math.sin(KD10_Z(t, 52.94, 0.5) * Math.PI * 2)); P.arm = [70, -40 - 30 * k]; P.eyes = 'wide'; P.headRot = 0; P.gaze = KD10_gz(head(), [380, 780]); P.ant = -0.4; }
    if (t >= 53.45) { P.arm = null; P.eyes = 'open'; P.headRot = 0.14 * Math.sin(KD10_Z(t, 53.45, 0.5) * Math.PI * 4); }
    // S6 WAIT, the meter, the tiptoe lesson, no rushing
    if (t >= 54.0) { P.headRot = 0; P.ant = 0.3; P.gaze = KD10_gz(head(), [380, 780]); }
    if (t >= 54.36) { P.arm = [K.lerp(60, 92, settleTo(t, 54.36, 0, 1, 0.5)), -30]; P.lid = 0.2; }
    if (t >= 55.6) { P.arm = null; P.lid = 0; }
    if (t >= 56.4) { const u = K.ease.inOut(KD10_Z(t, 56.4, 1.2)); P.arm = [K.lerp(50, 84, u), K.lerp(-110, -126, u)]; P.gaze = [0.1, -1]; P.headRot = -0.18; }
    if (t >= 57.7) { P.gaze = KD10_gz(head(), [380, 780]); P.headRot = 0; P.arm = t < 58.1 ? [70, -60] : null; }
    if (t >= 58.1 && t < 59.6) { const LX = (tt) => KD10_kf(tt, [[58.1, 228], [59.5, 262]]); Object.assign(P, walk(LX, t, { stride: 14 })); P.sq = 0.92; }
    if (t >= 59.6) { P.x = 262; P.amp = 0; }
    if (t >= 60.36) { P.arm = [60 + 14 * Math.sin(KD10_Z(t, 60.36, 0.56) * Math.PI * 4), -70]; P.headRot = 0.1 * Math.sin(KD10_Z(t, 60.36, 0.56) * Math.PI * 4); P.lid = t > 60.75 && t < 60.95 ? 1 : 0; }
    if (t >= 60.95) { P.arm = null; P.headRot = 0; }
    if (t >= 61.7) { P.lid = 0.5; P.mouth = 'flat'; P.ant = 0.1; P.gaze = KD10_gz(head(), [380, 760]); }
    // S7 she gives up and backs into the nook
    if (t >= 62.02) { P.x = 262; P.lid = 0.3; P.gaze = KD10_gz(head(), [420, 780]); P.mouth = 'closed'; }
    if (t >= 67.6) { P.sq = 1 - 0.04 * KD10_Z(t, 67.6, 0.3); P.gaze = [0.5, 0.7]; P.ant = -0.3; }
    if (t >= 68.0) { const LX = (tt) => KD10_kf(tt, [[68.0, 262], [69.4, 186]]); Object.assign(P, walk(LX, t, { stride: 14 })); P.depth = K.lerp(0, 0.9, KD10_Z(t, 68.5, 0.9)); P.gaze = KD10_gz(head(), [420, 780]); P.sq = 0.96; }
    // S8 two eyes in the nook
    if (t >= 69.4) { P.amp = 0; P.x = 186; P.depth = 0.9; }
    if (t >= 80.46) { P.brow = -0.7; P.gaze = [0.9, -0.1]; }
    if (t >= 81.1 && t < 82.36) { const u = KD10_Z(t, 81.1, 1.1), w = u < 1 ? Math.sin(u * Math.PI * 4) : 0; P.x = 186 + 12 * w; P.headRot = 0.22 * w; P.antW = 0.5 * w; P.lid = 0; P.noBlink = true; }
    if (t >= 82.36) { P.x = 186; P.headRot = 0; P.lid = 0; P.noBlink = true; P.brow = -0.6; P.antW = swing(t, 82.36, 0.2, 2, 3); }
    // S9 her foreleg shoots out: NO!
    if (t >= 87.12) { const u = pulse(t, 87.15, 1.4); P.depth = 0.9 - 0.6 * u; P.x = 180 + 24 * u; P.arm = u > 0.1 ? [96, -46] : null; P.eyes = u > 0.1 ? 'wide' : 'open'; P.mouth = u > 0.1 ? 'o' : 'closed'; P.gaze = [0.95, -0.3]; }
    return P;
  }
  // S10 small lens: facepalm
  if (t < 116.74) { P.x = 182; P.depth = 0.75; P.gaze = [0.8, -0.3]; if (t >= 102.8) { P.arm = [56, K.lerp(-20, -62, KD10_Z(t, 102.8, 0.5))]; P.ant = -0.8; P.lid = 0.7; }
    if (t >= 114.9) { P.arm = null; P.ant = 0.5; P.lid = 0; P.eyes = 'wide'; P.brow = -0.7; P.gaze = [0.7, -0.6]; P.noBlink = true; P.sq = 0.94; } return P; }
  // S13: in the nook, the lamp, the thread, the eye
  P.x = 182; P.depth = 0.7; P.gaze = [0.3, -0.9]; P.ant = 0.3 + 0.3 * kick(t, [125.3, 125.9, 126.25], 1, 9, 6);
  if (t >= 126.56) { const u = K.ease.out(KD10_Z(t, 126.56, 0.4)); P.x = K.lerp(182, 206, u); P.depth = K.lerp(0.7, 0.2, u); P.gaze = KD10_gz(head(), [470, 880]); P.brow = -0.6; P.mouth = 'o'; }
  if (t >= 128.42) { P.mouth = 'closed'; P.brow = -0.2; P.arm = t < 129.3 ? [-10 + 8 * Math.sin(t * 14), -50] : null; P.gaze = [0.8, 0]; }
  if (t >= 129.96) { P.eyes = 'wide'; P.gaze = [0.6, -0.6]; P.brow = -0.6; }
  if (t >= 130.78) { const LX = (tt) => KD10_kf(tt, [[130.78, 206], [132.0, 140]]); Object.assign(P, walk(LX, t, { stride: 10, amp: 30 })); P.sq = 0.85; P.depth = K.lerp(0.2, 0.5, KD10_Z(t, 130.8, 1.2)); P.dir = 1; }
  if (t >= 132.0) { P.amp = 0; P.x = 140; P.sq = 0.88; }
  // v2: she pulls the thread over herself but stays visible (back, antenna tips, eyes above the thread), trembling
  if (t >= 132.14) { const u = K.ease.inOut(KD10_Z(t, 132.14, 0.5)); P.under = u; P.sq = 0.9; P.ant = K.lerp(0.2, -0.3, u); P.x = 140 + tremble(t, 1.5 * u, 11); P.gaze = [0.7, -0.4]; P.brow = -0.6; P.eyes = 'open'; P.mouth = 'closed'; }
  if (t >= 133.72) P.gaze = [0.5, -0.9];
  if (t >= 135.34) { P.eyes = 'wide'; P.gaze = [0.4, -1]; P.noBlink = true; }
  if (t >= 135.6) { P.gaze = KD10_CAMG; P.wet = true; P.brow = -0.8; P.mouth = 'o'; }
  if (t >= 136.5) P.gaze = [0.3, -1];
  if (t >= 136.64) { P.eyes = 'wide'; P.ant = -1; P.gaze = [0.1, -1]; P.x = 140 + tremble(t, 2, 13); P.sq = 0.86; P.wet = true; }
  return P;
}
// thread curl position: (300, 895) until she drags it over herself
function kd10Thread(t) { const u = K.ease.inOut(KD10_Z(t, 132.14, 0.5)); return { x: K.lerp(300, 150, u), y: K.lerp(895, 872, u), over: u, rock: t > 136.64 && t < 154 ? swing(t, 137.4, 0.4, 1.5, 1.5) : t >= 154.4 ? swing(t, 154.9, 0.25, 1.2, 1.6) : 0 }; }

// ======================================================================
// FLEA (bed and floor worlds; room positions are in kd10FleaRoom)
function kd10Flea(t) {
  const P = { kind: 'flea', x: 420, y: 900, s: 0.95, dir: -1, ant: 0.5, lid: 0.35, mouth: 'smirk', bundle: true, seed: 5, world: 'bed' };
  const head = () => [P.x + 26 * P.s * P.dir, P.y - 126 * P.s];
  const louseHead = [258, 852];
  // S3 landing and trampoline bounces (27.2 - 29.3)
  if (t < 29.3) {
    if (t < 27.84) { const u = KD10_Z(t, 26.9, 0.94); P.x = K.lerp(300, 420, u); P.y = K.lerp(520, 900, u * u); P.air = 1; P.sq = 1.15; P.dir = 1; P.mouth = 'open'; P.eyes = 'wide'; P.bsw = -0.5; return P; }
    const B = [[27.84, 0.32, 70], [28.16, 0.26, 40], [28.42, 0.2, 18], [29.0, 0.3, 26]];
    P.dir = 1; P.mouth = 'open'; P.lid = 0; P.x = 420;
    for (const [a, d, h] of B) if (t >= a && t < a + d) { P.y = 900 - h * Math.sin(Math.PI * (t - a) / d); P.air = 0.5; }
    const dip = [[27.84, 26], [28.16, 14], [28.42, 6]]; for (const [a, dd] of dip) P.y += dd * pulse(t, a - 0.02, 0.12) * (t < a + 0.1 ? 1 : 0);
    P.sq = landSquash(t, 27.84, 0.25) * landSquash(t, 28.16, 0.18) * landSquash(t, 28.42, 0.12);
    P.bsw = swing(t, 27.84, 0.6, 2, 2.5);
    if (t >= 28.6) { P.gaze = KD10_gz(head(), louseHead, 1); P.mouth = 'grin'; }
    if (t >= 29.0) { P.x = K.lerp(420, 400, KD10_Z(t, 29.0, 0.3)); P.dir = t < 29.15 ? 1 : -1; P.sq = landSquash(t, 29.3, 0.15); }
    return P;
  }
  P.x = 400; P.dir = -1; P.gaze = KD10_gz(head(), louseHead, -1);
  // S4 the speech (30.53-36.01)
  if (t < 40.64) {
    P.talk = talk(t, [[30.53, 32.64], [33.4, 36.01]], 2); P.mouth = 'grin'; P.lid = 0.2;
    // v2 charm act: arms-wide flourish, a full spin with antennae and bundle trailing, a deep pleading bow, the one-eyed peek, "just one"
    if (t >= 30.04 && t < 30.76) { const u = settleTo(t, 30.04, 0, 1, 0.3); P.arm = [70, -120 - 40 * u]; P.arm2 = [-60 * u, -140]; P.ant = 0.6 + 0.4 * u; P.antW = swing(t, 30.1, 0.3, 2, 3); P.bsw = swing(t, 30.1, 0.5, 2, 2.5); P.lid = 0; P.mouth = 'grin'; P.gaze = [0.7, -0.3]; P.y = 900 - 10 * u; }
    if (t >= 30.76 && t < 31.6) { const tf = turnFlip(t, [[0, -1], [30.86, 1], [31.22, -1]], 0.3), k = pulse(t, 30.76, 0.8); P.dir = tf.dir; P.sq = 1 - 0.1 * tf.tuck; P.y = 900 - 44 * k; P.air = 0.6 * k;
      P.antW = 0.5 * Math.sin((t - 30.76) * 16) * k + swing(t, 31.3, 0.4, 2, 3); P.bsw = 0.7 * Math.sin((t - 30.76) * 13) * k + swing(t, 31.4, 0.4, 2, 3); P.arm = [70, -160]; P.arm2 = [-50, -140]; P.lid = 0.1; }
    if (t >= 31.6 && t < 32.4) { P.arm = [60, -120 + 10 * Math.sin(t * 12)]; P.lid = 0.4; }
    if (t >= 32.64) { const u = K.ease.inOut(KD10_Z(t, 32.64, 0.4)); P.bundle = false; P.tip = 0.3 * u; P.sq = 1 - 0.15 * u; P.arm = [40, -70]; P.arm2 = [34, -64]; P.brow = -0.8; P.wet = true; P.eyes = 'wide'; P.lid = 0; P.ant = -0.6 * u; P.mouth = 'o'; P.noBlink = true; }
    if (t >= 33.25 && t < 35.38) { P.lid = 0.95; P.eyes = 'open'; }
    if (t >= 34.48 && t < 34.9) { P.wink = 'far'; P.lid = 0; P.eyes = 'wide'; P.gaze = KD10_gz(head(), louseHead, -1); P.headRot = -0.08; }
    if (t >= 35.38) { const u = K.ease.out(KD10_Z(t, 35.38, 0.3)); P.tip = 0.3 * (1 - u); P.sq = 1; P.arm = t < 35.5 ? [30, -60] : [78, -150]; P.digit = t >= 35.5 && t < 36.18 ? K.clamp((t - 35.5) / 0.15) : 0; P.arm2 = null; P.wet = false; P.brow = -0.3 * (1 - u); P.mouth = 'smile'; P.ant = 0.3; P.lid = 0.2; P.noBlink = false; P.eyes = 'open'; }
    if (t >= 36.18) { P.arm = null; P.tip = 0; P.gaze = KD10_gz(head(), louseHead, -1); }
    if (t >= 37.0) { const k = pulse(t, 37.0, 0.4); P.arm = t < 37.5 ? [30, -140] : [-40, -40]; P.sq = 1 - 0.1 * pulse(t, 36.9, 0.15) + 0.1 * k; P.y = 900 - 30 * pulse(t, 37.05, 0.3); P.mouth = 'grin'; }
    if (t >= 37.6) { P.dir = 1; P.x = K.lerp(400, 430, KD10_Z(t, 37.6, 0.8)); P.arm = [40, -20]; P.gaze = [0.6, 0.9]; P.mouth = 'smile'; P.lid = 0.4; P.talk = 0; }
    return P;
  }
  // S5 lounging on the bundle
  if (t < 54.0) {
    P.bundle = false; P.x = 430;
    if (t < 43.4) { P.dir = 1; P.gaze = [0.8, 0.6]; P.arm = [40, -10 + 6 * Math.sin(t * 9)]; P.lid = 0.4; P.mouth = 'smile'; return P; }
    P.dir = -1; P.lie = 1; P.rot = K.lerp(-1.4, -0.75, KD10_Z(t, 46.5, 0.4)); P.y = 896; P.lid = 0.6; P.mouth = 'smirk'; P.arm = [60, -150 + 10 * Math.sin(t * 6)]; P.crouch = 0.2;
    P.gaze = KD10_gz(head(), louseHead, -1);
    if (t >= 46.5) { P.brow = -0.4; P.talk = 0.3 * Math.abs(Math.sin(t * 7)); P.gaze = t < 47.4 ? [0.9, -0.1] : KD10_gz([P.x, 840], [780, 712], -1); P.lid = 0.3; }
    if (t >= 49.3) P.gaze = KD10_gz([P.x, 840], [780, 712], -1);
    if (t >= 53.3) { P.tongue = KD10_IN(t, 53.35, 53.5); P.lid = Math.max(0.2, pulse(t, 53.55, 0.35)); P.talk = 0; P.mouth = 'smile'; }
    return P;
  }
  // S6 nodding, copying the tiptoe badly
  if (t < 62.02) {
    P.bundle = false; P.x = 420; P.dir = -1; P.gaze = KD10_gz(head(), louseHead, -1); P.lid = 0.4; P.mouth = 'smirk';
    if (t < 54.4) { P.rot = K.lerp(-0.75, 0, KD10_Z(t, 54.0, 0.3)); }
    if (t >= 56.4 && t < 58.1) P.gaze = [-0.4, -1];
    if (t >= 58.86 && t < 60.3) { const hops = [[58.9, 0.3, 34], [59.3, 0.3, 40], [59.75, 0.3, 30]]; for (const [a, d, h] of hops) if (t >= a && t < a + d) P.y = 900 - h * Math.sin(Math.PI * (t - a) / d); P.x = K.lerp(420, 380, KD10_Z(t, 58.9, 1.2));
      P.crouch = 0.5 + 0.5 * Math.sin(t * 14); P.arm = [-20, -30]; P.sq = 0.95; P.mouth = 'o'; P.gaze = [0.4, 0.9]; }
    if (t >= 60.3) { P.x = 380; }
    if (t >= 60.92 && t < 61.62) { P.headRot = 0.22 * Math.sin(KD10_Z(t, 60.92, 0.7) * Math.PI * 12); P.gaze = KD10_gz([P.x, 780], [780, 712], -1); P.mouth = 'grin'; }
    if (t >= 61.62) { P.x = 380; P.gaze = KD10_gz([P.x, 780], [780, 712], -1); }
    return P;
  }
  // S7 bragging, waiting, tapping
  if (t < 71.9) {
    P.bundle = false; P.x = 400; P.dir = -1; P.lid = 0.4; P.mouth = 'smirk'; P.gaze = KD10_gz(head(), louseHead, -1);
    P.sq = anticipate(t, 62.1, 0.2, 0.12) * (1 + 0.08 * pulse(t, 62.3, 0.3)); P.y = 900 - 20 * pulse(t, 62.3, 0.3);
    P.talk = talk(t, [[64.84, 65.74], [66.45, 68.0]], 3);
    if (t >= 64.42 && t < 65.6) { P.arm = [60 + 16 * Math.sin(t * 15), -90]; P.lid = 0.7; P.headRot = -0.15; P.gaze = [0.6, -0.2]; }
    if (t >= 65.9 && t < 67.2) { P.arm = [14, -84 + 10 * (pulse(t, 66.45, 0.2) + pulse(t, 66.92, 0.2))]; P.wink = 'near'; P.gaze = KD10_CAMG; P.headRot = 0; }
    if (t >= 67.36 && t < 68.4) { P.crouch = 0.8 * pulse(t, 67.4, 0.6); P.arm = [40, -132]; P.mouth = 'o'; P.gaze = [0.7, -0.6]; P.antW = swing(t, 67.9, 0.3, 3, 3); }
    if (t >= 68.4) { P.gaze = KD10_gz(head(), [190, 870], -1); }
    if (t >= 69.98) { P.crouch = 1; P.sq = 0.9; P.gaze = gazePlan(t, [[0, [-0.4, -1]], [70.25, [-1, 0.2]], [70.5, [-0.4, -1]], [70.75, [-1, 0.2]], [71.1, [-0.5, -1]]], 0.07); P.mouth = 'flat'; }
    if (t >= 70.4) { const f = 6 + 8 * KD10_Z(t, 70.4, 1.5); P.y = 900 - 3 * Math.abs(Math.sin(t * f)); P.antW = 0.12 * Math.sin(t * 40); P.arm = [36, -8 - 6 * Math.abs(Math.sin(t * f))]; }
    if (t >= 71.1) { P.tip = -0.12 * KD10_Z(t, 71.1, 0.4); P.brow = 0.8; P.gaze = [-0.4, -1]; }
    return P;
  }
  // S8 hunger
  if (t < 84.34) {
    P.bundle = false; P.x = 400; P.dir = -1; P.lid = 0.3; P.mouth = 'frown'; P.crouch = 0.5;
    P.arm = [30, -60]; P.brow = -0.5; P.gaze = [0.3, 0.8];
    if (t >= 74.54) { P.antW = -0.35 * settleTo(t, 74.54, 0, 1, 0.2); P.gaze = t < 74.8 ? [0.2, -0.6] : [-0.4, -0.9]; P.arm = null; }
    if (t >= 75.6) { const [hx, hy] = [0, 30 * Math.sin(Math.PI * KD10_Z(t, 75.6, 0.35))]; P.y = 900 - hy; P.x = K.lerp(400, 420, KD10_Z(t, 75.6, 0.35)); P.dir = t < 75.78 ? -1 : 1; P.sq = landSquash(t, 75.95, 0.2); P.eyes = t < 76.1 ? 'wide' : 'open'; P.antW = 0; P.crouch = 0.2; P.mouth = 'o'; P.gaze = [1, -0.4]; }
    if (t >= 76.1) { P.mouth = 'smile'; P.lid = 0.3; P.gaze = KD10_gz(head(), [700, 760], 1); P.brow = 0; }
    if (t >= 76.34) { P.tip = 0.12 * KD10_Z(t, 76.34, 0.8); P.drool = KD10_Z(t, 76.5, 0.6); }
    if (t >= 77.98) { P.crouch = K.lerp(0.2, 0.6, KD10_Z(t, 77.98, 0.9)); P.arm = [42 + 6 * Math.sin(t * 18), -62]; P.arm2 = [34 - 6 * Math.sin(t * 18), -60]; P.mouth = 'grin'; }
    if (t >= 78.94) { P.napkin = KD10_Z(t, 78.94, 0.3) > 0.5; P.arm = t < 79.3 ? [30, -100] : P.arm; P.ant = 0.9; }
    return P;
  }
  // S9 the leap and the bite
  if (t < 92.06) {
    P.bundle = false; P.napkin = true; P.x = 420; P.dir = 1; P.lid = 0.3; P.mouth = 'grin'; P.crouch = 0.6; P.gaze = KD10_gz(head(), [760, 712], 1); P.ant = 0.8;
    if (t >= 86.38) { P.crouch = K.lerp(0.6, 1, KD10_Z(t, 86.38, 0.3)); P.sq = K.lerp(1, 0.8, KD10_Z(t, 86.38, 0.4)); P.x = 420 + 3 * Math.sin(t * 30) * (t < 87.12 ? 1 : 0); }
    if (t >= 87.12) { const u = KD10_Z(t, 87.12, 1.64); P.x = K.lerp(420, 760, u); P.y = K.lerp(900, 714, u) - 260 * Math.sin(Math.PI * u); P.air = u < 1 ? 1 : 0; P.crouch = 0; P.sq = u < 1 ? 1.2 : 1; P.mouth = 'open'; P.tip = 0.3 * Math.sin(Math.PI * u) - 0.1; }
    if (t >= 88.76) { P.x = 760; P.y = 714; P.air = 0; P.tip = 0; P.sq = landSquash(t, 88.76, 0.3) * (1 + 0.06 * pulse(t, 88.9, 0.3)); P.mouth = 'grin'; P.gaze = [0.4, 0.9]; }
    if (t >= 89.24) { P.tip = -0.25 * K.ease.inOut(KD10_Z(t, 89.24, 0.5)); P.mouth = 'teeth'; P.lid = 0; P.brow = 0.6; }
    if (t >= 90.1) { P.tip = K.lerp(-0.25, 0.32, KD10_Z(t, 90.1, 0.066)); P.mouth = 'teeth'; P.lid = 1; }
    if (t >= 91.14) { P.headRot = 0.15 * Math.sin(KD10_Z(t, 91.14, 0.6) * Math.PI * 6); P.y = 714 - 4 * Math.abs(Math.sin(t * 20)) * (t < 91.75 ? 1 : 0); }
    return P;
  }
  // S10 small lens: frozen mid-chew, looks to camera, gulps
  if (t < 116.74) { P.bundle = false; P.x = 760; P.y = 714; P.dir = 1; P.tip = 0.2; P.mouth = 'teeth'; P.lid = 0; P.eyes = 'wide'; P.gaze = KD10_CAMG; P.noBlink = true; P.sweat = 1; P.napkin = t < 97.0; P.drop = 0; return P; }
  // S12 (bed) the light creeps, the leap off the edge
  if (t < 120.9) {
    P.bundle = false; P.x = 560; P.dir = 1; P.eyes = 'wide'; P.ant = 1; P.lid = 0; P.mouth = 'o'; P.gaze = [1, 0.1]; P.noBlink = true;
    if (t >= 118.26) P.gaze = gazePlan(t, [[0, [1, 0.1]], [118.26, [-1, 0]], [118.45, [1, 0]], [118.62, [0.3, 1]]], 0.07);
    if (t >= 118.96) { P.x = 560 + tremble(t, 2); P.sq = 0.92; P.mouth = 'frown'; }
    if (t >= 119.5) { P.crouch = K.clamp((t - 119.5) / 0.4); P.sq = 0.85; P.dir = -1; }
    if (t >= 119.96) { const u = KD10_Z(t, 119.96, 0.84); P.crouch = 0; P.air = 1; P.sq = 1.2; P.x = K.lerp(560, 520, u); P.y = 900 - 80 * Math.sin(Math.PI * Math.min(u, 0.5)) + (u > 0.5 ? 900 * (u - 0.5) * (u - 0.5) * 4 : 0); P.rot = -0.6 * u; }
    return P;
  }
  // S12 (floor) the fall, the landing, the dash and the dive
  P.world = 'floor'; P.bundle = false;
  if (t < 125.04) {
    P.x = 300; P.dir = 1; P.eyes = 'wide'; P.mouth = 'o'; P.lid = 0; P.noBlink = true;
    const G = KD10_FG;
    if (t < 121.94) { P.y = fallY(t, 120.9, 121.94, 250, G); P.air = 1; P.rot = Math.sin(t * 9) * 0.5; P.arm = [40 + 20 * Math.sin(t * 25), -60]; return P; }
    P.y = G - rebound(t, 121.94, 22, 0.25); P.sq = impactSquash(t, 121.94, 0.5);
    if (t >= 122.48) { const xs = [[122.48, 300], [122.7, 380], [122.92, 440], [123.14, 520], [123.36, 580], [123.58, 640]];
      let x = 300, y = G; for (let i = 1; i < xs.length; i++) if (t >= xs[i - 1][0] && t < xs[i][0]) { const u = KD10_Z(t, xs[i - 1][0], 0.22); x = K.lerp(xs[i - 1][1], xs[i][1], u); y = G - 26 * Math.sin(Math.PI * u) - (i % 2 ? 0 : 14) * Math.sin(Math.PI * u); } else if (t >= xs[i][0]) x = xs[i][1];
      P.x = x; P.y = y; P.tip = 0.25; P.headRot = 0.2; P.ant = 0.9; }
    if (t >= 123.6) { P.x = 650; P.tip = 0; }
    if (t >= 123.68) { const u = KD10_Z(t, 123.68, 0.42); P.dive = u; P.x = 660; P.rot = K.lerp(0, 1.5, Math.min(1, u * 2)); P.y = G + 110 * K.ease.in(u); }
    if (t >= 124.1) { P.eyesOnly = true; P.x = 652; P.y = 975; P.gaze = [0.6, -0.4]; P.lid = pulse(t, 124.3, 0.6); P.noBlink = false; P.eyes = 'open'; P.rot = 0; }
    return P;
  }
  // S14 (floor, in the room's small lens) and S15
  P.x = 652; P.y = 975; P.eyesOnly = true; P.gaze = [0.6, -0.6]; P.dir = -1; P.lid = 0;
  if (t < 147.44) { if (KD10_IN(t, 141.0, 141.7)) P.lid = 1; if (KD10_IN(t, 141.7, 142.2)) P.wink = 'far'; return P; }
  // v2: antennae first, then the head, then he pulls himself up and steps onto the tile beside the crack
  P.eyesOnly = false; P.mouth = 'closed'; P.lid = 0.2;
  { const u = KD10_kf(t, [[147.44, 0], [148.1, 0.32], [148.7, 0.55], [149.3, 1]], 'inOut'); P.x = 660; P.y = K.lerp(1090, KD10_FG, u); P.ant = t < 148.1 ? 1 : 0.5; P.antW = t < 148.5 ? 0.25 * Math.sin(t * 5) : 0; P.climb = t < 149.4; if (t >= 148.7 && t < 149.3) { P.arm = [44, -40]; P.crouch = 0.4; } }
  if (t < 149.6) P.gaze = gazePlan(t, [[0, [-0.9, -0.2]], [148.4, [0.9, -0.2]], [148.7, [-0.9, -0.2]], [149.1, [0.6, 0]]], 0.07);
  if (t >= 149.4) { const LX = (tt) => KD10_kf(tt, [[149.4, 660], [150.1, 790]]); Object.assign(P, walk(LX, t, { stride: 14 })); P.dir = t < 150.25 ? 1 : -1; P.gaze = [0.8, 0]; }
  if (KD10_IN(t, 150.1, 150.44)) { P.x += tremble(t, 2, 14); P.dust = true; }
  if (t >= 150.44) { P.lid = 0.3; P.gaze = [-0.8, 0]; }
  if (t >= 151.18) { P.sq = K.lerp(1.03, 0.96, KD10_Z(t, 151.18, 0.6)); P.lid = 0.4; }
  if (t >= 152.9) { const u = K.ease.inOut(KD10_Z(t, 152.9, 0.8)); P.headRot = -0.35 * u; P.gaze = [0.6, -1]; P.lid = 0.1; }
  if (t >= 156.42) { P.headRot = 0.12; P.ant = -0.8; P.lid = 0.5; P.brow = -0.5; P.gaze = [0.6, 0.9]; P.sq = 0.95; }
  // v2: he turns his head away from the bed, then three heavy hops out of frame (left, toward the window side), one look back
  if (t >= 157.56) { P.headRot = 0; P.gaze = [1, 0.2]; P.ant = -0.6; P.brow = -0.3; P.lid = 0.45; P.sq = 1; P.dir = -1; }
  if (t >= 157.98) { P.crouch = 0.8 * K.ease.inOut(KD10_Z(t, 157.98, 0.2)); P.sq = anticipate(t, 157.98, 0.2, 0.14); }
  if (t >= 158.18) { const H = [[158.18, 0.42, 790, 620, 48], [158.78, 0.42, 620, 450, 42], [159.36, 0.4, 450, 120, 40]];
    for (const [a, d, x0, x1, h0] of H) { if (t >= a && t < a + d) { const [x, h] = hop(t, a, d, x0, x1, h0); P.x = x; P.y = KD10_FG - h; P.air = 1; P.crouch = 0; P.ant = -0.9; P.antW = -0.25; } else if (t >= a + d) { P.x = x1; P.y = KD10_FG; P.air = 0; } }
    let sq = 1, cr = 0; for (const [a, d] of H) { sq *= landSquash(t, a + d, 0.2, 7); cr = Math.max(cr, 0.7 * pulse(t, a + d, 0.3)); } P.sq = sq; if (!P.air) P.crouch = cr;
    if (KD10_IN(t, 158.6, 158.98)) { P.gaze = [-1, -0.6]; P.headRot = -0.12; } }
  return P;
}

// ======================================================================
// ROOM cast: the rich man, the servants, the room flea
function kd10Man(t) {
  const P = { costume: 'merchant', pal: { robe: C.yellow, dot: C.red, sash: C.red, trim: C.red, hc: C.white, hd: C.blue }, x: 1100, y: 900, s: 1.3, dir: -1, mouth: 'smile', gaze: [-0.8, 0], seed: 11 };
  const BED = { x: 625, y: 772 };   // lie origin: bed surface under the hips (head toward +x with dir -1)
  const NIGHT = { costume: 'merchant', pal: { robe: C.white, dot: C.blue, sash: C.blue, trim: C.blue, hc: C.white, hd: C.red } };
  if (t < 4.2) { const LX = (tt) => KD10_kf(tt, [[3.0, 1100], [4.2, 470]], 'out'); Object.assign(P, walk(LX, t, { stride: 26 * 1.3 })); P.lid = 0.4; P.purse = 1; P.lean = -0.05;
    if (t >= 3.68) { P.purseY = 120 * Math.sin(Math.PI * KD10_Z(t, 3.68, 0.6)); P.gaze = [-0.3, -0.9 + 1.5 * KD10_Z(t, 3.68, 0.6)]; } return P; }
  if (t < 10.9) {
    P.x = 470; P.lid = 0.4; P.purse = t < 6.6 ? 1 : 0; P.gaze = [-0.6, 0.2]; P.amp = 0;
    if (t >= 4.2 && t < 4.6) P.purseY = 0;
    if (t >= 6.6) { P.sit = K.ease.inOut(KD10_Z(t, 6.6, 0.4)); P.seat = 'bench'; P.y = 900; P.lean = 0.25 * pulse(t, 7.2, 1.2); P.handR = t > 7.2 && t < 8.3 ? [40, -40] : null; P.gaze = t < 8.4 ? [0.2, 0.8] : [-0.9, -0.4]; P.mouth = 'closed'; }
    return P;
  }
  if (t < 92.06 || t >= 143.14) {
    if (t < 13 || (t >= 143.14 && t < 145.2)) {
      // yawn and climb into bed (10.9-12.2) / back into bed (143.14-145)
      const a = t < 13 ? 10.9 : 143.6, x0 = t < 13 ? 470 : 700, s0 = t < 13 ? 1 : 0;
      if (t >= 143.14 && t < 143.6) { Object.assign(P, NIGHT); const LX = (tt) => KD10_kf(tt, [[143.14, 760], [143.6, 700]]); Object.assign(P, walk(LX, t, { stride: 26 * 1.3 })); P.lid = 0.5; P.handR = [70, -190]; P.mouth = 'o'; return P; }
      if (t >= 143.6) Object.assign(P, NIGHT);
      const u = K.ease.inOut(KD10_Z(t, a + 0.5, 0.8));
      P.x = K.lerp(x0, BED.x, u); P.y = K.lerp(900, BED.y, u); P.sit = s0 * (1 - u); P.seat = 'bench'; P.lie = u; P.dir = -1;
      if (t < a + 0.6) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.mouth = 'o'; P.lid = 0.6; P.drop = -6; }
      else { P.lid = K.lerp(0.6, 1, KD10_Z(t, t < 13 ? 12.18 : 144.6, 0.4)); P.mouth = 'closed'; }
      P.blanket = u > 0.85 ? K.ease.out(KD10_Z(t, a + 1.15, 0.4)) : 0; P.asleep = P.lid >= 0.99;
      return P;
    }
    // asleep
    Object.assign(P, NIGHT); P.x = BED.x; P.y = BED.y; P.lie = 1; P.dir = -1; P.lid = 1; P.noBlink = true; P.blanket = 1; P.asleep = true; P.mouth = t > 160.78 ? 'smile' : 'closed'; return P;
  }
  Object.assign(P, NIGHT); P.dir = -1;
  // S10 waking
  if (t < 97.3) {
    P.x = BED.x; P.y = BED.y; P.lie = 1; P.lid = 1; P.noBlink = true; P.blanket = 1; P.mouth = 'closed';
    P.brow = 0.6 * pulse(t, 92.2, 0.25) + 0.6 * pulse(t, 92.9, 0.2);
    if (t >= 93.92) { P.mouth = 'frown'; P.brow = 1; P.sq = 1 - 0.1 * pulse(t, 93.92, 0.25) + 0.08 * pulse(t, 94.17, 0.25); }
    if (t >= 94.6) { const u = settleTo(t, 94.6, 0, 1, 0.3, 0.2); P.aR = [K.lerp(0.3, 2.6, u), K.lerp(0.2, 2.9, u)]; P.bump = 1 + 0.3 * Math.sin(t * 12); }
    if (t >= 95.68) { P.lid = 0; P.eyes = 'wide'; P.brow = -0.8; P.mouth = 'o'; P.flash = t < 95.75; }
    return P;
  }
  if (t < 103.84) {
    // spring out of bed and stand at x 520
    const u = K.ease.inOut(KD10_Z(t, 97.5, 0.9)); P.x = K.lerp(BED.x, 520, u); P.y = K.lerp(BED.y, 900, u) - 60 * Math.sin(Math.PI * u) * (u < 1 ? 1 : 0); P.lie = 1 - u; P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.blanket = 1 - KD10_Z(t, 97.3, 0.3);
    P.sq = anticipate(t, 97.3, 0.25, 0.08) * landSquash(t, 98.4, 0.12); P.noBlink = true; P.gaze = [1, 0.3]; P.dir = -1;
    if (t >= 99.02) { P.eyes = 'open'; P.brow = 1; P.mouth = 'frown'; P.x = 520 + tremble(t, 1.5); P.flush = KD10_Z(t, 99.02, 0.6); P.handL = [-30, -80]; P.handR = [30, -80]; P.lean = 0.06; P.gaze = [-0.8, 0.5]; }
    if (t >= 100.0) { P.y = 900 - 14 * pulse(t, 99.85, 0.2); }
    if (t >= 100.32) { P.handR = PERSON_HANDS.cupMouth.R; P.handL = [-30, -80]; P.talk = 0.8; P.tilt = -0.12; P.mouth = 'open'; P.lean = 0; }
    if (t >= 101.3) { P.tilt = 0; P.handR = null; const j = Math.max(pulse(t, 101.54, 0.25), pulse(t, 101.94, 0.25), pulse(t, 102.8, 0.25)); P.handR = [80 + 10 * j, -70 + 30 * j]; P.talk = talk(t, [[101.54, 103.63]], 1); P.mouth = 'frown'; }
    return P;
  }
  // S11 - S14 standing, shouting, pointing
  P.x = 520; P.flush = 1 - KD10_Z(t, 142, 1.2); P.brow = 1; P.mouth = 'frown'; P.gaze = [0.9, 0]; P.dir = -1;
  // v2: startled by the door he steps back toward the headboard, then crosses to the door side and points the servants at the bed
  if (t < 105.2) { P.handR = PERSON_HANDS.cupMouth.R; P.talk = 0.8; P.mouth = 'open'; P.gaze = [1, 0]; P.tilt = -0.08; }
  else if (t < 107.92) { const LX = (tt) => KD10_kf(tt, [[105.2, 520], [105.7, 580]]); Object.assign(P, walk(LX, t, { stride: 26 * 1.3 })); P.dir = -1; P.gaze = [1, 0]; P.mouth = 'o'; P.handL = [-34, -120]; P.handR = [44, -140]; P.sq = anticipate(t, 105.2, 0.15, 0.06); P.flush = 0.6; }
  else { const LX = (tt) => KD10_kf(tt, [[107.92, 580], [109.0, 175]]); Object.assign(P, walk(LX, t, { stride: 26 * 1.3 })); P.dir = t < 109.0 ? -1 : 1; P.gaze = t < 109.0 ? [1, 0] : [0.9, 0.25];
    if (t >= 109.0) { const j = Math.max(pulse(t, 109.0, 0.4), pulse(t, 109.6, 0.4), pulse(t, 110.65, 0.4)); P.handR = [100 + 12 * j, -150 - 8 * j]; P.handL = PERSON_HANDS.hipsHands.L; }
    if (t >= 111.6) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; } }
  // S14: he waits by the bed with crossed arms and watches the window, then the floor search
  if (t >= 116.74) { P.x = 760; P.dir = -1; P.amp = 0; P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.mouth = 'closed'; P.gaze = gazePlan(t, [[0, [0.9, -0.1]], [138.9, [1, -0.45]], [140.9, [0.6, 0.6]]], 0.25); P.tilt = t >= 139.24 && t < 140.4 ? 0.06 : 0; }
  return P;
}
// servants. A tall and eager, B short and stout, 8 frames late
function kd10ServantA(t) {
  const P = { costume: 'servant', pal: { robe: '#bcd3ff', dot: C.blue }, s: 1.42, dir: 1, y: 900, x: -200, lamp: 1, seed: 21 };
  if (t < 105.54 || t >= 146.5) return null;
  if (t < 138.14) {
    // v2: run in, skid to a stop short of the master, bumped from behind by B, then to the head of the bed
    const LX = (tt) => KD10_kf(tt, [[105.54, 60], [106.85, 366]], 'out'); Object.assign(P, walk(LX, t, { stride: 26 * 1.42 }));
    P.eyes = 'wide'; P.lean = 0.12 * P.amp; P.handR = [36, -196]; P.mouth = 'o'; P.gaze = [1, 0.1];
    if (t >= 106.7 && t < 107.12) { P.sq = landSquash(t, 106.85, 0.1, 10); P.lean = -0.14 * pulse(t, 106.7, 0.45); P.amp = 0; }
    if (t >= 107.12 && t < 107.92) { const b = pulse(t, 107.12, 0.5); P.x = 366 + 15 * b; P.amp = 0; P.lean = 0.16 * b; P.sq = 1 - 0.05 * b; P.gaze = t < 107.45 ? [1, 0.1] : [1, 0.4]; P.mouth = 'frown'; P.dir = t < 107.45 ? 1 : -1; P.brow = 0.5; }
    if (t >= 107.92) { const LX2 = (tt) => KD10_kf(tt, [[107.92, 366], [109.2, 880]]); Object.assign(P, walk(LX2, t, { stride: 26 * 1.42 })); P.dir = t < 109.2 ? 1 : -1; P.handR = [64, -215]; P.eyes = 'open'; P.mouth = 'closed'; P.brow = 0; P.gaze = t < 109.2 ? [1, 0.2] : [0.9, 0.5]; P.lean = t < 109.2 ? 0.1 * P.amp : 0; }
    if (t >= 109.7) { P.lean = 0.18; P.handR = [70, -150]; P.gaze = gazePlan(t, [[0, [0.9, 0.6]], [110.4, [0.5, 0.9]], [111.0, [0.9, 0.6]]], 0.4); }
    if (t >= 112.32) { const u = K.ease.out(KD10_Z(t, 112.32, 0.4)) * (1 - KD10_Z(t, 113.5, 0.4)); P.pillow = u; P.handL = [K.lerp(40, 70, u), K.lerp(-140, -206, u)]; P.lean = K.lerp(0.18, 0.1, u); P.gaze = [0.6, 0.85]; P.mouth = 'o'; }
    if (t >= 113.9) { P.handL = null; P.gaze = [0.7, 0.7]; P.mouth = 'closed'; }
    if (t >= 114.2) { const u = K.ease.inOut(KD10_Z(t, 114.32, 0.6)); P.lamp = 0; P.lampFloor = 1; P.lean = 0.32 * u; P.handL = [54, K.lerp(-90, -128, u)]; P.handR = [70, K.lerp(-96, -132, u)]; P.mouth = 'frown'; P.brow = 0.5; P.lift = u * (1 - KD10_Z(t, 116.4, 0.3)); P.gaze = [0.8, 0.8]; P.x = 880; P.dir = -1; P.amp = 0; }
    return P;
  }
  // S14 v2: he walks to the window, the pinched hand held out at arm's length, head leaning back; flick; dusts his hands; shrugs; tiptoes out
  P.lamp = 0; P.lampFloor = 1;
  const LX = (tt) => KD10_kf(tt, [[138.14, 620], [139.0, 470], [140.6, 470], [141.2, 520], [143.14, 520], [143.5, 500], [144.24, 500], [146.3, 90]]); Object.assign(P, walk(LX, t, { stride: 26 * 1.42 }));
  P.dir = -1; P.handR = [104, -150]; P.handL = [-30, -110]; P.tilt = 0.14; P.lid = 0.5; P.mouth = 'frown'; P.gaze = [1, -0.1]; P.lean = -0.05; P.pinchHand = t < 139.3;
  if (t >= 138.9 && t < 139.24) { const u = K.ease.inOut(KD10_Z(t, 138.9, 0.34)); P.handR = [K.lerp(104, 40, u), K.lerp(-150, -200, u)]; P.gaze = [0.6, -0.8]; P.tilt = 0.05; P.lid = 0.3; }
  if (t >= 139.24) { const u = K.ease.out(KD10_Z(t, 139.24, 0.12)); P.handR = [K.lerp(40, 66, u), K.lerp(-200, -204, u)]; P.flick = 1; P.gaze = [0.5, -0.9]; P.tilt = 0; P.lid = 0; }
  if (t >= 140.0) { const c = Math.max(pulse(t, 140.05, 0.18), pulse(t, 140.3, 0.18)); P.flick = 0; P.handL = [-10 + 30 * c, -120]; P.handR = [60 - 30 * c, -122]; P.mouth = 'smile'; P.gaze = [0.6, 0.3]; P.lid = 0.3; }
  if (t >= 140.6) { P.dir = 1; P.handL = null; P.handR = null; P.gaze = [0.9, 0.3]; P.mouth = 'closed'; }
  if (t >= 141.4) { P.dir = 1; P.lean = 0; const u = K.ease.out(KD10_Z(t, 141.4, 0.3)); P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.tilt = 0.1 * Math.sin(KD10_Z(t, 141.5, 0.6) * Math.PI * 3); P.mouth = 'frown'; P.gaze = [0.9, 0.2]; P.sq = 1 - 0.05 * u; }
  if (t >= 143.0) { P.tilt = 0; P.handL = null; P.handR = null; P.mouth = 'closed'; P.gaze = [0.9, 0]; }
  if (t >= 144.24) { P.dir = -1; P.handR = PERSON_HANDS.hush.R; P.lean = -0.05; P.y = 900 - 6 * Math.abs(Math.sin(t * 6)); P.gaze = [1, 0.2]; }
  return P;
}
function kd10ServantB(t) {
  const P = { costume: 'servant', pal: { robe: '#e8e1cc', dot: '#b9b4c6', beard: C.black }, s: 1.15, dir: 1, y: 900, x: -200, lamp: 1, seed: 22, mouth: 'o' };
  if (t < 106.04 || t >= 146.5) return null;
  if (t < 138.14) {
    // v2: arrives 8 frames late and bumps into A's back, rebounds; then to the foot of the bed
    const LX = (tt) => KD10_kf(tt, [[106.04, 30], [107.12, 264], [107.4, 214], [107.7, 200]]); Object.assign(P, walk(LX, t, { stride: 20 * 1.15 }));
    P.handL = [20, -140]; P.handR = [36, -140]; P.lean = 0.08 * P.amp; P.gaze = [1, 0];
    if (t >= 107.12 && t < 107.92) { P.sq = 1 - 0.12 * pulse(t, 107.12, 0.25); P.gaze = [0.6, -0.9]; P.brow = -0.6; P.mouth = 'frown'; P.lean = -0.1 * pulse(t, 107.12, 0.4); }
    if (t >= 107.92) { const LX2 = (tt) => KD10_kf(tt, [[108.1, 200], [109.1, 330]]); Object.assign(P, walk(LX2, t, { stride: 20 * 1.15 })); P.handL = [24, -190]; P.handR = [40, -190]; P.gaze = [0.8, 0.2]; P.mouth = 'closed'; P.brow = 0; }
    if (t >= 109.1) { P.dir = 1; P.gaze = [0.8, 0.4]; }
    if (t >= 111.24 && t < 113.1) { P.gaze = t < 112.0 ? [0.3, -1] : [0.6, 0.9]; P.lean = t < 112.0 ? -0.05 : 0.15; P.y = 900 - (t >= 112.0 ? 10 * pulse(t, 112.0, 0.8) : 0); P.mouth = 'o'; }
    if (t >= 113.26 && t < 113.9) { const k = Math.sin((t - 113.26) * 18); P.handL = [52, -126 + 26 * k]; P.handR = [70, -130 + 26 * k]; P.y = 900 - 4 * Math.abs(k); P.shakeBlanket = 1; P.gaze = [0.8, 0.5]; P.lamp = 0; P.lampFloor = 1; P.lean = 0.08; }
    if (t >= 113.9 && t < 114.5) { P.lamp = 0; P.lampFloor = 1; P.handL = [30, -110]; P.handR = [44, -110]; P.lean = 0.25 * pulse(t, 113.9, 0.6); P.gaze = [0.1, 1]; P.mouth = 'o'; }
    if (t >= 114.5) { P.lamp = 1; P.handL = [24, -150]; P.handR = [40, -150]; P.gaze = [0.8, 0.5]; }
    if (t >= 115.98) { P.lean = 0.2; P.handL = [60, -130]; P.handR = [76, -130]; P.gaze = [1, 0.6]; P.x = 330; }
    return P;
  }
  // S14 v2: apart at the foot of the bed with his lamp; turns to the window 8 frames late; floor search; steps aside; out
  const LX = (tt) => KD10_kf(tt, [[138.14, 300], [143.14, 300], [143.5, 262], [144.24, 262], [146.3, 40]]); Object.assign(P, walk(LX, t, { stride: 20 * 1.15 })); P.handL = [24, -150]; P.handR = [40, -150]; P.gaze = [0.8, 0.2]; P.mouth = 'closed';
  if (t >= 138.4 && t < 140.48) { P.dir = t < 139.5 ? 1 : -1; P.gaze = t < 139.5 ? [0.9, -0.2] : [0.6, -0.7]; P.mouth = t >= 139.5 ? 'o' : 'closed'; }
  if (t >= 140.48 && t < 141.92) { const u = K.ease.out(KD10_Z(t, 140.48, 0.4)); P.dir = 1; P.kneel = u; P.lean = 0.45 * u; P.handR = [90, -60]; P.handL = [70, -40]; P.gaze = [1, 0.8]; P.mouth = 'o'; P.drop = 10 * u; }
  if (t >= 141.92) { const u = K.ease.out(KD10_Z(t, 141.92, 0.3)); P.kneel = 1 - u; P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.tilt = -0.08 * Math.sin(KD10_Z(t, 142.1, 0.5) * Math.PI * 2); P.mouth = 'frown'; P.gaze = [0.7, 0.2]; }
  if (t >= 143.2) { P.tilt = 0; P.handL = [24, -150]; P.handR = [40, -150]; P.lamp = 1; }
  if (t >= 144.24) { P.dir = -1; P.y = 900 - 5 * Math.abs(Math.sin(t * 6 + 1)); P.gaze = [1, 0.2]; P.lamp = 1; }
  return P;
}
// the flea at room scale (S3, S16): position on the window sill etc.
function kd10FleaRoom(t) {
  const P = { kind: 'flea', s: 0.13, dir: 1, ant: 0.5, lid: 0.35, mouth: 'smirk', bundle: true, x: 250, y: 470 };
  if (t < 26.9) {
    const hops = [[21.44, 0.45, 236, 290], [22.0, 0.45, 290, 340], [22.6, 0.5, 340, 392]];
    P.x = 236; P.alpha = KD10_Z(t, 21.2, 0.2);
    for (const [a, d, x0, x1] of hops) { if (t >= a && t < a + d) { const [x, h] = hop(t, a, d, x0, x1, 26); P.x = x; P.y = 470 - h; P.air = 1; } else if (t >= a + d) P.x = x1; }
    P.sq = anticipate(t, 21.3, 0.14, 0.2) * landSquash(t, 21.89, 0.2) * landSquash(t, 22.45, 0.2) * landSquash(t, 23.1, 0.2);
    if (t >= 26.4) { const u = KD10_Z(t, 26.4, 0.5); P.x = K.lerp(392, 600, u); P.y = K.lerp(470, 760, u) - 160 * Math.sin(Math.PI * u); P.air = 1; }
    return P;
  }
  if (t < 159.94) return null;
  // S16: crack -> bed foot -> sill, sits, last look, out
  const hops = [[159.94, 0.5, [480, 958], [330, 840]], [160.6, 0.5, [330, 840], [300, 770]], [161.15, 0.45, [300, 770], [360, 470]]];
  P.bundle = false; P.x = 480; P.y = 958; P.dir = -1; P.lid = 0.4; P.ant = -0.6; P.s = 0.2;
  for (const [a, d, p0, p1] of hops) { if (t >= a && t < a + d) { const u = (t - a) / d; P.x = K.lerp(p0[0], p1[0], u); P.y = K.lerp(p0[1], p1[1], u) - 70 * Math.sin(Math.PI * u); P.air = 1; } else if (t >= a + d) { P.x = p1[0]; P.y = p1[1]; P.air = 0; } }
  if (t >= 161.6) { P.dir = -1; P.crouch = 0.3; }
  if (t >= 162.9) { P.dir = 1; }
  if (t >= 165.1) { P.dir = -1; }
  if (t >= 165.83) { const u = KD10_Z(t, 165.83, 0.6); P.x = K.lerp(360, 330, u); P.y = 470 - 110 * Math.sin(Math.PI * Math.min(u, 0.6) / 1.2); P.s = 0.2 * (1 - 0.8 * u); P.alpha = 1 - K.clamp((u - 0.6) / 0.4); P.air = 1; }
  return P;
}

// ======================================================================
// insects with the shared acting rules: blink, lean, nook darkness
function kd10DrawInsect(ctx, t, P) {
  if (!P) return; const Q = { ...P };
  if (!Q.noBlink && !Q.eyesOnly) Q.lid = Math.max(Q.lid || 0, blink(t, Q.seed || 1));
  if (Q.drool && Q.drool > 0) Q.tongue = false;
  kd10Insect(ctx, Q);
  if (Q.drool > 0 && !Q.air) { const d = Q.drool, hx = Q.x + 40 * Q.s * Q.dir, hy = Q.y - 110 * Q.s; ctx.save(); ctx.globalAlpha = 0.9; shape(ctx, [[hx, hy], [hx + 5, hy + 10 * d], [hx, hy + 16 * d], [hx - 5, hy + 10 * d], [hx, hy]], '#9cc4ff', { lw: 2.5, seed: 4 }); ctx.restore(); }
}
// louse in the nook: a grey-blue shade inside the nook (v2: about 35 percent lighter) with a pale rim light, eyes on top
function kd10DrawLouse(ctx, t, L, lit = 0) {
  const Q = { ...L }; if (!Q.noBlink) Q.lid = Math.max(Q.lid || 0, blink(t, 3));
  kd10Insect(ctx, Q);
  const dark = K.clamp(L.depth) * (1 - lit);
  if (dark > 0.02) { ctx.save(); ctx.beginPath(); K.poly(ctx, [[100, 905], [110, 838], [150, 812], [200, 806], [250, 818], [278, 850], [286, 905]], true); ctx.clip(); ctx.globalAlpha = 0.6 * dark; ctx.fillStyle = '#3d4f8f'; ctx.fillRect(60, 760, 260, 160);
    // rim light on the back and head
    ctx.globalAlpha = 0.9 * dark; ctx.translate(Q.x, Q.y); ctx.scale((Q.dir || 1) * Q.s, Q.s * (Q.sq || 1)); ctx.strokeStyle = '#c4d2f5'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.ellipse(-18, -50, 53, 34, 0, 1.12 * Math.PI, 1.78 * Math.PI); ctx.stroke(); ctx.save(); ctx.translate(44, -58); ctx.rotate(Q.headRot || 0); ctx.translate(-44, 58); ctx.beginPath(); ctx.arc(46, -56, 22, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); ctx.restore(); ctx.restore();
    if (dark > 0.45) { const ex = Q.x + 50 * Q.s * (Q.dir || 1), ey = Q.y - 54 * Q.s; ctx.save(); ctx.translate(ex, ey); ctx.rotate(Q.headRot || 0); ctx.scale(Q.s, Q.s); for (const [dx, dy] of [[-10, -8], [10, -7]]) eye2(ctx, dx, dy, Q.eyes || 'open', (Q.gaze || [0.8, 0])[0], (Q.gaze || [0.8, 0])[1], Q.lid || 0, '#8d98bf', Q.wet); if (Q.brow) for (const [dx, sd] of [[-10, -1], [10, 1]]) kd10Brow(ctx, dx, -25, Q.brow, sd, 7); ctx.restore(); } }
}
function kd10ThreadDraw(ctx, t, L) {
  const T = kd10Thread(t); ctx.save(); ctx.translate(T.x, T.y); ctx.rotate(T.rock * 0.3);
  const k = T.over, len = K.lerp(40, 120, k), amp = K.lerp(16, 8, k), tr = L && L.under > 0.5 && t > 132.8 && t < 138.14 ? tremble(t, 2, 11) : 0;
  ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24, x = -len / 2 + u * len, y = -amp * Math.sin(u * Math.PI * (k > 0.5 ? 1 : 3)) * (k > 0.5 ? 1.2 : 0.6) + tr; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
}

// ======================================================================
// WORLDS
function kd10DrawBed(ctx, t, o = {}) {
  const L = kd10Louse(t), F = kd10Flea(t);
  // giant face state
  let lid = 1, brow = 0, smile = 0, wide = false, px = 0, frown = 0;
  if (t >= 18.48 && t < 20.2) smile = K.ease.inOut(KD10_Z(t, 18.48, 0.3));
  if (t >= 75.0 && t < 84.34) lid = kfn(t, [[75.0, 1], [75.4, 0.5], [76.2, 0.8], [77.0, 1]]);
  if (t >= 84.34 && t < 92.06) lid = kfn(t, [[84.34, 0.7], [85.2, 0.9], [86.0, 0.8]]);
  if (t >= 91.14 && t < 92.06) { frown = 1; brow = 0.5; }
  const lampA = t >= 116.74 && t < 120.9 ? [K.lerp(1100, 660, K.ease.inOut(KD10_Z(t, 116.74, 2.6))), 840, 230] : null;
  const lampB = t >= 125.04 && t < 138.14 ? [K.lerp(900, 190, K.ease.inOut(KD10_Z(t, 128.6, 1.4))), 860, 210, K.clamp(KD10_Z(t, 126.5, 1))] : null;
  const faceOn = !(t >= 116.74 && t < 138.14) && !(t >= 154.4 && t < 157.2);
  kd10BedView(ctx, t, { face: faceOn ? { lid, brow, smile, wide, px, frown } : false });
  if (!faceOn && t >= 116.74 && t < 138.14) { // the servant's giant eye and lamp in the background
    if (t < 120.9) { kd10GiantEye(ctx, 760, 420, 230, { px: Math.sin(t * 1.3) * 0.8, alpha: K.clamp(KD10_Z(t, 117.2, 0.5)) * 0.9 }); kd10OilLamp(ctx, 950, 560, 3.2, 0.1 * Math.sin(t * 2), t); }
    else if (t >= 134.22) { const u = K.ease.out(KD10_Z(t, 134.22, 0.5)); const px = t < 135.34 ? kfn(t, [[134.4, -0.9], [134.8, 0.8], [135.1, 0.2], [135.34, -0.5]]) : -0.5; kd10GiantEye(ctx, 420, K.lerp(80, 380, u), 240, { px, wide: t >= 135.34, brow: t >= 135.34 ? 0.6 : 0 }); }
  }
  // giant arm (absent in the empty-nook insert as well)
  const shift = t >= 75.0 && t < 116.74 ? 70 * settleTo(t, 75.0, 0, 1, 0.9, 0.08) : 0;
  const finger = swing(t, 17.3, 1, 1.6, 3) * (t < 20 ? 1 : 0), rigid = t >= 91.5 && t < 116.74 ? 1 : 0;
  const dimple = t >= 88.76 && t < 92.06 ? [780 + shift, 10 * Math.exp(-(t - 88.76) * 6) + (t >= 90.1 ? 6 : 0)] : null;
  if (!(t >= 116.74 && t < 138.14) && !(t >= 154.4 && t < 157.2)) kd10GiantArm(ctx, { shift, finger: K.clamp(finger), rigid, dimple, bump: t >= 90.1 && t < 116.74 ? 0.5 + 0.5 * Math.sin(t * 10) : 0 });
  if (lampA) kd10LampWash(ctx, ...lampA);
  if (lampB) kd10LampWash(ctx, ...lampB);
  // the bundle on the blanket (dropped 32.64, pillow 43.4, left behind)
  if (t >= 32.9) { const bx = t < 37.6 ? 470 : K.lerp(470, 470, 0), st = swing(t, 32.9, 3, 2, 3); if (!(t >= 75.6 && t < 84.34 && false)) kd10BindleStick(ctx, bx, 900, 0.9, t > 155.7 && t < 157.2 ? -3 * KD10_Z(t, 155.7, 0.4) : st); }
  // the louse, nook lip, thread
  const lit = lampB ? K.clamp(1 - Math.abs(lampB[0] - 190) / 160) * lampB[3] : 0;
  if (!(t >= 154.4 && t < 157.2)) kd10DrawLouse(ctx, t, L, lit);
  kd10NookLip(ctx, lit);
  kd10ThreadDraw(ctx, t, L);
  if (F.world === 'bed' && !(t >= 154.4 && t < 157.2) && t >= 26.9) { kd10DrawInsect(ctx, t, F); if (F.y > 900 && t > 119.9) { /* falling past the edge */ } }
  // dust falling from the fold when the servants search above
  if (t >= 125.04 && t < 127) for (const [a, x] of [[125.3, 170], [125.9, 230], [126.25, 200]]) { const d = t - a; if (d > 0 && d < 0.9) { ctx.save(); ctx.globalAlpha = 1 - d / 0.9; ctx.fillStyle = '#f2d27a'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x + i * 9 - 14, 800 + d * d * 300 + i * 8, 4, 0, 7); ctx.fill(); } ctx.restore(); } }
  // v2 the capture: a giant fingertip and thumb tip (each wider than her) come down from the top; their flat shadow slides over the nook.
  // They stop about one body height above her: no contact is shown (the cut to the room comes at 138.14).
  if (t >= 136.64 && t < 138.14) { const u = K.ease.out(KD10_Z(t, 136.64, 1.0)), yb = K.lerp(330, 735, u);
    ctx.save(); ctx.globalAlpha = 0.38 * u; ctx.fillStyle = '#0a1230'; ctx.beginPath(); ctx.ellipse(160, 860, K.lerp(60, 190, u), K.lerp(30, 70, u), 0, 0, 7); ctx.fill(); ctx.restore();
    kd10Tips(ctx, 152, yb, K.lerp(120, 70, u)); }
  if (o.dip) {} // reserved
}
function kd10DrawFloor(ctx, t) {
  const F = kd10Flea(t);
  const lampF = t >= 140.4 && t < 142.4 ? [K.lerp(300, 1000, KD10_Z(t, 140.5, 1.8)), 950, 200, 1] : null;
  kd10FloorView(ctx, t, { lamp: lampF });
  // the flea: clip below the tile line except inside the crack slot
  const drawF = (c) => { if (F.eyesOnly) { c.save(); c.translate(F.x, F.y); c.scale(1.1, 1.1); for (const ex of [-10, 12]) eye2(c, ex, -20, F.wink ? 'open' : F.eyes || 'open', F.gaze[0], F.gaze[1], F.wink && ex < 0 ? 0.95 : Math.max(F.lid || 0, blink(t, 5)), KD10_COL.night, false); c.restore(); } else kd10DrawInsect(c, t, F); };
  if (F.eyesOnly || F.dive || F.climb) { // in the crack: above the crack's centre line he is in the open, below it only inside the fissure (and in shadow)
    ctx.save(); ctx.beginPath(); ctx.rect(-50, -400, 1100, 1350); ctx.clip(); drawF(ctx); ctx.restore();
    ctx.save(); ctx.beginPath(); K.poly(ctx, KD10_CRACK, true); ctx.clip(); drawF(ctx); if (!F.eyesOnly) { ctx.globalAlpha = 0.55; ctx.fillStyle = KD10_COL.night; ctx.fillRect(560, 950, 200, 40); } ctx.restore(); }
  else drawF(ctx);
  if (t >= 121.94 && t < 122.6) dustBurst(ctx, 300, 896, t - 121.94, 8, 6, 16, 70, 0.55, 3);
  if (F.dust) for (let i = 0; i < 4; i++) { const u = ((t * 1.5 + i / 4) % 1); ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = '#f2d27a'; ctx.beginPath(); ctx.arc(F.x - 30 + i * 20, F.y - 50 - u * 40, 4, 0, 7); ctx.fill(); ctx.restore(); }
  // a Z drifting high above (the man asleep)
  if (t >= 150.44 && t < 154.4) zzz(ctx, 360, 160, t, 0.2);
}
function kd10RoomNight(t) { if (t < 8.2) return 0; if (t < 10.6) return K.ease.inOut(KD10_Z(t, 8.2, 2.4)); return 1; }
// v2: an offscreen layer for the standing actors so they can be dimmed for the night on their own (the lamp light then goes under them)
function kd10ActorLayer(ctx, fn, tint) {
  const cv = ctx.canvas; let L = kd10ActorLayer.c;
  if (!L || L.width !== cv.width || L.height !== cv.height) { L = kd10ActorLayer.c = document.createElement('canvas'); L.width = cv.width; L.height = cv.height; }
  const lc = L.getContext('2d'); lc.setTransform(1, 0, 0, 1, 0, 0); lc.clearRect(0, 0, L.width, L.height); lc.setTransform(ctx.getTransform()); fn(lc);
  if (tint > 0.01) { lc.setTransform(1, 0, 0, 1, 0, 0); lc.globalCompositeOperation = 'source-atop'; lc.globalAlpha = tint; lc.fillStyle = KD10_COL.night; lc.fillRect(0, 0, L.width, L.height); lc.globalCompositeOperation = 'source-over'; lc.globalAlpha = 1; }
  return L;
}
const KD10_FLOORLAMP_A = [940, 898], KD10_FLOORLAMP_B = [236, 898];
// held-lamp grip in world space (from the hand target; the person solver keeps the hand within reach)
function kd10Grip(S) { if (S.hands) { const h = S.hands[1]; return [S.x + (S.dir || 1) * S.s * h[0], S.y + S.s * h[1]]; } const h = S.handR || [30, -140]; return [S.x + (S.dir || 1) * S.s * h[0], S.y + S.s * h[1]]; }
function kd10BlanketShake(ctx, t, B) { // B holds the hem and shakes it: two ripples run along the blanket
  const [hx, hy] = kd10Grip(B), pts = [], n = 24;
  for (let i = 0; i <= n; i++) { const u = i / n, x = K.lerp(hx - 10, 600, u), y = K.lerp(hy, 772, Math.pow(u, 0.7)) - 22 * Math.sin(u * Math.PI * 3 - (t - 113.26) * 16) * (1 - u * 0.6); pts.push([x, y]); }
  pts.push([600, 812], [300, 812], [300, 790], [hx - 30, hy + 30], pts[0]);
  shape(ctx, pts, C.red, { lw: 5, seed: 71, dot: C.yellow, pitch: 9, rad: 0.25, da: 0.6 });
}
function kd10DrawRoom(ctx, t) {
  const nt = kd10RoomNight(t), u = t < 8.2 ? 0.27 : t < 10.6 ? K.lerp(0.27, 0.78, KD10_Z(t, 8.2, 2.4)) : 0.78;
  ctx.drawImage(kd10RoomBake(), 0, 0, 1000, 1230);
  kd10Window(ctx, u, t);
  // tassels idle
  for (const [x, ph] of [[60, 0], [500, 1.3], [940, 2.1]]) { const a = 0.04 * Math.sin(t * 1.6 + ph); ctx.save(); ctx.translate(x, 150); ctx.rotate(a); seg(ctx, 0, 0, 0, 40, 4, KD10_COL.gold, 2); shape(ctx, [[-10, 40], [10, 40], [14, 72], [-14, 72], [-10, 40]], KD10_COL.gold, { lw: 3.5, seed: 7 }); ctx.restore(); }
  // door
  const door = t >= 105.2 && t < 146.3 ? settleTo(t, 105.2, 0, 1, 0.3, 0.15) : t >= 146.3 && t < 147 ? 1 - KD10_Z(t, 146.3, 0.3) : 0;
  townDoor(ctx, 40, 180, 520, 900, door, { arch: 'round', inside: (c) => { c.fillStyle = C.yellow; c.fillRect(40, 520, 140, 380); } });
  if (door > 0.05) { ctx.save(); ctx.globalAlpha = 0.45 * K.clamp(door); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.moveTo(40, 900); ctx.lineTo(180, 900); ctx.lineTo(420, 1230); ctx.lineTo(60, 1230); ctx.fill(); ctx.restore(); }
  const M = kd10Man(t), A = kd10ServantA(t), Bs = kd10ServantB(t);
  // mattress corner lifted by servant A at the head of the bed (114.32-116.74): the piping bends up toward him
  const lift = A && A.lift ? 38 * A.lift : 0;
  if (lift > 0) { ctx.save(); ctx.fillStyle = KD10_COL.night; ctx.fillRect(560, 770 - lift, 300, 70 + lift); ctx.restore();
    const ly = (x) => -lift * Math.pow(K.clamp((x - 560) / 300), 1.6), top = [], bot = []; for (let x = 560; x <= 860; x += 20) { top.push([x, 770 + ly(x)]); bot.push([x, 838 + ly(x) * 0.8]); }
    shape(ctx, [...top, ...bot.reverse(), top[0]], C.white, { lw: 5, seed: 57, dot: C.blue, pitch: 8, rad: 0.25, da: 0.5 });
    ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 8; ctx.beginPath(); top.forEach(([x, y], i) => (i ? ctx.lineTo(x, y + 20) : ctx.moveTo(x, y + 20))); ctx.stroke(); ctx.restore();
    shape(ctx, ell(610, 791 + ly(610), 11, 7, 12), KD10_COL.night, { lw: 3, seed: 58 }); }
  // pillows (A lifts the near pillow up and peers under it at 112.32)
  const pil = A && A.pillow ? A.pillow : 0;
  ctx.save(); ctx.translate(-30 * pil, -170 * pil); ctx.rotate(-0.08 * pil); kd10Pillows(ctx); ctx.restore();
  if (pil > 0) feather(ctx, t, { t0: 112.6, t1: 114.0, a: [760, 600], b: [720, 896] });
  const inBed = M.lie > 0.5;
  const shaking = Bs && Bs.shakeBlanket;
  const drawMan = (c) => { const Q = { ...M }; if (!Q.noBlink && Q.lid == null) Q.lid = blink(t, 11); person(c, Q); kd10ManExtras(c, t, M); };
  if (inBed) drawMan(ctx);
  if (M.blanket != null && M.blanket > 0.02) { ctx.save(); kd10Blanket(ctx, { cover: M.blanket, heave: M.asleep ? 6 * Math.sin(t * 1.9) : 0 }); ctx.restore(); }
  else if (t >= 97.3 && t < 143.6) { if (!shaking) kd10Blanket(ctx, { cover: 0 }); }
  else if (t < 11.8) kd10Blanket(ctx, { cover: 0.85 });
  if (M.asleep && inBed) zzz(ctx, 800, 650, t, 0.1);
  const floorLamps = []; if (t >= 114.32 && t < 147.44) floorLamps.push(KD10_FLOORLAMP_A); if (Bs && Bs.lampFloor) floorLamps.push(KD10_FLOORLAMP_B);
  const drawActors = (c) => { if (!inBed) drawMan(c); if (shaking) kd10BlanketShake(c, t, Bs); for (const S of [Bs, A]) if (S) { person(c, S); kd10ServantExtras(c, t, S); } };
  const tintAll = (k) => { if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); K.poly(ctx, townArchPts(250, 450, 250, 470, 'round').slice().reverse(), true); ctx.clip('evenodd'); ctx.globalAlpha = k; ctx.fillStyle = KD10_COL.night; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); };
  const lampLit = t >= 105.4 && t < 146.6;
  if (lampLit) {
    // v2 order: set -> night tint -> lamp light (lights wall, bed and floor) -> actors (own lighter tint) -> lamps in hand
    const layer = kd10ActorLayer(ctx, drawActors, nt * K.lerp(0.42, 0.16, KD10_Z(t, 105.4, 0.8)));
    tintAll(nt * 0.5);
    if (door > 0.05) { ctx.save(); ctx.globalAlpha = 0.35 * door; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.moveTo(40, 900); ctx.lineTo(180, 900); ctx.lineTo(420, 1230); ctx.lineTo(60, 1230); ctx.fill(); ctx.restore(); }
    const r = t < 107.92 ? 130 : K.lerp(130, 190, KD10_Z(t, 107.92, 0.5));
    for (const S of [Bs, A]) if (S && S.lamp) { const [gx, gy] = kd10Grip(S); kd10LampWash(ctx, gx + 48, gy - 6, r, 1); }
    for (const [fx, fy] of floorLamps) kd10LampWash(ctx, fx + 50, fy - 10, 150, 1);
    if (Bs && t >= 140.48 && t < 142) kd10LampWash(ctx, K.lerp(380, 600, KD10_Z(t, 140.48, 1.4)), 960, 140, 1);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(layer, 0, 0); ctx.restore();
    for (const S of [Bs, A]) if (S && S.lamp && S.hands) { const [gx, gy] = kd10Grip(S); kd10OilLamp(ctx, gx, gy + 4, 1.1, swing(t, 107.0, 0.4, 1.4, 1.5) + swing(t, 107.12, 0.35, 1.6, 2), t); }
    for (const [fx, fy] of floorLamps) kd10OilLamp(ctx, fx, fy, 1.1, 0, t);
  } else {
    drawActors(ctx);
    tintAll(nt * 0.42);
    if (door > 0.05 && nt > 0) { ctx.save(); ctx.globalAlpha = 0.35 * door; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.moveTo(40, 900); ctx.lineTo(180, 900); ctx.lineTo(420, 1230); ctx.lineTo(60, 1230); ctx.fill(); ctx.restore(); }
  }
  // bump dust puff (B into A at 107.12)
  if (t >= 107.12 && t < 107.8) dustBurst(ctx, 290, 860, t - 107.12, 7, 6, 14, 60, 0.5, 3);
  const FR = kd10FleaRoom(t); if (FR) kd10Insect(ctx, FR);
  // sparkle on the bed (25.96, 163.72)
  for (const a of [25.96, 163.72]) if (t >= a && t < a + 0.9) { const k = Math.sin(Math.PI * (t - a) / 0.9); kd10Twinkle(ctx, 640, 742, 26 * k, 1); kd10Twinkle(ctx, 866, 560, 18 * k, 1); }
  // the flick: a small grey dot arcs up out of the window; a twinkle outside
  if (t >= 139.24 && t < 141.0) { const v = KD10_Z(t, 139.24, 0.45), [hx, hy] = A ? kd10Grip(A) : [385, 607];
    if (v < 1) { ctx.save(); ctx.globalAlpha = 1 - 0.5 * v; const dx = (w) => K.lerp(hx, 300, w), dy = (w) => K.lerp(hy - 10, 300, w) - 90 * Math.sin(Math.PI * w);
      ctx.strokeStyle = C.white; ctx.lineWidth = 4; ctx.setLineDash([6, 8]); ctx.beginPath(); for (let i = 0; i <= 10; i++) { const w = Math.max(0, v - 0.35) + i / 10 * Math.min(v, 0.35); i ? ctx.lineTo(dx(w), dy(w)) : ctx.moveTo(dx(w), dy(w)); } ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = KD10_COL.louse; ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(dx(v), dy(v), 10 - 4 * v, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
    if (t >= 139.7) kd10Twinkle(ctx, 300, 300, 22 * Math.sin(Math.PI * KD10_Z(t, 139.7, 1.2)), 1); }
  if (t >= 165.83 && t < 167.6) kd10Twinkle(ctx, 300, 296, 14 * Math.sin(Math.PI * KD10_Z(t, 166.1, 1.5)), 1);
  // white flash on the eye snap
  if (M.flash) { ctx.save(); ctx.globalAlpha = 0.7; ctx.fillStyle = C.white; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
}
function kd10ManExtras(ctx, t, M) {
  const s = M.s, dir = M.dir || 1, H = M.hands || [[0, 0], [0, 0]], W = (h) => [M.x + dir * s * h[0], M.y + s * h[1]];
  if (M.purse) { const [x, y] = W(H[1]); const py = y - (M.purseY || 0); shape(ctx, [[x - 14, py - 4], [x + 14, py - 4], [x + 18, py + 22], [x - 18, py + 22], [x - 14, py - 4]], '#b5651d', { lw: 4, seed: 191, dot: C.yellow, pitch: 5, rad: 0.3 }); shape(ctx, ell(x, py - 8, 8, 5, 10), C.yellow, { lw: 3, seed: 192 });
    if (M.purseY > 30) for (let i = 0; i < 3; i++) kd10Twinkle(ctx, x + (i - 1) * 26, py - 30 - i * 8, 9, 1); }
  if (M.flush > 0 && M.lie < 0.5) { const hy = M.y + s * (-195 + (M.drop || 0)); ctx.save(); ctx.globalAlpha = 0.55 * K.clamp(M.flush); ctx.fillStyle = dotPat(ctx, C.red, 6, 0.42); ctx.beginPath(); ctx.ellipse(M.x, hy + 20 * s - 20 * s * (1 - K.clamp(M.flush)), 34 * s, 22 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (M.bump) { const [x, y] = W(H[1]); shape(ctx, ell(x - 8, y + 26, 9 * M.bump, 7 * M.bump, 12), C.red, { lw: 3, seed: 193 }); }
}
function kd10ServantExtras(ctx, t, S) {
  const s = S.s, dir = S.dir || 1, H = S.hands || [[0, 0], [0, 0]], W = (h) => [S.x + dir * s * h[0], S.y + s * h[1]];
  if (S.pinchHand) { const [x, y] = W(H[1]); ctx.save(); ctx.fillStyle = KD10_COL.louse; ctx.strokeStyle = C.black; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + dir * 10, y - 4, 4, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
}

// ======================================================================
// LENS contents
function kd10SillView(ctx, t) {   // close-up on the window sill for the S3 lens (lens-local coordinates, radius 170)
  ctx.fillStyle = '#0b1a4a'; ctx.fillRect(-200, -200, 400, 400); ctx.fillStyle = dotPat(ctx, '#1d3a8f', 10, 0.3); ctx.fillRect(-200, -200, 400, 160);
  moon(ctx, -110, -90, 50); for (const [x, y] of [[60, -120], [110, -60], [20, -40]]) kd10Twinkle(ctx, x, y, 6, 0.8);
  shape(ctx, [[-220, 60], [220, 60], [220, 100], [-220, 100], [-220, 60]], KD10_COL.gold, { lw: 6, seed: 82 });
  const F = kd10FleaRoom(t); if (!F) return; const Q = { ...F, x: (F.x - 350) * 2.2, y: 60 + (F.y - 470) * 2.2, s: 0.9 };
  Q.lid = 0.35; Q.mouth = 'smirk'; Q.gaze = [0.8, 0]; Q.ant = 0.4; Q.bsw = swing(t, 22.5, 0.4, 2, 2);
  if (t >= 23.16) { Q.arm = [40, -150]; Q.gaze = gazePlan(t, [[0, [-1, 0.2]], [23.5, [0.2, 0.3]], [23.9, [1, 0.3]]], 0.07); Q.headRot = Q.gaze[0] * 0.1; }
  if (t >= 24.4) Q.arm = null;
  if (t >= 24.58) { Q.mouth = 'yawn'; Q.lid = 0.7; Q.sq = 0.93; Q.bsw = 0.3; }
  if (t >= 25.2) { Q.mouth = 'closed'; Q.lid = 0.6; }
  if (t >= 25.96) { Q.eyes = 'wide'; Q.lid = 0; Q.ant = 1; Q.gaze = [0.5, 0.8]; Q.mouth = t < 26.36 ? 'o' : 'grin'; Q.dir = 1; }
  kd10DrawInsect(ctx, t, { ...Q, seed: 5, noBlink: t >= 25.96 });
}

// v2: lens view of the pinched louse held between two fingertips (lens-local, radius 165)
function kd10HeldView(ctx, t) {
  ctx.fillStyle = '#16245e'; ctx.fillRect(-200, -200, 400, 400); ctx.fillStyle = dotPat(ctx, '#1d3a8f', 10, 0.3); ctx.fillRect(-200, -200, 400, 400);
  const sw = 0.12 * Math.sin(t * 7);
  ctx.save(); ctx.rotate(sw);
  kd10Insect(ctx, { kind: 'louse', x: -20, y: 95, s: 0.8, dir: 1, eyes: 'wide', wet: true, brow: -0.8, mouth: 'o', gaze: KD10_CAMG, ant: -0.6, antW: 0.2 * Math.sin(t * 13), ph: t * 14, amp: 1, sq: 0.95 });
  ctx.save(); ctx.scale(0.5, 0.5); kd10Tips(ctx, 20, 70, 30); ctx.restore();
  ctx.restore();
}
function kd10EndFlea(t) {
  const P = { kind: 'flea', x: 0, y: 92, s: 0.85, dir: -1, ant: -0.4, lid: 0.5, mouth: 'closed', bundle: false, seed: 5, brow: -0.3 };
  if (t < 162.0) { const u = KD10_Z(t, 161.76, 0.24); P.x = K.lerp(170, 0, u); P.y = K.lerp(-120, 92, u * u); P.air = 1; P.ant = 0.2; return P; }
  P.sq = landSquash(t, 162.0, 0.25, 9);
  if (t >= 162.72) { const tf = turnFlip(t, [[0, -1], [162.85, 1]], 0.6); P.dir = tf.dir; P.sq *= 1 - 0.05 * tf.tuck; P.lid = 0.5; P.ant = -0.6; P.gaze = [0.8, 0.1]; }
  if (t >= 163.72) { P.gaze = [0.95, 0.35]; P.lid = 0.25; P.noBlink = true; P.eyes = 'open'; P.antW = swing(t, 163.72, 0.15, 2, 3); }
  if (t >= 164.42) { P.noBlink = false; P.lid = 0.45; P.gaze = [0.7, 0.2]; }
  if (t >= 164.68) { P.ant = -1; P.lid = Math.max(0.5, pulse(t, 164.72, 0.5)); P.noBlink = true; const tf = turnFlip(t, [[0, 1], [165.2, -1]], 0.4); P.dir = tf.dir; P.gaze = [0.8, -0.1]; }
  if (t >= 165.58) { P.crouch = K.ease.inOut(KD10_Z(t, 165.58, 0.25)); P.sq = anticipate(t, 165.58, 0.25, 0.15); P.lid = 0.2; P.ant = -0.3; }
  if (t >= 165.83) { const u = KD10_Z(t, 165.83, 0.4); P.crouch = 0; P.sq = 1.1; P.air = 1; P.x = K.lerp(0, -330, u); P.y = 92 - 230 * Math.sin(Math.PI * Math.min(1, u * 0.75)) ; P.ant = 0.6; P.antW = -0.4; if (u >= 1) P.gone = true; }
  return P;
}
function kd10EndSillView(ctx, t) {   // lens-local, radius 200
  ctx.fillStyle = '#0b1a4a'; ctx.fillRect(-230, -230, 460, 460); ctx.fillStyle = dotPat(ctx, '#1d3a8f', 10, 0.3); ctx.fillRect(-230, -230, 460, 330);
  moon(ctx, 0, -40, 84); for (const [x, y] of [[-140, -110], [130, -120], [150, -20], [-150, 10]]) kd10Twinkle(ctx, x, y, 7, 0.8);
  // window mullion edges and the sill
  shape(ctx, [[-240, 92], [240, 92], [240, 132], [-240, 132], [-240, 92]], KD10_COL.gold, { lw: 6, seed: 82 });
  ctx.fillStyle = KD10_COL.wallDay; ctx.fillRect(-240, 132, 480, 120);
  const F = kd10EndFlea(t); if (!F.gone) kd10DrawInsect(ctx, t, F);
}

// ======================================================================
// OVERLAYS (panel space, 1000 x 1230)
function kd10Label(ctx, S, t, text, a, b, x, y, o = {}) { if (!KD10_IN(t, a, b)) return; ctx.save(); ctx.globalAlpha = Math.min(1, (b - t) / 0.25); S.label(ctx, text, K.clamp(x, 150, 850), K.clamp(y, 110, 1150), K.clamp((t - a) / 0.5), { size: 46, align: 'center', ...o }); ctx.restore(); }
function kd10Word(ctx, t, text, a, b, x, y, size = 96, o = {}) { if (!KD10_IN(t, a, b)) return; ctx.save(); ctx.globalAlpha = Math.min(1, (b - t) / 0.2); sfx(ctx, text, x, y, size, KD10_Z(t, a, 0.3), o); ctx.restore(); }
function kd10Arrow(ctx, S, t, a, b, from, to, o = {}) { if (!KD10_IN(t, a, b)) return; ctx.save(); ctx.globalAlpha = Math.min(1, (b - t) / 0.25); S.arrow(ctx, from, to, K.clamp((t - a - 0.05) / 0.4), o); ctx.restore(); }
function kd10Overlays(ctx, t, cam, world, S) {
  const P = (x, y) => kd10ToPanel(x, y, cam);
  if (world === 'room') {
    // S1 lens on the nook
    if (t >= 0.62 && t < 13.7) { const p = settleTo(t, 0.62, 0, 1, 0.4, 0.12), dip = 20 * pulse(t, 6.9, 0.25) - 6 * pulse(t, 7.15, 0.3);
      kd10Lens(ctx, 690, 330, 180, p, P(610, 788), (c) => kd10LensWorld(c, { x: 230, y: 850 - dip, zoom: 1.15 }, (cc) => kd10DrawBed(cc, t)));
      kd10Label(ctx, S, t, 'THE LOUSE', 0.7, 3.0, 690, 125); }
    kd10Label(ctx, S, t, 'RICH MAN', 3.75, 6.2, P(470, 520)[0], P(470, 520)[1] - 20);
    // S3 lens on the flea
    if (t >= 22.38 && t < 26.4) { const FR = kd10FleaRoom(t); const p = settleTo(t, 22.38, 0, 1, 0.4, 0.12) * (1 - KD10_Z(t, 26.2, 0.2));
      kd10Lens(ctx, 720, 330, 170, p, P(FR.x, FR.y - 8), (c) => kd10SillView(c, t)); kd10Label(ctx, S, t, 'THE FLEA', 22.45, 25.5, 720, 128); }
    if (t >= 20.3 && t < 23.0) { const FR = kd10FleaRoom(t); if (FR) kd10Arrow(ctx, S, t, 21.5, 22.4, [P(FR.x, FR.y)[0] - 160, P(FR.x, FR.y)[1] + 180], P(FR.x - 6, FR.y + 10), { color: C.yellow, width: 18 }); }
    kd10Word(ctx, t, 'BOING!', 21.5, 22.4, P(280, 380)[0], P(280, 380)[1], 80, { rot: -0.15 });
    // S10 small lens
    if (t >= 96.6 && t < 98.4) { const p = settleTo(t, 96.6, 0, 1, 0.3) * (1 - KD10_Z(t, 98.1, 0.3)); kd10Lens(ctx, 210, 1010, 140, p, null, (c) => kd10LensWorld(c, { x: 790, y: 640, zoom: 1.25 }, (cc) => kd10DrawBed(cc, t))); }
    if (t >= 102.6 && t < 103.84) { const p = settleTo(t, 102.6, 0, 1, 0.3); kd10Lens(ctx, 210, 1010, 140, p, null, (c) => kd10LensWorld(c, { x: 210, y: 840, zoom: 1.5 }, (cc) => kd10DrawBed(cc, t))); }
    if (t >= 93.92 && t < 95.2) { const [x, y] = P(700, 620); ctx.save(); S.emphasis(ctx, x, y, 110, KD10_Z(t, 93.95, 0.4), { word: 'OUCH!', wx: 0.4, wy: 0.9 }); ctx.restore(); }
    kd10Word(ctx, t, 'A BUG!', 101.6, 103.7, 290, 260, 110, { rot: -0.1, fill: C.yellow });
    if (t >= 100.4 && t < 101.4) { const [x, y] = P(540, 640); soundArcs(ctx, x - 60, y, -1, t); }
    // S11 labels
    // v2: the macro lens on the nook (her worried eyes, lamp glow arriving at the rim) carries HER HOME
    if (t >= 115.36 && t < 116.74) { const p = settleTo(t, 115.36, 0, 1, 0.35, 0.12) * (1 - KD10_Z(t, 116.5, 0.24)), g = K.ease.inOut(KD10_Z(t, 115.36, 1.38));
      kd10Lens(ctx, 300, 330, 180, p, P(610, 791), (c) => kd10LensWorld(c, { x: 200, y: 850, zoom: 1.35 }, (cc) => { kd10DrawBed(cc, t); kd10LampWash(cc, K.lerp(420, 330, g), 830, 130, 0.9 * g); }));
      kd10Label(ctx, S, t, 'HER HOME', 115.45, 116.74, 300, 560); }
    // S14 FLICK, the crack lens, NO FLEA
    // v2: a short lens on the pinched hand: it is her, held between two fingertips at arm's length
    if (t >= 138.2 && t < 139.2) { const A = kd10ServantA(t), p = settleTo(t, 138.2, 0, 1, 0.3, 0.12) * (1 - KD10_Z(t, 138.95, 0.25)), g = A ? kd10Grip({ ...A, hands: null }) : [500, 700];
      kd10Lens(ctx, 770, 300, 165, p, P(g[0] - 10, g[1] - 6), (c) => kd10HeldView(c, t)); }
    if (t >= 139.24 && t < 140.4) { const g = kd10Grip({ ...kd10ServantA(139.3), hands: null }), [x, y] = P(g[0] + 130, g[1] - 90); kd10Word(ctx, t, 'FLICK!', 139.28, 140.4, x, y, 90, { rot: -0.12 }); }
    if (t >= 140.7 && t < 142.6) { const p = settleTo(t, 140.7, 0, 1, 0.3) * (1 - KD10_Z(t, 142.3, 0.3)); kd10Lens(ctx, 790, 330, 150, p, P(480, 958), (c) => kd10LensWorld(c, { x: 660, y: 950, zoom: 1.5 }, (cc) => kd10DrawFloor(cc, t))); }
    // v2 ending: the macro lens again, on the sill: the flea lit, the moon behind his head, the last look back at the bed, the hop out
    if (t >= 161.76 && t < 166.9) { const p = settleTo(t, 161.76, 0, 1, 0.4, 0.12) * (1 - KD10_Z(t, 166.6, 0.3)); kd10Lens(ctx, 720, 330, 200, p, P(360, 466), (c) => kd10EndSillView(c, t)); }
    if (t >= 141.95 && t < 143.6) { const [x, y] = P(480, 958); kd10Arrow(ctx, S, t, 141.95, 143.6, [x + 180, y + 150], [x + 10, y + 12], { color: C.yellow, width: 18 }); kd10Label(ctx, S, t, 'NO FLEA', 141.95, 143.6, x + 220, y + 210); }
  }
  if (world === 'bed') {
    // S2
    if (t >= 15.48 && t < 16.8) { const L = kd10Louse(t), [x, y] = P(L.x - 40, L.y - 120); kd10Word(ctx, t, 'SHH', 15.5, 16.8, x, y, 64, { fill: C.white }); }
    if (t >= 18.5 && t < 19.8) { const [x, y] = P(800, 470); kd10Arrow(ctx, S, t, 18.5, 19.8, [x - 220, y + 160], [x - 70, y + 30], { color: C.yellow, width: 18 }); kd10Label(ctx, S, t, 'NOT A THING', 18.5, 19.8, x - 230, y + 230); }
    // S5 thought cloud
    if (t >= 49.2 && t < 54.0) { const L = kd10Louse(t), [hx, hy] = P(L.x + 30, L.y - 70), p = KD10_Z(t, 49.2, 0.3) * (1 - KD10_Z(t, 53.75, 0.25));
      thoughtCloud(ctx, 290, 330, 470, 360, t, { p, tail: [hx, hy], scale: t < 52.2 ? 1.9 : 0.62, at: t < 52.2 ? [800, 410] : [780, 760], inside: (c) => {
        if (t < 52.2) { c.fillStyle = '#fbe6dc'; c.fillRect(500, 200, 600, 500); kd10GiantFace(c, { lid: t < 49.44 ? 1 : 0, wide: t >= 49.44, px: t >= 49.44 ? Math.sin(t * 9) * 0.6 : 0, brow: t >= 49.44 ? -0.6 : 0 });
          if (t >= 50.3) { c.save(); c.globalAlpha = 1 - KD10_Z(t, 50.3, 0.6); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; seg(c, 800 + Math.cos(a) * 90, 420 + Math.sin(a) * 60, 800 + Math.cos(a) * 150, 420 + Math.sin(a) * 100, 6, C.black, 0); } c.restore(); } }
        else { c.fillStyle = '#b51a12'; c.fillRect(300, 400, 1000, 800); kd10GiantArm(c, { shift: 0 }); const k = settleTo(t, 52.2, 0, 1, 0.3, 0.2); kd10Insect(c, { kind: 'flea', x: 770, y: 716, s: 1.3, dir: 1, mouth: 'teeth', tip: 0.3, lid: 0.3 }); star(c, 820, 712, 46 * k, C.red, t); } } });
      if (t >= 52.3 && t < 53.75) { const k = KD10_Z(t, 52.3, 0.3); sfx(ctx, 'OUCH!', 380, 220, 70, k, { rot: -0.15 }); } }
    // S6 - S9 the SLEEP meter (also S10 in the room, and 145.34 on)
    // S8 GRRR, daydream, SAFE HERE
    if (t >= 72.66 && t < 74.3) { const F = kd10Flea(t), [x, y] = P(F.x - 70, F.y - 60); kd10Word(ctx, t, 'GRRR', 72.7, 74.3, x, y, 60, { rot: 0.1, fill: C.white }); ctx.save(); ctx.globalAlpha = 1 - KD10_Z(t, 73.8, 0.5); const [bx, by] = P(F.x, F.y - 60); for (let i = 0; i < 3; i++) { ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const xx = bx + 70 + k * 6, yy = by - 20 + i * 18 + 5 * Math.sin(k + t * 20); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
    if (t >= 77.2 && t < 79.6) { const F = kd10Flea(t), [hx, hy] = P(F.x + 20, F.y - 150), p = settleTo(t, 77.2, 0, 1, 0.4) * (1 - KD10_Z(t, 79.35, 0.25));
      thoughtCloud(ctx, 300, 420, 430, 330, t, { p, tail: [hx, hy], scale: 0.8, at: [500, 500], inside: (c) => { c.save(); c.translate(500, 520); c.rotate(0.05 * Math.sin(t * 6)); shape(c, ell(0, 0, 230, 80, 30), C.white, { lw: 8, seed: 201 }); shape(c, ell(0, -6, 170, 54, 30), '#e8e1cc', { lw: 4, seed: 202 });
        shape(c, [[-150, -10], [-130, -40], [130, -46], [150, -16], [130, 14], [-130, 18], [-150, -10]], C.white, { lw: 6, seed: 203, dot: C.skin, pitch: 8, rad: 0.3, da: 0.7 });
        seg(c, -280, -120, -230, 40, 8, '#b9b9b9', 4); for (const dx of [-14, 0, 14]) seg(c, -290 + dx, -170, -287 + dx, -120, 4, '#b9b9b9', 3); seg(c, 250, -150, 230, 40, 10, '#b9b9b9', 4); c.restore(); } }); }
    if (t >= 82.36 && t < 84.34) { const [x, y] = P(190, 860); kd10Arrow(ctx, S, t, 82.4, 84.34, [x + 200, y - 260], [x + 30, y - 40], { color: C.yellow, width: 20 }); kd10Label(ctx, S, t, 'SAFE HERE', 82.4, 84.34, x + 230, y - 300); }
    // S9
    if (t >= 85.38 && t < 87.0) { kd10Arrow(ctx, S, t, 85.38, 87.0, [620, 330], [505, 165], { color: C.red, width: 18 }); kd10Label(ctx, S, t, 'NOT YET!', 85.38, 87.0, 690, 370, { fill: C.yellow }); }
    if (t >= 87.12 && t < 87.9) { const F = kd10Flea(t), [x, y] = P(F.x - 60, F.y); kd10Word(ctx, t, 'BOING!', 87.15, 87.9, x - 40, y, 70, { rot: -0.2 }); }
    if (t >= 87.3 && t < 88.0) { const [x, y] = P(260, 780); kd10Word(ctx, t, 'NO!', 87.3, 88.0, Math.max(90, x), y, 56, { fill: C.white }); }
    if (t >= 90.1 && t < 92.06) { const [x, y] = P(780, 712); star(ctx, x + 10, y + 6, 70 * settleTo(t, 90.1, 0, 1, 0.2, 0.3) + (t >= 91.14 ? 30 * settleTo(t, 91.14, 0, 1, 0.2, 0.3) : 0), C.red, 0.2); kd10Word(ctx, t, 'CHOMP!', 90.1, 92.06, KD10_CHOMP[0], KD10_CHOMP[1], 120, { rot: -0.08 }); }
    // S12/S13
    if (t >= 118.96 && t < 119.96) { const F = kd10Flea(t), [x, y] = P(F.x + 30, F.y - 200); kd10Word(ctx, t, '!', 118.96, 119.96, x, y, 90, { fill: C.red }); }
    if (t >= 128.5 && t < 130.6) { const [x, y] = P(190, 860), sh = t >= 129.96 ? tremble(t, 6, 13) : 0, droop = t >= 129.96 ? 0.6 * KD10_Z(t, 129.96, 0.5) : 0;
      ctx.save(); ctx.globalAlpha = 1 - KD10_Z(t, 130.3, 0.3); S.arrow(ctx, [x + 260, y - 280], [x + 60 + droop * 60, y - 60 + droop * 120], K.clamp((t - 128.5) / 0.4), { color: C.yellow, width: 20 }); ctx.restore();
      kd10Label(ctx, S, t, t >= 129.96 ? 'SAFE HERE?' : 'SAFE HERE', 128.5, 130.6, x + 280 + sh, y - 320 + sh * 0.5, { tilt: t >= 129.96 ? 0.15 : 0.015 }); }
    if (t >= 135.34 && t < 136.3) kd10Word(ctx, t, '!', 135.34, 136.3, 860, 250, 110, { fill: C.red });
    if (t >= 155.7 && t < 157.2) { ctx.save(); ctx.globalAlpha = Math.min(1, (157.2 - t) / 0.25); const [x, y] = P(190, 860); S.arrow(ctx, [x + 240, y - 300], [x + 40, y - 50], 1, { color: C.yellow, width: 20 }); S.label(ctx, 'EMPTY', x + 270, y - 340, 1, { size: 50, align: 'center' }); ctx.restore(); }
  }
  if (world === 'floor') {
    if (t >= 124.1 && t < 125.04) { const [x, y] = P(660, 930); kd10Arrow(ctx, S, t, 124.15, 125.04, [x - 200, y - 220], [x - 30, y - 50], { color: C.yellow, width: 20 }); kd10Label(ctx, S, t, 'SAFE', 124.15, 125.04, x - 220, y - 260); }
  }
  // SLEEP meter (panel space top left)
  const mv = kd10MeterV(t);
  const meterOn = (t >= 55.8 && t < 96.7) || (t >= 145.34 && t < 147.44);
  if (meterOn) { let p = t < 145 ? settleTo(t, 55.8, 0, 1, 0.35, 0.15) : settleTo(t, 145.34, 0, 1, 0.3, 0.12); let y = 92;
    if (t >= 95.8 && t < 97) y = 92 + fallY(t, 96.25, 96.7, 0, 1300);
    if (world === 'floor') p = 0;
    if (t >= 145.34 && t >= 147.2) p *= 1 - KD10_Z(t, 147.2, 0.24);
    ctx.save(); ctx.translate(70, y); ctx.scale(KD10_MS, KD10_MS); ctx.translate(-70, -y); kd10Meter(ctx, 70, y, mv, p, { awake: t >= 95.8 && t < 97, glow: (t >= 57.06 && t < 57.9) || t >= 146.4, t, blinkGap: t >= 85.38 && t < 86.0 ? Math.abs(Math.sin((t - 85.38) * 10)) : 0, deep: true }); ctx.restore();
    if (t >= 75.5 && t < 76.0) { ctx.save(); ctx.globalAlpha = Math.abs(Math.sin((t - 75.5) * 12)) * 0.6; ctx.fillStyle = C.red; ctx.fillRect(70, 92, 380 * KD10_MS, 64 * KD10_MS); ctx.restore(); }
  }
  kd10Word(ctx, t, 'WAIT!', 54.4, 55.7, 300, 300, 100, { rot: -0.08 });
  // the LATER card and THE END
  if (t >= 19.7 && t < 20.7) S.transition(ctx, 1000, 1230, (t - 19.7) / 1.0, { caption: 'ONE NIGHT...' });
  if (t >= 166.9) S.title(ctx, 'THE END', 500, 250, K.clamp((t - 166.9) / 0.8), { size: 88, align: 'center' });
}

// ======================================================================
const SCENE = {
  duration: KD10_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const sh = K.spring(t, 90.1, 9, 12, 7) + K.spring(t, 101.54, 6, 12, 8) + K.spring(t, 121.94, 4, 12, 9);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);
    const world = kd10World(t), cam = kd10CamAt(world, t);
    const drawW = (c, wname, tt) => (wname === 'room' ? kd10DrawRoom(c, tt) : wname === 'bed' ? kd10DrawBed(c, tt) : kd10DrawFloor(c, tt));
    ctx.save(); K.camera(ctx, 1000, 1230, cam); drawW(ctx, world, t); ctx.restore();
    // iris transitions into the bed world (13.7-14.05 through the lens; 26.9-27.2 at the landing) and the dissolve at 147.44
    if (t >= 13.7 && t < 14.05) { const u = K.ease.in(KD10_Z(t, 13.7, 0.35)), rc = kd10CamAt('room', 13.69); ctx.save(); K.camera(ctx, 1000, 1230, rc); kd10DrawRoom(ctx, t); ctx.restore();
      const c2 = kd10CamAt('bed', t); kd10Lens(ctx, K.lerp(690, 500, u), K.lerp(330, 615, u), K.lerp(180, 820, u), 1, null, (c) => kd10LensWorld(c, c2, (cc) => kd10DrawBed(cc, t))); }
    if (t >= 26.9 && t < 27.2) { const u = K.ease.in(KD10_Z(t, 26.9, 0.3)), rc = kd10CamAt('room', 26.89); ctx.save(); K.camera(ctx, 1000, 1230, rc); kd10DrawRoom(ctx, t); ctx.restore();
      const c2 = kd10CamAt('bed', t), lp = kd10ToPanel(600, 760, rc); kd10Lens(ctx, K.lerp(lp[0], 500, u), K.lerp(lp[1], 615, u), K.lerp(20, 820, u), 1, null, (c) => kd10LensWorld(c, c2, (cc) => kd10DrawBed(cc, t))); }
    if (t >= 147.44 && t < 147.94) { ctx.save(); ctx.globalAlpha = 1 - KD10_Z(t, 147.44, 0.5); K.camera(ctx, 1000, 1230, kd10CamAt('room', 147.43)); kd10DrawRoom(ctx, t); ctx.restore(); }
    kd10Overlays(ctx, t, cam, world, S);
    ctx.restore(); LIFE.t = null;
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // sparse, quiet effects in the pauses only; the narration is the soundtrack
    k.play('chime', 4.3, { note: 'E6', gain: 0.45 }); k.play('pop', 13.55, { gain: 0.6 }); k.play('whoosh', 19.72, { gain: 0.55 });
    k.play('pop', 53.95, { gain: 0.5 }); k.play('pop', 61.8, { gain: 0.5, pitch: 1.3 }); k.play('tick', 83.45, { gain: 0.8 }); k.play('tick', 83.95, { gain: 0.8 });
    k.play('thud', 100.02, { gain: 0.6 }); k.play('pop', 101.25, { gain: 0.4, pitch: 0.8 }); k.play('chime', 146.25, { note: 'C6', gain: 0.35 }); k.play('chime', 166.95, { note: 'C6', gain: 0.7 });
  },
};
window.SCENE = SCENE;
