// ===== AN-098 S17 the street outside Yahya's palace (167.0-175.9) and the lettering of every scene after the hut =====
const A98_SCAM = [[167.0, { x: 720, y: 700, zoom: 1.4 }], [167.2, { x: 720, y: 700, zoom: 1.4 }], [170.4, { x: 500, y: 615, zoom: 1.0 }], [175.9, { x: 500, y: 615, zoom: 1.0 }]];
const a98StreetCam = (t) => K.camAt(A98_SCAM, t);
const A98_SO = { w: 1000, palette: 'clear', palaceDoor: 1, stalls: [{ x: 150, kind: 'cloth', state: 'closed' }], props: [['crate', 330, {}], ['pots', 420, {}]] };
const a98XF = (tt) => kfn(tt, [[167.0, 860], [170.4, 400], [175.9, 150]], 'lin');
function a98StreetWorld(ctx, t, cam) {
  const A = marketStreet(ctx, { ...A98_SO, t }), D = A.palace.door, B = A.palace.balcony, out = {};
  // Yahya on the balcony (clipped at the sill)
  const Y = a98Yah({ x: B.cx, y: B.sill + 70, s: 0.55, dir: -1, mouth: 'smile', lid: 0.2, gaze: [-1, 0.5] });
  if (t >= 170.48) { Y.handR = [64 + 8 * Math.sin(t * 10) * (t < 172 ? 1 : 0), -196]; Y.drop = 4 * pulse(t, 170.7, 0.4); }
  ctx.save(); ctx.beginPath(); ctx.rect(B.cx - 120, 0, 240, B.sill); ctx.clip(); person(ctx, Y); ctx.restore();
  out.yh = a98Head(Y);
  // the procession out of the door (clipped: hidden inside the palace wall)
  ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, D.x0 + 200, 1230); ctx.rect(D.x0, D.top, D.x1 - D.x0, 1230 - D.top); ctx.clip();
  const lane = (y, s, list) => { for (let i = list.length - 1; i >= 0; i--) { const [xf, pal, load, flag] = list[i], x = xf(t);
    const H = { ...walk(xf, t, { stride: GAIT.horse * s }), y, s, dir: -1, pal, saddle: false, load, tailSwish: Math.sin(t * 2 + i), headDown: 0.12 + 0.1 * Math.sin(t * 2.3 + i) };
    horse(ctx, H); if (flag) a98Flag(ctx, x + 40 * s, y - 235 * s - 40 * s, flag, (t - 169.06 - (flag - 1) * 0.15) / 0.3, Math.sin(t * 6)); } };
  lane(864, 0.56, [[(tt) => a98XF(tt - 1.0) + 40, 1, ['chest', 'sack'], 2]]);
  lane(905, 0.7, [[(tt) => a98XF(tt) + 250, 1, ['chest', { kind: 'bolt', col: C.red }], 1], [(tt) => a98XF(tt) + 470, 2, ['sack', 'sack'], 0]]);
  const H = { ...walk(a98XF, t, { stride: GAIT.horse * 0.7 }), y: 905, s: 0.7, dir: -1, pal: 0 };
  const R = { ...a98F(170, {}), s: 0.98, gaze: [-1, 0], lid: 0, mouth: 'smile', brow: -0.3, bob: 3 * Math.sin(H.ph * 2 - 0.4) };
  if (t >= 167.84 && t < 168.5) { R.gaze = [0.3, 1]; }
  if (t >= 168.5 && t < 169.3) { R.lid = 1; R.mouth = 'open'; R.bob += 3 * Math.abs(Math.sin(t * 14)); }
  if (t >= 170.48 && t < 171.5) { R.gaze = lookAt([H.x, 650], out.yh); R.handL = [-64 + 8 * Math.sin(t * 12), -196]; R.mouth = 'open'; R.tilt = 0.06; }
  if (t >= 174.0 && t < 174.45) { R.wink = 'R'; R.gaze = [0, 0.05]; }
  if (t >= 172.6 && t < 174.0) R.gaze = [-1, 0.1];
  const seat = rideOn(ctx, 'horse', H, R, { reins: !(t >= 170.48 && t < 171.5) });
  out.fh = [seat.x, seat.y - 160 * 0.98];
  ctx.restore();
  return out;
}

// ---------- the reading insert (S10): the forged lines against Yahya's own hand ----------
function a98ReadInsert(ctx, t) {
  const Y = a98Yah({ x: 500, y: 800, s: 2.3, dir: -1, brow: -0.6, mouth: 'closed', lid: 0, noBlink: true });
  const g = gazePlan(t, [[0, [500, 560]], [88.3, [500, 700]], [88.7, [500, 560]], [89.0, [500, 700]], [89.3, [500, 575]]], 0.07); Y.gaze = lookAt([500, 330], g);
  ctx.save(); ctx.globalAlpha *= a98Env(t, 88.04, 90.16, 0.15);
  a98InsertPaper(ctx); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 378); ctx.clip(); person(ctx, Y); ctx.restore();
  shape(ctx, K.rectPts(350, 390, 300, 420), A98_PAPER, { lw: 7, seed: 610 }); for (const yy of [390, 810]) shape(ctx, K.rectPts(336, yy - 16, 328, 32), '#efdcae', { lw: 6, seed: 611 });
  a98Medal(ctx, 410, 450, 34, 'abd', { gaze: [1, 0.1] }); a98Medal(ctx, 590, 450, 34, 'yah', { gaze: [-1, 0.1] });
  for (let i = 0; i < 4; i++) a98WavyLine(ctx, 610, 390, 520 + i * 34, 1, { ph: i, jit: true, lw: 5 });
  shape(ctx, ell(470, 548, 9, 7, 10), C.black, { lw: 0, seed: 615 }); shape(ctx, ell(560, 588, 7, 6, 10), C.black, { lw: 0, seed: 616 });
  a98WavyLine(ctx, 610, 390, 712, a98E(t, 88.2, 0.5), { amp: 5, col: NAVY, lw: 5 });
  if (t >= 89.32) { const k = a98E(t, 89.32, 0.25); seg(ctx, 380, 505, K.lerp(380, 620, k), K.lerp(505, 640, k), 14, C.red, 3); if (k > 0.5) { const k2 = K.clamp((k - 0.5) * 2); seg(ctx, 620, 505, K.lerp(620, 380, k2), K.lerp(505, 640, k2), 14, C.red, 3); } }
  ctx.restore();
}

// ---------- lettering for road, halls and street (panel units) ----------
function a98Over2(ctx, t, cam, S, W, L) {
  const { lab, arr, word, P } = L, sc = a98Scene(t);
  if (sc === 'road') {
    if (a98In(t, 69.62, 72.4)) { lab('TO BAGHDAD', 560, 200, 69.62, 72.4, { size: 52 }); arr([470, 250], [250, 270], 69.7, 72.4, { bend: -0.1 }); }
    if (a98In(t, 131.4, 134.4)) { lab('BACK TO BAGHDAD', 560, 200, 131.4, 134.4, { size: 52 }); arr([440, 250], [220, 270], 131.5, 134.4, { bend: -0.1 }); }
    if (W.string && a98In(t, 130.0, 135.3)) { const p = P(...W.string); word('x10', p[0], p[1], 130.0, 135.3, 64, { fill: C.yellow, rot: 0.06 }); }
  }
  if (sc === 'gov') {
    if (a98In(t, 73.4, 77.0)) { // the hourglass: three days
      const k = (t - 73.64) / 0.85, n = Math.max(0, Math.min(3, Math.floor(k + 0.0001))), fr = k - Math.floor(k), lev = t < 73.64 ? 1 : n >= 3 ? 0 : 1 - fr, flip = n >= 1 && n < 3 ? Math.PI * a98E(fr, 0, 0.15) : 0;
      ctx.save(); ctx.globalAlpha *= a98Env(t, 73.4, 77.0, 0.25); a98Hourglass(ctx, 880, 210, n >= 3 ? 0 : lev, n >= 1 && n < 3 && fr < 0.15 ? Math.PI * (1 - fr / 0.15) : 0, 1.1);
      for (let i = 0; i < Math.min(3, Math.floor(k + 1)); i++) if (t >= 73.64 + i * 0.85 + 0.84) seg(ctx, 850 + i * 22, 300, 852 + i * 22, 344, 7, C.black, 0); ctx.restore(); }
    if (W.ah) { const h = P(...W.ah); word('HA HA!', h[0] + 150, h[1] - 60, 107.3, 108.7, 72, { fill: C.yellow, rot: -0.08 }); }
    if (a98In(t, 110.04, 119.4)) { const v = Math.round(200000 * a98E(t, 110.04, 1.25, 'out') / 1000) * 1000, lock = t >= 111.32 ? settleTo(t, 111.32, 1.2, 1, 0.3, 0.12) : 1;
      ctx.save(); ctx.globalAlpha *= a98Env(t, 110.04, 119.4, 0.25); ctx.translate(500, 190); ctx.scale(lock, lock); S.counter(ctx, v, 0, 0, K.clamp((t - 110.04) / 0.3), { size: 78 }); ctx.restore(); }
    lab('200,000 DIRHAMS', 500, 300, 111.32, 119.4, { size: 44, fill: C.yellow });
    if (a98In(t, 112.4, 119.4)) { const d = P(145, 450); word('x10', d[0] + 10, d[1], 112.4, 119.4, 76, { fill: C.yellow, rot: -0.06 }); }
    if (t >= 119.68 && t < 129.68) a98Banner(ctx, t, W, cam);
  }
  if (sc === 'viz') {
    lab('VIZIER YAHYA, BAGHDAD', 500, 170, 84.7, 87.6, { size: 46 });
    if (a98In(t, 88.04, 90.16)) a98ReadInsert(ctx, t);
    if (a98In(t, 89.32, 90.3)) bubble(ctx, 770, 250, 330, 130, 600, 330, K.clamp((t - 89.32) / 0.3), 'NOT MY HAND!', { size: 44 });
    if (W.yh && a98In(t, 99.28, 100.7)) { const h = P(...W.yh); lab('IT IS MINE.', h[0] - 40, h[1] - 220, 99.28, 100.7, { size: 50, balloon: true }); }
    if (a98In(t, 139.46, 140.6)) { const p = Math.min(a98E(t, 139.46, 0.3, 'out'), 1 - a98E(t, 140.2, 0.3));
      a98Inset(ctx, 290, 360, 150, p, (c) => { c.fillStyle = '#e8b25a'; c.fillRect(-160, -160, 320, 320); c.fillStyle = dotPat(c, C.blue, 12, 0.22); c.fillRect(-160, -160, 320, 320); c.fillStyle = '#c98a3a'; c.fillRect(-160, 110, 320, 60);
        const F = a98F(0, { x: -40, y: 260, s: 1.15, sit: 1, seat: 'stool', brow: 0.4, gaze: [0.5, 0.6], drop: 4, handRW: [40 + 6 * Math.sin(t * 20), 150] }); person(c, F); a98Tongue(c, F); a98Table(c, 10, 130, 150); a98Quill(c, 42 + 6 * Math.sin(t * 20), 150, 0.5, 0.9);
        c.save(); c.translate(70, -95); c.rotate(-0.18); c.font = K.font(40, BF, 400); c.textAlign = 'center'; c.fillStyle = C.white; c.fillRect(-82, -26, 164, 50); c.strokeStyle = C.red; c.lineWidth = 5; c.strokeRect(-76, -21, 152, 40); c.fillStyle = C.red; c.fillText('FORGED!', 0, 14); c.restore(); }); }
    if (W.fh && a98In(t, 157.98, 159.0)) { const h = P(...W.fh); word('ME?', h[0] - 90, h[1] - 110, 157.98, 159.0, 80, { fill: C.yellow, rot: -0.1 }); }
    if (a98In(t, 165.26, 167.2)) { const k = settleTo(t, 165.26, 1.6, 1, 0.3, 0.15); word('x2', 500, 210, 165.26, 167.2, 120 * k, { fill: C.red });
      if (t > 165.5) { const a = P(470, 800), b = P(720, 800); ctx.save(); ctx.globalAlpha *= a98Env(t, 165.5, 167.2, 0.2); for (const q of [a, b]) seg(ctx, 500, 250, K.lerp(500, q[0], a98E(t, 165.5, 0.3)), K.lerp(250, q[1] - 90, a98E(t, 165.5, 0.3)), 8, C.black, 0); ctx.restore(); } }
  }
}
// S12 banner: Yahya's name rises off the letter; the rift between the two medallions closes; a heart (panel space)
function a98Banner(ctx, t, W, cam) {
  const fade = 1 - K.clamp((t - 129.2) / 0.45), cx = 500, cy = 300, r = 100;
  ctx.save(); ctx.globalAlpha *= fade;
  if (t >= 121.34 && t < 122.0) { const hp = a98P(W.header ? W.header[0] : 722, W.header ? W.header[1] : 745, cam), u = a98E(t, 121.34, 0.66); a98Medal(ctx, K.lerp(hp[0], 670, u), K.lerp(hp[1], cy, u), K.lerp(16, r, u), 'yah', { glow: 0.6, t, gaze: [-0.5, 0.2] }); }
  if (t >= 122.0) { const gap = K.lerp(400, 2 * r + 18, a98E(t, 125.0, 0.8));
    a98Feud(ctx, cx, cy, r, { gap, pA: (t - 122.54) / 0.35, pY: 1, open: a98E(t, 122.6, 0.3, 'out'), webs: a98E(t, 122.8, 0.5), close: a98E(t, 124.62, 0.6), webFall: a98E(t, 124.9, 0.6), gazeIn: a98E(t, 125.3, 0.4), heart: (t - 126.7) / 0.3, glowY: t < 122.5 ? 0.6 : 0, t }); }
  ctx.restore();
}
