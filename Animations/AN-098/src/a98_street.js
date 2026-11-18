// ===== AN-098 S17 the street outside Yahya's palace (167.0-175.9) and the lettering of every scene after the hut =====
// v2: the procession stops in two separate groups (1: rider + one laden horse, 2: two laden horses still at the door); the balcony stays in shot
const A98_SCAM = [[167.0, { x: 650, y: 690, zoom: 1.3 }], [167.3, { x: 650, y: 690, zoom: 1.3 }], [170.6, { x: 560, y: 560, zoom: 1.15 }], [175.9, { x: 560, y: 560, zoom: 1.15 }]];
const a98StreetCam = (t) => K.camAt(A98_SCAM, t);
const A98_SO = { w: 1000, palette: 'clear', palaceDoor: 1, palace: { x0: 600 }, stalls: [{ x: 150, kind: 'cloth', state: 'closed' }], props: [] };
const a98XF = (tt) => kfn(tt, [[167.0, 860], [171.2, 400]], 'out');                  // the rider's horse (front lane)
const a98XL1 = (tt) => kfn(tt, [[167.0, 1060], [171.2, 582]], 'out');                // group 1: the laden horse
const a98XG2 = [(tt) => kfn(tt, [[167.9, 1010], [171.1, 748]], 'out'), (tt) => kfn(tt, [[168.4, 1120], [171.0, 868]], 'out')];   // group 2 (back lane)
const A98_TAGS = [[491, 600, 169.06], [808, 640, 169.7]];                              // world anchors of the "1" and "2" tags, pop times
function a98RiderCloak(ctx, seat, s, sg, t) {   // the gift cloak over the rider's shoulders, flowing back over the horse (v2: kept on to the end)
  ctx.save(); ctx.translate(seat.x, seat.y); ctx.scale(sg * s, s); const fl = 4 * Math.sin(t * 5);
  shape(ctx, [[2, -70], [-20, -74], [-60, 4 + fl], [-30, 10 + fl], [-6, -30]], C.yellow, { lw: 4.5, seed: 632, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
  seg(ctx, 2, -70, -20, -74, 6, C.red, 2); ctx.restore(); }
function a98StreetWorld(ctx, t, cam) {
  const A = marketStreet(ctx, { ...A98_SO, t }), D = A.palace.door, B = A.palace.balcony, out = {};
  // Yahya on the balcony (clipped at the sill), bigger than v1; he waves back at 171.7
  const Y = a98Yah({ x: B.cx, y: B.sill + 92, s: 0.72, dir: -1, mouth: 'smile', lid: 0.2, gaze: [-1, 0.5] });
  if (t >= 170.48) { Y.drop = 4 * pulse(t, 170.7, 0.4); }
  if (t >= 171.7 && t < 173.6) { Y.handR = [64 + 10 * Math.sin(t * 10), -196]; Y.mouth = 'open'; Y.lid = 0; }
  ctx.save(); ctx.beginPath(); ctx.rect(B.cx - 70, 0, 140, B.sill); ctx.clip(); person(ctx, Y); ctx.restore();
  out.yh = a98Head(Y);
  // the procession out of the door: anything right of the door's far jamb is still inside the palace
  ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, D.x1 + 200, 1230); ctx.clip();
  const laden = (xf, y, s, pal, load, k) => { const H = { ...walk(xf, t, { stride: GAIT.horse * s }), y, s, dir: -1, pal, saddle: false, load, tailSwish: Math.sin(t * 2 + k), headDown: 0.12 + 0.1 * Math.sin(t * 2.3 + k) }; horse(ctx, H); };
  laden(a98XG2[1], 866, 0.48, 1, [{ kind: 'bolt', col: C.red }, 'chest'], 3); laden(a98XG2[0], 866, 0.48, 2, ['chest', { kind: 'bolt', col: C.blue }], 2);
  laden(a98XL1, 905, 0.66, 1, ['chest', { kind: 'bolt', col: C.red }], 1);
  const H = { ...walk(a98XF, t, { stride: GAIT.horse * 0.66 }), y: 905, s: 0.66, dir: -1, pal: 0 };
  if (t >= 171.2) { H.headDown = 0.25 * pulse(t, 171.3, 0.5); H.tailSwish = Math.sin(t * 2); }
  const R = { ...a98F(170, {}), s: 0.98, gaze: [-1, 0], lid: 0, mouth: 'smile', brow: -0.3, bob: 3 * Math.sin(H.ph * 2 - 0.4) * (t < 171.2 ? 1 : 0) };
  R.sq = landSquash(t, 171.2, 0.08);
  if (t >= 167.84 && t < 168.5) { R.gaze = [0.3, 1]; }
  if (t >= 168.5 && t < 169.3) { R.lid = 1; R.mouth = 'open'; R.bob += 3 * Math.abs(Math.sin(t * 14)); }
  let reins = true;
  if (t >= 171.5 && t < 173.9) { R.gaze = [0.8, -0.6]; R.tilt = -0.06; R.mouth = 'open'; reins = false; R.handL = [-60 + 10 * Math.sin(t * 11), -200]; if (t > 173.2) { R.handL = undefined; reins = true; R.mouth = 'smile'; } }
  if (t >= 173.9) { R.gaze = [0, 0.05]; R.tilt = 0; R.mouth = 'smirk'; if (t >= 174.0 && t < 174.9) R.wink = 'R'; }
  const seat = rideOn(ctx, 'horse', H, R, { reins });
  a98RiderCloak(ctx, seat, 0.98, -1, t);
  out.fh = [seat.x, seat.y - 160 * 0.98];
  ctx.restore();
  return out;
}
// the numbered tags over the two groups (panel space): "1" lands on 169.06, "2" on 169.7, both bounce on 170.48
function a98Tags(ctx, t, cam, S) { if (t < 169.06) return;
  for (const [i, [x, y, t0]] of A98_TAGS.entries()) { if (t < t0) continue; const p = a98P(x, y, cam), b = 1 + 0.25 * pulse(t, 170.48 + i * 0.08, 0.35);
    ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(b, b); S.label(ctx, String(i + 1), 0, 0, a98E(t, t0, 0.3), { size: 72, align: 'center', fill: i ? C.red : C.yellow }); ctx.restore(); } }

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
    if (a98In(t, 110.04, 114.5)) { const v = Math.round(200000 * a98E(t, 110.04, 1.25, 'out') / 1000) * 1000, lock = t >= 111.32 ? settleTo(t, 111.32, 1.2, 1, 0.3, 0.12) : 1;
      ctx.save(); ctx.globalAlpha *= a98Env(t, 110.04, 114.5, 0.25); ctx.translate(500, 190); ctx.scale(lock, lock); S.counter(ctx, v, 0, 0, K.clamp((t - 110.04) / 0.3), { size: 78 }); ctx.restore(); }
    lab('DIRHAMS', 500, 300, 111.32, 114.5, { size: 44, fill: C.yellow });   // v2: no repeated number; counter and label give way to the later gifts
    if (a98In(t, 112.4, 119.4)) { const d = P(145, 450); word('x10', Math.max(140, d[0] + 10), d[1], 112.4, 115.2, 76, { fill: C.yellow, rot: -0.06 }); }
    if (t >= 119.68 && t < 129.68) a98Banner(ctx, t, W, cam);
  }
  if (sc === 'viz') {
    lab('VIZIER YAHYA, BAGHDAD', 500, 170, 84.7, 87.6, { size: 46 });
    if (a98In(t, 88.04, 90.16)) a98ReadInsert(ctx, t);
    if (a98In(t, 89.32, 90.3)) bubble(ctx, 770, 250, 330, 130, 600, 330, K.clamp((t - 89.32) / 0.3), 'NOT MY HAND!', { size: 44 });
    if (W.yh && a98In(t, 99.28, 100.46)) { const h = P(...W.yh); ctx.save(); ctx.globalAlpha *= a98Env(t, 99.28, 100.46, 0.12); bubble(ctx, h[0] - 70, h[1] - 300, 440, 150, h[0] - 30, h[1] - 120, K.clamp((t - 99.28) / 0.2), 'IT IS MINE.', { size: 64 }); ctx.restore(); }   // v2: headline size, held to 100.46
    if (a98In(t, 139.46, 140.6)) { const p = Math.min(a98E(t, 139.46, 0.3, 'out'), 1 - a98E(t, 140.2, 0.3));
      a98Inset(ctx, 290, 360, 150, p, (c) => { c.fillStyle = '#e8b25a'; c.fillRect(-160, -160, 320, 320); c.fillStyle = dotPat(c, C.blue, 12, 0.22); c.fillRect(-160, -160, 320, 320); c.fillStyle = '#c98a3a'; c.fillRect(-160, 110, 320, 60);
        const F = a98F(0, { x: -40, y: 260, s: 1.15, sit: 1, seat: 'stool', brow: 0.4, gaze: [0.5, 0.6], drop: 4, handRW: [40 + 6 * Math.sin(t * 20), 150] }); person(c, F); a98Tongue(c, F); a98Table(c, 10, 130, 150); a98Quill(c, 42 + 6 * Math.sin(t * 20), 150, 0.5, 0.9);
        c.save(); c.translate(70, -95); c.rotate(-0.18); c.font = K.font(40, BF, 400); c.textAlign = 'center'; c.fillStyle = C.white; c.fillRect(-82, -26, 164, 50); c.strokeStyle = C.red; c.lineWidth = 5; c.strokeRect(-76, -21, 152, 40); c.fillStyle = C.red; c.fillText('FORGED!', 0, 14); c.restore(); }); }
    if (W.fh && a98In(t, 157.98, 159.0)) { const h = P(...W.fh); word('ME?', h[0] - 90, h[1] - 110, 157.98, 159.0, 80, { fill: C.yellow, rot: -0.1 }); }
    if (a98In(t, 165.26, 167.2)) { const k = settleTo(t, 165.26, 1.6, 1, 0.3, 0.15), q = P((A98_HPA + A98_CHB) / 2, 600); word('x2', q[0], q[1], 165.26, 167.2, 150 * k, { fill: C.red });   // v2: between the two sets, no leader lines
      for (const [x, a] of [[(A98_CHA + A98_HPA) / 2, 165.45], [(A98_CHB + A98_HPB) / 2, 165.6]]) { const b = P(x, 800); arr([q[0] + (x < 500 ? -60 : 60), q[1] + 80], [b[0], b[1] - 40], a, 167.2, { width: 12 }); } }
  }
}
// S12 banner: Yahya's name rises off the letter; the rift between the two medallions closes; a heart (panel space)
// v2: the picture sits in the clear blue wall to the upper left of the throne; medallions side by side, touching, never overlapping
function a98Banner(ctx, t, W, cam) {
  const fade = 1 - K.clamp((t - 129.2) / 0.45), r = 88, cx = 250, cy = 430, touch = 2 * (r + 9) + 4;
  ctx.save(); ctx.globalAlpha *= fade;
  if (t >= 121.34 && t < 122.0) { const hp = a98P(W.header ? W.header[0] : 722, W.header ? W.header[1] : 745, cam), u = a98E(t, 121.34, 0.66); a98Medal(ctx, K.lerp(hp[0], cx + 150, u), K.lerp(hp[1], cy, u), K.lerp(16, r, u), 'yah', { glow: 0.6, t, gaze: [-0.5, 0.2] }); }
  if (t >= 122.0) { const gap = K.lerp(300, touch, a98E(t, 125.0, 0.8));
    a98Feud(ctx, cx, cy, r, { gap, pA: (t - 122.54) / 0.35, pY: 1, open: a98E(t, 122.6, 0.3, 'out'), webs: a98E(t, 122.8, 0.5), close: a98E(t, 124.62, 0.6), webFall: a98E(t, 124.9, 0.6), gazeIn: a98E(t, 125.3, 0.4), heart: (t - 126.7) / 0.3, glowY: t < 122.5 ? 0.6 : 0, t }); }
  ctx.restore();
}
