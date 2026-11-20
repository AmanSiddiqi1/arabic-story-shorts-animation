// ===== ALI-01-ANIME shots S12-S17 (89.48 - 142.94 s): the cave, one small sack, home, the whisper, Cassim, the cart, THE END =====

// ---------- the cave (S12, S13) ----------
const AB_SACKS = [[420, 0.72], [470, 0.58]], AB_SMALL = [515, 904];
function abCaveUnder(ctx, t, cam) { ctx.save(); K.camera(ctx, 1000, 1230, cam); ctx.translate((cam.x - 800) * 0.4, 0); ctx.drawImage(abCavePlate(), 0, 0); ctx.restore(); }
function abCaveWorld(ctx, t, cam, o = {}) {
  ctx.drawImage(abCaveCels(), 0, 0, 1600, 1230);
  for (const [x, s] of AB_SACKS) abSack(ctx, x, 904, s, 1, { coin: true });
  abChest(ctx, 770, 906, 1.0, 0.85); abGlow(ctx, 770, 800, 260, 0.6 + 0.1 * Math.sin(t * 3), '#ffc84a');
  abCaveLive(ctx, t);
  abGlow(ctx, 600, 760, 520, 0.35, '#ffb84a'); abGlow(ctx, 940, 780, 300, 0.25, '#cfe0ff');
}
// ---------- S12 89.48-95.4: the long pan across the painted peak still ----------
const AB_S12_X = (t) => kfn(t, [[89.48, 180], [90.2, 330], [91.0, 330], [93.0, 560]]);
function abS12World(ctx, t, cam) {
  const tc = AB_T2(t); abCaveWorld(ctx, t, cam);
  abSack(ctx, ...AB_SMALL, 0.42, 1, { coin: true });
  const P = { x: AB_S12_X(tc), y: 902, dir: 1, ...walk(AB_S12_X, tc, { stride: 22 }), lid: abLid(t, 19), gaze: gazePlan(tc, [[89.48, [1, 0]], [90.8, [1, 0.3]], [91.6, [1, 0.1]], [92.6, [1, -0.3]]]), mouth: 'o', brow: -0.6, sq: breathe(tc, 5, 0.02) };
  if (tc > 94.55) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; }
  abCel(ctx, [P.x, P.y, 300, 320], (c) => abAli(c, P, 'cave'), { k: 0, rim: '#8f7cff', light: [-1, 0], rimW: 4 });
  if (t > 90.82 && t < 91.6) abBands(ctx, [420, 640, 360, 270], t, { cols: ['#fff3b0'], alpha: 0.3, w: 70, speed: 500 });
  if (t > 93.84 && t < 94.6) { const u = (t - 93.84) / 0.76, x = K.lerp(700, 860, u), y = K.lerp(700, 1100, u * u), r = K.lerp(16, 60, u), sp = Math.abs(Math.cos(t * 26));
    abBlob(ctx, x, y, r * Math.max(0.15, sp), r, '#ffcf3a', '#c07a12', { lw: 2.5, hi: '#fff3b0' }); }
}
AB_SHOTS.push({ a: 89.48, b: 95.4, ww: 1600, cam: (t) => ({ x: kfn(t, [[89.48, 500], [94.4, 1000]]), y: 615, zoom: 1.0 }), under: abCaveUnder, world: abS12World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    for (const [w, tt, x, y] of [['GOLD', 90.82, 600, 560], ['SILVER', 91.56, 940, 620], ['CLOTH', 92.56, 1300, 520]]) if (t > tt) { const [px, py] = abP(x, y, cam); S.label(ctx, w, px, py, K.clamp((t - tt) / 0.4), { size: 44 }); } } });

// ---------- S13 95.4-102.72: the held bust; the hands that stop; ONE SMALL SACK; outside, the rock shut; home ----------
const AB_S13_REACH = [[96.36, 0], [97.1, 1], [97.3, 1], [97.7, 0.1], [98.2, 0]];
function abS13Cave(ctx, t, cam) {
  const tc = AB_T2(t); abCaveWorld(ctx, t, cam);
  const r = flow(tc, AB_S13_REACH) + lagged((u) => flow(u, AB_S13_REACH), tc, 0.12, 0.4), held = tc >= 98.8;
  const P = { x: 560, y: 902, dir: 1, lid: abLid(t, 19, [97.6]), gaze: [1, 0.2], mouth: tc < 97.3 ? 'o' : 'closed', brow: tc < 97.3 ? -0.7 : 0, sq: breathe(tc, 6), tip: 0.1 * r + (tc > 97.45 && tc < 97.95 ? 0.06 * Math.sin((tc - 97.45) * 25) : 0) + idleSway(tc, 23, 0.02, 2.6) };
  P.handL = [K.lerp(-20, 92, r), K.lerp(-110, -165, r)]; P.handR = [K.lerp(20, 104, r), K.lerp(-112, -190, r)];
  if (tc >= 97.7 && tc < 98.28) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
  if (tc >= 98.28) { P.dir = -1; P.x = K.lerp(560, 590, beatIn(tc, 98.28, 98.6)); P.gaze = [-1, 0.6]; P.tip = tc < 99.3 ? 0.3 * Math.sin(Math.PI * beatIn(tc, 98.5, 99.3)) : 0; P.handL = [-20, -110];
    P.handRW = tc < 98.8 ? [AB_SMALL[0] + 10, 860] : undefined; P.mouth = 'closed'; }
  if (tc >= 99.3) { P.handRW = undefined; P.handR = [60, -200]; P.gaze = [0.3, -0.5]; P.mouth = 'smile'; }
  if (tc >= 100.42) { P.handR = [40, -140]; P.handL = [30, -150 + 6 * osc(tc, 0.2)]; P.gaze = [0.4, 0.6]; if (tc > 100.85) { P.dir = 1; P.tip = 0.2 * pulse(tc, 100.85, 0.45); P.drop = 10 * pulse(tc - 0.08, 100.85, 0.45); P.gaze = [1, 0.4]; } }
  abCel(ctx, [P.x, P.y, 320, 330], (c) => abAli(c, P, 'cave'), { k: 0, rim: '#8f7cff', light: [-1, 0], rimW: 4 });
  if (!held) abSack(ctx, ...AB_SMALL, 0.42, 1, { coin: true });
  else { const h = abHand(P, 1); abSack(ctx, h[0], h[1] + 46, 0.42, 1, { coin: tc > 100.42 && tc < 100.85 }); if (tc > 100.42 && tc < 100.85) abGlint(ctx, h[0], h[1] + 4, 24, (tc - 100.42) / 0.43); }
}
AB_SHOTS.push({ a: 95.4, b: 97.3, ww: 1600, cam: () => ({ x: 560, y: 690, zoom: 2.2 }), under: abCaveUnder, world: abS13Cave,
  over: (ctx, t) => abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a', '#ffb84a'], alpha: 0.18, w: 170, speed: 260 }) });
AB_SHOTS.push({ a: 97.3, b: 101.3, ww: 1600, cam: () => ({ x: 560, y: 720, zoom: 1.4 }), under: abCaveUnder, world: abS13Cave,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam); if (t > 99.5) { const [x, y] = abP(560, 620, cam); S.label(ctx, 'ONE SMALL SACK', x + 40, y - 170, K.clamp((t - 99.5) / 0.4), { size: 42 }); } } });
// outside at late dusk: he mimes the sweep, the rock shuts, he pats it like a horse and runs
const AB_S13_RUN = (t) => kfn(t, [[102.35, 1690], [102.72, 1380]], 'in');
function abS13Out(ctx, t, cam) {
  const tc = AB_T2(t), open = 1 - K.ease.inOut(K.clamp((t - 101.45) / 0.65)), m = 'late';
  abRock(ctx, 1820, 900, { model: m, open, crack: open > 0.02 ? 1 : 0, glow: open, t });
  const P = { x: tc < 102.35 ? 1690 : AB_S13_RUN(tc), y: 900, dir: tc < 102.35 ? 1 : -1, ...(tc >= 102.35 ? walk(AB_S13_RUN, tc, { stride: 30 }) : {}), lid: abLid(t, 19), gaze: [1, -0.2], mouth: 'closed', handL: [20, -128] };
  if (tc < 101.9) { const a = beatIn(tc, 101.35, 101.8); P.handR = [K.lerp(100, -40, a), K.lerp(-220, -150, a)]; P.talk = abTalk(t, 101.35, 101.9, 6, 0.5); if (P.talk) P.mouth = 'open'; }
  else if (tc < 102.35) { const pat = Math.max(pulse(tc, 102.0, 0.13), pulse(tc, 102.17, 0.13)); P.handRW = [1745 - 14 * pat, 720]; P.mouth = 'smile'; }
  else { P.tip = 0.15; P.gaze = [-1, 0]; }
  const draw = (c) => abAli(c, P, open > 0.3 ? 'gold' : m);
  if (open > 0.05) abCel(ctx, [P.x, P.y, 300, 320], draw, { k: 0, rim: '#ffd76a', light: [1, -0.2], rimW: 4, rimAlpha: open }); else draw(ctx);
  const h = abHand(P, 0); abSack(ctx, h[0], h[1] + 40, 0.42, 1);
}
AB_SHOTS.push({ a: 101.3, b: 102.72, ww: 2400, cam: () => ({ x: 1760, y: 630, zoom: 1.15 }), under: abGladeWide('late'), world: abS13Out });
// 102.72-105.57: on the donkey at a hard trot toward home; ears streaming; the sky steps from dusk to night; a lit window ahead
const AB_RIDE = (t) => 5000 - 330 * (t - 102.72);
function abS13Ride(ctx, t, cam) {
  const tc = AB_T2(t), fast = beatIn(tc, 103.64, 103.8), D = { y: 902, s: 0.8, dir: -1, pal: 0, ...walk(AB_RIDE, tc, { stride: GAIT.donkey * 0.8 }), earL: K.lerp(0.3, -0.9, fast), earR: K.lerp(0.2, -0.8, fast) + lagged((u) => -0.5 * beatIn(u, 103.64, 103.8), tc, 0.12, 0.6), tailUp: 0.4 + 0.5 * fast, eyes: 'wide', gallop: 0.4 * fast };
  const back = tc > 103.1 && tc < 103.55, pal = abPal(AB_ALI0, 'dusk'); pal.sash = AB_ACC; pal.band = AB_ACC;
  rideOn(ctx, (c, P) => abDonkey(c, P, 'dusk'), D, { costume: 'villager', s: 0.76, pal, age: 0.25, gaze: back ? [1, -0.1] : [-1, 0], lid: back ? abBlinkAt(AB_T3(t), 103.1) : abLid(t, 19), tip: 0.1, mouth: 'grit', handL: [30, -130], lurch: 0.1 * Math.sin((D.ph || 0) * 2) }, { name: 'donkey' });
  const st = mountSeat('donkey', D); abSack(ctx, st.x - 26, st.y - 96, 0.4, 1);
}
function abS13RideUnder(ctx, t, cam) {
  abForest(ctx, cam, t, 'dusk', { shafts: false });
  const st = t < 104.45 ? 0 : t < 104.85 ? 0.33 : t < 105.25 ? 0.66 : 1;
  if (st > 0) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = K.rgba('#3a3a8a', 0.55 * st); ctx.fillRect(0, 0, 1000, 760); ctx.restore();
    const R = K.rng(77); ctx.save(); ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 40 * st; i++) { ctx.globalAlpha = 0.4 + R() * 0.6; ctx.fillRect(R() * 1000, R() * 420, 3, 3); } ctx.restore();
    ctx.save(); ctx.globalAlpha = st; ctx.translate(-80 + (t - 104.45) * 40, 80); ctx.drawImage(abTownRoofs('night'), 0, 0, 700, 615); ctx.restore(); }
}
AB_SHOTS.push({ a: 102.72, b: 105.57, ww: 1e5, cam: (t) => ({ x: AB_RIDE(t) - 50, y: 700, zoom: 1.25 }), under: abS13RideUnder, world: abS13Ride,
  over: (ctx, t, cam) => { if (t > 103.64) abSpeed(ctx, [0, 300, 1000, 900], t, { dir: 1, n: 20, alpha: 0.35 }); abForestFront(ctx, cam, 'dusk'); } });

// ---------- the hut at night (S14-S16) ----------
const AB_HUT = { palette: 'night', mat: [380, 640], stool: 505, lampAt: [505, 852], lamp: 1, dark: 1 };
const AB_COINS = [505, 898];
function abHutBack(ctx, t, o = {}) { hutRoom(ctx, { ...AB_HUT, t, layer: 'back', door: o.door || 0 }); abGrad(ctx, -200, 934, 1400, 400, [[0, '#4a2a3a'], [1, '#1a1020']]); }
function abHutFront(ctx, t, o = {}) { hutRoom(ctx, { ...AB_HUT, t, layer: 'front', door: o.door || 0 }); }
// coins on the mat (gold light), then the cloth over them with one coin left uncovered at the edge
function abCoins(ctx, t, o = {}) {
  const pour = K.clamp((t - 106.2) / 0.35); if (pour <= 0) return;
  abCoinPile(ctx, AB_COINS[0], AB_COINS[1], 130 * pour, 46 * pour, { seed: 31 });
  const cover = K.clamp((t - 112.0) / 0.3); if (cover > 0) { const w = 160 * cover; celShade(ctx, [[AB_COINS[0] - 85, 902], [AB_COINS[0] - 85, 870], [AB_COINS[0] - 85 + w * 0.5, 846], [AB_COINS[0] - 85 + w, 862], [AB_COINS[0] - 85 + w, 902]], '#8a3a5a', '#5a2040', { light: [-1, -1], off: 10, lw: 3.5 }); }
  if (cover >= 1) { abBlob(ctx, AB_COINS[0] + 92, 896, 10, 6, '#ffcf3a', '#c07a12', { lw: 2 }); if (t > 112.5 && t < 112.9) abGlint(ctx, AB_COINS[0] + 92, 892, 22, (t - 112.5) / 0.4); }
  abGlow(ctx, AB_COINS[0], 860, 280, (cover < 1 ? 0.85 : 0.15) * pour * (o.k ?? 1), '#ffc24a');
}
const abGoldK = (t) => K.clamp((t - 106.2) / 0.35) * (1 - 0.85 * K.clamp((t - 112.0) / 0.3));
// a person lit from below by the coins (a hard gold rim from beneath) when the light is on
function abLit(ctx, P, w, draw, t, rimCol = '#ffcf5a') { const g = abGoldK(t); if (g > 0.3) abCel(ctx, [P.x, P.y, w, 340], draw, { k: 0, rim: rimCol, light: [0.2, 1], rimW: 4, rimAlpha: g }); else draw(ctx); }

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
  abLit(ctx, P, 300, (c) => abAli(c, P, 'lamp'), t);
  if (tc < 106.5) { const h = abHand(P, 1); abSack(ctx, h[0], h[1] + 30, 0.42, 1, { rot: tc > 106.1 ? 1.6 : 0 }); }
  return P;
}
function abS14Wife(ctx, t, o = {}) {
  const tc = AB_T2(t), P = { x: 640, y: 900, dir: -1, sit: 1, seat: 'floor', lid: abLid(t, 31), gaze: [-1, 0], mouth: 'smile', tip: idleSway(tc, 33, 0.02, 2.9), sq: breathe(tc, 8) };
  if (tc > 106.55 && tc < 108.95) { P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.mouth = 'o'; P.lid = 0; P.gaze = tc > 108.37 ? gazePlan(tc, [[108.37, [-0.3, -1]], [108.7, [-1, -0.2]]]) : [-1, 0.4]; }
  if (tc >= 108.95 && tc < 111.67) { P.handLW = [545, 808]; P.handRW = [560, 815]; P.gaze = [-1, -0.2]; }
  if (tc >= 111.67) { P.drop = 7 * Math.max(pulse(tc, 111.75, 0.25), pulse(tc, 112.05, 0.25)); P.handR = tc < 112.0 ? PERSON_HANDS.hush.R : undefined; P.mouth = 'closed'; if (tc >= 112.0 && tc < 112.4) P.handRW = [K.lerp(560, 440, beatIn(tc, 112.0, 112.3)), 880]; }
  if (o.P) Object.assign(P, o.P);
  abLit(ctx, P, 300, (c) => abWife(c, P, 'lamp'), t); return P;
}
function abWindowCassim(ctx, t, rise, F = {}) {
  const W = HUT.window || { x0: 690, y0: 400, x1: 830, y1: 540 }; ctx.save(); ctx.beginPath(); ctx.rect(W.x0 + 3, W.y0 + 3, W.x1 - W.x0 - 6, W.y1 - W.y0 - 6); ctx.clip();
  const cx = (W.x0 + W.x1) / 2, cy = W.y0 + 88 + 120 * (1 - rise), k = 0.2;
  abCel(ctx, [cx, cy + 90, 160, 220], (c) => abFace(c, cx, cy, k, { who: 'cassim', m: 'night', mouth: 'set', t, ...F }), { k: 0, rim: '#ff7ad9', light: [1, -0.4], rimW: 3 });
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
AB_SHOTS.push({ a: 105.57, b: 113.26, ww: 1000, cam: (t) => K.camAt([[110.97, { x: 500, y: 650, zoom: 1.5 }], [111.6, { x: 500, y: 680, zoom: 1.7 }]], t), world: abS14World,
  over: (ctx, t, cam, S) => { if (t > 110.97 && t < 112.4) { const [x, y] = abP(390, 650, cam); S.label(ctx, 'SHHH!', x - 120, y - 80, K.clamp((t - 110.97) / 0.3), { size: 46 }); } } });

// ---------- S15 113.26-123.81: Cassim at the window; the coin; coin eyes; in through the door; three questions; the secret ----------
function abS15Room(ctx, t, cam, o) {
  const tc = AB_T2(t), door = tc < 116.9 ? 0 : tc < 117.4 ? 1 : 1 - beatIn(tc, 117.4, 117.7) * 0.6;
  abHutBack(ctx, t, { door }); abCoins(ctx, t);
  const jump = impactSquash(tc, 117.0, 0.88);
  // the wife: jumps, pulls the cloth tighter, then hides her face and looks away during the questions
  const WP = { sq: jump, gaze: tc > 117.0 ? [-1, -0.1] : [-1, 0] }; if (tc > 118.47) { WP.dir = 1; WP.handL = PERSON_HANDS.mouthCover.L; WP.handR = PERSON_HANDS.mouthCover.R; WP.gaze = [1, 0.3]; WP.x = 690; }
  abS14Wife(ctx, t, { P: WP });
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
  if (C.x < AP.x) { abLit(ctx, C, 320, (c) => abCassim(c, C, 'lamp'), t); abS14Ali(ctx, t, { P: AP }); }
  else { abS14Ali(ctx, t, { P: AP }); abLit(ctx, C, 320, (c) => abCassim(c, C, 'lamp'), t); }
  if (tc > 119.05 && tc < 119.61) { const sx = AP.x + 20, sy = 660 + (tc - 119.05) * 60; celShade(ctx, [[sx, sy - 16], [sx + 7, sy], [sx, sy + 6], [sx - 7, sy]], '#cfeaff', '#7fb0e0', { off: 3, lw: 2 }); }
  abHutFront(ctx, t, { door });
  // picture balloon over Cassim: the rock with its gold seam
  if (tc > 121.37 && tc < 122.7) { const p = K.clamp((t - 121.37) / 0.2), bx = C.x - 10, by = 380; ctx.save(); ctx.globalAlpha = p * (1 - K.clamp((t - 122.5) / 0.2));
    ctx.fillStyle = 'rgba(14,10,24,0.9)'; ctx.strokeStyle = '#ffd36a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(bx - 110, by - 80, 220, 160, 30); ctx.fill(); ctx.stroke(); ctx.clip();
    abRock(ctx, bx, by + 70, { s: 0.2, model: 'afternoon', crack: 1, glow: 0.6, t }); ctx.restore(); }
  return C;
}
function abS15Cam(t) { if (t < 117.75) return { x: 500, y: 650, zoom: 1.35 }; if (t < 118.47) return { x: 420, y: 680, zoom: 1.45 }; if (t < 119.05) return { x: 470, y: 650, zoom: 1.6 }; if (t < 119.61) return { x: 440, y: 630, zoom: 2.0 }; if (t < 120.35) return { x: 470, y: 660, zoom: 1.7 }; return { x: 450, y: 670, zoom: 1.9 }; }
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
const AB_CARD = (t) => { if (t < 129.51) return [490, 470, 1, 0]; if (t < 129.7) { const u = beatIn(t, 129.51, 129.68); return [K.lerp(490, 400, u), K.lerp(470, 720, u), 1 - 0.3 * u, -0.3 * u]; } const u = beatIn(t, 130.2, 130.5); return [K.lerp(400, 372, u), K.lerp(720, 790, u), 0.7 * (1 - u), -0.3]; };
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
  abCassim(ctx, C, 'lamp'); abAli(ctx, A, 'lamp');
  if (tc >= 128.27 && tc < 130.5) { const [x, y, s, r] = AB_CARD(tc); abMapCard(ctx, x, y, tc < 129.51 ? beatIn(tc, 128.27, 129.4) : 1, s, r); }
  abHutFront(ctx, t);
}
AB_SHOTS.push({ a: 126.99, b: 131.81, ww: 1000, cam: (t) => K.camAt([[130.77, { x: 520, y: 660, zoom: 1.5 }], [131.4, { x: 440, y: 660, zoom: 1.8 }]], t), world: abS16World,
  over: (ctx, t, cam, S) => { if (t < 130.77) return; ['افتح', 'يا', 'سمسم'].forEach((w, i) => { const u = K.clamp((t - 130.77 - i * 0.22) / 0.95); if (u <= 0) return;
    const [x, y] = abP(K.lerp(600, 120, u), 640 - 40 * Math.sin(Math.PI * u) - i * 30, cam); ctx.save(); ctx.globalAlpha = 1 - K.clamp((u - 0.8) / 0.2); S.title(ctx, w, x, y, 1, { font: 'Lalezar', size: 40 }); ctx.restore(); }); } });

// ---------- S17 131.81-142.94: the cart at pre-dawn; the empty sacks flap; the words fall off; the rock on the horizon; freeze; THE END ----------
const AB_FREEZE = 137.93;
const AB_CX = (t) => { const u = t - 132.6; return u <= 0 ? 420 : u < 1 ? 420 + 130 * u * u : 550 + 260 * (u - 1); };
const AB_CASSIM_HOP = (t) => t < 132.0 ? [300, 0] : t < 132.35 ? hop(t, 132.0, 0.35, 300, 400, 120) : [400, 0];
function abS17Under(ctx, t, cam) {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#141a46'], [0.35, '#2a3a6e'], [0.6, '#6a9ab0'], [0.7, '#f0c8a0'], [0.75, '#c8d8d0']]);
  const R = K.rng(9); ctx.save(); ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 60; i++) { ctx.globalAlpha = (0.2 + R() * 0.6) * (0.7 + 0.3 * Math.sin(t * 2 + i)); ctx.fillRect(R() * 1000, R() * 480, 2.5, 2.5); } ctx.restore();
}
function abS17World(ctx, tt, cam) {
  const t = Math.min(tt, AB_FREEZE), tc = AB_T2(t), camX = cam.x - 500 / cam.zoom;
  countryRoad(ctx, { w: 3000, sky: false, camX, t, places: [{ kind: 'tree', x: 1100 }, { kind: 'milestone', x: 1500 }, { kind: 'bush', x: 2000 }, { kind: 'tree', x: 2650, small: true }] });
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(120,150,200,0.55)'; ctx.fillRect(-100, 500, 3200, 800); ctx.restore();
  abGrad(ctx, -100, 962, 3200, 300, [[0, '#6a7a9a'], [1, '#2a2a4a']]);
  abRock(ctx, 2250, 880, { s: 0.22, model: 'predawn', crack: 1, glow: 0.18, t });
  // the cart, the mule and Cassim
  const cx = AB_CX(t), wheel = (cx - 420) / 62, bounce = 3 * Math.abs(Math.sin(cx * 0.045)), tilt = 0.06 * K.spring(t, 132.35, 1, 2.6, 4) + 0.02 * Math.sin(cx * 0.03);
  const M = { y: 902, s: 0.78, dir: 1, pal: 1, ...walk((u) => AB_CX(u) + 290, tc, { stride: GAIT.donkey * 0.78 }), earL: 0.5, earR: 0.3, tailSwish: osc(tc, 1.4), tip: t > 132.49 && t < 132.9 ? 0.1 : 0, lid: abLid(t, 27) };
  abDonkey(ctx, M, 'predawn');
  const [hx2, lift] = AB_CASSIM_HOP(tc), inCart = tc >= 132.35;
  const CP = { y: 900, s: 1.0, dir: 1, mouth: 'smile', brow: 0.3, lid: abLid(t, 51), gaze: [1, -0.1], sq: inCart ? landSquash(tc, 132.35, 0.1) : 1, tip: inCart ? lagged((u) => 0.04 * Math.sin(AB_CX(u) * 0.045), tc, 0.09, 1) : 0 };
  if (tc < 132.0) { Object.assign(CP, { x: 300, handL: [60, -150], handR: [70, -170] }); const u = beatIn(tc, 131.85, 132.0); for (let i = 0; i < 3; i++) abSack(ctx, K.lerp(360, 410 + i * 30, u), K.lerp(740, 780, u) - 60 * Math.sin(Math.PI * u), 0.5, 0, { rot: u * 2 + i }); }
  if (!inCart) { groundShadow(ctx, hx2, 903, 90, lift, { flat: true, color: '#141a46' }); if (tc >= 132.0) Object.assign(CP, { x: hx2, y: 900 - lift - 85 * beatIn(tc, 132.0, 132.35), handL: [-40, -200], handR: [40, -210] }); abCassim(ctx, CP, 'predawn'); }
  abCart(ctx, cx, 900, { wheel, tilt, bounce, load: tc > 132.0, t, inside: inCart ? (c, by) => { const P = { ...CP, x: -20, y: 10 - lagged((u) => 3 * Math.abs(Math.sin(AB_CX(u) * 0.045)), tc, 0.08, 1) }; P.handR = tc > 132.45 && tc < 132.8 ? [60, -230] : [90, -140]; abCassim(c, P, 'predawn'); } : null });
  // the reins from his hands to the mule
  if (inCart) { ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 60, 900 - 95 - 150); ctx.quadraticCurveTo(cx + 200, 760, M.x + 120, 900 - 200); ctx.stroke(); ctx.restore(); }
  // one empty sack blows off and tumbles onto the road
  if (t > 134.3) { const u = K.clamp((t - 134.3) / 0.6), sx = AB_CX(134.3) - 120 - 160 * u, sy = K.lerp(760, 896, u * u); abSack(ctx, sx, sy, 0.62, 0, { rot: u < 1 ? u * 7 : 0.1, flap: u < 1 ? 10 * Math.sin(t * 20) : 0 }); }
  if (cx > 600) for (const f of [0, 1]) dustBurst(ctx, cx - 60, 902, ((t * 2 + f * 0.5) % 1) * 0.5, 3, 3, 7, 18, 0.5, f + Math.floor(t * 2));
}
// far behind (panel space, drifting left and shrinking as the cart goes): the home with its lit doorway; Ali Baba calls after him, his wife holds his arm
function abS17Home(ctx, t, cam) {
  const tc = AB_T2(t), u = K.clamp((t - 131.81) / 6), hx = 220 - 150 * u, hy = 615 + (880 - cam.y) * cam.zoom, k = 0.55 * (1.2 - 0.3 * u);
  ctx.save(); ctx.translate(hx, hy); ctx.scale(k, k);
  celShade(ctx, K.rectPts(-90, -130, 180, 130), '#4a4a7a', '#30305a', { light: [1, -1], off: 16, lw: 3 }); celShade(ctx, [[-110, -126], [0, -200], [110, -126]], '#5a3a5a', '#3a2440', { light: [1, -1], off: 10, lw: 3 });
  ctx.fillStyle = '#ffd98a'; ctx.fillRect(-26, -90, 52, 90); abGlow(ctx, 0, -40, 120, 0.6, '#ffcf6a');
  const call = tc > 135.11; abWife(ctx, { x: 22, y: 0, s: 0.42, dir: -1, handLW: [2, -60], lid: 0 }, 'predawn');
  abAli(ctx, { x: -6, y: 0, s: 0.42, dir: 1, handR: call ? PERSON_HANDS.cupMouth.R : [30, -110], handL: call ? PERSON_HANDS.wave.R : [-20, -110], mouth: call ? 'open' : 'frown', lid: 0 }, 'predawn');
  ctx.restore();
}
function abS17Cam(tt) { const t = Math.min(tt, AB_FREEZE), track = { x: AB_CX(t) + 17, y: 660, zoom: 1.2 }; if (t < 135.87) return track; const u = K.ease.inOut(K.clamp((t - 135.87) / 1.5));
  return { x: K.lerp(AB_CX(135.87) + 17, 1900, u), y: K.lerp(660, 640, u), zoom: K.lerp(1.2, 1.0, u) }; }
AB_SHOTS.push({ a: 131.81, b: 1e9, ww: 3000, cam: abS17Cam, under: abS17Under, world: abS17World,
  over: (ctx, tt, cam, S) => { const t = Math.min(tt, AB_FREEZE);
    // the three glowing words trail behind the cart and drop off one by one, fading on the road
    if (t > 133.3) ['افتح', 'يا', 'سمسم'].forEach((w, i) => { const tf = [135.87, 136.63, 137.51][i], wx = (u) => AB_CX(u) - 180 - i * 80, fx = t < tf ? wx(t) : wx(tf), fy = t < tf ? 700 + 10 * Math.sin(t * 4 + i) : fallY(t, tf, tf + 0.45, 700, 880);
      const a = K.clamp((t - 133.3) / 0.4) * (t < tf + 0.45 ? 1 : 1 - K.clamp((t - tf - 0.45) / 0.5)); if (a <= 0) return; const [x, y] = abP(fx, fy, cam); ctx.save(); ctx.globalAlpha = a; S.title(ctx, w, x, y, 1, { font: 'Lalezar', size: 36 }); ctx.restore(); });
    abS17Home(ctx, t, cam);
    if (t > 136.63) { const [x, y] = abP(2250, 620, cam); S.title(ctx, '?', x, y, K.clamp((t - 136.63) / 0.6), { size: 120, glow: '#ffd36a' }); }
    if (tt >= AB_FREEZE && tt < AB_FREEZE + 0.7) { const [x, y] = abP(2250, 800, cam); S.emphasis(ctx, x, y, 200, K.clamp((tt - AB_FREEZE) / 0.7), { rect: [0, 0, 1000, 1230], word: '', seed: 17 }); }
    if (tt > 139.0) S.title(ctx, 'THE END', 500, 520 - 12 * K.clamp((tt - 139.0) / 3.9), K.clamp((tt - 139.0) / 0.9), { size: 120, align: 'center' }); } });
