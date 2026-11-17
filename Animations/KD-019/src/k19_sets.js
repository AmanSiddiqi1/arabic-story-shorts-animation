// ===== KD-019 sets: pond (cutaway), rockyHill, skyFlight strip. World 1000 x 1230. (library proposals: pond, rockyHill, aerialStrip) =====
const K19W = 1000, K19H = 1230, K19SURF = 640, K19BANK = 600;
const K19WATER = '#2f6fd8', K19EARTH = '#9a6a35', K19EARTHD = '#6e4620', K19GRASS = '#3f9d4a', K19ROCK = '#a3a7ad', K19ROCKD = '#6d737c';
// the underwater slope and bed of the pond
const K19BED = [[330, 600], [352, 648], [430, 820], [520, 936], [600, 1040], [700, 1072], [850, 1082], [1000, 1066]];
const k19bedY = (x) => { if (x <= K19BED[0][0]) return K19BANK; for (let i = 1; i < K19BED.length; i++) if (x <= K19BED[i][0]) { const [x0, y0] = K19BED[i - 1], [x1, y1] = K19BED[i]; return K.lerp(y0, y1, (x - x0) / (x1 - x0)); } return 1066; };
const K19WATERPTS = [[350, K19SURF], [1010, K19SURF], [1010, 1066], ...K19BED.slice(1).reverse().filter((p) => p[1] >= K19SURF), [350, K19SURF]];
function k19bake(key, draw) { return K.cached('kd19:' + key, () => { const c = K.layer(K19W * 2, K19H * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }

// sky for the pond: preset a cross-faded to preset b by f, horizon hills at about y 530
function k19pondSky(ctx, a, b, f, t) {
  ctx.save(); ctx.translate(0, -360); sky(ctx, { preset: a }); if (b && f > 0.001) { ctx.globalAlpha *= f; sky(ctx, { preset: b }); } ctx.restore();
}
// pond land and water (no sky): far bank, near bank cutaway, water body, bed
const k19pondLand = () => k19bake('pondLand', (x) => {
  x.save(); x.translate(0, -360); hillTrees(x, { y: 900, seed: 9, n: 13 }); x.restore();
  shape(x, [[-20, 560], [1020, 548], [1020, 650], [-20, 650]], K19GRASS, { lw: 6, seed: 71, dot: GREEND, pitch: 9, rad: 0.3, da: 0.5 });
  shape(x, K19WATERPTS, K19WATER, { lw: 0, dot: '#1d5bd0', pitch: 11, rad: 0.3, da: 0.6 });
  // deep water darkens toward the bed
  x.save(); K.poly(x, K19WATERPTS, true); x.clip(); x.fillStyle = 'rgba(13,34,96,0.28)'; x.fillRect(340, 900, 700, 300); x.fillStyle = dotPat(x, NAVY, 9, 0.32); x.globalAlpha = 0.35; x.fillRect(340, 980, 700, 260); x.restore();
  // earth under the bank and under the bed
  const earth = [[-20, K19BANK], ...K19BED, [1020, 1066], [1020, 1250], [-20, 1250]];
  shape(x, earth, K19EARTH, { lw: 7, seed: 72, dot: K19EARTHD, pitch: 10, rad: 0.32, da: 0.6 });
  // sandy bed band, pebbles in the earth
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = SAND; x.lineWidth = 16; K.poly(x, K19BED.slice(1).map((p) => [p[0], p[1] + 9]), false); x.stroke(); x.restore();
  const r = K.rng(19); for (let i = 0; i < 26; i++) { const px = r() * 1000, py = Math.max(k19bedY(px) + 40, 620) + r() * 160; if (py > 1220) continue; shape(x, ell(px, py, 10 + r() * 12, 7 + r() * 6, 12), '#c49a5a', { lw: 3.5, seed: 80 + i }); }
  // grass lip of the near bank
  shape(x, [[-20, 590], [326, 590], [340, 606], [-20, 612]], K19GRASS, { lw: 6, seed: 73 });
  for (let i = 0; i < 16; i++) { const gx = 8 + i * 21; seg(x, gx, 594, gx + 5, 572 - (i % 3) * 6, 3, GREEN2, 2.5); }
  // flat stone on the bed
  shape(x, ell(700, 1060, 46, 16, 20), STONE, { lw: 5, seed: 74, dot: STONED, pitch: 6, rad: 0.25, da: 0.5 });
});
// live water parts: drifting light streaks inside the water
function k19waterLive(ctx, t) {
  ctx.save(); K.poly(ctx, K19WATERPTS, true); ctx.clip(); ctx.lineCap = 'round'; const r = K.rng(5);
  for (let i = 0; i < 26; i++) { const y = 670 + r() * 380, sp = 14 + r() * 20, L = 26 + r() * 40, x = 340 + ((r() * 700 + t * sp) % 700); ctx.globalAlpha = 0.4; ctx.strokeStyle = C.white; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y); ctx.stroke(); }
  ctx.restore();
}
// weeds on the bed (sway; part pushes them aside)
function k19weed(ctx, x, t, n = 4, seed = 6, h = 90) { const r = K.rng(seed), y = k19bedY(x) + 4; for (let i = 0; i < n; i++) { const bx = x + (i - n / 2) * 13 + r() * 6, hh = h * (0.7 + r() * 0.5), sw = 0.18 * Math.sin(t * 1.4 + i + seed);
  const pts = []; for (let k = 0; k <= 6; k++) { const u = k / 6; pts.push([bx + Math.sin(sw * u * 3 + u) * 14 * u, y - hh * u]); } ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 11; K.poly(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = GREEN2; ctx.lineWidth = 6; K.poly(ctx, pts, false); ctx.stroke(); ctx.restore(); } }
// the water tint re-drawn over everything under the surface
function k19waterTint(ctx, a = 0.35) { ctx.save(); ctx.globalAlpha *= a; K.poly(ctx, K19WATERPTS, true); ctx.fillStyle = K19WATER; ctx.fill(); ctx.restore(); }
function k19surface(ctx, t) {
  const pts = []; for (let x = 348; x <= 1010; x += 16) pts.push([x, K19SURF + 3 * Math.sin(x * 0.035 + t * 2.2)]);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 8; K.poly(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = C.white; ctx.lineWidth = 3.5; K.poly(ctx, pts, false); ctx.stroke(); ctx.restore();
}
// reeds in front (x0, n stalks), sway with t
function k19reeds(ctx, x0, n, t, seed = 3, base = 660) { const r = K.rng(seed); for (let i = 0; i < n; i++) { const bx = x0 + i * 14 + r() * 6, h = 110 + r() * 80, sw = 0.05 * Math.sin(t * 1.3 + i * 0.8 + seed), tx = bx + Math.sin(sw) * h, ty = base - Math.cos(sw) * h;
  seg(ctx, bx, base, tx, ty, 6, GREEN2, 3); if (i % 2 === 0) shape(ctx, [[tx - 6, ty + 4], [tx - 7, ty + 38], [tx + 7, ty + 38], [tx + 6, ty + 4]], '#8a5a2b', { lw: 3.5, seed: 90 + i }); } }
// the reflection of a figure on the water: flipped, faint, wobbling, clipped to a band under the surface
function k19reflect(ctx, t, draw, a = 0.25) { ctx.save(); ctx.beginPath(); ctx.rect(345, K19SURF + 4, 400, 260); ctx.clip(); ctx.globalAlpha *= a; ctx.translate(0, K19SURF * 2 - 40); ctx.scale(1, -1); ctx.translate(Math.sin(t * 3) * 3, 0); draw(ctx); ctx.restore(); }

// ---------- rockyHill: grey stone, ledge y 780 (x 300..760), spire to (900, 420), dead trunk, dry hollow ----------
const K19LEDGE = 780;
const K19ROCKPTS = [[-20, 1090], [120, 960], [230, 840], [300, K19LEDGE + 2], [420, K19LEDGE - 2], [560, K19LEDGE + 1], [700, K19LEDGE - 1], [760, K19LEDGE], [800, 690], [850, 560], [900, 420], [940, 470], [980, 600], [1020, 640], [1020, 1250], [-20, 1250]];
const k19hillLand = () => k19bake('hillLand', (x) => {
  // far ridges
  shape(x, [[-20, 700], [140, 610], [300, 650], [470, 590], [640, 640], [800, 600], [1020, 660], [1020, 900], [-20, 900]], '#8a6d74', { lw: 6, seed: 75, dot: '#6a4d5a', pitch: 10, rad: 0.3, da: 0.5 });
  shape(x, K19ROCKPTS, K19ROCK, { lw: 8, seed: 76, dot: K19ROCKD, pitch: 9, rad: 0.32, da: 0.55 });
  // ledge top light band and cracks
  shape(x, [[300, K19LEDGE + 2], [760, K19LEDGE], [752, K19LEDGE + 18], [306, K19LEDGE + 20]], '#c3c6ca', { lw: 0 });
  x.save(); x.strokeStyle = C.black; x.lineWidth = 4; x.lineCap = 'round'; const r = K.rng(31);
  for (let i = 0; i < 16; i++) { let px = 40 + r() * 940, py = Math.max(820, 840 + r() * 360); if (px > 760 && py < 700) continue; x.beginPath(); x.moveTo(px, py); for (let k = 0; k < 3; k++) { px += (r() - 0.5) * 50; py += 18 + r() * 24; x.lineTo(px, py); } x.stroke(); }
  // spire cracks
  x.beginPath(); x.moveTo(880, 470); x.lineTo(860, 560); x.lineTo(870, 640); x.moveTo(820, 640); x.lineTo(830, 720); x.stroke(); x.restore();
  // the dry cracked hollow
  shape(x, ell(400, K19LEDGE + 4, 74, 14, 24), '#c9a46a', { lw: 5, seed: 77 }); x.save(); x.strokeStyle = '#6e4620'; x.lineWidth = 3; for (const [a, b, c, d] of [[350, 782, 380, 788], [380, 788, 400, 780], [400, 780, 432, 790], [400, 780, 410, 774], [432, 790, 452, 784]]) { x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke(); } x.restore();
  // dead trunk at (700, 780)
  seg(x, 700, K19LEDGE, 690, K19LEDGE - 150, 14, '#7a5a3a', 5); seg(x, 692, K19LEDGE - 100, 650, K19LEDGE - 150, 8, '#7a5a3a', 4); seg(x, 690, K19LEDGE - 130, 730, K19LEDGE - 180, 7, '#7a5a3a', 4); seg(x, 668, K19LEDGE - 128, 652, K19LEDGE - 170, 5, '#7a5a3a', 3);
  // pebbles on the ledge
  for (let i = 0; i < 9; i++) { const px = 320 + r() * 420; shape(x, ell(px, K19LEDGE + 6, 7 + r() * 6, 5, 10), '#8d9198', { lw: 3, seed: 40 + i }); }
});
// boulders in the foreground (drawn over the cast)
function k19boulders(ctx) { for (const [bx, by, br] of [[90, 1150, 120], [300, 1200, 90], [760, 1180, 130], [960, 1120, 90]]) shape(ctx, ell(bx, by, br, br * 0.7, 24), '#8d9198', { lw: 7, seed: bx, dot: K19ROCKD, pitch: 9, rad: 0.3, da: 0.5 }); }
// skeleton places on the ledge (in the order they land: day 1 pair first)
const K19BONES = [[588, 774, 'small', 0.12, 1], [650, 792, 'round', -0.1, -1], [350, 776, 'slim', 0.05, 1], [452, 794, 'slim', -0.15, -1], [520, 776, 'round', 0.2, 1], [712, 778, 'slim', -0.05, -1], [398, 798, 'round', 0.1, -1], [548, 800, 'slim', -0.22, 1]];
// heat shimmer lines over the rock
function k19shimmer(ctx, t, a = 1) { ctx.save(); ctx.globalAlpha *= 0.35 * a; ctx.strokeStyle = '#ffe2b0'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const x0 = 150 + i * 140, y0 = 700 - (i % 2) * 30; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const yy = y0 - k * 9; ctx[k ? 'lineTo' : 'moveTo'](x0 + 6 * Math.sin(t * 4 + k * 0.9 + i), yy); } ctx.stroke(); } ctx.restore(); }

// ---------- skyFlight: day -> dusk sky, two cloud layers, a scrolling dry ground strip y 1000..1230 ----------
function k19flightSet(ctx, t, o) {
  const f = o.dusk || 0; sky(ctx, { preset: 'day', hills: [] }); if (f > 0.001) { ctx.save(); ctx.globalAlpha *= f; sky(ctx, { preset: 'dusk', hills: [] }); ctx.restore(); }
  ctx.fillStyle = SKY.day.base; ctx.save(); ctx.globalAlpha *= 1; ctx.fillStyle = f > 0.5 ? SKY.dusk.base : SKY.day.base; ctx.fillRect(0, 900, 1000, 120); ctx.restore();
  const sc = o.scroll || 0;
  for (let i = 0; i < 4; i++) { const x = 1200 - ((sc * 0.25 + i * 330) % 1320); cloudFlat(ctx, x, 260 + (i % 2) * 140, 1.0); }
  // far line of hills
  ctx.save(); ctx.fillStyle = mixHex('#2a62c9', '#a8261a', f); ctx.strokeStyle = C.black; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-20, 1010); for (let x = -20; x <= 1020; x += 20) ctx.lineTo(x, 975 - 25 * Math.abs(Math.sin((x + sc * 0.4) * 0.006))); ctx.lineTo(1020, 1010); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  // ground strip
  ctx.save(); ctx.beginPath(); ctx.rect(-20, 1000, 1040, 240); ctx.clip(); ctx.fillStyle = '#c98a3a'; ctx.fillRect(-20, 1000, 1040, 240);
  const tile = 260, k0 = Math.floor(sc / tile) - 1;
  for (let k = k0; k < k0 + 7; k++) { const r = K.rng(1000 + (k % 997 + 997) % 997), x0 = k * tile - sc; const cols = ['#d9a441', '#b5762a', '#e0b46a', '#c98a3a'];
    shape(ctx, [[x0, 1010 + r() * 20], [x0 + tile, 1008 + r() * 20], [x0 + tile - 30, 1240], [x0 - 30, 1240]], cols[Math.floor(r() * 4)], { lw: 5, seed: 300 + (k & 31), dot: '#8a5a2b', pitch: 10, rad: 0.25, da: 0.4 });
    for (let j = 0; j < 4; j++) { const sx = x0 + 20 + r() * 220, sy = 1050 + r() * 160; ctx.save(); ctx.strokeStyle = 'rgba(90,50,20,0.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx - 30, sy); ctx.lineTo(sx + 30, sy - 4); ctx.stroke(); ctx.restore(); }
    if (r() < 0.8) { const bx = x0 + 40 + r() * 180, by = 1080 + r() * 120; shape(ctx, ell(bx, by, 18 + r() * 10, 11, 12), STONE, { lw: 4, seed: 330 + (k & 15) }); }
    if (r() < 0.7) { const bx = x0 + 30 + r() * 200, by = 1060 + r() * 140; ctx.save(); ctx.strokeStyle = '#4a3a1a'; ctx.lineWidth = 4; for (let a = 0; a < 7; a++) { const an = -Math.PI + a / 6 * Math.PI; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(an) * 26, by + Math.sin(an) * 22); ctx.stroke(); } ctx.restore(); }
  }
  if (o.pond != null) { const px = o.pond; shape(ctx, ell(px, 1110, 120, 40, 24), K19WATER, { lw: 6, seed: 91, dot: '#1d5bd0', pitch: 8, rad: 0.3, da: 0.6 }); }
  ctx.restore();
}
