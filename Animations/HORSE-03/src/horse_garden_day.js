// ===== The Ebony Horse series: the princess's garden by DAY and at GOLDEN hour, with the ROSE BOWER (new in HORSE-03) =====
// Same geometry as the moonlit princessGarden of HORSE-02 (EH_PGARDEN: palace wall and stair arch, blue dome, jasmine arch, fountain,
// bench, lantern poles, orange trees, hedge with the gate, river and the two towers), repainted as two bright baked plates
// ('day': clear morning; 'golden': same land colours, sky blue above to cream gold at the horizon, long soft lawn shadows).
// Never a tint over the cast. New dressing: the rose bower (hide spot at x 1210, a trellis arc with climbing roses behind the horse
// and one movable rose branch in a front layer), a sundial, butterflies, a live gate leaf, and a hedge patch that can shiver.
// Episodes 4-5 copy this file unchanged. Anchors EH_PG3 (plus EH_PGARDEN).
const EH_PG3 = { hide: 1210, bower: [1050, 1370], branch: [1085, 905], peek: [1040, 720], sundial: 700, stool: 1190, gate: [1380, 1500], hinge: 1500, path: 820 };
const EH_GDAY = {
  day: { sky: [[0, '#3a8ef0'], [0.5, '#6ab0f8'], [0.82, '#a8dcff'], [1, '#cfeeff']], cloud: ['#ffffff', '#cfe0f6'], hills: '#8ac8a0', water: [['#3a9ae8', '#6ac0f8', '#2a80d8']], bank: ['#5ab07a', '#4a9a6a'], sun: [-120, -520] },
  golden: { sky: [[0, '#5a8ae0'], [0.45, '#90a8e8'], [0.75, '#ffd8a8'], [1, '#ffe2a0']], cloud: ['#fff6ea', '#ffc890'], hills: '#b8b090', water: [['#5a9ae0', '#ffd890', '#4a80c8']], bank: ['#6ab070', '#5a9a62'], sun: [1330, 400] },
};
function ehPGSkyPlate(pl) {   // world x -500..2100, y -760..900 (parallax 0.15)
  return ehBakeAt('pg3sky:' + pl, 2600, 1660, (c, w, h) => { const P = EH_GDAY[pl]; c.translate(500, 760); ehGrad(c, -500, -760, w, h, P.sky);
    const [cb, cu] = P.cloud; for (const [x, y, s] of [[-260, -420, 1.4], [420, -600, 1.0], [1250, -470, 1.3], [1850, -170, 1.0], [160, 40, 0.8], [1050, 120, 0.7], [760, -250, 0.6]]) ehCloud(c, x, y, 520 * s, 120 * s, cb, cu, 9, x + 7);
    ehSoftHills(c, 2600, 760, 40, P.hills, 3, 4, 900); }, 0.35);
}
function ehPGFarPlate(pl) {   // world x -300..1900, y 300..820: hills, far town, the river with glints, the two towers (parallax 0.5)
  return ehBakeAt('pg3far:' + pl, 2200, 520, (c) => { c.translate(300, -300); const P = EH_RC_DUSK, G = EH_GDAY[pl];
    ehSoftHills(c, 1900, 650, 30, pl === 'day' ? '#7ab890' : '#a8a878', 12, 2, 760);
    const HS = ehHouses(71, 30, -280, 1880, 625, 668, [[1100, 1340]]); HS.forEach((H) => ehHouse(c, { ...H, w: H.w * 0.6, h: H.h * 0.6 }, P, 0));
    const [w0, w1, w2] = G.water[0]; ehGrad(c, -300, 668, 2200, 62, [[0, w0], [0.5, w1], [1, w2]]);
    c.strokeStyle = '#ffffff'; c.lineWidth = 2.5; for (let i = 0; i < 30; i++) { const x = -300 + i * 75, y = 676 + (i % 4) * 12; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 26, y); c.stroke(); }
    ehRiverTowers(c, EH_PGARDEN.towers[0], EH_PGARDEN.towers[1], EH_PGARDEN.towers[2], 290, 64, P, { lamps: false });
    ehGrad(c, -300, 728, 2200, 100, [[0, G.bank[0]], [1, G.bank[1]]]); }, 0.7);
}
// the garden ground (shared by both plates: the land keeps its colours all day), copied from HORSE-02's moonlit plate with the
// day palette, plus the rose bower's back layer and a sundial
function ehPGGroundPlate() {   // world x 0..1600, y 120..1230
  return ehBakeAt('pg3ground', 1600, 1110, (c) => { c.translate(0, -120); const P = EH_RC_DUSK, G = EH_PGARDEN;
    ehBlueDome(c, G.dome[0], G.dome[1], G.dome[2], P, { drum: 46 });
    const hy = G.hedgeY, [g0, g1, gt] = G.gate;
    for (const [a, b] of [[440, g0], [g1, 1620]]) celShade(c, [[a, hy + 80], [a, hy + 6], ...Array.from({ length: Math.ceil((b - a) / 40) + 1 }, (_, i) => [Math.min(b, a + i * 40), hy - 6 * Math.sin(i * 1.3)]), [b, hy + 80]], '#4fb070', '#2f8050', { light: [-1, -1], off: 16, hi: '#7ad08a', lw: 3, line: '#1f5a38' });
    for (let i = 0; i < 40; i++) { const R = K.rng(900 + i), x = 450 + R() * 1150; if (x > g0 - 20 && x < g1 + 20) continue; ehBlob(c, x, hy + 10 + R() * 50, 5, 5, ['#fff6ea', '#ff8aa8', '#ffd36a'][i % 3], '#c8a0b0', { lw: 1 }); }
    c.fillStyle = '#48a066'; c.fillRect(440, hy + 60, 1180, 30);
    const tp = townArchPts(g0 - 10, g1 + 10, gt, hy + 70, 'round', 12); c.save(); c.strokeStyle = '#fff6ea'; c.lineWidth = 9; c.lineJoin = 'round'; K.poly(c, tp.slice(1, -1)); c.stroke(); c.strokeStyle = '#8a6a8a'; c.lineWidth = 3; c.stroke(); c.restore();
    for (let i = 0; i < 14; i++) { const p = tp[1 + Math.floor(i / 14 * (tp.length - 2))]; ehBlob(c, p[0], p[1], 9, 7, '#5ab870', '#2f8050', { lw: 1.5 }); if (i % 2) ehBlob(c, p[0] + 5, p[1] - 4, 4, 4, '#fff6ea', '#d8d0e0', { lw: 1 }); }
    ehGrad(c, 440, hy + 80, 1160, 1230 - hy - 80, [[0, '#56b870'], [1, '#6ac880']]); ehGrad(c, 0, 820, 440, 410, [[0, '#56b870'], [1, '#6ac880']]);
    c.fillStyle = '#f4e4d8'; c.fillRect(0, 884, 1600, 64); c.fillStyle = '#d8b8b0'; c.fillRect(0, 946, 1600, 6); c.strokeStyle = '#d8b8b0'; c.lineWidth = 2; for (let x = 0; x < 1600; x += 46) { c.beginPath(); c.moveTo(x, 884); c.lineTo(x - 8, 948); c.stroke(); } c.beginPath(); c.moveTo(0, 916); c.lineTo(1600, 916); c.stroke();
    c.fillStyle = '#f4e4d8'; c.beginPath(); c.moveTo(1380, 884); c.lineTo(1500, 884); c.lineTo(1490, 820); c.lineTo(1390, 820); c.closePath(); c.fill();
    ehDress(c, 0, 1600, 960, 1110, 23, { stones: 10, tufts: 18, flowers: 30, cols: ['#ff4a6a', '#fff6ea', '#ffd36a', '#c8a0ff', '#ff9a5a'] });
    for (let i = 0; i < 26; i++) { const R = K.rng(700 + i), x = i * 64 + R() * 30, y = 1150 + R() * 40; for (let k = 0; k < 3; k++) ehBlob(c, x + k * 22 - 22, y - k % 2 * 14, 36, 28, k % 2 ? '#3fae5a' : '#52c06a', '#23804a', { lw: 2 }); for (let k = 0; k < 3; k++) ehBlob(c, x - 16 + k * 18, y - 30 - (k % 2) * 8, 9, 9, ['#ff3a5a', '#fff6ea', '#ffd36a', '#c8a0ff'][(i + k) % 4], '#c84a6a', { lw: 1.2 }); }
    celShade(c, K.rectPts(-10, G.wallTop, 450, 920 - G.wallTop), P.rose, P.roseS, { light: [-1, -1], off: 24, hi: P.roseL, lw: 3.5, line: P.line });
    celShade(c, K.rectPts(-10, G.wallTop - 8, 460, 14), P.trim, P.trimS, { off: 4, lw: 2.5, line: P.line }); ehCrenels(c, 0, 450, G.wallTop - 8, 24, 60, 30, P);
    const [a0, a1, at] = G.arch, ap = townArchPts(a0, a1, at, 905, 'pointed', 12);
    celShade(c, townArchPts(a0 - 16, a1 + 16, at - 18, 905, 'pointed', 12), P.trim, P.trimS, { off: 6, lw: 3, line: P.line });
    c.save(); K.poly(c, ap, true); c.fillStyle = '#6a4a6a'; c.fill(); c.clip(); for (let i = 0; i < 9; i++) { const y = 905 - i * 30, x = a0 + i * 12; c.fillStyle = i % 2 ? '#c8a0a8' : '#b89098'; c.fillRect(x, y - 30, a1 - a0, 30); c.fillStyle = '#e8c8c8'; c.fillRect(x, y - 30, a1 - a0, 5); } c.restore(); ink(c, ap.slice(1, -1), 5, 3, P.line);
    for (const wx of [290, 380]) shape(c, townArchPts(wx - 22, wx + 22, 520, 600, 'pointed', 8), '#4a5aa8', { lw: 2.5 });
    // vines and pots along the palace wall
    for (let i = 0; i < 18; i++) { const R = K.rng(950 + i), x = 250 + R() * 180, y = 640 + R() * 250; ehBlob(c, x, y, 10, 8, '#4fb070', '#2f8050', { lw: 1.2 }); if (i % 3 === 0) ehBlob(c, x + 4, y - 3, 4, 4, '#ff6a8a', '#c84a6a', { lw: 1 }); }
    const [fx, fr] = G.fountain; const oct = (rx, ry, y) => Array.from({ length: 8 }, (_, i) => { const a = (i + 0.5) * Math.PI / 4; return [fx + Math.cos(a) * rx, y + Math.sin(a) * ry]; });
    celShade(c, [[fx - 92, fr], [fx + 92, fr], [fx + 92, fr + 34], [fx - 92, fr + 34]], P.trim, P.trimS, { off: 8, lw: 3, line: P.line });
    for (let k = 0; k < 6; k++) celShade(c, K.rectPts(fx - 88 + k * 30, fr + 8, 22, 20), k % 2 ? '#3a74ea' : '#2fb8b0', '#2450b8', { off: 3, lw: 1.5, line: P.line });
    celShade(c, oct(92, 22, fr), '#7ad0f8', '#5ab8e8', { off: 6, lw: 3, line: P.line }); celShade(c, oct(70, 15, fr - 2), '#9ae0ff', '#7ac8f0', { off: 4, lw: 0 });
    celShade(c, K.rectPts(fx - 10, fr - 100, 20, 96), P.trim, P.trimS, { off: 5, lw: 2.5, line: P.line }); ehBlob(c, fx, fr - 104, 30, 10, P.trim, P.trimS, { lw: 2.5 });
    const B = G.bench; celShade(c, K.rectPts(B.x - B.w / 2, B.seatY - 4, B.w, 16), '#f0e8f4', '#c0b0d0', { off: 5, hi: '#ffffff', lw: 3, line: '#5a4a6a' });
    for (const dx of [-100, 100]) celShade(c, K.rectPts(B.x + dx - 14, B.seatY + 12, 28, 900 - B.seatY - 10), '#d8d0e8', '#a8a0c0', { off: 5, lw: 2.5, line: '#5a4a6a' });
    for (const px of G.poles) { seg(c, px, 900, px, 650, 7, '#5a4a6a', 2); seg(c, px, 690, px + 30, 690, 4, '#5a4a6a', 1.5); }
    // the rose bower (back layer): a trellis arc of 9 slats behind the hide spot, climbing roses
    const [b0, b1] = EH_PG3.bower, bc = (b0 + b1) / 2, arc = (u) => [K.lerp(b0, b1, u), 905 - 330 * Math.sin(Math.PI * u) ** 0.6];
    c.save(); c.strokeStyle = '#fff0e0'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = arc(i / 30); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
    for (let i = 1; i < 9; i++) { const [x, y] = arc(i / 9); c.beginPath(); c.moveTo(x, y); c.lineTo(x + (x - bc) * 0.05, 905); c.stroke(); } c.strokeStyle = '#a88a8a'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = arc(i / 30); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.restore();
    for (let i = 0; i < 46; i++) { const R = K.rng(1200 + i), u = R(), [x, y] = arc(u), yy = y + R() * (905 - y) * (i % 3 === 0 ? 0.8 : 0.2); ehBlob(c, x + (R() - 0.5) * 30, yy, 16, 12, i % 2 ? '#3fae5a' : '#2f9a4a', '#1f6a38', { lw: 1.5 }); }
    for (let i = 0; i < 32; i++) { const R = K.rng(1300 + i), [x, y] = arc(R()); ehBlob(c, x + (R() - 0.5) * 34, y + R() * 60, 7 + R() * 3, 7 + R() * 3, ['#e8264f', '#ff6a8a', '#ff9ab8', '#ffffff'][i % 4], '#a8183a', { lw: 1.4, hi: '#ffd0dc' }); }
    for (const x of G.trees) { const b = 905; seg(c, x, b, x, b - 150, 14, '#8a5a3a', 3); for (let i = 0; i < 10; i++) { const a = i * 0.63, rr = 70 + (i % 3) * 16; ehBlob(c, x + Math.cos(a) * 66, b - 260 + Math.sin(a) * 56, rr * 0.6, rr * 0.55, '#46b868', '#2a8048', { lw: 2 }); }
      for (let i = 0; i < 10; i++) { const R = K.rng(x + i * 3); ehBlob(c, x - 90 + R() * 180, b - 330 + R() * 130, 10, 10, '#ff9a2a', '#d0661a', { lw: 1.5 }); } }
    const jx = G.jasmine; c.save(); c.strokeStyle = '#fff6ea'; c.lineWidth = 8; c.beginPath(); c.moveTo(jx - 50, 905); c.lineTo(jx - 50, 700); c.quadraticCurveTo(jx, 640, jx + 50, 700); c.lineTo(jx + 50, 905); c.stroke(); c.restore();
    for (let i = 0; i < 16; i++) { const R = K.rng(400 + i), u = i / 15, p = u < 0.35 ? [jx - 50, K.lerp(900, 700, u / 0.35)] : u < 0.65 ? [K.lerp(jx - 50, jx + 50, (u - 0.35) / 0.3), 690 - Math.sin((u - 0.35) / 0.3 * Math.PI) * 40] : [jx + 50, K.lerp(700, 900, (u - 0.65) / 0.35)];
      ehBlob(c, p[0] + (R() - 0.5) * 16, p[1], 14, 11, '#4ab86a', '#2a8048', { lw: 1.5 }); ehBlob(c, p[0] + (R() - 0.5) * 20, p[1] - 6, 5, 5, '#fff6ea', '#d8d0e0', { lw: 1 }); }
    // sundial on a little column
    const sx = EH_PG3.sundial; celShade(c, K.rectPts(sx - 14, 830, 28, 72), P.trim, P.trimS, { off: 5, lw: 2.5, line: P.line }); celShade(c, ell(sx, 828, 40, 10, 20), '#e0b038', '#a87a1c', { off: 4, lw: 2.5, line: '#6a4a10' }); shape(c, [[sx - 4, 828], [sx + 4, 828], [sx, 800]], '#6a4a10', { lw: 1 });
  }, 1);
}
// golden hour: long soft shadows of the trees, hedge and bower on the lawn (background light, drawn under the cast)
function ehPGLongShadows(ctx, k) {
  if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.16 * k; ctx.fillStyle = '#5a3a6a';
  for (const [x, w, l] of [[770, 70, 260], [1200, 80, 280], [620, 40, 140], [1210, 120, 200], [470, 40, 160]]) { ctx.beginPath(); ctx.moveTo(x - w, 905); ctx.lineTo(x + w, 905); ctx.lineTo(x + w - l, 990); ctx.lineTo(x - w - l, 990); ctx.closePath(); ctx.fill(); }
  ctx.fillRect(440, 820, 1160, 26); ctx.restore();
}
// the live gate leaf (wooden lattice, hinged at the right post); open 0 shut .. 1 open
function ehPGGateLeaf(ctx, open) {
  const [g0, g1] = EH_PG3.gate, w = (g1 - g0) * Math.max(0.12, Math.cos(open * Math.PI / 2)), x0 = g1 - w, top = 790, bot = 884;
  celShade(ctx, [[x0, top + 10], [g1, top], [g1, bot], [x0, bot]], '#c88a5a', '#9a6038', { light: [-1, -1], off: 6, lw: 3, line: '#5a3418' });
  ctx.save(); ctx.strokeStyle = '#7a4a28'; ctx.lineWidth = 3; for (let i = 1; i < 5; i++) { const x = K.lerp(x0, g1, i / 5); ctx.beginPath(); ctx.moveTo(x, top + 6); ctx.lineTo(x, bot); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x0, (top + bot) / 2); ctx.lineTo(g1, (top + bot) / 2 - 4); ctx.stroke(); ctx.restore();
}
// butterflies on twos (2-frame wing flap), drifting in loops; o.n, o.area [x0, y0, x1, y1]
function ehButterflies(ctx, t, o = {}) {
  const tc = EH_T2(t), [x0, y0, x1, y1] = o.area || [500, 640, 1500, 880];
  for (let i = 0; i < (o.n || 4); i++) { const R = K.rng(1400 + i), u = (t * 0.05 * (0.7 + R()) + R()) % 1, x = K.lerp(x0, x1, (Math.sin(u * Math.PI * 2 + i) + 1) / 2), y = K.lerp(y0, y1, R()) + 30 * Math.sin(t * 1.3 + i * 2), f = Math.floor(tc * 12 + i) % 2, col = ['#ffd23a', '#ff8ac8', '#8ad0ff', '#ffffff'][i % 4];
    ctx.save(); ctx.translate(x, y); for (const sd of [-1, 1]) celShade(ctx, [[0, 0], [sd * (f ? 16 : 6), -14], [sd * (f ? 14 : 5), 6]], col, ehDark(col, 0.25), { off: 3, lw: 1.5, line: ehDark(col, 0.6) }); seg(ctx, 0, -6, 0, 6, 2, '#3a2a3a', 0); ctx.restore(); }
}
// princessGardenDay(ctx, t, cam, o): o {plate 'day' | 'golden', behind(ctx) people behind the hedge (drawn before the hedge plate),
//   shiver 0..1 (the hedge patch at the peek point shakes), gate 0..1 open, longShadow 0..1, butterflies}
function princessGardenDay(ctx, t, cam, o = {}) {
  const pl = o.plate || 'day', tc = EH_T2(t), t3 = EH_T3(t), dx = (f) => (cam.x - 800) * (1 - f), G = EH_PGARDEN, P = EH_GDAY[pl];
  ehImg(ctx, ehPGSkyPlate(pl), -500 + dx(0.15), -760, 2600, 1660);
  const [sx, sy] = P.sun; ehGlow(ctx, sx + dx(0.15), sy, pl === 'golden' ? 520 : 360, pl === 'golden' ? 0.7 : 0.55, pl === 'golden' ? '#ffd890' : '#fff6d0'); celShade(ctx, ell(sx + dx(0.15), sy, 70, 70, 36), '#fff6d0', '#ffe2a0', { off: 8, lw: 0 });
  for (let i = 0; i < 3; i++) { const cu = ((t * (5 + i * 3) + i * 700) % 2400) - 600; ctx.save(); ctx.globalAlpha = 0.85; ctx.drawImage(ehCloudSprite(i, pl === 'golden' ? 'gold' : 'day'), cu + dx(0.2), -420 + i * 150, 420 - i * 60, 126 - i * 18); ctx.restore(); }
  ctx.fillStyle = P.bank[1]; ctx.fillRect(-600, 760, 2800, 600);
  ehImg(ctx, ehPGFarPlate(pl), -300 + dx(0.5), 300, 2200, 520);
  ctx.save(); ctx.translate(dx(0.5), 0); for (let i = 0; i < 3; i++) { const bx = ((200 + i * 600 + t * 14) % 2000) - 200; celShade(ctx, [[bx - 22, 706], [bx + 22, 706], [bx + 16, 716], [bx - 16, 716]], '#8a5a3a', '#5a3a20', { off: 3, lw: 1.5 }); seg(ctx, bx, 706, bx, 680, 2, '#5a3a20', 0); shape(ctx, [[bx, 682], [bx + 18, 700], [bx, 700]], '#fff6ea', { lw: 1.5 }); }
  ehGlints(ctx, [-300, 672, 2200, 50], t, 6, 21, 10, 1.6); ctx.restore();
  if (o.behind) o.behind(ctx);
  ctx.drawImage(ehPGGroundPlate(), 0, 120, 1600, 1110);
  if (o.shiver > 0) { const [px, py] = EH_PG3.peek, j = o.shiver * 5; for (let i = 0; i < 5; i++) ehBlob(ctx, px - 50 + i * 25 + j * Math.sin(t * 40 + i), G.hedgeY + 4 + j * Math.cos(t * 33 + i * 2), 18, 12, '#4fb070', '#2f8050', { lw: 1.5 }); }
  ehPGLongShadows(ctx, o.longShadow ?? (pl === 'golden' ? 1 : 0));
  // live: fountain jet on threes, petals off the jasmine, butterflies, birds on the far air
  const [fx, fr] = G.fountain, jh = 112 + 10 * Math.sin(t3 * 17); ctx.save(); ctx.strokeStyle = '#e8faff'; ctx.lineCap = 'round';
  for (const sd of [-1, 0, 1]) { ctx.lineWidth = sd ? 5 : 8; ctx.beginPath(); ctx.moveTo(fx, fr - 104); if (sd) ctx.quadraticCurveTo(fx + sd * 40, fr - 104 - jh * 0.6, fx + sd * 74, fr - 10); else ctx.lineTo(fx, fr - 104 - jh); ctx.stroke(); }
  for (let i = 0; i < 6; i++) { const u = ((t3 * 1.5 + i / 6) % 1); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(fx + (i % 2 ? 1 : -1) * 60 * u, fr - 104 - jh * Math.sin(u * Math.PI) * 0.5, 3, 0, 7); ctx.fill(); } ctx.restore();
  for (const px of G.poles) ehLantern(ctx, px, 650, t3, 0);
  for (let i = 0; i < 5; i++) { const R = K.rng(600 + i), u = ((t * 0.12 + R()) % 1), x = G.jasmine - 60 + R() * 140 + 30 * Math.sin(t + i), y = 680 + u * 220; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = '#fff6ea'; ctx.beginPath(); ctx.ellipse(x, y, 4, 2.5, t + i, 0, 7); ctx.fill(); ctx.restore(); }
  if (o.butterflies !== false) ehButterflies(ctx, t, { n: 4 });
  ehPGGateLeaf(ctx, o.gate ?? 0);
}
// the movable rose branch in front of the bower (base at EH_PG3.branch); aside 0 = across the hide spot, 1 = pulled aside
function ehRoseBranch(ctx, t, aside = 0) {
  const [bx, by] = EH_PG3.branch, ang = K.lerp(-0.32, -1.25, aside) + idleSway(EH_T2(t), 77, 0.03, 2.6), L = 260, ex = bx + Math.cos(ang) * L, ey = by + Math.sin(ang) * L, mx = bx + Math.cos(ang + 0.25) * L * 0.55, my = by + Math.sin(ang + 0.25) * L * 0.55;
  ctx.save(); ctx.strokeStyle = '#4a7a2a'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 9; i++) { const u = 0.2 + i * 0.09, q = (1 - u) * (1 - u), r = 2 * u * (1 - u), s2 = u * u, x = q * bx + r * mx + s2 * ex, y = q * by + r * my + s2 * ey;
    ehBlob(ctx, x + (i % 2 ? 12 : -12), y + (i % 2 ? -8 : 8), 14, 9, '#46b868', '#2a8048', { lw: 1.5 }); if (i % 3 !== 1) ehBlob(ctx, x, y - 4, 12, 11, i % 2 ? '#e8264f' : '#ff6a8a', '#a8183a', { lw: 1.5, hi: '#ffd0dc' }); }
}
// front pass: bushes in the near corners (as HORSE-02)
function princessGardenDayFront(ctx, t) { ctx.drawImage(ehGardenFrontSprite(), -80, 1040, 360, 260); ctx.drawImage(ehGardenFrontSprite(), 1360, 1050, 360, 260); }
