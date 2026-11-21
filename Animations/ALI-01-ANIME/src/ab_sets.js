// ===== ALI-01-ANIME: painted plates (celPlates) and the story's sets =====
// Plates are soft airbrushed paintings baked once at 1x (they may soften when the camera pushes in: that is the look);
// cels (tree, thicket, rock, treasure) are drawn flat and hard on top. abPlate keys include the colour model.

function abBakeAt(key, w, h, draw) { return K.cached('ab:' + key, () => { const c = K.layer(w, h), x = c.getContext('2d'); draw(x, w, h); return c; }); }
function abGrad(ctx, x, y, w, h, stops) { const g = ctx.createLinearGradient(0, y, 0, y + h); stops.forEach(([o, c]) => g.addColorStop(o, c)); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); }
// airbrushed cloud: blurred body with a lighter underside
function abCloud(ctx, x, y, w, h, body, under, blur = 10) { ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.fillStyle = body; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(x + (i - 2) * w * 0.18, y - Math.sin(i * 1.3) * h * 0.25, w * 0.28, h * 0.5, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = under; ctx.beginPath(); ctx.ellipse(x, y + h * 0.28, w * 0.48, h * 0.16, 0, 0, 7); ctx.fill(); ctx.restore(); }
function abSoftHills(ctx, w, base, amp, col, seed, blur = 2) { const R = K.rng(seed); ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 1230);
  const ph = R() * 6, f1 = 0.004 + R() * 0.003, f2 = 0.011 + R() * 0.004; for (let x = 0; x <= w; x += 20) ctx.lineTo(x, base - amp * (0.6 * Math.sin(x * f1 + ph) + 0.4 * Math.sin(x * f2 + ph * 2))); ctx.lineTo(w, 1230); ctx.closePath(); ctx.fill(); ctx.restore(); }
function abSoftTrees(ctx, w, base, h, col, seed, n, blur = 1.5) { const R = K.rng(seed); ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const x = R() * w, r = h * (0.5 + R() * 0.6); ctx.beginPath(); ctx.ellipse(x, base - r * 0.9, r * 0.75, r, 0, 0, 7); ctx.fill(); ctx.fillRect(x - 5, base - r * 0.3, 10, r * 0.3 + 4); } ctx.fillRect(0, base - 6, w, 30); ctx.restore(); }
function abGlaze(ctx, x, y, r, col, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, a)); g.addColorStop(1, K.rgba(col, 0)); ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }

// ---------- rockGlade: the main strip (2400 x 1230), three colour models ----------
// v4 (owner note 3): lighter, more varied dusk and late models (a warm sunset with green land, not a purple wash)
const AB_SKY = {
  afternoon: [[0, '#4f8ae0'], [0.42, '#9cc8f6'], [0.66, '#ffe6b8'], [0.74, '#ffd8a0']],
  dusk: [[0, '#3a4a9a'], [0.36, '#8a6ab8'], [0.56, '#ff8a8a'], [0.7, '#ffc27a']],
  late: [[0, '#26306e'], [0.4, '#5a4a8a'], [0.62, '#c86a7a'], [0.72, '#f0a070']],
};
const AB_LAND = {   // far hills, near hills, tree line, ground top, ground bottom, path
  afternoon: ['#9ab0dc', '#7f9cc8', '#4f8a5a', '#e0aa6a', '#b8743e', '#f6d29a'],
  dusk: ['#9a7ab8', '#7a6aa8', '#3f6a5a', '#d0906a', '#9a5a4e', '#f0b48a'],
  late: ['#5a5a8e', '#4a4a7e', '#2e4a4e', '#9a6a6a', '#5e3e4e', '#c08a7a'],
};
function abGladePlate(m) {
  return abBakeAt('glade:' + m, 2400, 1230, (c, w) => {
    const L = AB_LAND[m]; abGrad(c, 0, 0, w, 1230, AB_SKY[m]);
    if (m !== 'afternoon') { abGlaze(c, 260, 640, 520, '#ffb060', m === 'dusk' ? 0.55 : 0.25); c.save(); c.filter = 'blur(6px)'; c.fillStyle = m === 'dusk' ? '#ffcf7a' : '#e8907a'; c.beginPath(); c.arc(260, 660, 70, 0, 7); c.fill(); c.restore(); }
    else abGlaze(c, 1900, 200, 600, '#fff2c0', 0.35);
    const cu = m === 'afternoon' ? ['#ffffff', '#ffe7c0'] : m === 'dusk' ? ['#d8a0c8', '#ffd0a0'] : ['#7a5a9a', '#d08a8a'];
    for (const [x, y, s] of [[300, 220, 1], [900, 140, 0.8], [1500, 260, 1.2], [2100, 160, 0.9], [1150, 420, 0.6]]) abCloud(c, x, y, 360 * s, 90 * s, cu[0], cu[1], 9);
    if (m === 'late') { const R = K.rng(8); c.fillStyle = '#fff6ea'; for (let i = 0; i < 70; i++) { c.globalAlpha = 0.3 + R() * 0.6; c.fillRect(R() * w, R() * 420, 2, 2); } c.globalAlpha = 1; }
    abSoftHills(c, w, 720, 90, L[0], 3, 3); abSoftHills(c, w, 800, 60, L[1], 5, 2); abSoftTrees(c, w, 860, 70, L[2], 7, 60, 1.5);
    abGrad(c, 0, 860, w, 370, [[0, L[3]], [1, L[4]]]);
    c.save(); c.filter = 'blur(3px)'; c.fillStyle = L[5]; c.globalAlpha = 0.75; c.beginPath(); c.moveTo(0, 892); c.bezierCurveTo(800, 880, 1600, 904, w, 888); c.lineTo(w, 960); c.bezierCurveTo(1600, 980, 800, 950, 0, 968); c.closePath(); c.fill(); c.restore();
    const R = K.rng(21); c.save(); c.filter = 'blur(1px)'; for (let i = 0; i < 160; i++) { c.fillStyle = K.rgba(L[4], 0.5); c.beginPath(); c.ellipse(R() * w, 880 + R() * 340, 8 + R() * 30, 3 + R() * 6, 0, 0, 7); c.fill(); } c.restore();
    // v4 dressing: a sun, bushes along the tree line, stones, tufts and flowers over the ground (clear in front of the rock)
    if (m === 'afternoon') { abGlaze(c, 1980, 210, 260, '#fff6c8', 0.7); celShade(c, ell(1980, 210, 58, 58, 40), '#fff6c8', '#ffe08a', { light: [-1, -1], off: 10, lw: 0 }); }
    const bushC = m === 'afternoon' ? ['#4f9a5a', '#2f6a44'] : m === 'dusk' ? ['#4a7a5e', '#2e5048'] : ['#2e4a4e', '#1e3238'];
    const Rb = K.rng(66); for (let i = 0; i < 16; i++) { const x = Rb() * w, r = 40 + Rb() * 40; if (x > 1500 && x < 2140) continue; abBlob(c, x, 872 - r * 0.3, r, r * 0.6, bushC[0], bushC[1], { lw: 2.5, off: r * 0.3, line: abDark(bushC[1], 0.4) }); }
    const fl = m === 'afternoon' ? undefined : ['#ff9ab0', '#ffd36a', '#fff1d8', '#c8a0ff'];
    abDress(c, 0, w, 905, 1215, 67, { stones: 26, tufts: 30, flowers: m === 'late' ? 6 : 22, cols: fl, skip: [[1600, 2040]], grass: m === 'afternoon' ? ['#6ab85a', '#2f7a44'] : ['#5a9a6a', '#2f6050'], stone: m === 'afternoon' ? ['#d8c0a8', '#9a8078'] : ['#c09aa8', '#7a5a70'] });
    if (m === 'dusk') { c.save(); c.globalAlpha = 0.25; c.fillStyle = '#2a1a4a'; for (const x of [520, 1820]) { c.beginPath(); c.moveTo(x - 60, 900); c.lineTo(x + 60, 900); c.lineTo(x + 900, 1000); c.lineTo(x + 700, 1040); c.closePath(); c.fill(); } c.restore(); }   // long shadows to the right
  });
}
const AB_TREE = { x: 520, top: 330, perch: 400, branchTo: 700, fol: [540, 300, 260], gap: [600, 372, 120, 46] };
const AB_THICKET = { x: 900, w: 300, top: 710 };
const AB_LEAF = { afternoon: ['#4a9a5a', '#2a6a4a', '#8ad07a'], dusk: ['#4f8a62', '#2e5a4a', '#ffb08a'], late: ['#2e2e58', '#1c1c3e', '#6a5a9a'], morning: ['#4fb06a', '#2a7a50', '#a0e08a'] };
const AB_BARK = { afternoon: ['#8a5a3a', '#5a3424'], dusk: ['#8a5a44', '#5a3a34'], late: ['#3a2a4a', '#24182e'], morning: ['#8a5a3a', '#5a3424'] };
function abLeafBlobs(ctx, cx, cy, r, m, seed, t = 0, rip = 0) {
  const [f, s, h] = AB_LEAF[m], R = K.rng(seed);
  for (let i = 0; i < 9; i++) { const a = R() * Math.PI * 2, d = r * (0.25 + R() * 0.55), rr = r * (0.32 + R() * 0.18), wob = rip * Math.sin(t * 7 + i * 1.3) * 10;
    abBlob(ctx, cx + Math.cos(a) * d + wob, cy + Math.sin(a) * d * 0.7, rr, rr * 0.8, f, s, { hi: i % 3 ? null : h, off: rr * 0.3, lw: 3, line: abDark(s, 0.4) }); }
}
// the cel parts of the glade behind the actors
function abGladeBack(ctx, m, t, o = {}) {
  const T = AB_TREE, [bk, bs] = AB_BARK[m], [lf, ls] = AB_LEAF[m];
  abLeafBlobs(ctx, AB_THICKET.x, AB_THICKET.top + 80, 170, m, 31);
  celShade(ctx, [[T.x - 52, AB_GR + 4], [T.x - 40, 700], [T.x - 44, T.top], [T.x + 44, T.top], [T.x + 40, 700], [T.x + 52, AB_GR + 4]], bk, bs, { light: [-1, -0.3], off: 22, lw: 4, line: abDark(bs, 0.4) });
  const dip = o.dip || 0; celShade(ctx, [[T.x + 30, T.perch - 14], [T.branchTo, T.perch - 6 + dip], [T.branchTo + 6, T.perch + 6 + dip], [T.x + 30, T.perch + 18]], bk, bs, { light: [-1, -1], off: 8, lw: 3.5, line: abDark(bs, 0.4) });
  abLeafBlobs(ctx, T.fol[0] - 40, T.fol[1] - 20, T.fol[2] * 0.95, m, 33, t, o.rip || 0);
}
// the front passes: thicket leaves over the donkey; the foliage curtain over Ali (gap: 0 closed .. 1 the eye gap, cover 0..1)
function abThicketFront(ctx, m, t, minX = -1e9) { const [f, s, h] = AB_LEAF[m], R = K.rng(55);
  for (let i = 0; i < 12; i++) { const x = AB_THICKET.x - 170 + (i % 6) * 66 + R() * 14, y = AB_THICKET.top + (i < 6 ? 150 : 70) + R() * 40, r = 62 + R() * 24; if (x < minX) continue; abBlob(ctx, x + Math.sin(t * 1.4 + i) * 2, y, r, r * 0.8, f, s, { hi: i % 2 ? h : null, off: r * 0.3, lw: 3, line: abDark(s, 0.4) }); } }
function abFoliageFront(ctx, m, t, cover, o = {}) {
  if (cover <= 0) return; const T = AB_TREE, [gx, gy, gw, gh] = T.gap, [f, s, h] = AB_LEAF[m], R = K.rng(77), rip = o.rip || 0;
  ctx.save(); if (o.hole) { ctx.beginPath(); ctx.rect(-1e4, -1e4, 2e4, 2e4); ctx.roundRect(gx - gw / 2, gy - gh / 2 * o.hole, gw, gh * o.hole, 22); ctx.clip('evenodd'); }
  for (let i = 0; i < 22; i++) { const a = R() * Math.PI * 2, d = 40 + R() * 170, r = 56 + R() * 40, side = Math.cos(a) < 0 ? -1 : 1;
    const x = gx + Math.cos(a) * d * 1.1 + side * (1 - cover) * 300 + rip * Math.sin(t * 8 + i) * 8, y = gy - 30 + Math.sin(a) * d * 0.95;
    abBlob(ctx, x, y, r, r * 0.8, f, s, { hi: i % 4 ? null : h, off: r * 0.3, lw: 3, line: abDark(s, 0.4) }); }
  ctx.restore();
}

// ---------- the dark leaf frame (Ali Baba's point of view) for the wides of the rock, in PANEL units ----------
// o: { m, gap 0..1 (eye gap open), gaze, lid, hand, rip }
function abLeafFrame(ctx, t, o = {}) {
  const m = o.m || 'afternoon', [f, s] = AB_LEAF[m], R = K.rng(91), dk = abDark(f, 0.55), ds = abDark(s, 0.6), rip = o.rip || 0;
  ctx.save();
  for (let i = 0; i < 16; i++) { const a = R() * 1.6, d = 120 + R() * 240, x = Math.cos(a) * d * 1.1 - 40, y = Math.sin(a) * d * 0.8 - 30, r = 60 + R() * 50;
    abBlob(ctx, x + Math.sin(t * 1.3 + i) * (2 + rip * 8), y, r, r * 0.75, dk, ds, { off: r * 0.25, lw: 3, line: abDark(ds, 0.5) }); }
  // a branch reaching in
  celShade(ctx, [[0, 236], [250, 210], [330, 236], [250, 230], [0, 262]], abDark('#5a3424', 0.4), abDark('#3a2014', 0.5), { light: [-1, -1], off: 6, lw: 3 });
  const g = o.gap ?? 1; if (g > 0.02) { const gx = 186, gy = 160, gw = 150, gh = 56 * g;
    ctx.save(); ctx.beginPath(); ctx.roundRect(gx - gw / 2, gy - gh / 2, gw, gh, 20); ctx.fillStyle = '#120a16'; ctx.fill(); ctx.clip();
    abFace(ctx, gx + 4, gy + 6, 0.36, { who: 'ali', gaze: o.gaze || [0.6, 0.3], lid: o.lid || 0, iris: o.iris, brow: o.brow ?? -0.3, m, hand: o.hand || 0 });
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(40,30,80,0.45)'; ctx.fillRect(gx - gw, gy - gh, gw * 2, gh * 2); ctx.restore();
    abBlob(ctx, gx - 70, gy - 26, 44, 30, dk, ds, { off: 10, lw: 3 }); abBlob(ctx, gx + 72, gy + 26, 48, 30, dk, ds, { off: 10, lw: 3 }); }
  ctx.restore();
}

// ---------- the morning forest: 4 tileable layers (2000 wide), also repainted for afternoon and dusk ----------
const AB_FOREST = {
  morning: { sky: [[0, '#8fd0e8'], [0.6, '#d8f0d0'], [0.75, '#f4f0c0']], far: '#9ac8c0', mid: ['#5a6aa8', '#3e4a86'], can: ['#7ad8a0', '#3e9a6a'], gnd: ['#c89a52', '#8a5a2a'], path: '#e8c27a', front: '#1e2a3a', shaft: '#fff2b0' },
  afternoon: { sky: [[0, '#7aa8e0'], [0.6, '#f0d8a8'], [0.75, '#ffc890']], far: '#b0a0b8', mid: ['#6a5a8a', '#4a3a6a'], can: ['#8ab86a', '#4a7a4a'], gnd: ['#d8a062', '#a8643a'], path: '#f0c88a', front: '#2a1a2a', shaft: '#ffd890' },
  dusk: { sky: [[0, '#34407e'], [0.5, '#a06aa8'], [0.72, '#ffaa78']], far: '#8a6aa0', mid: ['#5a4a7a', '#3e3460'], can: ['#4f8a62', '#2e5a4a'], gnd: ['#a8705a', '#6a4048'], path: '#d8a07a', front: '#1e1a2a', shaft: '#ffc08a' },
};
function abForestLayer(name, m) {
  return abBakeAt(`forest:${name}:${m}`, 2000, 1230, (c, w) => {
    const P = AB_FOREST[m], R = K.rng(name.length * 17 + 3), wrap = (fn) => { for (const o of [-w, 0, w]) { c.save(); c.translate(o, 0); fn(); c.restore(); } };
    if (name === 'far') { abGrad(c, 0, 0, w, 1230, P.sky); c.save(); c.filter = 'blur(4px)'; c.fillStyle = P.far;
      const xs = Array.from({ length: 26 }, () => [R() * w, 30 + R() * 30]); wrap(() => { for (const [x, tw] of xs) c.fillRect(x, 0, tw, 900); for (const [x] of xs) { c.beginPath(); c.ellipse(x, 120, 120, 110, 0, 0, 7); c.fill(); } }); c.restore();
      c.save(); c.filter = 'blur(8px)'; c.globalAlpha = 0.5; c.fillStyle = P.sky[2][1]; c.fillRect(0, 700, w, 220); c.restore(); }
    if (name === 'mid') { const xs = Array.from({ length: 11 }, () => [R() * w, 60 + R() * 30, R()]);
      wrap(() => { for (const [x, tw, q] of xs) { celShade(c, [[x - tw / 2, 920], [x - tw / 2 + 6, 120], [x + tw / 2 - 6, 120], [x + tw / 2, 920]], P.mid[0], P.mid[1], { light: [-1, 0], off: tw * 0.35, lw: 3, line: abDark(P.mid[1], 0.4) });
        abBlob(c, x, 120 + q * 60, 170, 120, P.can[0], P.can[1], { off: 40, lw: 3, line: abDark(P.can[1], 0.4) }); } }); }
    if (name === 'path') { abGrad(c, 0, 880, w, 350, [[0, P.gnd[0]], [1, P.gnd[1]]]); c.save(); c.filter = 'blur(2px)'; c.fillStyle = P.path; c.fillRect(0, 892, w, 56); c.restore();
      const xs = Array.from({ length: 16 }, () => [R() * w, 0.6 + R() * 0.8]); wrap(() => { for (const [x, s] of xs) for (let k = -3; k <= 3; k++) { c.save(); c.translate(x, 960); c.rotate(k * 0.32); celShade(c, [[0, 0], [-10 * s, -40 * s], [0, -90 * s], [10 * s, -40 * s]], P.can[0], P.can[1], { off: 5, lw: 2.5 }); c.restore(); } });
      // v4 dressing: stones, tufts, flowers and red-capped mushrooms on both sides of the path
      wrap(() => { abDress(c, 0, w, 870, 890, 61, { stones: 8, tufts: 10, flowers: 6, grass: P.can, stone: m === 'dusk' ? ['#9a7a9a', '#6a4a6a'] : undefined });
        abDress(c, 0, w, 975, 1200, 62, { stones: 16, tufts: 18, flowers: 16, grass: P.can, stone: m === 'dusk' ? ['#9a7a9a', '#6a4a6a'] : undefined });
        const Q = K.rng(63); for (let i = 0; i < 9; i++) { const x = Q() * w, y = 990 + Q() * 200, r = 10 + Q() * 10; seg(c, x, y, x, y - r * 1.4, r * 0.7, '#fff1d8', 1.5); celShade(c, ell(x, y - r * 1.4, r * 1.3, r * 0.8, 16).filter((q) => q[1] <= y - r * 1.4 + 1), '#e8364f', '#a8203a', { light: [-1, -1], off: 3, lw: 2 }); } }); }
    if (name === 'front') wrap(() => { const x = 900, tw = 78; c.fillStyle = P.front; c.beginPath(); c.moveTo(x - tw / 2, -10); c.lineTo(x + tw / 2, -10); c.lineTo(x + tw / 2 + 8, 1250); c.lineTo(x - tw / 2 - 8, 1250); c.closePath(); c.fill();
      c.beginPath(); c.ellipse(x + 30, 1215, 110, 40, 0, 0, 7); c.fill(); });
  });
}
// draw a tileable layer at parallax r with the camera (zoom about the panel centre)
function abLayer(ctx, img, cam, r, dy = 0) {
  const w = img.width, z = cam.zoom, x0 = cam.x * r - 500 / z, ox = Math.floor(x0 / w) * w;
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-cam.x * r, -cam.y + dy);
  for (let x = ox; x < x0 + 1000 / z + w; x += w) ctx.drawImage(img, x, 0);
  ctx.restore();
}
// slanting light shafts (additive), moving with the far layer
function abShafts(ctx, cam, t, col, a = 0.18, r = 0.4) {
  ctx.save(); ctx.globalCompositeOperation = 'screen'; const z = cam.zoom, R = K.rng(12);
  for (let i = 0; i < 6; i++) { const base = R() * 2400, x = ((((base - cam.x * r * z) % 2400) + 2400) % 2400) - 600, w = 70 + R() * 90;
    const g = ctx.createLinearGradient(0, 0, 0, 1230); g.addColorStop(0, K.rgba(col, a)); g.addColorStop(1, K.rgba(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, -20); ctx.lineTo(x + w, -20); ctx.lineTo(x + w + 520, 1250); ctx.lineTo(x + 520, 1250); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
function abForest(ctx, cam, t, m, o = {}) {
  abLayer(ctx, abForestLayer('far', m), cam, 0.25); abLayer(ctx, abForestLayer('mid', m), cam, 0.5); if (o.shafts !== false) abShafts(ctx, cam, t, AB_FOREST[m].shaft, o.shaftA ?? 0.16);
  abLayer(ctx, abForestLayer('path', m), cam, 1);
}
// one narrow dark trunk per 2000-unit tile at parallax 1.6, smeared 16 units behind it; o.ph phases the layer so the trunk never
// crosses the subject near a word cue (phases computed per shot, see notes.md)
function abForestFront(ctx, cam, m, o = {}) { const img = abForestLayer('front', m), sd = o.dir ?? 1; for (const [d, a] of [[0, 0.92], [8, 0.35], [16, 0.18]]) { ctx.save(); ctx.globalAlpha = a; abLayer(ctx, img, { ...cam, x: cam.x - (o.ph || 0) / 1.6 + sd * d / 1.6 }, 1.6); ctx.restore(); } }

// ---------- dawnTown: the dawn sky with lit cloud undersides, and the far town roofs with three glowing windows ----------
function abDawnSky() { return abBakeAt('dawnSky', 1000, 1230, (c, w) => { abGrad(c, 0, 0, w, 1230, [[0, '#24306e'], [0.3, '#5a5aa8'], [0.55, '#e88a9a'], [0.72, '#ffc89a'], [0.85, '#fff0c8']]);
  abGlaze(c, 640, 780, 420, '#fff2c0', 0.7); for (const [x, y, s] of [[240, 260, 1.1], [760, 180, 0.9], [520, 420, 0.8], [880, 520, 0.6]]) abCloud(c, x, y, 360 * s, 80 * s, '#8a6aa8', '#ffb08a', 8); }); }
function abTownRoofs(m = 'dawn') { return abBakeAt('roofs:' + m, 1400, 1230, (c, w) => { const R = K.rng(4), col = m === 'night' ? '#241e44' : '#8a74a8', sh = m === 'night' ? '#18142e' : '#6e5c92';
  c.save(); c.filter = 'blur(1.4px)'; for (let x = -40; x < w; x += 46 + R() * 40) { const hh = 26 + R() * 46, ww = 50 + R() * 50, base = 744 + R() * 16; c.fillStyle = R() < 0.5 ? col : sh; c.fillRect(x, base - hh, ww, hh + 300);
    if (R() < 0.22) { c.beginPath(); c.ellipse(x + ww / 2, base - hh, ww * 0.34, ww * 0.38, 0, Math.PI, 0); c.fill(); }
    if (R() < 0.06) { c.fillRect(x + ww / 2 - 6, base - hh - 120, 12, 120); c.beginPath(); c.ellipse(x + ww / 2, base - hh - 120, 12, 16, 0, Math.PI, 0); c.fill(); } } c.restore();
  const wins = m === 'night' ? 14 : 3; for (let i = 0; i < wins; i++) { const x = 160 + R() * (w - 320), y = 712 + R() * 26; c.fillStyle = '#ffd98a'; c.fillRect(x, y, 10, 12); abGlaze(c, x + 5, y + 6, 36, '#ffcf6a', 0.6); } }); }

// ---------- treasureCave: 1600 x 1230 painted plate + baked cel treasure + live glints, bolts and stalactites ----------
const AB_CAVE = { door: [60, 280, 560], gold: [420, 760], silver: [800, 1080], cloth: [1120, 1480] };
function abCavePlate() {
  return abBakeAt('cavePlate', 1600, 1230, (c, w) => {
    abGrad(c, 0, 0, w, 1230, [[0, '#1e1020'], [0.45, '#4a2430'], [0.75, '#6a3a2a'], [1, '#2a1418']]);
    for (const [x, y, r, col, a] of [[590, 700, 520, '#ffb84a', 0.55], [940, 700, 360, '#bcd8ff', 0.35], [1300, 680, 420, '#ff7a8a', 0.3], [170, 720, 300, '#9a7aff', 0.4]]) abGlaze(c, x, y, r, col, a);
    c.save(); c.filter = 'blur(2px)'; c.strokeStyle = 'rgba(20,8,16,0.55)'; c.lineWidth = 6; const R = K.rng(6);
    for (let i = 0; i < 40; i++) { const x = R() * w, y = 100 + R() * 700; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 40, y + 60, x + R() * 80 - 40, y + 140); c.stroke(); } c.restore();
    c.fillStyle = '#140a12'; c.beginPath(); c.moveTo(0, 0); c.lineTo(w, 0); c.lineTo(w, 120); for (let x = w; x >= 0; x -= 80) c.lineTo(x, 110 + 40 * Math.sin(x * 0.01)); c.closePath(); c.fill();
    const [d0, d1, dt] = AB_CAVE.door, D = townArchPts(d0, d1, dt, AB_GR, 'round'); c.save(); K.poly(c, D, true); c.clip(); abGrad(c, d0, dt, d1 - d0, AB_GR - dt, [[0, '#4a3a8a'], [0.6, '#b07ab0'], [1, '#e89a8a']]); abSoftHills(c, w, 820, 30, '#3a2a5a', 3, 1); c.restore();
    abGrad(c, 0, 880, w, 350, [[0, '#7a4a2a'], [0.4, '#4a2a1e'], [1, '#1e0e10']]); abGlaze(c, 600, 900, 500, '#ffb040', 0.35);
    c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = 0.3; c.fillStyle = '#c8a0ff'; c.beginPath(); c.moveTo(d0 + 30, AB_GR); c.lineTo(d1 - 20, AB_GR); c.lineTo(d1 + 240, 1230); c.lineTo(d0 + 80, 1230); c.closePath(); c.fill(); c.restore();
  });
}
function abCaveCels() {
  return bake('ab-cave-cels', 1600, 1230, (c) => {
    // gold zone: mounds, vases, the open chest stands live (it acts in S13)
    abCoinPile(c, 470, 902, 200, 170, { seed: 2 }); abCoinPile(c, 700, 905, 260, 260, { seed: 4 }); abCoinPile(c, 560, 910, 240, 120, { seed: 5 });
    for (const [x, h, col] of [[760, 120, '#e8a020'], [432, 90, '#c8481a']]) celShade(c, [[x - 24, 900], [x - 34, 900 - h * 0.6], [x - 14, 900 - h * 0.9], [x - 12, 900 - h], [x + 12, 900 - h], [x + 14, 900 - h * 0.9], [x + 34, 900 - h * 0.6], [x + 24, 900]], col, abDark(col, 0.4), { light: [-1, -1], off: 10, hi: '#fff3b0', lw: 3 });
    // silver zone: ewers, plates, pale heaps
    abCoinPile(c, 900, 905, 220, 150, { silver: true, seed: 7 }); abCoinPile(c, 1030, 906, 140, 90, { silver: true, seed: 8 });
    for (const [x, y, r] of [[840, 760, 46], [990, 790, 40], [1060, 740, 34]]) { abBlob(c, x, y, r, r, '#e6e8f6', '#9a9ec0', { hi: '#ffffff', lw: 3 }); c.save(); c.strokeStyle = '#7a7ea0'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, r * 0.6, 0, 7); c.stroke(); c.restore(); }
    for (const x of [860, 1000]) celShade(c, [[x - 20, 900], [x - 30, 860], [x - 14, 800], [x - 8, 770], [x + 26, 760], [x + 10, 800], [x + 30, 860], [x + 20, 900]], '#dfe2f2', '#8f94b8', { light: [-1, -1], off: 9, hi: '#ffffff', lw: 3 });
    // cloth zone: 12 bales stacked 3 high
    const cols = ['#c81e3a', '#1f9a6a', '#f2a71b', '#7a4ad0'];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - (r === 2 ? 0 : 0); i++) abBale(c, 1170 + i * 92 + (r % 2) * 40, 902 - r * 100, cols[(i + r) % 4], 0.62 + (r === 0 ? 0.06 : 0));
    // v4 dressing (owner note 2): the cave floor: pebbles, spilled coins, a goblet on its side, a scimitar, a rolled carpet,
    // jewels and blue crystals growing from the rock at the foot of the walls
    abDress(c, 0, 1600, 915, 1215, 71, { stones: 22, tufts: 0, flowers: 0, stone: ['#a8807a', '#6a4a4a'] });
    const Rc = K.rng(72); for (let i = 0; i < 40; i++) { const x = Rc() * 1600, y = 915 + Rc() * 290, r = 8 + Rc() * 7; abBlob(c, x, y, r, r * 0.5, Rc() < 0.75 ? '#ffcf3a' : '#e6e8f6', Rc() < 0.75 ? '#c07a12' : '#9a9ec0', { lw: 2, off: 2 }); }
    for (let i = 0; i < 7; i++) { const x = 60 + Rc() * 1500, y = 930 + Rc() * 250, col = ['#e8364f', '#2fd08a', '#3f7ad0', '#c86aff'][i % 4]; celShade(c, [[x, y - 14], [x + 10, y - 4], [x, y + 6], [x - 10, y - 4]], col, abDark(col, 0.35), { light: [-1, -1], off: 4, hi: '#ffffff', lw: 2 }); }
    for (const [cx, n] of [[30, 4], [1560, 5], [1130, 3]]) for (let k = 0; k < n; k++) { const x = cx + (k - n / 2) * 26, h = 50 + ((k * 37) % 60); celShade(c, [[x - 12, 906], [x - 6, 906 - h], [x, 906 - h - 16], [x + 6, 906 - h], [x + 12, 906]], '#7ad8ff', '#3a8ac8', { light: [-1, -1], off: 5, hi: '#e8faff', lw: 2.5, line: '#1a4a7a' }); }
    c.save(); c.translate(560, 1080); c.rotate(-0.4); celShade(c, [[-40, -12], [40, -18], [50, 0], [40, 18], [-40, 12]], '#ffcf3a', '#c07a12', { light: [-1, -1], off: 6, hi: '#fff3b0', lw: 3 }); c.restore();
    c.save(); c.translate(1000, 1120); c.rotate(0.15); seg(c, -90, 0, 70, -20, 10, '#d8dcef', 2); seg(c, -120, 4, -90, 0, 14, '#c07a12', 2); c.restore();
    celShade(c, K.rectPts(1260, 1010, 240, 46), '#7a4ad0', '#4a2a8a', { light: [-1, -1], off: 10, lw: 3 }); for (let x = 1272; x < 1500; x += 30) seg(c, x, 1012, x, 1054, 4, '#ffd36a', 0); shape(c, ell(1260, 1033, 16, 23, 16), '#5a2a9a', { lw: 3 });
    // row of sacks in three sizes by the gold
    for (const [x, s] of [[300, 0.75], [352, 0.6], [398, 0.45]]) abSack(c, x, 904, s, 1, { coin: true });
  });
}
function abCaveLive(ctx, t, o = {}) {
  // hanging bolts on a rope (ribbons on a travelling sine, 4 drawings), glints popping on twos, stalactites
  const tc = AB_T2(t); seg(ctx, 1120, 420, 1480, 432, 4, '#c8a070', 1);
  ['#c81e3a', '#1f9a6a', '#f2a71b', '#7a4ad0', '#e8364f'].forEach((col, i) => { const x0 = 1150 + i * 70, pts = [];
    for (let k = 0; k <= 8; k++) { const y = 424 + k * 34, sw = Math.sin(tc * 5 - k * 0.7 + i) * k * 1.6; pts.push([x0 + sw, y]); }
    const L = pts.map(([x, y]) => [x - 22, y]), Rr = pts.map(([x, y]) => [x + 22, y]).reverse(); celShade(ctx, [...L, ...Rr], col, abDark(col, 0.4), { light: [-1, 0], off: 12, lw: 3 }); });
  abGlints(ctx, [420, 640, 360, 250], t, 9, 11, 22); abGlints(ctx, [800, 700, 280, 180], t, 5, 12, 16, 0.8); abGlints(ctx, [560, 780, 160, 100], t, 2, 14, 18);
}
function abStalactites(ctx, cam) { const R = K.rng(15); ctx.save(); const ox = (cam.x - 800) * -0.4;
  for (let i = 0; i < 9; i++) { const x = 60 + i * 190 + R() * 60 + ox, len = 160 + R() * 200, w = 50 + R() * 50;
    celShade(ctx, [[x - w, -20], [x + w, -20], [x + w * 0.2, 60 + len * 0.5], [x, 60 + len]], '#2a141e', '#160a10', { light: [1, -0.4], off: 14, hi: '#6a3a3a', lw: 3, line: '#0a0408' }); }
  ctx.restore(); }

// ---------- v4 set dressing (owner note 2: more elements in every scene) ----------
// cel stones, grass tufts, flowers and small plants scattered over a ground band (baked into a plate: static)
function abStone(c, x, y, r, col = '#b8aec8', sh = '#857aa0') { celShade(c, [[x - r, y], [x - r * 0.8, y - r * 0.55], [x - r * 0.2, y - r * 0.8], [x + r * 0.5, y - r * 0.7], [x + r, y - r * 0.2], [x + r * 0.9, y]], col, sh, { light: [-1, -1], off: r * 0.3, hi: abLight(col, 0.5), lw: 2.5, line: abDark(sh, 0.4) }); }
function abTuft(c, x, y, h, col = '#5fae5a', sh = '#2f7a44') { for (let k = -2; k <= 2; k++) { c.save(); c.translate(x + k * h * 0.12, y); c.rotate(k * 0.28); celShade(c, [[-h * 0.08, 0], [0, -h * (1 - Math.abs(k) * 0.15)], [h * 0.08, 0]], col, sh, { light: [-1, 0], off: h * 0.05, lw: 2 , line: abDark(sh, 0.4) }); c.restore(); } }
function abFlower(c, x, y, h, col) { seg(c, x, y, x + 2, y - h, 3, '#3f8a4a', 0); for (let i = 0; i < 5; i++) { const a = i * 1.2566; shape(c, ell(x + 2 + Math.cos(a) * h * 0.14, y - h + Math.sin(a) * h * 0.14, h * 0.11, h * 0.11, 10), col, { lw: 1.5, line: abDark(col, 0.5) }); } shape(c, ell(x + 2, y - h, h * 0.08, h * 0.08, 10), '#ffe27a', { lw: 0 }); }
// o: {stones, tufts, flowers, cols (flower colours), stone [col, shade], grass [col, shade], skip: [[x0, x1], ...] (keep clear)}
function abDress(c, x0, x1, y0, y1, seed, o = {}) {
  const R = K.rng(seed), clear = (x) => (o.skip || []).some(([a, b]) => x > a && x < b), items = [];
  for (let i = 0; i < (o.stones ?? 10); i++) items.push(['s', x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  for (let i = 0; i < (o.tufts ?? 14); i++) items.push(['t', x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  for (let i = 0; i < (o.flowers ?? 10); i++) items.push(['f', x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), R()]);
  items.sort((a, b) => a[2] - b[2]);
  const cols = o.cols || ['#ff6a8a', '#ffd36a', '#fff6ea', '#9a7aff', '#ff8a3a'], [sc, ss] = o.stone || ['#c8bcc8', '#8a7e9a'], [gc, gs] = o.grass || ['#6ab85a', '#2f7a44'];
  for (const [k, x, y, q] of items) { if (clear(x)) continue; const d = 0.6 + 0.8 * (y - y0) / Math.max(1, y1 - y0);
    if (k === 's') abStone(c, x, y, (10 + q * 22) * d, sc, ss); else if (k === 't') abTuft(c, x, y, (26 + q * 30) * d, gc, gs); else abFlower(c, x, y, (22 + q * 18) * d, cols[Math.floor(q * 97) % cols.length]); }
}
// a small flock crossing the sky, wings on twos (Library bird rig, sparrow kind); x moves from x0 at speed v (units/s)
function abFlock(ctx, t, x0, y0, v, n = 4, seed = 1, s = 0.5) {
  const R = K.rng(seed), tc = AB_T2(t), dir = v < 0 ? -1 : 1;
  for (let i = 0; i < n; i++) { const dx = R() * 160 - i * 70, dy = R() * 90 - 45, ph = R() * 6;
    bird(ctx, { kind: 'sparrow', x: x0 + dx * dir + v * t, y: y0 + dy + 10 * Math.sin(tc * 2 + ph), s: s * (0.8 + R() * 0.4), dir, fly: true, flap: Math.sin(tc * 26 + ph) }); }
}
// the rising sun: a disc with a hard highlight and a soft painted halo
function abSun(ctx, x, y, r, col = '#fff1b0', halo = '#ffc890', k = 1) { abGlow(ctx, x, y, r * 4, 0.55 * k, halo); celShade(ctx, ell(x, y, r, r, 40), col, abMul(col, '#ff9a5a', 0.25), { light: [-1, -1], off: r * 0.18, lw: 0 }); }
