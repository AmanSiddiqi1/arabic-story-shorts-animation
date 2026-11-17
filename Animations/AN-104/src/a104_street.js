// ===== AN-104 the city street (S1, S2, S7-S11) and the ruin (S12, S13 street part) on one 2400-wide marketStreet strip =====
const A104_SW = 2400;
const A104_POTS = { x: 220, w: 240, kind: 'pots', cols: [C.red, C.white] }, A104_FRUIT = { x: 480, w: 240, kind: 'fruit', cols: [A104_GREEN, C.white] };
const A104_GOLDS = { x: 1760, w: 300, kind: 'jars', cols: [C.yellow, C.white] }, A104_MINE = { x: 1430, w: 300 };
const A104_STEPX = 2010;   // palace steps begin (anchors: steps 2030..2270 at y 872)
const a104StepY = (x) => (x > A104_STEPX ? K.lerp(900, 872, K.clamp((x - A104_STEPX) / 30)) : 900);
// time of day for the S9 time-lapse (skyCycle u): three days, noon to noon
const a104U = (t) => (t < 97.8 ? 0.3 : t < 101.4 ? kfn(t, [[97.8, 0.3], [101.4, 3.3]], 'inOut') : 3.3);
function a104LookAt(t) { if (t >= 97.8 && t < 101.4) { const u = a104U(t); return u < 0.78 ? 'poor' : u < 1.78 ? 'mid' : 'rich'; } return a104StrangerLook(t); }

// ---------- S1: the walk through the city ----------
const a104X1 = (t) => kfn(t, [[0, -80], [2.0, 150], [3.5, 290], [5.0, 290], [6.4, 470], [7.0, 520], [8.55, 525], [8.86, 545], [11.6, 850]], 'lin');
function a104S1(t) {
  const P = a104Mk('poor', { y: 900, dir: 1, mouth: 'frown', brow: -0.4, lid: 0.35 }); a104Walk(P, a104X1, t, 0.7);
  const pops = [2.16, 2.5, 2.84]; let sq = 1; for (const p0 of pops) sq *= landSquash(t, p0, 0.06, 10);
  P.sq = sq; P.tip = 0.06 + 0.06 * K.clamp((t - 2.16) / 0.7);
  P.gaze = gazePlan(t, [[0, [0.3, 0.7]], [0.94, [-0.8, -0.45]], [1.15, [0, -0.95]], [1.38, [0.85, -0.45]], [1.6, [0.3, 0.7]]], 0.07);
  const keeperH = [A104_POTS.x, 690];
  if (t >= 3.4 && t < 5.6) { P.gaze = lookAt(a104Head(P), keeperH); P.brow = -0.6; P.mouth = 'o'; P.lid = 0.1; const k = a104Env(t, 3.7, 5.0, 0.25); P.handL = a104L2([-25, -58], PERSON_HANDS.palmsUp.L, k); P.handR = a104L2([37, -58], PERSON_HANDS.palmsUp.R, k); }
  if (t >= 5.0 && t < 6.0) { P.drop = 6 * a104E(t, 5.0, 0.3) * (1 - a104E(t, 5.6, 0.4)); P.lid = Math.max(0.35, pulse(t, 5.15, 0.45)); P.mouth = 'frown'; }
  if (t >= 6.0 && t < 7.7) { P.gaze = lookAt(a104Head(P), [A104_FRUIT.x, 770]); P.wet = true; P.mouth = 'o'; P.handR = a104Tr(t, [[6.2, 7.6, [10, -96]]], null); }
  if (t >= 7.0 && t < 8.6) { const k = a104Env(t, 7.05, 8.5, 0.25); P.handR = a104L2([37, -58], [46, -84], k); P.handL = a104L2([-25, -58], [-40, -80], k); P.brow = -0.7; P.gaze = [0.35, 0.8]; P.lid = Math.max(0.35, pulse(t, 7.7, 0.5)); P.mouth = 'frown'; }
  if (t >= 8.86) { P.gaze = [0.3, 0.75]; }
  return a104Lid(P, t);
}
function a104Keeper(t) {
  const P = a104Mk('keeper', { x: A104_POTS.x, y: 842, dir: 1, mouth: 'closed', gaze: [0.2, 0.8] });
  P.handR = [30 + 8 * Math.sin(t * 2.3), -70]; P.handL = [-30, -70];
  if (t >= 3.3 && t < 6.2) { const S = a104S1(t); P.gaze = lookAt([P.x, 700], a104Head(S)); P.lid = 0.5; P.mouth = 'frown';
    P.look = 0.45 * Math.sin((t - 4.2) * 11) * a104Env(t, 4.2, 5.0, 0.1); P.handR = a104Tr(t, [[4.55, 5.6, (tt) => [72 + 22 * Math.sin((tt - 4.6) * 12), -120]]], P.handR); }
  return a104Lid(P, t);
}
// a moth flutters off from the empty pocket
function a104Moth(ctx, x, y, t, p) { if (p <= 0 || p >= 1) return; const mx = x + 40 * p + 10 * Math.sin(p * 20), my = y - 140 * p; const f = Math.sin(t * 40); ctx.save(); ctx.translate(mx, my); ctx.globalAlpha = 1 - p * 0.5; for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 16, -8 - 6 * f], [sd * 14, 6]], '#c9bfa6', { lw: 2.5, seed: 450 }); ctx.restore(); }

// ---------- S2: the guests and the mansion ----------
const A104_G2 = [[[11.6, 1840], [14.6, 2150]], [[11.6, 1740], [15.0, 2150]], [[11.6, 1640], [14.4, 1930], [15.4, 1930], [17.6, 2010], [18.66, 2150]]];
const a104X2 = (t) => kfn(t, [[11.6, 1460], [11.95, 1482], [15.44, 1482], [17.6, 1920], [18.66, 2045]], 'lin');
function a104Guest2(i, t) {
  const name = ['guestA', 'guestB', 'guestC'][i], xf = (tt) => kfn(tt, A104_G2[i], 'lin'), P = a104Mk(name, { dir: 1, s: 0.8 });
  a104Walk(P, xf, t, i === 2 ? 0.7 : 1, 24); P.y = a104StepY(P.x);
  const end = A104_G2[i][A104_G2[i].length - 1][0]; P.alpha = 1 - K.clamp((t - end) / 0.4); P.s = 0.8 * (1 - 0.06 * K.clamp((t - end) / 0.4));
  const ph = (t * 0.6 + i * 0.4) % 1; P.talk = i !== 2 && ph < 0.35 ? 0.6 : 0; P.gaze = i === 0 ? [-0.8, -0.2] : [0.9, -0.2];
  if (i === 1 && t > 12.6 && t < 13.3) { P.mouth = 'open'; P.lid = 0.8; }
  if (i === 2 && t >= 14.4 && t < 15.4) { const k = a104Env(t, 14.4, 15.4, 0.2); P.handL = a104L2([-25, -58], [-24, -214], k); P.handR = a104L2([37, -58], [26, -216], k); P.gaze = [0.2, -0.9]; }
  return P;
}
function a104S2(t) {
  const P = a104Mk('poor', { y: 900, dir: 1, mouth: 'frown', brow: -0.5, lid: 0.1 }); a104Walk(P, a104X2, t, 0.8); P.tip = 0.12;
  P.gaze = gazePlan(t, [[0, [0.4, 0.6]], [11.65, [0.95, -0.25]], [14.3, [0.6, -0.8]], [15.1, [0.95, -0.25]]], 0.07); P.tip = t < 12.4 ? 0.12 - 0.08 * pulse(t, 11.6, 0.8) : 0.12;
  if (t >= 15.0 && t < 15.44) { P.gaze = gazePlan(t, [[0, [-0.95, -0.1]], [15.2, [0.95, -0.1]]], 0.06); P.handL = [-16, -150]; P.handR = [18, -150]; P.sq = 0.94; }
  if (t >= 15.44 && t < 18.66) { P.amp *= 1.25; P.y -= 7 * Math.abs(Math.sin(P.ph)); P.sq = 1.03; P.drop = -4; P.tip = 0.04; P.mouth = 'closed';
    P.gaze = gazePlan(t, [[0, [0.95, -0.2]], [16.2, [-0.6, -0.3]], [16.5, [0.95, -0.2]], [17.4, [0.3, -0.9]], [17.7, [0.95, -0.2]]], 0.07); }
  if (t >= 16.78 && t < 19.2) { P.mouth = 'smile'; P.wet = true; }
  if (t >= 18.66) { const [hx, lift] = hop(t, 18.66, 0.4, 2045, 2112, 22); P.x = hx; P.y = a104StepY(hx) - lift; P.amp = 0; P.sq = landSquash(t, 19.06, 0.1); if (t > 19.0) P.gaze = [0, 0.05];
    if (t > 19.1) { const k = K.clamp((t - 19.1) / 0.45); P.x = K.lerp(2112, 2150, k); P.alpha = 1 - k; } }
  return a104Lid(P, t);
}
const a104PalaceDoor = (t) => (t < 30 ? K.clamp(kfn(t, [[12.86, 0], [13.6, 1.05], [13.85, 1], [19.6, 1], [20.25, 0]]) + (t > 20.25 ? -0.04 * Math.exp(-(t - 20.25) * 6) * Math.sin((t - 20.25) * 20) : 0)) : t < 83.3 ? 0 : kfn(t, [[83.3, 0], [83.6, 0.35], [84.5, 0.35], [84.9, 0]]));

// ---------- S7: out with the dish, the goldsmith ----------
const a104X7 = (t) => kfn(t, [[83.3, 2150], [84.3, 2118], [84.55, 2110], [87.62, 1575]], 'lin');
function a104S7(t) {
  const P = a104Mk('poor', { y: 900, dir: 1, mouth: 'smile', brow: -0.2, lid: 0.15 }); a104Walk(P, a104X7, t, 1); P.y = a104StepY(P.x); P.tip = 0.02;
  P.dir = t < 84.3 ? 1 : -1; P.alpha = K.clamp((t - 83.35) / 0.3);
  P.handL = [-6, -102]; P.handR = [14, -94];   // hugging the dish under the robe
  P.gaze = t < 84.2 ? [0.6, -0.7] : [-0.9, 0.1]; if (t >= 83.6 && t < 84.3) P.drop = 8 * pulse(t, 83.7, 0.5);
  if (t >= 85.06 && t < 85.8) { P.eyes = 'wide'; P.lid = null; P.gaze = gazePlan(t, [[0, [0.2, 0.9]], [85.25, [-0.9, -0.2]], [85.45, [0.9, -0.2]], [85.65, [-0.9, 0.1]]], 0.06); }
  if (t >= 87.62) { P.amp = 0; P.x = 1575; P.dir = -1; P.gaze = lookAt(a104Head(P), [1790, 700]);
    if (t < 88.6) { P.handRW = a104L2(a104Pt(P, 14, -94), [1690, 772], a104E(t, 87.8, 0.4)); }
    if (t >= 89.4) { P.mouth = t < 90.6 ? 'o' : 'smile'; P.eyes = t >= 89.5 && t < 90.6 ? 'wide' : undefined; P.lid = P.eyes ? null : 0.1; P.gaze = lookAt(a104Head(P), [1650, 760]); }
    if (t >= 90.6) { const k = a104Env(t, 90.6, 91.3, 0.15); P.handLW = a104L2(a104Pt(P, -20, -70), [1615, 768], k); P.handRW = a104L2(a104Pt(P, 30, -70), [1680, 768], k); } }
  return a104Lid(P, t);
}
function a104Buyer(t) {
  const P = a104Mk('buyer', { x: 1800, y: 845, dir: -1, mouth: 'closed', lid: 0.35 });
  P.gaze = t > 86 ? lookAt([1800, 690], [1575, 700]) : [-0.4, 0.6];
  if (t >= 88.4 && t < 89.5) { const k = a104Env(t, 88.4, 89.5, 0.2); P.handRW = a104L2([1760, 760], [1772, 668], k); P.handLW = a104L2([1830, 760], [1820, 672], k); P.mouth = 'open'; P.brow = -1; P.eyes = t > 88.95 ? 'wide' : undefined; P.lid = P.eyes ? null : 0.3; P.gaze = [-0.3, 0.6]; }
  if (t >= 89.48 && t < 90.5) { P.handRW = [1660 + 10 * Math.sin(t * 20), 755]; P.gaze = lookAt([1800, 690], [1650, 770]); P.mouth = 'smile'; }
  return a104Lid(P, t);
}
// where the dish is in S7: under the robe, on the counter, in the goldsmith's teeth, set aside
function a104Dish7(ctx, t, S, B) {
  if (t < 88.2) { if (t >= 85.06 && t < 85.5) { const q = a104Pt(S, 4, -100); a104Glint(ctx, q[0], q[1], 22, pulse(t, 85.06, 0.4)); } return; }
  let x = 1700, y = 782, tilt = 0;
  if (t >= 88.5 && t < 89.5) { const k = a104Env(t, 88.5, 89.5, 0.2); x = K.lerp(1700, 1795, k); y = K.lerp(782, 700, k); tilt = -0.9 * k; }
  if (t >= 89.5) { x = 1860; y = 782; }
  a104Dish(ctx, x, y, { s: 0.7, tilt, glint: ((t * 0.6) % 2) / 0.9 });
}

// ---------- S8: debts, goods, the stall ----------
function a104S8(t) {
  const P = a104Mk('poor', { y: 900, dir: -1, mouth: 'smile', brow: -0.2, lid: 0.15 });
  const xf = (tt) => kfn(tt, [[92.9, 1575], [93.8, 1530], [96.18, 1530], [96.9, 1505]], 'lin'); a104Walk(P, xf, t, 1);
  P.tip = t < 91.42 ? 0.1 : t < 92.18 ? 0.06 : 0.02; P.sq = 1 + 0.04 * pulse(t, 92.7, 0.6);
  P.handR = [26, -70]; P.gaze = t < 92.66 ? lookAt(a104Head(P), [P.x + 150, 680]) : [-0.9, 0.1];
  if (t < 92.6) { P.handRW = [P.x + 95, 700 + (t > 91.9 ? 50 : 0)]; }
  if (t >= 92.66 && t < 93.7) { P.handR = [30, -76 + 6 * Math.sin((t - 92.7) * 12)]; P.gaze = [0.3, 0.7]; }
  if (t >= 93.82 && t < 95.3) { P.handRW = a104Tr(t, [[93.9, 94.6, [1430, 770]]], a104Pt(P, 30, -76)); P.gaze = lookAt(a104Head(P), [1360, 700]); }
  if (t >= 96.18 && t < 96.95) { P.handLW = [1450, 812]; P.handRW = [1470, 812]; P.tip = 0.08; P.gaze = [-0.8, 0.4]; }
  if (t >= 97.2) { P.handR = PERSON_HANDS.wave.R; P.gaze = [0.9, -0.1]; P.dir = 1; P.mouth = 'smile'; }
  return a104Lid(P, t);
}
const A104_GOODS = [[94.0, 'bolt', C.red], [94.4, 'sack'], [94.8, 'jar'], [95.2, 'bolt', C.blue]];
const a104CartX = (t) => kfn(t, [[96.18, 1390], [96.9, 1420]]);
function a104Keeper8(t) {
  const P = a104Mk('keeper', { x: 1330, y: 900, dir: 1, mouth: 'smile', lid: 0.3 });
  const xf = (tt) => kfn(tt, [[91.2, 1150], [93.0, 1330], [96.4, 1330], [97.6, 1120]], 'lin'); a104Walk(P, xf, t, 1, 24);
  P.gaze = lookAt([P.x, 700], [1530, 700]);
  if (t >= 93.82 && t < 95.4) { P.drop = 14 * (pulse(t, 94.4, 0.5) + pulse(t, 95.0, 0.5)); P.handR = PERSON_HANDS.chest.R; P.lid = 0.6; }
  if (t > 96.4) { P.dir = -1; P.gaze = [-0.9, 0]; }
  return a104Lid(P, t);
}
function a104Cart8(ctx, t) {
  if (t < 91.2 || t >= 97.8) return; const x = t < 93.0 ? kfn(t, [[91.2, 1230], [93.0, 1390]], 'lin') : a104CartX(t); const bed = a104Cart(ctx, x, 900, 0.9);
  const items = []; for (const [t0, k, c] of A104_GOODS) if (t >= t0) items.push(c ? { kind: k, col: c } : k);
  if (items.length) { const last = A104_GOODS[items.length - 1][0], sq = 1 - 0.18 * Math.exp(-(t - last) * 12) * Math.cos((t - last) * 20); ctx.save(); ctx.translate(x, bed); ctx.scale(1 + (1 - sq) * 0.5, sq); packLoad(ctx, items, 0, 0, 0.55); ctx.restore(); }
}

// ---------- S9 and S10: the time-lapse and the memory ----------
function a104MyStall(ctx, t) {
  if (t < 91.0 || t >= 120) return;   // closed stall drawn in the bake until he opens it
  const lvl = t < 96.95 ? 0 : t < 98.9 ? 1 : t < 99.85 ? 2 : 3, lt = [0, 96.95, 98.9, 99.85][lvl], k = lvl ? K.ease.back(K.clamp((t - lt) / 0.35)) : 1;
  const w = [300, 300, 360, 420][lvl], cols = lvl >= 3 ? [A104_GREEN, C.yellow] : [A104_GREEN, C.white];
  ctx.save(); ctx.translate(A104_MINE.x, 900); ctx.scale(1, K.lerp(0.85, 1, k)); ctx.translate(-A104_MINE.x, -900);
  marketStall(ctx, { x: A104_MINE.x, w, kind: lvl >= 1 ? 'cloth' : 'empty', state: lvl ? 'open' : 'closed', cols });
  if (lvl >= 2) packLoad(ctx, ['sack', { kind: 'bolt', col: C.yellow }], A104_MINE.x - w / 2 - 40, 900, 0.6);
  if (lvl >= 3) { packLoad(ctx, ['jar', 'jar'], A104_MINE.x + w / 2 + 40, 900, 0.6); a104CoinPile(ctx, A104_MINE.x + 90, 768, 6, 9); }
  ctx.restore();
}
function a104S9(t) {
  const look = a104LookAt(t), P = a104Mk(look, { x: 1520, y: 900, dir: -1, mouth: 'smile', brow: 0, lid: 0.2 });
  P.gaze = [0.6, 0.4]; P.handR = [30, -70];
  if (t < 102.08) { const b = (t * 1.3) % 1; P.drop = 10 * pulse(b, 0.2, 0.5); P.gaze = lookAt(a104Head(P), [t < 101 ? 1300 : 1700, 720]); P.handRW = a104Tr(t, [[100.7, 101.2, [1460, 775]], [101.4, 101.9, [1460, 775]]], null); }
  if (t >= 102.08 && t < 103.74) { const xf = (tt) => kfn(tt, [[102.08, 1520], [102.8, 1600]]); a104Walk(P, xf, t, 1); P.dir = 1; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.sq = 1.04; P.lid = 0.4;
    P.gaze = gazePlan(t, [[0, [-0.9, -0.3]], [102.9, [-0.4, -0.8]], [103.3, [0.6, -0.3]]], 0.3); }
  if (t >= 103.74) { const xf = (tt) => kfn(tt, [[103.74, 1600], [104.3, 1640]]); P.x = xf(t); P.dir = 1; P.sit = settleTo(t, 104.0, 0, 1, 0.5, 0.08); P.seat = 'bench'; P.lid = 0.4; P.gaze = lookAt([P.x, 720], [1560, 820]);
    const tray = [1580, 846], bite = a104Pt(P, 4, a104HdY(P) + 30);
    if (t >= 104.3) { const k = a104E(t, 104.3, 0.4); P.handRW = a104L2(tray, [K.lerp(tray[0], bite[0], 0.75), K.lerp(tray[1], bite[1], 0.75)], k); }
    if (t >= 104.6) { P.gaze = gazePlan(t, [[0, [-0.4, 0.5]], [104.9, [-0.6, -0.75]]], 0.6); P.mouth = t < 105.4 ? 'smile' : 'closed'; P.lid = 0.25; P.brow = -0.3; }
    if (t >= 106.5) { P.gaze = [-0.5, -0.8]; P.wet = t > 107.6; P.mouth = t > 107.74 ? 'smile' : 'closed';
      if (t >= 108.94) { P.handRW = undefined; P.handR = PERSON_HANDS.chest.R; }
      if (t >= 109.58) { const k = a104E(t, 109.58, 0.45); P.sit = 1 - k; P.sq = anticipate(t, 109.5, 0.15, 0.06); P.brow = 0.3; P.mouth = 'closed'; P.handR = null; P.gaze = [0.9, -0.1]; } } }
  return a104Lid(P, t);
}
function a104Customers(ctx, t) {
  if (t < 97.2 || t > 103.2) return;
  const C1 = a104Mk('guestA', { s: 0.8, dir: -1 }), xf1 = (tt) => kfn(tt, [[100.3, 2000], [101.0, 1620], [101.5, 1620], [102.6, 1150]], 'lin'); a104Walk(C1, xf1, t, 1, 24);
  const C2 = a104Mk('guestB', { s: 0.8, dir: 1 }), xf2 = (tt) => kfn(tt, [[97.2, 1700], [97.6, 1610], [99.3, 1610], [99.8, 1610], [100.6, 1250], [101.2, 1300], [101.6, 1300], [102.6, 1800]], 'lin'); a104Walk(C2, xf2, t, 1, 22);
  C2.dir = t < 99.8 ? -1 : t < 101.2 ? -1 : 1; C1.gaze = [0.2, -0.1]; C2.gaze = t < 99.8 ? [-0.6, 0.2] : [0.9, 0];
  if (t > 97.4 && t < 99.4) { C2.handR = PERSON_HANDS.pointFwd.R; C2.talk = 0.5; }
  for (const [P, t0] of [[C1, 101.0], [C2, 101.25]]) { if (t >= t0 && t < t0 + 0.6) P.handRW = [1430 + (P === C1 ? 60 : 0), 770]; }
  for (const P of [C2, C1]) { if (P.x > 1050 && P.x < 2010) person(ctx, P); }
}

// ---------- S11: years later, the walk back ----------
const a104X11 = (t) => kfn(t, [[111.0, 640], [120.0, 1500]], 'lin');
function a104S11(t) {
  const P = a104Mk('old', { y: 900, dir: 1, mouth: 'smile', brow: 0.1, lid: 0.15 }); a104Walk(P, a104X11, t, 1); P.gaze = [0.95, -0.15]; P.drop = -3;
  P.handR = [40, -64];
  if (t >= 113.98 && t < 115.4) { const k = a104Env(t, 113.98, 115.4, 0.25); P.handR = a104L2([40, -64], [52, -150], k); P.gaze = lookAt(a104Head(P), a104Pt(P, 52, -150)); P.drop = 6 * pulse(t, 114.6, 0.5); }
  if (t >= 117.3 && t < 117.9) P.gaze = [-0.95, 0.1];
  if (t >= 118.38) { P.handL = PERSON_HANDS.chest.R.map((v, i) => (i ? v : -v)); P.wet = true; P.lid = 0.1; }
  return a104Lid(P, t);
}
function a104Porter11(t) {
  const P = a104Mk('porter', { y: 900, dir: 1, mouth: 'closed', lid: 0.2 }); const xf = (tt) => a104X11(tt - 0.25) - 125; a104Walk(P, xf, t, 1, 18);
  P.handLW = undefined; P.gaze = [0.9, -0.3];
  if (t >= 116.56 && t < 118.3) { P.eyes = t > 116.9 && t < 117.5 ? 'wide' : undefined; P.lid = P.eyes ? null : 0.2; P.gaze = t < 117.5 ? [0.2, -0.95] : [0.3, -0.9]; P.mouth = t > 117.5 ? 'o' : 'o'; }
  return a104Lid(P, t);
}
// the chest on the boy's shoulder (bob a beat late), lid peek 116.56-117.5
function a104PorterChest(ctx, P, t, open) { const hd = a104Head(P), bob = 3 * Math.sin(((P.ph || 0) - 0.5) * 2) * (P.amp || 0); a104Chest(ctx, hd[0] + 4, hd[1] - 30 + bob, 0.55, { open, t, rot: 0.05 * Math.sin(t * 5) * (P.amp || 0) }); }

// ---------- the street world ----------
function a104StreetWorld(ctx, t, cam) {
  const ruin = t >= 120 && t < 131.84, u = a104U(t), S9 = t >= 97.8 && t < 110.2;
  const doors = [0, a104Env(t, 10.3, 11.5, 0.3), 0, a104Env(t, 9.9, 10.9, 0.25)];
  const A = marketStreet(ctx, { w: A104_SW, palette: ruin ? 'dusk' : 'clear', palace: ruin ? 'shut' : true, shut: ruin ? 1 : 0, palaceDoor: ruin ? 0 : a104PalaceDoor(t), t, camX: cam.x - 500 / cam.zoom,
    u: S9 ? u : undefined, doors, shutters: [1, 1, ruin ? 0.2 : 1 - 0.7 * a104Env(t, 10.5, 11.4, 0.3), 1, 1, 1, ruin ? 0 : 1], windowsLit: S9 ? K.clamp(dayCycle(u).night * 1.4) : undefined });
  if (ruin) a104RuinDressing(ctx, t);
  // the keepers behind their counters
  if (t < 20.44) person(ctx, a104Keeper(t));
  if (t >= 83.3 && t < 97.8) person(ctx, a104Buyer(t));
  // stalls (static ones baked)
  const stalls = ruin ? [{ ...A104_GOLDS, state: 'closed' }] : [A104_POTS, A104_FRUIT, A104_GOLDS].concat(t < 91 || t >= 120 ? [{ ...A104_MINE, kind: 'empty', state: 'closed', cols: [A104_GREEN, C.white] }] : []);
  ctx.drawImage(bake('a104stalls' + (ruin ? 'r' : '') + (t < 91 || t >= 120 ? 'c' : 'o'), A104_SW, 1230, (c) => stalls.forEach((s) => marketStall(c, s))), 0, 0, A104_SW, 1230);
  a104MyStall(ctx, t);
  const out = {};
  if (t < 11.6) { const S = a104S1(t); a104BackScrolls(ctx, S, t, 3, [2.16, 2.5, 2.84]); a104Person(ctx, S); a104Moth(ctx, a104Pt(S, 46, -84)[0], a104Pt(S, 46, -84)[1], t, (t - 7.3) / 1.1); out.S = S; }
  else if (t < 20.44) { const G = [2, 1, 0].map((i) => a104Guest2(i, t)).filter((g) => g.alpha > 0.01); G.forEach((g) => person(ctx, g)); const S = a104S2(t); if (S.alpha == null || S.alpha > 0.01) { a104BackScrolls(ctx, S, t, 3); a104Person(ctx, S); } out.S = S;
    if (t >= 16.78) thoughtCloud(ctx, S.x + 40, 470, 230, 170, t, { p: K.clamp((t - 16.78) / 0.6) * (1 - K.clamp((t - 19.6) / 0.3)), tail: a104Head(S), inside: (c, tt) => { a104Loaf(c, 440, 700, 2.4); a104Bowl(c, 580, 730, 2.2, tt); }, scale: 0.45, at: [510, 680] }); }
  else if (t < 91.2) { const S = a104S7(t), B = a104Buyer(t); a104BackScrolls(ctx, S, t, 3); a104Person(ctx, S); a104Dish7(ctx, t, S, B); out.S = S; out.B = B;
    if (t >= 88.78 && t < 89.5) a104CoinEyes(ctx, B, a104Env(t, 89.0, 89.45, 0.08));
    const n = t < 89.5 ? 0 : t < 89.75 ? 4 : t < 90.0 ? 8 : t < 90.25 ? 12 : 15; if (n && t < 90.95) a104CoinPile(ctx, 1648, 782, n, 9);
    if (t >= 90.95) { const q = a104Pt(S, 30, -66); a104Purse(ctx, q[0], q[1], 0.55 * K.ease.back(K.clamp((t - 90.95) / 0.25)), { rot: swing(t, 90.95, 0.3) }); } }
  else if (t < 97.8) { person(ctx, a104Keeper8(t)); a104Cart8(ctx, t); const S = a104S8(t); out.S = S;
    a104DebtColumn(ctx, S, t); a104Person(ctx, S); const q = a104Pt(S, 30, -66); a104Purse(ctx, q[0], q[1], 0.55, { rot: swing(t, 92.66, 0.3) });
    if (t >= 93.9 && t < 94.6) { const c = a104L2([q[0], q[1]], [1400, 760], a104E(t, 93.9, 0.5)); a104Coin(ctx, c[0], c[1] - 40 * pulse(t, 93.9, 0.5), 9); }
    if (t >= 97.2) { const L = a104Mk('guestB', { x: kfn(t, [[97.2, 1700], [97.6, 1610]], 'lin'), y: 900, s: 0.8, dir: -1, gaze: [-0.6, 0.2] }); a104Walk(L, (tt) => kfn(tt, [[97.2, 1700], [97.6, 1610]], 'lin'), t, 1, 22); person(ctx, L); } }
  else if (t < 110.2) { const S = a104S9(t); out.S = S; a104Customers(ctx, t);
    if (t < 100.9) { const q = a104Pt(S, 18, -82); a104Scroll(ctx, q[0], q[1], 0.42 * (1 - K.clamp((t - 100.75) / 0.15)), { struck: K.clamp((t - 100.3) / 0.4), rot: 0.3 }); }
    if (t >= 103.74) { const P = a104Mk('porter', { y: 900, dir: 1, mouth: 'smile' }); const xf = (tt) => kfn(tt, [[103.74, 1250], [104.3, 1500], [104.6, 1500], [105.4, 1250]], 'lin'); a104Walk(P, xf, t, 1, 18); if (t > 104.3) P.dir = -1;
      P.handLW = t < 104.3 ? [P.x - 26, 810] : undefined; P.handRW = t < 104.3 ? [P.x + 26, 810] : undefined; if (P.x > 1240) person(ctx, P); }
    shape(ctx, ell(S.x - 2, 852, 40, 12, 18), C.red, { lw: 4, seed: 451, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.5 });   // cushion
    if (t >= 103.74) { const k = a104E(t, 103.9, 0.4); const tx = K.lerp(1480, 1580, k), ty = K.lerp(812, 846, k); a104Tray(ctx, t < 104.3 ? kfn(t, [[103.74, 1250], [104.3, 1500]], 'lin') : tx, t < 104.3 ? 812 : ty, 0.6); }
    a104Person(ctx, S);
    if (t >= 104.3 && t < 109.6) { const h = S.handRW || a104Pt(S, 30, -70); a104Loaf(ctx, h[0], h[1] - 6, 0.3); } }
  else if (t < 120) { const S = a104S11(t), Pt = a104Porter11(t); out.S = S;
    person(ctx, Pt); a104PorterChest(ctx, Pt, t, 0.3 * a104Env(t, 116.7, 117.5, 0.1));
    const op = a104Env(t, 116.7, 117.5, 0.1); if (op > 0) a104Glow(ctx, a104Head(Pt)[0], a104Head(Pt)[1] - 60, 70, op);
    person(ctx, S); const hp = a104Pt(S, S.handR ? S.handR[0] : 40, S.handR ? S.handR[1] : -64); a104Purse(ctx, hp[0], hp[1], 0.5, { rot: 0.15 * Math.sin((S.ph || 0) * 2) * S.amp + swing(t, 114.3, 0.5, 2.2, 2.4), glint: t >= 114.2 && t < 115.2 ? pulse(t, 114.2, 1.0) : undefined }); out.P = Pt; }
  else { a104RuinCast(ctx, t, out); }
  return out;
}
// S8: the three scrolls float round in front of him; two are struck and pop, the last tucks into the sash
function a104DebtColumn(ctx, S, t) {
  if (t >= 92.9) { if (t < 100.9) { const q = a104Pt(S, 18, -82); a104Scroll(ctx, q[0], q[1], 0.42, { rot: 0.3 }); } return; }
  for (let i = 0; i < 3; i++) {
    const from = a104Pt(S, [-44, -16, -62][i], [-232, -252, -262][i]), to = [S.x - 150, 640 + i * 70], k = a104E(t, 91.2 + i * 0.08, 0.35);
    let p = a104L2(from, to, k), sc = 0.75 * 0.85 * (1 + 0.5 * k), st = 0, pop = 1;
    if (i < 2) { const ts = [91.42, 92.18][i]; st = K.clamp((t - ts) / 0.3); pop = 1 - K.clamp((t - ts - 0.35) / 0.12); sc *= 1 + 0.25 * K.clamp((t - ts - 0.35) / 0.12); }
    else if (t > 92.4) { const kk = a104E(t, 92.4, 0.4); p = a104L2(p, a104Pt(S, 18, -82), kk); sc = K.lerp(sc, 0.42, kk); }
    if (pop > 0.02) { ctx.save(); ctx.globalAlpha = pop; a104Scroll(ctx, p[0], p[1], sc, { struck: st }); ctx.restore(); }
    if (i < 2 && pop < 1 && pop > 0) dustBurst(ctx, p[0], p[1], t - [91.77, 92.53][i], 5, 6, 14, 40, 0.4, 90 + i);
  }
}

// ---------- S12 and S13 (street part): the ruin and the neighbour ----------
const a104X12 = (t) => kfn(t, [[119.6, 1840], [120.15, 1900], [122.9, 1900], [125.0, 2105], [126.1, 2105], [127.3, 1930]], 'lin');
function a104RuinDressing(ctx, t) {
  // cracks, weeds, a hanging shutter, the crow
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round';
  for (const pts of [[[1990, 380], [2010, 450], [1996, 520], [2018, 600]], [[2300, 330], [2280, 410], [2296, 470]]]) { ctx.beginPath(); pts.forEach((p, i) => ctx[i ? 'lineTo' : 'moveTo'](p[0], p[1])); ctx.stroke(); }
  ctx.restore();
  for (const wx of [2050, 2110, 2240]) for (let k = 0; k < 4; k++) shape(ctx, [[wx + k * 6 - 4, 872], [wx + k * 6 - 12 + 3 * Math.sin(t * 2 + k), 846 - (k % 2) * 10], [wx + k * 6 + 2, 872]], A104_GREEN, { lw: 2.5, seed: 452 + k });
  const sw = 0.5 + swing(t, 122.26, 0.25, 0.9, 0.5) + 0.03 * Math.sin(t * 1.7); ctx.save(); ctx.translate(2095, 345); ctx.rotate(sw); shape(ctx, K.rectPts(-6, 0, 46, 118), '#a8261a', { lw: 5, seed: 456 }); ctx.restore();
  if (t < 122.4) bird(ctx, { x: 2190, y: 452, s: 0.6, dir: -1, kind: 'crow', lid: blink(t, 9) });
  else if (t < 124.5) { const k = (t - 122.4) / 2.1; bird(ctx, { x: 2190 + 300 * k, y: 452 - 260 * k - 60 * Math.sin(Math.PI * k), s: 0.6, dir: 1, kind: 'crow', fly: true, flap: Math.sin(t * 22) }); }
}
function a104RuinCast(ctx, t, out) {
  const S = a104Mk('old', { y: 900, dir: 1, mouth: 'smile', lid: 0.15 }); a104Walk(S, a104X12, t, t < 122.9 ? 1 : 0.55); S.y = a104StepY(S.x);
  S.mouth = t < 120.6 ? 'smile' : t < 121.2 ? 'closed' : 'o'; S.gaze = [0.95, -0.25]; S.handR = [40, -64 + 14 * a104E(t, 120.4, 0.8)];
  if (t >= 122.9) { S.drop = 8 * a104E(t, 123.6, 1.0); S.gaze = [0.8, -0.5]; S.mouth = 'frown'; S.brow = -0.6; }
  if (t >= 124.6 && t < 126.1) { S.handRW = a104L2(a104Pt(S, 40, -64), [2128, 740], a104E(t, 124.6, 0.5)); S.gaze = [0.9, -0.3]; S.lid = 0.5; }
  if (t >= 126.1) { S.wet = true; S.brow = -0.7; S.gaze = gazePlan(t, [[0, [-0.9, -0.1]], [126.6, [0.9, -0.2]], [127.0, [-0.9, 0.1]]], 0.2); S.lid = Math.max(0.2, pulse(t, 126.3, 0.5)); S.dir = t > 126.2 ? -1 : 1; }
  // the porter, the chest set down
  const Pt = a104Mk('porter', { y: 900, dir: 1, mouth: 'closed', lid: 0.2 }), pxf = (tt) => Math.min(a104X12(Math.min(tt, 122.9) - 0.25) - 125, 1830) + (tt > 126.1 ? 0 : 0); a104Walk(Pt, pxf, t, 1, 18);
  Pt.gaze = t > 122.3 ? lookAt(a104Head(Pt), a104Head(S)) : [0.9, -0.4]; if (t > 122.3) { Pt.brow = -0.6; Pt.mouth = 'o'; }
  const down = a104E(t, 126.1, 0.6);
  // the neighbour (S13 street part)
  if (t >= 126.8) {
    const N = a104Mk('neighbour', { y: 900, dir: 1, mouth: 'closed', lid: 0.4 }); const nx = (tt) => kfn(tt, [[126.8, 1480], [128.1, 1680]], 'lin'); a104Walk(N, nx, t, 0.7, 20);
    N.gaze = t < 128.9 ? lookAt(a104Head(N), a104Head(S)) : t < 130.1 ? [0.9, -0.5] : [0.95, -0.1];
    if (t >= 128.9 && t < 130.1) { N.look = 0.4 * Math.sin((t - 128.9) * 7) * a104Env(t, 128.9, 130.1, 0.2); N.lid = 0.6 + 0.3 * pulse(t, 129.2, 0.6); N.mouth = 'frown'; }
    if (t >= 130.2) { N.handR = a104L2([37, -58], [96, -150], settleTo(t, 130.2, 0, 1, 0.35, 0.15)); N.mouth = 'closed'; }
    person(ctx, N); out.N = N;
    if (t >= 130.4) { const tip = a104Pt(N, 100, -170); a104Dash(ctx, tip, [2400, 560], (t - 130.4) / 0.8, C.black); }
  }
  if (t >= 127.2) { S.dir = -1; S.gaze = lookAt(a104Head(S), out.N ? a104Head(out.N) : [1700, 700]);
    if (t < 128.0) S.handR = PERSON_HANDS.pointFwd.R; else if (t < 128.9) { S.handL = PERSON_HANDS.palmsUp.L; S.handR = PERSON_HANDS.palmsUp.R; } S.brow = -0.6; S.mouth = 'o';
    if (t >= 128.6 && t < 128.9) S.dir = 1;
    if (t >= 130.3) { S.gaze = [0.95, -0.05]; S.handR = undefined; S.handL = undefined; } }
  person(ctx, Pt); if (t < 126.1) a104PorterChest(ctx, Pt, t, 0); else { const hd = a104Head(Pt); a104Chest(ctx, K.lerp(hd[0] + 4, Pt.x + 40, down), K.lerp(hd[1] - 30, 900, down), 0.55); }
  if (t >= 130.3) Pt.gaze = [0.95, -0.1];
  if (t >= 125.04 && t < 126.4) a104Ghost(ctx, t, a104Env(t, 125.04, 126.3, 0.35) * 0.5);
  person(ctx, S); a104Purse(ctx, ...a104Pt(S, 40, -50), 0.5, {});
  out.S = S; out.P = Pt;
}
// the ghost of the past over the ruin: a lit door, two lamps and the four dogs in pale outline
function a104Ghost(ctx, t, a) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(255,224,90,0.8)'; K.poly(ctx, townArchPts(2080, 2220, 560, 872, 'pointed'), true); ctx.fill();
  hangingLamp(ctx, 2010, 640, t, { lit: 1 }); hangingLamp(ctx, 2290, 640, t, { lit: 1 });
  [[1960, 0.55, 1], [2020, 0.5, 0], [2280, 0.55, 2], [2340, 0.5, 3]].forEach(([x, s, pal], i) => a104Dog(ctx, { x, y: 872 + (i % 2) * 6, s, dir: i < 2 ? 1 : -1, pal, sit: 1, collar: 'gold', alpha: 0.85, lid: 0.3 }));
  ctx.restore();
}
