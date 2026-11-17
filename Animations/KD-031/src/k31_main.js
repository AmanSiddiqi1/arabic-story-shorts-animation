// ===== KD-031 main: scene dispatch, camera, lettering, panel, sound =====
const K31V = (x, y, zoom) => ({ x, y, zoom });
const K31CAM = [
  // S1, S2 the master's door (v2: tighter, the ground band under 15 %)
  [0, K31V(480, 612, 1.45)], [3.9, K31V(480, 612, 1.45)], [4.9, K31V(540, 630, 1.7)], [6.6, K31V(540, 630, 1.7)], [7.6, K31V(480, 612, 1.45)], [8.3, K31V(480, 612, 1.45)],
  [8.9, K31V(450, 630, 1.6)], [12.4, K31V(450, 630, 1.6)], [13.2, K31V(560, 600, 1.6)], [19.5, K31V(560, 600, 1.6)], [20.6, K31V(640, 612, 1.45)], [20.99, K31V(640, 612, 1.45)],
  // S3 to S7 the market (one establishing second, then the two-shots)
  [21.0, K31V(420, 640, 1.3)], [22.8, K31V(420, 640, 1.3)], [23.9, K31V(600, 632, 1.6)], [24.6, K31V(600, 632, 1.6)], [25.4, K31V(622, 765, 3.3)], [27.4, K31V(622, 765, 3.3)], [28.2, K31V(615, 632, 1.6)], [33.49, K31V(615, 632, 1.6)],
  [33.5, K31V(615, 640, 1.68)], [40.31, K31V(615, 640, 1.68)],
  [40.32, K31V(440, 470, 1.36)], [49.3, K31V(440, 470, 1.36)], [50.0, K31V(622, 770, 3.3)], [52.0, K31V(622, 770, 3.3)], [52.6, K31V(440, 470, 1.36)], [54.6, K31V(440, 470, 1.36)],
  [54.66, K31V(615, 632, 1.6)], [60.0, K31V(615, 632, 1.6)], [60.6, K31V(540, 660, 1.9)], [62.67, K31V(540, 660, 1.9)],
  [62.68, K31V(510, 660, 1.9)], [66.2, K31V(510, 660, 1.9)], [66.5, K31V(480, 640, 1.4)], [68.29, K31V(480, 640, 1.4)], [68.3, K31V(520, 705, 3.0)], [70.89, K31V(520, 705, 3.0)], [70.9, K31V(370, 632, 1.6)], [74.51, K31V(420, 632, 1.6)],
  // S8 is tracked separately (k31camS8)
  [74.52, K31V(500, 612, 1.45)], [79.59, K31V(500, 612, 1.45)],
  // S9 to S14 the grove (v2: framed from the grass line up; the soil only for the window, the dig)
  [79.6, K31V(238, 735, 2.6)], [82.3, K31V(238, 735, 2.6)], [84.0, K31V(470, 473, 1.3)], [86.3, K31V(470, 473, 1.3)], [88.2, K31V(520, 480, 1.35)], [89.27, K31V(520, 480, 1.35)],
  [89.28, K31V(500, 500, 2.2)], [92.6, K31V(500, 500, 2.2)], [93.4, K31V(430, 480, 1.3)], [96.4, K31V(430, 480, 1.3)], [97.0, K31V(510, 500, 2.4)], [99.6, K31V(510, 500, 2.4)], [100.4, K31V(450, 470, 1.35)], [101.5, K31V(450, 470, 1.35)], [102.6, K31V(545, 820, 1.4)], [105.55, K31V(545, 820, 1.4)],
  [105.56, K31V(420, 520, 1.5)], [110.2, K31V(420, 520, 1.5)], [111.0, K31V(420, 520, 1.55)], [113.8, K31V(420, 520, 1.55)], [114.3, K31V(500, 738, 1.25)], [116.0, K31V(500, 738, 1.25)], [116.6, K31V(420, 520, 1.55)], [119.68, K31V(420, 520, 1.55)],
  [120.15, K31V(436, 530, 2.2)], [123.6, K31V(436, 530, 2.2)], [124.4, K31V(440, 528, 2.3)], [128.6, K31V(440, 528, 2.3)], [129.6, K31V(420, 520, 1.55)], [130.43, K31V(420, 520, 1.55)],
  [130.44, K31V(560, 800, 1.7)], [134.4, K31V(560, 800, 1.7)], [134.6, K31V(600, 830, 2.1)], [135.9, K31V(580, 790, 1.9)], [140.4, K31V(580, 790, 1.9)], [141.2, K31V(520, 640, 1.5)], [142.49, K31V(520, 640, 1.5)],
  [142.5, K31V(500, 580, 1.4)], [148.4, K31V(500, 580, 1.4)], [150.52, K31V(470, 580, 1.4)],
  // S15 the hall (cut under the LATER... card)
  [150.53, K31V(540, 615, 1.6)], [158.0, K31V(560, 615, 1.6)], [158.5, K31V(420, 615, 1.5)], [159.6, K31V(420, 615, 1.5)], [160.0, K31V(580, 615, 1.6)], [162.0, K31V(580, 615, 1.6)], [164.3, K31V(560, 640, 1.7)], [164.71, K31V(560, 640, 1.7)],
  // S16 the palace front
  [164.72, K31V(430, 630, 1.5)], [165.4, K31V(430, 630, 1.5)], [168.4, K31V(540, 620, 1.45)], [169.02, K31V(540, 620, 1.45)], [170.2, K31V(667, 560, 1.5)], [K31DUR, K31V(667, 560, 1.5)],
];
function k31cam(t) {
  if (t >= 74.52 && t < 79.6) { const z = 1.75, x = K.clamp(k31kv(t, [[74.52, 300], [78.6, 1200], [79.25, 1300]], 'out') + 90, 500 / z, 2400 - 500 / z); return { x, y: 655, zoom: z }; }
  const c = K.camAt(K31CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, K31W - 500 / z), y: K.clamp(c.y, 615 / z, K31H - 615 / z), zoom: z };
}
const k31P = (cam, x, y) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom];

function k31world(ctx, t) {
  if (t < 21.0) return k31drawS12(ctx, t);
  if (t < 74.52) return k31drawMarket(ctx, t);
  if (t < 79.6) return k31drawS8(ctx, t, k31cam(t));
  if (t < 150.53) return k31drawGrove(ctx, t);
  if (t < 164.72) return k31drawHall(ctx, t);
  return k31drawS16(ctx, t);
}
// world-space lettering, balloons and clouds (inside the camera, after the cast)
function k31worldText(ctx, t, R) {
  if (k31in(t, 13.0, 19.9) && R.man) k31cloudS2(ctx, t, R.man);
  if (k31in(t, 40.32, 54.0) && R.man && !k31in(t, 49.3, 52.0)) k31cloudS5(ctx, t, R.man);
  if (k31in(t, 116.4, 129.7) && R.man) k31cloudNet(ctx, t, R.man, R);
  if (t >= 169.0 && R.man) k31cloudS16(ctx, t, R.man);
  if (k31in(t, 152.6, 155.6) && R.man) k31storyBalloon(ctx, t, R.man);
  // speech balloons
  if (k31in(t, 32.38, 34.6) && R.hunter) { const h = k31head(R.hunter), p = k31fade(t, 32.38, 34.6); ctx.save(); ctx.globalAlpha *= p; bubble(ctx, h[0] - 60, h[1] - 175, 250, 120, h[0] - 10, h[1] - 50, K.clamp((t - 32.38) / 0.3), ''); sfx(ctx, '2 DINARS!', h[0] - 60, h[1] - 190, 46, K.clamp((t - 32.45) / 0.3), { fill: C.red, stroke: C.black }); k31coin(ctx, h[0] - 95, h[1] - 145, 14); k31coin(ctx, h[0] - 25, h[1] - 145, 14); ctx.restore(); }
  if (k31in(t, 36.56, 38.6) && R.man) { const h = k31head(R.man), p = k31fade(t, 36.56, 38.6); ctx.save(); ctx.globalAlpha *= p; bubble(ctx, h[0] - 70, h[1] - 150, 130, 100, h[0] - 10, h[1] - 50, K.clamp((t - 36.56) / 0.3), ''); sfx(ctx, '1?', h[0] - 70, h[1] - 150, 56, K.clamp((t - 36.6) / 0.3), { fill: C.yellow }); ctx.restore(); }
  if (k31in(t, 162.04, 164.2) && R.king) { const h = k31head(R.king), p = k31fade(t, 162.04, 164.2); ctx.save(); ctx.globalAlpha *= p; bubble(ctx, h[0] + 20, h[1] - 190, 260, 110, h[0] + 6, h[1] - 50, K.clamp((t - 162.04) / 0.3), ''); sfx(ctx, 'KEEP IT!', h[0] + 20, h[1] - 192, 52, K.clamp((t - 162.1) / 0.3), { fill: C.red }); ctx.restore(); }
  // sound words
  if (k31in(t, 39.6, 40.9) && R.hunter) { const h = k31head(R.hunter); sfx(ctx, 'NO!', h[0] + 10, h[1] - 140, 92, K.clamp((t - 39.6) / 0.2) * (1 - K.clamp((t - 40.65) / 0.25)), { fill: C.red, rot: 0.1 }); }
  if (k31in(t, 84.94, 86.5)) { const a = R.A; sfx(ctx, 'FLAP! FLAP!', 520, 680, 62, K.clamp((t - 84.94) / 0.25) * (1 - K.clamp((t - 86.25) / 0.25)), { fill: C.yellow, rot: -0.08 }); }
  if (k31in(t, 98.12, 99.8) && R.A) { const a = k31hHead(R.A); sfx(ctx, 'PSST...', a[0] - 20, a[1] - 70, 40, K.clamp((t - 98.12) / 0.25) * (1 - K.clamp((t - 99.55) / 0.25)), { fill: C.white }); }
  if (k31in(t, 109.36, 110.7) && R.man) { const h = k31head(R.man); sfx(ctx, '!', h[0], h[1] - 100, 90, K.clamp((t - 109.36) / 0.15) * (1 - K.clamp((t - 110.45) / 0.25)), { fill: C.yellow }); }
  if (k31in(t, 120.2, 121.6) && R.man) { const h = k31head(R.man); sfx(ctx, '?', h[0] + 20, h[1] - 100, 84, K.clamp((t - 120.2) / 0.2) * (1 - K.clamp((t - 121.35) / 0.25)), { fill: C.white }); }
  if (k31in(t, 120.6, 121.25) && R.A) { const a = k31hHead(R.A), d = K.clamp((t - 120.6) / 0.6); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 121.05) / 0.2); ctx.translate(a[0] - 16, a[1] - 20 + 14 * d); ctx.beginPath(); ctx.moveTo(0, -9); ctx.quadraticCurveTo(7, 2, 0, 6); ctx.quadraticCurveTo(-7, 2, 0, -9); ctx.fillStyle = '#9fd4ff'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }   // a sweat drop
  if (k31in(t, 134.58, 135.7)) sfx(ctx, 'CLINK!', 730, 870, 50, K.clamp((t - 134.58) / 0.15) * (1 - K.clamp((t - 135.45) / 0.25)), { fill: C.yellow, rot: -0.1 });
  // the heart between the caged pair (S5 cut-in)
  if (k31in(t, 50.68, 52.0) && R.A && R.B) { const a = k31hHead(R.A), b = k31hHead(R.B); heart(ctx, (a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 30, 13 * K.ease.back(K.clamp((t - 50.68) / 0.3))); }
  if (k31in(t, 69.32, 70.9) && R.A) k31squiggle(ctx, R.A.x - 4, R.A.y - 14, t, k31fade(t, 69.32, 70.9));
}
// panel-space lettering (after the camera)
function k31overlays(ctx, t, cam, S, R) {
  const P = (x, y) => k31P(cam, x, y);
  const lbl = (text, q, a, b, o = {}) => { if (!k31in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - (b - 0.25)) / 0.25); S.label(ctx, text, K.clamp(q[0], 160, 840), K.clamp(q[1], 100, 1150), K.clamp((t - a) / 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a, b, t0, t1, o = {}) => { if (!k31in(t, t0, t1)) return; ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - (t1 - 0.25)) / 0.25); S.arrow(ctx, a, b, K.beat(t, t0, 0.35, 'out'), { width: 20, bend: 0.12, ...o }); ctx.restore(); };
  if (R.man && k31in(t, 1.48, 4.0)) { const h = k31head(R.man), q = P(h[0] + 150, h[1] - 170); lbl('THE SERVANT', q, 1.48, 4.0, { size: 50 }); arr([q[0] - 40, q[1] + 34], P(h[0] + 40, h[1] - 40), 1.6, 4.0, { bend: -0.15 }); }
  // the DINARS counter (top left of the picture)
  const dn = t < 10.3 ? 0 : t < 10.95 ? 1 : t < 57.98 ? 2 : t < 58.45 ? 1 : 0;
  const cshow = (k31in(t, 10.3, 13.0) ? k31fade(t, 10.3, 13.0) : 0) + (k31in(t, 33.3, 40.32) ? k31fade(t, 33.3, 40.32) : 0) + (k31in(t, 54.66, 62.68) ? k31fade(t, 54.66, 62.68) : 0);
  if (cshow > 0) { ctx.save(); ctx.globalAlpha *= cshow; const bump = 1 + 0.25 * (pulse(t, 10.3, 0.25) + pulse(t, 10.95, 0.25) + pulse(t, 57.98, 0.25) + pulse(t, 58.45, 0.25) + 1.6 * pulse(t, 61.02, 0.45));   // v2: the counter itself pulses on 0 (no extra label)
    S.counter(ctx, dn, 150, 170, bump, { size: 84, ...(dn === 0 ? { color: C.red } : {}) }); S.label(ctx, 'DINARS', 150, 262, 1, { size: 38, align: 'center', fill: C.yellow }); ctx.restore(); }
  lbl('CHARITY', P(360, 505), 15.46, 19.3, { size: 42 }); lbl('FOOD', P(540, 505), 18.42, 19.3, { size: 42, fill: C.yellow });
  if (k31in(t, 24.88, 27.9)) { const q = P(625, 560); lbl('2 HOOPOES', [q[0], Math.max(150, q[1] - 40)], 24.88, 27.9, { size: 50 }); arr([q[0], Math.max(190, q[1])], P(625, 690), 25.0, 27.9, { bend: 0 }); }
  if (k31in(t, 50.68, 52.0)) lbl('A PAIR?', P(625, 640), 50.68, 52.0, { size: 54, fill: C.red, color: C.white });
  if (k31in(t, 76.78, 78.6)) { lbl('FAR AWAY', [700, 250], 76.78, 78.6, { size: 54 }); arr([560, 330], [930, 330], 76.9, 78.6, { bend: -0.12 }); }   // along the road ahead, clear of the man
  if (k31in(t, 102.98, 105.5)) { const q = P(420, 960); lbl(t < 104.72 ? 'JAR' : 'GOLD!', q, t < 104.72 ? 102.98 : 104.72, t < 104.72 ? 104.72 : 105.5, t < 104.72 ? { size: 54 } : { size: 60, fill: C.yellow }); arr([q[0] + 50, q[1] + 10], P(575, 1000), 103.05, 105.5, { bend: -0.15 }); }
  if (k31in(t, 114.0, 116.3)) { const q = P(470, 1010); lbl('GOLD!', q, 114.0, 116.3, { size: 56, fill: C.yellow }); }
  if (k31in(t, 136.24, 138.3)) { const q = P(760, 620); lbl('CLAY JAR', q, 136.24, 138.3, { size: 48 }); arr([q[0], q[1] + 36], P(680, 790), 136.3, 138.3, { bend: 0.15 }); }
  if (k31in(t, 158.32, 159.9)) { const q = P(240, 470); lbl('TREASURY', q, 158.32, 159.9, { size: 50 }); arr([q[0], q[1] + 36], P(160, 600), 158.4, 159.9, { bend: -0.1 }); }
  if (t >= 171.4) S.title(ctx, 'THE END', 500, 200, K.beat(t, 171.4, 0.8, 'lin'), { size: 86, align: 'center' });
}
// a plain left-to-right wipe band (no caption), following the man's walk out of frame; the cut happens at p = 0.5 under it
function k31wipe(ctx, p) {
  const W = K31W, H = K31H, sl = 0.35 * H; let a, b;
  if (p < 0.5) { const k = K.ease.inOut(p / 0.5); b = K.lerp(-sl, W + sl, k); a = -sl * 2; } else { const k = K.ease.inOut((p - 0.5) / 0.5); a = K.lerp(-sl, W + sl, k); b = W + sl * 2; }
  const poly = [[a, 0], [b, 0], [b - sl, H], [a - sl, H]];
  ctx.save(); K.poly(ctx, poly, true); ctx.fillStyle = C.white; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 13, 0.34); ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.black; for (const e of [a, b]) { ctx.beginPath(); ctx.moveTo(e, -10); ctx.lineTo(e - sl, H + 10); ctx.stroke(); } ctx.restore();
}
const K31SHAKE = (t) => K.spring(t, 39.6, 3, 10, 7) + K.spring(t, 61.02, 2, 10, 7) + K.spring(t, 109.78, 3, 10, 7) + K.spring(t, 138.4, 3, 10, 7);
const SCENE = {
  duration: K31DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K31SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K31W, ph / K31H);
    const cam = k31cam(t); ctx.save(); K.camera(ctx, K31W, K31H, cam); const R = k31world(ctx, t) || {}; k31worldText(ctx, t, R); ctx.restore(); k31overlays(ctx, t, cam, S, R);
    if (k31in(t, 20.575, 21.425)) k31wipe(ctx, (t - 20.575) / 0.85);
    if (k31in(t, 149.56, 151.5)) S.transition(ctx, K31W, K31H, (t - 149.56) / 1.94, { caption: 'LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // quiet effects only in the five narration pauses of 0.6 s or more (master 0.6 at render)
    k.play('pop', 7.9, { gain: 0.3 });                      // the bindle swung up (7.68-8.62)
    k.play('chime', 12.7, { note: 'E5', gain: 0.25 });      // the master's door shuts, the coins in hand (12.32-13.36)
    k.play('whoosh', 20.9, { dur: 0.4, gain: 0.3 });        // the wipe to the market (20.40-21.69)
    k.play('chime', 129.8, { note: 'G5', gain: 0.25 });     // the moral sinks in (129.28-130.76)
    k.play('chime', 171.6, { note: 'C6', gain: 0.35 });     // THE END
  },
};
window.SCENE = SCENE;
