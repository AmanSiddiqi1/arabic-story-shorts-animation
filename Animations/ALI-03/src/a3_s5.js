// ===== ALI-03 shots S14-S17 (111.3 - 147.48 s): the second night, the leader thinks, Morgiana warns Ali Baba, the oil merchant =====
const A3_N2 = 'night2';

// ---------- S14 111.3-116.2: the second night: the chain, the red dot on door 1, the leader's finger, the pan, four fingers ----------
const A3_C2_X = (u) => u < 112.9 ? K.lerp(-40, 270, (u - 111.6) / 1.3) : 270 + 30 * K.ease.out(K.clamp((u - 112.9) / 0.3));
const A3_C2 = ['spy2', 'leader', 0, 4, 'spy1'];
const A3_S14_PAN = (t) => kfn(t, [[113.7, 520], [115.1, 1200]]);
function a3S14Pose(k, t) {
  const tc = AB_T2(t), C = sneakChain(A3_C2_X, k, tc, { gap: 66, delay: 0.25, stride: 15, stop: 113.1 }), P = { y: 905, dir: 1, ...C, lid: abLid(t, 400 + k), gaze: [1, -0.1], mouth: 'closed' };
  if (tc > 113.25 + 0.25 * k) { P.amp = 0; P.tip = idleSway(tc, 410 + k, 0.02, 2.3); P.handL = [-20, -100]; P.handR = [20, -104]; }
  return P;
}
function a3S14World(ctx, t, cam) {
  const tc = AB_T2(t), pan = t > 113.7 && t < 115.15;
  a3Street(ctx, t, cam, { m: A3_N2, lan: 1, marks: { glow: 0.45, flare: (M) => M.kind === 'dot' && pan ? Math.exp(-Math.pow((tsDoor(M.door).dot[0] - cam.x) / 200, 2)) : 0 } });
  tsMoth(ctx, t, 2); a3Cat(ctx, t, { x: 110, y: 362, dir: 1, sit: 1, gaze: [1, 0.4], tailCurl: 0.9 });
  for (let k = A3_C2.length - 1; k >= 0; k--) { const P = a3S14Pose(k, t), who = A3_C2[k]; let o = { shc: A3_NSH };
    if (who === 'spy2') { o = { ...o, slip: 0.5, brush: tc > 113.15 ? 'hand' : 'ear', pot: 1, potSwing: 0.2 * Math.sin(P.ph || 0) };
      if (tc < 113.15) P.handL = [-60, -150 + 8 * osc(tc, 0.3)];
      if (tc > 113.15 && tc < 113.75) { P.handR = [96, -160 + 30 * Math.sin((tc - 113.15) * 12)]; P.tip = 0.1; P.lid = 1; P.mouth = 'smile'; }
      if (tc > 113.75) { P.handR = [60, -130]; P.gaze = [1, -0.1]; P.mouth = 'smile'; }
      if (tc > 115.6) { P.sq = 0.92; P.drop = 10; o.slip = 1; P.handR = [40, -80]; o.brushRot = 1.2; P.mouth = 'frown'; } }
    if (who === 'leader' && tc > 113.7) { const r = beatIn(tc, 113.7, 114.3); P.handR = [K.lerp(20, 108, r), K.lerp(-104, -168, r)]; P.gaze = [1, -0.1]; P.mouth = 'closed'; P.brow = 0.6; }
    if (tc > 115.15) { const pt = { leader: [0, [108, -168]], 0: [0.12, [-100, -176]], 4: [0.24, [104, -196]], spy1: [0.36, [100, -150]] }[who]; if (pt && tc > 115.15 + pt[0]) { P.handR = pt[1]; P.gaze = [who === 0 ? -1 : 1, -0.2]; } }
    if (who === 'spy1') { P.handL = [22, -105]; P.handR = P.handR && tc > 115.5 ? P.handR : [-18, -112]; if (tc > 115.6) { P.lid = 0.4; P.mouth = 'smile'; P.handR = [-18, -112]; } o.dot = 1; }
    const draw = (c) => { if (who === 'spy2') spyDisguise(c, t, 2, P, A3_N2, o); else if (who === 'spy1') spyDisguise(c, t, 1, P, A3_N2, o); else if (who === 'leader') a2Lead(c, t, { ...P, fin: A3_NRIM }, A3_N2, { shc: A3_NSH, kick: 0.2 }); else a2Man(c, who, P, A3_N2, { t, shc: A3_NSH }); };
    a3ArchFig(ctx, P.x, 905, draw); }
}
function a3S14Over(ctx, t, cam, S) {
  if (t > 115.15) [[235, 0], [170, 0.12], [105, 0.24], [40, 0.36]].forEach(([x, d]) => { const [px, py] = abP(x, 640, cam); a3Q(ctx, S, px, py, t, 115.2 + d, 116.1, { size: 44 }); });
}
AB_SHOTS.push({ a: 111.3, b: 115.15, ww: 2000, cam: (t) => t < 113.7 ? { x: 520, y: 615, zoom: 1.0 } : { x: A3_S14_PAN(t), y: 615, zoom: 1.0 }, world: a3S14World, over: a3S14Over });
AB_SHOTS.push({ a: 115.15, b: 116.2, ww: 2000, cam: a3Cam([[115.15, { x: 420, y: 650, zoom: 1.2 }], [116.2, { x: 425, y: 652, zoom: 1.22 }]]), world: a3S14World, over: a3S14Over });

// ---------- S15 116.2-128.3: stillness; SOMEONE ON THIS STREET IS CLEVERER THAN US!; the eyes; I WILL COME MYSELF.; the blue-paint volunteer ----------
const A3_S15_LX = a3Pos([[127.1, 480], [127.95, 140]], 'in');
function a3S15World(ctx, t, cam) {
  const tc = AB_T2(t), slit = tc > 121.6 && tc < 128.2 ? 1 - beatIn(tc, 127.95, 128.2) : 0;
  a3Street(ctx, t, cam, { m: A3_N2, lan: 1, marks: { glow: 0.45 }, win: { sh: 0, slit, inside: slit > 0 ? (c) => { const W = TS.win; c.fillStyle = AB_MORG_ACC; c.fillRect(W.cx - 9, W.y + 10, 18, 26); c.fillStyle = '#f7c6a3'; c.fillRect(W.cx - 9, W.y + 36, 18, 24); c.fillStyle = '#2a1018'; c.beginPath(); c.ellipse(W.cx - 3, W.y + 46, 4, 3, 0, 0, 7); c.fill(); } : null } });
  if (t > 119.2 && t < 120.0) abBands(ctx, [0, 220, 2000, 700], t, { cols: ['#c8d8ff'], alpha: 0.2 * Math.sin(Math.PI * beatIn(t, 119.2, 120.0)), w: 220, speed: 900, n: 1, angle: -0.2 });
  if (slit > 0) abGlint(ctx, TS.win.cx, TS.win.y + 20, 24, ((t - 121.6) / 0.7) % 1, '#bff6f8');
  a3Cat(ctx, t, { x: 1000, y: 242, dir: -1, sit: 1, gaze: [-1, 0.6], tailCurl: 0.8 });
  // the men (offended wave at 121.64; the volunteer with blue paint; then they scramble after him)
  const men = [['spy1', 190], [0, 260], [4, 330], ['spy2', 420]];
  men.forEach(([who, x0], k) => { const xf = (u) => u < 127.3 + 0.12 * k ? (who === 4 ? K.lerp(x0, 395, beatIn(u, 125.2, 125.55)) : x0) : K.lerp(who === 4 ? 395 : x0, -80, K.ease.in(beatIn(u, 127.3 + 0.12 * k, 128.3 + 0.1 * k)));
    const W = walk(xf, tc, { stride: 20 }), P = { y: who === 4 && tc > 125.2 && tc < 127.3 ? 920 : 885, dir: tc > 127.3 ? -1 : 1, ...W, lid: abLid(t, 420 + k), tip: idleSway(tc, 430 + k, 0.025, 2.2), sq: breathe(tc, 440 + k, 0.016), gaze: [1, 0], mouth: 'closed', handL: [-20, -100], handR: [20, -102] };
    if (tc > 121.64 && tc < 122.4) { P.look = k % 2 ? -0.8 : 0.8; P.gaze = [k % 2 ? -1 : 1, 0]; P.brow = 0.6; P.mouth = 'frown'; } if (tc > 122.0 && tc < 122.6) { P.gaze = [0, 1]; P.look = 0; }
    const o = { shc: A3_NSH };
    if (who === 4 && tc > 125.2 && tc < 127.3) { P.handR = [40, -170]; P.handL = [30, -120]; P.mouth = 'smile'; P.sq *= landSquash(tc, 125.55, 0.15); if (tc > 126.45) { P.tip = -0.2 * beatIn(tc, 126.45, 126.7); P.sit = beatIn(tc, 126.7, 126.95); P.seat = 'floor'; P.mouth = 'o'; P.eyes = 'wide'; } }
    if ((who === 'spy1' || who === 'spy2') && tc > 125.5 && tc < 126.5) { P.look = osc(tc, 0.35) * 0.8; P.mouth = 'frown'; }
    if (who === 'spy1') { spyDisguise(ctx, t, 1, P, A3_N2, { ...o, dot: 1 }); return; } if (who === 'spy2') { spyDisguise(ctx, t, 2, P, A3_N2, { ...o, slip: 0.4, brush: 'ear', pot: 1 }); return; }
    a3ArchFig(ctx, P.x, P.y, (c) => a2Man(c, who, P, A3_N2, { t, shc: A3_NSH }));
    if (who === 4 && tc > 125.2 && tc < 127.3) { const [hx, hy] = a2Hand(P, 0, { s: 0.95, age: 0.35 }); a3PaintPot(ctx, hx, hy, swing(t, 125.55, 0.4) + (tc > 126.5 ? swing(t, 126.5, 0.6) : 0), 0.95, '#3f7ad0');
      const [bx, by] = a2Hand(P, 1, { s: 0.95, age: 0.35 }); ctx.save(); ctx.translate(bx, by); ctx.rotate(-0.8); seg(ctx, -20, 0, 18, 0, 5, '#c8a070', 1.5); celShade(ctx, [[18, -5], [34, -3], [40, 0], [34, 3], [18, 5]], '#3f7ad0', '#24407a', { off: 2, lw: 1.5 }); ctx.restore(); } });
  // the leader
  const W = walk(A3_S15_LX, tc, { stride: 30 }), L = { y: 905, dir: tc < 122.6 ? 1 : -1, ...W, lid: 0, tip: 0, sq: breathe(tc, 451, 0.008), brow: 0.6, gaze: [0.4, -0.2], mouth: 'closed', handL: [-10, -94], handR: [12, -96], fin: A3_NRIM };
  if (tc < 117.5) { L.handR = [44, -196]; L.gaze = gazePlan(tc, [[116.2, [1, 0]], [116.8, [0.3, -0.2]], [117.2, [1, -0.1]]]); }
  else if (tc < 118.3) { L.handR = [16, -158 + 4 * osc(tc, 0.5)]; L.gaze = gazePlan(tc, [[117.5, [-0.6, -1]], [117.95, [0.6, -1]]]); L.lid = Math.sin(Math.PI * beatIn(tc, 117.9, 118.25)) * 0.9; }
  else if (tc < 122.0) { L.talk = abTalk(t, 118.7, 121.64, 6, 0.35); if (L.talk) L.mouth = 'open'; L.gaze = [0.2, 0]; L.handR = tc > 120.6 ? [36, -200 + 6 * pulse(tc, 120.74, 0.15)] : [16, -158]; L.lid = 0.25; }
  else if (tc < 123.8) { L.handL = [10, -130]; L.handR = [18, -136]; L.sq *= tc > 123.2 ? impactSquash(tc, 123.2, 0.96) : 1; L.gaze = [0, 0]; L.lid = 0.2; }
  else if (tc < 126.4) { L.handR = [4, -128]; L.tilt = -0.06; L.tip = 0.04 * pulse(tc, 124.9, 0.3); L.talk = abTalk(t, 124.42, 125.24, 7, 0.5); if (L.talk) L.mouth = 'open'; L.gaze = [0, 0]; L.lid = 0.25; }
  else if (tc < 127.1) { L.handRW = [395, 740]; L.gaze = [0, 0]; L.lid = 0.3; }
  else { L.gaze = [-1, 0]; L.tip = 0.06; L.handL = [-34 + 16 * Math.sin(W.ph), -100]; L.handR = [34 - 16 * Math.sin(W.ph), -100]; }
  const kick = swing(t, 122.6, 0.8, 1.3, 2) + (tc > 127.1 ? 0.6 * W.amp : 0);
  a3ArchFig(ctx, L.x, 905, (c) => a2Lead(c, t, L, A3_N2, { shc: A3_NSH, kick: Math.abs(kick) }));
}
function a3S15Over(ctx, t, cam, S) {
  const lx = A3_S15_LX(AB_T2(t)), [hx, hy] = abP(lx, 680, cam);
  if (t > 118.2 && t < 120.8) abSay(ctx, S, [[118.3, 'SOMEONE ON THIS STREET...'], [119.96, '...IS CLEVERER THAN US!']], t, K.clamp(hx, 400, 600), hy - 200, [hx, hy - 30], { size: 48, gone: 120.68 });
  if (t > 121.6 && t < 122.0) abSay(ctx, S, [[121.6, '...IS CLEVERER THAN US!']], t, K.clamp(hx, 400, 600), hy - 200, [hx, hy - 30], { size: 48, gone: 121.75, pop: false });
  if (t > 124.3 && t < 125.9) abSay(ctx, S, [[124.42, 'I WILL COME MYSELF.']], t, K.clamp(hx, 400, 600), hy - 200, [hx, hy - 30], { size: 52, gone: 125.6 });
}
AB_SHOTS.push({ a: 116.2, b: 120.7, ww: 2000, cam: a3Cam([[116.2, { x: 500, y: 680, zoom: 1.3 }], [120.7, { x: 490, y: 690, zoom: 1.5 }]]), world: a3S15World, over: a3S15Over });
AB_SHOTS.push({ a: 120.7, b: 121.6, panel: (ctx, t, S) => { const tc = AB_T2(t); a3Eyes(ctx, t, { who: 'leader', gaze: [0.15, 0], lid: [0.2, 0.3, 0.4, 0.5][Math.min(3, Math.floor((tc - 120.7) * 6))], brow: 1, glint: 1 });
  abSay(ctx, S, [[120.7, '...IS CLEVERER THAN US!']], t, 500, 170, [500, 260], { size: 48, pop: false }); } });
AB_SHOTS.push({ a: 121.6, b: 128.3, ww: 2000, cam: a3Cam([[121.6, { x: 520, y: 650, zoom: 1.2 }], [127.1, { x: 520, y: 650, zoom: 1.2 }], [127.9, { x: 650, y: 615, zoom: 1.0 }], [128.3, { x: 650, y: 615, zoom: 1.0 }]]), world: a3S15World, over: a3S15Over });

// ---------- S16 128.3-134.6: afternoon; Ali Baba comes home; Morgiana shows him the doors; BEWARE OF STRANGERS! ----------
const A3_ALI_X = a3Pos([[128.3, 1250], [128.95, 1060], [130.95, 1060], [131.15, 1080]]), A3_DK_X = a3Pos([[128.3, 1440], [128.95, 1250]]);
function a3Ali16(t) { const tc = AB_T2(t), W = walk(A3_ALI_X, tc, { stride: 24 }), P = { y: 905, dir: -1, ...W, lid: abLid(t, 501, [130.85]), tip: idleSway(tc, 502, 0.025, 2.6) + (tc < 129 ? 0.04 : 0), sq: breathe(tc, 503, 0.015), gaze: [-1, 0], mouth: 'smile', handL: [-30, -110] };
  if (tc > 129.6 && tc < 130.7) P.gaze = [-1, -0.1];
  if (tc > 130.7 && tc < 133.8) { P.gaze = [-1, -0.2]; P.look = tc > 130.85 ? -0.5 : 0; P.handR = [4, -124]; P.mouth = 'o'; P.brow = -0.5; if (tc > 131.6) { P.mouth = 'closed'; P.look = 0; } }
  if (tc > 133.8) { P.tip += 0.06 * pulse(tc, 133.85, 0.2) + 0.03 * pulse(tc, 134.12, 0.2); P.gaze = tc > 134.25 ? [-1, -0.1] : [-1, 0.2]; P.look = tc > 134.3 ? -1 : 0; P.mouth = 'closed'; }
  return P; }
function a3Morg16(t) { const tc = AB_T2(t), xf = a3Pos([[128.65, 930], [128.95, 900]]), W = walk(xf, tc, { stride: 22 }), P = { y: 905, dir: 1, ...W, lid: abLid(t, 511), tip: idleSway(tc, 512, 0.02, 2.4), sq: breathe(tc, 513, 0.014), gaze: [1, 0], mouth: 'closed' }; let kick = 0;
  if (tc > 128.95 && tc < 129.6) { P.handLW = [1032, 790]; P.handR = tc < 129.3 ? [100, -146] : [66, -170]; P.gaze = [1, -0.1]; }
  if (tc >= 129.6 && tc < 130.7) { const a = flow(tc, [[129.6, 0], [129.9, -1], [130.4, 1], [130.7, 0.3]]); P.handR = [a < 0 ? K.lerp(40, -110, -a) : K.lerp(40, 118, a), -180]; P.look = a * 0.6; P.gaze = [a, -0.1]; kick = lagged((u) => flow(u, [[129.6, 0], [129.9, -1], [130.4, 1], [130.7, 0.3]]), tc, 0.15, 1); }
  if (tc >= 130.7 && tc < 131.7) { P.gaze = [1, 0]; P.handR = [30, -120]; }
  if (tc >= 131.7 && tc < 132.8) { P.handR = [70 + 14 * osc(tc, 0.3), -150 + 6 * Math.abs(osc(tc, 0.3))]; P.gaze = [1, -0.2]; }
  if (tc >= 132.8 && tc < 134.6) { P.handR = [44, -205]; P.gaze = [1, 0]; P.talk = abTalk(t, 133.16, 134.04, 9, 0.5); P.mouth = P.talk ? 'open' : 'closed'; }
  return { P, kick }; }
function a3S16World(ctx, t, cam) {
  const tc = AB_T2(t), d3 = kfn(tc, [[128.45, 0], [128.7, 0.8]]);
  a3Street(ctx, t, cam, { m: 'afternoon', washing: { items: 4 }, doors: [{ i: 3, open: d3 }], flock: [1900, 260, -100, 3, 17, 128.3] });
  a3Cat(ctx, t, { x: 1215, y: 586, dir: -1, sit: 1, gaze: [-1, 0.6], tailCurl: 0.7 });
  a3Neighbour(ctx, t, { x: 600, y: 905, dir: -1, lid: abLid(t, 91), tip: 0.03 + idleSway(tc, 92, 0.02, 2.6), gaze: [-0.3, 0.6], handR: [40, -110], handL: [20, -120] }, 'afternoon', { broom: 30 * osc(tc, 0.8) });
  const dx = A3_DK_X(tc), D = { x: dx, y: 905, s: 0.82, dir: -1, pal: 0, ...walk(A3_DK_X, tc, { stride: GAIT.donkey * 0.82 }), earL: tc > 130.9 && tc < 131.9 ? -0.8 : 0.4 + idleSway(tc, 521, 0.3, 1.6), earR: tc > 130.9 && tc < 131.9 ? -0.7 : 0.3, tailSwish: osc(tc, 1.6), lid: abLid(t, 522), neck: tc > 134.4 ? -0.2 : idleSway(tc, 523, 0.06, 2.4) + 0.06 * Math.sin((W2(tc)) * 1) };
  a3Shadow(ctx, dx, 905, 230); abDonkey(ctx, D, 'afternoon'); const seat = mountSeat('donkey', D); abBundle(ctx, seat.x, seat.y + 6, 0.62, 0.05 * Math.sin(tc * 5));
  const A = a3Ali16(t); a2Ali(ctx, A, 'afternoon'); const [hx, hy] = a2Hand(A, 0, A2_ALI); ctx.save(); ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + dx - 110) / 2, hy + 30, dx - 120, 806); ctx.stroke(); ctx.restore();
  const M = a3Morg16(t); if (tc > 128.6) morgiana(ctx, t, M.P, 'afternoon', { kick: M.kick });
}
function W2(tc) { return tc; }
function a3S16Over(ctx, t, cam, S) {
  const [mx, my] = abP(900, 700, cam);
  if (t > 131.7 && t < 133.0) a3PicBalloon(ctx, K.clamp(mx, 250, 750), my - 230, 320, 220, [mx, my - 30], K.clamp((t - 131.7) / 0.25) * (1 - K.clamp((t - 132.8) / 0.2)), (c) => { const bx = K.clamp(mx, 250, 750), by = my - 230;
    a3Sneaker(c, bx - 60, by + 90, 0.62, t * 9, { q: true }); if (t > 132.1) a3Sneaker(c, bx + 60, by + 90, 0.62, t * 9 + 1.5, { q: true, col: '#8a5a3a' }); });
  if (t > 133.0 && t < 134.3) abSay(ctx, S, [[133.16, 'BEWARE OF STRANGERS!']], t, K.clamp(mx + 40, 400, 600), my - 190, [mx, my - 30], { size: 52, gone: 134.1 });
}
AB_SHOTS.push({ a: 128.3, b: 134.6, ww: 2000, cam: a3Cam([[128.3, { x: 960, y: 680, zoom: 1.35 }], [129.6, { x: 960, y: 680, zoom: 1.35 }], [129.9, { x: 600, y: 615, zoom: 1.0 }], [130.4, { x: 1500, y: 615, zoom: 1.0 }], [130.8, { x: 960, y: 680, zoom: 1.35 }], [134.6, { x: 975, y: 680, zoom: 1.35 }]]), world: a3S16World, over: a3S16Over });

// ---------- S17 134.6-147.48: dusk time-lapse; the shadow; the oil merchant and the mules with jars; the ring; the door opens; the window ----------
const A3_OM_X = a3Pos([[137.6, 40], [141.0, 840]], 'out');
const A3_MULE_X = (i) => (u) => A3_OM_X(u - 0.55 - 0.45 * i) - 230 - 215 * i;
function a3S17aWorld(ctx, t, cam) {
  const tc = AB_T2(t), u = beatIn(t, 134.86, 136.2), D = dayToNight(u * 0.55), gate = kfn(tc, [[134.75, 0], [134.95, 0.85], [135.75, 0.85], [136.0, 0]]);
  const items = 4 - Math.floor(beatIn(tc, 135.3, 135.85) * 4.99), d3 = kfn(tc, [[134.6, 0.8], [135.95, 0.8], [136.2, 0]]);
  const ax = kfn(tc, [[134.6, 1060], [135.5, 1320]]), dkx = kfn(tc, [[134.75, 1250], [135.75, 1330]]), inG = (x) => x > 1235;
  const ali = (c, k = 0) => { const P = { x: ax, y: 905, dir: 1, ...walk((v) => kfn(v, [[134.6, 1060], [135.5, 1320]]), tc, { stride: 24 }), mouth: 'smile', gaze: [1, 0], handL: [-30, -110] }; if (k) abCel(c, [ax, 905, 300, 330], (cc) => a2Ali(cc, P, 'afternoon', { shadow: false }), { tint: '#2a1a2a', k }); else a2Ali(c, P, 'afternoon'); };
  const dk = (c, k = 0) => { const P = { x: dkx, y: 905, s: 0.82, dir: 1, pal: 0, ...walk((v) => kfn(v, [[134.75, 1250], [135.75, 1330]]), tc, { stride: GAIT.donkey * 0.82 }), earL: 0.5, earR: 0.4, tailSwish: osc(tc, 1.4) }; if (!k) a3Shadow(c, dkx, 905, 230); abDonkey(c, P, 'afternoon', k ? { tint: '#2a1a2a', k } : {}); };
  a3Street(ctx, t, cam, { m: 'afternoon', m2: 'evening', k: u, bodies: (c) => { tsSun(c, K.lerp(1760, 1500, u), K.lerp(330, 760, u), 1, '#ffd890'); }, washing: { items }, lan: D.lan.map((v, i) => K.clamp((u - 0.3 - 0.15 * i) * 4)), doors: d3 > 0.01 ? [{ i: 3, open: d3, inside: tc > 134.7 && tc < 135.05 ? (c) => abCel(c, [930, 900, 300, 330], (cc) => morgiana(cc, t, { x: 930, y: 900, dir: 1, s: 0.88 }, 'afternoon', { shadow: false }), { tint: '#2a1a2a', k: 0.5 }) : null }] : [],
    gate, gateIn: (c) => { if (inG(dkx)) dk(c, 0.5); if (inG(ax)) ali(c, 0.5); },
    win: { sh: 1, inside: tc > 135.2 && tc < 135.95 ? (c) => morgianaWindow(c, t, { x: 1090, gaze: [-1, -0.6], handLW: [1050, 470], handRW: [1080, 500] }, 'afternoon') : null } });
  if (t > 136.2) abFlock(ctx, t - 136.2, 1500, 220, -420, 4, 21, 0.4);
  a3Cat(ctx, t, { x: 1000, y: 242, dir: -1, sit: tc > 136.2 && tc < 136.55 ? 0 : 1, arch: tc > 136.2 && tc < 136.55 ? 1 : 0, gaze: tc > 136.55 ? [-1, 0.3] : [0, 0], tailCurl: 0.8 });
  if (!inG(dkx)) dk(ctx); if (!inG(ax)) ali(ctx);
  if (tc < 134.7) morgiana(ctx, t, { x: kfn(tc, [[134.6, 900], [134.7, 930]]), y: 905, dir: 1, gaze: [1, 0] }, 'afternoon', {});
}
function a3Mule(ctx, t, i, o = {}) {
  const tc = AB_T2(t), xf = A3_MULE_X(i), W = walk(xf, tc, { stride: GAIT.donkey * 0.82 }), P = { x: W.x, y: 905, s: 0.82, dir: 1, pal: i === 1 ? 2 : 1, ph: W.ph + (W.amp < 0.05 ? 0.15 * Math.sin(tc * 2 + i) : 0), amp: Math.max(W.amp, 0.04),
    headDown: 0.2 + 0.1 * Math.sin(W.ph + i), earL: 0.2 + idleSway(tc, 600 + i, 0.3, 1.6) + (o.earBack ? -0.9 : 0), earR: 0.1 + idleSway(tc, 610 + i, 0.3, 2.1), tailSwish: osc(tc, 1.5 + i * 0.3, i * 0.2), lid: abLid(t, 620 + i), sag: 0.25 };
  const draw = (c) => { a3Shadow(c, P.x, 905, 230); abDonkey(c, P, 'dusk'); const seat = mountSeat('donkey', P), sw = 0.08 * Math.sin(W.ph + 0.8) + lagged((u) => 0.08 * Math.sin(walk(xf, u, { stride: GAIT.donkey * 0.82 }).ph), tc, 0.12, 0.6);
    jarPannier(c, seat, 0.82, 1, { sway: sw, stain: i === 1, lid: o.lid || 0 }); };
  a3ArchFig(ctx, P.x, 905, draw, 420); return P;
}
function a3S17bWorld(ctx, t, cam) {
  const tc = AB_T2(t), d3 = kfn(tc, [[142.4, 0], [142.7, 0.8]]), lit = beatIn(tc, 142.4, 142.7), wsh = tc < 142.75 ? 0 : 0.45;
  a3Street(ctx, t, cam, { m: 'evening', lan: 1, doors: [{ i: 3, open: d3, lit, inside: d3 > 0.05 ? (c) => { const A = { x: 935, y: 900, dir: -1, mouth: 'smile', gaze: [-1, 0], handR: tc > 142.6 ? [95, -150] : [30, -110], lid: abLid(t, 631) }; a2Ali(c, A, 'lamp', { shadow: false }); } : null }],
    win: { sh: tc < 142.75 ? 0 : wsh, lit: 0.5, inside: tc > 142.75 ? (c) => morgianaWindow(c, t, { x: 1080, gaze: tc < 143.35 ? [-1, 0.8] : [-1, 1], lid: 0.4, handLW: [1050, 552] }, 'evening') : null } });
  tsMoth(ctx, t, 2);
  if (lit > 0) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.45 * lit; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.moveTo(875, 904); ctx.lineTo(990, 904); ctx.lineTo(1080, 1060); ctx.lineTo(760, 1060); ctx.closePath(); ctx.fill(); ctx.restore(); }
  a3Cat(ctx, t, { x: 1000, y: 242, dir: -1, sit: 1, gaze: tc < 139 ? [-1, 0.3] : [-1, 0.7], tailCurl: 0.6 + 0.4 * osc(tc, 1.1) });
  // the long shadow first, then the man
  if (t > 136.9 && t < 138.3) { const u = K.clamp((t - 136.9) / 0.7), a = 1 - K.clamp((t - 137.9) / 0.4), L = 80 + 360 * u; ctx.save(); ctx.globalAlpha = 0.42 * a; ctx.fillStyle = '#2a1430'; ctx.beginPath(); ctx.ellipse(110 + L * 0.5, 918, L * 0.5, 16, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(110 + L + 10, 916, 28, 20, 0, 0, 7); ctx.fill(); ctx.restore(); }
  for (let i = 2; i >= 0; i--) a3Mule(ctx, t, i, { lid: i === 0 && tc > 143.35 && tc < 143.75 ? Math.sin(Math.PI * beatIn(tc, 143.35, 143.75)) : 0, earBack: i === 0 && tc > 143.45 && tc < 144.4 });
  const W = walk(A3_OM_X, tc, { stride: 30 }), mx = W.x, P = { y: 905, dir: 1, ...W, lid: 0.3, tip: idleSway(tc, 641, 0.015, 3), sq: breathe(tc, 642, 0.012) * (W.amp > 0.2 ? 1 - 0.02 * Math.abs(Math.sin(W.ph)) : 1), gaze: [1, 0], mouth: 'smile', brow: 0.7, handL: [-40, -100] };
  if (tc > 141.0 && tc < 141.5) { P.gaze = gazePlan(tc, [[141.0, [1, -0.6]], [141.25, [1, 0.3]]]); P.tip += 0.04 * pulse(tc, 141.3, 0.2); }
  if (tc > 142.35 && tc < 143.1) { P.handR = [4, -124]; P.tip = 0.08; }
  if (tc > 143.1) P.gaze = [1, -0.1];
  const m0 = A3_MULE_X(0)(tc), slack = 30 - 26 * Math.abs(Math.sin(W.ph));
  a3ArchFig(ctx, mx, 905, (c) => oilMerchant(c, t, P, 'evening', { rope: [m0 + 118, 812], slack, kick: 0.2 * W.amp, glint: tc > 141.0 && tc < 141.5 ? K.clamp((tc - 141.05) / 0.4) : 0 }));
  if (t > 140.38 && t < 141.2) abBands(ctx, [300, 700, 700, 260], t, { cols: ['#ffd08a'], alpha: 0.22, w: 70, speed: 500, n: 2, angle: -0.6 });
}
function a3S17Over(ctx, t, cam, S) {
  if (t > 142.3 && t < 143.6) { const [hx, hy] = abP(840, 690, cam); abSay(ctx, S, [[142.35, 'A BED FOR THE NIGHT?']], t, K.clamp(hx, 400, 600), hy - 200, [hx, hy - 30], { size: 52, gone: 143.3 }); }
  if (t > 143.4) S.title(ctx, 'TO BE CONTINUED...', 500, 175, K.clamp((t - 143.4) / 1.0), { size: 70, align: 'center' });
}
function a3RingInsert(ctx, t) {
  const tc = AB_T2(t); a3WoodBg(ctx, '#7a4a2a'); abGlow(ctx, 160, 240, 420, 0.5, '#ffb860');
  const knocks = [141.6, 141.85, 142.1]; let pull = 1; for (const k of knocks) { const d = tc - k; if (d > -0.12 && d < 0.13) pull = Math.min(pull, d < 0 ? -d / 0.12 : d / 0.13); }
  const sc = 2.5 - 0.12 * (1 - pull), hx = 560 + 60 * pull, hy = 640 + 40 * pull;
  for (const k of knocks) if (t > k && t < k + 0.25) a3Puff(ctx, 470, 680, (t - k) / 0.25, 5, 7, '#c89a6a');
  a3BigHand(ctx, hx, hy, sc, { sleeve: '#ecc062', sleeveD: '#d8a43a', curl: 1, skin: '#e8b08a', rot: 2.4, ring: { glint: tc > 142.1 ? K.clamp((t - 142.1) / 0.3) : 0 } });
}
AB_SHOTS.push({ a: 134.6, b: 136.9, ww: 2000, cam: a3Cam([[134.6, { x: 900, y: 615, zoom: 1.0 }], [136.9, { x: 905, y: 615, zoom: 1.0 }]]), world: a3S17aWorld });
AB_SHOTS.push({ a: 136.9, b: 141.5, ww: 2000, cam: a3Cam([[136.9, { x: 520, y: 615, zoom: 1.0 }], [138.2, { x: 520, y: 615, zoom: 1.0 }], [141.4, { x: 980, y: 615, zoom: 1.0 }], [141.5, { x: 985, y: 615, zoom: 1.0 }]]), world: a3S17bWorld, over: a3S17Over });
AB_SHOTS.push({ a: 141.5, b: 142.3, panel: a3RingInsert });
AB_SHOTS.push({ a: 142.3, b: 147.5, ww: 2000, cam: a3Cam([[142.3, { x: 1000, y: 600, zoom: 1.05 }], [143.0, { x: 1000, y: 600, zoom: 1.05 }], [144.2, { x: 930, y: 560, zoom: 1.2 }], [147.5, { x: 936, y: 556, zoom: 1.22 }]]), world: a3S17bWorld, over: a3S17Over });
