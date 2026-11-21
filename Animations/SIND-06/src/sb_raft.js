// ===== SIND-06 new prop: raft (plank raft with build stages, pole, star flag, cargo, anchors) and the duck pose =====
// sbRaft(ctx, o): the raft seen slightly from above, bow toward +x (it always travels screen right). Origin = the middle of the deck's
// FRONT edge (the edge nearest the camera), on the deck surface. Deck 300 x 56 seen as a parallelogram (back edge 22 up, skewed 14),
// six planks across the length in two wood tones with nail heads, two cross bars and four lashings, two rope hand loops on the front
// edge at local x -90 and +90, a 150 pole at the stern (local x -128) that turns about its foot, the lantern hook and the tangerine rag
// with a white star. o: {x, y, rot, dip (extra down offset, set by the caller from rebound/pulse), s, build 0..1 (planks then bars and
// lashings), pole 0..1 (0 lowered flat toward the stern, 1 upright), flag (0..1 shown), lamp (flame or null), swing (lamp, radians),
// cargo {food, skin, gems (0..9)}, rider(ctx) drawn on the deck in local units (deck surface y -8, centre x 0), t}
// Returns world anchors {deck, loopL, loopR, poleTop, lamp, bow, stern}.
const SB_RAFT = { w: 300, d: 22, skew: 14, loops: [-90, 90], poleX: -128, poleH: 150 };
function sbRaftPt(o, lx, ly) { const s = o.s || 1, a = o.rot || 0, c = Math.cos(a), n = Math.sin(a); return [(o.x || 0) + (lx * c - ly * n) * s, (o.y || 0) + (o.dip || 0) + (lx * n + ly * c) * s]; }
function sbRaftPole(o) { const a = (1 - K.clamp(o.pole ?? 1)) * -1.45, top = [SB_RAFT.poleX + Math.sin(a) * SB_RAFT.poleH, -10 - Math.cos(a) * SB_RAFT.poleH]; return { a, top, hook: [SB_RAFT.poleX + Math.sin(a) * (SB_RAFT.poleH - 14) + Math.cos(a) * 20, -10 - Math.cos(a) * (SB_RAFT.poleH - 14) + Math.sin(a) * 20] }; }
function sbRaft(ctx, o = {}) {
  const s = o.s || 1, b = K.clamp(o.build ?? 1), t = o.t || 0, R = SB_RAFT, hw = R.w / 2, P = sbRaftPole(o);
  ctx.save(); ctx.translate(o.x || 0, (o.y || 0) + (o.dip || 0)); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  // the pole (behind the deck at the stern), the rag flag, the lantern on its hook
  if (b > 0.85 && (o.pole ?? 1) >= 0) { const foot = [R.poleX, -10]; ctx.save(); ctx.translate(...foot); ctx.rotate(P.a); seg(ctx, 0, 0, 0, -R.poleH, 7, '#b08050', 2); seg(ctx, 0, -R.poleH + 14, 20, -R.poleH + 14, 4, '#8a6a2a', 1); ctx.restore();
    if (o.flag) { const ft = P.top, fa = P.a - Math.PI / 2 - 0.1 + 0.06 * Math.sin(SB_T3(t) * 7); ctx.save(); ctx.globalAlpha *= K.clamp(o.flag); sbRibbon(ctx, ft[0], ft[1] + 6, Math.PI + 0.15 + P.a * 0.4, 44, 26, t, { amp: 6, freq: 12, col: SB_ACC, shade: SB_ACCD });
      const sx = ft[0] - 16, sy = ft[1] + 8; ctx.fillStyle = '#ffffff'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 3.5 : 8; ctx.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.restore(); }
    if (o.lamp != null) sbLantern(ctx, P.hook[0], P.hook[1], { flame: o.lamp, swing: (o.swing || 0) - (o.rot || 0), t }); }
  // the deck: planks drop in one by one (build 0..0.6), then the bars and lashings (0.6..1)
  const deckPts = (x0, x1) => [[x0, 0], [x1, 0], [x1 + R.skew, -R.d], [x0 + R.skew, -R.d]];
  for (let i = 0; i < 6; i++) { const k = K.clamp(b * 10 - i), x0 = -hw + i * 50, x1 = x0 + 48; if (k <= 0) continue; const dy = -40 * (1 - K.ease.out(k));
    ctx.save(); ctx.translate(0, dy); const col = i % 2 ? '#c8925a' : '#b07a48', sh = sbDark(col, 0.3);
    celShade(ctx, [[x0, 0], [x1, 0], [x1, 12], [x0, 12]], sh, sbDark(col, 0.5), { light: [0, -1], off: 3, lw: 2, line: '#4a2a14' });     // plank end (front face)
    celShade(ctx, deckPts(x0, x1), col, sh, { light: [-1, -1], off: 4, lw: 2.2, line: '#4a2a14' });
    ctx.fillStyle = '#6a6a7a'; for (const nx of [x0 + 10, x1 - 6]) { ctx.beginPath(); ctx.arc(nx + 4, -4, 2.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(nx + R.skew - 4, -R.d + 4, 2.2, 0, 7); ctx.fill(); }
    ctx.strokeStyle = sbDark(col, 0.18); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0 + 18, -3); ctx.lineTo(x0 + 18 + R.skew * 0.8, -R.d + 3); ctx.stroke(); ctx.restore(); }
  const bk = K.clamp((b - 0.6) / 0.4);
  if (bk > 0) { ctx.save(); ctx.globalAlpha *= K.clamp(bk * 3); for (const [y0, w] of [[-R.d + 5, 8], [-6, 9]]) celShade(ctx, [[-hw - 6 + (y0 < -10 ? R.skew : 0), y0 - w / 2], [hw + 6 + (y0 < -10 ? R.skew : 0), y0 - w / 2], [hw + 6 + (y0 < -10 ? R.skew : 0), y0 + w / 2], [-hw - 6 + (y0 < -10 ? R.skew : 0), y0 + w / 2]], '#9a6a3a', '#6a4422', { light: [0, -1], off: 3, lw: 2, line: '#3a1e10' });
    for (let k = 0; k < 4; k++) { if (bk * 4 < k + 0.3) continue; const lx = [-118, -38, 42, 122][k]; ctx.strokeStyle = '#e0c890'; ctx.lineWidth = 3; for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.moveTo(lx - 5 + r * 4, -12); ctx.lineTo(lx - 2 + r * 4, 2); ctx.stroke(); } }
    ctx.restore(); }
  // cargo: food sack with the star band (stern), waterskin, the gem heap at the bow
  const cg = o.cargo || {};
  if (cg.food) sbSack(ctx, -96, -60, 0.5, 0.15);
  if (cg.skin) sbWaterskin(ctx, -60, -18, 0.2, 0, 0.55);
  if (o.rider) o.rider(ctx);
  if (cg.gems) sbPebbleHeap(ctx, 108, -4, Math.round(cg.gems), t, { s: 0.85, glow: cg.glow ?? 0.5, seed: 93 });
  // rope hand loops on the front edge
  if (bk > 0.9) for (const lx of R.loops) { ctx.strokeStyle = '#e0c890'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(lx, -2, 14, Math.PI * 0.05, Math.PI * 0.95, true); ctx.stroke(); ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore();
  const A = (lx, ly) => sbRaftPt(o, lx, ly);
  return { deck: A(0, -8), loopL: A(R.loops[0], -14), loopR: A(R.loops[1], -14), poleTop: A(...P.top), lamp: A(P.hook[0], P.hook[1] + 46), bow: A(hw, -8), stern: A(-hw, -8) };
}
// the raft on water: its line and tilt from a wave function wy(x) (half length 130)
function sbRaftFloat(x, wy) { const a = wy(x - 130), b = wy(x + 130); return { y: (a + b) / 2 - 4, rot: Math.atan2(b - a, 260) }; }

// ---------- duck: a person kneeling, folded flat forward (chest on the knees, head low, face still reading) ----------
// person P (any fields) with fold 0..1: kneel 1, the upper body rotated about the hips toward the facing side by fold * 1.25 rad and
// the head counter-rotated (tilt) so the face reads. At s 0.95 the folded figure is at most ~110 high. Draw it like sbSinbad:
// draw(ctx, P) is the person function (default sbSinbad). Returns the figure.
function sbDuck(ctx, P, fold, draw = sbSinbad) {
  const f = K.clamp(fold), dir = P.dir || 1, s = (P.s || 0.95), hip = [P.x - dir * 6 * s, P.y - 50 * s];
  const Q = { ...P, kneel: 1, lean: (P.lean || 0) + f * 1.25, tilt: (P.tilt || 0) - 0.55 * f, drop: (P.drop || 0) + 6 * f };
  if (f > 0.3) Q.noSash = true;
  ctx.save(); const R = draw(ctx, Q); ctx.restore(); P.hands = Q.hands; return R;
}
