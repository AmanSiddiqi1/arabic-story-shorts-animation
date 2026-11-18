// ===== AN-097 Yahya the Barmecide and Mansur: story props, effects and small helpers =====
// Every function is a pure function of its arguments (and t). Names carry the a97 / A97_ prefix so they never collide with the engine or Library.
const A97_GREEN = '#3f9d4a', A97_GREEND = '#2b7a38', A97_GOLD = '#e8a800', A97_BROWN = '#8a501a', A97_BROWND = '#5b3010', A97_STEEL = '#b9bfcc', A97_STEELD = '#7d8596';
const A97_JEWEL = '#e2231a', A97_JEWELD = '#9c120c';

// ---------- timing helpers ----------
const a97In = (t, a, b) => t >= a && t < b;
const a97E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a97Env = (t, a, b, f = 0.2) => (t < a || t >= b ? 0 : K.clamp(Math.min((t - a) / f, (b - t) / f)));
const a97L2 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k)];
const a97B = (t, a, d) => K.clamp((t - a) / d);
// gesture track: [t0, t1, target | fn(t), fade] segments blended over `rest` with eased ramps (the last active one wins)
function a97Tr(t, list, rest, f = 0.22) {
  let out = rest;
  for (const [a, b, tg, ff] of list) { const w = K.ease.inOut(a97Env(t, a, b, ff ?? f)); if (w > 0) { const T = typeof tg === 'function' ? tg(t) : tg; out = a97L2(out, T, w); } }
  return out;
}
const A97_REST = { L: [-25, -58], R: [37, -58] };

// ---------- person frame: the same transform chain as acting() + personCostumed(), so props can ride on a body ----------
// a97M(P): DOMMatrix from the upper-body frame (hips -75, shoulders -150, head at (look*4, hdY)) to world units
function a97Age(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function a97M(P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = P.tip || 0, M = new DOMMatrix();
  M.translateSelf(P.x, P.y); if (tip) M.rotateSelf(tip * Math.sign(dir) * 180 / Math.PI); if (sq !== 1) M.scaleSelf(1 + (1 - sq) * 0.7, sq);
  if (P.rot) M.rotateSelf(P.rot * 180 / Math.PI); M.scaleSelf(dir * s, s);
  const hc = personPose(P, -1, 0).hipC; M.translateSelf(hc[0], hc[1] + 75);
  const lean = (P.lean || 0) + a97Age(P) * 0.12; M.translateSelf(0, -75); M.rotateSelf(lean * 180 / Math.PI); M.translateSelf(0, 75);
  return M;
}
const a97HdY = (P) => -195 + (P.drop || 0) + a97Age(P) * 6;
function a97Pt(P, x, y) { const q = a97M(P).transformPoint({ x, y }); return [q.x, q.y]; }
const a97Head = (P) => a97Pt(P, (P.look || 0) * 4, a97HdY(P));
// draw fn(ctx) inside the body frame (head: true adds the head tilt about the head centre)
function a97OnBody(ctx, P, fn, head) {
  ctx.save(); const M = a97M(P); ctx.transform(M.a, M.b, M.c, M.d, M.e, M.f);
  if (head) { const hx = (P.look || 0) * 4, hy = a97HdY(P); ctx.translate(hx, hy); ctx.rotate(P.tilt || 0); ctx.translate(-hx, -hy); }
  fn(ctx); ctx.restore();
}
// v2: a wide smile drawn under a moustache (the engine smile hides under it); k 0..1 opens the curve, col for dark beards
function a97Smile(ctx, P, k = 1, col = C.black) {
  if (k <= 0.02) return; a97OnBody(ctx, P, (c) => { const hx = (P.look || 0) * 4, hy = a97HdY(P) + 27; c.save(); c.lineCap = 'round'; c.strokeStyle = col; c.lineWidth = 6;
    c.beginPath(); c.moveTo(hx - 17, hy - 5 * k); c.quadraticCurveTo(hx, hy + 11 * k, hx + 17, hy - 5 * k); c.stroke(); c.restore(); }, true);
}
// soldier helmet (Salih): steel dome with a point and a red neck cloth; brim sits above the brows so they can act
function a97Helmet(ctx, P) {
  a97OnBody(ctx, P, (c) => {
    const hx = (P.look || 0) * 4, hy = a97HdY(P);
    shape(c, [[hx - 40, hy - 6], [hx - 44, hy + 30], [hx - 30, hy + 24], [hx - 34, hy - 6]], C.red, { lw: 4, seed: 301 });
    const dome = [...K.circlePts(hx, hy - 24, 40, 34, 22, Math.PI, Math.PI), [hx - 40, hy - 24]];
    shape(c, dome, A97_STEEL, { lw: 5, seed: 302, dot: A97_STEELD, pitch: 7, rad: 0.25, da: 0.5 });
    shape(c, [[hx - 7, hy - 54], [hx, hy - 82], [hx + 7, hy - 54]], A97_STEEL, { lw: 4, seed: 303 });
    shape(c, K.rectPts(hx - 43, hy - 30, 86, 10), C.yellow, { lw: 4, seed: 304 });
  }, true);
}
// spear held at a body-local hand point (upright in the body frame, tilt `rot`); hand redrawn over the shaft
function a97Spear(ctx, P, hand, rot = 0, o = {}) {
  a97OnBody(ctx, P, (c) => {
    c.save(); c.translate(hand[0], hand[1]); c.rotate(rot);
    const lo = o.lo ?? 120, hi = o.hi ?? 210;
    seg(c, 0, lo, 0, -hi, 8, A97_BROWN, 3);
    shape(c, [[0, -hi - 50], [11, -hi - 16], [0, -hi], [-11, -hi - 16], [0, -hi - 50]], A97_STEEL, { lw: 3.5, seed: 305 });
    seg(c, 0, -hi + 2, 6 + (o.tassel || 0) * 8, -hi + 28, 8, C.red, 2);
    shape(c, ell(0, 0, 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 });
    c.restore();
  });
}
// a free spear (leaning on a wall / planted), butt at (x, y)
function a97SpearFree(ctx, x, y, rot = 0, h = 300) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); seg(ctx, 0, 0, 0, -h, 8, A97_BROWN, 3);
  shape(ctx, [[0, -h - 50], [11, -h - 16], [0, -h], [-11, -h - 16], [0, -h - 50]], A97_STEEL, { lw: 3.5, seed: 305 }); seg(ctx, 0, -h + 2, 6, -h + 28, 8, C.red, 2); ctx.restore();
}

// ---------- coins, piles, chests, sacks ----------
function a97Coin(ctx, x, y, r = 12, sx = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), C.yellow, { lw: Math.max(2.5, r * 0.25), seed: 307 });
  ctx.lineWidth = Math.max(1.5, r * 0.14); ctx.strokeStyle = A97_GOLD; ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.stroke(); ctx.restore();
}
// a small heap of n coins, base centre (x, y)
function a97CoinPile(ctx, x, y, n, r = 11) {
  const rr = K.rng(31); for (let i = 0; i < n; i++) { const row = i < 4 ? 0 : i < 7 ? 1 : i < 9 ? 2 : 3, k = row === 0 ? i : row === 1 ? i - 4 : row === 2 ? i - 7 : 0, w = [4, 3, 2, 1][row];
    a97Coin(ctx, x + (k - (w - 1) / 2) * r * 1.7 + (rr() - 0.5) * 3, y - r * 0.55 - row * r * 0.8, r, 0.55 + 0.1 * rr()); }
}
// heaped mound of gold (fill 0..1), base centre (x, y), half width w
function a97Mound(ctx, x, y, w, h) {
  if (h < 2) return; const pts = [[x - w, y]];
  for (let i = 1; i < 12; i++) { const a = i / 12; pts.push([x - w + 2 * w * a, y - h * Math.pow(Math.sin(Math.PI * a), 0.7) - (i % 2 ? 4 : 0)]); }
  pts.push([x + w, y], [x - w, y]); shape(ctx, pts, C.yellow, { lw: 4.5, seed: 308, dot: C.red, pitch: 8, rad: 0.24, da: 0.55 });
  const r = K.rng(9); for (let i = 0; i < 9; i++) { const a = 0.12 + 0.76 * r(); a97Coin(ctx, x - w + 2 * w * a, y - h * Math.pow(Math.sin(Math.PI * a), 0.7) * (0.3 + 0.6 * r()), 9 + 2 * r(), 0.5 + 0.5 * r()); }
}
// chest 200 x 130 at s 1, (x, y) = bottom centre. o: open 0..1, heap 0..1 (gold above the rim), band colour, n (coins inside when nearly empty), moth fn
function a97Chest(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.sqx || 1), s * (o.sqy || 1));
  const op = K.clamp(o.open || 0), band = o.band || C.yellow, wood = o.wood || A97_BROWN;
  // open lid stands up behind the box
  if (op >= 0.02) { const top = -124, back = top - 84 * op; shape(ctx, [[-104, top], [-100, back], [100, back], [104, top], [-104, top]], wood, { lw: 5, seed: 313, dot: A97_BROWND, pitch: 9, rad: 0.2, da: 0.45 });
    for (const bx of [-70, 70]) shape(ctx, [[bx - 10, top], [bx - 9, back], [bx + 9, back], [bx + 10, top], [bx - 10, top]], band, { lw: 3, seed: 314 }); }
  shape(ctx, K.rectPts(-100, -120, 200, 120), wood, { lw: 6, seed: 310, dot: A97_BROWND, pitch: 9, rad: 0.2, da: 0.45 });
  for (const bx of [-70, 70]) shape(ctx, K.rectPts(bx - 10, -120, 20, 120), band, { lw: 3.5, seed: 311 });
  shape(ctx, K.rectPts(-14, -96, 28, 26), A97_GOLD, { lw: 3.5, seed: 312 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(0, -85, 4, 0, 7); ctx.fill();
  if (op >= 0.02) { shape(ctx, [[-96, -120], [-88, -136], [88, -136], [96, -120], [-96, -120]], '#2a1a0c', { lw: 4, seed: 309 });
    if (o.heap) a97Mound(ctx, 0, -124, 92, 64 * o.heap * op);
    if (o.n) a97CoinPile(ctx, 50, -122, o.n, 9); }
  else { shape(ctx, [[-104, -120], [-104, -142], [-80, -156], [80, -156], [104, -142], [104, -120], [-104, -120]], wood, { lw: 6, seed: 313, dot: A97_BROWND, pitch: 9, rad: 0.2, da: 0.45 });
    for (const bx of [-70, 70]) shape(ctx, [[bx - 10, -120], [bx - 10, -152], [bx + 10, -152], [bx + 10, -120], [bx - 10, -120]], band, { lw: 3, seed: 314 }); }
  ctx.restore();
}
// coin sack 150 x 170 at s 1, (x, y) = bottom centre; o.sq squash (1 = rest), o.rot
function a97Sack(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const q = o.sq ?? 1; ctx.scale(s * (1 + (1 - q) * 0.8), s * q);
  const pts = [[-62, 0], [-76, -50], [-66, -110], [-34, -142], [-20, -150], [-30, -172], [30, -172], [20, -150], [34, -142], [66, -110], [76, -50], [62, 0], [-62, 0]];
  shape(ctx, pts, '#d9a441', { lw: 5, seed: 315, dot: '#8a5a1a', pitch: 8, rad: 0.22, da: 0.45 });
  seg(ctx, -24, -150, 24, -150, 8, C.red, 2.5);
  shape(ctx, ell(0, -70, 32, 32, 18), C.yellow, { lw: 4, seed: 316 });
  ctx.font = K.font(40, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('D', 0, -66);
  ctx.restore();
}
// a small purse (gift), (x, y) = bottom centre
function a97Purse(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-20, 0], [-26, -18], [-16, -36], [-8, -40], [-12, -50], [12, -50], [8, -40], [16, -36], [26, -18], [20, 0], [-20, 0]], C.red, { lw: 4, seed: 317, dot: '#a8160f', pitch: 6, rad: 0.25, da: 0.5 });
  seg(ctx, -10, -41, 10, -41, 5, C.yellow, 2); ctx.restore();
}
function a97Loaf(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, 0, 28, 14, 18), '#d9903a', { lw: 4, seed: 318, dot: A97_BROWND, pitch: 6, rad: 0.2, da: 0.4 }); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (const dx of [-10, 4]) { ctx.beginPath(); ctx.moveTo(dx, -8); ctx.lineTo(dx + 8, 4); ctx.stroke(); } ctx.restore(); }

// ---------- the jewel and its casket (the story's key prop: always the same shape and colour) ----------
function a97Jewel(ctx, x, y, r = 24, glint = -1) {
  const hex = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; hex.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.86]); } hex.push(hex[0]);
  shape(ctx, hex, A97_JEWEL, { lw: Math.max(3, r * 0.16), seed: 319, dot: A97_JEWELD, pitch: Math.max(4, r * 0.3), rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineWidth = Math.max(1.5, r * 0.07); ctx.strokeStyle = C.black; const ir = r * 0.45;
  const inn = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; inn.push([x + Math.cos(a) * ir, y + Math.sin(a) * ir * 0.86]); }
  K.poly(ctx, inn, true); ctx.stroke(); for (let i = 0; i < 6; i += 1) if (i !== 4) { ctx.beginPath(); ctx.moveTo(inn[i][0], inn[i][1]); ctx.lineTo(hex[i][0], hex[i][1]); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,250,240,0.85)'; ctx.beginPath(); ctx.ellipse(x - r * 0.3, y - r * 0.32, r * 0.16, r * 0.09, -0.6, 0, 7); ctx.fill();
  if (glint >= 0 && glint <= 1) { ctx.save(); K.poly(ctx, hex, true); ctx.clip(); ctx.globalAlpha = 0.85; ctx.fillStyle = C.white; const gx = x - r * 1.2 + 2.4 * r * glint; ctx.beginPath(); ctx.moveTo(gx - r * 0.2, y - r); ctx.lineTo(gx + r * 0.05, y - r); ctx.lineTo(gx - r * 0.25, y + r); ctx.lineTo(gx - r * 0.5, y + r); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore();
}
// glow: dotted yellow halo + rays, strength k (0..1)
function a97Glow(ctx, x, y, r, k, t = 0) {
  if (k <= 0.01) return; ctx.save(); ctx.globalAlpha = 0.55 * k; ctx.fillStyle = dotPat(ctx, C.yellow, 9, 0.45); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.globalAlpha = 0.9 * k; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.4, r0 = r * 0.55, r1 = r * (0.9 + 0.12 * Math.sin(t * 5 + i)); seg(ctx, x + Math.cos(a) * r0, y + Math.sin(a) * r0, x + Math.cos(a) * r1, y + Math.sin(a) * r1, Math.max(4, r * 0.06), C.yellow, 2.5); }
  ctx.restore();
}
// casket 80 x 50 at s 1, (x, y) = bottom centre; open 0..1; glint 0..1 (sliding highlight) or -1; glow strength
function a97Casket(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const op = K.clamp(o.open || 0);
  if (op > 0.05 && (o.glow ?? 1) > 0) a97Glow(ctx, 0, -48, 95, op * (o.glow ?? 1), o.t || 0);
  if (op > 0.05) { shape(ctx, K.rectPts(-36, -56, 72, 12), C.red, { lw: 3, seed: 320 }); a97Jewel(ctx, 0, -46 - 10 * op, 24, o.glint ?? -1); }
  shape(ctx, K.rectPts(-40, -44, 80, 44), C.yellow, { lw: 5, seed: 321, dot: C.red, pitch: 7, rad: 0.22, da: 0.5 });
  seg(ctx, -40, -24, 40, -24, 4, A97_GOLD, 2);
  const lidTop = -44 - 16 - 36 * op; shape(ctx, [[-42, -44], [-40, lidTop + 6], [-28, lidTop], [28, lidTop], [40, lidTop + 6], [42, -44], [-42, -44]].map(([a, b]) => [a, op > 0.05 ? b - 30 * op : b]), A97_GOLD, { lw: 4.5, seed: 322, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, op > 0.05 ? lidTop - 30 * op + 10 : -52, 5, 5, 10), A97_JEWEL, { lw: 2.5, seed: 323 });
  ctx.restore();
}

// hero casket for close shots (v2): lid hinged at the back (opaque, stands behind the box), a larger jewel that lifts out with
// an overshoot, and thin tapered rays at low alpha kept inside rayR (so they never reach the holder's face).
// o: open 0..1, lift 0..1 (eased with overshoot by the caller), jr jewel radius, rayR, t, glint
function a97CasketHero(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const op = K.clamp(o.open || 0), jr = o.jr ?? 40, jy = -50 - (o.lift || 0) * 22 - 6 * op;
  if (op > 0.05) {
    const lt = -44 - 92 * op; shape(ctx, [[-40, -44], [-56, lt], [56, lt], [40, -44], [-40, -44]], A97_GOLD, { lw: 4.5, seed: 322, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
    shape(ctx, ell(0, lt + 10, 5, 5, 10), A97_JEWEL, { lw: 2.5, seed: 323 });
    const rr = o.rayR ?? jr * 2.1, a0 = (o.t || 0) * 0.35; ctx.save(); ctx.globalAlpha *= 0.4 * op; ctx.fillStyle = C.yellow; ctx.strokeStyle = C.black; ctx.lineWidth = 1.5;
    for (let i = 0; i < 9; i++) { const a = a0 + i / 9 * Math.PI * 2, r0 = jr * 1.15, r1 = rr * (0.85 + 0.15 * Math.sin((o.t || 0) * 3 + i * 1.7)), w = jr * 0.13, ca = Math.cos(a), sa = Math.sin(a);
      ctx.beginPath(); ctx.moveTo(ca * r0 - sa * w, jy + sa * r0 + ca * w); ctx.lineTo(ca * r1, jy + sa * r1); ctx.lineTo(ca * r0 + sa * w, jy + sa * r0 - ca * w); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    shape(ctx, K.rectPts(-36, -56, 72, 12), C.red, { lw: 3, seed: 320 });
    a97Jewel(ctx, 0, jy, jr * (0.6 + 0.4 * op), o.glint ?? -1);
  } else { const lidTop = -44 - 16 - 36 * 0; shape(ctx, [[-42, -44], [-40, lidTop + 6], [-28, lidTop], [28, lidTop], [40, lidTop + 6], [42, -44], [-42, -44]], A97_GOLD, { lw: 4.5, seed: 322, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, ell(0, -52, 5, 5, 10), A97_JEWEL, { lw: 2.5, seed: 323 }); }
  shape(ctx, K.rectPts(-40, -44, 80, 44), C.yellow, { lw: 5, seed: 321, dot: C.red, pitch: 7, rad: 0.22, da: 0.5 });
  seg(ctx, -40, -24, 40, -24, 4, A97_GOLD, 2);
  ctx.restore();
}

// ---------- hourglass (panel time meter), scroll, notes, prison icon, cracked heart, moth ----------
// (x, y) centre, 72 x 112 view units at s 1; level 0..1 sand left in the top bulb; o.rot, o.alpha, o.red (last grain red), o.run (falling stream)
function a97Hourglass(ctx, x, y, level, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.s || 1, o.s || 1);
  const top = [[-28, -46], [28, -46], [4, -4], [-4, -4], [-28, -46]], bot = [[-4, 4], [4, 4], [28, 46], [-28, 46], [-4, 4]];
  shape(ctx, top, '#fffaf0', { lw: 4, seed: 324 }); shape(ctx, bot, '#fffaf0', { lw: 4, seed: 325 });
  const L = K.clamp(level); if (L > 0.005) { const h = 40 * Math.sqrt(L), w = 24 * Math.sqrt(L); shape(ctx, [[-w, -4 - h], [w, -4 - h], [3, -5], [-3, -5], [-w, -4 - h]], C.yellow, { lw: 2.5, seed: 326, dot: C.red, pitch: 5, rad: 0.25, da: 0.5 }); }
  const B = 1 - L, bh = 34 * Math.sqrt(B); if (B > 0.01) shape(ctx, [[-26, 44], [26, 44], [0, 44 - bh], [-26, 44]], C.yellow, { lw: 2.5, seed: 327, dot: C.red, pitch: 5, rad: 0.25, da: 0.5 });
  if (o.run && L > 0.01) { ctx.fillStyle = C.yellow; ctx.fillRect(-1.5, -4, 3, 46 - bh); ctx.fillStyle = C.red; for (let i = 0; i < 3; i++) { const u = (t * 2.2 + i / 3) % 1; ctx.fillRect(-2, -2 + u * (44 - bh), 4, 4); } }
  if (o.red) { ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, 4.5, 0, 7); ctx.fill(); }
  shape(ctx, K.rectPts(-36, -58, 72, 12), A97_BROWN, { lw: 4, seed: 328 }); shape(ctx, K.rectPts(-36, 46, 72, 12), A97_BROWN, { lw: 4, seed: 329 });
  for (const sd of [-1, 1]) seg(ctx, sd * 33, -46, sd * 33, 46, 6, A97_BROWN, 2.5);
  if (o.tick) { ctx.globalAlpha = K.clamp(o.tick); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-26, 4); ctx.lineTo(-6, 26); ctx.lineTo(30, -24); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = '#3f9d4a'; ctx.stroke(); }
  ctx.restore();
}
// small scroll; n wavy lines drawn on by p (0..1); (x, y) centre, 120 x 80 at s 1
function a97Scroll(ctx, x, y, s = 1, p = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, K.rectPts(-56, -38, 112, 76), C.white, { lw: 4, seed: 330 });
  for (const xx of [-58, 58]) shape(ctx, ell(xx, 0, 8, 42, 12), '#efdcae', { lw: 3.5, seed: 331 });
  const n = o.n ?? 4; ctx.lineWidth = 3.5; ctx.strokeStyle = o.ink || '#5a5a6a'; ctx.lineCap = 'round';
  for (let k = 0; k < n; k++) { const f = K.clamp(p * n - k); if (f <= 0) continue; const yy = -24 + k * 16 + (k >= 2 ? 4 : 0); ctx.beginPath(); for (let i = 0; i <= 20 * f; i++) { const xx = -42 + 84 * i / 20; ctx[i ? 'lineTo' : 'moveTo'](xx, yy + 2.5 * Math.sin(i * 1.4 + k)); } ctx.stroke(); }
  if (o.seal) shape(ctx, ell(0, 30, 10, 10, 12), C.red, { lw: 3, seed: 332 });
  ctx.restore();
}
function a97Notes(ctx, x, y, t, p, s = 1) { for (let i = 0; i < 2; i++) { const k = K.ease.back(K.clamp((p - i * 0.25) / 0.4)); if (k <= 0) continue; const bob = 6 * Math.sin(t * 5 + i * 2); ctx.save(); ctx.translate(x + i * 46 * s, y + bob - i * 18 * s); ctx.scale(k * s, k * s); note(ctx, 0, 0, 1.3, C.black); ctx.restore(); } }
// prison icon: barred window with a chain; o.dark cloud behind (the fear cloud); o.crack 0..1 (falls apart)
function a97Prison(ctx, x, y, s = 1, o = {}) {
  const fall = K.clamp(o.crack || 0); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= (o.alpha ?? 1) * (1 - K.clamp((fall - 0.6) / 0.4));
  if (o.dark) { const r = K.rng(5); ctx.save(); ctx.translate(0, fall * 30); for (let i = 0; i < 7; i++) shape(ctx, ell(-70 + i * 23, (i % 2 ? -14 : 4) + r() * 6, 32, 26, 16), '#4a4a5a', { lw: 4, seed: 333 + i, dot: '#2a2a36', pitch: 7, rad: 0.25, da: 0.5 }); ctx.restore(); }
  const fr = K.rectPts(-38, -34, 76, 68); if (fall <= 0) shape(ctx, fr, '#2a2a36', { lw: 5, seed: 340 });
  for (let i = 0; i < 4; i++) { const bx = -24 + i * 16, dy = fall > 0 ? 260 * Math.pow(K.clamp(fall * 1.4 - i * 0.08), 2) : 0, rot = fall * (i % 2 ? 0.6 : -0.5);
    ctx.save(); ctx.translate(bx, dy); ctx.rotate(rot); seg(ctx, 0, -34, 0, 34, 7, A97_STEEL, 3); ctx.restore(); }
  if (fall <= 0) { seg(ctx, -38, -10, 38, -10, 6, A97_STEEL, 2.5); for (let i = 0; i < 4; i++) shape(ctx, ell(34 + i * 11, 40 + i * 9, 7, 5, 10), A97_STEELD, { lw: 3, seed: 341 }); }
  ctx.restore();
}
// heart that can crack: crack 0..1 (line drawn on), slip (px apart), mend 0..1 (closes again)
function a97CrackHeart(ctx, x, y, r, crack, slip = 0) {
  if (crack <= 0) { heart(ctx, x, y, r); return; }
  const zig = [[0, -r * 0.55], [-r * 0.18, -r * 0.2], [r * 0.12, r * 0.1], [-r * 0.1, r * 0.45], [0, r * 0.95]];
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * slip, slip * 0.3); ctx.beginPath(); if (sd < 0) { ctx.moveTo(-r * 2, -r * 2); zig.forEach((p) => ctx.lineTo(x + p[0], y + p[1])); ctx.lineTo(-r * 2 + x, r * 2 + y); } else { ctx.moveTo(x + r * 2, y - r * 2); zig.forEach((p) => ctx.lineTo(x + p[0], y + p[1])); ctx.lineTo(x + r * 2, y + r * 2); }
    ctx.closePath(); if (sd < 0) { ctx.save(); ctx.translate(x, y); ctx.restore(); } ctx.clip(); heart(ctx, x, y, r); ctx.restore(); }
  const n = Math.max(2, Math.ceil(zig.length * K.clamp(crack))); ctx.save(); ctx.lineWidth = Math.max(3, r * 0.12); ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); zig.slice(0, n).forEach((p, i) => ctx[i ? 'lineTo' : 'moveTo'](x + p[0], y + p[1])); ctx.stroke(); ctx.restore();
}
function a97Moth(ctx, x, y, t, s = 1) {
  const f = Math.abs(Math.sin(t * 26)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 22, -10 - 10 * f], [sd * 18, 8], [0, 0]], '#c9bfa6', { lw: 3, seed: 342, dot: '#8c8a94', pitch: 5, rad: 0.25, da: 0.5 });
  seg(ctx, 0, -6, 0, 10, 6, '#5a5a6a', 2); ctx.restore();
}
function a97Glint(ctx, x, y, r, p) {
  if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p) * r; ctx.save(); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y - k); ctx.lineTo(x + k * 0.22, y - k * 0.22); ctx.lineTo(x + k, y); ctx.lineTo(x + k * 0.22, y + k * 0.22); ctx.lineTo(x, y + k); ctx.lineTo(x - k * 0.22, y + k * 0.22); ctx.lineTo(x - k, y); ctx.lineTo(x - k * 0.22, y - k * 0.22); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function a97Sweat(ctx, x, y, p) { if (p <= 0 || p >= 1) return; const yy = y + 34 * p; ctx.save(); ctx.globalAlpha = Math.min(1, (1 - p) * 3); shape(ctx, [[x, yy - 14], [x + 8, yy], [x, yy + 7], [x - 8, yy], [x, yy - 14]], '#9cc4ff', { lw: 3, seed: 343 }); ctx.restore(); }
function a97Tear(ctx, x, y, r) { shape(ctx, [[x, y - r * 1.5], [x + r * 0.9, y + r * 0.1], [x + r * 0.7, y + r * 0.8], [x, y + r], [x - r * 0.7, y + r * 0.8], [x - r * 0.9, y + r * 0.1], [x, y - r * 1.5]], '#5fa0ff', { lw: 5, seed: 344, dot: C.blue, pitch: 8, rad: 0.25, da: 0.5 }); }
// flat long shadow under a figure
function a97Shadow(ctx, x, y, w, stretch = 1, a = 0.35) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(x + w * (stretch - 1) * 0.5, y + 2, w * stretch, w * 0.16, 0, 0, 7); ctx.fill(); ctx.restore(); }

// ---------- balloons and insets (view units) ----------
// icon balloon: white rounded balloon with a tail toward (tx, ty); inner(ctx) drawn clipped with the origin at the centre
function a97Balloon(ctx, cx, cy, w, h, tail, p, inner, o = {}) {
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
// round inset (view units): paper disc (or dream wash), black ring, inner(ctx) clipped with the origin at the centre
function a97Inset(ctx, cx, cy, r, p, inner, o = {}) {
  const rr = r * K.ease.back(K.clamp(p)); if (rr < 2) return;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fillStyle = o.bg || C.paper; ctx.fill(); ctx.clip();
  if (o.dream) { ctx.fillStyle = dotPat(ctx, '#3f7be6', 10, 0.3); ctx.globalAlpha = 0.35; ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2); ctx.globalAlpha = 1; }
  ctx.translate(cx, cy); ctx.scale(rr / r, rr / r); inner(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke(); if (o.ring && rr > 12) { ctx.lineWidth = 5; ctx.strokeStyle = o.ring; ctx.beginPath(); ctx.arc(cx, cy, rr - 8, 0, 7); ctx.stroke(); } ctx.restore();
}
// person bust inside an inset or balloon: draws the figure so its head lands at (0, 0) at scale s
function a97Bust(ctx, P, s) { const age = P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3, hy = -195 + age * 6; person(ctx, { ...P, x: 0, y: -hy * s, s }); }
// progress bar (view units): target bar with a fill fraction; over > 0 spills a heap past the end
function a97Bar(ctx, x, y, w, h, frac, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(x + 7, y + 7, w, h); ctx.fillStyle = C.white; ctx.fillRect(x, y, w, h);
  const f = K.clamp(frac); if (f > 0) { ctx.fillStyle = C.yellow; ctx.fillRect(x, y, w * f, h); ctx.fillStyle = dotPat(ctx, C.red, 8, 0.3); ctx.fillRect(x, y, w * f, h); }
  if (o.flash) { ctx.globalAlpha *= o.flash; ctx.fillStyle = C.white; ctx.fillRect(x, y, w, h); ctx.globalAlpha /= o.flash; }
  ink(ctx, K.rectPts(x, y, w, h), 6, 345);
  if (o.over > 0) { const k = K.clamp(o.over); a97Mound(ctx, x + w + 30 * k, y + h + 6, 26 + 30 * k, 20 + 34 * k); }
  ctx.restore();
}
// panel-space white flash (2 frames)
function a97Flash(ctx, t, t0, a = 0.85) { if (t >= t0 && t < t0 + 0.07) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.white; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); } }
// a street lamp post (world units), base (x, y)
function a97LampPost(ctx, x, y, t, lit = 1) { seg(ctx, x, y, x, y - 330, 12, '#3a3a4a', 4); seg(ctx, x, y - 320, x + 60, y - 320, 8, '#3a3a4a', 3); hangingLamp(ctx, x + 60, y - 280, t, { lit, chain: y - 320, s: 0.8 }); }
