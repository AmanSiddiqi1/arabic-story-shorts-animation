// ===== birds, elephant, frogs, nest for the lark and the elephant =====
const GREEN = '#3f9d4a', GREEN2 = '#6cc35a', GREEND = '#2b7a38', ELEPH = '#8aa2c8', ELEPHD = '#5f78a6';
const BIRD = { lark: { body: '#a8741a', belly: '#f2d2a0', wing: '#7a4e12', beak: C.yellow }, crow: { body: '#2a2a33', belly: '#3d3d4a', wing: '#1a1a22', beak: '#d9a441' }, y: { body: C.yellow, belly: '#fff3b0', wing: '#e0a800', beak: C.red }, r: { body: C.red, belly: '#ff9a8a', wing: '#a8160f', beak: C.yellow }, b: { body: '#4a86f0', belly: '#bcd6ff', wing: '#1d4fb0', beak: C.yellow } };
function bird(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, c = BIRD[P.kind || 'lark'], fl = P.flap ?? 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (!P.fly) for (const sd of [-1, 1]) seg(ctx, sd * 8, -14, sd * 10 + 2, 0, 5, C.yellow, 3);
  shape(ctx, [[-30, -44], [-70, -62 - fl * 6], [-72, -40], [-62, -28], [-30, -34]], c.wing, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -40, 36, 28, 24), c.body, { lw: 5, seed: 3, dot: C.black, pitch: 8, rad: 0.14, da: 0.4 });
  shape(ctx, ell(8, -32, 22, 17, 18), c.belly, { lw: 0 });
  ctx.save(); ctx.translate(-4, -50); ctx.rotate(-0.9 * fl - 0.2); shape(ctx, ell(-6, 4, 28, 13, 16), c.wing, { lw: 4.5, seed: 4 }); ctx.restore();
  const hx = 32, hy = -64 + (P.drop || 0);
  if (P.kind === 'lark') for (const a of [-0.5, -0.1, 0.3]) shape(ctx, [[hx - 6, hy - 16], [hx + Math.sin(a) * 30 - 18, hy - 40 + Math.cos(a) * 4], [hx + 6, hy - 18]], c.wing, { lw: 3.5, seed: 5 });
  shape(ctx, ell(hx, hy, 21, 20, 20), c.body, { lw: 5, seed: 6, dot: C.black, pitch: 8, rad: 0.14, da: 0.4 });
  const ob = P.beak || 0, bl = P.kind === 'crow' ? 34 : 24;
  shape(ctx, [[hx + 16, hy - 8], [hx + 16 + bl, hy - 2 - ob * 4], [hx + 16, hy + 1]], c.beak, { lw: 3.5, seed: 7 });
  if (ob > 0.1) shape(ctx, [[hx + 16, hy + 1], [hx + 14 + bl * 0.8, hy + 3 + ob * 9], [hx + 16, hy + 8]], c.beak, { lw: 3.5, seed: 8 });
  eyeAt(ctx, hx + 6, hy - 6, P.eyes || 'open', 0.8);
  if (P.brow) { ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 4, hy - 20 - P.brow * 2); ctx.lineTo(hx + 16, hy - 14 + P.brow * 5); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function elephant(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.5, fx = x + Math.sin(a) * 40; shape(ctx, [[x - 24, -130], [x + 24, -130], [fx + 28, -10 - (a > 0 ? a * 20 : 0)], [fx - 28, -10 - (a > 0 ? a * 20 : 0)]], far ? ELEPHD : ELEPH, { lw: 6, seed: 3 }); shape(ctx, ell(fx, -8 - (a > 0 ? a * 20 : 0), 32, 12, 14), '#e9e2d0', { lw: 4, seed: 4 }); };
  leg(-90, 0, true); leg(80, Math.PI, true);
  shape(ctx, [[-150, -200], [-176, -150], [-168, -150], [-160, -120]], ELEPHD, { lw: 4, seed: 9 });
  shape(ctx, ell(0, -190, 160, 112, 36), ELEPH, { lw: 8, seed: 5, dot: ELEPHD, pitch: 9, rad: 0.16, da: 0.5 });
  leg(-50, Math.PI, false); leg(115, 0, false);
  const hx = 152, hy = -214 + (P.drop || 0);
  // trunk
  const tr = P.trunk ?? 0, tp = K.bezier([hx + 52, hy + 12], [hx + 96, hy + 52 - tr * 70], [hx + 70 + tr * 30, hy + 130 - tr * 160], [hx + 96 + tr * 40, hy + 156 - tr * 230], 14);
  for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], 44 - i * 1.6, ELEPH, 5.5);
  shape(ctx, ell(hx, hy, 80, 78, 30), ELEPH, { lw: 8, seed: 6, dot: ELEPHD, pitch: 9, rad: 0.16, da: 0.5 });
  const ea = Math.sin(ph * 2 + 1) * 0.15 * (P.flapEar ?? 0.4) + (P.earUp || 0);
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
}
function frog(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, cr = P.croak || 0;
  ctx.save(); ctx.translate(P.x, P.y); ctx.scale(dir * s, s * (1 + cr * 0.05));
  shape(ctx, ell(-26, -10, 30, 12, 14), GREEN, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -28, 34, 28, 22), GREEN2, { lw: 5, seed: 3, dot: GREEND, pitch: 7, rad: 0.16, da: 0.5 });
  shape(ctx, ell(0, -18, 22 + cr * 8, 12 + cr * 14, 16), '#f4f0a0', { lw: 0 });
  for (const ex of [-16, 14]) { shape(ctx, ell(ex, -54, 13, 13, 14), GREEN2, { lw: 4.5, seed: 4 }); eyeAt(ctx, ex + 1, -55, P.eyes || 'open', 0.5); }
  ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -34, 26, 0.12 * Math.PI, 0.88 * Math.PI); ctx.stroke(); ctx.restore();
  if (cr > 0.3) shape(ctx, ell(0, -24, 16, 6 + cr * 8, 14), C.black, { lw: 3, seed: 5 });
  ctx.restore();
}
// nest with growth nb 0..1, eggs 0..3, chicks 0..3, ruin 0..1 (crushed)
function nestDraw(ctx, x, y, o) {
  ctx.save(); ctx.translate(x, y);
  const nb = o.nb ?? 1, ru = o.ruin || 0;
  if (ru > 0.01) { // flattened nest + scattered shells and straw
    shape(ctx, ell(0, -4, 64, 9, 20), '#b0801a', { lw: 4, seed: 2 });
    for (let i = 0; i < 9; i++) { const a = i * 0.7; seg(ctx, Math.cos(a) * 30, -6, Math.cos(a) * 60 + (i - 4) * 8, -10 - (i % 3) * 5, 4, '#d9a441', 2); }
    for (let i = 0; i < 5; i++) { const u = K.ease.out(ru), hx = (i - 2) * 38 * u, hy = -14 - 26 * Math.sin(Math.PI * u) * (1 - i * 0.1); shape(ctx, [[hx - 10, hy], [hx - 4, hy - 8], [hx + 2, hy], [hx + 6, hy - 6], [hx + 10, hy + 4], [hx - 10, hy + 4]], C.white, { lw: 3, seed: 3 + i }); }
    ctx.restore(); return;
  }
  const bowl = [[-62, -22], [-50, 0], [50, 0], [62, -22]]; const hh = 38 * nb;
  const back = [[-62, -22], [-56, -22 - hh * 0.5], [-36, -22 - hh], [36, -22 - hh], [56, -22 - hh * 0.5], [62, -22]];
  const eggs = o.eggs || 0, ch = o.chicks || 0;
  shape(ctx, [...back, [50, 0], [-50, 0]], '#c9952a', { lw: 6, seed: 4, dot: '#6e4a0a', pitch: 8, rad: 0.18, da: 0.6 });
  for (let i = 0; i < 3; i++) { const ex = (i - 1) * 32;
    if (i < ch) { const u = K.clamp(o.hatch?.[i] ?? 1); const bob = Math.sin((o.t || 0) * 6 + i) * 3; shape(ctx, ell(ex, -34 - hh * 0.4 - bob, 15, 14, 16), C.yellow, { lw: 4, seed: 5 + i }); shape(ctx, [[ex + 10, -36 - hh * 0.4 - bob], [ex + 24, -33 - hh * 0.4 - bob + (o.feed ? 5 : 0)], [ex + 10, -30 - hh * 0.4 - bob]], C.red, { lw: 2.5 }); if (o.feed) shape(ctx, ell(ex + 15, -33 - hh * 0.4 - bob, 7, 6, 10), C.black, { lw: 0 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + 5, -38 - hh * 0.4 - bob, 2.5, 0, 7); ctx.fill(); }
    else if (i < eggs) { const u = K.ease.back(K.clamp(o.egg?.[i] ?? 1)); shape(ctx, ell(ex, -30 - hh * 0.35, 15 * u, 19 * u, 16), C.white, { lw: 4, seed: 5 + i, dot: C.skin, pitch: 6, rad: 0.2, da: 0.5 }); } }
  shape(ctx, [[-62, -22], [-54, -22 - hh * 0.3 + 16], [-30, -4], [30, -4], [54, -22 - hh * 0.3 + 16], [62, -22], [50, 0], [-50, 0]], '#d9a441', { lw: 6, seed: 9, dot: '#6e4a0a', pitch: 8, rad: 0.18, da: 0.6 });
  for (let i = 0; i < 6; i++) seg(ctx, -40 + i * 16, -3, -34 + i * 16 + 8, -17, 4, '#f2d27a', 2);
  ctx.restore();
}
function worm(ctx, x, y, t) { for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x - i * 5, y + Math.sin(t * 9 + i) * 2.5, 4.5, 0, 7); ctx.fillStyle = C.red; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.stroke(); } }
function soundArcs(ctx, x, y, dirx, t, col = C.white) { for (let i = 0; i < 3; i++) { const u = ((t * 1.6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, 20 + u * 60, dirx > 0 ? -0.7 : Math.PI - 0.7, dirx > 0 ? 0.7 : Math.PI + 0.7); ctx.stroke(); ctx.restore(); } }
