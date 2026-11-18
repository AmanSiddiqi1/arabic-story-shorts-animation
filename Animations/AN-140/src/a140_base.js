// ===== AN-140 The Sons of Yahya and Said bin Salim: constants, cast presets, small helpers and props =====
// props: bill, letter, coin, glint, rays, purse, floor cushion, low desk, portrait medallion, picture balloon, price tag, letter frame, mule, heap
const A140_DUR = 174.9;            // narration 171.934 + 3.0 s end hold (rounded down to the frame)
const a140E = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a140In = (t, a, b) => t >= a && t < b;
const a140Env = (t, a, b, f = 0.2) => Math.max(0, Math.min(K.clamp((t - a) / f), K.clamp((b - t) / f)));
const a140P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const a140Lp = (a, b, f) => [K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f)];
const A140_PAPER = '#fbf2da', A140_GREEN = '#3f9d4a', A140_GREEND = '#2b7a38', A140_BROWN = '#8a501a', A140_BROWND = '#5b3010', A140_WOOD = '#8a501a';

// ---------- cast (one colour per character, kept in clouds, balloons and medallions) ----------
const A140_SAID = { costume: 'merchant', s: 0.9, age: 0.35, seed: 11, pal: { robe: A140_GREEN, dot: A140_GREEND, sash: C.red, trim: C.yellow, hc: C.white, hd: '#b9b4c6', jewel: C.white } };
const A140_ABD = { costume: 'merchant', s: 0.9, age: 0.6, seed: 23 };
const A140_FADL = { costume: 'vizier', s: 0.95, age: 0.3, seed: 37 };
const A140_JAAF = { costume: 'vizier', s: 0.92, age: 0.12, seed: 41, pal: { robe: C.red, dot: '#a8160f', cape: C.blue, hc: C.yellow, hd: C.red, jewel: C.blue } };
const A140_CAL = { costume: 'caliph', s: 0.95, seed: 53 };
const A140_SERV = { costume: 'servant', s: 0.85, seed: 61 };
const A140_MSGR = { costume: 'servant', s: 0.88, seed: 67, pal: { robe: NAVY, dot: '#2a4fae', hc: NAVY, sash: C.yellow, sleeve: NAVY } };
const A140_CR = [
  { costume: 'merchant', s: 0.95, age: 0.5, seed: 71, brow: 0.8, pal: { robe: C.yellow, dot: C.red, hc: C.red, hd: C.yellow, sash: C.red, trim: C.red, jewel: C.yellow } },
  { costume: 'beanSeller', s: 0.88, seed: 73, brow: -0.3, pal: { robe: A140_BROWN, dot: A140_BROWND } },
  { costume: 'villager', s: 0.88, age: 0.85, seed: 79, brow: 0.5, hold: 'stick', pal: { robe: C.blue, dot: NAVY } },
];
const A140_RIM = { said: A140_GREEN, fadl: NAVY, jaafar: C.red, abd: C.blue };
// the prayer pose: one constant for S8, mocked in S10 and replayed in the S17 cloud (setup and payoff)
const A140_PRAY = { handL: [-46, -150], handR: [46, -150], gaze: [0, -0.8], lid: 0.3 };
const A140_LAP = { handL: [-26, -62], handR: [26, -62] };
const a140Who = (base, extra) => ({ ...base, ...extra });

// approximate head centre of a person (world), from its pose fields
function a140Head(P) { const s = P.s || 1, sit = P.sit || 0, hd = sit * (P.seat === 'floor' ? 51 : 25), h = 195 - (P.drop || 0) - hd - (P.age ?? 0.35) * 6, sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(P.dir || 1);
  return [P.x + Math.sin(tip) * h * s, P.y - Math.cos(tip) * h * s * sq]; }
// silhouette (flat black) of any drawing
function a140Sil(ctx, fn, col = 'brightness(0)') { ctx.save(); ctx.filter = col; fn(ctx); ctx.restore(); }

// ---------- small effects ----------
function a140Glint(ctx, x, y, r, p) { if (p <= 0 || p >= 1) return; const k = Math.sin(Math.PI * p) * r; ctx.save(); ctx.translate(x, y); ctx.rotate(p * 1.2);
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? k * 0.3 : k; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath();
  ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
function a140Rays(ctx, x, y, r, a, t, n = 12, col = C.yellow) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + (i / (n - 1) - 0.5) * 2.2, l = r * (0.75 + 0.25 * Math.sin(t * 5 + i)); seg(ctx, x + Math.cos(an) * r * 0.35, y + Math.sin(an) * r * 0.35, x + Math.cos(an) * l, y + Math.sin(an) * l, 6, col, 2); }
  ctx.restore(); }
function a140Dust(ctx, x, y, t, t0, n = 5, seed = 1) { const d = t - t0; if (d < 0 || d > 0.7) return; const r = K.rng(seed * 17 + 3);
  ctx.save(); ctx.globalAlpha *= 1 - d / 0.7; for (let i = 0; i < n; i++) { const a = Math.PI + r() * Math.PI, sp = 40 + r() * 70, rr = 8 + r() * 10 + d * 20;
    shape(ctx, ell(x + Math.cos(a) * sp * d * 1.4, y - 6 + Math.sin(a) * sp * d * 0.7, rr, rr * 0.7, 10), '#e9d9b0', { lw: 3, seed: 600 + i }); } ctx.restore(); }

// ---------- paper: bills and the letter ----------
// a bill (debt note): centre (x, y), 60 x 80 at s 1; o.rot, o.struck 0..1 (red strike), o.flat (lying sheet, 0..1)
function a140Bill(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s * (1 - 0.82 * (o.flat || 0)));
  shape(ctx, [[-30, -40], [24, -40], [30, -34], [30, 40], [-30, 40]], A140_PAPER, { lw: 4, seed: 620 + (o.seed || 0) });
  ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let i = 0; i < 4; i++) { const yy = -24 + i * 13; ctx.beginPath(); ctx.moveTo(-20, yy); ctx.lineTo(i === 3 ? 0 : 20, yy); ctx.stroke(); }
  shape(ctx, ell(14, 26, 9, 9, 12), C.red, { lw: 3, seed: 621 });
  const k = K.clamp(o.struck || 0); if (k > 0) seg(ctx, -34, 34, K.lerp(-34, 34, k), K.lerp(34, -34, k), 9, C.red, 2.5);
  ctx.restore();
}
// the letter: centre (x, y); roll 1 rolled tube (90 x 26) .. 0 open sheet (150 x 200); seal true = red seal (broken: o.broken); lines 0..1
function a140Letter(ctx, x, y, s = 1, o = {}) {
  const roll = K.clamp(o.roll ?? 0), h = K.lerp(200, 26, roll), w = K.lerp(150, 90, roll);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  if (roll < 0.97) { shape(ctx, K.rectPts(-w / 2, -h / 2, w, h), A140_PAPER, { lw: 5, seed: 630 });
    const nl = Math.floor((h - 30) / 22), L = o.lines ?? 1;
    for (let i = 0; i < nl; i++) { const f = K.clamp(L * nl - i); if (f <= 0) break; const yy = -h / 2 + 24 + i * 22; ctx.beginPath();
      for (let k = 0; k <= 12 * f; k++) { const xx = w / 2 - 16 - k * (w - 32) / 12; ctx.lineTo(xx, yy + 3 * Math.sin(k * 1.4 + i)); } ctx.lineWidth = 3.5; ctx.strokeStyle = C.black; ctx.stroke(); } }
  for (const sy of roll < 0.97 ? [-h / 2, h / 2] : [0]) shape(ctx, K.rectPts(-w / 2 - 8, sy - 13, w + 16, 26), '#efdcae', { lw: 5, seed: 631 });
  if (o.seal) { const sy = roll > 0.5 ? 0 : h / 2 - 30; if (o.broken) { shape(ctx, [[-20, sy - 4], [-4, sy - 18], [-2, sy + 14]], C.red, { lw: 3, seed: 632 }); shape(ctx, [[20, sy + 4], [4, sy - 16], [2, sy + 16]], C.red, { lw: 3, seed: 633 }); }
    else { shape(ctx, ell(0, sy, 20, 20, 16), C.red, { lw: 4, seed: 634 }); shape(ctx, ell(0, sy, 9, 9, 10), '#a8160f', { lw: 2, seed: 635 }); } }
  ctx.restore();
}
// ---------- money ----------
function a140Coin(ctx, x, y, r = 11, sx = 1, col = C.yellow) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(sx)), 1);
  shape(ctx, ell(0, 0, r, r, 16), col, { lw: 3, seed: 640, dot: col === C.yellow ? C.red : '#8c8a94', pitch: 5, rad: 0.2, da: 0.35 }); ctx.restore(); }
// a small purse, bottom centre (x, y)
function a140Purse(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-22, 0], [-28, -22], [-14, -40], [14, -40], [28, -22], [22, 0]], C.red, { lw: 4, seed: 645, dot: '#a8160f', pitch: 6, rad: 0.2, da: 0.4 });
  seg(ctx, -12, -40, 12, -40, 6, C.yellow, 2); shape(ctx, [[-8, -40], [-14, -54], [0, -46], [14, -54], [8, -40]], C.red, { lw: 3, seed: 646 }); ctx.restore(); }
// floor cushion (Said's seat in the Barmakid hall), bottom centre
function a140Cushion(ctx, x, y, w = 130) { shape(ctx, [[x - w / 2, y], [x - w / 2 + 6, y - 26], [x + w / 2 - 6, y - 26], [x + w / 2, y]], C.red, { lw: 5, seed: 650, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
  for (const sd of [-1, 1]) shape(ctx, ell(x + sd * (w / 2 - 4), y - 26, 8, 8, 10), C.yellow, { lw: 3, seed: 651 }); }
// Abdullah's low writing desk (v2: low top so he is clear above it), coin stacks at the far right end; the last pile grows with o.extra
function a140Desk(ctx, x0, x1, top, o = {}) { const GR = 900;
  for (const lx of [x0 + 18, x1 - 18]) seg(ctx, lx, top + 30, lx, GR, 11, A140_WOOD, 3.5);
  shape(ctx, K.rectPts(x0, top + 16, x1 - x0, 22), '#c98a3a', { lw: 5, seed: 655, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, K.rectPts(x0 - 8, top, x1 - x0 + 16, 18), BARKY, { lw: 5, seed: 656 });
  const piles = [[x1 - 74, 3], [x1 - 42, 3 + (o.extra || 0)]]; for (const [px, n] of piles) for (let k = 0; k < n; k++) shape(ctx, ell(px, top - 6 - k * 9, 15, 6, 14), C.yellow, { lw: 3, seed: 657 });
  shape(ctx, [[x0 + 14, top - 3], [x0 + 40, top - 3], [x0 + 40, top - 22], [x0 + 14, top - 22]], '#3a3a4a', { lw: 3.5, seed: 658 }); }

// ---------- portrait medallion: a person's head in a rimmed circle (rim in the character's colour) ----------
// who: 'said' | 'fadl' | 'jaafar' | 'abd'; o: gaze, mouth, brow, lid, wink, alpha, glow
function a140Medal(ctx, x, y, r, who, o = {}) { if (r < 2) return; const base = { said: A140_SAID, fadl: A140_FADL, jaafar: A140_JAAF, abd: A140_ABD }[who], s = r / 58;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  if (o.glow) a140Rays(ctx, x, y, r * 1.8, o.glow, o.t || 0, 12);
  shape(ctx, ell(x, y, r + 9, r + 9, 30), A140_RIM[who], { lw: 5, seed: 660, dot: C.yellow, pitch: 7, rad: 0.18, da: 0.35 });
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.fillStyle = '#ffe9a8'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = dotPat(ctx, C.red, 9, 0.18); ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  person(ctx, { ...base, x, y: y + 222 * s, s, dir: o.dir ?? 1, gaze: o.gaze || [0, 0.1], mouth: o.mouth || 'closed', brow: o.brow ?? 0, lid: o.lid ?? 0, wink: o.wink, noBlink: true, drop: o.nod || 0 });
  ctx.restore(); ink(ctx, ell(x, y, r, r, 30), 4, 661); ctx.restore(); }

// ---------- picture balloon (speech balloon with a picture inside), panel space ----------
// centre (x, y), w x h, p pop 0..1, tail [x, y] (the speaker's head), inside(ctx) draws in balloon-local units (0, 0 = centre)
function a140Balloon(ctx, x, y, w, h, p, tail, inside, o = {}) { const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const pts = K.rectPts(-w / 2, -h / 2, w, h), rr = 30, rp = []; // rounded rect
  for (const [cx, cy, a0] of [[w / 2 - rr, -h / 2 + rr, -Math.PI / 2], [w / 2 - rr, h / 2 - rr, 0], [-w / 2 + rr, h / 2 - rr, Math.PI / 2], [-w / 2 + rr, -h / 2 + rr, Math.PI]]) for (let i = 0; i <= 6; i++) { const a = a0 + i / 6 * Math.PI / 2; rp.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  let tl = null; if (tail) { const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k, bx = K.clamp(tx * 0.4, -w / 2 + 50, w / 2 - 50), by = ty > 0 ? h / 2 - 4 : -h / 2 + 4; tl = [[bx - 22, by], [K.lerp(bx, tx, 0.75), K.lerp(by, ty, 0.75)], [bx + 22, by]]; }
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.save(); ctx.translate(8, 8); K.poly(ctx, rp, true); ctx.fill(); ctx.restore();
  ctx.fillStyle = o.fill || C.white; K.poly(ctx, rp, true); ctx.fill(); if (tl) { K.poly(ctx, tl, true); ctx.fill(); }
  if (inside) { ctx.save(); K.poly(ctx, rp, true); ctx.clip(); inside(ctx); ctx.restore(); }
  ink(ctx, rp.concat([rp[0]]), 6, 670); if (tl) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// a tiny house front with its door (icon, local origin = bottom centre), door open 0..1, shiver px
function a140HouseIcon(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x + (o.shiver || 0), y); ctx.scale(s, s);
  shape(ctx, [[-90, 0], [-90, -150], [90, -150], [90, 0]], '#e8b25a', { lw: 5, seed: 675, dot: C.red, pitch: 10, rad: 0.15, da: 0.35 });
  shape(ctx, [[-100, -150], [100, -150], [100, -166], [-100, -166]], '#a8741a', { lw: 4, seed: 676 });
  townDoor(ctx, 10, 70, -100, 0, o.door || 0, { arch: 'round' });
  townWindow(ctx, -70, -120, 50, 50, { shutters: 0 }); ctx.restore(); }

// ---------- price tag (panel space): yellow tag with hole and string, amount in Bangers, icon at the left ----------
// p pop (slam), icon(ctx) draws in a 50 x 50 box centred at (0, 0)
function a140Tag(ctx, x, y, p, txt, icon, o = {}) { if (p <= 0) return; const k = p < 1 ? K.ease.back(K.clamp(p)) : 1, w = o.w || 300, h = 66;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.04); ctx.scale(k * (o.s || 1), k * (o.s || 1));
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(-w / 2 + 7, -h / 2 + 7, w, h);
  const pts = [[-w / 2 + 22, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2 + 22, h / 2], [-w / 2, 0]];
  shape(ctx, pts, o.fill || C.yellow, { lw: 5, seed: 680, dot: C.red, pitch: 8, rad: 0.18, da: 0.3 });
  shape(ctx, ell(-w / 2 + 18, 0, 6, 6, 10), C.white, { lw: 3, seed: 681 });
  if (icon) { ctx.save(); ctx.translate(-w / 2 + 56, 0); icon(ctx); ctx.restore(); }
  ctx.font = K.font(o.size || 46, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(txt, 42, 3);
  ctx.restore(); }
const A140_TAG_ICON = {
  chest: (c) => packLoad(c, ['chest'], 0, 22, 0.5),
  sack: (c) => packLoad(c, ['sack'], 0, 20, 0.55),
  fadl: (c) => a140Medal(c, 0, 0, 22, 'fadl', { mouth: 'smile' }),
  jaafar: (c) => a140Medal(c, 0, 0, 22, 'jaafar', { mouth: 'smile' }),
};

// ---------- letterFrame (panel space): the open letter fills the panel, rollers top and bottom ----------
// open 0..1: from the rect r0 = [x0, y0, x1, y1] (the letter in Said's hands) to the full panel; draws the paper edge and rollers.
// clipFrame(ctx, open, r0) sets a clip to the picture area (call inside save/restore).
const A140_LF = { m: 26, roll: 34 };
function a140LFRect(open, r0) { const f = K.ease.inOut(K.clamp(open)); return [K.lerp(r0[0], 0, f), K.lerp(r0[1], 0, f), K.lerp(r0[2], 1000, f), K.lerp(r0[3], 1230, f)]; }
function a140LetterFrame(ctx, open, r0) { const [x0, y0, x1, y1] = a140LFRect(open, r0), f = K.clamp(open), m = A140_LF.m * f + 4, rh = K.lerp(16, A140_LF.roll, f);
  ctx.save(); ctx.fillStyle = A140_PAPER; ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.rect(x0 + m, y0 + m + rh * 0.6, x1 - x0 - 2 * m, y1 - y0 - 2 * m - rh * 1.2); ctx.fill('evenodd');
  ctx.fillStyle = dotPat(ctx, '#e2c68a', 10, 0.25); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.rect(x0 + m, y0 + m + rh * 0.6, x1 - x0 - 2 * m, y1 - y0 - 2 * m - rh * 1.2); ctx.fill('evenodd'); ctx.restore();
  ink(ctx, K.rectPts(x0 + m, y0 + m + rh * 0.6, x1 - x0 - 2 * m, y1 - y0 - 2 * m - rh * 1.2).concat([[x0 + m, y0 + m + rh * 0.6]]), 5, 690);
  for (const yy of [y0 + rh / 2, y1 - rh / 2]) { shape(ctx, K.rectPts(x0 - 6, yy - rh / 2, x1 - x0 + 12, rh), '#efdcae', { lw: 6, seed: 691, dot: '#c98a3a', pitch: 8, rad: 0.18, da: 0.35 });
    for (const ex of [x0 - 6, x1 + 6]) shape(ctx, ell(ex, yy, rh * 0.42, rh * 0.62, 12), A140_WOOD, { lw: 4, seed: 692 }); }
  if (f > 0.8) { ctx.save(); ctx.globalAlpha *= K.clamp((f - 0.8) * 5); const sx = x1 - 70, sy = y1 - rh - 52; shape(ctx, ell(sx, sy, 22, 22, 16), C.red, { lw: 4, seed: 693 }); shape(ctx, ell(sx, sy, 10, 10, 10), '#a8160f', { lw: 2, seed: 694 }); ctx.restore(); }
}
function a140LFClip(ctx, open, r0) { const [x0, y0, x1, y1] = a140LFRect(open, r0), m = A140_LF.m * K.clamp(open) + 4, rh = K.lerp(16, A140_LF.roll, K.clamp(open));
  ctx.beginPath(); ctx.rect(x0 + m, y0 + m + rh * 0.6, x1 - x0 - 2 * m, y1 - y0 - 2 * m - rh * 1.2); ctx.clip(); }

// ---------- mule: the Library donkey, brown, body stretched 1.1x (shorter-eared mule look); silhouette passes through ----------
function a140Mule(ctx, P) { ctx.save(); ctx.translate(P.x, P.y); ctx.scale(1.1, 1); ctx.translate(-P.x, -P.y); donkey(ctx, { pal: 1, ...P }); ctx.restore(); }
// load point on a mule's back (world), s = mule scale
const a140MuleBack = (x, y, s, dir = 1) => [x - 8 * s * 1.1 * dir, y - 238 * s];

// ---------- the heap beside Said's door: 9 items in 4 rows (5 chests, 4 sacks), bottom centre (x, y); n items placed (fractional = last dropping) ----------
const A140_HEAP = [[-60, 0, 'chest'], [60, 0, 'chest'], [0, 0, 'sack'], [-40, 1, 'chest'], [44, 1, 'sack'], [-20, 2, 'chest'], [36, 2, 'sack'], [0, 3, 'chest'], [6, 3.9, 'sack']];
function a140HeapPos(i, x, y, s = 0.9) { const [dx, row] = A140_HEAP[i]; return i === 2 ? [x + 4, y + 22] : [x + dx * s, y - row * 70 * s]; }
function a140Heap(ctx, x, y, n, t, s = 0.9, o = {}) {   // item 2 (a sack at the front) is drawn last
  for (let i = 0; i < 9; i++) { if (i === 2) continue; if (i >= n) break; let [px, py] = a140HeapPos(i, x, y, s); const [, row, kind] = A140_HEAP[i];
    const sq = o.landT && o.landT[i] != null ? impactSquash(t, o.landT[i], 0.8) : 1;
    ctx.save(); ctx.translate(px, py); ctx.scale(1 + (1 - sq) * 0.5, sq); packLoad(ctx, [kind === 'sack' ? { kind, col: '#e0b050' } : kind], 0, 0, s * 1.15); ctx.restore(); }
  if (n > 2) { const [px, py] = a140HeapPos(2, x, y, s); packLoad(ctx, [{ kind: 'sack', col: '#e0b050' }], px, py, s * 1.1); }
  // glints on the coins in turn
  if (o.glint) for (let i = 0; i < Math.min(9, n); i++) { const [px, py] = a140HeapPos(i, x, y, s), ph = ((t * 0.9 + i * 0.37) % 2.2) / 0.5; a140Glint(ctx, px + 20, py - 50 * s, 16, ph); }
}
const a140HeapTop = (x, y, s = 0.9) => [x, y - 3.9 * 70 * s - 70 * s];
