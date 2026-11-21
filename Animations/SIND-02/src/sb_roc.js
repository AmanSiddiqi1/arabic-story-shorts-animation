// ===== SIND-02 roc (new reusable character; for SIND-06 and any roc, simurgh or giant bird) + rocEgg + giantFeather =====
// sbRoc(ctx, P, part): a gigantic gentle bird in side view, feet at (P.x, P.y), head toward +x for dir 1. At s 1: standing height
// about 1150, body 900 x 560 centred at (0, -620), head r 150 near (430, -980), beak 220, shank 90 thick, toes 200, each wing 1500,
// five tail streamers 500. Cloud-white plumage with a lilac hard shade (its wings read as the series cumulus), sky and cobalt crest and
// streamers (the feather colours), a gold beak, a big soft eye with a blush: huge and kind, never a monster.
// part: 'back' (far wing, streamers, far leg), 'front' (body, belly fringe, near leg, head, near wing) or 'all' (default). Draw an egg
// between the two passes so the brooding bird sits over it.
// P: x, y, s, dir, rot, t (ribbons), spread 0..1, flap -1..1 (1 = wings up), flapLag (flap a beat earlier, for the hand: follow-through),
// hipN / hipF (local hip x of the near / far leg), crouch 0..1, sit 0..1 (brooding: fluffed, lower, legs folded short), neck -1..1, headTurn (rad, hen tilt), beak 0..1, lid 0..1,
// nearA / farA (absolute wing angles, rad: -PI/2 up, 0 forward; a display spread), gaze [gx, gy], sq (breath), shake 0..1 (a ripple from neck to tail), feet {n: [x, lift], f: [x, lift]} (local), reach 0..1 (landing:
// feet forward), tuck 0..1 (flight: legs trail back), sil (flat silhouette colour), rim (edge colour for a silhouette against the sun).
// Returns world anchors { ankle, ankleF, eye, beak, tip, hip }.
const SB_ROCP = { body: '#fffaf4', shade: '#d6c6f0', line: '#5a4a8a', wing: '#ffffff', wingS: '#cdb8ec', far: '#e6dcf6', farS: '#b8a2e0',
  tip: '#9ad8ff', tipS: '#5aa8e8', crest: ['#7fd0ff', '#2f6fe0', '#ffcf3a'], beak: '#ffcf3a', beakS: '#d8961a', leg: '#b49a88', legS: '#86706a',
  claw: '#5a4a62', iris: '#3a2a6a', blush: '#ffb0c0', streak: ['#ffffff', '#9ad8ff', '#2f6fe0', '#9ad8ff', '#ffffff'] };
function sbRocWingTheta(fl) { return K.lerp(1.2, -1.95, (fl + 1) / 2); }
function sbRoc(ctx, P, part = 'all') {
  const s = P.s || 1, dir = P.dir || 1, t = P.t || 0, sp = K.clamp(P.spread || 0), fl = P.flap ?? 0, flL = P.flapLag ?? fl, cr = K.clamp(P.crouch || 0), sit = K.clamp(P.sit || 0);
  const sil = P.sil, col = (c) => sil || c, lineC = sil || SB_ROCP.line, lw = sil ? 0 : 4 / Math.max(0.4, Math.sqrt(s)), sq = P.sq ?? 1;
  const tf = (lx, ly) => { const a = (P.rot || 0) * dir, c = Math.cos(a), n = Math.sin(a), X = lx * dir * s, Y = ly * s; return [P.x + X * c - Y * n, P.y + X * n + Y * c]; };
  const drop = 70 * cr + 70 * sit, by = -620 + drop, puff = 1 + 0.1 * sit, shk = P.shake || 0;
  const cs = (pts, f, sh, o = {}) => celShade(ctx, pts, col(f), col(sh), { light: o.light || [0.3, -1], off: o.off ?? 30, lw: o.lw ?? lw, line: o.line || lineC, hi: sil ? null : o.hi });
  ctx.save(); ctx.translate(P.x, P.y); ctx.rotate((P.rot || 0) * dir); ctx.scale(dir * s, s * sq); ctx.lineJoin = 'round';
  const out = {};
  // ---- a leg: hip -> knee (inside the feather trousers) -> ankle -> toes. far legs darker
  const leg = (hip, foot, far) => {
    const [fx, lift] = foot, A = [fx + 10 * (P.reach || 0), -70 - lift], L1 = 270 - 70 * sit, L2 = 330 - 120 * sit, dx = A[0] - hip[0], dy = A[1] - hip[1], d = Math.min(Math.hypot(dx, dy), L1 + L2 - 1);
    const ca = K.clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1), base = Math.atan2(dy, dx), k = base + Math.acos(ca), Kn = [hip[0] + Math.cos(k) * L1, hip[1] + Math.sin(k) * L1];
    const tk = K.clamp(P.tuck || 0), Ae = [K.lerp(A[0], hip[0] - 320, tk), K.lerp(A[1], hip[1] + 120, tk)], Ke = [K.lerp(Kn[0], hip[0] - 80, tk), K.lerp(Kn[1], hip[1] + 90, tk)];
    const lc = far ? sbDark(SB_ROCP.leg, 0.2) : SB_ROCP.leg, ls = far ? sbDark(SB_ROCP.legS, 0.2) : SB_ROCP.legS;
    // shank: a 90-thick tapered quad with scale rings
    const ang = Math.atan2(Ae[1] - Ke[1], Ae[0] - Ke[0]), nx = -Math.sin(ang), ny = Math.cos(ang), w0 = 56, w1 = 45;
    const Q = [[Ke[0] + nx * w0, Ke[1] + ny * w0], [Ae[0] + nx * w1, Ae[1] + ny * w1], [Ae[0] - nx * w1, Ae[1] - ny * w1], [Ke[0] - nx * w0, Ke[1] - ny * w0]];
    cs(Q, lc, ls, { light: [-1, -0.2], off: 26 });
    if (!sil) { ctx.save(); ctx.strokeStyle = ls; ctx.lineWidth = 5; for (let i = 1; i < 7; i++) { const u = i / 7, cx = K.lerp(Ke[0], Ae[0], u), cy = K.lerp(Ke[1], Ae[1], u), w = K.lerp(w0, w1, u) * 0.9; ctx.beginPath(); ctx.moveTo(cx + nx * w, cy + ny * w); ctx.quadraticCurveTo(cx + Math.cos(ang) * 14, cy + Math.sin(ang) * 14, cx - nx * w, cy - ny * w); ctx.stroke(); } ctx.restore(); }
    // toes: three forward, one back, blunt claws; they curl a little when lifted
    const curl = K.clamp(lift / 120) * 0.5 + tk * 0.8;
    for (const [a, L] of [[0.18, 200], [0.02, 210], [-0.2, 180], [Math.PI - 0.15, 120]]) {
      const aa = a + (a < 1.5 ? curl : -curl), ex = Ae[0] + Math.cos(aa) * L, ey = Ae[1] + 58 + Math.sin(aa) * 18 + (lift > 0 ? curl * 40 : 0);
      seg(ctx, Ae[0], Ae[1] + 30, ex, ey, 52, col(lc), sil ? 0 : 3);
      if (!sil) { const ca2 = Math.atan2(ey - Ae[1] - 30, ex - Ae[0]); celShade(ctx, [[ex - Math.sin(ca2) * 20, ey + Math.cos(ca2) * 20], [ex + Math.cos(ca2) * 52, ey + Math.sin(ca2) * 52 + 14], [ex + Math.sin(ca2) * 20, ey - Math.cos(ca2) * 20]], SB_ROCP.claw, '#3a2a42', { light: [0, -1], off: 6, lw: 2.5 }); }
    }
    // feather trousers over the hip and knee
    const tr = []; for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI * 2, r = 1 + 0.12 * Math.sin(a * 7); tr.push([(hip[0] + Kn[0]) / 2 + Math.cos(a) * 120 * r, (hip[1] + Kn[1]) / 2 + 40 + Math.sin(a) * 175 * r]); }
    cs(tr, far ? SB_ROCP.far : SB_ROCP.body, far ? SB_ROCP.farS : SB_ROCP.shade, { off: 40, light: [0.2, -1] });
    return [Ae[0], Ae[1]];
  };
  // ---- a wing (near or far): shoulder, arm and hand angles, scalloped trailing edge of 9 lobes
  const wing = (far) => {
    const Sh = [60 + (far ? -40 : 0), by - 140], ov = far ? P.farA : P.nearA, th = ov ?? (sbRocWingTheta(fl) + (far ? -0.25 : 0)), thL = ov ?? (sbRocWingTheta(flL) + (far ? -0.25 : 0)), fold = -Math.PI + 0.12;
    const a1 = K.lerp(fold, th, sp), a2 = a1 + K.lerp(-0.05, (thL - th) * 0.9 + 0.12, sp), L1 = K.lerp(430, 620, sp), L2 = K.lerp(440, 880, sp);
    const Wr = [Sh[0] + Math.cos(a1) * L1, Sh[1] + Math.sin(a1) * L1], Tp = [Wr[0] + Math.cos(a2) * L2, Wr[1] + Math.sin(a2) * L2], LE = [], TE = [], N = 12;
    for (let i = 0; i <= N; i++) { const u = i / N, onArm = u < 0.42, v = onArm ? u / 0.42 : (u - 0.42) / 0.58, p = onArm ? [K.lerp(Sh[0], Wr[0], v), K.lerp(Sh[1], Wr[1], v)] : [K.lerp(Wr[0], Tp[0], v), K.lerp(Wr[1], Tp[1], v)], a = onArm ? a1 : a2;
      let nx = Math.sin(a) - 2 * Math.max(0, Math.sin(a)), ny = -Math.cos(a); { const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; }   // trailing edge toward the tail, continuous
      const c = K.lerp(K.lerp(330, 430, sp), K.lerp(150, 170, sp), Math.pow(u, 1.3)) * (far ? 0.92 : 1); LE.push(p); TE.push([p[0] + nx * c, p[1] + ny * c, nx, ny]); }
    const sc = []; for (let i = N; i > 0; i--) { const a = TE[i], b = TE[i - 1], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], r = Math.hypot(a[0] - b[0], a[1] - b[1]) * 0.42; sc.push([a[0], a[1]]); sc.push([m[0] + a[2] * r, m[1] + a[3] * r]); }
    sc.push([TE[0][0], TE[0][1]]);
    const pts = [...LE, ...sc], f = far ? SB_ROCP.far : SB_ROCP.wing, sh = far ? SB_ROCP.farS : SB_ROCP.wingS;
    cs(pts, f, sh, { off: K.lerp(50, 90, sp), light: [0.2, -1] });
    if (!sil) { // lilac secondary row and sky tips as hard bands inside the wing
      ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.lineCap = 'round';
      ctx.strokeStyle = far ? SB_ROCP.farS : '#e8defa'; ctx.lineWidth = 46; ctx.beginPath(); TE.forEach((p, i) => { const q = [K.lerp(LE[i][0], p[0], 0.55), K.lerp(LE[i][1], p[1], 0.55)]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.stroke();
      ctx.fillStyle = far ? SB_ROCP.tipS : SB_ROCP.tip; for (let i = 9; i <= N; i++) { const a = TE[i]; ctx.beginPath(); ctx.ellipse(a[0] - a[2] * 20, a[1] - a[3] * 20, 70, 70, 0, 0, 7); ctx.fill(); }
      ctx.restore(); ink(ctx, pts, lw, 3, lineC); }
    return far ? null : Tp;
  };
  const hipN = [P.hipN ?? 60, by + 150], hipF = [P.hipF ?? -70, by + 140], feet = P.feet || {}, fN = feet.n || [60 + 30 * sit, 0], fF = feet.f || [-80, 0];
  if (part !== 'front') {
    wing(true);
    // tail streamers: five ribbons on a travelling sine, arriving late
    for (let i = 0; i < 5; i++) { const a = Math.PI - 0.32 + i * 0.13 + (P.tailUp || 0), ox = -400, oy = by - 70 + i * 18;
      sbRibbon(ctx, ox, oy, a + 0.06 * Math.sin(SB_T2(t) * 2 + i), 500 - i * 30, 70, t, { col: col(SB_ROCP.streak[i]), shade: col(sbDark(SB_ROCP.streak[i], 0.18)), amp: 26 + 20 * (P.wind || 0), freq: 5 + i * 0.4, k: 1.1, ph: i * 0.9, lw: lw * 0.8, line: lineC }); }
    if (sit < 0.95) out.ankleF = leg(hipF, fF, true);
  }
  if (part !== 'back') {
    // body: an egg-shaped cloud of feathers, fuller at the chest; shake ripples along it
    const B = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, cx = Math.cos(a), sy = Math.sin(a), rip = shk * 14 * Math.sin(a * 6 - t * 30);
      let px = cx * 450 * puff, py = sy * 280 * puff + rip; if (px < 0) py -= (-px / 450) * 60; if (sy > 0 && sit > 0) py += sit * 40 * Math.sin(a * 9) * 0.4; B.push([px, by + py]); }
    cs(B, SB_ROCP.body, SB_ROCP.shade, { off: 70, light: [0.3, -1], hi: '#ffffff' });
    if (!sil) { ctx.save(); ctx.strokeStyle = sbMix(SB_ROCP.shade, '#ffffff', 0.35); ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const [x0, y0] of [[180, -40], [260, 40], [120, 90], [330, -100], [40, 160]]) { ctx.beginPath(); ctx.arc(x0, by + y0, 34, 0.2, Math.PI - 0.2); ctx.stroke(); } ctx.restore(); }
    // belly fringe: scalloped feathers hanging over the egg when brooding
    if (sit > 0.02) { const fr = []; for (let i = 0; i <= 16; i++) { const x = K.lerp(-400, 420, i / 16) * puff; fr.push([x, by + 200 * puff]); fr.push([x + 26, by + (230 + 46 * sit + 10 * Math.sin(SB_T2(t) * 1.2 + i)) * puff]); }
      fr.push([420 * puff, by + 120]); fr.push([-400 * puff, by + 120]); cs(fr, SB_ROCP.body, SB_ROCP.shade, { off: 22, light: [0, -1] }); }
    if (sit < 0.98) out.ankle = leg(hipN, fN, false); else out.ankle = [fN[0], -70];
    // neck and head (the head tilts like a hen's about the top of the neck)
    const nl = (P.neck || 0) * 90, H = [400 + 30 * (P.neck || 0), by - 360 - nl + 40 * cr], N0 = [300, by - 140], ht = P.headTurn || 0;
    cs([[N0[0] - 130, N0[1] + 30], [H[0] - 110, H[1] + 40], [H[0] + 80, H[1] + 60], [N0[0] + 150, N0[1] + 60]], SB_ROCP.body, SB_ROCP.shade, { off: 40, light: [0.3, -1] });
    ctx.save(); ctx.translate(H[0], H[1] + 60); ctx.rotate(ht); ctx.translate(-H[0], -H[1] - 60);
    for (let i = 0; i < 3; i++) sbRibbon(ctx, H[0] - 60 - i * 26, H[1] - 110 + i * 22, -Math.PI * 0.82 - i * 0.16, 170 - i * 30, 46, t, { col: col(SB_ROCP.crest[i]), shade: col(sbDark(SB_ROCP.crest[i], 0.2)), amp: 10, freq: 6, ph: i, lw: lw * 0.8, line: lineC });
    cs(ell(H[0], H[1], 150, 140, 30), SB_ROCP.body, SB_ROCP.shade, { off: 40, light: [0.4, -1], hi: '#ffffff' });
    // beak: a rounded hook, the lower mandible opens
    const ob = K.clamp(P.beak || 0), bx = H[0] + 110, byy = H[1] - 10;
    cs([[bx - 10, byy + 34], [bx + 170, byy + 52 + ob * 50], [bx + 150, byy + 78 + ob * 60], [bx - 10, byy + 80]], SB_ROCP.beakS, sbDark(SB_ROCP.beakS, 0.2), { off: 8, light: [0, -1] });
    cs([[bx - 20, byy - 60], [bx + 120, byy - 50], [bx + 210, byy - 5], [bx + 232, byy + 50], [bx + 200, byy + 86], [bx + 190, byy + 48], [bx + 120, byy + 34], [bx - 20, byy + 40]], SB_ROCP.beak, SB_ROCP.beakS, { off: 16, light: [0, -1], hi: '#fff3b0' });
    out.beak = tf(bx + 220, byy + 70);
    if (!sil) { // the eye: big, soft, a blush under it
      const ex = H[0] + 30, ey = H[1] - 30, lid = K.clamp(P.lid || 0), gz = P.gaze || [0.3, 0.1];
      ctx.save(); ctx.globalAlpha *= 0.55; ctx.fillStyle = SB_ROCP.blush; ctx.beginPath(); ctx.ellipse(ex + 10, ey + 70, 46, 22, 0, 0, 7); ctx.fill(); ctx.restore();
      ctx.save(); const E = ell(ex, ey, 40, 46, 24); K.poly(ctx, E, true); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.clip();
      const ix = ex + gz[0] * dir * 10 + 6, iy = ey + gz[1] * 10; ctx.fillStyle = SB_ROCP.iris; ctx.beginPath(); ctx.ellipse(ix, iy, 26, 32, 0, 0, 7); ctx.fill();
      ctx.fillStyle = '#5a7ad8'; ctx.beginPath(); ctx.ellipse(ix, iy + 10, 22, 16, 0, 0, Math.PI); ctx.fill();
      ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(ix - 8, iy - 12, 9, 11, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(ix + 9, iy + 12, 4, 0, 7); ctx.fill();
      if (lid > 0) { ctx.fillStyle = SB_ROCP.body; ctx.fillRect(ex - 50, ey - 50, 100, 96 * lid); ctx.strokeStyle = SB_ROCP.line; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ex - 44, ey - 50 + 96 * lid); ctx.quadraticCurveTo(ex, ey - 40 + 96 * lid, ex + 44, ey - 50 + 96 * lid); ctx.stroke(); }
      ctx.restore(); ink(ctx, ell(ex, ey, 40, 46, 24), 4, 1, SB_ROCP.line);
      ctx.save(); ctx.strokeStyle = SB_ROCP.line; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ex - 40, ey - 62 - 8 * (P.brow || 0)); ctx.quadraticCurveTo(ex, ey - 76, ex + 36, ey - 64); ctx.stroke(); ctx.restore();
      out.eye = tf(ex, ey);
    } else out.eye = tf(H[0] + 30, H[1] - 30);
    ctx.restore();
    out.tip = wing(false); out.tip = out.tip ? tf(out.tip[0], out.tip[1]) : null;
  }
  ctx.restore();
  if (P.sil && P.rim && part !== 'back') { /* the rim is drawn by the scene with sbGlow around the silhouette */ }
  if (out.ankle) { out.ankleL = out.ankle; out.ankle = tf(out.ankle[0], out.ankle[1] + 30); }
  if (out.ankleF) out.ankleF = tf(out.ankleF[0], out.ankleF[1] + 30);
  out.hip = tf(hipN[0], hipN[1]); return out;
}
// the roc's ankle point in world units without drawing (for ropes and cloth): the near ankle at feet.n, crouch and sit included
function sbRocAnkle(P) { const s = P.s || 1, dir = P.dir || 1, f = (P.feet && P.feet.n) || [60 + 30 * K.clamp(P.sit || 0), 0], a = (P.rot || 0) * dir, lx = f[0] + 10 * (P.reach || 0), ly = -40 - f[1];
  const X = lx * dir * s, Y = ly * s * (P.sq ?? 1); return [P.x + X * Math.cos(a) - Y * Math.sin(a), P.y + X * Math.sin(a) + Y * Math.cos(a)]; }
// flap value of a steady flight: period (s), phase; returns { flap, flapLag } sampled on twos
function sbRocFlap(t, period = 1.6, ph = 0, lag = 0.12) { const tc = SB_T2(t); return { flap: Math.sin((tc / period + ph) * Math.PI * 2), flapLag: Math.sin(((tc - lag) / period + ph) * Math.PI * 2) }; }

// ---------- rocEgg: a half-buried giant egg, 900 wide, 760 above the ground line at gy. o: {wobble (rad about the base), glint 0..1, s} ----------
function sbRocEgg(ctx, x, gy, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, gy); ctx.rotate(o.wobble || 0); ctx.scale(s, s);
  const E = ell(0, -250, 450, 510, 48);
  celShade(ctx, E, '#fffaf0', '#dccdf2', { light: [-1, -0.8], off: 120, lw: 5, line: '#6a5a96' });
  ctx.save(); K.poly(ctx, E, true); ctx.clip(); const R = K.rng(17); ctx.fillStyle = '#cfe4f6';
  for (let i = 0; i < 26; i++) { ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.ellipse(-380 + R() * 760, -720 + R() * 700, 8 + R() * 14, 6 + R() * 10, R() * 3, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 0.9; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(-200, -560, 70, 130, 0.5, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(-120, -680, 26, 30, 0, 0, 7); ctx.fill(); ctx.restore();
  ctx.restore();
  if (o.glint > 0 && o.glint < 1) sbGlint(ctx, x - 180 * s + 360 * s * o.glint, gy - 740 * s + 120 * s * Math.pow(o.glint - 0.5, 2) * 4, 60 * s, o.glint);
}

// ---------- giantFeather: 260 long, 60 wide; quill at (x, y), points along rot (0 = up). o: {rot, curl, s, alpha} ----------
function sbFeather(ctx, x, y, o = {}) {
  const s = o.s || 1, cu = o.curl || 0; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const sp = (u) => [cu * 60 * u * u, -260 * u], L = [], Rr = [];
  for (let i = 0; i <= 12; i++) { const u = i / 12, [px, py] = sp(u), w = 30 * Math.sin(Math.PI * Math.min(1, u * 1.15)) * (u > 0.12 ? 1 : u / 0.12), notch = (i === 4 || i === 8) ? 0.55 : 1; L.push([px - w * notch, py]); Rr.push([px + w * (i === 6 ? 0.6 : 1), py]); }
  const V = [...L, ...Rr.reverse()];
  ctx.save(); K.poly(ctx, V, true); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.clip();
  for (const [u0, u1, c] of [[0.42, 0.72, '#9ad8ff'], [0.72, 1.1, '#2f6fe0']]) { ctx.fillStyle = c; ctx.fillRect(-80, -260 * u1, 260, 260 * (u1 - u0)); }
  ctx.fillStyle = 'rgba(120,100,180,0.25)'; ctx.fillRect(4, -270, 60, 270); ctx.restore();
  ink(ctx, V, 3, 1, '#3a3a7a'); ctx.save(); ctx.strokeStyle = '#f3e2b8'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 26); for (let i = 1; i <= 10; i++) { const p = sp(i / 10); ctx.lineTo(p[0], p[1]); } ctx.stroke(); ctx.restore();
  ctx.restore();
}
// a feather falling on a rocking sway path from a to b between t0 and t1: returns {x, y, rot}
function sbFeatherFall(t, t0, t1, a, b, sw = 90) { const u = K.clamp((t - t0) / (t1 - t0)), e = u; return { x: K.lerp(a[0], b[0], e) + sw * Math.sin(u * Math.PI * 3.2) * (1 - u * 0.7), y: K.lerp(a[1], b[1], e), rot: 1.3 + 0.7 * Math.cos(u * Math.PI * 3.2) * (1 - u) + (u >= 1 ? 0 : 0), u }; }
