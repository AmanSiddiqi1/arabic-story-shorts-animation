// ===== KD-031 road and grove: S8 (the long walk), S9-S14 (the fig tree, the flight, the reward, the dig) =====
const K31TRUNK = 700, K31BR = [430, 700], K31BRY = 520;     // trunk centre, branch x range, branch centre line
const K31JAR = { x: 640, y: 1080, s: 0.8 };                  // the buried jar (base centre)
const K31WIN = { x: 640, y: 1040, r: 125 };                  // the ground window over it
const K31FIGS = [[560, 300], [640, 230], [760, 260], [830, 360], [700, 130], [600, 380], [880, 300], [520, 350]];

// ---------- S8: the country road ----------
const k31roadX = (t) => k31kv(t, [[74.52, 300], [79.2, 1330], [79.6, 1350]], 'lin');
function k31drawS8(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom;
  countryRoad(ctx, { w: 2400, city: 'left', camX, house: { x: 2280, lit: 0 }, places: [{ kind: 'milestone', x: 1100 }, { kind: 'bush', x: 1180, w: 200, h: 110 }, { kind: 'tree', x: 1620 }, { kind: 'tree', x: 1880, small: true }, { kind: 'tree', x: 2120 }] });
  sun(ctx, camX * 0.85 + 760, 170, t);
  const xf = (tt) => k31kv(tt, [[74.52, 300], [78.6, 1200], [79.25, 1300]], 'out');
  const P = k31man({ ...walk(xf, t, { stride: 34 }), dir: 1, seed: 11, handL: K31CARRYHL, handR: K31CARRYHR });
  P.gaze = t < 78.52 ? [1, 0.05] : [0.8, -0.6]; P.mouth = t < 76.78 ? 'closed' : 'smile';
  if (t >= 76.78 && t < 78.0) { P.tip = 0.08; P.lid = Math.max(0.3, blink(t, 4)); P.handL = k31kv(t, [[76.78, K31CARRYHL], [77.0, [-14, -205]], [77.35, [-14, -205]], [77.6, K31CARRYHL]]); }
  if (t >= 79.2) { P.sq = breathe(t, 1, 0.02); P.drop = -4; }
  const cg = k31carried(P), bob = 3 * Math.sin(P.ph * 2) * P.amp;
  const A = { x: cg.x + 30, y: k31cagePerch(cg.y, 0.75) + bob, s: 0.72, dir: 1, pal: 0, seed: 3, crest: 0.05, lid: Math.max(0.5, blink(t, 3)), tip: 0.05 * Math.sin(P.ph * 2) },
    B = { x: cg.x - 24, y: k31cagePerch(cg.y, 0.75) + bob * 0.8, s: 0.72, dir: 1, pal: 1, seed: 7, crest: 0.05, lid: Math.max(0.4, blink(t, 7)), tip: 0.05 * Math.sin(P.ph * 2 + 1.2) };
  if (t >= 78.52) { B.crest = 0.5 * k31e(t, 78.52, 0.4); B.lid = blink(t, 7); B.gaze = [0.7, -0.7]; A.crest = 0.5 * k31e(t, 78.62, 0.4); A.lid = blink(t, 3); A.gaze = [0.7, -0.7]; A.drop = -4; B.drop = -4; }
  person(ctx, P); k31cage(ctx, cg.x, cg.y, 0.75, 'back'); k31hoopoe(ctx, B); k31hoopoe(ctx, A); k31cage(ctx, cg.x, cg.y, 0.75, 'front', { latch: 1 });
  countryRoad(ctx, { w: 2400, front: true, occlude: [] });
  return { man: P };
}

// ---------- the grove set ----------
function k31groveBack(ctx, t) {
  ctx.drawImage(bake('k31grove', K31W, K31H, (c) => { sky(c); hillTrees(c); treeRow(c, { hmin: 360 }); ground(c); bush(c, { x: 110, w: 240, h: 150, seed: 5 }); bush(c, { x: 930, w: 200, h: 120, seed: 9 }); }), 0, 0, K31W, K31H);
  sun(ctx, 180, 150, t); cloudFlat(ctx, 300 + ((t * 5) % 900), 210, 0.7);
}
// branch dip from landings and hops (springs)
function k31dip(t) { let d = 0; for (const [a, amp] of [[89.28, 10], [89.85, 8], [121.4, 3], [121.75, 3], [141.6, 2], [141.9, 2], [149.18, 8], [149.35, 6]]) if (t >= a) d += K.spring(t, a, amp, 3.2, 5); return d; }
// top surface of the branch at x (where the birds' feet go)
function k31perchY(x, t) { const u = K.clamp((K31TRUNK - x) / (K31TRUNK - K31BR[0])); return K31BRY - K.lerp(14, 6, u) + k31dip(t) * Math.pow(u, 1.4); }
function k31tree(ctx, t, figGlint = -1) {
  const sway = (i) => 2 * Math.sin(t * 1.3 + i * 1.7);
  shape(ctx, [[K31TRUNK - 55, 904], [K31TRUNK - 47, 330], [K31TRUNK + 47, 330], [K31TRUNK + 55, 904]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  const dip = k31dip(t), pts = []; for (let i = 0; i <= 10; i++) { const x = K.lerp(K31TRUNK - 20, K31BR[0], i / 10), u = K.clamp((K31TRUNK - x) / (K31TRUNK - K31BR[0])), h = K.lerp(14, 6, u); pts.push([x, K31BRY - h + dip * Math.pow(u, 1.4)]); }
  for (let i = 10; i >= 0; i--) { const x = K.lerp(K31TRUNK - 20, K31BR[0], i / 10), u = K.clamp((K31TRUNK - x) / (K31TRUNK - K31BR[0])), h = K.lerp(14, 6, u); pts.push([x, K31BRY + h + dip * Math.pow(u, 1.4)]); }
  shape(ctx, pts, WOOD, { lw: 6, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  shape(ctx, [[475, K31BRY - 6 + dip * 0.9], [455, K31BRY - 40 + dip * 0.9], [440, K31BRY - 22 + dip * 0.9]], GREEN, { lw: 4, seed: 32 });
  const crowns = [[700, 250, 170], [570, 330, 120], [830, 330, 120], [700, 150, 110]].map(([x, y, r], i) => [x + sway(i), y, r]);
  for (const [cx, cy, cr] of crowns) { ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.fillStyle = GREEN; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.stroke(); }
  for (const [cx, cy, cr] of crowns) { ctx.beginPath(); ctx.arc(cx, cy, cr - 4, 0, 7); ctx.fillStyle = GREEN; ctx.fill(); ctx.fillStyle = dotPat(ctx, GREEND, 11, 0.28); ctx.fill(); }
  K31FIGS.forEach(([x, y], i) => { const sw = i === 2 || i === 5 ? 0.15 * Math.sin(t * 2.4 + i) : 0; fig(ctx, x + sway(i % 4), y, 17, sw);
    if (figGlint >= 0 && (i === 1 || i === 3 || i === 6)) { const a = figGlint + [0, 0.3, 0.6][[1, 3, 6].indexOf(i)]; if (t > a && t < a + 0.4) star(ctx, x + 10, y - 10, 13 * Math.sin(Math.PI * (t - a) / 0.4), C.white); } });
}

// ---------- the man in the grove ----------
const k31groveX = (t) => k31kv(t, [[79.6, 170], [95.2, 170], [95.7, 330], [110.24, 330], [110.8, 370], [129.5, 370], [130.3, 505], [147.5, 505], [147.8, 492], [148.4, 492], [149.8, 230]]);
function k31manGrove(t, birds) {
  const xf = k31groveX, P = k31man({ ...walk(xf, t, { stride: t > 148 ? 24 : 34 }), dir: 1, seed: 11 });
  const bA = birds.A, bB = birds.B, mid = [(bA.x + bB.x) / 2, Math.min(bA.y, bB.y) - 30];
  let cage = null, jarHands = null;
  P.gaze = lookAt(k31head(P), mid);
  if (t < 89.28) {   // S9: the release
    P.kneel = settleTo(t, 79.96, 0, 1, 0.5, 0.06); P.sq = anticipate(t, 79.8, 0.2, 0.06);
    const set = k31e(t, 80.0, 0.6), carry = k31carried(P);
    cage = { x: K.lerp(carry.x, 270, set), y: K.lerp(carry.y, 900, set) - 3 * pulse(t, 80.6, 0.15) };
    P.handL = set < 1 ? k31W2L(P, [cage.x - 62, cage.y - 75]) : [10, -96]; P.handR = set < 1 ? k31W2L(P, [cage.x + 62, cage.y - 75]) : [40, -96];
    if (t >= 80.6 && t < 81.62) { P.handR = k31W2L(P, [k31kv(t, [[80.6, 300], [81.02, 296], [81.6, 250]]), 852]); P.gaze = lookAt(k31head(P), [270, 840]); }
    if (t >= 81.62) { P.handL = [-58, -96]; P.handR = [58, -96]; P.tip = -0.08 * k31e(t, 81.62, 0.5); P.lid = Math.max(0.2, blink(t, 4)); P.mouth = 'smile'; P.gaze = lookAt(k31head(P), [270, 830]); }
    if (t >= 83.3) P.gaze = lookAt(k31head(P), [bA.x, bA.y - 30]);
    if (t >= 84.94) { const k = k31e(t, 84.94, 0.35) * (1 - k31e(t, 86.6, 0.5)); P.kneel = 1 - 0.5 * k; P.handL = k31lp([-58, -96], [88, -140], k); P.handR = k31lp([58, -96], [104, -150], k); P.tip = 0.08 * k; P.mouth = k > 0.5 ? 'o' : 'smile'; P.brow = -0.6 * k; }
    if (t >= 86.6) { P.gaze = lookAt(k31head(P), [bA.x, bA.y - 30]); P.mouth = 'smile'; }
    cage.door = K.clamp(1.9 * k31e(t, 81.02, 0.9) + 0.04 * swing(t, 81.92, 1, 2, 4), 0, 1.9);
  } else if (t < 105.56) {   // S10
    P.kneel = 1 - k31e(t, 92.98, 0.45); P.sq = anticipate(t, 92.8, 0.2, 0.05) * (t > 93.0 && t < 93.6 ? 1.03 : 1); cage = { x: 270, y: 900, door: 1.9 };
    P.handL = [-58, -96]; P.handR = [58, -96]; P.mouth = 'smile';
    if (t >= 92.98 && t < 94.54) { P.handR = [PERSON_HANDS.wave.R[0] + 10 * Math.sin(t * 9), PERSON_HANDS.wave.R[1]]; P.drop = -4; }
    if (t >= 94.54 && t < 95.7) { P.handR = PERSON_HANDS.chest.R; P.lid = Math.max(blink(t, 4), k31long(t, 95.0, 0.6)); }
    if (t >= 95.7) { P.dir = 1 - 2 * k31e(t, 95.75, 0.15); if (Math.abs(P.dir) < 0.7) P.dir = Math.sign(P.dir || -1) * 0.7; P.tip = 0.22 * k31e(t, 96.0, 0.6); P.handR = k31W2L(P, [292, 840]); P.handL = k31W2L(P, [250, 845]); P.gaze = [-0.4, 0.8]; P.mouth = 'closed'; P.drop = 6; }
    if (t >= 100.22) { P.wink = 'R'; P.gaze = [0.9, -0.4]; P.lid = 0; P.noBlink = true; }
    if (t >= 101.06) P.gaze = [0.8, 0.5];
  } else if (t < 121.22) {   // S11: overheard
    P.dir = t < 107.4 ? -1 : (t < 107.75 ? -1 + 2 * k31e(t, 107.4, 0.35) : 1); if (Math.abs(P.dir) < 0.7) P.dir = (P.dir < 0 ? -0.7 : 0.7);
    P.tip = 0.22 * (1 - k31e(t, 107.4, 0.5)); P.drop = 6 * (1 - k31e(t, 107.4, 0.5)); P.wink = t < 107.4 ? 'R' : null; P.noBlink = t < 110.4;
    P.handL = t < 107.4 ? [-42, -200] : [-40, -82]; P.handR = t < 107.4 ? k31W2L(P, [292, 840]) : [40, -100];
    P.gaze = t < 107.4 ? [0.9, -0.4] : lookAt(k31head(P), mid);
    if (t >= 107.4 && t < 109.36) cage = { x: K.lerp(292, P.x + 64, k31e(t, 107.4, 0.4)), y: 880, held: true };
    if (t >= 109.0) { const [, lift] = hop(t, 109.36, 0.42, 0, 0, 30); P.y = K31GR - lift; P.sq = t < 109.36 ? anticipate(t, 109.06, 0.3, 0.12) : (t < 109.78 ? 1.1 : landSquash(t, 109.78, 0.16)); P.eyes = t < 110.4 ? 'wide' : 'open'; P.mouth = 'o'; P.handL = [-70, -170]; P.handR = [70, -170]; }
    if (t >= 109.36) { const tr = t - 109.4, fall = Math.min(1, tr / 0.35), rx = 364 - 150 * K.ease.out(K.clamp((tr - 0.35) / 1.4)); cage = { x: tr < 0.35 ? 364 : rx, y: tr < 0.35 ? K.lerp(880, 900, fall * fall) : 900, rot: tr < 0.35 ? 0.3 * fall : -(364 - rx) / 70 + 0.3, rolling: true }; }
    if (t >= 110.24) { P.handL = PERSON_HANDS.palmsUp.L.map((v, i) => (i ? v - 30 : v)); P.handR = PERSON_HANDS.palmsUp.R.map((v, i) => (i ? v - 30 : v)); P.brow = -0.8; P.mouth = 'o'; }
    if (t >= 111.92) { P.tilt = 0.1; P.talk = t < 112.6 ? 0.8 * Math.abs(Math.sin(t * 11)) : 0; P.drop = -6; P.handL = [-70, -128]; P.handR = [70, -128]; }
    if (t >= 112.68) { P.aR = [2.45, 2.75]; P.handR = null; P.tilt = 0; P.gaze = lookAt(k31head(P), mid); P.talk = 0.7 * Math.abs(Math.sin(t * 10)) * (t < 113.6 ? 1 : 0); }
    if (t >= 114.0) { P.aR = null; P.handR = PERSON_HANDS.pointDown.R; P.gaze = [0.6, 0.8]; P.talk = 0; }
    if (t >= 115.38 && t < 116.0) P.y = K31GR - 8 * pulse(t, 115.2, 0.25);
    if (t >= 116.56) { P.handR = [40, -100]; P.handL = [-60, -150]; P.gaze = lookAt(k31head(P), [265, 365]); }
    if (t >= 120.48) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.brow = -0.8; P.mouth = 'o'; P.gaze = lookAt(k31head(P), mid); }
    if (!cage) cage = t < 107.4 ? { x: 270, y: 900, door: 1.9 } : { x: 214, y: 900, rot: -150 / 70 + 0.3 };
  } else if (t < 130.44) {   // S12: the answer
    cage = { x: 214, y: 900, rot: -150 / 70 + 0.3 };
    P.handL = [-40, -82]; P.handR = [40, -100]; P.mouth = 'o'; P.brow = -0.5; P.gaze = lookAt(k31head(P), [bB.x, bB.y - 30]);
    if (t >= 124.0) { P.mouth = 'closed'; P.gaze = lookAt(k31head(P), t < 125.9 ? [455, 300] : [265, 365]); }
    if (t >= 129.3) { P.handR = PERSON_HANDS.chin.R; P.drop = 8 * (pulse(t, 129.4, 0.5) + pulse(t, 129.95, 0.5)); P.lid = Math.max(blink(t, 4), k31long(t, 129.5, 0.6)); P.mouth = 'smile'; P.gaze = lookAt(k31head(P), [bB.x, bB.y - 30]); }
  } else if (t < 142.5) {   // S13: the dig
    cage = { x: 214, y: 900, rot: -150 / 70 + 0.3 };
    P.kneel = settleTo(t, 130.3, 0, 1, 0.35, 0.05); P.brow = 0.4; P.mouth = 'closed';
    if (t < 134.58) { const ph = (t - 130.6) * 3 * Math.PI, dig = t > 130.6; P.tip = 0.38 * k31e(t, 130.4, 0.3); P.gaze = [0.5, 0.85];
      P.handR = dig ? k31lp([84, -58], [24, -118], 0.5 + 0.5 * Math.sin(ph)) : [60, -90]; P.handL = dig ? k31lp([80, -62], [10, -124], 0.5 - 0.5 * Math.sin(ph)) : [20, -96];
      P.sq = 1 - 0.02 * Math.abs(Math.sin(ph)); }
    else if (t < 135.1) { P.tip = 0.3; P.handR = [84, -60]; P.handL = [80, -64]; P.gaze = [0, 0.05]; P.eyes = 'wide'; P.noBlink = true; P.mouth = 'o'; }
    else if (t < 135.92) { const u = k31e(t, 135.1, 0.7); P.tip = K.lerp(0.3, -0.1, u); P.sq = anticipate(t, 135.1, 0.2, 0.08); P.lid = 0.5; P.mouth = 'closed'; jarHands = true; }
    else { P.tip = 0; P.gaze = lookAt(k31head(P), [650, 840]); P.handL = [10, -96]; P.handR = [40, -96]; }
    if (t >= 136.24 && t < 137.14) { P.handR = k31W2L(P, [640 + 26 * Math.sin((t - 136.24) * 14), 850]); P.tilt = 0.08; P.mouth = 'smile'; }
    if (t >= 137.14 && t < 138.4) { const up = k31e(t, 137.6, 0.5); P.handR = k31W2L(P, [640 + 50 * up, 790 - 30 * up]); P.handL = k31W2L(P, [612, 795]); P.gaze = lookAt(k31head(P), [650, 790]); }
    if (t >= 138.4) { P.eyes = 'wide'; P.brow = -0.8; P.mouth = 'o'; P.handR = [80, -120]; P.handL = [-40, -100]; P.drop = -4 * settleTo(t, 138.4, 0, 1); P.gaze = lookAt(k31head(P), [650, 760]); }
    if (t >= 139.66) P.eyes = 'open';
    if (t >= 140.5) { P.handL = [-40, -100]; P.aR = t < 141.0 ? [2.6, 2.95] : null; P.handR = t < 141.0 ? null : [96, -150]; if (t >= 141.0) P.handL = [80, -150]; P.gaze = t < 140.85 ? [0.5, -0.8] : lookAt(k31head(P), [650, 800]); P.mouth = 'open'; P.sq = 1 + 0.05 * Math.abs(Math.sin((t - 140.5) * 9)) * (t < 142.2 ? 1 : 0); P.talk = t > 141.0 ? 0.7 + 0.3 * Math.sin(t * 16) : 0; }
  } else {   // S14: thanks and farewell
    cage = { x: 214, y: 900, rot: -150 / 70 + 0.3 };
    P.kneel = 1 - k31e(t, 142.5, 0.4); P.handR = PERSON_HANDS.chest.R; P.handL = [-40, -96]; P.tip = 0.15 * pulse(t, 142.8, 0.9); P.lid = Math.max(0.6 * pulse(t, 142.8, 0.9), blink(t, 4)); P.mouth = 'smile';
    if (t >= 144.42 && t < 146.6) { P.handL = [-48, -168]; P.handR = [48, -168]; P.gaze = [0, -1]; P.lid = Math.max(0.4, blink(t, 4)); P.talk = 0.4 * Math.abs(Math.sin(t * 8)); P.drop = -6; }
    if (t >= 145.7 && t < 146.6) P.gaze = lookAt(k31head(P), [bA.x, bA.y]);
    if (t >= 146.6 && t < 147.24) { const u = k31e(t, 146.6, 0.3); P.handR = k31W2L(P, [K.lerp(730, 650, u), K.lerp(890, 778, u) + 6 * k31tap(t, [146.95, 147.1], 0.12)]); P.tip = 0.15 * (1 - u * 0.5); P.gaze = [0.4, 0.8]; }
    if (t >= 147.24) { P.sq = anticipate(t, 147.24, 0.25, 0.08) * (t > 147.5 ? 0.97 : 1); P.handL = [-6, -108]; P.handR = [70, -108]; P.tip = t < 148.4 ? -0.05 : -0.06; P.lid = t < 147.7 ? 0.5 : blink(t, 4); jarHands = 'carry'; }
    if (t >= 148.4) { P.dir = -1; P.handL = [70, -108]; P.handR = [-6, -108]; P.gaze = t > 149.18 && t < 149.5 ? [1, -0.4] : [-1, 0]; P.look = t > 149.18 && t < 149.5 ? -0.5 : 0; }
  }
  return { P, cage, jarHands };
}

// ---------- the hoopoes in the grove (S9 to S14): flight paths and acting ----------
const K31FA = [[83.3, 274, 888], [84.94, 330, 880], [85.6, 400, 790], [85.92, 410, 792], [86.78, 470, 690], [87.3, 480, 692], [88.4, 530, 600], [89.28, 550, 506]];
const K31FB = [[83.5, 244, 848], [84.6, 300, 870], [84.94, 360, 860], [85.7, 440, 770], [86.5, 500, 640], [87.6, 470, 520], [88.6, 450, 470], [89.3, 455, 470], [89.85, 480, 506]];
const K31LOOPA = [[145.7, 550, 506], [146.2, 650, 330], [146.8, 900, 190], [147.5, 980, 420], [148.3, 760, 580], [149.18, 550, 506]], K31LOOPB = [[145.85, 480, 506], [146.4, 600, 360], [147.0, 860, 170], [147.7, 960, 440], [148.5, 700, 600], [149.35, 480, 506]];
function k31groveBirds(t, man) {
  const mh = man ? k31head(man) : [300, 700], ba = blink(t, 3), bb = blink(t, 7);
  const A = { s: 0.75, dir: -1, pal: 0, seed: 3, crest: 0.3, lid: ba }, B = { s: 0.75, dir: -1, pal: 1, seed: 7, crest: 0.3, lid: bb };
  const perch = (o, x) => { o.x = x; o.y = k31perchY(x, t); };
  if (t < 89.28) {
    // inside the cage, to the door sill, the weak flight
    const cy = k31cagePerch(900, 0.75), cfl = k31cageFloor(900, 0.75);
    if (t < 82.4) { A.x = 300; A.y = cy; A.s = 0.72; A.crest = 0.1; B.x = 244; B.y = cy; B.s = 0.72; B.crest = 0.1; A.lid = Math.max(0.5, ba); B.lid = Math.max(0.4, bb); if (t > 81.6) { A.gaze = lookAt([296, 840], mh); B.gaze = lookAt([246, 840], mh); } A.inCage = B.inCage = true; }
    else if (t < 83.3) { const [hx, lift] = hop(t, 82.4, 0.3, 300, 274, 16); A.x = hx; A.y = K.lerp(cy, cfl, k31e(t, 82.4, 0.3)) - lift; A.s = 0.72; A.sq = landSquash(t, 82.7, 0.1); A.lid = Math.max(k31blinkAt(t, [82.85, 83.05], 0.12), 0); A.crest = 0.3; A.gaze = t > 83.1 ? [-1, 0.2] : [0.6, -0.3]; A.out = true;
      B.x = 244; B.y = cy; B.s = 0.72; B.inCage = true; B.crest = 0.2; }
    else { const fa = k31flight(t, K31FA, 'weak'), fb = k31flight(t, K31FB, 'weak'); Object.assign(A, fa, { s: 0.74, out: true, eyes: t < 84.94 ? 'wide' : 'open', crest: 0 }); Object.assign(B, fb, { s: 0.74, out: true, eyes: t < 84.94 ? 'wide' : 'open', crest: 0 });
      if (t >= 84.94) { A.lid = Math.max(0.5, ba); A.sag = -0.3; B.gaze = lookAt([B.x, B.y - 40], [A.x, A.y - 40]); }
      if (t >= 86.78 && t < 89.85 && !fb.fly) { B.dir = 1; B.gaze = lookAt([B.x, B.y - 40], [A.x, A.y - 40]); }
      if (t >= 88.6 && t < 89.85) { B.fly = true; B.flap = Math.sin(t * 2 * Math.PI * 8); B.dir = 1; B.gaze = lookAt([B.x, B.y - 40], [A.x, A.y - 40]); } }
    return { A, B };
  }
  // on the branch
  perch(A, 550); perch(B, t < 89.85 ? 455 : 480);
  if (t < 89.85) { B.fly = true; B.x = 455 + 25 * k31e(t, 89.3, 0.55); B.y = 470 + 36 * k31e(t, 89.3, 0.55); B.flap = Math.sin(t * 50); B.dir = 1; }
  if (t < 105.56) {
    A.sq = landSquash(t, 89.28, 0.16) * breathe(t, 3, t < 92 ? 0.04 : 0.012); A.sag = t < 89.6 ? -0.6 * (1 - k31e(t, 89.28, 0.35)) : 0; A.lid = t < 91.3 ? Math.max(0.4, ba) : ba;
    if (t >= 89.85) { B.sq = landSquash(t, 89.85, 0.16) * breathe(t, 5, t < 92 ? 0.04 : 0.012); B.tip = 0.2 * Math.exp(-(t - 89.85) * 4) * Math.cos((t - 89.85) * 10); B.tailDrop = -0.4 * pulse(t, 89.85, 0.5); B.lid = t < 91.3 ? Math.max(0.4, bb) : bb; B.dir = -1; }
    if (t >= 91.32) { A.x = 540; B.x = 490; }
    if (t >= 91.98) { A.headRot = 0.5 * pulse(t, 91.98, 0.9); A.drop = 8 * pulse(t, 91.98, 0.9); A.crest = K.clamp(settleTo(t, 91.98, 0.3, 1, 0.4, 0.15), 0, 1.2); B.headRot = 0.5 * pulse(t, 92.15, 0.9); B.drop = 8 * pulse(t, 92.15, 0.9); B.crest = K.clamp(settleTo(t, 92.15, 0.3, 1, 0.4, 0.15), 0, 1.2); A.gaze = lookAt(k31hHead(A), mh); B.gaze = lookAt(k31hHead(B), mh); }
    if (t >= 94.0) { A.crest = 0.7; B.crest = 0.7; }
    if (t >= 96.84) { const [hx] = hop(t, 96.84, 0.18, 540, 528, 8), [hx2] = hop(t, 97.05, 0.18, 528, 515, 8); A.x = t < 97.05 ? hx : hx2; A.y = k31perchY(A.x, t) - 6 * (pulse(t, 96.84, 0.18) + pulse(t, 97.05, 0.18)); A.gaze = lookAt(k31hHead(A), k31hHead(B)); }
    if (t >= 97.24) { A.beak = t < 100.2 ? 1 + 0.3 * Math.abs(Math.sin(t * 22)) : 0; A.lid = Math.max(0.3, ba); A.sag = -0.4; A.drop = 4; B.headRot = -0.2; B.lid = Math.max(0.3, bb); B.gaze = lookAt(k31hHead(B), mh); }
    if (t >= 98.9) { A.gaze = k31sac(t, [[98.9, lookAt(k31hHead(A), k31hHead(B))], [99.1, lookAt(k31hHead(A), mh)], [99.6, lookAt(k31hHead(A), k31hHead(B))]]); A.drop = 4 + 8 * pulse(t, 99.15, 0.3); }
    if (t >= 100.22) { B.drop = 8 * (pulse(t, 100.22, 0.25) + pulse(t, 100.5, 0.25)); B.crest = settleTo(t, 100.22, 0.7, 0.85); B.headRot = 0; B.gaze = lookAt(k31hHead(B), k31hHead(A)); A.beak = 0; }
    if (t >= 101.06) { A.drop = 4 + 12 * k31tap(t, [101.06, 101.32], 0.22); A.sag = -0.8; A.headRot = 0.5; A.gaze = [0.2, 1]; B.gaze = [0.3, 1]; B.headRot = 0.3; }
  } else if (t < 121.22) {   // S11
    A.x = 515; B.x = 480; A.y = k31perchY(515, t); A.crest = 0.85; B.crest = 0.85; A.sag = -0.3; A.headRot = 0.3; A.gaze = [0.2, 1]; B.gaze = [0.3, 1]; B.headRot = 0.3;
    if (t >= 107.94) { A.crest = 0.05; B.crest = 0.05; A.sag = 0; A.headRot = 0; B.headRot = 0; A.lid = 0; B.lid = 0; A.noBlink = B.noBlink = true; A.gaze = k31sac(t, [[107.94, [-1, 0]], [108.4, lookAt(k31hHead(A), mh)]]); B.gaze = k31sac(t, [[107.94, [1, 0]], [108.4, lookAt(k31hHead(B), mh)]]); B.dir = t < 108.4 ? 1 : -1; }
    if (t >= 109.36 && t < 110.3) { A.sq = 1 - 0.1 * pulse(t, 109.4, 0.3); B.sq = 1 - 0.1 * pulse(t, 109.45, 0.3); A.eyes = B.eyes = 'wide'; }
    if (t >= 110.3) { A.lid = ba; B.lid = bb; }
    if (t >= 112.68 && t < 114.0) { A.tip = -0.15; B.tip = -0.12; }
    if (t >= 120.48) { A.scratch = k31e(t, 120.48, 0.3); A.scratchJ = 4 * Math.sin(t * 20); A.lid = 0.4; A.gaze = [0.5, -0.4]; B.headRot = 0.55; B.gaze = [0.2, 1]; B.drop = 6; B.dir = -1; }
  } else if (t < 130.44) {   // S12: she answers
    const [hx1, l1] = hop(t, 121.22, 0.3, 480, 468, 10), [hx2, l2] = hop(t, 121.6, 0.3, 468, 455, 10), bx = t < 121.6 ? hx1 : hx2;
    B.x = bx; B.y = k31perchY(bx, t) - l1 - l2; B.sq = landSquash(t, 121.52, 0.1) * landSquash(t, 121.9, 0.1); A.x = 540; A.y = k31perchY(540, t); A.tip = -0.1 * k31e(t, 121.22, 0.4); A.crest = 0.3; B.crest = 0.3;
    A.gaze = lookAt(k31hHead(A), k31hHead(B)); B.gaze = lookAt(k31hHead(B), mh);
    if (t >= 122.46) { B.crest = 0.5; B.sq = 1.05; B.drop = -4; B.lid = Math.max(bb, k31long(t, 123.0, 0.45)); }
    if (t >= 124.0) { B.gaze = [0, -1]; B.headRot = -0.3; B.lid = 0.2; }
    if (t >= 125.2) { B.crest = K.clamp(settleTo(t, 125.2, 0.5, 1, 0.4, 0.2), 0, 1.2); B.sag = -0.8 * k31e(t, 125.2, 0.3); B.beak = t < 127.1 ? 0.9 + 0.4 * Math.abs(Math.sin(t * 13)) : 0; B.headRot = -0.15; }
    if (t >= 127.18) { B.cover = settleTo(t, 127.18, 0, 1, 0.3, 0.1); B.drop = 6; B.sag = 0; A.cover = settleTo(t, 127.38, 0, 1, 0.3, 0.1); A.drop = 6; }
    if (t >= 128.58) { B.cover = 1 - k31e(t, 128.58, 0.25); A.cover = 1 - k31e(t, 128.78, 0.25); B.gaze = lookAt(k31hHead(B), mh); B.headRot = 0.15; B.drop = 3 * pulse(t, 128.9, 0.4); B.sag = -0.35 * pulse(t, 128.9, 0.4); B.lid = 0.2; B.beak = 0; }
  } else if (t < 145.7) {   // S13 and the bow of S14
    A.x = 540; B.x = 470; A.y = k31perchY(540, t); B.y = k31perchY(470, t); A.crest = 0.4; B.crest = 0.4;
    const hole = [640, 900]; A.gaze = lookAt(k31hHead(A), t < 135.9 ? hole : [650, 860]); B.gaze = lookAt(k31hHead(B), t < 135.9 ? hole : [650, 860]);
    if (t >= 132.3) { A.tip = 0.25 * k31e(t, 132.3, 0.4); B.tip = 0.25 * k31e(t, 132.45, 0.4); A.headRot = 0.3; B.headRot = -0.15; }
    if (t >= 138.4) { A.crest = 1; B.crest = 1; A.eyes = B.eyes = 'wide'; }
    if (t >= 141.56) { A.eyes = B.eyes = 'open'; A.y -= 10 * Math.max(0, Math.sin((t - 141.56) * 9)); B.y -= 10 * Math.max(0, Math.sin((t - 141.56) * 9 + Math.PI)); A.crest = 0.6 + 0.4 * Math.abs(Math.sin((t - 141.56) * 4.5)); B.crest = 0.6 + 0.4 * Math.abs(Math.cos((t - 141.56) * 4.5)); A.tip = 0; B.tip = 0; A.headRot = 0; B.headRot = 0; }
    if (t >= 142.5) { A.y = k31perchY(540, t); B.y = k31perchY(470, t); A.gaze = lookAt(k31hHead(A), mh); B.gaze = lookAt(k31hHead(B), mh); }
    if (t >= 143.42) { A.headRot = 0.5 * pulse(t, 143.42, 0.8); A.drop = 8 * pulse(t, 143.42, 0.8); B.headRot = 0.5 * pulse(t, 143.6, 0.8); B.drop = 8 * pulse(t, 143.6, 0.8); A.crest = 1; B.crest = 1; }
  } else {   // S14: one strong loop round the crown, then watching him go
    const fa = k31flight(t, K31LOOPA, 'strong'), fb = k31flight(t, K31LOOPB, 'strong');
    Object.assign(A, fa, { crest: fa.fly ? 0.1 : 0.6 }); Object.assign(B, fb, { crest: fb.fly ? 0.1 : 0.6 });
    if (!fa.fly) { A.dir = -1; A.y = k31perchY(A.x, t); A.sq = landSquash(t, 149.18, 0.14); A.gaze = lookAt(k31hHead(A), mh); }
    if (!fb.fly) { B.dir = -1; B.y = k31perchY(B.x, t); B.sq = landSquash(t, 149.35, 0.14); B.gaze = lookAt(k31hHead(B), mh); }
  }
  return { A, B };
}
// the dig: hole depth, mound, clods
function k31holeDepth(t) { return t < 130.6 ? 0 : t < 134.58 ? 50 * k31e(t, 130.6, 3.98, 'out') : 50 + 30 * k31e(t, 135.1, 0.7); }
function k31drawGrove(ctx, t) {
  const pre = k31groveBirds(t, null), M0 = k31manGrove(t, pre), Bd = k31groveBirds(t, M0.P), M = k31manGrove(t, Bd), P = M.P;
  k31groveBack(ctx, t);
  // the hole and the mound (S13, S14)
  const hd = k31holeDepth(t), dug = t >= 130.6;
  if (dug) { const mh = 70 * k31e(t, 131.3, 4.0); shape(ctx, [[388, 904], [410, 904 - mh * 0.6], [438, 904 - mh], [466, 904 - mh * 0.7], [488, 904]], K31SOIL, { lw: 5, seed: 170, dot: K31SOILD, pitch: 8, rad: 0.25, da: 0.5 }); }
  // the buried jar seen in cross-section once the hole reaches it, or (S10, S11) through the ground window
  const jarOut = t >= 135.1, jarU = k31e(t, 135.1, 0.7), jarDown = t >= 135.92;
  if (dug && hd > 0) { ctx.save(); const hb = 904 + hd; shape(ctx, [[592, 902], [688, 902], [682, hb - 10], [660, hb], [620, hb], [598, hb - 10]], K31SOILD, { lw: 6, seed: 171, dot: '#2a1404', pitch: 9, rad: 0.25, da: 0.5 }); ctx.restore(); }
  if (dug && t >= 133.8 && !jarOut) { ctx.save(); ctx.beginPath(); ctx.rect(592, 902, 96, hd + 2); ctx.clip(); k31jar(ctx, K31JAR.x, K31JAR.y, K31JAR.s, { lid: true, soil: 1 }); ctx.restore(); }
  k31tree(ctx, t, k31in(t, 88.42, 90) ? 88.42 : -1);
  // the cage on the grass (back), birds inside, cage front. A rolling cage turns about its middle.
  const cg = M.cage, cgB = cg ? (cg.rot ? (() => { const cx = cg.x, cy = cg.y - 56; return [cx - Math.sin(cg.rot) * 56, cy + Math.cos(cg.rot) * 56]; })() : [cg.x, cg.y]) : null;
  if (cg) k31cage(ctx, cgB[0], cgB[1], 0.75, 'back', { rot: cg.rot });
  if (Bd.B.inCage) k31hoopoe(ctx, Bd.B); if (Bd.A.inCage) k31hoopoe(ctx, Bd.A);
  if (cg && !cg.held) k31cage(ctx, cgB[0], cgB[1], 0.75, 'front', { door: cg.door ?? 1.9, rot: cg.rot, latch: 1 });
  // the jar out of the ground (S13 on, S14)
  let jar = null;
  if (jarOut && t < 147.24) { const x = K.lerp(K31JAR.x, 650, jarU), y = K.lerp(K31JAR.y, 900, jarU) - (jarDown ? 0 : 0); jar = { x, y, sq: jarDown ? landSquash(t, 135.92, 0.06) : 1 }; }
  // the man (clipped above the hole while digging so the hands go into it)
  if (dug && t < 135.1) { ctx.save(); ctx.beginPath(); ctx.rect(-50, -50, 1100, 954); ctx.rect(592, 900, 96, hd + 4); ctx.clip('evenodd'); }
  if (jar && t < 135.92) { const hs = [k31W2L(P, [jar.x - 60, jar.y - 78]), k31W2L(P, [jar.x + 60, jar.y - 78])]; P.handL = hs[0]; P.handR = hs[1]; }
  person(ctx, P);
  if (dug && t < 135.1) ctx.restore();
  if (cg && cg.held) k31cage(ctx, cgB[0], cgB[1], 0.75, 'front', { door: 1.9 });
  // clods flying left from each scoop
  if (k31in(t, 130.6, 134.6)) for (let k = 0; k < 24; k++) { const a = 130.6 + k / 6, d = t - a; if (d > 0 && d < 0.6) { const r = K.rng(200 + k), vx = -(120 + r() * 120), vy = -(140 + r() * 80); shape(ctx, ell(620 + vx * d, 890 + vy * d + 450 * d * d, 7 + r() * 4, 6, 8), K31SOIL, { lw: 3, seed: 180 + k }); } }
  // the jar, the lid, the coins
  const lidOff = t >= 137.6 && t < 146.82, lidPos = t < 138.4 ? k31hand(P, 1, P.handR || [40, -96]) : [730, 898];
  const jarClip = jar && t < 135.92; if (jarClip) { ctx.save(); ctx.beginPath(); ctx.rect(-50, -50, 1100, 952); ctx.rect(592, 900, 96, hd + 4); ctx.clip(); }
  if (jar) { const fill = t >= 139.66 ? k31e(t, 139.66, 0.3) : (t >= 138.4 ? 0.3 : 0); k31jar(ctx, jar.x, jar.y, K31JAR.s, { lid: !lidOff && t < 146.82 + 0.35 ? !lidOff : true, soil: t < 136.24 ? 1 : K.lerp(1, 0.3, k31e(t, 136.24, 0.9)), fill: lidOff || t < 146.82 ? fill : 0, sq: jar.sq, glint: 0 }); }
  if (jarClip) ctx.restore();
  if (jar && t >= 135.92) dustBurst(ctx, jar.x, 898, t - 135.92, 6, 8, 16, 60, 0.6, 7);
  if (lidOff) k31jarLid(ctx, lidPos[0], lidPos[1] + (t < 138.4 ? 10 : 0), K31JAR.s, t < 138.4 ? 0.3 : 0.15);
  if (t >= 146.82 && t < 147.24) { const u = k31e(t, 146.6, 0.3); /* the lid travels back with the hand */ }
  if (t >= 139.66 && t < 149.56) [[0, -1, 0.9], [1, 1, 1.25]].forEach(([i, sd, dur]) => { const d = t - 139.86 - i * 0.25; if (d < 0) return; const u = K.clamp(d / dur), x = 650 + sd * (20 + 120 * K.ease.out(u)), r = 12, flat = i === 0 && u >= 1 ? K.clamp((d - dur) / 0.3) : 0;
    k31coin(ctx, x, 896 - r * (1 - flat * 0.6) - 40 * Math.sin(Math.PI * Math.min(1, d / 0.35)) * (d < 0.35 ? 1 : 0), r, { rot: sd * (x - 650) / r, flat }); });
  if (k31in(t, 138.4, 147.24)) k31goldGlow(ctx, 650, 790, 170, t, k31e(t, 138.4, 0.3) * (t > 146.6 ? 1 - k31e(t, 146.6, 0.3) : 1));
  if (t >= 140.5 && t < 141.0 && P.aR) { const h = k31hand(P, 1, [Math.sin(2.6) * 38 + Math.sin(2.95) * 36 + 31, -132 + Math.cos(2.6) * 38 + Math.cos(2.95) * 36]); k31twoFingers(ctx, h[0], h[1] - 6, 1.3); }
  // the carried jar (S14)
  if (t >= 147.24) { const cj = k31L2W(P, P.dir > 0 ? [32, -62] : [32, -62]), lift = k31e(t, 147.24, 0.35), from = [650, 900]; const jx = K.lerp(from[0], cj[0], lift), jy = K.lerp(from[1], cj[1], lift); k31jar(ctx, jx, jy, 0.55 + 0.25 * (1 - lift), { lid: true, glint: t >= 147.68 ? (t - 147.68) / 0.6 : 0 }); }
  // the birds out of the cage
  if (!Bd.B.inCage) k31hoopoe(ctx, Bd.B); if (!Bd.A.inCage) k31hoopoe(ctx, Bd.A);
  // the buried jar through the ground window (S10 from 102.24, S11 114.0-115.9)
  let wr = 0; if (k31in(t, 102.24, 105.56)) wr = K31WIN.r * K.ease.back(K.clamp((t - 102.24) / 0.5)); if (k31in(t, 105.56, 106.2)) wr = K31WIN.r * (1 - k31e(t, 105.56, 0.5)); if (k31in(t, 114.0, 116.56)) wr = 110 * K.ease.back(K.clamp((t - 114.0) / 0.4)) * (1 - k31e(t, 116.3, 0.3));
  if (wr > 1) k31groundWindow(ctx, K31WIN.x, K31WIN.y, wr, t, (c) => { const cut = t < 114 ? k31e(t, 103.88, 0.3) : 1; k31jar(c, K31JAR.x, K31JAR.y, K31JAR.s, { lid: true, tilt: 0.14, cutaway: cut, soil: 0.3 }); if (t > 104.72 || t > 114) k31goldGlow(c, K31JAR.x, K31JAR.y - 70, 120, t, 0.6); }, { shiver: k31in(t, 115.38, 115.8) ? 1 : 0 });
  if (k31in(t, 115.38, 116.0)) dustBurst(ctx, P.x + 20, 898, t - 115.38, 5, 7, 13, 34, 0.5, 3);
  if (k31in(t, 109.78, 110.4)) dustBurst(ctx, P.x, 898, t - 109.78, 6, 8, 14, 40, 0.55, 5);
  // footfall dust on the heavy walk out
  if (t >= 148.4) for (const f of footfalls(k31groveX, 148.4, 149.6, 24)) dustBurst(ctx, f.x, 898, t - f.t, 3, 5, 9, 20, 0.4, Math.round(f.t * 10));
  // the cloud shadow (S12)
  if (k31in(t, 124.76, 126.6)) { const u = (t - 124.76) / 1.6, x = K.lerp(250, 760, u); ctx.save(); ctx.globalAlpha = 0.3 * Math.sin(Math.PI * u); ctx.fillStyle = dotPat(ctx, C.blue, 10, 0.4); ctx.fillRect(x - 130, 380, 260, 220); ctx.restore(); }
  // the heart drifting down (S10)
  if (k31in(t, 94.54, 96.0)) { const u = (t - 94.54) / 1.46, mh = k31head(P); heart(ctx, K.lerp(515, mh[0] + 20, u) + 20 * Math.sin(u * 9), K.lerp(470, mh[1] - 70, u), 22); }
  return { man: P, A: Bd.A, B: Bd.B };
}
// thought clouds of S11 and S12: the net in plain sight (k: the local clock), and the moral (the net fades, the eyes close, the net snaps shut)
function k31trap(c, tl, o = {}) {
  shape(c, [[-100, 900], [1100, 900], [1100, 1300], [-100, 1300]], SANDL, { lw: 8, seed: 190, dot: '#c98a3a', pitch: 14, rad: 0.2, da: 0.45 });
  bush(c, { x: 840, w: 260, h: 170, seed: 4 });
  const sx = 500, closed = o.closed ?? 0, na = o.alpha ?? 1;
  c.fillStyle = SANDL; for (let i = 0; i < 9; i++) { c.beginPath(); c.arc(sx - 40 + (i % 3) * 40, 880 + Math.floor(i / 3) * 6 - 6, 7, 0, 7); c.fill(); c.lineWidth = 2; c.strokeStyle = C.black; c.stroke(); }
  const walkX = (i) => K.lerp(150 + i * 70, 470 + i * 70, K.clamp(tl / 1.6)), birds = [0, 1].map((i) => ({ x: walkX(i), y: 900, s: 1.2, dir: 1, pal: i, ph: walkX(i) / 9, amp: tl < 1.6 ? 1 : 0, crest: 0.4, noBlink: true, sq: closed > 0.5 ? 0.8 : 1, eyes: closed > 0.5 ? 'wide' : 'open' }));
  if (closed < 0.5) birds.forEach((b) => k31hoopoe(c, b));
  if (closed < 0.5) k31mesh(c, [[290, 915], [710, 915], [690, 868], [310, 868]], 30, 8, na);
  else { const sw = o.swing || 0; c.save(); c.translate(sx, 900); c.rotate(sw); birds.forEach((b, i) => k31hoopoe(c, { ...b, x: -60 + i * 90, y: 0 })); k31mesh(c, [[-190, 6], [-140, -150], [0, -190], [140, -150], [190, 6]], 30, 8, 1); c.restore(); }
  if (o.hunter) { const k = o.hunter; c.save(); c.beginPath(); c.rect(0, 0, 1000, 780 + 30); c.clip(); k31hunter(c, { ...K31HUNT, x: 840, y: 1000 - 160 * k, s: 1.1, dir: -1, lid: 0.4, brow: -0.4, mouth: 'smile', gaze: [-1, 0.4] }, { net: false }); c.restore(); bush(c, { x: 840, w: 260, h: 170, seed: 4 }); }
}
function k31cloudNet(ctx, t, man) {
  const p = k31e(t, 116.56, 0.5) * (1 - k31e(t, 129.3, 0.3)); if (p <= 0) return; const h = k31head(man);
  thoughtCloud(ctx, 265, 400, 300, 220, t, { p, tail: [h[0] - 30, h[1] - 50], bg: C.yellow, scale: 0.34, at: [500, 840], inside: (c) => {
    if (t < 121.22) { const tl = t - 117.72; if (t < 117.72) { k31trap(c, -1, {}); return; } const shut = t >= 119.68 ? k31e(t, 119.68, 0.1) : 0; k31trap(c, Math.min(tl, 1.95), { hunter: t >= 118.44 ? k31e(t, 118.44, 0.4) : 0, closed: shut, swing: shut > 0.5 ? swing(t, 119.78, 0.2, 1.5, 2) : 0 }); return; }
    if (t < 125.9) { k31trap(c, 1.95, { hunter: 1, closed: 1 }); return; }
    const tl = t - 125.9, fadeA = t < 126.46 ? 1 : 1 - 0.85 * k31e(t, 126.46, 0.5), snap = t >= 127.86;
    k31trap(c, Math.min(tl * 1.2, 1.95), { alpha: fadeA, closed: snap ? 1 : 0, swing: snap ? swing(t, 127.9, 0.25, 1.6, 2) : 0, hunter: 0 });
  } });
}
