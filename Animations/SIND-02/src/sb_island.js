// ===== SIND-02 sets: woodedIsland (the wooded variant of islandShore: beach, glade with the shade tree, brook, wood, lookout tree,
// the white dome far off) in two light models ('morning', 'gold'), the far island seen from the sea, and rocNest (the clearing with
// the log ring). New and reusable (SIND-06 can copy this file). World units, ground y 900.
// woodedIsland strip: x -400..2900. Sea x < 600 (horizon 600), beach 380..820, glade 760..1670 (shade tree 1080), fruit bushes
// 1300..1450, brook 1560 (stepping stones 1530, 1600), wood 1700..2900, lookout tree from (2050, 900) up to the fork (2400, 470).
const SB_WOOD = { w: 3300, x0: -400, ground: 900, water: 600, tree: 1080, brook: 1560, stones: [1528, 1598], look: { a: [2050, 900], b: [2400, 470] }, dome: [2820, 330] };
const SB_GREENS = { morning: ['#2f8a4a', '#3fae5a', '#5ac86a', '#7fd67a', '#1f6a44', '#9ae08a'], gold: ['#4a8a3a', '#6aae4a', '#8ac85a', '#b0d870', '#3a6a34', '#d0e080'] };
// a canopy band baked from overlapping circles (cel: flat greens with hard shade), fruit dots; top edge varies around top
function sbCanopy(c, x0, x1, top, bottom, seed, G, o = {}) {
  const R = K.rng(seed); let x = x0;
  while (x < x1) { const r = 60 + R() * 70, ty = top + (R() - 0.5) * (o.vary ?? 90), g = G[Math.floor(R() * 4)];
    celShade(c, ell(x, ty + r, r, r * 0.92, 20), g, sbDark(g, 0.28), { light: o.light || [-1, -1], off: r * 0.35, lw: 2.5, line: sbDark(g, 0.55), hi: R() < 0.4 ? sbLight(g, 0.3) : null });
    c.fillStyle = sbDark(G[0], 0.15); c.fillRect(x - r * 0.9, ty + r * 1.3, r * 1.8, bottom - ty - r);
    if (o.fruit && R() < 0.5) for (let k = 0; k < 3; k++) { c.fillStyle = R() < 0.5 ? '#e8364f' : '#ffcf3a'; c.beginPath(); c.arc(x + (R() - 0.5) * r, ty + r * (0.6 + R() * 0.6), 6 + R() * 4, 0, 7); c.fill(); c.strokeStyle = '#6a2a2a'; c.lineWidth = 1.5; c.stroke(); }
    x += r * (0.7 + R() * 0.5); }
}
function sbTrunk(c, x, y, top, w, lean = 0, col = '#8a5a3a') { celShade(c, [[x - w / 2, y], [x - w * 0.35 + lean, top], [x + w * 0.35 + lean, top], [x + w / 2, y]], col, sbDark(col, 0.3), { light: [-1, -0.3], off: w * 0.3, lw: 3, line: sbDark(col, 0.6) }); }
function sbFern(c, x, y, h, col = '#3f9a5a') { for (let k = -3; k <= 3; k++) { c.save(); c.translate(x, y); c.rotate(k * 0.32); celShade(c, [[0, 0], [-h * 0.12, -h * 0.5], [0, -h], [h * 0.12, -h * 0.5]], col, sbDark(col, 0.3), { light: [-1, 0], off: h * 0.06, lw: 2, line: sbDark(col, 0.55) }); c.restore(); } }
function sbMushroom(c, x, y, h, col = '#e8364f') { seg(c, x, y, x, y - h * 0.6, h * 0.22, '#fff1d8', 1.5); celShade(c, [[x - h * 0.45, y - h * 0.5], [x - h * 0.3, y - h], [x + h * 0.3, y - h], [x + h * 0.45, y - h * 0.5]], col, sbDark(col, 0.3), { light: [-1, -1], off: h * 0.12, lw: 2, hi: sbLight(col, 0.4) }); c.fillStyle = '#fff6ea'; for (const dx of [-0.2, 0.15]) { c.beginPath(); c.arc(x + dx * h, y - h * 0.8, h * 0.07, 0, 7); c.fill(); } }
function sbWoodPlate(model) {
  return sbBakeAt('wood:' + model, SB_WOOD.w, 1230, (c) => { c.translate(400, 0); const G = SB_GREENS[model], gold = model === 'gold';
    // far forest wall behind the glade and the wood (three bands, far to near)
    sbCanopy(c, 640, 2950, 330, 900, 11, G.map((g) => sbMix(g, gold ? '#e8d8a0' : '#bfe0ee', 0.35)), { vary: 120 });
    for (let x = 700; x < 2900; x += 90 + (x % 70)) sbTrunk(c, x, 900, 560, 30, 0, gold ? '#9a6a4a' : '#7a5a4a');
    sbCanopy(c, 1640, 2950, 380, 900, 12, G, { fruit: true });
    for (const [x, w, l] of [[1720, 70, -10], [1880, 60, 14], [2240, 80, -6], [2520, 64, 10], [2700, 90, -14], [2860, 70, 6]]) sbTrunk(c, x, 905, 420, w, l, gold ? '#a8704a' : '#8a5a3a');
    sbCanopy(c, 760, 1500, 470, 760, 13, G.map((g) => sbMix(g, '#ffffff', 0.08)), { fruit: true, vary: 60 });
    // ground: grass meadow, the beach on the left (the sea is drawn live before this plate)
    sbGrad(c, 700, 880, 2300, 350, [[0, gold ? '#8ac860' : '#6ac06a'], [1, gold ? '#5a9a44' : '#3f8a4a']]);
    const B = [[380, 1230], [470, 1060], [560, 970], [660, 922], [760, 905], [900, 902], [900, 1230]];
    c.save(); K.poly(c, B, true); c.clip(); sbGrad(c, 380, 900, 560, 330, [[0, gold ? '#f8d8a0' : '#f4dca8'], [1, gold ? '#e8b070' : '#e0b878']]);
    c.fillStyle = gold ? '#c89a60' : '#c8a070'; c.beginPath(); c.moveTo(380, 1230); c.lineTo(470, 1060); c.lineTo(560, 970); c.lineTo(630, 935); c.lineTo(660, 1230); c.closePath(); c.fill(); c.restore();
    ink(c, B.slice(1, -1), 3, 2, '#9a7040');
    c.fillStyle = gold ? '#8ac860' : '#6ac06a'; c.beginPath(); c.moveTo(820, 905); c.bezierCurveTo(860, 960, 880, 1100, 900, 1230); c.lineTo(960, 1230); c.lineTo(960, 900); c.closePath(); c.fill();
    // the brook: from the forest down to the front, with stepping stones
    c.save(); c.fillStyle = '#5ac0e8'; c.beginPath(); c.moveTo(1540, 900); c.bezierCurveTo(1520, 980, 1600, 1060, 1560, 1230); c.lineTo(1660, 1230); c.bezierCurveTo(1700, 1060, 1600, 980, 1590, 900); c.closePath(); c.fill();
    c.strokeStyle = '#bff0ff'; c.lineWidth = 3; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(1560 + k * 8, 930 + k * 50); c.lineTo(1590 + k * 8, 935 + k * 50); c.stroke(); } c.restore();
    for (const sx of SB_WOOD.stones) sbStone(c, sx, 912, 26, '#c8c0d8', '#8a82a8');
    // undergrowth: ferns, mushrooms, flowers, stones, tufts
    const R = K.rng(gold ? 33 : 32);
    for (let i = 0; i < 26; i++) { const x = 1650 + R() * 1250, y = 905 + R() * 40; if (Math.abs(x - 2050) < 60) continue; sbFern(c, x, y, 60 + R() * 60, G[Math.floor(R() * 3)]); }
    for (let i = 0; i < 18; i++) sbMushroom(c, 900 + R() * 2000, 915 + R() * 280, 26 + R() * 26, ['#e8364f', '#ff8a3a', '#c86ad8'][i % 3]);
    sbDress(c, 880, 2900, 912, 1210, gold ? 45 : 44, { stones: 16, tufts: 26, flowers: 36, skip: [[1500, 1680]], grass: [G[2], G[4]] });
    sbDress(c, 480, 760, 930, 1200, 46, { stones: 6, tufts: 0, flowers: 0, shells: 12, stone: ['#d8ccc0', '#9a8a80'] });
    // fruit bushes 1300..1450
    for (const [x, r] of [[1330, 70], [1420, 60]]) { celShade(c, ell(x, 900 - r * 0.7, r, r * 0.75, 20), G[1], G[4], { light: [-1, -1], off: r * 0.3, lw: 2.5 }); for (let k = 0; k < 5; k++) { c.fillStyle = k % 2 ? '#e8364f' : '#ff9a3a'; c.beginPath(); c.arc(x - r * 0.6 + k * r * 0.3, 900 - r * (0.5 + (k % 3) * 0.25), 8, 0, 7); c.fill(); c.strokeStyle = '#6a2a2a'; c.lineWidth = 1.5; c.stroke(); } }
  });
}
// the sky for any tall view: the top colour above the sky plate (hz = horizon), so cranes and tilts never run out of sky
function sbSkyTall(ctx, name, cam, hz, top = -2000, o = {}) { const P = SB_SKIES[name] || SB_SKIES.day; ctx.fillStyle = P.g[0][1]; ctx.fillRect(cam.x - 3000, top, 6000, hz - 600 - top + 4); sbGrad(ctx, cam.x - 3000, hz - 600, 6000, 640, P.g); sbSky(ctx, name, cam, { hz, par: o.par }); }
// woodedIsland set behind the actors: sky, sea on the left, far dome (o.dome = top y or null), plate
function sbWoodedIsland(ctx, model, t, cam, o = {}) {
  sbSkyTall(ctx, model === 'gold' ? 'gold' : 'morning', cam, 600);
  if (o.sun) o.sun(ctx);
  const sea = o.sea || { hz: 600, y: [612, 660, 900, 960], amp: 5, pal: model === 'gold' ? 'gold' : 'morning' };
  if (cam.x - 600 / cam.zoom < 900) { sbSeaBack(ctx, t, sea, -900, 900); if (o.farSea) o.farSea(ctx); sbSeaLayer(ctx, 2, t, sea, -900, 900); sbSeaLayer(ctx, 3, t, sea, -900, 700); }
  if (o.dome != null) sbDome(ctx, SB_WOOD.dome[0], o.dome, t, o.domeGlint);
  ctx.drawImage(sbWoodPlate(model), -400, 0);
}
// the dome on the horizon (the roc's egg seen from far): top y, 420 wide, warm white with a lilac side
function sbDome(ctx, x, top, t, glint = 0) { const E = ell(x, top + 370, 210, 370, 40); celShade(ctx, E, '#fffaf0', '#d8c8f0', { light: [-1, -0.5], off: 70, lw: 3.5, line: '#7a6aa8', hi: '#ffffff' }); if (glint > 0 && glint < 1) sbGlint(ctx, x - 120 + 240 * glint, top + 30 + 60 * Math.abs(glint - 0.5), 40, glint); }
// the shade tree (live: the canopy breathes on three periods). Returns the branch points
function sbShadeTree(ctx, t, model, o = {}) { const x = SB_WOOD.tree, G = SB_GREENS[model], tc = SB_T2(t);
  sbTrunk(ctx, x, 905, 520, 84, -6, model === 'gold' ? '#a8704a' : '#8a5a3a');
  seg(ctx, x - 10, 560, x - 150, 470, 22, model === 'gold' ? '#a8704a' : '#8a5a3a', 3); seg(ctx, x + 5, 600, x + 170, 520, 20, model === 'gold' ? '#a8704a' : '#8a5a3a', 3);
  if (o.back) return;
  const R = K.rng(77); for (let i = 0; i < 15; i++) { const a = R() * Math.PI, r = 70 + R() * 50, cx = x - 20 + Math.cos(a) * (120 + R() * 110) * (i % 2 ? 1 : -1), cy = 420 - Math.sin(a) * 90 + R() * 60, sw = 5 * Math.sin(tc * (0.9 + (i % 3) * 0.35) + i), g = G[i % 4];
    celShade(ctx, ell(cx + sw, cy, r, r * 0.85, 18), g, sbDark(g, 0.28), { light: [-1, -1], off: r * 0.35, lw: 2.5, line: sbDark(g, 0.55), hi: i % 3 === 0 ? sbLight(g, 0.3) : null }); }
  for (let k = 0; k < 7; k++) { const fx = x - 200 + k * 64, fy = 470 + (k % 3) * 26; ctx.fillStyle = k % 2 ? '#e8364f' : '#ffcf3a'; ctx.beginPath(); ctx.arc(fx + 3 * Math.sin(tc + k), fy, 9, 0, 7); ctx.fill(); ctx.strokeStyle = '#6a2a2a'; ctx.lineWidth = 2; ctx.stroke(); }
  return { branchL: [x - 150, 470], branchR: [x + 170, 520] };
}
// dappled light discs on the grass (they drift; o.gold moves them right and stretches them)
function sbDapple(ctx, t, gold, x0 = 800, x1 = 1500) { const R = K.rng(gold ? 9 : 8); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 14; i++) { const x = x0 + R() * (x1 - x0) + 8 * Math.sin(t * 0.6 + i), y = 920 + R() * 260; ctx.globalAlpha = 0.22; ctx.fillStyle = gold ? '#ffd890' : '#fff6c8'; ctx.beginPath(); ctx.ellipse(x, y, (30 + R() * 30) * (gold ? 1.6 : 1), 10 + R() * 8, 0, 0, 7); ctx.fill(); } ctx.restore(); }
// a tree's cast shadow on the grass: a soft flat shape, swung by angle (morning left, gold right)
function sbTreeShadow(ctx, x, ang, len = 300) { ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = '#2a3a5a'; ctx.beginPath(); ctx.ellipse(x + Math.sin(ang) * len * 0.5, 960, len * 0.6, 50, 0, 0, 7); ctx.fill(); ctx.restore(); }
// the lookout tree: a leaning trunk from a to b (the fork), branches and a canopy above; front leaves over his head
function sbLookout(ctx, t, model, part) { const { a, b } = SB_WOOD.look, G = SB_GREENS[model], tc = SB_T2(t), col = model === 'gold' ? '#a8704a' : '#8a5a3a';
  if (part === 'back') { const n = [-(b[1] - a[1]), b[0] - a[0]], l = Math.hypot(...n), nx = n[0] / l, ny = n[1] / l;
    celShade(ctx, [[a[0] - nx * 46, a[1] - ny * 46], [b[0] - nx * 30, b[1] - ny * 30], [b[0] + 30, b[1] - 200], [b[0] + 60, b[1] - 190], [b[0] + nx * 30 + 20, b[1] + ny * 30], [a[0] + nx * 46, a[1] + ny * 46]], col, sbDark(col, 0.3), { light: [-1, -1], off: 16, lw: 3, line: sbDark(col, 0.6) });
    seg(ctx, b[0], b[1] - 10, b[0] - 150, b[1] - 170, 18, col, 3); seg(ctx, b[0] + 20, b[1] - 40, b[0] + 210, b[1] - 120, 16, col, 3);
    return; }
  const R = K.rng(91); for (let i = 0; i < 10; i++) { const cx = b[0] - 240 + R() * 520, cy = b[1] - 320 + R() * 120, r = 60 + R() * 50, g = G[i % 4], sw = 4 * Math.sin(tc * (0.8 + (i % 3) * 0.4) + i);
    celShade(ctx, ell(cx + sw, cy, r, r * 0.85, 18), g, sbDark(g, 0.28), { light: [-1, -1], off: r * 0.35, lw: 2.5, line: sbDark(g, 0.55) }); }
}
// point on the lookout trunk at u (0 foot .. 1 fork), top surface
const sbLookPt = (u) => { const { a, b } = SB_WOOD.look; return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 34]; };

// ---------- the far island seen from the sea (S2): a green hump of trees with a beach and a white dome, w 1000 at s 1, base y ----------
function sbFarIslandPlate() { return sbBakeAt('farIsland', 1100, 520, (c) => { c.translate(550, 500); const G = SB_GREENS.morning;
  c.fillStyle = '#f4dca8'; c.beginPath(); c.moveTo(-540, 0); c.quadraticCurveTo(0, -60, 540, 0); c.closePath(); c.fill(); ink(c, [[-540, 0], [-300, -34], [0, -46], [300, -34], [540, 0]], 3, 1, '#9a7040');
  celShade(c, ell(140, -410, 70, 130, 30).filter((p) => p[1] < -300), '#fffaf0', '#d8c8f0', { light: [-1, -0.5], off: 24, lw: 3, line: '#7a6aa8' });
  const R = K.rng(5); for (let i = 0; i < 26; i++) { const x = -460 + i * 36 + R() * 20, h = 120 + 200 * Math.sin(Math.PI * (i / 25)) + R() * 50, r = 44 + R() * 30, g = G[Math.floor(R() * 4)]; celShade(c, ell(x, -40 - h + r, r, r * 0.9, 16), g, sbDark(g, 0.28), { light: [-1, -1], off: r * 0.35, lw: 2.5, line: sbDark(g, 0.55) }); c.fillStyle = sbDark(G[0], 0.1); c.fillRect(x - r * 0.8, -40 - h + r * 1.6, r * 1.6, h - r); }
  for (const x of [-420, 380, 470]) palmTree(c, x, -20, { s: 0.55, lean: x < 0 ? -14 : 12 }); }); }
function sbFarIsland(ctx, x, y, s) { ctx.drawImage(sbFarIslandPlate(), x - 550 * s, y - 500 * s, 1100 * s, 520 * s); }

// ---------- rocNest: the clearing, egg centre x 1000, log ring y 820..900 from x 380 to 1620, forest edges left and right ----------
const SB_NEST = { egg: 1000, ground: 900, ring: [380, 1620] };
function sbNestPlate() {
  return sbBakeAt('nest', 2800, 1260, (c) => { c.translate(500, -360); const G = SB_GREENS.morning;   // world x -500..2300, y 360..1620
    sbCanopy(c, -500, 2300, 640, 900, 21, G.map((g) => sbMix(g, '#bfe0ee', 0.45)), { vary: 70 });   // far trees across the back of the clearing
    sbCanopy(c, -500, 420, 520, 900, 22, G, { fruit: true, vary: 120 }); sbCanopy(c, 1580, 2300, 540, 900, 23, G, { fruit: true, vary: 120 });
    for (const x of [-420, -260, -60, 140, 300, 1680, 1860, 2040, 2200]) sbTrunk(c, x, 905, 700, 54, (x % 3) * 4, '#8a5a3a');
    sbGrad(c, -500, 880, 2800, 740, [[0, '#7ac86a'], [0.4, '#5ab05a'], [1, '#3f8a4a']]);
    // a trampled ring of flattened grass round the nest, and a dusty floor inside it
    c.fillStyle = '#c8b07a'; c.beginPath(); c.ellipse(1000, 950, 760, 80, 0, 0, 7); c.fill(); c.fillStyle = '#a8c870'; c.beginPath(); c.ellipse(1000, 990, 900, 70, 0, 0, Math.PI); c.fill();
    sbDress(c, -480, 300, 915, 1560, 61, { stones: 10, tufts: 22, flowers: 26 }); sbDress(c, 1700, 2280, 915, 1560, 62, { stones: 10, tufts: 22, flowers: 26 });
    sbDress(c, 300, 1700, 1010, 1560, 63, { stones: 12, tufts: 26, flowers: 30 });
    const R = K.rng(64); for (let i = 0; i < 14; i++) sbMushroom(c, -450 + R() * 2700, 1000 + R() * 500, 30 + R() * 26, ['#e8364f', '#ff8a3a', '#c86ad8'][i % 3]);
    for (let i = 0; i < 14; i++) { const x = -480 + R() * 2760; if (x > 300 && x < 1700) continue; sbFern(c, x, 912 + R() * 40, 70 + R() * 60, G[i % 3]); }
  });
}
// the logs of the nest ring: part 'back' (behind the egg) or 'front'; each log a quad with an end ring
function sbNestLogs(ctx, part) {
  const key = 'nestLogs:' + part; ctx.drawImage(sbBakeAt(key, 1500, 360, (c) => { c.translate(-250, -640); const R = K.rng(part === 'back' ? 71 : 72), n = part === 'back' ? 7 : 6;
    for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, x = K.lerp(380, 1620, u) + (R() - 0.5) * 40, y = part === 'back' ? 840 - 26 * Math.sin(Math.PI * u) : 905 + 16 * Math.sin(Math.PI * u), L = 220 + R() * 60, a = (R() - 0.5) * 0.5 + (part === 'back' ? 0 : 0.1), r = part === 'back' ? 34 : 44, col = ['#9a6a42', '#a8784a', '#8a5a3a'][i % 3];
      c.save(); c.translate(x, y); c.rotate(a); celShade(c, [[-L / 2, -r], [L / 2, -r], [L / 2, r], [-L / 2, r]], col, sbDark(col, 0.3), { light: [0, -1], off: r * 0.6, lw: 3.5, line: sbDark(col, 0.6) });
      c.strokeStyle = sbDark(col, 0.35); c.lineWidth = 2.5; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-L / 2 + 20 + k * 60, -r * 0.3 + k * 6); c.lineTo(-L / 2 + 70 + k * 60, -r * 0.3 + k * 6); c.stroke(); }
      const ex = R() < 0.5 ? -L / 2 : L / 2; celShade(c, ell(ex, 0, r * 0.45, r, 16), '#e8c890', '#b89060', { light: [-1, -1], off: 6, lw: 3 }); c.strokeStyle = '#a87a4a'; c.lineWidth = 2; c.beginPath(); c.ellipse(ex, 0, r * 0.25, r * 0.55, 0, 0, 7); c.stroke();
      c.restore(); seg(c, x - 40, y - r, x - 70, y - r - 40, 4, '#8a5a3a', 1); seg(c, x + 30, y - r, x + 60, y - r - 30, 3, '#8a5a3a', 1); }
  }), 250, 640);
}
// the tall clouds of the nest sky (baked): two cumulus towers at upper right and one at the left, standing behind the forest
function sbNestClouds() { return sbBakeAt('nestClouds', 3000, 1400, (c) => { c.translate(600, 1400); for (const [x, w, h] of [[1700, 800, 1050], [2250, 520, 700], [-300, 600, 640], [620, 480, 420]]) sbCumulus(c, x, 0, w, h, { seed: Math.floor(x + 2000), blur: 5 }); }); }
function sbNestSky(ctx, cam, t) { sbSkyTall(ctx, 'day', cam, 720, -2200); ctx.drawImage(sbNestClouds(), -600, 700 - 1400 + 20); }
