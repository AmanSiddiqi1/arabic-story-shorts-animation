// ===== SIND-06 story helpers: Sinbad's look per scene (bare feet after the wreck, the robe of honour), small props (crab, leaf,
// tally marks, the signal flag, hoe, basket, bowl, shelter), the farmers, the farm child, the river king =====

// Sinbad: bare feet from the wreck (23.5) to the palace (122.96); the turban a little askew in the cove; the robe of honour from 126.4.
// P.robe: 0..1 (on), P.robeFly 0..1 (it streams behind him when he runs)
function sbSin6(ctx, P) {
  const t = P.t || 0, Q = { ...P }; if (P.bare == null) Q.bare = t > 23.5 && t < 122.96;
  if (t > 23.5 && t < 108.6 && P.tailA == null) Q.tailA = 0.35;
  const rb = P.robe ?? (t > 126.9 ? 1 : 0); if (rb > 0) sbRobe(ctx, Q, rb, P.robeFly || 0, t, 'back');
  const R = sbSinbad(ctx, Q); P.hands = Q.hands;
  if (rb > 0) sbRobe(ctx, R, rb, P.robeFly || 0, t, 'front');
  if (P.tongue) { const m = sbPt(R, [10, 26]); sbBlob(ctx, m[0] + 3 * (R.dir || 1), m[1] + 3, 5 * R.s, 4 * R.s, '#ff7a8a', '#d84a6a', { lw: 1.5, off: 1.5 }); }
  return R;
}
// the robe of honour: cream with a gold edge, worn open (back panel behind the body, two front edges beside the arms)
function sbRobe(ctx, Q, k, fly, t, part) {
  const s = (Q.s || 0.95), dir = Q.dir || 1, sh = sbPt(Q, [0, -150], false), hip = sbPt(Q, [0, -40], false), tc = SB_T3(t);
  ctx.save(); ctx.globalAlpha *= K.clamp(k);
  if (part === 'back') { const wv = fly * (20 + 8 * Math.sin(tc * 9)), bx = -dir * (fly * 70);
    const P = [[sh[0] - 34 * s, sh[1] - 6 * s], [sh[0] + 34 * s, sh[1] - 6 * s], [hip[0] + 40 * s + bx, hip[1] + 40 * s - wv], [hip[0] + bx * 1.4, hip[1] + 50 * s + wv * 0.5], [hip[0] - 40 * s + bx, hip[1] + 40 * s - wv]];
    celShade(ctx, P, '#fbf3df', '#e0cfa8', { light: [-1, -1], off: 8, lw: 2.5, line: '#a8803a' }); ctx.strokeStyle = '#f2b01e'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(...P[2]); ctx.lineTo(...P[3]); ctx.lineTo(...P[4]); ctx.stroke(); }
  else for (const sd of [-1, 1]) { const a = sbPt(Q, [sd * 24, -146], false), b = sbPt(Q, [sd * 30, -30], false); if (fly > 0.5) continue;
    celShade(ctx, [[a[0] - 7 * s, a[1]], [a[0] + 7 * s, a[1]], [b[0] + 9 * s, b[1]], [b[0] - 9 * s, b[1]]], '#fbf3df', '#e0cfa8', { light: [-sd, -1], off: 4, lw: 2, line: '#a8803a' }); seg(ctx, a[0], a[1], b[0], b[1], 3, '#f2b01e', 0); }
  ctx.restore();
}
// the farmers (three) and the farm child; the river king and his vizier (series rule: the caliph preset recoloured per land)
const SB_FARMER = [
  { costume: 'villager', s: 0.95, age: 0.85, pal: { robe: '#7a9a3a', dot: '#7a9a3a', sleeve: '#93b050', hc: '#fff1d8', hd: '#e0d0b0', band: '#c8602a', sash: '#c8602a', pants: '#f3e6cc', shoes: 'bare' } },
  { costume: 'villager', s: 1.08, age: 0.3, pal: { robe: '#3f5fb0', dot: '#3f5fb0', sleeve: '#5a7ac8', sleeveLen: 'short', hc: '#f0e0c0', hd: '#d8c8a0', band: '#e8364f', sash: '#e8364f', pants: '#f3e6cc', shoes: 'bare', beard: '#2a1a14' } },
  { costume: 'villager', s: 0.98, age: 0.5, belly: 0.6, pal: { robe: '#b8553a', dot: '#b8553a', sleeve: '#c86a4a', hc: '#e8d28a', hd: '#c8b06a', band: '#3f8a4a', sash: '#3f8a4a', pants: '#f3e6cc', shoes: 'bare', belly: 0.6 } },
];
const SB_CHILD = { costume: 'maiden', child: true, s: 1, age: 0, pal: { robe: '#ffe04a', dot: '#ffe04a', sleeve: '#ffe04a', band: '#5aa84a', sash: '#5aa84a', hair: '#2a1a14' } };
const SB_RKING = { costume: 'caliph', s: 1.05, age: 0.75, pal: { robe: '#c03a8a', dot: '#c03a8a', sleeve: '#e07ab0', trim: '#ffd36a', cape: '#fbf3df', capeDot: '#e8dcc0', sash: '#ffd36a', hc: '#ffffff', hd: '#e4e4ee', jewel: '#2a6ad8', head: 'bigTurban' } };
const SB_RVIZ = { costume: 'vizier', s: 1.0, age: 0.6, pal: { robe: '#1f8a8a', dot: '#1f8a8a', sleeve: '#3aa8a8', hc: '#ffffff', hd: '#e4e4ee', beard: '#9a98a8' } };
function sbFarmer(ctx, i, P) { const Q = sbPerson(ctx, SB_FARMER[i], P); if (P.hoe) sbHoe(ctx, sbHandW(Q, 1), P.hoe); if (P.basket) { const h = sbHandW(Q, 0); sbBasket(ctx, h[0], h[1] + 30, P.basket); } return Q; }
function sbChild(ctx, P) { const Q = sbPerson(ctx, SB_CHILD, P); if (P.grin) { const m = sbPt(Q, [0, 24]); ctx.save(); ctx.fillStyle = '#fff'; ctx.fillRect(m[0] - 7, m[1] - 2, 14, 5); ctx.fillStyle = '#5a1a22'; ctx.fillRect(m[0] - 2, m[1] - 2, 3, 5); ctx.restore(); } return Q; }
function sbRKing(ctx, P) { const Q = sbPerson(ctx, SB_RKING, P), c = sbPt(Q, [0, -62]), o = P.crown || { dx: 0, dy: 0, rot: 0 };
  ctx.save(); ctx.translate(c[0] + o.dx, c[1] + o.dy); ctx.rotate(o.rot + (Q.tip || 0) * (Q.dir || 1)); const s = Q.s;
  celShade(ctx, [[-30 * s, 0], [-28 * s, -30 * s], [-14 * s, -14 * s], [0, -38 * s], [14 * s, -14 * s], [28 * s, -30 * s], [30 * s, 0]], '#ffd36a', '#c8901a', { light: [-1, -1], off: 6, hi: '#fff3b0', lw: 3 });
  shape(ctx, ell(0, -10 * s, 6 * s, 6 * s, 10), '#2a6ad8', { lw: 2 }); ctx.restore(); return Q; }
function sbRViz(ctx, P) { return sbPerson(ctx, SB_RVIZ, P); }
// ---------- small props ----------
// hoe held at hand h (world): handle 170 along angle a (o = angle or true)
function sbHoe(ctx, h, a) { const ang = typeof a === 'number' ? a : -1.2; ctx.save(); ctx.translate(h[0], h[1]); ctx.rotate(ang); seg(ctx, -40, 0, 130, 0, 6, '#b08050', 1.5); celShade(ctx, [[126, -4], [148, -4], [150, 24], [126, 18]], '#9aa0b8', '#6a708a', { light: [-1, -1], off: 4, lw: 2 }); ctx.restore(); }
// basket of onions and greens (70 x 50) with its bottom at (x, y)
function sbBasket(ctx, x, y, k = 1, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const [dx, col] of [[-18, '#5aa84a'], [0, '#3f8a3a'], [16, '#7ac85a']]) celShade(ctx, [[dx - 6, -40], [dx, -70], [dx + 6, -40]], col, sbDark(col, 0.3), { light: [-1, 0], off: 2, lw: 1.5 });
  for (const [dx, col] of [[-16, '#f0e0f0'], [4, '#d8a0d0'], [20, '#f0e0f0']]) sbBlob(ctx, dx, -42, 11, 10, col, sbDark(col, 0.2), { lw: 1.5 });
  celShade(ctx, [[-35, -44], [35, -44], [28, 0], [-28, 0]], '#d8a85a', '#a8783a', { light: [-1, -1], off: 6, lw: 2.5, line: '#6a4a1e' }); ctx.strokeStyle = '#a8783a'; ctx.lineWidth = 2; for (let k2 = -2; k2 <= 2; k2++) { ctx.beginPath(); ctx.moveTo(k2 * 12, -42); ctx.lineTo(k2 * 10, -2); ctx.stroke(); } ctx.restore(); }
// a small bowl (water) at (x, y), tilt
function sbBowl(ctx, x, y, tilt = 0, full = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); celShade(ctx, [[-22, -10], [22, -10], [16, 8], [-16, 8]], '#c8784a', '#8a4a2a', { light: [-1, -1], off: 5, lw: 2 }); if (full > 0) shape(ctx, ell(0, -10, 20 * full, 5, 12), '#7ad8f0', { lw: 1.5 }); ctx.restore(); }
// a red crab (shell 44 wide), walking sideways (ph), claw wave (wave 0..1)
function sbCrab(ctx, x, y, o = {}) { const s = o.s || 1, ph = o.ph || 0, wv = o.wave || 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let k = 0; k < 3; k++) for (const sd of [-1, 1]) { const a = 0.5 + k * 0.4 + 0.2 * Math.sin(ph + k + sd), lx = sd * (14 + k * 4); seg(ctx, lx, -8, lx + sd * 16 * Math.cos(a), -8 + 14, 3, '#e8364f', 1.5); }
  for (const sd of [-1, 1]) { const up = sd > 0 ? wv : 0, cx = sd * 28, cy = -18 - 22 * up; seg(ctx, sd * 16, -14, cx, cy, 4, '#e8364f', 1.5); celShade(ctx, [[cx - 7, cy + 2], [cx - 6, cy - 9], [cx + 7, cy - 10 - 6 * Math.sin(ph * 3) * up], [cx + 7, cy + 2]], '#ff5a6a', '#c01a3a', { light: [-1, -1], off: 3, lw: 1.5 }); }
  celShade(ctx, ell(0, -14, 22, 14, 18), '#ff5a6a', '#c01a3a', { light: [-1, -1], off: 5, hi: '#ffb0b8', lw: 2, line: '#6a1020' });
  for (const sd of [-1, 1]) { seg(ctx, sd * 6, -26, sd * 8, -34, 2, '#c01a3a', 0); shape(ctx, ell(sd * 8, -36, 3.5, 3.5, 8), '#fff', { lw: 1.2 }); ctx.fillStyle = '#1a0a14'; ctx.beginPath(); ctx.arc(sd * 8, -36, 1.6, 0, 7); ctx.fill(); }
  ctx.restore(); }
// a green leaf (30 long) floating, spinning (rot)
function sbLeaf(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); celShade(ctx, [[-16, 0], [-6, -7], [10, -6], [17, 0], [8, 6], [-6, 6]], '#5ac85a', '#2f8a3a', { light: [-1, -1], off: 3, lw: 1.8, line: '#1f5a2a' }); seg(ctx, -16, 0, 14, 0, 1.2, '#2f8a3a', 0); ctx.restore(); }
// tally marks scratched on the cliff: n marks from (x, y) in groups of five; fresh (0..1) last mark highlighted
function sbTally(ctx, x, y, n, o = {}) { ctx.save(); ctx.strokeStyle = o.col || '#fff4e4'; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const row = Math.floor(i / (o.perRow || 20)), k = i % (o.perRow || 20), g = Math.floor(k / 5), j = k % 5, bx = x + g * 34 + j * 6, by = y + row * 34;
    ctx.lineWidth = i === n - 1 && o.fresh ? 4.5 : 3.5; ctx.globalAlpha = i === n - 1 && o.fresh ? 1 : 0.85; if (j === 4) { ctx.beginPath(); ctx.moveTo(bx - 26, by + 22); ctx.lineTo(bx + 2, by + 2); ctx.stroke(); } else { ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 1, by + 24); ctx.stroke(); } }
  ctx.restore(); }
// the signal: an oar planted at (x, y) with a strip of the striped sail as a flag (u 0..1 hoisted up the oar)
function sbSignal(ctx, x, y, u, t, o = {}) { const L = 240; seg(ctx, x, y, x + 4, y - L, 7, '#c89a5a', 2); celShade(ctx, [[x - 14, y - L - 4], [x + 18, y - L - 4], [x + 20, y - L + 60], [x - 12, y - L + 60]], '#c89a5a', '#8a6030', { light: [-1, -1], off: 4, lw: 2 });
  if (u <= 0) return; const fy = y - 40 - (L - 70) * K.clamp(u); ctx.save(); const tc = SB_T3(t), pts = [], w = 60 * K.clamp(u * 1.5);
  for (let i = 0; i <= 8; i++) { const v = i / 8; pts.push([x + 6 + 90 * v * K.clamp(u * 1.3), fy + w * 0 + 6 * Math.sin(tc * 9 - i * 1.1) * v]); }
  const bot = pts.map(([px, py], i) => [px, py + 50 + 4 * Math.sin(tc * 9 - i * 1.1 + 0.5) * (i / 8)]);
  const poly = [...pts, ...bot.reverse()]; ctx.save(); K.poly(ctx, poly, true); ctx.fillStyle = SB_CREAM; ctx.fill(); ctx.clip(); ctx.fillStyle = SB_CRIM; ctx.fillRect(x, fy + 10, 120, 10); ctx.fillRect(x, fy + 30, 120, 10); ctx.restore(); ink(ctx, poly, 2.5, 3, '#5a3a3a'); ctx.restore(); }
// the camp shelter: a sail cloth over two spars (x centre, y ground)
function sbShelter(ctx, x, y, t) { const tc = SB_T3(t), fl = 4 * Math.sin(tc * 5); seg(ctx, x - 70, y, x - 60, y - 120, 6, '#a8743e', 1.5); seg(ctx, x + 70, y, x + 64, y - 110, 6, '#a8743e', 1.5);
  celShade(ctx, [[x - 90, y - 4], [x - 60, y - 124], [x + 64, y - 114 + fl], [x + 96, y - 6]], SB_CREAM, '#e0d0b0', { light: [-1, -1], off: 16, lw: 2.5, line: '#8a6a4a' }); ctx.save(); ctx.fillStyle = SB_CRIM; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.moveTo(x - 76, y - 60); ctx.lineTo(x + 80, y - 56 + fl * 0.5); ctx.lineTo(x + 84, y - 44); ctx.lineTo(x - 72, y - 48); ctx.closePath(); ctx.fill(); ctx.restore(); }
// a counter-style headcount: the chrome counter over a head
function sbHeadCount(ctx, S, t, t0, step, pts, cam) { const n = Math.min(pts.length, Math.floor((t - t0) / step) + 1); if (n < 1) return; const p = sbWP(pts[n - 1], cam); S.counter(ctx, n, p[0], p[1] - 40, K.clamp((t - t0 - (n - 1) * step) / 0.2), { size: 60 }); }
// a person's foot point on the ground for groundShadow
const sbFeet = (P) => [P.x, P.y];
