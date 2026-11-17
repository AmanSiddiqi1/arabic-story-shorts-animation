// ===== deer with antlers. From The Lion and the Hare. =====
// P: {x,y,s,dir,ph,amp (walk),graze(0..1 head down),nod,eyes,talk,mouth,shake}
function deer(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0, g = P.graze || 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); ctx.scale(dir * s, s);
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.6, fx = x + Math.sin(a) * 40, lift = a > 0 ? a * 24 : 0; seg(ctx, x, -100, fx, -10 - lift, 13, far ? DEERD : DEERC, 4); shape(ctx, ell(fx + 3, -6 - lift, 11, 7, 10), C.black, { lw: 2, seed: 3 }); };
  leg(-52, 0, true); leg(44, Math.PI, true);
  shape(ctx, ell(-72, -138, 12, 14, 12), C.white, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -125, 76, 40, 28), DEERC, { lw: 7, seed: 5, dot: C.white, pitch: 13, rad: 0.2, da: 0.9 });
  leg(-36, Math.PI, false); leg(58, 0, false);
  const hx = K.lerp(96, 126, g), hy = K.lerp(-222, -62, g);
  seg(ctx, 56, -140, hx - 8, hy + 14, 30, DEERC, 5);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(g * 0.9 + (P.nod || 0));
  for (const ax of [-10, 4]) { seg(ctx, ax, -16, ax - 8, -66, 7, CREAM, 3); seg(ctx, ax - 5, -44, ax + 14, -62, 6, CREAM, 3); seg(ctx, ax - 7, -58, ax - 24, -74, 6, CREAM, 3); }
  shape(ctx, ell(-22, -10, 16, 9, 12), DEERC, { lw: 4, seed: 6 });
  shape(ctx, ell(0, 0, 30, 24, 22), DEERC, { lw: 6, seed: 8 });
  shape(ctx, ell(26, 8, 20, 15, 16), CREAM, { lw: 5, seed: 9 }); shape(ctx, ell(42, 4, 7, 6, 10), C.black, { lw: 2, seed: 2 });
  eyeAt(ctx, 4, -6, P.eyes || 'open', 0.8);
  const tk = P.talk || 0; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
  if (tk > 0) shape(ctx, ell(28, 19, 9, 2 + 6 * tk, 12), C.black, { lw: 2.5, seed: 3 }); else if (P.mouth === 'smile') { ctx.beginPath(); ctx.arc(26, 8, 13, 0.25 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}
