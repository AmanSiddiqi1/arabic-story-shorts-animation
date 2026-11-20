// ===== spread 1: home, apricot morning (0-15.9). Scene S1: the poor woodcutter, his family, the donkey, the forest on the LEFT. =====
const AB_HOME = { out: 15.2, hut: { x0: 640, x1: 900, wall: 650, roof: 560, door: [700, 770, 720] }, stump: [300, 950] };
function abHomePrint(gold) {
  const P = AB_PAL.home;
  return abBake('home-' + (gold ? 'gold' : 'apricot'), (c) => {
    const top = gold ? AB_MX(C.yellow, C.white, 0.35) : P.sky, low = gold ? AB_MX(C.yellow, C.paper, 0.6) : P.sky2;
    abSkyBand(c, 0, AB_GR, top, low);
    for (const [cx, cy, s] of [[200, 200, 0.9], [760, 140, 0.7]]) { c.save(); c.globalAlpha = 0.7; cloudFlat(c, cx, cy, s); c.restore(); }
    abHillPrint(c, 790, 90, gold ? AB_MX(P.hill, C.yellow, 0.4) : P.hill, 51);
    abSlot(c, 520, 270, 520, 892, 10);
    abPage(c, P.page); const path = [[1000, 965], [700, 975], [450, 960], [150, 950], [0, 955]];
    shape(c, [...path.map(([x, y]) => [x, y - 18]), ...path.slice().reverse().map(([x, y]) => [x, y + 22])], P.path, { lw: 0, dot: AB_MX(P.path, EARTH, 0.4), pitch: 8, rad: 0.22, da: 0.45 });
    bookFold(c, 0, AB_WW, AB_GR);
  });
}
const abHS = () => abMem(AB_G, 'set', () => {
  const P = AB_PAL.home, H = AB_HOME.hut;
  return {
    town: abSprite('town', 710, 885, 600, 190, (c) => {
      const cols = [AB_MX(C.paper, C.red, 0.2), AB_MX(C.yellow, C.paper, 0.4), AB_MX(SAND, C.white, 0.3), AB_MX(C.paper, C.red, 0.35), AB_MX(SANDL, C.white, 0.2)];
      [[440, 90, 60], [600, 110, 80], [920, 100, 70], [975, 70, 50], [700, 80, 70], [820, 95, 60]].forEach(([x, h, w], i) => { shape(c, K.rectPts(x - w / 2, 885 - h, w, h), cols[i % 5], { lw: 3.5, seed: 120 + i }); shape(c, K.rectPts(x - 8, 885 - h + 20, 16, 18), AB_MX(NAVY2, C.black, 0.2), { lw: 2, seed: 130 + i }); });
      shape(c, ell(515, 810, 46, 46, 24).filter(([, y]) => y <= 812).concat([[561, 885], [469, 885]]), AB_MX(C.white, SAND, 0.2), { lw: 3.5, seed: 140 }); shape(c, ell(515, 770, 34, 40, 24).filter(([, y]) => y <= 790), C.yellow, { lw: 3.5, seed: 141 });
    }, { sx: 4, sy: 5 }),
    hut: abSprite('hut', 770, 905, 300, 380, (c) => {
      shape(c, K.rectPts(H.x0, H.wall, H.x1 - H.x0, 905 - H.wall), WALL, { lw: 5, seed: 142, dot: AB_MX(WALL, EARTHD, 0.5), pitch: 10, rad: 0.2, da: 0.4 });
      shape(c, K.rectPts(855, 520, 30, 80), AB_MX(WALL, EARTHD, 0.3), { lw: 4, seed: 143 });
      shape(c, [[H.x0 - 22, H.wall + 10], [H.x0 + 10, H.roof], [H.x1 - 10, H.roof], [H.x1 + 22, H.wall + 10]], C.yellow, { lw: 5, seed: 144, dot: AB_MX(C.yellow, EARTH, 0.5), pitch: 8, rad: 0.24, da: 0.5 });
      c.save(); c.strokeStyle = AB_MX(C.yellow, EARTHD, 0.5); c.lineWidth = 3; for (let x = H.x0; x < H.x1; x += 22) { c.beginPath(); c.moveTo(x, H.roof + 6); c.lineTo(x - 8, H.wall + 6); c.stroke(); } c.restore();
      const [d0, d1, dt] = H.door; shape(c, townArchPts(d0, d1, dt, 905, 'round'), AB_MX(NAVY2, C.black, 0.4), { lw: 4, seed: 145 });
      shape(c, K.rectPts(800, 740, 60, 50), AB_MX(NAVY2, C.yellow, 0.25), { lw: 4, seed: 146 }); seg(c, 830, 740, 830, 790, 4, WOOD, 1.5);
      shape(c, K.rectPts(H.x0 + 24, 790, 18, 20), C.yellow, { lw: 2.5, seed: 147 });
    }),
    trees: [[90, 385, 64, 3], [230, 465, 56, 4], [360, 525, 50, 5]].map(([x, top, w, sd], i) => abSprite('htree' + i, x, 905, 300, 905 - top + 150, (c) => abTreeArt(c, { x, base: 905, top, w, pal: P, seed: sd, crowns: [[x, top, 110 - i * 12], [x - 70 + i * 6, top + 50, 70 - i * 6], [x + 68 - i * 6, top + 46, 72 - i * 6], [x, top - 70 + i * 10, 74 - i * 8]] }))),
    stump: abSprite('stump', 300, 958, 110, 70, (c) => { shape(c, [[262, 958], [268, 912], [332, 912], [338, 958]], WOOD, { lw: 4, seed: 148, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); shape(c, ell(300, 912, 32, 9, 18), SANDL, { lw: 3, seed: 149 }); }),
    log: abSprite('log', 300, 912, 70, 50, (c) => { shape(c, K.rectPts(282, 866, 36, 46), EARTH, { lw: 3.5, seed: 150 }); shape(c, ell(300, 866, 18, 6, 14), SANDL, { lw: 2.5, seed: 151 }); }, { border: 4 }),
    logL: abSprite('logL', 290, 912, 40, 50, (c) => { shape(c, K.rectPts(282, 866, 18, 46), EARTH, { lw: 3, seed: 152 }); }, { border: 4 }),
    logR: abSprite('logR', 310, 912, 40, 50, (c) => { shape(c, K.rectPts(300, 866, 18, 46), EARTH, { lw: 3, seed: 153 }); }, { border: 4 }),
    sign: abSprite('sign', 640, 962, 200, 200, (c) => abSignArt(c, 640, 962, 'MARKET', 1)),
    smoke: abSprite('smoke', 870, 520, 60, 110, (c) => { c.save(); c.strokeStyle = C.white; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(870, 520); c.bezierCurveTo(840, 490, 900, 460, 870, 430); c.stroke(); c.restore(); }, { border: 4, shadow: 0.4 }),
  };
});
// ---------- the actors ----------
const AB_HALIX = [[0, 735], [0.54, 735], [1.7, 610], [10.9, 610], [12.0, 370], [13.5, 370]];
const AB_HALIXF = (t) => kfn(t, AB_HALIX, 'inOut');
const AB_HDONX = [[9.3, 1080], [10.6, 720], [10.9, 720], [12.0, 520]];
const AB_HDONXF = (t) => kfn(t, AB_HDONX, 'inOut');
const AB_HDON_FALLS = footfalls(AB_HDONXF, 9.3, 12.0, GAIT.donkey * 0.62);
const AB_HKIDX = [[0, 690], [10.9, 690], [11.8, 600]];
const AB_HKIDXF = (t) => kfn(t, AB_HKIDX, 'inOut');
const AB_SUNY = [[8.0, 905], [8.66, 870], [9.3, 300], [9.5, 285]];
function abHomeAli(t) {
  const P = { ...AB_ALI, x: AB_HALIXF(t), y: K.lerp(905, 950, K.clamp((735 - AB_HALIXF(t)) / 100)), ...walk(AB_HALIXF, t, { stride: 22 }), dir: 1, sq: breathe(t, 3, 0.012), tip: idleSway(t, 5, 0.025, 3.2), gaze: [0.4, 0.2] };
  let axe = null;
  if (t < 0.54) { P.gaze = [0.5, 0.2]; }
  else if (t < 1.7) { P.dir = -1; const s = pulse(t, 0.9, 0.8); P.aL = [-0.3 - 2.3 * s, -0.2 - 2.6 * s]; P.aR = [0.3 + 2.3 * s, 0.2 + 2.6 * s]; P.sq *= 1 + 0.05 * s; P.mouth = s > 0.4 ? 'o' : 'smile'; P.lid = s > 0.4 ? 0.7 : 0; P.gaze = [-0.4, -1]; }
  else if (t < 4.7) { P.dir = 1; P.mouth = 'smile'; P.gaze = lookAt([P.x, 790], t < 3.1 ? [735, 760] : [690, 830]); P.lid = Math.abs(t - 1.8) < 0.07 ? 1 : 0;
    if (t > 2.4 && t < 3.1) P.handRW = [680, 840]; if (t > 3.1 && t < 4.4) P.handRW = [688 + 6 * Math.sin(t * 16), 805]; P.handL = [-24, -124]; }
  else if (t < 6.3) { P.dir = 1; const a = K.clamp((t - 4.9) / 0.5), b = K.clamp((t - 5.52) / 0.4); P.sq *= anticipate(t, 5.3, 0.25, 0.05); P.x += 6 * b; P.gaze = lookAt([P.x, 790], [660, 830]);
    if (t < 5.52) { P.handRW = [K.lerp(640, 652, a), K.lerp(860, 840, a)]; axe = { x: 655, y: 905, a: 0.25, held: false }; }
    else { const sh = [P.x + 34, 780]; P.handRW = [K.lerp(652, sh[0], b), K.lerp(840, sh[1], b)]; axe = { x: P.handRW[0], y: P.handRW[1] + 12, a: K.lerp(0.1, -0.6, b) + lagged((u) => K.clamp((u - 5.52) / 0.4), t, 0.1, -0.5), held: true }; } }
  else { P.dir = t > 10.9 && t < 14.4 ? -1 : 1; axe = { held: true };
    if (t < 7.6) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.drop = 6 * pulse(t, 6.5, 0.8); P.mouth = t > 7.0 ? 'smile' : 'frown'; P.gaze = t < 6.7 ? [0, 1] : lookAt([P.x, 790], abMothAt(t)); P.brow = -0.3; axe = { x: P.x - 50, y: 905, a: 0.3, held: false }; }
    else if (t < 9.3) { P.handR = PERSON_HANDS.shield.R; P.gaze = lookAt([P.x, 790], [520, K.lerp(800, 300, K.clamp((t - 8.66) / 0.64))]); P.mouth = 'smile'; axe = { x: P.x - 50, y: 905, a: 0.3, held: false }; }
    else if (t < 10.9) { P.mouth = t < 9.9 ? 'o' : 'smile'; P.gaze = lookAt([P.x, 790], [AB_HDONXF(t) - 60, 820]); if (t > 10.2) P.handRW = [AB_HDONXF(t) - 64 + 4 * Math.sin(t * 14), 838]; axe = { x: P.x - 50, y: 905, a: 0.3, held: false };
      if (t > 10.6) { axe = { held: true }; } }
    else if (t < 12.95) { P.gaze = [-1, 0.3]; P.handLW = [AB_HDONXF(t) - 70, 850]; const c1 = flow(t, [[11.75, 0], [12.0, 1], [12.05, -0.2], [12.2, 0], [12.4, 1.1], [12.65, -0.25], [12.85, 0]]);
      if (t > 11.75) { P.handRW = [P.x - 10 - 50 * Math.max(0, -c1), 790 + 110 * Math.max(0, -c1) - 40 * Math.max(0, c1)]; P.sq = 1 + 0.05 * Math.max(0, c1) - 0.06 * Math.max(0, -c1); axe = { held: true, a: K.lerp(-0.3, 0.7, Math.max(0, c1)) - 2.2 * Math.max(0, -c1) * 1.1 }; } }
    else if (t < 14.4) { P.gaze = lookAt([P.x, 790], [520, 800]); P.handLW = [505, 830]; if (t > 13.5) { P.handR = PERSON_HANDS.pointUp.R; P.drop = 4 * Math.max(0, Math.sin((t - 13.5) * 7)); } P.mouth = 'smile'; if (t < 13.5) P.handRW = [500 + 10 * Math.sin(t * 10), 820]; P.dir = 1; }
    else { P.dir = 1; P.handR = PERSON_HANDS.pointFwd.R; P.gaze = lookAt([P.x, 790], t < 14.8 ? [560, 800] : [800, 800]); P.mouth = 'smile'; }
  }
  if (t > 12.85 && t < 13.5) { P.handL = [-30, -104]; P.handR = [30, -130]; P.gaze = [1, 0.2]; }
  return { P, axe };
}
function abMothAt(t) { const u = K.clamp((t - 6.6) / 2.0); return [K.lerp(600, 380, u) + 30 * Math.sin(u * 12), K.lerp(830, 380, u)]; }
function abHome(ctx, t) {
  AB_G = 'home';
  const SP = abHS(), out = AB_HOME.out, pop = (d) => abK(t, 0.3, { delay: d, out: out + d * 0.12 }), kA = abK(t, 0.3, { delay: 0.3, out: out + 0.1 });
  const sunU = K.clamp((t - 8.66) / 0.64);
  ctx.drawImage(abHomePrint(false), 0, 0, AB_WW, AB_WH); if (sunU > 0) { ctx.save(); ctx.globalAlpha = sunU; ctx.drawImage(abHomePrint(true), 0, 0, AB_WW, AB_WH); ctx.restore(); }
  const sy = flow(t, AB_SUNY); if (sy < 890) abSunStick(ctx, 520, sy, null, { rot: Math.sin(t * 0.8) * 0.05 });
  abPut(ctx, SP.town, pop(0) * (1 + 0.04 * K.spring(t, 3.4, 1, 3, 5)));
  abPut(ctx, SP.smoke, pop(0.3), { rot: idleSway(t, 160, 0.08, 2.4) });
  abPut(ctx, SP.hut, pop(0.25));
  // the door leaf (printed on the hut card) swings open, the family in the doorway
  const dOp = flow(t, [[0.4, 0], [0.9, 0.85]]), kH = pop(0.25);
  if (kH > 0.5) { ctx.save(); ctx.translate(0, 905); ctx.scale(1, kH); ctx.translate(0, -905); townDoor(ctx, 700, 770, 720, 905, dOp, { arch: 'round', leafOnly: true }); ctx.restore(); }
  SP.trees.forEach((sp, i) => abPut(ctx, sp, pop(0.45 + i * 0.15), { rot: idleSway(t, 161 + i, 0.012, 3 + i * 0.4) }));
  abPut(ctx, SP.stump, pop(0.9));
  const c2 = 12.65, split = K.clamp((t - c2) / 0.3);
  if (t < c2) abPut(ctx, SP.log, pop(0.9), { dy: t > 12.05 && t < 12.3 ? -6 * Math.sin((t - 12.05) * 12) : 0 });
  else { abPut(ctx, SP.logL, 1, { rot: -1.2 * K.ease.out(split), dx: -6 * split }); abPut(ctx, SP.logR, 1, { rot: 1.2 * K.ease.out(split), dx: 6 * split }); }
  for (const tc of [12.05, 12.65]) for (let i = 0; i < 4; i++) { const d = t - tc; if (d < 0 || d > 0.6) continue; const a = -2.4 + i * 0.5; abLive(ctx, 300 + Math.cos(a) * 140 * d, 880 + Math.sin(a) * 160 * d + 300 * d * d, 30, 24, (c) => shape(c, K.rectPts(300 + Math.cos(a) * 140 * d - 8, 868 + Math.sin(a) * 160 * d + 300 * d * d, 16, 10), SANDL, { lw: 2, seed: 170 + i }), 1, { border: 3, shadow: 0.4 }); }
  // family in the doorway
  if (t > 1.6) {
    const wf = { ...AB_WIFE, x: 735, y: 905, dir: -1, tip: idleSway(t, 171, 0.02, 3), sq: breathe(t, 7, 0.012), gaze: lookAt([735, 760], [AB_HALIXF(t), 790]), mouth: 'smile' };
    if (t > 2.4 && t < 3.1) wf.handRW = [690, 836]; if (t > 10.6 && t < 13) { wf.handR = PERSON_HANDS.wave.R; wf.handR = [64 + 10 * Math.sin(t * 9), -196]; }
    if (t > 7.6 && t < 9.4) wf.gaze = lookAt([735, 760], [520, K.lerp(800, 300, sunU)]);
    const wk = Math.min(kA, K.clamp((t - 1.6) / 0.35)); abLive(ctx, wf.x, wf.y, 170, 240, (c) => { abPerson(c, wf); if (t > 2.0 && t < 2.8) shape(c, ell(wf.handRW ? 690 : 700, 846, 16, 11, 14), SANDL, { lw: 2.5, seed: 172 }); }, wk);
    const kx = AB_HKIDXF(t), kid = { ...AB_KID, x: kx, y: 925, dir: -1, ...walk(AB_HKIDXF, t, { stride: 14 }), sq: 1 + 0.05 * Math.sin(t * 7 + 1), gaze: lookAt([kx, 830], [AB_HALIXF(t), 790]), mouth: 'smile' };
    kid.y -= Math.abs(Math.sin(t * 6)) * 5 * (t < 7.6 ? 1 : 0.3); kid.handR = [70 + 12 * Math.sin(t * 8 + 1), -170 - 15 * Math.sin(t * 8)];
    if (t > 3.1 && t < 4.6) { kid.handR = undefined; kid.drop = 3 * Math.sin(t * 16); kid.lid = 0.6; }
    if (t > 7.6 && t < 9.4) { kid.gaze = lookAt([kx, 830], [520, K.lerp(800, 300, sunU)]); kid.handR = undefined; }
    abLive(ctx, kid.x, kid.y, 120, 200, (c) => abPerson(c, kid), Math.min(kA, K.clamp((t - 1.9) / 0.35)));
  }
  if (t > 14.4) abPut(ctx, SP.sign, abK(t, 14.4, { out: out + 0.15 }));
  // the donkey
  const dd = AB_HDONXF(t), dtf = turnFlip(t, [[0, -1], [14.6, 1]], 0.6);
  const D = { x: dd, y: 955, s: 0.62, pal: 0, seed: 51, dir: dtf.dir, ...walk(AB_HDONXF, t, { stride: GAIT.donkey * 0.62 }), earL: 0.9 + idleSway(t, 52, 0.1, 1.8), earR: 0.9 + idleSway(t, 53, 0.1, 2.2), tailSwish: osc(t, 2.2) * 0.4 + swing(t, 10.6, 0.8) };
  D.earL += lagged((u) => -AB_HDONXF(u) * 0.003, t, 0.12, 1) + kick(t, AB_HDON_FALLS, 0.1, 6, 8); if (t > 10.2 && t < 10.9) { D.tip = -0.03; D.lid = 0.6; }
  if (t > 11.9 && t < 12.3) D.earR = -0.3;
  const nb = (t > 13.05 ? 1 : 0) + (t > 13.45 ? 1 : 0); D.sq = 1 - 0.05 * Math.exp(-(t - 13.05) * 9) * (t > 13.05 ? 1 : 0) - 0.05 * Math.exp(-(t - 13.45) * 9) * (t > 13.45 ? 1 : 0);
  if (t > 13.3 && t < 14.4) { D.headTurn = 0.6; D.lid = 0.45; }
  if (t > 9.3) abLive(ctx, D.x, D.y, 300, 280, (c) => { donkey(c, D); const st = mountSeat('donkey', D); for (let i = 0; i < nb; i++) abWoodBundle(c, st.x + (i ? 12 : -8) * Math.sign(D.dir), st.y + 6 - i * 26 + lagged((u) => -AB_HDONXF(u) * 0.02, t, 0.1, 1), 0.62, st.rot); }, kA);
  for (let i = 0; i < 2; i++) { const t0 = 12.9 + i * 0.4 - 0.4; if (t > t0 && t < t0 + 0.4) { const u = (t - t0) / 0.4, st = mountSeat('donkey', D); abLive(ctx, K.lerp(330, st.x, u), K.lerp(905, st.y - i * 26, u) - 90 * Math.sin(Math.PI * u), 90, 60, (c) => abWoodBundle(c, K.lerp(330, st.x, u), K.lerp(905, st.y - i * 26, u) - 90 * Math.sin(Math.PI * u), 0.62, u * 6), 1, { border: 4 }); } }
  // Ali Baba, the axe, the moth
  const A = abHomeAli(t), P = A.P;
  abLive(ctx, P.x, P.y, 230, 300, (c) => {
    const ax = A.axe; if (ax && !ax.held) abAxe(c, ax.x, ax.y, ax.a, 0.85);
    abPerson(c, P, { patches: true });
    if (ax && ax.held) { const h = P.handRW || [P.x + 34 * Math.sign(P.dir), P.y - 165]; abAxe(c, h[0], h[1] + 10, ax.a ?? -0.6 * Math.sign(P.dir), 0.85); }
  }, kA);
  if (t > 6.5 && t < 9.0) abLive(ctx, ...abMothAt(t), 60, 40, (c) => abMoth(c, ...abMothAt(t), t, 1), 1, { border: 4 });
  abPullTab(ctx, 520, 1180, K.ease.back(K.clamp((t - 8.3) / 0.5)), 1);
  return { P };
}
function abHomeOver(ctx, t, cam, S) {
  if (t > 0.5 && t < 4.6) { ctx.save(); ctx.globalAlpha = K.clamp((4.6 - t) / 0.4); S.title(ctx, 'OPEN SESAME', 500, 200 - 260 * K.ease.in(K.clamp((t - 4.2) / 0.4)), K.clamp((t - 0.5) / 1.2), { size: 64, align: 'center' }); ctx.restore(); }
  if (t > 0.9 && t < 3.2) { const A = abHomeAli(t), [hx, hy] = abToPanel(A.P.x, A.P.y - 175, cam), [x, y] = abToPanel(560, 560, cam); ctx.save(); abFade(ctx, t, 0.9, 3.2); S.label(ctx, 'ALI BABA', x, y, abB(t, 0.95, 0.6), { size: 36 }); S.arrow(ctx, [x + 10, y + 34], [hx - 14, hy - 30], abB(t, 1.15, 0.4), { bend: 0.2, width: 16 }); ctx.restore(); }
}
