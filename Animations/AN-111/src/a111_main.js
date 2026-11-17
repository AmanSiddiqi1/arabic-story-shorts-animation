// ===== AN-111 main: scene table, cameras, transitions (wipe, dissolve, NEXT DAY card), lettering (panel), sound =====
// camera keys [t, x, y, zoom] (eased), or a function of t; w = world width (the market is a 1600 strip)
const A111_G = (z, k = 420) => 900 - k / z;   // camera y that puts the ground (y 900) about k/615 below the panel centre
const A111_SC = [
  ['S1', 0, 6.9, a111S1, [[0, 500, 615, 1.0], [3.06, 500, 615, 1.0], [4.6, 545, A111_G(1.5), 1.5]], 'cut'],
  ['S2', 6.9, 10.9, a111S2, [[6.9, 668, A111_G(1.9), 1.9], [10.9, 650, A111_G(1.95), 1.95]], 'wipe'],
  ['S3', 10.9, 17.9, a111S3, (t) => [A111_S3X(t) + 120, A111_G(1.55), 1.55], 'wipe', 1600],
  ['S4', 17.9, 20.6, a111S4, [[17.9, 525, A111_G(1.7), 1.7], [20.6, 530, A111_G(1.75), 1.75]], 'cut'],
  ['S5', 20.6, 24.0, a111S5, [[20.6, 560, A111_G(1.2), 1.2], [24.0, 470, A111_G(1.25), 1.25]], 'wipe'],
  ['S6', 24.0, 37.0, a111S6, [[24.0, 400, A111_G(1.6), 1.6], [26.3, 400, A111_G(1.6), 1.6], [27.3, 545, A111_G(1.95), 1.95], [32.0, 545, A111_G(1.95), 1.95], [33.0, 552, A111_G(2.2, 380), 2.2], [37.0, 556, A111_G(2.2, 380), 2.2]], 'wipe', 1600],
  ['S7', 37.0, 41.8, a111S7, [[37.0, 420, A111_G(1.4), 1.4], [40.2, 600, A111_G(1.45), 1.45], [41.8, 640, A111_G(1.5), 1.5]], 'cut'],
  ['S8', 41.8, 49.9, a111S8, [[41.8, 470, A111_G(1.6), 1.6], [49.9, 450, A111_G(1.6), 1.6]], 'cut'],
  ['S9', 49.9, 58.9, a111S9, [[49.9, 680, A111_G(1.7), 1.7], [51.4, 680, A111_G(1.7), 1.7], [53.0, 660, A111_G(1.7), 1.7], [53.6, 660, A111_G(1.7), 1.7], [54.3, 340, A111_G(1.7), 1.7], [54.4, 340, A111_G(1.7), 1.7], [54.9, 320, 560, 2.1], [57.85, 320, 560, 2.1], [58.3, 400, A111_G(1.7), 1.7]], 'wipe'],
  ['S10', 58.9, 64.7, a111S10, [[58.9, 600, A111_G(1.6), 1.6], [59.9, 640, A111_G(1.6), 1.6]], 'cut', 1600],
  ['S11', 64.7, 75.3, a111S11, [[64.7, 640, A111_G(1.9), 1.9], [66.05, 640, A111_G(1.9), 1.9], [66.55, 1110, A111_G(1.9), 1.9], [73.2, 1110, A111_G(1.9), 1.9], [74.8, 1070, A111_G(1.9), 1.9]], 'cut', 1600],
  ['S12', 75.3, 84.6, a111S12, [[75.3, 1000, A111_G(1.75), 1.75], [83.5, 1000, A111_G(1.75), 1.75], [84.6, 950, A111_G(1.75), 1.75]], 'wipe', 1600],
  ['S13', 84.6, 87.1, a111S13, [[84.6, 520, A111_G(1.4), 1.4], [87.1, 560, A111_G(1.45), 1.45]], 'cut'],
  ['S14', 87.1, 96.9, a111S14, [[87.1, 520, A111_G(1.9), 1.9], [92.6, 520, A111_G(1.9), 1.9], [93.4, 520, 800, 2.6], [95.8, 520, 800, 2.6], [96.4, 520, A111_G(2.1), 2.1]], 'cut'],
  ['S15', 96.9, 103.0, a111S15, [[96.9, 500, 615, 1.0]], 'card'],
  ['S16', 103.0, 109.96, a111S16, [[103.0, 470, A111_G(1.35), 1.35], [104.0, 470, A111_G(1.35), 1.35], [107.0, 530, A111_G(1.75), 1.75]], 'cut'],
  ['S17', 109.96, 120.5, a111S17, [[109.96, 525, A111_G(1.95), 1.95], [119.6, 525, A111_G(1.95), 1.95], [120.5, 480, A111_G(1.7), 1.7]], 'wipe'],
  ['S18', 120.5, 127.8, a111S18, [[120.5, 470, A111_G(1.35), 1.35], [123.9, 500, A111_G(1.4), 1.4], [124.6, 520, A111_G(1.8), 1.8]], 'wipe'],
  ['S19', 127.8, 133.8, a111S19, (t) => [K.clamp(A111_HX(t) + 120, 330, 560), A111_G(1.45), 1.45], 'cut'],
  ['S20', 133.8, 139.8, a111S20, [[133.8, 540, A111_G(1.8), 1.8]], 'cut'],
  ['S21', 139.8, 144.0, a111S21, [[139.8, 530, 640, 2.3]], 'cut'],
  ['S22', 144.0, 150.9, a111S22, [[144.0, 535, A111_G(1.8), 1.8], [147.6, 535, A111_G(1.8), 1.8], [148.4, 545, A111_G(2.1, 380), 2.1]], 'cut'],
  ['S23', 150.9, 155.6, a111S23, [[150.9, 545, A111_G(2.1, 380), 2.1], [152.2, 620, A111_G(1.45), 1.45]], 'cut'],
  ['S24', 155.6, 160.0, a111S24, [[155.6, 555, A111_G(2.0, 380), 2.0]], 'cut'],
  ['S25', 160.0, 167.8, a111S25, [[160.0, 580, A111_G(1.55), 1.55], [165.2, 580, A111_G(1.55), 1.55], [166.4, 580, A111_G(1.55) - 80, 1.55]], 'cut'],
  ['S26', 167.8, 169.9, a111S26, [[167.8, 500, A111_G(1.8, 380), 1.8], [169.9, 500, A111_G(1.75, 380), 1.75]], 'dissolve'],
  ['S27', 169.9, 173.3, a111S27, [[169.9, 530, A111_G(1.5), 1.5], [173.3, 555, A111_G(1.5), 1.5]], 'cut'],
  ['S28', 173.3, A111_DUR + 1, a111S28, [[173.3, 640, A111_G(1.7), 1.7], [178.6, 620, A111_G(1.5), 1.5], [179.9, 520, A111_G(1.15), 1.15]], 'none'],
];
function a111Cam(sc, t) {
  const w = sc[6] || 1000; let c;
  if (typeof sc[4] === 'function') { const v = sc[4](t); c = { x: v[0], y: v[1], zoom: v[2] }; }
  else { const k = sc[4], i = k.findIndex((q) => t < q[0]); if (i === 0) c = { x: k[0][1], y: k[0][2], zoom: k[0][3] }; else if (i < 0) { const q = k[k.length - 1]; c = { x: q[1], y: q[2], zoom: q[3] }; }
    else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; } }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, w - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z };
}
const a111Pan = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const a111SceneAt = (t) => { let i = A111_SC.findIndex((s) => t < s[2]); if (i < 0) i = A111_SC.length - 1; return i; };
function a111DrawScene(ctx, i, t, S) { const sc = A111_SC[i], cam = a111Cam(sc, t); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc[3](ctx, t, cam); ctx.restore(); a111Over(ctx, sc[0], t, cam, S); }

// ---------- lettering, labels, counters (panel space, view 1000 x 1230) ----------
function a111Count(ctx, S, t, v, a, b, word) { if (!a111In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a111Fade(t, a, b, 0.25); S.counter(ctx, v, 170, 205, a111B(t, a, 0.3), { size: 84 }); S.label(ctx, word, 170, 300, a111B(t, a + 0.1, 0.3), { size: 36, align: 'center' }); ctx.restore(); }
function a111Over(ctx, id, t, cam, S) {
  const P = (x, y) => a111Pan(x, y, cam);
  const lab = (txt, wx, wy, a, b, o = {}) => { if (!a111In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a111Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, a111B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!a111In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a111Fade(t, a, b, 0.2); S.arrow(ctx, o.panel ? a0 : P(...a0), o.panel ? a1 : P(...a1), a111B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); };
  const word = (txt, wx, wy, a, b, size = 84, o = {}) => { if (!a111In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a111Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  if (id === 'S1') { lab('COTTON', 760, 1000, 5.82, 7.2); arr([790, 972], [842, 876], 5.9, 7.2); }
  if (id === 'S2') word('SPIN!', 560, 1010, 8.7, 10.1, 80, { rot: -0.08 });
  if (id === 'S3') { word('SOLD!', 330, 560, 12.4, 13.4, 80, { rot: -0.06 }); const v = t < 13.7 ? 3 : t < 13.9 ? 2 : t < 15.86 ? 1 : 0; a111Count(ctx, S, t, v, 12.3, 17.9, 'COINS');
    if (a111In(t, 15.86, 16.1) || a111In(t, 17.6, 17.75)) { ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(170, 178, 70, 0, 7); ctx.fill(); ctx.restore(); } }
  if (id === 'S4') { lab('ENOUGH FOR TODAY', 560, 160, 19.44, 20.7, { panel: true, size: 50 }); arr(P(360, 380), P(212, 600), 19.6, 20.7, { panel: true, bend: 0.2 }); }
  if (id === 'S6') { a111Count(ctx, S, t, 3, 25.7, 26.6, 'COINS'); const v = t < 33.84 ? 3 : t < 34.09 ? 2 : t < 34.34 ? 1 : 0; a111Count(ctx, S, t, v, 33.0, 36.0, 'COINS'); word('ALL OF IT!', 545, 575, 34.9, 36.4, 80, { rot: -0.05 }); }
  if (id === 'S9') { lab('WOODEN PLATTER', 250, 330, 54.54, 58.0, { size: 44 }); arr([262, 360], [270, 438], 54.6, 58.0, { bend: 0.1 }); lab('OLD JAR', 440, 405, 57.12, 58.0, { size: 44 }); arr([420, 425], [384, 448], 57.2, 58.0, { bend: -0.2 }); }
  if (id === 'S10') word('NO THANKS!', 640, 560, 62.95, 64.2, 80, { rot: 0.05 });
  if (id === 'S11') { lab('ONE FISH', 945, 625, 68.5, 70.8); arr([975, 650], [1030, 728], 68.6, 70.8, { bend: -0.15 }); word('PHEW!', 1255, 590, 72.4, 73.7, 84, { rot: 0.08, fill: '#9be05a' }); }
  if (id === 'S12') { if (a111In(t, 77.72, 79.0)) { ctx.save(); ctx.globalAlpha = a111Fade(t, 77.72, 79.0, 0.2); const k = 1 + 0.1 * pulse(t, 78.3, 0.3); S.arrow(ctx, P(950, 645), P(1066, 655), a111B(t, 77.72, 0.35) * k, { width: 18, bend: 0.25 }); S.arrow(ctx, P(1066, 700), P(950, 700), a111B(t, 77.9, 0.35), { width: 18, bend: 0.25 }); ctx.restore(); }
    word('SWAP!', 1010, 560, 79.0, 80.4, 84, { rot: -0.06 }); }
  if (id === 'S14') word('A PEARL!', 520, 640, 96.3, 97.4, 84, { rot: -0.05 });
  if (id === 'S15') { lab('NEVER DRILLED', 660, 940, 100.9, 102.6, { panel: true, size: 50 }); arr([760, 905], [720, 470], 101.0, 102.6, { panel: true, bend: -0.25 }); }
  if (id === 'S18') { const v = Math.round(70000 * a111B(t, 124.28, 1.3, 'out') / 1000) * 1000, pop = 1 + 0.15 * pulse(t, 125.64, 0.3);
    if (a111In(t, 124.28, 127.8)) { ctx.save(); ctx.globalAlpha = a111Fade(t, 124.28, 127.8, 0.25); ctx.translate(290, 205); ctx.scale(pop, pop); S.counter(ctx, v, 0, 0, a111B(t, 124.28, 0.3), { size: 84 }); ctx.restore(); ctx.save(); ctx.globalAlpha = a111Fade(t, 124.28, 127.8, 0.25); S.label(ctx, 'DIRHAMS', 290, 312, a111B(t, 124.4, 0.3), { size: 36, align: 'center' }); ctx.restore(); }
    word('70,000!', 560, 565, 125.7, 127.2, 88, { rot: -0.06 }); }
  if (id === 'S22') { lab('HALF', 494, 985, 145.66, 147.4, { size: 40 }); lab('HALF', 572, 985, 145.8, 147.4, { size: 40 }); word('HALF FOR YOU!', 560, 575, 148.2, 149.8, 72, { rot: -0.04 }); }
  if (id === 'S25') word('YOU PASSED!', 430, 450, 166.5, 167.8, 80, { rot: -0.05 });
  if (id === 'S28' && t >= 178.0) S.title(ctx, 'THE END', 500, 190, a111B(t, 178.0, 0.8), { size: 84, align: 'center' });
}

const SCENE = {
  duration: A111_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, bump = a111In(t, 125.79, 125.86) ? 7 : 0;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py + bump); ctx.scale(pw / 1000, ph / 1230);
    const i = a111SceneAt(t), sc = A111_SC[i], prev = A111_SC[i - 1], next = A111_SC[i + 1];
    // transitions: a slanted comic wipe (0.4 s) or a dissolve (0.5 s) across the boundary
    const wipeIn = prev && prev[5] === 'wipe' && t < sc[1] + 0.2, wipeOut = next && sc[5] === 'wipe' && t > sc[2] - 0.2;
    const dissIn = prev && prev[5] === 'dissolve' && t < sc[1] + 0.25, dissOut = next && sc[5] === 'dissolve' && t > sc[2] - 0.25;
    if (wipeIn || wipeOut) { const a = wipeIn ? i - 1 : i, b = a + 1, tb = A111_SC[a][2], p = K.ease.inOut(K.clamp((t - tb + 0.2) / 0.4)), X = K.lerp(-260, 1260, p);
      a111DrawScene(ctx, a, t, S); ctx.save(); ctx.beginPath(); ctx.moveTo(-400, -10); ctx.lineTo(X + 160, -10); ctx.lineTo(X - 160, 1240); ctx.lineTo(-400, 1240); ctx.closePath(); ctx.clip(); a111DrawScene(ctx, b, t, S); ctx.restore();
      ctx.save(); ctx.lineWidth = 18; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(X + 160, -10); ctx.lineTo(X - 160, 1240); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore(); }
    else if (dissIn || dissOut) { const a = dissIn ? i - 1 : i, tb = A111_SC[a][2], p = K.clamp((t - tb + 0.25) / 0.5); a111DrawScene(ctx, a, t, S); ctx.save(); ctx.globalAlpha = p; a111DrawScene(ctx, a + 1, t, S); ctx.restore(); }
    else a111DrawScene(ctx, i, t, S);
    if (t >= 102.3 && t < 103.7) S.transition(ctx, 1000, 1230, (t - 102.3) / 1.4, { caption: 'NEXT DAY...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's four quiet effects, only in the true narration pauses or after the last word (master 0.6 at render)
    k.play('pop', 6.87, { gain: 0.35 });
    k.play('whoosh', 20.55, { gain: 0.3 });
    k.play('pop', 133.42, { gain: 0.35 });
    k.play('chime', 178.2, { note: 'C6', gain: 0.55 });
  },
};
window.SCENE = SCENE;
