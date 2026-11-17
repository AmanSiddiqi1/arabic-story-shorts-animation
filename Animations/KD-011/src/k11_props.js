// ===== KD-011 The Rats and the Iron: story props and sets (candidates for Library/, see library_proposals.md) =====
// World units, ground y 900. Every drawing is a pure function of its arguments.
const K11IRON = '#4a5878', K11IRON2 = '#6f7f9e', K11IROND = '#2a3550';

// k11Ingot(ctx, x, y, w, h, o): one iron ingot (trapezoid end-on), bottom-left at (x, y). o.glint 0..1, o.bite 0..1 (a bite out of the top)
function k11Ingot(ctx, x, y, w = 44, h = 22, o = {}) {
  const b = o.bite || 0, pts = [[x, y], [x + w, y], [x + w - 6, y - h], [x + 6, y - h]];
  if (b > 0) { const cx = x + w * 0.62, r = 9 * b, arc = []; for (let i = 0; i <= 6; i++) { const a = Math.PI * i / 6; arc.push([cx + r * Math.cos(a), y - h + r * Math.sin(a)]); } pts.splice(3, 0, ...arc); }
  shape(ctx, pts, K11IRON, { lw: 3.5, seed: 7 + Math.round(x) % 9, dot: K11IROND, pitch: 6, rad: 0.25, da: 0.4 });
  seg(ctx, x + 9, y - h + 5, x + w * 0.45, y - h + 5, 1.5, K11IRON2, 0);
  if (o.glint > 0) { star(ctx, x + w * 0.3, y - h + 2, 9 * o.glint, C.white, o.glint * 2); }
}
// k11Stack(ctx, x, y, o): stack of ingots, bottom centre (x, y). o.n ingots shown (default 15), o.rows [5,4,3,2,1], o.glint index, o.gv 0..1,
// o.bites: map index -> 0..1, o.s scale. Returns top y.
function k11Stack(ctx, x, y, o = {}) {
  const rows = o.rows || [5, 4, 3, 2, 1], n = o.n ?? 15, s = o.s ?? 1, w = 44, h = 22; let k = 0, top = y;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rows.forEach((cnt, r) => { for (let i = 0; i < cnt; i++) { if (k >= n) break; const bx = -cnt * w / 2 + i * w + (r % 2) * 2, by = -r * h; k11Ingot(ctx, bx, by, w, h, { glint: o.glint === k ? (o.gv ?? 1) : 0, bite: o.bites ? (o.bites[k] || 0) : 0 }); top = y - (r + 1) * h * s; k++; } });
  ctx.restore(); return top;
}
// k11Cart(ctx, x, y, o): two-wheeled handcart, bed centre x, ground y. o.ang wheel angle (x / 42), o.handles 1 (to +x) or -1, o.lift (handle end lift), o.s,
// o.load(ctx, bedX, bedTopY) draws the load. Returns {top, hx, hy} (bed top y, handle grip point).
function k11Cart(ctx, x, y, o = {}) {
  const s = o.s ?? 1, ang = o.ang || 0, hd = o.handles ?? 1, lift = o.lift ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const bt = -88, hy = -70 - lift;
  seg(ctx, 0, bt + 20, hd * 175, hy, 9, WOOD, 3.5); seg(ctx, -20, bt + 26, hd * 160, hy + 6, 9, '#8a5a14', 3.5);
  shape(ctx, K.rectPts(-105, bt, 210, 26), WOOD, { lw: 5, seed: 61, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 });
  for (const px of [-100, -30, 40, 98]) seg(ctx, px, bt, px, bt - 26, 6, '#8a5a14', 3);
  seg(ctx, -104, bt - 22, 104, bt - 22, 6, WOOD, 3);
  if (o.load) o.load(ctx, 0, bt - 2);
  // wheel
  shape(ctx, ell(0, -42, 42, 42, 24), '#8a5a14', { lw: 6, seed: 62 }); shape(ctx, ell(0, -42, 30, 30, 20), WOOD, { lw: 3.5, seed: 63 });
  for (let i = 0; i < 4; i++) { const a = ang + i * Math.PI / 4; seg(ctx, -Math.cos(a) * 30, -42 - Math.sin(a) * 30, Math.cos(a) * 30, -42 + Math.sin(a) * 30, 4, EARTHD, 1.5); }
  shape(ctx, ell(0, -42, 8, 8, 10), C.yellow, { lw: 3, seed: 64 });
  ctx.restore(); return { top: y + (bt - 2) * s, hx: x + hd * 175 * s, hy: y + hy * s };
}
// k11Purse(ctx, x, y, o): drawstring purse, bottom centre (x, y). o.fill 0 flat .. 1 fat, o.s, o.tilt, o.open (mouth open, upside down use tilt PI)
function k11Purse(ctx, x, y, o = {}) {
  const f = o.fill ?? 1, s = o.s ?? 1, w = 18 + 14 * f, h = 26 + 8 * f;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.tilt || 0); ctx.scale(s * (o.sx || 1), s / (o.sx || 1));
  shape(ctx, [[-w * 0.5, -h * 0.85], [-w, -h * 0.35], [-w * 0.9, 0], [w * 0.9, 0], [w, -h * 0.35], [w * 0.5, -h * 0.85]], '#c9702a', { lw: 4, seed: 66, dot: '#8a4a12', pitch: 7, rad: 0.25, da: 0.4 });
  shape(ctx, [[-w * 0.55, -h * 0.85], [-12, -h - 8], [12, -h - 8], [w * 0.55, -h * 0.85]], '#c9702a', { lw: 4, seed: 67 });
  seg(ctx, -w * 0.55, -h * 0.85, w * 0.55, -h * 0.85, 2.5, C.red, 1.5);
  ctx.restore();
}
function k11Coin(ctx, x, y, r = 11, spin = 0) { const sx = Math.max(0.15, Math.abs(Math.cos(spin))); shape(ctx, ell(x, y, r * sx, r, 14), C.yellow, { lw: 3, seed: 68, dot: C.red, pitch: 5, rad: 0.25, da: 0.5 }); }
// coin pile: n coins stacked in a heap, bottom centre
function k11Coins(ctx, x, y, n, r = 11) { const per = [6, 5, 4, 3, 2, 1]; let k = 0; for (let row = 0; row < per.length && k < n; row++) for (let i = 0; i < per[row] && k < n; i++, k++) k11Coin(ctx, x + (i - (per[row] - 1) / 2) * r * 1.9, y - r * 0.6 - row * r * 1.1, r); }
// moth: two flapping wings
function k11Moth(ctx, x, y, t, s = 1) { const f = Math.abs(Math.sin(t * 22)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 22, -8 - 14 * f], [sd * 18, 8 - 6 * f]], '#d9c9a0', { lw: 3, seed: 69 });
  shape(ctx, ell(0, 0, 4, 9, 10), '#7a6a50', { lw: 2.5, seed: 70 }); ctx.restore(); }
// padlock hanging from a hasp at (x, y); sw = swing angle; o.open shackle lifted, o.glint
function k11Lock(ctx, x, y, sw = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(sw);
  ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 14 - (o.open ? 10 : 0), 11, Math.PI, 0); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = '#9aa6c0'; ctx.beginPath(); ctx.arc(0, 14 - (o.open ? 10 : 0), 11, Math.PI, 0); ctx.stroke();
  shape(ctx, K.rectPts(-16, 14, 32, 28), '#c58a18', { lw: 4, seed: 71, dot: EARTHD, pitch: 6, rad: 0.2, da: 0.4 }); shape(ctx, ell(0, 26, 3.5, 5, 8), C.black, { lw: 0 });
  if (o.glint > 0) star(ctx, -9, 20, 12 * o.glint, C.white, o.glint * 3); ctx.restore(); }
function k11Key(ctx, x, y, a = 0, s = 1, glint = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); seg(ctx, 0, 0, 0, 40, 6, '#c58a18', 2.5); seg(ctx, 0, 34, 9, 34, 4, '#c58a18', 2); seg(ctx, 0, 26, 7, 26, 4, '#c58a18', 2);
  shape(ctx, ell(0, -8, 10, 10, 12), '#c58a18', { lw: 3.5, seed: 72 }); shape(ctx, ell(0, -8, 4, 4, 8), C.paper, { lw: 2 }); if (glint > 0) star(ctx, 6, -12, 14 * glint, C.white, glint * 2); ctx.restore(); }
function k11Ball(ctx, x, y, r = 16, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, ell(0, 0, r, r, 16), C.red, { lw: 3.5, seed: 73 });
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - 2, 0, 7); ctx.clip(); ctx.fillStyle = C.white; ctx.fillRect(-r, -4, 2 * r, 8); ctx.restore(); ctx.restore(); }
// food tray: brass tray with a flat bread (bread 0..1 left), dates and a cup
function k11Tray(ctx, x, y, o = {}) { const s = o.s ?? 1, br = o.bread ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, ell(0, 0, 62, 14, 24), C.yellow, { lw: 4, seed: 74, dot: '#c58a18', pitch: 7, rad: 0.25, da: 0.5 });
  if (br > 0.05) shape(ctx, ell(-18, -8, 30 * br + 6, 9, 16), '#e8b25a', { lw: 3.5, seed: 75, dot: '#a8741a', pitch: 6, rad: 0.2, da: 0.4 });
  for (let i = 0; i < (o.dates ?? 4); i++) shape(ctx, ell(18 + (i % 2) * 10, -10 - Math.floor(i / 2) * 7, 6, 4, 8), '#7a4212', { lw: 2, seed: 76 + i });
  shape(ctx, [[34, -10], [52, -10], [49, -32], [37, -32]], C.blue, { lw: 3, seed: 79 }); ctx.restore(); }
// travel bundle on a staff held at the hand (hx, hy): staff over the shoulder, bundle swinging (sw radians)
function k11Bundle(ctx, hx, hy, dir = 1, sw = 0, o = {}) { const ex = hx - dir * 70, ey = hy - 78; seg(ctx, hx + dir * 10, hy + 14, ex, ey, 6, '#8a5a14', 2.5);
  ctx.save(); ctx.translate(ex, ey); ctx.rotate(sw); seg(ctx, 0, 0, 0, 18, 2, C.black, 0); shape(ctx, ell(0, 36, 26, 22, 16), o.col || C.red, { lw: 4, seed: 80, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, [[-8, 14], [8, 14], [0, 24]], o.col || C.red, { lw: 3, seed: 81 }); ctx.restore(); }
function k11BundleGround(ctx, x, y, sq = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(1 + (1 - sq) * 0.7, sq); shape(ctx, ell(0, -22, 30, 22, 16), C.red, { lw: 4, seed: 80, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, [[-8, -40], [8, -40], [0, -52]], C.red, { lw: 3, seed: 81 }); ctx.restore(); }
function k11Sandals(ctx, x, y) { for (const dx of [-14, 14]) shape(ctx, ell(x + dx, y - 4, 11, 5, 12), '#c9702a', { lw: 3, seed: 82 }); }
function k11Nail(ctx, x, y, a = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); seg(ctx, -16, 0, 14, 0, 4, K11IRON2, 2); seg(ctx, -18, -5, -18, 5, 3, K11IRON, 2); ctx.restore(); }
function k11Basket(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, 22, Math.PI, 0); ctx.stroke();
  shape(ctx, [[-30, 0], [30, 0], [24, 30], [-24, 30]], '#d9a441', { lw: 4, seed: 83, dot: '#a8741a', pitch: 6, rad: 0.2, da: 0.4 }); shape(ctx, ell(-8, -2, 9, 9, 10), C.red, { lw: 2.5 }); shape(ctx, ell(10, -3, 8, 8, 10), GREEN2, { lw: 2.5 }); ctx.restore(); }
function k11Cobweb(ctx, x, y, r, sx = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1); ctx.strokeStyle = 'rgba(255,250,240,0.85)'; ctx.lineWidth = 2;
  for (let i = 0; i <= 4; i++) { const a = Math.PI / 2 * i / 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.stroke(); }
  for (let k = 1; k <= 3; k++) { ctx.beginPath(); for (let i = 0; i <= 4; i++) { const a = Math.PI / 2 * i / 4, rr = r * k / 3.4; i ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.stroke(); } ctx.restore(); }
function k11Sweat(ctx, x, y, s = 1) { shape(ctx, [[x, y - 12 * s], [x + 7 * s, y], [x, y + 6 * s], [x - 7 * s, y]], TEAR, { lw: 2.5, seed: 84 }); }
// dotted red blush on both cheeks of a person head at (hx, hy)
function k11Blush(ctx, hx, hy, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; for (const dx of [-24, 24]) { ctx.save(); ctx.beginPath(); ctx.ellipse(hx + dx, hy + 10, 13, 8, 0, 0, 7); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 5, 0.42); ctx.fillRect(hx + dx - 14, hy, 28, 20); ctx.restore(); } ctx.restore(); }
// a dotted child-sized outline (the boy who is not there)
function k11Ghost(ctx, x, y, s, a, ph) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.lineWidth = 7; ctx.strokeStyle = C.white;
  const sw = Math.sin(ph) * 10; ctx.beginPath(); ctx.ellipse(x, y - 130 * s, 26 * s, 27 * s, 0, 0, 7); ctx.moveTo(x - 22 * s, y - 100 * s); ctx.lineTo(x - 26 * s, y - 45 * s); ctx.lineTo(x + 26 * s, y - 45 * s); ctx.lineTo(x + 22 * s, y - 100 * s); ctx.closePath();
  ctx.moveTo(x - 9 * s, y - 45 * s); ctx.lineTo(x - 9 * s + sw * s, y); ctx.moveTo(x + 9 * s, y - 45 * s); ctx.lineTo(x + 9 * s - sw * s, y); ctx.stroke(); ctx.restore(); }

// ---------- the friend's storeroom double door (on the house front) ----------
// k11StoreDoor(ctx, o): door x 420..610, y 640..900. o.open 0..1 (leaves swing out toward us), o.bar 0..1 (bar in place), o.lock 1 (padlock hanging),
// o.lockSw, o.lockGlint, o.inside(ctx) (the room seen through the doorway), o.slam (squash of the frame)
const K11SD = { x0: 420, x1: 610, top: 640, bottom: 900, cx: 515 };
function k11StoreDoor(ctx, o = {}) {
  const D = K11SD, op = K.clamp(o.open || 0), hw = (D.x1 - D.x0) / 2;
  ctx.save(); ctx.beginPath(); ctx.rect(D.x0, D.top, D.x1 - D.x0, D.bottom - D.top); ctx.clip();
  ctx.fillStyle = '#1a2a5a'; ctx.fillRect(D.x0, D.top, D.x1 - D.x0, D.bottom - D.top); ctx.fillStyle = dotPat(ctx, '#0d2260', 9, 0.32); ctx.fillRect(D.x0, D.top, D.x1 - D.x0, D.bottom - D.top);
  shape(ctx, [[D.x0, 880], [D.x1, 880], [D.x1, 900], [D.x0, 900]], '#5b3a1e', { lw: 0 });
  if (o.inside) o.inside(ctx);
  ctx.restore();
  // leaves: each hinged on its outer post, swinging outward: width narrows with cos, outer edge grows taller (perspective)
  for (const sd of [-1, 1]) { const hx = sd < 0 ? D.x0 : D.x1, a = op * 1.45, w = hw * Math.cos(a), fx = hx - sd * w, grow = 22 * Math.sin(a);
    const pts = [[hx, D.top - 4], [fx, D.top - 4 - grow], [fx, D.bottom + grow * 0.4], [hx, D.bottom]];
    if (w > 2) { shape(ctx, pts, '#8a5a14', { lw: 4.5, seed: 85 + sd, dot: EARTHD, pitch: 8, rad: 0.18, da: 0.35 });
      ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let k = 1; k < 3; k++) { const px = K.lerp(hx, fx, k / 3); ctx.beginPath(); ctx.moveTo(px, D.top - grow * k / 3); ctx.lineTo(px, D.bottom + grow * 0.4 * k / 3); ctx.stroke(); } ctx.restore();
      for (const fy of [0.22, 0.78]) seg(ctx, hx, D.top + (D.bottom - D.top) * fy, fx, D.top + (D.bottom - D.top) * fy + (fy < 0.5 ? -grow * 0.6 : grow * 0.3), 6, K11IRON, 2); }
    else seg(ctx, hx, D.top, hx, D.bottom, 8, '#8a5a14', 3); }
  ink(ctx, [[D.x0 - 8, D.bottom], [D.x0 - 8, D.top - 10], [D.x1 + 8, D.top - 10], [D.x1 + 8, D.bottom]], 8, 86);
  // bar and padlock
  const bar = K.clamp(o.bar ?? 0);
  if (bar > 0.01) { const by = 772 - (1 - bar) * 60, bx = (1 - bar) * 90; ctx.save(); ctx.translate(D.cx + bx, by); ctx.rotate((1 - bar) * 0.5); shape(ctx, K.rectPts(-118, -12, 236, 24), WOOD, { lw: 4.5, seed: 87, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); ctx.restore(); }
  for (const hx of [D.x0 - 14, D.x1 + 2]) shape(ctx, K.rectPts(hx, 756, 12, 32), K11IRON, { lw: 3, seed: 88 });
  if (o.lock) k11Lock(ctx, D.cx, 778, o.lockSw || 0, { glint: o.lockGlint || 0, open: o.lockOpen });
}
// storeroom interior seen through the doorway: the stack against the back wall, or dust outlines + cobweb
function k11StoreInside(ctx, state, o = {}) { const D = K11SD;
  ctx.save(); ctx.fillStyle = 'rgba(255,220,140,0.12)'; ctx.fillRect(D.x0, D.top, D.x1 - D.x0, D.bottom - D.top); ctx.restore();
  if (state === 'full') { ctx.save(); ctx.globalAlpha *= 0.9; k11Stack(ctx, D.cx - 10, 882, { s: 0.62, n: 15 }); ctx.restore(); }
  else { ctx.save(); ctx.setLineDash([8, 7]); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,250,240,0.6)'; ctx.strokeRect(D.cx - 80, 860, 150, 22); ctx.restore(); k11Cobweb(ctx, D.x0 + 2, D.top + 2, 60); }
  if (o.cart) o.cart(ctx);
}

// ---------- the street: one strip from x -1000 to 1000 (marketStreet w 2000 drawn shifted) ----------
// left: a plain house (x -1010..-710) with the palm, the merchant's house (x -700..-200, door x -380..-280); the open road to the far city gate
// (x -190..370, gate at x 90); right: the friend's house front (x 380..1010) with the storeroom double door, the house door and a window.
const K11MDOOR = { x0: -380, x1: -280, top: 650, cx: -330 }, K11HDOOR = { x0: 650, x1: 740, top: 650, cx: 695 };
const K11HOUSES = [
  { x0: -10, x1: 290, top: 500, col: 0, windows: [[60, 590, 76, 88], [180, 590, 76, 88]] },
  { x0: 300, x1: 810, top: 470, col: 2, door: [K11MDOOR.x0 + 1000, K11MDOOR.x1 + 1000, K11MDOOR.top, 'round'], windows: [[440, 600, 80, 90], [690, 600, 80, 90]] },
  { x0: 1380, x1: 2010, top: 470, col: 1, door: [K11HDOOR.x0 + 1000, K11HDOOR.x1 + 1000, K11HDOOR.top, 'round'], windows: [[1800, 610, 80, 80]] },
];
function k11Road(c) {   // the far road and the city gate, drawn in the gap between the houses (baked)
  const gx = 90, gy = 800;
  shape(c, [[-195, 902], [-195, 760], [-30, 744], [-30, 712], [10, 712], [10, 744], [170, 744], [170, 712], [210, 712], [210, 744], [375, 760], [375, 902]], '#d9a441', { lw: 0 });
  shape(c, [[-195, 812], [375, 812], [375, 760], [210, 744], [170, 744], [170, 712], [210, 712], [210, 744], [-30, 744], [-30, 712], [10, 712], [10, 744], [-195, 760]], '#e8b25a', { lw: 6, seed: 120, dot: '#a8741a', pitch: 11, rad: 0.16, da: 0.35 });
  c.save(); K.poly(c, townArchPts(gx - 34, gx + 34, 748, gy + 12, 'round'), true); c.fillStyle = '#7fb0ff'; c.fill(); c.restore(); ink(c, townArchPts(gx - 34, gx + 34, 748, gy + 12, 'round').slice(1, -1), 6, 121);
  shape(c, [[gx - 26, gy + 12], [gx + 26, gy + 12], [370, 902], [-190, 902]], SANDL, { lw: 5, seed: 122, dot: '#d9a441', pitch: 10, rad: 0.18, da: 0.4 });
  c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(122,66,18,0.5)'; for (const f of [-0.35, 0.35]) { c.beginPath(); c.moveTo(gx + f * 30, gy + 14); c.lineTo(gx + f * 420, 900); c.stroke(); } c.restore();
}
// k11Street(ctx, o): o.palette ('clear' | 'dusk'), o.u (months montage sky), o.t, o.houseDoor (friend's door 0..1), o.mDoor (merchant's door 0..1),
// o.store (k11StoreDoor options), o.bench (the doorstep bench for the evening). Returns nothing; anchors are the K11 constants.
function k11Street(ctx, o = {}) {
  const pal = o.palette || 'clear';
  ctx.save(); ctx.translate(-1000, 0);
  const so = { w: 2000, palette: pal, palace: false, houses: K11HOUSES, doors: [o.mDoor || 0, o.houseDoor || 0], t: o.t || 0, seed: 7, shutters: 1 };
  if (o.u != null) so.u = o.u;
  marketStreet(ctx, so);
  ctx.restore();
  townBake(ctx, 'k11road' + pal, -200, 700, 580, 210, (c) => { k11Road(c); if (pal === 'dusk') { c.globalAlpha = 0.22; c.fillStyle = NAVY2; c.fillRect(-200, 700, 580, 210); } });
  palmTree(ctx, -560, 902, { h: 470, lean: -24, t: o.t || 0, sway: 0.6 });
  if (o.store) k11StoreDoor(ctx, o.store);
  if (o.bench) { shape(ctx, K.rectPts(395, 852, 300, 48), STONE, { lw: 5, seed: 123, dot: STONED, pitch: 9, rad: 0.18, da: 0.4 }); shape(ctx, K.rectPts(388, 846, 314, 12), STONE2, { lw: 4, seed: 124 }); }
}
// the storeroom cutaway (S6): floor y 900, stone back wall, barred window high left with a light shaft, shelf with jars, doorway on the right (x 600..900)
function k11Storeroom(ctx, o = {}) {
  const t = o.t || 0;
  townBake(ctx, 'k11store', 0, 0, 1000, 1230, (c) => {
    shape(c, [[-10, -10], [1010, -10], [1010, 910], [-10, 910]], '#c9bfa6', { lw: 0, dot: '#8c8a94', pitch: 12, rad: 0.2, da: 0.4 });
    c.save(); c.strokeStyle = 'rgba(20,20,20,0.45)'; c.lineWidth = 3; for (let y = 90, r = 0; y < 900; y += 70, r++) { c.beginPath(); c.moveTo(0, y); c.lineTo(600, y); c.stroke(); for (let x = (r % 2) * 60; x < 600; x += 120) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 70); c.stroke(); } } c.restore();
    // doorway to the street on the right
    shape(c, [[600, 910], [600, 300], [1010, 300], [1010, 910]], '#e8b25a', { lw: 0 });
    c.save(); c.beginPath(); c.rect(600, 300, 410, 610); c.clip(); sky(c); c.fillStyle = '#f2d27a'; c.fillRect(600, 640, 410, 270); shape(c, [[600, 700], [1010, 690], [1010, 910], [600, 910]], '#d6c49a', { lw: 0, dot: '#a8741a', pitch: 11, rad: 0.15, da: 0.35 }); c.restore();
    shape(c, [[560, 910], [560, 260], [610, 260], [610, 910]], '#8a5a14', { lw: 6, seed: 125, dot: EARTHD, pitch: 8, rad: 0.18, da: 0.4 });
    shape(c, [[-10, 220], [620, 220], [620, 262], [-10, 262]], '#7a4212', { lw: 6, seed: 126 });
    // window and shaft
    c.save(); c.globalAlpha = 0.28; c.fillStyle = dotPat(c, C.yellow, 12, 0.36); K.poly(c, [[110, 330], [200, 330], [380, 900], [150, 900]], true); c.fill(); c.restore();
    shape(c, K.rectPts(100, 300, 110, 80), '#7fb0ff', { lw: 6, seed: 127 }); for (const x of [128, 155, 182]) seg(c, x, 300, x, 380, 5, K11IRON, 2);
    // shelf with jars
    shape(c, K.rectPts(330, 470, 200, 16), WOOD, { lw: 4, seed: 128 }); shape(c, [[360, 470], [350, 430], [365, 400], [395, 400], [410, 430], [400, 470]], C.red, { lw: 4, seed: 129 }); shape(c, [[450, 470], [440, 440], [470, 420], [500, 440], [490, 470]], C.blue, { lw: 4, seed: 130 });
    // floor planks
    shape(c, [[-10, 900], [1010, 900], [1010, 1240], [-10, 1240]], '#a8741a', { lw: 7, seed: 131, dot: '#7a4212', pitch: 10, rad: 0.18, da: 0.4 });
    c.save(); c.strokeStyle = 'rgba(20,20,20,0.5)'; c.lineWidth = 3; for (const y of [960, 1040, 1140]) { c.beginPath(); c.moveTo(0, y); c.lineTo(1000, y); c.stroke(); } c.restore();
    // dust outlines where the stack stood, cobweb in the corner
    c.save(); c.setLineDash([10, 8]); c.lineWidth = 4; c.strokeStyle = 'rgba(255,250,240,0.75)'; c.strokeRect(180, 870, 240, 34); c.strokeRect(205, 840, 190, 30); c.restore();
    k11Cobweb(c, 0, 262, 120);
  });
}
// the merchant's house interior (S9): Library palaceHall merchant variant + cushion and low table
function k11Interior(ctx, o = {}) {
  palaceHall(ctx, { variant: 'merchant', desk: false, curtain: null, doorOpen: o.door ?? 0, u: 0.2, light: 1, t: o.t || 0, outside: (c) => { c.fillStyle = '#7fb0ff'; c.fillRect(0, 0, 1000, 1230); } });
  shape(ctx, ell(640, 896, 92, 20, 24), C.red, { lw: 5, seed: 132, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.45 });
  shape(ctx, [[460, 860], [600, 860], [592, 876], [468, 876]], WOOD, { lw: 4, seed: 133 }); for (const x of [474, 586]) seg(ctx, x, 874, x, 900, 6, '#8a5a14', 2.5);
}
