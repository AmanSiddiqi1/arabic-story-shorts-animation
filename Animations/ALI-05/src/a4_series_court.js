// ===== ALI-04 series set and props (new in episode 4, for episodes 4 to 6: copy this file into ALI-05/06 src/ and extend there) =====
// courtyard (CY anchors, models evening + night, baked sky and yard plates, live gates, doors, windows, lanterns, lemon tree, palm),
// kitchen (baked interior + live embers, pans, garlic, the window onto the yard), jars as data on the yard (cyJar: the ALI-03 oilJar with
// the new jarCutaway / jarPeek fields), oilLamp, gateBar, darkLantern, householdArms (rollingPin, fryingPan), disguiseWipe.
// Night is painted light and coloured (nothing darker than #2a4a8a in the sky or #5a5a8a on a wall); no tint over the cast.
// Every drawing is a pure function of its arguments (and t).

// ---------- anchors (world 2200 x 1230; wings stand on y 900, the back wall and its gates on y 872) ----------
const CY = {
  w: 2200, gr: 900, base: 872,
  wing: { x1: 560, top: 260 }, K: { i: 'K', cx: 170, x0: 110, x1: 230, top: 650, col: '#3f7ad0' },
  kwin: { x: 330, y: 500, w: 140, h: 140 }, bwin: { x: 120, y: 340, w: 100, h: 100 }, bench: { x0: 320, x1: 480, y: 850 },
  wall: { x0: 560, x1: 1800, top: 560 }, gate: { cx: 730, x0: 640, x1: 820, top: 640, bar: 780 },
  back: { cx: 1590, x0: 1535, x1: 1645, top: 670 },
  jars: [890, 1005, 1120, 1235, 1350, 1465], jarY: 884, jarS: 1.67, jarTop: 884 - 150 * 1.67, rimY: 884 - 142 * 1.67,
  crate: { x0: 1670, x1: 1750, top: 820 }, trellis: { x0: 1680, x1: 1750, top: 560, bot: 820 },
  guest: { x0: 1800, top: 400 }, G: { i: 'G', cx: 1930, x0: 1870, x1: 1990, top: 650, col: '#2a9a8a' }, gwin: { x: 2040, y: 520, w: 100, h: 120 },
  lanterns: [[270, 610], [840, 610], [1840, 600]], lemon: 600, waterJar: 1770, line: [[560, 440], [880, 470]], palm: 1100,
};
AB_LEAF.night = ['#4a9a86', '#2e6a66', '#9ad8c0'];   // night foliage: teal-green, never near-black
AB_BARK.night = ['#8a6a7a', '#5a4a62'];
const AB_COURT = {   // sky, kitchen wing, back wall, guest wing, paving top/bottom, stone edge, coping, far roofs, clouds
  evening: { sky: [[0, '#2f6f8e'], [0.2, '#6a74b8'], [0.36, '#ff9a9a'], [0.47, '#ffc27a']], wing: '#e0a888', wall: '#efcaa0', guest: '#f2b4a4', pave: ['#eab08e', '#c08070'], edge: '#ffe0c0', cop: '#c8643a',
    far: '#9a7ab0', farD: '#7a5a98', cloud: ['#d89ac0', '#ffd0a0'], night: 0, leaf: 'dusk', door: '#4a2a3a', win: '#5a3448' },
  night: { sky: [[0, '#2a4a8a'], [0.22, '#3e5aa0'], [0.36, '#7a6ab0'], [0.46, '#a47ab4']], wing: '#c8a0a8', wall: '#b89ab8', guest: '#8a94c0', pave: ['#8c8cbc', '#7a7aa8'], edge: '#a8b0d8', cop: '#8a7ac0',
    far: '#5a66a4', farD: '#4c5896', cloud: ['#6a6aa8', '#c8b8e8'], night: 1, leaf: 'night', door: '#3a3466', win: '#3a3a6a' },
};
const cyLine = (c) => abDark(c, 0.6);

// ---------- the sky layer: 2800 wide from world x -300, parallax 0.3 (cySky); far roofs, a dome, a minaret ----------
function cySkyPlate(m) {
  return abBakeAt('cy:sky:' + m, 2800, 1230, (c, w) => {
    const M = AB_COURT[m]; c.translate(300, 0); abGrad(c, -300, 0, w, 1230, M.sky);
    if (M.night) { const R = K.rng(12); c.fillStyle = '#fff6ea'; for (let i = 0; i < 140; i++) { c.globalAlpha = 0.35 + R() * 0.6; const s = R() < 0.15 ? 3 : 2; c.fillRect(-300 + R() * w, R() * 480, s, s); } c.globalAlpha = 1; }
    else { abGlaze(c, 300, 560, 900, '#ffcf8a', 0.5); abGlaze(c, 1600, 300, 500, '#ffd0b0', 0.25); }
    for (const [x, y, s] of M.night ? [[350, 150, 0.9], [1200, 250, 0.7], [2050, 120, 1.0]] : [[250, 160, 1], [950, 110, 0.8], [1600, 200, 1.1], [2150, 130, 0.9]]) abCloud(c, x, y, 380 * s, 86 * s, M.cloud[0], M.cloud[1], 9);
    const R = K.rng(17); c.save(); c.filter = 'blur(1.6px)';
    for (let x = -300; x < 2500; x += 70 + R() * 60) { const h = 50 + R() * 110, ww = 80 + R() * 90; c.fillStyle = R() < 0.5 ? M.far : M.farD; c.fillRect(x, 600 - h, ww, h + 400);
      if (M.night && R() < 0.55) { c.fillStyle = '#ffd98a'; c.fillRect(x + ww * 0.4, 620 - h + 16, 9, 11); } }
    c.fillStyle = M.farD; c.beginPath(); c.ellipse(1350, 440, 100, 104, 0, Math.PI, 0); c.fill(); c.fillRect(1250, 440, 200, 220); c.fillRect(1346, 310, 8, 34);
    c.beginPath(); c.arc(1350, 300, 12, 0.6, 5.7); c.fill();
    c.fillRect(884, 150, 34, 500); c.beginPath(); c.ellipse(901, 150, 26, 36, 0, Math.PI, 0); c.fill(); c.fillRect(872, 240, 58, 14);
    if (M.night) { c.fillStyle = '#ffd98a'; c.fillRect(1340, 470, 14, 22); c.fillRect(895, 300, 10, 14); }
    c.restore();
  });
}
function cySkyX(cam) { return (cam.x - 1100) * 0.3; }
function cySky(ctx, cam, m, a = 1) { if (a <= 0.003) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(cySkyPlate(m), -300 + cySkyX(cam), 0); ctx.restore(); }
// the moon (or the low sun) in sky space (parallax like the sky)
function cyMoon(ctx, cam, x, y, k = 1, r = 60) { tsMoon(ctx, x + cySkyX(cam), y, k, r); }

// ---------- the yard plate (walls, wings, paving, fixed dressing), baked per model ----------
function cyPlate(m) {
  return abBakeAt('cy:yard:' + m, 2200, 1230, (c, w) => {
    const M = AB_COURT[m], L = [1, -0.6], night = M.night;
    // roofs of the neighbours behind the back wall
    const Rr = K.rng(5); for (let x = 600; x < 1780; x += 150 + Rr() * 80) { if (Math.abs(x - 1100) < 90) continue; const h = 40 + Rr() * 60, ww = 110 + Rr() * 60, col = abMul(M.wall, night ? '#9aa4e0' : '#ffd0b0', 0.35);
      celShade(c, K.rectPts(x, CY.wall.top - h, ww, h + 4), col, abDark(col, 0.2), { light: L, off: 8, lw: 2.5, line: cyLine(col) });
      if (Rr() < 0.6) { c.fillStyle = night ? '#ffd98a' : '#6a4a5a'; c.fillRect(x + ww * 0.3, CY.wall.top - h + 12, 16, 18); if (night) abGlaze(c, x + ww * 0.3 + 8, CY.wall.top - h + 20, 40, '#ffcf6a', 0.5); } }
    // paving (the yard floor from the back wall to the bottom)
    abGrad(c, 0, CY.base - 4, w, 1230 - CY.base + 4, [[0, M.pave[0]], [1, M.pave[1]]]);
    const R = K.rng(33); c.save(); c.lineWidth = 2.5;
    const rows = [884, 912, 950, 1000, 1064, 1140, 1230]; for (let k = 0; k < rows.length - 1; k++) { c.strokeStyle = K.rgba(abDark(M.pave[1], 0.3), 0.45); c.beginPath(); c.moveTo(0, rows[k]); c.lineTo(w, rows[k]); c.stroke();
      c.strokeStyle = K.rgba(M.edge, night ? 0.55 : 0.4); c.beginPath(); c.moveTo(0, rows[k] + 3); c.lineTo(w, rows[k] + 3); c.stroke(); c.strokeStyle = K.rgba(abDark(M.pave[1], 0.3), 0.45);
      const st = 60 + k * 26; for (let x = (k % 2) * st / 2 + R() * 10; x < w; x += st + R() * 16) { c.beginPath(); c.moveTo(x, rows[k] + 2); c.lineTo(x + 3, rows[k + 1] - 2); c.stroke(); } } c.restore();
    // the back wall with a tiled coping, plaster patches, the two gate openings
    const wc = M.wall; celShade(c, [[CY.wall.x0, CY.base], [CY.wall.x0, CY.wall.top], [CY.wall.x1, CY.wall.top], [CY.wall.x1, CY.base]], wc, abDark(wc, 0.18), { light: L, off: 16, lw: 3.5, line: cyLine(wc) });
    const Rw = K.rng(44); c.save(); c.filter = 'blur(2px)'; for (let k = 0; k < 16; k++) { c.fillStyle = K.rgba(abDark(wc, 0.15), 0.35); c.beginPath(); c.ellipse(CY.wall.x0 + Rw() * 1240, CY.wall.top + 40 + Rw() * 260, 30 + Rw() * 50, 10 + Rw() * 16, 0, 0, 7); c.fill(); } c.restore();
    celShade(c, K.rectPts(CY.wall.x0 - 6, CY.wall.top - 16, CY.wall.x1 - CY.wall.x0 + 12, 18), M.cop, abDark(M.cop, 0.3), { light: L, off: 6, lw: 3, line: cyLine(M.cop) });
    if (night) { c.save(); c.strokeStyle = 'rgba(214,232,255,0.8)'; c.lineWidth = 4; c.beginPath(); c.moveTo(CY.wall.x0, CY.wall.top - 16); c.lineTo(CY.wall.x1, CY.wall.top - 16); c.stroke(); c.restore(); }
    celShade(c, K.rectPts(CY.wall.x0, CY.base - 22, CY.wall.x1 - CY.wall.x0, 22), abDark(wc, 0.1), abDark(wc, 0.25), { light: L, off: 4, lw: 2.5, line: cyLine(wc) });
    // the street gate frame (stone arch) and the back gate frame
    const G = CY.gate, stone = abMul('#e8d2b0', night ? '#a8a4e0' : '#ffd0b0', 0.3);
    celShade(c, townArchPts(G.x0 - 18, G.x1 + 18, G.top - 20, CY.base, 'round'), stone, abDark(stone, 0.25), { light: L, off: 6, lw: 3, line: cyLine(stone) });
    for (const bx of [G.x0 + 8, G.x1 - 8]) celShade(c, K.rectPts(bx - 8, G.bar - 14, 16, 28), '#5a5a6a', '#3a3a4a', { off: 3, lw: 2 });   // bar brackets
    const B = CY.back; celShade(c, K.rectPts(B.x0 - 12, B.top - 14, B.x1 - B.x0 + 24, CY.base - B.top + 14), stone, abDark(stone, 0.25), { light: L, off: 5, lw: 3, line: cyLine(stone) });
    // the vine trellis and the crate
    const T = CY.trellis; c.save(); c.strokeStyle = '#8a5a3a'; c.lineWidth = 7; for (const x of [T.x0, T.x1]) { c.beginPath(); c.moveTo(x, T.bot); c.lineTo(x, T.top - 6); c.stroke(); }
    c.lineWidth = 4; for (let y = T.top + 20; y < T.bot; y += 52) { c.beginPath(); c.moveTo(T.x0, y); c.lineTo(T.x1, y); c.stroke(); } c.restore();
    const vine = night ? ['#4a9a7a', '#2e6a5a'] : ['#4f9a5a', '#2f6a44']; const Rv = K.rng(91); for (let i = 0; i < 16; i++) { const y = T.top + Rv() * (T.bot - T.top), x = T.x0 - 14 + Rv() * (T.x1 - T.x0 + 28); abBlob(c, x, y, 16 + Rv() * 8, 11 + Rv() * 5, vine[0], vine[1], { lw: 2, off: 4, line: abDark(vine[1], 0.4) }); }
    for (let i = 0; i < 5; i++) abBlob(c, T.x0 + 10 + Rv() * 60, T.top + 60 + Rv() * 200, 7, 7, night ? '#9a7ad0' : '#8a3a8a', '#5a2a5a', { lw: 1.5, off: 2 });
    const Cr = CY.crate, crc = night ? '#b08a7a' : '#b8844a'; celShade(c, K.rectPts(Cr.x0, Cr.top, Cr.x1 - Cr.x0, 900 - Cr.top), crc, abDark(crc, 0.3), { light: L, off: 8, lw: 3, line: cyLine(crc) });
    seg(c, Cr.x0 + 4, Cr.top + 4, Cr.x1 - 4, 896, 6, abDark(crc, 0.2), 1); seg(c, Cr.x1 - 4, Cr.top + 4, Cr.x0 + 4, 896, 6, abDark(crc, 0.2), 1);
    // the kitchen wing (left) and the guest wing (right): plastered blocks with parapets and beam ends
    const wing = (x0, x1, top, col) => { celShade(c, [[x0, 900], [x0, top], [x1, top], [x1, 900]], col, abDark(col, 0.2), { light: L, off: 18, lw: 3.5, line: cyLine(col) });
      const Rk = K.rng(x0 + 7); c.save(); c.filter = 'blur(2px)'; for (let k = 0; k < 7; k++) { c.fillStyle = K.rgba(abDark(col, 0.15), 0.35); c.beginPath(); c.ellipse(x0 + Rk() * (x1 - x0), top + 60 + Rk() * 480, 30 + Rk() * 40, 10 + Rk() * 14, 0, 0, 7); c.fill(); } c.restore();
      const par = abDark(col, 0.12); celShade(c, K.rectPts(x0 - 8, top - 14, x1 - x0 + 16, 22), par, abDark(par, 0.3), { light: L, off: 6, lw: 3, line: cyLine(par) });
      for (let bx = x0 + 30; bx < x1 - 20; bx += 70) seg(c, bx, top + 22, bx + 18, top + 28, 9, abDark(par, 0.25), 1.5);
      if (night) { c.save(); c.strokeStyle = 'rgba(214,232,255,0.75)'; c.lineWidth = 4; c.beginPath(); c.moveTo(x0 - 8, top - 14); c.lineTo(x1 + 8, top - 14); c.stroke(); c.restore(); }
      celShade(c, K.rectPts(x0, 872, x1 - x0, 28), abDark(col, 0.1), abDark(col, 0.3), { light: L, off: 4, lw: 2.5, line: cyLine(col) }); };
    wing(-20, CY.wing.x1, CY.wing.top, M.wing); wing(CY.guest.x0, 2220, CY.guest.top, M.guest);
    // window frames (the glass / recess is live), the bench and herb pots, the broom against the wing, the water jar
    const frame = abMul('#f0dcc0', night ? '#b0aae8' : '#ffe0c0', 0.25);
    for (const W of [CY.kwin, CY.bwin, CY.gwin]) celShade(c, K.rectPts(W.x - 12, W.y - 14, W.w + 24, W.h + 22), frame, abDark(frame, 0.25), { light: L, off: 5, lw: 3, line: cyLine(frame) });
    const Bn = CY.bench, bc = night ? '#9a7a8a' : '#a8743e'; celShade(c, K.rectPts(Bn.x0, Bn.y, Bn.x1 - Bn.x0, 14), bc, abDark(bc, 0.3), { light: L, off: 4, lw: 2.5, line: cyLine(bc) }); for (const lx of [Bn.x0 + 10, Bn.x1 - 10]) seg(c, lx, Bn.y + 14, lx, 900, 7, abDark(bc, 0.3), 1.5);
    [[350, '#c0603a'], [400, '#d8843a'], [450, '#b86a3a']].forEach(([px, pc], k) => { const pcol = night ? abMul(pc, '#a8a0e0', 0.3) : pc; celShade(c, [[px - 14, Bn.y], [px - 18, Bn.y - 30], [px + 18, Bn.y - 30], [px + 14, Bn.y]], pcol, abDark(pcol, 0.35), { light: L, off: 5, lw: 2.5 });
      abLeafBlobs(c, px, Bn.y - 46, 20, M.leaf, px + k); });
    seg(c, 525, 640, 505, 892, 7, '#c8a070', 1.5); celShade(c, [[495, 860], [515, 860], [530, 900], [480, 900]], '#e8c870', '#b89040', { light: L, off: 4, lw: 2 });   // the household broom
    const wj = night ? '#c07a5a' : '#c8743a'; celShade(c, [[CY.waterJar - 24, 900], [CY.waterJar - 36, 860], [CY.waterJar - 30, 820], [CY.waterJar - 14, 808], [CY.waterJar + 14, 808], [CY.waterJar + 30, 820], [CY.waterJar + 36, 860], [CY.waterJar + 24, 900]], wj, abDark(wj, 0.35), { light: L, off: 9, lw: 3, line: cyLine(wj) });
    // lantern bodies on brackets (the glow is live)
    CY.lanterns.forEach(([lx, ly]) => { seg(c, lx - 16, ly - 34, lx, ly - 34, 4, '#4a3a4a', 1);
      celShade(c, [[lx - 12, ly - 22], [lx + 12, ly - 22], [lx + 16, ly + 10], [lx, ly + 22], [lx - 16, ly + 10]], '#ffd36a', '#a8641a', { light: L, off: 4, lw: 2.5, line: '#5a3a1a' });
      celShade(c, [[lx - 8, ly - 30], [lx + 8, ly - 30], [lx + 12, ly - 22], [lx - 12, ly - 22]], '#c8481a', '#7a2a10', { light: L, off: 2, lw: 2 }); });
    // ground dressing: tufts and stones between the paving, a few flowers by the wings
    abDress(c, 0, 2200, 930, 1215, 57, { stones: 16, tufts: 30, flowers: night ? 6 : 14, grass: night ? ['#5a9a8a', '#2e6a66'] : ['#6ac05a', '#2f7a44'], stone: night ? ['#b0a8d0', '#7a70a0'] : ['#e0c8a8', '#a08070'], cols: night ? ['#ff9ab0', '#ffd36a', '#c8a0ff'] : undefined });
    c.save(); c.globalAlpha = night ? 0.25 : 0.16; c.fillStyle = '#2b1a3a'; c.fillRect(CY.wall.x0, CY.base, CY.wall.x1 - CY.wall.x0, 14); c.fillRect(0, 900, CY.wing.x1, 16); c.fillRect(CY.guest.x0, 900, 400, 16); c.restore();
  });
}

// ---------- live parts ----------
// the street gate seen from inside: o.open 0..1 (leaves swing in), o.bar 0..1 (0 raised and tilted, 1 down in the brackets; null = none),
// o.inside(ctx) figures in the opening (clipped), m model
function cyGate(ctx, t, m, o = {}) {
  const G = CY.gate, night = AB_COURT[m].night, pts = townArchPts(G.x0, G.x1, G.top, CY.base, 'round'), op = K.clamp(o.open || 0), col = night ? '#9a7a9a' : '#a8743e';
  ctx.save(); K.poly(ctx, pts, true); ctx.clip();
  abGrad(ctx, G.x0, G.top, 180, CY.base - G.top, night ? [[0, '#4a4a80'], [1, '#6a5a8a']] : [[0, '#ffb98a'], [1, '#e8a080']]);
  ctx.fillStyle = night ? '#7a6a9a' : '#f2b48a'; ctx.fillRect(G.x0, 700, 180, 180); ctx.fillStyle = night ? '#5a4a7a' : '#c88a6a'; ctx.fillRect(G.x0, 830, 180, 50);   // the house opposite
  if (night) { ctx.fillStyle = '#ffd98a'; ctx.fillRect(G.x0 + 110, 740, 16, 20); }
  if (o.inside) o.inside(ctx);
  const half = 90 * (1 - 0.86 * op);
  for (const [x0, sd] of [[G.x0, -1], [G.x1 - half, 1]]) { celShade(ctx, K.rectPts(x0, G.top - 20, half, CY.base - G.top + 20), col, abDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3, line: abDark(col, 0.6) });
    ctx.strokeStyle = abDark(col, 0.45); ctx.lineWidth = 2.5; for (let k = 1; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x0 + half * k / 3, G.top - 20); ctx.lineTo(x0 + half * k / 3, CY.base); ctx.stroke(); }
    if (half > 30) for (const fy of [700, 820]) seg(ctx, x0 + 4, fy, x0 + half - 4, fy, 6, abDark(col, 0.5), 1.5); }
  ctx.restore(); ink(ctx, pts.slice(1, -1), 4, 1, '#5a3a2a');
  if (o.creak) { ctx.save(); ctx.strokeStyle = '#fff1d8'; ctx.lineWidth = 3; ctx.globalAlpha = o.creak; ctx.beginPath(); for (let k = 0; k < 5; k++) ctx.lineTo(G.x0 - 30 - k * 8, 690 - k * 10 + (k % 2) * 8); ctx.stroke(); ctx.restore(); }
  if (o.bar != null) gateBar(ctx, G.cx, G.bar, { down: o.bar, wrap: o.wrap });
}
// gateBar: a wooden bar 200 x 22 across a gate at y (centre cx); down 0..1 (0: raised 60 and tilted 8 degrees), o.wrap: scarf end round it
function gateBar(ctx, cx, y, o = {}) { const d = K.clamp(o.down ?? 1); ctx.save(); ctx.translate(cx + (o.dx || 0), y - 60 * (1 - d)); ctx.rotate(-0.14 * (1 - d));
  celShade(ctx, K.rectPts(-100, -11, 200, 22), '#b07a46', '#7a4a24', { light: [-1, -1], off: 6, hi: '#d8a870', lw: 3, line: '#4a2a12' });
  if (o.wrap) { celShade(ctx, [[-30, -14], [-6, -14], [-2, 16], [-34, 16]], AB_MORG_ACC, '#0e8a90', { off: 3, lw: 2, line: '#0a5a60' }); }
  ctx.restore(); }
// the small back gate (single plank door, hinged left) with its latch: open 0..1, latch 0..1 (1 dropped)
function cyBackGate(ctx, m, open = 0, latch = 1) { const B = CY.back, night = AB_COURT[m].night, col = night ? '#8a7aa0' : '#9a6a3a', lw = (B.x1 - B.x0) * (1 - open);
  ctx.save(); ctx.fillStyle = night ? '#4a4a7a' : '#6a3a3a'; ctx.fillRect(B.x0, B.top, B.x1 - B.x0, CY.base - B.top);
  if (lw > 2) { celShade(ctx, K.rectPts(B.x0, B.top, lw, CY.base - B.top), col, abDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3, line: abDark(col, 0.6) });
    ctx.strokeStyle = abDark(col, 0.45); ctx.lineWidth = 2.5; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(B.x0 + lw * k / 4, B.top); ctx.lineTo(B.x0 + lw * k / 4, CY.base); ctx.stroke(); }
    ctx.save(); ctx.translate(B.x1 - 14, 770); ctx.rotate(-1.2 * (1 - latch)); seg(ctx, -30, 0, 10, 0, 7, '#6a6a7a', 1.5); ctx.restore(); shape(ctx, ell(B.x1 - 8, 770, 6, 9, 10), '#5a5a6a', { lw: 2 }); }
  ctx.restore(); }
// a lit / dark window recess with optional shutters (sh 0 shut .. 1 open; slit: the shut pair opened a hand's width) and inside(ctx)
function cyWindow(ctx, W, m, o = {}) {
  const night = AB_COURT[m].night, lit = o.lit || 0; ctx.save(); ctx.beginPath(); ctx.rect(W.x, W.y, W.w, W.h); ctx.clip();
  abGrad(ctx, W.x, W.y, W.w, W.h, night ? [[0, '#3a3a6a'], [1, '#4a3a6a']] : [[0, '#5a3448'], [1, '#7a4a5a']]);
  if (lit > 0) { ctx.globalAlpha = lit; abGrad(ctx, W.x, W.y, W.w, W.h, [[0, '#ffe09a'], [1, '#f0a050']]); ctx.globalAlpha = 1; }
  if (o.inside) o.inside(ctx);
  ctx.restore();
  if (o.sh != null) { const col = o.col || (night ? '#6a8ad8' : '#3f7ad0'), sh = K.clamp(o.sh), slit = o.slit || 0;
    for (const sd of [-1, 1]) { const hx = sd < 0 ? W.x : W.x + W.w, a = sh * Math.PI * 0.92, cw = Math.cos(a) * (W.w / 2 - slit * 10), ex = hx - sd * cw, ys = 5 * Math.sin(a);
      if (Math.abs(cw) < 3) { seg(ctx, hx, W.y, hx, W.y + W.h, 5, col, 2); continue; }
      celShade(ctx, [[hx, W.y], [ex, W.y + ys], [ex, W.y + W.h - ys], [hx, W.y + W.h]], col, abDark(col, 0.3), { light: [-1, -1], off: 5, lw: 3, line: abDark(col, 0.6) });
      ctx.save(); ctx.strokeStyle = abDark(col, 0.45); ctx.lineWidth = 2.5; for (let k = 1; k < 6; k++) { const yy = W.y + W.h * k / 6; ctx.beginPath(); ctx.moveTo(hx, yy); ctx.lineTo(ex, yy); ctx.stroke(); } ctx.restore(); } }
  if (lit > 0 && night) abGlow(ctx, W.x + W.w / 2, W.y + W.h / 2, W.w * 1.3, 0.45 * lit, '#ffcf6a');
}
// lantern glows (k: number or array per lantern), flicker on twos, warm pools on the paving
function cyLanterns(ctx, t, k = 1) { const tc = AB_T2(t); CY.lanterns.forEach(([lx, ly], i) => { const kk = Array.isArray(k) ? k[i] : k; if (kk <= 0.01) return; const f = 0.85 + 0.15 * Math.sin(tc * 11 + i * 2.3) * Math.sin(tc * 5.7 + i);
  abGlow(ctx, lx, ly, 160 * f, 0.75 * kk, '#ffb860'); abGlow(ctx, lx, ly, 46, 0.9 * kk, '#fff0c0'); ctx.save(); ctx.globalAlpha = 0.28 * kk; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.ellipse(lx + 6, i === 1 ? 882 : 912, 130 * f, 18, 0, 0, 7); ctx.fill(); ctx.restore(); }); }
// the lemon tree in its tub (leaves and lemons stir), the palm beyond the wall (fronds sway), the washing line
function cyLemon(ctx, t, m) { const x = CY.lemon, tc = AB_T2(t), M = AB_COURT[m], sw = idleSway(tc, 801, 4, 3.3);
  celShade(ctx, [[x - 34, 900], [x - 40, 846], [x + 40, 846], [x + 34, 900]], M.night ? '#a8708a' : '#c0603a', M.night ? '#7a4a6a' : '#7a3a2a', { light: [1, -0.6], off: 8, lw: 3 });
  seg(ctx, x, 848, x + 4 + sw * 0.3, 720, 12, M.night ? '#8a6a7a' : '#8a5a3a', 2.5);
  abLeafBlobs(ctx, x + sw * 0.5, 690, 70, M.leaf, 811, tc, 0.4); abLeafBlobs(ctx, x - 40 + sw, 650, 50, M.leaf, 812, tc, 0.4); abLeafBlobs(ctx, x + 44 + sw, 660, 52, M.leaf, 813, tc, 0.4);
  const R = K.rng(814); for (let i = 0; i < 7; i++) abBlob(ctx, x - 70 + R() * 140 + sw, 630 + R() * 100, 9, 11, '#ffe24a', '#d8a41a', { lw: 2, off: 3, line: '#8a6a10' }); }
function cyPalm(ctx, t, m) { ctx.save(); palmTree(ctx, CY.palm, CY.wall.top + 10, { s: 0.62, h: 560, lean: 18, fronds: 9, nuts: 2, t: AB_T2(t), sway: 1 }); ctx.restore(); }
function cyWash(ctx, t, m) { const [[x0, y0], [x1, y1]] = CY.line, tc = AB_T2(t), night = AB_COURT[m].night;
  seg(ctx, x1, y1 - 20, x1, CY.wall.top, 6, night ? '#8a6a7a' : '#8a5a3a', 1.5);
  ctx.strokeStyle = night ? '#9a8ab8' : '#6a4a4a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + 40, x1, y1); ctx.stroke();
  [[0.25, '#fff6ea', 44], [0.45, '#e8364f', 36], [0.65, '#ffd36a', 50]].forEach(([u, col, h], k) => { const px = K.lerp(x0, x1, u), py = K.lerp(y0, y1, u) + 80 * u * (1 - u), sw = 0.07 * Math.sin(tc * 2.4 + k * 1.7);
    ctx.save(); ctx.translate(px, py); ctx.transform(1, 0, sw, 1, 0, 0); celShade(ctx, K.rectPts(-18, 0, 36, h), col, abDark(col, 0.3), { light: [1, -0.5], off: 4, lw: 2 }); ctx.restore(); }); }
// the fig branch front pass (upper left)
function cyFig(ctx, t, m) { const tc = AB_T2(t), M = AB_COURT[m], sw = idleSway(tc, 821, 6, 3.6); seg(ctx, -40, 120, 260 + sw, 230, 18, M.night ? '#7a5a6a' : '#7a4a2a', 3);
  for (const [x, y, r, sd] of [[60, 150, 58, 822], [170, 200, 50, 823], [255, 230, 40, 824]]) abLeafBlobs(ctx, x + sw * (x / 260), y, r, M.leaf, sd, tc, 0.3); }

// courtyard(ctx, t, cam, o): the whole yard behind the jars and the cast. o: {m, m2, k (plate cross-fade m -> m2), moon: [x, y, k, r],
//   sun: [x, y, k], gate {...cyGate o}, back [open, latch], K {open, lit, inside}, G {open, lit, inside}, kwin {lit, inside}, bwin lit,
//   gwin {sh, slit, lit, inside}, lan (k), wash, fig}
function courtyard(ctx, t, cam, o = {}) {
  const m = o.m || 'night', mm = o.m2 && (o.k || 0) > 0.5 ? o.m2 : m;
  cySky(ctx, cam, m); if (o.m2) cySky(ctx, cam, o.m2, o.k || 0);
  if (o.sun) tsSun(ctx, o.sun[0] + cySkyX(cam), o.sun[1], o.sun[2] ?? 1, '#ffd890');
  if (o.moon) cyMoon(ctx, cam, o.moon[0], o.moon[1], o.moon[2] ?? 1, o.moon[3] || 60);
  if (o.skyExtra) o.skyExtra(ctx);
  cyPalm(ctx, t, mm);
  ctx.drawImage(cyPlate(m), 0, 0); if (o.m2 && (o.k || 0) > 0.004) { ctx.save(); ctx.globalAlpha = o.k; ctx.drawImage(cyPlate(o.m2), 0, 0); ctx.restore(); }
  cyGate(ctx, t, mm, o.gate || {}); const bk = o.back || [0, 1]; cyBackGate(ctx, mm, bk[0], bk[1]);
  const K0 = o.K || {}, G0 = o.G || {};
  a3Door(ctx, CY.K, K0.open || 0, mm === 'evening' ? 'evening' : 'night', { lit: K0.lit ?? 0.8, inside: K0.inside });
  a3Door(ctx, CY.G, G0.open || 0, mm === 'evening' ? 'evening' : 'night', { lit: G0.lit || 0, inside: G0.inside });
  cyWindow(ctx, CY.kwin, mm, { lit: 1, ...(o.kwin || {}) }); cyWindow(ctx, CY.bwin, mm, { lit: o.bwin || 0, sh: 0.85 }); cyWindow(ctx, CY.gwin, mm, { sh: 0, ...(o.gwin || {}) });
  if (o.wash !== false) cyWash(ctx, t, mm);
  cyLemon(ctx, t, mm);
  cyLanterns(ctx, t, o.lan ?? 1);
  if ((K0.lit ?? 0.8) > 0 && (K0.open || 0) > 0.05) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.45 * K0.open; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.moveTo(115, 904); ctx.lineTo(225, 904); ctx.lineTo(330, 1080); ctx.lineTo(40, 1080); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if ((G0.lit || 0) > 0 && (G0.open || 0) > 0.05) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.45 * G0.open * G0.lit; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.moveTo(1875, 904); ctx.lineTo(1985, 904); ctx.lineTo(1940, 1100); ctx.lineTo(1620, 1080); ctx.closePath(); ctx.fill(); ctx.restore(); }
}

// ---------- the jars on the yard: data + one drawing per jar (the ALI-03 oilJar with the ALI-04 fields) ----------
const CY_JARS = [{ man: 0 }, { man: 1 }, { man: 2 }, { man: 3 }, { man: 4 }, { oil: true, stain: true }].map((j, i) => ({ ...j, i, x: CY.jars[i] }));
// cyJar(ctx, t, i, st): st {lid, wob, sq, peek {lift, gaze, eyes, close}, cut {open, draw}, oil (cutaway of oil 0..1), ghost 0..1, noLid, lidOn}
function cyJar(ctx, t, i, st = {}) { const J = CY_JARS[i]; groundShadow(ctx, J.x, CY.jarY + 2, 130, 0, { flat: true, color: st.shc || '#4a3a6a' });
  oilJar(ctx, J.x, CY.jarY, CY.jarS, { stain: J.stain, t, ...st }); }

// ---------- small props ----------
// oilLamp: a brass hand lamp (46 x 22 at s 1, spout to +x) with a flame 0..1, smoke 0..1 (a rising wisp), t
function oilLamp(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.dir || 1), s);
  celShade(ctx, [[-24, -2], [-20, -14], [0, -18], [18, -14], [34, -12], [36, -8], [20, 2], [0, 6], [-18, 4]], '#e8b040', '#a8701a', { light: [-1, -1], off: 5, hi: '#fff0a0', lw: 2.5, line: '#6a4410' });
  ctx.strokeStyle = '#a8701a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-28, -4, 8, 0.5 * Math.PI, 1.5 * Math.PI); ctx.stroke();
  const fl = K.clamp(o.flame || 0), tc = AB_T2(o.t || 0);
  if (fl > 0.02) { const fh = 18 * fl * (1 + 0.12 * Math.sin(tc * 23)), fx = 34;
    abGlow(ctx, fx, -16, 46 * fl, 0.85 * fl, '#ffc860');
    celShade(ctx, [[fx - 5 * fl, -12], [fx, -12 - fh], [fx + 5 * fl, -12], [fx, -8]], '#fff2a0', '#ffb030', { off: 2, lw: 1.5, line: '#e87a10' }); }
  if ((o.smoke || 0) > 0) { const u = o.smoke; ctx.save(); ctx.globalAlpha = 0.6 * Math.sin(Math.PI * K.clamp(u)); ctx.strokeStyle = '#e8e0f0'; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 8; k++) { const yy = -14 - k * 7 * (0.4 + u); ctx.lineTo(34 + 6 * Math.sin(k * 0.9 + u * 6), yy); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// darkLantern: the captain's covered lantern (40 x 70, hangs from (x, y) by its ring); open 0 a slit of light .. 1 full glow (r 220)
function darkLantern(ctx, x, y, s = 1, o = {}) { const op = K.clamp(o.open || 0), tc = AB_T2(o.t || 0), f = 0.9 + 0.1 * Math.sin(tc * 13);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  ctx.strokeStyle = '#4a4a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -6, 7, Math.PI, 0); ctx.stroke();
  celShade(ctx, [[-20, 0], [20, 0], [22, 60], [-22, 60]], '#5a5a6e', '#3a3a4a', { light: [-1, -1], off: 6, lw: 2.5, line: '#24242e' });
  const gw = 4 + 32 * op; ctx.fillStyle = '#fff0b0'; ctx.fillRect(-gw / 2, 14, gw, 34);
  celShade(ctx, [[-24, -4], [24, -4], [18, -14], [-18, -14]], '#e8c050', '#a88020', { off: 3, lw: 2 });
  ctx.restore();
  abGlow(ctx, x, y + 30 * s, (30 + 190 * op) * f * s, 0.5 + 0.4 * op, '#ffc060'); }
// householdArms: rollingPin and fryingPan in a hand at (x, y), rot radians
function rollingPin(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); seg(ctx, -50, 0, 50, 0, 8, '#c89a5a', 1.5); celShade(ctx, K.rectPts(-30, -9, 60, 18), '#e8c890', '#b8945a', { light: [-1, -1], off: 4, lw: 2.5, line: '#6a4a24' }); ctx.restore(); }
function fryingPan(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); seg(ctx, 0, 0, 40, 0, 9, '#4a3a3a', 1.5); celShade(ctx, ell(-28, 0, 28, 28, 22), '#6a6a7a', '#3e3e4a', { light: [-1, -1], off: 7, hi: '#b8b8c8', lw: 3, line: '#24242e' }); ctx.restore(); }
// disguiseWipe(ctx, band {x, y, w, ang, h}, drawA, drawB, t): A outside the tilted band, B inside it, light on the band edges
function disguiseWipe(ctx, band, drawA, drawB, t) { drawA(ctx); if (!band || band.k <= 0) return; const { x, y, w, ang = 0.21, h = 900 } = band;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.restore(); ctx.save(); ctx.clip(); drawB(ctx);
  ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.28 * (band.k ?? 1); ctx.fillStyle = '#bfe0ff'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.globalAlpha = 0.8 * (band.k ?? 1); ctx.fillStyle = '#e8f6ff'; ctx.fillRect(-w / 2 - 4, -h / 2, 6, h); ctx.fillRect(w / 2 - 2, -h / 2, 6, h); ctx.restore(); }

// ---------- the kitchen: a warm interior 1000 x 1230 (floor y 900), window onto the yard x 640..840, y 440..620, door at the right ----------
const KT = { win: { x: 640, y: 440, w: 200, h: 180 }, door: { x0: 880, x1: 1000, top: 620 }, table: { x0: 360, x1: 640, top: 760 }, hearth: { x0: 60, x1: 300, top: 560 } };
function kitchenPlate() {
  return abBakeAt('kitchen', 1000, 1230, (c, w) => {
    const L = [1, -0.5]; abGrad(c, 0, 0, w, 900, [[0, '#d89a68'], [0.5, '#e8b878'], [1, '#dca46c']]); abGlaze(c, 180, 760, 520, '#ffb060', 0.45);
    celShade(c, K.rectPts(-10, 700, w + 20, 200), '#c88a5a', '#a86a42', { light: L, off: 6, lw: 3, line: '#6a3a1e' });
    for (let y = 900; y < 1230; y += 56) for (let x = ((y / 56) % 2) * 40 - 40; x < w; x += 80) celShade(c, K.rectPts(x, y, 80, 56), (x + y) % 3 ? '#d0784a' : '#c46a40', '#a0502e', { light: L, off: 6, lw: 2, line: '#7a3a1e' });
    const H = KT.hearth; celShade(c, townArchPts(H.x0 - 20, H.x1 + 20, H.top - 30, 900, 'round'), '#e8d2b0', '#b8a080', { light: L, off: 10, lw: 3, line: '#6a5040' });
    c.save(); K.poly(c, townArchPts(H.x0, H.x1, H.top, 900, 'round'), true); c.clip(); abGrad(c, H.x0, H.top, H.x1 - H.x0, 900 - H.top, [[0, '#5a3040'], [1, '#8a4a3a']]); c.restore();
    celShade(c, [[130, 900], [140, 860], [220, 860], [230, 900]], '#3a3040', '#241e2a', { off: 4, lw: 2.5 });   // grate
    celShade(c, [[150, 846], [146, 810], [176, 796], [206, 810], [204, 846]], '#6a6a7a', '#44444e', { light: L, off: 6, lw: 2.5 }); seg(c, 204, 816, 228, 806, 5, '#6a6a7a', 1);   // kettle
    for (const sy of [380, 500]) { celShade(c, K.rectPts(340, sy, 280, 14), '#a8743e', '#6a4424', { light: L, off: 4, lw: 2.5, line: '#4a2a12' }); }
    [[360, 380, '#f0e0c0'], [400, 380, '#3f7ad0'], [440, 380, '#e8364f'], [520, 380, '#ffd36a'], [580, 380, '#2f9a8e'], [370, 500, '#c8743a'], [420, 500, '#f0e0c0'], [470, 500, '#8a62c0']].forEach(([x, y, col], k) => {
      const h = 26 + (k % 3) * 10; celShade(c, [[x - 14, y], [x - 16, y - h * 0.6], [x - 8, y - h], [x + 8, y - h], [x + 16, y - h * 0.6], [x + 14, y]], col, abDark(col, 0.3), { light: L, off: 4, lw: 2.5 }); });
    c.save(); c.translate(560, 486); c.rotate(-1.4); celShade(c, [[-12, 0], [-16, -30], [-8, -44], [8, -44], [16, -30], [12, 0]], '#c8a070', '#8a6a40', { light: L, off: 4, lw: 2.5 }); c.restore();   // the empty oil jug on its side
    const T = KT.table; celShade(c, K.rectPts(T.x0, T.top, T.x1 - T.x0, 22), '#b07a46', '#7a4a24', { light: L, off: 6, lw: 3, line: '#4a2a12' }); for (const lx of [T.x0 + 20, T.x1 - 20]) seg(c, lx, T.top + 22, lx, 900, 12, '#8a5a32', 2);
    celShade(c, ell(420, T.top - 14, 34, 16, 20), '#e8b060', '#b8803a', { light: L, off: 6, lw: 2.5 }); celShade(c, [[520, T.top], [530, T.top - 22], [580, T.top - 22], [590, T.top]], '#f0e0c0', '#c8b090', { light: L, off: 4, lw: 2.5 });
    celShade(c, K.rectPts(270, 840, 60, 14), '#a8743e', '#6a4424', { light: L, off: 4, lw: 2.5 }); for (const lx of [276, 324]) seg(c, lx, 854, lx, 900, 6, '#6a4424', 1.5);   // stool
    celShade(c, [[40, 900], [28, 850], [36, 800], [84, 800], [92, 850], [80, 900]], '#c8743a', '#8a4a2a', { light: L, off: 8, lw: 3 });   // water jar
    const W = KT.win; celShade(c, K.rectPts(W.x - 16, W.y - 16, W.w + 32, W.h + 46), '#f0dcc0', '#c8b090', { light: L, off: 6, lw: 3, line: '#6a5040' });
    const D = KT.door; celShade(c, K.rectPts(D.x0 - 14, D.top - 16, D.x1 - D.x0 + 30, 900 - D.top + 16), '#e8d2b0', '#b8a080', { light: L, off: 6, lw: 3, line: '#6a5040' });
  });
}
// the yard seen through the kitchen window (0.45 scale, centred on the jars), moon in it
function ktWindowView(ctx, t, o = {}) { const W = KT.win; ctx.save(); ctx.beginPath(); ctx.rect(W.x, W.y, W.w, W.h); ctx.clip();
  const sc = 0.45, ox = W.x + W.w / 2 - 1180 * sc, oy = W.y + W.h / 2 - 720 * sc; ctx.translate(ox, oy); ctx.scale(sc, sc);
  ctx.drawImage(cySkyPlate('night'), -300, 0); if (o.moon) tsMoon(ctx, o.moon[0], o.moon[1], 1, 60); ctx.drawImage(cyPlate('night'), 0, 0); cyGate(ctx, t, 'night', {}); cyLanterns(ctx, t, 1);
  for (let i = 0; i < 6; i++) cyJar(ctx, t, i, {}); if (o.extra) o.extra(ctx);
  ctx.restore(); ctx.save(); ctx.fillStyle = 'rgba(200,220,255,0.12)'; ctx.fillRect(W.x, W.y, W.w, W.h); ctx.restore();
  celShade(ctx, K.rectPts(W.x - 4, W.y + W.h / 2 - 4, W.w + 8, 8), '#a8743e', '#6a4424', { off: 2, lw: 2 }); celShade(ctx, K.rectPts(W.x + W.w / 2 - 4, W.y, 8, W.h), '#a8743e', '#6a4424', { off: 2, lw: 2 });
  celShade(ctx, K.rectPts(W.x - 24, W.y + W.h, W.w + 48, 26), '#e0c8a8', '#b09878', { light: [1, -0.5], off: 5, lw: 3, line: '#6a5040' }); }
// kitchen(ctx, t, o): o {door 0..1 open, embers 0..1, lamp (table lamp lit 0..1), view (window view opts), draught (pans swing amp)}
function kitchen(ctx, t, o = {}) {
  const tc = AB_T2(t); ctx.drawImage(kitchenPlate(), 0, 0);
  const em = o.embers ?? 1, f = 0.8 + 0.2 * Math.sin(tc * 9) * Math.sin(tc * 4.3);
  abGlow(ctx, 180, 850, 260 * f, 0.6 * em, '#ff8a3a'); const R = K.rng(9); for (let i = 0; i < 9; i++) { const ex = 140 + R() * 80, ey = 856 - R() * 14, on = Math.sin(tc * 7 + i * 1.9) > -0.3; if (on) abBlob(ctx, ex, ey, 6, 4, '#ffb040', '#e8601a', { lw: 0, off: 2 }); }
  ktWindowView(ctx, t, o.view || {});
  const dr = o.draught || 0;
  [[360, 0], [420, 1], [480, 2], [540, 3], [590, 4]].forEach(([x, k]) => { const a = 0.06 * Math.sin(tc * 2.2 + k) + swing(t, o.draughtT ?? -9, dr * (0.3 + 0.1 * k), 1.1, 1.4); ctx.save(); ctx.translate(x, 300); ctx.rotate(a);
    seg(ctx, 0, 0, 0, 40, 3, '#5a4a4a', 0); celShade(ctx, ell(0, 62 + (k % 2) * 6, 22 + (k % 2) * 6, 20, 18), '#e08a4a', '#a8582a', { light: [-1, -1], off: 6, hi: '#ffc890', lw: 2.5, line: '#6a2a10' }); ctx.restore(); });
  for (const [x, col, k] of [[120, '#f6efe0', 0], [870, '#e8302a', 1]]) { const a = 0.05 * Math.sin(tc * 1.9 + k * 2) + swing(t, o.draughtT ?? -9, dr * 0.35, 1.0, 1.2); ctx.save(); ctx.translate(x, 180); ctx.rotate(a); seg(ctx, 0, 0, 0, 220, 3, '#8a7a5a', 0);
    for (let j = 0; j < 7; j++) abBlob(ctx, (j % 2 ? 8 : -8), 40 + j * 26, 13, 12, col, abDark(col, 0.25), { lw: 2, off: 3 }); ctx.restore(); }
  const D = KT.door; a3Door(ctx, { x0: D.x0, x1: D.x1, top: D.top, col: '#3f7ad0' }, o.door || 0, 'evening', { lit: 0 });
}
