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
  [81.0, 500, 600, 0.85, 0.32], [82.06, 500, 600, 0.85, 0.3], [83.4, 520, 520, 0.5, 0.25], [85.6, 520, 470, 0.5, 0.22], [86.2, 500, 450, 0.8, 0.2], [90.22, 500, 450, 0.8, 0.2],
  [90.8, 520, 500, 1.0, 0.18], [94.7, 520, 500, 1.0, 0.18], [94.9, 520, 440, 1.0, 0.62], [96.6, 520, 450, 1.0, 0.36],
  // v2 (note 2): wide with the horse in the upper third, push to the boots at 99.76, medium on the rider from 101.08 (cut at 97.18)
  [97.18, 470, 360, 0.6, 0.08], [99.76, 520, 360, 0.6, 0.06], [100.3, 500, 700, 0.9, 0.05], [101.08, 500, 700, 0.9, 0.04], [101.5, 470, 790, 1.2, 0.04], [107.9, 470, 790, 1.2, 0.03],
  // gold: wide low right (room for the memory cloud), slow push to the medium by 113.42 (cut at 108.69)
  [108.69, 700, 800, 0.6, 0.02], [113.42, 650, 790, 1.0, 0.02], [114.06, 640, 780, 1.0, 0.02],
  [115.6, 440, 720, 1.15, -0.03], [117.68, 430, 720, 1.15, 0.0], [121.3, 480, 660, 1.0, 0.0], [122.82, 480, 500, 0.9, 0.0], [129.84, 480, 520, 1.0, 0.0],
  [130.86, 420, 600, 1.1, 0.0], [132.14, 520, 560, 0.67, 0.0], [138.2, 520, 560, 0.66, 0.0],
];
const H1_RIG_CUTS = [97.18, 108.69, 132.14];
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
// v2 (note 4): one clear silhouette per beat; base riding pose = near hand on the pommel, far arm free (never both across the torso)
const H1_POM = [62, -100];
function h1SkyRider(t, H) {
  const tc = EH_T2(t), sd = 3, free = [-48 + 6 * idleSway(tc, 41, 1, 2.3), -96 + 5 * idleSway(tc, 43, 1, 3.1)];
  const P = { lid: ehLid(t, sd), mouth: 'closed', handL: free, handR: H1_POM, sq: breathe(tc, sd, 0.016), lurch: 0.04 + idleSway(tc, 31, 0.025, 2.2), gaze: [0.6, 0.4], brow: 0 };
  const G = (keys) => gazePlan(tc + 0.17, keys, 0.08);   // eyes lead the body by two drawings
  if (t < 76.22) { P.handL = [84, -126]; P.handR = [96, -104]; P.lurch = 0.5 + tremble(tc, 0.015, 7); P.drop = 14; P.eyes = 'shut'; P.mouth = 'frown'; P.brow = -0.5; }   // flat along the neck, arms round it
  else if (t < 80.44) { const up = ehE(tc, 76.6, 0.6); P.lurch = K.lerp(0.46, 0.12, ehE(tc, 78.16, 0.7)) - 0.04 * up; P.handL = [-40, -72]; P.wink = t < 76.6 ? 'R' : null; P.eyes = t < 76.6 ? 'open' : 'wide';
    P.gaze = [0.15, 1]; P.mouth = 'o'; P.brow = -0.6; P.drop = 14 * (1 - up);
    if (t > 79.64) { P.sq *= 1 - 0.04 * pulse(tc, 79.64, 0.5); P.lid = Math.max(P.lid, ehBlinkAt(tc, 79.9)); P.mouth = 'closed'; } }
  else if (t < 83.6) {   // twisted to camera-left and down, both hands cupped at the mouth, elbows out
    const u = ehE(tc, 80.44, 0.3); P.lurch = K.lerp(0.1, -0.16, u) + 0.03 * pulse(tc, 81.2, 0.6); P.tilt = -0.14 * u; P.handL = [K.lerp(-48, -28, u), K.lerp(-96, -176, u)]; P.handR = [K.lerp(62, 30, u), K.lerp(-100, -178, u)];
    P.mouth = 'open'; P.gaze = [-0.6, 1]; P.sq *= anticipate(tc, 80.3, 0.25, -0.05); }
  else if (t < 84.96) { P.handR = PERSON_HANDS.cupEar.R; P.handL = [-40, -78]; P.lurch = -0.22; P.tilt = 0.12; P.gaze = [-0.5, 1]; P.lid = Math.max(ehLid(t, sd, [84.2]), 0.1); }   // a hand behind the ear, leaning out
  else if (t < 86.22) { const hk = h1HawkPos(t); P.gaze = hk ? lookAt([H.x, H.y - 400 * H.s], hk) : [-1, 0]; P.handL = [-70, -170]; P.eyes = 'wide'; P.lurch = -0.06;
    if (t > 85.54) { P.sq *= 0.96; P.drop = 8; P.mouth = 'frown'; P.handL = [-50, -110]; } }
  else if (t < 90.22) {   // shoulders drop, arms hang, head down
    P.handL = [-40, -58]; P.handR = [44, -60]; P.sq *= 0.96; P.drop = 12; P.lurch = 0.06; P.mouth = 'frown'; P.lid = Math.max(P.lid, 0.25);
    P.gaze = G([[86.22, [-1, 0.3]], [86.6, [1, 0.3]], [87.0, [-1, 0]], [87.45, [0.2, 1]]]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 86.25), ehBlinkAt(tc, 86.62), ehBlinkAt(tc, 87.02), ehBlinkAt(tc, 87.47));
    if (t > 89.6) { P.handR = H1_POM; P.drop = 12 * (1 - ehE(tc, 89.6, 0.5)); } }
  else if (t < 97.18) { P.brow = 0.5; P.mouth = 'closed'; P.gaze = [0.6, 0.3]; P.handL = [-44, -74];   // jaw set, sits tall
    P.sq *= 1 + 0.04 * ehE(tc, 90.4, 0.8); P.lurch = -0.04;
    if (t >= 91.84 && t < 94.12) { const k = h1Loc(EH_EBG.knob[0], EH_EBG.knob[1]); P.handR = [k[0] - 6, k[1] - 4]; P.gaze = [0.5, 0.9]; P.lurch = 0.08; }
    if (t >= 94.12 && t < 94.74) { P.gaze = [0.1, 1]; P.lid = 0.2; P.mouth = 'smile'; P.handR = [66, -60]; }
    if (t >= 94.74) { P.lurch = -0.3 * pulse(tc, 94.74, 0.5) + 0.2 * pulse(tc, 95.2, 0.7); P.handL = [-74, -190]; P.eyes = 'wide'; P.mouth = 'o'; P.brow = -0.6; P.sq = 1; }
    if (t >= 96.6) { P.mouth = 'frown'; P.gaze = [0, -1]; P.handL = [-50, -120]; } }
  else if (t < 101.08) { P.gaze = G([[97.18, [0.3, 1]], [99.2, [-0.6, 1]], [99.76, [0.1, 1]]]); P.lurch = 0.12; P.mouth = t > 99.76 ? 'smile' : 'o'; P.eyes = t < 99.7 ? 'wide' : 'open'; P.handL = [-56, -112];
    if (t > 100.2 && t < 100.7) { P.bob = 14 * pulse(tc, 100.2, 0.45); P.lid = Math.max(P.lid, ehBlinkAt(tc, 100.25)); P.mouth = 'o'; } }
  else if (t < 102.82) {   // hugs himself, shoulders up, shivering on twos
    const u = ehE(tc, 101.08, 0.3); P.handL = [K.lerp(-48, 28, u), K.lerp(-96, -150, u)]; P.handR = [K.lerp(62, -24, u), K.lerp(-100, -148, u)]; P.drop = -4 * u; P.sq *= 0.97;
    P.lurch = 0.04 + (Math.floor(tc * 12) % 2 ? 0.02 : -0.02) * u; P.mouth = 'frown'; P.brow = -0.3; P.lid = Math.max(P.lid, 0.35); P.gaze = [0.2, 0.5]; }
  else if (t < 103.76) { const k = Math.sin(tc * 24) * 6; P.handL = [-6 + k, -168]; P.handR = [12 - k, -170]; P.mouth = 'o'; P.brow = 0; P.gaze = [0.3, 0.3]; }   // blows on his hands
  else if (t < 108.69) h1Search(t, tc, P, G);
  else if (t < 114.06) { P.lurch = flow(tc, [[108.69, 0.3], [109.0, 0.0], [113, 0.02]]); P.lid = t < 109.0 ? 0.6 * (1 - ehE(tc, 108.75, 0.2)) : ehLid(t, sd, [113.42]); P.eyes = t > 108.85 && t < 110 ? 'wide' : 'open';
    P.handR = t < 110.2 ? PERSON_HANDS.pointUp.R : PERSON_HANDS.chin.R; P.handL = [-44, -86]; P.gaze = t < 113.42 ? [-0.6, -0.7] : [0.95, 0.1]; P.brow = t > 109 ? -0.3 : 0; if (t >= 113.42) { P.eyes = 'wide'; P.handR = H1_POM; } }   // head snaps up, finger raised
  else if (t < 121.32) { P.lurch = flow(tc, [[114.06, 0.05], [114.6, 0.3], [115.4, 0.34], [116.2, 0.5], [121.3, 0.5]]);
    const m = (j) => { const [mx, my] = EH_EBG.mane[j]; return h1Loc(mx - 6, my - 6); };
    if (t < 115.68) { P.handR = H1_POM; P.handL = [-40, -80]; P.gaze = [0.9, 0.2]; }
    else { const step = K.clamp(Math.floor((tc - 115.68) / 0.27), 0, 3); const jl = [5, 5, 3, 3][step], jr = [6, 4, 4, 1][step]; P.handL = m(jl); P.handR = m(jr); P.gaze = [0.9, -0.1]; }
    if (t >= 116.54 && t < 116.96) { P.gaze = t < 116.75 ? [1, -0.2] : [0.8, -0.5]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 116.75)); }
    if (t >= 116.96) { P.tip = 0.12; P.lid = 0.4; P.gaze = [0.9, 0.2]; } }
  else if (t < 122.82) { P.lurch = 0.15; P.lid = 0.2; P.mouth = 'smile'; P.gaze = [0.9, 0.1]; P.sq *= 1 - 0.03 * ehE(tc, 121.4, 0.8); }
  else if (t < 129.84) {   // leans out and looks straight down; land, lever; then his own open hand, then the lever
    P.lurch = -0.12 * ehE(tc, 122.82, 0.4); P.drop = 10; P.tilt = 0.1; P.handL = [-40, -66]; P.mouth = 'closed';
    P.gaze = G([[122.82, [0.1, 1]], [124.92, [-0.2, 1]], [125.4, [0.95, 0.05]], [127.22, [-0.4, 0.4]], [128.5, [0.95, 0.05]]]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 125.2), ehBlinkAt(tc, 128.4));
    if (t > 125.4) { P.lurch = 0.04; P.drop = 0; P.tilt = 0; }
    if (t > 126.28 && t < 127.2) { P.sq *= 1 - 0.03 * pulse(tc, 126.3, 0.5); P.tip = -0.04; }
    if (t >= 127.22 && t < 128.5) { const u = ehE(tc, 127.22, 0.3); P.handL = [K.lerp(-40, -20, u), K.lerp(-66, -150, u)]; }
    if (t >= 127.22) { P.talk = ehTalk(t, 127.22, 129.7, 12, 0.5); P.lid = Math.max(P.lid, 0.15); }
    if (t > 129.12) P.drop = 8 * pulse(tc, 129.12, 0.6); }
  else { const reach = flow(tc, [[129.84, 0], [130.2, 0.15], [130.8, 0.85], [131.4, 1]]), lv = h1Loc(EH_EBG.lever[0] - 26, EH_EBG.lever[1] + 14);
    P.handR = [K.lerp(62, lv[0], reach) + (Math.floor(tc * 12) % 2 ? 1 : -1), K.lerp(-100, lv[1], reach)]; P.handL = [-44, -80]; P.lurch = 0.1 + 0.18 * reach; P.gaze = [0.9, 0.1]; P.mouth = 'closed'; P.brow = -0.2; }
  return P;
}
// the search (S11, 103.76 - 108.69): five checks, each its own silhouette; never looks at the ear here
function h1Search(t, tc, P, G) {
  P.gaze = G([[103.76, [0.3, 1]], [104.54, [-1, 0.3]], [105.26, [0.4, 0.9]], [106.46, [1, 0.1]], [107.16, [0.3, 0.7]]]);
  if (t < 104.54) { const u = ehE(tc, 103.76, 0.3); P.lurch = K.lerp(0.04, 0.62, u); P.drop = 22 * u; P.handL = [K.lerp(-48, 30, u), K.lerp(-96, -20, u)]; }   // far over the near side, head below the saddle line
  else if (t < 105.26) { const u = ehE(tc, 104.54, 0.25); P.lurch = K.lerp(0.62, -0.34, u); P.tilt = -0.15 * u; P.handL = [-70, -66]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 104.5)); }   // twists round to the tail
  else if (t < 106.46) { const pm = h1Loc(48, -262); P.handR = [pm[0] + 4 * Math.sin(tc * 20), pm[1]]; P.handL = [pm[0] - 12, pm[1] + 4]; P.lurch = 0.12; P.tip = 0.04 * Math.sin(tc * 12); P.mouth = t > 105.9 ? 'frown' : 'closed'; }   // twists the pommel
  else if (t < 107.16) { P.lurch = 0.34; const k = tc > 106.5 && tc < 106.9 ? 10 * Math.abs(Math.sin(tc * 16)) : 0; P.handR = tc < 106.9 ? [140, -150 + k] : [60 + 8 * Math.sin(tc * 40), -140]; P.lid = 0.3; P.mouth = tc > 106.9 ? 'frown' : 'closed'; }   // knocks on the head, shakes his hand
  else { P.lurch = flow(tc, [[107.16, 0.1], [107.8, 0.28], [108.69, 0.3]]); P.sq *= 0.95; P.drop = 10; P.handR = PERSON_HANDS.chin.R; P.handL = [-40, -60]; P.lid = 0.6; P.mouth = 'frown'; }   // slump
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
function h1SkyPanel(ctx, t, S) {
  const tc = EH_T2(t), H = h1SkyHorse(t), pal = H1_CLOUDPAL(t), sy = H1_SY(t) + H1_TILT(t) * -400, sx = H1_SX(t), land = h1SkyLand(t), deck = t >= 96.6 && t < 132.14;
  let sunD = null;
  if (t >= 132.14) sunD = h1SunsetBack(ctx, t);
  else {
    const sun = t >= 108.2 ? [880, 300 + (t - 108.2) * 6 - H1_TILT(t) * 300, 60] : [820, 160, 55];
    ehSkyFlight(ctx, t, { w: h1SkyW(t), sx, sy, cloud: pal, land: deck ? null : land, sun, sunCol: t > 108.2 ? '#fff0c0' : '#fff6d8', sunHalo: t >= 108.2 ? '#ffc890' : '#fff2c0' });
    if (deck) { const cam = h1SkyCam(t), tl = H1_TILT(t); h1DeckBack(ctx, t, { cam, lift: 560 * tl, brk: tl > 0.01 ? 660 - 560 * tl + 300 + (1 - tl) * 900 : null }); }
  }
  // a cloud slides over the palace dot (S9); a flock below him on 'pass' (99.2) and the hawk far off once more
  if (t > 87.6 && t < 90.22) { const u = ehE(t, 87.6, 1.2); ctx.drawImage(ehCloudSprite(2, 'day'), -400 + 760 * u, 820, 520, 160); }
  if (t > 98.9 && t < 101.0) for (let i = 0; i < 7; i++) { const u = (t - 98.9 - (i % 3) * 0.1) / 2.1; bird(ctx, { kind: 'dove', x: 1080 - 1250 * u + (i % 3) * 50 + Math.floor(i / 3) * 70, y: 600 + (i % 3) * 26 - Math.floor(i / 3) * 18 + 8 * Math.sin(tc * 3 + i), s: 0.22, dir: -1, fly: true, flap: Math.sin(tc * 24 + i * 1.3) }); }
  if (t > 98.0 && t < 101.0) bird(ctx, { kind: 'hawk', pal: 1, x: 120 + (t - 98) * 90, y: 230 - (t - 98) * 12, s: 0.16, dir: 1, fly: true, flap: Math.sin(tc * 8) });
  if (land && land.variant === 'far') for (let i = 0; i < 5; i++) bird(ctx, { kind: 'sparrow', x: 300 + i * 40 - (t - 122) * 30, y: land.y + 160 + (i % 2) * 14, s: 0.16, dir: -1, fly: true, flap: Math.sin(tc * 24 + i * 1.3) });
  if ((t > 75.12 && t < 78.4) || (t > 94.74 && t < 95.9)) ehSpeed(ctx, [0, 0, 1000, 1230], t, { vertical: true, n: 26, speed: t < 80 ? 2600 : 3200, alpha: 0.45, dir: 1 });
  // the hawk passes at his height and looks at him
  const hk = h1HawkPos(t); if (hk) bird(ctx, { kind: 'hawk', pal: 1, x: hk[0], y: hk[1], s: 0.55, dir: -1, fly: true, flap: Math.sin(tc * 10) * (t > 85.0 && t < 85.6 ? 0.2 : 1), headRot: t > 85.0 && t < 85.6 ? -0.35 : 0, gaze: [1, 0.2] });
  // the rig: wind ribbons, cape, the horse and Firuz, with a light rim in the late light (the cape wraps across him at 104.54 for 3 drawings)
  const PP = h1SkyRider(t, H); PP.s = EH_FIRUZ.s * H.s / H1_HS; const pitch = -H.rot, wrap = t >= 104.54 && t < 104.8 ? 0.9 : 0, back = Math.PI - pitch, stream = t < 97.18 ? 1 : 0.65;
  const rim = t >= 132.14 ? '#ff9a6a' : t >= 108.2 ? '#ffd36a' : null;
  const draw = (c) => { ehWindRibbons(c, H, tc, { ang: back + 0.1, len: t < 80 || (t > 94.74 && t < 96) ? 320 : 220 }); ehRide(c, H, 'firuz', PP, t, { tc, stream, ang: back + 0.12 - wrap }); };
  if (rim) castFinish(ctx, H.x, H.y + 60 * H.s, 700 * H.s, 900 * H.s, draw, { rim, light: t >= 132.14 ? [1, 0.4] : [1, -0.2], rimW: 3 }); else draw(ctx);
  // breath puffs in the cold, toe wisps, frost
  const seat = mountSeat('horse', H), head = [seat.x + 30 * H.s, seat.y - 160 * H.s];
  for (const tb of [101.4, 102.9, 103.3, 107.3, 121.5]) if (t > tb && t < tb + 1.2) { const u = (t - tb) / 1.2; ctx.save(); ctx.globalAlpha = 0.7 * (1 - u); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(head[0] + 40 * H.s - 120 * u, head[1] + 20 - 20 * u, (16 + 30 * u) * H.s, (10 + 18 * u) * H.s, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (t > 102.2 && t < 103.6) ehGlints(ctx, [H.x - 120 * H.s, H.y - 330 * H.s, 360 * H.s, 330 * H.s], t, 6, 23, 18, 2);
  if (t >= 112.9 && t < 114.3) { const [x, y] = ehHorsePt(H, EH_EBG.mane[0]); ehGlint(ctx, x, y, 26, (t - 113.42) / 0.6); }
  if (t > 120.72 && t < 122.82) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 20, ((t - 120.72) % 1.0) / 1.0); }
  if (t > 133.08 && t < 134.6) { const [x, y] = ehHorsePt(H, EH_EBG.lever); ehGlint(ctx, x, y, 46, ((t - 133.08) % 0.75) / 0.75); ehGlow(ctx, x, y, 90, 0.6 * pulse(t, 133.08, 1.5)); }
  // near clouds pass in front (the fast climb; the deck's near puffs; one passes right under the boots at 'under')
  if (t > 77.3 && t < 78.4) { const u = (t - 77.3) / 1.1; ctx.drawImage(ehCloudSprite(1, 'day'), -200, -500 + 1900 * u, 1400, 420); }
  if (deck) { const cam = h1SkyCam(t), tl = H1_TILT(t); if (tl < 0.5) h1DeckFront(ctx, t, { y: 1230 - 300 * Math.min(1.4, cam.z) + 500 * tl, a: 0.9 * (1 - tl * 2) }); }
  if (t > 99.76 && t < 101.3) { const u = (t - 99.76) / 1.54, [hx, hy] = ehHorsePt(H, [0, 30]); ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * u); ctx.drawImage(ehCloudSprite(3, 'high'), 1100 - 1500 * u, hy - 40, 760, 230); ctx.restore(); }
  if (t > 132.14) h1DeckFront(ctx, t, { pal: 'sunset', y: 1010, speed: 0.35, a: 0.85 });
  h1SkyOver(ctx, t, S, H, PP);
}
function h1SkyOver(ctx, t, S, H, PP) {
  const tc = EH_T2(t), seat = mountSeat('horse', H), head = [seat.x + 24 * H.s, seat.y - 165 * H.s];
  if (t >= 79.1 && t < 80.44) { const land = h1SkyLand(t), tx = land.toyX, ty = land.toyY - 40; ctx.save(); ctx.globalAlpha *= K.clamp((80.44 - t) / 0.25);
    S.arrow(ctx, [tx + 200, ty - 220], [tx + 30, ty - 30], K.clamp((t - 79.1) / 0.3), { width: 10 }); S.label(ctx, 'LIKE A TOY!', tx + 240, ty - 250, K.clamp((t - 79.2) / 0.3), { size: 46 }); ehGlint(ctx, tx, ty - 50, 14, ((t - 79.1) % 0.6) / 0.6); ctx.restore(); }
  // v2 (note 7): the call beside his head toward the open sky, kept inside the panel; the arcs travel down to the land nobody hears from
  if (t >= 80.44 && t < 82.6) h1Say(ctx, S, [[80.6, 'HELLO...'], [81.2, 'HELLOOO!']], t, head[0] - 300, head[1] - 40, [head[0] - 60, head[1]], { gone: 82.4, size: 56 });
  if (t >= 81.0 && t < 83.6) ehSoundArcs(ctx, head[0] - 40, head[1] + 90, Math.PI * 0.62, (t - 81.0) / 2.4);
  if (t >= 87.0 && t < 88.3) S.title(ctx, '?', head[0] + 10, head[1] - 140 * H.s - 40, K.clamp((t - 87.0) / 0.3), { size: 90, align: 'center' });
  if (t >= 92.5 && t < 94.2) { const [kx, ky] = ehHorsePt(H, EH_EBG.knob); S.arrow(ctx, [kx + 70, ky - 40], [kx - 50, ky - 50], K.clamp((t - 92.5) / 0.8), { width: 9, bend: -0.8, color: '#ff7ad9' }); }
  if (t >= 95.0 && t < 96.8) { ctx.save(); ctx.globalAlpha *= K.clamp((96.8 - t) / 0.3); S.title(ctx, 'HIGHER!', 720, 260, K.clamp((t - 95.0) / 0.3), { size: 80, align: 'center' }); S.arrow(ctx, [860, 520], [860, 300], K.clamp((t - 95.1) / 0.3), { width: 12 }); ctx.restore(); }
  if (t >= 102.2 && t < 103.7) S.title(ctx, 'BRRR!', Math.min(860, head[0] + 260) + 4 * Math.sin(tc * 40), Math.max(150, head[1] - 140), K.clamp((t - 102.2) / 0.3), { size: 66, align: 'center' });
  // the search: '?' on the dead pommel, TOK on the head
  if (t >= 105.7 && t < 106.4) S.title(ctx, '?', head[0] + 150, head[1] - 60, K.clamp((t - 105.7) / 0.2), { size: 70, align: 'center' });
  if (t >= 106.55 && t < 107.0) { const [x, y] = ehHorsePt(H, [190, -320]); S.title(ctx, 'TOK', Math.min(900, x + 40), y - 60, K.clamp((t - 106.55) / 0.15), { size: 48, align: 'center' }); }
  // the memory (S12, v2 note 10): a large thought cloud, a crop of the horse's head and neck with the inventor pointing, DOWN flashing at the ear as at 63.68
  if (t >= 109.2 && t < 113.6) { const p = t < 113.42 ? K.clamp((t - 109.2) / 1.1) : 1 - K.clamp((t - 113.42) / 0.18);
    thoughtCloud(ctx, 380, 330, 700, 540, t, { p, tail: [head[0] - 40, head[1] - 60], scale: 1.05, at: [1100, 600], bg: '#bfe6ff', seed: 5, inside: (c) => h1Memory(c, t) }); }
  if (t >= 127.22 && t < 129.9) h1Say(ctx, S, [[127.3, 'PERHAPS THIS IS...'], [128.5, ['PERHAPS THIS IS', 'MY WAY TO SAFETY...']]], t, head[0] - 60, head[1] - 210, [head[0], head[1] - 60], { gone: 129.7, size: 40 });
  if (t >= 134.3) { const p = K.clamp((t - 134.3) / 0.9); S.title(ctx, 'TO BE CONTINUED...', 500, 160, p, { size: 74, align: 'center', glow: '#ff7ad9' }); }
}
// inside the thought cloud: the inventor at the horse's head as at 61.6, raising his finger, then pointing near the ear
function h1Memory(c, t) {
  const H = { x: H1_CX, y: H1_CART_TOP + 9, s: H1_HS, dir: 1, rot: 0 };
  c.drawImage(ehPalacePlate(), 640, -240); c.fillStyle = '#7ac85a'; c.fillRect(600, 900, 1000, 400); c.fillStyle = '#f0d8b0'; c.fillRect(600, 900, 1000, 30);
  platformCart(c, H1_CX, EH_GR, { dir: 1, sag: 9 }); ebonyHorse(c, H);
  const ear = ehHorsePt(H, EH_EBG.lever), knob = ehHorsePt(H, EH_EBG.knob), u = ehE(EH_T2(t), 111.18, 0.3), P = { x: 1230, y: 935, s: EH_INVENTOR.s, dir: -1, tip: 0.12, lid: 0.35, brow: -0.2, mouth: 'closed', gaze: [-0.6, -0.5] };
  if (t < 111.18) { P.handR = PERSON_HANDS.pointUp.R; P.handL = [-28, -100]; } else { P.handRW = [K.lerp(knob[0], ear[0], u), K.lerp(knob[1], ear[1], u)]; P.handLW = knob; P.talk = ehTalk(t, 111.2, 112.6, 5); }
  ehRibbon(c, 1230 + 28, 700, Math.PI / 2 - 0.4, 110, 16, EH_T2(t), EH_SAFFRON, { wave: 5, tip: 0.6, shade: '#c07a10' }); person(c, ehDressP(EH_INVENTOR, P));
  if (t >= 111.18) { S0.arrow(c, [ear[0] - 120, ear[1] - 120], [ear[0] - 13, ear[1] - 10], K.clamp((t - 111.18) / 0.3), { width: 9, color: '#ff7ad9' }); S0.label(c, 'DOWN', ear[0] - 152, ear[1] - 146, K.clamp((t - 111.28) / 0.3), { size: 40 });
    ehGlint(c, ear[0], ear[1], 34, ((t - 111.18) % 0.5) / 0.5); }
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
  const HK = { x: kx - EH_EBG.knob[0] * s, y: ky - EH_EBG.knob[1] * s, s, dir: 1, close: true, cover: 1, knob: ang, lit: who === 'firuz' && t > 69.6 ? { neck: 0.6 } : {} }; ebonyHorse(ctx, HK);   // v2 (note 8): the lever slot stays hidden
  if (who === 'inventor' && t >= 39.2 && t < 39.3) { const [gx, gy] = ehHorsePt(HK, [EH_EBG.lever[0] - 8, EH_EBG.lever[1] + 16]); ehGlint(ctx, gx, gy, 30, 0.5); }   // a fair 3-frame hint on the block's lower edge
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
  // v2 (note 8): the covering block slides up the neck as a solid cel in 6 drawings (117.9 - 118.4), then the lever lights
  const cover = 1 - Math.min(6, Math.max(0, Math.floor((t - 117.9) / 0.083))) / 6;
  const H = { x: lx - EH_EBG.lever[0] * s, y: ly - EH_EBG.lever[1] * s, s, dir: 1, close: true, cover, reveal: K.clamp((t - 118.4) / 0.4), lever: 0 };
  ebonyHorse(ctx, H);
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
  // v2 (note 11): the index fingertip stops 18 short of the ball (clear sky in the gap), a 2 px tremble on twos; the glint on the lever tip
  const k = t < 131.4 ? Math.min(2, Math.floor((t - 130.86) / 0.18)) : 3, dx = [-260, -170, -90, 0][k], tw = k === 3 ? (Math.floor(EH_T2(t) * 12) % 2 ? 2 : -2) : 0;
  const ft = [tip[0] - 5 * s - 18 + dx, tip[1] + tw], so = 0.95, ox = so * (124 * Math.cos(-0.3) + 38 * Math.sin(-0.3)), oy = so * (124 * Math.sin(-0.3) - 38 * Math.cos(-0.3));
  handInsert(ctx, ft[0] - ox, ft[1] - oy, { s: so, point: 1, rot: -0.3 });
  if (t > 131.6) ehGlint(ctx, tip[0] + 4, tip[1] - 6, 50, (t - 131.6) / 0.5);
  ehGlow(ctx, tip[0], tip[1], 140, 0.4);
}
