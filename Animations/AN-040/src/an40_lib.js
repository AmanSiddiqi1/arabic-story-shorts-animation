// ===== AN-040 The Cat and the Crow: story-local drawings proposed for the Library (see library_proposals.md) =====
// an40Leopard (big spotted cat), an40Dog (sheepdog, 3 palettes), an40CatLie (curled resting cat over the Library cat),
// an40Forest / an40Pasture / an40Chase (sets), an40Inset (round picture in picture), an40RunInPlace (wind-up phase).
// All side view, feet at (x, y), facing dir; legs on the Library BEAST rig; shared acting fields through acting().

// ---------- leopard: about 400 x 220 at s 1 ----------
// P: {x,y,s,dir,ph,amp,stride (gait radius, 30), crouch 0..1, raise 0..1 (near fore paw up), headTurn 0..1 (looks back over the shoulder),
//   mouth (closed|smile|frown|open), snarl 0..1 (lips up, fangs), lick 0..1 (tongue over the muzzle), brow, ears (-1 flat .. 1 up),
//   tailUp, tailTuck 0..1, tw (tail tip twitch -1..1), whisk (-1 back .. 1 forward), eyes, drop, nod, shake, rot, silhouette}
const AN40_LEO = { body: C.yellow, far: '#d9a40c', dot: C.red, cream: CREAM, ros: C.black, rc: '#b5701a' };
const AN40_ROS = (() => { const r = K.rng(404), out = []; let n = 0; while (out.length < 20 && n++ < 400) { const x = -118 + r() * 226, y = -170 + r() * 68; if (Math.pow(x / 124, 2) + Math.pow((y + 128) / 48, 2) < 0.8 && out.every((q) => Math.hypot(q[0] - x, q[1] - y) > 30)) out.push([x, y, 9 + r() * 4]); } return out; })();
function an40LeopardRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = AN40_LEO, sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, cr = K.clamp(P.crouch || 0), R = P.stride ?? 30, dy = BEAST.bob(ph, amp, 3) + 44 * cr;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const defs = [[92, 1.5 * Math.PI, true, false], [-92, Math.PI, false, false], [-78, 0, false, true], [106, 0.5 * Math.PI, true, true]];
  const legs = defs.map(([hx, off, fore, near]) => { const H = [hx, -112 + dy]; const [dx, lift] = BEAST.gait(ph, off, R, 22, amp);
    let Ft = [hx + 4 + dx + (fore ? 14 : -10) * cr, -lift], Kn = BEAST.ik(H, Ft, 56, 60, -1);
    if (fore && near && P.raise) { const r = K.clamp(P.raise); Ft = BEAST.lp(Ft, [H[0] + 46, H[1] + 50], r); Kn = BEAST.lp(Kn, [H[0] + 40, H[1] + 6], r); }
    return { H, Kn, F: Ft, near }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 26, w2: 21, col: col(L.near ? pal.body : pal.far), paw: col(L.near ? pal.body : pal.far), pawW: 19, pawH: 9, pawDx: 7, ol: 4.5 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // tail: hangs and curls up at the tip; tailTuck pulls it between the hind legs
  { const r = [-122, -146 + dy], tu = P.tailUp ?? 0.25, tk = K.clamp(P.tailTuck || 0), tw = P.tw || 0;
    const A = [[r[0] - 50, r[1] + 60], [r[0] - 110, r[1] + 120 - 150 * tu], [r[0] - 168 + 22 * tw, r[1] + 70 - 210 * tu]], Bk = [[r[0] - 26, r[1] + 70], [r[0] + 6, r[1] + 120], [r[0] + 70, r[1] + 128]];
    const cp = A.map((p, i) => BEAST.lp(p, Bk[i], tk)), pts = K.bezier(r, cp[0], cp[1], cp[2], 16);
    BEAST.tube(ctx, pts, 22, 14, col(pal.body), 4);
    if (!sil) { for (let i = 5; i < pts.length - 2; i += 3) { const a = pts[i - 1], b = pts[i + 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2, w = K.lerp(10, 7, i / pts.length); BEAST.line(ctx, [[pts[i][0] - Math.cos(ang) * w, pts[i][1] - Math.sin(ang) * w], [pts[i][0] + Math.cos(ang) * w, pts[i][1] + Math.sin(ang) * w]], 5); }
      BEAST.tube(ctx, pts.slice(-3), 14, 12, C.black, 0); } }
  // body
  const bodyPts = BEAST.rbox(0, -130 + dy, 128, 48, 0.62);
  if (cr > 0.01) shape(ctx, ell(82, -172 + dy - 10 * cr, 38, 24, 18), col(pal.body), { lw: 6, seed: 41 });   // shoulder blades above the back line when stalking
  shape(ctx, bodyPts, col(pal.body), sil ? { lw: 7 } : { lw: 7, seed: 42, dot: pal.dot, pitch: 10, rad: 0.16, da: 0.4 });
  if (!sil) { shape(ctx, BEAST.rbox(6, -96 + dy, 100, 15, 0.7), pal.cream, { lw: 0 });
    ctx.save(); K.poly(ctx, bodyPts, true); ctx.clip(); for (const [rx, ry, rr] of AN40_ROS) { ctx.beginPath(); ctx.arc(rx, ry + dy, rr * 0.55, 0, 7); ctx.fillStyle = pal.rc; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = pal.ros; ctx.beginPath(); ctx.arc(rx, ry + dy, rr, 0.3, 5.6); ctx.stroke(); } ctx.restore(); }
  legs.filter((L) => L.near).forEach(drawLeg);
  // neck + head
  const ht = K.clamp(P.headTurn || 0), hcx = K.lerp(168, 128, Math.sin(Math.PI / 2 * ht)), hcy = -168 + dy * 0.92 + (P.drop || 0) - 8 * Math.sin(Math.PI * ht);
  BEAST.tube(ctx, [[96, -142 + dy], [K.lerp(96, hcx, 0.5), K.lerp(-150 + dy, hcy, 0.5)], [hcx - 10, hcy + 8]], 58, 52, col(pal.body), 5);
  ctx.save(); ctx.translate(hcx, hcy); const fx = (ht < 0.5 ? 1 : -1) * Math.max(0.55, Math.abs(Math.cos(Math.PI * ht))); ctx.scale(fx, 1); ctx.rotate(P.nod || 0);
  const ev = K.clamp(P.ears ?? 0.7, -1, 1);
  for (const [ex, far] of [[-24, true], [2, false]]) { const exx = ex - (1 - ev) * 10, eyy = -36 + (1 - ev) * 9; shape(ctx, ell(exx, eyy, 16, 14 + 3 * ev, 14), col(far ? pal.far : pal.body), { lw: 5, seed: far ? 43 : 44 }); if (!sil) shape(ctx, ell(exx, eyy + 2, 8, 7, 10), C.black, { lw: 0 }); }
  shape(ctx, ell(0, 0, 50, 42, 30), col(pal.body), sil ? { lw: 7 } : { lw: 7, seed: 45, dot: pal.dot, pitch: 9, rad: 0.15, da: 0.4 });
  if (!sil) {
    for (const [sx, sy] of [[-28, -12], [-18, -26], [-34, 4], [-6, -30]]) { ctx.beginPath(); ctx.arc(sx, sy, 4.5, 0, 7); ctx.fillStyle = C.black; ctx.fill(); }
    shape(ctx, ell(36, 14, 27, 21, 22), pal.cream, { lw: 5, seed: 46 });
    shape(ctx, [[50, -2], [66, 2], [57, 12], [50, -2]], '#c8481a', { lw: 3, seed: 47 });
    const sn = K.clamp(P.snarl || 0), tk = P.talk || 0, m = P.mouth || 'closed', wb = (P.whisk || 0) * 0.35;
    for (const [a, l] of [[-0.2, 40], [0.05, 44], [0.3, 38]]) BEAST.line(ctx, [[40, 14], [40 + Math.cos(a - wb) * l, 14 + Math.sin(a - wb) * l]], 2.2, '#6a5a3a');
    if (sn > 0.02) { shape(ctx, [[22, 22], [62, 16], [60, 22 + 16 * sn], [26, 28 + 8 * sn]], C.black, { lw: 3, seed: 48 }); ctx.fillStyle = C.white; for (const [tx, tl] of [[52, 14], [30, 11]]) { ctx.beginPath(); ctx.moveTo(tx - 4, 18); ctx.lineTo(tx + 4, 18); ctx.lineTo(tx, 18 + tl * sn); ctx.fill(); }
      for (const k of [0, 1, 2]) BEAST.line(ctx, [[34 + k * 8, 4 - sn * 2], [38 + k * 8, -2 - sn * 4]], 3); }
    else BEAST.mouth(ctx, 24, 26, 58, 24, m, tk, false);
    if (P.lick) { const l = K.clamp(P.lick); shape(ctx, [[48, 20], [56 + 14 * l, 14 - 10 * l], [66 + 8 * l, 4 - 12 * l], [60, 26]], '#f07a8a', { lw: 3, seed: 49 }); }
    eyeAt(ctx, 18, -10, P.eyes || 'open', 0.8);
    if (P.brow) BEAST.brow(ctx, 18, -27, P.brow, 24);
  }
  ctx.restore();
  ctx.restore();
}
const an40Leopard = acting(an40LeopardRaw, () => AN40_LEO.body);
// head point (world) of the leopard for labels and eye lines
const an40LeoHead = (P) => BEAST.world(P, [K.lerp(168, 128, Math.sin(Math.PI / 2 * K.clamp(P.headTurn || 0))) + 18, -178 + 44 * K.clamp(P.crouch || 0) * 0.92 + (P.drop || 0)]);

// ---------- dog: sheepdog about 240 x 190 at s 1; pal 0 tan, 1 white with black patches, 2 brown (one ear up) ----------
// P: {x,y,s,dir,pal,ph,amp,stride (22), gallop 0..1 (gathered/stretched pairs; feet may skate a little), sit 0..1, crouch 0..1 (play bow),
//   bark 0..1 (jaw open + forward jolt), mouth (closed|open|grit|smile), tongue 0..1, ears (-1 back .. 1 up), earStream 0..1, tailUp, tailWag (phase),
//   wagAmp, hackles 0..1, headTilt (radians), nod, drop, brow, eyes, shake, rot, silhouette}
const AN40_DOG_PAL = [{ body: '#d08a3a', dot: '#8a5a1e', far: '#a0662a', cream: '#f6e4bf', ear: '#262633', collar: C.red },
  { body: C.white, dot: '#b9b4c6', far: '#d6d2e0', cream: C.white, ear: '#262633', collar: C.blue, patch: '#262633' },
  { body: '#7a4a22', dot: '#4a2a10', far: '#5a3414', cream: '#f2d2a0', ear: '#4a2a10', collar: C.yellow, earUp: true }];
function an40DogRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = AN40_DOG_PAL[P.pal || 0] || AN40_DOG_PAL[0], sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, g = K.clamp(P.gallop || 0), sit = K.clamp(P.sit || 0), cr = K.clamp(P.crouch || 0), R = P.stride ?? 22, bk = K.clamp(P.bark || 0);
  const A = 0.2 * cr - 0.5 * sit + 0.07 * Math.sin(ph) * g, piv = cr > 0 ? [-58, -92] : [-58, -60], dy = BEAST.bob(ph, amp * (1 - g), 3) - 10 * g * Math.max(0, Math.sin(ph * 2)) + 30 * sit;
  const T = (p) => { const q = BEAST.rot(p, A, piv); return [q[0], q[1] + dy]; };
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0) + dir * 6 * bk * s, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const defs = [[50, 1.5 * Math.PI, true, false, 0.35], [-60, Math.PI, false, false, Math.PI + 0.35], [-48, 0, false, true, Math.PI], [62, 0.5 * Math.PI, true, true, 0]];
  const legs = defs.map(([hx, off, fore, near, goff]) => { const H = T([hx, -94]);
    let [dx, lift] = BEAST.gait(ph, off, R, 18, amp * (1 - sit) * (1 - g));
    if (g > 0) { const a = ph + goff, gx = (fore ? 1 : -1) * 0 + Math.cos(a) * R * 1.6, gl = Math.max(0, Math.sin(a)) * 34; dx = K.lerp(dx, gx, g); lift = K.lerp(lift, gl, g); }
    let Ft = [hx + 2 + dx + (fore ? 34 : 0) * cr, -lift], Kn = BEAST.ik(H, Ft, 44, 50, -1);
    if (fore && sit > 0) { const Fs = [H[0] + 2, 0]; Ft = BEAST.lp(Ft, Fs, sit); Kn = BEAST.lp(Kn, BEAST.lp(H, Fs, 0.5), sit); }
    if (!fore && sit > 0) { const Fs = [hx + 40, 0], Ks = [hx + 6, -34]; Ft = BEAST.lp(Ft, Fs, sit); Kn = BEAST.lp(Kn, Ks, sit); }
    return { H, Kn, F: Ft, near, fore }; });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: 20, w2: 16, col: col(L.near ? pal.body : pal.far), paw: col(P.pal === 2 ? pal.cream : L.near ? pal.body : pal.far), pawW: 14, pawH: 7, pawDx: 6, ol: 4 });
  legs.filter((L) => !L.near).forEach(drawLeg);
  // tail: bushy, wags
  { const r = T([-80, -118]), tu = P.tailUp ?? 0.5, wg = Math.sin(P.tailWag || 0) * (P.wagAmp ?? 0.5), a0 = -Math.PI + 0.3 - 1.1 * tu + wg;
    const p1 = [r[0] + Math.cos(a0) * 34, r[1] + Math.sin(a0) * 34], a1 = a0 + 0.35 + wg * 0.5, p2 = [p1[0] + Math.cos(a1) * 34, p1[1] + Math.sin(a1) * 34], a2 = a1 + 0.3 + wg * 0.4, p3 = [p2[0] + Math.cos(a2) * 26, p2[1] + Math.sin(a2) * 26];
    const pts = K.bezier(r, p1, p2, p3, 10); BEAST.tube(ctx, pts, 20, 16, col(pal.body), 4); if (!sil) BEAST.tube(ctx, pts.slice(-3), 15, 12, pal.cream, 0); }
  // body
  ctx.save(); ctx.translate(0, dy); ctx.translate(piv[0], piv[1]); ctx.rotate(A); ctx.translate(-piv[0], -piv[1]);
  const bodyPts = BEAST.rbox(-8, -110, 78, 34, 0.6);
  shape(ctx, bodyPts, col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 51, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  shape(ctx, ell(46, -104, 38, 38, 22), col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 52, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 });
  if (!sil) { shape(ctx, BEAST.rbox(-8, -108, 70, 28, 0.6), pal.body, { lw: 0 }); shape(ctx, ell(62, -96, 22, 28, 18), pal.cream, { lw: 0 });
    if (pal.patch) { ctx.save(); K.poly(ctx, bodyPts, true); ctx.clip(); shape(ctx, ell(-18, -142, 46, 22, 18), pal.patch, { lw: 0 }); ctx.restore(); } }
  const hk = K.clamp(P.hackles || 0); if (hk > 0.02) for (let i = 0; i < 7; i++) { const x0 = -60 + i * 17, y0 = -142 + Math.abs(i - 3) * 0.6; shape(ctx, [[x0 - 7, y0 + 4], [x0, y0 - 16 * hk - (i % 2) * 4 * hk], [x0 + 7, y0 + 4]], col(pal.body), { lw: 3.5, seed: 53 + i }); }
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  if (sit > 0.2) { const H = legs[2].H; shape(ctx, ell(H[0] + 10, H[1] + 22, 34 * sit, 30 * sit, 18), col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 62, dot: pal.dot, pitch: 8, rad: 0.15, da: 0.45 }); }
  // head
  const nk = T([70, -124]), hx = nk[0] + 30 + 8 * cr, hy = nk[1] - 30 + (P.drop || 0) + 12 * cr;
  BEAST.tube(ctx, [[nk[0] - 18, nk[1] + 14], [hx - 8, hy + 10]], 40, 36, col(pal.body), 4.5);
  if (!sil) seg(ctx, nk[0] - 2, nk[1] + 4, hx - 14, hy + 22, 9, pal.collar, 3);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate((P.headTilt || 0) + (P.nod || 0) + 0.3 * cr);
  const ev = K.clamp(P.ears ?? 0, -1, 1), es = K.clamp(P.earStream || 0);
  const ear = (ex, far, up) => { ctx.save(); ctx.translate(ex, -24); ctx.rotate(up ? -0.2 - 0.3 * es : 0.25 - ev * 0.45 + es * 1.2); const pts = up ? [[-10, 4], [-2, -34], [12, 2]] : [[-10, -2], [8, -4], [4, 30], [-6, 34], [-12, 18]]; shape(ctx, pts, col(far ? pal.far : pal.ear), { lw: 4, seed: far ? 54 : 55 }); ctx.restore(); };
  ear(-30, true, false);
  const jaw = bk * 0.55 + (P.mouth === 'open' ? 0.3 : 0);
  // lower jaw (opens on bark)
  if (jaw > 0.02 && !sil) { ctx.save(); ctx.translate(8, 18); ctx.rotate(jaw); shape(ctx, [[-4, -4], [44, -4], [44, 6], [0, 10]], C.black, { lw: 3, seed: 56 }); shape(ctx, [[0, 2], [48, 2], [46, 12], [2, 14]], pal.cream, { lw: 4, seed: 57 }); ctx.restore();
    shape(ctx, [[10, 16], [52, 14], [50, 18 + 30 * jaw], [12, 20 + 18 * jaw]], C.black, { lw: 0 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(28, 20 + 14 * jaw, 12, 4 + 5 * jaw, 0, 0, 7); ctx.fill(); ctx.fillStyle = C.white; for (const tx of [44, 30]) { ctx.beginPath(); ctx.moveTo(tx, 15); ctx.lineTo(tx + 6, 15); ctx.lineTo(tx + 3, 23); ctx.fill(); } }
  shape(ctx, BEAST.rbox(0, 0, 32, 28, 0.7), col(pal.body), sil ? { lw: 6 } : { lw: 6, seed: 58, dot: pal.dot, pitch: 7, rad: 0.15, da: 0.4 });
  shape(ctx, BEAST.rbox(34, 10, 22, 14, 0.7), col(pal.cream), { lw: 5, seed: 59 });
  if (!sil) {
    if (pal.patch) shape(ctx, ell(10, -8, 15, 13, 14), pal.patch, { lw: 0 });
    shape(ctx, ell(54, 2, 8, 7, 12), C.black, { lw: 2, seed: 60 });
    if (jaw <= 0.02) { const m = P.mouth || 'closed'; if (m === 'grit') { shape(ctx, [[22, 16], [54, 15], [54, 23], [22, 24]], C.white, { lw: 3, seed: 3 }); for (const k of [30, 38, 46]) BEAST.line(ctx, [[k, 15], [k, 24]], 2.5); } else if (m === 'smile') BEAST.line(ctx, [[22, 14], [34, 22], [52, 16]], 4); else BEAST.line(ctx, [[22, 18], [52, 17]], 4); }
    if (P.tongue) { const tg = K.clamp(P.tongue); shape(ctx, [[30, 20 + 28 * jaw], [44, 20 + 28 * jaw], [44 + 4 * tg, 24 + 30 * tg + 28 * jaw], [32, 26 + 26 * tg + 28 * jaw]], '#f07a8a', { lw: 3, seed: 61 }); }
    eyeAt(ctx, 10, -8, P.eyes || 'open', 0.8);
    if (P.brow) BEAST.brow(ctx, 12, -24, P.brow, 20);
  }
  ear(pal.earUp ? -4 : -16, false, !!pal.earUp);
  ctx.restore();
  ctx.restore();
}
const an40Dog = acting(an40DogRaw, (P) => (AN40_DOG_PAL[P.pal || 0] || AN40_DOG_PAL[0]).body);
// dog head point (world), for gaze lines and lettering
const an40DogHead = (P) => BEAST.world(P, [112 + 8 * (P.crouch || 0), -150 + 12 * (P.crouch || 0) + (P.drop || 0)]);
// a dog stride per radian for walk(): (2R/PI) * s
const AN40_DOG_STRIDE = 2 * 22 / Math.PI, AN40_LEO_STRIDE = 2 * 30 / Math.PI;

// ---------- cat curled up resting (lie 0..1) on top of the Library cat ----------
// Library cat with crouch, sunk into the ground and clipped there so the legs fold away; a front paw and a tail wrapped round the front.
function an40CatLie(ctx, P) {
  const lie = K.clamp(P.lie || 0), s = P.s || 1, dir = P.dir ?? 1;
  if (lie <= 0.001) { cat(ctx, P); return; }
  const Q = { ...P, crouch: Math.max(P.crouch || 0, lie), y: P.y + 30 * s * lie, tailUp: K.lerp(P.tailUp ?? 0.4, 0, lie), drop: (P.drop || 0) + 10 * lie, amp: (P.amp || 0) * (1 - lie) };
  ctx.save(); ctx.beginPath(); ctx.rect(P.x - 400, P.y - 600, 800, 600 + 2); ctx.clip(); cat(ctx, Q); ctx.restore();
  const pal = CAT_PAL[P.pal || 0] || CAT_PAL[0], a = K.ease.out(K.clamp((lie - 0.4) / 0.6));
  if (a > 0) { ctx.save(); ctx.globalAlpha *= a * (P.alpha ?? 1);
    const tail = K.bezier([P.x - dir * 66 * s, P.y - 14 * s], [P.x - dir * 96 * s, P.y - 2 * s], [P.x - dir * 20 * s, P.y + 8 * s], [P.x + dir * (40 + 14 * (P.tailCurl || 0)) * s, P.y - 6 * s], 12);
    BEAST.tube(ctx, tail, 14 * s, 11 * s, pal.body, 4 * s);
    shape(ctx, ell(P.x + dir * 72 * s, P.y - 7 * s, 16 * s, 8 * s, 14), pal.body, { lw: 4 * s, seed: 3 }); ctx.restore(); }
}

// ---------- sets ----------
// forestEdge: world AN40_FW x 1230, ground 900. Forest wall x 0..520 (navy darkness behind the trunks), big tree trunk x 760.
const AN40_FW = 2500, AN40_TREE = { x: 760, w: 120, top: 260, crowns: [[820, 210, 190], [660, 290, 150], [990, 280, 160], [1120, 340, 120], [560, 340, 110]] };
const AN40_BRANCH = { root: [870, 420], tip: [1000, 392], perch: [960, 394] };
function an40Hills(ctx, d, w) { const hl = d ? d.hills : SKY.day.hills; for (let i = 0; i * 420 < w + 300; i++) { const [, by, br, col] = hl[i % 3]; ctx.beginPath(); ctx.ellipse(120 + i * 420, by, br, br * 0.5, 0, Math.PI, 0); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); } }
function an40ForestLand(c) {   // everything but the sky and the live parts (baked)
  hillTrees(c, { n: 20, seed: 9 });
  // forest darkness and the back trees
  c.fillStyle = NAVY2; c.beginPath(); c.moveTo(-10, 900); c.lineTo(-10, 330); c.quadraticCurveTo(260, 300, 540, 400); c.lineTo(560, 900); c.fill();
  c.fillStyle = dotPat(c, '#06123a', 9, 0.32); c.fill(); c.lineWidth = 6; c.strokeStyle = C.black; c.stroke();
  treeRow(c, { n: 5, seed: 12, hmin: 420, hvar: 120 });
  c.save(); c.globalAlpha = 0.45; c.fillStyle = NAVY2; c.fillRect(-10, 360, 560, 545); c.restore();
  ground(c, { w: AN40_FW });
  tree(c, AN40_TREE.x - AN40_TREE.w / 2, 900, { w: AN40_TREE.w, top: AN40_TREE.top, crowns: AN40_TREE.crowns });
  for (let x = 1260; x < AN40_FW; x += 90) seg(c, x, 896, x + 8, 872, 6, GREEN2, 2.5);
}
const an40ForestBake = () => bake('an40forest', AN40_FW, 1230, (c) => an40ForestLand(c));
const an40SkyBake = (u) => bake('an40sky' + u, AN40_FW, 920, (c) => { const d = skyCycle(c, u, { w: AN40_FW, hills: false, t: 0, sun: false }); an40Hills(c, d, AN40_FW); });
// sky for time of day u: baked at the fixed values, live while it changes
function an40Sky(ctx, u, t) {
  const d = dayCycle(u), fixed = [0.25, 0.38].find((v) => Math.abs(v - u) < 1e-4);
  if (fixed != null) ctx.drawImage(an40SkyBake(fixed), 0, 0, AN40_FW, 920); else { skyCycle(ctx, u, { w: AN40_FW, hills: false, sun: false, t }); an40Hills(ctx, d, AN40_FW); }
  if (d.sun) { const x = 300 + (d.sun[0] - 60) * 1.45; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, AN40_FW, 870); ctx.clip(); sun(ctx, x, d.sun[1] + 60, t); ctx.restore(); }
  return d;
}
// the two foreground occluder trunks in front of the forest
function an40FrontTrunks(ctx) { for (const [x, top] of [[250, 260], [380, 320]]) shape(ctx, [[x - 34, 905], [x - 26, top], [x + 26, top], [x + 34, 905]], '#6a4410', { lw: 8, seed: x, dot: C.black, pitch: 9, rad: 0.2, da: 0.5 }); }
// the high branch (live: it dips when the crow lands)
function an40Branch(ctx, dip) { const { root, tip } = AN40_BRANCH, mid = [K.lerp(root[0], tip[0], 0.55), K.lerp(root[1], tip[1], 0.55) + dip * 0.5];
  BEAST.tube(ctx, [[root[0] - 60, root[1] + 14], root, mid, [tip[0], tip[1] + dip]], 26, 12, WOOD, 4); shape(ctx, ell(tip[0] + 8, tip[1] + dip - 8, 22, 14, 14), GREEN, { lw: 4, seed: 3 }); }
// treetop shake: a crown at (x, y, r) wobbling (live, over the baked forest)
function an40ShakeTop(ctx, x, y, r, k) { if (k <= 0.01) return; const dx = Math.sin(k * 30) * 8 * k; ctx.save(); ctx.translate(x + dx, y); ctx.rotate(Math.sin(k * 26) * 0.06 * k); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = GREEND; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }

// pasture: world 1600 x 1230, ground 900
const AN40_PW = 2500;
const an40PastureBake = () => bake('an40pasture', AN40_PW, 1230, (c) => {
  const d = skyCycle(c, 0.25, { w: AN40_PW, hills: false, sun: false }); an40Hills(c, d, AN40_PW); hillTrees(c, { n: 19, seed: 21 });
  // the home tree, far away on the left horizon (30 %)
  c.save(); c.translate(110, 880); c.scale(0.3, 0.3); c.translate(-760, -900); tree(c, 700, 900, { w: 120, top: 260, crowns: AN40_TREE.crowns }); c.restore();
  ground(c, { w: AN40_PW });
  c.fillStyle = '#7cc04a'; c.fillRect(0, 880, AN40_PW, 12);
  const r = K.rng(31); for (let x = 30; x < AN40_PW; x += 90) { const xx = x + r() * 30; for (const k of [-8, 0, 8]) seg(c, xx + k, 896, xx + k * 1.6, 870 - Math.abs(k) * 0.5, 5, GREEN2, 2.5); }
});
const an40PastureSun = (ctx, t) => sun(ctx, 1300, 170, t);

// chaseRoad (loop mode): a strip drawn in view space 1000 wide; D = distance travelled (the pack runs left, the scenery slides right)
const AN40_CHASE_SKY = () => bake('an40chasesky', 1000, 920, (c) => { const d = skyCycle(c, 0.27, { w: 1000, hills: false, sun: false }); an40Hills(c, d, 1000); });
const AN40_CHASE_FAR = () => bake('an40chasefar', 1000, 920, (c) => hillTrees(c, { n: 12, seed: 33 }));
const AN40_CHASE_GROUND = () => bake('an40chaseground', 1000, 1230, (c) => { ground(c, { w: 1000 }); c.fillStyle = '#7cc04a'; c.fillRect(0, 880, 1000, 12); });
function an40Chase(ctx, D, t, o = {}) {
  const mod = (v, m) => ((v % m) + m) % m;
  ctx.drawImage(AN40_CHASE_SKY(), -300, 0, 1000, 920); ctx.drawImage(AN40_CHASE_SKY(), 700, 0, 1000, 920);
  cloudFlat(ctx, mod(220 + D * 0.05, 1400) - 200, 200, 0.8);
  // the home tree on the left horizon, growing with the distance covered
  const ts = o.treeS ?? 0.15; ctx.save(); ctx.translate(o.treeX ?? 150, 884); ctx.scale(ts, ts); ctx.translate(-760, -900); tree(ctx, 700, 900, { w: 120, top: 260, crowns: AN40_TREE.crowns }); ctx.restore();
  const fo = mod(D * 0.15, 1000); ctx.drawImage(AN40_CHASE_FAR(), fo - 1000, 0, 1000, 920); ctx.drawImage(AN40_CHASE_FAR(), fo, 0, 1000, 920);
  const go = mod(D, 1000); ctx.drawImage(AN40_CHASE_GROUND(), go - 1000, 0, 1000, 1230); ctx.drawImage(AN40_CHASE_GROUND(), go, 0, 1000, 1230);
  // mid layer: small bushes (0.6 D)
  for (let i = 0; i < 4; i++) { const x = mod(i * 330 + 90 + D * 0.6, 1320) - 160; bush(ctx, { x, w: 110, h: 46, y: 886, seed: 11 + i }); }
  // near landmarks (1.0 D): stump, sapling, rock, tall grass
  const L = 1600; for (const [k, x0] of [['stump', 100], ['rock', 520], ['grass', 900], ['sapling', 1250]]) { const x = mod(x0 + D, L) - 300; if (x < -200 || x > 1200) continue;
    if (k === 'stump') { shape(ctx, [[x - 34, 904], [x - 28, 846], [x + 28, 846], [x + 34, 904]], WOOD, { lw: 6, seed: 5, dot: C.black, pitch: 8, rad: 0.18 }); shape(ctx, ell(x, 846, 28, 10, 16), '#e8c27a', { lw: 5, seed: 6 }); }
    else if (k === 'rock') shape(ctx, [[x - 50, 904], [x - 36, 868], [x + 6, 856], [x + 44, 874], [x + 54, 904]], '#9a94a8', { lw: 6, seed: 7, dot: '#6f6a86', pitch: 8, rad: 0.2 });
    else if (k === 'grass') { const fl = o.flat ? o.flat(x) : 0; for (let j = -3; j <= 3; j++) seg(ctx, x + j * 9, 900, x + j * 14 - 30 * fl, 900 - (70 - Math.abs(j) * 8) * (1 - 0.7 * fl), 6, GREEN2, 2.5); }
    else { seg(ctx, x, 904, x + 4, 760, 12, WOOD, 4); for (const [dx, dy, r] of [[0, 740, 44], [-34, 770, 30], [36, 772, 30]]) shape(ctx, ell(x + dx, dy, r, r, 18), GREEN, { lw: 5, seed: dx + 50, dot: GREEND, pitch: 9, rad: 0.25 }); } }
}

// ---------- round inset (picture in picture), drawn in PANEL space (1000 x 1230 units) ----------
// p 0..1 iris; draw(c) paints the inset scene in panel units (set its own camera inside).
function an40Inset(ctx, cx, cy, r, p, draw) {
  const rr = r * K.ease.out(K.clamp(p)); if (rr < 2) return;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); draw(ctx); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, rr - 9, 0, 7); ctx.stroke(); ctx.restore();
}

// ---------- runInPlace: virtual distance that keeps growing while the real x holds (legs spin before the bolt) ----------
// returns the leg phase for a figure whose real position xf holds from t0 to t1 (spin rate in radians per second), then follows xf
function an40RunInPlace(xf, t, t0, t1, stride, rate = 30) { const base = xf(t) / stride; if (t < t0) return base; const spin = Math.min(t, t1) - t0; return base - spin * rate * (t < t1 ? 1 : 1); }
