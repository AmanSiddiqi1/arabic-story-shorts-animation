// ===== KD-005 The Raven and the Snake: local assets (snake, burrow, necklace, sparkle, home tree set, river and chase sets, jackal tint,
// fight cloud, staff, dashed line). Drawn in this story only (Library/ untouched); proposed in ../library_proposals.md. Prefix k5 / K5_.
const K5_GR = 900, K5_VW = 1000, K5_VH = 1230;
const K5_HOME = { trunk: 560, nest: [500, 345], perch: [425, 346], low: [438, 686], stub: [668, 684], twig: [604, 213], stone: [395, 862], burrow: [860, 890] };
const K5_B = (t, a, d, e = 'lin') => K.beat(t, a, d, e);
const k5bake = (key, w, h, k, draw) => K.cached('kd5:' + key, () => { const c = K.layer(Math.round(w * k), Math.round(h * k)), x = c.getContext('2d'); x.scale(k, k); draw(x); return c; });
const k5P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];   // world -> panel (overlay) coordinates
const k5u = (t, a, b) => K.clamp((t - a) / (b - a));

// ---------- dashed line (eye-lines, height marker) ----------
function k5Dash(ctx, a, b, p = 1, o = {}) { if (p <= 0) return; const e = [K.lerp(a[0], b[0], p), K.lerp(a[1], b[1], p)];
  ctx.save(); ctx.lineCap = 'round'; ctx.setLineDash(o.dash || [14, 12]); ctx.lineWidth = (o.w || 5) + 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...e); ctx.stroke();
  ctx.lineWidth = o.w || 5; ctx.strokeStyle = o.col || C.white; ctx.stroke(); ctx.restore(); }

// ---------- sparkle: four-point white star with a black rim ----------
function k5Spark(ctx, x, y, r, rot = 0) { if (r <= 0.5) return; const p = []; for (let i = 0; i < 8; i++) { const a = rot + i * Math.PI / 4, rr = i % 2 ? r * 0.26 : r; p.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
  shape(ctx, p, C.white, { lw: Math.max(2, r * 0.12), seed: 5 }); }

// ---------- necklace: 11 gold beads and a red drop. mode 'hang' (from the clasp at x, y, swing ang) or 'lay' (flat, centred at x, y) ----------
function k5Neck(ctx, x, y, o = {}) {
  const s = o.s || 1, n = 12, pts = [];
  for (let i = 0; i <= n; i++) { const u = i / n; pts.push(o.mode === 'lay' ? [Math.sin(2 * Math.PI * u) * 34, -Math.cos(2 * Math.PI * u) * 9 - 2] : [Math.sin(2 * Math.PI * u) * 15 * (o.wide || 1), (1 - Math.cos(2 * Math.PI * u)) * 27]); }
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.ang || 0); ctx.scale(s, s);
  ctx.lineWidth = 3; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke();
  const gem = o.mode === 'lay' ? [0, 9] : [0, 60];
  for (let i = 0; i < n; i++) { if (i === n / 2) continue; const [bx, by] = pts[i]; ctx.beginPath(); ctx.arc(bx, by, 6, 0, 7); ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(bx - 2, by - 2, 1.6, 0, 7); ctx.fill(); }
  shape(ctx, [[gem[0], gem[1] - 9], [gem[0] + 8, gem[1] + 1], [gem[0], gem[1] + 11], [gem[0] - 8, gem[1] + 1]], C.red, { lw: 3, seed: 4 });
  ctx.restore();
  if (o.spark > 0) { const sp = Math.sin(Math.PI * K.clamp(o.spark)); const g = o.mode === 'lay' ? [x + 20 * s, y - 14 * s] : [x + Math.sin(o.ang || 0) * -40 * s + 12 * s, y + Math.cos(o.ang || 0) * 40 * s]; k5Spark(ctx, g[0], g[1], 26 * s * sp, o.spark * 1.4); }
}

// ---------- snake ----------
// k5Snake(ctx, pts, o): pts = [[x, y, u], ...] from tail to head, u = 0 (tail tip) .. 1 (head) for the taper.
// o: w (body width 22), head (true), lid 0..1, eyes ('open' | 'x'), gaze [gx, gy], tongue 0..1, mouth 0..1, alpha
const K5_SNK = { body: '#2a2a36', hi: '#5c5c78' };
function k5Snake(ctx, pts, o = {}) {
  if (!pts || pts.length < 2) return; const w0 = o.w || 22, n = pts.length;
  const wd = (u) => w0 * (u < 0.7 ? 0.28 + 0.72 * Math.sin(Math.min(1, u / 0.7) * Math.PI / 2) : 1 - 0.12 * (u - 0.7) / 0.3);
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const pass of [0, 1, 2]) for (let i = 1; i < n; i++) { const a = pts[i - 1], b = pts[i], w = wd(b[2] ?? i / (n - 1));
    ctx.beginPath(); const hy = pass === 2 ? w * 0.24 : 0; ctx.moveTo(a[0], a[1] - hy); ctx.lineTo(b[0], b[1] - hy);
    ctx.lineWidth = pass === 0 ? w + 9 : pass === 1 ? w : w * 0.2; ctx.strokeStyle = pass === 0 ? C.black : pass === 1 ? K5_SNK.body : K5_SNK.hi; ctx.stroke(); }
  if (o.head !== false) {
    const a = pts[n - 2], b = pts[n - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]), m = o.mouth || 0;
    ctx.translate(b[0], b[1]); ctx.rotate(ang); if (Math.cos(ang) < 0) ctx.scale(1, -1); ctx.scale(w0 / 22, w0 / 22);
    if (o.tongue > 0) { const L = 26 * o.tongue, ty = m > 0.1 ? 6 : 2; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(30, ty); ctx.lineTo(36 + L, ty); ctx.lineTo(42 + L, ty - 5); ctx.moveTo(36 + L, ty); ctx.lineTo(42 + L, ty + 5); ctx.stroke(); ctx.restore(); }
    if (m > 0.05) {   // open jaws: red mouth, fangs
      ctx.save(); ctx.rotate(0.45 * m); shape(ctx, [[-4, 2], [32, 4], [28, 11], [8, 12], [-4, 10]], K5_SNK.body, { lw: 4, seed: 7 }); ctx.restore();
      shape(ctx, [[0, 1], [34, -1], [34, 3 + 18 * m], [0, 6]], C.red, { lw: 0 });
      ctx.save(); ctx.rotate(-0.3 * m); shape(ctx, [[-6, -11], [10, -14], [26, -11], [37, -4], [36, 2], [10, 3], [-6, 6]], K5_SNK.body, { lw: 4, seed: 8 });
      for (const fx of [24, 31]) shape(ctx, [[fx - 3, 2], [fx + 3, 2], [fx, 11]], C.white, { lw: 2, seed: 2 }); ctx.restore();
    } else shape(ctx, [[-6, -11], [10, -14], [26, -11], [36, -4], [37, 2], [30, 8], [12, 11], [-6, 10]], K5_SNK.body, { lw: 4, seed: 8 });
    ctx.save(); if (m > 0.05) ctx.rotate(-0.3 * m);
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(31, -5, 1.8, 0, 7); ctx.fill();
    if (o.eyes === 'x') { ctx.lineWidth = 3; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(13, -10); ctx.lineTo(21, -2); ctx.moveTo(21, -10); ctx.lineTo(13, -2); ctx.stroke(); }
    else { const g = o.gaze || [1, 0], lid = K.clamp(o.lid ?? 0.3);
      ctx.save(); const ep = ell(17, -6, 7, 5.5, 14); shape(ctx, ep, C.yellow, { lw: 2.5, seed: 3 }); K.poly(ctx, ep, true); ctx.clip();
      ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(17 + g[0] * 2.5, -6 + g[1] * 1.5, 1.7, 4.6, 0, 0, 7); ctx.fill();
      if (lid > 0) { ctx.fillStyle = K5_SNK.body; ctx.fillRect(8, -13, 18, 11 * lid); ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(9, -13 + 11 * lid); ctx.lineTo(25, -13 + 11 * lid); ctx.stroke(); }
      ctx.restore(); }
    ctx.restore();
  }
  ctx.restore();
}
// track: a polyline sampled by arc length. slice(s0, s1, ds, wave) -> [[x, y, u, flag]] (u from the body's tail s0 to head s1)
function k5Track(raw) {
  const P = [], S = [0]; for (let i = 0; i < raw.length; i++) { P.push(raw[i]); if (i) S.push(S[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1])); }
  const len = S[S.length - 1];
  const at = (s) => { s = K.clamp(s, 0, len); let i = 1; while (i < S.length - 1 && S[i] < s) i++; const f = (s - S[i - 1]) / ((S[i] - S[i - 1]) || 1), a = P[i - 1], b = P[i]; return [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f), f < 0.5 ? a[2] : b[2], Math.atan2(b[1] - a[1], b[0] - a[0])]; };
  const slice = (sTail, sHead, ds = 7, wave) => { const a = Math.max(0, sTail), b = Math.min(len, sHead), out = []; if (b - a < 2) return out; const L = sHead - sTail;
    for (let s = a; ; s = Math.min(b, s + ds)) { const [x, y, fl, an] = at(s), w = wave ? wave(s) : 0; out.push([x - Math.sin(an) * w, y + Math.cos(an) * w, (s - sTail) / L, fl]); if (s >= b) break; } return out; };
  return { len, at, slice };
}
// split a slice into runs by flag (1 = behind the trunk)
function k5Runs(pts) { const runs = []; let cur = null; for (const p of pts) { const f = p[3] ? 1 : 0; if (!cur || cur.f !== f) { if (cur) cur.p.push(p); cur = { f, p: cur ? [cur.p[cur.p.length - 1], p] : [p] }; runs.push(cur); } else cur.p.push(p); } return runs; }
// the climb: hole -> ground -> 1.5 turns round the trunk -> fork -> over the nest rim
const K5_CLIMB = k5Track((() => { const r = [[860, 878, 0], [842, 892, 0], [800, 902, 0], [740, 904, 0], [680, 902, 0], [630, 898, 0], [606, 884, 0]];
  for (let k = 1; k <= 60; k++) { const f = k / 60, ph = f * 3 * Math.PI, y = 884 - f * 434, x = 560 + 46 * Math.cos(ph); r.push([x, y, Math.sin(ph) < 0 ? 1 : 0]); }
  return r.concat([[505, 410, 0], [478, 368, 0], [462, 328, 0], [470, 298, 0], [492, 284, 0], [512, 281, 0]]); })());
const K5_HOMEIN = k5Track([[520, 906, 0], [600, 908, 0], [680, 906, 0], [760, 904, 0], [820, 898, 0], [848, 888, 0], [860, 878, 0]]);
const K5_RISE = k5Track((() => { const r = [[860, 880, 0], [858, 858, 0], [852, 836, 0]]; for (let k = 1; k <= 24; k++) { const f = k / 24, y = 836 - f * 150; r.push([848 + 26 * Math.sin(f * 2 * Math.PI), y, 0]); } r.push([838, 676, 0], [820, 670, 0]); return r; })());

// ---------- burrow (snake hole): mound, rocks, navy opening; states: eyes, web, flower ----------
function k5Burrow(ctx, x, y, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const m = []; for (let i = 0; i <= 22; i++) { const a = Math.PI + i / 22 * Math.PI; m.push([Math.cos(a) * 84, Math.sin(a) * 60 + 8]); }
  shape(ctx, m, '#c58a44', { lw: 6, seed: 51, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.5 });
  for (const [rx, ry, a, b, sd] of [[-66, 0, 18, 12, 52], [64, 2, 20, 13, 53], [34, -44, 12, 8, 54]]) shape(ctx, ell(rx, ry, a, b, 14), STONE, { lw: 4, seed: sd, dot: STONED, pitch: 7, rad: 0.2, da: 0.5 });
  shape(ctx, ell(0, -22, 38, 25, 26), NAVY2, { lw: 6, seed: 55 });
  if (o.eyes && o.eyes.open > 0.02) { const op = K.clamp(o.eyes.open), lk = o.eyes.look || [0, 0];
    for (const ex of [-12, 12]) { ctx.save(); const ep = ell(ex + lk[0] * 3, -24 + lk[1] * 3, 8, 6 * op, 14); ctx.fillStyle = C.yellow; K.poly(ctx, ep, true); ctx.fill(); ctx.clip(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(ex + lk[0] * 5, -24 + lk[1] * 3, 1.8, 5, 0, 0, 7); ctx.fill(); ctx.restore(); } }
  if (o.web > 0) { ctx.save(); ctx.globalAlpha *= K.clamp(o.web); ctx.strokeStyle = C.white; ctx.lineWidth = 2; const cx = 0, cy = -22;
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * 38, cy + Math.sin(a) * 25); ctx.stroke(); }
    for (const r of [0.35, 0.65, 0.92]) { ctx.beginPath(); for (let i = 0; i <= 8; i++) { const a = i * Math.PI / 4; const px = cx + Math.cos(a) * 38 * r, py = cy + Math.sin(a) * 25 * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
    if (o.dew) { ctx.fillStyle = '#bfe0ff'; ctx.beginPath(); ctx.arc(cx + 14, cy + 6, 4, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(cx + 13, cy + 5, 1.5, 0, 7); ctx.fill(); }
    ctx.restore(); }
  if (o.flower > 0) { const f = K.clamp(o.flower), nod = o.nod || 0; ctx.save(); ctx.translate(96, 6); ctx.rotate(nod); seg(ctx, 0, 0, 0, -44 * f, 4, GREEN, 2); if (f > 0.4) { const r = 11 * K.ease.back(K.clamp((f - 0.4) / 0.6)); for (let i = 0; i < 5; i++) { const a = i * 1.2566; shape(ctx, ell(Math.cos(a) * r * 0.9, -44 * f + Math.sin(a) * r * 0.9, r * 0.6, r * 0.6, 10), C.red, { lw: 2.5, seed: 60 + i }); } shape(ctx, ell(0, -44 * f, r * 0.45, r * 0.45, 10), C.yellow, { lw: 2.5, seed: 66 }); } ctx.restore(); }
  ctx.restore();
}
// dark inner shade over the hole centre (hides the snake where it goes inside)
function k5BurrowShade(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const ep = ell(0, -22, 35, 22, 26); K.poly(ctx, ep, true); ctx.clip();
  const g = ctx.createRadialGradient(0, -20, 2, 0, -20, 30); g.addColorStop(0, NAVY2); g.addColorStop(0.45, NAVY2); g.addColorStop(1, 'rgba(13,34,96,0)'); ctx.fillStyle = g; ctx.fillRect(-40, -50, 80, 60); ctx.restore(); }

// ---------- jackal: the Library fox in a sandy jackal tint (a canvas filter; the fox drawing itself is unchanged) ----------
function k5Jackal(ctx, P) { ctx.save(); ctx.filter = 'saturate(0.42) brightness(1.06) sepia(0.25)'; fox(ctx, P); ctx.restore(); }

// ---------- raven: the Library crow + a beak grip point for the necklace / worm ----------
function k5Grip(P, fx = 70) {
  const s = P.s || 1, dir = P.dir ?? 1, d = P.drop || 0, hr = P.headRot || 0, cx = 18, cy = -48 + d, lx = fx, ly = -63 + d;
  let X = cx + (lx - cx) * Math.cos(hr) - (ly - cy) * Math.sin(hr), Y = cy + (lx - cx) * Math.sin(hr) + (ly - cy) * Math.cos(hr);
  X *= dir * s; Y *= s; if (P.rot) { const c = Math.cos(P.rot), n = Math.sin(P.rot); [X, Y] = [X * c - Y * n, X * n + Y * c]; }
  const sq = P.sq ?? 1; X *= 1 + (1 - sq) * 0.7; Y *= sq; if (P.tip) { const a = P.tip * Math.sign(dir), c = Math.cos(a), n = Math.sin(a); [X, Y] = [X * c - Y * n, X * n + Y * c]; }
  return [P.x + (P.shake || 0) + X, P.y + Y];
}
function k5Raven(ctx, P, t) {
  const Q = { kind: 'crow', s: 1.2, ...P }; bird(ctx, Q);
  if (Q.neck) { const g = k5Grip(Q); k5Neck(ctx, g[0], g[1], { ang: Q.neck.ang || 0, s: Q.neck.s || 0.8, spark: Q.neck.spark || 0 }); }
  if (Q.worm) { const g = k5Grip(Q, 64); worm(ctx, g[0] + 10 * (Q.dir ?? 1), g[1] + 4, t); }
}
function k5HeadPos(P) { const s = P.s || 1.2, dir = P.dir ?? 1; return [P.x + 32 * s * dir, P.y + (-64 + (P.drop || 0)) * s * (P.sq ?? 1)]; }

// ---------- staff and hand positions for the person figure (arm angles given) ----------
function k5Hand(P, sd, ang) { const s = P.s || 1, dir = P.dir || 1, sy0 = -132, e1 = [sd * 31 + Math.sin(ang[0]) * 38, sy0 + Math.cos(ang[0]) * 38], e2 = [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36];
  let lx = e2[0], ly = e2[1]; const ln = P.lean || 0; if (ln) { const c = Math.cos(ln), n = Math.sin(ln), y0 = ly + 75; [lx, ly] = [lx * c - y0 * n, lx * n + y0 * c - 75]; }
  return [P.x + lx * dir * s, P.y + ly * s]; }
function k5Staff(ctx, h, ang, len = 170, back = 40) { const dx = Math.sin(ang), dy = -Math.cos(ang); seg(ctx, h[0] - dx * back, h[1] - dy * back, h[0] + dx * len, h[1] + dy * len, 11, '#c58a18', 4.5); return [h[0] + dx * len, h[1] + dy * len]; }
function k5Fist(ctx, h, s = 1) { shape(ctx, ell(h[0], h[1], 12 * s, 12 * s, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }

// ---------- laundry cloth ----------
function k5Cloth(ctx, x, y, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const f = o.fold ?? 0.5, w = 56 * (1 - f * 0.45), h = 30 + f * 12;
  shape(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2 - 4], [w / 2 + 4, h / 2], [-w / 2 + 2, h / 2 + 3]], C.white, { lw: 4, seed: 71, dot: C.blue, pitch: 8, rad: 0.25, da: 0.6 }); ctx.restore(); }

// ---------- fight cloud: puffs, stars, a staff tip and the snake tail popping out in turn ----------
function k5FightCloud(ctx, x, y, r, t, p) { if (p <= 0) return; const k = K.ease.back(K.clamp(p * 3)) * (p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const ph = Math.floor(t * 7); if (ph % 3 === 0) seg(ctx, -r * 0.6, -r * 0.4, -r * 1.2, -r * 0.95, 11, '#c58a18', 4.5); if (ph % 3 === 1) k5Snake(ctx, [[r * 0.5, 10, 0.6], [r * 0.9, -20, 0.3], [r * 1.15, -10, 0]], { head: false, w: 16 });
  const rr = K.rng(9 + ph); const cs = []; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 2; cs.push([Math.cos(a) * r * 0.62 + (rr() - 0.5) * 20, Math.sin(a) * r * 0.42 + (rr() - 0.5) * 16, r * (0.3 + rr() * 0.12)]); }
  ctx.lineWidth = 16; ctx.strokeStyle = C.black; for (const [cx, cy, cr] of cs) { ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 0, r * 0.7, r * 0.5, 0, 0, 7); ctx.stroke();
  for (const f of [C.white, dotPat(ctx, STONED, 10, 0.25)]) { ctx.fillStyle = f; for (const [cx, cy, cr] of cs) { ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.fill(); } ctx.beginPath(); ctx.ellipse(0, 0, r * 0.7, r * 0.5, 0, 0, 7); ctx.fill(); }
  for (let i = 0; i < 4; i++) { const a = t * 6 + i * 1.57; star(ctx, Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.25 - 10, 18, i % 2 ? C.yellow : C.white, a); }
  ctx.restore(); }

// ---------- the home tree: trunk, branches (nest fork, nest ledge, low bare branch, right stub, lookout twig), root stone ----------
const K5_CROWNS = [[560, 292, 150], [408, 352, 96], [716, 350, 102], [470, 196, 92], [660, 200, 96], [565, 150, 70]];
function k5TreeCrowns(x) { for (const [cx, cy, cr] of K5_CROWNS) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); }
  for (const [cx, cy, cr] of K5_CROWNS) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); } x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of K5_CROWNS) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); } }
function k5TreeTrunk(x) {
  const wd = { lw: 7, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 };
  shape(x, [[612, 214], [628, 236], [576, 300], [566, 284]], WOOD, wd);                       // lookout twig (to 604, 213)
  shape(x, [[512, 904], [526, 420], [540, 300], [580, 300], [596, 420], [608, 904]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  shape(x, [[530, 440], [470, 360], [486, 350], [548, 410]], WOOD, wd);                       // nest fork
  shape(x, [[530, 380], [392, 352], [392, 340], [534, 362]], WOOD, wd);                       // nest ledge (perch left of the nest)
  shape(x, [[528, 720], [428, 694], [424, 684], [528, 700]], WOOD, wd);                       // low bare branch, tip (430, 690)
  seg(x, 470, 704, 448, 676, 6, WOOD, 3.5);
  shape(x, [[600, 708], [686, 690], [688, 680], [600, 690]], WOOD, wd);                       // right stub over the burrow side
  for (const [cx, cy, cr] of [[520, 300, 46], [606, 300, 44]]) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); x.fillStyle = dotPat(x, GREEND, 11, 0.28); x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); }
  for (const [rx, ry, a, b] of [[540, 904, 46, 14], [590, 906, 40, 12]]) shape(x, ell(rx, ry, a, b, 18), WOOD, { lw: 6, seed: 33 });
  shape(x, ell(395, 884, 50, 24, 20), STONE, { lw: 6, seed: 34, dot: STONED, pitch: 8, rad: 0.2, da: 0.5 });   // root stone, top ~862
}
const k5HomeSky = () => k5bake('homeSky', 1000, 1230, 2, (c) => { sky(c); });
const k5HomeSkyUp = () => k5bake('homeSkyUp', 1000, 900, 1, (c) => { sky(c, { h: 900, hills: [] }); });
const k5HomeLand = () => k5bake('homeLand', 1000, 1230, 2, (c) => { hillTrees(c); ground(c); k5TreeCrowns(c); });
const k5HomeTrunk = () => k5bake('homeTrunk', 1000, 1230, 2, (c) => { k5TreeTrunk(c); });
// draw the home set: o.u (time of day, live sky), o.behind(ctx) (things behind the trunk), o.night (0..1 darkening)
function k5Home(ctx, t, o = {}) {
  if (o.u != null) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.clip(); skyCycle(ctx, o.u, { t }); ctx.restore(); }
  else { ctx.drawImage(k5HomeSkyUp(), 0, -900, 1000, 900); ctx.drawImage(k5HomeSky(), 0, 0, 1000, 1230); sun(ctx, 860, 140, t); cloudFlat(ctx, 160 + ((t * 5) % 1300) - 200, 120, 0.7); }
  ctx.drawImage(k5HomeLand(), 0, 0, 1000, 1230);
  if (o.behind) o.behind(ctx);
  ctx.drawImage(k5HomeTrunk(), 0, 0, 1000, 1230);
}
function k5Night(ctx, n) { if (n <= 0.01) return; ctx.save(); ctx.globalAlpha = 0.45 * n; ctx.fillStyle = NAVY2; ctx.fillRect(-100, -1000, 1300, 2400); ctx.restore(); }
// the nest's front rim (over a sitting bird) and loose shell halves
function k5NestFront(ctx, x, y) { ctx.save(); ctx.translate(x, y); const hh = 38;
  shape(ctx, [[-62, -22], [-54, -22 - hh * 0.3 + 16], [-30, -4], [30, -4], [54, -22 - hh * 0.3 + 16], [62, -22], [50, 0], [-50, 0]], '#d9a441', { lw: 6, seed: 9, dot: '#6e4a0a', pitch: 8, rad: 0.18, da: 0.6 });
  for (let i = 0; i < 6; i++) seg(ctx, -40 + i * 16, -3, -34 + i * 16 + 8, -17, 4, '#f2d27a', 2); ctx.restore(); }
function k5Shell(ctx, x, y, rot, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-12, 0], [-9, -9], [-4, -3], [0, -10], [4, -3], [9, -9], [12, 0], [8, 8], [-8, 8]], C.white, { lw: 3, seed: 13, dot: C.skin, pitch: 6, rad: 0.2, da: 0.5 }); ctx.restore(); }
function k5Crack(ctx, x, y, p) { if (p <= 0) return; ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; const pts = [[-14, -2], [-8, -8], [-3, 0], [3, -8], [8, 0], [14, -6]], n = Math.max(2, Math.ceil(pts.length * K.clamp(p)));
  ctx.beginPath(); pts.slice(0, n).forEach(([a, b], i) => i ? ctx.lineTo(x + a, y + b) : ctx.moveTo(x + a, y + b)); ctx.stroke(); ctx.restore(); }

// ---------- river village set (Library river, riverBank, islandHut, figTree) + wash rock ----------
const K5_RIV = { ridge: [855, 361], woman: [742, 746], rock: [846, 806] };
const k5RiverLand = () => k5bake('riverLand', 1000, 1230, 2, (c) => { riverBank(c); islandHut(c); figTree(c); shape(c, ell(846, 812, 64, 20, 22), STONE, { lw: 6, seed: 81, dot: STONED, pitch: 8, rad: 0.2, da: 0.5 }); });

// ---------- chase road: 3000-wide strip (sky, hills, ground, three perch trees, the tall home tree at the far right) ----------
const K5_CW = 3000, K5_PERCH = [[1150, 1080], [1600, 1530], [2050, 1980]];   // [trunk x, branch tip x]; branches at y 548
function k5ChaseTree(c, x, tip) { tree(c, x - 30, 900, { w: 60, top: 470, crowns: [[x, 400, 110], [x - 70, 450, 70], [x + 80, 450, 74]] }); shape(c, [[x - 20, 572], [tip - 6, 552], [tip - 8, 540], [x - 20, 552]], WOOD, { lw: 6, seed: 37, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 }); }
const k5ChaseLayer = () => k5bake('chase', K5_CW, 1230, 1.2, (c) => {
  c.fillStyle = C.blue; c.fillRect(0, 0, K5_CW, 1230); c.fillStyle = dotPat(c, '#3f7be6', 13, 0.3); c.fillRect(0, 0, K5_CW, 920);
  for (let i = 0; i < 7; i++) { const bx = 150 + i * 450, br = 260 + (i % 2) * 40; c.beginPath(); c.ellipse(bx, 890, br, br * 0.5, 0, Math.PI, 0); c.fillStyle = i % 2 ? '#2457b8' : '#2a62c9'; c.fill(); c.lineWidth = 6; c.strokeStyle = C.black; c.stroke(); }
  for (const off of [0, 1000, 2000]) { c.save(); c.translate(off, 0); hillTrees(c, { seed: 4 + off / 1000 }); c.restore(); }
  ground(c, { w: K5_CW });
  for (const [x, tip] of K5_PERCH) k5ChaseTree(c, x, tip);
  c.save(); c.translate(2760 - 560, 0); k5TreeCrowns(c); k5TreeTrunk(c); c.restore();
  k5Burrow(c, 2760 - 560 + 860, 890, {});
});
