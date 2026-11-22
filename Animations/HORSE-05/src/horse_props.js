// ===== The Ebony Horse series: the river city's people and small props (new in HORSE-02; episodes 3-5 copy this file unchanged) =====
// Costumes: the princess (series bible: turquoise, white veil, rose sash), her maid, two palace guards (royal blue, silver helmets).
// Props: tetherRope, oilLamp (carried lantern) with lampGlow (a warm floor pool), ehCup (the dipper cup), mapCard (the charcoal map
// that draws on), ehScroll, guard helmet / spear / torch, the veil ribbon. Pure functions of their arguments.

// ---------- costumes (Library person presets + pal) ----------
const EH_TURQ = '#1fb8b0', EH_ROSESASH = '#ff7aa8';
const EH_PRINCESS = { costume: 'lady', s: 0.93, age: 0, pal: { robe: EH_TURQ, dot: '#14908a', sleeve: '#6fded6', trim: '#f2c040', sash: EH_ROSESASH, hc: '#fffaf0', hd: '#d8d2e8', jewel: EH_ROSESASH, band: '#f2c040', shoes: '#f2c040' } };
const EH_MAID = { costume: 'maiden', s: 0.88, age: 0, pal: { robe: '#a88ae0', dot: '#7a5ec0', sleeve: '#c8b0f0', sash: '#fff0d8', apron: '#fff0d8', head: 'scarf', hc: '#ffb070', hd: '#e08a40', band: '#ffb070', shoes: '#ffd23a' } };
const EH_GUARD_A = { costume: 'servant', s: 1.02, age: 0.3, pal: { robe: '#2a5ad0', dot: '#1a3a90', sleeve: '#4a7ae8', sleeveLen: 'long', len: 'knee', sash: '#fff6ea', pants: '#1a3a90', head: 'cap', hc: '#c8d0e0', shoes: '#5a3a2a', tache: true } };   // tall, torch, moustache
const EH_GUARD_B = { costume: 'servant', s: 0.9, age: 0.4, pal: { robe: '#2a5ad0', dot: '#1a3a90', sleeve: '#4a7ae8', sleeveLen: 'long', len: 'knee', sash: '#fff6ea', pants: '#1a3a90', head: 'cap', hc: '#c8d0e0', shoes: '#5a3a2a', belly: 1, beard: 'short' } };   // short, wide, spear

// world point of a body-local hand target (approximate: ignores tip and drop), for props held in a hand
function ehHandW(P, hand) { const s = P.s || 1, d = Math.sign(P.dir || 1); return [P.x + d * s * hand[0], P.y + s * hand[1]]; }
// the white veil ribbon that follows the princess by delay (from the back of the head, falling behind the shoulder)
function ehVeilRibbon(ctx, P, t, o = {}) {
  const s = P.s || 1, [hx, hy] = ehHeadOf(P), d = Math.sign(P.dir || 1), tr = K.clamp((o.vx || 0) / 260, -1, 1);
  const ang = Math.PI / 2 + d * 0.35 - tr * 0.9 + (o.swing || 0) + idleSway(t, 83, 0.05, 2.1);
  ehRibbon(ctx, hx - d * 30 * s, hy + 6 * s, ang, 120 * s, 34 * s, t, '#fffaf0', { wave: 4 + 10 * Math.abs(tr) + (o.wave || 0), hz: 1.0 + Math.abs(tr), tip: 0.5, shade: '#d8d2e8', lw: 2.5, line: '#8a7aa8' });
}

// ---------- tetherRope: a straw rope from a to b with sag (0..60) and taut 0..1; o.coil draws a coil at a ----------
function tetherRope(ctx, a, b, sag = 30, o = {}) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + sag * (1 - (o.taut || 0)), pts = K.bezier ? K.bezier(a, [mx, my], [mx, my], b, 18) : [a, [mx, my], b];
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#6a4a1a'; ctx.lineWidth = (o.w || 7) + 4; K.poly(ctx, pts); ctx.stroke(); ctx.strokeStyle = '#e8c870'; ctx.lineWidth = o.w || 7; K.poly(ctx, pts); ctx.stroke();
  ctx.strokeStyle = '#a88a3a'; ctx.lineWidth = 1.5; for (let i = 1; i < pts.length - 1; i += 2) { const [x, y] = pts[i]; ctx.beginPath(); ctx.moveTo(x - 3, y - 3); ctx.lineTo(x + 3, y + 3); ctx.stroke(); } ctx.restore();
}
function ehRopeCoil(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#6a4a1a'; ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(0, i * 5, 24 - i * 2, 10, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = '#e8c870'; ctx.lineWidth = 5; ctx.stroke(); } ctx.restore(); }

// ---------- oilLamp: the brass hand lantern (x, y = the ring handle), flame on threes; lampGlow: a warm pool on the floor ----------
function oilLamp(ctx, x, y, t3, o = {}) {
  const s = o.s || 1, sw = o.swing || 0; ctx.save(); ctx.translate(x, y); ctx.rotate(sw); ctx.scale(s, s);
  ehGlow(ctx, 0, 44, 90, 0.75 * (o.lit ?? 1), '#ffd27a');
  ctx.save(); ctx.strokeStyle = '#6a4a10'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 10, Math.PI, 0); ctx.stroke(); ctx.strokeStyle = '#e0b038'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
  celShade(ctx, [[-12, 4], [12, 4], [20, 16], [-20, 16]], '#e0b038', '#a87a1c', { off: 3, lw: 2, line: '#6a4a10' });
  celShade(ctx, [[-18, 16], [18, 16], [20, 66], [-20, 66]], '#ffcf6a', '#f0a83a', { off: 5, lw: 2, line: '#6a4a10' });
  const f = 1 + 0.18 * Math.sin(t3 * 21 + (o.seed || 0)); shape(ctx, [[-6, 56], [0, 56 - 24 * f], [6, 56]], '#fff8d0', { lw: 0 }); shape(ctx, [[-3, 56], [0, 56 - 12 * f], [3, 56]], '#ffffff', { lw: 0 });
  for (const sx of [-20, 20]) seg(ctx, sx, 16, sx, 66, 3, '#c8961a', 1); celShade(ctx, [[-22, 66], [22, 66], [14, 78], [-14, 78]], '#e0b038', '#a87a1c', { off: 3, lw: 2, line: '#6a4a10' });
  ctx.restore();
}
function lampGlow(ctx, x, y, r, k = 1, col = '#ffd27a') {
  if (k <= 0 || r <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, k);
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, K.rgba(col, 0.42)); g.addColorStop(0.5, K.rgba(col, 0.18)); g.addColorStop(1, K.rgba(col, 0));
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.28, 0, 0, 7); ctx.fill(); ctx.restore();
}
// ---------- the dipper cup (x, y = hook / grip point), o tilt (drinking), water 0..1 ----------
function ehCup(ctx, x, y, s = 1, tilt = 0, water = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.scale(s, s);
  seg(ctx, 0, 0, 0, 12, 3, '#a87a1c', 1); celShade(ctx, [[-13, 12], [13, 12], [10, 30], [-10, 30]], '#e0b038', '#a87a1c', { off: 4, hi: '#fff1b0', lw: 2, line: '#6a4a10' });
  if (water > 0) shape(ctx, ell(0, 13, 11, 3, 10), '#8ad8f8', { lw: 0 }); ctx.restore(); }

// ---------- guard gear: helmet over a person's head, spear, torch ----------
function ehHelmet(ctx, P) { const s = P.s || 1, [hx, hy] = ehHeadOf(P), d = Math.sign(P.dir || 1);
  celShade(ctx, [[hx - 40 * s, hy - 18 * s], [hx - 30 * s, hy - 54 * s], [hx, hy - 96 * s], [hx + 30 * s, hy - 54 * s], [hx + 40 * s, hy - 18 * s]], '#c8d0e0', '#8a94b0', { light: [-1, -1], off: 12 * s, hi: '#f0f4ff', lw: 3, line: '#3a3a5a' });
  celShade(ctx, K.rectPts(hx - 42 * s, hy - 24 * s, 84 * s, 10 * s), '#e0b038', '#a87a1c', { off: 3, lw: 2, line: '#6a4a10' });
  seg(ctx, hx + d * 4 * s, hy - 16 * s, hx + d * 4 * s, hy + 8 * s, 4 * s, '#a8b0c8', 1); }
function ehNeckCloth(ctx, P) { const s = P.s || 1, [hx, hy] = ehHeadOf(P); celShade(ctx, [[hx - 40 * s, hy - 14 * s], [hx + 40 * s, hy - 14 * s], [hx + 44 * s, hy + 46 * s], [hx - 44 * s, hy + 46 * s]], '#fff6ea', '#cfc6d8', { off: 8 * s, lw: 2.5, line: '#5a5a7a' }); }
function ehSpear(ctx, hx, hy, s = 1, lean = 0) { const bx = hx - Math.sin(lean) * 130 * s, by = hy + 150 * s, tx = hx + Math.sin(lean) * 160 * s, ty = hy - 180 * s;
  seg(ctx, bx, by, tx, ty, 6 * s, '#8a5a3a', 2); const a = Math.atan2(ty - by, tx - bx); ctx.save(); ctx.translate(tx, ty); ctx.rotate(a);
  celShade(ctx, [[0, -8 * s], [34 * s, 0], [0, 8 * s], [-6 * s, 0]], '#e8eef8', '#a8b0c8', { off: 3, lw: 2, line: '#3a3a5a' }); ctx.restore(); return [tx, ty]; }
function ehTorch(ctx, hx, hy, t3, s = 1, k = 1) { seg(ctx, hx, hy + 30 * s, hx + 6 * s, hy - 60 * s, 7 * s, '#7a4a2a', 2); const fx = hx + 6 * s, fy = hy - 64 * s, f = 1 + 0.2 * Math.sin(t3 * 19);
  ehGlow(ctx, fx, fy - 10 * s, 180 * s, 0.8 * k, '#ff9a3a'); shape(ctx, [[fx - 14 * s, fy], [fx - 6 * s, fy - 30 * s * f], [fx, fy - 46 * s * f], [fx + 8 * s, fy - 26 * s * f], [fx + 14 * s, fy]], '#ff8a2a', { lw: 0 }); shape(ctx, [[fx - 7 * s, fy], [fx, fy - 26 * s * f], [fx + 7 * s, fy]], '#ffe08a', { lw: 0 }); }

// ---------- the scroll in the hands and the map card that draws on ----------
function ehScroll(ctx, x, y, s = 1, open = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const w = K.lerp(12, 70, open);
  celShade(ctx, K.rectPts(-w / 2, -25, w, 50), '#fff3d6', '#e8d4a8', { off: 4, lw: 2, line: '#6a4a3a' }); if (open > 0.3) { ctx.strokeStyle = '#4a3a5a'; ctx.lineWidth = 1.5; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-w / 2 + 8, -12 + k * 12); ctx.lineTo(w / 2 - 10 - k * 6, -14 + k * 12); ctx.stroke(); } }
  for (const sx of [-1, 1]) celShade(ctx, K.rectPts(sx * w / 2 - 6, -30, 12, 60), '#e8d4a8', '#c8a878', { off: 3, lw: 2, line: '#6a4a3a' }); ctx.restore(); }
// the map strokes in card units (520 x 380, origin top-left): palace, towers + bridge, dome + hatch, river, road + arrow, moon
const EH_MAP = (() => {
  const wave = (y0, a) => Array.from({ length: 22 }, (_, i) => [20 + i * 22, y0 + Math.sin(i * 0.8) * a - i * 4]);
  return [
    [[[220, 250], [220, 170], [330, 170], [330, 250]], [[210, 170], [340, 170]], [[260, 250], [260, 215], [275, 200], [290, 215], [290, 250]]],
    [[[90, 250], [96, 120], [116, 120], [122, 250]], [[90, 120], [106, 88], [122, 120]], [[150, 250], [156, 120], [176, 120], [182, 250]], [[150, 120], [166, 88], [182, 120]], [[122, 214], [150, 214]], [[122, 226], [130, 218], [142, 218], [150, 226]]],
    [[[350, 250], [350, 200]], [[350, 200], [362, 170], [390, 156], [418, 170], [430, 200]], [[430, 200], [430, 250]], [[390, 156], [390, 136]], [[372, 196], [384, 184]], [[386, 204], [400, 188]], [[400, 210], [414, 196]]],
    [wave(352, 6), wave(370, 6)],
    [[[40, 330], [80, 318]], [[100, 312], [140, 300]], [[160, 296], [200, 284]], [[220, 280], [250, 266]], [[236, 254], [256, 262], [246, 278]]],
    [[[440, 64], [428, 80], [430, 100], [444, 112], [462, 110]], [[440, 64], [452, 78], [456, 96], [462, 110]]],
  ];
})();
// mapCard(ctx, x, y, k, t, o): the cream card centred at (x, y), scaled o.s; k 0..6 = stroke groups drawn so far (fractional = drawing);
// o.tail [x, y] (the scroll), o.pop 0..1 (scale-in with overshoot), o.fold 0..1 (folds away)
function mapCard(ctx, x, y, k, t, o = {}) {
  const pop = K.ease.back(K.clamp(o.pop ?? 1)), fold = K.clamp(o.fold || 0), sc = (o.s || 1) * pop * (1 - fold); if (sc <= 0.01) return null;
  ctx.save(); if (o.tail && fold < 0.5) { ctx.fillStyle = '#fff3d6'; ctx.strokeStyle = '#6a4a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 60 * sc, y + 150 * sc); ctx.lineTo(o.tail[0], o.tail[1]); ctx.lineTo(x + 20 * sc, y + 170 * sc); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.translate(x, y); ctx.scale(sc, sc * (1 - 0.6 * fold)); ctx.translate(-260, -190);
  const R = K.rng(41), edge = []; for (let i = 0; i <= 40; i++) { const u = i / 40; edge.push([u * 520, (R() - 0.5) * 8]); } for (let i = 0; i <= 30; i++) edge.push([520 + (R() - 0.5) * 8, i / 30 * 380]); for (let i = 40; i >= 0; i--) edge.push([i / 40 * 520, 380 + (R() - 0.5) * 8]); for (let i = 30; i >= 0; i--) edge.push([(R() - 0.5) * 8, i / 30 * 380]);
  ctx.save(); ctx.shadowColor = 'rgba(40,20,60,0.35)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8; celShade(ctx, edge, '#fff3d6', '#f0e0b8', { off: 10, lw: 3, line: '#6a4a3a' }); ctx.restore();
  ctx.strokeStyle = '#4a3a5a'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; let tip = null;
  EH_MAP.forEach((grp, gi) => { const u = K.clamp(k - gi); if (u <= 0) return; ctx.lineWidth = gi === 3 ? 4 : 5; const total = grp.length; grp.forEach((stroke, si) => { const v = K.clamp(u * total - si); if (v <= 0) return; const q = K.trim(densify(stroke, 4), v); if (q.length > 1) { K.poly(ctx, q); ctx.stroke(); if (v < 1) tip = q[q.length - 1]; } }); });
  ctx.restore();
  return tip ? [x + (tip[0] - 260) * sc, y + (tip[1] - 190) * sc * (1 - 0.6 * fold)] : null;
}
