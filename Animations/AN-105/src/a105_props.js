// ===== AN-105 The Sharper of Alexandria: story props, effects and small helpers =====
// Every function is a pure function of its arguments (and t). Names carry the a105 / A105_ prefix so they never collide with the engine or Library.
const A105_GREEN = '#3f9d4a', A105_GREEND = '#2b7a38', A105_GOLD = '#e8a800', A105_BROWN = '#8a501a', A105_BROWND = '#5b3010', A105_STEEL = '#b9bfcc', A105_STEELD = '#7d8596';
const A105_LEATHER = '#a8642a', A105_LEATHERD = '#6e3a12', A105_CANE = '#d9a441', A105_WATER = '#3f7be6', A105_STONE = '#d8c8a8', A105_STONED = '#a8946e';

// ---------- timing helpers ----------
const a105In = (t, a, b) => t >= a && t < b;
const a105E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a105Env = (t, a, b, f = 0.2) => (t < a || t >= b ? 0 : K.clamp(Math.min((t - a) / f, (b - t) / f)));
const a105L2 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k)];
const a105B = (t, a, d) => K.clamp((t - a) / d);
// gesture track: [t0, t1, target | fn(t), fade] segments blended over `rest` with eased ramps (the last active one wins)
function a105Tr(t, list, rest, f = 0.2) {
  let out = rest;
  for (const [a, b, tg, ff] of list) { const w = K.ease.inOut(a105Env(t, a, b, ff ?? f)); if (w > 0) { const T = typeof tg === 'function' ? tg(t) : tg; out = out ? a105L2(out, T, w) : T; } }
  return out;
}
// scalar track: [t0, t1, value, fade] blended over rest
function a105V(t, list, rest = 0, f = 0.2) { let v = rest; for (const [a, b, x, ff] of list) { const w = K.ease.inOut(a105Env(t, a, b, ff ?? f)); if (w > 0) v = K.lerp(v, typeof x === 'function' ? x(t) : x, w); } return v; }
const a105Mir = (p) => [-p[0], p[1]];   // a right-hand gesture used by the left hand

// ---------- person frame (the same transform chain as acting() + personCostumed()), so props ride on a body ----------
function a105Age(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function a105M(P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = P.tip || 0, M = new DOMMatrix();
  M.translateSelf(P.x, P.y); if (tip) M.rotateSelf(tip * Math.sign(dir) * 180 / Math.PI); if (sq !== 1) M.scaleSelf(1 + (1 - sq) * 0.7, sq);
  if (P.rot) M.rotateSelf(P.rot * 180 / Math.PI); M.scaleSelf(dir * s, s);
  const hc = personPose(P, -1, 0).hipC; M.translateSelf(hc[0], hc[1] + 75);
  const lean = (P.lean || 0) + a105Age(P) * 0.12; M.translateSelf(0, -75); M.rotateSelf(lean * 180 / Math.PI); M.translateSelf(0, 75);
  return M;
}
const a105HdY = (P) => -195 + (P.drop || 0) + a105Age(P) * 6;
function a105Pt(P, x, y) { const q = a105M(P).transformPoint({ x, y }); return [q.x, q.y]; }
const a105Head = (P) => a105Pt(P, (P.look || 0) * 4, a105HdY(P));
function a105OnBody(ctx, P, fn, head) {
  ctx.save(); const M = a105M(P); ctx.transform(M.a, M.b, M.c, M.d, M.e, M.f);
  if (head) { const hx = (P.look || 0) * 4, hy = a105HdY(P); ctx.translate(hx, hy); ctx.rotate(P.tilt || 0); ctx.translate(-hx, -hy); }
  fn(ctx); ctx.restore();
}
// a hand's world position after drawing (P.hands is body-local in the person's own frame)
function a105Hand(P, i) { if (!P.hands) return null; const h = P.hands[i]; return a105Pt(P, h[0], h[1]); }

// ---------- soldier helmet: steel dome with a point and a neck cloth; o.big = the short guard's helmet that is too big ----------
function a105Helmet(ctx, P, o = {}) {
  a105OnBody(ctx, P, (c) => {
    const hx = (P.look || 0) * 4, hy = a105HdY(P), cloth = o.cloth || C.red;
    c.translate(hx, hy); c.rotate(o.rot || 0); if (o.big) { c.translate(0, 6); c.scale(1.22, 1.22); } c.translate(-hx, -hy - (o.lift || 0));
    shape(c, [[hx - 40, hy - 6], [hx - 44, hy + 30], [hx - 30, hy + 24], [hx - 34, hy - 6]], cloth, { lw: 4, seed: 301 });
    const dome = [...K.circlePts(hx, hy - 24, 40, 34, 22, Math.PI, Math.PI), [hx - 40, hy - 24]];
    shape(c, dome, A105_STEEL, { lw: 5, seed: 302, dot: A105_STEELD, pitch: 7, rad: 0.25, da: 0.5 });
    shape(c, [[hx - 7, hy - 54], [hx, hy - 82], [hx + 7, hy - 54]], A105_STEEL, { lw: 4, seed: 303 });
    shape(c, K.rectPts(hx - 43, hy - 30, 86, 10), C.yellow, { lw: 4, seed: 304 });
  }, true);
}
// an upturned helmet held in the hands (bowl up), centre (x, y)
function a105HelmetBowl(ctx, x, y, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI + rot);
  shape(ctx, [...K.circlePts(0, 0, 40, 34, 22, Math.PI, Math.PI), [-40, 0]], A105_STEEL, { lw: 5, seed: 302, dot: A105_STEELD, pitch: 7, rad: 0.25, da: 0.5 });
  shape(ctx, [[-7, -30], [0, -58], [7, -30]], A105_STEEL, { lw: 4, seed: 303 }); shape(ctx, K.rectPts(-43, -6, 86, 10), C.yellow, { lw: 4, seed: 304 });
  ctx.restore();
}

// ---------- coins, purse, saddlebag ----------
function a105Coin(ctx, x, y, r = 12, sx = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), C.yellow, { lw: Math.max(2.5, r * 0.25), seed: 307 });
  ctx.lineWidth = Math.max(1.5, r * 0.14); ctx.strokeStyle = A105_GOLD; ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.stroke(); ctx.restore();
}
function a105CoinPile(ctx, x, y, n, r = 11) {
  const rr = K.rng(31); for (let i = 0; i < n; i++) { const row = i < 4 ? 0 : i < 7 ? 1 : i < 9 ? 2 : 3, k = row === 0 ? i : row === 1 ? i - 4 : row === 2 ? i - 7 : 0, w = [4, 3, 2, 1][row];
    a105Coin(ctx, x + (k - (w - 1) / 2) * r * 1.7 + (rr() - 0.5) * 3, y - r * 0.55 - row * r * 0.8, r, 0.55 + 0.1 * rr()); }
}
// a stack of coins seen side on: n coins, base (x, y)
function a105Stack(ctx, x, y, n, r = 14) { for (let i = 0; i < n; i++) { shape(ctx, ell(x, y - 4 - i * 7, r, 5, 14), C.yellow, { lw: 3, seed: 360 + (i % 3) }); } }
// THE PURSE: fat red leather purse 70 x 80 at s 1, (x, y) = bottom centre. o: sq (1 rest), rot, glint 0..1, neck (drawstring pull 0..1)
function a105Purse(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const q = o.sq ?? 1; ctx.scale(s * (1 + (1 - q) * 0.8), s * q);
  const body = [[-26, 0], [-36, -18], [-34, -42], [-22, -56], [-10, -60], [-14, -70], [14, -70], [10, -60], [22, -56], [34, -42], [36, -18], [26, 0], [-26, 0]];
  shape(ctx, body, C.red, { lw: 5, seed: 317, dot: '#a8160f', pitch: 7, rad: 0.25, da: 0.5 });
  seg(ctx, -15, -60, 15, -60, 7, C.yellow, 2.5);
  seg(ctx, 4, -60, 14, -46, 4, C.yellow, 1.5); seg(ctx, -2, -60, -10, -44, 4, C.yellow, 1.5);
  ctx.fillStyle = 'rgba(255,250,240,0.7)'; ctx.beginPath(); ctx.ellipse(-16, -36, 6, 11, 0.4, 0, 7); ctx.fill();
  if (o.glint != null) a105Glint(ctx, 18, -48, 22, o.glint);
  ctx.restore();
}
// the soldier's saddlebag 150 x 110 at s 1, (x, y) = top centre (strap attachment). o: bulge 0..1, slit 0..1, flap (0 shut .. 1 open), rot, upside
function a105Bag(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot || 0) + (o.upside ? Math.PI : 0)); ctx.scale(s, s); if (o.upside) ctx.translate(0, -110);
  const b = K.clamp(o.bulge ?? 1), bx = 8 * b;
  const body = [[-70, 6], [-74 - bx, 50], [-68 - bx, 104 + 4 * b], [68 + bx, 104 + 4 * b], [74 + bx, 50], [70, 6], [-70, 6]];
  shape(ctx, body, A105_LEATHER, { lw: 5, seed: 371, dot: A105_LEATHERD, pitch: 9, rad: 0.22, da: 0.45 });
  const sl = K.clamp(o.slit || 0);
  if (sl > 0.01) {   // diagonal cut with a triangular flap hanging down, dark inside
    const a = [-40, 40], z = [40, 92], m = a105L2(a, z, sl);
    shape(ctx, [a, [m[0] + 6 * sl, m[1] - 12 * sl], m, [m[0] - 18 * sl, m[1] + 6 * sl], a], '#1a120c', { lw: 3.5, seed: 372 });
    shape(ctx, [a, m, [K.lerp(a[0], m[0], 0.5) - 10, K.lerp(a[1], m[1], 0.5) + 22 * sl], a], A105_LEATHERD, { lw: 3.5, seed: 373 });
    if (o.purseIn) a105Purse(ctx, m[0] * 0.5 + 4, m[1] * 0.5 + 54, 0.42);
  }
  const fl = K.clamp(o.flap || 0), fh = 52 * (1 - fl);   // flap folds up and back as it opens
  if (fh > 4) { shape(ctx, [[-72, 0], [72, 0], [70, fh], [10, fh + 10], [-10, fh + 10], [-70, fh], [-72, 0]], A105_BROWN, { lw: 5, seed: 374, dot: A105_BROWND, pitch: 8, rad: 0.2, da: 0.4 });
    shape(ctx, K.rectPts(-9, fh - 6, 18, 18), A105_GOLD, { lw: 3, seed: 375 }); }
  else shape(ctx, [[-72, 0], [72, 0], [70, -40 * fl], [-70, -40 * fl], [-72, 0]], A105_BROWN, { lw: 5, seed: 376 });
  ctx.restore();
}
// shoulder strap from a world point to the bag
function a105Strap(ctx, a, b) { seg(ctx, a[0], a[1], b[0], b[1], 9, A105_BROWND, 2.5); }

// ---------- canes ----------
// one cane from its grip (x, y) at angle ang (0 = up), length L, bend (curve, -1..1)
function a105Cane(ctx, x, y, ang, L = 230, bend = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([bend * 70 * u * u, -L * u]); }
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 15; K.poly(ctx, pts, false); ctx.stroke();
  ctx.strokeStyle = A105_CANE; ctx.lineWidth = 7.5; K.poly(ctx, pts, false); ctx.stroke(); ctx.restore();
}
// a tied bundle of canes lying or standing; (x, y) = centre; rot 0 = horizontal; n canes; spread 0..1 (scattered)
function a105Bundle(ctx, x, y, o = {}) {
  const n = o.n ?? 7, sp = o.spread || 0, r = K.rng(18); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  for (let i = 0; i < n; i++) { const dy = (i - (n - 1) / 2) * 7, da = (r() - 0.5) * 0.06 + sp * (r() - 0.5) * 0.9, dx = (r() - 0.5) * 16 + sp * (r() - 0.5) * 120; a105Cane(ctx, -115 + dx, dy + sp * (r() - 0.3) * 30, Math.PI / 2 + da, 230); }
  if (sp < 0.3) for (const bx of [-50, 50]) shape(ctx, K.rectPts(bx - 6, -n * 4 - 4, 12, n * 8 + 8), C.red, { lw: 3, seed: 377 });
  ctx.restore();
}

// ---------- room furniture, signs, landmarks ----------
const A105_TABLE = { x0: 620, x1: 780, top: 852, cx: 700 };
function a105Table(ctx, dy = 0) {
  const T = A105_TABLE; ctx.save(); ctx.translate(0, dy);
  for (const lx of [T.x0 + 18, T.x1 - 18]) seg(ctx, lx, T.top + 14, lx, 905, 12, A105_BROWND, 3.5);
  shape(ctx, K.rectPts(T.x0, T.top, T.x1 - T.x0, 18), '#c98a3a', { lw: 5, seed: 350, dot: A105_BROWN, pitch: 8, rad: 0.2, da: 0.4 });
  ctx.restore();
}
function a105InnSign(ctx, x, y, rot = 0) {
  seg(ctx, x - 70, y - 70, x + 10, y - 70, 7, '#3a3a4a', 3); seg(ctx, x - 70, y - 70, x - 70, y - 40, 7, '#3a3a4a', 3);
  ctx.save(); ctx.translate(x, y - 70); ctx.rotate(rot);
  seg(ctx, -40, 0, -40, 26, 3, '#3a3a4a', 1); seg(ctx, 40, 0, 40, 26, 3, '#3a3a4a', 1);
  shape(ctx, K.rectPts(-62, 26, 124, 72), C.yellow, { lw: 5, seed: 378, dot: C.red, pitch: 9, rad: 0.18, da: 0.35 });
  ctx.font = K.font(46, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('INN', 0, 64);
  ctx.restore();
}
function a105Lighthouse(ctx, x, gy, t, s = 1) {
  ctx.save(); ctx.translate(x, gy); ctx.scale(s, s);
  shape(ctx, [[-34, 0], [-28, -110], [28, -110], [34, 0]], '#e8d8b0', { lw: 5, seed: 379, dot: C.red, pitch: 10, rad: 0.15, da: 0.3 });
  shape(ctx, [[-24, -110], [-20, -190], [20, -190], [24, -110]], '#f3e2b8', { lw: 5, seed: 380, dot: C.red, pitch: 10, rad: 0.15, da: 0.3 });
  shape(ctx, [[-15, -190], [-13, -236], [13, -236], [15, -190]], '#e8d8b0', { lw: 4.5, seed: 381 });
  const on = (t % 1.2) < 0.6 ? 1 : 0.35;
  ctx.save(); ctx.globalAlpha = on; shape(ctx, ell(0, -250, 16, 14, 14), C.yellow, { lw: 4, seed: 382 }); ctx.restore();
  if (on === 1) for (const sd of [-1, 1]) seg(ctx, sd * 24, -252, sd * 60, -260, 5, C.yellow, 2);
  ctx.restore();
}
// balance scale (money changer), base (x, y); tilt -1..1
function a105Scale(ctx, x, y, s = 1, tilt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  seg(ctx, 0, 0, 0, -110, 7, A105_BROWN, 3); shape(ctx, K.rectPts(-26, -8, 52, 10), A105_BROWN, { lw: 3.5, seed: 383 });
  ctx.save(); ctx.translate(0, -110); ctx.rotate(tilt * 0.25); seg(ctx, -70, 0, 70, 0, 6, A105_GOLD, 2.5);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 66, 0); ctx.rotate(-tilt * 0.25); seg(ctx, -16, 50, 0, 0, 2, C.black, 0); seg(ctx, 16, 50, 0, 0, 2, C.black, 0);
    shape(ctx, [[-26, 50], [26, 50], [16, 62], [-16, 62], [-26, 50]], A105_GOLD, { lw: 3.5, seed: 384 }); ctx.restore(); }
  ctx.restore(); ctx.restore();
}
// padlock (centre x, y), open 0..1 (shackle springs up)
function a105Padlock(ctx, x, y, s = 1, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.translate(14 * open, -22 * open); ctx.rotate(0.4 * open); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -14, 22, Math.PI, 0); ctx.lineTo(22, 0); ctx.moveTo(-22, -14); ctx.lineTo(-22, 0); ctx.stroke();
  ctx.lineWidth = 8; ctx.strokeStyle = A105_STEEL; ctx.stroke(); ctx.restore();
  shape(ctx, K.rectPts(-32, -6, 64, 52), A105_GOLD, { lw: 5, seed: 385, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(0, 14, 6, 0, 7); ctx.fill(); ctx.fillRect(-3, 14, 6, 14); ctx.restore();
}
function a105Chain(ctx, pts, s = 1) { for (let i = 0; i < pts.length; i++) { const p = pts[i]; ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(i % 2 ? 0 : Math.PI / 2); shape(ctx, ell(0, 0, 12 * s, 7 * s, 12), A105_STEEL, { lw: 3.5, seed: 386 }); ctx.restore(); } }

// ---------- hourglass, moth, glint, sweat, ticks ----------
function a105Hourglass(ctx, x, y, level, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.s || 1, o.s || 1);
  shape(ctx, [[-28, -46], [28, -46], [4, -4], [-4, -4], [-28, -46]], '#fffaf0', { lw: 4, seed: 324 }); shape(ctx, [[-4, 4], [4, 4], [28, 46], [-28, 46], [-4, 4]], '#fffaf0', { lw: 4, seed: 325 });
  const L = K.clamp(level); if (L > 0.005) { const h = 40 * Math.sqrt(L), w = 24 * Math.sqrt(L); shape(ctx, [[-w, -4 - h], [w, -4 - h], [3, -5], [-3, -5], [-w, -4 - h]], C.yellow, { lw: 2.5, seed: 326, dot: C.red, pitch: 5, rad: 0.25, da: 0.5 }); }
  const B = 1 - L, bh = 34 * Math.sqrt(B); if (B > 0.01) shape(ctx, [[-26, 44], [26, 44], [0, 44 - bh], [-26, 44]], C.yellow, { lw: 2.5, seed: 327, dot: C.red, pitch: 5, rad: 0.25, da: 0.5 });
  if (o.run && L > 0.01) { ctx.fillStyle = C.yellow; ctx.fillRect(-1.5, -4, 3, 46 - bh); }
  shape(ctx, K.rectPts(-36, -58, 72, 12), A105_BROWN, { lw: 4, seed: 328 }); shape(ctx, K.rectPts(-36, 46, 72, 12), A105_BROWN, { lw: 4, seed: 329 });
  for (const sd of [-1, 1]) seg(ctx, sd * 33, -46, sd * 33, 46, 6, A105_BROWN, 2.5);
  ctx.restore();
}
function a105Moth(ctx, x, y, t, s = 1) {
  const f = Math.abs(Math.sin(t * 26)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 22, -10 - 10 * f], [sd * 18, 8], [0, 0]], '#c9bfa6', { lw: 3, seed: 342, dot: '#8c8a94', pitch: 5, rad: 0.25, da: 0.5 });
  seg(ctx, 0, -6, 0, 10, 6, '#5a5a6a', 2); ctx.restore();
}
function a105Glint(ctx, x, y, r, p) {
  if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p) * r; ctx.save(); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y - k); ctx.lineTo(x + k * 0.22, y - k * 0.22); ctx.lineTo(x + k, y); ctx.lineTo(x + k * 0.22, y + k * 0.22); ctx.lineTo(x, y + k); ctx.lineTo(x - k * 0.22, y + k * 0.22); ctx.lineTo(x - k, y); ctx.lineTo(x - k * 0.22, y - k * 0.22); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function a105Sweat(ctx, x, y, p) { if (p <= 0 || p >= 1) return; const yy = y + 34 * p; ctx.save(); ctx.globalAlpha = Math.min(1, (1 - p) * 3); shape(ctx, [[x, yy - 14], [x + 8, yy], [x, yy + 7], [x - 8, yy], [x, yy - 14]], '#9cc4ff', { lw: 3, seed: 343 }); ctx.restore(); }
// green tick (p draws it on), centre (x, y)
function a105Tick(ctx, x, y, s, p) { if (p <= 0) return; const pts = [[-26, 4], [-6, 26], [30, -24]], q = K.trim(pts, K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = C.black; K.poly(ctx, q, false); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = A105_GREEN; K.poly(ctx, q, false); ctx.stroke(); ctx.restore(); }
// red X in two strokes (p 0..1)
function a105Cross(ctx, x, y, r, p) { ctx.save(); ctx.lineCap = 'round'; for (const [k, a, b] of [[0, [-r, -r], [r, r]], [1, [r, -r], [-r, r]]]) { const f = K.clamp(p * 2 - k); if (f <= 0) continue; const e = a105L2(a, b, f); ctx.lineWidth = 22; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + a[0], y + a[1]); ctx.lineTo(x + e[0], y + e[1]); ctx.stroke(); ctx.lineWidth = 12; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); }

// ---------- expressions on a person: coin eyes, flush, sweat drop (drawn after the figure, in its head frame) ----------
function a105CoinEyes(ctx, P, k) {
  if (k <= 0.01) return; a105OnBody(ctx, P, (c) => { const hx = (P.look || 0) * 4, hy = a105HdY(P) - 4; for (const sd of [-1, 1]) { c.save(); c.translate(hx + sd * 13, hy); c.scale(k, k); a105Coin(c, 0, 0, 12, 1); c.restore(); } }, true);
}
function a105Flush(ctx, P, k, t) {
  if (k <= 0.01) return; a105OnBody(ctx, P, (c) => { const hx = (P.look || 0) * 4, hy = a105HdY(P); c.save(); c.beginPath(); c.ellipse(hx, hy, 35, 36, 0, 0, 7); c.clip();
    c.globalAlpha = 0.75; c.fillStyle = dotPat(c, C.red, 6, 0.42); c.fillRect(hx - 40, hy + 40 - 80 * k, 80, 80 * k); c.restore(); }, true);
}

// ---------- balloons (view units) ----------
function a105Balloon(ctx, cx, cy, w, h, tail, p, inner, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.02) return;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = K.circlePts(0, 0, w / 2, h / 2, 48), tx = tail ? tail[0] - cx : 0, ty = tail ? tail[1] - cy : 0, ta = Math.atan2(ty, tx);
  const tl = tail ? [[Math.cos(ta - 0.32) * w * 0.36, Math.sin(ta - 0.32) * h * 0.36], [tx * 0.62 / k, ty * 0.62 / k], [Math.cos(ta + 0.32) * w * 0.36, Math.sin(ta + 0.32) * h * 0.36]] : null;
  ctx.fillStyle = o.fill || C.white;
  if (tl) { ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.closePath(); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.stroke(); }
  ctx.lineWidth = 14; ctx.strokeStyle = C.black; K.poly(ctx, pts, true); ctx.stroke(); ctx.fillStyle = o.fill || C.white; K.poly(ctx, pts, true); ctx.fill();
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); inner(ctx); ctx.restore();
  ctx.restore();
}
// a small head icon (the soldier or the sharper) at (x, y), scale s
function a105HeadIcon(ctx, look, x, y, s, o = {}) { const P = { ...look, x: 0, y: 0, s: 1, ...o }; const hy = -195 + a105Age(P) * 6; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, -hy); person(ctx, P); if (P.helm) a105Helmet(ctx, P, { cloth: P.helmCloth }); ctx.restore(); }

// ---------- water: pool basin, splash, wet footprints ----------
// pool sunk in the ground: rim x0..x1, water line y; part 'back' (water + far rim) or 'front' (near rim)
function a105Pool(ctx, x0, x1, part, t, o = {}) {
  const y = 905;
  if (part === 'back') {
    shape(ctx, [[x0, y - 6], [x1, y - 6], [x1 - 10, y + 40], [x0 + 10, y + 40], [x0, y - 6]], A105_WATER, { lw: 5, seed: 387, dot: C.white, pitch: 10, rad: 0.18, da: 0.3 });
    ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; for (let i = 0; i < 2; i++) { const xx = x0 + 70 + i * 160 + 14 * Math.sin(t * 1.3 + i); ctx.beginPath(); ctx.moveTo(xx, y + 14 + i * 10); ctx.lineTo(xx + 60, y + 14 + i * 10); ctx.stroke(); } ctx.restore();
    for (let bx = x0 - 6; bx < x1; bx += 46) shape(ctx, K.rectPts(bx, y - 30, 44, 24), A105_STONE, { lw: 4, seed: 388 + ((bx / 46) | 0) % 3, dot: A105_STONED, pitch: 8, rad: 0.18, da: 0.35 });
  } else {
    shape(ctx, K.rectPts(x0 - 20, y + 30, x1 - x0 + 40, 26), A105_STONE, { lw: 5, seed: 391, dot: A105_STONED, pitch: 8, rad: 0.18, da: 0.35 });
    for (const sx of [x0 - 20, x1 - 4]) shape(ctx, K.rectPts(sx, y - 30, 24, 86), A105_STONE, { lw: 4, seed: 392, dot: A105_STONED, pitch: 8, rad: 0.18, da: 0.35 });
  }
}
// crown of drops and rings at (x, y), d = time since the hit
function a105Splash(ctx, x, y, d, s = 1) {
  if (d < 0 || d > 1.4) return; const r = K.rng(77);
  for (let i = 0; i < 12; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 11), v = 260 + r() * 160, px = x + Math.cos(a) * v * d * s, py = y + (Math.sin(a) * v * d + 520 * d * d) * s; if (py > y + 10) continue;
    shape(ctx, ell(px, py, 9 * s, 12 * s, 10), '#9cc4ff', { lw: 3, seed: 393 }); }
  if (d < 0.5) { const k = d / 0.5; shape(ctx, [[x - 70 * s, y], [x - 50 * s, y - 90 * s * Math.sin(Math.PI * k)], [x - 20 * s, y - 40 * s], [x, y - 120 * s * Math.sin(Math.PI * k)], [x + 20 * s, y - 40 * s], [x + 50 * s, y - 90 * s * Math.sin(Math.PI * k)], [x + 70 * s, y]], '#9cc4ff', { lw: 4, seed: 394, dot: C.white, pitch: 8, rad: 0.2, da: 0.3 }); }
  for (let k = 0; k < 2; k++) { const dd = d - k * 0.25; if (dd < 0) continue; ctx.save(); ctx.globalAlpha = K.clamp(1 - dd / 1.1); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.ellipse(x, y + 10, 40 + 160 * dd, 10 + 30 * dd, 0, 0, 7); ctx.stroke(); ctx.restore(); }
}
// wet footprints: list of [x, y, t0]; they fade over `fade` seconds
function a105Prints(ctx, list, t, fade = 30) { ctx.save(); for (const [x, y, t0] of list) { if (t < t0) continue; const a = 0.75 * K.clamp(1 - (t - t0) / fade); if (a <= 0) continue; ctx.globalAlpha = a; ctx.fillStyle = '#2a5bb0'; ctx.beginPath(); ctx.ellipse(x, y, 13, 5, 0, 0, 7); ctx.fill(); } ctx.restore(); }

// ---------- lanes yard (new set, world 1600 x 1230, ground y 900) ----------
const A105_LANES = [[120, 260], [330, 470], [540, 680]], A105_POOL = [760, 1140], A105_YDOOR = [1380, 1560, 600];
function a105LanesYard(ctx, o = {}) {
  const t = o.t || 0, u = o.u ?? 0.3, camX = o.camX || 0, GR = 900;
  skyCycle(ctx, u, { w: 1600, t, sun: false, moon: false, stars: true, hills: false });
  // far skyline with domes and the lighthouse (parallax 0.5)
  ctx.save(); ctx.translate(camX * 0.5, 0);
  bakeDraw(ctx, 'a105far', 1700, 1230, (c) => { for (let i = 0; i < 9; i++) { const x = -60 + i * 200, h = 140 + ((i * 37) % 70); shape(c, K.rectPts(x, 560 - h, 170, h + 40), ['#e8c690', '#f2d27a', '#e8b25a'][i % 3], { lw: 4, seed: 400 + i, dot: C.red, pitch: 12, rad: 0.12, da: 0.25 }); if (i % 3 === 1) shape(c, ell(x + 85, 560 - h, 50, 46, 20), C.yellow, { lw: 4, seed: 410 + i, dot: C.red, pitch: 9, rad: 0.18, da: 0.3 }); } });
  a105Lighthouse(ctx, 1240, 540, t, 0.9);
  ctx.restore();
  const night = dayCycle(u).night; if (night > 0.02) townDim(ctx, -10, 0, 1620, 1230, night * 0.8);
  // left wall with three lane mouths, flat roof at y 560
  bakeDraw(ctx, 'a105lanes', 1600, 1230, (c) => {
    shape(c, [[700, 690], [1300, 690], [1300, GR + 4], [700, GR + 4]], '#e8d0a0', { lw: 6, seed: 426, dot: C.red, pitch: 12, rad: 0.12, da: 0.25 });
    shape(c, K.rectPts(696, 680, 608, 18), '#d8b880', { lw: 5, seed: 427 });
    shape(c, [[-10, 560], [730, 560], [730, GR + 4], [-10, GR + 4]], '#f3e2b8', { lw: 7, seed: 420, dot: C.red, pitch: 12, rad: 0.15, da: 0.3 });
    shape(c, K.rectPts(-14, 546, 748, 20), '#e2c68a', { lw: 5, seed: 421 });
    for (const [x0, x1] of A105_LANES) { const pts = townArchPts(x0, x1, 640, GR, 'pointed'); shape(c, pts, '#2a2236', { lw: 6, seed: 422 }); c.save(); K.poly(c, pts, true); c.clip(); c.fillStyle = '#f2d27a'; c.fillRect((x0 + x1) / 2 - 8, 700, 16, 200); c.fillStyle = '#4a3a56'; c.fillRect(x0, 860, x1 - x0, 50); c.restore(); }
    // ground
    shape(c, [[-10, GR], [1610, GR], [1610, 1240], [-10, 1240]], '#e8c690', { lw: 6, seed: 423, dot: C.red, pitch: 12, rad: 0.15, da: 0.3 });
    // the hall's outer wall with its door at the right
    shape(c, [[1290, 470], [1610, 470], [1610, GR + 4], [1290, GR + 4]], '#d6d2e0', { lw: 7, seed: 424, dot: C.blue, pitch: 12, rad: 0.15, da: 0.3 });
    shape(c, K.rectPts(1284, 456, 330, 22), '#b9c2d6', { lw: 5, seed: 425 });
  });
  townDoor(ctx, A105_YDOOR[0], A105_YDOOR[1], A105_YDOOR[2], GR, 1, { arch: 'pointed', inside: (c) => { c.fillStyle = '#2a3a8a'; c.fillRect(1370, 590, 200, 320); } });
  // laundry line above the lanes: cloths flap when `shake` passes (o.wave = position 0..1 of a travelling disturbance, o.wk strength)
  const ly = 470; seg(ctx, 40, ly - 120, 40, 560, 8, A105_BROWN, 3); seg(ctx, 700, ly - 120, 700, 560, 8, A105_BROWN, 3);
  ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(40, ly - 110); ctx.quadraticCurveTo(370, ly - 70, 700, ly - 110); ctx.stroke();
  const cols = [C.red, C.white, C.yellow, C.blue, A105_GREEN];
  for (let i = 0; i < 5; i++) { const x = 110 + i * 125, f = (x - 40) / 660, yy = ly - 110 + 160 * f * (1 - f) * 0.25 * 4 * 0.25 + 30 * Math.sin(Math.PI * f) * 0.5, k = o.wk ? o.wk * Math.exp(-Math.pow((f - (o.wave || 0)) * 6, 2)) : 0, flap = k * Math.sin(t * 30 + i), sw = 0.05 * Math.sin(t * 2 + i) + 0.4 * flap;
    ctx.save(); ctx.translate(x, yy); ctx.rotate(sw); shape(ctx, [[-30, 0], [30, 0], [26 + 8 * flap, 70], [-28 + 8 * flap, 66], [-30, 0]], cols[i], { lw: 4, seed: 430 + i }); ctx.restore(); }
}
// bake helper for fixed set pieces (drawn at the world origin)
function bakeDraw(ctx, key, w, h, draw) { ctx.drawImage(bake(key, w, h, draw), 0, 0, w, h); }
function a105LanesFront(ctx) { /* the left wall's jambs are part of the back pass; the pool's near rim is the only front piece */ a105Pool(ctx, A105_POOL[0], A105_POOL[1], 'front', 0); }

// ---------- dream wash (panel view units): blue dotted corners + ribbon ----------
function a105Dream(ctx, k, t, ribbon) {
  if (k <= 0.01) return; ctx.save();
  const g = (x, y) => { ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = dotPat(ctx, '#3f7be6', 12, 0.38); ctx.beginPath(); ctx.ellipse(x, y, 520 * k, 420 * k, 0, 0, 7); ctx.fill(); ctx.restore(); };
  ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.ellipse(500, 615, 560 + 600 * (1 - k), 700 + 600 * (1 - k), 0, 0, 7); ctx.clip('evenodd');
  ctx.fillStyle = 'rgba(29,91,208,0.55)'; ctx.fillRect(0, 0, 1000, 1230); ctx.fillStyle = dotPat(ctx, C.white, 14, 0.28); ctx.fillRect(0, 0, 1000, 1230);
  ctx.restore(); void g;
  if (ribbon > 0) { ctx.save(); ctx.globalAlpha = ribbon; S0.label(ctx, 'HIS STORY', 160, 110, 1, { size: 40, fill: C.blue, color: C.white, tilt: -0.06 }); ctx.restore(); }
}
