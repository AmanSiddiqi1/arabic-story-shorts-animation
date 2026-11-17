// ===== AN-084 Ma'an and the Bedouin: story props and small helpers (cucumber, baskets, price tags, coins, money bag, throne, spear, bow, inset) =====
// Everything here is a pure function of its arguments. Names carry the an84 / AN84_ prefix so they never collide with the engine or Library.
const AN84_GREEN = '#3f9d4a', AN84_GREEND = '#2b7a38', AN84_WEAVE = '#c98a3a', AN84_WEAVED = '#7a4212', AN84_GOLD = '#e8a800';
const AN84_PRICES = [1000, 500, 300, 200, 100, 50, 30];
const AN84_TOTALS = [1000, 1500, 1800, 2000, 2100, 2150, 2180];

// ---------- tiny timing helpers ----------
const an84In = (t, a, b) => t >= a && t < b;
const an84E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const an84Env = (t, a, b, f = 0.2) => (t < a || t >= b ? 0 : K.clamp(Math.min((t - a) / f, (b - t) / f)));
const an84L2 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k)];
// gesture track: list of [t0, t1, target or fn(t)] blended over `rest` with eased ramps (the last active segment wins)
function an84Track(t, list, rest, f = 0.22) {
  let out = rest;
  for (const [a, b, tg, ff] of list) { const w = K.ease.inOut(an84Env(t, a, b, ff ?? f)); if (w > 0) { const T = typeof tg === 'function' ? tg(t) : tg; out = an84L2(out, T, w); } }
  return out;
}
const AN84_REST = { L: [-25, -58], R: [37, -58] };          // standing arms down
const AN84_REINS = { L: [34, -122], R: [52, -118] };        // riding: hands on the reins (rideOn default)
// world point of a body-local hand target for a seated rider (rideOn): seat {x, y, rot}, sg = facing sign, ps = rider scale
const an84RiderPt = (seat, sg, ps, hx, hy) => { const lx = sg * ps * hx, ly = ps * (hy + 75), c = Math.cos(seat.rot), s = Math.sin(seat.rot); return [seat.x + lx * c - ly * s, seat.y + lx * s + ly * c]; };
const an84RiderHead = (seat, sg, ps) => an84RiderPt(seat, sg, ps, 0, -192);

// ---------- cucumber, baskets ----------
function an84Cucumber(ctx, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, ell(0, 0, 36, 11, 22), AN84_GREEN, { lw: 3.5, seed: 41, dot: AN84_GREEND, pitch: 6, rad: 0.32, da: 0.7 });
  for (const dx of [-18, 0, 18]) { ctx.fillStyle = '#c9e6a0'; ctx.beginPath(); ctx.arc(dx, -4, 2.2, 0, 7); ctx.fill(); }
  shape(ctx, ell(37, -1, 5, 5, 10), C.yellow, { lw: 2.5, seed: 42 });
  ctx.restore();
}
// basket (x, y = bottom centre), 110 x 70 at s 1. o.fill 'cuc' (default) | 'coin' | 'empty'; o.n cucumbers; o.wob wobble of the top one
function an84Basket(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.fill === 'coin') { const r = K.rng(5); for (let i = 0; i < 11; i++) an84Coin(ctx, -44 + (i % 6) * 18 + (i > 5 ? 9 : 0), -74 - (i > 5 ? 13 : 2) - r() * 4, 10); }
  else if (o.fill !== 'empty') { const n = o.n ?? 6; for (let i = 0; i < n; i++) { const a = n > 1 ? i / (n - 1) : 0.5, top = i === Math.floor(n / 2); an84Cucumber(ctx, -34 + 68 * a, -72 - (i % 2 ? 14 : 4) - (top ? 12 : 0), 0.78, (i % 3 - 1) * 0.35 + (top ? o.wob || 0 : 0)); } }
  const body = [[-56, -72], [56, -72], [45, 0], [-45, 0], [-56, -72]];
  shape(ctx, body, AN84_WEAVE, { lw: 4.5, seed: 43, dot: AN84_WEAVED, pitch: 7, rad: 0.22, da: 0.45 });
  ctx.save(); K.poly(ctx, body, true); ctx.clip(); ctx.lineWidth = 3; ctx.strokeStyle = AN84_WEAVED; for (let yy = -58; yy < 0; yy += 14) { ctx.beginPath(); ctx.moveTo(-60, yy); ctx.lineTo(60, yy); ctx.stroke(); } ctx.restore();
  shape(ctx, K.rectPts(-60, -80, 120, 12), C.yellow, { lw: 4, seed: 44 });
  if (o.handle) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(0, -80, 48, 46, 0, Math.PI, 0); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = AN84_WEAVE; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// pannier on the donkey's near flank: hangs below the seat point, strap over the back
function an84Pannier(ctx, seat, dir, s, o = {}) {
  const bx = seat.x - dir * 62 * s, by = seat.y + 92 * s;
  seg(ctx, seat.x - dir * 30 * s, seat.y + 4 * s, bx, by - 70 * s, 7 * s, C.red, 2.5);
  an84Basket(ctx, bx, by, 0.82 * s, o);
}

// ---------- coins, pile, money bag ----------
function an84Coin(ctx, x, y, r = 12, sx = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), C.yellow, { lw: Math.max(2.5, r * 0.25), seed: 47 });
  ctx.lineWidth = Math.max(1.5, r * 0.14); ctx.strokeStyle = AN84_GOLD; ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.stroke(); ctx.restore();
}
// coin mound on the floor, (x, y) = base centre, fill 0..1 -> 260 x 120 at full
function an84CoinPile(ctx, x, y, fill) {
  if (fill <= 0.01) return; const w = 130 * Math.sqrt(fill), h = 120 * fill, pts = [[x - w, y]];
  for (let i = 1; i < 12; i++) { const a = i / 12; pts.push([x - w + 2 * w * a, y - h * Math.pow(Math.sin(Math.PI * a), 0.8) - (i % 2 ? 4 : 0) * fill]); }
  pts.push([x + w, y], [x - w, y]);
  shape(ctx, pts, C.yellow, { lw: 5, seed: 48, dot: C.red, pitch: 8, rad: 0.24, da: 0.55 });
  const r = K.rng(9), n = Math.round(4 + 14 * fill);
  for (let i = 0; i < n; i++) { const a = 0.1 + 0.8 * r(), yy = y - h * Math.pow(Math.sin(Math.PI * a), 0.8) * (0.25 + 0.7 * r()); an84Coin(ctx, x - w + 2 * w * a, yy, 9 + 3 * r(), 0.5 + 0.5 * r()); }
}
function an84Bag(ctx, x, y, s = 1, o = {}) {   // (x, y) bag bottom centre
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const pts = [[-36, 0], [-44, -30], [-30, -62], [-12, -72], [-20, -86], [20, -86], [12, -72], [30, -62], [44, -30], [36, 0], [-36, 0]];
  shape(ctx, pts, '#d9a441', { lw: 4.5, seed: 49, dot: AN84_WEAVED, pitch: 7, rad: 0.2, da: 0.4 });
  seg(ctx, -16, -74, 16, -74, 6, C.red, 2);
  shape(ctx, ell(0, -34, 17, 17, 16), C.yellow, { lw: 3.5, seed: 50 });
  ctx.font = K.font(24, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('D', 0, -32);
  ctx.restore();
}

// ---------- price tags (the ladder) ----------
// tag i (0 = 1000 .. 6 = 30): width and digit size shrink so the staircase shrinks visibly. Drawn in world units at o.s (default 0.55).
const an84TagSize = (i) => ({ w: K.lerp(230, 110, i / 6), fs: K.lerp(96, 60, i / 6) });
function an84Tag(ctx, x, y, i, o = {}) {   // (x, y) = centre
  const p = o.p ?? 1; if (p <= 0) return;
  const { w, fs } = an84TagSize(i), h = fs * 1.15, k = K.ease.back(K.clamp(p)), sc = (o.s ?? 0.55) * k;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(sc, sc);
  if (o.rays) { const rr = Math.max(w, h) * 0.75; for (let j = 0; j < 12; j++) { const a = j / 12 * Math.PI * 2 + 0.2; seg(ctx, Math.cos(a) * rr * 0.8, Math.sin(a) * rr * 0.62, Math.cos(a) * rr * (1.05 + 0.3 * o.rays), Math.sin(a) * rr * (0.8 + 0.25 * o.rays), 8, C.yellow, 3); } }
  const pts = [[-w / 2 + h * 0.32, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2 + h * 0.32, h / 2], [-w / 2, 0], [-w / 2 + h * 0.32, -h / 2]];
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; K.poly(ctx, pts.map(([a, b]) => [a + 8, b + 8]), true); ctx.fill();
  shape(ctx, pts, o.red ? C.red : C.yellow, { lw: o.red ? 9 : 6, seed: 50 + i, dot: o.red ? '#a8160f' : C.red, pitch: 9, rad: 0.18, da: 0.35 });
  shape(ctx, ell(-w / 2 + h * 0.3, 0, 8, 8, 12), C.paper, { lw: 3.5, seed: 57 });
  ctx.font = K.font(fs, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.lineWidth = fs * 0.14; ctx.strokeStyle = o.red ? C.black : C.white; ctx.strokeText(String(AN84_PRICES[i]), h * 0.14, fs * 0.05);
  ctx.fillStyle = o.red ? C.white : C.black; ctx.fillText(String(AN84_PRICES[i]), h * 0.14, fs * 0.05);
  if (o.sub) { ctx.font = K.font(fs * 0.34, BF, 400); ctx.fillStyle = C.black; ctx.fillText(o.sub, h * 0.14, h / 2 + fs * 0.28); }
  const sk = K.clamp(o.strike || 0); if (sk > 0) { const x0 = -w / 2 - 6, y0 = h / 2 + 4, x1 = w / 2 + 6, y1 = -h / 2 - 4; seg(ctx, x0, y0, K.lerp(x0, x1, sk), K.lerp(y0, y1, sk), 16, C.red, 4); }
  ctx.restore();
}
// ladder state of tag i: pops[i] = pop time, strike at pops[i + 1]; unstrike / drop handled by the scene
function an84TagState(t, pops, i, o = {}) {
  const tp = pops[i]; if (t < tp) return null;
  const st = { p: K.clamp((t - tp) / 0.32), strike: 0, drop: 0, alpha: 1, rays: i === 0 ? Math.max(0, 1 - (t - tp) / 0.6) : 0 };
  const ts = pops[i + 1]; if (ts != null && t >= ts - 0.12) { const u = K.clamp((t - ts + 0.12) / 0.14); st.strike = u; const v = K.ease.out(K.clamp((t - ts) / 0.3)); st.drop = 20 * v; st.alpha = 1 - 0.55 * v; }
  if (o.wobble && an84In(t, o.wobble, o.wobble + 0.6)) st.rot = 0.12 * Math.sin((t - o.wobble) * 30) * (1 - (t - o.wobble) / 0.6);
  return st;
}

// ---------- throne (own copy of the palaceHall throne so it can tip back) ----------
// base = dais top (the film uses a raised dais, top 800): seat top base - 60 (a person with sit 1, seat 'bench' at y base - 12), back top base - 340
function an84ThroneBack(ctx, x, base = 800) {
  const seat = base - 60, back = base - 340;
  shape(ctx, [[x - 80, seat], [x - 84, back + 60], [x - 50, back + 14], [x, back], [x + 50, back + 14], [x + 84, back + 60], [x + 80, seat]], C.yellow, { lw: 7, seed: 218, dot: C.red, pitch: 9, rad: 0.22, da: 0.5 });
  shape(ctx, townArchPts(x - 46, x + 46, back + 40, seat - 10, 'pointed'), C.blue, { lw: 5, seed: 219, dot: '#3f7be6', pitch: 8, rad: 0.25, da: 0.5 });
  shape(ctx, ell(x, back - 14, 13, 13, 14), C.yellow, { lw: 4, seed: 222 });
  shape(ctx, K.rectPts(x - 96, seat, 192, 22), C.red, { lw: 5, seed: 220 });
  for (const sd of [-1, 1]) seg(ctx, x + sd * 80, seat + 22, x + sd * 80, base, 10, C.yellow, 3);
}
function an84ThroneArms(ctx, x, base = 800) { for (const sd of [-1, 1]) shape(ctx, K.rectPts(x + sd * 96 - (sd > 0 ? 22 : 0), base - 110, 22, 72), C.yellow, { lw: 5, seed: 221 }); }

// ---------- guard's spear, hunter's bow ----------
function an84Spear(ctx, x, y, h = 250, rot = 0, tassel = 0) {   // (x, y) butt on the floor
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  seg(ctx, 0, 0, 0, -h, 7, C.black, 0);
  shape(ctx, [[0, -h - 46], [10, -h - 14], [0, -h], [-10, -h - 14], [0, -h - 46]], C.yellow, { lw: 3.5, seed: 58 });
  seg(ctx, 0, -h + 4, 4 + tassel * 6, -h + 30, 8, C.red, 2);
  ctx.restore();
}
function an84Bow(ctx, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.lineWidth = 11; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(-40, 0, 64, -1.0, 1.0); ctx.stroke();
  ctx.lineWidth = 6; ctx.strokeStyle = AN84_WEAVE; ctx.stroke();
  ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-40 + 64 * Math.cos(-1), 64 * Math.sin(-1)); ctx.lineTo(-40 + 64 * Math.cos(1), 64 * Math.sin(1)); ctx.stroke();
  ctx.restore();
}
// round inset panel (panel units): paper disc, black brush ring, inner(ctx) drawn clipped with the origin at the centre
function an84Inset(ctx, cx, cy, r, p, inner) {
  const rr = r * K.ease.back(K.clamp(p)); if (rr < 2) return;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fillStyle = C.paper; ctx.fill(); ctx.clip(); ctx.translate(cx, cy); ctx.scale(rr / r, rr / r); inner(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke(); ctx.restore();
}
// sparkle tick (a 4-point glint)
function an84Glint(ctx, x, y, r, p) { if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p) * r; ctx.save(); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y - k); ctx.lineTo(x + k * 0.22, y - k * 0.22); ctx.lineTo(x + k, y); ctx.lineTo(x + k * 0.22, y + k * 0.22); ctx.lineTo(x, y + k); ctx.lineTo(x - k * 0.22, y + k * 0.22); ctx.lineTo(x - k, y); ctx.lineTo(x - k * 0.22, y - k * 0.22); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
// sweat drop
function an84Sweat(ctx, x, y, p) { if (p <= 0 || p >= 1) return; const yy = y + 34 * p; ctx.save(); ctx.globalAlpha = Math.min(1, (1 - p) * 3);
  shape(ctx, [[x, yy - 14], [x + 8, yy], [x, yy + 7], [x - 8, yy], [x, yy - 14]], '#9cc4ff', { lw: 3, seed: 59 }); ctx.restore(); }
