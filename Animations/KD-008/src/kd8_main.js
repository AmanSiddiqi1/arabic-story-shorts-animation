// ===== KD-008 The Tortoise and the Two Ducks: shot router, thought clouds, lettering, panel, subtitles, sound =====
const KD8_DUR = 174.452;   // narration 170.452 s + 4.0 s held ending (creative plan)
const KD8_SHOTS = [[0, KD8_SC_POND], [109.6, KD8_SC_AIR], [125.98, KD8_SC_VIL], [133.8, KD8_SC_UP], [136.0, KD8_SC_AIR], [137.0, KD8_SC_VIL], [141.25, KD8_SC_AIR], [162.58, KD8_SC_VIL], [166.0, KD8_SC_LAKE]];
const kd8Shot = (t) => { let s = KD8_SHOTS[0][1]; for (const [a, sc] of KD8_SHOTS) if (t >= a) s = sc; return s; };
const kd8Cam = (sc, t) => { const c = K.camAt(sc.cam, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, sc.ww - 500 / z), y: K.clamp(c.y, 615 / z, sc.wh - 615 / z), zoom: z }; };
const kd8Pan = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const kd8In = (t, a, b) => K.clamp(Math.min((t - a) / 0.3, (b - t) / 0.25));    // pop in / fade out
// ---------- small drawn icons ----------
function kd8NoMouth(ctx, x, y, s, p) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k * s, k * s);
  S0.box(ctx, -70, -60, 140, 120, 1, { fill: C.white, lw: 7, seed: 41 }); shape(ctx, [[-40, -10], [40, -14], [30, 26], [-30, 28]], C.black, { lw: 3, seed: 42 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(0, 16, 20, 8, 0, 0, 7); ctx.fill();
  ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-50, -44); ctx.lineTo(50, 44); ctx.moveTo(50, -44); ctx.lineTo(-50, 44); ctx.stroke(); ctx.restore(); }
function kd8Drop(ctx, x, y, s, crossed) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[0, -40], [22, -2], [18, 18], [0, 26], [-18, 18], [-22, -2]], C.blue, { lw: 5, seed: 43, dot: C.white, pitch: 6, rad: 0.2, da: 0.5 });
  if (crossed) { ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-34, -40); ctx.lineTo(34, 34); ctx.stroke(); } ctx.restore(); }
// thought-cloud pictures (cloud-centred units)
function kd8CloudStory(c, t) {   // S1: river, mountains, far city
  const r = K.clamp((t - 15.26) / 0.7); if (r > 0) { const pts = []; for (let i = 0; i <= 30 * r; i++) { const x = -260 + i * 14; pts.push([x, 70 + Math.sin(i * 0.5) * 18]); } c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = C.black; c.lineWidth = 30; K.poly(c, pts); c.stroke(); c.strokeStyle = C.blue; c.lineWidth = 20; K.poly(c, pts); c.stroke(); c.restore(); }
  const m = K.ease.back(K.clamp((t - 16.06) / 0.5)); if (m > 0) for (const [mx, mh, sd] of [[-150, 120, 1], [-40, 150, 2], [60, 110, 3]]) { const h = mh * m; shape(c, [[mx - 80, 40], [mx, 40 - h], [mx + 80, 40]], '#8a7aa6', { lw: 5, seed: 200 + sd }); shape(c, [[mx - 22, 40 - h * 0.72], [mx, 40 - h], [mx + 22, 40 - h * 0.72]], C.white, { lw: 4, seed: 210 + sd }); }
  const f = K.ease.back(K.clamp((t - 18.02) / 0.5)); if (f > 0) { c.save(); c.setLineDash([6, 10]); c.lineWidth = 5; c.strokeStyle = C.black; c.beginPath(); c.moveTo(120, 90); c.quadraticCurveTo(180, 60, 210, 10); c.stroke(); c.restore();
    for (const [bx, bh] of [[190, 40], [216, 60], [240, 34]]) shape(c, [[bx - 12, 10], [bx - 12, 10 - bh * f], [bx + 12, 10 - bh * f], [bx + 12, 10]], C.yellow, { lw: 4, seed: 220 + bx }); shape(c, ell(216, -50 - 8 * f, 12 * f, 12 * f, 12), C.yellow, { lw: 4, seed: 225 }); }
}
function kd8CloudLake(c, t, big = 1, hills = 0, fish = 0) {   // the lake beyond the hills (S2 small, S3)
  shape(c, ell(40, 50, 210 * big, 60 * big, 30), C.blue, { lw: 6, seed: 230, dot: C.white, pitch: 9, rad: 0.15, da: 0.6 });
  if (hills > 0) for (const [hx, sd] of [[-170, 1], [-60, 2]]) shape(c, ell(hx, 120 - 40 * hills, 110, 90 * hills, 24), GREEN, { lw: 6, seed: 240 + sd, dot: GREEND, pitch: 8, rad: 0.2 });
  if (fish > 0 && fish < 1) kd8Fish(c, 60 + fish * 80, 30 - Math.sin(Math.PI * fish) * 110, 0.8, -1.1 + fish * 2.2);
  if (big > 0.5) for (let i = 0; i < 4; i++) { const a = Math.sin(t * 4 + i * 2); if (a > 0.3) star(c, -60 + i * 70, 30 + (i % 2) * 30, 9 * a, C.white); }
}
function kd8Board(c, t) {   // S4 plan board: the stick, two ducks, the tortoise in the middle, the flight to the lake
  const draw = K.clamp((t - 67.94) / 1.0), lift = K.ease.inOut(K.clamp((t - 76.02) / 1.6)), land = K.ease.inOut(K.clamp((t - 79.08) / 0.9));
  const ox = K.lerp(0, 60, land) + lift * 20, oy = -lift * 60 + land * 40, a = [-280 + ox, -10 + oy], b = [280 + ox, -10 + oy];
  if (t > 75.3) { c.save(); c.setLineDash([8, 12]); c.lineWidth = 5; c.strokeStyle = C.black; c.beginPath(); c.moveTo(-180, 60); c.quadraticCurveTo(0, -150, 230, 70); c.stroke(); c.restore(); }
  if (t > 79.0) shape(c, ell(220, 150, 150, 40, 24), C.blue, { lw: 5, seed: 250, dot: C.white, pitch: 8, rad: 0.15, da: 0.6 });
  const p = K.trim([a, b], draw); if (p.length > 1) kd8Stick(c, p[0], p[p.length - 1], 0);
  const dk = (tt) => K.ease.back(K.clamp((t - tt) / 0.35));
  for (const [i, tt] of [[0, 70.68], [1, 70.9]]) { const k = dk(tt); if (k > 0) kd8Duck(c, { x: (i ? b[0] : a[0]) - 130, y: -10 + oy + 40, s: 1.0 * k, pal: i, fly: t > 76.0, flap: Math.sin(t * 9 + i * 2), neck: 0.6, clamp: true, dir: 1 }); }
  const tk = dk(73.96); if (tk > 0) { const P = kd8TortHang({ ...KD8_HANG, s: 0.85 * tk, legSw: t * 2 }, [(a[0] + b[0]) / 2, -4 + oy]); kd8Tort(c, P); kd8Tort(c, { ...P, pass: 'beak' }); }
}
function kd8CloudLecture(c, t) {   // S8: herself, big and stern, lecturing tiny bowed villagers; then a winged tortoise, crossed out
  if (t < 146.72) { const P = { x: -60, y: 90, s: 0.9, dir: 1, brow: 1, mouth: 'open', open: Math.abs(Math.sin(t * 9)), neck: 0.6, nAng: -0.5, gaze: [1, 0.5] }; kd8Tort(c, P);
    for (const [px, i] of [[120, 0], [180, 1], [240, 2]]) person(c, { x: px, y: 110, s: 0.42 * (1 - 0.15 * K.clamp((t - 145.5) / 1)), costume: ['villager', 'villageWoman', 'servant'][i], drop: 18, lid: 0.6, mouth: 'frown' }); }
  else { const P = { x: 0, y: 80, s: 0.95, dir: 1, mouth: 'smile', neck: 0.5 }; for (const sd of [-1, 1]) { c.save(); c.translate(0, -60); c.scale(sd, 1); shape(c, [[10, 0], [90, -70], [150, -60], [120, -30], [140, -10], [60, 10]], C.white, { lw: 5, seed: 260 }); c.restore(); } kd8Tort(c, P);
    const k = K.clamp((t - 147.26) / 0.3); c.save(); c.lineCap = 'round'; c.strokeStyle = C.red; c.lineWidth = 22; c.beginPath(); c.moveTo(-150, -110); c.lineTo(-150 + 300 * k, -110 + 220 * k); if (k >= 1) { c.moveTo(150, -110); c.lineTo(-150, 110); } c.stroke(); c.restore(); }
}
// world-anchored effects drawn inside the camera
function kd8WorldFx(ctx, t, sc) {
  if (sc === KD8_SC_POND) {
    if (t > 13.6 && t < 19.3) { const p = K.clamp((t - 13.92) / 0.6) * (t > 19.0 ? 1 - (t - 19.0) / 0.3 : 1); thoughtCloud(ctx, 600, 500, 540, 300, t, { p, tail: [600, 800], inside: kd8CloudStory, scale: 1, at: [0, 0] }); }
    if (t > 35.3 && t < 36.7) { const T = kd8TortGeo(kd8TortPond(t)).head; thoughtCloud(ctx, 730, 520, 380, 230, t, { p: K.clamp((t - 35.42) / 0.4) * (t > 36.45 ? (36.7 - t) / 0.25 : 1), tail: [T[0] + 30, T[1] - 40], scale: 0.55, at: [0, 0], inside: (c, tt) => { kd8CloudLake(c, tt, 0.6, 1);
      c.save(); c.setLineDash([10, 14]); c.lineWidth = 7; c.strokeStyle = C.black; c.beginPath(); c.moveTo(-330, 140); c.quadraticCurveTo(-120, -160, 60, 40); c.stroke(); c.restore(); } }); }
    if (t > 43.4 && t < 50.2) { const p = K.clamp((t - 43.54) / 0.5) * (t > 49.56 ? Math.max(0, 1 - (t - 49.56) / 0.6) : 1), big = K.ease.back(K.clamp((t - 44.2) / 0.5)) * 0.6 + 0.4, hl = K.ease.out(K.clamp((t - 45.76) / 0.6)), fish = K.clamp((t - 48.2) / 1.0);
      thoughtCloud(ctx, 520, 420, 600, 340, t, { p, tail: [560, 760], scale: 1, at: [0, 0], inside: (c, tt) => { kd8CloudLake(c, tt, big, hl, fish); if (hl > 0) { const hp = K.clamp((tt - 46.0) / 0.8); S0.arrow(c, [-250, 90], [-250 + 300 * hp, 90 - 160 * Math.sin(Math.PI * Math.min(1, hp)) + 0], hp, { bend: 0.3, width: 14 }); } } }); }
    if (t > 67.8 && t < 81.2) { const p = K.clamp((t - 67.94) / 0.5) * (t > 80.6 ? Math.max(0, 1 - (t - 80.6) / 0.5) : 1); thoughtCloud(ctx, 510, 420, 860, 500, t, { p, tail: [650, 760], scale: 0.95, at: [0, 0], inside: kd8Board }); }
    if (t > 90.92 && t < 96.2) kd8NoMouth(ctx, 410, 650, 0.7, (t - 90.92) / 0.35 * (t > 95.8 ? (96.2 - t) / 0.4 : 1));
    if (t > 62.7 && t < 63.45) for (const [k, x, y] of [[0, 840, 760], [1, 700, 775]]) for (let i = 0; i < 3; i++) { const v = K.clamp((t - 62.7 - k * 0.15 - i * 0.12) / 0.15); if (v > 0) shape(ctx, ell(x - 40 + i * 20, y - 60 - i * 18, 7 * v, 7 * v, 10), C.white, { lw: 3, seed: 270 + i }); }
    // chatter balloons bounce off her (93.4 - 95.6)
    if (t > 93.4 && t < 95.7) for (const [i, t0, sx, sy] of [[0, 93.4, 120, 700], [1, 93.9, 900, 680], [2, 94.4, 150, 820], [3, 94.9, 880, 800]]) { const u = (t - t0) / 0.8; if (u < 0 || u > 1) continue;
      const tx = 450, ty = 770, hitU = 0.55, x = u < hitU ? K.lerp(sx, tx, u / hitU) : K.lerp(tx, sx, (u - hitU) * 0.8), y = u < hitU ? K.lerp(sy, ty, u / hitU) : ty - 120 * (u - hitU);
      ctx.save(); ctx.globalAlpha = u > 0.8 ? (1 - u) / 0.2 : 1; shape(ctx, ell(x, y, 46, 32, 20), C.white, { lw: 5, seed: 280 + i }); ctx.font = K.font(40, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(['?', '!', '?!', '!!'][i], x, y + 2); ctx.restore(); }
  }
  if (sc === KD8_SC_AIR && t > 148.66 && t < 151.4) { const R = KD8_LAST_RIG, h = kd8TortGeo(R.T).head, u = (t - 148.7) / 2.6; ctx.save(); ctx.globalAlpha = K.clamp(1.4 - u * 1.3); kd8NoMouth(ctx, h[0] - 120, h[1] - 60 - u * 120, 0.42 * (u > 0.9 ? 1 + (u - 0.9) * 4 : 1), 1); ctx.restore(); }
}
// lettering, labels, counters (panel space)
function kd8Over(ctx, t, sc, cam, S) {
  const P = (x, y) => kd8Pan(x, y, cam);
  if (sc === KD8_SC_POND) {
    if (t > 1.78 && t < 4.4) { const p = K.clamp((t - 1.78) / 0.5) * kd8In(t, 1.78, 4.4); const a = P(380, 700), b = P(520, 960); S.label(ctx, 'HOME', a[0], a[1], p, { size: 46 }); S.arrow(ctx, [a[0] + 40, a[1] + 30], b, p, { bend: 0.2 }); }
    if (t > 7.56 && t < 8.7) { const d = P(610, 800); sfx(ctx, 'QUACK!', d[0], d[1], 64, (t - 7.56) / 0.25, { rot: -0.1 }); }
    if (t > 9.92 && t < 12.2) { const n = Math.min(3, 1 + Math.floor((t - 9.92) / 0.37)), s = P(820, 190); S.counter(ctx, n, s[0] - 230, s[1] + 60, 1, { size: 80 }); S.label(ctx, 'EVERY MORNING', 500, 360, K.clamp((t - 10.1) / 0.4) * kd8In(t, 9.92, 12.2), { size: 44, align: 'center' }); }
    if (t > 20.68 && t < 22.5) { const n = t < 21.25 ? 10 : t < 21.82 ? 20 : 30; S.label(ctx, 'DAY', 90, 150, 1, { size: 50 }); S.counter(ctx, n, 400, 175, K.clamp((t - 20.68) / 0.3), { size: 84 }); }
    if (t > 22.76 && t < 24.6) { const p = K.clamp((t - 22.76) / 0.4) * kd8In(t, 22.76, 24.6); S.label(ctx, 'NO RAIN', 640, 330, p, { size: 50, align: 'center' }); ctx.save(); ctx.globalAlpha = p; kd8Drop(ctx, 820, 300, 1.1, true); ctx.restore(); }
    if (t > 23.4 && t < 25.6) { const a = P(760, 920), b = P(720, 1010); S.arrow(ctx, a, b, K.clamp((t - 23.4) / 0.5), { bend: 0, width: 26 }); }
    if (t > 31.42 && t < 33.5) { const p = K.clamp((t - 31.42) / 0.4) * kd8In(t, 31.42, 33.5), a = P(700, 860), b = P(600, 990); S.label(ctx, 'A LITTLE WATER', a[0], a[1] - 30, p, { size: 46, align: 'center' }); S.arrow(ctx, [a[0] - 60, a[1]], b, p, { bend: -0.2 }); }
    if (t > 36.7 && t < 39.0) { const n = t < 37.4 ? 1 : t < 38.1 ? 2 : 3; S.counter(ctx, n, 820, 330, K.clamp((t - 36.7) / 0.3), { size: 90 }); }
    if (t > 48.2 && t < 49.7) S.label(ctx, 'PLENTY OF WATER', 500, 150, K.clamp((t - 48.2) / 0.4) * kd8In(t, 48.2, 49.7), { size: 48, align: 'center' });
    if (t > 51.18 && t < 52.9) { const h = kd8TortGeo(kd8TortPond(t)).head, a = P(h[0] - 30, h[1] - 120); sfx(ctx, 'HOW?', a[0], a[1], 72, (t - 51.18) / 0.3, { rot: -0.08 }); }
    if (t > 63.44 && t < 64.2) { const a = P(660, 760); S.emphasis(ctx, a[0], a[1], 70, K.clamp((t - 63.44) / 0.3), { word: '!', wx: 0.3, wy: 0.6 }); }
    if (t > 64.88 && t < 66.6) { const p = K.clamp((t - 64.88) / 0.4) * kd8In(t, 64.88, 66.6), a = P(740, 640); S.label(ctx, 'STICK', a[0], a[1], p, { size: 48, align: 'center' }); S.arrow(ctx, [a[0], a[1] + 30], P(740, 760), p, { bend: 0.1 }); }
    if (t > 65.68 && t < 66.9) { const a = P(560, 700); sfx(ctx, 'STRONG!', a[0], a[1], 62, (t - 65.68) / 0.25, { rot: 0.08 }); }
    if (t > 79.88 && t < 81.0) S.label(ctx, 'THE LAKE', 760, 290, K.clamp((t - 79.88) / 0.4) * kd8In(t, 79.88, 81.0), { size: 46, align: 'center' });
    if (t > 82.07 && t < 83.9) { const a = P(330, 690); sfx(ctx, 'YAY!', a[0], a[1], 80, (t - 82.07) / 0.25, { rot: -0.12 }); }
    if (t > 88.14 && t < 90.7) { const p = K.clamp((t - 88.14) / 0.4) * kd8In(t, 88.14, 90.7); S.counter(ctx, 1, 230, 220, p, { size: 90 }); S.label(ctx, 'ONE RULE', 560, 210, p, { size: 56, align: 'center' }); if (t > 88.6) S.emphasis(ctx, 560, 190, 210, K.clamp((t - 88.6) / 0.5), { word: '!', wx: 0.9, wy: 0.4 }); }
    if (t > 97.22 && t < 98.8) { const p = K.clamp((t - 97.22) / 0.35) * kd8In(t, 97.22, 98.8), a = P(690, 820); S.label(ctx, 'YOU FALL!', a[0] + 30, a[1] - 120, p, { size: 52, align: 'center' }); S.arrow(ctx, [a[0] + 120, a[1] - 90], P(700, 930), p, { bend: 0.1 }); }
    if (t > 101.64 && t < 102.85) { const h = kd8TortGeo(kd8TortPond(t)).head, a = P(h[0] - 20, h[1] - 110); sfx(ctx, 'MM HM!', a[0], a[1], 64, (t - 101.64) / 0.25, { rot: -0.06 }); }
    if (t > 105.44 && t < 106.6) sfx(ctx, 'CHOMP!', 330, 300, 84, (t - 105.44) / 0.2, { rot: -0.1 });
  }
  if (sc === KD8_SC_AIR) {
    if (t > 115.04 && t < 116.4) sfx(ctx, 'UP! UP!', 500, 1080, 76, (t - 115.04) / 0.25, { rot: -0.06 });
    if (t > 124.74 && t < 125.98) sfx(ctx, 'MMM!', 760, 860, 70, (t - 124.74) / 0.25, { rot: 0.08 });
    if (t > 144.2 && t < 145.5) sfx(ctx, 'MMPH!', 760, 900, 78, (t - 144.2) / 0.2, { rot: 0.1 });
    if (t > 145.06 && t < 148.66) { const p = K.clamp((t - 145.06) / 0.5); thoughtCloud(ctx, 250, 300, 460, 340, t, { p, tail: [430, 600], scale: 0.8, at: [70, 10], inside: kd8CloudLecture }); }
    if (t > 155.06 && t < 161.9) { const words = ['I', 'AM', 'NOT', 'A'], ts = [155.06, 155.5, 155.86, 156.14], n = ts.filter((x) => t >= x).length, txt = words.slice(0, n).join(' ');
      ctx.save(); ctx.globalAlpha = t > 160.9 ? Math.max(0, (161.9 - t)) : 1; S.label(ctx, txt, 770, 820, K.clamp((t - 155.06) / 0.3), { size: 58, balloon: true, align: 'center' }); ctx.restore(); }
  }
  if (sc === KD8_SC_VIL) {
    if (t > 133.02 && t < 133.8) { const a = P(600, 560); sfx(ctx, 'LOOK!', a[0], a[1], 84, (t - 133.02) / 0.2, { rot: -0.1 }); }
    if (t > 137.04 && t < 139.6) for (const [i, word, x0] of [[0, 'HA', 640], [1, 'HA', 720], [2, 'HA!', 800]]) { const u = (t - 137.04 - i * 0.2), a = P(x0 - 480, 470 - u * 50); if (u > 0) sfx(ctx, word, a[0] + Math.sin(u * 8 + i) * 10, a[1], 64, u / 0.25, { rot: Math.sin(u * 6 + i) * 0.15 }); }
  }
  if (sc === KD8_SC_UP) { const a = [190, 1000], b = [470, 600], p = K.clamp((t - 134.0) / 0.5); S.arrow(ctx, a, b, p, { bend: -0.15, width: 26 }); if (t < 134.6) sfx(ctx, 'LOOK!', 300, 900, 80, 1, { rot: -0.1 }); }
  if (sc === KD8_SC_LAKE) {
    if (t > 168.4 && t < 169.9) S.label(ctx, 'THE LAKE', 500, 230, K.clamp((t - 168.4) / 0.4) * kd8In(t, 168.4, 169.9), { size: 50, align: 'center' });
    if (t >= 170.6) S.title(ctx, 'THE END', 500, 300, K.clamp((t - 170.6) / 0.8), { size: 96, align: 'center' });
  }
}
function kd8Render(ctx, sc, t, S) { const cam = kd8Cam(sc, t); ctx.save(); K.camera(ctx, KD8_VW, KD8_VH, cam); sc.draw(ctx, t); kd8WorldFx(ctx, t, sc); ctx.restore(); kd8Over(ctx, t, sc, cam, S); }
const KD8_SHAKE = (t) => K.spring(t, 162.06, 6, 9, 6) + K.spring(t, 105.44, 2.5, 12, 8) + K.spring(t, 97.2, 2, 12, 8);
const SCENE = {
  duration: KD8_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = KD8_SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / KD8_VW, ph / KD8_VH);
    kd8Render(ctx, kd8Shot(t), t, S);
    if (t >= 19.35 && t < 20.75) S.transition(ctx, KD8_VW, KD8_VH, (t - 19.35) / 1.4, { caption: 'DAYS LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // only the planned effects, all inside narration pauses, quiet (master 0.6 at render)
    k.bed(S.sfx.bed, 0, KD8_DUR, 0.5);
    k.play('whoosh', 19.3, { dur: 0.4, gain: 0.3 }); k.play('click', 26.7, { pitch: 0.5, gain: 0.35 }); k.play('click', 26.85, { pitch: 0.45, gain: 0.3 });
    k.play('pop', 33.3, { pitch: 0.7, gain: 0.35 }); k.play('whoosh', 39.9, { dur: 0.35, gain: 0.28 }); k.play('chime', 80.9, { note: 'E6', gain: 0.5 });
    k.play('pop', 102.85, { pitch: 1.1, gain: 0.35 }); k.play('thud', 162.75, { gain: 0.15 }); k.play('chime', 170.6, { note: 'C6', gain: 0.55 });
  },
};
window.SCENE = SCENE;
