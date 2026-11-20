// ===== spread 4: the treasure cave in cross-section, indigo and gold (88.9-105.0). Scene S7. =====
// Cavity x 50..700, y 340..905; doorway through the right wall x 700..770 (y 640..905) with a sliding slab; outside strip x 770..1000.
const AB_CV = { t0: 88.9, out: 104.25, door: [700, 770, 640] };
const AB_STALS = [[110, 70], [190, 110], [290, 60], [380, 95], [470, 75], [560, 105], [640, 55]];
function abCavePrint() {
  const P = AB_PAL.cave, D = AB_PAL.dusk;
  return abBake('cave', (c) => {
    c.fillStyle = P.rock; c.fillRect(0, 0, AB_WW, AB_WH); c.save(); c.globalAlpha = 0.6; c.fillStyle = dotPat(c, P.rockD, 10, 0.3); c.fillRect(0, 0, AB_WW, AB_WH); c.restore();
    // outside strip: dusk sky and ground
    abSkyBand(c, 0, AB_GR, AB_MX(D.sky, FIGC, 0.3), D.sky); c.fillStyle = D.page; c.fillRect(770, AB_GR, 230, AB_WH - AB_GR);
    // the rock wall in section, with the cavity and the doorway cut out of it
    const g = nz(61), cav = []; for (let i = 0; i <= 40; i++) { const a = Math.PI + i / 40 * Math.PI, w = 1 + 0.04 * g.n2(i * 0.4, 2); cav.push([375 + Math.cos(a) * 335 * w, 905 + Math.sin(a) * 560 * w]); }
    const wall = [[0, 0], [790, 0], [790, 200], [810, 640], [785, 905], [770, 1230], [0, 1230]];
    shape(c, wall, P.rock, { lw: 6, seed: 62, dot: P.rockD, pitch: 10, rad: 0.3, da: 0.6 });
    shape(c, [...cav, [710, 1010], [40, 1010]], P.hole, { lw: 6, seed: 63, dot: AB_MX(P.hole, C.black, 0.4), pitch: 11, rad: 0.24, da: 0.45 });
    shape(c, [[40, 905], [710, 905], [712, 1010], [38, 1010]], P.floor, { lw: 4, seed: 64, dot: AB_MX(P.floor, C.black, 0.3), pitch: 9, rad: 0.22, da: 0.45 });
    shape(c, K.rectPts(700, 640, 70, 265), AB_MX(D.sky, FIGC, 0.2), { lw: 5, seed: 65 }); c.fillStyle = D.page; c.fillRect(700, 880, 70, 25);
    abPage(c, 'rgba(0,0,0,0)'); bookFold(c, 0, AB_WW, AB_GR);
  });
}
const abCS = () => abMem(AB_G, 'set', () => {
  const P = AB_PAL.cave, D = AB_PAL.dusk;
  return {
    stal: AB_STALS.map(([x, L], i) => abSprite('stal' + i, x, 350 + L, 60, L + 10, (c) => shape(c, [[x - 24, 350], [x + 24, 350], [x + 3, 350 + L], [x - 3, 350 + L]], AB_MX(P.rock, C.white, 0.15), { lw: 4, seed: 180 + i, dot: P.rockD, pitch: 8, rad: 0.25, da: 0.5 }), { border: 5, shadow: 0.5 })),
    sacks: [400, 450, 500, 550, 600, 645].map((x, i) => abSprite('csack' + i, x, 905, 80, 120, (c) => abSack(c, x, 905, 70, 100, 1, { seed: 190 + i, coin: true }), { border: 5 })),
    gold: abSprite('gold', 330, 945, 260, 170, (c) => abCoinPile(c, 330, 945, 240, 150, 1, 7), {}),
    silver: abSprite('silver', 150, 918, 220, 190, (c) => { abCoinPile(c, 150, 918, 200, 120, 1, 9, { col: AB_MX(STONE2, C.white, 0.3), dk: STONED, coin: C.white });
      for (const [ex, sc] of [[110, 1], [190, 0.8]]) { c.save(); c.translate(ex, 840); c.scale(sc, sc); shape(c, [[-18, 0], [-24, -40], [-12, -62], [-6, -84], [6, -84], [12, -62], [24, -40], [18, 0]], AB_MX(STONE2, C.white, 0.2), { lw: 3.5, seed: 200 }); c.restore(); }
      shape(c, ell(150, 860, 46, 14, 20), AB_MX(STONE2, C.white, 0.4), { lw: 3, seed: 201 }); }, {}),
    cloth: abSprite('cloth', 520, 918, 190, 190, (c) => { const cols = [C.red, C.blue, GREEN, FIGC, C.yellow]; cols.forEach((col, i) => { shape(c, K.rectPts(445 + (i % 2) * 8, 884 - i * 34, 150, 34), col, { lw: 3.5, seed: 210 + i, dot: AB_MX(col, C.black, 0.35), pitch: 7, rad: 0.18, da: 0.3 }); shape(c, ell(595 + (i % 2) * 8, 901 - i * 34, 7, 17, 12), AB_MX(col, C.white, 0.3), { lw: 2.5, seed: 215 + i }); }); }),
    chest: abSprite('chest', 250, 992, 170, 120, (c) => { shape(c, K.rectPts(175, 930, 150, 62), WOOD, { lw: 4.5, seed: 220, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); for (const bx of [200, 300]) seg(c, bx, 932, bx, 990, 7, C.yellow, 2); abCoinPile(c, 250, 932, 130, 26, 1, 11); }),
    lid: abSprite('lid', 250, 932, 170, 50, (c) => { shape(c, [[175, 932], [325, 932], [318, 902], [182, 902]], WOOD, { lw: 4.5, seed: 221, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); seg(c, 250, 904, 250, 930, 7, C.yellow, 2); }, { border: 5 }),
    slab: abSprite('slab', 735, 905, 80, 275, (c) => shape(c, K.rectPts(698, 636, 74, 269), AB_MX(P.rock, C.white, 0.1), { lw: 5, seed: 230, dot: P.rockD, pitch: 9, rad: 0.25, da: 0.5 }), { border: 5 }),
    tree: abSprite('ctree', 900, 900, 160, 330, (c) => abTreeArt(c, { x: 900, base: 900, top: 680, w: 34, pal: D, seed: 12, crowns: [[900, 650, 70], [860, 700, 46], [945, 700, 48]] }), { sx: 14, sy: 9 }),
    tiny: abSprite('tiny', 600, 988, 60, 70, (c) => abSack(c, 600, 988, 40, 48, 0.55, { seed: 240 }), { border: 5 }),
  };
});
// Ali Baba in the cave
const AB_CALIX = [[88.9, 735], [89.5, 735], [90.7, 660], [96.0, 660], [97.3, 430], [98.0, 430], [98.8, 570], [101.0, 570], [101.9, 800], [103.4, 800], [104.4, 1120]];
const AB_CALIXF = (t) => kfn(t, AB_CALIX, 'inOut');
const AB_CDONX = [[88.9, 900], [103.6, 900], [104.6, 1150]];
const AB_CDONXF = (t) => kfn(t, AB_CDONX, 'in');
const AB_CALI_FALLS = footfalls(AB_CALIXF, 103.4, 104.4, 22);
function abCaveAli(t) {
  const x = AB_CALIXF(t), P = { ...AB_ALI, x, y: x > 690 ? 905 : K.lerp(905, 960, K.clamp((690 - x) / 60)), ...walk(AB_CALIXF, t, { stride: 22 }), dir: speed(AB_CALIXF, t) > 1 ? 1 : -1, sq: breathe(t, 3, 0.014), tip: idleSway(t, 5, 0.025, 3), gaze: [-1, 0.1] };
  let sack = 0, dark = K.clamp(1 - (t - 89.5) / 1.0);
  if (t < 90.7) { P.handR = PERSON_HANDS.shield.R; P.dir = -1; P.gaze = gazePlan(t, [[89, [-1, 0]], [89.8, [-0.6, -0.5]], [90.3, [-1, 0.2]]], 0.12); }
  else if (t < 95.4) { P.dir = -1; P.eyes = 'wide'; P.gaze = lookAt([x, 790], t < 91.56 ? [330, 900] : t < 92.56 ? [150, 860] : t < 93.84 ? [520, 860] : [300, 500]); P.lid = Math.abs(t - 91.6) < 0.07 || Math.abs(t - 92.6) < 0.07 ? 1 : 0; P.mouth = 'o'; P.handL = [-28, -110]; }
  else if (t < 96.1) { P.dir = -1; const u = pulse(t, 95.4, 0.9); P.sq = 1 + 0.08 * u; P.y -= 10 * u; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.eyes = 'wide'; P.mouth = 'o'; P.drop = -6 * lagged((v) => pulse(v, 95.4, 0.9), t, 0.12, -1); }
  else if (t < 97.3) { P.mouth = 'smile'; P.gaze = lookAt([x, 790], gazePlan(t, [[96, [330, 900]], [96.4, [150, 860]], [96.75, [520, 860]], [97.0, [330, 900]]], 0.07)); P.handRW = [x - 40, 880]; }
  else if (t < 98.0) { P.dir = 1; P.tip = 0.04 * Math.sin((t - 97.3) * 18); P.handR = PERSON_HANDS.chest.R; P.brow = -0.5; P.gaze = t < 97.65 ? lookAt([x, 790], [520, 850]) : [1, -0.2]; P.sq *= 1 - 0.03 * pulse(t, 97.6, 0.2); P.mouth = 'frown'; }
  else if (t < 98.8) { P.dir = 1; P.kneel = blend(t, 98.4, 98.8, 0, 0.5); P.handL = [-90, -140]; P.gaze = [0.6, 1]; }
  else if (t < 101.0) { P.dir = 1; P.kneel = blend(t, 98.8, 99.2, 0.5, 0); P.handRW = [600, 870]; sack = 1; P.mouth = 'smile'; P.gaze = lookAt([x, 790], [600, 880]); P.drop = t > 100.9 ? 0 : 4 * Math.max(0, Math.sin((t - 99.5) * 6)) * (t > 99.5 ? 1 : 0); }
  else if (t < 102.72) { sack = 1; P.handRW = [x + 28, 860]; if (t > 101.9) { const tf = turnFlip(t, [[0, 1], [101.9, -1]], 0.4); P.dir = tf.dir; P.handL = PERSON_HANDS.wave.R.map((v, i) => (i ? v : -v)); P.gaze = [-1, 0]; } }
  else { sack = 1; const tf = turnFlip(t, [[0, -1], [102.72, 1]], 0.4); P.dir = tf.dir; P.lid = Math.abs(t - 102.9) < 0.07 ? 1 : 0; P.tip = t < 103.4 ? -0.06 : 0.12; P.handRW = undefined; P.handR = [24, -122]; P.handL = [-10, -118]; P.gaze = [1, 0];
    P.drop = -lagged((u) => AB_CALIXF(u) * 0.05, t, 0.1, 1); }
  return { P, sack, dark };
}
function abCave(ctx, t) {
  AB_G = 'cave';
  const SP = abCS(), t0 = AB_CV.t0 + 0.1, out = AB_CV.out, pop = (d) => abK(t, t0, { delay: d, out: out + d * 0.1 }), kA = abK(t, t0, { delay: 0.2, out: out + 0.1 });
  const shut = K.clamp((t - 102.14) / 0.5), dim = 0.3 * shut;
  ctx.drawImage(abCavePrint(), 0, 0, AB_WW, AB_WH);
  abPut(ctx, SP.tree, pop(0.15), { rot: idleSway(t, 250, 0.012, 3) });
  // stalactites unfold down from the roof (hinged at the top)
  SP.stal.forEach((sp, i) => abPut(ctx, sp, pop(0.1 + i * 0.05), { py: 350, rot: idleSway(t, 251 + i, 0.01, 2.5) * (1 - shut) }));
  SP.sacks.forEach((sp, i) => abPut(ctx, sp, pop(0.5 + i * 0.04)));
  // treasure cards pop on their words
  abPut(ctx, SP.silver, abK(t, 91.56, { out }));
  abPut(ctx, SP.cloth, abK(t, 92.56, { out }));
  if (t > 92.7) { const L = 200 * K.ease.back(K.clamp((t - 92.75) / 0.6)); if (t < out + 0.3) abLive(ctx, 600 + L / 2, 925, L + 20, 30, (c) => { shape(c, K.rectPts(600, 905, L, 18), C.red, { lw: 3, seed: 260, dot: C.yellow, pitch: 7, rad: 0.25, da: 0.6 }); shape(c, ell(600 + L, 905, 9, 12, 12), C.red, { lw: 2.5, seed: 261 }); }, kA, { border: 4, shadow: 0.5 }); }
  abPut(ctx, SP.gold, abK(t, 90.82, { out }));
  abPut(ctx, SP.chest, pop(0.6));
  const lu = K.clamp((t - 93.84) / 0.4), lk = t > 93.84 ? 1 - 2 * K.ease.inOut(lu) : 1; abPut(ctx, SP.lid, pop(0.6) * lk, { py: 902 });
  if (t > 94.0 && t < 95.4) for (let i = 0; i < 2; i++) { const g = pulse(t, 94.0 + i * 0.35, 0.5); if (g > 0) abStar(ctx, 220 + i * 60, 915 - i * 8, 12 * g, t * 3, C.white); }
  // the tiny sack waits by the door until he picks it up
  const A = abCaveAli(t), P = A.P;
  if (!A.sack) abPut(ctx, SP.tiny, pop(0.7));
  // gems glint on the chest; stars on strings
  if (t > 93.84) for (let i = 0; i < 5; i++) { const x = 120 + i * 120, len = 120 + (i % 3) * 50, k = K.ease.back(K.clamp((t - 93.84 - i * 0.08) / 0.5)), sw = (1 - shut) * swing(t, 93.9 + i * 0.08, 0.35, 0.6 + i * 0.13, 0.4) + shut * 0;
    if (k <= 0) continue; const ex = x + Math.sin(sw) * len, ey = 350 + Math.cos(sw) * len * k; ctx.save(); ctx.strokeStyle = '#d9c9a0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, 350); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore();
    abLive(ctx, ex, ey + 22, 40, 44, (c) => abStar(c, ex, ey + 2, 18, sw), kA * k, { border: 4, shadow: 0.5 }); }
  // the donkey waits outside
  const dx = AB_CDONXF(t), D = { x: dx, y: 955, s: 0.62, pal: 0, seed: 51, dir: t > 103.5 ? 1 : -1, ...walk(AB_CDONXF, t, { stride: GAIT.donkey * 0.62 }), earL: 0.8 + idleSway(t, 52, 0.12, 1.9), earR: 0.8 + idleSway(t, 53, 0.12, 2.3), tailSwish: osc(t, 2.4) * 0.5, gaze: lookAt([dx, 800], [AB_CALIXF(t), 790]) };
  if (t > 102.72) { D.earL = D.earR = 1.2; D.eyes = 'wide'; }
  abLive(ctx, D.x, D.y, 300, 280, (c) => { donkey(c, D); const st = mountSeat('donkey', D), bob = lagged((u) => Math.abs(Math.sin(AB_CDONXF(u) * 0.05)) * 10, t, 0.1, 1); abWoodBundle(c, st.x - 8 * D.dir, st.y + 6 + bob, 0.62, st.rot); abWoodBundle(c, st.x + 10 * D.dir, st.y - 20 + bob * 1.4, 0.62, st.rot); }, kA);
  // Ali Baba (a dark shape in the doorway first)
  abLive(ctx, P.x, P.y, 220, 290, (c) => {
    abPerson(c, P, { patches: true });
    if (A.sack) { const h = P.handRW || [P.x + 28 * Math.sign(P.dir), P.y - 112]; abSack(c, h[0], h[1] + 46, 40, 48, t > 100.3 ? 0.55 + 0.15 * K.clamp((t - 100.3) / 0.6) + 0.05 * pulse(t, 100.55, 0.15) : 0.55, { seed: 240 }); }
    if (A.dark > 0) { c.save(); c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.75 * A.dark; c.fillStyle = NAVY2; c.fillRect(P.x - 200, P.y - 320, 400, 340); c.restore(); }
    else if (t > 90.82 && t < 102.1) { c.save(); c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.14; c.fillStyle = C.yellow; c.fillRect(P.x - 200, P.y - 320, 400, 340); c.restore(); }
  }, kA);
  // coins: through his fingers (96.4-97.2), into the tiny sack (100.3, 100.55, 100.8)
  for (const [t1, a, b] of [[96.4, [P.x - 40, 860], [330, 900]], [96.65, [P.x - 40, 860], [300, 905]], [96.9, [P.x - 40, 860], [360, 900]], [100.3, [360, 870], [600, 840]], [100.55, [340, 860], [602, 840]], [100.8, [380, 880], [598, 840]]]) {
    const u = K.clamp((t - t1) / 0.35); if (t < t1 || u >= 1) continue; const cx = K.lerp(a[0], b[0], u), cy = K.lerp(a[1], b[1], u) - 70 * Math.sin(Math.PI * u);
    abLive(ctx, cx, cy + 12, 26, 26, (c) => abCoin(c, cx, cy, 9, Math.abs(Math.cos(t * 14))), 1, { border: 3, shadow: 0.4 }); }
  // the slab slides across the doorway (pull-tab), the cave dims
  if (shut > 0) { ctx.save(); ctx.beginPath(); ctx.rect(660, 600, 132, 330); ctx.clip(); abPut(ctx, SP.slab, 1, { dx: K.lerp(84, 0, K.ease.back(shut)) }); ctx.restore(); }
  if (dim > 0) { ctx.save(); ctx.globalAlpha = dim; ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, 700, AB_WH); ctx.restore(); }
  abPullTab(ctx, 735, 1180, K.ease.back(shut), 1);
  if (t > 103.6) for (const f of AB_CALI_FALLS) abDust(ctx, f.x - 30, 952, t, f.t, Math.round(f.t * 10), 0.8);
  return { P };
}
function abCaveOver(ctx, t, cam, S) {
  for (const [txt, ta, wx, wy, ax, ay] of [['GOLD', 90.82, 330, 700, 330, 790], ['SILVER', 91.56, 150, 640, 150, 730], ['CLOTH', 92.56, 545, 620, 520, 720]]) {
    if (t < ta || t > 95.6) continue; const [x, y] = abToPanel(wx, wy, cam); ctx.save(); abFade(ctx, t, ta, 95.6); S.label(ctx, txt, x, y, abB(t, ta, 0.5), { size: 36, fill: txt === 'GOLD' ? C.yellow : C.white }); ctx.restore(); }
  if (t > 98.8 && t < 101.0) { const [x, y] = abToPanel(470, 700, cam), to = abToPanel(585, 860, cam); ctx.save(); abFade(ctx, t, 98.8, 101.0); S.arrow(ctx, [x + 10, y + 40], to, abB(t, 98.9, 0.4), { bend: 0.2, width: 16 }); S.counter(ctx, 1, x - 40, y, abB(t, 99.5, 0.4), { size: 90 }); ctx.restore(); }
}
