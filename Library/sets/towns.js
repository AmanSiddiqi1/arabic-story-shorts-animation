// ===== towns, rooms and roads (added 2026-11-16, round 2 of the planned assets): the six most-requested shared SETS =====
//   marketStreet  city street: skyline, shuttered house fronts, opening doors, palace facade (door, balcony window), stalls; palettes clear/dusk/cold, rain, alley
//   palaceHall    arched interior: variant 'palace' (open door arch, arches, window light, lamps, dais, throne, checker floor, carpet)
//                 and variant 'merchant' (door with leaf, shelves, low desk with coins, window pane with the time of day, treasure curtain, vault door)
//   desertRoad    long dune strip: parallax dune layers, road, palms (palmTree), milestones, low wall, front dune lip, city gate at one end, far city
//   hutRoom       poor one-room hut in cutaway: walls, roof slab with beam ends, door leaf, window onto the sky, hook with a hanging jar, mat, mattress, jug, lamp niche, dark state
//   villageYard   the KD-009 yard made shared: cottage (opening door, lit window), perch tree, forest row, keyed sun; yardLeaves() are the leaf clumps drawn in front
//   countryRoad   long road strip with named hiding places (tree, milestone, bush, low wall), a far house and an optional city edge; front pass for peeks
// Every set: set(ctx, o) draws in world units (ground / floor y 900) and RETURNS ITS ANCHORS (door x, ground y, seat spots, hiding places...).
// The same anchors without drawing: <set>Anchors(o); the defaults are the constants MARKET, HALL, MERCHANT, DESERT, HUT, VYARD, CROAD.
// Static parts are baked once per option set (bake()); only keyed parts are live: door open amounts, shutters, curtain, lamp flicker (o.t), rain (o.t), sun.
// Sky: o.preset ('day' | 'dawn' | 'dusk' | 'night') or o.u (time of day for skyCycle); o.sky = false skips the sky (draw your own first).
// Strips (w > 1000): pass o.camX (the camera's left world x) for parallax on the far layers; draw o.front = true after the cast for occluders.

// ---------- shared pieces ----------
const TOWN_WALLS = { clear: ['#f3e2b8', '#f2d27a', '#f0c987'], dusk: ['#f2b56a', '#e8a04a', '#f3c98a'], cold: ['#c9cfdc', '#d6d2e0', '#b9c2d6'] };
const TOWN_PAL = {
  clear: { sky: { preset: 'day' }, walls: TOWN_WALLS.clear, dot: C.red, line: ['#2a62c9', '#2457b8'], pave: '#e6c27a', paveDot: C.red, lit: 0, shutter: C.blue },
  dusk: { sky: { preset: 'dusk' }, walls: TOWN_WALLS.dusk, dot: C.red, line: ['#a8261a', '#7a1a12'], pave: '#d99a52', paveDot: '#a8261a', lit: 1, shutter: '#2457b8' },
  cold: { sky: { preset: 'day', base: '#7f93b8', dot: '#9aaccc', hills: [[150, 880, 260, '#5f6f96'], [560, 900, 300, '#4a5878'], [940, 880, 250, '#5f6f96']] }, walls: TOWN_WALLS.cold, dot: STONED, line: ['#5f6f96', '#4a5878'], pave: '#a9b0c4', paveDot: STONED, lit: 0, shutter: '#4a5878' },
};
// townBake(ctx, key, x, y, w, h, draw): bake the world rect (x, y, w, h) once and draw it (draw gets world coordinates)
function townBake(ctx, key, x, y, w, h, draw) { ctx.drawImage(bake('town:' + key, w, h, (c) => { c.translate(-x, -y); draw(c); }), x, y, w, h); }
// townArchPts(x0, x1, top, bottom, kind): closed outline of an opening: 'pointed' (two arcs), 'round' (half circle) or 'flat'; top = apex y
function townArchPts(x0, x1, top, bottom, kind = 'pointed', n = 12) {
  const mid = (x0 + x1) / 2, half = (x1 - x0) / 2, pts = [[x0, bottom]];
  if (kind === 'flat') pts.push([x0, top], [x1, top]);
  else if (kind === 'round') { const sy = top + half; for (let i = 0; i <= 2 * n; i++) { const a = Math.PI + i / (2 * n) * Math.PI; pts.push([mid + Math.cos(a) * half, sy + Math.sin(a) * half]); } }
  else { const R = (x1 - x0) * 0.8, aM = Math.acos((mid - x0 - R) / R), sy = top + R * Math.sin(aM);
    for (let i = 0; i <= n; i++) { const a = Math.PI - i / n * (Math.PI - aM); pts.push([x0 + R + Math.cos(a) * R, sy - Math.sin(a) * R]); }
    for (let i = n; i >= 0; i--) { const a = Math.PI - i / n * (Math.PI - aM); pts.push([x1 - R - Math.cos(a) * R, sy - Math.sin(a) * R]); } }
  pts.push([x1, bottom], [x0, bottom]); return pts;
}
// townWall(c, rect [x0, y0, x1, y1], holes [pts...], fill, {dot, pitch, rad, da}): a flat wall with openings cut out (even-odd), no outline
function townWall(c, r, holes, fill, o = {}) {
  const path = () => { c.beginPath(); c.rect(r[0], r[1], r[2] - r[0], r[3] - r[1]); for (const h of holes) { h.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); } };
  c.save(); path(); c.fillStyle = fill; c.fill('evenodd'); if (o.dot) { path(); c.fillStyle = dotPat(c, o.dot, o.pitch || 14, o.rad || 0.22); c.globalAlpha = o.da ?? 0.4; c.fill('evenodd'); } c.restore();
}
function townHills(ctx, w, cols, x0 = 0) { for (let k = 0; k * 1000 < w + 10; k++) SKY.day.hills.forEach(([bx, by, br], i) => { ctx.beginPath(); ctx.ellipse(x0 + bx + k * 1000, by, br, br * 0.5, 0, Math.PI, 0); ctx.fillStyle = cols[i]; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); }); }
// townSky(ctx, w, o, preset): the sky for a set; returns {night: 0..1, d: dayCycle data or null}
function townSky(ctx, w, o, preset = 'day') {
  if (o.sky === false) return { night: o.night || 0, d: null };
  if (o.u != null) { const d = skyCycle(ctx, o.u, { w, t: o.t || 0, hills: false }); if (o.hills !== false) townHills(ctx, w, d.hills.map((h) => h[3])); return { night: d.night, d }; }
  const p = typeof preset === 'string' ? { preset: o.preset || preset } : { ...preset, ...(o.preset ? { preset: o.preset } : {}) }, S = { ...SKY[p.preset || 'day'], ...p };
  sky(ctx, { ...p, w, hills: [] }); if (o.hills !== false) townHills(ctx, w, S.hills.map((h) => h[3]));
  return { night: p.preset === 'night' ? 1 : 0, d: null };
}
// townDim(ctx, x, y, w, h, a): night tint over the land (a 0..1)
function townDim(ctx, x, y, w, h, a) { if (a > 0.001) { ctx.save(); ctx.globalAlpha = 0.42 * a; ctx.fillStyle = NAVY2; ctx.fillRect(x, y, w, h); ctx.restore(); } }
// townDoor(ctx, x0, x1, top, bottom, open, o): a doorway with a wooden leaf hinged on o.hinge ('left' | 'right'); open 0..1 narrows the leaf as it swings in.
//   o: {arch: 'flat' | 'round' | 'pointed', inside(ctx) (drawn clipped in the opening), dark (NAVY2), wood (WOOD), paint (leaf colour), leafOnly, shut 0..1 (crossed planks + chain), lock, coin}
function townDoor(ctx, x0, x1, top, bottom, open = 0, o = {}) {
  const pts = townArchPts(x0, x1, top, bottom, o.arch || 'flat'), hr = o.hinge === 'right', lw = (x1 - x0) * Math.max(0, 1 - open);
  ctx.save(); K.poly(ctx, pts, true); ctx.clip();
  if (!o.leafOnly) { ctx.fillStyle = o.dark || NAVY2; ctx.fillRect(x0, top, x1 - x0, bottom - top); ctx.fillStyle = dotPat(ctx, '#1b3a8f', 10, 0.28); ctx.fillRect(x0, top, x1 - x0, bottom - top); if (o.inside) o.inside(ctx); }
  if (lw > 1) { const a = hr ? x1 - lw : x0, b = hr ? x1 : x0 + lw, sk = 8 * open, free = hr ? a : b, leaf = hr ? [[a, top - 10 + sk], [b, top - 10], [b, bottom], [a, bottom - sk]] : [[a, top - 10], [b, top - 10 + sk], [b, bottom - sk], [a, bottom]];
    shape(ctx, leaf, o.paint || o.wood || WOOD, { lw: 4, seed: 91, dot: C.black, pitch: 9, rad: 0.16, da: 0.35 });
    ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let k = 1; k < 4; k++) { const px = a + (b - a) * k / 4; ctx.beginPath(); ctx.moveTo(px, top); ctx.lineTo(px, bottom); ctx.stroke(); }
    if (lw > 20) { for (const fy of [0.3, 0.75]) seg(ctx, a + 3, top + (bottom - top) * fy, b - 3, top + (bottom - top) * fy, 7, '#4a5878', 2.5);
      if (open < 0.7) shape(ctx, ell(free + (hr ? 16 : -16), (top + bottom) / 2 + 20, 8, 8, 12), C.yellow, { lw: 3, seed: 92 });
      const cx = (a + b) / 2, cy = top + (bottom - top) * 0.52;
      if (o.coin) shape(ctx, ell(cx, cy - 40, 34, 34, 28), C.yellow, { lw: 5, seed: 93, dot: C.red, pitch: 8, rad: 0.2, da: 0.5 });
      if (o.lock) { ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy + 22, 14, Math.PI, 0); ctx.stroke(); shape(ctx, K.rectPts(cx - 20, cy + 22, 40, 34), '#4a5878', { lw: 4, seed: 94 }); } } }
  ctx.restore(); ink(ctx, pts.slice(1, -1), 7, 95);
  if (o.shut > 0) { ctx.save(); ctx.globalAlpha *= K.clamp(o.shut * 2); const m = (top + bottom) / 2;
    seg(ctx, x0 - 14, m - 90, x1 + 14, m + 60, 20, BARKY, 4); seg(ctx, x0 - 14, m + 60, x1 + 14, m - 90, 20, BARKY, 4);
    ctx.lineWidth = 6; ctx.strokeStyle = '#4a5878'; for (let i = 0; i < 9; i++) { const u = i / 8; ctx.beginPath(); ctx.ellipse(K.lerp(x0 + 6, x1 - 6, u), m - 15 + Math.sin(u * Math.PI) * 26, 9, 6, 0, 0, 7); ctx.stroke(); }
    shape(ctx, K.rectPts((x0 + x1) / 2 - 18, m + 8, 36, 30), '#4a5878', { lw: 4, seed: 96 }); ctx.restore(); }
}
const BARKY = '#c98a3a';
// townWindow(ctx, x, y, w, h, o): a window recess (dark, lit 0..1 or o.inside) with two shutter leaves; o.shutters 0 closed .. 1 open flat against the wall; o.arch, o.col (shutter colour), o.bars
function townWindow(ctx, x, y, w, h, o = {}) {
  const pts = townArchPts(x, x + w, y, y + h, o.arch || 'flat', 8), lit = o.lit || 0;
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = lit > 0 ? mixHex(NAVY2, '#ffd98a', lit) : NAVY2; ctx.fill(); ctx.clip(); if (lit < 1) { ctx.fillStyle = dotPat(ctx, '#1b3a8f', 9, 0.28); ctx.globalAlpha = 1 - lit; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1; } if (o.inside) o.inside(ctx); ctx.restore();
  if (o.bars) { for (let k = 1; k < 3; k++) seg(ctx, x + w * k / 3, y + 6, x + w * k / 3, y + h, 4, C.black, 0); }
  ink(ctx, pts.slice(1, -1).concat([[x + w, y + h], [x, y + h], [x, y + (o.arch && o.arch !== 'flat' ? h * 0.4 : 0)]]), 6, 97);
  const sh = o.shutters ?? 1; if (sh == null || o.noShutters) return; const a = sh * Math.PI, cw = Math.cos(a) * w / 2, col = o.col || C.blue;
  for (const sd of [-1, 1]) { const hx = sd < 0 ? x : x + w, ex = hx - sd * cw; if (Math.abs(cw) < 2) { seg(ctx, hx, y, hx, y + h, 4, col, 3); continue; }
    const q = [[hx, y], [ex, y + 4 * Math.sin(a)], [ex, y + h - 4 * Math.sin(a)], [hx, y + h]]; shape(ctx, q, col, { lw: 4, seed: 98 + sd, dot: C.black, pitch: 8, rad: 0.14, da: 0.3 });
    ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let k = 1; k < 4; k++) { const yy = y + h * k / 4; ctx.beginPath(); ctx.moveTo(hx, yy); ctx.lineTo(ex, yy); ctx.stroke(); } }
}
// rainStreaks(ctx, t, {x0: 0, w: 1000, h: 1230, amt: 1, seed: 3, slant: -0.28}): slanted rain, a pure function of t (draw after the cast for rain in front)
function rainStreaks(ctx, t, o = {}) {
  const amt = o.amt ?? 1; if (amt <= 0) return; const r = K.rng(o.seed ?? 3), w = o.w || 1000, h = o.h || 1230, x0 = o.x0 || 0, sl = o.slant ?? -0.28, n = Math.round(w * 0.16 * amt);
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,250,240,0.75)'; ctx.lineWidth = 4;
  for (let i = 0; i < n; i++) { const sx = x0 + r() * (w + 300), sp = 1300 + r() * 500, L = 40 + r() * 30, yy = ((r() * (h + 200) + t * sp) % (h + 200)) - 100, xx = sx + yy * sl;
    ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx - L * sl, yy - L); ctx.stroke(); }
  ctx.restore();
}
// hangingLamp(ctx, x, y, t, {lit: 1, chain: top y (0), s: 1}): brass lamp on a chain with a halftone glow; the glow flickers with t
function hangingLamp(ctx, x, y, t = 0, o = {}) {
  const s = o.s ?? 1, lit = o.lit ?? 1, fl = 1 + 0.05 * Math.sin(t * 13.1) + 0.03 * Math.sin(t * 7.3 + 1);
  if (lit > 0) { ctx.save(); ctx.globalAlpha = 0.3 * lit; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.36); ctx.beginPath(); ctx.arc(x, y + 20 * s, 150 * s * fl, 0, 7); ctx.fill(); ctx.globalAlpha = 0.16 * lit; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(x, y + 20 * s, 95 * s * fl, 0, 7); ctx.fill(); ctx.restore(); }
  seg(ctx, x, o.chain ?? 0, x, y - 30 * s, 3, '#4a5878', 2);
  shape(ctx, [[x - 10 * s, y - 32 * s], [x + 10 * s, y - 32 * s], [x + 30 * s, y - 6 * s], [x - 30 * s, y - 6 * s]], C.red, { lw: 4, seed: 101 });
  shape(ctx, [[x - 24 * s, y - 6 * s], [x + 24 * s, y - 6 * s], [x + 18 * s, y + 40 * s], [x, y + 54 * s], [x - 18 * s, y + 40 * s]], lit > 0 ? mixHex('#c98a3a', C.yellow, lit) : '#c98a3a', { lw: 4.5, seed: 102, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 });
}
// palmTree(ctx, x, baseY, {h: 570, lean: 20, fronds: 9, nuts: 2, s: 1, t, sway: 1}): ringed tapering trunk with a slight S lean, toothed fronds (sway with t), coconuts
function palmTree(ctx, x, baseY, o = {}) {
  const s = o.s ?? 1, H = (o.h ?? 570) * s, lean = (o.lean ?? 20) * s, n = 12, ax = (v) => x + lean * v * v * (3 - 2 * v) + 7 * s * Math.sin(v * Math.PI * 2), ay = (v) => baseY - H * v;
  for (let k = 0; k < n; k++) { const v0 = k / n, v1 = (k + 1) / n, w0 = K.lerp(56, 40, v0) * s / 2, w1 = K.lerp(56, 40, v1) * s / 2;
    shape(ctx, [[ax(v0) - w0, ay(v0) + 2], [ax(v0) + w0, ay(v0) + 2], [ax(v1) + w1 + 3 * s, ay(v1) + 4 * s], [ax(v1) - w1 - 3 * s, ay(v1) + 4 * s]], k % 2 ? WOOD : '#8a5a14', { lw: 4.5, seed: 110 + k }); }
  const hx = ax(1), hy = ay(1), nf = o.fronds ?? 9, L = 230 * s, sw = (o.sway ?? 1) * 0.05;
  for (let i = 0; i < nf; i++) { const u = nf > 1 ? i / (nf - 1) : 0.5, a = Math.PI * (1.02 + 0.96 * u) + sw * Math.sin((o.t || 0) * 1.3 + i * 1.7), droop = 0.55 + 0.35 * Math.abs(u - 0.5) * 2, Lf = L * (0.86 + 0.14 * Math.sin(i * 2.3));
    const P = (q) => [hx + Math.cos(a) * Lf * q, hy + Math.sin(a) * Lf * q + droop * Lf * q * q], up = [], dn = [];
    for (let k = 0; k <= 16; k++) { const q = k / 16, [px, py] = P(q), [qx, qy] = P(Math.min(1, q + 0.02)), dx = qx - px, dy = qy - py, l = Math.hypot(dx, dy) || 1, hw = 24 * s * Math.sin(Math.PI * Math.min(1, q * 1.1)) * (k % 2 ? 0.5 : 1);
      up.push([px - dy / l * hw, py + dx / l * hw]); dn.push([px + dy / l * hw, py - dx / l * hw]); }
    shape(ctx, up.concat(dn.reverse()), i % 2 ? GREEN : GREEND, { lw: 4, seed: 120 + i });
    ctx.save(); ctx.lineWidth = 3.5 * s; ctx.strokeStyle = C.black; ctx.beginPath(); for (let k = 0; k <= 12; k++) { const [px, py] = P(k / 12); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  for (let k = 0; k < (o.nuts ?? 2); k++) shape(ctx, ell(hx - 12 * s + k * 24 * s, hy + 18 * s, 13 * s, 13 * s, 14), '#7a4212', { lw: 4, seed: 130 + k });
  shape(ctx, ell(hx, hy, 18 * s, 13 * s, 14), GREEND, { lw: 4, seed: 133 });
}
// townCityEdge(c, x0, x1, {top: 520, gate: centre x, gw: 200, gh: 300, domes: true, tower: true, col}): a crenellated mud-brick city wall with a gate arch, domes and a tower behind
function townCityEdge(c, x0, x1, o = {}) {
  const top = o.top ?? 520, g = o.gate ?? (x0 + x1) / 2, gw = o.gw ?? 200, gh = o.gh ?? 300, col = o.col || '#e8b25a', GR = 900;
  if (o.tower !== false) { const tx = K.lerp(x0, x1, 0.78); shape(c, [[tx - 50, GR], [tx - 50, top - 260], [tx + 50, top - 260], [tx + 50, GR]], col, { lw: 6, seed: 140, dot: C.red, pitch: 12, rad: 0.2, da: 0.4 }); shape(c, [[tx - 62, top - 260], [tx - 62, top - 290], [tx + 62, top - 290], [tx + 62, top - 260]], col, { lw: 5, seed: 141 }); shape(c, K.rectPts(tx - 12, top - 230, 24, 50), NAVY2, { lw: 4, seed: 142 }); }
  if (o.domes !== false) for (const [f, r] of [[0.22, 90], [0.55, 70]]) { const dx = K.lerp(x0, x1, f); shape(c, [[dx - r, top + 10], [dx - r, top - 50], [dx + r, top - 50], [dx + r, top + 10]], TOWN_WALLS.clear[0], { lw: 5, seed: 143 }); const d = ell(dx, top - 50, r, r * 1.05, 32).filter(([, y]) => y <= top - 49); shape(c, d.concat([[dx - r, top - 50]]), C.white, { lw: 6, seed: 144, dot: C.blue, pitch: 10, rad: 0.2, da: 0.4 }); seg(c, dx, top - 50 - r * 1.05, dx, top - 74 - r * 1.05, 4, C.yellow, 2.5); }
  const wall = [[x0, GR + 4], [x0, top]]; for (let x = x0; x < x1; x += 80) { const m = Math.min(x1, x + 40); wall.push([x, top], [x, top - 34], [m, top - 34], [m, top]); } wall.push([x1, top], [x1, GR + 4]);
  shape(c, wall, col, { lw: 7, seed: 145, dot: C.red, pitch: 12, rad: 0.2, da: 0.4 });
  c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(20,20,20,0.5)'; for (let y = top + 50, k = 0; y < GR - 10; y += 50, k++) { c.beginPath(); c.moveTo(x0 + 6, y); c.lineTo(x1 - 6, y); c.stroke(); for (let x = x0 + (k % 2) * 45; x < x1; x += 90) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 50); c.stroke(); } } c.restore();
  if (gw > 0) { const gp = townArchPts(g - gw / 2, g + gw / 2, GR - gh, GR, 'pointed'); shape(c, townArchPts(g - gw / 2 - 26, g + gw / 2 + 26, GR - gh - 26, GR, 'pointed'), C.yellow, { lw: 6, seed: 146, dot: C.red, pitch: 9, rad: 0.2, da: 0.4 }); shape(c, gp, NAVY2, { lw: 7, seed: 147, dot: '#1b3a8f', pitch: 10, rad: 0.26 }); }
}
// townFarCity(c, x, groundY, s, col): a tiny city silhouette (domes, towers, flat roofs) on the horizon, about 240 x 120 at s 1
function townFarCity(c, x, gy, s = 1, col = '#a8741a') {
  const r = K.rng(17); let px = x - 120 * s; const pts = [[px, gy]];
  while (px < x + 120 * s) { const w = (22 + r() * 22) * s, h = (30 + r() * 50) * s; pts.push([px, gy - h], [px + w, gy - h]); px += w; } pts.push([x + 120 * s, gy]);
  shape(c, pts, col, { lw: 4, seed: 150 }); shape(c, ell(x - 30 * s, gy - 80 * s, 30 * s, 32 * s, 20).filter(([, y]) => y <= gy - 79 * s), col, { lw: 4, seed: 151 }); seg(c, x + 60 * s, gy, x + 60 * s, gy - 120 * s, 12 * s, col, 3);
}
// townProp(c, kind, x, o): small street dressing on the ground (feet at y 900 unless o.y): 'crate' (o.w 180, o.top 820), 'barrel' (o.top 790), 'pots', 'sacks', 'mat' (o.w 240), 'basket', 'hay'
function townProp(c, kind, x, o = {}) {
  const GR = o.y ?? 900;
  if (kind === 'crate') { const w = o.w ?? 180, top = o.top ?? GR - 80; shape(c, K.rectPts(x - w / 2, top, w, GR - top), BARKY, { lw: 5, seed: 160, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 }); seg(c, x - w / 2 + 8, top + 8, x + w / 2 - 8, GR - 8, 6, WOOD, 2); seg(c, x - w / 2 + 8, GR - 8, x + w / 2 - 8, top + 8, 6, WOOD, 2); }
  else if (kind === 'barrel') { const top = o.top ?? GR - 110, w = o.w ?? 90; shape(c, [[x - w / 2 + 8, top], [x + w / 2 - 8, top], [x + w / 2, (top + GR) / 2], [x + w / 2 - 8, GR], [x - w / 2 + 8, GR], [x - w / 2, (top + GR) / 2]], '#a8741a', { lw: 5, seed: 161, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 }); for (const f of [0.22, 0.78]) seg(c, x - w / 2 + 4, K.lerp(top, GR, f), x + w / 2 - 4, K.lerp(top, GR, f), 5, '#4a5878', 2); }
  else if (kind === 'pots') { for (const [dx, h, col] of [[-40, 70, '#c8481a'], [10, 90, '#e8742a'], [55, 55, '#a8261a']]) shape(c, [[x + dx - 14, GR - h], [x + dx + 14, GR - h], [x + dx + 26, GR - h * 0.55], [x + dx + 18, GR], [x + dx - 18, GR], [x + dx - 26, GR - h * 0.55]], col, { lw: 4.5, seed: 162 + h, dot: C.black, pitch: 8, rad: 0.15, da: 0.3 }); }
  else if (kind === 'sacks') { for (const dx of [-38, 38]) { shape(c, [[x + dx - 34, GR], [x + dx - 38, GR - 50], [x + dx - 28, GR - 74], [x + dx + 28, GR - 74], [x + dx + 38, GR - 50], [x + dx + 34, GR]], '#e6c27a', { lw: 5, seed: 165, dot: '#a8741a', pitch: 8, rad: 0.16, da: 0.4 }); shape(c, ell(x + dx, GR - 74, 28, 9, 16), o.fill || C.white, { lw: 4, seed: 166, dot: '#d6d2e0', pitch: 5, rad: 0.3 }); } }
  else if (kind === 'mat') { const w = o.w ?? 240; shape(c, K.rectPts(x - w / 2, GR - 12, w, 14), C.red, { lw: 4, seed: 167 }); for (let k = 0; k < w; k += 18) seg(c, x - w / 2 + k + 6, GR - 10, x - w / 2 + k + 6, GR, 3, C.yellow, 0); }
  else if (kind === 'basket') { shape(c, [[x - 40, GR - 50], [x + 40, GR - 50], [x + 30, GR], [x - 30, GR]], '#d9a441', { lw: 4.5, seed: 168, dot: '#7a4212', pitch: 7, rad: 0.2, da: 0.5 }); }
  else if (kind === 'hay') { shape(c, [[x - 90, GR], [x - 70, GR - 46], [x - 20, GR - 66], [x + 40, GR - 60], [x + 86, GR - 30], [x + 96, GR]], C.yellow, { lw: 5, seed: 169, dot: '#e8a04a', pitch: 8, rad: 0.24, da: 0.6 }); c.save(); c.lineWidth = 3; c.strokeStyle = '#a8741a'; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(x - 70 + k * 18, GR - 10); c.lineTo(x - 60 + k * 18, GR - 44); c.stroke(); } c.restore(); }
}
// marketStall(ctx, o): {x (centre) | x0, x1, w: 320, top: counter top 780, awning: top 520, front: awning front edge 590, cols: [stripe A, stripe B],
//   kind: 'fruit' | 'cloth' | 'seed' | 'animal' | 'jars' | 'pots' | 'empty', state: 'open' | 'closed' (awning rolled, goods gone)}. Returns {x0, x1, counter, awning}.
function marketStall(ctx, o = {}) {
  const w = o.w ?? 320, x0 = o.x0 ?? (o.x ?? 500) - w / 2, x1 = o.x1 ?? x0 + w, top = o.top ?? 780, aw = o.awning ?? 520, fr = o.front ?? aw + 70, cols = o.cols || [C.red, C.white], GR = 900, kind = o.kind || 'fruit', closed = o.state === 'closed', c = ctx;
  for (const px of [x0 + 12, x1 - 12]) seg(c, px, GR, px, aw, 9, WOOD, 3.5);
  if (kind === 'jars' && !closed) for (let b = 0; b < 3; b++) { const by = top - 70 - b * 80; seg(c, x0 + 30, by, x1 - 30, by, 9, BARKY, 3); for (let j = 0; j < 3; j++) { const jx = K.lerp(x0 + 70, x1 - 70, j / 2); shape(c, [[jx - 14, by - 4], [jx - 18, by - 34], [jx - 10, by - 44], [jx + 10, by - 44], [jx + 18, by - 34], [jx + 14, by - 4]], [C.blue, '#3f9d4a', '#e8742a'][(b + j) % 3], { lw: 3.5, seed: 170 + j }); } }
  shape(c, [[x0 + 4, top], [x1 - 4, top], [x1 - 4, GR], [x0 + 4, GR]], BARKY, { lw: 6, seed: 171, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 });
  shape(c, [[x0 + 4, top - 14], [x1 - 4, top - 14], [x1 - 4, top + 4], [x0 + 4, top + 4]], WOOD, { lw: 5, seed: 172 });
  c.save(); K.poly(c, [[x0 + 20, top + 20], [x1 - 20, top + 20], [x1 - 20, GR - 14], [x0 + 20, GR - 14]], true); c.clip(); for (let k = 0, px = x0 + 20; px < x1; px += 30, k++) { c.fillStyle = cols[k % 2]; c.fillRect(px, top + 20, 30, GR - top); } c.restore(); ink(c, K.rectPts(x0 + 20, top + 20, x1 - x0 - 40, GR - top - 34), 4, 173);
  if (!closed) {
    if (kind === 'fruit') { const r = K.rng(9); for (let i = 0; i < 14; i++) { const fx = x0 + 40 + r() * (w - 80), fy = top - 18 - (i > 8 ? 26 : 0); shape(c, ell(fx, fy, 17, 16, 14), [C.red, C.yellow, '#e8742a', GREEN][i % 4], { lw: 3.5, seed: 174 + i }); } }
    else if (kind === 'cloth') { for (let i = 0; i < 4; i++) { const bx = x0 + 30 + i * (w - 60) / 4; for (let k = 0; k < 3; k++) shape(c, K.rectPts(bx, top - 22 - k * 20, (w - 60) / 4 - 10, 20), [C.yellow, C.red, C.blue, '#3f9d4a'][(i + k) % 4], { lw: 3.5, seed: 180 + k }); } }
    else if (kind === 'seed') { townProp(c, 'sacks', x0 + w * 0.36, { y: top - 12 }); const sx = x0 + w * 0.78; seg(c, sx, top - 14, sx, top - 90, 4, '#4a5878', 2); seg(c, sx - 40, top - 90, sx + 40, top - 90, 4, '#4a5878', 2); for (const d of [-40, 40]) shape(c, ell(sx + d, top - 52, 22, 8, 16), C.yellow, { lw: 3.5, seed: 185 }); }
    else if (kind === 'animal') { townProp(c, 'hay', x0 + w * 0.3, { y: top - 12 }); townProp(c, 'basket', x0 + w * 0.75, { y: top - 12 }); townProp(c, 'basket', x1 + 50); seg(c, x0 + 30, GR, x0 + 30, GR - 140, 12, WOOD, 3.5); }
    else if (kind === 'pots') townProp(c, 'pots', (x0 + x1) / 2, { y: top - 12 });
  }
  if (closed) { shape(c, [[x0 - 16, aw], [x1 + 16, aw], [x1 + 16, aw + 34], [x0 - 16, aw + 34]], cols[0], { lw: 6, seed: 186 }); c.save(); c.lineWidth = 4; c.strokeStyle = C.black; for (let px = x0; px < x1; px += 30) { c.beginPath(); c.moveTo(px, aw + 2); c.lineTo(px + 10, aw + 32); c.stroke(); } c.restore(); }
  else { const awn = [[x0 - 26, fr], [x0 + 8, aw], [x1 - 8, aw], [x1 + 26, fr]]; c.save(); K.poly(c, awn, true); c.clip(); for (let k = 0, px = x0 - 30; px < x1 + 30; px += 36, k++) { c.fillStyle = cols[k % 2]; c.beginPath(); c.moveTo(px, fr + 30); c.lineTo(px + 18, aw); c.lineTo(px + 54, aw); c.lineTo(px + 36, fr + 30); c.fill(); } c.restore(); ink(c, awn.concat([awn[0]]), 6, 187);
    for (let k = 0, px = x0 - 26; px < x1 + 26; px += 36, k++) { const sc = ell(px + 18, fr, 18, 16, 14).filter(([, y]) => y >= fr - 1); shape(c, sc, cols[k % 2], { lw: 4.5, seed: 188 }); } }
  return { x0, x1, counter: top, awning: aw, front: fr };
}

// ---------- 1. marketStreet ----------
// marketStreet(ctx, o): a city street, ground y 900. o: {w: 1000, palette: 'clear' | 'dusk' | 'cold', u (skyCycle instead of the palette sky), sky: false,
//   houses: [{x0, x1, top, col: 0..2, door: [x0, x1, top, arch] | null, windows: [[x, y, w, h, arch], ...]}] (default: generated to fill up to the palace),
//   palace: true | false | 'lit' | 'shut' | {x0, x1, top, cx, door: [x0, x1, top], balcony: [cx, cy]} (default right end), lit: 0..1 balcony light, shut: 0..1 chain and planks,
//   palaceDoor: 0..1 open, doors: [open per house door], shutters: 0..1 (all) or [per house], windowsLit: 0..1 (dusk default 1),
//   stalls: [marketStall options], props: [[kind, x, opts]], alley: true (high blank walls, dark arch, washing line, no palace), rain: 0..1, t, skyline: false, seed}
// Returns the anchors (see marketStreetAnchors). Stand people at y 900; the palace door stands on its steps: P.y = palace.door.bottom.
function marketStreetAnchors(o = {}) {
  const w = o.w || 1000, r = K.rng(o.seed ?? 11), A = { ground: 900, w, houses: [], doors: [], stalls: [] };
  let pal = o.palace; if (pal === undefined || pal === 'lit' || pal === 'shut') pal = !o.alley;
  const P = pal ? { x0: w - 470, x1: w + 10, top: 300, ...(typeof pal === 'object' ? pal : {}) } : null;
  if (P) { P.cx = P.cx ?? P.x0 + 220; P.door = P.door ? { x0: P.door[0], x1: P.door[1], top: P.door[2] } : { x0: P.cx - 70, x1: P.cx + 70, top: 560 }; P.door.bottom = 872; P.door.cx = (P.door.x0 + P.door.x1) / 2; P.balcony = P.balcony ? { cx: P.balcony[0], cy: P.balcony[1] } : { cx: P.cx, cy: 400 }; P.balcony.sill = P.balcony.cy + 62; P.steps = [P.door.cx - 120, P.door.cx + 120, 872]; }
  A.palace = P;
  let H = o.houses;
  if (!H && o.alley) H = [{ x0: -10, x1: 490, top: 120, col: 0, windows: [] }, { x0: 498, x1: w + 10, top: 150, col: 2, door: [760, 880, 560, 'pointed'], windows: [] }];
  if (!H) { H = []; const end = P ? P.x0 - 8 : w + 10; let x = -10, i = 0;
    while (x < end - 60) { const hw = 230 + Math.floor(r() * 50), x1 = end - x - hw < 120 ? end : x + hw, hs = { x0: x, x1, top: 470 + Math.floor(r() * 70), col: i % 3 };
      if (i % 2 === 0) { hs.door = [x + 40, x + 130, 650, 'round']; hs.windows = [[x1 - 112, 570, 80, 96]]; } else hs.windows = [[x + 34, 570, 78, 92], [x1 - 112, 570, 78, 92]];
      H.push(hs); x = x1 + 8; i++; } }
  A.houses = H.map((h) => ({ ...h }));
  H.forEach((h, i) => { if (h.door) A.doors.push({ house: i, x0: h.door[0], x1: h.door[1], top: h.door[2], arch: h.door[3] || 'round', cx: (h.door[0] + h.door[1]) / 2 }); });
  A.stalls = (o.stalls || []).map((s) => { const sw = s.w ?? 320, x0 = s.x0 ?? (s.x ?? 500) - sw / 2; return { x0, x1: s.x1 ?? x0 + sw, cx: x0 + sw / 2, counter: s.top ?? 780, awning: s.awning ?? 520 }; });
  return A;
}
function marketStreet(ctx, o = {}) {
  const A = marketStreetAnchors(o), w = A.w, GR = 900, pn = o.palette || 'clear', PL = TOWN_PAL[pn] || TOWN_PAL.clear, P = A.palace, t = o.t || 0;
  townSky(ctx, w, o, PL.sky);
  const key = JSON.stringify(['ms', w, pn, o.houses || null, o.alley || 0, o.seed ?? 11, o.skyline ?? 1, P && [P.x0, P.x1, P.top, P.cx, P.door.x0, P.door.x1, P.door.top, P.balcony.cx, P.balcony.cy], o.windowsLit ?? PL.lit]);
  townBake(ctx, key, 0, 0, w, 1230, (c) => {
    if (o.skyline !== false && !o.alley) { const r = K.rng(5); let px = -20; while (px < w + 20) { const bw = 70 + r() * 60, bt = 360 + r() * 170; shape(c, [[px, 900], [px, bt], [px + bw, bt], [px + bw, 900]], PL.line[Math.floor(r() * 2)], { lw: 5, seed: 41 }); c.fillStyle = 'rgba(13,34,96,0.55)'; for (let wy = bt + 18; wy < 560; wy += 34) for (let wx = px + 14; wx < px + bw - 14; wx += 28) if (r() > 0.6) c.fillRect(wx, wy, 10, 14); px += bw + 6; }
      for (const f of [0.27, 0.68]) { const dx = w * f, by = 420; shape(c, [[dx - 70, 900], [dx - 70, by], [dx + 70, by], [dx + 70, 900]], PL.line[1], { lw: 5, seed: 42 }); const d = ell(dx, by, 70, 80, 30).filter(([, y]) => y <= by + 1); shape(c, d.concat([[dx - 70, by]]), PL.line[0], { lw: 6, seed: 43 }); seg(c, dx, by - 80, dx, by - 104, 4, C.yellow, 2.5); } }
    // paving
    shape(c, [[-10, GR], [w + 10, GR], [w + 10, 1240], [-10, 1240]], PL.pave, { lw: 8, seed: 44, dot: PL.paveDot, pitch: 12, rad: 0.18, da: 0.4 });
    c.save(); c.lineWidth = 3.5; c.strokeStyle = 'rgba(20,20,20,0.55)'; const rows = [GR, 945, 1005, 1085, 1190, 1240]; for (let k = 1; k < rows.length - 1; k++) { c.beginPath(); c.moveTo(-10, rows[k]); c.lineTo(w + 10, rows[k]); c.stroke(); }
    for (let k = 0; k < rows.length - 1; k++) { const step = 60 + k * 35; for (let x = (k % 2) * step / 2; x < w + 10; x += step) { c.beginPath(); c.moveTo(x, rows[k] + 3); c.lineTo(x, rows[k + 1] - 3); c.stroke(); } } c.restore();
    // house fronts
    A.houses.forEach((h, i) => { const col = (o.alley ? ['#c9a46a', '#b98f55', '#d4b27a'] : PL.walls)[h.col ?? i % 3], holes = [];
      if (h.door) holes.push(townArchPts(h.door[0], h.door[1], h.door[2], GR, h.door[3] || 'round'));
      shape(c, [[h.x0, GR + 2], [h.x0, h.top], [h.x1, h.top], [h.x1, GR + 2]], col, { lw: 7, seed: 45 + i, dot: PL.dot, pitch: 12, rad: 0.15, da: 0.35 });
      if (o.alley) { c.save(); c.globalAlpha = 0.18; c.fillStyle = NAVY2; c.fillRect(h.x0, h.top, h.x1 - h.x0, GR - h.top); c.restore(); }
      else { shape(c, [[h.x0 - 8, h.top - 14], [h.x1 + 8, h.top - 14], [h.x1 + 8, h.top + 8], [h.x0 - 8, h.top + 8]], mixHex(col, '#7a4212', 0.35), { lw: 5, seed: 46 }); for (let bx = h.x0 + 20; bx < h.x1 - 10; bx += 46) shape(c, ell(bx, h.top + 22, 6, 6, 10), WOOD, { lw: 3, seed: 47 }); }
      if (h.door) ink(c, townArchPts(h.door[0] - 12, h.door[1] + 12, h.door[2] - 12, GR, h.door[3] || 'round').slice(1, -1), 9, 48);
      for (const wd of h.windows || []) { const lit = o.windowsLit ?? PL.lit; c.save(); K.poly(c, townArchPts(wd[0], wd[0] + wd[2], wd[1], wd[1] + wd[3], wd[4] || 'flat', 8), true); c.fillStyle = lit ? mixHex(NAVY2, '#ffd98a', lit) : NAVY2; c.fill(); c.restore(); seg(c, wd[0] - 10, wd[1] + wd[3] + 6, wd[0] + wd[2] + 10, wd[1] + wd[3] + 6, 8, mixHex(col, '#7a4212', 0.35), 3); } });
    // palace facade
    if (P) { const cr = []; for (let x = P.x0; x < P.x1; x += 60) cr.push([x, P.top], [x, P.top - 30], [x + 30, P.top - 30], [x + 30, P.top]); const body = [[P.x0, GR + 2], ...cr, [P.x1, P.top], [P.x1, GR + 2]];
      shape(c, body, '#fff3d6', { lw: 8, seed: 50, dot: C.blue, pitch: 13, rad: 0.18, da: 0.35 });
      shape(c, K.rectPts(P.x0 + 8, P.top + 30, P.x1 - P.x0 - 16, 26), C.red, { lw: 5, seed: 51, dot: C.yellow, pitch: 9, rad: 0.22, da: 0.6 });
      for (const px of [P.x0 + 30, P.x1 - 40]) if (px < w - 10) shape(c, K.rectPts(px - 18, P.top + 56, 36, GR - P.top - 56), '#f2d27a', { lw: 5, seed: 52, dot: C.red, pitch: 10, rad: 0.18, da: 0.35 });
      const D = P.door; shape(c, townArchPts(D.x0 - 30, D.x1 + 30, D.top - 34, D.bottom, 'pointed'), C.yellow, { lw: 7, seed: 53, dot: C.red, pitch: 9, rad: 0.2, da: 0.45 });
      shape(c, K.rectPts(P.steps[0] + 20, 858, P.steps[1] - P.steps[0] - 40, 14), STONE2, { lw: 5, seed: 54 }); shape(c, K.rectPts(P.steps[0], 872, P.steps[1] - P.steps[0], 28), STONE, { lw: 5, seed: 55, dot: STONED, pitch: 9, rad: 0.18, da: 0.4 });
      const B = P.balcony; shape(c, townArchPts(B.cx - 75, B.cx + 75, B.cy - 92, B.cy + 62, 'pointed'), C.yellow, { lw: 6, seed: 56, dot: C.red, pitch: 9, rad: 0.2, da: 0.4 });
      shape(c, K.rectPts(B.cx - 95, B.sill, 190, 18), STONE2, { lw: 5, seed: 57 }); shape(c, [[B.cx - 80, B.sill + 18], [B.cx + 80, B.sill + 18], [B.cx + 50, B.sill + 50], [B.cx - 50, B.sill + 50]], STONE, { lw: 5, seed: 58 }); }
    if (o.alley) { c.save(); c.lineWidth = 3; c.strokeStyle = C.black; c.beginPath(); c.moveTo(80, 260); c.quadraticCurveTo(500, 330, 920, 300); c.stroke(); c.restore(); }
  });
  // live: doors, shutters, palace door and balcony
  A.doors.forEach((d, i) => townDoor(ctx, d.x0, d.x1, d.top, GR, Array.isArray(o.doors) ? (o.doors[i] || 0) : (o.doors || 0), { arch: d.arch, paint: o.alley ? '#7a4212' : WOOD, dark: o.alley ? '#0a1a4a' : NAVY2 }));
  if (!o.alley) A.houses.forEach((h, i) => (h.windows || []).forEach((wd) => townWindow(ctx, wd[0], wd[1], wd[2], wd[3], { arch: wd[4], lit: o.windowsLit ?? PL.lit, shutters: Array.isArray(o.shutters) ? (o.shutters[i] ?? 1) : (o.shutters ?? 1), col: PL.shutter })));
  if (P) { const shut = o.shut ?? (o.palace === 'shut' ? 1 : 0), lit = o.lit ?? (o.palace === 'lit' ? 1 : (o.palace === 'shut' ? 0 : PL.lit * 0.8)), D = P.door, B = P.balcony;
    townDoor(ctx, D.x0, D.x1, D.top, D.bottom, (o.palaceDoor || 0) * (1 - shut), { arch: 'pointed', paint: '#a8261a', shut });
    if (lit > 0) { ctx.save(); ctx.globalAlpha = 0.35 * lit; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.36); ctx.beginPath(); ctx.arc(B.cx, B.cy, 150, 0, 7); ctx.fill(); ctx.restore(); }
    townWindow(ctx, B.cx - 55, B.cy - 60, 110, 122, { arch: 'pointed', lit, shutters: shut > 0.5 ? 0 : (o.balconyShutters ?? 1), col: '#a8261a' }); }
  if (o.alley) { const t2 = t; [[230, 278], [470, 292], [700, 298]].forEach(([cx, cy], i) => { const a = 0.08 * Math.sin(t2 * 1.6 + i * 1.3); ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); shape(ctx, [[-50, 0], [50, 0], [46, 110 + i * 10], [-46, 110 + i * 10]], [C.red, C.white, C.yellow][i], { lw: 5, seed: 59 + i, dot: [C.yellow, C.blue, C.red][i], pitch: 9, rad: 0.2, da: 0.4 }); ctx.restore(); }); }
  if ((o.stalls && o.stalls.length) || (o.props && o.props.length) || o.alley) townBake(ctx, 'msfront' + JSON.stringify([w, o.stalls || [], o.props || [], o.alley || 0]), 0, 300, w, 930, (c) => {
    (o.stalls || []).forEach((s) => marketStall(c, s)); for (const [k, x, po] of o.props || (o.alley ? [['crate', 500, { w: 180, top: 820 }], ['barrel', 660, { top: 790 }]] : [])) townProp(c, k, x, po); });
  if (o.rain > 0) { ctx.save(); ctx.globalAlpha = 0.16 * o.rain; ctx.fillStyle = '#4a5878'; ctx.fillRect(0, 0, w, 1230); ctx.restore(); rainStreaks(ctx, t, { w, amt: o.rain }); }
  return A;
}

// ---------- 2. palaceHall (variant 'merchant' = merchantHouse) ----------
// palaceHall(ctx, o): arched interior, world 1000 x 1230, floor y 900. o: {variant: 'palace' | 'merchant', wall: 'paper' | 'blue' | 'ochre',
//   door: {x0, x1, top, arch, leaf} | false, doorOpen: 0..1 (leaf doors), outside(ctx) (drawn in the door and window openings), behind(ctx) (actors outside, drawn before the room),
//   arches: [[x0, x1, top], ...], window: {x0, x1, top, bottom} | false, u (time of day in the window pane: dayCycle), light: 0..1 (window light shaft),
//   lamps: [[x, y], ...], t (lamp flicker), dais: [x0, x1, top] | false, throne: x | false, cushions: [x, ...] (on the dais), carpet: true,
//   merchant: shelves: [{x0, x1, y, goods: 'jars' | 'cloth'}], desk: [x0, x1, top] | false, curtain: 0..1 open | null (hides a treasure alcove), treasure: true,
//   vault: {x0, x1, top, open} (a heavy treasury door with a coin emblem and lock), stools: [x, ...] (Library seatStool)}
// Anchors: floor, door {x0, x1, top, cx}, dais, throne {x, seat, sitY (pass as P.y with sit: 1, seat: 'bench')}, window, lamps, desk, curtain, vault, stools.
function palaceHallAnchors(o = {}) {
  const m = o.variant === 'merchant', A = { floor: 900, variant: m ? 'merchant' : 'palace' };
  A.door = o.door === false ? null : { ...(m ? { x0: 60, x1: 200, top: 580, arch: 'round', leaf: true } : { x0: 40, x1: 250, top: 480, arch: 'pointed', leaf: false }), ...(o.door || {}) }; if (A.door) A.door.cx = (A.door.x0 + A.door.x1) / 2;
  A.arches = o.arches || (m ? [[470, 650, 300]] : [[300, 430, 330], [470, 600, 330], [640, 770, 330]]);
  A.window = o.window === false ? null : { ...(m ? { x0: 510, x1: 610, top: 330, bottom: 470 } : { x0: 820, x1: 930, top: 330, bottom: 520 }), ...(o.window || {}) };
  A.lamps = o.lamps || (m ? [[730, 240]] : [[380, 250], [930, 250]]);
  A.dais = o.dais === false || (m && !o.dais) ? null : (() => { const d = o.dais || [560, 900, 860]; return { x0: d[0], x1: d[1], top: d[2] }; })();
  const th = o.throne === false || (m && o.throne == null) ? null : (typeof o.throne === 'number' ? o.throne : (A.dais ? (A.dais.x0 + A.dais.x1) / 2 : 730)); A.throne = th == null ? null : { x: th, seat: 800, back: 520, sitY: 848 };
  A.cushions = (o.cushions || (A.dais && !m ? [A.dais.x0 + 50] : [])).map((x) => ({ x, y: A.dais ? A.dais.top : 900 }));
  if (m) { A.shelves = o.shelves || [{ x0: 240, x1: 440, y: 440, goods: 'jars' }, { x0: 240, x1: 440, y: 560, goods: 'cloth' }];
    A.desk = o.desk === false ? null : (() => { const d = o.desk || [410, 630, 800]; return { x0: d[0], x1: d[1], top: d[2], cx: (d[0] + d[1]) / 2 }; })();
    A.curtain = o.curtain == null ? null : { x0: 790, x1: 970, top: 330, rod: 380 }; }
  A.vault = o.vault ? { x0: 80, x1: 230, top: 560, ...o.vault } : null;
  A.stools = (o.stools || []).map((x) => ({ x, sitY: 900 }));
  return A;
}
function palaceHall(ctx, o = {}) {
  const A = palaceHallAnchors(o), m = A.variant === 'merchant', GR = 900, t = o.t || 0, wallK = o.wall || (m ? 'ochre' : 'paper');
  const WC = { paper: ['#fff3d6', C.blue, '#efdcae', '#e2c68a'], blue: [C.blue, '#3f7be6', NAVY, '#1b3a8f'], ochre: ['#e8b25a', C.red, '#c98a3a', '#a8741a'] }[wallK];
  // outside: through the door and the window
  if (A.door) { ctx.save(); K.poly(ctx, townArchPts(A.door.x0, A.door.x1, A.door.top, GR, A.door.arch), true); ctx.clip();
    if (o.outside) o.outside(ctx); else townBake(ctx, 'hallout' + m, 0, 400, 300, 520, (c) => { c.fillStyle = m ? '#3f7be6' : C.blue; c.fillRect(0, 400, 300, 520); c.fillStyle = dotPat(c, '#3f7be6', 13, 0.3); c.fillRect(0, 400, 300, 520);
      if (m) shape(c, [[-10, 700], [300, 640], [300, 920], [-10, 920]], TOWN_WALLS.clear[0], { lw: 5, seed: 200, dot: C.red, pitch: 12, rad: 0.15, da: 0.3 });
      shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], SANDL, { lw: 5, seed: 201, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 }); if (!m) { seg(c, 150, 870, 150, 760, 12, WOOD, 4); seg(c, 132, 772, 168, 772, 8, WOOD, 3); } });
    ctx.restore(); }
  if (A.window) { const W = A.window; ctx.save(); K.poly(ctx, townArchPts(W.x0, W.x1, W.top, W.bottom, 'pointed'), true); ctx.clip();
    if (o.outside) o.outside(ctx); else if (o.u != null) { const d = dayCycle(o.u); ctx.fillStyle = mixHex(SKY[d.a].base, SKY[d.b].base, d.f); ctx.fillRect(W.x0, W.top, W.x1 - W.x0, W.bottom - W.top);
      const map = (p) => [K.lerp(W.x0, W.x1, (p[0] - 40) / 920), K.lerp(W.top + 26, W.bottom + 30, (p[1] - 140) / 720)];
      if (d.stars > 0) { ctx.save(); ctx.globalAlpha = d.stars; stars(ctx, { w: 1000, h: 1230, n: 300, seed: 6 }); ctx.restore(); }
      if (d.sun) { const [sx, sy] = map(d.sun); shape(ctx, ell(sx, sy, 22, 22, 20), C.yellow, { lw: 4, seed: 202, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 }); }
      if (d.moon) { const [mx, my] = map(d.moon); shape(ctx, ell(mx, my, 16, 16, 18), C.yellow, { lw: 4, seed: 237 }); } }
    else { ctx.fillStyle = m ? '#ff9a2a' : '#ffd98a'; ctx.fillRect(W.x0, W.top, W.x1 - W.x0, W.bottom - W.top); ctx.fillStyle = dotPat(ctx, C.white, 10, 0.25); ctx.fillRect(W.x0, W.top, W.x1 - W.x0, W.bottom - W.top); }
    ctx.restore(); }
  if (o.behind) o.behind(ctx);
  const key = JSON.stringify(['hall', A, wallK, o.carpet ?? !m, o.treasure ?? true]);
  townBake(ctx, key, 0, 0, 1000, 1230, (c) => {
    const holes = []; if (A.door) holes.push(townArchPts(A.door.x0, A.door.x1, A.door.top, GR, A.door.arch)); if (A.window) holes.push(townArchPts(A.window.x0, A.window.x1, A.window.top, A.window.bottom, 'pointed'));
    if (A.vault) holes.push(townArchPts(A.vault.x0, A.vault.x1, A.vault.top, GR, 'round'));
    townWall(c, [0, 0, 1000, GR], holes, WC[0], { dot: WC[1], pitch: 14, rad: 0.2, da: wallK === 'blue' ? 0.5 : 0.35 });
    shape(c, K.rectPts(-10, 0, 1020, 70), wallK === 'blue' ? NAVY2 : '#7a4212', { lw: 6, seed: 203, dot: C.black, pitch: 9, rad: 0.16, da: 0.3 }); for (let bx = 40; bx < 1000; bx += 120) shape(c, ell(bx, 52, 12, 12, 12), WOOD, { lw: 4, seed: 204 });
    shape(c, K.rectPts(-10, 150, 1020, 30), C.red, { lw: 5, seed: 205, dot: C.yellow, pitch: 9, rad: 0.24, da: 0.6 });
    const winHole = A.window ? [townArchPts(A.window.x0, A.window.x1, A.window.top, A.window.bottom, 'pointed')] : [];
    for (const [a0, a1, at] of A.arches) { const ap = townArchPts(a0, a1, at, GR, 'pointed'); c.save(); K.poly(c, ap, true); c.clip(); townWall(c, [a0, at, a1, GR], winHole, WC[2], { dot: WC[3], pitch: 12, rad: 0.2, da: 0.5 }); c.restore(); ink(c, ap.slice(1, -1), 7, 206); }
    if (A.window) { const W = A.window; ink(c, townArchPts(W.x0 - 14, W.x1 + 14, W.top - 18, W.bottom, 'pointed').slice(1, -1), 8, 207); seg(c, W.x0 - 20, W.bottom + 8, W.x1 + 20, W.bottom + 8, 12, STONE2, 4); seg(c, (W.x0 + W.x1) / 2, W.top + 10, (W.x0 + W.x1) / 2, W.bottom, 4, C.black, 0); }
    if (A.door) shape(c, townArchPts(A.door.x0 - 22, A.door.x1 + 22, A.door.top - 26, GR, A.door.arch).concat(townArchPts(A.door.x0, A.door.x1, A.door.top, GR, A.door.arch).reverse()), C.yellow, { lw: 6, seed: 208, dot: C.red, pitch: 9, rad: 0.2, da: 0.45 });
    if (A.vault) shape(c, townArchPts(A.vault.x0 - 24, A.vault.x1 + 24, A.vault.top - 24, GR, 'round').concat(townArchPts(A.vault.x0, A.vault.x1, A.vault.top, GR, 'round').reverse()), STONE, { lw: 6, seed: 209, dot: STONED, pitch: 9, rad: 0.2, da: 0.45 });
    // floor: checker in perspective
    const vx = 500, vy = 580, X = (xi, yy) => vx + (xi - vx) * (yy - vy) / (GR - vy), rows = []; let y = GR, h = 30; while (y < 1230) { rows.push([y, Math.min(1240, y + h)]); y += h; h *= 1.5; }
    const FA = m ? ['#e8a04a', '#fff3d6'] : [C.yellow, '#fff3d6']; c.save(); c.beginPath(); c.rect(0, GR, 1000, 340); c.clip();
    rows.forEach(([ya, yb], ri) => { for (let k = -8; k <= 8; k++) { const xa = vx + k * 110 - 55, xb = xa + 110; c.fillStyle = FA[(ri + k + 100) % 2]; K.poly(c, [[X(xa, ya), ya], [X(xb, ya), ya], [X(xb, yb), yb], [X(xa, yb), yb]], true); c.fill(); } });
    c.lineWidth = 3; c.strokeStyle = C.black; for (const [ya] of rows) { c.beginPath(); c.moveTo(0, ya); c.lineTo(1000, ya); c.stroke(); } for (let k = -8; k <= 8; k++) { const xa = vx + k * 110 - 55; c.beginPath(); c.moveTo(X(xa, GR), GR); c.lineTo(X(xa, 1240), 1240); c.stroke(); }
    c.restore(); seg(c, -10, GR, 1010, GR, 3, C.black, 2);
    if ((o.carpet ?? !m) && A.dais && A.door) shape(c, [[A.door.x1, GR + 4], [A.dais.x0, GR + 4], [A.dais.x0 + 30, GR + 64], [A.door.x1 - 40, GR + 64]], C.red, { lw: 5, seed: 210, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.5 });
    if (m && A.curtain) { const Q = A.curtain; shape(c, townArchPts(Q.x0, Q.x1, Q.top, GR, 'pointed'), NAVY2, { lw: 7, seed: 211, dot: '#1b3a8f', pitch: 10, rad: 0.26 });
      if (o.treasure !== false) { shape(c, [[Q.x0 + 20, GR], [Q.x0 + 40, 820], [(Q.x0 + Q.x1) / 2, 790], [Q.x1 - 40, 820], [Q.x1 - 20, GR]], C.yellow, { lw: 5, seed: 212, dot: '#e8742a', pitch: 7, rad: 0.3, da: 0.6 }); const cx = (Q.x0 + Q.x1) / 2; shape(c, K.rectPts(cx - 60, 770, 120, 70), WOOD, { lw: 5, seed: 213, dot: C.black, pitch: 8, rad: 0.15, da: 0.3 }); shape(c, [[cx - 64, 770], [cx - 56, 730], [cx + 56, 730], [cx + 64, 770]], '#a8261a', { lw: 5, seed: 214 }); shape(c, K.rectPts(cx - 10, 760, 20, 22), C.yellow, { lw: 3.5, seed: 215 }); } } });
  // furniture in front of the wall (baked, separate so the vault and curtain leaves sit behind it)
  townBake(ctx, 'hallf' + JSON.stringify([A.dais, A.throne, A.cushions, A.shelves || 0, A.desk || 0, A.stools]), 0, 300, 1000, 700, (c) => {
    if (A.dais) { const D = A.dais; shape(c, [[D.x0, GR], [D.x0, D.top], [D.x1, D.top], [D.x1, GR]], C.red, { lw: 6, seed: 216, dot: '#a8261a', pitch: 9, rad: 0.25, da: 0.6 }); shape(c, K.rectPts(D.x0, D.top, D.x1 - D.x0, 10), C.yellow, { lw: 4, seed: 217 }); }
    if (A.throne) { const T = A.throne, x = T.x; shape(c, [[x - 80, T.seat], [x - 84, T.back + 60], [x - 50, T.back + 14], [x, T.back], [x + 50, T.back + 14], [x + 84, T.back + 60], [x + 80, T.seat]], C.yellow, { lw: 7, seed: 218, dot: C.red, pitch: 9, rad: 0.22, da: 0.5 });
      shape(c, townArchPts(x - 46, x + 46, T.back + 40, T.seat - 10, 'pointed'), C.red, { lw: 5, seed: 219, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
      shape(c, K.rectPts(x - 96, T.seat, 192, 22), C.red, { lw: 5, seed: 220 }); for (const sd of [-1, 1]) shape(c, K.rectPts(x + sd * 96 - (sd > 0 ? 22 : 0), T.seat - 50, 22, 50 + 22), C.yellow, { lw: 5, seed: 221 });
      for (const sd of [-1, 1]) seg(c, x + sd * 80, T.seat + 22, x + sd * 80, A.dais ? A.dais.top : GR, 10, C.yellow, 3); }
    for (const q of A.cushions) shape(c, [[q.x - 50, q.y], [q.x - 46, q.y - 30], [q.x + 46, q.y - 30], [q.x + 50, q.y]], C.yellow, { lw: 5, seed: 222, dot: C.red, pitch: 8, rad: 0.2, da: 0.5 });
    for (const s of A.shelves || []) { seg(c, s.x0, s.y, s.x1, s.y, 10, BARKY, 3.5); for (const bx of [s.x0 + 20, s.x1 - 20]) seg(c, bx, s.y + 6, bx - 10, s.y + 30, 6, BARKY, 2.5);
      const n = 4; for (let j = 0; j < n; j++) { const jx = K.lerp(s.x0 + 30, s.x1 - 30, j / (n - 1)); if (s.goods === 'cloth') { shape(c, [[jx - 22, s.y - 4], [jx - 22, s.y - 70], [jx + 22, s.y - 70], [jx + 22, s.y - 4]], [C.red, C.blue, C.yellow, '#3f9d4a'][j % 4], { lw: 4, seed: 223 + j, dot: C.white, pitch: 7, rad: 0.18, da: 0.4 }); shape(c, ell(jx, s.y - 70, 22, 7, 14), C.white, { lw: 3, seed: 227 }); }
        else shape(c, [[jx - 16, s.y - 5], [jx - 22, s.y - 40], [jx - 12, s.y - 56], [jx + 12, s.y - 56], [jx + 22, s.y - 40], [jx + 16, s.y - 5]], ['#c8481a', C.blue, '#e8742a', '#3f9d4a'][j % 4], { lw: 4, seed: 228 + j }); } }
    if (A.desk) { const D = A.desk; shape(c, K.rectPts(D.x0, D.top, D.x1 - D.x0, 18), BARKY, { lw: 5, seed: 232 }); for (const lx of [D.x0 + 16, D.x1 - 16]) seg(c, lx, D.top + 18, lx, GR, 10, WOOD, 3.5);
      for (const [dx, n] of [[-60, 4], [-30, 6], [40, 3]]) for (let k = 0; k < n; k++) shape(c, ell(D.cx + dx, D.top - 6 - k * 9, 16, 6, 14), C.yellow, { lw: 3, seed: 233 }); shape(c, [[D.cx + 60, D.top - 4], [D.cx + 100, D.top - 4], [D.cx + 100, D.top - 26], [D.cx + 60, D.top - 26]], C.white, { lw: 4, seed: 234 }); }
    for (const s of A.stools) seatStool(c, s.x, s.sitY);
  });
  // live: door leaf, vault, curtain, light shaft, lamps
  if (A.door && A.door.leaf) townDoor(ctx, A.door.x0, A.door.x1, A.door.top, GR, o.doorOpen || 0, { arch: A.door.arch, leafOnly: true });
  if (A.vault) townDoor(ctx, A.vault.x0, A.vault.x1, A.vault.top, GR, A.vault.open || 0, { arch: 'round', paint: '#7a4212', coin: true, lock: true, inside: (c) => { shape(c, [[A.vault.x0, GR], [A.vault.x0 + 30, 820], [(A.vault.x0 + A.vault.x1) / 2, 790], [A.vault.x1 - 30, 820], [A.vault.x1, GR]], C.yellow, { lw: 4, seed: 235, dot: '#e8742a', pitch: 7, rad: 0.3, da: 0.6 }); } });
  if (A.curtain) { const Q = A.curtain, op = K.clamp(o.curtain), cw = (Q.x1 - Q.x0) * (1 - 0.78 * op), x0 = Q.x1 - cw, n = 6;
    for (let k = 0; k < n; k++) { const a = x0 + cw * k / n, b = x0 + cw * (k + 1) / n; shape(ctx, [[a, Q.rod], [b, Q.rod], [b + (k % 2 ? 4 : -4), GR - 4], [a + (k % 2 ? -4 : 4), GR - 4]], k % 2 ? C.red : '#c81d14', { lw: 4.5, seed: 236 + k, dot: C.yellow, pitch: 9, rad: 0.18, da: 0.45 }); }
    seg(ctx, Q.x0 - 20, Q.rod, Q.x1 + 20, Q.rod, 8, C.yellow, 3); }
  const LT = o.light ?? (o.u != null ? 1 - dayCycle(o.u).night : 1); if (A.window && LT > 0) { const W = A.window, L = LT, sd = (W.x0 + W.x1) / 2 > 500 ? -1 : 1, sh = [[W.x0, W.bottom], [W.x1, W.bottom], [W.x1 + sd * 220 + (sd < 0 ? 0 : 140), 1060], [W.x0 + sd * 220 - (sd < 0 ? 140 : 0), 1060]];
    ctx.save(); K.poly(ctx, sh, true); ctx.globalAlpha = 0.16 * L; ctx.fillStyle = '#ffd98a'; ctx.fill(); ctx.globalAlpha = 0.3 * L; ctx.fillStyle = dotPat(ctx, C.white, 10, 0.25); ctx.fill(); ctx.restore(); }
  A.lamps.forEach(([lx, ly], i) => hangingLamp(ctx, lx, ly, t + i * 1.7, { lit: o.lampsLit ?? 1, chain: 70 }));
  return A;
}

// ---------- 3. desertRoad ----------
// desertRoad(ctx, o): long dune strip, ground y 900. o: {w: 2400, preset | u | sky: false, sun: [x, y] | false (default [w - 450, 170] in day/dawn presets), t,
//   camX: camera left x (parallax: far dunes 0.4, mid 0.7), road: true (sand track y 900..960 with ruts), milestones: [x] (default every 500), palms: [x] | [[x, h, lean]],
//   thorns: [x], rocks: [x], wall: [x0, x1, top] (a low mud wall: the hiding place), city: 'left' | 'right' | null (gate at that end), farCity: x | null,
//   lip: {x0, x1, crest: [x, y]} (a front dune lip to rise from behind), frontPalms: [x] (wipe palms), front: true (draw only the front pieces, after the cast)}
function desertRoadAnchors(o = {}) {
  const w = o.w || 2400, A = { ground: 900, w };
  A.milestones = o.milestones || (o.road === false ? [] : Array.from({ length: Math.floor((w - 100) / 500) }, (_, i) => 500 * (i + 1) - 20));
  A.palms = (o.palms || [760, 1640, 2200].filter((x) => x < w - 60)).map((p) => (Array.isArray(p) ? { x: p[0], h: p[1] ?? 520, lean: p[2] ?? 20 } : { x: p, h: 520, lean: 20 }));
  A.city = o.city ? { side: o.city, x0: o.city === 'left' ? -10 : w - 620, x1: o.city === 'left' ? 620 : w + 10, gate: o.city === 'left' ? 330 : w - 330, gw: 200, gh: 300, top: 520 } : null;
  A.wall = o.wall ? { x0: o.wall[0], x1: o.wall[1], top: o.wall[2] ?? 770 } : null;
  A.lip = o.lip ? { x0: 1450, x1: w + 10, crest: [1560, 850], ...o.lip } : null;
  A.frontPalms = o.frontPalms || []; A.thorns = o.thorns || []; A.rocks = o.rocks || []; A.farCity = o.farCity ?? null;
  return A;
}
function desertRoad(ctx, o = {}) {
  const A = desertRoadAnchors(o), w = A.w, GR = 900, cx = o.camX || 0;
  if (o.front) { for (const x of A.frontPalms) palmTree(ctx, x, GR + 40, { h: 760, lean: -30, s: 1.2, t: o.t, nuts: 0 });
    if (A.lip) { const L = A.lip; shape(ctx, [[L.x0, GR + 2], [L.crest[0] - 40, L.crest[1] + 10], L.crest, [L.crest[0] + 120, L.crest[1] + 6], [L.x1, L.crest[1] + 20], [L.x1, GR + 2]], '#edc65a', { lw: 7, seed: 300, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 }); }
    if (A.wall && o.wallFront) desertWall(ctx, A.wall);
    return A; }
  const sk = townSky(ctx, w, { ...o, hills: false }, 'day'), pre = o.preset || 'day';
  if (o.sun !== false && o.u == null && (pre === 'day' || pre === 'dawn')) { const s = o.sun || [w - 450, 170]; sun(ctx, s[0], s[1], o.t || 0); }
  const dune = (c, base, amp, seed, col, dotc, da) => { const n = nz(seed), pts = [[-10, 940]]; for (let x = -10; x <= w + 10; x += 20) pts.push([x, base - amp * (0.5 + 0.5 * n.n2(x * 0.0026, seed)) - amp * 0.35 * Math.sin(x * 0.0061 + seed)]); pts.push([w + 10, 940]);
    shape(c, pts, col, { lw: 6, seed }); c.save(); K.poly(c, pts, true); c.clip(); c.fillStyle = dotPat(c, dotc, 10, 0.26); c.globalAlpha = da; for (let i = 1; i < pts.length - 2; i++) if (pts[i + 1][1] > pts[i][1]) c.fillRect(pts[i][0], pts[i][1] - 4, 20, 940 - pts[i][1]); c.restore(); };
  ctx.save(); ctx.translate(cx * 0.6, 0); townBake(ctx, 'dfar' + JSON.stringify([w, A.farCity, pre]), 0, 420, w, 520, (c) => { if (A.farCity != null) townFarCity(c, A.farCity, 690, 0.9); dune(c, 700, 90, 301, '#e0a13a', C.red, 0.55); }); ctx.restore();
  ctx.save(); ctx.translate(cx * 0.3, 0); townBake(ctx, 'dmid' + w, 0, 560, w, 380, (c) => dune(c, 830, 60, 302, '#edc65a', '#e2701a', 0.5)); ctx.restore();
  townBake(ctx, 'dnear' + JSON.stringify([A.milestones, A.palms, A.city, A.wall, A.thorns, A.rocks, o.road ?? true]), 0, 0, w, 1230, (c) => {
    if (A.city) townCityEdge(c, A.city.x0, A.city.x1, { gate: A.city.gate, gw: A.city.gw, gh: A.city.gh, top: A.city.top });
    for (const p of A.palms) palmTree(c, p.x, GR + 4, { h: p.h, lean: p.lean, t: 0, sway: 0 });
    const n = nz(303), pts = [[-10, 1240], [-10, 884]]; for (let x = -10; x <= w + 10; x += 20) pts.push([x, 884 + 6 * n.n2(x * 0.01, 3)]); pts.push([w + 10, 884], [w + 10, 1240]);
    shape(c, pts, SANDL, { lw: 7, seed: 304, dot: C.red, pitch: 12, rad: 0.16, da: 0.35 });
    c.save(); c.lineWidth = 3.5; c.strokeStyle = '#c98a3a'; c.lineCap = 'round'; const r = K.rng(7); for (let i = 0; i < w / 40; i++) { const x = r() * w, y = 990 + r() * 220; c.beginPath(); c.arc(x, y + 20, 26, 4.2, 5.2); c.stroke(); } c.restore();
    if (o.road !== false) { shape(c, [[-10, GR + 2], [w + 10, GR + 2], [w + 10, 960], [-10, 960]], '#e6c27a', { lw: 0, dot: '#a8741a', pitch: 9, rad: 0.16, da: 0.4 }); c.save(); c.setLineDash([26, 14]); c.lineWidth = 5; c.strokeStyle = '#a8741a'; for (const ry of [925, 948]) { c.beginPath(); c.moveTo(0, ry); c.lineTo(w, ry); c.stroke(); } c.restore(); }
    for (const x of A.thorns) { c.save(); c.lineWidth = 5; c.strokeStyle = '#7a4212'; c.lineCap = 'round'; for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.15 + 0.7 * k / 6); c.beginPath(); c.moveTo(x, GR); c.lineTo(x + Math.cos(a) * 70, GR + Math.sin(a) * 60); c.stroke(); } c.restore(); }
    for (const x of A.rocks) shape(c, [[x - 60, GR + 4], [x - 44, GR - 50], [x + 10, GR - 70], [x + 56, GR - 36], [x + 62, GR + 4]], STONE, { lw: 6, seed: 305, dot: STONED, pitch: 9, rad: 0.2, da: 0.45 });
    for (const x of A.milestones) desertMilestone(c, x);
    if (A.wall && !o.wallFront) desertWall(c, A.wall);
  });
  townDim(ctx, 0, 420, w, 820, sk.night);
  return A;
}
function desertMilestone(c, x, GR = 900) { shape(c, [[x - 30, GR + 4], [x - 30, GR - 56], [x - 20, GR - 76], [x + 20, GR - 76], [x + 30, GR - 56], [x + 30, GR + 4]], STONE2, { lw: 5, seed: 306, dot: STONED, pitch: 8, rad: 0.18, da: 0.4 }); seg(c, x - 14, GR - 46, x + 14, GR - 46, 3, C.black, 0); seg(c, x - 14, GR - 30, x + 10, GR - 30, 3, C.black, 0); }
function desertWall(c, W, GR = 900) { shape(c, [[W.x0, GR + 4], [W.x0 + 6, W.top + 8], [W.x0 + 30, W.top], [W.x1 - 30, W.top + 4], [W.x1 - 4, W.top + 12], [W.x1, GR + 4]], '#c98a3a', { lw: 7, seed: 307, dot: '#7a4212', pitch: 10, rad: 0.2, da: 0.45 });
  c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(20,20,20,0.5)'; for (let y = W.top + 34, k = 0; y < GR; y += 34, k++) { c.beginPath(); c.moveTo(W.x0 + 8, y); c.lineTo(W.x1 - 8, y); c.stroke(); } c.restore(); }

// ---------- 4. hutRoom ----------
// hutRoom(ctx, o): poor one-room hut in cutaway, world 1000 x 1230, floor y 900 (KD-015 plan). Walls x 110..890 (26 thick), roof slab y 210..250 with six beam ends.
//   o: {palette: 'day' | 'dusk' | 'night', u (sky through the window and around the hut: skyCycle), sky: false, door: 0..1 open, doorSide: 'left' | 'right', doorY: 620 (opening top),
//   window: [x0, y0, w, h] | false (default [690, 400, 140, 140]), hook: [x, y] | false, jar: true (a jar hanging on the hook), jarSwing: radians, mat: [x0, x1] | false,
//   mattress: {x0, x1, head: 'right' | 'left'}, jug: x, shelf: [x0, x1, y], peg: [x, y], niche: [x, y] | false, lamp: 0..1 (lamp in the niche lit), lampAt: [x, y] (a lamp elsewhere, e.g. on a stool),
//   stool: x (Library seatStool), dark: 0..1 (navy room, the lamp keeps a warm circle, moonlight under the window), t (flicker), layer: 'back' | 'front' (cast between)}
// Anchors: floor, walls, roof, door {x0, x1, top, side}, window, hook, niche, lamp, mat, mattress {x0, x1, head, lieX}, jug, stool.
function hutRoomAnchors(o = {}) {
  const A = { floor: 900, walls: [110, 890], thick: 26, roof: [210, 250] }, side = o.doorSide || 'left', wx = side === 'left' ? 110 : 864;
  A.door = { side, x0: wx, x1: wx + 26, top: o.doorY ?? 620, bottom: 900, inner: side === 'left' ? 136 : 864 };
  const W = o.window === false ? null : (o.window || [690, 400, 140, 140]); A.window = W && { x0: W[0], y0: W[1], x1: W[0] + W[2], y1: W[1] + W[3] };
  A.hook = o.hook === false ? null : (o.hook || [360, 250]); A.niche = o.niche === false ? null : (o.niche || [600, 560]);
  A.lamp = o.lampAt || (A.niche ? [A.niche[0], A.niche[1] + 30] : null);
  A.mat = o.mat === false ? null : (o.mat || [240, 480]);
  A.mattress = o.mattress ? { head: 'right', ...o.mattress } : null; if (A.mattress) A.mattress.lieX = (A.mattress.x0 + A.mattress.x1) / 2 + (A.mattress.head === 'right' ? -10 : 10);
  A.jug = o.jug ?? null; A.shelf = o.shelf || null; A.peg = o.peg || null; A.stool = o.stool ?? null;
  return A;
}
const HUT_PAL = { day: { wall: '#e8b25a', dot: C.blue, sec: '#b0692a', sky: 'day' }, dusk: { wall: '#f08a3a', dot: C.red, sec: '#a8541a', sky: 'dusk' }, night: { wall: '#e8b25a', dot: C.blue, sec: '#b0692a', sky: 'night', dark: 0.6 } };
function hutRoom(ctx, o = {}) {
  const A = hutRoomAnchors(o), pn = o.palette || 'day', PL = HUT_PAL[pn] || HUT_PAL.day, GR = 900, t = o.t || 0, lay = o.layer;
  if (lay !== 'front') {
    townSky(ctx, 1000, o, PL.sky); ground(ctx);
    townBake(ctx, 'hutback' + JSON.stringify([pn, A.window, A.niche, A.mat, A.mattress, A.shelf, A.peg, A.hook]), 0, 200, 1000, 760, (c) => {
      const holes = A.window ? [K.rectPts(A.window.x0, A.window.y0, A.window.x1 - A.window.x0, A.window.y1 - A.window.y0)] : [];
      townWall(c, [110, 250, 890, GR], holes, PL.wall, { dot: PL.dot, pitch: 14, rad: 0.2, da: 0.35 });
      shape(c, K.rectPts(96, GR - 2, 808, 34), '#c98a3a', { lw: 6, seed: 400, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 });
      if (A.window) { const W = A.window; ink(c, K.rectPts(W.x0, W.y0, W.x1 - W.x0, W.y1 - W.y0), 8, 401); seg(c, W.x0 - 14, W.y1 + 6, W.x1 + 14, W.y1 + 6, 10, WOOD, 3.5); seg(c, W.x0 - 6, W.y0 - 8, W.x1 + 6, W.y0 - 8, 8, WOOD, 3); }
      if (A.niche) { const [nx, ny] = A.niche; shape(c, townArchPts(nx - 36, nx + 36, ny - 50, ny + 46, 'round'), mixHex(PL.wall, '#7a4212', 0.45), { lw: 6, seed: 402, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.4 }); }
      if (A.shelf) { const [s0, s1, sy] = A.shelf; seg(c, s0, sy, s1, sy, 10, BARKY, 3.5); shape(c, [[s0 + 20, sy - 5], [s0 + 70, sy - 5], [s0 + 60, sy - 30], [s0 + 30, sy - 30]], '#c8481a', { lw: 4, seed: 403 }); shape(c, ell(s1 - 50, sy - 20, 26, 16, 16).filter(([, y]) => y <= sy - 4), '#e8742a', { lw: 4, seed: 404 }); }
      if (A.peg) seg(c, A.peg[0], A.peg[1], A.peg[0] + 18, A.peg[1] - 10, 9, WOOD, 3);
      if (A.mat) { const [m0, m1] = A.mat; shape(c, K.rectPts(m0, GR - 12, m1 - m0, 14), C.yellow, { lw: 4, seed: 405 }); for (let k = m0 + 14; k < m1; k += 22) seg(c, k, GR - 10, k, GR, 3, C.red, 0); }
      if (A.mattress) { const M = A.mattress, hx = M.head === 'right' ? M.x1 - 46 : M.x0 + 46; shape(c, [[M.x0, GR], [M.x0 + 6, GR - 36], [M.x1 - 6, GR - 36], [M.x1, GR]], C.white, { lw: 5, seed: 406, dot: C.blue, pitch: 9, rad: 0.2, da: 0.4 }); seg(c, M.x0 + 10, GR - 18, M.x1 - 10, GR - 18, 2, C.red, 1); shape(c, ell(hx, GR - 46, 42, 16, 20), '#fff3d6', { lw: 4.5, seed: 407 }); }
      if (A.hook) { seg(c, A.hook[0], A.hook[1], A.hook[0], A.hook[1] + 22, 4, '#4a5878', 2); c.save(); c.lineWidth = 5; c.strokeStyle = C.black; c.beginPath(); c.arc(A.hook[0] + 7, A.hook[1] + 24, 7, 0, Math.PI); c.stroke(); c.restore(); }
    });
    if (A.hook && o.jar) { const [hx, hy] = A.hook; ctx.save(); ctx.translate(hx, hy + 24); ctx.rotate(o.jarSwing || 0); seg(ctx, 0, 0, 0, 70, 3, '#a8741a', 1.5); shape(ctx, [[-16, 70], [16, 70], [36, 110], [30, 150], [0, 164], [-30, 150], [-36, 110]], '#c8481a', { lw: 5, seed: 408, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 }); shape(ctx, ell(0, 70, 17, 5, 12), '#7a4212', { lw: 3, seed: 409 }); ctx.restore(); }
    if (A.jug != null) { const x = A.jug; shape(ctx, [[x - 18, GR], [x - 30, GR - 34], [x - 14, GR - 62], [x - 10, GR - 76], [x + 10, GR - 76], [x + 14, GR - 62], [x + 30, GR - 34], [x + 18, GR]], '#e8742a', { lw: 4.5, seed: 410, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 }); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x + 26, GR - 50, 13, -1.4, 1.4); ctx.stroke(); ctx.restore(); }
    if (A.stool != null) seatStool(ctx, A.stool, GR);
    if (A.lamp) { const [lx, ly] = A.lamp, on = o.lamp ?? 0, fl = Math.sin(t * 15) * 2; shape(ctx, [[lx - 22, ly], [lx + 26, ly - 4], [lx + 16, ly - 16], [lx - 18, ly - 16]], '#c8481a', { lw: 4, seed: 411 });
      if (on > 0) { ctx.save(); ctx.globalAlpha = on; shape(ctx, [[lx + 18, ly - 16], [lx + 12 + fl, ly - 46], [lx + 28, ly - 18]], C.yellow, { lw: 3, seed: 412 }); ctx.restore(); } }
  }
  if (lay !== 'back') {
    townBake(ctx, 'hutfront' + JSON.stringify([pn, A.door]), 80, 200, 840, 710, (c) => {
      for (const [x0, x1] of [[110, 136], [864, 890]]) { const isDoor = x0 === A.door.x0; shape(c, K.rectPts(x0, 250, x1 - x0, (isDoor ? A.door.top : GR) - 250), PL.sec, { lw: 5, seed: 413, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.45 }); if (isDoor) seg(c, x0 - 6, A.door.top + 6, x1 + 6, A.door.top + 6, 10, WOOD, 3); }
      shape(c, [[90, 210], [910, 210], [910, 250], [90, 250]], '#c98a3a', { lw: 7, seed: 414, dot: '#7a4212', pitch: 9, rad: 0.2, da: 0.45 }); shape(c, [[96, 210], [904, 210], [900, 200], [100, 198]], C.yellow, { lw: 4, seed: 415 });
      for (let k = 0; k < 6; k++) { const bx = K.lerp(160, 840, k / 5); shape(c, ell(bx, 230, 14, 14, 16), WOOD, { lw: 4, seed: 416 + k }); c.save(); c.lineWidth = 2.5; c.strokeStyle = C.black; c.beginPath(); c.arc(bx, 230, 6, 0, 7); c.stroke(); c.restore(); } });
    const D = A.door, op = K.clamp(o.door || 0), lw = 26 * (1 - op), lt = D.top + 6;
    if (lw > 0.5) shape(ctx, D.side === 'left' ? K.rectPts(D.inner - lw, lt, lw, GR - lt) : K.rectPts(D.inner, lt, lw, GR - lt), WOOD, { lw: 4, seed: 420, dot: C.black, pitch: 8, rad: 0.16, da: 0.35 });
    if (op > 0.02) { const sd = D.side === 'left' ? 1 : -1, ex = D.inner + sd * 110 * op, leaf = [[D.inner, lt], [ex, lt - 14 * op], [ex, GR - 4 + 6 * op], [D.inner, GR]]; shape(ctx, leaf, WOOD, { lw: 4.5, seed: 421, dot: C.black, pitch: 8, rad: 0.16, da: 0.35 }); seg(ctx, D.inner + sd * 8, (lt + GR) / 2 - 60, ex - sd * 8, (lt + GR) / 2 - 64, 5, '#4a5878', 2); seg(ctx, D.inner + sd * 8, (lt + GR) / 2 + 80, ex - sd * 8, (lt + GR) / 2 + 80, 5, '#4a5878', 2); }
    const dk = o.dark ?? PL.dark ?? 0;
    if (dk > 0) { const lamp = A.lamp && (o.lamp ?? 0) > 0 ? A.lamp : null, on = lamp ? o.lamp : 0, R = 260 * (1 + 0.03 * Math.sin(t * 11));
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.fillStyle = NAVY2; ctx.globalAlpha = 0.62 * dk;
      if (lamp) { const g = ctx.createRadialGradient(lamp[0], lamp[1] - 20, 20, lamp[0], lamp[1] - 20, R); g.addColorStop(0, `rgba(13,34,96,${(1 - on) * 0.62 * dk})`); g.addColorStop(0.7, `rgba(13,34,96,${(1 - 0.6 * on) * 0.62 * dk})`); g.addColorStop(1, `rgba(13,34,96,${0.62 * dk})`); ctx.globalAlpha = 1; ctx.fillStyle = g; }
      ctx.fill(); ctx.restore();
      if (lamp) { ctx.save(); ctx.globalAlpha = 0.22 * on; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.34); ctx.beginPath(); ctx.arc(lamp[0], lamp[1] - 20, R * 0.75, 0, 7); ctx.fill(); ctx.restore(); }
      if (A.window && o.moonPatch !== false) { const W = A.window, sh = [[W.x0, W.y1], [W.x1, W.y1], [W.x1 - 120, GR + 30], [W.x0 - 220, GR + 30]]; ctx.save(); K.poly(ctx, sh, true); ctx.globalAlpha = 0.18 * dk; ctx.fillStyle = '#9ec2ff'; ctx.fill(); ctx.restore(); } }
  }
  return A;
}

// ---------- 5. villageYard ----------
// villageYard(ctx, o): the KD-009 cottage yard at a forest edge, world 1000 x 1230 (o.w for wider), ground y 900.
//   o: {preset ('day' | 'dawn' | 'dusk' | 'night') | u | sky: false, w, sun: 0..1 keyed arc (0 rising behind the hills, 0.5 morning, 1 noon) | [x, y] | false, moon: [x, y], t,
//   cottage: {x0, x1, top (wall top), door: [x0, x1, top], win: [x0, x1, y0, y1], chimney: [x0, x1, top] | null} (default: KD-009's, at the right edge),
//   door: 0..1 open, inside(ctx) (behind the open door), winLit: 0..1 (1), winInside(ctx) (a silhouette in the window), tree: {x, ...tree() options} | false (KD-009 perch tree at x 70),
//   forest: [x0, x1] (treeRow; default [0, 420]), trough: x, bench: x, night: 0..1 (land tint; automatic with u or 'night')}
// yardLeaves(ctx, part, t, {deep, spread, dx, dy}): the leaf clumps in front of the perch (draw after the cast). Anchors: ground, perch, door, win, chimney, trough, bench (sitY).
const VY_TREE = { w: 84, top: 380, crowns: [[100, 300, 125], [235, 318, 88], [20, 380, 70], [190, 215, 80]], branch: [[120, 556], [340, 538], [344, 560], [120, 584]] };
function villageYardAnchors(o = {}) {
  const w = o.w || 1000, A = { ground: 900, w }, C0 = { x0: 800, x1: 1012, top: 560, door: [850, 920, 760], win: [928, 996, 624, 716], chimney: [940, 975, 420], ...(o.cottage || {}) };
  A.cottage = C0; A.door = { x0: C0.door[0], x1: C0.door[1], top: C0.door[2], cx: (C0.door[0] + C0.door[1]) / 2 }; A.win = { x0: C0.win[0], x1: C0.win[1], y0: C0.win[2], y1: C0.win[3] };
  A.tree = o.tree === false ? null : { x: 70, ...VY_TREE, ...(o.tree || {}) }; A.perch = A.tree ? [A.tree.x + 145, 545] : null;
  A.trough = o.trough ?? null; A.bench = o.bench != null ? { x: o.bench, sitY: 900 } : null;
  return A;
}
function villageYard(ctx, o = {}) {
  const A = villageYardAnchors(o), w = A.w, GR = 900, C0 = A.cottage, t = o.t || 0;
  const sk = townSky(ctx, w, { ...o, hills: false }, 'day');
  if (o.sun != null && o.sun !== false) { const s = Array.isArray(o.sun) ? o.sun : [K.lerp(640, 600, o.sun), K.lerp(790, 330, K.ease.out(K.clamp(o.sun)))]; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, 752); ctx.clip(); sun(ctx, s[0], s[1], t); ctx.restore(); }
  if (o.moon) moon(ctx, o.moon[0], o.moon[1], o.moonR || 60);
  if (o.u == null) { const S = SKY[o.preset || 'day']; townHills(ctx, w, S.hills.map((h) => h[3])); } else townHills(ctx, w, dayCycle(o.u).hills.map((h) => h[3]));
  const night = o.night ?? sk.night;
  townBake(ctx, 'vyard' + JSON.stringify([w, C0, A.tree, o.forest || 0, A.trough, A.bench]), 0, 0, w, 1230, (x) => {
    hillTrees(x, { seed: 4, n: Math.ceil(w / 84) }); const F = o.forest || [0, 420]; x.save(); x.translate(F[0], 0); treeRow(x, { n: Math.max(1, Math.round((F[1] - F[0]) / 105)), hmin: 330, seed: 8 }); x.restore(); ground(x, { w });
    const cut = C0.x1 >= w, mid = (C0.x0 + C0.x1) / 2, rise = Math.min(130, 0.51 * (C0.x1 - C0.x0));
    shape(x, [[C0.x0, C0.top], [C0.x1, C0.top], [C0.x1, 902], [C0.x0, 902]], '#f3e2b8', { lw: 7, seed: 24, dot: C.red, pitch: 12, rad: 0.15, da: 0.35 });
    if (C0.chimney) shape(x, [[C0.chimney[0], C0.chimney[2]], [C0.chimney[1], C0.chimney[2]], [C0.chimney[1], C0.top - 40], [C0.chimney[0], C0.top - 40]], C.red, { lw: 6, seed: 27 });
    shape(x, cut ? [[C0.x0 - 22, C0.top + 16], [mid - 1, C0.top - 108], [C0.x1 + 8, C0.top], [C0.x1 + 8, C0.top + 30]] : [[C0.x0 - 22, C0.top + 16], [mid, C0.top - rise], [C0.x1 + 22, C0.top + 16]], C.red, { lw: 8, seed: 25, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.5 });
    shape(x, [[C0.door[0] - 8, C0.door[2] - 10], [C0.door[1] + 8, C0.door[2] - 10], [C0.door[1] + 8, 902], [C0.door[0] - 8, 902]], '#7a4212', { lw: 5, seed: 26 });
    shape(x, [[C0.win[0] - 8, C0.win[2] - 8], [C0.win[1] + 8, C0.win[2] - 8], [C0.win[1] + 8, C0.win[3] + 8], [C0.win[0] - 8, C0.win[3] + 8]], '#7a4212', { lw: 5, seed: 28 });
    if (A.tree) tree(x, A.tree.x, GR, A.tree.x === 70 ? VY_TREE : { ...A.tree, crowns: VY_TREE.crowns.map(([cx, cy, r]) => [cx + A.tree.x - 70, cy, r]), branch: VY_TREE.branch.map(([bx, by]) => [bx + A.tree.x - 70, by]) });
    if (A.trough != null) { const tx = A.trough; shape(x, K.rectPts(tx - 60, GR - 40, 120, 40), '#7a4212', { lw: 5, seed: 500, dot: C.black, pitch: 8, rad: 0.15, da: 0.3 }); shape(x, K.rectPts(tx - 52, GR - 40, 104, 9), C.blue, { lw: 3, seed: 501 }); }
    if (A.bench) { const bx = A.bench.x; seg(x, bx - 60, GR - 48, bx + 60, GR - 48, 12, BARKY, 3.5); for (const d of [-46, 46]) seg(x, bx + d, GR - 42, bx + d, GR, 8, '#7a4212', 3); }
  });
  // door and window (as KD-009 yardDoor / yardWindow)
  { const { x0, x1, top: y0 } = A.door, y1 = 900, open = K.clamp(o.door || 0); ctx.save(); ctx.fillStyle = NAVY2; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.fillStyle = dotPat(ctx, '#1b3a8f', 9, 0.3); ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); if (o.inside) o.inside(ctx); ctx.restore();
    const dw = (x1 - x0) * Math.max(0.12, 1 - open); shape(ctx, [[x0, y0], [x0 + dw, y0 + 4 * open], [x0 + dw, y1 - 4 * open], [x0, y1]], '#a8741a', { lw: 5, seed: 29, dot: '#7a4212', pitch: 9, rad: 0.2, da: 0.5 });
    if (open < 0.6) shape(ctx, ell(x0 + dw - 12, (y0 + y1) / 2, 6, 6, 10), C.yellow, { lw: 3 }); }
  { const { x0, x1, y0, y1 } = A.win; ctx.save(); ctx.fillStyle = mixHex(NAVY2, '#ffd98a', o.winLit ?? 1); ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); if (o.winInside) o.winInside(ctx); ctx.restore();
    seg(ctx, (x0 + x1) / 2, y0, (x0 + x1) / 2, y1, 4, '#7a4212', 2); seg(ctx, x0, (y0 + y1) / 2, x1, (y0 + y1) / 2, 4, '#7a4212', 2); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.restore(); }
  if (night > 0) { ctx.save(); ctx.globalAlpha = 0.42 * night; ctx.fillStyle = NAVY2; ctx.beginPath(); ctx.rect(0, 680, w, 560); ctx.rect(A.win.x0, A.win.y0, A.win.x1 - A.win.x0, A.win.y1 - A.win.y0); ctx.fill('evenodd'); ctx.restore(); }
  return A;
}
// yardLeaves(ctx, part, t, o): the KD-009 leaf clumps in front of the perch (occluders). part 0 closed .. 1 open; o: {deep 0..1 (closes more), spread (units apart), dx, dy (move with the tree)}
function yardLeaves(ctx, part, t, o = {}) {
  const deep = o.deep || 0, spread = o.spread || 0, dx = o.dx || 0, dy = o.dy || 0, sway = Math.sin(t * 1.3) * 3;
  const cl = [[188 - 66 * part + 18 * deep - spread + dx, 446 + 40 * part + sway + dy, 60], [250 + 58 * part - 14 * deep + spread + dx, 440 + 34 * part - sway + dy, 58], [222 + dx, 524 + 84 * part + spread + dy, 46]];
  ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); }
  ctx.fillStyle = GREEN; for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 7); ctx.fill(); }
  ctx.fillStyle = dotPat(ctx, GREEND, 11, 0.28); for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 7); ctx.fill(); }
  ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x - 6, y + 4, r * 0.45, 3.6, 5.0); ctx.stroke(); } ctx.restore();
}

// ---------- 6. countryRoad ----------
// countryRoad(ctx, o): long road strip, ground y 900 with a paler dirt band y 900..960. o: {w: 3000, preset | u | sky: false, t, camX (hills parallax 0.3),
//   places: [{kind: 'tree' | 'milestone' | 'bush' | 'wall', x, ...}] (default KD-013: tree 420, milestone 1260, bush 1760, wall 2350..2570, bush 2420, tree 2520),
//   house: {x, lit: 0..1} | false (far house on the horizon, default x w - 100), city: 'left' (city edge with a gate at the left end), night: 0..1,
//   front: true (draw only the occluders again, after the cast: tree trunks, bushes, walls; o.occlude: list of place indices to limit it)}
// Anchors: ground, places [{kind, x, x0, x1, top, hideX (stand here to be hidden)}], tree / milestone / bush / wall (lists by kind), house, city.
function countryRoadAnchors(o = {}) {
  const w = o.w || 3000, A = { ground: 900, w };
  const P = o.places || [{ kind: 'tree', x: 420 }, { kind: 'milestone', x: 1260 }, { kind: 'bush', x: 1760 }, { kind: 'wall', x: 2460 }, { kind: 'bush', x: 2240 }, { kind: 'tree', x: 2700, small: true }].filter((p) => p.x < w);
  A.places = P.map((p) => { const q = { ...p };
    if (p.kind === 'tree') { q.trunk = p.trunk ?? (p.small ? 70 : 110); q.x0 = p.x - q.trunk / 2; q.x1 = p.x + q.trunk / 2; q.top = p.small ? 380 : 300; q.hideX = p.x; }
    else if (p.kind === 'milestone') { q.x0 = p.x - 30; q.x1 = p.x + 30; q.top = 820; q.hideX = p.x; }
    else if (p.kind === 'bush') { q.w = p.w ?? 260; q.h = p.h ?? 150; q.x0 = p.x - q.w / 2; q.x1 = p.x + q.w / 2; q.top = 900 - q.h; q.hideX = p.x; }
    else if (p.kind === 'wall') { q.w = p.w ?? 220; q.h = p.h ?? 70; q.x0 = p.x - q.w / 2; q.x1 = p.x + q.w / 2; q.top = 900 - q.h; q.hideX = p.x; q.seatY = q.top; }
    return q; });
  for (const k of ['tree', 'milestone', 'bush', 'wall']) A[k] = A.places.filter((p) => p.kind === k);
  A.house = o.house === false ? null : { x: w - 100, y: 860, lit: 0, ...(o.house || {}) }; A.city = o.city ? { x0: -10, x1: 380, gate: 190 } : null;
  return A;
}
function countryRoadPlace(c, p, front) {
  const GR = 900;
  if (p.kind === 'tree') { const tw = p.trunk, top = p.top, r = p.small ? 0.7 : 1; if (front) { shape(c, [[p.x - tw / 2, GR + 4], [p.x - tw / 2 + 8, top + 220 * r], [p.x + tw / 2 - 8, top + 220 * r], [p.x + tw / 2, GR + 4]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 }); return; }
    tree(c, p.x - tw / 2, GR, { w: tw, top: top + 160 * r, crowns: [[p.x, top + 100 * r, 120 * r], [p.x - 110 * r, top + 150 * r, 86 * r], [p.x + 110 * r, top + 150 * r, 86 * r], [p.x - 30 * r, top + 60 * r, 80 * r]] }); }
  else if (p.kind === 'milestone') desertMilestone(c, p.x);
  else if (p.kind === 'bush') bush(c, { x: p.x, w: p.w, h: p.h, seed: p.seed ?? 3 });
  else if (p.kind === 'wall') { shape(c, [[p.x0, GR + 4], [p.x0, p.top + 6], [p.x0 + 10, p.top], [p.x1 - 10, p.top], [p.x1, p.top + 6], [p.x1, GR + 4]], STONE, { lw: 7, seed: 600, dot: STONED, pitch: 9, rad: 0.2, da: 0.45 });
    c.save(); c.lineWidth = 3.5; c.strokeStyle = C.black; const mid = (p.top + GR) / 2; c.beginPath(); c.moveTo(p.x0 + 4, mid); c.lineTo(p.x1 - 4, mid); c.stroke(); for (let x = p.x0 + 44, k = 0; x < p.x1 - 10; x += 44, k++) { c.beginPath(); c.moveTo(x - (k % 2) * 22, p.top + 4); c.lineTo(x - (k % 2) * 22, mid); c.moveTo(x - 22 + (k % 2) * 22, mid); c.lineTo(x - 22 + (k % 2) * 22, GR); c.stroke(); } c.restore();
    shape(c, K.rectPts(p.x0 + 6, p.top - 2, p.x1 - p.x0 - 12, 10), STONE2, { lw: 4, seed: 601 }); }
}
function countryRoad(ctx, o = {}) {
  const A = countryRoadAnchors(o), w = A.w, GR = 900;
  if (o.front) { A.places.forEach((p, i) => { if (p.kind !== 'milestone' && (!o.occlude || o.occlude.includes(i))) countryRoadPlace(ctx, p, true); }); return A; }
  const sk = townSky(ctx, w, { ...o, hills: false }, 'day'), cols = o.u != null ? sk.d.hills.map((h) => h[3]) : { ...SKY[o.preset || 'day'] }.hills.map((h) => h[3]);
  ctx.save(); ctx.translate((o.camX || 0) * 0.7, 0); townHills(ctx, w, cols); if (A.house) { const H = A.house; shape(ctx, K.rectPts(H.x - 22, H.y - 34, 44, 34), '#f3e2b8', { lw: 4, seed: 602 }); shape(ctx, [[H.x - 30, H.y - 32], [H.x, H.y - 58], [H.x + 30, H.y - 32]], C.red, { lw: 4, seed: 603 }); ctx.fillStyle = mixHex(NAVY2, C.yellow, H.lit || 0); ctx.fillRect(H.x - 6, H.y - 24, 12, 12); }
  ctx.restore();
  const night = o.night ?? sk.night;
  townBake(ctx, 'croad' + JSON.stringify([w, A.places, A.city]), 0, 0, w, 1230, (c) => {
    hillTrees(c, { seed: 4, n: Math.ceil(w / 84) }); if (A.city) townCityEdge(c, A.city.x0, A.city.x1, { gate: A.city.gate, gw: 110, gh: 170, top: 640, tower: false });
    ground(c, { w }); shape(c, [[-10, GR + 2], [w + 10, GR + 2], [w + 10, 960], [-10, 960]], SANDL, { lw: 5, seed: 604, dot: '#c98a3a', pitch: 9, rad: 0.18, da: 0.45 });
    const r = K.rng(12); for (let i = 0; i < w / 90; i++) { const x = r() * w; for (let k = -1; k <= 1; k++) seg(c, x + k * 6, 962, x + k * 9, 944 - (k === 0 ? 8 : 0), 3, GREEN2, 2); }
    for (const p of A.places) countryRoadPlace(c, p, false);
  });
  if (night > 0) { townDim(ctx, 0, 560, w, 680, night); if (A.house && A.house.lit) { ctx.save(); ctx.translate((o.camX || 0) * 0.7, 0); ctx.fillStyle = C.yellow; ctx.fillRect(A.house.x - 6, A.house.y - 24, 12, 12); ctx.restore(); } }
  return A;
}

// default anchors (no drawing)
const MARKET = marketStreetAnchors(), HALL = palaceHallAnchors(), MERCHANT = palaceHallAnchors({ variant: 'merchant', curtain: 0 }), DESERT = desertRoadAnchors(), HUT = hutRoomAnchors(), VYARD = villageYardAnchors(), CROAD = countryRoadAnchors();
