// ===== Fox and the Drum set pieces (the fox, colours and soundArcs now come from the Library) =====
const DRUM = { x: 800, r: 125 };
function drumDraw(ctx, t, o) {
  const cx = DRUM.x, cy = GR - DRUM.r, r = DRUM.r, hit = o.hit || 0;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(1 + 0.045 * hit, 1 - 0.03 * hit); ctx.rotate(hit * 0.015);
  shape(ctx, ell(0, 0, r + 20, r + 20, 48), C.red, { lw: 9, seed: 40, dot: '#7a1008', pitch: 9, rad: 0.18, da: 0.5 });
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(Math.cos(a) * (r + 5), Math.sin(a) * (r + 5), 7, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); }
  const skin = ell(0, 0, r - 12, r - 12, 48); shape(ctx, skin, '#f6e7bf', { lw: 8, seed: 41, dot: '#c9a54a', pitch: 10, rad: 0.15, da: 0.5 });
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, b = a + Math.PI / 16; seg(ctx, Math.cos(a) * (r + 18), Math.sin(a) * (r + 18), Math.cos(b) * (r - 10), Math.sin(b) * (r - 10), 5, C.yellow, 2.5); }
  if (o.hole > 0) { const h = o.hole, hx = -52, hy = -6, pts = []; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, rr = (i % 2 ? 0.72 : 1) * 46 * h * (0.85 + 0.2 * Math.sin(i * 2.3)); pts.push([hx + Math.cos(a) * rr, hy + Math.sin(a) * rr * 1.15]); } pts.push(pts[0]);
    shape(ctx, pts, NAVY2, { lw: 6, seed: 42 }); if (h > 0.9) { ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#6d86c8'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(hx - 30, hy - 30); ctx.lineTo(hx + 18 * Math.cos(i), hy + 30 * Math.sin(i + 1)); ctx.stroke(); } ctx.beginPath(); ctx.arc(hx, hy, 18, 0.6, 2.4); ctx.stroke(); ctx.restore(); } }
  ctx.restore();
}
function treeBack() { return layer1('trees', WW, GR + 10, (x) => { const r = K.rng(8); for (let i = 0; i < 9; i++) { const tx = 20 + i * 118 + r() * 30, h = 360 + r() * 140; x.fillStyle = WOOD; x.fillRect(tx - 18, GR - h, 36, h); x.lineWidth = 6; x.strokeStyle = C.black; x.strokeRect(tx - 18, GR - h, 36, h); for (const [dx, dy, cr] of [[0, 0, 70], [-46, 40, 52], [46, 40, 52]]) { x.beginPath(); x.arc(tx + dx, GR - h + dy, cr, 0, 7); x.fillStyle = GREEND; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); } } }); }
function drumTree() { return layer1('dtree', WW, GR + 10, (x) => { shape(x, [[900, GR + 4], [918, 300], [986, 300], [1004, GR + 4]], WOOD, { lw: 9, seed: 50, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  for (const [cx, cy, cr] of [[940, 250, 130], [850, 330, 100], [1000, 340, 90], [900, 180, 90]]) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); } for (const [cx, cy, cr] of [[940, 250, 130], [850, 330, 100], [1000, 340, 90], [900, 180, 90]]) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); } x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of [[940, 250, 130], [850, 330, 100], [1000, 340, 90], [900, 180, 90]]) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); } }); }
function hideTree() { return layer1('htree', WW, GR + 10, (x) => { shape(x, [[466, GR + 4], [482, 340], [558, 340], [576, GR + 4]], WOOD, { lw: 9, seed: 51, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 }); for (const [cx, cy, cr] of [[520, 300, 110], [430, 360, 76], [610, 360, 76]]) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); } for (const [cx, cy, cr] of [[520, 300, 110], [430, 360, 76], [610, 360, 76]]) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); } x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of [[520, 300, 110], [430, 360, 76], [610, 360, 76]]) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); } }); }
function branchDraw(ctx, dip, t) {
  const sw = Math.sin(t * 2.2) * 6, p = K.bezier([940, 520], [900, 470], [858 + sw, 540 + 20 * dip], [812 + sw * 0.5, 596 + 52 * dip], 18);
  for (let i = 1; i < p.length; i++) seg(ctx, p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], 42 - i * 0.9, C.black, 0); for (let i = 1; i < p.length; i++) seg(ctx, p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], 30 - i * 0.9, WOOD, 0);
  const e = p[p.length - 1]; for (const [dx, dy, r] of [[0, 0, 36], [-24, -14, 26], [20, -18, 26]]) { ctx.beginPath(); ctx.arc(e[0] + dx, e[1] + dy, r, 0, 7); ctx.fillStyle = GREEN2; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); }
}

