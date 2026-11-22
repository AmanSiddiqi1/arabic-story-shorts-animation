// ===== ALI-04 shots S6-S8 (33.3 - 65.0 s): Morgiana's lamp dies, IS IT TIME?, the statue, her deduction, NOT YET., the second jar, the run =====
const A4_MX = (u) => kfn(u, [[33.32, 165], [34.0, 240], [34.88, 240], [35.9, 560], [37.46, 560], [38.4, 805], [58.42, 805], [59.12, 900], [59.7, 905], [59.78, 1035], [63.84, 1035], [64.82, 172]]);
const A4_M3 = { s: 0.93, age: 0.15 };
// Morgiana's pose 33.3-65 (o: extras for the drawing: lamp {flame, smoke, rot, at}, beard, stream, kick)
function a4Morg(t) {
  const tc = AB_T2(t), W = walk(A4_MX, tc, { stride: tc > 58 && tc < 60 ? 12 : 18 }), P = { y: 915, dir: 1, ...W, lid: abLid(t, 131, [36.76, 52.33, 57.6]), tip: idleSway(tc, 132, 0.02, 2.4), sq: breathe(tc, 133, 0.015), gaze: [1, 0], mouth: 'closed', handL: [-30, -110], handR: [24, -112] };
  const o = { lamp: { flame: 0, hand: 0 }, kick: 0, stream: 0 };
  const walkArms = () => { P.handL = [-26 + 12 * Math.sin(W.ph), -112]; P.handR = [26 - 12 * Math.sin(W.ph), -112]; };
  if (tc < 34.88) { o.lamp.flame = 0.8; P.handL = [20, -128]; P.handR = [44, -140]; o.lamp.hand = 0; P.gaze = [0.6, 0.6]; P.mouth = 'smile'; if (tc < 34.0) P.y = K.lerp(900, 915, beatIn(tc, 33.32, 34.0)); }
  else if (tc < 36.0) { walkArms(); P.handL = [20, -128]; P.handR = [42, -138]; o.lamp.flame = 0.8 - 0.3 * beatIn(tc, 35.6, 36.0); P.gaze = [1, 0.2]; P.tip = 0.04; }
  else if (tc < 36.76) { const st = Math.min(2, Math.floor((tc - 36.0) / 0.22)); o.lamp.flame = [0.35, 0.1, 0][st]; o.lamp.smoke = beatIn(tc, 36.3, 37.2); P.handL = [30, -130]; P.handR = [12, -118]; P.brow = -0.7; P.gaze = [0.4, 0.8];
    if (tc > 36.45) { o.lamp.rot = Math.PI * 0.9 * beatIn(tc, 36.45, 36.6); P.handL = [36, -150]; } }
  else if (tc < 37.46) { o.lamp.smoke = beatIn(tc, 36.3, 37.2); P.handL = [20, -124]; P.gaze = gazePlan(tc, [[36.76, [-1, -0.3]], [37.0, [0.4, -0.2]], [37.2, [1, 0.2]]]); P.look = tc < 37.0 ? -0.5 : 0.4; P.brow = tc > 37.2 ? 0.2 : -0.4; if (tc > 37.25) P.mouth = 'smile'; }
  else if (tc < 38.46) { walkArms(); P.handL = [20, -124]; P.gaze = [1, 0.5]; if (tc < 38.05) { o.lamp.rot = Math.PI * 0.9 + 0.3 * Math.sin(tc * 34); P.handL = [30, -150]; P.gaze = [0.4, -0.6]; P.brow = -0.5; o.drop = beatIn(tc, 37.7, 38.1); } }   // v2 (note 4): she shakes the lamp upside down, one drop
  else if (tc < 40.3) { P.handL = [20, -124]; P.gaze = [1, 0.9]; P.tip = 0.05; o.kick = 0.2 * osc(tc, 1.5); P.mouth = 'closed'; }
  else if (tc < 41.26) { P.tip = 0.02; P.handL = [20, -124]; P.gaze = [1, 0.9]; P.eyes = 'wide'; P.brow = -0.5; P.sq = 1.02 - 0.02 * beatIn(tc, 40.3, 40.6); o.kick = swing(t, 40.36, 0.9, 1.5, 3); }
  else if (tc < 43.9) { P.tip = 0.02; P.handL = [20, -124]; P.gaze = [1, 0.7]; P.eyes = tc > 42.9 ? 'wide' : 'open'; P.sq = 1; P.lid = 0; if (tc > 43.0) P.brow = -0.6; }
  else if (tc < 44.6) { P.tip = 0.04; P.eyes = 'wide'; P.gaze = [1, 0.6]; P.brow = -0.6; const c = beatIn(tc, 44.0, 44.25); P.handL = [K.lerp(20, 4, c), K.lerp(-124, -96, c)]; P.handR = [10, -120]; o.lamp.hand = 0; o.lamp.rot = c < 1 ? 0.5 * Math.sin(c * 9) : 0; P.sq = tc > 44.25 ? 0.95 + 0.05 * beatIn(tc, 44.25, 44.5) : 1; }
  else if (tc < 46.52) { P.eyes = 'wide'; P.gaze = gazePlan(t, [[44.6, [1, 0.6]], [45.6, [1, 0.5]], [46.0, [1, 0.75]]]); P.handL = [4, -110]; P.handR = [10, -120]; P.sq = 1; P.tip = 0.04; P.brow = -0.6; P.ph = 1.3; P.amp = 0.6; P.lid = 0; o.kick = tc > 45.5 ? swing(t, 45.5, 0.5, 1.4, 2.5) : 0; }
  else if (tc < 50.58) { P.gaze = gazePlan(tc, [[47.5, [1, 0.6]], [48.12, [1, 0.4]], [48.5, [1, 0.3]], [49.0, [1, 0.25]], [49.5, [1, 0.2]]]); P.handL = [4, -110]; P.brow = 0.1;
    if (tc > 49.04 && tc < 49.8) { const n = Math.floor((tc - 49.04) / 0.15); P.handR = [40, -150 - 4 * n]; P.mouth = n % 2 ? 'o' : 'closed'; } else P.handR = [10, -120]; P.look = 0.3 * beatIn(tc, 48.12, 48.8); }
  else if (tc < 51.4) { const st = Math.min(2, Math.floor((tc - 50.58) / 0.25)); P.handR = PERSON_HANDS.mouthCover.R; P.handL = [4, -110]; P.eyes = st < 2 ? 'wide' : 'open'; P.lid = [0, 0, 0.35][st]; P.brow = [-0.8, -0.4, 0.6][st]; P.gaze = [1, 0.2]; }
  else if (tc < 52.33) { P.sq *= K.lerp(0.97, 1.0, beatIn(tc, 51.4, 52.2)); P.handL = [4, -110]; P.handR = [10, -116]; P.gaze = [1, -0.1]; P.look = 0.5; P.lid = 0.25; P.brow = 0.4; o.kick = 0.3 * osc(tc, 1.6); }
  else if (tc < 53.2) { P.gaze = gazePlan(tc, [[52.33, [1, -0.1]], [52.6, [1, 0.6]], [52.9, [1, 0.3]]]); P.look = tc < 52.6 ? 0.6 : 0.1; P.tip = 0.04 * pulse(tc, 52.95, 0.2); P.handL = [4, -110]; P.handR = [10, -116]; P.brow = 0.3; }
  else if (tc < 54.0) { P.sq *= 1.04; P.brow = 0.85; o.beard = beatIn(tc, 53.3, 53.6); P.handR = tc < 53.6 ? [30, -170] : [18, -110]; P.handL = PERSON_HANDS.hipsHands.L; P.mouth = 'frown'; P.lid = 0.3; }
  else if (tc < 56.94) { o.beard = 1; P.tip = 0.12; P.brow = 0.85; P.handR = PERSON_HANDS.cupMouth.R; P.handL = PERSON_HANDS.hipsHands.L; P.gaze = [1, 0.7]; P.lid = 0.3; P.mouth = 'frown'; P.talk = abTalk(t, 55.52, 56.5, 9, 0.6); if (P.talk) P.mouth = 'open'; }
  else if (tc < 57.6) { o.beard = 1 - beatIn(tc, 56.94, 57.1); P.sq *= 0.96; P.x += tremble(tc, 1.6, 7); P.handR = [26, -184 + 10 * Math.sin(tc * 14)]; P.handL = [-20, -104]; P.gaze = [0, 0.3]; P.lid = 0.5; P.mouth = 'o'; }
  else if (tc < 58.42) { P.gaze = gazePlan(tc, [[57.6, [1, 0.3]], [57.9, [1, 0.1]]]); P.look = tc > 57.9 ? 0.3 : 0; P.brow = 0.5; P.handL = [4, -110]; P.handR = [10, -116]; }
  else if (tc < 59.78) { P.tip = 0.06; P.handL = [-70, -150]; P.handR = [10, -120]; o.lamp.hand = 1; P.gaze = tc > 59.12 && tc < 59.7 ? [1, 1] : [1, 0.2]; if (tc > 59.12 && tc < 59.7) { P.ph = 1.2; P.amp = 0.9; } }
  else if (tc < 61.56) { P.handR = tc < 60.4 ? null : PERSON_HANDS.cupEar.R; if (tc < 60.4) P.handRW = [1112, 632 - 8 * Math.abs(Math.sin((tc - 59.8) * Math.PI / 0.15))]; P.tip = tc < 60.4 ? 0.06 : 0.1; P.handL = [4, -110]; P.gaze = [1, 0.6]; }
  else if (tc < 63.2) { P.tip = 0.06; P.handL = [4, -110]; P.handR = [20, -120]; P.gaze = gazePlan(tc, [[61.56, [1, 0.6]], [62.6, [1, 0.3]], [62.85, [1, 0.25]], [63.1, [1, 0.2]]]); P.eyes = 'wide'; }
  else if (tc < 63.84) { o.beard = 1; P.brow = 0.85; P.sq *= 1.04; P.handR = [60, -120 + 30 * beatIn(tc, 63.3, 63.6)]; P.handL = PERSON_HANDS.hipsHands.L; P.gaze = [1, 0.4]; P.mouth = (Math.floor(tc * 8) % 2) ? 'open' : 'frown'; P.lid = 0.3; }
  else { P.dir = -1; o.stream = 1; P.tip = -0.1; P.handL = [10, -120]; P.handR = [-20 + 30 * Math.sin(W.ph), -110]; o.lamp.hand = 0; P.gaze = [-1, 0]; P.sq *= tc < 64.0 ? anticipate(tc, 63.84, 0.16, 0.08) : 1; }
  if (tc >= 39.03 && tc < 47.52) { const r = K.ease.out(beatIn(tc, 39.03, 40.2)); P.handR = null; P.handRW = [K.lerp(826, 864, r) + (tc > 40.3 ? tremble(tc, 0.8, 9) : 0), K.lerp(800, 672, r)]; }   // v2 (note 4): the reach, frozen
  return { P, o, W };
}
function a4MorgDraw(ctx, t, P, o, m = A4_N) {
  morgiana(ctx, t, P, m, { stream: o.stream, kick: o.kick, shc: A4_NSH });
  if (o.beard > 0.02) { const d = Math.sign(P.dir || 1), a = a2HeadPt(P, -24, 8, A3_MORG), b = a2HeadPt(P, 24, 8, A3_MORG), c = a2HeadPt(P, 0, 36 * o.beard, A3_MORG);
    celShade(ctx, [a, b, [b[0] + d * 2, b[1] + 14 * o.beard], c, [a[0], a[1] + 14 * o.beard]], AB_MORG_ACC, '#0e8a90', { off: 3, lw: 2, line: '#0a5a60' }); }
  const [hx, hy] = a2Hand(P, o.lamp.hand || 0, A3_MORG); const ls = t > 33.3 && t < 52.3 ? 1.33 : 0.95; oilLamp(ctx, hx + 4, hy - 4, ls, { flame: o.lamp.flame || 0, smoke: o.lamp.smoke || 0, rot: o.lamp.rot || 0, t, dir: Math.sign(P.dir || 1) });   // v2: lamp 1.4x in her errand
  if (o.drop > 0 && o.drop < 1) a4Glyph(ctx, 'drop', hx + 30, hy + 20 + 70 * o.drop * o.drop, 0.5, 1);
}
// fireflies drifting (world), on twos
function a4Flies(ctx, t, x0, y0, n = 3) { const tc = AB_T2(t), R = K.rng(41); for (let i = 0; i < n; i++) { const x = x0 + R() * 300 + 40 * Math.sin(tc * 0.7 + i), y = y0 + R() * 160 + 30 * Math.sin(tc * 1.1 + i * 2), on = 0.5 + 0.5 * Math.sin(tc * 3 + i * 1.7);
  abGlow(ctx, x, y, 22, 0.7 * on, '#d8ff8a'); ctx.fillStyle = '#f4ffc0'; ctx.globalAlpha = on; ctx.fillRect(x - 2, y - 2, 4, 4); ctx.globalAlpha = 1; } }

// ---------- S6 33.3-45.5 + S7 + S8: one yard world (the camera makes each beat a new picture) ----------
function a4CatX(tc) { return tc < 35.3 ? 620 : tc < 36.0 ? K.lerp(620, 470, beatIn(tc, 35.3, 35.7)) : tc < 59.3 ? A4_MX(tc - 0.3) - 95 : tc < 63.84 ? A4_MX(tc - 0.3) - 110 : A4_MX(tc + 0.2) - 60; }
function a4S6World(ctx, t, cam) {
  const tc = AB_T2(t), kO = kfn(tc, [[33.32, 0], [33.6, 0.9], [64.82, 0.9], [65.0, 0.1]]);
  a4Yard(ctx, t, cam, { moon: A4_MOON.late, K: { open: kO, lit: 0.9 }, kwin: { lit: 0.7 }, lan: [1, 0.8, 0.25] });
  if (tc > 34.8 && tc < 38.5) a4Flies(ctx, t, 380, 700);
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  // the cat: on the wall, hops down at 35.3, trots at her ankles, freezes with a paw up, tiptoes behind her, gallops ahead
  const cx = a4CatX(tc), onWall = tc < 35.3, hopU = beatIn(tc, 35.3, 35.65), cy = onWall ? 548 : tc < 35.65 ? K.lerp(548, 918, hopU * hopU) - 60 * Math.sin(Math.PI * hopU) : 918;
  const CW = walk((u) => a4CatX(u), tc, { stride: GAIT.cat * 0.55 }), CP = { x: cx, y: cy, dir: tc > 63.84 ? -1 : 1, sit: onWall || (tc > 36.0 && tc < 37.4) || (tc > 38.4 && tc < 58.4) || (tc > 60.2 && tc < 63.84) ? 1 : 0, ph: CW.ph, amp: CW.amp, gaze: [1, 0.3], lift: onWall ? 0 : Math.max(0, 918 - cy), gy: onWall ? 548 : 918 };
  if (tc > 40.3 && tc < 45.5) { CP.sit = 0; CP.arch = 1; CP.ears = -0.9; CP.puff = 0.6; }
  if (tc >= 45.5 && tc < 46.5) { CP.sit = 0; CP.raise = 1; CP.ears = -0.5; }
  if (tc > 59.3 && tc < 60.2) { CP.crouch = 0.6; CP.raise = Math.abs(Math.sin(tc * 5)); }
  if (tc >= 35.65 && tc < 36.0) CP.sq = landSquash(tc, 35.65, 0.2);
  a4Cat(ctx, t, CP);
  // the leaf she does not step on
  celShade(ctx, [[922, 926], [934, 918], [948, 922], [936, 930]], '#d8a04a', '#a8702a', { off: 2, lw: 1.5 });
  const { P, o } = a4Morg(t); if (tc < 64.9) a4MorgDraw(ctx, t, P, o);
  if (tc > 40.3 && tc < 41.3) a4Whisper(ctx, 890, 620, t, 40.3, 41.3);
  cyFig(ctx, t, A4_N);
}
function a4S6Over(ctx, t, cam, S) {
  const tc = AB_T2(t), { P } = a4Morg(t);
  if (t > 34.1 && t < 36.3) { const [x, y] = abP(P.x, 660, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 36.0) / 0.3); S.label(ctx, 'MORGIANA', K.clamp(x + 150, 160, 840), y - 40, K.clamp((t - 34.1) / 0.3), { size: 44, rule: AB_MORG_ACC }); ctx.restore(); }
  if (t > 36.76 && t < 37.6) { const [x, y] = abP(P.x + 20, 560, cam), p = K.clamp((t - 36.76) / 0.3) * (1 - K.clamp((t - 37.4) / 0.2));
    thoughtCloud(ctx, x + 90, y - 130, 230, 170, t, { p, tail: [x, y + 40], inside: (c) => { oilLamp(c, 470, 720, 3.2, { flame: 0 }); a4Glyph(c, 'drop', 600, 640, 2.2, 1); }, scale: 0.3, at: [520, 690] }); }
  if (t > 42.85 && t < 45.6) { const [x, y] = abP(890, 630, cam); a4Say(ctx, S, [[42.9, 'IS IT TIME?']], t, x + 150, y - 200, [x + 4, y - 6], { size: 44, gone: 45.2, wobble: 3 }); }
  if (t > 55.4 && t < 57.2) { const [x, y] = abP(P.x, 700, cam); a4Say(ctx, S, [[55.52, 'NOT YET.']], t, x + 60, y - 230, [x + 10, y - 40], { size: 56, gone: 56.9 }); }
  if (t > 62.5 && t < 64.2) { const [x, y] = abP(1120, 630, cam); a4Say(ctx, S, [[62.56, 'IS IT TIME?']], t, x + 120, y - 190, [x + 4, y - 6], { size: 44, gone: 63.8, wobble: 3 }); }
  if (t > 63.3 && t < 63.9) { const [x, y] = abP(1300, 330, cam); S.counter(ctx, 5, x, y, K.clamp((t - 63.3) / 0.2) * (1 - K.clamp((t - 63.75) / 0.15)), { size: 110 }); }
  // S7: ghost outlines with question -> exclamation glyphs, the drop over jar 6, the memory inset
  if (t > 48.8 && t < 50.7) for (let i = 0; i < 6; i++) { const g = 48.8 + 0.3 * i; if (t < g) continue; const [x, y] = abP(CY_JARS[i].x, 560, cam), k = 1 - K.clamp((t - 50.4) / 0.3);
    ctx.save(); ctx.globalAlpha *= k; a4Glyph(ctx, i === 5 ? 'drop' : tc < g + 0.17 ? 'q' : 'x', x, y, 1.1, K.clamp((t - g) / 0.15)); ctx.restore(); }
  if (t > 49.8 && t < 50.6) a2Inset(ctx, t, [40, 90, 360, 290], K.clamp((t - 49.8) / 0.2) * (1 - K.clamp((t - 50.45) / 0.15)), (c) => {   // v2 (note 8): a third of the panel
    abGrad(c, 40, 90, 360, 290, [[0, '#c8a0a8'], [1, '#a88aa0']]); c.save(); c.translate(220, 235); c.scale(1.25, 1.25);
    a3BigHand(c, 70, 20, 0.42, { sleeve: '#ecc062', sleeveD: '#d8a43a', curl: 0.6, skin: '#e8b08a', rot: -Math.PI / 2 });
    a3BigHand(c, -70, -10, 0.42, { sleeve: '#8f8a40', sleeveD: '#64612a', curl: 0.7, rot: Math.PI / 2 }); silverRing(c, 10, 6, 9, { glint: ((t - 49.8) * 1.5) % 1 }); c.restore(); });
}
function a4EyesS7(ctx, t) { const tc = AB_T3(t); a3Eyes(ctx, t, { who: 'morgiana', gaze: gazePlan(tc, [[46.52, [0.9, 0.3]], [46.9, [0.9, 0.3]], [47.1, [1, 0.15]]]), lid: abBlinkAt(tc, 47.15), wide: 0.4, brow: -0.3,
  reflect: (c, r) => { c.fillStyle = '#fff4d0'; c.beginPath(); c.arc(r * 0.35, -r * 0.35, r * 0.13, 0, 7); c.fill(); } }); }
AB_SHOTS.push({ a: 33.3, b: 45.5, ww: 2200, cam: a3Cam([[33.3, { x: 500, y: 615, zoom: 1 }], [34.9, { x: 500, y: 615, zoom: 1 }], [38.4, { x: 860, y: 680, zoom: 1.15 }], [40.3, { x: 866, y: 685, zoom: 1.2 }], [42.2, { x: 880, y: 680, zoom: 1.25 }], [45.5, { x: 884, y: 682, zoom: 1.26 }]]), world: a4S6World, over: a4S6Over });
// ---------- S7 45.5-52.3: the statue, her eyes, the row read jar by jar, the memory, resolve ----------
AB_SHOTS.push({ a: 45.5, b: 46.52, ww: 2200, cam: a3Cam([[45.5, { x: 880, y: 680, zoom: 1.25 }], [46.52, { x: 876, y: 682, zoom: 1.27 }]]), world: a4S6World, over: a4S6Over });
AB_SHOTS.push({ a: 46.52, b: 47.52, panel: a4EyesS7 });
AB_SHOTS.push({ a: 47.52, b: 52.3, ww: 2200, cam: a3Cam([[47.52, { x: 1000, y: 615, zoom: 1 }], [48.8, { x: 1000, y: 615, zoom: 1 }], [50.5, { x: 1250, y: 615, zoom: 1 }], [51.3, { x: 950, y: 660, zoom: 1.15 }], [52.3, { x: 945, y: 662, zoom: 1.16 }]]), world: a4S6World, over: a4S6Over });
// ---------- S8 52.3-65.0: NOT YET., the wobble, the leaf, jar 3, three lids like piano keys, the run to the kitchen ----------
AB_SHOTS.push({ a: 52.3, b: 65.0, ww: 2200, cam: a3Cam([[52.3, { x: 870, y: 680, zoom: 1.25 }], [58.4, { x: 872, y: 680, zoom: 1.25 }], [60.8, { x: 1110, y: 680, zoom: 1.25 }], [61.6, { x: 1112, y: 680, zoom: 1.25 }], [62.5, { x: 1180, y: 640, zoom: 1.1 }], [63.8, { x: 1180, y: 640, zoom: 1.1 }], [64.9, { x: 450, y: 615, zoom: 1 }], [65.0, { x: 450, y: 615, zoom: 1 }]]), world: a4S6World, over: a4S6Over });
