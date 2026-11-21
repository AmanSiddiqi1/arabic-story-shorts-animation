// ===== HORSE-01: the flight (S8 part B - S15, 75.12 - 138.15 s) and the four control inserts =====
// The sky is drawn in panel units (1000 x 1230): skyFlight plates and cloud scrolls (pure functions of t through ehInteg),
// the horse and rider as one rig (body centre, scale, pitch), lettering on top. Inserts are close drawings at s 4.2-4.5.

// ---------- scrolls, plates, rig ----------
const H1_SY = ehInteg([[75.12, 900], [76.0, 900], [78.16, 300], [80.44, 120], [90.22, 80], [94.6, 80], [94.9, 1100], [95.9, 400], [96.8, 120], [97.18, 40], [108, 20], [122, 0], [140, 0]], 75, 140);
const H1_SX = ehInteg([[75.12, -40], [90, -60], [97.18, -150], [101, -150], [108.69, -90], [122, -70], [129.8, -60], [140, -50]], 75, 140);
function h1SkyW(t) {
  const hi = ehE(t, 91.5, 5.2), gold = t >= 108.2 ? 1 : 0, sun = t >= 132.14 ? 1 : ehE(t, 127.5, 4.6) * 0.75;
  if (gold) return { gold: 1 - sun, sunset: sun };
  return { low: 1 - hi, high: hi };
}
const H1_CLOUDPAL = (t) => (t < 92 ? 'day' : t < 108.2 ? 'high' : t < 130 ? 'gold' : 'sunset');
// vertical tilt of the view (S14 looks down at the land): positive moves the world up
const H1_TILT = H1_F([[122.82, 0], [123.9, 0], [124.9, 1], [125.4, 1], [126.2, 0.15], [129.8, 0.1], [130, 0]]);
// rig keys per time: [t, cx, cy, s, pitch]
const H1_RIG = [
  [75.12, 470, 430, 0.9, 0.96], [76.2, 470, 430, 0.9, 0.9], [78.16, 480, 420, 0.9, 0.6], [79.4, 480, 430, 0.9, 0.44], [80.44, 490, 430, 0.9, 0.4],
  [82.06, 500, 440, 0.88, 0.32], [83.4, 520, 470, 0.5, 0.25], [85.6, 520, 470, 0.5, 0.22], [86.2, 500, 450, 0.8, 0.2], [90.22, 500, 450, 0.8, 0.2],
  [90.8, 520, 500, 1.0, 0.18], [94.7, 520, 500, 1.0, 0.18], [94.9, 520, 440, 1.0, 0.62], [96.6, 520, 450, 1.0, 0.36], [97.18, 470, 625, 0.6, 0.08],
  [101.0, 560, 625, 0.6, 0.04], [101.6, 500, 560, 0.95, 0.04], [108.69, 500, 560, 0.95, 0.02], [108.7, 600, 640, 0.9, 0.02], [114.06, 580, 640, 0.9, 0.02],
  [115.6, 420, 660, 1.12, -0.03], [117.68, 410, 660, 1.15, 0.0], [121.3, 480, 600, 1.0, 0.0], [122.82, 480, 430, 0.9, 0.0], [129.84, 480, 470, 1.0, 0.0],
  [130.86, 420, 560, 1.1, 0.0], [132.14, 560, 520, 0.42, 0.0], [138.2, 560, 520, 0.408, 0.0],
];
const H1_RIG_CUTS = [108.69, 132.14];
function h1RigKey(t) {
  let i = 0; while (i < H1_RIG.length - 2 && t >= H1_RIG[i + 1][0]) i++; const A = H1_RIG[i], B = H1_RIG[i + 1];
  const cut = H1_RIG_CUTS.some((c) => c > A[0] && c <= B[0] && t < c); const u = cut ? 0 : K.ease.inOut(K.clamp((t - A[0]) / (B[0] - A[0])));
  return A.slice(1).map((v, k) => K.lerp(v, B[k + 1], u));
}
function h1SkyHorse(t) {
  const tc = EH_T2(t); let [cx, cy, s, pitch] = h1RigKey(t);
  cy += idleSway(tc, 5, 6, 2.6) - H1_TILT(t) * 190; pitch += idleSway(tc, 6, 0.012, 3.1);
  if (t > 80.6 && t < 81.4) pitch += 0.06 * Math.sin((t - 80.6) * 18) * (1 - (t - 80.6) / 0.8);   // the wobble when he lets go
  if (t > 104.54 && t < 105.3) pitch += 0.05 * pulse(t, 104.54, 0.7);                              // tips with his weight
  if (t > 114.6 && t < 115.4) pitch -= 0.07 * pulse(t, 114.6, 0.8);                                // nose dips: he freezes
  const lit = ehLitMax(t >= 95.94 && t < 97 ? ehPowerOn(t, 95.94, 0.12, 0.2) : {}, t >= 94.74 && t < 95.4 ? { neck: 0.6 } : {});
  const knob = t < 92.5 ? Math.PI * 1.02 : t < 94.12 ? Math.PI * 1.02 - Math.min(3, Math.floor((tc - 92.5) / 0.5) + 1) * 0.55 : Math.PI * 1.02 - 1.65;
  const reveal = t >= 117.0 ? K.clamp((t - 117.4) / 0.6) * (t < 122.82 ? 1 : 0.5) : 0;
  return ehRigP(cx, cy, s, 1, pitch, { lit, knob, reveal, frost: t > 102.0 && t < 108.2 ? K.clamp((t - 102) / 0.6) : 0 });
}
// ---------- Firuz in the saddle, in the sky ----------
// horse-local point -> the seated rider's body-local hand target (rider scale = horse scale * 0.95 / 0.9, as in the garden)
const h1Loc = (lx, ly) => [(lx + 8) * 0.9 / 0.95 - 22, (ly + 238) * 0.9 / 0.95 - 52];
function h1SkyRider(t, H) {
  const tc = EH_T2(t), sd = 3, P = { lid: ehLid(t, sd), mouth: 'closed', handL: [50, -112], handR: [60, -108], sq: breathe(tc, sd, 0.016), lurch: 0.04 + idleSway(tc, 31, 0.025, 2.2), gaze: [0.6, 0.4], brow: 0 };
  const hug = () => { P.handL = [76, -118]; P.handR = [86, -96]; };
  if (t < 76.22) { hug(); P.lurch = 0.36 + tremble(tc, 0.015, 7); P.eyes = 'shut'; P.mouth = 'frown'; P.brow = -0.5; }
  else if (t < 78.16) { hug(); P.lurch = 0.34; P.wink = t < 76.6 ? 'R' : null; P.eyes = 'wide'; P.gaze = [0.1, 1]; P.mouth = 'o'; P.brow = -0.6; }
  else if (t < 80.44) { hug(); P.lurch = K.lerp(0.34, 0.12, ehE(tc, 78.16, 0.7)); P.eyes = 'wide'; P.gaze = [0.15, 1]; P.mouth = 'o'; P.brow = -0.5;
    if (t > 79.64) { P.sq *= 1 - 0.04 * pulse(tc, 79.64, 0.5); P.lid = Math.max(P.lid, ehBlinkAt(tc, 79.9)); P.mouth = 'closed'; } }
  else if (t < 83.6) { P.handR = PERSON_HANDS.cupMouth.R; P.handL = t < 81.1 ? [70, -60] : [76, -110]; P.mouth = 'open'; P.gaze = [0.3, 1]; P.sq *= anticipate(tc, 80.3, 0.25, -0.05); P.lurch = 0.1 + 0.05 * pulse(tc, 80.6, 0.8); }
  else if (t < 84.96) { P.handR = PERSON_HANDS.cupEar.R; P.handL = [76, -110]; P.gaze = [0.2, 1]; P.lid = Math.max(ehLid(t, sd, [84.2]), 0.1); P.lurch = 0.16; }
  else if (t < 86.22) { const hk = h1HawkPos(t); P.gaze = hk ? lookAt([H.x, H.y - 400 * H.s], hk) : [-1, 0]; P.handL = [76, -110]; P.handR = [70, -100]; P.eyes = 'wide';
    if (t > 85.54) { P.sq *= 0.96; P.drop = 8; P.mouth = 'frown'; } }
  else if (t < 87.96) { P.gaze = gazePlan(tc, [[86.22, [-1, 0]], [86.6, [1, 0]], [87.0, [-1, -0.2]], [87.45, [0.2, 1]]], 0.08); P.lid = Math.max(P.lid, ehBlinkAt(tc, 86.25), ehBlinkAt(tc, 86.62), ehBlinkAt(tc, 87.02), ehBlinkAt(tc, 87.47)); P.handL = [76, -110]; P.sq *= 0.97; P.mouth = 'frown'; }
  else if (t < 90.22) { P.lurch = 0.08 + 0.1 * ehE(tc, 87.96, 0.4); P.gaze = [0.3, 1]; const u = flow(tc, [[88.8, 0], [89.3, 1], [89.6, 1], [90.0, 0]]); P.handR = [K.lerp(60, 92, u), K.lerp(-108, -10, u)]; P.handL = [76, -110]; P.mouth = 'frown'; if (t > 89.8) hug(); }
  else if (t < 97.18) { P.brow = 0.5; P.mouth = 'closed'; P.handL = [76, -110]; P.gaze = [0.6, 0.3];
    if (t < 91.8) P.sq *= 1 + 0.04 * ehE(tc, 90.4, 0.8);
    if (t >= 91.84 && t < 94.12) { const k = h1Loc(EH_EBG.knob[0], EH_EBG.knob[1]); P.handR = [k[0] - 6, k[1] - 4]; P.gaze = [0.5, 0.9]; }
    if (t >= 94.12 && t < 94.74) { P.gaze = [0.1, 1]; P.lid = 0.2; P.mouth = 'smile'; P.handR = [66, -60]; }
    if (t >= 94.74) { P.lurch = -0.3 * pulse(tc, 94.74, 0.5) + 0.2 * pulse(tc, 95.2, 0.7); hug(); P.eyes = 'wide'; P.mouth = 'o'; P.brow = -0.6; }
    if (t >= 96.6) { P.mouth = 'frown'; P.gaze = [0, -1]; } }
  else if (t < 101.08) { P.gaze = [0.2, 1]; P.lurch = 0.1; P.handL = [70, -100]; P.handR = [74, -90]; P.mouth = t > 99.76 ? 'smile' : 'o'; P.eyes = t < 99.7 ? 'wide' : 'open';
    if (t > 100.2 && t < 100.7) { P.bob = 14 * pulse(tc, 100.2, 0.45); P.lid = Math.max(P.lid, ehBlinkAt(tc, 100.25)); P.mouth = 'o'; } }
  else if (t < 102.82) { P.lurch = 0.04 + tremble(tc, 0.02, 8); P.mouth = 'frown'; P.brow = -0.3; if (t > 102.08) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.lurch = 0.06 + tremble(tc, 0.03, 10); P.lid = 0.4; } }
  else if (t < 103.76) { const k = Math.sin(tc * 24) * 6; P.handL = [-6 + k, -168]; P.handR = [12 - k, -170]; P.mouth = 'o'; P.brow = 0; P.gaze = [0.3, 0.3]; }
  else if (t < 104.54) { const pat = Math.abs(Math.sin(tc * 14)) * 10; P.handR = [80, -80 - pat]; P.handL = [-30, -30]; P.gaze = [0.2, 1]; }
  else if (t < 105.26) { const u = ehE(tc, 104.9, 0.2); P.lurch = K.lerp(0.22, -0.12, u); P.gaze = u < 0.5 ? [0.6, 1] : [-1, 0.3]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 104.9)); P.handL = [40, -60]; P.handR = [60, -70]; }
  else if (t < 106.04) { const pm = h1Loc(48, -262); P.handR = [pm[0] + 4 * Math.sin(tc * 20), pm[1]]; P.handL = [pm[0] - 10, pm[1] + 4]; P.gaze = [0.3, 1]; P.mouth = t > 105.7 ? 'frown' : 'closed'; P.tip = 0.04 * Math.sin(tc * 12); }
  else if (t < 107.16) { P.lurch = 0.34; const k = tc > 106.3 && tc < 106.9 ? 10 * Math.abs(Math.sin(tc * 16)) : 0; P.handR = [140, -150 + k]; P.handL = [76, -110]; P.gaze = [1, 0.2]; P.lid = 0.3; }
  else if (t < 108.69) { P.lurch = flow(tc, [[107.16, 0.1], [107.8, 0.3], [108.69, 0.3]]); P.sq *= 0.95; P.handR = PERSON_HANDS.chin.R; P.handL = [70, -90]; P.lid = 0.6; P.gaze = [0.3, 0.6]; P.mouth = 'frown'; }
  else if (t < 114.06) { P.lurch = flow(tc, [[108.69, 0.3], [109.4, 0.05], [113, 0.05]]); P.lid = t < 109.3 ? 0.6 * (1 - ehE(tc, 108.9, 0.4)) : ehLid(t, sd, [113.5]); P.eyes = t > 109.2 && t < 110 ? 'wide' : 'open'; P.handL = [70, -100]; P.handR = [70, -90];
    P.gaze = t < 113.42 ? [-0.5, -0.7] : [0.95, 0.1]; P.brow = t > 109.2 ? -0.3 : 0; if (t >= 113.42) P.eyes = 'wide'; }
  else if (t < 121.32) { P.lurch = flow(tc, [[114.06, 0.05], [114.6, 0.3], [115.4, 0.34], [116.2, 0.5], [121.3, 0.5]]);
    const m = (j) => { const [mx, my] = EH_EBG.mane[j]; return h1Loc(mx - 6, my - 6); };
    if (t < 115.68) { P.handL = [70, -100]; P.handR = [76, -96]; P.gaze = [0.9, 0.2]; }
    else { const step = K.clamp(Math.floor((tc - 115.68) / 0.27), 0, 3); const jl = [5, 5, 3, 3][step], jr = [6, 4, 4, 1][step]; P.handL = m(jl); P.handR = m(jr); P.gaze = [0.9, -0.1]; }
    if (t >= 116.54 && t < 116.96) { P.gaze = t < 116.75 ? [1, -0.2] : [0.8, -0.5]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 116.75)); }
    if (t >= 116.96) { P.tip = 0.12; P.lid = 0.4; P.gaze = [0.9, 0.2]; } }
  else if (t < 122.82) { P.lurch = 0.15; P.lid = 0.2; P.mouth = 'smile'; P.handL = [70, -100]; P.handR = [76, -96]; P.gaze = [0.9, 0.1]; P.sq *= 1 - 0.03 * ehE(tc, 121.4, 0.8); }
  else if (t < 129.84) { P.handL = [76, -112]; P.handR = [84, -100]; P.mouth = 'closed';
    P.gaze = t < 125.4 ? [0.2, 1] : t < 128.5 ? [0.95, 0.05] : t < 128.9 ? [0.2, 1] : [0.95, 0.05]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 125.45), ehBlinkAt(tc, 128.95));
    if (t > 126.28 && t < 127.2) { P.sq *= 1 - 0.03 * pulse(tc, 126.3, 0.5); P.tip = -0.04; }
    if (t >= 127.22) { P.talk = ehTalk(t, 127.22, 129.7, 12, 0.5); P.lid = Math.max(P.lid, 0.15); }
    if (t > 129.12) P.drop = 8 * pulse(tc, 129.12, 0.6); }
  else { const reach = flow(tc, [[129.84, 0], [130.2, 0.15], [130.8, 0.85], [131.4, 1]]), lv = h1Loc(EH_EBG.lever[0] + 10, EH_EBG.lever[1] + 4);
    P.handR = [K.lerp(80, lv[0], reach) + tremble(tc, 1.2, 7), K.lerp(-100, lv[1], reach)]; P.handL = [76, -112]; P.lurch = 0.1 + 0.18 * reach; P.gaze = [0.9, 0.1]; P.mouth = 'closed'; P.brow = -0.2; }
  return P;
}
// ---------- the hawk ----------
function h1HawkPos(t) { if (t < 84.6 || t > 86.6) return null; const u = (t - 84.6) / 2.0; return [1120 - 1300 * u, 400 + 40 * Math.sin(u * 3)]; }

// ---------- the sky shot ----------
function h1SkyLand(t) {
  if (t < 96.0) { const y = kfn(t, [[75.12, 560], [80.44, 800], [90.22, 880], [94.74, 900], [96.0, 1280]]), k = kfn(t, [[75.12, 0.95], [80.44, 0.32], [90, 0.22]]), toy = kfn(t, [[75.12, 0.4], [76.82, 0.2], [79.1, 0.066], [80.44, 0.055], [90, 0.04]], 'out');
    return { y, k, toy, toyX: 500 + 30 * Math.sin(t * 0.1), toyY: y + 90 + 120 * k, hide: K.clamp((t - 88.0) / 0.6) }; }
  if (t >= 122.82 && t < 130) return { y: 1230 - 670 * H1_TILT(t) + 20, k: 0.22, variant: 'far', haze: '#ffe8c0', glint: 1, dx: -(t - 122) * 20 };
  return null;
}
function h1Deck(t) { if (t < 96.6) return null; let y = kfn(t, [[96.6, 1300], [98.6, 720], [101.0, 720], [101.6, 930], [108.69, 930], [108.7, 980], [132.1, 980], [132.14, 760], [140, 760]]); return y + 190 * H1_TILT(t) * 0 + 670 * H1_TILT(t) * (t > 122 ? 1 : 0); }
function h1SkyPanel(ctx, t, S) {
  const tc = EH_T2(t), H = h1SkyHorse(t), pal = H1_CLOUDPAL(t), sy = H1_SY(t) + H1_TILT(t) * -400, sx = H1_SX(t), land = h1SkyLand(t), deck = h1Deck(t);
  const sun = t >= 132.14 ? [620, 640 + 50 * ehE(t, 132.4, 1.6) + 12 * (t - 134) * (t > 134 ? 1 : 0), 92] : t >= 108.2 ? [880, 300 + (t - 108.2) * 6 - H1_TILT(t) * 300, 60] : [820, 160, 55];
  ehSkyFlight(ctx, t, { w: h1SkyW(t), sx, sy, cloud: pal, land, deck, sun, sunCol: t >= 132.14 ? '#ffd27a' : t > 108.2 ? '#fff0c0' : '#fff6d8', sunHalo: t >= 108.2 ? '#ffc890' : '#fff2c0', rays: t >= 132.14 ? 0.8 + 0.4 * ehE(t, 132.48, 1.2) : 0 });
  if (t >= 132.14) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ehGlow(ctx, 620, 760, 360, 0.5, '#ff9a7a'); ctx.restore(); ehDeck(ctx, 760, sx, t, 'sunset'); }   // the sun sinks into the cloud sea
  // a cloud slides over the palace dot (S9) and birds far below (S14)
  if (t > 87.6 && t < 90.22) { const u = ehE(t, 87.6, 1.2); ctx.drawImage(ehCloudSprite(2, 'day'), -400 + 760 * u, 820, 520, 160); }
  if (land && land.variant === 'far') for (let i = 0; i < 5; i++) bird(ctx, { kind: 'sparrow', x: 300 + i * 40 - (t - 122) * 30, y: land.y + 160 + (i % 2) * 14, s: 0.16, dir: -1, fly: true, flap: Math.sin(tc * 24 + i * 1.3) });
  // the horse's shadow on the cloud deck
  if (deck != null && deck < 1230) { ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = '#4a5a9a'; ctx.beginPath(); ctx.ellipse(H.x + 40, deck + 30, 230 * H.s, 22 * H.s, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if ((t > 75.12 && t < 78.4) || (t > 94.74 && t < 95.9)) ehSpeed(ctx, [0, 0, 1000, 1230], t, { vertical: true, n: 26, speed: t < 80 ? 2600 : 3200, alpha: 0.45, dir: 1 });
  // the hawk passes at his height and looks at him
  const hk = h1HawkPos(t); if (hk) bird(ctx, { kind: 'hawk', pal: 1, x: hk[0], y: hk[1], s: 0.55, dir: -1, fly: true, flap: Math.sin(tc * 10) * (t > 85.0 && t < 85.6 ? 0.2 : 1), headRot: t > 85.0 && t < 85.6 ? -0.35 : 0, gaze: [1, 0.2] });
  // the rig: wind ribbons, cape, the horse and Firuz, with a light rim in the late light
  const PP = h1SkyRider(t, H); PP.s = EH_FIRUZ.s * H.s / H1_HS; const pitch = -H.rot, back = Math.PI - pitch, stream = t < 97.18 ? 1 : 0.65;
  const rim = t >= 132.14 ? '#ff9a6a' : t >= 108.2 ? '#ffd36a' : null;
  const draw = (c) => { ehWindRibbons(c, H, tc, { ang: back + 0.1, len: t < 80 || (t > 94.74 && t < 96) ? 320 : 200 }); ehRide(c, H, 'firuz', PP, t, { tc, stream, ang: back + 0.12 }); };
  if (rim) castFinish(ctx, H.x, H.y + 60 * H.s, 700 * H.s, 900 * H.s, draw, { rim, light: t >= 132.14 ? [1, 0.4] : [1, -0.2], rimW: 3 }); else draw(ctx);
  // breath puffs in the cold, toe wisps, frost
  const seat = mountSeat('horse', H), head = [seat.x + 30 * H.s, seat.y - 160 * H.s];
  for (const tb of [101.4, 102.9, 103.3, 121.5]) if (t > tb && t < tb + 1.2) { const u = (t - tb) / 1.2; ctx.save(); ctx.globalAlpha = 0.7 * (1 - u); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(head[0] + 40 - 120 * u, head[1] + 20 - 20 * u, 16 + 30 * u, 10 + 18 * u, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (t > 99.76 && t < 101) { const u = (t - 99.76) / 1.24, bx = seat.x + 40 * H.s, by = seat.y + 100 * H.s; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = '#ffffff'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(bx + sd * 30 * (1 + u) - 80 * u, by + 10, 30, 10, sd * 0.2, 0, 7); ctx.fill(); } ctx.restore(); }
  if (t > 102.2 && t < 103.6) ehGlints(ctx, [H.x - 120 * H.s, H.y - 330 * H.s, 360 * H.s, 330 * H.s], t, 6, 23, 18, 2);
  if (t >= 112.9 && t < 114.3) { const [x, y] = ehHorsePt(H, EH_EBG.mane[0]); ehGlint(ctx, x, y, 26, (t - 113.42) / 0.6); }
  if (t > 120.72 && t < 122.82) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 20, ((t - 120.72) % 1.0) / 1.0); }
  if (t > 133.08 && t < 134.6) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 46, ((t - 133.08) % 0.75) / 0.75); ehGlow(ctx, x, y, 90, 0.6 * pulse(t, 133.08, 1.5)); }
  // near clouds pass in front (on the fast climb, and drifting at the end)
  if (t > 77.3 && t < 78.4) { const u = (t - 77.3) / 1.1; ctx.drawImage(ehCloudSprite(1, 'day'), -200, -500 + 1900 * u, 1400, 420); }
  if (t > 132.14) ehSkyFront(ctx, t, { sx: sx * 2, sy: 0, cloud: 'sunset', a: 0.35 });
  h1SkyOver(ctx, t, S, H, PP);
}
function h1SkyOver(ctx, t, S, H, PP) {
  const tc = EH_T2(t), seat = mountSeat('horse', H), head = [seat.x + 24 * H.s, seat.y - 165 * H.s];
  if (t >= 79.1 && t < 80.44) { const land = h1SkyLand(t), tx = land.toyX, ty = land.toyY - 40; ctx.save(); ctx.globalAlpha *= K.clamp((80.44 - t) / 0.25);
    S.arrow(ctx, [tx + 200, ty - 220], [tx + 30, ty - 30], K.clamp((t - 79.1) / 0.3), { width: 10 }); S.label(ctx, 'LIKE A TOY!', tx + 240, ty - 250, K.clamp((t - 79.2) / 0.3), { size: 46 }); ehGlint(ctx, tx, ty - 50, 14, ((t - 79.1) % 0.6) / 0.6); ctx.restore(); }
  if (t >= 80.44 && t < 82.6) { ehSay(ctx, S, [[80.6, 'HELLO...'], [81.2, 'HELLOOO!']], t, 300, head[1] - 170, [head[0] - 20, head[1] - 30], { gone: 82.4, size: 60 }); }
  if (t >= 81.0 && t < 83.6) ehSoundArcs(ctx, head[0], head[1] + 40, Math.PI / 2, (t - 81.0) / 2.4);
  if (t >= 87.0 && t < 88.3) S.title(ctx, '?', head[0] + 10, head[1] - 140 * H.s - 40, K.clamp((t - 87.0) / 0.3), { size: 90, align: 'center' });
  if (t >= 92.5 && t < 94.2) { const [kx, ky] = ehHorsePt(H, EH_EBG.knob); S.arrow(ctx, [kx + 70, ky - 40], [kx - 50, ky - 50], K.clamp((t - 92.5) / 0.8), { width: 9, bend: -0.8, color: '#ff7ad9' }); }
  if (t >= 95.0 && t < 96.8) { ctx.save(); ctx.globalAlpha *= K.clamp((96.8 - t) / 0.3); S.title(ctx, 'HIGHER!', 720, 260, K.clamp((t - 95.0) / 0.3), { size: 80, align: 'center' }); S.arrow(ctx, [860, 520], [860, 300], K.clamp((t - 95.1) / 0.3), { width: 12 }); ctx.restore(); }
  if (t >= 102.2 && t < 103.7) S.title(ctx, 'BRRR!', head[0] + 180 + 4 * Math.sin(tc * 40), head[1] - 120, K.clamp((t - 102.2) / 0.3), { size: 66, align: 'center' });
  // the memory (S12): a thought cloud with the inventor pointing near the ear
  if (t >= 109.2 && t < 113.6) { const p = t < 113.42 ? K.clamp((t - 109.2) / 1.1) : 1 - K.clamp((t - 113.42) / 0.18);
    thoughtCloud(ctx, 330, 300, 520, 400, t, { p, tail: [head[0] - 30, head[1] - 40], scale: 0.62, at: [1090, 690], bg: '#bfe6ff', seed: 5, inside: (c) => h1Memory(c, t) }); }
  if (t >= 127.22 && t < 129.9) ehSay(ctx, S, [[127.3, 'PERHAPS THIS IS...'], [128.5, 'PERHAPS THIS IS MY WAY TO SAFETY...']], t, 500, Math.max(120, head[1] - 190), [head[0], head[1] - 40], { gone: 129.7, size: 40 });
  if (t >= 134.3) { const p = K.clamp((t - 134.3) / 0.9); S.title(ctx, 'TO BE CONTINUED...', 500, 230, p, { size: 74, align: 'center', glow: '#ff7ad9' }); }
}
// inside the thought cloud: the inventor at the horse's head as at 61.6, raising his finger, then pointing near the ear
function h1Memory(c, t) {
  const H = { x: H1_CX, y: H1_CART_TOP + 9, s: H1_HS, dir: 1, rot: 0 };
  c.fillStyle = '#7ac85a'; c.fillRect(600, 900, 1000, 400); c.fillStyle = '#f0d8b0'; c.fillRect(600, 900, 1000, 30);
  platformCart(c, H1_CX, EH_GR, { dir: 1, sag: 9 }); ebonyHorse(c, H);
  const ear = ehHorsePt(H, EH_EBG.lever), u = ehE(EH_T2(t), 111.18, 0.4), P = { x: 1180, y: 935, s: EH_INVENTOR.s, dir: -1, lid: 0.35, brow: 0.3, mouth: 'closed', handL: [-28, -100], gaze: [-0.6, -0.4] };
  P.handR = t < 111.18 ? [44, -205] : null; if (t >= 111.18) P.handRW = [K.lerp(1180, ear[0], u), K.lerp(720, ear[1] + 4, u)];
  ehRibbon(c, 1180 + 28, 690, Math.PI / 2 - 0.4, 110, 16, EH_T2(t), EH_SAFFRON, { wave: 5, tip: 0.6, shade: '#c07a10' }); person(c, ehDressP(EH_INVENTOR, P));
  if (t >= 112.72) { S0.arrow(c, [ear[0] + 120, ear[1] - 140], [ear[0] + 10, ear[1] - 14], K.clamp((t - 112.72) / 0.3), { width: 14, color: '#ff7ad9' }); ehGlint(c, ear[0], ear[1], 40, ((t - 112.72) % 0.45) / 0.45); }
}

// ---------- the inserts ----------
function h1InsertBgGarden() {   // the court behind the knob, painted soft (baked once)
  return ehBakeAt('insbg:garden', 1000, 1230, (c) => { c.save(); c.filter = 'blur(10px)'; c.translate(500, 615); c.scale(2.0, 2.0); c.translate(-1110, -640);
    c.drawImage(ehGardenSkyPlate(), 0, -820, 2000, 2050); c.drawImage(ehPalacePlate(), 640, -240); c.drawImage(ehGardenGroundPlate(), 0, 380); c.restore(); }, 0.5);
}
function h1InsertBgSky(pal) { return ehBakeAt('insbg:' + pal, 1000, 1230, (c) => { c.save(); c.filter = 'blur(6px)'; ehGrad(c, 0, 0, 1000, 1230, EH_SKY[pal === 'sunset' ? 'sunset' : 'gold']); const [b, u] = EH_CLOUDC[pal];
  for (const [x, y, s] of [[200, 300, 1.4], [800, 520, 1.2], [450, 900, 1.8], [900, 1100, 1.5]]) ehCloud(c, x, y, 420 * s, 120 * s, b, u, 12, x); c.restore(); }, 0.5); }
function h1ClickRings(ctx, x, y, t, times) { for (const tr of times) { const u = (t - tr) / 0.45; if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, 50 + 160 * u, 0, 7); ctx.stroke(); ctx.restore(); } } }
// knob insert: who 'inventor' (37.64 - 39.4, a quarter turn in 3 held drawings) | 'firuz' (69.08 - 70.0, a hard half turn in 2)
function h1KnobInsert(ctx, t, S, who) {
  const tc = EH_T2(t), s = 4.2, kx = 560, ky = 640, z = 1 + 0.03 * (who === 'firuz' ? (t - 69.08) : (t - 37.64) / 1.76);
  ctx.drawImage(h1InsertBgGarden(), 0, 0, 1000, 1230);
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  let ang, grip, hx, hy;
  if (who === 'inventor') { const k = t < 38.0 ? 0 : Math.min(3, 1 + Math.floor((tc - 38.0) / 0.3)); ang = k * Math.PI / 6; grip = K.clamp((t - 37.7) / 0.25); hx = K.lerp(380, 470, ehE(tc, 37.64, 0.3)); hy = ky - 20; }
  else { const k = t < 69.25 ? 0 : t < 69.42 ? 1 : 2; ang = [Math.PI / 2, Math.PI * 0.8, Math.PI * 1.02][k] + (k === 2 ? 0.06 * Math.sin(tc * 40) * K.clamp(1 - (t - 69.42) / 0.5) : 0); grip = 1; hx = 470; hy = ky - 20; }
  ebonyHorse(ctx, { x: kx - EH_EBG.knob[0] * s, y: ky - EH_EBG.knob[1] * s, s, dir: 1, close: true, knob: ang, lit: who === 'firuz' && t > 69.6 ? { neck: 0.6 } : {} });
  h1ClickRings(ctx, kx + 8, ky, t, who === 'inventor' ? [38.6, 38.9] : [69.25, 69.42, 69.6]);
  ctx.save(); ctx.translate(kx + 8, ky); ctx.rotate(ang - Math.PI / 2 - (who === 'inventor' ? 0 : 0)); ctx.translate(-(kx + 8), -ky);
  handInsert(ctx, hx, hy - 10, { s: 1.15, grip, rot: 0.15, sleeve: who === 'inventor' ? '#8a6ac8' : '#eadcc0', cuff: who === 'inventor' ? '#c8a0ff' : '#f2c040' }); ctx.restore();
  ctx.restore();
  if (who === 'inventor' && t >= 38.48) S.arrow(ctx, [860, 380], [kx + 70, ky - 70], K.clamp((t - 38.48) / 0.3), { width: 12 });
  if (who === 'firuz') { ctx.save(); ctx.globalAlpha *= 0.5; ehSpeed(ctx, [0, 0, 1000, 1230], t, { n: 10, speed: 3000, alpha: 0.4 }); ctx.restore(); }
}
// lever insert (117.68 - 121.3): the mane, the lever lighting, A LEVER!, the fingertip for scale, the engraved arrow, glints on the mane
function h1LeverInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.5, lx = 540, ly = 620, z = 1 + 0.04 * K.clamp((t - 117.68) / 3.6);
  ctx.drawImage(h1InsertBgSky('gold'), 0, 0, 1000, 1230);
  ctx.save(); ctx.translate(500, 615); ctx.scale(z, z); ctx.translate(-500, -615);
  const H = { x: lx - EH_EBG.lever[0] * s, y: ly - EH_EBG.lever[1] * s, s, dir: 1, close: true, reveal: K.clamp((t - 118.0) / 0.5), lever: 0 };
  ebonyHorse(ctx, H);
  // the shadow under the mane overhang slides back to show the engraved arrow
  const sh = 1 - ehE(t, 119.92, 0.7); if (sh > 0) { ctx.save(); ctx.globalAlpha = 0.55 * sh; ctx.fillStyle = '#1a1028'; ctx.beginPath(); ctx.moveTo(lx - 140, ly - 120); ctx.lineTo(lx + 150, ly - 160); ctx.lineTo(lx + 150, ly + 40 - 140 * (1 - sh)); ctx.lineTo(lx - 140, ly + 70 - 140 * (1 - sh)); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ehBand(ctx, [lx - 400, ly - 500, 800, 700], (t - 117.7) / 0.9, { angle: 0.4, w: 120, alpha: 0.5, col: '#ffe0a0' });
  const tip = ehHorsePt(H, [EH_EBG.lever[0] + Math.cos(2.2) * 38, EH_EBG.lever[1] + Math.sin(2.2) * 38]);
  if (t > 118.2) ehGlint(ctx, tip[0], tip[1], 60, ((t - 118.2) % 0.9) / 0.9);
  if (t >= 119.26) { const u = ehE(tc, 119.26, 0.5); handInsert(ctx, K.lerp(-120, tip[0] - 140, u) + (t > 119.8 ? tremble(t, 1, 9) : 0), tip[1] + 140, { s: 0.9, point: 1, rot: -0.55 }); }
  if (t > 120.72) for (let j = 0; j < 3; j++) { const [mx, my] = ehHorsePt(H, [EH_EBG.mane[j][0] - 10, EH_EBG.mane[j][1] - 14]), u = (t - 120.72 - j * 0.15) / 0.4; if (u > 0 && u < 1) ehGlint(ctx, mx, my, 34, u); }
  ctx.restore();
  if (t >= 118.72 && t < 120.6) { ctx.save(); ctx.globalAlpha *= K.clamp((120.6 - t) / 0.25); S.label(ctx, 'A LEVER!', 760, 300, K.clamp((t - 118.72) / 0.3), { size: 52 }); S.arrow(ctx, [740, 360], [tip[0] + 40, tip[1] - 30], K.clamp((t - 118.8) / 0.3), { width: 12 }); ctx.restore(); }
}
// the hand creeping to the lever (130.86 - 132.14): three held drawings, then it stops a finger-width short and trembles
function h1ReachInsert(ctx, t, S) {
  const tc = EH_T2(t), s = 4.5, lx = 560, ly = 600;
  ctx.drawImage(h1InsertBgSky('sunset'), 0, 0, 1000, 1230);
  const H = { x: lx - EH_EBG.lever[0] * s, y: ly - EH_EBG.lever[1] * s, s, dir: 1, close: true, reveal: 0.8 };
  ebonyHorse(ctx, H); const tip = ehHorsePt(H, [EH_EBG.lever[0] + Math.cos(2.2) * 38, EH_EBG.lever[1] + Math.sin(2.2) * 38]);
  const k = t < 131.4 ? Math.min(2, Math.floor((t - 130.86) / 0.18)) : 3, dx = [-300, -200, -110, -48][k];
  handInsert(ctx, tip[0] + dx - 10 + (k === 3 ? tremble(t, 1.6, 8) : 0), tip[1] + 40, { s: 0.95, point: 0.4, grip: 0.2, rot: -0.3 });
  if (t > 131.6) ehGlint(ctx, tip[0], tip[1], 50, (t - 131.6) / 0.5);
  ehGlow(ctx, tip[0], tip[1], 140, 0.4);
}
