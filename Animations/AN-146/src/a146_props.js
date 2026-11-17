// ===== AN-146 props and story drawings: clothBale, cloakProp, candle, ledger, keyRing, coin, portraitMedallion, iconBalloon,
// guard helmet + lantern, night overlay with light holes, harbourQuay strip, storeroom cutaway. World units, ground y 900. =====
const A146_BALE = { red: [C.red, '#a8160f'], blue: [C.blue, NAVY], yellow: [C.yellow, '#e8742a'], green: ['#3f9d4a', '#2b7a38'] };
const A146_ROPE = '#c9a46a', A146_ROPED = '#7a4212', A146_SILVER = '#d6dbe6', A146_WAX = '#fff3d6';

// clothBale(ctx, x, y, o): a tied bale of cloth, 150 x 105 at s 1, origin at the bottom centre.
//   o: {col: 'red' | 'blue' | 'yellow' | 'green', s, sq (squash 1 = none), rot, knot (bow knot with the yellow tassel), tassel (swing angle),
//       ghost (dashed outline only), alpha, tick 0..1 (a check mark pops on it), noTassel}
function a146Bale(ctx, x, y, o = {}) {
  const s = o.s ?? 1, sq = o.sq ?? 1, w = 150, h = 105, [c0, c1] = A146_BALE[o.col || 'red'];
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (1 + (1 - sq) * 0.6), s * sq); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const body = [[-w / 2 + 8, 0], [-w / 2, -14], [-w / 2 + 2, -h + 16], [-w / 2 + 14, -h], [w / 2 - 14, -h], [w / 2 - 2, -h + 16], [w / 2, -14], [w / 2 - 8, 0], [-w / 2 + 8, 0]];
  if (o.ghost) { ctx.save(); ctx.setLineDash([14, 10]); ctx.lineWidth = 6; ctx.strokeStyle = o.ghostCol || C.black; K.poly(ctx, body, true); ctx.stroke(); ctx.restore(); ctx.restore(); return; }
  shape(ctx, body, c0, { lw: 5, seed: 300, dot: c1, pitch: 9, rad: 0.24, da: 0.55 });
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(20,20,20,0.45)'; for (const fy of [-0.3, -0.55, -0.78]) { ctx.beginPath(); ctx.moveTo(-w / 2 + 6, h * fy); ctx.quadraticCurveTo(0, h * fy - 6, w / 2 - 6, h * fy); ctx.stroke(); } ctx.restore();
  for (const bx of [-40, 40]) seg(ctx, bx, -h + 2, bx + 2, -2, 9, A146_ROPE, 3);
  seg(ctx, -w / 2 + 2, -h * 0.52, w / 2 - 2, -h * 0.52, 8, A146_ROPE, 3);
  if (o.knot) { const kx = 40, ky = -h * 0.52;   // bow knot where the bands cross, the yellow tassel hanging from it
    for (const sd of [-1, 1]) shape(ctx, [[kx, ky], [kx + sd * 24, ky - 16], [kx + sd * 26, ky + 4], [kx, ky]], A146_ROPE, { lw: 3.5, seed: 301 });
    shape(ctx, ell(kx, ky, 8, 7, 10), A146_ROPED, { lw: 3, seed: 302 });
    if (!o.noTassel) { const a = o.tassel || 0; ctx.save(); ctx.translate(kx, ky + 4); ctx.rotate(a); seg(ctx, 0, 0, 0, 30, 4, A146_ROPED, 1.5);
      shape(ctx, [[-7, 28], [7, 28], [11, 56], [-11, 56], [-7, 28]], C.yellow, { lw: 3, seed: 303, dot: C.red, pitch: 5, rad: 0.2, da: 0.4 }); ctx.restore(); } }
  if (o.tick > 0) { const k = K.ease.back(K.clamp(o.tick)); ctx.save(); ctx.translate(0, -h - 30); ctx.scale(k, k); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.lineWidth = 22; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-6, 18); ctx.lineTo(26, -22); ctx.stroke(); ctx.lineWidth = 12; ctx.strokeStyle = '#5fd05a'; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// the shop's four bales: fixed colours and order (red, blue below; green top left, yellow with the knot top right). x = stack centre, y = floor.
//   o: {s, sq: [4], tassel, ghost, tick: [4], only: [indices]}; returns the four bale bottom centres (order red, blue, yellow, green)
function a146Stack(ctx, x, y, o = {}) {
  const s = o.s ?? 1, pos = [[x - 78 * s, y], [x + 78 * s, y], [x + 76 * s, y - 103 * s], [x - 70 * s, y - 103 * s]], cols = ['red', 'blue', 'yellow', 'green'];
  pos.forEach((p, i) => { if (o.only && !o.only.includes(i)) return; a146Bale(ctx, p[0], p[1], { col: cols[i], s, sq: o.sq ? o.sq[i] : 1, knot: i === 2, tassel: o.tassel, ghost: o.ghost, tick: o.tick ? o.tick[i] : 0, noTassel: o.noTassel, rot: i === 3 ? 0.03 : i === 2 ? -0.02 : 0 }); });
  return pos;
}
// four bales on a camel drawn at mountSeat: far pair as tops above the hump, near pair on the flank. P = the camel fields.
function a146CamelLoad(ctx, P, n = 4, o = {}) {
  const st = mountSeat('camel', P), sd = Math.sign(P.dir ?? 1), s = (P.s || 1) * 0.66, land = o.land || [];
  ctx.save(); ctx.translate(st.x, st.y); ctx.rotate(st.rot);
  const spots = [[-58 * sd, 6, 'red'], [58 * sd, 6, 'blue'], [-46 * sd, -58, 'yellow'], [56 * sd, -58, 'green']];
  for (let i = 0; i < Math.min(n, 4); i++) { const [bx, by, col] = spots[i], d = land[i] != null ? landSquash(o.t, land[i], 0.2, 12) : 1;
    a146Bale(ctx, bx, by + 40 * s, { col, s, sq: d, knot: i === 2, tassel: o.tassel || 0, tick: o.ticks ? K.clamp((o.t - o.ticks[i]) / 0.3) * (o.t >= o.ticks[i] ? 1 : 0) : 0 }); }
  if (n > 0) seg(ctx, -100 * s, -10, 100 * s, -10, 6, A146_ROPED, 2);
  ctx.restore(); return st;
}

// cloakProp: the thief's red cloak as a loose cloth. Top edge centred at (x, y), top width tw, hem width bw, length h, rot about the top.
//   o: {tw, bw, h, rot, wave (hem ripple 0..1), t, alpha}
function a146Cloak(ctx, x, y, o = {}) {
  const tw = o.tw ?? 80, bw = o.bw ?? 170, h = o.h ?? 170, t = o.t || 0, wv = o.wave ?? 0.4, pts = [[-tw / 2, 0], [tw / 2, 0]];
  for (let i = 0; i <= 8; i++) { const f = i / 8, hx = K.lerp(bw / 2, -bw / 2, f), hy = h + Math.sin(f * Math.PI * 4 + t * 7) * 9 * wv; pts.push([hx, hy]); }
  pts.push([-tw / 2, 0]);
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  shape(ctx, pts, C.red, { lw: 5, seed: 310, dot: '#8a1410', pitch: 9, rad: 0.25, da: 0.5 });
  ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(20,20,20,0.55)'; for (const f of [-0.25, 0.08, 0.32]) { ctx.beginPath(); ctx.moveTo(f * tw, 6); ctx.lineTo(f * bw * 1.05, h - 14); ctx.stroke(); } ctx.restore();
  seg(ctx, -tw / 2, 2, tw / 2, 2, 7, C.yellow, 2.5);
  ctx.restore();
}
// the cloak draped over the 2 x 2 stack (centre x, floor y, s): a red mound; lift 0..1 folds the left flap back to show the left column
// (red bale and the yellow bale with the knot). sq squashes it with the taps.
function a146CloakDrape(ctx, x, y, s = 1, lift = 0, t = 0, sq = 1) {
  const top = y - 214 * s * sq, hem = y - 34 * s, L = K.ease.inOut(K.clamp(lift)), fo = { lw: 5, seed: 311, dot: '#8a1410', pitch: 9, rad: 0.25, da: 0.5 };
  const right = [[x - 6 * s, top - 4], [x + 60 * s, top - 8], [x + 150 * s, top + 22 * s], [x + 166 * s, hem - 20 * s]];
  const L2 = K.clamp(L * 1.6 - 0.6), rh = K.lerp(hem, top + 30 * s, L2); right[3] = [x + 166 * s, Math.min(hem - 20 * s, rh - 10 * s)];
  for (let i = 0; i <= 6; i++) { const f = i / 6; right.push([K.lerp(x + 168 * s, x - 6 * s, f), rh + Math.sin(f * 7 + 1) * 7 * s]); }
  right.push(right[0]); shape(ctx, right, C.red, fo);
  const fb = K.lerp(hem, top + 26 * s, L), left = [[x - 6 * s, top - 4], [x - 70 * s, top - 6], [x - 150 * s, top + 24 * s + 20 * s * L], [x - 166 * s + 30 * s * L, fb - 18 * s]];
  for (let i = 0; i <= 6; i++) { const f = i / 6; left.push([K.lerp(x - 164 * s + 30 * s * L, x + 4 * s, f), K.lerp(fb, hem, f * (1 - L)) + Math.sin(f * 6 + 2) * 7 * s]); }
  left.push(left[0]); shape(ctx, left, C.red, { ...fo, seed: 312 });
  ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(20,20,20,0.5)'; for (const f of [0.35, 0.7, 1.05]) { ctx.beginPath(); ctx.moveTo(x + f * 120 * s, top + 16 * s); ctx.quadraticCurveTo(x + f * 140 * s, Math.min(y - 120 * s, rh - 20 * s), x + f * 150 * s, rh - 6 * s); ctx.stroke(); } ctx.restore();
  seg(ctx, x - 70 * s, top - 2, x + 60 * s, top - 6, 6, C.yellow, 2.5);
}
// candle on a small brass dish: o {lit 0..1, melt 0..1, s, t, drips (wax down the side), seed}. Returns the flame point.
function a146Candle(ctx, x, y, o = {}) {
  const s = o.s ?? 1, m = K.clamp(o.melt || 0), h = 64 * (1 - m * 0.85), t = o.t || 0, sd = o.seed || 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-30, 0], [30, 0], [24, -10], [-24, -10], [-30, 0]], '#d9a441', { lw: 4, seed: 320 });
  if (m > 0.05) shape(ctx, ell(0, -10, 14 + m * 22, 5 + m * 3, 14), A146_WAX, { lw: 3, seed: 321 });
  shape(ctx, [[-10, -10], [10, -10], [10, -10 - h], [3, -12 - h], [-10, -8 - h], [-10, -10]], A146_WAX, { lw: 4, seed: 322 });
  if (m > 0.2) shape(ctx, [[10, -h * 0.6 - 10], [16, -h * 0.4 - 10], [12, -12], [8, -h * 0.4 - 10]], A146_WAX, { lw: 2.5, seed: 323 });
  seg(ctx, 0, -10 - h, 0, -20 - h, 3, C.black, 0);
  const lit = K.clamp(o.lit ?? 0), fp = [x, y + (-24 - h) * s];
  if (lit > 0) { const fl = 1 + 0.12 * Math.sin(t * 23 + sd) + 0.08 * Math.sin(t * 37 + sd * 2), fh = 26 * lit * fl;
    shape(ctx, [[0, -20 - h - fh], [8 * lit, -14 - h - fh * 0.3], [0, -10 - h], [-8 * lit, -14 - h - fh * 0.3], [0, -20 - h - fh]], C.yellow, { lw: 3, seed: 324 });
    shape(ctx, ell(0, -16 - h - fh * 0.2, 3 * lit, 6 * lit, 10), C.red, { lw: 0 }); }
  ctx.restore(); return fp;
}
// warm light glow around a point (draw after the dark overlay so the flame halo reads)
function a146Glow(ctx, x, y, r, a = 0.35) { if (r <= 0 || a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.36); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); }

// ledger: an account book. o {open 0..1, s, rot, flip (a page turning 0..1), col}
function a146Ledger(ctx, x, y, o = {}) {
  const s = o.s ?? 1, op = K.clamp(o.open ?? 0), col = o.col || C.red;
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  if (op < 0.5) { shape(ctx, K.rectPts(-35, -25, 70, 50), col, { lw: 4, seed: 330, dot: C.black, pitch: 7, rad: 0.15, da: 0.3 }); seg(ctx, -35, -25, -35, 25, 8, '#7a4212', 2); ctx.restore(); return; }
  for (const sd of [-1, 1]) { const pg = sd < 0 ? [[0, -20], [-60, -26], [-62, 22], [0, 26]] : [[0, -20], [60, -26], [62, 22], [0, 26]];
    shape(ctx, [[0, -16], [sd * 64, -22], [sd * 66, 28], [0, 30], [0, -16]], col, { lw: 3.5, seed: 331 });
    shape(ctx, pg.concat([pg[0]]), C.white, { lw: 3.5, seed: 332 });
    ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; for (let k = 0; k < 4; k++) { const ly = -12 + k * 10; ctx.beginPath(); ctx.moveTo(sd * 8, ly); ctx.lineTo(sd * 50, ly - 2); ctx.stroke(); }
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(sd * (14 + k * 7), 12); ctx.lineTo(sd * (12 + k * 7), 22); ctx.stroke(); } ctx.restore(); }
  if (o.flip > 0 && o.flip < 1) { const f = o.flip, px = 60 * Math.cos(Math.PI * f); shape(ctx, [[0, -20], [px, -26 - 10 * Math.sin(Math.PI * f)], [px, 22 - 10 * Math.sin(Math.PI * f)], [0, 26], [0, -20]], C.white, { lw: 3, seed: 333 }); }
  ctx.restore();
}
// key ring: ring r 14 with three keys 34 long that swing (sw radians). o {s, sw, glint 0..1}
function a146Keys(ctx, x, y, o = {}) {
  const s = o.s ?? 1, sw = o.sw || 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(sw);
  ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 12, 14, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#d9a441'; ctx.stroke(); ctx.restore();
  [-0.5, 0, 0.45].forEach((a, i) => { ctx.save(); ctx.translate(0, 24); ctx.rotate(a + sw * (0.4 + i * 0.3)); seg(ctx, 0, 0, 0, 34, 6, i === 1 ? A146_SILVER : '#d9a441', 2.5);
    shape(ctx, [[0, 26], [10, 26], [10, 32], [5, 32], [5, 36], [0, 36]], i === 1 ? A146_SILVER : '#d9a441', { lw: 2.5, seed: 340 + i }); ctx.restore(); });
  if (o.glint > 0) star(ctx, 14, 52, 16 * o.glint, C.white);
  ctx.restore();
}
// a silver coin (dirham), spin = rotation phase (x scale |cos|)
function a146Coin(ctx, x, y, r = 12, spin = 0, glint = 0) {
  const k = Math.max(0.15, Math.abs(Math.cos(spin)));
  shape(ctx, ell(x, y, r * k, r, 16), A146_SILVER, { lw: 3.5, seed: 350 }); if (k > 0.5) shape(ctx, ell(x, y, r * k * 0.55, r * 0.55, 12), '#b9bfcf', { lw: 2, seed: 351 });
  if (glint > 0) star(ctx, x + r * 0.6, y - r * 0.6, r * 1.2 * glint, C.white);
}
// a coin flying from a to b over [t0, t0 + d] on a parabola with spin; returns the position or null
function a146CoinFly(ctx, t, t0, d, a, b, h = 90, r = 12) {
  if (t < t0 || t > t0 + d) return null; const u = (t - t0) / d, x = K.lerp(a[0], b[0], u), y = K.lerp(a[1], b[1], u) - h * Math.sin(Math.PI * u);
  a146Coin(ctx, x, y, r, u * 14); return [x, y];
}
// portraitMedallion: the real merchant's head in a yellow-rimmed disc; o {gaze, lid, p (pop 0..1)}
function a146Portrait(ctx, x, y, r, o = {}) {
  const k = K.ease.back(K.clamp(o.p ?? 1)); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  shape(ctx, ell(0, 0, r + 12, r + 12, 30), C.yellow, { lw: 6, seed: 360, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, 0, r, r, 30), '#bfe0ff', { lw: 4, seed: 361 });
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.clip();
  const s = r / 70; person(ctx, { x: 0, y: 190 * s * 1.0 + 40 * s, s: s * 1.05, costume: 'merchant', gaze: o.gaze || [0, 0.1], lid: o.lid || 0, mouth: 'smile', noBlink: true, seed: 5 });
  ctx.restore(); ctx.restore();
}
// a picture balloon: rounded box (cx, cy, w, h) with a tail to `tail`, p pop; cells [{p, draw(c)}] laid out left to right (drawn at cell centres)
function a146Balloon(ctx, cx, cy, w, h, tail, p, cells = [], o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = ell(0, 0, w / 2, h / 2, 40);
  if (tail) { const tx = (tail[0] - cx) / k, ty = (tail[1] - cy) / k, a = Math.atan2(ty, tx), b0 = [Math.cos(a - 0.25) * w * 0.38, Math.sin(a - 0.25) * h * 0.38], b1 = [Math.cos(a + 0.25) * w * 0.38, Math.sin(a + 0.25) * h * 0.38];
    shape(ctx, [b0, [tx, ty], b1, b0], o.bg || C.white, { lw: 5, seed: 371 }); }
  shape(ctx, pts, o.bg || C.white, { lw: 6, seed: 370 });
  const n = cells.length; cells.forEach((cl, i) => { const q = K.ease.back(K.clamp(cl.p ?? 1)); if (q <= 0) return; ctx.save(); ctx.translate((i - (n - 1) / 2) * (w * 0.8 / n), 0); ctx.scale(q, q); cl.draw(ctx); ctx.restore(); });
  ctx.restore();
}
// the watchman's guard kit: pointed helmet with neck cloth on the head point (hd = head centre in world), s = figure scale
function a146Helmet(ctx, hd, s, o = {}) {
  const [hx, hy] = hd, dy = o.lag || 0; ctx.save(); ctx.translate(hx, hy - dy); ctx.scale(s, s); if (o.tilt) ctx.rotate(o.tilt);
  shape(ctx, [[-40, -18], [40, -18], [44, -6], [-44, -6], [-40, -18]], C.yellow, { lw: 4, seed: 380 });
  shape(ctx, [[-36, -18], [-30, -44], [-12, -62], [0, -82], [12, -62], [30, -44], [36, -18], [-36, -18]], '#b9bfcf', { lw: 5, seed: 381, dot: '#6f7a96', pitch: 7, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, -84, 7, 7, 10), C.red, { lw: 3, seed: 382 });
  ctx.restore();
}
// hand lantern hanging from a hand point
function a146Lantern(ctx, x, y, s = 1, t = 0, lit = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(0.06 * Math.sin(t * 3.1));
  seg(ctx, 0, 0, 0, 14, 3, C.black, 0);
  shape(ctx, [[-14, 14], [14, 14], [18, 30], [14, 58], [-14, 58], [-18, 30], [-14, 14]], lit ? '#ffe680' : '#7a7a8a', { lw: 4, seed: 390 });
  for (const lx of [-6, 6]) seg(ctx, lx, 16, lx, 56, 2.5, C.black, 0);
  shape(ctx, [[-18, 58], [18, 58], [14, 66], [-14, 66], [-18, 58]], '#4a5878', { lw: 3, seed: 391 });
  if (lit) shape(ctx, ell(0, 38, 4, 8, 10), C.red, { lw: 0 });
  ctx.restore();
}
// night overlay: navy alpha a over rect r = [x, y, w, h] with soft stepped holes (circles [x, y, rad] or polygons {pts})
function a146Dark(ctx, a, r, holes = []) {
  if (a <= 0.001) return; const steps = [1, 0.8, 0.6];
  for (const k of steps) { ctx.save(); ctx.beginPath(); ctx.rect(r[0], r[1], r[2], r[3]);
    for (const h of holes) { if (h.pts) { const c = h.c || [0, 0], sc = 0.7 + 0.3 * k; h.pts.forEach((p, i) => { const px = c[0] + (p[0] - c[0]) * sc, py = c[1] + (p[1] - c[1]) * sc; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); }
      else { ctx.moveTo(h[0] + h[2] * k, h[1]); ctx.arc(h[0], h[1], h[2] * k, 0, Math.PI * 2); } }
    ctx.fillStyle = NAVY2; ctx.globalAlpha = 1 - Math.pow(1 - Math.min(0.97, a), 1 / steps.length); ctx.fill('evenodd'); ctx.restore(); }
}
// a small dust puff on the ground
const a146Dust = (ctx, x, y, t, t0, n = 5, seed = 1) => dustBurst(ctx, x, y, t - t0, n, 8, 18, 46, 0.6, seed);

// ---------- harbourQuay: strip 1800 x 1230, quay y 900: warehouse with arched double door at the left, quay stones, sea, bollards, moored dhow ----------
const A146_QUAY = { w: 1800, door: { x0: 300, x1: 520, top: 560, cx: 410 }, wall: [0, 700, 380], dhow: { x: 1450, deck: 760 }, plank: [[1200, 900], [1330, 772]], bollards: [800, 1120, 1700] };
function a146Quay(ctx, o = {}) {
  const Q = A146_QUAY, t = o.t || 0, camX = o.camX || 0, D = Q.door;
  townSky(ctx, 1800, { preset: 'day', hills: false });
  townBake(ctx, 'a146quay', 0, 300, 1800, 930, (c) => {
    // far shore and sea
    shape(c, [[600, 640], [800, 600], [1000, 625], [1300, 590], [1600, 615], [1810, 600], [1810, 650], [600, 650]], '#4a8f5a', { lw: 5, seed: 500, dot: '#2b7a38', pitch: 10, rad: 0.2, da: 0.4 });
    shape(c, [[560, 645], [1810, 645], [1810, 880], [560, 880]], '#2f7fe0', { lw: 6, seed: 501, dot: '#1d5bd0', pitch: 11, rad: 0.24, da: 0.6 });
    // quay: top surface and stone front
    shape(c, [[-10, 862], [1810, 862], [1810, 1240], [-10, 1240]], '#cdb68a', { lw: 7, seed: 502, dot: '#a8741a', pitch: 12, rad: 0.16, da: 0.35 });
    c.save(); c.lineWidth = 3.5; c.strokeStyle = 'rgba(20,20,20,0.5)'; for (const ry of [900, 960, 1040, 1140]) { c.beginPath(); c.moveTo(-10, ry); c.lineTo(1810, ry); c.stroke(); }
    for (let k = 0; k < 4; k++) { const y0 = [862, 900, 960, 1040][k], y1 = [900, 960, 1040, 1140][k], st = 90 + k * 30; for (let x = (k % 2) * st / 2; x < 1810; x += st) { c.beginPath(); c.moveTo(x, y0 + 3); c.lineTo(x, y1 - 3); c.stroke(); } } c.restore();
    // warehouse (stone, flat roof, beam ends), arched double doorway (the leaves are live)
    const holes = [townArchPts(D.x0, D.x1, D.top, 900, 'round')];
    townWall(c, [0, Q.wall[2], Q.wall[1], 900], holes, '#e8b25a', { dot: C.red, pitch: 13, rad: 0.18, da: 0.35 });
    ink(c, [[Q.wall[1], 900], [Q.wall[1], Q.wall[2]], [-10, Q.wall[2]]], 8, 503);
    shape(c, K.rectPts(-10, Q.wall[2] - 20, Q.wall[1] + 24, 28), '#a8541a', { lw: 5, seed: 504 }); for (let bx = 20; bx < Q.wall[1]; bx += 50) shape(c, ell(bx, Q.wall[2] + 22, 6, 6, 10), WOOD, { lw: 3, seed: 505 });
    ink(c, townArchPts(D.x0 - 14, D.x1 + 14, D.top - 14, 900, 'round').slice(1, -1), 10, 506);
    for (const wx of [80, 600]) townWindow(c, wx, 500, 70, 80, { arch: 'round', bars: true });
    shape(c, K.rectPts(150, 420, 120, 46), C.white, { lw: 4, seed: 507 }); c.font = K.font(34, BF, 400); c.textAlign = 'center'; c.fillStyle = C.black; c.fillText('STORE', 210, 456);
    // crates and sacks by the wall
    townProp(c, 'crate', 640, { w: 110, top: 800 }); townProp(c, 'sacks', 120, {});
  });
  // the live door leaves (double door: each leaf swings in)
  const op = K.clamp(o.door || 0), half = (D.x1 - D.x0) / 2;
  townDoor(ctx, D.x0, D.cx, D.top, 900, op, { arch: 'flat', leafOnly: false, inside: (c) => { c.fillStyle = '#0a1a4a'; c.fillRect(D.x0, D.top, half, 340); } });
  townDoor(ctx, D.cx, D.x1, D.top, 900, op, { arch: 'flat', hinge: 'right', inside: (c) => { c.fillStyle = '#0a1a4a'; c.fillRect(D.cx, D.top, half, 340); } });
  ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(D.cx, D.top + half, half, Math.PI, 0); ctx.stroke(); ctx.restore();
  // waves drift
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; for (let i = 0; i < 14; i++) { const wx = 600 + ((i * 97 + t * 18) % 1200), wy = 680 + (i % 5) * 38; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 14, wy - 8, wx + 28, wy); ctx.stroke(); } ctx.restore();
  a146Dhow(ctx, Q.dhow.x, Q.dhow.deck, t, o.sail ?? 0.5);
  // gangplank, bollards with mooring ropes
  seg(ctx, Q.plank[0][0], Q.plank[0][1] - 10, Q.plank[1][0], Q.plank[1][1], 14, WOOD, 4);
  for (const bx of Q.bollards) { shape(ctx, [[bx - 16, 900], [bx - 14, 856], [bx - 20, 846], [bx + 20, 846], [bx + 14, 856], [bx + 16, 900]], '#4a5878', { lw: 4, seed: 510 }); }
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = A146_ROPED; for (const [a, b] of [[[1120, 852], [1290, 790]], [[1700, 852], [1620, 790]]]) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo((a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 18, b[0], b[1]); ctx.stroke(); } ctx.restore();
  // gulls (doves) wheeling over the ship on a figure of eight
  for (let i = 0; i < 2; i++) { const a = t * 0.9 + i * 2.6, gx = 1450 + Math.sin(a) * 220, gy = 260 + Math.sin(a * 2) * 50; bird(ctx, { x: gx, y: gy, s: 0.5, kind: 'dove', pal: 0, fly: true, flap: Math.sin(t * 9 + i), dir: Math.cos(a) > 0 ? 1 : -1 }); }
}
// the moored dhow: hull on the water, lateen sail; billow 0..1
function a146Dhow(ctx, x, deck, t, billow = 0.5) {
  const hull = [[x - 230, deck], [x + 240, deck - 26], [x + 200, deck + 70], [x - 170, deck + 80], [x - 230, deck]];
  const sw = Math.sin(t * 1.3) * 6 * (0.6 + billow);
  seg(ctx, x - 10, deck, x - 10, deck - 470, 12, WOOD, 4);
  const yard = [[x - 200, deck - 140], [x + 150, deck - 500]], bel = 40 + 50 * billow + sw;
  shape(ctx, [yard[0], yard[1], [x + 120 + bel * 0.4, deck - 70], [x - 40 + bel, deck - 140 + bel * 0.3], yard[0]], C.white, { lw: 6, seed: 520, dot: '#d6d2e0', pitch: 9, rad: 0.25, da: 0.5 });
  seg(ctx, yard[0][0], yard[0][1], yard[1][0], yard[1][1], 9, WOOD, 3);
  shape(ctx, hull, '#a8541a', { lw: 7, seed: 521, dot: '#7a3a12', pitch: 10, rad: 0.2, da: 0.45 });
  seg(ctx, x - 226, deck + 14, x + 232, deck - 12, 6, C.yellow, 2); seg(ctx, x - 200, deck + 44, x + 214, deck + 26, 5, C.white, 1.5);
  shape(ctx, [[x + 236, deck - 26], [x + 270, deck - 70], [x + 254, deck - 20]], '#a8541a', { lw: 5, seed: 522 });
}

// ---------- storeroom cutaway: back wall with a doorway at the left (day light cone across the floor), crates, barrels, jars ----------
const A146_STORE = { door: { x0: 40, x1: 210, top: 540, cx: 125 } };
function a146Store(ctx, o = {}) {
  const D = A146_STORE.door, t = o.t || 0;
  ctx.fillStyle = '#2f7fe0'; ctx.fillRect(-20, -20, 1040, 1270);
  townBake(ctx, 'a146store', 0, 0, 1000, 1230, (c) => {
    const holes = [townArchPts(D.x0, D.x1, D.top, 900, 'round')];
    c.save(); K.poly(c, holes[0], true); c.clip(); c.fillStyle = '#7fb8ff'; c.fillRect(D.x0, D.top, 200, 400); shape(c, [[D.x0 - 10, 780], [D.x1 + 10, 760], [D.x1 + 10, 910], [D.x0 - 10, 910]], '#cdb68a', { lw: 4, seed: 530 }); shape(c, [[D.x0 - 10, 700], [D.x1 + 10, 690], [D.x1 + 10, 780], [D.x0 - 10, 790]], '#2f7fe0', { lw: 4, seed: 531 }); c.restore();
    townWall(c, [-10, 120, 1010, 900], holes, '#c98a3a', { dot: '#7a4212', pitch: 13, rad: 0.2, da: 0.4 });
    c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(20,20,20,0.35)'; for (let y = 200; y < 900; y += 70) { c.beginPath(); c.moveTo(D.x1 + 20, y); c.lineTo(1010, y); c.stroke(); } c.restore();
    ink(c, townArchPts(D.x0 - 12, D.x1 + 12, D.top - 12, 900, 'round').slice(1, -1), 9, 532);
    for (const bx of [-10, 1010]) seg(c, bx, 120, bx, 900, 30, BARKY, 4);
    shape(c, K.rectPts(-10, 120, 1020, 50), BARKY, { lw: 6, seed: 533 }); for (let bx = 60; bx < 1000; bx += 160) shape(c, K.rectPts(bx, 120, 34, 70), WOOD, { lw: 4, seed: 534 });
    shape(c, K.rectPts(-10, 898, 1020, 340), '#a8741a', { lw: 7, seed: 535, dot: '#7a4212', pitch: 11, rad: 0.18, da: 0.4 });
    c.save(); c.lineWidth = 3; c.strokeStyle = 'rgba(20,20,20,0.45)'; for (const ry of [960, 1050, 1160]) { c.beginPath(); c.moveTo(-10, ry); c.lineTo(1010, ry); c.stroke(); } c.restore();
    townProp(c, 'crate', 300, { w: 140, top: 790 }); townProp(c, 'barrel', 410, { top: 800 }); townProp(c, 'crate', 300, { w: 110, y: 790, top: 700 });
    townProp(c, 'pots', 930, {}); townProp(c, 'sacks', 960, { y: 900 });
    for (const [jx, jy] of [[620, 420], [700, 420], [780, 420]]) shape(c, [[jx - 16, jy], [jx - 22, jy - 36], [jx - 12, jy - 48], [jx + 12, jy - 48], [jx + 22, jy - 36], [jx + 16, jy]], '#e8742a', { lw: 4, seed: 536 });
    seg(c, 580, 424, 830, 424, 10, BARKY, 3.5);
  });
  return D;
}
// the day light cone from the storeroom doorway across the floor (drawn over the set, under the dark)
function a146StoreCone(D, reach = 1) { const r = K.lerp(300, 900, reach); return { pts: [[D.x0 + 6, D.top + 20], [D.x1 - 6, D.top + 20], [D.x1 + 30 + r * 0.55, 905], [D.x1 + r, 1230], [D.x0 - 20, 1230], [D.x0, 905]], c: [D.cx, 800] }; }
