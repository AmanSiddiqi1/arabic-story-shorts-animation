// ===== spread 6: the road at dawn, turquoise (131.8-143.44). Scene S10 and the ending: every card folds but the rock. =====
const AB_RD = { t0: 131.8, fold: 139.8, rock: { x: 150, base: 890, s: 0.38 } };
function abRoadPrint() {
  const P = AB_PAL.road;
  return abBake('road', (c) => {
    abSkyBand(c, 0, AB_GR, P.sky, P.sky2); abHillPrint(c, 800, 80, P.hill, 401); abHillPrint(c, 850, 50, AB_MX(P.hill, GREEND, 0.3), 402);
    abSlot(c, 700, 560, 700, 892, 10);
    abPage(c, P.page); const road = []; for (let i = 0; i <= 20; i++) { const u = i / 20; road.push([K.lerp(1000, 120, u), K.lerp(968, 900, u * u)]); }
    shape(c, [...road.map(([x, y], i) => [x, y - 20 * (1 - i / 26)]), ...road.slice().reverse().map(([x, y], i) => [x, y + 24 * (0.3 + i / 26)])], P.path, { lw: 0, dot: AB_MX(P.path, EARTH, 0.4), pitch: 8, rad: 0.22, da: 0.45 });
    bookFold(c, 0, AB_WW, AB_GR);
  });
}
const abRS = () => abMem(AB_G, 'set', () => {
  const P = AB_PAL.road, R = AB_RD.rock, RP = { ...AB_PAL.day, moss: GREEN }, rk = { x: 0, base: 0, w: 520, h: 560, ax: 10, aw: 150, ah: 250 };
  return {
    forest: abSprite('rforest', 200, 885, 420, 180, (c) => { for (let i = 0; i < 7; i++) { const x = 20 + i * 62; abCrowns(c, [[x, 800 - (i % 2) * 20, 48], [x + 26, 830, 36]], { leaf: AB_MX(P.leaf, NAVY2, 0.2), leafD: P.leafD }, 410 + i); seg(c, x, 830, x, 885, 12, WOOD, 3); } }, { sx: 4, sy: 5 }),
    rock: abSprite('rrock', R.x, R.base, 220, 230, (c) => { c.save(); c.translate(R.x, R.base); c.scale(R.s, R.s); abRockHalfArt(c, -1, RP, rk); abRockHalfArt(c, 1, RP, rk); c.restore(); }),
    mile: abSprite('mile', 560, 905, 70, 90, (c) => { shape(c, [[535, 905], [537, 840], [560, 822], [583, 840], [585, 905]], STONE2, { lw: 4, seed: 420, dot: STONED, pitch: 7, rad: 0.2, da: 0.4 }); seg(c, 548, 860, 572, 860, 4, STONED, 1); }),
    trees: [[450, 640, 0], [640, 660, 1]].map(([x, top, i]) => abSprite('rtree' + i, x, 900, 200, 900 - top + 100, (c) => abTreeArt(c, { x, base: 900, top, w: 34, pal: P, seed: 430 + i, crowns: [[x, top, 64], [x - 44, top + 34, 44], [x + 44, top + 30, 46]] }))),
    house: abSprite('house', 940, 905, 140, 330, (c) => { shape(c, K.rectPts(880, 600, 125, 305), AB_MX(C.white, SAND, 0.35), { lw: 5, seed: 440, dot: SAND, pitch: 10, rad: 0.2, da: 0.4 }); shape(c, K.rectPts(870, 588, 140, 22), C.yellow, { lw: 4, seed: 441 });
      townWindow(c, 925, 660, 50, 60, { arch: 'pointed', shutters: true }); shape(c, townArchPts(900, 960, 790, 905, 'pointed'), GREEND, { lw: 4, seed: 442 }); }),
    q: abSprite('qcard', 150, 650, 120, 130, (c) => { shape(c, ell(150, 590, 50, 56, 24), C.yellow, { lw: 5, seed: 108 }); c.font = `400 84px "${BF}"`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 12; c.strokeStyle = C.black; c.strokeText('?', 150, 594); c.fillStyle = C.white; c.fillText('?', 150, 594); }, { border: 5 }),
  };
});
const AB_RCASX = [[132.3, 1080], [134.4, 560], [135.0, 540], [135.2, 620], [135.6, 620], [136.6, 420], [138.8, 420], [140.6, 230]];
const AB_RCASXF = (t) => kfn(t, AB_RCASX, 'inOut');
const AB_RMULX = [[132.6, 1250], [134.4, 760], [135.6, 740], [136.6, 700], [138.8, 700], [140.6, 520]];
const AB_RMULXF = (t) => kfn(t, AB_RMULX, 'inOut');
const AB_RMUL_FALLS = footfalls(AB_RMULXF, 132.6, 140.6, GAIT.donkey * 0.68);
function abRoadCas(t) {
  const x = AB_RCASXF(t), far = K.clamp((480 - x) / 250), s = AB_CAS.s * (1 - 0.55 * far);
  const P = { ...AB_CAS, s, x, y: K.lerp(962, 905, far), ...walk(AB_RCASXF, t, { stride: 24 * s / AB_CAS.s }), dir: speed(AB_RCASXF, t) > 1 ? 1 : -1, sq: breathe(t, 13, 0.014), tip: 0.1 + idleSway(t, 181, 0.02, 2.5), gaze: [0, -0.9], mouth: 'smile', brow: 0.3 };
  let map = { up: true, flip: 0 };
  P.handLW = [x - 52 * s / 0.86, P.y - 205 * s / 0.86]; P.handRW = [x - 20 * s / 0.86, P.y - 210 * s / 0.86];
  if (t > 134.95 && t < 135.9) { P.dir = 1; P.tip = 0; P.handLW = undefined; P.handRW = [x + 40, P.y - (t < 135.2 ? 120 : 190)]; P.eyes = 'wide'; P.gaze = [1, -0.2]; map = { up: false }; if (t > 135.6) { P.handRW = [x + 70, P.y - 170 - 30 * K.clamp((t - 135.6) / 0.2)]; } }
  if (t >= 135.9 && t < 136.63) { P.dir = -1; P.tip = 0.1 * (1 - K.clamp((t - 136.4) / 0.25)) + 0.04 * Math.exp(-(t - 136.6) * 8) * (t > 136.6 ? 1 : 0); }
  if (t >= 136.63 && t < 138.8) { P.dir = -1; P.tip = 0; map.flip = flow(t, [[136.63, 0], [136.85, 1], [137.15, 1], [137.35, 0]]); P.brow = -0.6; P.mouth = 'frown'; P.talk = 0.2 * Math.abs(Math.sin(t * 12));
    if (t > 137.0) { P.handLW = undefined; P.handL = PERSON_HANDS.headHold.L; P.drop = 3 * Math.sin(t * 18); } P.gaze = [-0.2, -0.7]; }
  return { P, map };
}
function abRoad(ctx, t) {
  AB_G = 'road';
  const SP = abRS(), t0 = AB_RD.t0 + 0.1, F = AB_RD.fold, pop = (d) => abK(t, t0, { delay: d, out: F + d * 0.25 }), kA = abK(t, t0, { delay: 0.3, out: F + 0.3 });
  ctx.drawImage(abRoadPrint(), 0, 0, AB_WW, AB_WH);
  const sy = flow(t, [[131.8, 820], [133, 700], [140, 640]]); abSunStick(ctx, 700, sy, null, { col: AB_MX(C.yellow, C.white, 0.5), ray: AB_MX(C.yellow, C.white, 0.3), r: 46, key: 'pale' });
  abPut(ctx, SP.forest, pop(0)); abPut(ctx, SP.trees[0], pop(0.3), { rot: idleSway(t, 450, 0.015, 2.8) }); abPut(ctx, SP.trees[1], pop(0.35), { rot: idleSway(t, 451, 0.015, 3.3) });
  // Cassim passes behind the far rock at the very end (drawn before it once he is that far)
  const Cs = abRoadCas(t), behind = Cs.P.x < 300;
  const casDraw = () => { if (t < 132.3) return; abLive(ctx, Cs.P.x, Cs.P.y, 260 * Cs.P.s / 0.86, 330 * Cs.P.s / 0.86, (c) => { abPerson(c, Cs.P); if (Cs.map.up !== false) { const h = Cs.P.handRW || [Cs.P.x, Cs.P.y - 180]; c.save(); c.translate(h[0] - 20, h[1] - 10); c.scale(0.45 * Cs.P.s / 0.86, 0.45 * Cs.P.s / 0.86 * (1 - 2 * Cs.map.flip)); abMapCard(c, 0, 0, 1, 0); c.restore(); } }, kA); };
  if (behind) casDraw();
  // the far rock, the sparrow, the ? on a string: these stay up at the end
  abPut(ctx, SP.rock, abK(t, t0, { delay: 0.1 }));
  if (t > 137.51) { const k = K.ease.back(K.clamp((t - 137.93) / 0.5)), sw = swing(t, 137.93, 0.25, 0.8, 0.7) + idleSway(t, 460, 0.04, 2.6); ctx.save(); ctx.translate(150, 400 - (1 - k) * 420); ctx.rotate(sw); ctx.strokeStyle = '#6b5a48'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -500); ctx.lineTo(0, 106); ctx.stroke(); ctx.translate(-150, -430); abPut(ctx, SP.q, 1, { rot: 0.15 * Math.sin(t * 1.3) }); ctx.restore(); }
  abLive(ctx, 150, 680 + idleSway(t, 72, 1.5, 1.1), 60, 60, (c) => bird(c, { kind: 'sparrow', x: 150, y: 680 + idleSway(t, 72, 1.5, 1.1), s: 0.3, dir: 1, seed: 71, gaze: [1, 0.3], lid: t > 140.5 && t < 140.65 ? 1 : 0 }), abK(t, t0, { delay: 0.3 }), { border: 4 });
  abPut(ctx, SP.mile, pop(0.4)); abPut(ctx, SP.house, pop(0.2));
  // mule and cart (one card), the slipping sack, the moth
  const mx = AB_RMULXF(t), M = { x: mx, y: 968, s: 0.68, pal: 1, dir: -1, seed: 55, ...walk(AB_RMULXF, t, { stride: GAIT.donkey * 0.68 }), earL: -0.4 + idleSway(t, 56, 0.1, 2), earR: -0.4 + idleSway(t, 57, 0.1, 2.4), lid: 0.45, tailSwish: osc(t, 2) * 0.4 };
  if (t > 135.0 && t < 135.8) M.earR = 0.8; if (t > 136.63 && t < 138.8) { M.headTurn = 0.7; M.lid = flow(t, [[137.2, 0.45], [137.45, 1], [137.75, 0.45]]); }
  const cartX = mx + 150, bump = Math.abs(kick(t, AB_RMUL_FALLS, 3, 7, 8)), wheel = -(cartX) / 42;
  if (t > 132.9) abLive(ctx, mx + 90, 968, 520, 280, (c) => { abCart(c, cartX, 968, 0.9, wheel, t > 134.3 && t < 135.75 ? 9 : 10, bump, t, -1); seg(c, mx + 60, 968 - 150, cartX - 80, 968 - 90 - bump, 3, EARTHD, 1); donkey(c, M); }, kA);
  if (t > 134.3 && t < 135.2) { const u = K.clamp((t - 134.3) / 0.85), sx = K.lerp(cartX - 60, 640, u) + 20 * Math.sin(u * 9), sy2 = K.lerp(880, 905, u) - 20 * Math.sin(Math.PI * u); abLive(ctx, sx, sy2 + 20, 60, 50, (c) => { c.save(); c.translate(sx, sy2); c.rotate(0.6 * Math.sin(u * 8)); shape(c, [[-22, 16], [-18, -10], [22, -12], [24, 14]], CREAM, { lw: 3, seed: 470, dot: SAND, pitch: 6, rad: 0.2, da: 0.4 }); c.restore(); }, kA, { border: 4 }); }
  if (t > 135.2 && t < 135.8) { const h = Cs.P.handRW; abLive(ctx, h[0], h[1] + 50, 60, 70, (c) => { c.save(); c.translate(h[0], h[1] + 10); c.rotate(Math.PI + 0.3 * Math.sin(t * 30)); shape(c, [[-20, 0], [-18, 40], [20, 42], [22, 0]], CREAM, { lw: 3, seed: 471, dot: SAND, pitch: 6, rad: 0.2, da: 0.4 }); c.restore(); }, kA, { border: 4 }); }
  if (t > 135.4 && t < 137.4) { const u = K.clamp((t - 135.4) / 2), x = K.lerp(640, 800, u) + 30 * Math.sin(u * 10), y = K.lerp(790, 420, u); abLive(ctx, x, y + 14, 60, 40, (c) => abMoth(c, x, y, t, 1), 1, { border: 4 }); }
  if (!behind) casDraw();
  for (const f of AB_RMUL_FALLS) abDust(ctx, f.x + 30, 962, t, f.t, Math.round(f.t * 10), 0.6);
  return { Cs };
}
function abRoadOver(ctx, t, cam, S) {
  if (t > 134.0 && t < 135.2) { const cx = AB_RMULXF(t) + 150, [x, y] = abToPanel(cx + 20, 690, cam), to = abToPanel(cx, 850, cam); ctx.save(); abFade(ctx, t, 134.0, 135.2); S.arrow(ctx, [x - 20, y - 60], to, abB(t, 134.05, 0.4), { bend: 0.15, width: 16 }); ctx.restore(); }
  if (t > 139.2) S.title(ctx, 'THE END', 500, 1130, K.clamp((t - 139.2) / 1.2), { size: 80, align: 'center' });
}
