// ===== small animals (added 2026-11-16, round 3): cat, rat (kinds rat, mouse), sheep (kinds ewe, ram, lamb). =====
// Side view, feet at (x, y), facing dir, shared acting fields via registry.js. Legs use the BEAST rig from cast/hooves.js
// (gait + two-bone IK), so walk(xf, t, { stride: GAIT.<animal> * s }) never slides the feet. Sizes from production/planned_assets.md.

// ===== cat. Yard, palace and balloon-icon cat (planned_assets.md "cat"). About 190 wide x 150 tall at s 1. =====
// pal 0 black, 1 white, 2 orange (striped). P: {x,y,s,dir,pal, ph,amp (stride GAIT.cat * s), sit 0..1, crouch 0..1 (stalk, low),
//   arch 0..1 (back up, legs straight: fright or a stroking hand), puff 0..1 (fur and tail bristle), tailUp 0..1, tailCurl (-1..1 hook at the tip),
//   tailHairs (0..7 white hairs at the tip), ears (-1 flat back .. 1 up), lick 0..1 (paw to the tongue), raise 0..1 (near paw up),
//   eyes, brow, talk, mouth (closed, smile, frown, o, open = hiss with fangs), shake, rot, silhouette}
const CAT_PAL = [{ body: '#262633', dot: '#4a4a66', far: '#16161e', inner: '#f07a8a', nose: '#f07a8a', muzzle: null }, { body: C.white, dot: '#b9b4c6', far: '#d6d2e0', inner: '#f07a8a', nose: '#f07a8a', muzzle: null },
  { body: '#e8742a', dot: '#b5501a', far: '#b5501a', inner: '#f07a8a', nose: '#c8481a', muzzle: CREAM, stripe: '#a8400f' }];
function cat(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = CAT_PAL[P.pal || 0] || CAT_PAL[0], sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, sit = K.clamp(P.sit || 0), cr = K.clamp(P.crouch || 0), ar = K.clamp(P.arch || 0), pf = K.clamp(P.puff || 0);
  const A = -0.62 * sit, piv = [-50, -48], dy = BEAST.bob(ph, amp, 2) + 24 * cr - 12 * ar, T = (p) => { const q = BEAST.rot(p, A, piv); return [q[0], q[1] + dy]; };
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const defs = [[36, 1.5 * Math.PI, true, false], [-52, Math.PI, false, false], [-38, 0, false, true], [50, 0.5 * Math.PI, true, true]];
  const legs = defs.map(([hx, off, fore, near]) => { const H = T([hx, -66]); let [dx, lift] = BEAST.gait(ph, off, 22, 16, amp * (1 - sit));
    let Ft = [hx + 3 + dx + (fore ? 6 * cr : -6 * cr), -lift], Kn = BEAST.ik(H, Ft, 34, 36, fore ? -1 : -1);
    if (fore && sit > 0) { const Fs = [H[0] + 4, 0]; Ft = BEAST.lp(Ft, Fs, sit); Kn = BEAST.lp(Kn, BEAST.lp(H, Fs, 0.5), sit); }
    if (!fore && sit > 0) { const Fs = [hx + 34, 0], Ks = [hx + 6, -26]; Ft = BEAST.lp(Ft, Fs, sit); Kn = BEAST.lp(Kn, Ks, sit); }
    if (fore && near && (P.raise || P.lick)) { const r = K.clamp(Math.max(P.raise || 0, P.lick || 0)), tgt = P.lick ? T([86, -96]) : [H[0] + 44, H[1] + 22]; Ft = BEAST.lp(Ft, tgt, r); Kn = BEAST.lp(Kn, [K.lerp(H[0], Ft[0], 0.5) + 10, K.lerp(H[1], Ft[1], 0.5) + 12], r); }
    return { H, Kn, F: Ft, near, fore }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 15, w2: 12, col: col(L.near ? pal.body : pal.far), paw: col(L.near ? pal.body : pal.far), pawW: 12, pawH: 6, pawDx: 5, ol: 4 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // tail
  { const r = T([-68, -82]), u = K.clamp(P.tailUp ?? (0.35 + 0.65 * ar)), cu = P.tailCurl ?? 0.3, w = 13 + 12 * pf;
    const pts = K.bezier(r, [r[0] - 40, r[1] + 20 - 70 * u], [r[0] - 40 + 30 * u, r[1] + 50 - 160 * u], [r[0] - 30 + 40 * u + cu * 22, r[1] + 70 - 190 * u], 14);
    const e2 = pts[pts.length - 1], prev = pts[pts.length - 2], ang = Math.atan2(e2[1] - prev[1], e2[0] - prev[0]);
    for (let k = 1; k <= 4; k++) { const a2 = ang + cu * 0.5 * k; pts.push([pts[pts.length - 1][0] + Math.cos(a2) * 7, pts[pts.length - 1][1] + Math.sin(a2) * 7]); }
    BEAST.tube(ctx, pts, w, w * 0.8, col(pal.body), 4);
    if (pf > 0.05) for (let i = 2; i < pts.length; i += 2) { const p = pts[i]; BEAST.line(ctx, [[p[0] - w * 0.7, p[1] - 3], [p[0] - w * 0.7 - 7 * pf, p[1] - 6]], 3); BEAST.line(ctx, [[p[0] + w * 0.7, p[1]], [p[0] + w * 0.7 + 7 * pf, p[1] - 4]], 3); }
    const nh = Math.round(P.tailHairs || 0), tp = pts[pts.length - 1]; for (let i = 0; i < nh; i++) { const a2 = -Math.PI / 2 + (i - (nh - 1) / 2) * 0.32; BEAST.line(ctx, [[tp[0], tp[1]], [tp[0] + Math.cos(a2) * 14, tp[1] + Math.sin(a2) * 14]], 2.5, C.white); } }
  // body (arch bulges the top; puff makes the outline jagged)
  ctx.save(); ctx.translate(0, dy); ctx.translate(piv[0], piv[1]); ctx.rotate(A); ctx.translate(-piv[0], -piv[1]);
  const body = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a); let x = -5 + 66 * c, y = -78 + 28 * sn;
    if (sn < 0) y -= ar * 40 * Math.max(0, 1 - Math.pow((x + 5) / 66, 2)); const j = pf * (i % 2 ? 7 : -2); body.push([x + c * j, y + sn * j]); }
  shape(ctx, body, col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 61, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.5 });
  if (pal.stripe && !sil) for (const sx of [-40, -18, 4, 26]) BEAST.line(ctx, [[sx, -98 - ar * 30], [sx + 6, -82 - ar * 20]], 6, pal.stripe);
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  if (sit > 0.2) { const H = legs[2].H; shape(ctx, ell(H[0] + 8, H[1] + 18, 28 * sit, 24 * sit, 18), col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 62, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.5 }); }
  // head
  const nk = T([54, -92]), hx = nk[0] + 18 - 6 * cr, hy = nk[1] - 22 + 14 * cr + (P.drop || 0) - 6 * ar;
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.headUp ?? P.nod ?? 0);
  const ev = K.clamp(P.ears ?? 0.6, -1, 1);
  for (const [ex, far] of [[-16, true], [8, false]]) { ctx.save(); ctx.translate(ex, -22); ctx.rotate(-0.15 + (1 - ev) * -0.55 + (far ? -0.1 : 0.15)); shape(ctx, [[-12, 4], [-2, -30], [12, 4]], col(far ? pal.far : pal.body), { lw: 4, seed: far ? 63 : 64 }); if (!sil && !far) shape(ctx, [[-6, 0], [-2, -18], [6, 0]], pal.inner, { lw: 0 }); ctx.restore(); }
  const hp = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2, j = pf * (i % 2 ? 4 : 0) * (Math.cos(a) < 0.2 ? 1 : 0); hp.push([Math.cos(a) * (33 + j), Math.sin(a) * (29 + j)]); }
  shape(ctx, hp, col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 65, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  if (!sil) {
    if (pal.muzzle) shape(ctx, ell(24, 10, 14, 11, 14), pal.muzzle, { lw: 0 });
    if (pal.stripe) for (const sx of [-12, 0]) BEAST.line(ctx, [[sx, -28], [sx + 3, -16]], 5, pal.stripe);
    shape(ctx, [[32, -2], [40, -2], [36, 4]], pal.nose, { lw: 2, seed: 66 });
    const wc = pal.body === C.white ? '#6f6a86' : C.white; for (const [a, l] of [[-0.18, 34], [0.05, 36], [0.28, 32]]) BEAST.line(ctx, [[30, 8], [30 + Math.cos(a) * l, 8 + Math.sin(a) * l]], 2, wc);
    const tk = P.talk || 0, m = P.mouth || 'closed';
    if (tk > 0 || m === 'open' || P.lick) { const o = Math.max(tk, m === 'open' ? 1 : 0, (P.lick || 0) * 0.5); shape(ctx, [[18, 10], [38, 8], [36, 12 + o * 16], [20, 12 + o * 10]], C.black, { lw: 2.5, seed: 3 });
      if (m === 'open') { ctx.fillStyle = C.white; for (const tx of [22, 32]) { ctx.beginPath(); ctx.moveTo(tx, 9); ctx.lineTo(tx + 5, 9); ctx.lineTo(tx + 2.5, 18); ctx.fill(); } }
      if (P.lick) shape(ctx, [[30, 12], [46, 14 + 8 * P.lick], [40, 22 + 6 * P.lick], [28, 18]], '#f07a8a', { lw: 2.5, seed: 67 }); }
    else if (m === 'smile') BEAST.line(ctx, [[22, 10], [28, 14], [36, 6], [42, 13], [46, 8]], 3.5);
    else if (m === 'frown') BEAST.line(ctx, [[22, 16], [32, 10], [42, 16]], 3.5);
    else if (m === 'o') shape(ctx, ell(34, 14, 4, 5, 10), C.black, { lw: 2 });
    else BEAST.line(ctx, [[26, 10], [36, 7], [42, 11]], 3.5);
    if (P.eyes === 'x') BEAST.eyeX(ctx, 12, -6, 7); else eyeAt(ctx, 12, -6, P.eyes || 'open', 0.8);
    if (P.brow) BEAST.brow(ctx, 12, -22, P.brow, 20);
  }
  ctx.restore();
  ctx.restore();
}

// ===== rat (kinds rat, mouse). Burrow, granary and mountain rodents (planned_assets.md "rat"). =====
// rat about 150 wide (without the tail) x 70 tall at s 1; mouse smaller with round ears 1.3x. pal 0 brown-grey, 1 light grey (mouse default), 2 white.
// P: {x,y,s,dir,kind ('rat' | 'mouse'),pal, ph,amp (stride GAIT.rat * s), sit 0..1 (up on the haunches, paws at the chest), sniff 0..1 (nose up, whiskers fan),
//   chew 0..1 (paws to the mouth, jaw), roll 0..1 (onto its back, legs up), bib (white chest), tailCurl (-1..1), tailUp, ears (-1..1),
//   eyes ('x' supported), brow, talk, mouth, shake, rot, silhouette}
const RAT_PAL = [{ body: '#7a6a64', dot: '#4a3e3a', far: '#5a4c48', ear: '#f0a0a8', belly: '#c9bfb8', paw: '#f0a0a8' }, { body: '#b9b4c6', dot: '#6f6a86', far: '#9a94a8', ear: '#f4a8b4', belly: C.white, paw: '#f4a8b4' },
  { body: '#f4ecd8', dot: '#c9bfa6', far: '#d6ccb6', ear: '#f4a8b4', belly: C.white, paw: '#f4a8b4' }];
function rat(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, mouse = P.kind === 'mouse', pal = RAT_PAL[P.pal ?? (mouse ? 1 : 0)] || RAT_PAL[0], sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, sit = K.clamp(P.sit || 0), ch = K.clamp(P.chew || 0), roll = K.clamp(P.roll || 0);
  const bw = mouse ? 44 : 56, bh = mouse ? 26 : 28, A = -1.0 * sit, piv = [-38, -14], dy = BEAST.bob(ph, amp, 2), T = (p) => { const q = BEAST.rot(p, A, piv); return [q[0], q[1] + dy]; };
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (roll > 0) { ctx.translate(0, -34); ctx.rotate(Math.PI * K.ease.inOut(roll)); ctx.translate(0, 34); }
  const defs = [[mouse ? 22 : 28, 1.5 * Math.PI, true, false], [-38, Math.PI, false, false], [-28, 0, false, true], [mouse ? 30 : 38, 0.5 * Math.PI, true, true]];
  const legs = defs.map(([hx, off, fore, near]) => { const H = T([hx, -20]); let [dx, lift] = BEAST.gait(ph, off, 12, 9, amp * (1 - sit)); let Ft = [hx + 2 + dx, -lift], Kn = BEAST.ik(H, Ft, 12, 13, fore ? -1 : 1);
    if (fore && sit > 0) { const tgt = ch > 0 ? T([bw + 34, -44]) : T([bw - 4, -34]); Ft = BEAST.lp(Ft, tgt, sit); Kn = BEAST.lp(Kn, BEAST.lp(H, Ft, 0.5), sit); }
    if (!fore && sit > 0) { Ft = BEAST.lp(Ft, [hx + 18, 0], sit); Kn = BEAST.lp(Kn, [hx + 4, -12], sit); }
    if (roll > 0) { Ft = BEAST.lp(Ft, [hx + 6 * Math.sin((P.ph || 0) * 3 + hx), 4], roll * 0.5); }
    return { H, Kn, F: Ft, near, fore }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 9, w2: 7, col: col(L.near ? pal.body : pal.far), paw: col(pal.paw), pawW: 7, pawH: 4, pawDx: 4, ol: 3 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // tail
  { const r = T([-bw + 2, -28]), cu = P.tailCurl ?? 0.4, up = P.tailUp || 0, L = mouse ? 110 : 130;
    const pts = K.bezier(r, [r[0] - L * 0.4, r[1] + 26 - 60 * up], [r[0] - L * 0.75, r[1] + 20 - 80 * up], [r[0] - L, r[1] - 10 - 60 * up - cu * 30], 14);
    for (let k = 1; k <= 5; k++) { const p1 = pts[pts.length - 1], p0 = pts[pts.length - 2], a2 = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) - cu * 0.6; pts.push([p1[0] + Math.cos(a2) * 6, p1[1] + Math.sin(a2) * 6]); }
    BEAST.tube(ctx, pts, 7, 3, col(pal.ear), 3); }
  // body
  ctx.save(); ctx.translate(0, dy); ctx.translate(piv[0], piv[1]); ctx.rotate(A); ctx.translate(-piv[0], -piv[1]);
  const body = [[-bw, -18], [-bw - 4, -40], [-bw + 16, -bh - 32], [0, -bh - 36], [bw * 0.6, -bh - 28], [bw, -40], [bw, -18], [bw * 0.4, -6], [-bw * 0.6, -6], [-bw, -18]];
  shape(ctx, body, col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 71, dot: pal.dot, pitch: 7, rad: 0.15, da: 0.5 });
  if (!sil && (P.bib || mouse)) shape(ctx, ell(bw * 0.55, -22, bw * 0.38, 12, 16), pal.belly, { lw: 0 });
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  // head (follows the body when sitting)
  const nk = T([bw - 6, -38]), sn = K.clamp(P.sniff || 0);
  ctx.save(); ctx.translate(nk[0] + 10, nk[1] - 6 + (P.drop || 0)); ctx.rotate(A * 0.4 - 0.25 * sn + (P.nod || 0));
  const er = (mouse ? 22 : 16) * (P.earS || 1), ev = K.clamp(P.ears ?? 0.5, -1, 1);
  for (const [ex, far] of [[-6, true], [6, false]]) { const ey = -24 - 4 * ev, ex2 = ex - (1 - ev) * 8; shape(ctx, ell(ex2, ey, er * 0.9, er, 16), col(far ? pal.far : pal.body), { lw: 4, seed: far ? 72 : 73 }); if (!sil && !far) shape(ctx, ell(ex2 + 1, ey + 1, er * 0.55, er * 0.62, 14), pal.ear, { lw: 0 }); }
  const sl = mouse ? 40 : 50, head = [[-14, -18], [10, -22], [sl * 0.7, -12], [sl, -4 - 4 * sn], [sl + 2, 2 - 4 * sn], [sl * 0.6, 12], [0, 14], [-16, 4], [-14, -18]];
  shape(ctx, head, col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 74, dot: pal.dot, pitch: 7, rad: 0.15, da: 0.45 });
  if (!sil) {
    shape(ctx, ell(sl + 2, -1 - 4 * sn, 5 + sn, 5 + sn, 10), C.black, { lw: 0 });
    const wc = pal.body === '#f4ecd8' || pal.body === '#b9b4c6' ? '#4a4a5a' : C.white;
    for (const a of [-0.3 - sn * 0.3, 0, 0.3 + sn * 0.3]) BEAST.line(ctx, [[sl - 6, 2], [sl - 6 + Math.cos(a) * 30, 2 + Math.sin(a) * 30]], 1.8, wc);
    const o = Math.max(P.talk || 0, ch > 0 ? Math.abs(Math.sin(ch * 9)) * 0.5 : 0);
    if (o > 0.02) { shape(ctx, [[sl * 0.45, 6], [sl - 2, 6], [sl - 6, 8 + o * 10], [sl * 0.5, 9 + o * 6]], C.black, { lw: 2, seed: 3 }); ctx.fillStyle = C.white; ctx.fillRect(sl - 10, 6, 6, 6); }
    else if (P.mouth === 'smile') BEAST.line(ctx, [[sl * 0.45, 4], [sl * 0.7, 10], [sl - 4, 6]], 3);
    else if (P.mouth === 'frown') BEAST.line(ctx, [[sl * 0.45, 10], [sl * 0.7, 6], [sl - 4, 10]], 3);
    else BEAST.line(ctx, [[sl * 0.5, 7], [sl - 4, 6]], 3);
    if (P.eyes === 'x') BEAST.eyeX(ctx, 12, -8, 6); else eyeAt(ctx, 12, -8, P.eyes || 'open', 0.8);
    if (P.brow) BEAST.brow(ctx, 12, -22, P.brow, 16);
  }
  ctx.restore();
  ctx.restore();
}

// ===== sheep (kinds ewe, ram, lamb). Flock, fold and sacrifice sheep (planned_assets.md "sheep"). About 190 x 150 at s 1. =====
// pal 0 white wool, 1 cream, 2 dark. ram: curled horns; lamb: 0.62 size, bigger head, longer legs.
// P: {x,y,s,dir,kind,pal, ph,amp (stride GAIT.sheep * s), fat 0..1 (rounder fleece), headDown 0..1 (graze), chew 0..1, hop 0..1 (all four feet up),
//   lie 0..1 (legs folded), ears (-1..1), eyes, brow, talk (bleat), mouth, shake, rot, silhouette}
const SHEEP_PAL = [{ wool: C.white, dot: '#b9b4c6', face: '#2a2a33', far: '#1d1d26', horn: '#d9b37a' }, { wool: '#f2e6c8', dot: '#c9b48a', face: '#5b3a1e', far: '#3a2410', horn: '#c9a26a' }, { wool: '#7d7790', dot: '#4a4a5a', face: '#1d1d26', far: '#141414', horn: '#d9b37a' }];
function sheep(ctx, P) {
  const lamb = P.kind === 'lamb', ram = P.kind === 'ram', s = (P.s || 1) * (lamb ? 0.62 : 1), dir = P.dir ?? 1, pal = SHEEP_PAL[P.pal || 0] || SHEEP_PAL[0], sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, fat = K.clamp(P.fat || 0), hop = K.clamp(P.hop || 0), lie = K.clamp(P.lie || 0), gd = K.clamp(P.headDown || 0);
  const lk = lamb ? 1.25 : 1, hipY = -60 * lk, dy = BEAST.bob(ph, amp, 2) - 40 * hop + lie * (52 * lk - 6), hs = lamb ? 1.3 : 1;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const defs = [[44, 1.5 * Math.PI, true, false], [-58, Math.PI, false, false], [-46, 0, false, true], [56, 0.5 * Math.PI, true, true]];
  const legs = defs.map(([hx, off, fore, near]) => { const H = [hx, hipY + dy]; let [dx, lift] = BEAST.gait(ph, off, 20, 14, amp * (1 - hop)); let Ft = [hx + 2 + dx, -lift], Kn = BEAST.ik(H, Ft, 29 * lk, 31 * lk, fore ? 1 : -1);
    if (hop > 0) { const Fh = [hx + (fore ? 10 : -10), H[1] + 40 * lk]; Ft = BEAST.lp(Ft, Fh, hop); Kn = BEAST.ik(H, Ft, 29 * lk, 31 * lk, fore ? -1 : 1); }
    if (lie > 0) { Kn = BEAST.lp(Kn, [hx + (fore ? 30 : 24), -8], lie); Ft = BEAST.lp(Ft, [hx + (fore ? -14 : 40), -6], lie); }
    return { H, Kn, F: Ft, near }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 10, w2: 9, col: col(L.near ? pal.face : pal.far), hoof: C.black, hoofH: 7, hw: 6, ol: 3.5 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // fleece: scalloped cloud body
  const rx = 82 + 26 * fat, ry = 44 + 14 * fat, cy = -88 * (lamb ? 1.08 : 1) + dy + (lamb ? 6 : 0), cx = -4, wool = [];
  for (let i = 0; i <= 44; i++) { const a = i / 44 * Math.PI * 2, b = 1 + (i % 2 ? 0.075 : -0.01); wool.push([cx + Math.cos(a) * rx * b, cy + Math.sin(a) * ry * b]); }
  shape(ctx, [[cx - rx - 8, cy - 6], [cx - rx - 22, cy - 18], [cx - rx - 14, cy + 6], [cx - rx - 8, cy - 6]], col(pal.wool), { lw: 4, seed: 80 });
  shape(ctx, wool, col(pal.wool), sil ? { lw: 6 } : { lw: 6, seed: 81, dot: pal.dot, pitch: 9, rad: 0.22, da: 0.55 });
  if (!sil) for (const [qx, qy] of [[-40, -10], [-6, -22], [26, -8], [-22, 14], [16, 16]]) BEAST.line(ctx, [[cx + qx * rx / 82 - 8, cy + qy], [cx + qx * rx / 82, cy + qy - 6], [cx + qx * rx / 82 + 8, cy + qy]], 3, pal.dot);
  legs.filter((L) => L.near).forEach(drawLeg);
  // head: lerp between the up pose and grazing (muzzle at the ground)
  const hx0 = cx + rx * 0.92, hcx = K.lerp(hx0 + 16, hx0 + 22, gd), hcy = K.lerp(cy - 22, -30 * hs + dy, gd) + (P.drop || 0), ha = K.lerp(0.55, 1.05, gd) + (P.nod || 0);
  if (gd > 0.05) BEAST.tube(ctx, [[hx0 - 24, cy + 4], [K.lerp(hx0 - 8, hcx - 14, 0.5), K.lerp(cy, hcy, 0.5)], [hcx - 12 * hs, hcy - 8 * hs]], 30 * hs, 24 * hs, col(pal.wool), 4);
  ctx.save(); ctx.translate(hcx, hcy); ctx.rotate(ha); ctx.scale(hs, hs);
  const ev = K.clamp(P.ears ?? 0, -1, 1);
  shape(ctx, [[-18, -10], [-32, -16 - ev * 10], [-42, -8 - ev * 12], [-18, 0]], col(pal.far), { lw: 3.5, seed: 82 });
  const face = [[-20, -16], [4, -18], [30, -10], [40, 2], [34, 14], [6, 18], [-18, 12], [-24, -2], [-20, -16]];
  shape(ctx, face, col(pal.face), { lw: 5, seed: 83 });
  if (!sil) {
    shape(ctx, ell(-16, -16, 16, 12, 16), pal.wool, { lw: 4, seed: 84, dot: pal.dot, pitch: 7, rad: 0.2, da: 0.5 });
    const o = Math.max(P.talk || 0, P.chew ? Math.abs(Math.sin(P.chew * 8)) * 0.35 : 0), m = P.mouth || 'closed';
    if (o > 0.02 || m === 'open') { const k = Math.max(o, m === 'open' ? 1 : 0); shape(ctx, [[18, 12], [36, 10], [32, 14 + k * 12], [20, 14 + k * 6]], C.black, { lw: 2, seed: 3 }); ctx.fillStyle = C.red; ctx.fillRect(22, 14 + k * 3, 8, 3 + k * 3); }
    else if (m === 'smile') BEAST.line(ctx, [[20, 8], [28, 13], [36, 8]], 3, C.white); else BEAST.line(ctx, [[22, 11], [36, 9]], 3, '#6f6a86');
    shape(ctx, ell(36, 0, 3, 3, 8), C.black, { lw: 0 });
  }
  if (ram) { const hp = []; for (let i = 0; i <= 26; i++) { const th = i / 26 * 5.4, r = 24 - i * 0.62; hp.push([-6 + Math.cos(th + 3.6) * r, -6 + Math.sin(th + 3.6) * r]); } BEAST.tube(ctx, hp, 15, 6, col(pal.horn), 3.5); if (!sil) for (let i = 3; i < hp.length - 3; i += 4) BEAST.line(ctx, [[hp[i][0] - 3, hp[i][1] - 3], [hp[i][0] + 3, hp[i][1] + 3]], 2, '#8a6a4a'); }
  shape(ctx, [[-12, -8], [-24, -14 - ev * 10], [-38, -6 - ev * 14], [-14, 2]], col(pal.face), { lw: 3.5, seed: 85 });
  ctx.restore();
  if (!sil) { const E = BEAST.rot([4 * hs, -6 * hs], ha); eyeAt(ctx, hcx + E[0], hcy + E[1], P.eyes || 'open', 0.8); if (P.brow) BEAST.brow(ctx, hcx + E[0], hcy + E[1] - 15, P.brow, 18); }
  ctx.restore();
}
