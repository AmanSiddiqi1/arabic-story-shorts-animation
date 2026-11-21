// ===== SIND-02 shots S5-S9 (25.94 - 64.98 s): the wood and the dome, the egg, THE ROC comes home, the cloth on the ankle, take-off =====

// ---------- S5 (25.94 - 35.85): resolve, through the wood, up the lookout tree, the white dome, the silent feather ----------
const SB2_HOPS5 = [[26.6, 0.18, 1480, 1528, 30, 890], [26.82, 0.18, 1528, 1598, 30, 890], [27.04, 0.18, 1598, 1665, 30, 900]];
const SB2_RUN5 = (t) => kfn(t, [[27.22, 1665], [27.9, 2050]], 'in');
const SB2_CLIMB = (t) => t < 34.9 ? sbF(t, [[27.9, 0], [28.75, 1]]) : sbF(t, [[34.9, 1], [35.55, 0]]);
const SB2_STILL = (t) => K.clamp((t - 33.18) / 0.6) * (1 - K.clamp((t - 34.6) / 0.4));   // the island goes quiet
function sbS5World(ctx, t, cam, S) {
  const tc = SB_T2(t), dome = t < 30.2 ? 360 : K.lerp(360, 10, K.ease.out(K.clamp((t - 30.2) / 0.7)));
  sbWoodedIsland(ctx, 'gold', t, cam, { dome, domeGlint: (t - 30.76) / 0.7, sun: (c) => sbSun(c, 1700, 200, 50, '#fff0c0', '#ffc070', 0.8) });
  // birds: two parrots cross over (27.46), gone by the silence
  for (let i = 0; i < 2; i++) { const u = (t - 27.3 - i * 0.25) / 1.8; if (u > 0 && u < 1) bird(ctx, { kind: i ? 'y' : 'r', fly: true, flap: Math.sin(tc * 20 + i * 2), x: 2500 - 900 * u, y: 380 - 60 * Math.sin(Math.PI * u) + i * 40, s: 0.4, dir: -1 }); }
  sbLookout(ctx, t, 'gold', 'back');
  sbS5Monkey(ctx, t);
  sbS5Sin(ctx, t, S);
  if (t > 33.9) { const F = sbFeatherFall(t, 33.9, 34.75, [2470, 120], [2330, 446], 70), done = t >= 34.75; sbFeather(ctx, F.x, F.y, { rot: done ? 1.45 : F.rot, curl: done ? 0.2 : 0.4 * Math.sin(t * 6) }); }
  sbLookout(ctx, t * (1 - 0.95 * SB2_STILL(t)), 'gold', 'front');
}
function sbS5Monkey(ctx, t) { const u = (t - 27.3) / 1.6; if (u < 0 || u > 1) return; const tc = SB_T2(t); monkey(ctx, { x: 1700 + 700 * u, y: 470 + 70 * Math.sin(u * Math.PI * 3), s: 0.5, dir: 1, ph: tc * 10, aL: [2.8, 2.9], hold: 'fig', mouth: 'smile', rot: 0.3 * Math.sin(u * Math.PI * 3) }); }
function sbS5Sin(ctx, t, S) { const tc = SB_T2(t), P = sbLive(t, 11, { x: 1480, y: 900, dir: 1, gaze: [1, -0.1], mouth: 'closed', wind: -0.2 }, [26.4, 27.85, 29.2, 30.15, 34.9]);
  if (t < 26.6) { const pull = sbF(t, [[25.94, 0], [26.15, 1], [26.4, 0.4]]); P.sq *= 1 + 0.04 * pull; P.handL = [-24, -92 + 6 * pull]; P.handR = [24 + 10 * pull, -90]; if (t > 26.3 && t < 26.5) P.handR = [18, -168]; P.dir = t < 26.42 ? -1 : 1; P.brow = 0.2; }
  else if (t < 27.22) { let lift = 0, x = 1480, gy = 900; for (const [a, d, x0, x1, h, y1] of SB2_HOPS5) if (t >= a) { const [hx, l] = hop(t, a, d, x0, x1, h); x = hx; lift = l; gy = t < a + d ? K.lerp(900, y1, (t - a) / d) : y1; }
    groundShadow(ctx, x, gy + 2, 60, lift, { flat: true }); P.x = x; P.y = gy - lift; P.aL = [1.0, 1.2]; P.aR = [1.0, 1.2]; P.sq *= landSquash(tc, 26.78, 0.1) * landSquash(tc, 27.0, 0.1) * landSquash(tc, 27.22, 0.1); P.sashA = lagged((u) => u, tc, 0.1, 4); }
  else if (t < 27.9) { Object.assign(P, walk(SB2_RUN5, tc, { stride: 34 })); P.tip += 0.1; P.aL = [1.1 + 0.7 * Math.sin(P.ph), 1.3]; P.aR = [1.1 - 0.7 * Math.sin(P.ph), 1.3]; P.mouth = 'closed'; }
  else { // up the leaning trunk like a gangplank, arms out see-sawing; at the fork, branch in the left hand
    const u = SB2_CLIMB(t), p = sbLookPt(u), stepPh = u * 14; P.x = p[0]; P.y = p[1]; P.ph = stepPh; P.amp = t < 28.75 || (t > 34.9 && t < 35.55) ? 0.8 : 0;
    P.aL = [1.6 + 0.4 * Math.sin(stepPh), 1.7]; P.aR = [1.6 - 0.4 * Math.sin(stepPh), 1.7]; P.tip += (t > 28.1 && t < 28.4 ? 0.1 * Math.sin(Math.PI * (t - 28.1) / 0.3) : 0);
    if (t >= 28.75 && t < 34.9) { delete P.aL; delete P.aR; P.handLW = [2310 + 4 * osc(tc, 3), 352]; P.gaze = [1, -0.3];
      if (t > 29.2) { P.handR = PERSON_HANDS.shield.R; P.gaze = gazePlan(SB_T3(t), [[29.2, [-1, -0.3]], [29.6, [0, -0.3]], [29.95, [1, -0.4]]], 0.18); P.look = P.gaze[0]; }
      if (t > 30.2) { P.gaze = [1, -0.6]; P.look = 0.8; P.brow = -0.4; }
      if (t > 30.8) { P.mouth = 'o'; P.handR = [30, -170]; }
      if (t > 32.46) { const n = Math.min(3, Math.floor((t - 32.6) / 0.2) + 1); P.tip += 0.1; P.handR = [90, -150 - 26 * n]; P.brow = -0.3 - 0.15 * n; P.mouth = 'o'; }
      if (t > 33.18) { P.tip += 0.0; P.gaze = [1 + 0.1 * Math.sin(SB_T3(t) * 7), -0.5]; P.handR = [30, -120]; P.mouth = 'closed'; } }
    if (t >= 34.9) { P.sit = 0.6; P.seat = 'floor'; P.tip -= 0.3; P.gaze = [1, 0.3]; if (t < 35.55) dustBurst(ctx, P.x + 40, P.y + 10, (t - 34.95) % 0.3, 4, 4, 9, 26, 0.3, 5); }
    if (t >= 35.55) { delete P.sit; P.tip = 0; Object.assign(P, walk((q) => kfn(q, [[35.55, 2050], [36.0, 2160]]), tc, { stride: 28 })); P.y = 900; } }
  sbSin2(ctx, P);
}
function sbS5Over(ctx, t, cam, S) { if (t > 31.62 && t < 33.4) { const d = sbP(2820, 140, cam); sbTag(ctx, S, 'A WHITE DOME?', d[0] - 250, d[1] - 40, t, 31.7, 33.2, { size: 46 }); if (t < 32.6) S.arrow(ctx, [d[0] - 150, d[1] - 10], [d[0] - 60, d[1] + 40], K.clamp((t - 31.8) / 0.4)); } }
SB_SHOTS.push({ a: 25.94, b: 35.85, free: true, cam: sbKeys([[25.94, { x: 1450, y: 615, zoom: 1 }], [26.6, { x: 1480, y: 615, zoom: 1 }], [28.9, { x: 2520, y: 615, zoom: 1 }], [29.2, { x: 2600, y: 615, zoom: 1 }], [30.8, { x: 2600, y: 375, zoom: 1 }], [35.85, { x: 2640, y: 375, zoom: 1 }]]), world: sbS5World, over: sbS5Over });

// ---------- S6 + S7 + S8 + S9 (35.85 - 64.98): the nest clearing ----------
const SB2_EGG = (t) => ({ wobble: 0.006 * Math.sin((t - 39.54) * 18) * Math.exp(-Math.max(0, t - 39.54) * 3) * (t > 39.54 ? 1 : 0) + (t > 50.08 && t < 50.6 ? 0.008 * Math.sin((t - 50.08) * 12) : 0) });
const SB2_LOG = { x: 400, y: 900, L: 230, r: 44 };   // the log he climbs over (36.68) and hides behind (48.2)
function sbHideLog(ctx) { const { x, y, L, r } = SB2_LOG; celShade(ctx, [[x - L / 2, y - 2 * r], [x + L / 2, y - 2 * r + 6], [x + L / 2, y + 4], [x - L / 2, y]], '#a8784a', '#7a4a2a', { light: [0, -1], off: r * 0.6, lw: 3.5, line: '#3a1e10' });
  celShade(ctx, ell(x + L / 2, y - r + 3, r * 0.42, r, 16), '#e8c890', '#b89060', { light: [-1, -1], off: 6, lw: 3 }); ctx.strokeStyle = '#a87a4a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x + L / 2, y - r + 3, r * 0.22, r * 0.55, 0, 0, 7); ctx.stroke(); }
// the roc's states over the nest (world: egg 1000, ground 900; faces left, dir -1)
const SB2_ROCX = (t) => t < 48.94 ? K.lerp(1750, 1250, K.ease.out(K.clamp((t - 47.96) / 0.98))) : kfn(t, [[49.6, 1250], [49.85, 1130], [49.95, 1130], [50.15, 1000]], 'inOut');
function sbRocNestP(t) {
  const tc = SB_T2(t), P = { x: SB2_ROCX(t), y: 900, s: 1, dir: -1, t, hipN: 300, sq: breathe(tc, 5, 0.012) * (1 + 0.02 * Math.sin(t * 2 * Math.PI / 3.2)), gaze: [-0.5, 0.6], feet: { n: [380, 0], f: [40, 0] } };
  if (t < 48.94) { const u = K.clamp((t - 47.96) / 0.98), f = sbRocFlap(t, 0.48, 0.1); P.y = 900 - 1500 * Math.pow(1 - u, 2); P.spread = 1; P.flap = 0.5 + 0.5 * f.flap; P.flapLag = 0.5 + 0.5 * f.flapLag; P.reach = 1; P.feet = { n: [440, 60], f: [100, 60] }; P.rot = -0.12 * (1 - u); P.wind = 1; P.tailUp = -0.3; return P; }
  P.sq *= impactSquash(t, 48.94, 0.8); P.spread = Math.max(0, 1 - K.clamp((t - 49.1) / 0.4)); P.flap = 0.6;
  if (t < 50.08) { const st = t < 49.85 ? 0 : 1, lift = 60 * pulse(t, 49.6, 0.25) + 60 * pulse(t, 49.88, 0.25); P.feet = { n: [380 + (st ? 0 : 120 * K.clamp((t - 49.6) / 0.25)), st ? 0 : 60 * pulse(t, 49.6, 0.25)], f: [40, st ? 60 * pulse(t, 49.88, 0.25) : 0] }; P.feet.n[0] = 380; P.rot = 0.03 * Math.sin((t - 49.6) * 8) * (t > 49.6 ? 1 : 0); P.neck = -0.4; P.headTurn = 0.3 * K.clamp((t - 49.6) / 0.3); P.gaze = [-0.2, 1]; void lift; }
  else { const sit = sbF(t, [[50.08, 0], [50.7, 1]]); P.sit = sit; P.neck = -0.6 + 0.5 * sit; P.headTurn = t < 50.5 ? 0.5 : 0.15 * idleSway(tc, 6, 1, 4); P.rot = 0.025 * Math.sin((t - 50.3) * 9) * pulse(t, 50.3, 0.6);
    const sp = sbF(t, [[50.68, 0], [51.4, 1], [52.6, 1], [52.85, 0.66], [53.05, 0.66], [53.25, 0.33], [53.4, 0.33], [53.6, 0]]); P.spread = sp; P.nearA = -0.55; P.farA = -2.65; P.flapLag = 0.5;
    P.shake = pulse(t, 53.4, 0.4); P.lid = t > 53.3 ? Math.min(1, Math.floor((SB_T3(t) - 53.3) * 8) / 5) : sbLid(t, 5); P.gaze = [-0.3, 0.5]; }
  return P;
}
// Sinbad at the nest: in through the trees, over the log, up at the curve, knock, ear, thump, AN EGG!, the feather, THE ROC; wind; dive
const SB2_N6X = (t) => kfn(t, [[35.85, 250], [36.6, 340], [36.68, 340], [37.3, 470], [38.44, 470], [38.75, 560], [39.54, 560], [39.75, 500], [40.35, 500], [40.85, 470]], 'inOut');
function sbNestSinP(t) { const tc = SB_T2(t), x = SB2_N6X(t), P = sbLive(t, 11, { x, y: 900, dir: 1, mouth: 'closed', gaze: [1, -0.4], wind: -0.2 }, [36.6, 38.4, 41.4, 41.75, 42.1]);
  if (t < 36.6) { Object.assign(P, walk(SB2_N6X, tc, { stride: 26 })); P.tip -= 0.08 * K.clamp((t - 36.0) / 0.6); P.gaze = [1, -0.4 - 0.5 * K.clamp((t - 36) / 0.6)]; P.mouth = 'o'; }
  else if (t < 37.3) { const u = (t - 36.68) / 0.62; P.handLW = [400, 818]; P.handRW = [430, 814]; P.y = 900 - 70 * Math.sin(Math.PI * K.clamp(u)); P.tip = 0.15; P.sq *= landSquash(tc, 37.3, 0.12); P.gaze = [0.6, 0.6]; P.lid = Math.max(P.lid, 0.2); }
  else if (t < 38.44) { P.gaze = [0.2, -1]; P.tip -= 0.08 * K.clamp((t - 37.3) / 0.4); P.mouth = 'o'; if (t > 37.78) { P.handR = PERSON_HANDS.headHold.R; P.tilt = -0.12; } }
  else if (t < 39.54) { if (t < 38.75) Object.assign(P, walk(SB2_N6X, tc, { stride: 26 })); P.handRW = [x + 60 + (t > 38.75 && t < 38.95 ? 10 * Math.abs(osc(SB_T3(t), 0.14)) : 0), 770]; P.gaze = [1, 0];
    if (t > 39.0) { P.tip += 0.12; P.tilt = 0.25; P.lid = 0.2; P.gaze = [-1, 0]; P.handRW = [x + 60, 760]; P.mouth = 'closed'; } }
  else if (t < 40.35) { const [, l] = hop(t, 39.54, 0.21, 0, 0, 30); P.y = 900 - l; P.sq *= landSquash(tc, 39.75, 0.12); P.gaze = [1, -0.6]; P.brow = -0.7; P.mouth = 'o';
    if (t > 40.12) { const op = sbF(t, [[40.12, 0], [40.3, 1]]); P.aL = [K.lerp(0.4, 1.6, op), 1.6]; P.aR = [K.lerp(0.4, 1.6, op), 1.6]; } }
  else if (t < 44.06) { if (t < 40.85) { Object.assign(P, walk(SB2_N6X, tc, { stride: 26 })); P.dir = -1; P.gaze = [-0.8, 0.6]; }
    else { P.dir = 1; P.handR = [36, -96 - 20 * sbF(t, [[40.85, 0], [41.1, 1]]) + 30 * sbF(t, [[43.4, 0], [44.0, 1]])]; P.gaze = gazePlan(SB_T3(t), [[40.85, [0, -1]], [41.1, [0.2, 1]], [41.4, [0.4, -1]], [41.75, [-1, 0.4]], [42.1, [0.6, -1]], [42.4, [1, -0.6]]], 0.14); P.brow = -0.3 - 0.2 * (t > 41.75) - 0.2 * (t > 42.1); P.mouth = 'closed';
      if (t > 43.26) { P.sq *= 1 - 0.04 * pulse(tc, 43.3, 0.25); P.brow = -0.8; P.mouth = 'o'; P.gaze = [0.4, -0.8]; } } }
  else if (t < 48.2) { P.x = 470; P.dir = 1; const blow = K.clamp((t - 44.06) / 0.4); P.wind = K.lerp(-0.2, -1, blow); P.lid = Math.max(P.lid, 0.4 * blow); P.handR = [36, -96]; if (t > 45.62) { P.handR = PERSON_HANDS.headHold.R; P.tip += 0.1; } P.gaze = t > 46.3 ? [0.6, -1] : [1, -0.3]; if (t > 47.0) P.mouth = 'o'; }
  else { const [hx, l] = hop(t, 48.2, 0.32, 470, 340, 50); P.x = hx; P.y = 900 - l; P.dir = -1; P.tip = 0.4 * K.clamp((t - 48.2) / 0.3); if (t > 48.52) { P.dir = 1; P.kneel = 1; P.tip = 0.05; P.sq *= landSquash(tc, 48.52, 0.18); P.gaze = [1, -0.5]; P.mouth = 'o'; P.brow = -0.7; P.handLW = [370, 820]; P.handRW = [420, 818]; P.wind = -0.8; } }
  return P;
}
function sbNestWorld(ctx, t, cam, S) {
  const tc = SB_T2(t), rocIn = t >= 47.96, R = rocIn ? sbRocNestP(t) : null;
  sbNestSky(ctx, cam, t);
  // the sun (covered by a wing at 47.28) and two real birds that flee
  sbSun(ctx, 1250, -60, 70, '#fffbe0', '#ffe0a0', t > 47.2 && t < 47.95 ? 0.25 : 1);
  if (t > 47.2 && t < 47.95) { const u = (t - 47.2) / 0.75; sbRoc(ctx, { x: K.lerp(2100, 900, u), y: 380, s: 0.6, dir: -1, spread: 1, ...sbRocFlap(t, 0.7), tuck: 1, sil: '#a88ad8', t }); sbGlow(ctx, 1250, -60, 260, 0.6, '#fff0c0'); }
  for (let i = 0; i < 2; i++) { const u = (t - 47.3 - i * 0.12) / 0.9; if (u > 0 && u < 1) bird(ctx, { kind: 'dove', fly: true, flap: Math.sin(tc * 26 + i), x: 1100 - 900 * u, y: 120 + i * 70 - 60 * u, s: 0.4, dir: -1 }); }
  ctx.drawImage(sbNestPlate(), -500, 360);
  // the wing-shaped shadow plate (46.3 - 50.7): a cooler repaint of the set seen through a moving wing mask (the cast keeps its colours)
  const shK = K.clamp((t - 46.3) / 0.3) * (1 - K.clamp((t - 50.4) / 0.3)), shX = K.lerp(2600, 600, K.ease.out(K.clamp((t - 46.3) / 1.6)));
  if (shK > 0) { ctx.save(); ctx.globalAlpha = 0.55 * shK; ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#9a86d8'; ctx.beginPath(); ctx.moveTo(shX - 1500, 1600); ctx.bezierCurveTo(shX - 1300, 700, shX - 600, 500, shX, 560); ctx.bezierCurveTo(shX + 500, 450, shX + 1200, 300, shX + 2400, 600); ctx.lineTo(shX + 2400, 1600); ctx.closePath(); ctx.fill(); ctx.restore(); }
  // the wind: grass and leaves stream across (44.06 - 47.9)
  if (t > 44.06 && t < 49.6) { const k = Math.min(1, (t - 44.06) / 0.4) * (t > 48.94 ? Math.max(0, 1 - (t - 48.94) / 0.6) : 1); ctx.save(); ctx.globalAlpha = 0.9 * k; sbSpeed(ctx, [cam.x - 1300, 300, 2600, 700], t, { dir: 1, speed: 1800, n: 20, alpha: 0.35, col: '#ffffff', col2: '#d8ffd0' });
    const Rl = K.rng(3); for (let i = 0; i < 14; i++) { const ph = Rl(), x = 1800 - (((t * 900 + ph * 2600) % 2600)), y = 500 + Rl() * 450 + 30 * Math.sin(t * 6 + i); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 8 + i); celShade(ctx, [[-12, 0], [0, -6], [12, 0], [0, 6]], ['#5ac86a', '#9ae08a', '#ffcf3a'][i % 3], '#2f7a44', { light: [0, -1], off: 2, lw: 1.5 }); ctx.restore(); } ctx.restore(); }
  sbNestLogs(ctx, 'back');
  if (R) sbRoc(ctx, R, 'back');
  const E = SB2_EGG(t); sbRocEgg(ctx, SB_NEST.egg, 900, { wobble: E.wobble, glint: (t - 37.9) / 0.8 });
  if (t > 39.54 && t < 40.2) for (let i = 0; i < 5; i++) { const u = (t - 39.54 - i * 0.05) / 0.5; if (u > 0 && u < 1) sbBlob(ctx, 560 + i * 200, 820 + 80 * u * u, 4, 4, '#c8a070', '#8a6a40', { lw: 1, off: 1 }); }
  // the feather: on the ground in the ring (S6), lifted (40.76), lowered (43.3), dropped in the dive (48.2)
  const sinP = t < 54.98 ? sbNestSinP(t) : null;
  const behind = t >= 48.2; if (!behind) sbHideLog(ctx);
  if (t < 40.85 || t >= 48.2) { const lie = t >= 48.2 ? [500, 892] : [470, 896]; if (t < 48.2 || t > 48.5) sbFeather(ctx, lie[0] - 130, lie[1], { rot: 1.57, curl: 0.1 }); }
  if (sinP) { if (t > 46.3 && t < 50.7) castFinish(ctx, sinP.x, sinP.y, 160, 260, (c) => sbNestSinDraw(c, sinP, t), { rim: '#7ad9ff', light: [1, -1] }); else sbNestSinDraw(ctx, sinP, t); }
  if (behind) sbHideLog(ctx);
  if (R) { sbRoc(ctx, R, 'front'); if (t > 48.94 && t < 50.2) { dustBurst(ctx, R.x - 300, 905, t - 48.94, 9, 14, 40, 340, 1.1, 2); dustBurst(ctx, R.x + 260, 905, t - 48.94, 9, 14, 40, 300, 1.1, 7); } }
  sbNestLogs(ctx, 'front');
  if (t > 53.6 && t < 54.4) { const u = (t - 53.6) / 0.8; ctx.save(); ctx.globalAlpha = 0.5 * (1 - u); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#e8d8b8'; ctx.beginPath(); ctx.arc(700 - 300 * u - i * 40, 300 + i * 30, 30 + 40 * u, 0, 7); ctx.fill(); } ctx.restore(); }
  if (t > 51.66 && t < 53.2) sbBands(ctx, [-400, -900, 3000, 1500], t - 51.66, { cols: ['#ffffff', '#ffe8f8'], alpha: 0.28, speed: 1400, w: 220, n: 1, angle: -0.4 });
}
function sbNestSinDraw(c, P, t) { const Q = sbSin2(c, P);
  if (t > 40.85 && t < 48.2) { const h = sbHandW(Q, 1), low = K.clamp((t - 43.4) / 0.6); sbFeather(c, h[0], h[1] + 10, { rot: K.lerp(0.05, 1.2, low) + lagged((u) => 0.12 * Math.sin(u * 3), SB_T2(t), 0.1, 1), curl: 0.2 * Math.sin(SB_T2(t) * 2) }); }
  return Q; }
function sbNestOver(ctx, t, cam, S) {
  if (t > 38.6 && t < 39.4) { const p = sbP(660, 700, cam); sbTag(ctx, S, 'TOK TOK', p[0] + 40, p[1] - 160, t, 38.6, 39.2, { size: 44 }); }
  if (t > 40.12 && t < 41.6) { const p = sbP(800, 500, cam); sbTag(ctx, S, 'AN EGG!', p[0], p[1] - 120, t, 40.2, 41.4, { size: 50 }); S.arrow(ctx, [p[0] + 60, p[1] - 80], [p[0] + 130, p[1] + 40], K.clamp((t - 40.3) / 0.35)); }
  if (t > 42.16 && t < 44.0) { const h = sbP(470, 690, cam); thoughtCloud(ctx, 300, 330, 400, 280, t, { p: K.clamp((t - 42.16) / 0.5), tail: [h[0], h[1] - 20], fill: '#fff6ea', scale: 0.32, at: [500, 760], seed: 5,
    inside: (k) => { sbRoc(k, { x: 650, y: 1010, s: 0.42, dir: -1, t, sil: '#9a7ad8', spread: 0.3 }); sbSinbad(k, { x: 230, y: 1010, s: 0.5, t, gaze: [1, -1], aR: [2.6 + 0.3 * osc(SB_T2(t), 0.4), 2.9] }); } }); }
  if (t > 43.26 && t < 44.06) S.title(ctx, 'THE ROC', 300, 560, K.clamp((t - 43.26) / 0.5), { size: 70, align: 'center' });
  if (t > 48.94 && t < 49.6) S.emphasis(ctx, ...sbP(1250, 860, cam), 180, K.clamp((t - 48.94) / 0.66), { word: 'WHUMP!', rect: [0, 0, 1000, 1230] });
  if (t > 52.56 && t < 53.9) sbTag(ctx, S, 'WINGS LIKE CLOUDS', 560, 160, t, 52.6, 53.7, { size: 46 });
  if (t > 49.0 && t < 50.4) { const p = sbP(340, 760, cam); sbTag(ctx, S, 'SINBAD', p[0] - 10, p[1] - 150, t, 49.2, 50.2, { size: 38 }); S.arrow(ctx, [p[0] - 10, p[1] - 120], [p[0], p[1] - 30], K.clamp((t - 49.3) / 0.3)); }
}
SB_SHOTS.push({ a: 35.85, b: 44.06, free: true, cam: sbKeys([[35.85, { x: 830, y: 560, zoom: 0.9 }], [38.4, { x: 830, y: 560, zoom: 0.9 }], [40.1, { x: 930, y: 560, zoom: 0.9 }], [41.0, { x: 830, y: 560, zoom: 0.9 }], [44.06, { x: 820, y: 560, zoom: 0.9 }]]), world: sbNestWorld, over: sbNestOver });
SB_SHOTS.push({ a: 44.06, b: 54.98, free: true, cam: sbKeys([[44.06, { x: 820, y: 560, zoom: 0.9 }], [47.3, { x: 820, y: 560, zoom: 0.9 }], [47.9, { x: 860, y: 260, zoom: 0.9 }], [47.96, { x: 860, y: 260, zoom: 0.9 }], [49.0, { x: 900, y: 79, zoom: 0.42 }], [54.98, { x: 930, y: 79, zoom: 0.42 }]]), world: sbNestWorld, over: sbNestOver });

// ---------- S8 (54.98 - 63.08): at the foot. The idea, the turban unwound, the bow on the ankle, EASY, BIG BIRD..., the eye ----------
const SB2_ANK = [620, 800];   // the tie point on the near shank
function sbRocSitP(t) { const tc = SB_T2(t); return { x: 1000, y: 900, s: 1, dir: -1, t, hipN: 300, sit: 1, lid: 1, neck: 0.1, headTurn: 0.05 * idleSway(tc, 6, 1, 4), sq: breathe(tc, 5, 0.012) * (1 + 0.025 * Math.sin(t * 2 * Math.PI / 3.4)), feet: { n: [380, 6 * pulse(t, 62.36, 0.3)], f: [40, 0] }, spread: 0 }; }
const SB2_S8X = (t) => kfn(t, [[56.6, 340], [57.3, 520], [59.16, 520], [59.4, 572], [60.0, 572], [60.25, 540], [62.8, 540]], 'inOut');
function sbS8SinP(t) { const tc = SB_T2(t), x = SB2_S8X(t), P = sbLive(t, 11, { x, y: 900, dir: 1, mouth: 'closed', gaze: [1, -0.5], wind: -0.1, cloth: 'none' }, [56.6, 58.3]);
  if (t < 56.6) { P.kneel = 1; P.x = 340; P.gaze = gazePlan(SB_T3(t), [[54.98, [1, 0.3]], [55.3, [0.4, -1]], [55.6, [1, 0.3]], [55.9, [0.5, -0.8]]], 0.12); P.brow = idleSway(tc, 8, 0.5, 1.4); P.handLW = [370, 820]; P.handRW = [420, 818]; }
  else if (t < 57.3) { Object.assign(P, walk(SB2_S8X, tc, { stride: 16 })); P.sq *= 1.02; P.tip -= 0.04; P.handR = t < 56.9 ? PERSON_HANDS.pointUp.R : [26, -140]; P.handL = [-26, -140]; P.mouth = 'smile'; }
  else if (t < 58.3) { const u = (t - 57.3) / 1.0, a = tc * 11; P.handL = [-30 + 26 * Math.cos(a), -250 + 16 * Math.sin(a)]; P.handR = [30 + 26 * Math.cos(a + Math.PI), -250 + 16 * Math.sin(a + Math.PI)]; P.gaze = [0, -1]; P.hairK = t < 57.5 ? 0 : settleTo(t, 57.5, 0.2, 1, 0.3, 0.3); }
  else if (t < 59.16) { const tug = Math.max(pulse(t, 58.55, 0.16), pulse(t, 58.85, 0.16)); P.handL = [-110 - 20 * tug, -150]; P.handR = [110 + 20 * tug, -150]; P.gaze = [0.4, 0]; P.tip -= 0.04 * tug; P.mouth = 'smile'; }
  else if (t < 60.0) { P.handLW = [598, 742]; P.handRW = [660, 748]; P.tip += 0.12; P.gaze = [0.6, -0.3]; P.lid = Math.max(P.lid, 0.4); P.tongue = true; }
  else if (t < 61.18) { const tie = osc(SB_T3(t), 0.3); P.handLW = [606, 790 + 6 * tie]; P.handRW = [640, 790 - 6 * tie]; P.tip += 0.08; P.tongue = true; P.gaze = [0.7, 0.4]; if (t > 60.7) { P.handLW = [x - 20, 815]; P.handRW = [x + 24, 812]; P.gaze = [0, 1]; } }
  else if (t < 62.36) { P.handRW = t < 61.6 ? [626, 802] : [650, 700 + 10 * Math.abs(osc(tc, 0.25))]; P.gaze = [1, -0.2]; P.mouth = 'smile'; P.handL = [-20, -100]; }
  else { P.handRW = [650, 700]; P.handL = [-20, -100]; P.tip += tremble(t, 0.012, 9); P.gaze = [1 + 0.15 * Math.sin(SB_T3(t) * 9), -0.7]; P.lid = 0; P.brow = -0.6; P.mouth = 'closed';
    if (t > 62.8) { P.sq *= 1 - 0.03 * pulse(tc, 62.8, 0.4); P.drop = 3; P.handRW = [x + 40, 760]; P.handL = [-30, -120]; P.gaze = [0.5, -0.4]; } }
  return P;
}
function sbS8World(ctx, t, cam, S) {
  const tc = SB_T2(t), R = sbRocSitP(t);
  sbNestSky(ctx, cam, t); ctx.drawImage(sbNestPlate(), -500, 360); sbNestLogs(ctx, 'back');
  sbRoc(ctx, R, 'back'); sbRocEgg(ctx, SB_NEST.egg, 900, {});
  const P = sbS8SinP(t);
  // the cloth behind the shank (back pass) while it goes round
  if (t > 59.16 && t < 60.0) sbCloth(ctx, [P.handLW, [620, 740], [640, 748]], { w: 13 });
  sbRoc(ctx, R, 'front');
  if (t < 57.3) sbHideLog(ctx);
  const Q = sbSin2(ctx, P), hL = sbHandW(Q, 0), hR = sbHandW(Q, 1), hd = sbPt(Q, [0, -10]), waist = sbPt(Q, [24, -96], false);
  if (t >= 57.3 && t < 58.3) { const u = (t - 57.3) / 1.0, turns = 4 * (1 - u), pts = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * turns * Math.PI * 2 + tc * 9, r = 38 * Q.s; pts.push([hd[0] + Math.cos(a) * r, hd[1] - 20 * Q.s - 10 * Math.sin(a) - i * 0.4]); }
    pts.push(hR); pts.push([hR[0] + 40, hR[1] + 40 + 60 * u]); sbCloth(ctx, pts, { w: 13, free: 3, t }); }
  else if (t >= 58.3 && t < 59.16) { const tug = Math.max(pulse(t, 58.55, 0.16), pulse(t, 58.85, 0.16)); sbCloth(ctx, sbSag(hL, hR, 80 * (1 - tug)), { w: 13 }); sbRibbon(ctx, hR[0], hR[1], 1.2, 50, 13, t, { amp: 6 }); sbRibbon(ctx, hL[0], hL[1], 1.9, 50, 13, t, { amp: 6, ph: 2 }); }
  else if (t >= 59.16 && t < 60.0) { sbCloth(ctx, [hR, [652, 760], [640, 770]], { w: 13 }); sbRibbon(ctx, hL[0], hL[1], 1.7, 40, 13, t, { amp: 5 }); }
  else if (t >= 60.0) { const bk = K.clamp((t - 60.0) / 0.5); sbCloth(ctx, [[600, 792], [640, 796], [604, 804]], { w: 13 }); sbBow(ctx, SB2_ANK[0], SB2_ANK[1], bk, t, 0);
    const end = t > 62.8 ? hR : waist; sbCloth(ctx, sbSag(SB2_ANK, end, 50), { w: 12 }); if (t > 60.6) { sbCloth(ctx, [[waist[0] - 40, waist[1] + 4], [waist[0], waist[1] + 8], [waist[0] + 8, waist[1]]], { w: 12 }); } }
  sbNestLogs(ctx, 'front');
}
function sbS8Over(ctx, t, cam, S) {
  if (t > 55.78 && t < 56.9) { const h = sbP(340, 680, cam); thoughtCloud(ctx, 360, 300, 440, 300, t, { p: K.clamp((t - 55.78) / 0.45), tail: [h[0], h[1] - 30], fill: '#fff6ea', scale: 0.3, at: [500, 700], seed: 7,
    inside: (k) => { k.fillStyle = '#a89ad8'; k.beginPath(); k.moveTo(-200, 1100); k.lineTo(150, 860); k.lineTo(400, 1000); k.lineTo(650, 840); k.lineTo(1000, 1020); k.lineTo(1200, 1100); k.closePath(); k.fill(); sbRocCarryIcon(k, t, 600, 560, 0.4); } }); }
  if (t > 61.3 && t < 62.4) { const p = sbP(540, 680, cam); sbSay(ctx, S, [[61.3, 'EASY, BIG BIRD...']], t, p[0] + 80, p[1] - 260, [p[0] + 10, p[1] - 70], { gone: 62.2, size: 44 }); }
  // the cut-in: the great eye half opens, rolls down, sees nothing, closes (lid on threes)
  sbInset(ctx, t, 62.36, 63.0, 720, 300, 220, (c, w) => { c.save(); c.scale(w / 1000, w / 1000); sbGrad(c, 0, 0, 1000, 1000, [[0, '#86c2f6'], [1, '#d2ecfa']]);
    const lv = [[62.36, 1], [62.45, 0.75], [62.55, 0.5], [62.75, 0.5], [62.85, 1]]; let lid = 1; for (const [tt, v] of lv) if (t >= tt) lid = v;
    sbRoc(c, { x: 1886, y: 3537, s: 3.2, dir: -1, t, lid, gaze: [0.2, 1], neck: 0.1, sit: 1 }, 'front'); c.restore(); });
}
SB_SHOTS.push({ a: 54.98, b: 63.08, free: true, cam: sbKeys([[54.98, { x: 640, y: 584, zoom: 1.25 }], [56.6, { x: 640, y: 584, zoom: 1.25 }], [57.3, { x: 720, y: 584, zoom: 1.25 }], [63.08, { x: 730, y: 584, zoom: 1.25 }]]), world: sbS8World, over: sbS8Over });

// ---------- S9 (63.08 - 64.98): the roc stands, shakes, crouches and takes off; the cloth snaps taut and lifts him ----------
function sbRocTakeP(t) { const tc = SB_T2(t), sit = 1 - sbF(t, [[63.08, 0], [63.55, 1]]), cr = sbF(t, [[64.1, 0], [64.5, 1], [64.6, 0.3], [64.8, 0]]), up = K.ease.inOut(K.clamp((t - 64.56) / 0.42));
  const P = { x: 1000 + 120 * up, y: 900 - 700 * up, s: 1, dir: -1, t, hipN: 300, sit, crouch: cr, shake: pulse(t, 63.3, 0.6), sq: breathe(tc, 5, 0.012), feet: { n: [380, up > 0 ? 80 * up : 0], f: [40, up > 0 ? 80 * up : 0] }, neck: 0.3 * cr, lid: t < 63.3 ? 1 - K.clamp((t - 63.1) / 0.2) : 0, gaze: [-1, 0] };
  P.spread = K.clamp((t - 63.9) / 0.35); P.flap = t < 64.56 ? 1 : sbRocFlap(t - 64.56 + 0.4, 0.8).flap; P.flapLag = t < 64.56 ? 0.8 : sbRocFlap(t - 64.56 + 0.4, 0.8).flapLag; P.tuck = 0;
  return P; }
function sbS9World(ctx, t, cam, S) {
  const tc = SB_T2(t), R = sbRocTakeP(t);
  sbNestSky(ctx, cam, t); ctx.drawImage(sbNestPlate(), -500, 360); sbNestLogs(ctx, 'back');
  const ak = sbRocAnkle({ ...R, feet: R.feet }), ank = [ak[0], ak[1] - 60], L = 420, hang = ak[1] + L < 900;
  groundShadow(ctx, R.x - 200, 905, 900, 900 - R.y, { flat: true, fall: 1600 });
  sbRoc(ctx, R, 'back'); sbRocEgg(ctx, SB_NEST.egg, 900, {});
  sbRoc(ctx, R, 'front');
  if (t > 64.56 && t < 65.2) { dustBurst(ctx, 900, 905, t - 64.56, 10, 16, 46, 420, 0.9, 3); sbRing(ctx, 900, 905, (t - 64.56) / 0.6, 700, { a: 0.6 }); }
  // Sinbad: grips the cloth, feet apart, eyes shut, one eye open; plucked off the ground feet last
  const sx = hang ? ank[0] - 40 + 120 * swing(t, 64.7, 0.35) : 540, lift = hang ? 0 : 0, sy = hang ? ak[1] + L : 900;
  groundShadow(ctx, sx, 905, 80, 900 - sy, { flat: true });
  const P = sbLive(t, 11, { x: sx, y: sy - lift, dir: 1, mouth: 'closed', cloth: 'none', wind: 0.3, gaze: [0.4, -1] });
  const top = [P.x + 6, P.y - 250]; P.handLW = [top[0] - 4, top[1] + 10]; P.handRW = [top[0] + 4, top[1] - 6];
  if (t > 63.6) { P.lid = t < 63.95 ? 1 : 0; P.wink = t > 63.95 && t < 64.4; } if (!hang) { P.sq = (P.sq || 1) * (t > 63.6 ? 0.95 : 1); }
  else { P.sq = 1.06 * landSquash(tc, 64.75, -0.06); P.y -= 0; P.ph = tc * 6; P.amp = 0.4; }
  const line = [ank, [K.lerp(ank[0], top[0], 0.5), K.lerp(ank[1], top[1], 0.5) + (hang ? 0 : 40)], top];
  sbCloth(ctx, line, { w: 12 }); sbBow(ctx, ank[0], ank[1], 1, t, 0.3);
  sbSin2(ctx, P);
  sbNestLogs(ctx, 'front');
}
SB_SHOTS.push({ a: 63.08, b: 64.98, free: true, cam: sbKeys([[63.08, { x: 800, y: 258, zoom: 0.6 }], [64.56, { x: 800, y: 258, zoom: 0.6 }], [64.98, { x: 820, y: -242, zoom: 0.6 }]]), world: sbS9World });
