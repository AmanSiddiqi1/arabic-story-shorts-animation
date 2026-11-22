// ===== SIND-06 shots S15-S17 (108.68 - 132.9 s): the waking point of view, the farmers, the river's end, the village, the king =====

// ---------- S15a (108.68 - 112.86): the eyelid point of view (lids part over sky, sun, palm, then three faces and the child) ----------
const SB6_LIDS = [[108.68, 0], [108.85, 0.16], [109.0, 0.14], [109.08, 0], [109.25, 0], [109.45, 0.5], [109.6, 0.38], [109.85, 1], [110.6, 1], [110.72, 0.5], [110.95, 0.55], [111.1, 1]];
// a big face looking down into the view: a Library person at s, head centre at (hx, hy), rot about the head
function sbPovFace(c, draw, P, hx, hy, s, rot = 0) { const hd = -195 * s * (P.child ? 0.62 * 1.25 : 1); c.save(); c.translate(hx, hy); c.rotate(rot); draw(c, { ...P, x: 0, y: -hd, s: (P.child ? 1 : s) * (P.child ? s / 0.95 : 1) }); c.restore(); }
function sbS15Pov(ctx, t, S) { const tc = SB_T2(t), op = flow(SB_T3(t), SB6_LIDS), blur = t < 109.6 ? 14 : t < 110.0 ? 8 : t < 110.4 ? 3 : 0;
  sbLidPOV(ctx, op, blur, (c) => {
    sbGrad(c, 0, 0, 1000, 1230, [[0, '#4f8ae8'], [0.6, '#9ccaf4'], [1, '#d8eefa']]);
    sbCloud(c, 300, 300, 420, 70, 'rgba(255,255,255,0.85)', 'rgba(200,190,240,0.4)', 10); sbCloud(c, 760, 900, 380, 60, 'rgba(255,255,255,0.8)', 'rgba(200,190,240,0.4)', 10);
    sbSun(c, 730, 290, 70, '#fff6d0', '#ffe0a0', 1.2);
    if (t > 110.4 && t < 111.6) bird(c, { kind: 'dove', pal: 0, x: K.lerp(1050, 450, (t - 110.4) / 1.2), y: 300 + 20 * Math.sin(t * 4), s: 0.9, dir: -1, fly: true, flap: Math.sin(tc * 20) });
    // a palm frond swaying in from the top left
    c.save(); c.translate(-40, -60); c.rotate(0.7 + 0.06 * Math.sin(tc * 1.4)); for (let i = 0; i < 9; i++) { const u = i / 8; celShade(c, [[u * 520, 0], [u * 520 + 40, 18], [u * 520 + 60 - 30, 150 - 60 * u], [u * 520 + 10, 140 - 60 * u]], '#3faa5a', '#1f7a3a', { light: [-1, -1], off: 8, lw: 2.5 }); } seg(c, 0, 0, 560, 20, 10, '#7a8a3a', 2); c.restore();
    // the faces: the old farmer (shading hand first), two more from the other side, the child upside down from the top
    if (t > 111.2) { const e = K.ease.out(K.clamp((t - 111.2) / 0.4)); sbPovFace(c, (q, P) => sbFarmer(q, 0, P), sbLive(t, 81, { dir: 1, gaze: [0.2, 0.8], brow: 0.6, mouth: 'closed', handR: [60, -230], tip: 0.05 }), K.lerp(-200, 260, e), 620, 2.6, 0.25); }
    if (t > 111.8) { const e = K.ease.out(K.clamp((t - 111.8) / 0.35)); sbPovFace(c, (q, P) => sbFarmer(q, 1, P), sbLive(t, 82, { dir: -1, gaze: [-0.3, 0.8], mouth: 'o', brow: 0.3 }), K.lerp(1250, 800, e), 520, 2.5, -0.3); }
    if (t > 112.1) { const e = K.ease.out(K.clamp((t - 112.1) / 0.35)); sbPovFace(c, (q, P) => sbFarmer(q, 2, P), sbLive(t, 83, { dir: -1, gaze: [-0.5, 0.7], mouth: 'smile' }), K.lerp(1250, 860, e), 980, 2.5, -0.6); }
    if (t > 112.4) { const e = K.ease.out(K.clamp((t - 112.4) / 0.3)); sbPovFace(c, (q, P) => sbChild(q, P), sbLive(t, 84, { dir: 1, child: true, gaze: [0, -0.8], mouth: 'smile', grin: true }), 520, K.lerp(-300, 220, e), 2.3, Math.PI); }
    if (t < 109.9) { c.fillStyle = `rgba(255,250,236,${(1 - K.clamp((t - 108.68) / 1.2)).toFixed(3)})`; c.fillRect(0, 0, 1000, 1230); }
  });
}
SB_SHOTS.push({ a: 108.68, b: 112.86, panel: sbS15Pov });

// ---------- S15b-S16 (112.86 - 122.96): the river's end, WE ARE FARMERS., the mime, the water bowl, the donkey ride to the village ----------
const SB6_DKX = (t) => kfn(t, [[112.86, 1010], [120.85, 1010], [122.2, 2120]], 'inOut');
const SB6_CAM16 = [[112.86, { x: 900, y: 547, zoom: 0.9 }], [113.92, { x: 920, y: 547, zoom: 0.9 }], [114.2, { x: 920, y: 615, zoom: 1 }], [118.0, { x: 930, y: 615, zoom: 1 }], [118.9, { x: 760, y: 461, zoom: 0.8 }], [119.8, { x: 800, y: 461, zoom: 0.8 }], [120.8, { x: 1200, y: 547, zoom: 0.9 }], [122.2, { x: 2150, y: 547, zoom: 0.9 }], [122.96, { x: 2170, y: 547, zoom: 0.9 }]];
function sbS16World(ctx, t, cam) { const tc = SB_T2(t), RX = 830, RY = 950 + 2 * Math.sin(tc * 1.8), ride = t > 120.6 && t < 122.5;
  sbVillage(ctx, t, cam);
  // villagers at their doors wave as the donkey arrives (121.3 - 122.96)
  if (t > 120.8) [[1960, 'villageWoman', '#e8a0c0'], [2180, 'villager', '#5a9ae0'], [2400, 'villageWoman', '#ffd36a']].forEach(([x, cos, col], i) => { const P = sbLive(t, 90 + i, { x: x + 40, y: 900, s: 0.8, dir: -1, costume: cos, pal: { robe: col, dot: col, sleeve: col }, gaze: [-1, 0], mouth: 'smile' }); if (t > 121.3 + i * 0.2) P.handR = [64 + 8 * osc(tc + i * 0.3, 0.4 + i * 0.1), -196]; if (i === 0 && t > 121.8) { P.handR = PERSON_HANDS.pointFwd.R; P.handL = PERSON_HANDS.cupMouth.R; P.mouth = 'open'; } person(ctx, P); });
  // the raft nosed into the reeds
  sbRaft(ctx, { x: RX, y: RY, rot: -0.04, build: 1, pole: 1, flag: 1, lamp: 0.08, cargo: { food: t < 120.0, skin: 1, gems: t < 120.3 ? 8 : 0, glow: 0.6 }, t, rider: t < 113.3 ? (c) => sbSin6(c, sbLive(t, 11, { x: 0, y: -8, lie: 1, dir: 1, gaze: [0.2, -1], lid: 0.4, mouth: 'o' })) : null });
  // sheep and the donkey
  for (let i = 0; i < 2; i++) { const sx = ride ? (u) => SB6_DKX(u) - 200 - i * 70 : () => 1240 + i * 80; const S0 = { ...walk(sx, tc, { stride: GAIT.sheep * 0.5 }), y: 912 + i * 6, s: 0.5, dir: ride ? 1 : -1, kind: i ? 'lamb' : 'ewe', headDown: ride ? 0 : 0.5 + 0.5 * Math.sin(tc + i), chew: ride ? 0 : (tc * 3 + i) % 1, pal: i }; sheep(ctx, S0); }
  const D = { ...walk(SB6_DKX, tc, { stride: GAIT.donkey * 0.6 }), y: 915, s: 0.62, dir: 1, pal: 1, earL: idleSway(tc, 44, 0.4, 1.4) - (t > 120.0 && t < 120.5 ? 0.8 : 0), earR: idleSway(tc, 45, 0.4, 1.9), bray: t > 122.5 ? Math.sin(Math.PI * K.clamp((t - 122.5) / 0.45)) : 0, snort: t > 120.3 && t < 120.6 ? 1 : 0 };
  const riding = t > 120.4 && t < 122.35;
  if (riding) rideOn(ctx, 'donkey', D, { costume: 'villager', s: 0.95, age: 0, pal: { ...SB_SIN, shoes: 'bare' }, gaze: [1, -0.1], lid: 0.55, mouth: 'smile', tip: 0.08 * Math.sin(tc * 2.5), lurch: 0 }, { reins: false }); else donkey(ctx, D);
  // the farmers
  const F0 = sbLive(t, 81, { x: 980, y: 920, dir: -1, gaze: [-1, 0.2], mouth: 'smile' }, [114.0]), F1 = sbLive(t, 82, { x: 1060, y: 916, dir: -1, gaze: [-1, 0.1], hoe: -1.3 }), F2 = sbLive(t, 83, { x: 1130, y: 922, dir: -1, gaze: [-1, 0.2], mouth: 'smile' }), Ch = sbLive(t, 84, { x: 760, y: 1010, dir: 1, child: true, gaze: [1, -0.4], mouth: 'smile', grin: true });
  if (t < 115.4 && t > 113.92) { F0.tip = 0.15 * sbF(t, [[113.92, 0], [114.2, 1], [114.9, 1], [115.3, 0]]); F0.handR = PERSON_HANDS.chest.R; F0.talk = sbTalk(t, 114.0, 115.3, 9); F0.mouth = 'open'; }
  if (t > 115.4 && t < 116.9) { F1.handR = [40, -240]; F1.hoe = -1.6 + 0.2 * Math.sin(tc * 3); F2.handL = [50, -200]; F2.basket = 1; }
  if (t > 116.9 && t < 118.0) { const k = Math.floor((t - 116.9) / 0.37); F1.hoe = false; if (k === 0) F1.handR = PERSON_HANDS.pointFwd.R; else if (k === 1) { F1.handR = PERSON_HANDS.pointDown.R; } else { const p = osc(tc, 0.3); F1.handR = [60 + 30 * p, -150]; F1.handL = [40 + 30 * p, -160]; F1.tip = -0.1 * p; } F1.talk = sbTalk(t, 116.9, 118.0, 10); }
  if (t < 115.4 || t > 118.0) F2.basket = t < 120.3 ? 1 : 1;
  if (t > 118.6 && t < 119.8) { Ch.x = 790; Ch.handRW = [830, 870]; Ch.handLW = [815, 875]; Ch.gaze = [1, -0.6]; if (t > 119.3) { Ch.handRW = [905, 938]; Ch.handLW = null; Ch.eyes = 'wide'; Ch.mouth = 'o'; } }
  // the walk: old farmer leads, the child skips ahead, the tall one carries the hoe on his shoulder
  if (t > 120.6) { const lead = (dx) => (u) => SB6_DKX(u) + dx; Object.assign(F0, walk(lead(90), tc, { stride: 22 })); F0.dir = 1; F0.y = 915; F0.handLW = [SB6_DKX(t) + 40, 830]; F0.gaze = [1, 0];
    const cx = lead(190), jt = (t * 2.2) % 1; Object.assign(Ch, walk(cx, tc, { stride: 18 })); Ch.dir = 1; Ch.y = 940 - 16 * Math.sin(Math.PI * jt); Ch.handRW = null; Ch.gaze = [1, -0.3]; Ch.aL = [2.4, 2.6]; Ch.aR = [2.4, 2.6];
    Object.assign(F1, walk(lead(-110), tc, { stride: 24 })); F1.dir = 1; F1.y = 915; F1.hoe = -2.6; F1.handR = [20, -200]; Object.assign(F2, walk(lead(-60), tc, { stride: 22 })); F2.dir = 1; F2.y = 925; F2.basket = 1; F2.handL = [40, -110]; }
  // two farmers lift him by the elbows onto the donkey (119.82 - 120.6)
  if (t > 119.82 && t < 120.6) { F0.x = 900; F1.x = 1080; F0.dir = 1; F1.dir = -1; F0.handRW = [960, 780]; F1.handLW = [1000, 780]; F0.tip = -0.1; F1.tip = -0.1; F1.hoe = false; }
  groundShadow(ctx, Ch.x, Ch.y > 960 ? Ch.y + 2 : 942, 50, Ch.y > 960 ? 0 : 940 - Ch.y, { flat: true });
  sbChild(ctx, Ch); if (t > 118.6 && t < 119.35) { const h = sbHandW(Ch, 1); sbBowl(ctx, h[0], h[1], 0, 1); }
  for (const [i, P] of [[0, F0], [1, F1], [2, F2]]) sbFarmer(ctx, i, P);
  // Sinbad: sits up and shields his eyes (113.3), sits on the raft edge, drinks (3 bobs), is lifted, rides, slides off and pats the donkey
  if (!riding && t > 113.3) { const P = sbLive(t, 11, { x: 870, y: 945, dir: 1, sit: 1, seat: 'bench', gaze: [1, -0.1], mouth: 'smile', bare: true, wind: 0 }, [118.2, 118.6]);
    if (t < 113.92) { P.handR = PERSON_HANDS.shield.R; P.lid = 0.6; P.tip = 0.06 * Math.sin(tc * 5); P.mouth = t > 113.7 ? 'open' : 'closed'; }
    else if (t < 116.9) { P.gaze = lookAt([870, 700], [t < 115.4 ? 980 : 1090, 700]); P.handL = [-40, -82]; }
    else if (t < 118.0) { P.gaze = gazePlan(SB_T3(t), [[116.9, [1, 0]], [117.3, [-0.3, 0.6]], [117.7, [1, 0]]], 0.12); }
    else if (t < 118.6) { P.gaze = [-1, -0.2]; P.look = 0.6 * osc(tc, 0.35); P.mouth = 'smile'; }
    else if (t < 119.82) { P.handRW = [840, 860 - 40 * K.clamp((t - 118.8) / 0.2)]; P.handLW = [825, 870 - 40 * K.clamp((t - 118.8) / 0.2)]; P.tilt = -0.2; P.drop = t > 118.9 && t < 119.35 ? 4 * Math.abs(Math.sin(tc * 14)) : 0; P.gaze = t > 119.35 ? [1, 0.3] : [0.2, -0.4]; P.mouth = t > 119.35 ? 'open' : 'closed'; }
    else { const up = K.clamp((t - 119.82) / 0.6); P.sit = 1 - up; P.x = K.lerp(870, 990, up); P.y = K.lerp(945, 880, up); P.aL = [1.2, 0.6]; P.aR = [1.2, 0.6]; P.tip = 0.05 * Math.sin(tc * 9); P.mouth = 'o'; }
    if (t > 122.35) { P.x = SB6_DKX(t) - 30; P.y = 902; P.sit = 0; P.dir = 1; P.handRW = [SB6_DKX(t) + 70, 830 + 6 * Math.abs(osc(tc, 0.3))]; P.sq *= landSquash(tc, 122.4, 0.12); P.gaze = [1, -0.1]; P.aL = undefined; P.aR = undefined; }
    if (t < 120.4 || t > 122.35) sbSin6(ctx, P); }
  sbVillageFront(ctx, t, { skip: [720, 940] });
}
function sbS16Over(ctx, t, cam, S) {
  if (t > 114.05 && t < 115.6) { const p = sbP(980, 690, cam); sbSay(ctx, S, [[114.1, 'WE ARE FARMERS.']], t, p[0] + 60, p[1] - 240, [p[0], p[1]], { gone: 115.4 }); }
  if (t > 118.6 && t < 119.9) { const p = sbP(900, 950, cam); sbTag(ctx, S, "THE RIVER'S END", p[0] + 40, 200, t, 118.6, 119.7, { size: 48 }); S.arrow(ctx, [p[0] + 40, 250], [p[0], p[1] - 30], K.clamp((t - 118.7) / 0.4), { bend: 0.1 }); }
}
SB_SHOTS.push({ a: 112.86, b: 122.96, cam: sbKeys(SB6_CAM16), world: sbS16World, over: sbS16Over });

// ---------- S17 (122.96 - 132.9): the palace hall: the tale, the pebble, the robe of honour, the plea, SEND MY SHIP!, the sail in the door ----------
const SB6_HALL = { variant: 'palace', wall: 'paper' };
function sbHallOut6(c, t) { const sea = { hz: 640, y: [650, 690, 800, 870], amp: 3, pal: 'day' }; sbSky(c, 'day', { x: 500 }); sbSeaBack(c, t, sea, -100, 400);
  const sail = K.ease.out(K.clamp((t - 131.1) / 0.7)); sbDhow(c, { x: 150, y: 820, s: 0.42, dir: 1, sail, billow: 0.6, t, stripe: '#f2b01e' });
  for (let i = 0; i < 2; i++) { const u = K.clamp((t - 131.2 - i * 0.25) / 0.7); if (u <= 0 || u >= 1) continue; person(c, { x: K.lerp(40, 120, u), y: K.lerp(880, 790, u), s: 0.4, dir: 1, ph: u * 20, amp: 1, costume: 'servant', pal: { robe: i ? '#2aa39a' : '#e0a82a', dot: i ? '#2aa39a' : '#e0a82a' } }); }
  c.fillStyle = '#e6c898'; c.fillRect(-50, 880, 400, 60); }
const SB6_CAM17 = [[122.96, { x: 500, y: 615, zoom: 1 }], [124.9, { x: 500, y: 615, zoom: 1 }], [125.6, { x: 560, y: 615, zoom: 1.04 }], [127.6, { x: 560, y: 615, zoom: 1.04 }], [128.4, { x: 470, y: 615, zoom: 1.04 }], [131.1, { x: 470, y: 615, zoom: 1.04 }], [132.9, { x: 430, y: 640, zoom: 1.08 }]];
const SB6_KGX = (t) => kfn(t, [[126.38, 760], [127.0, 470], [128.0, 470], [128.5, 620]], 'inOut');
const SB6_SRUN = (t) => kfn(t, [[132.0, 380], [132.9, 120]], 'in');
function sbS17World(ctx, t, cam) { const tc = SB_T2(t), A = palaceHall(ctx, { ...SB6_HALL, outside: (c) => sbHallOut6(c, t), t, lamps: [[380, 250], [930, 250]], light: 1 });
  // magenta and gold banners, the fruit bowl, cushions, a caged songbird
  for (const [bx, col] of [[300, '#c03a8a'], [770, '#ffd36a']]) { celShade(ctx, [[bx - 30, 380], [bx + 30, 380], [bx + 30, 560], [bx, 530], [bx - 30, 560]], col, sbDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3 }); shape(ctx, ell(bx, 440, 12, 12, 14), col === '#ffd36a' ? '#c03a8a' : '#ffd36a', { lw: 2 }); }
  celShade(ctx, K.rectPts(890, 870, 90, 30), '#a86a3a', '#6a3a1e', { light: [-1, -1], off: 5, lw: 2.5 }); shape(ctx, ell(935, 868, 34, 10, 16), '#e8b84a', { lw: 2.5 }); for (const [fx, fc] of [[920, '#e8364f'], [942, '#ffd36a'], [956, '#7ab84a']]) sbBlob(ctx, fx, 856, 10, 10, fc, sbDark(fc, 0.3), { lw: 2, off: 3 });
  for (const [cx, col] of [[290, '#d85a7a'], [700, '#5a9ae0']]) sbBlob(ctx, cx, 892, 44, 14, col, sbDark(col, 0.3), { lw: 2.5 });
  ctx.save(); ctx.strokeStyle = '#c89a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(660, 300); ctx.lineTo(660, 340); ctx.stroke(); for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(660, 340); ctx.quadraticCurveTo(660 + k * 12, 360, 660 + k * 10, 420); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(660, 420, 32, 6, 0, 0, 7); ctx.stroke(); ctx.restore();
  bird(ctx, { kind: 'sparrow', pal: 2, x: 660, y: 410, s: 0.35, dir: osc(tc, 3) > 0 ? 1 : -1, beak: t % 2 < 0.3 ? 0.8 : 0 });
  // the vizier: one beat late in everything, then first to the door
  const VX = (u) => kfn(u, [[130.6, 620], [131.6, 260]], 'inOut'), V = sbLive(t, 183, { ...walk(VX, tc, { stride: 26 }), y: 900, dir: -1, gaze: [-1, 0.1], handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L });
  if (t > 125.9 && t < 126.8) { V.tip = 0.3; V.gaze = [-1, 0.5]; V.handR = [30, -175]; }
  if (t > 130.6) { V.handR = null; V.handL = null; V.aL = [1.0, 0.6]; V.aR = [1.0, 0.6]; V.tip = 0.15; V.mouth = 'o'; }
  sbRViz(ctx, V);
  // the king: leans in (124.9), rises and comes down with the robe (126.38), back to the dais; claps twice and points to the port (130.5)
  const kx = SB6_KGX(t), K0 = sbLive(t, 184, { x: kx, y: t < 126.38 ? A.throne.sitY : 900, dir: -1, gaze: [-1, 0.1], mouth: 'smile' });
  let crown = null;
  if (t < 126.38) { K0.sit = 1; K0.seat = 'bench'; if (t > 124.9) { const ln = sbF(t, [[124.9, 0], [125.3, 1], [126.3, 1]]); K0.tip = 0.25 * ln; K0.handR = PERSON_HANDS.chin.R; K0.eyes = 'wide'; crown = { dx: -6 * ln, dy: 0, rot: -0.25 * ln + (t > 125.5 ? 0.25 * K.clamp((t - 125.5) / 0.2) : 0) }; } }
  else if (t < 127.0) { Object.assign(K0, walk(SB6_KGX, tc, { stride: 22 })); K0.y = kx > 560 ? 860 : 900; K0.handL = [60, -150]; K0.handR = [70, -160]; }
  else if (t < 128.0) { K0.handLW = [400, 720]; K0.handRW = [360, 720 + 6 * Math.abs(osc(tc, 0.3))]; K0.mouth = 'smile'; crown = { dx: 0, dy: -10 * pulse(t, 127.3, 0.3), rot: 0 }; }
  else if (t < 128.5) { Object.assign(K0, walk(SB6_KGX, tc, { stride: 22 })); K0.dir = 1; }
  else { K0.dir = -1; K0.gaze = t > 129.6 && t < 130.4 ? gazePlan(SB_T3(t), [[129.6, [-1, 0]], [129.9, [-1, -0.3]], [130.15, [-1, 0]]], 0.1) : [-1, 0]; K0.drop = 6 * pulse(t, 130.2, 0.4); if (t > 130.5 && t < 131.1) { const cl = Math.abs(osc(tc, 0.25)); K0.handL = [40, -150 + 10 * cl]; K0.handR = [40 + 20 * cl, -150]; K0.mouth = 'open'; } if (t > 131.1) { K0.handR = PERSON_HANDS.pointFwd.R; K0.mouth = 'open'; } }
  sbRKing(ctx, { ...K0, crown });
  if (t > 126.38 && t < 127.0) { const h = sbHandW(K0, 1); celShade(ctx, [[h[0] - 30, h[1]], [h[0] + 30, h[1]], [h[0] + 40, h[1] + 120], [h[0] - 40, h[1] + 120]], '#fbf3df', '#e0cfa8', { light: [-1, -1], off: 8, lw: 2.5, line: '#a8803a' }); }
  // the old farmer two paces behind Sinbad: nods along; waves him on at the end
  const F = sbLive(t, 81, { x: 220, y: 900, dir: 1, gaze: [1, -0.2], mouth: 'smile' }); if (t > 124.0 && t < 124.9) F.drop = 5 * Math.abs(Math.sin(tc * 6)); if (t > 132.0) { F.dir = -1; F.aL = [2.4 + 0.3 * osc(tc, 0.3), 2.6]; F.aR = [2.4 - 0.3 * osc(tc, 0.3), 2.6]; F.mouth = 'open'; } sbFarmer(ctx, 0, F);
  // Sinbad: tells it with his whole body (122.96), the hand sliding low for the roof, the pebble held up, the knee, the plea, the run
  const run = t > 132.0, P = sbLive(t, 11, { x: run ? SB6_SRUN(t) : 380, y: 900, dir: run ? -1 : 1, gaze: [1, -0.25], mouth: 'smile', wind: run ? 1 : 0, robe: K.clamp((t - 126.6) / 0.3), robeFly: run ? 1 : 0 }, [127.64]);
  if (run) Object.assign(P, walk(SB6_SRUN, tc, { stride: 34 }));
  if (t < 124.0) { const a = sbF(t, [[122.96, 0], [123.3, 1], [123.6, 1], [124.0, 0.3]]); P.aL = [0.3 + 2.2 * a, 0.3 + 2.0 * a]; P.aR = [0.3 + 2.2 * a, 0.3 + 2.0 * a]; if (t > 123.6) { P.aL = undefined; P.aR = undefined; P.handR = [100, -80]; } P.talk = sbTalk(t, 122.96, 124.9, 2); P.mouth = 'open'; }
  else if (t < 125.6) { P.talk = sbTalk(t, 124.0, 125.5, 3); P.handR = [80, -150]; }
  else if (t < 126.38) { P.handR = [70, -230]; P.gaze = [1, -0.6]; }
  else if (t < 127.64) { P.gaze = [1, -0.3]; P.handR = PERSON_HANDS.chest.R; }
  else if (!run) { const kn = sbF(t, [[127.64, 0], [127.9, 1], [131.6, 1], [132.0, 0]]); P.kneel = kn; P.handL = PERSON_HANDS.chest.R; P.handR = t < 130.5 ? [-110, -150] : PERSON_HANDS.chest.R; P.dir = 1; P.brow = 0.7; P.mouth = 'open'; P.talk = sbTalk(t, 128.86, 129.6, 4); P.gaze = [1, -0.4]; if (t > 129.6) P.mouth = 'closed'; if (t > 131.1) { P.gaze = [-1, -0.2]; P.mouth = 'smile'; } }
  const Q = sbSin6(ctx, P);
  if (t > 125.6 && t < 126.5) { const h = sbHandW(Q, 1); sbPebble(ctx, h[0], h[1] - 10, 10, 0, { glow: 0.8, glint: (t - 125.7) / 0.5 }); const kh = sbPt(K0, [0, 0]); sbGlow(ctx, kh[0], kh[1], 70, 0.5, '#ff4a6a'); }
}
function sbS17Over(ctx, t, cam, S) {
  if (t > 124.0 && t < 125.0) { const hd = sbP(380, 690, cam); thoughtCloud(ctx, 330, 300, 380, 250, t, { p: K.clamp((t - 124.0) / 0.35), tail: [hd[0] + 20, hd[1] - 40], fill: '#fff6ea', scale: 0.5, at: [500, 620], seed: 15, inside: (k) => sbBalloonRaft(k, t) }); }
  if (t > 129.6 && t < 130.9) { const hd = sbP(380, 760, cam); thoughtCloud(ctx, 330, 300, 380, 250, t, { p: K.clamp((t - 129.6) / 0.35), tail: [hd[0] + 20, hd[1] - 40], fill: '#fff6ea', scale: 0.5, at: [500, 620], seed: 16, inside: (k) => sbBalloonFlag(k, t) }); }
  if (t > 128.85 && t < 129.8) { const p = sbP(380, 760, cam); sbSay(ctx, S, [[128.9, 'MY FRIENDS ARE STILL WAITING!']], t, 500, p[1] - 300, [p[0], p[1] - 40], { gone: 129.6, size: 40 }); }
  if (t > 130.55 && t < 131.9) { const p = sbP(620, 680, cam); sbSay(ctx, S, [[130.6, 'SEND MY SHIP!']], t, 680, p[1] - 250, [p[0], p[1]], { gone: 131.7, size: 50 }); }
}
// inside the story balloon: the little raft with its lantern in a dark arch, gem dots glowing; then the mountain with the striped flag
function sbBalloonRaft(c, t) { sbGrad(c, 100, 380, 800, 500, [[0, '#4a3a6a'], [1, '#2f5f6f']]); for (let i = 0; i < 12; i++) { const x = 200 + i * 55, y = 450 + (i * 97) % 200; sbGlow(c, x, y, 26, 0.7, SB_GEMV[i % 5]); }
  c.fillStyle = '#1f7f8f'; c.fillRect(100, 720, 800, 200); sbRaft(c, { x: 500, y: 716, build: 1, pole: 1, flag: 1, lamp: 0.8, cargo: { gems: 9, food: 1 }, t, rider: (q) => sbSin6(q, sbLive(t, 11, { x: 0, y: -10, kneel: 1, dir: 1 })) }); sbGlow(c, 400, 600, 160, 0.5, '#ffc870'); }
function sbBalloonFlag(c, t) { sbGrad(c, 100, 380, 800, 500, [[0, '#86c2f6'], [1, '#d2ecfa']]); celShade(c, [[180, 800], [430, 420], [640, 520], [820, 800]], '#e8a0a0', '#b07a8a', { light: [-1, -1], off: 30, lw: 4 }); c.fillStyle = '#f4dcb0'; c.fillRect(100, 790, 800, 120); sbSignal(c, 420, 800, 1, t); sbFire(c, 360, 800, t, { s: 0.6 }); }
SB_SHOTS.push({ a: 122.96, b: 132.9, cam: sbKeys(SB6_CAM17), world: sbS17World, over: sbS17Over });
