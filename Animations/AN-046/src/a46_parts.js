// ===== AN-046 The Sparrow and the Peacock: parts (maths, peacock, hunter, cage, net, small props, effects) =====
// Every frame is a pure function of t. Story names are prefixed A46 / a46 (never redefine engine or Library globals).
const A46_DUR = 176.33;   // narration 172.831 + 3.5 s THE END hold (plan)
const A46_GR = 900, A46_SS = 1.1, A46_PST = 2 * 24 / Math.PI;   // peacock stride (no-slide) at s 1
//   // ground line; sparrow scale (the Library sparrow is about 70 tall at s 1)

// ---------- small maths ----------
const a46e = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a46in = (t, a, b) => t >= a && t < b;
const a46lp = (a, b, f) => (Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], f)) : K.lerp(a, b, f));
function a46kv(t, keys, e = 'inOut') {   // eased holds between keys [[t, value | [x, y]], ...]
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, a] = keys[i - 1], [t1, b] = keys[i]; return a46lp(a, b, K.ease[e](K.clamp((t - t0) / Math.max(1e-6, t1 - t0)))); }
  return keys[keys.length - 1][1];
}
const a46tap = (t, list, d = 0.22) => { let v = 0; for (const a of list) if (t >= a && t < a + d) v = Math.max(v, Math.sin(Math.PI * (t - a) / d)); return v; };
const a46sac = (t, list) => { let g = list[0][1]; for (const [a, v] of list) if (t >= a) g = v; return g; };   // 2-frame snaps
const a46fade = (t, a, b, d = 0.25) => K.clamp((t - a) / d) * (1 - K.clamp((t - (b - d)) / d));
const a46lid = (t, seed, base = 0) => Math.max(base, blink(t, seed));

// ---------- the sparrow helpers ----------
const a46sHead = (B) => { const s = B.s || A46_SS; return [B.x + (B.dir ?? 1) * 24 * s, B.y + (-54 + (B.drop || 0)) * s]; };
const a46sp = (o) => ({ kind: 'sparrow', pal: 0, s: A46_SS, dir: 1, ...o });
// a flight between keys [[t, x, y], ...]: eased arcs, flap rate from the mood, pitch toward the travel
function a46fly(t, keys, o = {}) {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], fly: false, flap: 0, rot: 0 };
  const last = keys[keys.length - 1]; if (t >= last[0]) return { x: last[1], y: last[2], fly: false, flap: 0, rot: 0 };
  let i = 1; while (keys[i][0] < t) i++;
  const [t0, x0, y0] = keys[i - 1], [t1, x1, y1] = keys[i], u = K.clamp((t - t0) / (t1 - t0)), lift = o.arc ?? -40;
  const x = K.lerp(x0, x1, K.ease.inOut(u)), y = K.lerp(y0, y1, K.ease.inOut(u)) + Math.sin(Math.PI * u) * lift * (Math.abs(x1 - x0) > 40 ? 1 : 0.2);
  const hz = o.hz ?? 9, dir = Math.abs(x1 - x0) < 2 ? (o.dir ?? 1) : Math.sign(x1 - x0);
  return { x, y, fly: true, flap: Math.sin(t * 2 * Math.PI * hz + (o.ph || 0)), rot: K.clamp((y1 - y0) / 900, -0.4, 0.4) * dir, dir };
}

// ---------- the peacock (new character, side view, feet at (x, y), facing dir; about 330 tall at s 1) ----------
// P: {x, y, s, dir, fan (0 folded train .. 1 full fan; > 1 overshoot), fanShake (0..1 shimmer), neck (1 normal height; >1 stretch),
//     bow (0..1 head forward and down), preen (0..1 head into the chest), headRot (tilt), crest (crest sway, radians), talk/beak (0..1),
//     brow, wing (0..1 extended), wingA (angle of the extended wing, local: 0 forward, -1.57 up, 1.2 down-forward, 2.4 down-back),
//     sit (0..1 on a rock), crown (0..1), gulp (0..1 a lump travelling down the neck), ph, amp (walk), eyes, silhouette}
const A46_PEA = { body: '#1d5bd0', dot: '#16337f', train: '#2b8a3e', tdot: '#1d6b2e', wing: '#c98a3a', wdot: '#7a4212', beak: '#d9a441', legs: '#b9a27a' };
function a46peaRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, sil = !!P.silhouette, col = (c) => (sil ? C.black : c), sit = K.clamp(P.sit || 0), t = P.t || 0;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const hipY = -112 + sit * 84, B = [-6, hipY - 44];
  // the train / fan: 13 feathers from the rump; folded they trail to the ground, open they make a half disc of radius ~300
  const fan = Math.max(0, P.fan || 0), N = 13, O = [B[0] - 34, B[1] - 6], sh = P.fanShake || 0;
  const feathers = [];
  for (let i = 0; i < N; i++) {
    const c = Math.abs(i - (N - 1) / 2) / ((N - 1) / 2), f = K.clamp((fan - c * 0.18) / 0.82) * (fan > 1 ? fan : 1);
    const aT = Math.PI - 0.5 - sit * 0.35 + (i - 6) * 0.02, aF = Math.PI - 0.32 + (i / (N - 1)) * (Math.PI + 0.64);
    const a = K.lerp(aT, aF, Math.min(1, f)) + sh * 0.035 * Math.sin(t * 23 + i * 1.9), L = K.lerp(300 - sit * 50, 290, Math.min(1, f)) * (f > 1 ? 1 + (f - 1) * 0.6 : 1) - (i % 2) * 14;
    feathers.push([a, L]);
  }
  if (fan > 0.15) {   // the web of the fan between the feathers
    const pts = [O]; for (const [a, L] of feathers) pts.push([O[0] + Math.cos(a) * L * 0.86, O[1] + Math.sin(a) * L * 0.86]);
    ctx.save(); ctx.globalAlpha *= K.clamp((fan - 0.15) / 0.35); shape(ctx, pts, col(A46_PEA.train), sil ? { lw: 6 } : { lw: 6, seed: 3, dot: A46_PEA.tdot, pitch: 9, rad: 0.25, da: 0.5 }); ctx.restore();
  }
  feathers.forEach(([a, L], i) => {
    const ca = Math.cos(a), sa = Math.sin(a), tip = [O[0] + ca * L, O[1] + sa * L], fm = K.lerp(0.3 + 0.6 * ((i * 5) % N) / N, 0.78, K.clamp(fan * 1.5)), mid = [O[0] + ca * L * fm, O[1] + sa * L * fm];
    seg(ctx, O[0], O[1], tip[0], tip[1], 9, col(A46_PEA.train), 3);
    const vr = 26 + (fan > 0.4 ? 6 : 0);
    ctx.save(); ctx.translate(mid[0] + ca * 18, mid[1] + sa * 18); ctx.rotate(a);
    shape(ctx, [[-vr * 1.5, 0], [-vr * 0.4, -vr * 0.75], [vr * 0.7, -vr * 0.7], [vr * 1.05, 0], [vr * 0.7, vr * 0.7], [-vr * 0.4, vr * 0.75]], col(A46_PEA.train), sil ? { lw: 3.5 } : { lw: 3.5, seed: 10 + i, dot: A46_PEA.tdot, pitch: 7, rad: 0.25, da: 0.5 });
    if (!sil) { shape(ctx, ell(vr * 0.15, 0, vr * 0.62, vr * 0.5, 16), C.yellow, { lw: 2.5, seed: 30 + i }); shape(ctx, ell(vr * 0.2, 0, vr * 0.4, vr * 0.32, 14), C.blue, { lw: 2, seed: 50 + i }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(vr * 0.24, 0, vr * 0.17, vr * 0.15, 0, 0, 7); ctx.fill(); }
    ctx.restore();
  });
  // legs
  const ph = (P.ph || 0) * Math.sign(dir), amp = P.amp || 0;
  [[-8, 0], [8, Math.PI]].forEach(([hx, o2], k) => {
    if (sit > 0.5) { const tp = k ? (P.tap || 0) * 9 : 0; seg(ctx, hx, hipY - 4, hx + 26, hipY + 10 - tp, 7, col(A46_PEA.legs), 2.5); seg(ctx, hx + 26, hipY + 10 - tp, hx + 42, hipY + 12 - tp * 1.4, 5, col(A46_PEA.legs), 2); return; }
    const sw = Math.sin(ph + o2) * amp, fx = hx + 24 * sw, lift = Math.max(0, Math.cos(ph + o2)) * 16 * amp + (k ? 0 : 16 * (P.tapF || 0)), fy = -lift * (1 - sit);   // v2: tapF lifts the near foot
    const kx = (hx + fx) / 2 + 12, ky = (hipY + fy) / 2;
    seg(ctx, hx, hipY, kx, ky, 8, col(A46_PEA.legs), 2.5); seg(ctx, kx, ky, fx, fy, 7, col(A46_PEA.legs), 2.5);
    for (const tx of [16, 6, -10]) seg(ctx, fx, fy, fx + tx, fy + 2, 4, col(A46_PEA.legs), 1.5);
  });
  // body
  ctx.save(); ctx.translate(B[0], B[1]); ctx.rotate(-0.22);
  shape(ctx, ell(0, 0, 60, 46, 26), col(A46_PEA.body), sil ? { lw: 6 } : { lw: 6, seed: 5, dot: A46_PEA.dot, pitch: 8, rad: 0.22, da: 0.5 });
  ctx.restore();
  // neck and head
  const Sh = [B[0] + 40, B[1] - 26], nk = P.neck ?? 1, bow = K.clamp(P.bow || 0), pr = K.clamp(P.preen || 0);
  let H = [Sh[0] + 34, Sh[1] - 128 * nk]; H = a46lp(H, [Sh[0] + 118, Sh[1] + 6], bow); H = a46lp(H, [Sh[0] + 8, Sh[1] + 12], pr);
  const Cn = [Sh[0] + (H[0] - Sh[0]) * 0.1 - 18 * (1 - bow), (Sh[1] + H[1]) / 2 + 8 * bow];
  const neckPath = () => { ctx.beginPath(); ctx.moveTo(Sh[0] - 6, Sh[1] + 14); ctx.quadraticCurveTo(Cn[0], Cn[1], H[0], H[1]); };
  ctx.save(); ctx.lineCap = 'round'; neckPath(); ctx.lineWidth = 34; ctx.strokeStyle = C.black; ctx.stroke(); neckPath(); ctx.lineWidth = 24; ctx.strokeStyle = col(A46_PEA.body); ctx.stroke();
  if (!sil) { neckPath(); ctx.lineWidth = 24; ctx.strokeStyle = dotPat(ctx, A46_PEA.dot, 8, 0.22); ctx.globalAlpha *= 0.5; ctx.stroke(); }
  ctx.restore();
  if (P.gulp > 0 && P.gulp < 1) { const u = 1 - P.gulp, q = [(1 - u) * (1 - u) * (Sh[0] - 6) + 2 * u * (1 - u) * Cn[0] + u * u * H[0], (1 - u) * (1 - u) * (Sh[1] + 14) + 2 * u * (1 - u) * Cn[1] + u * u * H[1]]; shape(ctx, ell(q[0] + 3, q[1], 17, 15, 14), col(A46_PEA.body), { lw: 4, seed: 9 }); }
  ctx.save(); ctx.translate(H[0], H[1]); ctx.rotate((P.headRot || 0) + bow * 0.5 + pr * 1.4); if (P.headFlip) ctx.scale(-1, 1);   // v2: headFlip = looks behind himself
  // crest: five dotted stalks, swaying with P.crest (callers lag it behind the head)
  const cr = P.crest || 0;
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 - 0.5 + i * 0.22 + cr, L2 = 34 - Math.abs(i - 2) * 3, ex = -2 + Math.cos(a) * L2, ey = -14 + Math.sin(a) * L2;
    ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-2, -14); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore(); shape(ctx, ell(ex, ey, 6, 6, 10), col(A46_PEA.body), { lw: 2.5, seed: 70 + i }); }
  // beak (lower opens with talk)
  const ob = K.clamp(P.beak ?? P.talk ?? 0, 0, 1.4);
  if (ob > 0.05) { ctx.save(); ctx.translate(18, 3); ctx.rotate(0.45 * ob); shape(ctx, [[0, 0], [22, 2], [0, 6]], col(A46_PEA.beak), { lw: 2.5, seed: 8 }); ctx.restore(); }
  shape(ctx, [[17, -5], [40, 1], [17, 4]], col(A46_PEA.beak), { lw: 3, seed: 7 });
  shape(ctx, ell(0, 0, 25, 21, 20), col(A46_PEA.body), sil ? { lw: 5 } : { lw: 5, seed: 6, dot: A46_PEA.dot, pitch: 7, rad: 0.2, da: 0.45 });
  if (!sil) {
    shape(ctx, [[-14, 5], [4, 9], [16, 4], [6, 13], [-12, 11]], C.white, { lw: 2.5, seed: 11 });
    eyeAt(ctx, 5, -4, P.eyes || 'open', 0.8);
    if (P.brow) { ctx.save(); ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-6, -17 - P.brow * 2); ctx.lineTo(13, -13 + P.brow * 5); ctx.stroke(); ctx.restore(); }
  }
  if ((P.crown || 0) > 0) a46crown(ctx, 0, -22 + (P.crownY || 0), 0.62 * K.clamp(P.crown), { sil });
  ctx.restore();
  // the near wing: folded on the body, or extended at wingA
  const wv = K.clamp(P.wing || 0), Wp = [B[0] + 22, B[1] - 18], restA = Math.PI - 0.55, wa = K.lerp(restA, P.wingA ?? -1.2, wv), wl = K.lerp(78, 132, wv);
  ctx.save(); ctx.translate(Wp[0], Wp[1]); ctx.rotate(wa);
  const wp = [[0, -16], [wl * 0.5, -22], [wl, -8], [wl + 10, 4], [wl * 0.9, 12], [wl * 0.5, 18], [0, 14]];
  shape(ctx, wp, col(A46_PEA.wing), sil ? { lw: 5 } : { lw: 5, seed: 12, dot: A46_PEA.wdot, pitch: 7, rad: 0.22, da: 0.5 });
  if (!sil) for (let k = 0; k < 3; k++) seg(ctx, wl * (0.55 + k * 0.14), -14, wl * (0.5 + k * 0.14), 12, 3, C.black, 0);
  ctx.restore();
  ctx.restore();
}
const a46pea = acting(a46peaRaw, () => A46_PEA.body);
// head point of the peacock in world space (mirrors the geometry above; for gaze, twoShot and lettering)
function a46peaHead(P) {
  const s = P.s || 1, dir = P.dir ?? 1, sit = K.clamp(P.sit || 0), hipY = -112 + sit * 84, B = [-6, hipY - 44], Sh = [B[0] + 40, B[1] - 26], nk = P.neck ?? 1;
  let H = [Sh[0] + 34, Sh[1] - 128 * nk]; H = a46lp(H, [Sh[0] + 118, Sh[1] + 6], K.clamp(P.bow || 0)); H = a46lp(H, [Sh[0] + 8, Sh[1] + 12], K.clamp(P.preen || 0));
  const sq = P.sq ?? 1; return [P.x + dir * s * H[0] * (1 + (1 - sq) * 0.7), P.y + s * H[1] * sq];
}
const A46_FATE = { fan: 1, wing: 1, wingA: -1.75, lid: 0.5, neck: 1.08, headRot: -0.18, crown: 1, brow: -0.3 };   // THE POSE (80.22 and 153.34)

// ---------- crown and badge ----------
function a46crown(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.rot) ctx.rotate(o.rot);
  const pts = [[-35, 0], [-35, -26], [-22, -12], [-12, -44], [0, -16], [12, -44], [22, -12], [35, -26], [35, 0]];
  if (o.ghost) { ctx.save(); ctx.setLineDash([9, 8]); ctx.lineWidth = 5; ctx.strokeStyle = C.black; K.poly(ctx, pts, true); ctx.stroke(); ctx.restore();
    ctx.font = K.font(40, BF, 400); ctx.textAlign = 'center'; ctx.fillStyle = C.red; ctx.fillText('?', 0, -6); }
  else { shape(ctx, pts, o.sil ? C.black : C.yellow, o.sil ? { lw: 4 } : { lw: 5, seed: 41, dot: '#ff9a2a', pitch: 6, rad: 0.2, da: 0.5 }); if (!o.sil) for (const [px, py] of [[-12, -44], [12, -44], [-35, -26], [35, -26]]) shape(ctx, ell(px, py, 5, 5, 10), C.red, { lw: 2, seed: 42 }); }
  ctx.restore();
}
// loose office badge: ribbon loop with the gold medal (limp lies flat on the ground)
function a46badge(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const limp = K.clamp(o.limp || 0);
  shape(ctx, [[-6, -24], [-22 - limp * 14, -58 + limp * 40], [-10 - limp * 6, -62 + limp * 44], [2, -26]], C.blue, { lw: 3, seed: 44 });
  shape(ctx, [[6, -24], [20 + limp * 16, -56 + limp * 40], [8 + limp * 8, -60 + limp * 44], [-2, -26]], C.red, { lw: 3, seed: 45 });
  shape(ctx, ell(0, -12, 14, 14, 16), C.yellow, { lw: 3.5, seed: 46, dot: '#ff9a2a', pitch: 5, rad: 0.2, da: 0.5 }); star(ctx, 0, -12, 7, C.red);
  ctx.restore();
}
function a46glint(ctx, x, y, r, p) { if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p); ctx.save(); ctx.translate(x, y); ctx.rotate(p * 0.8); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.22 * k : r * k; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
// bindle: stick with a red dotted bundle; (x, y) = the hand end of the stick, ang = stick angle (0 = pointing back-up from the shoulder)
function a46bindle(ctx, x, y, ang, s = 1, sw = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  seg(ctx, 0, 0, -60, 0, 5, WOOD, 2.5); ctx.translate(-60, 0); ctx.rotate(sw - ang * 0.8);
  shape(ctx, ell(0, 16, 16, 15, 16), C.red, { lw: 3.5, seed: 47, dot: C.white, pitch: 6, rad: 0.25, da: 0.6 }); shape(ctx, [[-5, 2], [0, -4], [5, 2]], C.red, { lw: 2.5 });
  ctx.restore();
}
// grain: a mound of yellow grains, n grains, fill 0..1; loose = grains still in the air (from throws): [[x0, x1, t0]] handled by the caller
function a46grain(ctx, cx, y, fill = 1, o = {}) {
  const r = K.rng(o.seed ?? 9), n = Math.round(36 * K.clamp(fill)), w = o.w ?? 70;
  for (let i = 0; i < 36; i++) { const u = r(), v = r(), gx = cx + (u - 0.5) * w * (1 - v * 0.5), gy = y - v * 18 * (1 - Math.abs(u - 0.5) * 1.6); if (i >= n) continue;
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(r() * 3); ctx.fillStyle = C.yellow; ctx.strokeStyle = C.black; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, 0, 6, 4, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
}
function a46grainDot(ctx, x, y, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = C.yellow; ctx.strokeStyle = C.black; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, 0, 6, 4, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }

// ---------- people: the hunter and his companion (person costume presets, recoloured; plan's 'hunter' preset is not in the Library yet) ----------
const A46_HUNT = { costume: 'beanSeller', pal: { robe: '#8a5a22', dot: '#5b3a1e', sleeve: CREAM, apron: false, hc: '#6e4418', hd: '#3a2410', sash: '#c9a27a', pants: CREAM }, age: 0.35, s: 1, seed: 37 };
const A46_COMP = { costume: 'beanSeller', pal: { robe: '#3f9d4a', dot: '#2b7a38', sleeve: CREAM, apron: false, hc: C.red, hd: '#a8160f', pants: CREAM }, age: 0, s: 0.95, seed: 41 };
function a46age(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function a46off(P) { const sit = P.sit || 0, kn = P.kneel || 0, sh = P.seat === 'floor' ? [0, -24] : [-22, -52];
  let h = [K.lerp(0, sh[0], sit), K.lerp(-75, sh[1], sit)]; h = [K.lerp(h[0], -4, kn), K.lerp(h[1], -48, kn)]; return [h[0], h[1] + 75]; }
function a46L2W(P, q) {   // person upper-body local point -> world
  const s = P.s || 1, dir = P.dir || 1, off = a46off(P), le = (P.lean || 0) + a46age(P) * 0.12, c = Math.cos(le), n = Math.sin(le), y0 = q[1] + 75;
  let wx = dir * s * (q[0] * c - y0 * n + off[0]), wy = s * (q[0] * n + y0 * c - 75 + off[1]);
  const sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir); wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  return [P.x + wx * Math.cos(tip) - wy * Math.sin(tip), P.y + wx * Math.sin(tip) + wy * Math.cos(tip)];
}
const a46hdY = (P) => -195 + (P.drop || 0) + a46age(P) * 6;
const a46pHead = (P) => a46L2W(P, [(P.look || 0) * 4, a46hdY(P)]);
function a46headXf(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir), hx = (P.look || 0) * 4, hy = a46hdY(P);
  ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.scale(dir * s, s);
  const off = a46off(P), le = (P.lean || 0) + a46age(P) * 0.12; ctx.translate(off[0], off[1]); ctx.translate(0, -75); ctx.rotate(le); ctx.translate(0, 75);
  ctx.translate(hx, hy); ctx.rotate(P.tilt || 0);
}
// cap feather + stubble overlay (feather alone can be drawn with o.featherOnly for the bush tell)
function a46feather(ctx, x, y, rot, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[0, 0], [-8, -30], [-4, -62], [4, -66], [8, -34], [4, 0]], C.red, { lw: 3.5, seed: 61, dot: '#a8160f', pitch: 5, rad: 0.25, da: 0.5 }); seg(ctx, 0, 2, 2, -60, 2, C.black, 0); ctx.restore(); }
function a46hunter(ctx, P, o = {}) {
  person(ctx, P);
  ctx.save(); a46headXf(ctx, P);
  if (o.feather !== false) a46feather(ctx, -22, -30, -0.45, 1);
  if (o.stubble !== false) { ctx.fillStyle = '#3a2410'; const r = K.rng(5); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(-18 + r() * 36, 16 + r() * 14, 1.8, 0, 7); ctx.fill(); } }
  ctx.restore();
}
// world position of the cap feather tip (for the bush tell)
const a46featherW = (P) => a46L2W(P, [-34, a46hdY(P) - 80]);

// ---------- net mesh helpers ----------
function a46mesh(ctx, poly, pitch = 16, lw = 3, alpha = 1, colr = '#5b3a1e') {
  ctx.save(); ctx.globalAlpha *= alpha; K.poly(ctx, poly, true); ctx.clip(); const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]);
  const x0 = Math.min(...xs) - 40, x1 = Math.max(...xs) + 40, y0 = Math.min(...ys) - 40, y1 = Math.max(...ys) + 40, hh = y1 - y0;
  ctx.lineCap = 'round'; ctx.lineWidth = lw + 2; ctx.strokeStyle = C.black; ctx.beginPath(); for (let k = x0 - hh; k < x1; k += pitch) { ctx.moveTo(k, y0); ctx.lineTo(k + hh, y1); ctx.moveTo(k + hh, y0); ctx.lineTo(k, y1); } ctx.stroke();
  ctx.lineWidth = lw; ctx.strokeStyle = colr; ctx.stroke(); ctx.restore();
}
function a46rope(ctx, pts, w = 6) { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; K.poly(ctx, pts, false); ctx.lineWidth = w + 4; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = '#c9a27a'; ctx.stroke(); ctx.restore(); }
// the big net. state: 'roll' (bundle at x, y), 'spread' (flat on the ground, width w, unroll u from the right), 'bag' (k 0 spread .. 1 closed sack, wob),
// 'thrown' (disc at x, y, radius r, rot), 'draped' (dome over x, width w, height h, tent [x, y] | null, bulge), part 'back' | 'front' | undefined (both)
function a46net(ctx, st, o = {}) {
  const x = o.x ?? 760, y = o.y ?? A46_GR;
  if (st === 'roll') { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const p = ell(0, 0, 34, 20, 18); shape(ctx, p, '#d9c08a', { lw: 4, seed: 100 }); a46mesh(ctx, p, 9, 2); ctx.restore(); return; }
  if (st === 'spread') {
    const w = o.w ?? 280, u = K.clamp(o.u ?? 1), xr = x + w / 2, xl = xr - w * u;
    const poly = [[xl, y + 6], [xr, y + 6], [xr - 10, y - 10], [xl + 10, y - 10]];
    if (u > 0.02) { ctx.save(); ctx.globalAlpha *= 0.35; K.poly(ctx, poly, true); ctx.fillStyle = '#d9c08a'; ctx.fill(); ctx.restore(); a46mesh(ctx, poly, 14, 2.2); a46rope(ctx, poly.concat([poly[0]]), 3); }
    if (u < 0.98) { ctx.save(); ctx.translate(xl, y - 8); const p = ell(0, 0, 18, 14, 14); shape(ctx, p, '#d9c08a', { lw: 4, seed: 100 }); a46mesh(ctx, p, 8, 2); ctx.restore(); }
    if (o.pegs !== false && u > 0.98) for (const px of [xl + 6, xr - 6]) for (const py of [y + 6, y - 10]) { seg(ctx, px, py, px, py - 14, 5, WOOD, 2); }
    if (o.rope) a46rope(ctx, [[xr - 4, y - 2], ...o.rope], 4);
    return;
  }
  if (st === 'bag') {   // the snap: the spread corners rise and close into a sack
    const k = K.clamp(o.k ?? 1), wob = o.wob || 0, n = 22, pts = [], cy0 = y - 2, rx0 = (o.w ?? 280) / 2, rx1 = o.ground ? 92 : 78, ry1 = o.ground ? 62 : 88, cy1 = o.ground ? y - 60 : y - 90;
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, bulge = 1 + 0.08 * Math.sin(a * 3 + wob * 9) * (wob ? 1 : 0);
      const p0 = [x + Math.cos(a) * rx0, cy0 + Math.sin(a) * 9], p1 = [x + Math.cos(a) * rx1 * bulge, cy1 + Math.sin(a) * ry1 * bulge - (Math.sin(a) < -0.8 ? 26 : 0)];
      pts.push(a46lp(p0, p1, k)); }
    if (o.inside && k > 0.5) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); o.inside(ctx); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= o.light ? 0.12 : 0.3 + 0.25 * k; K.poly(ctx, pts, true); ctx.fillStyle = '#d9c08a'; ctx.fill(); ctx.restore();
    if (o.light) a46mesh(ctx, pts, 24, 2.2, 0.9, '#e8d9a8'); else a46mesh(ctx, pts, 14, 2.4); a46rope(ctx, pts.concat([pts[0]]), 3);
    if (k > 0.6) { const top = a46lp([x, cy0], [x, cy1 - ry1 - 26], k); a46rope(ctx, [[top[0], top[1] + 6], ...(o.rope || [[top[0] + 40, top[1] - 10]])], 4); }
    return pts;
  }
  if (st === 'thrown') {
    const r = o.r ?? 160, rot = o.rot || 0, pts = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; const q = [Math.cos(a) * r, Math.sin(a) * r * 0.42 + Math.sin(a * 5 + rot * 4) * 6]; pts.push([x + q[0] * Math.cos(rot) - q[1] * Math.sin(rot), y + q[0] * Math.sin(rot) + q[1] * Math.cos(rot)]); }
    ctx.save(); ctx.globalAlpha *= 0.12; K.poly(ctx, pts, true); ctx.fillStyle = '#d9c08a'; ctx.fill(); ctx.restore(); a46mesh(ctx, pts, o.pitch ?? 30, 2.4, 0.9, '#e8d9a8'); a46rope(ctx, pts.concat([pts[0]]), 3.5);
    const tr = o.trail || [0, 0]; for (let i = 0; i < 8; i++) { const p = pts[i * 3]; seg(ctx, p[0], p[1], p[0] + tr[0], p[1] + tr[1] + 8, 2.5, '#c9a27a', 1.5); shape(ctx, ell(p[0] + tr[0], p[1] + tr[1] + 14, 7, 7, 10), STONED, { lw: 3, seed: 120 + i }); }
    return;
  }
  if (st === 'draped') {
    const w = o.w ?? 320, h = o.h ?? 130, tent = o.tent, n = 24, pts = [];
    for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI; let px = x + Math.cos(a) * w / 2, py = y + 4 + Math.sin(a) * h;
      if (tent) { const d = Math.abs(px - tent[0]) / 90, k = Math.max(0, 1 - d * d); py = Math.min(py, K.lerp(py, tent[1], k)); }
      if (o.bulge) for (const [bx, by] of o.bulge) { const d = Math.hypot(px - bx, py - by); if (d < 50) { px += (px - bx) / (d || 1) * 15 * (1 - d / 50); py += (py - by) / (d || 1) * 15 * (1 - d / 50); } }
      pts.push([px, py]); }
    pts.push([x + w / 2, y + 6], [x - w / 2, y + 6]);
    if (o.part !== 'front') { ctx.save(); ctx.globalAlpha *= 0.25; K.poly(ctx, pts, true); ctx.fillStyle = '#d9c08a'; ctx.fill(); ctx.restore(); a46mesh(ctx, pts, 22, 1.6, 0.45); }
    if (o.part !== 'back') { a46mesh(ctx, pts, 30, 2.4, 0.85, '#e8d9a8'); a46rope(ctx, pts.slice(0, n + 1), 3.5); for (let i = 0; i < 6; i++) { const p = pts[Math.round(i / 5 * n)]; shape(ctx, ell(p[0], Math.max(p[1], y - 4) + 2, 7, 7, 10), STONED, { lw: 3, seed: 120 + i }); } }
    return pts;
  }
}
// mesh shadow on the ground (the falling net): ellipse width w, alpha a
function a46meshShadow(ctx, x, y, w, a) { if (w <= 2 || a <= 0) return; const p = ell(x, y, w / 2, w * 0.12, 26); ctx.save(); ctx.globalAlpha *= a; K.poly(ctx, p, true); ctx.fillStyle = C.black; ctx.fill(); ctx.restore(); a46mesh(ctx, p, 12, 2, a * 1.4, C.black); }

// ---------- the bird cage: domed wire cage, base centre (x, y), 170 x 200 at s 1. part 'back' | 'front' ----------
function a46cage(ctx, x, y, s, part, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  const W = 85, top = -196, sh = -128, bars = o.bars || [-78, -52, -26, 0, 26, 52, 78], door = K.clamp(o.door || 0, 0, 1.9), bw = o.thin ? [3.5, 1.6] : [5, 2.2];
  const bar = (bx, w, colr) => { ctx.beginPath(); ctx.moveTo(bx, -14); ctx.lineTo(bx, sh); ctx.quadraticCurveTo(bx, top, 0, top); ctx.lineWidth = w; ctx.strokeStyle = colr; ctx.stroke(); };
  ctx.lineCap = 'round';
  if (part === 'back') {
    ctx.save(); ctx.globalAlpha *= 0.55; for (const bx of bars) bar(bx * 0.9 + 9, 3, '#3a3a4a');
    if (o.doorBack) { const d0 = (o.dx ?? -30) * 0.9 + 9; ctx.lineWidth = 3; ctx.strokeStyle = '#3a3a4a'; ctx.strokeRect(d0, -104, 54, 88); for (const f of [0.33, 0.66]) { ctx.beginPath(); ctx.moveTo(d0 + 54 * f, -16); ctx.lineTo(d0 + 54 * f, -104); ctx.stroke(); } }   // v3: door on the far side (behind the bird)
    ctx.restore();
    shape(ctx, [[-W - 6, 0], [W + 6, 0], [W + 2, -16], [-W - 2, -16]], WOOD, { lw: 4.5, seed: 81, dot: '#7a4e12', pitch: 7, rad: 0.2, da: 0.5 });
  } else {
    const dx0 = o.dx ?? -30, dx1 = dx0 + 60, dTop = -104, open = door > 0.05;
    const ry = o.ring ?? -60;   // v3: middle ring height (S15 moves it below the badge)
    for (const bx of bars) { if (open && bx > dx0 && bx < dx1) { ctx.beginPath(); ctx.moveTo(bx, dTop); ctx.lineTo(bx, sh); ctx.quadraticCurveTo(bx, top, 0, top); ctx.lineWidth = bw[0]; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = bw[1]; ctx.strokeStyle = STONE2; ctx.stroke(); continue; }
      bar(bx, bw[0], C.black); bar(bx, bw[1], STONE2); }
    ctx.lineWidth = 7; ctx.strokeStyle = C.black; for (const hy of [ry, sh]) { ctx.beginPath(); ctx.ellipse(0, hy, W, 9, 0, 0, Math.PI); ctx.stroke(); }
    ctx.lineWidth = 3.5; ctx.strokeStyle = C.yellow; for (const hy of [ry, sh]) { ctx.beginPath(); ctx.ellipse(0, hy, W, 9, 0, 0, Math.PI); ctx.stroke(); }
    if (o.doorBack) { shape(ctx, ell(0, top - 9, 11, 11, 14), C.yellow, { lw: 4, seed: 83 }); shape(ctx, ell(0, top - 9, 4, 4, 10), C.paper, { lw: 2.5, seed: 84 }); ctx.restore(); return; }
    const lw = (dx1 - dx0) * Math.cos(door), lx1 = dx0 + lw;
    ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.strokeRect(dx0, dTop, dx1 - dx0, -14 - dTop); ctx.restore();
    if (Math.abs(lw) > 1.5) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(dx0, -16); ctx.lineTo(lx1, -16 - 6 * Math.sin(door)); ctx.lineTo(lx1, dTop - 6 * Math.sin(door)); ctx.lineTo(dx0, dTop); ctx.closePath(); ctx.stroke();
      ctx.lineWidth = 3; ctx.strokeStyle = C.yellow; ctx.stroke(); for (const f of [0.33, 0.66]) { const bx = dx0 + lw * f; ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(bx, -16 - 6 * Math.sin(door) * f); ctx.lineTo(bx, dTop - 6 * Math.sin(door) * f); ctx.stroke(); } ctx.restore(); }
    shape(ctx, ell(0, top - 9, 11, 11, 14), C.yellow, { lw: 4, seed: 83 }); shape(ctx, ell(0, top - 9, 4, 4, 10), C.paper, { lw: 2.5, seed: 84 });
    shape(ctx, ell(dx1 - 4, ry, 6, 6, 10), C.red, { lw: 2.5, seed: 85 });
  }
  ctx.restore();
}

// ---------- effects ----------
// scuffle cloud: churning puffs with wings, feet and stars poking out
function a46fight(ctx, x, y, t, p = 1, r = 60) {
  if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 11)) * -10); ctx.scale(k, k);
  for (let i = 0; i < 4; i++) { const a = t * 7 + i * 1.7; ctx.save(); ctx.rotate(a); seg(ctx, r * 0.6, 0, r * 1.15, 6, 10, i % 2 ? '#a8741a' : '#c98a3a', 3); ctx.restore(); }
  for (let i = 0; i < 2; i++) { const a = -t * 6 + i * 3; ctx.save(); ctx.rotate(a); seg(ctx, r * 0.7, 0, r * 1.05, 0, 3.5, '#c9a27a', 1.5); seg(ctx, r * 1.05, 0, r * 1.15, -6, 3, '#c9a27a', 1); seg(ctx, r * 1.05, 0, r * 1.15, 6, 3, '#c9a27a', 1); ctx.restore(); }
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + t * 3, rr = r * (0.55 + 0.12 * Math.sin(t * 13 + i)); shape(ctx, ell(Math.cos(a) * rr * 0.7, Math.sin(a) * rr * 0.55, r * 0.42, r * 0.38, 14), C.white, { lw: 5, seed: 130 + i }); }
  shape(ctx, ell(0, 0, r * 0.7, r * 0.55, 20), C.white, { lw: 0 });
  for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1; star(ctx, Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.35, 11, C.yellow, a); }
  ctx.restore();
}
// a small loose feather drifting from a to b between t0 and t1
function a46featherFall(ctx, t, t0, t1, a, b, s = 1, col = '#c98a3a') {
  if (t < t0 || t > t1 + 0.5) return; const u = K.clamp((t - t0) / (t1 - t0)), x = K.lerp(a[0], b[0], u) + 18 * Math.sin(u * Math.PI * 3) * (1 - u * 0.5), y = K.lerp(a[1], b[1], u);
  ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - t1) / 0.5); ctx.translate(x, y); ctx.rotate(0.6 * Math.sin(u * Math.PI * 3)); ctx.scale(s, s);
  shape(ctx, [[0, -14], [6, -4], [4, 10], [0, 14], [-4, 10], [-6, -4]], col, { lw: 2.5, seed: 140 }); seg(ctx, 0, -12, 0, 16, 1.5, C.black, 0); ctx.restore();
}
// picture balloon (speech bubble with a drawing inside)
function a46picBalloon(ctx, cx, cy, w, h, tx, ty, p, inside) {
  if (p <= 0) return; bubble(ctx, cx, cy, w, h, tx, ty, p, ''); const k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0.2 || !inside) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); inside(ctx); ctx.restore();
}
// dream wash: sepia multiply + soft vignette over the flashback (screen units of the panel, 1000 x 1230)
function a46dream(ctx, a) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = 0.16 * a; ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#f2c98a'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
  ctx.save(); ctx.globalAlpha = a; const g = ctx.createRadialGradient(500, 615, 470, 500, 615, 800); g.addColorStop(0, 'rgba(251,242,218,0)'); g.addColorStop(1, 'rgba(251,242,218,0.75)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
}
// iris: a black disc closing to (cx, cy) by tc and opening after (screen units), d seconds each side
function a46iris(ctx, t, tc, cx, cy, d = 0.35, o = {}) {
  const dt = t - tc; if (Math.abs(dt) > d) return; const r = Math.abs(dt) / d * 900;
  const ix = o.after && dt > 0 ? o.after[0] : cx, iy = o.after && dt > 0 ? o.after[1] : cy; ctx.save(); ctx.beginPath(); ctx.rect(-20, -20, 1040, 1270); ctx.moveTo(ix + Math.max(0.1, r), iy); ctx.arc(ix, iy, Math.max(0.1, r), 0, Math.PI * 2, true); ctx.fillStyle = C.black; ctx.fill('evenodd'); ctx.restore();
}
// slanted yellow halftone wipe band (screen units), p 0..1 over its duration
function a46wipe(ctx, p) {
  if (p <= 0 || p >= 1) return; const x = K.lerp(-500, 1500, K.ease.inOut(p)), sl = 260;
  const poly = [[x - 220 + sl, -20], [x + 220 + sl, -20], [x + 220, 1250], [x - 220, 1250]];
  ctx.save(); K.poly(ctx, poly, true); ctx.fillStyle = C.yellow; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 13, 0.3); ctx.fillRect(-100, -100, 1300, 1500); ctx.restore();
  ctx.save(); K.poly(ctx, poly, true); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore();
}
// red X stamp
function a46X(ctx, x, y, r, p) { if (p <= 0) return; const k = K.ease.back(K.clamp(p * 1.6)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(-0.08);
  for (const sd of [-1, 1]) { ctx.lineCap = 'round'; ctx.lineWidth = r * 0.36; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-r, -r * sd); ctx.lineTo(r, r * sd); ctx.stroke(); ctx.lineWidth = r * 0.22; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); }
function a46tick(ctx, x, y, r, p) { if (p <= 0) return; const k = K.ease.back(K.clamp(p * 1.6)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(-r * 0.3, r * 0.7); ctx.lineTo(r, -r * 0.8); ctx.lineWidth = r * 0.36; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = r * 0.22; ctx.strokeStyle = '#3f9d4a'; ctx.stroke(); ctx.restore(); }
// dotted path (flight trail) drawn on up to fraction p
function a46dots(ctx, pts, p, col = C.black, r = 5) { const q = K.trim(pts, K.clamp(p)); if (q.length < 2) return; const L = K.pathLen(q); for (let d = 0; d < L; d += 22) { const u = d / K.pathLen(pts); const pt = K.trim(pts, u); const e = pt[pt.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], r, 0, 7); ctx.fillStyle = col; ctx.fill(); } }
// comic lettering word (sfx) in world units with pop
function a46word(ctx, text, x, y, size, p, o = {}) { if (p <= 0) return; sfx(ctx, text, x, y, size, K.clamp(p), o); }

// ---------- v2: the minister's badge, drawn over the Library sparrow at about a quarter of his height ----------
// a46medal: medal centre (x, y), the two ribbon tails above it; k scale (1 = on a sparrow of s 1), limp 0..1 (lying in the dust)
function a46medal(ctx, x, y, k = 1, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const lp = K.clamp(o.limp || 0);
  shape(ctx, [[-5, -6], [-11 - lp * 7, -21 + lp * 12], [-3 - lp * 5, -22 + lp * 12], [1, -8]], C.blue, { lw: 2.5, seed: 44 });
  shape(ctx, [[5, -6], [11 + lp * 7, -21 + lp * 12], [3 + lp * 5, -22 + lp * 12], [-1, -8]], C.red, { lw: 2.5, seed: 45 });
  shape(ctx, ell(0, 0, 9.5, 9.5, 16), C.yellow, { lw: 3, seed: 46, dot: '#ff9a2a', pitch: 4, rad: 0.2, da: 0.5 }); star(ctx, 0, 0, 5.5, C.red);
  ctx.restore();
}
const A46_CHEST = [17, -25];   // medal centre in sparrow-local units
// the transform the acting wrapper + Library sparrow apply (feet at x, y)
function a46spXf(ctx, P) { const s = P.s || 1, dir = P.dir ?? 1, sq = P.sq ?? 1, tip = P.tip || 0;
  ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip * Math.sign(dir || 1)); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq);
  ctx.translate(P.shake || 0, 0); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s); }
const a46chest = (P) => { const s = P.s || 1, dir = P.dir ?? 1; return [P.x + dir * s * A46_CHEST[0], P.y + s * A46_CHEST[1] * (P.sq ?? 1)]; };
// every bird of this film goes through a46bird: badge (large), cover (0..1 the wing pressed over the badge), glint (0..1), tint (canvas filter)
function a46bird(ctx, P) {
  const badge = P.kind === 'sparrow' && P.badge && !P.silhouette;
  if (P.tint) { ctx.save(); ctx.filter = P.tint; }
  bird(ctx, badge || P.tint ? { ...P, badge: false } : P);
  if (P.tint) ctx.restore();
  if (!badge) return;
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha; a46spXf(ctx, P);
  a46medal(ctx, A46_CHEST[0], A46_CHEST[1], 1.15, P.fly ? 0.25 * (P.flap || 0) : 0);
  const cv = K.clamp(P.cover || 0);
  if (cv > 0.02) { const pal = SPARROW_PAL[P.pal || 0] || SPARROW_PAL[0]; ctx.save(); ctx.translate(-4, -40); ctx.rotate(K.lerp(-0.6, 0.62, cv)); shape(ctx, ell(14, 0, 27, 11, 16), pal.wing, { lw: 4, seed: 6 });
    for (const sx of [2, 12, 22]) seg(ctx, sx, -4, sx - 5, 7, 3, pal.streak, 0); ctx.restore(); }
  ctx.restore();
  if (P.glint > 0 && P.glint < 1) { const c = a46chest(P); a46glint(ctx, c[0] + 4, c[1] - 4, 24 * (P.s || 1), P.glint); }
}
// the person drawn again over the bush from the belt up (waist-deep in the bush)
function a46upper(ctx, P, beltY, draw) { ctx.save(); ctx.beginPath(); ctx.rect(-3000, -3000, 9000, beltY + 3000); ctx.clip(); draw(ctx, P); ctx.restore(); }
// the absent friend: a dashed sparrow outline (feet at x, y, facing dir)
function a46ghostSp(ctx, x, y, s, dir, a) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(dir * s, s); ctx.setLineDash([7, 6]); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.fillStyle = 'rgba(255,250,240,0.35)';
  for (const p of [ell(0, -32, 31, 24, 22), ell(24, -54, 18, 17, 18), [[-22, -38], [-52, -58], [-56, -46], [-24, -28]]]) { K.poly(ctx, p, true); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}
