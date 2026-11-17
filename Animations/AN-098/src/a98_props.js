// ===== AN-098 Yahya and the forged letter: small helpers and props (scroll, quill, coins, chest, casket, hourglass, medallions, rift) =====
const A98_DUR = 175.9;             // narration 171.41 + 4.5 s end hold (plan duration + end_hold)
const a98E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a98In = (t, a, b) => t >= a && t < b;
const a98Env = (t, a, b, f = 0.2) => Math.max(0, Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f)));
const a98P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const A98_PAPER = '#fbf2da', A98_WOOD = '#8a501a', A98_GOLD = '#ffd21f';

// approximate head centre of a person (world), from its pose fields
function a98Head(P) { const s = P.s || 1, h = 195 - (P.drop || 0) - 27 * (P.sit || 0) - 42 * (P.kneel || 0), sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(P.dir || 1);
  return [P.x + Math.sin(tip) * h * s, P.y - Math.cos(tip) * h * s * sq]; }

// star glint (p 0..1)
function a98Glint(ctx, x, y, r, p) { if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p) * r; ctx.save(); ctx.translate(x, y); ctx.rotate(p * 1.2);
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? k * 0.3 : k; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath();
  ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
// gold rays (glow) around a point, a 0..1
function a98Rays(ctx, x, y, r, a, t, n = 12) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const an = i / n * Math.PI * 2 + t * 0.6, l = r * (0.75 + 0.25 * Math.sin(t * 5 + i)); seg(ctx, x + Math.cos(an) * r * 0.45, y + Math.sin(an) * r * 0.45, x + Math.cos(an) * l, y + Math.sin(an) * l, 7, C.yellow, 2.5); }
  ctx.restore(); }
function a98Sweat(ctx, x, y, p) { if (p <= 0 || p >= 1) return; const yy = y + 30 * p; ctx.save(); ctx.globalAlpha = Math.min(1, (1 - p) * 3);
  ctx.beginPath(); ctx.moveTo(x, yy - 14); ctx.quadraticCurveTo(x + 9, yy, x, yy + 6); ctx.quadraticCurveTo(x - 9, yy, x, yy - 14); ctx.fillStyle = '#9cc4ff'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }

// ---------- the letter ----------
// a98Scroll: (x, y) centre; roll 0 open sheet (70 x 100 at s 1) .. 1 rolled tube; seal: colour or null; lines 0..1
function a98Scroll(ctx, x, y, s = 1, o = {}) {
  const roll = K.clamp(o.roll ?? 0), h = K.lerp(100, 18, roll), w = 70;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  if (roll < 0.98) { shape(ctx, K.rectPts(-w / 2, -h / 2, w, h), A98_PAPER, { lw: 4, seed: 501 });
    const nl = Math.floor(h / 16), L = o.lines ?? 1;
    for (let i = 0; i < nl; i++) { const f = K.clamp(L * nl - i); if (f <= 0) break; const yy = -h / 2 + 14 + i * 15; ctx.beginPath();
      for (let k = 0; k <= 10 * f; k++) { const xx = w / 2 - 10 - k * 5; ctx.lineTo(xx, yy + 2.5 * Math.sin(k * 1.4 + i)); } ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke(); } }
  for (const sy of roll < 0.98 ? [-h / 2, h / 2] : [0]) shape(ctx, K.rectPts(-w / 2 - 5, sy - 9, w + 10, 18), '#efdcae', { lw: 4, seed: 502 });
  if (o.seal) { const sy = roll > 0.5 ? 0 : h / 2 - 16; shape(ctx, ell(0, sy, 11, 11, 14), o.seal, { lw: 3.5, seed: 503 }); }
  ctx.restore();
}
// quill: nib at (x, y), feather up-right at angle a (radians from vertical)
function a98Quill(ctx, x, y, a = 0.5, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
  shape(ctx, [[0, 0], [8, -18], [16, -60], [6, -66], [-4, -40], [-3, -16]], C.white, { lw: 3.5, seed: 505, dot: C.blue, pitch: 6, rad: 0.25, da: 0.5 });
  seg(ctx, 0, 0, 10, -60, 2.5, C.black, 0); seg(ctx, 0, 0, 2, -8, 4, C.black, 0); ctx.restore(); }
function a98Inkpot(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-15, 0], [15, 0], [13, -20], [8, -26], [-8, -26], [-13, -20]], '#3a3a4a', { lw: 4, seed: 506 }); shape(ctx, ell(0, -26, 8, 3, 10), C.black, { lw: 2 }); ctx.restore(); }
function a98Table(ctx, x0, x1, top) { const GR = 900;
  for (const bx of [x0 + 14, x1 - 34]) shape(ctx, K.rectPts(bx, top + 10, 20, GR - top - 10), A98_WOOD, { lw: 4, seed: 507 });
  shape(ctx, K.rectPts(x0, top, x1 - x0, 14), '#c98a3a', { lw: 5, seed: 508, dot: '#7a4212', pitch: 7, rad: 0.2, da: 0.4 }); }
// bindle on a stick: from hand (hx, hy) back over the shoulder by angle a
function a98Bindle(ctx, hx, hy, dir = 1, droop = 0) { const ex = hx - dir * 84, ey = hy - 72 + droop * 46;
  seg(ctx, hx + dir * 8, hy + 8, ex, ey, 7, A98_WOOD, 3); shape(ctx, ell(ex - dir * 4, ey + 24, 30, 26, 18), C.red, { lw: 4.5, seed: 509, dot: C.white, pitch: 9, rad: 0.25, da: 0.7 });
  shape(ctx, [[ex - 8, ey - 2], [ex + 6, ey - 10], [ex + 4, ey + 6]], C.red, { lw: 3.5, seed: 510 }); }
// the hut's hanging water jar on a long cord (empty)
function a98Jar(ctx, x, top, len, rot = 0) { ctx.save(); ctx.translate(x, top); ctx.rotate(rot); seg(ctx, 0, 0, 0, len, 3, '#a8741a', 1.5);
  ctx.translate(0, len); shape(ctx, [[-14, 0], [14, 0], [32, 34], [26, 70], [0, 82], [-26, 70], [-32, 34]], '#c8481a', { lw: 5, seed: 511, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, 0, 15, 5, 12), '#3a1a0a', { lw: 3, seed: 512 }); ctx.restore(); return [x - Math.sin(rot) * (len + 82), top + Math.cos(rot) * (len + 82)]; }
// blue satchel at the hip (x, y top centre) with the scroll sticking out
function a98Satchel(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (o.scroll) a98Scroll(ctx, 6, -8, 0.7, { roll: 1, seal: C.red, rot: -1.2 });
  shape(ctx, K.rectPts(-20, 0, 40, 34), C.blue, { lw: 4, seed: 513, dot: NAVY, pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, [[-20, 0], [20, 0], [16, 16], [-16, 16]], '#3f7be6', { lw: 3.5, seed: 514 }); ctx.restore(); }

// ---------- money and gifts ----------
function a98Coin(ctx, x, y, r = 11, sx = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), C.yellow, { lw: 3, seed: 515, dot: C.red, pitch: 5, rad: 0.2, da: 0.35 }); ctx.restore(); }
// mound of coins, bottom centre (x, y); fill 0..1; w full width
function a98CoinPile(ctx, x, y, fill, w = 160, seed = 3) { if (fill <= 0.01) return; const hw = w / 2 * (0.5 + 0.5 * fill), h = 90 * fill * (w / 160);
  const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16, xx = K.lerp(-hw, hw, u); pts.push([x + xx, y - h * Math.pow(Math.sin(Math.PI * u), 0.8)]); }
  shape(ctx, pts.concat([[x + hw, y + 2], [x - hw, y + 2]]), C.yellow, { lw: 5, seed: 516 + seed, dot: C.red, pitch: 8, rad: 0.24, da: 0.45 });
  const r = K.rng(seed * 31 + 7), n = Math.round(14 * fill * (w / 160));
  for (let i = 0; i < n; i++) { const u = 0.1 + r() * 0.8, xx = K.lerp(-hw, hw, u), top = h * Math.pow(Math.sin(Math.PI * u), 0.8); a98Coin(ctx, x + xx, y - top * (0.25 + r() * 0.65), 9, 0.55 + r() * 0.45); } }
// chest, bottom centre (x, y), 130 x 70 at s 1; open 0..1; content 'cloth' | 'coins' | 'both'
function a98Chest(ctx, x, y, s = 1, o = {}) { const op = K.clamp(o.open || 0), sq = o.sq ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 + (1 - sq) * 0.6), s * sq);
  if (op > 0.05) { // contents and the raised lid behind
    ctx.save(); ctx.translate(0, -70); const lh = 34 * op; shape(ctx, [[-66, 0], [66, 0], [60, -lh], [-60, -lh]], '#7a4212', { lw: 4.5, seed: 520 }); ctx.restore();
    const c = o.content || 'cloth';
    if (c === 'cloth' || c === 'both') [[C.red, -36], [C.blue, 0], [C.yellow, 36]].forEach(([col, dx], i) => shape(ctx, K.rectPts(dx - 18, -82 - (i % 2) * 6, 36, 18), col, { lw: 3.5, seed: 521 + i }));
    if (c === 'coins' || c === 'both') for (let i = 0; i < 6; i++) a98Coin(ctx, -45 + i * 18, -76 - (i % 2) * 6, 9, 0.7); }
  shape(ctx, K.rectPts(-65, -70, 130, 70), A98_WOOD, { lw: 5, seed: 524, dot: '#5b3010', pitch: 8, rad: 0.2, da: 0.4 });
  for (const bx of [-42, 42]) shape(ctx, K.rectPts(bx - 6, -70, 12, 70), C.yellow, { lw: 3, seed: 525 });
  if (op <= 0.05) shape(ctx, [[-68, -70], [68, -70], [62, -88], [40, -96], [-40, -96], [-62, -88]], '#a8641a', { lw: 5, seed: 526 });
  shape(ctx, K.rectPts(-8, -58, 16, 16), C.yellow, { lw: 3, seed: 527 });
  ctx.restore(); }
// jewel casket, bottom centre; open 0..1; glow 0..1
function a98Casket(ctx, x, y, s = 1, open = 0, glow = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow > 0) a98Rays(ctx, 0, -46, 90, glow, t, 14);
  if (open > 0.05) { shape(ctx, [[-32, -40], [32, -40], [30, -40 - 26 * open], [-30, -40 - 26 * open]], C.red, { lw: 4, seed: 530 });
    [[C.blue, -18], [C.red, -6], ['#3fbf5a', 6], [C.white, 18]].forEach(([col, dx], i) => shape(ctx, [[dx, -54], [dx + 7, -46], [dx, -38], [dx - 7, -46]], col, { lw: 2.5, seed: 531 + i })); }
  shape(ctx, K.rectPts(-30, -40, 60, 40), C.red, { lw: 4.5, seed: 535, dot: '#a8160f', pitch: 6, rad: 0.2, da: 0.4 }); seg(ctx, -30, -22, 30, -22, 4, C.yellow, 1.5);
  if (open <= 0.05) shape(ctx, [[-32, -40], [32, -40], [26, -52], [-26, -52]], C.red, { lw: 4, seed: 536 });
  ctx.restore(); }
// a stout stick (the punishment), bottom at (x, y)
function a98Stick(ctx, x, y, h = 120, rot = 0, sq = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, sq);
  shape(ctx, [[-7, 0], [7, 0], [9, -h], [-9, -h]], '#7a4212', { lw: 4.5, seed: 537 }); seg(ctx, -4, -h * 0.3, -14, -h * 0.4, 5, '#7a4212', 2); ctx.restore(); }
// time meter (panel space): level 0..1 sand left in the top bulb; rot (flip)
function a98Hourglass(ctx, x, y, level, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const top = [[-26, -46], [26, -46], [4, -4], [-4, -4]], bot = [[-4, 4], [4, 4], [26, 46], [-26, 46]];
  shape(ctx, top, '#e8f4ff', { lw: 3.5, seed: 540 }); shape(ctx, bot, '#e8f4ff', { lw: 3.5, seed: 541 });
  const L = K.clamp(level); if (L > 0.02) { const yy = -4 - 40 * L, hw = 4 + 22 * L; shape(ctx, [[-hw, yy], [hw, yy], [4, -4], [-4, -4]], C.yellow, { lw: 2.5, seed: 542 }); }
  const B = 1 - L; if (B > 0.02) { const yy = 46 - 40 * B; shape(ctx, [[-26, 46], [26, 46], [K.lerp(26, 4, 1 - B), yy], [-K.lerp(26, 4, 1 - B), yy]], C.yellow, { lw: 2.5, seed: 543 }); }
  if (L > 0.02 && L < 0.98) seg(ctx, 0, -4, 0, 44, 2.5, C.yellow, 0);
  for (const yy of [-52, 52]) shape(ctx, K.rectPts(-34, yy - 6, 68, 12), A98_WOOD, { lw: 3.5, seed: 544 });
  ctx.restore(); }

// ---------- the feud picture: portrait medallions and the rift ----------
const A98_ABD = { costume: 'merchant', s: 1.05, age: 0.35, seed: 23, pal: { robe: C.red, dot: '#a8160f', sash: C.yellow, trim: C.yellow, cape: C.yellow, hc: C.white, hd: C.blue, jewel: C.blue } };
const A98_YAH = { costume: 'vizier', s: 1.0, age: 0.6, seed: 37 };
// a person's head clipped in a rimmed circle; who 'abd' | 'yah'; o.gaze, o.dir, o.nod (px), o.mouth, o.glow
function a98Medal(ctx, x, y, r, who, o = {}) { if (r < 2) return; const base = who === 'abd' ? A98_ABD : A98_YAH, s = r / 58;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  if (o.glow) a98Rays(ctx, x, y, r * 1.6, o.glow, o.t || 0, 14);
  shape(ctx, ell(x, y, r + 9, r + 9, 30), C.yellow, { lw: 5, seed: 550, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.fillStyle = who === 'abd' ? '#3f7be6' : '#e8b25a'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = dotPat(ctx, C.white, 9, 0.22); ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  person(ctx, { ...base, x, y: y + 222 * s + (o.nod || 0), s, dir: o.dir ?? (who === 'abd' ? 1 : -1), gaze: o.gaze || [0, 0.1], mouth: o.mouth || 'closed', brow: o.brow ?? 0, lid: o.lid ?? 0, noBlink: true });
  ctx.restore(); ink(ctx, ell(x, y, r, r, 30), 4, 551); ctx.restore(); }
// red zigzag crack, centre (x, y), height h. open 0..1 (draws top to bottom), close 0..1 (zips bottom to top), webs 0..1, webFall 0..1
function a98Rift(ctx, x, y, h, o = {}) { const op = K.clamp(o.open ?? 1), cl = K.clamp(o.close || 0); if (op <= 0) return;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; const n = 8, pts = [];
  for (let i = 0; i <= n; i++) pts.push([x + (i % 2 ? 16 : -16) * (i === 0 || i === n ? 0.3 : 1), y - h / 2 + h * i / n]);
  for (let i = 0; i < n; i++) { const f0 = i / n, f1 = (i + 1) / n; if (f0 >= op) break; const u = K.clamp((op - f0) * n), a = pts[i], b = [K.lerp(pts[i][0], pts[i + 1][0], u), K.lerp(pts[i][1], pts[i + 1][1], u)];
    const shut = K.clamp((cl - (1 - f1)) * n), wdt = 16 * (1 - shut); if (wdt < 0.5) { seg(ctx, a[0], a[1], b[0], b[1], 4, C.black, 0); continue; }
    seg(ctx, a[0], a[1], b[0], b[1], wdt + 9, C.black, 0); seg(ctx, a[0], a[1], b[0], b[1], wdt, C.red, 0); }
  const wb = K.clamp(o.webs || 0), wf = K.clamp(o.webFall || 0);
  if (wb > 0 && wf < 1) for (const sd of [-1, 1]) { ctx.save(); ctx.globalAlpha *= 1 - wf; ctx.translate(x + sd * 22, y - h / 2 + 4 + 160 * wf * wf); ctx.rotate(wf * sd * 0.8); ctx.strokeStyle = '#efefef'; ctx.lineWidth = 2.5;
    const a0 = sd > 0 ? 0 : Math.PI / 2, a1 = sd > 0 ? Math.PI / 2 : Math.PI;
    for (let k = 0; k < 4; k++) { if (k / 3 > wb * 1.2) break; const a = K.lerp(a0, a1, k / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 36, Math.sin(a) * 36); ctx.stroke(); }
    for (let k = 1; k <= 3; k++) { if (k / 3 > wb) break; ctx.beginPath(); ctx.arc(0, 0, 11 * k, a0, a1); ctx.stroke(); }
    ctx.restore(); }
  ctx.restore(); }
// the whole picture: Abdullah's medallion left, Yahya's right, the rift between. o: gap (centre distance), open, close, webs, webFall, heart, alpha,
//   gazeIn (0 the faces look away .. 1 toward each other), nodA, nodY, pA, pY (pop 0..1 each), glowY, t
function a98Feud(ctx, cx, cy, r, o = {}) { const gap = o.gap ?? r * 3.4, gi = o.gazeIn || 0, pA = o.pA ?? 1, pY = o.pY ?? 1;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const gA = [K.lerp(-1, 1, gi), 0.05], gY = [K.lerp(1, -1, gi), 0.05];
  if (o.open || o.webs) a98Rift(ctx, cx, cy, r * 2.5, { open: o.open, close: o.close, webs: o.webs, webFall: o.webFall, alpha: o.riftAlpha });
  a98Medal(ctx, cx - gap / 2, cy, r * K.ease.back(K.clamp(pA)), 'abd', { gaze: gA, nod: o.nodA || 0, mouth: gi > 0.6 ? 'smile' : (o.mouthA || 'closed'), brow: gi > 0.5 ? -0.2 : 0.6, t: o.t });
  a98Medal(ctx, cx + gap / 2, cy, r * K.ease.back(K.clamp(pY)), 'yah', { gaze: gY, nod: o.nodY || 0, mouth: gi > 0.6 ? 'smile' : 'closed', brow: gi > 0.5 ? -0.2 : 0.3, glow: o.glowY, t: o.t });
  if (o.heart > 0) heart(ctx, cx, cy - r * 1.25, r * 0.42 * K.ease.back(K.clamp(o.heart)));
  ctx.restore(); }
// round inset with a ring rim (panel space); p 0..1 iris; inner(ctx) draws in a local frame centred on (0, 0)
function a98Inset(ctx, cx, cy, r, p, inner) { if (p <= 0.01) return; const rr = r * K.ease.out(K.clamp(p));
  ctx.save(); ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.beginPath(); ctx.arc(cx + 8, cy + 8, rr + 10, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); ctx.translate(cx, cy); inner(ctx); ctx.restore();
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, rr + 5, 0, 7); ctx.stroke(); ink(ctx, ell(cx, cy, rr + 11, rr + 11, 40), 5, 560); ink(ctx, ell(cx, cy, rr, rr, 40), 4, 561); ctx.restore(); }
// icon box (world): p pop, kind 'coins' | 'stick'; o.fill (coin heap 0..1), o.stickT (time since the stick dropped), o.cross (strike 0..1), o.tick
function a98IconBox(ctx, cx, cy, w, h, p, kind, o = {}) { const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.rotate(kind === 'coins' ? -0.03 : 0.03);
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 8, w, h);
  shape(ctx, K.rectPts(-w / 2, -h / 2, w, h), kind === 'coins' ? C.yellow : '#dfe6f2', { lw: 7, seed: kind === 'coins' ? 570 : 571, dot: kind === 'coins' ? C.red : C.blue, pitch: 9, rad: 0.22, da: 0.3 });
  if (kind === 'coins') { a98CoinPile(ctx, 0, h / 2 - 14, o.fill || 0, w * 0.7, 5); }
  else if (o.stickT != null && o.stickT >= 0) { const d = o.stickT, y = d < 0.18 ? K.lerp(-h, h / 2 - 12, (d / 0.18) * (d / 0.18)) : h / 2 - 12; a98Stick(ctx, 0, y, h * 0.75, 0, impactSquash(d, 0.18, 0.7)); }
  // mark in the corner: tick (reward) or cross (punishment)
  const mx = w / 2 - 18, my = -h / 2 + 18; ctx.save(); ctx.translate(mx, my); shape(ctx, ell(0, 0, 20, 20, 20), C.white, { lw: 4, seed: 572 });
  if (kind === 'coins') { seg(ctx, -9, 0, -2, 8, 6, '#2b9a3a', 0); seg(ctx, -2, 8, 11, -9, 6, '#2b9a3a', 0); } else { seg(ctx, -9, -9, 9, 9, 6, C.red, 0); seg(ctx, 9, -9, -9, 9, 6, C.red, 0); } ctx.restore();
  if (o.cross > 0) { const c = K.clamp(o.cross); seg(ctx, -w / 2 - 6, -h / 2 - 6, K.lerp(-w / 2 - 6, w / 2 + 6, c), K.lerp(-h / 2 - 6, h / 2 + 6, c), 16, C.red, 4); if (c > 0.5) { const c2 = K.clamp((c - 0.5) * 2); seg(ctx, w / 2 + 6, -h / 2 - 6, K.lerp(w / 2 + 6, -w / 2 - 6, c2), K.lerp(-h / 2 - 6, h / 2 + 6, c2), 16, C.red, 4); } }
  ctx.restore(); }
// three snow-capped mountains (Armenia), base y
function a98Mountains(ctx, xs, base) { xs.forEach(([x, h, w], i) => { shape(ctx, [[x - w / 2, base], [x, base - h], [x + w / 2, base]], '#8a96a8', { lw: 6, seed: 580 + i, dot: '#5a6a80', pitch: 10, rad: 0.2, da: 0.4 });
  shape(ctx, [[x - w * 0.16, base - h * 0.68], [x, base - h], [x + w * 0.16, base - h * 0.68], [x + w * 0.06, base - h * 0.74], [x - 4, base - h * 0.66], [x - w * 0.08, base - h * 0.73]], C.white, { lw: 4, seed: 585 + i }); }); }
// small numbered flag on a pole (world), pole foot at (x, y)
function a98Flag(ctx, x, y, n, p = 1, wave = 0) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  seg(ctx, 0, 0, 0, -90, 5, A98_WOOD, 2); shape(ctx, [[0, -90], [46, -84 + wave * 4], [44, -58 + wave * 4], [0, -60]], n === 1 ? C.yellow : C.red, { lw: 4, seed: 590 + n });
  ctx.font = K.font(30, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(String(n), 22, -72 + wave * 3); ctx.restore(); }
