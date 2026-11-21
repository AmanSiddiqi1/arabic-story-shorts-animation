// ===== SIND-02 story helpers: Sinbad's turban-cloth states on his body, the sack, a tongue of concentration, shot helpers =====
// turbanCloth timeline (plan): on the head to 57.3; unwind 57.3..58.3; in the hands 58.3..59.16; tied to the ankle 60.0..73.46; sling
// 73.46..110.76; in the hands 110.76..111.68; strap 111.68..124.0; scarf 124.86..138.42; rewind 138.42..139.6; crooked turban after.
// Scenes that draw the cloth themselves (unwinding, the ankle line, the strap) pass P.cloth = 'none'.
const SB2_BARE = (t) => t >= 57.5 && t < 139.3;
function sbClothState(t) { return t < 57.3 ? 'turban' : t < 73.46 ? 'none' : t < 110.76 ? 'sling' : t < 124.86 ? 'none' : t < 138.42 ? 'scarf' : t < 139.6 ? 'none' : 'crooked'; }
// draws Sinbad with the right head (turban or hair), the hair tufts, and the cloth worn on him (sling / scarf / crooked turban)
function sbSin2(ctx, P) {
  const t = P.t || 0, bare = P.bare2 ?? SB2_BARE(t), st = P.cloth ?? sbClothState(t), Q = { ...P };
  if (bare) { Q.pal = { ...(P.pal || {}), ...SB_HAIR }; Q.noTail = true; }
  if (st === 'crooked') { Q.tailA = (P.tailA || 0) + 0.5; }
  const R = sbSinbad(ctx, Q); P.hands = Q.hands;
  if (bare) sbHairTufts(ctx, R, P.hairK ?? 1, t);
  if (st === 'sling' || st === 'scarf') sbWornCloth(ctx, R, st, t);
  if (st === 'crooked') { const a = sbPt(R, [16, -46]); sbBlob(ctx, a[0], a[1], 14 * R.s, 9 * R.s, SB_ACC, SB_ACCD, { lw: 2, off: 3 }); }
  if (P.tongue) { const m = sbPt(R, [10, 26]); sbBlob(ctx, m[0] + 3 * (R.dir || 1), m[1] + 3, 5 * R.s, 4 * R.s, '#ff7a8a', '#d84a6a', { lw: 1.5, off: 1.5 }); }
  return R;
}
// the cloth worn on the body: sling (shoulder to hip, a 60 tail at the hip) or scarf (round the neck, two tails)
function sbWornCloth(ctx, Q, st, t) {
  const s = Q.s || 1, dir = Q.dir || 1;
  if (Q.lie > 0.5) return;
  if (st === 'sling') { const a = sbPt(Q, [-34, -168], false), b = sbPt(Q, [30, -92], false), m = sbPt(Q, [0, -128], false);
    sbCloth(ctx, [a, [m[0] - 2, m[1] + 4], b], { w: 13 * s }); sbRibbon(ctx, b[0], b[1], Math.PI / 2 - 0.25 * dir, 60 * s, 13 * s, t, { amp: 5, freq: 7, ph: 1.3 }); }
  else { const n0 = sbPt(Q, [-24, 46]), n1 = sbPt(Q, [24, 46]), n2 = sbPt(Q, [0, 58]); sbCloth(ctx, [n0, n2, n1], { w: 14 * s });
    for (const [sd, ph] of [[-1, 0], [1, 1.7]]) sbRibbon(ctx, n2[0] + sd * 6, n2[1], Math.PI / 2 + sd * 0.25 - 0.4 * (Q.wind ?? 0), 52 * s, 12 * s, t, { amp: 5, freq: 8, ph }); }
}
// the sack Sinbad carries in S1 (white star on a tangerine band) at (x, y) = its top, swinging rot
function sbSack(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  celShade(ctx, [[-30, 0], [-38, 40], [-30, 76], [30, 76], [38, 40], [30, 0], [10, -14], [-10, -14]], '#e8d0a0', '#b89a68', { light: [-1, -1], off: 12, lw: 3 });
  ctx.fillStyle = SB_ACC; ctx.fillRect(-36, 30, 72, 16); ctx.fillStyle = '#ffffff'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 4 : 9; ctx.lineTo(Math.cos(a) * r, 38 + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.restore(); }
// a cushion on the bench: plum, with the warm dent
function sbCushion(ctx, x, y) { celShade(ctx, [[x - 40, y], [x - 44, y - 16], [x - 20, y - 24], [x - 4, y - 14], [x + 14, y - 24], [x + 42, y - 18], [x + 40, y]], '#9a5ac8', '#6a3a9a', { light: [-1, -1], off: 6, lw: 2.5 }); }
const sbKeys = (keys) => (t) => K.camAt(keys, t);
// world -> panel for a camera (labels and balloons placed on world points)
const sbWP = (p, c) => sbP(p[0], p[1], c);
// a person's standard living pose (blinks on threes, sway, breath) with the turn blinks
function sbLive(t, seed, P, turns = []) { const Q = sbAlive(t, seed, P); if (P.lid == null) Q.lid = sbLid(t, seed, turns); return Q; }
// a dotted arc (a thrown or bouncing thing's trail)
function sbDots(ctx, pts, a = 0.8, r = 5, col = '#ffffff') { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; for (const [x, y] of pts) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } ctx.restore(); }
// a round inset (panel units): neon ring, clip, draw(c) inside, pops in at a and out at b
function sbInset(ctx, t, a, b, x, y, r, draw) { if (t < a || t > b) return; const k = Math.min(K.ease.back(K.clamp((t - a) / 0.25)), K.clamp((b - t) / 0.2));
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.save(); ctx.clip(); ctx.translate(-r, -r); draw(ctx, 2 * r); ctx.restore();
  ctx.strokeStyle = '#7ad9ff'; ctx.lineWidth = 10; ctx.shadowColor = '#7ad9ff'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.shadowBlur = 0; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
// a little thought: a lilac roc silhouette (side view) for balloons, at (x, y) wing span w
function sbRocIcon(ctx, x, y, w, t, o = {}) { sbRoc(ctx, { x, y, s: w / 3000, dir: o.dir || 1, spread: 1, ...sbRocFlap(t, 1.2), sil: o.col || '#9a7ad8', t, tuck: 1 }); }
// a sweat drop beside a head (world), on threes
function sbSweat(ctx, Q, t) { const p = sbPt(Q, [44, -20]), u = (SB_T3(t) * 1.4) % 1; ctx.save(); ctx.globalAlpha *= 1 - u * 0.6; ctx.translate(p[0], p[1] + u * 26); ctx.scale(Q.s || 1, Q.s || 1); ctx.fillStyle = '#8fd0ff'; ctx.beginPath(); ctx.moveTo(0, -12); ctx.quadraticCurveTo(8, 0, 0, 7); ctx.quadraticCurveTo(-8, 0, 0, -12); ctx.fill(); ctx.strokeStyle = '#2a5a9a'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
