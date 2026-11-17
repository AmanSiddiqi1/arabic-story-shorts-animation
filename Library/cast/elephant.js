// ===== elephant. From The Lark and the Elephant, with the Fable experiment's rig additions. =====
// P: {x,y,s,dir,ph,amp (walk),rot,bob,hbob (head lag),tail,lift(0..100 raised near front leg),drop,trunk(0 down..1 up),reach,earUp,earOff,flapEar,eyes('open','shut','smug','x'),brow,tongue}
function elephant(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const bob = P.bob || 0;
  const leg = (x, sw, far) => { if (!far && sw === 0 && P.lift) return; const a = Math.sin(ph + sw) * amp * 0.5, fx = x + Math.sin(a) * 40; shape(ctx, [[x - 24, -130], [x + 24, -130], [fx + 28, -10 - (a > 0 ? a * 20 : 0)], [fx - 28, -10 - (a > 0 ? a * 20 : 0)]], far ? ELEPHD : ELEPH, { lw: 6, seed: 3 }); shape(ctx, ell(fx, -8 - (a > 0 ? a * 20 : 0), 32, 12, 14), '#e9e2d0', { lw: 4, seed: 4 }); };
  const liftLeg = (x, L) => { // raised near front leg: thigh lifts forward to a knee, shin hangs straight down, pad tilted so the sole shows
    const k = K.clamp(L / 100), kx = x + 25 * k, ky = K.lerp(-75, -190, k), fy = K.lerp(-10, -128, k);
    shape(ctx, [[x - 26, -150], [x + 26, -150], [kx + 26, ky + 6], [kx - 26, ky - 6]], ELEPH, { lw: 8, seed: 3, dot: ELEPHD, pitch: 9, rad: 0.16, da: 0.5 });
    shape(ctx, [...ell(kx, ky, 27, 25, 18).slice(9, 19), [kx - 27, fy - 4], [kx + 27, fy - 4]].reverse(), ELEPH, { lw: 8, seed: 3, dot: ELEPHD, pitch: 9, rad: 0.16, da: 0.5 });
    ctx.save(); ctx.translate(kx, fy); ctx.rotate(-0.35 * k); shape(ctx, ell(0, 0, 32, 10 + 8 * k, 18), '#d8ccb0', { lw: 5, seed: 4 }); for (const dx of [12, 24]) shape(ctx, ell(dx, -6, 7, 6, 10), C.white, { lw: 3, seed: 6 }); ctx.restore(); };
  leg(-90, 0, true); leg(80, Math.PI, true);
  ctx.save(); ctx.translate(0, bob);
  ctx.save(); ctx.translate(-150, -200); ctx.rotate(P.tail || 0); ctx.translate(150, 200); shape(ctx, [[-150, -200], [-176, -150], [-168, -150], [-160, -120]], ELEPHD, { lw: 4, seed: 9 }); ctx.restore();
  shape(ctx, ell(0, -190, 160, 112, 36), ELEPH, { lw: 8, seed: 5, dot: ELEPHD, pitch: 9, rad: 0.16, da: 0.5 });
  ctx.restore();
  leg(-50, Math.PI, false); leg(115, 0, false);
  ctx.save(); ctx.translate(0, bob + (P.hbob || 0));
  const hx = 152, hy = -214 + (P.drop || 0);
  // trunk
  const tr = P.trunk ?? 0, rc = P.reach || 0, tp = K.bezier([hx + 52, hy + 12], [hx + 96 + rc * 20, hy + 52 - tr * 70], [hx + 70 + tr * 30 + rc * 50, hy + 130 - tr * 160 - rc * 10], [hx + 96 + tr * 40 + rc * 70, hy + 156 - tr * 230 - rc * 30], 14);
  for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], 44 - i * 1.6, ELEPH, 5.5);
  shape(ctx, ell(hx, hy, 80, 78, 30), ELEPH, { lw: 8, seed: 6, dot: ELEPHD, pitch: 9, rad: 0.16, da: 0.5 });
  const ea = Math.sin(ph * 2 + 1) * 0.15 * (P.flapEar ?? 0.4) + (P.earUp || 0) + (P.earOff || 0);
  ctx.save(); ctx.translate(hx - 62, hy - 6); ctx.rotate(-0.2 + ea); shape(ctx, ell(-20, 18, 62, 84, 24), ELEPHD, { lw: 7, seed: 7 }); shape(ctx, ell(-18, 22, 38, 60, 20), '#e79aa8', { lw: 0 }); ctx.restore();
  shape(ctx, [[hx + 42, hy + 34], [hx + 92, hy + 58], [hx + 56, hy + 52]], '#fffaf0', { lw: 4.5, seed: 8 });
  const e = P.eyes || 'open';
  if (e === 'x') { ctx.save(); ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx + 22, hy - 30); ctx.lineTo(hx + 52, hy - 4); ctx.moveTo(hx + 52, hy - 30); ctx.lineTo(hx + 22, hy - 4); ctx.stroke(); ctx.restore(); }
  else if (e === 'shut') { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(hx + 36, hy - 20, 14, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke(); ctx.restore(); }
  else if (e === 'smug') { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx + 20, hy - 22); ctx.lineTo(hx + 52, hy - 22); ctx.stroke(); ctx.restore(); }
  else eyeAt(ctx, hx + 38, hy - 22, e, 0.6);
  if (e !== 'x' && P.brow) { ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx + 18, hy - 46 - P.brow * 6); ctx.lineTo(hx + 58, hy - 46 + P.brow * 8); ctx.stroke(); ctx.restore(); }
  if (P.tongue) shape(ctx, ell(hx + 62, hy + 70, 12, 22, 12), C.red, { lw: 4, seed: 9 });
  ctx.restore();
  if (P.lift) liftLeg(115, P.lift);   // the raised foot is drawn last so it reads in front of the ear
  ctx.restore();
}
