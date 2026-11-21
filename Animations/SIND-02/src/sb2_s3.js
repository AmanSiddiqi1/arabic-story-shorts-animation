// ===== SIND-02 shots S10-S14 (64.98 - 92.48 s): the flight, down into the valley, diamonds, the walls and the snakes, the pouch =====

// ---------- S10 (64.98 - 68.46): skyFlight, panel space. The roc flies left (screen direction kept from the nest), ranges scroll right ----------
const sbSkyFlightPlate = () => sbBakeAt('flightSky', 1000, 1230, (c) => { sbGrad(c, 0, 0, 1000, 1230, [[0, '#3f86e6'], [0.55, '#9ccaf4'], [1, '#e8f6fa']]); sbGlow(c, 160, 170, 260, 0.6, '#fff0c0');
  celShade(c, ell(160, 170, 54, 54, 30), '#fffbe0', '#ffe8a0', { light: [-1, -1], off: 10, lw: 0 }); const R = K.rng(12); for (let i = 0; i < 6; i++) sbCloud(c, R() * 1000, 260 + R() * 420, 260 + R() * 200, 50 + R() * 30, 'rgba(255,255,255,0.75)', 'rgba(200,180,232,0.5)', 10); });
function sbFlightRoc(t) { const f = sbRocFlap(t, 1.6, 0.25), glide = K.clamp((t - 67.72) / 0.3), ph = ((SB_T2(t) / 1.6 + 0.25) % 1) * Math.PI * 2;
  return { x: 520, y: 470 - 22 * Math.sin(ph - 0.6) * (1 - glide), s: 0.36, dir: -1, t, spread: 1, flap: K.lerp(f.flap, 0.35, glide), flapLag: K.lerp(f.flapLag, 0.35, glide), tuck: 0.8, rot: -0.21 * K.ease.inOut(glide) * (1 - K.clamp((t - 68.3) / 0.3)), wind: 1, gaze: [-1, 0.2] }; }
function sbS10Panel(ctx, t, S) {
  const tc = SB_T2(t), d = t - 64.98, rise = K.ease.out(K.clamp((t - 65.2) / 1.3));
  ctx.drawImage(sbSkyFlightPlate(), 0, 0);
  // the sea and the wooded island fall behind (lower right) as the ranges roll in
  const sk = K.clamp(1 - (t - 65.3) / 1.6); if (sk > 0) { ctx.save(); ctx.globalAlpha = sk; sbGrad(ctx, 0, 980, 1000, 250, [[0, '#7fd6d8'], [1, '#2f88cf']]); sbFarIsland(ctx, 760 + 160 * (1 - sk), 1010, 0.42 * sk + 0.08); ctx.restore(); }
  sbRidge(ctx, 0, 60 * d, 420 * (1 - rise) + 30); sbRidge(ctx, 1, 140 * d, 520 * (1 - rise) + 10); sbRidge(ctx, 2, 320 * d, 600 * (1 - rise));
  for (let i = 0; i < 3; i++) { const x = ((200 * d + i * 380) % 1300) - 150; sbCloud(ctx, x, 860 + i * 60, 260, 46, 'rgba(255,255,255,0.85)', 'rgba(210,190,240,0.6)', 6); }
  // the roc, Sinbad on the tangerine line under its ankle (he swings back a quarter beat late)
  const R = sbFlightRoc(t), ak = sbRocAnkle(R), sw = 0.18 * Math.sin(((tc - 0.4) / 1.6 + 0.25) * Math.PI * 2) + swing(t, 67.72, 0.45, 0.7, 1.2), L = 150, hx = ak[0] + Math.sin(sw) * L, hy = ak[1] + Math.cos(sw) * L;
  sbRoc(ctx, R);
  sbCloth(ctx, [ak, [(ak[0] + hx) / 2, (ak[1] + hy) / 2], [hx, hy]], { w: 6 }); sbBow(ctx, ak[0], ak[1], 0.4, t, 0.4);
  const P = sbLive(t, 11, { x: hx, y: hy + 240 * 0.36, s: 0.36, dir: -1, cloth: 'none', wind: 1, tip: -sw * 0.6, ph: 0, amp: 0, mouth: 'o', gaze: [-0.5, 0.6] }); P.handLW = [hx - 3, hy + 6]; P.handRW = [hx + 3, hy]; P.sit = 0.25 + 0.15 * Math.sin(tc * 3);
  ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(-sw * 0.8); ctx.translate(-P.x, -P.y); sbSin2(ctx, P); ctx.restore();
  if (t > 65.2 && t < 66.8) { sbTag(ctx, S, 'SINBAD', hx - 200, hy + 40, t, 65.2, 66.6, { size: 42 }); S.arrow(ctx, [hx - 140, hy + 60], [hx - 30, hy + 60], K.clamp((t - 65.3) / 0.3), { bend: 0 }); }
  // cut-in medium (67.0 - 67.7): the foot at the top, Sinbad big, one eye, both, a grin; a peak under his feet, knees tucked
  if (t >= 67.0 && t < 67.7) { ctx.drawImage(sbSkyFlightPlate(), 0, 0); sbSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, speed: 1800, n: 18, alpha: 0.35 });
    const px = ((t - 67.0) / 0.7) * 1400 - 300; ctx.save(); ctx.fillStyle = '#e8988a'; ctx.beginPath(); ctx.moveTo(px - 320, 1230); ctx.lineTo(px, 1000 - 40); ctx.lineTo(px + 320, 1230); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fbf6ff'; ctx.beginPath(); ctx.moveTo(px, 960); ctx.lineTo(px - 70, 1040); ctx.lineTo(px + 60, 1036); ctx.closePath(); ctx.fill(); ctx.restore();
    sbRoc(ctx, { x: 900, y: 120, s: 1.1, dir: -1, t, feet: { n: [300, 80], f: [0, 80] }, tuck: 0.4, spread: 1, flap: 0.4 }, 'front');
    const top = [560, 150], sw2 = 0.06 * Math.sin(tc * 4), Q = sbLive(t, 11, { x: top[0] + Math.sin(sw2) * 360, y: top[1] + 360 + 330, s: 1.45, dir: 1, cloth: 'none', wind: -1, mouth: t < 67.3 ? 'closed' : 'smile', gaze: [0, 0.4] });
    Q.handLW = [top[0] - 6, top[1] + 380]; Q.handRW = [top[0] + 6, top[1] + 360]; Q.lid = t < 67.15 ? 1 : 0; Q.wink = t >= 67.15 && t < 67.3; Q.sit = sbF(t, [[67.25, 0], [67.45, 0.8]]); Q.seat = 'floor';
    sbCloth(ctx, [top, [top[0], top[1] + 180], [Q.handLW[0], Q.handLW[1]]], { w: 18 }); sbSin2(ctx, Q); }
}
SB_SHOTS.push({ a: 64.98, b: 68.46, panel: sbS10Panel });

// ---------- S11 + S12 (68.46 - 79.9): down into the valley, landing, the cloth untied, the roc leaves, the glitter, DIAMONDS! ----------
const SB2_R11X = (t) => kfn(t, [[68.46, 1300], [69.68, 760]], 'out'), SB2_R11Y = (t) => kfn(t, [[68.46, -1400], [69.3, 640], [69.68, 900]], 'inOut');
function sbRocValP(t) { const tc = SB_T2(t), land = t >= 69.68, P = { x: SB2_R11X(t), y: SB2_R11Y(t), s: 1, dir: -1, t, hipN: 120, hipF: -100, feet: { n: [120, 0], f: [-120, 0] }, sq: breathe(tc, 5, 0.012), gaze: [-0.4, 0.5] };
  if (t < 69.68) { const brake = t > 69.25, f = sbRocFlap(t, brake ? 0.16 : 1.4); P.spread = 1; P.flap = brake ? f.flap : 0.55; P.flapLag = brake ? f.flapLag : 0.5; P.reach = K.clamp((t - 68.9) / 0.4); P.feet = { n: [160, 60], f: [-60, 60] }; P.wind = 1; P.rot = -0.08; return P; }
  if (t < 75.3) { P.sq *= impactSquash(t, 69.68, 0.82); P.spread = Math.max(0, 1 - K.clamp((t - 69.9) / 1.2)); P.flap = 0.5; P.flapLag = 0.6;
    if (t > 71.2 && t < 72.6) { const pr = Math.sin(Math.PI * K.clamp((t - 71.2) / 1.4)); P.neck = -0.6 * pr; P.headTurn = 1.6 * pr; }
    if (t > 73.6 && t < 74.4) { P.gaze = [-0.2, 1]; P.headTurn = 0.2; } return P; }
  const cr = sbF(t, [[75.3, 0], [75.6, 1], [75.75, 0]]), up = K.ease.in(K.clamp((t - 75.7) / 0.9)), f = sbRocFlap(t, 0.6); P.crouch = cr; P.spread = K.clamp((t - 75.3) / 0.3); P.flap = t < 75.7 ? 1 : f.flap; P.flapLag = t < 75.7 ? 0.8 : f.flapLag; P.y = 900 - 2400 * up; P.x = 760 - 200 * up; P.feet = { n: [120, 60 * up], f: [-120, 60 * up] }; P.tuck = up; return P; }
// Sinbad in the valley: hangs, pedals, touches down running, trips, sits; pats himself; unties, sling, thanks, looks, glint, turns, DIAMONDS!
const SB2_LANDX = (t) => kfn(t, [[69.55, 760], [70.0, 430], [70.08, 400]], 'out');
function sbValSinP(t, R) { const tc = SB_T2(t), P = sbLive(t, 11, { x: 380, y: 900, dir: -1, mouth: 'closed', gaze: [-0.3, 0.2], wind: 0.2 }, [70.4, 70.6, 74.2, 75.1, 75.4, 75.8]);
  if (t < 69.55) { const ak = sbRocAnkle(R), sw = 0.12 * Math.sin(tc * 3); P.x = ak[0] + 60 + Math.sin(sw) * 340; P.y = ak[1] + 340 + 240; P.ph = tc * 14; P.amp = t > 68.92 ? 1 : 0.2; P.gaze = t > 68.92 ? [0, 1] : [-0.5, 0.3]; P.mouth = 'o'; P.cloth = 'none'; P.handLW = [ak[0] + 55, ak[1] + 330]; P.handRW = [ak[0] + 65, ak[1] + 320]; P.dir = -1; P.y = Math.min(P.y, 900); return P; }
  if (t < 70.08) { Object.assign(P, walk(SB2_LANDX, tc, { stride: 30 })); P.dir = -1; P.tip += 0.15; P.mouth = 'o'; P.aL = [1.4, 1.6]; P.aR = [1.4, 1.6]; return P; }
  if (t < 71.92) { P.sit = 1; P.seat = 'floor'; P.sq *= landSquash(tc, 70.08, 0.15) * (1 - 0.06 * rebound(tc, 70.08, 1, 0.2)); P.dir = 1; P.gaze = [0.1, 0.1]; P.lid = sbLid(t, 11, [70.3, 70.5]); P.hairK = 1.25;
    if (t > 70.6 && t < 71.0) P.handR = PERSON_HANDS.chest.R; else if (t > 71.0 && t < 71.5) { P.handR = PERSON_HANDS.headHold.R; P.handL = PERSON_HANDS.headHold.L; P.brow = -0.5; P.mouth = 'o'; } else if (t > 71.5) { P.gaze = [1, -0.6]; P.mouth = 'smile'; } return P; }
  // S12: steps to the ankle, kneels and works the bow loose, the sling, two pats and a bow, stands and looks around
  const xf = (u) => kfn(u, [[71.92, 380], [72.5, 590], [74.18, 590], [77.16, 600]]); P.x = xf(t); P.dir = 1;
  if (t < 72.5) { Object.assign(P, walk(xf, tc, { stride: 24 })); P.gaze = [1, -0.2]; }
  else if (t < 73.46) { P.kneel = 1; P.handLW = [628, 820 + 6 * osc(SB_T3(t), 0.3)]; P.handRW = [650, 818 - 6 * osc(SB_T3(t), 0.3)]; P.tongue = true; P.gaze = [0.5, 0.5]; }
  else if (t < 74.18) { P.kneel = 1; if (t < 73.8) { P.handL = [-40, -170]; P.handR = [30, -100]; } else { P.handRW = [660, 870 - 8 * Math.abs(osc(tc, 0.2))]; P.tip += 0.18 * pulse(tc, 74.0, 0.3); P.handL = PERSON_HANDS.chest.R; } P.mouth = 'smile'; P.gaze = [1, 0.4]; }
  else { P.mouth = 'closed'; if (t < 74.6) { P.handL = [-24, -80 - 10 * osc(tc, 0.2)]; P.handR = [24, -80 + 10 * osc(tc, 0.2)]; }
    P.gaze = gazePlan(SB_T3(t), [[74.18, [-1, 0]], [75.1, [1, 0]], [75.4, [0.3, -1]], [75.76, [0.2, 1]], [76.2, [1, -0.2]]], 0.15); P.look = P.gaze[0] * 0.6;
    if (t > 75.6 && t < 76.3) { P.handR = PERSON_HANDS.shield.R; P.wind = 1; P.hairK = 1.3; } if (t > 76.0 && t < 76.4) { P.aL = [2.6 + 0.3 * osc(tc, 0.3), 2.9]; }
    if (t > 77.16) { P.dir = t < 77.5 ? 1 : t < 77.8 ? -1 : 1; P.mouth = 'o'; P.brow = -0.6; P.gaze = [1, 0.3]; }
    if (t > 79.1) { const [, l] = hop(t, 79.15, 0.32, 0, 0, 40); P.y = 900 - l; P.aL = [2.9, 3.0]; P.aR = [2.9, 3.0]; P.mouth = 'open'; P.sq *= landSquash(tc, 79.47, 0.15); } }
  return P; }
function sbValWorld(ctx, t, cam, S) {
  const tc = SB_T2(t), R = sbRocValP(t);
  sbDiamondValley(ctx, t, cam, { glints: t > 75.7 ? 14 : 4 });
  if (t > 77.62 && t < 79.9) { for (let i = 0; i < 12; i++) { const u = (t - 77.62 - i * 0.12) / 0.38; if (u > 0 && u < 1) sbGlint(ctx, 560 + i * 60 + 30 * Math.sin(i * 2.3), 1010 - i * 10 + 40 * Math.cos(i * 1.7), 26, u); } sbFloorBands(ctx, t, 0.2); }
  // the roc's shadow slides up the cliff as it leaves
  if (t > 75.8 && t < 77.0) { const u = (t - 75.8) / 1.2; ctx.save(); ctx.globalAlpha = 0.25 * (1 - u); ctx.fillStyle = '#4a2a6a'; ctx.beginPath(); ctx.ellipse(800, 500 - 1600 * u, 700, 160, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (t < 69.68) groundShadow(ctx, R.x, 905, 1000, 900 - R.y, { flat: true, fall: 1800 });
  sbRoc(ctx, R, 'back');
  const P = sbValSinP(t, R); groundShadow(ctx, P.x, 905, 80, 900 - P.y, { flat: true });
  sbRoc(ctx, R, 'front');
  if (t > 69.68 && t < 70.8) { dustBurst(ctx, R.x - 350, 905, t - 69.68, 9, 14, 42, 360, 1.1, 3); dustBurst(ctx, R.x + 300, 905, t - 69.68, 9, 14, 42, 320, 1.1, 8); }
  if (t > 70.08 && t < 70.7) dustBurst(ctx, 380, 905, t - 70.08, 6, 6, 16, 80, 0.6, 5);
  // the cloth: hanging line, then from the ankle bow to his waist, then free and over his shoulder
  const ak = sbRocAnkle(R), tie = [ak[0], ak[1] - 50]; let Q;
  if (t < 73.46) { if (t < 75.3) sbBow(ctx, tie[0], tie[1], 1, t, 0.2); Q = sbSin2(ctx, { ...P, cloth: 'none' }); const w = t < 69.55 ? sbHandW(Q, 0) : sbPt(Q, [24, -96], false); sbCloth(ctx, sbSag(tie, w, t < 69.55 ? 0 : t < 70.1 ? 10 : 60), { w: 12 }); }
  else { Q = sbSin2(ctx, P); if (t < 73.8) sbCloth(ctx, sbSag(tie, sbPt(Q, [-34, -168], false), 40 * (1 - (t - 73.46) / 0.34)), { w: 12, free: 4, t }); }
  if (t > 75.76 && t < 76.2) sbGlint(ctx, Q.x + 30, 902, 30, (t - 75.76) / 0.44);
}
function sbValOver(ctx, t, cam, S) {
  if (t > 79.1 && t < 79.9) S.title(ctx, 'DIAMONDS!', 500, 360, K.clamp((t - 79.1) / 0.5), { size: 90, align: 'center' });
  // the insert (78.3 - 79.1): finger and thumb turn a stone against the sun; seven rays slide across his cheek as shapes
  if (t >= 78.3 && t < 79.1) { const tc = SB_T3(t), k = Math.floor((t - 78.3) / 0.2), rot = [0, 0.4, 0.9, 1.3][Math.min(3, k)];
    sbGrad(ctx, 0, 0, 1000, 1230, [[0, '#ffd8c8'], [0.6, '#f4c8b8'], [1, '#e8a8a8']]); sbGlow(ctx, 760, 160, 400, 0.8, '#fff0c0');
    sbFace(ctx, 420, 1040, 1.05, { gaze: [0.3, -1], iris: 1.1, brow: -0.6, mouth: 'o', reflect: (c, r) => { c.fillStyle = 'rgba(220,245,255,0.8)'; c.beginPath(); c.moveTo(-r * 0.3, -r * 0.2); c.lineTo(0, -r * 0.6); c.lineTo(r * 0.3, -r * 0.2); c.lineTo(0, r * 0.3); c.closePath(); c.fill(); } });
    sbRays(ctx, 520, 470, 820, 1, 1.9 + rot * 0.2);
    for (const [x0, y0, x1, y1] of [[640, 1230, 560, 520], [380, 1230, 470, 530]]) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#6a3a2a'; ctx.lineWidth = 92; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.strokeStyle = C.skin; ctx.lineWidth = 84; ctx.stroke(); ctx.restore(); }
    sbGem(ctx, 515, 470, 92, { rot, glow: 0.8 }); sbGlint(ctx, 470, 420, 70, ((t - 78.3) * 2.5) % 1); }
}
SB_SHOTS.push({ a: 68.46, b: 79.9, free: true, cam: sbKeys([[68.46, { x: 760, y: -1150, zoom: 0.6 }], [69.7, { x: 680, y: 250, zoom: 0.6 }], [70.6, { x: 600, y: 300, zoom: 0.62 }], [71.92, { x: 500, y: 560, zoom: 0.8 }], [75.7, { x: 520, y: 560, zoom: 0.8 }], [78.3, { x: 820, y: 420, zoom: 0.62 }], [79.9, { x: 830, y: 420, zoom: 0.62 }]]), world: sbValWorld, over: sbValOver });

// ---------- S13 + S14 (79.9 - 92.48): the walls, the snakes, the five stones, the failed climb, thinking ----------
const SB2_SNAKE_A = [[250, 860], [262, 845], [300, 880], [380, 905], [460, 915], [540, 905]];   // out of the crevice along the floor
const SB2_COIL = sbCoilPath(220, 612, 100, 2.4, 0.6);
function sbSnakes(ctx, t) { const tc = SB_T2(t);
  // B: asleep in a coil on the low ledge (always)
  sbSnake(ctx, SB2_COIL, t, { pal: 1, w: 52, wave: 4, lid: 1, dir: 1, headRot: 0.2 });
  if (t > 118) return;
  // C: a tail sliding out of sight between the right boulders (84.96 - 86.2)
  if (t > 84.96 && t < 86.4) { const u = K.clamp((t - 84.96) / 1.3); sbSnake(ctx, [[1000 + 200 * u, 900], [1080 + 200 * u, 895], [1160 + 140 * u, 890], [1200, 888]].map((p) => [Math.min(p[0], 1200), p[1]]), t, { pal: 2, w: 46, wave: 10, out: 1 - u, lid: 1 }); }
  // A: two eyes in the crevice (83.78), pours out (84.96), yawns and rests its chin on a warm rock (85.74), sleeps; one eye opens (90.1)
  if (t > 83.78 && t < 84.96) { const op = K.clamp((t - 83.78) / 0.3); for (const dx of [-12, 12]) { ctx.save(); ctx.fillStyle = '#ffe24a'; ctx.beginPath(); ctx.ellipse(266 + dx, 840, 9, 9 * op * (1 - 0.9 * pulse(t, 84.4, 0.25)), 0, 0, 7); ctx.fill(); ctx.fillStyle = '#1a1a10'; ctx.fillRect(264 + dx, 834, 4, 12 * op); ctx.restore(); } }
  if (t >= 84.96) { const out = K.ease.out(K.clamp((t - 84.96) / 0.8)), yawn = Math.sin(Math.PI * K.clamp((t - 85.74) / 0.7)), rest = K.clamp((t - 86.3) / 0.4);
    const lid = t > 90.1 && t < 90.6 ? 0.45 : K.lerp(0.4, 0.95, K.clamp((t - 85.9) / 0.6)), path = SB2_SNAKE_A.map(([x, y], i) => [x, y - (i === 5 ? 14 * rest : 0)]);
    sbSnake(ctx, path, t, { pal: 0, w: 66, wave: 12 * (1 - rest * 0.6), out, lid, mouth: 0.6 * yawn, tongue: t < 85.7 && Math.floor(SB_T3(t) * 8) % 3 === 0 ? 1 : 0, dir: 1, gaze: t > 90.1 ? [1, -0.2] : [1, 0] }); }
}
// a warm flat rock for the snake's chin
function sbChinRock(ctx) { sbStone(ctx, 560, 912, 40, '#e0b0a8', '#a87a80'); }
const SB2_S13X = (t) => kfn(t, [[86.1, 620], [86.5, 700], [88.0, 760], [89.24, 760], [89.6, 975], [90.9, 975], [91.2, 870]], 'inOut');
function sbWallSinP(t) { const tc = SB_T2(t), x = SB2_S13X(t), P = sbLive(t, 11, { x: t < 86.1 ? 620 : x, y: 900, dir: 1, mouth: 'closed', gaze: [0.2, -1], wind: 0 }, [80.7, 82.3, 83.1, 83.4, 83.7]);
  if (t < 80.5) { const dn = sbF(t, [[79.9, 0], [80.5, 1]]); P.aL = [K.lerp(2.9, 0.4, dn), K.lerp(3.0, 0.4, dn)]; P.aR = [K.lerp(2.9, 0.4, dn), K.lerp(3.0, 0.4, dn)]; P.mouth = dn > 0.5 ? 'closed' : 'open'; P.brow = 0.2 * dn; }
  else if (t < 83.02) { P.gaze = t < 82.3 ? [0.4, -1] : [-0.5, -1]; P.tip -= 0.05; P.look = P.gaze[0] * 0.5; }
  else if (t < 85.3) { const tf = turnFlip(t, [[0, 1], [83.1, -1], [83.45, 1], [83.8, -1], [84.2, 1]], 0.3); P.dir = tf.dir; P.handR = [40, -150 - 10 * Math.min(4, Math.floor((t - 83.02) / 0.3))]; P.drop = 4 * K.clamp((t - 83.6) / 0.6); P.brow = 0.4; P.gaze = [1, 0]; if (t > 84.5) { delete P.handR; P.gaze = [-1, 0.2]; } }
  else if (t < 86.1) { P.dir = -1; P.ph = 1.2; P.amp = 1; P.x = 620; P.tip += tremble(t, 0.01, 9); P.gaze = [-1 + 0.1 * Math.sin(SB_T3(t) * 9), 0.3]; P.brow = -0.7; P.mouth = 'o'; P.handL = [-30, -120]; P.handR = [30, -120]; }
  else if (t < 86.5) { Object.assign(P, walk((u) => kfn(u, [[86.1, 620], [86.5, 700]]), tc, { stride: 14 })); P.dir = -1; P.handR = PERSON_HANDS.hush.R; P.gaze = [-1, 0.2]; }
  else if (t < 88.04) { const k = Math.floor((t - 86.5) / 0.3), u = ((t - 86.5) / 0.3) % 1, bend = Math.sin(Math.PI * u); P.kneel = 0.5 * bend; P.tip += 0.15 * bend; if (k % 2) P.handRW = [x + 40, 900 - 40 * (1 - bend) - 30]; else P.handLW = [x - 10, 900 - 40 * (1 - bend) - 30]; P.gaze = u > 0.7 ? [-1, 0.2] : [0.4, 1]; P.mouth = 'closed'; }
  else if (t < 88.44) { const lift = Math.sin(Math.PI * K.clamp((t - 88.04) / 0.4)); P.handLW = [x + 34, 860 - 60 * lift]; P.handRW = [x + 76, 860 - 60 * lift]; P.sq *= 1 - 0.05 * lift; P.gaze = t < 88.25 ? [1, 0.3] : [-1, 0.2]; P.mouth = 'o'; }
  else if (t < 89.24) { P.handL = [-22, -90]; P.handR = [20, -88 + (t > 88.9 ? 10 * Math.abs(osc(tc, 0.2)) : 0)]; P.gaze = [0.2, 0.8]; P.tongue = t < 88.9; }
  else if (t < 89.6) { Object.assign(P, walk(SB2_S13X, tc, { stride: 26 })); P.gaze = [1, -0.6]; }
  else if (t < 90.1) { const cl = sbF(t, [[89.6, 0], [89.8, 1], [89.9, 0.8], [90.1, 0]]); P.handLW = [960, 650 - 30 * cl]; P.handRW = [1000, 620 - 40 * cl]; P.y = 900 - 50 * cl; P.dir = 1; P.gaze = [0.3, -1]; if (t > 89.9) { P.sit = 1; P.seat = 'floor'; P.sq *= landSquash(tc, 90.1, 0.14); } if (t > 89.85 && t < 90.2) dustBurst(ctx0(), 975, 905, t - 89.85, 5, 5, 12, 60, 0.4, 4); }
  else if (t < 90.92) { P.sit = 1; P.seat = 'floor'; P.dir = 1; P.gaze = t < 90.32 ? [-1, 0] : [0.3, -1]; P.look = P.gaze[0] * 0.8; if (t > 90.32) P.handR = PERSON_HANDS.shield.R; }
  else { if (t < 91.2) Object.assign(P, walk(SB2_S13X, tc, { stride: 26 })); else { P.sit = 1; P.seat = 'bench'; P.y = 862; P.x = 870; P.handR = PERSON_HANDS.chin.R; P.handL = [-30, -70]; P.gaze = [0.3 + 0.4 * Math.sin(SB_T3(t) * 2), -0.2]; P.wind = 0; P.tip -= 0.02 * Math.abs(osc(tc, 0.5)); } P.dir = -1; if (t > 92.2) P.gaze = [-0.6, 0.6]; }
  return P; }
let SB2_CTX = null; const ctx0 = () => SB2_CTX;
function sbWallWorld(ctx, t, cam, S) {
  SB2_CTX = ctx; const tc = SB_T2(t);
  sbDiamondValley(ctx, t, cam, { sky: (c) => { const u = (t - 79.9) / 6; c.save(); c.globalAlpha = 0.9; sbCloud(c, 200 + 500 * u, -1560, 420, 60, 'rgba(255,255,255,0.9)', 'rgba(200,180,232,0.6)', 8); c.restore(); } });
  // two small eagles circling at the very top; a pebble falls a long time
  for (let i = 0; i < 2; i++) { const a = tc * 0.9 + i * Math.PI; bird(ctx, { kind: 'hawk', pal: 1, fly: true, flap: Math.sin(tc * 9 + i), x: 700 + 260 * Math.cos(a), y: -1600 + 60 * Math.sin(a), s: 0.5, dir: Math.sin(a) > 0 ? -1 : 1 }); }
  if (t > 80.9 && t < 83.0) { const u = (t - 80.9) / 2.1, y = K.lerp(-1380, 900, u * u); sbBlob(ctx, 1180 - 40 * u, y, 8, 7, '#c8a0b8', '#8a6a88', { lw: 1.5, off: 2 }); }
  sbStickNest(ctx, 'back'); for (let i = 0; i < 2; i++) sbEaglet(ctx, 1200 + i * 60, -1090, { s: 0.8, bob: 6 * Math.abs(Math.sin(tc * 3 + i * 1.7)), beak: Math.sin(tc * 5 + i) > 0.6 ? 1 : 0 }); sbStickNest(ctx, 'front');
  sbChinRock(ctx); sbSnakes(ctx, t);
  // the melon-sized stone, the five small ones he takes
  if (t < 88.6) sbGem(ctx, 820, 892, 30, { rot: 0.2, glow: 0.3 + 0.2 * Math.sin(t * 3) });
  if (t > 91.9) { const r = 30 + 300 * K.clamp((t - 91.9) / 0.6); ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = '#3a2a5a'; ctx.beginPath(); ctx.ellipse(700, 915, r, r * 0.3, 0, 0, 7); ctx.fill(); ctx.restore(); }
  const P = sbWallSinP(t), Q = sbSin2(ctx, P);
  if (t > 88.04 && t < 88.44) { const h = sbHandW(Q, 1); sbGem(ctx, h[0] - 20, h[1] + 20, 30, { rot: 0.2, glow: 0.4 }); }
  if (t > 88.44) sbPouch(ctx, sbPt(Q, [-26, -86], false)[0], sbPt(Q, [-26, -86], false)[1], 1, t);
  if (t > 85.3 && t < 86.1) sbSweat(ctx, Q, t);
}
function sbWallOver(ctx, t, cam, S) {
  if (t > 85.0 && t < 86.4) { const p = sbP(400, 800, cam); sbTag(ctx, S, 'SSSS...', p[0] + 20, p[1] - 160, t, 85.0, 86.2, { size: 44 }); }
  if (t > 86.5 && t < 88.3) { const n = Math.min(5, Math.floor((t - 86.5) / 0.3) + 1); S.counter(ctx, n, 840, 200, K.clamp((t - 86.5) / 0.3), { size: 110 }); }
}
SB_SHOTS.push({ a: 79.9, b: 92.48, free: true, cam: sbKeys([[79.9, { x: 830, y: 420, zoom: 0.62 }], [80.5, { x: 900, y: 250, zoom: 0.75 }], [81.6, { x: 1050, y: -1100, zoom: 0.75 }], [82.28, { x: 1050, y: -1100, zoom: 0.75 }], [83.3, { x: 400, y: 300, zoom: 0.75 }], [83.8, { x: 665, y: 387, zoom: 0.75 }], [86.5, { x: 665, y: 387, zoom: 0.75 }], [87.0, { x: 720, y: 430, zoom: 0.85 }], [92.48, { x: 900, y: 430, zoom: 0.85 }]]), world: sbWallWorld, over: sbWallOver });
