// EXAMPLE CHARACTERS (optional, from "The Monkey and the Turtle"): monkey(ctx,P), turtle(ctx,P), heart(), fig().
// Not loaded by default: add "monkey-turtle" to "characters" in halftone.config.json. Needs the enhanced helpers (shape, seg, ell, eyeAt, ink...).
// Pose parameters are documented inline (P.eat, P.aL/P.aR arm angles, P.eyes, P.mouth, P.talk). Original file: animals.js, unchanged except the removed colour constants noted below.
// ===== animals + props for the monkey and turtle story =====
const FUR = '#b9722a', FURD = '#8a501a', FURL = '#f2d2a0', FIGC = '#7a2a7a';   // GREEN/GREEN2/GREEND now live in helpers.js
function heart(ctx, x, y, r, fill = C.red, lw = 5) {
  const pts = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; pts.push([x + r * 0.07 * 16 * Math.pow(Math.sin(a), 3), y - r * 0.07 * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))]); }
  shape(ctx, pts, fill, { lw, seed: 5 });
}
function fig(ctx, x, y, r = 16, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  shape(ctx, [[-r * 0.25, -r * 1.35], [r * 0.25, -r * 1.35], [r * 0.3, -r * 0.7], [-r * 0.3, -r * 0.7]], GREEN, { lw: 3.5, seed: 3 });
  shape(ctx, ell(0, 0, r * 0.85, r, 20), FIGC, { lw: 4.5, seed: 4, dot: C.white, pitch: 6, rad: 0.18, da: 0.5 }); ctx.restore();
}
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
  const hL = arm(-1, P.aL); const hR = arm(1, aR); P.hR = hR;
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
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(6, my + 12, 12, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-4, my + 2); ctx.lineTo(16, my + 2); ctx.stroke(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}
// turtle: x,y = belly-bottom contact; faces dir (float, flips by squashing); ext = head out 0..1
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
