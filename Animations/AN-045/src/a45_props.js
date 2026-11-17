// ===== AN-045 The Thief and His Monkey: story props and cast wrappers =====
// Library proposals (see library_proposals.md): a45Bundle (clothBundle), a45Rags / a45Shirt (oldClothes), a45RichDrape (richCloth),
// a45Coin / a45CoinPile (coinPile), a45Moth, a45Balloon (iconBalloon), a45Inset (inset circle), a45Monkey (monkey rot pivot + fez), a45Sign (noPeekSign).
const A45_GREY = '#9a917f', A45_GREYD = '#5f594e', A45_BROWN = '#8a5a2b', A45_BROWND = '#5b3a1e', A45_OLIVE = '#8a8442', A45_GOLD = '#f2b51c';
const A45_DUR = 171.43;   // narration 167.63 + 3.8 s THE END hold (plan duration + end_hold)

// ---------- small helpers ----------
const A45B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a45In = (t, a, b) => t >= a && t < b;
const a45Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const a45Lid = (P, t, seed) => { P.lid = Math.max(P.lid || 0, blink(t, seed)); return P; };
// a person's head centre in world units (standing, sitting or kneeling), for gaze lines, balloons and lettering
function a45Head(P) { const s = (P.s || 1) * (P.child ? 0.62 : 1), age = P.age ?? 0.2;
  return [P.x + (P.dir || 1) * s * (P.lean || 0) * -60, P.y - s * (195 - (P.drop || 0) - age * 6) + s * 27 * (P.sit || 0) + s * 55 * (P.kneel || 0)]; }
const a45Eye = (P) => { const h = a45Head(P); return [h[0], h[1] - 4 * (P.s || 1)]; };
// a bare hand (skin dots), drawn over props that cover the figure's own hand
function a45Hand(ctx, x, y, s = 1.25) { shape(ctx, ell(x, y, 12 * s, 12 * s, 12), C.white, { lw: 3.5 * s, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }
// one sweat drop
function a45Sweat(ctx, x, y, p = 1, s = 1) { if (p <= 0) return; ctx.save(); ctx.globalAlpha = K.clamp(p * 3) * (1 - K.clamp((p - 0.7) / 0.3)); const yy = y + 40 * p;
  shape(ctx, [[x, yy - 22 * s], [x + 10 * s, yy - 2 * s], [x + 9 * s, yy + 6 * s], [x, yy + 11 * s], [x - 9 * s, yy + 6 * s], [x - 10 * s, yy - 2 * s]], '#7fb6ff', { lw: 3, seed: 4 }); ctx.restore(); }
// brows for figures whose costume has none (the wife): v < 0 raised, v > 0 stern
function a45Brows(ctx, P, v) { const [hx, hy] = a45Head(P), s = P.s || 1, ey = hy - 4 * s; ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 5 * s; ctx.strokeStyle = C.black;
  for (const sd of [-1, 1]) { const bx = hx + sd * 13 * s; ctx.beginPath(); ctx.moveTo(bx - sd * 9 * s, ey - 19 * s + v * 7 * s); ctx.lineTo(bx + sd * 9 * s, ey - 19 * s - v * 5 * s); ctx.stroke(); } ctx.restore(); }
// a small purse on a crowd member's sash
function a45Purse(ctx, x, y, s = 1, fat = 0) { const r = (12 + fat * 7) * s;
  shape(ctx, [[x - r * 0.5, y - r * 1.1], [x + r * 0.5, y - r * 1.1], [x + r, y], [x + r * 0.8, y + r * 0.8], [x - r * 0.8, y + r * 0.8], [x - r, y]], A45_BROWN, { lw: 3.5, seed: 61, dot: A45_BROWND, pitch: 6, rad: 0.3, da: 0.5 });
  seg(ctx, x - r * 0.55, y - r * 1.05, x + r * 0.55, y - r * 1.05, 3 * s, C.yellow, 2); }

// v2: a lettering box whose content pops in together with it (no empty frame while the box grows); p 0..1, draw(ctx) paints the content
function a45PopBox(ctx, S, x, y, w, h, p, o, draw) { const k = K.ease.back(K.clamp(p * 1.3)); if (k <= 0.01) return; ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-x - w / 2, -y - h / 2);
  S.box(ctx, x, y, w, h, 1, o); draw(ctx); ctx.restore(); }
// ---------- coins ----------
function a45Coin(ctx, x, y, r = 14, sx = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 18), C.yellow, { lw: Math.max(2.5, r * 0.24), seed: 71 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, r * 0.28, 0, 7); ctx.fill(); ctx.restore(); }
// coinPile: n coins heaped on the ground point (x, y); grows bottom row first
function a45CoinPile(ctx, x, y, n, s = 1) { const r = 14 * s; let k = 0, row = 0;
  while (k < n) { const m = Math.max(1, 7 - row * 2 + (row === 0 && n > 20 ? 2 : 0)); for (let i = 0; i < m && k < n; i++, k++) a45Coin(ctx, x + (i - (m - 1) / 2) * r * 1.6 + (row % 2) * r * 0.4, y - r - row * r * 1.25, r); row++; if (row > 8) row = 8; } }

// a wide heap for the thought clouds: rows of 8, 7, 6 ... coins, bottom row first (v2; a45CoinPile grows a thin column past 20 coins)
function a45Heap(ctx, x, y, n, r = 14) { let k = 0; for (let row = 0; k < n && row < 8; row++) { const m = 8 - row; for (let i = 0; i < m && k < n; i++, k++) a45Coin(ctx, x + (i - (m - 1) / 2) * r * 1.7, y - r - row * r * 1.35, r); } }
// ---------- old clothes ----------
function a45Patch(ctx, x, y, w, h, col) { shape(ctx, K.rectPts(x - w / 2, y - h / 2, w, h), col, { lw: 3, seed: 62 }); ctx.save(); ctx.setLineDash([4, 4]); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.strokeRect(x - w / 2 + 4, y - h / 2 + 4, w - 8, h - 8); ctx.restore(); }
// the holed shirt, centre (x, y), 160 x 150 at s 1. o: {rot, eye: [gx, gy] (an eye seen through the hole), sway}
const A45_HOLE = [14, -6];
function a45Shirt(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const sw = o.sway || 0;
  const pts = [[-30, -72], [-12, -64], [12, -64], [30, -72], [80, -40 + sw * 6], [64, -10 + sw * 8], [44, -24], [46, 72], [-46, 72], [-44, -24], [-64, -10 - sw * 8], [-80, -40 - sw * 6]];
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = A45_GREY; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, A45_GREYD, 9, 0.28); ctx.globalAlpha = 0.5; ctx.fillRect(-90, -80, 180, 160); ctx.restore();
  ink(ctx, pts.concat([pts[0]]), 5, 63);
  a45Patch(ctx, -22, 30, 30, 26, A45_BROWN); a45Patch(ctx, 58, -34, 18, 16, A45_OLIVE);
  seg(ctx, -40, 66, -10, 70, 3, A45_GREYD, 1); // frayed hem
  for (let i = 0; i < 5; i++) seg(ctx, -40 + i * 18, 72, -42 + i * 18, 80 + (i % 2) * 4, 2, A45_GREYD, 1);
  const [hx, hy] = o.hole || A45_HOLE, hk = o.holeK || 1; ctx.fillStyle = '#2b2620'; ctx.beginPath(); ctx.ellipse(hx, hy, 15 * hk, 13 * hk, 0.2, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke();
  if (o.eye) { shape(ctx, ell(hx, hy, 11 * hk, 10 * hk, 14), C.white, { lw: 2.5, seed: 2 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(hx + o.eye[0] * 4 * hk, hy + o.eye[1] * 3 * hk, 4.5 * hk, 0, 7); ctx.fill();
    if (o.eyeLid > 0) { ctx.save(); ctx.beginPath(); ctx.ellipse(hx, hy, 11 * hk, 10 * hk, 0, 0, 7); ctx.clip(); ctx.fillStyle = C.skin; ctx.fillRect(hx - 12 * hk, hy - 11 * hk, 24 * hk, 21 * hk * o.eyeLid); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 12 * hk, hy - 11 * hk + 21 * hk * o.eyeLid); ctx.lineTo(hx + 12 * hk, hy - 11 * hk + 21 * hk * o.eyeLid); ctx.stroke(); ctx.restore(); } }
  ctx.restore(); }
// the drab heap (ground point x, y): robe, trousers, cap, sock and the shirt on top
function a45Rags(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-90, 0], [-80, -30], [-40, -52], [10, -48], [60, -40], [92, -10], [90, 0]], A45_BROWN, { lw: 5, seed: 64, dot: A45_BROWND, pitch: 8, rad: 0.25, da: 0.5 });
  shape(ctx, [[-70, -20], [-60, -62], [-20, -70], [-6, -40], [-30, -18]], A45_OLIVE, { lw: 4.5, seed: 65 });
  shape(ctx, [[20, -40], [40, -76], [80, -60], [74, -30]], '#7a7468', { lw: 4.5, seed: 66 });
  a45Patch(ctx, -50, -36, 20, 18, A45_GREY); a45Patch(ctx, 54, -52, 16, 14, A45_BROWN);
  if (o.sock !== false) shape(ctx, [[64, -6], [96, -12], [104, 0], [70, 2]], A45_GREY, { lw: 3.5, seed: 67 });
  ctx.restore();
  if (o.shirt !== false) a45Shirt(ctx, x - 6 * s, y - 70 * s, s * 0.62, { rot: -0.25 }); }

// ---------- the bundle (clothBundle) ----------
// a45Bundle(ctx, x, y, o): ground point (x, y). o: {s: 1, wrap: 'plain' | 'rich', open: 0..1 (four corners fall one at a time), contents: 'rags' | 'treasure' | 'none',
//   sq, tilt, peek: 0..1 (one corner lifted, a sleeve hanging out), tassel (swing radians), glint: 0..1, t}
function a45ClothFill(ctx, pts, wrap, s) {
  // v2: the pattern covers the cloth's own bounding box (v1 used a fixed box at the origin, so the yellow diamonds never showed)
  const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]), x0 = Math.min(...xs) - 10, y0 = Math.min(...ys) - 10, bw = Math.max(...xs) - x0 + 20, bh = Math.max(...ys) - y0 + 20;
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = wrap === 'rich' ? C.red : A45_GREY; ctx.fill(); ctx.clip();
  if (wrap === 'rich') { ctx.strokeStyle = C.yellow; ctx.lineWidth = 4 * s; const L = bw + bh, st = 34 * s; for (let d = -L; d < L; d += st) { ctx.beginPath(); ctx.moveTo(x0 + d, y0); ctx.lineTo(x0 + d + L, y0 + L); ctx.moveTo(x0 + d + L, y0); ctx.lineTo(x0 + d, y0 + L); ctx.stroke(); }
    ctx.fillStyle = dotPat(ctx, '#a8160f', 8, 0.25); ctx.globalAlpha = 0.45; ctx.fillRect(x0, y0, bw, bh); }
  else { ctx.fillStyle = dotPat(ctx, A45_GREYD, 9, 0.28); ctx.globalAlpha = 0.5; ctx.fillRect(x0, y0, bw, bh); }
  ctx.restore(); ink(ctx, pts.concat([pts[0]]), 5 * s, 68); }
function a45Fringe(ctx, a, b, s) { const n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / (10 * s)));
  for (let i = 0; i <= n; i++) { const x = K.lerp(a[0], b[0], i / n), y = K.lerp(a[1], b[1], i / n); seg(ctx, x, y, x, y + 14 * s, 3 * s, A45_GOLD, 1.2); } }
function a45Bundle(ctx, x, y, o = {}) {
  const s = o.s || 1, wrap = o.wrap || 'plain', op = K.clamp(o.open || 0), t = o.t || 0;
  ctx.save(); ctx.translate(x, y); if (o.tilt) ctx.rotate(o.tilt); const sq = o.sq ?? 1; ctx.scale((1 + (1 - sq) * 0.7), sq); ctx.translate(-x, -y);
  if (op <= 0.001) {
    const W = 78 * s, H = 104 * s;
    const body = [[x - W, y], [x - W * 1.08, y - H * 0.4], [x - W * 0.8, y - H * 0.82], [x - W * 0.25, y - H], [x + W * 0.25, y - H], [x + W * 0.8, y - H * 0.82], [x + W * 1.08, y - H * 0.4], [x + W, y]];
    a45ClothFill(ctx, body, wrap, s);
    if (wrap === 'plain') { a45Patch(ctx, x - 30 * s, y - 40 * s, 26 * s, 22 * s, A45_BROWN); a45Patch(ctx, x + 36 * s, y - 64 * s, 18 * s, 16 * s, A45_OLIVE); }
    else a45Fringe(ctx, [x - W * 1.04, y - H * 0.42], [x + W * 1.04, y - H * 0.42], s);
    // the knot: two ears and a ball
    const kx = x, ky = y - H - 4 * s, ears = wrap === 'rich' ? C.red : A45_GREY;
    shape(ctx, [[kx - 6 * s, ky + 6 * s], [kx - 44 * s, ky - 26 * s], [kx - 30 * s, ky - 34 * s], [kx, ky - 4 * s]], ears, { lw: 4 * s, seed: 69 });
    shape(ctx, [[kx + 6 * s, ky + 6 * s], [kx + 42 * s, ky - 30 * s], [kx + 28 * s, ky - 38 * s], [kx, ky - 4 * s]], ears, { lw: 4 * s, seed: 70 });
    shape(ctx, ell(kx, ky, 14 * s, 11 * s, 14), ears, { lw: 4 * s, seed: 72 });
    if (wrap === 'rich') { seg(ctx, kx - 34 * s, ky + 12 * s, kx + 34 * s, ky + 12 * s, 6 * s, A45_GOLD, 2.5); const a = o.tassel || 0, tx = kx + 26 * s, ty = ky + 14 * s, ex = tx + Math.sin(a) * 40 * s, ey = ty + Math.cos(a) * 40 * s;
      seg(ctx, tx, ty, ex, ey, 3.5 * s, A45_GOLD, 1.5); shape(ctx, [[ex - 7 * s, ey - 4 * s], [ex + 7 * s, ey - 4 * s], [ex + 10 * s, ey + 16 * s], [ex - 10 * s, ey + 16 * s]], A45_GOLD, { lw: 3, seed: 73 }); }
    if (o.peek > 0) { const p = K.clamp(o.peek), cx = x + W * 0.9, cy = y - H * 0.55;
      const sl = [[cx - 6 * s, cy], [cx + 14 * s + 30 * s * p, cy + 6 * s], [cx + 22 * s + 26 * s * p, cy + 70 * s * p + 10 * s], [cx + 2 * s + 26 * s * p, cy + 74 * s * p + 10 * s], [cx - 4 * s, cy + 16 * s]];
      if (p > 0.3 && o.peekSleeve !== false) { const sw = Math.sin(t * 5) * 4 * s * p; a45ClothFill(ctx, sl.map(([a, b], i) => [a + (i > 1 ? sw : 0), b]), 'plain', s); a45Patch(ctx, cx + 14 * s + 26 * s * p, cy + 50 * s * p, 14 * s, 12 * s, A45_BROWN); }
      shape(ctx, [[cx - 24 * s, cy - 20 * s], [cx + 6 * s, cy - 30 * s - 40 * s * p], [cx + 24 * s + 10 * s * p, cy - 10 * s]], wrap === 'rich' ? C.red : A45_GREY, { lw: 4 * s, seed: 74 }); }
  } else {
    // open: the cloth lies flat, contents on it, corners falling one at a time (back, left, right, front)
    const R = 130 * s, c = [0, 1, 2, 3].map((k) => K.ease.inOut(K.clamp(op * 4 - k)));
    const flat = [[x - R, y + 6 * s], [x - R * 0.6, y - 18 * s], [x + R * 0.6, y - 18 * s], [x + R, y + 6 * s], [x + R * 0.7, y + 22 * s], [x - R * 0.7, y + 22 * s]];
    // back flap (behind the contents): stands up then lies back
    const back = [[x - 52 * s, y - 16 * s], [x + 52 * s, y - 16 * s], [x, y - 16 * s - 112 * s * (1 - c[0]) - 14 * s * c[0]]];
    a45ClothFill(ctx, back, wrap, s);
    a45ClothFill(ctx, flat, wrap, s); if (wrap === 'rich') a45Fringe(ctx, flat[5], flat[4], s);
    if (o.contents === 'treasure') { a45CoinPile(ctx, x, y + 4 * s, 12, s * 0.9); star(ctx, x - 30 * s, y - 52 * s, 16 * s, C.blue, 0.3); star(ctx, x + 34 * s, y - 46 * s, 14 * s, C.red); }
    else if (o.contents !== 'none') a45Rags(ctx, x, y + 4 * s, s * 0.95, { shirt: o.shirt !== false });
    const side = (sd, k) => { const a = sd < 0 ? K.lerp(-1.25, -Math.PI + 0.12, k) : K.lerp(-1.89, -0.12, k), bx = x + sd * R * 0.62, by = y - 4 * s, L = 108 * s;
      const tip = [bx + Math.cos(a) * L, by + Math.sin(a) * L], b0 = [bx, by - 24 * s], b1 = [bx, by + 20 * s]; a45ClothFill(ctx, [b0, tip, b1], wrap, s); };
    side(-1, c[1]); side(1, c[2]);
    const fr = [[x - 56 * s, y + 18 * s], [x + 56 * s, y + 18 * s], [x, y + 18 * s - 120 * s * (1 - c[3]) + 34 * s * c[3]]];
    a45ClothFill(ctx, fr, wrap, s);
  }
  if (o.glint > 0) { const g = o.glint; for (let i = 0; i < 3; i++) { const u = K.clamp(g * 3 - i); if (u > 0 && u < 1) star(ctx, x - 60 * s + i * 60 * s, y - 70 * s + (i % 2) * 30 * s, 16 * s * Math.sin(Math.PI * u), C.white, u * 2); } }
  ctx.restore(); }
// a dashed outline where the bundle was
function a45Ghost(ctx, x, y, s, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.setLineDash([12, 10]); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(x, y - 50 * s, 82 * s, 56 * s, 0, 0, 7); ctx.stroke(); ctx.restore(); }

// the rich cloth draped over the crate front, unfurling left to right (u 0..1) with a wave on its edge
function a45RichDrape(ctx, x0, x1, top, h, u, t) { if (u <= 0) return; const s = 1, xe = K.lerp(x0 + 10, x1, u), wv = (1 - u) * 14 * Math.sin(t * 18);
  const pts = [[x0, top], [xe, top + wv * 0.3], [xe + wv, top + h * 0.5], [xe - wv * 0.5, top + h], [x0, top + h]];
  a45ClothFill(ctx, pts, 'rich', s); a45Fringe(ctx, [x0, top + h], [xe - wv * 0.5, top + h], s); }

// ---------- moth: two pale wings and a dot on a seeded zigzag up and away ----------
function a45Moth(ctx, x0, y0, t, t0, dur = 1.6, seed = 1) { const d = t - t0; if (d < 0 || d > dur) return; const u = d / dur, r = K.rng(seed);
  const x = x0 + Math.sin(u * 9 + r() * 6) * 40 * u + (r() - 0.5) * 140 * u, y = y0 - 420 * u + Math.sin(u * 13) * 18, f = Math.abs(Math.sin(t * 2 * Math.PI * 12));
  ctx.save(); ctx.globalAlpha = 1 - K.clamp((u - 0.8) / 0.2);
  for (const sd of [-1, 1]) shape(ctx, [[x, y], [x + sd * 22, y - 16 * f - 4], [x + sd * 18, y + 8]], '#efe6cf', { lw: 3, seed: 75 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(x, y + 2, 4, 8, 0, 0, 7); ctx.fill(); ctx.restore(); }

// ---------- iconBalloon: a round speech/idea balloon holding a drawn icon ----------
function a45Balloon(ctx, cx, cy, w, h, tail, p, inner) { const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return; ctx.save();
  ctx.translate(cx, cy); ctx.scale(k, k); const pts = K.circlePts(0, 0, w / 2, h / 2, 48);
  if (tail) { const tx = (tail[0] - cx) / k, ty = (tail[1] - cy) / k, a = Math.atan2(ty, tx), bx = Math.cos(a) * w * 0.35, by = Math.sin(a) * h * 0.35, nx = -Math.sin(a) * 20, ny = Math.cos(a) * 20;
    shape(ctx, [[bx + nx, by + ny], [tx, ty], [bx - nx, by - ny]], C.white, { lw: 5, seed: 76 }); }
  shape(ctx, pts, C.white, { lw: 7, seed: 77 });
  if (inner) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); inner(ctx); ctx.restore(); }
  ctx.restore(); }
// v2: a red "no" ring with a single diagonal (the icon underneath stays readable)
function a45NoRing(ctx, x, y, r, p) { if (p <= 0) return; const k = K.clamp(p); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * K.clamp(k * 1.5)); ctx.stroke();
  if (k > 0.6) { const u = K.clamp((k - 0.6) / 0.4), a = -Math.PI * 0.75; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.lineTo(x + Math.cos(a) * r * (1 - 2 * u), y + Math.sin(a) * r * (1 - 2 * u)); ctx.stroke(); } ctx.restore(); }
// a grey patched sleeve hanging from (x, y) (top), length L, swing radians
function a45Sleeve(ctx, x, y, L, sw = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(sw); const pts = [[-16, 0], [16, 0], [20, L * 0.6], [18, L], [-18, L], [-20, L * 0.6]];
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = A45_GREY; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, A45_GREYD, 9, 0.28); ctx.globalAlpha = 0.5; ctx.fillRect(-30, -10, 60, L + 20); ctx.restore(); ink(ctx, pts.concat([pts[0]]), 5, 63);
  a45Patch(ctx, 0, L * 0.55, 24, 20, A45_BROWN); seg(ctx, -16, L - 2, 16, L - 2, 3, A45_GREYD, 1); ctx.restore(); }
// a red X over an icon
function a45Cross(ctx, x, y, r, p) { if (p <= 0) return; const k = K.clamp(p); seg(ctx, x - r, y - r, x - r + 2 * r * K.clamp(k * 2), y - r + 2 * r * K.clamp(k * 2), 12, C.red, 3);
  if (k > 0.5) seg(ctx, x + r, y - r, x + r - 2 * r * K.clamp(k * 2 - 1), y - r + 2 * r * K.clamp(k * 2 - 1), 12, C.red, 3); }
// eye icon (for NO PEEKING and NOT CHECKED)
function a45EyeIcon(ctx, x, y, r) { shape(ctx, [[x - r, y], [x - r * 0.5, y - r * 0.55], [x + r * 0.5, y - r * 0.55], [x + r, y], [x + r * 0.5, y + r * 0.55], [x - r * 0.5, y + r * 0.55]], C.white, { lw: 4, seed: 78 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r * 0.3, 0, 7); ctx.fill(); }

// ---------- inset circle: a round cutaway (iris) on a point ----------
function a45Inset(ctx, cx, cy, r, p, inner) { const rr = r * K.ease.out(K.clamp(p)); if (rr < 2) return; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fillStyle = C.paper || '#fbf2da'; ctx.fill(); ctx.clip(); inner(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, rr + 7, 0, 7); ctx.stroke(); ctx.restore(); }

// ---------- noPeekSign: a board on a post; rise 0..1 (swings up), flip 0..1 (blank -> NO PEEKING!) ----------
function a45Sign(ctx, x, y, o = {}) { const rise = K.clamp(o.rise ?? 1); if (rise <= 0) return; const t = o.t || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate((1 - rise) * 1.4 + (o.swing || 0)); ctx.scale(1, K.clamp(0.2 + rise * 0.8));
  seg(ctx, 0, 0, 0, -400, 14, WOOD, 4);
  const f = K.clamp(o.flip || 0), sx = Math.cos(f * Math.PI), front = f > 0.5, bw = 230, bh = 140;
  ctx.save(); ctx.translate(0, -450); ctx.scale(Math.max(0.06, Math.abs(sx)), 1);
  shape(ctx, K.rectPts(-bw / 2, -bh / 2, bw, bh), front ? C.white : '#e6c27a', { lw: 7, seed: 79, dot: front ? null : '#a8741a', pitch: 9, rad: 0.2, da: 0.4 });
  if (front) { a45EyeIcon(ctx, 0, -28, 40); seg(ctx, -44, 2, 44, -58, 9, C.red, 2.5);
    ctx.font = K.font(40, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.strokeText('NO PEEKING!', 0, 40); ctx.fillStyle = C.red; ctx.fillText('NO PEEKING!', 0, 40); }
  ctx.restore(); ctx.restore(); }

// ---------- monkey with a pivot rotation (flips, handstands) and a red fez that lags ----------
// M: Library monkey fields plus rot (radians about the body centre, y - 90 s), fez (true), fezLag (radians), lift (px above y), sq, tip
function a45Monkey(ctx, M) { const s = M.s || 0.7, dir = M.dir ?? 1, py = M.y - (M.lift || 0) - 90 * s;
  ctx.save(); ctx.translate(M.x, py); if (M.rot) ctx.rotate(M.rot); ctx.translate(-M.x, -py);
  if (M.lift) ctx.translate(0, -M.lift);
  const sq = M.sq ?? 1; if (sq !== 1 || M.tip) { ctx.translate(M.x, M.y); if (M.tip) ctx.rotate(M.tip * dir); ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.translate(-M.x, -M.y); }
  const P = { ...M, rot: 0, sq: 1, tip: 0 }; monkey(ctx, P);
  if (M.fez !== false) { ctx.save(); ctx.translate(M.x, M.y); ctx.scale(dir * s, s); ctx.translate(8 + (M.dx || 0), -140 + (M.drop || 0)); ctx.rotate((M.tilt || 0) + (M.fezLag || 0));
    ctx.translate(0, -38 - (M.fezUp || 0)); const fz = [[-22, 4], [22, 4], [16, -30], [-16, -30]]; shape(ctx, fz, C.red, { lw: 4.5, seed: 81 });
    const ta = (M.fezLag || 0) * -2 + 0.3; seg(ctx, 0, -30, 18 + Math.sin(ta) * 6, -18 + Math.cos(ta) * 8, 4, C.yellow, 1.5); ctx.restore(); }
  ctx.restore(); return P; }
// juggling: three figs on phase-shifted arcs above (x, y)
function a45Juggle(ctx, x, y, t, t0, h = 120, w = 50) { for (let i = 0; i < 3; i++) { const ph = ((t - t0) * 1.8 + i / 3) % 1, side = Math.floor((t - t0) * 1.8 + i / 3) % 2 ? 1 : -1;
  fig(ctx, x + side * w * (1 - 2 * ph), y - h * 4 * ph * (1 - ph), 13, ph * 6); } }
// a stool drawn by the scene (people sit on it with seat: 'bench')
function a45Stool(ctx, x, y, s) { seatStool(ctx, x, y, s); }
