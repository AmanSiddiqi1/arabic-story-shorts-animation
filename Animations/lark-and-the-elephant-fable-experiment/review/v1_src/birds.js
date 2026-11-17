// ===== birds, elephant, frogs, nest for the lark and the elephant =====
const GREEN = '#3f9d4a', GREEN2 = '#6cc35a', GREEND = '#2b7a38', ELEPH = '#8aa2c8', ELEPHD = '#5f78a6';
const BIRD = { lark: { body: '#a8741a', belly: '#f2d2a0', wing: '#7a4e12', beak: C.yellow }, crow: { body: '#2a2a33', belly: '#3d3d4a', wing: '#1a1a22', beak: '#d9a441' }, y: { body: C.yellow, belly: '#fff3b0', wing: '#e0a800', beak: C.red }, r: { body: C.red, belly: '#ff9a8a', wing: '#a8160f', beak: C.yellow }, b: { body: '#4a86f0', belly: '#bcd6ff', wing: '#1d4fb0', beak: C.yellow } };
// eye with gaze direction and upper lid (Fable review: eye lines and lids). lx/ly in -1..1, lid 0 open .. 1 shut
function eye2(ctx, x, y, mode, lx = 0.8, ly = 0, lid = 0, skin = C.white, wet = false) {
  if (mode === 'shut' || lid >= 0.95) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y - 3, 9, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); return; }
  const big = mode === 'wide', rx = big ? 12.5 : 9, ry = big ? 16 : 11.5, pts = ell(x, y, rx, ry, 20);
  shape(ctx, pts, C.white, { lw: 3.5, seed: 2 });
  const pr = big ? 3.8 : 4.6, px = x + lx * (rx - pr - 1.5), py = y + 1 + ly * (ry - pr - 2);
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
  if (wet) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px + 1.5, py - 1.6, 1.6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(x - rx * 0.35, y + ry * 0.55, 2.2, 0, 7); ctx.fillStyle = '#9cc4ff'; ctx.fill(); }
  if (lid > 0.02) { const ly0 = y - ry + 2 * ry * lid; ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.fillStyle = skin; ctx.fillRect(x - rx - 2, y - ry - 3, 2 * rx + 4, ly0 - (y - ry - 3)); ctx.restore();
    ctx.save(); ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); const hw = rx * Math.sqrt(Math.max(0, 1 - Math.pow((ly0 - y) / ry, 2))); ctx.moveTo(x - hw - 1, ly0); ctx.lineTo(x + hw + 1, ly0); ctx.stroke(); ctx.restore(); }
}
function bird(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, c = BIRD[P.kind || 'lark'], fl = P.flap ?? 0;
  ctx.save(); ctx.translate(P.x + (P.shake || 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  if (!P.fly) for (const sd of [-1, 1]) seg(ctx, sd * 8, -14, sd * 10 + 2, 0, 5, C.yellow, 3);
  const sq = P.sq ?? 1; if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq);
  shape(ctx, [[-30, -44], [-70, -62 - fl * 6], [-72, -40], [-62, -28], [-30, -34]], c.wing, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -40, 36, 28, 24), c.body, { lw: 5, seed: 3, dot: C.black, pitch: 8, rad: 0.14, da: 0.4 });
  shape(ctx, ell(8, -32, 22, 17, 18), c.belly, { lw: 0 });
  ctx.save(); ctx.translate(-4, -50); ctx.rotate(-0.9 * fl - 0.2 + (P.sag || 0) * 0.9); shape(ctx, ell(-6, 4, 28, 13, 16), c.wing, { lw: 4.5, seed: 4 }); ctx.restore();
  const hx = 32, hy = -64 + (P.drop || 0), hr = P.headRot || 0;
  ctx.save(); if (hr) { ctx.translate(hx - 14, hy + 16); ctx.rotate(hr); ctx.translate(-(hx - 14), -(hy + 16)); }
  const cd = P.crest || 0;
  if (P.kind === 'lark') for (const a of [-0.5, -0.1, 0.3]) { const tx = K.lerp(hx + Math.sin(a) * 30 - 18, hx - 42 + a * 10, cd), ty = K.lerp(hy - 40 + Math.cos(a) * 4, hy - 14 + a * 10, cd); shape(ctx, [[hx - 6, hy - 16], [tx, ty], [hx + 6, hy - 18]], c.wing, { lw: 3.5, seed: 5 }); }
  shape(ctx, ell(hx, hy, 21, 20, 20), c.body, { lw: 5, seed: 6, dot: C.black, pitch: 8, rad: 0.14, da: 0.4 });
  const ob = P.beak || 0, bl = P.kind === 'crow' ? 34 : 24;
  shape(ctx, [[hx + 16, hy - 8], [hx + 16 + bl, hy - 2 - ob * 4], [hx + 16, hy + 1]], c.beak, { lw: 3.5, seed: 7 });
  if (ob > 0.1) shape(ctx, [[hx + 16, hy + 1], [hx + 14 + bl * 0.8, hy + 3 + ob * 9], [hx + 16, hy + 8]], c.beak, { lw: 3.5, seed: 8 });
  if (P.gaze) eye2(ctx, hx + 6, hy - 6, P.eyes || 'open', P.gaze[0], P.gaze[1], P.lid || 0, c.body, P.wet); else eyeAt(ctx, hx + 6, hy - 6, P.eyes || 'open', 0.8);
  if (P.brow) { ctx.save(); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx - 4, hy - 20 - P.brow * 2); ctx.lineTo(hx + 16, hy - 14 + P.brow * 5); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (P.tears) { // big tears running from the eye down to the grass, small splashes (local coords, feet at y 0)
    const ca = Math.cos(hr), sa = Math.sin(hr), ox = hx + 2 - (hx - 14), oy = hy + 4 - (hy + 16), ex = hx - 14 + ox * ca - oy * sa, ey = hy + 16 + ox * sa + oy * ca;
    for (let i = 0; i < 3; i++) { const u = ((P.tears * 1.25 + i / 3) % 1), x = ex + 6 + u * 14, y = K.lerp(ey + 14, -2, u * u), g = K.clamp(u / 0.18) * 0.75 + 0.25;
      ctx.save(); ctx.globalAlpha = u < 0.92 ? 1 : (1 - u) / 0.08; ctx.translate(x, y); ctx.scale(g, g); shape(ctx, [[0, -15], [7, 2], [0, 9], [-7, 2]], '#5fa0ff', { lw: 3, seed: 7 }); ctx.restore();
      if (u > 0.8) { const k = (u - 0.8) / 0.2; ctx.save(); ctx.globalAlpha = 1 - k; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.strokeStyle = '#5fa0ff'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sd * (6 + k * 10), -4 - k * 8); ctx.lineTo(x + sd * (10 + k * 16), -10 - k * 10); ctx.stroke(); } ctx.restore(); } }
  }
  ctx.restore();
}
function elephant(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s * (P.sq ?? 1));
  const bob = P.bob || 0;
  const leg = (x, sw, far) => { if (!far && sw === 0 && P.lift) return; const a = Math.sin(ph + sw) * amp * 0.5, fx = x + Math.sin(a) * 40; shape(ctx, [[x - 24, -130], [x + 24, -130], [fx + 28, -10 - (a > 0 ? a * 20 : 0)], [fx - 28, -10 - (a > 0 ? a * 20 : 0)]], far ? ELEPHD : ELEPH, { lw: 6, seed: 3 }); shape(ctx, ell(fx, -8 - (a > 0 ? a * 20 : 0), 32, 12, 14), '#e9e2d0', { lw: 4, seed: 4 }); };
  const liftLeg = (x, L) => { // raised near front leg: knee comes forward, foot hangs high with the sole and toenails showing
    const k = K.clamp(L / 100), kx = x + 20 + L * 0.5, ky = -96 - L * 0.22, fx = x + L * 0.35, fy = -10 - L * 0.8;
    shape(ctx, [[x - 26, -140], [x + 26, -140], [kx + 26, ky], [kx - 26, ky]], ELEPH, { lw: 6, seed: 3 });
    shape(ctx, [[kx - 26, ky - 4], [kx + 26, ky - 4], [fx + 28, fy - 6], [fx - 28, fy + 6]], ELEPH, { lw: 6, seed: 3 });
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(-0.55 * k); shape(ctx, ell(0, 0, 34, 12 + 12 * k, 18), '#d8ccb0', { lw: 5, seed: 4 }); for (const dx of [-17, 0, 17]) shape(ctx, ell(dx, -4 - 9 * k, 8, 6, 10), C.white, { lw: 3, seed: 6 }); ctx.restore(); };
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
  else if (P.gaze) eye2(ctx, hx + 38, hy - 22, e, P.gaze[0], P.gaze[1], P.lid || 0, ELEPH);
  else eyeAt(ctx, hx + 38, hy - 22, e, 0.6);
  if (e !== 'x' && P.brow) { ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(hx + 18, hy - 46 - P.brow * 6); ctx.lineTo(hx + 58, hy - 46 + P.brow * 8); ctx.stroke(); ctx.restore(); }
  if (P.tongue) shape(ctx, ell(hx + 62, hy + 70, 12, 22, 12), C.red, { lw: 4, seed: 9 });
  ctx.restore();
  if (P.lift) liftLeg(115, P.lift);   // the raised foot is drawn last so it reads in front of the ear
  ctx.restore();
}
function frog(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, cr = P.croak || 0;
  ctx.save(); ctx.translate(P.x, P.y + (P.duck || 0)); ctx.scale(dir * s, s * (1 + cr * 0.05));
  shape(ctx, ell(-26, -10, 30, 12, 14), GREEN, { lw: 4, seed: 2 });
  shape(ctx, ell(0, -28, 34, 28, 22), GREEN2, { lw: 5, seed: 3, dot: GREEND, pitch: 7, rad: 0.16, da: 0.5 });
  shape(ctx, ell(0, -18, 22 + cr * 8, 12 + cr * 14, 16), '#f4f0a0', { lw: 0 });
  for (const ex of [-16, 14]) { shape(ctx, ell(ex, -54, 13, 13, 14), GREEN2, { lw: 4.5, seed: 4 }); if (P.gaze) eye2(ctx, ex + 1, -55, P.eyes || 'open', P.gaze[0], P.gaze[1], P.lid || 0, GREEN2); else eyeAt(ctx, ex + 1, -55, P.eyes || 'open', 0.5); }
  ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -34, 26, 0.12 * Math.PI, 0.88 * Math.PI); ctx.stroke(); ctx.restore();
  if (cr > 0.3) shape(ctx, ell(0, -24, 16, 6 + cr * 8, 14), C.black, { lw: 3, seed: 5 });
  ctx.restore();
}
// nest with growth nb 0..1, eggs 0..3, chicks 0..3, ruin 0..1 (crushed)
function nestDraw(ctx, x, y, o) {
  ctx.save(); ctx.translate(x, y); if (o.rock) ctx.rotate(o.rock);
  const nb = o.nb ?? 1, ru = o.ruin || 0;
  if (o.ruinT != null) { nestRuin(ctx, o.ruinT, o.nudge || 0); ctx.restore(); return; }
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
    if (i < ch && o.ck) { chickActing(ctx, ex, -34 - hh * 0.4, i, o.ck[i]); }
    else if (i < ch) { const u = K.clamp(o.hatch?.[i] ?? 1); const bob = Math.sin((o.t || 0) * 6 + i) * 3; shape(ctx, ell(ex, -34 - hh * 0.4 - bob, 15, 14, 16), C.yellow, { lw: 4, seed: 5 + i }); shape(ctx, [[ex + 10, -36 - hh * 0.4 - bob], [ex + 24, -33 - hh * 0.4 - bob + (o.feed ? 5 : 0)], [ex + 10, -30 - hh * 0.4 - bob]], C.red, { lw: 2.5 }); if (o.feed) shape(ctx, ell(ex + 15, -33 - hh * 0.4 - bob, 7, 6, 10), C.black, { lw: 0 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + 5, -38 - hh * 0.4 - bob, 2.5, 0, 7); ctx.fill(); }
    else if (i < eggs) { const u = K.ease.back(K.clamp(o.egg?.[i] ?? 1)); shape(ctx, ell(ex, -30 - hh * 0.35, 15 * u, 19 * u, 16), C.white, { lw: 4, seed: 5 + i, dot: C.skin, pitch: 6, rad: 0.2, da: 0.5 }); } }
  shape(ctx, [[-62, -22], [-54, -22 - hh * 0.3 + 16], [-30, -4], [30, -4], [54, -22 - hh * 0.3 + 16], [62, -22], [50, 0], [-50, 0]], '#d9a441', { lw: 6, seed: 9, dot: '#6e4a0a', pitch: 8, rad: 0.18, da: 0.6 });
  for (let i = 0; i < 6; i++) seg(ctx, -40 + i * 16, -3, -34 + i * 16 + 8, -17, 4, '#f2d27a', 2);
  ctx.restore();
}
function worm(ctx, x, y, t) { for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x - i * 5, y + Math.sin(t * 9 + i) * 2.5, 4.5, 0, 7); ctx.fillStyle = C.red; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.stroke(); } }
function soundArcs(ctx, x, y, dirx, t, col = C.white) { for (let i = 0; i < 3; i++) { const u = ((t * 1.6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, 20 + u * 60, dirx > 0 ? -0.7 : Math.PI - 0.7, dirx > 0 ? 0.7 : Math.PI + 0.7); ctx.stroke(); ctx.restore(); } }

// a chick with acting: k = {bob, gx, gy, wide, open, cw (cower 0..1), hop}
function chickActing(ctx, ex, cy, i, k) {
  const x = ex + (k.cw || 0) * (10 - i * 3), y = cy - (k.bob || 0) - (k.hop || 0) + (k.cw || 0) * 5, sy = 1 - (k.cw || 0) * 0.18;
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + (1 - sy) * 0.6, sy);
  shape(ctx, ell(0, 0, 15, 14, 16), C.yellow, { lw: 4, seed: 5 + i });
  const op = k.open || 0; shape(ctx, [[10, -2], [24, 1 - op * 4], [10, 4]], C.red, { lw: 2.5 }); if (op > 0.1) shape(ctx, [[10, 3], [21, 6 + op * 6], [10, 8]], C.red, { lw: 2.5 });
  const r = k.wide ? 6.5 : 4.8; shape(ctx, ell(4, -5, r, r + 1, 12), C.white, { lw: 2.5, seed: 3 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(4 + (k.gx || 0) * (r - 2.6), -5 + (k.gy || 0) * (r - 2.4), 2.3, 0, 7); ctx.fill();
  ctx.restore();
}
// the crushed nest. ts = seconds since the stomp. Shells and straw fly on arcs with one bounce and come to rest
// exactly where the original static ruin had them, so later scenes are unchanged.
function nestRuin(ctx, ts, nudge) {
  shape(ctx, ell(0, -4, 64, 9, 20), '#b0801a', { lw: 4, seed: 2 });
  for (let i = 0; i < 9; i++) { const a = i * 0.7; seg(ctx, Math.cos(a) * 30, -6, Math.cos(a) * 60 + (i - 4) * 8, -10 - (i % 3) * 5, 4, '#d9a441', 2); }
  const fly = (i, x1, y1, h, dur) => { const u = K.clamp(ts / dur); if (u < 0.78) { const v = u / 0.78; return [x1 * 0.88 * v, -14 + (y1 + 14) * v - h * 4 * v * (1 - v)]; } const v = (u - 0.78) / 0.22; return [x1 * (0.88 + 0.12 * v), y1 - h * 0.18 * 4 * v * (1 - v)]; };
  for (let i = 0; i < 4; i++) { const tx = [-96, -70, 84, 108][i], [sx, sy] = fly(i, tx, -6, 70 + i * 14, 0.75 + i * 0.06), a = ts < 0.9 ? ts * (6 + i * 2) : (0.9 * (6 + i * 2)); ctx.save(); ctx.translate(sx, sy); ctx.rotate(a); seg(ctx, -9, 0, 9, 0, 4, '#f2d27a', 2); ctx.restore(); }
  for (let i = 0; i < 5; i++) { const [hx, hy] = fly(i, (i - 2) * 38, -14, 50 + Math.abs(i - 2) * 16, 0.7 + i * 0.05), rk = i === 3 ? nudge : 0;
    ctx.save(); ctx.translate(hx, hy + 2); ctx.rotate(rk + (ts < 0.7 ? Math.sin(ts * 20 + i) * 0.6 * (1 - ts / 0.7) : 0)); ctx.translate(-hx, -hy - 2);
    shape(ctx, [[hx - 10, hy], [hx - 4, hy - 8], [hx + 2, hy], [hx + 6, hy - 6], [hx + 10, hy + 4], [hx - 10, hy + 4]], C.white, { lw: 3, seed: 3 + i }); ctx.restore(); }
}
