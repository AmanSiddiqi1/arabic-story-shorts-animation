// ===== AN-135 main: scene table, cameras, balloons and clouds (world), lettering (panel), transitions, sound =====
const A135_G = (z, k = 370) => 900 - k / z;   // camera y that puts the ground about k/615 below the panel centre
// scenes: [id, start, end, draw, transition out]
const A135_SC = [
  ['S1', 0, 8.72, 'road', 'cut'], ['S2', 8.72, 13.3, 'road', 'wipe'], ['S3', 13.3, 21.6, 'yard', 'cut'], ['S4', 21.6, 25.5, 'yard', 'wipe'], ['S5', 25.5, 37.0, 'hut', 'wipe'],
  ['S6', 37.0, 54.3, 'yard', 'cut'], ['S7', 54.3, 64.06, 'yard', 'cut'], ['S8', 64.06, 75.9, 'yard', 'cut'], ['S9', 75.9, 94.7, 'yard', 'cut'], ['S10', 94.7, 100.0, 'yard', 'cut'],
  ['S11', 100.0, 110.3, 'yard', 'cut'], ['S12', 110.3, 125.6, 'yard', 'cut'], ['S13', 125.6, 139.0, 'yard', 'cut'], ['S14', 139.0, 148.4, 'yard', 'cut'], ['S15', 148.4, 159.4, 'yard', 'dissolve'],
  ['S16', 159.4, A135_DUR + 1, 'yard', 'none']];
// camera keys [t, x, y, zoom] per set segment (eased between keys; equal keys hold). Road cameras follow the rider.
const A135_CAM = {
  road: (t) => { const z = kfn(t, [[0, 1.45], [6.74, 1.45], [7.5, 1.65], [8.72, 1.65], [9.4, 1.8]]); return [A135_RX(t) + (t < 8.72 ? 110 : 70) / z * 1.3, A135_G(z, 450), z]; },
  hut: [[25.5, 530, 740, 1.8], [26.5, 530, 740, 1.8], [27.0, 505, 790, 2.2], [29.6, 505, 790, 2.2], [32.0, 530, 750, 1.8], [32.7, 545, 760, 1.95], [35.4, 545, 760, 1.95], [37.0, 540, 730, 1.7]],
  yardA: [[13.3, 500, 615, 1.0], [14.8, 500, 615, 1.0], [16.2, 510, A135_G(1.35), 1.35], [21.6, 520, A135_G(1.4), 1.4], [21.61, 540, A135_G(1.5), 1.5], [25.5, 545, A135_G(1.55), 1.55]],
  yardB: [[37.0, 530, A135_G(1.5), 1.5], [40.96, 530, A135_G(1.5), 1.5], [41.4, 290, 735, 1.9], [41.8, 290, 735, 1.9], [42.3, 520, A135_G(1.6), 1.6], [47.0, 500, A135_G(1.75), 1.75], [54.0, 510, A135_G(1.6), 1.6],
    [54.6, 525, A135_G(1.55) - 40, 1.55], [64.0, 545, A135_G(1.55) - 40, 1.55], [64.4, 530, A135_G(1.5) - 20, 1.5], [74.0, 530, A135_G(1.5) - 20, 1.5], [74.4, 560, 700, 1.8], [75.9, 545, 690, 1.75],
    [76.6, 530, A135_G(1.5), 1.5], [77.3, 520, A135_G(1.5), 1.5], [77.9, 410, 640, 1.4], [78.62, 410, 640, 1.4], [79.2, 420, 700, 1.6], [80.62, 420, 700, 1.6], [81.0, 455, 790, 2.3], [82.2, 455, 790, 2.3],
    [82.6, 430, 700, 1.6], [85.2, 430, 700, 1.6], [86.0, 470, 600, 1.15], [94.69, 470, 600, 1.15], [94.7, 500, 615, 1.0], [100.0, 500, 615, 1.0], [101.0, 520, 700, 1.2], [105.5, 560, 690, 1.45],
    [109.3, 540, A135_G(1.5), 1.5], [110.6, 520, A135_G(1.5) - 50, 1.5], [124.4, 515, A135_G(1.5) - 50, 1.5], [125.6, 520, A135_G(1.5), 1.5], [131.3, 520, A135_G(1.5), 1.5], [135.6, 440, 700, 1.9],
    [139.0, 440, 695, 1.9], [141.0, 440, 690, 2.1], [141.72, 470, 600, 1.3], [148.4, 470, 600, 1.3], [149.6, 470, 600, 1.3], [150.2, 500, 690, 1.3], [152.6, 520, A135_G(1.5), 1.5],
    [156.2, 520, A135_G(1.5), 1.5], [156.7, 450, 690, 1.7], [158.0, 470, 690, 1.65], [159.39, 500, A135_G(1.55), 1.55], [159.4, 525, A135_G(1.5), 1.5], [161.0, 525, A135_G(1.5), 1.5], [166.5, 470, A135_G(1.2), 1.2]] };
function a135Cam(set, t) {
  let c; const K2 = set === 'road' ? null : set === 'hut' ? A135_CAM.hut : t < 26 ? A135_CAM.yardA : A135_CAM.yardB, w = set === 'road' ? 3000 : 1000;
  if (!K2) { const v = A135_CAM.road(t); c = { x: v[0], y: v[1], zoom: v[2] }; }
  else { const i = K2.findIndex((q) => t < q[0]); if (i === 0) c = { x: K2[0][1], y: K2[0][2], zoom: K2[0][3] }; else if (i < 0) { const q = K2[K2.length - 1]; c = { x: q[1], y: q[2], zoom: q[3] }; }
    else { const a = K2[i - 1], b = K2[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; } }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, w - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z };
}
const a135Pan = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const a135SceneAt = (t) => { let i = A135_SC.findIndex((s) => t < s[2]); if (i < 0) i = A135_SC.length - 1; return i; };

// ---------- the thought cloud (S9, S14-S15): the king crowned on his throne, the coin pile growing ----------
function a135CloudInside(t, grey) { return (c) => {
  palaceHall(c, { t, lampsLit: 1 }); const th = HALL.throne, n = grey ? 40 : t < 87.18 ? 3 : t < 87.5 ? 3 : t < 87.75 ? 12 : 40;
  const dip = grey ? 1 : anticipate(t, 87.38, 0.1, 0.1) * anticipate(t, 87.63, 0.1, 0.1);
  c.save(); c.translate(540, 900); c.scale(1, dip); a135Coins(c, 0, 0, n, 1.5); c.restore();
  const rub = t >= 87.18 || grey ? Math.sin(t * 14) * 6 : 0;
  const P = { x: th.x, y: th.sitY, s: 1, costume: 'caliph', age: 0.35, sit: 1, seat: 'bench', seed: 13, mouth: 'smile', lid: 0.35, gaze: lookAt([th.x, 650], [600, 800]), hR: [24 + rub, -138], hL: [-6 - rub, -132], noBlink: true };
  a135Person(c, P);
  if (!grey && t >= 87.18) { c.save(); c.globalAlpha = a135B(t, 87.18, 0.3); S0.arrow(c, [420, 880], [420, 620], a135B(t, 87.18, 0.5), { width: 30, color: C.red }); c.restore(); }
  if (t >= 87.88 || grey) sfx(c, 'MORE TAX!', 640, 520, 120, grey ? 1 : K.clamp((t - 87.88) / 0.3), { rot: -0.06 });
  if (grey) { c.fillStyle = 'rgba(110,110,125,0.38)'; c.fillRect(-200, -200, 1600, 1600); }
}; }
function a135Cloud(ctx, t, KP) {
  const head = a135Head(KP), tail = [head[0] + 20, head[1] - 60];
  if (a135In(t, 85.26, 94.75)) { const p = Math.min(K.clamp((t - 85.26) / 0.7), K.clamp((94.75 - t) / 0.2)); thoughtCloud(ctx, 560, 330, 520, 380, t, { p, tail, scale: 0.62, at: [700, 700], inside: a135CloudInside(t, false) }); }
  if (a135In(t, 141.72, 149.7)) { const p = Math.min(K.clamp((t - 141.72) / 0.6), K.clamp((149.65 - t) / 0.15)); thoughtCloud(ctx, 560, 330, 520, 380, t, { p, tail, scale: 0.62, at: [700, 700], inside: a135CloudInside(t, true), fill: '#dcd8d0' }); }
  if (a135In(t, 149.5, 150.4)) { const d = t - 149.5, r = K.rng(5); ctx.save(); ctx.globalAlpha = 1 - d / 0.9;
    for (let i = 0; i < 12; i++) { const a = r() * 6.28, dd = 80 + r() * 220, x = 560 + Math.cos(a) * dd * K.ease.out(d / 0.9), y = 330 + Math.sin(a) * dd * 0.7 * K.ease.out(d / 0.9);
      shape(ctx, ell(x, y, 30 * (1 - d), 26 * (1 - d), 14), C.white, { lw: 4, seed: 3 + i }); if (i % 3 === 0) shape(ctx, ell(x + 20, y + 300 * d * d, 16, 6, 12), C.yellow, { lw: 3, seed: 7 }); } ctx.restore(); }
  if (a135In(t, 144.26, 145.6)) { ctx.save(); ctx.globalAlpha = a135Fade(t, 144.26, 145.6, 0.2) * (1 + 0.3 * pulse(t, 144.9, 0.3)); a135Dash(ctx, [610, 420], [500, 640], a135B(t, 144.26, 0.6), { w: 7 + 4 * pulse(t, 144.9, 0.3) }); ctx.restore(); }
}

// ---------- picture balloons (world units) ----------
function a135Face(c, s, mood, t) {   // a little king head and shoulders for the balloon cells
  const P = { x: 0, y: 170 * s, s, costume: 'caliph', pal: { head: 'bigTurban' }, age: 0.35, seed: 3, noBlink: true, lid: mood === 'thirsty' ? 0.5 : mood === 'sick' ? 0.6 : 0, mouth: mood === 'gulp' ? 'o' : 'open', brow: mood === 'sick' ? -0.6 : -0.3, gaze: [0, 0.2] };
  if (mood === 'gulp') { P.tilt = -0.25; P.hR = [20, -200]; P.hL = [-20, -196]; }
  a135Person(c, P); const hd = a135Head(P);
  if (mood === 'thirsty') { shape(c, ell(hd[0], hd[1] + 40 * s, 7 * s, 9 * s, 12), C.red, { lw: 2.5, seed: 4 }); drops(c, hd[0] + 50 * s, hd[1] - 30 * s, t, 2); }
  if (mood === 'gulp') { const b = [hd[0] + 6 * s, hd[1] - 6 * s]; a135Bowl(c, b[0], b[1], { s: 0.55 * s, tilt: -2.4, fill: 0.6 }); for (let k = 0; k < 3; k++) seg(c, hd[0] + 50 * s, hd[1] + (10 + k * 14) * s, hd[0] + 70 * s, hd[1] + (6 + k * 14) * s, 2, C.black, 0); }
  if (mood === 'sick') { c.save(); c.globalAlpha = 0.45; c.fillStyle = '#5fd05a'; c.beginPath(); c.arc(hd[0], hd[1], 37 * s, 0, 7); c.fill(); c.restore(); const by = a135W(P, [0, -96]);
    c.save(); c.lineWidth = 5; c.strokeStyle = C.red; c.beginPath(); for (let k = 0; k <= 8; k++) c.lineTo(by[0] - 30 * s + k * 7.5 * s, by[1] + (k % 2 ? -10 : 10) * s * (1 + 0.3 * Math.sin(t * 20))); c.stroke(); c.restore(); }
}
function a135Balloons(ctx, t, KP, G) {
  const kh = a135Head(KP), gh = a135Head(G), kTail = [kh[0] - 30, kh[1] - 30], gTail = [gh[0] - 10, gh[1] - 44];
  // S3: water, please
  if (a135In(t, 17.94, 19.7)) a135Balloon(ctx, 330, 545, 150, 130, kTail, Math.min(K.clamp((t - 17.94) / 0.3), K.clamp((19.7 - t) / 0.2)), [{ draw: (c) => { const k = 1 + 0.06 * Math.sin(t * 6); shape(c, [[0, -44 * k], [30 * k, 6], [0, 36 * k], [-30 * k, 6], [0, -44 * k]], '#5fa0ff', { lw: 5, seed: 2 }); shape(c, ell(-9, 2, 6, 10, 10), C.white, { lw: 0 }); } }]);
  // S6: why the powder?
  if (a135In(t, 49.92, 52.1)) a135Balloon(ctx, 320, 540, 210, 140, kTail, Math.min(K.clamp((t - 49.92) / 0.3), K.clamp((52.1 - t) / 0.2)), [{ draw: (c) => { a135Bowl(c, -18, -10, { s: 0.75, fill: 0.7, cut: true, specks: 1 }); a135Q(c, 62, -8, 80, K.clamp((t - 50.2) / 0.3)); } }]);
  // S7: her answer in two frames
  if (a135In(t, 56.46, 64.3)) { const p = Math.min(K.clamp((t - 56.46) / 0.3), K.clamp((64.3 - t) / 0.2));
    a135Balloon(ctx, 520, 470, 440, 220, gTail, p, [{ p: 1, draw: (c) => a135Face(c, 1.2, 'thirsty', t) },
      { p: K.clamp((t - 59.66) / 0.3), draw: (c) => { a135Face(c, 1.2, t >= 63.02 ? 'sick' : 'gulp', t); if (t >= 63.02) a135X2(c, 50, -50, 26, (t - 63.02) / 0.25); } }]); }
  // S8: how many stalks? three?
  if (a135In(t, 68.34, 75.6)) { const p = Math.min(K.clamp((t - 68.34) / 0.3), K.clamp((75.6 - t) / 0.2));
    a135Balloon(ctx, 320, 530, 290, 150, kTail, p, [{ draw: (c) => { [68.4, 68.9, 69.4].forEach((ti, i) => { const gone = i > 0 ? K.clamp((t - 74.12 - i * 0.12) / 0.2) : 0, q = K.clamp((t - ti) / 0.25) * (1 - gone); if (q > 0) { c.save(); c.translate(-80 + i * 46, 6); c.scale(q, q); a135CanePiece(c, 0, 0, { len: 110, w: 18, rot: -1.45 }); c.restore(); }
        if (gone > 0 && gone < 1) { c.save(); c.globalAlpha = 1 - gone; star(c, -80 + i * 46, 0, 18 * (1 + gone), C.white); c.restore(); } }); a135Q(c, 90, 0, 80, K.clamp((t - 69.9) / 0.3) * (t < 74.12 ? 1 : 0)); } }]); }
  // S12: one stalk then, three stalks now, one fat stalk this morning
  if (a135In(t, 111.94, 125.6)) { const p = Math.min(K.clamp((t - 111.94) / 0.3), K.clamp((125.6 - t) / 0.25));
    a135Balloon(ctx, 500, 445, 640, 220, gTail, p, [
      { p: 1, draw: (c) => { a135CanePiece(c, -60, -10, { len: 120, w: 16, rot: -1.45, lush: 0.2 }); a135Bowl(c, 30, 30, { s: 0.55, fill: 0.08, cut: true }); if (a135In(t, 113.28, 114.6)) drops(c, 30, -40, t, 3, A135_CANE.juice); a135X2(c, 0, 0, 40, (t - 114.46) / 0.25); sfx(c, '1', -60, -66, 50, K.clamp((t - 111.94) / 0.3)); } },
      { p: K.clamp((t - 115.66) / 0.3), draw: (c) => { [117.16, 117.56, 117.96].forEach((ti, i) => { const q = K.clamp((t - ti) / 0.2); if (q > 0) { c.save(); c.translate(-80 + i * 26, -10); c.scale(q, q); a135CanePiece(c, 0, 0, { len: 120, w: 14, rot: -1.45, lush: 0.25 }); c.restore(); } });
        const n = t < 117.16 ? 0 : t < 117.56 ? 1 : t < 117.96 ? 2 : 3; if (n) sfx(c, String(n), -54, -66, 50, 1); a135Bowl(c, 40, 30, { s: 0.55, fill: kfn(t, [[118.0, 0], [120.0, 0.2], [121.0, 0.45]]), cut: true }); } },
      { p: K.clamp((t - 121.36) / 0.3), bg: '#ffe680', draw: (c) => { sun(c, 70, -60, t); c.save(); c.scale(0.4, 0.4); c.restore(); a135CanePiece(c, -60, -10, { len: 130, w: 24, rot: -1.45, lush: 1 });
        a135Bowl(c, 30, 30, { s: 0.55, fill: kfn(t, [[123.08, 0.1], [124.0, 1]]), cut: true }); if (a135In(t, 123.2, 124.2)) drops(c, 30, -40, t, 4, A135_CANE.juice); const q = pulse(t, 124.0, 0.6); if (q > 0) star(c, 60, 10, 20 * q, C.white); } }]);
    if (t >= 123.08) { const [x, y] = [500 + 0.5 * (640 / 3 - 14 / 3) * 1 - 4, 445]; sfx(ctx, '<', x + 8, y, 80, K.clamp((t - 123.08) / 0.3), { fill: C.red }); } }
  // S13: good shrinks when the ruler means harm; the crown wrings the house
  if (a135In(t, 131.3, 136.4)) { const p = Math.min(K.clamp((t - 131.3) / 0.3), K.clamp((136.4 - t) / 0.2));
    a135Balloon(ctx, 610, 455, 270, 200, gTail, p, [{ draw: (c) => {
      if (t < 133.22) { a135Bowl(c, -20, -10, { s: 0.7, fill: kfn(t, [[131.4, 1], [132.6, 0.3]]), cut: true }); S0.arrow(c, [80, -60], [80, 50], a135B(t, 131.5, 0.4), { width: 18, color: C.red }); return; }
      const sq2 = a135In(t, 134.3, 135.5) ? 0.55 + 0.45 * (1 - pulse(t, 134.3, 1.1)) : 1;
      c.save(); c.translate(0, 70); c.scale(2 - sq2, 1); shape(c, [[-38, 0], [-38 * sq2, -50], [0, -80], [38 * sq2, -50], [38, 0], [-38, 0]], '#f3e2b8', { lw: 4, seed: 30 }); shape(c, [[-46 * sq2, -46], [0, -86], [46 * sq2, -46]].concat([[-46 * sq2, -46]]), C.red, { lw: 4, seed: 31 }); c.restore();
      a135Crown(c, 0, -30 + 4 * Math.sin(t * 6), 0.9 * K.ease.back(K.clamp((t - 133.22) / 0.3)));
      if (t >= 134.3) { for (const sd of [-1, 1]) seg(c, sd * 30, -40, sd * (44 * sq2 + 4), 30, 7, C.yellow, 2.5); for (let k = 0; k < 3; k++) { const u = ((t - 134.4) * 1.4 + k / 3) % 1; if (t > 134.4) { c.save(); c.globalAlpha = 1 - u; shape(c, ell(-10 + k * 10, 80 + u * 40, 10, 4, 10), C.yellow, { lw: 2, seed: 6 }); c.restore(); } } } } }]); }
  // S16: her word floats to his crown
  if (a135In(t, 160.98, 162.4)) { const u = a135B(t, 160.98, 1.0), kc = [kh[0], kh[1] - 70], st = [gh[0] - 30, gh[1] - 90], p = a135Mix(st, kc, u); p[1] -= 60 * Math.sin(Math.PI * u);
    if (t < 162.0) a135Balloon(ctx, p[0], p[1], 100, 90, null, K.clamp((t - 160.98) / 0.25), [{ draw: (c) => a135CanePiece(c, 0, 0, { len: 70, w: 14, rot: -1.45 }) }]);
    else for (let k = 0; k < 3; k++) { const q = pulse(t, 162.0 + k * 0.05, 0.4); star(ctx, kc[0] - 40 + k * 40, kc[1] - 20 - 30 * (t - 162), 22 * q, C.yellow); } }
}
// other world effects in the yard: waiting dots, sweat drop, star, heart, red X on the torn scroll, ghost tax sack
function a135YardFx(ctx, t, KP, G) {
  const kh = a135Head(KP), gh = a135Head(G);
  if (a135In(t, 106.84, 107.9)) for (let k = 0; k < 3; k++) { const q = K.clamp((t - 106.84 - k * 0.3) / 0.15); if (q > 0) shape(ctx, ell(kh[0] - 30 + k * 30, kh[1] - 95, 10 * q, 10 * q, 12), C.black, { lw: 0 }); }
  if (a135In(t, 135.5, 136.5)) { const u = (t - 135.5) / 1.0; shape(ctx, [[kh[0] + 44, kh[1] - 30 + u * 40], [kh[0] + 52, kh[1] - 14 + u * 40], [kh[0] + 44, kh[1] - 8 + u * 40], [kh[0] + 36, kh[1] - 14 + u * 40], [kh[0] + 44, kh[1] - 30 + u * 40]], '#5fa0ff', { lw: 3, seed: 2 }); }
  const sq = pulse(t, 153.9, 0.7); if (sq > 0) star(ctx, gh[0] + 46, gh[1] - 40, 18 * sq, C.yellow);
  if (a135In(t, 158.8, 160.4)) { const u = (t - 158.8) / 1.6; heart(ctx, 522, 700 - 120 * u, 26 * K.ease.back(K.clamp(u * 4)), { alpha: 1 - Math.max(0, u - 0.7) / 0.3 }); }
  if (t >= 164.92) a135X2(ctx, 462, 872, 40, (t - 164.92) / 0.3);
  if (a135In(t, 166.98, 170.6)) { const u = t < 170.35 ? 1 : 1 - (t - 170.35) / 0.25, k = (1 + 0.15 * pulse(t, 168.12, 0.8)) * K.ease.back(K.clamp((t - 166.98) / 0.4));
    if (t < 170.35) { ctx.save(); ctx.translate(170, 540); ctx.scale(1.5 * k, 1.5 * k); ctx.globalAlpha = 0.55; shape(ctx, [[-80, 70], [-96, 10], [-60, -50], [-24, -70], [-40, -100], [40, -100], [24, -70], [60, -50], [96, 10], [80, 70], [-80, 70]], '#d9c9a0', { lw: 0 });
      ctx.globalAlpha = 1; ctx.setLineDash([14, 10]); ctx.lineWidth = 6; ctx.strokeStyle = C.black; K.poly(ctx, [[-80, 70], [-96, 10], [-60, -50], [-24, -70], [-40, -100], [40, -100], [24, -70], [60, -50], [96, 10], [80, 70], [-80, 70]]); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = K.font(54, BF, 400); ctx.textAlign = 'center'; ctx.fillStyle = C.black; ctx.fillText('TAX', 0, 20); ctx.restore(); }
    else { const d = t - 170.35; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28, r = 40 + 200 * d; ctx.save(); ctx.globalAlpha = Math.max(0, 1 - d / 0.25 * 0.8); star(ctx, 170 + Math.cos(a) * r, 560 + Math.sin(a) * r * 0.7, 14, C.white); ctx.restore(); } } }
}

// ---------- lettering, labels, counters (panel space, view 1000 x 1230) ----------
function a135Over(ctx, t, cam, S, set, st) {
  const P = (x, y) => a135Pan(x, y, cam);
  const lab = (txt, wx, wy, a, b, o = {}) => { if (!a135In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a135Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, a135B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!a135In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a135Fade(t, a, b, 0.2); S.arrow(ctx, o.panel ? a0 : P(...a0), o.panel ? a1 : P(...a1), a135B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); };
  const word = (txt, wx, wy, a, b, size = 84, o = {}) => { if (!a135In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a135Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  const count = (v, x, y, a, b, w2) => { if (!a135In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a135Fade(t, a, b, 0.25); S.counter(ctx, v, x, y, a135B(t, a, 0.3), { size: 84 }); if (w2) S.label(ctx, w2, x, y + 96, a135B(t, a + 0.1, 0.3), { size: 34, align: 'center' }); ctx.restore(); };
  if (set === 'road') { const H = a135RoadHorse(t), sd = mountSeat('horse', H);
    lab('KING ANUSHIRWAN', 340, 200, 1.25, 3.5, { panel: true, size: 50 }); arr([360, 250], P(sd.x + 10, sd.y - 140), 1.35, 3.5, { panel: true, bend: 0.2 });
    if (a135In(t, 5.18, 6.7)) { const kx = P(A135_RX(t) - 140, 640), hx = P(A135_RX(Math.min(t, 4.18) - 0) - 210 + (t - 4.18) * 120 + 40, 640); ctx.save(); ctx.globalAlpha = a135Fade(t, 5.18, 6.7, 0.2); a135Dash(ctx, [Math.max(40, hx[0]), 470], [kx[0], 470], a135B(t, 5.18, 0.5), { col: C.yellow, w: 8 }); ctx.restore(); }
    const camX = cam.x - 500 / cam.zoom, hp = P(1230 + 0.7 * camX, 800); lab('A VILLAGE!', Math.min(820, hp[0] - 60), hp[1] - 260, 12.14, 13.5, { panel: true, size: 52 }); arr([Math.min(820, hp[0] - 60), hp[1] - 210], [hp[0], hp[1] - 30], 12.2, 13.5, { panel: true, bend: -0.2 }); }
  if (set === 'hut') { count(1, 190, 230, 27.32, 30.2, 'STALK'); const st = a135HutStalk(t); arr([st.c[0] - 60, st.c[1] - 70], [A135_HB[0] - 20, A135_HB[1] + 10], 29.24, 30.2, { bend: 0.5, width: 16 }); }
  if (set === 'yard') {
    lab('A STRANGER?', 455, 575, 39.4, 41.0, { size: 44 });
    word('SIP...', 585, 690, 44.26, 46.2, 54, { rot: -0.08 }); word('SIP...', 600, 630, 44.9, 46.2, 54, { rot: 0.05 });
    if (a135In(t, 74.12, 75.9)) { word('ONLY ONE!', 470, 560, 74.12, 75.9, 72, { rot: -0.05 }); count(1, 840, 220, 74.12, 75.9); }
    lab('RICH LAND!', 410, 470, 77.38, 78.7, { size: 50 });
    if (a135In(t, 84.46, 86.1)) { const c = a135ScrollPos(t); lab('TAX: SMALL', c[0] - 10, c[1] - 120, 84.46, 86.1, { size: 46 }); arr([c[0] + 40, c[1] - 92], [c[0] + 22, c[1] + 20], 84.6, 86.1, { bend: -0.3, width: 14 }); }
    if (a135In(t, 156.4, 158.0)) { const h = a135Head(st.KP); lab('THE KING!', h[0] - 150, h[1] - 170, 156.6, 158.0, { size: 50 }); arr([h[0] - 120, h[1] - 140], [h[0] - 20, h[1] - 75], 156.7, 158.0, { bend: 0.2, width: 14 }); }
    lab('NO NEW TAX!', 470, 990, 164.92, 166.9, { size: 50 });
    if (t >= 170.5) S.title(ctx, 'THE END', 500, 190, a135B(t, 170.5, 0.8), { size: 86, align: 'center' });
  }
}

function a135DrawScene(ctx, i, t, S) {
  const sc = A135_SC[i], set = sc[3], cam = a135Cam(set, t); let st = {};
  ctx.save(); K.camera(ctx, 1000, 1230, cam);
  if (set === 'road') a135Road(ctx, t, cam);
  else if (set === 'hut') a135Hut(ctx, t, cam);
  else { st = a135Yard(ctx, t, cam); a135Cloud(ctx, t, st.KP); a135Balloons(ctx, t, st.KP, st.G); a135YardFx(ctx, t, st.KP, st.G); }
  ctx.restore(); a135Over(ctx, t, cam, S, set, st);
}

const SCENE = {
  duration: A135_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, bump = a135In(t, 151.0, 151.07) ? 6 : 0;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py + bump); ctx.scale(pw / 1000, ph / 1230);
    const i = a135SceneAt(t), sc = A135_SC[i], prev = A135_SC[i - 1], next = A135_SC[i + 1];
    const wipeIn = prev && prev[4] === 'wipe' && t < sc[1] + 0.2, wipeOut = next && sc[4] === 'wipe' && t > sc[2] - 0.2;
    const dissIn = prev && prev[4] === 'dissolve' && t < sc[1] + 0.25, dissOut = next && sc[4] === 'dissolve' && t > sc[2] - 0.25;
    if (wipeIn || wipeOut) { const a = wipeIn ? i - 1 : i, b = a + 1, tb = A135_SC[a][2], p = K.ease.inOut(K.clamp((t - tb + 0.2) / 0.4)), X = K.lerp(-260, 1260, p);
      a135DrawScene(ctx, a, Math.min(t, tb - 0.001), S); ctx.save(); ctx.beginPath(); ctx.moveTo(-400, -10); ctx.lineTo(X + 160, -10); ctx.lineTo(X - 160, 1240); ctx.lineTo(-400, 1240); ctx.closePath(); ctx.clip(); a135DrawScene(ctx, b, Math.max(t, tb), S); ctx.restore();
      ctx.save(); ctx.lineWidth = 18; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(X + 160, -10); ctx.lineTo(X - 160, 1240); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore(); }
    else if (dissIn || dissOut) { const a = dissIn ? i - 1 : i, tb = A135_SC[a][2], p = K.clamp((t - tb + 0.25) / 0.5); a135DrawScene(ctx, a, Math.min(t, tb - 0.001), S); ctx.save(); ctx.globalAlpha = p; a135DrawScene(ctx, a + 1, Math.max(t, tb), S); ctx.restore(); }
    else a135DrawScene(ctx, i, t, S);
    if (t >= 98.2 && t < 99.6) S.transition(ctx, 1000, 1230, (t - 98.2) / 1.4, { caption: 'THAT EVENING...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's nine quiet effects, only inside the seven real narration gaps or after the last word (master 0.6 at render)
    k.play('pop', 1.27, { gain: 0.3 });
    k.play('whoosh', 3.78, { gain: 0.25 });
    k.play('pop', 21.6, { gain: 0.3 });
    k.play('pop', 43.3, { gain: 0.3 });
    k.play('pop', 94.73, { gain: 0.3 });
    k.play('thud', 135.66, { gain: 0.35 });
    k.play('pop', 149.5, { gain: 0.35 });
    k.play('pop', 170.35, { gain: 0.35 });
    k.play('chime', 171.0, { note: 'C6', gain: 0.5 });
  },
};
window.SCENE = SCENE;
