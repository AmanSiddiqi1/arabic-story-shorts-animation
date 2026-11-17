// ===== KD-031 street scenes: S1-S2 (the master's door), S3-S7 (the market), S16 (the palace front) =====
// sets: marketStreet with three layouts (A merchant door, B market end, C palace front)
const K31STA = { palace: false, houses: [{ x0: -10, x1: 470, top: 470, col: 1, door: [230, 350, 640, 'round'], windows: [[60, 560, 80, 96], [384, 546, 66, 86]] }, { x0: 478, x1: 1010, top: 500, col: 0, windows: [[560, 570, 80, 96], [800, 570, 80, 96]] }], props: [['pots', 920, {}]] };
const K31STB = { palace: false, houses: [{ x0: -10, x1: 150, top: 440, col: 2, windows: [[30, 560, 70, 90]] }, { x0: 160, x1: 520, top: 480, col: 0, door: [216, 300, 650, 'round'], windows: [[380, 560, 80, 96]] }, { x0: 528, x1: 1010, top: 460, col: 1, windows: [[600, 560, 80, 96], [830, 560, 80, 96]] }],
  stalls: [{ x: 330, kind: 'cloth', cols: [C.yellow, C.red], w: 250 }, { x: 900, kind: 'jars', cols: [C.blue, C.white], w: 220 }], props: [['mat', 790, { w: 230 }], ['crate', 620, { w: 180, top: 830 }]] };
const K31STC = { palace: { x0: 130, x1: 590, top: 300, cx: 360, door: [300, 420, 560], balcony: [360, 380] }, houses: [{ x0: -10, x1: 122, top: 500, col: 1, windows: [] }, { x0: 598, x1: 1010, top: 470, col: 2, door: [880, 960, 650, 'round'], windows: [[650, 560, 80, 96]] }] };
const K31CAGE = { x: 620, y: 830, s: 0.75 };   // the cage on the hunter's crate
const K31HX = 790;                             // the hunter on his mat

// birds inside a cage (back bars, birds, front bars). cs: cage scale; A right, B left; pa/pb: extra pose fields
function k31cageBirds(ctx, cx, cy, cs, pa, pb, o = {}) {
  k31cage(ctx, cx, cy, cs, 'back', { seeds: o.seeds, rot: o.rot });
  const fy = k31cageFloor(cy, cs), bs = cs * 0.667, A = { x: cx + 26 * cs / 0.75, y: fy, s: bs, dir: -1, pal: 0, seed: 3, ...pa }, B = { x: cx - 24 * cs / 0.75, y: fy, s: bs, dir: -1, pal: 1, seed: 7, ...pb };
  if (o.rot) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(o.rot); ctx.translate(-cx, -cy); }
  k31hoopoe(ctx, B); k31hoopoe(ctx, A); if (o.rot) ctx.restore();
  k31cage(ctx, cx, cy, cs, 'front', { door: o.door, latch: 1, rot: o.rot });
  return { A, B };
}
// the carried cage: centre of the cage body in man-local units (base = centre + 75 * s)
const K31CARRY = [38, -88], K31CARRYHL = [-24, -92], K31CARRYHR = [98, -92];
function k31carried(P, local = K31CARRY) { const b = k31L2W(P, [local[0], local[1] + 75]); return { x: b[0], y: b[1] }; }

// ---------- S1, S2: the master's door ----------
function k31manS12(t) {
  const turns = [[4.35, 1], [8.6, -1], [19.6, 1]]; let dir = -1; for (const [a, d] of turns) if (t >= a) dir = d;
  const turnSq = turns.reduce((v, [a]) => v - 0.06 * pulse(t, a - 0.12, 0.26), 1);
  const xf = (tt) => k31kv(tt, [[20.0, 560], [21.7, 1180]], 'in');
  const P = k31man({ x: 560, dir, sq: turnSq, seed: 11 });
  if (t >= 20.0) Object.assign(P, walk(xf, t, { stride: 34 }));
  let broom = null, bindle = null;
  const BINDLE_REST = [[800, 760], [742, 840]], BINDLE_DOWN = [[700, 770], [650, 846]];
  const bindleOn = (tt) => [k31hand(P, -1, [-20, -158]), k31L2W(P, [-100, -212])];
  if (t < 3.96) {   // sweeping: two strokes a second, one long stroke at 0.82, a wipe of the brow
    const amp = t > 0.82 && t < 1.05 ? 36 : 22, tt = t > 1.05 && t < 1.75 ? 1.05 : t, sw = amp * Math.sin(2 * Math.PI * 2 * tt);
    const hU = [30 + 0.4 * sw, -135], hD = [68 + sw, -88];
    P.handL = hU; P.handR = t > 1.05 && t < 1.75 ? k31kv(t, [[1.05, hD], [1.25, [24, -210]], [1.55, [-14, -210]], [1.75, hD]]) : hD;
    const wU = k31L2W(P, hU), wD = k31L2W(P, hD), d = Math.hypot(wD[0] - wU[0], wD[1] - wU[1]), u = [(wD[0] - wU[0]) / d, (wD[1] - wU[1]) / d];
    broom = { b: [wD[0] + u[0] * 92, wD[1] + u[1] * 92], d: [-u[0], -u[1]] };
    P.drop = 6; P.tip = 0.08; P.lid = Math.max(0.3, blink(t, 4), k31long(t, 1.4, 0.45)); P.gaze = [-0.4, 0.6]; P.mouth = 'closed';
    P.sq = (P.sq ?? 1) * (1 - 0.03 * pulse(t, 1.1, 0.7));
  } else if (t < 5.38) {
    const k = k31e(t, 3.96, 0.35); P.drop = 6 * (1 - k); P.tip = 0.08 * (1 - k); P.mouth = t < 5.0 ? 'closed' : 'smile';
    P.gaze = k31sac(t, [[3.96, [-0.5, 0.7]], [4.12, [-1, -0.08]], [4.3, [1, -0.15]]]); P.brow = t < 4.3 ? -0.2 : -0.4;
    P.lid = Math.max(blink(t, 4), k31blinkAt(t, [4.95]));
    if (t < 4.6) { P.handR = [70, -96]; P.handL = [40, -138]; const w = k31L2W(P, [76, -96]); broom = { b: [w[0] + 30 * dir, 892], d: [-0.25 * dir, -0.97] }; }
    else { P.handR = [56, -150]; P.handL = PERSON_HANDS.hipsHands.L; P.sq = 1 + 0.045 * pulse(t, 4.6, 0.55); P.drop = -4 * k31e(t, 4.6, 0.3); const w = k31L2W(P, [60, -150]); broom = { b: [w[0] + 6, 896], d: [0, -1] }; }
  } else if (t < 8.3) {
    const mv = k31e(t, 5.38, 0.32), lean = [-0.2, -0.98], ang = 0.2 + swing(t, 5.7, 0.09, 1.6, 2.6);
    const B0 = k31L2W(P, [60, -150]), b0 = [B0[0] + 6, 896], bl = [655, 898];
    broom = { b: k31lp(b0, bl, mv), d: k31lp([0, -1], [-Math.sin(ang), -Math.cos(ang)], mv) };
    P.handR = t < 5.7 ? k31kv(t, [[5.38, [56, -150]], [5.7, [96, -120]]]) : (t < 7.0 ? [40, -96] : PERSON_HANDS.pointFwd.R);
    P.gaze = t < 5.7 ? [0.6, 0.6] : (t < 6.15 ? [0.85, 0.5] : [1, -0.12]); P.drop = t < 6.15 ? 4 : -2;
    P.sq = anticipate(t, 6.34, 0.3, 0.08) * (P.sq ?? 1); P.mouth = 'smile';
    const pick = settleTo(t, 6.6, 0, 1, 0.4, 0.15);
    if (t < 6.6) { bindle = BINDLE_REST; P.handL = t > 6.34 ? k31W2L(P, [730, 898]) : PERSON_HANDS.hipsHands.L; }
    else { const on = bindleOn(t); bindle = [k31lp(BINDLE_REST[0], on[0], K.clamp(pick)), k31lp(BINDLE_REST[1], on[1], pick)]; P.handL = k31W2L(P, bindle[0]); }
    if (t >= 7.0) P.gaze = [1, -0.1];
  } else {
    // S2: the wages
    const leanAng = 0.2; broom = { b: [655, 898], d: [-Math.sin(leanAng), -Math.cos(leanAng)] };
    P.gaze = [-1, -0.05];
    if (t < 9.16) { const on = bindleOn(t); bindle = on; P.handL = k31W2L(P, on[0]); P.handR = [40, -96]; }
    else if (t < 19.48) { const k = k31e(t, 9.16, 0.4), on = bindleOn(9.16); bindle = [k31lp(on[0], BINDLE_DOWN[0], k), k31lp(on[1], BINDLE_DOWN[1], k)]; P.handL = k < 0.95 ? k31W2L(P, bindle[0]) : PERSON_HANDS.hipsHands.L; }
    else { const k = settleTo(t, 19.6, 0, 1, 0.45, 0.12), on = bindleOn(t); bindle = [k31lp(BINDLE_DOWN[0], on[0], K.clamp(k)), k31lp(BINDLE_DOWN[1], on[1], k)]; P.handL = k31W2L(P, bindle[0]); P.sq = anticipate(t, 19.48, 0.2, 0.07) * (P.sq ?? 1); }
    const palmOut = [100, -125];
    if (t >= 9.3 && t < 11.5) { P.handR = k31kv(t, [[9.3, [40, -96]], [9.7, palmOut]]); P.handR = [P.handR[0], P.handR[1] + 6 * (pulse(t, 10.3, 0.25) + pulse(t, 10.95, 0.25))]; }
    if (t >= 9.16 && t < 9.3) P.handR = [40, -96];
    if (t >= 9.3 && t < 12.06) { P.gaze = t < 10.0 ? lookAt(k31head(P), [425, 715]) : lookAt(k31head(P), k31hand(P, 1, palmOut)); P.tip = 0.06 * k31e(t, 9.3, 0.3); }
    if (t >= 11.5 && t < 13.12) { P.handR = [62, -112]; P.tip = 0.1 * pulse(t, 11.5, 0.9); P.lid = Math.max(0.5 * pulse(t, 11.5, 0.9), blink(t, 4)); P.mouth = 'smile'; P.gaze = t < 12.1 ? [-0.3, 0.6] : lookAt(k31head(P), [340, 690]); }
    if (t >= 13.12 && t < 19.48) {
      P.handR = [70, -120]; P.handL = t < 16.98 ? PERSON_HANDS.chin.R.map((v, i) => (i ? v : -v)) : (t < 18.42 ? [-2, -118] : [-8, -90 - 6 * (k31tap(t, [18.6, 18.9], 0.2))]);
      P.gaze = k31sac(t, [[13.12, [0.4, 0.9]], [13.7, [-0.55, -0.85]], [16.98, [0.2, 0.7]], [17.64, [0.35, -0.95]], [19.2, [1, -0.1]]]);
      P.tilt = t >= 14.64 && t < 16.98 ? 0.08 * k31e(t, 14.64, 0.4) : 0; P.lid = Math.max(t >= 14.64 && t < 16.98 ? 0.2 : 0, blink(t, 4), k31blinkAt(t, [18.7]));
      P.mouth = 'smile'; P.drop = -3;
    }
    if (t >= 19.48) { P.handR = t < 20.0 ? [40, -100] : [36, -100]; P.gaze = [1, -0.1]; P.drop = -3; }
  }
  if (!P.lid && P.lid !== 0) P.lid = undefined;
  return { P, broom, bindle };
}
function k31richS12(t) {
  const dir = t < 12.3 ? 1 : -1, xf = (tt) => k31kv(tt, [[8.3, 290], [8.8, 340], [12.3, 340], [12.85, 296]]);
  const P = { ...K31RICH, x: xf(t), y: K31GR, dir: dir * (1 - 0.3 * pulse(t, 12.2, 0.3)), alpha: t < 2.6 ? 0 : k31e(t, 2.55, 0.4) * (1 - k31e(t, 12.6, 0.4)), s: 0.95 + 0.05 * k31e(t, 2.55, 0.5) };
  Object.assign(P, walk(xf, t, { stride: 34 })); P.y = K31GR;
  P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.drop = -4; P.lid = Math.max(0.4, blink(t, 6)); P.brow = 0.3; P.mouth = 'closed';
  const manHead = [560, 690]; P.gaze = lookAt(k31head(P), manHead);
  if (t >= 5.84 && t < 7.5) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = k31kv(t, [[5.84, PERSON_HANDS.folded.R], [6.1, [72, -128]]]); P.brow = -0.6; P.mouth = 'o'; P.tilt = 0.08; P.lid = blink(t, 6); P.drop = 0; }
  if (t >= 7.5 && t < 8.52) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = k31kv(t, [[7.5, [72, -128]], [7.75, [60, -60]], [8.0, [14, -80]]]); P.lid = Math.max(0.3, blink(t, 6)); P.drop = -2 * pulse(t, 7.5, 0.5); }
  let coins = 0, ch = null;
  if (t >= 8.52 && t < 12.06) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = k31kv(t, [[8.52, [14, -80]], [8.8, [60, -150]], [9.05, [86, -186]]]); P.lid = Math.max(0.4, blink(t, 6)); P.mouth = 'frown'; P.gaze = t < 9.6 ? [0.4, 0.2] : [0.5, 0.6]; coins = t < 10.12 ? 2 : (t < 10.77 ? 1 : 0); ch = k31hand(P, 1, P.handR); }
  if (t >= 12.06) { P.handR = PERSON_HANDS.hipsHands.R; P.handL = PERSON_HANDS.hipsHands.L; P.drop = 6 * pulse(t, 12.06, 0.4); P.mouth = 'closed'; }
  return { P, coins, ch };
}
function k31drawS12(ctx, t) {
  const R = k31richS12(t), M = k31manS12(t);
  marketStreet(ctx, { ...K31STA, doors: [t < 2.4 ? 0.0 : (t < 12.7 ? k31e(t, 2.3, 0.4) : 1 - k31e(t, 12.7, 0.4))], t });
  person(ctx, R.P);
  if (M.broom) k31broom(ctx, M.broom.b[0], M.broom.b[1], M.broom.d[0], M.broom.d[1]);
  if (M.bindle && (t < 9.4 || t > 19.5)) { } else if (M.bindle) k31bindle(ctx, M.bindle[0][0], M.bindle[0][1], M.bindle[1][0], M.bindle[1][1]);
  if (t < 6.6 && t >= 0) k31bindle(ctx, 800, 760, 742, 840);
  // sweeping dust at the bristles, on each stroke reversal
  if (t < 3.96) for (let k = 0; k < 16; k++) { const tk = 0.125 + k * 0.25; if (t > tk && t < tk + 0.5) dustBurst(ctx, M.broom.b[0], 896, t - tk, 3, 5, 10, 22, 0.5, k); }
  if (M.bindle && (t < 9.4 || t > 19.5) && t >= 6.6) k31bindle(ctx, M.bindle[0][0], M.bindle[0][1], M.bindle[1][0], M.bindle[1][1]);
  person(ctx, M.P);
  // the coins: in the master's hand, falling, in the servant's palm
  if (R.ch) for (let i = 0; i < R.coins; i++) k31coin(ctx, R.ch[0] + 6 + i * 10, R.ch[1] - 6, 11, { flat: 0.2 });
  const palm = k31hand(M.P, 1, [100, -125]), hp = M.P.handR ? k31hand(M.P, 1, M.P.handR) : palm;
  [[10.12, 10.3], [10.77, 10.95]].forEach(([a, b], i) => { if (k31in(t, a, b)) { const u = K.clamp((t - a) / (b - a)), src = [425 + 6 + i * 10, 712]; k31coin(ctx, K.lerp(src[0], palm[0] - 6 + i * 12, u), src[1] + (palm[1] - 10 - src[1]) * u * u, 11, { flat: 0.3 }); } });
  const nPalm = t < 10.3 ? 0 : t < 10.95 ? 1 : t < 11.5 ? 2 : t < 13.12 ? 0 : t < 16.98 ? 2 : t < 19.48 ? 1 : 0;
  for (let i = 0; i < nPalm; i++) k31coin(ctx, hp[0] - 8 + i * 14, hp[1] - 10 - 3 * landSquash(t, i ? 10.95 : 10.3, 0.3), 11, { flat: 0.55 - 0.25 * pulse(t, i ? 10.95 : 10.3, 0.1) });
  return { man: M.P, rich: R.P };
}
// the S2 thought cloud: charity (left half) and food (right half)
function k31cloudS2(ctx, t, man) {
  const p = k31e(t, 13.12, 0.5) * (1 - k31e(t, 19.3, 0.3)); if (p <= 0) return; const h = k31head(man);
  thoughtCloud(ctx, 440, 380, 340, 240, t, { p, tail: [h[0] - 20, h[1] - 50], bg: C.white, scale: 0.36, at: [500, 700], inside: (c) => {
    c.save(); c.setLineDash([14, 14]); c.lineWidth = 6; c.strokeStyle = '#b9b4c6'; c.beginPath(); c.moveTo(500, 420); c.lineTo(500, 1000); c.stroke(); c.restore();
    if (t >= 14.64) { k31palm(c, 290, 820, 2.6); const u = k31e(t, 14.64, 0.5, 'out'); if (u < 1) k31coin(c, K.lerp(470, 300, u), K.lerp(640, 770, u) - 90 * Math.sin(Math.PI * u), 48); else k31coin(c, 300, 772 + 4 * landSquash(t, 15.14, 0.5), 48, { flat: 0.5 }); }
    else k31coin(c, 400, 740, 48);
    if (t >= 15.0) heart(c, 290, 560, 90 * K.ease.back(K.clamp((t - 15.0) / 0.35)) * (1 + 0.05 * Math.sin(t * 6)));
    if (t >= 17.64) { const u = k31e(t, 17.64, 0.45, 'out'), x = K.lerp(950, 700, u); if (t < 18.42) k31coin(c, x, 720, 48); else { const k = K.ease.back(K.clamp((t - 18.42) / 0.3)); k31loaf(c, 700, 730, 130 * k, t); } }
  } });
}

// ---------- S3-S7: the market ----------
function k31manX(t) { return k31kv(t, [[21.0, -120], [22.8, 380], [28.18, 380], [28.7, 450], [56.6, 450], [57.1, 520], [61.3, 520], [61.9, 470], [73.9, 470], [74.52, 640]]); }
function k31manMarket(t) {
  const xf = (tt) => k31manX(tt) + (tt > 22.8 && tt < 23.2 ? settleTo(tt, 22.8, 0, 0, 0.3) : 0);
  const P = k31man({ ...walk(xf, t, { stride: 34 }), dir: 1, seed: 11 });
  if (t < 22.8) { P.gaze = look(t, [P.x, 700], [[21.0, [P.x + 200, 520]], [21.9, [P.x + 260, 650]], [22.4, [P.x + 120, 480]], [22.8, [640, 720]]], 0.15); P.brow = -0.2; }
  let carry = null, coinHand = null, cageState = 'crate';
  const hunterHead = [K31HX, 760], birds = [630, 790];
  if (t < 33.5) {   // S3
    P.handL = [-20, -158]; P.handR = [40, -96];
    if (t >= 22.8) { P.gaze = lookAt(k31head(P), t < 23.5 ? [620, 760] : (t < 24.6 ? hunterHead : birds)); P.brow = -0.3; P.drop = 3 * k31e(t, 22.8, 0.2) * (1 - k31e(t, 23.3, 0.3)); }
    if (t >= 27.52) { P.brow = -0.5; P.mouth = 'closed'; P.tilt = -0.07 * k31e(t, 27.52, 0.4); }
    if (t >= 28.18) { P.tip = 0.12 * k31e(t, 28.7, 0.4) * (1 - k31e(t, 29.5, 0.3)); P.gaze = lookAt(k31head(P), birds); }
    if (t >= 29.68) { P.handR = k31kv(t, [[29.68, [40, -96]], [29.95, [100, -120]]]); P.handL = [-62, -112]; P.gaze = lookAt(k31head(P), hunterHead); P.brow = -0.5; P.talk = t < 30.6 ? 0.6 * Math.abs(Math.sin(t * 11)) : 0; }
    if (t >= 32.38) { P.handR = [40, -96]; P.handL = [-20, -158]; P.sq = 1 - 0.04 * pulse(t, 32.4, 0.25); }
    if (t >= 33.3) { P.handR = PERSON_HANDS.hipsHands.R; P.drop = 4 * pulse(t, 33.3, 0.3); P.gaze = t < 33.45 ? [0.4, 0.8] : lookAt(k31head(P), hunterHead); }
    P.lid = Math.max(blink(t, 4), k31blinkAt(t, [27.0]));
  } else if (t < 40.32) {   // S4: one coin
    P.handL = [-20, -158]; P.brow = -0.5; P.mouth = 'smile';
    P.handR = k31kv(t, [[33.5, PERSON_HANDS.hipsHands.R], [33.8, [40, -110]], [34.2, [52, -200]], [36.56, [52, -200]], [36.9, [96, -170]], [40.0, [96, -170]], [40.32, [70, -110]]]);
    coinHand = k31hand(P, 1, P.handR);
    P.gaze = lookAt(k31head(P), t < 35.58 ? hunterHead : (t < 36.2 ? birds : hunterHead));
    if (t >= 35.58 && t < 36.4) P.handL = k31kv(t, [[35.58, [-20, -158]], [35.8, [70, -100]], [36.2, [96, -96]], [36.4, [-20, -158]]]);
    if (t >= 36.56) { P.tip = 0.1 * k31e(t, 36.56, 0.3) * (1 - k31e(t, 40.0, 0.3)); P.talk = t < 37.2 ? 0.6 * Math.abs(Math.sin(t * 12)) : 0; P.tilt = 0.06; }
    if (t >= 39.6) { P.mouth = 'closed'; P.brow = -0.6; P.drop = settleTo(t, 40.0, 0, 6); }
    P.lid = Math.max(blink(t, 4), k31long(t, 40.0, 0.5));
  } else if (t < 54.66) {   // S5: the thought
    P.handL = [-20, -158]; P.handR = PERSON_HANDS.chin.R; P.mouth = 'closed';
    const coinL = [-50, -112 - 26 * (pulse(t, 42.22, 0.35) + pulse(t, 42.62, 0.35))]; P.handL = t < 40.6 ? [-20, -158] : [-52, -112];
    coinHand = k31hand(P, -1, coinL);
    P.gaze = k31sac(t, [[40.32, [-0.4, 0.5]], [40.7, [0.7, 0.4]], [41.1, [-0.6, -0.8]], [42.22, [-0.45, 0.6]], [43.0, [-0.6, -0.8]], [46.98, [0.75, 0.55]]]);
    P.lid = t < 46.98 || t > 48.0 ? Math.max(blink(t, 4)) : 0;
    if (t >= 48.32) { P.eyes = 'wide'; P.brow = -0.8; P.sq = 0.94 + 0.06 * (1 - k31e(t, 48.32, 0.25)); P.x += tremble(t, 1); P.mouth = 'o'; P.handR = PERSON_HANDS.chin.R; }
    if (t >= 53.6) { P.eyes = 'open'; P.handR = PERSON_HANDS.mouthCover.R; P.handL = PERSON_HANDS.mouthCover.L; P.lid = Math.max(0.6, blink(t, 4)); P.wet = true; P.look = -0.6; coinHand = k31hand(P, -1, P.handL); }
  } else if (t < 62.68) {   // S6: both dinars
    P.handL = [-20, -158]; P.mouth = 'closed'; P.wet = t < 56.6; P.gaze = lookAt(k31head(P), birds);
    P.handR = PERSON_HANDS.chest.R; P.lid = Math.max(blink(t, 4), k31long(t, 54.9, 0.7)); P.sq = 1 + 0.025 * pulse(t, 54.66, 1.2);
    if (t >= 55.84 && t < 56.75) { P.kneel = 0.55 * k31e(t, 55.84, 0.3) * (1 - k31e(t, 56.45, 0.3)); P.tip = 0.14 * k31e(t, 55.84, 0.3) * (1 - k31e(t, 56.45, 0.3)); P.handR = [60, -100]; P.mouth = 'smile'; }
    if (t >= 56.6) { P.gaze = lookAt(k31head(P), t < 57.74 ? hunterHead : birds); P.mouth = 'closed'; P.handR = k31kv(t, [[56.6, PERSON_HANDS.hipsHands.R], [57.0, [70, -110]], [57.6, k31W2L(P, [640, 750])]]); coinHand = k31hand(P, 1, P.handR); }
    if (t >= 58.5) P.handR = [40, -96];
    if (t >= 59.2) { const k = k31e(t, 59.2, 0.5); P.handL = k31lp(k31W2L(P, [556, 760]), K31CARRYHL, k); P.handR = k31lp(k31W2L(P, [684, 760]), K31CARRYHR, k); cageState = 'man'; carry = k; }
    if (t >= 60.06 && t < 61.3) { P.handR = k31kv(t, [[60.06, K31CARRYHR], [60.3, [80, -128]], [60.9, [80, -128]], [61.2, K31CARRYHR]]); P.brow = -0.6; P.drop = -4 * pulse(t, 60.3, 0.8); }
    if (t >= 61.98) { P.gaze = t < 62.3 ? [0.5, 0.6] : lookAt(k31head(P), [P.x + 40, 840]); P.mouth = 'smile'; }
    if (t < 56.6 || t > 57.7) coinHand = coinHand && t < 58.3 ? coinHand : null;
  } else {   // S7: not here
    cageState = 'man'; carry = 1; P.handL = K31CARRYHL; P.handR = K31CARRYHR; P.mouth = 'smile'; P.gaze = lookAt(k31head(P), [P.x + 40, 820]);
    if (t < 65.6) { const up = k31e(t, 62.68, 0.5) * (1 - k31e(t, 65.1, 0.45)); carry = 1 + up; P.handR = k31lp(K31CARRYHR, [76, -78], up); P.handL = k31lp(K31CARRYHL, [24, -150], up);
      if (t >= 63.3 && t < 65.0) P.handL = k31lp([24, -150], [70, -112], k31e(t, 63.3, 0.4) * (1 - k31e(t, 64.94, 0.3)));
      P.gaze = lookAt(k31head(P), [P.x + 80, 760]); if (t >= 64.18) { P.mouth = 'closed'; P.brow = -0.4; } if (t >= 64.94) { P.tilt = 0.08 * Math.sin((t - 64.94) * 14) * (1 - k31e(t, 64.94, 0.8)); P.lid = 0.4; } }
    if (t >= 65.6) { P.mouth = 'closed'; P.brow = -0.4; }
    if (t >= 66.32 && t < 68.3) { P.gaze = k31sac(t, [[66.32, [-1, -0.05]], [66.8, [1, -0.05]], [67.3, [-1, -0.05]], [67.8, [0.3, 0.6]]]); P.look = k31sac(t, [[66.42, -0.6], [66.9, 0.6], [67.4, -0.6], [67.9, 0]]); }
    if (t >= 68.3 && t < 70.9) { carry = 2; P.handR = [76, -78]; P.handL = [24, -150]; P.gaze = lookAt(k31head(P), [P.x + 76, 760]); P.brow = -0.5; P.mouth = 'closed'; }
    if (t >= 70.98) { P.gaze = k31sac(t, [[70.98, [-1, 0]], [73.5, [-1, 0]]]); P.look = t > 71.08 ? -0.4 : 0; P.brow = -0.5; }
    if (t >= 73.78) { P.handL = [-10, -126]; P.handR = [74, -118]; P.brow = 0.5; P.gaze = [1, -0.05]; P.look = 0.4; carry = 2.5; }
    P.lid = P.lid || blink(t, 4);
  }
  return { P, carry, coinHand, cageState };
}
function k31hunterP(t) {
  const P = { ...K31HUNT, x: K31HX, y: K31GR, dir: -1, sit: 1, seat: 'floor', lid: Math.max(0.35, blink(t, 9)), brow: -0.4, mouth: 'smile' };
  const manHead = [k31manX(t), 700]; P.gaze = lookAt(k31head(P), manHead); P.handL = [-50, -104]; P.handR = [50, -104];
  let fingers = false, palm = null, coin = 0;
  if (t < 24.38) { if (t >= 23.0) { P.handR = PERSON_HANDS.cupMouth.R; P.talk = 0.8 * Math.max(0, Math.sin(t * 9)) * (Math.sin(t * 2.3) > -0.2 ? 1 : 0); P.gaze = [-1, -0.2]; } }
  else if (t < 29.92) { if (t < 25.0) { const tw = k31W2L(P, [698, 778]); P.handR = [tw[0] + 6 * (k31tap(t, [24.45, 24.7], 0.18)), tw[1]]; P.gaze = lookAt(k31head(P), [630, 790]); } }
  else if (t < 33.5) {
    P.gaze = look(t, k31head(P), [[29.92, [manHead[0], 690]], [30.15, [manHead[0] - 60, 720]], [30.35, [manHead[0], 890]], [30.6, [manHead[0], 690]]], 0.12); P.lid = Math.max(0.4, blink(t, 9));
    if (t >= 30.8) { P.handR = k31kv(t, [[30.8, [50, -104]], [31.1, [50, -92]], [32.2, [42, -150]], [32.45, [40, -206]]]); P.mouth = 'smile'; }
    if (t >= 32.38) { P.talk = t < 33.2 ? 1 * Math.abs(Math.sin(t * 13)) : 0; P.drop = -5; fingers = true; }
  } else if (t < 40.32) {
    if (t >= 37.3) { P.lid = 0.55; P.brow = 0.6; P.mouth = 'closed'; P.gaze = lookAt(k31head(P), [manHead[0] + 60, 700]); }
    if (t >= 37.92) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.drop = settleTo(t, 37.92, 0, -6); P.gaze = lookAt(k31head(P), [manHead[0] - 40, 560]); }
    if (t >= 39.6) { P.look = settleTo(t, 39.6, 0, 0.8); P.tilt = 0.12 * Math.sin((t - 39.6) * 16) * (1 - k31e(t, 39.6, 0.7)); P.lid = t < 40.2 ? 1 : 0.5; P.handR = [80, -150]; P.gaze = [1, -0.3]; P.mouth = 'frown'; }
  } else if (t < 54.66) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.look = 0.5; P.gaze = [0.6, -0.4]; P.mouth = 'closed'; }
  else if (t < 62.68) {
    P.gaze = lookAt(k31head(P), manHead);
    if (t >= 56.6) { const tw = k31W2L(P, [662, 772]); P.handR = k31kv(t, [[56.6, [50, -104]], [57.2, tw]]); P.tip = 0.12 * k31e(t, 57.0, 0.3); palm = k31hand(P, 1, P.handR); coin = (t >= 57.98) + (t >= 58.45); if (t > 57.9) P.eyes = 'wide'; P.gaze = [0.2, 0.7]; }
    if (t >= 58.68) { P.eyes = 'open'; P.tip = 0; P.handR = k31kv(t, [[58.68, P.handR], [58.85, [16, -168]], [59.0, [16, -168]], [59.1, k31W2L(P, [690, 790])], [59.3, k31W2L(P, [670, 792])], [59.5, [50, -104]]]); P.mouth = t > 58.85 && t < 58.98 ? 'open' : 'smile'; P.lid = 0.3; palm = k31hand(P, 1, P.handR); }
    if (t >= 61.3) { const xf = (tt) => k31kv(tt, [[61.3, K31HX], [62.68, K31HX + 260]]); P.sit = 1 - k31e(t, 61.3, 0.3); P.dir = 1; Object.assign(P, walk(xf, t, { stride: 34 })); P.handL = [-40, -90]; palm = null; P.handR = [40, -130 - 30 * Math.abs(Math.sin(t * 5))]; coin = 1; P.gaze = [1, -0.1]; }
  }
  return { P, fingers, palm, coin };
}
function k31marketBirds(t, man) {
  // shared poses of the caged pair in S3 to S7
  const blinkA = blink(t, 3), blinkB = blink(t, 7), A = { lid: blinkA, crest: 0.05, sag: -0.2 }, B = { lid: blinkB, crest: 0.05, sag: -0.2 };
  const AH = (o) => k31hHead(o), mh = k31head(man);
  if (t >= 24.38 && t < 25.2) { A.sq = 1 - 0.1 * k31tap(t, [24.45, 24.7], 0.15); B.sq = 1 - 0.1 * k31tap(t, [24.48, 24.73], 0.15); }
  if (t >= 25.7) { A.drop = 14 * k31e(t, 25.7, 0.5); A.lid = Math.max(0.7 * k31e(t, 25.7, 0.5), blinkA); A.crest = 0; A.sag = -0.5; A.sq = 1 + 0.03 * Math.sin(t * 3); }
  if (t >= 26.2) { B.tip = 0.12 * k31e(t, 26.2, 0.4); B.dx = 8 * k31e(t, 26.2, 0.4); B.shake = tremble(t, 1.5); B.wet = true; }
  if (t >= 26.92) { B.gazeTo = mh; B.lid = Math.max(k31long(t, 27.1, 0.5), blinkB); }
  if (t >= 32.38 && t < 32.8) { A.sq = 1 - 0.12 * pulse(t, 32.4, 0.3); B.sq = 1 - 0.12 * pulse(t, 32.44, 0.3); }
  if (t >= 33.5 && t < 40.32) { const hh = [K31HX, 760], ping = (d) => k31sac(t - d, [[33.5, mh], [38.66, hh], [38.95, mh], [39.25, hh], [39.6, hh], [40.0, mh]]); B.gazeTo = ping(0); A.gazeTo = ping(0.07); A.drop = 10; A.lid = Math.max(0.5, blinkA); B.shake = 0; }
  if (t >= 40.32 && t < 49.58) { A.drop = 12; A.lid = Math.max(0.6, blinkA); B.gazeTo = mh; B.shake = tremble(t, 1); }
  if (t >= 49.58 && t < 54.66) { B.drop = 10 * k31e(t, 49.58, 0.4); B.tip = 0.16; B.dx = 12; B.lid = Math.max(0.6, blinkB); B.shake = 0; A.headRot = 0.25 * k31e(t, 49.8, 0.4); A.drop = 8; A.lid = Math.max(0.5, blinkA);
    if (t >= 50.68) { A.crest = 0.4 * k31e(t, 50.68, 0.3); B.crest = 0.4 * k31e(t, 50.75, 0.3); } }
  if (t >= 54.66 && t < 62.68) { A.drop = 8; B.drop = 4; A.lid = Math.max(0.4, blinkA); if (t >= 55.84) { A.gazeTo = mh; B.gazeTo = mh; A.lid = Math.max(0.3, blinkA); B.lid = Math.max(0.3, blinkB); }
    if (t >= 61.98) { A.crest = 0.3 * k31e(t, 61.98, 0.4); B.crest = 0.3 * k31e(t, 62.1, 0.4); } }
  if (t >= 62.68 && t < 69.84) { A.drop = 8; A.crest = 0.3; B.crest = 0.3; A.gazeTo = mh; B.gazeTo = mh; }
  if (t >= 68.3 && t < 70.9) { A.gazeTo = null; B.gazeTo = null; A.crest = 0.1; B.crest = 0.1;
    if (t >= 69.32) { A.beak = 1.2 * k31e(t, 69.32, 0.3); A.lid = Math.max(0.6, blinkA); B.dx = 22; B.dir = 1; B.drop = 8 * k31tap(t, [69.4, 69.7], 0.22); B.headRot = 0.4 * k31tap(t, [69.4, 69.7], 0.22); if (t > 70.1) { B.headRot = -0.3; B.gaze = [0, -1]; } }
    if (t >= 69.84) { A.sag = -0.5; B.sag = -0.5; A.sq = 0.92; B.sq = 0.92; A.lid = Math.max(0.7, blinkA); B.lid = Math.max(0.7, blinkB); A.crest = 0; B.crest = 0; } }
  if (t >= 70.9) { A.sq = 0.92; B.sq = 0.92; A.crest = 0; B.crest = 0; A.lid = Math.max(0.5, blinkA); if (t >= 73.78) { A.sq = 0.85; B.sq = 0.85; A.drop = 10; B.drop = 10; } }
  return { A, B };
}
function k31applyBird(o, base) { const P = { ...base, ...o }; if (o.dx) P.x = base.x + o.dx; if (o.gazeTo) P.gaze = lookAt(k31hHead(P), o.gazeTo); delete P.gazeTo; delete P.dx; return P; }
function k31drawMarket(ctx, t) {
  const M = k31manMarket(t), H = t < 62.68 ? k31hunterP(t) : null, Bd = k31marketBirds(t, M.P);
  const live = t * 1;
  marketStreet(ctx, { ...K31STB, t, shutters: 1 });
  // secondary motion: a hanging sign over the door and the stall awnings' fringe
  { const a = 0.12 * Math.sin(t * 1.7) + swing(t, 66.76, 0.2); ctx.save(); ctx.translate(258, 620); ctx.rotate(a); seg(ctx, -24, 0, -24, 20, 3, C.black, 0); seg(ctx, 24, 0, 24, 20, 3, C.black, 0); shape(ctx, K.rectPts(-36, 20, 72, 40), C.yellow, { lw: 4, seed: 140 }); k31coin(ctx, 0, 40, 12); ctx.restore(); }
  for (const [x0, x1, y] of [[205, 455, 598], [790, 1010, 598]]) { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let x = x0; x < x1; x += 22) { const sw = 4 * Math.sin(t * 3 + x * 0.05); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + sw, y + 16); ctx.stroke(); } ctx.restore(); }
  // S7 busy street: a cart wheel rolling through
  if (k31in(t, 66.5, 69.5)) { const x = K.lerp(1100, -120, (t - 66.5) / 3), r = 46; ctx.save(); ctx.translate(x, 900 - r); ctx.rotate(-(x - 1100) / r); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = WOOD; ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 4); seg(ctx, -r + 6, 0, r - 6, 0, 6, WOOD, 3); } ctx.restore(); }
  // S7: the second hunter behind the corner (drawn before the corner pier), the net shadow on the wall
  if (k31in(t, 71.98, 73.4)) { const u = k31e(t, 71.98, 1.0), x = K.lerp(520, 200, u); ctx.save(); ctx.globalAlpha = 0.45 * (1 - k31e(t, 73.0, 0.3)); const hoop = ell(x, 640, 70, 62, 22); ctx.fillStyle = dotPat(ctx, NAVY2, 9, 0.38); K.poly(ctx, hoop, true); ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = NAVY2; ctx.beginPath(); ctx.moveTo(x + 50, 690); ctx.lineTo(x + 170, 820); ctx.stroke(); ctx.restore(); }
  if (k31in(t, 72.9, 74.52)) { const pk = k31e(t, 72.98, 0.35) * (1 - k31e(t, 73.85, 0.2)), P2 = { ...K31HUNT2, x: 96 + 40 * pk, y: K31GR, dir: 1, tip: 0.1 * pk, lid: 0.3, brow: 0.5, mouth: 'closed', gaze: [1, 0.25], handR: [70, -150], handL: [-30, -90] };
    if (pk > 0.01) { person(ctx, P2); const hn = k31hand(P2, 1, [70, -150]); k31handNet(ctx, hn[0], hn[1] + 40, 0.35, 34); } }
  if (t >= 62.68 && t < 74.52) { shape(ctx, [[96, 902], [96, 430], [158, 430], [158, 902]], '#e8c48a', { lw: 7, seed: 141, dot: '#c98a3a', pitch: 12, rad: 0.15, da: 0.35 }); }
  // the cage on the crate (or carried), the birds inside
  let cx = K31CAGE.x, cy = K31CAGE.y, cs = K31CAGE.s, rot = 0;
  if (t >= 24.38 && t < 25.2) cy -= 3 * k31tap(t, [24.45, 24.7], 0.15);
  if (H && t >= 59.0 && t < 59.2) cx -= 20 * k31e(t, 59.0, 0.2);
  if (t >= 59.2 && M.cageState === 'man') cx -= 20;
  let carried = null;
  if (M.cageState === 'man') { const k = Math.min(1, M.carry); const loc = M.carry > 1 && M.carry <= 2 ? k31lp(K31CARRY, [76, -152], M.carry - 1) : (M.carry > 2 ? [36, -92] : K31CARRY); const c2 = k31carried(M.P, loc); cx = K.lerp(cx, c2.x, k); cy = K.lerp(cy, c2.y, k); rot = 0.05 * Math.sin(t * 2) * (M.P.amp || 0); carried = true; }
  const base = { A: { x: 0, y: 0 }, B: { x: 0, y: 0 } };
  const drawCage = () => { const fy = k31cagePerch(cy, cs), bs = cs * 0.96, bA = { x: cx + 30, y: fy, s: bs, dir: -1, pal: 0, seed: 3 }, bB = { x: cx - 24, y: fy, s: bs, dir: -1, pal: 1, seed: 7 };
    const A = k31applyBird(Bd.A, bA), B = k31applyBird(Bd.B, bB); if (carried) { const bob = 2 * Math.sin(t * 7) * (M.P.amp || 0); A.y += bob; B.y += bob * 0.8; }
    k31cage(ctx, cx, cy, cs, 'back', { seeds: t < 64 ? 0 : 0 }); k31hoopoe(ctx, B); k31hoopoe(ctx, A); k31cage(ctx, cx, cy, cs, 'front', { latch: 1 }); base.A = A; base.B = B; };
  if (H && t < 61.3) k31hunter(ctx, H.P); else if (H) k31hunter(ctx, H.P);
  if (!carried) drawCage();
  person(ctx, M.P);
  if (carried) drawCage();
  // coins
  if (M.coinHand) k31coin(ctx, M.coinHand[0] + 8, M.coinHand[1] - 12 - 0 * (t - 42.22 > 0 && t < 42.97 ? 1 : 0), 11);
  if (H && H.palm) for (let i = 0; i < Math.min(2, H.coin); i++) k31coin(ctx, H.palm[0] - 6 + i * 12, H.palm[1] - 10, 11, { flat: 0.4 });
  if (H && H.fingers) { const h = k31hand(H.P, 1, H.P.handR); k31twoFingers(ctx, h[0], h[1] - 10, 1.4); }
  if (H && t >= 61.3 && t < 62.68) { const h = k31hand(H.P, 1, H.P.handR); k31coin(ctx, h[0], h[1] - 20 - 26 * Math.abs(Math.sin(t * 5)), 11, { rot: t * 9 }); }
  // coins travelling from the man's hand to the hunter's palm
  if (H && H.palm && t >= 57.74 && t < 58.45) [[57.74, 57.98], [58.25, 58.45]].forEach(([a, b], i) => { if (k31in(t, a, b)) { const src = k31hand(M.P, 1, M.P.handR), u = k31e(t, a, b - a); k31coin(ctx, K.lerp(src[0], H.palm[0] - 6 + i * 12, u), K.lerp(src[1] - 12, H.palm[1] - 10, u) - 20 * Math.sin(Math.PI * u), 11); } });
  return { man: M.P, hunter: H && H.P, A: base.A, B: base.B, cage: [cx, cy] };
}
// S5 thought cloud: the hand takes one bird out; the heart cracks
function k31cloudS5(ctx, t, man) {
  const p = k31e(t, 40.32, 0.5) * (1 - k31e(t, 53.6, 0.3)); if (p <= 0) return; const h = k31head(man), tc = t < 46.98 || t >= 52.4 ? t : 46.98;
  thoughtCloud(ctx, 300, 420, 340, 260, t, { p, tail: [h[0] - 30, h[1] - 50], bg: C.white, scale: 0.36, at: [500, 760], inside: (c) => {
    const cxx = 500, cyy = 1020, out = tc >= 44.42, shut = k31e(tc, 45.3, 0.25), lift = k31e(tc, 44.42, 0.6);
    const ins = { x: cxx - 40, y: k31cageFloor(cyy, 1.8), s: 1.2, dir: 1, pal: 1, crest: 0, noBlink: true, lid: 0.2 };
    if (tc >= 46.16) { ins.x = cxx + 20 * k31e(tc, 46.16, 0.4); ins.headRot = -0.5 * k31e(tc, 46.16, 0.4); ins.wet = true; ins.beak = 1; ins.shake = tremble(t, 1.5); ins.drop = -10; }
    k31cage(c, cxx, cyy, 1.8, 'back'); k31hoopoe(c, ins);
    const hx = K.lerp(cxx + 30, 720, lift), hy = K.lerp(k31cageFloor(cyy, 1.8) - 60, 620, lift);
    if (!out || lift < 0.4) k31hoopoe(c, { x: cxx + 40, y: k31cageFloor(cyy, 1.8) - 200 * lift, s: 1.2, dir: -1, pal: 0, crest: 0, noBlink: true });
    k31cage(c, cxx, cyy, 1.8, 'front', { door: 1.4 * k31e(tc, 43.0, 0.3) * (1 - shut) });
    if (tc >= 43.18) { const ax = K.lerp(1000, hx + 30, k31e(tc, 43.18, 0.6)), ay = K.lerp(300, hy - 10, k31e(tc, 43.18, 0.6)); seg(c, 1100, 250, ax + 30, ay - 20, 70, C.white, 6); shape(c, ell(ax, ay, 46, 40, 20), C.white, { lw: 6, seed: 150, dot: C.skin, pitch: 8, rad: 0.3 });
      if (out && lift >= 0.4) { k31hoopoe(c, { x: hx - 20, y: hy + 60, s: 1.2, dir: -1, pal: 0, crest: 0.1, gaze: [-0.5, 1], noBlink: true }); } }
    if (tc >= 44.42 && tc < 46.98) sfx(c, '1', 820, 560, 120, k31e(tc, 44.5, 0.3), { fill: C.yellow });
    if (t >= 52.4) { const k = k31e(t, 52.4, 0.15), sep = 60 * k31e(t, 52.6, 0.6); k31crackHeart(c, 560, 560, 70, k, sep); }
    else if (tc >= 46.16) heart(c, 560, 560, 70);
  } });
}

// ---------- S16: the palace front ----------
function k31drawS16(ctx, t) {
  const xf = (tt) => k31kv(tt, [[164.72, 360], [165.2, 362], [168.4, 640]]);
  const stepY = (x) => (x < 470 ? 872 : (x < 520 ? 886 : 900));
  const P = k31man({ ...walk(xf, t, { stride: 34 }), dir: 1, seed: 11 }); P.y = stepY(P.x) + (P.amp > 0.1 ? 0 : 0);
  const hopK = (x0) => { const a = (x0 - 360) / 280 * 3.68 + 164.72; return pulse(t, a - 0.18, 0.3); };
  P.y -= 10 * (hopK(470) + hopK(520)); P.sq = landSquash(t, (470 - 360) / 280 * 3.68 + 164.72 + 0.12, 0.04) * landSquash(t, (520 - 360) / 280 * 3.68 + 164.72 + 0.12, 0.04);
  P.handL = [-6, -108]; P.handR = [70, -108]; P.mouth = 'smile'; P.wet = t < 166.5; P.gaze = lookAt(k31head(P), [P.x + 60, 800]);
  const birdKeysA = [[170.1, -80, 300], [170.9, 250, 260], [171.4, 560, 300], [171.9, 790, 548]], birdKeysB = [[170.25, -160, 330], [171.05, 170, 290], [171.6, 520, 330], [172.15, 840, 548]];
  if (t >= 167.8 && t < 169.02) { P.handR = [70, -108 - 12 * k31tap(t, [168.1, 168.4], 0.2)]; P.gaze = [0.3, 0.8]; }
  if (t >= 169.02) { P.gaze = lookAt(k31head(P), t < 170.1 ? [760, 360] : [k31flight(t, birdKeysA, 'strong').x, k31flight(t, birdKeysA, 'strong').y - 30]); P.drop = -4; P.lid = Math.max(blink(t, 4), k31long(t, 169.4, 0.5)); }
  if (t >= 170.8) { P.handR = k31kv(t, [[170.8, [70, -108]], [171.1, PERSON_HANDS.wave.R], [172.6, PERSON_HANDS.wave.R], [173.1, [70, -108]]]); P.handR = [P.handR[0] + (t < 172.6 ? 10 * Math.sin(t * 10) : 0), P.handR[1]]; P.mouth = t < 172.6 ? 'open' : 'smile'; }
  if (t >= 172.6) P.sq = breathe(t, 2, 0.02);
  marketStreet(ctx, { ...K31STC, palaceDoor: 1 - k31e(t, 166.0, 0.6), lit: 0.6, t });
  // awning over the shop on the right; its front rod is where the birds land
  { const sw = 2 * Math.sin(t * 2.2); shape(ctx, [[690, 500], [960, 500], [980, 562 + sw], [670, 562 + sw]], C.red, { lw: 6, seed: 160, dot: C.white, pitch: 9, rad: 0.2, da: 0.5 }); for (let x = 690; x < 960; x += 54) { ctx.save(); ctx.beginPath(); ctx.moveTo(x, 500); ctx.lineTo(x + 27, 500); ctx.lineTo(x + 29, 562 + sw); ctx.lineTo(x - 2, 562 + sw); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill(); ctx.restore(); }
    seg(ctx, 660, 564 + sw, 990, 564 + sw, 9, WOOD, 3.5); seg(ctx, 680, 568, 680, 900, 8, WOOD, 3.5); }
  // the king waves once from the balcony window
  if (t >= 166.6 && t < 168.6) { ctx.save(); ctx.beginPath(); ctx.rect(305, 320, 110, 122); ctx.clip(); const k = k31e(t, 166.6, 0.4) * (1 - k31e(t, 168.2, 0.4)); person(ctx, { ...K31KING, x: 360, y: 560 - 60 * k, s: 0.7, mouth: 'smile', handR: [60 + 8 * Math.sin(t * 10), -200], gaze: [0.6, 0.6] }); ctx.restore(); }
  const jarPos = k31L2W(P, [32, -62]);
  person(ctx, P); k31jar(ctx, jarPos[0], jarPos[1], 0.55, { lid: true, glint: t >= 167.8 ? (t - 167.8) / 0.6 : 0 });
  const A = k31flight(t, birdKeysA, 'strong'), B = k31flight(t, birdKeysB, 'strong');
  const perch = (F, tl, i) => ({ x: F.x, y: F.y, s: 0.62, dir: F.fly ? 1 : -1, pal: i, fly: F.fly, flap: F.flap, rot: F.fly ? F.rot : 0, crest: F.fly ? 0.2 : K.clamp(k31e(t, tl + 0.2, 0.4) * 1.05), sq: F.fly ? 1 : landSquash(t, tl, 0.15), seed: 3 + i * 4, gaze: lookAt([F.x, F.y - 40], k31head(P)) });
  if (t >= 170.0) { k31hoopoe(ctx, perch(B, 172.15, 1)); k31hoopoe(ctx, perch(A, 171.9, 0)); }
  return { man: P, A, B };
}
function k31cloudS16(ctx, t, man) {
  const p = k31e(t, 169.02, 0.5) * (1 - k31e(t, 170.6, 0.4)); if (p <= 0) return; const h = k31head(man);
  ctx.save(); ctx.globalAlpha *= 1 - 0.6 * k31e(t, 170.4, 0.6);
  thoughtCloud(ctx, 760, 360, 300, 220, t, { p, tail: [h[0] + 20, h[1] - 50], bg: C.yellow, scale: 0.32, at: [500, 640], inside: (c) => {
    seg(c, 200, 700, 800, 700, 30, WOOD, 6); fig(c, 300, 760, 30); fig(c, 720, 770, 30);
    k31hoopoe(c, { x: 430, y: 688, s: 1.3, dir: 1, pal: 1, crest: 1, noBlink: true, lid: 0.3 }); k31hoopoe(c, { x: 580, y: 688, s: 1.3, dir: -1, pal: 0, crest: 1, noBlink: true, lid: 0.3 });
    heart(c, 505, 470, 50 * (1 + 0.06 * Math.sin(t * 5))); } });
  ctx.restore();
}
