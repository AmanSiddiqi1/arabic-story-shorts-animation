// ===== The Ebony Horse series: the far king's palace (new in HORSE-04, reused by HORSE-05) =====
// farPalace (strip 2600 wide, ground y 900, plate y 0..1430 + far sky): outside road and outer gate (x 0..640), the broad garden
// with pool and landing lawn (640..1560), the open square with the star, arcade and royal pavilion (1560..2300), the court wall and
// court gate (2300..2600); the white palace with three tangerine domes and snow mountains behind. Colour models golden, day, morning.
// farPalaceToy (the same palace as a small sprite: horizons, descents, picture balloons). The far king and his guards (costume
// settings and gear), peacock. Pure functions of their arguments; plates baked once per model.

// ---------- the far king's people ----------
const EH_TANGERINE = '#ff8a2a', EH_COBALT = '#2a4ad0', EH_PEAGREEN = '#18a878';
const EH_FARKING = { costume: 'caliph', s: 1.04, age: 0.35, pal: { robe: '#fbf6e8', dot: '#e6dcc4', sleeve: '#fff2dc', cape: EH_TANGERINE, capeDot: '#d86a14', trim: EH_TANGERINE, sash: EH_TANGERINE, hc: '#ffffff', hd: EH_TANGERINE, jewel: EH_PEAGREEN, beard: 'short', belly: 1 } };
// four guards (A tall and thin, B short and round, C moustache, D young and sleepy) and the captain: white, tangerine, brass, cobalt
const ehFarGuardPal = (x) => ({ robe: '#fbf8f0', dot: '#d8d2e0', sleeve: '#ffffff', sleeveLen: 'long', len: 'knee', sash: EH_TANGERINE, pants: '#f0e4cc', head: 'cap', hc: '#e0b038', shoes: '#7a4a2a', ...x });
const EH_FARGUARDS = [
  { costume: 'servant', s: 1.04, age: 0.25, pal: ehFarGuardPal({ beard: 'none', tache: false }) },
  { costume: 'servant', s: 0.9, age: 0.4, pal: ehFarGuardPal({ belly: 1, beard: 'short', tache: true }) },
  { costume: 'servant', s: 0.98, age: 0.45, pal: ehFarGuardPal({ beard: 'none', tache: true }) },
  { costume: 'servant', s: 0.94, age: 0.05, pal: ehFarGuardPal({ beard: 'none', tache: false }) },
];
const EH_CAPTAIN = { costume: 'servant', s: 1.05, age: 0.45, pal: ehFarGuardPal({ robe: '#fff6ea', sash: EH_TANGERINE, beard: 'short', tache: true, len: 'long' }) };
// brass helmet with a tangerine plume (over a person P), and the cobalt neck cloth
function ehFarHelmet(ctx, P, o = {}) { const s = P.s || 1, [hx, hy] = ehHeadOf(P), d = Math.sign(P.dir || 1), tl = o.tilt || 0;
  ctx.save(); ctx.translate(hx, hy - 20 * s); ctx.rotate(tl); ctx.translate(-hx, -(hy - 20 * s));
  ehRibbon(ctx, hx - d * 2 * s, hy - 92 * s, -Math.PI / 2 - d * 0.9 + (o.sway || 0), 46 * s, 16 * s, o.t || 0, EH_TANGERINE, { wave: 3 * s, hz: 1.2, tip: 0.5, shade: '#d86a14' });
  celShade(ctx, [[hx - 40 * s, hy - 18 * s], [hx - 32 * s, hy - 56 * s], [hx, hy - 92 * s], [hx + 32 * s, hy - 56 * s], [hx + 40 * s, hy - 18 * s]], '#f0c040', '#b8861c', { light: [-1, -1], off: 12 * s, hi: '#fff1b0', lw: 3, line: '#6a4a10' });
  celShade(ctx, K.rectPts(hx - 42 * s, hy - 24 * s, 84 * s, 10 * s), EH_TANGERINE, '#d86a14', { off: 3, lw: 2, line: '#7a3a10' });
  seg(ctx, hx + d * 4 * s, hy - 16 * s, hx + d * 4 * s, hy + 6 * s, 4 * s, '#c8961a', 1); ctx.restore(); }
function ehFarNeck(ctx, P) { const s = P.s || 1, [hx, hy] = ehHeadOf(P); celShade(ctx, [[hx - 30 * s, hy + 34 * s], [hx + 30 * s, hy + 34 * s], [hx + 36 * s, hy + 54 * s], [hx - 36 * s, hy + 54 * s]], EH_COBALT, '#1a2e90', { off: 6 * s, lw: 2.5, line: '#141a5a' }); }
// spear with a small tangerine pennant; (hx, hy) = the hand, lean rad; returns the tip
function ehFarSpear(ctx, hx, hy, s, lean, t) { const tip = ehSpear(ctx, hx, hy, s, lean);
  const px = hx + Math.sin(lean) * 120 * s, py = hy - 140 * s; ehRibbon(ctx, px, py, Math.PI + 0.15 + 0.1 * Math.sin(t * 2.3 + hx), 44 * s, 18 * s, t, EH_TANGERINE, { wave: 4 * s, hz: 1.4, tip: 0.3, shade: '#d86a14', lw: 2 }); return tip; }

// ---------- farPalace geometry (world units, ground y 900) ----------
const EH_FP = { w: 2600, top: 0, h: 1430, gate: [440, 580, 620], knocker: [545, 780], palm: 330, rail: 200, wall: [380, 640, 560], pool: [820, 1180, 905, 960],
  lawn: 1320, cart: 1180, star: 1900, arcade: [1560, 2060, 560], arch2: 1680, pavilion: { x0: 2080, x1: 2300, dais: 850, sitY: 850, x: 2190 }, courtGate: [2400, 2540, 600], courtWall: [2300, 2600, 480],
  domes: [[1150, 420, 98], [1600, 372, 150], [2050, 420, 98]], towers: [980, 2220], peacocks: [760, 1460], gardener: 900 };
const EH_FPM = {   // colour models
  golden: { sky: [[0, '#4a7ad8'], [0.45, '#8ab4ee'], [0.78, '#ffe2b0'], [1, '#ffcf8a']], mtn: '#8a86d0', mtnS: '#6660a8', snow: '#fff2e4', wall: '#fbf1e0', wallS: '#e8c4a0', lawn: '#7cc05a', lawnD: '#5aa448', sand: '#efd29a', pave: '#f6e6c8', paveL: '#dcc4a0', shadow: 'rgba(120,70,90,0.2)', sun: [2500, 560], dir: -1 },
  day: { sky: [[0, '#2f7fe8'], [0.6, '#8ac8ff'], [1, '#e8f6ff']], mtn: '#7a8ad8', mtnS: '#5a66b0', snow: '#ffffff', wall: '#fbf8f2', wallS: '#cfd2e6', lawn: '#72c25a', lawnD: '#52a44a', sand: '#f2dca8', pave: '#f6eedc', paveL: '#d8ccb4', shadow: 'rgba(70,70,120,0.18)', sun: [300, 140], dir: 0.3 },
  morning: { sky: [[0, '#7ab0f0'], [0.5, '#c4dcf8'], [0.8, '#ffd6e0'], [1, '#ffe6cc']], mtn: '#9a94d8', mtnS: '#7470b4', snow: '#fff6f6', wall: '#fcf2ee', wallS: '#dcc2d4', lawn: '#7cc86a', lawnD: '#58aa58', sand: '#f2d8b0', pave: '#f8ece0', paveL: '#dccabe', shadow: 'rgba(110,80,130,0.2)', sun: [760, 300], dir: 1 },
};
const EH_FP_LINE = '#5a4050';
// the palace itself (towers, facade, domes) in world units; used by the plate and the toy sprite. o.detail false = toy simplification
function ehFarPalaceBody(c, M, o = {}) {
  const det = o.detail !== false, ln = EH_FP_LINE, dome = (cx, base, r) => { const save = EH_PAL.gold; ehDome(c, cx, base, r, EH_TANGERINE, '#d8661a'); };
  // two slim towers
  for (const tx of EH_FP.towers) { celShade(c, K.rectPts(tx - 26, 200, 52, 640), M.wall, M.wallS, { light: [-1, -1], off: 12, lw: 3, line: ln });
    for (const y of [330, 520]) celShade(c, K.rectPts(tx - 36, y, 72, 16), EH_COBALT, '#1a2e90', { off: 4, lw: 2.5, line: '#141a5a' });
    celShade(c, K.rectPts(tx - 20, 176, 40, 34), M.wall, M.wallS, { off: 6, lw: 2.5, line: ln }); if (det) { c.fillStyle = '#3a3a6a'; c.fillRect(tx - 6, 182, 12, 22); }
    ehDome(c, tx, 176, 30, EH_TANGERINE, '#d8661a'); }
  // drums and domes behind the roof line
  for (const [cx, base, r] of EH_FP.domes) { celShade(c, K.rectPts(cx - r * 0.95, base, r * 1.9, 440 - base), M.wall, M.wallS, { light: [-1, -1], off: r * 0.25, lw: 3, line: ln });
    if (det) for (let k = -2; k <= 2; k++) { const wx = cx + k * r * 0.34; c.fillStyle = '#3a4a8a'; K.poly(c, townArchPts(wx - 8, wx + 8, base + 12, base + 40, 'round'), true); c.fill(); }
    ehDome(c, cx, base, r, EH_TANGERINE, '#d8661a'); }
  // facade with a crenellated top, cobalt tile band, two rows of arched windows and the grand portal
  celShade(c, K.rectPts(900, 420, 1400, 420), M.wall, M.wallS, { light: [-1, -1], off: 30, lw: 4, line: ln });
  for (let x = 904; x < 2296; x += 36) celShade(c, K.rectPts(x, 404, 20, 18), M.wall, M.wallS, { off: 4, lw: 2, line: ln });
  celShade(c, K.rectPts(900, 440, 1400, 20), EH_COBALT, '#1a2e90', { off: 6, lw: 2.5, line: '#141a5a' });
  if (det) { c.save(); c.fillStyle = '#ffd36a'; for (let x = 912; x < 2290; x += 28) { c.beginPath(); c.moveTo(x, 450); c.lineTo(x + 6, 444); c.lineTo(x + 12, 450); c.lineTo(x + 6, 456); c.closePath(); c.fill(); } c.restore(); }
  for (const [row, y0, h] of [[0, 490, 90], [1, 640, 110]]) for (let x = 940; x < 2280; x += 92) { if (Math.abs(x + 22 - 1600) < 110) continue; const pts = townArchPts(x, x + 44, y0, y0 + h, 'pointed');
    shape(c, pts, row ? '#4a6ac8' : '#5a7ad8', { lw: 3, line: ln }); if (det) { c.save(); c.globalAlpha = 0.5; c.fillStyle = '#bfe0ff'; c.fillRect(x + 6, y0 + h * 0.45, 8, h * 0.4); c.restore(); } }
  shape(c, townArchPts(1520, 1680, 520, 840, 'pointed'), EH_TANGERINE, { lw: 4, line: ln }); shape(c, townArchPts(1540, 1660, 548, 840, 'pointed'), '#6a3a5a', { lw: 3, line: ln });
  if (det) shape(c, townArchPts(1556, 1644, 572, 840, 'pointed'), '#ffcf8a', { lw: 2, line: ln });
}
// the far sky: gradient, sun, soft clouds, two rows of snow mountains (baked; world x -600..3200, y -700..860)
function ehFarSkyPlate(model) {
  return ehBakeAt('fpsky:' + model, 3800, 1560, (c) => { const M = EH_FPM[model], R = K.rng(91); c.translate(600, 700);
    ehGrad(c, -600, -700, 3800, 1560, M.sky);
    const [sx, sy] = model === 'golden' ? [2700, 380] : model === 'morning' ? [300, 420] : [700, -300]; ehGlaze(c, sx, sy, 700, model === 'golden' ? '#ffd890' : '#fff6e0', 0.6);
    for (let i = 0; i < 9; i++) ehCloud(c, -500 + i * 430 + R() * 120, -420 + R() * 380, 420 + R() * 200, 90 + R() * 40, model === 'golden' ? '#fff3e0' : '#ffffff', model === 'golden' ? '#f0b8a0' : model === 'morning' ? '#f4c8d8' : '#c8dcf6', 8, i + 3);
    const range = (base, amp, col, sh, seed, snow) => { const Rr = K.rng(seed); let x = -600; while (x < 3200) { const w = 260 + Rr() * 260, h = amp * (0.6 + Rr() * 0.5), pk = [x + w * (0.4 + Rr() * 0.2), base - h];
      celShade(c, [[x - 40, base + 40], [pk[0] - w * 0.18, pk[1] + h * 0.35], pk, [pk[0] + w * 0.22, pk[1] + h * 0.4], [x + w + 40, base + 40]], col, sh, { light: [-1, -1], off: w * 0.25, lw: 2.5, line: ehDark(sh, 0.3) });
      if (snow) shape(c, [[pk[0] - w * 0.16, pk[1] + h * 0.3], [pk[0], pk[1]], [pk[0] + w * 0.17, pk[1] + h * 0.32], [pk[0] + w * 0.06, pk[1] + h * 0.24], [pk[0] - 0.02 * w, pk[1] + h * 0.34], [pk[0] - w * 0.08, pk[1] + h * 0.22]], M.snow, { lw: 2, line: ehDark(sh, 0.2) });
      x += w * 0.8; } };
    range(560, 520, ehMix(M.mtn, M.sky[M.sky.length - 2][1], 0.45), ehMix(M.mtnS, M.sky[M.sky.length - 2][1], 0.4), 7, true);
    range(700, 380, M.mtn, M.mtnS, 13, true);
    ehGrad(c, -600, 640, 3800, 220, [[0, K.rgba(M.sky[M.sky.length - 1][1], 0)], [1, K.rgba(M.sky[M.sky.length - 1][1], 0.85)]]);
  }, 0.3);
}
// the main plate: everything in front of the sky (world x 0..2600, y 0..1430)
function ehFarMainPlate(model) {
  return ehBakeAt('fpmain:' + model, 2600, 1430, (c) => { const M = EH_FPM[model], R = K.rng(17), ln = EH_FP_LINE;
    // back ground band and far dunes outside the wall
    ehSoftHills(c, 900, 780, 40, ehMix(M.sand, M.mtn, 0.2), 5, 1, 860);
    ehFarPalaceBody(c, M, {});
    // ground: sand outside, lawn in the garden, paving on the square and before the court wall
    ehGrad(c, 0, 820, 660, 610, [[0, ehDark(M.sand, 0.08)], [1, M.sand]]);
    ehGrad(c, 640, 820, 940, 610, [[0, M.lawnD], [1, M.lawn]]);
    c.save(); c.globalAlpha = 0.25; c.fillStyle = M.lawnD; for (let y = 860; y < 1430; y += 70) c.fillRect(640, y, 940, 30); c.restore();
    ehGrad(c, 1560, 820, 1040, 610, [[0, M.paveL], [0.3, M.pave], [1, M.pave]]);
    c.save(); c.strokeStyle = ehDark(M.paveL, 0.1); c.lineWidth = 2; for (let y = 840; y < 1430; y += 34 + (y - 840) * 0.08) { c.beginPath(); c.moveTo(1560, y); c.lineTo(2600, y); c.stroke(); }
    for (let x = 1500; x < 2700; x += 70) { c.beginPath(); c.moveTo(x + (x - 1900) * 0.02, 830); c.lineTo(x + (x - 1900) * 0.7, 1430); c.stroke(); } c.restore();
    // road outside: lighter track with ruts
    ehGrad(c, 0, 880, 640, 140, [[0, ehLight(M.sand, 0.25)], [1, ehLight(M.sand, 0.1)]]); c.save(); c.strokeStyle = ehDark(M.sand, 0.15); c.lineWidth = 3; for (const y of [910, 990]) { c.beginPath(); c.moveTo(0, y); c.lineTo(640, y + 4); c.stroke(); } c.restore();
    // the outer wall with crenels, the dark gateway (leaves are live) and its arch frame
    const [w0, w1, wt] = EH_FP.wall, [g0, g1, gt] = EH_FP.gate;
    celShade(c, K.rectPts(w0, wt, w1 - w0, 880 - wt), M.wall, M.wallS, { light: [-1, -1], off: 20, lw: 4, line: ln });
    for (let x = w0 + 4; x < w1 - 10; x += 34) celShade(c, K.rectPts(x, wt - 22, 20, 24), M.wall, M.wallS, { off: 4, lw: 2.5, line: ln });
    celShade(c, K.rectPts(w0, wt + 26, w1 - w0, 16), EH_COBALT, '#1a2e90', { off: 4, lw: 2, line: '#141a5a' });
    shape(c, townArchPts(g0 - 16, g1 + 16, gt - 22, 884, 'pointed'), EH_TANGERINE, { lw: 3.5, line: ln }); shape(c, townArchPts(g0, g1, gt, 884, 'pointed'), '#3a2a4a', { lw: 3, line: ln });
    // the court wall at the right end with its gateway
    const [c0, c1, ct] = EH_FP.courtWall, [q0, q1, qt] = EH_FP.courtGate;
    celShade(c, K.rectPts(c0, ct, c1 - c0 + 20, 880 - ct), M.wall, M.wallS, { light: [-1, -1], off: 20, lw: 4, line: ln });
    for (let x = c0 + 4; x < c1; x += 34) celShade(c, K.rectPts(x, ct - 22, 20, 24), M.wall, M.wallS, { off: 4, lw: 2.5, line: ln });
    celShade(c, K.rectPts(c0, ct + 30, c1 - c0 + 20, 16), EH_COBALT, '#1a2e90', { off: 4, lw: 2, line: '#141a5a' });
    shape(c, townArchPts(q0 - 16, q1 + 16, qt - 22, 884, 'pointed'), EH_TANGERINE, { lw: 3.5, line: ln }); shape(c, townArchPts(q0, q1, qt, 884, 'pointed'), '#3a2a4a', { lw: 3, line: ln });
    // the low back hedge across the garden and orange trees
    for (let x = 640; x < 1560; x += 46) ehBlob(c, x + 23, 812, 34, 26, '#4a9a4a', '#2f7a44', { lw: 2.5, off: 10 });
    const orange = (x, h) => { seg(c, x, 840, x + 4, 840 - h, 14, '#8a5a3a', 3); ehBlob(c, x, 840 - h - 50, 96, 84, '#3f9a4a', '#2a7a3c', { lw: 3, off: 30, hi: '#6ac25a' });
      for (let i = 0; i < 9; i++) { const a = R() * 6.28, r = R() * 70; ehBlob(c, x + Math.cos(a) * r, 840 - h - 50 + Math.sin(a) * r * 0.8, 9, 9, '#ff9a2a', '#e0701a', { lw: 1.5, off: 3 }); } };
    for (const x of [700, 1000, 1500]) orange(x, 150);
    // pool (reflecting: sky, white walls, tangerine dome smudges)
    const [p0, p1, py0, py1] = EH_FP.pool; celShade(c, K.rectPts(p0 - 10, py0 - 8, p1 - p0 + 20, py1 - py0 + 16), '#f6eedc', '#d8ccb4', { off: 4, lw: 3, line: ln });
    ehGrad(c, p0, py0, p1 - p0, py1 - py0, [[0, '#5a9ae0'], [1, '#8ac8f0']]); c.save(); c.globalAlpha = 0.4; c.fillStyle = M.wall; c.fillRect(p0 + 40, py0 + 6, p1 - p0 - 80, 14); c.fillStyle = EH_TANGERINE; for (const x of [p0 + 90, p0 + 240]) { c.beginPath(); c.ellipse(x, py0 + 30, 26, 8, 0, 0, 7); c.fill(); } c.restore();
    // arcade on the square: five pointed arches, cool shade inside
    const [a0, a1, at] = EH_FP.arcade; celShade(c, K.rectPts(a0, at - 70, a1 - a0, 880 - at + 70), M.wall, M.wallS, { light: [-1, -1], off: 22, lw: 4, line: ln });
    celShade(c, K.rectPts(a0, at - 70, a1 - a0, 16), EH_COBALT, '#1a2e90', { off: 4, lw: 2, line: '#141a5a' });
    for (let i = 0; i < 5; i++) { const x = a0 + 14 + i * 100; shape(c, townArchPts(x, x + 72, at, 884, 'pointed'), ehMix(M.wallS, '#6a6aa8', 0.45), { lw: 3, line: ln }); c.save(); c.globalAlpha = 0.35; c.fillStyle = '#ffffff'; c.fillRect(x + 6, 860, 60, 20); c.restore(); }
    // the royal pavilion: dais, steps, bench, four poles, striped tangerine and white scalloped canopy
    const PV = EH_FP.pavilion; celShade(c, K.rectPts(PV.x0, PV.dais, PV.x1 - PV.x0, 900 - PV.dais + 12), M.wall, M.wallS, { off: 10, lw: 3, line: ln });
    for (let k = 0; k < 3; k++) celShade(c, K.rectPts(PV.x0 - 40 + k * 12, 912 - (k + 1) * 18, 40 - k * 12, (k + 1) * 18), M.pave, M.paveL, { off: 3, lw: 2, line: ln });
    celShade(c, K.rectPts(PV.x0 + 40, 788, 140, 26), '#d84a5a', '#a83040', { off: 5, lw: 2.5, line: ln }); celShade(c, K.rectPts(PV.x0 + 40, 740, 140, 50), '#e8604a', '#b8402e', { off: 8, lw: 2.5, line: ln });
    for (const x of [PV.x0 + 8, PV.x0 + 70, PV.x1 - 70, PV.x1 - 8]) seg(c, x, PV.dais, x, 580, 8, '#e0b038', 2);
    const can = [[PV.x0 - 20, 580], [PV.x0 + 20, 500], [(PV.x0 + PV.x1) / 2, 470], [PV.x1 - 20, 500], [PV.x1 + 20, 580]]; celShade(c, can, '#fffaf0', '#e8dcc8', { off: 10, lw: 3, line: ln });
    c.save(); K.poly(c, can, true); c.clip(); c.fillStyle = EH_TANGERINE; for (let x = PV.x0 - 30; x < PV.x1 + 30; x += 44) { c.beginPath(); c.moveTo((PV.x0 + PV.x1) / 2, 470); c.lineTo(x, 590); c.lineTo(x + 22, 590); c.closePath(); c.fill(); } c.restore();
    for (let x = PV.x0 - 20; x < PV.x1 + 20; x += 30) shape(c, ell(x + 15, 582, 15, 12, 10).filter((q) => q[1] >= 580), '#fffaf0', { lw: 2, line: ln });
    // star inlay on the square (two rotated squares, flattened)
    c.save(); c.translate(EH_FP.star, 930); c.scale(1, 0.32); for (const r of [0, Math.PI / 4]) { c.save(); c.rotate(r); celShade(c, K.rectPts(-120, -120, 240, 240), '#f2c040', '#d8a020', { off: 0, lw: 5, line: '#a87a1c' }); c.restore(); }
    shape(c, ell(0, 0, 70, 70, 24), EH_COBALT, { lw: 4, line: '#141a5a' }); shape(c, ell(0, 0, 30, 30, 18), '#fffaf0', { lw: 3, line: '#141a5a' }); c.restore();
    // tether rail, wheelbarrow, the first palm (baked; the palm at 330 is a front pass)
    for (const x of [170, 240]) seg(c, x, 900, x, 820, 10, '#8a5a3a', 3); seg(c, 160, 836, 250, 836, 8, '#a8703a', 3);
    celShade(c, [[1090, 860], [1170, 860], [1160, 892], [1100, 892]], '#a8703a', '#7a4a2a', { off: 5, lw: 2.5, line: ln }); ehBlob(c, 1170, 896, 12, 12, '#7a4a2a', '#4a2a14', { lw: 2 }); seg(c, 1090, 866, 1050, 880, 5, '#7a4a2a', 1);
    palmTree(c, 120, 905, { h: 560, lean: -30 });
    // flower beds, stones and tufts: garden (rose and tulip), outside (sand), square edges
    ehDress(c, 660, 1540, 1000, 1400, 33, { stones: 6, tufts: 20, flowers: 40, skip: [[p0 - 20, p1 + 20, 880, 990]], cols: ['#ff4a6a', '#ffd36a', '#fff6ea', '#ff8ab8', '#ff8a2a'] });
    ehDress(c, 10, 630, 1020, 1400, 41, { stones: 12, tufts: 10, flowers: 2, stone: ['#e0c8a0', '#b89a70'], grass: ['#9ab85a', '#6a8a3a'] });
    ehDress(c, 1580, 2580, 1180, 1420, 47, { stones: 5, tufts: 8, flowers: 8 });
    // long soft shadows (direction by model)
    c.save(); c.fillStyle = M.shadow; const sd = M.dir; for (const [x, w] of [[700, 120], [1000, 120], [1500, 120], [120, 60], [980, 40], [2220, 40]]) { c.beginPath(); c.ellipse(x + sd * w * 1.2, 858, w * 1.6, 16, 0, 0, 7); c.fill(); } c.restore();
  }, 0.7);
}
// live parts drawn after the plates: pennants, pool glints, gate leaves (outer o.gate 0..1, court o.court 0..1)
function ehFarLeaves(ctx, x0, x1, top, open, M) {   // two plank leaves of a pointed gateway, swinging in (open 0..1)
  const mid = (x0 + x1) / 2, ln = EH_FP_LINE, k = 1 - K.clamp(open) * 0.85;
  ctx.save(); K.poly(ctx, townArchPts(x0, x1, top, 884, 'pointed'), true); ctx.clip();
  for (const sd of [-1, 1]) { const hx = sd < 0 ? x0 : x1, w = (mid - x0) * k, xa = sd < 0 ? hx : hx - w, pts = K.rectPts(xa, top - 80, w, 964 - top);
    celShade(ctx, pts, '#a8703a', '#7a4a2a', { light: [-1, -1], off: 10, lw: 3, line: '#4a2a14' });
    ctx.save(); ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { const x = xa + w * i / 4; ctx.beginPath(); ctx.moveTo(x, top - 80); ctx.lineTo(x, 884); ctx.stroke(); } ctx.restore();
    for (const y of [top + 60, 820]) seg(ctx, xa + 4, y, xa + w - 4, y, 6, '#3a3448', 0); }
  ctx.restore();
}
function farPalaceLive(ctx, t, o = {}) {
  const M = EH_FPM[o.model || 'golden'], tc = EH_T2(t);
  for (const [x, y, len] of [[392, 480, 70], [628, 480, 70], [EH_FP.towers[0], 110, 80], [EH_FP.towers[1], 110, 80], [2312, 400, 64], [2588, 400, 64], [EH_FP.pavilion.x0 + 110, 470, 60]]) {
    seg(ctx, x, y + 70, x, y - 10, 4, '#a87a1c', 1); ehRibbon(ctx, x, y - 6, 0.12 + 0.1 * Math.sin(t * 1.3 + x), len, 26, t + x * 0.01, EH_TANGERINE, { wave: 7, hz: 1.4, tip: 0.2, shade: '#d86a14', lw: 2 }); }
  const [p0, p1, py0, py1] = EH_FP.pool; ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlints(ctx, [p0 + 10, py0 + 6, p1 - p0 - 20, py1 - py0 - 14], t, 6, 9, 12); ctx.restore();
  ehFarLeaves(ctx, EH_FP.gate[0], EH_FP.gate[1], EH_FP.gate[2], o.gate || 0, M);
  if (o.knocker !== false) { const [kx, ky] = EH_FP.knocker, op = K.clamp(o.gate || 0); if (op < 0.2) { ctx.save(); ctx.translate(kx, ky); ctx.rotate(o.knockerRot || 0); ehBrassDisc(ctx, 0, -14, 7, 0, { lw: 2 }); ctx.lineWidth = 5; ctx.strokeStyle = '#a87a1c'; ctx.beginPath(); ctx.arc(0, 4, 14, 0, 7); ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = '#6a4a10'; ctx.stroke(); ctx.restore(); } }
  ehFarLeaves(ctx, EH_FP.courtGate[0], EH_FP.courtGate[1], EH_FP.courtGate[2], o.court || 0, M);
}
// draw the set: far sky with parallax (cam), main plate, live parts. Returns the anchors.
function farPalace(ctx, t, cam, o = {}) {
  const model = o.model || 'golden', dx = (cam.x - 1300) * 0.55, dy = (cam.y - 500) * 0.35;
  ctx.drawImage(ehFarSkyPlate(model), -600 + dx, -700 + dy, 3800, 1560);
  if (o.mix && o.mix[1] > 0) { ctx.save(); ctx.globalAlpha *= o.mix[1]; ctx.drawImage(ehFarSkyPlate(o.mix[0]), -600 + dx, -700 + dy, 3800, 1560); ctx.restore(); }
  if (o.sky) o.sky(ctx, dx, dy);
  ctx.drawImage(ehFarMainPlate(model), 0, 0, 2600, 1430);
  farPalaceLive(ctx, t, o); return EH_FP;
}
// the front pass: the palm trunk at 330 (the disguise wipe) and its fronds
function farPalaceFront(ctx, t, o = {}) { palmTree(ctx, EH_FP.palm, 910, { h: 600, lean: 26, t, sway: 1 }); }
// the palace alone as a sprite (bottom centre = world (1600, 880)); farPalaceToy(ctx, x, y, s, model): base centre at (x, y)
function ehFarToySprite(model) { return ehBakeAt('fptoy:' + model, 1560, 820, (c) => { const M = EH_FPM[model]; c.translate(-820, -80);
  c.fillStyle = M.lawnD; c.beginPath(); c.ellipse(1600, 860, 820, 60, 0, 0, 7); c.fill(); ehFarPalaceBody(c, M, { detail: true });
  for (let x = 860; x < 2340; x += 50) ehBlob(c, x + 25, 846, 34, 22, '#4a9a4a', '#2f7a44', { lw: 2.5, off: 8 }); }, 0.45); }
function farPalaceToy(ctx, x, y, s, model = 'golden') { ctx.drawImage(ehFarToySprite(model), x - 780 * s, y - 800 * s, 1560 * s, 820 * s); }

// ---------- peacock (side view, about 330 tall at s 1; feet at (x, y)) ----------
// P: {x, y, s, dir, ph, amp (walk), fan 0..1 (the train spreads into a fan), tilt (head), peck 0..1, lid}
function peacock(ctx, P) {
  const s = P.s || 1, d = P.dir || 1, fan = K.clamp(P.fan || 0), sw = (P.amp || 0) * Math.sin(P.ph || 0), ln = '#14284a';
  ctx.save(); ctx.translate(P.x, P.y); ctx.scale(d * s, s);
  // train: folded (a long tail to the back) or fanned (a wheel behind the body)
  const n = 11; for (let i = 0; i < n; i++) { const u = i / (n - 1), fa = K.lerp(Math.PI + 0.12 + (u - 0.5) * 0.14, Math.PI * 0.5 + (u - 0.5) * Math.PI * 1.45, fan), L = K.lerp(220, 230, fan) * (0.85 + 0.15 * Math.sin(u * Math.PI));
    const bx = -30, by = -120 + 20 * (1 - fan), ex = bx + Math.cos(fa) * L, ey = by - Math.sin(fa) * L * K.lerp(0.3, 1, fan), nx = -Math.sin(fa) * 16, ny = -Math.cos(fa) * 16;
    celShade(ctx, [[bx, by], [ex + nx, ey + ny], [ex + Math.cos(fa) * 12, ey - Math.sin(fa) * 12], [ex - nx, ey - ny]], '#2aa86a', '#1a7a4a', { light: [-1, -1], off: 6, lw: 2, line: ln });
    shape(ctx, ell(ex, ey, 12, 10, 12), '#f2c040', { lw: 1.5, line: ln }); shape(ctx, ell(ex, ey, 7, 6, 10), '#2a4ad0', { lw: 0 }); shape(ctx, ell(ex, ey, 3, 3, 8), '#14284a', { lw: 0 }); }
  // legs (walk on twos via ph)
  for (const sd of [-1, 1]) { const a = sd * sw * 0.5; seg(ctx, 8 * sd, -70, 8 * sd + Math.sin(a) * 60, -6, 5, '#b89a7a', 1.5); seg(ctx, 8 * sd + Math.sin(a) * 60, -4, 8 * sd + Math.sin(a) * 60 + 16, -2, 4, '#b89a7a', 1); }
  // body, neck, head with crest
  celShade(ctx, [[-60, -110], [-20, -138], [30, -130], [44, -100], [24, -66], [-30, -62], [-64, -84]], '#2a5ad0', '#1a3a98', { light: [-1, -1], off: 14, hi: '#5a8af0', lw: 3, line: ln });
  const tl = P.tilt || 0, pk = K.clamp(P.peck || 0); ctx.save(); ctx.translate(30, -128); ctx.rotate(0.15 * pk);
  celShade(ctx, [[-10, 6], [4, -60], [12, -110], [30, -122], [40, -106], [24, -96], [18, -50], [14, 4]], '#2a6ae0', '#1a48a8', { light: [-1, -1], off: 6, lw: 2.5, line: ln });
  ctx.translate(26, -112); ctx.rotate(tl); ehBlob(ctx, 0, 0, 16, 14, '#2a6ae0', '#1a48a8', { lw: 2.5, off: 5, line: ln });
  for (let k = -2; k <= 2; k++) { const a = -Math.PI / 2 - 0.3 + k * 0.18; seg(ctx, -2, -10, -2 + Math.cos(a) * 26, -10 + Math.sin(a) * 26, 1.5, ln, 0); shape(ctx, ell(-2 + Math.cos(a) * 28, -10 + Math.sin(a) * 28, 4, 4, 8), '#2aa86a', { lw: 1, line: ln }); }
  shape(ctx, [[12, -4], [28, 2], [12, 6]], '#e8b060', { lw: 1.5, line: ln }); shape(ctx, ell(4, -4, 6, 5, 10), '#ffffff', { lw: 1.5, line: ln });
  if ((P.lid || 0) < 0.6) shape(ctx, ell(5, -4, 2.6, 2.6, 8), '#14142a', { lw: 0 }); else seg(ctx, 0, -4, 9, -4, 2, ln, 0);
  ctx.restore(); ctx.restore();
}
