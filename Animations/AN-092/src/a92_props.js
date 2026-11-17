// ===== AN-092 Ali the Persian: shared timing helpers, cast factories, body-point maths and the story's own drawings =====
// Story drawings (library candidates, see library_proposals.md): a92Bag (leatherBag), a92Tile (claimTiles), a92Pile (claimPile),
// a92Food (bagFood), a92Purse (purse), a92Diwan (diwan), a92Scribble (worryScribble), a92Balloon (iconBalloon), a92Turban (judge turban gag),
// a92Laugh (person laugh), a92Heads (crowdDots).
const A92_DUR = 170.67;   // narration 167.67 + 3.0 s THE END hold (plan duration + end_hold)
const A92B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const a92In = (t, a, b) => t >= a && t < b;
const a92Fade = (t, a, b, f = 0.2) => K.clamp(Math.min((t - a) / f, (b - t) / f));
// display only: a script dash shows as ", " (the chunk text in timing.json stays verbatim)
TIMING.chunks.forEach((c) => { c.en = c.en.replace(/\s*[—–]\s*/g, ', '); });

// ---------- cast ----------
const A92_CALIPH = { costume: 'caliph', age: 0.6, s: 1.12, seed: 31 };
const A92_JAFAR = { costume: 'vizier', age: 0.45, s: 1.08, seed: 32 };
const A92_ALI = { costume: 'merchant', pal: { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red, sash: C.yellow }, age: 0.2, s: 1.1, seed: 33 };
const A92_KURD = { costume: 'villager', pal: { robe: C.red, dot: '#a8160f', sash: C.yellow, hc: '#5b3010', hd: '#3a1e08', band: C.yellow }, age: 0.3, s: 1.18, seed: 34 };
const A92_JUDGE = { costume: 'physician', pal: { robe: NAVY, dot: C.blue, hc: C.white, sash: C.white, head: 'none' }, age: 0.8, s: 1.15, seed: 35 };
const A92_SELLER = { costume: 'beanSeller', age: 0.5, s: 1.05, seed: 36 };
const A92_ONL = [{ costume: 'villager', s: 0.95, age: 0.5, seed: 37 }, { costume: 'villageWoman', s: 0.88, age: 0.3, seed: 38 }, { costume: 'servant', s: 0.82, age: 0.15, seed: 39 }];

// ---------- body points (world) for a person P: upper-body local point -> world, head, shoulder, reachable hand ----------
function a92Pt(P, lx, ly) {
  const s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, sit = K.clamp(P.sit || 0), kn = K.clamp(P.kneel || 0);
  let hc = [0, -75]; if (sit > 0) hc = PEOPLE.lp(hc, P.seat === 'floor' ? [0, -24] : [-22, -52], sit); if (kn > 0) hc = PEOPLE.lp(hc, [-4, -48], kn);
  const lean = (P.lean || 0) + (P.age ?? 0.3) * 0.12, y = ly + 75, c = Math.cos(lean), n = Math.sin(lean);
  let x = (hc[0] + lx * c - y * n) * s * dir, yy = (hc[1] + lx * n + y * c) * s;
  const sq = P.sq ?? 1; x *= 1 + (1 - sq) * 0.7; yy *= sq;
  const tp = (P.tip || 0) * Math.sign(dir), ct = Math.cos(tp), st = Math.sin(tp);
  return [P.x + x * ct - yy * st, P.y + x * st + yy * ct];
}
const a92Head = (P) => a92Pt(P, (P.look || 0) * 4, -195 + (P.drop || 0) + (P.age ?? 0.3) * 6);
const a92Eye = (P) => { const h = a92Head(P); return [h[0], h[1] - 4 * (P.s || 1)]; };
// hand target clamped to the arm's reach (so a held prop is drawn where the hand really is). sd -1 = handL side, +1 = handR side
function a92Reach(P, sd, to) { const sh = a92Pt(P, sd * 31, -132), r = 72 * (P.s || 1), dx = to[0] - sh[0], dy = to[1] - sh[1], d = Math.hypot(dx, dy) || 1; return d <= r ? to : [sh[0] + dx / d * r, sh[1] + dy / d * r]; }
const a92Blink = (P, t) => { P.lid = Math.max(P.lid || 0, blink(t, P.seed || 3)); return P; };

// ---------- leatherBag: small brown drawstring pouch, base centre at (x, y), 70 tall x 60 wide at s 1 ----------
// o: {s, open 0..1, bulge, sq, limp 0..1, rot, strapTo: [x, y] (world), tie 0..1 (knot loosening), alpha, dark}
function a92Bag(ctx, x, y, o = {}) {
  const s = o.s ?? 1, op = K.clamp(o.open || 0), bu = 1 + (o.bulge || 0), sq = o.sq ?? 1, limp = K.clamp(o.limp || 0);
  if (o.strapTo) seg(ctx, x + 18 * s, y - 52 * s * sq, o.strapTo[0], o.strapTo[1], 4.5 * s, '#7a4212', 2.5 * s);
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * bu * (1 + (1 - sq) * 0.7) * (1 + limp * 0.18), s * sq * (1 - limp * 0.3)); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const nw = K.lerp(10, 26, op), nh = -54 - op * 4;
  const body = [[-12, 0], [-28, -8], [-31, -26], [-24, -44], [-nw, nh + 8], [-nw - op * 4, nh], [nw + op * 4, nh], [nw, nh + 8], [24, -44], [31, -26], [28, -8], [12, 0]];
  shape(ctx, body, '#9a5a22', { lw: 4.5, seed: 301, dot: '#5b3010', pitch: 7, rad: 0.25, da: 0.55 });
  if (op > 0.05) { shape(ctx, ell(0, nh, nw + op * 4, 5 + 7 * op, 18), C.black, { lw: 3.5, seed: 302 }); }
  else { shape(ctx, [[-14, nh - 2], [14, nh - 2], [10, nh - 14], [-10, nh - 14]], '#b8742e', { lw: 3.5, seed: 303 }); }
  // drawstring: tied bow, loosened strands
  const tie = K.clamp(o.tie ?? (op > 0.05 ? 1 : 0));
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.yellow; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-nw, nh + 6); ctx.lineTo(nw, nh + 6); ctx.stroke();
  if (tie < 0.9) { ctx.lineWidth = 3.5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 9 * (1 - tie), nh + 4 - 6 * (1 - tie), 7 * (1 - tie) + 1, 5, sd * 0.6, 0, 7); ctx.stroke(); } }
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 3, nh + 6); ctx.lineTo(sd * (6 + 8 * tie), nh + 22 + 10 * tie); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
}

// ---------- claimTiles: paper square with a brush border and one flat icon. (x, y) = centre ----------
// kind: cup comb cloth tent rug cow calf sheep camel lion room house school garden baghdad basra army
// o: {size 100, wide (double width), badge 'x2', ghost (pale, dashed), t, p (pop 0..1), rot, sq, label}
function a92Tile(ctx, x, y, kind, o = {}) {
  const sz = o.size ?? 100, w = sz * (o.wide ? 2 : 1), h = sz, p = o.p ?? 1, t = o.t || 0; if (p <= 0) return;
  const k = K.ease.back(K.clamp(p)), ghost = !!o.ghost;
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(k * (o.sx ?? 1), k * (o.sq ?? 1)); if (ghost) ctx.globalAlpha *= o.ga ?? 0.45;
  const R = K.rectPts(-w / 2, -h / 2, w, h);
  if (ghost) { ctx.save(); ctx.fillStyle = '#fffaf0'; K.poly(ctx, R, true); ctx.fill(); ctx.setLineDash([12, 9]); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
  else shape(ctx, R, o.bg || C.white, { lw: 6, seed: 310 + kind.length, dot: o.dot || '#e7dcc0', pitch: 9, rad: 0.25, da: 0.6 });
  ctx.save(); K.poly(ctx, R, true); ctx.clip(); ctx.scale(sz / 100, sz / 100);
  A92_ICON[kind] && A92_ICON[kind](ctx, t, o);
  ctx.restore();
  if (o.badge) { const bx = w / 2 - 6, by = -h / 2 + 6; shape(ctx, ell(bx, by, 24, 20, 18), C.red, { lw: 4, seed: 330 }); ctx.font = K.font(26, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.yellow; ctx.fillText(o.badge, bx, by + 2); }
  if (o.label) { ctx.font = K.font(o.labelSize || 34, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.strokeText(o.label, 0, h / 2 - 20); ctx.fillStyle = C.yellow; ctx.fillText(o.label, 0, h / 2 - 20); }
  ctx.restore();
}
// icons in a 100 x 100 box centred at 0 (wide tiles get 200 x 100, x -100..100)
const A92_ICON = {
  cup: (c) => { shape(c, [[-20, -18], [20, -18], [14, 22], [-14, 22]], C.blue, { lw: 4, seed: 340 }); c.save(); c.lineWidth = 6; c.strokeStyle = C.black; c.beginPath(); c.arc(24, 0, 10, -1.2, 1.2); c.stroke(); c.restore(); },
  comb: (c) => { shape(c, K.rectPts(-28, -16, 56, 12), C.yellow, { lw: 4, seed: 341 }); for (let i = 0; i < 7; i++) seg(c, -24 + i * 8, -2, -24 + i * 8, 18, 2.5, C.yellow, 2); },
  cloth: (c) => { shape(c, [[-28, -8], [28, -16], [30, 14], [-26, 20]], C.red, { lw: 4, seed: 342, dot: C.yellow, pitch: 7, rad: 0.25, da: 0.6 }); seg(c, -24, 4, 26, -2, 2, C.yellow, 0); },
  tent: (c) => { shape(c, [[-38, 30], [0, -34], [38, 30]], C.yellow, { lw: 5, seed: 343, dot: C.red, pitch: 8, rad: 0.25, da: 0.5 }); shape(c, [[-8, 30], [0, 2], [10, 30]], C.black, { lw: 3, seed: 344 }); seg(c, 0, -34, 0, -44, 3, C.black, 1); },
  rug: (c) => { for (const dy of [-14, 16]) { shape(c, K.rectPts(-34, dy - 11, 60, 22), C.red, { lw: 4, seed: 345, dot: C.yellow, pitch: 6, rad: 0.25, da: 0.6 }); shape(c, ell(28, dy, 9, 11, 14), '#a8160f', { lw: 4, seed: 346 }); c.fillStyle = C.black; c.beginPath(); c.arc(28, dy, 3, 0, 7); c.fill(); } },
  cow: (c, t, o) => { a92Cow(c, 0, 24, 0.9, t, o.moo); },
  calf: (c, t) => { a92Cow(c, -20, 26, 0.55, t, 0); a92Cow(c, 22, 30, 0.5, t + 1, 0); },
  sheep: (c, t, o) => { for (let i = 0; i < 3; i++) sheep(c, { x: -28 + i * 26, y: 34 - i * 4, s: 0.26, dir: i % 2 ? -1 : 1, noBlink: true, shake: o.tremble ? tremble(t + i, 1.5, 11) : 0 }); },
  camel: (c) => { camel(c, { x: -10, y: 36, s: 0.17, dir: 1, noBlink: true }); camel(c, { x: 28, y: 40, s: 0.13, dir: 1, pal: 1, noBlink: true }); },
  lion: (c, t, o) => { lion(c, { x: 4, y: 34, s: 0.2, dir: 1, roar: o.roar || 0, brow: 1, noBlink: true }); },
  room: (c) => { shape(c, [[-38, 36], [-38, -10], [0, -38], [38, -10], [38, 36]], '#efdcae', { lw: 5, seed: 347, dot: C.red, pitch: 9, rad: 0.2, da: 0.35 }); shape(c, townArchPts(-12, 12, 4, 36, 'pointed'), '#7a4212', { lw: 3.5, seed: 348 }); shape(c, K.rectPts(18, -4, 12, 14), C.yellow, { lw: 3, seed: 349 }); shape(c, K.rectPts(-30, -4, 12, 14), C.yellow, { lw: 3, seed: 349 }); },
  house: (c) => { shape(c, [[-36, 36], [-36, -14], [-4, -38], [36, -14], [36, 36]], '#d4b27a', { lw: 5, seed: 350, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.4 }); shape(c, [[-12, 36], [-14, 4], [8, 2], [10, 36]], '#7a4212', { lw: 3.5, seed: 351 });
    c.save(); c.lineWidth = 3; c.strokeStyle = C.black; c.beginPath(); c.moveTo(22, -16); c.lineTo(16, -2); c.lineTo(24, 8); c.lineTo(18, 20); c.stroke(); c.restore(); },
  school: (c) => { shape(c, [[-40, 36], [-40, -12], [40, -12], [40, 36]], '#fff3d6', { lw: 5, seed: 352, dot: C.blue, pitch: 8, rad: 0.2, da: 0.35 }); shape(c, townArchPts(-30, 30, -36, -10, 'pointed'), C.blue, { lw: 4, seed: 353 });
    shape(c, K.rectPts(-28, -2, 40, 24), '#2b3a2b', { lw: 3.5, seed: 354 }); seg(c, -22, 8, 4, 8, 1, C.white, 0); for (let i = 0; i < 3; i++) shape(c, ell(22 + (i % 2) * 8, 8 + i * 9, 6, 6, 10), C.white, { lw: 2.5, seed: 355, dot: C.skin, pitch: 4, rad: 0.3 }); },
  garden: (c, t) => { shape(c, K.rectPts(-44, 26, 88, 16), GREEN, { lw: 3.5, seed: 356 }); seg(c, -18, 30, -18, -4, 7, '#7a4212', 3); shape(c, ell(-18, -16, 22, 20, 16), GREEN, { lw: 4, seed: 357, dot: GREEND, pitch: 6, rad: 0.3, da: 0.6 });
    shape(c, K.rectPts(10, 14, 28, 14), '#b9b4c6', { lw: 3, seed: 358 }); c.save(); c.lineWidth = 3; c.strokeStyle = '#5fa0ff'; for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(24, 14); c.quadraticCurveTo(24 + sd * 10, -10 - 3 * Math.sin(t * 9), 24 + sd * 18, 14); c.stroke(); } c.restore();
    for (let i = 0; i < 4; i++) shape(c, ell(-38 + i * 12, 22, 4, 4, 8), [C.red, C.yellow][i % 2], { lw: 1.5, seed: 359 }); },
  baghdad: (c) => { shape(c, [[-96, 40], [-96, 0], [96, 0], [96, 40]], '#e8b25a', { lw: 4.5, seed: 360, dot: C.red, pitch: 8, rad: 0.2, da: 0.35 }); for (let i = -88; i < 90; i += 16) shape(c, K.rectPts(i, -8, 9, 10), '#e8b25a', { lw: 2.5, seed: 361 });
    for (const [dx, r] of [[-40, 22], [20, 28], [70, 16]]) { shape(c, K.rectPts(dx - r, -8 - r, r * 2, r), '#fff3d6', { lw: 3.5, seed: 362 }); const d = ell(dx, -8 - r, r, r * 1.1, 20).filter(([, y]) => y <= -8 - r + 1); shape(c, d.concat([[dx - r, -8 - r]]), C.blue, { lw: 4, seed: 363 }); }
    seg(c, -76, -8, -76, -62, 9, '#fff3d6', 3); shape(c, ell(-76, -66, 7, 7, 10), C.blue, { lw: 3, seed: 364 }); },
  basra: (c, t) => { shape(c, K.rectPts(-100, 18, 200, 22), '#3f7be6', { lw: 3.5, seed: 365 }); for (const bx of [-50, 34]) shape(c, [[bx - 18, 16 + Math.sin(t * 3 + bx) * 2], [bx + 18, 16], [bx + 12, 26], [bx - 12, 26]], '#7a4212', { lw: 3, seed: 366 });
    seg(c, -34, 16, -34, -2, 2, C.black, 0); shape(c, [[-34, -2], [-34, -24], [-18, -6]], C.white, { lw: 2.5, seed: 367 });
    for (const [px, ph] of [[-80, 60], [70, 64], [92, 46]]) { seg(c, px, 18, px + 6, 18 - ph, 6, '#a8741a', 2.5); for (let f = 0; f < 5; f++) { const a = -Math.PI / 2 + (f - 2) * 0.62; seg(c, px + 6, 18 - ph, px + 6 + Math.cos(a) * 22, 18 - ph + Math.sin(a) * 14 + 6, 4, GREEN, 2); } }
    shape(c, K.rectPts(-6, -14, 40, 32), '#fff3d6', { lw: 3, seed: 368 }); const d = ell(14, -14, 20, 18, 16).filter(([, y]) => y <= -13); shape(c, d.concat([[-6, -14]]), GREEN, { lw: 3.5, seed: 369 }); },
  army: (c, t, o) => { const n = 7; for (let i = 0; i < n; i++) { const sx = -84 + i * 26, bob = Math.sin(t * 8 + i * 0.9) * 2; seg(c, sx, 34, sx, 4 + bob, 12, C.red, 3); shape(c, ell(sx, -6 + bob, 8, 8, 12), C.white, { lw: 3, seed: 370, dot: C.skin, pitch: 4, rad: 0.3 }); seg(c, sx + 9, 30, sx + 9, -34 + bob, 2, '#7a4212', 1.5); shape(c, [[sx + 6, -34 + bob], [sx + 12, -34 + bob], [sx + 9, -44 + bob]], '#b9b4c6', { lw: 2, seed: 371 }); }
    seg(c, -96, 34, -96, -40, 3, '#7a4212', 1.5); const wv = Math.sin(t * 6); shape(c, [[-96, -40], [-60, -38 + wv * 4], [-62, -20 + wv * 3], [-96, -22]], C.yellow, { lw: 3, seed: 372, dot: C.red, pitch: 6, rad: 0.25, da: 0.6 }); },
};
// a small flat cow (for the cow and calf tiles; no cow in the Library yet)
function a92Cow(c, x, y, s, t, moo) {
  c.save(); c.translate(x, y); c.scale(s, s);
  for (const lx of [-26, -14, 16, 28]) seg(c, lx, -12, lx, 6, 6, C.white, 2.5);
  shape(c, ell(0, -26, 38, 20, 20), C.white, { lw: 4, seed: 380 }); shape(c, ell(-12, -30, 10, 8, 10), C.black, { lw: 0 }); shape(c, ell(14, -22, 9, 7, 10), C.black, { lw: 0 });
  shape(c, ell(40, -40, 14, 13, 14), C.white, { lw: 4, seed: 381 }); shape(c, ell(48, -34 + (moo ? 2 : 0), 10, 7 + (moo ? 3 : 0), 12), C.skin, { lw: 3, seed: 382 });
  seg(c, 34, -52, 28, -60, 3, C.yellow, 1.5); seg(c, 46, -52, 52, -60, 3, C.yellow, 1.5); c.fillStyle = C.black; c.beginPath(); c.arc(40, -44, 2.5, 0, 7); c.fill();
  if (moo) { c.beginPath(); c.ellipse(50, -32, 4, 3 + 2 * moo, 0, 0, 7); c.fill(); }
  seg(c, -38, -30, -46, -14 + Math.sin(t * 5) * 3, 2, C.black, 0); c.restore();
}

// ---------- claimPile: tiles keyed to cue times, a damped sway, a squash down the rows, a collapse ----------
// list: [[t0, kind, x, y, opts]] (world centres); o: {tc: collapse time, base: [x, y] pivot for the sway, droop: radians}
function a92Pile(ctx, t, list, o = {}) {
  let sw = 0, lastT = -1; for (const e of list) if (t >= e[0]) lastT = e[0];
  if (lastT >= 0) sw = swing(t, lastT, o.amp ?? 0.025, 1.3, 2.0);
  const tc = o.tc ?? 1e9, base = o.base || [500, 600];
  ctx.save(); ctx.translate(base[0], base[1]); ctx.rotate(sw + (o.droop || 0)); ctx.translate(-base[0], -base[1]);
  list.forEach((e, i) => {
    const [t0, kind, x, y, op = {}] = e; if (t < t0) return;
    let px = x, py = y, rot = op.rot || 0, alpha = 1;
    // landing squash runs down the rows a few frames late
    let sq = 1; for (const f of list) if (f[0] <= t && f[0] > t0 && f[3] < y) sq = Math.min(sq, landSquash(t, f[0] + (y - f[3]) / 900, 0.1));
    if (t >= tc) { const r = K.rng(900 + i), d0 = tc + r() * 0.35, f = t - d0; if (f > 0) { py = y + 900 * f * f; px = x + (r() - 0.5) * 300 * f; rot += (r() - 0.5) * 7 * f; } alpha = K.clamp(1 - (t - tc - 0.6) / 0.5); }
    if (alpha <= 0) return;
    ctx.save(); ctx.globalAlpha *= alpha;
    a92Tile(ctx, px, py, kind, { ...op, t, rot, sq: sq * (op.sq ?? 1), p: K.clamp((t - t0) / 0.32) });
    ctx.restore();
  });
  ctx.restore();
}
// bubble trail (three circles) from a to b, popping in from p
function a92Trail(ctx, a, b, p, o = {}) { [0.25, 0.5, 0.75].forEach((f, i) => { const k = K.ease.back(K.clamp((p - i * 0.15) / 0.3)); if (k <= 0) return; const r = (o.r || 10) * (0.7 + 0.3 * i) * k;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.beginPath(); ctx.arc(K.lerp(a[0], b[0], f), K.lerp(a[1], b[1], f), r, 0, 7); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }); }

// ---------- bagFood ----------
function a92Food(ctx, kind, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (kind === 'bread') { shape(ctx, ell(0, -9, 24, 10, 22), '#e8a04a', { lw: 4, seed: 390, dot: '#a8741a', pitch: 6, rad: 0.25, da: 0.5 }); for (const [dx, dy] of [[-10, -12], [4, -8], [12, -13]]) { ctx.fillStyle = '#7a4212'; ctx.beginPath(); ctx.arc(dx, dy, 2.5, 0, 7); ctx.fill(); } }
  else if (kind === 'cheese') shape(ctx, [[-12, 0], [12, 0], [12, -12], [-12, -4]], '#fff3a0', { lw: 3.5, seed: 391, dot: '#e8b25a', pitch: 5, rad: 0.3, da: 0.6 });
  else if (kind === 'olive') { shape(ctx, ell(0, -5, 6, 5, 12), '#3d5a1e', { lw: 2.5, seed: 392 }); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-2, -7, 1.5, 0, 7); ctx.fill(); }
  else if (kind === 'lemon') { shape(ctx, [[-14, -9], [-10, -16], [0, -19], [10, -16], [14, -9], [10, -2], [0, 0], [-10, -2]], C.yellow, { lw: 3.5, seed: 393, dot: C.red, pitch: 5, rad: 0.22, da: 0.35 }); }
  ctx.restore();
}
// ---------- purse: fat red drawstring purse, base centre (x, y) ----------
function a92Purse(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (o.sq ?? 1));
  shape(ctx, [[-14, 0], [-32, -10], [-34, -32], [-22, -48], [-10, -54], [10, -54], [22, -48], [34, -32], [32, -10], [14, 0]], C.red, { lw: 4.5, seed: 395, dot: '#a8160f', pitch: 7, rad: 0.25, da: 0.5 });
  for (const dx of [-8, 4, 14]) shape(ctx, ell(dx, -56, 9, 5, 12), C.yellow, { lw: 3, seed: 396 });
  seg(ctx, -12, -50, 12, -50, 3, C.yellow, 1.5);
  if (o.glint) for (const [gx, gy] of [[-6, -62], [16, -58]]) star(ctx, gx, gy, 9 * o.glint, C.white, 0.3);
  ctx.restore();
}
// ---------- diwan: low couch, seat top 48 above the base (x0..x1 at floor y) ----------
function a92Diwan(ctx, x0, x1, y) {
  for (const lx of [x0 + 20, x1 - 20]) shape(ctx, ell(lx, y - 6, 12, 8, 12), WOOD, { lw: 4, seed: 400 });
  shape(ctx, K.rectPts(x0, y - 48, x1 - x0, 40), C.red, { lw: 6, seed: 401, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.45 });
  ctx.save(); K.poly(ctx, K.rectPts(x0, y - 48, x1 - x0, 40), true); ctx.clip(); ctx.fillStyle = C.yellow; for (let x = x0 + 30; x < x1; x += 60) ctx.fillRect(x, y - 48, 12, 40); ctx.restore(); ink(ctx, K.rectPts(x0, y - 48, x1 - x0, 40), 6, 401);
  shape(ctx, ell(x0 + 4, y - 66, 26, 28, 18), C.blue, { lw: 5, seed: 402, dot: NAVY, pitch: 8, rad: 0.25, da: 0.5 });
  shape(ctx, ell(x1 - 4, y - 62, 20, 22, 18), C.blue, { lw: 5, seed: 403, dot: NAVY, pitch: 8, rad: 0.25, da: 0.5 });
}
function a92Pillow(ctx, x, y, sq = 1) { shape(ctx, ell(x, y - 18 * sq, 46, 18 * sq, 20), C.white, { lw: 5, seed: 404, dot: C.blue, pitch: 8, rad: 0.2, da: 0.35 }); }
// blanket over a lying figure: x0..x1 along the body, top y follows the body bump
function a92Blanket(ctx, x0, x1, y, bump, br = 1) { const h = 34 * br; shape(ctx, [[x0, y + 6], [x0 + 10, y - h * 0.7], [x0 + 70, y - h - bump], [x1 - 70, y - h * 0.8], [x1, y - h * 0.4], [x1 + 8, y + 6]], C.blue, { lw: 5, seed: 405, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.4 }); }

// ---------- worryScribble: black looping strokes over a head; scale, alpha, burst (0..1) ----------
function a92Scribble(ctx, x, y, t, o = {}) {
  const sc = o.s ?? 1, burst = K.clamp(o.burst || 0); if (sc <= 0.02 || (o.alpha ?? 1) <= 0) return;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); ctx.scale(sc, sc);
  const r = K.rng(77), n = nz(77).n2;
  if (burst <= 0) { ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath();
    for (let i = 0; i < 12; i++) { const cx = (r() - 0.5) * 90, cy = (r() - 0.5) * 50, rr = 12 + r() * 16, a0 = r() * 6; for (let k = 0; k <= 14; k++) { const a = a0 + k * 0.5, w = n(t * 0.8 + i, k * 0.3) * 6; const px = cx + Math.cos(a) * (rr + w), py = cy + Math.sin(a) * (rr * 0.7 + w); if (k === 0 && i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } }
    ctx.stroke(); }
  else { for (let i = 0; i < 26; i++) { const a = r() * 6.28, d = 30 + r() * 60 + burst * 160; ctx.globalAlpha = K.clamp(1 - burst); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d * 0.7, 6 * (1 - burst) + 2, 0, 7); ctx.fill(); } }
  ctx.restore();
}
// ---------- iconBalloon: round balloon with a small tail; inside(c) draws the icon at 0,0 ----------
function a92Balloon(ctx, x, y, r, tail, p, inside) {
  const k = K.ease.back(K.clamp(p)); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const tx = tail[0] - x, ty = tail[1] - y, a = Math.atan2(ty, tx);
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.35) * r * 0.9, Math.sin(a - 0.35) * r * 0.9); ctx.lineTo(tx / k * 0.6, ty / k * 0.6); ctx.lineTo(Math.cos(a + 0.35) * r * 0.9, Math.sin(a + 0.35) * r * 0.9); ctx.closePath(); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke();
  shape(ctx, ell(0, 0, r, r * 0.9, 36), C.white, { lw: 6, seed: 410 });
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, r - 4, r * 0.9 - 4, 0, 0, 7); ctx.clip(); inside(ctx); ctx.restore();
  ctx.restore();
}
function a92ScrollIcon(c) { shape(c, K.rectPts(-30, -26, 60, 52), '#fff3d6', { lw: 4, seed: 411 }); for (const y of [-14, -2, 10]) seg(c, -20, y, 20, y, 2, C.black, 0); shape(c, ell(-30, 0, 7, 28, 12), '#e8b25a', { lw: 3.5, seed: 412 }); shape(c, ell(30, 0, 7, 28, 12), '#e8b25a', { lw: 3.5, seed: 412 }); }
function a92LaughIcon(c, t) { shape(c, ell(0, 0, 30, 30, 24), C.yellow, { lw: 4, seed: 413 }); c.save(); c.lineWidth = 4; c.strokeStyle = C.black; for (const sd of [-1, 1]) { c.beginPath(); c.arc(sd * 11, -6, 6, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); } c.restore();
  shape(c, [[-16, 6], [16, 6], [10, 20 + 3 * Math.sin(t * 20)], [-10, 20 + 3 * Math.sin(t * 20)]], C.black, { lw: 2, seed: 414 }); shape(c, ell(0, 16, 7, 3, 10), C.red, { lw: 0 }); }

// ---------- judge turban: drawn by the story so it can tilt, slip and roll (the person has head: 'none') ----------
function a92Turban(ctx, x, y, s, rot, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * 1.2, s * 1.2);
  const o = (seed) => ({ lw: 5, seed, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 });
  shape(ctx, ell(0, -28, 42, 18, 24), C.white, o(420)); shape(ctx, ell(2, -46, 34, 18, 22), C.white, o(421)); shape(ctx, ell(0, -60, 20, 10, 16), C.white, o(422));
  seg(ctx, -34, -26, 36, -36, 2, C.blue, 1.5);
  ctx.restore();
}
// judge with his turban: rot = tilt on the head (radians, about the head top), off = turban off the head (world point and roll angle)
function a92JudgeDraw(ctx, P, tb) {
  person(ctx, P);
  const h = a92Head(P), s = P.s || 1;
  if (!tb || !tb.off) { const a = (P.tilt || 0) + (P.tip || 0) + (tb ? tb.rot : 0); a92Turban(ctx, h[0] + Math.sin(a) * 20 * s, h[1] + 4 * s - (1 - Math.cos(a)) * 10, s, a); }
}
// ---------- person laugh: {tip, talk, lid, sq, drop} cycling at 2.5 Hz with decay ----------
function a92Laugh(t, t0, amp = 1, dur = 2.5) { if (t < t0) return null; const d = t - t0, e = amp * Math.exp(-d / dur), ph = d * 2.5 * Math.PI * 2;
  return { tip: -0.12 * e - 0.08 * e * Math.max(0, Math.sin(ph)), talk: 0.5 + 0.5 * Math.abs(Math.sin(ph * 1.6)), lid: 0.75, sq: 1 + 0.03 * e * Math.sin(ph), drop: -6 * e }; }
// ---------- crowdDots: tiny heads in a region, popping in seeded order; hands up on a cue ----------
function a92Heads(ctx, t, t0, n, region, o = {}) {
  const r = K.rng(o.seed ?? 55), [x0, y0, x1, y1] = region;
  for (let i = 0; i < n; i++) { const hx = K.lerp(x0, x1, r()), hy = K.lerp(y0, y1, r()), d = t0 + r() * (o.spread ?? 0.9), k = K.ease.back(K.clamp((t - d) / 0.18)); if (k <= 0) continue;
    const s = (o.s ?? 1) * k * (o.alpha ?? 1 ? 1 : 1), col = [C.red, C.blue, GREEN, C.yellow][i % 4];
    ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.translate(hx, hy); ctx.scale(s, s);
    shape(ctx, [[-10, 18], [-8, 6], [8, 6], [10, 18]], col, { lw: 2.5, seed: 430 });
    if (o.hands != null) { const hu = K.ease.out(K.clamp((t - o.hands - (x1 - hx) / (x1 - x0) * 0.6) / 0.2)); if (hu > 0) seg(ctx, 8, 8, 12 + 4 * hu, 8 - 20 * hu, 2.5, C.white, 1.5); }
    shape(ctx, ell(0, 0, 8, 8, 12), C.white, { lw: 2.5, seed: 431, dot: C.skin, pitch: 4, rad: 0.3 }); ctx.fillStyle = C.black; ctx.fillRect(-4, -2, 2, 2.5); ctx.fillRect(2, -2, 2, 2.5);
    ctx.restore(); }
}
// sweat drop
function a92Sweat(ctx, x, y, p) { if (p <= 0 || p >= 1) return; const yy = y + 30 * p; ctx.save(); ctx.globalAlpha = 1 - p * 0.6; shape(ctx, [[x, yy - 12], [x + 6, yy], [x, yy + 5], [x - 6, yy]], '#5fa0ff', { lw: 3, seed: 440 }); ctx.restore(); }
// simple brush red X
function a92X(ctx, x, y, r, p) { const k = K.clamp(p); if (k <= 0) return; const sc = k < 1 ? 1.4 - 0.4 * k : 1; seg(ctx, x - r * sc, y - r * sc, x - r * sc + 2 * r * sc * K.clamp(k * 2), y - r * sc + 2 * r * sc * K.clamp(k * 2), 14, C.red, 4); if (k > 0.5) seg(ctx, x + r * sc, y - r * sc, x + r * sc - 2 * r * sc * K.clamp(k * 2 - 1), y - r * sc + 2 * r * sc * K.clamp(k * 2 - 1), 14, C.red, 4); }
