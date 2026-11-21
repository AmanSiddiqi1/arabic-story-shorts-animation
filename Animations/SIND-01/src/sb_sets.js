// ===== SIND-01 sets (shared by the Sinbad episodes): harbourQuay ('baghdad' morning, 'gold' afternoon, 'island'), islandShore,
// Baghdad's far skyline =====
// harbourQuay: 2200 x 1230, quay floor y 900, stone quay edge at x 1100, open water to the right (waterline y 945), dhow berth
// x 1340..1980 (dhow s 1.15 at x 1660: deck y 853, rail y 798), gangplank from (1100, 900) to (1390, 846). Bollards at 1000 and 1080.
const SB_QUAY = { w: 2200, floor: 900, edge: 1100, water: 945, berthX: 1660, dhowS: 1.15, gangA: [1092, 900], gangB: [1392, 846], bollards: [1000, 1080] };
const SB_QPAL = {
  baghdad: { walls: ['#f3d2a8', '#e8a888', '#f6e6c8', '#f0c27a', '#c8b0d8', '#f2b8a0', '#e8c8a0'], dome: '#ffcf3a', domeS: '#c8901a', pave: ['#e6c898', '#c89a6a'], hill: null, sky: 'morning' },
  gold: { walls: ['#f6c890', '#eaa080', '#f8dcb0', '#f2b468', '#d0a8c8', '#f2a888', '#eab890'], dome: '#ffd84a', domeS: '#c88a1a', pave: ['#ecc088', '#c08a5a'], hill: null, sky: 'gold' },
  island: { walls: ['#fbf6ee', '#f4f0e6', '#fffaf0', '#eef2f4', '#f8f0e0', '#fbf6ee', '#f0ece0'], dome: '#ffcf3a', domeS: '#c8901a', pave: ['#ead6b0', '#c8a87a'], hill: '#5ab86a', sky: 'day' },
};
// the city behind the quay (baked, transparent above the roofs): skyline, warehouse, stall, crates, bench, bollards, quay edge, paving
function sbQuayPlate(v) {
  return sbBakeAt('quay:' + v, 2200, 1230, (c) => { const P = SB_QPAL[v], R = K.rng(v.length * 7 + 3), isl = v === 'island';
    if (isl) { // green hill with the gold-domed palace behind the white town
      c.save(); c.filter = 'blur(2px)'; c.fillStyle = '#7ac87a'; c.beginPath(); c.moveTo(-40, 900); c.bezierCurveTo(100, 420, 700, 380, 1080, 760); c.lineTo(1080, 900); c.closePath(); c.fill(); c.restore();
      sbPalace(c, 420, 470, 1); }
    else { // far domes and the minaret (soft), then a row of town houses
      for (const [x, y, r] of [[300, 520, 70], [880, 560, 50]]) { celShade(c, ell(x, y, r, r * 1.05, 30).filter((q) => q[1] <= y + 2), sbLight(P.dome, 0.25), P.domeS, { light: [1, -1], off: r * 0.3, lw: 3 }); c.fillStyle = sbLight(P.walls[2], 0.1); c.fillRect(x - r * 0.9, y, r * 1.8, 300); }
      celShade(c, ell(520, 380, 120, 128, 40).filter((q) => q[1] <= 382), P.dome, P.domeS, { light: [1, -1], off: 40, hi: '#fff0a0', lw: 4 });   // the gold dome (top y ~ 255)
      seg(c, 520, 252, 520, 216, 6, '#e0b038', 1.5); shape(c, ell(520, 210, 9, 9, 12), '#ffcf3a', { lw: 2 });
      celShade(c, K.rectPts(420, 380, 200, 520), P.walls[2], sbDark(P.walls[2], 0.2), { light: [1, -1], off: 24, lw: 3.5 });
      for (let k = 0; k < 4; k++) townWindow(c, 438 + k * 44, 430, 26, 44, { arch: 'pointed', lit: 0 });
      // the minaret at x 760 (top y 220)
      celShade(c, [[736, 900], [740, 330], [780, 330], [784, 900]], P.walls[0], sbDark(P.walls[0], 0.25), { light: [1, -1], off: 12, lw: 3.5 });
      celShade(c, K.rectPts(726, 316, 68, 18), P.walls[3], sbDark(P.walls[3], 0.3), { light: [1, -1], off: 5, lw: 3 });
      celShade(c, [[742, 316], [744, 262], [776, 262], [778, 316]], P.walls[0], sbDark(P.walls[0], 0.25), { light: [1, -1], off: 6, lw: 3 });
      celShade(c, [[740, 264], [760, 220], [780, 264]], P.dome, P.domeS, { light: [1, -1], off: 6, lw: 3 }); }
    // houses with flat roofs, washing lines, lit windows, palms
    palmTree(c, 640, 760, { s: 0.55, lean: -14 }); palmTree(c, 980, 780, { s: 0.6, lean: 12 });
    let x = 380; for (let i = 0; i < 7; i++) { const w = 90 + R() * 70, h = 150 + R() * 130, col = P.walls[i % P.walls.length], base = 905, top = base - h;
      celShade(c, [[x, base], [x, top], [x + w, top], [x + w, base]], col, sbMix(col, '#8a6a9a', 0.3), { light: [1, -0.5], off: 14, lw: 3, line: sbDark(col, 0.55) });
      celShade(c, K.rectPts(x - 5, top - 8, w + 10, 14), sbMix(col, '#c88a72', 0.3), sbMix(col, '#8a5a62', 0.4), { light: [1, -0.5], off: 4, lw: 2.5 });
      const dcol = isl ? '#2a6ad8' : R() < 0.5 ? '#3a6ad0' : '#2f9a8e'; celShade(c, K.rectPts(x + w * 0.3, base - 70, 30, 70), dcol, '#24407a', { light: [1, -0.5], off: 6, lw: 2.5 });
      const wx = x + w * 0.62, wy = top + 30; c.fillStyle = (i % 3 === 1) ? '#ffd98a' : '#3a2f5a'; c.fillRect(wx, wy, 20, 24); c.strokeStyle = sbDark(col, 0.5); c.lineWidth = 2.5; c.strokeRect(wx, wy, 20, 24);
      x += w + 6 + R() * 20; if (x > 1000) break; }
    for (const [x0, x1, y] of [[440, 620, 660], [700, 900, 690]]) { c.strokeStyle = '#6a4a4a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y); c.quadraticCurveTo((x0 + x1) / 2, y + 24, x1, y); c.stroke();
      ['#e8364f', '#3f7ad0', '#ffd36a', '#fff6ea', '#2f9a8e'].forEach((col, k) => { const u = (k + 1) / 6, px = K.lerp(x0, x1, u), py = y + 12 * 4 * u * (1 - u) + 2; celShade(c, K.rectPts(px - 10, py, 20, 26 + (k % 2) * 8), col, sbDark(col, 0.3), { light: [1, -0.5], off: 4, lw: 2 }); }); }
    // the warehouse on the left (x 0..420, top y 380) with an arched door
    const wh = isl ? '#fbf6ee' : '#e8b088'; celShade(c, [[-10, 905], [-10, 380], [420, 380], [420, 905]], wh, sbMix(wh, '#8a6a9a', 0.3), { light: [1, -0.6], off: 30, lw: 4, line: sbDark(wh, 0.6) });
    celShade(c, K.rectPts(-16, 366, 442, 22), sbMix(wh, '#c88a72', 0.3), sbMix(wh, '#8a5a62', 0.4), { light: [1, -0.6], off: 6, lw: 3 });
    const D = townArchPts(120, 260, 640, 905, 'pointed'); c.save(); K.poly(c, D, true); c.fillStyle = isl ? '#2a6ad8' : '#4a2a3a'; c.fill(); c.restore(); ink(c, D, 4, 2);
    townWindow(c, 310, 470, 60, 80, { arch: 'round', lit: isl ? 0 : 1, shutters: 0.8 }); townWindow(c, 40, 470, 50, 70, { arch: 'round', lit: 0, shutters: 0.6 });
    // paving and the stone quay edge
    sbGrad(c, -10, 900, 1120, 330, [[0, P.pave[0]], [1, P.pave[1]]]);
    // paving in perspective: joints spread toward the viewer, soft and light
    c.strokeStyle = K.rgba(sbDark(P.pave[1], 0.2), 0.5); c.lineWidth = 2; let yy = 912, gap = 16, row = 0;
    while (yy < 1230) { c.beginPath(); c.moveTo(0, yy); c.lineTo(1100, yy); c.stroke(); const sw = 60 + gap * 4; for (let px = (row % 2) * sw / 2; px < 1100; px += sw) { c.beginPath(); c.moveTo(px, yy); c.lineTo(px, Math.min(1230, yy + gap)); c.stroke(); } yy += gap; gap *= 1.32; row++; }
    // foreground dressing on the quay floor (below the actors' feet): rope coil, jars, a fish basket, a crate, sacks
    for (let k = 0; k < 4; k++) shape(c, ell(640, 1150 - k * 9, 70 - k * 12, 20 - k * 2, 24), '#d8b878', { lw: 3 });
    for (const [jx, h, col] of [[200, 120, '#c8603a'], [250, 90, '#e88a4a']]) celShade(c, [[jx - 24, 1200], [jx - 38, 1200 - h * 0.55], [jx - 16, 1200 - h], [jx + 16, 1200 - h], [jx + 38, 1200 - h * 0.55], [jx + 24, 1200]], col, sbDark(col, 0.3), { light: [-1, -1], off: 10, hi: sbLight(col, 0.4), lw: 3 });
    celShade(c, K.rectPts(900, 1110, 130, 90), '#c08a52', '#8a5a30', { light: [-1, -1], off: 12, lw: 3 }); seg(c, 902, 1155, 1028, 1155, 3, '#8a5a30', 0);
    if (!isl) { celShade(c, [[400, 1210], [396, 1150], [430, 1130], [470, 1150], [466, 1210]], '#d8c090', '#a08a5a', { light: [-1, -1], off: 10, lw: 3 }); celShade(c, [[470, 1212], [468, 1160], [500, 1144], [534, 1162], [530, 1212]], '#c8b080', '#a08a5a', { light: [-1, -1], off: 10, lw: 3 }); }
    celShade(c, [[1080, 900], [1112, 900], [1112, 1230], [1080, 1230]], '#d8c0a0', '#9a8068', { light: [-1, -1], off: 8, lw: 3 });
    for (let y = 920; y < 1230; y += 40) { c.strokeStyle = '#8a7058'; c.lineWidth = 2; c.beginPath(); c.moveTo(1082, y); c.lineTo(1112, y); c.stroke(); }
    // crates, barrels, sacks, a stall, a bench
    if (isl) { // nets on poles, baskets of fish
      for (const px of [560, 760]) { seg(c, px, 905, px, 700, 6, '#8a5a32', 1.5); } c.strokeStyle = '#6a5a3a'; c.lineWidth = 2; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(560 + i * 17, 712); c.quadraticCurveTo(570 + i * 17, 800, 560 + i * 17, 880); c.stroke(); } for (let j = 0; j < 8; j++) { c.beginPath(); c.moveTo(560, 720 + j * 22); c.quadraticCurveTo(660, 740 + j * 22, 760, 720 + j * 22); c.stroke(); }
      for (const [bx, col] of [[440, '#c8a060'], [880, '#b8904a']]) { celShade(c, [[bx - 40, 905], [bx - 46, 850], [bx + 46, 850], [bx + 40, 905]], col, sbDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3 }); for (let k = 0; k < 4; k++) sbFish(c, bx - 24 + k * 16, 848 - (k % 2) * 6, 0.35, k % 2 ? 1 : -1, { rot: -0.3 + k * 0.2 }); } }
    else { marketStall(c, { x: 300, w: 230, top: 800, awning: 600, front: 650, kind: 'cloth', cols: ['#e8364f', '#fff1d8'] }); townProp(c, 'crate', 120, { w: 120, top: 830 }); townProp(c, 'barrel', 230, { top: 820 }); townProp(c, 'sacks', 470); }
    celShade(c, K.rectPts(620, 846, 80, 14), '#a86a3a', '#6a3a1e', { light: [-1, -1], off: 4, lw: 2.5 }); for (const lx of [628, 690]) seg(c, lx, 860, lx, 900, 5, '#6a3a1e', 1.5);   // bench
    for (const bx of SB_QUAY.bollards) { celShade(c, [[bx - 14, 905], [bx - 12, 862], [bx - 18, 856], [bx + 18, 856], [bx + 12, 862], [bx + 14, 905]], '#5a5468', '#3a3448', { light: [-1, -1], off: 6, hi: '#8a84a0', lw: 3 }); }
    // stones, tufts and a few flowers at the walls
    sbDress(c, 20, 1060, 905, 1210, 13 + v.length, { stones: 12, tufts: 10, flowers: isl ? 12 : 6, skip: [[880, 1110]], stone: ['#d8c0a8', '#9a8078'] });
  });
}
// a white palace with a gold dome (far, on a hill), centre x, base y, scale
function sbPalace(c, x, y, s = 1) { c.save(); c.translate(x, y); c.scale(s, s);
  celShade(c, K.rectPts(-140, -120, 280, 120), '#fbf6ee', '#c8c0d8', { light: [1, -1], off: 16, lw: 3 });
  for (const tx of [-150, 150]) { celShade(c, K.rectPts(tx - 18, -210, 36, 210), '#fbf6ee', '#c8c0d8', { light: [1, -1], off: 8, lw: 3 }); celShade(c, [[tx - 22, -210], [tx, -250], [tx + 22, -210]], '#ffcf3a', '#c8901a', { light: [1, -1], off: 5, lw: 2.5 }); }
  celShade(c, ell(0, -120, 90, 96, 30).filter((q) => q[1] <= -118), '#ffcf3a', '#c8901a', { light: [1, -1], off: 26, hi: '#fff0a0', lw: 3 }); seg(c, 0, -214, 0, -240, 4, '#e0b038', 1);
  for (let k = -2; k <= 2; k++) { c.fillStyle = '#3a5ab8'; c.fillRect(k * 50 - 9, -86, 18, 30); }
  c.restore(); }
// the water beside the quay (x from 1100 to w): ship layers for the near water, clipped to the right of the quay edge
function sbQuayWater(ctx, t, sea, x0, x1, layers = [2, 3]) { ctx.save(); ctx.beginPath(); ctx.rect(SB_QUAY.edge + 8, 0, 4000, 2400); ctx.clip(); for (const li of layers) sbSeaLayer(ctx, li, t, sea, Math.max(x0, SB_QUAY.edge), x1); ctx.restore(); }
// harbourQuay(ctx, v, t, cam, sea, o): the whole set behind the actors (sky, far sea, the city). Near water: sbQuayWater after the ships.
function sbHarbourQuay(ctx, v, t, cam, sea, o = {}) {
  sbSky(ctx, o.sky || SB_QPAL[v].sky, cam, { hz: sea.hz }); if (o.sun) o.sun(ctx);
  sbSeaBack(ctx, t, sea, 0, 2200);
  if (o.far) o.far(ctx);
  ctx.drawImage(sbQuayPlate(v), 0, 0);
}

// ---------- islandShore: 2000 x 1230, sea x 0..820, wet sand to 900, beach to 1500, meadow beyond; palms 1050, 1300, 1620 ----------
const SB_SHORE = { w: 2000, sand: 905, wet: [760, 940], palms: [1050, 1300, 1620], rocks: [1150, 1440], palace: [1750, 380] };
function sbShorePlate() {
  return sbBakeAt('shore', 2000, 1230, (c) => {
    // far island hills and the palace
    c.save(); c.filter = 'blur(2px)'; c.fillStyle = '#8ad08a'; c.beginPath(); c.moveTo(1000, 905); c.bezierCurveTo(1200, 620, 1500, 470, 2100, 520); c.lineTo(2100, 905); c.closePath(); c.fill();
    c.fillStyle = '#5ab86a'; c.beginPath(); c.moveTo(1250, 905); c.bezierCurveTo(1450, 700, 1700, 640, 2100, 680); c.lineTo(2100, 905); c.closePath(); c.fill(); c.restore();
    sbPalace(c, 1750, 520, 0.8);
    // the beach (side view): wet sand at the water, cream sand, meadow from x 1500
    const B = [[600, 1230], [660, 1060], [720, 990], [790, 944], [880, 912], [1000, 905], [2000, 905], [2000, 1230]];
    c.save(); K.poly(c, B, true); c.clip(); sbGrad(c, 600, 900, 1400, 330, [[0, '#f4dca8'], [1, '#e0b878']]);
    c.fillStyle = '#c8a070'; c.beginPath(); c.moveTo(600, 1230); c.lineTo(660, 1060); c.lineTo(720, 990); c.lineTo(780, 944); c.lineTo(880, 912); c.lineTo(940, 908); c.lineTo(980, 1230); c.lineTo(600, 1230); c.closePath(); c.fill();
    sbGrad(c, 1480, 900, 600, 330, [[0, '#6ac06a'], [1, '#3f8a4a']]); c.fillStyle = '#6ac06a'; c.beginPath(); c.moveTo(1440, 905); c.bezierCurveTo(1480, 960, 1500, 1100, 1520, 1230); c.lineTo(1480, 1230); c.lineTo(1480, 905); c.fill();
    c.restore(); ink(c, B.slice(1, -1), 3, 2, '#9a7040');
    // tide line: shells, stones, seaweed; dressing on the meadow
    sbDress(c, 980, 1460, 915, 1200, 71, { stones: 14, tufts: 4, flowers: 0, shells: 18, stone: ['#d8ccc0', '#9a8a80'], grass: ['#5a9a5a', '#2f6a44'] });
    for (let i = 0; i < 9; i++) { const x = 1000 + i * 52, y = 1000 + (i % 3) * 30; c.strokeStyle = '#3f8a5a'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + 10, y - 10, x + 20, y + 6, x + 34, y - 4); c.stroke(); }
    sbDress(c, 1500, 2000, 912, 1210, 72, { stones: 8, tufts: 24, flowers: 30 });
    for (const [rx, r] of [[1150, 46], [1440, 60]]) sbStone(c, rx, 908, r, '#a8a4c0', '#6e6a90');
  });
}
function sbIslandShore(ctx, t, cam, sea, o = {}) { sbSky(ctx, o.sky || 'day', cam, { hz: sea.hz }); sbSeaBack(ctx, t, sea, -200, 1300); ctx.drawImage(sbShorePlate(), 0, 0); }
// shore palms (live, swaying) drawn over the plate
function sbShorePalms(ctx, t) { SB_SHORE.palms.forEach((x, i) => palmTree(ctx, x, 908, { s: 0.75, lean: [-16, 12, -8][i], t: SB_T2(t) + i, sway: 1 + i * 0.3 })); }
// Baghdad's far skyline (dome and minaret) for the horizon, w 420, base y, alpha
function sbFarBaghdad(ctx, x, y, s = 1, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e8b890'; ctx.fillRect(-200, -60, 400, 60); celShade(ctx, ell(0, -60, 70, 74, 30).filter((q) => q[1] <= -58), '#ffd84a', '#c88a1a', { light: [1, -1], off: 20, lw: 2.5 });
  ctx.fillStyle = '#f0c8a0'; ctx.fillRect(110, -190, 22, 190); celShade(ctx, [[104, -190], [121, -224], [138, -190]], '#ffd84a', '#c88a1a', { light: [1, -1], off: 4, lw: 2 });
  for (let k = -3; k <= 3; k++) { ctx.fillStyle = '#d8a078'; ctx.fillRect(k * 56 - 16, -90 - (k % 2) * 18, 32, 40); } ctx.restore(); }
