// ===== hoofed animals (added 2026-11-16, round 3): horse, donkey, camel, plus rideOn (a person on a mount) and packLoad (cargo). =====
// All side view, feet at (x, y), facing dir (+1 = screen right), the shared acting fields via registry.js.
// Legs: two-bone IK from each hip to a foot target, so a foot planted on the ground stays put while the body moves.
// Walk: Object.assign(P, walk(xf, t, { stride: GAIT.horse * s })). The figures use ph * dir internally, so with that stride
// a planted foot does not slide in either direction (amp >= 0.33 gives the full stride; amp 0 = standing).
// Source of sizes and fields: production/planned_assets.md (horse, donkey, camel, mountedRider, rideOn, camelLoad).

// ---------- shared pieces (namespaced so story scenes cannot collide with them) ----------
const BEAST = {
  TAU: Math.PI * 2,
  // gait(ph, off, R, h, amp): foot offset [dx, lift] for one leg. Stance (foot on the ground) sweeps dx from +R to -R linearly
  // over half a cycle, swing lifts it back. World stride per radian of ph = 2R / PI (times s): see GAIT.
  gait(ph, off, R, h, amp) { const e = K.clamp((amp || 0) * 3); if (e <= 0) return [0, 0]; let u = ((ph + off) / BEAST.TAU) % 1; if (u < 0) u += 1;
    if (u < 0.5) return [R * (1 - 4 * u) * e, 0]; const v = (u - 0.5) * 2; return [(-R + 2 * R * K.ease.inOut(v)) * e, h * Math.sin(Math.PI * v) * e]; },
  // bob(ph, amp, h): body rise and fall, two bumps per cycle
  bob(ph, amp, h = 3) { return K.clamp((amp || 0) * 3) * h * Math.cos(2 * ph); },
  // ik(H, F, a, b, bend): knee point for a two-bone leg from hip H to foot F (bend +1 = knee toward +x, -1 = toward -x)
  ik(H, F, a, b, bend) { const dx = F[0] - H[0], dy = F[1] - H[1], d = K.clamp(Math.hypot(dx, dy), Math.abs(a - b) + 1, a + b - 0.5), ang = Math.atan2(dy, dx), al = Math.acos(K.clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1)); const k = ang - bend * al; return [H[0] + Math.cos(k) * a, H[1] + Math.sin(k) * a]; },
  rot(p, A, c = [0, 0]) { const x = p[0] - c[0], y = p[1] - c[1], cs = Math.cos(A), sn = Math.sin(A); return [c[0] + x * cs - y * sn, c[1] + x * sn + y * cs]; },
  lp(a, b, f) { return [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)]; },
  // rounded box points (superellipse), for bodies
  rbox(cx, cy, rx, ry, p = 0.55, n = 36) { const out = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a); out.push([cx + rx * Math.sign(c) * Math.pow(Math.abs(c), p), cy + ry * Math.sign(s) * Math.pow(Math.abs(s), p)]); } return out; },
  // limb(ctx, H, Kn, F, o): upper and lower leg segments, then a hoof (o.hoof) or a paw (o.paw) at F (F is on the ground line)
  limb(ctx, H, Kn, F, o) { const hh = o.hoofH || 0; seg(ctx, H[0], H[1], Kn[0], Kn[1], o.w, o.col, o.ol ?? 4.5); seg(ctx, Kn[0], Kn[1], F[0], F[1] - hh, o.w2 ?? o.w * 0.8, o.col, o.ol ?? 4.5);
    if (o.knob) shape(ctx, ell(Kn[0], Kn[1], o.knob, o.knob, 12), o.col, { lw: 3.5, seed: 4 });
    if (o.hoof) { const hw = o.hw || 11; shape(ctx, [[F[0] - hw, F[1] - hh], [F[0] + hw, F[1] - hh], [F[0] + hw + 3, F[1]], [F[0] - hw - 2, F[1]], [F[0] - hw, F[1] - hh]], o.hoof, { lw: 3, seed: 3 }); }
    else if (o.paw) shape(ctx, ell(F[0] + (o.pawDx ?? 4), F[1] - (o.pawH ?? 6), o.pawW ?? 12, o.pawH ?? 7, 12), o.paw, { lw: 3, seed: 3 }); },
  // tube(ctx, pts, w0, w1, col, ol): tapered stroke along a polyline (tails, necks), black outline under the fill
  tube(ctx, pts, w0, w1, col, ol = 5) { const n = pts.length - 1, w = (i) => K.lerp(w0, w1, i / n);
    for (let i = 1; i <= n; i++) seg(ctx, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], w(i) + ol * 2, C.black, 0);
    for (let i = 1; i <= n; i++) seg(ctx, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], w(i), col, 0); },
  // line(ctx, pts, w, col): open stroke (outline of a joined part, reins, whiskers)
  line(ctx, pts, w = 5, col = C.black) { ctx.save(); ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore(); },
  eyeX(ctx, x, y, r = 8) { BEAST.line(ctx, [[x - r, y - r], [x + r, y + r]], 5); BEAST.line(ctx, [[x - r, y + r], [x + r, y - r]], 5); },
  brow(ctx, x, y, b, len = 22) { BEAST.line(ctx, [[x - len / 2, y - b * 2], [x + len / 2, y + b * 5]], 6); },
  // side-view mouth at the muzzle: (x0, y0) corner .. (x1, y1) front. m: closed | smile | smirk | frown | o | open | grit; o = open amount (talk, bray)
  mouth(ctx, x0, y0, x1, y1, m, o, tongue) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5;
    if (o > 0.02 || m === 'open') { const k = Math.max(o, m === 'open' ? 1 : 0); shape(ctx, [[x0, y0], [x1, y1 - 2], [x1 - 6, y1 + 6 + k * 22], [x0 + 6, y0 + 6 + k * 10]], C.black, { lw: 3, seed: 3 });
      ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, y0 + 6 + k * 12, Math.abs(x1 - x0) * 0.32, 3 + k * 4, 0, 0, 7); ctx.fill();
      if (k > 0.5) { ctx.fillStyle = C.white; ctx.fillRect(K.lerp(x0, x1, 0.55), y1 - 1, 8, 7); ctx.fillRect(K.lerp(x0, x1, 0.75), y1 - 2, 8, 7); } }
    else if (m === 'smile' || m === 'smirk') { ctx.beginPath(); ctx.moveTo(x0 - 4, y0 - 6); ctx.quadraticCurveTo(x0 + 6, y0 + 6, x1, y1); ctx.stroke(); if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(x0 - 4, y0 - 6); ctx.lineTo(x0 - 9, y0 - 10); ctx.stroke(); } }
    else if (m === 'frown') { ctx.beginPath(); ctx.moveTo(x0 - 2, y0 + 8); ctx.quadraticCurveTo(x0 + 10, y0 - 4, x1, y1); ctx.stroke(); }
    else if (m === 'o') shape(ctx, ell(K.lerp(x0, x1, 0.7), y1 + 4, 6, 7, 12), C.black, { lw: 2.5, seed: 3 });
    else if (m === 'grit') { shape(ctx, [[x0, y0 - 3], [x1, y1 - 4], [x1, y1 + 5], [x0, y0 + 5]], C.white, { lw: 3, seed: 3 }); for (let i = 1; i < 4; i++) BEAST.line(ctx, [[K.lerp(x0, x1, i / 4), K.lerp(y0, y1, i / 4) - 4], [K.lerp(x0, x1, i / 4), K.lerp(y0, y1, i / 4) + 5]], 2.5); }
    else { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }
    if (tongue) shape(ctx, [[x1 - 14, y1 + 2], [x1 + 8, y1 + 4], [x1 + 10, y1 + 18], [x1 - 6, y1 + 16]], '#f07a8a', { lw: 3, seed: 6 });
    ctx.restore(); },
  // world point of a figure-local point (feet at 0,0, before dir/s), including P.rot, P.shake and the acting tip/sq
  world(P, p, shx = 0) { const s = P.s || 1, dir = P.dir ?? 1, sg = Math.sign(dir || 1), sq = P.sq ?? 1; let q = [dir * s * p[0], s * p[1]]; if (P.rot) q = BEAST.rot(q, P.rot);
    q = [(q[0] + shx) * (1 + (1 - sq) * 0.7), q[1] * sq]; if (P.tip) q = BEAST.rot(q, P.tip * sg); return [P.x + q[0], P.y + q[1]]; },
};
// world stride per radian of ph at s = 1 (2R / PI). Use walk(xf, t, { stride: GAIT.<animal> * s }).
const GAIT = { horse: 2 * 46 / Math.PI, donkey: 2 * 38 / Math.PI, camel: 2 * 52 / Math.PI, cat: 2 * 22 / Math.PI, rat: 2 * 12 / Math.PI, sheep: 2 * 20 / Math.PI, bird: 2 * 9 / Math.PI };

// ---------- packLoad: cargo for a camel or donkey back, or on the ground ----------
// packLoad(ctx, items, x, y, s): items stacked upward from (x, y) (their bottom centre). An item is a name or {kind, col, w}:
// 'sack' (tied grain sack), 'chest' (banded chest), 'bolt' (rolled cloth, col), 'rug' (striped rolled rug), 'bindle' (bundle), 'jar' (water jar).
// Returns the y of the top of the stack.
function packLoad(ctx, items, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); let top = 0;
  (items || []).forEach((it, i) => { const k = typeof it === 'string' ? it : it.kind, col = (typeof it === 'object' && it.col) || null, dx = (i % 2 ? 8 : -6);
    if (k === 'sack') { shape(ctx, [[dx - 40, top], [dx - 44, top - 40], [dx - 26, top - 66], [dx - 12, top - 74], [dx + 2, top - 66], [dx + 30, top - 58], [dx + 44, top - 34], [dx + 40, top], [dx - 40, top]], col || CREAM, { lw: 4.5, seed: 70 + i, dot: SAND, pitch: 7, rad: 0.2, da: 0.5 }); seg(ctx, dx - 20, top - 64, dx + 2, top - 62, 4, EARTHD, 1.5); top -= 62; }
    else if (k === 'chest') { shape(ctx, [[dx - 46, top], [dx + 46, top], [dx + 46, top - 46], [dx - 46, top - 46], [dx - 46, top]], col || WOOD, { lw: 4.5, seed: 71 + i }); shape(ctx, [[dx - 46, top - 46], [dx + 46, top - 46], [dx + 40, top - 64], [dx - 40, top - 64], [dx - 46, top - 46]], col || WOOD, { lw: 4.5, seed: 72 + i });
      for (const bx of [-28, 28]) seg(ctx, dx + bx, top - 2, dx + bx, top - 62, 6, C.yellow, 2); shape(ctx, ell(dx, top - 44, 7, 7, 10), C.yellow, { lw: 3 }); top -= 64; }
    else if (k === 'bolt') { shape(ctx, [[dx - 50, top], [dx + 50, top], [dx + 50, top - 30], [dx - 50, top - 30], [dx - 50, top]], col || C.red, { lw: 4.5, seed: 73 + i, dot: C.black, pitch: 7, rad: 0.18, da: 0.25 }); shape(ctx, ell(dx + 50, top - 15, 8, 15, 12), col || C.red, { lw: 3.5, seed: 74 + i }); top -= 30; }
    else if (k === 'rug') { const pts = [[dx - 54, top], [dx + 54, top], [dx + 54, top - 26], [dx - 54, top - 26], [dx - 54, top]]; ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = col || C.red; ctx.fill(); ctx.clip(); ctx.fillStyle = C.yellow; for (let q = -54; q < 54; q += 22) ctx.fillRect(dx + q, top - 26, 7, 26); ctx.restore(); ink(ctx, pts, 4.5, 75 + i); top -= 26; }
    else if (k === 'bindle') { seg(ctx, dx - 50, top - 10, dx + 40, top - 34, 6, WOOD, 3); shape(ctx, ell(dx + 30, top - 40, 26, 22, 18), col || C.blue, { lw: 4.5, seed: 76 + i, dot: C.white, pitch: 7, rad: 0.25, da: 0.6 }); top -= 60; }
    else if (k === 'jar') { shape(ctx, [[dx - 22, top], [dx + 22, top], [dx + 32, top - 34], [dx + 18, top - 60], [dx + 12, top - 74], [dx - 12, top - 74], [dx - 18, top - 60], [dx - 32, top - 34], [dx - 22, top]], col || EARTH, { lw: 4.5, seed: 77 + i, dot: EARTHD, pitch: 7, rad: 0.2, da: 0.4 }); top -= 74; }
  });
  ctx.restore(); return y + top * s;
}

// ---------- horse and donkey: one equine rig (EQUINE tables), two drawings ----------
// palettes: body, dot (shading), far (far legs), mane, hoof, blaze (white face stripe), muzzle (donkey muzzle end), belly
const HORSE_PAL = [
  { body: C.white, dot: '#b9b4c6', far: '#d6d2e0', mane: '#3a3a4a', hoof: '#3a3a4a', muzzle: '#d6d2e0' },
  { body: '#a0581e', dot: '#6e3a12', far: '#7a4212', mane: C.black, hoof: '#2a2a33', blaze: C.white },
  { body: '#2e2e3a', dot: '#55556a', far: '#1d1d26', mane: '#0d0d12', hoof: '#55556a', blaze: C.white },
];
const DONKEY_PAL = [
  { body: '#9a94a8', dot: '#6f6a86', far: '#7d7790', mane: '#2a2a33', hoof: '#2a2a33', muzzle: CREAM, belly: '#d6d2e0' },
  { body: '#8a6a4a', dot: '#5b3a1e', far: '#6e5038', mane: '#2a1a10', hoof: '#2a1a10', muzzle: CREAM, belly: '#c9a77e' },
  { body: '#d6d2e0', dot: '#9a94a8', far: '#b9b4c6', mane: '#4a4a5a', hoof: '#4a4a5a', muzzle: C.white, belly: C.white },
];
// geometry at s 1 (feet at y 0, facing +x). neck: [base top, poll, throat, base bottom]; head: centre; headA: head angle (rad, nose down)
const EQUINE = {
  horse: { body: [0, -180, 115, 55], hipY: -150, fore: [60, 80], hind: [-96, -76], a: 74, b: 78, w: 24, w2: 17, hoofH: 14, hw: 11, R: 46, lift: 34,
    neckBase: [92, -205], neck: [[58, -228], [138, -294], [170, -246], [120, -170]], head: [178, -266], headA: 0.8, headS: [1, 1], ear: [40, 16], earDef: 0.75,
    mane: 6, maneL: 30, tail: [-112, -214], tailLen: 150, tailW: 30, seat: [-8, -238], lieDrop: 110, saddle: true, pal: HORSE_PAL },
  donkey: { body: [0, -155, 110, 60], hipY: -118, fore: [54, 72], hind: [-90, -72], a: 58, b: 62, w: 21, w2: 16, hoofH: 12, hw: 10, R: 38, lift: 28,
    neckBase: [84, -178], neck: [[54, -202], [126, -252], [152, -210], [106, -146]], head: [168, -222], headA: 0.62, headS: [1.12, 1.16], ear: [110, 30], earDef: 0.55,
    mane: 7, maneL: 18, tail: [-106, -188], tailLen: 100, tailW: 9, seat: [-6, -212], lieDrop: 84, saddle: false, pal: DONKEY_PAL },
};
// equineFrame(P, B): body transform shared by the drawing and its seat anchor
function equineFrame(P, B) {
  const dir = P.dir ?? 1, ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, rear = K.clamp(P.rear || 0), lie = K.clamp(P.lie || 0);
  const g = K.clamp(P.gallop ?? (amp > 1.4 ? (amp - 1.4) / 0.3 : 0)), e = K.clamp(amp * 3) * (1 - lie);
  const bob = BEAST.bob(ph, amp, 3) * (1 - g) * (1 - lie) + g * -14 * (0.5 + 0.5 * Math.cos(ph));
  const A = -0.61 * rear - g * 0.06 * Math.sin(ph), piv = rear > 0 ? [(B.hind[0] + B.hind[1]) / 2, 0] : [0, B.body[1]];
  return { ph, amp, e, g, rear, lie, A, piv, dy: bob + lie * B.lieDrop };
}
const equineT = (F, p) => { const q = BEAST.rot(p, F.A, F.piv); return [q[0], q[1] + F.dy]; };

// equine(ctx, P, B): shared horse/donkey drawing. See horse() and donkey() for the fields.
function equine(ctx, P, B) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = B.pal[P.pal || 0] || B.pal[0], F = equineFrame(P, B), T = (p) => equineT(F, p);
  const sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const shake = P.shake ? Math.sin(P.shake * 50) * 3 : 0;
  ctx.save(); ctx.translate(P.x + shake, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const sag = K.clamp(P.sag || 0), bray = K.clamp(P.bray || 0);
  // ----- legs: [hipX, phase offset, isFore, near] -----
  const legDefs = [[B.fore[0], 1.5 * Math.PI, true, false], [B.hind[0], Math.PI, false, false], [B.hind[1], 0, false, true], [B.fore[1], 0.5 * Math.PI, true, true]];
  const legs = legDefs.map(([hx, off, fore, near]) => {
    const H = T([hx, B.hipY]);
    let [dx, lift] = BEAST.gait(F.ph, off, B.R, B.lift, F.amp);
    if (F.g > 0) { const c = Math.cos(F.ph + (near ? 0 : 0.4)), gd = fore ? 55 * c + 12 : -55 * c - 12, gl = fore ? 26 * (0.5 + 0.5 * c) + 8 : 18 * (0.5 + 0.5 * c) + 6; dx = K.lerp(dx, gd, F.g); lift = K.lerp(lift, gl, F.g); }
    let Ft = [hx + 4 + dx, -lift];
    if (fore && F.rear > 0) Ft = BEAST.lp(Ft, [H[0] + 40, H[1] + 70], F.rear);
    if (fore && near && P.raise) Ft = BEAST.lp(Ft, [H[0] + 62, H[1] + 88], K.clamp(P.raise));
    let Kn = BEAST.ik(H, Ft, B.a, B.b, fore ? 1 : -1);
    if (F.lie > 0) { const fk = [hx + (fore ? 46 : 30), -10], ff = [hx + (fore ? -18 : 52), -7]; Kn = BEAST.lp(Kn, fk, F.lie); Ft = BEAST.lp(Ft, ff, F.lie); }
    return { H, Kn, F: Ft, near };
  });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: B.w, w2: B.w2, col: col(L.near ? pal.body : pal.far), hoof: col(pal.hoof), hoofH: B.hoofH, hw: B.hw });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // ----- body group (rotated for rear, lowered for lie, bobbing for walk) -----
  ctx.save(); ctx.translate(0, F.dy); ctx.translate(F.piv[0], F.piv[1]); ctx.rotate(F.A); ctx.translate(-F.piv[0], -F.piv[1]);
  // tail
  { const [tx, ty] = B.tail, up = (P.tailUp ?? 0) - sag * 0.5, sw = P.tailSwish || 0, L = B.tailLen;
    const pts = K.bezier([tx, ty], [tx - L * 0.32, ty - 8 - 40 * up], [tx - L * 0.36 + sw * 14, ty + L * 0.45 - 70 * up], [tx - L * 0.22 + sw * 30 - up * 40, ty + L * 0.95 - 120 * up], 12);
    if (B === EQUINE.horse) BEAST.tube(ctx, pts, B.tailW, 12, col(pal.mane), 4); else { BEAST.tube(ctx, pts, B.tailW, 6, col(pal.body), 3.5); const e2 = pts[pts.length - 1]; shape(ctx, [[e2[0] - 9, e2[1] - 10], [e2[0] + 9, e2[1] - 10], [e2[0] + 6, e2[1] + 22], [e2[0], e2[1] + 30], [e2[0] - 7, e2[1] + 22]], col(pal.mane), { lw: 3, seed: 8 }); } }
  const [bx, by, brx, bry] = B.body, bodyPts = BEAST.rbox(bx, by, brx, bry);
  shape(ctx, bodyPts, col(pal.body), sil ? { lw: 6, seed: 5 } : { lw: 7, seed: 5, dot: pal.dot, pitch: 9, rad: 0.16, da: 0.5 });
  if (pal.belly && !sil) shape(ctx, BEAST.rbox(bx + 4, by + bry * 0.45, brx * 0.72, bry * 0.42), pal.belly, { lw: 0 });
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  ctx.save(); ctx.translate(0, F.dy); ctx.translate(F.piv[0], F.piv[1]); ctx.rotate(F.A); ctx.translate(-F.piv[0], -F.piv[1]);
  // saddle cloth + saddle (horse default; P.saddle overrides)
  if ((P.saddle ?? B.saddle) && !sil) { const [sx, sy] = B.seat, cl = P.cloth || C.blue, tr = P.trim || C.yellow;
    shape(ctx, [[sx - 58, sy + 2], [sx + 50, sy + 2], [sx + 56, sy + 78], [sx - 64, sy + 78], [sx - 58, sy + 2]], cl, { lw: 4.5, seed: 41, dot: NAVY, pitch: 8, rad: 0.2, da: 0.4 });
    seg(ctx, sx - 62, sy + 70, sx + 54, sy + 70, 7, tr, 2.5);
    shape(ctx, [[sx - 44, sy + 6], [sx - 50, sy - 14], [sx - 34, sy - 8], [sx + 22, sy - 6], [sx + 34, sy - 18], [sx + 40, sy + 6], [sx - 44, sy + 6]], EARTH, { lw: 4.5, seed: 42 });
    seg(ctx, sx - 4, sy + 6, sx - 4, sy + 64, 4, EARTHD, 1.5); }
  if (P.load) packLoad(ctx, P.load, B.seat[0] - 4, B.seat[1] + 6, 0.9);
  // ----- neck + head group -----
  const turn = K.clamp(P.headTurn || 0), nA = 0.55 * K.clamp(P.headDown || 0) + 0.3 * sag - 0.35 * bray - 0.75 * turn + (P.neck || 0) * -0.3;
  ctx.save(); ctx.translate(B.neckBase[0], B.neckBase[1]); ctx.rotate(nA); ctx.translate(-B.neckBase[0], -B.neckBase[1]);
  const [n0, n1, n2, n3] = B.neck;
  shape(ctx, [n0, [K.lerp(n0[0], n1[0], 0.5) - 6, K.lerp(n0[1], n1[1], 0.5) - 8], n1, n2, [K.lerp(n2[0], n3[0], 0.5) + 6, K.lerp(n2[1], n3[1], 0.5)], n3, n0], col(pal.body), sil ? { lw: 0 } : { lw: 0, dot: pal.dot, pitch: 9, rad: 0.16, da: 0.5 });
  BEAST.line(ctx, [n0, [K.lerp(n0[0], n1[0], 0.5) - 6, K.lerp(n0[1], n1[1], 0.5) - 8], n1], 6.5); BEAST.line(ctx, [n2, [K.lerp(n2[0], n3[0], 0.5) + 6, K.lerp(n2[1], n3[1], 0.5)], n3], 6.5);
  // mane
  for (let i = 0; i < B.mane; i++) { const f = (i + 0.3) / B.mane, p = [K.lerp(n0[0], n1[0], f) - 6, K.lerp(n0[1], n1[1], f) - 6], L = B.maneL;
    const tipP = B === EQUINE.horse ? [p[0] - L * 0.8, p[1] - L * 0.35 + i * 2] : [p[0] - L * 0.25, p[1] - L];
    shape(ctx, [[p[0] - 12, p[1] + 6], tipP, [p[0] + 14, p[1] + 4], [p[0] + 4, p[1] + 12], [p[0] - 12, p[1] + 6]], col(pal.mane), { lw: 3, seed: 20 + i }); }
  // head frame
  const flip = turn > 0.5, fx = (flip ? -1 : 1) * (0.7 + 0.3 * Math.abs(1 - 2 * turn)), th0 = B.headA + 0.5 * K.clamp(P.headDown || 0) + 0.2 * sag - 1.0 * bray, th = flip ? -th0 : th0;
  const [hcx, hcy] = B.head, [hsx, hsy] = B.headS, HP = (p) => { const q = BEAST.rot([p[0] * hsx * fx, p[1] * hsy], th); return [hcx + q[0], hcy + q[1]]; };
  const earVal = (v, d) => K.clamp(v ?? (d - sag * 1.4 + bray * 0.3), -1, 1);
  const ear = (base, v, far) => { const E = HP(base), a = 3.805 + 0.905 * v + (th0 - B.headA) * (flip ? -1 : 1), d = [Math.cos(a), Math.sin(a)], pp = [-d[1], d[0]], [L, W] = B.ear;
    const tipP = [E[0] + d[0] * L, E[1] + d[1] * L], m1 = [E[0] + d[0] * L * 0.5 + pp[0] * W * 0.55, E[1] + d[1] * L * 0.5 + pp[1] * W * 0.55], m2 = [E[0] + d[0] * L * 0.5 - pp[0] * W * 0.55, E[1] + d[1] * L * 0.5 - pp[1] * W * 0.55];
    shape(ctx, [[E[0] + pp[0] * W * 0.4, E[1] + pp[1] * W * 0.4], m1, tipP, m2, [E[0] - pp[0] * W * 0.4, E[1] - pp[1] * W * 0.4]], col(far ? pal.far : pal.body), { lw: 4, seed: far ? 31 : 32 });
    if (!sil && B === EQUINE.donkey) { const tp2 = [E[0] + d[0] * L * 0.86, E[1] + d[1] * L * 0.86]; shape(ctx, [tp2, tipP, [tp2[0] + pp[0] * 6, tp2[1] + pp[1] * 6]], C.black, { lw: 0 }); } };
  ear([-36, -22], earVal(P.earL, B.earDef), true);
  ctx.save(); ctx.translate(hcx, hcy); ctx.rotate(th); ctx.scale(hsx * fx, hsy);
  const head = [[-50, -12], [-38, -28], [-10, -31], [25, -22], [50, -10], [57, 6], [48, 24], [14, 28], [-28, 22], [-50, 6], [-50, -12]];
  shape(ctx, head, col(pal.body), sil ? { lw: 0 } : { lw: 0, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  if (!sil && pal.muzzle) { ctx.save(); K.poly(ctx, head, true); ctx.clip(); ctx.fillStyle = pal.muzzle; ctx.beginPath(); ctx.ellipse(52, 8, 30, 30, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (!sil && pal.blaze) shape(ctx, [[-36, -22], [-22, -30], [48, -9], [50, 0], [-30, -14], [-36, -22]], pal.blaze, { lw: 0 });
  ink(ctx, head, 6, 33);
  if (!sil) {
    shape(ctx, ell(44, 0, 5, 4, 10), C.black, { lw: 0 });
    if ((P.saddle ?? B.saddle) || P.bridle) { BEAST.line(ctx, [[-34, -24], [-30, 18]], 5, C.red); BEAST.line(ctx, [[26, -22], [30, 24]], 5, C.red); BEAST.line(ctx, [[-32, -2], [28, 0]], 4, C.red); shape(ctx, ell(44, 16, 5, 5, 10), C.yellow, { lw: 2.5 }); }
    const o = Math.max(P.talk || 0, bray, (P.chew || 0) * 0.3);
    BEAST.mouth(ctx, 18, 18, 54, 14, P.mouth || 'closed', o, P.tongue);
    if (P.snort) { ctx.save(); ctx.globalAlpha *= K.clamp(P.snort); for (const [dx2, dy2, r] of [[66, 4, 7], [78, 0, 9], [92, -6, 11]]) shape(ctx, ell(dx2, dy2, r, r * 0.8, 12), C.white, { lw: 3, seed: 9 }); ctx.restore(); }
  }
  ctx.restore();
  if (!sil) { const E = HP([-22, -8]); eyeAt(ctx, E[0], E[1], P.eyes || 'open', 0.8); if (P.brow) BEAST.brow(ctx, E[0] + 2, E[1] - 16, P.brow); }
  ear([-26, -27], earVal(P.earR, B.earDef), false);
  ctx.restore();
  // reins: from the bit to the rider's hands (rideOn sets P.reins = [x, y] in body-local coordinates)
  if (P.reins && !sil) { const bit = BEAST.rot(HP([44, 16]), nA, B.neckBase), r = P.reins === true ? [B.seat[0] + 50, B.seat[1] - 44] : P.reins;
    BEAST.line(ctx, [bit, [K.lerp(bit[0], r[0], 0.5), Math.max(bit[1], r[1]) + 18], r], 3.5, '#5b3a1e'); }
  ctx.restore();
  ctx.restore();
}
// ===== horse. Riding horse for princes, hunters and messengers (planned_assets.md "horse"). =====
// About 320 wide, back 235 above the feet, head top 335 at s 1. pal 0 white (blue saddle cloth, yellow trim), 1 bay, 2 black.
// P: {x,y,s,dir,pal, ph,amp (walk; stride GAIT.horse * s), gallop 0..1 (or amp > 1.4), rear 0..1 (about the hind feet, forelegs tucked),
//     lie 0..1 (legs folded), raise 0..1 (near foreleg up: tap, point), headDown 0..1 (graze), headTurn 0..1 (looks back at the rider; flips at 0.5),
//     neck (-1 low .. 1 high), earL/earR (-1 flat back .. 1 up), tailUp, tailSwish (-1..1), saddle (default true), cloth, trim, bridle, reins,
//     load (packLoad items), eyes, brow, talk, mouth (closed, smile, smirk, frown, o, open, grit), chew, tongue, snort 0..1, sag 0..1, shake, rot, silhouette}
// Seat for a rider: mountSeat('horse', P) or rideOn(ctx, 'horse', P, personP).
function horse(ctx, P) { equine(ctx, P, EQUINE.horse); }
// ===== donkey. Farm and travel donkey (planned_assets.md "donkey"): long ears, white muzzle, spiky mane, tufted tail. =====
// Body 220 x 120, top 215 above the feet, ears 110 long at s 1. pal 0 grey, 1 brown, 2 pale. Same fields as horse plus:
// bray 0..1 (head back, mouth wide), sag 0..1 (sad: ears and head down, tail low). No saddle by default (saddle: true adds one).
function donkey(ctx, P) { equine(ctx, P, EQUINE.donkey); }

// ===== camel. One-humped comic camel (planned_assets.md "camel", "camel couch / rider"). =====
// About 400 wide x 370 tall at s 1 (hump top 300, head top 370), x at body centre. Pacing gait (the two legs of one side together).
// P: {x,y,s,dir,pal (0 sand, 1 brown, 2 white), ph,amp (stride GAIT.camel * s), kneel 0..1 (alias couch; 0-0.5 front legs fold,
//     0.5-1 rear legs fold, body 120 lower), headTurn 0..1, neck (-1 down to graze .. 1 up), chew 0..1, talk (grumble), mouth, ears (-1..1),
//     tailSwish, load (packLoad items on the hump; behind it when saddle), saddle (rug and seat on the hump), eyes, brow, shake, rot, silhouette}
const CAMEL_PAL = [{ body: SAND, dot: '#a8741a', far: '#b8862e', hoof: '#7a4212' }, { body: '#a0682a', dot: '#6e3a12', far: '#7a4a1a', hoof: '#4a2a10' }, { body: '#f2e6c8', dot: '#c9b48a', far: '#d6c8a6', hoof: '#8a6a4a' }];
const CAMELG = { cy: -225, hipY: -192, fore: [70, 88], hind: [-100, -82], a: 96, b: 98, R: 52, lift: 30, seat: [-14, -300], neckBase: [104, -236] };
function camelFrame(P) {
  const dir = P.dir ?? 1, ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, kn = K.clamp(P.kneel ?? P.couch ?? 0);
  const fF = K.clamp(kn * 2), fR = K.clamp(kn * 2 - 1), df = 120 * K.ease.inOut(fF), dr = 120 * K.ease.inOut(fR);
  return { ph, amp, kn, fF, fR, A: Math.atan2(df - dr, 190), dy: (df + dr) / 2 + BEAST.bob(ph, amp, 4) * (1 - kn), piv: [-5, CAMELG.cy] };
}
const camelT = (F, p) => { const q = BEAST.rot(p, F.A, F.piv); return [q[0], q[1] + F.dy]; };
function camel(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = CAMEL_PAL[P.pal || 0] || CAMEL_PAL[0], F = camelFrame(P), T = (p) => camelT(F, p), G = CAMELG;
  const sil = !!P.silhouette, col = (c) => (sil ? C.black : c), shake = P.shake ? Math.sin(P.shake * 50) * 3 : 0;
  ctx.save(); ctx.translate(P.x + shake, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  // pacing: near fore + near hind together, far pair half a cycle later
  const defs = [[G.fore[0], Math.PI, true, false], [G.hind[0], Math.PI, false, false], [G.hind[1], 0, false, true], [G.fore[1], 0, true, true]];
  const legs = defs.map(([hx, off, fore, near]) => { const H = T([hx, G.hipY]), [dx, lift] = BEAST.gait(F.ph, off, G.R, G.lift, F.amp * (1 - F.kn));
    let Ft = [hx + 4 + dx, -lift], Kn = BEAST.ik(H, Ft, G.a, G.b, fore ? 1 : -1); const fold = fore ? F.fF : F.fR;
    if (fold > 0) { Kn = BEAST.lp(Kn, [hx + (fore ? 52 : 42), -14], fold); Ft = BEAST.lp(Ft, [hx + (fore ? -50 : -40), -10], fold); }
    return { H, Kn, F: Ft, near }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 20, w2: 15, col: col(L.near ? pal.body : pal.far), knob: 12, paw: col(pal.hoof), pawW: 20, pawH: 8, pawDx: 6 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  ctx.save(); ctx.translate(0, F.dy); ctx.translate(F.piv[0], F.piv[1]); ctx.rotate(F.A); ctx.translate(-F.piv[0], -F.piv[1]);
  // tail
  { const sw = P.tailSwish || 0, pts = K.bezier([-136, -238], [-160, -226], [-158 + sw * 10, -190], [-150 + sw * 26, -150], 10); BEAST.tube(ctx, pts, 9, 6, col(pal.body), 3.5); const e2 = pts[pts.length - 1]; shape(ctx, [[e2[0] - 8, e2[1] - 6], [e2[0] + 8, e2[1] - 6], [e2[0] + 4, e2[1] + 22], [e2[0] - 5, e2[1] + 20]], col('#5b3a1e'), { lw: 3, seed: 8 }); }
  // body + hump (hump drawn first so the body outline runs under it)
  const hump = [[-90, -258], [-70, -286], [-36, -302], [0, -300], [32, -282], [56, -256], [-90, -258]];
  shape(ctx, hump, col(pal.body), sil ? { lw: 6 } : { lw: 7, seed: 51, dot: pal.dot, pitch: 9, rad: 0.16, da: 0.5 });
  shape(ctx, BEAST.rbox(-5, G.cy, 140, 52, 0.7), col(pal.body), sil ? { lw: 6 } : { lw: 7, seed: 52, dot: pal.dot, pitch: 9, rad: 0.16, da: 0.5 });
  shape(ctx, [[-82, -262], [-60, -282], [-30, -296], [0, -294], [28, -278], [50, -258], [-82, -262]], col(pal.body), { lw: 0 });
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  ctx.save(); ctx.translate(0, F.dy); ctx.translate(F.piv[0], F.piv[1]); ctx.rotate(F.A); ctx.translate(-F.piv[0], -F.piv[1]);
  if (P.saddle && !sil) { shape(ctx, [[-78, -258], [-56, -290], [-14, -306], [26, -290], [48, -258], [52, -200], [-84, -200], [-78, -258]], P.cloth || C.red, { lw: 4.5, seed: 53, dot: C.black, pitch: 8, rad: 0.18, da: 0.3 });
    seg(ctx, -82, -208, 50, -208, 7, P.trim || C.yellow, 2.5); for (let i = 0; i < 6; i++) shape(ctx, ell(-74 + i * 24, -194, 5, 8, 8), P.trim || C.yellow, { lw: 2 });
    shape(ctx, [[-44, -300], [-50, -322], [-36, -314], [10, -314], [22, -326], [26, -302], [-44, -300]], EARTH, { lw: 4.5, seed: 54 }); }
  if (P.load) packLoad(ctx, P.load, P.saddle ? -104 : -16, P.saddle ? -262 : -298, 0.9);
  // neck + head
  const turn = K.clamp(P.headTurn || 0), nA = -(P.neck || 0) * ((P.neck || 0) < 0 ? 1.2 : 0.4) - 1.5 * K.ease.inOut(turn);
  ctx.save(); ctx.translate(G.neckBase[0], G.neckBase[1]); ctx.rotate(nA); ctx.translate(-G.neckBase[0], -G.neckBase[1]);
  BEAST.tube(ctx, K.bezier([96, -236], [176, -190], [196, -262], [204, -330], 14), 46, 30, col(pal.body), 5.5);
  const flip = turn > 0.5, fx = (flip ? -1 : 1) * (0.7 + 0.3 * Math.abs(1 - 2 * turn)), th = (flip ? -1 : 1) * 0.12;
  ctx.save(); ctx.translate(214, -344); ctx.rotate(th); ctx.scale(fx, 1);
  const ev = K.clamp(P.ears ?? 0.2, -1, 1);
  shape(ctx, [[-26, -16], [-40 - 8 * (1 - ev), -32 + 18 * (1 - ev)], [-22, -24]], col(pal.far), { lw: 3.5, seed: 55 });
  const head = [[-34, -18], [-18, -26], [14, -24], [40, -14], [56, -2], [54, 10], [36, 14], [0, 14], [-28, 10], [-38, -4], [-34, -18]];
  shape(ctx, head, col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 56, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  if (!sil) {
    const ch = P.chew || 0, tk = P.talk || 0, lip = 6 + tk * 10 + Math.abs(Math.sin(ch * 6)) * 4 * (ch > 0 ? 1 : 0);
    shape(ctx, [[14, 12], [52, 8], [50 + ch * 3, 14 + lip], [18, 16 + lip * 0.6], [14, 12]], col(pal.body), { lw: 4, seed: 57 });
    if (tk > 0.05 || P.mouth === 'open') shape(ctx, [[22, 14], [48, 11], [46, 13 + lip * 0.6], [24, 14 + lip * 0.4]], C.black, { lw: 0 });
    shape(ctx, ell(46, -4, 3, 6, 8), C.black, { lw: 0 });
    eyeAt(ctx, -6, -8, P.eyes || 'open', 0.8);
    BEAST.line(ctx, [[-16, -18], [-6, -21], [6, -18]], 5); // heavy upper lid line
    if (P.brow) BEAST.brow(ctx, -4, -26, P.brow);
    if (P.mouth === 'smile') BEAST.line(ctx, [[18, 14], [32, 18], [46, 12]], 3.5);
  }
  ctx.restore(); ctx.restore();
  ctx.restore();
  ctx.restore();
}

// ---------- seats and rideOn ----------
// mountSeat(name, P): world {x, y, rot} of the saddle point of a horse, donkey or camel drawn with P (follows walk bob, rear, kneel, lie, tip).
function mountSeat(name, P) {
  const s = P.s || 1, dir = P.dir ?? 1, sg = Math.sign(dir || 1);
  let local, A;
  if (name === 'camel') { const F = camelFrame(P); local = camelT(F, CAMELG.seat); A = F.A; }
  else { const B = EQUINE[name] || EQUINE.horse, F = equineFrame(P, B); local = equineT(F, B.seat); A = F.A; }
  const w = BEAST.world(P, local, P.shake ? Math.sin(P.shake * 50) * 3 : 0);
  return { x: w[0], y: w[1], rot: A * sg + (P.rot || 0) + (P.tip || 0) * sg, s };
}
// rideOn(ctx, mount, mountP, personP, o): draws the mount (window[mount]: 'horse', 'donkey', 'camel'), then a Library person seated on it:
// the person's hips sit on the saddle point (mountSeat), inherit its bob, rear and kneel angle; the figure is clipped at the saddle line
// and one leg hangs on the near side with a stirrup. personP: any person fields (costume, pal, talk, gaze, handL/handR...) plus
//   lurch (radians, forward; use lurch(t, tStop)), bob (extra lift), s (default the mount's s).
// Default hands hold the reins (handL/handR given by the scene win). o.reins: false to hide the reins. Returns the seat {x, y, rot}.
function rideOn(ctx, mount, mountP, personP = {}, o = {}) {
  const dir = mountP.dir ?? 1, sg = Math.sign(dir || 1), ps = personP.s ?? mountP.s ?? 1, reins = o.reins !== false && mount !== 'camel';
  const fn = typeof mount === 'function' ? mount : window[mount];
  fn(ctx, reins ? { ...mountP, reins: true } : mountP);
  const seat = mountSeat(typeof mount === 'string' ? mount : (o.name || 'horse'), mountP);
  const D = PEOPLE.dress(personP), pants = D.pants || D.robe;
  ctx.save(); ctx.translate(seat.x, seat.y - (personP.bob || 0) * ps); ctx.rotate(seat.rot + (personP.lurch || 0) * sg);
  // rider from the hips up (clipped at the saddle line)
  ctx.save(); ctx.beginPath(); ctx.rect(-400 * ps, -600 * ps, 800 * ps, 600 * ps + 4 * ps); ctx.clip();
  const hands = personP.handL || personP.handR || personP.aL || personP.aR || personP.handLW || personP.handRW ? {} : { handL: [34, -122], handR: [52, -118] };
  person(ctx, { ...hands, ...personP, x: 22 * sg * ps, y: 52 * ps, s: ps, dir: sg, sit: 1, seat: 'bench', lurch: undefined, bob: undefined });
  ctx.restore();
  // near leg hanging on the flank: thigh, shin, shoe, stirrup
  ctx.scale(sg * ps, ps);
  seg(ctx, 0, -4, 44, -8, 22, pants, 4.5); seg(ctx, 44, -8, 30, 74, 20, pants, 4.5);
  if (D.len === 'long' || D.len === 'knee') shape(ctx, [[-20, -14], [46, -20], [56, 8], [44, D.len === 'long' ? 60 : 30], [-4, D.len === 'long' ? 44 : 20], [-20, -14]], D.robe, D.dot ? { lw: 4.5, seed: 81, dot: D.dot, pitch: 9, rad: 0.3 } : { lw: 4.5, seed: 81 });
  BEAST.line(ctx, [[14, 2], [24, 86]], 4, '#5b3a1e');
  BEAST.line(ctx, [[14, 86], [16, 96], [42, 96], [44, 86]], 4.5, '#6f6a86');
  shape(ctx, ell(38, 82, 18, 10, 12), D.shoes === 'bare' ? C.skin : C.black, { lw: 3, seed: 3 });
  ctx.restore();
  return seat;
}
