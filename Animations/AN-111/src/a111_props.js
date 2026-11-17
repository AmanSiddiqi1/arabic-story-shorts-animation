// ===== AN-111 The Devout Israelite: props and effects drawn by the story (library proposals: spinningKit, platterJar, fish, pearl,
// stinkLines, goldGlow (colour option), angelLight (no wings), iconBalloon, coinPile/sack/purse/foodTray, balanceScale) =====
// All functions take world units; (x, y) is the bottom centre unless noted. Every motion is a pure function of the arguments.
const A111_BROWN = '#a8641e', A111_BROWND = '#6e3c10', A111_CLAY = '#d0602a', A111_THREAD = '#fffaf0', A111_GOLD = '#c58a18';

// ---------- spinningKit: spindle, distaff, cotton basket, skein ----------
// spindle hanging from the hand point (x, y): thread len, spin phase, fill 0..1 (thread cone), sway radians
function a111Spindle(ctx, x, y, o = {}) {
  const len = o.len ?? 90, sp = o.spin || 0, fill = K.clamp(o.fill ?? 0.3), sw = o.sway || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(sw);
  ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, len); ctx.stroke();
  ctx.translate(0, len);
  seg(ctx, 0, 0, 0, 70, 6, WOOD, 2.5);
  const cw = 6 + 20 * fill, ch = 10 + 30 * fill;
  if (fill > 0.02) { const cone = [[0, 6], [cw / 2, 14 + ch * 0.6], [cw / 2 - 2, 14 + ch], [-cw / 2 + 2, 14 + ch], [-cw / 2, 14 + ch * 0.6], [0, 6]]; shape(ctx, cone, A111_THREAD, { lw: 3, seed: 601 });
    ctx.save(); K.poly(ctx, cone, true); ctx.clip(); ctx.lineWidth = 2; ctx.strokeStyle = C.blue; for (let k = 0; k < 3; k++) { const yy = 8 + ((sp * 6 + k * 14) % 42); ctx.beginPath(); ctx.moveTo(-cw, yy + 8); ctx.lineTo(cw, yy - 6); ctx.stroke(); } ctx.restore(); }
  ctx.save(); ctx.translate(0, 58); ctx.scale(1, 0.4); shape(ctx, ell(0, 0, 14, 14, 16), C.red, { lw: 3, seed: 602 }); ctx.restore();
  ctx.lineWidth = 2.5; ctx.strokeStyle = C.yellow; const sx = Math.sin(sp) * 11; ctx.beginPath(); ctx.moveTo(sx - 2, 56); ctx.lineTo(sx + 2, 60); ctx.stroke();
  ctx.restore();
}
// distaff: stick up from the hand (x, y), cotton cloud at the top, fill 0..1
function a111Distaff(ctx, x, y, o = {}) {
  const fill = K.clamp(o.fill ?? 1), rot = o.rot ?? -0.25; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  seg(ctx, 0, 20, 0, -110, 6, WOOD, 2.5);
  if (fill > 0.05) { const r = 8 + 10 * fill; const pts = [[0, -112], [-14, -100], [10, -96], [-6, -126], [12, -122]]; for (const [px, py] of pts) { ctx.save(); ctx.beginPath(); ctx.arc(px * fill, py, r, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.fillStyle = dotPat(ctx, C.blue, 6, 0.22); for (const [px, py] of pts) { ctx.beginPath(); ctx.arc(px * fill + 3, py + 4, r * 0.6, 0, 7); ctx.fill(); } ctx.restore(); }
  ctx.restore();
}
function a111Puff(ctx, x, y, r = 14, a = 1) { ctx.save(); ctx.globalAlpha *= a; for (const [dx, dy, k] of [[-0.5, 0.1, 0.8], [0.5, 0.1, 0.8], [0, -0.35, 0.9]]) { ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, r * k, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); }
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 7); ctx.fill(); ctx.restore(); }
// basket 110 x 70, bottom centre (x, y); fill 0..1 (white puffs); tip 0..1 rotates it upside down (about its top-right corner); wisp: puff count override
function a111Basket(ctx, x, y, o = {}) {
  const fill = K.clamp(o.fill ?? 1), tip = K.clamp(o.tip || 0), s = o.s ?? 1, w = 55, h = 70;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (tip) { ctx.translate(0, -h / 2 - 26 * Math.sin(Math.PI * tip)); ctx.rotate(-Math.PI * tip); ctx.translate(0, h / 2); }
  if (fill > 0.05 && tip < 0.4) { const n = Math.ceil(6 * fill); for (let i = 0; i < n; i++) a111Puff(ctx, -36 + (i % 3) * 36, -h - 4 - Math.floor(i / 3) * 16, 15); }
  const B = [[-w, -h], [w, -h], [w - 10, 0], [-w + 10, 0], [-w, -h]]; shape(ctx, B, '#d9a441', { lw: 5, seed: 610, dot: A111_BROWN, pitch: 8, rad: 0.2, da: 0.45 });
  ctx.lineWidth = 3; ctx.strokeStyle = A111_BROWND; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-w + 2 * k, -h + k * 17); ctx.lineTo(w - 2 * k, -h + k * 17); ctx.stroke(); }
  seg(ctx, -w - 4, -h, w + 4, -h, 9, A111_BROWN, 3); ctx.restore();
}
// skein stack: n figure-of-eight hanks 60 x 26, bottom centre (x, y)
function a111Skein(ctx, x, y, o = {}) {
  const n = o.n ?? 1, s = o.s ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < n; i++) { const yy = -13 - i * 22, sq = i === n - 1 ? (o.sq ?? 1) : 1; ctx.save(); ctx.translate(0, yy + 13); ctx.scale(1 / Math.sqrt(sq), sq); ctx.translate(0, -13);
    for (const dx of [-15, 15]) shape(ctx, ell(dx, 0, 17, 12, 16), A111_THREAD, { lw: 3.5, seed: 620 + i });
    ctx.lineWidth = 2; ctx.strokeStyle = C.blue; for (const dx of [-15, 15]) for (const k of [-5, 0, 5]) { ctx.beginPath(); ctx.moveTo(dx - 12, k); ctx.lineTo(dx + 12, k); ctx.stroke(); }
    seg(ctx, 0, -10, 0, 10, 6, C.red, 2); ctx.restore(); }
  ctx.restore();
}

// ---------- platterJar ----------
// wooden platter seen at three quarters: centre (x, y), r 46, crack 0..1, rot (wobble)
function a111Platter(ctx, x, y, o = {}) {
  const r = o.r ?? 46, crack = K.clamp(o.crack || 0), ry = o.ry ?? 0.8; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.s ?? 1, o.s ?? 1);
  shape(ctx, ell(0, 0, r, r * ry, 28), A111_BROWN, { lw: 5, seed: 630, dot: A111_BROWND, pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, 2, r * 0.72, r * 0.72 * ry, 24), '#c88a3e', { lw: 3, seed: 631 });
  ctx.lineWidth = 2.5; ctx.strokeStyle = A111_BROWND; ctx.beginPath(); ctx.arc(-6, 6, r * 0.45, 3.6, 4.6); ctx.stroke(); ctx.beginPath(); ctx.arc(8, -2, r * 0.3, 0.3, 1.4); ctx.stroke();
  if (crack > 0) { const P = [[r * 0.15, -r * ry], [r * 0.05, -r * 0.5 * ry], [r * 0.2, -r * 0.2 * ry], [-r * 0.02, r * 0.1 * ry], [r * 0.12, r * 0.35 * ry], [-r * 0.05, r * 0.55 * ry]]; const q = K.trim(P, crack); if (q.length > 1) { ctx.lineWidth = 4.5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; K.poly(ctx, q); ctx.stroke(); } }
  ctx.restore();
}
// old clay jar 70 x 90, bottom centre (x, y); chip: notch in the rim; web 0..1 (spider thread from the rim) with sw swing; rot about the base
function a111Jar(ctx, x, y, o = {}) {
  const h = o.h ?? 90, k = h / 90, s = o.s ?? 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * k, s * k);
  const body = [[-20, 0], [-33, -22], [-35, -48], [-24, -68], [-17, -76], [-18, -88], [18, -88], [17, -76], [24, -68], [35, -48], [33, -22], [20, 0], [-20, 0]];
  shape(ctx, body, o.col || A111_CLAY, { lw: 5, seed: 640, dot: C.red, pitch: 8, rad: 0.22, da: 0.45 });
  ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(30, -60, 12, -1.6, 1.3); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = o.col || A111_CLAY; ctx.stroke();
  shape(ctx, ell(0, -88, 19, 5, 14), A111_BROWND, { lw: 3, seed: 641 });
  if (o.chip) { ctx.fillStyle = o.bg || '#e8b25a'; ctx.beginPath(); ctx.moveTo(4, -94); ctx.lineTo(9, -82); ctx.lineTo(15, -94); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(4, -90); ctx.lineTo(9, -82); ctx.lineTo(15, -90); ctx.stroke(); }
  if (o.new) { seg(ctx, -30, -40, 30, -40, 5, C.yellow, 2); }
  if ((o.web || 0) > 0) { const L = 46 * o.web, a = o.sw || 0, ex = -16 + Math.sin(a) * L, ey = -88 + Math.cos(a) * L; ctx.lineWidth = 1.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-16, -88); ctx.lineTo(ex, ey); ctx.stroke(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex, ey, 4, 0, 7); ctx.fill();
    ctx.lineWidth = 1.2; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + d * 7, ey - 3); ctx.moveTo(ex, ey); ctx.lineTo(ex + d * 7, ey + 4); ctx.stroke(); } }
  ctx.restore();
}

// ---------- fish (dead market fish, side view) ----------
// centre (x, y); s; puff 0..1 swollen; open 0..1 belly flap onto a dark hollow; tail (radians, the scene swings it); rot; dir; eyes 'x' | 'open'; cut 0..1 dotted knife line
function a111Fish(ctx, x, y, o = {}) {
  const s = o.s ?? 1, puff = o.puff || 0, L = 100, H = 38 * (1 + 0.38 * puff), dir = o.dir ?? 1, op = K.clamp(o.open || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(dir * s, s);
  const half = (u) => H * Math.sqrt(Math.max(0, 1 - u * u)) * (u > 0 ? 1 - 0.25 * u * u : 1 - 0.35 * u * u) * (u > -0.4 && u < 0.7 ? 1 + 0.18 * puff * Math.sin(Math.PI * (u + 0.4) / 1.1) : 1);
  const top = [], bot = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; top.push([u * L, -half(u)]); bot.push([u * L, half(u) * 1.05]); }
  const body = top.concat(bot.slice().reverse());
  // tail
  ctx.save(); ctx.translate(-L + 6, 0); ctx.rotate(o.tail || 0); shape(ctx, [[8, -10], [-50, -40], [-34, 0], [-50, 40], [8, 10]], '#f2a33a', { lw: 5, seed: 650 }); ctx.restore();
  shape(ctx, [[-20, -half(-0.2) + 4], [10, -half(0.1) - 30 + 10 * puff], [40, -half(0.4) + 4]], '#f2a33a', { lw: 4.5, seed: 651 });
  shape(ctx, body, '#f07a7a', { lw: 0 });
  ctx.save(); K.poly(ctx, body, true); ctx.clip(); ctx.fillStyle = '#ffd0c4'; ctx.fillRect(-L, H * 0.15, 2 * L, H * 2); ctx.globalAlpha = 0.5; ctx.fillStyle = dotPat(ctx, C.white, 9, 0.28); ctx.fillRect(-L, -H * 1.6, 2 * L, H * 1.7); ctx.globalAlpha = 1;
  ctx.lineWidth = 2.5; ctx.strokeStyle = '#b8343a'; for (const u of [-0.55, -0.3, -0.05, 0.2]) for (const v of [-0.5, 0, 0.5]) { ctx.beginPath(); ctx.arc(u * L, v * H, 10, -0.9, 0.9); ctx.stroke(); }
  // belly hollow (under the flap)
  if (op > 0) { ctx.fillStyle = NAVY2; ctx.beginPath(); ctx.ellipse(0, H * 0.45, 46, 22 * K.clamp(op * 1.5), 0, 0, 7); ctx.fill(); ctx.fillStyle = dotPat(ctx, '#1b3a8f', 6, 0.3); ctx.fill(); }
  ctx.restore();
  ink(ctx, body, 5.5, 652);
  if (op > 0) { ctx.save(); ctx.translate(0, H * 0.45 + 22 * K.clamp(op * 1.5)); const a = op * 1.2; ctx.scale(1, Math.cos(a) * 0.9 + 0.1);
    shape(ctx, [[-50, 0], [50, 0], [40, 18], [-40, 18], [-50, 0]], '#ffd0c4', { lw: 4, seed: 653 }); ctx.restore(); }
  if ((o.cut || 0) > 0 && op < 0.05) { ctx.save(); ctx.setLineDash([8, 7]); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-50, H * 0.55); ctx.lineTo(-50 + 100 * K.clamp(o.cut), H * 0.55); ctx.stroke(); ctx.restore(); }
  // gill, mouth, eye
  ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(L * 0.42, -H * 0.6); ctx.quadraticCurveTo(L * 0.5, 0, L * 0.42, H * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(L * 0.86, H * 0.1); ctx.lineTo(L * 0.98, H * 0.18); ctx.stroke();
  const ex = L * 0.66, ey = -H * 0.3; shape(ctx, ell(ex, ey, 12, 12, 14), C.white, { lw: 3.5, seed: 654 });
  if ((o.eyes || 'x') === 'x') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - 6, ey - 6); ctx.lineTo(ex + 6, ey + 6); ctx.moveTo(ex + 6, ey - 6); ctx.lineTo(ex - 6, ey + 6); ctx.stroke(); }
  else { ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + 2, ey, 5, 0, 7); ctx.fill(); }
  if (puff > 0.3) { ctx.lineWidth = 2.5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.arc(-10, -H * 0.3, H * 0.4, 3.7, 4.6); ctx.stroke(); }
  ctx.restore();
}

// ---------- pearl ----------
function a111Pearl(ctx, x, y, r, o = {}) {
  const hl = o.hl ?? -2.3; ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  shape(ctx, ell(x, y, r, r, 32), C.white, { lw: Math.max(2.5, r * 0.09), seed: 660 });
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 1, 0, 7); ctx.clip(); ctx.fillStyle = '#cfe0ff'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.arc(x - Math.cos(hl) * r * 0.3, y - Math.sin(hl) * r * 0.3, r * 0.95, 0, 7, true); ctx.fill('evenodd');
  ctx.globalAlpha *= 0.35; ctx.fillStyle = dotPat(ctx, C.blue, Math.max(4, r * 0.18), 0.25); ctx.beginPath(); ctx.arc(x - Math.cos(hl) * r * 0.5, y - Math.sin(hl) * r * 0.5, r * 0.7, 0, 7); ctx.fill(); ctx.restore();
  if (o.band) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 1, 0, 7); ctx.clip(); ctx.globalAlpha *= 0.25; ctx.lineWidth = r * 0.12; ctx.strokeStyle = '#9ab6e8'; ctx.beginPath(); ctx.ellipse(x, y, r * Math.abs(Math.cos(o.band)), r, 0, 0, 7); ctx.stroke(); ctx.restore(); }
  const hx = x + Math.cos(hl) * r * 0.5, hy = y + Math.sin(hl) * r * 0.5; shape(ctx, ell(hx, hy, r * 0.2, r * 0.14, 12), C.white, { lw: Math.max(1.5, r * 0.05), seed: 661 });
  if ((o.glint || 0) > 0) { const g = o.glint, gr = r * 0.9 * g; ctx.save(); ctx.translate(hx, hy); ctx.rotate(o.grot || 0); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? gr * 0.2 : gr; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// ---------- effects ----------
// stink lines with flies: source (x, y), strength k 0..1, n lines
function a111Stink(ctx, x, y, t, k, o = {}) {
  if (k <= 0.01) return; const n = o.n ?? 4, hgt = (o.h ?? 160);
  ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const u = ((t * 0.5 + i / n) % 1), bx = x + (i - (n - 1) / 2) * 30, a = K.clamp(Math.min(u * 4, (1 - u) * 3)) * k; if (a <= 0) continue;
    const pts = []; for (let j = 0; j <= 10; j++) { const v = j / 10; pts.push([bx + Math.sin(v * 9 + t * 4 + i) * 9, y - 10 - u * 40 - v * hgt * 0.7]); }
    ctx.globalAlpha = a; ctx.lineWidth = 11; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = '#7fc23a'; K.poly(ctx, pts); ctx.stroke(); }
  ctx.globalAlpha = k;
  for (let f = 0; f < (o.flies ?? 2); f++) { const a = t * (3.1 + f) + f * 2, fx = x + Math.sin(a) * 60 * (f ? -1 : 1), fy = y - 70 - Math.sin(2 * a) * 24 - f * 30;
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(fx, fy, 5, 0, 7); ctx.fill(); const wf = Math.sin(t * 60 + f) > 0 ? 1 : 0.4; ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.fillStyle = C.white; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(fx + d * 5, fy - 6 * wf, 5, 3, d * 0.6, 0, 7); ctx.fill(); ctx.stroke(); } }
  ctx.restore();
}
// glow: halftone disc, tapering rays, glint stars; col 'white' or 'gold'
function a111Glow(ctx, x, y, r, k, t = 0, o = {}) {
  if (k <= 0.01) return; const white = o.col !== 'gold', c1 = white ? '#fff6c8' : C.yellow, c2 = white ? C.white : C.yellow;
  ctx.save(); ctx.globalAlpha = 0.6 * Math.min(1, k); ctx.fillStyle = dotPat(ctx, c1, 9, 0.45); ctx.beginPath(); ctx.arc(x, y, r * k, 0, 7); ctx.fill();
  ctx.globalAlpha = Math.min(1, k); const n = o.rays ?? 12;
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + t * 0.35, r0 = r * 0.45, r1 = r * (0.95 + 0.15 * Math.sin(t * 5 + i)) * k, w = Math.max(5, r * 0.07);
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); shape(ctx, [[r0, -w], [r1, 0], [r0, w], [r0, -w]], c2, { lw: 2.5, seed: 670 + i }); ctx.restore(); }
  if (o.stars !== false) for (let i = 0; i < 3; i++) { const g = pulse(((t + i * 0.37) % 1.1), 0, 0.6); if (g > 0) star(ctx, x + Math.cos(i * 2.1) * r * 0.75, y + Math.sin(i * 2.1) * r * 0.6, r * 0.13 * g, c2, t); }
  ctx.restore();
}
// coin, coin pile, sack, purse, bread, dates, tray, bowl
function a111Coin(ctx, x, y, r = 11, sx = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1); shape(ctx, ell(0, 0, r, r, 16), C.yellow, { lw: Math.max(2.5, r * 0.25), seed: 680 }); ctx.lineWidth = Math.max(1.5, r * 0.14); ctx.strokeStyle = A111_GOLD; ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.stroke(); ctx.restore(); }
function a111CoinPile(ctx, x, y, n, r = 11) { const rr = K.rng(31); for (let i = 0; i < n; i++) { const row = i < 4 ? 0 : i < 7 ? 1 : i < 9 ? 2 : 3, k = row === 0 ? i : row === 1 ? i - 4 : row === 2 ? i - 7 : 0, w = [4, 3, 2, 1][row]; a111Coin(ctx, x + (k - (w - 1) / 2) * r * 1.7 + (rr() - 0.5) * 3, y - r * 0.55 - row * r * 0.8, r, 0.55 + 0.1 * rr()); } }
function a111Stack(ctx, x, y, n, r = 14) { for (let i = 0; i < n; i++) { shape(ctx, [[x - r, y - i * 7], [x + r, y - i * 7], [x + r, y - i * 7 - 7], [x - r, y - i * 7 - 7], [x - r, y - i * 7]], C.yellow, { lw: 2.5, seed: 681 }); } shape(ctx, ell(x, y - n * 7, r, r * 0.35, 14), C.yellow, { lw: 2.5, seed: 682 }); }
function a111Sack(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const q = o.sq ?? 1; ctx.scale(s * (1 + (1 - q) * 0.8), s * q);
  shape(ctx, [[-62, 0], [-76, -50], [-66, -110], [-34, -142], [-20, -150], [-30, -172], [30, -172], [20, -150], [34, -142], [66, -110], [76, -50], [62, 0], [-62, 0]], o.col || '#d9a441', { lw: 6, seed: 683, dot: A111_BROWN, pitch: 8, rad: 0.22, da: 0.45 });
  seg(ctx, -24, -150, 24, -150, 8, C.red, 2.5);
  if (o.mark !== false) { shape(ctx, ell(0, -70, 30, 30, 18), C.yellow, { lw: 4.5, seed: 684 }); ctx.lineWidth = 5; ctx.strokeStyle = A111_GOLD; ctx.beginPath(); ctx.arc(0, -70, 17, 0, 7); ctx.stroke(); }
  if (o.open) { shape(ctx, ell(0, -168, 34 * o.open, 10 * o.open, 16), C.yellow, { lw: 4, seed: 685 }); }
  ctx.restore();
}
function a111Purse(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (o.out) { shape(ctx, [[-14, 0], [-20, 22], [-10, 46], [0, 40], [10, 46], [20, 22], [14, 0], [-14, 0]], '#e8d2a8', { lw: 4, seed: 686 }); seg(ctx, -12, 2, 12, 2, 6, C.red, 2); }
  else { const lim = o.limp ? 0.7 : 1; shape(ctx, [[-20, 0], [-26, -18 * lim], [-16, -36 * lim], [-8, -40 * lim], [-12, -50 * lim], [12, -50 * lim], [8, -40 * lim], [16, -36 * lim], [26, -18 * lim], [20, 0], [-20, 0]], C.red, { lw: 4, seed: 687, dot: '#a8160f', pitch: 6, rad: 0.25, da: 0.5 }); seg(ctx, -10, -41 * lim, 10, -41 * lim, 5, C.yellow, 2); }
  ctx.restore();
}
function a111Bread(ctx, x, y, s = 1, half = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const w = half ? 18 : 30; shape(ctx, ell(0, 0, w, 14, 18), '#d9903a', { lw: 4, seed: 690, dot: A111_BROWND, pitch: 6, rad: 0.2, da: 0.4 }); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (const dx of half ? [-4] : [-10, 4]) { ctx.beginPath(); ctx.moveTo(dx, -8); ctx.lineTo(dx + 8, 4); ctx.stroke(); } ctx.restore(); }
function a111Date(ctx, x, y, s = 1) { shape(ctx, ell(x, y, 8 * s, 5 * s, 10), '#7a4212', { lw: 2.5, seed: 691 }); }
function a111Tray(ctx, x, y, o = {}) {
  const s = o.s ?? 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, ell(0, 0, 70, 18, 28), C.yellow, { lw: 5, seed: 692, dot: A111_GOLD, pitch: 7, rad: 0.25, da: 0.5 }); shape(ctx, ell(0, -2, 56, 12, 24), '#ffe27a', { lw: 2.5, seed: 693 });
  const b = o.bread || 0; if (b > 0) a111Bread(ctx, -18, -12, 1, b < 1); if (b > 1) a111Bread(ctx, 22, -14, 0.9);
  for (let i = 0; i < (o.dates || 0); i++) a111Date(ctx, 30 + (i % 3) * 12 - 40 * (b > 1 ? 0 : 0), -8 - Math.floor(i / 3) * 8);
  if (o.fruit) { shape(ctx, ell(-44, -16, 13, 12, 12), C.red, { lw: 3, seed: 694 }); shape(ctx, ell(48, -16, 12, 12, 12), '#e8742a', { lw: 3, seed: 695 }); }
  ctx.restore();
}
function a111Bowl(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-40, -24], [40, -24], [26, 0], [-26, 0], [-40, -24]], o.col || A111_CLAY, { lw: 5, seed: 696, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, ell(0, -24, 40, 9, 20), o.full ? '#d9903a' : '#5b3010', { lw: 4, seed: 697 }); ctx.restore(); }
// a cloth knot (the pearl's wrapping): centre (x, y), open 0..1
function a111Knot(ctx, x, y, s = 1, open = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (open < 0.5) { shape(ctx, [[-22, 8], [-26, -10], [-12, -20], [-6, -30], [6, -30], [12, -20], [26, -10], [22, 8], [-22, 8]], C.white, { lw: 4, seed: 698, dot: C.blue, pitch: 6, rad: 0.2, da: 0.35 }); shape(ctx, [[-14, -34], [0, -26], [14, -36], [6, -24], [-6, -24], [-14, -34]], C.white, { lw: 3, seed: 699 }); }
  else shape(ctx, [[-44, 8], [-34, -6], [0, -2], [34, -8], [44, 8], [-44, 8]], C.white, { lw: 4, seed: 700, dot: C.blue, pitch: 6, rad: 0.2, da: 0.35 });
  ctx.restore(); }
// palm-leaf fan: handle point (x, y), angle a
function a111Fan(ctx, x, y, a = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); seg(ctx, 0, 0, 0, -40, 6, WOOD, 2.5); const pts = [[0, -36]]; for (let i = 0; i <= 8; i++) { const b = -1.1 + i * 2.2 / 8; pts.push([Math.sin(b) * 52, -36 - Math.cos(b) * 52 + (i % 2 ? 6 : 0)]); } pts.push([0, -36]); shape(ctx, pts, '#7fc23a', { lw: 4, seed: 701, dot: GREEND, pitch: 7, rad: 0.2, da: 0.45 }); ctx.lineWidth = 2; ctx.strokeStyle = GREEND; for (let i = 1; i < 8; i++) { const b = -1.1 + i * 2.2 / 8; ctx.beginPath(); ctx.moveTo(0, -36); ctx.lineTo(Math.sin(b) * 46, -36 - Math.cos(b) * 46); ctx.stroke(); } ctx.restore(); }
// small knife: handle point, angle
function a111Knife(ctx, x, y, a = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); seg(ctx, 0, 0, 0, 18, 7, A111_BROWND, 2); shape(ctx, [[-4, -2], [4, -2], [2, -40], [-4, -30], [-4, -2]], '#dfe6f0', { lw: 3, seed: 702 }); ctx.restore(); }
// a wordless picture balloon: centre (x, y), size w x h, p (pop), tail point; inside(c) draws in local units centred at 0,0
function a111Balloon(ctx, x, y, w, h, p, tail, inside, o = {}) {
  const k = K.ease.back(K.clamp(p * 1.4)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const pts = ell(0, 0, w / 2, h / 2, 48);
  if (tail) { const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k, a = Math.atan2(ty, tx), bw = 0.22, tl = [[Math.cos(a - bw) * w * 0.42, Math.sin(a - bw) * h * 0.42], [tx, ty], [Math.cos(a + bw) * w * 0.42, Math.sin(a + bw) * h * 0.42]];
    ctx.fillStyle = C.white; K.poly(ctx, tl, true); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; K.poly(ctx, tl); ctx.stroke(); }
  ctx.fillStyle = o.bg || C.white; K.poly(ctx, pts, true); ctx.fill(); ink(ctx, pts, 6, 703);
  if (inside) { ctx.save(); K.poly(ctx, ell(0, 0, w / 2 - 4, h / 2 - 4, 48), true); ctx.clip(); inside(ctx); ctx.restore(); }
  ctx.restore();
}
// red X and green tick
function a111Cross(ctx, x, y, r, p) { if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; const a = K.clamp(p * 2), b = K.clamp(p * 2 - 1);
  for (const [pp, d] of [[a, 1], [b, -1]]) { if (pp <= 0) continue; ctx.beginPath(); ctx.moveTo(x - r * d, y - r); ctx.lineTo(x - r * d + 2 * r * d * pp, y - r + 2 * r * pp); ctx.lineWidth = r * 0.42; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = r * 0.26; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); }
function a111Tick(ctx, x, y, r, p) { if (p <= 0) return; const P = [[x - r, y], [x - r * 0.3, y + r * 0.7], [x + r, y - r * 0.8]], q = K.trim(P, K.clamp(p)); if (q.length < 2) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = r * 0.5; ctx.strokeStyle = C.black; K.poly(ctx, q); ctx.stroke(); ctx.lineWidth = r * 0.3; ctx.strokeStyle = '#3fbf4a'; K.poly(ctx, q); ctx.stroke(); ctx.restore(); }
// balance scale: base (x, y), s, tilt (+ = right pan lower); coins on the left pan, a heart on the right
function a111Scale(ctx, x, y, s, tilt) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  seg(ctx, 0, 0, 0, -120, 8, A111_GOLD, 3); shape(ctx, ell(0, 0, 34, 8, 16), A111_GOLD, { lw: 4, seed: 704 });
  ctx.save(); ctx.translate(0, -120); ctx.rotate(tilt); seg(ctx, -80, 0, 80, 0, 8, A111_GOLD, 3); ctx.restore();
  for (const sd of [-1, 1]) { const px = sd * 80 * Math.cos(tilt), py = -120 + sd * 80 * Math.sin(tilt); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 26, py + 50); ctx.moveTo(px, py); ctx.lineTo(px + 26, py + 50); ctx.stroke();
    shape(ctx, [[px - 32, py + 50], [px + 32, py + 50], [px + 20, py + 62], [px - 20, py + 62], [px - 32, py + 50]], A111_GOLD, { lw: 3.5, seed: 705 });
    if (sd < 0) { a111Coin(ctx, px - 12, py + 42, 10, 0.6); a111Coin(ctx, px + 10, py + 42, 10, 0.6); a111Coin(ctx, px, py + 32, 10, 0.6); } else heart(ctx, px, py + 30, 24); }
  ctx.restore(); }
// light cone from the top of the frame onto (x, yBottom); k strength
function a111Cone(ctx, x, yb, k, t) { if (k <= 0.01) return; ctx.save(); ctx.globalAlpha = 0.55 * k; const g = ctx.createLinearGradient(0, 0, 0, yb); g.addColorStop(0, 'rgba(255,246,200,0.95)'); g.addColorStop(1, 'rgba(255,246,200,0.35)'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(x - 60, -40); ctx.lineTo(x + 60, -40); ctx.lineTo(x + 170, yb); ctx.lineTo(x - 170, yb); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 0.35 * k; ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.3); ctx.fill();
  ctx.globalAlpha = 0.5 * k; ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.ellipse(x, yb, 170, 26, 0, 0, 7); ctx.fill(); ctx.restore(); }
// column of light (angelLight without wings): feet (x, y), height h, width w, alpha k; head glow at the top
function a111Column(ctx, x, y, h, w, k, t) { if (k <= 0.01) return; ctx.save(); ctx.globalAlpha = k;
  const pts = [[x - w * 0.5, y], [x - w * 0.35, y - h * 0.6], [x - w * 0.2, y - h], [x + w * 0.2, y - h], [x + w * 0.35, y - h * 0.6], [x + w * 0.5, y], [x - w * 0.5, y]];
  a111Glow(ctx, x, y - h * 0.85, w * 1.4, 1, t, { stars: true });
  shape(ctx, pts, '#fffbe8', { lw: 4, seed: 706, dot: C.yellow, pitch: 9, rad: 0.25, da: 0.35 });
  shape(ctx, ell(x, y - h * 0.9, w * 0.32, w * 0.32, 20), C.white, { lw: 4, seed: 707 });
  ctx.restore(); }
// a carpet on the floor (S27): band from x0 to x1 at y
function a111Carpet(ctx, x0, x1, y) { shape(ctx, [[x0, y - 6], [x1, y - 6], [x1 + 30, y + 40], [x0 - 30, y + 40], [x0, y - 6]], C.red, { lw: 5, seed: 708, dot: '#a8160f', pitch: 9, rad: 0.25, da: 0.4 });
  shape(ctx, [[x0 + 30, y + 4], [x1 - 30, y + 4], [x1 - 14, y + 30], [x0 + 14, y + 30], [x0 + 30, y + 4]], C.yellow, { lw: 3.5, seed: 709 }); for (let k = x0 - 26; k <= x1 + 26; k += 18) seg(ctx, k, y + 40, k, y + 50, 3, C.yellow, 1.5); }
// little crossed-out ghost icon (dashed outline): kind 'bread' | 'cotton'
function a111Ghost(ctx, kind, x, y, p, xp) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= 0.9;
  shape(ctx, ell(0, 0, 46, 46, 30), 'rgba(255,250,240,0.85)', { lw: 4, seed: 710 }); ctx.setLineDash([7, 6]); ctx.lineWidth = 4; ctx.strokeStyle = C.black;
  if (kind === 'bread') { ctx.beginPath(); ctx.ellipse(0, 4, 30, 15, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-10, -4); ctx.lineTo(-2, 10); ctx.moveTo(6, -4); ctx.lineTo(14, 10); ctx.stroke(); }
  else for (const [dx, dy] of [[-12, 4], [12, 4], [0, -10]]) { ctx.beginPath(); ctx.arc(dx, dy, 13, 0, 7); ctx.stroke(); }
  ctx.setLineDash([]); ctx.restore(); a111Cross(ctx, x, y, 30 * k, xp); }
