// ===== ALI-03 shots S3-S7 (16.9 - 64.4 s): the day street. One world timeline (spy, Morgiana, the neighbour, the donkey, the cat)
// seen through several cameras, two inserts and the eye close-up. =====
const A3_DM = 'day';
const A3_CR3 = [1020, 770];   // the spy's cross by door 3

// ---------- the first spy in the street (16.9 - 36) ----------
const A3_SPY_X = a3Pos([[16.9, 700], [17.85, 966], [18.05, 960], [24.95, 960], [25.4, 930], [33.8, 930], [35.3, 330], [35.95, 40]]);
const A3_S3_STROKE = (t) => { const u1 = K.clamp((t - 21.9) / 0.68), u2 = K.clamp((t - 22.594) / 0.666), [cx, cy] = A3_CR3;
  if (t < 22.58) return [cx - 18 + 36 * u1, cy - 18 + 36 * u1]; if (t < 22.594) return [cx + 18, cy - 18]; return [cx + 18 - 36 * u2, cy - 18 + 36 * u2]; };
function a3Spy1Day(t) {
  const tc = AB_T2(t), W = walk(A3_SPY_X, tc, { stride: 24 }), P = { y: 905, dir: 1, ...W, mouth: 'closed', lid: abLid(t, 71, [18.15, 20.25, 20.65, 35.45]), tip: idleSway(tc, 72, 0.025, 2.2), sq: breathe(tc, 73, 0.015), gaze: [1, 0] };
  const o = { d: 2, kick: 0.2 * W.amp };
  if (tc < 17.9) { P.handL = [-14, -96]; P.handR = [14, -98 + 4 * osc(tc, 0.3)]; P.gaze = tc > 16.95 && tc < 17.35 ? [-0.6, 0.1] : [1, 0]; P.look = tc > 17.0 && tc < 17.35 ? -0.6 * osc(tc, 0.35) : 0; }
  else if (tc < 21.0) { P.tip += lurch(tc, 17.9, 0.08); P.handL = [-16, -100]; P.handR = [16, -102];
    P.gaze = gazePlan(tc, [[17.9, [1, 0]], [18.0, [0.4, -1]], [18.6, [1, 0.1]], [19.2, [0.3, -0.2]], [20.2, [-1, 0]], [20.6, [1, 0]], [20.85, [0, -1]]]); P.look = tc > 20.28 && tc < 20.6 ? -1 : tc > 20.68 && tc < 20.85 ? 1 : tc > 18.65 && tc < 19.2 ? 0.7 : 0; P.tilt = tc > 18.15 && tc < 18.6 ? -0.1 : tc > 20.9 ? -0.06 : 0;
    P.mouth = tc > 18.7 ? 'smile' : 'closed'; if (tc > 20.2) { P.drop = 8; P.sq *= 0.98; } if (tc > 19.1 && tc < 20.2) { P.handL = [12, -122 + 5 * osc(tc, 0.2)]; P.handR = [24, -126 - 5 * osc(tc, 0.2)]; } }
  else if (tc < 23.3) { o.chalk = tc > 21.1 ? 1 : 0; P.wink = tc > 21.4 ? 'L' : null; P.mouth = 'o'; P.gaze = [1, 0.1];
    if (tc < 21.45) { P.handR = [-12, -126]; P.handL = [-20, -100]; P.sq *= anticipate(tc, 21.0, 0.45, 0.04); }
    else if (tc < 21.9) { P.handRW = [K.lerp(980, A3_CR3[0] - 18, beatIn(tc, 21.45, 21.85)), K.lerp(790, A3_CR3[1] - 18, beatIn(tc, 21.45, 21.85))]; P.handL = [-24, -104]; }
    else { P.handRW = A3_S3_STROKE(tc); P.tip = 0.05 * Math.sin((tc - 21.9) * 7); P.handL = [-24, -104]; o.kick = 0.25 * Math.abs(Math.sin((tc - 21.9) * 5)); if (tc > 22.95) { P.mouth = 'o'; P.wink = null; } } }
  else if (tc < 26.0) { P.handL = [-40, -82]; P.handR = [40, -82]; P.tilt = 0.1; P.mouth = 'smile'; P.gaze = [1, -0.1]; P.lid = Math.max(P.lid, 0.2); }
  else if (tc < 27.8) { const g = beatIn(tc, 26.0, 27.0); P.mouth = g < 0.35 ? 'closed' : g < 0.7 ? 'smile' : 'open'; P.talk = g >= 0.7 ? 0.25 : 0; P.lid = Math.max(P.lid, 0.4); P.gaze = [0.2, 0.1];
    P.handL = [12, -122]; P.handR = [24, -126 + 6 * osc(tc, 0.25)]; if (tc > 27.0) P.sq *= 1 + 0.025 * Math.abs(Math.sin(tc * 14)); }
  else if (tc < 29.2) { P.tip = 0.08 * beatIn(tc, 27.8, 28.05); P.handR = [34, -178]; P.handL = [-20, -100]; P.gaze = gazePlan(tc, [[27.8, [-1, 0]], [28.15, [1, 0]], [28.5, [0, 0]]]); P.mouth = 'smile'; }
  else if (tc < 30.4) { P.talk = abTalk(t, 29.77, 30.46, 5, 0.8); P.mouth = P.talk ? 'open' : 'smile'; P.sq *= 1 + 0.03 * Math.abs(Math.sin((tc - 29.77) * 9)); P.handR = [60, -150]; P.handL = [-24, -104]; }
  else if (tc < 33.3) { P.gaze = [-0.4, -1]; P.mouth = 'smile'; P.lid = Math.max(P.lid, 0.15); P.tilt = -0.05;
    if (tc > 32.1) { const w = 8 * osc(tc, 0.4); P.handL = [-50, -104 + w]; P.handR = [50, -104 - w]; } else { P.handL = [-20, -100]; P.handR = [20, -102]; } }
  else if (tc < 33.8) { P.handR = [72, -150]; P.handL = [-24, -104]; P.wink = tc > 33.55 ? 'L' : null; P.tilt = -0.08; P.mouth = 'smile'; P.gaze = [0, 0]; }
  else { Object.assign(P, sneakChain(A3_SPY_X, 0, tc, { stride: 20, dir: -1 })); P.dir = -1; P.y = 905; P.mouth = tc > 35.25 ? 'o' : 'smile'; P.gaze = tc > 35.3 && tc < 35.6 ? [1, 0] : [-1, 0]; o.kick = 0.5;
    if (tc > 35.05) { P.handR = [8, -110]; P.handL = [-24, -104]; } }
  o.whiteHand = tc > 23.0 && tc < 35.05 ? 1 : 0;
  return { P, o };
}

// ---------- Morgiana in the day street (34.9 - 64.4) ----------
const A3_MG_X = a3Pos([[34.9, 40], [35.5, 250], [36.6, 450], [37.9, 640], [38.6, 735], [39.4, 830], [39.6, 856], [40.15, 862], [40.65, 1110], [41.1, 1118], [41.3, 1088], [56.15, 1085], [56.45, 935],
  [57.45, 930], [57.85, 985], [59.55, 985], [59.9, 790], [60.5, 790], [60.95, 510], [61.45, 510], [62.55, 1620], [63.15, 1620], [63.35, 1900]]);
const A3_MG_DIR = [[34.9, 1], [41.05, -1], [57.45, 1], [59.55, -1], [61.45, 1]];
const A3_MG_MARKS = [[2, 59.9, 0.6], [1, 60.95, 0.55], [4, 62.62, 0.5], [5, 63.36, 0.45]];
function a3MarkTip(door, t0, d, t) { const [cx, cy] = tsDoor(door).mark, p = K.clamp((t - t0) / d); if (p < 0.5) { const u = p * 2; return [cx - 18 + 36 * u, cy - 18 + 36 * u]; } const u = (p - 0.5) * 2; return [cx + 18 - 36 * u, cy - 18 + 36 * u]; }
function a3MorgDay(t) {
  const tc = AB_T2(t); let dir = 1; for (const [a, d] of A3_MG_DIR) if (tc >= a) dir = d;
  const W = walk(A3_MG_X, tc, { stride: 22 }), P = { y: 905, dir, ...W, mouth: 'closed', lid: abLid(t, 81, [45.3, 47.9, 52.2]), tip: idleSway(tc, 82, 0.025, 2.4), sq: breathe(tc, 83, 0.014), gaze: [dir, 0] };
  const o = { basket: 'hip', stream: K.clamp(Math.abs(speed(A3_MG_X, tc)) / 900), kick: 0 }; let orange = null, lift = 0;
  if (tc < 38.4) { P.gaze = gazePlan(tc, [[34.9, [1, 0]], [35.3, [-1, 0]], [35.8, [1, -0.1]], [36.6, [0.4, -0.5]], [37.4, [-0.3, 0]], [38.0, [1, 0]]]); P.look = tc > 35.3 && tc < 35.8 ? -0.8 : 0; P.mouth = 'smile';
    if (tc > 37.7 && tc < 38.05) P.handR = [64, -196 + 10 * osc(tc, 0.12)]; }
  else if (tc < 39.5) { P.mouth = 'smile'; P.gaze = [1, 0]; const fall = beatIn(tc, 38.45, 38.62);
    if (tc < 38.62) { orange = [P.x + 28, 905 - 120 + 70 * fall * fall]; P.handR = [40, -100 + 40 * fall]; }
    else if (tc < 39.35) { P.handR = [40, -64 + (tc > 39.0 ? -30 * Math.sin(Math.PI * beatIn(tc, 39.0, 39.3)) : 0)]; P.gaze = tc > 38.8 && tc < 39.0 ? [0.5, 0.8] : [1, 0]; orange = 'hand'; if (tc > 39.0 && tc < 39.3) orange = 'toss'; }
    else P.handR = [-10, -110]; }
  else if (tc < 40.2) { const h = Math.sin(Math.PI * beatIn(tc, 39.75, 40.1)); lift = 34 * h; P.sq *= 1.04; P.handR = [10, -205]; P.gaze = [0.2, -1]; P.mouth = 'smile'; o.kick = swing(t, 40.1, 0.4); }
  else if (tc < 41.05) { P.mouth = 'smile'; P.gaze = [1, 0.2]; if (tc > 40.6) { P.handR = [92, -150 + 4 * osc(tc, 0.3)]; } }
  else if (tc < 43.2) { if (tc >= 41.3) { P.ph = Math.PI / 2; P.amp = 0.8; } const frz = tc > 41.38; P.gaze = tc > 41.3 ? [-1, -0.3] : [-1, 0]; P.eyes = tc > 41.3 ? 'wide' : undefined; if (frz) P.tip = 0.02; o.kick = swing(t, 41.4, 0.5); P.handR = [10, -110]; P.mouth = tc > 41.3 ? 'o' : 'smile'; }
  else if (tc < 45.0) { P.kneel = tc < 43.9 ? 0.45 * Math.sin(Math.PI * beatIn(tc, 43.2, 43.95)) * 1.3 : 0; P.gaze = [-1, -0.3]; P.mouth = 'closed'; o.basket = tc > 43.6 ? [1125, 905] : 'hip';
    if (tc > 43.9) { const r = beatIn(tc, 43.9, 44.3); P.handRW = r < 1 ? [K.lerp(1060, A3_CR3[0] + 6, r), K.lerp(800, A3_CR3[1] + 2, r)] : tc < 44.4 ? [A3_CR3[0] + 6, A3_CR3[1] + 2] : null; P.tilt = 0.04;
      if (tc >= 44.4) { P.handR = [26, -150 + 3 * osc(tc, 0.16)]; P.handL = [16, -146 - 3 * osc(tc, 0.16)]; P.gaze = [0.4, 0.5]; } } }
  else if (tc < 47.5) { o.basket = [1125, 905]; P.gaze = gazePlan(tc, [[45.0, [-0.3, 0]], [45.15, [-1, 0]]]); P.look = tc > 45.3 ? -1 : 0; P.mouth = 'closed'; }
  else if (tc < 56.0) { o.basket = [1125, 905]; P.handR = [16, -160 - (tc > 49.4 && tc < 52.0 ? 6 * pulse(tc % 0.65, 0, 0.15) : 0)]; P.handL = [22, -112]; P.gaze = [0, -1]; P.tip = 0.03 * osc(tc, 3.1);
    if (tc > 52.1 && tc < 53.4) { P.look = Math.sin(AB_T3(t) * Math.PI * 2 / 0.75) > 0 ? 0.8 : -0.8; P.gaze = [0, 0.2]; P.handR = [22, -112]; }
    if (tc > 53.4 && tc < 54.85) { P.gaze = [-1, -0.2]; P.look = -0.6; }
    if (tc > 54.85 && tc < 55.5) { P.handR = [44, -205]; P.gaze = [0, 0]; P.talk = abTalk(t, 54.9, 55.42, 8, 0.4); P.mouth = P.talk ? 'open' : 'closed'; }
    if (tc >= 55.5) { P.handR = tc < 55.62 ? [44, -186] : [40, -170]; P.mouth = 'smile'; P.gaze = [0, 0]; } }
  else {   // S7: in, out with the chalk, the marking run
    o.basket = tc < 56.05 ? [1125, 905] : tc < 56.6 ? 'hip' : null; o.chalk = tc > 58.2 && tc < 64.15 ? (tc < 58.9 ? 2 : 1) : 0;
    if (tc < 56.15) { P.kneel = 0.4 * Math.sin(Math.PI * beatIn(tc, 56.0, 56.15)); P.handLW = [1125, 870]; }
    if (tc >= 57.45 && tc < 57.85) { const u = beatIn(tc, 57.45, 57.85); lift = 50 * Math.sin(Math.PI * u); P.handL = [-50, -170]; P.handR = [50, -176]; P.sq = 1.04; }
    P.sq *= landSquash(tc, 57.85, 0.15) * landSquash(tc, 62.55, 0.12) * landSquash(tc, 63.35, 0.1);
    if (tc >= 58.2 && tc < 58.9) { P.handR = [40, -200]; P.gaze = tc < 58.6 ? [0.4, -1] : [1, 0]; P.mouth = 'smile'; }
    if (tc >= 58.9 && tc < 59.55) { P.handRW = [A3_CR3[0] - 4, A3_CR3[1] - 6]; P.wink = 'L'; P.gaze = [1, 0]; }
    for (const [door, t0, d] of A3_MG_MARKS) if (tc >= t0 - 0.05 && tc < t0 + d + 0.05) { P.handRW = a3MarkTip(door, t0, d, tc); P.handR = null; P.gaze = [P.dir, 0]; P.tip = 0.04; }
    if (o.stream > 0.3) { P.tip = 0.12 * P.dir * 0 + 0.12; P.handL = [-30, -120]; P.handR = P.handRW ? null : [40, -130]; }
    if (tc >= 63.85) { P.mouth = tc < 64.1 ? 'o' : 'smile'; P.handR = tc < 64.1 ? [30, -176] : [10, -100]; P.handL = [-40, -84]; P.wink = tc > 64.1 ? 'R' : null; P.gaze = [0, 0]; P.tip = -0.04; } }
  return { P, o, orange, lift, inDoor: tc >= 56.4 && tc < 57.45 };
}

// ---------- the neighbour, the donkey and the cat ----------
function a3NeighDay(t) { const tc = AB_T2(t), P = { x: 600, y: 905, dir: -1, lid: abLid(t, 91), tip: 0.03 + idleSway(tc, 92, 0.02, 2.6), sq: breathe(tc, 93, 0.012), gaze: [-0.3, 0.6], mouth: 'closed', handR: [40, -110], handL: [20, -120] }, o = { broom: 30 * osc(tc, 0.8) };
  if (tc > 37.4 && tc < 38.6) { P.gaze = [-1, 0]; P.handR = [64, -196]; o.lift = 0.6; P.mouth = tc > 37.7 ? 'smile' : 'closed'; o.broom = 10; }
  else if (tc > 38.6 && tc < 41) P.mouth = 'smile';
  if (tc > 46.0 && tc < 47.2) { P.gaze = [1, -0.4]; P.tilt = 0.1; o.broom = 0; }
  if (tc > 60.45 && tc < 60.95) { P.handR = [40, -190]; o.lift = 1; P.gaze = [-1, 0]; P.mouth = 'o'; }
  return { P, o }; }
function a3DonkeyDay(t, mg) { const tc = AB_T2(t), P = { x: 1290, y: 905, s: 0.82, dir: -1, pal: 0, chew: Math.abs(Math.sin(tc * 6)), earL: 0.4 + idleSway(tc, 101, 0.3, 1.6), earR: 0.3 + idleSway(tc, 102, 0.3, 2.1), tailSwish: osc(tc, 1.6), lid: abLid(t, 103), neck: idleSway(tc, 104, 0.06, 3.2) };
  if (tc > 18.6 && tc < 20.0) { P.earL = -0.3; P.chew = tc > 19.0 ? 0 : P.chew; P.lid = 0.3; P.neck = 0.1; }
  if (tc > 25.4 && tc < 26.0) P.snort = Math.sin(Math.PI * beatIn(tc, 25.4, 26.0));
  if (tc > 34.95 && tc < 38) { P.earL = 1; P.earR = 1; P.tailSwish = osc(tc, 0.6); }
  if (tc > 40.55 && tc < 41.3) { P.neck = 0.45 * Math.sin(Math.PI * beatIn(tc, 40.55, 41.3)); P.lid = 0.5; }
  if (tc > 41.3 && tc < 43) { P.chew = Math.abs(Math.sin(tc * 8)); P.lid = 0.45; }
  if (tc > 43.9 && tc < 45.2) { P.chew = 0; P.earL = 0.9; P.earR = 0.9; }
  if (tc > 56.5 && tc < 57.6) { P.earL = 1; P.earR = 0.8; P.neck = 0.15; P.chew = 0; }
  if (tc > 61.7 && tc < 62.4) { P.earL = 1; P.earR = 1; P.neck = 0.2; }
  return P; }
function a3CatDay(t) { const tc = AB_T2(t);
  if (tc < 26) { const x = kfn(tc, [[16.9, 600], [18.2, 720]], 'inOut'), walking = tc < 18.2; return { x, y: 282, dir: 1, sit: walking ? 0 : 1, ...(walking ? walk((u) => kfn(u, [[16.9, 600], [18.2, 720]]), tc, { stride: GAIT.cat * 0.55 }) : {}), lick: tc > 18.6 && tc < 21 ? 1 : 0, gaze: [1, 0.6] }; }
  return { x: 1215, y: 586, dir: tc > 47.0 && tc < 52 ? 1 : -1, sit: 1, crouch: tc > 56.6 && tc < 57.6 ? 1 : 0, lick: tc < 28.4 ? 1 : 0, gaze: tc > 28.4 && tc < 34 ? [-1, 0.8] : [-1, 0.4], lid: tc > 28.4 && tc < 34 ? 0 : abLid(t, 94) }; }

// ---------- the world ----------
function a3DayWorld(ctx, t, cam) {
  const tc = AB_T2(t), mg = t > 34.85 ? a3MorgDay(t) : null;
  const doorOpen = kfn(tc, [[56.05, 0], [56.3, 0.8], [56.6, 0.8], [56.8, 0.25], [57.3, 0.25], [57.45, 0.8], [58.1, 0.8], [58.6, 0.35]]);
  const tuck = tc < 39.0 ? 1 : tc < 39.6 ? 1 - beatIn(tc, 39.0, 39.55) : tc < 39.95 ? 0 : beatIn(tc, 39.95, 40.15);
  a3Street(ctx, t, cam, { m: A3_DM, flock: [300, 230, 110, 4, 5, 18], washing: { items: 4, tuck, flash: t > 19.7 && t < 20.7 ? 0.8 * Math.sin(Math.PI * beatIn(t, 19.7, 20.7)) : 0 },
    doors: doorOpen > 0.01 ? [{ i: 3, open: doorOpen, inside: mg && mg.inDoor ? (c) => { const Q = { ...mg.P, x: 930, y: 900, s: 0.88 }; abCel(c, [930, 900, 300, 330], (cc) => morgiana(cc, t, Q, 'morning', { shadow: false, basket: 'hip' }), { tint: '#2a1a2a', k: 0.5 }); } : null }] : [] });
  // the inside icons (S7: a drawer, rummaging ticks)
  if (t > 56.65 && t < 57.45) { const k = K.ease.back(K.clamp((t - 56.65) / 0.2)); ctx.save(); ctx.translate(930, 610); ctx.scale(k, k); celShade(ctx, K.rectPts(-34, -26, 68, 40), '#c8844a', '#8a5226', { off: 5, lw: 3 }); seg(ctx, -10, -8, 10, -8, 5, '#ffd36a', 1); ctx.restore();
    ctx.save(); ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const [dx, a] of [[-70, 56.85], [70, 57.05]]) if (t > a) { ctx.beginPath(); ctx.arc(930 + dx, 600, 22, dx < 0 ? 2.4 : -0.6, dx < 0 ? 3.8 : 0.8); ctx.stroke(); } ctx.restore(); }
  a3Cat(ctx, t, a3CatDay(t));
  const D = a3DonkeyDay(t, mg); a3Shadow(ctx, D.x, 905, 230); abDonkey(ctx, D, 'morning');
  if (tc > 40.7 && tc < 41.1) { const h = [D.x - 128, 806]; seg(ctx, h[0] - 30, h[1] + 4, h[0] + 4, h[1] - 2, 6, '#ff7a1a', 1.5); }
  // the neighbour sweeping at door 2
  const N = a3NeighDay(t); a3Neighbour(ctx, t, N.P, 'morning', N.o);
  // the first spy
  if (t < 36.0) { const { P, o } = a3Spy1Day(t), draw = (c) => spyDisguise(c, t, 1, P, 'morning', o); a3ArchFig(ctx, P.x, P.y, draw);
    if (t > 26.2 && t < 27.6) for (const a of [26.3, 26.8, 27.3]) { const [hx, hy] = a2Hand(P, 1, { s: 0.98, age: 0.35 }); a3Puff(ctx, hx, hy - 10, (t - a) / 0.45, 4, 6); }
    if (t > 21.9 && t < 23.4) { const tip = A3_S3_STROKE(t); a3Puff(ctx, tip[0], tip[1], ((t - 21.9) % 0.34) / 0.34, 3, 5); }
    if (t > 23.0 && t < 23.5) a3Puff(ctx, A3_CR3[0] - 10, A3_CR3[1] - 4, (t - 23.0) / 0.5, 6, 8); }
  // Morgiana
  if (mg && !mg.inDoor) { const { P, o, orange, lift } = mg; if (lift) { a3Shadow(ctx, P.x, 905, 100, lift); P.y = 905 - lift; o.shadow = false; }
    if (Array.isArray(o.basket)) a3Basket(ctx, o.basket[0], o.basket[1], 0.68);
    const bk = o.basket; const draw = (c) => morgiana(c, t, P, 'morning', { ...o, basket: Array.isArray(bk) ? null : bk }); a3ArchFig(ctx, P.x, P.y, draw);
    if (orange) { let ox, oy; if (Array.isArray(orange)) [ox, oy] = orange; else { [ox, oy] = a2Hand(P, 1, A3_MORG); if (orange === 'toss') oy -= 50 * Math.sin(Math.PI * beatIn(t, 39.0, 39.3)); oy -= 8; } abBlob(ctx, ox, oy, 11, 11, '#ff9a2a', '#d0661a', { lw: 2, hi: '#ffd08a', off: 3 }); }
    if (t > 63.85 && t < 64.3) { const [hx, hy] = a2Hand(P, 1, A3_MORG); a3Puff(ctx, hx + 10, hy - 16, (t - 63.85) / 0.4, 5, 6); }
    for (const [door, t0, d] of A3_MG_MARKS) if (t > t0 && t < t0 + d + 0.3) { const tip = a3MarkTip(door, t0, d, Math.min(t, t0 + d)); a3Puff(ctx, tip[0], tip[1], ((t - t0) % 0.3) / 0.3, 3, 5); }
    if (t > 61.5 && t < 62.5) { ctx.save(); ctx.globalAlpha = 0.5; abDust(ctx, P.x - 80, 912, 140, 60, t, 0.6, '#f0d8b0'); ctx.restore(); } }
  // the idea spark
  if (t > 55.5 && t < 56.05 && mg) { const [hx, hy] = a2HeadPt(mg.P, 0, -90, A3_MORG), u = K.clamp((t - 55.5) / 0.5); abGlint(ctx, hx, hy, 40, u); abGlow(ctx, hx, hy, 70, 0.6 * Math.sin(Math.PI * u), '#fff0a0');
    ctx.save(); ctx.strokeStyle = '#ffe9a0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const a = i * 1.047, r0 = 26 + 20 * u, r1 = r0 + 16; ctx.globalAlpha = 1 - u; ctx.beginPath(); ctx.moveTo(hx + Math.cos(a) * r0, hy + Math.sin(a) * r0); ctx.lineTo(hx + Math.cos(a) * r1, hy + Math.sin(a) * r1); ctx.stroke(); } ctx.restore(); }
  // rings: the spy's fresh mark (25-26), the mark insert (42.4-43.2), the empty spots on the other walls (46-47.5)
  if (t > 25.0 && t < 26.3) tsRing(ctx, A3_CR3[0], A3_CR3[1], (t - 25.0) / 0.65 % 1, '#ffffff');
  if (t > 42.45 && t < 43.2) { tsRing(ctx, A3_CR3[0], A3_CR3[1], (t - 42.45) / 0.7, '#7fe3ff'); const R = K.rng(3); ctx.fillStyle = '#fffaf2'; for (let i = 0; i < 7; i++) { const ph = R(), x = A3_CR3[0] - 16 + R() * 32, y = A3_CR3[1] + 18 + ((t * 60 * (0.5 + R()) + ph * 80) % 90); ctx.fillRect(x, y, 3, 3); } }
  for (const [door, a] of [[2, 46.05], [1, 46.35], [4, 46.95], [5, 47.05]]) { const [x, y] = tsDoor(door).mark; tsRing(ctx, x, y, (t - a) / 0.5, '#7fe3ff', { dash: true, r0: 22, grow: 12 }); }
}
function a3DayOver(ctx, t, cam, S) {
  const tc = AB_T2(t);
  if (t > 19.6 && t < 21.3) { const [x, y] = abP(930, 330, cam), [ax, ay] = abP(930, 620, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 21.0) / 0.25); S.arrow(ctx, [x, y + 40], [ax, ay], K.clamp((t - 19.75) / 0.4), { color: '#ff7a5a', bend: 0.05 }); ctx.restore(); a2Tag(ctx, S, "ALI BABA'S HOUSE", x, y, t, 19.7, 21.0, { size: 44 }); }
  if (t > 29.2 && t < 31.1) { const [hx, hy] = abP(930, 690, cam); abSay(ctx, S, [[29.3, "I'LL BE BACK TONIGHT!"]], t, K.clamp(hx - 20, 300, 700), hy - 150, [hx, hy - 30], { size: 52, gone: 30.8, wobble: 3 }); }
  if (t > 30.4 && t < 33.5) { const [hx, hy] = abP(930, 680, cam), p = K.clamp((t - 30.4) / 0.6) * (1 - K.clamp((t - 33.3) / 0.15));
    thoughtCloud(ctx, 430, 330, 600, 400, t, { p, tail: [hx - 10, hy - 30], scale: 0.5, at: [940, 740], inside: (c) => a3DreamInside(c, t) }); }
  if (t > 36.5 && t < 38.5 && t < 41) { const tx = t < 38.1 ? A3_MG_X(Math.min(AB_T2(t), 38.1)) : A3_MG_X(38.1), [x, y] = abP(tx, 640, cam); a2Tag(ctx, S, 'MORGIANA', x, y, t, 36.6, 38.15, { size: 44, col: '#bff6f8' }); }
  if (t > 48.4 && t < 52.5) a3WhyCloud(ctx, t, cam, S);
  if (t > 53.8 && t < 54.9) a2Inset(ctx, t, [70, 110, 340, 250], K.clamp((t - 53.8) / 0.25) * (1 - K.clamp((t - 54.7) / 0.2)), (c) => a3MemoryInset(c, t));
  if (t > 54.8 && t < 55.9) { const [hx, hy] = abP(1085, 700, cam); abSay(ctx, S, [[54.9, 'THERE IS A SECRET!']], t, K.clamp(hx - 60, 300, 700), hy - 160, [hx, hy - 30], { size: 52, gone: 55.6 }); }
  if (t > 59.6 && t < 64.4) { const v = t < 60.5 ? 1 : t < 61.5 ? 2 : t < 63.12 ? 3 : t < 63.81 ? 4 : 5, last = [59.6, 60.5, 61.5, 63.12, 63.81][v - 1], pop = 1 + 0.35 * Math.max(0, 1 - (t - last) / 0.25);
    ctx.save(); ctx.translate(850, 175); ctx.scale(pop, pop); S.counter(ctx, v, 0, 0, K.clamp((t - 59.6) / 0.3), { size: 120, color: v === 5 ? '#ffd36a' : '#7fe3ff' }); ctx.restore(); if (v === 5) abGlint(ctx, 880, 120, 60, K.clamp((t - 63.81) / 0.5)); }
  if ((t > 46.82 && t < 47.2) || (t > 61.5 && t < 62.35)) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, alpha: 0.5, n: 26 });
}
// the dream in the thought cloud (S4): night street, the cross shining, the little leader pats the little spy and drops a purse
function a3DreamInside(c, t) {
  const tc = AB_T2(t); c.drawImage(tsSkyPlate('night'), -300, 0); tsMoon(c, 1110, 470, 1, 60); c.drawImage(tsTownPlate('night'), 0, 0); tsLanterns(c, t, 1); tsMarks(c, t, { only: [3], glow: 0.9 });
  const lx = kfn(tc, [[31.1, 1260], [32.0, 1010]], 'out'), L = { x: lx, y: 905, dir: -1, ...walk((u) => kfn(u, [[31.1, 1260], [32.0, 1010]], 'out'), tc, { stride: 26 }), mouth: 'smile', gaze: [-1, 0.2] };
  if (tc > 32.1) { L.handRW = tc < 32.6 ? [890, 690 + 6 * osc(tc, 0.2)] : [920, 790]; }
  a2Lead(c, t, L, 'night', { shc: A3_NSH });
  const SP = { x: 880, y: 905, dir: 1, mouth: 'smile', handR: tc < 32.1 ? [100, -150] : [40, -110], handL: tc < 32.1 ? [-20, -100] : [30, -112], gaze: tc < 31.1 ? [1, 0] : [1, -0.4], lid: tc > 32.1 && tc < 32.6 ? 1 : 0 };
  spyDisguise(c, t, 1, SP, 'night', { shc: A3_NSH });
  if (tc > 32.6) { const fy = kfn(tc, [[32.6, 770], [32.85, 805]], 'in'); abPurse(c, 915, fy, 1.4); }
}
// WHY ONLY OUR DOOR? (S6): a thought balloon with five door icons; ours carries the cross
function a3WhyCloud(ctx, t, cam, S) {
  const [hx, hy] = abP(1085, 700, cam), p = K.clamp((t - 48.4) / 0.5), fade = 1 - K.clamp((t - 52.1) / 0.3);
  ctx.save(); ctx.globalAlpha *= fade;
  thoughtCloud(ctx, 440, 330, 700, 420, t, { p, tail: [hx - 10, hy - 30], inside: () => {} });
  if (p > 0.6) { ctx.save(); ctx.font = `700 46px "${BF}"`; ctx.fillStyle = '#2b1a3a'; ctx.textAlign = 'center'; ctx.globalAlpha *= K.clamp((p - 0.6) / 0.3); ctx.fillText('WHY ONLY OUR DOOR?', 440, 250); ctx.restore(); }
  const pops = [49.5, 50.1, 50.86, 51.5, 51.8];
  TS.doors.forEach((d, i) => { const a = pops[i]; if (t < a) return; const k = K.ease.back(K.clamp((t - a) / 0.2)), x = 440 + (i - 2) * 118, y = 380;
    ctx.save(); ctx.translate(x, y); ctx.scale(k * 0.85, k * 0.85); a3DoorIcon(ctx, 0, 0, d.col, { cross: i === 2, glow: 0.6 + 0.3 * Math.sin(t * 6), tick: i !== 2 ? K.clamp((t - a - 0.15) / 0.2) : 0 }); ctx.restore();
    if (i === 2) tsRing(ctx, x + 44, y + 6, ((t - a) / 0.6) % 1, '#ffffff', { r0: 20, grow: 30 }); });
  ctx.restore();
}
// the memory inset (S6): the stranger in the arch hides a chalk-white hand in his sleeve (on twos)
function a3MemoryInset(c, t) {
  const tc = AB_T2(t), u = beatIn(tc, 53.9, 54.5);
  c.save(); c.translate(70, 110); c.scale(0.95, 0.95); c.translate(-90, -560);
  c.drawImage(tsSkyPlate('day'), -300, 0); c.drawImage(tsTownPlate('day'), 0, 0);
  const P = { x: 260, y: 905, dir: -1, mouth: 'o', gaze: [1, 0], handR: [K.lerp(60, 8, u), K.lerp(-130, -110, u)], handL: [-24, -104] }; spyDisguise(c, t, 1, P, 'morning', { whiteHand: 1 - u });
  const [hx, hy] = a2Hand(P, 1, { s: 0.98, age: 0.35 }); tsRing(c, hx, hy, ((t - 54.1) / 0.5), '#ffd36a', { r0: 16, grow: 16 });
  c.restore();
}

// ---------- the chalk insert (23.2 - 24.9) and Morgiana's eyes (41.5 - 42.4) ----------
function a3ChalkInsert(ctx, t, S) {
  const tc = AB_T2(t), wall = '#e0a888'; a3WallBg(ctx, wall, { seed: 8 });
  celShade(ctx, [[-20, -20], [250, -20], [250, 1250], [-20, 1250]], '#e8d2b0', '#b89a7a', { light: [-1, -1], off: 30, lw: 6, line: '#6a4a3a' }); ctx.save(); ctx.beginPath(); ctx.rect(-20, -20, 180, 1270); ctx.clip(); a3WoodBg(ctx, '#8a5a3a'); ctx.restore();
  const g = t > 24.42 ? 0.6 + 0.4 * Math.exp(-(t - 24.42) * 3) : 0.35; doorMark(ctx, 580, 560, { kind: 'x', s: 7, glow: g });
  if (t > 24.42) { abGlint(ctx, 640, 480, 220, K.clamp((t - 24.42) / 0.45)); abGlow(ctx, 580, 560, 420, 0.5 * Math.exp(-(t - 24.42) * 4), '#ffffff'); }
  const R = K.rng(12); ctx.fillStyle = '#fffaf2'; for (let i = 0; i < 18; i++) { const x = 460 + R() * 240, ph = R(), y = 700 + (((t - 23.2) * (200 + R() * 260) + ph * 400) % 560); ctx.fillRect(x, y, 6, 6); }
  const out = K.ease.inOut(beatIn(tc, 23.25, 24.1)), hx = K.lerp(790, 900, out) + tremble(tc, 1.2, 9), hy = K.lerp(860, 1120, out);
  a3BigHand(ctx, hx, hy, 1.5, { sleeve: '#b46eb4', sleeveD: '#8e4a8e', curl: 0.55, chalk: true, white: 1, rot: 2.55 - 0.25 * out });
}
AB_SHOTS.push({ a: 16.9, b: 23.2, ww: 2000, cam: a3Cam([[16.9, { x: 700, y: 492, zoom: 1.25 }], [18.2, { x: 760, y: 615, zoom: 1.0 }], [20.8, { x: 930, y: 615, zoom: 1.0 }], [21.0, { x: 930, y: 615, zoom: 1.0 }], [21.9, { x: 990, y: 700, zoom: 1.45 }], [23.2, { x: 995, y: 705, zoom: 1.5 }]]), world: a3DayWorld, over: a3DayOver });
AB_SHOTS.push({ a: 23.2, b: 24.9, panel: a3ChalkInsert });
AB_SHOTS.push({ a: 24.9, b: 26.0, ww: 2000, cam: a3Cam([[24.9, { x: 1000, y: 720, zoom: 1.6 }], [25.6, { x: 930, y: 640, zoom: 1.1 }], [26.0, { x: 932, y: 640, zoom: 1.1 }]]), world: a3DayWorld, over: a3DayOver });
AB_SHOTS.push({ a: 26.0, b: 41.5, ww: 2000, cam: a3Cam([[26.0, { x: 960, y: 690, zoom: 1.4 }], [30.2, { x: 945, y: 690, zoom: 1.4 }], [31.2, { x: 900, y: 600, zoom: 1.1 }], [33.3, { x: 900, y: 600, zoom: 1.1 }], [34.3, { x: 880, y: 612, zoom: 1.05 }], [35.5, { x: 520, y: 615, zoom: 1.0 }], [41.0, { x: 880, y: 615, zoom: 1.0 }], [41.5, { x: 905, y: 615, zoom: 1.0 }]]), world: a3DayWorld, over: a3DayOver });
AB_SHOTS.push({ a: 41.5, b: 42.4, panel: (ctx, t) => { const tc = AB_T2(t), lid = tc < 41.75 ? 0 : tc < 41.95 ? Math.sin(Math.PI * beatIn(tc, 41.75, 41.95)) : [0, 0.12, 0.24, 0.35][Math.min(3, Math.floor((tc - 41.95) * 8))];
  a3Eyes(ctx, t, { who: 'morgiana', gaze: [-0.5, 0.05], lid, wide: tc < 41.75 ? 1 : 0, reflect: (c, r) => { c.save(); c.translate(-r * 0.05, r * 0.15); c.strokeStyle = '#ffffff'; c.lineWidth = r * 0.12; c.lineCap = 'round'; c.beginPath(); c.moveTo(-r * 0.2, -r * 0.2); c.lineTo(r * 0.2, r * 0.2); c.moveTo(r * 0.2, -r * 0.2); c.lineTo(-r * 0.2, r * 0.2); c.stroke(); c.restore(); } }); } });
AB_SHOTS.push({ a: 42.4, b: 43.2, ww: 2000, cam: a3Cam([[42.4, { x: 1010, y: 770, zoom: 2.6 }], [43.2, { x: 1022, y: 768, zoom: 2.75 }]]), world: a3DayWorld, over: a3DayOver });
AB_SHOTS.push({ a: 43.2, b: 47.5, ww: 2000, cam: a3Cam([[43.2, { x: 980, y: 700, zoom: 1.4 }], [45.9, { x: 990, y: 690, zoom: 1.4 }], [46.75, { x: 520, y: 640, zoom: 1.1 }], [46.85, { x: 520, y: 640, zoom: 1.1 }], [47.15, { x: 1700, y: 640, zoom: 1.1 }], [47.5, { x: 1720, y: 640, zoom: 1.1 }]]), world: a3DayWorld, over: a3DayOver });
AB_SHOTS.push({ a: 47.5, b: 56.0, ww: 2000, cam: a3Cam([[47.5, { x: 1000, y: 690, zoom: 1.35 }], [48.4, { x: 940, y: 620, zoom: 1.15 }], [55.0, { x: 955, y: 628, zoom: 1.15 }], [56.0, { x: 990, y: 680, zoom: 1.35 }]]), world: a3DayWorld, over: a3DayOver });
AB_SHOTS.push({ a: 56.0, b: 64.4, ww: 2000, cam: a3Cam([[56.0, { x: 960, y: 630, zoom: 1.15 }], [59.5, { x: 960, y: 630, zoom: 1.15 }], [59.95, { x: 700, y: 630, zoom: 1.05 }], [61.0, { x: 520, y: 630, zoom: 1.0 }], [61.4, { x: 520, y: 630, zoom: 1.0 }], [62.35, { x: 1700, y: 615, zoom: 1.0 }], [63.9, { x: 1700, y: 615, zoom: 1.0 }], [64.4, { x: 1640, y: 615, zoom: 1.0 }]]), world: a3DayWorld, over: a3DayOver });
