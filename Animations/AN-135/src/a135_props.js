// ===== AN-135 props and effects (library candidates, see library_proposals.md): sugarcane + caneField, smallBowl, waterJug,
// taxScroll, coinPile, crownProp, saddlebag, iconBalloon, powderSprinkle, aroma curls, hitching post, low table, silhouette =====
const A135_CANE = { a: '#9bc53d', b: '#86b52f', dry: '#c9a544', leaf: '#6cc35a', leafD: '#3f9d4a', juice: '#d8e36a', water: '#eef5b0', clay: '#c8481a', clayD: '#8a2a0e' };

// sugarcane(ctx, x, baseY, o): one upright stalk. o: {h 360, w 22, lush 0..1, bend (radians, bows the top third), sway, t, seed, dir (+1 bows right),
//   droop (0..1 extra hang of the top leaf), alpha}. Pure function of the fields.
function a135Cane(ctx, x, baseY, o = {}) {
  const h = o.h || 360, lush = K.clamp(o.lush ?? 1), w = (o.w || 22) * K.lerp(0.6, 1, lush), n = 8, L = h / n, seed = o.seed || 1, t = o.t || 0, dir = o.dir || 1;
  const bend = (o.bend || 0) + (1 - lush) * 0.35, sw = (o.sway ?? 0.04) * Math.sin(t * 1.3 + seed * 1.7);
  const pts = [[x, baseY]]; let a = 0;
  for (let i = 1; i <= n; i++) { const f = i / n; a += (i % 2 ? 0.025 : -0.025) + sw * f * 0.9 + (f > 0.62 ? dir * bend / 3 : 0); const p = pts[i - 1]; pts.push([p[0] + Math.sin(a) * L, p[1] - Math.cos(a) * L]); }
  const c1 = mixHex(A135_CANE.a, A135_CANE.dry, 1 - lush), c2 = mixHex(A135_CANE.b, A135_CANE.dry, (1 - lush) * 0.9);
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // leaves first from the lower nodes (behind), the stalk, then the top tuft
  const leaf = (p, ang, len, wid, col) => { const pts2 = [], back = []; const g = K.lerp(0.9, 2.4, 1 - lush);
    for (let k = 0; k <= 8; k++) { const u = k / 8, aa = ang + g * u * u * Math.sign(Math.sin(ang) || 1) * 0.6, px = p[0] + Math.sin(ang) * len * u + Math.sin(aa) * 6 * u, py = p[1] - Math.cos(ang) * len * u + (g * 34 * u * u),
        ww = wid * Math.sin(Math.PI * Math.min(1, u * 1.15 + 0.05)) * (1 - u * 0.5); pts2.push([px + Math.cos(ang) * ww, py + Math.sin(ang) * ww]); back.unshift([px - Math.cos(ang) * ww, py - Math.sin(ang) * ww]); }
    shape(ctx, [...pts2, ...back, pts2[0]], col, { lw: 3.5, seed: seed + 7 }); };
  const lc = mixHex(A135_CANE.leaf, A135_CANE.dry, 1 - lush), up = K.lerp(1.9, 0.75, lush);
  for (const [ni, sd] of [[3, -1], [5, 1]]) leaf(pts[ni], a * 0.3 + sd * up * 0.9 + sw, 90, 7, lc);
  ctx.strokeStyle = C.black; ctx.lineWidth = w + 8; K.poly(ctx, pts); ctx.stroke();
  for (let i = 1; i <= n; i++) { ctx.strokeStyle = i % 2 ? c1 : c2; ctx.lineWidth = w; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(...pts[i - 1]); ctx.lineTo(...pts[i]); ctx.stroke(); }
  ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
  for (let i = 1; i < n; i++) { const [px, py] = pts[i], q = pts[i + 1], ang = Math.atan2(q[1] - py, q[0] - px) + Math.PI / 2; ctx.beginPath(); ctx.moveTo(px - Math.cos(ang) * w * 0.55, py - Math.sin(ang) * w * 0.55); ctx.lineTo(px + Math.cos(ang) * w * 0.55, py + Math.sin(ang) * w * 0.55); ctx.stroke(); }
  // highlight
  ctx.strokeStyle = 'rgba(255,250,240,0.55)'; ctx.lineWidth = Math.max(2, w * 0.18); ctx.beginPath(); ctx.moveTo(pts[0][0] - w * 0.22, pts[0][1] - 10); for (let i = 1; i < n - 1; i++) ctx.lineTo(pts[i][0] - w * 0.22, pts[i][1]); ctx.stroke();
  const tp = pts[n], topA = a;
  [-1.0, -0.45, 0.1, 0.55, 1.05].forEach((k, j) => { const ang = topA + k * up + sw * 2 + (j === 4 ? (o.droop || 0) * 2.0 : 0); leaf(tp, ang, 120 * (j === 2 ? 0.8 : 1), 9, j % 2 ? lc : mixHex(A135_CANE.leafD, A135_CANE.dry, 1 - lush)); });
  ctx.restore();
  return { top: tp, mid: pts[4], pts };
}
// caneField(ctx, x0, x1, baseY, o): n stalks spread across x0..x1 with seeded heights (+/- 8 %) and a row of tufts at the base.
//   o: {n 7, h 360, lush (number or array), bend (number or array), droop (array), sway, t, seed}
function a135CaneField(ctx, x0, x1, baseY, o = {}) {
  const n = o.n || 7, r = K.rng(o.seed || 11), out = [], at = (v, i, d) => (Array.isArray(v) ? v[i] ?? d : v ?? d);
  const H = []; for (let i = 0; i < n; i++) H.push((o.h || 360) * (0.92 + r() * 0.16));
  for (let i = 0; i < n; i++) { const x = K.lerp(x0, x1, n > 1 ? i / (n - 1) : 0.5);
    out.push(a135Cane(ctx, x, baseY, { h: H[i], lush: at(o.lush, i, 1), bend: at(o.bend, i, 0), droop: at(o.droop, i, 0), sway: o.sway ?? 0.04, t: o.t, seed: i * 3 + 2, dir: i % 2 ? 1 : -1 })); }
  for (let k = 0; k < n * 2 + 1; k++) { const x = K.lerp(x0 - 30, x1 + 30, k / (n * 2)), lu = at(o.lush, Math.min(n - 1, Math.round(k / 2)), 1); shape(ctx, [[x - 22, baseY + 14], [x - 8, baseY - 26], [x, baseY - 8], [x + 10, baseY - 30], [x + 22, baseY + 14]], mixHex(GREEN, A135_CANE.dry, (1 - lu) * 0.8), { lw: 3.5, seed: 70 + k }); }
  return out;
}
// loose cut piece of cane, centred at (x, y): o {len 220, w 22, rot, twist 0..1, limp 0..1, lush, s}
function a135CanePiece(ctx, x, y, o = {}) {
  const len = o.len || 220, w = (o.w || 22) * K.lerp(0.6, 1, K.clamp(o.lush ?? 1)), tw = K.clamp(o.twist || 0), lm = o.limp || 0, s = o.s || 1, N = 16;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const cy = (u) => lm * 60 * Math.pow(Math.abs(u - 0.5) * 2, 1.6), ww = (u) => w / 2 * (1 - tw * 0.45 * Math.exp(-Math.pow((u - 0.5) / 0.18, 2)));
  const top = [], bot = []; for (let k = 0; k <= N; k++) { const u = k / N, px = (u - 0.5) * len * (1 - lm * 0.15); top.push([px, cy(u) - ww(u)]); bot.unshift([px, cy(u) + ww(u)]); }
  const col = o.col || mixHex(A135_CANE.a, A135_CANE.dry, Math.max(1 - (o.lush ?? 1), tw * 0.5));   // v2: o.col overrides the fill
  shape(ctx, [...top, ...bot, top[0]], col, { lw: 4, seed: 41 });
  ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.lineWidth = 3.5;
  for (let k = 1; k < 5; k++) { const u = k / 5, px = (u - 0.5) * len * (1 - lm * 0.15); ctx.beginPath(); ctx.moveTo(px, cy(u) - ww(u)); ctx.lineTo(px, cy(u) + ww(u)); ctx.stroke(); }
  if (tw > 0.05) { ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { const u = 0.38 + k * 0.08, px = (u - 0.5) * len; ctx.globalAlpha = tw; ctx.beginPath(); ctx.moveTo(px - 8, cy(u) - ww(u) + 2); ctx.lineTo(px + 8, cy(u) + ww(u) - 2); ctx.stroke(); } }
  ctx.restore();
}

// smallBowl(ctx, x, y, o): bowl with its rim centre at (x, y), 150 x 66 at s 1. o: {s, fill 0..1, cut (cross-section so the level reads), specks 0..1, tilt, water 0..1 (lighter juice), wob (surface wobble), seed}
function a135Bowl(ctx, x, y, o = {}) {
  const s = o.s || 1, fill = K.clamp(o.fill || 0), rx = 75, d = 66;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.tilt || 0); ctx.scale(s, s);
  const outer = []; for (let k = 0; k <= 24; k++) { const a = Math.PI * k / 24; outer.push([Math.cos(a) * rx, Math.sin(a) * d]); } outer.unshift([rx + 4, -4]); outer.push([-rx - 4, -4]);
  const juice = mixHex(A135_CANE.juice, A135_CANE.water, o.water || 0);
  shape(ctx, [[-22, d - 6], [22, d - 6], [26, d + 10], [-26, d + 10], [-22, d - 6]], A135_CANE.clayD, { lw: 4, seed: 51 });
  if (o.cut) {
    shape(ctx, [...outer, outer[0]], A135_CANE.clay, { lw: 5, seed: 52, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 });
    const inner = []; for (let k = 0; k <= 24; k++) { const a = Math.PI * k / 24; inner.push([Math.cos(a) * (rx - 11), Math.sin(a) * (d - 10)]); }
    ctx.save(); K.poly(ctx, inner, true); ctx.fillStyle = '#5b2a12'; ctx.fill(); ctx.clip();
    if (fill > 0.001) { const lvl = (d - 10) * (1 - fill) - 2, wob = o.wob || 0, sp = []; for (let k = 0; k <= 12; k++) { const u = k / 12, px = K.lerp(-rx, rx, u); sp.push([px, lvl + Math.sin(u * 9 + (o.t || 0) * 12) * wob * 4]); }
      ctx.fillStyle = juice; ctx.beginPath(); ctx.moveTo(-rx, d); sp.forEach((p) => ctx.lineTo(...p)); ctx.lineTo(rx, d); ctx.closePath(); ctx.fill();
      ctx.fillStyle = dotPat(ctx, '#9bb02a', 7, 0.22); ctx.fill();
      ctx.lineWidth = 4; ctx.strokeStyle = C.black; K.poly(ctx, sp); ctx.stroke();
      if (o.specks) { const r = K.rng(o.seed || 9); ctx.fillStyle = '#5b3a1e'; for (let k = 0; k < 9; k++) { const px = K.lerp(-rx + 18, rx - 18, r()); if (r() < o.specks) { ctx.beginPath(); ctx.arc(px, lvl - 1 + r() * 3, 3.2, 0, 7); ctx.fill(); } } } }
    ctx.restore(); ink(ctx, inner, 3, 53);
  } else {
    shape(ctx, [...outer, outer[0]], A135_CANE.clay, { lw: 5, seed: 52, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 });
    if (fill > 0.4) { shape(ctx, ell(0, 2, rx - 10, 10, 24), juice, { lw: 3, seed: 54 }); if (o.specks) { const r = K.rng(o.seed || 9); ctx.fillStyle = '#5b3a1e'; for (let k = 0; k < 8; k++) if (r() < o.specks) { ctx.beginPath(); ctx.arc(K.lerp(-50, 50, r()), K.lerp(-4, 6, r()), 3, 0, 7); ctx.fill(); } } }
  }
  seg(ctx, -rx - 2, -2, rx + 2, -2, 8, C.yellow, 3.5);
  ctx.restore();
}
// waterJug(ctx, x, y, o): ewer centred at (x, y) (its belly), 60 x 110 at s 1; o.tilt rotates about the centre. Returns the spout tip in world units.
function a135Jug(ctx, x, y, o = {}) {
  const s = o.s || 1, tl = o.tilt || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(tl); ctx.scale(s, s);
  shape(ctx, [[-14, -55], [14, -55], [12, -36], [28, -14], [30, 18], [18, 50], [-18, 50], [-30, 18], [-28, -14], [-12, -36], [-14, -55]], '#3f7be6', { lw: 4.5, seed: 61, dot: C.white, pitch: 8, rad: 0.2, da: 0.35 });
  shape(ctx, [[-26, -14], [-50, -48], [-58, -50], [-46, -40], [-30, -2]], '#3f7be6', { lw: 4, seed: 62 });
  ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(30, 0, 16, -1.3, 1.3); ctx.stroke();
  seg(ctx, -16, -55, 16, -55, 5, C.yellow, 2.5);
  ctx.restore();
  const sx = -56 * s, sy = -49 * s, c = Math.cos(tl), n = Math.sin(tl); return [x + sx * c - sy * n, y + sx * n + sy * c];
}
// pour arc of n drops from a to b (world), t running time
function a135Pour(ctx, a, b, t, n = 6, col = '#5fa0ff', h = 30) { for (let i = 0; i < n; i++) { const u = ((t * 2.2 + i / n) % 1), x = K.lerp(a[0], b[0], u), y = K.lerp(a[1], b[1], u) - Math.sin(Math.PI * u) * h + u * u * 10;
  ctx.save(); ctx.globalAlpha = 1 - 0.4 * u; shape(ctx, [[x, y - 10], [x + 6, y + 1], [x, y + 6], [x - 6, y + 1], [x, y - 10]], col, { lw: 2.5, seed: 2 }); ctx.restore(); } }
// juice stream from a wrung cane at (x, y) down to (x, y1): drops, n per second
function a135Stream(ctx, x, y, y1, t, amt = 1, col = A135_CANE.juice) { if (amt <= 0.02) return; const n = Math.max(1, Math.round(5 * amt));
  for (let i = 0; i < n; i++) { const u = ((t * 2.4 + i / n) % 1), py = K.lerp(y, y1, u * u), px = x + Math.sin(i * 2.3) * 6; ctx.save(); ctx.globalAlpha = 0.9; shape(ctx, [[px, py - 11], [px + 6, py], [px, py + 6], [px - 6, py], [px, py - 11]], col, { lw: 2.5, seed: 3 }); ctx.restore(); } }

// taxScroll(ctx, x, y, o): the tax register hanging from its top roller centred at (x, y). 120 x 150 open at s 1.
//   o: {s, open 0..1, coins (3), torn 0..1 (the two halves move with o.halves [{dx, dy, rot}, {dx, dy, rot}]), stamp 0..1 (red X)}
function a135Scroll(ctx, x, y, o = {}) {
  const s = o.s || 1, op = K.clamp(o.open ?? 1), W = 120, Hh = 150 * op;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const paper = (c) => { shape(c, K.rectPts(-W / 2, 0, W, Hh), '#fff3d6', { lw: 4, seed: 71 });
    if (op > 0.6) { c.save(); c.globalAlpha = K.clamp((op - 0.6) / 0.3);
      shape(c, [[-38, 46], [-38, 24], [-24, 10], [-10, 24], [-10, 46], [-38, 46]], C.red, { lw: 3, seed: 72 });
      const n = o.coins ?? 3; for (let i = 0; i < n; i++) shape(c, ell(26, 42 - i * 9, 17, 6, 14), C.yellow, { lw: 2.5, seed: 73 });
      c.lineWidth = 3; c.strokeStyle = C.black; for (const ly of [80, 104, 126]) { c.beginPath(); for (let k = 0; k <= 10; k++) { const px = -44 + k * 8.8; c.lineTo(px, ly + Math.sin(k * 1.4) * 2.5); } c.stroke(); } c.restore(); } };
  const tr = K.clamp(o.torn || 0);
  if (tr <= 0) { paper(ctx); seg(ctx, -W / 2 - 10, 0, W / 2 + 10, 0, 12, BARKY, 3.5); if (op > 0.1) seg(ctx, -W / 2 - 6, Hh, W / 2 + 6, Hh, 10, BARKY, 3); }
  else { const hv = o.halves || [{ dx: -20, dy: 0, rot: -0.2 }, { dx: 20, dy: 0, rot: 0.2 }], zz = []; for (let k = 0; k <= 8; k++) zz.push([(k % 2 ? 7 : -7), Hh * k / 8 - 6]);
    [[-1, hv[0]], [1, hv[1]]].forEach(([sd, h]) => { ctx.save(); ctx.translate(h.dx * tr, h.dy * tr); ctx.rotate(h.rot * tr); ctx.beginPath();
      if (sd < 0) { ctx.moveTo(-W, -20); zz.forEach((p) => ctx.lineTo(...p)); ctx.lineTo(-W, Hh + 20); } else { ctx.moveTo(W, -20); zz.forEach((p) => ctx.lineTo(...p)); ctx.lineTo(W, Hh + 20); } ctx.closePath(); ctx.clip();
      paper(ctx); seg(ctx, -W / 2 - 10, 0, W / 2 + 10, 0, 12, BARKY, 3.5); seg(ctx, -W / 2 - 6, Hh, W / 2 + 6, Hh, 10, BARKY, 3); ctx.restore(); }); }
  if (o.stamp > 0) { const k = K.ease.back(K.clamp(o.stamp)); ctx.save(); ctx.translate(0, Hh / 2); ctx.scale(k, k); seg(ctx, -70, -70, 70, 70, 16, C.red, 4); seg(ctx, 70, -70, -70, 70, 16, C.red, 4); ctx.restore(); }
  ctx.restore();
}
// coinPile(ctx, x, y, n, s): coins stacked in columns of up to 10 (pyramid for many); (x, y) the base centre
function a135Coins(ctx, x, y, n, s = 1) {
  n = Math.max(0, Math.round(n)); const cols = Math.max(1, Math.ceil(n / 10)), order = []; for (let c = 0; c < cols; c++) order.push(c);
  order.sort((a, b) => Math.abs(b - (cols - 1) / 2) - Math.abs(a - (cols - 1) / 2));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const c of order) { const cx = (c - (cols - 1) / 2) * 38, m = Math.min(10, n - c * 10), lift = (cols - 1) / 2 - Math.abs(c - (cols - 1) / 2);
    for (let i = 0; i < m; i++) shape(ctx, ell(cx, -6 - i * 9 - lift * 14, 22, 8, 14), C.yellow, { lw: 3, seed: 80 + i, dot: '#e0a800', pitch: 6, rad: 0.25, da: 0.6 }); }
  ctx.restore();
}
// crownProp(ctx, x, y, s, o): gold crown, base centre (x, y), 70 wide at s 1, 3 points and a red jewel; o.tips (only the top part, clipped), o.rot
function a135Crown(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, [[-35, 0], [-35, -26], [-30, -46], [-17, -24], [0, -54], [17, -24], [30, -46], [35, -26], [35, 0], [-35, 0]], C.yellow, { lw: 4.5, seed: 91, dot: C.red, pitch: 7, rad: 0.2, da: 0.45 });
  seg(ctx, -33, -8, 33, -8, 4, '#e0a800', 2); shape(ctx, ell(0, -18, 7, 7, 12), C.red, { lw: 2.5, seed: 92 }); shape(ctx, ell(-21, -14, 4.5, 4.5, 10), C.blue, { lw: 2, seed: 93 }); shape(ctx, ell(21, -14, 4.5, 4.5, 10), C.blue, { lw: 2, seed: 94 });
  ctx.restore();
}
// saddlebag(ctx, x, y, s, o): leather satchel, top centre (x, y), 70 x 60 at s 1; the flap half open with the crown tips showing (o.crown)
function a135Bag(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (o.crown) { ctx.save(); ctx.beginPath(); ctx.rect(-40, -80, 80, 82); ctx.clip(); a135Crown(ctx, -4, 26 - (o.lift || 0), 0.7, { rot: -0.08 }); ctx.restore(); }
  shape(ctx, [[-35, 0], [35, 0], [38, 52], [26, 62], [-26, 62], [-38, 52], [-35, 0]], '#8a501a', { lw: 4.5, seed: 95, dot: '#5b3010', pitch: 8, rad: 0.2, da: 0.4 });
  const fl = K.clamp(o.flap || 0); ctx.save(); if (fl > 0) { ctx.translate(0, -4); ctx.scale(1, 1 - 1.7 * fl); ctx.translate(0, 4); }   // v2: o.flap lifts the flap (0..1)
  shape(ctx, [[-36, -2], [-10, -6], [-6, 24], [-24, 30], [-38, 18], [-36, -2]], '#a8641e', { lw: 4, seed: 96 });
  shape(ctx, ell(-20, 22, 5, 5, 10), C.yellow, { lw: 2, seed: 97 }); ctx.restore();
  ctx.restore();
}
// hitching post at x (ground 900)
function a135Post(ctx, x) { seg(ctx, x, 900, x, 790, 14, '#7a4212', 4); seg(ctx, x - 26, 800, x + 26, 800, 10, '#a8641e', 3.5); }
// low table: top surface y, centred x, width w
function a135Table(ctx, x, top, w = 260) { for (const d of [-w / 2 + 26, w / 2 - 26]) seg(ctx, x + d, top + 10, x + d, 900, 14, '#7a4212', 4); shape(ctx, K.rectPts(x - w / 2, top, w, 22), WOOD, { lw: 5, seed: 99, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.4 }); }

// powderSprinkle(ctx, x, y, d, o): a pinch of powder: 12 dots leaving (x, y) over 1.2 s (d = t - t0), each falling 0.5 s with a drift, to o.land
function a135Powder(ctx, x, y, d, o = {}) { if (d < 0) return; const r = K.rng(o.seed || 31), land = o.land ?? y + 60;
  for (let i = 0; i < 12; i++) { const t0 = i * 0.1 + r() * 0.04, u = (d - t0) / 0.5, dx = (r() - 0.5) * 30; if (u < 0 || u > 1) continue;
    ctx.save(); ctx.fillStyle = '#7a4212'; ctx.beginPath(); ctx.arc(x + dx * u + Math.sin(u * 6 + i) * 3, K.lerp(y, land, u * u), 3, 0, 7); ctx.fill(); ctx.restore(); } }
// aroma: two curly lines rising from (x, y), a 0..1
function a135Aroma(ctx, x, y, t, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  for (const sd of [-1, 1]) { const pts = []; for (let k = 0; k <= 14; k++) { const u = k / 14; pts.push([x + sd * 22 + Math.sin(u * 9 + t * 4 + sd) * 10, y - u * 90]); }
    ctx.lineWidth = 11; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; K.poly(ctx, pts); ctx.stroke(); } ctx.restore(); }

// iconBalloon(ctx, cx, cy, w, h, tail, p, cells, o): wordless picture balloon (rounded box, brush outline, tail to the speaker at tail [x, y]).
//   cells: [{p (pop 0..1), draw(c, cw, ch), bg}] laid out left to right; each cell is clipped and drawn in its own frame centred at (0, 0).
function a135Balloon(ctx, cx, cy, w, h, tail, p, cells, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const r = 26, box = [], add = (x, y, a0) => { for (let i = 0; i <= 6; i++) { const a = a0 + i / 6 * Math.PI / 2; box.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } };
  add(w / 2 - r, h / 2 - r, 0); add(-w / 2 + r, h / 2 - r, Math.PI / 2); add(-w / 2 + r, -h / 2 + r, Math.PI); add(w / 2 - r, -h / 2 + r, Math.PI * 1.5); box.push(box[0]);
  if (tail) { const tx = (tail[0] - cx) / k, ty = (tail[1] - cy) / k, bx = K.clamp(tx * 0.35, -w / 2 + 50, w / 2 - 50), by = ty > 0 ? h / 2 - 4 : -h / 2 + 4;
    const tp = [[bx - 22, by], [tx, ty], [bx + 22, by]]; ctx.fillStyle = C.white; K.poly(ctx, tp, true); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...tp[0]); ctx.lineTo(...tp[1]); ctx.lineTo(...tp[2]); ctx.stroke(); }
  ctx.fillStyle = C.white; K.poly(ctx, box, true); ctx.fill(); ink(ctx, box, 7, o.seed || 44);
  const n = cells.length, pad = 14, cw = (w - pad * (n + 1)) / n, ch = h - pad * 2;
  cells.forEach((cl, i) => { const q = K.clamp(cl.p ?? 1); if (q <= 0) return; const x0 = -w / 2 + pad + i * (cw + pad), y0 = -h / 2 + pad, kk = K.ease.back(q);
    ctx.save(); ctx.translate(x0 + cw / 2, y0 + ch / 2); ctx.scale(kk, kk); ctx.beginPath(); ctx.rect(-cw / 2, -ch / 2, cw, ch); ctx.fillStyle = cl.bg || '#fff8e6'; ctx.fill(); ctx.clip(); cl.draw(ctx, cw, ch); ctx.restore();
    ctx.save(); ctx.translate(x0 + cw / 2, y0 + ch / 2); ctx.scale(kk, kk); ink(ctx, K.rectPts(-cw / 2, -ch / 2, cw, ch).concat([[-cw / 2, -ch / 2]]), 4, 45 + i); ctx.restore(); });
  ctx.restore();
}
// red X and "?" for balloon cells (cell-local units)
function a135X2(ctx, x, y, r, p = 1) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); seg(ctx, -r, -r, r, r, r * 0.32, C.red, 3.5); seg(ctx, r, -r, -r, r, r * 0.32, C.red, 3.5); ctx.restore(); }
function a135Q(ctx, x, y, size, p = 1) { sfx(ctx, '?', x, y, size, p, { fill: C.red }); }
// a person drawn as a flat black silhouette (window, distance): draws into a cached layer, then fills black through it
function a135Silhouette(ctx, draw, x0, y0, w, h, col = '#141414') {
  const L = K.cached('a135-sil', () => K.layer(512, 512)), c = L.getContext('2d'), sc = 512 / Math.max(w, h);
  c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, 512, 512); c.setTransform(sc, 0, 0, sc, -x0 * sc, -y0 * sc); draw(c);
  c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-in'; c.fillStyle = col; c.fillRect(0, 0, 512, 512); c.globalCompositeOperation = 'source-over';
  ctx.drawImage(L, 0, 0, 512, 512, x0, y0, 512 / sc, 512 / sc);
}
