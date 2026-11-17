// ===== AN-149 props and effects (story drawings; reusable ones are listed in library_proposals.md) =====
const SM_WOODL = '#e2b56a', SM_INK = '#3a2a1a', SM_GREY = '#9a98a6', SM_GREYD = '#6f6d7a';
// writingTablet: a lawh (pale wood board with a handle tab and ink bands). (x, y) = board centre; s 1 = 70 x 95; o: {rot, n (lines 0..4), seed}
function smTablet(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  shape(ctx, [[-10, -60], [10, -60], [12, -46], [-12, -46], [-10, -60]], SM_WOODL, { lw: 3.5, seed: 801 });
  shape(ctx, [[-35, -47], [35, -47], [35, 44], [28, 48], [-28, 48], [-35, 44], [-35, -47]], SM_WOODL, { lw: 4.5, seed: 802, dot: '#c98a3a', pitch: 8, rad: 0.12, da: 0.3 });
  const n = o.n ?? 4, r = K.rng(o.seed ?? 3); ctx.lineWidth = 3.2; ctx.strokeStyle = SM_INK; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const y0 = -30 + i * 19; ctx.beginPath(); ctx.moveTo(24, y0); for (let k = 1; k <= 8; k++) ctx.lineTo(24 - k * 6, y0 + Math.sin(k * 1.7 + r() * 3) * 3); ctx.stroke(); }
  ctx.restore();
}
// oud: pear body (90 x 120 at s 1) centred at (x, y), neck toward rot (radians, 0 = up), bent pegbox, rose, four strings
function smOud(ctx, x, y, s = 1, rot = 0.9) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-9, -50], [9, -50], [7, -150], [-7, -150], [-9, -50]], '#7a4212', { lw: 4, seed: 811 });
  shape(ctx, [[-8, -150], [8, -150], [20, -182], [6, -186], [-8, -150]], '#7a4212', { lw: 3.5, seed: 812 });
  for (const py of [-158, -166, -174]) seg(ctx, py === -166 ? 16 : 14, py, 26, py - 3, 3, C.black, 0);
  const body = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2, rx = 45, ry = 60, k = Math.sin(a) < 0 ? 0.78 : 1; body.push([Math.cos(a) * rx * (Math.sin(a) < 0 ? 0.85 + 0.15 * (1 + Math.sin(a)) : 1), Math.sin(a) * ry * k + 8]); }
  shape(ctx, body, C.yellow, { lw: 5, seed: 813, dot: '#e8742a', pitch: 8, rad: 0.2, da: 0.45 });
  shape(ctx, ell(0, 0, 13, 13, 16), C.red, { lw: 3, seed: 814 }); shape(ctx, ell(0, 0, 6, 6, 10), C.black, { lw: 0 });
  shape(ctx, K.rectPts(-14, 40, 28, 7), '#7a4212', { lw: 2.5, seed: 815 });
  ctx.lineWidth = 1.6; ctx.strokeStyle = C.black; for (const sx of [-4.5, -1.5, 1.5, 4.5]) { ctx.beginPath(); ctx.moveTo(sx, 43); ctx.lineTo(sx * 0.6, -150); ctx.stroke(); }
  ctx.restore();
}
// musicNotes: quavers born every gap s from t0 at (x, y) (or fn(t) -> [x, y]), rising on seeded S-paths toward o.to (or up), life s
function smNotes(ctx, x, y, t, o = {}) {
  const gap = o.gap ?? 0.3, life = o.life ?? 1.5, r = K.rng(o.seed ?? 5), t0 = o.t0 ?? 0, t1 = o.t1 ?? 1e9, seeds = Array.from({ length: 80 }, () => r());
  for (let i = 0; i < 80; i++) { const b = t0 + i * gap; if (b > t1 || b > t) break; const a = (t - b) / life; if (a <= 0 || a >= 1) continue;
    const src = typeof x === 'function' ? x(b) : [x, y], sd = seeds[i], to = o.to, ex = to ? to[0] + (sd - 0.5) * 60 : src[0] + (sd - 0.5) * 140, ey = to ? to[1] + (sd - 0.5) * 30 : src[1] - 160 - sd * 50;
    const px = K.lerp(src[0], ex, a) + Math.sin(a * 6 + sd * 9) * 18, py = K.lerp(src[1], ey, K.ease.out(a));
    ctx.save(); ctx.globalAlpha *= Math.min(1, a * 5) * Math.min(1, (1 - a) * 3); ctx.translate(px, py); ctx.rotate(0.25 * Math.sin(t * 5 + i)); note(ctx, 0, 0, (o.s ?? 1) * (0.8 + 0.3 * sd), i % 3 === 1 ? C.red : C.black); ctx.restore(); }
}
// iconBalloon: a smooth speech balloon with one pointed tail and a picture inside. (x, y) centre, w x h, p 0..1 pop, tail [x, y] (world) or null.
//   inside(c): drawn clipped in balloon-local units (0, 0 = centre). o: {bg, seed, wob}
function smBalloon(ctx, x, y, w, h, p, tail, inside, o = {}) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k * (1 + (o.wob || 0)), k * (1 - (o.wob || 0)));
  const pts = ell(0, 0, w / 2, h / 2, 48);
  if (tail) { const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k, a = Math.atan2(ty, tx), bx = Math.cos(a) * w * 0.36, by = Math.sin(a) * h * 0.36, nx = -Math.sin(a) * 22, ny = Math.cos(a) * 22;
    shape(ctx, [[bx + nx, by + ny], [tx, ty], [bx - nx, by - ny], [bx + nx, by + ny]], C.white, { lw: 7, seed: 821 }); }
  shape(ctx, pts, o.bg || C.white, { lw: 8, seed: o.seed || 822 });
  if (tail) { const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k, a = Math.atan2(ty, tx); ctx.save(); K.poly(ctx, ell(0, 0, w / 2 - 6, h / 2 - 6, 48), true); ctx.clip(); ctx.fillStyle = o.bg || C.white;
    ctx.beginPath(); ctx.arc(Math.cos(a) * w * 0.36, Math.sin(a) * h * 0.36, 30, 0, 7); ctx.fill(); ctx.restore(); }
  if (inside) { ctx.save(); K.poly(ctx, ell(0, 0, w / 2 - 5, h / 2 - 5, 48), true); ctx.clip(); inside(ctx); ctx.restore(); }
  ctx.restore();
}
// question mark glyph (Bangers) with a black rim
function smQ(ctx, x, y, size, p = 1, col = C.blue, rot = 0) { const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = K.font(size, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.14; ctx.strokeStyle = C.black; ctx.strokeText('?', 0, size * 0.05); ctx.fillStyle = col; ctx.fillText('?', 0, size * 0.05); ctx.restore(); }
// mysteryFace: a paper disc with a blue question mark over a person's face (nobody has seen her). Draw after the person.
function smMystery(ctx, P, o = {}) { const h = smHead(P), r = 39 * smS(P) * (P.child ? 1.25 : 1);
  ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha; shape(ctx, ell(h[0], h[1] + 2 * smS(P), r, r, 30), C.paper, { lw: 4 * Math.max(0.6, smS(P)), seed: 831, dot: '#e8d7b0', pitch: 6, rad: 0.2, da: 0.4 });
  smQ(ctx, h[0], h[1] + 4 * smS(P), r * 1.6, 1, C.blue, 0.06 * Math.sin((o.t || 0) * 3));
  if (o.glint) star(ctx, h[0] + r * 0.8, h[1] - r * 0.7, 10 * smS(P) * o.glint, C.white); ctx.restore(); }
// book: closed (110 x 26 at s 1) centred at (x, y); o: {col, rot, open (0..1 spread the pages), page}
function smBook(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s); const col = o.col || C.red;
  if (o.open) { const op = o.open; for (const sd of [-1, 1]) { shape(ctx, [[0, 6], [sd * 58, 6 - 6 * op], [sd * 60, -30 * op - 4], [0, -24 * op - 2], [0, 6]], col, { lw: 4, seed: 841 + sd }); shape(ctx, [[0, 0], [sd * 54, -4 * op], [sd * 54, -28 * op], [0, -22 * op], [0, 0]], C.white, { lw: 3, seed: 843 + sd });
      ctx.lineWidth = 2; ctx.strokeStyle = SM_INK; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(sd * 10, -k * 6 * op); ctx.lineTo(sd * 46, -k * 6 * op - 2 * op); ctx.stroke(); } } }
  else { shape(ctx, K.rectPts(-55, -13, 110, 26), col, { lw: 4, seed: 845 }); shape(ctx, K.rectPts(-48, -8, 100, 15), C.white, { lw: 2.5, seed: 846 }); seg(ctx, -55, -13, -55, 13, 6, mixHex(col, C.black, 0.3), 2); }
  ctx.restore(); }
// bookStack: n books (110 x 26) stacked up from (x, y) (bottom); pops: k per book (0..1); o: {s, cols}
function smBookStack(ctx, x, y, n, o = {}) { const s = o.s || 1, cols = o.cols || [C.red, C.blue, C.yellow, GREEN, C.red, C.blue, C.yellow], r = K.rng(o.seed ?? 9);
  for (let i = 0; i < Math.ceil(n); i++) { const k = Math.min(1, n - i), dx = (r() - 0.5) * 16, y0 = y - (i + 0.5) * 26 * s; if (k <= 0) break; const kk = K.ease.back(K.clamp(k));
    ctx.save(); ctx.translate(x + dx * s, y0 - (1 - kk) * 30 * s); ctx.scale(kk, kk); smBook(ctx, 0, 0, s, { col: cols[i % cols.length], rot: (r() - 0.5) * 0.06 }); ctx.restore(); } }
// graveMarker: rounded stone (110 x 150 at s 1) on a low mound; (x, y) = ground point; o: {dark, rise 0..1 (out of the ground), rot}
function smGrave(ctx, x, y, s = 1, o = {}) { const rise = o.rise ?? 1; if (rise <= 0) return; ctx.save(); ctx.translate(x, y);
  shape(ctx, ell(0, -2, 90 * s, 16 * s, 24), o.dark ? '#3c3c48' : '#a8741a', { lw: 4, seed: 851 });
  ctx.save(); ctx.beginPath(); ctx.rect(-80 * s, -260 * s, 160 * s, 254 * s); ctx.clip(); ctx.translate(0, (1 - rise) * 160 * s); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  const pts = [[-55, -6]]; for (let i = 0; i <= 14; i++) { const a = Math.PI + i / 14 * Math.PI; pts.push([Math.cos(a) * 55, -95 + Math.sin(a) * 55]); } pts.push([55, -6], [-55, -6]);
  shape(ctx, pts, o.dark ? '#8c8a94' : C.paper, { lw: 5, seed: 852, dot: o.dark ? '#4a4a58' : '#b9b4c6', pitch: 8, rad: 0.22, da: 0.45 }); if (o.dark) { ctx.lineWidth = 4; ctx.strokeStyle = '#4a4a58'; ctx.beginPath(); ctx.moveTo(-30, -110); ctx.lineTo(30, -110); ctx.moveTo(-26, -92); ctx.lineTo(26, -92); ctx.stroke(); } ctx.restore(); ctx.restore(); }
// dream wash: blue halftone in the four corners of the panel view (1000 x 1230), strength a
function smDreamWash(ctx, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha = a; for (const [cx, cy] of [[0, 0], [1000, 0], [0, 1230], [1000, 1230]]) { const g = ctx.createRadialGradient(cx, cy, 60, cx, cy, 520);
    g.addColorStop(0, 'rgba(29,91,208,0.9)'); g.addColorStop(0.55, 'rgba(29,91,208,0.35)'); g.addColorStop(1, 'rgba(29,91,208,0)'); ctx.fillStyle = g; ctx.fillRect(cx - 520, cy - 520, 1040, 1040); }
  ctx.globalAlpha = a * 0.55; ctx.fillStyle = dotPat(ctx, C.blue, 14, 0.34); ctx.beginPath(); for (const [cx, cy] of [[0, 0], [1000, 0], [0, 1230], [1000, 1230]]) { ctx.moveTo(cx + 300, cy); ctx.arc(cx, cy, 300, 0, 7); } ctx.fill(); ctx.restore(); }
// goldGlow: yellow rays and star glints behind a figure; k strength 0..1.5
function smGlow(ctx, x, y, r, k, t) { if (k <= 0.01) return; ctx.save(); ctx.globalAlpha = Math.min(1, k); const n = 14;
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + t * 0.3, l = r * (0.9 + 0.25 * Math.sin(t * 3 + i * 2)) * Math.min(1.3, k); shape(ctx, [[x + Math.cos(a - 0.09) * r * 0.3, y + Math.sin(a - 0.09) * r * 0.3], [x + Math.cos(a) * l, y + Math.sin(a) * l], [x + Math.cos(a + 0.09) * r * 0.3, y + Math.sin(a + 0.09) * r * 0.3]], i % 2 ? C.yellow : '#ffe680', { lw: 3, seed: 861 + i }); }
  for (let i = 0; i < 5; i++) { const a = i * 1.3 + t * 0.5, q = 0.5 + 0.5 * Math.sin(t * 4 + i * 1.9); star(ctx, x + Math.cos(a) * r * 0.75, y + Math.sin(a) * r * 0.6, 12 * q * Math.min(1.3, k), C.white, t); } ctx.restore(); }
// oil lamp icon (s 1 = 120 wide); lit 0..1 flame (flickers with t); smoke curl when lit falls
function smLampIcon(ctx, x, y, s, lit, t, smoke = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-60, 0], [-40, 22], [36, 22], [62, -8], [80, -18], [60, -2], [44, -6], [-60, 0]], C.yellow, { lw: 5, seed: 871, dot: '#e8742a', pitch: 7, rad: 0.22, da: 0.5 });
  shape(ctx, [[-14, 22], [14, 22], [22, 38], [-22, 38], [-14, 22]], C.yellow, { lw: 4, seed: 872 }); seg(ctx, -66, -2, -84, -20, 10, C.yellow, 3.5);
  if (lit > 0.02) { const f = lit * (1 + 0.12 * Math.sin(t * 23) + 0.08 * Math.sin(t * 37)); ctx.save(); ctx.translate(76, -24); ctx.scale(f, f); shape(ctx, [[0, 0], [12, -18], [0, -48], [-12, -18], [0, 0]], C.red, { lw: 3.5, seed: 873 }); shape(ctx, [[0, -4], [6, -16], [0, -32], [-6, -16], [0, -4]], C.yellow, { lw: 0 }); ctx.restore(); }
  if (smoke > 0 && smoke < 1) { ctx.save(); ctx.globalAlpha = 1 - smoke; ctx.lineWidth = 6; ctx.strokeStyle = '#6f6d7a'; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 12; k++) { const u = k / 12; ctx.lineTo(76 + Math.sin(u * 7 + smoke * 4) * 12, -24 - u * 90 * (0.3 + smoke)); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// tick and cross marks (p 0..1 draws them on)
function smTick(ctx, x, y, r, p, col = '#2fa84a') { if (p <= 0) return; const pts = [[x - r * 0.7, y], [x - r * 0.2, y + r * 0.55], [x + r * 0.8, y - r * 0.6]], q = K.trim(pts, K.clamp(p));
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = r * 0.42; ctx.strokeStyle = C.black; K.poly(ctx, q); ctx.stroke(); ctx.lineWidth = r * 0.24; ctx.strokeStyle = col; K.poly(ctx, q); ctx.stroke(); ctx.restore(); }
function smCross(ctx, x, y, r, p, col = C.red) { if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; for (const [a, b, k] of [[[-1, -1], [1, 1], K.clamp(p * 2)], [[1, -1], [-1, 1], K.clamp(p * 2 - 1)]]) { if (k <= 0) continue;
    const e = [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k)]; ctx.lineWidth = r * 0.42; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + a[0] * r, y + a[1] * r); ctx.lineTo(x + e[0] * r, y + e[1] * r); ctx.stroke(); ctx.lineWidth = r * 0.26; ctx.strokeStyle = col; ctx.stroke(); } ctx.restore(); }
// eye icon (an eye seen from the front), optional red line through it (p)
function smEyeIcon(ctx, x, y, r, cross = 0) { shape(ctx, [[x - r, y], [x - r * 0.5, y - r * 0.55], [x + r * 0.5, y - r * 0.55], [x + r, y], [x + r * 0.5, y + r * 0.55], [x - r * 0.5, y + r * 0.55], [x - r, y]], C.white, { lw: 5, seed: 881 });
  shape(ctx, ell(x, y, r * 0.38, r * 0.38, 20), C.blue, { lw: 4, seed: 882 }); shape(ctx, ell(x, y, r * 0.16, r * 0.16, 12), C.black, { lw: 0 });
  if (cross > 0) { const k = K.clamp(cross); ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = r * 0.3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x - r, y - r * 0.8); ctx.lineTo(x - r + 2 * r * k, y - r * 0.8 + 1.6 * r * k); ctx.stroke(); ctx.lineWidth = r * 0.17; ctx.strokeStyle = C.red; ctx.stroke(); ctx.restore(); } }
// knowledge medallion: yellow-rimmed disc with an emblem: 'stars' (star chart), 'abacus', 'book' (open book and quill)
function smMedallion(ctx, x, y, r, kind, p, t = 0) { const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  shape(ctx, ell(0, 0, r, r, 30), kind === 'stars' ? NAVY : C.white, { lw: 6, seed: 891, dot: kind === 'stars' ? '#1b3a8f' : '#e8d7b0', pitch: 8, rad: 0.2, da: 0.4 });
  if (kind === 'stars') { star(ctx, -14, -10, 11, C.yellow); star(ctx, 16, -18, 8, C.yellow); star(ctx, 8, 16, 9, C.yellow); star(ctx, -20, 18, 6, C.white); ctx.lineWidth = 2; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(-14, -10); ctx.lineTo(16, -18); ctx.lineTo(8, 16); ctx.stroke(); }
  else if (kind === 'abacus') { shape(ctx, K.rectPts(-28, -22, 56, 44), '#c98a3a', { lw: 4, seed: 892 }); for (let i = 0; i < 3; i++) { const yy = -10 + i * 11; seg(ctx, -26, yy, 26, yy, 1.5, C.black, 0); for (let j = 0; j < 4; j++) shape(ctx, ell(-18 + j * 9 + (i === 1 ? 12 : 0), yy, 4.5, 4.5, 10), [C.red, C.blue, C.yellow][i], { lw: 1.5, seed: 893 }); } }
  else { smBook(ctx, 0, 8, 0.55, { col: C.blue, open: 1 }); seg(ctx, 10, -2, 30, -34, 4, C.white, 2); shape(ctx, [[30, -34], [36, -26], [18, -8], [30, -34]], C.white, { lw: 2.5, seed: 894 }); }
  ctx.restore(); ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r * k + 3, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
  if (p > 0 && p < 1.6) { const q = pulse(p, 0.2, 1.2); if (q > 0) for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28; seg(ctx, x + Math.cos(a) * (r + 10), y + Math.sin(a) * (r + 10), x + Math.cos(a) * (r + 10 + 24 * q), y + Math.sin(a) * (r + 10 + 24 * q), 3, C.black, 0); } } }
// cushion, mat, book stand with the lesson tablet, handkerchief pile
function smCushion(ctx, x, y, w = 120, col = C.red, dot = C.yellow) { shape(ctx, [[x - w / 2, y], [x - w / 2 + 6, y - 30], [x + w / 2 - 6, y - 30], [x + w / 2, y]], col, { lw: 5, seed: 901, dot, pitch: 8, rad: 0.2, da: 0.5 }); for (const sd of [-1, 1]) shape(ctx, ell(x + sd * (w / 2 - 2), y - 30, 6, 6, 8), C.yellow, { lw: 2.5, seed: 902 }); }
function smMat(ctx, x, y, w = 140) { ctx.save(); K.poly(ctx, ell(x, y, w / 2, 20, 28), true); ctx.fillStyle = '#e8b25a'; ctx.fill(); ctx.clip(); ctx.fillStyle = C.red; for (let k = -3; k <= 3; k++) ctx.fillRect(x + k * 20 - 4, y - 20, 8, 40); ctx.restore(); ink(ctx, ell(x, y, w / 2, 20, 28), 4, 903); }
function smStand(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); seg(ctx, -40, 0, 30, -88, 8, '#7a4212', 3); seg(ctx, 40, 0, -30, -88, 8, '#7a4212', 3); ctx.restore(); smTablet(ctx, x, y - 160 * s, 2.0 * s, { rot: -0.05, n: 4, seed: 7 }); }
function smHankies(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const [dx, dy, r] of [[-26, -6, 0.2], [18, -8, -0.3], [0, -22, 0.1], [-8, -34, -0.2]]) { ctx.save(); ctx.translate(dx, dy); ctx.rotate(r); shape(ctx, [[-26, 6], [-20, -10], [0, -14], [24, -8], [28, 6], [-26, 6]], C.white, { lw: 3.5, seed: 911, dot: '#9ec3ff', pitch: 6, rad: 0.25, da: 0.4 }); ctx.restore(); } ctx.restore(); }
// heart split in two halves (k 0..1 apart)
function smHeartSplit(ctx, x, y, r, k) { for (const sd of [-1, 1]) { ctx.save(); ctx.translate(x + sd * 14 * k, y + 20 * k * k); ctx.rotate(sd * 0.4 * k); ctx.beginPath(); ctx.rect(sd < 0 ? -r * 2 : 0, -r * 2, r * 2, r * 4); ctx.clip(); heart(ctx, 0, 0, r); ctx.restore(); }
  if (k > 0) { ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x, y - r * 0.6); ctx.lineTo(x - 6, y - r * 0.2); ctx.lineTo(x + 6, y + r * 0.1); ctx.lineTo(x, y + r * 0.6); ctx.stroke(); ctx.restore(); } }
// speed lines for the whip pan (panel space)
function smSpeed(ctx, k, seed = 3) { if (k <= 0.01) return; const r = K.rng(seed); ctx.save(); ctx.globalAlpha = Math.min(1, k); ctx.lineCap = 'round';
  for (let i = 0; i < 24; i++) { const y = r() * 1230, x = r() * 1000, l = 200 + r() * 400; ctx.lineWidth = 4 + r() * 6; ctx.strokeStyle = i % 3 ? C.white : C.black; ctx.beginPath(); ctx.moveTo(x - l / 2, y); ctx.lineTo(x + l / 2, y); ctx.stroke(); } ctx.restore(); }
// impact lines (small knocks, slams): n short strokes around (x, y), p 0..1 pulse
function smImpact(ctx, x, y, r, p, n = 5, a0 = 0) { if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.black; for (let i = 0; i < n; i++) { const a = a0 + (i / (n - 1) - 0.5) * 2.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.lineTo(x + Math.cos(a) * (r + 22 * p), y + Math.sin(a) * (r + 22 * p)); ctx.stroke(); } ctx.restore(); }
// CLOSED board on two cords hanging from a nail (nx, ny); swing angle a
function smClosedBoard(ctx, nx, ny, a, alpha = 1) { if (alpha <= 0) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(nx, ny); ctx.rotate(a);
  ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-60, 40); ctx.moveTo(0, 0); ctx.lineTo(60, 40); ctx.stroke(); shape(ctx, ell(0, 0, 6, 6, 10), '#4a5878', { lw: 2.5, seed: 921 });
  shape(ctx, K.rectPts(-80, 40, 160, 60), C.white, { lw: 5, seed: 922 }); ctx.font = K.font(46, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('CLOSED', 0, 72); ctx.restore(); }
