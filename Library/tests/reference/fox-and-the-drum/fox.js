// ===== fox, drum, trees for the fox and the drum =====
const GREEN = '#3f9d4a', GREEN2 = '#6cc35a', GREEND = '#2b7a38', FOXC = '#e8742a', FOXD = '#b5501a', CREAM = '#fff3d6';
function fox(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, amp = P.amp ?? 0, sit = P.sit || 0;
  ctx.save(); ctx.translate(P.x + (P.shake ? Math.sin(P.shake * 50) * 3 : 0), P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  ctx.translate(-60, 0); ctx.rotate(-0.55 * sit); ctx.translate(60, 0);
  // tail
  const tu = P.tailUp ?? 0.2, pf = P.puff || 1, tp = K.bezier([-78, -96], [-130, -96 - 40 * tu], [-150, -90 - 100 * tu], [-124 + Math.sin(ph * 0.5) * 8, -150 - 60 * tu], 14);
  const tw = (i) => (22 + 16 * Math.sin(Math.PI * i / tp.length)) * pf; for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], tw(i) + 10, C.black, 0); for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], tw(i), i > 11 ? C.white : FOXC, 0);
  const leg = (x, sw, far) => { const a = Math.sin(ph + sw) * amp * 0.6, fx = x + Math.sin(a) * 34, lift = a > 0 ? a * 24 : 0; seg(ctx, x, -70, fx, -12 - lift, 18, far ? FOXD : FOXC, 4.5); shape(ctx, ell(fx + 8, -8 - lift, 20, 9, 12), C.black, { lw: 3, seed: 3 }); };
  leg(-56, 0, true); leg(52, Math.PI, true);
  shape(ctx, ell(0, -92, 90, 44, 30), FOXC, { lw: 7, seed: 5, dot: FOXD, pitch: 9, rad: 0.16, da: 0.5 });
  shape(ctx, ell(18, -76, 62, 24, 22), CREAM, { lw: 0 });
  leg(-30, Math.PI, false);
  if (P.raise) { const r = P.raise; seg(ctx, 50, -80, 50 + 52 * r, -80 - 30 * r - 20, 18, FOXC, 4.5); shape(ctx, ell(50 + 60 * r, -80 - 30 * r - 22, 20, 9, 12), C.black, { lw: 3, seed: 3 }); } else leg(66, 0, false);
  // head
  const hx = 92, hy = -128 + (P.drop || 0) + (P.shake ? Math.sin(P.shake * 60) * 2 : 0);
  seg(ctx, 66, -100, hx, hy + 10, 38, FOXC, 5);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.headUp || 0);
  const ea = (P.ears || 0) * 0.9;
  for (const ex of [-16, 6]) { ctx.save(); ctx.translate(ex, -26); ctx.rotate(-0.1 - ea * 1.1 + (ex > 0 ? 0.35 : 0)); shape(ctx, [[-16, 6], [0, -50], [16, 6]], FOXC, { lw: 5, seed: 6 }); shape(ctx, [[-8, 0], [0, -30], [8, 0]], C.black, { lw: 0 }); ctx.restore(); }
  shape(ctx, [[-4, -22], [74, 6], [-4, 26]], FOXC, { lw: 6, seed: 7 });
  shape(ctx, ell(0, 0, 34, 30, 22), FOXC, { lw: 7, seed: 8, dot: FOXD, pitch: 8, rad: 0.15, da: 0.5 });
  shape(ctx, [[8, 8], [70, 8], [10, 30], [-8, 22]], CREAM, { lw: 0 });
  shape(ctx, ell(76, 4, 9, 8, 10), C.black, { lw: 3, seed: 9 });
  eyeAt(ctx, 18, -8, P.eyes || 'open', 0.8);
  if (P.brow) { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(6, -24 - P.brow * 5); ctx.lineTo(32, -24 + P.brow * 8); ctx.stroke(); ctx.restore(); }
  const tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, [[12, 14], [64, 12 + o * 4], [58, 18 + o * 26], [18, 22 + o * 12]], C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(40, 20 + o * 14, 14, 4 + o * 5, 0, 0, 7); ctx.fill(); if (m === 'open') { ctx.fillStyle = C.white; for (const tx of [26, 44]) { ctx.beginPath(); ctx.moveTo(tx, 14); ctx.lineTo(tx + 6, 14); ctx.lineTo(tx + 3, 22); ctx.fill(); } } }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(34, 30, 14, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(34, 8, 16, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(14, 16); ctx.lineTo(60, 14); ctx.stroke(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}
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
function soundArcs(ctx, x, y, dirx, t, col = C.white) { for (let i = 0; i < 3; i++) { const u = ((t * 1.6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, 20 + u * 60, dirx > 0 ? -0.7 : Math.PI - 0.7, dirx > 0 ? 0.7 : Math.PI + 0.7); ctx.stroke(); ctx.restore(); } }
