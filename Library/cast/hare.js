// ===== hare, sitting upright. From The Lion and the Hare. =====
// P: {x,y,s,dir,pal(0 white,1 tan,2 grey),ears(1 up..-1 droop),earWig,eyes,brow,mouth,talk,raise(-1..1 paw),nod,drop,squash,shake,rot}
const HPAL = [{ body: C.white, dot: '#9db7e8' }, { body: '#e8b36a', dot: '#b5762a' }, { body: '#c9c4d6', dot: '#6f6a86' }];
function hare(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, pal = HPAL[P.pal || 0], sq = P.squash || 0, e = P.ears ?? 1;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 55) * 3 : 0), P.y); ctx.scale(dir * s * (1 + sq * 0.14), s * (1 - sq * 0.14)); if (P.rot) ctx.rotate(P.rot);
  shape(ctx, ell(-38, -36, 15, 15, 14), C.white, { lw: 4, seed: 2 });
  shape(ctx, ell(2, -9, 34, 12, 16), pal.body, { lw: 4.5, seed: 3 });
  shape(ctx, ell(0, -60, 40, 52, 26), pal.body, { lw: 6, seed: 5, dot: pal.dot, pitch: 8, rad: 0.2, da: 0.6 });
  shape(ctx, ell(14, -52, 20, 32, 18), C.white, { lw: 0 });
  shape(ctx, ell(-12, -30, 27, 25, 18), pal.body, { lw: 4.5, seed: 6 });
  ctx.save(); ctx.translate(16, -126 + (P.drop || 0)); ctx.rotate(P.nod || 0);
  for (const [ex, off] of [[-12, -0.3], [6, 0.08]]) { ctx.save(); ctx.translate(ex, -20); ctx.rotate(off - (1 - e) * 0.95 + (P.earWig || 0) * (ex > 0 ? 1 : 0.6)); shape(ctx, ell(0, -46, 13, 48, 20), pal.body, { lw: 5, seed: 7 }); shape(ctx, ell(0, -44, 6, 34, 14), C.skin, { lw: 0 }); ctx.restore(); }
  shape(ctx, ell(0, 0, 37, 32, 24), pal.body, { lw: 6, seed: 8, dot: pal.dot, pitch: 8, rad: 0.2, da: 0.6 });
  shape(ctx, ell(22, 10, 18, 14, 14), C.white, { lw: 0 });
  shape(ctx, ell(37, 3, 6, 5, 10), C.skin, { lw: 3, seed: 2 });
  eyeAt(ctx, 12, -8, P.eyes || 'open', 0.8);
  if (P.brow) browLine(ctx, 0, -24 - P.brow * 5, 26, -22 + P.brow * 7, 5);
  const tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
  if (tk > 0) shape(ctx, ell(25, 19, 7, 2 + 7 * tk, 12), C.black, { lw: 2.5, seed: 3 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(22, 9, 13, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); ctx.fillStyle = C.white; ctx.fillRect(19, 21, 8, 7); ctx.lineWidth = 2.5; ctx.strokeRect(19, 21, 8, 7); }
  else if (m === 'o') shape(ctx, ell(26, 19, 6, 8, 12), C.black, { lw: 2.5, seed: 3 });
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(24, 30, 10, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(18, 19); ctx.lineTo(32, 18); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  const r = P.raise || 0, hx = 40 + 22 * Math.abs(r), hy = -50 - 64 * r; seg(ctx, 20, -78, hx, hy, 13, pal.body, 4); shape(ctx, ell(hx, hy, 9, 9, 10), C.white, { lw: 3.5, seed: 5 });
  ctx.restore();
}
