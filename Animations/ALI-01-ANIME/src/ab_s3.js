// ===== ALI-01-ANIME shots S12-S17 (89.48 - 142.94 s): the cave, one small sack, home, the whisper, Cassim, the cart, THE END =====

// ---------- the cave (S12, S13) ----------
const AB_SACKS = [[420, 0.72], [470, 0.58]], AB_SMALL = [628, 904];
const AB_SMALL_O = { col: '#efe2c4', shade: '#b8a684', tie: AB_ACC, coin: true };   // the one small sack: pale canvas, vermilion tie (his accent)
function abCaveUnder(ctx, t, cam) { ctx.save(); K.camera(ctx, 1000, 1230, cam); ctx.translate((cam.x - 800) * 0.4, 0); ctx.drawImage(abCavePlate(), 0, 0); ctx.restore(); }
function abCaveWorld(ctx, t, cam, o = {}) {
  ctx.drawImage(abCaveCels(), 0, 0, 1600, 1230);
  for (const [x, s] of AB_SACKS) abSack(ctx, x, 904, s, 1, { coin: true });
  abChest(ctx, 770, 906, 1.0, 0.85); abGlow(ctx, 770, 800, 260, 0.6 + 0.1 * Math.sin(t * 3), '#ffc84a');
  abCaveLive(ctx, t);
  abGlow(ctx, 600, 760, 520, 0.35, '#ffb84a'); abGlow(ctx, 940, 780, 300, 0.25, '#cfe0ff');
}
const AB_CAVE_FIN = { rim: '#8f7cff', light: [-1, 0], rimW: 4, shadeLight: [1, -0.3] };
// ---------- S12 89.48-95.4: he walks along the treasure; the camera follows at acting size ----------
const AB_S12_X = (t) => kfn(t, [[89.48, 180], [90.2, 330], [91.0, 330], [93.4, 800], [94.4, 860]]);
function abS12World(ctx, t, cam) {
  const tc = AB_T2(t); abCaveWorld(ctx, t, cam);
  abSack(ctx, ...AB_SMALL, 0.5, 1, AB_SMALL_O);
  const P = { x: AB_S12_X(tc), y: 902, dir: 1, ...walk(AB_S12_X, tc, { stride: 22 }), lid: abLid(t, 19, [90.8, 92.5]), gaze: gazePlan(tc, [[89.48, [1, 0]], [90.8, [1, 0.3]], [91.6, [1, 0.1]], [92.6, [1, -0.3]], [93.5, [-0.4, 0.3]], [94.0, [1, 0.2]]]), mouth: 'o', brow: -0.6, sq: breathe(tc, 5, 0.02), tip: idleSway(tc, 26, 0.02, 2.3) };
  if (tc > 94.55) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; }
  abAli(ctx, { ...P, fin: AB_CAVE_FIN }, 'cave');
  if (t > 90.82 && t < 91.6) abBands(ctx, [420, 640, 360, 270], t, { cols: ['#fff3b0'], alpha: 0.3, w: 70, speed: 500 });
  if (t > 93.84 && t < 94.6) { const u = (t - 93.84) / 0.76, x = K.lerp(1000, 900, u), y = K.lerp(700, 1100, u * u), r = K.lerp(16, 60, u), sp = Math.abs(Math.cos(t * 26));
    abBlob(ctx, x, y, r * Math.max(0.15, sp), r, '#ffcf3a', '#c07a12', { lw: 2.5, hi: '#fff3b0' }); }
}
AB_SHOTS.push({ a: 89.48, b: 95.4, ww: 1600, cam: (t) => ({ x: AB_S12_X(t) + 210, y: 684, zoom: 1.6 }), under: abCaveUnder, world: abS12World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    for (const [w, tt, x, y] of [['GOLD', 90.82, 600, 560], ['SILVER', 91.56, 890, 600], ['CLOTH', 92.56, 1080, 520]]) if (t > tt) { const [px, py] = abP(x, y, cam); S.label(ctx, w, px, py, K.clamp((t - tt) / 0.4), { size: 44 }); } } });

// ---------- S13 95.4-101.3: the emotional centre in three held drawings, no cut to a wide ----------
// a hand seen from the side, fingers down; curl 0..1 folds the fingers in. (x, y) = the knuckles, k scale, sd -1 | 1 (thumb side)
function abHandCel(ctx, x, y, k, curl = 0, sd = 1, F = AB_FACE.ali) {
  const celShade = abCS;   // lit-majority cel: the hands are the puppet's skin
  ctx.save(); ctx.translate(x, y); ctx.scale(k * sd, k);
  celShade(ctx, [[-60, -300], [60, -300], [64, -40], [-64, -40]], '#8f8a40', '#64612a', { light: [-1, -0.3], off: 22, lw: 4, line: '#3e3a14' });   // sleeve
  celShade(ctx, [[-56, -50], [56, -50], [66, 20], [50, 70], [-50, 70], [-66, 20]], F.skin, F.shade, { light: [-1, -0.4], off: 18, lw: 4, line: F.line });   // back of the hand
  for (let i = 0; i < 4; i++) { const fx = -42 + i * 28, len = (i === 0 || i === 3 ? 70 : 88) * (1 - 0.62 * curl), bend = curl * 0.9;
    const pts = [[fx - 13, 60], [fx + 13, 60], [fx + 12 - bend * 20, 60 + len], [fx - bend * 30, 60 + len + 12], [fx - 12 - bend * 24, 60 + len]];
    celShade(ctx, pts, F.skin, F.shade, { light: [-1, -0.4], off: 8, lw: 3.5, line: F.line }); }
  celShade(ctx, [[60, 0], [96, 30], [104, 70], [80, 76], [56, 40]], F.skin, F.shade, { light: [-1, -0.4], off: 8, lw: 3.5, line: F.line });   // thumb
  ctx.restore();
}
// 1) 95.4-97.3 a real bust: mouth drops open on "دهش", eyes scan right to left with one blink, gold bands sweep the held cel,
//    the hands rise into the bottom of frame from "الكنوز" (96.36)
function abS13Bust(ctx, t, S) {
  ctx.save(); ctx.filter = 'blur(6px)'; ctx.drawImage(abCavePlate(), 300, 300, 900, 1100, -60, -60, 1120, 1360); ctx.restore();
  abGlow(ctx, 760, 900, 700, 0.55, '#ffb84a'); abGlow(ctx, 200, 500, 500, 0.3, '#9a7aff');
  const tc = AB_T3(t), F = AB_FACE.ali, sway = idleSway(AB_T2(t), 61, 6, 2.2), rise = beatIn(AB_T2(t), 96.36, 96.9);
  abCel(ctx, [500, 1300, 1100, 1300], (c) => {
    celShade(c, [[60, 1300], [110, 1010], [280, 900], [500, 880], [720, 900], [890, 1010], [940, 1300]], '#8f8a40', '#64612a', { light: [1, -0.3], off: 70, lw: 5, line: '#3e3a14' });   // shoulders
    c.save(); c.strokeStyle = AB_ACC; c.lineWidth = 34; c.beginPath(); c.moveTo(250, 1240); c.quadraticCurveTo(500, 1290, 750, 1240); c.stroke(); c.restore();
    abFace(c, 500 + sway, 520, 0.86, { who: 'ali', wide: 1, iris: 1.12, gaze: [flow(tc, [[95.4, 0.8], [95.9, 0.6], [96.6, -0.7], [97.3, -0.8]]), 0.15], lid: abBlinkAt(tc, 96.05), brow: -0.8, mouth: 'o', m: 'cave', light: [1, -0.4],
      reflect: (cc, r) => { cc.fillStyle = '#ffcf5a'; cc.globalAlpha = 0.8; cc.beginPath(); cc.ellipse(r * 0.2, r * 0.35, r * 0.5, r * 0.22, 0, 0, 7); cc.fill(); cc.globalAlpha = 1; } });
    if (rise > 0) for (const sd of [-1, 1]) abHandCel(c, 500 + sd * 230 + tremble(t + sd, 2, 13), K.lerp(1500, 1110, rise), 1.1, 0.15, sd); }, { k: 0, rim: '#8f7cff', light: [-1, -0.2], rimW: 5 });
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a', '#ffb84a'], alpha: 0.2, w: 170, speed: 260 });
}
// 2) 97.3-98.8 insert on the hands over the open chest: they come down, stop 30 px above the coins (two drawings of tremble),
//    curl, and withdraw to the left on "أخذ" (98.28)
function abS13Hands(ctx, t, S) {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#2a1418'], [0.5, '#5a2a1e'], [1, '#2a1410']]);
  abGlow(ctx, 500, 980, 760, 0.85, '#ffb84a');
  celShade(ctx, [[-20, 1240], [-20, 700], [1020, 700], [1020, 1240]], '#a8522c', '#64281a', { light: [-1, -1], off: 30, lw: 5, line: '#3a160c' });   // chest wall
  abCoinPile(ctx, 500, 1000, 1100, 330, { seed: 21 }); abGlints(ctx, [80, 700, 840, 300], t, 8, 33, 40);
  for (const bx of [140, 860]) shape(ctx, K.rectPts(bx - 22, 980, 44, 260), '#ffcf3a', { lw: 4, line: '#8a5a12' });
  const tc = AB_T2(t), down = beatIn(tc, 97.3, 97.62), curl = beatIn(tc, 97.9, 98.12), back = beatIn(tc, 98.28, 98.7), trem = tc > 97.62 && tc < 97.9 ? (Math.floor(tc * 12) % 2 ? 7 : -7) : 0;
  for (const sd of [-1, 1]) { const x = 500 + sd * 190 - 420 * back + trem * sd, y = K.lerp(260, 560, down) - 360 * back;   // the fingertips stop at y ~ 700, the coins top at ~ 670-730
    abHandCel(ctx, x, y, 1.15, curl, sd); }
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a'], alpha: 0.14, w: 200, speed: 300, n: 2 });
}
// 3) 98.8-101.3 medium: he lifts the one small sack (pale canvas, vermilion tie), holds it at his chest with both hands, a small nod
//    and the patient smile; the big chest keeps its weight on the right
function abS13Medium(ctx, t, cam) {
  const tc = AB_T2(t); abCaveWorld(ctx, t, cam);
  const lift = beatIn(tc, 98.95, 99.4), P = { x: 580, y: 902, dir: 1, lid: abLid(t, 19, [99.5]), gaze: [0.6, 0.6], mouth: 'closed', brow: -0.2, sq: breathe(tc, 6) * (tc < 99.0 ? anticipate(tc, 98.8, 0.2, 0.08) : 1), tip: 0.1 * (1 - lift) + idleSway(tc, 23, 0.02, 2.6) };
  const chest = [P.x + 34, 902 - 118];
  if (tc < 98.95) { P.handLW = [AB_SMALL[0] - 22, 862]; P.handRW = [AB_SMALL[0] + 22, 858]; P.gaze = [1, 1]; }
  else { P.handLW = [K.lerp(AB_SMALL[0] - 22, chest[0] - 22, lift), K.lerp(862, chest[1] + 8, lift)]; P.handRW = [K.lerp(AB_SMALL[0] + 22, chest[0] + 22, lift), K.lerp(858, chest[1] + 4, lift)]; }
  if (tc > 99.5) { P.gaze = gazePlan(tc, [[99.5, [0.5, 0.7]], [99.9, [0.9, 0.1]], [100.4, [0.3, 0.6]]]); P.mouth = 'smile'; }
  if (tc > 100.42) { P.drop = 8 * pulse(tc, 100.5, 0.5); P.lid = Math.max(P.lid, 0.35 * pulse(tc, 100.5, 0.6)); }
  const sx = tc < 98.95 ? AB_SMALL[0] : K.lerp(AB_SMALL[0], chest[0], lift), sy = tc < 98.95 ? AB_SMALL[1] : K.lerp(AB_SMALL[1], chest[1] + 44, lift);
  abAli(ctx, { ...P, fin: AB_CAVE_FIN }, 'cave');
  abSack(ctx, sx, sy, 0.5, 1, AB_SMALL_O);
  if (tc > 100.42 && tc < 100.85) abGlint(ctx, sx + 10, sy - 70, 30, (tc - 100.42) / 0.43);
}
AB_SHOTS.push({ a: 95.4, b: 97.3, panel: abS13Bust });
AB_SHOTS.push({ a: 97.3, b: 98.8, panel: abS13Hands });
AB_SHOTS.push({ a: 98.8, b: 101.3, ww: 1600, cam: (t) => ({ x: 690 - 10 * K.clamp((t - 98.8) / 2.5), y: 750, zoom: 2.3 }), under: abCaveUnder, world: abS13Medium,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam); if (t > 98.8) { const [x, y] = abP(600, 640, cam); S.label(ctx, 'ONE SMALL SACK', x, y - 150, K.clamp((t - 98.8) / 0.4), { size: 46 }); } } });
// outside at dusk (the same colour model as 78-89): he mimes the sweep, the rock shuts cleanly, he pats it like a horse and runs
const AB_S13_RUN = (t) => kfn(t, [[102.35, 1690], [102.72, 1380]], 'in');
function abS13Out(ctx, t, cam) {
  const tc = AB_T2(t), open = 1 - K.ease.inOut(K.clamp((t - 101.45) / 0.65)), m = 'dusk';
  abRock(ctx, 1820, 900, { model: m, open, crack: K.clamp(open * 4), glow: open, t });
  const P = { x: tc < 102.35 ? 1690 : AB_S13_RUN(tc), y: 900, dir: tc < 102.35 ? 1 : -1, ...(tc >= 102.35 ? walk(AB_S13_RUN, tc, { stride: 30 }) : {}), lid: abLid(t, 19, [102.35]), gaze: [1, -0.2], mouth: 'closed', handL: [20, -128], tip: idleSway(tc, 27, 0.02, 2) };
  if (tc < 101.9) { const a = beatIn(tc, 101.35, 101.8); P.handR = [K.lerp(100, -40, a), K.lerp(-220, -150, a)]; P.talk = abTalk(t, 101.35, 101.9, 6, 0.5); if (P.talk) P.mouth = 'open'; }
  else if (tc < 102.35) { const pat = Math.max(pulse(tc, 102.0, 0.13), pulse(tc, 102.17, 0.13)); P.handRW = [1745 - 14 * pat, 720]; P.mouth = 'smile'; }
  else { P.tip = 0.15; P.gaze = [-1, 0]; }
  abAli(ctx, { ...P, fin: open > 0.05 ? { rim: '#ffd76a', light: [1, -0.2], rimW: 4, rimAlpha: open } : undefined }, open > 0.3 ? 'gold' : m);
  const h = abHand(P, 0); abSack(ctx, h[0], h[1] + 40, 0.42, 1, AB_SMALL_O);
}
AB_SHOTS.push({ a: 101.3, b: 102.72, ww: 2400, cam: () => ({ x: 1745, y: 718, zoom: 1.9 }), under: abGladeWide('dusk'), world: abS13Out });
// 102.72-105.57: on the donkey at a hard trot toward home; ears streaming; the sky steps from dusk to night; clean speed lines
const AB_RIDE = (t) => 5000 - 330 * (t - 102.72);
function abS13Ride(ctx, t, cam) {
  const tc = AB_T2(t), fast = beatIn(tc, 103.64, 103.8), D = { y: 902, s: 0.8, dir: -1, pal: 0, ...walk(AB_RIDE, tc, { stride: GAIT.donkey * 0.8 }), earL: K.lerp(0.3, -0.9, fast), earR: K.lerp(0.2, -0.8, fast) + lagged((u) => -0.5 * beatIn(u, 103.64, 103.8), tc, 0.12, 0.6), tailUp: 0.4 + 0.5 * fast, eyes: 'wide', gallop: 0.4 * fast };
  const back = tc > 103.1 && tc < 103.55, pal = abPal(AB_ALI0, 'dusk'); pal.sash = AB_ACC; pal.band = AB_ACC;
  abCel(ctx, [D.x, D.y, 420, 520], (cc) => {
    rideOn(cc, (c, P) => donkey(c, P), D, { costume: 'villager', s: 0.76, pal, age: 0.25, gaze: back ? [1, -0.1] : [-1, 0], lid: back ? abBlinkAt(AB_T3(t), 103.1) : abLid(t, 19), tip: 0.1, mouth: 'grit', handL: [30, -130], lurch: 0.1 * Math.sin((D.ph || 0) * 2) }, { name: 'donkey' });
    const st = mountSeat('donkey', D); abSack(cc, st.x - 26, st.y - 96, 0.4, 1, AB_SMALL_O); }, { m: 'dusk', ...AB_FIN.dusk, shadeD: 16, rim: null });
}
function abS13RideUnder(ctx, t, cam) {
  abForest(ctx, cam, t, 'dusk', { shafts: false });
  const st = t < 104.45 ? 0 : t < 104.85 ? 0.33 : t < 105.25 ? 0.66 : 1;
  if (st > 0) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = K.rgba('#3a3a8a', 0.5 * st); ctx.fillRect(0, 0, 1000, 760); ctx.restore();
    const R = K.rng(77); ctx.save(); ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 40 * st; i++) { ctx.globalAlpha = 0.4 + R() * 0.6; ctx.fillRect(R() * 1000, R() * 420, 3, 3); } ctx.restore(); }
}
AB_SHOTS.push({ a: 102.72, b: 105.57, ww: 1e5, cam: (t) => ({ x: AB_RIDE(t) - 50, y: 670, zoom: 1.5 }), under: abS13RideUnder, world: abS13Ride,
  over: (ctx, t, cam) => { if (t > 103.64) abSpeed(ctx, [0, 300, 1000, 900], t, { dir: 1, n: 20, alpha: 0.35 }); abForestFront(ctx, cam, 'dusk', { ph: -81, dir: 1 }); } });

// ---------- the room at night (S14-S16): a painted plate (warm pool of lamplight falling off to blue, a window with the deep-blue
// night and one star, a shelf and a hanging pot as dark shapes), the door and the lamp as cels, the flame on the emissive pass ----------
const AB_LAMP = [505, 862], AB_COINS = [505, 898], AB_WIN = { x0: 690, y0: 400, x1: 830, y1: 540 }, AB_RDOOR = { x0: 70, x1: 205, top: 590 };
// v4 (owner notes 2, 3): a warm, lighter room with real things in it: lime-washed ochre walls in lamplight falling off to a soft
// blue, ceiling beams, a striped rug, a mattress with cushions, shelves of coloured jars, a wall niche with a jug, a hanging pot, a
// storage chest, a broom, a basket; the window with the night and one star
function abRoomPlate() {
  return abBakeAt('nightroom4', 1000, 1230, (c, w) => {
    abGrad(c, 0, 0, w, 1230, [[0, '#5a4a7a'], [0.35, '#b8806a'], [0.74, '#d8a074'], [1, '#6a4a5a']]);
    abGlaze(c, AB_LAMP[0], AB_LAMP[1] - 140, 640, '#ffd2a0', 0.75); abGlaze(c, AB_LAMP[0], AB_LAMP[1] - 60, 320, '#ffe0b0', 0.6);
    abGlaze(c, 0, 300, 420, '#5a5a9a', 0.35); abGlaze(c, 1000, 300, 380, '#5a5a9a', 0.3);
    // ceiling beams with round ends
    for (const y of [150, 210]) { celShade(c, K.rectPts(-10, y, 1020, 24), '#8a5a3a', '#5a3424', { light: [1, -0.5], off: 6, lw: 2.5 }); }
    for (let x = 60; x < 1000; x += 160) shape(c, ell(x, 238, 14, 14, 14), '#a8703e', { lw: 2.5 });
    // floor
    abGrad(c, 0, 905, w, 325, [[0, '#a86e52'], [0.4, '#7a4a44'], [1, '#3a2634']]); abGlaze(c, AB_LAMP[0], 930, 440, '#ffc890', 0.5);
    // striped rug under the lamp
    c.save(); c.beginPath(); c.ellipse(500, 935, 360, 34, 0, 0, 7); c.clip(); ['#c8364a', '#e8a83a', '#2f7a9a', '#e8d2a0', '#c8364a', '#7a4a9a'].forEach((col, i) => { c.fillStyle = col; c.fillRect(140 + i * 120, 890, 120, 90); }); c.restore();
    c.strokeStyle = '#5a2a2a'; c.lineWidth = 3; c.beginPath(); c.ellipse(500, 935, 360, 34, 0, 0, 7); c.stroke();
    // the window: deep-blue night, one star (frame drawn live)
    const W = AB_WIN; abGrad(c, W.x0, W.y0, W.x1 - W.x0, W.y1 - W.y0, [[0, '#14205a'], [1, '#2e48a0']]); c.fillStyle = '#fff6ea'; c.beginPath(); c.arc(W.x0 + 32, W.y0 + 34, 3, 0, 7); c.fill(); abGlaze(c, W.x0 + 32, W.y0 + 34, 16, '#ffffff', 0.5);
    abGlaze(c, W.x0 + 100, W.y0 + 40, 26, '#fff6d8', 0.9); shape(c, ell(W.x0 + 100, W.y0 + 40, 14, 14, 20), '#fff6d8', { lw: 0 });   // the moon
    // shelf with coloured jars, a wall niche with a jug
    celShade(c, K.rectPts(230, 556, 220, 14), '#8a5a3a', '#5a3424', { light: [1, -0.5], off: 4, lw: 2.5 });
    for (const [x, h, r, col] of [[258, 46, 18, '#3f7ad0'], [304, 64, 22, '#e8742a'], [350, 40, 16, '#2f9a8e'], [398, 54, 20, '#c8364a'], [436, 30, 12, '#ffd36a']])
      celShade(c, [[x - r * 0.6, 556], [x - r, 556 - h * 0.5], [x - r * 0.5, 556 - h], [x + r * 0.5, 556 - h], [x + r, 556 - h * 0.5], [x + r * 0.6, 556]], col, abDark(col, 0.3), { light: [1, -0.5], off: 6, hi: abLight(col, 0.4), lw: 2.5 });
    K.poly(c, townArchPts(540, 640, 470, 580, 'round'), true); c.fillStyle = '#7a4a4a'; c.fill(); c.strokeStyle = '#4a2a2a'; c.lineWidth = 3; c.stroke();
    celShade(c, [[575, 580], [566, 550], [578, 520], [602, 520], [614, 550], [605, 580]], '#d8743a', '#9a4a2a', { light: [1, -0.5], off: 6, lw: 2.5 });
    // hanging pot on a cord
    seg(c, 890, 234, 890, 360, 3, '#5a3a2a', 0); celShade(c, ell(890, 396, 46, 34, 24), '#a8603a', '#6a3420', { light: [1, -0.5], off: 10, hi: '#e8a070', lw: 3 }); celShade(c, K.rectPts(858, 360, 64, 10), '#8a4a2a', '#5a2a1a', { light: [1, -0.5], off: 3, lw: 2.5 });
    // mattress with cushions (left, behind the door swing), a chest, a basket, a broom
    celShade(c, K.rectPts(230, 860, 170, 44), '#3f7ad0', '#284a8a', { light: [1, -0.5], off: 10, lw: 3 }); for (let x = 240; x < 400; x += 22) seg(c, x, 864, x, 900, 3, '#ffd36a', 0);
    for (const [x, col] of [[250, '#e8364f'], [380, '#ffd36a']]) celShade(c, ell(x, 846, 26, 18, 18), col, abDark(col, 0.3), { light: [1, -0.5], off: 6, lw: 2.5 });
    celShade(c, K.rectPts(820, 820, 120, 84), '#8a4a2a', '#5a2a1a', { light: [1, -0.5], off: 12, lw: 3 }); for (const bx of [840, 920]) seg(c, bx, 820, bx, 904, 8, '#e0b038', 1.5);
    celShade(c, [[700, 904], [690, 864], [750, 864], [740, 904]], '#d9a441', '#9a6a2a', { light: [1, -0.5], off: 6, lw: 2.5 }); for (const [x, col] of [[708, '#e8364f'], [726, '#ff8a3a'], [740, '#e8364f']]) shape(c, ell(x, 860, 10, 10, 12), col, { lw: 2 });
    seg(c, 960, 904, 940, 700, 6, '#a8743e', 1.5); celShade(c, [[930, 904], [950, 840], [972, 840], [990, 904]], '#e8c27a', '#b08a4a', { light: [1, -0.5], off: 5, lw: 2.5 });
  });
}
// the door (0 shut .. 1 open: the night outside shows), the window frame, the lamp (live flame); layer 'back' | 'front'
function abHutBack(ctx, t, o = {}) {
  ctx.drawImage(abRoomPlate(), 0, 0); const D = AB_RDOOR, op = K.clamp(o.door || 0), W = AB_WIN;
  abGrad(ctx, D.x0, D.top, D.x1 - D.x0, 905 - D.top, [[0, '#18286a'], [1, '#3a50a0']]);
  const lw = (D.x1 - D.x0) * (1 - 0.88 * op); celShade(ctx, K.rectPts(D.x0, D.top, lw, 905 - D.top), '#8a5a3a', '#5a3424', { light: [1, -0.3], off: 14, lw: 3.5, line: '#3a1e14' });
  ink(ctx, [[D.x0 - 8, 905], [D.x0 - 8, D.top - 8], [D.x1 + 8, D.top - 8], [D.x1 + 8, 905]], 5, 2, '#24141c');
  if (o.inside) o.inside(ctx);
  ink(ctx, K.rectPts(W.x0, W.y0, W.x1 - W.x0, W.y1 - W.y0), 6, 3, '#24141c'); seg(ctx, W.x0 - 14, W.y1 + 6, W.x1 + 14, W.y1 + 6, 10, '#5a3a3a', 2.5);
  // the lamp: a clay lamp on the mat, the flame flickering on twos, a small halation (light, not a filter over the cels)
  const [lx, ly] = AB_LAMP, fl = 1 + 0.08 * Math.sin(AB_T2(t) * 23) + 0.05 * Math.sin(AB_T2(t) * 37);
  celShade(ctx, [[lx - 34, ly + 30], [lx - 40, ly + 14], [lx - 10, ly + 4], [lx + 40, ly + 6], [lx + 46, ly + 16], [lx + 30, ly + 30]], '#a8603a', '#6a3420', { light: [-1, -1], off: 8, lw: 3, line: '#3a1a10' });
  ctx.save(); ctx.translate(lx + 38, ly + 2); ctx.scale(1, fl); ctx.fillStyle = '#fff3c0'; ctx.beginPath(); ctx.moveTo(0, -36); ctx.quadraticCurveTo(13, -10, 0, 2); ctx.quadraticCurveTo(-13, -10, 0, -36); ctx.fill(); ctx.fillStyle = '#ffb040'; ctx.beginPath(); ctx.ellipse(0, -6, 5, 8, 0, 0, 7); ctx.fill(); ctx.restore();
  abGlow(ctx, lx + 38, ly - 14, 150 * fl, 0.55, '#ffc070');
}
function abHutFront(ctx, t, o = {}) { celShade(ctx, [[968, -20], [1020, -20], [1020, 1250], [976, 1250]], '#6a4434', '#4a2c24', { light: [-1, 0], off: 10, lw: 3 }); }   // a dark post at the right edge (depth)
// coins on the mat (gold light), then the cloth over them with one coin left uncovered at the edge
function abCoins(ctx, t, o = {}) {
  const pour = K.clamp((t - 106.2) / 0.35); if (pour <= 0) return;
  abCoinPile(ctx, AB_COINS[0], AB_COINS[1], 130 * pour, 46 * pour, { seed: 31 });
  const cover = K.clamp((t - 112.0) / 0.3); if (cover > 0) { const w = 160 * cover; celShade(ctx, [[AB_COINS[0] - 85, 902], [AB_COINS[0] - 85, 870], [AB_COINS[0] - 85 + w * 0.5, 846], [AB_COINS[0] - 85 + w, 862], [AB_COINS[0] - 85 + w, 902]], '#8a3a5a', '#5a2040', { light: [-1, -1], off: 10, lw: 3.5 }); }
  if (cover >= 1) { abBlob(ctx, AB_COINS[0] + 92, 896, 10, 6, '#ffcf3a', '#c07a12', { lw: 2 }); if (t > 112.5 && t < 112.9) abGlint(ctx, AB_COINS[0] + 92, 892, 22, (t - 112.5) / 0.4); }
  abGlow(ctx, AB_COINS[0], 880, 170, (cover < 1 ? 0.5 : 0.1) * pour * (o.k ?? 1), '#ffc24a');
}
const abGoldK = (t) => K.clamp((t - 106.2) / 0.35) * (1 - 0.85 * K.clamp((t - 112.0) / 0.3));
// a person in the room: warm lamp rim on the lamp side, cool blue-violet hard shade on the other (gold from below while the coins show)
function abLit(ctx, P, w, draw, t) { const g = abGoldK(t), sd = P.x < AB_LAMP[0] + 38 ? 1 : -1;
  draw({ rim: g > 0.3 ? '#ffcf5a' : '#ffb060', light: g > 0.3 ? [sd * 0.6, 0.8] : [sd, 0.25], shadeLight: [sd, -0.2], rimW: 4, rimAlpha: g > 0.3 ? g : 0.85 }); }

// ---------- S14 105.57-113.26: the whisper with his wife; SHHH!; the cloth; a turban in the window ----------
const AB_S14_AX = (t) => kfn(t, [[105.57, 150], [106.05, 390]], 'out');
function abS14Ali(ctx, t, o = {}) {
  const tc = AB_T2(t), P = { x: AB_S14_AX(tc), y: 900, dir: 1, ...walk(AB_S14_AX, tc, { stride: 26 }), kneel: beatIn(tc, 106.05, 106.35), lid: abLid(t, 19, [110.9]), gaze: [1, -0.1], mouth: 'smile', sq: breathe(tc, 7, tc < 107 ? 0.04 : 0.012), tip: idleSway(tc, 24, 0.02, 2.3) };
  if (tc < 105.9) P.gaze = [-1, 0];
  if (tc < 106.55) { P.handRW = [K.lerp(P.x + 60, 480, beatIn(tc, 106.1, 106.3)), 830]; }
  else if (tc < 107.83) { P.handR = [40, -110]; }
  else if (tc < 108.95) { const a = Math.abs(osc(tc, 0.5)); P.handL = [40 - 40 * a, -160]; P.handR = [60 + 40 * a, -160]; P.talk = abTalk(t, 107.83, 108.95, 7); }
  else if (tc < 110.37) { P.handRW = [560, 805]; P.handLW = [550, 812]; P.tip = 0.08; P.gaze = [1, -0.2]; P.brow = -0.4; P.talk = abTalk(t, 108.95, 110.3, 8, 0.4); }
  else { P.handR = PERSON_HANDS.hush.R; P.mouth = 'closed'; P.gaze = tc > 110.8 && tc < 111.05 ? [1, -0.8] : [1, 0]; }
  if (P.talk) P.mouth = 'open';
  if (o.P) Object.assign(P, o.P);
  abLit(ctx, P, 300, (fin) => abAli(ctx, { ...P, fin }, 'lamp'), t);
  if (tc < 106.5) { const h = abHand(P, 1); abSack(ctx, h[0], h[1] + 30, 0.42, 1, { rot: tc > 106.1 ? 1.6 : 0 }); }
  return P;
}
function abS14Wife(ctx, t, o = {}) {
  const tc = AB_T2(t), P = { x: 640, y: 900, dir: -1, sit: 1, seat: 'floor', lid: abLid(t, 31), gaze: [-1, 0], mouth: 'smile', tip: idleSway(tc, 33, 0.02, 2.9), sq: breathe(tc, 8) };
  if (tc > 106.55 && tc < 108.95) { P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.mouth = 'o'; P.lid = 0; P.gaze = tc > 108.37 ? gazePlan(tc, [[108.37, [-0.3, -1]], [108.7, [-1, -0.2]]]) : [-1, 0.4]; }
  if (tc >= 108.95 && tc < 111.67) { P.handLW = [545, 808]; P.handRW = [560, 815]; P.gaze = [-1, -0.2]; }
  if (tc >= 111.67) { P.drop = 7 * Math.max(pulse(tc, 111.75, 0.25), pulse(tc, 112.05, 0.25)); P.handR = tc < 112.0 ? PERSON_HANDS.hush.R : undefined; P.mouth = 'closed'; if (tc >= 112.0 && tc < 112.4) P.handRW = [K.lerp(560, 440, beatIn(tc, 112.0, 112.3)), 880]; }
  if (o.P) Object.assign(P, o.P);
  abLit(ctx, P, 300, (fin) => abWife(ctx, { ...P, fin }, 'lamp'), t); return P;
}
function abWindowCassim(ctx, t, rise, F = {}) {
  const W = AB_WIN; ctx.save(); ctx.beginPath(); ctx.rect(W.x0 + 3, W.y0 + 3, W.x1 - W.x0 - 6, W.y1 - W.y0 - 6); ctx.clip();
  const cx = (W.x0 + W.x1) / 2, cy = W.y0 + 88 + 120 * (1 - rise), k = 0.2;
  abCel(ctx, [cx, cy + 90, 160, 220], (c) => abFace(c, cx, cy, k, { who: 'cassim', m: 'lamp', mouth: 'set', t, light: [-0.8, 0.6], ...F }), { k: 0, rim: '#ffb060', light: [-0.8, 0.6], rimW: 4 });
  ctx.restore();
}
function abS14World(ctx, t, cam) {
  const tc = AB_T2(t), door = tc < 106.05 ? Math.min(1, (tc - 105.57) / 0.12) * (1 - beatIn(tc, 105.9, 106.05)) : 0;
  abHutBack(ctx, t, { door });
  if (t > 112.5) abWindowCassim(ctx, t, beatIn(tc, 112.5, 113.2), { gaze: [-0.6, 0.4] });
  abCoins(ctx, t); abS14Wife(ctx, t); abS14Ali(ctx, t);
  abHutFront(ctx, t, { door });
  // the picture balloon: the rock splitting with a gold seam
  if (t > 108.37 && t < 109.6) { const p = K.clamp((t - 108.37) / 0.2) * (1 - K.clamp((t - 109.4) / 0.2)); ctx.save(); ctx.globalAlpha = p;
    ctx.fillStyle = 'rgba(14,10,24,0.9)'; ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(470, 560); ctx.lineTo(430, 640); ctx.lineTo(500, 560); ctx.fill();
    ctx.beginPath(); ctx.roundRect(390, 400, 230, 170, 30); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.roundRect(390, 400, 230, 170, 30); ctx.clip();
    const u = AB_T2(t) - 108.37; abRock(ctx, 505, 560, { s: 0.22, model: 'afternoon', crack: K.clamp(u / 0.3), open: K.clamp((u - 0.35) / 0.5), glow: K.clamp(u / 0.4), t }); ctx.restore(); }
}
AB_SHOTS.push({ a: 105.57, b: 113.26, ww: 1000, cam: (t) => K.camAt([[105.57, { x: 500, y: 680, zoom: 1.1 }], [106.3, { x: 500, y: 690, zoom: 1.25 }], [110.97, { x: 505, y: 690, zoom: 1.4 }], [111.6, { x: 510, y: 720, zoom: 1.8 }]], t), world: abS14World,
  over: (ctx, t, cam, S) => { if (t > 110.97 && t < 112.4) { const [x, y] = abP(390, 650, cam); S.label(ctx, 'SHHH!', x - 120, y - 80, K.clamp((t - 110.97) / 0.3), { size: 46 }); } } });

// ---------- S15 113.26-123.81: Cassim at the window; the coin; coin eyes; in through the door; three questions; the secret ----------
function abS15Room(ctx, t, cam, o) {
  const tc = AB_T2(t), door = tc < 116.9 ? 0 : tc < 117.4 ? 1 : 1 - beatIn(tc, 117.4, 117.7) * 0.6;
  abHutBack(ctx, t, { door }); abCoins(ctx, t);
  const jump = impactSquash(tc, 117.0, 0.88);
  // the wife: jumps, pulls the cloth tighter, then hides her face and looks away during the questions
  const WP = { sq: jump, gaze: tc > 117.0 ? [-1, -0.1] : [-1, 0] }; if (tc > 118.47) { WP.dir = 1; WP.handL = PERSON_HANDS.mouthCover.L; WP.handR = PERSON_HANDS.mouthCover.R; WP.gaze = [1, 0.3]; WP.x = 690; }
  const wx = WP.x ?? 640, half = 500 / cam.zoom; if (wx - 70 > cam.x - half && wx + 70 < cam.x + half) abS14Wife(ctx, t, { P: WP });   // whole in frame, or not at all (jump cuts)
  // Cassim: in the doorway, then around Ali Baba in jump cuts, closer each time
  const C = { y: 900, lid: abLid(t, 51), mouth: 'closed', brow: 0.4, sq: breathe(tc, 9), tip: idleSway(tc, 52, 0.02, 2.7) };
  if (tc < 117.75) { const cx = (u) => kfn(u, [[116.9, 150], [117.6, 240]], 'out'); Object.assign(C, { x: cx(tc), dir: 1, ...walk(cx, tc, { stride: 26 }), gaze: [1, 0.4], mouth: 'smile' }); }
  else if (tc < 118.47) Object.assign(C, { x: 240, dir: 1, handR: PERSON_HANDS.pointDown.R, gaze: [1, 0.6], talk: abTalk(t, 117.8, 118.4, 9) });
  else if (tc < 119.05) Object.assign(C, { x: 560, dir: -1, handR: PERSON_HANDS.pointDown.R, gaze: [-1, 0.5], talk: abTalk(t, 118.5, 119.0, 10) });
  else if (tc < 120.35) Object.assign(C, { x: 500, dir: -1, tip: 0.2, handR: [70, -150], gaze: [-1, 0.6], talk: abTalk(t, 119.1, 119.6, 11) });
  else if (tc < 121.37) Object.assign(C, { x: 545, dir: -1, tip: 0.18, handR: PERSON_HANDS.cupEar.R, gaze: [0.2, 0.3], lid: 0, eyes: 'wide' });
  else if (tc < 122.65) Object.assign(C, { x: 520, dir: -1, mouth: 'smile', lid: 0.4 * beatIn(tc, 121.4, 122.0), gaze: [-0.3, -0.5], handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R });
  else Object.assign(C, { x: 540, dir: -1, mouth: 'smile', lid: 0.4, gaze: [0.5, -1], handL: [24 + 8 * osc(tc, 0.25), -140], handR: [30 - 8 * osc(tc, 0.25), -134] });
  if (C.talk) C.mouth = 'open';
  // Ali Baba, kneeling: turns to the intruder, shakes his head, leans back, looks for help, gives in, regrets
  const AP = { x: 390, kneel: 1, sq: jump * breathe(tc, 7), dir: tc < 116.95 ? 1 : C.x < 390 ? -1 : 1 };
  AP.gaze = [AP.dir, 0.3]; AP.mouth = 'closed'; AP.handR = [30, -110];
  if (tc > 117.75 && tc < 118.47) { AP.tip = 0.05 * Math.sin((tc - 117.75) * 20); AP.gaze = [AP.dir * 0.4, 1]; }
  if (tc > 119.05 && tc < 119.61) { AP.tip = -0.15; AP.brow = -0.6; AP.mouth = 'frown'; }
  if (tc >= 119.61 && tc < 120.35) { AP.gaze = gazePlan(tc, [[119.61, [1, 0]], [119.85, [-1, -0.2]], [120.1, [0.2, 1]]]); AP.sq *= 0.96; AP.lid = abBlinkAt(AB_T3(t), 120.05) || 0; AP.drop = 6; }
  if (tc >= 120.35 && tc < 121.37) { AP.handR = PERSON_HANDS.cupMouth.R; AP.talk = abTalk(t, 120.4, 121.3, 12, 0.3); AP.tip = 0.06; }
  if (tc >= 122.65) { AP.handR = PERSON_HANDS.reach.R; AP.wet = true; AP.brow = -0.6; AP.mouth = 'frown'; }
  if (AP.talk) AP.mouth = 'open';
  if (C.x < AP.x) { abLit(ctx, C, 320, (fin) => abCassim(ctx, { ...C, fin }, 'lamp'), t); abS14Ali(ctx, t, { P: AP }); }
  else { abS14Ali(ctx, t, { P: AP }); abLit(ctx, C, 320, (fin) => abCassim(ctx, { ...C, fin }, 'lamp'), t); }
  if (tc > 119.05 && tc < 119.61) { const sx = AP.x + 20, sy = 660 + (tc - 119.05) * 60; celShade(ctx, [[sx, sy - 16], [sx + 7, sy], [sx, sy + 6], [sx - 7, sy]], '#cfeaff', '#7fb0e0', { off: 3, lw: 2 }); }
  abHutFront(ctx, t, { door });
  // picture balloon over Cassim: the rock with its gold seam
  if (tc > 121.37 && tc < 122.7) { const p = K.clamp((t - 121.37) / 0.2), bx = C.x - 10, by = 380; ctx.save(); ctx.globalAlpha = p * (1 - K.clamp((t - 122.5) / 0.2));
    ctx.fillStyle = 'rgba(14,10,24,0.9)'; ctx.strokeStyle = '#ffd36a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(bx - 110, by - 80, 220, 160, 30); ctx.fill(); ctx.stroke(); ctx.clip();
    abRock(ctx, bx, by + 70, { s: 0.2, model: 'afternoon', crack: 1, glow: 0.6, t }); ctx.restore(); }
  return C;
}
function abS15Cam(t) { if (t < 117.75) return { x: 500, y: 660, zoom: 1.2 }; if (t < 118.47) return { x: 420, y: 700, zoom: 1.6 }; if (t < 119.05) return { x: 480, y: 690, zoom: 1.5 }; if (t < 119.61) return { x: 450, y: 650, zoom: 1.9 }; if (t < 120.35) return { x: 480, y: 690, zoom: 1.5 }; return { x: 470, y: 680, zoom: 1.35 }; }
const AB_Q = [118.47, 119.05, 119.3];
AB_SHOTS.push({ a: 113.26, b: 115.35, ww: 1000, cam: () => ({ x: 740, y: 480, zoom: 2.2 }),
  world: (ctx, t) => { const tc = AB_T2(t); abHutBack(ctx, t); abWindowCassim(ctx, t, 1, { gaze: gazePlan(tc, [[113.26, [-1, 0.3]], [113.7, [-0.3, 0.4]], [114.1, [0.4, 0.5]], [114.5, [-0.6, 0.8]]]), brow: -0.5, lid: abLid(t, 51) }); abHutFront(ctx, t); },
  over: (ctx, t, cam, S) => { if (t > 114.55) S.label(ctx, 'CASSIM', 500, 1010, K.clamp((t - 114.55) / 0.4), { size: 46 }); } });
// insert: the one uncovered coin, a highlight sliding across it, soft lamp bokeh behind
AB_SHOTS.push({ a: 115.35, b: 116.25, panel: (ctx, t) => {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#1a1430'], [0.6, '#3a2430'], [1, '#5a3a2a']]); ctx.drawImage(K.cached('ab:bokeh', () => { const c = K.layer(1000, 900), x = c.getContext('2d'), R = K.rng(17); x.filter = 'blur(10px)'; for (let i = 0; i < 14; i++) { x.globalAlpha = 0.25 + R() * 0.3; x.fillStyle = i % 3 ? '#ffb84a' : '#ff7ad9'; x.beginPath(); x.arc(R() * 1000, R() * 800, 40 + R() * 70, 0, 7); x.fill(); } return c; }), Math.sin(t) * 6, 0);
  celShade(ctx, [[0, 900], [1000, 820], [1000, 1230], [0, 1230]], '#8a3a5a', '#5a2040', { light: [-1, -1], off: 30, lw: 4 });
  ctx.save(); ctx.translate(560, 820); ctx.scale(1, 0.55); abBlob(ctx, 0, 0, 230, 230, '#ffcf3a', '#c07a12', { lw: 5, hi: '#fff3b0', off: 40 }); ctx.strokeStyle = '#8a5212'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 160, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 228, 0, 7); ctx.clip(); ctx.rotate(-0.5); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(-300 + (t - 115.35) * 700, -400, 60, 800); ctx.restore();
  abGlow(ctx, 560, 820, 420, 0.5, '#ffc84a'); abGlint(ctx, 470, 740, 70, ((t - 115.35) * 1.4) % 1); } });
AB_SHOTS.push({ a: 116.25, b: 116.9, ww: 1000, cam: () => ({ x: 740, y: 480, zoom: 2.2 }),
  world: (ctx, t) => { const tc = AB_T3(t); abHutBack(ctx, t); abWindowCassim(ctx, t, 1, { coin: tc < 116.33 ? 0 : tc < 116.42 ? 1.2 : 1, gaze: [-0.2, 0.5], brow: -0.8, mouth: 'o' }); abHutFront(ctx, t); } });
AB_SHOTS.push({ a: 116.9, b: 123.81, ww: 1000, cam: abS15Cam, world: abS15Room,
  over: (ctx, t, cam, S) => { const tc = AB_T2(t); AB_Q.forEach((q, i) => { if (t < q || t > 122.6) return; const burst = 121.4 + i * 0.2, k = t > burst ? 1 - K.clamp((t - burst) / 0.12) : 1; if (k <= 0) return;
    const cx = t < 119.05 ? 560 : 500, [x, y] = abP(cx - 20 + i * 50, 560 - i * 70, cam); ctx.save(); ctx.globalAlpha = k; S.label(ctx, '?', x, y, K.clamp((t - q) / 0.25), { size: 50, balloon: true, to: abP(cx, 640, cam) }); ctx.restore(); }); } });

// ---------- S16 123.81-131.81: Cassim's coin eyes; the gold thought; the map snatched; the words slide past his ear ----------
AB_SHOTS.push({ a: 123.81, b: 125.47, panel: (ctx, t) => {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#2a1a20'], [1, '#6a4a1a']]);
  const slow = t > 124.6 && t < 125.2 ? Math.sin(Math.PI * (t - 124.6) / 0.6) : 0;
  abFace(ctx, 500, 640, 3.1, { who: 'cassim', coin: 1, gaze: [0, 0], lid: slow * 0.9, brow: -0.2, mouth: 'none', m: 'gold', t });
  const R = K.rng(23); for (let i = 0; i < 16; i++) { const sd = i % 2 ? 1 : -1, x = 500 + sd * 92 * 3.1 + (R() - 0.5) * 140, y = 560 + (((t * 160 + R() * 300) % 260)); abBlob(ctx, x, y, 10, 5, '#ffe27a', '#c07a12', { lw: 1.5, off: 2 }); }
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a', '#ffb84a'], alpha: 0.18, w: 190, speed: 320 }); } });
AB_SHOTS.push({ a: 125.47, b: 126.99, panel: (ctx, t, S) => {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#141032'], [1, '#3a2440']]);
  abFace(ctx, 500, 1130, 1.3, { who: 'cassim', coin: 1, gaze: [0, -0.6], mouth: 'grin', grin: 0.8, brow: -0.3, m: 'night', t });
  const p = K.clamp((t - 125.47) / 0.4), steps = [125.6, 125.9, 126.2, 126.5].filter((s) => t >= s).length, h = [0, 90, 150, 210, 270][steps];
  thoughtCloud(ctx, 500, 420, 800, 560, t, { p, tail: [520, 820], scale: 0.5, at: [500, 760], bg: '#2a1a4a', inside: (c) => {
    abGlow(c, 500, 800, 500, 0.6, '#ffc84a'); if (h > 0) abCoinPile(c, 500, 960, 520, h, { seed: 8 }); abCassim(c, { x: 500, y: 960 - h + 10, sit: 1, seat: 'floor', mouth: 'smile', handL: PERSON_HANDS.armsOut.L, handR: PERSON_HANDS.armsOut.R, gaze: [0, -1] }, 'gold');
    abGlints(c, [250, 960 - h, 500, h], t, 6, 3, 30); } });
  if (t > 126.35) S.emphasis(ctx, 500, 380, 200, K.clamp((t - 126.35) / 0.6), { word: 'GOLD!', wx: 0, wy: 0.1, seed: 12 }); } });
const AB_CARD = (t) => { if (t < 129.51) return [495, 500, 0.64, 0]; if (t < 129.7) { const u = beatIn(t, 129.51, 129.68); return [K.lerp(495, 400, u), K.lerp(500, 720, u), 0.64 - 0.2 * u, -0.3 * u]; } const u = beatIn(t, 130.2, 130.5); return [K.lerp(400, 372, u), K.lerp(720, 790, u), 0.44 * (1 - u), -0.3]; };
function abS16World(ctx, t, cam) {
  const tc = AB_T2(t); abHutBack(ctx, t); abCoins(ctx, t, { k: 0.6 });
  abWife(ctx, { x: 860, y: 900, dir: 1, sit: 1, seat: 'floor', lid: abLid(t, 31), gaze: [1, 0.4], tip: idleSway(tc, 34, 0.02, 3) }, 'lamp');
  const A = { x: 640, y: 900, dir: -1, lid: abLid(t, 19, [128.6, 129.0]), gaze: [-1, -0.1], mouth: 'closed', brow: -0.5, sq: breathe(tc, 7), tip: idleSway(tc, 25, 0.02, 2.4), handL: [20, -120] };
  const C = { x: 360, y: 900, dir: 1, lid: abLid(t, 51), gaze: [1, 0], mouth: 'smile', brow: 0.3, sq: breathe(tc, 9), tip: -0.04 + idleSway(tc, 53, 0.02, 2.6) };
  if (tc < 128.27) { C.handRW = [600, 772]; C.handL = PERSON_HANDS.palmsUp.L; C.talk = abTalk(t, 127.0, 128.0, 13); A.gaze = [-0.6, 0.7]; }
  else if (tc < 129.51) { const q = beatIn(tc, 128.27, 129.4); A.handRW = [K.lerp(430, 590, q), 470 + 50 * Math.sin(q * 6)]; A.gaze = Math.floor(q * 4) % 2 ? [-1, -0.2] : [-0.6, -0.5]; C.gaze = [1, -0.6]; C.handR = [60, -150]; }
  else if (tc < 130.77) { C.handR = tc < 130.2 ? [80, -170] : [10, -105]; C.gaze = tc < 130.2 ? [1, -0.4] : [-1, 0]; A.mouth = 'o'; A.handR = [60, -170]; }
  else { A.handR = PERSON_HANDS.pointUp.R; A.talk = abTalk(t, 130.8, 131.7, 14, 0.5); C.gaze = [-1, -0.1]; C.drop = 6 * Math.max(pulse(tc, 131.0, 0.3), pulse(tc, 131.4, 0.3)); C.tip = -0.08; }
  if (C.talk) C.mouth = 'open'; if (A.talk) A.mouth = 'open';
  abLit(ctx, C, 320, (fin) => abCassim(ctx, { ...C, fin }, 'lamp'), t); abLit(ctx, A, 300, (fin) => abAli(ctx, { ...A, fin }, 'lamp'), t);
  if (tc >= 128.27 && tc < 130.5) { const [x, y, s, r] = AB_CARD(tc); abMapCard(ctx, x, y, tc < 129.51 ? beatIn(tc, 128.27, 129.4) : 1, s, r); }
  abHutFront(ctx, t);
}
AB_SHOTS.push({ a: 126.99, b: 131.81, ww: 1000, cam: (t) => K.camAt([[130.77, { x: 520, y: 680, zoom: 1.35 }], [131.4, { x: 450, y: 724, zoom: 2.0 }]], t), world: abS16World,
  over: (ctx, t, cam, S) => { if (t < 130.77) return; ['OPEN', 'SESAME', '!'].forEach((w, i) => { const u = K.clamp((t - 130.77 - i * 0.22) / 0.8); if (u <= 0) return;
    // from Ali Baba's mouth to Cassim's ear; the middle word hits the turban and bounces off up and away
    let wx = K.lerp(600, 395, u), wy = 660 - 30 * Math.sin(Math.PI * u) - i * 8, a = 1, sc = 1 - 0.35 * u;
    if (i === 1 && u > 0.7) { const v = (u - 0.7) / 0.3; wx = 395 + 120 * v; wy = 610 - 140 * v + 160 * v * v; sc = 0.85; a = 1 - K.clamp((v - 0.6) / 0.4); }
    else if (u > 0.8) a = 1 - K.clamp((u - 0.8) / 0.2);
    const [x, y] = abP(wx, wy, cam); ctx.save(); ctx.globalAlpha = a; S.title(ctx, w, x, y, 1, { size: 52 * sc, glow: '#ffd36a', align: 'center' }); ctx.restore();
    if (i === 1 && u > 0.68 && u < 0.78) { const [bx, by] = abP(392, 604, cam); abGlint(ctx, bx, by, 40, (u - 0.68) / 0.1); } }); } });

// ---------- S17 131.81-142.94: pre-dawn road (painted plate, two hill layers, a dark grass strip); the cart with empty sacks streaming
// as ribbons; the three words sit on the heap and fall off one by one; Cassim never looks back; on "يخرج" the pull to the wide:
// the tiny cart, the rock on the right, speed lines on the rock, "?" above it; THE END in the upper third; cycles stay alive ----------
const AB_FREEZE = 137.93;
const AB_CX = (t) => { const u = t - 132.6; return u <= 0 ? 420 : u < 1 ? 420 + 130 * u * u : 550 + 200 * (u - 1); };
const AB_CASSIM_HOP = (t) => t < 132.0 ? [300, 0] : t < 132.35 ? hop(t, 132.0, 0.35, 300, 400, 120) : [400, 0];
// v3 (Fable review 2 note 1): the cart rides at ~58% of the panel width (a third of the frame free behind it); the wide after the
// freeze puts the whole cart near 32% of the width, the rock where it was on screen, and the last dropped word on the road behind
const AB_END_ROCK = [1975, 900, 0.36], AB_WIDE = { x: 1596, y: 615, zoom: 1.0 }, AB_CAMDX = -47;
function abPredawnSky() { return abBakeAt('predawnSky', 1000, 1230, (c, w) => {
  abGrad(c, 0, 0, w, 1230, [[0, '#10143c'], [0.3, '#1e2560'], [0.5, '#3a3c7a'], [0.6, '#8a6a9a'], [0.655, '#f3b89a'], [0.7, '#c89aa8']]);
  abGlaze(c, 640, 800, 380, '#ffd0a8', 0.5);
  for (const [x, y, sc] of [[220, 260, 1.1], [760, 180, 0.9], [560, 430, 0.8], [880, 560, 0.6], [120, 600, 0.7]]) abCloud(c, x, y, 360 * sc, 70 * sc, '#3a3a78', '#f0a890', 8); }); }
function abPredawnHills(k) { return abBakeAt('pdhills' + k, 2000, 1230, (c, w) => { const col = k ? '#262a5c' : '#3c4282', base = k ? 860 : 820, R = K.rng(k + 5);
  for (const o of [-w, 0, w]) { c.save(); c.translate(o, 0); abSoftHills(c, w, base, k ? 70 : 110, col, k + 3, 3); c.restore(); }
  if (!k) { c.save(); c.globalCompositeOperation = 'source-atop'; abGrad(c, 0, 640, w, 120, [[0, 'rgba(255,190,160,0.35)'], [1, 'rgba(255,190,160,0)']]); c.restore(); } }); }
function abPredawnGround() { return abBakeAt('pdground', 2000, 1230, (c, w) => {
  abGrad(c, 0, 880, w, 350, [[0, '#4a4a7a'], [0.3, '#30305a'], [1, '#14142e']]);
  c.save(); c.filter = 'blur(3px)'; c.fillStyle = 'rgba(200,180,200,0.35)'; c.fillRect(0, 896, w, 44); c.restore();
  for (const o of [-w, 0, w]) { c.save(); c.translate(o, 0); abDress(c, 0, w, 905, 1030, 91, { stones: 14, tufts: 16, flowers: 8, cols: ['#c8a0d8', '#f0c0a0', '#e8e0f0'], stone: ['#8a8ab0', '#5a5a80'], grass: ['#4a6a7a', '#2a3a5a'] }); c.restore(); }
    const R = K.rng(44); c.save(); c.filter = 'blur(1px)'; for (let i = 0; i < 80; i++) { c.fillStyle = 'rgba(20,20,46,0.5)'; c.beginPath(); c.ellipse(R() * w, 900 + R() * 300, 6 + R() * 20, 2 + R() * 4, 0, 0, 7); c.fill(); } c.restore(); }); }
function abGrassStrip() { return abBakeAt('pdgrass', 2000, 1230, (c, w) => { const R = K.rng(8); c.fillStyle = '#0c0e26'; c.fillRect(0, 1040, w, 200);
  for (let x = 0; x < w; x += 9) { const h = 30 + R() * 70, lean = (R() - 0.5) * 24; c.beginPath(); c.moveTo(x - 6, 1046); c.quadraticCurveTo(x + lean * 0.5, 1046 - h * 0.6, x + lean, 1046 - h); c.lineTo(x + 6, 1046); c.closePath(); c.fill(); } }); }
function abS17Under(ctx, tt, cam) {
  ctx.drawImage(abPredawnSky(), 0, 0);
  const R = K.rng(9), fade = 1 - 0.6 * K.clamp((tt - 131.8) / 8); ctx.save(); ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 50; i++) { ctx.globalAlpha = fade * (0.2 + R() * 0.6) * (0.7 + 0.3 * Math.sin(AB_T2(tt) * 2 + i)); ctx.fillRect(R() * 1000, R() * 430, 2.5, 2.5); } ctx.restore();
  abLayer(ctx, abPredawnHills(0), cam, 0.3, 40); abLayer(ctx, abPredawnHills(1), cam, 0.6, 20); abLayer(ctx, abPredawnGround(), cam, 1);
}
// empty sacks as pale ribbons streaming off the back of the cart (a 4-drawing cycle on a travelling sine)
function abSackRibbons(ctx, x0, y0, tt, k = 1, flap = 0) {
  const f = Math.floor(tt * 8) % 4, cols = ['#efe6d2', '#d8cbb0', '#e6dcc4', '#cfc0a2'];
  cols.forEach((col, i) => { const len = (150 + 30 * i) * k, pts = [], pts2 = [], yb = y0 - i * 12;
    for (let j = 0; j <= 6; j++) { const u = j / 6, wv = Math.sin(f * Math.PI / 2 + i * 1.3 - j * 1.1) * 16 * u - (i === 1 ? flap * 90 * u * u : 0); pts.push([x0 - u * len, yb + u * 18 + wv]); pts2.push([x0 - u * len, yb + u * 18 + wv + 30 * (1 - 0.5 * u)]); }
    celShade(ctx, [...pts, ...pts2.reverse()], col, abMul(col, '#6a6aa0', 0.45), { light: [1, -1], off: 8, lw: 3, line: '#4a4060' }); });
}
function abS17World(ctx, tt, cam) {
  const t = Math.min(tt, AB_FREEZE), tc = AB_T2(t), m = 'predawn';
  abRock(ctx, ...AB_END_ROCK.slice(0, 2), { s: AB_END_ROCK[2], model: m, t });
  const cx = AB_CX(t), wheel = (cx - 420) / 62, bounce = 3 * Math.abs(Math.sin(cx * 0.045)), tilt = 0.06 * K.spring(t, 132.35, 1, 2.6, 4) + 0.02 * Math.sin(cx * 0.03);
  // the mule: walks with the cart; its ears and tail keep moving through the freeze (real time)
  const M = { y: 902, s: 0.78, dir: 1, pal: 1, ...walk((u) => AB_CX(u) + 290, tc, { stride: GAIT.donkey * 0.78 }), earL: 0.5 + idleSway(AB_T2(tt), 61, 0.3, 1.3), earR: 0.3 + idleSway(AB_T2(tt), 62, 0.35, 1.7), tailSwish: osc(AB_T2(tt), 1.4), tip: t > 132.49 && t < 132.9 ? 0.1 : 0, lid: abLid(tt, 27) };
  abDonkey(ctx, M, m);
  const [hx2, lift] = AB_CASSIM_HOP(tc), inCart = tc >= 132.35, jit = Math.floor(tt * 12) % 2 ? 1 : -1;
  const CP = { y: 900, s: 1.0, dir: 1, mouth: 'grin', grin: 1, brow: 0.3, lid: abLid(t, 51), gaze: [1, -0.1], sq: inCart ? landSquash(tc, 132.35, 0.1) : 1, tip: inCart ? 0.12 + lagged((u) => 0.04 * Math.sin(AB_CX(u) * 0.045), tc, 0.09, 1) : 0 };
  if (tc < 132.0) { Object.assign(CP, { x: 300, handL: [60, -150], handR: [70, -170], mouth: 'smile' }); const u = beatIn(tc, 131.85, 132.0); for (let i = 0; i < 3; i++) abSack(ctx, K.lerp(360, 410 + i * 30, u), K.lerp(740, 780, u) - 60 * Math.sin(Math.PI * u), 0.5, 0, { rot: u * 2 + i }); }
  if (!inCart) { groundShadow(ctx, hx2, 903, 90, lift, { flat: true, color: '#141a46' }); if (tc >= 132.0) Object.assign(CP, { x: hx2, y: 900 - lift - 85 * beatIn(tc, 132.0, 132.35), handL: [-40, -200], handR: [40, -210] }); abCassim(ctx, CP, m); }
  const by = 900 - 95 - bounce;
  if (tc > 132.0) abSackRibbons(ctx, cx - 120, by - 26, tt, 0.78 * K.ease.out(K.clamp((tc - 132.0) / 0.5)), lagged((u) => pulse(u, 134.01, 0.42), AB_T2(tt), 0.08, 1) * (tt < AB_FREEZE ? 1 : 0));
  abCart(ctx, cx, 900, { wheel, tilt, bounce, load: false, t, inside: inCart ? (c) => {
    for (let i = 0; i < 4; i++) abSack(c, -96 + i * 50, -46 - (i % 2) * 10, 0.62, 0, { flap: 6 * Math.sin(AB_T3(tt) * 9 + i * 1.7), col: i % 2 ? '#e6dcc4' : '#d8cbb0', shade: '#9a90a8', rot: -0.1 + 0.05 * i });
    const P = { ...CP, x: -20, y: 10 - lagged((u) => 3 * Math.abs(Math.sin(AB_CX(u) * 0.045)), tc, 0.08, 1), handR: tc > 132.45 ? [96 + 4 * jit, -226 + 6 * jit] : [90, -140], handL: [70, -140] };
    // the turban tail streams back, lagging the lean
    const tx = -20 - 34, ty = P.y - 228, pts = [], pts2 = []; for (let j = 0; j <= 5; j++) { const u = j / 5, wv = Math.sin(Math.floor(tt * 8) * 1.6 - j * 1.2) * 8 * u; pts.push([tx - u * 80, ty + u * 26 + wv]); pts2.push([tx - u * 80, ty + u * 26 + wv + 14]); }
    celShade(c, [...pts, ...pts2.reverse()], abMul('#f2a71b', AB_MODEL[m].tint, AB_MODEL[m].k), '#9a6a2a', { light: [1, -1], off: 4, lw: 2.5 });
    abCassim(c, P, m); const h = abHand(P, 1); c.save(); c.strokeStyle = '#3a2a3a'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(h[0], h[1]); c.quadraticCurveTo(h[0] + 60, h[1] - 70 - 10 * jit, h[0] + 120, h[1] - 40 + 14 * jit); c.stroke(); c.restore(); } : null });
  if (inCart) { ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 60, 900 - 95 - 150); ctx.quadraticCurveTo(cx + 200, 760, M.x + 120, 900 - 200); ctx.stroke(); ctx.restore(); }
  if (cx > 600) for (const f of [0, 1]) dustBurst(ctx, cx - 60, 902, ((t * 2 + f * 0.5) % 1) * 0.5, 3, 3, 7, 18, 0.5, f + Math.floor(t * 2));
}
// the three words (v3): from 133.07 stacked on the sack heap behind Cassim's back (lowest on the cart rim, clear of his turban); on
// each cue (هل 135.87, سيتذكر 136.63, كيف 137.51) the top word tips over the tail board, drops on an arc to the road in 0.35 s,
// squashes on contact with one small bounce, dims, and stays put in the world while the tracking camera leaves it behind
const AB_DROP = [135.87, 136.63, 137.51], AB_WSIZE = 56;
const abHeapWord = (i, u) => [AB_CX(u) - 130, 900 - 95 - 3 * Math.abs(Math.sin(AB_CX(u) * 0.045)) - 50 - 17 - (2 - i) * 34];
function abS17WordAt(i, t) {   // world x, y (centre), rotation, squash, alpha, glow on/off
  const tf = AB_DROP[i]; let a = K.clamp((t - 133.07) / 0.3);
  if (t < tf) { const [x, y] = abHeapWord(i, t); return { x, y, r: 0, sx: 1, sy: 1, a, glow: true }; }
  const [x0, y0] = abHeapWord(i, tf), tip = beatIn(t, tf, tf + 0.12), xl = x0 - 10, yl = 900 - 12;
  if (t < tf + 0.12) return { x: x0 - 6 * tip, y: y0, r: -0.42 * tip, sx: 1, sy: 1, a: 1, glow: true };
  const v = K.clamp((t - tf - 0.12) / 0.35);
  if (v < 1) return { x: K.lerp(x0 - 6, xl, v), y: K.lerp(y0, yl, v * v) - 26 * Math.sin(Math.PI * v) * (1 - v), r: K.lerp(-0.42, -0.9, v), sx: 1, sy: 1, a: 1, glow: true };
  const w = t - tf - 0.47, sq = w < 0.1 ? Math.sin(Math.PI * w / 0.1) : 0, bo = 14 * pulse(w, 0.08, 0.22), r = K.lerp(-0.9, -0.12, K.ease.out(K.clamp(w / 0.16)));
  return { x: xl, y: yl - bo, r, sx: 1 + 0.12 * sq, sy: 1 - 0.15 * sq, a: 1 - 0.55 * K.clamp(w / 0.4), glow: w < 0.12 };
}
function abS17Words(ctx, tt, cam, S) {
  const t = tt; if (t < 133.07) return;   // real time: the last word finishes its fall (lands 137.98) during the pull to the wide
  ['OPEN', 'SESAME', '!'].forEach((w, i) => { const W = abS17WordAt(i, t), [px, py] = abP(W.x, W.y, cam), sz = AB_WSIZE * cam.zoom / 1.7;
    ctx.save(); ctx.globalAlpha *= W.a; ctx.translate(px, py); ctx.rotate(W.r); ctx.scale(W.sx, W.sy);
    S.title(ctx, w, 0, 0, 1, { size: sz * 0.9, glow: W.glow ? '#ffd36a' : undefined, align: 'center' }); ctx.restore(); });
}
function abS17Cam(tt) { const t = Math.min(tt, AB_FREEZE), track = { x: AB_CX(t) + AB_CAMDX, y: 697, zoom: 1.7 }; if (tt < AB_FREEZE) return track;
  const u = K.ease.inOut(K.clamp((tt - AB_FREEZE) / 0.6)); return { x: K.lerp(track.x, AB_WIDE.x, u), y: K.lerp(track.y, AB_WIDE.y, u), zoom: K.lerp(track.zoom, AB_WIDE.zoom, u) }; }
AB_SHOTS.push({ a: 131.81, b: 1e9, ww: 3000, cam: abS17Cam, under: abS17Under, world: abS17World,
  over: (ctx, tt, cam, S) => {
    abLayer(ctx, abGrassStrip(), cam, 1.6, -10);   // foreground grass silhouette, sliding fastest
    abS17Words(ctx, tt, cam, S);
    if (tt > 134.01 && tt < 135.9) { const [lx, ly] = abP(AB_CX(Math.min(tt, AB_FREEZE)) - 205, 900 - 40, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((tt - 135.7) / 0.2); S.label(ctx, 'EMPTY SACKS', lx, ly, K.clamp((tt - 134.01) / 0.35), { size: 40 }); ctx.restore(); }
    if (tt >= AB_FREEZE) { const [rx, ry] = abP(AB_END_ROCK[0], AB_END_ROCK[1] - 160, cam), w = K.clamp((tt - AB_FREEZE - 0.4) / 0.3), R = K.rng(17 + (Math.floor(tt * 12) % 2));
      if (w > 0) { ctx.save(); ctx.globalAlpha = 0.4 * w; ctx.strokeStyle = '#e8ecff'; ctx.lineCap = 'round';   // speed lines centred on the rock (on twos)
        for (let i = 0; i < 34; i++) { const an = R() * Math.PI * 2, r0 = 270 + R() * 60, r1 = r0 + 160 + R() * 320; ctx.lineWidth = 2 + R() * 4; ctx.beginPath(); ctx.moveTo(rx + Math.cos(an) * r0, ry + Math.sin(an) * r0 * 0.9); ctx.lineTo(rx + Math.cos(an) * r1, ry + Math.sin(an) * r1 * 0.9); ctx.stroke(); } ctx.restore(); }
      if (tt < AB_FREEZE + 0.7) S.emphasis(ctx, rx, ry, 200, K.clamp((tt - AB_FREEZE) / 0.7), { rect: [0, 0, 1000, 1230], word: '', seed: 17 });
      const [qx, qy] = abP(AB_END_ROCK[0], AB_END_ROCK[1] - 650 * AB_END_ROCK[2] - 95, cam); if (tt > AB_FREEZE + 0.3) S.title(ctx, '?', qx, qy, K.clamp((tt - AB_FREEZE - 0.3) / 0.5), { size: 130, glow: '#ffd36a', align: 'center' }); }
    if (tt > 139.0) S.title(ctx, 'THE END', 500, 230 - 12 * K.clamp((tt - 139.0) / 3.9), K.clamp((tt - 139.0) / 0.9), { size: 110, align: 'center' }); } });
