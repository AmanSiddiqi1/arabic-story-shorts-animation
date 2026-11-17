// ===== AN-041 story drawings (proposed for Library/, see library_proposals.md): wolf, flea, bone, coins, pebble, scales, tongue, sweat,
// flush, hunter shadow, fox anchor points. All pure functions of their arguments. =====

// fox anchor: a point in the fox's HEAD frame (eye 18,-8; muzzle tip 76,4; mouth 40,20) -> world, following the Library fox rig (sit, drop, headUp)
function f41FoxPt(P, lx, ly) {
  const s = P.s || 1, dir = P.dir ?? 1, sit = P.sit || 0, hu = P.headUp ?? P.nod ?? 0;
  let x = lx * Math.cos(hu) - ly * Math.sin(hu) + 92, y = lx * Math.sin(hu) + ly * Math.cos(hu) - 128 + (P.drop || 0);
  const a = -0.55 * sit, rx = x + 60, ry = y; x = rx * Math.cos(a) - ry * Math.sin(a) - 60; y = rx * Math.sin(a) + ry * Math.cos(a);
  return [P.x + x * s * dir, P.y + y * s];
}
const f41FoxEye = (P) => f41FoxPt(P, 18, -8);
// plan ears (1 up and alert .. -1 flat back) -> Library fox ears field (0 up .. 1 flat)
const f41Ears = (e) => (e >= 0 ? 0.2 - 0.35 * e : 0.2 - 0.7 * e);

// wolf: the Library fox figure in a grey coat (offered to Library as an opt-in fox palette)
function f41Wolf(ctx, P) { ctx.save(); ctx.filter = 'grayscale(1) brightness(1.05) contrast(1.08)'; fox(ctx, P); ctx.restore(); }

// hunter shadow: the same character drawn flat black in another pose, clipped to a wall polygon
function f41HunterShadow(ctx, drawFn, P, clip, alpha = 0.8, warp = null) {
  ctx.save(); K.poly(ctx, clip, true); ctx.clip(); if (warp) warp(ctx); ctx.globalAlpha *= alpha; ctx.filter = 'brightness(0)'; drawFn(ctx, P); ctx.restore();
}

// flea (insect kind 'flea'): oval red-brown body, big hopping back leg, antennae; feet at (x, y), facing dir. Body 40 x 28 at s 1.
// P: x, y, s, dir, sq, raise (0..1 front leg up to the brow: salute), ant (0 down .. 1 up), bundle (stick and bundle on the shoulder), mouth ('smile'), eyes, look
function f41Flea(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, sq = P.sq ?? 1, an = P.ant ?? 0.6, rz = P.raise || 0;
  ctx.save(); ctx.translate(P.x, P.y); ctx.scale(dir * s * (1 + (1 - sq) * 0.6), s * sq); if (P.rot) ctx.rotate(P.rot);
  seg(ctx, -8, -16, -26, -10, 6, '#6e2a10', 2.5); seg(ctx, -26, -10, -14, 0, 5, '#6e2a10', 2.5);   // back leg
  seg(ctx, 4, -12, 6, 0, 4, '#6e2a10', 2); seg(ctx, -2, -12, -4, 0, 4, '#6e2a10', 2);
  if (P.bundle) { seg(ctx, -14, -40, 10, -20, 3, WOOD, 1.5); shape(ctx, ell(-16, -42, 9, 8, 10), C.blue, { lw: 2.5, seed: 4 }); }
  shape(ctx, ell(0, -22, 20, 14, 16), '#8a3a1a', { lw: 4, seed: 5, dot: '#4a1a08', pitch: 6, rad: 0.2, da: 0.5 });
  shape(ctx, ell(18, -30, 10, 9, 12), '#a8481e', { lw: 3.5, seed: 6 });
  ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.lineCap = 'round';
  for (const k of [0, 1]) { ctx.beginPath(); ctx.moveTo(18 + k * 4, -38); ctx.quadraticCurveTo(24 + k * 6, -48 - 8 * an, 30 + k * 8, -40 - 16 * an + 8 * (1 - an)); ctx.stroke(); }
  if (P.mouth === 'smile') { ctx.beginPath(); ctx.arc(23, -28, 4, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  ctx.restore();
  eyeAt(ctx, 21, -33, P.eyes || 'open', P.look ?? 0.8);
  if (rz > 0) seg(ctx, 10, -24, K.lerp(14, 24, rz), K.lerp(-16, -42, rz), 4, '#6e2a10', 2); else seg(ctx, 10, -20, 16, -8, 4, '#6e2a10', 2);
  ctx.restore();
}

// bone: a clean bone (the den bone drawing as a movable prop). meat: a little red meat in the middle
function f41Bone(ctx, x, y, len = 70, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const h = len / 2, k = len / 70;
  if (o.meat) shape(ctx, ell(0, 0, h * 0.55, 9 * k, 14), C.red, { lw: 3, seed: 3 });
  seg(ctx, -h, 0, h, 0, 9 * k, C.white, 4);
  for (const sd of [-1, 1]) { shape(ctx, ell(sd * h - 2 * sd, -6 * k, 8 * k, 8 * k, 10), C.white, { lw: 3.5, seed: 4 }); shape(ctx, ell(sd * h - 2 * sd, 6 * k, 8 * k, 8 * k, 10), C.white, { lw: 3.5, seed: 5 }); }
  if (o.meat) shape(ctx, ell(-4, -2, h * 0.4, 7 * k, 12), C.red, { lw: 3, seed: 6 });
  ctx.restore();
}
// coins: one coin, and a pile of n coins (taken: how many removed from the top)
function f41Coin(ctx, x, y, r = 12, glint = 0) { shape(ctx, ell(x, y, r, r * 0.9, 14), C.yellow, { lw: 3, seed: 7, dot: C.red, pitch: 5, rad: 0.18, da: 0.5 }); seg(ctx, x - r * 0.4, y, x + r * 0.4, y, 1, '#e0a800', 1); if (glint > 0) star(ctx, x + r * 0.6, y - r * 0.8, 10 * glint, C.white); }
function f41Coins(ctx, x, y, n = 12, taken = 0) { const pos = []; let k = 0; for (let row = 0; k < n; row++) { const m = Math.max(1, 5 - row); for (let i = 0; i < m && k < n; i++, k++) pos.push([x + (i - (m - 1) / 2) * 22, y - 10 - row * 18]); }
  for (let i = 0; i < n - taken; i++) f41Coin(ctx, pos[i][0], pos[i][1], 12); }
function f41Pebble(ctx, x, y, r = 7, seed = 1) { shape(ctx, ell(x, y, r, r * 0.8, 9), STONE, { lw: 3, seed }); }
// tongue tip at a world point (out 0..1), a sweat drop, a red flush over a face
function f41Tongue(ctx, x, y, out, s = 1) { if (out <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(4, 6 * out, 10, 8 * out + 2, 12), C.red, { lw: 3, seed: 3 }); ctx.restore(); }
function f41Sweat(ctx, x, y, a = 1, s = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[0, -14], [8, 0], [0, 8], [-8, 0]], TEAR, { lw: 3, seed: 4 }); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-2, 0, 2, 0, 7); ctx.fill(); ctx.restore(); }
function f41Flush(ctx, x, y, r, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0, 0, 7); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 7, 0.36); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
// scales (inside the fox's private thought): beam tilt in radians (+ = left pan down)
function f41Scales(ctx, x, y, tilt, left, right) {
  seg(ctx, x, y + 150, x, y, 10, WOOD, 4); shape(ctx, [[x - 50, y + 160], [x + 50, y + 160], [x + 30, y + 140], [x - 30, y + 140]], WOOD, { lw: 4, seed: 3 });
  const L = [x - 130 * Math.cos(tilt), y + 130 * Math.sin(tilt)], R = [x + 130 * Math.cos(tilt), y - 130 * Math.sin(tilt)];
  seg(ctx, L[0], L[1], R[0], R[1], 9, C.yellow, 4); shape(ctx, ell(x, y, 12, 12, 10), C.red, { lw: 3, seed: 2 });
  for (const [p, draw] of [[L, left], [R, right]]) { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] - 40, p[1] + 60); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 40, p[1] + 60); ctx.stroke(); ctx.restore();
    shape(ctx, [[p[0] - 50, p[1] + 60], [p[0] + 50, p[1] + 60], [p[0] + 30, p[1] + 78], [p[0] - 30, p[1] + 78]], C.yellow, { lw: 4, seed: 5 }); draw(ctx, p[0], p[1] + 58); }
}
// dotted line along a list of points, drawn up to fraction p
function f41Dotted(ctx, pts, p, col = C.black, w = 7, gap = 18) { const q = K.trim(pts, K.clamp(p)); if (q.length < 2) return; ctx.save(); ctx.setLineDash([2, gap]); ctx.lineCap = 'round'; ctx.lineWidth = w; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]); for (const v of q.slice(1)) ctx.lineTo(v[0], v[1]); ctx.stroke(); ctx.restore(); }

// ===== v2 additions (Fable round 1) =====
// the Library bird frame (cast/birds.js): origin at the feet, scaled by dir * s; head=true adds the head rotation about the neck
function f41BirdFrame(ctx, P, head) { const s = P.s || 1, dir = P.dir ?? 1; ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (head) { const hx = 32, hy = -64 + (P.drop || 0), hr = P.headRot || 0; if (hr) { ctx.translate(hx - 14, hy + 16); ctx.rotate(hr); ctx.translate(-(hx - 14), -(hy + 16)); } } }
// crow crest (drawn BEFORE the bird so the head covers the roots): c 0 flat .. 1 raised
function f41CrowCrest(ctx, P, c) { if (c <= 0.02) return; ctx.save(); f41BirdFrame(ctx, P, true); const hx = 32, hy = -64 + (P.drop || 0);
  [[-14, -0.5], [-4, -0.15], [6, 0.2]].forEach(([dx, a], i) => { const L = 16 + 16 * c; shape(ctx, [[hx + dx - 7, hy - 10], [hx + dx - 6 + Math.sin(a - 0.5) * L, hy - 12 - Math.cos(a - 0.5) * L], [hx + dx + 6, hy - 14]], '#1a1a22', { lw: 4, seed: 60 + i }); });
  ctx.restore(); }
// pointing wing for a dark bird: a separate feathered wing with a paper-white rim so it reads against the black body.
// k 0 folded .. 1 fully out; ang: direction of the tip in the bird frame (0 = straight ahead, + = downwards)
const F41_WING = [[0, -12], [40, -18], [78, -14], [106, -6], [88, -1], [98, 5], [77, 6], [85, 12], [60, 12], [30, 16], [0, 12]];
function f41CrowWing(ctx, P, k, ang = 0.35) { if (k <= 0.02) return; ctx.save(); f41BirdFrame(ctx, P, false); ctx.translate(-4, -48);
  ctx.rotate(K.lerp(2.5, ang, Math.min(1, k))); const sc = K.lerp(0.55, 1, Math.min(1, k)) * (k > 1 ? k : 1); ctx.scale(sc, sc);
  ctx.save(); K.poly(ctx, F41_WING, true); ctx.lineJoin = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = C.white; ctx.stroke(); ctx.restore();
  shape(ctx, F41_WING, '#1a1a22', { lw: 4.5, seed: 64 });
  ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 3; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(10, -9); ctx.quadraticCurveTo(50, -15, 92, -7); ctx.stroke();
  ctx.lineWidth = 2.5; ctx.strokeStyle = '#4a4a5a'; for (const [x0, x1] of [[40, 70], [36, 62], [30, 52]]) { ctx.beginPath(); ctx.moveTo(x0 - 20, 2 + (x0 - 30) * 0.1); ctx.lineTo(x1, 5 + (70 - x1) * 0.1); ctx.stroke(); } ctx.restore();
  ctx.restore(); }
// a pointing gesture: anticipation (wing pulled back) 0.15 s, throw with a little overshoot, hold, settle. Returns {k, back}
function f41Point(t, t0, hold = 0.8, settle = 0.4) { if (t < t0 - 0.15 || t > t0 + 0.14 + hold + settle) return { k: 0, back: 0 };
  if (t < t0) return { k: 0, back: pulse(t, t0 - 0.15, 0.3) };
  const th = K.ease.back(K.clamp((t - t0) / 0.14)), st = F41B(t, t0 + 0.14 + hold, settle); return { k: th * (1 - st), back: 0 }; }
// the crow drawn with its v2 extras: crest (P.crestUp), the Library bird, then the pointing wing (P.wingK, P.wingAng)
function f41DrawCrow(ctx, P) { f41CrowCrest(ctx, P, P.crestUp || 0); bird(ctx, P); f41CrowWing(ctx, P, P.wingK || 0, P.wingAng ?? 0.35); }

// lick: the tongue sweeps out of the mouth and across the muzzle (u 0..1), a long red tongue in the fox head frame
function f41Lick(ctx, F, u) { if (u <= 0 || u >= 1) return; const out = Math.sin(Math.PI * u), a = K.lerp(0.9, -1.3, u);
  const m = f41FoxPt(F, 46, 18), dir = F.dir ?? 1, s = F.s || 1; ctx.save(); ctx.translate(m[0], m[1]); ctx.scale(dir * s, s); ctx.rotate(a);
  const L = 10 + 34 * out; shape(ctx, [[-2, -7], [L * 0.7, -9], [L, -4], [L + 4, 2], [L, 8], [L * 0.7, 9], [-2, 7]], '#ff5a7a', { lw: 4, seed: 71 });
  seg(ctx, 4, 0, L * 0.75, 0, 1, '#c8204a', 2); ctx.restore(); }
// a drop (tear or drool): #fffaf0 with a blue edge, r about 6 world units; splash: 0..1 after landing
function f41Drop(ctx, x, y, r = 6, splash = 0) { ctx.save(); if (splash <= 0) { ctx.translate(x, y); ctx.beginPath(); ctx.moveTo(0, -r * 1.9); ctx.quadraticCurveTo(r, -r * 0.5, r, r * 0.3); ctx.arc(0, r * 0.3, r, 0, Math.PI); ctx.quadraticCurveTo(-r, -r * 0.5, 0, -r * 1.9);
    ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.blue; ctx.stroke(); ctx.fillStyle = '#9fc4ff'; ctx.beginPath(); ctx.arc(r * 0.35, r * 0.5, r * 0.35, 0, 7); ctx.fill(); }
  else { ctx.globalAlpha *= 1 - splash; ctx.fillStyle = C.white; ctx.strokeStyle = C.blue; ctx.lineWidth = 2.5; for (const sd of [-1, -0.4, 0.4, 1]) { ctx.beginPath(); ctx.arc(x + sd * (6 + 18 * splash), y - 4 - 16 * Math.sin(Math.PI * splash) * (1.2 - Math.abs(sd) * 0.5), 3.2, 0, 7); ctx.fill(); ctx.stroke(); } }
  ctx.restore(); }
// flat single-tone silhouette: draws fn in black on an offscreen layer (no overlaps, no inner grey), clipped to a polygon,
// the bottom faded out between fadeY0 and fadeY1 (world y), then composited once at alpha a
function f41FlatShadow(ctx, clip, a, fadeY0, fadeY1, fn) {
  const cv = ctx.canvas, L = K.cached('f41shadowL', () => K.layer(cv.width, cv.height)), c = L.getContext('2d'), M = ctx.getTransform();
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, L.width, L.height); c.setTransform(M);
  c.save(); K.poly(c, clip, true); c.clip(); c.filter = 'brightness(0)'; fn(c); c.restore();
  c.save(); c.globalCompositeOperation = 'destination-out'; const g = c.createLinearGradient(0, fadeY0, 0, fadeY1); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)'); c.fillStyle = g; c.fillRect(-2000, fadeY0, 5000, fadeY1 - fadeY0 + 400); c.restore();
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.drawImage(L, 0, 0); ctx.restore(); }
// both forepaws pressed over the muzzle (k 0..1 slides them up from the chest): two orange paws with black pads
function f41PawsOverMouth(ctx, F, k) { if (k <= 0.02) return; const m = f41FoxPt(F, 56, 16), c = f41FoxPt(F, 10, 90), s = F.s || 1, dir = F.dir ?? 1;
  [[-8, 0], [12, -6]].forEach(([dx, dy], i) => { const x = K.lerp(c[0], m[0] + dx * s * dir, k), y = K.lerp(c[1], m[1] + dy * s, k);
    seg(ctx, x - 30 * s * dir, y + 60 * s, x, y, 15 * s, i ? FOXC : FOXD, 4); shape(ctx, ell(x + 4 * s * dir, y, 17 * s, 13 * s, 12), FOXC, { lw: 3.5, seed: 80 + i }); shape(ctx, ell(x + 12 * s * dir, y, 6 * s, 9 * s, 8), C.black, { lw: 0 }); }); }
