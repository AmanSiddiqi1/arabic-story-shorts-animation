// ===== ALI-03 shots S1-S2 (0 - 16.9 s): the leader sends a spy (morning glade), the market and the clue =====

// ---------- S1 0-6.9: crane down; the leader paces, picks the plum man, throws his arm at the far town; the disguise; exit left ----------
const A3_S1_CAM = [[0, { x: 1600, y: 492, zoom: 1.25 }], [1.3, { x: 1640, y: 615, zoom: 1.0 }], [5.6, { x: 1610, y: 615, zoom: 1.0 }], [6.6, { x: 1480, y: 615, zoom: 1.0 }], [6.9, { x: 1100, y: 615, zoom: 1.0 }]];
const A3_S1_LX = a3Pos([[0, 1440], [1.8, 1560]], 'out');
const A3_S1_SX = a3Pos([[5.8, 1770], [6.9, 1330]], 'in');
const A3_S1_ROW = [[0, 1700], [4, 1880]];   // men i0 (indigo) and i4 (saffron); the spy (i1) is the middle one at 1790
function a3S1Spy(t) {
  const tc = AB_T2(t); let x = tc < 2.3 ? 1790 : tc < 5.8 ? K.lerp(1790, 1770, beatIn(tc, 2.3, 2.6)) : A3_S1_SX(tc), y = tc < 2.3 ? 900 : K.lerp(900, 935, K.ease.out(beatIn(tc, 2.3, 2.6)));
  const P = { x, y, dir: -1, mouth: 'closed', gaze: [-1, 0], lid: abLid(t, 31, [2.95, 4.75]), tip: idleSway(tc, 32, 0.025, 2.3), sq: breathe(tc, 33, 0.015) };
  const o = { d: 0, kick: 0 };
  if (tc < 1.6) { P.gaze = gazePlan(tc, [[0, [-1, 0]], [0.9, [-0.6, 0.1]], [1.3, [-1, 0]]]); P.handL = [-24, -96]; P.handR = [20, -98]; }
  else if (tc < 2.3) { P.eyes = 'wide'; P.handR = tc < 1.75 ? [30, -130] : [6, -134]; P.mouth = 'o'; P.gaze = [-1, 0]; }
  else if (tc < 2.65) { P.ph = (y - 900) / 9; P.amp = 0.7; P.tip = -0.04; P.mouth = 'smile'; P.handR = [6, -134]; P.sq *= 1 + 0.04 * Math.sin(Math.PI * beatIn(tc, 2.4, 2.65)); }
  else if (tc < 4.5) { P.gaze = tc < 3.7 ? [-1, -0.3] : [-1, 0]; P.look = tc > 2.95 && tc < 3.7 ? -1 : 0; P.mouth = 'smile'; P.handL = [-28, -100]; P.handR = [24, -102]; }
  else if (tc < 5.0) { const b = Math.sin(Math.PI * beatIn(tc, 4.5, 5.0)); P.handR = [4, -124]; P.tip = 0.12 * b; P.lid = Math.max(P.lid, 0.3); P.mouth = 'smile'; }
  else if (tc < 5.8) { P.lid = 0.3; if (tc < 5.3) { o.d = 0; P.handR = [12, -218]; P.handL = [-12, -214]; P.tilt = 0.06; } else if (tc < 5.6) { o.d = 1; P.handR = [70, -150]; P.handL = [-14, -212]; o.cloth = 1; }
    else { o.d = 2; P.tilt = 0.18 * (1 - beatIn(tc, 5.6, 5.85)); P.handR = [16, -214]; P.handL = [-30, -100]; o.kick = swing(t, 5.6, 0.7, 1.6, 3); } P.mouth = 'smile'; }
  else { const W = walk(A3_S1_SX, tc, { stride: 24 }); Object.assign(P, W); o.d = 2; P.handL = [-34 + 16 * Math.sin(W.ph), -100]; P.handR = [34 - 16 * Math.sin(W.ph), -102]; P.tip = 0.04 + idleSway(tc, 34, 0.04, 0.7); P.mouth = 'smile'; P.gaze = [-1, -0.1]; o.kick = 0.3 * W.amp; }
  return { P, o };
}
function a3S1World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning';
  abFlock(ctx, t, 1150, 300, 120, 4, 3, 0.4);
  a3GladeBack(ctx, t, cam);
  // the men in the row (i0 chews a straw, i4 scratches under his head cloth and sniggers at the disguise)
  const men = A3_S1_ROW.map(([i, x], k) => { const lean = beatIn(tc, 1.6, 1.8) * (1 - beatIn(tc, 2.2, 2.5)) * (k ? 1 : -1) * 0.06, relief = 1 - 0.03 * Math.sin(Math.PI * beatIn(tc, 2.2, 2.6));
    const P = { x, y: 900, dir: -1, tip: lean + idleSway(tc, 40 + k, 0.025, 2.6 + k * 0.4), sq: breathe(tc, 42 + k, 0.016) * relief, lid: abLid(t, 44 + k, [2.9 + 0.14 * k]), gaze: gazePlan(tc, [[0, [-1, 0]], [2.85 + 0.12 * k, [-1, -0.3]], [3.9, [-1, 0]], [4.6, [k ? -1 : 1, 0]]]), look: tc > 2.9 + 0.12 * k && tc < 3.8 ? -1 : 0 };
    if (k === 1 && tc > 0.4 && tc < 2.4) { P.handR = [20, -214 + 6 * osc(tc, 0.25)]; P.tilt = 0.06; }
    if (k === 1 && tc > 5.35 && tc < 5.85) { P.sq *= 1 + 0.03 * Math.abs(Math.sin(tc * 24)); P.mouth = 'smile'; P.handR = [8, -170]; }
    if (k === 1 && tc >= 5.85) { P.mouth = 'closed'; P.gaze = [-1, 0.3]; }
    a2Man(ctx, i, P, m, { t, shc: A3_SH });
    if (k === 0) { const [mx, my] = a2HeadPt(P, -8, 24, { s: 0.95, age: 0.35 }), w = 4 * Math.sin(tc * 9); seg(ctx, mx, my, mx - 30, my - 6 + w, 3, '#e8c870', 0); }
    return P; });
  // the spy (the middle man)
  const { P: SP, o: SO } = a3S1Spy(t); spyDisguise(ctx, t, 1, SP, m, { ...SO, shc: A3_SH });
  if (SO.cloth) { const [hx, hy] = a2Hand(SP, 1, { s: 0.98, age: 0.35 }); celShade(ctx, [[hx - 14, hy - 10], [hx + 18, hy - 6], [hx + 10, hy + 40], [hx - 8, hy + 34]], AB_RIDER0[1].hc, abDark(AB_RIDER0[1].hc, 0.3), { off: 4, lw: 2.5 }); }
  // the leader: paces, points, throws the arm at the town, says it, watches the spy go
  const W = walk(A3_S1_LX, tc, { stride: 26 }), L = { y: 900, ...W, dir: tc >= 2.3 && tc < 4.4 ? -1 : tc >= 6.05 ? -1 : 1, lid: abLid(t, 21, [2.3, 4.4]), tip: idleSway(tc, 22, 0.02, 2.8), sq: breathe(tc, 23, 0.014), brow: 0.75 };
  if (tc < 1.6) { L.handL = [-10, -94]; L.handR = [12, -96]; L.gaze = gazePlan(tc, [[0, [1, 0]], [0.6, [1, -0.1]], [1.1, [1, 0.05]]]); L.look = 0.3; }
  else if (tc < 2.3) { L.handR = [100, -150]; L.gaze = [1, 0]; L.tip = 0.04; }
  else if (tc < 4.4) { const a = a2ArmVal(tc, 2.2); L.handR = a2ArmHand(a); L.gaze = [1, -0.15]; L.sq *= anticipate(tc, 2.2, 0.45, 0.05); L.talk = abTalk(t, 3.48, 4.42, 3, 0.7); if (L.talk) L.mouth = 'open'; }
  else { L.handL = [-10, -94]; L.handR = [12, -96]; L.gaze = tc < 5.55 ? [1, 0] : tc < 5.85 ? [1, -0.05] : [-1, 0]; if (tc > 5.8) { const u = (tc - 6.45) / 0.5; L.lid = u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; } }
  const kick = 0.55 * pulse(tc, 2.84, 0.5) + 0.25 * W.amp + 0.2 * pulse(tc, 2.3, 0.35);
  a2Lead(ctx, t, L, m, { kick, shc: A3_SH });
  // the house-with-a-question pictogram over the spy (he thinks it is easy)
  if (t > 4.6 && t < 5.35) { const k = K.ease.back(K.clamp((t - 4.6) / 0.2)) * (1 - K.clamp((t - 5.2) / 0.15)), [hx, hy] = a2HeadPt(SP, 0, -110, { s: 0.98, age: 0.35 });
    ctx.save(); ctx.translate(hx, hy); ctx.scale(k, k); celShade(ctx, [[-26, 0], [-26, -34], [0, -56], [26, -34], [26, 0]], '#fff1d8', '#d8c8a8', { off: 5, lw: 3 }); ctx.fillStyle = '#4a2c46'; ctx.fillRect(-7, -20, 14, 20);
    ctx.font = `800 40px "${BF}"`; ctx.fillStyle = '#ffd36a'; ctx.textAlign = 'center'; ctx.fillText('?', 42, -26); ctx.restore(); }
  return { L, SP };
}
function a3S1Over(ctx, t, cam, S) {
  if (t > 0.3 && t < 3.4) { const off = t > 3.0 ? [1, 0, 1, 0, 0, 0, 0][Math.min(6, Math.floor((t - 3.0) * 15))] : 1, dy = (cam.y - 492) * -0.4;
    if (off) { S.title(ctx, 'THE MARKED DOOR', 500, 205 + dy, K.clamp((t - 0.3) / 1.0), { size: 84, align: 'center' });
      if (t > 0.8) S.title(ctx, 'الباب ذو العلامة', 500, 335 + dy, K.clamp((t - 0.8) / 1.0), { size: 74, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); } }
  const tc = AB_T2(t);
  if (t > 2.8 && t < 3.75) { const L = { x: 1560, y: 900, dir: -1, s: 1.08 }, h = a2ArmHand(a2ArmVal(tc, 2.2)), from = abP(1560 - h[0] * 1.08, 900 + h[1] * 1.08, cam), to = abP(1240, 770, cam);
    ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 3.45) / 0.3); S.arrow(ctx, from, to, K.clamp((t - 2.8) / 0.45), { color: '#7fe3ff', bend: -0.25 }); ctx.restore();
    for (const [wx, wy, d] of [[1206, 772, 0], [1288, 768, 0.12]]) { const [x, y] = abP(wx, wy, cam); abGlint(ctx, x, y, 30, K.clamp((t - 3.2 - d) / 0.4)); } }
  if (t > 3.4 && t < 4.95) { const [hx, hy] = abP(1560, 655, cam); abSay(ctx, S, [[3.48, 'FIND HIS HOUSE!']], t, Math.min(hx - 40, 640), hy - 120, [hx, hy - 30], { size: 52, gone: 4.7 }); }
  if (t > 1.0 && t < 2.6) { const [x, y] = abP(1560, 600, cam); S.label(ctx, 'THE LEADER', x, y, K.clamp((t - 1.0) / 0.4), { size: 38 }); }
  if (t > 6.62) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, alpha: 0.55 * K.clamp((t - 6.62) / 0.1), n: 30 });
}
AB_SHOTS.push({ a: 0, b: 6.9, ww: 2400, cam: a3Cam(A3_S1_CAM), under: a2GladeUnder('morning'), world: a3S1World, over: a3S1Over });

// ---------- S2 6.9-16.9: the market pan: ALI BABA? x3 (fruit, cloth, the old woman and the cat), the gold coin, THAT WAY!, the arch ----------
const A3_S2_CAM = [[6.9, { x: 780, y: 615, zoom: 1.0 }], [7.08, { x: 520, y: 615, zoom: 1.0 }], [12.4, { x: 1100, y: 615, zoom: 1.0 }], [13.9, { x: 1130, y: 615, zoom: 1.0 }], [15.6, { x: 1500, y: 615, zoom: 1.0 }], [16.9, { x: 1520, y: 615, zoom: 1.0 }]];
const A3_S2_X = a3Pos([[7.25, -60], [8.2, 200], [8.95, 215], [9.3, 330], [10.2, 335], [10.55, 660], [10.85, 672], [11.05, 820], [11.62, 832], [11.9, 1040], [13.92, 1048], [15.0, 1560], [15.55, 1745], [16.1, 1750], [16.6, 1890]]);
const A3_FOLK_X = { fruit: 410, cloth: 780, granny: 900, jar: 1190 };
function a3S2Spy(t) {
  const tc = AB_T2(t), W = walk(A3_S2_X, tc, { stride: 24 }), P = { y: 925, dir: 1, ...W, mouth: 'closed', lid: abLid(t, 61, [12.75, 15.95]), tip: idleSway(tc, 62, 0.025, 1.9), sq: breathe(tc, 63, 0.015), gaze: [1, 0] };
  const o = { d: 2, kick: 0.25 * W.amp };
  if (tc < 9.25) { P.handL = [-12, -96]; P.handR = [12, -98]; P.gaze = gazePlan(tc, [[7, [1, 0]], [7.6, [-1, -0.1]], [8.0, [1, -0.3]], [8.4, [0.4, 0.5]], [8.95, [-1, 0]]]); if (tc > 8.2 && tc < 8.95) { P.handRW = [K.lerp(270, 300, beatIn(tc, 8.2, 8.4)), 782]; P.handR = null; } }
  else if (tc < 10.2) { P.tip = 0.1; P.handR = [34, -178]; P.brow = -0.5; P.gaze = [1, 0]; P.talk = abTalk(t, 9.34, 10.0, 4, 0.5); }
  else if (tc < 11.9) { P.drop = -4 + 6 * beatIn(tc, 10.2, 11.8); P.handL = [-20, -110]; P.handR = [24, -112]; P.gaze = [1, tc > 11.3 && tc < 11.62 ? 0.4 : 0]; if (tc > 10.55 && tc < 10.85 || tc > 11.05 && tc < 11.3) { P.tip = 0.08; P.handR = [34, -178]; } if (tc > 11.3 && tc < 11.62) { P.tip = 0.16; P.handR = [70, -120]; } }
  else if (tc < 12.62) { P.sq *= 0.96; P.drop = 8; P.handR = [22, -212 + 6 * osc(tc, 0.25)]; P.lid = Math.max(P.lid, 0.45); P.gaze = [0, 0.4]; }
  else if (tc < 13.92) { const up = beatIn(tc, 13.1, 13.4); P.drop = 8 * (1 - up); P.sq *= 0.96 + 0.06 * up; P.gaze = tc < 12.75 ? [1, 0] : [1, -0.2]; P.look = tc > 12.75 ? 1 : 0; P.mouth = tc > 13.1 ? 'smile' : 'o';
    if (tc > 13.25) { P.handL = [12, -122 + 6 * osc(tc, 0.18)]; P.handR = [22, -128 - 6 * osc(tc, 0.18)]; } else { P.handL = [-20, -100]; P.handR = [20, -100]; } }
  else if (tc < 15.55) { Object.assign(P, sneakChain(A3_S2_X, 0, tc, { stride: 20 })); P.y = 925; P.drop = 10; P.mouth = 'smile'; P.gaze = [1, 0]; o.kick = 0.6; }
  else if (tc < 16.1) { P.tip = 0.12; P.gaze = tc > 15.9 ? [-1, 0] : [1, 0]; P.dir = tc > 15.9 && tc < 16.05 ? -1 : 1; P.handR = [40, -160]; P.handL = [-10, -110]; }
  else { P.sq = 1.08; P.tip = -0.05; P.handL = [-6, -120]; P.handR = [10, -124]; P.gaze = [1, 0]; o.kick = 0.9; }
  return { P, o, coin: tc > 13.2 && tc < 13.9 ? 1 : 0 };
}
function a3S2World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning';
  ctx.drawImage(a3MarketPlate(), 0, 0);
  abFlock(ctx, t, 100, 230, 130, 5, 7, 0.4); if (t > 11) abFlock(ctx, t - 11, 1900, 170, -110, 3, 9, 0.36);
  if (t > 15.0 && t < 15.8) abBands(ctx, [1700, 560, 300, 360], t, { cols: ['#ffe8b0'], alpha: 0.28 * Math.sin(Math.PI * beatIn(t, 15.0, 15.8)), w: 120, speed: 420, n: 1, angle: -0.3 });
  // the cat on the crate (turns its back on the spy at 11.4)
  const sp = a3S2Spy(t); a3Cat(ctx, t, { x: 962, y: 846, dir: tc > 11.42 && tc < 13.6 ? 1 : -1, gaze: tc > 13.6 && tc < 14.6 ? [1, -0.3] : [sp.P.x > 962 ? 1 : -1, 0.2], tailCurl: tc > 11.42 && tc < 11.9 ? 1 : undefined });
  // sellers (each on its own period)
  const F = (kind, P) => a3Folk(ctx, kind, { y: 905, x: A3_FOLK_X[kind], dir: -1, lid: abLid(t, kind.length * 7), tip: idleSway(tc, kind.length * 3, 0.02, 2.5), sq: breathe(tc, kind.length, 0.014), ...P }, m);
  const fr = { handR: [30 + 10 * Math.cos(tc * 7), -130 + 8 * Math.sin(tc * 7)], handL: [24, -124], gaze: [0.3, 0.6], mouth: 'smile' };
  if (tc > 9.7 && tc < 10.25) Object.assign(fr, { handL: [-60, -104], handR: [60, -104], look: osc(tc, 0.33), gaze: [-1, 0], mouth: 'frown' });
  F('fruit', fr); if (tc < 9.7 || tc > 10.25) { const [hx, hy] = a2Hand({ x: 410, y: 905, dir: -1, s: 0.92, ...fr }, 1, { s: 0.92, age: 0.2 }); abBlob(ctx, hx, hy - 8, 11, 11, '#e8364f', '#a8203a', { lw: 2, hi: '#ffb0b0', off: 3 }); }
  const cl = { handL: [-40 - 18 * Math.sin(tc * 2.6), -126], handR: [40 + 18 * Math.sin(tc * 2.6), -124], gaze: [0, 0.8], mouth: 'closed' }; if (tc > 10.6 && tc < 10.95) cl.look = osc(tc, 0.3);
  F('cloth', cl); seg(ctx, 780 - 46 - 18 * Math.sin(tc * 2.6) * 0.95, 905 - 120, 780 + 46 + 18 * Math.sin(tc * 2.6) * 0.95, 905 - 118, 16, '#e8364f', 2.5);
  const gr = { hold: 'stick', handL: [24, -112 + 4 * osc(tc, 0.5)], gaze: [0, 0.6], mouth: 'closed' }; if (tc > 11.05 && tc < 11.45) { gr.handR = [50 + 16 * osc(tc, 0.18), -170]; gr.gaze = [-1, 0]; gr.mouth = 'frown'; gr.brow = 0.6; }
  F('granny', gr);
  const jr = { gaze: [0.2, 0.5], mouth: 'closed', handR: [64 + 10 * osc(tc, 0.4), -112], handL: [30, -100] };
  if (tc > 12.4 && tc < 13.6) { jr.handR = tc > 12.8 && tc < 13.05 ? [10, -168] : [44, -212]; jr.gaze = [-0.3, -1]; jr.wink = 'L'; jr.mouth = 'smile'; }
  else if (tc >= 13.6 && tc < 14.7) { jr.handR = [-40, -186]; jr.gaze = [0.3, -0.6]; jr.handL = [40, -200]; jr.mouth = 'smile'; jr.talk = abTalk(t, 13.7, 14.2, 7, 0.6); }
  else if (tc >= 14.7) { jr.handL = [40, -200]; jr.gaze = [0.3, -0.8]; jr.mouth = 'smile'; }
  const J = F('jar', jr); const coinAt = tc > 12.4 && tc < 13.6 ? a2Hand(J, 1, { s: 0.95, age: 0.3 }) : tc >= 13.6 ? a2Hand(J, 0, { s: 0.95, age: 0.3 }) : null;
  if (coinAt) { abBlob(ctx, coinAt[0], coinAt[1] - 12, 13, 13, '#ffcf3a', '#c07a12', { lw: 2.5, hi: '#fff3b0', off: 4 }); if (t > 12.62 && t < 13.5) abGlint(ctx, coinAt[0] + 4, coinAt[1] - 18, 46, ((t - 12.62) / 0.45) % 1); }
  // the spy
  const { P, o, coin } = sp, draw = (c) => { spyDisguise(c, t, 1, P, m, { ...o, shc: A3_SH }); if (coin) for (const sd of [-1, 1]) { const [x, y] = a2HeadPt(P, sd * 13 + (P.look || 0) * 3, -4, { s: 0.98, age: 0.35 }); abBlob(c, x, y, 7, 7, '#ffcf3a', '#c07a12', { lw: 1.5, off: 2, hi: '#fff3b0' }); } };
  if (P.x > 1790) { const k = K.clamp((P.x - 1790) / 90); abCel(ctx, [P.x, P.y, 320, 330], draw, { tint: '#2a1a2a', k: 0.3 * k, alpha: 1 - K.clamp((P.x - 1850) / 40) }); } else draw(ctx);
  if (tc > 8.45 && tc < 8.85) { const [hx, hy] = a2Hand(P, 1, { s: 0.98, age: 0.35 }); abBlob(ctx, hx, hy - 10, 11, 11, '#ff9a2a', '#d0661a', { lw: 2, hi: '#ffd08a', off: 3 }); }
  return { P, J };
}
function a3S2Over(ctx, t, cam, S) {
  if (t < 7.1) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, alpha: 0.5 * (1 - K.clamp((t - 6.95) / 0.15)), n: 30 });
  const tc = AB_T2(t), sx = A3_S2_X(tc);
  if (t > 9.3 && t < 10.5) { const [hx, hy] = abP(sx, 690, cam); abSay(ctx, S, [[9.4, 'ALI BABA?']], t, Math.max(hx + 60, 190), hy - 110, [hx + 10, hy - 20], { size: 52, gone: 10.2 }); }
  const droop = K.clamp((t - 11.8) / 0.4);
  for (const [wx, a] of [[680, 10.55], [840, 11.08], [920, 11.35]]) { const [x, y] = abP(wx, wx === 920 ? 740 : 610, cam); a3Q(ctx, S, x, y, t, a, 12.2, { droop, size: 50 }); }
  if (t > 13.1 && t < 13.95) { const [x0, y0] = abP(1175, 690, cam), [x1, y1] = abP(sx + 18, 695, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 13.7) / 0.25); S.arrow(ctx, [x0, y0], [x1, y1], K.clamp((t - 13.1) / 0.35), { color: '#ffd36a', bend: 0.3 }); ctx.restore(); }
  if (t > 13.6 && t < 14.9) { const [hx, hy] = abP(1190, 680, cam); abSay(ctx, S, [[13.7, 'THAT WAY!']], t, hx - 30, hy - 120, [hx, hy - 20], { size: 52, gone: 14.6 }); }
}
AB_SHOTS.push({ a: 6.9, b: 16.9, ww: 2000, cam: a3Cam(A3_S2_CAM), world: a3S2World, over: a3S2Over });
