// ===== The Ebony Horse series: the princess's river city (new in HORSE-02; episodes 3-5 copy this file unchanged) =====
// princessPalace (rose stone, one blue dome, a stair pavilion), ehRiverTowers (the two river towers with their bridge),
// riverCity (exterior establishing plate, dusk), palaceRoof (the roof terrace, dusk and warmNight plates, parallax), princessGarden
// (moonlit garden with fountain, bench, hedge and gate), moonPath (the moon's reflection that can pull into one gold path),
// ehFarLand (the 2400-wide land seen from the sky: dunes, caravan, braided river, three towns, the last one the river city),
// and the dusk / warmNight sky additions to skyFlight. Night is a repainted lighter plate, never a tint over the cast.
// Every plate is baked once (ehBakeAt); live parts are pure functions of t.

// ---------- palette (dusk and the lighter, bluer warmNight repaint; both keep rose, cream and blue) ----------
const EH_RC_DUSK = { rose: '#e89aa0', roseS: '#c06a80', roseL: '#f8c8c8', trim: '#fff0d8', trimS: '#e0c8a8', dome: '#2a6ae0', domeS: '#1a48b0', domeH: '#7ab0ff', gold: '#f2c040', goldS: '#c8961a', line: '#6a3448', cap: '#3a7ae8', capS: '#2450b8', floorA: '#fff0d8', floorB: '#f0b4b4', border: '#d8845a', win: '#ffd27a', dark: '#5a3a6a' };
const EH_RC_NIGHT = { rose: '#e2a0c0', roseS: '#b07aa8', roseL: '#f0c8e0', trim: '#f4ecf6', trimS: '#c8b8dc', dome: '#3a74ea', domeS: '#2450b8', domeH: '#9ac0ff', gold: '#f2c040', goldS: '#c8961a', line: '#4a2a5a', cap: '#4a82f0', capS: '#2a58c0', floorA: '#f2eaf4', floorB: '#e0b0cc', border: '#c88a7a', win: '#ffd27a', dark: '#4a3a7a' };
const ehRCP = (night) => (night ? EH_RC_NIGHT : EH_RC_DUSK);
// sky gradients added to the skyFlight table (ehSkyPlate reads EH_SKY by name) and their cloud colours
EH_SKY.dusk = [[0, '#4a6ad8'], [0.42, '#7a86e0'], [0.68, '#c890d0'], [0.86, '#ffb0a8'], [1, '#ffc090']];
EH_SKY.warmNight = [[0, '#2e46a8'], [0.45, '#4a62c8'], [0.75, '#6a7ade'], [0.9, '#c8a0d0'], [1, '#ffc8a0']];
EH_CLOUDC.dusk = ['#ffe4ee', '#e8a0c0'];
EH_CLOUDC.night = ['#d0d6fa', '#9a9ce0'];
const ehImg = (ctx, img, x, y, w, h, a = 1) => { if (a <= 0.001) return; ctx.save(); ctx.globalAlpha *= Math.min(1, a); ctx.drawImage(img, x, y, w, h); ctx.restore(); };

// ---------- shared pieces ----------
// a blue onion dome on a rose drum (base = drum top y), finial gold; P = palette
function ehBlueDome(c, cx, base, r, P, o = {}) {
  const dh = o.drum ?? r * 0.32;
  celShade(c, K.rectPts(cx - r * 0.9, base, r * 1.8, dh), P.rose, P.roseS, { light: [-1, -1], off: r * 0.1, lw: 3, line: P.line });
  for (let k = -3; k <= 3; k++) { const x = cx + k * r * 0.24; shape(c, townArchPts(x - r * 0.045, x + r * 0.045, base + dh * 0.22, base + dh * 0.82, 'round', 6), P.dark, { lw: 0 }); }
  celShade(c, K.rectPts(cx - r * 0.98, base - r * 0.07, r * 1.96, r * 0.09), P.trim, P.trimS, { light: [-1, -1], off: 3, lw: 2.5, line: P.line });
  const onion = [[cx - r, base - r * 0.05], ...Array.from({ length: 19 }, (_, i) => { const u = i / 18, a = Math.PI * (1 + u); return [cx + Math.cos(a) * r * (1 - 0.1 * Math.sin(u * Math.PI)), base - r * 0.05 + Math.sin(a) * r * 1.02]; }), [cx + r, base - r * 0.05]];
  onion.splice(10, 0, [cx, base - r * 1.34]);
  celShade(c, onion, P.dome, P.domeS, { light: [-1, -1], off: r * 0.3, hi: P.domeH, lw: Math.max(2.5, r * 0.02), line: ehDark(P.domeS, 0.4) });
  for (const k of [-0.55, 0, 0.55]) { c.save(); c.strokeStyle = ehDark(P.dome, 0.12); c.lineWidth = Math.max(1.5, r * 0.012); c.beginPath(); c.moveTo(cx + k * r * 0.92, base - r * 0.06); c.quadraticCurveTo(cx + k * r * 0.72, base - r * 0.85, cx, base - r * 1.32); c.stroke(); c.restore(); }
  const fy = base - r * 1.32, fl = Math.max(16, r * 0.38);
  seg(c, cx, fy, cx, fy - fl, Math.max(3, r * 0.035), P.gold, 1.5); ehBlob(c, cx, fy - fl * 0.55, Math.max(4, r * 0.05), Math.max(4, r * 0.05), P.gold, P.goldS, { lw: 1.5 });
  c.save(); c.fillStyle = P.gold; c.beginPath(); c.arc(cx + fl * 0.12, fy - fl, Math.max(4, r * 0.05), 0.6, Math.PI * 1.8); c.arc(cx + fl * 0.2, fy - fl - 1, Math.max(3, r * 0.04), Math.PI * 1.8, 0.6, true); c.fill(); c.restore();   // crescent
}
// a crenellated wall top: merlons w wide every step from x0 to x1, wall top y, merlon height h
function ehCrenels(c, x0, x1, y, h, step, w, P) { for (let x = x0; x < x1 - w * 0.5; x += step) celShade(c, K.rectPts(x, y - h, Math.min(w, x1 - x), h + 2), P.rose, P.roseS, { light: [-1, -1], off: 5, lw: 2.5, line: P.line }); }
// princessPalace(c, x, y, s, o): the long rose palace (centre bottom x, y) with a flat roof terrace and crenels, an arcade of five
// pointed arches, the stair pavilion with its small dome at the right end, and the BLUE DOME on a drum to the left. o.night palette,
// o.lit 0..1 windows, o.detail. Size at s 1: block 360 x 260, dome r 120 at dx -300.
function princessPalace(c, x, y, s, o = {}) {
  const P = ehRCP(o.night); c.save(); c.translate(x, y); c.scale(s, s);
  ehBlueDome(c, -300, -230, 120, P, { drum: 70 });
  celShade(c, K.rectPts(-350, -160, 120, 160), P.rose, P.roseS, { light: [-1, -1], off: 12, lw: 3, line: P.line });   // dome base hall
  celShade(c, K.rectPts(-180, -260, 360, 260), P.rose, P.roseS, { light: [-1, -1], off: 22, hi: P.roseL, lw: 3.5, line: P.line });
  celShade(c, K.rectPts(-188, -268, 376, 14), P.trim, P.trimS, { light: [-1, -1], off: 4, lw: 2.5, line: P.line });
  ehCrenels(c, -186, 186, -268, 18, 30, 16, P);
  celShade(c, K.rectPts(120, -330, 54, 70), P.rose, P.roseS, { light: [-1, -1], off: 8, lw: 2.5, line: P.line });   // stair pavilion
  ehBlueDome(c, 147, -330, 26, P, { drum: 6 });
  for (let i = 0; i < 5; i++) { const ax = -150 + i * 70; shape(c, townArchPts(ax, ax + 44, -120, 0, 'pointed', 8), P.dark, { lw: 2.5 }); }
  for (let i = 0; i < 6; i++) { const wx = -160 + i * 60, lit = o.lit != null ? K.clamp(o.lit * 6 - i) : 0; shape(c, townArchPts(wx, wx + 22, -220, -176, 'pointed', 6), lit > 0 ? ehMix(P.dark, P.win, lit) : P.dark, { lw: 2 }); }
  c.restore();
}
// the two river towers (slim, rose, blue cone caps) at x1 and x2, base y, height h, width w, and the three-arch bridge between them
function ehRiverTowers(c, x1, x2, base, h, w, P, o = {}) {
  const by = base - h * 0.16, bh = h * 0.08;
  celShade(c, [[x1, by], [x2, by], [x2, by + bh], ...[2, 1, 0].flatMap((k) => { const a = x1 + (x2 - x1) * k / 3, b = a + (x2 - x1) / 3; return [[b - 4, by + bh], [b - 4, by + bh + h * 0.1], [(a + b) / 2, by + bh + h * 0.03], [a + 4, by + bh + h * 0.1], [a + 4, by + bh]]; }), [x1, by + bh]], P.trim, P.trimS, { light: [-1, -1], off: 4, lw: 2.5, line: P.line });
  for (let k = 1; k < 6; k++) { const lx = x1 + (x2 - x1) * k / 6; seg(c, lx, by, lx, by - h * 0.05, 2, P.line, 0); shape(c, ell(lx, by - h * 0.06, 3.5, 4, 8), o.lamps ? '#ffe08a' : P.trimS, { lw: 1.2 }); }
  for (const tx of [x1, x2]) {
    celShade(c, [[tx - w / 2, base], [tx - w * 0.44, base - h], [tx + w * 0.44, base - h], [tx + w / 2, base]], P.rose, P.roseS, { light: [-1, -1], off: w * 0.3, hi: P.roseL, lw: 3, line: P.line });
    celShade(c, K.rectPts(tx - w * 0.56, base - h - 6, w * 1.12, 10), P.trim, P.trimS, { off: 3, lw: 2, line: P.line });
    celShade(c, [[tx - w * 0.55, base - h - 6], [tx, base - h - w * 1.6], [tx + w * 0.55, base - h - 6]], P.cap, P.capS, { light: [-1, -1], off: w * 0.2, lw: 2.5, line: ehDark(P.capS, 0.4) });
    seg(c, tx, base - h - w * 1.6, tx, base - h - w * 1.6 - 14, 2.5, P.gold, 1);
    for (const f of [0.25, 0.5, 0.75]) shape(c, townArchPts(tx - w * 0.12, tx + w * 0.12, base - h * f - w * 0.35, base - h * f, 'round', 5), P.dark, { lw: 1.5 });
  }
}
// moonPath(ctx, pts, t, k, o): the moon reflection on a river centre line pts. k 0: about 14 scattered warm dashes; k 1: one tapering
// gold path. Background light (additive). o: {w (dash half width at the far end), w1 (near end), scatter, seed, a}
function moonPath(ctx, pts, t, k, o = {}) {
  const n = o.n || 14, R = K.rng(o.seed || 31), path = densify(pts, 6), a = o.a ?? 1;
  const at = (u) => { const f = K.clamp(u) * (path.length - 1), i = Math.min(path.length - 2, Math.floor(f)), q = f - i; return [K.lerp(path[i][0], path[i + 1][0], q), K.lerp(path[i][1], path[i + 1][1], q)]; };
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
  if (k > 0.02) { ctx.globalAlpha = a * 0.55 * k; ctx.strokeStyle = '#ffe9a8'; ctx.shadowColor = '#ffd27a'; ctx.shadowBlur = 14;
    for (let i = 0; i < 24; i++) { const u0 = i / 24, u1 = (i + 1) / 24, [x0, y0] = at(u0), [x1, y1] = at(u1); ctx.lineWidth = K.lerp(o.w ?? 3, o.w1 ?? 12, u0) * (0.85 + 0.15 * Math.sin(t * 5 + i)); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); } ctx.shadowBlur = 0; }
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, [x, y] = at(u), sx = (R() - 0.5) * (o.scatter ?? 120) * (1 - k), sy = (R() - 0.5) * 14 * (1 - k), len = K.lerp(10, 30, u) * (1 + 0.3 * Math.sin(t * 3 + i * 1.7)), sh = 0.6 + 0.4 * Math.sin(t * 4.1 + i * 2.3);
    ctx.globalAlpha = a * 0.8 * sh; ctx.strokeStyle = '#ffe9a8'; ctx.lineWidth = K.lerp(2, 5, u); ctx.beginPath(); ctx.moveTo(x + sx - len / 2, y + sy); ctx.lineTo(x + sx + len / 2, y + sy); ctx.stroke(); }
  ctx.restore();
}
// city houses: a seeded list in a band (for plates and their live windows)
function ehHouses(seed, n, x0, x1, y0, y1, avoid = []) {
  const R = K.rng(seed), out = [], cols = ['#fff0d8', '#ffd8b8', '#f8c0c8', '#cfe0f8', '#f0e0a8', '#e8c8f0'];
  for (let i = 0; i < n * 3 && out.length < n; i++) { const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), d = K.clamp((y - y0) / Math.max(1, y1 - y0)), w = (40 + R() * 46) * (0.55 + 0.6 * d), h = (36 + R() * 40) * (0.55 + 0.6 * d);
    if (avoid.some((a) => x + w / 2 > a[0] && x - w / 2 < a[1] && (a[2] == null || (y > a[2] && y - h < a[3])))) continue;
    out.push({ x, y, w, h, col: cols[Math.floor(R() * cols.length)], dome: R() < 0.22, ph: R(), wins: 1 + Math.floor(R() * 3) }); }
  return out.sort((a, b) => a.y - b.y);
}
function ehHouse(c, H, P, lit = 0) {
  const { x, y, w, h } = H; celShade(c, K.rectPts(x - w / 2, y - h, w, h), H.col, ehMix(H.col, P.roseS, 0.45), { light: [-1, -1], off: w * 0.18, lw: 2, line: P.line });
  c.fillStyle = ehDark(H.col, 0.25); c.fillRect(x - w / 2 - 2, y - h - 4, w + 4, 5);
  if (H.dome) ehBlob(c, x, y - h, w * 0.22, w * 0.2, H.ph < 0.5 ? '#5ab0e8' : '#f2f0f8', H.ph < 0.5 ? '#3a80c0' : '#c8c0d8', { lw: 1.5 });
  for (let k = 0; k < H.wins; k++) { const wx = x - w / 2 + w * (k + 1) / (H.wins + 1); c.fillStyle = lit > 0 ? ehMix(P.dark, P.win, lit) : P.dark; c.fillRect(wx - w * 0.06, y - h * 0.62, w * 0.12, h * 0.26); }
}

// ---------- the land seen from the sky (S3 pan): 2400 x 710 ----------
const EH_FAR = { w: 2400, h: 710, towns: [[1300, 330, 0.9], [1750, 470, 1.1], [2150, 360, 1.0]], river: [[820, 710], [900, 560], [1010, 420], [1120, 300], [1260, 160], [1420, 0]], river2: [[2010, 710], [2080, 520], [2240, 360], [2330, 170], [2400, 40]], crest: [[120, 300], [380, 260], [640, 292]], wheel: [960, 500] };
function ehFarLandPlate() {
  return ehBakeAt('farland', EH_FAR.w, EH_FAR.h, (c, w, h) => {
    const R = K.rng(77);
    // ground: sand to the left, fields to the right
    ehGrad(c, 0, 0, w, h, [[0, '#e8b878'], [1, '#f0c890']]);
    c.save(); c.beginPath(); c.moveTo(860, 0); c.bezierCurveTo(760, 260, 980, 450, 780, h); c.lineTo(w, h); c.lineTo(w, 0); c.closePath(); c.clip();
    c.fillStyle = c.createPattern(ehFieldTile('far'), 'repeat'); c.fillRect(0, 0, w, h); c.restore();
    // dunes: crescents with violet shadows (long, low sun from the right)
    for (let i = 0; i < 34; i++) { const x = R() * 840, y = 30 + R() * (h - 60), s = 0.5 + 0.9 * (y / h), dw = (70 + R() * 90) * s, dh = (16 + R() * 18) * s;
      c.fillStyle = '#b07ab8'; c.beginPath(); c.ellipse(x - dw * 0.25, y + dh * 0.25, dw * 0.7, dh * 0.55, 0, 0, 7); c.fill();
      c.fillStyle = ['#f6cf8e', '#f2c27a', '#fad8a0'][i % 3]; c.beginPath(); c.ellipse(x, y, dw * 0.62, dh * 0.5, 0, Math.PI, 0); c.lineTo(x + dw * 0.62, y + 2); c.fill(); }
    // the oasis
    c.fillStyle = '#5ab0d8'; c.beginPath(); c.ellipse(600, 470, 46, 14, 0, 0, 7); c.fill(); c.fillStyle = '#5aa84a'; c.beginPath(); c.ellipse(600, 476, 80, 26, 0, 0, 7); c.globalAlpha = 0.6; c.fill(); c.globalAlpha = 1;
    for (let i = 0; i < 5; i++) palmTree(c, 556 + i * 22, 470 + (i % 2) * 8, { s: 0.11, lean: -10 + i * 5 });
    // roads
    c.save(); c.setLineDash([10, 8]); c.strokeStyle = '#c8a06a'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 520); c.bezierCurveTo(500, 560, 900, 460, 1300, 360); c.bezierCurveTo(1500, 320, 1600, 480, 1750, 490); c.bezierCurveTo(1900, 500, 2000, 380, 2150, 380); c.stroke(); c.restore();
    // braided rivers (silver-pink with a light edge), islands
    const riv = (pts, w0, w1) => { const p = densify(pts, 10); c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; for (const [col, k] of [['#8a78c0', 1.25], ['#c8b4e0', 1], ['#f4d8e8', 0.45]]) { c.strokeStyle = col; for (let i = 0; i < p.length - 1; i++) { c.lineWidth = K.lerp(w0, w1, i / p.length) * k; c.beginPath(); c.moveTo(p[i][0], p[i][1]); c.lineTo(p[i + 1][0], p[i + 1][1]); c.stroke(); } } c.restore(); };
    riv(EH_FAR.river, 70, 18); riv(EH_FAR.river.map(([x, y], i) => [x + 40 + 20 * Math.sin(i * 2), y - 10]), 22, 8); riv(EH_FAR.river.map(([x, y], i) => [x - 36 - 14 * Math.cos(i * 1.7), y + 6]), 18, 6); riv(EH_FAR.river2, 50, 14);
    for (const [x, y] of [[880, 600], [1000, 450], [1140, 290]]) { c.fillStyle = '#8ac070'; c.beginPath(); c.ellipse(x, y, 16, 7, -0.6, 0, 7); c.fill(); }
    // towns: a wall ring, houses, domes; the last is the river city (rose palace, blue dome, two towers by the river)
    EH_FAR.towns.forEach(([tx, ty, s], i) => { c.save(); c.translate(tx, ty); c.scale(s, s);
      c.fillStyle = '#d8b088'; c.beginPath(); c.ellipse(0, 0, 120, 50, 0, 0, 7); c.fill(); c.strokeStyle = '#a87a52'; c.lineWidth = 5; c.stroke();
      const HS = ehHouses(90 + i, 18, -100, 100, -30, 40, i === 2 ? [[-80, 40]] : []); HS.forEach((H) => ehHouse(c, { ...H, w: H.w * 0.42, h: H.h * 0.42 }, EH_RC_DUSK, 0));
      if (i < 2) { ehBlob(c, 10, -20, 18, 16, i ? '#5ab0e8' : '#f0f0f8', i ? '#3a80c0' : '#c8c0d8', { lw: 2 }); seg(c, -50, -10, -50, -60, 6, '#f6ead0', 1.5); }
      else { princessPalace(c, 10, 10, 0.17, {}); ehRiverTowers(c, -70, -48, 30, 46, 7, EH_RC_DUSK, {}); }
      c.restore(); });
    // haze toward the top (far)
    ehGrad(c, 0, 0, w, 220, [[0, 'rgba(255,214,200,0.85)'], [1, 'rgba(255,214,200,0)']]);
  }, 0.5);
}
// the land plate with its live parts (caravan, river glints, boats, waterwheel, town windows); px = plate x at the panel's left edge,
// y = panel y of the plate top; o: {lit: [k1, k2, k3] window light per town, caravan 0..1, glintDome 0..1}
function ehFarLand(ctx, px, y, t, o = {}) {
  const img = ehFarLandPlate(); ctx.save(); ctx.translate(-px, y); ctx.drawImage(img, 0, 0, EH_FAR.w, EH_FAR.h);
  const tc = EH_T2(t), R = K.rng(12);
  // caravan: seven dots and long shadows along a dune crest
  const cp = o.caravan ?? 0; for (let i = 0; i < 7; i++) { const u = K.clamp(0.15 + cp * 0.25 + i * 0.035), x = K.lerp(EH_FAR.crest[0][0], EH_FAR.crest[2][0], u), yy = 300 - Math.sin(u * Math.PI) * 30;
    ctx.fillStyle = 'rgba(110,70,140,0.5)'; ctx.fillRect(x - 22, yy + 2, 22, 3); ctx.fillStyle = i % 3 ? '#5a3a2a' : '#7a4a2a'; ctx.beginPath(); ctx.ellipse(x, yy - 4, 5, 4, 0, 0, 7); ctx.fill(); ctx.fillRect(x + 2, yy - 10, 2, 6); }
  // river glints run along the main channel (light, every frame)
  const rp = densify(EH_FAR.river, 10); for (let i = 0; i < 10; i++) { const u = ((t * 0.12 + i / 10) % 1), j = Math.floor(u * (rp.length - 1)); ehGlint(ctx, rp[j][0] + Math.sin(i) * 12, rp[j][1], 9, (t * 0.9 + i * 0.37) % 1); }
  // sail boats drift downstream
  for (let i = 0; i < 4; i++) { const u = ((0.2 + i * 0.23 + t * 0.012) % 1), j = Math.floor((1 - u) * (rp.length - 1)), [bx, by] = rp[j]; ctx.fillStyle = '#7a4a2a'; ctx.fillRect(bx - 8, by - 2, 16, 4); ctx.fillStyle = '#fff6ea'; ctx.beginPath(); ctx.moveTo(bx - 2, by - 3); ctx.lineTo(bx - 2, by - 18); ctx.lineTo(bx + 8, by - 4); ctx.closePath(); ctx.fill(); }
  // the waterwheel turning on twos
  const [wx, wy] = EH_FAR.wheel; ctx.save(); ctx.translate(wx, wy); ctx.rotate(tc * 1.6); ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 14, 0, 7); ctx.stroke(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 16, Math.sin(a) * 16); ctx.stroke(); } ctx.restore();
  // windows lighting in each town (seeded order)
  EH_FAR.towns.forEach(([tx, ty, s], i) => { const k = (o.lit || [])[i] || 0; if (k <= 0) return; const RR = K.rng(300 + i);
    for (let j = 0; j < 16; j++) { const x = tx + (RR() - 0.5) * 190 * s, yy = ty + (RR() - 0.6) * 70 * s; if (RR() > k) continue; ctx.fillStyle = '#ffe08a'; ctx.fillRect(x, yy, 4, 4); ehGlow(ctx, x + 2, yy + 2, 12, 0.5, '#ffd27a'); }
    if (k > 0.5 && i < 2) for (let j = 0; j < 2; j++) { const sx = tx - 40 + j * 60, sy = ty - 30, u = (t * 0.25 + j * 0.5) % 1; ctx.save(); ctx.globalAlpha = 0.4 * (1 - u); ctx.strokeStyle = '#e8e0f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + 10, sy - 30 * u, sx + 4 * Math.sin(t * 2 + j), sy - 60 * u); ctx.stroke(); ctx.restore(); } });
  if (o.glintDome > 0) { const [tx, ty] = EH_FAR.towns[2]; ehGlint(ctx, tx + 10 - 51 * 1.0, ty + 10 - 66, 34, o.glintDome); ehGlow(ctx, tx - 41, ty - 56, 80, Math.sin(Math.PI * o.glintDome) * 0.7, '#9ac0ff'); }
  ctx.restore();
}

// ---------- riverCity: exterior wide of the princess's city at dusk (plate 1400 x 1640, world y -100..1540) ----------
const EH_CITY = { w: 1400, top: -100, h: 1640, palace: [940, 820], dome: [640, 560], towers: [360, 470, 760], moon: [1150, 420],
  river: [[110, 1540], [250, 1250], [412, 960], [414, 790], [600, 700], [900, 664], [1260, 640]], horizon: 640 };
const EH_CITY_HOUSES = ehHouses(51, 46, 20, 1380, 690, 1320, [[180, 520, 760, 1540], [500, 1180, 380, 840], [330, 500, 400, 800], [60, 300, 1200, 1540]]);
function ehCityPlate() {
  return ehBakeAt('rivercity', EH_CITY.w, EH_CITY.h, (c, w, h) => { c.translate(0, -EH_CITY.top); const P = EH_RC_DUSK;
    ehGrad(c, 0, EH_CITY.top, w, 800, EH_SKY.dusk.map(([o, col]) => [o, col]));
    const R = K.rng(9); c.fillStyle = '#fff6ea'; for (let i = 0; i < 30; i++) { c.globalAlpha = 0.3 + R() * 0.5; c.fillRect(R() * w, EH_CITY.top + R() * 320, 2.5, 2.5); } c.globalAlpha = 1;
    for (const [x, y, s] of [[260, 120, 1.1], [820, 60, 0.9], [1200, 220, 0.8]]) ehCloud(c, x, y, 380 * s, 90 * s, EH_CLOUDC.dusk[0], EH_CLOUDC.dusk[1], 8, x);
    ehSoftHills(c, w, 650, 30, '#9a86c8', 4, 3, 760); ehSoftHills(c, w, 690, 22, '#b48ab8', 6, 2, 800);
    ehGrad(c, 0, 700, w, 840, [[0, '#d8a888'], [0.4, '#e0b490'], [1, '#c89a7a']]);   // land
    // the river: tapered with a gradient and a light edge
    const rp = densify(EH_CITY.river, 8); for (const [col, k] of [['#8a78c0', 1.15], ['#e8b8d8', 1], ['#fff0f4', 0.3]]) { c.save(); c.lineCap = 'round'; c.strokeStyle = col; for (let i = 0; i < rp.length - 1; i++) { c.lineWidth = K.lerp(260, 28, Math.pow(i / rp.length, 0.7)) * k; c.beginPath(); c.moveTo(rp[i][0], rp[i][1]); c.lineTo(rp[i + 1][0], rp[i + 1][1]); c.stroke(); } c.restore(); }
    // the rise under the palace, gardens, palms
    c.fillStyle = '#c0907a'; c.beginPath(); c.ellipse(860, 840, 430, 70, 0, Math.PI, 0); c.fill();
    EH_CITY_HOUSES.filter((H) => H.y < 840).forEach((H) => ehHouse(c, H, P, 0));
    for (const mx of [240, 1260]) { const top = 560; celShade(c, K.rectPts(mx - 16, top, 32, 300), P.trim, P.trimS, { off: 8, lw: 2.5, line: P.line }); celShade(c, K.rectPts(mx - 22, top + 90, 44, 10), P.rose, P.roseS, { off: 3, lw: 2, line: P.line }); ehBlueDome(c, mx, top, 22, P, { drum: 4 }); }
    ehRiverTowers(c, EH_CITY.towers[0], EH_CITY.towers[1], EH_CITY.towers[2], 300, 54, P, { lamps: false });
    princessPalace(c, EH_CITY.palace[0], EH_CITY.palace[1], 1, { lit: 0 });
    EH_CITY_HOUSES.filter((H) => H.y >= 840).forEach((H) => ehHouse(c, H, P, 0));
    for (let i = 0; i < 9; i++) { const x = 60 + R() * 1300, y = 900 + R() * 400; if (Math.abs(x - 330) < 160 && y > 900) continue; palmTree(c, x, y, { s: 0.16 + 0.1 * (y - 900) / 400, lean: -14 + R() * 28 }); }
    // washing lines
    c.strokeStyle = '#5a3a4a'; c.lineWidth = 2; for (const [x, y] of [[700, 1000], [1040, 1120], [560, 1240]]) { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 50, y + 12, x + 100, y); c.stroke(); ['#ff6a8a', '#5ab0e8', '#ffd36a'].forEach((col, k) => { c.fillStyle = col; c.fillRect(x + 20 + k * 26, y + 4, 14, 18); }); }
  }, 0.75);
}
// riverCity(ctx, t, o): o {lit 0..1 (the evening wave from the river), band 0..1 (light band up the palace wall), bridgeLamps}
function riverCity(ctx, t, o = {}) {
  ctx.drawImage(ehCityPlate(), 0, EH_CITY.top, EH_CITY.w, EH_CITY.h);
  const [mx, my] = EH_CITY.moon, tc = EH_T2(t);
  ehGlow(ctx, mx, my, 170, 0.6, '#ffe6b8'); celShade(ctx, ell(mx, my, 52, 52, 30), '#ffeab8', '#f0c890', { light: [-1, -1], off: 10, lw: 0 });
  // lit windows (the wave), boats with lamps, bridge lamps, smoke threads
  const lit = o.lit || 0; EH_CITY_HOUSES.forEach((H, i) => { const d = Math.hypot(H.x - 400, H.y - 900) / 1100, k = K.clamp((lit - d * 0.8) * 5); if (k <= 0) return;
    for (let j = 0; j < H.wins; j++) { const wx = H.x - H.w / 2 + H.w * (j + 1) / (H.wins + 1); ctx.fillStyle = ehMix('#5a3a6a', '#ffd27a', k); ctx.fillRect(wx - H.w * 0.06, H.y - H.h * 0.62, H.w * 0.12, H.h * 0.26); } if (i % 4 === 0) ehGlow(ctx, H.x, H.y - H.h * 0.5, 40, 0.35 * k); });
  const pk = K.clamp((lit - 0.75) * 4); if (pk > 0) { ctx.save(); ctx.globalAlpha = pk; princessPalaceWindows(ctx, EH_CITY.palace[0], EH_CITY.palace[1], 1); ctx.restore(); }
  const [t1, t2, tb] = EH_CITY.towers; for (let k = 1; k < 6; k++) { const lk = K.clamp((lit - 0.1) * 6 - k * 0.3); if (lk > 0) ehGlow(ctx, t1 + (t2 - t1) * k / 6, tb - 300 * 0.16 - 300 * 0.06, 26, lk * 0.8, '#ffe08a'); }
  const rp = densify(EH_CITY.river, 8); for (let i = 0; i < 3; i++) { const u = ((0.15 + i * 0.3 + t * 0.01) % 1), j = Math.floor(u * (rp.length - 1)), [bx, by] = rp[j], s = K.lerp(1.4, 0.4, j / rp.length);
    ctx.save(); ctx.translate(bx + 30 * s, by); ctx.scale(s, s); ctx.fillStyle = '#6a3a2a'; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(20, 10); ctx.lineTo(-20, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffe08a'; ctx.fillRect(-4, -14, 8, 10); ctx.restore(); if (lit > 0.2) ehGlow(ctx, bx + 30 * s, by - 8 * s, 40 * s, 0.6, '#ffd27a'); }
  for (let i = 0; i < 8; i++) { const u = ((t * 0.3 + i / 8) % 1), j = Math.floor(u * (rp.length - 1)); ehGlint(ctx, rp[j][0] + Math.sin(i * 3) * 30, rp[j][1], 8, (t * 0.7 + i * 0.29) % 1); }
  if (o.band > 0) { const [px, py] = EH_CITY.palace; ehBand(ctx, [px - 190, py - 280, 380, 300], o.band, { angle: Math.PI / 2 - 0.0001, w: 60, alpha: 0.6, col: '#fff2c0' }); }
}
function princessPalaceWindows(ctx, x, y, s) { for (let i = 0; i < 6; i++) { const wx = x + (-160 + i * 60) * s; ctx.fillStyle = '#ffd27a'; K.poly(ctx, townArchPts(wx, wx + 22 * s, y - 220 * s, y - 176 * s, 'pointed', 6), true); ctx.fill(); ehGlow(ctx, wx + 11 * s, y - 198 * s, 40 * s, 0.4); } }

// ---------- the city sky for the roof and the garden: world x -500..2100, y -760..900 ----------
function ehCitySkyPlate(night) {
  return ehBakeAt('citysky:' + (night ? 'n' : 'd'), 2600, 1660, (c, w, h) => { c.translate(500, 760);
    ehGrad(c, -500, -760, w, h, night ? [[0, '#2e46a8'], [0.4, '#4a62c8'], [0.72, '#6a7ade'], [0.88, '#b49ad8'], [1, '#ffc8a0']] : [[0, '#4a6ad8'], [0.4, '#7a86e0'], [0.68, '#c890d0'], [0.86, '#ffb0a8'], [1, '#ffc090']]);
    const R = K.rng(night ? 17 : 19); c.fillStyle = '#fff6ea'; for (let i = 0; i < (night ? 110 : 30); i++) { const x = -500 + R() * w, y = -760 + R() * 1000; c.globalAlpha = 0.35 + R() * 0.6; const r = R() < 0.15 ? 3 : 1.8; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); } c.globalAlpha = 1;
    const [cb, cu] = night ? EH_CLOUDC.night : EH_CLOUDC.dusk; for (const [x, y, s] of [[-200, -380, 1.3], [380, -560, 1.0], [1300, -420, 1.2], [1800, -120, 0.9], [200, 80, 0.8], [1100, 160, 0.7]]) { c.save(); c.globalAlpha = night ? 0.55 : 0.8; ehCloud(c, x, y, 520 * s, 110 * s, cb, cu, 10, x + 3); c.restore(); }
    ehSoftHills(c, 2600, 760, 40, night ? '#7a78c8' : '#a886c0', 3, 4, 900); }, 0.35);
}
function ehMoon(ctx, x, y, r, t, k = 1) { ehGlow(ctx, x, y, r * 3.4, 0.55 * k, '#ffe6b8'); ehGlow(ctx, x, y, r * 1.7, 0.4 * k, '#fff2d0');
  celShade(ctx, ell(x, y, r, r, 40), '#ffeab8', '#f2cf98', { light: [-1, -1], off: r * 0.16, lw: 0 }); ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#e8c890'; for (const [dx, dy, rr] of [[-0.3, -0.2, 0.18], [0.25, 0.15, 0.22], [0.05, -0.4, 0.1]]) { ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, rr * r, 0, 7); ctx.fill(); } ctx.restore(); }

// ---------- palaceRoof: the roof terrace (strip 1600 wide, floor y 900, parapet top 790, sky to y -700) ----------
const EH_ROOF = { w: 1600, top: -700, star: 640, post: 800, ring: [800, 852], jar: 1060, hook: [1096, 800], catSpot: [880, 790], parapet: 790, back: 850,
  door: { x0: 1330, x1: 1450, top: 660, bottom: 882 }, win: [1345, 546, 80, 80], pav: [1250, 1520, 520, 882], dome: [330, 760, 240], towers: [1000, 1120, 760], moon: [880, 200, 110],
  river: [[880, 742], [1000, 738], [1120, 736], [1300, 734], [1500, 732]], lanterns: [[560, 724], [1238, 700]], carpets: [150, 380, 640], trees: [300, 1180], tray: 455 };
// floor perspective: back edge y 850, vanishing point (800, 300)
const ehFloorX = (xb, y) => 800 + (xb - 800) * (y - 300) / (EH_ROOF.back - 300);
function ehRoofFarPlate(night) {   // world x -300..1900, y 420..880 (parallax 0.45)
  return ehBakeAt('rooffar:' + (night ? 'n' : 'd'), 2200, 460, (c, w, h) => { c.translate(300, -420); const P = ehRCP(night);
    ehSoftHills(c, 1900, 700, 26, night ? '#8a86d0' : '#b490c0', 8, 2, 760);
    const back = ehHouses(61, 34, -280, 1880, 640, 712, [[960, 1160]]); back.forEach((H) => ehHouse(c, { ...H, w: H.w * 0.7, h: H.h * 0.7 }, P, night ? 1 : 0.3));
    for (const mx of [200, 1560]) { celShade(c, K.rectPts(mx - 12, 540, 24, 170), P.trim, P.trimS, { off: 6, lw: 2, line: P.line }); ehBlueDome(c, mx, 540, 16, P, { drum: 3 }); }
    for (let i = 0; i < 8; i++) palmTree(c, -200 + i * 270 + (i % 2) * 60, 715, { s: 0.2, lean: -10 + (i % 3) * 10 });
    ehGrad(c, -300, 712, 2200, 56, night ? [[0, '#6a7ad8'], [0.5, '#8a96e8'], [1, '#5a6ac8']] : [[0, '#c8a0d8'], [0.5, '#f0c0d8'], [1, '#b890c8']]);   // the river
    c.strokeStyle = night ? '#b8c8f8' : '#ffe0ec'; c.lineWidth = 2; for (let i = 0; i < 30; i++) { const x = -300 + i * 75, y = 722 + (i % 4) * 11; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 26, y); c.stroke(); }
    ehRiverTowers(c, EH_ROOF.towers[0], EH_ROOF.towers[1], EH_ROOF.towers[2], 220, 46, P, { lamps: night });
    const near = ehHouses(62, 30, -280, 1880, 790, 870, [[900, 1220, 700, 900]]); near.forEach((H) => ehHouse(c, H, P, night ? 1 : 0.4)); }, 0.7);
}
function ehRoofDomePlate(night) {   // world x 40..620, y 380..860 (parallax 0.8): the great blue dome behind the parapet
  return ehBakeAt('roofdome:' + (night ? 'n' : 'd'), 580, 480, (c) => { c.translate(-40, -380); const P = ehRCP(night);
    celShade(c, K.rectPts(60, 800, 540, 60), P.rose, P.roseS, { off: 10, lw: 3, line: P.line });
    ehBlueDome(c, EH_ROOF.dome[0], 760, 200, P, { drum: 50 }); }, 0.8);
}
function ehRoofTerracePlate(night) {   // world x 0..1600, y 420..1230 (moves with the floor)
  return ehBakeAt('roofterr:' + (night ? 'n' : 'd'), 1600, 810, (c) => { c.translate(0, -420); const P = ehRCP(night), B = EH_ROOF.back;
    // parapet wall and crenels
    celShade(c, K.rectPts(-10, EH_ROOF.parapet, 1620, B - EH_ROOF.parapet + 4), P.rose, P.roseS, { light: [-1, -1], off: 8, hi: P.roseL, lw: 3, line: P.line });
    for (let x = 30; x < 1600; x += 60) celShade(c, K.rectPts(x, EH_ROOF.parapet + 20, 24, 22), P.trim, P.trimS, { off: 3, lw: 1.5, line: P.line });   // lattice holes
    celShade(c, K.rectPts(-10, EH_ROOF.parapet - 8, 1620, 12), P.trim, P.trimS, { off: 3, lw: 2.5, line: P.line });
    ehCrenels(c, 0, 1600, EH_ROOF.parapet - 8, 30, 120, 60, P);
    // floor: perspective checker with a terracotta border
    const rows = [B, 868, 890, 916, 948, 988, 1036, 1094, 1162, 1240], cols = Array.from({ length: 23 }, (_, i) => -300 + i * 100);
    for (let r = 0; r < rows.length - 1; r++) for (let k = 0; k < cols.length - 1; k++) { const y0 = rows[r], y1 = rows[r + 1];
      c.fillStyle = (r + k) % 2 ? P.floorA : P.floorB; c.beginPath(); c.moveTo(ehFloorX(cols[k], y0), y0); c.lineTo(ehFloorX(cols[k + 1], y0), y0); c.lineTo(ehFloorX(cols[k + 1], y1), y1); c.lineTo(ehFloorX(cols[k], y1), y1); c.closePath(); c.fill(); }
    c.strokeStyle = ehMix(P.floorB, P.line, 0.35); c.lineWidth = 1.5; for (const y of rows) { c.beginPath(); c.moveTo(0, y); c.lineTo(1600, y); c.stroke(); } for (const x of cols) { c.beginPath(); c.moveTo(ehFloorX(x, B), B); c.lineTo(ehFloorX(x, 1240), 1240); c.stroke(); }
    c.fillStyle = P.border; c.fillRect(0, B, 1600, 10); c.fillStyle = ehDark(P.border, 0.3); c.fillRect(0, B + 10, 1600, 3);
    // the eight-point star tile (the horse's spot), flattened
    c.save(); c.translate(EH_ROOF.star, 902); c.scale(1, 0.32); const st = []; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? 70 : 120; st.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    celShade(c, st, P.gold, P.goldS, { off: 14, lw: 3, line: P.line }); celShade(c, ell(0, 0, 44, 44, 16), P.dome, P.domeS, { off: 8, lw: 2.5, line: P.line }); c.restore();
    // pavilion (door and window are live), its small dome, a lantern bracket
    const [p0, p1, pt, pb] = EH_ROOF.pav; celShade(c, K.rectPts(p0, pt, p1 - p0, pb - pt), P.rose, P.roseS, { light: [-1, -1], off: 26, hi: P.roseL, lw: 3.5, line: P.line });
    celShade(c, K.rectPts(p0 - 8, pt - 10, p1 - p0 + 16, 16), P.trim, P.trimS, { off: 4, lw: 2.5, line: P.line }); ehCrenels(c, p0 - 6, p1 + 6, pt - 10, 18, 40, 22, P);
    ehBlueDome(c, (p0 + p1) / 2, pt - 28, 70, P, { drum: 18 });
    celShade(c, townArchPts(EH_ROOF.door.x0 - 16, EH_ROOF.door.x1 + 16, EH_ROOF.door.top - 18, EH_ROOF.door.bottom, 'pointed', 12), P.trim, P.trimS, { off: 6, lw: 3, line: P.line });
    celShade(c, townArchPts(EH_ROOF.win[0] - 10, EH_ROOF.win[0] + EH_ROOF.win[2] + 10, EH_ROOF.win[1] - 12, EH_ROOF.win[1] + EH_ROOF.win[3] + 8, 'pointed', 10), P.trim, P.trimS, { off: 5, lw: 2.5, line: P.line });
    celShade(c, K.rectPts(1460, 620, 50, 50), ehMix(P.rose, '#ffffff', 0.25), P.roseS, { off: 6, lw: 2, line: P.line });   // tile panel
    // carpet line poles, tree pots with orange trees, the tether post, the jar stand, cushions and a tray table
    for (const x of [EH_ROOF.carpets[0], EH_ROOF.carpets[1]]) { seg(c, x, 864, x, EH_ROOF.carpets[2] - 10, 7, '#8a5a3a', 2); ehBlob(c, x, EH_ROOF.carpets[2] - 12, 7, 7, P.gold, P.goldS, { lw: 1.5 }); }
    for (const x of EH_ROOF.trees) { const b = 872; for (let i = 0; i < 9; i++) { const a = i * 0.7, rr = 64 + (i % 3) * 14; ehBlob(c, x + Math.cos(a) * 52, b - 170 + Math.sin(a) * 46, rr * 0.6, rr * 0.55, '#3fae6a', '#23704a', { lw: 2 }); }
      seg(c, x, b - 60, x, b - 130, 10, '#8a5a3a', 2.5); for (let i = 0; i < 9; i++) { const R = K.rng(x + i); ehBlob(c, x - 70 + R() * 140, b - 230 + R() * 100, 9, 9, '#ff9a2a', '#d0661a', { lw: 1.5 }); }
      celShade(c, [[x - 44, b - 70], [x + 44, b - 70], [x + 34, b], [x - 34, b]], '#d8845a', '#a85a3a', { off: 10, lw: 3, line: '#5a2a1a' }); celShade(c, K.rectPts(x - 48, b - 76, 96, 12), '#e8a070', '#a85a3a', { off: 3, lw: 2.5, line: '#5a2a1a' }); }
    const [rx, ry] = EH_ROOF.ring; celShade(c, [[rx - 20, 906], [rx - 16, 836], [rx - 8, 828], [rx + 8, 828], [rx + 16, 836], [rx + 20, 906]], '#c8bcd8', '#8a7ea8', { off: 8, hi: '#ece6f6', lw: 3, line: '#4a3a5a' });
    c.save(); c.strokeStyle = P.goldS; c.lineWidth = 5; c.beginPath(); c.ellipse(rx, ry, 10, 8, 0, 0, 7); c.stroke(); c.strokeStyle = P.gold; c.lineWidth = 2.5; c.stroke(); c.restore();
    const jx = EH_ROOF.jar; for (const dx of [-24, 0, 24]) seg(c, jx + dx * 0.5, 846, jx + dx, 908, 5, '#8a5a3a', 2); ehBlob(c, jx, 846, 30, 6, '#8a5a3a', '#5a3420', { lw: 2 });
    celShade(c, [[jx - 18, 846], [jx - 40, 806], [jx - 36, 774], [jx - 14, 760], [jx - 12, 750], [jx + 12, 750], [jx + 14, 760], [jx + 36, 774], [jx + 40, 806], [jx + 18, 846]], '#d8845a', '#a85a3a', { off: 12, hi: '#f8b890', lw: 3, line: '#5a2a1a' });
    c.fillStyle = '#a85a3a'; c.fillRect(jx - 38, 784, 76, 6); seg(c, jx + 34, 788, EH_ROOF.hook[0], EH_ROOF.hook[1] - 14, 3, '#6a4a3a', 1);
    for (const [x, col] of [[400, '#e8364f'], [455, '#3f7ad0'], [510, '#f2a71b']]) ehBlob(c, x, 878, 30, 12, col, ehDark(col, 0.3), { lw: 2 });
    celShade(c, ell(EH_ROOF.tray, 862, 40, 9, 18), P.gold, P.goldS, { off: 4, lw: 2, line: '#6a4a10' }); seg(c, EH_ROOF.tray, 868, EH_ROOF.tray, 884, 5, '#8a5a3a', 1.5);
    ehBlob(c, EH_ROOF.tray - 14, 856, 8, 7, '#ff9a2a', '#d0661a', { lw: 1.5 }); ehBlob(c, EH_ROOF.tray + 10, 855, 9, 9, '#e8e0f0', '#b8b0c8', { lw: 1.5 });
    for (const [lx, ly] of EH_ROOF.lanterns) { seg(c, lx, EH_ROOF.parapet - 30, lx, ly - 40, 4, '#4a3a5a', 1); seg(c, lx - 18, EH_ROOF.parapet - 30, lx + 4, EH_ROOF.parapet - 30, 4, '#4a3a5a', 1); }
  }, 1);
}
// the live roof: sky (parallax), moon, far city, moon path, dome, terrace plate, then carpets, lanterns, door, window and the cup.
// o: {night 0..1, moon [x, y, r], door 0..1, doorLine 0..1, doorGlow 0..1 (torch), win 0..1 lit, winInside(c), lanterns 0..1, path k,
//     towerFlash [k1, k2], domeHi u 0..1 (bright highlight slides), cup (bool: cup on the hook), wind}
function palaceRoof(ctx, t, cam, o = {}) {
  const n = K.clamp(o.night ?? 1), tc = EH_T2(t), t3 = EH_T3(t), dx = (f) => (cam.x - 800) * (1 - f);
  const two = (img, x, y, w, h, f) => { if (n < 1) ehImg(ctx, img(false), x + dx(f), y, w, h); if (n > 0) ehImg(ctx, img(true), x + dx(f), y, w, h, n); };
  two(ehCitySkyPlate, -500, -760, 2600, 1660, 0.15);
  const [mx, my, mr] = o.moon || EH_ROOF.moon; ehMoon(ctx, mx + dx(0.15), my, mr, t, 0.6 + 0.4 * n);
  ctx.fillStyle = n > 0.5 ? '#8a86d0' : '#b490c0'; ctx.fillRect(-600, 880, 2800, 400);
  two(ehRoofFarPlate, -300, 420, 2200, 460, 0.45);
  ctx.save(); ctx.translate(dx(0.45), 0);
  const fl = o.towerFlash || [0, 0]; EH_ROOF.towers.slice(0, 2).forEach((tx, i) => { if (fl[i] > 0) { ehGlow(ctx, tx, 650, 160, fl[i], '#ffe9a8'); ehBand(ctx, [tx - 40, 480, 80, 290], 0.5, { angle: 0, w: 60, alpha: 0.5 * fl[i], col: '#fff2c0' }); } });
  moonPath(ctx, EH_ROOF.river, t, o.path || 0, { seed: 7, scatter: 90, w: 3, w1: 8, a: 0.4 + 0.6 * n });
  ctx.restore();
  two(ehRoofDomePlate, 40, 380, 580, 480, 0.8);
  if (o.domeHi > 0 && o.domeHi < 1) { const [cx, base, r] = [EH_ROOF.dome[0] + dx(0.8), 760, 200]; ctx.save(); ctx.beginPath(); ctx.ellipse(cx, base - r * 0.5, r * 0.98, r * 0.86, 0, Math.PI, 0); ctx.closePath(); ctx.clip();
    ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(220,235,255,0.75)'; const hx = cx + K.lerp(r * 0.8, -r * 0.8, o.domeHi); ctx.beginPath(); ctx.ellipse(hx, base - r * 0.7, r * 0.16, r * 0.5, 0.3, 0, 7); ctx.fill(); ctx.restore();
    ehGlint(ctx, cx, base - r * 1.32 - 70, 40, o.domeHi); }
  two(ehRoofTerracePlate, 0, 420, 1600, 810, 1);
  // carpets on the line (ribbons swaying out of step)
  const [c0, c1, cy] = EH_ROOF.carpets; ctx.save(); ctx.strokeStyle = '#5a3a4a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(c0, cy - 10); ctx.quadraticCurveTo((c0 + c1) / 2, cy + 10, c1, cy - 10); ctx.stroke(); ctx.restore();
  [['#f07a2a', '#fff0d8'], ['#3f7ad0', '#ffd36a'], ['#3fae6a', '#e8364f']].forEach(([a, b], i) => { const x = c0 + 30 + i * 66, sw = 6 * Math.sin(tc * 1.7 + i * 1.9) + (o.wind || 0) * 20, pts = [[x, cy], [x + 54, cy + 2], [x + 54 + sw, cy + 160], [x + sw * 0.9, cy + 158]];
    celShade(ctx, pts, a, ehDark(a, 0.3), { off: 8, lw: 2.5, line: ehDark(a, 0.6) }); for (let k = 1; k < 4; k++) { const v = k / 4; seg(ctx, x + sw * v, cy + 160 * v, x + 54 + sw * v, cy + 2 + 158 * v, 5, b, 0); } });
  // lanterns (flames on threes) and their glow
  for (const [lx, ly] of EH_ROOF.lanterns) ehLantern(ctx, lx, ly, t3, o.lanterns ?? 1);
  // the pavilion door and window
  const D = EH_ROOF.door; townDoor(ctx, D.x0, D.x1, D.top, D.bottom, o.door || 0, { arch: 'pointed', hinge: 'right', dark: '#2a1a3a', paint: '#a8552a', inside: (c) => { if (o.door > 0) { ehGlow(c, (D.x0 + D.x1) / 2, D.bottom - 60, 180, 0.8 * o.door, '#ffd27a'); } if (o.doorGlow > 0) { ehGlow(c, (D.x0 + D.x1) / 2, D.bottom - 40, 160, o.doorGlow, '#ff9a3a'); if (o.inside) o.inside(c); } } });
  if (o.doorLine > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = K.rgba('#ffd27a', 0.9 * o.doorLine); ctx.fillRect(D.x0 + 4, D.bottom - 4, D.x1 - D.x0 - 8, 5); ctx.restore(); ehGlow(ctx, (D.x0 + D.x1) / 2, D.bottom, 90 * o.doorLine, 0.6 * o.doorLine, '#ffd27a'); }
  const [wx, wy, ww, wh] = EH_ROOF.win; townWindow(ctx, wx, wy, ww, wh, { arch: 'pointed', lit: o.win || 0, inside: o.winInside, noShutters: true });
  if (o.win > 0) ehGlow(ctx, wx + ww / 2, wy + wh / 2, 120, 0.5 * o.win, '#ffd27a');
  if (o.cup !== false) ehCup(ctx, EH_ROOF.hook[0], EH_ROOF.hook[1], 1, 0);
}
// the front pass: the door leaf over anyone in the doorway, two near pots in the lower corners
function palaceRoofFront(ctx, t, o = {}) {
  const D = EH_ROOF.door; if ((o.door || 0) > 0) townDoor(ctx, D.x0, D.x1, D.top, D.bottom, o.door, { arch: 'pointed', hinge: 'right', leafOnly: true, paint: '#a8552a' });
  ctx.drawImage(ehRoofPotSprite(), -60, 1000, 300, 300); ctx.drawImage(ehRoofPotSprite(), 1400, 1010, 300, 300);
}
function ehRoofPotSprite() { return ehBakeAt('roofpot', 300, 300, (c) => { for (let i = 0; i < 8; i++) { const a = -Math.PI + i * 0.42; ehBlob(c, 150 + Math.cos(a) * 90, 150 + Math.sin(a) * 60, 50, 36, i % 2 ? '#3fae6a' : '#5ac07a', '#23704a', { lw: 2.5 }); }
  for (let i = 0; i < 6; i++) ehFlower(c, 70 + i * 32, 170 - (i % 2) * 30, 36, ['#ff6a8a', '#fff6ea', '#ffd36a'][i % 3]); celShade(c, [[60, 190], [240, 190], [220, 300], [80, 300]], '#d8845a', '#a85a3a', { off: 18, lw: 3.5, line: '#5a2a1a' }); }, 0.8); }
function ehLantern(ctx, x, y, t3, lit = 1) {
  seg(ctx, x, y - 40, x, y - 30, 3, '#4a3a5a', 1);
  if (lit > 0) { ehGlow(ctx, x, y, 110, 0.65 * lit, '#ffd27a'); }
  celShade(ctx, [[x - 16, y - 30], [x + 16, y - 30], [x + 20, y + 20], [x - 20, y + 20]], lit > 0 ? ehMix('#a87a1c', '#ffe08a', lit) : '#a87a1c', '#a87a1c', { off: 5, lw: 2.5, line: '#6a4a10' });
  if (lit > 0) { const f = 1 + 0.15 * Math.sin(t3 * 23); shape(ctx, [[x - 5, y + 10], [x, y - 12 * f], [x + 5, y + 10]], '#fff6c0', { lw: 0 }); }
  celShade(ctx, [[x - 22, y + 20], [x + 22, y + 20], [x, y + 34]], '#e0b038', '#a87a1c', { off: 3, lw: 2, line: '#6a4a10' });
}

// ---------- princessGarden: the moonlit garden (strip 1600 wide, ground y 900, sky to y -700) ----------
const EH_PGARDEN = { w: 1600, top: -700, arch: [60, 220, 620], wallTop: 380, horseX: 300, dome: [330, 330, 150], fountain: [620, 862], bench: { x: 900, seatY: 852, w: 260 },
  poles: [560, 1060], hook: [580, 700], hedgeY: 740, gate: [1380, 1500, 620], towers: [1150, 1290, 760], moon: [1000, 150, 95], trees: [770, 1200], jasmine: 470,
  river: [[860, 742], [1000, 738], [1150, 735], [1290, 733], [1500, 730]] };
function ehGardenFarP(night = true) {   // world x -300..1900, y 300..820: river, bridge, towers, far city, hills (parallax 0.5)
  return ehBakeAt('pgfar', 2200, 520, (c) => { c.translate(300, -300); const P = EH_RC_NIGHT;
    ehSoftHills(c, 1900, 690, 30, '#8a86d0', 12, 2, 760);
    const HS = ehHouses(71, 30, -280, 1880, 660, 705, [[1100, 1340]]); HS.forEach((H) => ehHouse(c, { ...H, w: H.w * 0.6, h: H.h * 0.6 }, P, 1));
    ehGrad(c, -300, 705, 2200, 60, [[0, '#6a7ad8'], [0.5, '#8a96e8'], [1, '#5a6ac8']]);
    c.strokeStyle = '#b8c8f8'; c.lineWidth = 2; for (let i = 0; i < 30; i++) { const x = -300 + i * 75, y = 714 + (i % 4) * 12; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 26, y); c.stroke(); }
    ehRiverTowers(c, EH_PGARDEN.towers[0], EH_PGARDEN.towers[1], EH_PGARDEN.towers[2], 300, 64, P, { lamps: true });
    ehGrad(c, -300, 765, 2200, 60, [[0, '#4a7a8a'], [1, '#3a6a6a']]); }, 0.7);
}
function ehGardenGroundP() {   // world x 0..1600, y 120..1230: dome behind the wall, palace wall with the stair arch, hedge with the gate, lawn
  return ehBakeAt('pgground', 1600, 1110, (c) => { c.translate(0, -120); const P = EH_RC_NIGHT, G = EH_PGARDEN;
    ehBlueDome(c, G.dome[0], G.dome[1], G.dome[2], P, { drum: 46 });
    // the hedge (back), leaving the gate open
    const hy = G.hedgeY, [g0, g1, gt] = G.gate;
    for (const [a, b] of [[440, g0], [g1, 1620]]) { celShade(c, [[a, hy + 80], [a, hy + 6], ...Array.from({ length: Math.ceil((b - a) / 40) + 1 }, (_, i) => [Math.min(b, a + i * 40), hy - 6 * Math.sin(i * 1.3)]), [b, hy + 80]], '#3f9a6a', '#23704a', { light: [-1, -1], off: 16, hi: '#6ac08a', lw: 3, line: '#174a30' }); }
    c.fillStyle = '#3a8a5a'; c.fillRect(440, hy + 60, 1180, 30);
    // the gate: trellis arch with jasmine
    const tp = townArchPts(g0 - 10, g1 + 10, gt, hy + 70, 'round', 12); c.save(); c.strokeStyle = '#e8e0f0'; c.lineWidth = 9; c.lineJoin = 'round'; K.poly(c, tp.slice(1, -1)); c.stroke(); c.strokeStyle = '#8a7aa8'; c.lineWidth = 3; c.stroke(); c.restore();
    for (let i = 0; i < 14; i++) { const p = tp[1 + Math.floor(i / 14 * (tp.length - 2))]; ehBlob(c, p[0], p[1], 9, 7, '#4aa86a', '#23704a', { lw: 1.5 }); if (i % 2) ehBlob(c, p[0] + 5, p[1] - 4, 4, 4, '#fff6ea', '#d8d0e0', { lw: 1 }); }
    // lawn and path (perspective-ish), flower beds, stones
    ehGrad(c, 440, hy + 80, 1160, 1230 - hy - 80, [[0, '#4a9a6a'], [1, '#5ab07a']]); ehGrad(c, 0, 820, 440, 410, [[0, '#4a9a6a'], [1, '#5ab07a']]);
    c.fillStyle = '#e8d8e8'; c.beginPath(); c.moveTo(150, 905); c.lineTo(1440, 830); c.lineTo(1460, 850); c.lineTo(300, 1230); c.lineTo(80, 1230); c.closePath(); c.fill();
    c.strokeStyle = '#c8b0d0'; c.lineWidth = 2; for (let i = 0; i < 16; i++) { const u = i / 16; c.beginPath(); c.moveTo(K.lerp(150, 1440, u), K.lerp(905, 830, u)); c.lineTo(K.lerp(80, 300, u * 0.3), 1230); c.stroke(); }
    ehDress(c, 450, 1580, 860, 1220, 23, { stones: 8, tufts: 16, flowers: 26, cols: ['#ff6a8a', '#fff6ea', '#ffd36a', '#c8a0ff', '#ff9a5a'], skip: [[540, 700, 820, 900], [760, 1040, 830, 910], [120, 340, 880, 1230]] });
    // the palace wall with the stair arch, wall top parapet (the roof edge)
    celShade(c, K.rectPts(-10, G.wallTop, 450, 920 - G.wallTop), P.rose, P.roseS, { light: [-1, -1], off: 24, hi: P.roseL, lw: 3.5, line: P.line });
    celShade(c, K.rectPts(-10, G.wallTop - 8, 460, 14), P.trim, P.trimS, { off: 4, lw: 2.5, line: P.line }); ehCrenels(c, 0, 450, G.wallTop - 8, 24, 60, 30, P);
    const [a0, a1, at] = G.arch, ap = townArchPts(a0, a1, at, 905, 'pointed', 12);
    celShade(c, townArchPts(a0 - 16, a1 + 16, at - 18, 905, 'pointed', 12), P.trim, P.trimS, { off: 6, lw: 3, line: P.line });
    c.save(); K.poly(c, ap, true); c.fillStyle = '#3a2a5a'; c.fill(); c.clip(); for (let i = 0; i < 9; i++) { const y = 905 - i * 30, x = a0 + i * 12; c.fillStyle = i % 2 ? '#8a6a9a' : '#7a5a8a'; c.fillRect(x, y - 30, a1 - a0, 30); c.fillStyle = '#b090c0'; c.fillRect(x, y - 30, a1 - a0, 5); } ehGlow(c, (a0 + a1) / 2, at + 60, 120, 0.6, '#ffd27a'); c.restore(); ink(c, ap.slice(1, -1), 5, 3, P.line);
    for (const wx of [290, 380]) { shape(c, townArchPts(wx - 22, wx + 22, 520, 600, 'pointed', 8), '#ffd27a', { lw: 2.5 }); }
    // fountain basin (octagonal, tiled), bench, lantern poles, orange trees, the jasmine arch
    const [fx, fr] = G.fountain; const oct = (rx, ry, y) => Array.from({ length: 8 }, (_, i) => { const a = (i + 0.5) * Math.PI / 4; return [fx + Math.cos(a) * rx, y + Math.sin(a) * ry]; });
    celShade(c, [...oct(92, 22, fr).filter((p) => p[1] >= fr - 1), [fx - 92, fr + 30], [fx + 92, fr + 30]].sort((a, b) => a[0] - b[0]), '#5ab0d8', '#3a80b0', { off: 6, lw: 0 });
    celShade(c, [[fx - 92, fr], [fx + 92, fr], [fx + 92, fr + 34], [fx - 92, fr + 34]], P.trim, P.trimS, { off: 8, lw: 3, line: P.line });
    for (let k = 0; k < 6; k++) celShade(c, K.rectPts(fx - 88 + k * 30, fr + 8, 22, 20), k % 2 ? '#3a74ea' : '#2fb8b0', '#2450b8', { off: 3, lw: 1.5, line: P.line });
    celShade(c, oct(92, 22, fr), '#7ac8f0', '#5ab0d8', { off: 6, lw: 3, line: P.line }); celShade(c, oct(70, 15, fr - 2), '#8ad8f8', '#6ac0e8', { off: 4, lw: 0 });
    celShade(c, K.rectPts(fx - 10, fr - 100, 20, 96), P.trim, P.trimS, { off: 5, lw: 2.5, line: P.line }); ehBlob(c, fx, fr - 104, 30, 10, P.trim, P.trimS, { lw: 2.5 });
    const B = G.bench; celShade(c, K.rectPts(B.x - B.w / 2, B.seatY - 4, B.w, 16), '#d8d0e8', '#a8a0c0', { off: 5, hi: '#f4f0fa', lw: 3, line: '#4a3a5a' });
    for (const dx of [-100, 100]) celShade(c, K.rectPts(B.x + dx - 14, B.seatY + 12, 28, 900 - B.seatY - 10), '#c8c0d8', '#9890b0', { off: 5, lw: 2.5, line: '#4a3a5a' });
    for (const px of G.poles) { seg(c, px, 900, px, 650, 7, '#4a3a5a', 2); seg(c, px, 690, px + 30, 690, 4, '#4a3a5a', 1.5); }
    for (const x of G.trees) { const b = 905; seg(c, x, b, x, b - 150, 14, '#8a5a3a', 3); for (let i = 0; i < 10; i++) { const a = i * 0.63, rr = 70 + (i % 3) * 16; ehBlob(c, x + Math.cos(a) * 66, b - 260 + Math.sin(a) * 56, rr * 0.6, rr * 0.55, '#3fae6a', '#23704a', { lw: 2 }); }
      for (let i = 0; i < 10; i++) { const R = K.rng(x + i * 3); ehBlob(c, x - 90 + R() * 180, b - 330 + R() * 130, 10, 10, '#ff9a2a', '#d0661a', { lw: 1.5 }); } }
    const jx = G.jasmine; c.save(); c.strokeStyle = '#e8e0f0'; c.lineWidth = 8; c.beginPath(); c.moveTo(jx - 50, 905); c.lineTo(jx - 50, 700); c.quadraticCurveTo(jx, 640, jx + 50, 700); c.lineTo(jx + 50, 905); c.stroke(); c.restore();
    for (let i = 0; i < 16; i++) { const R = K.rng(400 + i), u = i / 15, p = u < 0.35 ? [jx - 50, K.lerp(900, 700, u / 0.35)] : u < 0.65 ? [K.lerp(jx - 50, jx + 50, (u - 0.35) / 0.3), 690 - Math.sin((u - 0.35) / 0.3 * Math.PI) * 40] : [jx + 50, K.lerp(700, 900, (u - 0.65) / 0.35)];
      ehBlob(c, p[0] + (R() - 0.5) * 16, p[1], 14, 11, '#4aa86a', '#23704a', { lw: 1.5 }); ehBlob(c, p[0] + (R() - 0.5) * 20, p[1] - 6, 5, 5, '#fff6ea', '#d8d0e0', { lw: 1 }); }
  }, 1);
}
function ehGardenFrontSprite() { return ehBakeAt('pgfront', 360, 260, (c) => { for (let i = 0; i < 9; i++) { const a = -Math.PI + i * 0.36; ehBlob(c, 180 + Math.cos(a) * 130, 200 + Math.sin(a) * 80, 56, 40, i % 2 ? '#3a9a5a' : '#4ab06a', '#1f6a40', { lw: 2.5 }); }
  for (let i = 0; i < 9; i++) ehBlob(c, 70 + i * 26, 150 + (i % 3) * 22, 12, 11, ['#ff5a7a', '#fff6ea', '#ff8aa8'][i % 3], ehDark(['#ff5a7a', '#fff6ea', '#ff8aa8'][i % 3], 0.25), { lw: 1.5 }); }, 0.8); }
// princessGarden(ctx, t, cam, o): o {path k (moon path), lamp [x, y] hung lamp or null, guards(ctx) drawn behind the hedge}
function princessGarden(ctx, t, cam, o = {}) {
  const tc = EH_T2(t), t3 = EH_T3(t), dx = (f) => (cam.x - 800) * (1 - f), G = EH_PGARDEN;
  ehImg(ctx, ehCitySkyPlate(true), -500 + dx(0.15), -760, 2600, 1660);
  const [mx, my, mr] = G.moon; ehMoon(ctx, mx + dx(0.15), my, mr, t);
  const cu = ((t * 6) % 1600) - 300; ctx.save(); ctx.globalAlpha = 0.5; ctx.drawImage(ehCloudSprite(3, 'high'), cu + dx(0.15), my - 30, 420, 120); ctx.restore();   // a cloud crossing the moon
  ctx.fillStyle = '#7a78c8'; ctx.fillRect(-600, 760, 2800, 600);
  ehImg(ctx, ehGardenFarP(), -300 + dx(0.5), 300, 2200, 520);
  ctx.save(); ctx.translate(dx(0.5), 0); moonPath(ctx, G.river, t, o.path || 0, { seed: 5, scatter: 110, w: 3, w1: 10 }); for (let i = 0; i < 3; i++) { const bx = ((200 + i * 600 + t * 14) % 2000) - 200; ctx.fillStyle = '#4a2a3a'; ctx.fillRect(bx - 18, 748, 36, 6); ehGlow(ctx, bx, 742, 30, 0.6); } ctx.restore();
  if (o.guards) o.guards(ctx);
  ctx.drawImage(ehGardenGroundP(), 0, 120, 1600, 1110);
  // the ebony horse standing small on the roof against the dome (never moves)
  ebonyHorse(ctx, { x: G.horseX, y: G.wallTop - 8, s: 0.45, dir: 1 });
  // live: fountain jet on threes, lantern flames, fireflies, petals, river glints
  const [fx, fr] = G.fountain, jh = 112 + 10 * Math.sin(t3 * 17); ctx.save(); ctx.strokeStyle = '#dff6ff'; ctx.lineCap = 'round';
  for (const sd of [-1, 0, 1]) { ctx.lineWidth = sd ? 5 : 8; ctx.beginPath(); ctx.moveTo(fx, fr - 104); if (sd) ctx.quadraticCurveTo(fx + sd * 40, fr - 104 - jh * 0.6, fx + sd * 74, fr - 10); else ctx.lineTo(fx, fr - 104 - jh); ctx.stroke(); }
  for (let i = 0; i < 6; i++) { const u = ((t3 * 1.5 + i / 6) % 1); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(fx + (i % 2 ? 1 : -1) * 60 * u, fr - 104 - jh * Math.sin(u * Math.PI) * 0.5, 3, 0, 7); ctx.fill(); } ctx.restore();
  for (const px of G.poles) ehLantern(ctx, px, 650, t3, 1);
  if (o.lamp) oilLamp(ctx, o.lamp[0], o.lamp[1], t3, { hang: true });
  for (let i = 0; i < 12; i++) { const R = K.rng(500 + i), x = 450 + R() * 1100 + 40 * Math.sin(t * 0.4 + i), y = 640 + R() * 260 + 26 * Math.sin(t * 0.6 + i * 2), b = 0.5 + 0.5 * Math.sin(t3 * 3 + i * 1.7);
    ehGlow(ctx, x, y, 22, 0.7 * b, '#e8ff9a'); ctx.fillStyle = '#f8ffd0'; ctx.fillRect(x - 2, y - 2, 4, 4); }
  for (let i = 0; i < 5; i++) { const R = K.rng(600 + i), u = ((t * 0.12 + R()) % 1), x = G.jasmine - 60 + R() * 140 + 30 * Math.sin(t + i), y = 680 + u * 220; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = '#fff6ea'; ctx.beginPath(); ctx.ellipse(x, y, 4, 2.5, t + i, 0, 7); ctx.fill(); ctx.restore(); }
}
function princessGardenFront(ctx, t) { ctx.drawImage(ehGardenFrontSprite(), -80, 1040, 360, 260); ctx.drawImage(ehGardenFrontSprite(), 1360, 1050, 360, 260); }
