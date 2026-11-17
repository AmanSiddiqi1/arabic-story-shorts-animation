// ===== AN-014 sets: the village lane (marketStreet houses + a low shared wall), the shrine yard (domed prayer house, palm, old well),
// the well cutaway (Library wellShaft + a cavern pocket) and small helpers. World 1000 x 1230, ground y 900.

// ---------- village lane ----------
// kind man's house on the left (door cx 270), envier's house on the right (door cx 735, window cx 885), low wall 450..640 between them
const K14_VIL = {
  houses: [{ x0: -10, x1: 432, top: 470, col: 0, door: [225, 315, 650, 'round'], windows: [[60, 575, 92, 100]] },
    { x0: 440, x1: 1010, top: 500, col: 2, door: [690, 780, 660, 'round'], windows: [[830, 540, 110, 120]] }],
  doorA: 270, doorB: 735, win: [830, 540, 110, 120], wall: [450, 640, 775], roofY: 500,
};
function k14Village(ctx, t, o = {}) {
  const u = o.u ?? 0.3;
  marketStreet(ctx, { palace: false, houses: K14_VIL.houses, doors: [o.doorA || 0, o.doorB || 0], u, t, shutters: [1, o.shutB ?? 1], windowsLit: o.lit || 0 });
  const n = dayCycle(u).night; townDim(ctx, 0, 300, 1000, 930, n * 0.9);
  return n;
}
// the low shared wall (drawn after the actors behind it)
function k14LowWall(ctx, night = 0) {
  const [x0, x1, top] = K14_VIL.wall;
  townBake(ctx, 'k14wall', x0 - 10, top - 14, x1 - x0 + 20, 930 - top + 14, (c) => {
    shape(c, [[x0, 904], [x0, top + 6], [x0 + 10, top], [x1 - 10, top], [x1, top + 6], [x1, 904]], STONE, { lw: 7, seed: 401, dot: STONED, pitch: 9, rad: 0.2, da: 0.45 });
    c.save(); c.lineWidth = 3.5; c.strokeStyle = C.black; for (let y = top + 42, k = 0; y < 900; y += 42, k++) { c.beginPath(); c.moveTo(x0 + 4, y); c.lineTo(x1 - 4, y); c.stroke(); for (let x = x0 + 30 + (k % 2) * 24; x < x1 - 10; x += 48) { c.beginPath(); c.moveTo(x, y - 42); c.lineTo(x, y); c.stroke(); } } c.restore();
    shape(c, K.rectPts(x0 - 6, top - 8, x1 - x0 + 12, 14), STONE2, { lw: 4.5, seed: 402 });
  });
  townDim(ctx, x0 - 10, top - 14, x1 - x0 + 20, 920 - top, night * 0.9);
}

// ---------- shrine yard ----------
// prayer house walls x 60..440 (top 560), dome centre (250, 560) r 130, door 200..300 (top 740); old well at x 780 (rim top 830, rx 75), crossbeam y 690
const K14_YARD = { door: [200, 300, 740], dome: [250, 560, 130], well: { cx: 780, rim: 830, rx: 75, x0: 705, x1: 855, beam: 690 }, palm: 930, lampAt: [338, 728] };
function k14Yard(ctx, t, o = {}) {
  const u = o.u ?? 0.24, W = K14_YARD.well, d = skyCycle(ctx, u, { t, hills: true });
  townBake(ctx, 'k14yard', 0, 380, 1000, 850, (c) => {
    ground(c);
    shape(c, [[-10, 912], [1010, 912], [1010, 1240], [-10, 1240]], '#f2d27a', { lw: 6, seed: 410, dot: '#c98a3a', pitch: 11, rad: 0.18, da: 0.4 });
    const r = K.rng(41); for (let i = 0; i < 18; i++) shape(c, ell(r() * 1000, 960 + r() * 240, 8 + r() * 8, 4 + r() * 3, 10), STONE2, { lw: 3, seed: 411 + i });
    // prayer house
    const [dx, dy, dr] = K14_YARD.dome;
    shape(c, [[dx - 26, 560], [dx - 26, 420 + 40], [dx + 26, 420 + 40], [dx + 26, 560]], '#f2d27a', { lw: 4, seed: 412 });
    const dome = ell(dx, dy, dr, dr * 0.95, 40).filter(([, y]) => y <= dy + 1); shape(c, dome.concat([[dx - dr, dy]]), C.white, { lw: 7, seed: 413, dot: C.blue, pitch: 10, rad: 0.2, da: 0.4 });
    seg(c, dx, dy - dr * 0.95, dx, dy - dr * 0.95 - 40, 5, C.yellow, 3); c.save(); c.lineWidth = 6; c.strokeStyle = C.black; c.fillStyle = C.yellow; c.beginPath(); c.arc(dx, dy - dr - 56, 13, 0.6, 5.7); c.fill(); c.stroke(); c.restore();
    shape(c, [[60, 902], [60, 560], [440, 560], [440, 902]], '#fff3d6', { lw: 8, seed: 414, dot: C.blue, pitch: 13, rad: 0.18, da: 0.35 });
    shape(c, K.rectPts(52, 548, 396, 22), '#f2d27a', { lw: 5, seed: 415, dot: C.red, pitch: 8, rad: 0.2, da: 0.5 });
    for (const wx of [110, 360]) townWindow(c, wx - 28, 620, 56, 90, { arch: 'pointed', lit: 0.35, noShutters: true });
    ink(c, townArchPts(188, 312, 726, 900, 'pointed').slice(1, -1), 9, 416);
    // well back half: posts, beam, pulley, the dark mouth
    for (const px of [W.x0 + 8, W.x1 - 8]) shape(c, K.rectPts(px - 9, W.beam - 6, 18, W.rim - W.beam + 10), WOOD, { lw: 5, seed: 417, dot: C.black, pitch: 8, rad: 0.16, da: 0.35 });
    shape(c, K.rectPts(W.x0 - 14, W.beam - 18, W.x1 - W.x0 + 28, 18), WOOD, { lw: 5, seed: 418, dot: C.black, pitch: 8, rad: 0.16, da: 0.35 });
    shape(c, ell(W.cx, W.beam + 6, 14, 14, 14), '#8c8a94', { lw: 4, seed: 419 });
    shape(c, ell(W.cx, W.rim, W.rx, 20, 30), STONE2, { lw: 6, seed: 420 }); shape(c, ell(W.cx, W.rim + 3, W.rx - 12, 13, 26), NAVY2, { lw: 4, seed: 421 });
  });
  palmTree(ctx, K14_YARD.palm, 900, { h: 540, lean: -24, t, sway: 1 });
  // the door and its warm light
  const op = o.door ?? 0;
  if (op > 0.02) { ctx.save(); ctx.globalAlpha = 0.45 * op; ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.4); K.poly(ctx, [[205, 900], [295, 900], [360, 1010], [140, 1010]], true); ctx.fill(); ctx.restore(); }
  townDoor(ctx, 200, 300, 740, 900, op, { arch: 'pointed', hinge: 'left', inside: (c) => { c.fillStyle = mixHex(NAVY2, '#ffd98a', 0.75 * op); c.fillRect(200, 700, 100, 200); } });
  if (o.lamp != null) hangingLamp(ctx, K14_YARD.lampAt[0], K14_YARD.lampAt[1] + (o.lampSwing || 0) * 0, t, { lit: o.lamp, s: 0.5, chain: K14_YARD.lampAt[1] - 40 });
  if (o.rope) { seg(ctx, W.cx + 10, W.beam + 6, W.cx + 10, Math.min(o.rope, 836), 4, '#c98a3a', 2); }
  else { seg(ctx, W.cx, W.beam + 8, W.cx, W.beam + 70, 3, '#c98a3a', 1.5); shape(ctx, [[W.cx - 16, W.beam + 70], [W.cx + 16, W.beam + 70], [W.cx + 12, W.beam + 100], [W.cx - 12, W.beam + 100]], WOOD, { lw: 4, seed: 422 }); }
  townDim(ctx, 0, 0, 1000, 1230, d.night * 0.85);
  return d;
}
// the front of the well rim (after the actors, so a fall or a rescue is hidden by it)
function k14WellFront(ctx, night = 0) {
  const W = K14_YARD.well;
  townBake(ctx, 'k14wellf', W.x0 - 12, W.rim - 30, W.x1 - W.x0 + 24, 940 - W.rim, (c) => {
    shape(c, [[W.x0, W.rim], [W.x0, 902], [W.x1, 902], [W.x1, W.rim], ...ell(W.cx, W.rim, W.rx, 20, 30).filter(([, y]) => y >= W.rim).sort((a, b) => b[0] - a[0])], STONE, { lw: 6, seed: 430, dot: STONED, pitch: 9, rad: 0.2, da: 0.45 });
    c.save(); c.lineWidth = 3.5; c.strokeStyle = C.black; for (const [y, off] of [[870, 0], [888, 18]]) { c.beginPath(); c.moveTo(W.x0 + 3, y); c.lineTo(W.x1 - 3, y); c.stroke(); for (let x = W.x0 + 26 + off; x < W.x1 - 8; x += 38) { c.beginPath(); c.moveTo(x, y - 20); c.lineTo(x, y); c.stroke(); } } c.restore();
  });
  townDim(ctx, W.x0 - 12, W.rim - 10, W.x1 - W.x0 + 24, 910 - W.rim, night * 0.85);
}
// a small wooden bucket (the follower lifts it to look under it)
function k14Bucket(ctx, x, y, lift = 0, rot = 0) { ctx.save(); ctx.translate(x, y - lift); ctx.rotate(rot); shape(ctx, [[-20, -34], [20, -34], [15, 0], [-15, 0]], WOOD, { lw: 4, seed: 423, dot: C.black, pitch: 7, rad: 0.16, da: 0.4 }); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -34, 18, Math.PI, 0); ctx.stroke(); ctx.restore(); }

// ---------- the well cutaway + cavern ----------
// Library wellShaft: ground line y 520, shaft x 560..800 (stone walls 524..560 and 800..836). Floor of sand at y 1190.
// cavern pocket left of the shaft: x 80..500, y 860..1190 (floor 1185); lamp on a rock at (305, 1150)
const K14_CAVE = { floor: 1185, lamp: [305, 1146], A: [215, 1185], B: [390, 1185], pts: [[80, 1185], [92, 1000], [150, 900], [270, 862], [400, 878], [492, 950], [505, 1080], [500, 1188]] };
function k14Shaft(ctx, t, o = {}) {
  const u = o.u ?? 0.3; ctx.save(); ctx.beginPath(); ctx.rect(-10, -10, 1020, 535); ctx.clip(); skyCycle(ctx, u, { t, hills: false }); ctx.restore();
  wellShaft(ctx);
  shape(ctx, [[562, 1232], [566, 1196], [620, 1180], [700, 1176], [770, 1186], [798, 1232]], '#f2d27a', { lw: 5, seed: 440, dot: '#c98a3a', pitch: 9, rad: 0.2, da: 0.45 });
  const n = dayCycle(u).night; townDim(ctx, -10, -10, 1020, 1250, n * 0.9 + (o.dark || 0));
  return n;
}
// the cavern, revealed by an iris of lamplight (cave 0..1); inner(ctx) draws the jinn inside the clip
function k14Cavern(ctx, t, cave, inner, o = {}) {
  if (cave <= 0.001) return;
  const [lx, ly] = K14_CAVE.lamp, R = 40 + cave * 420;
  ctx.save(); K.poly(ctx, K14_CAVE.pts, true); ctx.clip(); ctx.beginPath(); ctx.arc(lx, ly - 60, R, 0, 7); ctx.clip();
  ctx.fillStyle = '#5b3010'; ctx.fillRect(60, 840, 470, 380); ctx.fillStyle = dotPat(ctx, '#7a4212', 12, 0.3); ctx.fillRect(60, 840, 470, 380);
  const lit = o.lit ?? 1; if (lit > 0) { ctx.save(); ctx.globalAlpha = 0.5 * lit; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.4); ctx.beginPath(); ctx.arc(lx, ly - 30, 230, 0, 7); ctx.fill(); ctx.restore(); }
  shape(ctx, [[60, 1240], [60, 1185], [540, 1185], [540, 1240]], '#7a4212', { lw: 5, seed: 441, dot: '#5b3010', pitch: 9, rad: 0.2, da: 0.5 });
  shape(ctx, [[110, 1186], [118, 1132], [176, 1118], [230, 1130], [240, 1186]], STONE2, { lw: 5, seed: 442, dot: STONED, pitch: 8, rad: 0.2, da: 0.4 });   // jinn A's rock (top ~1125)
  shape(ctx, [[278, 1186], [284, 1152], [326, 1150], [334, 1186]], STONE, { lw: 4.5, seed: 443 });
  // oil lamp
  shape(ctx, [[lx - 22, ly + 4], [lx + 24, ly + 4], [lx + 34, ly - 6], [lx - 30, ly - 8]], '#c98a3a', { lw: 4, seed: 444 });
  if (lit > 0) shape(ctx, [[lx + 20, ly - 8], [lx + 28, ly - 8 - 22 * lit - 3 * Math.sin(t * 12)], [lx + 36, ly - 8]], C.yellow, { lw: 3, seed: 445 });
  else { ctx.save(); ctx.globalAlpha = 0.6; ctx.lineWidth = 3; ctx.strokeStyle = '#8c8a94'; ctx.beginPath(); ctx.moveTo(lx + 28, ly - 10); for (let k = 1; k < 6; k++) ctx.lineTo(lx + 28 + Math.sin(t * 3 + k) * 6, ly - 10 - k * 12); ctx.stroke(); ctx.restore(); }
  if (inner) inner(ctx);
  ctx.restore();
  ink(ctx, K14_CAVE.pts.slice(1, -1), 7, 446);
}
// the dashed line along the top of the shared wall ("one neighbourhood")
function k14Dash(ctx, pts, p, col = C.yellow) { if (p <= 0) return; const q = K.trim(pts, K.clamp(p)); ctx.save(); ctx.setLineDash([18, 14]); ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = C.black; K.poly(ctx, q, false); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.stroke(); ctx.restore(); }
// a round inset (memory/flashback): drawn in panel units at (cx, cy) radius r; inside(ctx) draws world units mapped by at/scale
function k14Inset(ctx, cx, cy, r, p, inside, o = {}) {
  if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  ctx.beginPath(); ctx.arc(0, 0, r + 9, 0, 7); ctx.fillStyle = C.black; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = o.bg || C.blue; ctx.fill(); ctx.save(); ctx.clip();
  const sc = o.scale ?? 0.4, at = o.at || [500, 800]; ctx.scale(sc, sc); ctx.translate(-at[0], -at[1]); inside(ctx); ctx.restore();
  ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(0, 0, r + 3, 0, 7); ctx.stroke(); ctx.restore();
}
