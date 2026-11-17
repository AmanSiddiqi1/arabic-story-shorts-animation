// ===== AN-138 Yahya and the Poor Man: timing helpers, person frame, props and small effects (story drawings; see library_proposals.md) =====
const YP_SILVER = '#d8dde6', YP_SILVERD = '#8c93a3', YP_GREEN = '#3f9d4a', YP_GREEND = '#2b7a38', YP_BROWN = '#8a501a', YP_BROWND = '#5b3010';
const YP_BRASS = '#e8a800', YP_CLOTH = '#d9a441', YP_CLOTHD = '#8a5a1a', YP_FADED = '#b9a77a', YP_FADEDD = '#8a6a3a', YP_COLD = '#cfe0ff';

// ---------- timing ----------
const ypIn = (t, a, b) => t >= a && t < b;
const ypE = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const ypEnv = (t, a, b, f = 0.2) => (t < a || t >= b ? 0 : K.clamp(Math.min((t - a) / f, (b - t) / f)));
const ypL2 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k)];
// gesture track: [t0, t1, target | fn(t), fade] segments blended over `rest` (the last active one wins)
function ypTr(t, list, rest, f = 0.22) {
  let out = rest;
  for (const [a, b, tg, ff] of list) { const w = K.ease.inOut(ypEnv(t, a, b, ff ?? f)); if (w > 0) { const T = typeof tg === 'function' ? tg(t) : tg; out = out ? ypL2(out, T, w) : T; } }
  return out;
}
// value track: [t, v] keys held between (step with an eased ramp of d seconds)
const ypStep = (t, keys, d = 0.2) => { let v = keys[0][1]; for (let i = 1; i < keys.length; i++) { const [t0, v1] = keys[i]; if (t < t0) break; v = K.lerp(v, v1, ypE(t, t0, d)); } return v; };
// arc of a thrown thing: from a to b over [t0, t0 + d] with height h; returns [x, y] or null outside
function ypArc(t, t0, d, a, b, h = 60) { if (t < t0 || t > t0 + d) return null; const u = (t - t0) / d; return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - h * Math.sin(Math.PI * u)]; }
const ypRest = { L: [-25, -58], R: [37, -58] };

// ---------- person frame: the same transform chain as acting() + personCostumed() (upper body) ----------
function ypAge(P) { return P.age ?? (COSTUME[P.costume] || {}).age ?? 0.3; }
function ypM(P) {
  const s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, sq = P.sq ?? 1, tip = P.tip || 0, M = new DOMMatrix();
  M.translateSelf(P.x, P.y); if (tip) M.rotateSelf(tip * Math.sign(dir) * 180 / Math.PI); if (sq !== 1) M.scaleSelf(1 + (1 - sq) * 0.7, sq);
  if (P.rot) M.rotateSelf(P.rot * 180 / Math.PI); M.scaleSelf(dir * s, s);
  const hc = personPose(P, -1, 0).hipC; M.translateSelf(hc[0], hc[1] + 75);
  const lean = (P.lean || 0) + ypAge(P) * 0.12; M.translateSelf(0, -75); M.rotateSelf(lean * 180 / Math.PI); M.translateSelf(0, 75);
  return M;
}
const ypHdY = (P) => -195 + (P.drop || 0) + ypAge(P) * 6;
function ypPt(P, x, y) { const q = ypM(P).transformPoint({ x, y }); return [q.x, q.y]; }
const ypHead = (P) => ypPt(P, (P.look || 0) * 4, ypHdY(P));
function ypOnBody(ctx, P, fn) { ctx.save(); const M = ypM(P); ctx.transform(M.a, M.b, M.c, M.d, M.e, M.f); fn(ctx); ctx.restore(); }

// ---------- coins ----------
function ypCoin(ctx, x, y, r = 11, sx = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.12, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), YP_SILVER, { lw: Math.max(2.5, r * 0.24), seed: 601 });
  ctx.lineWidth = Math.max(1.4, r * 0.14); ctx.strokeStyle = YP_SILVERD; ctx.beginPath(); ctx.arc(0, 0, r * 0.58, 0, 7); ctx.stroke(); ctx.restore();
}
// a short stack of n coins, base centre (x, y)
function ypStack(ctx, x, y, n, r = 14) {
  for (let i = 0; i < n; i++) { const yy = y - i * r * 0.42; shape(ctx, ell(x, yy, r, r * 0.38, 16), i === n - 1 ? YP_SILVER : '#c3c9d4', { lw: 3, seed: 602 + i }); }
}
// heap of silver: base centre (x, y), half width w, height h; seed keeps the surface coins fixed
function ypHeap(ctx, x, y, w, h, seed = 9) {
  if (h < 2) return; const pts = [[x - w, y]];
  for (let i = 1; i < 14; i++) { const a = i / 14; pts.push([x - w + 2 * w * a, y - h * Math.pow(Math.sin(Math.PI * a), 0.75) - (i % 2 ? 4 : 0)]); }
  pts.push([x + w, y], [x - w, y]); shape(ctx, pts, YP_SILVER, { lw: 5, seed: 605, dot: C.blue, pitch: 8, rad: 0.22, da: 0.45 });
  const r = K.rng(seed), n = Math.round(6 + h / 12); for (let i = 0; i < n; i++) { const a = 0.1 + 0.8 * r(); ypCoin(ctx, x - w + 2 * w * a, y - h * Math.pow(Math.sin(Math.PI * a), 0.75) * (0.25 + 0.7 * r()), 9 + 3 * r(), 0.45 + 0.55 * r()); }
}

// ---------- purse: bottom centre (x, y), about 60 x 70 at s 1. o: fill 0..1 (0 flat), inside (limp, turned out), mark ('1000'), rot ----------
function ypPurse(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= K.clamp(o.alpha);
  if (o.inside) {   // a limp sock hanging from the drawstring (origin at the top)
    shape(ctx, [[-10, 0], [10, 0], [16, 30], [12, 58], [0, 66], [-12, 58], [-16, 30], [-10, 0]], '#e9c9a8', { lw: 4, seed: 611, dot: C.red, pitch: 6, rad: 0.18, da: 0.35 });
    seg(ctx, -12, 2, 12, 2, 6, C.yellow, 2); ctx.restore(); return;
  }
  const f = K.clamp(o.fill ?? 1), w = K.lerp(16, 30, f), h = K.lerp(30, 56, f);
  shape(ctx, [[-w * 0.7, 0], [-w, -h * 0.35], [-w * 0.6, -h * 0.75], [-9, -h * 0.85], [-14, -h - 10], [14, -h - 10], [9, -h * 0.85], [w * 0.6, -h * 0.75], [w, -h * 0.35], [w * 0.7, 0], [-w * 0.7, 0]],
    C.red, { lw: 4, seed: 612, dot: '#a8160f', pitch: 6, rad: 0.25, da: 0.5 });
  seg(ctx, -11, -h * 0.85, 11, -h * 0.85, 5, C.yellow, 2);
  if (o.mark) { ctx.font = K.font(o.markSize || 20, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.strokeText(o.mark, 0, -h * 0.4); ctx.fillStyle = C.yellow; ctx.fillText(o.mark, 0, -h * 0.4); }
  ctx.restore();
}

// ---------- sack: bottom centre (x, y), 120 x 190 at s 1 (s 1.6 = about 190 x 300). o: sq, bulge (pulse 0..1), rot, mark, glint 0..1 ----------
function ypSack(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const q = o.sq ?? 1, b = 1 + 0.08 * (o.bulge || 0); ctx.scale(s * (1 + (1 - q) * 0.8) * b, s * q);
  const pts = [[-50, 0], [-62, -40], [-58, -100], [-40, -140], [-16, -156], [-26, -186], [26, -186], [16, -156], [40, -140], [58, -100], [62, -40], [50, 0], [-50, 0]];
  shape(ctx, pts, YP_CLOTH, { lw: 6, seed: 621, dot: YP_CLOTHD, pitch: 8, rad: 0.22, da: 0.45 });
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(20,20,20,0.6)'; for (const dx of [-24, 22]) { ctx.beginPath(); ctx.moveTo(dx, -12); ctx.quadraticCurveTo(dx * 1.4, -80, dx * 0.6, -138); ctx.stroke(); }
  seg(ctx, -22, -156, 22, -156, 9, C.red, 2.5);
  if (o.mark !== false) { shape(ctx, ell(0, -70, 19, 19, 16), YP_SILVER, { lw: 3.5, seed: 622 }); ctx.lineWidth = 2.5; ctx.strokeStyle = YP_SILVERD; ctx.beginPath(); ctx.arc(0, -70, 11, 0, 7); ctx.stroke(); }
  ctx.restore();
}

// ---------- brass tray with food, 150 wide; (x, y) = tray rim centre. o: cover 0..1 (lifted), t (steam), s ----------
function ypTray(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const cov = K.clamp(o.cover ?? 1);
  if (cov < 1 || o.noCover) {
    shape(ctx, ell(-38, -16, 26, 12, 16), '#d9903a', { lw: 3.5, seed: 631, dot: YP_BROWND, pitch: 6, rad: 0.2, da: 0.4 });            // bread
    shape(ctx, [[-6, -2], [-4, -26], [12, -40], [30, -26], [34, -2]], C.white, { lw: 3.5, seed: 632, dot: C.yellow, pitch: 5, rad: 0.25, da: 0.4 }); // rice dome
    for (const [dx, dy] of [[46, -8], [56, -12], [50, -16]]) shape(ctx, ell(dx, dy, 6, 4, 10), YP_BROWND, { lw: 2, seed: 633 });        // dates
    shape(ctx, K.rectPts(-64, -24, 14, 22), C.blue, { lw: 3, seed: 634 });                                                                  // cup
  }
  shape(ctx, ell(0, 0, 75, 9, 24), YP_BRASS, { lw: 4.5, seed: 635, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  if (!o.noCover && cov > 0) { const up = (1 - cov) * 40, dx = (1 - cov) * 30; ctx.save(); ctx.globalAlpha *= K.clamp(cov * 2); ctx.translate(dx, -up); ctx.rotate(-(1 - cov) * 0.5);
    shape(ctx, [[-62, -2], [-58, -34], [-30, -58], [30, -58], [58, -34], [62, -2], [-62, -2]], YP_BRASS, { lw: 4.5, seed: 636, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
    shape(ctx, ell(0, -64, 9, 8, 12), C.yellow, { lw: 3, seed: 637 }); ctx.restore(); }
  if (o.t != null && o.steam !== false && cov < 0.6) { ctx.save(); ctx.translate(0, -40); ctx.scale(0.45, 0.45); steam(ctx, 0, 0, o.t); ctx.restore(); }
  ctx.restore();
}

// ---------- ledger: centre (x, y). Closed 70 x 90, open 150 x 100. o: open 0..1, n tallies (0..30), until (draw the UNTIL line), stamp 0..1, tick 0..1 ----------
function ypLedger(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const op = K.clamp(o.open ?? 0);
  if (op < 0.5) { const k = 1 - op * 2; ctx.scale(Math.max(0.15, k), 1);
    shape(ctx, K.rectPts(-35, -45, 70, 90), '#8a3a1a', { lw: 5, seed: 641, dot: '#5b1a0a', pitch: 8, rad: 0.2, da: 0.45 }); seg(ctx, -30, -45, -30, 45, 10, C.yellow, 3); ctx.restore(); return; }
  const k = (op - 0.5) * 2; ctx.scale(Math.max(0.15, k), 1);
  shape(ctx, K.rectPts(-80, -54, 160, 108), '#8a3a1a', { lw: 5, seed: 642 });
  for (const sd of [-1, 1]) shape(ctx, K.rectPts(sd < 0 ? -74 : 2, -48, 72, 96), C.white, { lw: 3.5, seed: 643 + sd });
  seg(ctx, 0, -50, 0, 50, 4, YP_BROWND, 0);
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(29,91,208,0.6)'; for (let ly = -34; ly <= 40; ly += 12) for (const x0 of [-70, 6]) { ctx.beginPath(); ctx.moveTo(x0, ly); ctx.lineTo(x0 + 64, ly); ctx.stroke(); }
  const n = Math.floor(o.n || 0); ctx.lineWidth = 3; ctx.strokeStyle = C.black;
  for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), j = i % 5, gx = -68 + (g % 3) * 22, gy = -40 + Math.floor(g / 3) * 24; ctx.beginPath(); if (j < 4) { ctx.moveTo(gx + j * 4, gy); ctx.lineTo(gx + j * 4, gy + 16); } else { ctx.moveTo(gx - 3, gy + 14); ctx.lineTo(gx + 16, gy + 2); } ctx.stroke(); }
  if (o.until) { ctx.font = K.font(17, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('UNTIL', 8, -4);
    ctx.lineWidth = 3; ctx.strokeStyle = C.red; ctx.strokeRect(10, 10, 58, 30); }
  ctx.restore();
}
function ypQuill(ctx, x, y, rot = -0.6, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[0, 0], [8, -30], [4, -64], [-6, -40], [0, 0]], C.white, { lw: 3, seed: 645 }); seg(ctx, 0, 0, 3, -50, 2.5, C.black, 0); ctx.restore(); }
function ypKeys(ctx, x, y, a = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.lineWidth = 4; ctx.strokeStyle = YP_BRASS; ctx.beginPath(); ctx.arc(0, 10, 10, 0, 7); ctx.stroke();
  for (const [dx, r] of [[-8, 0.3], [2, 0], [10, -0.3]]) { ctx.save(); ctx.translate(dx, 18); ctx.rotate(r); seg(ctx, 0, 0, 0, 22, 4, YP_BRASS, 1.5); seg(ctx, 0, 18, 6, 18, 3, YP_BRASS, 1.2); ctx.restore(); } ctx.restore(); }

// ---------- the guest-room furniture ----------
// diwan (couch): x0..x1, seat top y; o.dent 0..1 (a hollow left by a sitter at o.dx), o.cushion squash (1 rest)
function ypDiwan(ctx, x0, x1, top, o = {}) {
  const GR = 900, back = top - 110;
  shape(ctx, [[x0 + 10, top], [x0 + 16, back + 20], [x0 + 40, back], [x1 - 40, back], [x1 - 16, back + 20], [x1 - 10, top]], C.red, { lw: 6, seed: 651, dot: '#a8261a', pitch: 9, rad: 0.25, da: 0.55 });
  const cq = o.cushion ?? 1, cx = o.cx ?? x1 - 70; ctx.save(); ctx.translate(cx, top - 4); ctx.scale(1 + (1 - cq) * 0.7, cq);
  shape(ctx, [[-50, 0], [-46, -62], [-36, -72], [36, -72], [46, -62], [50, 0]], C.yellow, { lw: 5, seed: 652, dot: C.red, pitch: 8, rad: 0.2, da: 0.5 }); ctx.restore();
  const d = K.clamp(o.dent || 0), dx = o.dx ?? (x0 + x1) / 2;
  const seat = [[x0, GR], [x0, top + 8]]; for (let i = 0; i <= 10; i++) { const x = K.lerp(x0 + 10, x1 - 10, i / 10); seat.push([x, top + 14 * d * Math.exp(-Math.pow((x - dx) / 60, 2))]); } seat.push([x1, top + 8], [x1, GR]);
  shape(ctx, seat, '#f2d27a', { lw: 6, seed: 653, dot: C.red, pitch: 10, rad: 0.18, da: 0.4 });
  seg(ctx, x0 + 6, top + 30, x1 - 6, top + 30, 8, C.blue, 3);
}
function ypTable(ctx, x0, x1, top) { const GR = 900; for (const lx of [x0 + 14, x1 - 14]) seg(ctx, lx, top + 10, lx, GR, 10, YP_BROWN, 3.5); shape(ctx, K.rectPts(x0, top, x1 - x0, 16), YP_BROWN, { lw: 5, seed: 655, dot: YP_BROWND, pitch: 8, rad: 0.2, da: 0.45 }); }
function ypRug(ctx, x0, x1, y, p = 1, skew = 0) {
  if (p <= 0.01) return; const xe = K.lerp(x0, x1, p);
  shape(ctx, [[x0 + skew, y], [xe + skew, y], [xe - skew, y + 30], [x0 - skew, y + 30]], C.blue, { lw: 5, seed: 656, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
  if (p < 0.98) shape(ctx, ell(xe, y + 14, 12, 18, 12), C.blue, { lw: 4, seed: 657, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
}

// ---------- icons ----------
function ypHourglass(ctx, x, y, level, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.s || 1, o.s || 1);
  shape(ctx, [[-26, -44], [26, -44], [4, -4], [-4, -4], [-26, -44]], C.white, { lw: 4, seed: 661 }); shape(ctx, [[-4, 4], [4, 4], [26, 44], [-26, 44], [-4, 4]], C.white, { lw: 4, seed: 662 });
  const L = K.clamp(level); if (L > 0.01) { const h = 38 * Math.sqrt(L), w = 22 * Math.sqrt(L); shape(ctx, [[-w, -4 - h], [w, -4 - h], [3, -5], [-3, -5], [-w, -4 - h]], C.yellow, { lw: 2.5, seed: 663 }); }
  const bh = 32 * Math.sqrt(1 - L); if (bh > 1) shape(ctx, [[-24, 42], [24, 42], [0, 42 - bh], [-24, 42]], C.yellow, { lw: 2.5, seed: 664 });
  ctx.fillStyle = C.yellow; for (let i = 0; i < 3; i++) { const u = (t * 2.2 + i / 3) % 1; ctx.fillRect(-2, -2 + u * 40, 4, 4); }
  shape(ctx, K.rectPts(-34, -56, 68, 12), YP_BROWN, { lw: 4, seed: 665 }); shape(ctx, K.rectPts(-34, 44, 68, 12), YP_BROWN, { lw: 4, seed: 666 });
  ctx.restore();
}
function ypMoth(ctx, x, y, t, s = 1) {
  const f = Math.abs(Math.sin(t * 26)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 22, -10 - 10 * f], [sd * 18, 8], [0, 0]], '#c9bfa6', { lw: 3, seed: 671, dot: '#8c8a94', pitch: 5, rad: 0.25, da: 0.5 });
  seg(ctx, 0, -6, 0, 10, 6, '#5a5a6a', 2); ctx.restore();
}
function ypPadlock(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, -16, 18, Math.PI, 0); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = YP_SILVERD; ctx.stroke();
  shape(ctx, K.rectPts(-26, -18, 52, 42), YP_BRASS, { lw: 4.5, seed: 672, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 7); ctx.fill(); ctx.fillRect(-2, 0, 4, 12); ctx.restore(); }
// open palm facing us (for GIVE IT BACK!), centre (x, y), about 90 x 120 at s 1
function ypPalm(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const [fx, fh, r] of [[-30, 56, -0.18], [-11, 70, -0.05], [9, 72, 0.05], [28, 60, 0.18]]) { ctx.save(); ctx.translate(fx, -20); ctx.rotate(r); shape(ctx, [[-9, 0], [-9, -fh + 9], [0, -fh], [9, -fh + 9], [9, 0]], C.white, { lw: 4, seed: 673, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }
  shape(ctx, [[-50, -12], [-66, -40], [-58, -50], [-36, -26]], C.white, { lw: 4, seed: 674, dot: C.skin, pitch: 5, rad: 0.3 });
  shape(ctx, [[-42, -26], [42, -26], [40, 30], [22, 52], [-22, 52], [-40, 30], [-42, -26]], C.white, { lw: 4.5, seed: 675, dot: C.skin, pitch: 5, rad: 0.3 });
  seg(ctx, -30, 60, 30, 60, 30, NAVY, 4); ctx.restore(); }
// small family-tree and hammer icons for the question tags
function ypTreeIcon(ctx, x, y) { ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x, y); ctx.moveTo(x - 16, y + 14); ctx.lineTo(x - 16, y); ctx.lineTo(x + 16, y); ctx.lineTo(x + 16, y + 14); ctx.stroke();
  for (const [dx, dy] of [[0, -18], [-16, 16], [16, 16]]) shape(ctx, ell(x + dx, y + dy, 7, 7, 10), C.red, { lw: 3, seed: 676 }); }
function ypHammerIcon(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.6); seg(ctx, 0, -6, 0, 26, 7, YP_BROWN, 2.5); shape(ctx, K.rectPts(-16, -18, 32, 13), '#5a5a6a', { lw: 3, seed: 677 }); ctx.restore(); }
function ypCup(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-12, 0], [-15, -26], [15, -26], [12, 0], [-12, 0]], C.blue, { lw: 3.5, seed: 678, dot: NAVY, pitch: 5, rad: 0.25 }); ctx.restore(); }
function ypSandal(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, -5, 22, 7, 14), YP_BROWN, { lw: 3.5, seed: 679 }); seg(ctx, -8, -10, 8, -10, 5, C.red, 1.5); ctx.restore(); }
// cloth bundle: spread (p 0 = flat cloth) to tied (p 1 = knotted bundle); bottom centre (x, y)
function ypBundle(ctx, x, y, p, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (p < 0.5) { const k = p * 2; shape(ctx, [[-70 + 30 * k, 0], [-46 + 10 * k, -16 - 10 * k], [46 - 10 * k, -16 - 10 * k], [70 - 30 * k, 0]], C.red, { lw: 4.5, seed: 681, dot: C.white, pitch: 8, rad: 0.22, da: 0.5 }); }
  else { const k = (p - 0.5) * 2; shape(ctx, [[-40, 0], [-46, -30], [-26, -52], [26, -52], [46, -30], [40, 0], [-40, 0]], C.red, { lw: 4.5, seed: 682, dot: C.white, pitch: 8, rad: 0.22, da: 0.5 });
    shape(ctx, [[-4, -50], [-24, -62 - 14 * k], [-8, -70 - 8 * k], [0, -54], [8, -70 - 8 * k], [24, -62 - 14 * k], [4, -50]], C.red, { lw: 4, seed: 683, dot: C.white, pitch: 8, rad: 0.22, da: 0.5 }); }
  ctx.restore();
}
// heart-marked door for Yahya's thought (open 0..1), bottom centre
function ypHeartDoor(ctx, x, y, open, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, townArchPts(-70, 70, -250, 0, 'pointed'), C.yellow, { lw: 6, seed: 684, dot: C.red, pitch: 9, rad: 0.2, da: 0.45 });
  ctx.save(); K.poly(ctx, townArchPts(-56, 56, -236, 0, 'pointed'), true); ctx.fillStyle = '#ffd98a'; ctx.fill(); ctx.restore();
  const lw = 112 * Math.max(0.02, 1 - open); shape(ctx, [[-56, -224], [-56 + lw, -224 + 8 * open], [-56 + lw, -8 * open], [-56, 0]], '#a8261a', { lw: 4, seed: 685, dot: C.black, pitch: 9, rad: 0.16, da: 0.35 });
  if (lw > 30) heart(ctx, -56 + lw / 2, -130, 20 * Math.min(1, lw / 112), { fill: C.red });
  ctx.restore();
}

// ---------- effects ----------
function ypGlint(ctx, x, y, r, p) {
  if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p) * r; ctx.save(); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y - k); ctx.lineTo(x + k * 0.22, y - k * 0.22); ctx.lineTo(x + k, y); ctx.lineTo(x + k * 0.22, y + k * 0.22); ctx.lineTo(x, y + k); ctx.lineTo(x - k * 0.22, y + k * 0.22); ctx.lineTo(x - k, y); ctx.lineTo(x - k * 0.22, y - k * 0.22); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function ypSweat(ctx, x, y, p) { if (p <= 0 || p >= 1) return; const yy = y + 34 * p; ctx.save(); ctx.globalAlpha = Math.min(1, (1 - p) * 3); shape(ctx, [[x, yy - 14], [x + 8, yy], [x, yy + 7], [x - 8, yy], [x, yy - 14]], '#9cc4ff', { lw: 3, seed: 691 }); ctx.restore(); }
function ypShadow(ctx, x, y, w, a = 0.3) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(x, y + 2, w, w * 0.16, 0, 0, 7); ctx.fill(); ctx.restore(); }
// icon balloon (white, tail toward (tx, ty)); inner(ctx) drawn clipped with the origin at the centre
function ypBalloon(ctx, cx, cy, w, h, tail, p, inner, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.02) return;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(cx, cy); ctx.scale(k, k);
  const pts = K.circlePts(0, 0, w / 2, h / 2, 48), tx = tail ? tail[0] - cx : 0, ty = tail ? tail[1] - cy : 0, ta = Math.atan2(ty, tx);
  const tl = tail ? [[Math.cos(ta - 0.32) * w * 0.36, Math.sin(ta - 0.32) * h * 0.36], [tx * 0.62 / k, ty * 0.62 / k], [Math.cos(ta + 0.32) * w * 0.36, Math.sin(ta + 0.32) * h * 0.36]] : null;
  ctx.fillStyle = o.fill || C.white;
  if (tl) { ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.closePath(); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.stroke(); }
  ctx.lineWidth = 12; ctx.strokeStyle = C.black; K.poly(ctx, pts, true); ctx.stroke(); ctx.fillStyle = o.fill || C.white; K.poly(ctx, pts, true); ctx.fill();
  ctx.save(); K.poly(ctx, pts, true); ctx.clip(); inner(ctx); ctx.restore();
  ctx.restore();
}
// red brush strike across a tag (p 0..1 drawn on), centred (x, y), width w
function ypStrike(ctx, x, y, w, p) { if (p <= 0) return; const k = K.ease.out(K.clamp(p)); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x - w / 2, y + 12); ctx.lineTo(x - w / 2 + w * k, y + 12 - 26 * k); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = C.red; ctx.stroke(); ctx.restore(); }
// thirty moons in rows (panel units): lit one by one from t0, 0.03 s apart
function ypMoons(ctx, t, t0, o = {}) {
  const n = o.n ?? 30, cols = o.cols ?? 10, x0 = o.x ?? 221, y0 = o.y ?? 150, px = o.px ?? 62, py = o.py ?? 58, a = o.alpha ?? 1; if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const x = x0 + (i % cols) * px, y = y0 + Math.floor(i / cols) * py, k = K.ease.back(K.clamp((t - t0 - i * 0.03) / 0.18));
    shape(ctx, ell(x, y, 20, 20, 16), NAVY2, { lw: 4, seed: 700 + i });
    if (k > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 17, 0, 7); ctx.arc(7, -5, 14, 0, 7, true); ctx.fillStyle = C.yellow; ctx.fill('evenodd'); ctx.restore(); } }
  if (o.flash > 0) { const x = x0 + ((n - 1) % cols) * px, y = y0 + Math.floor((n - 1) / cols) * py; ypGlint(ctx, x, y, 40, o.flash); }
  ctx.restore();
}
// lettering tag (panel or world units): the style label with an optional icon and strike
function ypTag(S, ctx, text, x, y, p, o = {}) { if (p <= 0) return null; const r = S.label(ctx, text, x, y, p, { align: 'center', size: o.size || 40, fill: o.fill, color: o.color, tilt: o.tilt }); return r; }
