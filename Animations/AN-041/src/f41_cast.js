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
