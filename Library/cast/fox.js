// ===== fox. From The Fox and the Drum (the fuller of the two copies). =====
// P: {x,y,s,dir,ph,amp (walk),sit(0..1),tailUp,puff,raise(paw),drop,headUp|nod (negative = nose up),ears(0 up..1 flat),eyes,brow,talk,mouth('open' shows teeth),shake,rot}
// Added for the Fox upgrade (off by default): reach (0..1 near foreleg stretched forward to touch something, paw at about x+185, y-70 at s 1),
// plant (with sit > 0: both front legs straight down from the shoulder to the ground, so the sit reads as sitting, not rearing)
function fox(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0, sit = P.sit || 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  ctx.translate(-60, 0); ctx.rotate(-0.55 * sit); ctx.translate(60, 0);
  // tail
  const tu = P.tailUp ?? 0.2, pf = P.puff || 1, tp = K.bezier([-78, -96], [-130, -96 - 40 * tu], [-150, -90 - 100 * tu], [-124 + Math.sin(ph * 0.5) * 8, -150 - 60 * tu], 14);
  const tw = (i) => (22 + 16 * Math.sin(Math.PI * i / tp.length)) * pf; for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], tw(i) + 10, C.black, 0); for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], tw(i), i > 11 ? C.white : FOXC, 0);
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.6, fx = x + Math.sin(a) * 34, lift = a > 0 ? a * 24 : 0; seg(ctx, x, -70, fx, -12 - lift, 18, far ? FOXD : FOXC, 4.5); shape(ctx, ell(fx + 8, -8 - lift, 20, 9, 12), C.black, { lw: 3, seed: 3 }); };
  const planted = P.plant && sit > 0; leg(-56, 0, true); if (!planted) leg(52, Math.PI, true);
  shape(ctx, ell(0, -92, 90, 44, 30), FOXC, { lw: 7, seed: 5, dot: FOXD, pitch: 9, rad: 0.16, da: 0.5 });
  shape(ctx, ell(18, -76, 62, 24, 22), CREAM, { lw: 0 });
  leg(-30, Math.PI, false);
  if (planted) { /* front legs drawn after the head, unrotated */ }
  else if (P.reach) { const r = P.reach, px = K.lerp(66, 195, r), py = K.lerp(-12, -74, r); seg(ctx, 50, -80, px, py, 18, FOXC, 4.5); shape(ctx, ell(px + 8, py, 20, 9, 12), C.black, { lw: 3, seed: 3 }); }
  else if (P.raise) { const r = P.raise; seg(ctx, 50, -80, 50 + 52 * r, -80 - 30 * r - 20, 18, FOXC, 4.5); shape(ctx, ell(50 + 60 * r, -80 - 30 * r - 22, 20, 9, 12), C.black, { lw: 3, seed: 3 }); } else leg(66, 0, false);
  // head
  const hx = 92, hy = -128 + (P.drop || 0) + (P.shake ? Math.sin(P.shake * 60) * 2 : 0);
  seg(ctx, 66, -100, hx, hy + 10, 38, FOXC, 5);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.headUp ?? P.nod ?? 0);
  const ea = (P.ears || 0) * 0.9;
  for (const ex of [-16, 6]) { ctx.save(); ctx.translate(ex, -26); ctx.rotate(-0.1 - ea * 1.1 + (ex > 0 ? 0.35 : 0)); shape(ctx, [[-16, 6], [0, -50], [16, 6]], FOXC, { lw: 5, seed: 6 }); shape(ctx, [[-8, 0], [0, -30], [8, 0]], C.black, { lw: 0 }); ctx.restore(); }
  shape(ctx, [[-4, -22], [74, 6], [-4, 26]], FOXC, { lw: 6, seed: 7 });
  shape(ctx, ell(0, 0, 34, 30, 22), FOXC, { lw: 7, seed: 8, dot: FOXD, pitch: 8, rad: 0.15, da: 0.5 });
  shape(ctx, [[8, 8], [70, 8], [10, 30], [-8, 22]], CREAM, { lw: 0 });
  shape(ctx, ell(76, 4, 9, 8, 10), C.black, { lw: 3, seed: 9 });
  eyeAt(ctx, 18, -8, P.eyes || 'open', 0.8);
  if (P.brow) { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(6, -24 - P.brow * 5); ctx.lineTo(32, -24 + P.brow * 8); ctx.stroke(); ctx.restore(); }
  const tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, [[12, 14], [64, 12 + o * 4], [58, 18 + o * 26], [18, 22 + o * 12]], C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(40, 20 + o * 14, 14, 4 + o * 5, 0, 0, 7); ctx.fill(); if (m === 'open') { ctx.fillStyle = C.white; for (const tx of [26, 44]) { ctx.beginPath(); ctx.moveTo(tx, 14); ctx.lineTo(tx + 6, 14); ctx.lineTo(tx + 3, 22); ctx.fill(); } } }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(34, 30, 14, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(34, 8, 16, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(14, 16); ctx.lineTo(60, 14); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  if (planted) { const a = -0.55 * sit; ctx.translate(-60, 0); ctx.rotate(-a); ctx.translate(60, 0); const sh = (lx, ly) => [-60 + (lx + 60) * Math.cos(a) - ly * Math.sin(a), (lx + 60) * Math.sin(a) + ly * Math.cos(a)];
    for (const [lx, far] of [[52, true], [66, false]]) { const [sx, sy] = sh(lx, -70); seg(ctx, sx, sy, sx + 4, -12, 18, far ? FOXD : FOXC, 4.5); shape(ctx, ell(sx + 12, -8, 20, 9, 12), C.black, { lw: 3, seed: 3 }); } }
  ctx.restore();
}
