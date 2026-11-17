// ===== turtle (big, from The Monkey and the Turtle) and tortoise (small, hides in its shell, from The Lion and the Hare) =====
// turtle P: {x,y (belly contact),s,dir,rot,ph (paddle/bob),paddle,ext(0..1 head out),drop,tilt,shell(colour),wife,eyes,brow (+ angry, - raised/worried),talk,mouth (closed, smile, smirk, frown, open)}
// tortoise P: {x,y,s,dir,ph,amp,hide(0 out..1 in shell),eyes,mouth,shake}
function turtle(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, sh = P.shell || GREEN;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const bob = Math.sin(ph) * 5, ext = P.ext ?? 1;
  // far flippers + tail
  shape(ctx, [[-112, -34], [-146, -26], [-112, -16]], GREEN2, { lw: 4, seed: 6 });
  for (const [fx, sw] of [[-62, 1], [64, -1]]) { ctx.save(); ctx.translate(fx, -14); ctx.rotate(Math.sin(ph * 1.5) * 0.45 * sw * (P.paddle ?? 1)); shape(ctx, ell(8, 8, 36, 14, 18), GREEN2, { lw: 5, seed: 12 }); ctx.restore(); }
  // head + neck
  const hx = 96 + ext * 38, hy = -52 + (P.drop || 0) + bob * 0.4;
  seg(ctx, 80, -46, hx, hy + 4, 30, GREEN2, 5);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.tilt || 0);
  shape(ctx, ell(0, 0, 40, 36, 26), GREEN2, { lw: 6, seed: 13, dot: GREEND, pitch: 7, rad: 0.18, da: 0.45 });
  if (P.wife) { shape(ctx, [[-6, -34], [-30, -58], [-30, -26]], C.red, { lw: 4, seed: 14 }); shape(ctx, [[-6, -34], [18, -58], [18, -26]], C.red, { lw: 4, seed: 15 }); shape(ctx, ell(-6, -34, 8, 8, 10), C.yellow, { lw: 3 }); }
  const eyes = P.eyes || 'open'; eyeAt(ctx, 14, -9, eyes, 0.8); if (P.wife) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(24, -18); ctx.lineTo(32, -24); ctx.stroke(); ctx.restore(); }
  if (P.brow) { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(2, -26 - P.brow * 7); ctx.lineTo(26, -26 + P.brow * 8); ctx.stroke(); ctx.restore(); }
  const my = 14, tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(20, my + 2, 12, 3 + 8 * o, 14), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(20, my + 4 + 3 * o, 7, 2 + 3 * o, 0, 0, 7); ctx.fill(); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(20, my - 8, 15, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(8, my + 3); ctx.quadraticCurveTo(24, my + 6, 34, my - 4); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(20, my + 12, 12, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(8, my + 2); ctx.lineTo(32, my + 2); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // belly + shell
  shape(ctx, [[-112, -34], [112, -34], [104, -4], [-104, -4]], C.yellow, { lw: 6, seed: 16, dot: C.red, pitch: 8, rad: 0.18, da: 0.35 });
  const dome = []; for (let i = 0; i <= 30; i++) { const a = Math.PI + (i / 30) * Math.PI; dome.push([Math.cos(a) * 112, -34 + Math.sin(a) * 84]); }
  ctx.save(); K.poly(ctx, dome, true); ctx.fillStyle = sh; ctx.fill(); ctx.clip();
  ctx.fillStyle = dotPat(ctx, C.black, 8, 0.16); ctx.globalAlpha = 0.4; ctx.fillRect(-120, -130, 240, 100); ctx.globalAlpha = 1;
  for (const [cx, cy] of [[0, -88], [-52, -66], [52, -66], [-84, -44], [0, -50], [84, -44]]) { const hex = []; for (let i = 0; i <= 6; i++) hex.push([cx + Math.cos(i * Math.PI / 3) * 27, cy + Math.sin(i * Math.PI / 3) * 24]); K.poly(ctx, hex, true); ctx.lineWidth = 4.5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fill(); }
  ctx.restore(); ink(ctx, dome, 7, 17);
  ctx.restore();
}
function tortoise(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, h = K.clamp(P.hide || 0), ph = P.ph || 0, amp = P.amp || 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 2.5 : 0), P.y); ctx.scale(dir * s, s);
  for (const lx of [-34, 30]) shape(ctx, ell(lx + Math.sin(ph + lx) * amp * 9, -8, 17 * (1 - h * 0.85), 12, 12), GREEN2, { lw: 4, seed: 3 });
  const hx = K.lerp(66, 26, h);
  if (h < 0.92) { seg(ctx, 36, -26, hx, -36, 20, GREEN2, 4.5); shape(ctx, ell(hx + 8, -40, 22, 19, 16), GREEN2, { lw: 5, seed: 4 }); eyeAt(ctx, hx + 12, -44, P.eyes || 'open', 0.8); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 3.5; ctx.beginPath(); if (P.mouth === 'smile') ctx.arc(hx + 16, -38, 10, 0.25 * Math.PI, 0.8 * Math.PI); else { ctx.moveTo(hx + 12, -29); ctx.lineTo(hx + 24, -30); } ctx.stroke(); ctx.restore(); }
  const sp = []; for (let i = 0; i <= 24; i++) { const a = Math.PI + i / 24 * Math.PI; sp.push([Math.cos(a) * 62, -16 + Math.sin(a) * 66]); } sp.push(sp[0]);
  shape(ctx, sp, GREEND, { lw: 7, seed: 5, dot: GREEN2, pitch: 12, rad: 0.3, da: 0.9 });
  shape(ctx, [[-66, -20], [66, -20], [66, -8], [-66, -8], [-66, -20]], '#d9a441', { lw: 4, seed: 6 });
  ctx.restore();
}
