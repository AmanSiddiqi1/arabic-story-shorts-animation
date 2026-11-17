// ===== AN-045: Market B (S9 the strange rule, S10 the imagined treasure, S11 the sale, S12 the walk home) =====
const A45_SETB = { w: 1800, palace: false, seed: 4,
  houses: [{ x0: -10, x1: 300, top: 480, col: 1, windows: [[180, 570, 80, 96]] }, { x0: 308, x1: 640, top: 520, col: 2, windows: [[350, 570, 78, 92], [530, 570, 78, 92]] },
    { x0: 648, x1: 980, top: 470, col: 0, door: [690, 780, 650, 'round'], windows: [[860, 570, 80, 96]] }, { x0: 988, x1: 1300, top: 510, col: 1, windows: [[1030, 570, 78, 92], [1190, 570, 78, 92]] },
    { x0: 1308, x1: 1810, top: 440, col: 2, door: [1565, 1715, 600, 'round'], windows: [[1360, 560, 90, 100]] }],
  stalls: [{ x: 860, kind: 'jars', cols: [C.blue, C.yellow] }, { x: 1180, kind: 'fruit', cols: [C.yellow, C.blue] }], props: [['crate', 500, { w: 180, top: 800 }]] };
const A45_CRB = [500, 800], A45_SIGNX = 640, A45_ONB = [770, 860, 950];
function a45SetB(ctx, t, cam, door = 0) { skyCycle(ctx, 0.3, { t, w: 1800, hills: false }); palmTree(ctx, 1000, 520, { h: 340, t, s: 0.9 });
  marketStreet(ctx, { ...A45_SETB, sky: false, t, doors: [0, door], camX: cam.x - 500 / cam.zoom });
  if (door > 0) { ctx.save(); ctx.globalAlpha = 0.55 * door; ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.4); ctx.beginPath(); ctx.ellipse(1640, 800, 140, 200, 0, 0, 7); ctx.fill(); ctx.restore(); } }
const a45Onlooker = (i, o) => ({ ...A45_CROWD[[0, 1, 3][i]], x: A45_ONB[i], y: 900, seed: 51 + i, ...o });

// ---------- S9 (84.6-98.7) ----------
const A45_TX9 = (t) => kfn(t, [[85.6, -120], [87.5, 380], [87.64, 380], [88.2, 350]]);
function a45S9(ctx, t, cam) {
  a45SetB(ctx, t, cam);
  const tx = A45_TX9(t), W = walk(A45_TX9, t, { stride: A45_ST }); W.amp *= 0.7;
  const T = a45Thief({ ...W, x: tx, seed: 11, mouth: 'smile', brow: -0.6, lid: 0.25, gaze: [0.8, 0], drop: -4 });
  let bun = { x: A45_CRB[0], y: A45_CRB[1], held: false };
  if (t < 87.64) { bun = { x: tx + 40, y: 790 - 6 * Math.abs(Math.sin(W.ph)), held: true }; T.handLW = [tx + 0, bun.y + 6]; T.handRW = [tx + 80, bun.y + 6]; }
  else if (t < 88.0) { const u = A45B(t, 87.64, 0.36); bun = { x: K.lerp(tx + 40, A45_CRB[0], u), y: K.lerp(790, A45_CRB[1], u) - 30 * Math.sin(Math.PI * u), held: true }; T.handLW = [bun.x - 40, bun.y + 6]; T.handRW = [bun.x + 40, bun.y + 6]; }
  else if (t < 89.2) { const k = A45B(t, 88.0, 0.3, 'out'); T.sq = anticipate(t, 87.85, 0.15, 0.06); T.aL = [K.lerp(0.3, 2.3, k), K.lerp(0.1, 2.6, k)]; T.aR = T.aL; T.gaze = [0.4, 0.3]; }
  const sh = a45Shoulder(T); let M;
  if (t < 87.64) M = a45MonkeyBase({ x: sh[0], y: sh[1], gaze: [0.7, 0.2], ph: t * 2, fezLag: Math.sin(t * 7) * 0.06 });
  else if (t < 88.1) { const f = A45B(t, 87.64, 0.46, 'lin'), [x, h] = hop(t, 87.64, 0.46, sh[0], 250, 80); M = a45MonkeyBase({ x, y: K.lerp(sh[1], 900, f) - h, sq: 1.1 }); }
  else { M = a45MonkeyBase({ x: 250, y: 900, sq: landSquash(t, 88.1, 0.14), gaze: [0.7, 0.2], ph: t * 2 }); if (t < 89.2) { const k = A45B(t, 88.15, 0.3); M.aL = [K.lerp(0.25, 2.3, k), K.lerp(0.1, 2.6, k)]; M.aR = M.aL; } }
  // onlookers turn, lean, react
  const on = [0, 1, 2].map((i) => { const P = a45Onlooker(i, { gaze: [Math.sin(t * 0.7 + i * 2) * 0.8, 0.1] }); const t0 = 88.48 + i * 0.13;
    if (t >= t0) { P.gaze = lookAt(a45Eye(P), [A45_CRB[0], A45_CRB[1] - 60]); P.tilt = -0.05 * A45B(t, t0, 0.3); }
    if (t >= 90.0 + i * 0.1) { P.tip = 0.05 * A45B(t, 90 + i * 0.1, 0.3) * -1; P.dir = -1; P.mouth = 'o'; }
    if (t >= 90.9 + i * 0.1 && t < 91.5) P.drop = -6 * pulse(t, 90.9 + i * 0.1, 0.3);
    if (t >= 91.56) { P.gaze = lookAt(a45Eye(P), [tx + 30, 600]); P.mouth = 'closed'; P.tip = 0; }
    if (t >= 93.68 + i * 0.12 && t < 95.6) { P.tilt = [0.15, -0.12, 0.1][i]; P.gaze = lookAt(a45Eye(P), [A45_SIGNX, 600]); if (i === 2) P.handR = [24 + 6 * Math.sin(t * 20), -228]; if (i === 1) P.mouth = 'o'; }
    return P; });
  // the strange rule
  if (t >= 89.2 && t < 90.0) { T.handR = PERSON_HANDS.cupMouth.R; T.talk = 0.9 * Math.abs(Math.sin(t * 10)); T.brow = -0.7; }
  if (t >= 90.0 && t < 91.5) { T.handL = PERSON_HANDS.palmsUp.L; T.handR = PERSON_HANDS.palmsUp.R; T.talk = 0.5 * Math.abs(Math.sin(t * 9)); }
  if (t >= 91.56 && t < 93.1) { T.handR = PERSON_HANDS.pointUp.R; T.brow = 0.6; T.mouth = 'closed'; T.gaze = [0.6, 0]; T.lid = 0.3; }
  if (t >= 93.1 && t < 95.7) { T.handR = PERSON_HANDS.pointFwd.R; T.mouth = 'smile'; T.gaze = lookAt(a45Eye(T), [A45_SIGNX, 600]); }
  // the reach and the slap
  const reach = t >= 95.76 && t < 96.7 ? A45B(t, 95.76, 0.6) * (t < 96.56 ? 1 : 1 - A45B(t, 96.56, 0.12)) : 0;
  if (reach > 0) { on[0].x = K.lerp(A45_ONB[0], 665, reach); on[0].ph = on[0].x / 30; on[0].amp = 0.5 * Math.sin(Math.PI * reach); on[0].handLW = [K.lerp(735, 575, reach), K.lerp(800, 770, reach)]; on[0].tip = -0.06 * reach; on[0].gaze = lookAt(a45Eye(on[0]), [560, 770]); on[0].mouth = 'o'; }
  if (t >= 96.56 && t < 97.85) { T.handRW = [480, 742 + 4 * Math.sin(t * 40) * (t < 96.7 ? 1 : 0)]; const w = Math.sin((t - 96.7) * 14); T.handL = [-44 + 12 * w, -205]; T.brow = 0.6; T.mouth = 'closed'; T.gaze = lookAt(a45Eye(T), a45Head(on[0])); T.tip = 0.04;
    M.handR = [40 + 12 * w, -196]; M.brow = 0.8; M.mouth = 'frown'; on[0].eyes = 'wide'; on[0].lid = null; on[0].handL = [-34, -150]; }
  if (t >= 97.9) { T.handR = [86, -112 + 8 * Math.abs(Math.sin((t - 97.9) * 12)) * (t < 98.4 ? 1 : 0)]; T.handL = [-28, -80]; T.mouth = 'smile'; T.brow = -0.7; T.gaze = lookAt(a45Eye(T), a45Head(on[0])); }
  if (T.lid < 0.9) a45Lid(T, t, 11);
  a45Sign(ctx, A45_SIGNX, 900, { rise: t < 93.08 ? 0 : A45B(t, 93.08, 0.4, 'out'), swing: swing(t, 93.5, 0.12, 1.6, 3), flip: t < 94.4 ? 0 : A45B(t, 94.4, 0.17), t });
  if (!bun.held) a45Bundle(ctx, bun.x, bun.y, { s: 0.85, wrap: 'rich', glint: t >= 88.48 && t < 89.3 ? (t - 88.48) / 0.8 : 0, tassel: swing(t, 88.0, 0.4), sq: t >= 96.56 ? impactSquash(t, 96.56, 0.9) : 1 });
  a45Draw(ctx, T); a45Monkey(ctx, M);
  if (bun.held) { a45Bundle(ctx, bun.x, bun.y, { s: 0.85, wrap: 'rich', tassel: Math.sin(t * 5) * 0.2 }); a45Hand(ctx, T.handLW[0], T.handLW[1]); a45Hand(ctx, T.handRW[0], T.handRW[1]); }
  if (t >= 96.56 && t < 97.85) a45Hand(ctx, 480, 742);
  on.forEach((P, i) => a45Draw(ctx, P));
  if (reach > 0) a45Hand(ctx, on[0].handLW[0], on[0].handLW[1], 1.15);
  return { T, M, on };
}
function a45O9(ctx, t, P, S, r, L) {
  if (a45In(t, 86.9, 88.6)) L.lab('ANOTHER MARKET', 500, 190, 86.9, 88.6, { size: 52, fill: C.yellow });
  if (a45In(t, 89.2, 90.0)) { const m = P(...a45Head(r.T)); soundArcs(ctx, m[0] + 70, m[1] + 30, 1, t); }
  if (t >= 89.96 && t < 98.7) { const k = A45B(t, 89.96, 0.35), b = P(A45_CRB[0], A45_CRB[1]), x = 300, y = 250; ctx.save(); ctx.globalAlpha = a45Fade(t, 89.96, 98.7, 0.2);
    S.box(ctx, x - 130, y - 70, 260, 140, k, { fill: C.white, lw: 7, seed: 9 });
    if (k > 0.6) { const n = t < 90.72 ? 10 : Math.max(3, Math.round(10 - 7 * A45B(t, 90.72, 0.5, 'lin'))); a45Coin(ctx, x - 60, y, 30); ctx.font = K.font(90, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = n === 3 ? C.red : C.black; ctx.fillText(String(n), x + 40, y + 6); }
    ctx.restore(); }
  if (a45In(t, 90.9, 93.0)) L.stamp('ONLY 3 COINS', 330, 400, 90.9, 93.0, 54, { rot: -0.06 });
  if (a45In(t, 97.9, 98.7)) { const h = r.T.x + 1.25 * 86, p = P(h, 900 - 1.25 * 112); a45Coin(ctx, p[0] + 60, p[1] - 140, 22); L.arr([p[0] + 60, p[1] - 110], [p[0] + 14, p[1] - 20], 97.95, 98.7, { width: 14, bend: 0 }); }
}

// ---------- S10 (98.7-105.0): what the crowd imagines ----------
function a45Cup(ctx, x, y, s) { shape(ctx, [[x - 30 * s, y - 70 * s], [x + 30 * s, y - 70 * s], [x + 20 * s, y - 30 * s], [x + 6 * s, y - 20 * s], [x + 6 * s, y - 6 * s], [x + 22 * s, y], [x - 22 * s, y], [x - 6 * s, y - 6 * s], [x - 6 * s, y - 20 * s], [x - 20 * s, y - 30 * s]], A45_GOLD, { lw: 4, seed: 95, dot: C.red, pitch: 7, rad: 0.25, da: 0.4 }); }
function a45Treasure(c, t, t0, x, y, s, grow) { const it = (k) => K.ease.back(K.clamp((t - t0 - k * 0.15) / 0.2));
  a45CoinPile(c, x, y, Math.round(10 * grow), s * 1.2 * Math.sqrt(grow)); if (it(0) > 0) star(c, x - 90 * s, y - 110 * s - 40 * it(0), 30 * s * it(0), C.blue, 0.3); if (it(1) > 0) a45Cup(c, x + 80 * s, y - 70 * s - 40 * it(1), s * 1.3 * it(1)); if (it(2) > 0) star(c, x, y - 170 * s - 40 * it(2), 26 * s * it(2), C.red); }
function a45S10(ctx, t, cam) {
  a45SetB(ctx, t, cam);
  const T = a45Thief({ x: 350, seed: 11, mouth: 'closed', lid: 0.45, brow: -0.4, gaze: [0, 0.05], handL: [-28, -80], handR: [28, -80] });
  if (t < 99.6) { const k = A45B(t, 98.86, 0.3); T.gaze = [K.lerp(0.8, 0, k), 0.05]; T.mouth = k > 0.5 ? 'closed' : 'smile'; T.tilt = 0.06 * k; }
  if (t >= 99.7) { T.handR = [30 + 4 * Math.sin(t * 25) * (t < 100.3 ? 1 : 0), -218]; T.gaze = lookAt(a45Eye(T), [790, 640]); T.tilt = 0.06; }
  if (t >= 100.5) T.handR = [28, -80];
  a45Lid(T, t, 11);
  const M = a45MonkeyBase({ x: 250, y: 900, gaze: lookAt([250, 800], [640, 420]), ph: t * 2 });
  if (t >= 104.44) { const k = A45B(t, 104.44, 0.25); M.gaze = [0, 0.1]; M.handL = [-70, -100 - 20 * k]; M.handR = [70, -100 - 20 * k]; M.mouth = 'closed'; M.brow = -0.6; M.drop = 4 * k; M.tilt = 0.12 * k; }
  const on = [0, 1, 2].map((i) => { const P = a45Onlooker(i, { gaze: lookAt([A45_ONB[i], 660], [A45_CRB[0], A45_CRB[1] - 60]), dir: -1 }); if (t >= 100.5 + i * 0.08) P.gaze = lookAt(a45Eye(P), [640, 380]);
    if (t >= 101.0) { P.tip = (0.05 + 0.025 * i) * A45B(t, 101 + i * 0.12, 0.4); P.mouth = 'o'; P.gaze = t < 102 ? lookAt(a45Eye(P), [A45_CRB[0], 760]) : lookAt(a45Eye(P), [640, 380]); }
    if (t >= 103.66) { P.eyes = 'wide'; P.lid = null; if (i === 1) P.mouth = 'open'; } return P; });
  a45Sign(ctx, A45_SIGNX, 900, { flip: 1, t });
  a45Bundle(ctx, A45_CRB[0], A45_CRB[1], { s: 0.85, wrap: 'rich' });
  a45Draw(ctx, T); a45Monkey(ctx, M); on.forEach((P) => a45Draw(ctx, P));
  // the thought cloud over the crowd
  const p = K.clamp((t - 100.5) / 0.5);
  thoughtCloud(ctx, 660, 380, 580, 380, t, { p, tail: [790, 600], bg: C.yellow, scale: 0.5, at: [500, 820], inside: (c) => {
    const op = A45B(t, 102.08, 0.9, 'lin'); a45Bundle(c, 500, 900, { s: 1.4, wrap: 'rich', open: op, contents: t < 103.06 ? 'none' : 'none' });
    if (t >= 103.06) a45Treasure(c, t, 103.06, 500, 900, 1.2, t < 103.66 ? 1 : 1 + A45B(t, 103.66, 0.4, 'out'));
    if (t >= 103.66) for (let i = 0; i < 3; i++) { const u = ((t - 103.66) * 1.5 + i / 3) % 1; star(c, 380 + i * 120, 700 - (i % 2) * 60, 26 * Math.sin(Math.PI * u), C.white); } } });
  return { T, M, on };
}
function a45O10() {}

// ---------- S11 (105.0-119.2): the buyer ----------
const A45_BX11 = (t) => kfn(t, [[105.1, 1180], [106.7, 664], [106.95, 690], [107.46, 690], [108.0, 650]]);
function a45S11(ctx, t, cam) {
  a45SetB(ctx, t, cam);
  const bx = A45_BX11(t), W = walk(A45_BX11, t, { stride: 26 * 1.3 }), B = { ...A45_BUYER, ...W, x: bx, y: 900, dir: -1, seed: 31, mouth: 'smile', gaze: [-0.9, 0.1], handL: [-18, -96], handR: [18, -96] };
  const T = a45Thief({ x: 330, seed: 11, mouth: 'smile', brow: -0.6, lid: 0.25, gaze: lookAt([330, 650], [bx, 640]), handL: [-28, -80], handR: [28, -80] });
  const M = a45MonkeyBase({ x: 230, y: 900, gaze: lookAt([230, 800], [bx, 650]), ph: t * 2 });
  let bun = { x: A45_CRB[0], y: A45_CRB[1], s: 0.85 }, hug = false, inArms = false;
  // onlookers drift out to the right
  const on = [0, 1, 2].map((i) => { const x = kfn(t, [[107.4 + i * 0.15, A45_ONB[i]], [108.9 + i * 0.15, A45_ONB[i] + 700]], 'in'); return a45Onlooker(i, { x, ...walk((tt) => kfn(tt, [[107.4 + i * 0.15, A45_ONB[i]], [108.9 + i * 0.15, A45_ONB[i] + 700]], 'in'), t, { stride: 30 }), gaze: [1, 0] }); });
  if (t >= 106.7 && t < 107.2) { B.brow = -0.7; B.eyes = 'wide'; B.lid = null; B.gaze = lookAt(a45Eye(B), [500, 760]); }
  if (t >= 107.02 && t < 107.45) B.handR = [30, -232];
  if (t >= 107.46) { B.gaze = lookAt(a45Eye(B), [500, 760]); B.noBlink = true; }
  if (t >= 108.14 && t < 109.7) { B.tip = 0.12 * A45B(t, 108.14, 0.3); }
  if (t >= 108.94 && t < 109.64) { B.handRW = [565 + 12 * Math.sin((t - 108.94) * 10), 770]; T.handRW = [500, 700]; T.gaze = lookAt(a45Eye(T), [565, 770]); T.mouth = 'closed'; T.brow = 0.2; }
  if (t >= 109.64 && t < 111.56) { B.tip = 0; B.brow = -0.7; B.mouth = 'smile'; B.drop = -4; B.lean = 0.05 * Math.sin((t - 109.64) * 4); B.noBlink = false;
    if (t > 110.3 && t < 110.9) { T.gaze = lookAt(a45Eye(T), [230, 790]); M.gaze = lookAt([230, 790], a45Eye(T)); M.mouth = 'smirk'; T.mouth = 'smile'; } }
  if (t >= 111.56 && t < 114.34) { B.handR = PERSON_HANDS.chin.R; B.gaze = look(t, a45Eye(B), [[111.56, [700, 400]], [111.9, [620, 330]], [112.2, [780, 340]], [112.5, [700, 380]]], 0.07); }
  if (t >= 114.34 && t < 115.46) { const c = Math.sin((t - 114.34) * 24); B.handL = [-8 + c * 8, -130]; B.handR = [8 - c * 8, -126]; B.lid = t < 114.6 ? 1 : null; B.mouth = 'smile'; B.drop = 6 * pulse(t, 115.0, 0.35); }
  // payment and handover
  const coins = []; if (t >= 115.46 && t < 116.6) { B.handRW = [610, 760]; T.handRW = [420, 770]; T.gaze = lookAt(a45Eye(T), [420, 770]); B.gaze = lookAt(a45Eye(B), [420, 770]);
    for (let i = 0; i < 3; i++) { const u = K.clamp((t - 115.46 - i * 0.3) / 0.28); if (u > 0) coins.push(u < 1 ? [K.lerp(610, 420, u), 760 - 60 * Math.sin(Math.PI * u)] : [420 + (i - 1) * 6, 768 - i * 4]); } }
  if (t >= 116.36) { const u = A45B(t, 116.36, 0.6); bun = { x: K.lerp(A45_CRB[0], 590, u), y: K.lerp(A45_CRB[1], 830, u) - 20 * Math.sin(Math.PI * u), s: 0.8 }; inArms = true;
    if (t < 117.2) { T.handLW = [bun.x - 40, bun.y - 30]; T.handRW = [bun.x + 30, bun.y - 30]; T.tip = 0.2 * pulse(t, 116.36, 0.9); }
    B.handLW = [bun.x + 44, bun.y - 30 + 6 * pulse(t, 116.9, 0.3)]; B.handRW = [bun.x - 40, bun.y - 30 + 6 * pulse(t, 116.9, 0.3)]; B.gaze = lookAt(a45Eye(B), [bun.x, bun.y - 60]); B.mouth = 'smile'; }
  if (t >= 117.3 && t < 118.0) { B.handRW = [bun.x, bun.y - 100]; T.handR = PERSON_HANDS.pointFwd.R; T.handRW = null; T.handLW = null; T.mouth = 'closed'; T.brow = 0.4; T.gaze = lookAt(a45Eye(T), a45Head(B)); if (t > 117.72) { B.handRW = [bun.x - 40, bun.y - 30]; B.gaze = lookAt(a45Eye(B), [A45_SIGNX, 600]); B.drop = -6 * pulse(t, 117.72, 0.3); } }
  if (t >= 118.82) { hug = true; B.lid = 1; B.tilt = -0.12; bun = { x: bx - 6, y: 840, s: 0.8 }; B.handLW = [bx + 46, 760]; B.handRW = [bx - 46, 760]; }
  if (t >= 118.0) { T.handR = [28, -80]; T.mouth = 'smile'; T.brow = -0.6; T.gaze = lookAt(a45Eye(T), [bun.x, bun.y - 60]); }
  if (T.lid < 0.9) a45Lid(T, t, 11); if (B.lid == null && !B.noBlink) a45Lid(B, t, 31);
  a45Sign(ctx, A45_SIGNX, 900, { flip: 1, t });
  if (!inArms) a45Bundle(ctx, bun.x, bun.y, { s: bun.s, wrap: 'rich', glint: t >= 108.14 && t < 108.9 ? (t - 108.14) / 0.76 : 0 });
  on.forEach((P) => { if (P.x < 1500) a45Draw(ctx, P); });
  a45Draw(ctx, T); a45Monkey(ctx, M); a45Draw(ctx, B);
  if (inArms) { a45Bundle(ctx, bun.x, bun.y, { s: bun.s, wrap: 'rich', tassel: Math.sin(t * 4) * 0.2 }); if (B.handLW) a45Hand(ctx, B.handLW[0], B.handLW[1], 1.3); if (B.handRW) a45Hand(ctx, B.handRW[0], B.handRW[1], 1.3); }
  coins.forEach(([x, y]) => a45Coin(ctx, x, y, 14));
  if (t >= 109.64 && t < 111.4) heart(ctx, 500, 640 - 30 * A45B(t, 109.64, 0.5), 30 * K.ease.back(K.clamp((t - 109.64) / 0.3)));
  // the buyer's thought cloud: 3 coins -> the bundle -> 30 coins
  const cp = t < 114.34 ? K.clamp((t - 111.56) / 0.5) : 1 - K.clamp((t - 114.34) / 0.35);
  if (t >= 111.56 && t < 114.8) thoughtCloud(ctx, 640, 330, 540, 370, t, { p: cp, tail: [a45Head(B)[0] + 10, a45Head(B)[1] - 60], bg: C.yellow, scale: 0.6, at: [500, 820], inside: (c) => {
    for (let i = 0; i < 3; i++) if (t > 113.06 + i * 0.15) a45Coin(c, 230 + i * 50, 860 - K.clamp((t - 113.06 - i * 0.15) / 0.12) * 0, 26);
    if (t > 113.2) { seg(c, 400, 860, 540, 860, 14, C.red, 4); shape(c, [[540, 830], [590, 860], [540, 890]], C.red, { lw: 4 }); }
    if (t < 113.6) a45Bundle(c, 720, 930, { s: 1.0, wrap: 'rich' });
    else { const g = A45B(t, 113.6, 0.6, 'out'); a45CoinPile(c, 720, 960, Math.round(3 + 27 * g), 1.4); c.font = K.font(90, BF, 400); c.textAlign = 'center'; c.fillStyle = C.red; c.lineWidth = 10; c.strokeStyle = C.black; const n = String(Math.round(3 + 27 * g)); c.strokeText(n, 880, 760); c.fillText(n, 880, 760); } } });
  return { T, M, B };
}
function a45O11(ctx, t, P, S, r, L) {
  if (a45In(t, 107.02, 108.6)) { const h = P(...a45Head(r.B)); L.arr([h[0] + 120, h[1] - 200], [h[0] + 40, h[1] - 60], 107.02, 108.6, { width: 18, bend: -0.2 }); L.lab('BUYER', Math.min(h[0] + 150, 880), h[1] - 240, 107.02, 108.6, { size: 50 }); }
  if (a45In(t, 118.02, 119.2)) L.stamp('NOT CHECKED', 440, 240, 118.02, 119.4, 58, { rot: -0.08, icon: (c, x, y) => { a45EyeIcon(c, x, y, 30); seg(c, x - 30, y + 26, x + 30, y - 26, 7, C.red, 2); } });
}

// ---------- S12 (119.2-125.3): the walk home ----------
const A45_BX12 = (t) => kfn(t, [[119.38, 650], [124.7, 1560], [125.1, 1640]], 'lin');
function a45S12(ctx, t, cam) {
  const door = A45B(t, 120.84, 0.6); a45SetB(ctx, t, cam, door);
  const bx = A45_BX12(t), W = walk(A45_BX12, t, { stride: 26 * 1.3 }), B = { ...A45_BUYER, ...W, x: bx, y: 900, seed: 31, mouth: 'smile', sq: 1.03, gaze: [0.9, -0.1], brow: -0.5 };
  const hp = t >= 124.7 ? K.clamp((t - 124.7) / 0.4) : 0; const by = 900 - 40 * Math.sin(Math.PI * hp);
  B.y = by; if (t >= 125.1) B.sq = landSquash(t, 125.1, 0.12);
  const bunY = 820 - 8 * Math.abs(Math.sin(W.ph - 0.4)) + (by - 900); B.handLW = [bx - 44, bunY - 30]; B.handRW = [bx + 44, bunY - 30];
  const tx = kfn(t, [[120.5, 330], [121.3, 60]], 'in'), T = a45Thief({ x: tx, ...walk((tt) => kfn(tt, [[120.5, 330], [121.3, 60]], 'in'), t, { stride: A45_ST }), x: tx, seed: 11, mouth: 'smile', gaze: [-0.6, 0.4] });
  if (t < 120.6) { T.handR = PERSON_HANDS.moustache.R; T.lid = 0.6; T.mouth = 'o'; }
  const M = a45MonkeyBase({ x: tx - 100, y: 900, gaze: [-0.5, 0.2], handL: [-8 + 8 * Math.sin(t * 24), -130], handR: [8 - 8 * Math.sin(t * 24), -126], ph: t * 2 }); if (t > 120.6) M.lift = 30 * Math.abs(Math.sin(t * 9));
  a45Lid(B, t, 31); if (T.lid < 0.9) a45Lid(T, t, 11);
  if (tx > -100) { a45Draw(ctx, T); a45Monkey(ctx, M); if (t < 120.6) { a45Coin(ctx, tx + 24, 900 - 1.25 * 172, 12); } }
  a45Draw(ctx, B); a45Bundle(ctx, bx, bunY, { s: 0.8, wrap: 'rich', tassel: Math.sin(W.ph) * 0.3 }); a45Hand(ctx, B.handLW[0], B.handLW[1], 1.3); a45Hand(ctx, B.handRW[0], B.handRW[1], 1.3);
  // the profit cloud trails above him (a beat late)
  const lx = A45_BX12(t - 0.1), cp = K.clamp((t - 122.22) / 0.5);
  if (t >= 122.22) thoughtCloud(ctx, lx - 20, 330, 440, 300, t, { p: cp, tail: [lx, 600], bg: C.yellow, scale: 0.45, at: [500, 800], inside: (c) => {
    const k = A45B(t, 123.3, 0.5); person(c, { ...A45_BUYER, x: 360, y: 950, s: 1.15, mouth: 'smile', handLW: [460 - 20 * k, 760], handRW: [470 - 20 * k, 780] });
    person(c, { costume: 'caliph', x: 650, y: 950, s: 1.15, dir: -1, mouth: 'smile', handRW: [560, 780] }); a45Bundle(c, K.lerp(470, 560, k), 830, { s: 0.7, wrap: 'rich' });
    for (let i = 0; i < 6; i++) { const u = K.clamp((t - 124.08 - i * 0.07) / 0.35); if (u > 0) a45Coin(c, K.lerp(650, 360 + (i - 2.5) * 16, u), K.lerp(700, 800, u) - 120 * Math.sin(Math.PI * u), 18); }
    if (t >= 124.68) a45CoinPile(c, 250, 960, Math.round(6 + 24 * A45B(t, 124.68, 0.5, 'out')), 1.6); } });
  return { B };
}
function a45O12() {}
