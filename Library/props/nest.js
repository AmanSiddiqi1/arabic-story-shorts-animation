// ===== nest, chicks, crushed nest, worm. From The Lark and the Elephant (+ Fable experiment). =====
// nestDraw(ctx,x,y,o) o: {nb(0..1 built),t,eggs(0..3),egg[i](0..1 pop-in),chicks(0..3),feed,rock,ck[i]: {bob,gx,gy,wide,open,cw,hop},ruinT(seconds since crushed),nudge}
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
function chickActing(ctx, ex, cy, i, k) {
  const x = ex + (k.cw || 0) * (10 - i * 3), y = cy - (k.bob || 0) - (k.hop || 0) + (k.cw || 0) * 5, sy = 1 - (k.cw || 0) * 0.18;
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + (1 - sy) * 0.6, sy);
  shape(ctx, ell(0, 0, 15, 14, 16), C.yellow, { lw: 4, seed: 5 + i });
  const op = k.open || 0; shape(ctx, [[10, -2], [24, 1 - op * 4], [10, 4]], C.red, { lw: 2.5 }); if (op > 0.1) shape(ctx, [[10, 3], [21, 6 + op * 6], [10, 8]], C.red, { lw: 2.5 });
  const r = k.wide ? 6.5 : 4.8; shape(ctx, ell(4, -5, r, r + 1, 12), C.white, { lw: 2.5, seed: 3 });
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(4 + (k.gx || 0) * (r - 2.6), -5 + (k.gy || 0) * (r - 2.4), 2.3, 0, 7); ctx.fill();
  ctx.restore();
}
function nestRuin(ctx, ts, nudge) {
  shape(ctx, ell(0, -4, 64, 9, 20), '#b0801a', { lw: 4, seed: 2 });
  for (let i = 0; i < 9; i++) { const a = i * 0.7; seg(ctx, Math.cos(a) * 30, -6, Math.cos(a) * 60 + (i - 4) * 8, -10 - (i % 3) * 5, 4, '#d9a441', 2); }
  const fly = (i, x1, y1, h, dur) => { const u = K.clamp(ts / dur); if (u < 0.78) { const v = u / 0.78; return [x1 * 0.88 * v, -14 + (y1 + 14) * v - h * 4 * v * (1 - v)]; } const v = (u - 0.78) / 0.22; return [x1 * (0.88 + 0.12 * v), y1 - h * 0.18 * 4 * v * (1 - v)]; };
  for (let i = 0; i < 4; i++) { const tx = [-96, -70, 84, 108][i], [sx, sy] = fly(i, tx, -6, 70 + i * 14, 0.75 + i * 0.06), a = ts < 0.9 ? ts * (6 + i * 2) : (0.9 * (6 + i * 2)); ctx.save(); ctx.translate(sx, sy); ctx.rotate(a); seg(ctx, -9, 0, 9, 0, 4, '#f2d27a', 2); ctx.restore(); }
  for (let i = 0; i < 5; i++) { const [hx, hy] = fly(i, (i - 2) * 38, -14, 50 + Math.abs(i - 2) * 16, 0.7 + i * 0.05), rk = i === 1 ? nudge : 0;
    ctx.save(); ctx.translate(hx, hy + 2); ctx.rotate(rk + (ts < 0.7 ? Math.sin(ts * 20 + i) * 0.6 * (1 - ts / 0.7) : 0)); ctx.translate(-hx, -hy - 2);
    shape(ctx, [[hx - 10, hy], [hx - 4, hy - 8], [hx + 2, hy], [hx + 6, hy - 6], [hx + 10, hy + 4], [hx - 10, hy + 4]], C.white, { lw: 3, seed: 3 + i }); ctx.restore(); }
}
function worm(ctx, x, y, t) { for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x - i * 5, y + Math.sin(t * 9 + i) * 2.5, 4.5, 0, 7); ctx.fillStyle = C.red; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.stroke(); } }
