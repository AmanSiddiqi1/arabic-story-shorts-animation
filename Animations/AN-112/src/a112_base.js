// ===== AN-112 Abu Hassan al-Ziyadi and the Khorasan Man: constants, timing helpers, person rig and the story's props =====
// World 1000 x 1230, floor y 900 (the dawn street is a 2400-wide strip). Every drawing is a pure function of its arguments and t.
const A112_DUR = 174.9;   // narration 171.904 + 3.0 s THE END hold (plan duration + end_hold)
const A112B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a112In = (t, a, b) => t >= a && t < b;
const a112Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const a112Win = (t, a, b, r = 0.25) => K.ease.inOut(K.clamp(Math.min((t - a) / r, (b - t) / r)));
const a112Pulse = (t, a, d) => (t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0);
const a112Nods = (t, list, d = 0.35, amp = 6) => list.reduce((s, a) => s + amp * a112Pulse(t, a, d), 0);
const a112Pop = (t, a, d = 0.3) => K.ease.back(K.clamp((t - a) / d));
const A112_BROWN = '#8a5a2b', A112_BROWND = '#5b3a1e', A112_SILVER = '#eef2fa', A112_PAPER = '#fff3d6', A112_NIGHT = '#1a2a6c';
const A112_KHOR = { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red };
// timed value track: keys [[t0, v, dur]] -> eases from the previous value over dur (default 0.3) starting at t0. v: number, array or fn(t)
function a112Tr(t, keys, d0 = 0.3) {
  const val = (v) => (typeof v === 'function' ? v(t) : v);
  let cur = val(keys[0][1]);
  for (let i = 1; i < keys.length; i++) {
    const [t0, v, d] = keys[i]; if (t < t0) break;
    const u = K.ease.inOut(K.clamp((t - t0) / (d ?? d0))), nv = val(v);
    cur = Array.isArray(cur) ? cur.map((c, j) => K.lerp(c, nv[j], u)) : K.lerp(cur, nv, u);
  }
  return cur;
}
// step value: the last key at or before t
function a112Step(t, keys) { let v = keys[0][1]; for (const [t0, x] of keys) if (t >= t0) v = x; return v; }

// ---------- person rig: body-local <-> world for the Library person (costumed path) ----------
const A112_SH = -132;
const a112Age = (P) => P.child ? 0 : (P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3);
const a112S = (P) => (P.s || 1) * (P.child ? 0.62 : 1);
function a112Off(P) {
  const sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0); let hc = [0, -75];
  if (sit > 0) { const S = P.seat === 'floor' ? [0, -24] : [-22, -52]; hc = [K.lerp(0, S[0], sit), K.lerp(-75, S[1], sit)]; }
  if (kn > 0) hc = [K.lerp(hc[0], -4, kn), K.lerp(hc[1], -48, kn)];
  return [hc[0], hc[1] + 75];
}
const a112Lean = (P) => (P.lean || 0) + a112Age(P) * 0.12;
function a112Loc(P, w) {
  const s = a112S(P), dir = P.dir || 1, off = a112Off(P), lean = a112Lean(P); let lx = (w[0] - P.x) / (s * dir) - off[0], ly = (w[1] - P.y) / s - off[1];
  if (lean) { const c = Math.cos(-lean), n = Math.sin(-lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  return [lx, ly];
}
function a112W(P, l) {
  const s = a112S(P), dir = P.dir || 1, off = a112Off(P), lean = a112Lean(P); let [lx, ly] = l;
  if (lean) { const c = Math.cos(lean), n = Math.sin(lean), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  lx += off[0]; ly += off[1]; let wx = P.x + lx * s * dir, wy = P.y + ly * s;
  const sq = P.sq ?? 1, tip = P.tip || 0;
  if (sq !== 1) { wx = P.x + (wx - P.x) * (1 + (1 - sq) * 0.7); wy = P.y + (wy - P.y) * sq; }
  if (tip) { const a = tip * Math.sign(dir), dx = wx - P.x, dy = wy - P.y; wx = P.x + dx * Math.cos(a) - dy * Math.sin(a); wy = P.y + dx * Math.sin(a) + dy * Math.cos(a); }
  return [wx, wy];
}
const a112HeadL = (P) => [(P.look || 0) * 4, -195 + (P.drop || 0) + a112Age(P) * 6 - (P.child ? 9 : 0)];
const a112Head = (P) => a112W(P, a112HeadL(P));
const a112Eye = (P) => a112W(P, [a112HeadL(P)[0] + 13, a112HeadL(P)[1] - 4]);
function a112HandL(sd, ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, A112_SH + Math.cos(ang[0]) * 38]; return [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
function a112AngOf(P, side) { const sd = side === 'L' ? -1 : 1, a = side === 'L' ? P.aL : P.aR, h = side === 'L' ? P.handL : P.handR, hw = side === 'L' ? P.handLW : P.handRW;
  return a || (h && armTo(sd, A112_SH, h)) || (hw && armTo(sd, A112_SH, a112Loc(P, hw))) || [0.12, 0.05]; }
const a112HandW = (P, side) => a112W(P, a112HandL(side === 'L' ? -1 : 1, a112AngOf(P, side)));
// arm track: keys [[t0, target, dur]]; target = body-local [x, y], {w: [x, y]} (world), {a: [a0, a1]} (angles), or fn(t) returning one
function a112Ang(P, sd, v) { if (v.a) return v.a; return armTo(sd, A112_SH, v.w ? a112Loc(P, v.w) : v); }
function a112Arm(t, P, sd, keys) { return a112Tr(t, keys.map(([t0, v, d]) => [t0, (tt) => a112Ang(P, sd, typeof v === 'function' ? v(tt) : v), d])); }
const A112H = { rest: [36, -84], restL: [-36, -84], chest: [4, -120], chestL: [-4, -120], chin: [16, -160], ear: [42, -200], mouth: [34, -178], up: [44, -205], fwd: [100, -150], fwdL: [-100, -150],
  palm: [70, -112], palmL: [-70, -112], low: [80, -84], head: [40, -212], headL: [-40, -212], hip: [40, -82], hipL: [-40, -82], foldL: [22, -105], foldR: [-18, -112], wave: [64, -196],
  raise: { a: [2.35, 2.7] }, raiseL: { a: [-2.35, -2.7] }, cover: [10, -172], back: [-30, -96], tap: [40, -128], fist: [18, -140] };
const a112Mir = (v) => [-v[0], v[1]];
// gaze from the head of P to a world point plan [[t, pt]]
function a112Look(t, P, plan, ease = 0.18) { let i = 0; while (i + 1 < plan.length && plan[i + 1][0] <= t) i++; const pl = plan.slice(Math.max(0, i - 2), i + 1).map(([a, p]) => [a, typeof p === 'function' ? p(t) : p]); return lookAt(a112Head(P), gazePlan(t, pl, ease)); }
// walking from an x function (and optional y function): legs from the distance travelled, amplitude from the speed
function a112Walk(xf, t, stride = 26, yf = null) { const h = 0.05, x = xf(t), v = Math.abs(xf(t + h) - xf(t - h)) / (2 * h); return { x, ph: x / stride, amp: K.clamp(v / 70), ...(yf ? { y: yf(t) } : {}) }; }

// ---------- headwear drawn by the story (crooked turban, judge's turban, guard helmet) ----------
// a112Hat(ctx, P, kind, o): draws the headwear on P's head with offsets o.dx, o.dy (head units), o.rot; kind 'scholar' | 'judge' | 'helmet'
function a112Hat(ctx, P, kind, o = {}) {
  const h = a112Head(P), s = a112S(P) * (P.child ? 1.25 : 1), dir = P.dir || 1, rot = (P.tilt || 0) * dir + a112Lean(P) * dir + (P.tip || 0) * Math.sign(dir) + (o.rot || 0) * dir;
  ctx.save(); ctx.translate(h[0], h[1]); ctx.rotate(rot); ctx.scale(s * dir, s * (P.sq ?? 1)); ctx.translate((o.dx || 0), (o.dy || 0));
  a112HatShape(ctx, kind, o); ctx.restore();
}
// hat shapes in head units (head centre at 0, 0; head radius 36)
function a112HatShape(ctx, kind, o = {}) {
  const lo = (seed, hd) => ({ lw: 5, seed, dot: hd || C.blue, pitch: 7, rad: 0.2, da: 0.4 });
  if (kind === 'scholar') { const tl = o.tail ?? 0; seg(ctx, -26, -30, -44 - 6 * tl, 24 + 10 * Math.abs(tl), 12, C.white, 4); shape(ctx, ell(0, -31, 38, 14, 24), C.white, lo(16)); shape(ctx, ell(4, -44, 24, 11, 20), C.white, lo(17)); }
  else if (kind === 'judge') { const k = o.k ?? 1;   // the oversized judge's turban (k = size factor)
    ctx.save(); ctx.scale(k, k); shape(ctx, ell(0, -42, 60, 36, 32), C.white, lo(18, '#b9b4c6'));
    ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const j of [0, 1, 2]) { ctx.beginPath(); ctx.ellipse(0, -28 - j * 14, 54 - j * 8, 13, -0.12, 0.1, Math.PI - 0.4); ctx.stroke(); } ctx.restore();
    shape(ctx, ell(0, -74, 22, 12, 16), NAVY, { lw: 4, seed: 19 }); shape(ctx, ell(18, -40, 8, 9, 12), C.yellow, { lw: 3, seed: 20 }); ctx.restore(); }
  else if (kind === 'helmet') { const col = o.col || C.red;
    // (v2: the neck cloth is drawn only behind the head by a112HelmetBack, so the face stays visible)
    shape(ctx, [[-40, -18], [-36, -46], [-14, -66], [0, -86], [14, -66], [36, -46], [40, -18], [-40, -18]], STONE2, { lw: 5, seed: 65, dot: STONED, pitch: 7, rad: 0.2, da: 0.4 });
    seg(ctx, -40, -20, 40, -20, 9, C.yellow, 3); seg(ctx, 0, -86, 0, -100, 5, C.yellow, 2); shape(ctx, ell(0, -48, 7, 8, 10), col, { lw: 3, seed: 66 }); }
}
// the neck cloth of the helmet must sit behind the head: drawn first (back layer)
function a112HelmetBack(ctx, P, col) {
  const h = a112Head(P), s = a112S(P), dir = P.dir || 1; ctx.save(); ctx.translate(h[0], h[1]); ctx.scale(s * dir, s);
  shape(ctx, [[-46, -10], [46, -10], [52, 44], [-52, 44], [-46, -10]], col, { lw: 4, seed: 64, dot: C.black, pitch: 7, rad: 0.15, da: 0.3 }); ctx.restore();
}

// ---------- props ----------
// purse: drawstring coin purse. Origin = the neck (cord) point; the bag hangs below it. 110 x 120 at s 1 when full.
// o: s, fill 0..1 (0 limp sock .. 1 round), open 0..1, bow 0..1, rot, sq, sw (tassel swing, radians), glow 0..1, rayK (glow size factor), flop (limp bend -1..1)
function a112Purse(ctx, x, y, o = {}) {
  const s = o.s ?? 1, f = K.clamp(o.fill ?? 1), op = K.clamp(o.open || 0), sw = o.sw || 0, fl = o.flop ?? 0.4;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.sqx ?? (1 + (1 - (o.sq ?? 1)) * 0.6)), s * (o.sq ?? 1));
  const W = K.lerp(26, 56, f), Hh = K.lerp(104, 116, f), bend = (1 - f) * fl * 26;
  const body = [[-14, 0], [-W * 0.7, 16], [-W, 52 + (1 - f) * 10], [-W * 0.86 + bend, Hh - 14], [bend * 1.4, Hh], [W * 0.86 + bend, Hh - 14], [W, 52 + (1 - f) * 10], [W * 0.7, 16], [14, 0]];
  shape(ctx, [...body, body[0]], A112_BROWN, { lw: 5, seed: 401, dot: C.red, pitch: 8, rad: 0.22, da: 0.45 });
  if (f > 0.5) { ctx.save(); ctx.globalAlpha = (f - 0.5) * 1.2; ctx.lineWidth = 3; ctx.strokeStyle = A112_BROWND; ctx.beginPath(); ctx.moveTo(-W * 0.4, 30); ctx.quadraticCurveTo(-W * 0.55, 70, -W * 0.3, 100); ctx.moveTo(W * 0.35, 34); ctx.quadraticCurveTo(W * 0.5, 72, W * 0.25, 98); ctx.stroke(); ctx.restore(); }
  // frilled top above the cord, or the open mouth
  if (op > 0.05) { const mw = K.lerp(16, 46, op), mh = K.lerp(4, 14, op), rk = o.rayK ?? 1;
    if (o.glow) { ctx.save(); ctx.globalAlpha = 0.5 * o.glow; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(0, -10, 60 * op * rk, 0, 7); ctx.fill(); ctx.restore(); for (let i = 0; i < 7; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 6); seg(ctx, Math.cos(a) * 40 * op * rk, -6 + Math.sin(a) * 40 * op * rk, Math.cos(a) * 64 * op * rk, -6 + Math.sin(a) * 64 * op * rk, 5, C.yellow, 2); } }
    shape(ctx, ell(0, -4, mw, mh, 20), A112_BROWND, { lw: 4, seed: 402 });
    if (f > 0.05) for (let i = 0; i < 4; i++) shape(ctx, ell(-mw * 0.5 + i * mw * 0.33, -4 - (i % 2) * 3, 8 * op, 4 * op, 10), A112_SILVER, { lw: 2.5, seed: 403 + i }); }
  else shape(ctx, [[-14, 0], [-22, -14], [-10, -22], [0, -16], [10, -22], [22, -14], [14, 0], [-14, 0]], A112_BROWN, { lw: 4, seed: 404 });
  // cord and tassels
  seg(ctx, -16, -1, 16, -1, 6, C.yellow, 2.5);
  for (const sd of [-1, 1]) { const a = sw + sd * 0.25, ex = 16 * sd + Math.sin(a) * 30, ey = Math.cos(a) * 30; ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(14 * sd, 0); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore(); shape(ctx, [[ex - 5, ey], [ex + 5, ey], [ex + 7, ey + 14], [ex - 7, ey + 14], [ex - 5, ey]], C.yellow, { lw: 2.5, seed: 405 }); }
  // gift bow
  const b = K.ease.back(K.clamp(o.bow || 0)); if (b > 0) { ctx.save(); ctx.scale(b, b);
    for (const sd of [-1, 1]) shape(ctx, [[0, -2], [sd * 30, -22], [sd * 38, -4], [sd * 30, 12], [0, -2]], C.red, { lw: 4, seed: 406, dot: '#a8160f', pitch: 6, rad: 0.2, da: 0.4 });
    for (const sd of [-1, 1]) shape(ctx, [[sd * 2, 2], [sd * 18, 34], [sd * 8, 30], [sd * 2, 2]], C.red, { lw: 3, seed: 407 }); shape(ctx, ell(0, -2, 9, 9, 12), C.red, { lw: 3.5, seed: 408 }); ctx.restore(); }
  ctx.restore();
}
// silver dirham, spin = cos of the rotation (1 = face on)
function a112Coin(ctx, x, y, r = 12, spin = 1) {
  const sx = Math.max(0.12, Math.abs(spin)); ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1);
  shape(ctx, ell(0, 0, r, r, 16), A112_SILVER, { lw: 3, seed: 410 }); ctx.lineWidth = 2; ctx.strokeStyle = '#8c8a94'; ctx.beginPath(); ctx.arc(0, 0, r * 0.6, Math.PI * 1.1, Math.PI * 1.7); ctx.stroke(); ctx.restore();
}
// coin flight on an arc from a to b between t0 and t0 + d (draws nothing outside); returns true when landed
function a112CoinArc(ctx, t, t0, d, a, b, h = 80, r = 11) { if (t < t0) return false; const u = K.clamp((t - t0) / d); if (u >= 1) return true; a112Coin(ctx, K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - h * Math.sin(Math.PI * u), r, Math.cos((t - t0) * 16)); return false; }
// scroll / bill: strip hanging from its top roll at (x, y). o: s, len 0..1 of L, L (420), w (70), lines, stamp 0..1 ('PAID'), seal 0..1, portrait 0..1, rot, roll (bottom roll)
function a112Scroll(ctx, x, y, o = {}) {
  const s = o.s ?? 1, w = o.w ?? 70, L = (o.L ?? 420) * K.clamp(o.len ?? 1), hw = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (L > 4) { shape(ctx, [[-hw, 0], [hw, 0], [hw + (o.curl || 0), L], [-hw + (o.curl || 0), L], [-hw, 0]], A112_PAPER, { lw: 4, seed: 412 });
    if (o.lines !== false) { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#8c8a94'; for (let yy = 22; yy < L - 14; yy += 18) { ctx.beginPath(); ctx.moveTo(-hw + 10, yy); ctx.lineTo(hw - 10 - ((yy * 7) % 17), yy); ctx.stroke(); } ctx.restore(); }
    if (o.portrait > 0) { const k = K.ease.back(K.clamp(o.portrait)); ctx.save(); ctx.translate(0, Math.min(L * 0.42, 70)); ctx.scale(k, k); ctx.fillStyle = A112_PAPER; ctx.fillRect(-hw + 4, -42, w - 8, 84);
      ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 4, 20, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-2, -16, 22, 9, -0.25, 0, 7); ctx.stroke();   // face and crooked turban
      ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(-7, 2, 2.6, 0, 7); ctx.arc(7, 2, 2.6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10, 22); ctx.quadraticCurveTo(0, 42, 10, 22); ctx.stroke(); ctx.restore(); }
    if (o.stamp > 0) { const k = K.ease.back(K.clamp(o.stamp)), sy = Math.min(L - 40, 90); ctx.save(); ctx.translate(0, sy); ctx.rotate(-0.25); ctx.scale(k * 1.0, k); ctx.lineWidth = 4; ctx.strokeStyle = C.red; ctx.strokeRect(-36, -16, 72, 32); ctx.font = K.font(28, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('PAID', 0, 2); ctx.restore(); }
    if (o.seal > 0) { const k = K.ease.back(K.clamp(o.seal)); ctx.save(); ctx.translate(0, L - 26); ctx.scale(k, k); shape(ctx, ell(0, 0, 18, 18, 14), C.red, { lw: 3.5, seed: 413, dot: '#a8160f', pitch: 5, rad: 0.25 }); star(ctx, 0, 0, 8, C.yellow); ctx.restore(); }
    seg(ctx, -hw - 6 + (o.curl || 0), L, hw + 6 + (o.curl || 0), L, 12, A112_PAPER, 3.5); }
  seg(ctx, -hw - 8, 0, hw + 8, 0, 14, '#c58a18', 4);
  ctx.restore();
}
// travel bundle (cloth bindle with a knot), centre (x, y)
function a112Bundle(ctx, x, y, s = 1, sq = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * (2 - sq), s * sq);
  shape(ctx, ell(0, 0, 38, 30, 22), '#e8742a', { lw: 5, seed: 420, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, [[-6, -28], [6, -28], [14, -44], [0, -36], [-14, -44], [-6, -28]], '#e8742a', { lw: 3.5, seed: 421 }); ctx.restore();
}
function a112Loaf(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, 0, 22, 14, 18), '#e0a040', { lw: 4, seed: 425, dot: '#a8601a', pitch: 6, rad: 0.2, da: 0.4 }); for (const dx of [-8, 3]) seg(ctx, dx, -8, dx + 6, 6, 2.5, C.black, 0); ctx.restore(); }
// wicker basket (base centre at x, y), fill 0..1 loaves
function a112Basket(ctx, x, y, fill = 0, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const n = Math.round(fill * 4); for (let i = 0; i < n; i++) a112Loaf(ctx, -18 + (i % 3) * 18, -34 - Math.floor(i / 3) * 12, 0.8);
  shape(ctx, [[-40, -36], [40, -36], [30, 0], [-30, 0], [-40, -36]], '#c58a18', { lw: 4.5, seed: 426, dot: '#7a4212', pitch: 6, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -36, 34, Math.PI, 0); ctx.stroke(); ctx.restore(); ctx.restore();
}
function a112Moth(ctx, x, y, t) { const f = Math.sin(t * 30) * 0.6; ctx.save(); ctx.translate(x, y);
  for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 16, -12 - 8 * f], [sd * 20, 4], [0, 4]], '#c9bfa6', { lw: 2.5, seed: 430 }); seg(ctx, 0, -6, 0, 8, 4, C.black, 0); ctx.restore(); }
// a loose judge's turban on a red cushion (base centre x, y)
function a112TurbanCushion(ctx, x, y, s = 1, hat = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-66, 0], [-60, -28], [60, -28], [66, 0], [-66, 0]], C.red, { lw: 5, seed: 432, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
  for (const sd of [-1, 1]) shape(ctx, [[sd * 62, -6], [sd * 76, 6], [sd * 70, -18], [sd * 62, -6]], C.yellow, { lw: 3, seed: 433 });
  if (hat) { ctx.translate(0, 26); a112HatShape(ctx, 'judge', { k: 1.15 }); } ctx.restore(); }
// spear: from the hand (x, y) down to the butt and up to the blade; dir sets the lean
function a112Spear(ctx, hx, hy, s = 1, lean = 0.05, len = 330) {
  const ux = Math.sin(lean), uy = -Math.cos(lean), bx = hx - ux * 120 * s, by = hy - uy * 120 * s, tx = hx + ux * (len - 120) * s, ty = hy + uy * (len - 120) * s;
  seg(ctx, bx, by, tx, ty, 9 * s, '#a8741a', 3.5);
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(lean); ctx.scale(s, s); shape(ctx, [[0, -46], [12, -14], [6, 0], [-6, 0], [-12, -14], [0, -46]], STONE2, { lw: 4, seed: 435, dot: STONED, pitch: 6, rad: 0.2 }); seg(ctx, -10, 2, 10, 2, 6, C.red, 2); ctx.restore();
}
// a small comic story box (panel) with an icon drawer
function a112StoryBox(ctx, x, y, w, h, p, draw) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(-0.02);
  ctx.fillStyle = 'rgba(20,20,20,0.9)'; ctx.fillRect(-w / 2 + 7, -h / 2 + 7, w, h); shape(ctx, K.rectPts(-w / 2, -h / 2, w, h), C.white, { lw: 6, seed: 440 }); ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); draw(ctx); ctx.restore(); ctx.restore(); }
// signpost with one board
function a112Sign(ctx, x, y, text, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); seg(ctx, 0, 0, 0, -170, 12, WOOD, 4); shape(ctx, [[-20, -170], [120, -170], [146, -146], [120, -122], [-20, -122], [-20, -170]], C.white, { lw: 5, seed: 442 });
  ctx.font = K.font(36, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(text, 60, -144); ctx.restore(); }
// a big red X in two strokes (p 0..1)
function a112Cross(ctx, x, y, r, p) { const a = K.clamp(p * 2), b = K.clamp(p * 2 - 1); if (a > 0) seg(ctx, x - r, y - r, K.lerp(x - r, x + r, a), K.lerp(y - r, y + r, a), 18, C.red, 4); if (b > 0) seg(ctx, x + r, y - r, K.lerp(x + r, x - r, b), K.lerp(y - r, y + r, b), 18, C.red, 4); }
// question mark lettering
function a112Q(ctx, x, y, p, size = 80, rot = 0) { sfx(ctx, '?', x, y, size, p, { fill: C.white, rot }); }
// a wipe panel in panel space (W x H): p 0..1, fully covered at 0.5
function a112Wipe(ctx, W, H, p, col = C.yellow) {
  if (p <= 0 || p >= 1) return; const slant = 0.3 * H; let a, b;
  if (p < 0.5) { const k = K.ease.inOut(p / 0.5); a = K.lerp(W + slant, -slant, k); b = W + slant * 2; } else { const k = K.ease.inOut((p - 0.5) / 0.5); a = -slant * 2; b = K.lerp(W + slant, -slant, k); }
  const poly = [[a + slant, -10], [b + slant, -10], [b, H + 10], [a, H + 10]];
  ctx.save(); ctx.fillStyle = col; K.poly(ctx, poly, true); ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 14, 0.3); ctx.fillRect(0, 0, W, H); ctx.restore();
  for (const e of [a, b]) { ctx.save(); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(e + slant, -10); ctx.lineTo(e, H + 10); ctx.stroke(); ctx.restore(); }
}
// home furniture (drawn by the story: a poor scholar's room)
const A112_DESK = { x0: 390, x1: 600, top: 792, cx: 495 };
function a112Desk(ctx, t, dip = 0) { const D = A112_DESK, y = D.top + dip;
  for (const lx of [D.x0 + 18, D.x1 - 18]) seg(ctx, lx, y + 16, lx, 900, 11, WOOD, 3.5);
  shape(ctx, K.rectPts(D.x0, y, D.x1 - D.x0, 18), A112_BROWN, { lw: 5, seed: 450, dot: A112_BROWND, pitch: 8, rad: 0.2, da: 0.4 }); }
function a112DeskLamp(ctx, x, y, lit, t) { shape(ctx, [[-26, 0], [26, 0], [34, -14], [-18, -18], [-26, 0]].map(([a, b]) => [x + a, y + b]), '#c8481a', { lw: 4, seed: 452 });
  if (lit > 0) { const fl = 1 + 0.12 * Math.sin(t * 17) + 0.06 * Math.sin(t * 29); ctx.save(); ctx.globalAlpha = 0.35 * lit; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(x + 32, y - 34, 46 * fl, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = lit; shape(ctx, [[x + 30, y - 16], [x + 38, y - 16], [x + 34, y - 46 * fl]], C.yellow, { lw: 3, seed: 453 }); ctx.restore(); } }
function a112HomeExtras(ctx, t, o = {}) {
  // bare shelf: two scrolls and one jar
  seg(ctx, 250, 470, 430, 470, 10, BARKY, 3.5); for (const bx of [270, 410]) seg(ctx, bx, 476, bx - 10, 500, 6, BARKY, 2.5);
  for (const [sx, c] of [[290, 0], [320, 1]]) { ctx.save(); ctx.translate(sx, 452); ctx.rotate(-0.1 * c); shape(ctx, K.rectPts(-16, -10, 32, 18), A112_PAPER, { lw: 3.5, seed: 455 + c }); ctx.restore(); }
  shape(ctx, [[384, 465], [378, 440], [388, 426], [404, 426], [414, 440], [408, 465]], '#c8481a', { lw: 4, seed: 457 });
  // peg for the purse
  seg(ctx, 738, 646, 768, 634, 9, WOOD, 3);
  // patched sleeping mat
  shape(ctx, [[700, 900], [710, 884], [950, 884], [944, 900], [700, 900]], '#c9a46a', { lw: 4, seed: 458, dot: '#a8741a', pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, K.rectPts(820, 885, 30, 12), C.blue, { lw: 3, seed: 459 });
}

// an open palm (fingers up) that closes into a fist: drawn over a person's hand at world (x, y). open 1 = flat palm, 0 = fist. s = figure scale, dir = facing
function a112Palm(ctx, x, y, open, s = 1, dir = 1) {
  const o = K.clamp(open); ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  for (let i = 0; i < 4; i++) { const fx = -9 + i * 6.5, L = K.lerp(5, 17 - Math.abs(i - 1.5) * 2.5, o); shape(ctx, K.rectPts(fx - 3.6, -10 - L, 7.2, L + 6), C.white, { lw: 3, seed: 600 + i, dot: C.skin, pitch: 5, rad: 0.3 }); }
  shape(ctx, [[10, -2], [10 + 12 * o, -10 - 4 * o], [14 + 10 * o, -6 - 2 * o], [14, 4], [10, -2]], C.white, { lw: 3, seed: 605, dot: C.skin, pitch: 5, rad: 0.3 });   // thumb
  shape(ctx, ell(0, 0, 14, 13, 14), C.white, { lw: 3.5, seed: 606, dot: C.skin, pitch: 5, rad: 0.3 });
  if (o < 0.5) { ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-6 + i * 6.5, -12); ctx.lineTo(-6 + i * 6.5, -6); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
}
