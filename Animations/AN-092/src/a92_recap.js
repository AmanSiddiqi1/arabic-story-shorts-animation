// ===== AN-092 S14 (155.28-166.6): the recap card. Not a complicated ruling but a simple look inside =====
const A92_RB = [500, 960];   // bag base on the card (drawn at s 2)
function a92Card(ctx) { ctx.drawImage(bake('a92card', 1000, 1230, (c) => { c.fillStyle = C.yellow; c.fillRect(0, 0, 1000, 1230); c.fillStyle = dotPat(c, C.blue, 16, 0.18); c.globalAlpha = 0.5; c.fillRect(0, 0, 1000, 1230); }), 0, 0, 1000, 1230); }
const A92_GL = [['tent', 150, 560], ['cow', 150, 450], ['camel', 150, 340]];
const A92_GR = [['house', 850, 560], ['school', 850, 450], ['baghdad', 850, 340], ['army', 850, 230], ['basra', 850, 120]];
function a92Ghost(ctx, t, list, x0, o) {
  if (t < 163.7) return; const rise = K.ease.out(K.clamp((t - 163.7) / 0.5)), cr = t >= 165.42 ? K.clamp((t - 165.42) / 0.9) : 0;
  list.forEach(([kind, x, y], i) => { const wide = kind === 'baghdad' || kind === 'basra' || kind === 'army';
    if (cr <= 0) { a92Tile(ctx, x, y + 400 * (1 - rise), kind, { size: 105, wide, ghost: true, ga: 0.9, t, p: 1, label: kind === 'baghdad' ? 'BAGHDAD' : kind === 'basra' ? 'BASRA' : null }); return; }
    const r = K.rng(800 + i + x0); for (let k = 0; k < 14; k++) { const a = r() * 6.28, d = cr * (60 + r() * 140); ctx.save(); ctx.globalAlpha = 0.8 * (1 - cr); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(x + (r() - 0.5) * 100 + Math.cos(a) * d + cr * 120 * (x < 500 ? -1 : 1), y + (r() - 0.5) * 100 + Math.sin(a) * d - cr * 60, 6 * (1 - cr) + 2, 0, 7); ctx.fill(); ctx.restore(); } });
}
function a92S14(ctx, t, cam) {
  a92Card(ctx);
  a92Ghost(ctx, t, A92_GL, 0); a92Ghost(ctx, t, A92_GR, 1);
  // the scroll and the balance scale (the complicated ruling), crossed out and whisked away
  if (t >= 159.58 && t < 161.8) { const up = t >= 161.1 ? K.ease.in(K.clamp((t - 161.1) / 0.6)) : 0, L = 300 * K.ease.out(K.clamp((t - 159.58) / 0.8)) * (1 - up), dy = -700 * up;
    ctx.save(); ctx.translate(0, dy);
    shape(ctx, K.rectPts(360, 130, 200, Math.max(8, L)), '#fff3d6', { lw: 5, seed: 540 }); for (let y = 160; y < 120 + L; y += 26) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); for (let x = 380; x < 540; x += 10) ctx.lineTo(x, y + 4 * Math.sin(x * 0.3 + y)); ctx.stroke(); ctx.restore(); }
    shape(ctx, ell(460, 126, 112, 16, 20), '#e8b25a', { lw: 5, seed: 541 }); shape(ctx, ell(460, 130 + L, 112, 14, 20), '#e8b25a', { lw: 5, seed: 542 });
    const tilt = 0.25 * Math.sin((t - 159.58) * 2.4); seg(ctx, 680, 420, 680, 200, 8, '#a8741a', 3); ctx.save(); ctx.translate(680, 210); ctx.rotate(tilt); seg(ctx, -80, 0, 80, 0, 6, '#a8741a', 3);
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 80, 0); ctx.rotate(-tilt); seg(ctx, 0, 0, -24, 60, 2, C.black, 0); seg(ctx, 0, 0, 24, 60, 2, C.black, 0); shape(ctx, [[-30, 60], [30, 60], [20, 74], [-20, 74]], '#e8b25a', { lw: 4, seed: 543 }); ctx.restore(); } ctx.restore();
    if (t >= 160.84) { a92X(ctx, 460, 260, 110, K.clamp((t - 160.84) / 0.1)); a92X(ctx, 680, 260, 90, K.clamp((t - 160.94) / 0.1)); }
    ctx.restore(); }
  // the busts: stranger left, Ali right, a hand each on the bag
  const pop = (t0) => settleTo(t, t0, 0, 1, 0.35, 0.12);
  let bx = A92_RB[0], bsx = 1; const tug = t >= 157.68 && t < 158.86;
  if (tug) { const k = Math.sin((t - 157.68) / 1.18 * Math.PI * 2); bx += 40 * k; bsx = 1 + 0.25 * Math.abs(k); }
  const fall = t < 155.6 ? fallY(t, 155.28, 155.6, 300, A92_RB[1]) : A92_RB[1];
  const held = t >= 156.72 && t < 158.86;
  const KB = { ...A92_KURD, x: 300, y: 1250, s: 2.2 * pop(156.72), dir: 1, brow: 0.7, mouth: 'frown' }, AB = { ...A92_ALI, x: 700, y: 1250, s: 2.2 * pop(156.87), dir: -1, brow: 0.7, mouth: 'frown' };
  for (const [P, sd] of [[KB, -1], [AB, 1]]) { P.gaze = lookAt(a92Eye(P), [bx, 880]); if (held) P.handRW = [bx + sd * 46 * bsx, A92_RB[1] - 60]; if (tug) P.tip = -0.06 * sd * Math.sin((t - 157.68) / 1.18 * Math.PI * 2) * (sd < 0 ? -1 : 1);
    if (t >= 163.7 && t < 165.42) { P.gaze = [sd * 0.6, -0.8]; P.brow = -0.4; P.mouth = 'o'; }
    if (t >= 165.42) { P.gaze = [sd * 0.9, 0.1]; P.lid = 0.5; P.drop = 8; P.mouth = 'closed'; P.brow = -0.5; }
    if (t >= 159.58 && t < 161.8) P.gaze = lookAt(a92Eye(P), [520, 250]);
    if (t >= 162.26 && t < 163.7) { P.gaze = lookAt(a92Eye(P), [500, 1060]); P.brow = -0.6; P.mouth = 'o'; }
    if (P.lid == null) a92Blink(P, t); }
  if (t >= 156.72 && KB.s > 0.05) { person(ctx, KB); }
  if (t >= 156.87 && AB.s > 0.05) { person(ctx, AB); }
  const sw = t >= 158.86 ? swing(t, 158.86, 0.12, 1.6, 2.5) : 0;
  const bs = K.lerp(3.5, 2.2, A92B(t, 156.6, 0.35));   // v2: the bag alone is 1.6x bigger, then settles to 2.2 as the busts pop in
  a92Bag(ctx, bx, fall, { s: bs, sx: bsx, sq: (t < 155.6 ? 1.08 : landSquash(t, 155.6, 0.2)) * (tug ? 1 / Math.sqrt(bsx) : 1), bulge: tug ? bsx - 1 : 0, rot: sw, open: t >= 162.26 ? settleTo(t, 162.26, 0, 1, 0.4, 0.15) : 0 });
  // the four foods pop out into a neat row
  // v2: the four foods pop out one after another into a clear arc above the bag, each 70+ units wide
  [['bread', 300, 590, 3.0], ['cheese', 420, 520, 5.0], ['olive', 580, 520, 3.6], ['lemon', 700, 590, 3.4]].forEach(([k, x, yT, sc], i) => { const t0 = 162.84 + i * 0.22; if (t < t0) return; const u = K.ease.out(K.clamp((t - t0) / 0.35)), px = K.lerp(500, x, u), y = K.lerp(830, yT, u) - 120 * Math.sin(Math.PI * u), k2 = 0.4 + 0.6 * u;
    shape(ctx, ell(px, y - 22 * k2, 66 * k2, 58 * k2, 26), C.white, { lw: 5, seed: 560 + i });   // a white disc behind each food, so the yellow lemon reads on the yellow card
    if (k === 'olive') for (let j = 0; j < 3; j++) a92Food(ctx, 'olive', px - 34 + j * 34, y + (j % 2) * 10, sc * k2, j); else a92Food(ctx, k, px, y, sc * k2); });
  if (t >= 166.28) { const u = K.clamp((t - 166.28) / 0.3); ctx.save(); ctx.globalAlpha = 0.8 * Math.sin(Math.PI * u); seg(ctx, 545 + 40 * u, 1040, 552 + 40 * u, 1057, 3, C.white, 0); ctx.restore(); }
  return { KB, AB };
}
function a92O14(ctx, t, P, S, r, L) {
  if (a92In(t, 162.26, 164.3)) { const b = P(500, 850); L.arr([b[0] - 20, 400], [b[0], b[1] - 110], 162.26, 164.3, { width: 18, bend: 0.1 }); L.lab('JUST LOOK INSIDE', 500, 340, 162.3, 164.3, { size: 52 }); }
  if (a92In(t, 164.44, 165.6)) L.stamp('FALSE!', ...P(150, 380), 164.44, 165.6, 64, { rot: -0.12 });
  if (a92In(t, 164.84, 165.6)) L.stamp('FALSE!', ...P(850, 330), 164.84, 165.6, 64, { rot: 0.1 });
}
