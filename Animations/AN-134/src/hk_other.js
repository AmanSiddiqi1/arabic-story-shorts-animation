// ===== AN-134 other sets: S6 high view (feastSpread), S9 house diagram (hundredWindows), S15 treasury and the coin insert =====
// ---------- S6: high view of the lawn, the hundred trays (v2, review note 5) ----------
// one 10 x 10 block fills the panel (about 80 px per tray), the first trays land at 53.9 and the hundredth on مئة (56.32); on كل (57.36) the view
// pulls back while two more blocks (sweets, jugs) slide in from the sides at the same tray size; the three watchers sit small on the lawn below
const hkFeastT = (i) => 53.9 + 2.42 * Math.sqrt(i / 100);              // the ticks speed up
const hkFeastN = (t) => (t < 53.9 ? 0 : Math.min(100, Math.floor(100 * Math.pow(K.clamp((t - 53.9) / 2.42), 2) + 1e-9) + 1));
const HK_HI = { yTop: 330, yBot: 1000, w: 820, gap: 880, c: [500, 450] };
const hkHighK = (t) => 1 - 0.5 * hkB(t, 57.36, 0.5);                  // pull-back scale about HK_HI.c
const hkHighDX = (t) => 600 * (1 - hkB(t, 57.36, 0.55));                // the side blocks slide in from outside
function hkHighBlocks(t) { const dx = hkHighDX(t); return [['fruit', 500], ['sweets', 500 - HK_HI.gap - dx], ['jugs', 500 + HK_HI.gap + dx]]; }
const hkHighP = (x, y, t) => { const k = hkHighK(t); return [HK_HI.c[0] + (x - HK_HI.c[0]) * k, HK_HI.c[1] + (y - HK_HI.c[1]) * k]; };
function hkHiRug(ctx, cx) { const x0 = cx - 460, w = 920, y0 = 250, h = 810;
  shape(ctx, K.rectPts(x0, y0, w, h), C.yellow, { lw: 6, seed: 831, dot: HK_ORANGE, pitch: 10, rad: 0.25, da: 0.4 });
  shape(ctx, K.rectPts(x0 + 26, y0 + 26, w - 52, h - 52), C.red, { lw: 5, seed: 832, dot: '#a8160f', pitch: 12, rad: 0.18, da: 0.35 }); }
function hkBlock(ctx, kind, cx, pop) {
  for (let r = 0; r < 10; r++) { const u = r / 9, sc = K.lerp(0.72, 1, u), y = K.lerp(HK_HI.yTop, HK_HI.yBot, u), pitch = HK_HI.w / 10 * sc;
    for (let i = 0; i < 10; i++) { const p = pop((9 - r) * 10 + i); if (p <= 0) continue; hkSprite(ctx, kind, cx + (i - 4.5) * pitch, y + 10, pitch / 82 * K.ease.back(K.clamp(p))); } }
}
function hkHigh(ctx, t, cam) {
  ctx.fillStyle = HK_LAWN; ctx.fillRect(-200, -200, 1400, 1630); ctx.fillStyle = dotPat(ctx, HK_LAWND, 12, 0.3); ctx.fillRect(-200, -200, 1400, 1630);
  const k = hkHighK(t); ctx.save(); ctx.translate(HK_HI.c[0], HK_HI.c[1]); ctx.scale(k, k); ctx.translate(-HK_HI.c[0], -HK_HI.c[1]);
  if (k < 1) { ctx.fillStyle = HK_LAWN; ctx.fillRect(-2500, -1500, 6000, 4500); ctx.fillStyle = dotPat(ctx, HK_LAWND, 12, 0.3); ctx.fillRect(-2500, -1500, 6000, 4500); }
  const B = hkHighBlocks(t);
  B.forEach(([kind, cx], j) => { if (j && t < 57.36) return; hkHiRug(ctx, cx); hkBlock(ctx, kind, cx, j ? () => 1 : (i) => (t - hkFeastT(i)) / 0.12); });
  // the three watchers, small on the lawn strip below, heads up, eyes on the row that is filling
  const row = 9 - Math.floor(Math.min(99, Math.max(0, hkFeastN(t) - 1)) / 10), fy = K.lerp(HK_HI.yTop, HK_HI.yBot, row / 9);
  const g = [hkP(HK_MER, 330, 1200, 0.45, 1, { mouth: 'smile', handL: [22, -105], handR: [-18, -112], seed: 71 }), hkP(HK_CAL, 500, 1205, 0.45, -1, { sit: 1, seat: 'floor', mouth: t > 56.3 ? 'o' : 'closed', seed: 81 }), hkP(HK_VIZ, 660, 1205, 0.45, -1, { sit: 1, seat: 'floor', seed: 61 })];
  g.forEach((P, i) => { P.gaze = hkG(P, t > 57.36 ? [[180, 500, 820][i] * 0 + (i - 1) * 900 + 500, 600] : [K.lerp(100, 900, ((t * 1.7 + i * 0.3) % 1)), fy]); P.tilt = -0.12; hkDraw(ctx, P); });
  ctx.restore();
  // the crane: leaves sweep across while the view changes
  if (t < 54.0) { const u = hkB(t, 53.5, 0.5); for (let i = 0; i < 9; i++) shape(ctx, ell(-100 + i * 140, -200 + 900 * u + (i % 2) * 120, 150, 120, 20), GREEN, { lw: 6, seed: 840 + i, dot: GREEND, pitch: 10, rad: 0.3, da: 0.5 }); }
}

// ---------- S9: the house diagram (v2, review note 6) ----------
// the diagram is drawn in its own units (house base y 900) and placed 15 % larger with the base at panel y 1100 (hkDG maps diagram -> world);
// the owner presents at the facade's left edge, 1.6x larger, his telescoping pointer touching what he names; three large busts wave on جارية;
// each wave sends 25 big icons that build a heap at the door (food, then drinks, then comforts) with its tag beside it
const HK_DGS = 1.15, hkDG = (x, y) => [500 + (x - 500) * HK_DGS, 1100 + (y - 900) * HK_DGS];
const HK_WAVES = [['dome', 94.72, 330, 'fruit'], ['jugs', 95.68, 500, 'jugs'], ['cushion', 96.76, 670, 'cushion']];
const HK_WR = (() => { const r = K.rng(21), a = []; for (let i = 0; i < 300; i++) a.push(r()); return a; })();
const HK_BUSTW = [23, 46, 77], HK_BUSTT = [89.92, 90.02, 90.12];
const hkWinOn = (i, t) => { const k = HK_BUSTW.indexOf(i); if (k >= 0) return t > HK_BUSTT[k]; const r = Math.floor(i / 10), c = i % 10; return t > 90.15 + 0.66 * ((r + c) / 18); };
const hkDiagN = (t) => (t < 89.92 ? 0 : t < 90.15 ? HK_BUSTT.filter((a) => t > a).length : Math.min(100, 3 + Math.round(97 * K.clamp((t - 90.15) / 0.69))));
// heap slot j (0..24) of a wave: a pyramid 7-6-5-4-3 on the lawn in front of the door
function hkHeapSlot(hx, j) { let row = 0, n = 7, k = j; while (k >= n) { k -= n; row++; n--; } return [hx + (k - (n - 1) / 2) * 27, 965 - row * 22]; }
const hkWaveT0 = (w, j) => HK_WAVES[w][1] + j * 0.034, HK_WTRAV = 0.5;
function hkDiagram(ctx, t, cam) {
  ctx.fillStyle = C.yellow; ctx.fillRect(-200, -200, 1400, 1630); ctx.fillStyle = dotPat(ctx, HK_ORANGE, 14, 0.25); ctx.fillRect(-200, -200, 1400, 1630);
  ctx.save(); ctx.translate(500, 1100); ctx.scale(HK_DGS, HK_DGS); ctx.translate(-500, -900);
  ctx.fillStyle = HK_LAWN; ctx.fillRect(-400, 900, 1800, 400); ink(ctx, [[-400, 902], [1400, 902]], 6, 850);
  const rise = settleTo(t, 87.22, 300, 0, 0.9, 0.06); ctx.save(); ctx.translate(0, rise); ctx.beginPath(); ctx.rect(-400, -600, 1800, 1502 - rise); ctx.clip();
  ctx.drawImage(hkFacade(), 0, 0, 1000, 1000);
  const bustK = (k) => hkB(t, HK_BUSTT[k], 0.25) * (1 - hkB(t, 91.55, 0.3));
  hkWindows(ctx, (i) => (hkWinOn(i, t) ? 1 : 0), t, { heads: t > 89.92, busts: HK_BUSTW.filter((i, k) => bustK(k) > 0.05) });
  // the highlighted window ring
  if (t > 91.72 && t < 93.0) { const [x, y] = hkWinXY(29); ctx.lineWidth = 6; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(x + 23, y + 19, 36 + 4 * Math.sin(t * 8), 0, 7); ctx.stroke(); }
  // the sun arc over the roof
  if (t > 93.78 && t < 94.7) { const u = hkB(t, 93.78, 0.7, 'lin'); ctx.save(); ctx.translate(K.lerp(220, 780, u), 120 - 80 * Math.sin(Math.PI * u)); ctx.scale(0.35, 0.35); sun(ctx, 0, 0, t); ctx.restore(); }
  ctx.restore();
  // three women lean out of their windows as large busts and wave (جارية 89.92), then settle back as the rest of the windows fill
  HK_BUSTW.forEach((i, k) => { const b = bustK(k); if (b <= 0.01) return; const [x, y] = hkWinXY(i), sill = y + HK_HW.wh; ctx.save(); ctx.beginPath(); ctx.rect(x - 90, y - 200, HK_HW.ww + 180, sill - (y - 200)); ctx.clip();
    const P = hkP(k === 1 ? { costume: 'lady' } : { costume: 'maiden', pal: k ? { robe: C.red } : undefined }, x + 23, sill + 132 * 0.95 + 8 + (1 - b) * 150, 0.95, k === 2 ? -1 : 1, { mouth: 'smile', seed: 90 + k });
    P.aR = [2.4 + 0.35 * Math.sin(t * 9 + k * 2), 2.6]; P.gaze = [0, 0.1]; hkDraw(ctx, P); ctx.restore();
    ink(ctx, [[x - 6, sill], [x + HK_HW.ww + 6, sill]], 5, 860 + k); });
  // the tray from window 29 to the door (93.0-93.75): the first item of the heap
  if (t > 93.0) { const u = hkB(t, 93.0, 0.7), [x, y] = hkWinXY(29), e = hkHeapSlot(HK_WAVES[0][2], 0); hkSprite(ctx, 'fruit', K.lerp(x + 23, e[0] - 30, u), K.lerp(y + 38, e[1], u) - 90 * Math.sin(Math.PI * u), 0.62); }
  // three waves: 25 windows each send a big icon that lands on its heap in front of the door; landed icons stay
  HK_WAVES.forEach(([kind, a, hx, k2], w) => { if (t < a) return; for (let j = 0; j < 25; j++) { const t0 = hkWaveT0(w, j), u = (t - t0) / HK_WTRAV; if (u < 0) continue;
    const wi = Math.floor(HK_WR[w * 100 + j] * 100), [x, y] = hkWinXY(wi), e = hkHeapSlot(hx, j), q = K.ease.inOut(K.clamp(u)), kind2 = j % 2 && w === 0 ? k2 : kind;
    hkSprite(ctx, kind2, K.lerp(x + 23, e[0], q), K.lerp(y + 36, e[1], q) - 70 * Math.sin(Math.PI * q) + (u >= 1 ? -2 * hkPulse(t, t0 + HK_WTRAV, 0.15) : 0), 0.6 * (u < 1 ? K.lerp(0.75, 1, q) : 1)); } });
  // the presenter with his telescoping pointer
  const P = hkP(HK_MER, 150, 900, 0.97, 1, { seed: 71, mouth: 'smile', lid: 0.2 });
  P.talk = hkIn(t, 85.94, 87.1) || hkIn(t, 89.0, 90.5) || hkIn(t, 94.6, 97.6) ? 0.4 + 0.5 * Math.abs(Math.sin(t * 10)) : 0;
  const wv = t < 95.68 ? 0 : t < 96.76 ? 1 : 2, heapTop = hkHeapSlot(HK_WAVES[wv][2], 20);
  const tgt = t < 89.3 ? [400, 330] : t < 91.6 ? [K.lerp(230, 760, hkB(t, 89.92, 1.5)), K.lerp(330, 260, hkB(t, 89.92, 1.5))] : t < 93.0 ? hkWinXY(29).map((v, i) => v + [23, 30][i]) : t < 94.6 ? [470, 830] : t < 97.7 ? [heapTop[0], heapTop[1] - 30] : [500, 930];
  P.gaze = hkG(P, tgt); const aim = [tgt[0] - 150, tgt[1] - 770], al = Math.hypot(aim[0], aim[1]);
  hkArms(t, P, [[0, { w: [150 + aim[0] / al * 120, 770 + aim[1] / al * 120] }], [97.9, [36, -62], 0.4]], [[0, [-36, -62]], [97.9, [-60, -100], 0.3]]);
  P.sq = t > 97.9 ? 1 + 0.02 * hkPulse(t, 98.1, 0.4) : breathe(t, 4);
  P.after = (c, Q) => { if (t > 97.9) return; const h = hkHandW(Q, 'R'), d = Math.hypot(tgt[0] - h[0], tgt[1] - h[1]), L = Math.max(60, d - 4), e = [h[0] + (tgt[0] - h[0]) / d * L, h[1] + (tgt[1] - h[1]) / d * L]; seg(c, h[0], h[1], e[0], e[1], 5, HK_WOODC, 2.5); shape(c, ell(e[0], e[1], 6, 6, 8), C.red, { lw: 2, seed: 851 }); };
  hkDraw(ctx, P);
  ctx.restore();
  // the inset: one woman sets a tray on her sill, pats it, smiles
  hkInset(ctx, 700, 380, 200, hkB(t, 91.72, 0.2, 'lin') * (1 - hkB(t, 92.75, 0.2, 'lin')), (c) => {
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
