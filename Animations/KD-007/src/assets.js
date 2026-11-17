// ===== KD-007 The Three Fish: local assets (fish figure, pondStream set, nets, lily pads, leaf, splash, swim tracks) =====
// Drawn in this story only (Library/ stays untouched); proposed for the Library in ../library_proposals.md.
// World: 2200 x 1230. Far-bank ground y 470 (feet 462), water surface y 500. Pond x 90..910 (bed to y 1090), stream x 910..1330
// (bed y 585), river from x 1330 (bed y 1160). Rock (300, 1060), weeds (640, 1080), barrier x 915, nook (1950, 1110).
const K7W = 2200, K7H = 1230, K7SURF = 500, K7BANK = 462;
const K7ROCK = [300, 1000], K7WEEDS = [640, 1080], K7BAR = 915, K7NOOK = [1950, 1090], K7SPOT = [1450, 452];
const K7WATER = '#2f6fd8', K7WATERD = '#1d5bd0', K7GRASS = '#3f9d4a', K7SKIN = '#f05a5a';
const K7B = (t, a, d, e = 'lin') => K.beat(t, a, d, e);
const K7FLOAT = { roll: 1, limp: 1, eyes: 'shut', mouth: 'open' };   // the belly-up float: Fish 3 at 18.68, the memory at 122.74, Fish 2 at 129.12
// bake at an explicit resolution (a 2200-wide set at 1.5x keeps memory sane with three render workers)
function k7bake(key, w, h, k, draw) { return K.cached('kd7:' + key, () => { const c = K.layer(Math.round(w * k), Math.round(h * k)), x = c.getContext('2d'); x.scale(k, k); draw(x); return c; }); }

// ---------- bed line of the water (pond bowl, stream, river) ----------
const K7BED = [[40, 500], [70, 505], [96, 600], [130, 760], [200, 940], [300, 1060], [420, 1092], [560, 1095], [700, 1082], [800, 1010], [858, 880], [886, 740], [902, 625], [912, 585],
  [1000, 588], [1100, 584], [1200, 589], [1328, 586], [1352, 700], [1392, 900], [1440, 1080], [1520, 1160], [2240, 1160]];
const k7bedY = (x) => { for (let i = 1; i < K7BED.length; i++) if (x <= K7BED[i][0]) { const [x0, y0] = K7BED[i - 1], [x1, y1] = K7BED[i]; return K.lerp(y0, y1, (x - x0) / (x1 - x0)); } return 1160; };

// ---------- the static set: back layer (trees, bank, water body) and front layer (cut earth, pebbles, rocks) ----------
function k7back(ctx) {
  ctx.drawImage(k7bake('back', K7W, K7H, 1.5, (c) => {
    for (const [ox, sd, n] of [[0, 8, 7], [1270, 5, 8], [2210, 3, 1]]) { c.save(); c.translate(ox, 0); treeRow(c, { y: 476, n, seed: sd, hmin: 230, hvar: 110 }); c.restore(); }
    for (const x of [930, 1180]) bush(c, { x, w: 170, h: 90, y: 470, seed: Math.round(x) });
    shape(c, [[-10, 446], [300, 440], [700, 448], [1100, 441], [1500, 447], [1900, 440], [2210, 445], [2210, 520], [-10, 520]], K7GRASS, { lw: 6, seed: 71, dot: GREEND, pitch: 9, rad: 0.25, da: 0.5 });
    c.save(); c.lineWidth = 3; c.strokeStyle = GREEND; const r = K.rng(12); for (let i = 0; i < 160; i++) { const x = r() * 2200, y = 452 + r() * 14; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 4, y - 10); c.moveTo(x + 3, y); c.lineTo(x + 6, y - 9); c.stroke(); } c.restore();
    const wp = [[40, K7SURF], ...K7BED.slice(1), [2240, K7SURF]];
    shape(c, wp, K7WATER, { lw: 0, dot: C.white, pitch: 11, rad: 0.12, da: 0.22 });
    c.save(); K.poly(c, wp, true); c.clip(); c.fillStyle = WATERD; c.globalAlpha = 0.35; for (let y = 760; y < 1240; y += 40) { c.globalAlpha = K.clamp((y - 700) / 900) * 0.6; c.fillRect(0, y, 2240, 40); } c.restore();
  }), 0, 0, K7W, K7H);
}
function k7front(ctx) {
  ctx.drawImage(k7bake('front', K7W, K7H, 1.5, (c) => {
    const ep = [[-20, 500], ...K7BED, [2240, 1240], [-20, 1240]];
    shape(c, ep, EARTH, { lw: 7, seed: 73, dot: EARTHD, pitch: 10, rad: 0.24, da: 0.55 });
    c.save(); K.poly(c, ep, true); c.clip(); const r = K.rng(31);
    for (let i = 0; i < 60; i++) { const x = r() * 2200, y = k7bedY(x) + 40 + r() * 300; if (y > 1225) continue; shape(c, ell(x, y, 10 + r() * 14, 7 + r() * 8, 12), i % 3 ? STONE : '#c98a3a', { lw: 3, seed: i }); }
    c.restore();
    const r2 = K.rng(9); for (let x = 920; x < 1325; x += 22 + r2() * 14) shape(c, ell(x, 590 + r2() * 4, 10 + r2() * 6, 7, 10), r2() < 0.5 ? STONE2 : STONE, { lw: 3, seed: Math.round(x) });
    // the rock with an overhanging ledge (hide spot on its right, under the ledge)
    shape(c, [[160, 1092], [168, 1010], [196, 950], [250, 918], [320, 908], [388, 922], [436, 952], [462, 990], [452, 1012], [404, 1016], [380, 1030], [372, 1092]], STONE, { lw: 7, seed: 74, dot: STONED, pitch: 9, rad: 0.24, da: 0.5 });
    shape(c, [[372, 1030], [404, 1018], [452, 1014], [470, 1092], [372, 1092]], '#2a2440', { lw: 5, seed: 75 });
    // river nook: two rocks
    shape(c, [[1780, 1160], [1790, 1080], [1830, 1040], [1870, 1050], [1884, 1110], [1878, 1160]], STONE, { lw: 6, seed: 76, dot: STONED, pitch: 9, rad: 0.24, da: 0.5 });
    shape(c, [[2046, 1160], [2052, 1060], [2096, 1020], [2146, 1032], [2166, 1100], [2162, 1160]], STONE, { lw: 6, seed: 77, dot: STONED, pitch: 9, rad: 0.24, da: 0.5 });
  }), 0, 0, K7W, K7H);
}
// the rock again over a hiding fish (the front layer already holds it; this redraws only the rock, so a fish can be drawn between)
function k7rockOver(ctx) { ctx.save(); ctx.beginPath(); ctx.rect(150, 900, 330, 200); ctx.clip(); k7front(ctx); ctx.restore(); }

// live water: current streaks (river and stream), drifting light dots, the wavy surface line
function k7waterLive(ctx, t, cam) {
  ctx.save(); ctx.lineCap = 'round'; const r = K.rng(5);
  for (let i = 0; i < 46; i++) { const y = 540 + r() * 580, sp = 40 + r() * 50, L = 30 + r() * 50; let x = 1340 + ((r() * 900 + t * sp) % 900); if (y > k7bedY(x) - 20) continue;
    ctx.globalAlpha = 0.55; ctx.strokeStyle = C.white; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y); ctx.stroke(); }
  for (let i = 0; i < 8; i++) { const y = 530 + r() * 45, x = 1320 - ((r() * 420 + t * 70) % 420); ctx.globalAlpha = 0.5; ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 26, y); ctx.stroke(); }
  ctx.restore();
}
function k7surface(ctx, t) {
  const pts = []; for (let x = 40; x <= 2240; x += 20) pts.push([x, K7SURF + 3 * Math.sin(x * 0.03 + t * 2.2)]);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 9; K.poly(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = C.white; ctx.lineWidth = 4; K.poly(ctx, pts, false); ctx.stroke(); ctx.restore();
}

// ---------- small set pieces ----------
function k7lilyPad(ctx, x, y, r, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const pts = []; for (let i = 0; i <= 24; i++) { const a = 0.35 + i / 24 * (Math.PI * 2 - 0.7); pts.push([Math.cos(a) * r, Math.sin(a) * r * 0.28]); } pts.push([0, 0]);
  shape(ctx, pts, GREEN2, { lw: 5, seed: 81, dot: GREEND, pitch: 7, rad: 0.25, da: 0.5 }); ctx.restore();
}
function k7reeds(ctx, x, n, t, bendT = -1, seed = 3) {
  const r = K.rng(seed);
  for (let i = 0; i < n; i++) { const bx = x + i * 16 + r() * 8, h = 120 + r() * 70, sw = 0.05 * Math.sin(t * 1.3 + i) + (bendT >= 0 ? swing(t, bendT, 0.35, 1.6, 2.4) : 0);
    const tx = bx + Math.sin(sw) * h, ty = 560 - Math.cos(sw) * h; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(bx, 600); ctx.quadraticCurveTo(bx, 560 - h * 0.5, tx, ty); ctx.stroke(); ctx.strokeStyle = GREEN; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    if (i % 2 === 0) { ctx.save(); ctx.translate(tx, ty + 14); ctx.rotate(sw); shape(ctx, [[-7, -22], [7, -22], [8, 18], [-8, 18]], '#7a4212', { lw: 4, seed: i }); ctx.restore(); } }
}
function k7reedTip(x, t, bendT, i = 0, seed = 3) { const r = K.rng(seed); let bx = 0, h = 0; for (let k = 0; k <= i; k++) { bx = x + k * 16 + r() * 8; h = 120 + r() * 70; } const sw = 0.05 * Math.sin(t * 1.3 + i) + (bendT >= 0 ? swing(t, bendT, 0.35, 1.6, 2.4) : 0); return [bx + Math.sin(sw) * h, 560 - Math.cos(sw) * h]; }
function k7weeds(ctx, x, y, t, part = 0, seed = 6) {   // part: how far the stems are pushed apart (0..1)
  const r = K.rng(seed);
  for (let i = 0; i < 7; i++) { const bx = x - 60 + i * 20, h = 170 + r() * 90, side = bx < x ? -1 : 1, sw = 0.12 * Math.sin(t * 1.1 + i * 0.9) + side * part * 0.35;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const pts = []; for (let k = 0; k <= 6; k++) { const u = k / 6; pts.push([bx + Math.sin(sw * u * 2 + Math.sin(t * 2 + i + u * 3) * 0.15) * h * u, y - h * u]); }
    ctx.strokeStyle = C.black; ctx.lineWidth = 15; K.poly(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = i % 2 ? GREEN : GREEN2; ctx.lineWidth = 8; K.poly(ctx, pts, false); ctx.stroke(); ctx.restore(); }
}
function k7leaf(ctx, x, y, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, [[-26, 0], [-10, -12], [16, -10], [28, 0], [14, 9], [-10, 10]], GREEN2, { lw: 4, seed: 91 }); seg(ctx, -22, 0, 24, 0, 1, GREEND, 1); ctx.restore(); }
function k7bubble(ctx, x, y, r, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 3.5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.22, 0, 7); ctx.fill(); ctx.restore(); }
// a stream of rising bubbles from a point, emitted between t0 and t1 (pure function of t)
function k7bubbles(ctx, t, t0, t1, from, o = {}) { const n = o.n ?? 6, rate = o.rate ?? 4, vy = o.vy ?? 120;
  for (let k = 0; k < (t1 - t0) * rate; k++) { const te = t0 + k / rate, d = t - te; if (d < 0) continue; const p = typeof from === 'function' ? from(te) : from, y = p[1] - d * vy; if (y < K7SURF + 8) continue; if (d > (o.life ?? 3)) continue;
    k7bubble(ctx, p[0] + Math.sin(d * 5 + k) * 6, y, (o.r ?? 7) * (0.7 + 0.5 * ((k * 37) % 7) / 7), 1); } }
function k7redCross(ctx, x, y, r, p = 1) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); seg(ctx, -r, -r, r, r, 10, C.red, 4); seg(ctx, -r, r, r, -r, 10, C.red, 4); ctx.restore(); }
function k7crumb(ctx, x, y) { shape(ctx, [[x - 8, y - 4], [x + 2, y - 9], [x + 9, y - 2], [x + 4, y + 7], [x - 6, y + 6]], '#c98a3a', { lw: 3, seed: 5 }); }
function k7splash(ctx, x, y, d) {   // a crown of drops and rings, d = seconds since entry
  if (d < 0 || d > 1.4) return; ripple(ctx, x, y, 0, d, 1.6); ripple(ctx, x, y, 0.15, d, 1.1);
  if (d > 0.8) return; for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.28, v = 380 + (i % 3) * 60, px = x + Math.cos(a) * v * d * 0.6, py = y + Math.sin(a) * v * d + 900 * d * d; if (py > y + 4) continue;
    ctx.save(); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(px, py, 7, 10, a + Math.PI / 2, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
  shape(ctx, [[x - 60, y + 2], [x - 40, y - 40 * (1 - d / 0.8)], [x - 18, y - 10], [x, y - 60 * (1 - d / 0.8)], [x + 18, y - 10], [x + 40, y - 40 * (1 - d / 0.8)], [x + 60, y + 2]], C.white, { lw: 4, seed: 93 });
}
function k7cobweb(ctx, x, y, r) { ctx.save(); ctx.globalAlpha = 0.85; ctx.strokeStyle = C.white; ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { const a = Math.PI + i / 5 * Math.PI; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke(); }
  for (const f of [0.35, 0.65, 0.95]) { ctx.beginPath(); for (let i = 0; i <= 5; i++) { const a = Math.PI + i / 5 * Math.PI; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * r * f, y + Math.sin(a) * r * f * 0.9); } ctx.stroke(); } ctx.restore(); }

// ---------- k7net: a deformable mesh on a quad (hand net bag, big net wall, bag, barrier) ----------
// corners [tl, tr, br, bl]; o: {nu, nv, bulge: [x, y, amount, radius], fill (paper alpha 0.35), lw, floats (top edge), weights (bottom edge)}
function k7net(ctx, q, o = {}) {
  const nu = o.nu ?? 8, nv = o.nv ?? 8, [A, Bq, Cq, D] = q, bl = o.bulge;
  const P = (u, v) => { let x = (1 - v) * ((1 - u) * A[0] + u * Bq[0]) + v * ((1 - u) * D[0] + u * Cq[0]), y = (1 - v) * ((1 - u) * A[1] + u * Bq[1]) + v * ((1 - u) * D[1] + u * Cq[1]);
    if (bl) { const d = Math.hypot(x - bl[0], y - bl[1]), f = Math.exp(-(d * d) / (2 * bl[3] * bl[3])); x += bl[2] * f; y += (bl[4] || 0) * f; } return [x, y]; };
  const out = []; for (let i = 0; i <= 10; i++) out.push(P(i / 10, 0)); for (let i = 0; i <= 10; i++) out.push(P(1, i / 10)); for (let i = 10; i >= 0; i--) out.push(P(i / 10, 1)); for (let i = 10; i >= 0; i--) out.push(P(0, i / 10));
  ctx.save(); ctx.fillStyle = C.paper || '#fbf2da'; ctx.globalAlpha *= o.fill ?? 0.35; K.poly(ctx, out, true); ctx.fill(); ctx.restore();
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const pass of [[C.black, (o.lw ?? 3) + 2.5], ['#f2e6c4', o.lw ?? 3]]) { ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1];
    for (let i = 0; i <= nu; i++) { ctx.beginPath(); for (let k = 0; k <= 12; k++) { const p = P(i / nu, k / 12); ctx[k ? 'lineTo' : 'moveTo'](p[0], p[1]); } ctx.stroke(); }
    for (let j = 0; j <= nv; j++) { ctx.beginPath(); for (let k = 0; k <= 12; k++) { const p = P(k / 12, j / nv); ctx[k ? 'lineTo' : 'moveTo'](p[0], p[1]); } ctx.stroke(); } }
  ctx.restore();
  if (o.floats) for (let i = 0; i <= nu; i += 2) { const p = P(i / nu, 0); shape(ctx, ell(p[0], p[1], 12, 8, 12), C.red, { lw: 3, seed: i }); }
  if (o.weights) for (let i = 1; i <= nu; i += 2) { const p = P(i / nu, 1); shape(ctx, ell(p[0], p[1], 8, 8, 10), STONED, { lw: 3, seed: i }); }
  return P;
}
// a closed bag of mesh around (x, y), radius r, drawn as a teardrop hanging from (x, top)
function k7bag(ctx, x, y, r, top) { const pts = []; for (let i = 0; i <= 20; i++) { const a = -Math.PI / 2 + i / 20 * Math.PI * 2, k = Math.sin(a) < -0.3 ? 0.5 : 1; pts.push([x + Math.cos(a) * r * k, y + Math.sin(a) * r]); }
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); k7net(ctx, [[x - r, y - r], [x + r, y - r], [x + r, y + r], [x - r, y + r]], { nu: 6, nv: 6, fill: 0.45 }); ctx.restore(); ink(ctx, pts, 5, 3);
  ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, top); ctx.stroke(); ctx.restore(); }
// the rolled big net on a pole between two men
function k7roll(ctx, x0, y0, x1, y1, sag) { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag; seg(ctx, x0, y0, x1, y1, 8, WOOD, 3);
  ctx.save(); ctx.translate(mx, my); shape(ctx, [[-120, -26], [120, -26], [126, 0], [120, 26], [-120, 26], [-126, 0]], '#f2e6c4', { lw: 5, seed: 95 });
  ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; for (let i = -110; i <= 110; i += 18) { ctx.beginPath(); ctx.moveTo(i, -24); ctx.lineTo(i + 10, 24); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx - 90, my - 24); ctx.lineTo(mx - 70, (y0 + y1) / 2); ctx.moveTo(mx + 90, my - 24); ctx.lineTo(mx + 70, (y0 + y1) / 2); ctx.stroke(); ctx.restore(); }
// the hand net: pole from the hand (hx, hy) to a hoop at (ex, ey); the bag hangs below the hoop (sw = swing)
function k7handNet(ctx, hx, hy, ex, ey, sw = 0, inside) {
  seg(ctx, hx, hy, ex, ey, 7, WOOD, 3);
  const bx = ex + Math.sin(sw) * 70, by = ey + Math.cos(sw) * 70;
  ctx.save(); ctx.translate(ex, ey); const pts = [[-46, 0], [46, 0], [bx - ex + 14, by - ey], [bx - ex - 14, by - ey]];
  if (inside) inside(ctx, (bx - ex) * 0.6, (by - ey) * 0.55);
  k7net(ctx, pts, { nu: 5, nv: 4, fill: 0.3, lw: 2.5 }); shape(ctx, ell(0, 0, 48, 10, 20), 'rgba(0,0,0,0)', { lw: 6, seed: 96 }); ctx.restore();
}
// barrier across the stream mouth: two stakes and a mesh between them. drive: 0..1 (stakes in), mesh: 0..1 (mesh dropped), bulge amount (towards the river)
function k7barrier(ctx, drive, mesh, bulge = 0, by = 560) {
  const d = K.clamp(drive), top = K.lerp(330, 430, d);
  for (const [x, sd] of [[K7BAR - 16, 1], [K7BAR + 22, 2]]) shape(ctx, [[x - 9, top], [x + 9, top], [x + 9, 588 + (1 - d) * -120], [x, 604 + (1 - d) * -120], [x - 9, 588 + (1 - d) * -120]], WOOD, { lw: 5, seed: sd });
  if (mesh > 0) { const bot = K.lerp(top + 30, 588, K.clamp(mesh)); k7net(ctx, [[K7BAR - 14, top + 20], [K7BAR + 20, top + 20], [K7BAR + 20, bot], [K7BAR - 14, bot]], { nu: 3, nv: 9, fill: 0.4, lw: 3, bulge: bulge ? [K7BAR, by, bulge, 30] : null }); }
}

// ---------- the fish figure ----------
// k7fish(ctx, P): side view, (x, y) = body centre, facing dir (+1 right). pal 0 wise (long, yellow), 1 clever (red, white belly), 2 carefree (round, pink).
// Fields: s, ph/amp (tail beat), bend (-1..1 body curve, + = nose up), roll (0..1: 1 = belly up; never thinner than 0.7), fin (-1..1 pectoral: 1 = raised
// like a hand), finPt (0..1 pectoral stretched forward to point), dorsal (0 flat .. 1 up), mouth (closed, smile, o, open, frown, smirk), talk, brow
// (+ angry, - raised), eyes (open, wide, shut, x, star), puff (cheeks), limp (fins and tail flop), gaze, lid, wet, sq (<1 squash, >1 stretch
// along the body), rot (radians), alpha, silhouette. LIFE.t gives natural blinks.
const K7FPAL = [
  { L: 190, H: 31, body: C.yellow, belly: '#fff3b0', dot: C.red, dotTop: true, fin: C.red, eye: 13, nose: 0.28, dorsal: 'point', lid: 0.2, seed: 11 },
  { L: 160, H: 37, body: C.red, belly: C.white, dot: C.blue, dotBelly: true, fin: C.yellow, eye: 16.5, nose: 0.22, dorsal: 'fan', lid: 0, seed: 23 },
  { L: 128, H: 47, body: K7SKIN, belly: '#ffc4b8', dot: C.white, dotAll: true, fin: C.yellow, eye: 14.5, nose: 0.12, dorsal: 'small', lid: 0, seed: 37 },
];
function k7fish(ctx, P) {
  const F = K7FPAL[P.pal || 0], s = P.s || 1, dir = P.dir ?? 1, sq = P.sq ?? 1, roll = K.clamp(P.roll || 0), limp = K.clamp(P.limp || 0), puff = P.puff || 0;
  const L = F.L * sq, H = F.H / Math.sqrt(sq) * (1 + puff * 0.12), sw = (P.amp ?? 0.25) * Math.sin(P.ph || 0) * (1 - limp * 0.8), bend = (P.bend || 0);
  const cr = Math.cos(Math.PI * roll), vs = roll < 0.5 ? Math.max(0.7, cr) : -Math.max(0.7, -cr);
  let lid = P.lid; if (lid == null && LIFE.t != null && !P.noBlink && (P.eyes || 'open') === 'open') lid = Math.max(F.lid, blink(LIFE.t, F.seed + (P.seed || 0))); if (lid == null) lid = F.lid;
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha; ctx.translate(P.x, P.y); ctx.rotate((P.rot || 0) * Math.sign(dir || 1)); ctx.scale(dir * s, s);
  // centre line: bend (nose up/down), tail sweep, limp droop
  const cy = (u) => -bend * 26 * u * u * Math.sign(u) + (u < 0 ? (sw * 14 + limp * 10) * u * u : 0);
  const half = (u) => { const a = Math.sqrt(Math.max(0, 1 - u * u)), k = u > 0 ? 1 - F.nose * u * u : 1 - 0.45 * u * u; return H * a * k * (u > 0.2 && u < 0.85 ? 1 + puff * 0.25 * Math.sin(Math.PI * (u - 0.2) / 0.65) : 1); };
  const X = (u) => u * L / 2, top = [], bot = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; top.push([X(u), (cy(u) - half(u)) * vs]); bot.push([X(u), (cy(u) + half(u)) * vs]); }
  const body = top.concat(bot.reverse());
  const ink2 = P.silhouette ? C.black : null;
  // tail fin
  const ta = sw * 0.55 - limp * 0.5 * vs, tx = -L / 2 + 6, tyc = cy(-1) * vs, TL = F.L * 0.32, TH = F.H * 0.95;
  const rotp = (x, y) => [tx + (x - tx) * Math.cos(ta) - (y - tyc) * Math.sin(ta), tyc + (x - tx) * Math.sin(ta) + (y - tyc) * Math.cos(ta)];
  shape(ctx, [rotp(tx + 6, tyc - H * 0.3), rotp(tx - TL, tyc - TH), rotp(tx - TL * 0.62, tyc), rotp(tx - TL, tyc + TH), rotp(tx + 6, tyc + H * 0.3)], ink2 || F.fin, { lw: 5, seed: 3 });
  // dorsal fin (on the top edge; on the bottom when belly up)
  const dz = K.clamp(P.dorsal ?? 1) * (1 - limp * 0.6) * 0.8 + 0.2, d0 = -0.15, d1 = F.dorsal === 'small' ? 0.2 : 0.4, yA = (u) => (cy(u) - half(u)) * vs;
  const dp = F.dorsal === 'point' ? [[X(d0), yA(d0) + 4 * vs], [X(d0 + 0.05), yA(d0) - 46 * dz * vs], [X(d1), yA(d1) + 4 * vs]]
    : F.dorsal === 'fan' ? [[X(d0), yA(d0) + 4 * vs], ...[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((k) => [X(d0 + (d1 - d0) * k) - 10, yA(d0 + (d1 - d0) * k) - 36 * dz * vs * Math.sin(Math.PI * (k * 0.85 + 0.1))]), [X(d1), yA(d1) + 4 * vs]]
    : [[X(d0), yA(d0) + 4 * vs], [X(0.02), yA(0.02) - 20 * dz * vs], [X(d1), yA(d1) + 4 * vs]];
  shape(ctx, dp, ink2 || F.fin, { lw: 5, seed: 4 });
  // far pectoral (behind the body)
  // body
  shape(ctx, body, ink2 || F.body, { lw: 0 });
  if (!ink2) {
    ctx.save(); K.poly(ctx, body, true); ctx.clip();
    const bel = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; bel.push([X(u), (cy(u) + half(u) * 0.15) * vs]); } for (let i = 24; i >= 0; i--) { const u = -1 + i / 12; bel.push([X(u), (cy(u) + half(u) * 1.2) * vs]); }
    ctx.fillStyle = F.belly; K.poly(ctx, bel, true); ctx.fill();
    if (F.dotBelly) { ctx.fillStyle = dotPat(ctx, F.dot, 8, 0.3); K.poly(ctx, bel, true); ctx.fill(); }
    if (F.dotTop) { const tp = []; for (let i = 0; i <= 24; i++) { const u = -1 + i / 12; tp.push([X(u), (cy(u) - half(u) * 1.2) * vs]); } for (let i = 24; i >= 0; i--) { const u = -1 + i / 12; tp.push([X(u), (cy(u) - half(u) * 0.25) * vs]); } ctx.globalAlpha *= 0.7; ctx.fillStyle = dotPat(ctx, F.dot, 8, 0.32); K.poly(ctx, tp, true); ctx.fill(); }
    if (F.dotAll) { ctx.globalAlpha *= 0.55; ctx.fillStyle = dotPat(ctx, F.dot, 9, 0.28); ctx.fillRect(-L, -H * 2, L * 2, H * 4); }
    ctx.restore();
    // scales arcs and gill
    ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (const u of [-0.45, -0.2]) { ctx.beginPath(); ctx.arc(X(u), cy(u) * vs, half(u) * 0.35, -0.9, 0.9); ctx.stroke(); }
    ctx.lineWidth = 4.5; ctx.beginPath(); const gu = 0.42; ctx.moveTo(X(gu) - 4, (cy(gu) - half(gu) * 0.7) * vs); ctx.quadraticCurveTo(X(gu) + 10, cy(gu) * vs, X(gu) - 4, (cy(gu) + half(gu) * 0.7) * vs); ctx.stroke(); ctx.restore();
  }
  ink(ctx, body, 5.5, F.seed);
  // pectoral fin: rest points back-down; fin = 1 raises it forward-up (a hand); finPt stretches it forward; limp lets it hang
  const fu = 0.25, fx = X(fu), fy = (cy(fu) + half(fu) * 0.3) * vs, fin = P.fin ?? (0.25 * Math.sin((P.ph || 0) * 0.5)), fl = F.H * 0.9 * (1 + (P.finPt || 0) * 0.6);
  let fa = Math.PI - 0.5 + Math.max(0, fin) * 2.4 + Math.min(0, fin) * 0.3; fa = K.lerp(fa, Math.PI * 2 - 0.15, P.finPt || 0); fa = K.lerp(fa, Math.PI / 2 + 0.7, limp);
  ctx.save(); ctx.translate(fx, fy); ctx.scale(1, vs < 0 ? -1 : 1); ctx.rotate(fa);
  shape(ctx, [[0, -6], [fl * 0.55, -12], [fl, -4], [fl * 0.95, 6], [fl * 0.4, 9], [0, 6]], ink2 || F.fin, { lw: 4.5, seed: 6 }); ctx.restore();
  if (P.silhouette) { ctx.restore(); return; }
  // face (drawn upright even when belly up)
  const eu = P.pal === 2 ? 0.5 : 0.56, ex = X(eu), ey = (cy(eu) - half(eu) * 0.28) * vs - (vs < 0 ? 0 : 0), er = F.eye, eyes = P.eyes || 'open';
  if (eyes === 'shut' || lid >= 0.95) { ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); if (vs > 0) ctx.arc(ex, ey - 2, er * 0.75, 0.15 * Math.PI, 0.85 * Math.PI); else ctx.arc(ex, ey + 2, er * 0.75, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); ctx.restore(); }
  else if (eyes === 'x') { seg(ctx, ex - 8, ey - 8, ex + 8, ey + 8, 2, C.black, 1.5); seg(ctx, ex - 8, ey + 8, ex + 8, ey - 8, 2, C.black, 1.5); }
  else { const big = eyes === 'wide', rx = er * (big ? 1.2 : 1), ry = er * (big ? 1.32 : 1.1); shape(ctx, ell(ex, ey, rx, ry, 20), C.white, { lw: 4, seed: 2 });
    const g = P.gaze || [Math.sign(dir), 0], gl = Math.hypot(g[0], g[1]) || 1, gx = g[0] * dir / Math.max(1, gl), gy = g[1] / Math.max(1, gl), pr = er * (big ? 0.34 : 0.48), px = ex + gx * (rx - pr - 2), py = ey + gy * (ry - pr - 2);
    ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px + pr * 0.35, py - pr * 0.4, pr * 0.3, 0, 7); ctx.fill();
    if (lid > 0.02) { ctx.save(); K.poly(ctx, ell(ex, ey, rx, ry, 20), true); ctx.clip(); const ly = ey - ry + 2 * ry * lid; ctx.fillStyle = F.body; ctx.fillRect(ex - rx - 2, ey - ry - 2, rx * 2 + 4, ly - (ey - ry) + 2); ctx.strokeStyle = C.black; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - rx, ly); ctx.lineTo(ex + rx, ly); ctx.stroke(); ctx.restore(); }
    if (P.wet) { ctx.fillStyle = TEAR; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(ex - 2, ey + ry + 9, 4.5, 6.5, 0, 0, 7); ctx.fill(); ctx.stroke(); } }
  // brow: + angry (inner end low), - raised
  if (P.brow != null || P.pal === 1) { const b = P.brow || 0, bx0 = ex - er * 0.9, bx1 = ex + er * 0.9, by = ey - er * 1.25 - Math.max(0, -b) * 8 - (eyes === 'wide' ? 5 : 0);
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(bx0, by - b * 5); ctx.quadraticCurveTo(ex, by - 4 - Math.max(0, -b) * 6, bx1, by + b * 7); ctx.stroke(); ctx.restore(); }
  // mouth near the nose
  const mx = L / 2 - 10 - (P.pal === 2 ? 4 : 0), my = (cy(0.9) + half(0.9) * 0.25) * vs, m = P.talk > 0.05 ? (P.talk > 0.5 ? 'open' : 'o') : (P.mouth || (P.pal === 2 ? 'smile' : 'closed'));
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 4.5;
  if (m === 'o' || m === 'open') { const r = m === 'open' ? 9 : 6; shape(ctx, ell(mx, my + 2, r * 0.8, r, 12), '#5a1010', { lw: 3.5, seed: 7 }); }
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(mx - 9, my - 8, 12, 0.25 * Math.PI, 0.7 * Math.PI); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(mx - 9, my + 10, 11, 1.3 * Math.PI, 1.75 * Math.PI); ctx.stroke(); }
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(mx - 20, my + 2); ctx.quadraticCurveTo(mx - 8, my + 3, mx, my - 7); ctx.stroke(); }
  else if (m === 'grit') { ctx.beginPath(); ctx.moveTo(mx - 18, my); ctx.lineTo(mx, my); ctx.moveTo(mx - 18, my + 5); ctx.lineTo(mx, my + 5); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(mx - 16, my + 1); ctx.lineTo(mx, my); ctx.stroke(); }
  ctx.restore();
  if (puff > 0.2) { ctx.save(); ctx.globalAlpha *= puff * 0.6; ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(X(0.62), (cy(0.62) + half(0.62) * 0.3) * vs, 9, 0, 7); ctx.fill(); ctx.restore(); }
  ctx.restore();
}

// ---------- k7track: a swim track from keys and idle functions, with tail phase from distance and facing from velocity ----------
// items (time order): {t, at: [x, y]} keys (eased to the next item), {t, fn: (t) => [x, y]} free regions, {t, cut: true} (no distance across).
// optional {face: +-1} on an item forces the facing during its segment (backing away). Returns f(t) -> {x, y, dir, ph, amp, v, vx, vy, tip}.
function k7track(items, o = {}) {
  const pos = (t) => { let i = 0; while (i + 1 < items.length && items[i + 1].t <= t) i++; const it = items[i];
    if (it.fn) return it.fn(t); if (i + 1 >= items.length || items[i + 1].cut) return it.at;
    const nx = items[i + 1], target = nx.fn ? nx.fn(nx.t) : nx.at, u = K.clamp((t - it.t) / (nx.t - it.t)), e = K.ease[it.e || 'inOut'](u);
    return [K.lerp(it.at[0], target[0], e), K.lerp(it.at[1], target[1], e)]; };
  const T0 = items[0].t - 0.5, T1 = o.end ?? 172, dt = 1 / 60, N = Math.ceil((T1 - T0) / dt) + 2, dist = new Float32Array(N), turns = [[T0, o.dir0 ?? 1]];
  let face = o.dir0 ?? 1, prev = pos(T0);
  for (let k = 1; k < N; k++) { const t = T0 + k * dt, p = pos(t), dx = p[0] - prev[0], dy = p[1] - prev[1], d = Math.hypot(dx, dy); let i = 0; while (i + 1 < items.length && items[i + 1].t <= t) i++;
    dist[k] = dist[k - 1] + (d < 60 ? d : 0); const v = d / dt, forced = items[i].face;
    if (forced != null) { if (forced !== face) { turns.push([t, forced]); face = forced; } }
    else if (d < 60 && v > 25 && Math.abs(dx) > 0.45 * d && Math.sign(dx) !== face) { turns.push([t, Math.sign(dx)]); face = Math.sign(dx); }
    else if (d >= 60 && Math.abs(dx) > 0) { /* a cut: keep facing */ }
    prev = p; }
  const f = (t) => { const p = pos(t), k = K.clamp(Math.floor((t - T0) / dt), 0, N - 1), a = pos(t - 0.04), b = pos(t + 0.04), vx = (b[0] - a[0]) / 0.08, vy = (b[1] - a[1]) / 0.08, v = Math.hypot(vx, vy) < 1500 ? Math.hypot(vx, vy) : 0;
    const tf = turnFlip(t, turns, o.turn ?? 0.32), sp = Math.abs(vx) > 1 ? K.clamp(Math.atan2(vy, Math.abs(vx)) * 0.55, -0.5, 0.5) : 0;
    return { x: p[0], y: p[1], dir: tf.dir, ph: dist[k] / (o.stride ?? 34) * Math.PI + t * 2.4, amp: Math.max(o.idle ?? 0.25, K.clamp(v / 260)), v, vx, vy, tip: v > 30 ? sp : 0, sink: tf.sink }; };
  f.turns = turns; return f;
}
