// ===== The Ebony Horse series: the locked court, the craftsman, the clues (new in HORSE-04, reused by HORSE-05) =====
// lockedCourt (strip 1600, floor y 900; models golden and dusk) with gateBar (barred gate with grilles, bar, padlock, shutter) and
// latticeScreen (the mashrabiya bay a figure listens behind). craftsmanDisguise (Firuz as a craftsman), toolbox (+ hammer, oil can,
// magnifier), saddleOrnament (the brass sun rosette) and ehRosettes (the row on the ebony horse's saddle cloth, opt-in, one missing),
// and the picture devices: iconBalloon, memoryCard, routeMap, ehTick, ehCallout. Pure functions of their arguments.

// ---------- lockedCourt geometry ----------
const EH_LC = { w: 1600, gate: [120, 360, 580], grille: [600, 720], bar: 740, star: 800, basin: [520, 945, 60], rill: [580, 1380, 945], screen: [1180, 1460, 330, 600],
  lanterns: [440, 760, 1080], lanternY: 560, bench: 1040, door: [1260, 1380, 640], moon: [980, 250], wallTop: 430 };
const EH_LCM = {
  golden: { sky: [[0, '#5a8ae0'], [0.55, '#a8c8f0'], [1, '#ffe0a8']], wall: '#f8ecd8', wallS: '#e0c0a0', floor: '#f2e2c4', floorL: '#d8c4a0', mtn: '#9a8ad0', mtnS: '#7468b0', snow: '#fff2e4', glow: 0 },
  dusk: { sky: [[0, '#7a78d0'], [0.45, '#b49ae0'], [0.8, '#ffb8a8'], [1, '#ffd4a8']], wall: '#f6dcd0', wallS: '#d8b0b8', floor: '#ecd4c8', floorL: '#cfb0b0', mtn: '#8a7ac0', mtnS: '#6a5aa0', snow: '#ffe6e0', glow: 1 },
};
function ehCourtSkyPlate(model) {
  return ehBakeAt('lcsky:' + model, 2400, 1100, (c) => { const M = EH_LCM[model], R = K.rng(5); c.translate(400, 600);
    ehGrad(c, -400, -600, 2400, 1100, M.sky);
    for (let i = 0; i < 6; i++) ehCloud(c, -300 + i * 420 + R() * 100, -420 + R() * 300, 380, 80, model === 'dusk' ? '#ffd8d0' : '#fff6ea', model === 'dusk' ? '#c890c0' : '#f0c0a0', 8, i + 21);
    if (model === 'dusk') { c.fillStyle = '#fff6ea'; for (let i = 0; i < 30; i++) { c.globalAlpha = 0.4 + R() * 0.5; c.fillRect(-400 + R() * 2400, -600 + R() * 400, 3, 3); } c.globalAlpha = 1; }
    for (let x = -400; x < 2000; x += 300) { const h = 140 + R() * 120, pk = [x + 150, 380 - h]; celShade(c, [[x - 60, 460], pk, [x + 360, 460]], M.mtn, M.mtnS, { light: [-1, -1], off: 50, lw: 2.5, line: ehDark(M.mtnS, 0.3) });
      shape(c, [[pk[0] - 40, pk[1] + 46], pk, [pk[0] + 46, pk[1] + 50], [pk[0] + 10, pk[1] + 36]], M.snow, { lw: 2, line: ehDark(M.mtnS, 0.2) }); }
    // beyond the wall: the big tangerine dome top and one tower
    const FM = { wall: M.wall, wallS: M.wallS }; celShade(c, K.rectPts(1418, 200, 44, 300), FM.wall, FM.wallS, { off: 10, lw: 3, line: EH_FP_LINE }); ehDome(c, 1440, 200, 28, EH_TANGERINE, '#d8661a');
    celShade(c, K.rectPts(260, 330, 300, 200), FM.wall, FM.wallS, { off: 30, lw: 3, line: EH_FP_LINE }); ehDome(c, 410, 330, 130, EH_TANGERINE, '#d8661a');
  }, 0.35);
}
function ehCourtMainPlate(model) {
  return ehBakeAt('lcmain:' + model, 1600, 1050, (c) => { const M = EH_LCM[model], ln = EH_FP_LINE, R = K.rng(8); c.translate(0, -280);
    // back wall with crenels and the cobalt tile band
    celShade(c, K.rectPts(-20, EH_LC.wallTop, 1640, 880 - EH_LC.wallTop), M.wall, M.wallS, { light: [-1, -1], off: 26, lw: 4, line: ln });
    for (let x = -10; x < 1620; x += 40) celShade(c, K.rectPts(x, EH_LC.wallTop - 24, 24, 26), M.wall, M.wallS, { off: 4, lw: 2.5, line: ln });
    celShade(c, K.rectPts(-20, 470, 1640, 30), EH_COBALT, '#1a2e90', { off: 6, lw: 2.5, line: '#141a5a' });
    c.save(); c.fillStyle = '#ffd36a'; for (let x = -10; x < 1620; x += 30) { c.beginPath(); c.moveTo(x, 485); c.lineTo(x + 8, 476); c.lineTo(x + 16, 485); c.lineTo(x + 8, 494); c.closePath(); c.fill(); } c.restore();
    // ivy on the wall, the dovecote on the wall top
    for (let i = 0; i < 40; i++) { const x = 560 + R() * 260, y = 440 + R() * 300; ehBlob(c, x, y, 10, 8, '#4a9a4a', '#2f7a44', { lw: 1.5, off: 3 }); }
    celShade(c, K.rectPts(590, 340, 70, 70), M.wall, M.wallS, { off: 10, lw: 3, line: ln }); celShade(c, [[580, 342], [625, 300], [670, 342]], EH_TANGERINE, '#d8661a', { off: 8, lw: 3, line: ln });
    for (const [x, y] of [[606, 366], [636, 366], [620, 392]]) { c.fillStyle = '#3a2a4a'; c.beginPath(); c.arc(x, y, 7, 0, 7); c.fill(); }
    // gateway (dark; leaves are live) with its arch frame
    const [g0, g1, gt] = EH_LC.gate; shape(c, townArchPts(g0 - 18, g1 + 18, gt - 24, 884, 'pointed'), EH_TANGERINE, { lw: 3.5, line: ln });
    // lantern brackets
    for (const x of EH_LC.lanterns) { seg(c, x, 500, x, 518, 5, '#4a3a5a', 1); seg(c, x - 26, 512, x, 512, 4, '#4a3a5a', 1); }
    // screen bay structure: corbels, tile cap, the frame (the lattice is live), the shut stair door under it
    const [s0, s1, sy0, sy1] = EH_LC.screen;
    for (const x of [s0 + 20, (s0 + s1) / 2, s1 - 20]) celShade(c, [[x - 18, sy1], [x + 18, sy1], [x + 6, sy1 + 46], [x - 6, sy1 + 46]], M.wall, M.wallS, { off: 6, lw: 2.5, line: ln });
    celShade(c, K.rectPts(s0 - 16, sy0 - 12, s1 - s0 + 32, sy1 - sy0 + 30), '#a8703a', '#7a4a2a', { off: 10, lw: 3.5, line: '#4a2a14' });
    celShade(c, [[s0 - 30, sy0 - 10], [s0 - 6, sy0 - 50], [s1 + 6, sy0 - 50], [s1 + 30, sy0 - 10]], EH_TANGERINE, '#d8661a', { off: 10, lw: 3, line: ln });
    const [d0, d1, dt] = EH_LC.door; shape(c, townArchPts(d0, d1, dt, 880, 'round'), '#a8703a', { lw: 3, line: '#4a2a14' }); c.save(); c.strokeStyle = '#7a4a2a'; c.lineWidth = 2; for (let x = d0 + 20; x < d1; x += 20) { c.beginPath(); c.moveTo(x, dt + 20); c.lineTo(x, 880); c.stroke(); } c.restore(); ehBrassDisc(c, d1 - 20, 780, 6, 0, { lw: 1.5 });
    // floor: paving with joints, the star inlay at 800
    ehGrad(c, -20, 860, 1640, 480, [[0, M.floorL], [0.2, M.floor], [1, M.floor]]);
    c.save(); c.strokeStyle = ehDark(M.floorL, 0.12); c.lineWidth = 2; for (let y = 880; y < 1340; y += 30 + (y - 880) * 0.08) { c.beginPath(); c.moveTo(-20, y); c.lineTo(1640, y); c.stroke(); }
    for (let x = -200; x < 1800; x += 64) { c.beginPath(); c.moveTo(x + (x - 800) * 0.02, 866); c.lineTo(x + (x - 800) * 0.7, 1340); c.stroke(); } c.restore();
    c.save(); c.translate(EH_LC.star, 905); c.scale(1, 0.3); for (const r of [0, Math.PI / 4]) { c.save(); c.rotate(r); celShade(c, K.rectPts(-110, -110, 220, 220), '#f2c040', '#d8a020', { off: 0, lw: 5, line: '#a87a1c' }); c.restore(); }
    shape(c, ell(0, 0, 60, 60, 24), EH_COBALT, { lw: 4, line: '#141a5a' }); c.restore();
    // basin and rill (water blue with a bank line)
    const [bx, by, br] = EH_LC.basin; celShade(c, ell(bx, by, br + 12, (br + 12) * 0.36, 30), M.wall, M.wallS, { off: 6, lw: 3, line: ln }); shape(c, ell(bx, by - 2, br, br * 0.32, 30), '#3a78d0', { lw: 2, line: '#2a3a7a' });
    const [r0, r1, ry] = EH_LC.rill; c.fillStyle = M.wallS; c.fillRect(r0, ry - 17, r1 - r0, 34); c.fillStyle = '#2a3a7a'; c.fillRect(r0, ry - 15, r1 - r0, 3); ehGrad(c, r0, ry - 12, r1 - r0, 26, [[0, '#3a6ac8'], [0.5, '#5a92e0'], [1, '#3058b0']]);
    // dressing: stacked jars, the work bench, the orange tree in a tub
    for (const [x, y, r, col] of [[50, 880, 30, '#c8703a'], [96, 884, 24, '#3f7ad0'], [70, 834, 22, '#e8b048']]) { ehBlob(c, x, y - r, r, r * 1.1, col, ehDark(col, 0.3), { lw: 2.5, off: r * 0.3 }); celShade(c, K.rectPts(x - r * 0.4, y - r * 2.2, r * 0.8, r * 0.4), col, ehDark(col, 0.3), { off: 2, lw: 2, line: ln }); }
    celShade(c, K.rectPts(EH_LC.bench - 70, 842, 140, 16), '#a8703a', '#7a4a2a', { off: 4, lw: 2.5, line: '#4a2a14' }); for (const x of [-60, 56]) seg(c, EH_LC.bench + x, 856, EH_LC.bench + x, 884, 7, '#7a4a2a', 2);
    celShade(c, [[1470, 880], [1530, 880], [1540, 830], [1460, 830]], '#c8703a', '#984a24', { off: 6, lw: 3, line: ln }); seg(c, 1500, 830, 1500, 720, 10, '#8a5a3a', 2);
    ehBlob(c, 1500, 660, 70, 64, '#3f9a4a', '#2a7a3c', { lw: 3, off: 22, hi: '#6ac25a' }); for (let i = 0; i < 7; i++) ehBlob(c, 1460 + R() * 80, 630 + R() * 60, 8, 8, '#ff9a2a', '#e0701a', { lw: 1.5, off: 3 });
    ehDress(c, 0, 1600, 1150, 1320, 19, { stones: 4, tufts: 10, flowers: 6 });
  }, 0.75);
}
// the gate: grilles in the upper leaves, the bar (barY 0 = up on its hook .. 1 = down in the brackets), padlock, a sliding shutter over
// the left grille (0..1), open 0..1; o.outside(ctx) draws what is behind (the inventor's face) before the leaves
function gateBar(ctx, t, o = {}) {
  const [g0, g1, gt] = EH_LC.gate, [gy0, gy1] = EH_LC.grille, mid = (g0 + g1) / 2, op = K.clamp(o.open || 0), k = 1 - op * 0.82, ln = '#3a2414';
  ctx.save(); K.poly(ctx, townArchPts(g0, g1, gt, 884, 'pointed'), true); ctx.clip();
  ehGrad(ctx, g0, gt, g1 - g0, 884 - gt, [[0, o.dusk ? '#c8a0c8' : '#a8c8f0'], [0.62, o.dusk ? '#e8c0b8' : '#f6e6c8'], [1, o.dusk ? '#d8b0a8' : '#efd8b0']]);
  if (o.outside) o.outside(ctx);
  for (const sd of [-1, 1]) { const w = (mid - g0) * k, xa = sd < 0 ? g0 : g1 - w, cx0 = xa + w * 0.18, cx1 = xa + w * 0.82;
    ctx.save(); ctx.beginPath(); ctx.rect(xa, gt - 80, w, 980 - gt); if (op < 0.5) ctx.rect(cx1, gy0, cx0 - cx1, gy1 - gy0); ctx.fillStyle = '#a8703a'; ctx.fill('evenodd'); ctx.strokeStyle = ln; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { const x = xa + w * i / 4; ctx.beginPath(); ctx.moveTo(x, gy1 + 4); ctx.lineTo(x, 884); ctx.stroke(); } ctx.restore();
    if (op < 0.5) { for (let i = 0; i <= 5; i++) seg(ctx, K.lerp(cx0, cx1, i / 5), gy0, K.lerp(cx0, cx1, i / 5), gy1, 5, '#3a3448', 1); for (const y of [gy0 + 40, gy0 + 80]) seg(ctx, cx0, y, cx1, y, 4, '#3a3448', 1);
      if (sd < 0 && o.shutter > 0) celShade(ctx, K.rectPts(cx0, gy0, (cx1 - cx0) * K.clamp(o.shutter), gy1 - gy0), '#8a5a34', '#6a3a1a', { off: 6, lw: 2.5, line: ln }); }
    for (const y of [gt + 30, 830]) seg(ctx, xa + 4, y, xa + w - 4, y, 7, '#3a3448', 0); }
  ctx.restore();
  // bar brackets, the bar (falls with one bounce), padlock
  const by = EH_LC.bar; for (const x of [g0 + 30, g1 - 30]) celShade(ctx, K.rectPts(x - 12, by - 6, 24, 26), '#3a3448', '#241f30', { off: 4, lw: 2, line: '#141018' });
  const bk = K.clamp(o.bar ?? 0); if (op < 0.1 || bk < 0.5) { const yy = K.lerp(by - 70, by, bk) - (o.barBounce || 0); celShade(ctx, K.rectPts(g0 + 10, yy - 11, g1 - g0 - 20, 22), '#8a5a34', '#5a3418', { light: [-1, -1], off: 6, hi: '#b88a5a', lw: 3, line: ln }); }
  else { const yy = by - 160; celShade(ctx, K.rectPts(g1 + 30, yy, 22, 200), '#8a5a34', '#5a3418', { off: 5, lw: 3, line: ln }); }
  if (o.lock > 0 && op < 0.1) { const lx = mid, ly = by + 30, sh = o.lockSwing || 0; ctx.save(); ctx.translate(lx, ly - 18); ctx.rotate(sh); ctx.strokeStyle = '#a8b0c8'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 11, Math.PI, 0); ctx.stroke(); ctx.restore();
    celShade(ctx, K.rectPts(lx - 17, ly - 18, 34, 34), '#e0b038', '#a87a1c', { off: 6, hi: '#fff1b0', lw: 2.5, line: '#6a4a10' }); ctx.fillStyle = '#3a2a14'; ctx.fillRect(lx - 2, ly - 4, 4, 10); }
}
// latticeScreen(ctx, o): the mashrabiya front. o {x0, x1, y0, y1, cols, rows, behind(c), glow 0..1, ribbon 0..1 (rose sash end through
// the bottom row's second opening), t, eyeCells [[col, row]...] (star openings), col (panel)}
function ehStarPts(cx, cy, r) { const p = []; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 - Math.PI / 2, rr = i % 2 ? r * 0.62 : r; p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } return p; }
function ehCrossPts(cx, cy, r) { const a = r * 0.36; return [[cx - a, cy - r], [cx + a, cy - r], [cx + a, cy - a], [cx + r, cy - a], [cx + r, cy + a], [cx + a, cy + a], [cx + a, cy + r], [cx - a, cy + r], [cx - a, cy + a], [cx - r, cy + a], [cx - r, cy - a], [cx - a, cy - a]]; }
function latticeScreen(ctx, o = {}) {
  const { x0, x1, y0, y1 } = o, cols = o.cols || 6, rows = o.rows || 5, cw = (x1 - x0) / cols, rh = (y1 - y0) / rows, r = Math.min(cw, rh) * (o.hole || 0.38), g = o.glow ?? 1;
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip();
  ehGrad(ctx, x0, y0, x1 - x0, y1 - y0, [[0, ehMix('#8a5a4a', '#ffcf7a', g)], [1, ehMix('#5a3a3a', '#ff9a5a', g)]]); if (g > 0) ehGlow(ctx, (x0 + x1) / 2, y0 + (y1 - y0) * 0.3, (x1 - x0) * 0.7, 0.7 * g, '#ffe0a0');
  if (o.behind) o.behind(ctx);
  ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const cx = x0 + cw * (i + 0.5), cy = y0 + rh * (j + 0.5), pts = (i + j) % 2 === 0 ? ehStarPts(cx, cy, r) : ehCrossPts(cx, cy, r * 0.9); K.poly(ctx, pts, true); }
  ctx.fillStyle = o.col || '#c89a5a'; ctx.fill('evenodd'); ctx.strokeStyle = '#6a4220'; ctx.lineWidth = o.lw || 2.5; ctx.stroke();
  ctx.save(); ctx.globalAlpha = 0.5; ctx.strokeStyle = '#e8c088'; ctx.lineWidth = (o.lw || 2.5) * 0.8; for (let i = 1; i < cols; i++) { ctx.beginPath(); ctx.moveTo(x0 + cw * i, y0); ctx.lineTo(x0 + cw * i, y1); ctx.stroke(); } ctx.restore();
  ctx.restore();
  if (o.ribbon > 0) { const cx = x0 + cw * 1.5, cy = y0 + rh * (rows - 0.5), tt = o.t || 0; ehRibbon(ctx, cx, cy + r * 0.3, Math.PI / 2 + 0.2 * Math.sin(tt * 9), 40 * (o.rs || 1) * K.clamp(o.ribbon), 12 * (o.rs || 1), tt, EH_ROSESASH, { wave: 6 * (o.rs || 1), hz: 2.6, tip: 0.6, shade: '#d8507a', lw: 2 }); }
  ctx.save(); ctx.strokeStyle = '#4a2a14'; ctx.lineWidth = o.frame || 5; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.restore();
}
// the screen in the court (wide): the lamp-lit back, the princess bust, the lattice; o {glow, bust P fields, ribbon, t}
function ehCourtScreen(ctx, t, o = {}) { const [s0, s1, sy0, sy1] = EH_LC.screen;
  latticeScreen(ctx, { x0: s0, x1: s1, y0: sy0, y1: sy1, glow: o.glow ?? 0, ribbon: o.ribbon || 0, t, behind: (c) => { if (o.bust) { const P = { x: 1320, y: 650, s: 0.8, dir: -1, ...o.bust }; person(c, ehDressP(EH_PRINCESS, P)); } } }); }
// the court set: sky (cross-fade by o.dusk 0..1), moon, main plate, lanterns. Returns the anchors.
function lockedCourt(ctx, t, cam, o = {}) {
  const dk = K.clamp(o.dusk || 0), dx = (cam.x - 800) * 0.5, dy = (cam.y - 500) * 0.3;
  if (dk < 1) ctx.drawImage(ehCourtSkyPlate('golden'), -400 + dx, -600 + dy, 2400, 1100);
  if (dk > 0) { ctx.save(); ctx.globalAlpha *= dk; ctx.drawImage(ehCourtSkyPlate('dusk'), -400 + dx, -600 + dy, 2400, 1100); ctx.restore(); }
  if (dk > 0 || o.sun) { if (o.sun) { const [sx, sy] = o.sun; ehGlow(ctx, sx + dx, sy + dy, 260, 0.6, '#ffd890'); celShade(ctx, ell(sx + dx, sy + dy, 44, 44, 30), '#fff2c0', '#ffd890', { off: 6, lw: 0 }); }
    if (dk > 0) { const [mx, my] = EH_LC.moon, rise = o.moonRise ?? 0; ctx.save(); ctx.globalAlpha *= dk; ehMoon(ctx, mx + dx * 0.8, my + dy + 60 * (1 - rise), 64, t, 1); ctx.restore(); } }
  if (dk < 1) ctx.drawImage(ehCourtMainPlate('golden'), 0, 280, 1600, 1050);
  if (dk > 0) { ctx.save(); ctx.globalAlpha *= dk; ctx.drawImage(ehCourtMainPlate('dusk'), 0, 280, 1600, 1050); ctx.restore(); }
  const t3 = EH_T3(t); EH_LC.lanterns.forEach((x, i) => { const lit = o.lit ? K.clamp(o.lit[i] || 0) : 0; if (lit > 0) lampGlow(ctx, x, 880, 140, 0.6 * lit); ehLantern(ctx, x, EH_LC.lanternY, t3 + i, lit); });
  return EH_LC;
}

// ---------- the craftsman disguise ----------
const EH_CRAFT = { costume: 'carpenter', s: 0.95, age: 0, pal: { robe: '#f6efe0', dot: '#d9cdb4', sleeve: '#c89a6a', sleeveLen: 'long', apron: '#b0703a', cape: '#8a5a34', capeDot: '#6a3e1e', pants: '#6a5a4a', shoes: '#7a4a2a', head: 'cap', hc: '#d8c8a0', hd: '#8a5a34', beard: 'none', tache: false, sash: '#8a5a34', hair: '#1a1420' } };
// overlay over a standing person P (drawn after person): front cloak edges, the soft cap band, the pencil, the crimson sash corner with the
// saffron knot at the left hip (o.corner 0..1: 1 = showing; o.tug pulls the cloak over it), o.lagTip (the cloak lags the body)
function craftsmanDisguise(ctx, P, t, o = {}) {
  const s = P.s || 1, d = Math.sign(P.dir || 1), a = ((o.lagTip ?? P.tip) || 0) * d, ln = '#3a2414', cl = EH_CRAFT.pal.cape, sit = K.clamp((P.kneel || 0) + (P.sit || 0));
  ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(a); ctx.scale(d * s, s); const dr = P.drop || 0;
  const cor = K.clamp(o.corner ?? 1);
  if (sit < 0.5) { celShade(ctx, [[-36, -146 + dr], [-20, -144 + dr], [-24 + 6 * cor, -88], [-30, -40], [-46, -42]], cl, '#6a3e1e', { light: [-1, -1], off: 6, lw: 2.5, line: ln });
    celShade(ctx, [[36, -146 + dr], [20, -144 + dr], [26, -60], [30, -40], [46, -42]], cl, '#6a3e1e', { light: [-1, -1], off: 6, lw: 2.5, line: ln }); }
  if (cor > 0.05) { ctx.save(); ctx.translate(-20, -86); ctx.scale(cor, cor); shape(ctx, [[-2, -8], [16, -6], [6, 14]], EH_CRIMSON, { lw: 2, line: '#6a0a20' }); shape(ctx, ell(3, -6, 5.5, 5, 10), EH_SAFFRON, { lw: 1.5, line: '#8a5a10' }); ctx.restore(); }
  ctx.restore();
  // pencil behind the ear (head frame)
  const [hx, hy] = ehHeadOf(P); seg(ctx, hx + d * 30 * s, hy - 26 * s, hx + d * 44 * s, hy + 4 * s, 4 * s, '#f2c040', 1);
}
// a craftsman figure: shadow, cloak, person, overlay; o {corner, lagTip, box: {open, crown, swing} (in the left hand), tool: 'hammer' | 'oil' | 'glass' (right hand)}
function ehCraftsman(ctx, P, t, o = {}) { if (!P) return; const D = ehDressP(EH_CRAFT, P);
  groundShadow(ctx, P.x, P.y, 90 * (P.s || 1), 0, { flat: true, color: '#2b1a3a', alpha: 0.2 }); person(ctx, D); craftsmanDisguise(ctx, P, t, o);
  if (o.box) { const [bx, by] = ehHandW(P, P.handL || [-30, -100]); toolbox(ctx, bx, by + 66 * (P.s || 1), { s: P.s, ...o.box, hang: true }); }
  if (o.tool) { const [x, y] = ehHandW(P, P.handR || [30, -100]); ehTool(ctx, o.tool, x, y, P.s || 1, o.toolRot || 0); } }

// ---------- toolbox and tools ----------
function ehTool(ctx, kind, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const ln = '#3a2414';
  if (kind === 'hammer') { seg(ctx, 0, 10, 0, -50, 7, '#a8703a', 2); celShade(ctx, K.rectPts(-16, -62, 32, 14), '#a8b0c8', '#6a7090', { off: 4, lw: 2, line: '#2a2a4a' }); }
  else if (kind === 'oil') { celShade(ctx, [[-14, 0], [14, 0], [10, -26], [-10, -26]], '#e0b038', '#a87a1c', { off: 4, hi: '#fff1b0', lw: 2, line: '#6a4a10' }); seg(ctx, 8, -20, 46, -44, 3, '#a87a1c', 1); }
  else if (kind === 'glass') { seg(ctx, 0, 10, 0, -14, 6, '#7a4a2a', 1.5); ctx.lineWidth = 5; ctx.strokeStyle = '#e0b038'; ctx.beginPath(); ctx.arc(0, -30, 16, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,0.45)'; ctx.fill(); }
  else if (kind === 'chisel') { seg(ctx, 0, 6, 0, -20, 6, '#a8703a', 1.5); celShade(ctx, K.rectPts(-3, -40, 6, 20), '#c8d0e0', '#8a94b0', { off: 2, lw: 1.5, line: '#2a2a4a' }); }
  else if (kind === 'pliers') { seg(ctx, -4, 8, 2, -26, 4, '#3a3448', 1); seg(ctx, 4, 8, -2, -26, 4, '#3a3448', 1); }
  ctx.restore(); }
// toolbox(ctx, x, y, o): bottom centre (x, y); o {s, open 0..1 (lid swings 110 deg), crown 0..1, rot, jiggle (tools hop), hang (strap up)}
function toolbox(ctx, x, y, o = {}) {
  const s = o.s || 1, op = K.clamp(o.open || 0), ln = '#3a2414'; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (o.hang) { ctx.strokeStyle = '#6a3a1a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-20, -56); ctx.quadraticCurveTo(0, -72, 20, -56); ctx.stroke(); }
  if (op > 0.15) { const j = o.jiggle || 0; ehTool(ctx, 'hammer', -26, -50 - j * 6, 0.6, -0.2); ehTool(ctx, 'chisel', -10, -52 - j * 4, 0.7, 0.1); ehTool(ctx, 'pliers', 4, -50 - j * 7, 0.7, 0.2); ehTool(ctx, 'oil', 18, -52 - j * 5, 0.55, 0); ehTool(ctx, 'glass', 34, -50 - j * 3, 0.5, 0.3);
    if (o.crown > 0) { shape(ctx, [[-30, -56], [-26, -70], [-18, -60], [-10, -74], [-2, -60], [6, -70], [10, -56]], '#f2c040', { lw: 2, line: '#8a5a10' }); ehGlint(ctx, -10, -70, 16, (o.crown * 2) % 1); } }
  celShade(ctx, K.rectPts(-45, -56, 90, 56), '#b0703a', '#7a4a2a', { light: [-1, -1], off: 12, hi: '#d8985a', lw: 3, line: ln });
  for (const cx of [-45, 37]) for (const cy of [-56, -8]) celShade(ctx, K.rectPts(cx, cy, 8, 8), '#e0b038', '#a87a1c', { off: 2, lw: 1.5, line: '#6a4a10' });
  seg(ctx, -45, -30, 45, -30, 3, '#7a4a2a', 0);
  ctx.save(); ctx.translate(-45, -56); ctx.rotate(-op * 1.9); celShade(ctx, K.rectPts(0, -12, 90, 12), '#c8804a', '#8a5a2a', { off: 4, lw: 2.5, line: ln }); ctx.restore();
  ctx.restore();
}
// ---------- the saddle ornament: brass sun rosette with a crimson tassel ----------
function saddleOrnament(ctx, x, y, o = {}) { const s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  ehRibbon(ctx, 0, 8, Math.PI / 2 + (o.swing || 0), 26, 8, o.t || 0, EH_CRIMSON, { wave: 2, hz: 1.5, tip: 1.4, shade: '#b0183a', lw: 1.5 });
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; shape(ctx, [[Math.cos(a - 0.2) * 10, Math.sin(a - 0.2) * 10], [Math.cos(a) * 17, Math.sin(a) * 17], [Math.cos(a + 0.2) * 10, Math.sin(a + 0.2) * 10]], '#e0b038', { lw: 1.2, line: '#6a4a10' }); }
  celShade(ctx, ell(0, 0, 11, 11, 18), ehBrass(o.lit || 0), '#a87820', { light: [-1, -1], off: 4, hi: '#fff1b0', lw: 1.5, line: '#6a4a10' }); ctx.restore(); }
// the row of rosettes on the ebony horse's saddle cloth (draw after ebonyHorse with the same H); o {n 5, missing index, t, lit}
function ehRosettes(ctx, H, o = {}) { const n = o.n || 5, s = H.s || 1, dir = H.dir ?? 1; ctx.save(); ctx.translate(H.x, H.y); if (H.rot) ctx.rotate(H.rot); ctx.scale(dir * s, s);
  for (let i = 0; i < n; i++) { if (i === o.missing) continue; const x = K.lerp(-70, 48, i / (n - 1)); saddleOrnament(ctx, x, -160, { s: 0.62, t: o.t, swing: 0.15 * Math.sin((o.t || 0) * 2 + i), lit: o.lit }); }
  ctx.restore(); }

// ---------- picture devices ----------
// iconBalloon(ctx, x, y, w, h, p, tail, draw): a wordless picture balloon (centre x, y), pops with p, tail to [x, y]; draw(c) in box units 0..w, 0..h
function iconBalloon(ctx, x, y, w, h, p, tail, draw) {
  if (p <= 0) return; const k = K.ease.back(K.clamp(p)), x0 = -w / 2, y0 = -h / 2; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  if (tail) { const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k; ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = '#3a2a5a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-26, h / 2 - 8); ctx.lineTo(tx, ty); ctx.lineTo(26, h / 2 - 8); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = '#3a2a5a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(x0, y0, w, h, 28); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(x0 + 12, y0 + 12, w - 24, h - 24, 18); ctx.clip(); ctx.translate(x0 + 12, y0 + 12); draw(ctx, w - 24, h - 24); ctx.restore();
  ctx.restore();
}
// a dark ebony horse silhouette (with riders: n 0, 1, 2) for picture balloons; feet at (x, y), size s
function ehHorseSil(ctx, x, y, s, o = {}) { const H = { x, y, s, dir: o.dir ?? 1, rot: o.rot || 0 };
  if (o.riders === 2) twoRiders(ctx, H, { who: 'princess', D: EH_PRINCESS, P: { s: EH_PRINCESS.s * s, mouth: 'smile', handL: [40, -110], handR: [50, -112] } }, { who: o.rear || 'inventor', D: o.rear === 'firuz' ? EH_FIRUZ : EH_INVENTOR, P: { s: (o.rear === 'firuz' ? EH_FIRUZ.s : EH_INVENTOR.s) * s, mouth: 'smile', handL: [40, -110], handR: [50, -112] } }, 0, { tc: 0, tail: { stream: 0.6, torn: true } });
  else if (o.riders === 1) ehRide(ctx, H, 'inventor', { s: EH_INVENTOR.s * s, mouth: 'smirk', handL: [40, -110], handR: [50, -112] }, 0, {});
  else ebonyHorse(ctx, H); }
// memoryCard(ctx, x, y, k, t, o): a rounded picture card 380 x 270 (scaled o.s) centred at (x, y); k 0..1 pop; o.draw(c, w, h) inside
function memoryCard(ctx, x, y, k, t, o = {}) { if (k <= 0) return; const sc = (o.s || 1) * K.ease.back(K.clamp(k)), w = 380, h = 270; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate(o.rot ?? -0.03);
  ctx.save(); ctx.shadowColor = 'rgba(40,20,60,0.35)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8; ctx.fillStyle = '#fff3d6'; ctx.beginPath(); ctx.roundRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 26); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#6a4a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 26); ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 18); ctx.clip(); ctx.translate(-w / 2 + 4, -h / 2 + 4); if (o.draw) o.draw(ctx, w - 8, h - 8); ctx.restore(); ctx.restore(); }
// routeMap(ctx, k, t, o): the route strip at the top of the panel (panel x 120..880, y 90..170): k 0..3 dots reached, palace mark, marker
function routeMap(ctx, k, t, o = {}) { const a = o.alpha ?? 1; if (a <= 0) return; const xs = [220, 420, 620], end = 800, y = 132; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,243,214,0.92)'; ctx.strokeStyle = '#6a4a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(120, 86, 760, 92, 22); ctx.fill(); ctx.stroke();
  const pts = [[150, y], ...xs.map((x) => [x, y]), [end, y]], seg_ = (i, u) => [K.lerp(pts[i][0], pts[i + 1][0], u), y];
  ctx.setLineDash([12, 10]); ctx.lineWidth = 5; ctx.strokeStyle = '#8a5a3a'; ctx.beginPath(); ctx.moveTo(150, y); const kk = K.clamp(k, 0, 4); for (let i = 0; i < 4; i++) { const u = K.clamp(kk - i); if (u <= 0) break; const [ex, ey] = seg_(i, u); ctx.lineTo(ex, ey); } ctx.stroke(); ctx.setLineDash([]);
  xs.forEach((x, i) => { const u = K.clamp((kk - i - 0.9) / 0.1); if (u > 0) { shape(ctx, ell(x, y, 13 * u, 13 * u, 14), '#3f7ad0', { lw: 2.5, line: '#1a2e60' }); } });
  farPalaceToy(ctx, end + 40, y + 30, 0.07, 'day');
  const mi = Math.min(3, Math.floor(kk)), mu = kk - mi, [mx] = seg_(Math.min(3, mi), mi >= 3 ? K.clamp(mu) : mu), hopY = Math.abs(Math.sin(t * 9)) * 6;
  shape(ctx, [[mx - 10, y - 34 - hopY], [mx + 10, y - 34 - hopY], [mx, y - 14 - hopY]], EH_CRIMSON, { lw: 2.5, line: '#6a0a20' }); ctx.restore(); }
// a green tick drawn on in two strokes (p 0..1), size s
function ehTick(ctx, x, y, p, s = 1) { if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const a = [[-22, 0], [-6, 16]], b = [[-6, 16], [24, -22]], u1 = K.clamp(p * 2), u2 = K.clamp(p * 2 - 1);
  for (const [w, col] of [[14, '#14402a'], [8, '#3fae6a']]) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(...a[0]); ctx.lineTo(K.lerp(a[0][0], a[1][0], u1), K.lerp(a[0][1], a[1][1], u1)); if (u2 > 0) ctx.lineTo(K.lerp(b[0][0], b[1][0], u2), K.lerp(b[0][1], b[1][1], u2)); ctx.stroke(); }
  ctx.restore(); }
// a round inset (panel units) with a cream border: draw(c) inside, clipped; p 0..1 opens (3 drawings)
function ehCallout(ctx, cx, cy, r, p, draw) { if (p <= 0) return; const rr = r * K.ease.back(K.clamp(p)); ctx.save();
  ctx.save(); ctx.shadowColor = 'rgba(40,20,60,0.35)'; ctx.shadowBlur = 18; ctx.fillStyle = '#fff3d6'; ctx.beginPath(); ctx.arc(cx, cy, rr + 10, 0, 7); ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); draw(ctx); ctx.restore(); ctx.strokeStyle = '#6a4a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, rr + 10, 0, 7); ctx.stroke(); }
