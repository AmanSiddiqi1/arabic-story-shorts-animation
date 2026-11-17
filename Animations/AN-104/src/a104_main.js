// ===== AN-104 main: set selection, camera, overlays (labels, counters, balloons, insets, thought cloud), transitions, sound =====
const A104_DUR = 172.09;            // plan duration 168.586 + end hold 3.5
const A104_VW = 1000, A104_VH = 1230;
const a104Set = (t) => (t < 20.44 ? 'street' : t < 83.3 ? 'court' : t < 120 ? 'street' : t < 131.84 ? 'ruin' : 'hut');

// ---------- camera ----------
const A104_CAM_COURT = [
  [20.44, { x: 470, y: 740, zoom: 1.25 }], [26.14, { x: 470, y: 740, zoom: 1.25 }], [27.4, { x: 300, y: 800, zoom: 1.9 }], [29.58, { x: 300, y: 800, zoom: 1.9 }],
  [31.4, { x: 650, y: 790, zoom: 1.6 }], [33.4, { x: 650, y: 790, zoom: 1.6 }], [34.1, { x: 400, y: 820, zoom: 2.4 }], [35.0, { x: 400, y: 820, zoom: 2.4 }], [35.6, { x: 720, y: 830, zoom: 2.2 }], [38.26, { x: 720, y: 830, zoom: 2.2 }],
  [39.1, { x: 320, y: 840, zoom: 2.4 }], [40.2, { x: 320, y: 840, zoom: 2.4 }], [40.9, { x: 260, y: 810, zoom: 2.0 }], [41.67, { x: 260, y: 810, zoom: 2.0 }],
  [41.68, { x: 560, y: 790, zoom: 1.6 }], [45.14, { x: 560, y: 790, zoom: 1.6 }], [45.9, { x: 290, y: 800, zoom: 2.2 }], [52.04, { x: 290, y: 800, zoom: 2.2 }], [54.3, { x: 280, y: 790, zoom: 2.6 }],
  [55.2, { x: 340, y: 800, zoom: 2.0 }], [72.0, { x: 340, y: 800, zoom: 2.0 }], [72.6, { x: 260, y: 820, zoom: 2.4 }], [75.4, { x: 260, y: 820, zoom: 2.4 }], [76.0, { x: 320, y: 780, zoom: 1.9 }],
  [80.28, { x: 320, y: 780, zoom: 1.9 }], [82.8, { x: 210, y: 800, zoom: 2.5 }], [83.3, { x: 210, y: 800, zoom: 2.5 }]];
const A104_HY = (z, f = 0.8) => 900 - (f * 1230 - 615) / z;
const A104_CAM_HUT = [
  [131.84, { x: 480, y: A104_HY(1.35), zoom: 1.35 }], [134.9, { x: 480, y: A104_HY(1.35), zoom: 1.35 }], [135.8, { x: 600, y: A104_HY(2.1, 0.84), zoom: 2.1 }], [137.6, { x: 600, y: A104_HY(2.1, 0.84), zoom: 2.1 }], [138.6, { x: 550, y: A104_HY(1.8), zoom: 1.8 }],
  [143.54, { x: 550, y: A104_HY(1.8), zoom: 1.8 }], [144.3, { x: 555, y: A104_HY(2.0), zoom: 2.0 }], [147.7, { x: 555, y: A104_HY(2.0), zoom: 2.0 }], [148.4, { x: 555, y: A104_HY(1.9), zoom: 1.9 }], [152.12, { x: 555, y: A104_HY(1.9), zoom: 1.9 }],
  [153.4, { x: 610, y: A104_HY(2.3, 0.86), zoom: 2.3 }], [156.8, { x: 610, y: A104_HY(2.3, 0.86), zoom: 2.3 }], [157.5, { x: 540, y: A104_HY(2.1, 0.7), zoom: 2.1 }], [158.44, { x: 540, y: A104_HY(2.1, 0.7), zoom: 2.1 }], [159.4, { x: 600, y: A104_HY(2.1, 0.84), zoom: 2.1 }],
  [161.4, { x: 600, y: A104_HY(2.1, 0.84), zoom: 2.1 }], [162.4, { x: 550, y: A104_HY(1.8), zoom: 1.8 }], [162.8, { x: 550, y: A104_HY(1.8), zoom: 1.8 }], [166.0, { x: 480, y: A104_HY(1.35), zoom: 1.35 }], [A104_DUR, { x: 480, y: A104_HY(1.35), zoom: 1.35 }]];
const a104GY = (z, f = 0.8) => 900 - (f * 1230 - 615) / z;   // camera y that puts the street ground at fraction f of the panel
function a104StreetCam(t) {
  if (t < 11.6) { const z = kfn(t, [[8.08, 1.7], [9.4, 1.15]]); return { x: a104X1(t) + K.lerp(200, 110, (z - 1.15) / 0.55), y: a104GY(z), zoom: z }; }
  if (t < 20.44) return K.camAt([[11.6, { x: 1580, y: a104GY(1.7), zoom: 1.7 }], [13.54, { x: 1640, y: a104GY(1.7), zoom: 1.7 }], [14.6, { x: 1950, y: 560, zoom: 1.2 }], [15.2, { x: 1950, y: 560, zoom: 1.2 }], [15.9, { x: 1880, y: a104GY(1.15), zoom: 1.15 }], [17.4, { x: 1990, y: a104GY(1.5), zoom: 1.5 }], [20.44, { x: 2000, y: a104GY(1.5), zoom: 1.5 }]], t);
  if (t < 91.2) return K.camAt([[83.3, { x: 2100, y: a104GY(2.0), zoom: 2.0 }], [84.5, { x: 2100, y: a104GY(2.0), zoom: 2.0 }], [87.62, { x: 1640, y: a104GY(2.0), zoom: 2.0 }], [88.6, { x: 1680, y: a104GY(2.2, 0.82), zoom: 2.2 }], [91.2, { x: 1680, y: a104GY(2.2, 0.82), zoom: 2.2 }]], t);
  if (t < 97.8) return K.camAt([[91.2, { x: 1560, y: a104GY(2.0), zoom: 2.0 }], [92.9, { x: 1560, y: a104GY(2.0), zoom: 2.0 }], [93.82, { x: 1470, y: a104GY(1.85), zoom: 1.85 }], [97.8, { x: 1490, y: a104GY(1.8), zoom: 1.8 }]], t);
  if (t < 106.5) return K.camAt([[97.8, { x: 1480, y: a104GY(1.75), zoom: 1.75 }], [101.4, { x: 1450, y: a104GY(1.15, 0.78), zoom: 1.15 }], [103.7, { x: 1540, y: a104GY(1.55), zoom: 1.55 }], [106.5, { x: 1610, y: a104GY(2.0, 0.85), zoom: 2.0 }]], t);
  if (t < 110.2) return K.camAt([[106.5, { x: 1610, y: a104GY(2.0, 0.85), zoom: 2.0 }], [109.5, { x: 1630, y: a104GY(2.3, 0.88), zoom: 2.3 }], [110.2, { x: 1630, y: a104GY(2.3, 0.88), zoom: 2.3 }]], t);
  if (t < 111.0) return { x: 760, y: a104GY(1.8), zoom: 1.8 };
  return { x: Math.min(a104X11(t) + 50, 1640), y: a104GY(1.8), zoom: 1.8 };
}
function a104RuinCam(t) {
  if (t < 127.2) return K.camAt([[120, { x: 1905, y: 700, zoom: 2.6 }], [121.2, { x: 1905, y: 700, zoom: 2.6 }], [122.2, { x: 1900, y: a104GY(1.15, 0.78), zoom: 1.15 }], [124.3, { x: 1900, y: a104GY(1.15, 0.78), zoom: 1.15 }], [125.4, { x: 2000, y: a104GY(1.5, 0.8), zoom: 1.5 }], [127.19, { x: 2000, y: a104GY(1.5, 0.8), zoom: 1.5 }]], t);
  if (t < 131.3) return K.camAt([[127.2, { x: 1860, y: a104GY(2.0), zoom: 2.0 }], [130.2, { x: 1860, y: a104GY(2.0), zoom: 2.0 }], [131.3, { x: 1960, y: a104GY(1.8), zoom: 1.8 }]], t);
  return { x: K.lerp(1960, 2300, a104E(t, 131.3, 0.54, 'in')), y: a104GY(1.8), zoom: 1.8 };
}
function a104Cam(t) {
  const set = a104Set(t), st = set === 'street' || set === 'ruin';
  const c = set === 'street' ? a104StreetCam(t) : set === 'ruin' ? a104RuinCam(t) : K.camAt(set === 'court' ? A104_CAM_COURT : A104_CAM_HUT, t), z = c.zoom, WW = st ? A104_SW : A104_VW;
  return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, A104_VH - 615 / z), zoom: z };
}
const a104W2V = (p, c) => [500 + (p[0] - c.x) * c.zoom, 615 + (p[1] - c.y) * c.zoom];

// ---------- lettering helpers (view units) ----------
function a104Name(ctx, t, text, t0, dur, at, head, o = {}) {
  if (t < t0 || t > t0 + dur) return; const p = K.clamp((t - t0) / 0.35), a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3);
  ctx.save(); ctx.globalAlpha = a; const r = S0.label(ctx, text, at[0], at[1], p, { size: o.size || 46, align: 'center', fill: o.fill, color: o.color });
  if (head) S0.arrow(ctx, [at[0], at[1] + (r ? r.h * 0.5 : 30)], head, K.clamp((t - t0 - 0.15) / 0.4), { width: 16, bend: o.bend ?? 0.15 }); ctx.restore();
}
function a104Word(ctx, t, text, t0, dur, at, o = {}) {
  if (t < t0 || t > t0 + dur) return; const a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3);
  ctx.save(); ctx.globalAlpha = a; S0.label(ctx, text, at[0], at[1], K.clamp((t - t0) / 0.3), { size: o.size || 52, align: 'center', fill: o.fill || C.yellow, color: o.color, tilt: o.tilt ?? -0.04 }); ctx.restore();
}

// ---------- the world for this frame ----------
function a104World(ctx, t, cam) {
  const set = a104Set(t);
  if (set === 'court') return a104CourtWorld(ctx, t);
  if (set === 'hut') return a104HutWorld(ctx, t);
  return a104StreetWorld(ctx, t, cam);
}

// ---------- overlays ----------
function a104Overlays(ctx, t, F, cam) {
  const V = (p) => a104W2V(p, cam), set = a104Set(t);
  // S1
  if (t < 11.6 && F.S) { const S = F.S, sc = V(a104Pt(S, -40, -250)), belly = V(a104Pt(S, 0, -95));
    a104Name(ctx, t, 'DEBTS', 2.84, 1.2, [220, 250], [sc[0] - 10, sc[1] - 40]);
    a104Word(ctx, t, 'GRRR', 7.5, 0.95, [belly[0] + 150, belly[1] - 30], { size: 48, fill: C.white }); }
  if (set === 'street' && t >= 14.36 && t < 15.6) a104Name(ctx, t, 'THE MANSION', 14.36, 1.15, [560, 230], V([2120, 560]));
  // court
  if (set === 'court') {
    if (t >= 28.6 && t < 29.5 && F.S) { const b = V(a104Pt(F.S, 0, -95)); a104Word(ctx, t, 'GRRR', 28.6, 0.85, [b[0] + 140, b[1] - 40], { size: 48, fill: C.white }); a104Arcs(ctx, b[0] + 40, b[1], 40, (t - 28.6) / 0.8); }
    if (t >= 47.2 && t < 48.6 && F.S) { const b = V(a104Pt(F.S, 0, -95)); a104Arcs(ctx, b[0] + 30, b[1], 50, (t - 47.25) / 0.9); a104Arcs(ctx, b[0] - 30, b[1], 50, (t - 47.35) / 0.9, -1); }
    for (let i = 0; i < 4; i++) { const t0 = 30.1 + i * 0.2; if (t >= t0 && t < 31.6) { const D = a104DogP(i, t), h = V(a104DogHead(D)); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 31.3) / 0.3); S0.counter(ctx, i + 1, h[0], h[1] - 110 * cam.zoom / 1.4, K.clamp((t - t0) / 0.3), { size: 70 }); ctx.restore(); } }
    for (let i = 0; i < 4; i++) { const t0 = 32.5 + i * 0.25; if (t >= t0 && t < t0 + 0.45) { const r = V(a104DogRing(a104DogP(i, t))); a104Glint(ctx, r[0], r[1], 30, pulse(t, t0, 0.45)); } }
    if (t >= 34.18 && t < 35.4) a104Name(ctx, t, 'GOLD', 34.18, 1.1, [500, 330], V(a104DogRing(a104DogP(0, t))));
    if (t >= 37.26 && t < 38.4) { const D = a104DogP(2, t), r = a104DogRing(D), s = a104Stake(2); a104Name(ctx, t, 'SILVER', 37.26, 1.05, [560, 360], V([(r[0] + s[0]) / 2, (r[1] + s[1]) / 2 + 20])); }
    if (t >= 39.86 && t < 41.1) { const d = V([a104DishX0(0), 905]); a104Word(ctx, t, 'SOLID GOLD!', 39.86, 1.2, [560, 300], { size: 58 }); }
    if (t >= 48.56 && t < 49.6 && F.S) a104Name(ctx, t, 'HUNGRIER!', 48.56, 0.95, [560, 300], V(a104Pt(F.S, 10, -110)), { fill: C.red, color: C.white });
    if (t >= 55.44 && t < 62.0) { const d = a104Dish1(t); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 61.2) / 0.6); const a = V([d.x - 50, 958]), b = V([175, 958]); a104Dash(ctx, a, b, (t - 55.44) / 0.6, C.red); ctx.restore(); }
    if (t >= 72.5 && t < 73.6) { const d = V([a104Dish1(t).x, 900]); a104Word(ctx, t, 'SCRAPE!', 72.5, 1.05, [d[0] + 260, d[1] + 170], { size: 50, fill: C.white }); }
    if (t >= 75.58 && t < 81.2) { const D = V(a104DogHead(F.D1)), p = a104Env(t, 75.58, 81.2, 0.25), second = t >= 79.32;
      a104Balloon(ctx, 560, 310, 460, 270, [D[0] - 10, D[1] - 40], K.clamp((t - 75.58) / 0.35) * (t > 80.9 ? 1 - K.clamp((t - 80.9) / 0.3) : 1), (c) => {
        if (!second) { a104Dish(c, -120, 40, { s: 1.5, glint: ((t * 0.8) % 2) / 0.9 }); a104Dash(c, [-40, 10], [50, 10], (t - 76.0) / 0.5, C.black); c.save(); c.translate(130, -20); a104Bust(c, a104Mk('poor', { mouth: 'smile', gaze: [-0.6, 0] }), 1.1); c.restore(); }
        else { const k = K.ease.back(K.clamp((t - 79.32) / 0.35)); c.save(); c.scale(k, k);
          c.save(); c.translate(-120, -30); a104Bust(c, a104Mk('poor', { mouth: 'frown', brow: -0.7 }), 1.0); c.restore(); for (let i = 0; i < 3; i++) a104Scroll(c, -200 + i * 30, -95 + (i % 2) * 8, 0.6, { rot: -0.3 + i * 0.3 }); a104Arcs(c, -120, 80, 30, ((t - 79.4) % 0.9) / 0.9);
          a104Dog(c, { x: 170, y: 120, s: 0.7, dir: -1, pal: 1, sit: 1, collar: 'gold', lid: 0.3, mouth: 'smile', tailWag: t * 6 }); a104Dish(c, 20, 90, { s: 0.7 }); a104Dash(c, [40, 40], [-30, 40], (t - 79.5) / 0.4, C.red); c.restore(); }
      }); }
  }
  // S7-S11
  if (set === 'street' && t >= 89.48 && t < 91.0) { const n = t < 89.75 ? 250 : t < 90.0 ? 500 : t < 90.25 ? 750 : 1000; S0.counter(ctx, n, 760, 300, K.clamp((t - 89.48) / 0.3), { size: 66 }); }
  if (set === 'street' && t >= 90.42 && t < 91.3) a104Word(ctx, t, 'BIG PRICE!', 90.42, 0.85, [420, 300], { size: 56 });
  if (set === 'street' && t >= 95.32 && t < 96.4) a104Name(ctx, t, 'GOODS', 95.32, 1.05, [380, 330], V([1395, 760]));
  if (set === 'street' && t >= 100.7 && t < 102.2) { const n = t < 101.0 ? 3 : t < 101.25 ? 7 : 12; S0.counter(ctx, n, 820, 260, K.clamp((t - 100.7) / 0.3), { size: 60 }); }
  if (set === 'street' && t >= 106.5 && t < 110.2 && F.S) { const hd = V(a104Head(F.S)), p = K.clamp((t - 106.5) / 0.7) * (1 - K.clamp((t - 109.9) / 0.3));
    const wide = a104E(t, 108.94, 0.9);
    thoughtCloud(ctx, 500, 420, 640, 440, t, { p, tail: [hd[0] - 20, hd[1] - 60], scale: K.lerp(1.3, 0.7, wide), at: [K.lerp(280, 520, wide), K.lerp(820, 800, wide)], bg: '#fff6dc',
      inside: (c) => { const tt = t < 107.74 ? 72.3 + ((t - 106.5) % 1.25) : 74.6 + Math.min(t - 107.74, 1.0); LIFE.t = null; a104CourtWorld(c, Math.max(tt, 72.3)); LIFE.t = t; } }); }
  if (set === 'street' && t >= 113.98 && t < 115.3 && F.S) a104Name(ctx, t, 'FOR THE DISH', 113.98, 1.2, [430, 300], V(a104Pt(F.S, 52, -120)), { size: 44 });
  if (set === 'street' && t >= 115.32 && t < 116.6 && F.S) { const hp = V(a104Pt(F.S, 40, -100)); a104Balloon(ctx, 560, 330, 380, 180, hp, K.clamp((t - 115.32) / 0.3) * (1 - K.clamp((t - 116.3) / 0.3)), (c) => { a104Dish(c, -100, 30, { s: 1.0 }); c.font = K.font(70, BF, 400); c.textAlign = 'center'; c.fillStyle = C.black; c.fillText('=', 0, 24); a104CoinPile(c, 100, 40, 15, 12); }); }
  // ruin
  if (set === 'ruin' && t >= 122.84 && t < 124.0) a104Name(ctx, t, 'RUINED', 122.84, 1.1, [380, 250], V([2150, 700]), { fill: C.red, color: C.white });
  // hut: the inset of the rich host, the story balloon, the dish icon, MY DOG!
  if (set === 'hut') {
    const O = F.O, oh = V(a104Head(O));
    const lordBust = (c, o) => a104Bust(c, a104Mk('lord', { s: 1, sit: 0, ...o }), 1.35);
    const inA = a104Env(t, 135.84, 138.0, 0.35);
    if (inA > 0) a104Inset(ctx, Math.min(oh[0] + 250, 840), oh[1] - 170, 150, inA, (c) => { c.fillStyle = '#f4e3b5'; c.fillRect(-160, -160, 320, 320); lordBust(c, { lid: Math.max(0.15, pulse(t, 137.0, 0.3)), mouth: 'smile', gaze: [-0.5, 0.1] }); }, { dream: true });
    const inB = a104Env(t, 166.23, 167.5, 0.3);
    if (inB > 0) a104Inset(ctx, 790, 280, 150, inB, (c) => { c.fillStyle = '#f4e3b5'; c.fillRect(-160, -160, 320, 320); c.save(); c.translate(0, -10); person(c, a104Mk('lord', { x: 0, y: 150, s: 1.2, sit: 1, seat: 'floor', handR: PERSON_HANDS.wave.R, mouth: 'smile', gaze: [-0.5, 0.1] })); c.restore(); }, { dream: true, alpha: inB });
    if (t >= 139.18 && t < 143.6) { const vh = V(a104Head(F.V)), p = K.clamp((t - 139.18) / 0.35) * (1 - K.clamp((t - 143.3) / 0.3));
      a104Balloon(ctx, 470, 290, 660, 250, vh, p, (c) => {
        const fr = (i, t0, draw) => { const k = K.ease.back(K.clamp((t - t0) / 0.3)); if (k <= 0) return; c.save(); c.translate(-205 + i * 205, 0); c.scale(k, k); c.fillStyle = C.paper; c.fillRect(-92, -92, 184, 184); c.save(); c.beginPath(); c.rect(-92, -92, 184, 184); c.clip(); draw(c); c.restore(); c.lineWidth = 6; c.strokeStyle = C.black; c.strokeRect(-92, -92, 184, 184); c.restore(); };
        fr(0, 139.96, (c2) => { c2.save(); c2.translate(0, 70); person(c2, a104Mk('poor', { x: 0, y: 0, s: 0.62, sit: 1, seat: 'floor', mouth: 'frown', brow: -0.6, handL: [-14, -100], handR: [18, -100] })); c2.restore(); a104Arcs(c2, 30, 10, 20, ((t - 140) % 0.8) / 0.8); if (t >= 141.96) a104X(c2, 0, 20, 50, (t - 141.96) / 0.3); });
        fr(1, 140.5, (c2) => { a104Dish(c2, -40, 74, { s: 0.7 }); a104Dog(c2, { x: 60, y: 80, s: 0.5, dir: -1, pal: 1, collar: 'gold', raise: 1, pawW: [-10, 50], lid: 0.3, tailWag: t * 6 }); });
        fr(2, 141.0, (c2) => { a104Dish(c2, 0, 50, { s: 1.0, glint: ((t * 0.8) % 2) / 0.9 }); if (t >= 142.48) { for (let i = 0; i < 3; i++) a104Scroll(c2, -50 + i * 50, -50, 0.5); a104X(c2, 0, -50, 70, (t - 142.48) / 0.3); } });
      }); }
    const dishIc = [V([555, 640])[0], V([555, 640])[1]];
    if (t >= 154.86 && t < 161.0) { const p = K.ease.back(K.clamp((t - 154.86) / 0.3)) * (1 - K.clamp((t - 160.7) / 0.3)); if (p > 0.02) { ctx.save(); ctx.translate(dishIc[0], dishIc[1]); ctx.scale(p, p);
      ctx.beginPath(); ctx.arc(0, -10, 70, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.stroke(); a104Dish(ctx, 0, 30, { s: 0.85 });
      if (t < 159.9) { ctx.font = K.font(56, BF, 400); ctx.textAlign = 'center'; ctx.fillStyle = C.red; ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.strokeText('?', 46, -30); ctx.fillText('?', 46, -30); }
      if (t >= 159.78) { const k = K.ease.back(K.clamp((t - 159.78) / 0.3)); ctx.save(); ctx.translate(0, -20); ctx.scale(k, k); for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 34, -20], [sd * 34, 20]], C.red, { lw: 4, seed: 470 }); shape(ctx, ell(0, 0, 10, 10, 10), C.red, { lw: 4, seed: 471 }); ctx.restore(); }
      ctx.restore(); } }
    if (t >= 157.26 && t < 158.6) a104Name(ctx, t, 'MY DOG!', 157.26, 1.2, [780, 330], V(a104DogHead(F.D)), { size: 50, bend: -0.15 });
  }
}

// ---------- the scene ----------
const SCENE = {
  duration: A104_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / A104_VW, ph / A104_VH);
    const cam = a104Cam(t);
    ctx.save(); K.camera(ctx, A104_VW, A104_VH, cam); const F = a104World(ctx, t, cam) || {}; ctx.restore();
    // the S9 nights tint the street
    if (t >= 97.8 && t < 101.6) { const n = dayCycle(a104U(t)).night; if (n > 0.02) { ctx.save(); ctx.globalAlpha = 0.45 * n; ctx.fillStyle = '#0d2260'; ctx.fillRect(0, 0, A104_VW, A104_VH); ctx.restore(); } }
    a104Overlays(ctx, t, F, cam);
    // wipe into the court (20.3-20.6) and the whip to the hut (131.3-131.84)
    if (t >= 20.3 && t < 20.62) { const u = (t - 20.3) / 0.32; ctx.save(); ctx.fillStyle = C.white; ctx.beginPath(); const x = K.lerp(-400, 1400, u); ctx.moveTo(x - 300, 0); ctx.lineTo(x + 100, 0); ctx.lineTo(x - 100, 1230); ctx.lineTo(x - 500, 1230); ctx.fill(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
    if (t >= 131.3 && t < 132.0) { const u = (t - 131.3) / 0.7; ctx.save(); ctx.globalAlpha = 0.9 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(131); for (let i = 0; i < 30; i++) ctx.fillRect(-200 + r() * 1200 - u * 500, r() * 1230, 260 + r() * 300, 8 + r() * 16); ctx.restore(); }
    if (t >= 110.2 && t < 111.8) S.transition(ctx, A104_VW, A104_VH, (t - 110.2) / 1.6, { caption: 'YEARS LATER...' });
    if (t >= 168.6) S.title(ctx, 'THE END', 500, 190, K.clamp((t - 168.6) / 0.8), { size: 92, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's six quiet effects, each in a measured narration pause or after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, A104_DUR, 0.5);
    k.play('thud', 61.95, { gain: 0.25 });               // dog1 lies down, tail thump (pause 61.48-62.76)
    k.play('thud', 64.9, { gain: 0.2 });                 // the slow tail thump: go on (pause 64.66-65.46)
    k.play('chime', 83.2, { note: 'E6', gain: 0.4 });    // the dish is his (pause 82.80-83.80)
    k.play('pop', 147.72, { gain: 0.3 });                // before the refusal (pause 147.40-148.83)
    k.play('chime', 168.75, { note: 'C6', gain: 0.5 });  // THE END (after the last word, 168.39)
    k.play('thud', 170.0, { gain: 0.2 });                // the old dog's last tail thump
  },
};
window.SCENE = SCENE;
