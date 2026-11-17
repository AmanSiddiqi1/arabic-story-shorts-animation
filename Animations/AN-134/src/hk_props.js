// ===== AN-134 props and sets (prefix hk / HK_). Library proposals: goblet, waterJug, floorCushion, foodTray (kind), chest, coinPile,
// goldGlow, insetCircle, carpetRoll, feastSpread, hundredWindows, orchard (road + inside), guard helmet + spear. All drawn in world units.
const HK_GOLD = '#ffd21f', HK_GOLDD = '#e8a04a', HK_WOODC = '#8a501a', HK_WOODD = '#5b3010', HK_SILVER = '#e4e8f0', HK_SILVERD = '#9aa6b8';
const HK_CREAM = '#f6e3b4', HK_CREAMD = '#d9b77a', HK_LAWN = '#5fb04a', HK_LAWND = '#3f8a34', HK_ORANGE = '#f08a1a';

// ---------- goblet: stemmed cup 44 x 64 at s 1; (x, y) = foot centre. o: fill 0..1, tilt (rad, about the foot), glint 0..1 ----------
function hkGoblet(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.tilt || 0); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  shape(ctx, ell(0, -3, 17, 5, 14), HK_GOLD, { lw: 3.5, seed: 701 });
  seg(ctx, 0, -4, 0, -26, 6, HK_GOLDD, 3);
  const bowl = [[-22, -62], [22, -62], [18, -42], [8, -30], [-8, -30], [-18, -42], [-22, -62]];
  shape(ctx, bowl, HK_GOLD, { lw: 4, seed: 702, dot: HK_GOLDD, pitch: 6, rad: 0.25, da: 0.5 });
  const f = K.clamp(o.fill ?? 0); if (f > 0.02) { const wy = -32 - 26 * f; ctx.save(); K.poly(ctx, bowl, true); ctx.clip(); ctx.fillStyle = TEAR; ctx.fillRect(-24, wy, 48, 40); ctx.restore(); }
  seg(ctx, -22, -62, 22, -62, 4, C.red, 2.5); shape(ctx, ell(0, -46, 4, 4, 8), C.blue, { lw: 2, seed: 703 });
  if (o.glint) star(ctx, 12, -54, 14 * o.glint, C.white, o.glint * 3);
  ctx.restore();
}
// ---------- waterJug: ewer 60 x 110; (x, y) = base centre. o: tilt (rad, pours toward +x), frost 0..1, col ----------
function hkJug(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.tilt || 0);
  const col = o.col || C.blue;
  ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(-30, -62, 18, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = HK_GOLD; ctx.stroke();
  shape(ctx, [[22, -70], [46, -96], [52, -94], [30, -60]], col, { lw: 3.5, seed: 704 });
  shape(ctx, [[-14, -96], [14, -96], [10, -80], [28, -54], [28, -20], [18, 0], [-18, 0], [-28, -20], [-28, -54], [-10, -80], [-14, -96]], col, { lw: 4.5, seed: 705, dot: '#0d2f80', pitch: 7, rad: 0.25, da: 0.5 });
  seg(ctx, -27, -46, 27, -46, 8, HK_GOLD, 2.5); shape(ctx, ell(0, -98, 17, 5, 12), HK_GOLD, { lw: 3, seed: 706 });
  if (o.frost) { ctx.save(); ctx.globalAlpha *= o.frost; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(-24, -76, 10, 60); ctx.restore();
    for (let i = 0; i < 3; i++) star(ctx, -16 + i * 16, -70 + (i % 2) * 26, 8 * o.frost, C.white, i + (o.t || 0)); }
  ctx.restore();
}
// pour arc from the spout of a jug at (x, y) with tilt a, to (tx, ty)
function hkPour(ctx, x, y, s, a, tx, ty, k) { if (k <= 0.02) return; const sx = x + (52 * Math.cos(a) + 94 * Math.sin(a)) * s, sy = y + (52 * Math.sin(a) - 94 * Math.cos(a)) * s;
  ctx.save(); ctx.globalAlpha *= Math.min(1, k * 2); ctx.lineCap = 'round'; ctx.lineWidth = 9 * s; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + 14, sy - 6, tx, ty); ctx.stroke(); ctx.lineWidth = 5 * s; ctx.strokeStyle = TEAR; ctx.stroke(); ctx.restore(); }
// ---------- floorCushion 100 x 30 (bottom centre). o: w, h, col, dot, sq (squash), tass ----------
function hkCushion(ctx, x, y, o = {}) {
  const w = o.w || 100, h = (o.h || 30) * (o.sq ?? 1), col = o.col || C.red, dot = o.dot || '#a8160f', ww = w * (1 + (1 - (o.sq ?? 1)) * 0.5);
  const pts = [[-ww / 2, -h * 0.15], [-ww * 0.42, -h], [ww * 0.42, -h], [ww / 2, -h * 0.15], [ww * 0.42, 0], [-ww * 0.42, 0], [-ww / 2, -h * 0.15]].map(([a, b]) => [x + a, y + b]);
  shape(ctx, pts, col, { lw: 4, seed: 707, dot, pitch: 7, rad: 0.25, da: 0.45 });
  seg(ctx, x - ww * 0.4, y - h * 0.55, x + ww * 0.4, y - h * 0.55, 4, HK_GOLD, 0);
  for (const sd of [-1, 1]) shape(ctx, ell(x + sd * ww / 2, y - h * 0.15, 6, 6, 8), HK_GOLD, { lw: 2.5, seed: 708 });
}
const HK_CUSH = [[C.red, '#a8160f'], [C.blue, '#0d2f80'], [C.yellow, HK_ORANGE], [GREEN, GREEND], ['#b04ad0', '#7a2a9a'], [HK_ORANGE, '#b5501a']];
// ---------- foodTray: brass tray 92 wide with a kind of food (bottom centre). kinds: fruit, sweets, rice, bread, dome, jugs, pomeg ----------
function hkTray(ctx, x, y, s = 1, kind = 'fruit', o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, ell(0, -8, 46, 11, 20), HK_GOLD, { lw: 4, seed: 709, dot: HK_GOLDD, pitch: 6, rad: 0.25, da: 0.5 });
  const ball = (bx, by, r, c) => shape(ctx, ell(bx, by, r, r, 12), c, { lw: 3, seed: 710 });
  if (kind === 'fruit') { const P = [[-24, -20, HK_ORANGE], [0, -20, C.red], [24, -20, HK_ORANGE], [-12, -38, C.red], [12, -38, HK_ORANGE], [0, -56, C.yellow]];
    P.forEach(([bx, by, c], i) => { if (o.missing && i === 5) return; ball(bx, by, 12, c); }); seg(ctx, 0, -66, 4, -74, 3, GREEND, 0); }
  else if (kind === 'sweets') { for (let r = 0; r < 3; r++) for (let i = 0; i <= 2 - r; i++) { const bx = (i - (2 - r) / 2) * 24, by = -18 - r * 16; shape(ctx, [[bx - 11, by], [bx, by - 9], [bx + 11, by], [bx, by + 9], [bx - 11, by]], r % 2 ? '#ffe9a8' : HK_GOLDD, { lw: 3, seed: 711 }); } }
  else if (kind === 'rice') { shape(ctx, [[-36, -12], [0, -62], [36, -12], [-36, -12]], '#fffaf0', { lw: 4, seed: 712, dot: C.yellow, pitch: 6, rad: 0.3, da: 0.6 }); ball(0, -60, 7, C.red); }
  else if (kind === 'bread') { for (let i = 0; i < 4; i++) shape(ctx, ell(0, -16 - i * 9, 34 - i * 2, 7, 16), i % 2 ? '#e8a04a' : '#d98a2a', { lw: 3, seed: 713 }); }
  else if (kind === 'dome') { const d = ell(0, -14, 36, 40, 24).filter(([, yy]) => yy <= -13.5); shape(ctx, [...d, [-36, -14], d[0]], o.col || C.red, { lw: 4, seed: 714, dot: '#a8160f', pitch: 7, rad: 0.25, da: 0.5 }); ball(0, -56, 6, HK_GOLD); }
  else if (kind === 'jugs') { for (const jx of [-26, 0, 26]) { ctx.save(); ctx.translate(jx, -12); ctx.scale(0.36, 0.36); hkJug(ctx, 0, 0, 1, { frost: o.frost, t: o.t }); ctx.restore(); } }
  else if (kind === 'pomeg') { ball(-14, -22, 13, '#c21a3a'); ball(14, -22, 13, '#c21a3a'); ball(0, -40, 13, '#e2231a'); }
  else if (kind === 'cushion') { hkCushion(ctx, 0, -10, { w: 70, h: 24, col: C.yellow, dot: HK_ORANGE }); }
  ctx.restore();
}
// baked tray sprite (for feastSpread / hundredWindows waves): 120 x 100 canvas, foot at (60, 94)
const hkTraySprite = (kind) => bake('hk:tray:' + kind, 120, 100, (c) => hkTray(c, 60, 94, 1, kind));
function hkSprite(ctx, kind, x, y, s) { if (s <= 0.01) return; ctx.drawImage(hkTraySprite(kind), x - 60 * s, y - 94 * s, 120 * s, 100 * s); }
// ---------- feastSpread: n of one dish in a ten-wide receding grid with ordered pop-in. pop(i) -> 0..1 ----------
function hkFeast(ctx, kind, cx, yBack, yFront, wFront, pop) {
  for (let r = 0; r < 10; r++) { const row = 9 - r, u = row / 9, sc = K.lerp(0.55, 1, u), y = K.lerp(yBack, yFront, u), pitch = wFront / 10 * sc;
    for (let i = 0; i < 10; i++) { const idx = (9 - row) * 10 + i, p = pop(idx); if (p <= 0) continue; hkSprite(ctx, kind, cx + (i - 4.5) * pitch, y, sc * (wFront / 10 / 70) * K.ease.back(K.clamp(p))); } }
}
// ---------- coins, coin pile, chest ----------
function hkCoin(ctx, x, y, r, o = {}) { const sx = Math.max(0.08, Math.abs(Math.cos(o.spin || 0))), col = o.col || HK_SILVER;
  ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1); shape(ctx, ell(0, 0, r, r, 24), col, { lw: Math.max(2, r * 0.12), seed: 715, dot: o.dot || HK_SILVERD, pitch: Math.max(4, r * 0.18), rad: 0.25, da: 0.4 });
  const pk = o.pattern ?? 1; if (pk > 0) { ctx.globalAlpha *= pk; ctx.lineWidth = Math.max(1.5, r * 0.07); ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, r * 0.72, 0, 7); ctx.stroke(); star(ctx, 0, 0, r * 0.38, o.starCol || HK_SILVERD, 0); }
  ctx.restore(); }
function hkCoinPile(ctx, x, y, w, h, o = {}) { if (h < 2) return; const col = o.col || HK_SILVER, dot = o.dot || HK_SILVERD;
  shape(ctx, [[x - w / 2, y], [x - w * 0.3, y - h * 0.7], [x, y - h], [x + w * 0.3, y - h * 0.7], [x + w / 2, y], [x - w / 2, y]], col, { lw: 4, seed: 716, dot, pitch: 7, rad: 0.3, da: 0.6 });
  const R = K.rng(o.seed || 3); for (let i = 0; i < Math.min(14, Math.round(w * h / 1500)); i++) { const u = R(), v = R(); hkCoin(ctx, x + (u - 0.5) * w * (1 - v) * 0.9, y - h * v * 0.85 - 6, 9, { col, dot, pattern: 0.8 }); } }
function hkChest(ctx, x, y, s = 1, o = {}) {
  const u = K.clamp(o.lid || 0), sq = o.sq ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 + (1 - sq) * 0.6), s * sq);
  const W = 60, Hb = 62, rim = -Hb;
  if (u > 0.45) { const top = rim - 52 * Math.min(1, (u - 0.45) / 0.55);
    shape(ctx, [[-W - 2, rim], [-W - 8, top], [W + 8, top], [W + 2, rim], [-W - 2, rim]], '#7a1810', { lw: 4.5, seed: 717, dot: '#a8261a', pitch: 7, rad: 0.25, da: 0.5 }); seg(ctx, -W - 8, top + 2, W + 8, top + 2, 7, HK_GOLD, 3); }
  const f = K.clamp(o.fill ?? 0); if (f > 0.02 && u > 0.2) { ctx.save(); ctx.beginPath(); ctx.rect(-W + 3, rim - 60, 2 * W - 6, 62); ctx.clip(); hkCoinPile(ctx, 0, rim + 26, 2 * W - 6, 30 + 34 * f, { col: o.col || HK_SILVER, dot: o.dot || HK_SILVERD, seed: 9 }); ctx.restore(); }
  shape(ctx, K.rectPts(-W, rim, 2 * W, Hb), HK_WOODC, { lw: 5, seed: 718, dot: HK_WOODD, pitch: 8, rad: 0.2, da: 0.4 });
  for (const bx of [-34, 34]) shape(ctx, K.rectPts(bx - 7, rim, 14, Hb), HK_GOLD, { lw: 3.5, seed: 719 });
  shape(ctx, K.rectPts(-W, rim, 2 * W, 11), HK_GOLD, { lw: 3.5, seed: 720 });
  if (u <= 0.45) { const g = 40 * u / 0.45, dh = 34; ctx.save(); ctx.translate(0, -g); const dome = ell(0, rim, W + 3, dh, 28).filter(([, yy]) => yy <= rim + 0.5);
    shape(ctx, [...dome, [-W - 3, rim], dome[0]], HK_WOODC, { lw: 5, seed: 721, dot: HK_WOODD, pitch: 8, rad: 0.2, da: 0.4 }); for (const bx of [-34, 34]) seg(ctx, bx, rim - 2, bx * 0.8, rim - dh * 0.9, 11, HK_GOLD, 3);
    shape(ctx, K.rectPts(-9, rim - 8, 18, 18), HK_GOLD, { lw: 3, seed: 722 }); ctx.restore(); }
  ctx.restore(); return { rim: [x, y - Hb * s * sq] };
}
// dashed ghost chest outline (AND MORE!)
function hkGhostChest(ctx, x, y, s, a) { if (a <= 0.02) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 10]); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.strokeRect(x - 60 * s, y - 96 * s, 120 * s, 96 * s); ctx.setLineDash([]); ctx.restore(); }
// ---------- goldGlow (rays + dot halo + twinkles); from AN-108 goldGlow ----------
function hkGlow(ctx, x, y, r, t, k) {
  if (k <= 0.01) return; const R = K.rng(77); ctx.save(); ctx.globalAlpha *= Math.min(1, k);
  for (let i = 0; i < 9; i++) { const a = -Math.PI + (i + 0.5) / 9 * Math.PI + (R() - 0.5) * 0.15, L = r * (0.9 + 0.5 * R()) * (0.85 + 0.15 * Math.sin(t * 3 + i)) * k, w = 0.07 + R() * 0.05;
    ctx.fillStyle = i % 2 ? C.yellow : '#fff3a8'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - w) * L, y + Math.sin(a - w) * L); ctx.lineTo(x + Math.cos(a + w) * L, y + Math.sin(a + w) * L); ctx.closePath(); ctx.fill(); }
  ctx.globalAlpha = 0.45 * Math.min(1, k); ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.32); ctx.beginPath(); ctx.ellipse(x, y, r * 0.75 * k, r * 0.5 * k, 0, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 5; i++) { const ph = (t * 0.9 + i * 0.37) % 1, s = Math.sin(Math.PI * ph); if (s < 0.2) continue; const a = -Math.PI * (0.15 + 0.7 * ((i * 0.618) % 1)), d = r * (0.35 + 0.4 * ((i * 0.41) % 1));
    star(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, 13 * s * k, C.white, t + i); }
}
// ---------- inset circle: iris p 0..1, draw(c) in the circle's own coordinates (centre 0,0); o.wash: pale past tint ----------
function hkInset(ctx, cx, cy, r, p, draw, o = {}) {
  if (p <= 0.01) return; const rr = r * K.ease.out(K.clamp(p)); ctx.save();
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.beginPath(); ctx.arc(cx + 8, cy + 8, rr, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); ctx.translate(cx, cy); draw(ctx);
  if (o.wash) { ctx.fillStyle = `rgba(255,243,214,${o.wash})`; ctx.fillRect(-r, -r, 2 * r, 2 * r); } ctx.restore();
  ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, rr - 6, 0, 7); ctx.stroke(); ctx.restore();
}
// ---------- carpetRoll: a rug on the lawn in perspective (band y0 back .. y1 front), unrolling from xs toward xe ----------
const HK_RUGS = [{ f: C.red, d: '#a8160f', b: C.yellow }, { f: C.blue, d: '#0d2f80', b: C.white }, { f: C.yellow, d: HK_ORANGE, b: C.red, diamond: true }];
function hkRug(ctx, xs, xe, y0, y1, u, k = 0, o = {}) {
  u = K.clamp(u); if (u <= 0.01) return; const R = HK_RUGS[k], sk = o.skew ?? 30, xe2 = K.lerp(xs, xe, u), lo = Math.min(xs, xe2), hi = Math.max(xs, xe2);
  const pts = [[lo + sk, y0], [hi + sk, y0], [hi, y1], [lo, y1], [lo + sk, y0]];
  shape(ctx, pts, R.f, { lw: 4, seed: 723 + k, dot: R.d, pitch: 8, rad: 0.22, da: 0.45 });
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); ctx.lineWidth = 7; ctx.strokeStyle = R.b; const m = 12;
  ctx.beginPath(); ctx.moveTo(lo + sk + m, y0 + m * 0.7); ctx.lineTo(hi + sk - m, y0 + m * 0.7); ctx.lineTo(hi - m, y1 - m * 0.7); ctx.lineTo(lo + m, y1 - m * 0.7); ctx.closePath(); ctx.stroke();
  if (R.diamond) { ctx.fillStyle = C.red; for (let x = lo + 40; x < hi - 20; x += 70) { const cy = (y0 + y1) / 2, cx = x + sk / 2; ctx.beginPath(); ctx.moveTo(cx - 18, cy); ctx.lineTo(cx, cy - 18); ctx.lineTo(cx + 18, cy); ctx.lineTo(cx, cy + 18); ctx.fill(); } }
  ctx.restore();
  if (u < 0.999) { const ex = xe2, rr = 8 + 18 * (1 - u), dir = Math.sign(xe - xs); shape(ctx, ell(ex + dir * rr * 0.4 + sk / 2, (y0 + y1) / 2 - rr * 0.2, rr, (y1 - y0) / 2 + 4, 16), R.f, { lw: 4, seed: 726, dot: R.d, pitch: 7, rad: 0.25, da: 0.5 }); }
}
// a rolled rug carried on a shoulder: (x, y) centre, len, rot
function hkRoll(ctx, x, y, len, k = 0, rot = 0) { const R = HK_RUGS[k]; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  shape(ctx, K.rectPts(-len / 2, -14, len, 28), R.f, { lw: 4, seed: 727, dot: R.d, pitch: 7, rad: 0.25, da: 0.5 }); for (const sd of [-1, 1]) shape(ctx, ell(sd * len / 2, 0, 7, 14, 12), R.b, { lw: 3, seed: 728 }); ctx.restore(); }
// ---------- guard helmet (from AN-108 ksHelmet) and spear with an optional pennant ----------
function hkHelmet(ctx, P) { const c = hkHead(P), s = P.s * (P.child ? 0.62 : 1); ctx.save(); ctx.translate(c[0], c[1]); ctx.scale(s * (P.dir || 1), s); ctx.rotate(P.tilt || 0);
  const dome = ell(0, -18, 42, 36, 28).filter(([, y]) => y <= -17.5); shape(ctx, [...dome, [-42, -18], dome[0]], '#9aa6b8', { lw: 5, seed: 735, dot: '#5a6478', pitch: 7, rad: 0.22, da: 0.5 });
  shape(ctx, [[-6, -52], [0, -70], [6, -52], [-6, -52]], '#9aa6b8', { lw: 4, seed: 736 }); seg(ctx, -42, -18, 42, -18, 7, C.yellow, 3); ctx.restore(); }
function hkSpear(ctx, x, y, len, rot = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  seg(ctx, 0, 30, 0, -len, 7, HK_WOODC, 3); shape(ctx, [[-9, -len], [0, -len - 34], [9, -len], [-9, -len]], '#d6d2e0', { lw: 3.5, seed: 737 });
  if (o.pennant != null) { const w = o.pennant; shape(ctx, [[0, -len + 6], [70, -len + 22 + w * 10], [0, -len + 40], [0, -len + 6]], C.red, { lw: 3.5, seed: 738 }); }
  ctx.restore(); }

// ================= orchard set: road view (2200 strip) =================
const HK_ROAD = { w: 2200, wallTop: 820, wall: [900, 2200], gate: [1500, 1680], gateTop: 640, trees: [1000, 1200, 1400, 1780, 1960, 2140], stand: 1470, lawn: 880 };
function hkFruitTree(c, x, gy, seed) { const R = K.rng(seed);
  shape(c, [[x - 22, gy], [x - 16, gy - 300], [x + 16, gy - 300], [x + 22, gy]], HK_WOODC, { lw: 5, seed: seed + 1, dot: HK_WOODD, pitch: 8, rad: 0.2, da: 0.4 });
  const cr = [[x - 80, gy - 360, 110], [x + 85, gy - 370, 115], [x, gy - 430, 135]];
  for (const [cx, cy, r] of cr) shape(c, ell(cx, cy, r, r * 0.86, 30), GREEN, { lw: 6, seed: seed + 2, dot: GREEND, pitch: 10, rad: 0.3, da: 0.5 });
  for (let i = 0; i < 12; i++) { const k = cr[i % 3], a = R() * 6.28, d = R() * k[2] * 0.75; shape(c, ell(k[0] + Math.cos(a) * d, k[1] + Math.sin(a) * d * 0.8, 9, 9, 10), i % 2 ? C.red : HK_ORANGE, { lw: 2.5, seed: 9 }); } }
function hkRoadFar() { return bake('hk:roadFar', 3000, 920, (c) => {
  c.fillStyle = C.blue; c.fillRect(0, 0, 3000, 920); c.fillStyle = dotPat(c, '#3f7be6', 13, 0.3); c.fillRect(0, 0, 3000, 920);
  const R = K.rng(41); for (let i = 0; i < 9; i++) { const hx = 150 + i * 340 + R() * 80, hr = 240 + R() * 80; shape(c, ell(hx, 900, hr, hr * 0.5, 30), i % 2 ? '#2a62c9' : '#2457b8', { lw: 0 }); }
  hillTrees(c, { n: 35, seed: 8 }); for (let i = 0; i < 4; i++) cloudFlat(c, 300 + i * 700 + R() * 120, 170 + R() * 80, 0.9); }); }
function hkRoadMid() { return bake('hk:roadMid', 2200, 1230, (c) => {
  c.fillStyle = HK_LAWN; c.fillRect(0, 840, 2200, 70); c.fillStyle = dotPat(c, HK_LAWND, 9, 0.3); c.fillRect(0, 840, 2200, 70);
  for (const x of HK_ROAD.trees) hkFruitTree(c, x, HK_ROAD.lawn, x);
  c.fillStyle = SANDL; c.fillRect(0, 896, 2200, 340); c.fillStyle = dotPat(c, SAND, 11, 0.3); c.fillRect(0, 896, 2200, 340);
  ink(c, [[0, 897], [2200, 897]], 6, 740); for (const ry of [1000, 1110]) { c.lineWidth = 5; c.strokeStyle = '#c99a3a'; c.beginPath(); c.moveTo(0, ry); c.lineTo(2200, ry + 6); c.stroke(); }
  const R = K.rng(5); for (let i = 0; i < 40; i++) shape(c, ell(R() * 2200, 940 + R() * 260, 6 + R() * 6, 4, 8), '#c99a3a', { lw: 0 }); }); }
function hkRoadWall() { return bake('hk:roadWall', 2200, 920, (c) => {
  const [g0, g1] = HK_ROAD.gate, T = HK_ROAD.wallTop;
  shape(c, K.rectPts(900, T, 1300, 900 - T), HK_CREAM, { lw: 5, seed: 741, dot: HK_CREAMD, pitch: 9, rad: 0.22, da: 0.45 });
  shape(c, K.rectPts(894, T - 14, 1312, 16), C.yellow, { lw: 4, seed: 742 });
  const outer = townArchPts(g0 - 32, g1 + 32, HK_ROAD.gateTop - 34, 900, 'pointed');
  shape(c, outer, HK_CREAM, { lw: 5, seed: 743, dot: HK_CREAMD, pitch: 9, rad: 0.22, da: 0.45 });
  c.save(); c.globalCompositeOperation = 'destination-out'; K.poly(c, townArchPts(g0, g1, HK_ROAD.gateTop, 904, 'pointed'), true); c.fill(); c.restore();
  ink(c, townArchPts(g0, g1, HK_ROAD.gateTop, 900, 'pointed'), 5, 744);
  for (let x = 960; x < 2200; x += 120) { if (x > g0 - 60 && x < g1 + 40) continue; c.lineWidth = 3; c.strokeStyle = HK_CREAMD; c.beginPath(); c.moveTo(x, T + 20); c.lineTo(x, 890); c.stroke(); } }); }
// the garden seen through the open gate leaf (lawn and shade), drawn in the gate opening; leaf hinged on the right
function hkGateLeaf(ctx, open) { townDoor(ctx, HK_ROAD.gate[0], HK_ROAD.gate[1], HK_ROAD.gateTop, 900, open, { arch: 'pointed', hinge: 'right', leafOnly: true, paint: '#3f9d4a' }); }
function hkStand(ctx, x, y) { shape(ctx, K.rectPts(x - 35, y - 60, 70, 10), HK_WOODC, { lw: 4, seed: 745 }); seg(ctx, x - 28, y - 50, x - 30, y, 6, HK_WOODD, 3); seg(ctx, x + 28, y - 50, x + 30, y, 6, HK_WOODD, 3); }

// ================= orchard set: inside view (1000 x 1230) =================
const HK_GIN = { wallTop: 600, gate: [60, 220], gateTop: 470, trunks: [330, 640, 930], roof: [700, 960, 470] };
function hkGardenBack() { return bake('hk:garden', 1000, 1230, (c) => {
  c.fillStyle = C.blue; c.fillRect(0, 0, 1000, 900); c.fillStyle = dotPat(c, '#3f7be6', 13, 0.3); c.fillRect(0, 0, 1000, 900);
  // house roofline over the back wall
  const [r0, r1, rt] = HK_GIN.roof; shape(c, K.rectPts(r0, rt, r1 - r0, 600 - rt + 10), '#f2d27a', { lw: 5, seed: 750, dot: HK_GOLDD, pitch: 9, rad: 0.2, da: 0.4 });
  for (let x = r0; x < r1; x += 40) shape(c, K.rectPts(x + 4, rt - 22, 22, 24), '#f2d27a', { lw: 4, seed: 751 });
  for (let x = r0 + 18; x < r1 - 20; x += 46) shape(c, K.rectPts(x, rt + 40, 24, 30), NAVY2, { lw: 3.5, seed: 752 });
  // back wall with the gate
  shape(c, K.rectPts(0, HK_GIN.wallTop, 1000, 300), HK_CREAM, { lw: 5, seed: 753, dot: HK_CREAMD, pitch: 9, rad: 0.22, da: 0.45 });
  shape(c, K.rectPts(-6, HK_GIN.wallTop - 14, 1012, 16), C.yellow, { lw: 4, seed: 754 });
  shape(c, townArchPts(HK_GIN.gate[0] - 26, HK_GIN.gate[1] + 26, HK_GIN.gateTop - 30, 900, 'pointed'), HK_CREAM, { lw: 5, seed: 755, dot: HK_CREAMD, pitch: 9, rad: 0.22, da: 0.45 });
  const op = townArchPts(HK_GIN.gate[0], HK_GIN.gate[1], HK_GIN.gateTop, 900, 'pointed'); c.save(); K.poly(c, op, true); c.clip();
  c.fillStyle = C.blue; c.fillRect(0, 400, 300, 500); c.fillStyle = '#2457b8'; c.beginPath(); c.ellipse(140, 860, 200, 90, 0, 0, 7); c.fill(); c.fillStyle = SANDL; c.fillRect(0, 830, 300, 80); c.fillStyle = dotPat(c, SAND, 9, 0.3); c.fillRect(0, 830, 300, 80); c.restore(); ink(c, op, 5, 756);
  // lawn
  c.fillStyle = HK_LAWN; c.fillRect(0, 880, 1000, 350); c.fillStyle = dotPat(c, HK_LAWND, 11, 0.3); c.fillRect(0, 880, 1000, 350); ink(c, [[0, 884], [1000, 884]], 5, 757);
  const R = K.rng(12); for (let i = 0; i < 30; i++) { const gx = R() * 1000, gy = 920 + R() * 300; seg(c, gx, gy, gx - 4, gy - 12, 3, GREEND, 0); seg(c, gx + 5, gy, gx + 7, gy - 10, 3, GREEND, 0); }
  // trunks and the canopy
  for (const x of HK_GIN.trunks) shape(c, [[x - 23, 890], [x - 17, 380], [x + 17, 380], [x + 23, 890]], HK_WOODC, { lw: 5, seed: 758 + x, dot: HK_WOODD, pitch: 8, rad: 0.2, da: 0.4 });
  const crowns = []; for (let i = 0; i < 9; i++) crowns.push([-40 + i * 135, 260 + (i % 2) * 70, 130 + (i % 3) * 14]);
  for (const [x, y, r] of crowns) shape(c, ell(x, y, r, r * 0.8, 30), GREEN, { lw: 6, seed: 760 + x, dot: GREEND, pitch: 10, rad: 0.3, da: 0.5 });
  shape(c, K.rectPts(-10, -10, 1020, 170), GREEND, { lw: 0 }); c.fillStyle = dotPat(c, '#1f5a28', 10, 0.35); c.fillRect(-10, -10, 1020, 170);
  for (let i = 0; i < 26; i++) { const k = crowns[i % 9]; shape(c, ell(k[0] + (R() - 0.5) * 180, k[1] + (R() - 0.5) * 140, 10, 10, 10), i % 2 ? C.red : HK_ORANGE, { lw: 2.5, seed: 9 }); } }); }
function hkGardenShade(ctx, t) { ctx.save(); ctx.globalAlpha = 0.16; ctx.fillStyle = '#1f5a28';
  for (let i = 0; i < 7; i++) { const x = ((i * 173 + t * 9 * (i % 2 ? 1 : -0.7)) % 1200 + 1200) % 1200 - 100, y = 940 + (i * 53) % 220; ctx.beginPath(); ctx.ellipse(x, y, 70 + (i % 3) * 20, 18, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function hkTrunkFront(ctx, x) { shape(ctx, [[x - 23, 890], [x - 17, 380], [x + 17, 380], [x + 23, 890]], HK_WOODC, { lw: 5, seed: 758 + x, dot: HK_WOODD, pitch: 8, rad: 0.2, da: 0.4 }); }
// a falling leaf (spiral), t0 start, from [x, y] to [x1, y1] over d seconds
function hkLeaf(ctx, t, t0, a, b, d = 1.2) { const u = (t - t0) / d; if (u < 0 || u > 1.6) return; const v = Math.min(1, u), x = K.lerp(a[0], b[0], v) + 18 * Math.sin(v * 9) * (1 - v), y = K.lerp(a[1], b[1], v);
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(v * 9) * 0.8); shape(ctx, [[-12, 0], [0, -7], [12, 0], [0, 7], [-12, 0]], GREEN2, { lw: 3, seed: 770 }); ctx.restore(); }

// ================= hundredWindows: facade 700 x 730 with a 10 x 10 window grid =================
const HK_HW = { x0: 150, x1: 850, top: 170, bottom: 900, wx: 182, wy: 200, px: 64, py: 56, ww: 46, wh: 38, door: [450, 550, 790] };
const hkWinXY = (i) => { const r = Math.floor(i / 10), c = i % 10; return [HK_HW.wx + c * HK_HW.px, HK_HW.wy + r * HK_HW.py]; };
function hkFacade() { return bake('hk:facade', 1000, 1000, (c) => { const H = HK_HW;
  shape(c, K.rectPts(H.x0, H.top, H.x1 - H.x0, H.bottom - H.top), '#f2d27a', { lw: 6, seed: 780, dot: HK_GOLDD, pitch: 10, rad: 0.2, da: 0.4 });
  for (let x = H.x0; x < H.x1; x += 50) shape(c, K.rectPts(x + 6, H.top - 26, 28, 28), '#f2d27a', { lw: 4, seed: 781 });
  shape(c, townArchPts(H.door[0], H.door[1], H.door[2], H.bottom, 'pointed'), HK_WOODC, { lw: 5, seed: 782, dot: HK_WOODD, pitch: 8, rad: 0.2, da: 0.4 }); }); }
// lit(i) -> 0..1 per window; busts: list of window indices with a figure; o.head(i) small head silhouettes
function hkWindows(ctx, lit, t, o = {}) { const H = HK_HW;
  for (let i = 0; i < 100; i++) { const [x, y] = hkWinXY(i), l = lit(i); ctx.fillStyle = l > 0.5 ? C.yellow : NAVY2; ctx.fillRect(x, y, H.ww, H.wh);
    if (l > 0.5 && o.heads && !(o.busts || []).includes(i)) { ctx.fillStyle = HK_GOLDD; ctx.beginPath(); ctx.arc(x + H.ww / 2, y + H.wh - 4, 9, Math.PI, 0); ctx.fill(); ctx.beginPath(); ctx.arc(x + H.ww / 2, y + H.wh - 16, 7, 0, 7); ctx.fill(); }
    ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.strokeRect(x, y, H.ww, H.wh); } }
