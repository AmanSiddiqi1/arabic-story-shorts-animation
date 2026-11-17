// ===== AN-108 props and effects: chest (treasureHoard), gems, rings, bowls, goldGlow, purse, WANTED poster, loupe, touchstone, badge, mask,
// coin eyes, anger flush, guard helmet, the chief's movable turban. Candidates for Library/ (see library_proposals.md).
const KS_GOLD = '#ffd21f', KS_GOLDD = '#e8a04a', KS_BRASS = '#c98a3a', KS_TIN = '#9a9aa6', KS_WOODC = '#8a501a', KS_WOODD = '#5b3010', KS_GREEN = '#3f9d4a', KS_GREEND = '#2b7a38';
const KS_GEMS = [C.red, C.blue, KS_GREEN, '#b04ad0'];
// cut gem: hexagon with a light top facet and a glint; fake 0..1 fades to pale flat glass
function ksGem(ctx, x, y, r, col, o = {}) {
  const f = o.fake || 0, c = mixHex(col, '#d8e4e8', f * 0.8), pts = []; for (let i = 0; i < 6; i++) { const a = (o.rot || 0) + i * Math.PI / 3 + Math.PI / 6; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.85]); }
  shape(ctx, [...pts, pts[0]], c, { lw: Math.max(2, r * 0.22), seed: 600 });
  if (f < 0.9) { ctx.save(); ctx.globalAlpha = 1 - f; ctx.fillStyle = mixHex(col, C.white, 0.5); ctx.beginPath(); ctx.moveTo(x - r * 0.5, y - r * 0.35); ctx.lineTo(x + r * 0.5, y - r * 0.35); ctx.lineTo(x + r * 0.2, y - r * 0.7); ctx.lineTo(x - r * 0.2, y - r * 0.7); ctx.fill(); ctx.restore(); }
  if (o.glint) star(ctx, x + r * 0.4, y - r * 0.5, r * 0.7 * o.glint, C.white, o.glint * 2);
}
// glass shard pair (the broken stone): two halves separating by u
function ksShards(ctx, x, y, r, u, col = C.red, fake = 1) {
  const c = mixHex(col, '#d8e4e8', fake * 0.8), d = 10 * u;
  shape(ctx, [[x - d - r, y], [x - d - r * 0.4, y - r * 0.9], [x - d + r * 0.1, y - r * 0.2], [x - d - r * 0.2, y + 2], [x - d - r, y]], c, { lw: 2.5, seed: 601 });
  shape(ctx, [[x + d + r, y], [x + d + r * 0.4, y - r * 0.8], [x + d - r * 0.05, y - r * 0.15], [x + d + r * 0.2, y + 2], [x + d + r, y]], c, { lw: 2.5, seed: 602 });
}
// ring: thick band with a stone on top; fake 0..1 gold -> brass
function ksRing(ctx, x, y, r, o = {}) {
  const f = o.fake || 0, band = o.tin ? mixHex(KS_GOLD, KS_TIN, f) : mixHex(KS_GOLD, KS_BRASS, f); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.turn == null ? 1 : Math.max(0.2, Math.abs(Math.cos(o.turn))), 1);
  ctx.lineWidth = r * 0.55 + 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.8, 0, 0, 7); ctx.stroke(); ctx.lineWidth = r * 0.55; ctx.strokeStyle = band; ctx.stroke(); ctx.restore();
  if (o.stone !== false) ksGem(ctx, x, y - r * 0.95, r * 0.5, o.stoneCol || C.red, { fake: o.stoneFake ?? f, glint: o.glint });
}
// bowl (cup): half ellipse; bend squashes it sideways; fake -> tin grey
function ksBowl(ctx, x, y, s = 1, o = {}) { const f = o.fake || 0, b = o.bend || 0, col = mixHex(KS_GOLD, KS_TIN, f); ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 - 0.25 * b), s); ctx.rotate(0.25 * b);
  shape(ctx, [[-26, -22], [26, -22], [20, -4], [8, 2], [-8, 2], [-20, -4], [-26, -22]], col, { lw: 4, seed: 603, dot: mixHex(KS_GOLDD, '#6e6e7a', f), pitch: 6, rad: 0.25, da: 0.5 }); shape(ctx, ell(0, -22, 26, 6, 14), mixHex('#c98a1a', '#55555f', f), { lw: 3, seed: 604 }); ctx.restore(); }
// necklace: an arc of beads
function ksNecklace(ctx, x0, y0, x1, y1, sag, f, seed) { const n = 9; for (let i = 0; i <= n; i++) { const u = i / n, x = K.lerp(x0, x1, u), y = K.lerp(y0, y1, u) + sag * Math.sin(Math.PI * u); shape(ctx, ell(x, y, 5, 5, 8), i % 3 === 1 ? mixHex(KS_GEMS[(seed + i) % 4], '#d8e4e8', f * 0.8) : mixHex(KS_GOLD, KS_BRASS, f), { lw: 2, seed: 605 }); } }
// goldGlow: tapering rays, a Ben-Day halo and staggered four-point glints; k 0..1
function goldGlow(ctx, x, y, r, t, k) {
  if (k <= 0.01) return; const R = K.rng(77); ctx.save(); ctx.globalAlpha = Math.min(1, k);
  for (let i = 0; i < 9; i++) { const a = -Math.PI + (i + 0.5) / 9 * Math.PI + (R() - 0.5) * 0.15, L = r * (0.9 + 0.5 * R()) * (0.85 + 0.15 * Math.sin(t * 3 + i)) * k, w = 0.07 + R() * 0.05;
    ctx.fillStyle = i % 2 ? C.yellow : '#fff3a8'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - w) * L, y + Math.sin(a - w) * L); ctx.lineTo(x + Math.cos(a + w) * L, y + Math.sin(a + w) * L); ctx.closePath(); ctx.fill(); }
  ctx.globalAlpha = 0.45 * Math.min(1, k); ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.32); ctx.beginPath(); ctx.ellipse(x, y, r * 0.75 * k, r * 0.5 * k, 0, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 5; i++) { const ph = (t * 0.9 + i * 0.37) % 1, s = Math.sin(Math.PI * ph); if (s < 0.2) continue; const a = -Math.PI * (0.15 + 0.7 * ((i * 0.618) % 1)), d = r * (0.35 + 0.4 * ((i * 0.41) % 1));
    star(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, 13 * s * k, C.white, t + i); }
}
// the chest (treasureHoard): feet centre (x, y). o: s, lid 0..1 (overshoot ok), rise 0..1 (heap height), fake 0..1 (heap), sq, rot, glint (x of a travelling highlight), noRing
function ksChest(ctx, x, y, o = {}) {
  const s = o.s || 1, u = o.lid || 0, f = o.fake || 0, sq = o.sq ?? 1; ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (1 + (1 - sq) * 0.7), s * sq);
  const W = 85, Hb = 95, rim = -Hb;
  // lid open: inner face behind the heap
  if (u >= 0.5) { const H = 88 * Math.min(1.15, (u - 0.5) / 0.5 * 1.0 + 0.0), top = rim - Math.max(20, H);
    shape(ctx, [[-W - 2, rim], [-W - 10, top], [W + 10, top], [W + 2, rim], [-W - 2, rim]], '#7a1810', { lw: 5, seed: 610, dot: '#a8261a', pitch: 8, rad: 0.25, da: 0.5 });
    seg(ctx, -W - 10, top + 2, W + 10, top + 2, 9, KS_GOLD, 3); shape(ctx, ell(0, top - 8, W + 12, 12, 24).filter(([, yy]) => yy <= top - 7).concat([[-W - 12, top - 8]]), KS_WOODC, { lw: 4, seed: 611 }); }
  // heap of treasure, above the rim (clipped to the box mouth + a mound)
  const rise = (o.rise ?? (u > 0.15 ? 1 : 0)) * Math.min(1, u * 1.6);
  if (rise > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(-W + 2, rim - 90, 2 * W - 4, 92); ctx.clip(); const hy = rim + 30 - 48 * rise;
    shape(ctx, [[-W + 4, rim + 4], [-W + 10, hy + 14], [-40, hy - 2], [0, hy - 12], [40, hy - 2], [W - 10, hy + 12], [W - 4, rim + 4]], mixHex(KS_GOLD, KS_BRASS, f), { lw: 4, seed: 612, dot: mixHex('#e8742a', '#7a5a2a', f), pitch: 7, rad: 0.3, da: 0.6 });
    ksBowl(ctx, -46, hy + 10, 0.8, { fake: f }); ksBowl(ctx, 50, hy + 8, 0.7, { fake: f });
    ksNecklace(ctx, -70, hy + 8, -10, hy + 2, 16, f, 1); ksNecklace(ctx, 0, hy - 6, 66, hy + 4, 14, f, 2);
    [[-22, hy - 6, 9], [22, hy - 10, 8], [-62, hy + 16, 7], [66, hy + 18, 7], [6, hy + 6, 7], [36, hy + 16, 8]].forEach(([gx, gy, r], i) => { if (o.noRing && i === 1) return; ksRing(ctx, gx, gy + 6, r, { fake: f, stoneCol: KS_GEMS[i % 4] }); });
    [[-34, hy + 2, 8, 0], [12, hy - 14, 9, 1], [-6, hy + 18, 7, 2], [58, hy - 2, 8, 3], [-74, hy + 20, 6, 1], [30, hy + 2, 7, 0]].forEach(([gx, gy, r, c]) => { if (o.noGems && c < 2) return; ksGem(ctx, gx, gy, r, KS_GEMS[c], { fake: f }); });
    if (o.glint != null && f < 0.5) { const gx = K.lerp(-W, W, o.glint); star(ctx, gx, hy - 4 + 10 * Math.abs(Math.sin(gx * 0.05)), 16 * (1 - f), C.white, gx * 0.05); }
    ctx.restore(); }
  // body
  shape(ctx, K.rectPts(-W, rim, 2 * W, Hb), KS_WOODC, { lw: 6, seed: 613, dot: KS_WOODD, pitch: 9, rad: 0.2, da: 0.4 });
  for (const bx of [-48, 48]) shape(ctx, K.rectPts(bx - 9, rim, 18, Hb), KS_GOLD, { lw: 4, seed: 614, dot: KS_GOLDD, pitch: 6, rad: 0.25, da: 0.4 });
  shape(ctx, K.rectPts(-W, rim, 2 * W, 14), KS_GOLD, { lw: 4, seed: 615 });
  for (const [sx, sy] of [[-W + 10, rim + 26], [W - 10, rim + 26], [-W + 10, -12], [W - 10, -12]]) shape(ctx, ell(sx, sy, 5, 5, 8), C.white, { lw: 2.5, seed: 616 });
  for (const sd of [-1, 1]) { ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(sd * (W + 6), -58, 11, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = KS_GOLD; ctx.stroke(); ctx.restore(); }
  // closed / opening dome
  if (u < 0.5) { const g = 46 * u * 2, dh = 45 + 10 * u; ctx.save(); ctx.translate(0, -g);
    const dome = ell(0, rim, W + 4, dh, 32).filter(([, yy]) => yy <= rim + 0.5); shape(ctx, [...dome, [-W - 4, rim], dome[0]], KS_WOODC, { lw: 6, seed: 617, dot: KS_WOODD, pitch: 9, rad: 0.2, da: 0.4 });
    for (const bx of [-48, 48]) seg(ctx, bx, rim - 2, bx * 0.8, rim - dh * 0.92, 14, KS_GOLD, 3.5);
    shape(ctx, K.rectPts(-11, rim - 10, 22, 22), KS_GOLD, { lw: 3.5, seed: 618 }); shape(ctx, ell(0, rim + 4, 4, 5, 8), C.black, { lw: 1, seed: 619 }); ctx.restore(); }
  ctx.restore();
  return { rim: [x, y - Hb * s * sq], lidFront: [x, y - (Hb + (u < 0.5 ? 46 * u * 2 : 110 * Math.min(1, (u - 0.5) * 2))) * s * sq], heap: [x, y - (Hb + 20) * s], handles: [[x - (W + 6) * s, y - 58 * s], [x + (W + 6) * s, y - 58 * s]] };
}
// fat coin purse with drawstring
function ksPurse(ctx, x, y, s = 1, o = {}) { if (s <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
  shape(ctx, [[-26, -40], [-34, -8], [-30, 20], [0, 30], [30, 20], [34, -8], [26, -40], [10, -46], [-10, -46], [-26, -40]], '#c9702a', { lw: 5, seed: 620, dot: '#8a4a12', pitch: 7, rad: 0.25, da: 0.5 });
  shape(ctx, [[-14, -46], [14, -46], [10, -58], [-10, -58], [-14, -46]], '#a85a1a', { lw: 4, seed: 621 }); seg(ctx, -16, -48, 16, -48, 4, C.yellow, 2); seg(ctx, 8, -50, 22, -66, 3, C.black, 0); seg(ctx, 4, -50, -12, -68, 3, C.black, 0);
  shape(ctx, ell(0, -6, 13, 13, 14), C.yellow, { lw: 3.5, seed: 622 }); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-4, -12); ctx.lineTo(4, -12); ctx.moveTo(0, -16); ctx.lineTo(0, 4); ctx.stroke(); ctx.restore(); }
// a pile of coins (s 0..1 grows the pile)
function ksCoinPile(ctx, x, y, n, s = 1) { const m = Math.round(n * s); for (let i = 0; i < m; i++) { const col = i % 4, lay = Math.floor(i / 4); shape(ctx, ell(x + (col - 1.5) * 24 + (lay % 2) * 12, y - lay * 9, 14, 6, 12), C.yellow, { lw: 3, seed: 623 }); } }
// badge of office: yellow disc with a black star
function ksBadge(ctx, x, y, r = 13, rot = 0) { shape(ctx, ell(x, y, r, r, 16), C.yellow, { lw: 3.5, seed: 624, dot: KS_GOLDD, pitch: 5, rad: 0.25, da: 0.4 }); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); star(ctx, 0, 0, r * 0.62, C.black, 0); ctx.restore(); }
// thief mask (a black band with two eye holes)
function ksMask(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-30, -8], [30, -8], [34, 6], [8, 10], [0, 4], [-8, 10], [-34, 6], [-30, -8]], C.black, { lw: 2, seed: 625 });
  ctx.fillStyle = C.white; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 14, 0, 7, 4, 0, 0, 7); ctx.fill(); } seg(ctx, -32, -2, -46, 4, 3, C.black, 0); seg(ctx, 32, -2, 46, 4, 3, C.black, 0); ctx.restore(); }
// WANTED poster: paper sheet with the masked thief's face and a coin pile; (x, y) centre; o.rot, o.s
function ksPoster(ctx, x, y, o = {}) {
  const s = o.s || 1; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  shape(ctx, K.rectPts(-52, -68, 110, 140), '#9fd8e8', { lw: 0, seed: 626 });
  shape(ctx, K.rectPts(-55, -70, 110, 140), '#fff3d6', { lw: 5, seed: 627, dot: '#efdcae', pitch: 9, rad: 0.25, da: 0.4 });
  ctx.font = K.font(30, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.strokeText('WANTED', 0, -50); ctx.fillStyle = C.red; ctx.fillText('WANTED', 0, -50);
  ctx.save(); ctx.beginPath(); ctx.rect(-38, -32, 76, 70); ctx.clip(); ctx.fillStyle = '#ffe9a8'; ctx.fillRect(-40, -34, 80, 74);
  person(ctx, { x: 0, y: 6 + 0.52 * 194, s: 0.52, costume: 'thief', mouth: 'smile', brow: 0.6, noBlink: true }); ctx.restore();
  ink(ctx, [[-38, -32], [38, -32], [38, 38], [-38, 38], [-38, -32]], 4, 628);
  for (let i = 0; i < 3; i++) shape(ctx, ell(-14 + i * 14, 56 - (i === 1 ? 6 : 0), 9, 4, 10), C.yellow, { lw: 2.5, seed: 629 });
  if (!o.fallen) { shape(ctx, ell(-44, -60, 5, 5, 8), C.red, { lw: 2, seed: 630 }); shape(ctx, ell(44, -60, 5, 5, 8), C.red, { lw: 2, seed: 630 }); }
  ctx.restore();
}
// loupe: black ring with a pale lens and a short handle; when o.eye is given the magnified eye is drawn inside (gaze [gx, gy], lid)
function ksLoupe(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  seg(ctx, 16, 14, 28, 30, 9, C.black, 0);
  if (o.eye) { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 19, 0, 7); ctx.clip(); ctx.fillStyle = '#ffe0d6'; ctx.fillRect(-20, -20, 40, 40); eye2(ctx, 0, 1, 'wide', o.eye[0], o.eye[1], o.lid || 0, '#ffe0d6', false); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#9cc4ff'; ctx.beginPath(); ctx.arc(0, 0, 19, 0, 7); ctx.fill(); ctx.restore();
  ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.arc(-6, -6, 9, 3.6, 4.6); ctx.stroke(); ctx.restore(); }
// touchstone: black slab with a streak (0..1 long, colour from gold to grey)
function ksTouchstone(ctx, x, y, s = 1, streak = 0, f = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, K.rectPts(-25, -8, 50, 16), '#2a2a30', { lw: 3, seed: 631 });
  if (streak > 0) { ctx.lineCap = 'round'; ctx.lineWidth = 4; ctx.strokeStyle = mixHex(KS_GOLD, '#8c8a94', f); ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(-16 + 32 * streak, -1); ctx.stroke(); } ctx.restore(); }
// crossed fingers (a small hand with two crossed fingers)
function ksCrossed(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); seg(ctx, -2, 0, -8, -24, 7, C.white, 3); seg(ctx, 4, 0, -10, -22, 7, '#ffe0d6', 3); shape(ctx, ell(0, 4, 11, 10, 12), C.white, { lw: 3, seed: 632, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }

// ---------- face overlays on a Library person ----------
// coin eyes: both pupils become gold discs (k pops 0..1 with overshoot)
function ksCoinEyes(ctx, P, k, t) { if (k <= 0.01) return; const h = ksHeadL(P), s = P.s * (P.sq ?? 1), ey = h[1] - 4, lk = P.look || 0;
  for (const sd of [-1, 1]) { const p = ksW(P, [h[0] + sd * 13 + lk * 3, ey]), r = 10 * s * k; shape(ctx, ell(p[0], p[1], r, r, 14), C.yellow, { lw: 3, seed: 633 }); ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(p[0] - r * 0.25, p[1] - r * 0.45); ctx.lineTo(p[0] - r * 0.25, p[1] + r * 0.45); ctx.moveTo(p[0] + r * 0.25, p[1] - r * 0.45); ctx.lineTo(p[0] + r * 0.25, p[1] + r * 0.45); ctx.stroke(); ctx.restore();
    star(ctx, p[0] + r * 0.5, p[1] - r * 0.5, 5 * k * (0.7 + 0.3 * Math.sin(t * 9 + sd)), C.white, t * 3); } }
// face light: a yellow multiply tint clipped to the head (k 0..1)
function ksFaceLight(ctx, P, k, col = '#ffd21f') { if (k <= 0.02) return; const c = ksHead(P), r = 37 * P.s; ctx.save(); ctx.beginPath(); ctx.arc(c[0], c[1], r, 0, 7); ctx.clip(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.55 * k;
  const g = ctx.createLinearGradient(0, c[1] + r, 0, c[1] - r); g.addColorStop(0, col); g.addColorStop(1, '#ffffff'); ctx.fillStyle = g; ctx.fillRect(c[0] - r, c[1] - r, 2 * r, 2 * r); ctx.restore(); }
// anger flush: red dots climbing the face from the chin (k 0..1), two steam puffs at the head sides
function ksFlush(ctx, P, k, t) { if (k <= 0.01) return; const c = ksHead(P), r = 37 * P.s, line = c[1] + r - 2 * r * k; ctx.save(); ctx.beginPath(); ctx.arc(c[0], c[1], r - 2, 0, 7); ctx.clip(); ctx.beginPath(); ctx.rect(c[0] - r, line, 2 * r, 2 * r); ctx.clip();
  ctx.globalAlpha = 0.85; ctx.fillStyle = dotPat(ctx, C.red, 7, 0.42); ctx.fillRect(c[0] - r, c[1] - r, 2 * r, 2 * r); ctx.restore();
  if (k > 0.5) for (const sd of [-1, 1]) { const u = ((t * 1.6 + (sd > 0 ? 0.5 : 0)) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * K.clamp((k - 0.5) * 3); cloudFlat(ctx, c[0] + sd * (r + 18 + 24 * u), c[1] - r * 0.6 - 40 * u, 0.28 + 0.2 * u); ctx.restore(); } }
// guard helmet: pointed iron helmet with a neck cloth, drawn over a head with pal {head: 'none'}
function ksHelmet(ctx, P, col) { const c = ksHead(P), s = P.s; ctx.save(); ctx.translate(c[0], c[1]); ctx.scale(s * (P.dir || 1), s); ctx.rotate(P.tilt || 0);
  shape(ctx, [[-40, -20], [-44, 30], [-30, 30], [-32, -10]], col, { lw: 4, seed: 634 }); shape(ctx, [[40, -20], [44, 30], [30, 30], [32, -10]], col, { lw: 4, seed: 634 });
  const dome = ell(0, -18, 42, 36, 28).filter(([, y]) => y <= -17.5); shape(ctx, [...dome, [-42, -18], dome[0]], '#9aa6b8', { lw: 5, seed: 635, dot: '#5a6478', pitch: 7, rad: 0.22, da: 0.5 });
  shape(ctx, [[-6, -52], [0, -70], [6, -52], [-6, -52]], '#9aa6b8', { lw: 4, seed: 636 }); seg(ctx, -42, -18, 42, -18, 7, C.yellow, 3); ctx.restore(); }
// the chief's turban drawn on its own so it can jump and slip (the person is drawn with pal head 'none')
function ksHat(ctx, P, D, slip = [0, 0, 0]) { const h = ksHeadL(P), c = ksW(P, h), s = P.s, dir = P.dir || 1, sq = P.sq ?? 1; ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate((P.tip || 0) * dir + ksLean(P) * dir); ctx.scale(s * dir * (1 + (1 - sq) * 0.7), s * sq); ctx.rotate(P.tilt || 0);
  ctx.translate(slip[0], slip[1]); ctx.rotate(slip[2]); personHeadwear(ctx, 0, 0, D, P, 'front'); ctx.restore(); }
