// ===== AN-014 The Envious Man and the Envied: constants, helpers, props and effects =====
// View 1000 x 1230 (panel), floor y 900 in every set except the well world (1000 x 1600, shaft floor y 1500).
// Every drawing is a pure function of its arguments (and t).
const K14_VW = 1000, K14_VH = 1230, K14_GR = 900, K14_DUR = 173.0;   // plan: duration 170.003 + end_hold 3.0
const K14B = (t, a, d, e = 'out') => K.beat(t, a, d, e);
const k14Fade = (t, a, b, f = 0.25) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const k14Pop = (t, a, d = 0.3) => (t < a ? 0 : K.ease.back(K.clamp((t - a) / d)));
const k14In = (t, a, b) => t >= a && t < b;
const k14P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// piecewise linear keys (runs that must not ease at every key)
function k14Lin(t, keys) { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1] = keys[i]; return K.lerp(v0, v1, (t - t0) / (t1 - t0)); } return keys[keys.length - 1][1]; }
// a keyed x track -> walk fields (legs from distance, so feet never slide); cuts (huge speeds) give no stride
const k14X = (keys) => (t) => kfn(t, keys);
function k14Walk(P, xf, t, stride = 27) { const x = xf(t), v = (xf(t + 0.04) - xf(t - 0.04)) / 0.08; P.x = x; P.ph = x / (stride * (P.s || 1)); P.amp = Math.abs(v) > 2500 ? 0 : K.clamp(Math.abs(v) / 70); return P; }

// ---------- person anchors: figure-local point -> world (pose hip offset, lean, rot, acting sq + tip) ----------
function k14L2W(P, lx, ly) {
  const s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, hipY = -75, D = PEOPLE.dress(P), lean = (P.lean || 0) + D.age * 0.12 * (1 - K.clamp(P.lie || 0)), g = personPose(P, -1, 0), off = [g.hipC[0], g.hipC[1] - hipY];
  const dy = ly - hipY, c = Math.cos(lean), n = Math.sin(lean); [lx, ly] = [lx * c - dy * n + off[0], lx * n + dy * c + hipY + off[1]];
  let wx = lx * s * dir, wy = ly * s; if (P.rot) { const cr = Math.cos(P.rot), sr = Math.sin(P.rot); [wx, wy] = [wx * cr - wy * sr, wx * sr + wy * cr]; }
  const sq = P.sq ?? 1; wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  const tp = (P.tip || 0) * Math.sign(dir), cc = Math.cos(tp), nn = Math.sin(tp);
  return [P.x + wx * cc - wy * nn, P.y + wx * nn + wy * cc];
}
const k14HeadY = (P) => -195 + (P.drop || 0) + PEOPLE.dress(P).age * 6 - (P.child ? 9 : 0);
const k14Head = (P) => k14L2W(P, (P.look || 0) * 4, k14HeadY(P));
const k14Hand = (P, i) => (P.hands ? k14L2W(P, P.hands[i][0], P.hands[i][1]) : k14Head(P));
const k14HeadR = (P) => 37 * (P.s || 1) * (P.child ? 0.62 * 1.25 : 1);
// blink + gaze at a world point
function k14Life(P, t, seed, target) { if (!P.noBlink && P.eyes !== 'wide' && P.eyes !== 'shut') P.lid = Math.max(P.lid || 0, blink(t, seed)); if (target) P.gaze = lookAt(k14Head(P), target); return P; }
// draw a person and remember its hands (P.hands is set by the drawing)
function k14Person(ctx, P) { if (P.alpha === 0) return P; if (LIFE.t != null && P.lid == null && !P.noBlink && P.eyes !== 'shut' && P.eyes !== 'wide') P.lid = blink(LIFE.t, lifeSeed(P)); person(ctx, P); if (P.flush) k14Tint(ctx, P, C.red, 0.55 * P.flush, P.flush); if (P.tint) k14Tint(ctx, P, P.tint[0], P.tint[1], 1); if (P.pale) k14Tint(ctx, P, '#b9c2d6', 0.5 * P.pale, 1);
  if (P.horns) k14Horns(ctx, P); if (P.spiral) k14Spiral(ctx, P, P.spiral, P.spinT || 0); if (P.steam) { const h = k14Head(P); steam(ctx, h[0], h[1] - 50 * (P.s || 1), P.steam); } return P; }

// ---------- face effects (drawn over a finished person) ----------
// k14Tint: colour the face from the chin up (amount 0..1 of the head height): the envier's flush, the jinn's skins, the sick pallor
function k14Tint(ctx, P, col, alpha, amount) {
  if (alpha <= 0.01) return; const h = k14Head(P), r = k14HeadR(P), top = h[1] + r - 2 * r * K.clamp(amount);
  ctx.save(); ctx.beginPath(); ctx.ellipse(h[0], h[1], r * 0.97, r, 0, 0, 7); ctx.clip(); ctx.globalAlpha = alpha; ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = col; ctx.fillRect(h[0] - r - 2, top, 2 * r + 4, h[1] + r - top + 2); ctx.restore();
}
// spiral eyes (the possessed princess): white discs with a turning black spiral; spin = turns per second
function k14Spiral(ctx, P, a, spin) {
  const s = (P.s || 1), dir = P.dir || 1, hy = k14HeadY(P) - 4, look = (P.look || 0);
  for (const sd of [-1, 1]) { const e = k14L2W(P, look * 4 + sd * 13 + look * 3, hy), r = 12 * s; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(e[0], e[1], r, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke();
    ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40, an = u * Math.PI * 5 + spin * dir * sd, rr = u * r * 0.85; const px = e[0] + Math.cos(an) * rr, py = e[1] + Math.sin(an) * rr; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 2.6; ctx.stroke(); ctx.restore(); }
}
// two small curved horns on a jinn's head
function k14Horns(ctx, P) { const s = (P.s || 1) * (P.child ? 0.62 * 1.25 : 1);
  for (const sd of [-1, 1]) { const b = k14L2W(P, sd * 20, k14HeadY(P) - 26), tip = [b[0] + sd * 14 * s, b[1] - 34 * s]; shape(ctx, [[b[0] - 9 * s, b[1] + 4 * s], [b[0] + 9 * s, b[1] + 4 * s], [b[0] + sd * 12 * s, b[1] - 18 * s], tip, [b[0] - sd * 4 * s, b[1] - 14 * s]], C.yellow, { lw: 4, seed: 300 + sd }); } }

// ---------- props ----------
function k14Sandal(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, ell(0, 0, 26, 9, 16), '#a8741a', { lw: 4, seed: 310 }); seg(ctx, -6, -6, 8, -10, 5, '#6e4a10', 2); ctx.restore(); }
function k14Crown(ctx, x, y, s = 1, rot = 0, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (o.glow) { ctx.save(); ctx.globalAlpha = 0.35 * o.glow; ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.4); ctx.beginPath(); ctx.arc(0, -20, 70, 0, 7); ctx.fill(); ctx.restore(); }
  shape(ctx, [[-36, 0], [-38, -40], [-20, -18], [0, -48], [20, -18], [38, -40], [36, 0], [-36, 0]], C.yellow, { lw: 5, seed: 311, dot: C.red, pitch: 8, rad: 0.2, da: 0.5 });
  shape(ctx, ell(0, -12, 7, 7, 10), C.red, { lw: 3, seed: 312 }); for (const sx of [-24, 24]) shape(ctx, ell(sx, -12, 5, 5, 10), C.blue, { lw: 2.5, seed: 313 }); ctx.restore(); }
function k14Loaf(ctx, x, y, s = 1) { shape(ctx, ell(x, y, 26 * s, 13 * s, 16), '#d9a441', { lw: 4, seed: 314, dot: '#a8741a', pitch: 6, rad: 0.25, da: 0.5 }); for (const k of [-1, 0, 1]) seg(ctx, x + k * 10 * s - 3, y - 6 * s, x + k * 10 * s + 3, y + 2 * s, 3, '#7a4212', 0); }
function k14Purse(ctx, x, y, s = 1) { shape(ctx, [[x - 30 * s, y], [x - 34 * s, y - 34 * s], [x - 12 * s, y - 50 * s], [x + 12 * s, y - 50 * s], [x + 34 * s, y - 34 * s], [x + 30 * s, y]], C.red, { lw: 4.5, seed: 315, dot: '#a8160f', pitch: 7, rad: 0.25, da: 0.5 }); seg(ctx, x - 14 * s, y - 50 * s, x + 14 * s, y - 50 * s, 6, C.yellow, 2); for (const [cx, cy] of [[-8, -58], [6, -62], [16, -56]]) shape(ctx, ell(x + cx * s, y + cy * s, 8 * s, 5 * s, 10), C.yellow, { lw: 2.5, seed: 316 }); }
function k14Chest(ctx, x, y, s = 1) { shape(ctx, K.rectPts(x - 40 * s, y - 44 * s, 80 * s, 44 * s), WOOD, { lw: 4.5, seed: 317, dot: '#6e4a10', pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, [[x - 42 * s, y - 44 * s], [x - 36 * s, y - 62 * s], [x + 36 * s, y - 62 * s], [x + 42 * s, y - 44 * s]], '#c98a3a', { lw: 4.5, seed: 318 }); shape(ctx, K.rectPts(x - 7 * s, y - 50 * s, 14 * s, 16 * s), C.yellow, { lw: 3, seed: 319 }); }
function k14Robe(ctx, x, y, s = 1) { shape(ctx, [[x - 46 * s, y], [x - 50 * s, y - 22 * s], [x + 50 * s, y - 22 * s], [x + 46 * s, y]], C.blue, { lw: 4.5, seed: 320, dot: C.yellow, pitch: 8, rad: 0.22, da: 0.5 }); seg(ctx, x - 48 * s, y - 11 * s, x + 48 * s, y - 11 * s, 5, C.yellow, 0); }
function k14Bindle(ctx, hx, hy, ang, s = 1, sw = 0) { const ex = hx + Math.cos(ang) * 120 * s, ey = hy + Math.sin(ang) * 120 * s; seg(ctx, hx, hy, ex, ey, 8, '#a8741a', 3); ctx.save(); ctx.translate(ex, ey); ctx.rotate(sw); shape(ctx, ell(0, 26 * s, 30 * s, 26 * s, 18), C.red, { lw: 4.5, seed: 321, dot: C.white, pitch: 7, rad: 0.25, da: 0.5 }); shape(ctx, [[-8 * s, 2 * s], [8 * s, 2 * s], [0, -10 * s]], C.red, { lw: 3, seed: 322 }); ctx.restore(); }
function k14Broom(ctx, h, foot) { seg(ctx, h[0], h[1] - 20, foot[0], foot[1] - 30, 7, '#a8741a', 3); shape(ctx, [[foot[0] - 6, foot[1] - 34], [foot[0] + 6, foot[1] - 34], [foot[0] + 22, foot[1]], [foot[0] - 22, foot[1]]], '#f2d27a', { lw: 4, seed: 323 }); }
function k14Basket(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-40, -30], [40, -30], [30, 10], [-30, 10]], '#c98a3a', { lw: 4.5, seed: 324, dot: '#7a4212', pitch: 6, rad: 0.25, da: 0.5 }); ctx.restore(); }
// rubbish pile on the doorstep (amount 0..1 swept away)
function k14Rubbish(ctx, x, y, amt) { if (amt <= 0.02) return; const r = K.rng(77); for (let i = 0; i < 9; i++) { if (i / 9 > amt) continue; const px = x + (r() - 0.5) * 110 * amt, py = y - r() * 26 * amt, kind = i % 3;
  if (kind === 0) shape(ctx, ell(px, py, 14, 8, 10), '#7a4212', { lw: 3, seed: 330 + i }); else if (kind === 1) shape(ctx, [[px - 12, py], [px + 10, py - 14], [px + 16, py - 2]], C.white, { lw: 3, seed: 330 + i }); else seg(ctx, px - 14, py, px + 14, py - 6, 5, '#3f9d4a', 2); } }
// a fishbone of seven thin hairs between two hands / in a balloon
function k14Hairs(ctx, x, y, n, s = 1, o = {}) { for (let i = 0; i < n; i++) { const a = -0.6 + (i / 6) * 1.2; ctx.save(); ctx.lineWidth = 3.2 * s; ctx.strokeStyle = o.col || C.white; ctx.lineCap = 'round'; ctx.shadowColor = C.black; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.sin(a) * 20 * s, y - 30 * s, x + Math.sin(a) * 34 * s, y - 60 * s); ctx.stroke(); ctx.restore(); }
  if (o.flash) for (let i = 0; i < 3; i++) star(ctx, x + (i - 1) * 26 * s, y - 70 * s, 12 * s * o.flash, C.yellow, i); }
// small brazier: bowl on three legs; flare 0..1 jumps the flame
function k14Brazier(ctx, x, y, t, flare = 0, lit = 1) {
  for (const lx of [-22, 0, 22]) seg(ctx, x + lx * 0.6, y - 40, x + lx, y, 6, '#6e4a10', 2.5);
  if (lit > 0) { const h = (22 + 6 * Math.sin(t * 13)) * lit + 70 * flare; shape(ctx, [[x - 18, y - 52], [x - 10, y - 52 - h * 0.6], [x - 2, y - 52 - h * 0.45], [x + 4, y - 52 - h], [x + 10, y - 52 - h * 0.5], [x + 18, y - 52]], flare > 0.1 ? C.yellow : C.red, { lw: 4, seed: 340 }); if (flare > 0.1) shape(ctx, [[x - 8, y - 52], [x, y - 52 - h * 0.6], [x + 8, y - 52]], C.white, { lw: 3, seed: 341 }); }
  shape(ctx, [[x - 34, y - 58], [x + 34, y - 58], [x + 22, y - 36], [x - 22, y - 36]], '#c98a3a', { lw: 5, seed: 342, dot: '#7a4212', pitch: 7, rad: 0.2, da: 0.45 });
}
// standing lamp (vizier's place): flame 0..1 (0 = a thread of smoke)
function k14StandLamp(ctx, x, y, t, flame = 1) { seg(ctx, x, y, x, y - 150, 8, '#a8741a', 3); shape(ctx, [[x - 26, y], [x + 26, y], [x + 14, y - 12], [x - 14, y - 12]], '#a8741a', { lw: 4, seed: 343 }); shape(ctx, ell(x, y - 156, 22, 9, 14), C.yellow, { lw: 4, seed: 344, dot: C.red, pitch: 6, rad: 0.2, da: 0.4 });
  if (flame > 0.05) { const h = 26 * flame + 3 * Math.sin(t * 11); if (flame > 0.3) { ctx.save(); ctx.globalAlpha = 0.28 * flame; ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.4); ctx.beginPath(); ctx.arc(x, y - 180, 90, 0, 7); ctx.fill(); ctx.restore(); } shape(ctx, [[x - 8, y - 163], [x, y - 163 - h], [x + 8, y - 163]], C.red, { lw: 3, seed: 345 }); }
  else { ctx.save(); ctx.globalAlpha = 0.6; ctx.lineWidth = 4; ctx.strokeStyle = '#8c8a94'; ctx.beginPath(); ctx.moveTo(x, y - 165); for (let k = 1; k < 8; k++) ctx.lineTo(x + Math.sin(t * 3 + k) * 8, y - 165 - k * 12); ctx.stroke(); ctx.restore(); } }

// ---------- effects ----------
// the evil spirit: a dark coiled smoke wisp with a mean little face. c = centre, r = coil radius, ph = phase,
// o: {stretch: 0..1 (pulled up into a thin streak), lift (px up), alarm 0..1 (eyes wide), alpha, s}
function k14Wisp(ctx, cx, cy, t, o = {}) {
  const s = o.s ?? 1, st = K.clamp(o.stretch || 0), lift = o.lift || 0, r = (o.r ?? 70) * s * (1 - 0.6 * st), ph = t * 3.2, a = o.alpha ?? 1; if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; const pts = [];
  for (let k = 0; k < 22; k++) { const u = k / 21, an = ph + u * Math.PI * 2.6, rr = r * (0.55 + 0.45 * u), x = cx + Math.cos(an) * rr * (1 - st * 0.8), y = cy + Math.sin(an) * rr * 0.35 - st * u * 380 * s - lift; pts.push([x, y, 7 + 13 * u]); }
  for (const [x, y, rr] of pts) { ctx.beginPath(); ctx.arc(x, y, (rr + 4) * s, 0, 7); ctx.fillStyle = C.black; ctx.fill(); }
  for (const [x, y, rr] of pts) { ctx.beginPath(); ctx.arc(x, y, rr * s, 0, 7); ctx.fillStyle = '#2a1f4a'; ctx.fill(); }
  const [hx, hy] = pts[pts.length - 1], al = o.alarm || 0; ctx.fillStyle = '#4a3a7a'; ctx.beginPath(); ctx.arc(hx, hy, 18 * s, 0, 7); ctx.fill();
  for (const sd of [-1, 1]) { ctx.save(); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.ellipse(hx + sd * 7 * s, hy - 2 * s, (3.5 + 2 * al) * s, (4 + 3 * al) * s, 0, 0, 7); ctx.fill(); if (al < 0.5) { ctx.strokeStyle = C.yellow; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(hx + sd * 12 * s, hy - 10 * s); ctx.lineTo(hx + sd * 3 * s, hy - 6 * s); ctx.stroke(); } ctx.restore(); }
  ctx.strokeStyle = C.yellow; ctx.lineWidth = 2.5 * s; ctx.beginPath(); if (al > 0.5) ctx.arc(hx, hy + 8 * s, 4 * s, 0, 7); else { ctx.moveTo(hx - 6 * s, hy + 8 * s); ctx.lineTo(hx - 2 * s, hy + 5 * s); ctx.lineTo(hx + 2 * s, hy + 8 * s); ctx.lineTo(hx + 6 * s, hy + 5 * s); } ctx.stroke();
  ctx.restore();
}
// picture balloon: rounded box + pointer to (tx, ty); inside(c) draws in box-local units (0,0 = centre); p = pop progress
function k14Balloon(ctx, cx, cy, w, h, tx, ty, p, inside, o = {}) {
  if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = []; for (let i = 0; i < 40; i++) { const an = i / 40 * Math.PI * 2, c = Math.cos(an), s = Math.sin(an); pts.push([Math.sign(c) * Math.pow(Math.abs(c), 0.45) * w / 2, Math.sign(s) * Math.pow(Math.abs(s), 0.45) * h / 2]); }
  const dx = (tx - cx) / k, dy = (ty - cy) / k, tail = [[-14, h / 2 - 6], [dx, dy], [16, h / 2 - 6]];
  shape(ctx, tail, o.fill || C.white, { lw: 6, seed: 350 }); shape(ctx, pts.concat([pts[0]]), o.fill || C.white, { lw: 7, seed: 351 }); ctx.fillStyle = o.fill || C.white; ctx.beginPath(); ctx.moveTo(-12, h / 2 - 10); ctx.lineTo(14, h / 2 - 10); ctx.lineTo(0, h / 2 + 4); ctx.fill();
  if (inside) { ctx.save(); K.poly(ctx, pts, true); ctx.clip(); inside(ctx); ctx.restore(); }
  ctx.restore();
}
// small icons for the balloons (local units)
function k14IconPrincess(c, x, y, s, o = {}) { const P = { x, y: y + 150 * s, s: s * 0.75, costume: 'lady', pal: { robe: C.red, dot: '#a8160f' }, mouth: o.ill ? 'frown' : 'smile', lid: o.ill ? 0.3 : 0, tilt: o.ill ? 0.25 : 0, drop: o.ill ? 6 : 0, noBlink: true };
  person(c, P); if (o.ill) { k14Tint(c, P, '#b9c2d6', 0.6, 1); k14Spiral(c, P, 1, o.spin || 0); } const h = k14Head(P); k14Crown(c, h[0] + (o.ill ? 4 : 0), h[1] - 30 * s, s * 0.45, o.ill ? 0.25 : 0); }
function k14IconBowl(c, x, y, s, tick) { shape(c, [[x - 50 * s, y], [x + 50 * s, y], [x + 30 * s, y + 36 * s], [x - 30 * s, y + 36 * s]], C.white, { lw: 5, seed: 352, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 }); for (let i = 0; i < 3; i++) { k14Wave(c, x - 20 * s + i * 20 * s, y - 10 * s, s); } if (tick) k14Tick(c, x + 54 * s, y - 30 * s, s * tick); }
function k14Wave(c, x, y, s) { c.save(); c.lineWidth = 4; c.strokeStyle = '#8c8a94'; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 8 * s, y - 12 * s, x, y - 24 * s); c.stroke(); c.restore(); }
function k14Tick(c, x, y, s) { if (s <= 0) return; c.save(); c.lineWidth = 12 * s; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = C.black; c.beginPath(); c.moveTo(x - 22 * s, y); c.lineTo(x - 6 * s, y + 18 * s); c.lineTo(x + 26 * s, y - 22 * s); c.stroke(); c.lineWidth = 6 * s; c.strokeStyle = '#3f9d4a'; c.stroke(); c.restore(); }
// squiggle speech balloon (wordless talk)
function k14Squiggle(ctx, x, y, tx, ty, p) { if (p <= 0) return; k14Balloon(ctx, x, y, 90, 56, tx, ty, p, (c) => { c.lineWidth = 4; c.strokeStyle = C.black; c.beginPath(); for (let k = 0; k <= 12; k++) { const px = -32 + k * 5.3, py = Math.sin(k * 1.6) * 7; k ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke(); }); }
// white flash (2 frames) for impacts
function k14Flash(ctx, t, t0, d = 0.07) { if (t >= t0 && t < t0 + d) { ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = C.white; ctx.fillRect(0, 0, K14_VW, K14_VH); ctx.restore(); } }
// petals: seeded fall over [a, b], never inside the face boxes (faces: [[x, y, r]])
function k14Petals(ctx, t, a, b, faces = []) { if (t < a || t > b + 2) return; const r = K.rng(141); for (let i = 0; i < 26; i++) { const t0 = a + r() * (b - a), x0 = 80 + r() * 840, sp = 120 + r() * 80, u = t - t0; if (u < 0 || u > 4) continue; const x = x0 + Math.sin(u * 2 + i) * 30, y = 120 + u * sp; if (faces.some(([fx, fy, fr]) => Math.hypot(x - fx, y - fy) < fr)) continue; ctx.save(); ctx.globalAlpha = Math.min(1, (4 - u)); shape(ctx, ell(x, y, 10, 6, 10).map(([px, py]) => [x + (px - x) * Math.cos(u * 3 + i) - (py - y) * Math.sin(u * 3 + i), y + (px - x) * Math.sin(u * 3 + i) + (py - y) * Math.cos(u * 3 + i)]), i % 2 ? C.red : '#f07a8a', { lw: 2.5, seed: 360 + i }); ctx.restore(); } }
