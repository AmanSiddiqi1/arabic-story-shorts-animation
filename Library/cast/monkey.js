// ===== monkey. From The Monkey and the Turtle. =====
// P: {x,y,s,dir,rot,ph (tail swing),kick,aL,aR ([shoulder,elbow] angles) or handL,handR ([x,y] targets),eat(0..1 hand to mouth),hold('fig'),drop,dx,tilt,look,eyes,brow (+ angry V, - raised/worried),talk,mouth (closed, smile, smirk, frown, o, open)}
// after drawing, P.hR holds the right hand position.
function monkey(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const tw = Math.sin(ph) * 9;
  // tail
  const tp = K.bezier([-30, -34], [-95, -20 + tw], [-110, -110], [-62 + tw, -128], 16);
  for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], 13, FUR, 4.5);
  // legs
  for (const sd of [-1, 1]) { const hx = sd * 22, kx = hx + 24 + (P.kick || 0) * sd, fx = sd * 30 + 20; seg(ctx, hx, -26, kx, -6, 20, FUR, 4.5); shape(ctx, ell(fx - 6, -4, 20, 11, 14), FURD, { lw: 3.5, seed: 2 }); }
  // body
  shape(ctx, ell(0, -64, 40, 52, 28), FUR, { lw: 6, seed: 7, dot: FURD, pitch: 8, rad: 0.2, da: 0.55 });
  shape(ctx, ell(8, -58, 25, 36, 22), FURL, { lw: 3.5, seed: 8 });
  const arm = (sd, a) => { a = a || [0.25, 0.1]; const sx = sd * 30, sy = -92, e1 = [sx + Math.sin(a[0]) * 38, sy + Math.cos(a[0]) * 38], e2 = [e1[0] + Math.sin(a[1]) * 36, e1[1] + Math.cos(a[1]) * 36]; seg(ctx, sx, sy, e1[0], e1[1], 17, FUR, 4.5); seg(ctx, e1[0], e1[1], e2[0], e2[1], 15, FUR, 4.5); shape(ctx, ell(e2[0], e2[1], 12, 12, 12), FURD, { lw: 3.5, seed: 5 }); return e2; };
  const aR = P.eat != null ? [K.lerp(0.5, 1.6, P.eat), K.lerp(0.3, 3.3, P.eat)] : P.aR;
  // library: P.handL / P.handR = [x, y] hand targets (monkey-local, feet at 0,0, +x = facing side), solved by armTo(); aL/aR/eat win if given
  const hL = arm(-1, P.aL || (P.handL && armTo(-1, -92, P.handL, 30))); const hR = arm(1, aR || (P.handR && armTo(1, -92, P.handR, 30))); P.hR = hR;
  if (P.hold === 'fig') fig(ctx, hR[0] + 10, hR[1] - 8, 13);
  // head
  const hy = -140 + (P.drop || 0), hx = 8 + (P.dx || 0);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.tilt || 0);
  for (const ex of [-36, 44]) { shape(ctx, ell(ex, -4, 17, 17, 16), FUR, { lw: 4.5, seed: 9 }); shape(ctx, ell(ex, -4, 9, 9, 12), C.skin, { lw: 0 }); }
  shape(ctx, ell(0, 0, 44, 42, 30), FUR, { lw: 6, seed: 10, dot: FURD, pitch: 8, rad: 0.2, da: 0.55 });
  shape(ctx, [[-30, -14], [-12, -24], [0, -12], [12, -24], [30, -14], [36, 8], [26, 28], [0, 34], [-26, 28], [-36, 8]], FURL, { lw: 4, seed: 11, dot: C.skin, pitch: 6, rad: 0.25, da: 0.7 });
  const lk = P.look ?? 0.6, eyes = P.eyes || 'open';
  eyeAt(ctx, -12 + lk * 3, -6, eyes, lk); eyeAt(ctx, 16 + lk * 3, -6, eyes, lk);
  if (P.brow) for (const sd of [-1, 1]) { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(2 + sd * 16 - sd * 10 + 0, -24 + P.brow * 8); ctx.lineTo(2 + sd * 16 + sd * 10, -24 - P.brow * 5); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(2, 8, 2.6, 0, 7); ctx.arc(10, 8, 2.6, 0, 7); ctx.fill();
  const my = 18, tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(6, my + 2, 13, 4 + 10 * o, 14), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(6, my + 2 + 4 * o, 8, 3 + 3 * o, 0, 0, 7); ctx.fill(); }
  else if (m === 'o') shape(ctx, ell(6, my + 3, 8, 10, 12), C.black, { lw: 3, seed: 3 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(6, my - 8, 15, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(-6, my + 3); ctx.quadraticCurveTo(10, my + 6, 20, my - 4); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(6, my + 12, 12, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-4, my + 2); ctx.lineTo(16, my + 2); ctx.stroke(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}
