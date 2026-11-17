// ===== AN-134 other sets: S6 high view (feastSpread), S9 house diagram (hundredWindows), S15 treasury and the coin insert =====
// ---------- S6: high view of the lawn, the hundred trays ----------
const hkFeastT = (i) => 54.22 + 2.1 * Math.sqrt(i / 100);              // the ticks speed up
const hkFeastN = (t) => Math.min(100, Math.floor(100 * Math.pow(K.clamp((t - 54.22) / 2.1), 2) + 1e-9));
function hkHighBack() { return bake('hk:high', 1000, 1230, (c) => {
  c.fillStyle = HK_LAWN; c.fillRect(0, 0, 1000, 1230); c.fillStyle = dotPat(c, HK_LAWND, 12, 0.3); c.fillRect(0, 0, 1000, 1230);
  hkRug(c, 40, 960, 640, 1100, 1, 0, { skew: 40 });
  for (let i = 0; i < 12; i++) shape(c, ell(-40 + i * 95, 40 + (i % 2) * 40, 120, 90, 24), GREEN, { lw: 6, seed: 830 + i, dot: GREEND, pitch: 10, rad: 0.3, da: 0.5 });
  shape(c, K.rectPts(-10, 1150, 1020, 100), HK_CREAM, { lw: 5, seed: 836, dot: HK_CREAMD, pitch: 9, rad: 0.2, da: 0.4 }); }); }
function hkHigh(ctx, t, cam) {
  ctx.drawImage(hkHighBack(), 0, 0, 1000, 1230); hkGardenShade(ctx, t);
  const blocks = [['fruit', 500, (i) => (t - hkFeastT(i)) / 0.12], ['sweets', 180, (i) => (t - 57.36 - i * 0.003) / 0.15], ['jugs', 820, (i) => (t - 57.8 - i * 0.003) / 0.15]];
  for (const [kind, cx, pop] of blocks) hkFeast(ctx, kind, cx, 690, 1040, 310, pop);
  // the guests small at the bottom edge, looking up at it all
  const g = [hkP(HK_CAL, 600, 1230, 0.55, -1, { sit: 1, seat: 'floor', mouth: t > 56.3 ? 'o' : 'closed', gaze: [0, -1], seed: 81 }), hkP(HK_VIZ, 770, 1235, 0.55, -1, { sit: 1, seat: 'floor', gaze: [-0.3, -1], seed: 61 }), hkP(HK_MER, 400, 1235, 0.55, 1, { mouth: 'smile', handL: [22, -105], handR: [-18, -112], seed: 71 })];
  g.forEach((P) => hkDraw(ctx, P));
  // the crane: leaves sweep across while the view changes
  if (t < 54.0) { ctx.save(); const u = hkB(t, 53.5, 0.5); for (let i = 0; i < 9; i++) shape(ctx, ell(-100 + i * 140, -200 + 900 * u + (i % 2) * 120, 150, 120, 20), GREEN, { lw: 6, seed: 840 + i, dot: GREEND, pitch: 10, rad: 0.3, da: 0.5 }); ctx.restore(); }
}

// ---------- S9: the house diagram ----------
const HK_WAVES = [['dome', 94.72], ['jugs', 95.68], ['cushion', 96.76]];
const HK_WR = (() => { const r = K.rng(21), a = []; for (let i = 0; i < 300; i++) a.push(r()); return a; })();
function hkDiagram(ctx, t, cam) {
  ctx.fillStyle = C.yellow; ctx.fillRect(0, 0, 1000, 1230); ctx.fillStyle = dotPat(ctx, HK_ORANGE, 14, 0.25); ctx.fillRect(0, 0, 1000, 1230);
  ctx.fillStyle = HK_LAWN; ctx.fillRect(0, 900, 1000, 330); ink(ctx, [[0, 902], [1000, 902]], 6, 850);
  const rise = settleTo(t, 87.22, 300, 0, 0.9, 0.06); ctx.save(); ctx.translate(0, rise); ctx.beginPath(); ctx.rect(0, -400, 1000, 1302 - rise); ctx.clip();
  ctx.drawImage(hkFacade(), 0, 0, 1000, 1000);
  const busts = [92, 95, 97];
  hkWindows(ctx, (i) => { const r = Math.floor(i / 10), c = i % 10; return t > 89.38 + 1.1 * ((r + c) / 18) ? 1 : 0; }, t, { heads: t > 89.92, busts: t > 89.92 ? busts : [] });
  // three women of the household at the bottom row, waving at different phases
  if (t > 89.92) busts.forEach((i, k) => { const [x, y] = hkWinXY(i); ctx.save(); ctx.beginPath(); ctx.rect(x, y, HK_HW.ww, HK_HW.wh); ctx.clip();
    const P = hkP(k === 1 ? { costume: 'lady' } : { costume: 'maiden', pal: k ? { robe: C.red } : undefined }, x + 23, y + 70, 0.2, 1, { mouth: 'smile', seed: 90 + k }); P.aR = [2.4 + 0.3 * Math.sin(t * 8 + k * 2), 2.6]; P.alpha = hkB(t, 89.92 + k * 0.15, 0.2); hkDraw(ctx, P); ctx.restore(); });
  // the highlighted window ring
  if (t > 91.72 && t < 93.0) { const [x, y] = hkWinXY(29); ctx.lineWidth = 6; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(x + 23, y + 19, 36 + 4 * Math.sin(t * 8), 0, 7); ctx.stroke(); }
  // the sun arc over the roof
  if (t > 93.78 && t < 94.7) { const u = hkB(t, 93.78, 0.7, 'lin'); ctx.save(); ctx.translate(K.lerp(220, 780, u), 140 - 90 * Math.sin(Math.PI * u)); ctx.scale(0.35, 0.35); sun(ctx, 0, 0, t); ctx.restore(); }
  // the tray from window 29 to the door (93.0-93.7)
  if (t > 93.0 && t < 93.75) { const u = hkB(t, 93.0, 0.7), [x, y] = hkWinXY(29); hkSprite(ctx, 'fruit', K.lerp(x + 23, 500, u), K.lerp(y + 38, 870, u) - 80 * Math.sin(Math.PI * u), 0.5); }
  // three waves of icons: every window drops one, they stream to the door
  HK_WAVES.forEach(([kind, a], w) => { if (t < a || t > a + 1.6) return; for (let i = 0; i < 100; i++) { const t0 = a + HK_WR[w * 100 + i] * 0.6, u = (t - t0) / 0.75; if (u < 0 || u > 1) continue; const [x, y] = hkWinXY(i), e = K.ease.inOut(u);
    hkSprite(ctx, kind, K.lerp(x + 23, 500 + (HK_WR[(w * 100 + i + 7) % 300] - 0.5) * 40, e), K.lerp(y + 36, 880, e) - 40 * Math.sin(Math.PI * u), 0.3 * (1 - 0.4 * e)); } });
  // the merged stream pours out of the door to the right
  if (t > 97.7) for (let i = 0; i < 18; i++) { const u = ((t - 97.7) * 0.9 + i / 18) % 1, kind = HK_WAVES[i % 3][0]; if (t - 97.7 < i / 18 / 0.9) continue; hkSprite(ctx, kind, 520 + u * 560, 890 - 14 * Math.abs(Math.sin(u * 12)), 0.32); }
  ctx.restore();
  // the presenter with his pointer
  const P = hkP(HK_MER, 110, 900, 0.7, 1, { seed: 71, mouth: 'smile', lid: 0.2 });
  P.talk = hkIn(t, 85.94, 87.1) || hkIn(t, 89.0, 90.5) || hkIn(t, 94.6, 97.6) ? 0.4 + 0.5 * Math.abs(Math.sin(t * 10)) : 0;
  const tgt = t < 89.3 ? [400, 300] : t < 91.6 ? [K.lerp(250, 760, hkB(t, 89.4, 1.1)), 260] : t < 93.0 ? [760, 330] : t < 94.6 ? [500, 820] : t < 97.7 ? [500, 860] : [300, 950];
  P.gaze = hkG(P, tgt); hkArms(t, P, [[0, { w: [200, 700] }], [85.94, { w: [190, 640] }, 0.3], [97.7, [36, -62], 0.4]], [[0, [-36, -62]], [97.7, [-60, -100], 0.3]]);
  P.sq = t > 97.7 ? 1 + 0.02 * hkPulse(t, 97.9, 0.4) : breathe(t, 4);
  P.after = (c, Q) => { if (t > 97.9) return; const h = hkHandW(Q, 'R'), d = Math.hypot(tgt[0] - h[0], tgt[1] - h[1]), L = 160, e = [h[0] + (tgt[0] - h[0]) / d * L, h[1] + (tgt[1] - h[1]) / d * L]; seg(c, h[0], h[1], e[0], e[1], 6, HK_WOODC, 3); shape(c, ell(e[0], e[1], 6, 6, 8), C.red, { lw: 2, seed: 851 }); };
  hkDraw(ctx, P);
  // the inset: one woman sets a tray on her sill, pats it, smiles
  hkInset(ctx, 700, 360, 200, hkB(t, 91.72, 0.2, 'lin') * (1 - hkB(t, 92.75, 0.2, 'lin')), (c) => {
    c.fillStyle = '#f2d27a'; c.fillRect(-150, -150, 300, 300); c.fillStyle = C.yellow; c.fillRect(-100, -110, 200, 170); ink(c, K.rectPts(-100, -110, 200, 170), 6, 852);
    const W = hkP({ costume: 'maiden' }, -10, 160, 0.8, 1, { mouth: 'smile', seed: 93 }); hkArms(t, W, [[0, { w: [30, 50] }], [92.3, { w: [40, 40] }, 0.2]], [[0, { w: [-40, 50] }]]);
    if (t > 92.3) W.aR = [W.aR[0] + 0.15 * Math.sin(t * 18), W.aR[1]]; W.gaze = hkG(W, [40, 50]); c.save(); c.beginPath(); c.rect(-100, -110, 200, 170); c.clip(); hkDraw(c, W); c.restore();
    shape(c, K.rectPts(-115, 58, 230, 20), HK_CREAMD, { lw: 4, seed: 853 }); hkTray(c, K.lerp(-10, 40, hkB(t, 91.8, 0.4)), 58, 0.9, 'fruit'); });
}

// ---------- S15: the state treasury ----------
const HK_TCH = [330, 470, 610, 750];
const hkCount = (t) => { const v = t < 147.7 ? 3e6 * Math.pow(hkB(t, 145.42, 2.28, 'lin'), 1.6) : t < 148.62 ? 3e6 : 3e6 + 7e5 * hkB(t, 148.62, 1.76, 'inOut');
  return t < 150.38 ? Math.round(v / 1000) * 1000 + (t < 150.3 && t > 145.5 ? Math.floor(K.rng(Math.floor(t * 30))() * 999) : 0) : 3700000; };
const HK_FILL = [[145.42, 147.5], [147.7, 148.5], [148.62, 149.8], [149.86, 150.38]];
function hkTreasury(ctx, t, cam) {
  const vo = t < 141.3 ? 0 : hkB(t, 141.3, 0.7), A = palaceHall(ctx, { wall: 'blue', vault: { open: vo }, door: false, light: 0.6, throne: false, t });
  const V = A.vault || { x0: 620, x1: 820, top: 560 }, vx = (V.x0 + V.x1) / 2;
  hkGlow(ctx, vx, 820, 380, t, 0.8 * vo);
  if (vo > 0.3) hkCoinPile(ctx, vx, 900, (V.x1 - V.x0) * 0.8, 120 * vo, { seed: 4 });
  // chests: fill and shut in turn
  HK_TCH.forEach((x, i) => { const [a, b] = HK_FILL[i], f = hkB(t, a, b - a - 0.15, 'lin'), lid = t < b ? 1 : 1 - hkB(t, b, 0.15); hkChest(ctx, x, 905, 1, { lid, fill: f, sq: impactSquash(t, b + 0.15, 0.9) });
    if (t > a && t < b) for (let k = 0; k < 7; k++) { const u = ((t - a) * 2.2 + k / 7) % 1, sx = vx - 40, p = [K.lerp(sx, x, u), K.lerp(800, 840, u) - 160 * Math.sin(Math.PI * u)]; hkCoin(ctx, p[0], p[1], 10, { spin: t * 9 + k }); } });
  // the vizier skids in and points; mops his brow later
  const vxf = (tt) => kfn(tt, [[140.4, 1000], [140.95, 690]], 'out'), W = hkWalk(vxf, t, 10), Z = hkP(HK_VIZ, vxf(t), 900, 1, -1, { ph: W.ph, amp: Math.min(1, W.amp), seed: 61, tip: t < 141.0 ? 0.12 : -0.1 * hkPulse(t, 140.95, 0.35) });
  Z.gaze = t < 147.0 ? hkG(Z, [vx, 700]) : hkG(Z, [500, 200]); Z.mouth = t > 141.3 && t < 145 ? 'o' : 'closed'; Z.brow = t > 148.6 ? -0.5 : 0;
  hkArms(t, Z, [[0, [36, -62]], [140.95, HKH.fwd, 0.2], [141.8, [36, -62], 0.3], [148.62, [38, -206], 0.3], [149.8, [36, -62], 0.3]]);
  if (hkIn(t, 148.9, 149.8)) Z.aR = [Z.aR[0], Z.aR[1] + 0.25 * Math.sin(t * 14)];
  hkDraw(ctx, Z); if (t > 140.95 && t < 141.6) dustBurst(ctx, 680, 898, t - 140.95, 6, 6, 14, 40, 0.6, 861);
  // two guards, lit by the vault, counting on their fingers
  [935, 990].forEach((x, i) => { const G = hkP(HK_GRD[i], x, 900, 0.95, -1, { seed: 51 + i }); G.gaze = t < 147.7 ? hkG(G, [vx, 760]) : hkG(G, [500, 250]); G.mouth = t > 141.5 && t < 143 ? 'o' : 'closed'; G.eyes = t > 141.5 && t < 142.6 ? 'wide' : undefined;
    G.aL = hkArm(t, G, -1, t > 147.7 && t < 148.6 ? [[0, [-20, -140]]] : [[0, [-36, -62]]]); G.aR = hkArm(t, G, 1, [[0, [44, -112]]]); G.sq = t > 149.86 ? 0.96 + 0.02 * Math.sin(t * 6 + i) : breathe(t, i + 5);
    G.after = (c, Q) => { if (t > 147.7 && t < 148.6) { const h = hkHandW(Q, 'L'); for (let f = 0; f < 3; f++) seg(c, h[0] - 6 + f * 6, h[1] - 8, h[0] - 6 + f * 6, h[1] - 8 - 12 * (Math.floor((t - 147.7) * 6 + i) % 4 > f ? 1 : 0), 4, C.skin, 1.5); } }; hkDraw(ctx, G); });
}
// the insert: a coin turning, then the stamp hammer strikes three blanks (142.22-144.4)
const HK_HITS = [143.3, 143.6, 143.9];
function hkInsert(ctx, t, S) {
  const k = hkB(t, 142.22, 0.15, 'lin') * (1 - hkB(t, 144.25, 0.15, 'lin')); ctx.save(); ctx.globalAlpha *= k;
  S.box(ctx, 90, 320, 820, 640, 1, { fill: NAVY2, dot: '#1b3a8f', lw: 9, seed: 870 });
  ctx.save(); ctx.beginPath(); ctx.rect(96, 326, 808, 628); ctx.clip();
  if (t < 143.0) { hkCoin(ctx, 500, 640, 130, { spin: (t - 142.22) * 7 }); const g = hkPulse(t, 142.6, 0.4); if (g) star(ctx, 560, 560, 40 * g, C.white, t * 3); }
  else { // anvil, blank, hammer
    shape(ctx, K.rectPts(360, 760, 280, 70), '#4a5878', { lw: 6, seed: 871 }); shape(ctx, K.rectPts(400, 830, 200, 100), '#4a5878', { lw: 6, seed: 872 });
    const n = HK_HITS.filter((h) => t >= h).length, last = HK_HITS[Math.max(0, n - 1)];
    for (let i = 0; i < n - 1; i++) { const u = K.clamp((t - HK_HITS[i] - 0.05) / 0.35); hkCoin(ctx, K.lerp(500, 820, u), 740 - 220 * Math.sin(Math.PI * u) + 120 * u * u, 44, { spin: u * 6, pattern: 1 }); }
    hkCoin(ctx, 500, 740, 60, { pattern: n > 0 ? K.clamp((t - last) / 0.06) : 0 });
    // strike cycle: lift 0.3 s, whip down, contact on the hit, damped rebound
    let y = 400; const nxt = HK_HITS.find((h) => h > t - 0.02) ?? null;
    if (nxt !== null && t >= nxt - 0.3) { const u = (t - (nxt - 0.3)) / 0.3; y = u < 0.6 ? K.lerp(560, 430, K.ease.out(u / 0.6)) : K.lerp(430, 690, K.ease.in((u - 0.6) / 0.4)); }
    else if (n > 0) { const d = t - last; y = 690 - 130 * K.clamp(d / 0.12) + 10 * Math.exp(-d * 10) * Math.sin(d * 40); }
    else y = K.lerp(400, 560, hkB(t, 143.0, 0.1));
    seg(ctx, 560, y - 40, 760, y - 120, 16, HK_WOODC, 5); shape(ctx, K.rectPts(430, y - 70, 140, 60), '#9aa6b8', { lw: 6, seed: 873, dot: '#5a6478', pitch: 8, rad: 0.25, da: 0.5 });
    for (const h of HK_HITS) { const d = t - h; if (d > 0 && d < 0.25) for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; seg(ctx, 500 + Math.cos(a) * 80, 740 + Math.sin(a) * 40, 500 + Math.cos(a) * (110 + 200 * d), 740 + Math.sin(a) * (50 + 100 * d), 6, C.yellow, 3); } }
    if (t > 143.3) sfx(ctx, 'CLINK!', 300, 470, 70, hkB(t, 143.3, 0.25, 'lin'), { fill: C.yellow, rot: -0.1 });
  }
  ctx.restore(); ctx.restore();
}
