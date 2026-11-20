// ===== spread 4: the treasure cave, indigo and gold (88.9-105.0). Scene S7. v2 restaging (Fable review 1, note 3). =====
// The cave is an arch that fills the board: two layered indigo arch cards popping back to front, stalactites hinged on the front arch's
// underside unfolding one after another. The way out is one arch-shaped doorway card on the back wall (x 730..870) with dusk inside it,
// where the donkey's head and ears peek in; a slab slides across it from a pull-tab. Heaps at twice v1 size: the gold heap is 1.7x
// Ali Baba's height and pops on ذهبًا, silver on وفضة, cloth bolts unroll toward the reader on وأقمشة, stars drop on strings on ثمينة.
const AB_CV = { t0: 88.9, out: 104.25, door: { x: 800, w: 140, h: 250, base: 905 } };
const AB_CARCH = [{ rx: 478, ry: 650, col: 0.0 }, { rx: 432, ry: 592, col: 0.14 }];   // back and front arch cards (inner ellipse about (500, 905))
const abArchY = (x, A = AB_CARCH[1]) => 905 - A.ry * Math.sqrt(Math.max(0, 1 - ((x - 500) / A.rx) ** 2));
const AB_STALS = [[190, 70], [262, 110], [340, 62], [420, 96], [500, 120], [585, 80], [660, 104], [735, 66], [812, 90]];
const AB_CSTARS = [[230, 150], [330, 110], [470, 180], [610, 120], [720, 160]];
const abCDoorPts = (o = 0) => { const D = AB_CV.door; return townArchPts(D.x - D.w / 2 - o, D.x + D.w / 2 + o, D.base - D.h - o, D.base, 'pointed'); };
function abCavePrint() {
  const P = AB_PAL.cave;
  return abBake('cave', (c) => {
    c.fillStyle = P.rockD; c.fillRect(0, 0, AB_WW, AB_WH); c.save(); c.globalAlpha = 0.5; c.fillStyle = dotPat(c, AB_MX(P.rockD, C.black, 0.4), 10, 0.3); c.fillRect(0, 0, AB_WW, AB_GR); c.restore();
    // the back wall inside the arch: a little lighter, with printed strata
    c.save(); c.beginPath(); c.ellipse(500, 905, 478, 650, 0, Math.PI, 0); c.closePath(); c.clip(); c.fillStyle = AB_MX(P.hole, NAVY2, 0.3); c.fillRect(0, 0, AB_WW, AB_GR);
    c.globalAlpha = 0.5; c.fillStyle = dotPat(c, AB_MX(P.hole, C.black, 0.4), 11, 0.26); c.fillRect(0, 0, AB_WW, AB_GR); c.globalAlpha = 1;
    c.strokeStyle = AB_MX(P.hole, C.black, 0.35); c.lineWidth = 4; c.lineCap = 'round'; for (const [y, a] of [[520, 0.03], [640, -0.02], [770, 0.025]]) { c.beginPath(); c.moveTo(60, y); c.quadraticCurveTo(500, y + 600 * a, 940, y - 10); c.stroke(); }
    c.restore();
    // the floor (page): cave floor stipple, a few printed pebbles, the door tab's slot and groove
    c.fillStyle = P.floor; c.fillRect(0, AB_GR, AB_WW, AB_WH - AB_GR); c.save(); c.globalAlpha = 0.45; c.fillStyle = dotPat(c, AB_MX(P.floor, C.black, 0.4), 9, 0.24); c.fillRect(0, AB_GR, AB_WW, AB_WH - AB_GR); c.restore();
    const g = K.rng(64); for (let i = 0; i < 14; i++) shape(c, ell(40 + g() * 920, 1110 + g() * 100, 10 + g() * 10, 6 + g() * 4, 12), AB_MX(P.floor, C.white, 0.15), { lw: 2.5, seed: 640 + i });
    c.save(); c.setLineDash([10, 9]); c.strokeStyle = 'rgba(255,240,210,0.35)'; c.lineWidth = 6; c.beginPath(); c.moveTo(AB_CV.door.x, 925); c.lineTo(AB_CV.door.x, 1174); c.lineTo(AB_CV.door.x + 40, 1174); c.stroke(); c.restore();
    c.save(); c.globalAlpha = 0.6; c.fillStyle = paperGrain(c); c.fillRect(0, 0, AB_WW, AB_WH); c.restore();
    abFold(c);
  });
}
const abCS = () => abMem(AB_G, 'set', () => {
  const P = AB_PAL.cave, D = AB_PAL.dusk;
  const archArt = (A, seed) => (c) => { const g = nz(seed), pts = [[0, 905], [0, 0], [1000, 0], [1000, 905]];
    for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI, w = 1 + 0.035 * g.n2(i * 0.6, 2); pts.push([500 + Math.cos(a) * A.rx * w, 905 - Math.sin(a) * A.ry * w]); }
    const col = AB_MX(P.rock, C.white, A.col); shape(c, pts, col, { lw: 6, seed, dot: AB_MX(col, C.black, 0.35), pitch: 10, rad: 0.28, da: 0.55 });
    c.save(); c.strokeStyle = AB_MX(col, C.black, 0.3); c.lineWidth = 4; c.lineCap = 'round'; const r = K.rng(seed); for (let k = 0; k < 9; k++) { const x = r() < 0.5 ? 20 + r() * 90 : 890 + r() * 90, y = 100 + r() * 760; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 20 - r() * 40, y + 30 + r() * 30); c.stroke(); } c.restore(); };
  return {
    archB: abSprite('carchB', 500, 905, 1000, 905, archArt(AB_CARCH[0], 66), { sx: 6, sy: 8 }),
    archF: abSprite('carchF', 500, 905, 1000, 905, archArt(AB_CARCH[1], 67), { sx: 8, sy: 10 }),
    stal: AB_STALS.map(([x, L], i) => { const y0 = abArchY(x) - 6; return abSprite('stal' + i, x, y0 + L, 60, L + 12, (c) => shape(c, [[x - 24, y0], [x + 24, y0], [x + 4, y0 + L], [x - 4, y0 + L]], AB_MX(P.rock, C.white, 0.22), { lw: 4, seed: 180 + i, dot: P.rockD, pitch: 8, rad: 0.25, da: 0.5 }), { border: 5, shadow: 0.5 }); }),
    door: abSprite('cdoor', AB_CV.door.x, 905, AB_CV.door.w + 40, AB_CV.door.h + 24, (c) => {
      shape(c, abCDoorPts(16), AB_MX(P.rock, C.white, 0.3), { lw: 5, seed: 231, dot: P.rockD, pitch: 8, rad: 0.25, da: 0.5 });
      const a = abCDoorPts(); c.save(); K.poly(c, a, true); c.clip(); abSkyBand(c, 640, 905, AB_MX(D.sky, FIGC, 0.25), D.sky); c.fillStyle = D.page; c.fillRect(0, 880, AB_WW, 40);
      shape(c, ell(AB_CV.door.x + 30, 720, 18, 18, 18), AB_MX(C.yellow, C.white, 0.4), { lw: 3, seed: 232 }); c.restore();
      c.save(); c.strokeStyle = C.black; c.lineWidth = 5; K.poly(c, a, true); c.stroke(); c.restore(); }, { border: 5 }),
    slab: abSprite('slab', AB_CV.door.x, 905, AB_CV.door.w + 10, AB_CV.door.h + 10, (c) => shape(c, K.rectPts(AB_CV.door.x - AB_CV.door.w / 2 - 4, 905 - AB_CV.door.h - 4, AB_CV.door.w + 8, AB_CV.door.h + 4), AB_MX(P.rock, C.white, 0.18), { lw: 5, seed: 230, dot: P.rockD, pitch: 9, rad: 0.25, da: 0.5 }), { border: 5 }),
    sacks: [[620, 925, 0], [690, 925, 1], [655, 925, 2], [600, 860, 3], [670, 858, 4]].map(([x, b, i]) => abSprite('csack' + i, x, b, 100, 130, (c) => abSack(c, x, b, 84, 116, 1, { seed: 190 + i, coin: true }), { border: 5 })),
    gold: abSprite('gold', 430, 940, 500, 350, (c) => { abCoinPile(c, 430, 940, 480, 330, 1, 7);
      for (const [x, y, s] of [[340, 790, 1], [520, 760, 0.85]]) { c.save(); c.translate(x, y); c.scale(s, s); shape(c, [[-20, 0], [-26, -42], [26, -42], [20, 0]], C.yellow, { lw: 3.5, seed: 233, dot: AB_MX(C.yellow, C.red, 0.4), pitch: 6, rad: 0.2, da: 0.4 }); shape(c, ell(0, -42, 26, 8, 16), AB_MX(C.yellow, C.white, 0.3), { lw: 3, seed: 234 }); c.restore(); }
      shape(c, ell(430, 610, 30, 30, 20), C.red, { lw: 3.5, seed: 235 }); }, {}),
    silver: abSprite('silver', 150, 930, 320, 260, (c) => { abCoinPile(c, 150, 930, 300, 220, 1, 9, { col: AB_MX(STONE2, C.white, 0.3), dk: STONED, coin: C.white });
      for (const [ex, sc] of [[90, 1.3], [215, 1.05]]) { c.save(); c.translate(ex, 820); c.scale(sc, sc); shape(c, [[-18, 0], [-24, -40], [-12, -62], [-6, -84], [6, -84], [12, -62], [24, -40], [18, 0]], AB_MX(STONE2, C.white, 0.2), { lw: 3.5, seed: 200 }); c.restore(); }
      shape(c, ell(150, 840, 60, 18, 20), AB_MX(STONE2, C.white, 0.4), { lw: 3, seed: 201 }); }, {}),
    bolts: abSprite('bolts', 240, 1010, 230, 170, (c) => { [C.red, C.blue, GREEN, FIGC].forEach((col, i) => { const y = 1010 - i * 38, x0 = 140 + (i % 2) * 14; shape(c, K.rectPts(x0, y - 38, 190, 38), col, { lw: 3.5, seed: 210 + i, dot: AB_MX(col, C.black, 0.35), pitch: 7, rad: 0.18, da: 0.3 }); shape(c, ell(x0 + 190, y - 19, 9, 19, 12), AB_MX(col, C.white, 0.3), { lw: 2.5, seed: 215 + i }); }); }),
    chest: abSprite('chest', 470, 1085, 180, 130, (c) => { shape(c, K.rectPts(390, 1015, 160, 70), WOOD, { lw: 4.5, seed: 220, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); for (const bx of [418, 522]) seg(c, bx, 1017, bx, 1083, 7, C.yellow, 2); abCoinPile(c, 470, 1017, 140, 30, 1, 11); }),
    lid: abSprite('lid', 470, 1017, 180, 50, (c) => { shape(c, [[390, 1017], [550, 1017], [542, 985], [398, 985]], WOOD, { lw: 4.5, seed: 221, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); seg(c, 470, 988, 470, 1015, 7, C.yellow, 2); }, { border: 5 }),
    tiny: abSprite('tiny', 545, 990, 60, 70, (c) => abSack(c, 545, 990, 40, 48, 0.55, { seed: 240 }), { border: 5 }),
    stones: [[90, 1130, 1], [880, 1120, 0.8], [640, 1180, 0.7]].map(([x, y, s], i) => abSprite('cstone' + i, x, y, 140 * s, 80 * s, (c) => shape(c, [[x - 60 * s, y], [x - 48 * s, y - 50 * s], [x - 6 * s, y - 70 * s], [x + 40 * s, y - 56 * s], [x + 62 * s, y]], AB_MX(P.rock, C.white, 0.22), { lw: 4, seed: 250 + i, dot: P.rockD, pitch: 8, rad: 0.24, da: 0.5 }))),
  };
});
// ---------- Ali Baba in the cave: one reaction per word ----------
const AB_CALIX = [[88.9, 800], [89.4, 800], [90.4, 745], [90.82, 745], [91.15, 775], [96.36, 775], [97.2, 600], [101.3, 600], [101.95, 800], [102.35, 818], [102.85, 990]];
const AB_CALIXF = (t) => kfn(t, AB_CALIX, 'inOut');
const AB_CALI_FALLS = footfalls(AB_CALIXF, 96.36, 97.2, 22).concat(footfalls(AB_CALIXF, 101.3, 101.95, 22));
const abCaveDoorY = (x, t) => K.lerp(918, 968, K.clamp((800 - x) / 55));
function abCaveAli(t) {
  const x = AB_CALIXF(t), out = t > 101.95, P = { ...AB_ALI, x, y: abCaveDoorY(x, t), ...walk(AB_CALIXF, t, { stride: 22 }), dir: speed(AB_CALIXF, t) > 1 ? 1 : -1, sq: breathe(t, 3, 0.016), tip: idleSway(t, 5, 0.025, 3), gaze: [-1, 0.1] };
  let sack = 0, dark = K.clamp(1 - (t - 89.4) / 0.9), lift = 0;
  const at = (q) => lookAt([x, P.y - 170], q);
  if (t < 90.6) { P.dir = -1; P.handR = PERSON_HANDS.shield.R; P.gaze = at(gazePlan(t, [[88.9, [600, 760]], [89.7, [430, 700]], [90.2, [250, 820]]], 0.15)); P.lid = t > 89.5 ? 0.3 : 0; }
  else if (t < 91.6) {   // 90.82 ذهبًا: a startled hop back, eyes wide
    P.dir = -1; const [, h] = hop(t, 90.82, 0.33, 0, 0, 42); lift = h; P.y -= h; P.sq = anticipate(t, 90.6, 0.22, 0.1) * landSquash(t, 91.15, 0.16) * (h > 2 ? 1.05 : 1);
    P.eyes = 'wide'; P.mouth = 'o'; P.brow = -0.5; P.aL = [-1.4, -2.2]; P.aR = [1.2, 2.0]; P.gaze = at([430, 780]); P.drop = -lagged((u) => hop(u, 90.82, 0.33, 0, 0, 42)[1], t, 0.1, 0.2);
    if (t > 91.15) { const d = K.clamp((t - 91.15) / 0.3); P.aL = [K.lerp(-1.4, -0.4, d), K.lerp(-2.2, -0.3, d)]; P.aR = [K.lerp(1.2, 0.4, d), K.lerp(2.0, 0.3, d)]; P.gaze = at(t < 91.56 ? [430, 780] : [150, 820]); }
  }
  else if (t < 95.4) {   // saccades: gold, silver, cloth, then up to the stars; a blink on each turn
    P.dir = -1; P.eyes = 'wide'; P.mouth = 'o'; P.handL = [-28, -112]; P.handR = [24, -96];
    P.gaze = at(gazePlan(t, [[91.6, [150, 820]], [92.56, [240, 980]], [93.84, [420, 420]], [94.7, [610, 470]]], 0.07));
    P.lid = Math.max(pulse(t, 92.56, 0.14), pulse(t, 93.84, 0.14));
    P.tilt = 0.08 * blend(t, 93.84, 94.2, 0, 1) + lagged((u) => (u > 92.56 ? 0.05 : 0), t, 0.12, 1);
  }
  else if (t < 96.36) {   // 95.40 دهش: stretch, both hands to the cheeks, mouth open, a held moving pose
    P.dir = -1; const u = blend(t, 95.4, 95.6, 0, 1); P.sq = 1 + 0.08 * u + breathe(t, 3, 0.02) - 1; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.eyes = 'wide'; P.mouth = 'o'; P.brow = 0.2;
    P.gaze = at([430, 700]); P.drop = -5 * u + lagged((v) => blend(v, 95.4, 95.6, 0, 6), t, 0.12, 1); P.tip = 0.03 * osc(t, 1.4);
  }
  else if (t < 97.3) { P.mouth = 'smile'; P.gaze = at(gazePlan(t, [[96.36, [430, 760]], [96.75, [150, 820]], [97.05, [660, 860]]], 0.08)); P.lid = pulse(t, 96.72, 0.14); }
  else if (t < 98.28) {   // 97.30 لكنه: a clear stop. Head shake, hand on heart, a glance at the big sacks, then away
    P.dir = -1; P.handR = PERSON_HANDS.chest.R; P.brow = -0.4; P.mouth = 'frown';
    P.gaze = gazePlan(t, [[97.3, [-1, 0]], [97.42, [1, 0]], [97.56, [-1, 0]], [97.7, [0.2, 0]], [97.85, at([660, 860])], [98.1, [-0.3, 0.8]]], 0.06);
    P.tilt = flow(t, [[97.3, 0], [97.42, 0.07], [97.56, -0.07], [97.7, 0]]); P.sq *= 1 - 0.03 * pulse(t, 97.3, 0.2); P.lid = pulse(t, 98.05, 0.14);
  }
  else if (t < 99.5) {   // 98.28 أخذ: he kneels and picks the smallest sack with two fingers
    P.dir = -1; P.kneel = flow(t, [[98.28, 0], [98.7, 0.55], [99.05, 0.55], [99.45, 0]]); P.gaze = at([545, 960]); P.mouth = 'smile';
    if (t > 98.8) { sack = 1; const u = K.clamp((t - 98.8) / 0.65); P.handRW = [K.lerp(548, 575, u), K.lerp(950, 868, K.ease.inOut(u))]; P.gaze = at([575, 870]); }
    else P.handRW = [548, 950];
  }
  else if (t < 101.3) {   // he holds it up, looks at it, at the mountain of gold, and back: three coins go in (100.42, 100.7, 100.98)
    P.dir = -1; sack = 1; P.handRW = [575, 868]; P.mouth = 'smile'; P.gaze = at(gazePlan(t, [[99.5, [575, 870]], [99.9, [430, 700]], [100.3, [575, 860]]], 0.1)); P.lid = pulse(t, 99.88, 0.14);
    P.handLW = t > 100.3 ? [560 + 8 * Math.sin(t * 9), 830] : undefined; P.drop = 2 * osc(t, 0.9);
  }
  else if (!out) { sack = 1; P.dir = 1; P.handRW = [x + 26, P.y - 108]; P.tip = 0.06; P.gaze = [1, 0]; }
  else {   // in the doorway: a last look back with a blink, then he hurries out to the right
    sack = 1; const tf = turnFlip(t, [[0, 1], [101.98, -1], [102.32, 1]], 0.2); P.dir = tf.dir; P.handRW = undefined; P.handR = [24, -122]; P.lid = pulse(t, 102.12, 0.15); P.gaze = P.dir < 0 ? [-1, 0] : [1, 0];
    if (t > 102.35) { P.tip = 0.14; P.handL = [-10, -118]; }
  }
  return { P, sack, dark, lift, out };
}
function abCave(ctx, t) {
  AB_G = 'cave';
  const SP = abCS(), t0 = AB_CV.t0 + 0.1, out = AB_CV.out, pop = (d) => abK(t, t0, { delay: d, out: out + d * 0.1 }), kA = abK(t, t0, { delay: 0.2, out: out + 0.1 });
  const shut = flow(t, [[102.14, 0], [102.5, 0.22], [103.0, 1.06], [103.15, 1]]), dim = 0.32 * K.clamp((t - 102.9) / 0.6), glow = K.clamp((t - 90.82) / 0.4) * (1 - 0.6 * dim / 0.32);
  ctx.drawImage(abCavePrint(), 0, 0, AB_WW, AB_WH);
  // gold light on the back wall once the heap is up
  if (glow > 0) { const g = ctx.createRadialGradient(430, 760, 40, 430, 760, 520); g.addColorStop(0, 'rgba(255,214,90,0.55)'); g.addColorStop(1, 'rgba(255,214,90,0)'); ctx.save(); ctx.globalAlpha = glow * (0.85 + 0.15 * osc(t, 1.7)); ctx.fillStyle = g; ctx.fillRect(0, 0, AB_WW, AB_GR); ctx.restore(); }
  // the doorway card with the dusk inside, the donkey peeking in, Ali Baba when he is out there, the sliding slab
  abPut(ctx, SP.door, pop(0.3));
  const A = abCaveAli(t), P = A.P;
  ctx.save(); K.poly(ctx, abCDoorPts(), true); ctx.clip();
  const dx = kfn(t, [[88.9, 915], [102.45, 915], [103.1, 1120]], 'in'), D = { x: dx, y: 912, s: 0.62, pal: 0, seed: 51, dir: t > 102.4 ? 1 : -1, ...walk((u) => kfn(u, [[88.9, 915], [102.45, 915], [103.1, 1120]], 'in'), t, { stride: GAIT.donkey * 0.62 }),
    earL: 0.8 + idleSway(t, 52, 0.15, 1.9), earR: 0.8 + idleSway(t, 53, 0.15, 2.3), headDown: 0.1 + 0.1 * osc(t, 3.1), gaze: lookAt([dx - 80, 800], [P.x, 790]), lid: blink(t, 54) };
  if (t > 90.82 && t < 92.0) { D.earL = D.earR = 1.3; D.eyes = 'wide'; }
  if (t > 102.0) { D.earL = D.earR = 1.2; }
  abLive(ctx, D.x, D.y, 300, 280, (c) => donkey(c, D), kA);
  if (A.out) abLive(ctx, P.x, P.y, 220, 290, (c) => { c.translate(P.x, P.y); c.scale(0.86, 0.86); c.translate(-P.x, -P.y); abPerson(c, P, { patches: true }); abSack(c, P.x + 26 * Math.sign(P.dir), P.y - 66, 40, 48, 0.75, { seed: 240 }); }, kA);
  if (shut > 0) abPut(ctx, SP.slab, 1, { dx: K.lerp(-AB_CV.door.w - 20, 0, shut) });
  ctx.restore();
  // the arch cards, back to front, and the stalactites unfolding down from the front arch, one after another
  abPut(ctx, SP.archB, pop(0.0)); abPut(ctx, SP.archF, pop(0.15));
  SP.stal.forEach((sp, i) => { const k = abK(t, 89.5, { delay: i * 0.12, dur: 0.4, out: out + 0.05 }); abPut(ctx, sp, k, { py: sp.y0 + 44, rot: idleSway(t, 251 + i, 0.012, 2.5) * (1 - shut) }); });
  // stars dropping on strings from the arch at ثمينة (93.84) and swinging on
  if (t > 93.84) AB_CSTARS.forEach(([x, len], i) => { const y0 = abArchY(x) + 6, k = K.ease.back(K.clamp((t - 93.84 - i * 0.09) / 0.5)), sw = swing(t, 93.9 + i * 0.09, 0.3, 0.6 + i * 0.11, 0.5) + idleSway(t, 260 + i, 0.06, 2.2 + i * 0.3);
    if (k <= 0) return; const L = len * k, ex = x + Math.sin(sw) * L, ey = y0 + Math.cos(sw) * L; ctx.save(); ctx.strokeStyle = '#d9c9a0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore();
    abLive(ctx, ex, ey + 26, 50, 52, (c) => abStar(c, ex, ey + 4, 22, sw), kA, { border: 4, shadow: 0.5 }); });
  // heaps on their words: silver, gold, the thieves' big sacks
  abPut(ctx, SP.silver, abK(t, 91.56, { out, dur: 0.4 }));
  abPut(ctx, SP.gold, abK(t, 90.82, { out, dur: 0.45 }));
  SP.sacks.forEach((sp, i) => abPut(ctx, sp, pop(0.45 + i * 0.05)));
  // Ali Baba inside (a dark shape in the doorway first, then lit gold)
  const L = [];
  if (!A.out) L.push([P.y, () => { if (A.lift > 0) groundShadow(ctx, P.x, 968, 80, A.lift, { flat: true });
    abLive(ctx, P.x, P.y, 220, 290, (c) => {
      abPerson(c, P, { patches: true });
      if (A.sack) { const h = P.handRW || [P.x + 28 * Math.sign(P.dir), P.y - 112], f = t > 100.42 ? 0.55 + 0.05 * [100.42, 100.7, 100.98].filter((q) => t > q + 0.3).length : 0.55; abSack(c, h[0], h[1] + 46, 40, 48, f + 0.04 * pulse(t, 100.75, 0.15), { seed: 240 }); }
      if (A.dark > 0) { c.save(); c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.75 * A.dark; c.fillStyle = NAVY2; c.fillRect(P.x - 200, P.y - 320, 400, 340); c.restore(); }
      else if (glow > 0) { c.save(); c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.16 * glow; c.fillStyle = C.yellow; c.fillRect(P.x - 200, P.y - 320, 400, 340); c.restore(); }
    }, kA); }]);
  L.push([990, () => { if (!A.sack) abPut(ctx, SP.tiny, pop(0.7)); }]);
  // cloth bolts pop on وأقمشة (92.56) and three lengths unroll toward the reader
  L.push([1010, () => { abPut(ctx, SP.bolts, abK(t, 92.56, { out, dur: 0.4 }));
    if (t > 92.7 && t < out + 0.3) [[C.red, 250, 0], [C.blue, 330, 0.12], [GREEN, 180, 0.24]].forEach(([col, x, d]) => { const u = K.ease.back(K.clamp((t - 92.75 - d) / 0.6)), y0 = 1000, len = 150 * u; if (u <= 0) return;
      abLive(ctx, x, y0 + len + 20, 70, len + 40, (c) => { shape(c, K.rectPts(x - 26, y0, 52, len), col, { lw: 3, seed: 260, dot: AB_MX(col, C.yellow, 0.5), pitch: 7, rad: 0.25, da: 0.6 }); shape(c, ell(x, y0 + len, 28, 12, 14), AB_MX(col, C.white, 0.25), { lw: 3, seed: 261 }); }, kA * abK(t, t0, { out, dur: 0.01 }), { border: 4, shadow: 0.5 }); }); }]);
  L.push([1085, () => { abPut(ctx, SP.chest, pop(0.6)); const lu = K.clamp((t - 93.84) / 0.4), lk = t > 93.84 ? 1 - 2 * K.ease.inOut(lu) : 1; abPut(ctx, SP.lid, pop(0.6) * lk, { py: 985 });
    if (t > 94.0 && t < 96.0) for (let i = 0; i < 3; i++) { const g = pulse(t, 94.0 + i * 0.4, 0.5); if (g > 0) abStar(ctx, 430 + i * 40, 1000 - i * 8, 13 * g, t * 3, C.white); } }]);
  SP.stones.forEach((sp, i) => L.push([sp.by, () => abPut(ctx, sp, pop(0.5 + i * 0.05))]));
  L.sort((a, b) => a[0] - b[0]); for (const [, f] of L) f();
  // three coins from the heap into the little sack (100.42, 100.7, 100.98), each with a tiny glint as it lands
  for (const t1 of [100.42, 100.7, 100.98]) { const u = K.clamp((t - t1) / 0.3); if (t < t1 || t > t1 + 0.45) continue; const a = [560, 830], b = [575, 880];
    if (u < 1) { const cx = K.lerp(a[0], b[0], u), cy = K.lerp(a[1], b[1], u) - 30 * Math.sin(Math.PI * u); abLive(ctx, cx, cy + 12, 26, 26, (c) => abCoin(c, cx, cy, 9, Math.abs(Math.cos(t * 14))), 1, { border: 3, shadow: 0.4 }); }
    else abStar(ctx, 588, 868, 10 * pulse(t, t1 + 0.3, 0.15), t * 5, C.white); }
  if (dim > 0) { ctx.save(); ctx.globalAlpha = dim; ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, AB_WW, AB_WH); ctx.restore(); }
  abRockTab(ctx, shut, AB_CV.door.x + 40, 1180, 1.3);
  for (const f of AB_CALI_FALLS) abDust(ctx, f.x + 20, 966, t, f.t, Math.round(f.t * 10), 0.7);
  return { P };
}
function abCaveOver(ctx, t, cam, S) {
  for (const [txt, ta, wx, wy] of [['GOLD', 90.82, 430, 560], ['SILVER', 91.56, 140, 640], ['CLOTH', 92.56, 240, 830]]) {
    if (t < ta || t > 96.0) continue; const [x, y] = abToPanel(wx, wy, cam); ctx.save(); abFade(ctx, t, ta, 96.0); S.label(ctx, txt, x, y, abB(t, ta, 0.5), { size: 40, fill: txt === 'GOLD' ? C.yellow : C.white }); ctx.restore(); }
  if (t > 98.8 && t < 101.2) { const [x, y] = abToPanel(475, 760, cam), to = abToPanel(560, 870, cam); ctx.save(); abFade(ctx, t, 98.8, 101.2); S.arrow(ctx, [x + 30, y + 30], to, abB(t, 98.9, 0.4), { bend: 0.25, width: 16 }); S.counter(ctx, 1, x - 30, y - 20, abB(t, 99.5, 0.4), { size: 90 }); ctx.restore(); }
}
