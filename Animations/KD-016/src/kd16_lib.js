// ===== KD-016 story drawings (proposed for the Library, see library_proposals.md): heron, free chick, nest front rim,
// palmRiver set pieces (water, snag, reeds, distance ticks), windStreaks, fightCloud. All prefixed kd16 so no Library name is touched.

// ---------- heron (malik al-hazin): tall grey-blue wader, 330 tall at s 1, feet at (x, y), facing dir ----------
// P: {x, y, s, dir, neck 0..1 (0.2 folded S .. 1 stretched), headRot (+ = beak down), talk/beak 0..1, stab 0..1 (strike to the water),
//     wing 0..1 (near wing lifted as a hand: 0.5 up and back, 1 up and forward), tuck 0..1 (head goes under the wing; 1 = a feathered ball),
//     puff 0..1 (chest out), crest -1 flat .. 1 raised, plume (extra plume angle, for lag), ph/amp (wading), lift 0..1 (near leg up),
//     eyes, brow, bob, cross (eyes look at the beak tip)} + shared acting fields (gaze, lid, wet, sq, tip, alpha)
const KD16_HC = { body: '#8fa3c4', dot: C.blue, wing: '#6b7fa6', wingTip: '#3a4766', neck: C.white, cap: C.black, beak: C.yellow, legs: C.yellow };
function kd16HeronHead(P) {   // head centre in local units (before s/dir), also used by the scene for gaze and arrows
  const n = P.neck ?? 0.6, st = K.clamp(P.stab || 0), tk = K.ease.inOut(K.clamp(P.tuck || 0)), pf = P.puff || 0;
  let hx = K.lerp(62, 96, n) + pf * 6, hy = K.lerp(-262, -352, n) - pf * 4 + (P.bob || 0) * 0.5;
  hx = K.lerp(hx, 178, st); hy = K.lerp(hy, -30, st * st);
  const ux = K.lerp(hx, -12, tk), uy = K.lerp(hy, -214, tk) - 46 * Math.sin(Math.PI * tk) * (1 - tk * 0.3);
  return [ux, uy];
}
function kd16HeronHeadW(P) { const [hx, hy] = kd16HeronHead(P), s = P.s || 1, d = P.dir ?? 1; return [P.x + hx * s * d, P.y + hy * s]; }
function kd16Ik(hx, hy, fx, fy, L1, L2, side) {
  const dx = fx - hx, dy = fy - hy, d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.01), a = Math.atan2(dy, dx), c = K.clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1), b = Math.acos(c) * side;
  return [hx + Math.cos(a + b) * L1, hy + Math.sin(a + b) * L1];
}
let kd16Heron = function (ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = (P.ph || 0), amp = P.amp ?? 0, pf = K.clamp(P.puff || 0), tk = K.ease.inOut(K.clamp(P.tuck || 0)), bob = P.bob || 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  // legs (far, near). The joint half way bends backward like a real wader's ankle.
  const legs = [[-6, Math.PI, true], [8, 0, false]];
  for (const [lx, off, far] of legs) {
    const hip = [lx, -160 + bob]; let fx = lx + 4 + Math.sin(ph + off) * amp * 44, fy = -Math.max(0, Math.cos(ph + off)) * amp * 34;
    if (!far && P.lift) { fx = K.lerp(fx, lx + 6, P.lift); fy = K.lerp(fy, -92, P.lift); }
    const kn = kd16Ik(hip[0], hip[1], fx, fy, 84, 86, -1);
    const col = far ? '#d9a800' : KD16_HC.legs;
    seg(ctx, hip[0], hip[1], kn[0], kn[1], 7, col, 3); seg(ctx, kn[0], kn[1], fx, fy, 7, col, 3);
    for (const [tx, ty] of [[22, 2], [12, 4], [-12, 1]]) seg(ctx, fx, fy, fx + tx, fy + ty, 4, col, 2);
  }
  // tail feathers
  shape(ctx, [[-60, -214 + bob], [-112, -196 + bob], [-118, -180 + bob], [-58, -182 + bob]], KD16_HC.wingTip, { lw: 4, seed: 41 });
  // body
  const brx = 78 * (1 + 0.1 * pf) * (1 - 0.12 * tk), bry = 44 * (1 + 0.14 * pf) * (1 + 0.32 * tk);
  ctx.save(); ctx.translate(0, -200 + bob); ctx.rotate(-0.16 * (1 - tk));
  shape(ctx, ell(0, 0, brx, bry, 30), KD16_HC.body, { lw: 6, seed: 42, dot: KD16_HC.dot, pitch: 9, rad: 0.16, da: 0.45 });
  shape(ctx, ell(28 + pf * 8, 10, 40 + pf * 10, 24 + pf * 6, 20), '#c9d4e8', { lw: 0 });
  ctx.restore();
  // neck + head
  const [hx, hy] = kd16HeronHead(P), sx = 48 + pf * 4, sy = -224 + bob;
  const c1 = [sx + 30 * (1 - tk), sy - 18 - 10 * tk], c2 = [hx - 34 * (1 - tk) + 10 * tk, hy + 30 * (1 - tk)];
  const np = K.bezier([sx, sy], c1, c2, [hx, hy + 6], 24);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); np.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = C.black; ctx.lineWidth = 22; ctx.stroke(); ctx.strokeStyle = KD16_HC.neck; ctx.lineWidth = 12; ctx.stroke();
  ctx.strokeStyle = '#3a4766'; ctx.lineWidth = 3; ctx.setLineDash([5, 9]); ctx.stroke(); ctx.restore();
  if (tk < 0.995) {
    const st = K.clamp(P.stab || 0), hr = (P.headRot || 0) + st * 1.05 + tk * 2.0;
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(hr);
    const cr = K.clamp(P.crest ?? 0, -1, 1), pl = (P.plume || 0);
    for (const [k, l] of [[0, 62], [1, 50]]) { const a = Math.PI - 0.22 + cr * 0.62 + k * 0.16 + pl; seg(ctx, -16, -8, -16 + Math.cos(a) * l, -8 + Math.sin(a) * l, 4, C.black, 0); }
    const bl = 82 * (1 - 0.85 * tk), ob = K.clamp(P.beak ?? P.talk ?? 0, 0, 1.4);
    shape(ctx, [[14, -8], [14 + bl, -2 - ob * 8], [14, 2]], KD16_HC.beak, { lw: 3.5, seed: 43 });
    if (ob > 0.06) shape(ctx, [[14, 2], [12 + bl * 0.92, 4 + ob * 14], [14, 9]], '#e0a800', { lw: 3.5, seed: 44 });
    else seg(ctx, 16, 2, 14 + bl * 0.94, -1, 1, C.black, 0.6);
    shape(ctx, ell(0, 0, 24, 18, 22), C.white, { lw: 5, seed: 45 });
    shape(ctx, [[-22, -8], [-6, -18], [16, -16], [20, -10], [-2, -9], [-20, -1]], KD16_HC.cap, { lw: 0 });
    eyeAt(ctx, 7, -3, P.eyes || 'open', 0.7);
    if (P.brow) { ctx.save(); ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-4, -16 - P.brow * 2); ctx.lineTo(16, -13 + P.brow * 4); ctx.stroke(); ctx.restore(); }
    ctx.restore();
  }
  // near wing: a long feather blade; lifted it reads as a hand (rotation about the shoulder root)
  const wg = K.clamp(P.wing || 0, 0, 1.2), wa = wg * 1.95 - 0.12 * (1 - tk) - 0.05;
  ctx.save(); ctx.translate(36, -214 + bob); ctx.rotate(wa);
  const wl = 122 * (1 + 0.08 * tk), wh = 34 * (1 + 0.5 * tk);
  const wp = [[6, -8], [-30, -wh * 0.95], [-wl * 0.7, -wh * 0.7], [-wl, -4], [-wl * 0.72, wh * 0.55], [-30, wh * 0.85], [6, 10]];
  shape(ctx, wp, KD16_HC.wing, { lw: 5, seed: 46, dot: KD16_HC.wingTip, pitch: 8, rad: 0.16, da: 0.35 });
  for (const f of [0.55, 0.75]) seg(ctx, -wl * f, -wh * 0.3, -wl * f - 22, wh * 0.25, 2, KD16_HC.wingTip, 1.5);
  shape(ctx, [[-wl * 0.78, -wh * 0.5], [-wl, -4], [-wl * 0.78, wh * 0.4]], KD16_HC.wingTip, { lw: 0 });
  ctx.restore();
  ctx.restore();
};
kd16Heron = acting(kd16Heron, () => KD16_HC.neck);

// ---------- free chick (the nest chick as a standalone prop): falls, flaps stub wings, or shows as a tuft ----------
// o: {flap (radians phase, or null), rot, gx, gy, wide, open, cw, s, tuft (only the top shows, in a fox's jaws)}
function kd16Chick(ctx, x, y, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.dir || 1), s);
  if (o.tuft) { shape(ctx, ell(0, 0, 13, 9, 14), C.yellow, { lw: 3.5, seed: 3 }); for (const a of [-0.5, 0, 0.5]) seg(ctx, 0, -6, Math.sin(a) * 10, -16, 3, C.yellow, 1.8); ctx.restore(); return; }
  if (o.flap != null) for (const sd of [-1, 1]) { const a = sd * (0.6 + 0.6 * Math.sin(o.flap)); ctx.save(); ctx.translate(sd * 11, -2); ctx.rotate(a); shape(ctx, ell(sd * 8, 0, 9, 5, 10), '#ffe066', { lw: 3, seed: 6 }); ctx.restore(); }
  chickActing(ctx, 0, 0, o.i || 0, { gx: o.gx || 0, gy: o.gy || 0, wide: o.wide, open: o.open || 0, cw: o.cw || 0 });
  if (o.shut) { ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(4, -5, 7, 0, 7); ctx.fill(); seg(ctx, 0, -5, 8, -5, 1.5, C.black, 0.8); }
  ctx.restore();
}
// the front rim of nestDraw (same drawing), to put a sitting bird or chicks inside the nest: nestDraw, then the bird, then this
function kd16NestFront(ctx, x, y, nb = 1) {
  const hh = 38 * nb; ctx.save(); ctx.translate(x, y);
  shape(ctx, [[-62, -22], [-54, -22 - hh * 0.3 + 16], [-30, -4], [30, -4], [54, -22 - hh * 0.3 + 16], [62, -22], [50, 0], [-50, 0]], '#d9a441', { lw: 6, seed: 9, dot: '#6e4a0a', pitch: 8, rad: 0.18, da: 0.6 });
  for (let i = 0; i < 6; i++) seg(ctx, -40 + i * 16, -3, -34 + i * 16 + 8, -17, 4, '#f2d27a', 2);
  ctx.restore();
}

// ---------- palmRiver set pieces (world 1400 x 1230, ground 900, bank edge x 780, water surface 905) ----------
const KD16_W = { bank: 780, surf: 905, W: 1400, H: 1230 };
function kd16Land(ctx) {   // baked: ground on the left, bank slope, river bed and water body on the right
  ctx.drawImage(bake('kd16land', 1400, 1230, (c) => {
    shape(c, [[-10, 900], [790, 900], [840, 1230], [-10, 1230]], '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
    shape(c, [[-10, 892], [786, 892], [792, 922], [-10, 922]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 });
    for (let px = 4; px < 780; px += 26) seg(c, px, 892, px + 4, 878, 5, GREEN2, 2.5);
  }), 0, 0, 1400, 1230);
}
function kd16Water(ctx, t, o = {}) {   // the water body; o.front draws only the strip that hides legs (y >= surf + 6)
  const y0 = o.front ? KD16_W.surf + 7 : KD16_W.surf, x0 = KD16_W.bank - 6;
  ctx.drawImage(bake('kd16water' + (o.front ? 'F' : 'B'), 1400, 1230, (c) => {
    const pts = [[x0, y0], [1410, y0], [1410, 1240], [x0 + 60, 1240]];
    shape(c, pts, '#4a86f0', { lw: o.front ? 0 : 7, seed: 22, dot: C.blue, pitch: 10, rad: 0.24, da: 0.55 });
    if (o.front) { c.save(); c.lineWidth = 6; c.strokeStyle = C.black; c.beginPath(); c.moveTo(x0 + 2, y0); c.lineTo(1410, y0); c.stroke(); c.restore(); }
  }), 0, 0, 1400, 1230);
  // glints drifting right with the current
  for (let i = 0; i < 9; i++) { const gx = KD16_W.bank + 40 + ((i * 97 + t * 14) % 620), gy = KD16_W.surf + 24 + (i % 4) * 46; seg(ctx, gx, gy, gx + 26 + (i % 3) * 8, gy, 3, C.white, 0); }
}
function kd16Snag(ctx, x = 860, top = 620) {   // driftwood stump in the water with one fork; perch at (x, top)
  shape(ctx, [[x + 2, KD16_W.surf + 4], [x + 14, top + 90], [x + 4, top + 10], [x - 10, top + 6], [x - 6, top + 90], [x - 18, KD16_W.surf + 4]], '#7a5a32', { lw: 6, seed: 51, dot: '#4a3418', pitch: 8, rad: 0.18, da: 0.5 });
  shape(ctx, [[x + 6, top + 120], [x + 52, top + 70], [x + 58, top + 78], [x + 12, top + 136]], '#7a5a32', { lw: 5, seed: 52 });
  shape(ctx, ell(x - 3, top + 8, 14, 5, 12), '#c9a26a', { lw: 4, seed: 53 });
}
// reeds: clumps that bend with the wind (bend -1..1, + = to the right), o.shake for the GULP shake
function kd16Reeds(ctx, t, x0, x1, o = {}) {
  const r = K.rng(o.seed ?? 61), n = o.n ?? 14;
  for (let i = 0; i < n; i++) { const bx = K.lerp(x0, x1, (i + r() * 0.6) / n), h = 170 + r() * 150, ph = r() * 6, ry = KD16_W.surf + 4;
    const sway = 0.04 * Math.sin(t * 1.4 + ph) + (o.bend || 0) * (0.35 + 0.08 * Math.sin(t * 9 + ph)) + (o.shake || 0) * Math.sin(t * 40 + i);
    const tipx = bx + Math.sin(sway) * h, tipy = ry - Math.cos(sway) * h, mx = bx + Math.sin(sway) * h * 0.35, my = ry - h * 0.5;
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(bx, ry); ctx.quadraticCurveTo(mx, my, tipx, tipy); ctx.stroke();
    ctx.strokeStyle = i % 3 ? GREEN : GREEND; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    if (i % 3 === 0) { ctx.save(); ctx.translate(tipx, tipy + 26); ctx.rotate(sway); shape(ctx, ell(0, 0, 8, 26, 12), '#7a4212', { lw: 3.5, seed: 62 + i }); ctx.restore(); } }
}
function kd16Tick(ctx, x, y, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; shape(ctx, ell(x, y, 14, 7, 12), '#b9b4c6', { lw: 4, seed: 70 + Math.round(x) % 7 }); ctx.restore(); }

// ---------- effects ----------
// windStreaks: brush streaks crossing the panel from a side ('R' from the right, 'L' from the left, 'T' from above); amt 0..1
function kd16Wind(ctx, t, from, amt, box) {
  if (amt <= 0.01) return; const [x0, y0, w, h] = box, r = K.rng(from.charCodeAt(0) * 7);
  ctx.save(); ctx.globalAlpha *= K.clamp(amt); ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const u = ((t * (1.1 + r() * 0.5) + r()) % 1), len = 90 + r() * 120, lane = r();
    let ax, ay, bx, by;
    if (from === 'T') { ax = x0 + lane * w; ay = y0 + u * (h + len) - len; bx = ax - 18; by = ay + len; }
    else { const d = from === 'R' ? -1 : 1, px = from === 'R' ? x0 + w - u * (w + len) + len : x0 + u * (w + len) - len; ax = px; ay = y0 + lane * h; bx = px - d * len; by = ay - 10; }
    ctx.strokeStyle = C.black; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo((ax + bx) / 2, (ay + by) / 2 - 16, bx, by); ctx.stroke();
    ctx.strokeStyle = C.white; ctx.lineWidth = 4.5; ctx.stroke(); }
  ctx.restore();
}
// fightCloud: comic scuffle cloud (dust puffs, stars, feathers) with limbs poking out; p 0..1 grow, then fade with fade 0..1
function kd16Fight(ctx, x, y, t, p, fade = 0) {
  if (p <= 0 || fade >= 1) return; const k = K.ease.back(K.clamp(p)), r = K.rng(81);
  ctx.save(); ctx.globalAlpha *= 1 - fade; ctx.translate(x, y); ctx.scale(k, k);
  seg(ctx, -150, 40, -205 + 12 * Math.sin(t * 30), 70, 20, FOXC, 4.5);   // fox tail out
  seg(ctx, 120, 60, 160 + 8 * Math.sin(t * 25), 130, 7, KD16_HC.legs, 3); seg(ctx, 160 + 8 * Math.sin(t * 25), 130, 186, 128, 4, KD16_HC.legs, 2);   // heron leg out
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2 * Math.sin(t * 8 + i), rr = 120 + 14 * Math.sin(t * 13 + i * 2), bx = Math.cos(a) * rr * 1.05, by = Math.sin(a) * rr * 0.6, br = 58 + r() * 26 + 6 * Math.sin(t * 17 + i);
    shape(ctx, ell(bx, by, br, br * 0.8, 18), i % 2 ? C.white : '#f2e6c8', { lw: 7, seed: 82 + i }); }
  shape(ctx, ell(0, 0, 130, 82, 28), C.white, { lw: 0 });
  for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; star(ctx, Math.cos(a) * 80, Math.sin(a) * 40, 20, C.yellow, a); }
  for (let i = 0; i < 4; i++) { const a = t * 4 + i * 1.6; ctx.save(); ctx.translate(Math.cos(a) * 60, -20 + Math.sin(a * 1.3) * 30); ctx.rotate(a); shape(ctx, ell(0, 0, 14, 5, 12), '#b9c4dc', { lw: 3, seed: 90 + i }); ctx.restore(); }
  ctx.restore();
}
