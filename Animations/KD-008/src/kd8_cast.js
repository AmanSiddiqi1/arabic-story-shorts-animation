// ===== KD-008 cast (story-local; proposals in library_proposals.md) =====
// kd8Tort: the heroine tortoise, side view, feet origin, facing dir. An acting head on a long neck (neck, nAng, headRot, mouth, talk,
//   brow, puff, flush), hide (into the shell), walk legs (ph, amp), dangle / reach / legUp (legs follow world directions while hanging),
//   rot (whole body about the feet). kd8TortGeo(P) gives the head and mouth in world units (for the carry rig).
// kd8Duck: white (pal 0) or mallard (pal 1) duck, side view, feet origin. neck (0 upright .. 1 bent down to clamp), headRot, bill/talk,
//   clamp, wing (near wing angle: 0 folded, ~2.2 raised, ~2.9 pointing forward), wingF (far wing), fly + flap, swim, ph/amp (waddle).
const KD8_GR = 900, KD8_VW = 1000, KD8_VH = 1230;
const KD8_SKIN = '#6cc35a', KD8_SKIND = '#2b7a38', KD8_RIM = '#d9a441', KD8_BILL = '#f08a1a', KD8_WOODC = '#9a6420';
const kd8Rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
const kd8Add = (a, b) => [a[0] + b[0], a[1] + b[1]];
// local (dir = +1, s = 1) to world, matching translate(x, y) rotate(rot) scale(dir * s, s)
const kd8World = (P) => { const s = P.s || 1, dir = P.dir ?? 1, rot = P.rot || 0; return (p) => { const r = kd8Rot([p[0] * dir * s, p[1] * s], rot); return [P.x + r[0], P.y + r[1]]; }; };
// a world direction expressed in the figure's local frame
const kd8Local = (P, w) => { const dir = P.dir ?? 1, r = kd8Rot(w, -(P.rot || 0)); return [r[0] * dir, r[1]]; };

// ---------- tortoise ----------
function kd8TortGeo(P) {
  const hide = K.clamp(P.hide || 0), nk = P.neck ?? 0.35, a = P.nAng ?? -0.3, hr = P.headRot || 0;
  const L = (30 + 78 * nk) * (1 - hide * 0.9), n0 = [56, -46], H = [n0[0] + Math.cos(a) * L - hide * 34, n0[1] + Math.sin(a) * L + hide * 8];
  const m = kd8Add(H, kd8Rot([30, 9], hr)), W = kd8World(P);
  return { n0, H, hr, mouthL: m, mouth: W(m), head: W(H), W };
}
function kd8TortRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, g = kd8TortGeo(P), hide = K.clamp(P.hide || 0), ph = P.ph || 0, amp = P.amp || 0;
  if (P.pass === 'beak') { // the upper head drawn again over a stick held in the mouth (clipped above the mouth line)
    ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s); ctx.translate(g.H[0], g.H[1]); ctx.rotate(g.hr);
    ctx.beginPath(); ctx.rect(-60, -60, 120, 66); ctx.clip(); ctx.rotate(-g.hr); ctx.translate(-g.H[0], -g.H[1]); kd8TortHead(ctx, P, g); ctx.restore(); return;
  }
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 2.5 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  // legs: stand / walk, or follow a world direction (dangle, reach, trail up in the fall)
  const legs = [[-30, 1, 0], [62, 1, 1], [-56, 0, 2], [34, 0, 3]];   // [hip x, near?, index]
  for (const [lx, near, i] of legs) {
    const hip = [lx, -24], sw = Math.sin(ph + i * Math.PI * 0.5 + (i > 1 ? Math.PI : 0)), front = i % 2 === 1;
    let d = [sw * amp * 0.45, 1], len = 26 + (P.dangle || 0) * 18, lift = Math.max(0, Math.cos(ph + i * 1.57 + (i > 1 ? Math.PI : 0))) * amp * 9;
    const wd = (P.legUp || 0) > 0 ? kd8Local(P, [0.25 * dir * (i - 1.5), -1]) : (P.dangle || 0) > 0 ? kd8Local(P, [Math.sin((P.legSw || 0) + i * 0.7) * 0.35, 1]) : null;
    if (wd) { const f = Math.max(P.dangle || 0, P.legUp || 0); d = [K.lerp(d[0], wd[0], f), K.lerp(d[1], wd[1], f)]; lift = 0; }
    if (front && (P.reach || 0) > 0) { const rd = kd8Local(P, [0.35 * dir, -1]); d = [K.lerp(d[0], rd[0], P.reach), K.lerp(d[1], rd[1], P.reach)]; len += 16 * P.reach; }
    if (P.tuckF && front) len *= 1 - 0.5 * P.tuckF;
    const dl = Math.hypot(d[0], d[1]) || 1; len *= 1 - hide * 0.55;
    const foot = [hip[0] + d[0] / dl * len, hip[1] + d[1] / dl * len - lift + (P.footUp && i === 1 ? -P.footUp * 22 : 0)];
    seg(ctx, hip[0], hip[1], foot[0], foot[1], 26, near ? KD8_SKIN : KD8_SKIND, 4.5);
    shape(ctx, ell(foot[0], foot[1], 15, 9, 12), near ? KD8_SKIN : KD8_SKIND, { lw: 3.5, seed: 30 + i });
  }
  shape(ctx, [[-82, -30], [-104, -18], [-80, -16]], KD8_SKIN, { lw: 4, seed: 9 });
  // neck and head (drawn before the shell so the shell covers a pulled-in head)
  if (hide < 0.95) {
    const H = g.H; seg(ctx, g.n0[0], g.n0[1], H[0] - 6, H[1] + 4, 30, KD8_SKIN, 4.5);
    kd8TortHead(ctx, P, g);
  }
  // shell: dome, scutes, rim
  const sp = []; for (let i = 0; i <= 30; i++) { const a = Math.PI + i / 30 * Math.PI; sp.push([Math.cos(a) * 86, -24 + Math.sin(a) * 82]); }
  ctx.save(); K.poly(ctx, sp, true); ctx.fillStyle = KD8_SKIND; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, KD8_SKIN, 12, 0.3); ctx.globalAlpha = 0.9; ctx.fillRect(-90, -110, 180, 90); ctx.globalAlpha = 1;
  for (const [cx, cy] of [[0, -84], [-50, -60], [50, -60], [-82, -34], [0, -40], [82, -34]]) { const hx = []; for (let i = 0; i <= 6; i++) hx.push([cx + Math.cos(i * Math.PI / 3) * 26, cy + Math.sin(i * Math.PI / 3) * 22]); K.poly(ctx, hx, true); ctx.lineWidth = 4.5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = 'rgba(255,210,31,0.22)'; ctx.fill(); }
  ctx.restore(); ink(ctx, sp, 7, 17);
  shape(ctx, [[-90, -30], [90, -30], [86, -14], [-86, -14]], KD8_RIM, { lw: 5, seed: 6, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
  ctx.restore();
}
function kd8TortHead(ctx, P, g) {
    ctx.save(); ctx.translate(g.H[0], g.H[1]); ctx.rotate(g.hr);
    const hp = ell(0, 0, 36, 29, 26); shape(ctx, hp, KD8_SKIN, { lw: 6, seed: 13, dot: KD8_SKIND, pitch: 7, rad: 0.16, da: 0.35 });
    if ((P.flush || 0) > 0.01) { ctx.save(); K.poly(ctx, hp, true); ctx.clip(); const top = 30 - 64 * K.clamp(P.flush); ctx.globalAlpha = 0.9; ctx.fillStyle = dotPat(ctx, C.red, 6, 0.42); ctx.fillRect(-40, top, 80, 40); ctx.fillStyle = 'rgba(226,35,26,0.35)'; ctx.fillRect(-40, top, 80, 40); ctx.restore(); ink(ctx, hp, 6, 13); }
    if (P.puff) for (const cx of [14]) shape(ctx, ell(cx, 13, 10 + 6 * P.puff, 8 + 5 * P.puff, 14), KD8_SKIN, { lw: 3.5, seed: 17 });
    // nostril
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(33, -6, 2.4, 0, 7); ctx.fill();
    eyeAt(ctx, 8, -9, P.eyes || 'open', 0.8);
    if (P.brow) { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-4, -27 - P.brow * 6); ctx.lineTo(20, -25 + P.brow * 8); ctx.stroke(); ctx.restore(); }
    const tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
    if (tk > 0 || m === 'open' || m === 'yawn') { const o = Math.max(tk, m === 'closed' ? 0 : P.open ?? 1); shape(ctx, [[10, 8], [36, 4], [32, 10 + 20 * o], [14, 12 + 14 * o]], C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(24, 10 + 12 * o, 8, 2 + 5 * o, 0, 0, 7); ctx.fill(); }
    else if (m === 'smile') { ctx.beginPath(); ctx.moveTo(8, 6); ctx.quadraticCurveTo(22, 20, 35, 5); ctx.stroke(); }
    else if (m === 'o') shape(ctx, ell(26, 12, 6, 8, 12), C.black, { lw: 3, seed: 3 });
    else if (m === 'frown') { ctx.beginPath(); ctx.moveTo(10, 15); ctx.quadraticCurveTo(22, 4, 34, 13); ctx.stroke(); }
    else if (m === 'tight') { ctx.lineWidth = 6.5; ctx.beginPath(); ctx.moveTo(10, 9); ctx.lineTo(35, 8); ctx.stroke(); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(8, 13); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(10, 9); ctx.lineTo(34, 8); ctx.stroke(); }
    ctx.restore(); ctx.restore();
}
const kd8Tort = acting(kd8TortRaw, () => KD8_SKIN);

// ---------- duck ----------
const KD8_DUCK = [
  { body: C.white, dot: '#b9c8e6', wing: '#f2e2b4', wdot: '#c9a85a', head: C.white, hdot: '#b9c8e6', chest: C.white, bill: KD8_BILL, tail: C.white },
  { body: '#c9c4d6', dot: '#6f6a86', wing: '#8a6a4a', wdot: '#5b3a1e', head: '#2b7a38', hdot: '#3f9d4a', chest: '#8a501a', bill: '#e8c21a', tail: '#3a3a4a', ring: true, spec: true },
];
function kd8DuckGeo(P) {
  const nb = K.clamp(P.neck || 0), hr = P.headRot || 0;
  const H = [K.lerp(46, 92, nb), K.lerp(-128, -60, nb) + (P.drop || 0)], ba = K.lerp(0, 1.05, nb) + hr;
  const tip = kd8Add(H, kd8Rot([58, 8], ba)), W = kd8World(P);
  return { H, ba, tipL: tip, tip: W(tip), head: W(H), W };
}
function kd8DuckWing(ctx, ang, col, dcol, seed, spec, sx = 1) {
  ctx.save(); ctx.translate(8, -74); ctx.rotate(ang); ctx.scale(sx, sx);
  const wp = [[6, -8], [-34, -18], [-80, -14], [-118, 2], [-96, 10], [-104, 18], [-70, 18], [-74, 24], [-34, 20], [6, 8]];
  shape(ctx, wp, col, { lw: 4.5, seed, dot: dcol, pitch: 7, rad: 0.18, da: 0.5 });
  if (spec) shape(ctx, [[-40, 6], [-70, 6], [-70, 15], [-40, 15]], C.blue, { lw: 3, seed: seed + 1 });
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); for (const x of [-60, -84]) { ctx.moveTo(x, 4); ctx.lineTo(x - 14, 16); } ctx.stroke(); ctx.restore();
  ctx.restore();
}
function kd8DuckRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, c = KD8_DUCK[P.pal || 0], g = kd8DuckGeo(P), fl = P.flap ?? 0, ph = P.ph || 0, amp = P.amp || 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (P.swim) { ctx.beginPath(); ctx.rect(-200, -400, 400, 372); ctx.clip(); }
  // far wing
  const wA = P.fly ? 0.75 + 1.0 * fl : (P.wingF ?? (P.wing || 0) * 0.6);
  if (P.fly || (P.wingF ?? 0) > 0.2 || (P.wing || 0) > 0.2) kd8DuckWing(ctx, wA + 0.2, KD8_DUCK[P.pal || 0].wdot, c.wing, 51, false, P.fly ? 1.15 : 1);
  // legs
  if (!P.fly && !P.swim) for (const [lx, i] of [[-8, 0], [12, 1]]) {
    const sw = Math.sin(ph + i * Math.PI) * amp, fx = lx + sw * 16, fy = -Math.max(0, Math.cos(ph + i * Math.PI)) * amp * 10;
    seg(ctx, lx, -24, fx, fy - 2, 7, c.bill, 3); shape(ctx, [[fx - 6, fy - 4], [fx + 22, fy - 2], [fx + 18, fy + 2], [fx - 6, fy + 2]], c.bill, { lw: 3.5, seed: 40 + i });
  }
  if (P.fly) for (const i of [0, 1]) seg(ctx, -20 + i * 10, -36, -46 + i * 8, -22, 7, c.bill, 3);
  // tail + body
  shape(ctx, [[-50, -70], [-86, -92 - (P.tailUp || 0) * 10], [-74, -62], [-52, -46]], c.tail, { lw: 4.5, seed: 42 });
  if (c.ring) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(-80, -96, 7, 0.5, 4.2); ctx.stroke(); ctx.restore(); }
  const bp = ell(-2, -56, 62, 34, 30); shape(ctx, bp, c.body, { lw: 6, seed: 43, dot: c.dot, pitch: 8, rad: 0.2, da: 0.45 });
  shape(ctx, ell(34, -60, 26, 24, 18), c.chest, { lw: 0 });
  // neck
  const H = g.H;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 32; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(34, -68); ctx.quadraticCurveTo((36 + H[0]) / 2 + (P.neck ? 10 : -8), (-70 + H[1]) / 2, H[0] - 4, H[1] + 6); ctx.stroke();
  ctx.lineWidth = 22; ctx.strokeStyle = c.head; ctx.stroke(); ctx.restore();
  if (c.ring) { const rx = K.lerp(36, H[0], 0.35), ry = K.lerp(-70, H[1], 0.35); ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(rx - 10, ry - 2); ctx.lineTo(rx + 10, ry + 2); ctx.stroke(); ctx.restore(); }
  // near wing (folded on the body, or raised as a gesture, or flapping)
  const wn = P.fly ? 0.7 + 1.0 * fl : (P.wing || 0);
  kd8DuckWing(ctx, wn, c.wing, c.wdot, 52, c.spec, P.fly ? 1.3 : 1);
  // head
  ctx.save(); ctx.translate(H[0], H[1]); ctx.rotate(g.ba);
  const ob = P.clamp ? 0 : Math.max(P.bill || 0, P.talk || 0);
  shape(ctx, [[14, 6], [52, 10 + ob * 16], [56, 16 + ob * 18], [16, 14]], c.bill, { lw: 3.5, seed: 44 });
  shape(ctx, [[12, -8], [50, -2], [60, 6], [54, 11], [14, 8]], c.bill, { lw: 4, seed: 45 });
  if (P.clamp) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(18, 4); ctx.lineTo(52, 9); ctx.stroke(); ctx.restore(); }
  shape(ctx, ell(0, 0, 25, 23, 22), c.head, { lw: 5.5, seed: 46, dot: c.hdot, pitch: 7, rad: 0.18, da: 0.5 });
  ctx.rotate(-g.ba * 0.6);
  eyeAt(ctx, 8, -6, P.eyes || 'open', 0.8);
  if (P.brow) { ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-6, -22 - P.brow * 4); ctx.lineTo(18, -20 + P.brow * 6); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.restore();
}
const kd8Duck = acting(kd8DuckRaw, (P) => KD8_DUCK[P.pal || 0].head);

// ---------- props ----------
// stick from a to b, sagging by sag at the middle (quadratic); returns the point on the curve at u
function kd8StickPt(a, b, sag, u) { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 2 * sag]; const v = 1 - u; return [v * v * a[0] + 2 * v * u * m[0] + u * u * b[0], v * v * a[1] + 2 * v * u * m[1] + u * u * b[1]]; }
function kd8Stick(ctx, a, b, sag = 0, o = {}) {
  const pts = []; for (let i = 0; i <= 20; i++) pts.push(kd8StickPt(a, b, sag, i / 20));
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const tw = kd8StickPt(a, b, sag, 0.3), tw2 = [tw[0] + 18, tw[1] - 26];
  ctx.strokeStyle = C.black; ctx.lineWidth = 22; K.poly(ctx, pts); ctx.stroke(); ctx.beginPath(); ctx.moveTo(tw[0], tw[1]); ctx.lineTo(tw2[0], tw2[1]); ctx.lineWidth = 15; ctx.stroke();
  ctx.strokeStyle = KD8_WOODC; ctx.lineWidth = 12; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(tw[0], tw[1]); ctx.lineTo(tw2[0], tw2[1]); ctx.stroke();
  ctx.fillStyle = '#5b3a1e'; for (const u of [0.18, 0.66]) { const p = kd8StickPt(a, b, sag, u); ctx.beginPath(); ctx.ellipse(p[0], p[1], 5, 3, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
function kd8Pebble(ctx, x, y, s = 1, sq = 1) { shape(ctx, ell(x, y - 12 * s * sq, 15 * s / Math.sqrt(sq), 12 * s * sq, 14), STONE, { lw: 4, seed: 61, dot: STONED, pitch: 5, rad: 0.25, da: 0.5 }); }
function kd8Snail(ctx, x, y, s = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const st = Math.sin(t * 3) * 2;
  shape(ctx, [[-30, 0], [34 + st, 0], [40 + st, -10], [30, -14], [-30, -6]], '#e8b48a', { lw: 4, seed: 62 });
  seg(ctx, 32 + st, -10, 40 + st, -32, 4, '#e8b48a', 2.5); seg(ctx, 26 + st, -10, 30 + st, -30, 4, '#e8b48a', 2.5);
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(40 + st, -33, 3.5, 0, 7); ctx.arc(30 + st, -31, 3.5, 0, 7); ctx.fill();
  shape(ctx, ell(-2, -22, 24, 22, 22), C.yellow, { lw: 4.5, seed: 63, dot: C.red, pitch: 6, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); for (let i = 0; i < 40; i++) { const a = i * 0.32, r = 18 - i * 0.42; ctx.lineTo(-2 + Math.cos(a) * r, -22 + Math.sin(a) * r * 0.9); } ctx.stroke(); ctx.restore();
  ctx.restore();
}
function kd8Fish(ctx, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-30, 0], [-50, -16], [-46, 0], [-50, 16]], C.red, { lw: 4, seed: 64 });
  shape(ctx, ell(0, 0, 34, 16, 20), '#ff8a2a', { lw: 4.5, seed: 65, dot: C.red, pitch: 6, rad: 0.25, da: 0.5 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(18, -4, 3.5, 0, 7); ctx.fill(); ctx.restore();
}
// small water-coloured spray (dustBurst recoloured): drops thrown up from (x, y)
function kd8Spray(ctx, x, y, d, seed = 1, n = 8) { if (d < 0 || d > 0.7) return; const r = K.rng(seed * 31), u = d / 0.7; ctx.save(); ctx.globalAlpha = 1 - u * u; for (let i = 0; i < n; i++) { const a = -Math.PI * (0.15 + 0.7 * r()), sp = 60 + r() * 70, px = x + Math.cos(a) * sp * u, py = y + Math.sin(a) * sp * u + 160 * u * u; shape(ctx, ell(px, py, 5 + r() * 4, 7 + r() * 4, 10), C.white, { lw: 3, seed: 70 + i }); } ctx.restore(); }
function kd8Steam(ctx, x, y, d, dir = 1) { if (d < 0 || d > 0.9) return; const u = d / 0.9; ctx.save(); ctx.globalAlpha = 1 - u; for (let i = 0; i < 3; i++) { const r = 8 + u * 16 + i * 3; shape(ctx, ell(x + dir * (14 + u * 40 + i * 12), y - u * 30 - i * 8, r, r * 0.8, 14), C.white, { lw: 3.5, seed: 80 + i }); } ctx.restore(); }
function kd8Sweat(ctx, x, y, d) { if (d < 0 || d > 0.8) return; const u = d / 0.8; ctx.save(); ctx.globalAlpha = 1 - u * 0.6; shape(ctx, [[x, y - 14 + u * 40], [x + 7, y + u * 40], [x, y + 6 + u * 40], [x - 7, y + u * 40]], '#9cc4ff', { lw: 3, seed: 88 }); ctx.restore(); }
