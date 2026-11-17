// ===== KD-013 The Ascetic and the Thieves: story-local drawings and helpers =====
// goat (with asDog), dogIcon, coin, sack, rope, balanceScale, spiralEyes, thief disguise items (turban, false beard, tall turban),
// kdHead/kdL2W (person anchor points in world space), dream wash, question glyphs. Library/ stays untouched; see ../library_proposals.md.
// Every top-level name is prefixed (kd / KD_) so nothing collides with the engine or Library globals.
const KD_GR = 900, KD_VW = 1000, KD_VH = 1230, KD_RW = 3000;
const KB = (t, a, d, e = 'lin') => K.beat(t, a, d, e);
const kdP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const kdFade = (t, a, b, f = 0.25) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const KD_TAN = '#d9a066', KD_TAND = '#a8662a', KD_ROPE = '#c8902e', KD_SACK = '#b07a3a', KD_SACKD = '#7a4a1a', KD_PINK = '#f7a8a8';

// ---------- person anchors: local figure point -> world (dir, s, sit/kneel hip offset, age lean, acting sq + tip) ----------
function kdL2W(P, lx, ly, upper = true) {
  const s = P.s || 1, dir = P.dir || 1, hipY = -75;
  if (upper) { const D = PEOPLE.dress(P), lean = (P.lean || 0) + D.age * 0.12 * (1 - K.clamp(P.lie || 0)), g = personPose(P, -1, 0), off = [g.hipC[0], g.hipC[1] - hipY];
    const dy = ly - hipY, c = Math.cos(lean), n = Math.sin(lean); [lx, ly] = [lx * c - dy * n + off[0], lx * n + dy * c + hipY + off[1]]; }
  let wx = lx * s * dir, wy = ly * s; const sq = P.sq ?? 1; wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  const tp = (P.tip || 0) * Math.sign(dir), c = Math.cos(tp), n = Math.sin(tp);
  return [P.x + wx * c - wy * n, P.y + wx * n + wy * c];
}
// head centre (eyes are 4 above it, 13 to each side)
const kdHead = (P) => kdL2W(P, (P.look || 0) * 4, -195 + (P.drop || 0) + PEOPLE.dress(P).age * 6);
const kdHand = (P, i) => (P.hands ? kdL2W(P, P.hands[i][0], P.hands[i][1]) : kdHead(P));
// redraw a person's hands on top (after an animal drawn in front of the body), so a touch stays readable; which = [0 (L), 1 (R)]
function kdHandsOver(ctx, P, which = [0, 1]) { for (const i of which) { const h = kdHand(P, i); shape(ctx, ell(h[0], h[1], 12 * (P.s || 1), 12 * (P.s || 1), 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); } }
// shared acting for people: explicit blink (keeps P.hands on the same object), gaze at a world point
function kdLife(P, t, seed, target) { P.lid = Math.max(P.lid || 0, P.eyes === 'wide' ? 0 : blink(t, seed)); if (target) P.gaze = lookAt(kdHead(P), target); return P; }

// ---------- goat(ctx, P): fat white goat, side view, feet at (x, y), facing dir. ~200 x 130 at s 1 ----------
// fields: ph, amp (walk), fat 0..1, chew (seconds clock for the sideways chew; null = still), talk 0..1 (bleat), headDown 0..1 (graze),
//   headTilt (rad), earLift -1..1, tailUp 0..1, asDog 0..1 (his doubt: floppy ears, no horns, long snout, tongue, wagging tail, tan coat),
//   t (clock for the wag), plus the acting fields (gaze, lid, wet, sq, tip, alpha). Sets P.neck (world) for the rope.
function kdGoatRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, fat = P.fat ?? 1, a = K.clamp(P.asDog || 0), amp = P.amp || 0, ph = P.ph || 0, t = P.t || 0;
  const coat = a > 0 ? mixHex(C.white, KD_TAN, a) : C.white, dotc = a > 0 ? mixHex(C.skin, KD_TAND, a) : C.skin, far = a > 0 ? mixHex('#e2d8c6', '#b9874f', a) : '#e2d8c6';
  ctx.save(); ctx.translate(P.x, P.y); ctx.scale(dir * s, s);
  const leg = (hx, phase, col) => { const ang = amp * 0.5 * Math.sin(ph + phase), lift = Math.max(0, Math.cos(ph + phase)) * 7 * amp, fx = hx + Math.sin(ang) * 58, fy = -62 + Math.cos(ang) * 58 - lift;
    seg(ctx, hx, -66, (hx + fx) / 2 + 3, (-66 + fy) / 2, 15, col, 4); seg(ctx, (hx + fx) / 2 + 3, (-66 + fy) / 2, fx, fy - 4, 12, col, 4); shape(ctx, K.rectPts(fx - 8, fy - 9, 16, 10), C.black, { lw: 3, seed: 7 }); };
  leg(44, Math.PI, far); leg(-40, 0, far);
  // tail (behind the body)
  const tw = a > 0.3 ? 0.6 * Math.sin(t * 22) * a : 0, tu = (P.tailUp ?? 0.5) + tw, tl = 22 + 16 * a;
  ctx.save(); ctx.translate(-60 - 8 * fat, -100); ctx.rotate(-0.6 - 0.7 * tu); shape(ctx, [[-6, 0], [6, 0], [3, -tl], [-2, -tl - 4]], coat, { lw: 4, seed: 9 }); ctx.restore();
  // body
  const rx = 62 + 12 * fat, ry = 34 + 10 * fat;
  shape(ctx, ell(-2, -84 + 2 * fat, rx, ry, 30), coat, { lw: 6, seed: 11, dot: dotc, pitch: 8, rad: 0.25, da: 0.55 });
  if (a > 0.5) for (const [sx, sy, sr] of [[-20, -96, 14], [18, -76, 10]]) shape(ctx, ell(sx, sy, sr, sr * 0.8, 12), KD_TAND, { lw: 3, seed: 13 });
  leg(36, 0, coat); leg(-46, Math.PI, coat);
  // neck + head
  const hd = K.clamp(P.headDown || 0), hx = K.lerp(80, 96, hd), hy = K.lerp(-130, -64, hd), tilt = (P.headTilt || 0) + hd * 0.5;
  shape(ctx, [[30, -104], [hx - 18, hy - 6], [hx - 6, hy + 14], [50, -74]], coat, { lw: 5, seed: 15 });
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(tilt);
  const el = P.earLift || 0;
  // far ear
  ctx.save(); ctx.translate(-12, -10); ctx.rotate(-2.6 + 0.3 * el - 1.0 * a); shape(ctx, ell(0, 16 + 10 * a, 7 + 2 * a, 16 + 14 * a, 14), a > 0.3 ? KD_TAND : far, { lw: 3.5, seed: 17 }); ctx.restore();
  // horns (shrink with asDog)
  const hk = 1 - a; if (hk > 0.05) for (const [ox, k] of [[-2, 1.15], [-12, 1.4]]) { ctx.save(); ctx.translate(ox, -14); ctx.scale(hk * k, hk * k); shape(ctx, [[-6, 2], [7, 2], [5, -14], [-4, -28], [-20, -36], [-30, -32], [-16, -24], [-9, -12]], C.yellow, { lw: 4, seed: 19 }); ctx.restore(); }
  // head + muzzle (longer snout for the dog)
  const mz = 10 * a;
  shape(ctx, ell(0, 0, 26, 21, 22), coat, { lw: 5, seed: 21, dot: dotc, pitch: 7, rad: 0.22, da: 0.4 });
  shape(ctx, ell(18 + mz, 8, 15 + mz * 0.6, 12, 18), a > 0.5 ? KD_TAN : KD_PINK, { lw: 4, seed: 23 });
  shape(ctx, ell(30 + mz * 1.6, 3, 4 + 3 * a, 3 + 2 * a, 10), C.black, { lw: 2, seed: 25 });
  // mouth: chew (sideways jaw) or bleat
  const ch = P.chew == null ? 0 : Math.sin(P.chew * 9) * 2.5, tk = K.clamp(P.talk || 0);
  if (tk > 0.05) { shape(ctx, ell(24 + mz, 15, 7, 2 + 8 * tk, 12), C.black, { lw: 2.5, seed: 27 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(24 + mz, 15 + 4 * tk, 4, 1 + 3 * tk, 0, 0, 7); ctx.fill(); }
  else { ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(16 + mz + ch, 15); ctx.quadraticCurveTo(24 + mz + ch, 18, 30 + mz + ch, 13); ctx.stroke(); ctx.restore(); }
  if (a > 0.4) shape(ctx, [[22 + mz, 16], [32 + mz, 16], [33 + mz, 30 * a], [24 + mz, 32 * a]], C.red, { lw: 3, seed: 29 });
  // chin tuft
  if (a < 0.8) shape(ctx, [[8, 16], [18, 18], [12, 38 * (1 - a) + 18], [6, 30 * (1 - a) + 16]], '#e9e1d2', { lw: 3.5, seed: 31 });
  // eye: horizontal pupil (goat) / round (dog)
  const ex = -2, ey = -6, gz = EYE.on && EYE.gaze ? EYE.gaze : [P.gaze ? P.gaze[0] * dir : 0.6, P.gaze ? P.gaze[1] : 0], lid = EYE.on ? EYE.lid : P.lid || 0;
  const gx = gz[0], gy = gz[1];
  if (lid >= 0.95) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey - 2, 8, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); }
  else { const ep = ell(ex, ey, 10, 9, 16); shape(ctx, ep, '#fff6c8', { lw: 3, seed: 33 });
    ctx.fillStyle = C.black; const px = ex + gx * 4, py = ey + gy * 3; if (a > 0.5) { ctx.beginPath(); ctx.arc(px, py, 4, 0, 7); ctx.fill(); } else { ctx.beginPath(); ctx.ellipse(px, py, 5.5, 2.4, 0, 0, 7); ctx.fill(); }
    if ((EYE.on && EYE.wet) || P.wet) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px + 2, py - 1.5, 1.6, 0, 7); ctx.fill(); ctx.fillStyle = '#9cc4ff'; ctx.beginPath(); ctx.arc(ex - 2, ey + 9, 2.6, 0, 7); ctx.fill(); }
    if (lid > 0.02) { const ly0 = ey - 9 + 18 * lid; ctx.save(); K.poly(ctx, ep, true); ctx.clip(); ctx.fillStyle = coat; ctx.fillRect(ex - 12, ey - 12, 24, ly0 - ey + 12); ctx.restore(); ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(ex - 10, ly0); ctx.lineTo(ex + 10, ly0); ctx.stroke(); ctx.restore(); } }
  // near ear: sideways (goat) or long and floppy (dog)
  ctx.save(); ctx.translate(-14, -8); ctx.rotate(-2.0 + 0.35 * el - 0.9 * a); shape(ctx, ell(0, 18 + 12 * a, 8 + 3 * a, 18 + 16 * a, 14), a > 0.3 ? KD_TAND : coat, { lw: 4, seed: 35 }); ctx.restore();
  ctx.restore(); ctx.restore();
}
const kdGoat = acting(kdGoatRaw, (P) => (P.asDog > 0 ? mixHex(C.white, KD_TAN, K.clamp(P.asDog)) : C.white));
// neck point (rope loop) in world space, consistent with sq/tip of the acting wrapper
function kdGoatNeck(P) {
  const s = P.s || 1, dir = P.dir || 1, hd = K.clamp(P.headDown || 0), lx = K.lerp(62, 74, hd), ly = K.lerp(-112, -70, hd);
  let wx = lx * s * dir, wy = ly * s; const sq = P.sq ?? 1; wx *= 1 + (1 - sq) * 0.7; wy *= sq; const tp = (P.tip || 0) * Math.sign(dir);
  return [P.x + wx * Math.cos(tp) - wy * Math.sin(tp), P.y + wx * Math.sin(tp) + wy * Math.cos(tp)];
}
const kdGoatHead = (P) => { const s = P.s || 1, hd = K.clamp(P.headDown || 0); return [P.x + (P.dir || 1) * s * K.lerp(80, 96, hd), P.y + s * K.lerp(-136, -70, hd)]; };
function kdGoatShadow(ctx, P) { halftoneShadow(ctx, P.x, P.y + 4, 95 * (P.s || 1), 0.3); }
// rope loop around the neck (drawn after the goat) + lead to a hand: sag from slack (rope length minus distance)
function kdRope(ctx, a, b, len, o = {}) {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]), sag = Math.max(6, Math.sqrt(Math.max(0, len * len - d * d)) * 0.5) + (o.sag || 0), mx = (a[0] + b[0]) / 2, my = Math.max(a[1], b[1]) + sag;
  ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[11, C.black], [6, KD_ROPE]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(mx, my, ...b); ctx.stroke(); } ctx.restore();
}
function kdLoop(ctx, nk, s = 1, open = 1) {   // the loop round the neck; open > 1 = slack
  ctx.save(); ctx.translate(nk[0], nk[1]); ctx.scale(s, s); for (const [w, c] of [[10, C.black], [5, KD_ROPE]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.ellipse(0, 4 * open, 9 * open, 20 * open, 0.25, 0, 7); ctx.stroke(); } ctx.restore();
}
// rope lying on the ground in an S (from x0 to x1 at y)
function kdRopeGround(ctx, x0, x1, y) {
  ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[10, C.black], [5, KD_ROPE]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x0, y); ctx.bezierCurveTo(x0 + (x1 - x0) * 0.3, y + 16, x0 + (x1 - x0) * 0.6, y - 14, x1, y + 2); ctx.stroke(); } ctx.restore();
}

// ---------- small props and icons ----------
function kdCoin(ctx, x, y, r = 14) { shape(ctx, ell(x, y, r, r, 18), C.yellow, { lw: 3.5, seed: 41 }); ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 7); ctx.stroke(); ctx.restore(); }
function kdSack(ctx, x, y, s = 1, droop = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (1 - 0.25 * droop));
  shape(ctx, [[-30, 0], [-36, -40], [-16, -66], [16, -66], [36, -40], [30, 0]], KD_SACK, { lw: 5, seed: 43, dot: KD_SACKD, pitch: 8, rad: 0.2, da: 0.5 });
  seg(ctx, -14, -66, 14, -66, 7, KD_SACKD, 2.5); shape(ctx, [[-10, -66], [-18, -84], [0, -74], [18, -84], [10, -66]], KD_SACK, { lw: 3.5, seed: 44 }); ctx.restore();
}
// dog icon (a plain dog head), r = radius; o.q adds a red question mark
function kdDogIcon(ctx, x, y, r = 40, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(r / 40, r / 40);
  for (const sd of [-1, 1]) shape(ctx, [[sd * 22, -26], [sd * 44, -18], [sd * 40, 16], [sd * 28, 10]], KD_TAND, { lw: 4, seed: 45 });
  shape(ctx, ell(0, -4, 30, 30, 22), KD_TAN, { lw: 5, seed: 46 }); shape(ctx, ell(0, 14, 18, 13, 16), C.white, { lw: 4, seed: 47 }); shape(ctx, ell(0, 6, 7, 5, 10), C.black, { lw: 2, seed: 48 });
  shape(ctx, [[-5, 22], [5, 22], [4, 34], [-4, 34]], C.red, { lw: 2.5, seed: 49 });
  for (const sd of [-1, 1]) { ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(sd * 11, -12, 4.5, 0, 7); ctx.fill(); }
  if (o.q) sfx(ctx, '?', 46, -30, 50, 1, { fill: C.red });
  if (o.cross) { ctx.save(); ctx.lineCap = 'round'; for (const [w, c] of [[16, C.black], [9, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(-40 * o.cross, -40 * o.cross); ctx.lineTo(40 * o.cross, 40 * o.cross); ctx.moveTo(40 * o.cross, -40 * o.cross); ctx.lineTo(-40 * o.cross, 40 * o.cross); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
}
// goat icon (head) for clouds and the scale
function kdGoatIcon(ctx, x, y, r = 40) { kdGoat(ctx, { x: x - 70 * r / 40 * 0.5, y: y + 60 * r / 40 * 0.5, s: 0.5 * r / 40, dir: 1, chew: null, gaze: [1, 0] }); }
// a little thief head (mask) for clouds and the scale
function kdThiefHead(ctx, x, y, r = 30, v = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(r / 36, r / 36);
  shape(ctx, ell(0, 0, 36, 37, 30), C.white, { dot: C.skin, pitch: 6, rad: 0.3, lw: 6, seed: 51 });
  ctx.save(); K.poly(ctx, ell(0, 0, 36, 37, 30), true); ctx.clip(); ctx.fillStyle = C.black; ctx.fillRect(-40, -19, 80, 30); ctx.fillStyle = [C.black, C.red, C.blue][v]; ctx.fillRect(-40, -50, 80, 30); ctx.restore(); ink(ctx, ell(0, 0, 36, 37, 30), 6, 51);
  for (const ex of [-13, 13]) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(ex, -4, 8, 9, 0, 0, 7); ctx.fill(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + 2, -3, 3.6, 0, 7); ctx.fill(); }
  ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); if (o.talk) ctx.ellipse(0, 20, 7, 6, 0, 0, 7); else ctx.arc(0, 14, 10, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); ctx.restore();
  ctx.restore();
}
// ---------- balanceScale(ctx, x, y, s, ang, left(c), right(c)): post on a foot at (x, y); beam rotates by ang (+ = right pan down); pans hang level ----------
function kdScale(ctx, x, y, s, ang, left, right) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-50, 0], [50, 0], [30, -18], [-30, -18]], WOOD, { lw: 5, seed: 61 }); seg(ctx, 0, -16, 0, -160, 14, WOOD, 4.5);
  const L = 150, ends = [-1, 1].map((sd) => [sd * L * Math.cos(ang), -160 + sd * L * Math.sin(ang)]);
  seg(ctx, ends[0][0], ends[0][1], ends[1][0], ends[1][1], 12, C.yellow, 4.5); shape(ctx, ell(0, -160, 12, 12, 12), C.red, { lw: 4, seed: 62 });
  ends.forEach(([ex, ey], i) => { const py = ey + 90; ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 50, py); ctx.moveTo(ex, ey); ctx.lineTo(ex + 50, py); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(ex, py); (i ? right : left)?.(ctx); ctx.restore();
    shape(ctx, [[ex - 58, py], [ex + 58, py], [ex + 40, py + 20], [ex - 40, py + 20]], C.yellow, { lw: 4.5, seed: 63 + i }); });
  ctx.restore();
}
// ---------- spiral eyes over a person's eyes (world) ----------
function kdSpiralEyes(ctx, P, t, k = 1) {
  const h = kdHead(P), s = P.s || 1; if (k <= 0) return;
  for (const sd of [-1, 1]) { const ex = h[0] + sd * 13 * s, ey = h[1] - 4 * s; ctx.save(); ctx.translate(ex, ey); ctx.scale(s * k, s * k); shape(ctx, ell(0, 0, 13, 13, 16), C.white, { lw: 3, seed: 71 });
    ctx.rotate(t * 9 * sd); ctx.lineWidth = 2.8; ctx.strokeStyle = C.black; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 5, r = 1 + i / 40 * 10; i ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.stroke(); ctx.restore(); }
}
// ---------- thief disguise items, drawn over the person's head (world) ----------
// villager turban jammed over the masked cap; skew = askew angle
function kdTurban(ctx, P, skew = 0, col = C.white, band = C.blue) {
  const h = kdHead(P), s = P.s || 1; ctx.save(); ctx.translate(h[0], h[1]); ctx.rotate(skew + (P.tilt || 0)); ctx.scale(s, s);
  shape(ctx, ell(0, -34, 42, 22, 22), col, { lw: 5, seed: 81, dot: band, pitch: 8, rad: 0.2, da: 0.4 }); seg(ctx, -40, -26, 40, -26, 7, band, 2.5); shape(ctx, ell(0, -54, 14, 10, 12), col, { lw: 4, seed: 82 }); ctx.restore();
}
// false beard on ear strings; slip moves it sideways (0 on, 1 hanging off one ear); swingA swings it (rad)
function kdFalseBeard(ctx, P, slip = 0, swingA = 0) {
  const h = kdHead(P), s = P.s || 1; ctx.save(); ctx.translate(h[0], h[1]); ctx.scale(s, s);
  const ox = 20 * slip, oy = 10 * slip; ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-34, -2); ctx.lineTo(-24 + ox, 12 + oy); ctx.moveTo(34, -2); ctx.lineTo(24 + ox, 12 + oy); ctx.stroke(); ctx.restore();
  ctx.translate(ox, 10 + oy); ctx.rotate(swingA + 0.4 * slip);
  shape(ctx, [[-26, 0], [-16, 6], [0, 2], [16, 6], [26, 0], [24, 30], [10, 56], [0, 64], [-10, 56], [-24, 30]], '#4a2a12', { lw: 3.5, seed: 83 }); ctx.restore();
}
// tall merchant turban for thief 3
function kdTallTurban(ctx, P, lift = 0, rot = 0) {
  const h = kdHead(P), s = P.s || 1; ctx.save(); ctx.translate(h[0], h[1] - lift); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-36, -24], [-30, -84], [-14, -100], [14, -100], [30, -84], [36, -24]], C.white, { lw: 5, seed: 84, dot: C.blue, pitch: 8, rad: 0.2, da: 0.4 });
  seg(ctx, -36, -28, 36, -28, 9, C.red, 3); shape(ctx, ell(0, -40, 8, 8, 10), C.yellow, { lw: 3, seed: 85 }); ctx.restore();
}
// ---------- lettering helpers (panel space) ----------
function kdQ(ctx, x, y, p, size = 70, rot = 0.1) { sfx(ctx, '?', x, y, size, p, { rot, fill: C.yellow }); }
function kdSweat(ctx, x, y, t, t0) { const u = K.clamp((t - t0) / 0.9); if (u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha = 1 - u * u; const yy = y + u * 30; shape(ctx, [[x, yy - 16], [x + 8, yy], [x, yy + 8], [x - 8, yy]], '#9cc4ff', { lw: 3, seed: 91 }); ctx.restore(); }
// blue dream wash over the picture (his view): Ben-Day blue with a soft vignette
function kdDreamWash(ctx, k) {
  if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.28 * k; ctx.fillStyle = C.blue; ctx.fillRect(0, 0, KD_VW, KD_VH); ctx.globalAlpha = 0.5 * k; ctx.fillStyle = dotPat(ctx, C.white, 14, 0.25); ctx.fillRect(0, 0, KD_VW, KD_VH);
  ctx.globalAlpha = k; ctx.lineWidth = 60; ctx.strokeStyle = 'rgba(13,34,96,0.55)'; ctx.strokeRect(0, 0, KD_VW, KD_VH); ctx.restore();
}
// red anger flush on the cheeks (world, over the head)
function kdFlush(ctx, P, k) { if (k <= 0) return; const h = kdHead(P), s = P.s || 1; ctx.save(); ctx.globalAlpha = k; for (const sd of [-1, 1]) { ctx.fillStyle = dotPat(ctx, C.red, 6, 0.4); ctx.beginPath(); ctx.ellipse(h[0] + sd * 22 * s, h[1] + 10 * s, 11 * s, 8 * s, 0, 0, 7); ctx.fill(); } ctx.restore(); }
