// ===== spreads 2 and 3: the forest clearing (day 15.9-56.5, dusk reprint 56.5-88.9). Scenes S2-S6 of the plan. =====
// Layout: the sesame rock on the LEFT (x 0..520, base 905), the tall climbing tree at x 770 (canopy to y 255, branch y 585),
// leaf flap with the eye gap at (735, 470), the front bush at (925, 985) hiding the donkey; riders enter from the RIGHT.
const AB_F = { t0: 15.9, t1: 56.5, t2: 88.9 };
const AB_GAP = [735, 470], AB_SEAT = [735, 611], AB_FLAP = { x: 740, top: 380, w: 260, h: 200 };
const AB_TREEO = (P) => ({ x: 770, base: 905, top: 300, w: 70, pal: P, slot: [880, 620], seed: 9,
  branch: [[748, 572], [624, 560], [622, 580], [748, 596]],
  crowns: [[760, 395, 125], [650, 440, 92], [872, 438, 96], [700, 318, 88], [835, 318, 92], [765, 290, 80], [598, 378, 60], [925, 372, 62]] });
const AB_BACKTREES = [{ x: 548, base: 897, top: 600, w: 40, crowns: [[548, 590, 70], [508, 625, 48], [592, 628, 50]] }, { x: 962, base: 897, top: 560, w: 44, crowns: [[962, 548, 76], [918, 600, 50]] }];
const AB_FERNS = [[60, 992, 70, 3], [420, 996, 64, 4], [640, 994, 58, 5]];
// ---------- the board and page prints ----------
function abForestPrint(pn) {
  const P = AB_PAL[pn];
  return abBake('forest-' + pn, (c) => {
    abSkyBand(c, 0, 300, P.sky, AB_MX(P.sky, C.white, 0.35)); c.fillStyle = P.sky; c.fillRect(0, 0, AB_WW, 0);
    const g = nz(41), pts = [[0, AB_GR]]; for (let x = 0; x <= AB_WW; x += 16) pts.push([x, 262 + 40 * g.n2(x * 0.012, 1) + 22 * Math.abs(Math.sin(x * 0.035))]); pts.push([AB_WW, AB_GR]);
    shape(c, pts, P.wall, { lw: 4, seed: 42, dot: AB_MX(P.wall, C.black, 0.35), pitch: 11, rad: 0.24, da: 0.5 });
    for (let i = 0; i < 9; i++) { const tx = 30 + i * 118 + (i % 3) * 14; c.fillStyle = AB_MX(P.wall, C.black, 0.2); c.fillRect(tx - 10, 420 + (i % 2) * 40, 20, 480); }
    const rp = [[480, AB_GR]]; for (let x = 480; x <= AB_WW; x += 16) rp.push([x, 560 - 30 * Math.sin((x - 480) / 520 * Math.PI) + 10 * g.n2(x * 0.02, 5)]); rp.push([AB_WW, AB_GR]);
    shape(c, rp, P.ridge, { lw: 4, seed: 43, dot: AB_MX(P.ridge, C.black, 0.3), pitch: 10, rad: 0.2, da: 0.4 });
    abSlot(c, 560, 610, 1000, 610, 8); abSlot(c, 560, 700, 1000, 700, 8);
    if (pn === 'dusk') abSlot(c, 600, 300, 600, 890, 10);
    abPage(c, P.page); const path = []; for (let i = 0; i <= 20; i++) { const u = i / 20; path.push([K.lerp(1000, 250, u), K.lerp(962, 912, u) + Math.sin(u * 5) * 6]); }
    shape(c, [...path.map(([x, y]) => [x, y - 22]), ...path.slice().reverse().map(([x, y]) => [x, y + 26])], P.path, { lw: 0, dot: AB_MX(P.path, EARTH, 0.4), pitch: 8, rad: 0.22, da: 0.45 });
    c.globalAlpha = 1; bookFold(c, 0, AB_WW, AB_GR);
  });
}
// ---------- sprites of the set pieces (one bake per palette) ----------
const abFS = (pn) => abMem('forest-' + pn, 'set', () => {
  const P = { ...AB_PAL[pn], moss: pn === 'dusk' ? AB_MX(GREEN, FIGC, 0.4) : GREEN }, so = { sx: P.sx, sy: P.sy };
  return {
    rockL: abSprite('rockL' + pn, 130, 905, 300, 580, (c) => abRockHalfArt(c, -1, P), so),
    rockR: abSprite('rockR' + pn, 390, 905, 300, 580, (c) => abRockHalfArt(c, 1, P), so),
    rockW: abSprite('rockW' + pn, 260, 905, 540, 580, (c) => { abRockHalfArt(c, -1, P); abRockHalfArt(c, 1, P); }, so),
    rockB: abSprite('rockB' + pn, 270, 905, 190, 280, (c) => abRockBackArt(c, P), { shadow: 0 }),
    tree: abSprite('tree' + pn, 770, 905, 470, 680, (c) => abTreeArt(c, AB_TREEO(P)), so),
    back: AB_BACKTREES.map((b, i) => abSprite('bt' + i + pn, b.x, b.base, 200, b.base - b.top + 110, (c) => abTreeArt(c, { ...b, pal: P, seed: 20 + i }), so)),
    ferns: AB_FERNS.map(([x, y, h, sd], i) => abSprite('fern' + i + pn, x, y, 110, h + 10, (c) => abFernArt(c, x, y, h, P, sd), so)),
    bush: abSprite('bush' + pn, 925, 985, 200, 130, (c) => abBushArt(c, 925, 985, 190, 120, P, 7), so),
    flap: abSprite('flap' + pn, AB_FLAP.x, AB_FLAP.top + AB_FLAP.h, AB_FLAP.w + 20, AB_FLAP.h + 10, (c) => {
      abCrowns(c, [[AB_FLAP.x - 70, AB_FLAP.top + 70, 72], [AB_FLAP.x + 60, AB_FLAP.top + 66, 70], [AB_FLAP.x, AB_FLAP.top + 120, 78], [AB_FLAP.x - 85, AB_FLAP.top + 140, 52], [AB_FLAP.x + 90, AB_FLAP.top + 140, 52], [AB_FLAP.x, AB_FLAP.top + 52, 60]], P, 33);
      c.save(); c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.ellipse(AB_GAP[0], AB_GAP[1], 48, 22, 0, 0, 7); c.fill(); c.restore();
      c.save(); c.strokeStyle = C.black; c.lineWidth = 4; c.beginPath(); c.ellipse(AB_GAP[0], AB_GAP[1], 48, 22, 0, 0, 7); c.stroke(); c.restore(); }, so),
    pebble: abSprite('pebble' + pn, 500, 960, 26, 18, (c) => shape(c, ell(500, 952, 12, 8, 12), P.rock, { lw: 2.5, seed: 44 }), { border: 3 }),
    leaf: abSprite('leaf' + pn, 500, 960, 30, 22, (c) => shape(c, [[486, 952], [500, 940], [516, 950], [500, 962]], P.leaf, { lw: 2.5, seed: 45 }), { border: 3 }),
  };
});
// ---------- rock state (crack 0..1 top to bottom, open 0..1, shake) ----------
function abRockState(t) {
  const st = { crack: 0, open: 0, zip: 0, shake: 0, glow: 0, fanT: null };
  const opens = [[44.86, 46.16, 53.9, 55.0, 55.7], [58.5, 58.6, 66.2, 67.42, 68.0], [85.02, 85.5, 1e9, 1e9, 1e9]];   // crack, open, close, zip from, zip to
  for (const [c0, o0, cl0, z0, z1] of opens) {
    if (t < c0 - 1.2) continue;
    if (t >= c0 - 1.1 && t < c0 && c0 !== 58.5) st.shake = Math.max(st.shake, c0 === 44.86 ? K.clamp((t - 43.9) / 0.6) * 2.5 : 0);
    if (t >= c0) st.crack = K.clamp((t - c0) / 0.45);
    const od = c0 === 58.5 ? 0.45 : 0.75;
    if (t >= o0) { st.open = K.ease.back(K.clamp((t - o0) / od)); st.fanT = o0 + od * 0.8; st.glow = 1; }
    if (t >= cl0) { const u = K.clamp((t - cl0) / 1.0); st.open *= 1 - K.ease.inOut(u); st.glow = 1 - K.clamp(u * 1.4); }
    if (t >= z0) { st.zip = K.clamp((t - z0) / (z1 - z0)); st.crack = 1; }
    if (t >= z1) { st.crack = 0; st.zip = 0; }
  }
  if (t >= 67.42 && t < 68.2) st.shake = 2 * Math.exp(-(t - 68.0) * 8) * (t > 68.0 ? Math.sin((t - 68) * 40) : 0);
  return st;
}
// ---------- horses and riders ----------
const AB_RIDERS = [   // 0 leader; mark x and row y on the day spread; dusk marks; horse palette
  { mx: 520, my: 950, dx: 470, dy: 950, pal: 2, tin: 34.3, tarr: 38.4 },
  { mx: 640, my: 915, dx: 590, dy: 915, pal: 1, tin: 34.9, tarr: 38.5 },
  { mx: 730, my: 990, dx: 680, dy: 990, pal: 0, tin: 35.25, tarr: 38.8 },
  { mx: 815, my: 915, dx: 770, dy: 915, pal: 1, tin: 35.6, tarr: 39.0 },
  { mx: 890, my: 918, dx: 860, dy: 918, pal: 2, tin: 35.95, tarr: 39.2 },
];
const AB_HS = 0.6;
const abHorseX = (i) => (t) => { const R = AB_RIDERS[i]; return kfn(t, [[R.tin, 1180 + i * 40], [R.tarr, R.mx]], 'out'); };
const AB_HXF = AB_RIDERS.map((_, i) => abHorseX(i));
const AB_HFALLS = AB_RIDERS.map((R, i) => footfalls(AB_HXF[i], R.tin, R.tarr, GAIT.horse * AB_HS));
// thieves on foot (day): dismount, walk to the door with a sack, go in. Returns the x-path.
const AB_TDIS = [40.46, 50.3, 50.55, 50.8, 51.05];
const abThiefPath = (i) => { const R = AB_RIDERS[i], t0 = AB_TDIS[i] + 0.4, d = (R.mx - 20 - 300) / 300, keys = [[t0, R.mx - 20], [t0 + d, 300]];
  if (i === 2) keys.push([t0 + d + 0.7, 300]); const tl = keys[keys.length - 1][0]; keys.push([tl + 0.45, 250]); return keys; };
const AB_TPATH = [null, 1, 2, 3, 4].map((i) => i && abThiefPath(i));
// thieves on foot (dusk): out of the door at 59.0 + 0.3 j, walk right to their horse, hop up
const AB_TOUT = [60.9, 59.0, 59.3, 59.6, 59.9];
const abOutPath = (i) => { const R = AB_RIDERS[i], t0 = AB_TOUT[i], d = (R.dx - 30 - 290) / 330; return [[t0, 270], [t0 + 0.35, 300], [t0 + 0.35 + d, R.dx - 30]]; };
const AB_OPATH = AB_RIDERS.map((_, i) => abOutPath(i));
const AB_TMOUNT = AB_OPATH.map((p) => p[2][0]);
// the ride-off at the end of S5
const AB_GO = [68.3, 68.6, 68.9, 69.2, 69.5].map((t0, i) => t0 - (i === 0 ? 0.25 : 0));
const abGoX = (i) => (t) => { const R = AB_RIDERS[i]; return kfn(t, [[AB_GO[i], R.dx], [AB_GO[i] + 1.4, 1350]], 'in'); };
const AB_GOX = AB_RIDERS.map((_, i) => abGoX(i));
// ---------- Ali Baba in the forest (ground, climb, tree, descent) ----------
const AB_CLIMB = [[25.61, 950], [25.86, 885], [25.98, 885], [26.25, 815], [26.37, 815], [26.66, 748], [26.85, 760], [27.02, 744], [27.32, 682], [27.46, 682], [27.78, 625], [27.9, 625]];
const AB_DESC = [[74.4, 611], [74.85, 690], [75.0, 690], [75.3, 760], [75.9, 760], [76.05, 830], [76.2, 950]];
const AB_ALIX = [[15.9, 560], [20.07, 560], [20.5, 540], [25.0, 540], [25.55, 735], [77.9, 735], [79.1, 400], [79.82, 400], [80.2, 420], [81.8, 420], [82.2, 380], [85.02, 380], [85.4, 440], [87.8, 440], [88.3, 410]];
const AB_ALIXF = (t) => kfn(t, AB_ALIX, 'inOut');
const AB_ALI_FALLS = footfalls(AB_ALIXF, 77.9, 79.1, 22);
const AB_BEND = [[16.4, 0], [16.7, 0.35], [17.0, 0], [17.4, 0.38], [17.75, 0.1], [18.03, 0.3], [18.35, 0.3], [18.9, 0]];
function abAliForest(t) {
  const base = { ...AB_ALI, x: AB_ALIXF(t), y: 950, dir: 1, sq: breathe(t, 3, 0.012), tip: idleSway(t, 5, 0.025, 3.4) };
  let P = { ...base, ...walk(AB_ALIXF, t, { stride: 22 }) }, mode = 'ground', sticks = 0;
  // S2 on the ground
  if (t < 25.61) {
    const kn = flow(t, AB_BEND); P.kneel = kn; P.sq *= 1 - kn * 0.05; P.gaze = [0.2, 0.8];
    sticks = t < 21.0 ? 1 : 0;
    if (t > 16.7) P.handL = [-34, -112];
    if (t >= 18.03) { P.gaze = t < 18.35 ? [0.2, 0.6] : [1, -0.1]; P.lid = t > 18.35 && t < 18.5 ? 1 : 0; P.handR = t > 18.4 ? PERSON_HANDS.cupEar.R : undefined; P.brow = 0.3; }
    if (t >= 19.4) { P.gaze = [1, -0.2]; P.mouth = 'o'; }
    if (t >= 22.41) { const u = K.clamp((t - 22.41) / 0.25); P.eyes = 'wide'; P.brow = -0.6; P.sq = K.lerp(1, 0.9, u) + breathe(t, 3, 0.02) - 1; P.x += tremble(t, 2.2, 11) * (t < 25.0 ? 1 : 0); P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.mouth = 'o'; P.drop = 4 * u; }
    if (t >= 23.8 && t < 24.6) { P.gaze = lookAt([P.x, 790], gazePlan(t, [[23.8, [260, 600]], [24.0, [770, 400]], [24.25, [925, 920]], [24.45, [770, 420]]], 0.07)); }
    if (t >= 24.6 && t < 25.0) { P.handLW = [598, 845]; P.handRW = [606, 870]; P.tip = 0.12; P.eyes = 'wide'; P.gaze = [1, 0.3]; P.handL = P.handR = undefined; }
    if (t >= 25.0) { P.tip = 0.1 * (1 - K.clamp((t - 25.45) / 0.15)); P.sq = anticipate(t, 25.4, 0.2, 0.12); P.handL = P.handR = undefined; P.gaze = [0.2, -1]; }
    P.turbanLag = lagged((u) => (u > 22.41 ? -6 : 0), t, 0.12, 1);
    return { mode, P, sticks };
  }
  // climbing up (25.61-28.3) and down (74.2-76.2)
  const up = t < 28.3, dn = t >= 74.2 && t < 76.2;
  if (up || dn) {
    mode = 'climb'; const y = up ? flow(t, AB_CLIMB) : flow(t, AB_DESC), hitch = Math.floor((up ? t - 25.61 : t - 74.4) / (up ? 0.45 : 0.5)), sd = hitch % 2 ? 1 : -1;
    P = { ...base, x: 735, y, ph: 0, amp: 0, tip: 0, gaze: up ? [0.1, -1] : [0.3, 0.9], mouth: 'closed', brow: 0.4 };
    P.handLW = [742 - 18 + (sd < 0 ? 0 : 6), y - 186 - (sd < 0 ? 26 : 0)]; P.handRW = [748 + 14, y - 186 - (sd > 0 ? 26 : 0)];
    P.sq = 1 + 0.04 * Math.sin(t * 14);
    if (up && t > 26.85 && t < 27.05) { P.x += tremble(t, 3, 14); P.eyes = 'wide'; }   // hitch 3: a foot slips
    if (up && t >= 27.9) { const u = K.clamp((t - 27.9) / 0.4); P = { ...P, sit: u, seat: 'bench', y: K.lerp(625, AB_SEAT[1], u), handLW: [760, AB_SEAT[1] - 150], handRW: undefined }; }
    if (dn) { if (t >= 75.3 && t < 75.9) { P.eyes = 'wide'; P.gaze = lookAt([735, y - 140], gazePlan(t, [[75.3, [600, 900]], [75.45, [950, 760]], [75.6, [735, 1000]], [75.75, [600, 760]]], 0.06)); }
      if (t >= 74.2 && t < 74.4) { P.sit = 1 - (t - 74.2) / 0.2; P.seat = 'bench'; } }
    P.tilt = lagged((u) => (up ? flow(u, AB_CLIMB) : flow(u, AB_DESC)), t, 0.1, 0.004);
    return { mode, P, sticks: 0 };
  }
  // in the tree, behind the flap (28.3-74.2)
  if (t < 74.2) {
    mode = 'tree'; P = { ...base, x: AB_SEAT[0], y: AB_SEAT[1], sit: 1, seat: 'bench', ph: 0, amp: 0, tip: idleSway(t, 6, 0.012, 3), handLW: [760, AB_SEAT[1] - 150], handR: [30, -120], gaze: [0.6, 0.8] };
    P.gaze = lookAt(AB_GAP, abTreeLook(t)); P.lid = abTreeLid(t);
    if (t >= 48.5 && t < 49.4) P.eyes = 'wide';
    if (t >= 57.4 && t < 58.5) { P.lid = 0.6 + 0.4 * Math.max(0, Math.sin((t - 57.4) * 4)); P.drop = 8 * Math.max(0, Math.sin((t - 57.4) * 3.1)); P.mouth = t < 57.9 ? 'o' : 'closed'; }
    if (t >= 58.5 && t < 59.4) { P.eyes = 'wide'; P.lid = 0; }
    if (t >= 71.14) { P.y -= flow(t, [[71.14, 0], [71.5, 62], [71.7, 62], [72.0, 104], [73.9, 104], [74.2, 0]]); P.gaze = lookAt([735, 370], t < 72.6 ? [1000, 930] : [900, 900]); }
    return { mode, P, sticks: 0 };
  }
  // on the ground again (S6)
  P.y = 950; P.sq = breathe(t, 3, 0.014) * landSquash(t, 76.2, 0.05); P.tip = idleSway(t, 5, 0.02, 3.1); P.gaze = [0.6, 0.4];
  if (t < 77.1) { P.kneel = 0.3; P.gaze = t < 76.6 ? [-1, 0] : [1, 0]; P.lid = Math.abs(t - 76.6) < 0.08 ? 1 : 0; }
  else if (t < 77.9) { P.handR = PERSON_HANDS.hush.R; P.gaze = lookAt([735, 790], [925, 850]); P.brow = 0.5; }
  else if (t < 79.1) { P.tip = 0.08; P.handL = [-80, -150]; P.handR = [80, -140]; P.dir = -1; P.gaze = t > 78.55 && t < 78.95 ? [1, 0] : [-1, 0.1]; P.lid = Math.abs(t - 78.55) < 0.07 ? 1 : 0; P.y -= Math.abs(Math.sin(t * 9)) * 4; }
  else if (t < 79.82) { P.dir = -1; P.handRW = [355 + (t > 79.3 && t < 79.75 ? 6 * Math.max(0, Math.sin((t - 79.3) * 28)) : 0), 790]; P.tip = 0.05; P.gaze = [-1, 0]; P.tilt = 0.12; }
  else if (t < 81.76) { P.dir = -1; P.handR = PERSON_HANDS.chin.R; P.gaze = gazePlan(t, [[79.82, [-0.5, -0.8]], [80.1, [0.5, -0.9]], [80.4, [-0.6, -0.7]]], 0.07); P.lid = t > 80.3 && t < 80.5 ? 0.9 : 0.1;
    if (t >= 80.6) { const h = flow(t, [[80.6, 0], [81.0, 1], [81.3, 0.2], [81.6, 0]]); P.aL = [-0.4 - 1.6 * h, -0.4 - 1.9 * h]; P.aR = [0.4 + 1.6 * h, 0.4 + 1.9 * h]; P.handR = undefined; P.talk = 0.25 * Math.abs(Math.sin(t * 12)); P.gaze = [-1, -0.5]; } }
  else if (t < 82.84) { P.dir = -1; P.gaze = gazePlan(t, [[81.76, [1, 0]], [82.1, [-1, -0.3]]], 0.08); P.lid = Math.abs(t - 81.95) < 0.07 ? 1 : 0; P.sq = blend(t, 82.2, 82.7, 1, 1.04); }
  else if (t < 85.02) {
    P.dir = -1; const u = K.clamp((t - 82.84) / 0.2); P.aL = [K.lerp(-0.4, AB_ARMS_UP.aL[0], u), K.lerp(-0.3, AB_ARMS_UP.aL[1], u)]; P.aR = [K.lerp(0.4, AB_ARMS_UP.aR[0], u), K.lerp(0.3, AB_ARMS_UP.aR[1], u)];
    P.kneel = 0.18; P.sq = 0.96 + breathe(t, 4, 0.01) - 1; P.brow = -0.5; P.talk = talk(t, [[82.84, 83.6], [83.94, 84.6]]); P.gaze = [-1, -0.4];
    if (t >= 84.0) { P.lid = t < 84.6 ? 1 : 0; P.wink = t >= 84.6 ? 'R' : undefined; P.tip = -0.04; P.sq = 0.93; const d = K.clamp((t - 84.0) / 0.3); P.aL = [K.lerp(P.aL[0], -1.2, d), K.lerp(P.aL[1], -2.4, d)]; P.aR = [K.lerp(P.aR[0], 1.2, d), K.lerp(P.aR[1], 2.4, d)]; }
  }
  else {
    P.dir = -1; const [hx, lift] = hop(t, 85.05, 0.35, 380, 440, 60); P.x = t < 85.4 ? hx : P.x; P.y = 950 - lift; P.liftShadow = lift;
    P.sq = landSquash(t, 85.4, 0.15) * breathe(t, 3, 0.012); P.eyes = 'wide'; P.gaze = [-1, -0.1]; P.lid = 0; P.mouth = t > 87.6 ? 'smile' : 'o'; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R;
    P.drop = -lagged((u) => hop(u, 85.05, 0.35, 0, 0, 60)[1], t, 0.1, 0.25) + 5 * swing(t, 85.5, 1, 2.2, 4);
    if (t > 86.9) { P.sq = blend(t, 86.9, 87.4, 1, 1.06) - (t > 87.6 ? 0.03 : 0); P.handL = P.handR = undefined; P.aL = [-0.3, -0.2]; P.aR = [0.3, 0.2]; }
    if (t > 87.8) Object.assign(P, walk(AB_ALIXF, t, { stride: 22 }));
  }
  return { mode: 'ground', P, sticks: 0 };
}
// where the eyes in the gap look, and their lids
function abTreeLook(t) {
  if (t < 29.3) return [760, 900];
  if (t < 30.6) return [K.lerp(760, 790, K.clamp((t - 29.3) / 1.3)), K.lerp(600, 950, K.clamp((t - 29.3) / 1.3))];
  if (t < 33.9) return gazePlan(t, [[30.6, [760, 900]], [30.9, [880, 950]], [31.25, [1000, 960]], [31.6, [900, 950]], [32.65, [1000, 950]]], 0.07);
  if (t < 41.0) { const hx = AB_HXF[0](t); return [hx - 60, 780]; }
  if (t < 46.0) return [400, 780];
  if (t < 48.5) return [270, 760];
  if (t < 56.5) return gazePlan(t, [[48.5, [270, 760]], [51.3, [300, 900]], [55.0, [350, 800]]], 0.1);
  if (t < 62.5) return gazePlan(t, [[56.5, [400, 900]], [59.0, [300, 900]], [60.0, [700, 900]]], 0.12);
  if (t < 68.3) return [420, 780];
  if (t < 71.14) return [Math.min(1000, AB_GOX[0](t) + 200), 900];
  return [1000, 930];
}
function abTreeLid(t) {
  const b = blink(t, 13);
  if (t >= 37.3 && t < 38.0) return 1; if (t >= 38.0 && t < 38.5) return 0.55;
  if (t >= 42.0 && t < 42.55) return 1; if (t >= 53.2 && t < 54.9) return 1;
  if (t >= 55.0 && t < 55.7) return Math.max(pulse(t, 55.1, 0.18), pulse(t, 55.4, 0.18));
  if (t >= 48.5 && t < 49.7) return t > 49.3 && t < 49.6 ? Math.sin(Math.PI * (t - 49.3) / 0.3) : 0;
  if (t >= 30.73 && t < 31.7) return 0.2;
  if (t >= 32.65 && t < 33.9) return 0;
  if (t >= 70.2 && t < 71.1) return Math.max(pulse(t, 70.4, 0.18), pulse(t, 70.85, 0.18));
  return b;
}
// ---------- the donkey in the forest ----------
const AB_DONX = [[15.9, 650], [24.75, 650], [25.9, 875], [77.9, 875], [79.4, 600]];
const AB_DONXF = (t) => kfn(t, AB_DONX, 'inOut');
function abDonkeyForest(t) {
  const P = { x: AB_DONXF(t), y: 955, s: 0.62, pal: 0, dir: 1, seed: 51, ...walk(AB_DONXF, t, { stride: GAIT.donkey * 0.62 }), load: [], tailSwish: osc(t, 2.3) * 0.5, earL: 0.6 + idleSway(t, 52, 0.12, 1.9), earR: 0.6 + idleSway(t, 53, 0.12, 2.3) };
  let sink = 0;
  if (t < 17.7) { P.headDown = 1; P.chew = Math.abs(Math.sin(t * 5)); }
  else if (t < 24.6) { const u = K.clamp((t - 17.7) / 0.15), h = K.clamp((t - 17.82) / 0.3); P.earL = K.lerp(0.6, 1, u); P.earR = K.lerp(0.6, 1, u); P.headDown = 1 - h; P.eyes = t > 18.0 ? 'wide' : undefined; P.gaze = [1, 0];
    if (t > 21.0 && t < 21.7) P.x -= 20 * K.ease.inOut((t - 21.0) / 0.7); else if (t >= 21.7) P.x -= 20; }
  else if (t < 77.1) {
    P.x -= t < 24.75 ? 20 : 0; sink = blend(t, 25.3, 25.9, 0, 66); P.headDown = 0.15; P.earL = 1 + idleSway(t, 52, 0.15, 1.3); P.earR = 1 + idleSway(t, 53, 0.15, 1.1);
    // ears sink at 29.9 (right first, left 0.4 s later), one pops back, then sinks too
    const dR = flow(t, [[29.9, 0], [30.2, 1], [33.3, 1], [33.6, 0], [37.3, 0], [37.4, 1], [73.24, 1], [73.7, 0]]), dL = flow(t, [[30.3, 0], [30.45, 0.8], [30.55, 0.2], [30.7, 1], [33.4, 1], [33.8, 0], [37.3, 0], [37.4, 1], [73.5, 1], [74.0, 0]]);
    P.earR -= dR * 2; P.earL -= dL * 2; sink += Math.max(dR, dL) * 22;
    if (t >= 57.4 && t < 58.8) { P.earL -= 0.6; P.earR -= 0.6; }
  } else {
    sink = flow(t, [[77.1, 70], [77.4, 0]]); P.headDown = 0; P.earL = 1 + idleSway(t, 52, 0.1, 1.3); P.earR = flow(t, [[77.1, -0.5], [77.35, -0.5], [77.55, 1]]); P.mouth = t < 77.9 ? 'closed' : undefined; P.gaze = lookAt([P.x, 780], [AB_ALIXF(t), 790]);
    P.dir = t > 77.9 ? -1 : 1; if (t > 77.9) P.y -= Math.abs(Math.sin(t * 8)) * 3;
    if (t >= 84.0 && t < 85.02) P.tip = 0.06; if (t >= 85.02) { P.earL = P.earR = -0.8; P.eyes = 'wide'; }
  }
  P.y += sink; return { P, behindBush: t >= 25.3 && t < 77.4 };
}
// ---------- one rider on a horse (day or dusk) ----------
function abRiderP(i, t, dusk) {
  const R = AB_RIDERS[i], th = i === 0 ? AB_LEAD : abThief(i - 1), seed = 60 + i * 7;
  const H = { y: dusk ? R.dy : R.my, s: AB_HS, pal: R.pal, dir: -1, seed, earL: 0.7 + idleSway(t, seed, 0.15, 1.7), earR: 0.7 + idleSway(t, seed + 1, 0.15, 2.1), tailSwish: idleSway(t, seed + 2, 0.5, 2.4), cloth: AB_MX(C.red, '#3a1010', 0.4) };
  const Pp = { ...th, s: th.s, gaze: [-1, 0.1], lid: undefined, tip: idleSway(t, seed + 3, 0.03, 3.1), bob: 0 };
  if (!dusk) {
    Object.assign(H, walk(AB_HXF[i], t, { stride: GAIT.horse * AB_HS })); H.load = ['sack', 'sack']; H.sag = 0.15;
    const ff = AB_HFALLS[i]; H.sq = 1 - Math.abs(kick(t, ff, 0.02, 9, 10)); Pp.lurch = 0.05 * Math.sin(H.ph * 2) * H.amp;
    if (i === 0 && t > 38.2) { H.rear = pulse(t, 38.25, 0.75) * 0.4; Pp.lurch = lurch(t, 38.4, 0.22); H.earL = H.earR = 1; }
    if (t > 39.3 && t < 41.0) Pp.gaze = lookAt([H.x, 700], [260, 400 + stagger(i, 0.13) * 0]);
    if (i === 2) { Pp.gaze = gazePlan(t, [[34, [-1, 0]], [36.0, [1, 0]], [36.6, [-1, 0]], [38.0, [1, -0.2]], [38.5, [-1, 0]], [42.0, [0.5, -1]], [42.55, [-1, 0]]], 0.08); Pp.brow = -0.4; }
    if (i === 1 && t > 41.7 && t < 44.5) { Pp.tip = 0.1; Pp.mouth = 'smile'; }
    if (i === 4 && t > 37.3 && t < 38.4) { H.headTurn = blend(t, 37.3, 37.6, 0, 1); H.headDown = 0.5; H.snort = pulse(t, 37.7, 0.4); }
    if (t > 44.86 && t < 46.0) { const d = t - 44.86 - i * 0.08; if (d > 0) { H.earL = H.earR = -0.6; H.x += 10 * Math.sin(Math.PI * K.clamp(d / 0.5)); } }
    if (t > 46.16 && t < 47.0) Pp.tip = -0.06;
    if (t > 41.7 && t < 42.55 && i > 0) Pp.gaze = [1, 0];
  } else {
    H.x = R.dx; H.dir = 1; H.load = []; H.ph = 0; H.amp = 0;
    if (i === 0) { const tf = turnFlip(t, [[0, 1], [62.55, -1], [68.0, 1]], 0.6); H.dir = tf.dir; }
    if (t >= AB_GO[i]) { Object.assign(H, walk(AB_GOX[i], t, { stride: GAIT.horse * AB_HS })); H.gallop = K.clamp(H.amp * 2 - 0.6); H.dir = 1; Pp.tip = 0.12; Pp.gaze = [1, 0]; }
    if (t > 63.2 && t < 64.2 && (i === 1 || i === 3)) H.raise = pulse(t, 63.3 + i * 0.12, 0.4);
    if (t > 63.2 && t < 66.2 && i > 0) Pp.gaze = [-1, 0.1];
    if (t > 66.2 && t < AB_GO[i] && i > 0) { Pp.handL = [34, -122]; Pp.handR = [52, -110]; Pp.gaze = [1, 0.4]; }
  }
  if (i === 0) Pp.brow = 0.6;
  return { H, Pp };
}
// ---------- the forest draw (world units) ----------
function abForest(ctx, t) {
  const dusk = t >= AB_F.t1, pn = dusk ? 'dusk' : 'day', G0 = (AB_G = 'forest-' + pn), SP = abFS(pn), t0 = dusk ? AB_F.t1 : AB_F.t0, out = dusk ? AB_F.t2 - 0.75 : AB_F.t1 - 0.75;
  const pop = (d) => abK(t, t0 + 0.1, { delay: d, out: out + d * 0.15 });
  const kAct = abK(t, t0 + 0.1, { delay: 0.55, out: out + 0.12 });
  ctx.drawImage(abForestPrint(pn), 0, 0, AB_WW, AB_WH);
  const still = (t >= 32.65 && t < 33.9) || (t >= 41.9 && t < 42.6) || (t >= 53.3 && t < 53.9) || (t >= 84.0 && t < 85.0) ? 0.05 : 1;
  // board mechanisms: the sun on its stick (dusk), the rider strips on the ridge slots, the paper-doll chain
  if (dusk) { const sy = flow(t, [[56.5, 430], [57.4, 430], [58.8, 900]]); if (sy < 880) abSunStick(ctx, 600, sy, null, { col: AB_MX(C.yellow, C.red, 0.35), key: 'dusk' }); }
  if (!dusk && t > 19.3 && t < 34.0) { abSlideStrip(ctx, t, kfn(t, [[19.4, 1010], [21.7, 600]], 'out'), 610, 6, 0.14, null, 560, 1000, 1); if (t > 20.07) abSlideStrip(ctx, t, kfn(t, [[20.07, 1010], [21.6, 560]], 'out'), 700, 5, 0.19, null, 560, 1000, 4); }
  if (dusk && t > 69.0 && t < 73.4) abSlideStrip(ctx, t, kfn(t, [[69.0, 560], [72.2, 600], [73.3, 1100]], 'in'), 610, 6, 0.14, null, 560, 1000, 2);
  const chainOpen = dusk ? flow(t, [[59.0, 0], [60.2, 1], [68.3, 1], [69.8, 0]]) : flow(t, [[35.78, 0], [37.0, 1], [51.4, 1], [53.4, 0]]);
  const chainX = dusk ? flow(t, [[59.0, 1000], [68.3, 1000], [69.8, 1250]]) : flow(t, [[35.78, 1000], [51.4, 1000], [53.4, 520]]);
  if (chainOpen > 0) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.clip(); abThiefChain(ctx, t, chainX, 772, chainOpen, 12, dusk ? 9 : 5, -1); ctx.restore(); }
  // back trees
  SP.back.forEach((sp, i) => abPut(ctx, sp, pop(0.25 + i * 0.05), { rot: idleSway(t, 21 + i, 0.012, 3.3) * still }));
  // the rock: back card, gold fan, actors inside the door, halves
  const R = abRockState(t), kR = pop(0.1), sh = R.shake ? tremble(t, R.shake, 13) : 0;
  if (R.open > 0.01 || R.glow > 0) {
    abPut(ctx, SP.rockB, kR);
    if (R.fanT != null && R.glow > 0) abGoldFan(ctx, t, R.fanT, R.glow);
    ctx.save(); K.poly(ctx, abRockArch(), true); ctx.clip(); abInsideDoor(ctx, t, dusk, kAct); ctx.restore();
  }
  if (R.open > 0.004) { abPut(ctx, SP.rockL, kR, { dx: -R.open * 85 + sh, rot: -0.02 * R.open }); abPut(ctx, SP.rockR, kR, { dx: R.open * 85 - sh * 0.6, rot: 0.02 * R.open }); }
  else abPut(ctx, SP.rockW, kR, { dx: sh });
  if (R.crack > 0 && R.open < 0.05 && kR > 0.9) abCrackLine(ctx, R.crack, R.zip);
  // the sparrow on top of the rock
  abSparrow(ctx, t, dusk, kAct);
  // the tall tree, Ali Baba climbing or in it, the leaf flap
  const branchDip = K.spring(t, 28.15, 5, 2.4, 4), tr = idleSway(t, 24, 0.008, 3.7) * still + (t > 18.75 && t < 19.5 ? tremble(t, 0.004, 12) : 0);
  abPut(ctx, SP.tree, pop(0.45), { rot: tr });
  const A = abAliForest(t);
  if (A.mode === 'tree' || A.mode === 'climb') { const P = { ...A.P }; if (A.mode === 'tree') P.y += branchDip; abLive(ctx, P.x, P.y, 200, 280, (c) => abPerson(c, P), kAct); }
  const kFlap = dusk ? flow(t, [[56.6, 0], [57.1, 0.45], [58.5, 0.45], [58.7, 1.05], [58.85, 1], [74.0, 1], [74.4, 0]]) : flow(t, [[28.3, 0], [28.65, 1.08], [28.85, 1], [55.0, 1], [55.12, 1.05], [55.3, 1]]);
  if (kFlap > 0.02) abPut(ctx, SP.flap, Math.min(kFlap, pop(0.45) * 1.2), { py: AB_FLAP.top, rot: tr * 1.5 + idleSway(t, 25, 0.006, 2.1) * still });
  // falling leaves
  for (const [a, b, x0] of [[29.3, 30.6, 760], [48.5, 49.7, 700], [75.3, 76.4, 735]]) if (t > a && t < b + 1.5) { const u = K.clamp((t - a) / (b - a)); abPut(ctx, SP.leaf, 1, { dx: x0 - 500 + 30 * osc(t, 0.7) * (1 - u), dy: K.lerp(560, 948, u) - 960, rot: 0.5 * osc(t, 0.7) * (1 - u) }); }
  // ground actors sorted by depth
  const L = [];
  const D = abDonkeyForest(t);
  L.push([952, () => { if (D.behindBush) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 978); ctx.clip(); } abLive(ctx, D.P.x, D.P.y, 280, 260, (c) => donkey(c, D.P), kAct); if (D.behindBush) ctx.restore(); }]);
  L.push([985, () => abPut(ctx, SP.bush, pop(0.7), { rot: idleSway(t, 26, 0.01, 2.8) * still + (t > 25.85 && t < 26.6 ? swing(t, 25.9, 0.04, 3, 5) : 0) })]);
  AB_FERNS.forEach((f, i) => L.push([f[1], () => abPut(ctx, SP.ferns[i], pop(0.6 + i * 0.04), { rot: idleSway(t, 27 + i, 0.03, 2.2) * still })]));
  if (A.mode === 'ground') L.push([951, () => abAliGround(ctx, t, A, kAct)]);
  abRiders(ctx, t, dusk, kAct, L);
  // pebbles that hop with the hoofbeats and the rock's tremble
  for (const [px, py] of [[440, 962], [590, 975], [820, 968], [350, 935]]) L.push([py, () => { const hopY = (t > 21.0 && t < 21.7) || (t > 43.9 && t < 44.85) ? Math.abs(Math.sin(t * 22 + px)) * 7 : 0; abPut(ctx, SP.pebble, pop(0.6), { dx: px - 500, dy: py - 960 - hopY }); }]);
  L.sort((a, b) => a[0] - b[0]); for (const [, f] of L) f();
  // dust on the page edge (32.65-33.9), the dashed eye line (31.81-33.0)
  for (const [dt, dx] of [[32.8, 975], [33.15, 990], [33.5, 965]]) abDust(ctx, dx, 960, t, dt, dt * 10, 1.2);
  if (t > 31.81 && t < 33.0) abEyeLine(ctx, t);
  if (t > 18.75 && t < 19.7) { ctx.save(); ctx.globalAlpha = K.clamp((19.7 - t) / 0.3); soundArcs(ctx, 975, 720, -1, t, AB_MX(GREEN2, C.white, 0.5)); ctx.restore(); }
  return { R, A };
}
function abCrackLine(ctx, crack, zip) {
  const z = densify(abRockZig(), 8), n = z.length, a = zip > 0 ? Math.floor(n * (1 - zip)) : 0, b = zip > 0 ? n : Math.ceil(n * crack);
  const q = z.slice(0, b).slice(0, zip > 0 ? Math.max(1, n - Math.floor(n * zip)) : b); if (q.length < 2) return;
  ctx.save(); ctx.strokeStyle = AB_MX(NAVY2, C.black, 0.4); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; K.poly(ctx, q); ctx.stroke(); ctx.restore();
}
function abEyeLine(ctx, t) {
  const u = K.clamp((t - 31.81) / 0.5), f = t > 32.7 ? 1 - K.clamp((t - 32.7) / 0.3) : 1, a = [AB_GAP[0] + 30, AB_GAP[1] + 20], b = [900, 945], pts = K.trim(densify([a, b], 4), u * f);
  for (let i = 0; i + 6 < pts.length; i += 14) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 6]; seg(ctx, x0, y0, x1, y1, 7, C.yellow, 2.5); }
}
function abSparrow(ctx, t, dusk, k) {
  let P = { kind: 'sparrow', x: 250, y: 352, s: 0.5, dir: 1, seed: 71, gaze: [1, 0.3] }, show = true;
  if (!dusk) { if (t > 20.07) P.gaze = [1, 0]; if (t > 39.4) { const u = K.clamp((t - 39.4) / 1.2); P = { ...P, fly: true, flap: Math.sin(t * 30), x: K.lerp(250, -80, u), y: K.lerp(352, 120, u) - 40 * Math.sin(Math.PI * u), dir: -1 }; show = u < 1; } }
  else { if (t < 68.08) show = false; else { const u = K.clamp((t - 68.08) / 0.5); P = { ...P, x: K.lerp(-60, 250, K.ease.out(u)), y: K.lerp(200, 352, K.ease.out(u)) - 30 * Math.sin(Math.PI * u), fly: u < 1, flap: Math.sin(t * 30), sq: landSquash(t, 68.58, 0.2) };
    if (t > 68.7 && t < 69.0) P.headRot = 0.6 * Math.sin((t - 68.7) * 20); if (t > 78.9 && t < 81) P.gaze = [1, 1]; } }
  if (!show) return;
  P.y += idleSway(t, 72, 1.5, 1.1);
  abLive(ctx, P.x, P.y, 90, 80, (c) => bird(c, P), k, { border: 5 });
}
function abAliGround(ctx, t, A, k) {
  const P = A.P;
  if (P.liftShadow > 0) groundShadow(ctx, P.x, 952, 90, P.liftShadow, { flat: true });
  abLive(ctx, P.x, P.y, 200, 270, (c) => {
    abPerson(c, P, { patches: true });
    if (A.sticks) { c.save(); abBodyT(c, P); c.translate(P.x - 30 * (P.s || 0.8), P.y - 96 * 0.8); c.rotate(-0.3); for (let i = 0; i < 3; i++) seg(c, -34, -i * 7, 34, -i * 7 - 4, 7, WOOD, 2.5); c.restore(); }
  }, k);
  if (t >= 21.0 && t < 22.6) for (let i = 0; i < 3; i++) { const t0 = 21.0 + i * 0.12, y = fallY(t, t0, t0 + 0.35, 870 - i * 6, 948) - rebound(t, t0 + 0.35, 8, 0.2); abLive(ctx, 530 + i * 18, y, 80, 30, (c) => seg(c, 500 + i * 18, y, 560 + i * 18, y - 4 + i * 3, 7, WOOD, 2.5), k, { border: 4, shadow: 0.5 }); }
  if (t >= 22.6 && t < 33.9) abLive(ctx, 545, 950, 90, 40, (c) => { for (let i = 0; i < 3; i++) seg(c, 500 + i * 18, 948 - i * 3, 560 + i * 18, 944 - i * 3 + i * 3, 7, WOOD, 2.5); }, k, { border: 4, shadow: 0.5 });
}
// thieves (and the leader) drawn inside the door arch: they shrink and fade into the dark
function abInsideDoor(ctx, t, dusk, k) {
  for (let i = 0; i < 5; i++) {
    const F = abFoot(i, t, dusk); if (!F || !F.inside) continue;
    abLive(ctx, F.P.x, F.P.y, 170, 240, (c) => { c.globalAlpha = F.alpha; abThiefDraw(c, F); }, k);
  }
}
// a thief on foot: {P, inside, alpha, sack}
function abFoot(i, t, dusk) {
  const R = AB_RIDERS[i], th = i === 0 ? AB_LEAD : abThief(i - 1), seed = 80 + i * 5;
  let xf, P;
  if (!dusk) {
    if (i === 0) {
      if (t < 40.46 || t > 54.6) return null;
      xf = (u) => kfn(u, [[40.86, 450], [41.6, 365], [49.8, 365], [50.4, 410], [53.65, 410], [54.25, 300], [54.55, 255]], 'inOut');
    } else { if (t < AB_TDIS[i] || t > AB_TPATH[i][AB_TPATH[i].length - 1][0]) return null; const K2 = AB_TPATH[i]; xf = (u) => kfn(u, K2, 'lin'); }
  } else {
    if (t < AB_TOUT[i] || t >= AB_TMOUNT[i] + 0.3) return null; const K2 = AB_OPATH[i]; xf = (u) => kfn(u, K2, 'lin');
  }
  const x = xf(t), w = walk(xf, t, { stride: 20 }); P = { ...th, x, y: K.lerp(R.my, 912, K.clamp((450 - x) / 170)), ...w, dir: speed(xf, t) > 1 ? 1 : -1, tip: idleSway(t, seed, 0.025, 2.9), sq: breathe(t, seed, 0.012), gaze: [-1, 0] };
  if (!dusk) {
    // dismount hop from the saddle (leader 40.46, thieves 50.3...)
    const td = AB_TDIS[i]; if (t < td + 0.4) { const seat = mountSeat('horse', { x: R.mx, y: R.my, s: AB_HS, dir: -1 }), u = K.clamp((t - td) / 0.4); P.x = K.lerp(seat.x, R.mx - 20 - (i === 0 ? 30 : 0), u); P.y = K.lerp(seat.y + 50 * th.s, R.my, u) - 60 * Math.sin(Math.PI * u); P.lift = R.my - P.y; P.amp = 0; P.dir = -1; P.sq = u < 0.5 ? 1.06 : 1; P.legs = undefined; }
    else P.sq *= landSquash(t, td + 0.4, i === 0 ? 0.15 : 0.12);
    if (i === 0) {
      P.dir = -1; P.gaze = [-1, -0.2];
      if (t > 41.74 && t < 42.5) { const tf = turnFlip(t, [[0, -1], [41.74, 1], [42.2, -1]], 0.35); P.dir = tf.dir; P.lid = Math.abs(t - 41.9) < 0.07 ? 1 : 0; P.gaze = [1, 0]; }
      if (t >= 42.5 && t < 47.8) { const a = K.clamp((t - 42.76) / 0.18), d = K.clamp((t - 46.9) / 0.9); const up = a * (1 - d);
        P.aL = [K.lerp(-0.3, AB_ARMS_UP.aL[0], up), K.lerp(-0.2, AB_ARMS_UP.aL[1], up)]; P.aR = [K.lerp(0.3, AB_ARMS_UP.aR[0], up), K.lerp(0.2, AB_ARMS_UP.aR[1], up)];
        P.sq = anticipate(t, 42.5, 0.26, 0.08) * (t > 42.76 ? blend(t, 42.76, 42.95, 1.06, 1.02) : 1); P.talk = talk(t, [[42.76, 43.4], [43.8, 44.6]]); P.gaze = [-1, -0.3]; if (t > 46.9) P.mouth = 'smile'; }
      if (t >= 49.8 && t < 50.4) { P.handR = PERSON_HANDS.wave.R; P.dir = 1; P.gaze = [1, 0]; }
      if (t >= 50.4 && t < 53.65) { P.dir = 1; P.gaze = [1, 0.1]; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; }
      if (t >= 53.2 && t < 53.65) { P.gaze = lookAt([430, 770], AB_GAP); P.lid = Math.abs(t - 53.25) < 0.06 ? 1 : 0; }
      if (t >= 53.65) P.dir = -1;
    } else {
      P.sack = t > td + 0.3; P.tip += 0.1; P.dir = -1;
      if (i === 2) { const K2 = AB_TPATH[2], ts = K2[1][0], te = K2[2][0]; if (t > ts && t < te) { P.tip = -0.12; P.sackStretch = 1 + 0.25 * K.clamp((t - ts) / (te - ts)); P.eyes = 'wide'; P.amp = 0.2; } }
    }
    const inside = x < 330; return { P, inside, alpha: inside ? 1 - K.clamp((330 - x) / 75) : 1, sack: P.sack, shrink: inside ? 1 - 0.15 * K.clamp((330 - x) / 75) : 1, lift: P.lift || 0 };
  }
  // dusk: out of the door with flat sacks, light steps, hop to the saddle
  P.flatSack = i > 0; P.tip = -0.02; const tm = AB_TMOUNT[i];
  if (t >= tm) { const seat = mountSeat('horse', { x: R.dx, y: R.dy, s: AB_HS, dir: 1 }), u = K.clamp((t - tm) / 0.3); P.x = K.lerp(R.dx - 30, seat.x, u); P.y = K.lerp(R.dy, seat.y + 50 * th.s, u) - 50 * Math.sin(Math.PI * u); P.lift = R.dy - P.y; P.amp = 0; P.sq = anticipate(t, tm, 0.1, 0.1); }
  if (i === 1 && t > 59.6 && t < 60.0) { P.handL = [20, -120]; P.handR = [30, -118]; }
  const inside = x < 330 && t < AB_TOUT[i] + 0.4; return { P, inside, alpha: inside ? K.clamp((x - 255) / 75) : 1, shrink: inside ? 0.85 + 0.15 * K.clamp((x - 255) / 75) : 1, lift: P.lift || 0 };
}
function abThiefDraw(c, F) {
  const P = F.P; if (F.shrink !== 1) { c.translate(P.x, P.y); c.scale(F.shrink, F.shrink); c.translate(-P.x, -P.y); }
  person(c, P);
  if (P.sack) { c.save(); abBodyT(c, P); const sd = Math.sign(P.dir || 1), s = P.s; c.translate(P.x + 30 * s * -sd, P.y - 150 * s); c.scale(P.sackStretch || 1, 1); packLoad(c, ['sack'], 0, 0, 0.7 * s * 1.3); c.restore(); }
  if (P.flatSack) { c.save(); abBodyT(c, P); const s = P.s, sd = Math.sign(P.dir || 1); c.translate(P.x - 36 * s * sd, P.y - 110 * s); c.rotate(0.3 * sd); shape(c, [[-18, -24], [16, -26], [20, 24], [-16, 26]], CREAM, { lw: 3, seed: 111, dot: SAND, pitch: 6, rad: 0.2, da: 0.4 }); c.restore(); }
}
// all riders: mounted on their horses, or on foot next to an empty horse
function abRiders(ctx, t, dusk, k, L) {
  if (!dusk && t < 34.2) return;
  for (let i = 0; i < 5; i++) {
    const R = AB_RIDERS[i], tin = R.tin; if (!dusk && t < tin) continue;
    const { H, Pp } = abRiderP(i, t, dusk), y = H.y;
    if (dusk && H.x > 1250) continue;
    const mounted = !dusk ? t < AB_TDIS[i] : t >= AB_TMOUNT[i] + 0.3;
    const F = abFoot(i, t, dusk);
    if (i === 0 && !dusk && t >= 42.76 && t < 45.5) Pp.gaze = [-1, -0.3];
    if (!mounted) {
      // empty horse: load after the sack is taken; the horse springs up as the weight leaves
      if (!dusk) { if (t > AB_TDIS[i] + 0.3) H.load = i === 0 ? ['sack', 'sack'] : ['sack']; H.sq = 1 + 0.03 * K.spring(t, AB_TDIS[i] + 0.1, 1, 3, 5); if (t > 55.0 && i === 3) H.headDown = blend(t, 55.0, 55.5, 0, 1); if (t > 55.0 && t < 55.7 && i !== 3) H.headTurn = pulse(t, 55.0 + i * 0.1, 0.6) * 0.8; }
      L.push([y, () => abLive(ctx, H.x, y, 320, 300, (c) => horse(c, H), k)]);
      if (F && !F.inside) L.push([F.P.y + 1, () => { if (F.lift > 0) groundShadow(ctx, F.P.x, R.my + (dusk ? R.dy - R.my : 0), 70, F.lift, { flat: true }); abLive(ctx, F.P.x, F.P.y, 170, 250, (c) => abThiefDraw(c, F), k); }]);
    } else {
      if (dusk && i === 0) { if (t >= 62.55 && t < 68.3) { const up = flow(t, [[62.55, 0], [63.1, 1], [64.06, 1], [64.94, 1], [65.25, 0]]); Pp.aR = [K.lerp(0.4, 2.7, up), K.lerp(0.3, 2.9, up) + lagged((u) => flow(u, [[62.55, 0], [63.1, 1], [64.06, 1], [64.94, 1], [65.25, 0]]), t, 0.1, 0.6)]; Pp.handR = undefined; Pp.talk = talk(t, [[64.06, 64.7], [64.94, 65.5]]); Pp.gaze = [-1, -0.3]; H.snort = pulse(t, 65.0, 0.4); } if (t >= AB_TMOUNT[0] + 0.3 && t < 62.55) Pp.lurch = swing(t, AB_TMOUNT[0] + 0.3, 0.12, 1.6, 3); }
      if (dusk && t < AB_TMOUNT[i] + 0.7) H.sq = 1 - 0.04 * Math.exp(-(t - AB_TMOUNT[i] - 0.3) * 6);
      L.push([y, () => abLive(ctx, H.x, y, 340, 420, (c) => rideOn(c, 'horse', H, Pp), k)]);
      if (!dusk && H.amp > 0.2) for (const f of AB_HFALLS[i]) abDustLater(L, ctx, t, f, y);
      if (dusk && t > AB_GO[i]) for (let q = 0; q < 4; q++) { const tq = AB_GO[i] + 0.2 + q * 0.25; L.push([y + 2, () => abDust(ctx, AB_GOX[i](tq) - 60, y - 2, t, tq, i * 10 + q, 1.1)]); }
    }
  }
}
function abDustLater(L, ctx, t, f, y) { if (t > f.t && t < f.t + 0.6) L.push([y + 2, () => abDust(ctx, f.x + 40, y - 2, t, f.t, Math.round(f.t * 10), 0.7)]); }
// ---------- forest lettering (panel units) ----------
function abForestOver(ctx, t, cam, S) {
  const A = abAliForest(t), aliHead = [A.P.x, A.P.y - 160];
  if (t > 23.9 && t < 25.5) { const [x, y] = abToPanel(560, 640, cam), to = abToPanel(aliHead[0] - 10, aliHead[1] - 40, cam); ctx.save(); abFade(ctx, t, 23.9, 25.5); S.label(ctx, 'THIEVES?', x, Math.max(120, y), abB(t, 23.95, 0.7), { balloon: true, to, size: 44 }); ctx.restore(); }
  if (t > 35.0 && t < 39.3) { const v = Math.round(1 + 39 * Math.pow(K.clamp((t - 35.02) / 1.5), 0.6)); ctx.save(); abFade(ctx, t, 35.0, 39.3); S.counter(ctx, v, 500, 250, abB(t, 35.0, 0.4) * (v === 40 ? 1 + 0.08 * Math.exp(-(t - 36.52) * 8) : 1), { size: 100 }); ctx.restore(); }
  if (t > 42.6 && t < 44.95) { const to = abToPanel(365, 765, cam), [x, y] = abToPanel(440, 560, cam); abBubble(ctx, S, 'OPEN SESAME!', 5, x, y, to, t, 42.76, 43.8, 44.95, { size: 44 }); }
  if (t > 44.86 && t < 46.1) { const [x, y] = abToPanel(190, 480, cam); ctx.save(); abFade(ctx, t, 44.86, 46.1); S.emphasis(ctx, x, y, 140, abB(t, 44.86, 0.45), { word: 'CRACK!' }); ctx.restore(); }
  if (t > 47.88 && t < 49.6) { const [x, y] = abToPanel(120, 600, cam), to = abToPanel(225, 700, cam); ctx.save(); abFade(ctx, t, 47.88, 49.6); S.label(ctx, 'SECRET DOOR', x, y, abB(t, 47.9, 0.6), { size: 34 }); S.arrow(ctx, [x + 40, y + 40], to, abB(t, 48.1, 0.4), { bend: -0.2, width: 18 }); ctx.restore(); }
  if (t > 63.9 && t < 66.0) { const to = abToPanel(470, 690, cam), [x, y] = abToPanel(560, 470, cam); abBubble(ctx, S, 'CLOSE SESAME!', 6, x, y, to, t, 64.06, 64.94, 66.0, { size: 44 }); }
  if (t > 82.7 && t < 85.0) { const to = abToPanel(385, 780, cam), [x, y] = abToPanel(500, 600, cam); abBubble(ctx, S, 'OPEN SESAME!', 5, x, y, to, t, 82.84, 83.94, 85.0, { size: 34, tilt: 0.03 }); }
}
