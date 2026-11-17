// ===== AN-124 props and effects (library proposals: desertCamp, verseRibbon, faceCover, iconBalloon + portraitMedallion, musicNotes, scroll, tallyMarks) =====
const MT_POLE = '#5b3010', MT_TENT = '#262230', MT_TENTD = '#4a4060', MT_GREEN = '#3f9d4a';

// ---------- desertCamp: bedouin camp, world 1600 x 1230, ground y 900 ----------
// desertCamp(ctx, o): o {u (time of day), t, camX (camera left x, dune parallax), lamps: [7 x 0..1], swing: [7 x radians], pulse (disc pulse 0..1),
//   fire 0..1, farLit 0..1, slit 0..1 (small tent door lit), deco 0..1 (flags), layer: 'back' | 'front'}. Returns the anchors (MT_CAMP).
const MT_CAMP = { W: 1600, ground: 900, poles: [560, 800, 1040], tops: [520, 470, 520], cush: [740, 860], post: 560, drum: [400, 475], guests: [1080, 1160], fire: 1235,
  kids: [1300, 1355], palm: 1420, lip: { x0: 1500, crest: [1560, 848] }, gap: [1500, 840], smallTent: [120, 400, 260, 600], far: [1250, 1380, 1500] };
// the roof line (top edge of the tent band) from pole top to pole top with a sag
function mtRoofY(x) {
  const P = MT_CAMP.poles, T = MT_CAMP.tops;
  if (x <= P[0]) return T[0] + (P[0] - x) * 1.1;
  if (x >= P[2]) return T[2] + (x - P[2]) * 1.1;
  const i = x < P[1] ? 0 : 1, u = (x - P[i]) / (P[i + 1] - P[i]);
  return K.lerp(T[i], T[i + 1], u) + 22 * Math.sin(Math.PI * u);
}
// the lamp rope: (560, 520) -> (800, 500) -> (1040, 520) -> palm (1400, 500), sagging between
const MT_ROPE = [[560, 520], [800, 500], [1040, 520], [1400, 500]];
function mtRopeY(x) {
  const R = MT_ROPE; if (x <= R[0][0]) return R[0][1];
  for (let i = 0; i < R.length - 1; i++) if (x <= R[i + 1][0]) { const u = (x - R[i][0]) / (R[i + 1][0] - R[i][0]); return K.lerp(R[i][1], R[i + 1][1], u) + 34 * Math.sin(Math.PI * u); }
  return R[R.length - 1][1];
}
const MT_LAMPX = [620, 740, 860, 980, 1110, 1230, 1350];
const mtLampPos = (i) => [MT_LAMPX[i], mtRopeY(MT_LAMPX[i]) + 46];
function mtSunMoon(ctx, u, t) {
  const d = dayCycle(u);
  if (d.night > 0.05) { ctx.save(); ctx.globalAlpha *= K.clamp(d.night * 1.3); moon(ctx, 900, 230, 66); ctx.restore(); }
  const v = (((u % 1) + 1) % 1) / 0.5; if (v > 0 && v < 1) sun(ctx, 250 + 1100 * v, 830 - 640 * Math.sin(Math.PI * v), t);
}
function mtSmallTent(c, lit) {
  const [x0, x1, px, py] = MT_CAMP.smallTent;
  shape(c, [[x0, 902], [x0 + 30, 760], [px - 40, py + 6], [px, py], [px + 40, py + 6], [x1 - 30, 760], [x1, 902]], MT_TENT, { lw: 6, seed: 701, dot: MT_TENTD, pitch: 10, rad: 0.2, da: 0.5 });
  seg(c, x0 + 40, 772, x1 - 40, 772, 5, C.red, 2); seg(c, px, py, px, 902, 6, MT_POLE, 2);
  shape(c, [[px - 30, 902], [px - 8, 780], [px + 8, 780], [px + 30, 902]], lit ? '#ffcf4a' : NAVY2, { lw: 4, seed: 702 });
}
function mtBigTentBack(c) {
  const P = MT_CAMP.poles, top = [], bot = [];
  for (let x = 530; x <= 1070; x += 10) { top.push([x, mtRoofY(x) + 6]); }
  // back wall (navy, blue dots) and side curtains
  shape(c, [...top, [1070, 902], [530, 902]], NAVY2, { lw: 6, seed: 703, dot: '#2a4fae', pitch: 10, rad: 0.24, da: 0.6 });
  for (const [a, b, s] of [[530, 600, 1], [1000, 1070, -1]]) shape(c, [[a, mtRoofY(a) + 20], [b, mtRoofY(b) + 20], [s > 0 ? a + 40 : b, 902], [s > 0 ? a : b - 40, 902]].map((p, i, arr) => p), '#3a2f48', { lw: 5, seed: 704, dot: '#5a4a6a', pitch: 9, rad: 0.2, da: 0.5 });
  // hanging rug on the back wall
  shape(c, K.rectPts(720, 600, 160, 150), C.red, { lw: 5, seed: 705, dot: C.yellow, pitch: 10, rad: 0.18, da: 0.45 });
  for (let k = 0; k < 4; k++) seg(c, 736 + k * 42, 614, 736 + k * 42, 736, 4, C.yellow, 1.5);
  // guy ropes and pegs
  c.save(); c.lineWidth = 3; c.strokeStyle = C.black; for (const [ax, bx] of [[530, 440], [1070, 1160]]) { c.beginPath(); c.moveTo(ax, mtRoofY(ax) + 10); c.lineTo(bx, 896); c.stroke(); } c.restore();
  for (const x of [440, 1160]) seg(c, x, 904, x, 886, 6, MT_POLE, 2);
  // carpet
  shape(c, [[540, 896], [1060, 896], [1076, 932], [524, 932]], C.red, { lw: 5, seed: 706, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.5 });
  seg(c, 534, 926, 1066, 926, 3, C.yellow, 1);
}
function mtBigTentRoof(c) {
  const top = [], bot = []; for (let x = 512; x <= 1088; x += 8) { const y = mtRoofY(x); top.push([x, y - 12]); bot.push([x, y + 30]); }
  shape(c, [...top, ...bot.reverse()], MT_TENT, { lw: 7, seed: 707, dot: '#3d4f9a', pitch: 9, rad: 0.24, da: 0.55 });
  // red and white stripe along the lower edge
  c.save(); const band = []; for (let x = 514; x <= 1086; x += 8) band.push([x, mtRoofY(x) + 18]); for (let x = 1086; x >= 514; x -= 8) band.push([x, mtRoofY(x) + 30]);
  K.poly(c, band, true); c.clip(); for (let x = 512; x < 1090; x += 24) { c.fillStyle = (x / 24) % 2 < 1 ? C.red : C.white; c.fillRect(x, 400, 12, 200); c.fillStyle = C.white; c.fillRect(x + 12, 400, 12, 200); } c.restore();
  for (let k = 0; k < 12; k++) { const x = 530 + k * 48; seg(c, x, mtRoofY(x) + 30, x + 2, mtRoofY(x) + 42, 3, C.white, 1); }
}
function mtFarTents(c) {
  for (const [i, x] of MT_CAMP.far.entries()) { const y = 812 - (i % 2) * 8, w = 64; shape(c, [[x - w / 2, y + 2], [x - w / 4, y - 30], [x + w / 4, y - 30], [x + w / 2, y + 2]], '#3a2f48', { lw: 4, seed: 710 + i }); }
}
function mtFire(ctx, x, t, k) {
  for (let i = 0; i < 6; i++) { const a = Math.PI * (1.08 + 0.84 * i / 5); shape(ctx, ell(x + Math.cos(a) * 46, 904 + Math.sin(a) * -10 + 4, 13, 10, 10), STONE, { lw: 3.5, seed: 720 + i }); }
  shape(ctx, [[x - 34, 900], [x + 30, 884], [x + 36, 894], [x - 30, 908]], '#7a4212', { lw: 3.5, seed: 727 });
  if (k <= 0) return;
  const n = K.noise(77);
  ctx.save(); ctx.globalAlpha = 0.25 * k; ctx.fillStyle = dotPat(ctx, '#ff9a2a', 12, 0.36); ctx.beginPath(); ctx.arc(x, 860, 130 * k, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 3; i++) { const h = (40 + 30 * (i === 1)) * k * (0.8 + 0.35 * n.n2(t * 3 + i * 5, i)), w = 18 - i % 2 * 4, cx = x - 18 + i * 18 + 4 * Math.sin(t * 9 + i);
    shape(ctx, [[cx - w, 898], [cx - w * 0.6, 898 - h * 0.5], [cx + 3 * Math.sin(t * 11 + i), 898 - h], [cx + w * 0.6, 898 - h * 0.5], [cx + w, 898]], i === 1 ? C.yellow : C.red, { lw: 4, seed: 730 + i });
    shape(ctx, [[cx - w * 0.4, 898], [cx, 898 - h * 0.45], [cx + w * 0.4, 898]], C.yellow, { lw: 0, seed: 734 }); }
}
function desertCamp(ctx, o = {}) {
  const A = MT_CAMP, t = o.t || 0, u = o.u ?? 0.25;
  if (o.layer === 'front') {
    // the dune lip to rise from behind
    const L = A.lip; shape(ctx, [[L.x0, 904], [L.crest[0] - 40, L.crest[1] + 12], L.crest, [L.crest[0] + 60, L.crest[1] + 4], [1610, L.crest[1] + 14], [1610, 904]], '#edc65a', { lw: 7, seed: 300, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 });
    townDim(ctx, L.x0, L.crest[1] - 10, 1610 - L.x0, 70, dayCycle(u).night * 0.7);
    return A;
  }
  const d = skyCycle(ctx, u, { w: 1600, t, sun: false, moon: false, hills: false });
  mtSunMoon(ctx, u, t);
  desertRoad(ctx, { w: 1600, sky: false, sun: false, night: d.night, road: false, palms: [], milestones: [], camX: o.camX || 0 });
  townBake(ctx, 'mtFar', 1180, 740, 380, 100, (c) => mtFarTents(c));
  if ((o.farLit || 0) > 0) { ctx.save(); ctx.globalAlpha = o.farLit; for (const [i, x] of A.far.entries()) shape(ctx, [[x - 6, 813 - (i % 2) * 8], [x, 796 - (i % 2) * 8], [x + 6, 813 - (i % 2) * 8]], '#ffcf4a', { lw: 2, seed: 715 + i }); ctx.restore(); }
  palmTree(ctx, A.palm, 904, { h: 430, lean: 18, t, sway: 1, nuts: 2 });
  if (o.behind) o.behind(ctx);   // actors on the far dune, behind the tents
  townBake(ctx, 'mtTents', 80, 420, 1100, 520, (c) => { mtSmallTent(c, false); mtBigTentBack(c); mtBigTentRoof(c); });
  if ((o.slit || 0) > 0) { ctx.save(); ctx.globalAlpha = o.slit; shape(ctx, [[A.smallTent[2] - 30, 902], [A.smallTent[2] - 8, 780], [A.smallTent[2] + 8, 780], [A.smallTent[2] + 30, 902]], '#ffcf4a', { lw: 4, seed: 702 }); ctx.restore(); }
  // front poles (the left one is the tally post, thicker): behind the cast, so nobody is cut by a pole
  MT_CAMP.poles.forEach((x, i) => seg(ctx, x, 904, x, MT_CAMP.tops[i] + 4, i === 0 ? 18 : 10, MT_POLE, 3.5));
  townDim(ctx, 0, 420, 1600, 485, d.night * 0.6);
  tallyMarks(ctx, A.post, 650, o.tally ?? 7, { hop: o.tallyHop || 0, glow: o.tallyGlow || 0 });
  mtFire(ctx, A.fire, t, o.fire || 0);
  // lamp rope, flags and the seven lamps (live)
  ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.beginPath(); for (let x = 560; x <= 1400; x += 10) x === 560 ? ctx.moveTo(x, mtRopeY(x)) : ctx.lineTo(x, mtRopeY(x)); ctx.stroke(); ctx.restore();
  if ((o.deco || 0) > 0) for (let k = 0; k < 20; k++) { const x = 590 + k * 40, y = mtRopeY(x), h = 22 * o.deco; if (MT_LAMPX.some((lx) => Math.abs(lx - x) < 16)) continue; shape(ctx, [[x - 9, y], [x + 9, y], [x, y + h]], [C.red, C.white, C.yellow][k % 3], { lw: 3, seed: 740 + (k % 3) }); }
  const lamps = o.lamps || [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) { const [lx, ly] = mtLampPos(i), ry = mtRopeY(lx), lit = lamps[i] || 0;
    if (lit > 0) { const r = 60 * (1 + 0.08 * (o.pulse || 0)); ctx.save(); ctx.globalAlpha = 0.5 * lit; shape(ctx, ell(lx, 912, r, 13, 20), C.yellow, { lw: 0, dot: '#ff9a2a', pitch: 8, rad: 0.3, da: 0.5 }); ctx.restore(); }
    ctx.save(); ctx.translate(lx, ry); ctx.rotate((o.swing || [])[i] || 0); ctx.translate(-lx, -ry); hangingLamp(ctx, lx, ly, t + i * 1.7, { lit, chain: ry, s: 0.6 }); ctx.restore(); }
  return A;
}

// ---------- tallyMarks: years scratched on the post (white on the dark pole), groups of five with the fifth across ----------
function tallyMarks(ctx, x, y, n, o = {}) {
  if (n <= 0) return; const r = K.rng(91); ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), k = i % 5, yy = y + g * 64 + k * 11, hop = (o.hop || 0) * (1 - (i % 2) * 0.4);
    if (k === 4) { ctx.lineWidth = 4; ctx.strokeStyle = o.glow ? mixHex(C.white, C.yellow, o.glow) : C.white; ctx.beginPath(); ctx.moveTo(x - 9, yy - 44 - hop); ctx.lineTo(x + 9, yy - 2 - hop); ctx.stroke(); continue; }
    const j = (r() - 0.5) * 3; ctx.lineWidth = 4; ctx.strokeStyle = o.glow ? mixHex(C.white, C.yellow, o.glow) : C.white; ctx.beginPath(); ctx.moveTo(x - 7, yy + j - hop); ctx.lineTo(x + 7, yy - j - hop); ctx.stroke(); }
  ctx.restore();
}
// ---------- scroll: the poet's verse. open 0..1 (sheet with three wavy lines and a tiny camel), rot ----------
function mtScroll(ctx, x, y, s = 1, o = {}) {
  const op = K.clamp(o.open || 0); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (op < 0.05) { shape(ctx, K.rectPts(-23, -7, 46, 14), '#fff3d6', { lw: 3.5, seed: 750 }); for (const ex of [-23, 23]) shape(ctx, ell(ex, 0, 5, 9, 10), C.yellow, { lw: 3, seed: 751 }); ctx.restore(); return; }
  const h = 46 * op; shape(ctx, K.rectPts(-35, -h / 2, 70, h), '#fff3d6', { lw: 3.5, seed: 752 });
  for (const ey of [-h / 2, h / 2]) shape(ctx, K.rectPts(-39, ey - 5, 78, 10), C.yellow, { lw: 3, seed: 753 });
  ctx.save(); K.poly(ctx, K.rectPts(-35, -h / 2, 70, h), true); ctx.clip(); ctx.lineWidth = 2.2; ctx.strokeStyle = C.black;
  for (let r = 0; r < 3; r++) { const yy = -14 + r * 10; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = -28 + k * 2.4; ctx.lineTo(xx, yy + 2 * Math.sin(k * 1.7 + r)); } ctx.stroke(); }
  if (o.glint != null && o.glint > 0 && o.glint < 1) { ctx.globalAlpha = 0.8; ctx.fillStyle = C.yellow; ctx.fillRect(-35 + 70 * o.glint - 4, -h / 2, 8, h); ctx.globalAlpha = 1; }
  // tiny camel doodle (bottom right)
  ctx.lineWidth = 2; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(14, 18); ctx.lineTo(16, 10); ctx.quadraticCurveTo(21, 4, 26, 10); ctx.lineTo(29, 6); ctx.lineTo(31, 7); ctx.moveTo(16, 10); ctx.lineTo(15, 18); ctx.moveTo(26, 10); ctx.lineTo(27, 18); ctx.stroke();
  ctx.restore(); ctx.restore();
}
// ---------- small scene props ----------
function mtFlower(ctx, x, y, r = 9, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); seg(ctx, 0, r, 0, r + 18, 3, MT_GREEN, 1.5);
  for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; shape(ctx, ell(Math.cos(a) * r * 0.75, Math.sin(a) * r * 0.75, r * 0.6, r * 0.6, 10), C.red, { lw: 2.5, seed: 760 }); }
  shape(ctx, ell(0, 0, r * 0.45, r * 0.45, 10), C.yellow, { lw: 2.5, seed: 761 }); ctx.restore();
}
function mtCushion(ctx, x, col = C.yellow, dot = C.red) {
  shape(ctx, [[x - 54, 902], [x - 50, 862], [x - 40, 852], [x + 40, 852], [x + 50, 862], [x + 54, 902]], col, { lw: 5, seed: 765, dot, pitch: 8, rad: 0.2, da: 0.5 });
  seg(ctx, x - 46, 870, x + 46, 870, 2, dot, 1);
}
function mtNecklace(ctx, x, y, s = 1, droop = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i <= 10; i++) { const u = i / 10, bx = -28 + 56 * u, by = 18 * Math.sin(Math.PI * u) * (1 + droop) + droop * 10; shape(ctx, ell(bx, by, 5, 5, 8), i === 5 ? C.red : C.yellow, { lw: 2.5, seed: 766 }); }
  ctx.restore();
}
function mtGiftChest(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, K.rectPts(-20, -14, 40, 28), '#a8741a', { lw: 3.5, seed: 767 }); seg(ctx, -20, -4, 20, -4, 2, C.yellow, 1); ctx.restore(); }
function mtDustDevil(ctx, x, y, t, k) {
  if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.85 * k; ctx.lineWidth = 4; ctx.strokeStyle = '#c9a46a'; ctx.lineCap = 'round';
  for (let j = 0; j < 2; j++) { ctx.beginPath(); for (let a = 0; a < 14; a += 0.3) ctx.lineTo(x + Math.cos(a * 1.6 + t * 9 + j * 3) * (3 + a * 1.6) * k, y - a * 4.5 * k); ctx.stroke(); } ctx.restore();
}
// red X drawn on in k (0..1), two brush strokes
function mtX(ctx, x, y, r, k, lw = 14) {
  if (k <= 0) return; ctx.save(); ctx.lineCap = 'round';
  [[[-1, -1], [1, 1]], [[1, -1], [-1, 1]]].forEach(([a, b], i) => { const q = K.clamp(k * 2 - i); if (q <= 0) return; for (const [w, c] of [[lw + 7, C.black], [lw, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x + a[0] * r, y + a[1] * r); ctx.lineTo(x + K.lerp(a[0], b[0], q) * r, y + K.lerp(a[1], b[1], q) * r); ctx.stroke(); } });
  ctx.restore();
}

// ---------- verseRibbon: spoken poetry as a paper band on a cubic bezier ----------
// verseRibbon(ctx, pts [p0, p1, p2, p3], t, {p (draw-on 0..1), w: 34, col (edge colour), curl 0..1, fade 0..1 (from the tail), seed})
function verseRibbon(ctx, pts, t, o = {}) {
  const p = K.clamp(o.p ?? 1); if (p <= 0) return; const w = o.w ?? 34, col = o.col || C.red, N = 44, B = [];
  const bz = (u) => { const v = 1 - u; return [0, 1].map((k) => v * v * v * pts[0][k] + 3 * v * v * u * pts[1][k] + 3 * v * u * u * pts[2][k] + u * u * u * pts[3][k]); };
  for (let i = 0; i <= N; i++) B.push(bz(i / N));
  const cu = K.clamp(o.curl || 0); if (cu > 0) { const a = B[N], b = B[N - 1], ang = Math.atan2(a[1] - b[1], a[0] - b[0]), R = 30, cx = a[0] + Math.cos(ang - Math.PI / 2) * R, cy = a[1] + Math.sin(ang - Math.PI / 2) * R, m = Math.round(16 * cu);
    for (let i = 1; i <= m; i++) { const th = ang + Math.PI / 2 - (i / 16) * Math.PI * 1.8; B.push([cx + Math.cos(th) * R * (1 - i / 50), cy + Math.sin(th) * R * (1 - i / 50)]); } }
  const L = B.length - 1, i1 = Math.max(1, Math.round(L * p)), i0 = Math.min(i1 - 1, Math.round(L * K.clamp(o.fade || 0)));
  if (i1 - i0 < 1) return; const seg2 = B.slice(i0, i1 + 1), nrm = seg2.map((q, i) => { const a = seg2[Math.max(0, i - 1)], b = seg2[Math.min(seg2.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; });
  const wv = (i) => w / 2 * (0.85 + 0.15 * Math.sin(i * 0.7 + t * 2)) * Math.min(1, (i + 1) / 3);
  const up = seg2.map((q, i) => [q[0] + nrm[i][0] * wv(i), q[1] + nrm[i][1] * wv(i)]), dn = seg2.map((q, i) => [q[0] - nrm[i][0] * wv(i), q[1] - nrm[i][1] * wv(i)]);
  const poly = [...up, ...dn.reverse(), up[0]];
  shape(ctx, poly, '#fff3d6', { lw: 6, seed: o.seed ?? 770 });
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const sd of [1, -1]) { ctx.lineWidth = 4; ctx.strokeStyle = col; ctx.beginPath(); seg2.forEach((q, i) => { const k = (wv(i) - 6) * sd; i ? ctx.lineTo(q[0] + nrm[i][0] * k, q[1] + nrm[i][1] * k) : ctx.moveTo(q[0] + nrm[i][0] * k, q[1] + nrm[i][1] * k); }); ctx.stroke(); }
  // squiggle writing (two rows), no real words
  const r = K.rng(o.seed ?? 771); ctx.lineWidth = 2.4; ctx.strokeStyle = C.black;
  for (const row of [-0.2, 0.2]) { ctx.beginPath(); seg2.forEach((q, i) => { if (i < 1 || i > seg2.length - 2) return; const k = row * w + (r() - 0.5) * 6 * (i % 3 === 0 ? 0 : 1); ctx.lineTo(q[0] + nrm[i][0] * k, q[1] + nrm[i][1] * k); }); ctx.stroke(); }
  ctx.restore();
  return B[i1];
}
const mtBz = (pts, u) => { const v = 1 - u; return [0, 1].map((k) => v * v * v * pts[0][k] + 3 * v * v * u * pts[1][k] + 3 * v * u * u * pts[2][k] + u * u * u * pts[3][k]); };

// ---------- iconBalloon: wordless picture balloon (rounded box, tail), frames drawn by the caller in a local box ----------
function iconBalloon(ctx, x, y, w, h, p, tail, inside) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const rr = Math.min(w, h) * 0.28, box = []; for (const [cx, cy, a0] of [[w / 2 - rr, -h / 2 + rr, -Math.PI / 2], [w / 2 - rr, h / 2 - rr, 0], [-w / 2 + rr, h / 2 - rr, Math.PI / 2], [-w / 2 + rr, -h / 2 + rr, Math.PI]]) for (let i = 0; i <= 6; i++) { const a = a0 + i / 6 * Math.PI / 2; box.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  if (tail) { const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k, bx = K.clamp(tx * 0.3, -w / 3, w / 3); shape(ctx, [[bx - 18, h / 2 - 6], [tx, ty], [bx + 18, h / 2 - 6], [bx - 18, h / 2 - 6]], C.white, { lw: 7, seed: 780 }); }
  shape(ctx, [...box, box[0]], C.white, { lw: 8, seed: 781 });
  if (tail) { const tx = (tail[0] - x) / k, bx = K.clamp(tx * 0.3, -w / 3, w / 3); ctx.fillStyle = C.white; ctx.fillRect(bx - 14, h / 2 - 12, 28, 14); }
  if (inside) { ctx.save(); K.poly(ctx, box, true); ctx.clip(); inside(ctx); ctx.restore(); }
  ctx.restore();
}
// portraitMedallion: a person's head in a yellow-rimmed circle (r), person fields P (costume, mouth...)
function portraitMedallion(ctx, x, y, r, P, o = {}) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = o.bg || '#bfe0ff'; ctx.fill(); ctx.clip();
  if (o.grey) ctx.globalAlpha = 1;
  const s = r / 58; person(ctx, { dir: 1, ...P, x, y: y + (195 + 18) * s, s, noBlink: true, lid: P.lid ?? 0 });
  if (o.grey > 0) { ctx.globalAlpha = 0.55 * o.grey; ctx.fillStyle = '#8c8a94'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.globalAlpha = 1; }
  ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r + 3, 0, 7); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
}
// ---------- musicNotes: quavers rising on seeded S-paths from (x, y), born from t0 every gap s, life s; optional target 'to' ----------
function musicNotes(ctx, x, y, t, o = {}) {
  const n = o.n ?? 4, gap = o.gap ?? 0.3, life = o.life ?? 1.4, r = K.rng(o.seed ?? 5), t0 = o.t0 ?? 0, t1 = o.t1 ?? 1e9;
  const seeds = Array.from({ length: 64 }, () => r());
  for (let i = 0; i < 64; i++) { const b = t0 + i * gap; if (b > t1 || b > t) break; const a = (t - b) / life; if (a <= 0 || a >= 1) continue; if (i >= n && o.loop !== true) break;
    const sd = seeds[i], to = o.to, ex = to ? to[0] : x + (sd - 0.5) * 120, ey = to ? to[1] : y - 130 - sd * 40, px = K.lerp(x, ex, a) + Math.sin(a * 6 + sd * 9) * 16, py = K.lerp(y, ey, a);
    ctx.save(); ctx.globalAlpha *= Math.min(1, a * 5) * Math.min(1, (1 - a) * 3); ctx.translate(px, py); ctx.rotate(0.25 * Math.sin(t * 5 + i)); note(ctx, 0, 0, (o.s ?? 0.9) * (0.8 + 0.3 * sd), o.col || C.black); ctx.restore(); }
}
// ---------- faceCover: the head cloth drawn across the lower face (eyes stay clear); k 0..1 slides it in from the far side; puff bulges it ----------
function mtFaceCover(ctx, P, k, puff = 0) {
  if (k <= 0.01) return; const h = mtHead(P), s = mtS(P), dir = P.dir || 1, tip = (P.tip || 0) * Math.sign(dir);
  ctx.save(); ctx.translate(h[0], h[1]); ctx.rotate(tip); ctx.scale(s * dir, s);
  const pts = [[-42, 8], [-20, 7], [0, 6 - puff], [20, 7], [42, 8], [38, 30], [22, 46 + puff], [0, 52 + puff], [-22, 46 + puff], [-38, 30]];
  ctx.beginPath(); ctx.rect(-50, -10, 8 + 92 * K.clamp(k), 80); ctx.clip();
  shape(ctx, [...pts, pts[0]], C.white, { lw: 5, seed: 790, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-30, 20); ctx.quadraticCurveTo(0, 30 + puff, 30, 18); ctx.moveTo(-24, 34); ctx.quadraticCurveTo(0, 42 + puff, 24, 32); ctx.stroke();
  ctx.restore();
}
