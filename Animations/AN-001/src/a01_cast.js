// ===== AN-001 The Bull and the Ass: story cast and props (proposed for Library/, see library_proposals.md) =====
// a01Bull: heavy ox on the Library BEAST leg rig (cast/hooves.js), so walk(), footfalls(), kick() and dustBurst work unchanged.
// Props: a01Trough (feed trough), a01Plough (scratch plough with traces), a01Yoke, a01Sign (butcher's sign), small effects.

// ---------- the bull ----------
const A01_BULLC = { body: '#b5562a', dot: '#7a2a12', far: '#8a3a1a', hoof: '#2a1a10', muzzle: '#f4dfb4', horn: C.yellow, hornFar: '#c9961a', tuft: '#3a1a0a', inner: '#f08a8a' };
// geometry at s 1, feet at y 0, facing +x
const A01_BG = { body: [-10, -172, 136, 72], hipY: -140, fore: [70, 94], hind: [-106, -82], a: 70, b: 70, w: 30, w2: 23, hoofH: 15, hw: 13, R: 40, lift: 26,
  neckBase: [100, -196], head: [176, -196], headA: 0.3, tail: [-140, -206], lieDrop: 98, yoke: [126, -240] };
const A01_GAIT_BULL = 2 * 40 / Math.PI;   // walk(xf, t, { stride: A01_GAIT_BULL * s })
// P: x, y, s, dir, ph, amp, lie, headDown, headTurn (0..1 looks back), neck (stretch forward 0..1), talk, chew, mouth, brow, eyes (open|wide|x|shut),
//    ears (-1 down .. 1 up), tongue 0..1, snort 0..1, sag 0..1, stretch 0..1 (cat stretch), legUp 0..1 (sick act while lying), raise, tailUp, tailDown,
//    tailSwish, yoke, yokeMark, drop (head drop px), ring (nose-ring swing, radians), tired (eye rings), silhouette; plus the acting fields.
function a01BullRaw(ctx, P) {
  const B = A01_BG, pal = A01_BULLC, s = P.s || 1, dir = P.dir ?? 1, sil = !!P.silhouette, col = (c) => (sil ? C.black : c);
  const ph = (P.ph || 0) * Math.sign(dir || 1), amp = P.amp ?? 0, lie = K.clamp(P.lie || 0), sag = K.clamp(P.sag || 0), st = K.clamp(P.stretch || 0);
  const dy = BEAST.bob(ph, amp, 3) * (1 - lie) + lie * B.lieDrop + sag * 8, A = st * 0.15, piv = [B.hind[0], B.hipY];
  const T = (p) => { const q = BEAST.rot(p, A, piv); return [q[0], q[1] + dy]; };
  const shake = P.shake ? Math.sin(P.shake * 50) * 3 : 0;
  ctx.save(); ctx.translate(P.x + shake, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  // legs
  const defs = [[B.fore[0], 1.5 * Math.PI, true, false], [B.hind[0], Math.PI, false, false], [B.hind[1], 0, false, true], [B.fore[1], 0.5 * Math.PI, true, true]];
  const legs = defs.map(([hx, off, fore, near]) => {
    const H = T([hx, B.hipY]); let [dx, lift] = BEAST.gait(ph, off, B.R, B.lift, amp);
    let Ft = [hx + 4 + dx + (fore ? st * 80 : 0), -lift];
    if (fore && near && P.raise) Ft = BEAST.lp(Ft, [H[0] + 64, H[1] + 82], K.clamp(P.raise));
    let Kn = BEAST.ik(H, Ft, B.a, B.b, fore ? 1 : -1);
    if (lie > 0) { let fk = [hx + (fore ? 52 : 36), -12], ff = [hx + (fore ? -20 : 58), -8];
      if (fore && near && P.legUp) { const u = K.clamp(P.legUp); fk = BEAST.lp(fk, [hx + 46, -92], u); ff = BEAST.lp(ff, [hx + 88, -168], u); }
      Kn = BEAST.lp(Kn, fk, lie); Ft = BEAST.lp(Ft, ff, lie); }
    return { H, Kn, F: Ft, near };
  });
  const drawLeg = (L) => BEAST.limb(ctx, L.H, L.Kn, L.F, { w: B.w, w2: B.w2, col: col(L.near ? pal.body : pal.far), hoof: col(pal.hoof), hoofH: B.hoofH, hw: B.hw });
  // tail (behind the body)
  ctx.save(); ctx.translate(0, dy); ctx.translate(piv[0], piv[1]); ctx.rotate(A); ctx.translate(-piv[0], -piv[1]);
  { const [tx, ty] = B.tail, up = (P.tailUp || 0) - (P.tailDown || 0) * 0.9 - sag * 0.4, sw = P.tailSwish || 0, L = 120;
    const pts = K.bezier([tx, ty], [tx - L * 0.3, ty - 10 - 40 * up], [tx - L * 0.36 + sw * 16, ty + L * 0.45 - 70 * up + (P.tailDown || 0) * 10], [tx - L * 0.2 + sw * 34 - up * 40 + (P.tailDown || 0) * 70, ty + L * 0.95 - 120 * up], 12);
    BEAST.tube(ctx, pts, 11, 6, col(pal.body), 3.5); const e2 = pts[pts.length - 1];
    shape(ctx, [[e2[0] - 10, e2[1] - 10], [e2[0] + 10, e2[1] - 10], [e2[0] + 8, e2[1] + 22], [e2[0], e2[1] + 32], [e2[0] - 8, e2[1] + 22]], col(pal.tuft), { lw: 3, seed: 8 }); }
  ctx.restore();
  legs.filter((L) => !L.near).forEach(drawLeg);
  // body with shoulder hump and swayed back
  ctx.save(); ctx.translate(0, dy); ctx.translate(piv[0], piv[1]); ctx.rotate(A); ctx.translate(-piv[0], -piv[1]);
  const [bx, by, brx, bry] = B.body;
  const bodyPts = BEAST.rbox(bx, by, brx, bry, 0.6, 48).map(([x, y]) => { if (y >= by) return [x, y]; const k = (by - y) / bry; return [x, y - k * 34 * Math.exp(-(((x - 58) / 50) ** 2)) + k * sag * 22 * Math.exp(-(((x + 30) / 70) ** 2))]; });
  shape(ctx, bodyPts, col(pal.body), sil ? { lw: 6, seed: 5 } : { lw: 7, seed: 5, dot: pal.dot, pitch: 9, rad: 0.17, da: 0.55 });
  if (!sil) { ctx.save(); K.poly(ctx, bodyPts, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 8, 0.28); ctx.globalAlpha = 0.5; ctx.fillRect(bx - brx, by + bry * 0.25, brx * 2, bry); ctx.restore(); }
  ctx.restore();
  legs.filter((L) => L.near).forEach(drawLeg);
  // neck + head
  ctx.save(); ctx.translate(0, dy); ctx.translate(piv[0], piv[1]); ctx.rotate(A); ctx.translate(-piv[0], -piv[1]);
  const hd = K.clamp(P.headDown ?? 0, -0.6, 1.2), turn = K.clamp(P.headTurn || 0), nA = 0.58 * hd + 0.32 * sag - 0.2 * turn;
  const nb = B.neckBase, nk = (P.neck || 0) * 30;
  ctx.save(); ctx.translate(nb[0], nb[1]); ctx.rotate(nA); ctx.translate(-nb[0], -nb[1]); ctx.translate(nk * 0.9, nk * 0.15);
  // neck
  const neck = [[70 - nk, -232], [142, -238], [178, -170], [168, -150], [104 - nk, -128]];
  shape(ctx, neck, col(pal.body), sil ? { lw: 0 } : { lw: 0, dot: pal.dot, pitch: 9, rad: 0.17, da: 0.55 });
  BEAST.line(ctx, [[124 - nk * 0.3, -239], [142, -238]], 6.5); BEAST.line(ctx, [[176, -158], [104 - nk, -128]], 6.5);
  if (P.yokeMark && !sil) { seg(ctx, 124, -232, 138, -150, 10, '#f0c09a', 0); ctx.save(); ctx.globalAlpha = 0.6; seg(ctx, 120, -232, 134, -150, 3, '#c0602a', 0); ctx.restore(); }
  // head frame (flip for a look back)
  const flip = turn > 0.5, fx = (flip ? -1 : 1) * (0.72 + 0.28 * Math.abs(1 - 2 * turn)), th0 = B.headA + 0.42 * hd + 0.2 * sag - (P.chinUp || 0) * 0.5, th = flip ? -th0 : th0;
  const [hcx, hcy0] = B.head, hcy = hcy0 + (P.drop || 0), HP = (p) => { const q = BEAST.rot([p[0] * fx, p[1]], th); return [hcx + q[0], hcy + q[1]]; };
  const hornPts = (bx0) => [[bx0, -36], [bx0 - 14, -68], [bx0 + 2, -96], [bx0 + 28, -104]].map(HP);
  const earAng = (v) => Math.PI + 0.35 - 0.75 * K.clamp(v ?? (0.1 - sag * 1.2), -1, 1);
  const ear = (base, far) => { const E = HP(base), a = earAng(P.ears) * (flip ? -1 : 1) + (flip ? Math.PI : 0) + th, d = [Math.cos(a), Math.sin(a)], pp = [-d[1], d[0]], L = 50, W = 26;
    const tip = [E[0] + d[0] * L, E[1] + d[1] * L], m1 = [E[0] + d[0] * L * 0.5 + pp[0] * W * 0.55, E[1] + d[1] * L * 0.5 + pp[1] * W * 0.55], m2 = [E[0] + d[0] * L * 0.5 - pp[0] * W * 0.55, E[1] + d[1] * L * 0.5 - pp[1] * W * 0.55];
    shape(ctx, [[E[0] + pp[0] * 10, E[1] + pp[1] * 10], m1, tip, m2, [E[0] - pp[0] * 10, E[1] - pp[1] * 10]], col(far ? pal.far : pal.body), { lw: 4, seed: far ? 31 : 32 });
    if (!far && !sil) shape(ctx, [[K.lerp(E[0], tip[0], 0.25), K.lerp(E[1], tip[1], 0.25)], [K.lerp(m1[0], E[0], 0.3), K.lerp(m1[1], E[1], 0.3)], [K.lerp(E[0], tip[0], 0.8), K.lerp(E[1], tip[1], 0.8)], [K.lerp(m2[0], E[0], 0.3), K.lerp(m2[1], E[1], 0.3)]], pal.inner, { lw: 0 }); };
  BEAST.tube(ctx, hornPts(-38), 16, 5, col(pal.hornFar), 4);
  ear([-40, -14], true);
  ctx.save(); ctx.translate(hcx, hcy); ctx.rotate(th); ctx.scale(fx, 1);
  const head = [[-46, -36], [-8, -44], [28, -36], [52, -14], [62, 12], [60, 36], [36, 50], [-2, 48], [-34, 32], [-52, 4], [-46, -36]];
  shape(ctx, head, col(pal.body), sil ? { lw: 0 } : { lw: 0, dot: pal.dot, pitch: 8, rad: 0.16, da: 0.5 });
  if (!sil) { ctx.save(); K.poly(ctx, head, true); ctx.clip(); ctx.fillStyle = pal.muzzle; ctx.beginPath(); ctx.ellipse(42, 28, 30, 27, 0, 0, 7); ctx.fill(); ctx.restore(); }
  ink(ctx, head, 6, 33);
  if (!sil) {
    shape(ctx, ell(54, 18, 5, 4, 10), C.black, { lw: 0 });
    const o = Math.max(P.talk || 0, (P.chew || 0) * 0.35);
    BEAST.mouth(ctx, 14, 42, 52, 40, P.mouth || 'closed', o, false);
    if (P.tongue) { const L = 10 + 30 * K.clamp(P.tongue); shape(ctx, [[34, 40], [50, 40], [52, 40 + L], [44, 46 + L], [36, 40 + L * 0.9]], '#f07a8a', { lw: 3, seed: 6 }); }
    // nose ring (swings after a shake)
    const ra = P.ring || 0, rc = [58 + Math.sin(ra) * 6, 34 + 6 * Math.cos(ra)];
    ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(rc[0], rc[1], 11, 0, 7); ctx.stroke(); ctx.lineWidth = 4.5; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
    if (P.snort) { ctx.save(); ctx.globalAlpha *= K.clamp(P.snort); for (const [dx2, dy2, r] of [[72, 14, 7], [86, 10, 9], [102, 4, 11]]) shape(ctx, ell(dx2, dy2, r, r * 0.8, 12), C.white, { lw: 3, seed: 9 }); ctx.restore(); }
  }
  ctx.restore();
  if (!sil) {
    const E = HP([-8, -10]), mode = P.eyes || 'open';
    if (P.tired) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = '#5a1a0a'; ctx.beginPath(); ctx.arc(E[0], E[1] + 4, 15, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.translate(E[0], E[1]); ctx.scale(1.35, 1.35); ctx.translate(-E[0], -E[1]);
    if (mode === 'x') BEAST.eyeX(ctx, E[0], E[1], 8); else eyeAt(ctx, E[0], E[1], mode, 0.8);
    ctx.restore();
    if (P.brow) BEAST.brow(ctx, E[0] + 2, E[1] - 20, P.brow, 26);
  }
  BEAST.tube(ctx, hornPts(-24), 18, 5, col(pal.horn), 4);
  ear([-30, -18], false);
  if (P.yoke && !sil) a01YokeLocal(ctx, 0);
  ctx.restore();
  ctx.restore();
  ctx.restore();
}
const a01Bull = acting(a01BullRaw, () => A01_BULLC.body);
// head and yoke points in world units (approximate: ignores the neck rotation)
const a01BullHead = (P) => { const s = P.s || 1, d = P.dir ?? 1, l = K.clamp(P.lie || 0); return [P.x + d * s * (176 + 30 * (P.headDown || 0)), P.y + s * (-196 + 98 * l + 60 * K.clamp(P.headDown || 0) + (P.sag || 0) * 40)]; };
const a01BullYokeW = (P) => { const s = P.s || 1, d = P.dir ?? 1; return [P.x + d * s * 128, P.y + s * (-228 + 98 * K.clamp(P.lie || 0))]; };

// ---------- yoke (neck yoke seen from the side: a curved bar on the neck and a bow down the front) ----------
function a01YokeLocal(ctx, lift) {
  ctx.save(); ctx.translate(0, -lift);
  seg(ctx, 118, -248, 134, -150, 7, '#c9a35a', 3);   // bow
  shape(ctx, [[86, -238], [100, -258], [160, -262], [176, -244], [160, -236], [100, -232], [86, -238]], WOOD, { lw: 4.5, seed: 61, dot: '#6e4a12', pitch: 6, rad: 0.25, da: 0.5 });
  shape(ctx, ell(168, -250, 6, 6, 10), C.yellow, { lw: 2.5, seed: 62 });
  ctx.restore();
}
// a01Yoke(ctx, x, y, s, dir, rot): free yoke (in hands, on the ground, on the donkey); (x, y) = the bar centre
function a01Yoke(ctx, x, y, s = 0.8, dir = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(dir * s, s); ctx.translate(-130, 248); a01YokeLocal(ctx, 0); ctx.restore(); }
// donkey neck point (Library donkey, EQUINE.donkey geometry) for the yoke
const a01DonkeyNeck = (P) => BEAST.world({ ...P, x: P.x, y: P.y + (P.s || 1) * 84 * K.clamp(P.lie || 0) }, [104, -206 + 18 * K.clamp(P.sag || 0)]);
const a01DonkeyHead = (P) => BEAST.world({ ...P, y: P.y + (P.s || 1) * 84 * K.clamp(P.lie || 0) }, [168 + 10 * K.clamp(P.headDown || 0), -222 + 70 * K.clamp(P.headDown || 0) + 50 * K.clamp(P.sag || 0)]);

// ---------- feed trough: 140 wide, top edge at y0, fill 0..1 (heaped yellow feed), sparkle ----------
function a01Trough(ctx, x, y0, fill = 1, o = {}) {
  const w = o.w || 140, h = 66, r = K.rng(o.seed || 5);
  ctx.save(); ctx.translate(x + (o.dx || 0), 0);
  for (const lx of [-w / 2 + 14, w / 2 - 14]) seg(ctx, lx, y0 + h - 6, lx + (lx < 0 ? -6 : 6), y0 + h + 32, 9, '#6e4a12', 3);
  if (fill > 0.02) { const mh = 44 * fill; shape(ctx, [[-w / 2 + 8, y0 + 8], [-w / 2 + 16, y0 + 2 - mh * 0.6], [-w / 4, y0 - mh * 0.95], [0, y0 - mh], [w / 4, y0 - mh * 0.9], [w / 2 - 14, y0 + 2 - mh * 0.55], [w / 2 - 8, y0 + 8]], C.yellow, { lw: 4, seed: 63, dot: '#e2701a', pitch: 6, rad: 0.28, da: 0.6 });
    for (let i = 0; i < 6; i++) { const sx = (r() - 0.5) * w * 0.7, sy = y0 - mh * (0.3 + r() * 0.5); seg(ctx, sx, sy, sx + 12, sy - 6, 2.5, '#d9a420', 1); } }
  else { seg(ctx, -20, y0 + 6, -12, y0 + 4, 3, C.yellow, 1.5); seg(ctx, 18, y0 + 7, 26, y0 + 8, 3, C.yellow, 1.5); }
  shape(ctx, [[-w / 2, y0], [w / 2, y0], [w / 2 - 8, y0 + h], [-w / 2 + 8, y0 + h], [-w / 2, y0]], WOOD, { lw: 5, seed: 64, dot: '#6e4a12', pitch: 7, rad: 0.22, da: 0.45 });
  for (const py of [y0 + 22, y0 + 44]) BEAST.line(ctx, [[-w / 2 + 6, py], [w / 2 - 6, py]], 3, '#6e4a12');
  if (o.sparkle) { ctx.save(); ctx.globalAlpha *= o.sparkle; star(ctx, 26, y0 + 18, 14, C.white, 0.3); star(ctx, -30, y0 + 30, 9, C.white, 0.1); ctx.restore(); }
  ctx.restore();
}

// ---------- plough: share point at (sx, gy) on the ground, beam rising forward, handle at the back ----------
// o: { dig 0..1 (share sinks 18), yoke [x, y] (traces to this point; sag when slack), taut 0..1, s }; returns the grip point (world)
function a01Plough(ctx, sx, gy, dir = 1, o = {}) {
  const s = o.s || 1, dig = K.clamp(o.dig || 0), P = (x, y) => [sx + dir * s * x, gy + s * y + dig * 16 * s];
  const tip = P(226, -88), grip = P(-34, -112);
  if (o.yoke) { const taut = K.clamp(o.taut ?? 1), d = Math.hypot(o.yoke[0] - tip[0], o.yoke[1] - tip[1]), sagY = (1 - taut) * Math.min(60, d * 0.25) + 4;
    for (const off of [-4, 4]) { const m = [(tip[0] + o.yoke[0]) / 2, (tip[1] + o.yoke[1]) / 2 + sagY + off]; const pts = K.bezier([tip[0], tip[1] + off], m, m, [o.yoke[0], o.yoke[1] + off * 0.5], 10); BEAST.line(ctx, pts, 6, C.black); BEAST.line(ctx, pts, 3, '#c9a35a'); } }
  seg(ctx, ...P(-4, -10), ...P(-44, -122), 9 * s, WOOD, 4);                 // handle
  seg(ctx, ...P(-44, -122), ...P(-30, -126), 8 * s, '#6e4a12', 3);           // grip
  seg(ctx, ...P(2, -22), ...tip, 12 * s, WOOD, 4);                           // beam
  shape(ctx, [P(-8, -26), P(52, -4), P(40, 6), P(-8, 4), P(-8, -26)], '#3a3a4a', { lw: 4, seed: 66 });   // share
  if (dig > 0.2) { ctx.save(); ctx.beginPath(); ctx.rect(sx - 200, gy + 4, 400, 60); ctx.clip(); shape(ctx, ell(sx + dir * 20 * s, gy + 6, 40 * s, 10 * s, 14), '#6e3a12', { lw: 0 }); ctx.restore(); }
  return grip;
}

// ---------- butcher's shop sign with a cleaver (icon only): (x, y) = top hook point ----------
function a01Sign(ctx, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  BEAST.line(ctx, [[-40, 0], [-50, 40]], 4, '#3a3a4a'); BEAST.line(ctx, [[40, 0], [50, 40]], 4, '#3a3a4a');
  shape(ctx, [[-66, 40], [66, 40], [66, 130], [-66, 130], [-66, 40]], WOOD, { lw: 5, seed: 67, dot: '#6e4a12', pitch: 7, rad: 0.22, da: 0.5 });
  shape(ctx, [[-44, 62], [22, 62], [30, 72], [30, 108], [-44, 108], [-44, 62]], '#e8eef4', { lw: 4.5, seed: 68, dot: '#9aa6b4', pitch: 6, rad: 0.25, da: 0.5 });
  shape(ctx, ell(-28, 74, 5, 5, 10), C.black, { lw: 0 });
  seg(ctx, 30, 84, 56, 84, 9, C.black, 2);
  ctx.restore();
}

// ---------- small effects ----------
// painPulse: two expanding red rings and three small stars at a point, starting at t0 (0.8 s)
function a01Pain(ctx, x, y, t, t0, sz = 1) { const u = (t - t0) / 0.8; if (u < 0 || u > 1) return;
  for (let i = 0; i < 2; i++) { const v = K.clamp(u * 1.4 - i * 0.3); if (v <= 0 || v >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - v; ctx.lineWidth = 7; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(x, y, (14 + 46 * v) * sz, 0, 7); ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + (i - 1) * 0.9, d = (30 + 30 * K.ease.out(u)) * sz; ctx.save(); ctx.globalAlpha = 1 - u * u; star(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, 11 * sz, C.yellow, u * 2); ctx.restore(); } }
// flush: red dots climbing over a head (centre hx, hy), amount 0..1
function a01Flush(ctx, hx, hy, k, r = 60) { if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.ellipse(hx, hy, r, r * 0.8, 0, 0, 7); ctx.clip(); ctx.beginPath(); ctx.rect(hx - r, hy + r - 2 * r * k, 2 * r, 2 * r * k); ctx.clip();
  ctx.globalAlpha = 0.8; ctx.fillStyle = dotPat(ctx, C.red, 7, 0.36); ctx.fillRect(hx - r, hy - r, 2 * r, 2 * r); ctx.restore(); }
// sweat drop popping off at (x, y) at t0
function a01Drop(ctx, x, y, t, t0, dx = 1) { const u = (t - t0) / 0.7; if (u < 0 || u > 1) return; const px = x + dx * 40 * u, py = y - 40 * Math.sin(Math.PI * u * 0.8) + 30 * u * u;
  ctx.save(); ctx.globalAlpha = 1 - u * u; shape(ctx, [[px, py - 14], [px + 8, py + 2], [px, py + 8], [px - 8, py + 2], [px, py - 14]], '#9cc4ff', { lw: 3, seed: 70 }); ctx.restore(); }
// green tick and red cross marks
function a01Tick(ctx, x, y, s, p) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); BEAST.line(ctx, [[-30, 0], [-8, 24], [36, -30]], 22, C.black); BEAST.line(ctx, [[-30, 0], [-8, 24], [36, -30]], 12, '#3f9d4a'); ctx.restore(); }
function a01Cross(ctx, x, y, s, p) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); for (const q of [[[-30, -30], [30, 30]], [[30, -30], [-30, 30]]]) { BEAST.line(ctx, q, 22, C.black); BEAST.line(ctx, q, 12, C.red); } ctx.restore(); }
// door icon (for balloons and clouds)
function a01DoorIcon(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-36, 50], [-36, -40], [0, -62], [36, -40], [36, 50], [-36, 50]], WOOD, { lw: 5, seed: 71, dot: '#6e4a12', pitch: 7, rad: 0.22, da: 0.5 }); shape(ctx, [[-22, 50], [-22, -24], [22, -24], [22, 50]], '#2a1a10', { lw: 3, seed: 72 }); ctx.restore(); }
// a little rising sun icon (for balloons)
function a01SunIcon(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.save(); ctx.beginPath(); ctx.rect(-140, -140, 280, 140); ctx.clip(); sun(ctx, 0, 0, t); ctx.restore(); BEAST.line(ctx, [[-130, 0], [130, 0]], 8); ctx.restore(); }
