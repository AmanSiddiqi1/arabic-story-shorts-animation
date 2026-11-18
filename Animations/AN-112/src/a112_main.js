// ===== AN-112 main: scene dispatch, camera, lettering (panel space 1000 x 1230), transitions, sound =====
const A112_CAM = [[0, 500, 615, 1.0], [2.1, 500, 615, 1.0], [3.6, 420, 700, 1.5], [9.2, 420, 700, 1.5], [10.4, 430, 680, 1.2], [14.24, 430, 680, 1.2],
  [14.25, 480, 650, 1.25], [16.3, 480, 650, 1.25], [17.0, 450, 650, 1.35], [21.13, 450, 650, 1.35],
  [21.14, 500, 660, 1.4], [24.2, 500, 660, 1.4], [24.45, 495, 690, 1.8], [26.0, 495, 690, 1.8], [26.4, 500, 640, 1.4], [30.17, 500, 640, 1.4],
  [30.18, 440, 650, 1.35], [38.2, 520, 650, 1.35], [38.6, 560, 680, 1.7], [41.31, 560, 680, 1.7],
  [41.32, 500, 650, 1.35], [47.0, 500, 650, 1.35], [47.35, 450, 700, 1.2], [48.5, 450, 700, 1.2], [48.85, 640, 660, 1.35], [50.5, 640, 660, 1.35], [51.0, 620, 640, 1.6], [56.19, 620, 640, 1.6],
  [56.2, 760, 720, 1.4], [58.25, 760, 720, 1.4], [58.65, 330, 680, 1.4], [60.4, 330, 680, 1.4], [60.75, 720, 700, 1.9], [61.55, 720, 700, 1.9],
  [61.56, 480, 650, 1.35], [67.9, 420, 660, 1.6], [67.99, 420, 660, 1.6], [68.0, 470, 650, 1.35], [70.13, 470, 650, 1.35],
  [70.14, 640, 660, 1.9], [71.3, 640, 660, 1.9], [72.3, 500, 650, 1.4], [78.77, 500, 650, 1.4],
  [78.78, 640, 800, 1.6], [82.31, 660, 820, 2.1],
  [96.96, 500, 640, 1.05], [97.6, 500, 640, 1.05], [99.8, 520, 690, 1.4], [112.59, 520, 690, 1.4], [112.6, 470, 690, 1.4], [116.07, 470, 690, 1.4],
  [116.08, 470, 800, 1.35], [125.9, 470, 790, 1.35], [127.87, 470, 780, 1.45],
  [127.88, 470, 650, 1.35], [134.3, 470, 650, 1.35], [134.7, 460, 690, 1.6], [136.5, 480, 650, 1.35], [139.25, 480, 650, 1.35],
  [140.2, 450, 690, 1.7], [142.4, 450, 690, 1.7], [143.0, 520, 650, 1.35], [144.3, 520, 650, 1.35], [145.0, 440, 730, 1.6], [146.4, 440, 730, 1.6], [147.0, 500, 690, 1.45], [150.75, 500, 690, 1.45],
  [150.76, 500, 330, 1.6], [153.0, 500, 640, 1.05], [156.5, 500, 640, 1.05], [157.2, 510, 700, 1.4], [160.0, 490, 690, 1.4], [160.3, 470, 700, 1.9], [161.6, 470, 700, 1.9], [162.2, 450, 650, 1.3], [165.85, 450, 650, 1.3],
  [165.86, 500, 720, 1.5], [168.6, 500, 720, 1.5], [169.8, 500, 615, 1.0], [A112_DUR + 1, 500, 615, 1.0]];
function a112KeyCam(t) { const k = A112_CAM, i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  return c; }
function a112Cam(t) {
  let c, W = 1000;
  if (t >= 82.32 && t < 96.96) {   // the dawn street: track the mule (road ahead), hold on the fork, then follow the group
    W = A112_DW; const mx = a112MuleX(t);
    const zoom = a112Tr(t, [[0, 1.15], [89.74, 1.25, 0.6], [94.64, 1.2, 0.6]]), x = a112Tr(t, [[0, mx + 120], [89.74, 640, 0.6], [94.64, (tt) => a112MuleX(tt) + 260, 0.6]]);
    c = { x: t < 89.74 ? mx + 120 : x, y: a112Tr(t, [[0, 690], [89.74, 690]]), zoom };
  } else c = a112KeyCam(t);
  if (a112In(t, 70.2, 71.3)) { c.x += tremble(t, 3, 13); c.y += tremble(t + 0.3, 2, 11); }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, W - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z };
}
const a112P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
function a112Scene(t) { return t < 14.25 ? 'street' : t < 82.32 ? 'home' : t < 96.96 ? 'dawn' : t < 127.88 ? 'court' : t < 150.76 ? 'home' : t < 165.86 ? 'court' : 'judge'; }
function a112World(ctx, t, cam) {
  const sc = a112Scene(t);
  if (sc === 'street') a112Street(ctx, t, cam);
  else if (sc === 'home') a112Home(ctx, t, cam);
  else if (sc === 'dawn') a112Dawn(ctx, t, cam);
  else if (sc === 'court') { a112Court(ctx, t, cam); a112CourtClouds(ctx, t); a112CourtBoxes(ctx, t); }
  else a112JudgeCourt(ctx, t, cam);
}
// S12 story boxes (above the kneeling scholar), S18 Medina cloud
function a112CourtBoxes(ctx, t) {
  if (!a112In(t, 100.58, 103.1)) return; ctx.save(); ctx.globalAlpha = a112Fade(t, 100.4, 103.1, 0.25);
  a112StoryBox(ctx, 270, 520, 150, 130, A112B(t, 100.58, 0.3, 'lin') * 1.4, (c) => { a112Purse(c, 0, -30, { s: 0.6, bow: 1 }); });
  a112StoryBox(ctx, 440, 520, 150, 130, A112B(t, 101.06, 0.3, 'lin') * 1.4, (c) => { a112Purse(c, -30, -36, { s: 0.6, fill: 0 }); a112Scroll(c, 34, -50, { L: 90, w: 50, s: 0.8, stamp: 1, lines: false }); });
  a112StoryBox(ctx, 610, 520, 150, 130, A112B(t, 101.42, 0.3, 'lin') * 1.4, (c) => { c.save(); c.scale(1.6, 1.6); shape(c, [[-26, 12], [-20, -4], [-8, -10], [20, -10], [30, -4], [26, 6], [8, 8], [-4, 16], [-26, 12]], C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); seg(c, -46, 16, -24, 10, 16, GREEN, 3); c.restore(); });
  ctx.restore();
}
function a112CourtClouds(ctx, t) {
  if (!a112In(t, 162.2, 164.3)) return; const Ab = a112CourtAbu(t, true), h = a112Head(Ab);
  thoughtCloud(ctx, 270, 360, 420, 300, t, { p: A112B(t, 162.2, 0.5, 'lin') * (1 - A112B(t, 164.0, 0.25)), tail: [h[0] - 20, h[1] - 60], scale: 0.42, at: [500, 760], bg: '#ffd98a', seed: 17, inside: (c) => {
    c.fillStyle = '#ffb43a'; c.fillRect(-200, -200, 1400, 1700); sun(c, 760, 330, t); townFarCity(c, 500, 900, 1.4, '#a8741a');
    shape(c, [[-100, 900], [1100, 900], [1100, 1300], [-100, 1300]], SANDL, { lw: 6, seed: 30, dot: '#d9a441', pitch: 12, rad: 0.2, da: 0.4 }); shape(c, [[460, 900], [540, 900], [700, 1300], [300, 1300]], '#e0b060', { lw: 5, seed: 31 });
    palmTree(c, 200, 900, { h: 360, t, sway: 1 }); palmTree(c, 820, 900, { h: 320, lean: -0.1, t, sway: 1 }); } });
}

// ---------- lettering (panel space) ----------
function a112Overlays(ctx, t, cam, S) {
  const P = (x, y) => a112P(x, y, cam), sc = a112Scene(t);
  const lab = (txt, wx, wy, a, b, o = {}) => { if (!a112In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a112Fade(t, a, b, 0.2); if (o.shake) ctx.translate(tremble(t, 2, 12), 0); S.label(ctx, txt, x, y, A112B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!a112In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a112Fade(t, a, b, 0.2); S.arrow(ctx, o.panel ? a0 : P(...a0), o.panel ? a1 : P(...a1), A112B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); };
  const word = (txt, wx, wy, a, b, size = 76, o = {}) => { if (!a112In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a112Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  const count = (v, x, y, a, b, o = {}) => { if (!a112In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a112Fade(t, a, b, 0.2); S.counter(ctx, v, x, y, A112B(t, a, 0.3), { size: 80, ...o }); ctx.restore(); };
  // title
  if (t < 4.6) { ctx.save(); ctx.globalAlpha = a112Fade(t, -1, 4.6, 0.4); S.title(ctx, 'ABU HASSAN AND', 500, 958, A112B(t, 0.2, 0.7), { size: 56, align: 'center' }); S.title(ctx, 'THE KHORASAN MAN', 500, 1090, A112B(t, 0.45, 0.7), { size: 62, align: 'center' }); ctx.restore(); }
  if (sc === 'street') {
    lab('ABU HASSAN', 400, 470, 0.7, 2.4); arr([400, 500], [400, 600], 0.8, 2.4, { bend: 0 });
    lab('BAGHDAD', 270, 330, 3.88, 5.0, { fill: C.yellow });
    if (a112In(t, 7.28, 8.6)) { const fl = Math.floor((t - 7.28) / 0.22) % 2; lab('PURSE: 0', 560, 560, 7.28, 8.6, { color: fl ? C.red : C.black }); }
    lab('DEBTS!', 430, 560, 12.62, 14.1, { color: C.red, size: 58, shake: true });
  }
  if (sc === 'home') {
    word('KNOCK KNOCK!', 230, 520, 14.84, 15.9, 58, { rot: -0.08 }); lab('FROM KHORASAN', 300, 455, 17.02, 18.6); arr([300, 480], [300, 560], 17.1, 18.6, { bend: 0 });
    if (a112In(t, 25.02, 26.5)) { const v = Math.round(10000 * A112B(t, 25.02, 0.8, 'out') / 100) * 100; count(v, 500, 470, 25.02, 26.5); lab('DIRHAMS', 500, 540, 25.4, 26.5, { size: 38 }); }
    word('GONE!', 680, 250, 28.6, 29.5, 64, { rot: 0.08, fill: C.red });
    // the two terms of the deposit: arrows start at the purse
    arr([500, 640], [330, 560], 33.34, 37.3, { bend: 0.2 }); lab('IF I RETURN: MINE', 300, 470, 33.34, 37.3, { size: 42 });
    arr([540, 640], [700, 560], 37.76, 41.3, { bend: -0.2 }); lab('IF I DIE: YOURS', 720, 470, 37.76, 41.3, { size: 42 });
    if (a112In(t, 47.4, 55.6)) { const Q = a112PurseState(t), v = Math.round(Q.fill * 10000 / 500) * 500; ctx.save(); ctx.globalAlpha = a112Fade(t, 47.4, 55.6, 0.25); S.label(ctx, 'PURSE', 170, 140, 1, { size: 36 }); ctx.translate(v === 0 ? tremble(t, 3, 6) : 0, 0); S.counter(ctx, v, 170, 260, A112B(t, 47.4, 0.3), { size: 66, color: v === 0 ? C.red : C.black }); ctx.restore(); }
    word('PAID!', 260, 560, 48.0, 48.9, 64, { fill: C.red, rot: -0.1 });
    lab('PLENTY OF TIME', 735, 470, 53.28, 55.6, { size: 34 });
    word('KNOCK KNOCK!', 230, 520, 58.4, 59.4, 58, { rot: -0.08 });
    if (a112In(t, 60.84, 62.1)) { const h = P(...a112Head(a112Abu(t, true))); word('ALREADY?!', h[0] - 40, Math.max(90, h[1] - 250 * cam.zoom / 1.6), 60.84, 62.1, 70, { rot: 0.06, fill: C.white, panel: true }); }
    lab('MY MONEY', 446, 560, 69.12, 70.14, { size: 44 }); arr([446, 590], [446, 735], 69.12, 70.14, { bend: 0 }); lab('TODAY', 640, 560, 69.38, 70.3, { size: 42 });
    word('TOMORROW!', 560, 520, 74.7, 75.7, 64, { fill: C.yellow }); lab('A FRIEND HAS IT', 690, 505, 77.38, 78.75, { size: 40 });
    if (a112In(t, 81.3, 82.32)) { const [x, y] = P(820, 640); ctx.save(); ctx.globalAlpha = a112Fade(t, 81.3, 82.32, 0.15); sfx(ctx, 'Z Z Z', x, y, 60, 1, { fill: C.white, rot: -0.1 }); seg(ctx, x - 90, y + 20, K.lerp(x - 90, x + 90, A112B(t, 81.4, 0.25)), y - 20, 12, C.red, 3); ctx.restore(); lab('NO SLEEP', 820, 560, 81.4, 82.32, { size: 40 }); }
    word('KNOCK KNOCK!', 230, 520, 129.76, 130.7, 58, { rot: -0.08 });
    count(10000, 470, 500, 135.38, 136.05, { size: 66 }); lab('ALL OF IT', 470, 500, 136.0, 137.4, { size: 44 });
    arr([300, 360], [330, 440], 143.0, 144.3, { bend: 0 }); arr([700, 790], [760, 880], 143.3, 144.3, { bend: 0 }); arr([380, 640], [425, 760], 143.6, 144.3, { bend: 0 });
    lab('IF ONLY I HAD KNOWN', 470, 500, 145.92, 147.3, { size: 40 });
    if (a112In(t, 148.52, 149.9)) { const hk = a112HandW(a112Khor(Math.min(t, 148.9)), 'R'); word('KEEP IT!', hk[0] - 10, hk[1] - 190, 148.52, 149.9, 64, { rot: -0.06, fill: C.red }); }
  }
  if (sc === 'dawn') {
    const M = a112Mule(t), seat = mountSeat('donkey', M);
    if (a112In(t, 88.72, 89.74)) { ctx.save(); ctx.globalAlpha = a112Fade(t, 88.72, 89.74, 0.15); const [x1, y1] = P(seat.x + 20, seat.y - 290), [x2, y2] = P(M.x + 230, M.y - 330); a112Q(ctx, x1, y1, K.clamp((t - 88.72) / 0.25), 90, -0.1); a112Q(ctx, x2, y2, K.clamp((t - 88.92) / 0.25), 80, 0.1); ctx.restore(); }
    word('UH OH!', seat.x + 20, seat.y - 320, 92.05, 92.95, 58, { fill: C.white, rot: -0.06 });
    if (a112In(t, 93.08, 94.6)) { const G2 = a112Guard2(t), h = a112HandW(G2, 'L'); lab('ORDER OF', 400, 395, 93.08, 94.6, { size: 38 }); lab('CALIPH AL-MAAMUN', 400, 445, 93.15, 94.6, { size: 38 }); arr([380, 475], [h[0] + 40, h[1] - 90], 93.2, 94.6, { bend: 0.2 }); }
  }
  if (sc === 'court') {
    lab('CALIPH AL-MAAMUN', 720, 470, 97.98, 99.3, { size: 42 }); arr([720, 495], [720, 560], 98.0, 99.3, { bend: 0 });
    word('PHEW!', 330, 560, 115.3, 116.08, 60, { fill: C.white, rot: -0.06 });
    if (a112In(t, 117.4, 127.88)) { const v = t < 121.3 ? 10000 : t < 124.96 ? 10000 + Math.round(10000 * A112B(t, 121.3, 0.5) / 1000) * 1000 : 20000 + Math.round(30000 * A112B(t, 124.96, 0.6, 'out') / 1000) * 1000;
      const pop = 1 + 0.15 * a112Pulse(t, 125.6, 0.3); ctx.save(); ctx.globalAlpha = a112Fade(t, 117.4, 127.88, 0.2); ctx.translate(500, 230); ctx.scale(pop, pop); S.counter(ctx, v, 0, 0, A112B(t, 117.4, 0.3), { size: 70 }); ctx.restore();
      if (a112In(t, 125.0, 126.0)) S.emphasis(ctx, 215, 330, 130, A112B(t, 125.0, 0.5), { word: 'WOW!' }); }
    lab('TO REPAY THE TRUST', 330, 1030, 118.4, 119.9, { size: 38 });
    lab('FOR YOUR NEEDS', 500, 1030, 122.4, 123.9, { size: 38 });
    lab('FOR A FRESH START', 620, 1080, 125.9, 127.7, { size: 38 });
    if (a112In(t, 108.3, 109.4)) { const n = t < 108.6 ? 1 : t < 108.9 ? 2 : 3; ctx.save(); ctx.globalAlpha = a112Fade(t, 108.3, 109.4, 0.15); S.label(ctx, 'NIGHT ' + n, 500, 150, 1, { size: 46, fill: C.yellow }); ctx.restore(); }
    if (t >= 150.76) {
      if (a112In(t, 151.56, 152.9)) { ctx.save(); ctx.globalAlpha = a112Fade(t, 151.56, 152.9, 0.2); S.title(ctx, 'THE APPOINTED DAY', 500, 1080, A112B(t, 151.56, 0.6), { size: 56, align: 'center' }); ctx.restore(); }
      if (a112In(t, 160.4, 161.4)) { const [x, y] = P(470, 560); ctx.save(); ctx.globalAlpha = a112Fade(t, 160.4, 161.4, 0.15); S.emphasis(ctx, x, y, 170, A112B(t, 160.4, 0.4), { word: 'JUDGE!', wx: 0.9, wy: 0.7 }); ctx.restore(); }
      lab('MEDINA', 270, 520, 163.0, 164.2, { size: 42 }); arr([440, 620], [330, 420], 163.05, 164.2, { bend: -0.2 });
      lab('SALARY, EVERY MONTH', 500, 480, 165.1, 165.86, { size: 40 });
    }
  }
  if (sc === 'judge') {
    lab('YEARS PASS', 760, 600, 168.0, 169.0, { size: 44 });
    // the story passes along the row: a balloon hops from mouth to mouth with a picture
    const hops = [[168.66, 160, 'purse'], [169.8, 330, 'crown'], [170.54, 580, 'turban']];
    if (a112In(t, 168.66, 171.7)) { let i = 0; while (i + 1 < hops.length && t >= hops[i + 1][0]) i++; const [a, x, ic] = hops[i], prev = i ? hops[i - 1][1] : x, u = A112B(t, a, 0.35);
      const bx = K.lerp(prev, x, u), by = 940 - 80 * Math.sin(Math.PI * u) * (i ? 1 : 0); const [px, py] = P(bx, by);
      ctx.save(); ctx.globalAlpha = a112Fade(t, 168.66, 171.7, 0.2); bubble(ctx, px, py, 150 * cam.zoom, 110 * cam.zoom, px - 20, py + 80 * cam.zoom, A112B(t, 168.66, 0.3, 'lin'), '');
      ctx.translate(px, py); ctx.scale(cam.zoom, cam.zoom); if (ic === 'purse') a112Purse(ctx, 0, -30, { s: 0.5 }); else if (ic === 'crown') { const b = 16; shape(ctx, [[-30, b], [-26, b - 30], [-12, b - 14], [0, b - 40], [12, b - 14], [26, b - 30], [30, b], [-30, b]], C.yellow, { lw: 4.5, seed: 19, dot: C.red, pitch: 6, rad: 0.2, da: 0.5 }); } else { ctx.scale(0.6, 0.6); a112HatShape(ctx, 'judge', { k: 1 }); }
      ctx.restore(); }
  }
  // transitions: wipes between places, NEXT MORNING card, the dissolve into the years
  for (const [tc, hw] of [[14.25, 0.29], [82.32, 0.35], [96.96, 0.35], [127.88, 0.35], [150.76, 0.35]]) if (a112In(t, tc - hw, tc + hw)) a112Wipe(ctx, 1000, 1230, (t - tc + hw) / (2 * hw));
  if (t >= 55.3 && t < 57.1) S.transition(ctx, 1000, 1230, (t - 55.3) / 1.8, { caption: 'NEXT MORNING...' });
  if (t >= 171.9) S.title(ctx, 'THE END', 500, 190, A112B(t, 171.9, 0.8), { size: 84, align: 'center' });
}

const SCENE = {
  duration: A112_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
    const cam = a112Cam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); a112World(ctx, t, cam); ctx.restore();
    // the dissolve from the court into the judge's court (165.86)
    if (a112In(t, 165.86, 166.36)) { const c2 = a112KeyCam(165.85); ctx.save(); ctx.globalAlpha = 1 - A112B(t, 165.86, 0.5); K.camera(ctx, 1000, 1230, c2); a112Court(ctx, 165.85, c2); ctx.restore(); }
    if (a112In(t, 104.72, 113.1)) a112DreamFrame(ctx, t, cam);
    a112Overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // twelve short, quiet effects on word boundaries and in the four real pauses (master 0.6 at render)
    k.play('pop', 4.83, { gain: 0.3 });           // pause: the empty purse
    k.play('click', 14.84, { gain: 0.35 });       // knock
    k.play('thud', 24.36, { gain: 0.3 });         // the purse lands
    k.play('click', 58.4, { gain: 0.35 });        // knock, next morning
    k.play('pop', 69.0, { gain: 0.25 });          // pause: the open palm
    k.play('pop', 89.57, { gain: 0.3 });          // pause: the two question marks
    k.play('chime', 107.64, { note: 'E6', gain: 0.3 });   // the dream voice
    k.play('thud', 116.70, { gain: 0.28 }); k.play('thud', 120.42, { gain: 0.28 }); k.play('thud', 123.74, { gain: 0.32 });   // three gifts
    k.play('thud', 152.78, { gain: 0.3 });        // pause: spear butts
    k.play('chime', 171.9, { note: 'C6', gain: 0.5 });     // THE END
  },
};
window.SCENE = SCENE;
