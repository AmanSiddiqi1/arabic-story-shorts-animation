// ===== KD-022 main: scene dispatch, camera, lettering, panel, sound =====
const K22V = (x, y, zoom) => ({ x, y, zoom });
const K22CAM = [
  // S1 street
  [0, K22V(500, 640, 1.0)], [2.0, K22V(500, 640, 1.0)], [3.4, K22V(450, 680, 1.8)], [12.0, K22V(450, 680, 1.8)], [13.9, K22V(430, 670, 2.0)], [17.38, K22V(430, 670, 2.0)], [17.4, K22V(440, 680, 2.1)], [21.54, K22V(440, 680, 2.1)],
  // S2 sickroom
  [21.55, K22V(540, 640, 1.3)], [25.0, K22V(560, 650, 1.3)], [26.2, K22V(740, 700, 1.8)], [26.29, K22V(740, 700, 1.8)], [26.3, K22V(430, 650, 1.25)], [28.89, K22V(430, 650, 1.25)], [28.9, K22V(706, 720, 1.7)],
  [39.0, K22V(706, 720, 1.7)], [39.6, K22V(600, 690, 1.4)], [44.2, K22V(600, 690, 1.4)], [44.6, K22V(620, 660, 1.3)], [45.04, K22V(620, 660, 1.3)],
  // S3, S4 street
  [45.05, K22V(360, 700, 1.4)], [49.3, K22V(360, 700, 1.4)], [50.6, K22V(294, 600, 1.7)], [54.89, K22V(294, 600, 1.7)],
  [54.9, K22V(334, 690, 1.5)], [55.7, K22V(334, 690, 1.5)], [57.2, K22V(690, 690, 1.6)], [67.0, K22V(690, 690, 1.6)], [67.6, K22V(714, 680, 1.75)], [69.99, K22V(714, 680, 1.75)],
  // S5, S6 store
  [70.0, K22V(300, 720, 1.5)], [71.38, K22V(300, 720, 1.5)], [74.0, K22V(500, 600, 1.02)], [74.12, K22V(334, 500, 1.5)], [77.6, K22V(666, 500, 1.5)], [78.3, K22V(430, 640, 1.6)], [86.9, K22V(430, 640, 1.6)],
  [86.91, K22V(520, 620, 1.5)], [88.36, K22V(520, 620, 1.5)], [88.8, K22V(420, 620, 1.5)], [90.6, K22V(470, 640, 1.5)], [93.2, K22V(500, 620, 1.5)], [95.5, K22V(640, 600, 1.6)], [95.6, K22V(690, 560, 2.3)], [98.6, K22V(690, 560, 2.3)],
  [98.9, K22V(620, 660, 1.7)], [103.9, K22V(620, 660, 1.7)], [104.4, K22V(560, 680, 2.0)], [106.89, K22V(560, 680, 2.0)],
  // S7 sickroom
  [106.9, K22V(430, 680, 1.15)], [110.0, K22V(430, 680, 1.15)], [110.36, K22V(640, 560, 1.6)], [113.4, K22V(640, 560, 1.6)], [113.5, K22V(706, 700, 1.7)], [114.2, K22V(706, 700, 1.7)], [114.3, K22V(560, 680, 1.3)],
  [116.0, K22V(560, 680, 1.3)], [116.3, K22V(700, 700, 1.7)], [118.2, K22V(700, 700, 1.7)], [122.8, K22V(706, 710, 1.9)], [124.0, K22V(706, 710, 1.9)], [124.6, K22V(773, 540, 2.2)], [125.5, K22V(773, 540, 2.2)],
  [125.8, K22V(680, 700, 1.6)], [127.84, K22V(680, 700, 1.6)], [129.3, K22V(500, 640, 1.05)], [129.9, K22V(500, 640, 1.05)],
  // S8
  [130.5, K22V(680, 600, 1.7)], [131.8, K22V(680, 600, 1.7)], [132.6, K22V(390, 640, 1.6)], [138.8, K22V(390, 640, 1.6)], [139.0, K22V(300, 610, 2.2)], [142.0, K22V(300, 610, 2.2)], [142.4, K22V(420, 640, 1.4)], [147.7, K22V(420, 640, 1.4)], [148.1, K22V(300, 620, 2.0)], [149.79, K22V(300, 620, 2.0)],
  // S9 (static), S10
  [149.8, K22V(300, 660, 1.8)], [157.2, K22V(300, 660, 1.8)], [157.75, K22V(300, 662, 1.8)], [158.1, K22V(455, 888, 1.8)], [158.9, K22V(722, 720, 1.8)], [160.7, K22V(722, 720, 1.8)], [162.2, K22V(706, 720, 1.7)],
  [164.66, K22V(706, 720, 1.7)], [166.4, K22V(500, 640, 1.05)], [K22DUR, K22V(500, 640, 1.05)],
];
const k22cam = (t) => { const c = K.camAt(K22CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, K22W - 500 / z), y: K.clamp(c.y, 615 / z, K22H - 615 / z), zoom: z }; };
const k22P = (cam, x, y) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom];
const K22POV = [[15.4, 17.35, 'shelf'], [42.4, 43.45, 'tray'], [113.5, 114.05, 'bowl']];

function k22world(ctx, t) {
  if (t < 21.55) { k22drawS1(ctx, t); return {}; }
  if (t < 45.05) return k22drawRoom(ctx, t);
  if (t < 70.0) { k22drawS34(ctx, t); return {}; }
  if (t < 106.9) { k22drawStore(ctx, t); return {}; }
  return k22drawRoom(ctx, t);
}
// world-space lettering and balloons (drawn inside the camera, after the cast)
function k22worldText(ctx, t, R) {
  const fade = (a, b) => K.clamp((t - a) / 0.25) * (1 - K.clamp((t - (b - 0.25)) / 0.25));
  if (k22in(t, 35.3, 36.6)) { const h = k22L2W(R.dc.P, [44, -215]); sfx(ctx, 'AHA!', h[0] - 40, h[1] - 95, 70, K.clamp((t - 35.3) / 0.25), { fill: C.yellow, rot: -0.1 }); }
  if (k22in(t, 36.0, 39.4)) { const p = fade(36.0, 39.4), m = k22mouth(R.dc.P); ctx.save(); ctx.globalAlpha *= p; bubble(ctx, 640, 450, 370, 150, m[0] - 30, m[1] - 20, 1, ''); ctx.restore();
    if (p > 0.02) { ctx.save(); ctx.globalAlpha *= p; k22recipeIcons(ctx, 520, 405, 82, 0.7, [36.0, 36.8, 37.4, 37.7].map((a) => (t - a) / 0.3)); ctx.restore(); } }
  if (k22in(t, 44.3, 45.05)) sfx(ctx, '?', 640, 470 - 30 * k22e(t, 44.3, 0.7), 90, K.clamp((t - 44.3) / 0.25), { fill: C.white });
  [[82.1, 270, 400], [82.4, 490, 240], [82.7, 710, 400]].forEach(([a, x, y]) => { if (k22in(t, a, 84.2)) sfx(ctx, '?', x, y, 64, K.clamp((t - a) / 0.2), { fill: C.white }); });
  if (k22in(t, 86.6, 87.7)) sfx(ctx, 'ACHOO!', 470, 470, 96, K.clamp((t - 86.6) / 0.2), { fill: C.yellow, rot: 0.08 });
  if (k22in(t, 108.9, 110.3)) sfx(ctx, 'SO FAST!', 600, 400, 72, K.clamp((t - 108.9) / 0.25), { fill: C.yellow, rot: -0.06 });
  if (k22in(t, 110.36, 113.45)) { const kh = k22head(R.kg.P); thoughtCloud(ctx, 520, 360, 300, 240, t, { p: k22e(t, 110.36, 0.5) * (1 - k22e(t, 113.2, 0.25)), tail: [kh[0] - 40, kh[1] - 70], bg: C.white, scale: 0.42, at: [500, 760], inside: (c) => {
    k22quack(c, { x: 500, y: 960, s: 1.3, dir: 1, mouth: 'smile', lid: 0.35, sq: 1.08, noBlink: true, handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R }, {}); k22star(c, 505, 760, 34 * K.ease.back(K.clamp((t - 110.8) / 0.3))); if (t > 110.8) k22glint(c, 560, 700, 30 * Math.abs(Math.sin(t * 4))); } }); }
  if (k22in(t, 134.24, 138.2)) { const p = fade(134.24, 138.2), kh = k22mouth(R.kg.P); ctx.save(); ctx.globalAlpha *= p; bubble(ctx, 385, 450, 330, 120, kh[0] - 20, kh[1] - 10, K.clamp((t - 134.24) / 0.3), ''); sfx(ctx, 'ARE YOU SURE?', 385, 450, 46, K.clamp((t - 134.3) / 0.3), { fill: C.red, stroke: C.black }); ctx.restore(); }
  if (k22in(t, 139.6, 141.3)) { const h = k22head(R.Q.P); sfx(ctx, 'UH...', h[0] - 120, h[1] - 50 + 4 * Math.sin(t * 9), 54, K.clamp((t - 139.6) / 0.2) * (1 - K.clamp((t - 141.05) / 0.25)), { fill: C.white }); }
  if (k22in(t, 147.88, 149.6)) { const h = k22head(R.Q.P); thoughtCloud(ctx, h[0] - 150, h[1] - 170, 220, 170, t, { p: k22e(t, 147.88, 0.4) * (1 - k22e(t, 149.35, 0.25)), tail: [h[0] - 40, h[1] - 60], bg: C.yellow, scale: 0.36, at: [520, 740], inside: (c) => {
    k22mortar(c, 500, 900, { level: 0.6, mix: C.yellow }); const u = K.clamp((t - 148.1) / 0.5); k22jar(c, 620, 700, { col: 'red', mark: 'X', rot: -0.9 * u }); c.save(); c.fillStyle = C.red; const r = K.rng(4); for (let i = 0; i < 10; i++) { c.beginPath(); c.arc(520 + (r() - 0.5) * 80, 820 - u * 80 * r(), 8, 0, 7); c.fill(); } c.restore(); } }); }
}
// panel-space lettering (after the camera)
function k22overlays(ctx, t, cam, S, R) {
  const P = (x, y) => k22P(cam, x, y), fade = (a, b) => K.clamp((t - a) / 0.25) * (1 - K.clamp((t - (b - 0.25)) / 0.25));
  const lbl = (text, q, a, b, o = {}) => { if (!k22in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - (b - 0.25)) / 0.25); S.label(ctx, text, K.clamp(q[0], 150, 850), K.clamp(q[1], 100, 1150), K.clamp((t - a) / 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a, b, t0, t1, o = {}) => { if (!k22in(t, t0, t1)) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - (t1 - 0.25)) / 0.25); S.arrow(ctx, a, b, K.beat(t, t0, 0.35, 'out'), { width: 20, bend: 0.12, ...o }); ctx.restore(); };
  // S1
  lbl('THE PHYSICIAN', P(380, 425), 3.0, 5.4, { size: 50 }); arr(P(380, 455), P(372, 560), 3.1, 5.4, { bend: 0 });
  if (k22in(t, 7.0, 11.0)) { const n = Math.max(1, Math.round(99 * k22e(t, 7.08, 1.9, 'in'))); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 10.75) / 0.25); S.counter(ctx, n, 840, 170, K.clamp((t - 7.0) / 0.3), { size: 80 }); S.label(ctx, 'CURED', 840, 262, K.clamp((t - 7.1) / 0.3), { size: 38, align: 'center', fill: C.yellow }); ctx.restore(); }
  // S6: the recipe strip, ticks and crosses, the pinch counter, POISON!, the no-drink sign
  if (k22in(t, 87.9, 106.9)) { const sl = k22e(t, 87.9, 0.45, 'out'), x0 = -360 + 400 * sl; ctx.save(); ctx.translate(x0, 0);
    S.box(ctx, 34, 40, 340, 150, 1, { fill: C.white, lw: 7, seed: 22 }); k22recipeIcons(ctx, 80, 66, 82, 0.7, [1, 1, 1, 1]);
    if (t > 89.3) k22tick(ctx, 80, 160, 30 * K.ease.back(K.clamp((t - 89.3) / 0.25)), true);
    [92.0, 100.35, 102.6, 103.0].forEach((a, i) => { if (t > a) k22tick(ctx, 410 + i * 58, 112, 30 * K.ease.back(K.clamp((t - a) / 0.25)), false); }); ctx.restore();
    const n = (t > 89.3) + (t > 92.0) + (t > 100.35) + (t > 102.6) + (t > 103.0); if (n > 0) { S.counter(ctx, n, 880, 150, 1 + 0.2 * (pulse(t, 89.3, 0.25) + pulse(t, 92.0, 0.25) + pulse(t, 100.35, 0.25) + pulse(t, 102.6, 0.2) + pulse(t, 103.0, 0.2)), { size: 74, ...(n >= 3 ? { color: C.red } : {}) }); S.label(ctx, 'PINCH', 880, 236, 1, { size: 34, align: 'center', fill: C.yellow }); } }
  if (k22in(t, 96.56, 98.8)) { const q = P(560, 470); lbl('POISON!', q, 96.56, 98.8, { size: 60, fill: C.red, color: C.white }); arr([q[0] + 40, q[1] + 40], P(690, 660), 96.6, 98.8, { bend: -0.2 }); }
  if (k22in(t, 97.68, 98.9)) { const q = P(820, 470), k = K.ease.back(K.clamp((t - 97.68) / 0.3)) * (1 - K.clamp((t - 98.65) / 0.25)); if (k > 0) { ctx.save(); ctx.translate(q[0], q[1]); ctx.scale(k, k); shape(ctx, ell(0, 0, 70, 70, 30), C.white, { lw: 6, seed: 9 }); shape(ctx, [[-26, -30], [26, -30], [20, 30], [-20, 30]], '#9fc0ff', { lw: 5, seed: 10 }); ctx.lineWidth = 14; ctx.strokeStyle = C.red; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-48, -48); ctx.lineTo(48, 48); ctx.stroke(); ctx.restore(); } }
  // S8
  if (k22in(t, 146.08, 148.0) && R.of && R.of.bowl) { const b = R.of.bowl; lbl('THE SAME MEDICINE', P(b[0] + 40, b[1] - 190), 146.08, 148.0, { size: 44 }); arr(P(b[0] + 20, b[1] - 160), P(b[0], b[1] - 20), 146.15, 148.0, { bend: 0.1 }); }
  // S10: FALSE CONFIDENCE, the count, THE END
  if (k22in(t, 167.78, 171.55)) { const a = 1 - K.clamp((t - 171.3) / 0.25); ctx.save(); ctx.globalAlpha *= a; S.label(ctx, 'FALSE CONFIDENCE', 470, 200, K.clamp((t - 167.78) / 0.35), { size: 60, align: 'center', fill: C.red, color: C.white });
    S.arrow(ctx, [380, 250], P(455, 930), K.beat(t, 167.85, 0.5, 'out'), { width: 20, bend: 0.15 });
    if (t > 170.44) S.arrow(ctx, [720, 250], P(760, 735), K.beat(t, 170.44, 0.4, 'out'), { width: 20, bend: -0.15 });
    if (t > 169.76) S.counter(ctx, t > 170.44 ? 2 : 1, 880, 200, K.clamp((t - 169.76) / 0.3) * (1 + 0.25 * pulse(t, 170.5, 0.4)), { size: 84, color: C.red }); ctx.restore(); }
  if (t >= 171.5) S.title(ctx, 'THE END', 500, 210, K.beat(t, 171.5, 0.8, 'lin'), { size: 86, align: 'center' });
}
const K22SHAKE = (t) => K.spring(t, 86.6, 4, 10, 7) + K.spring(t, 132.5, 6, 10, 7);
const SCENE = {
  duration: K22DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K22SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K22W, ph / K22H);
    const pov = K22POV.find(([a, b]) => k22in(t, a, b));
    let cam = k22cam(t), R = {};
    if (pov) { const [a, b, kind] = pov, amt = k22e(t, a, 0.6) * (1 - 0.0 * k22e(t, b - 0.3, 0.3)); k22povJars(ctx, t, amt, kind); k22povMask(ctx, 0.85 + 0.15 * Math.min(k22e(t, a, 0.3), 1 - k22e(t, b - 0.2, 0.2))); }
    else { ctx.save(); K.camera(ctx, K22W, K22H, cam); R = k22world(ctx, t) || {}; k22worldText(ctx, t, R); ctx.restore(); k22overlays(ctx, t, cam, S, R); }
    if (k22in(t, 20.8, 22.3)) S.transition(ctx, K22W, K22H, (t - 20.8) / 1.5, { caption: 'ONE DAY...' });
    if (k22in(t, 106.83, 106.97)) { ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = C.paper; ctx.fillRect(0, 0, K22W, K22H); k22speedLines(ctx, 0, K22W, 80, 1150, t, 1, 1); ctx.restore(); }
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // quiet effects only in the narration pauses (master 0.6 at render); none on either death
    k.play('whoosh', 20.8, { dur: 0.4, gain: 0.3 });        // ONE DAY... (20.28-21.32)
    k.play('pop', 45.05, { gain: 0.3 });                    // the question mark (44.74-45.36)
    k.play('pop', 86.87, { gain: 0.3 });                    // after the sneeze (86.48-87.26)
    k.play('pop', 106.75, { gain: 0.25 });                  // the red bubble (106.48-107.26)
    k.play('chime', 113.85, { note: 'E5', gain: 0.25 });    // the blurred bowl (113.46-114.26)
    k.play('pop', 117.9, { gain: 0.2 });                    // the held room (117.58-118.22)
    k.play('thud', 125.9, { gain: 0.18 });                  // the king's knees (125.54-126.26)
    k.bed('hum', 129.4, 130.4, 0.6);                        // low hum (129.26-130.50)
    k.play('thud', 132.5, { gain: 0.35 });                  // the planted foot (131.96-133.00)
    k.play('pop', 153.7, { gain: 0.2 });                    // the one hopeful eye (153.32-154.10)
    k.play('thud', 157.7, { gain: 0.15 });                  // the turban settles (157.42-158.10)
    k.play('chime', 171.7, { note: 'C6', gain: 0.35 });     // THE END
  },
};
window.SCENE = SCENE;
