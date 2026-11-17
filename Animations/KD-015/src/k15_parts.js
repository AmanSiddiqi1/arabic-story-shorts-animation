// ===== KD-015 The Ascetic, the Ghee, and the Honey: story drawings (hanging jar, goat/cow, dream pictograms, goo, shards) =====
// Every drawing is world units, a pure function of its arguments. Reusable candidates are listed in library_proposals.md.
const K15GHEE = '#ffd21f', K15HONEY = '#e08a1a', K15CLAY = '#c8481a', K15CLAYD = '#7a4212', K15GRASS = '#3f9d4a', K15GRASSD = '#2b7a38', K15WHEAT = '#f2c230';
const k15c = (x) => K.clamp(x);
const k15e = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / Math.max(1e-6, d)));
const k15in = (t, a, b) => t >= a && t < b;
const k15pop = (t, a, d = 0.25) => (t < a ? 0 : K.ease.back(K.clamp((t - a) / d)));
const k15lp = (a, b, f) => [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)];

// ---------- hangingJar ----------
// k15Jar(ctx, o): clay jar on a rope from a ceiling hook. Origin of the jar frame = rope tie at the neck top; the jar is 130 x 150 below it.
//   o: {hx, hy (rope top), L (rope length), ang (sway, radians), fill 0..1 (cutaway window level), glint 0..1, glintCol, crack 0..1, ooze 0..1,
//       drip 0..1 (a bead under the base), halo (paper outline when it sits on a thought cloud), broken (only the rope and the neck stub), jump (px up)}
const K15JAR = [[-24, 0], [24, 0], [26, 14], [54, 38], [65, 78], [57, 118], [32, 143], [0, 150], [-32, 143], [-57, 118], [-65, 78], [-54, 38], [-26, 14]];
function k15JarPoint(o, lx, ly) { const a = o.ang || 0, L = o.L - (o.jump || 0), c = Math.cos(a), s = Math.sin(a); return [o.hx + lx * c - (L + ly) * s, o.hy + lx * s + (L + ly) * c]; }
function k15Jar(ctx, o) {
  const a = o.ang || 0, L = o.L - (o.jump || 0);
  ctx.save(); ctx.translate(o.hx, o.hy); ctx.rotate(a);
  seg(ctx, 0, 0, 0, L + 4, 4, '#a8741a', 1.5);                                           // the rope
  ctx.translate(0, L);
  if (o.broken) {                                                                          // the neck stub with a jagged edge
    shape(ctx, [[-24, 0], [24, 0], [27, 14], [40, 26], [30, 36], [22, 28], [12, 40], [0, 30], [-10, 42], [-22, 30], [-34, 36], [-40, 24], [-27, 14]], K15CLAY, { lw: 4.5, seed: 801, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
    if (o.goo) { const g = o.goo; shape(ctx, [[-20, 30], [20, 30], [10, 36 + g * 60], [0, 44 + g * 80], [-10, 36 + g * 60]], K15HONEY, { lw: 3.5, seed: 802 }); }
    shape(ctx, ell(0, 1, 24, 6, 14), K15CLAYD, { lw: 3, seed: 803 }); ctx.restore(); return;
  }
  if (o.halo) { ctx.save(); K.poly(ctx, K15JAR, true); ctx.lineJoin = 'round'; ctx.lineWidth = 26; ctx.strokeStyle = C.paper; ctx.stroke(); ctx.restore(); }
  shape(ctx, K15JAR, K15CLAY, { lw: 5.5, seed: 804, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
  // cutaway window with the level of ghee (top) over honey (bottom)
  const f = k15c(o.fill ?? 0), wy0 = 46, wy1 = 128, ly = wy1 - (wy1 - wy0) * f;
  shape(ctx, K.rectPts(-16, wy0, 32, wy1 - wy0), '#fff3d6', { lw: 3.5, seed: 805 });
  if (f > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(-16, wy0, 32, wy1 - wy0); ctx.clip(); const mid = (ly + wy1) / 2;
    ctx.fillStyle = K15HONEY; ctx.fillRect(-16, mid, 32, wy1 - mid); ctx.fillStyle = K15GHEE; ctx.fillRect(-16, ly, 32, mid - ly);
    if (o.pulse) { ctx.globalAlpha = o.pulse; ctx.fillStyle = o.pulseCol || C.white; ctx.fillRect(-16, ly, 32, wy1 - ly); }
    ctx.restore(); seg(ctx, -16, ly, 16, ly, 2, C.black, 0); }
  shape(ctx, ell(0, 2, 24, 6, 14), K15CLAYD, { lw: 3, seed: 806 });
  for (const yy of [8, 14]) { ctx.save(); ctx.strokeStyle = '#a8741a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-25, yy); ctx.lineTo(25, yy); ctx.stroke(); ctx.restore(); }
  // the crack: from the struck point (right of the belly) toward the left in three jumps
  if (o.crack > 0) { const P = [[60, 86], [40, 74], [32, 96], [10, 82], [-4, 104], [-24, 88], [-36, 110], [-58, 96]], n = Math.max(2, Math.ceil(o.crack * P.length));
    const q = P.slice(0, n); ctx.save(); ctx.lineJoin = 'miter'; ctx.lineWidth = 5; ctx.strokeStyle = C.black; K.poly(ctx, q); ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = C.white; K.poly(ctx, q.map(([x, y]) => [x, y - 3])); ctx.stroke(); ctx.restore();
    if (o.ooze > 0) shape(ctx, [[36, 92], [44, 92], [42, 96 + 26 * o.ooze], [38, 100 + 30 * o.ooze], [34, 96 + 26 * o.ooze]], K15GHEE, { lw: 2.5, seed: 807 }); }
  if (o.drip > 0) { const d = o.drip, r = 4 + 4 * Math.min(1, d * 1.5), st = Math.max(0, d - 0.6) * 30; shape(ctx, [[-4, 147], [4, 147], [r * 0.9, 150 + st + r], [0, 152 + st + 2 * r], [-r * 0.9, 150 + st + r]], K15HONEY, { lw: 2.5, seed: 808 }); }
  if (o.glint > 0) { ctx.save(); ctx.globalAlpha = o.glint; star(ctx, -34, 54, 16 * o.glint, o.glintCol || C.white, 0.3); ctx.restore(); }
  ctx.restore();
}
// shards: nine seeded clay pieces from the jar belly; world position from the time since the smash (fall, one bounce, skid, rest)
const K15SHARDS = (() => { const r = K.rng(1515), out = []; for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 8) + (r() - 0.5) * 0.3;
  out.push({ vx: Math.cos(a) * (120 + r() * 160), vy: -40 - r() * 160, sz: 14 + r() * 16, spin: (r() - 0.5) * 14, seed: 820 + i, big: i === 6, rest: 0 }); } return out; })();
function k15ShardPos(sh, x0, y0, d, floor = 893) {
  const g = 1500; let x = x0 + sh.vx * Math.min(d, 1.2), y = y0 + sh.vy * d + 0.5 * g * d * d, rot = sh.spin * Math.min(d, 1.0);
  const tl = (-sh.vy + Math.sqrt(sh.vy * sh.vy + 2 * g * (floor - y0))) / g;   // landing time
  if (d > tl) { const e = d - tl, vb = 0.25 * (sh.vy + g * tl), bt = 2 * vb / g; const sk = Math.min(e, 0.5); x = x0 + sh.vx * tl + sh.vx * 0.35 * (sk - sk * sk); y = floor - (e < bt ? vb * e - 0.5 * g * e * e : 0); rot = sh.spin * tl + sh.spin * 0.2 * Math.min(e, 0.4); }
  return [x, y, rot];
}
function k15Shard(ctx, x, y, rot, sz, seed, big, honey) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  if (big) { shape(ctx, [[-sz * 1.5, -sz * 0.9], [sz * 1.5, -sz * 0.8], [sz * 1.1, 0], [0, sz * 0.25], [-sz * 1.1, 0]], K15CLAY, { lw: 4, seed, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
    if (honey > 0) shape(ctx, ell(0, -sz * 0.55, sz * 1.1 * honey, sz * 0.28 * honey, 14), K15HONEY, { lw: 2.5, seed: seed + 1 }); }
  else shape(ctx, [[-sz, -sz * 0.4], [sz * 0.3, -sz * 0.7], [sz, sz * 0.1], [-sz * 0.2, sz * 0.5]], K15CLAY, { lw: 4, seed, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
  ctx.restore();
}

// ---------- goat (kinds goat, kid, cow) ----------
// k15Goat(ctx, o): side-view farm animal, feet at (x, y), facing dir. o: {s, dir, kind, ph, amp, head (0 up .. 1 graze), chew, fat, lid, hop, col, alpha, bleat}
function k15Goat(ctx, o) {
  const s0 = o.s == null ? 1 : o.s; if (s0 <= 0.001) return;   // v3: a pop scale of 0 must not read as full size
  const cow = o.kind === 'cow', kid = o.kind === 'kid', s = s0 * (kid ? 0.55 : 1), dir = o.dir || 1, ph = o.ph || 0, amp = o.amp || 0, hd = o.head || 0;
  const bw = cow ? 70 : 52, bh = (cow ? 34 : 26) * (1 + (o.fat || 0) * 0.18), leg = cow ? 58 : kid ? 66 : 54, by = -leg - bh * 0.7 - (o.hop || 0);
  const col = o.col || (cow ? C.white : C.white), patch = cow ? C.black : '#8a501a';
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.translate(o.x, o.y); ctx.scale(dir * s, s);
  // legs (far pair first), swing with the walk phase
  for (const [lx, sd, far] of [[-bw * 0.62, 1, 1], [bw * 0.55, -1, 1], [-bw * 0.55, -1, 0], [bw * 0.62, 1, 0]]) { const sw = Math.sin(ph + (sd > 0 ? 0 : Math.PI)) * amp * 14;
    seg(ctx, lx, by + bh * 0.5, lx + sw, -(o.hop || 0), cow ? 13 : 9, far ? mixHex(col, '#7a6a5a', 0.35) : col, 3.5); shape(ctx, K.rectPts(lx + sw - 6, -(o.hop || 0) - 7, 12, 7), C.black, { lw: 0 }); }
  // tail
  if (cow) { const sw = Math.sin((o.t || 0) * 3) * 0.3; seg(ctx, -bw * 0.95, by - bh * 0.3, -bw * 1.05 - 8 * sw, by + bh * 1.2, 4, C.black, 0); shape(ctx, ell(-bw * 1.05 - 8 * sw, by + bh * 1.35, 6, 9, 10), C.black, { lw: 0 }); }
  else shape(ctx, [[-bw * 0.9, by - bh * 0.4], [-bw * 1.15, by - bh * 1.2 - Math.sin((o.t || 0) * 9) * 4], [-bw * 0.8, by - bh * 0.6]], col, { lw: 3, seed: 831 });
  // body
  shape(ctx, ell(0, by, bw, bh, 26), col, { lw: 4.5, seed: 832, dot: cow ? null : '#b9b4c6', pitch: 7, rad: 0.22, da: 0.35 });
  if (cow) { shape(ctx, ell(-bw * 0.3, by - bh * 0.25, bw * 0.3, bh * 0.45, 14), C.black, { lw: 0 }); shape(ctx, ell(bw * 0.35, by + bh * 0.2, bw * 0.22, bh * 0.35, 12), C.black, { lw: 0 }); shape(ctx, ell(bw * 0.2, by + bh * 0.85, 12, 7, 10), '#f7a8b8', { lw: 3 }); }
  else if (!kid) shape(ctx, ell(-bw * 0.15, by - bh * 0.1, bw * 0.48, bh * 0.68, 14), patch, { lw: 0 });   // v2: larger patch so goats read against the paper
  // neck and head (head dips to graze)
  const nx = bw * 0.8, ny = by - bh * 0.5, hx = nx + 22 + hd * 10, hy = ny - (kid ? 20 : 26) + hd * (leg + 10), hr = kid ? 18 : cow ? 22 : 17;
  seg(ctx, bw * 0.55, by - bh * 0.2, hx - 4, hy + 4, cow ? 26 : 18, col, 4);
  if (!kid) { const hc = cow ? '#fff3d6' : '#c9bfa6'; ctx.save(); ctx.lineWidth = cow ? 7 : 6; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx - 4, hy - hr * 0.7); if (cow) ctx.quadraticCurveTo(hx - 2, hy - hr * 1.4, hx + 8, hy - hr * 1.5); else ctx.quadraticCurveTo(hx - 12, hy - hr * 2.2, hx - 26, hy - hr * 1.3); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = hc; ctx.stroke(); ctx.restore(); }
  shape(ctx, ell(hx, hy, hr * (cow ? 1.05 : 0.95), hr * 0.8, 18), col, { lw: 4, seed: 833 });
  shape(ctx, ell(hx + hr * 0.75, hy + hr * 0.3 + (o.chew || 0) * 2, hr * 0.5, hr * 0.42, 12), cow ? '#f7a8b8' : col, { lw: 3.5, seed: 834 });
  shape(ctx, [[hx - hr * 0.6, hy - hr * 0.3], [hx - hr * 1.3, hy + hr * 0.1], [hx - hr * 0.5, hy + hr * 0.2]], cow ? col : patch, { lw: 3, seed: 835 });   // ear
  if (!cow && !kid) shape(ctx, [[hx + hr * 0.5, hy + hr * 0.8], [hx + hr * 0.9, hy + hr * 0.8], [hx + hr * 0.62, hy + hr * 1.6]], '#c9bfa6', { lw: 2.5, seed: 836 });   // beard
  const ex = hx + hr * 0.15, ey = hy - hr * 0.2, lid = o.lid || 0; ctx.save(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(ex, ey, kid ? 6.5 : 5.5, 0, 7); ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke();
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(ex + 1.5, ey + 0.5, kid ? 3.4 : 2.8, 0, 7); ctx.fill();
  if (lid > 0) { ctx.fillStyle = col; ctx.fillRect(ex - 7, ey - 7, 14, 14 * lid); ctx.beginPath(); ctx.moveTo(ex - 7, ey - 7 + 14 * lid); ctx.lineTo(ex + 7, ey - 7 + 14 * lid); ctx.stroke(); } ctx.restore();
  if (o.bleat > 0) { ctx.save(); ctx.globalAlpha *= o.bleat; ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(hx + hr, hy + 4, hr + 10 + i * 10, -0.5, 0.5); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
}

// ---------- dream pictograms (dreamProps): bold, few lines, readable small ----------
function k15Coin(ctx, x, y, r = 10, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(Math.cos(rot))), 1); shape(ctx, ell(0, 0, r, r, 14), C.yellow, { lw: 3, seed: 841 }); seg(ctx, -r * 0.35, 0, r * 0.35, 0, 2, '#e0a800', 0); ctx.restore(); }
function k15Coins(ctx, x, y, n, s = 1) {   // a pile of n coins, base at y
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); let k = 0;
  for (let row = 0; k < n; row++) { const m = Math.max(1, 6 - row); for (let i = 0; i < m && k < n; i++, k++) { const cx = (i - (m - 1) / 2) * 18, cy = -8 - row * 13; shape(ctx, ell(cx, cy, 11, 6, 12), C.yellow, { lw: 3, seed: 842 + (k % 5) }); } }
  ctx.restore();
}
function k15Stall(ctx, x, y, s = 1) {   // small market stall: posts, striped awning, counter. Base at y.
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const px of [-80, 80]) seg(ctx, px, 0, px, -150, 8, WOOD, 3);
  shape(ctx, K.rectPts(-90, -62, 180, 62), BARKY, { lw: 5, seed: 851, dot: '#7a4212', pitch: 8, rad: 0.18, da: 0.4 });
  shape(ctx, K.rectPts(-96, -72, 192, 14), WOOD, { lw: 4, seed: 852 });
  const aw = [[-104, -150], [104, -150], [112, -118], [-112, -118]]; ctx.save(); K.poly(ctx, aw, true); ctx.clip(); for (let i = -6; i < 6; i++) { ctx.fillStyle = i % 2 ? C.red : C.white; ctx.fillRect(i * 20, -152, 20, 40); } ctx.restore(); ink(ctx, [...aw, aw[0]], 5, 853);
  ctx.restore();
}
function k15Abacus(ctx, x, y, s, beads) {   // beads: per rod 0..1 slide (3 rods, 4 beads)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, K.rectPts(-60, -40, 120, 80), '#fff3d6', { lw: 5, seed: 861 }); ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = WOOD; ctx.strokeRect(-56, -36, 112, 72); ctx.restore(); ink(ctx, K.rectPts(-60, -40, 120, 80), 5, 862);
  for (let r = 0; r < 3; r++) { const ry = -18 + r * 18; seg(ctx, -52, ry, 52, ry, 2, C.black, 0); const b = beads[r] || 0;
    for (let i = 0; i < 4; i++) { const bx = -40 + i * 12 + (i < 2 ? b * 0 : b * 30) * (i >= 2 ? 1 : 0) + (i < 2 ? -0 : 0); shape(ctx, ell(bx + (i >= 2 ? 22 : 0), ry, 6, 7, 10), [C.red, C.blue, C.yellow][r], { lw: 2.5, seed: 863 + i }); } }
  ctx.restore();
}
function k15Field(ctx, x0, x1, y, u, h = 46) {   // a green field unrolled from x0 to x0 + (x1 - x0) * u, with a carpet roll at the front edge
  if (u <= 0) return; const xe = K.lerp(x0, x1, u);
  shape(ctx, [[x0, y], [xe, y], [xe, y + h], [x0, y + h]], K15GRASS, { lw: 4.5, seed: 871, dot: K15GRASSD, pitch: 8, rad: 0.25, da: 0.4 });
  for (let k = 1; k < 3; k++) seg(ctx, x0 + 6, y + k * h / 3, xe - 6, y + k * h / 3, 2, K15GRASSD, 0);
  if (u < 1) { shape(ctx, ell(xe, y + h / 2, 14, h / 2 + 2, 16), K15GRASS, { lw: 4, seed: 872 }); ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(xe, y + h / 2, 7, 0, 5); ctx.stroke(); ctx.restore(); }
}
function k15Wheat(ctx, x, y, h, sway) { seg(ctx, x, y, x + sway, y - h, 3, K15GRASSD, 0); if (h > 20) { for (let k = 0; k < 4; k++) shape(ctx, ell(x + sway + (k % 2 ? 4 : -4), y - h + 6 + k * 7, 4, 6, 8), K15WHEAT, { lw: 2, seed: 873 + k }); } }
function k15Sheaf(ctx, x, y, s = 1) {   // v2: a bundle of 7 stalks fanned out, ears at the top, tied in the middle
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = -3; i <= 3; i++) { const bx = i * 3, tx = i * 8, ty = -66 + Math.abs(i) * 3; seg(ctx, bx, 0, tx * 0.35, -30, 4, K15WHEAT, 1.5); seg(ctx, tx * 0.35, -30, tx, ty, 4, K15WHEAT, 1.5);
    shape(ctx, ell(tx + i * 0.6, ty - 7, 4.5, 9, 10), K15WHEAT, { lw: 2.5, seed: 881 + i + 3, dot: '#e0a800', pitch: 5, rad: 0.25, da: 0.4 }); }
  seg(ctx, -9, -30, 9, -30, 6, C.red, 2); ctx.restore();
}
function k15Sack(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-24, 0], [24, 0], [28, -30], [14, -52], [20, -62], [-20, -62], [-14, -52], [-28, -30]], '#e8d2a0', { lw: 4, seed: 882, dot: '#b08a4a', pitch: 7, rad: 0.2, da: 0.4 }); seg(ctx, -14, -52, 14, -52, 4, C.red, 1.5); ctx.restore(); }
function k15Loaf(ctx, x, y, s = 1, steamT = -1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, -14, 26, 15, 18).filter(([, yy]) => yy <= -2).concat([[24, -2], [-24, -2]]), '#d98a2a', { lw: 4, seed: 883 }); for (const k of [-10, 0, 10]) seg(ctx, k - 4, -22, k + 4, -14, 2, C.black, 0);
  if (steamT >= 0) for (let i = 0; i < 2; i++) { const u = (steamT * 0.8 + i / 2) % 1; ctx.save(); ctx.globalAlpha = (1 - u) * Math.min(1, u * 4); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(-6 + i * 12, -32 - u * 30); ctx.quadraticCurveTo(2 + i * 12, -40 - u * 30, -6 + i * 12, -50 - u * 30); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// k15House(ctx, x, y, s, o): dream house; o.blocks 0..6 (each pops), o.door, o.roof, o.storey, o.dome (0..1 pop progress), o.open (front swings away 0..1), o.inside (fn), o.lit
function k15House(ctx, x, y, s, o) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const W = '#f4ecd8';
  const bl = o.blocks ?? 6; const blocks = [[-80, -50], [0, -50], [-80, -100], [0, -100], [-80, -150], [0, -150]];
  if ((o.open || 0) > 0.05 && o.inside) { shape(ctx, K.rectPts(-80, -150, 160, 150), '#7a4212', { lw: 4, seed: 891 }); o.inside(ctx); }
  const fr = 1 - (o.open || 0);
  ctx.save(); if (fr < 1) { ctx.translate(80, 0); ctx.scale(Math.max(0.05, fr), 1); ctx.translate(-80, 0); }
  blocks.forEach(([bx, by], i) => { const k = K.clamp(bl - i); if (k <= 0) return; const kk = K.ease.back(Math.min(1, k)); ctx.save(); ctx.translate(bx + 40, by + 25 + (1 - kk) * -40); ctx.scale(kk, kk); shape(ctx, K.rectPts(-40, -25, 80, 50), W, { lw: 4, seed: 892 + i, dot: '#c9bfa6', pitch: 7, rad: 0.2, da: 0.35 }); ctx.restore(); });
  if ((o.door || 0) > 0) { const k = K.ease.back(Math.min(1, o.door)); ctx.save(); ctx.translate(0, 0); ctx.scale(k, k); shape(ctx, townArchPts(-18, 18, -64, 0, 'round'), WOOD, { lw: 4, seed: 898 }); ctx.restore(); }
  if (bl >= 3) { shape(ctx, K.rectPts(-60, -86, 24, 22), NAVY, { lw: 3, seed: 899 }); shape(ctx, K.rectPts(36, -86, 24, 22), NAVY, { lw: 3, seed: 900 }); }
  ctx.restore();
  if ((o.roof || 0) > 0) { const k = K.ease.back(Math.min(1, o.roof)); ctx.save(); ctx.translate(0, -150); ctx.scale(k, k); shape(ctx, K.rectPts(-92, -14, 184, 14), K15CLAY, { lw: 4, seed: 901 }); ctx.restore(); }
  if ((o.storey || 0) > 0) { const k = K.ease.back(Math.min(1, o.storey)); ctx.save(); ctx.translate(0, -164); ctx.scale(k, k); shape(ctx, K.rectPts(-60, -70, 120, 70), W, { lw: 4, seed: 902, dot: '#c9bfa6', pitch: 7, rad: 0.2, da: 0.35 }); shape(ctx, townArchPts(-14, 14, -56, -14, 'pointed'), NAVY, { lw: 3, seed: 903 }); ctx.restore(); }
  if ((o.dome || 0) > 0) { const k = K.ease.back(Math.min(1, o.dome)); ctx.save(); ctx.translate(0, -234); ctx.scale(k, k); shape(ctx, ell(0, 0, 44, 46, 24).filter(([, yy]) => yy <= 0).concat([[44, 0], [-44, 0]]), C.yellow, { lw: 4, seed: 904, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); seg(ctx, 0, -46, 0, -66, 4, C.black, 0); shape(ctx, ell(0, -68, 6, 6, 8), C.yellow, { lw: 2.5 }); ctx.restore(); }
  ctx.restore();
}
function k15Furniture(ctx, kind, x, y, s, lit = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (kind === 'carpet') { shape(ctx, K.rectPts(-60, -8, 120, 10), C.red, { lw: 3.5, seed: 911, dot: C.yellow, pitch: 7, rad: 0.25, da: 0.4 }); }
  if (kind === 'chair') { seg(ctx, -14, 0, -14, -50, 6, WOOD, 2.5); seg(ctx, 14, 0, 14, -24, 6, WOOD, 2.5); shape(ctx, K.rectPts(-18, -28, 36, 8), C.blue, { lw: 3, seed: 912 }); }
  if (kind === 'table') { shape(ctx, K.rectPts(-26, -26, 52, 7), WOOD, { lw: 3, seed: 913 }); seg(ctx, -20, -20, -20, 0, 5, WOOD, 2); seg(ctx, 20, -20, 20, 0, 5, WOOD, 2); shape(ctx, ell(0, -32, 10, 6, 10), '#e8742a', { lw: 2.5 }); }
  if (kind === 'lamp') { seg(ctx, 0, -60, 0, -40, 2, C.black, 0); shape(ctx, [[-12, -40], [12, -40], [8, -26], [-8, -26]], '#e0a800', { lw: 3, seed: 914 }); if (lit > 0) { ctx.save(); ctx.globalAlpha = lit; shape(ctx, [[-4, -26], [0, -14], [4, -26]], C.yellow, { lw: 2 }); ctx.restore(); } }
  ctx.restore();
}
function k15Slate(ctx, x, y, s, mode, prog) {   // a slate on a stand; mode 'abc' ticks letters, 'sum' shows 2 + 2 = 4
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  seg(ctx, -30, 0, -10, -70, 5, WOOD, 2); seg(ctx, 30, 0, 10, -70, 5, WOOD, 2);
  shape(ctx, K.rectPts(-60, -140, 120, 80), '#2a3a3a', { lw: 5, seed: 921 }); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = WOOD; ctx.strokeRect(-57, -137, 114, 74); ctx.restore(); ink(ctx, K.rectPts(-60, -140, 120, 80), 5, 922);
  ctx.save(); ctx.fillStyle = C.white; ctx.font = K.font(34, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (mode === 'abc') { ['A', 'B', 'C'].forEach((l, i) => { if (prog > i / 3) ctx.fillText(l, -32 + i * 32, -100); }); }
  else if (mode === 'sum') { ctx.font = K.font(30, BF, 400); ctx.fillText(prog > 0.5 ? '2+2=4' : '2+2=', 0, -100); }
  ctx.restore(); ctx.restore();
}
function k15Palace(ctx, x, y, s, crown = 0, spear = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const fx of [-70, 70]) { seg(ctx, fx, -150, fx, -210, 3, C.black, 0); shape(ctx, [[fx, -210], [fx + 26, -202], [fx, -194]], C.red, { lw: 2.5, seed: 931 }); }
  shape(ctx, K.rectPts(-90, -150, 180, 150), '#f4ecd8', { lw: 5, seed: 932, dot: C.blue, pitch: 8, rad: 0.2, da: 0.35 });
  shape(ctx, ell(0, -150, 56, 60, 26).filter(([, yy]) => yy <= -150).concat([[56, -150], [-56, -150]]), C.blue, { lw: 4.5, seed: 933, dot: NAVY, pitch: 7, rad: 0.25, da: 0.4 });
  shape(ctx, townArchPts(-28, 28, -96, 0, 'pointed'), NAVY, { lw: 4, seed: 934 }); shape(ctx, K.rectPts(-96, -164, 192, 14), C.yellow, { lw: 4, seed: 935 });
  ctx.save(); ctx.translate(46, 0); ctx.rotate(-0.9 * spear); seg(ctx, 0, 0, 0, -120, 4, WOOD, 2); shape(ctx, [[0, -136], [7, -118], [-7, -118]], '#c9bfa6', { lw: 2.5 }); ctx.restore();
  if (crown > 0) { const k = K.ease.back(Math.min(1, crown)); ctx.save(); ctx.translate(0, -118); ctx.scale(k, k); shape(ctx, [[-26, 0], [26, 0], [30, -26], [14, -12], [0, -32], [-14, -12], [-30, -26]], C.yellow, { lw: 4, seed: 936 }); ctx.restore(); }
  ctx.restore();
}
function k15Bundle(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, ell(0, 0, 26, 16, 18), C.white, { lw: 4, seed: 941, dot: C.blue, pitch: 6, rad: 0.2, da: 0.35 }); shape(ctx, ell(16, -4, 10, 10, 12), C.white, { lw: 3, seed: 942, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }
// a red X over a ghost picture
function k15X(ctx, x, y, r, p) { if (p <= 0) return; const k = K.clamp(p * 2), k2 = K.clamp(p * 2 - 1); ctx.save(); ctx.lineCap = 'round';
  for (const [a, b, u] of [[[x - r, y - r], [x + r, y + r], k], [[x + r, y - r], [x - r, y + r], k2]]) { if (u <= 0) continue; const e = k15lp(a, b, u); ctx.lineWidth = 18; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.lineWidth = 11; ctx.strokeStyle = C.red; ctx.stroke(); }
  ctx.restore(); }
// soap-bubble pop: a ring and a few dots
function k15PopRing(ctx, x, y, r, d) { if (d < 0 || d > 0.35) return; const u = d / 0.35; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r * (0.6 + 0.6 * u), 0, 7); ctx.stroke();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(x + Math.cos(a) * r * (0.8 + u), y + Math.sin(a) * r * (0.8 + u), 5, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); }
// goo blob (ghee swirled with honey), centre x, top y, width w, length h
function k15Blob(ctx, x, y, w, h) { const pts = [[x - w * 0.5, y], [x + w * 0.5, y], [x + w * 0.42, y + h * 0.55], [x + w * 0.55, y + h * 0.8], [x, y + h], [x - w * 0.55, y + h * 0.8], [x - w * 0.42, y + h * 0.55]];
  shape(ctx, pts, K15GHEE, { lw: 4, seed: 951 }); shape(ctx, [[x - w * 0.15, y + h * 0.15], [x + w * 0.25, y + h * 0.35], [x + w * 0.05, y + h * 0.8], [x - w * 0.25, y + h * 0.6]], K15HONEY, { lw: 0, seed: 952 }); }
function k15Drop(ctx, x, y, r, col) { shape(ctx, [[x, y - r * 1.8], [x + r, y], [x + r * 0.7, y + r * 0.8], [x, y + r], [x - r * 0.7, y + r * 0.8], [x - r, y]], col, { lw: 2.5, seed: 953 }); }
