// ===== small props. fig (Monkey and the Turtle), drum (Fox and the Drum: drum(ctx, x, groundY, {r, hit 0..1, hole 0..1})) =====
function fig(ctx, x, y, r = 16, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  shape(ctx, [[-r * 0.25, -r * 1.35], [r * 0.25, -r * 1.35], [r * 0.3, -r * 0.7], [-r * 0.3, -r * 0.7]], GREEN, { lw: 3.5, seed: 3 });
  shape(ctx, ell(0, 0, r * 0.85, r, 20), FIGC, { lw: 4.5, seed: 4, dot: C.white, pitch: 6, rad: 0.18, da: 0.5 }); ctx.restore();
}
function drum(ctx, x, groundY, o = {}) {
  const r = o.r || 125, cx = x, cy = groundY - r, hit = o.hit || 0;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(1 + 0.045 * hit, 1 - 0.03 * hit); ctx.rotate(hit * 0.015);
  shape(ctx, ell(0, 0, r + 20, r + 20, 48), C.red, { lw: 9, seed: 40, dot: '#7a1008', pitch: 9, rad: 0.18, da: 0.5 });
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(Math.cos(a) * (r + 5), Math.sin(a) * (r + 5), 7, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); }
  const skin = ell(0, 0, r - 12, r - 12, 48); shape(ctx, skin, '#f6e7bf', { lw: 8, seed: 41, dot: '#c9a54a', pitch: 10, rad: 0.15, da: 0.5 });
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, b = a + Math.PI / 16; seg(ctx, Math.cos(a) * (r + 18), Math.sin(a) * (r + 18), Math.cos(b) * (r - 10), Math.sin(b) * (r - 10), 5, C.yellow, 2.5); }
  if (o.hole > 0) { const h = o.hole, hx = -52, hy = -6, pts = []; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, rr = (i % 2 ? 0.72 : 1) * 46 * h * (0.85 + 0.2 * Math.sin(i * 2.3)); pts.push([hx + Math.cos(a) * rr, hy + Math.sin(a) * rr * 1.15]); } pts.push(pts[0]);
    shape(ctx, pts, NAVY2, { lw: 6, seed: 42 }); if (h > 0.9) { ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#6d86c8'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(hx - 30, hy - 30); ctx.lineTo(hx + 18 * Math.cos(i), hy + 30 * Math.sin(i + 1)); ctx.stroke(); } ctx.beginPath(); ctx.arc(hx, hy, 18, 0.6, 2.4); ctx.stroke(); ctx.restore(); } }
  ctx.restore();
}
