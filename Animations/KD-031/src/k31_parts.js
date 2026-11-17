// ===== KD-031 The Pair of Hoopoes and the Treasure: parts (maths, person geometry, hoopoe, cage, jar, coins, net, effects) =====
// World 1000 x 1230, ground / floor y 900. Every frame is a pure function of t. Story names are prefixed K31 / k31.
const K31W = 1000, K31H = 1230, K31GR = 900, K31DUR = 174.32;   // narration 171.322 + 3.0 s THE END hold (plan)
const K31CLAY = '#c8642a', K31CLAYD = '#7a3410', K31GOLDD = '#c98a0a', K31SOIL = '#7a4212', K31SOILD = '#4a2408';

// ---------- small maths ----------
const k31e = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const k31in = (t, a, b) => t >= a && t < b;
const k31lp = (a, b, f) => (Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], f)) : K.lerp(a, b, f));
// eased holds between keys [[t, value or [x, y]], ...]
function k31kv(t, keys, e = 'inOut') {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, a] = keys[i - 1], [t1, b] = keys[i]; return k31lp(a, b, K.ease[e](K.clamp((t - t0) / Math.max(1e-6, t1 - t0)))); }
  return keys[keys.length - 1][1];
}
const k31tap = (t, list, d = 0.22) => { let v = 0; for (const a of list) if (t >= a && t < a + d) v = Math.max(v, Math.sin(Math.PI * (t - a) / d)); return v; };
const k31sac = (t, list) => { let g = list[0][1]; for (const [a, v] of list) if (t >= a) g = v; return g; };   // 2-frame snaps: hold, then jump
const k31fade = (t, a, b, d = 0.25) => K.clamp((t - a) / d) * (1 - K.clamp((t - (b - d)) / d));
const k31blinkAt = (t, list, d = 0.18) => k31tap(t, list, d);   // hand-placed blinks
const k31long = (t, a, d = 0.5) => (t > a && t < a + d ? Math.sin(Math.PI * (t - a) / d) : 0);   // long, warm blink

// ---------- person geometry (mirrors cast/people.js personCostumed) ----------
function k31age(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function k31off(P) {
  const sit = P.sit || 0, kn = P.kneel || 0, sh = P.seat === 'floor' ? [0, -24] : [-22, -52];
  let h = [K.lerp(0, sh[0], sit), K.lerp(-75, sh[1], sit)]; h = [K.lerp(h[0], -4, kn), K.lerp(h[1], -48, kn)]; return [h[0], h[1] + 75];
}
// upper-body local point (feet at 0,0, +x = facing side) -> world, including lean, the acting tip and squash about the feet
function k31L2W(P, q) {
  const s = P.s || 1, dir = P.dir || 1, off = k31off(P), le = (P.lean || 0) + k31age(P) * 0.12, c = Math.cos(le), n = Math.sin(le), y0 = q[1] + 75;
  let wx = dir * s * (q[0] * c - y0 * n + off[0]), wy = s * (q[0] * n + y0 * c - 75 + off[1]);
  const sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir); wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  return [P.x + wx * Math.cos(tip) - wy * Math.sin(tip), P.y + wx * Math.sin(tip) + wy * Math.cos(tip)];
}
function k31W2L(P, w) {
  const s = P.s || 1, dir = P.dir || 1, off = k31off(P), le = (P.lean || 0) + k31age(P) * 0.12, c = Math.cos(le), n = Math.sin(le);
  const sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir), dx = w[0] - P.x, dy = w[1] - P.y;
  let wx = dx * Math.cos(-tip) - dy * Math.sin(-tip), wy = dx * Math.sin(-tip) + dy * Math.cos(-tip); wx /= 1 + (1 - sq) * 0.7; wy /= sq;
  const a = wx / (dir * s) - off[0], b = wy / s + 75 - off[1];
  return [a * c + b * n, -a * n + b * c - 75];
}
// where a hand really ends up (arm 74 long, clamped like armTo) for a body-local target; side -1 = L, 1 = R
function k31hand(P, side, q) {
  const sx = side * 31, sy = -132, dx = q[0] - sx, dy = q[1] - sy, d = Math.hypot(dx, dy), k = d > 73.5 ? 73.5 / d : 1;
  return k31L2W(P, [sx + dx * k, sy + dy * k]);
}
const k31hdY = (P) => -195 + (P.drop || 0) + k31age(P) * 6 - (P.child ? 9 : 0);
const k31head = (P) => k31L2W(P, [(P.look || 0) * 4, k31hdY(P)]);
// transform into head-local space (head centre at 0,0, figure units) for overlays (hunter feather, stubble, wet cheeks)
function k31headXf(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir), hx = (P.look || 0) * 4, hy = k31hdY(P);
  ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.scale(dir * s, s);
  const off = k31off(P), le = (P.lean || 0) + k31age(P) * 0.12; ctx.translate(off[0], off[1]); ctx.translate(0, -75); ctx.rotate(le); ctx.translate(0, 75);
  ctx.translate(hx, hy); ctx.rotate(P.tilt || 0);
}

// ---------- the people ----------
const K31MAN = { costume: 'servant', pal: { hc: C.blue, dot: '#9fc0ff', sash: C.yellow }, s: 1, seed: 11 };
const K31RICH = { costume: 'merchant', pal: { robe: C.red, dot: '#a8160f', sleeve: C.red, hc: C.yellow, hd: C.red, sash: C.yellow, trim: C.yellow }, s: 1, seed: 23 };
const K31HUNT = { costume: 'beanSeller', pal: { robe: '#8a5a22', dot: '#5b3a1e', sleeve: C.white, apron: false, hc: '#6e4418', hd: '#3a2410', shoes: 'bare', pants: CREAM }, age: 0.35, s: 1, seed: 37 };
const K31HUNT2 = { costume: 'beanSeller', pal: { robe: NAVY, dot: '#2a4fae', sleeve: C.white, apron: false, hc: C.red, hd: '#a8160f', shoes: 'bare', pants: CREAM }, age: 0.3, s: 1, seed: 41 };
const K31KING = { costume: 'caliph', s: 1, seed: 53 };
const k31man = (o) => ({ ...K31MAN, y: K31GR, dir: 1, brow: -0.2, mouth: 'smile', ...o });
// the hunter: the beanSeller body recoloured, plus a hoopoe feather on the cap, stubble and a folded net on the shoulder (o.net)
function k31hunter(ctx, P, o = {}) {
  person(ctx, P);
  ctx.save(); k31headXf(ctx, P);
  ctx.save(); ctx.rotate(-0.5); shape(ctx, [[-14, -40], [-30, -92], [-20, -96], [-6, -44]], K31HP[0].body, { lw: 3.5, seed: 61 }); shape(ctx, [[-30, -92], [-34, -104], [-24, -106], [-20, -96]], C.black, { lw: 2.5, seed: 62 }); ctx.restore();
  ctx.fillStyle = '#3a2410'; const r = K.rng(5); for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(-18 + r() * 36, 18 + r() * 14, 1.8, 0, 7); ctx.fill(); }
  ctx.restore();
  if (o.net !== false) { const a = k31L2W(P, [-42, -126]); k31netBlob(ctx, a[0], a[1], 17 * (P.s || 1), 30 * (P.s || 1)); }
}

// ---------- the hoopoe: a new bird kind (k31hoopoe, acting-wrapped). Side view, feet at (x, y), facing dir. ----------
// P: {x, y, s, dir, pal (0 cinnamon male, 1 pale peach female, 8 % smaller), crest (0 folded back .. 1 fanned), beak (0..1.3 open), drop (head),
//     headRot, sag (wing; < 0 lifted), tailDrop, fly, flap (-1..1), rot, ph, amp (walk), scratch (0..1 near foot to the head), cover (0..1 wing over the eyes),
//     eyes, brow, silhouette} + the shared acting fields (gaze, lid, wet, sq, tip, alpha)
const K31HP = [
  { body: '#e8893a', dot: '#b5501a', belly: '#f6c98a', legs: '#5b3a1e' },
  { body: '#f4b878', dot: '#d08a4a', belly: '#fde6c4', legs: '#6e4418', small: 0.92 },
];
function k31hwing(ctx, pts, ang, sil, o) {   // barred black and white wing, polygon along +x, rotated by ang about (o.x, o.y)
  ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(ang); K.poly(ctx, pts, true); ctx.fillStyle = C.black; ctx.fill();
  if (!sil) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = C.white; for (const bx of o.bars) ctx.fillRect(bx, -40, 6, 80); ctx.restore(); }
  ink(ctx, pts, o.lw || 4, o.seed || 4); ctx.restore();
}
function k31hoopoeRaw(ctx, P) {
  const pal = K31HP[P.pal || 0] || K31HP[0], s = (P.s || 1) * (pal.small || 1), dir = P.dir ?? 1, sil = !!P.silhouette, col = (c) => (sil ? C.black : c), fl = P.flap ?? 0;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const wingPts = [[0, -11], [38, -17], [74, -12], [90, 0], [74, 11], [38, 15], [0, 11]];
  if (P.fly) k31hwing(ctx, wingPts, Math.PI + 1.2 * fl * 0.85 + 0.18, sil, { x: -2, y: -42, bars: [24, 44, 62], seed: 2 });
  // legs (walk phase, or the near foot scratching the head)
  if (!P.fly) { const ph = (P.ph || 0), amp = P.amp || 0;
    [[-5, 0], [5, Math.PI]].forEach(([hx, o2], i) => { const sw = Math.sin(ph + o2) * amp, fx = hx + 9 * sw, lift = Math.max(0, Math.cos(ph + o2)) * 7 * amp;
      let ft = [fx, -lift]; if (i === 1 && P.scratch > 0) ft = k31lp(ft, [30, -62 + (P.drop || 0) + (P.scratchJ || 0)], P.scratch);
      seg(ctx, hx, -14, ft[0], ft[1], 3.5, col(pal.legs), 2); seg(ctx, ft[0], ft[1], ft[0] + 9, ft[1] + 1, 3, col(pal.legs), 1.5); seg(ctx, ft[0], ft[1], ft[0] - 6, ft[1] + 1, 3, col(pal.legs), 1.5); }); }
  // tail: long, black with a white band
  { const td = P.tailDrop || 0; ctx.save(); ctx.translate(-24, -34); ctx.rotate(-0.45 * td + (P.fly ? 0.15 : 0)); ctx.translate(24, 34);
    const tp = [[-22, -38], [-66, -54], [-70, -40], [-24, -27]]; K.poly(ctx, tp, true); ctx.fillStyle = C.black; ctx.fill();
    if (!sil) { ctx.save(); K.poly(ctx, tp, true); ctx.clip(); ctx.fillStyle = C.white; ctx.save(); ctx.translate(-50, -44); ctx.rotate(0.35); ctx.fillRect(-4, -20, 8, 40); ctx.restore(); ctx.restore(); }
    ink(ctx, tp, 4, 3); ctx.restore(); }
  const body = ell(0, -32, 29, 22, 22);
  shape(ctx, body, col(pal.body), sil ? { lw: 5 } : { lw: 5, seed: 5, dot: pal.dot, pitch: 7, rad: 0.14, da: 0.4 });
  if (!sil) shape(ctx, ell(9, -25, 18, 12, 16), pal.belly, { lw: 0 });
  const hx = 23, hy = -53 + (P.drop || 0), hr = P.headRot || 0, cover = K.clamp(P.cover || 0);
  const foldWing = () => { ctx.save(); ctx.translate(-4, -40); ctx.rotate(-0.2 + (P.sag || 0) * 0.9 - cover * 2.2); ctx.translate(cover * 6, 0);
    const w = ell(-6, 3, 25, 11, 16); K.poly(ctx, w, true); ctx.fillStyle = C.black; ctx.fill();
    if (!sil) { ctx.save(); K.poly(ctx, w, true); ctx.clip(); ctx.fillStyle = C.white; for (const bx of [-22, -12, -2]) ctx.fillRect(bx, -14, 5, 30); ctx.restore(); }
    ink(ctx, w, 4, 6); ctx.restore(); };
  if (P.fly) k31hwing(ctx, wingPts, Math.PI + 1.27 * fl, sil, { x: -4, y: -40, bars: [22, 42, 60], seed: 4 });
  else if (cover < 0.4) foldWing();
  // head with the fan crest (behind the head), the long curved beak and the eye
  ctx.save(); if (hr) { ctx.translate(hx - 10, hy + 12); ctx.rotate(hr); ctx.translate(-(hx - 10), -(hy + 12)); }
  { const cr = K.clamp(P.crest || 0, 0, 1.25), N = 7, cx = hx - 4, cy = hy - 12;
    for (let i = 0; i < N; i++) { const u = i / (N - 1), a = K.lerp(-Math.PI + 0.12 + u * 0.22, -Math.PI + 0.3 + u * (Math.PI - 0.75), Math.min(1, cr)) - (cr > 1 ? (cr - 1) * 0.4 * (u - 0.5) : 0),
        L = K.lerp(24 - u * 4, 30 - Math.abs(u - 0.55) * 8, Math.min(1, cr)), ca = Math.cos(a), sa = Math.sin(a), nx = -sa, ny = ca, w = 4.2;
      const p0 = [cx - nx * w, cy - ny * w], p1 = [cx + ca * L - nx * w * 0.7, cy + sa * L - ny * w * 0.7], p2 = [cx + ca * (L + 6), cy + sa * (L + 6)], p3 = [cx + ca * L + nx * w * 0.7, cy + sa * L + ny * w * 0.7], p4 = [cx + nx * w, cy + ny * w];
      shape(ctx, [p0, p1, p2, p3, p4], col(pal.body), { lw: 2.5, seed: 70 + i });
      if (!sil) { const q = (f) => [cx + ca * L * f, cy + sa * L * f]; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(...q(0.74)); ctx.lineTo(...q(0.84)); ctx.stroke();
        ctx.strokeStyle = C.black; ctx.lineWidth = 6.5; ctx.beginPath(); ctx.moveTo(...q(0.88)); ctx.lineTo(cx + ca * (L + 4), cy + sa * (L + 4)); ctx.stroke(); ctx.restore(); } } }
  const hp = ell(hx, hy, 17, 16, 18);
  shape(ctx, hp, col(pal.body), sil ? { lw: 4.5 } : { lw: 4.5, seed: 7, dot: pal.dot, pitch: 7, rad: 0.12, da: 0.35 });
  { const ob = K.clamp(P.beak ?? P.talk ?? 0, 0, 1.4), bx = hx + 13, by = hy - 2;   // upper mandible: a long thin down-curved beak; lower opens
    const up = [[bx, by - 4], [bx + 20, by - 3], [bx + 36, by + 4], [bx + 44, by + 12], [bx + 38, by + 8], [bx + 20, by + 3], [bx, by + 2]];
    if (ob > 0.05) { ctx.save(); ctx.translate(bx, by + 2); ctx.rotate(0.32 * ob); shape(ctx, [[0, 0], [18, 2], [33, 8], [18, 6], [0, 4]], col(C.black), { lw: 2.5, seed: 9 }); ctx.restore(); }
    shape(ctx, up, col(C.black), { lw: 2.5, seed: 8 }); }
  if (!sil) { eyeAt(ctx, hx + 4, hy - 4, P.eyes || 'open', 0.8);
    if (P.brow) { ctx.save(); ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 6, hy - 17 - P.brow * 2); ctx.lineTo(hx + 11, hy - 12 + P.brow * 5); ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  if (!P.fly && cover >= 0.4) {   // the wing raised across the eyes, drawn in front of the head (v2: a clear barred wing over the face)
    const k = K.clamp((cover - 0.4) / 0.6); ctx.save(); ctx.translate(K.lerp(-4, hx + 6, k), K.lerp(-40, hy - 2, k)); ctx.rotate(K.lerp(-1.2, -0.35, k));
    const w = ell(-4, 0, 30, 13, 16); K.poly(ctx, w, true); ctx.fillStyle = C.black; ctx.fill(); if (!sil) { ctx.save(); K.poly(ctx, w, true); ctx.clip(); ctx.fillStyle = C.white; for (const bx of [-22, -10, 2]) ctx.fillRect(bx, -16, 5, 32); ctx.restore(); }
    ink(ctx, w, 4, 6); ctx.restore(); }
  ctx.restore();
}
const k31hoopoe = acting(k31hoopoeRaw, (P) => (K31HP[P.pal || 0] || K31HP[0]).body);
// head point of a hoopoe in world space (for gaze and lettering)
const k31hHead = (B) => { const s = (B.s || 1) * ((K31HP[B.pal || 0] || {}).small || 1); return [B.x + (B.dir ?? 1) * 23 * s, B.y + (-53 + (B.drop || 0)) * s]; };

// ---------- flight: a path of keys [[t, x, y], ...]; weak = sagging arcs and frantic flaps, strong = level arcs and even flaps ----------
function k31flight(t, keys, mood = 'weak') {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], flap: 0, rot: 0, fly: false };
  const last = keys[keys.length - 1]; if (t >= last[0]) return { x: last[1], y: last[2], flap: 0, rot: 0, fly: false };
  let i = 1; while (keys[i][0] < t) i++;
  const [t0, x0, y0] = keys[i - 1], [t1, x1, y1] = keys[i], u = K.clamp((t - t0) / (t1 - t0)), weak = mood === 'weak';
  const sagA = weak ? 46 : -26, arc = Math.sin(Math.PI * u) * sagA * (Math.abs(x1 - x0) + Math.abs(y1 - y0) > 30 ? 1 : 0.2);
  const x = K.lerp(x0, x1, K.ease.inOut(u)), y = K.lerp(y0, y1, weak ? u * u * (3 - 2 * u) : u) + arc;
  const hz = weak ? (u > 0.35 && u < 0.75 ? 15 : 10) : 6.5;
  return { x, y, flap: Math.sin(t * 2 * Math.PI * hz), rot: weak ? -0.25 + 0.2 * Math.sin(t * 9) : -0.08 * Math.sign(y1 - y0 + 0.01), fly: true, dir: x1 >= x0 ? 1 : -1 };
}

// ---------- the bird cage: domed wire cage, base centre (x, y), 170 x 200 at s 1. part 'back' (floor, back bars, dish) | 'front' (bars, hoops, door, ring) ----------
function k31cage(ctx, x, y, s, part, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  const W = 85, top = -196, sh = -128, bars = [-78, -52, -26, 0, 26, 52, 78], door = K.clamp(o.door || 0, 0, 1.9);
  const bar = (bx, w, colr) => { ctx.beginPath(); ctx.moveTo(bx, -14); ctx.lineTo(bx, sh); ctx.quadraticCurveTo(bx, top, 0, top); ctx.lineWidth = w; ctx.strokeStyle = colr; ctx.stroke(); };
  ctx.lineCap = 'round';
  if (part === 'back') {
    ctx.save(); ctx.globalAlpha *= 0.55; for (const bx of bars) bar(bx * 0.9 + 9, 3, '#3a3a4a'); ctx.restore();
    ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#3a3a4a'; for (const hy of [-60, sh]) { ctx.beginPath(); ctx.ellipse(0, hy, W, 9, 0, Math.PI, 2 * Math.PI); ctx.stroke(); } ctx.restore();
    shape(ctx, [[-W - 6, 0], [W + 6, 0], [W + 2, -16], [-W - 2, -16]], WOOD, { lw: 4.5, seed: 81, dot: '#7a4e12', pitch: 7, rad: 0.2, da: 0.5 });
    shape(ctx, [[30, -16], [62, -16], [56, -28], [36, -28]], C.blue, { lw: 3, seed: 82 });
    seg(ctx, -W + 4, -66, W - 4, -66, 7, WOOD, 3);
    if (o.seeds) { ctx.fillStyle = SANDL; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(39 + i * 4, -29 - (i % 2) * 2, 2.2, 0, 7); ctx.fill(); } }
  } else {
    const dx0 = -30, dx1 = 30, dTop = -104, open = door > 0.05;
    for (const bx of bars) { if (open && bx > dx0 && bx < dx1) { ctx.beginPath(); ctx.moveTo(bx, dTop); ctx.lineTo(bx, sh); ctx.quadraticCurveTo(bx, top, 0, top); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 2.2; ctx.strokeStyle = STONE2; ctx.stroke(); continue; }
      bar(bx, 5, C.black); bar(bx, 2.2, STONE2); }
    ctx.lineWidth = 7; ctx.strokeStyle = C.black; for (const hy of [-60, sh]) { ctx.beginPath(); ctx.ellipse(0, hy, W, 9, 0, 0, Math.PI); ctx.stroke(); }
    ctx.lineWidth = 3.5; ctx.strokeStyle = C.yellow; for (const hy of [-60, sh]) { ctx.beginPath(); ctx.ellipse(0, hy, W, 9, 0, 0, Math.PI); ctx.stroke(); }
    // door frame and leaf (hinged on the left edge; the leaf narrows as it swings toward us, then flips to the left)
    ctx.save(); if (o.hingeR) ctx.scale(-1, 1);   // v2: door hinged on the right edge (swings away from a figure on the left)
    const lw = (dx1 - dx0) * Math.cos(door), lx1 = dx0 + lw;
    ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.strokeRect(dx0, dTop, dx1 - dx0, -14 - dTop); ctx.restore();
    if (Math.abs(lw) > 1.5) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(dx0, -16); ctx.lineTo(lx1, -16 - 6 * Math.sin(door)); ctx.lineTo(lx1, dTop - 6 * Math.sin(door)); ctx.lineTo(dx0, dTop); ctx.closePath(); ctx.stroke();
      ctx.lineWidth = 3; ctx.strokeStyle = C.yellow; ctx.stroke(); for (const f of [0.33, 0.66]) { const bx = dx0 + lw * f; ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(bx, -16 - 6 * Math.sin(door) * f); ctx.lineTo(bx, dTop - 6 * Math.sin(door) * f); ctx.stroke(); } ctx.restore(); }
    shape(ctx, ell(0, top - 9, 11, 11, 14), C.yellow, { lw: 4, seed: 83 }); shape(ctx, ell(0, top - 9, 4, 4, 10), C.paper, { lw: 2.5, seed: 84 });
    if (o.latch != null) shape(ctx, ell(dx1 - 4, -60, 6, 6, 10), C.red, { lw: 2.5, seed: 85 });
    ctx.restore();
  }
  ctx.restore();
}
// the bird floor inside a cage (world y of the birds' feet)
const k31cageFloor = (y, s) => y - 16 * s;
const k31cagePerch = (y, s) => y - 69 * s;   // the perch dowel inside the cage

// ---------- the clay jar: base centre (x, y), 130 x 150 at s 1 ----------
// o: {lid: true (on), fill 0..1 (coins at the mouth), cutaway 0..1 (see-through wall: the coins inside), soil 0..1, tilt, sq, glint 0..1}
function k31jar(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.tilt) ctx.rotate(o.tilt); ctx.scale(s * (1 + (1 - (o.sq ?? 1)) * 0.6), s * (o.sq ?? 1));
  const body = [[-34, 0], [-56, -30], [-66, -70], [-56, -108], [-34, -128], [-30, -140], [30, -140], [34, -128], [56, -108], [66, -70], [56, -30], [34, 0]];
  for (const sd of [-1, 1]) { ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(sd * 52, -112, 16, sd > 0 ? -1.4 : Math.PI - 1.7, sd > 0 ? 1.7 : Math.PI + 1.4); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = K31CLAY; ctx.stroke(); ctx.restore(); }
  shape(ctx, body, K31CLAY, { lw: 6, seed: 91, dot: K31CLAYD, pitch: 8, rad: 0.22, da: 0.5 });
  if ((o.cutaway || 0) > 0) { ctx.save(); K.poly(ctx, body, true); ctx.clip(); ctx.globalAlpha *= o.cutaway; ctx.fillStyle = K31SOILD; ctx.fillRect(-70, -145, 140, 150);
    ctx.fillStyle = K31GOLDD; ctx.fillRect(-70, -112, 140, 120);   // v2: a heap of round coins (overlapping discs, some tilted), not a cell pattern
    { const rg = K.rng(77); for (let i = 0; i < 46; i++) { const row = Math.floor(i / 6), cx = -52 + rg() * 104, cy = -8 - row * 13 - rg() * 8; if (cy < -112 || Math.abs(cx) > 64 - Math.abs(cy + 70) * 0.3) continue; k31coin(ctx, cx, cy, 11 + rg() * 3, { flat: 0.15 + rg() * 0.5, rot: (rg() - 0.5) * 1.2 }); } }
    ctx.restore(); ink(ctx, body, 6, 91); }
  shape(ctx, [[-36, -136], [36, -136], [38, -148], [-38, -148]], '#d97a3a', { lw: 5, seed: 92 });
  if ((o.fill || 0) > 0) { const f = o.fill; for (let k = 0; k < 9; k++) { const cx = -28 + k * 7, cy = -150 - Math.abs(Math.sin(k * 1.7)) * 14 * f - (k % 3) * 3 * f; k31coin(ctx, cx, cy, 10, { flat: 0.45 }); } }
  if (o.lid) { shape(ctx, [[-42, -146], [42, -146], [38, -160], [-38, -160]], '#b5501a', { lw: 5, seed: 93, dot: K31CLAYD, pitch: 7, rad: 0.2, da: 0.5 }); shape(ctx, ell(0, -166, 10, 8, 12), '#b5501a', { lw: 4, seed: 94 }); }
  if ((o.soil || 0) > 0) { ctx.save(); K.poly(ctx, body, true); ctx.clip(); ctx.globalAlpha *= 0.85 * o.soil; ctx.fillStyle = dotPat(ctx, K31SOILD, 9, 0.42); ctx.fillRect(-70, -95, 140, 100); ctx.restore(); }
  if ((o.glint || 0) > 0) { ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * K.clamp(o.glint)); star(ctx, K.lerp(-40, 40, o.glint), -85 + 20 * o.glint, 14, C.white); ctx.restore(); }
  ctx.restore();
}
function k31jarLid(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-42, 0], [42, 0], [38, -14], [-38, -14]], '#b5501a', { lw: 5, seed: 93, dot: K31CLAYD, pitch: 7, rad: 0.2, da: 0.5 }); shape(ctx, ell(0, -20, 10, 8, 12), '#b5501a', { lw: 4, seed: 94 }); ctx.restore(); }

// ---------- coins, bindle, broom, loaf, net, receiving hand ----------
// k31coin(ctx, x, y, r, {flat 0..1 (lying), rot, glint}): yellow disc with a black rim, an inner ring and a glint
function k31coin(ctx, x, y, r = 16, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(1, 1 - 0.65 * (o.flat || 0));
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = Math.max(2, r * 0.22); ctx.strokeStyle = C.black; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.lineWidth = Math.max(1.2, r * 0.1); ctx.strokeStyle = K31GOLDD; ctx.stroke();
  if (r > 7) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.35, r * 0.18, 0, 7); ctx.fill(); }
  ctx.restore();
}
// bindle: a stick from the hand (x0, y0) to (x1, y1) with the red dotted bundle hanging at the far end
function k31bindle(ctx, x0, y0, x1, y1, s = 1) {
  seg(ctx, x0, y0, x1, y1, 9 * s, WOOD, 3.5);
  shape(ctx, ell(x1, y1 + 22 * s, 34 * s, 30 * s, 20), C.red, { lw: 5, seed: 95, dot: C.white, pitch: 8, rad: 0.22, da: 0.6 });
  shape(ctx, [[x1 - 8 * s, y1 - 6 * s], [x1 + 10 * s, y1 - 6 * s], [x1 + 4 * s, y1 + 6 * s]], C.red, { lw: 3, seed: 96 });
}
// broom: the bristle end at (bx, by), the stick going toward (dx, dy) (unit), 210 long
function k31broom(ctx, bx, by, dx, dy) {
  const L = 210, tx = bx + dx * L, ty = by + dy * L; seg(ctx, bx + dx * 30, by + dy * 30, tx, ty, 10, WOOD, 3.5);
  ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.atan2(dy, dx) - Math.PI / 2);
  shape(ctx, [[-14, -34], [14, -34], [30, 8], [-30, 8]], C.yellow, { lw: 4.5, seed: 97, dot: '#c98a0a', pitch: 6, rad: 0.25, da: 0.5 });
  ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; for (const k of [-16, -5, 6, 17]) { ctx.beginPath(); ctx.moveTo(k * 0.5, -26); ctx.lineTo(k, 6); ctx.stroke(); }
  seg(ctx, -16, -24, 16, -24, 4, C.red, 2); ctx.restore();
}
function k31loaf(ctx, x, y, r, t) {
  shape(ctx, ell(x, y, r, r * 0.62, 24), '#d9903a', { lw: 5, seed: 98, dot: '#8a4a12', pitch: 7, rad: 0.2, da: 0.5 });
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (const k of [-0.4, 0, 0.4]) { ctx.beginPath(); ctx.moveTo(x + k * r - 8, y - r * 0.35); ctx.lineTo(x + k * r + 8, y - r * 0.05); ctx.stroke(); } ctx.restore();
  if (t != null) steam(ctx, x, y - r * 0.7, t);
}
// net mesh clipped to a closed polygon
function k31mesh(ctx, poly, pitch = 16, lw = 3, alpha = 1, colr = C.black) {
  ctx.save(); ctx.globalAlpha *= alpha; K.poly(ctx, poly, true); ctx.clip(); const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]);
  const x0 = Math.min(...xs) - 40, x1 = Math.max(...xs) + 40, y0 = Math.min(...ys) - 40, y1 = Math.max(...ys) + 40;
  ctx.lineWidth = lw; ctx.strokeStyle = colr; ctx.beginPath(); for (let k = x0 - (y1 - y0); k < x1; k += pitch) { ctx.moveTo(k, y0); ctx.lineTo(k + (y1 - y0), y1); ctx.moveTo(k + (y1 - y0), y0); ctx.lineTo(k, y1); } ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= alpha; ink(ctx, poly, lw + 1.5, 99, colr); ctx.restore();
}
function k31netBlob(ctx, x, y, rx, ry) { const p = ell(x, y, rx, ry, 18); shape(ctx, p, '#d9c08a', { lw: 4, seed: 100 }); k31mesh(ctx, p, 9, 2.2); }
// hand net: a hoop of radius r on a pole, the pole end at (x, y) pointing up along ang
function k31handNet(ctx, x, y, ang, r = 45) {
  const dx = Math.sin(ang), dy = -Math.cos(ang), hx = x + dx * 120, hy = y + dy * 120; seg(ctx, x, y, hx, hy, 8, WOOD, 3);
  const hoop = ell(hx + dx * r, hy + dy * r, r, r * 0.9, 22); k31mesh(ctx, hoop.concat([hoop[0]]), 10, 2.2); ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; K.poly(ctx, hoop, true); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = WOOD; ctx.stroke(); ctx.restore();
}
// an open receiving hand (palm up) for the charity picture
function k31palm(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  seg(ctx, -90, 40, -30, 10, 30, '#b9b4c6', 5);
  shape(ctx, [[-36, -6], [30, -14], [52, -24], [56, -12], [36, 2], [44, 4], [40, 18], [-30, 26]], C.white, { lw: 5, seed: 101, dot: C.skin, pitch: 5, rad: 0.3 });
  ctx.restore();
}

// ---------- effects ----------
// ground window: a round see-through window into the soil, centre (cx, cy), radius r; inside(ctx) draws what is buried (world units)
function k31groundWindow(ctx, cx, cy, r, t, inside, o = {}) {
  if (r <= 1) return; const shiv = o.shiver || 0, rr = r + shiv * Math.sin(t * 60) * 3;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip();
  ctx.fillStyle = K31SOIL; ctx.fillRect(cx - rr, cy - rr, 2 * rr, 2 * rr); ctx.fillStyle = dotPat(ctx, K31SOILD, 10, 0.3); ctx.fillRect(cx - rr, cy - rr, 2 * rr, 2 * rr);
  const rg = K.rng(17); for (let i = 0; i < 14; i++) { const px = cx + (rg() - 0.5) * 2 * r, py = cy + (rg() - 0.5) * 2 * r; shape(ctx, ell(px, py, 6 + rg() * 6, 4 + rg() * 4, 10), STONE, { lw: 2.5, seed: 110 + i }); }
  ctx.lineCap = 'round'; for (const [x0, y0, x1, y1] of [[cx + 40, cy - r, cx + 70, cy - r * 0.35], [cx - 10, cy - r, cx - 60, cy - r * 0.45]]) { ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2 + 20, (y0 + y1) / 2, x1, y1); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = WOOD; ctx.stroke(); }
  if (inside) inside(ctx);
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.stroke(); ctx.setLineDash([3, 9]); ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
}
// gold glow: 9 rays, a halftone disc and 3 staggered glints; p 0..1 strength
function k31goldGlow(ctx, x, y, r, t, p = 1) {
  if (p <= 0) return; ctx.save(); ctx.globalAlpha *= K.clamp(p);
  ctx.save(); ctx.globalAlpha *= 0.5; ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.42); ctx.beginPath(); ctx.arc(x, y - r * 0.2, r * 0.5, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.13 + 0.04 * Math.sin(t * 2 + i), l0 = r * 0.25, l1 = r * (0.85 + 0.15 * Math.sin(t * 3 + i * 1.3)) * p;
    const pts = [[x + Math.cos(a - 0.05) * l0, y + Math.sin(a - 0.05) * l0], [x + Math.cos(a - 0.09) * l1, y + Math.sin(a - 0.09) * l1], [x + Math.cos(a + 0.09) * l1, y + Math.sin(a + 0.09) * l1], [x + Math.cos(a + 0.05) * l0, y + Math.sin(a + 0.05) * l0]];
    shape(ctx, pts, C.yellow, { lw: 4, seed: 120 + i }); }
  [[-0.3, 0], [0.25, 0.35], [0.05, 0.7]].forEach(([dx, ph], i) => { const k = Math.sin(Math.PI * ((t * 0.9 + ph) % 1)); if (k > 0.3) star(ctx, x + dx * r, y - r * (0.35 + 0.15 * i), 12 * k, C.white); });
  ctx.restore();
}
// hunger squiggles over a belly
function k31squiggle(ctx, x, y, t, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let i = 0; i <= 10; i++) { const xx = x - 14 + i * 2.8, yy = y + k * 9 + Math.sin(i * 1.4 + t * 10 + k) * 3; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
// two fingers (a V) at a hand, figure units scaled by s
function k31twoFingers(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); for (const a of [-0.22, 0.22]) { ctx.save(); ctx.rotate(a); shape(ctx, [[-5, 0], [5, 0], [5, -30], [0, -35], [-5, -30]], C.white, { lw: 3.5, seed: 130, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); } shape(ctx, ell(0, 4, 12, 11, 12), C.white, { lw: 3.5, seed: 131, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }
// the cracked heart: two halves sliding apart (sep in units), crack drawn in by k 0..1
function k31crackHeart(ctx, x, y, r, k, sep) {
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * sep, Math.abs(sep) * 0.2); ctx.beginPath(); if (sd < 0) ctx.rect(x - r * 2, y - r * 2, r * 2, r * 4); else ctx.rect(x, y - r * 2, r * 2, r * 4); ctx.clip(); ctx.rotate(0); heart(ctx, x, y, r); ctx.restore(); }
  if (k > 0 && sep < 2) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); const pts = [[x, y - r * 0.55], [x - r * 0.15, y - r * 0.2], [x + r * 0.12, y + r * 0.05], [x - r * 0.1, y + r * 0.35], [x, y + r * 0.8]]; const n = Math.max(1, Math.round(k * (pts.length - 1))); ctx.moveTo(...pts[0]); for (let i = 1; i <= n; i++) ctx.lineTo(...pts[i]); ctx.stroke(); ctx.restore(); }
}
