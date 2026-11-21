// ===== The Ebony Horse series: sets =====
// palaceGarden: the king's festival court, a 2000-wide strip, ground y 900, sky up to y -820 (zoom 0.62 shows it whole).
//   Baked plates (sky, far city, palace facade, garden ground) + live cels (bunting, banners, lanterns, fountain jet, kites,
//   clouds, gadgets) + a front pass. Anchors in EH_GARDEN.
// skyFlight: the flight world in panel units (1000 x 1230): sky plates by altitude and time of day (cross-faded, never a tint),
//   three scrolling cloud layers, a cloud deck that takes the horse's shadow, a sun, the land below (kingdomBelow: tiled fields,
//   river, towns, with palaceToy), wind ribbons. Episodes 2-5 copy this file unchanged (the princess's palace is a new set).

const EH_GARDEN = { w: 2000, top: -820, gate: [60, 220, 560], fountain: [520, 860], court: [800, 1300], star: 1020, tables: [1330, 1450, 800],
  dais: [1540, 1940, 840], throne: { x: 1760, seat: 792, sitY: 840 }, canopy: [1560, 1940, 430], dome: [1350, 250, 170], minarets: [800, 1900], cypress: [330, 720] };
const EH_PAL = { wall: '#f6ead0', wallS: '#d9c3a8', trim: '#e8604a', trimS: '#b8402e', dome: '#2fb8b0', domeS: '#1f8a84', gold: '#f2c040', goldS: '#c8961a', line: '#6a4a3a', banner: EH_EMERALD, bannerS: '#126e4a' };

// ---------- plates ----------
function ehGardenSkyPlate() {
  return ehBakeAt('gsky', 2000, 2050, (c, w, h) => {
    ehGrad(c, 0, 0, w, h, [[0, '#2f7fe8'], [0.35, '#5aa0f4'], [0.62, '#a8d8ff'], [0.76, '#e6f6ff'], [1, '#e6f6ff']]);
    ehGlaze(c, 300, 620, 520, '#fff6c8', 0.55); ehGlaze(c, 300, 620, 160, '#ffffff', 0.7);
    for (const [x, y, s] of [[1500, 260, 1.3], [700, 150, 0.9], [1850, 520, 0.8], [1100, 700, 0.7], [250, 1050, 0.6]]) ehCloud(c, x, y, 420 * s, 110 * s, '#ffffff', '#cfe4fa', 8, x);
  }, 0.5);
}
function ehGardenFarPlate() {   // x -300..2300, y 300..900 (drawn with parallax)
  return ehBakeAt('gfar', 2600, 600, (c, w) => {
    c.save(); c.translate(0, -300);
    ehSoftHills(c, w, 640, 80, '#a8c0e8', 3, 3, 900); ehSoftHills(c, w, 700, 50, '#8eb0dc', 9, 2, 900);
    const R = K.rng(17); c.save(); c.filter = 'blur(1.2px)';
    for (let x = 0; x < w; x += 40 + R() * 50) { const hh = 30 + R() * 60, ww = 46 + R() * 50, base = 760 + R() * 14, col = R() < 0.5 ? '#c8c0e0' : '#b4b4dc'; c.fillStyle = col; c.fillRect(x, base - hh, ww, hh + 200);
      if (R() < 0.25) { c.beginPath(); c.ellipse(x + ww / 2, base - hh, ww * 0.36, ww * 0.42, 0, Math.PI, 0); c.fill(); }
      if (R() < 0.08) { c.fillRect(x + ww / 2 - 6, base - hh - 110, 12, 110); c.beginPath(); c.ellipse(x + ww / 2, base - hh - 110, 12, 16, 0, Math.PI, 0); c.fill(); } }
    c.restore();
    for (let i = 0; i < 9; i++) palmTree(c, 80 + i * 290 + R() * 80, 800, { s: 0.42 + R() * 0.15, lean: -14 + R() * 28 });
    c.restore();
  });
}
function ehArchPts(x0, x1, top, base) { return townArchPts(x0, x1, top, base, 'pointed'); }
function ehDome(c, cx, base, r, col = EH_PAL.dome, sh = EH_PAL.domeS) {
  const onion = [[cx - r, base], ...Array.from({ length: 19 }, (_, i) => { const u = i / 18, a = Math.PI * (1 + u); return [cx + Math.cos(a) * r * (1 - 0.12 * Math.sin(u * Math.PI)), base + Math.sin(a) * r * 1.02]; }), [cx + r, base]];
  onion.splice(10, 0, [cx, base - r * 1.32]);
  celShade(c, [[cx - r * 0.95, base + 14], [cx + r * 0.95, base + 14], [cx + r * 0.95, base], [cx - r * 0.95, base]], EH_PAL.wall, EH_PAL.wallS, { light: [-1, -1], off: 6, lw: 3, line: EH_PAL.line });
  celShade(c, onion, col, sh, { light: [-1, -1], off: r * 0.3, hi: ehLight(col, 0.45), lw: 4, line: ehDark(sh, 0.4) });
  for (const k of [-0.5, 0, 0.5]) { c.save(); c.strokeStyle = ehDark(col, 0.15); c.lineWidth = 2; c.beginPath(); c.moveTo(cx + k * r * 0.9, base); c.quadraticCurveTo(cx + k * r * 0.7, base - r * 0.8, cx, base - r * 1.3); c.stroke(); c.restore(); }
  seg(c, cx, base - r * 1.3, cx, base - r * 1.3 - Math.max(30, r * 0.5), 6, EH_PAL.gold, 1.5); ehBlob(c, cx, base - r * 1.3 - Math.max(30, r * 0.5), 9, 9, EH_PAL.gold, EH_PAL.goldS, { lw: 2 });
  shape(c, ell(cx + 5, base - r * 1.3 - Math.max(30, r * 0.5) - 20, 9, 9, 16).filter((q, i) => i < 12), EH_PAL.gold, { lw: 0 });
}
function ehMinaret(c, x, top, base) {
  const w = 56; celShade(c, K.rectPts(x - w / 2, top + 120, w, base - top - 120), EH_PAL.wall, EH_PAL.wallS, { light: [-1, -1], off: 14, lw: 3.5, line: EH_PAL.line });
  for (const y of [top + 250, top + 500]) { celShade(c, K.rectPts(x - w / 2 - 12, y, w + 24, 18), EH_PAL.trim, EH_PAL.trimS, { light: [-1, -1], off: 5, lw: 3, line: EH_PAL.line }); }
  celShade(c, K.rectPts(x - w / 2 + 6, top + 70, w - 12, 60), EH_PAL.wall, EH_PAL.wallS, { light: [-1, -1], off: 8, lw: 3, line: EH_PAL.line });
  c.fillStyle = '#5a3a4a'; c.fillRect(x - 8, top + 84, 16, 30);
  ehDome(c, x, top + 70, 34);
}
function ehPalacePlate() {   // x 640..2000, y -240..780
  return ehBakeAt('palace', 1360, 1020, (c) => {
    c.translate(-640, 240); const P = EH_PAL, L = [-1, -1];
    ehMinaret(c, 800, -120, 780); ehMinaret(c, 1900, -120, 780);
    // upper storey with small windows
    celShade(c, K.rectPts(860, 250, 980, 220), P.wall, P.wallS, { light: L, off: 18, lw: 4, line: P.line });
    for (let x = 900; x < 1820; x += 70) { const tt = K.rectPts(x, 300, 26, 40); c.fillStyle = '#4a3a6a'; K.poly(c, townArchPts(x, x + 26, 296, 340, 'pointed'), true); c.fill(); ink(c, townArchPts(x, x + 26, 296, 340, 'pointed'), 3, 1, P.line); }
    celShade(c, K.rectPts(850, 236, 1000, 20), P.trim, P.trimS, { light: L, off: 6, lw: 3, line: P.line });
    for (let x = 856; x < 1850; x += 32) celShade(c, [[x, 236], [x + 8, 218], [x + 16, 218], [x + 24, 236]], P.wall, P.wallS, { light: L, off: 3, lw: 2, line: P.line });   // crenellations
    // the lower arcade: six pointed arches with warm interiors and a trim band
    celShade(c, K.rectPts(840, 450, 1020, 330), P.wall, P.wallS, { light: L, off: 18, lw: 4, line: P.line });
    celShade(c, K.rectPts(840, 444, 1020, 18), P.trim, P.trimS, { light: L, off: 5, lw: 3, line: P.line });
    for (let i = 0; i < 6; i++) { const x0 = 905 + i * 150, x1 = x0 + 130, A = ehArchPts(x0, x1, 480, 780);
      c.save(); K.poly(c, A, true); c.clip(); ehGrad(c, x0, 480, 130, 300, [[0, '#7a4a5a'], [0.6, '#b0705a'], [1, '#e0a070']]); ehGlaze(c, (x0 + x1) / 2, 700, 120, '#ffd890', 0.55);
      c.fillStyle = '#c86a5a'; c.fillRect(x0, 740, 130, 40); c.restore();
      ink(c, A, 4, 1, P.line); c.save(); c.strokeStyle = P.trim; c.lineWidth = 7; K.poly(c, A.slice(0, -1).map(([x, y]) => [x, y - 6])); c.stroke(); c.restore(); }
    // domes
    ehDome(c, 1350, 250, 170); ehDome(c, 1000, 250, 90); ehDome(c, 1700, 250, 90);
    // tile band
    for (let x = 846; x < 1856; x += 24) shape(c, [[x, 768], [x + 12, 760], [x + 24, 768], [x + 12, 776]], (x / 24) % 2 < 1 ? '#2fb8b0' : '#f2c040', { lw: 1.5, line: P.line });
  });
}
function ehGardenGroundPlate() {   // x 0..2000, y 380..1230
  return ehBakeAt('gground', 2000, 850, (c, w) => {
    c.translate(0, -380); const P = EH_PAL, G = EH_GARDEN, L = [-1, -1];
    // garden wall with the gate arch (open, a sunny lane beyond)
    const [g0, g1, gt] = G.gate; c.save(); c.beginPath(); c.rect(0, 640, 760, 160); K.poly(c, townArchPts(g0, g1, gt, 800, 'pointed'), true); c.clip('evenodd');
    celShade(c, K.rectPts(0, 640, 760, 150), '#f0dcc0', '#c8a888', { light: L, off: 12, lw: 3.5, line: P.line }); c.restore();
    c.save(); K.poly(c, townArchPts(g0, g1, gt, 800, 'pointed'), true); c.clip(); ehGrad(c, g0, gt, g1 - g0, 240, [[0, '#a8d8ff'], [0.7, '#e8f4d8'], [1, '#d8c08a']]); ehSoftHills(c, 400, 760, 20, '#8ab07a', 2, 1, 800); c.restore();
    ink(c, townArchPts(g0, g1, gt, 800, 'pointed'), 4, 1, P.line); c.save(); c.strokeStyle = P.trim; c.lineWidth = 9; K.poly(c, townArchPts(g0 - 6, g1 + 6, gt - 6, 800, 'pointed').slice(0, -1)); c.stroke(); c.restore();
    for (let x = 6; x < 760; x += 30) celShade(c, [[x, 640], [x + 8, 624], [x + 16, 624], [x + 24, 640]], '#f0dcc0', '#c8a888', { light: L, off: 3, lw: 2, line: P.line });
    // ground: lawn (left), court (right), the path from the gate
    ehGrad(c, 0, 780, w, 450, [[0, '#7ac85a'], [0.5, '#5aa84a'], [1, '#3f8a44']]);
    const [c0, c1] = G.court; c.save(); c.beginPath(); c.moveTo(c0 - 40, 1230); c.lineTo(c0 + 20, 790); c.lineTo(2000, 790); c.lineTo(2000, 1230); c.closePath(); c.fillStyle = '#f0d8b0'; c.fill(); c.clip();
    { let y = 790, row = 0; const Rt = K.rng(44); while (y < 1230) { const h = 16 + (y - 790) * 0.075, w = h * 2.1;
      for (let x = c0 - 80 + (row % 2) * w / 2; x < 2000; x += w) { const q = Rt(); shape(c, K.rectPts(x, y, w, h), q < 0.45 ? '#f6e2c0' : q < 0.9 ? '#ecd4aa' : '#e8c890', { lw: 1.2, line: '#c8a880' });
        if ((Math.round(x / w) + row) % 5 === 0) shape(c, [[x, y - h * 0.32], [x + h * 0.32, y], [x, y + h * 0.32], [x - h * 0.32, y]], row % 2 ? '#2fb8b0' : '#f2c040', { lw: 1, line: '#6a4a3a' }); }
      y += h; row++; } }
    for (const yy of [1080, 1105]) { const h = 12; for (let x = c0 - 80; x < 2000; x += 24) shape(c, [[x, yy], [x + 12, yy - h * 0.5], [x + 24, yy], [x + 12, yy + h * 0.5]], (x / 24) % 2 < 1 ? '#2fb8b0' : '#e8604a', { lw: 1, line: '#6a4a3a' }); }
    c.restore();
    // eight-point star in the tiles (the horse's spot)
    const st = []; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, r = i % 2 ? 70 : 150; st.push([G.star + Math.cos(a) * r, 930 + Math.sin(a) * r * 0.22]); }
    celShade(c, st, '#2fb8b0', '#1f8a84', { light: L, off: 6, lw: 3, line: P.line }); shape(c, ell(G.star, 930, 40, 9, 20), P.gold, { lw: 2, line: P.line });
    c.save(); c.fillStyle = '#e8d2a8'; c.beginPath(); c.moveTo(g0, 800); c.lineTo(g1, 800); c.bezierCurveTo(400, 860, 600, 930, 820, 930); c.lineTo(820, 1010); c.bezierCurveTo(560, 1010, 300, 900, g0 - 40, 820); c.closePath(); c.fill(); c.restore();
    // a blue carpet runner from the court star to the dais steps
    c.save(); c.fillStyle = '#3a4ab8'; c.beginPath(); c.moveTo(1110, 946); c.lineTo(1480, 930); c.lineTo(1480, 966); c.lineTo(1110, 990); c.closePath(); c.fill(); c.strokeStyle = '#f2c040'; c.lineWidth = 5; c.stroke(); c.restore();
    // rose hedge along the back of the lawn
    const R = K.rng(23); for (let x = 230; x < 820; x += 36) { ehBlob(c, x, 778, 30, 24, '#3f8a44', '#2a6a38', { lw: 2.5, off: 8 }); if (R() < 0.7) ehBlob(c, x + R() * 20 - 10, 768 + R() * 10, 6, 6, R() < 0.5 ? '#e8364f' : '#ff8ab8', '#a8203a', { lw: 1.5, off: 2 }); }
    // cypresses
    for (const x of G.cypress) { celShade(c, [[x - 8, 800], [x - 8, 760], [x + 8, 760], [x + 8, 800]], '#7a4a2a', '#4a2a14', { off: 4, lw: 2.5 });
      celShade(c, [[x, 430], [x + 26, 520], [x + 40, 640], [x + 30, 760], [x - 30, 760], [x - 40, 640], [x - 26, 520]], '#2f7a4a', '#1e5434', { light: L, off: 18, hi: '#4f9a62', lw: 3.5, line: '#123a22' }); }
    // fountain basin (the jet is live)
    const [fx, fy] = G.fountain; celShade(c, [[fx - 100, fy], [fx + 100, fy], [fx + 92, fy + 44], [fx - 92, fy + 44]], '#e8d8f0', '#b0a0c8', { light: L, off: 10, lw: 3.5, line: '#5a4a7a' });
    shape(c, ell(fx, fy, 100, 14, 30), '#5ab8f0', { lw: 3, line: '#2a5a9a' }); celShade(c, K.rectPts(fx - 12, fy - 80, 24, 80), '#e8d8f0', '#b0a0c8', { off: 5, lw: 3, line: '#5a4a7a' });
    shape(c, ell(fx, fy - 82, 38, 9, 20), '#e8d8f0', { lw: 3, line: '#5a4a7a' });
    // the royal dais with steps, the throne, the striped canopy on four poles
    const [d0, d1, dt] = G.dais; for (let k = 0; k < 3; k++) celShade(c, K.rectPts(d0 - 60 + k * 20, 900 - (k + 1) * 20, 60, 20), '#f0d8b0', '#c8a880', { off: 4, lw: 2.5, line: P.line });
    celShade(c, K.rectPts(d0, dt, d1 - d0, 900 - dt), '#e8604a', '#b8402e', { light: L, off: 10, lw: 3.5, line: '#6a2a1a' });
    for (let x = d0 + 10; x < d1; x += 40) shape(c, [[x, dt + 20], [x + 10, dt + 12], [x + 20, dt + 20], [x + 10, dt + 28]], P.gold, { lw: 1.5, line: '#6a2a1a' });
    celShade(c, K.rectPts(d0 + 20, dt - 4, d1 - d0 - 40, 8), '#7a3aa8', '#5a2a80', { off: 2, lw: 2 });
    const [cx0, cx1, ct] = G.canopy; for (const x of [cx0, cx0 + 40, cx1 - 40, cx1]) seg(c, x, x === cx0 || x === cx1 ? dt + 10 : dt, x, ct + 30, 8, P.gold, 2);
    const T = G.throne; celShade(c, [[T.x - 66, T.seat + 4], [T.x - 60, T.seat - 120], [T.x - 30, T.seat - 160], [T.x, T.seat - 172], [T.x + 30, T.seat - 160], [T.x + 60, T.seat - 120], [T.x + 66, T.seat + 4]], P.gold, P.goldS, { light: L, off: 12, hi: '#fff1b0', lw: 3.5, line: '#6a4a10' });
    celShade(c, K.rectPts(T.x - 48, T.seat - 130, 96, 130), EH_EMERALD, '#126e4a', { light: L, off: 10, lw: 3, line: '#0a3a24' });
    celShade(c, K.rectPts(T.x - 70, T.seat - 4, 140, 26), P.gold, P.goldS, { off: 6, lw: 3, line: '#6a4a10' });
    // inventors' table (cloth with a tassel border; the gadgets are live)
    const [t0, t1, tt] = G.tables; for (const x of [t0 + 10, t1 - 10]) seg(c, x, tt, x, 900, 7, '#8a5a32', 2);
    celShade(c, [[t0 - 10, tt], [t1 + 10, tt], [t1 + 14, tt + 52], [t0 - 14, tt + 52]], '#3f7ad0', '#2a5aa8', { light: L, off: 8, lw: 3, line: '#1a2a6a' });
    for (let x = t0 - 8; x < t1 + 10; x += 14) seg(c, x, tt + 52, x, tt + 62, 3, P.gold, 0);
    // dressing: flower beds and pots on the lawn, stones and tufts, pots on the court edge
    ehDress(c, 0, 790, 830, 1220, 31, { stones: 14, tufts: 26, flowers: 34, skip: [[440, 610, 840, 920]], cols: ['#ff6a8a', '#ffd36a', '#fff6ea', '#e8364f', '#ff8a3a'] });
    // potted orange trees and lantern posts in the near court
    for (const [x, y] of [[960, 1200], [1660, 1190]]) { celShade(c, [[x - 40, y], [x - 48, y - 60], [x + 48, y - 60], [x + 40, y]], '#2fb8b0', '#1f8a84', { light: L, off: 10, hi: '#7ae0d8', lw: 3 }); seg(c, x, y - 60, x, y - 130, 10, '#7a4a2a', 2);
      ehBlob(c, x, y - 170, 70, 56, '#3f9a4a', '#2a6a38', { lw: 3, off: 16 }); const Ro = K.rng(x); for (let k = 0; k < 7; k++) ehBlob(c, x - 50 + Ro() * 100, y - 210 + Ro() * 80, 9, 9, '#ff9a2a', '#c86a10', { lw: 2, off: 3 }); }
    for (const x of [860, 1540]) { seg(c, x, 1170, x, 1020, 8, '#6a4a3a', 2); celShade(c, [[x - 18, 1020], [x + 18, 1020], [x + 14, 990], [x, 976], [x - 14, 990]], '#ffd36a', '#e09a2a', { off: 5, lw: 2.5, line: '#6a4a10' }); ehGlaze(c, x, 1000, 60, '#ffe0a0', 0.5); }
    for (const [x, y, col] of [[780, 1120, '#e86a3a'], [1320, 1150, '#2fb8b0'], [1480, 1110, '#e86a3a'], [180, 1150, '#c8603a'], [1980, 1140, '#2fb8b0'], [1150, 1215, '#e86a3a'], [1820, 1220, '#c8603a']]) {
      celShade(c, [[x - 30, y], [x - 38, y - 50], [x + 38, y - 50], [x + 30, y]], col, ehDark(col, 0.3), { light: L, off: 8, hi: ehLight(col, 0.4), lw: 3 });
      ehBlob(c, x, y - 70, 40, 28, '#4f9a5a', '#2f6a44', { lw: 2.5 }); for (let k = 0; k < 4; k++) ehBlob(c, x - 24 + k * 16, y - 80 - (k % 2) * 12, 7, 7, ['#ff6a8a', '#ffd36a', '#fff6ea', '#e8364f'][k], '#a8203a', { lw: 1.5, off: 2 }); }
  });
}
// ---------- live parts ----------
function ehFlagLine(ctx, a, b, sag, t, cols, n = 9, sz = 22) {
  const pts = []; for (let i = 0; i <= 20; i++) { const u = i / 20; pts.push([K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) + sag * 4 * u * (1 - u)]); }
  ctx.save(); ctx.strokeStyle = '#6a4a3a'; ctx.lineWidth = 2; K.poly(ctx, pts); ctx.stroke(); ctx.restore();
  for (let i = 1; i < n; i++) { const u = i / n, x = K.lerp(a[0], b[0], u), y = K.lerp(a[1], b[1], u) + sag * 4 * u * (1 - u), fl = Math.sin(t * 5.5 + i * 1.3) * sz * 0.35, col = cols[i % cols.length];
    shape(ctx, [[x - sz * 0.5, y], [x + sz * 0.5, y], [x + fl, y + sz * 1.2]], col, { lw: 2, line: ehDark(col, 0.55) }); }
}
// o: {wind 0..1 (gust: bunting snaps, jet bends), wake [x, k] (the horse passing the fountain), gadget 0..1 (gadgets on), cam}
function ehGardenLive(ctx, t, o = {}) {
  const tc = EH_T2(t), wind = o.wind || 0, G = EH_GARDEN;
  // drifting clouds and two kites
  for (const [x0, y, s, v] of [[200, -560, 1.0, 9], [1300, -420, 0.8, 6], [900, -700, 0.7, 12]]) { const img = ehCloudSprite(0); const x = ((x0 + t * v) % 2600) - 300; ctx.drawImage(img, x - 300 * s, y - 90 * s, 600 * s, 180 * s); }
  for (const [kx, ky, col, sd] of [[420, -330, '#e8364f', 1], [1600, -470, '#ffd36a', 2]]) { const x = kx + Math.sin(t * 0.9 + sd) * 30, y = ky + Math.sin(t * 1.4 + sd * 2) * 18, r = Math.sin(tc * 2 + sd) * 0.15;
    ctx.save(); ctx.strokeStyle = 'rgba(80,60,80,0.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y + 40); ctx.quadraticCurveTo(x + 80, y + 400, kx + 200 * sd - 300, 640); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); celShade(ctx, [[0, -46], [32, 0], [0, 50], [-32, 0]], col, ehDark(col, 0.3), { light: [-1, -1], off: 10, lw: 3 }); seg(ctx, 0, -46, 0, 50, 2, ehDark(col, 0.5), 0); ctx.restore();
    ehRibbon(ctx, x, y + 50, Math.PI / 2 + 0.4 * Math.sin(t + sd), 90, 8, t, '#fff6ea', { wave: 10, hz: 1.5, tip: 0.5, lw: 1.5 }); }
  // bunting from the minarets to the cypress tops and across the dome
  const cols = [EH_EMERALD, '#f2c040', '#e8604a', '#fff6ea'], bt = t + wind * 0.6 * Math.sin(t * 14);
  ehFlagLine(ctx, [800, -40], [330, 440], 90, bt, cols, 11); ehFlagLine(ctx, [800, -40], [1350, 60], 70, bt + 1, cols, 10); ehFlagLine(ctx, [1900, -40], [1350, 60], 70, bt + 2, cols, 10);
  ehFlagLine(ctx, [720, 440], [330, 440], 50, bt + 3, cols, 8);
  // emerald banners with a gold sun hanging from the upper storey; lanterns in the arches
  for (const [i, x] of [880, 1080, 1620, 1820].entries()) { const sw = Math.sin(tc * 3 + i) * 6 + wind * 18 * Math.sin(t * 12 + i);
    celShade(ctx, [[x - 34, 262], [x + 34, 262], [x + 34 + sw * 0.5, 420], [x + sw, 450], [x - 34 + sw * 0.5, 420]], EH_PAL.banner, EH_PAL.bannerS, { light: [-1, -1], off: 10, lw: 3, line: '#0a3a24' });
    ehBlob(ctx, x + sw * 0.3, 340, 16, 16, '#f2c040', '#c8961a', { lw: 2 }); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; seg(ctx, x + sw * 0.3 + Math.cos(a) * 20, 340 + Math.sin(a) * 20, x + sw * 0.3 + Math.cos(a) * 28, 340 + Math.sin(a) * 28, 3, '#f2c040', 0); } }
  for (let i = 0; i < 6; i++) { const x = 970 + i * 150, a = Math.sin(tc * 2.2 + i * 1.7) * 0.08; ctx.save(); ctx.translate(x, 480); ctx.rotate(a);
    seg(ctx, 0, 0, 0, 60, 2, '#6a4a3a', 0); celShade(ctx, [[-12, 60], [12, 60], [16, 84], [0, 100], [-16, 84]], '#ffd36a', '#e09a2a', { off: 5, lw: 2.5, line: '#6a4a10' }); ctx.restore(); ehGlow(ctx, x + a * 80, 560, 40, 0.5, '#ffd890'); }
  // fountain jet (3 drawings on twos; bends with the wake or the wind)
  const [fx, fy] = G.fountain, f = Math.floor(tc * 12) % 3, bend = (o.wake || 0) * 60 + wind * 30;
  ctx.save(); ctx.strokeStyle = '#d8f2ff'; ctx.lineCap = 'round';
  for (const sd of [-1, 1]) { ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(fx, fy - 86); ctx.quadraticCurveTo(fx + sd * 40 + bend, fy - 170 - f * 6, fx + sd * 80 + bend * 1.3, fy - 10); ctx.stroke(); }
  ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(fx, fy - 86); ctx.quadraticCurveTo(fx + bend * 0.6, fy - 160, fx + bend, fy - 200 - f * 5); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 5; i++) { const ph = (t * 1.6 + i / 5) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(fx + (i - 2) * 30 + bend * 0.8, fy - 200 + ph * 180, 4, 0, 7); ctx.fill(); ctx.restore(); }
  // gadgets on the inventors' table: tin bird (flaps), armillary sphere (spins), windmill toy (turns)
  const [t0, t1, tt] = G.tables, gk = o.gadget ?? 1, flap = Math.sin(tc * 14) * gk;
  ctx.save(); ctx.translate(t0 + 20, tt - 4); celShade(ctx, [[-26, -6], [20, -20], [36, -26], [26, -10], [-10, 4]], '#c8d0e8', '#7a80a8', { off: 5, lw: 2.5, line: '#3a3e5a' }); for (const sd of [-1, 1]) celShade(ctx, [[-4, -10], [10 + sd * 2, -34 - flap * 14 * sd * 0.5], [18, -12]], '#e0b038', '#a87a1c', { off: 3, lw: 2 }); seg(ctx, 0, 0, 0, 4, 5, '#8a5a32', 1); ctx.restore();
  const sp = tc * 2 * gk; ctx.save(); ctx.translate(t0 + 64, tt - 40); seg(ctx, 0, 40, 0, 0, 4, '#a87a1c', 1); ctx.strokeStyle = '#e0b038'; ctx.lineWidth = 3.5;
  for (const k of [0, 1, 2]) { ctx.beginPath(); ctx.ellipse(0, 0, 30 * Math.abs(Math.cos(sp + k * 1.05)) + 2, 30, k * 0.5, 0, 7); ctx.stroke(); } ehBlob(ctx, 0, 0, 8, 8, '#3f7ad0', '#2a5aa8', { lw: 1.5 }); ctx.restore();
  ctx.save(); ctx.translate(t1 - 14, tt - 56); seg(ctx, 0, 56, 0, 0, 4, '#8a5a32', 1); ctx.rotate(tc * 4 * gk); for (let k = 0; k < 4; k++) { ctx.rotate(Math.PI / 2); celShade(ctx, [[0, 0], [8, -30], [-6, -30]], ['#e8364f', '#fff6ea', '#3f7ad0', '#ffd36a'][k], '#8a8aa0', { off: 3, lw: 2 }); } ctx.restore();
}
function ehGardenFront(ctx, t) {   // a rose bush and lantern string in the near foreground (depth)
  const tc = EH_T2(t); for (const [x, y] of [[90, 1250], [1930, 1260]]) { ehBlob(ctx, x, y - 40, 110, 70, '#3f8a44', '#2a6a38', { lw: 3, off: 20 }); for (let k = 0; k < 6; k++) ehBlob(ctx, x - 70 + k * 28, y - 80 + (k % 2) * 26 + Math.sin(tc * 2 + k) * 2, 11, 11, k % 2 ? '#e8364f' : '#ff8ab8', '#a8203a', { lw: 2, off: 3 }); }
}
// ---------- the garden drawn through a world camera ----------
function ehGarden(ctx, t, cam, o = {}) {
  const pr = (r) => [(cam.x - 1000) * (1 - r), (cam.y - 300) * (1 - r)];
  ctx.drawImage(ehGardenSkyPlate(), 0, -820, 2000, 2050);
  { const [dx, dy] = pr(0.75); ctx.drawImage(ehGardenFarPlate(), -300 + dx, 300 + dy * 0.5); }
  ctx.drawImage(ehPalacePlate(), 640, -240);
  ehGardenLive(ctx, t, o);
  ctx.drawImage(ehGardenGroundPlate(), 0, 380);
}

// ---------- skyFlight ----------
const EH_SKY = {
  low: [[0, '#2f7fe8'], [0.55, '#7ab8f8'], [1, '#cfeeff']],
  high: [[0, '#1a3aa8'], [0.45, '#3a6ad8'], [0.85, '#a8d0f8'], [1, '#e4f6ff']],
  gold: [[0, '#4a78d8'], [0.45, '#8aaae8'], [0.75, '#ffe2a0'], [1, '#ffd88a']],
  sunset: [[0, '#4a5ac8'], [0.35, '#8a78d0'], [0.58, '#ff9ab0'], [0.78, '#ff8a5a'], [1, '#ffd27a']],
};
const EH_CLOUDC = { day: ['#ffffff', '#cfe0f6'], high: ['#f4faff', '#b8d0f0'], gold: ['#fff6ea', '#ffc890'], sunset: ['#ffd8c0', '#ff9a7a'] };
function ehSkyPlate(name) { return ehBakeAt('skyp:' + name, 1000, 1230, (c, w, h) => { ehGrad(c, 0, 0, w, h, EH_SKY[name]);
  if (name === 'high') { c.save(); c.globalAlpha = 0.5; for (const [x, y] of [[200, 200], [700, 320], [450, 120]]) { c.save(); c.filter = 'blur(6px)'; c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(x, y, 260, 12, -0.1, 0, 7); c.fill(); c.restore(); } c.restore(); }
  if (name === 'sunset') { const R = K.rng(5); c.fillStyle = '#fff6ea'; for (let i = 0; i < 40; i++) { c.globalAlpha = 0.3 + R() * 0.5; c.fillRect(R() * w, R() * 380, 2, 2); } c.globalAlpha = 1; } }, 0.5); }
function ehCloudSprite(k, pal = 'day') { return ehBakeAt(`csprite:${k}:${pal}`, 600, 180, (c) => { const [b, u] = EH_CLOUDC[pal]; ehCloud(c, 300, 100, 520, 120, b, u, 7, 11 + k * 7); }, 0.6); }
// one tileable cloud layer (1000 x 1400): far = many small, mid = medium, near = few big
function ehCloudTile(layer, pal) {
  return ehBakeAt(`ctile:${layer}:${pal}`, 1000, 1400, (c) => { const R = K.rng(layer === 'far' ? 3 : layer === 'mid' ? 5 : 7), [b, u] = EH_CLOUDC[pal];
    const n = layer === 'far' ? 14 : layer === 'mid' ? 8 : 3, sz = layer === 'far' ? 0.45 : layer === 'mid' ? 0.9 : 1.7;
    for (let i = 0; i < n; i++) { const x = R() * 1000, y = R() * 1400, s = sz * (0.7 + R() * 0.6);
      for (const ox of [-1000, 0, 1000]) for (const oy of [-1400, 0, 1400]) ehCloud(c, x + ox, y + oy, 420 * s, 110 * s, b, u, layer === 'far' ? 5 : 8, i + 1); } }, 0.5);
}
function ehTile(ctx, img, ox, oy, a = 1) { const w = 1000, h = 1400, x0 = ((ox % w) + w) % w - w, y0 = ((oy % h) + h) % h - h; ctx.save(); ctx.globalAlpha *= a;
  for (let x = x0; x < 1000; x += w) for (let y = y0; y < 1230; y += h) ctx.drawImage(img, x, y, w, h); ctx.restore(); }
// the land below: tiled fields (patchwork, river, roads, villages) under a haze; variant 'home' | 'far'
function ehFieldTile(variant) {
  return ehBakeAt('fields:' + variant, 600, 400, (c, w, h) => { const R = K.rng(variant === 'far' ? 41 : 29);
    const cols = variant === 'far' ? ['#d8b86a', '#c89a4a', '#7ab89a', '#e8c890', '#a8c86a', '#5aa88a'] : ['#7ac85a', '#a8d86a', '#5aa84a', '#d8d08a', '#8ac870', '#c8b870'];
    c.fillStyle = cols[0]; c.fillRect(0, 0, w, h);
    for (let gy = 0; gy < 4; gy++) for (let gx = 0; gx < 6; gx++) { const x = gx * 100 + (R() - 0.5) * 10, y = gy * 100 + (R() - 0.5) * 10; c.fillStyle = cols[Math.floor(R() * cols.length)]; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 100, y + (R() - 0.5) * 14); c.lineTo(x + 100, y + 100); c.lineTo(x, y + 100 + (R() - 0.5) * 14); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(90,70,50,0.35)'; c.lineWidth = 2; c.stroke(); if (R() < 0.3) { c.fillStyle = 'rgba(40,90,50,0.6)'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(x + 10 + R() * 80, y + 10 + R() * 80, 5 + R() * 4, 0, 7); c.fill(); } } }
    c.strokeStyle = '#e8d2a0'; c.lineWidth = 6; c.beginPath(); for (let x = 0; x <= w; x += 10) c.lineTo(x, 300 + Math.sin(x / w * Math.PI * 2) * 30); c.stroke();
    c.strokeStyle = variant === 'far' ? '#4ab0e0' : '#3a8ae0'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); for (let x = 0; x <= w; x += 10) c.lineTo(x, 140 + Math.sin(x / w * Math.PI * 2 + 1) * 50 + Math.sin(x / w * Math.PI * 4) * 14); c.stroke();
    c.strokeStyle = '#bfe6ff'; c.lineWidth = 4; c.stroke();
    for (let i = 0; i < 3; i++) { const vx = R() * w, vy = R() * h; for (let k = 0; k < 7; k++) { c.fillStyle = ['#f6ead0', '#e8b888', '#d88a6a'][k % 3]; c.fillRect(vx + (R() - 0.5) * 40, vy + (R() - 0.5) * 26, 8, 6); } } });
}
// land: horizon y (panel), scale k (1 = low, 0.14 = very high), o: {variant, toy: palace scale or 0, toyX, haze, glint t}
function ehLand(ctx, y, k, t, o = {}) {
  if (y >= 1230) return; const img = ehFieldTile(o.variant || 'home');
  ctx.save(); ctx.beginPath(); ctx.rect(0, y, 1000, 1230 - y); ctx.clip();
  const pat = ctx.createPattern(img, 'repeat'), N = 14;   // perspective: bands from the horizon down, each nearer band larger
  for (let j = 0; j < N; j++) { const v0 = j / N, v1 = (j + 1) / N, y0 = y + (1230 - y) * v0 * v0, y1 = y + (1230 - y) * v1 * v1 + 1, sc = k * (0.35 + 2.4 * (v0 + v1) / 2);
    pat.setTransform(new DOMMatrix().translate(500 + (o.dx || 0) * sc + j * 211 * sc, y0 - j * 97 * sc).scale(sc * 1.3, sc * 0.55)); ctx.fillStyle = pat; ctx.fillRect(0, y0, 1000, y1 - y0); }
  if (o.toy) { const s = o.toy, tx = o.toyX ?? 500, ty = o.toyY ?? (y + 160 * Math.max(0.3, k)); ctx.save(); ctx.globalAlpha *= 1 - (o.hide || 0);
    ctx.fillStyle = '#5aa84a'; ctx.beginPath(); ctx.ellipse(tx, ty, 1050 * s, 160 * s, 0, 0, 7); ctx.fill();
    ctx.drawImage(ehPalacePlate(), tx - 710 * s, ty - 1020 * s, 1360 * s, 1020 * s); ctx.restore(); }
  ehGrad(ctx, 0, y, 1000, Math.min(420, 1230 - y), [[0, K.rgba(o.haze || '#dff0ff', 0.9)], [0.3, K.rgba(o.haze || '#dff0ff', 0.3)], [1, K.rgba(o.haze || '#dff0ff', 0)]]);
  if (o.glint != null) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4) % 1); ehGlint(ctx, 120 + i * 230 + Math.sin(i * 3) * 60, y + 120 + i * 40, 16, u); }
  ctx.restore();
}
// skyFlight(ctx, t, o): o.w {low, high, gold, sunset} weights (cross-fade), o.sx/o.sy cloud scroll (panel units; +sy = clouds move
// down = climbing), o.cloud palette, o.sun [x, y, r], o.land {y, k, variant, toy, toyX, hide}, o.deck y (cloud deck tops)
function ehSkyFlight(ctx, t, o = {}) {
  const W = o.w || { low: 1 }; let first = true;
  for (const n of ['low', 'high', 'gold', 'sunset']) { const a = W[n] || 0; if (a <= 0.001) continue; ctx.save(); ctx.globalAlpha *= first ? 1 : a; ctx.drawImage(ehSkyPlate(n), 0, 0, 1000, 1230); ctx.restore(); first = false; }
  if (o.sun) { const [x, y, r] = o.sun; ehGlow(ctx, x, y, r * 5, 0.7, o.sunHalo || '#fff2c0'); celShade(ctx, ell(x, y, r, r, 40), o.sunCol || '#fff6d0', ehMix(o.sunCol || '#fff6d0', '#ff9a5a', 0.3), { light: [-1, -1], off: r * 0.15, lw: 0 }); if (o.rays) ehRays(ctx, x, y, t, o.rays); }
  if (o.land) ehLand(ctx, o.land.y, o.land.k, t, o.land);
  const sx = o.sx || 0, sy = o.sy || 0, pal = o.cloud || 'day';
  ehTile(ctx, ehCloudTile('far', pal), sx * 0.2, sy * 0.2, 0.8); ehTile(ctx, ehCloudTile('mid', pal), sx * 0.5 + 300, sy * 0.5 + 500, 0.9);
  if (o.deck != null) ehDeck(ctx, o.deck, sx, t, pal);
}
function ehSkyFront(ctx, t, o = {}) { ehTile(ctx, ehCloudTile('near', o.cloud || 'day'), (o.sx || 0) + 600, (o.sy || 0) + 200, o.a ?? 0.85); }
function ehDeckStrip(pal) { return ehBakeAt('deck:' + pal, 1000, 520, (c) => { const [b, u] = EH_CLOUDC[pal]; ehGrad(c, 0, 120, 1000, 400, [[0, u], [1, ehMix(u, '#ffffff', 0.3)]]);
  for (const ox of [-1000, 0, 1000]) for (let i = 0; i < 9; i++) ehCloud(c, ox + i * 120 + 40, 120 + (i % 3) * 18, 300, 150, b, u, 6, i + 3);
  for (const ox of [-1000, 0, 1000]) for (let i = 0; i < 6; i++) ehCloud(c, ox + i * 180 + 90, 240 + (i % 2) * 30, 380, 160, ehMix(b, u, 0.2), u, 7, i + 13); }, 0.5); }
function ehDeck(ctx, y, sx, t, pal) { const img = ehDeckStrip(pal), x0 = (((sx * 1.0) % 1000) + 1000) % 1000 - 1000; for (let x = x0; x < 1000; x += 1000) ctx.drawImage(img, x, y - 120, 1000, 520); ctx.fillStyle = ehMix(EH_CLOUDC[pal][1], '#ffffff', 0.3); ctx.fillRect(0, y + 399, 1000, 1230); }
// long soft rays fanning up from the sun (sunset)
function ehRays(ctx, x, y, t, k = 1) { ctx.save(); ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32 + Math.sin(t * 0.3 + i) * 0.02, g = ctx.createLinearGradient(x, y, x + Math.cos(a) * 900, y + Math.sin(a) * 900); g.addColorStop(0, K.rgba('#ffe0a0', 0.35 * k)); g.addColorStop(1, K.rgba('#ffe0a0', 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - 0.06) * 900, y + Math.sin(a - 0.06) * 900); ctx.lineTo(x + Math.cos(a + 0.06) * 900, y + Math.sin(a + 0.06) * 900); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// two thin gold wind ribbons trailing from the rear hooves of the flying horse H (travel angle ang: the ribbons stream opposite)
function ehWindRibbons(ctx, H, t, o = {}) {
  const back = o.ang ?? (Math.sign(H.dir || 1) > 0 ? Math.PI : 0);
  for (const [i, lx] of [-86, -110].entries()) { const [x, y] = ehHorsePt(H, [lx, -6]); ctx.save(); ctx.globalAlpha *= (o.a ?? 0.85) * (i ? 0.7 : 1);
    ehRibbon(ctx, x, y, back + (o.sag ?? 0.12), (o.len || 220) * (H.s || 1) * (i ? 0.8 : 1), 15 * (H.s || 1), t + i * 0.3, '#ffe08a', { wave: 12 * (H.s || 1), hz: 2.2, tip: 0.15, lw: 0, shade: '#f2b030' }); ctx.restore(); }
}
