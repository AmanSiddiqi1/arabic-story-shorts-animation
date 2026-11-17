// ===== KD-008 sets: pond (level, wet ring, cracks, reeds), mud houses / village, air strip, lake =====
const KD8_MUD = '#b0692a', KD8_MUDD = '#7a4212', KD8_MUDL = '#d9a46a';
const KD8_POND = { cx: 540, cy: 992, rx: 330, ry: 96 };
// water ellipse for a level 1 (full) .. 0.14 (puddle at 560, 1000)
function kd8Water(level) { const f = K.clamp((level - 0.14) / 0.86); return { cx: K.lerp(560, 540, f), cy: K.lerp(1000, 992, f), rx: K.lerp(84, 316, f), ry: K.lerp(26, 90, f) }; }
// static land: trees, ground (hot = sun-baked tint). withSky: the dotted sky and hills behind
function kd8PondBack(hot, withSky = true) {
  return bake('kd8pond:' + hot + withSky, KD8_VW, KD8_VH, (x) => {
    if (withSky) { sky(x, { preset: hot ? 'dawn' : 'day' }); hillTrees(x); }
    treeRow(x, { hmin: 380, seed: 8 }); ground(x);
    if (hot) { x.save(); x.globalCompositeOperation = 'multiply'; x.fillStyle = '#f4d08a'; x.fillRect(0, 300, KD8_VW, KD8_VH); x.restore(); }
  });
}
// the pond itself (live): mud basin, old shoreline ring, water, cracks (0..1), stone
function kd8Pond(ctx, t, level, crk = 0, hot = false) {
  const P = KD8_POND, bas = ell(P.cx, P.cy, P.rx, P.ry, 48);
  shape(ctx, bas, hot ? KD8_MUDL : KD8_MUD, { lw: 7, seed: 90, dot: KD8_MUDD, pitch: 9, rad: 0.22, da: 0.5 });
  const W = kd8Water(level);
  if (level < 0.99) { // wet ring between the old shore and the water
    const wr = ell(K.lerp(W.cx, P.cx, 0.5), K.lerp(W.cy, P.cy, 0.5), K.lerp(W.rx, P.rx, 0.55) + 10, K.lerp(W.ry, P.ry, 0.55) + 4, 40);
    shape(ctx, wr, KD8_MUD, { lw: 0, dot: KD8_MUDD, pitch: 7, rad: 0.3, da: 0.7 });
  }
  if (crk > 0) { // cracks grow from the old shore inward
    const r = K.rng(77); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4;
    for (let i = 0; i < 26; i++) { const a = r() * Math.PI * 2, len = 0.3 + r() * 0.35, d0 = i / 26; const k = K.clamp((crk - d0 * 0.6) / 0.4); if (k <= 0) { r(); r(); continue; }
      ctx.beginPath(); let px = P.cx + Math.cos(a) * P.rx * 0.97, py = P.cy + Math.sin(a) * P.ry * 0.97; ctx.moveTo(px, py);
      for (let j = 1; j <= 4 * k; j++) { const f = 1 - len * j / 4; px = P.cx + Math.cos(a + (r() - 0.5) * 0.12) * P.rx * f; py = P.cy + Math.sin(a + (r() - 0.5) * 0.12) * P.ry * f; ctx.lineTo(px, py); }
      ctx.stroke(); }
    ctx.restore();
  }
  const wp = ell(W.cx, W.cy, W.rx, W.ry, 44);
  shape(ctx, wp, C.blue, { lw: 6, seed: 91, dot: C.white, pitch: 10, rad: 0.15, da: 0.55 });
  // glints
  ctx.save(); ctx.strokeStyle = C.white; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const gx = W.cx - W.rx * 0.6 + i * W.rx * 0.38 + Math.sin(t * 1.3 + i) * 8, gy = W.cy - W.ry * 0.3 + (i % 2) * W.ry * 0.35; if (W.rx > 120 || i === 1) { ctx.beginPath(); ctx.moveTo(gx - 14, gy); ctx.lineTo(gx + 14, gy); ctx.stroke(); } } ctx.restore();
  // stone on the left bank
  shape(ctx, [[150, 940], [168, 910], [230, 898], [300, 904], [330, 930], [316, 952], [180, 956]], STONE, { lw: 6, seed: 92, dot: STONED, pitch: 7, rad: 0.25, da: 0.45 });
}
// reeds around the pond: sway with t, droop 0..1 (dry)
function kd8Reeds(ctx, t, droop = 0, front = false) {
  const R = front ? [[205, 1010], [222, 1030], [858, 1012], [874, 1030]] : [[250, 905], [268, 900], [790, 902], [808, 906], [826, 912]];
  R.forEach(([x, y], i) => { const a = Math.sin(t * 1.4 + i * 1.7) * 0.06 + droop * (i % 2 ? 0.5 : -0.45), h = 74 + (i % 3) * 14;
    const tx = x + Math.sin(a) * h, ty = y - Math.cos(a) * h; seg(ctx, x, y, tx, ty, 5, droop > 0.5 ? '#9a8a2a' : KD8_SKIND, 2.5);
    shape(ctx, ell(tx, ty, 6, 14, 10), droop > 0.5 ? KD8_MUDD : '#7a4e12', { lw: 3, seed: 93 + i }); });
}
// a flat-roofed mud house; ground = bottom y; o: {door, win, chimney, col}
function kd8House(ctx, x0, x1, top, ground, o = {}) {
  const col = o.col || SANDL, sd = o.seed || 1;
  shape(ctx, [[x0, ground], [x0, top], [x1, top], [x1, ground]], col, { lw: 6, seed: sd, dot: SAND, pitch: 9, rad: 0.25, da: 0.55 });
  shape(ctx, [[x0 - 10, top + 16], [x0 - 10, top - 8], [x1 + 10, top - 8], [x1 + 10, top + 16]], KD8_MUDL, { lw: 5, seed: sd + 1 });
  for (let bx = x0 + 18; bx < x1 - 10; bx += 46) seg(ctx, bx, top + 24, bx, top + 26, 8, KD8_MUDD, 2);
  if (o.door) { const [dx, dw] = o.door, dh = Math.min(150, (ground - top) * 0.55); shape(ctx, [[dx - dw / 2, ground], [dx - dw / 2, ground - dh + dw / 2], [dx, ground - dh], [dx + dw / 2, ground - dh + dw / 2], [dx + dw / 2, ground]], o.doorCol || '#5b3a1e', { lw: 5, seed: sd + 2 }); }
  if (o.win) for (const [wx, wy, ww, wh] of o.win) shape(ctx, [[wx, wy], [wx + ww, wy], [wx + ww, wy + wh], [wx, wy + wh]], NAVY, { lw: 5, seed: sd + 3 });
  if (o.chimney) shape(ctx, [[o.chimney - 14, top - 8], [o.chimney - 14, top - 46], [o.chimney + 14, top - 46], [o.chimney + 14, top - 8]], KD8_MUD, { lw: 4, seed: sd + 4 });
}
// thin smoke thread from (x, y)
function kd8Smoke(ctx, x, y, t, n = 4) { ctx.save(); for (let i = 0; i < n; i++) { const u = ((t * 0.5 + i / n) % 1), r = 8 + u * 18; ctx.globalAlpha = 0.85 * (1 - u); shape(ctx, ell(x + Math.sin(u * 5 + i) * 10 + u * 20, y - u * 140, r, r * 0.8, 14), C.white, { lw: 3, seed: 95 + i }); } ctx.restore(); }
// village street (ground world 1000 x 1230, lane at 900): sky, hills, three houses
const KD8_VHOUSES = [[40, 330, 560, { win: [[220, 600, 64, 70]], seed: 11 }], [360, 640, 520, { door: [470, 90], win: [[560, 610, 50, 60]], seed: 21 }], [670, 980, 600, { door: [860, 110], seed: 31 }]];
function kd8VillageBack() {
  return bake('kd8village', KD8_VW, KD8_VH, (x) => {
    sky(x, { preset: 'day' }); hillTrees(x, { seed: 6 });
    shape(x, [[-10, 900], [1010, 900], [1010, 1240], [-10, 1240]], SANDL, { lw: 6, seed: 12, dot: SAND, pitch: 11, rad: 0.25, da: 0.6 });
    shape(x, [[-10, 1040], [1010, 1030], [1010, 1060], [-10, 1070]], SAND, { lw: 0 });
    for (const [a, b, top, o] of KD8_VHOUSES) kd8House(x, a, b, top, 904, o);
  });
}
// the far ground for the high-flight view (air world y >= 1500): patchwork, river thread, the old pond as a brown ring
function kd8Patchwork() {
  return bake('kd8patch', KD8_VW, 1100, (x) => {
    const cols = [GREEN, '#9ac44a', SANDL, GREEN2, '#c9a24a', GREEND], r = K.rng(31);
    x.fillStyle = '#9ac44a'; x.fillRect(0, 0, 1000, 1100);
    for (let row = 0; row < 7; row++) { let px = -40 - r() * 60; const y0 = row * 160 - 40, h = 160; while (px < 1040) { const w = 120 + r() * 160, c = cols[Math.floor(r() * cols.length)], sk = (r() - 0.5) * 40;
      shape(x, [[px, y0 + h], [px + sk, y0], [px + w + sk, y0], [px + w, y0 + h]], c, { lw: 4, seed: 100 + row, dot: C.black, pitch: 9, rad: 0.12, da: 0.25 }); px += w; } }
    x.save(); x.lineCap = 'round'; x.lineJoin = 'round'; const rv = [[-20, 160], [180, 260], [300, 460], [520, 520], [640, 760], [880, 860], [1030, 1000]];
    x.strokeStyle = C.black; x.lineWidth = 34; K.poly(x, rv); x.stroke(); x.strokeStyle = C.blue; x.lineWidth = 24; K.poly(x, rv); x.stroke(); x.restore();
    shape(x, ell(260, 760, 62, 26, 24), KD8_MUD, { lw: 5, seed: 120, dot: KD8_MUDD, pitch: 6, rad: 0.3, da: 0.5 });
    shape(x, ell(266, 764, 16, 7, 12), C.blue, { lw: 3, seed: 121 });
    for (const [hx, hy] of [[700, 300], [740, 330], [690, 350]]) shape(x, [[hx, hy], [hx + 30, hy], [hx + 30, hy + 22], [hx, hy + 22]], SANDL, { lw: 3, seed: 122 });
  });
}
// village seen from high above (air world): roofs row at y top 2240
function kd8VillageFar() {
  return bake('kd8vfar', KD8_VW, 700, (x) => {
    shape(x, [[-10, 120], [1010, 120], [1010, 710], [-10, 710]], SANDL, { lw: 0, dot: SAND, pitch: 11, rad: 0.25, da: 0.6 });
    hillTrees(x, { y: 130, seed: 3, n: 13 });
    for (const [a, b, top, sd] of [[-20, 180, 260, 41], [200, 420, 230, 42], [440, 640, 270, 43], [660, 840, 240, 44], [860, 1030, 260, 45]]) kd8House(x, a, b, top, 520, { seed: sd, win: [[a + 40, top + 60, 40, 46]] });
    shape(x, [[-10, 520], [1010, 520], [1010, 710], [-10, 710]], SANDL, { lw: 6, seed: 46, dot: SAND, pitch: 11, rad: 0.25, da: 0.6 });
  });
}
// big blue air (air world 1000 x 2600)
function kd8AirSky() { return bake('kd8air', KD8_VW, 2600, (x) => { x.fillStyle = C.blue; x.fillRect(0, 0, 1000, 2600); x.fillStyle = dotPat(x, SKYDOT, 13, 0.3); x.fillRect(0, 0, 1000, 2600); }); }
// lake at dusk (S11): sky + hills baked; water drawn live
function kd8LakeBack() { return bake('kd8lake', KD8_VW, KD8_VH, (x) => { sky(x, { preset: 'dusk' }); hillTrees(x, { y: 790, seed: 9 }); }); }
