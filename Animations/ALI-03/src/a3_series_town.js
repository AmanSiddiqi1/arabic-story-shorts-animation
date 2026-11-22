// ===== ALI-03 series set: townStreet (Ali Baba's narrow street), doorMark, oilJar + jarPannier + silverRing, dayToNight =====
// Written for episodes 3 to 6 (copy this file into the later episodes' src/ and extend there). Every name is prefixed TS / a3 or is
// one of the series names the plan gives (townStreet, doorMark, oilJar, jarPannier, silverRing, dayToNight).
// World: a 2000 x 1230 strip, ground y 900 (AB_GR), paving to y 1230. Colour models: day, afternoon, evening, night, night2.
// Every plate is baked once per model (sky layer + town layer); the live parts (doors, Ali Baba's window, lanterns, washing,
// the gate, the marks) are drawn over it each frame. Drawing is a pure function of its arguments (and t).

// ---------- anchors ----------
const TS = (() => {
  const door = (i, cx, col, line, ms = 1) => ({ i, cx, x0: cx - 60, x1: cx + 60, top: 650, col, line, mark: [cx + 90 * ms, 770], dot: [cx, 745] });   // v2: ms -1 puts the cross left of the door (door 5)
  return {
    w: 2000, gr: 900,
    arch: { x0: 0, x1: 220, o0: 50, o1: 190, top: 560, wallTop: 380 },
    doors: [door(1, 370, '#3f9a5a', '#1e5a34'), door(2, 660, '#9a4a9a', '#5a2a5a'), door(3, 930, '#8a5a3a', '#4a2a16'), door(4, 1580, '#e0a83a', '#8a5a14'), door(5, 1860, '#2a8a8a', '#14504e', -1)],
    houses: [   // x0, x1, roof y, wall colour, parapet colour, shutter colour
      { x0: 220, x1: 520, top: 330, col: '#f0c27a', par: '#d89a52', sh: '#2f9a8e' },
      { x0: 520, x1: 800, top: 280, col: '#f2a6b4', par: '#d07a8c', sh: '#3f7ad0' },
      { x0: 800, x1: 1180, top: 240, col: '#e0a888', par: '#c88a72', sh: '#3f7ad0' },   // Ali Baba's (the ALI-01 cottage wash)
      { x0: 1440, x1: 1720, top: 300, col: '#b8cce8', par: '#8aa2cc', sh: '#e8742a' },
      { x0: 1720, x1: 2000, top: 340, col: '#c8b0d8', par: '#a088b8', sh: '#e8364f' },
    ],
    win: { x: 1040, y: 430, w: 110, h: 120, cx: 1095, sill: 550 },   // Ali Baba's window (live: shutters, Morgiana)
    wall: { x0: 1180, x1: 1440, top: 600 }, gate: { cx: 1310, x0: 1220, x1: 1400, top: 660 },
    line: [[800, 404], [1180, 384]],
    lanterns: [[110, 590], [292, 640], [845, 640], [1790, 640]],
  };
})();
const tsDoor = (i) => TS.doors[i - 1];

// ---------- colour models ----------
const TS_MODEL = {
  day: { sky: [[0, '#4f94ec'], [0.3, '#8cc0f6'], [0.5, '#cfe6ff'], [0.62, '#fff2d6']], wallK: null, pave: ['#ecc896', '#c89a6a'], night: 0, glaze: ['#fff8e0', 1700, 160, 0.55], cloud: ['#ffffff', '#e0ecff'], far: '#a8b8dc', farD: '#8ea0c8' },
  afternoon: { sky: [[0, '#4f8ae0'], [0.32, '#9cc4f2'], [0.52, '#ffe4bc'], [0.62, '#ffd49a']], wallK: ['#ffd8a8', 0.22], pave: ['#f0c48a', '#c88e5a'], night: 0, glaze: ['#fff0c8', 1750, 330, 0.6], cloud: ['#fff6ea', '#ffd8b0'], far: '#c0b0d0', farD: '#a894c0' },
  evening: { sky: [[0, '#2f6f8e'], [0.22, '#6a74b8'], [0.42, '#ff9a9a'], [0.58, '#ffc27a']], wallK: ['#ffb4a0', 0.34], pave: ['#e8a88a', '#b07468'], night: 0.25, glaze: ['#ffb070', 260, 420, 0.6], cloud: ['#d89ac0', '#ffd0a0'], far: '#9a7ab0', farD: '#7a5a98' },
  night: { sky: [[0, '#2a4a8a'], [0.3, '#3e5aa0'], [0.5, '#7a6ab0'], [0.62, '#a47ab4']], wallK: ['#8a84d8', 0.55], pave: ['#9a8ab8', '#6a5a8a'], night: 1, glaze: ['#fff2c8', 1500, 210, 0.35], cloud: ['#6a6aa8', '#c8b8e8'], far: '#4e5a96', farD: '#3e4884' },
  // v2 (review 1 note 4): the second night is its own plate, cool blue-teal under a low amber moon (night 1 stays violet)
  night2: { sky: [[0, '#0e3452'], [0.3, '#1a5470'], [0.5, '#3a7a86'], [0.62, '#7aa090']], wallK: ['#3aa8c0', 0.62], pave: ['#7aa4b0', '#4a6e80'], night: 1, glaze: ['#ffb860', 700, 430, 0.5], cloud: ['#3e6a84', '#a8d0cc'], far: '#2e5a70', farD: '#244a60' },
};
function tsWall(m, col) { const M = TS_MODEL[m]; if (!M.wallK) return col; let c = abMul(col, M.wallK[0], M.wallK[1]); if (M.night) c = abLight(c, 0.1); return c; }
const tsLine = (col) => abDark(col, 0.6);

// ---------- the sky layer (2600 wide from world x -300; parallax 0.35 in tsSky) ----------
function tsSkyPlate(m) {
  return abBakeAt('ts:sky:' + m, 2600, 1230, (c, w) => {
    const M = TS_MODEL[m]; c.translate(300, 0); abGrad(c, -300, 0, w, 1230, M.sky);
    abGlaze(c, M.glaze[1], M.glaze[2], 620, M.glaze[0], M.glaze[3]);
    if (m === 'evening') { abGlaze(c, 260, 520, 900, '#ffcf8a', 0.45); }
    if (M.night) { const R = K.rng(m === 'night' ? 8 : 9); c.fillStyle = '#fff6ea'; for (let i = 0; i < 120; i++) { c.globalAlpha = 0.35 + R() * 0.6; const s = R() < 0.15 ? 3 : 2; c.fillRect(-300 + R() * w, R() * 520, s, s); } c.globalAlpha = 1; }
    const cl = m === 'night2' ? [[380, 300, 1.3], [1100, 200, 0.9], [1750, 330, 1.1]] : M.night ? [[300, 160, 0.9], [1150, 260, 0.7], [2000, 140, 1.0]] : [[250, 170, 1], [900, 110, 0.8], [1500, 210, 1.15], [2050, 130, 0.9]];
    for (const [x, y, s] of cl) abCloud(c, x, y, 380 * s, 86 * s, M.cloud[0], M.cloud[1], 9);
    // far skyline: roofs, a dome with a crescent finial, a minaret, two palms (soft, painted)
    const R = K.rng(14); c.save(); c.filter = 'blur(1.6px)';
    for (let x = -300; x < 2300; x += 60 + R() * 60) { const h = 60 + R() * 120, ww = 70 + R() * 80; c.fillStyle = R() < 0.5 ? M.far : M.farD; c.fillRect(x, 620 - h, ww, h + 400);
      if (M.night && R() < 0.5) { c.fillStyle = '#ffd98a'; c.fillRect(x + ww * 0.4, 640 - h + 20, 8, 10); } }
    c.fillStyle = M.farD; c.beginPath(); c.ellipse(1310, 470, 90, 96, 0, Math.PI, 0); c.fill(); c.fillRect(1220, 470, 180, 200); c.fillRect(1306, 350, 8, 30);
    c.fillRect(560, 160, 34, 500); c.beginPath(); c.ellipse(577, 160, 26, 34, 0, Math.PI, 0); c.fill(); c.fillRect(548, 250, 58, 14);
    c.restore();
    c.save(); c.globalAlpha = 0.9; for (const [x, s] of [[1250, 0.5], [1395, 0.42]]) palmTree(c, x, 640, { s, lean: x > 1300 ? -14 : 12, fronds: 8, nuts: 0 }); c.restore();
    if (M.night) { c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(120,120,200,0.35)'; c.fillRect(1150, 300, 360, 400); c.restore(); }
  });
}
// sky bodies drawn live (sun or moon: the time-lapses move them); world coords, before the town layer
function tsSun(ctx, x, y, k = 1, col = '#fff1b0') { if (k > 0.01) abSun(ctx, x, y, 62, col, '#ffd08a', k); }
function tsMoon(ctx, x, y, k = 1, r = 70) { if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; abGlow(ctx, x, y, r * 4, 0.55, '#fff2c8'); celShade(ctx, ell(x, y, r, r, 40), '#fff4d0', '#e8d29a', { light: [-1, -1], off: r * 0.2, lw: 0 });
  for (const [dx, dy, rr] of [[-20, -14, 12], [18, 16, 9], [26, -24, 6]]) { ctx.fillStyle = 'rgba(214,190,130,0.55)'; ctx.beginPath(); ctx.ellipse(x + dx, y + dy, rr, rr * 0.8, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function tsSky(ctx, cam, m, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(tsSkyPlate(m), -300 + (cam.x - 1000) * 0.35, 0); ctx.restore(); }

// ---------- doors, arch, window, gate (shared by the bake and the live pass) ----------
// a3Door(ctx, d, open, m, o): pointed doorway 120 x 250 with a stone frame and step; leaf hinged left, open 0..1 narrows it;
// o.lit 0..1 warm lamplight inside (evening, night), o.inside(ctx) figures in the doorway (clipped)
function a3Door(ctx, d, open, m, o = {}) {
  const night = TS_MODEL[m].night, pts = townArchPts(d.x0, d.x1, d.top, 900, 'pointed'), stone = tsWall(m, '#e8d2b0'), lw = 120 * Math.max(0, 1 - open);
  if (!o.leafOnly) { celShade(ctx, townArchPts(d.x0 - 16, d.x1 + 16, d.top - 18, 900, 'pointed'), stone, abDark(stone, 0.25), { light: [-1, -1], off: 6, lw: 3, line: tsLine(stone) });
    celShade(ctx, K.rectPts(d.x0 - 24, 896, 168, 14), abDark(stone, 0.08), abDark(stone, 0.3), { light: [-1, -1], off: 4, lw: 2.5, line: tsLine(stone) }); }
  ctx.save(); K.poly(ctx, pts, true); ctx.clip();
  const lit = o.lit || 0; abGrad(ctx, d.x0, d.top, 120, 250, lit > 0 ? [[0, '#ffcf7a'], [1, '#e08a4a']] : night ? [[0, '#2a2448'], [1, '#3e2a4a']] : [[0, '#4a2a3a'], [1, '#6a3a3a']]);
  if (lit > 0 && lit < 1) { ctx.globalAlpha = 1 - lit; abGrad(ctx, d.x0, d.top, 120, 250, night ? [[0, '#2a2448'], [1, '#3e2a4a']] : [[0, '#4a2a3a'], [1, '#6a3a3a']]); ctx.globalAlpha = 1; }
  if (o.inside) o.inside(ctx);
  if (lw > 1) { const col = night ? abLight(abMul(d.col, '#9a94e0', 0.35), 0.08) : d.col, sk = 8 * open, a = d.x0, b = d.x0 + lw;
    celShade(ctx, [[a, d.top - 10], [b, d.top - 10 + sk], [b, 900 - sk], [a, 900]], col, abDark(col, 0.3), { light: [-1, -1], off: 10 * (lw / 120), lw: 3.5, line: abDark(col, 0.65) });
    ctx.strokeStyle = abDark(col, 0.45); ctx.lineWidth = 2.5; for (let k = 1; k < 4; k++) { const px = a + lw * k / 4; ctx.beginPath(); ctx.moveTo(px, d.top); ctx.lineTo(px, 900 - sk * k / 4); ctx.stroke(); }
    if (lw > 40) { for (const fy of [0.3, 0.72]) seg(ctx, a + 4, d.top + 250 * fy, b - 4, d.top + 250 * fy, 6, abDark(col, 0.55), 1.5);
      const kx = b - 22 * (lw / 120); ctx.save(); ctx.strokeStyle = '#c8a050'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(kx, 800, 9, 0, 7); ctx.stroke(); ctx.restore(); shape(ctx, ell(kx, 790, 5, 5, 10), '#e8c060', { lw: 2 }); } }
  ctx.restore(); ink(ctx, pts.slice(1, -1), 3.5, 1, tsLine(stone));
}
function a3Arch(c, m, ox = 0) {   // the market arch (left end; ox shifts it, the market's lane arch): a thick wall with a round opening, dark-warm passage
  c.save(); c.translate(ox, 0); const A = TS.arch, col = tsWall(m, '#e2c08a'), night = TS_MODEL[m].night;
  celShade(c, [[A.x0 - 40, 900], [A.x0 - 40, A.wallTop], [A.x1, A.wallTop - 20], [A.x1, 900]], col, abDark(col, 0.25), { light: [1, -0.6], off: 22, lw: 3.5, line: tsLine(col) });
  celShade(c, [[A.x0 - 50, A.wallTop + 6], [A.x0 - 50, A.wallTop - 18], [A.x1 + 10, A.wallTop - 38], [A.x1 + 10, A.wallTop - 12]], abDark(col, 0.15), abDark(col, 0.35), { light: [1, -0.6], off: 6, lw: 3, line: tsLine(col) });
  const O = townArchPts(A.o0, A.o1, A.top, 900, 'round'); c.save(); K.poly(c, O, true); c.clip();
  abGrad(c, A.o0, A.top, A.o1 - A.o0, 340, night ? [[0, '#1e2448'], [0.7, '#3a2c58'], [1, '#5a3a5a']] : [[0, '#5a3446'], [0.6, '#8a5048'], [1, '#c88a5a']]);
  abGlaze(c, 120, 820, 120, night ? '#ffb060' : '#ffd8a0', night ? 0.35 : 0.5); c.restore();
  ink(c, O.slice(1, -1), 4, 1, tsLine(col));
  for (let k = -3; k <= 3; k++) { const a = Math.PI * (1.5 + k * 0.13), r0 = 70, r1 = 96; seg(c, 120 + Math.cos(a) * r0, A.top + 70 + Math.sin(a) * r0, 120 + Math.cos(a) * r1, A.top + 70 + Math.sin(a) * r1, 3, abDark(col, 0.35), 0); }
  c.restore();
}
// Ali Baba's window: recess (dark, or lit 0..1), two blue shutters (sh 0 shut .. 1 open flat; slit: a narrow gap of the shut pair),
// the vermilion geranium box (shake 0..1 rattles the flowers). o.inside(ctx) draws in the recess (Morgiana's bust).
function a3Window(ctx, t, m, o = {}) {
  const W = TS.win, night = TS_MODEL[m].night, lit = o.lit || 0, sh = K.clamp(o.sh ?? 1), frame = tsWall(m, '#f0dcc0');
  celShade(ctx, K.rectPts(W.x - 12, W.y - 14, W.w + 24, W.h + 20), frame, abDark(frame, 0.25), { light: [-1, -1], off: 5, lw: 3, line: tsLine(frame) });
  ctx.save(); ctx.beginPath(); ctx.rect(W.x, W.y, W.w, W.h); ctx.clip();
  abGrad(ctx, W.x, W.y, W.w, W.h, night ? [[0, '#24204a'], [1, '#3a2a52']] : [[0, '#4a2c46'], [1, '#6a3c4a']]);
  if (lit > 0) { ctx.globalAlpha = lit; abGrad(ctx, W.x, W.y, W.w, W.h, [[0, '#ffe09a'], [1, '#f0a050']]); ctx.globalAlpha = 1; }
  if (o.inside) o.inside(ctx);
  ctx.restore();
  // shutters: hinged at the outer edges; slit opens a gap between the shut pair
  const col = night ? '#5a7ad0' : '#3f7ad0', slit = o.slit || 0;
  for (const sd of [-1, 1]) { const hx = sd < 0 ? W.x : W.x + W.w, a = sh * Math.PI * 0.92, cw = Math.cos(a) * (W.w / 2 - slit * 8), ex = hx - sd * cw, ys = 5 * Math.sin(a);
    if (Math.abs(cw) < 3) { seg(ctx, hx, W.y, hx, W.y + W.h, 5, col, 2); continue; }
    const q = [[hx, W.y], [ex, W.y + ys], [ex, W.y + W.h - ys], [hx, W.y + W.h]]; celShade(ctx, q, col, abDark(col, 0.3), { light: [-1, -1], off: 5, lw: 3, line: abDark(col, 0.6) });
    ctx.save(); ctx.strokeStyle = abDark(col, 0.45); ctx.lineWidth = 2.5; for (let k = 1; k < 6; k++) { const yy = W.y + W.h * k / 6; ctx.beginPath(); ctx.moveTo(hx, yy); ctx.lineTo(ex, yy + (k < 3 ? 1 : -1)); ctx.stroke(); } ctx.restore(); }
  // geranium box under the sill
  const bx = W.x - 6, by = W.sill + 4, R = K.rng(23), sk = o.shake || 0;
  for (let i = 0; i < 9; i++) { const fx = bx + 8 + i * 13.5 + R() * 4, fy = by - 4 - R() * 16 + sk * 3 * Math.sin(AB_T2(t) * 31 + i), r = 9 + R() * 4;
    abBlob(ctx, fx, fy + 6, r * 1.1, r * 0.7, '#3f9a4a', '#256a34', { lw: 2, off: 3, line: '#1a4a24' }); }
  for (let i = 0; i < 6; i++) { const fx = bx + 14 + i * 20 + R() * 4, fy = by - 14 - R() * 12 + sk * 4 * Math.sin(AB_T2(t) * 37 + i * 2); abBlob(ctx, fx, fy, 8, 7, AB_ACC, '#b0201a', { lw: 2, off: 2.5, hi: '#ffb0a0', line: '#7a1010' }); }
  celShade(ctx, K.rectPts(bx, by, W.w + 12, 24), '#b8643a', '#7a3a1e', { light: [-1, -1], off: 6, lw: 3, line: '#4a2010' });
}
// the courtyard gate (double leaves, open 0..1 swinging inward); drawn live
function a3Gate(ctx, open, m, o = {}) {
  const G = TS.gate, night = TS_MODEL[m].night, col = night ? '#8a6a8a' : '#a8743e', pts = townArchPts(G.x0, G.x1, G.top, 900, 'round'), op = K.clamp(open);
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); abGrad(ctx, G.x0, G.top, 180, 240, night ? [[0, '#2a2a50'], [1, '#3e3a5a']] : [[0, '#7aa86a'], [0.5, '#e8d2a0'], [1, '#c8a070']]);
  if (!night) { abBlob(ctx, 1260, 820, 60, 50, '#4fae5a', '#2f7044', { lw: 2.5, line: '#1a4a24' }); }
  if (o.inside) o.inside(ctx);
  const half = 90 * (1 - 0.85 * op);
  celShade(ctx, K.rectPts(G.x0, G.top - 20, half, 280), col, abDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3, line: abDark(col, 0.6) });
  celShade(ctx, K.rectPts(G.x1 - half, G.top - 20, half, 280), col, abDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3, line: abDark(col, 0.6) });
  ctx.strokeStyle = abDark(col, 0.45); ctx.lineWidth = 2.5; for (const x0 of [G.x0, G.x1 - half]) for (let k = 1; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x0 + half * k / 3, G.top - 20); ctx.lineTo(x0 + half * k / 3, 900); ctx.stroke(); }
  ctx.restore(); ink(ctx, pts.slice(1, -1), 4, 1, '#5a3a2a');
}

// ---------- the town layer (houses, wall, arch, closed doors, paving, dressing), baked per model ----------
function tsTownPlate(m) {
  return abBakeAt('ts:town:' + m, 2000, 1230, (c, w) => {
    const M = TS_MODEL[m], night = M.night, L = [1, -0.6];
    // paving
    abGrad(c, 0, 880, w, 350, [[0, M.pave[0]], [1, M.pave[1]]]);
    const R = K.rng(31); c.save(); c.strokeStyle = K.rgba(abDark(M.pave[1], 0.3), 0.45); c.lineWidth = 2.5;
    const rows = [912, 948, 996, 1058, 1136, 1230]; for (let k = 0; k < rows.length - 1; k++) { c.beginPath(); c.moveTo(0, rows[k]); c.lineTo(w, rows[k]); c.stroke(); const st = 50 + k * 22; for (let x = (k % 2) * st / 2 + R() * 10; x < w; x += st + R() * 14) { c.beginPath(); c.moveTo(x, rows[k] + 2); c.lineTo(x + 3, rows[k + 1] - 2); c.stroke(); } } c.restore();
    c.save(); c.filter = 'blur(1px)'; for (let i = 0; i < 70; i++) { c.fillStyle = K.rgba(abLight(M.pave[0], 0.3), 0.5); c.beginPath(); c.ellipse(R() * w, 915 + R() * 300, 10 + R() * 26, 3 + R() * 4, 0, 0, 7); c.fill(); } c.restore();
    // the courtyard wall (behind the gate) with a tiled coping
    const wc = tsWall(m, '#ead2a8'); celShade(c, [[TS.wall.x0, 900], [TS.wall.x0, TS.wall.top], [TS.wall.x1, TS.wall.top], [TS.wall.x1, 900]], wc, abDark(wc, 0.22), { light: L, off: 18, lw: 3.5, line: tsLine(wc) });
    celShade(c, K.rectPts(TS.wall.x0 - 6, TS.wall.top - 16, TS.wall.x1 - TS.wall.x0 + 12, 18), night ? '#8a6a9a' : '#c8643a', night ? '#5a4a7a' : '#8a3a1e', { light: L, off: 6, lw: 3 });
    // house fronts
    TS.houses.forEach((h, i) => { const col = tsWall(m, h.col), par = tsWall(m, h.par), sh = abDark(col, 0.22), x0 = h.x0, x1 = h.x1;
      celShade(c, [[x0, 900], [x0, h.top], [x1, h.top], [x1, 900]], col, sh, { light: L, off: 20, lw: 3.5, line: tsLine(col) });
      const Rw = K.rng(40 + i); c.save(); c.filter = 'blur(2px)'; for (let k = 0; k < 6; k++) { c.fillStyle = K.rgba(abDark(col, 0.15), 0.35); c.beginPath(); c.ellipse(x0 + Rw() * (x1 - x0), h.top + 60 + Rw() * 500, 30 + Rw() * 40, 10 + Rw() * 14, 0, 0, 7); c.fill(); } c.restore();
      celShade(c, K.rectPts(x0 - 8, h.top - 14, x1 - x0 + 16, 22), par, abDark(par, 0.3), { light: L, off: 6, lw: 3, line: tsLine(par) });
      for (let bx = x0 + 30; bx < x1 - 20; bx += 70) seg(c, bx, h.top + 22, bx + 18, h.top + 28, 9, abDark(par, 0.25), 1.5);   // beam ends
      celShade(c, K.rectPts(x0, 872, x1 - x0, 28), abDark(col, 0.1), abDark(col, 0.3), { light: L, off: 4, lw: 2.5, line: tsLine(col) });   // plinth
      if (night) { c.save(); c.strokeStyle = 'rgba(214,232,255,0.75)'; c.lineWidth = 4; c.beginPath(); c.moveTo(x0 - 8, h.top - 14); c.lineTo(x1 + 8, h.top - 14); c.stroke(); c.restore(); }
      // upper windows of the other houses (Ali Baba's big window is live)
      const wins = i === 0 ? [[290, 420], [420, 420]] : i === 1 ? [[560, 400]] : i === 2 ? [[860, 420]] : i === 3 ? [[1490, 420], [1620, 420]] : [[1780, 460], [1900, 460]];
      wins.forEach(([wx, wy], k) => { const lit = night && (m === 'night2' ? (i + k) % 3 !== 1 : (i + k) % 2 === 0), ww = 64, wh = 84, wp = townArchPts(wx, wx + ww, wy, wy + wh, 'round', 8);
        celShade(c, townArchPts(wx - 8, wx + ww + 8, wy - 8, wy + wh + 6, 'round', 8), tsWall(m, '#f0dcc0'), abDark(tsWall(m, '#f0dcc0'), 0.2), { light: L, off: 4, lw: 2.5 });
        c.save(); K.poly(c, wp, true); c.fillStyle = lit ? '#ffd98a' : night ? '#262250' : '#4a3048'; c.fill(); c.restore(); if (lit) abGlaze(c, wx + ww / 2, wy + wh / 2, 90, '#ffcf6a', 0.55);
        const sc = night ? abLight(abMul(h.sh, '#9a94e0', 0.3), 0.05) : h.sh; for (const sd of [-1, 1]) { const ex = sd < 0 ? wx - 24 : wx + ww + 24, hx = sd < 0 ? wx : wx + ww; celShade(c, [[hx, wy + 10], [ex, wy + 14], [ex, wy + wh - 2], [hx, wy + wh]], sc, abDark(sc, 0.3), { light: L, off: 4, lw: 2.5, line: abDark(sc, 0.6) }); }
        ink(c, wp.slice(1, -1), 3, 1, tsLine(col)); });
      if (i === 1) {   // house 2: striped awning over the door, a bench by the wall
        const ax0 = 590, ax1 = 730, ay = 616; for (let k = 0; k < 7; k++) { const cA = k % 2 ? (night ? '#e8d8f0' : '#fff6ea') : (night ? '#c86a8a' : '#e8364f'); celShade(c, [[ax0 + k * 20, ay], [ax0 + (k + 1) * 20, ay], [ax0 + (k + 1) * 20 + 6, ay + 40], [ax0 + k * 20 + 6, ay + 40]], cA, abDark(cA, 0.25), { light: L, off: 3, lw: 2 }); }
        for (let k = 0; k < 7; k++) { c.fillStyle = k % 2 ? (night ? '#e8d8f0' : '#fff6ea') : (night ? '#c86a8a' : '#e8364f'); c.beginPath(); c.arc(ax0 + k * 20 + 16, ay + 40, 10, 0, Math.PI); c.fill(); }
        celShade(c, K.rectPts(528, 840, 46, 14), '#a8743e', '#6a4424', { light: L, off: 4, lw: 2.5 }); for (const lx of [532, 566]) seg(c, lx, 854, lx, 900, 6, '#6a4424', 1.5);
      }
      if (i === 3) { celShade(c, K.rectPts(1470, 540, 220, 14), tsWall(m, '#d8c8b0'), abDark(tsWall(m, '#d8c8b0'), 0.3), { light: L, off: 4, lw: 2.5 }); for (let bx = 1478; bx < 1690; bx += 20) seg(c, bx, 540, bx, 512, 3, abDark(par, 0.4), 0); seg(c, 1470, 512, 1690, 512, 4, abDark(par, 0.4), 1);
        for (const px of [1500, 1660]) { celShade(c, [[px - 14, 540], [px - 18, 516], [px + 18, 516], [px + 14, 540]], '#c0603a', '#7a3a2a', { light: L, off: 4, lw: 2 }); abBlob(c, px, 504, 22, 16, night ? '#4a7a6a' : '#4fae5a', night ? '#2e5048' : '#2f7044', { lw: 2, line: '#1a4a24' }); } }
      if (i === 4) { const cA = night ? '#8a5aa8' : '#c8364f'; celShade(c, [[1750, 560], [1840, 560], [1836, 650], [1754, 650]], cA, abDark(cA, 0.3), { light: L, off: 6, lw: 2.5 }); for (let k = 0; k < 4; k++) seg(c, 1756, 580 + k * 20, 1834, 580 + k * 20, 3, k % 2 ? '#ffd36a' : '#3f7ad0', 0); }
    });
    // house 3 extras: the second-floor beam line, the lantern bracket
    // the arch at the left end
    a3Arch(c, m);
    // doors (closed; live doors are drawn over when they open or are lit)
    TS.doors.forEach((d) => a3Door(c, d, 0, m));
    // lantern bodies on brackets (the glow is live)
    TS.lanterns.forEach(([lx, ly], k) => { if (k > 0) seg(c, lx, ly - 34, lx + (k === 3 ? 14 : 14), ly - 34, 4, '#4a3a4a', 1); else seg(c, lx, ly - 40, lx, ly - 20, 3, '#4a3a4a', 0);
      celShade(c, [[lx - 12, ly - 22], [lx + 12, ly - 22], [lx + 16, ly + 10], [lx, ly + 22], [lx - 16, ly + 10]], night || m === 'evening' ? '#ffd36a' : '#d8a040', '#a8641a', { light: L, off: 4, lw: 2.5, line: '#5a3a1a' });
      celShade(c, [[lx - 8, ly - 30], [lx + 8, ly - 30], [lx + 12, ly - 22], [lx - 12, ly - 22]], '#c8481a', '#7a2a10', { light: L, off: 2, lw: 2 }); });
    // street dressing: pots and plants by door 1, a water jar by Ali Baba's house, doorstep stones, tufts between the stones
    const pots = [[250, 46, '#c0603a'], [470, 36, '#d8843a'], [1150, 56, '#b86a3a'], [1700, 40, '#c0603a'], [1980, 44, '#d8843a']];
    for (const [px, ph, pc] of pots) { const pcol = night ? abMul(pc, '#9a94e0', 0.35) : pc; celShade(c, [[px - 18, 902], [px - 24, 902 - ph], [px + 24, 902 - ph], [px + 18, 902]], pcol, abDark(pcol, 0.35), { light: L, off: 7, lw: 2.5 });
      if (px !== 1150) abLeafBlobs(c, px, 902 - ph - 20, 28, night ? 'late' : 'morning', px); else { abBlob(c, px, 902 - ph - 6, 16, 6, abDark(pcol, 0.4), abDark(pcol, 0.5), { lw: 2 }); } }
    abDress(c, 230, 1990, 935, 1215, 37, { stones: 14, tufts: 26, flowers: night ? 3 : 12, grass: night ? ['#4a8a7a', '#2a5a5a'] : ['#6ac05a', '#2f7a44'], stone: night ? ['#a89ac0', '#6a5a8a'] : ['#e0c8a8', '#a08070'], skip: [[880, 1000]] });
    c.save(); c.globalAlpha = night ? 0.3 : 0.18; c.fillStyle = '#2b1a3a'; c.fillRect(0, 900, w, 22); c.restore();   // contact shade at the wall foot
  });
}

// ---------- live parts ----------
// lantern glow (k 0..1 each, an array or a number), flicker on twos
function tsLanterns(ctx, t, k = 1) { const tc = AB_T2(t); TS.lanterns.forEach(([lx, ly], i) => { const kk = Array.isArray(k) ? k[i] : k; if (kk <= 0.01) return; const f = 0.85 + 0.15 * Math.sin(tc * 11 + i * 2.3) * Math.sin(tc * 5.7 + i);
  abGlow(ctx, lx, ly, 150 * f, 0.75 * kk, '#ffb860'); abGlow(ctx, lx, ly, 46, 0.9 * kk, '#fff0c0'); ctx.save(); ctx.globalAlpha = 0.3 * kk; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.ellipse(lx + 10, 912, 120 * f, 18, 0, 0, 7); ctx.fill(); ctx.restore(); }); }
// a moth circling a lantern (on twos)
function tsMoth(ctx, t, i = 3) { const [lx, ly] = TS.lanterns[i], u = AB_T2(t) * 3.1; const x = lx + Math.cos(u) * 34, y = ly + Math.sin(u * 1.3) * 22; ctx.save(); ctx.fillStyle = '#fff6e0'; ctx.translate(x, y); ctx.rotate(Math.sin(u * 7) * 0.6); ctx.beginPath(); ctx.ellipse(-4, 0, 6, 3, 0.4, 0, 7); ctx.ellipse(4, 0, 6, 3, -0.4, 0, 7); ctx.fill(); ctx.restore(); }
// washing lines: Ali Baba's (olive robe + vermilion sash: the clue) and a line across house 1. o.items: how many hang (0..4, the
// time-lapse takes them in), o.flash: the sash flashes, o.tuck 0..1 (a slipping robe corner tucked back), o.empty: rope only
function tsWashing(ctx, t, m, o = {}) {
  const tc = AB_T2(t), night = TS_MODEL[m].night, rope = night ? '#8a7aa8' : '#6a4a4a', n = o.items ?? 4;
  const lines = [[TS.line[0], TS.line[1], 22], [[232, 430], [508, 440], 18]];
  lines.forEach(([[x0, y0], [x1, y1], sag], li) => { ctx.strokeStyle = rope; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + sag * 2, x1, y1); ctx.stroke();
    const at = (u) => [K.lerp(x0, x1, u), K.lerp(y0, y1, u) + sag * 4 * u * (1 - u) * 1];
    const items = li === 0 ? [[0.14, 'robe'], [0.34, 'sash'], [0.49, 'cloth', '#fff6ea'], [0.58, 'cloth', '#3f7ad0']] : [[0.25, 'cloth', '#ffd36a'], [0.5, 'cloth', '#e8364f'], [0.75, 'cloth', '#2f9a8e']];
    items.forEach(([u, kind, col], k) => { if (o.empty || (li === 0 ? k >= n : n < 2)) return; const [px, py] = at(u), sw = Math.sin(tc * 2.6 + k * 1.4 + li) * 0.06 + (o.wind || 0) * 0.1;
      ctx.save(); ctx.translate(px, py); ctx.transform(1, 0, sw, 1, 0, 0);
      if (kind === 'robe') { const tk = o.tuck ?? 1, c0 = AB_ALI0.robe; celShade(ctx, [[-34, 0], [34, 0], [44, 110], [30, 118 + 26 * (1 - tk)], [-38, 112]], c0, abDark(c0, 0.3), { light: [1, -0.5], off: 7, lw: 2.5, line: abDark(c0, 0.6) });
        seg(ctx, -34, 4, -58, 40, 18, c0, 2.5); seg(ctx, 34, 4, 58 - 18 * (1 - tk), 40 + 236 * (1 - tk), 18, c0, 2.5); }
      else if (kind === 'sash') { celShade(ctx, [[-9, 0], [9, 0], [12, 96], [0, 108], [-12, 96]], AB_ACC, '#b0201a', { light: [1, -0.5], off: 4, lw: 2.5, line: '#7a1010' });
        if (o.flash) { abGlow(ctx, 0, 50, 80, o.flash, '#ff8a6a'); } }
      else celShade(ctx, K.rectPts(-16, 0, 32, 42 + (k % 2) * 10), col, abDark(col, 0.3), { light: [1, -0.5], off: 4, lw: 2 });
      ctx.restore(); }); });
}

// ---------- doorMark: the chalk cross and the red dot ----------
// doorMark(ctx, x, y, {kind: 'x' | 'dot', p 0..1 (draw-on: the cross in two strokes, the dot pops), glow 0..1, s, shine 0..1})
function doorMark(ctx, x, y, o = {}) {
  const p = K.clamp(o.p ?? 1), s = o.s || 1, sx = o.sx ?? 1; if (p <= 0) return;
  if ((o.glow || 0) > 0.01) abGlow(ctx, x, y, (o.kind === 'dot' ? 46 : 52) * s * (1 + 0.6 * (o.flare || 0)), o.glow, o.kind === 'dot' ? '#ff8a7a' : '#ffffff');
  ctx.save(); ctx.translate(x, y); ctx.scale(s * sx, s);
  if (o.smudge) { ctx.save(); ctx.globalAlpha *= o.smudge * Math.min(1, p * 2); ctx.fillStyle = 'rgba(70,40,60,0.22)'; ctx.beginPath(); ctx.ellipse(1, 2, 30, 27, 0.3, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,250,240,0.16)'; ctx.beginPath(); ctx.ellipse(-3, -2, 24, 20, -0.4, 0, 7); ctx.fill(); ctx.restore(); }   // v2: a chalk-smudged patch
  if (o.kind === 'dot') { const k = p < 1 ? K.ease.back(p) : 1, sq = 1 + 0.25 * Math.exp(-Math.max(0, o.age ?? 9) * 14);   // v2: age clamped (no flat pop)
    ctx.scale(k * sq, k / sq); celShade(ctx, ell(0, 0, 14, 14, 20), '#e8202a', '#a01018', { light: [-1, -1], off: 4, hi: '#ff9a8a', lw: 2, line: '#6a0a10' });
    if (o.shine) { ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.ellipse(-4 + 6 * o.shine, -5, 4, 2.5, -0.5, 0, 7); ctx.fill(); }
    if ((o.drip || 0) > 0) { ctx.fillStyle = '#c8101a'; ctx.beginPath(); ctx.ellipse(3, 12 + 10 * o.drip, 3, 5 + 4 * o.drip, 0, 0, 7); ctx.fill(); }
  } else { const a = K.clamp(p * 2), b = K.clamp(p * 2 - 1), stroke = (x0, y0, x1, y1, u) => { if (u <= 0) return; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(K.lerp(x0, x1, u), K.lerp(y0, y1, u)); ctx.stroke(); };
    ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(80,70,110,0.35)'; ctx.lineWidth = 9; stroke(-16, -16, 16, 16, a); stroke(16, -16, -16, 16, b);
    ctx.strokeStyle = '#fffaf2'; ctx.lineWidth = 6; stroke(-18, -18, 18, 18, a); stroke(18, -18, -18, 18, b);
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,0.7)'; stroke(-15, -19, 19, 15, a); }
  ctx.restore();
}
// a thin pulsing ring (u 0..1 life) to point at a small thing; dashed = an empty mark spot
function tsRing(ctx, x, y, u, col = '#7fe3ff', o = {}) { if (u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * u); ctx.strokeStyle = col; ctx.lineWidth = o.w || 4; ctx.shadowColor = col; ctx.shadowBlur = 10;
  if (o.dash) ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(x, y, (o.r0 ?? 26) + (o.grow ?? 34) * u, 0, 7); ctx.stroke(); ctx.restore(); }
// the marks as data: every street shot draws the marks whose time has passed (door, kind, start time, draw duration)
const TS_MARKS = [
  { door: 3, kind: 'x', t0: 21.9, d: 1.36 }, { door: 2, kind: 'x', t0: 59.9, d: 0.6 }, { door: 1, kind: 'x', t0: 60.95, d: 0.55 }, { door: 4, kind: 'x', t0: 62.62, d: 0.5 }, { door: 5, kind: 'x', t0: 63.36, d: 0.45 },
  { door: 3, kind: 'dot', t0: 95.92, d: 0.18 }, { door: 2, kind: 'dot', t0: 107.2, d: 0.16 }, { door: 1, kind: 'dot', t0: 107.74, d: 0.16 }, { door: 4, kind: 'dot', t0: 109.66, d: 0.16 }, { door: 5, kind: 'dot', t0: 110.22, d: 0.16 },
];
// o.glow (base), o.flare(mark) -> 0..1 extra, o.only: list of doors, o.tm: the time used for the marks (default t)
// v2 (review 1 note 1): marks belong to a surface. A dot sits on its door LEAF: o.open {door: open 0..1} swings it with the leaf
// (squashed to the leaf width) and hides it once the leaf is narrower than half; crosses are on the wall. Call tsMarks BEFORE the cast.
// v2 (note 6): crosses drawn at 1.4 (50 world units, strokes 8.4) on a chalk-smudged patch by day (o.night falsy); dots at 1.21 (r 17).
const TS_MARK_S = { x: 1.4, dot: 1.21 };
function tsMarks(ctx, t, o = {}) {
  const tm = o.tm ?? t;
  for (const M of TS_MARKS) { if (tm < M.t0 || (o.only && !o.only.includes(M.door))) continue; const d = tsDoor(M.door), p = (tm - M.t0) / M.d; let [x, y] = M.kind === 'x' ? d.mark : d.dot, sx = 1;
    if (M.kind === 'dot') { const op = (o.open && o.open[M.door]) || 0, lw = 120 * Math.max(0, 1 - op); if (lw < 60) continue; if (op > 0) { x = d.x0 + lw / 2; sx = lw / 120; } }
    const strokeP = M.kind === 'x' && M.d > 1 ? (p < 0.5 ? K.clamp(p * 2 / 1) * 0.5 : 0.5 + K.clamp((p - 0.51) * 2) * 0.5) : p;   // the spy's cross: two strokes 0.7 s apart
    const fl = o.flare ? o.flare(M) : 0; doorMark(ctx, x, y, { kind: M.kind, p: strokeP, s: TS_MARK_S[M.kind], sx, smudge: M.kind === 'x' && !o.night ? 1 : 0, glow: (o.glow ?? 0.3) + 0.6 * fl, flare: fl, age: tm - M.t0 - M.d, shine: M.kind === 'dot' ? 0.5 + 0.5 * Math.sin(t * 1.3 + M.door) : 0 }); }
}

// ---------- dayToNight: a time-lapse on a painted set (plates cross-fade; the sun or moon moves live; lanterns light one by one) ----------
// returns {k, sunY, moonY, lan: [k...]} for u 0..1 (0 day .. 1 night)
function dayToNight(u, n = 4) { const k = K.clamp(u); return { k, sunY: K.lerp(150, 760, K.clamp(k * 1.6)), sunK: 1 - K.clamp((k - 0.55) * 4), moonK: K.clamp((k - 0.5) * 3), moonY: K.lerp(520, 210, K.clamp((k - 0.45) * 1.8)), lan: Array.from({ length: n }, (_, i) => K.clamp((k - 0.42 - 0.1 * i) * 6)) }; }
// draw the street plates for the camera: model m, or a cross-fade from m to m2 by k (backgrounds may blend; cels never)
function tsPlates(ctx, cam, m, m2, k, bodies) {
  tsSky(ctx, cam, m); if (m2 && k > 0.004) tsSky(ctx, cam, m2, k);
  if (bodies) bodies(ctx);
  ctx.drawImage(tsTownPlate(m), 0, 0); if (m2 && k > 0.004) { ctx.save(); ctx.globalAlpha = k; ctx.drawImage(tsTownPlate(m2), 0, 0); ctx.restore(); }
}

// ---------- oilJar, jarPannier, silverRing ----------
// oilJar(ctx, x, y, s, {lid 0..1 (lifts a finger's width), stain, rot}): a tall glazed clay jar 70 x 150 at s 1 (feet at x, y)
function oilJar(ctx, x, y, s = 1, o = {}) {
  // v2 (review 1 note 5): glazed terracotta with a hard highlight band, a dark neck and a visible flat lid; the rope net is gone
  // (two hoops and a carrying loop), so it reads as a clay jar big enough to hide a man, not a wicker basket
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const J = [[-20, 0], [-30, -20], [-38, -70], [-35, -112], [-24, -132], [-15, -134], [15, -134], [24, -132], [35, -112], [38, -70], [30, -20], [20, 0]];
  celShade(ctx, J, '#c8603a', '#8a3a22', { light: [-1, -1], off: 13, hi: '#f09a6a', lw: 3.5, line: '#4a1a0c' });
  ctx.save(); K.poly(ctx, J, true); ctx.clip(); ctx.fillStyle = 'rgba(255,236,210,0.55)'; ctx.beginPath(); ctx.moveTo(-24, -118); ctx.quadraticCurveTo(-30, -70, -22, -26); ctx.lineTo(-14, -26); ctx.quadraticCurveTo(-21, -70, -15, -118); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.ellipse(-20, -96, 3.5, 11, 0.1, 0, 7); ctx.fill();
  if (o.stain) { ctx.fillStyle = 'rgba(70,30,14,0.5)'; ctx.beginPath(); ctx.moveTo(8, -134); ctx.quadraticCurveTo(22, -90, 12, -30); ctx.lineTo(4, -30); ctx.quadraticCurveTo(10, -90, 0, -132); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.strokeStyle = '#a88a5a'; ctx.lineWidth = 3; for (const [yy, rx] of [[-104, 36], [-38, 31]]) { ctx.beginPath(); ctx.ellipse(0, yy, rx, 6, 0, 0.15, Math.PI - 0.15); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-26, -104); ctx.quadraticCurveTo(-30, -170, 0, -172); ctx.quadraticCurveTo(30, -170, 26, -104); ctx.stroke(); ctx.restore();
  celShade(ctx, K.rectPts(-15, -146, 30, 14), '#5a2414', '#3a140a', { off: 3, lw: 2.5, line: '#2a0e06' });   // the dark neck
  const lid = (o.lid || 0) * 12; if (lid > 0.5) { ctx.fillStyle = '#140a10'; ctx.fillRect(-17, -148 - lid, 34, lid + 3);
    if (o.eyes) { ctx.fillStyle = '#fffaf0'; for (const ex of [-7, 7]) { ctx.beginPath(); ctx.ellipse(ex, -146 - lid / 2, 4, Math.min(3, lid / 3), 0, 0, 7); ctx.fill(); } ctx.fillStyle = '#140a10'; for (const ex of [-6, 8]) { ctx.beginPath(); ctx.arc(ex, -146 - lid / 2, 1.6, 0, 7); ctx.fill(); } } }   // v2: o.eyes, a man peeking
  celShade(ctx, K.rectPts(-21, -153 - lid, 42, 8), '#a8643a', '#6a3a1e', { light: [-1, -1], off: 3, lw: 2.5, line: '#3a1a0c' });   // the flat lid
  ctx.restore();
}
// jarPannier: a wooden frame over a pack animal's back with a jar hanging on each side (sway in radians, lagged by the scene)
function jarPannier(ctx, seat, s, dir, o = {}) {
  const d = Math.sign(dir || 1), x = seat.x, y = seat.y + 6 * s;
  seg(ctx, x - 58 * s, y - 4 * s, x + 58 * s, y - 4 * s, 9 * s, '#8a5a32', 2); seg(ctx, x - 40 * s, y - 30 * s, x - 52 * s, y + 30 * s, 7 * s, '#8a5a32', 2); seg(ctx, x + 40 * s, y - 30 * s, x + 52 * s, y + 30 * s, 7 * s, '#8a5a32', 2);
  // the far jar shows above the back, the near jar hangs down the flank
  oilJar(ctx, x - d * 22 * s, y - 4 * s, 0.86 * s, { rot: (o.sway || 0) * 0.7, lid: o.lidFar || 0 });   // v2: jars 0.86 / 1.0 (were 0.62 / 0.7)
  oilJar(ctx, x + d * 6 * s, y + 96 * s, 1.0 * s, { rot: -(o.sway || 0), lid: o.lid || 0, stain: o.stain, eyes: o.eyes });
}
// silverRing: a ring with a split blue stone (o.glint 0..1) on a finger at (x, y), r ring radius
function silverRing(ctx, x, y, r = 14, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.strokeStyle = '#d8dce8'; ctx.lineWidth = r * 0.45; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.45, 0, 0, 7); ctx.stroke();
  ctx.strokeStyle = '#8a90b0'; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.ellipse(0, r * 0.08, r, r * 0.45, 0, 0.2, Math.PI - 0.2); ctx.stroke();
  celShade(ctx, ell(0, -r * 0.55, r * 0.62, r * 0.48, 16), '#3a8ae8', '#1a4aa0', { light: [-1, -1], off: r * 0.18, hi: '#bfe0ff', lw: Math.max(1.5, r * 0.1), line: '#0e2a6a' });
  ctx.strokeStyle = '#0e1a40'; ctx.lineWidth = Math.max(1.5, r * 0.1); ctx.beginPath(); ctx.moveTo(-r * 0.35, -r * 0.9); ctx.lineTo(r * 0.3, -r * 0.2); ctx.stroke();
  ctx.restore(); if (o.glint) abGlint(ctx, x - r * 0.2, y - r * 0.8, r * 2.2, o.glint);
}
