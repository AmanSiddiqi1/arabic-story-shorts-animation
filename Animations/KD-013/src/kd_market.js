// ===== KD-013 market scenes: S1 (0-7) the fat goat, S2 (7-12) pay and tie, S19 (153.8-166) the empty stall + inset + THE END =====
// marketStreet (no palace) with one 'animal' stall (x 560..820, tether post x 590); the seller stands behind the counter.
const KD_STALL = { x: 690, w: 260, kind: 'animal', cols: [C.red, C.yellow] };
const KD_POST = [590, 768];
function kdMarketBack(ctx, t) { marketStreet(ctx, { palace: false, t, doors: [0.15, 0, 0.4] }); }
function kdStallDraw(ctx, t) {
  // awning flap: a slight skew of the stall awning edge (the stall itself is static)
  marketStall(ctx, KD_STALL);
  const fl = 3 * Math.sin(t * 3.1); ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.lineCap = 'round';
  for (let k = 0; k < 8; k++) { const x = 548 + k * 36; ctx.beginPath(); ctx.moveTo(x, 594); ctx.lineTo(x + 6, 604 + fl * (k % 2 ? 1 : -1)); ctx.stroke(); } ctx.restore();
}
function kdHay(ctx, x, y) { townProp(ctx, 'hay', x, { y }); }
// ---------------- S1 + S2 ----------------
const KD_AX1 = (t) => kfn(t, [[1.5, -80], [3.9, 430]], 'out');
const KD_FALLS1 = footfalls(KD_AX1, 1.5, 4.0, 26);
function kdAsc1(t) {
  const P = { costume: 'ascetic', s: 1, dir: 1, y: KD_GR, ...walk(KD_AX1, t), brow: -0.3, mouth: 'smile' };
  P.look = t < 3.6 ? 0.3 * Math.sin(t * 1.3) : 0.6;
  let tg = [900, 650];
  if (t >= 2.6 && t < 3.6) tg = [700, 740 + 30 * Math.sin(t * 2)];
  if (t >= 3.64) tg = [740, 705];
  if (t >= 4.26) { P.tip = settleTo(t, 4.26, 0, 0.06); P.handR = PERSON_HANDS.chin.R; P.handR = [16 + 3 * Math.sin(t * 9), -160]; tg = [kfn(t, [[4.3, 700], [5.1, 560]]), kfn(t, [[4.3, 720], [5.1, 820]])]; }
  if (t >= 6.06) { P.eyes = 'wide'; P.brow = -0.6; P.mouth = 'smile'; P.handR = null; P.handL = PERSON_HANDS.cheeks.L; P.sq = settleTo(t, 6.06, 1, 1.03); }
  if (t >= 7.0) { P.eyes = 'open'; P.handL = null; P.tip = 0; P.sq = 1; P.brow = -0.3; tg = t < 7.3 ? [470, 790] : [kfn(t, [[7.3, 520], [8.2, 690]]), 770]; P.lid = 0.3; }
  if (t >= 7.0 && t < 8.24) P.handR = t < 7.26 ? [10 + 40 * KB(t, 7.0, 0.26), -110] : [76 + 8 * Math.sin((t - 7.26) * Math.PI / 0.3), -122];
  if (t >= 8.24) { P.lid = 0; tg = [740, 705]; P.handR = null; }
  if (t >= 9.02 && t < 10.88) { P.tip = settleTo(t, 9.02, 0, 0.14); P.mouth = 'closed'; P.drop = 4; tg = [585, 806]; }
  if (t >= 10.88) { P.tip = settleTo(t, 10.88, 0.14, 0.04); P.brow = -0.3; P.mouth = 'smile'; tg = t < 11.64 ? [585, 806] : [740, 705]; }
  if (t >= 11.64) { P.tip = 0; tg = [1000, 680]; }
  return kdLife(P, t, 3, tg);
}
function kdSeller1(t, A) {
  const P = { costume: 'villager', pal: { apron: C.white, head: 'cap', hc: C.red }, s: 1, dir: -1, x: 705, y: KD_GR - 28, mouth: 'smile', brow: -0.2 };
  let tg = [A[0], A[1]];
  if (t >= 3.64 && t < 4.26) { P.handR = [64, -196 + 10 * Math.sin(t * 18)]; P.talk = talk(t, [[3.64, 4.2]]) * 0.6; P.brow = -0.4; }
  if (t >= 4.26 && t < 7.0) { P.handL = t < 4.6 ? [-50, -128 + 6 * Math.sin(t * 20)] : null; }
  if (t >= 7.0 && t < 8.24) { P.handR = [72, -124]; tg = [680, 770]; P.drop = 3 * Math.abs(Math.sin((t - 7.26) * Math.PI / 0.3)); }
  if (t >= 8.24 && t < 9.0) { P.tip = 0.08 * pulse(t, 8.24, 0.5); P.handR = [kfn(t, [[8.4, 60], [8.8, 120]]), -130]; }
  if (t >= 9.0 && t < 11.64) { P.handR = null; tg = [585, 806]; }
  if (t >= 11.64) { P.handR = [64, -196 + 12 * Math.sin(t * 16)]; P.talk = 0; tg = [A[0], A[1]]; }
  return kdLife(P, t, 8, tg);
}
function kdGoat1(t) {
  const P = { x: 645, y: KD_GR, s: 0.85, dir: -1, fat: 1, chew: t, t, headDown: t < 5.26 ? 1 : blend(t, 5.26, 5.7, 1, 0), gaze: [-1, 0.6], seed: 5 };
  if (t >= 5.26) P.gaze = [-0.9, -0.2];
  if (t >= 6.06 && t < 7.0) { P.sq = t < 6.25 ? 0.94 : settleTo(t, 6.25, 0.94, 1.0); P.tailUp = 0.5 + 0.5 * pulse(t, 6.1, 0.4); }
  if (t >= 7.0) { P.gaze = [0.2, -1]; P.headTilt = 0.05 * Math.sin(t); }
  if (t >= 9.9 && t < 10.8) { P.headDown = 0.12 * pulse(t, 9.9, 0.4); P.lid = pulse(t, 9.95, 0.25); P.earLift = 0.6 * pulse(t, 9.9, 0.4); }
  if (t >= 10.88 && t < 11.6) { P.tip = -0.04 * Math.abs(Math.sin((t - 10.88) * Math.PI / 0.36)); P.lid = 0.5; }
  if (t >= 11.6) P.gaze = [1, -0.4];
  return P;
}
const KS1 = {
  a: 0, ww: 1000,
  cam: [[0, { x: 500, y: 700, zoom: 1 }], [3.64, { x: 500, y: 700, zoom: 1 }], [5.3, { x: 590, y: 730, zoom: 1.75 }], [9.0, { x: 590, y: 730, zoom: 1.75 }], [10.0, { x: 570, y: 790, zoom: 2.3 }], [10.9, { x: 570, y: 790, zoom: 2.3 }], [11.6, { x: 590, y: 730, zoom: 1.75 }], [12.5, { x: 590, y: 730, zoom: 1.75 }]],
  draw(ctx, t) {
    kdMarketBack(ctx, t);
    if (t < 1.9) for (const [i, y0] of [[0, 230], [1, 290]]) songbird(ctx, { x: -60 + 640 * t + i * 90, y: y0 + 8 * Math.sin(t * 9 + i), s: 0.55, fly: true, flap: t * 22 + i, dir: 1, col: i ? C.yellow : C.red });
    const A = kdAsc1(t); const ah = kdHead(A);
    const Sp = kdSeller1(t, ah); person(ctx, Sp); kdStallDraw(ctx, t); kdHay(ctx, 490, KD_GR);
    const G = kdGoat1(t); kdGoatShadow(ctx, G); kdGoat(ctx, G); const nk = kdGoatNeck(G);
    halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A);
    for (const f of KD_FALLS1) dustBurst(ctx, f.x + (f.odd ? 14 : -14), KD_GR - 2, t - f.t, 3, 5, 10, 20, 0.45, Math.round(f.t * 10));
    // tether: post -> neck until 9.0; the seller hands the end over; the ascetic ties it (9.02-10.8) and holds it
    if (t < 9.0) { kdLoop(ctx, nk, 0.85); kdRope(ctx, nk, t < 8.4 ? KD_POST : kdHand(Sp, 1), t < 8.4 ? 80 : 120); }
    else if (t < 9.9) { const h = kdHand(A, 1), k = KB(t, 9.02, 0.88); kdLoop(ctx, nk, 0.85, 1.6 - 0.6 * k); kdRope(ctx, nk, h, 60); }
    else { kdLoop(ctx, nk, 0.85, t < 10.3 ? 1 - 0.1 * pulse(t, 9.9, 0.4) : 1); if (t < 10.8) { ctx.save(); ctx.globalAlpha = pulse(t, 9.9, 0.9); sfx(ctx, 'TUG', nk[0] - 40, nk[1] - 40, 26, 1, { fill: C.white, rot: -0.2 }); ctx.restore(); } kdRope(ctx, nk, kdHand(A, 1), 90); }
    // coins: three, one per beat, hand to palm
    if (t >= 7.26 && t < 8.6) { const to = kdHand(Sp, 1), fr = [515, 770];
      [7.3, 7.6, 7.9].forEach((c, i) => { if (t < c) return; const u = K.clamp((t - c) / 0.25); kdCoin(ctx, K.lerp(fr[0], to[0], u) + 4 * i, K.lerp(fr[1], to[1] - 4 * i, u) - 40 * Math.sin(Math.PI * u), 9); }); }
  },
  over(ctx, t, cam, S) {
    if (t < 2.1) { ctx.save(); ctx.globalAlpha = K.clamp((2.1 - t) / 0.3); S.title(ctx, 'THE ASCETIC AND THE THIEVES', 500, 190, KB(t, 0.05, 0.7), { size: 56, align: 'center' }); ctx.restore(); }
    if (t >= 5.26 && t < 7.0) { const G = kdGoat1(t), [gx, gy] = kdP(G.x, G.y - 150, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 5.26, 7.0, 0.2);
      S.label(ctx, t < 6.06 ? 'GOAT' : 'FAT GOAT', gx + 40, gy - 150, t < 6.06 ? KB(t, 5.3, 0.3) : 0.6 + 0.4 * KB(t, 6.06, 0.25), { align: 'center', size: t < 6.06 ? 46 : 56, fill: C.yellow });
      S.arrow(ctx, [gx + 30, gy - 110], [gx, gy + 10], KB(t, 5.4, 0.3, 'out'), { width: 18 }); ctx.restore(); }
    if (t >= 7.3 && t < 8.5) { const [cx, cy] = kdP(640, 700, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 7.3, 8.5, 0.2); sfx(ctx, 'CLINK!', cx, cy, 52, KB(t, 7.3, 0.25), { rot: -0.1 }); ctx.restore(); }
  },
};
// ---------------- S19: back at the market (v2: the search is acted on the words; inset top-right, clear of him) ----------------
// 154.5 strides in (brows up, flush); 155.94 leans over the counter and looks behind it; 156.3 bends and looks under;
// 156.8 turns to the basket, lifts its lid and looks inside; 157.3 straightens, looks left and right (?); 157.58 hands on hips, foot tapping;
// 158.1 looks LEFT, away from the inset; 161.02 scratches his head.
const KD_AX19 = (t) => kfn(t, [[154.5, 1080], [155.4, 800]], 'out');
const KD_FALLS19 = footfalls(KD_AX19, 154.5, 155.5, 26);
const KD_LID19 = [870, 848];
function kdLid19(t) { if (t < 156.95) return KD_LID19; const u = KB(t, 156.95, 0.2), d = t < 157.4 ? 0 : KB(t, 157.4, 0.2); return [KD_LID19[0] - 6 * (u - d), KD_LID19[1] - 46 * (u - d)]; }
function kdAsc19(t) {
  const P = { costume: 'ascetic', s: 1, dir: -1, y: KD_GR, ...walk(KD_AX19, t), brow: 1, mouth: 'frown', aL: [0.25, -0.5], aR: [0.25, -0.5] };
  let tg = [600, 760];
  if (t < 155.4) { P.tip = 0.12; const sw = Math.sin(P.ph); P.aL = [0.6 * sw, 0.9 * sw + 0.3]; P.aR = [-0.6 * sw, -0.9 * sw + 0.3]; }
  if (t >= 155.4) { P.aL = P.aR = null; P.tip = settleTo(t, 155.4, 0.12, 0, 0.3); tg = [650, 760]; P.handL = [-40, -112]; P.handR = [36, -110]; }
  if (t >= 155.94 && t < 156.3) { P.tip = 0.38 * KB(t, 155.94, 0.2); P.drop = 10; tg = [640, 830]; P.handL = [-70, -150]; P.handR = [-20, -150]; P.look = -0.6; }
  if (t >= 156.3 && t < 156.8) { P.kneel = KB(t, 156.3, 0.2); P.tip = 0.3; P.drop = 8; tg = [700, 900]; P.handL = [-50, -60]; P.handR = [10, -70]; P.look = -0.4; }
  if (t >= 156.8 && t < 157.3) { P.dir = 1; P.kneel = 1 - KB(t, 156.8, 0.2); P.tip = 0.22; P.handRW = kdLid19(t); P.handL = [-30, -110]; tg = [880, 880]; P.eyes = 'wide'; }
  if (t >= 157.3 && t < 157.58) { P.dir = 1; P.tip = 0.1; P.handRW = kdLid19(t); tg = [880, 880]; }
  if (t >= 157.3 && t < 158.1) { const k = Math.floor((t - 157.3) / 0.27); P.look = [-1, 1, -1][Math.min(2, k)]; P.tilt = -0.06 * P.look; P.mouth = 'o'; P.brow = 0.6; if (t >= 157.58) { P.dir = -1; P.tip = 0; P.handRW = null; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; } tg = [P.x + P.look * 400 * (P.dir || 1), 700]; }
  if (t >= 158.1) { P.dir = -1; P.look = -0.6; P.tilt = 0.04; P.brow = 0.8; P.mouth = 'frown'; tg = [300, 720]; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.y = KD_GR - 3 * Math.abs(Math.sin(t * 9)); }
  if (t >= 161.02) { P.handR = [26 + 4 * Math.sin(t * 20), -228]; P.tilt = 0.08; tg = [400, 820]; P.brow = -0.6; P.mouth = 'closed'; P.look = -0.3; }
  if (t >= 163.4) P.handR = PERSON_HANDS.hipsHands.R;
  kdLife(P, t, 3, tg); P.sq = breathe(t, 3, 0.012);
  return P;
}
function kdBasketLid(ctx, t) { const [x, y] = kdLid19(t); shape(ctx, ell(x, y, 44, 9, 16), '#d9a441', { lw: 4, seed: 171 }); shape(ctx, ell(x, y - 9, 8, 6, 10), '#b07a3a', { lw: 3, seed: 172 }); }
const KS19 = {
  a: 153.8, ww: 1000,
  cam: [[153.8, { x: 760, y: 730, zoom: 1.4 }], [162.5, { x: 760, y: 730, zoom: 1.4 }], [163.6, { x: 600, y: 720, zoom: 1.1 }], [170, { x: 600, y: 720, zoom: 1.1 }]],
  draw(ctx, t) {
    kdMarketBack(ctx, t); kdStallDraw(ctx, t); kdHay(ctx, 490, KD_GR);
    const A = kdAsc19(t); halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A); kdBasketLid(ctx, t); if (A.handRW) kdHandsOver(ctx, A, [1]);
    kdFlush(ctx, A, t < 157 ? 0.6 : blend(t, 157, 158, 0.6, 0.3));
    for (const f of KD_FALLS19) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 3, 5, 11, 22, 0.45, Math.round(f.t * 10));
    if (t >= 157.6 && t < 161.0) { const ft = Math.abs(Math.sin(t * 9)); if (ft > 0.9) dustBurst(ctx, A.x - 20, KD_GR - 2, 0.1, 2, 3, 6, 10, 0.3, 3); }
  },
  over(ctx, t, cam, S) {
    if (t >= 157.3 && t < 158.3) { const [qx, qy] = kdP(...kdHead(kdAsc19(t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 157.3, 158.3, 0.2); kdQ(ctx, qx - 20, qy - 130, KB(t, 157.3, 0.3), 80); ctx.restore(); }
    if (t >= 157.58) kdInset(ctx, t, S);
    if (t >= 162.6) { S.title(ctx, 'THE END', 300, 300, KB(t, 162.6, 0.8), { size: 84, align: 'center' }); }
  },
};
// ---------- the round inset (top-right, in clear sky): the goat being led away, large; only the thief's rope hand at the rim ----------
const KD_IN = { cx: 745, cy: 240, r: 195 };
function kdInsetGoat(t) {
  const plant = 159.06, xw = (u) => kfn(u, [[155, 2600], [plant, 2740]], 'lin'), G = { s: 0.85, dir: 1, y: KD_GR, ...walk(xw, t, { stride: 20 }), chew: t, t, fat: 1, gaze: [1, -0.1] };
  if (t >= plant) { G.amp = 0; G.x = 2740; G.tip = -0.1 * K.clamp((t - plant) / 0.2); G.earLift = 0.6; G.gaze = [1, -0.2]; G.sq = settleTo(t, plant, 0.94, 1, 0.3); }
  if (t >= 160.22 && t < 161.0) { G.talk = 1; G.chew = null; G.sq = 1.05; G.tailUp = 1; G.headTilt = -0.25; G.lid = 0.6; }
  if (t >= 161.02) { G.gaze = [-0.2, 0.15]; G.tip = -0.05; G.headTilt = 0; G.lid = Math.max(kdSlowBlink(t, [161.5, 163.2]), 0.15); }
  return G;
}
function kdInset(ctx, t, S) {
  const { cx, cy, r: r0 } = KD_IN, r = r0 * K.ease.back(K.clamp((t - 157.58) / 0.45)); if (r <= 1) return;
  const G = kdInsetGoat(t), cam = { x: G.x + 22, y: 812, zoom: 1.3 }, k = cam.zoom * r / r0, toP = (w) => [cx + (w[0] - cam.x) * k, cy + (w[1] - cam.y) * k];
  const hand = [cam.x + (r0 * 0.9 * Math.cos(-0.75)) / cam.zoom, cam.y + (r0 * 0.9 * Math.sin(-0.75)) / cam.zoom + 6 * Math.sin(t * 6) * (t < 159.06 ? 1 : 0)];
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cam.x, -cam.y);
  countryRoad(ctx, { w: KD_RW, places: KD_PLACES, camX: cam.x - 300, house: { x: 2950 } });
  kdGoatShadow(ctx, G); kdGoat(ctx, G); const nk = kdGoatNeck(G); kdLoop(ctx, nk, 0.85); kdRope(ctx, nk, hand, t < 159.06 ? 90 : 60);
  // the thief's arm reaching in from the right rim
  seg(ctx, hand[0] + 80, hand[1] - 70, hand[0] + 6, hand[1] - 4, 20, C.white, 4.5); shape(ctx, ell(hand[0], hand[1], 13, 13, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 });
  if (t >= 160.22 && t < 161.0) soundArcs(ctx, nk[0] + 70, nk[1] - 40, 1, t, C.black);
  ctx.restore();
  ctx.save(); ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore();
  const hz = kdGoatHead(G), [mx, my] = toP([hz[0] + 22, hz[1]]);
  if (t >= 160.22 && t < 162.4) { ctx.save(); ctx.globalAlpha = kdFade(t, 160.22, 162.4, 0.2); sfx(ctx, 'MAAA!', mx - 10, my - 95, 54, KB(t, 160.22, 0.3), { rot: -0.08 }); ctx.restore(); }
  if (t >= 160.22 && t < 162.6) { ctx.save(); ctx.globalAlpha = kdFade(t, 160.22, 162.6, 0.2); S.label(ctx, 'STILL A GOAT', 300, cy - 40, KB(t, 160.3, 0.3), { align: 'center', size: 46, fill: C.yellow }); S.arrow(ctx, [330, cy + 10], [cx - r0 - 8, cy + 30], KB(t, 160.4, 0.3, 'out'), { width: 16 }); ctx.restore(); }
}
