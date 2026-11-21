// ===== SIND-01 the whale (the island that moved): a sleeper disturbed, not a monster. Reusable by the Sinbad episodes =====
// sbWhale(ctx, x, y, o): side view, head toward dir (+1 = right). (x, y) = the crown (top of the back). About 1650 long, 520 deep at s 1.
// o: { s, dir, tilt (rad, + = head down), breathe 0..1 (back swells), dress 0..1 (the island on its back: sand rim, green cap, palms,
//      bushes, flowers, shells, the grey blowhole mound), lid 0..1, gaze [gx, gy], brow 0..1 (lowered, grumpy), pupil 0.6..1.2,
//      eyeK (eye scale, 1.6 for the far wide), tail 0..1 (the tail stock and flukes curl up out of the water), spout 0..1 (jet from
//      the blowhole), bubbles (t0 of a string of bubbles from the mouth), silhouette (dark shape, alpha), t, palmsUnder (water y in
//      world units: palms clip there), sway }
// Colours: slate blue back #5a6a9a (shade #3f4c7a), pale grooved belly #c8d4e8, barnacle clusters, small wise eye with a heavy lid.
const SB_WH = { back: '#5a6a9a', shade: '#3f4c7a', belly: '#c8d4e8', bellyD: '#9aa8c8', line: '#1e2448', eye: [548, 262], blow: [500, 44], palms: [-280, -100, 380] };
const sbWhaleTop = (x) => 80 * Math.pow(x / 650, 2);
function sbWhaleBodyPts() {
  const P = []; for (let x = -620; x <= 650; x += 40) P.push([x, sbWhaleTop(x)]);
  P.push([700, 98], [742, 140], [770, 214], [766, 292], [736, 360], [670, 420], [560, 462], [400, 492], [160, 506], [-120, 486], [-360, 420], [-520, 330], [-610, 250], [-640, 190]);
  return P;
}
function sbWhaleTailPts() { return [[-600, 60], [-700, 110], [-790, 150], [-900, 104], [-952, 120], [-918, 168], [-952, 220], [-900, 236], [-790, 196], [-700, 230], [-600, 250]]; }
const SB_WH_BODY = sbWhaleBodyPts();
// the body (and its island dressing) baked once at 1x: local x -1000..900, y -460..540
function sbWhalePlate(dress) {
  return sbBakeAt('whale:' + dress, 1900, 1000, (c) => { c.translate(1000, 460);
    celShade(c, SB_WH_BODY, SB_WH.back, SB_WH.shade, { light: [-0.2, -1], off: 70, lw: 5, line: SB_WH.line });
    c.save(); K.poly(c, SB_WH_BODY, true); c.clip();
    // pale grooved belly and throat
    c.fillStyle = SB_WH.belly; c.beginPath(); c.moveTo(780, 300); c.bezierCurveTo(600, 340, 300, 380, -100, 400); c.lineTo(-500, 300); c.lineTo(-500, 600); c.lineTo(800, 600); c.closePath(); c.fill();
    c.strokeStyle = SB_WH.bellyD; c.lineWidth = 4; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(740 - k * 10, 330 + k * 26); c.bezierCurveTo(500, 370 + k * 24, 200, 410 + k * 20, -200 + k * 40, 430 + k * 14); c.stroke(); }
    // mouth line
    c.strokeStyle = SB_WH.line; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(766, 300); c.bezierCurveTo(680, 318, 560, 324, 470, 300); c.stroke();
    // barnacle clusters on the head and the side
    const R = K.rng(12); for (const [bx, by, n] of [[660, 150, 9], [560, 120, 6], [-300, 250, 7], [120, 300, 5]]) for (let i = 0; i < n; i++) { const px = bx + (R() - 0.5) * 90, py = by + (R() - 0.5) * 60, r = 5 + R() * 8; c.fillStyle = '#d8dcea'; c.beginPath(); c.arc(px, py, r, 0, 7); c.fill(); c.strokeStyle = '#6a7090'; c.lineWidth = 2; c.stroke(); c.fillStyle = '#6a7090'; c.beginPath(); c.arc(px, py, r * 0.35, 0, 7); c.fill(); }
    // skin wrinkles
    c.strokeStyle = K.rgba(SB_WH.line, 0.35); c.lineWidth = 3; for (const [x0, y0] of [[300, 160], [0, 200], [-260, 160], [420, 220]]) { c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo(x0 + 60, y0 + 14, x0 + 120, y0 + 4); c.stroke(); }
    c.restore();
    // pectoral fin
    celShade(c, [[400, 400], [330, 520], [250, 560], [280, 500], [330, 410]], SB_WH.back, SB_WH.shade, { light: [-0.2, -1], off: 14, lw: 4, line: SB_WH.line });
    if (!dress) { // blowhole slit
      c.strokeStyle = SB_WH.line; c.lineWidth = 5; c.beginPath(); c.moveTo(480, 46); c.lineTo(524, 52); c.stroke(); return; }
    // ---- the island on its back ----
    const top = (x) => sbWhaleTop(x);
    // sand rim (a thin beach following the back) and the green cap with a bumpy top edge
    const sand = []; for (let x = -650; x <= 660; x += 20) sand.push([x, top(x) - 10 - 6 * Math.max(0, 1 - Math.abs(x) / 650)]); for (let x = 660; x >= -650; x -= 20) sand.push([x, top(x) + 22]);
    celShade(c, sand, '#f2d49a', '#d4a868', { light: [-0.3, -1], off: 6, lw: 3, line: '#8a6030' });
    const g = [], R2 = K.rng(5); for (let x = -560; x <= 560; x += 16) g.push([x, top(x) - 16 - 10 * Math.cos(x / 560 * Math.PI / 2) - R2() * 6]); for (let x = 560; x >= -560; x -= 20) g.push([x, top(x) + 6]);
    celShade(c, g, '#4fb86a', '#2f8a50', { light: [-0.3, -1], off: 10, hi: '#8ae07a', lw: 3.5, line: '#1e5a34' });
    // the grey blowhole "rock" with barnacles at the head end
    celShade(c, [[456, top(456) - 2], [470, top(470) - 34], [500, top(500) - 46], [536, top(536) - 38], [552, top(552) - 4]], '#a8a4c0', '#6e6a90', { light: [-1, -1], off: 10, hi: '#d0cce0', lw: 3, line: '#3a3858' });
    for (let i = 0; i < 6; i++) { const px = 470 + i * 13, py = top(px) - 20 - (i % 2) * 10; c.fillStyle = '#e8e8f0'; c.beginPath(); c.arc(px, py, 4, 0, 7); c.fill(); c.strokeStyle = '#5a5878'; c.lineWidth = 1.5; c.stroke(); }
    // bushes, tufts, flowers, shells and stones along the cap and the rim
    const Rb = K.rng(41); for (let i = 0; i < 9; i++) { const x = -520 + Rb() * 1000; if (Math.abs(x - 40) < 160 || x > 430) continue; const r = 26 + Rb() * 26; sbBlob(c, x, top(x) - 14 - r * 0.4, r, r * 0.65, '#3fa45e', '#24704a', { lw: 2.5, off: r * 0.3, hi: '#7ad07a' }); }
    const R3 = K.rng(19); for (let i = 0; i < 40; i++) { const x = -600 + R3() * 1200, q = R3(), y = top(x) - 6 - q * 6; if (x > 440 && x < 570) continue;
      if (Math.abs(x) > 560) { if (q < 0.5) sbShell(c, x, top(x) - 2, 7 + q * 6); else sbStone(c, x, top(x) - 2, 7 + q * 7, '#d8ccc0', '#9a8a80'); }
      else if (q < 0.45) sbTuft(c, x, y, 16 + q * 18, '#6ac85a', '#2f7a44'); else sbFlower(c, x, y, 16 + q * 12, ['#ff6a8a', '#ffd36a', '#fff6ea', '#c08aff'][Math.floor(q * 31) % 4]); }
  });
}
function sbWhale(ctx, x, y, o = {}) {
  const s = o.s || 1, dir = o.dir || 1, t = o.t || 0, tc = SB_T2(t), dress = o.dress ? 1 : 0, br = o.breathe || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.tilt || 0) * dir); ctx.scale(dir * s, s * (1 + 0.012 * br));
  if (o.silhouette) { ctx.globalAlpha *= o.silhouette; ctx.fillStyle = '#1a2a5a'; K.poly(ctx, SB_WH_BODY, true); ctx.fill(); K.poly(ctx, sbWhaleTailPts(), true); ctx.fill(); ctx.restore(); return; }
  // tail stock and flukes (behind the body), curling up about (-560, 150) with the flukes arriving late (lagged by the caller)
  const tl = K.clamp(o.tail || 0), fl = o.fluke ?? tl;
  ctx.save(); ctx.translate(-560, 150); ctx.rotate(tl * 1.25 + idleSway(tc, 61, 0.03, 4)); ctx.translate(560, -150);
  if (fl > 0.05) { // the iconic raised flukes at the tail end
    ctx.save(); ctx.translate(-860, 170); ctx.rotate(-Math.PI / 2 + 0.25 * (1 - fl)); const w = 1 + 0.3 * fl;
    celShade(ctx, [[-30, -40], [-60, 80], [-30, 250 * w * 0.5], [-160 * w, 330], [-230 * w, 290], [-120, 150], [0, 70], [120, 150], [230 * w, 290], [160 * w, 330], [30, 125], [60, 80], [30, -40]].map(([a, b]) => [b * 0.85, a]), SB_WH.back, SB_WH.shade, { light: [-0.3, -1], off: 22, lw: 5, line: SB_WH.line });
    ctx.restore(); }
  celShade(ctx, sbWhaleTailPts(), SB_WH.back, SB_WH.shade, { light: [-0.2, -1], off: 26, lw: 5, line: SB_WH.line });
  ctx.restore();
  ctx.drawImage(sbWhalePlate(dress), -1000, -460, 1900, 1000);
  // palms on the island (live: they sway; they go under the water with the island)
  if (dress && o.palms !== false) for (let i = 0; i < 3; i++) { const px = SB_WH.palms[i], py = sbWhaleTop(px) - 12, h = [320, 360, 300][i];
    palmTree(ctx, px, py, { h, s: 0.62, lean: [-14, 10, 18][i], t: tc + i, sway: (o.sway ?? 1) * (1 + 0.5 * i), nuts: i === 1 ? 3 : 2 }); }
  // the eye: small and wise, heavy lid; drawn oversize (eyeK) in far wides so it reads
  const [ex, ey] = SB_WH.eye, k = o.eyeK || 1, lid = K.clamp(o.lid ?? 1), gz = o.gaze || [0.3, -0.2], bw = K.clamp(o.brow || 0);
  ctx.save(); ctx.translate(ex, ey); ctx.scale(k, k);
  shape(ctx, ell(0, 0, 30, 20, 24), '#fff6e8', { lw: 3 });
  if (lid < 0.97) { ctx.save(); K.poly(ctx, ell(0, 0, 30, 20, 24), true); ctx.clip(); const pr = 11 * (o.pupil || 1); ctx.fillStyle = '#3a2a1a'; ctx.beginPath(); ctx.arc(gz[0] * 12, gz[1] * 8, 14, 0, 7); ctx.fill(); ctx.fillStyle = '#0e0a14'; ctx.beginPath(); ctx.arc(gz[0] * 12, gz[1] * 8, pr * 0.7, 0, 7); ctx.fill(); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(gz[0] * 12 - 5, gz[1] * 8 - 5, 3.5, 0, 7); ctx.fill();
    ctx.fillStyle = SB_WH.back; ctx.fillRect(-34, -24, 68, 44 * lid + 4 * bw); ctx.restore(); }
  else { ctx.fillStyle = SB_WH.back; K.poly(ctx, ell(0, 0, 30, 20, 24), true); ctx.fill(); }
  ctx.strokeStyle = SB_WH.line; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; const ly = -20 + 40 * lid; ctx.beginPath(); ctx.moveTo(-32, ly * 0.6 + 2); ctx.quadraticCurveTo(0, ly - 6, 32, ly * 0.6); ctx.stroke();
  for (let i = 0; i < 3; i++) { ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 4, 38 + i * 9, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }   // heavy wrinkled lids
  ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-36, -34 + bw * 12); ctx.lineTo(34, -40 + bw * 22); ctx.stroke();                         // the brow ridge (grumpy when lowered)
  ctx.restore();
  // a string of bubbles from the mouth corner
  if (o.bubbles != null) sbBubbles(ctx, 600, 300, t, o.bubbles, 7, 420, 8, 14);
  // the spout from the blowhole
  const sp = K.clamp(o.spout || 0);
  if (sp > 0.01) { const [bx, by] = SB_WH.blow, h = 240 * Math.sin(Math.PI * Math.min(1, sp * 1.3)), R = K.rng(3), u = SB_T3(t);
    for (let i = 0; i < 5; i++) { const w = 14 + i * 6, a = (i - 2) * 0.12; celShade(ctx, [[bx - w * 0.5, by], [bx + Math.sin(a) * h - w, by - h * (1 - Math.abs(i - 2) * 0.12)], [bx + Math.sin(a) * h + w, by - h * (1 - Math.abs(i - 2) * 0.12)], [bx + w * 0.5, by]], '#eafcff', '#9ad8f0', { light: [-1, -1], off: 6, lw: 2.5, line: '#2a6aa8' }); }
    for (let i = 0; i < 14; i++) { const a = -Math.PI / 2 + (R() - 0.5) * 2.4, v = 120 + R() * 140, q = K.clamp(sp * 1.2 - 0.2), px = bx + Math.cos(a) * v * q, py = by - h + Math.sin(a) * v * q * 0.6 + 260 * q * q; ctx.save(); ctx.globalAlpha = 1 - q * 0.5; sbBlob(ctx, px, py, 7 + R() * 6, 9 + R() * 6, '#eafcff', '#9ad8f0', { lw: 2, off: 3, line: '#2a6aa8' }); ctx.restore(); } }
  ctx.restore();
}
// world position of a whale-local point (fire on the back, the eye...)
function sbWhalePt(x, y, o, lx, ly) { const s = o.s || 1, dir = o.dir || 1, a = (o.tilt || 0) * dir, c = Math.cos(a), n = Math.sin(a), px = lx * dir * s, py = ly * s; return [x + px * c - py * n, y + px * n + py * c]; }

// the eye close-up under the water (panel units 1000 x 1230): wrinkled slate skin filling the frame, the lid slides open, the pupil
// shrinks in the light and rolls up. F: {lid, gaze, pupil, t, brow}
function sbWhaleEyeCU(ctx, F) {
  const t = F.t || 0; ctx.drawImage(sbUnderPlate(1000, 1230), 0, 0);
  ctx.save(); ctx.translate(520, 660);
  celShade(ctx, [[-700, -380], [700, -520], [760, 700], [-760, 760]], SB_WH.back, SB_WH.shade, { light: [-0.3, -1], off: 90, lw: 0 });
  const R = K.rng(4); ctx.strokeStyle = K.rgba(SB_WH.line, 0.5); ctx.lineCap = 'round';
  for (let i = 0; i < 16; i++) { const y = -340 + i * 50 + R() * 20, x0 = -600 + R() * 200; ctx.lineWidth = 4 + R() * 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.bezierCurveTo(x0 + 300, y - 30 + R() * 40, x0 + 700, y + 30, x0 + 1100, y - 10); ctx.stroke(); }
  for (let i = 0; i < 12; i++) { const px = 200 + R() * 360, py = -360 + R() * 160, r = 12 + R() * 16; ctx.fillStyle = '#d8dcea'; ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fill(); ctx.strokeStyle = '#6a7090'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#6a7090'; ctx.beginPath(); ctx.arc(px, py, r * 0.35, 0, 7); ctx.fill(); }
  // the eye
  const lid = K.clamp(F.lid ?? 0), gz = F.gaze || [0, 0], E = ell(0, 0, 230, 140, 40);
  shape(ctx, E, '#fff3e0', { lw: 8 });
  ctx.save(); K.poly(ctx, E, true); ctx.clip();
  const ix = gz[0] * 70, iy = gz[1] * 50; celShade(ctx, ell(ix, iy, 110, 110, 40), '#5a3a22', '#3a2210', { light: [-1, -1], off: 24, lw: 4, line: '#1a0e08' });
  ctx.fillStyle = '#0c0810'; ctx.beginPath(); ctx.ellipse(ix, iy, 58 * (F.pupil ?? 1), 64 * (F.pupil ?? 1), 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(ix - 40, iy - 44, 20, 26, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(ix + 34, iy + 40, 9, 0, 7); ctx.fill();
  if (lid > 0) celShade(ctx, [[-260, -170], [260, -170], [260, -170 + 330 * lid], [0, -150 + 340 * lid], [-260, -170 + 330 * lid]], SB_WH.back, SB_WH.shade, { light: [0, -1], off: 26, lw: 6, line: SB_WH.line });
  ctx.restore();
  ctx.strokeStyle = SB_WH.line; ctx.lineWidth = 10; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(0, 10, 270 + i * 40, 180 + i * 34, 0, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); }
  ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(-300, -240 + (F.brow || 0) * 40); ctx.quadraticCurveTo(0, -330 + (F.brow || 0) * 60, 300, -250 + (F.brow || 0) * 80); ctx.stroke();
  ctx.restore();
  sbBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#bff8ff', '#7fe3ff'], alpha: 0.14, angle: 0.35, speed: 120, w: 160 });
  sbBubbles(ctx, 160, 1150, t, 40.1, 9, 1100, 21, 18); sbBubbles(ctx, 860, 1180, t, 40.4, 6, 1000, 22, 12);
}
