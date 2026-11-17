// ===== AN-097 main: sets, camera, the scene table, overlays (counters, hourglass, balloons, insets, thought cloud, lettering), transitions, sound =====
const A97_DUR = 171.24;            // plan duration 168.24 + end hold 3.0
const A97_VW = 1000, A97_VH = 1230;

// ---------- which set is on screen ----------
const a97Set = (t) => (t < 20.52 ? 'palace' : t < 33.5 ? 'merchant' : t < 104 ? 'yahya' : t < 126.22 ? 'street' : t < 142.84 ? 'palace' : 'yahya');
// time of day in the door arch (skyCycle u, wraps at 1)
const A97_U = [[0, 0.30], [11.12, 0.30], [12.12, 0.36], [59.08, 0.36], [60.4, 0.40], [61.2, 0.42], [91, 0.44], [104, 0.45], [126, 0.47], [126.22, 0.49], [142.8, 0.49], [142.84, 0.72], [158.98, 0.72], [160.2, 1.0], [164, 1.08]];
const a97U = (t) => kfn(t, A97_U, 'inOut');

// ---------- camera ----------
const A97_CAM = [
  [0, { x: 500, y: 640, zoom: 1.0 }], [1.2, { x: 500, y: 640, zoom: 1.0 }], [4.1, { x: 560, y: 700, zoom: 1.45 }], [10.9, { x: 560, y: 700, zoom: 1.45 }], [12.29, { x: 540, y: 660, zoom: 1.45 }],
  [12.3, { x: 720, y: 640, zoom: 2.0 }], [16.7, { x: 720, y: 640, zoom: 2.3 }], [18.05, { x: 720, y: 640, zoom: 2.3 }], [18.6, { x: 560, y: 700, zoom: 1.45 }], [20.51, { x: 520, y: 700, zoom: 1.45 }],
  [20.52, { x: 470, y: 720, zoom: 1.4 }], [25.8, { x: 470, y: 720, zoom: 1.4 }], [27.8, { x: 600, y: 660, zoom: 2.1 }], [29.85, { x: 600, y: 660, zoom: 2.1 }],
  [29.86, { x: 390, y: 690, zoom: 1.5 }], [33.3, { x: 420, y: 690, zoom: 1.5 }], [33.49, { x: 470, y: 690, zoom: 1.5 }],
  [33.5, { x: 520, y: 660, zoom: 1.1 }], [34.3, { x: 520, y: 660, zoom: 1.1 }], [37.8, { x: 620, y: 700, zoom: 1.35 }], [39.3, { x: 620, y: 700, zoom: 1.35 }], [39.9, { x: 500, y: 660, zoom: 1.1 }], [40.85, { x: 500, y: 660, zoom: 1.1 }],
  [40.86, { x: 560, y: 690, zoom: 1.5 }], [45.5, { x: 560, y: 690, zoom: 1.5 }], [46.2, { x: 620, y: 690, zoom: 1.4 }], [49.29, { x: 620, y: 690, zoom: 1.4 }],
  [49.3, { x: 560, y: 740, zoom: 1.6 }], [50.5, { x: 560, y: 740, zoom: 1.6 }], [51.0, { x: 520, y: 800, zoom: 2.4 }], [53.9, { x: 520, y: 800, zoom: 2.4 }], [54.5, { x: 500, y: 700, zoom: 1.15 }], [60.79, { x: 500, y: 700, zoom: 1.15 }],
  [60.8, { x: 500, y: 680, zoom: 1.15 }], [61.6, { x: 500, y: 680, zoom: 1.15 }], [62.4, { x: 435, y: 680, zoom: 1.15 }], [63.4, { x: 435, y: 680, zoom: 1.15 }], [64.0, { x: 565, y: 680, zoom: 1.15 }], [65.0, { x: 520, y: 690, zoom: 1.2 }],
  [68.8, { x: 500, y: 720, zoom: 1.3 }], [73.05, { x: 500, y: 720, zoom: 1.3 }],
  [73.06, { x: 800, y: 700, zoom: 2.6 }], [79.75, { x: 800, y: 700, zoom: 2.6 }], [79.76, { x: 655, y: 700, zoom: 1.45 }], [86.2, { x: 655, y: 700, zoom: 1.45 }], [87.0, { x: 500, y: 680, zoom: 1.15 }], [90.0, { x: 435, y: 680, zoom: 1.15 }], [91.61, { x: 435, y: 680, zoom: 1.15 }],
  [91.62, { x: 640, y: 560, zoom: 1.3 }], [103.99, { x: 640, y: 530, zoom: 1.3 }],
  [126.22, { x: 500, y: 640, zoom: 1.05 }], [127.8, { x: 500, y: 640, zoom: 1.05 }], [131.6, { x: 540, y: 700, zoom: 1.45 }], [135.85, { x: 540, y: 700, zoom: 1.45 }],
  [135.86, { x: 690, y: 650, zoom: 2.1 }], [139.9, { x: 690, y: 650, zoom: 2.4 }], [140.6, { x: 690, y: 650, zoom: 2.4 }], [141.2, { x: 560, y: 690, zoom: 1.5 }], [142.83, { x: 560, y: 690, zoom: 1.5 }],
  [142.84, { x: 600, y: 690, zoom: 1.5 }], [147.85, { x: 600, y: 690, zoom: 1.5 }], [147.86, { x: 700, y: 650, zoom: 2.0 }], [153.6, { x: 700, y: 650, zoom: 2.25 }], [154.4, { x: 640, y: 640, zoom: 1.5 }], [158.97, { x: 640, y: 640, zoom: 1.5 }],
  [158.98, { x: 330, y: 660, zoom: 1.5 }], [161.0, { x: 330, y: 660, zoom: 1.5 }], [164.3, { x: 500, y: 640, zoom: 1.05 }], [A97_DUR, { x: 500, y: 640, zoom: 1.05 }]];
// the street: the camera follows the walkers (world 1600 wide)
function a97StreetCam(t) {
  const m = a97MX11(Math.min(t, 115.5)), s = t < 117.66 ? a97SX11(t) : a97SalX12(t), mid = (m + s) / 2;
  if (t < 110) return { x: mid + 80, y: 680, zoom: 1.15 };
  if (t < 115.1) { const k = a97E(t, 110, 0.8); return { x: K.lerp(mid + 80, m - 60, k), y: K.lerp(680, 640, k), zoom: K.lerp(1.15, 1.7, k) }; }
  if (t < 117.66) { const k = a97E(t, 115.1, 0.6); return { x: K.lerp(m - 60, mid, k), y: K.lerp(640, 670, k), zoom: K.lerp(1.7, 1.5, k) }; }
  return { x: mid, y: 680, zoom: K.lerp(1.6, 1.8, a97E(t, 117.66, 5.1)) };
}
function a97Cam(t) {
  const st = a97Set(t) === 'street', c = st ? a97StreetCam(t) : K.camAt(A97_CAM, t), z = c.zoom, WW = st ? 1600 : A97_VW;
  return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, A97_VH - 615 / z), zoom: z };
}
const a97W2V = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const a97V2W = (t, vx, vy) => { const c = a97Cam(t); return [c.x + (vx - 500) / c.zoom, c.y + (vy - 615) / c.zoom]; };

// ---------- sets ----------
function a97Outside(t, u, extra) {
  return (c) => {
    skyCycle(c, u, { sun: false, moon: false, hills: false, t });
    const d = dayCycle(u), uu = ((u % 1) + 1) % 1;
    if (uu < 0.6) { const sy = uu < 0.25 ? 0 : 0; const y = uu >= 0.25 ? K.lerp(560, 850, K.clamp((uu - 0.3) / 0.19)) : K.lerp(860, 600, K.clamp(uu / 0.1)); c.save(); c.translate(150, y + sy); c.scale(0.42, 0.42); sun(c, 0, 0, t); c.restore();
      if (uu > 0.4) { c.save(); c.globalAlpha = 0.5 * K.clamp((uu - 0.4) / 0.09); c.fillStyle = '#ff7a2a'; c.fillRect(0, 400, 300, 520); c.restore(); } }
    if (d.night > 0.3) { c.save(); c.globalAlpha = K.clamp((d.night - 0.3) / 0.5); moon(c, 110, 600, 30); c.restore(); }
    shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], '#e8c690', { lw: 5, seed: 201, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 });
    if (d.night > 0.2) { c.save(); c.globalAlpha = 0.5 * d.night; c.fillStyle = NAVY2; c.fillRect(0, 400, 300, 520); c.restore(); }
    if (extra) extra(c);
  };
}
function a97DrawSet(ctx, t, cam) {
  const set = a97Set(t), u = a97U(t);
  if (set === 'palace') palaceHall(ctx, { t, outside: a97Outside(t, u) });
  else if (set === 'merchant') {
    palaceHall(ctx, { variant: 'merchant', t, desk: false, doorOpen: 1, curtain: null, u: 0.36, outside: a97Outside(t, 0.36) });
    const [x0, x1, top] = A97_TABLE; shape(ctx, K.rectPts(x0, top, x1 - x0, 18), '#c98a3a', { lw: 5, seed: 350 }); for (const lx of [x0 + 16, x1 - 16]) seg(ctx, lx, top + 18, lx, 900, 10, WOOD, 3.5);
  } else if (set === 'yahya') {
    const night = dayCycle(u).night;
    palaceHall(ctx, { t, wall: 'ochre', throne: false, dais: [600, 860, A97_DY], cushions: [A97_CX], carpet: false, lampsLit: K.clamp(0.3 + night), outside: a97Outside(t, u, t >= 161.2 && t < 163.2 ? a97FreeMansur(t) : null) });
    shape(ctx, [[A97_CX + 46, A97_DY - 26], [A97_CX + 58, A97_DY - 64], [A97_CX + 90, A97_DY - 64], [A97_CX + 96, A97_DY - 26]], C.red, { lw: 5, seed: 351, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
    if (night > 0.02) { ctx.save(); ctx.globalAlpha = 0.3 * night; ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
      for (const [lx, ly] of [[380, 250], [930, 250]]) { ctx.save(); ctx.globalAlpha = 0.35 * night; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.4); ctx.beginPath(); ctx.arc(lx, ly + 40, 190, 0, 7); ctx.fill(); ctx.restore(); } }
  } else {
    const camX = cam.x - 500 / cam.zoom;
    marketStreet(ctx, { w: 1600, palette: 'dusk', camX, t, stalls: [{ x: 980, kind: 'cloth', state: 'closed' }], props: [['crate', 260], ['pots', 1320]] });
    a97LampPost(ctx, 760, 900, t, 1);
  }
}
// Mansur walks free past the arch at dawn (drawn inside the door clip)
const a97FreeX = (t) => kfn(t, [[161.32, 10], [161.9, 120], [162.3, 120], [163.1, 290]], 'inOut');
function a97FreeMansur(t) {
  return (c) => { const P = a97Mk('mansur', { ...a97Walker(a97FreeX, t, 22), y: 905, s: 0.8, dir: 1, mouth: 'smile', wet: true });
    if (a97In(t, 161.32, 161.9)) { P.aL = [-2.45, -2.8]; P.aR = [2.45, 2.8]; P.sq = 1.05; }
    if (a97In(t, 161.9, 162.3)) { P.handR = PERSON_HANDS.chest.R; P.gaze = [1, 0.1]; P.tip = 0.08; } else P.gaze = [1, -0.2];
    person(c, P); };
}

// ---------- the frame: one composer per time range ----------
function a97Frame(t) {
  const set = a97Set(t);
  if (t < 20.52) return a97ScenePalaceA(t);
  if (t < 33.5) return a97SceneMerchant(t);
  if (t < 104) return a97SceneHallDay(t);
  if (t < 126.22) return a97SceneStreet(t);
  if (t < 142.84) return a97ScenePalaceB(t);
  void set; return a97SceneHallNight(t);
}
function a97World(ctx, t, cam) {
  const F = a97Frame(t);
  a97DrawSet(ctx, t, cam);
  if (a97Set(t) === 'street') { const sk = 2.2 + 0.6 * a97E(t, 104, 22); for (const P of F.actors) a97Shadow(ctx, P.x, P.y, 44 * (P.s || 1), sk, 0.3); }
  for (const f of F.under) f(ctx);
  for (const P of F.actors) a97Draw(ctx, P);
  for (const f of F.over) f(ctx);
  a97WorldFx(ctx, t, F);
  return F;
}
// world-space effects that ride on the actors
function a97WorldFx(ctx, t, F) {
  // S4: heart and glow over Yahya as he gives
  if (a97In(t, 37.8, 39.6)) { const h = F.heads.Y, k = K.ease.back(K.clamp((t - 37.8) / 0.3)), a = 1 - K.clamp((t - 39.1) / 0.5); ctx.save(); ctx.globalAlpha = a; a97Glow(ctx, h[0], h[1] - 30, 120, 0.4, t); heart(ctx, h[0] - 10, h[1] - 150 - 20 * K.clamp((t - 37.8) / 1.8), 24 * k); ctx.restore(); }
  // S11: the fear cloud follows Mansur (prison icon)
  if (a97In(t, 107.56, 117.66)) { const h = F.heads.M, k = K.ease.back(K.clamp((t - 107.56) / 0.35)), a = 1 - K.clamp((t - 117.2) / 0.4); ctx.save(); ctx.globalAlpha = a; ctx.translate(h[0] - 10, h[1] - 150 + 8 * Math.sin(t * 2.3)); ctx.scale(k * 0.55, k * 0.55); a97Prison(ctx, 0, 0, 1, { dark: true }); ctx.restore(); }
  if (a97In(t, 108.14, 109.6)) { const h = F.heads.M; a97Sweat(ctx, h[0] + 30, h[1] - 20, (t - 108.2) / 1.2); }
  // S14: the heart Yahya hoped for (same size and place as in his thought cloud)
  if (t >= 139.14 && t < 142.84 && F.actors[0]) { const H = F.actors[0], p = a97Pt(H, 0, -122), k = K.ease.back(K.clamp((t - 139.14) / 0.3)), beat = 1 + 0.08 * Math.max(0, Math.sin((t - 139.14) * 7)); heart(ctx, p[0], p[1], 20 * k * beat); }
  // S15-S16: the verse balloon in the world (Yahya mends the cracked heart)
  if (a97In(t, 145.04, 152.6)) {
    const b = A97_BAL15(t), p = K.clamp((t - 145.04) / 0.3), a = 1 - K.clamp((t - 152.1) / 0.5), tail = t < 147.86 ? [540, 690] : [665, 700];
    ctx.save(); ctx.globalAlpha = a; a97Balloon(ctx, b[0], b[1], b[2] * 2.4, b[2] * 2, tail, p, (c) => {
      const sc = b[2] / 55, crack = t < 150.84 ? 1 : 1 - a97E(t, 150.84, 0.4), slip = t < 150.84 ? 4 : 4 * (1 - a97E(t, 150.84, 0.35)) - 1.5 * pulse(t, 151.2, 0.3);
      if (t < 147.86) { a97Scroll(c, -38 * sc, -6 * sc, 0.42 * sc, 1); a97CrackHeart(c, 34 * sc, 2 * sc, 26 * sc, 1, 3); } else { a97CrackHeart(c, 0, 4 * sc, 34 * sc, crack, Math.max(0, slip)); if (crack <= 0.01 && t > 151.3) { a97Glint(c, 22 * sc, -20 * sc, 14 * sc, (t - 151.3) / 0.5); } }
    }); ctx.restore();
  }
  // S17: gold glow and heart over Yahya
  if (t >= 165.56) { const h = F.heads.Y, k = K.ease.back(K.clamp((t - 165.56) / 0.3)), a = 1 - K.clamp((t - 170.0) / 0.5); ctx.save(); ctx.globalAlpha = a; a97Glow(ctx, h[0], h[1] - 20, 130, 0.5 * K.clamp((t - 165.56) / 0.3), t); heart(ctx, h[0] - 6, h[1] - 150 - 14 * K.clamp((t - 165.56) / 2), 24 * k); ctx.restore(); }
}

// ---------- overlay pieces (view units) ----------
const A97_HG = [[10.48, 1], [25, 0.8], [53.6, 0.55], [59.08, 0.55], [60.4, 0.45], [61.2, 0.32], [86.2, 0.2], [104, 0.1], [128, 0.03]];
function a97HourglassOver(ctx, t) {
  const show = (t >= 10.48 && t < 71.96) || (t >= 82.64 && t < 91.62) || (t >= 104 && t < 129.5) || (t >= 160.26 && t < 161.4);
  if (!show) return;
  const lv = t >= 160 ? 0 : kfn(t, A97_HG, 'inOut'), pop = K.ease.back(K.clamp((t - 10.48) / 0.35));
  let s = (t < 12 ? pop : 1) * (1 + 0.15 * pulse(t, 15.44, 0.3)), x = 915, y = 128 + tremble(t, a97In(t, 25.04, 25.3) ? 3 : 0, 20) * 0, rot = 0, alpha = 1;
  if (a97In(t, 25.04, 25.3)) x += 4 * Math.sin(t * 90);
  if (t >= 128.7 && t < 129.5) alpha = 1 - (t - 128.7) / 0.8;
  if (t >= 160.26) { rot = Math.PI / 2 * K.clamp((t - 160.26) / 0.4) - 0.12 * swing(t, 160.66, 1, 2.2, 5); alpha = 1 - K.clamp((t - 160.9) / 0.5); s = K.ease.back(K.clamp((t - 160.26) / 0.2)); }
  a97Hourglass(ctx, x, y, lv, t, { s, rot, alpha, run: t > 10.9 && t < 128.0, red: a97In(t, 15.44, 16.7) || a97In(t, 128.0, 129.5), tick: t >= 128.3 ? (t - 128.3) / 0.25 : 0 });
}
// money meter: counter (style primitive) + bar
function a97Meter(ctx, t, value, frac, o = {}) {
  const x = o.x ?? 250, y = o.y ?? 150, a = o.alpha ?? 1; if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  S0.counter(ctx, Math.round(value), x, y, o.p ?? 1, { size: o.size || 60, seed: 77 });
  if (frac != null) a97Bar(ctx, x - 170, y + 52, 340, 30, Math.max(frac, o.min || 0), { over: o.over || 0, flash: o.flash || 0 });
  if (o.sub != null) { ctx.font = K.font(42, BF, 400); ctx.textAlign = 'left'; ctx.lineWidth = 7; ctx.strokeStyle = C.white; ctx.lineJoin = 'round'; const tx = 'FOUND: ' + K.fmt(o.sub); ctx.strokeText(tx, x - 170, y + 130); ctx.fillStyle = C.red; ctx.fillText(tx, x - 170, y + 130); }
  ctx.restore();
}
function a97Money(ctx, t) {
  if (a97In(t, 9.0, 12.3)) { const v = 1e6 * a97E(t, 9.0, 0.8, 'out'); a97Meter(ctx, t, v, null, { p: K.clamp((t - 9.0) / 0.3), x: 250, y: 190 });
    for (let i = 0; i < 6; i++) { const u = (t - 9.0 - i * 0.12) / 1.0; if (u > 0 && u < 1) a97Coin(ctx, K.lerp(80, 470, u), 300 - 40 * Math.sin(Math.PI * u), 16, Math.cos(u * 12)); } }
  if (a97In(t, 20.8, 29.86)) { const sub = t < 23.54 ? 0 : Math.round(600 * a97E(t, 23.54, 0.6, 'out')); a97Meter(ctx, t, 1e6, t < 23.54 ? 0 : 0.0006, { p: K.clamp((t - 20.8) / 0.3), min: t < 23.54 ? 0 : 0.012, sub, x: 250, y: 150 }); }
  if (a97In(t, 51.6, 56.6)) { const sub = t < 52.26 ? 0 : Math.round(5000 * a97E(t, 52.26, 0.5, 'out')); a97Meter(ctx, t, 1e6, 0.005, { p: K.clamp((t - 51.6) / 0.3), min: t < 52.26 ? 0 : 0.018, sub, x: 250, y: 150, alpha: 1 - K.clamp((t - 56.2) / 0.4) }); }
  if (a97In(t, 61.2, 71.96)) {
    const v = t < 65.96 ? 5000 : t < 68.78 ? K.lerp(5000, 1e6, a97E(t, 65.96, 2.82, 'in')) : t < 70.62 ? 1e6 : K.lerp(1e6, 1.25e6, a97E(t, 70.62, 0.7, 'out'));
    a97Meter(ctx, t, v, Math.min(1, v / 1e6), { p: K.clamp((t - 61.2) / 0.3), min: 0.018, x: 500, y: 150, over: (v - 1e6) / 2.5e5, flash: t >= 68.78 && t < 68.9 ? 1 : 0 });
    if (a97In(t, 68.78, 69.9)) { ctx.save(); ctx.translate(690, 216); ctx.scale(1 + 0.1 * pulse(t, 68.78, 0.3), 1 + 0.1 * pulse(t, 68.78, 0.3)); ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(-6, 18); ctx.lineTo(26, -22); ctx.stroke(); ctx.lineWidth = 7; ctx.strokeStyle = A97_GREEN; ctx.stroke(); ctx.restore(); }
    if (a97In(t, 65.96, 68.9)) for (let i = 0; i < 8; i++) { const t0 = 65.96 + i * 0.32, u = (t - t0) / 0.6; if (u <= 0 || u >= 1) continue; const cam = a97Cam(t), src = a97W2V(i % 2 ? A97_CH.B : A97_CH.A, 820, cam); a97Coin(ctx, K.lerp(src[0], 500, u), K.lerp(src[1], 210, u) - 120 * Math.sin(Math.PI * u), 14, Math.cos(u * 10)); }
  }
  if (a97In(t, 129.86, 131.4)) { a97Meter(ctx, t, 1e6, 1, { p: K.clamp((t - 129.86) / 0.3), x: 300, y: 150, alpha: 1 - K.clamp((t - 131.0) / 0.4) });
    const k = K.ease.back(K.clamp((t - 130.0) / 0.25)); if (k > 0) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 131.0) / 0.4); ctx.translate(430, 150); ctx.rotate(-0.2); ctx.scale(k * 1.6 - (k - 1) * 0.6, k * 1.6 - (k - 1) * 0.6); ctx.lineWidth = 8; ctx.strokeStyle = C.red; ctx.strokeRect(-110, -44, 220, 88); ctx.font = K.font(72, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('PAID!', 0, 4); ctx.restore(); } }
}
// a name label with an arrow to a head (view coords)
function a97Name(ctx, t, text, t0, dur, at, head, o = {}) {
  if (t < t0 || t > t0 + dur) return; const p = K.clamp((t - t0) / 0.35), a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3);
  ctx.save(); ctx.globalAlpha = a; const r = S0.label(ctx, text, at[0], at[1], p, { size: o.size || 40, align: 'center', fill: o.fill, color: o.color });
  if (head) S0.arrow(ctx, [at[0] + (o.ax || 0), at[1] + r.h * 0.5], head, K.clamp((t - t0 - 0.15) / 0.4), { width: 16, bend: o.bend ?? 0.15 }); ctx.restore();
}
function a97Word(ctx, t, text, t0, dur, at, o = {}) {
  if (t < t0 || t > t0 + dur) return; const a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3);
  ctx.save(); ctx.globalAlpha = a; S0.label(ctx, text, at[0], at[1], K.clamp((t - t0) / 0.3), { size: o.size || 48, align: 'center', fill: o.fill || C.yellow, color: o.color, tilt: o.tilt ?? -0.04, balloon: o.balloon }); ctx.restore();
}
// insets: portraits and memories
const a97Harun0 = (o) => a97Mk('harun', { mouth: 'closed', brow: 0.3, ...o });
function a97Insets(ctx, t, F, cam) {
  // S6: the two sons read the note and nod
  const son = (P, t0, quick) => (c) => { const nod = 6 * (pulse(t, t0 + 0.55, 0.35) + pulse(t, t0 + 0.95, 0.35)) * (quick ? 1 : 0.8); a97Bust(c, { ...P, drop: nod, gaze: t < t0 + 0.4 ? [0, 0.8] : [0, 0.1], mouth: t > t0 + 0.6 ? 'closed' : 'closed', brow: 0.2,
    handR: quick && t > t0 + 0.6 ? PERSON_HANDS.pointDown.R : [30, -150], handL: [-20, -150], lid: Math.max(0, blink(t, P.seed)) }, 1.1);
    a97Scroll(c, 0, 150, 0.6, 1, { n: 0, seal: true }); };
  if (a97In(t, 57.3, 61.0)) { const p = K.clamp((t - 57.3) / 0.25) * (1 - K.clamp((t - 60.5) / 0.3)); a97Inset(ctx, 170, 330, 120, p, son(A97_LOOK.fadl, 57.3, false), { ring: A97_GREEN }); a97Name(ctx, t, 'AL-FADL', 57.4, 3.0, [170, 490], null, { size: 36 }); }
  if (a97In(t, 58.22, 61.0)) { const p = K.clamp((t - 58.22) / 0.25) * (1 - K.clamp((t - 60.5) / 0.3)); a97Inset(ctx, 830, 330, 120, p, son(A97_LOOK.jaafar, 58.22, true), { ring: C.red }); a97Name(ctx, t, 'JAAFAR', 58.3, 2.6, [830, 490], null, { size: 36 }); }
  // S8 / S14: memory, the jewel on the caliph's turban
  const memory = (c, smile) => { const P = a97Harun0({ mouth: smile ? 'smile' : 'closed', handR: smile ? [30, -236] : [40, -110], lid: smile && a97In(t, 77.6, 77.8) ? 1 : 0 }); a97Bust(c, P, 1.25); a97Jewel(c, 18, -45 * 1.25, 18, ((t * 0.8) % 1.6) / 0.6); };
  if (a97In(t, 76.04, 79.9)) { const p = K.clamp((t - 76.04) / 0.3) * (1 - K.clamp((t - 79.5) / 0.3)); a97Inset(ctx, 230, 280, 150, p, (c) => memory(c, t > 77.12), { dream: true, ring: C.yellow });
    if (p > 0.9 && t < 79.4) { const cam = a97Cam(t), j = a97W2V(790, 720, cam); S0.arrow(ctx, [j[0] - 30, j[1] - 40], [300, 380], K.clamp((t - 76.4) / 0.4), { width: 14, bend: -0.2 }); }
    a97Name(ctx, t, 'HE WILL KNOW IT', 78.3, 1.3, [260, 480], null, { size: 40 }); }
  if (a97In(t, 136.32, 137.2)) { const p = K.clamp((t - 136.32) / 0.2) * (1 - K.clamp((t - 136.95) / 0.2)); a97Inset(ctx, 220, 260, 140, p, (c) => memory(c, false), { dream: true, ring: C.yellow }); }
  // S14: Yahya's portrait in the jewel's light
  if (a97In(t, 137.06, 138.5) && F.cas) { const j = a97W2V(F.cas[0], F.cas[1] - 30, cam), p = K.clamp((t - 137.06) / 0.25) * (1 - K.clamp((t - 138.2) / 0.3)); a97Inset(ctx, j[0] - 150, j[1] - 170, 80, p, (c) => a97Bust(c, a97Mk('yahya', { mouth: 'smile', lid: 0.15 }), 0.85), { ring: A97_JEWEL });
    a97Name(ctx, t, "YAHYA'S GIFT", 137.2, 1.3, [j[0] - 150, j[1] - 60], null, { size: 38 }); }
  // S12: memory of Yahya handing over the casket (the S8 pose)
  if (a97In(t, 123.74, 125.5)) { const p = K.clamp((t - 123.74) / 0.3) * (1 - K.clamp((t - 125.1) / 0.3)); a97Inset(ctx, 500, 250, 140, p, (c) => {
    const Y = a97Mk('yahya', { x: 40, y: 175, s: 0.8, dir: -1, mouth: 'smile', lid: 0.15, tip: 0.12, handRW: [-30, 58], handLW: [-2, 62] }); person(c, Y); a97Sack(c, -40, 120, 0.4); a97Casket(c, -44, 52, 0.45);
    const M = a97Mk('mansur', { x: -95, y: 200, s: 0.76, dir: 1, mouth: 'smile', wet: true }); person(c, M); }, { dream: true, ring: C.yellow }); }
}
// icon balloons and thought clouds
function a97Balloons(ctx, t, F, cam) {
  const hv = (k) => (F.heads[k] ? a97W2V(F.heads[k][0], F.heads[k][1], cam) : [500, 600]);
  const env = (a, b, f = 0.25) => K.clamp((t - a) / f) * (1 - K.clamp((t - b + f) / f));
  // S1: the debtor
  if (a97In(t, 7.8, 9.6)) { const h = hv('H'); a97Balloon(ctx, 560, 300, 250, 210, [h[0] - 40, h[1] - 50], env(7.8, 9.6), (c) => a97Bust(c, a97Mk('mansur', { mouth: 'frown', brow: -0.4 }), 0.75)); }
  // S2: no money, the hour, the prison
  if (a97In(t, 14.02, 18.2)) { const h = hv('H'); a97Balloon(ctx, 240, 380, 300, 250, [h[0] - 60, h[1] - 40], env(14.02, 18.2), (c) => {
    if (t < 16.72) { a97Sack(c, 0, 70, 0.75); const k = K.clamp((t - 14.1) / 0.2); seg(c, -70, -70, K.lerp(-70, 70, k), K.lerp(-70, 70, k), 16, C.red, 4); const k2 = K.clamp((t - 14.3) / 0.2); if (k2 > 0) seg(c, 70, -70, K.lerp(70, -70, k2), K.lerp(-70, 70, k2), 16, C.red, 4); }
    else a97Prison(c, 0, 0, 1.9); }); }
  // S3: an empty thought
  if (a97In(t, 29.04, 29.86)) { const h = hv('M'); thoughtCloud(ctx, h[0] - 170, h[1] - 230, 200, 150, t, { p: K.clamp((t - 29.04) / 0.4), tail: [h[0] - 30, h[1] - 60], inside: (c) => { c.font = K.font(220, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.globalAlpha = 1 - K.clamp((t - 29.5) / 0.3); c.fillStyle = C.black; c.fillText('?', 500, 700); }, scale: 0.4, n: 9 }); }
  // S5: Mansur tells it: crown, 1,000,000, sinking sun
  if (a97In(t, 41.6, 43.9)) { const h = hv('M') ; a97Balloon(ctx, 480, 330, 560, 190, [h[0] + 20, h[1] - 70], env(41.6, 43.9), (c) => {
    const pop = (i) => K.ease.back(K.clamp((t - 41.7 - i * 0.4) / 0.25));
    let k = pop(0); if (k > 0) { c.save(); c.translate(-170, 10); c.scale(k, k); shape(c, [[-46, 30], [-50, -24], [-26, 0], [0, -40], [26, 0], [50, -24], [46, 30], [-46, 30]], C.yellow, { lw: 5, seed: 360, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 }); c.restore(); }
    k = pop(1); if (k > 0) { c.save(); c.scale(k, k); c.font = K.font(50, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.black; c.fillText('1,000,000', 0, 6); c.restore(); }
    k = pop(2); if (k > 0) { c.save(); c.translate(180, 0); c.scale(k * 0.32, k * 0.32); sun(c, 0, 20 + 60 * K.clamp((t - 42.6) / 1.0), t); c.restore(); seg(c, 120, 52, 240, 52, 5, C.black, 0); } }); }
  // S11: the verses (scroll and notes, cracked heart, the push)
  if (a97In(t, 111.26, 118.9)) { const h = hv('M'), pop = t < 118.64 ? env(111.26, 119.5) : 0;
    if (pop > 0) a97Balloon(ctx, K.clamp(h[0] - 160, 200, 700), 300, 330, 230, [h[0] - 10, h[1] - 60], pop, (c) => {
      if (t < 112.58) { a97Scroll(c, -40, 0, 1.1, (t - 111.3) / 1.1); a97Notes(c, 74, -30, t, (t - 111.5) / 0.6, 0.9); }
      else if (t < 114.18) { a97Inset(c, -60, -10, 56, 1, (cc) => a97Bust(cc, a97Mk('yahya', { mouth: 'smile', lid: 0.15 }), 0.6)); const cr = K.clamp((t - 112.9) / 0.2); a97CrackHeart(c, 70, 0, 42, cr, 4 * cr); }
      else { const sh = Math.max(0, Math.sin((t - 114.18) * 9)) * 18; const M = a97Mk('mansur', { x: -30 + sh * 0.6, y: 95, s: 0.45, dir: 1, tip: -0.2, brow: -0.6, mouth: 'o' }); person(c, M);
        c.save(); c.translate(-120 + sh, 20); shape(c, [[-40, -14], [20, -14], [34, -26], [44, -16], [32, 0], [44, 14], [20, 14], [-40, 14], [-40, -14]], C.white, { lw: 5, seed: 361, dot: C.skin, pitch: 6, rad: 0.3 }); c.restore();
        townDoor(c, 70, 130, -40, 100, 0, { arch: 'round' }); } });
    if (t >= 118.64 && t < 119.5) { const r = K.rng(7), u = (t - 118.64) / 0.86; for (let i = 0; i < 8; i++) { const a = r() * 6.28, d = 60 + 90 * r(); ctx.save(); ctx.globalAlpha = 1 - u; ctx.translate(K.clamp(h[0] - 160, 200, 700) + Math.cos(a) * d * u * 1.5, 300 + Math.sin(a) * d * u + 240 * u * u); ctx.rotate(u * 6 * (r() - 0.5)); ctx.fillStyle = C.white; ctx.fillRect(-16, -11, 32, 22); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.strokeRect(-16, -11, 32, 22); ctx.restore(); }
      S0.emphasis(ctx, K.clamp(h[0] - 160, 200, 700), 300, 120, K.clamp(u * 2), { word: 'POP!' }); } }
  // S12: Salih: the giving hand, thumbs down
  if (a97In(t, 122.14, 123.7)) { const h = hv('S'); a97Balloon(ctx, 400, 300, 380, 200, [h[0] + 20, h[1] - 60], env(122.14, 123.7), (c) => {
    c.save(); c.translate(-90, 10); c.scale(K.ease.back(K.clamp((t - 122.14) / 0.25)), K.ease.back(K.clamp((t - 122.14) / 0.25))); shape(c, [[-50, 20], [-50, -10], [30, -10], [50, -24], [56, -12], [44, 4], [56, 20], [-50, 20]], C.white, { lw: 5, seed: 362, dot: C.skin, pitch: 6, rad: 0.3 }); a97Coin(c, 20, -36, 14); c.restore();
    const k = K.ease.back(K.clamp((t - 122.44) / 0.25)); if (k > 0) { c.save(); c.translate(100, 0); c.scale(k, k); shape(c, [[-30, -40], [10, -40], [10, 40], [-30, 40], [-30, -40]], C.white, { lw: 5, seed: 363, dot: C.skin, pitch: 6, rad: 0.3 }); shape(c, [[-6, 40], [8, 40], [8, 86], [-6, 86], [-6, 40]], C.white, { lw: 5, seed: 364, dot: C.skin, pitch: 6, rad: 0.3 }); seg(c, -40, -60, 40, 60, 0, C.red, 0); c.restore(); } }); }
  // S13 and S15: Salih reports the verses (small balloon); S15 uses the world balloon
  if (a97In(t, 133.48, 135.86)) { const h = hv('S'); a97Balloon(ctx, 330, 300, 320, 200, [h[0] + 30, h[1] - 50], env(133.48, 135.86), (c) => {
    const M = a97Mk('mansur', { x: -70, y: 85, s: 0.42, dir: 1, talk: 0.6 + 0.3 * Math.sin(t * 9), handR: [70, -196] }); person(c, M);
    if (t > 133.83) { a97Scroll(c, 30, -30, 0.5, 1); a97CrackHeart(c, 90, 40, 28, 1, 3); } }); }
  // S10: Yahya's hope (thought cloud)
  if (a97In(t, 92.66, 103.8)) { const hy = hv('Y'), p = K.clamp((t - 92.66) / 0.5) * (1 - K.clamp((t - 103.36) / 0.4));
    thoughtCloud(ctx, 470, 370, 660, 440, t, { p, tail: [hy[0] - 20, hy[1] - 70], scale: 0.62, at: [560, 760], bg: '#fff3d6', inside: (c) => a97Hope(c, t) }); }
  // S16: FEAR and SORROW squeeze the verse out of a small Mansur
  if (a97In(t, 153.84, 158.98)) { const a = 1 - K.clamp((t - 158.5) / 0.4), pop = (t0) => K.ease.back(K.clamp((t - t0) / 0.3)), press = a97E(t, 155.6, 0.5);
    ctx.save(); ctx.globalAlpha = a;
    seg(ctx, 120, 570, 360, 570, 5, C.black, 0);
    const M = a97Mk('mansur', { x: 240, y: 570, s: 0.6, dir: 1, brow: -0.7, mouth: t > 157.06 ? 'o' : 'frown', wet: t > 154.6, sq: 1 - 0.2 * press, eyes: t > 157.06 ? 'wide' : 'open', gaze: t > 157.2 ? [0.6, -0.4] : [0, 0.4] }); M.x += tremble(t, 2); person(ctx, M);
    let k = pop(153.84); if (k > 0) { ctx.save(); ctx.translate(140, 300 + 30 * press); ctx.scale(k * 0.9, k * 0.9); a97Prison(ctx, 0, 0, 1, { dark: true }); ctx.restore(); a97Name(ctx, t, 'FEAR', 154.0, 4.7, [140, 210], null, { size: 40 }); }
    k = pop(154.38); if (k > 0) { ctx.save(); ctx.translate(345, 300 + 30 * press); ctx.scale(k * 1.15, k * 1.15); a97Tear(ctx, 0, 0, 34); ctx.restore(); a97Name(ctx, t, 'SORROW', 154.6, 4.1, [350, 210], null, { size: 40 }); }
    if (t > 155.6) { S0.arrow(ctx, [150, 360], [215, 430], K.clamp((t - 155.6) / 0.3), { width: 12 }); S0.arrow(ctx, [335, 360], [270, 430], K.clamp((t - 155.7) / 0.3), { width: 12 }); }
    if (t > 157.06) { const k2 = K.ease.back(K.clamp((t - 157.06) / 0.3)); a97Scroll(ctx, 240 + 80 * k2, 440 - 20 * k2, 0.42 * k2 * (1 + 0.2 * pulse(t, 157.06, 0.3)), 1, { rot: 0.2 }); }
    ctx.restore(); }
  // S17: the fear cloud falls apart
  if (a97In(t, 160.26, 161.6)) { ctx.save(); ctx.translate(230, 260); a97Prison(ctx, 0, 0, 0.9, { dark: true, crack: K.clamp((t - 160.4) / 1.0) }); ctx.restore(); }
}
// inside Yahya's thought cloud (world-like units, at [560, 760] lands on the cloud centre)
function a97Hope(c, t) {
  palaceHall(c, { t, outside: a97Outside(t, 0.47) });
  const H = a97Mk('harun', { x: A97_TX, y: A97_SITY, s: 1, dir: -1, sit: 1, seat: 'bench', brow: K.lerp(0.8, -0.2, a97E(t, 100.72, 0.5)), mouth: t > 100.9 ? 'smile' : 'closed' });
  if (a97In(t, 94.2, 96.56)) { H.tip = 0.1; H.brow = -0.6; H.eyes = 'wide'; }
  if (a97In(t, 96.56, 100.72)) { H.handR = PERSON_HANDS.chin.R; H.lid = 0.3; H.drop = 5 * (pulse(t, 96.9, 0.5) + pulse(t, 97.6, 0.5)); H.brow = 0.3; }
  if (t >= 102.18) H.handR = a97L2([60, -120], [80, -200], a97E(t, 102.18, 0.3));
  H.gaze = t < 93.52 ? [-1, 0.2] : lookAt(a97Head(H), [470, 660]);
  person(c, H);
  if (t >= 101.48) { const p = a97Pt(H, 0, -122), k = K.ease.back(K.clamp((t - 101.48) / 0.3)), beat = 1 + 0.08 * Math.max(0, Math.sin((t - 101.48) * 7)); heart(c, p[0], p[1], 20 * k * beat); }
  if (a97In(t, 94.2, 95.4)) S0.emphasis(c, 700, 560, 70, K.clamp((t - 94.2) / 0.4), { word: '!' });
  const S = a97SalihBase({ x: 470, y: 900, kneel: 0.6, aL: [-2.4, -2.8], aR: [2.45, 2.85], spear: null, handR: null }); person(c, S); a97Helmet(c, S);
  const cp = a97Pt(S, 0, -258), op = t < 93.52 ? 0 : 1; a97Casket(c, cp[0], cp[1] + 24, 0.7, { open: op, glow: op * (1 + 0.3 * pulse(t, 95.44, 0.6)), t, glint: ((t * 0.7) % 1.5) / 0.6 });
  // tiny Yahya portrait linked to the jewel, the three chests stack beside it
  const yp = [260, 560]; if (t >= 95.44) { const k = K.clamp((t - 95.44) / 0.4); c.save(); c.setLineDash([12, 12]); c.lineWidth = 6; c.strokeStyle = C.black; c.beginPath(); c.moveTo(cp[0], cp[1] - 10); c.lineTo(K.lerp(cp[0], yp[0], k), K.lerp(cp[1] - 10, yp[1], k)); c.stroke(); c.restore();
    a97Inset(c, yp[0], yp[1], 70, k, (cc) => a97Bust(cc, a97Mk('yahya', { mouth: 'smile', lid: 0.15 }), 0.75), { ring: C.yellow }); }
  for (let i = 0; i < 3; i++) { const k = K.ease.back(K.clamp((t - 97.98 - i * 0.25) / 0.25)); if (k > 0) { c.save(); c.translate(140, 700 - i * 52); c.scale(k, k); a97Chest(c, 0, 0, 0.4, { band: [A97_GREEN, C.yellow, C.red][i] }); c.restore(); } }
  // a small Mansur kneels on the left, freed by a wave
  const free = a97E(t, 102.18, 0.4); const M = a97Mk('mansur', { x: 320, y: 905, s: 0.85, dir: 1, kneel: 1 - free, mouth: free > 0.5 ? 'smile' : 'frown', brow: -0.6 * (1 - free), wet: true, handR: free > 0.5 ? null : PERSON_HANDS.clasp.R, handL: free > 0.5 ? null : PERSON_HANDS.clasp.L });
  if (free > 0.5) { M.aL = [-2.45, -2.8]; M.aR = [2.45, 2.8]; M.y -= hop(t, 102.6, 0.4, 0, 0, 24)[1]; }
  person(c, M);
}

// ---------- lettering ----------
function a97Lettering(ctx, t, F, cam) {
  const hv = (k) => (F.heads[k] ? a97W2V(F.heads[k][0], F.heads[k][1], cam) : null);
  if (t < 3) a97Name(ctx, t, 'CALIPH HARUN', 0.4, 2.4, [700, 230], hv('H') && [hv('H')[0] + 10, hv('H')[1] - 120], { size: 42 });
  a97Name(ctx, t, 'SALIH', 4.98, 1.6, [300, 300], hv('S') && [hv('S')[0], hv('S')[1] - 100], { size: 44 });
  a97Word(ctx, t, 'BEFORE SUNSET!', 11.2, 1.1, [420, 420], { size: 46 });
  a97Word(ctx, t, 'GULP!', 18.3, 0.8, hv('S') ? [hv('S')[0] + 110, hv('S')[1] - 120] : [400, 400], { size: 50, fill: C.white });
  a97Name(ctx, t, 'MANSUR', 22.2, 1.5, [720, 380], hv('M') && [hv('M')[0] + 20, hv('M')[1] - 120], { size: 44 });
  a97Word(ctx, t, 'NOT ENOUGH!', 24.0, 1.7, [560, 330], { size: 46, fill: C.red, color: C.white });
  if (t > 34) a97Name(ctx, t, 'YAHYA THE BARMECIDE', 34.4, 2.4, [560, 300], hv('Y') && [hv('Y')[0], hv('Y')[1] - 130], { size: 40 });
  if (t > 45) { const tr = a97W2V(880, 700, cam); a97Name(ctx, t, 'TREASURER', 45.9, 1.6, [760, 330], [tr[0], tr[1] - 90], { size: 40 }); }
  a97Word(ctx, t, 'ONLY 5,000!', 52.4, 1.8, [700, 380], { size: 50, fill: C.red, color: C.white });
  a97Word(ctx, t, 'ENOUGH!', 69.0, 1.5, [500, 330], { size: 56 });
  a97Word(ctx, t, 'AND MORE!', 70.7, 1.25, [760, 330], { size: 50, fill: C.red, color: C.white });
  a97Word(ctx, t, 'A JEWEL!', 73.8, 1.4, [700, 200], { size: 52 });
  if (t > 83) a97Word(ctx, t, 'THANK YOU!', 83.0, 1.4, hv('M') ? [hv('M')[0] - 60, hv('M')[1] - 190] : [400, 400], { size: 44, fill: C.white, balloon: true });
  a97Word(ctx, t, 'ONLY BECAUSE I HAD TO', 116.0, 1.6, [500, 470], { size: 40, fill: C.white });
  if (a97In(t, 122.84, 123.7)) { const h = hv('S'); S0.emphasis(ctx, h[0] + 10, h[1] - 10, 120, K.clamp((t - 122.84) / 0.4), { word: 'SHAME!', wx: -0.4, wy: 1.5 }); }
  if (a97In(t, 135.86, 136.6)) { const h = hv('H'); S0.emphasis(ctx, h[0], h[1], 110, K.clamp((t - 135.86) / 0.3), { word: '!', wx: 0.9, wy: 0.9 }); }
}

// ---------- the scene ----------
const A97_SHAKE = (t) => K.spring(t, 68.78, 5, 14, 7) + K.spring(t, 122.84, 4, 16, 7) + 2 * K.spring(t, 50.1, 1, 14, 8);
const SCENE = {
  duration: A97_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = A97_SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / A97_VW, ph / A97_VH);
    const cam = a97Cam(t);
    ctx.save(); K.camera(ctx, A97_VW, A97_VH, cam); const F = a97World(ctx, t, cam); ctx.restore();
    // whip pan into Yahya's hall (33.3-33.7)
    if (t >= 33.3 && t < 33.7) { const u = (t - 33.3) / 0.4; ctx.save(); ctx.globalAlpha = 0.9 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(33); for (let i = 0; i < 28; i++) ctx.fillRect(-200 + r() * 1200 - u * 400, r() * 1230, 260 + r() * 300, 8 + r() * 16); ctx.restore(); }
    a97Flash(ctx, t, 68.78);
    a97HourglassOver(ctx, t); a97Money(ctx, t); a97Balloons(ctx, t, F, cam); a97Insets(ctx, t, F, cam); a97Lettering(ctx, t, F, cam);
    if (t >= 60.4 && t < 61.2) S.transition(ctx, A97_VW, A97_VH, (t - 60.4) / 0.8, { caption: 'LATER...' });
    if (t >= 168.3) S.title(ctx, 'THE END', 500, 300, K.clamp((t - 168.3) / 0.8), { size: 92, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's four quiet effects, each inside a measured narration pause or after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, A97_DUR, 0.5);
    k.play('chime', 44.3, { note: 'E6', gain: 0.45 });    // Yahya decides (pause 43.97-44.93)
    k.play('whoosh', 60.6, { dur: 0.45, gain: 0.3 });     // LATER card (pause 60.40-61.79)
    k.play('chime', 71.7, { note: 'G6', gain: 0.4 });     // one more thing (pause 71.64-72.24)
    k.play('chime', 168.5, { note: 'C6', gain: 0.6 });    // THE END (after the last word, 168.0)
  },
};
window.SCENE = SCENE;
