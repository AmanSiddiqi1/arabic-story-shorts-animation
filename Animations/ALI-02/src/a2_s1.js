// ===== ALI-02 shots S1-S5 (0 - 43.88 s): dawn at the rock, the sacks, the forgotten words, wheat and barley, the grain ring =====
const A2_SH = '#3a2a4a';   // ground shadow colour in the cave and at dawn

// ---------- S1 0-8.22: dawn crane down; the cart rolls in; he hops down, checks, calls; the rock opens, swallows him and shuts ----------
const A2_S1_CAM = [[0, { x: 1500, y: 330, zoom: 1.3 }], [1.4, { x: 1560, y: 615, zoom: 1.0 }], [5.6, { x: 1585, y: 615, zoom: 1.0 }], [6.0, { x: 1700, y: 640, zoom: 1.2 }], [7.0, { x: 1700, y: 640, zoom: 1.2 }], [8.0, { x: 1650, y: 630, zoom: 1.05 }]];
const A2_S1_CART = (t) => kfn(t, [[0, 700], [1.5, 1140]], 'out');
const A2_S1_HOP = { t: 1.4, d: 0.36, x0: 1120, x1: 1280 };
const A2_S1_X = (t) => kfn(t, [[3.55, 1280], [4.25, 1680], [6.45, 1680], [7.45, 1915]], 'inOut');
const A2_S1_T0 = 4.255;   // the arm: wind back 4.755, throw 4.895 («افتح)
const A2_S1_OPEN = (t) => K.ease.inOut(K.clamp((t - 6.0) / 0.9)) * (1 - K.ease.inOut(K.clamp((t - 7.42) / 0.68)));
function a2S1Cassim(ctx, t, m, mode) {
  const tc = AB_T2(t), x = A2_S1_X(tc); if (tc < A2_S1_HOP.t + A2_S1_HOP.d) return null;
  const P = { x, y: 900, dir: 1, ...walk(A2_S1_X, tc, { stride: 24 }), mouth: 'grin', grin: 0.8, gaze: [1, -0.2], lid: abLid(t, 51, [2.62, 3.05]), tip: idleSway(tc, 52, 0.02, 2.4), sq: breathe(tc, 53, 0.015) };
  P.sq *= landSquash(tc, A2_S1_HOP.t + A2_S1_HOP.d, 0.15);
  if (tc < 2.3) { P.gaze = [0.4, -1]; P.tip = -0.06; }   // lands looking up the rock face
  else if (tc < 3.55) { P.gaze = gazePlan(tc, [[2.3, [-1, 0]], [2.7, [-1, 0.1]], [3.05, [1, 0]], [3.4, [0.6, -0.4]]]); P.mouth = 'smile'; P.handL = [18 + 4 * osc(tc, 0.3), -138]; P.handR = [28 - 4 * osc(tc, 0.3), -132]; P.drop = 3; }
  const a = a2ArmVal(tc, A2_S1_T0); if (tc > 4.3 && tc < 6.4) { P.handR = a2ArmHand(a); P.gaze = [1, -0.4]; P.eyes = 'wide'; P.sq *= anticipate(tc, 4.3, 0.45, 0.06); P.talk = abTalk(t, 4.9, 6.28, 2); if (P.talk) P.mouth = 'open'; }
  if (tc > 3.55 && tc < 4.3) P.sq *= 1 + 0.03 * beatIn(tc, 3.9, 4.25);   // chest out, breath in
  if (tc >= 6.4) { P.handR = [40, -140]; P.mouth = 'grin'; P.grin = 1; P.amp = Math.min(P.amp, 0.8); }
  const coin = K.clamp((t - 6.28) / 0.2) * (1 - K.clamp((t - 6.9) / 0.2));
  const draw = (c, xx, yy, k) => { const Q = { ...P, x: xx, y: yy, s: 1.1 * k }; a2Cas(c, Q, m, { shadow: mode === 'out', shc: A2_SH, coin, fa: 0.35 - lagged((u) => 0.4 * (A2_S1_X(u) - 1680) / 235, tc, 0.12, 1) });
    const h = a2Hand(Q, 0, A2_CAS); abSack(c, h[0] - 8, h[1] + 10, 0.5 * k, 0, { flap: 6 * Math.sin(t * 8), rot: 0.3 }); abSack(c, h[0] - 2, h[1] + 4, 0.46 * k, 0, { flap: 5 * Math.sin(t * 7 + 1), rot: 0.1, col: '#b88c58' }); };
  if (mode === 'out' && x < AB_DIN - 100) { draw(ctx, x, 900, 1); return P; }
  a2DoorFig(ctx, t, x, 900, draw, mode, { maxDark: 0.75, rim: '#ffd76a' }); return P;
}
function a2S1World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dawn', op = A2_S1_OPEN(t), crack = K.clamp((t - 5.8) / 0.45) * (op > 0 || t < 7.4 ? 1 : 0), glow = K.clamp((t - 5.8) / 0.6) * (1 - K.clamp((t - 7.9) / 0.3));
  a2Stars(ctx, t, 1 - K.clamp((t - 2.1) / 1.3));
  if (t > 2.1) abFlock(ctx, t - 2.1, 700, 300, 170, 4, 3, 0.45);
  abGladeBack(ctx, m, t);
  abRock(ctx, 1820, 900, { model: m, open: op, crack: t < 7.42 ? crack : K.clamp(op * 4), glow, t, inside: (c) => { c.save(); c.translate(-1820, -900); a2S1Cassim(c, t, m, 'in'); c.restore(); } });
  if (t > 2.1 && t < 3.6) abBands(ctx, [1490, 250, 660, 650], t, { cols: ['#ffc8a0'], alpha: 0.18 * Math.sin(Math.PI * beatIn(t, 2.1, 3.6)), w: 160, speed: 200, n: 1, angle: 0 });
  if (op > 0 && op < 1) dustBurst(ctx, 1820, 260 + ((t * 300) % 500), (t * 3) % 0.6, 3, 3, 6, 20, 0.6, Math.floor(t * 5));
  for (const [x, y] of [[1820, 300], [1820, 880]]) { dustBurst(ctx, x, y, t - 6.05, 6, 4, 9, 40, 1.1, 7); dustBurst(ctx, x, y, t - 7.5, 5, 4, 9, 36, 1.0, 8); }
  // the mule and the cart (Cassim in the bed until he hops)
  const flinch = beatIn(tc, 6.0, 6.15) * (1 - beatIn(tc, 6.5, 6.9));
  const inCart = tc < A2_S1_HOP.t;
  a2MuleCart(ctx, t, 0, m, { xf: (u) => A2_S1_CART(u) - 22 * flinch, moving: tc < 1.5, shc: A2_SH, load: inCart || true,
    P: { earL: tc > 6.0 && tc < 6.6 ? -0.8 : 0.5 + idleSway(tc, 61, 0.3, 1.3) + (tc > 1.6 && tc < 2.4 ? -0.6 : 0), earR: tc > 6.0 && tc < 6.6 ? -0.7 : 0.3 + idleSway(tc, 62, 0.35, 1.7), eyes: flinch > 0.3 ? 'wide' : undefined, neck: -0.15 * flinch + idleSway(tc, 63, 0.08, 3.3), headTurn: tc > 7.6 ? 0.3 : 0 },
    inside: inCart ? (c) => { const lean = lagged((u) => 0.05 * Math.sin(A2_S1_CART(u) * 0.045), tc, 0.09, 1), crouch = beatIn(tc, 1.2, 1.4);
      const P = { x: -20, y: 10, s: 1.1, dir: 1, mouth: 'grin', grin: 1, gaze: [1, -0.2], lid: abLid(t, 51), tip: 0.1 + lean, sq: 1 - 0.12 * crouch, handR: [92, -140], handL: [70, -132] };
      a2Cas(c, P, m, { shadow: false, fa: 0.35 + lagged((u) => 6 * (A2_S1_CART(u) - A2_S1_CART(u - 0.05)) / 30, tc, 0.12, 1) }); const h = a2Hand(P, 1, A2_CAS);
      c.save(); c.strokeStyle = '#3a2a3a'; c.lineWidth = 3; c.beginPath(); c.moveTo(h[0], h[1]); c.quadraticCurveTo(h[0] + 140, h[1] - 10, 300, -40); c.stroke(); c.restore(); } : null });
  // the hop down (shadow on the ground shrinking in the air, feet hanging)
  if (!inCart && tc < A2_S1_HOP.t + A2_S1_HOP.d) { const u = beatIn(tc, A2_S1_HOP.t, A2_S1_HOP.t + A2_S1_HOP.d), x = K.lerp(A2_S1_HOP.x0, A2_S1_HOP.x1, u), base = K.lerp(815, 900, u), lift = 70 * Math.sin(Math.PI * u);
    groundShadow(ctx, x, 902, 130, 900 - base + lift, { flat: true, color: A2_SH });
    a2Cas(ctx, { x, y: base - lift, s: 1.1, dir: 1, mouth: 'grin', gaze: [0.4, -0.6], handL: [-60, -170], handR: [60, -180], sq: 1.06, tip: -0.05 }, m, { shadow: false, fa: 0.6 }); }
  a2S1Cassim(ctx, t, m, 'out');
  // a sparrow lands on the rock top as it shuts
  if (t > 7.2) { const u = K.clamp((t - 7.2) / 0.6), bx = K.lerp(2150, 1830, K.ease.out(u)), by = K.lerp(120, 252, K.ease.out(u)) - 30 * Math.sin(Math.PI * u), fly = u < 1;
    bird(ctx, { kind: 'sparrow', x: bx, y: by, s: 0.5, dir: -1, fly, flap: fly ? Math.sin(tc * 26) : 0, tip: idleSway(tc, 71, 0.05, 1.3) }); }
}
function a2S1Over(ctx, t, cam, S) {
  if (t > 0.3 && t < 3.6) { const off = t > 3.1 ? [1, 0, 1, 0, 0, 0][Math.min(5, Math.floor((t - 3.1) * 12))] : 1;
    if (off) { const dy = (cam.y - 470) * -0.5; S.title(ctx, 'THE FORGOTTEN', 500, 190 + dy, K.clamp((t - 0.3) / 1.0), { size: 88, align: 'center' }); S.title(ctx, 'PASSWORD', 500, 290 + dy, K.clamp((t - 0.45) / 1.0), { size: 88, align: 'center' });
      if (t > 0.9) S.title(ctx, 'الكلمات المنسية', 500, 420 + dy, K.clamp((t - 0.9) / 1.0), { size: 74, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); } }
  if (t > 4.6 && t < 6.9) { const x = A2_S1_X(AB_T2(t)), [hx, hy] = abP(x, 900 - 230, cam); abSay(ctx, S, [[4.895, 'OPEN...'], [5.66, 'OPEN SESAME!']], t, Math.min(hx + 40, 760), 260, [hx, hy], { size: 56, gone: 6.6 }); }
  if (t > 1.0 && t < 2.6) { const [x, y] = abP(1180, 560, cam); S.label(ctx, 'CASSIM', x, y, K.clamp((t - 1.0) / 0.4), { size: 40 }); }
}
AB_SHOTS.push({ a: 0, b: 8.22, ww: 2400, cam: a2Cam(A2_S1_CAM), under: a2GladeUnder('dawn'), world: a2S1World, over: a2S1Over });

// ---------- the cave: the coin heap layout shared by S2-S8 ----------
// S2: four small sacks fill in a row (x 400..520) and the big one (x 660); S3: he drags three to the door side, the heap ends at
// x 400..535; the big sack stays by the mound. Cassim hides behind the heap (x 470) in S6/S7.
const A2_ROW = [400, 440, 480, 520], A2_BIG = [660, 906];
const A2_FILL = [9.28, 9.6, 9.92, 10.24, 10.56];   // fill starts (0.25 s each), the fifth is the big sack
const A2_HEAP = [[400, 0.62, 0], [445, 0.66, 0.08], [490, 0.62, -0.1], [535, 0.64, 0.12]];
function a2SackRow(ctx, t, upTo = 4, o = {}) { for (let i = 0; i < upTo; i++) { const f = K.clamp((t - A2_FILL[i]) / 0.25); if (t < A2_FILL[i]) continue; const sq = 1 - 0.18 * Math.exp(-(t - A2_FILL[i] - 0.25) * 12) * (t > A2_FILL[i] + 0.25 ? 1 : 0);
  abSack(ctx, A2_ROW[i], 908 + (i % 2) * 4, 0.62, f, { coin: f > 0.9, sq }); } }
function a2Heap(ctx, t, o = {}) { A2_HEAP.forEach(([x, s, r], i) => { if (o.skip === i || (Array.isArray(o.skip) && o.skip.includes(i))) return; const sl = o.slump && i === 0 ? o.slump : 0, lift = o.lift && i === 1 ? o.lift : null;
  if (lift) return; abSack(ctx, x + (o.dx || 0) * (i === 1 ? 1 : 0), 908 + (i % 2) * 3, s, 1 - 0.3 * sl, { coin: true, rot: r + 0.2 * sl, sq: 1 - 0.12 * sl }); }); }
function a2BigSack(ctx, t, o = {}) { abSack(ctx, A2_BIG[0], A2_BIG[1] - (o.lift || 0), 1.05, 1, { coin: true, sq: o.sq || 1, tie: '#c8481a' }); }

// ---------- S2 8.22-14.55: the pan to the gold; five sacks fill (counter); the big one wins ----------
const A2_S2_CAM = [[8.22, { x: 520, y: 690, zoom: 1.5 }], [10.9, { x: 640, y: 690, zoom: 1.5 }], [14.55, { x: 652, y: 690, zoom: 1.5 }]];
const A2_LIFT = [[11.6, 0], [11.9, 0], [12.25, 12], [12.46, 11], [13.36, 2], [13.38, 0]];
function a2S2Cassim(ctx, t, m) {
  const tc = AB_T2(t); let x = 560, P = { x, y: 902, dir: 1, kneel: 1, mouth: 'grin', grin: 0.9, gaze: [1, 0.4], lid: abLid(t, 55), tip: 0.06 + idleSway(tc, 56, 0.02, 2.2), sq: breathe(tc, 57, 0.015), fin: A2_GOLDRIM };
  const o = { shc: A2_SH, fa: 0.3 };
  if (tc < 8.6) { P.kneel = beatIn(tc, 8.22, 8.6); P.x = kfn(tc, [[8.22, 470], [8.55, 560]], 'out'); P.amp = 0.6; P.ph = P.x / 24; }
  if (tc >= 8.6 && tc < 10.14) { const u = (tc * 2.4) % 1, sc = u < 0.5 ? K.ease.inOut(u * 2) : 1 - K.ease.inOut((u - 0.5) * 2);   // scoops on twos
    P.handRW = [K.lerp(650, 560, sc), K.lerp(880, 770, sc)]; P.handLW = [K.lerp(630, 540, 1 - sc), K.lerp(886, 790, 1 - sc)]; P.tip = 0.12 * sc + 0.05; o.fa = 0.3 + lagged((u2) => 0.3 * Math.sin(u2 * 15), tc, 0.12, 1); P.gaze = [1, 0.6]; }
  if (tc >= 10.14 && tc < 10.95) { P.handL = [-30, -205]; P.handR = [40, -212]; P.gaze = [0.2, -0.8]; P.tip = -0.06; o.coin = 1; P.mouth = 'grin'; P.lid = 0; }
  if (tc >= 10.95 && tc < 11.6) { P.kneel = 1 - beatIn(tc, 10.95, 11.3); P.x = 575; P.lid = abLid(t, 55, [11.1]); P.gaze = [1, 0.3];
    if (tc < 11.25) { P.handRW = [640, 806 + 6 * osc(tc, 0.25)]; } else { P.handL = [-6, -128 + 6 * osc(tc, 0.3)]; P.handR = [10, -132 - 6 * osc(tc, 0.3)]; } P.sq *= 1.02; }
  if (tc >= 11.6 && tc < 13.38) { const lift = flow(tc, A2_LIFT); P.x = 590; P.kneel = 0; P.sit = 0.45 * beatIn(tc, 11.6, 11.82); P.seat = 'bench'; P.handRW = [A2_BIG[0] + 10, 850 - lift]; P.handLW = [A2_BIG[0] - 60, 862 - lift];
    P.sq = flow(tc, [[11.6, 1], [11.82, 0.94], [12.1, 1.08], [12.46, 1.06], [13.3, 1.0]]); P.tip = -0.1 + 0.4 * tremble(tc, 0.01, 9); P.x += tremble(tc, 1.5, 9); P.lid = 1; P.mouth = 'o'; o.fa = 0.35 + 0.15 * Math.sin(tc * 40);
    if (tc > 12.6) { P.lid = 0; P.wink = 'L'; P.gaze = [0.8, 0.6]; } }
  if (tc >= 13.38 && tc < 13.9) { P.x = 600; P.tip = 0.35 * K.ease.out(beatIn(tc, 13.38, 13.5)); P.sq = 0.9 + 0.1 * beatIn(tc, 13.5, 13.9); P.drop = 8; P.lid = 1; P.mouth = 'o'; P.handRW = [A2_BIG[0] + 30, 840]; P.handLW = [A2_BIG[0] - 30, 830]; o.fa = 0.9; }
  if (tc >= 13.9) { P.x = 600; P.tip = 0.08; P.sq = breathe(tc, 57, 0.04); P.handR = tc < 14.2 ? [40, -205] : [60, -60]; P.handL = [-50, -70]; P.mouth = 'o'; P.gaze = tc < 14.2 ? [0.6, 0.4] : [-1, 0.1]; P.drop = 8 * (1 - beatIn(tc, 13.9, 14.2)); o.fa = 0.5; }
  if (P.kneel === 1 && tc >= 8.6 && tc < 10.95) P.sit = 0;
  a2Cas(ctx, P, 'cave', o); return P;
}
function a2S2World(ctx, t, cam) {
  a2CaveWorld(ctx, t, cam, { door: {} });
  const tc = AB_T2(t); a2SackRow(ctx, tc);
  const lift = tc >= 11.6 && tc < 13.38 ? flow(tc, A2_LIFT) : 0, fill5 = K.clamp((tc - A2_FILL[4]) / 0.25);
  const bigFront = tc >= 11.6 && tc < 13.38, drawBig = () => { if (tc >= A2_FILL[4]) { if (tc < 13.38) abSack(ctx, A2_BIG[0], A2_BIG[1] - lift, 0.62 + 0.43 * fill5, fill5, { coin: fill5 > 0.9, tie: tc > 11.0 ? '#c8481a' : null }); else a2BigSack(ctx, t, { sq: impactSquash(tc, 13.38, 0.7) }); } };
  if (!bigFront) drawBig();
  // coins fly from the mound to the sack being filled (on twos), with glints
  for (let i = 0; i < 5; i++) { const t0 = A2_FILL[i]; if (tc < t0 - 0.1 || tc > t0 + 0.3) continue; const tx = i < 4 ? A2_ROW[i] : A2_BIG[0], R = K.rng(90 + i);
    for (let k = 0; k < 6; k++) { const u = K.clamp((tc - t0 + 0.1 - k * 0.05) / 0.3); if (u <= 0 || u >= 1) continue; const x = K.lerp(700 + R() * 40, tx, u), y = K.lerp(820, 870, u) - 140 * Math.sin(Math.PI * u); abBlob(ctx, x, y, 8, 8 * Math.abs(Math.cos(tc * 20 + k)), '#ffcf3a', '#c07a12', { lw: 2, off: 2 }); } }
  const P = a2S2Cassim(ctx, t, 'cave');
  if (bigFront) drawBig();
  if (tc >= 10.14 && tc < 10.95) { for (let k = 0; k < 8; k++) { const h = a2Hand(P, k % 2, A2_CAS), u = ((t * 2.2 + k / 8) % 1); abBlob(ctx, h[0] + (k % 3 - 1) * 8, h[1] + 10 + u * 110, 7, 7 * Math.abs(Math.cos(t * 17 + k)), '#ffcf3a', '#c07a12', { lw: 2, off: 2 }); }
    abBands(ctx, [P.x - 120, 600, 240, 320], t, { cols: ['#fff3b0'], alpha: 0.3, w: 70, speed: 500 }); }
  if (tc > 13.38 && tc < 14.2) { dustBurst(ctx, A2_BIG[0], 905, t - 13.38, 7, 4, 10, 46, 0.7, 13); for (let k = 0; k < 3; k++) { const [x, l] = hop(t, 13.42 + k * 0.05, 0.4, A2_BIG[0] - 20 + k * 20, A2_BIG[0] - 70 + k * 70, 60 - k * 12); if (t > 13.42) abBlob(ctx, x, 912 - l, 8, 4, '#ffcf3a', '#c07a12', { lw: 2, off: 2 }); } }
}
AB_SHOTS.push({ a: 8.22, b: 14.55, ww: 1600, cam: a2Cam(A2_S2_CAM), under: a2CaveUnder(), world: a2S2World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    if (t < 8.6) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 1 - K.clamp((t - 8.22) / 0.38); ctx.fillStyle = '#ffd36a'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }   // the match cut on the gold light
    const n = A2_FILL.filter((f) => t >= f + 0.25).length; if (n > 0 && t < 12.0) S.counter(ctx, n, 820, 190, K.clamp((t - A2_FILL[0] - 0.25) / 0.3) * (1 - K.clamp((t - 11.6) / 0.4)), { size: 110, color: '#ffd36a' });
    if (t > 13.45) { const [x, y] = abP(600, 700, cam); abSay(ctx, S, [[13.45, 'TOO HEAVY!']], t, 330, 330, [x, y], { size: 52, gone: 14.4 }); } } });

// ---------- S3 14.55-20.92: the drag to the door; the coin trail; the arm stalls; the seed breaks into "?"; eye close-up ----------
const A2_S3_CAM = [[14.55, { x: 640, y: 690, zoom: 1.5 }], [16.6, { x: 420, y: 680, zoom: 1.35 }], [19.9, { x: 410, y: 680, zoom: 1.35 }]];
const A2_S3_X = (t) => kfn(t, [[14.6, 600], [16.55, 380]], 'inOut');
const A2_S3_T0 = 17.7;   // wind back 18.2, top at 18.34 (ونسي): the arm stalls there
function a2S3Cassim(ctx, t, m) {
  const tc = AB_T2(t), x = A2_S3_X(tc), P = { x, y: 902, dir: 1, ...walk(A2_S3_X, tc, { stride: 22 }), mouth: 'smile', gaze: [1, 0.3], lid: abLid(t, 58, [16.75]), tip: -0.1 + idleSway(tc, 59, 0.02, 2.2), sq: breathe(tc, 60, 0.02), fin: A2_GOLDRIM };
  const o = { shc: A2_SH, fa: 0.3 + lagged((u) => 0.2 * Math.sin(A2_S3_X(u) * 0.1), tc, 0.12, 1) };
  if (tc < 16.6) { P.handRW = [x + 62, 846 + 6 * Math.sin(x * 0.1)]; P.handLW = [x + 56, 856]; P.tip = -0.14 - 0.05 * Math.abs(Math.sin(x * 0.065)); }
  if (tc >= 16.6) { P.dir = -1; P.tip = idleSway(tc, 59, 0.02, 2.2); P.mouth = 'smile'; P.lid = Math.max(0.3, abLid(t, 58, [16.75])); P.gaze = [1, 0];
    if (tc < 17.3) { P.handL = [-10, -110 + 8 * osc(tc, 0.2)]; P.handR = [12, -112 - 8 * osc(tc, 0.2)]; P.sq *= 0.98; } else { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; } }
  if (tc >= 17.7) { const a = a2ArmVal(tc, A2_S3_T0), wilt = beatIn(tc, 18.45, 18.95); P.handR = a2ArmHand(a); if (wilt > 0) P.handR = [K.lerp(P.handR[0], 66, wilt), K.lerp(P.handR[1], -100, wilt)]; P.handL = PERSON_HANDS.hipsHands.L;
    P.talk = tc < 18.34 ? abTalk(t, 17.8, 18.34, 4) : 0; P.mouth = tc > 18.34 ? 'o' : P.talk ? 'open' : 'smile'; P.lid = 0;
    if (tc > 18.34) { P.gaze = gazePlan(tc, [[18.34, [-0.6, -0.8]], [18.8, [-0.8, -0.6]]]); P.brow = -0.6; o.fa = 0.35 + 0.5 * beatIn(tc, 18.7, 19.2); } }
  if (tc >= 19.34) { P.handR = [K.lerp(66, 80, beatIn(tc, 19.4, 19.7)), K.lerp(-100, -200, beatIn(tc, 19.4, 19.7))]; P.gaze = [-0.4, -1]; P.dir = -1; }
  a2Cas(ctx, P, m, o); return P;
}
function a2S3World(ctx, t, cam) {
  const tc = AB_T2(t); a2CaveWorld(ctx, t, cam, { door: {} });
  a2CoinTrail(ctx, { reveal: (x) => x > A2_S3_X(tc) + 30 || x > 600 });
  a2BigSack(ctx, t); abSack(ctx, A2_ROW[0], 908, 0.62, 1, { coin: true });
  // the dragged sacks trail behind his hands, a step late; the one on his back slips off at 15.68
  const x = A2_S3_X(tc), lag = (k) => A2_S3_X(tc - 0.1 - k * 0.06);
  if (tc < 16.2) { abSack(ctx, lag(0) + 72, 908, 0.66, 1, { coin: true, rot: -0.15 }); abSack(ctx, lag(1) + 118, 910, 0.62, 1, { coin: true, rot: -0.1 }); }
  else { a2Heap(ctx, t, { skip: 0 }); }
  const P = a2S3Cassim(ctx, t, 'cave');
  if (tc < 15.68) { const [bx, by] = a2BodyPt(P, -34, -150, A2_CAS); abSack(ctx, bx - 4, by + 40, 0.6, 1, { coin: true, rot: 0.4 }); }
  else if (tc < 16.2) { const u = beatIn(tc, 15.68, 16.0); abSack(ctx, K.lerp(x - 30, 400, u), K.lerp(800, 908, u * u), 0.6, 1, { coin: true, rot: K.lerp(0.4, 0, u), sq: 1 - 0.15 * pulse(tc, 16.0, 0.2) }); }
  // the shut slab marked; his gold-lit shadow on it breathes with him
  if (t > 16.8) { ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = '#1a0c14'; ctx.beginPath(); ctx.ellipse(220, 760 - 4 * Math.sin(t * 2), 46, 120, 0, 0, 7); ctx.fill(); ctx.restore(); }
}
function a2S3Cloud(ctx, t, cam, S) {
  if (t < 19.34) return; const [hx, hy] = abP(380, 680, cam), p = K.clamp((t - 19.34) / 0.35), blur = 1 + 7 * K.clamp((t - 19.5) / 0.3), br = K.clamp((t - 19.75) / 0.12);
  const drift = 30 * K.clamp((t - 19.5) / 0.4);
  thoughtCloud(ctx, 640 + drift, 400 - drift * 0.4, 300, 210, t, { p, tail: [hx + 10, hy - 20], inside: (c) => {
    if (br < 1) a2Grain(c, 'sesame', 500, 700, 4.2, 0.2, { blur: blur / 0.3 * 0.3 * 3, glow: 0.6, alpha: 1 - br });
    if (br > 0) dustBurst(c, 500, 700, t - 19.75, 9, 6, 14, 160, 0.6, 21); } });
  if (t > 19.8) S.title(ctx, '?', 640 + drift, 420 - drift * 0.4, K.clamp((t - 19.8) / 0.3), { size: 110, align: 'center', glow: '#ffd36a' });
}
function a2EyesClose(ctx, t, F, o = {}) {   // the eye close-up in panel units (model sheet head), gold bands over the held drawing
  abGrad(ctx, 0, 0, 1000, 1230, o.bg || [[0, '#2a1420'], [1, '#4a2430']]);
  ctx.save(); ctx.beginPath(); ctx.roundRect(60, 330, 880, 600, 60); ctx.clip();
  abFace(ctx, 500 + (o.dx || 0), 700, 2.1, { who: 'cassim', m: 'cave', ...F });
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: o.bands || ['#ffd36a'], alpha: 0.14, w: 200, speed: 300 }); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(60, 330, 880, 600, 60); ctx.stroke(); ctx.restore();
}
AB_SHOTS.push({ a: 14.55, b: 19.9, ww: 1600, cam: a2Cam(A2_S3_CAM), under: a2CaveUnder(), world: a2S3World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    if (t > 17.32 && t < 18.3) { const p = K.clamp((t - 17.32) / 0.4); S.arrow(ctx, abP(330, 520, cam), abP(220, 650, cam), p, { color: '#7fe3ff' }); }
    if (t > 17.7) { const [hx, hy] = abP(A2_S3_X(t), 900 - 235, cam); abSay(ctx, S, [[17.8, 'OPEN...'], [18.34, 'OPEN ...?']], t, 560, 300, [hx, hy], { size: 52, gone: 19.4, wobble: t > 18.34 ? 6 : 0 }); }
    a2S3Cloud(ctx, t, cam, S); } });
AB_SHOTS.push({ a: 19.9, b: 20.92, panel: (ctx, t, S) => { const tc = AB_T3(t);
  a2EyesClose(ctx, t, { gaze: gazePlan(tc, [[19.9, [-0.8, -0.3]], [20.12, [0.8, -0.2]], [20.32, [-0.8, -0.2]], [20.7, [0, 0.4]]]), lid: abBlinkAt(tc, 20.5), iris: 0.85, brow: -0.8, mouth: 'o', sweat: K.clamp((t - 19.95) / 0.9), t }, { dx: tremble(t, 1.5, 7) }); } });

// ---------- S4 20.92-33.46: OPEN WHEAT! OPEN BARLEY! nothing; the tilt up the slab; he slides down; the light cools; the heart ----------
const A2_S4_CAM = [[20.92, { x: 420, y: 680, zoom: 1.35 }], [25.74, { x: 430, y: 670, zoom: 1.35 }], [27.0, { x: 330, y: 560, zoom: 1.3 }], [29.9, { x: 360, y: 600, zoom: 1.3 }], [31.0, { x: 380, y: 720, zoom: 1.7 }], [33.46, { x: 372, y: 724, zoom: 1.72 }]];
const A2_S4_T1 = 21.764, A2_S4_X = (t) => kfn(t, [[26.2, 380], [26.5, 302]], 'inOut');
const A2_S4_DIM = (t) => 0.4 * K.clamp((t - 28.84) / 1.0);
const A2_BEATS = [30.58, 31.08, 31.58, 32.08, 32.55, 32.95];
function a2Beat(t) { let v = 0; for (const b of A2_BEATS) if (t >= b && t < b + 0.3) v = Math.max(v, Math.exp(-(t - b) * 9)); return v; }
function a2S4Cassim(ctx, t, m) {
  const tc = AB_T2(t), P = { x: A2_S4_X(tc), y: 902, dir: -1, ...walk(A2_S4_X, tc, { stride: 22 }), mouth: 'closed', gaze: [1, 0], lid: abLid(t, 61), tip: idleSway(tc, 62, 0.02, 2.4), sq: breathe(tc, 63, 0.02), fin: A2_GOLDRIM }, o = { shc: A2_SH, fa: 0.35 };
  if (tc < 22.2) { P.tilt = 0.12 * Math.sin(tc * 20) * (1 - beatIn(tc, 20.92, 21.5)); P.handL = [-34, -100]; P.handR = [40, -104]; P.sq *= anticipate(tc, 21.6, 0.5, 0.07); P.mouth = tc > 21.6 ? 'o' : 'closed'; }
  if (tc >= 21.76 && tc < 24.0) { P.handR = a2ArmHand(a2ArmVal(tc, A2_S4_T1)); P.handL = [-40, -100]; P.lid = tc < 23.4 ? 1 : 0; P.wink = tc >= 23.4 ? 'L' : undefined; P.talk = abTalk(t, 22.4, 23.96, 5); P.mouth = P.talk ? 'open' : 'o'; P.gaze = [1, -0.3]; o.fa = 0.35 + lagged((u) => 0.6 * flow(u - A2_S4_T1, A2_ARM), tc, 0.12, 1); }
  if (tc >= 24.0 && tc < 26.2) { const up = beatIn(tc, 24.0, 24.25), sag = beatIn(tc, 25.55, 26.1), sagH = beatIn(tc - 0.12, 25.55, 26.1);
    P.handL = [K.lerp(-40, -72, up) + 30 * sag, K.lerp(-110, -232, up) + 120 * sagH]; P.handR = [K.lerp(70, 82, up) - 30 * sag, K.lerp(-180, -236, up) + 120 * sagH];
    P.sq *= 1 + 0.06 * up * (1 - sag); P.y = 902 - 6 * up * (1 - sag); P.lid = tc < 25.3 ? 1 : 0; P.talk = abTalk(t, 24.36, 25.74, 6); P.mouth = P.talk ? 'open' : 'o';
    if (tc > 25.35 && tc < 25.6) { P.tip = -0.08; P.eyes = 'wide'; } if (tc > 25.6) { P.gaze = gazePlan(tc, [[25.6, [-1, -0.3]], [25.9, [-0.6, -1]]]); }
    o.fa = 0.35 + lagged((u) => 0.5 * beatIn(u, 24.0, 24.25), tc, 0.15, 1) + 0.3 * sag; }
  if (tc >= 26.2 && tc < 27.42) { P.gaze = [1, 0]; P.mouth = 'o';
    if (tc > 26.5 && tc < 26.9) { P.handR = [70, -170 + 14 * Math.abs(Math.sin(tc * 30))]; P.handL = [-30, -110]; }
    else if (tc >= 26.9 && tc < 27.1) { P.tip = 0.15; P.handL = [-42, -200]; P.lid = 1; }
    else if (tc >= 27.1) { P.tip = 0.18; P.x += tremble(tc, 2, 9); P.handR = [66, -160]; P.handL = [50, -150]; P.lid = 1; P.mouth = 'open'; o.fa = 0.4 + 0.2 * Math.sin(tc * 30); } }
  if (tc >= 27.42) { const sl = K.ease.inOut(beatIn(tc, 27.6, 28.6)); P.x = 302; P.dir = 1; P.sit = sl; P.seat = 'floor'; P.tilt = 0.12 * sl; P.handL = [-50, -100 + 30 * sl]; P.handR = [-36, -110 + 30 * sl]; P.gaze = [0.3, 0.6]; P.lid = 0.3; P.mouth = 'o'; P.sq = breathe(tc, 63, 0.03); o.fa = 0.5 + 0.2 * sl;
    if (tc > 28.84) { P.gaze = gazePlan(tc, [[28.84, [-0.3, -1]], [29.6, [0.2, -0.9]], [29.92, [0, 0.9]], [30.6, [0.3, -0.4]], [31.2, [-0.8, -0.8]], [31.6, [0.8, -0.8]], [32.0, [-0.3, -1]], [32.3, [1, 0.3]], [32.7, [-1, 0.1]], [33.1, [1, 0.3]]]); P.lid = 0; P.eyes = 'wide'; P.tilt = 0.06; }
    if (tc > 31.2) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.x += tremble(tc, 2, 9); P.wet = true; P.brow = -0.8; }
    if (tc > 32.3) P.sq = breathe(tc, 63, 0.03) * (1 - 0.03 * pulse(tc, 32.5, 0.3));
    P.sq *= 1 + 0.02 * a2Beat(t); o.fa += 0.15 * a2Beat(t); }
  a2Cas(ctx, P, m, o); return P;
}
function a2S4World(ctx, t, cam) {
  const tc = AB_T2(t), dim = A2_S4_DIM(t); a2CaveWorld(ctx, t, cam, { door: {}, dim: dim / 0.4, liveT: t - 0.4 * Math.max(0, t - 28.84) });
  a2CoinTrail(ctx, {}); a2BigSack(ctx, t); a2Heap(ctx, t);
  // his shadow on the slab grows as the light cools
  if (t > 27.42) { const g = 1 + 0.5 * K.clamp((t - 28.84) / 1.0); ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#1a0c14'; ctx.beginPath(); ctx.ellipse(250, 860 - 60 * g, 50 * g, 90 * g, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // a pebble drops from the arch and a thread of dust
  if (t > 23.4 && t < 24.3) { const y = fallY(t, 23.4, 23.85, 572, 896); if (t < 23.85) abBlob(ctx, 150, y, 9, 8, '#8a6a6a', '#4a3434', { lw: 2, off: 3 }); else { abBlob(ctx, 150 + 20 * K.clamp((t - 23.85) / 0.3), 896 - 10 * pulse(t, 23.85, 0.2), 9, 8, '#8a6a6a', '#4a3434', { lw: 2, off: 3 }); dustBurst(ctx, 150, 898, t - 23.85, 4, 3, 6, 20, 0.4, 3); }
    ctx.save(); ctx.globalAlpha = 0.4 * (1 - K.clamp((t - 23.9) / 0.4)); ctx.fillStyle = '#c8a08a'; for (let k = 0; k < 8; k++) ctx.fillRect(160 + Math.sin(k) * 3, 570 + ((t * 300 + k * 40) % 300), 2, 6); ctx.restore(); }
  const P = a2S4Cassim(ctx, t, 'cave');
  // the heart on his chest
  if (t > 29.92) { const [hx, hy] = a2BodyPt(P, 8, -128, A2_CAS), pop = K.ease.back(K.clamp((t - 29.92) / 0.25)), b = a2Beat(t), r = 24 * pop * (1 + 0.25 * b);
    for (const b0 of A2_BEATS) { const u = (t - b0) / 0.6; if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = 0.6 * (1 - u); ctx.strokeStyle = '#ff6a7a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(hx, hy - 4, 26 + 70 * u, 0, 7); ctx.stroke(); ctx.restore(); } }
    heart(ctx, hx, hy, r, { fill: '#e8364f', lw: 3 }); }
}
function a2Echo(ctx, t, cam, t0, k = 1) {   // two echo rings travel from his mouth to the slab and back, smaller
  for (let i = 0; i < 2; i++) { const u = (t - t0 - i * 0.12) / 0.7; if (u < 0 || u > 1) continue; const out = u < 0.5, v = out ? u * 2 : (u - 0.5) * 2, x = out ? K.lerp(345, 285, v) : K.lerp(285, 345, v), r = (out ? 40 + 60 * v : 100 - 50 * v) * k;
    const [px, py] = abP(x, 690, cam); ctx.save(); ctx.globalAlpha = 0.8 * (1 - v * 0.6) * (out ? 1 : 0.6); ctx.strokeStyle = '#ffe6a0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(px, py, r * cam.zoom, out ? Math.PI - 0.8 : -0.8, out ? Math.PI + 0.8 : 0.8); ctx.stroke(); ctx.restore(); }
}
AB_SHOTS.push({ a: 20.92, b: 33.46, ww: 1600, cam: a2Cam(A2_S4_CAM), under: a2CaveUnder(A2_S4_DIM), world: a2S4World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    const [hx, hy] = abP(A2_S4_X(t), 900 - 240, cam);
    abSay(ctx, S, [[22.404, 'OPEN...'], [23.18, 'OPEN WHEAT!']], t, 590, 330, [hx, hy], { size: 52, gone: 23.98, icon: t > 23.18 ? (c, x, y) => a2Grain(c, 'wheat', x, y, 1.1, -0.2) : null });
    if (t > 24.36) abSay(ctx, S, [[24.36, 'OPEN...'], [25.04, 'OPEN BARLEY!']], t, 600, 300, [hx, hy], { size: 60, gone: 25.95, icon: t > 25.04 ? (c, x, y) => a2Grain(c, 'barley', x, y, 1.2, -0.2) : null });
    a2Echo(ctx, t, cam, 23.18, 1); a2Echo(ctx, t, cam, 25.04, 1.3);
    if (t > 30.58 && t < 31.85) { const [x, y] = abP(330, 640, cam); a2Tag(ctx, S, 'THUMP THUMP', x + 220, y - 140, t, 30.58, 31.6, { size: 46, rot: -0.06, col: '#ff8a9a' }); } } });

// ---------- S5 33.46-43.88: three jump cuts (rice, lentils, beans), the grain ring, the sesame seed unnoticed, he sits, he thinks ----------
const A2_JC = [33.46, 35.18, 35.72];
const A2_S5_CAM = (t) => t < 35.18 ? { x: 400, y: 690, zoom: 1.6 } : t < 35.72 ? { x: 400, y: 688, zoom: 1.5 } : K.camAt([[36.4, { x: 400, y: 690, zoom: 1.4 }], [42.3, { x: 520, y: 660, zoom: 1.15 }], [43.88, { x: 526, y: 660, zoom: 1.14 }]], t);
const A2_S5_X = (t) => kfn(t, [[37.6, 330], [38.7, 330], [39.4, 352], [40.0, 340]], 'inOut');
const A2_S5_SIT = 40.1, A2_S5_LAND = 40.38;
function a2S5Cassim(ctx, t, m) {
  const tc = AB_T2(t), P = { x: 380, y: 902, dir: -1, mouth: 'closed', gaze: [1, 0], lid: abLid(t, 64), tip: idleSway(tc, 65, 0.02, 2.4), sq: breathe(tc, 66, 0.02), fin: A2_GOLDRIM, brow: 0.4 }, o = { shc: A2_SH, fa: 0.35 };
  if (tc < 35.18) { P.handR = a2ArmHand(tc < 34.1 ? a2ArmVal(tc, 33.46) : 1 + 0.03 * osc(tc, 0.7)); P.handL = PERSON_HANDS.hipsHands.L; P.brow = 0.8; P.talk = abTalk(t, 33.6, 35.18, 7); P.mouth = P.talk ? 'open' : 'closed'; P.gaze = [1, -0.3]; P.tip = 0.04 + idleSway(tc, 65, 0.02, 2.4); }
  else if (tc < 35.72) { P.handR = [34, -180]; P.handL = [20, -176]; P.sq = 1.05; P.y = 896; P.lid = 1; P.talk = abTalk(t, 35.18, 35.72, 8); P.mouth = 'open'; P.tip = -0.06; o.fa = 0.55 + 0.1 * Math.sin(tc * 30); }
  else if (tc < 37.62) { P.x = 330; P.kneel = 1; P.tip = 0.12; P.handR = tc < 36.4 ? [70, -150 + 12 * Math.abs(Math.sin(tc * 26))] : [40, -110]; P.handL = [-20, -110]; P.lid = tc < 36.4 ? 0.6 : 0; P.mouth = tc < 36.4 ? 'open' : 'o';
    if (tc >= 36.4) { const a = tc * 2.2 * 1.0; P.gaze = [Math.cos(a), Math.sin(a) * 0.6]; P.tip = 0.03; } }
  else { const st = beatIn(tc, 37.62, 37.9); P.x = A2_S5_X(tc); Object.assign(P, walk(A2_S5_X, tc, { stride: 22 })); P.kneel = 1 - st; P.dir = -1;
    if (tc < 38.72) { P.handL = [26, -138]; P.handR = [40 + 6 * osc(tc, 0.25), -150 - 8 * Math.abs(osc(tc, 0.25))]; P.gaze = [0.6, 0.7]; P.talk = abTalk(t, 37.7, 38.7, 9) * 0.6; P.mouth = 'open'; P.brow = -0.3; P.x += tremble(tc, 0.8, 7); }
    else if (tc < A2_S5_SIT) { const a = tc * 4.4; P.gaze = [Math.cos(a), Math.sin(a) * 0.6]; P.tip = 0.08 * osc(tc, 0.9); P.tilt = -0.1 * osc(tc, 0.9); P.mouth = 'o'; P.handL = [-50, -110]; P.handR = [56, -116]; o.fa = 0.35 - 0.3 * osc(tc, 0.9); }
    else { const sd = K.clamp((tc - A2_S5_SIT) / 0.28); P.x = 340; P.amp = 0; P.sit = sd; P.seat = 'floor'; P.sq = landSquash(tc, A2_S5_LAND, 0.14) * breathe(tc, 66, 0.02); P.gaze = [0.2, 0.6]; P.lid = 0.4; P.mouth = 'closed'; P.brow = -0.4;
      const fl = beatIn(tc - 0.12, A2_S5_LAND, A2_S5_LAND + 0.3); P.handL = [K.lerp(-50, 6, fl), K.lerp(-110, -84, fl)]; P.handR = [K.lerp(56, 18, fl), K.lerp(-116, -88, fl)]; o.fa = 0.8 + lagged((u) => 0.4 * beatIn(u, A2_S5_SIT, A2_S5_LAND), tc, 0.15, 1);
      if (tc > 41.62) { P.tip = -0.12 * K.ease.inOut(beatIn(tc, 41.62, 41.95)); P.gaze = [1, 0.1]; P.lid = 0.3; }
      if (tc > 43.02) { P.tip = -0.08; P.handR = [16, -160]; P.handL = [-28 + 4 * Math.abs(osc(tc, 0.33)), -200]; P.lid = 0.4 + 0.6 * abBlinkAt(AB_T3(t), 43.5); P.gaze = [-0.4, -0.7]; } } }
  a2Cas(ctx, P, m, o); return P;
}
function a2S5Head(t) { const tc = AB_T2(t); if (tc < 37.62) return [330 - 6, 902 - 180]; if (tc < A2_S5_SIT) return [A2_S5_X(tc), 902 - 230]; return [340, 902 - 170]; }
function a2S5World(ctx, t, cam) {
  const tc = AB_T2(t); a2CaveWorld(ctx, t, cam, { door: { open: 0 }, dim: 0.85, liveT: 28.84 + 0.6 * (t - 28.84) });
  a2CoinTrail(ctx, {}); a2BigSack(ctx, t);
  const sl = K.ease.inOut(beatIn(tc, 41.62, 41.95)); a2Heap(ctx, t, { slump: sl });
  if (tc > 41.7 && tc < 43.88) for (let k = 0; k < 5; k++) { const u = ((t - 41.7) * 1.4 + k / 5) % 1; abBlob(ctx, 418 + u * 50, 892 + u * 18, 7, 3.5, '#ffcf3a', '#c07a12', { lw: 2, off: 2 }); }
  const [hx, hy] = a2S5Head(t), ring = tc >= 36.4 && tc < 41.6, sp = tc < 38.72 ? 1 : 2, kk = K.ease.back(K.clamp((tc - 36.4) / 0.4)), rain = tc > A2_S5_SIT ? (t - A2_S5_SIT) / 1.2 : null;
  const ro = { k: kk, speed: sp, rain, s: 1.7, rx: 165, ry: 64 };
  if (ring) a2Ring(ctx, hx, hy, tc, ro, 'back');
  const P = a2S5Cassim(ctx, t, 'cave');
  if (ring) a2Ring(ctx, hx, hy, tc, ro, 'front');
  if (tc >= 38.72 && tc < 41.6) { const u = (t - 38.72) / 2.9, sx = hx + 210 - 60 * u, sy = hy - 90 + 30 * Math.sin(u * 6); a2Grain(ctx, 'sesame', sx, sy, 0.9, t, { glow: 0.5 + 0.3 * Math.sin(t * 6) }); }
  if (tc > A2_S5_LAND && tc < A2_S5_LAND + 0.7) dustBurst(ctx, 340, 905, t - A2_S5_LAND, 6, 4, 9, 40, 0.6, 17);
}
AB_SHOTS.push({ a: 33.46, b: 43.88, ww: 1600, cam: A2_S5_CAM, under: a2CaveUnder(() => 0.34), world: a2S5World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    const [hx, hy] = abP(360, 900 - 240, cam);
    abSay(ctx, S, [[34.74, 'OPEN RICE?'], [35.18, 'OPEN RICE? LENTILS?'], [35.72, 'OPEN RICE? LENTILS? BEANS?']], t, 560, 280, [hx, hy], { size: 50, gone: 36.55, pop: true, icon: (c, x, y) => a2Grain(c, t < 35.18 ? 'rice' : t < 35.72 ? 'lentil' : 'bean', x, y, 1.1, 0) });
    if (t > 43.02) { const [tx, ty] = abP(345, 700, cam); thoughtCloud(ctx, 640, 360, 280, 190, t, { p: K.clamp((t - 43.02) / 0.35), tail: [tx + 20, ty - 20], inside: (c) => a2Grain(c, 'sesame', 500, 700, 3.6, 0.2, { blur: 5, glow: 0.4 }) });
      S.title(ctx, '?', 640, 380, K.clamp((t - 43.3) / 0.3), { size: 90, align: 'center', glow: '#ffd36a' }); } } });
