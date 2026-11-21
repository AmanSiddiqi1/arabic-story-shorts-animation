// ===== SIND-02 sets: diamondValley (a walled gorge with a vertical camera), valleyRim (the traders' terrace on top) and skyFlight
// (three scrolling mountain ranges for a flight). New and reusable (any gorge, pit, cliff climb or cliff nest; SIND-06 can copy it).
// diamondValley world: floor y 900 (sand 820..1320), the climb face behind from the floor up to the rim at y -1400, sky above.
// Side walls frame it (left x < 230, right x > 1480). Ledges on the face: y 420 (x 1000..1300), -100 (900..1250), -620 (1050..1400),
// the nest ledge -1080 (950..1420, nest centre 1230), a sloping shelf from (1000, -1080) up to the rim at (760, -1400). A low ledge on
// the left wall at y 640 (x 100..340) for a sleeping snake. Boulders at x 150..380 (with the crevice at 260) and 1050..1300.
const SB_VAL = { floor: 900, rim: -1400, ledges: [[1000, 1300, 420], [900, 1250, -100], [1050, 1400, -620], [950, 1420, -1080]], nest: [1230, -1080], shelf: [[1000, -1080], [760, -1400]], lowLedge: [100, 340, 640], crevice: [262, 840] };
const SB_ROCK = ['#f0b0a8', '#e8c08a', '#c8a8d8', '#f4c8a0', '#e0a0b8', '#d8b890'];
// the face and side walls, baked at 0.75 resolution (soft painting): world x -600..1900, y -1560..920
function sbValleyWallPlate() {
  const k = 0.75; return sbBakeAt('valWall', Math.round(2500 * k), Math.round(2480 * k), (c) => { c.scale(k, k); c.translate(600, 1560); const R = K.rng(101);
    const rimY = (x) => -1400 + 26 * Math.sin(x * 0.013) + 14 * Math.sin(x * 0.041);
    // the face: horizontal rock bands, gradient haze toward the top
    c.save(); c.beginPath(); c.moveTo(-600, 920); for (let x = -600; x <= 1900; x += 25) c.lineTo(x, rimY(x)); c.lineTo(1900, 920); c.closePath(); c.clip();
    let y = -1420, i = 0; while (y < 920) { const h = 70 + R() * 120, col = SB_ROCK[i % SB_ROCK.length]; c.fillStyle = col; c.beginPath(); c.moveTo(-600, y + 30 * Math.sin(i)); for (let x = -600; x <= 1900; x += 50) c.lineTo(x, y + 18 * Math.sin(x * 0.006 + i * 1.7) + 10 * Math.sin(x * 0.02 + i)); c.lineTo(1900, y + h + 40); c.lineTo(-600, y + h + 40); c.closePath(); c.fill();
      c.strokeStyle = sbDark(col, 0.25); c.lineWidth = 3; c.beginPath(); for (let x = -600; x <= 1900; x += 50) { const yy = y + 18 * Math.sin(x * 0.006 + i * 1.7) + 10 * Math.sin(x * 0.02 + i); x === -600 ? c.moveTo(x, yy) : c.lineTo(x, yy); } c.stroke(); y += h; i++; }
    sbGrad(c, -600, -1420, 2500, 900, [[0, 'rgba(255,240,250,0.45)'], [1, 'rgba(255,240,250,0)']]);
    sbGrad(c, -600, 500, 2500, 420, [[0, 'rgba(120,70,120,0)'], [1, 'rgba(120,70,120,0.25)']]);
    c.strokeStyle = 'rgba(90,50,90,0.45)'; c.lineWidth = 3; c.lineCap = 'round'; for (let j = 0; j < 40; j++) { let x = R() * 2400 - 550, yy = -1350 + R() * 2200; c.beginPath(); c.moveTo(x, yy); for (let q = 0; q < 4; q++) { x += (R() - 0.5) * 30; yy += 30 + R() * 30; c.lineTo(x, yy); } c.stroke(); }
    for (let j = 0; j < 30; j++) sbTuft(c, R() * 2400 - 550, -1300 + R() * 2100, 18 + R() * 16, '#6ab85a', '#2f7a44');
    c.restore();
    // grass on the rim
    for (let x = -600; x < 1900; x += 30) sbTuft(c, x, rimY(x) + 6, 26 + 10 * Math.sin(x), '#6ab85a', '#2f7a44');
    // the side walls: nearer, darker, jagged inner edges
    for (const sd of [-1, 1]) { const P = []; const xi = (yy) => sd < 0 ? 230 - 80 * Math.pow(K.clamp((900 - yy) / 2300), 0.7) + 30 * Math.sin(yy * 0.01) + 18 * Math.sin(yy * 0.033) : 1480 + 60 * Math.pow(K.clamp((900 - yy) / 2300), 0.7) + 30 * Math.sin(yy * 0.012 + 2) + 18 * Math.sin(yy * 0.031);
      for (let yy = 940; yy >= -1560; yy -= 40) P.push([xi(yy), yy]); P.push([sd < 0 ? -620 : 1920, -1560]); P.push([sd < 0 ? -620 : 1920, 940]);
      const col = sd < 0 ? '#c87a90' : '#b87aa8'; c.save(); K.poly(c, P, true); c.fillStyle = col; c.fill(); c.clip();
      for (let yy = -1560; yy < 940; yy += 90 + (yy % 50)) { c.fillStyle = sbMix(col, yy % 3 ? '#ffd0b0' : '#6a3a6a', 0.18); c.fillRect(-620, yy, 2600, 40); }
      c.fillStyle = sbDark(col, 0.25); for (let yy = 900; yy > -1560; yy -= 40) { const x = xi(yy); c.fillRect(sd < 0 ? x - 26 : x, yy - 40, 26, 44); }
      c.restore(); ink(c, P.slice(0, -2), 4, 1, '#5a2a4a'); }
  });
}
function sbValleyFloorPlate() {
  return sbBakeAt('valFloor', 2500, 520, (c) => { c.translate(600, -810);
    c.fillStyle = '#f2d8c4'; c.beginPath(); c.moveTo(-600, 860); for (let x = -600; x <= 1900; x += 50) c.lineTo(x, 856 + 16 * Math.sin(x * 0.01)); c.lineTo(1900, 1330); c.lineTo(-600, 1330); c.closePath(); c.fill();
    sbGrad(c, -600, 860, 2500, 470, [[0, 'rgba(255,240,230,0.0)'], [1, 'rgba(200,140,140,0.35)']]);
    c.strokeStyle = 'rgba(190,140,130,0.5)'; c.lineWidth = 2; for (let y = 880; y < 1330; y += 22 + (y - 880) * 0.12) { c.beginPath(); for (let x = -600; x <= 1900; x += 60) { const yy = y + 6 * Math.sin(x * 0.02 + y); x === -600 ? c.moveTo(x, yy) : c.lineTo(x, yy); } c.stroke(); }
    // pebbles and gems: the floor glitters
    sbDress(c, -500, 1850, 880, 1310, 111, { stones: 26, tufts: 4, flowers: 0, stone: ['#d8b8c8', '#9a7a98'], grass: ['#8ab86a', '#4a7a44'] });
    sbGemScatter(c, 250, 1000, 880, 1300, 90, 7); sbGemScatter(c, -500, 250, 900, 1300, 25, 8); sbGemScatter(c, 1000, 1850, 900, 1300, 30, 9);
    // boulders: left group round the crevice at 262, right group 1050..1300
    const bo = (x, y, r, col) => { const P = []; const R = K.rng(Math.floor(x * 3 + y)); for (let i = 0; i < 14; i++) { const a = Math.PI + i / 13 * Math.PI, rr = r * (0.85 + R() * 0.25); P.push([x + Math.cos(a) * rr * 1.2, y + Math.sin(a) * rr]); } P.push([x + r * 1.2, y]); celShade(c, P, col, sbDark(col, 0.3), { light: [-1, -1], off: r * 0.35, lw: 4, line: '#5a2a4a', hi: sbLight(col, 0.3) }); };
    bo(150, 905, 120, '#c8a0b8'); bo(380, 910, 110, '#d0a8a8');
    c.fillStyle = '#3a1a3a'; c.beginPath(); c.moveTo(232, 905); c.lineTo(246, 800); c.lineTo(282, 790); c.lineTo(300, 905); c.closePath(); c.fill();   // the crevice
    bo(1110, 905, 90, '#c8a0b8'); bo(1250, 912, 120, '#b898b8'); bo(1380, 910, 70, '#d0a8a8');
    bo(860, 905, 46, '#d8b0b0');   // the sitting rock (60 high)
  });
}
// valley ledges (live cels so they can sit in front of actors): a lip 40 thick with a hard shade under it
function sbLedge(ctx, x0, x1, y, col = '#d89aa0') { const P = [[x0 - 20, y + 4], [x0, y - 10], [x1, y - 12], [x1 + 30, y + 2], [x1 + 10, y + 34], [x0 + 20, y + 40]]; celShade(ctx, P, col, sbDark(col, 0.3), { light: [0, -1], off: 16, lw: 3.5, line: '#5a2a4a', hi: sbLight(col, 0.3) }); }
function sbValleyLedges(ctx) { for (const [a, b, y] of SB_VAL.ledges) sbLedge(ctx, a, b, y); const [l0, l1, ly] = SB_VAL.lowLedge; sbLedge(ctx, l0, l1, ly, '#c88aa0');
  const [[sx0, sy0], [sx1, sy1]] = SB_VAL.shelf; celShade(ctx, [[sx0 + 60, sy0 - 8], [sx1 - 30, sy1 - 6], [sx1 - 10, sy1 + 60], [sx0 + 80, sy0 + 70]], '#e8b0a0', '#a87070', { light: [0, -1], off: 22, lw: 3.5, line: '#5a2a4a', hi: '#f8d0c0' }); }
// height of the shelf surface at x (between the nest ledge and the rim)
const sbShelfY = (x) => { const [[x0, y0], [x1, y1]] = SB_VAL.shelf; return K.lerp(y0, y1, K.clamp((x0 - x) / (x0 - x1))) - 8; };
// the eagles' stick nest on the nest ledge (centre x 1230): back part, eaglets go between, front part
function sbStickNest(ctx, part) { const [x, y] = SB_VAL.nest, R = K.rng(part === 'back' ? 5 : 6);
  if (part === 'back') { celShade(ctx, ell(x, y - 30, 110, 40, 20), '#8a6a4a', '#5a3a2a', { light: [-1, -1], off: 10, lw: 3 }); return; }
  celShade(ctx, [[x - 130, y - 30], [x - 100, y - 2], [x + 100, y - 2], [x + 130, y - 30], [x + 110, y - 10], [x - 110, y - 10]].concat([]), '#a8805a', '#6a4a30', { light: [-1, -1], off: 10, lw: 3 });
  ctx.save(); ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 16; i++) { const a = x - 140 + R() * 280, b = y - 40 + R() * 30; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(a + (R() - 0.5) * 90, b + (R() - 0.5) * 20); ctx.stroke(); } ctx.restore(); }
// diamondValley behind the actors: the narrow sky strip, the face and walls, the floor; o.glints (live sparkles on the floor)
function sbDiamondValley(ctx, t, cam, o = {}) {
  sbSkyTall(ctx, 'day', { ...cam, x: 640 }, -1250, -3000);
  if (o.sky) o.sky(ctx);
  ctx.drawImage(sbValleyWallPlate(), -600, -1560, 2500, 2480);
  sbValleyLedges(ctx);
  ctx.drawImage(sbValleyFloorPlate(), -600, 810);
  if (o.glints !== false) sbGlints(ctx, [250, 880, 750, 400], t, o.glints || 14, 31, 18, 1.1);
}
// light bands sweeping the floor (move light, not drawings)
function sbFloorBands(ctx, t, a = 0.16) { sbBands(ctx, [-600, 830, 2500, 500], t, { cols: ['#ffffff', '#bfeaff'], alpha: a, speed: 300, w: 90, angle: -0.9 }); }

// ---------- valleyRim: the traders' terrace on top (x 300..2700, ground 900), cliff edge at x 760 with the drop to the left ----------
function sbRimPlate() {
  return sbBakeAt('rim', 2400, 1300, (c) => { c.translate(-300, 0);
    // far peaks
    c.save(); c.filter = 'blur(2px)'; for (const [col, base, pk] of [['#b8aee0', 880, [[300, 620], [600, 380], [880, 560], [1200, 330], [1500, 520], [1820, 300], [2150, 500], [2500, 360], [2700, 560]]], ['#8ac0b0', 900, [[300, 760], [700, 640], [1100, 720], [1500, 610], [1900, 730], [2300, 640], [2700, 720]]]]) {
      c.fillStyle = col; c.beginPath(); c.moveTo(300, base + 40); for (const [x, y] of pk) c.lineTo(x, y); c.lineTo(2700, base + 40); c.closePath(); c.fill();
      if (col === '#b8aee0') { c.fillStyle = '#fbf6ff'; for (const [x, y] of pk) if (y < 450) { c.beginPath(); c.moveTo(x, y); c.lineTo(x - 50, y + 60); c.lineTo(x + 6, y + 46); c.lineTo(x + 50, y + 58); c.closePath(); c.fill(); } } }
    c.restore();
    // the gorge on the left of the edge: far walls in shade, a strip of sparkling floor far below
    sbGrad(c, 300, 700, 470, 600, [[0, '#d898a8'], [1, '#8a5a7a']]); for (let k = 0; k < 6; k++) { c.fillStyle = sbMix('#c88aa0', '#5a3a5a', k / 6); c.fillRect(300, 760 + k * 80, 470, 40); }
    // the terrace: green grass, a dusty camp floor, the cliff edge with a rock lip
    const E = [[760, 1300], [740, 1100], [770, 960], [800, 905], [2700, 900], [2700, 1300]]; c.save(); K.poly(c, E, true); c.clip(); sbGrad(c, 700, 880, 2000, 420, [[0, '#7ac86a'], [1, '#3f8a4a']]);
    c.fillStyle = '#d8c090'; c.beginPath(); c.ellipse(1250, 990, 460, 70, 0, 0, 7); c.fill(); c.restore();
    celShade(c, [[730, 1300], [710, 1120], [740, 980], [790, 900], [830, 910], [800, 990], [790, 1300]], '#c88aa0', '#8a5a7a', { light: [1, -1], off: 14, lw: 3.5, line: '#5a2a4a' });
    sbDress(c, 820, 2680, 912, 1280, 121, { stones: 14, tufts: 24, flowers: 30 });
    // the tent, the pole with the net, the meat pile
    celShade(c, [[1560, 905], [1680, 690], [1800, 905]], '#e8d8b0', '#b8a070', { light: [-1, -1], off: 30, lw: 3.5 }); c.fillStyle = '#6a3a2a'; c.beginPath(); c.moveTo(1660, 905); c.lineTo(1680, 760); c.lineTo(1700, 905); c.closePath(); c.fill();
    for (let k = 0; k < 4; k++) { c.fillStyle = ['#e8364f', '#2f6fe0', '#ffcf3a', '#2aa39a'][k]; c.fillRect(1600 + k * 50, 860, 30, 10); }
    seg(c, 2050, 905, 2010, 560, 8, '#8a5a32', 2); c.strokeStyle = '#6a5a3a'; c.lineWidth = 2; for (let i = 0; i < 9; i++) { c.beginPath(); c.moveTo(2010 - i * 3, 570 + i * 4); c.quadraticCurveTo(2060 + i * 8, 640, 2040 + i * 6, 760); c.stroke(); }
    for (const [x, y, r] of [[930, 880, -0.3], [990, 885, 0.2], [960, 850, -1.4]]) sbSlab(c, x, y, { rot: r - Math.PI / 2, s: 0.42 });
    // a cooking fire ring of stones
    for (let k = 0; k < 7; k++) sbStone(c, 1300 + Math.cos(k * 0.9) * 50, 1060 + Math.sin(k * 0.9) * 14, 14, '#c8bcc8', '#8a7e9a');
  });
}
function sbValleyRim(ctx, t, cam, o = {}) { sbSkyTall(ctx, 'day', cam, 760); if (o.sky) o.sky(ctx); ctx.drawImage(sbRimPlate(), 300, 0);
  sbGlints(ctx, [320, 1150, 420, 140], t, 5, 41, 10, 1.4); }

// ---------- skyFlight: panel-space flight (1000 x 1230): sky, sun, three ridge layers that tile every 2000 units ----------
function sbRidgeLayer(i) { const spec = [{ top: 760, amp: 260, col: '#b4a8e8', snow: '#fbf6ff', h: 1230 }, { top: 930, amp: 170, col: '#4fae9a', snow: null, h: 1230 }, { top: 1060, amp: 150, col: '#e8988a', snow: null, h: 1230, col2: '#e0b070' }][i];
  return sbBakeAt('ridge' + i, 2000, 1230, (c) => { const R = K.rng(200 + i), pk = [], n = 9 + i * 3; for (let k = 0; k <= n; k++) pk.push([k * 2000 / n, spec.top - spec.amp * (k % n === 0 ? 0.5 : 0.25 + R() * 0.75)]);
    c.fillStyle = spec.col; c.beginPath(); c.moveTo(0, 1230); for (const [x, y] of pk) c.lineTo(x, y); c.lineTo(2000, 1230); c.closePath(); c.fill();
    c.save(); c.clip(); c.fillStyle = sbDark(spec.col, 0.22); for (let k = 0; k < n; k++) { const [x, y] = pk[k], [x2, y2] = pk[k + 1], mx = (x + x2) / 2; if (y < y2) { c.beginPath(); c.moveTo(x, y); c.lineTo(mx + 30, 1230); c.lineTo(x2 + 400, 1230); c.lineTo(x2, y2); c.closePath(); c.fill(); } }
    if (spec.snow) { c.fillStyle = spec.snow; for (const [x, y] of pk) if (y < spec.top - spec.amp * 0.55) { c.beginPath(); c.moveTo(x, y); c.lineTo(x - 70, y + 90); c.lineTo(x - 20, y + 70); c.lineTo(x + 20, y + 100); c.lineTo(x + 70, y + 84); c.closePath(); c.fill(); } }
    if (spec.col2) for (let k = 0; k < 14; k++) { c.fillStyle = k % 2 ? spec.col2 : sbLight(spec.col, 0.2); c.fillRect(0, spec.top + k * 40, 2000, 14); }
    c.restore(); c.strokeStyle = sbDark(spec.col, 0.5); c.lineWidth = 3; c.beginPath(); pk.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y))); c.stroke();
    if (i === 1) for (let k = 0; k < 30; k++) { const x = R() * 2000; let y = 1230; for (let q = 0; q < pk.length - 1; q++) if (x >= pk[q][0] && x <= pk[q + 1][0]) y = K.lerp(pk[q][1], pk[q + 1][1], (x - pk[q][0]) / (pk[q + 1][0] - pk[q][0])); celShade(c, [[x - 16, y + 50], [x, y + 4], [x + 16, y + 50]], '#2f7a5a', '#1f5a44', { light: [-1, -1], off: 5, lw: 2 }); }
  }); }
// draw a ridge layer scrolled by off (units; positive = the land moves right), with a vertical lift
function sbRidge(ctx, i, off, dy = 0) { const img = sbRidgeLayer(i), x = ((off % 2000) + 2000) % 2000; ctx.drawImage(img, x - 2000, dy); ctx.drawImage(img, x, dy); }
