// ===== SIND-06 new set: riverVillage (the river's end: cave exit in a green hill, the reed pool landing, five canals feeding the
// fields, a turning waterwheel, the track to a mud brick village with domes, palms, a washing line, a well, and the king's gold dome) =====
// World 3000 x 1230, ground (track) y 900. Cave exit arch x 150..400 (top 660); the river leaves it in the foreground band y 900..990;
// reed pool (the river end) x 700..1100 with the landing at x 820 (water y 948); canals fan out at x 1050..1250 into field strips
// x 1100..1750; waterwheel at (1180, 850) radius 110; track x 900..2900; houses x 1900..2900; well x 2300; palace on the hill (2700, 330).
// Full sun. sbVillage(ctx, t, cam, o) draws everything behind the cast; sbVillageFront(ctx, t) the reeds in front.
const SB_VIL = { ground: 900, arch: [150, 400, 660], pool: [900, 948, 230, 58], landing: 820, wheel: [1180, 850, 110], well: 2300, houses: [[1960, 220, '#f6e0c0', '#2a7ad0'], [2180, 180, '#f4c8c0', '#2aa06a'], [2400, 240, '#d8e8f4', '#2a7ad0'], [2630, 200, '#f6e0c0', '#2aa06a'], [2860, 230, '#f4c8c0', '#2a7ad0']], palms: [2080, 2720], palace: [2700, 330] };
function sbVillageFarPlate() {
  return sbBakeAt('vilFar', 1800, 540, (c) => { c.scale(0.6, 0.6); const R = K.rng(5501);
    // the far side of the same mountain (rose, ochre, slate violet strata) and blue far hills; the gold dome on its hill
    c.fillStyle = '#9ab8e8'; c.beginPath(); c.moveTo(0, 900); for (let x = 0; x <= 3000; x += 100) c.lineTo(x, 640 - 60 * Math.sin(x * 0.003) - 30 * Math.sin(x * 0.011)); c.lineTo(3000, 900); c.closePath(); c.fill();
    const mt = (x) => 150 + 0.0006 * Math.pow(x - 300, 2) + 40 * Math.sin(x * 0.02); c.save(); c.beginPath(); c.moveTo(-100, 900); for (let x = -100; x <= 1500; x += 25) c.lineTo(x, Math.min(860, mt(x))); c.lineTo(1500, 900); c.closePath(); c.clip();
    for (let k = 0; k < 20; k++) { c.fillStyle = SB_STRATA[k % 6]; const y0 = 100 + k * 40; c.beginPath(); c.moveTo(-100, y0); for (let x = -100; x <= 1500; x += 60) c.lineTo(x, y0 + 14 * Math.sin(x * 0.005 + k)); c.lineTo(1500, 900); c.lineTo(-100, 900); c.closePath(); c.fill(); }
    c.fillStyle = 'rgba(80,50,110,0.25)'; for (let x = 0; x < 1400; x += 160) { c.beginPath(); c.moveTo(x, mt(x)); c.lineTo(x + 120, 900); c.lineTo(x + 200, 900); c.lineTo(x + 60, mt(x + 60)); c.closePath(); c.fill(); }
    sbGrad(c, -100, 600, 1600, 300, [[0, 'rgba(210,236,250,0)'], [1, 'rgba(210,236,250,0.55)']]); c.restore();
    c.strokeStyle = '#7a4a7a'; c.lineWidth = 4; c.beginPath(); for (let x = -100; x <= 1500; x += 25) x === -100 ? c.moveTo(x, mt(x)) : c.lineTo(x, Math.min(860, mt(x))); c.stroke();
    // the palace hill
    c.fillStyle = '#7ac87a'; c.beginPath(); c.moveTo(2300, 900); c.quadraticCurveTo(2700, 300, 3100, 900); c.closePath(); c.fill();
    c.translate(2700, 420); sbPalace(c, 0, 0, 0.55);
  });
}
function sbVillagePlate() {
  return sbBakeAt('vilPlate', 3000, 930, (c) => { c.translate(0, -300); const R = K.rng(5502);
    // the green hill with the cave exit, the plain behind (fields), the meadow in front
    c.fillStyle = '#6ac86a'; c.beginPath(); c.moveTo(-50, 1230); c.lineTo(-50, 520); c.bezierCurveTo(200, 430, 520, 520, 700, 820); c.lineTo(900, 880); c.lineTo(900, 1230); c.closePath(); c.fill(); ink(c, [[-50, 520], [200, 455], [450, 520], [620, 700], [700, 820]], 3, 2, '#2f7a44');
    sbGrad(c, 600, 760, 2400, 150, [[0, '#9ad87a'], [1, '#7ac868']]);
    // field strips: furrow rows in three greens and one gold, skewed, with canals between
    const fc = ['#5ab85a', '#8ad06a', '#4aa04a', '#e8c85a', '#6ac86a'];
    for (let k = 0; k < 5; k++) { const x0 = 1100 + k * 130, x1 = x0 + 120; c.fillStyle = fc[k]; c.beginPath(); c.moveTo(x0, 900); c.lineTo(x1, 900); c.lineTo(x1 + 40, 770); c.lineTo(x0 + 40, 770); c.closePath(); c.fill(); c.strokeStyle = sbDark(fc[k], 0.25); c.lineWidth = 2; for (let q = 1; q < 6; q++) { const y = 900 - q * 22; c.beginPath(); c.moveTo(x0 + q * 7, y); c.lineTo(x1 + q * 7, y); c.stroke(); } }
    for (let k = 0; k < 5; k++) { const x = 1100 + k * 130 - 6; c.strokeStyle = '#5ac8f0'; c.lineWidth = 8; c.beginPath(); c.moveTo(1060 + k * 14, 930); c.quadraticCurveTo(x - 10, 910, x + 36, 772); c.stroke(); c.strokeStyle = '#2a88c0'; c.lineWidth = 2; c.stroke(); }
    // the track to the village
    c.fillStyle = '#f0d8a8'; c.beginPath(); c.moveTo(880, 960); c.quadraticCurveTo(1400, 930, 3000, 935); c.lineTo(3000, 890); c.quadraticCurveTo(1400, 880, 900, 905); c.closePath(); c.fill(); c.strokeStyle = '#c8a878'; c.lineWidth = 2; c.stroke();
    // houses: mud brick walls, small domes, doors and windows; a well
    for (const [x, w, col, door] of SB_VIL.houses) { const h = 150 + (x % 3) * 20, top = 900 - h; celShade(c, [[x - w / 2, 900], [x - w / 2, top], [x + w / 2, top], [x + w / 2, 900]], col, sbDark(col, 0.18), { light: [-1, -1], off: 22, lw: 3, line: '#8a5a4a' });
      c.fillStyle = sbDark(col, 0.1); for (let q = 0; q < 6; q++) c.fillRect(x - w / 2 + 10 + R() * (w - 40), top + 20 + R() * (h - 40), 26, 6);
      celShade(c, ell(x + (x % 2 ? -20 : 30), top, 44, 40, 24).filter((p) => p[1] <= top), '#fff6ea', '#e0d0e8', { light: [-1, -1], off: 10, lw: 2.5, line: '#8a6a8a' });
      townDoor(c, x - 22, x + 22, 900 - 86, 900, 0, { arch: 'round', paint: door }); townWindow(c, x + w / 2 - 44, top + 40, 30, 36, { arch: 'round', shutters: true }); }
    celShade(c, [[2270, 900], [2270, 860], [2330, 860], [2330, 900]], '#d8c8d8', '#a898b8', { light: [-1, -1], off: 6, lw: 2.5 }); seg(c, 2276, 860, 2276, 800, 5, '#8a5a3a', 1.5); seg(c, 2324, 860, 2324, 800, 5, '#8a5a3a', 1.5); seg(c, 2270, 800, 2330, 800, 5, '#8a5a3a', 1.5);
    // the cave exit arch in the hill (painted depth, plum to teal, never black)
    const [a0, a1, at] = SB_VIL.arch, A = townArchPts(a0, a1, at, 960, 'round'), Ao = townArchPts(a0 - 24, a1 + 24, at - 24, 960, 'round');
    c.save(); K.poly(c, A, true); c.clip(); const g = c.createRadialGradient((a0 + a1) / 2, 860, 10, (a0 + a1) / 2, 860, 200); g.addColorStop(0, '#2f5f6f'); g.addColorStop(0.6, '#4a3a6a'); g.addColorStop(1, '#6a4a8a'); c.fillStyle = g; c.fillRect(a0, at, a1 - a0, 320); c.restore();
    c.save(); c.beginPath(); K.poly(c, Ao, true); c.moveTo(A[0][0], A[0][1]); A.forEach((p) => c.lineTo(...p)); c.closePath(); c.fillStyle = '#b07ab0'; c.fill('evenodd'); c.restore(); ink(c, A, 4, 4, '#4a2a5a');
    for (let i = 0; i < 6; i++) sbFern(c, a0 - 30 + i * 60, at - 10 + Math.abs(i - 2.5) * 22, 40 + (i % 2) * 14, '#3faa5a');
    // the meadow in front: grass, flowers, stones (the lower picture)
    sbGrad(c, -50, 990, 3050, 240, [[0, '#7ad07a'], [1, '#4aa060']]);
    c.fillStyle = '#7ad07a'; c.fillRect(1100, 935, 1900, 60);
    sbDress(c, 0, 3000, 1000, 1220, 5511, { stones: 12, tufts: 26, flowers: 34, shells: 0 });
    sbDress(c, 1150, 3000, 950, 990, 5512, { stones: 3, tufts: 10, flowers: 14, shells: 0 });
    // the river from the cave to the reed pool, the pool (water drawn on the plate; foam and rings live)
    c.fillStyle = '#4ac0e0'; c.beginPath(); c.moveTo(a0 + 10, 905); c.quadraticCurveTo(450, 900, 700, 925); c.lineTo(700, 985); c.quadraticCurveTo(450, 995, a0 - 10, 990); c.closePath(); c.fill();
    const [px, py, rx, ry] = SB_VIL.pool; c.beginPath(); c.ellipse(px, py, rx, ry, 0, 0, 7); c.fill(); c.strokeStyle = '#2a88b0'; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#8ae8f8'; for (let i = 0; i < 10; i++) c.fillRect(px - rx + 30 + R() * (rx * 2 - 60), py - ry + 8 + R() * (ry * 2 - 20), 30 + R() * 30, 5);
    for (let i = 0; i < 6; i++) { const lx = px - 150 + R() * 300, ly = py - 30 + R() * 60; shape(c, ell(lx, ly, 22, 9, 14), '#3faa5a', { lw: 2, line: '#1f6a3a' }); if (i % 2) shape(c, ell(lx + 6, ly - 6, 6, 6, 10), '#ff9ac0', { lw: 1.5 }); }
  });
}
function sbVillage(ctx, t, cam, o = {}) {
  const tc = SB_T2(t);
  sbSkyTall(ctx, 'day', cam, 700); sbSun(ctx, o.sun?.[0] ?? 1700, o.sun?.[1] ?? 170, 50, '#fffbe0', '#ffe0a0', 0.9);
  ctx.drawImage(sbVillageFarPlate(), 0, 0, 3000, 900);
  sbGulls(ctx, t - 110, 600, 260, 22, 3, 55, 0.3);
  ctx.drawImage(sbVillagePlate(), 0, 300);
  // the waterwheel (turning), drops on threes
  const [wx, wy, wr] = SB_VIL.wheel, a = t * 0.9; ctx.save(); ctx.translate(wx, wy); ctx.rotate(a);
  ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, wr, 0, 7); ctx.stroke(); ctx.strokeStyle = '#b07a48'; ctx.lineWidth = 6; ctx.stroke();
  for (let k = 0; k < 8; k++) { const b = k * Math.PI / 4; seg(ctx, 0, 0, Math.cos(b) * wr, Math.sin(b) * wr, 6, '#b07a48', 1.5); ctx.save(); ctx.rotate(b); celShade(ctx, [[wr - 6, -18], [wr + 26, -18], [wr + 26, 18], [wr - 6, 18]], '#c8925a', '#8a5a30', { light: [-1, -1], off: 4, lw: 2 }); ctx.restore(); }
  shape(ctx, ell(0, 0, 18, 18, 12), '#8a5a3a', { lw: 2.5 }); ctx.restore();
  const R = K.rng(5520 + Math.floor(SB_T3(t) * 8)); ctx.fillStyle = '#bff0ff'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(wx + 60 + R() * 70, wy - 40 + R() * 120, 4, 0, 7); ctx.fill(); }
  // palms and the washing line (live), smoke from the second house, doves
  for (const [i, x] of SB_VIL.palms.entries()) palmTree(ctx, x, 902, { s: 0.75, lean: i ? 10 : -14, t: tc + i, sway: 1.2 });
  const l0 = [2470, 770], l1 = [2580, 780]; ctx.save(); ctx.strokeStyle = '#6a5a4a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...l0); ctx.quadraticCurveTo(2525, 800, ...l1); ctx.stroke(); ctx.restore();
  ['#e8364f', '#ffd36a', '#5a9ae0', '#fff6ea'].forEach((col, k) => { const x = 2484 + k * 25, y = 784 + 6 * Math.sin(Math.PI * (k + 0.5) / 4), sw = 0.15 * Math.sin(tc * 2.2 + k); ctx.save(); ctx.translate(x, y); ctx.rotate(sw); celShade(ctx, [[-9, 0], [9, 0], [10, 30], [-10, 28]], col, sbDark(col, 0.25), { light: [-1, -1], off: 3, lw: 1.5 }); ctx.restore(); });
  for (let k = 0; k < 4; k++) { const u = ((t * 0.25 + k / 4) % 1); ctx.save(); ctx.globalAlpha = 0.5 * (1 - u); ctx.fillStyle = '#f4f0fa'; ctx.beginPath(); ctx.arc(2190 + 30 * Math.sin(u * 5 + k), 700 - u * 220, 14 + u * 24, 0, 7); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 3; i++) { const u = ((t * 0.08 + i * 0.3) % 1); bird(ctx, { kind: 'dove', pal: 0, x: 1900 + u * 1100, y: 520 + 40 * Math.sin(u * 9 + i), s: 0.32, dir: 1, fly: true, flap: Math.sin(tc * 22 + i * 2) }); }
  // live water: foam dashes from the cave mouth into the pool, rings in the pool
  const tc3 = SB_T3(t); ctx.save(); ctx.strokeStyle = '#ffffff'; ctx.lineCap = 'round'; const Q = K.rng(5530); for (let i = 0; i < 16; i++) { const x = 180 + (((Q() * 560 + t * 120) % 560) + 560) % 560, y = K.lerp(905, 930, (x - 180) / 520) + 10 + Q() * 50; if (Math.floor(tc3 * 8 / 3 + i) % 4 === 0) continue; ctx.globalAlpha = 0.7; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 22, y); ctx.stroke(); } ctx.restore();
  for (let k = 0; k < 2; k++) sbRing(ctx, 980 + k * 60, 960, ((t * 0.5 + k * 0.5) % 1), 70, { lw: 2.5 });
}
// reeds round the pool and in the near meadow, swaying on twos (front pass)
function sbVillageFront(ctx, t, o = {}) { const tc = SB_T2(t);
  for (let i = 0; i < 12; i++) { const x = 640 + i * 46 + (i % 3) * 8, y = i % 2 ? 1000 : 1010, h = 90 + (i % 4) * 26; if (o.skip && x > o.skip[0] && x < o.skip[1]) continue; ctx.save(); ctx.translate(x, y); ctx.rotate(0.07 * Math.sin(tc * 1.5 + i * 0.9)); for (let k = -1; k <= 1; k++) celShade(ctx, [[k * 7 - 4, 0], [k * 12, -h], [k * 7 + 4, 0]], '#5aa85a', '#2f7a44', { light: [-1, 0], off: 2, lw: 1.5 }); if (i % 3 === 0) celShade(ctx, ell(0, -h - 12, 6, 16, 10), '#8a5a3a', '#5a3a1e', { light: [-1, -1], off: 2, lw: 1.5 }); ctx.restore(); }
}
