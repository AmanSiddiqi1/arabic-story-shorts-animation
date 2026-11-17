// ===== KD-014 The Mouse Marries Only a Mouse: story-local drawings (proposed for the Library in ../library_proposals.md) =====
// elementFace (shared face rig for sun, cloud, wind, mountain), sunFace, cloudFace, windSpirit, mountainMassif, poofBurst,
// rankStrip, skyLight, heightMarks, scarfCloth, beadString, sandal, mouseBed, k14Mouse (rat kind mouse + tuft, bow, wave paw, broom, blush).
// Every drawing is a pure function of its arguments (seeded randomness only).
const K14_VW = 1000, K14_VH = 1230, K14_GR = 900;
const K14_ROCK = '#8c8a94', K14_ROCKD = '#5a5a6a', K14_ROCKL = '#b5b2bd', K14_HOLE = '#1d1a22';
const K14B = (t, a, d, e = 'lin') => K.beat(t, a, d, e);
const K14_win = (t, a, b) => t >= a && t < b;

// ---------- elementFace(ctx, x, y, s, F): two big eyes with per-eye lids and gaze, brows, mouth. ----------
// F: {lidL, lidR, gaze [gx, gy] or gazeL/gazeR per eye, brow (+ angry, - raised), mouth 'smile' | 'frown' | 'o' | 'grit' | 'line' | 'wobble',
//     talk 0..1, wet, skin (lid colour), spread (eye half distance, 30), eyes 'spiral' | 'wide' | 'open', t (for spirals and wobble)}
function elementFace(ctx, x, y, s, F = {}) {
  const sp = F.spread ?? 30, skin = F.skin || C.white, t = F.t || 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) {
    const ex = sd * sp, g = (sd < 0 ? F.gazeL : F.gazeR) || F.gaze || [0, 0], lid = K.clamp(sd < 0 ? (F.lidL ?? F.lid ?? 0) : (F.lidR ?? F.lid ?? 0));
    if (F.eyes === 'spiral') { shape(ctx, ell(ex, 0, 12, 14, 20), C.white, { lw: 3.5, seed: 2 }); ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let k = 0; k < 40; k++) { const a = k * 0.45 + t * 9 * sd, r = k * 0.28; ctx.lineTo(ex + Math.cos(a) * r, Math.sin(a) * r); } ctx.stroke(); ctx.restore(); }
    else eye2(ctx, ex, 0, F.eyes === 'wide' ? 'wide' : 'open', g[0], g[1], lid, skin, !!F.wet);
    const br = F.brow || 0; if (F.noBrow) continue;
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.beginPath();
    ctx.moveTo(ex - sd * 11, -22 + br * 7 - (br < 0 ? -br * 4 : 0)); ctx.lineTo(ex + sd * 11, -22 - br * 4 - (br < 0 ? -br * 7 : 0)); ctx.stroke(); ctx.restore();
  }
  const m = F.mouth || 'line', tk = K.clamp(F.talk || 0), my = 28;
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
  if (tk > 0.02 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(0, my, 14, 3 + 10 * o, 16), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(0, my + 3 + 3 * o, 8, 2 + 4 * o, 0, 0, 7); ctx.fill(); }
  else if (m === 'o') shape(ctx, ell(0, my + 2, 8, 10, 14), C.black, { lw: 3, seed: 3 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(0, my - 8, 16, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(0, my + 14, 14, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
  else if (m === 'grit') { shape(ctx, K.rectPts(-16, my - 6, 32, 13), C.white, { lw: 3.5, seed: 4 }); ctx.lineWidth = 2.5; for (const gx of [-8, 0, 8]) { ctx.beginPath(); ctx.moveTo(gx, my - 6); ctx.lineTo(gx, my + 7); ctx.stroke(); } }
  else if (m === 'wobble') { ctx.beginPath(); for (let k = 0; k <= 12; k++) { const u = k / 12; ctx.lineTo(-16 + 32 * u, my + Math.sin(u * 9 + t * 22) * 3); } ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-10, my); ctx.lineTo(10, my); ctx.stroke(); }
  if (F.blush) { ctx.fillStyle = dotPat(ctx, C.red, 5, 0.4); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * (sp + 10), 18, 12, 7, 0, 0, 7); ctx.fill(); } }
  ctx.restore(); ctx.restore();
}

// ---------- sunFace(ctx, x, y, r, t, F): the Library sun() scaled to radius r, with elementFace, rotation (head shake) and one droopy ray ----------
// F: elementFace fields + {rot, rays 0..1 (ray visibility), droop 0..1 (one ray wilts, swinging), pulse (ray length pulse)}
function sunFace(ctx, x, y, r, t, F = {}) {
  const k = r / 70, rays = F.rays ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(F.rot || 0); ctx.scale(k, k);
  if (rays > 0.01) { ctx.save(); ctx.globalAlpha *= rays; const pl = 1 + (F.pulse || 0) * 0.08; for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7 + t * 0.25 - (F.rot || 0) * 0.6; seg(ctx, Math.cos(a) * 88, Math.sin(a) * 88, Math.cos(a) * 118 * pl, Math.sin(a) * 118 * pl, 9, C.yellow, 4); } ctx.restore(); }
  shape(ctx, ell(0, 0, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 });
  if (F.droop) { const a = -Math.PI / 2 + 0.3 + F.droop * 1.1; seg(ctx, Math.cos(-1.3) * 66, Math.sin(-1.3) * 66, Math.cos(-1.3) * 66 + Math.cos(a) * 40, Math.sin(-1.3) * 66 + Math.sin(a) * 40, 9, C.yellow, 4); }
  ctx.restore();
  elementFace(ctx, x + Math.sin(F.rot || 0) * r * 0.1, y - r * 0.08, r / 62, { spread: 24, skin: C.yellow, ...F });
}

// ---------- cloudFace(ctx, x, y, s, t, F): Library cloudFlat() with a face, squash/stretch, rotation and two stubby puff arms ----------
// F: elementFace fields + {sq (1), sx (horizontal stretch), rot, arms 0..1 (paddle), sweat}
function cloudFace(ctx, x, y, s, t, F = {}) {
  const sq = F.sq ?? 1, sx = F.sx ?? (1 + (1 - sq) * 0.8);
  ctx.save(); ctx.translate(x, y); ctx.rotate(F.rot || 0); ctx.scale(sx, sq);
  if (F.arms) for (const sd of [-1, 1]) { const ph = Math.sin(t * 12 + (sd > 0 ? 1.6 : 0)) * 14 * F.arms; ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(sd * 120 * s / 1.0, 40 * s + ph, 22 * s, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
  cloudFlat(ctx, 0, 0, s);
  ctx.save(); ctx.scale(s, s); ctx.fillStyle = dotPat(ctx, '#9cb8f0', 9, 0.3); ctx.beginPath(); ctx.ellipse(4, 28, 70, 12, 0, 0, 7); ctx.fill(); ctx.restore();
  elementFace(ctx, 4 * s, 2 * s, s * 0.95, { spread: 24, ...F });
  if (F.sweat) { ctx.save(); ctx.globalAlpha *= F.sweat; shape(ctx, [[60 * s, -30 * s], [52 * s, -12 * s], [60 * s, -6 * s], [68 * s, -12 * s], [60 * s, -30 * s]], '#9cc4ff', { lw: 3 }); ctx.restore(); }
  ctx.restore();
}

// ---------- windSpirit(ctx, x, y, s, t, W): five tapering brush bands trailing from a swirl head with a face ----------
// W: {dir (1 = blows toward +x, bands trail behind), coil 0..1 (bands wind tight, wind-up), blow 0..1 (cheeks full, bands stretched),
//     flat 0..1 (pancake against a wall on the +dir side), limp 0..1 (bands droop down), stretch (1), rot, alpha} + elementFace fields
function windSpirit(ctx, x, y, s, t, W = {}) {
  const dir = W.dir ?? 1, coil = K.clamp(W.coil || 0), flat = K.clamp(W.flat || 0), limp = K.clamp(W.limp || 0), st = (W.stretch ?? 1) * (1 + 0.25 * (W.blow || 0));
  ctx.save(); ctx.translate(x, y); if (W.alpha != null) ctx.globalAlpha *= W.alpha; ctx.rotate(W.rot || 0); ctx.scale(dir * s, s);
  if (flat > 0) ctx.scale(1 - 0.55 * flat, 1 + 0.35 * flat);
  const cols = [C.white, '#cfe0ff', C.white, '#9cc4ff', C.white];
  for (let i = 0; i < 5; i++) {
    const L = (150 + 40 * Math.sin(i * 2.1)) * st * (1 - 0.45 * coil), off = (i - 2) * 22, pts = [];
    for (let k = 0; k <= 16; k++) { const u = k / 16, wob = Math.sin(u * 7 - t * 9 + i * 1.3) * 10 * u * (1 - limp * 0.6);
      let px = -40 - u * L, py = off * (1 - 0.4 * u) + wob + limp * u * u * 90;
      if (coil > 0) { const a = u * Math.PI * 1.6 * coil + i * 0.4, rr = 50 + off * 0.6 + 40 * (1 - u); px = K.lerp(px, -Math.cos(a) * rr, coil * u); py = K.lerp(py, Math.sin(a) * rr * 0.8, coil * u); }
      pts.push([px, py]); }
    const Lp = [], Rp = []; pts.forEach((p, k) => { const a = pts[Math.max(0, k - 1)], b = pts[Math.min(16, k + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, hw = 9 * (1 - k / 17) + 1.5; Lp.push([p[0] - dy / l * hw, p[1] + dx / l * hw]); Rp.push([p[0] + dy / l * hw, p[1] - dx / l * hw]); });
    shape(ctx, [...Lp, ...Rp.reverse()], cols[i], { lw: 4.5, seed: 80 + i });
  }
  // swirl head
  const hr = 58 * (1 + 0.12 * (W.blow || 0));
  shape(ctx, ell(0, 0, hr, hr * 0.92, 32), C.white, { lw: 6, seed: 86, dot: '#9cc4ff', pitch: 8, rad: 0.25, da: 0.6 });
  ctx.save(); ctx.strokeStyle = '#5f8fe0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k < 30; k++) { const a = k * 0.32 + 2.2, r = hr * 0.95 - k * 1.2; ctx.lineTo(-Math.cos(a) * r, Math.sin(a) * r * 0.9); } ctx.stroke(); ctx.restore();
  if (W.blow) { ctx.fillStyle = dotPat(ctx, C.red, 5, 0.4); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(10 + sd * 26, 26, 16 * W.blow, 11 * W.blow, 0, 0, 7); ctx.fill(); } }
  ctx.restore();
  ctx.save(); ctx.translate(x, y); if (W.alpha != null) ctx.globalAlpha *= W.alpha; ctx.rotate(W.rot || 0); if (flat > 0) ctx.scale(1 - 0.45 * flat, 1 + 0.3 * flat);
  elementFace(ctx, 8 * dir * s, -6 * s, s * 0.95, { spread: 20, mouth: W.blow > 0.3 ? 'o' : W.mouth, ...W, ...(W.blow > 0.3 ? { mouth: 'o' } : {}) });
  ctx.restore();
}

// ---------- mountainMassif(ctx, t, M): the mountain seen from its foot (base x 60..1060, peak (600, 120), ground 900) ----------
// M: {lidL, lidR, gazeL, gazeR, gaze, brow, mouth 'smile' | 'line' | 'wobble' | 'frown', talk, holeA 1 (open) | 'plug', holeB 0..1, lit 0..1 (warm light in hole A), sleep}
const K14_MTN = [[40, 908], [150, 720], [250, 610], [330, 470], [420, 360], [500, 230], [560, 160], [600, 118], [650, 170], [700, 230], [770, 330], [850, 450], [930, 600], [1000, 720], [1080, 908]];
const K14_HOLE_A = [700, 885], K14_HOLE_B = [636, 882];
function mountainMassif(ctx, t, M = {}) {
  ctx.drawImage(bake('k14mtn', 1220, 1000, (x) => { x.translate(110, 0);
    shape(x, K14_MTN, K14_ROCK, { lw: 9, seed: 140, dot: K14_ROCKD, pitch: 11, rad: 0.24, da: 0.5 });
    shape(x, [[500, 230], [560, 160], [600, 118], [650, 170], [700, 230], [672, 252], [640, 222], [606, 262], [574, 226], [540, 258], [500, 230]], C.white, { lw: 6, seed: 141, dot: '#9cb8f0', pitch: 8, rad: 0.2, da: 0.5 });
    x.save(); x.lineCap = 'round'; x.strokeStyle = C.black; x.lineWidth = 4;
    for (const L of [[[300, 640], [340, 700], [330, 760]], [[880, 640], [850, 700], [870, 780]], [[420, 470], [450, 500]], [[780, 440], [760, 480]], [[230, 780], [270, 820]], [[960, 790], [930, 830]]]) { x.beginPath(); L.forEach((p, i) => (i ? x.lineTo(...p) : x.moveTo(...p))); x.stroke(); }
    x.restore();
    shape(x, [[200, 905], [300, 860], [420, 880], [520, 862], [640, 890], [760, 866], [900, 884], [1000, 870], [1060, 905]], K14_ROCKD, { lw: 6, seed: 142 });
  }), -110, 0, 1220, 1000);
  // face: two ledge eyes and a crack mouth
  const eyeP = [[520, 380], [700, 380]];
  eyeP.forEach(([ex, ey], i) => {
    const lid = K.clamp(i ? (M.lidR ?? M.lid ?? 0) : (M.lidL ?? M.lid ?? 0)), g = (i ? M.gazeR : M.gazeL) || M.gaze || [0, 0];
    shape(ctx, ell(ex, ey, 62, 50, 28), K14_ROCKD, { lw: 0 });
    if (lid < 0.97) { shape(ctx, ell(ex, ey, 52, 40, 28), C.white, { lw: 5, seed: 150 + i }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + g[0] * 30, ey + g[1] * 20 + 2, 15, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(ex + g[0] * 30 + 5, ey + g[1] * 20 - 4, 4, 0, 7); ctx.fill(); }
    // ledge lid: a rock slab whose lower edge drops with lid
    const ly = ey - 48 + lid * 92, br = (M.brow || 0) * (i ? -1 : 1);
    shape(ctx, [[ex - 74, ey - 64 + br * 10], [ex + 74, ey - 64 - br * 10], [ex + 70, ly - br * 4], [ex, ly + 6], [ex - 70, ly + br * 4]], K14_ROCKL, { lw: 6, seed: 160 + i, dot: K14_ROCKD, pitch: 9, rad: 0.2, da: 0.4 });
  });
  const mx = 610, my = 520, tk = K.clamp(M.talk || 0), m = M.mouth || 'line';
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 9;
  if (tk > 0.02) { shape(ctx, [[mx - 85, my], [mx - 40, my - 6 * tk], [mx, my + 4], [mx + 45, my - 6 * tk], [mx + 85, my], [mx + 40, my + 34 * tk], [mx - 40, my + 34 * tk]], K14_HOLE, { lw: 7, seed: 170 }); }
  else { ctx.beginPath(); const cv = m === 'smile' ? 26 : m === 'frown' ? -20 : 0;
    for (let k = 0; k <= 14; k++) { const u = k / 14, xx = mx - 85 + 170 * u, zig = (k % 2 ? 6 : -4) + (m === 'wobble' ? Math.sin(u * 8 + t * 20) * 8 : 0); ctx.lineTo(xx, my + zig + cv * Math.sin(Math.PI * u)); } ctx.stroke(); }
  ctx.restore();
  // holes
  if ((M.holeB || 0) > 0) { const k = K.clamp(M.holeB); shape(ctx, ell(K14_HOLE_B[0], K14_HOLE_B[1] - 6, 26 * k, 22 * k, 18), K14_HOLE, { lw: 4, seed: 181 }); }
  const [hx, hy] = K14_HOLE_A;
  shape(ctx, [[hx - 30, hy + 15], [hx - 30, hy - 8], [hx - 16, hy - 26], [hx, hy - 30], [hx + 16, hy - 26], [hx + 30, hy - 8], [hx + 30, hy + 15]], M.lit ? mixHex(K14_HOLE, '#ffd98a', K.clamp(M.lit)) : K14_HOLE, { lw: 4, seed: 180 });
  if (M.lit) { ctx.save(); ctx.globalAlpha = 0.55 * K.clamp(M.lit) * (0.9 + 0.1 * Math.sin(t * 7)); ctx.fillStyle = dotPat(ctx, C.yellow, 6, 0.35); ctx.beginPath(); ctx.arc(hx, hy + 2, 40, 0, 7); ctx.fill(); ctx.restore(); }
}
function mountainBoulder(ctx, x, y, r, rot, sq = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + (1 - sq) * 0.6, sq); ctx.rotate(rot);
  shape(ctx, [[-r, 0], [-r * 0.7, -r * 0.75], [0, -r], [r * 0.8, -r * 0.6], [r, 0.1 * r], [r * 0.6, r * 0.8], [-r * 0.5, r * 0.85]], K14_ROCKL, { lw: 5, seed: 190, dot: K14_ROCKD, pitch: 7, rad: 0.22, da: 0.5 });
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-r * 0.3, -r * 0.4); ctx.lineTo(r * 0.1, -r * 0.1); ctx.stroke(); ctx.restore();
  ctx.restore();
}

// ---------- poofBurst(ctx, x, y, d, R): the shared transformation burst. d = seconds since the POOF; flash, star burst with overshoot, puff ring ----------
function poofBurst(ctx, x, y, d, R = 190, seed = 5) {
  if (d < 0 || d > 2.2) return;
  const r = K.rng(seed);
  const k = d < 0.25 ? K.lerp(0.2, 1.1, d / 0.25) : d < 0.45 ? K.lerp(1.1, 1.0, (d - 0.25) / 0.2) : 1, fade = K.clamp((2.2 - d) / 0.9);
  ctx.save(); ctx.globalAlpha *= fade;
  // puff ring
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + r() * 0.3, dist = R * (0.55 + 0.45 * K.ease.out(K.clamp(d / 1.2))), pr = R * (0.22 + r() * 0.1) * (1 - 0.3 * K.clamp(d / 2));
    shape(ctx, ell(x + Math.cos(a) * dist, y + Math.sin(a) * dist * 0.8, pr, pr * 0.9, 18), C.white, { lw: 5, seed: 200 + i, dot: '#c9c4d6', pitch: 8, rad: 0.25, da: 0.5 }); }
  // star burst
  if (d < 1.4) { const pts = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, rr = (i % 2 ? 0.5 : 1) * R * k * (0.9 + 0.2 * r()); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    ctx.save(); ctx.globalAlpha *= K.clamp((1.4 - d) / 0.5); shape(ctx, pts, C.yellow, { lw: 7, seed: 210, dot: C.red, pitch: 9, rad: 0.25, da: 0.5 }); ctx.restore(); }
  // inner puff cloud (thins out from 0.9 s)
  const th = K.clamp((1.9 - d) / 1.0); if (th > 0) { ctx.save(); ctx.globalAlpha *= th; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + 0.4, pr = R * 0.36; shape(ctx, ell(x + Math.cos(a) * R * 0.3, y + Math.sin(a) * R * 0.26, pr, pr * 0.9, 18), C.white, { lw: 0 }); } shape(ctx, ell(x, y, R * 0.42, R * 0.38, 20), C.white, { lw: 0 }); ctx.restore(); }
  for (let i = 0; i < 6; i++) { const a = r() * Math.PI * 2, dd = R * (0.6 + 0.9 * K.ease.out(K.clamp(d / 1.3))); star(ctx, x + Math.cos(a) * dd, y + Math.sin(a) * dd * 0.8, 12 * (1 - K.clamp(d / 2)), C.yellow, d * 3 + i); }
  ctx.restore();
}
// full-panel 2-frame white flash (call in panel coordinates)
function k14Flash(ctx, t, t0) { if (t >= t0 && t < t0 + 0.07) { ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = C.white; ctx.fillRect(-50, -50, 1100, 1330); ctx.restore(); } }

// ---------- skyLight(ctx, x, yTop, yBot, w, a): soft halftone cone of light from the top ----------
function skyLight(ctx, x, yTop, yBot, w, a) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha = a; const poly = [[x - 40, yTop], [x + 40, yTop], [x + w / 2, yBot], [x - w / 2, yBot]];
  K.poly(ctx, poly, true); ctx.fillStyle = 'rgba(255,230,120,0.55)'; ctx.fill(); K.poly(ctx, poly, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.35); ctx.fillRect(x - w, yTop, w * 2, yBot - yTop); ctx.restore();
}

// ---------- heightMarks(ctx, x, y0, n, step, t, times): chalk ticks on a doorpost; times[i] = when mark i appears (chalk puff) ----------
function heightMarks(ctx, x, y0, n, step, t, times = []) {
  ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const ti = times[i] ?? -1, k = K14B(t, ti, 0.25, 'out'); if (k <= 0) continue; const y = y0 - i * step;
    ctx.strokeStyle = C.black; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 13 * k, y); ctx.lineTo(x + 13 * k, y); ctx.stroke(); ctx.strokeStyle = C.white; ctx.lineWidth = 4; ctx.stroke();
    if (t - ti < 0.6 && t >= ti) dustBurst(ctx, x + 14, y, t - ti, 4, 3, 6, 18, 0.6, 300 + i); }
  ctx.restore();
}

// ---------- scarfCloth(ctx, x, y, s, fold, rot): the maiden's yellow headscarf, loose (fold 0, flat on the ground) or folded (fold 1) ----------
function scarfCloth(ctx, x, y, s, fold = 0, rot = 0, flutter = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const w = K.lerp(60, 26, fold), h = K.lerp(12, 18, fold), fl = flutter;
  shape(ctx, [[-w, 0], [-w * 0.5, -h + fl * 6], [0, -h * 0.6 - fl * 4], [w * 0.5, -h + fl * 5], [w, 0], [w * 0.6, h * 0.5], [-w * 0.6, h * 0.5]], C.yellow, { lw: 4, seed: 220, dot: C.red, pitch: 7, rad: 0.22, da: 0.5 });
  ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-w * 0.3, -h * 0.5); ctx.lineTo(-w * 0.2, h * 0.3); ctx.moveTo(w * 0.25, -h * 0.5); ctx.lineTo(w * 0.3, h * 0.3); ctx.stroke(); ctx.restore();
  ctx.restore();
}
// ---------- beadString(ctx, x, y, s, click): nine red prayer beads hanging from a hand point; click (0..9) slides them ----------
function beadString(ctx, x, y, s, click = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 18, 18, -0.3, Math.PI + 0.3); ctx.stroke();
  for (let i = 0; i < 9; i++) { const a = -0.2 + (i + (click % 1)) / 9 * (Math.PI + 0.4); shape(ctx, ell(Math.cos(a) * 18, 18 + Math.sin(a) * 18, 5, 5, 10), C.red, { lw: 2.5, seed: 230 + i }); }
  ctx.restore();
}
// ---------- sandal(ctx, x, y, s): a flat leather sandal seen from the side ----------
function sandal(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-42, 0], [-40, -10], [40, -10], [46, -4], [42, 0]], '#a8741a', { lw: 4, seed: 240, dot: '#7a4212', pitch: 7, rad: 0.2, da: 0.4 }); seg(ctx, -10, -10, 10, -26, 5, '#7a4212', 2.5); seg(ctx, 10, -26, 28, -10, 5, '#7a4212', 2.5); ctx.restore(); }
// ---------- mouseBed / mouseLamp / mouseMat: the tiny furniture in the mouse's room (k 0..1 pop) ----------
function mouseRoomProps(ctx, x, y, s, kb, kl, km, bedRot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (km > 0) { ctx.save(); ctx.scale(1, K.ease.back(km)); shape(ctx, K.rectPts(-40, -4, 50, 6), C.red, { lw: 3, seed: 250 }); ctx.restore(); }
  if (kb > 0) { ctx.save(); ctx.translate(30, 0); ctx.rotate(bedRot); ctx.scale(K.ease.back(kb), K.ease.back(kb)); shape(ctx, K.rectPts(-18, -14, 36, 10), '#a8741a', { lw: 3, seed: 251 }); shape(ctx, K.rectPts(-16, -20, 12, 7), C.white, { lw: 2.5, seed: 252 }); shape(ctx, K.rectPts(-4, -19, 20, 6), C.blue, { lw: 2.5, seed: 253 }); ctx.restore(); }
  if (kl > 0) { ctx.save(); ctx.translate(-30, -30); ctx.scale(K.ease.back(kl), K.ease.back(kl)); ctx.globalAlpha *= 0.5; ctx.fillStyle = dotPat(ctx, C.yellow, 4, 0.4); ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.fill(); ctx.globalAlpha /= 0.5; shape(ctx, ell(0, 0, 6, 7, 10), C.yellow, { lw: 2.5, seed: 254 }); ctx.restore(); }
  ctx.restore();
}

// ---------- k14Mouse(ctx, P): rat kind 'mouse' plus story extras ----------
// P: rat fields + {who: 'her' | 'him', tuft (him), bow (her), wave 0..1 (raised near paw, waving with t), paw 'head' | 'heart' | 'eyes' | 'point' | 'self' | 'out',
//     broom 0..1 (held twig broom, angle via broomA), blush 0..1, twitch (nose twitch phase), t}
function k14Mouse(ctx, P) {
  const him = P.who === 'him', s = P.s || 1, dir = P.dir ?? 1;
  const Q = { kind: 'mouse', pal: him ? 0 : 1, ...P }; if (P.twitch) Q.sniff = Math.max(Q.sniff || 0, 0.5 + 0.5 * Math.sin(P.twitch * 40));
  rat(ctx, Q);
  if (P.silhouette) return;
  const sit = K.clamp(P.sit || 0), sq = P.sq ?? 1;
  // head point (approx, local): standing head near (52, -46); sitting head near (30, -86)
  const hx = K.lerp(52, 22, sit), hy = K.lerp(-46, -92, sit) * sq + (P.drop || 0);
  const W = (lx, ly) => [P.x + dir * s * lx, P.y + s * ly];
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  if (him && P.tuft !== false) { const [x0, y0] = W(hx - 4, hy - 26); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 3.2 * s; for (const a of [-0.5, 0, 0.5]) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + Math.sin(a) * 12 * s * dir, y0 - Math.cos(a) * 12 * s); ctx.stroke(); } ctx.restore(); }
  if (P.bow) { const [bx, by] = W(hx - 8, hy - 30); ctx.save(); ctx.translate(bx, by); ctx.scale(s, s); shape(ctx, [[0, 0], [-12, -8], [-12, 8], [0, 0], [12, -8], [12, 8], [0, 0]], C.yellow, { lw: 2.5, seed: 260 }); shape(ctx, ell(0, 0, 3.5, 3.5, 8), C.red, { lw: 2, seed: 261 }); ctx.restore(); }
  if (P.blush) { const [cx, cy] = W(hx + 18, hy + 8); ctx.save(); ctx.globalAlpha *= P.blush; ctx.fillStyle = dotPat(ctx, C.red, 4, 0.45); ctx.beginPath(); ctx.ellipse(cx, cy, 8 * s, 5 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // an extra near arm for gestures (shoulder on the chest)
  const sh = [K.lerp(34, 18, sit), K.lerp(-30, -62, sit) * sq];
  let tgt = null; const tt = P.t || 0;
  if (P.wave) tgt = [sh[0] + 10, sh[1] - 34 * P.wave + Math.sin(tt * 14) * 4, Math.sin(tt * 14) * 8];
  else if (P.paw === 'head') tgt = [hx - 6, hy - 22]; else if (P.paw === 'heart') tgt = [sh[0] - 6, sh[1] + 4]; else if (P.paw === 'eyes') tgt = [hx + 14, hy - 4];
  else if (P.paw === 'point') tgt = [sh[0] + 14, sh[1] - 40]; else if (P.paw === 'self') tgt = [sh[0] - 10, sh[1] + 6]; else if (P.paw === 'out') tgt = [sh[0] + 30, sh[1] - 8]; else if (P.paw === 'door') tgt = [sh[0] + 36, sh[1] + 20];
  if (tgt) { const a = W(...sh), b = W(tgt[0] + (tgt[2] || 0), tgt[1]); seg(ctx, a[0], a[1], b[0], b[1], 7 * s, him ? '#7a6a64' : '#b9b4c6', 3 * s); shape(ctx, ell(b[0], b[1], 5 * s, 5 * s, 10), '#f4a8b4', { lw: 2.5 }); }
  if (P.broom != null && P.broom > 0) { const g = W(sh[0] + 14, sh[1] + 6), a = (P.broomA || 0.3) * dir, L = 70 * s; const e = [g[0] + Math.sin(a) * L, g[1] + Math.cos(a) * L];
    seg(ctx, g[0] - Math.sin(a) * 14 * s, g[1] - Math.cos(a) * 14 * s, e[0], e[1], 4 * s, '#a8741a', 2);
    ctx.save(); ctx.translate(e[0], e[1]); ctx.rotate(-a); shape(ctx, [[-4 * s, -4 * s], [4 * s, -4 * s], [12 * s, 14 * s], [-12 * s, 14 * s]], '#d9a441', { lw: 2.5, seed: 262 }); ctx.restore(); }
  ctx.restore();
}

// ---------- rankStrip(ctx, t, R): the chain of strength, five icon slots across the top of the picture (panel coordinates) ----------
// R: {n (slots shown, 0..5), times [t per slot], tag (index of the STRONGEST? tag, may be fractional while hopping), tagT (when the tag first shows),
//     q5 (show '?' in slot 5), crown, heart, star4 (star on the mountain icon), alpha}
function rankStrip(ctx, t, R) {
  if (R.alpha <= 0.01 || R.n <= 0) return;
  const x0 = 260, dx = 120, y = 118, sz = 44;
  ctx.save(); ctx.globalAlpha *= R.alpha;
  for (let i = 0; i < 5; i++) {
    const ti = R.times[i] ?? 1e9, k = K14B(t, ti, 0.35, 'back'); const show = i < 4 ? t >= ti : (t >= (R.q5T ?? 1e9));
    if (!show) continue; const x = x0 + i * dx, cur = Math.round(R.tag ?? -1) === i, shrink = (R.tag ?? -1) > i + 0.5 ? 0.85 : 1;
    ctx.save(); ctx.translate(x, y); const kk = (i < 4 ? k : K14B(t, R.q5T, 0.35, 'back')) * shrink; ctx.scale(kk, kk);
    shape(ctx, K.rectPts(-sz, -sz, sz * 2, sz * 2), C.white, { lw: 5, seed: 300 + i });
    if (i === 0) { for (let r = 0; r < 8; r++) { const a = r * Math.PI / 4 + t * 0.5; seg(ctx, Math.cos(a) * 20, Math.sin(a) * 20, Math.cos(a) * 28, Math.sin(a) * 28, 4, C.yellow, 2); } shape(ctx, ell(0, 0, 16, 16, 20), C.yellow, { lw: 3.5, seed: 310 }); }
    if (i === 1) cloudFlat(ctx, 0, 2, 0.26);
    if (i === 2) { ctx.save(); ctx.lineCap = 'round'; for (const [yy, c] of [[-10, '#9cc4ff'], [2, C.blue], [14, '#9cc4ff']]) { ctx.strokeStyle = C.black; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-26, yy); ctx.quadraticCurveTo(0, yy - 12, 22, yy); ctx.arc(18, yy - 6, 6, 0.5, -2.5, true); ctx.stroke(); ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); }
    if (i === 3) { shape(ctx, [[-28, 24], [-6, -22], [2, -14], [10, -26], [30, 24]], K14_ROCK, { lw: 3.5, seed: 311 }); shape(ctx, [[-6, -22], [2, -14], [10, -26], [14, -16], [-10, -14]], C.white, { lw: 2.5, seed: 312 }); if (R.star4 != null && t >= R.star4) star(ctx, 20, -22, 10 * K14B(t, R.star4, 0.3, 'back'), C.yellow); }
    if (i === 4) { if (t >= (R.times[4] ?? 1e9)) { ctx.save(); ctx.scale(K.ease.back(K14B(t, R.times[4], 0.35)), K.ease.back(K14B(t, R.times[4], 0.35))); rat(ctx, { x: -2, y: 18, s: 0.42, kind: 'mouse', pal: 0, dir: -1 });
        if (R.heart != null && t >= R.heart) heart(ctx, 0, -18, 12 * K14B(t, R.heart, 0.3, 'back'));
        else { ctx.save(); ctx.translate(-4, -24); shape(ctx, [[-12, 6], [-12, -6], [-6, 0], [0, -8], [6, 0], [12, -6], [12, 6]], C.yellow, { lw: 2.5, seed: 313 }); ctx.restore(); }
        ctx.restore(); }
      else { ctx.font = K.font(52, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('?', 0, 4); } }
    ctx.restore();
    if (i > 0) { const ax = x - dx / 2; ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax - 8, y); ctx.lineTo(ax + 8, y); ctx.moveTo(ax + 2, y - 6); ctx.lineTo(ax + 8, y); ctx.lineTo(ax + 2, y + 6); ctx.stroke(); ctx.restore(); }
  }
  if (R.tag != null && R.tag >= 0 && t >= (R.tagT ?? 0)) { const fi = Math.floor(R.tag), fr = R.tag - fi, tx = x0 + (fi + K.ease.inOut(fr)) * dx, hopY = Math.sin(Math.PI * fr) * 30;
    ctx.save(); ctx.translate(tx, y + sz + 26 + hopY * -1 + 0); ctx.rotate(-0.04); ctx.font = K.font(30, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const tw = ctx.measureText('STRONGEST?').width + 18; shape(ctx, K.rectPts(-tw / 2, -18, tw, 36), C.yellow, { lw: 4, seed: 320 }); ctx.fillStyle = C.black; ctx.fillText('STRONGEST?', 0, 2); ctx.restore(); }
  ctx.restore();
}

// ---------- small helpers ----------
// lettering in panel space from a world point
const k14P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
function k14Sfx(ctx, cam, wx, wy, text, t, t0, dur = 1.2, size = 90, o = {}) { if (t < t0 || t > t0 + dur) return; const [x, y] = k14P(wx, wy, cam); ctx.save(); ctx.globalAlpha = K.clamp((t0 + dur - t) / 0.25); sfx(ctx, text, x, y, size, K14B(t, t0, 0.3), o); ctx.restore(); }
function k14Label(ctx, S, cam, wx, wy, text, t, t0, t1, o = {}) { if (t < t0 || t > t1) return; const [x, y] = k14P(wx, wy, cam); ctx.save(); ctx.globalAlpha = K.clamp((t1 - t) / 0.3); S.label(ctx, text, x, y, K14B(t, t0, 0.4), { size: 40, align: 'center', ...o }); ctx.restore(); }
function k14Arrow(ctx, S, cam, from, to, t, t0, t1, o = {}) { if (t < t0 || t > t1) return; ctx.save(); ctx.globalAlpha = K.clamp((t1 - t) / 0.3); S.arrow(ctx, k14P(from[0], from[1], cam), k14P(to[0], to[1], cam), K14B(t, t0, 0.45, 'out'), { width: 20, ...o }); ctx.restore(); }
// a simple bendable tree for the windy ridge
function k14Tree(ctx, x, y, h, bend) {
  const top = [x + bend * h * 0.55, y - h * (1 - 0.18 * Math.abs(bend))], mid = [x + bend * h * 0.12, y - h * 0.55];
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(mid[0], mid[1], top[0], top[1]); ctx.stroke(); ctx.strokeStyle = WOOD; ctx.lineWidth = 16; ctx.stroke(); ctx.restore();
  shape(ctx, ell(top[0] + bend * 30, top[1] - 10, 70 + 20 * Math.abs(bend), 58 - 16 * Math.abs(bend), 24), GREEN, { lw: 6, seed: 330 + Math.round(x), dot: GREEND, pitch: 9, rad: 0.25, da: 0.5 });
}
