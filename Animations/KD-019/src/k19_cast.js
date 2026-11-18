// ===== KD-019 The Seagull and the Crab: story cast (library proposals: waterBird, crab, fishBones, feather) =====
// All figures are side or front views with feet at (x, y), in world units (1000 x 1230 world). Every pose is a pure function of its fields.
const K19G = { body: '#fffaf0', dot: '#d3dae3', wing: '#aeb8c4', wingD: '#8a94a1', beak: C.yellow, leg: '#f2a71e', spot: C.red, brow: '#8f98a3' };
const K19CR = { shell: C.red, dot: '#a8261a', belly: '#ffe2b0', leg: '#d8281c' };
const k19rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
const k19add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
const k19mix = (a, b, u) => [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u)];
// local -> world for a figure drawn with translate(x, y) rotate(rot * sign(dir)) scale(dir * s, s)
const k19W = (P) => { const s = P.s || 1, d = P.dir ?? 1, r = (P.rot || 0) * Math.sign(d || 1); return (p) => { const q = k19rot([p[0] * d * s, p[1] * s], r); return [P.x + q[0], P.y + q[1]]; }; };
const k19cub = (a, b, c, d, u) => { const v = 1 - u; return [v * v * v * a[0] + 3 * v * v * u * b[0] + 3 * v * u * u * c[0] + u * u * u * d[0], v * v * v * a[1] + 3 * v * v * u * b[1] + 3 * v * u * u * c[1] + u * u * u * d[1]]; };

// ---------- waterBird (kind gull): ~300 tall standing at s 1 ----------
// Fields: s, dir, rot, age 0..1 (ragged feathers, grey brow, stoop), belly 0..1, neck 0..1 (sunk .. upright), head [x, y] local override (+ headAmt),
// headRot (beak angle, + down), curl (neck S bend), beak 0..1, talk, brow (+ greedy V, - worried), eyes (open, wide, shut, x), gaze, lid, wet,
// ph/amp (walk), sit 0..1, fly (true: wings from flap), flap -1..1, spread 0..1 (both wings open, standing), wingTo [x, y] local near-wing tip
// (+ wingAmt), feet 0..1 (flying legs: tucked back .. hanging forward-down), grip 0..1 (toes curl), gulp 0..1 (bulge from head to body),
// choke 0..1 + chokeAt (neck pinch), limp 0..1, hold [{pal, ph}] fish crosswise in the beak, drool 0..1, tear 0..1 (a tear at the beak tip).
function k19BirdGeo(P) {
  const sit = P.sit || 0, limp = P.limp || 0, age = P.age ?? 1, bel = P.belly || 0;
  const bc = [-10, -150 + sit * 80 + age * 6], nb = [bc[0] + 58, bc[1] - 26], n = P.neck ?? 0.45;
  let hd = P.fly ? [nb[0] + K.lerp(62, 80, n), nb[1] + K.lerp(-8, -70, n)] : [nb[0] + K.lerp(18, 32, n), nb[1] + K.lerp(-28, -138, n) + age * 8];
  if (P.head) hd = k19mix(hd, P.head, P.headAmt ?? 1);
  if (limp) hd = k19mix(hd, P.limpHead || [nb[0] + 36, nb[1] + 100], limp);
  const hr = K.lerp(P.headRot ?? 0.12, P.limpRot ?? 1.45, limp), d = [hd[0] - nb[0], hd[1] - nb[1]], L = Math.hypot(d[0], d[1]) || 1, pp = [-d[1] / L, d[0] / L], bend = (P.curl ?? 0.16) * L;
  let c1 = k19add(k19add(nb, d, 0.33), pp, bend), c2 = k19add(k19add(nb, d, 0.68), pp, -bend * 0.8);
  if (P.neckC) { const k = P.neckCAmt ?? 1; c1 = k19mix(c1, P.neckC[0], k); c2 = k19mix(c2, P.neckC[1], k); }
  const H = (v) => k19add(hd, k19rot(v, hr)), open = Math.max(P.beak || 0, (P.talk || 0) * 0.55);
  return { bc, nb, hd, hr, c1, c2, open, rx: 86 + bel * 16, ry: 50 + bel * 20, hip: [bc[0] + 4, bc[1] + 38], sh: [bc[0] + 40, bc[1] - 26],
    eye: H([6, -8]), tip: H([118, 6]), mid: H([66, 6]), neck: (u) => k19cub(nb, c1, c2, hd, u) };
}
const k19BirdPt = (P, key, u) => { const g = k19BirdGeo(P), W = k19W(P); return W(key === 'neck' ? g.neck(u) : g[key]); };
function k19wingShape(ctx, S, T, w, col, o = {}) {
  const d = [T[0] - S[0], T[1] - S[1]], L = Math.hypot(d[0], d[1]) || 1, n = [-d[1] / L * (o.flip ? -1 : 1), d[0] / L * (o.flip ? -1 : 1)], top = [], bot = [];
  for (let i = 0; i <= 14; i++) { const u = i / 14, b = w * Math.pow(Math.sin(Math.PI * K.clamp(u * 0.92 + 0.04)), 0.7) * (1 - 0.35 * u); top.push(k19add(k19add(S, d, u), n, -b)); }
  for (let i = 14; i >= 0; i--) { const u = i / 14, sc = u > 0.35 ? 5 * Math.abs(Math.sin(u * 30)) * (o.ragged ? 1.8 : 1) : 0, b = w * 0.4 * Math.sin(Math.PI * u) + sc; bot.push(k19add(k19add(S, d, u), n, b)); }
  const pts = top.concat(bot); shape(ctx, pts, col, { lw: 0, dot: o.dot, pitch: 7, rad: 0.28, da: 0.5 });
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = C.black; const q = k19add(S, d, 0.72); ctx.beginPath(); ctx.arc(q[0] + d[0] * 0.5, q[1] + d[1] * 0.5, L * 0.5, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(20,20,20,0.5)'; ctx.lineWidth = 2.5; for (const u of [0.35, 0.5, 0.62]) { const a = k19add(k19add(S, d, u), n, -w * 0.2), b = k19add(k19add(S, d, u + 0.08), n, w * 0.35); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
  ctx.restore(); ink(ctx, pts, 5, o.seed || 31);
  if (o.ragged) { ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 3; for (const u of [0.55, 0.8]) { const a = k19add(k19add(S, d, u), n, w * 0.3); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + n[0] * 12 - d[0] / L * 6, a[1] + n[1] * 12 - d[1] / L * 6); ctx.stroke(); } ctx.restore(); }
}
function k19birdLeg(ctx, hip, foot, grip, near, flyLeg) {
  const mx = (hip[0] + foot[0]) / 2, my = (hip[1] + foot[1]) / 2, kn = [mx - 16 * (flyLeg ? -0.3 : 1), my + (flyLeg ? 8 : 0)];
  const col = near ? K19G.leg : '#c98410'; seg(ctx, hip[0], hip[1], kn[0], kn[1], 9, col, 4); seg(ctx, kn[0], kn[1], foot[0], foot[1], 8, col, 4);
  const g = K.clamp(grip || 0); for (const [a, l] of [[-0.25, 26], [0.15, 30], [Math.PI + 0.3, 14]]) { const a2 = a + (a > 2 ? -g * 0.8 : g * 1.3); const t1 = [foot[0] + Math.cos(a2) * l * (1 - g * 0.3), foot[1] + Math.sin(a2) * l * 0.5 + g * 10]; seg(ctx, foot[0], foot[1], t1[0], t1[1], 5, col, 3); }
}
function k19BirdRaw(ctx, P) {
  const g = k19BirdGeo(P), age = P.age ?? 1, limp = P.limp || 0, rag = age > 0.5, s = P.s || 1, dir = P.dir ?? 1;
  ctx.save(); ctx.translate(P.x, P.y); ctx.rotate((P.rot || 0) * Math.sign(dir || 1)); ctx.scale(dir * s, s);
  const { bc, sh } = g, fly = !!P.fly, spread = P.spread || 0;
  // wings: flight angles
  const fw = (k) => { const u = (1 - (P.flap ?? 0)) / 2, ph = Math.PI + K.lerp(1.25, -1.05, u) + k * 0.55, Lw = 260 * (0.66 + 0.34 * Math.abs(P.flap ?? 0)) * (k ? 0.8 : 1) * (1 - limp * 0.3); return [sh[0] + Math.cos(ph) * Lw - k * 30, sh[1] + Math.sin(ph) * Lw]; };
  const limpT = [sh[0] - 70, sh[1] + 150];
  // far wing (behind)
  if (fly) k19wingShape(ctx, [sh[0] - 30, sh[1]], limp ? k19mix(fw(1), [sh[0] - 120, sh[1] + 130], limp) : fw(1), 54, K19G.wingD, { seed: 33, ragged: rag });
  else if (spread > 0.01) k19wingShape(ctx, [sh[0] - 30, sh[1]], k19mix([bc[0] - 140, bc[1] - 10], [sh[0] - 250, sh[1] - 170], spread), 50, K19G.wingD, { seed: 33, ragged: rag });
  // far leg
  const hip = g.hip, walkL = (k) => { const ph = (P.ph || 0) + k * Math.PI, a = P.amp || 0; return [(k ? -14 : 16) + 24 * Math.sin(ph) * a, -Math.max(0, Math.cos(ph)) * a * 18]; };
  const flyFoot = (k) => k19add(k19mix([hip[0] - 85 - k * 10, hip[1] + 28], [hip[0] + 18 - k * 14, hip[1] + 100], P.feet ?? 0), [0, (P.legExt || 0) * (P.feet ?? 0)]);
  if ((P.sit || 0) < 0.85) { const f = fly ? flyFoot(1) : (P.sit ? k19mix(walkL(1), [30, -6], P.sit) : walkL(1)); k19birdLeg(ctx, [hip[0] - 8, hip[1]], f, P.grip, false, fly); }
  // tail
  const tb = [bc[0] - 68, bc[1] - 8], tl = rag ? [[tb[0], tb[1] - 14], [tb[0] - 62, tb[1] - 26], [tb[0] - 50, tb[1] - 12], [tb[0] - 64, tb[1] - 4], [tb[0] - 48, tb[1] + 6], [tb[0], tb[1] + 16]] : [[tb[0], tb[1] - 14], [tb[0] - 62, tb[1] - 22], [tb[0] - 66, tb[1] + 2], [tb[0], tb[1] + 16]];
  const tq = (P.tailQ || 0); ctx.save(); ctx.translate(tb[0], tb[1]); ctx.rotate(tq - limp * 0.3); ctx.translate(-tb[0], -tb[1]); shape(ctx, tl, C.white, { lw: 5, seed: 35 }); seg(ctx, tb[0] - 46, tb[1] - 18, tb[0] - 50, tb[1] + 6, 7, C.black, 0); ctx.restore();
  // near leg
  if ((P.sit || 0) < 0.85) { const f = fly ? flyFoot(0) : (P.sit ? k19mix(walkL(0), [40, -6], P.sit) : walkL(0)); k19birdLeg(ctx, hip, f, P.grip, true, fly); }
  // body
  const body = []; for (let i = 0; i < 30; i++) { const a = i / 30 * Math.PI * 2, low = Math.sin(a) > 0 ? 1 + (P.belly || 0) * 0.12 : 1; body.push(k19add(bc, k19rot([Math.cos(a) * g.rx, Math.sin(a) * g.ry * low], -0.08))); }
  shape(ctx, body, K19G.body, { lw: 5.5, seed: 36, dot: K19G.dot, pitch: 8, rad: 0.3, da: 0.6 });
  // neck
  const L = [], R = [], N = 18; for (let i = 0; i <= N; i++) { const u = i / N, p = g.neck(u), q = g.neck(Math.min(1, u + 0.02)), r0 = g.neck(Math.max(0, u - 0.02)), dx = q[0] - r0[0], dy = q[1] - r0[1], l = Math.hypot(dx, dy) || 1;
    let w = K.lerp(21, 15, u); if (P.gulp > 0 && P.gulp < 1) w += 13 * Math.exp(-Math.pow((u - (1 - P.gulp)) / 0.09, 2)); if (P.choke) w *= 1 - 0.55 * P.choke * Math.exp(-Math.pow((u - (P.chokeAt ?? 0.55)) / 0.07, 2));
    L.push([p[0] - dy / l * w, p[1] + dx / l * w]); R.push([p[0] + dy / l * w, p[1] - dx / l * w]); }
  const neckPts = L.concat(R.reverse()); shape(ctx, neckPts, K19G.body, { lw: 5, seed: 37 });
  // head
  ctx.save(); ctx.translate(g.hd[0], g.hd[1]); ctx.rotate(g.hr);
  shape(ctx, ell(0, 0, 31, 28, 22), K19G.body, { lw: 5.5, seed: 38 });
  if (age > 0.3) { ctx.save(); ctx.globalAlpha *= K.clamp((age - 0.3) / 0.5); shape(ctx, [[-30, -4], [-18, -22], [0, -27], [-6, -19], [-22, -8]], K19G.brow, { lw: 3, seed: 39 }); ctx.restore(); }
  // beak: lower mandible (opens), held fish, upper mandible
  const op = g.open * 0.6; ctx.save(); ctx.translate(20, 3); ctx.rotate(op); shape(ctx, [[0, -1], [70, 1], [66, 11], [2, 11]], K19G.beak, { lw: 4, seed: 40 }); ctx.fillStyle = K19G.spot; ctx.beginPath(); ctx.arc(56, 5, 4.5, 0, 7); ctx.fill(); ctx.restore();
  if (P.hold) P.hold.forEach((f, i) => { ctx.save(); ctx.translate(52 - i * 18, 6 + op * 30); ctx.rotate(1.35 + i * 0.25 + 0.15 * Math.sin(f.ph || 0)); k19fish(ctx, { x: 0, y: 0, s: f.s ?? 0.24, pal: f.pal, ph: f.ph || 0, amp: f.amp ?? 0.9, eyes: f.eyes || 'wide', lid: 0, noBlink: true, mouth: f.mouth || 'o', fin: f.fin }); ctx.restore(); });
  shape(ctx, [[18, -10], [60, -9], [98, -3], [118, 5], [112, 12], [98, 6], [20, 5]], K19G.beak, { lw: 4.5, seed: 41 });
  if (P.smirk) { ctx.save(); ctx.globalAlpha *= K.clamp(P.smirk); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(8, 2); ctx.quadraticCurveTo(16, 16, 32, 8); ctx.stroke(); ctx.restore(); }
  if (P.drool) { ctx.save(); ctx.globalAlpha *= K.clamp(P.drool); ctx.fillStyle = '#cfe4ff'; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(108, 18 + P.drool * 18, 4, 7 + P.drool * 5, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
  // eye + brow
  const ex = 6, ey = -8, eyes = P.eyes || 'open', lid = K.clamp(P.lid || 0);
  if (eyes === 'x') { seg(ctx, ex - 8, ey - 8, ex + 8, ey + 8, 3, C.black, 1.5); seg(ctx, ex - 8, ey + 8, ex + 8, ey - 8, 3, C.black, 1.5); }
  else if (eyes === 'shut' || lid > 0.95) { ctx.save(); ctx.lineWidth = 4.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey - 2, 8, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); }
  else { const big = eyes === 'wide', rx = big ? 11 : 8.5, ry = big ? 12 : 9.5; shape(ctx, ell(ex, ey, rx, ry, 18), C.white, { lw: 3.5, seed: 42 });
    const gz = P.gaze || [1, 0.2], gl = Math.max(1, Math.hypot(gz[0], gz[1])), gx0 = gz[0] * dir / gl, gy0 = gz[1] / gl, gv = k19rot([gx0, gy0], -g.hr - (P.rot || 0) * Math.sign(dir || 1)), pr = P.pupil ?? (big ? 2.8 : (P.pin ? 2.6 : 4.2));
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + gv[0] * (rx - pr - 1.5), ey + gv[1] * (ry - pr - 1.5), pr, 0, 7); ctx.fill();
    if (P.glint) { ctx.save(); ctx.globalAlpha *= P.glint; star(ctx, ex + 6, ey - 8, 12 + 14 * P.glint, C.yellow, 0.3); ctx.restore(); }
    if (lid > 0.02) { ctx.save(); K.poly(ctx, ell(ex, ey, rx, ry, 18), true); ctx.clip(); const ly = ey - ry + 2 * ry * lid; ctx.fillStyle = K19G.body; ctx.fillRect(ex - rx - 2, ey - ry - 2, 2 * rx + 4, ly - ey + ry + 2); ctx.strokeStyle = C.black; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(ex - rx, ly); ctx.lineTo(ex + rx, ly); ctx.stroke(); ctx.restore(); }
    if (P.wet) { ctx.fillStyle = TEAR; ctx.strokeStyle = C.black; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(ex + 2, ey + ry + 6, 3.5, 5, 0, 0, 7); ctx.fill(); ctx.stroke(); } }
  if (eyes !== 'x') { const b = P.brow ?? -0.3; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = age > 0.5 ? '#5d646c' : C.black; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ex - 13, ey - 15 - b * 2 + (b < 0 ? -b * 3 : 0)); ctx.lineTo(ex + 13, ey - 15 + b * 6); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // near wing: folded, gesture, spread or flight
  const fold = [bc[0] - 150, bc[1] - 4 + limp * 40];
  let wt = fold; if (fly) wt = limp ? k19mix(fw(0), limpT, limp) : fw(0); else { if (spread > 0.01) wt = k19mix(fold, [sh[0] + 170, sh[1] - 190], spread); if (P.wingTo) wt = k19mix(wt, P.wingTo, P.wingAmt ?? 1); }
  const wf = fly || spread > 0.3 || (P.wingTo && (P.wingAmt ?? 1) > 0.3);
  k19wingShape(ctx, sh, wt, fly ? 60 : wf ? 50 : 42, K19G.wing, { seed: 34, ragged: rag, dot: '#8a94a1', flip: !wf && false });
  ctx.restore();
}
const k19bird = acting(k19BirdRaw, () => K19G.body);

// ---------- crab: front view, shell 150 x 96 at s 1, feet on y ----------
// Fields: s, ph/amp (tripod scuttle), lift (body up), stalk (0.6 afraid .. 1.3 shocked), stalkL/stalkR (extra lean, radians), gaze, lid, wet, eyes,
// brow (+ hard V, - raised), mouth (smile, frown, o, open, set), talk, pinL/pinR [x, y] local hand targets, openL/openR 0..1, tuck 0..1,
// dangle 0..1 (legs hang when carried), legSwing (radians), shake, tear 0..1, glintL/glintR.
const K19_PIN_REST = { L: [-96, -36], R: [96, -36] };
function k19CrabGeo(P) {
  const sc = [0, -64 - (P.lift || 0) - (P.dangle || 0) * 6], S = (sd) => [sd * 60, sc[1] + 8], L1 = 50, L2 = 50;
  const arm = (sd) => { const sh = S(sd), T = (sd < 0 ? P.pinL : P.pinR) || K19_PIN_REST[sd < 0 ? 'L' : 'R'], dx = T[0] - sh[0], dy = T[1] - sh[1], d = K.clamp(Math.hypot(dx, dy), 4, L1 + L2 - 1), a = Math.atan2(dy, dx), al = Math.acos(K.clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const e1 = [sh[0] + Math.cos(a + al) * L1, sh[1] + Math.sin(a + al) * L1], e2 = [sh[0] + Math.cos(a - al) * L1, sh[1] + Math.sin(a - al) * L1], el = Math.abs(e1[0]) * 1 + e1[1] * 0.4 > Math.abs(e2[0]) + e2[1] * 0.4 ? e1 : e2;
    const hand = [el[0] + (T[0] - el[0]) / Math.max(1, Math.hypot(T[0] - el[0], T[1] - el[1])) * L2, el[1] + (T[1] - el[1]) / Math.max(1, Math.hypot(T[0] - el[0], T[1] - el[1])) * L2], ang = Math.atan2(hand[1] - el[1], hand[0] - el[0]);
    return { sh, el, hand, ang, tip: k19add(hand, k19rot([78, 0], ang)) }; };
  const st = P.stalk ?? 1, eye = (sd) => { const b = [sd * 20, sc[1] - 40], a = sd * 0.16 + ((sd < 0 ? P.stalkL : P.stalkR) || 0), l = 18 + 30 * st; return { b, e: [b[0] + Math.sin(a) * l, b[1] - Math.cos(a) * l] }; };
  return { sc, armL: arm(-1), armR: arm(1), eyeL: eye(-1), eyeR: eye(1) };
}
const k19CrabPt = (P, key) => { const g = k19CrabGeo(P), W = k19W({ ...P, dir: 1 }); const m = { tipL: g.armL.tip, tipR: g.armR.tip, eyeL: g.eyeL.e, eyeR: g.eyeR.e, shell: g.sc, handL: g.armL.hand, handR: g.armR.hand }; return W(m[key]); };
function k19pincer(ctx, A, sd, open, glint) {
  ctx.save(); ctx.translate(A.hand[0], A.hand[1]); ctx.rotate(A.ang); ctx.scale(1, sd < 0 ? -1 : 1);
  shape(ctx, ell(24, 0, 31, 17, 20), K19CR.shell, { lw: 5, seed: 51, dot: K19CR.dot, pitch: 7, rad: 0.3, da: 0.6 });
  ctx.save(); ctx.translate(46, 6); ctx.rotate(K.clamp(open) * 0.75); shape(ctx, [[0, -4], [28, 0], [36, 7], [24, 9], [0, 8]], K19CR.shell, { lw: 4.5, seed: 52 }); ctx.restore();
  shape(ctx, [[44, -16], [72, -14], [82, -4], [70, -2], [46, 0]], K19CR.shell, { lw: 4.5, seed: 53 });
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(18, -6, 8, 4, -0.3, 0, 7); ctx.fill();
  if (glint) { ctx.save(); ctx.globalAlpha *= glint; star(ctx, 80, -10, 8 + 8 * glint, C.white, 0.4); ctx.restore(); }
  ctx.restore();
}
function k19CrabRaw(ctx, P) {
  const g = k19CrabGeo(P), s = P.s || 1, sc = g.sc;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); ctx.rotate(P.rot || 0); ctx.scale(s, s);
  // legs
  for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) {
    const at = [sd * (54 - i * 4), sc[1] + 14 + i * 9], gp = (i + (sd > 0 ? 0 : 1)) % 2, ph = (P.ph || 0) + gp * Math.PI, a = P.amp || 0, tk = 1 - 0.3 * (P.tuck || 0);
    let ft = [sd * (88 + i * 20) * tk + Math.cos(ph) * a * 12, -Math.max(0, Math.sin(ph)) * a * 16], kn = [sd * (96 + i * 16) * tk, sc[1] - 4 + i * 12 - Math.max(0, Math.sin(ph)) * a * 8];
    const dg = P.dangle || 0; if (dg) { const sw = (P.legSwing || 0) + 0.08 * Math.sin((P.ph || 0) + i); const f2 = k19add(at, k19rot([sd * (22 + i * 8), 58 + i * 8], sw)), k2 = k19add(at, k19rot([sd * 34, 22 + i * 4], sw * 0.5)); ft = k19mix(ft, f2, dg); kn = k19mix(kn, k2, dg); }
    seg(ctx, at[0], at[1], kn[0], kn[1], 8, K19CR.leg, 4); seg(ctx, kn[0], kn[1], ft[0], ft[1], 6, K19CR.leg, 4);
  }
  // upper arms behind the shell
  for (const A of [g.armL, g.armR]) seg(ctx, A.sh[0], A.sh[1], A.el[0], A.el[1], 13, K19CR.leg, 4.5);
  // stalks
  for (const E of [g.eyeL, g.eyeR]) seg(ctx, E.b[0], E.b[1], E.e[0], E.e[1], 6, K19CR.leg, 4);
  // shell
  const shellPts = []; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2, k = Math.sin(a) < 0 ? 1 : 0.86; shellPts.push([sc[0] + Math.cos(a) * 75 * (1 + 0.04 * Math.cos(a * 6) * (Math.sin(a) < 0 ? 1 : 0)), sc[1] + Math.sin(a) * 48 * k]); }
  shape(ctx, shellPts, K19CR.shell, { lw: 6, seed: 54, dot: K19CR.dot, pitch: 8, rad: 0.3, da: 0.55 });
  shape(ctx, [[-56, sc[1] + 18], [56, sc[1] + 18], [44, sc[1] + 38], [-44, sc[1] + 38]], K19CR.belly, { lw: 4, seed: 55 });
  ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.beginPath(); ctx.ellipse(-30, sc[1] - 26, 16, 7, -0.3, 0, 7); ctx.fill();
  // mouth
  const m = (P.talk || 0) > 0.05 ? (P.talk > 0.5 ? 'open' : 'o') : (P.mouth || 'smile'), my = sc[1] + 6; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
  if (m === 'open' || m === 'o') shape(ctx, ell(0, my + 2, m === 'open' ? 11 : 7, m === 'open' ? 9 : 7, 14), '#5a1010', { lw: 3.5, seed: 56 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(0, my - 8, 14, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(0, my + 12, 13, 1.25 * Math.PI, 1.75 * Math.PI); ctx.stroke(); }
  else if (m === 'set') { ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-13, my); ctx.lineTo(13, my); ctx.stroke(); }
  else if (m === 'pant') { shape(ctx, ell(0, my + 2, 9, 5 + 3 * Math.abs(Math.sin((LIFE.t || 0) * 9)), 14), '#5a1010', { lw: 3.5, seed: 56 }); }
  ctx.restore();
  // eyes on the stalks
  const eyes = P.eyes || 'open', lid = K.clamp(P.lid || 0);
  for (const [E, sd] of [[g.eyeL, -1], [g.eyeR, 1]]) { const [x, y] = E.e;
    if (eyes === 'shut' || lid > 0.95) { shape(ctx, ell(x, y, 12, 13, 16), K19CR.shell, { lw: 3.5, seed: 57 }); ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y - 1, 8, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); }
    else { const big = eyes === 'wide', rx = big ? 14 : 11.5, ry = big ? 16 : 13; shape(ctx, ell(x, y, rx, ry, 18), C.white, { lw: 3.5, seed: 58 + sd });
      const gz = P.gaze || [0, 0.2], gl = Math.max(1, Math.hypot(gz[0], gz[1])), pr = big ? 3.4 : (P.pin ? 3 : 5); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(x + gz[0] / gl * (rx - pr - 2), y + gz[1] / gl * (ry - pr - 2), pr, 0, 7); ctx.fill();
      if (lid > 0.02) { ctx.save(); K.poly(ctx, ell(x, y, rx, ry, 18), true); ctx.clip(); const ly = y - ry + 2 * ry * lid; ctx.fillStyle = K19CR.shell; ctx.fillRect(x - rx - 2, y - ry - 2, 2 * rx + 4, ly - y + ry + 2); ctx.strokeStyle = C.black; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x - rx, ly); ctx.lineTo(x + rx, ly); ctx.stroke(); ctx.restore(); }
      if (P.wet) { ctx.fillStyle = TEAR; ctx.strokeStyle = C.black; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x + sd * 6, y + ry + 4, 3.5, 5, 0, 0, 7); ctx.fill(); ctx.stroke(); } }
    const b = P.brow ?? -0.2, bx = x, by = y - 21 - Math.max(0, -b) * 5; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx - sd * 11, by + b * 6); ctx.lineTo(bx + sd * 11, by - b * 3); ctx.stroke(); ctx.restore(); }
  if (P.tear) { const e = g.eyeR.e, u = K.clamp(P.tear); ctx.save(); ctx.translate(e[0] + 8, e[1] + 14 + u * 70); ctx.globalAlpha *= 1 - u * 0.3; shape(ctx, [[0, -10], [6, 1], [0, 7], [-6, 1]], TEAR, { lw: 2.5, seed: 59 }); ctx.restore(); }
  // forearms + pincers in front
  seg(ctx, g.armL.el[0], g.armL.el[1], g.armL.hand[0], g.armL.hand[1], 11, K19CR.leg, 4.5); seg(ctx, g.armR.el[0], g.armR.el[1], g.armR.hand[0], g.armR.hand[1], 11, K19CR.leg, 4.5);
  k19pincer(ctx, g.armL, -1, P.openL ?? 0.25, P.glintL); k19pincer(ctx, g.armR, 1, P.openR ?? 0.25, P.glintR);
  ctx.restore();
}
const k19crab = acting(k19CrabRaw, () => K19CR.shell);

// ---------- fish: the KD-007 fish (planned Library 'fish'), three palettes ----------
const K19FPAL = [
  { L: 190, H: 31, body: C.yellow, belly: '#fff3b0', dot: C.red, dotTop: true, fin: C.red, eye: 13, nose: 0.28, dorsal: 'point', lid: 0.2, seed: 11 },
  { L: 160, H: 37, body: C.red, belly: C.white, dot: C.blue, dotBelly: true, fin: C.yellow, eye: 16.5, nose: 0.22, dorsal: 'fan', lid: 0, seed: 23 },
  { L: 128, H: 47, body: '#f05a5a', belly: '#ffc4b8', dot: C.white, dotAll: true, fin: C.yellow, eye: 14.5, nose: 0.12, dorsal: 'small', lid: 0, seed: 37 },
];
function k19fish(ctx, P) {
  const F = K19FPAL[P.pal || 0], s = P.s || 1, dir = P.dir ?? 1, sq = P.sq ?? 1, roll = K.clamp(P.roll || 0), limp = K.clamp(P.limp || 0), puff = P.puff || 0;
  const L = F.L * sq, H = F.H / Math.sqrt(sq) * (1 + puff * 0.12), sw = (P.amp ?? 0.25) * Math.sin(P.ph || 0) * (1 - limp * 0.8), bend = (P.bend || 0);
  const cr = Math.cos(Math.PI * roll), vs = roll < 0.5 ? Math.max(0.7, cr) : -Math.max(0.7, -cr);
  let lid = P.lid; if (lid == null && LIFE.t != null && !P.noBlink && (P.eyes || 'open') === 'open') lid = Math.max(F.lid, blink(LIFE.t, F.seed + (P.seed || 0))); if (lid == null) lid = F.lid;
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha; ctx.translate(P.x, P.y); ctx.rotate((P.rot || 0) * Math.sign(dir || 1)); ctx.scale(dir * s, s);
  const cy = (u) => -bend * 26 * u * u * Math.sign(u) + (u < 0 ? (sw * 14 + limp * 10) * u * u : 0);
  const half = (u) => { const a = Math.sqrt(Math.max(0, 1 - u * u)), k = u > 0 ? 1 - F.nose * u * u : 1 - 0.45 * u * u; return H * a * k * (u > 0.2 && u < 0.85 ? 1 + puff * 0.25 * Math.sin(Math.PI * (u - 0.2) / 0.65) : 1); };
  const X = (u) => u * L / 2, top = [], bot = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; top.push([X(u), (cy(u) - half(u)) * vs]); bot.push([X(u), (cy(u) + half(u)) * vs]); }
  const body = top.concat(bot.reverse()), ink2 = P.silhouette ? C.black : null;
  const ta = sw * 0.55 - limp * 0.5 * vs, tx = -L / 2 + 6, tyc = cy(-1) * vs, TL = F.L * 0.32, TH = F.H * 0.95;
  const rotp = (x, y) => [tx + (x - tx) * Math.cos(ta) - (y - tyc) * Math.sin(ta), tyc + (x - tx) * Math.sin(ta) + (y - tyc) * Math.cos(ta)];
  shape(ctx, [rotp(tx + 6, tyc - H * 0.3), rotp(tx - TL, tyc - TH), rotp(tx - TL * 0.62, tyc), rotp(tx - TL, tyc + TH), rotp(tx + 6, tyc + H * 0.3)], ink2 || F.fin, { lw: 5, seed: 3 });
  const dz = K.clamp(P.dorsal ?? 1) * (1 - limp * 0.6) * 0.8 + 0.2, d0 = -0.15, d1 = F.dorsal === 'small' ? 0.2 : 0.4, yA = (u) => (cy(u) - half(u)) * vs;
  const dp = F.dorsal === 'point' ? [[X(d0), yA(d0) + 4 * vs], [X(d0 + 0.05), yA(d0) - 46 * dz * vs], [X(d1), yA(d1) + 4 * vs]]
    : F.dorsal === 'fan' ? [[X(d0), yA(d0) + 4 * vs], ...[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((k) => [X(d0 + (d1 - d0) * k) - 10, yA(d0 + (d1 - d0) * k) - 36 * dz * vs * Math.sin(Math.PI * (k * 0.85 + 0.1))]), [X(d1), yA(d1) + 4 * vs]]
    : [[X(d0), yA(d0) + 4 * vs], [X(0.02), yA(0.02) - 20 * dz * vs], [X(d1), yA(d1) + 4 * vs]];
  shape(ctx, dp, ink2 || F.fin, { lw: 5, seed: 4 });
  shape(ctx, body, ink2 || F.body, { lw: 0 });
  if (!ink2) {
    ctx.save(); K.poly(ctx, body, true); ctx.clip();
    const bel = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; bel.push([X(u), (cy(u) + half(u) * 0.15) * vs]); } for (let i = 24; i >= 0; i--) { const u = -1 + i / 12; bel.push([X(u), (cy(u) + half(u) * 1.2) * vs]); }
    ctx.fillStyle = F.belly; K.poly(ctx, bel, true); ctx.fill();
    if (F.dotBelly) { ctx.fillStyle = dotPat(ctx, F.dot, 8, 0.3); K.poly(ctx, bel, true); ctx.fill(); }
    if (F.dotTop) { const tp = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; tp.push([X(u), (cy(u) - half(u) * 1.2) * vs]); } for (let i = 24; i >= 0; i--) { const u = -1 + i / 12; tp.push([X(u), (cy(u) - half(u) * 0.25) * vs]); } ctx.globalAlpha *= 0.7; ctx.fillStyle = dotPat(ctx, F.dot, 8, 0.32); K.poly(ctx, tp, true); ctx.fill(); }
    if (F.dotAll) { ctx.globalAlpha *= 0.55; ctx.fillStyle = dotPat(ctx, F.dot, 9, 0.28); ctx.fillRect(-L, -H * 2, L * 2, H * 4); }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (const u of [-0.45, -0.2]) { ctx.beginPath(); ctx.arc(X(u), cy(u) * vs, half(u) * 0.35, -0.9, 0.9); ctx.stroke(); }
    ctx.lineWidth = 4.5; ctx.beginPath(); const gu = 0.42; ctx.moveTo(X(gu) - 4, (cy(gu) - half(gu) * 0.7) * vs); ctx.quadraticCurveTo(X(gu) + 10, cy(gu) * vs, X(gu) - 4, (cy(gu) + half(gu) * 0.7) * vs); ctx.stroke(); ctx.restore();
  }
  ink(ctx, body, 5.5, F.seed);
  const fu = 0.25, fx = X(fu), fy = (cy(fu) + half(fu) * 0.3) * vs, fin = P.fin ?? (0.25 * Math.sin((P.ph || 0) * 0.5)), fl = F.H * 0.9 * (1 + (P.finPt || 0) * 0.6);
  let fa = Math.PI - 0.5 + Math.max(0, fin) * 2.4 + Math.min(0, fin) * 0.3; fa = K.lerp(fa, Math.PI * 2 - 0.15, P.finPt || 0); fa = K.lerp(fa, Math.PI / 2 + 0.7, limp);
  ctx.save(); ctx.translate(fx, fy); ctx.scale(1, vs < 0 ? -1 : 1); ctx.rotate(fa);
  shape(ctx, [[0, -6], [fl * 0.55, -12], [fl, -4], [fl * 0.95, 6], [fl * 0.4, 9], [0, 6]], ink2 || F.fin, { lw: 4.5, seed: 6 }); ctx.restore();
  if (P.silhouette) { ctx.restore(); return; }
  const eu = P.pal === 2 ? 0.5 : 0.56, ex = X(eu), ey = (cy(eu) - half(eu) * 0.28) * vs, er = F.eye, eyes = P.eyes || 'open';
  if (eyes === 'shut' || lid >= 0.95) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); if (vs > 0) ctx.arc(ex, ey - 2, er * 0.75, 0.15 * Math.PI, 0.85 * Math.PI); else ctx.arc(ex, ey + 2, er * 0.75, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); ctx.restore(); }
  else if (eyes === 'x') { seg(ctx, ex - 8, ey - 8, ex + 8, ey + 8, 2, C.black, 1.5); seg(ctx, ex - 8, ey + 8, ex + 8, ey - 8, 2, C.black, 1.5); }
  else { const big = eyes === 'wide', rx = er * (big ? 1.2 : 1), ry = er * (big ? 1.32 : 1.1); shape(ctx, ell(ex, ey, rx, ry, 20), C.white, { lw: 4, seed: 2 });
    const g = P.gaze || [Math.sign(dir), 0], gl = Math.hypot(g[0], g[1]) || 1, gx = g[0] * dir / Math.max(1, gl), gy = g[1] / Math.max(1, gl), pr = er * (big ? 0.34 : 0.48), px = ex + gx * (rx - pr - 2), py = ey + gy * (ry - pr - 2);
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px + pr * 0.35, py - pr * 0.4, pr * 0.3, 0, 7); ctx.fill();
    if (lid > 0.02) { ctx.save(); K.poly(ctx, ell(ex, ey, rx, ry, 20), true); ctx.clip(); const ly = ey - ry + 2 * ry * lid; ctx.fillStyle = F.body; ctx.fillRect(ex - rx - 2, ey - ry - 2, rx * 2 + 4, ly - (ey - ry) + 2); ctx.strokeStyle = C.black; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - rx, ly); ctx.lineTo(ex + rx, ly); ctx.stroke(); ctx.restore(); }
    if (P.wet) { ctx.fillStyle = TEAR; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(ex - 2, ey + ry + 9, 4.5, 6.5, 0, 0, 7); ctx.fill(); ctx.stroke(); } }
  if (P.brow != null || P.pal === 1) { const b = P.brow || 0, bx0 = ex - er * 0.9, bx1 = ex + er * 0.9, by = ey - er * 1.25 - Math.max(0, -b) * 8 - (eyes === 'wide' ? 5 : 0);
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(bx0, by - b * 5); ctx.quadraticCurveTo(ex, by - 4 - Math.max(0, -b) * 6, bx1, by + b * 7); ctx.stroke(); ctx.restore(); }
  const mx = L / 2 - 10 - (P.pal === 2 ? 4 : 0), my = (cy(0.9) + half(0.9) * 0.25) * vs, m = P.talk > 0.05 ? (P.talk > 0.5 ? 'open' : 'o') : (P.mouth || (P.pal === 2 ? 'smile' : 'closed'));
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5;
  if (m === 'o' || m === 'open') { const r = m === 'open' ? 9 : 6; shape(ctx, ell(mx, my + 2, r * 0.8, r, 12), '#5a1010', { lw: 3.5, seed: 7 }); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(mx - 9, my - 8, 12, 0.25 * Math.PI, 0.7 * Math.PI); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(mx - 9, my + 10, 11, 1.3 * Math.PI, 1.75 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(mx - 16, my + 1); ctx.lineTo(mx, my); ctx.stroke(); }
  ctx.restore(); ctx.restore();
}

// ---------- fishBones: clean skeleton 90 x 34 (kind slim, round, small); icon use at small s ----------
function k19bones(ctx, x, y, o = {}) {
  const kind = o.kind || 'slim', s = (o.s || 1) * (kind === 'small' ? 0.72 : 1), Lh = kind === 'round' ? 34 : 45, Hh = kind === 'round' ? 22 : 15;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.dir || 1), s);
  if (o.rim) { ctx.save(); ctx.globalAlpha *= o.rim; ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(0, 0, Lh + 34, Hh + 18, 0, 0, 7); ctx.fill(); ctx.restore(); }
  const col = o.col || C.white; seg(ctx, -Lh, 0, Lh - 10, 0, 4, col, 3);
  for (let i = 0; i < 6; i++) { const u = -0.75 + i * 0.27, rx = u * Lh, h = Hh * Math.sqrt(Math.max(0.15, 1 - u * u)); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(rx + 5, -h); ctx.quadraticCurveTo(rx - 3, 0, rx + 5, h); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  shape(ctx, [[Lh - 14, -Hh * 0.9], [Lh + 18, -3], [Lh + 20, 3], [Lh - 14, Hh * 0.9]], col, { lw: 3.5, seed: 61 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(Lh - 2, -3, 4, 0, 7); ctx.fill();
  shape(ctx, [[-Lh, 0], [-Lh - 20, -14], [-Lh - 14, 0], [-Lh - 20, 14]], col, { lw: 3.5, seed: 62 });
  ctx.restore();
}
// feather: white 46 x 14 with a grey quill
function k19feather(ctx, x, y, rot = 0, s = 1, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-23, 0], [-12, -7], [10, -7], [23, 0], [10, 6], [-12, 6]], C.white, { lw: 3, seed: 63 }); seg(ctx, -28, 1, 18, 0, 1.5, '#9aa3ad', 1); ctx.restore(); }
// drifting feather from a to b between t0 and t1 (rocking on the way down)
function k19featherFall(ctx, t, t0, t1, a, b, s = 1) { if (t < t0) return; const u = K.clamp((t - t0) / (t1 - t0)), x = K.lerp(a[0], b[0], u) + 22 * Math.sin(u * Math.PI * 3) * (1 - u), y = K.lerp(a[1], b[1], u); k19feather(ctx, x, y, u < 1 ? 0.6 * Math.cos(u * Math.PI * 3) : 0.1, s); }

// ---------- water effects (from KD-007: splash, bubbles, red cross, net) ----------
function k19bubble(ctx, x, y, r, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 3.5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.22, 0, 7); ctx.fill(); ctx.restore(); }
function k19bubbles(ctx, t, t0, t1, from, o = {}) { const rate = o.rate ?? 4, vy = o.vy ?? 120, top = o.top ?? 648;
  for (let k = 0; k < (t1 - t0) * rate; k++) { const te = t0 + k / rate, d = t - te; if (d < 0 || d > (o.life ?? 3)) continue; const p = typeof from === 'function' ? from(te) : from, y = p[1] - d * vy; if (y < top) continue;
    k19bubble(ctx, p[0] + Math.sin(d * 5 + k) * 6, y, (o.r ?? 7) * (0.7 + 0.5 * ((k * 37) % 7) / 7), 1); } }
function k19splash(ctx, x, y, d, sz = 1) {
  if (d < 0 || d > 1.4) return; ripple(ctx, x, y, 0, d, 1.4 * sz); ripple(ctx, x, y, 0.15, d, sz);
  if (d > 0.8) return; for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.28, v = (300 + (i % 3) * 60) * sz, px = x + Math.cos(a) * v * d * 0.6, py = y + Math.sin(a) * v * d + 900 * d * d; if (py > y + 4) continue;
    ctx.save(); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(px, py, 6 * sz, 9 * sz, a + Math.PI / 2, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
  const h = 1 - d / 0.8; shape(ctx, [[x - 50 * sz, y + 2], [x - 34 * sz, y - 34 * sz * h], [x - 15 * sz, y - 8], [x, y - 50 * sz * h], [x + 15 * sz, y - 8], [x + 34 * sz, y - 34 * sz * h], [x + 50 * sz, y + 2]], C.white, { lw: 4, seed: 93 });
}
function k19cross(ctx, x, y, r, p = 1) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); seg(ctx, -r, -r, r, r, 12, C.red, 4); seg(ctx, -r, r, r, -r, 12, C.red, 4); ctx.restore(); }
function k19net(ctx, q, o = {}) {
  const nu = o.nu ?? 7, nv = o.nv ?? 5, [A, Bq, Cq, D] = q, bl = o.bulge;
  const P = (u, v) => { let x = (1 - v) * ((1 - u) * A[0] + u * Bq[0]) + v * ((1 - u) * D[0] + u * Cq[0]), y = (1 - v) * ((1 - u) * A[1] + u * Bq[1]) + v * ((1 - u) * D[1] + u * Cq[1]);
    if (bl) { const d = Math.hypot(x - bl[0], y - bl[1]), f = Math.exp(-(d * d) / (2 * bl[3] * bl[3])); x += bl[2] * f; y += (bl[4] || 0) * f; } return [x, y]; };
  ctx.save(); ctx.lineCap = 'round';
  for (const pass of [[C.black, (o.lw ?? 4) + 3], ['#f2e6c4', o.lw ?? 4]]) { ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1];
    for (let i = 0; i <= nu; i++) { ctx.beginPath(); for (let k = 0; k <= 10; k++) { const p = P(i / nu, k / 10); ctx[k ? 'lineTo' : 'moveTo'](p[0], p[1]); } ctx.stroke(); }
    for (let j = 0; j <= nv; j++) { ctx.beginPath(); for (let k = 0; k <= 10; k++) { const p = P(k / 10, j / nv); ctx[k ? 'lineTo' : 'moveTo'](p[0], p[1]); } ctx.stroke(); } }
  ctx.restore(); return P;
}
