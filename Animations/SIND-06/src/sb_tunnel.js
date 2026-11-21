// ===== SIND-06 new set: riverTunnel (the underground river in side cutaway: six chapters, dim and lit plates, the lantern mask) =====
// A strip about 7800 wide (world units, height 1230). Chapters: A entrance (wet green rock, the daylight disc behind), B strata hall
// with stalactites, the low lip (roof down to y 640 over x 1800..2050) and a short rapid (the water drops 40 over x 2050..2300),
// C the wide still gallery (roof y 200, crystal cluster, bat roost x 3650), D the rose crystal gallery, E the glow worm ceiling and
// a thread of waterfall, F the column forest and the exit glow (x 7750). Water line y 830 (870 after the rapid).
// Colour model (never monochrome): rock bands plum, teal, rose, ochre veins; gem veins in ruby, emerald, sapphire, topaz, amethyst.
// Each chapter is baked twice: 'dim' (readable, mid values) and 'lit' (lighter, warmer), the lit one shown inside the lantern's
// circle (sbLampR). The cast and raft are drawn after the plates at full colour (rim light only, no tint).
const SB_TUN = { exit: 7750, roost: 3650 };
const SB_CH = [{ x0: 0, x1: 1500, k: 'A' }, { x0: 1500, x1: 3000, k: 'B' }, { x0: 3000, x1: 4000, k: 'C' }, { x0: 4000, x1: 4700, k: 'D' }, { x0: 4700, x1: 6200, k: 'E' }, { x0: 6200, x1: 7900, k: 'F' }];
const SB_ROOF = [[0, 300], [1500, 300], [1800, 640], [2050, 640], [2300, 330], [2900, 300], [3100, 200], [4000, 200], [4200, 260], [4700, 260], [4900, 220], [6200, 220], [6400, 300], [7900, 300]];
function sbRoofY(x) { for (let k = 0; k < SB_ROOF.length - 1; k++) { const a = SB_ROOF[k], b = SB_ROOF[k + 1]; if (x <= b[0]) { const u = K.clamp((x - a[0]) / (b[0] - a[0])); return K.lerp(a[1], b[1], u * u * (3 - 2 * u)); } } return 300; }
function sbTunWaterY(x) { const u = K.clamp((x - 2050) / 250); return 830 + 40 * u * u * (3 - 2 * u); }
const sbRapidK = (x) => Math.exp(-Math.pow((x - 2200) / 200, 2));
// the surface at x, t (mood 'tunnel' amp 4, the rapid amp 26)
function sbTunWY(x, t) { const a = 4 + 22 * sbRapidK(x); return sbTunWaterY(x) + a * (0.6 * Math.sin(x * 0.03 - t * 4.2) + 0.4 * Math.sin(x * 0.071 + t * 2.7)); }
const SB_TPAL = { dim: { roof: '#4e3c70', bands: ['#6a4c8c', '#3f7a8c', '#b4708c', '#5a4a86', '#3a8a8a', '#a86a8a'], vein: '#c89a4a', water: '#1f7f8f', crest: '#6fe0e0', green: '#3f8a6a' },
  lit: { roof: '#8a6a8a', bands: ['#b48aa8', '#7ab8b0', '#f0a8a0', '#a890b0', '#80c8b0', '#e8a8a0'], vein: '#ffd070', water: '#3fb0b0', crest: '#b8fff0', green: '#7ac88a' } };
const SB_GEMV = ['#ff4a6a', '#3adf8a', '#4aa0ff', '#ffc83a', '#b07aff'];
function sbChapterPlate(i, mode) {
  const ch = SB_CH[i], w = ch.x1 - ch.x0, P = SB_TPAL[mode], sc = 0.75;
  return sbBakeAt('tun' + i + mode, Math.ceil(w * sc), Math.ceil(1230 * sc), (c) => { c.scale(sc, sc); c.translate(-ch.x0, 0); const R = K.rng(700 + i * 31), x0 = ch.x0 - 4, x1 = ch.x1 + 4;
    // far wall: wavy strata bands from the roof to below the water
    for (let k = 0; k < 26; k++) { const y0 = 120 + k * 42; c.fillStyle = P.bands[(k + i * 2) % 6]; c.beginPath(); c.moveTo(x0, y0); for (let x = x0; x <= x1 + 60; x += 60) c.lineTo(x, y0 + 18 * Math.sin(x * 0.004 + k * 1.7) + 9 * Math.sin(x * 0.011 + k)); c.lineTo(x1 + 60, 1240); c.lineTo(x0, 1240); c.closePath(); c.fill(); }
    // soft painted depth: lighter in the middle of the wall, a deeper band under the roof
    sbGrad(c, x0, 250, w + 8, 600, [[0, 'rgba(40,20,70,0.25)'], [0.5, 'rgba(255,255,255,0.06)'], [1, 'rgba(20,30,60,0.18)']]);
    // ochre veins and gem veins (thin polylines with a glaze)
    c.lineCap = 'round';
    for (let k = 0; k < Math.round(w / 140); k++) { let x = ch.x0 + R() * w, y = 380 + R() * 380; const gem = R() < 0.55, col = gem ? SB_GEMV[Math.floor(R() * 5)] : P.vein; c.strokeStyle = col; c.lineWidth = gem ? 4 : 3; c.beginPath(); c.moveTo(x, y); for (let q = 0; q < 5; q++) { x += 20 + R() * 40; y += (R() - 0.5) * 50; c.lineTo(x, y); } c.stroke();
      if (gem) { sbGlaze(c, x, y, 40, col, mode === 'lit' ? 0.5 : 0.35); c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); } }
    // the roof mass above sbRoofY with a rim, stalactites hanging from it
    const top = []; for (let x = x0; x <= x1; x += 20) top.push([x, sbRoofY(x)]);
    c.fillStyle = P.roof; c.beginPath(); c.moveTo(x0, -10); for (const p of top) c.lineTo(...p); c.lineTo(x1, -10); c.closePath(); c.fill();
    c.fillStyle = sbLight(P.roof, 0.18); for (let x = x0; x < x1; x += 90 + R() * 70) { const y = sbRoofY(x); c.beginPath(); c.moveTo(x, y - 40); c.quadraticCurveTo(x + 40, y - 60 - R() * 40, x + 90, y - 30); c.lineTo(x + 90, y - 10); c.lineTo(x, y - 14); c.closePath(); c.fill(); }
    ink(c, top, 4, 7, sbDark(P.roof, 0.4));
    const nSt = ch.k === 'B' ? 26 : ch.k === 'F' ? 10 : 14;
    for (let k = 0; k < nSt; k++) { const x = ch.x0 + R() * w, y = sbRoofY(x), h = (ch.k === 'B' ? 80 + R() * 140 : 30 + R() * 90) * (y > 500 ? 0.3 : 1), ww = 10 + R() * 16; celShade(c, [[x - ww, y - 6], [x + ww, y - 6], [x + 2, y + h]], sbMix(P.roof, P.bands[2], 0.35), sbDark(P.roof, 0.2), { light: [-1, -1], off: ww * 0.4, lw: 2, line: sbDark(P.roof, 0.45) }); }
    // chapter dressing
    if (ch.k === 'A') { for (let k = 0; k < 30; k++) { const x = ch.x0 + R() * w * 0.7, y = 300 + R() * 520; sbBlob(c, x, y, 20 + R() * 30, 8 + R() * 10, P.green, sbDark(P.green, 0.3), { lw: 2 }); } for (let k = 0; k < 8; k++) sbFern(c, ch.x0 + 80 + R() * 600, sbRoofY(0) + 30, 40 + R() * 30, P.green); }
    if (ch.k === 'C' || ch.k === 'D') { const nC = ch.k === 'C' ? 2 : 6; for (let q = 0; q < nC; q++) { const cx = ch.x0 + (ch.k === 'C' ? [w * 0.75, w * 0.3][q] : (q + 0.5) * w / nC), cy = ch.k === 'C' ? [420, 760][q] : [470, 790][q % 2], n = 5 + Math.floor(R() * 5), col = ch.k === 'D' ? ['#ff9ab8', '#ffd0e0', '#f070a0'][q % 3] : ['#9ad8ff', '#d8b0ff'][q];
        if (mode === 'lit' || ch.k === 'D') sbGlaze(c, cx, cy, 160, col, 0.3);
        for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + (k - (n - 1) / 2) * 0.32 * (cy > 600 ? 1 : -1), L = 60 + R() * 140, bw = 14 + R() * 10, dir = cy > 600 ? 1 : -1; c.save(); c.translate(cx + (k - n / 2) * 12, cy); c.rotate(a + (dir < 0 ? Math.PI : 0) + Math.PI / 2);
          celShade(c, [[-bw, 0], [-bw, -L * 0.8], [0, -L], [bw, -L * 0.8], [bw, 0]], col, sbDark(col, 0.25), { light: [-1, -1], off: bw * 0.6, hi: '#ffffff', lw: 2.5, line: sbDark(col, 0.55) }); c.restore(); } } }
    if (ch.k === 'E') { for (let k = 0; k < 300; k++) { const x = ch.x0 + R() * w, y = sbRoofY(x) - 60 + R() * 330, r = 2 + R() * 2.5; sbGlaze(c, x, y, r * 5, '#7affd0', 0.35); c.fillStyle = R() < 0.3 ? '#c8fff0' : '#5ae8c8'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); } }
    if (ch.k === 'F') { for (let k = 0; k < 9; k++) { const x = ch.x0 + 80 + k * (w - 300) / 9 + R() * 60, wd = 40 + R() * 50, col = P.bands[k % 6]; celShade(c, [[x - wd, sbRoofY(x)], [x + wd, sbRoofY(x)], [x + wd * 0.6, 560], [x + wd, 900], [x - wd, 900], [x - wd * 0.6, 560]], col, sbDark(col, 0.3), { light: [-1, -1], off: wd * 0.5, lw: 2.5, line: sbDark(col, 0.5) }); } }
  });
}
// the tunnel behind the raft: dim plates, the lit plates inside the lantern circle, lamp glow on the plate, the water.
// cam: the shot camera; lamp: {x, y, flame} (world) or null; o: {day (0..1 the entrance disc), exit (0..1 the far daylight), worms}
function sbTunnel(ctx, t, cam, lamp, o = {}) {
  const z = cam.zoom || 1, vx0 = cam.x - 520 / z, vx1 = cam.x + 520 / z, vis = SB_CH.map((c, i) => i).filter((i) => SB_CH[i].x1 > vx0 && SB_CH[i].x0 < vx1);
  for (const i of vis) ctx.drawImage(sbChapterPlate(i, 'dim'), SB_CH[i].x0, 0, SB_CH[i].x1 - SB_CH[i].x0, 1230);
  if (o.day > 0) { const r = 40 + 200 * o.day; sbGlow(ctx, o.dayX ?? 150, 640, r * 2.2, 0.9 * o.day, '#fff6d8'); celShade(ctx, ell(o.dayX ?? 150, 640, r, r * 1.1, 32), '#fffbe8', '#ffe6b0', { light: [1, 0], off: r * 0.15, lw: 0 }); }
  if (o.exit > 0) { const r = 10 + 260 * o.exit * o.exit; sbGlow(ctx, SB_TUN.exit, 640, r * 3, Math.min(1, o.exit * 1.4), '#ffe08a'); celShade(ctx, ell(SB_TUN.exit, 640, r, r * 1.2, 32), '#fffbe0', '#ffe0a0', { light: [-1, 0], off: r * 0.12, lw: 0 }); }
  if (lamp && lamp.flame > 0.01) { const r = sbLampR(lamp.flame) * (1 + 0.02 * Math.sin(SB_T3(t) * 23));
    ctx.save(); ctx.beginPath(); ctx.arc(lamp.x, lamp.y, r, 0, 7); ctx.clip(); for (const i of vis) ctx.drawImage(sbChapterPlate(i, 'lit'), SB_CH[i].x0, 0, SB_CH[i].x1 - SB_CH[i].x0, 1230); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(255,214,140,0.35)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(lamp.x, lamp.y, r - 5, 0, 7); ctx.stroke(); ctx.restore();
    sbLampGlow(ctx, lamp.x, lamp.y, lamp.flame, t, { k: 0.9, a: 0.45 }); }
  sbTunWater(ctx, t, vx0 - 40, vx1 + 40, lamp, o);
}
// the river: deep teal body, a cyan crest strip, foam on threes moving right, gold lamp scribbles under the lantern, glow worm and
// gem reflections; inside the lamp circle the water is lighter
function sbTunWater(ctx, t, x0, x1, lamp, o = {}) {
  const tc = SB_T3(t), pts = []; for (let x = x0; x <= x1; x += 16) pts.push([x, sbTunWY(x, t)]);
  const body = (col, crest) => { ctx.beginPath(); ctx.moveTo(x0, 1300); for (const p of pts) ctx.lineTo(...p); ctx.lineTo(x1, 1300); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = crest; ctx.lineWidth = 9; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1] + 6) : ctx.moveTo(p[0], p[1] + 6))); ctx.stroke(); };
  body(SB_TPAL.dim.water, sbMix(SB_TPAL.dim.water, SB_TPAL.dim.crest, 0.55));
  if (lamp && lamp.flame > 0.01) { ctx.save(); ctx.beginPath(); ctx.arc(lamp.x, lamp.y, sbLampR(lamp.flame), 0, 7); ctx.clip(); body(SB_TPAL.lit.water, SB_TPAL.lit.crest); ctx.restore(); }
  ctx.save(); ctx.strokeStyle = sbDark(SB_TPAL.dim.water, 0.4); ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(...p) : ctx.moveTo(...p))); ctx.stroke();
  // foam dashes (rapid: many), lighter streaks in the body
  const R = K.rng(7711); ctx.lineCap = 'round';
  for (let i = 0; i < 40; i++) { const span = x1 - x0 + 200, x = x0 - 100 + (((R() * span + tc * 160) % span) + span) % span, rk = sbRapidK(x), y = sbTunWY(x, t) + 14 + R() * (60 + 160 * R()); if (rk < 0.2 && i > 22) continue; if (Math.floor(tc * 8 / 3 + i) % 4 === 0) continue;
    ctx.globalAlpha = 0.45 + 0.5 * rk; ctx.strokeStyle = rk > 0.3 ? '#ffffff' : '#8ae8e8'; ctx.lineWidth = 3 + 3 * rk; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 22 + 40 * rk, y); ctx.stroke(); }
  // lamp scribbles: warm broken lines on the water under the lantern
  if (lamp && lamp.flame > 0.01) { ctx.globalAlpha = 0.8 * (0.4 + 0.6 * lamp.flame); ctx.strokeStyle = '#ffd27a'; for (let i = 0; i < 9; i++) { const yy = sbTunWY(lamp.x, t) + 16 + i * 16, w = (90 - i * 6) * (0.5 + lamp.flame), sw = Math.sin(tc * 3.1 + i * 1.7) * 8; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(lamp.x - w / 2 + sw, yy); ctx.lineTo(lamp.x - w * 0.1 + sw, yy); ctx.moveTo(lamp.x + w * 0.05 + sw, yy); ctx.lineTo(lamp.x + w / 2 + sw, yy); ctx.stroke(); } }
  // glow worm reflections in chapter E
  if (x1 > 4700 && x0 < 6200) { const Q = K.rng(709); ctx.fillStyle = '#6af0d0'; for (let k = 0; k < 120; k++) { const x = 4700 + Q() * 1500, yy = 900 + Q() * 260; if (x < x0 || x > x1) continue; ctx.globalAlpha = 0.5 * (0.5 + 0.5 * Math.sin(tc * 2 + k)); ctx.fillRect(x + 4 * Math.sin(tc * 3 + k), yy, 8, 3); } }
  if (o.exit > 0) { ctx.globalAlpha = Math.min(1, o.exit * 1.3); ctx.strokeStyle = '#ffe08a'; for (let i = 0; i < 10; i++) { const yy = 880 + i * 18, len = 600 * o.exit * (1 - i * 0.06), sw = Math.sin(tc * 3 + i) * 10; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(SB_TUN.exit - len + sw, yy); ctx.lineTo(SB_TUN.exit + sw, yy); ctx.stroke(); } }
  ctx.restore();
}
// a cave bat hanging upside down from (x, y) (feet on the roof), or flying. o: {s, fold 0..1 (1 wrapped), wing (one wing stretched
// 0..1), eye (0 shut .. 1 open, both), eyeL (one eye), squint, shuffle (x offset), fly, flap, t}
function sbBat(ctx, x, y, o = {}) {
  const s = o.s || 1, body = '#6a4a8a', sh = '#4a2f6a', line = '#24143a', wing = '#8a6aa8', tc = SB_T2(o.t || 0);
  ctx.save(); ctx.translate(x + (o.shuffle || 0), y); ctx.scale(s, s);
  if (o.fly) { const f = o.flap ?? Math.sin(tc * 20); for (const sd of [-1, 1]) celShade(ctx, [[0, 0], [sd * 40, -30 - 30 * f], [sd * 75, -10 - 40 * f], [sd * 60, 10], [sd * 40, 4], [sd * 22, 14]], wing, sh, { light: [0, -1], off: 6, lw: 2, line }); sbBlob(ctx, 0, 4, 14, 18, body, sh, { lw: 2, line }); for (const sd of [-1, 1]) celShade(ctx, [[sd * 4, -8], [sd * 12, -24], [sd * 12, -6]], body, sh, { lw: 1.5, line }); ctx.restore(); return; }
  seg(ctx, -5, 0, -5, 8, 3, line, 0); seg(ctx, 5, 0, 5, 8, 3, line, 0);
  const fo = K.clamp(o.fold ?? 1), wg = K.clamp(o.wing || 0);
  sbBlob(ctx, 0, 26, 17, 23, body, sh, { lw: 2, line });
  for (const sd of [-1, 1]) { const st = sd > 0 ? wg : 0; celShade(ctx, sd > 0 && st > 0.05 ? [[sd * 10, 10], [sd * (30 + 50 * st), 4 - 30 * st], [sd * (40 + 60 * st), 30], [sd * (26 + 30 * st), 44], [sd * 12, 40]] : [[sd * 10, 8], [sd * (22 - 4 * fo), 24], [sd * 18, 46], [sd * 6, 48]], wing, sh, { light: [-1, -1], off: 4, lw: 2, line }); }
  // head at the bottom (upside down): ears pointing down, eyes
  sbBlob(ctx, 0, 54, 12, 10, body, sh, { lw: 2, line }); for (const sd of [-1, 1]) celShade(ctx, [[sd * 4, 60], [sd * 12, 74], [sd * 12, 58]], body, sh, { lw: 1.5, line });
  const eo = o.eye ?? 0; for (const [sd, v] of [[-1, eo], [1, Math.max(eo, o.eyeL || 0)]]) { if (v < 0.15) { seg(ctx, sd * 5 - 3, 52, sd * 5 + 3, 52, 1.6, line, 0); continue; } ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.ellipse(sd * 5, 52, 3.2, 3.2 * v * (o.squint ? 0.5 : 1), 0, 0, 7); ctx.fill(); ctx.fillStyle = line; ctx.beginPath(); ctx.arc(sd * 5, 52, 1.4, 0, 7); ctx.fill(); }
  ctx.restore();
}
