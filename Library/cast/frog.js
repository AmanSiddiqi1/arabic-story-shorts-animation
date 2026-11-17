// ===== frog. From The Lark and the Elephant. =====
// P: {x,y,s,dir,croak(0..1 throat),duck(px down behind a bank),eyes}
function frog(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, cr = P.croak || 0;
  ctx.save(); ctx.translate(P.x, P.y + (P.duck || 0)); ctx.scale(dir * s, s * (1 + cr * 0.05));
  shape(ctx, ell(-26, -10, 30, 12, 14), GREEN, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -28, 34, 28, 22), GREEN2, { lw: 5, seed: 3, dot: GREEND, pitch: 7, rad: 0.16, da: 0.5 });
  shape(ctx, ell(0, -18, 22 + cr * 8, 12 + cr * 14, 16), '#f4f0a0', { lw: 0 });
  for (const ex of [-16, 14]) { shape(ctx, ell(ex, -54, 13, 13, 14), GREEN2, { lw: 4.5, seed: 4 }); eyeAt(ctx, ex + 1, -55, P.eyes || 'open', 0.5); }
  ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -34, 26, 0.12 * Math.PI, 0.88 * Math.PI); ctx.stroke(); ctx.restore();
  if (cr > 0.3) shape(ctx, ell(0, -24, 16, 6 + cr * 8, 14), C.black, { lw: 3, seed: 5 });
  ctx.restore();
}
