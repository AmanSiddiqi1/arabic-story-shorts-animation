// ===== SIND-02 shots S15-S19 (92.48 - 128.07 s): THUD!, the throwers, STICKY!, the eagle and AHA!, strapped, lifted, the tiptoe out =====
const SB_FLAT = -Math.PI / 2;
// slab 1: falls (93.3) and lands flat at (700, 822) (93.58); tipped up (97.9 - 98.6); pushed flat again (110.0 - 110.5); lifted by the eagle (118.22)
function sbSlab1(t) {
  if (t < 93.58) { const u = K.clamp((t - 93.1) / 0.48); return { x: 700, y: K.lerp(-500, 822, u * u), rot: SB_FLAT + 0.5 * (1 - u), sq: 1 }; }
  if (t < 97.9) return { x: 700, y: 822, rot: SB_FLAT, sq: impactSquash(t, 93.58, 0.8), wobble: t > 95.5 && t < 96.3 ? 0.18 * Math.sin((t - 95.5) * 24) * Math.exp(-(t - 95.5) * 4) : 0 };
  if (t < 110.0) { const u = sbF(t, [[97.9, 0], [98.6, 1]]); return { x: K.lerp(700, 760, u), y: K.lerp(822, 764, u), rot: K.lerp(SB_FLAT, 0, u), sq: 1 }; }
  if (t < 118.22) { const u = K.ease.in(K.clamp((t - 110.0) / 0.5)); return { x: K.lerp(760, 700, u), y: K.lerp(764, 822, u), rot: K.lerp(0, SB_FLAT, u), sq: t > 110.5 ? impactSquash(t, 110.5, 0.9) * (t > 113.2 && t < 113.6 ? 0.96 : 1) : 1 }; }
  return null; }
// slab 2: thrown from the rim (96.74), bounces down ledge to ledge, lands at (900, 822) (98.0); the eagle takes it (104.02)
const SB2_BOUNCE = [[96.74, [1150, -1440]], [97.05, [1200, -650]], [97.35, [1100, -130]], [97.62, [1060, 390]], [98.0, [900, 822]]];
function sbSlab2(t) { if (t < 96.74) return null; if (t < 98.0) { let i = 0; while (i < SB2_BOUNCE.length - 2 && t >= SB2_BOUNCE[i + 1][0]) i++; const [t0, a] = SB2_BOUNCE[i], [t1, b] = SB2_BOUNCE[i + 1], u = (t - t0) / (t1 - t0);
    return { x: K.lerp(a[0], b[0], u), y: K.lerp(a[1], b[1], u) - 120 * Math.sin(Math.PI * u), rot: SB_FLAT + t * 6, s: 1 }; }
  return { x: 900, y: 822, rot: SB_FLAT, sq: impactSquash(t, 98.0, 0.85) }; }
// the eagle (Library hawk, eagle palette, s 2.2): its talons on the knob of a slab
const SB2_ES = 2.2;
function sbEagleAt(ctx, knob, t, o = {}) { const fly = !!o.fly, dir = o.dir || 1, x = knob[0] + (fly ? 114 * dir : -4 * SB2_ES * dir), y = knob[1] + (fly ? 0 : 0);
  bird(ctx, { kind: 'hawk', pal: 1, s: SB2_ES, dir, x, y, fly, flap: o.flap ?? 0, grip: o.grip ?? 1, headRot: o.headRot || 0, beak: o.beak || 0, sq: o.sq, gaze: o.gaze, tip: o.tip || 0, lid: o.lid }); }
// Sinbad strapped to the front of a slab, drawn inside its frame (one rot turns both): bands 0..2, lie k (on top when flat)
function sbStrapped(c, t, P0, bands, flat) { const off = 46 * flat; c.save(); c.translate(off, 0);
  const P = sbLive(t, 11, { x: 0, y: 150, dir: 1, cloth: 'none', mouth: 'closed', ...P0 }); const Q = sbSin2(c, P);
  for (let i = 0; i < bands; i++) { const y = i ? -40 : 30; celShade(c, [[-96, y - 8], [96, y - 8], [96, y + 8], [-96, y + 8]], SB_ACC, SB_ACCD, { light: [0, -1], off: 4, lw: 2.5, line: '#8a3a0e' }); }
  c.restore(); return Q; }
const sbKnob = (S) => [S.x + Math.sin(S.rot) * 196 * (S.s || 1), S.y - Math.cos(S.rot) * 196 * (S.s || 1)];

// ---------- S15 (92.48 - 102.1): THUD!, the poke, the throwers on the rim, tipped up, the stuck diamonds, STICKY! ----------
const SB2_S15X = (t) => kfn(t, [[93.8, 870], [94.1, 960], [94.5, 960], [95.4, 610], [97.76, 610]], 'inOut');
function sbS15SinP(t) { const tc = SB_T2(t), P = sbLive(t, 11, { x: 870, y: 862, dir: -1, mouth: 'closed', gaze: [-0.6, 0.6], cloth: 'sling', wind: 0 }, [92.5, 96.22, 99.1, 101.2]);
  if (t < 93.8) { P.sit = 1; P.seat = 'bench'; P.x = 870; P.handR = t < 92.48 ? PERSON_HANDS.chin.R : [20, -150]; P.gaze = t > 92.48 ? [-0.3, -1] : [-0.6, 0.6]; P.mouth = t > 92.6 ? 'o' : 'closed'; P.brow = t > 92.6 ? -0.6 : 0; }
  else if (t < 94.5) { const [hx, l] = hop(t, 93.8, 0.3, 870, 960, 46); P.x = hx; P.y = 900 - l; P.sq *= landSquash(tc, 94.1, 0.15); P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; P.mouth = 'o'; P.gaze = [-1, 0.2]; }
  else if (t < 95.5) { Object.assign(P, walk(SB2_S15X, tc, { stride: 16 })); P.y = 900; P.tip += 0.1; P.gaze = [1, 0.4]; P.dir = speed(SB2_S15X, t) < -1 ? -1 : 1; }
  else if (t < 96.22) { P.x = 610; P.y = 900; P.dir = 1; P.handRW = t < 95.75 ? [610 + 60 + 20 * K.clamp((t - 95.5) / 0.2), 800] : [600, 870]; if (t > 95.75) { P.handLW = [620, 860]; P.gaze = [0.2, 1]; } P.tip -= 0.05; P.gaze = t < 95.75 ? [1, 0.3] : [0.2, 1]; }
  else if (t < 97.76) { P.x = 610; P.y = 900; P.dir = 1; P.gaze = [0.3, -1]; P.tip -= 0.08; P.mouth = 'o'; }
  else if (t < 99.12) { P.x = 610; P.y = 900; P.dir = 1; P.kneel = 1; const u = sbF(t, [[97.9, 0], [98.6, 1]]); P.handLW = [650, 820 - 120 * u]; P.handRW = [670, 830 - 110 * u]; P.sq *= 1 - 0.04 * u; P.gaze = [1, -0.2]; P.mouth = 'closed'; }
  else { P.x = 640; P.y = 900; P.dir = 1; P.tip += 0.18; P.gaze = [0.6, 0]; P.brow = -0.6; P.mouth = 'o';
    if (t > 100.94) { const sh = Math.max(pulse(t, 101.0, 0.12), pulse(t, 101.15, 0.12), pulse(t, 101.3, 0.12)); P.tip = 0.05; P.handR = [60 + 20 * sh, -150 - 10 * sh]; P.gaze = t > 101.45 ? [0, 0] : [1, -0.5]; P.mouth = t > 101.45 ? 'closed' : 'o'; if (t > 101.8) { P.handL = [40, -150]; P.handR = [70, -150]; } } }
  return P; }
function sbS15World(ctx, t, cam, S) { const tc = SB_T2(t);
  sbDiamondValley(ctx, t, cam);
  // three tiny throwers on the rim swing the second joint (96.74)
  for (let i = 0; i < 3; i++) { const sw = Math.sin(Math.PI * 2 * K.clamp((t - 96.2) / 0.5)) * (t < 96.74 ? 1 : 0); sbTrader(ctx, i, sbLive(t, 90 + i, { x: 1060 + i * 90, y: -1400, s: 0.5, dir: -1, aL: [1.2 + sw * (0.4 + 0.1 * i), 1.3], aR: [1.2 + sw * 0.4, 1.3], gaze: [-0.3, 1] })); }
  if (t > 96.0 && t < 96.74) sbSlab(ctx, 1150, -1440 + 30 * Math.sin((t - 96.2) * 12), { rot: SB_FLAT, s: 0.6 });
  if (t > 96.74 && t < 98.1) sbDots(ctx, SB2_BOUNCE.map(([, p]) => p), 0.6, 6);
  if (t > 92.5 && t < 93.58) { const r = 20 + 160 * K.clamp((t - 92.5) / 1.0); ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#3a2a5a'; ctx.beginPath(); ctx.ellipse(700, 912, r, r * 0.3, 0, 0, 7); ctx.fill(); ctx.restore(); }
  const A = sbSlab1(t), B = sbSlab2(t);
  if (A) sbSlab(ctx, A.x, A.y, { rot: A.rot, sq: A.sq, wobble: A.wobble, stuck: 5 });
  if (B) sbSlab(ctx, B.x, B.y, { rot: B.rot, sq: B.sq, s: B.s, stuck: 4 });
  if (t > 93.58 && t < 94.4) { dustBurst(ctx, 640, 905, t - 93.58, 8, 8, 20, 140, 0.8, 1); dustBurst(ctx, 760, 905, t - 93.58, 8, 8, 20, 140, 0.8, 6); for (let i = 0; i < 6; i++) { const u = (t - 93.6) / 0.5; if (u < 1) sbGem(ctx, 600 + i * 40 + 60 * u * (i - 2.5) / 2.5, 905 - 70 * Math.sin(Math.PI * u) * (0.6 + 0.4 * (i % 2)), 9, { rot: u * 6 + i }); } }
  if (t > 98.0 && t < 98.6) dustBurst(ctx, 900, 905, t - 98.0, 6, 6, 14, 90, 0.6, 2);
  const P = sbS15SinP(t); groundShadow(ctx, P.x, 905, 80, 900 - P.y, { flat: true }); const Q = sbSin2(ctx, P);
  if (t > 100.94) { const h = sbHandW(Q, t > 101.9 ? 0 : 1); sbGem(ctx, h[0], h[1] - 8, 10, { rot: 0.3, glow: 0.5 }); }
}
function sbS15Over(ctx, t, cam, S) {
  if (t > 93.58 && t < 94.6) { if (t < 93.65) { ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); } const p = sbP(700, 700, cam); sbTag(ctx, S, 'THUD!', p[0], p[1] - 80, t, 93.6, 94.4, { size: 56 }); }
  if (t > 101.64 && t < 102.1) { const p = sbP(700, 740, cam); sbTag(ctx, S, 'STICKY!', p[0] + 120, p[1] - 220, t, 101.7, 102.4, { size: 50 }); S.arrow(ctx, [p[0] + 70, p[1] - 180], [p[0] + 10, p[1] - 90], K.clamp((t - 101.75) / 0.3)); }
  // the insert (99.94 - 100.94): the underside of the joint with five diamonds pressed into the fat, glinting in turn
  if (t >= 99.94 && t < 100.94) { sbGrad(ctx, 0, 0, 1000, 1230, [[0, '#f0c8b8'], [1, '#d898a8']]); ctx.save(); ctx.translate(500, 615); ctx.scale(4.2, 4.2); sbSlab(ctx, 30, 0, { rot: 0, stuck: 0 }); ctx.restore();
    for (let i = 0; i < 5; i++) { const x = 230 + (i % 2) * 40, y = 260 + i * 170; sbGem(ctx, x, y, 40, { rot: i * 0.5, glow: 0.4, tint: ['#bfeaff', '#ffd8f0', '#d8ffe8'][i % 3] }); const u = (t - 99.94 - i * 0.18) / 0.3; if (u > 0 && u < 1) sbGlint(ctx, x, y - 20, 60, u); } }
}
SB_SHOTS.push({ a: 92.48, b: 102.1, free: true, cam: sbKeys([[92.48, { x: 800, y: 430, zoom: 0.85 }], [96.22, { x: 800, y: 430, zoom: 0.85 }], [96.7, { x: 1000, y: -1100, zoom: 0.85 }], [97.3, { x: 1000, y: -1100, zoom: 0.85 }], [97.7, { x: 780, y: 430, zoom: 0.85 }], [98.6, { x: 720, y: 620, zoom: 1.15 }], [102.1, { x: 720, y: 620, zoom: 1.15 }]]), world: sbS15World, over: sbS15Over });

// ---------- S16 (102.1 - 109.75): the eagle takes the second joint up to its nest; AHA! ----------
const SB2_EAG = (t) => { // knob position of slab 2 while carried, and the eagle state
  const pts = [[104.02, [900 - 196, 822]], [104.6, [880, 520]], [105.2, [930, 250]], [105.96, [960, -700]], [106.5, [1060, -1230]], [106.86, [1080, -1090 - 196 + 136]]];
  let i = 0; while (i < pts.length - 2 && t >= pts[i + 1][0]) i++; const [t0, a] = pts[i], [t1, b] = pts[i + 1], u = K.ease.inOut(K.clamp((t - t0) / (t1 - t0)));
  return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u)]; };
function sbS16World(ctx, t, cam, S) { const tc = SB_T2(t);
  sbDiamondValley(ctx, t, cam);
  sbStickNest(ctx, 'back'); for (let i = 0; i < 2; i++) sbEaglet(ctx, 1200 + i * 60, -1090, { s: 0.8, bob: 8 * Math.abs(Math.sin(tc * (2.6 + i * 0.7) + i * 1.7)), beak: Math.sin(tc * 5 + i * 2) > 0.5 ? 1 : 0, gaze: t > 106.86 ? [-1, 0.3] : [0, 1], tilt: t > 106.86 ? -0.3 : 0 }); sbStickNest(ctx, 'front');
  sbSnakes(ctx, t);
  // the circling shadow (102.1 - 103.36)
  if (t > 102.1 && t < 103.5) { const a = tc * 3, r = 220 - 120 * K.clamp((t - 102.1) / 1.2); ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#3a2a5a'; ctx.beginPath(); ctx.ellipse(880 + Math.cos(a) * r, 930 + Math.sin(a) * r * 0.2, 120, 30, 0, 0, 7); ctx.fill(); ctx.restore(); }
  const A = sbSlab1(t); const P = sbLive(t, 11, { x: 640, y: 900, dir: 1, cloth: 'sling', mouth: 'closed', gaze: [0.6, -0.6] }, [102.9, 104.6]);
  if (t > 102.88) { P.kneel = 1; P.x = 650; P.gaze = t < 104.02 ? [1, 0.1] : look(tc, [650, 700], [[104.02, [900, 700]], [104.6, [920, 300]], [105.2, [950, -400]]]); P.tip = t > 104.62 ? -0.15 * K.clamp((t - 104.62) / 0.5) : 0; if (t > 105.2) { P.kneel = 0; P.sit = 1; P.seat = 'floor'; P.sq *= landSquash(tc, 105.2, 0.14); } }
  sbSin2(ctx, P);
  if (A) sbSlab(ctx, A.x, A.y, { rot: A.rot, stuck: 5 });
  // the eagle: drops in (103.36), grips, looks hard left and right, three beats (104.02), climbs with the joint swinging, sets it down (106.86)
  if (t > 103.0) { let knob, fly, flap, sq = 1, hr = 0, swg = 0;
    if (t < 103.6) { const u = K.clamp((t - 103.0) / 0.6); knob = [K.lerp(500, 704, u), K.lerp(200, 822, u * u)]; fly = true; flap = Math.sin(tc * 14); }
    else if (t < 104.02) { knob = [704, 822]; fly = false; sq = landSquash(tc, 103.6, 0.15) * anticipate(tc, 103.8, 0.22, 0.12); hr = t < 103.75 ? 0 : t < 103.9 ? -0.35 : 0.35; }
    else if (t < 106.86) { knob = SB2_EAG(t); fly = true; flap = Math.sin(tc * 11); swg = 0.25 * Math.sin((tc - 104.1) * 4.2 - 0.6) * Math.exp(-(t - 104.02) * 0.5); }
    else { knob = [1080, -1090 - 60]; fly = false; sq = landSquash(tc, 106.86, 0.12); hr = 0.25 * Math.sin(tc * 2); }
    if (t > 104.02) { const r = SB_FLAT + K.clamp((t - 104.02) / 0.5) * (Math.PI / 2) + swg, c = [knob[0] - Math.sin(r) * 196, knob[1] + Math.cos(r) * 196]; if (t < 106.86) sbSlab(ctx, c[0], c[1], { rot: r, stuck: 4 }); else sbSlab(ctx, 1040, -1090 - 78, { rot: SB_FLAT, stuck: 4 }); }
    else sbSlab(ctx, 900, 822, { rot: SB_FLAT, stuck: 4, sq: t > 103.6 ? 0.96 : 1 });
    sbEagleAt(ctx, knob, t, { fly, flap, sq, headRot: hr, dir: t < 104.02 ? 1 : 1 }); }
  else { const B = sbSlab2(t); if (B) sbSlab(ctx, B.x, B.y, { rot: B.rot, stuck: 4 }); }
}
function sbS16Over(ctx, t, cam, S) {
  if (t > 102.1 && t < 102.9) soundArcs(ctx, 500, 120, 0, t, '#ffffff');
  if (t > 107.6 && t < 108.16) { const a = sbP(1000, -1100, cam), b = sbP(780, -1420, cam); S.arrow(ctx, a, b, K.clamp((t - 107.6) / 0.45), { bend: -0.1 }); }
}
SB_SHOTS.push({ a: 102.1, b: 108.16, free: true, cam: sbKeys([[102.1, { x: 760, y: 430, zoom: 0.85 }], [104.6, { x: 820, y: 430, zoom: 0.85 }], [105.5, { x: 950, y: -200, zoom: 0.85 }], [107.4, { x: 1040, y: -1100, zoom: 0.85 }], [108.16, { x: 1020, y: -1140, zoom: 0.85 }]]), world: sbS16World, over: sbS16Over });
// cut back down (108.16): eyes from the eagle to the meat to the cloth, a slow grin, AHA!, the plan in a balloon
function sbS16bWorld(ctx, t, cam, S) { const tc = SB_T2(t); sbDiamondValley(ctx, t, cam); sbSnakes(ctx, t);
  const P = sbLive(t, 11, { x: 600, y: 900, dir: 1, cloth: 'sling', sit: 1, seat: 'floor', mouth: 'closed' }, [108.4, 108.7, 109.0]);
  P.gaze = gazePlan(SB_T3(t), [[108.16, [0.5, -1]], [108.4, [1, 0.2]], [108.7, [-0.2, 1]]], 0.12); P.mouth = t > 108.9 ? 'smile' : 'closed'; if (t > 109.1) { P.handR = PERSON_HANDS.pointUp.R; P.brow = -0.4; }
  sbSin2(ctx, P); const A = sbSlab1(t); sbSlab(ctx, A.x, A.y, { rot: A.rot, stuck: 5 }); }
function sbS16bOver(ctx, t, cam, S) { if (t > 108.3 && t < 109.75) S.title(ctx, 'AHA!', 300, 300, K.clamp((t - 108.3) / 0.4), { size: 92, align: 'center' });
  if (t > 108.9) { const h = sbP(600, 690, cam); thoughtCloud(ctx, 640, 330, 460, 300, t, { p: K.clamp((t - 108.9) / 0.45), tail: [h[0] + 30, h[1] - 30], fill: '#fff6ea', scale: 0.32, at: [500, 760], seed: 9,
    inside: (k) => { const sw = 0.12 * Math.sin(SB_T2(t) * 3); bird(k, { kind: 'hawk', pal: 1, s: 2.4, x: 600, y: 520, fly: true, flap: Math.sin(SB_T2(t) * 9), grip: 1 }); const kn = [480, 520]; k.save(); k.translate(kn[0], kn[1]); k.rotate(sw); sbSlab(k, 0, 196, { rot: 0, front: (c) => sbStrapped(c, t, { aR: [2.6, 2.9], mouth: 'smile', gaze: [0, 0] }, 2, 0) }); k.restore(); } }); } }
SB_SHOTS.push({ a: 108.16, b: 109.75, free: true, cam: sbKeys([[108.16, { x: 640, y: 620, zoom: 1.15 }], [109.75, { x: 660, y: 620, zoom: 1.15 }]]), world: sbS16bWorld, over: sbS16bOver });

// ---------- S17 (109.75 - 116.54): the slab pushed flat, the cloth shaken out, strapped on, lying still; a snake looks; a shadow circles ----------
const SB2_S17X = (t) => kfn(t, [[109.75, 600], [109.95, 600], [110.0, 640], [110.4, 870]], 'inOut');
function sbS17World(ctx, t, cam, S) { const tc = SB_T2(t);
  sbDiamondValley(ctx, t, cam, { glints: 16 }); sbChinRock(ctx); sbSnakes(ctx, t);
  if (t > 115.06) sbFloorBands(ctx, t, 0.18);
  // a curious snake head rises behind the left boulder (115.82)
  if (t > 115.6 && t < 116.54) { const r = Math.sin(Math.PI * K.clamp((t - 115.82) / 0.7)) * 0.5; sbSnake(ctx, [[300, 960], [340, 930], [370, 900], [400, 870]], t, { pal: 0, w: 60, wave: 4, rear: r, lid: 0.3, tongue: Math.floor(SB_T3(t) * 8) % 2, dir: 1 }); sbStone(ctx, 380, 925, 70, '#d0a8a8', '#9a7080'); }
  // the circling shadow, larger on each pass (116.2)
  if (t > 116.2) { const a = tc * 4, r = 140 + 120 * K.clamp((t - 116.2) / 0.34); ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = '#3a2a5a'; ctx.beginPath(); ctx.ellipse(700 + Math.cos(a) * r, 930 + Math.sin(a) * 30, 140, 34, 0, 0, 7); ctx.fill(); ctx.restore(); }
  const A = sbSlab1(t), flatK = A.rot <= SB_FLAT + 0.01 ? 1 : 0;
  if (t < 111.68) { // runs, skids, checks the sky, pushes it over, shakes out the cloth
    if (A) sbSlab(ctx, A.x, A.y, { rot: A.rot, sq: A.sq, stuck: 5 });
    const P = sbLive(t, 11, { x: SB2_S17X(t), y: 900, dir: t < 110.4 ? 1 : -1, cloth: t < 110.76 ? 'sling' : 'none', mouth: 'closed' }, [110.4, 110.76]);
    if (t < 110.4) { Object.assign(P, walk(SB2_S17X, tc, { stride: 34 })); P.tip += 0.12 * (P.amp || 0); if (t < 110.0) { P.gaze = [0.2, -1]; P.tip += lurch(t, 109.8, 0.25); } }
    else if (t < 110.76) { P.handLW = [810, 760]; P.handRW = [800, 720]; P.tip += 0.2; P.sq *= 0.97; P.mouth = 'open'; }
    if (t > 110.5 && t < 111.0) dustBurst(ctx, 620, 905, t - 110.5, 6, 6, 16, 100, 0.5, 4);
    const Q = sbSin2(ctx, P);
    if (t >= 110.76) { const h = sbHandW(Q, 1), crack = K.clamp((t - 110.76) / 0.5); sbRibbon(ctx, h[0], h[1], -Math.PI / 2 + 0.3 + 1.5 * crack, 300, 14, t, { amp: 40 * (1 - crack) + 8, freq: 14, k: 0.9, droop: 60 * crack }); } }
  else { // lying on the slab: the frame turns him from standing beside it (111.68) to lying on it (112.2)
    const u = sbF(t, [[111.68, 0], [112.2, 1]]), bands = t < 112.58 ? (t > 112.2 ? 1 : 0) : 2;
    const pose = { gaze: [0.3, -1], mouth: 'closed', wind: 0 };
    if (t < 113.94) { pose.handL = [-50, -120 + 20 * osc(tc, 0.3)]; pose.handR = [50, -120 - 20 * osc(tc, 0.3)]; pose.tongue = t > 112.58; }
    else if (t < 114.48) { pose.tip = 0.15 * Math.max(pulse(t, 113.94, 0.25), pulse(t, 114.2, 0.2)); pose.handL = [-40, -110]; pose.handR = [40, -110]; pose.mouth = 'smile'; }
    else { pose.handL = PERSON_HANDS.folded.L; pose.handR = PERSON_HANDS.folded.R; pose.lid = t < 115.2 ? 1 : t < 115.82 ? 0.5 : t < 116.2 ? 1 : 0.5; pose.gaze = t > 116.2 ? [Math.cos(tc * 4), -0.6] : [0.4, -1]; if (t > 113.2 && t < 113.6) pose.sq = 0.96; }
    if (u < 1) { sbSlab(ctx, 700, 822, { rot: SB_FLAT, sq: A.sq, stuck: 5 }); const feet = [K.lerp(860, 850, u), K.lerp(900, 762, u) - 50 * Math.sin(Math.PI * u)]; ctx.save(); ctx.translate(feet[0], feet[1]); ctx.rotate(SB_FLAT * u); sbSin2(ctx, sbLive(t, 11, { x: 0, y: 0, dir: -1, cloth: 'none', ...pose })); ctx.restore(); }
    else sbSlab(ctx, 700, 822, { rot: SB_FLAT, sq: A.sq, stuck: 5, front: (c) => sbStrapped(c, t, pose, bands, 1) }); }
}
SB_SHOTS.push({ a: 109.75, b: 116.54, free: true, cam: sbKeys([[109.75, { x: 700, y: 640, zoom: 1.15 }], [116.54, { x: 750, y: 640, zoom: 1.15 }]]), world: sbS17World });

// ---------- S18 + S19 (116.54 - 128.07): lifted to the nest ledge; out of the strap, TIP... TOE..., over the rim ----------
// the knob (grip) path of slab 1 in the climb, and the slab's rot hanging from it
function sbLiftKnob(t) { const base = [504, 822];
  if (t < 118.22) return base;
  const pts = [[118.22, base], [118.8, [560, 600]], [119.42, [640, 300]], [120.52, [880, -800]], [121.1, [1010, -1480]], [121.42, [1060, -1412]]];
  let i = 0; while (i < pts.length - 2 && t >= pts[i + 1][0]) i++; const [t0, a] = pts[i], [t1, b] = pts[i + 1], u = K.ease.inOut(K.clamp((t - t0) / (t1 - t0)));
  return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u)]; }
function sbLiftRot(t) { if (t < 118.22) return SB_FLAT; const up = K.clamp((t - 118.22) / 0.55); return SB_FLAT * (1 - K.ease.out(up)) + (t < 121.42 ? 0.2 * Math.sin((t - 118.7) * 2.6) * Math.exp(-(t - 118.7) * 0.6) * (t > 118.7 ? 1 : 0) : 0); }
function sbS18World(ctx, t, cam, S) { const tc = SB_T2(t);
  sbDiamondValley(ctx, t, cam); sbChinRock(ctx); sbSnakes(ctx, t);
  // a sleeping snake on a ledge, a second eagle crossing behind (the climb)
  sbSnake(ctx, sbCoilPath(1180, 400, 80, 2.2, 1.2), t, { pal: 2, w: 40, wave: 3, lid: 1, dir: -1 });
  if (t > 119.42 && t < 121.4) { const u = (t - 119.42) / 2; bird(ctx, { kind: 'hawk', pal: 1, fly: true, flap: Math.sin(tc * 10), x: 300 + 900 * u, y: -300 - 200 * u, s: 0.9, dir: 1 }); }
  sbStickNest(ctx, 'back'); const bob = t > 120.52; for (let i = 0; i < 2; i++) sbEaglet(ctx, 1200 + i * 60, -1090, { s: 0.8, bob: bob ? 8 * Math.abs(Math.sin(tc * (2.6 + i) + i)) : 2, beak: (t > 122.62 && t < 123.1 && i === 0) || Math.sin(tc * 5 + i * 2) > 0.7 ? 1 : 0, gaze: i === 0 && t > 122.62 ? [-1, 0.2] : [0, 1], tilt: i === 0 && t > 122.62 ? -0.3 : 0, lid: i === 0 && t > 122.9 && t < 123.0 ? 1 : 0 }); sbStickNest(ctx, 'front');
  // the slab and Sinbad (one frame), the eagle on the knob
  const kn = sbLiftKnob(t), rot = sbLiftRot(t), landed = t >= 121.42, c = [kn[0] - Math.sin(rot) * 196, kn[1] + Math.cos(rot) * 196], flat = K.clamp((rot - 0) / SB_FLAT);
  if (t > 118.22 && t < 121.42) groundShadow(ctx, c[0], 905, 220, 822 - c[1], { flat: true, fall: 900 });
  const pose = { mouth: 'closed', gaze: [0, 1], wind: 0, lid: 1 };
  if (t < 118.22) { pose.handL = PERSON_HANDS.folded.L; pose.handR = PERSON_HANDS.folded.R; pose.tip = tremble(t, 0.01, 9); }
  else { pose.ph = tc * 3; pose.amp = 0.3 * (1 - flat); pose.tip = -0.4 * swing(t, 118.7, 0.3, 0.8, 1); pose.lid = t > 118.76 ? 0 : 1; pose.gaze = t > 119.92 ? [0, -1] : [0, 1]; pose.mouth = t > 119.92 ? 'smile' : 'o'; pose.handL = [-50, -130]; pose.handR = [50, -130]; pose.hairK = 1 + 0.2 * Math.abs(Math.sin(tc * 5)); }
  if (landed) { pose.sq = landSquash(tc, 121.42, 0.12); pose.brow = 0.4; pose.mouth = t < 121.8 ? 'o' : 'closed'; if (t > 122.62) { pose.handR = PERSON_HANDS.hush.R; pose.gaze = [1, 0.1]; } }
  sbSlab(ctx, landed ? 1060 : c[0], landed ? -1080 - 136 : c[1], { rot: landed ? 0 : rot, stuck: t > 118.8 ? 4 : 5, sq: landed ? landSquash(tc, 121.42, 0.1) : 1, front: (q) => sbStrapped(q, t, pose, 2, flat) });
  if (t > 118.8) { const u = (t - 118.8) / 1.7; if (u < 1) sbGem(ctx, 560 - 40 * u, K.lerp(860, 900, u * u * 0.2) + 0 * u, 10, { rot: u * 9 }); }
  // the eagle
  if (t < 116.9) { const u = K.clamp((t - 116.3) / 0.5); sbEagleAt(ctx, [K.lerp(300, 504, u), K.lerp(500, 822, u * (2 - u))], t, { fly: u < 1, flap: Math.sin(tc * 12), sq: landSquash(tc, 116.8, 0.12), headRot: 0.5 * Math.sin(tc * 2), dir: 1 }); }
  else if (t < 118.22) sbEagleAt(ctx, [504, 822], t, { headRot: t < 117.3 ? 0.4 * Math.sign(Math.sin(tc * 3)) + 0.3 : 0.2, sq: anticipate(tc, 117.6, 0.5, 0.14), dir: 1, gaze: [0.6, 1] });
  else if (t < 121.42) sbEagleAt(ctx, kn, t, { fly: true, flap: Math.sin(tc * (t < 118.9 ? 14 : t > 120.52 ? 16 : 9)), dir: 1, tip: t > 120.52 ? -0.2 : 0 });
  else { const [hx, l] = hop(t, 122.14, 0.3, 1070, 1150, 60), turned = t > 122.3; sbEagleAt(ctx, t < 122.14 ? [1070, -1352] : [hx, K.lerp(-1352, -1090, K.clamp((t - 122.14) / 0.3)) - l], t, { sq: landSquash(tc, 122.44, 0.12), dir: turned ? 1 : -1, headRot: t > 126.0 && t < 126.5 ? -0.8 : 0.2 * Math.sin(tc * 2) }); }
}
SB_SHOTS.push({ a: 116.54, b: 123.26, free: true, cam: (t) => { if (t < 118.9) return K.camAt([[116.54, { x: 720, y: 620, zoom: 0.85 }], [118.9, { x: 700, y: 560, zoom: 0.85 }]], t); if (t < 121.42) { const k = sbLiftKnob(t); return { x: K.lerp(700, 1050, K.clamp((t - 118.9) / 2.5)), y: k[1] + 120, zoom: K.lerp(0.85, 1.0, K.clamp((t - 120) / 1.4)) }; } return { x: 1055, y: K.lerp(-1292, -1180, K.ease.inOut(K.clamp((t - 121.42) / 1.5))), zoom: 1.0 }; }, world: sbS18World });
// S19: out of the strap behind the eagle's back, the cloth as a scarf, TIP... TOE..., the rock pose, over the rim, lying in the sun
const SB2_S19X = (t) => kfn(t, [[124.0, 1060], [124.3, 1000], [125.46, 1000], [126.0, 900], [126.54, 900], [126.95, 790]], 'inOut');
function sbS19World(ctx, t, cam, S) { const tc = SB_T2(t);
  sbDiamondValley(ctx, t, cam);
  sbStickNest(ctx, 'back'); for (let i = 0; i < 2; i++) sbEaglet(ctx, 1200 + i * 60, -1090, { s: 0.8, bob: 8 * Math.abs(Math.sin(tc * (2.6 + i) + i)), beak: (i === 0 && t > 126.0 && t < 126.4) || Math.sin(tc * 5 + i * 2) > 0.7 ? 1 : 0, gaze: i === 0 ? [-1, 0.2] : [0, 1], tilt: i === 0 ? -0.3 : 0 }); sbStickNest(ctx, 'front');
  const eagleTurn = t > 126.0 && t < 126.45; sbEagleAt(ctx, [1150, -1090], t, { dir: eagleTurn ? -1 : 1, headRot: eagleTurn ? 0 : 0.2 * Math.sin(tc * 2), sq: breathe(tc, 4, 0.02) });
  // the slab stays against the wall; Sinbad unpicks the knot (123.26) and slides out (124.0)
  if (t < 124.0) { sbSlab(ctx, 1060, -1216, { rot: 0, stuck: 4, front: (q) => sbStrapped(q, t, { handL: [-30, -60 + 6 * osc(SB_T3(t), 0.3)], handR: [30, -40 - 6 * osc(SB_T3(t), 0.3)], gaze: [1, -0.3], mouth: 'closed' }, t < 123.7 ? 2 : 1, 0) }); return; }
  sbSlab(ctx, 1060, -1216, { rot: 0, stuck: 4 });
  const x = SB2_S19X(t), onShelf = x < 1000, P = sbLive(t, 11, { x, y: onShelf ? sbShelfY(x) : -1084, dir: -1, mouth: 'closed', gaze: [1, -0.1], cloth: t < 124.86 ? 'none' : 'scarf', wind: -0.2 }, [124.3, 126.0, 126.45]);
  if (t < 124.3) { P.sq *= landSquash(tc, 124.25, 0.08); P.dir = 1; }
  else if (t < 125.46) { P.dir = 1; const pull = osc(tc, 0.3); P.handLW = [1040 + 20 * pull, -1170]; P.handRW = [1020 - 20 * pull, -1160]; P.gaze = [1, -0.3]; }
  else if (t < 126.0 || (t >= 126.54 && t < 126.95)) { const xf = SB2_S19X; Object.assign(P, walk(xf, tc, { stride: 12 })); P.y = sbShelfY(P.x); P.dir = -1; P.aL = [1.6, 1.7]; P.aR = [1.6, 1.7]; P.sq *= 1.03; P.gaze = [1, -0.2]; }
  else if (t < 126.54) { P.ph = 1.3; P.amp = 1; P.aL = [1.4, 2.4]; P.aR = [1.8, 2.6]; P.tip += 0.05 * Math.sin(SB_T3(t) * 9); P.lid = 0; P.gaze = [1, 0.1]; }
  else { // hauls himself over the rim, rolls on his back, arms spread, laughing silently
    const u = K.clamp((t - 126.95) / 0.45); P.x = K.lerp(790, 720, u); P.y = K.lerp(sbShelfY(790), -1404, u) - 30 * Math.sin(Math.PI * u); if (u < 1) { P.handLW = [760, -1404]; P.handRW = [780, -1404]; P.tip = 0.4 * (1 - u); }
    else { P.lie = 1; P.lid = 1; P.mouth = 'smile'; P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.sq = 1 + 0.03 * Math.sin(tc * 9); } }
  sbSin2(ctx, P);
  if (t > 124.86 && t < 125.46) { const h = [1030, -1165], k = (t - 124.86) / 0.6; sbCloth(ctx, sbSag([1060, -1200], h, 30 * (1 - k)), { w: 12, free: 3, t }); }
  if (t > 127.2) { const f = [650, -1420]; sbFlower(ctx, f[0] + 6 * Math.sin(tc * 2), f[1], 40, '#ff6a8a'); }
}
function sbS19Over(ctx, t, cam, S) { if (t > 125.6 && t < 127.0) { const p = sbP(SB2_S19X(t), sbShelfY(SB2_S19X(t)), cam); sbTag(ctx, S, t < 126.0 ? 'TIP...' : 'TIP... TOE...', p[0] - 60, p[1] - 300, t, 125.6, 126.9, { size: 44 }); } }
SB_SHOTS.push({ a: 123.26, b: 128.07, free: true, cam: sbKeys([[123.26, { x: 1010, y: -1150, zoom: 1.0 }], [125.46, { x: 1000, y: -1160, zoom: 1.0 }], [127.0, { x: 820, y: -1420, zoom: 1.0 }], [128.07, { x: 800, y: -1430, zoom: 1.0 }]]), world: sbS19World, over: sbS19Over });
