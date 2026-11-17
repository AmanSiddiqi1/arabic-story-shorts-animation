// ===== AN-099 Caliph al-Maamun and the Strange Scholar: constants, small helpers and the story's props =====
// World 1000 x 1230, floor y 900. Every drawing is a pure function of its arguments (and t).
const A99_DUR = 172.47;   // narration 169.475 + 3.0 s THE END hold (plan duration + end_hold)
const A99B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a99In = (t, a, b) => t >= a && t < b;
const a99Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const A99_GREEN = '#2f9a3e', A99_SILVER = '#e9eef8', A99_BRASS = '#e0a92a', A99_CLOTH = '#fff3d6';
// timed value track: keys [[t0, v, dur]] -> v eases from the previous value over dur (default 0.3) starting at t0. v: number or array.
function a99Tr(t, keys, d0 = 0.3) {
  const val = (v) => (typeof v === 'function' ? v(t) : v);
  let cur = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) {
    const [t0, v, d] = keys[i]; if (t < t0) break;
    const u = K.ease.inOut(K.clamp((t - t0) / (d ?? d0))), nv = val(v);
    cur = Array.isArray(cur) ? cur.map((c, j) => K.lerp(c, nv[j], u)) : K.lerp(cur, nv, u);
  }
  return cur;
}
// smooth 0..1 window: rises over r after a, falls over r before b
const a99Win = (t, a, b, r = 0.25) => K.ease.inOut(K.clamp(Math.min((t - a) / r, (b - t) / r)));

// ---------- props ----------
// floorCushion: the palaceHall dais cushion as a loose prop (w x h, base centre at x, y)
function a99Cushion(ctx, x, y, o = {}) {
  const w = (o.w ?? 100) / 2, h = o.h ?? 30, s = o.s ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, [[-w, 0], [-w + 4, -h], [w - 4, -h], [w, 0]], o.col || C.yellow, { lw: 5, seed: 222, dot: o.dot || C.red, pitch: 8, rad: 0.2, da: 0.5 });
  ctx.restore();
}
// goblet: stemmed cup, base at (x, y), 44 x 64 at s 1. o: fill 0..1, slosh (surface tilt), glint 0..1, rot
function a99Goblet(ctx, x, y, o = {}) {
  const s = o.s ?? 1, f = K.clamp(o.fill ?? 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const bowl = [[-22, -64], [22, -64], [20, -46], [12, -34], [-12, -34], [-20, -46]];
  shape(ctx, [[-16, 0], [16, 0], [10, -7], [4, -10], [4, -32], [-4, -32], [-4, -10], [-10, -7]], C.yellow, { lw: 4, seed: 401, dot: C.red, pitch: 5, rad: 0.25, da: 0.4 });
  ctx.save(); K.poly(ctx, bowl, true); ctx.fillStyle = C.yellow; ctx.fill(); ctx.clip();
  if (f > 0.02) { const ly = K.lerp(-34, -60, f), sl = Math.tan(o.slosh || 0) * 22; ctx.fillStyle = '#a8161a'; K.poly(ctx, [[-30, ly + sl], [30, ly - sl], [30, 4], [-30, 4]], true); ctx.fill();
    ctx.strokeStyle = 'rgba(255,250,240,0.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, ly + sl * 0.55 + 3); ctx.lineTo(8, ly - sl * 0.36 + 3); ctx.stroke(); }
  ctx.fillStyle = dotPat(ctx, C.red, 5, 0.25); ctx.globalAlpha = 0.45; ctx.fillRect(-24, -66, 14, 34); ctx.restore();
  ink(ctx, [...bowl, bowl[0]], 4, 402);
  if (o.glint > 0) { const g = K.ease.back(K.clamp(o.glint)); star(ctx, 16, -66, 11 * g, C.white, 0.3); }
  ctx.restore();
}
// jug: 60 x 110, base at (x, y); rot tilts it about the base (negative = pour to the left)
function a99Jug(ctx, x, y, o = {}) {
  const s = o.s ?? 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(28, -64, 18, -1.3, 1.3); ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = A99_BRASS; ctx.stroke(); ctx.restore();
  shape(ctx, [[-20, 0], [20, 0], [30, -34], [24, -62], [12, -78], [14, -100], [-10, -100], [-26, -108], [-14, -88], [-12, -78], [-24, -62], [-30, -34]], A99_BRASS, { lw: 4.5, seed: 403, dot: C.red, pitch: 6, rad: 0.24, da: 0.45 });
  seg(ctx, -24, -60, 24, -60, 3, C.red, 1.5); ctx.restore();
}
// low brass tray-table (sini) for the meal: top at y, centre x
function a99Table(ctx, x, y) {
  shape(ctx, [[x - 14, y + 4], [x + 14, y + 4], [x + 22, y + 34], [x - 22, y + 34]], WOOD, { lw: 4, seed: 404 });
  shape(ctx, ell(x, y, 52, 11, 26), A99_BRASS, { lw: 4.5, seed: 405, dot: C.red, pitch: 7, rad: 0.22, da: 0.45 });
}
// food tray (bread, dates, bowl), centre (x, y); bread 0..1 (amount left)
function a99Tray(ctx, x, y, o = {}) {
  const s = o.s ?? 1, br = o.bread ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, ell(0, 0, 62, 13, 24), A99_BRASS, { lw: 4, seed: 406, dot: '#c58a18', pitch: 7, rad: 0.25, da: 0.5 });
  if (br > 0.05) shape(ctx, ell(-20, -8, 30 * br + 6, 9, 16), '#e8b25a', { lw: 3.5, seed: 407, dot: '#a8741a', pitch: 6, rad: 0.2, da: 0.4 });
  for (let i = 0; i < (o.dates ?? 4); i++) shape(ctx, ell(18 + (i % 2) * 10, -9 - Math.floor(i / 2) * 7, 6, 4, 8), '#7a4212', { lw: 2, seed: 408 + i });
  if (o.goblets) for (let i = 0; i < o.goblets; i++) a99Goblet(ctx, -36 + i * 24, -4, { s: 0.55, fill: 0 });
  ctx.restore();
}
function a99Bowl(ctx, x, y, o = {}) {
  shape(ctx, [[x - 26, y - 18], [x + 26, y - 18], [x + 18, y - 2], [x - 18, y - 2]], C.blue, { lw: 4, seed: 412, dot: C.white, pitch: 6, rad: 0.2, da: 0.5 });
  shape(ctx, ell(x, y - 19, 26, 6, 18), '#f4ecd8', { lw: 3, seed: 413 });
  for (let i = 0; i < (o.dates || 0); i++) shape(ctx, ell(x - 6 + i * 9, y - 24 - (i % 2) * 3, 6, 4, 8), '#7a4212', { lw: 2, seed: 414 + i });
}
function a99Bread(ctx, x, y, s = 1) { shape(ctx, ell(x, y, 15 * s, 9 * s, 14), '#e8b25a', { lw: 3, seed: 417, dot: '#a8741a', pitch: 5, rad: 0.2, da: 0.4 }); }
// silver coins and the treasure chest (lid open 0..1, silver mound inside)
function a99Coin(ctx, x, y, r = 11, sx = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.12, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r * 0.42, 14), A99_SILVER, { lw: 2.5, seed: 420, dot: C.blue, pitch: 4, rad: 0.25, da: 0.5 }); ctx.restore();
}
function a99Chest(ctx, x, y, o = {}) {
  const s = o.s ?? 1, op = K.clamp(o.open || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.sqx || 1), s * (o.sqy || 1));
  if (op > 0.05) { shape(ctx, [[-78, -96], [-60, -96 - 46 * op], [-20, -96 - 64 * op], [24, -96 - 60 * op], [62, -96 - 40 * op], [78, -96]], A99_SILVER, { lw: 4, seed: 421, dot: C.blue, pitch: 6, rad: 0.24, da: 0.55 });
    for (let i = 0; i < 9; i++) a99Coin(ctx, -56 + (i % 5) * 28 + (i > 4 ? 14 : 0), -100 - 20 * op - (i > 4 ? 24 * op : 0), 10); }
  shape(ctx, K.rectPts(-85, -96, 170, 96), '#8a5a14', { lw: 6, seed: 422, dot: '#5b3010', pitch: 8, rad: 0.2, da: 0.4 });
  for (const bx of [-58, 58]) shape(ctx, K.rectPts(bx - 9, -96, 18, 96), A99_SILVER, { lw: 3.5, seed: 423 });
  shape(ctx, K.rectPts(-12, -78, 24, 22), C.yellow, { lw: 3.5, seed: 424 });
  // lid: closed slab on top; opening, it swings up and back (seen edge-on, it rises and thins)
  const lh = 30 * Math.cos(op * Math.PI / 2) + 6, ly = -96 - lh - 60 * Math.sin(op * Math.PI / 2);
  shape(ctx, [[-88, -96 - (op > 0.05 ? 60 * Math.sin(op * Math.PI / 2) : 0)], [-82, ly], [82, ly], [88, -96 - (op > 0.05 ? 60 * Math.sin(op * Math.PI / 2) : 0)]], '#a8741a', { lw: 6, seed: 425, dot: '#5b3010', pitch: 8, rad: 0.2, da: 0.35 });
  ctx.restore();
}
// weekDots: seven paper discs, lit[i] = 0..1 pop of the yellow star disc
function a99WeekDots(ctx, x, y, p, lit) {
  for (let i = 0; i < 7; i++) { const k = K.ease.back(K.clamp((p - i * 0.06) / 0.4)); if (k <= 0) continue; const cx = x + (i - 3) * 44, L = lit[i] || 0, kk = L > 0 ? 1 + 0.35 * Math.sin(Math.PI * K.clamp(L)) * (L < 1 ? 1 : 0) : 1;
    ctx.save(); ctx.translate(cx, y); ctx.scale(k * kk, k * kk); shape(ctx, ell(0, 0, 16, 16, 18), L > 0.3 ? C.yellow : C.white, { lw: 4, seed: 430 + i }); if (L > 0.3) star(ctx, 0, 0, 10, C.red, 0); ctx.restore(); }
}

// ---------- icons (flat, drawn centred at 0,0 at about 60 px; callers translate/scale) ----------
function a99Icon(ctx, kind, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
  if (kind === 'robe') { shape(ctx, [[-14, -30], [14, -30], [34, -16], [26, -4], [18, -10], [20, 30], [-20, 30], [-18, -10], [-26, -4], [-34, -16]], '#f4ecd8', { lw: 4, seed: 440, dot: '#c9bfa6', pitch: 6, rad: 0.3 });
    shape(ctx, K.rectPts(-12, 4, 12, 12), C.blue, { lw: 2.5, seed: 441 }); shape(ctx, K.rectPts(4, -16, 10, 10), C.blue, { lw: 2.5, seed: 442 }); }
  else if (kind === 'eq') { for (const dy of [-9, 9]) shape(ctx, K.rectPts(-24, dy - 4, 48, 8), C.black, { lw: 0 }); }
  else if (kind === 'book') { const full = o.full; for (const sd of [-1, 1]) shape(ctx, [[0, -20], [sd * 34, -26], [sd * 34, 22], [0, 28]], C.white, { lw: 4, seed: 443 + sd });
    if (full) { ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) { const yy = -14 + i * 9; ctx.beginPath(); ctx.moveTo(sd * 6, yy); ctx.lineTo(sd * 28, yy - 3); ctx.stroke(); } ctx.restore(); }
    else if (o.empty) { ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#c9bfa6'; ctx.fillRect(-30, -20, 60, 40); ctx.restore(); } }
  else if (kind === 'moth') { const f = Math.sin((o.t || 0) * 30); ctx.fillStyle = '#8c8a94'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 7, 0, 8, 5 + 2 * f, sd * 0.5, 0, 7); ctx.fill(); } ctx.fillStyle = C.black; ctx.fillRect(-1.5, -5, 3, 10); }
  else if (kind === 'lamp') { const lit = o.lit ?? 1;
    if (lit > 0) { ctx.save(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.globalAlpha = lit; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.5; ctx.beginPath(); ctx.moveTo(-6 + Math.cos(a) * 26, -20 + Math.sin(a) * 26); ctx.lineTo(-6 + Math.cos(a) * 40, -20 + Math.sin(a) * 40); ctx.stroke(); } ctx.restore();
      shape(ctx, [[-6, -34], [2, -22], [-2, -14], [-10, -14], [-14, -22]], mixHex('#8c8a94', C.yellow, lit), { lw: 3, seed: 446 }); }
    shape(ctx, [[-34, 0], [-14, -14], [18, -14], [36, -8], [26, 0], [16, 10], [-22, 10]], A99_BRASS, { lw: 4, seed: 447, dot: C.red, pitch: 6, rad: 0.22, da: 0.4 });
    if (o.smoke > 0) { ctx.save(); ctx.globalAlpha = K.clamp(1 - o.smoke); ctx.strokeStyle = '#8c8a94'; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 10; i++) { const yy = -18 - i * 5 * (0.4 + o.smoke); ctx.lineTo(-8 + 6 * Math.sin(i * 0.9 + o.smoke * 6), yy); } ctx.stroke(); ctx.restore(); } }
  else if (kind === 'coin') { shape(ctx, ell(0, 0, 22, 22, 20), C.yellow, { lw: 4, seed: 448, dot: C.red, pitch: 6, rad: 0.2, da: 0.4 }); ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 7); ctx.stroke(); ctx.restore(); }
  else if (kind === 'purse') { shape(ctx, [[-20, -26], [20, -26], [16, -16], [26, 14], [0, 26], [-26, 14], [-16, -16]], '#8a5a14', { lw: 4, seed: 449, dot: '#5b3010', pitch: 6, rad: 0.25, da: 0.4 }); seg(ctx, -16, -16, 16, -16, 3, C.red, 1.5); }
  else if (kind === 'star') star(ctx, 0, 0, 26, C.yellow, 0);
  else if (kind === 'moon') { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 24, 0, 7); ctx.arc(10, -6, 20, 0, 7, true); ctx.fillStyle = C.yellow; ctx.fill('evenodd'); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, 24, 0.2, 5.5); ctx.stroke(); ctx.restore(); }
  else if (kind === 'compass') { shape(ctx, ell(0, 0, 26, 26, 24), C.white, { lw: 4, seed: 450 }); shape(ctx, [[0, -24], [6, 0], [0, 24], [-6, 0]], C.red, { lw: 2.5, seed: 451 }); shape(ctx, [[-24, 0], [0, -6], [24, 0], [0, 6]], C.blue, { lw: 2.5, seed: 452 }); }
  ctx.restore();
}
// red cross strike over an icon
function a99Cross(ctx, x, y, r, p) { const k = K.clamp(p); if (k <= 0) return; ctx.save(); ctx.lineCap = 'round'; for (const [a, b] of [[[-r, -r], [r, r]], [[r, -r], [-r, r]]]) { const f = K.clamp(k * 2 - (a[0] < 0 ? 0 : 1)); if (f <= 0) continue;
  ctx.lineWidth = 13; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + a[0], y + a[1]); ctx.lineTo(x + K.lerp(a[0], b[0], f), y + K.lerp(a[1], b[1], f)); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); }
// badge: red ? or green tick in a white disc (pop 0..1)
function a99Badge(ctx, x, y, mark, p, r = 26) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0 || !mark) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  shape(ctx, ell(0, 0, r, r, 20), C.white, { lw: 4.5, seed: 455 });
  if (mark === '?') { ctx.font = K.font(r * 1.6, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('?', 0, 2); }
  else { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 11; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-r * 0.5, 0); ctx.lineTo(-r * 0.12, r * 0.4); ctx.lineTo(r * 0.55, -r * 0.45); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = A99_GREEN; ctx.stroke(); }
  ctx.restore();
}
// knot: one polyline of loops (prolate cycloid) with seeded jitter; untie 0..1 lerps every point onto a straight segment
function a99KnotPts(L, loops, size, untie, seed = 9) {
  const r = K.rng(seed), n = 90, J = Array.from({ length: n + 1 }, () => [r() - 0.5, r() - 0.5]), out = [];
  for (let i = 0; i <= n; i++) { const u = i / n, th = u * loops * Math.PI * 2, A = (2 * L) / (loops * Math.PI * 2), B = size * (0.8 + 0.4 * Math.sin(u * 9 + seed));
    const kx = -L + A * th - B * Math.sin(th) + J[i][0] * 6, ky = -B * Math.cos(th) + B * 0.4 + J[i][1] * 6, sx = -L + 2 * L * u, f = K.ease.inOut(K.clamp(untie));
    out.push([K.lerp(kx, sx, f), K.lerp(ky, 0, f)]); }
  return out;
}
function a99Rope(ctx, pts, w = 7, col = C.black) { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = w + 5; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = col; K.poly(ctx, pts); ctx.stroke(); ctx.restore(); }
// wedge i (0 red, 1 yellow, 2 blue) of a disc r, apex at (x, y), rotated by rot
const A99_WEDGE = [C.red, C.yellow, C.blue];
function a99Wedge(ctx, x, y, r, i, rot = 0, o = {}) {
  const a0 = rot + i * Math.PI * 2 / 3 - Math.PI / 2, pts = [[x, y]]; for (let k = 0; k <= 12; k++) { const a = a0 + k / 12 * Math.PI * 2 / 3; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } pts.push([x, y]);
  if (o.dashed) { ctx.save(); ctx.setLineDash([10, 9]); ctx.lineWidth = 5; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.restore(); return; }
  shape(ctx, pts, A99_WEDGE[i], { lw: 4.5, seed: 460 + i, dot: i === 1 ? C.red : C.white, pitch: 7, rad: 0.2, da: 0.35 });
}
// answerBalloon: speech balloon with icon content and a badge. o: p (pop 0..1), tail [x, y], icon ('knot' | 'line' | 'pieces' | 'wedge' | 'whole' | 'wide' | 'lamp' | fn(ctx)),
//   loops, tangle (loop size factor), untie 0..1, wedge (index), spin, grow 0..1 (wide), mark '?' | 'tick', markP, strokes (counted lines), shake
function a99Balloon(ctx, x, y, w, h, t, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  let W = w, H = h; if (o.icon === 'wide') { const g = K.clamp(o.grow ?? 0); W = K.lerp(220, w, K.ease.out(g)); H = K.lerp(160, h, K.ease.out(g)); }
  const sx = o.shake || 0, X = x + sx, tail = o.tail || [x, y + h];
  bubble(ctx, X, y, W, H, tail[0], tail[1], p, '');
  const k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0) return;
  ctx.save(); ctx.translate(X, y); ctx.scale(k, k);
  const ic = o.icon, sc = Math.min(W / 380, H / 240);
  if (ic === 'knot' || ic === 'line') { const pts = a99KnotPts(140 * sc, o.loops ?? 3, 34 * sc * (o.tangle ?? 1), ic === 'line' ? 1 : o.untie || 0, o.seed ?? 9); a99Rope(ctx, pts, 7 * Math.max(0.6, sc));
    for (let i = 0; i < (o.strokes || 0); i++) { const f = K.clamp((o.strokesP || [1, 1, 1])[i] ?? 1); if (f > 0) seg(ctx, -60 * sc + i * 60 * sc - 16 * f, 52 * sc, -60 * sc + i * 60 * sc + 16 * f, 52 * sc, 5, C.black, 0); } }
  else if (ic === 'pieces') { for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3 - Math.PI / 2 + Math.PI / 3, d = 16 * sc; a99Wedge(ctx, Math.cos(a) * d, Math.sin(a) * d, 70 * sc, i, 0, { dashed: true }); } }
  else if (ic === 'wedge') a99Wedge(ctx, 0, 28 * sc, 80 * sc, o.wedge ?? 0, 0);
  else if (ic === 'whole') { for (let i = 0; i < 3; i++) a99Wedge(ctx, 0, 0, 72 * sc, i, o.spin || 0); }
  else if (ic === 'wide') { const g = K.clamp(o.grow ?? 0), items = [['book', 0, -1], ['star', 1, 0.2], ['moon', 2, 0.45], ['compass', 3, 0.7]], span = W - 120;
    items.forEach(([kind, i, g0]) => { const kk = K.ease.back(K.clamp((g - g0) / 0.18)); if (kk <= 0) return; const xx = g < 0.15 ? 0 : K.lerp(0, -span / 2 + i * span / 3, K.clamp(g * 1.4)); a99Icon(ctx, kind, xx, 0, kk * 1.3, { full: true }); }); }
  else if (ic === 'lamp') a99Icon(ctx, 'lamp', 0, 10, 1.4 * sc / 0.5 * 0.5, { lit: 1 });
  else if (typeof ic === 'function') ic(ctx, sc);
  ctx.restore();
  if (o.mark) a99Badge(ctx, X + W * 0.4, y - H * 0.36, o.mark, o.markP ?? 1, 26 * Math.max(0.7, sc));
}
