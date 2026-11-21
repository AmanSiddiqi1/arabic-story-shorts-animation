// ===== ALI-02 shots S6-S8 (43.88 - 71.43 s): the hoofbeats, the riders outside, the hiding; the door opens; WHO ARE YOU?; the plea =====

// ---------- the riders outside (S6 cutaway) and the standing horses at the rock (S10-S12, S14) ----------
// i: rider palette (-1 the leader), pal: coat, x/y/s: the place it stops (all come in from the right along the trail, dir -1)
const A2_MOUNTS = [
  { i: -1, pal: 2, x: 2060, y: 884, s: 0.72, d: 47.0 }, { i: 4, pal: 4, x: 2175, y: 872, s: 0.58, d: 47.12 }, { i: 3, pal: 3, x: 1075, y: 905, s: 0.8, d: 46.7 },
  { i: 0, pal: 0, x: 1290, y: 862, s: 0.5, d: 46.9 }, { i: 1, pal: 5, x: 1410, y: 860, s: 0.48, d: 47.05 }];
const a2Arrive = (h, t) => { const e = K.clamp((t - h.d) / 1.05); return h.x + 900 * Math.pow(1 - e, 2.2); };
function a2StandHorses(ctx, t, m, o = {}) { const tc = AB_T2(t);
  abByY(A2_MOUNTS).forEach((h) => { const k = A2_MOUNTS.indexOf(h); if (o.skip && o.skip(h, k)) return; const H = abLineHorse(h, k, tc, { dir: o.dir ? o.dir(h, k) : -1 });
    if (o.P) Object.assign(H, o.P(h, k, tc) || {}); a2Horse(ctx, H, m, { shc: o.shc }); }); }

// ---------- S6 43.88-52.69 ----------
const A2_S6_IN = { x: 500, y: 680, zoom: 1.3 };
function a2S6Cassim(ctx, t, m, layer) {
  const tc = AB_T2(t), P = { x: 340, y: 902, dir: -1, sit: 1, seat: 'floor', mouth: 'closed', gaze: [-0.4, -0.7], lid: 0.4, tip: -0.08, sq: breathe(tc, 66, 0.02), fin: A2_GOLDRIM, brow: -0.4 }, o = { shc: A2_SH, fa: 0.8 };
  let behind = false;
  if (tc < 44.78) { const u = beatIn(tc, 43.88, 44.7); P.tip = -0.08 * (1 - u); P.handR = [K.lerp(16, 44, u), K.lerp(-160, -212, u)]; P.handL = [-20, -120]; P.mouth = u > 0.5 ? 'o' : 'closed'; P.lid = 0.4 * (1 - u); P.gaze = [-0.5, -0.8]; o.fa = 0.8 - 0.5 * u; }
  else if (tc < 47.48) { P.gaze = tc < 45.98 ? [1, -0.2] : gazePlan(tc, [[45.98, [0.6, 0.8]], [46.3, [0.2, -1]], [46.6, [1, -0.1]]]); P.lid = abBlinkAt(AB_T3(t), 44.8); P.handR = [42, -200]; P.handL = [-24, -118]; P.eyes = 'wide'; P.mouth = 'o'; P.tip = 0.02;
    P.sq *= 1 - 0.08 * Math.exp(-Math.max(0, tc - 45.32) * 10) * (tc > 45.32 ? 1 : 0); o.fa = 0.3 + lagged((u) => (u > 44.78 ? 0.5 : 0), tc, 0.15, 1) + (tc > 45.98 ? 0.1 * Math.sin(tc * 30) : 0);
    if (tc > 46.86) { P.sq *= 0.95; P.tip = -0.06; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; } }
  else if (tc < 51.06) { P.sit = 0; P.x = flow(tc, [[50.04, 340], [50.3, 318], [50.5, 372], [50.7, 350], [51.0, 352]]); P.ph = P.x / 22; P.amp = tc < 50.75 ? 0.8 : 0.3; P.dir = tc > 50.3 && tc < 50.5 ? 1 : -1;
    P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.mouth = 'o'; P.eyes = 'wide'; P.gaze = gazePlan(tc, [[50.04, [1, 0]], [50.3, [-1, 0.2]], [50.55, [1, -0.3]], [50.8, [0.4, 0.5]]]); P.tip = 0;
    const [, l] = hop(tc, 50.75, 0.25, 0, 0, 30); P.y = 902 - l; o.lift = l; o.fa = 0.3 + 0.4 * Math.sin(tc * 25); }
  else { const u = beatIn(tc, 51.06, 51.4), [hx, l] = hop(tc, 51.06, 0.34, 352, 470, 60); P.sit = 0; P.x = hx; P.dir = 1; P.y = K.lerp(902, 1052, K.ease.in(u)) - l; P.kneel = u; P.tip = 0.2 * (1 - u) + 0.1; P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.lid = 1; P.mouth = 'o';
    behind = u >= 1; o.shadow = false; o.fa = tc < 51.7 ? 0.3 + 0.12 * Math.sin(tc * 40) : 0.3 + 0.8 * K.clamp((tc - 52.0) / 0.6); P.x += tc < 51.7 ? tremble(tc, 1.2, 9) : 0; }
  if (layer === 'behind' && !behind) return; if (layer === 'front' && behind) return;
  if (behind) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1600, 906); ctx.clip(); a2Cas(ctx, P, m, o); ctx.restore(); } else a2Cas(ctx, P, m, o);
  return P;
}
function a2S6Cloud(ctx, t, cam, S) { if (t > 44.9) return; const p = t < 44.78 ? 1 : 1 - K.clamp((t - 44.78) / 0.12), [tx, ty] = abP(345, 720, cam);
  thoughtCloud(ctx, 640, 360, 280, 190, t, { p, tail: [tx + 20, ty - 20], inside: (c) => a2Grain(c, 'sesame', 500, 700, 3.6, 0.2, { blur: K.lerp(5, 0.5, beatIn(t, 43.88, 44.7)), glow: 0.4 + 0.5 * beatIn(t, 43.88, 44.7) }) }); }
const a2HoofJit = (t) => (t > 45.98 && t < 47.48 ? 4 * Math.abs(Math.sin((t - 45.98) * 4 * Math.PI)) : 0) + (t > 45.32 && t < 45.6 ? 10 * pulse(t, 45.32, 0.28) : 0);
function a2S6World(ctx, t, cam) {
  const tc = AB_T2(t), crack = K.clamp((t - 51.7) / 0.9) * 0.7; a2CaveWorld(ctx, t, cam, { door: { crack }, dim: 0.85, liveT: 28.84 + 0.6 * (t - 28.84) });
  a2CoinTrail(ctx, { jit: () => a2HoofJit(t) }); a2BigSack(ctx, t);
  a2S6Cassim(ctx, t, 'cave', 'behind'); a2Heap(ctx, t, { slump: 1 }); a2S6Cassim(ctx, t, 'cave', 'front');
  if (t > 45.98) { ctx.save(); ctx.fillStyle = '#c8a08a'; for (let k = 0; k < 10; k++) { const x = 90 + k * 22 + 6 * Math.sin(k), y = 140 + (((t - 45.98) * 380 + k * 97) % 760); ctx.globalAlpha = 0.5; ctx.fillRect(x, y, 2, 10); } ctx.restore(); }
  if (t > 51.7) { ctx.save(); ctx.fillStyle = '#d8c0b0'; for (let k = 0; k < 6; k++) { const y = 560 + (((t - 51.7) * 260 + k * 60) % 340); ctx.globalAlpha = 0.6; ctx.fillRect(166 + Math.sin(k * 3) * 4, y, 3, 8); } ctx.restore(); }
}
// the cutaway outside: bright morning; the riders pull up in an accordion stop; the leader drops from the black horse
function a2S6Out(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning'; abGladeBack(ctx, m, t);
  abRock(ctx, 1820, 900, { model: m, t });
  a2MuleCart(ctx, t, A2_CARTX, m, { shc: '#5a3a3a', load: true, P: { headTurn: tc > 47.9 ? 0.6 : 0, neck: tc > 47.9 ? 0.2 : idleSway(tc, 63, 0.08, 3.3), earL: tc > 47.6 ? 1 : 0.5, earR: tc > 47.7 ? 0.9 : 0.3 } });
  abByY(A2_MOUNTS).forEach((h) => { const k = A2_MOUNTS.indexOf(h), x = a2Arrive(h, tc), mv = x - h.x > 4, H = { x, y: h.y, s: h.s, dir: -1, pal: h.pal, ...walk((u) => a2Arrive(h, u), tc, { stride: GAIT.horse * h.s }), tailSwish: osc(tc, 1.5 + k * 0.2) };
    H.gallop = mv ? K.clamp(H.amp * 1.6 - 0.4) : 0; H.rear = 0.25 * pulse(tc, h.d + 0.85, 0.4); groundShadow(ctx, H.x, h.y, 300 * h.s, 0, { flat: true, color: '#5a3a3a' }); for (const f of [0, 1]) if (mv) dustBurst(ctx, x + 120 * h.s, h.y, ((t * 2 + f * 0.5) % 1) * 0.5, 3, 3, 7, 18, 0.5, f + k * 3 + Math.floor(t * 2));
    const leaderOff = h.i < 0 && tc >= 48.14;
    if (leaderOff) a2Horse(ctx, { ...H, amp: 0, gallop: 0, rear: 0, earL: 0.6, headDown: 0.1 }, m, { shc: '#5a3a3a' });
    else abRider(ctx, h.i, H, { gaze: [-1, 0.1], lid: abLid(t, 130 + k), lurch: lurch(tc, h.d + 0.85), mouth: 'closed' }, m, { cloak: 0.9, t, hang: mv ? 0 : 1 }); });
  if (tc >= 48.14) { const [hx, l] = hop(tc, 48.14, 0.3, 2040, 1985, 50), seatY = 884 - 150 * 0.72, y = tc < 48.44 ? K.lerp(seatY, 900, beatIn(tc, 48.14, 48.44)) - l : 900;
    const P = { x: hx, y, dir: -1, gaze: tc < 48.5 ? [1, 0.2] : [-0.8, -0.6], lid: abLid(t, 120, [48.5]), brow: 0.7, sq: landSquash(tc, 48.44, 0.16), tip: idleSway(tc, 121, 0.015, 3.2), handL: [-40, -100], handR: [30, -104] };
    a2Lead(ctx, t, P, m, { shc: '#5a3a3a', lift: 900 - y, kick: 0.6 * pulse(tc, 48.5, 0.4) }); if (tc > 48.6) P.dir = 1; }
}
AB_SHOTS.push({ a: 43.88, b: 47.48, ww: 1600, cam: (t) => ({ x: 500 - 8 * K.clamp((t - 43.88) / 3.6), y: 680, zoom: 1.3 + 0.03 * K.clamp((t - 43.88) / 3.6) }), under: a2CaveUnder(() => 0.34), world: a2S6World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam); a2S6Cloud(ctx, t, cam, S);
    if (t >= 45.32 && t < 45.95) { const [x, y] = abP(170, 720, cam); S.emphasis(ctx, x, y, 220, K.clamp((t - 45.32) / 0.6), { rect: [0, 0, 1000, 1230], word: '', seed: 4 }); }
    if (t > 46.86) { const [x, y] = abP(170, 640, cam); a2Tag(ctx, S, 'CLOP', 330, 300, t, 46.86, 47.5, { size: 56, rot: -0.08 }); a2Tag(ctx, S, 'CLOP', 560, 400, t, 47.06, 47.5, { size: 56, rot: 0.06 });
      soundArcs(ctx, x + 60, y + 40, 1, t, '#ffe6a0'); } } });
AB_SHOTS.push({ a: 47.48, b: 48.78, ww: 2400, cam: (t) => ({ x: 1620 + 30 * K.clamp((t - 47.48) / 1.3), y: 615, zoom: 1.0 }), under: a2GladeUnder('morning'), world: a2S6Out });
AB_SHOTS.push({ a: 48.78, b: 50.04, panel: (ctx, t, S) => { const tc = AB_T3(t);
  a2EyesClose(ctx, t, { gaze: gazePlan(tc, [[48.78, [0.3, 0]], [49.3, [-0.3, 0.1]], [49.7, [0.2, 0]]]), iris: K.lerp(1, 0.42, K.clamp((t - 48.78) / 0.25)), wide: 1, lid: 0, brow: -1, mouth: 'o', sweat: K.clamp((t - 48.9) / 1.0), t,
    reflect: (c, r) => { c.fillStyle = 'rgba(230,246,255,0.85)'; c.fillRect(-r * 0.06, -r, r * 0.12, r * 2); } }, { dx: tremble(t, 2, 9), bands: ['#cfe8ff'] }); } });
AB_SHOTS.push({ a: 50.04, b: 52.69, ww: 1600, cam: () => ({ x: 500, y: 670, zoom: 1.2 }), under: a2CaveUnder(() => 0.34), world: a2S6World, over: (ctx, t, cam) => abStalactites(ctx, cam) });

// ---------- S7 52.69-63.06: the door opens; the leader backlit; the coin trail read; the sack lifted; WHO ARE YOU? ----------
const A2_S7_CAM = [[52.69, { x: 420, y: 670, zoom: 1.25 }], [56.6, { x: 420, y: 670, zoom: 1.25 }], [58.0, { x: 480, y: 690, zoom: 1.4 }], [58.1, { x: 490, y: 700, zoom: 1.5 }], [63.06, { x: 488, y: 700, zoom: 1.5 }]];
const A2_LX = (t) => kfn(t, [[53.95, 170], [54.62, 300], [58.08, 300], [59.0, 368]], 'inOut');
const A2_OPEN7 = (t) => K.ease.inOut(K.clamp((t - 52.69) / 0.7));
const A2_MEN_IN = [{ i: 0, x: 235, s: 0.95, y: 904, t0: 55.0 }, { i: 1, x: 180, s: 0.9, y: 898, t0: 55.5 }, { i: 2, x: 118, s: 0.86, y: 893, t0: 56.0 }];
function a2ManIn(ctx, t, j, m, extra = {}) {   // the men in the cave: they come in down the steps and stand; idle business on their own seeds
  const M = A2_MEN_IN[j], tc = AB_T2(t), xf = (u) => kfn(u, [[M.t0, 170], [M.t0 + 0.9, M.x]], 'out'), x = xf(tc), P = { x, y: M.y, s: M.s, dir: 1, ...walk(xf, tc, { stride: 22 }), gaze: [1, 0.2], lid: abLid(t, 140 + j), tip: idleSway(tc, 141 + j, 0.02, 2.6 + j * 0.4), sq: breathe(tc, 142 + j), handL: [-30, -110], handR: [34, -112], brow: 0.5 };
  if (tc < M.t0) return null;
  if (j === 0 && tc > 57.0 && tc < 57.9) { P.handR = [16, -168]; P.gaze = [0.3, 0.3]; P.mouth = 'grin'; }   // bites a coin
  if (tc > 62.2 + 0.15 * j && tc < 63.06) P.tip = 0.08 * beatIn(tc, 62.2 + 0.15 * j, 62.45 + 0.15 * j);
  Object.assign(P, extra.P ? extra.P(P, tc) || {} : {});
  const lit = x < 300 ? { fin: A2_DAYRIM } : {}; a2Man(ctx, M.i, { ...P, ...lit }, m, { shc: A2_SH, t });
  if (j === 0 && tc > 57.0 && tc < 57.9) { const h = a2Hand(P, 1, { s: M.s }); abBlob(ctx, h[0] + 4, h[1] - 6, 8, 8, '#ffcf3a', '#c07a12', { lw: 2, off: 2 }); }
  return P;
}
function a2S7Leader(ctx, t, m) {
  const tc = AB_T2(t), x = A2_LX(tc), P = { x, y: 902, dir: 1, ...walk(A2_LX, tc, { stride: 26 }), gaze: [1, 0.3], lid: abLid(t, 150), brow: 0.7, tip: idleSway(tc, 151, 0.015, 3.2), sq: breathe(tc, 152), handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R, mouth: 'closed' };
  if (tc > 54.62 && tc < 56.6) { P.gaze = gazePlan(tc, [[54.62, [0.6, 0.8]], [54.85, [0.8, 0.6]], [55.05, [0.95, 0.4]], [55.25, [1, 0.25]], [55.6, [1, 0.1]]], 0.12); P.brow = 0.7 + 0.3 * beatIn(tc, 54.62, 55.5); }
  if (tc > 58.08 && tc < 59.16) { P.handL = [-30, -100]; P.handR = [36, -104]; P.sq *= 1 + 0.03 * beatIn(tc, 58.8, 59.1); }
  if (tc >= 59.16) { P.tip = 0.1; P.brow = 1; const lift = K.ease.inOut(beatIn(tc, 59.3, 59.8)); P.handRW = [K.lerp(445, 400, lift), K.lerp(850, 690, lift)]; P.handL = [-34, -96]; P.gaze = [1, 0.5]; }
  if (tc >= 60.32) { P.tip = 0.12 * K.clamp(1 - (tc - 60.32) / 0.6) + 0.04; P.talk = abTalk(t, 60.32, 61.25, 11); P.mouth = P.talk ? 'open' : 'closed'; P.gaze = [1, 0.2]; }
  if (tc >= 61.3) { const j1 = pulse(tc, 61.4, 0.22), j2 = pulse(tc, 61.7, 0.22), sw = K.ease.inOut(beatIn(tc, 61.88, 62.12)); P.handRW = null;
    P.handR = sw > 0 ? [K.lerp(90, -96, sw), K.lerp(-120, -170, sw)] : [90 + 14 * (j1 + j2), -130 + 30 * (j1 + j2)]; P.talk = abTalk(t, 61.65, 62.93, 12); P.mouth = P.talk ? 'open' : 'closed'; }
  const lightX = x < 330; a2Lead(ctx, t, { ...P, fin: lightX ? A2_DAYRIM : undefined }, m, { shc: A2_SH, kick: 0.5 * pulse(tc, 61.9, 0.4) });
  return P;
}
const A2_LFALLS = footfalls(A2_LX, 53.95, 59.1, 26);
function a2S7Cassim(ctx, t, m, layer) {
  const tc = AB_T2(t), P = { x: 470, y: 1052, dir: 1, kneel: 1, tip: 0.1, lid: 1, mouth: 'o', handL: PERSON_HANDS.headHold.L, handR: PERSON_HANDS.headHold.R, fin: A2_DAYRIM }, o = { shc: A2_SH, shadow: false, fa: 1.1 };
  let behind = true;
  if (tc < 56.5) { o.fa = 1.1 - (tc > 55.5 && tc < 56.0 ? 0.6 : 0) + (tc > 55.5 && tc < 56.0 ? 0.08 * Math.sin(tc * 40) : 0); P.x += tc > 55.5 && tc < 56.0 ? tremble(tc, 2, 9) : 0; }
  if (tc >= 60.32) { P.lid = 0; P.eyes = 'wide'; P.gaze = [-1, -0.6]; }
  if (tc >= 60.58) { const up = K.ease.out(beatIn(tc, 60.58, 60.74)), ox = kfn(tc, [[61.3, 470], [61.9, 612]], 'inOut'); P.x = ox; P.y = K.lerp(1052, 902, up); P.kneel = 1 - up; P.tip = 0; P.dir = -1;
    P.sq = 1 + 0.08 * pulse(tc, 60.6, 0.3); P.handL = [-70, -228]; P.handR = [76, -232]; P.mouth = 'o'; P.gaze = [1, -0.4]; o.fa = 0.3 + lagged((u) => -0.6 * beatIn(u, 60.58, 60.74), tc, 0.12, 1); o.shadow = up > 0.9;
    if (tc > 61.3) { Object.assign(P, walk((u) => kfn(u, [[61.3, 470], [61.9, 612]], 'inOut'), tc, { stride: 20 })); P.dir = -1; }
    if (tc > 62.1) { P.gaze = gazePlan(tc, [[62.1, [1, -0.4]], [62.35, [1, -0.1]], [62.6, [1, -0.3]], [62.85, [1, -0.5]]], 0.08); }
    behind = ox < 580 && up < 0.9; if (up >= 0.9 && ox < 580) behind = true; }
  if (layer === 'behind' && !behind) return; if (layer === 'front' && behind) return;
  if (P.y > 906) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1600, 906); ctx.clip(); a2Cas(ctx, P, m, o); ctx.restore(); } else a2Cas(ctx, P, m, o); return P;
}
function a2S7World(ctx, t, cam) {
  const tc = AB_T2(t), op = A2_OPEN7(t), m = 'cave';
  a2CaveWorld(ctx, t, cam, { dim: 0.85 * (1 - op * 0.6), liveT: t, door: { open: op, crack: 1, light: op, inside: (c) => {
    // in the arch: the leader backlit (53.4-53.95), three men behind at different heights
    for (const [j, x, y, s, t0] of [[0, 120, 880, 0.7, 53.4], [1, 230, 874, 0.62, 53.5], [2, 175, 868, 0.56, 53.6]]) { if (tc < t0 || tc > A2_MEN_IN[j].t0) continue;
      abCel(c, [x, y, 300 * s, 320 * s], (cc) => abMan(cc, A2_MEN_IN[j].i, { x, y, s, dir: 1, tip: idleSway(tc, 160 + j, 0.02, 2), handL: [-30, -110], handR: [30, -112] }, 'cave'), { tint: '#2b1a3a', k: 0.85, rim: '#ff7ad9', light: [-1, -0.2], rimW: 4 }); } } } });
  a2CoinTrail(ctx, { lit: tc > 54.62 && tc < 55.6 ? K.lerp(330, 460, beatIn(tc, 54.62, 55.5)) : null, t });
  a2BigSack(ctx, t);
  // the leader: a backlit silhouette with a pink rim in the arch, colours return as he comes down the steps
  const lx = A2_LX(tc), sil = K.clamp((230 - lx) / 60);
  for (let j = 0; j < 3; j++) a2ManIn(ctx, t, j, m);
  a2S7Cassim(ctx, t, m, 'behind');
  a2Heap(ctx, t, { slump: 1, lift: tc >= 59.3 ? 1 : 0 });
  let L;
  if (tc < 53.4) { } else if (sil > 0.02) { abCel(ctx, [lx, 902, 340, 360], (c) => { L = a2S7Leader(c, t, m); }, { tint: '#2b1a3a', k: 0.85 * Math.round(sil * 4) / 4, rim: '#ff7ad9', light: [-1, -0.25], rimW: 4.5 }); }
  else L = a2S7Leader(ctx, t, m);
  if (L && tc >= 59.3) { const h = a2Hand(L, 1, A2_LEAD); abSack(ctx, h[0], h[1] + 70, 0.66, 1, { coin: true, rot: -0.2 + 0.05 * Math.sin(t * 3) }); }
  a2S7Cassim(ctx, t, m, 'front');
  if (tc > 54.06 && tc < 54.8) for (const f of A2_LFALLS) dustBurst(ctx, f.x + 10, 904, t - f.t, 3, 3, 6, 16, 0.4, Math.round(f.t * 10));
}
AB_SHOTS.push({ a: 52.69, b: 63.06, ww: 1600, cam: a2Cam(A2_S7_CAM), under: a2CaveUnder((t) => 0.34 * (1 - 0.5 * A2_OPEN7(t))), world: a2S7World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam);
    if (t > 55.5 && t < 56.6) { const p = K.clamp((t - 55.5) / 0.4); S.arrow(ctx, abP(620, 650, cam), abP(490, 790, cam), p, { color: '#7fe3ff' }); }
    if (t >= 60.32 && t < 60.95) { const [x, y] = abP(390, 690, cam); S.emphasis(ctx, x, y, 200, K.clamp((t - 60.32) / 0.6), { rect: [0, 0, 1000, 1230], word: '', seed: 9 }); }
    const [lx, ly] = abP(A2_LX(t), 900 - 250, cam);
    abSay(ctx, S, [[60.58, 'WHO ARE YOU?']], t, 300, 300, [lx, ly], { size: 58, gone: 61.65 });
    abSay(ctx, S, [[62.1, 'HOW DID YOU GET IN?']], t, 360, 300, [lx, ly], { size: 54, gone: 63.3 }); } });

// ---------- S8 63.06-71.43: trembling, the offered sack, kneeling, NEVER AGAIN!, the bows, the turban; the silent shadow ----------
const A2_S8_CAM = [[63.06, { x: 488, y: 700, zoom: 1.5 }], [66.0, { x: 488, y: 700, zoom: 1.5 }], [69.5, { x: 450, y: 690, zoom: 1.3 }], [71.43, { x: 446, y: 690, zoom: 1.29 }]];
const A2_TURBAN_OFF = [67.05, 67.85];
function a2S8Cassim(ctx, t, m) {
  const tc = AB_T2(t), P = { x: 612, y: 902, dir: -1, mouth: 'o', gaze: [1, -0.4], lid: abLid(t, 170), tip: idleSway(tc, 171, 0.02, 2), sq: breathe(tc, 172, 0.02), fin: A2_DAYRIM, wet: true, brow: -0.8 }, o = { shc: A2_SH, fa: 0.4 };
  if (tc < 64.12) { P.x += tremble(tc, 3, 9); P.handL = [-50, -150]; P.handR = [56, -156]; o.fa = 0.4 + 0.2 * Math.sin(tc * 50); P.sq *= 1 - 0.02 * Math.abs(Math.sin(tc * 30)); }
  else if (tc < 64.82) { const f = Math.min(2, Math.floor((tc - 64.12) / 0.17)); P.mouth = ['smile', 'smile', 'o'][f]; P.handLW = [540, 820]; P.handRW = [560, 812]; P.tip = 0.08; P.gaze = [1, -0.5]; P.x += tremble(tc, 1.5, 9); }
  else { const kn = K.ease.in(beatIn(tc, 64.82, 65.0)); P.kneel = kn; P.sq = landSquash(tc, 65.0, 0.14) * breathe(tc, 172, 0.02); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.tilt = 0.08 * kn; P.gaze = [1, -0.6];
    if (tc > 65.78 && tc < 66.86) { P.tilt = 0.14 * Math.sin((tc - 65.78) * 16); P.talk = abTalk(t, 65.78, 66.86, 13); P.mouth = 'open'; o.fa = 0.4 + lagged((u) => 0.5 * Math.sin((u - 65.78) * 16), tc, 0.1, 1); P.lid = 0.3; }
    if (tc >= 66.86 && tc < 68.02) { const b = Math.max(pulse(tc, 66.9, 0.45), pulse(tc, 67.4, 0.45)); P.tip = 0.35 * b; P.lid = 1; o.fa = 0.4 + 0.3 * b; o.noTurban = tc >= A2_TURBAN_OFF[0] && tc < A2_TURBAN_OFF[1];
      if (tc > 67.55 && tc < 67.9) { P.handL = [-30, -230]; P.handR = [36, -236]; P.lid = 0; P.gaze = [0.3, 0.8]; } }
    if (tc >= 67.85) P.tilt = 0.1;
    if (tc >= 68.02 && tc < 69.52) { P.x = kfn(tc, [[68.02, 612], [68.5, 588]], 'inOut'); P.tip = -0.04 * pulse(tc, 68.1, 0.3); P.handL = [70, -150]; P.handR = [84, -160]; P.brow = -1; P.gaze = gazePlan(tc, [[68.02, [1, 0.1]], [68.4, [1, -0.5]], [68.8, [1, 0.1]], [69.2, [1, -0.5]]], 0.08); P.mouth = 'closed'; }
    if (tc >= 69.52) { P.x = 588; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.gaze = [1, -0.7]; P.sq = 0.94 * breathe(tc, 172, 0.03) * (1 - 0.02 * pulse(tc, 70.8, 0.3)); o.fa = 0.4 + 0.8 * beatIn(tc, 70.4, 71.2); P.mouth = 'closed'; } }
  a2Cas(ctx, P, m, o); return P;
}
function a2S8Leader(ctx, t, m) {
  const tc = AB_T2(t), xf = (u) => kfn(u, [[69.6, 368], [70.1, 400]], 'inOut'), P = { x: xf(tc), y: 902, dir: 1, ...walk(xf, tc, { stride: 26 }), gaze: [1, 0.3], lid: abLid(t, 150, [69.85]), brow: 1, tip: 0.04 + idleSway(tc, 151, 0.015, 3.2), sq: breathe(tc, 152), handL: [-34, -100], handR: [40, -110], mouth: 'closed' };
  if (tc > 65.0) P.gaze = [1, 0.6];
  if (tc >= 69.52) { const f = beatIn(tc, 69.52, 69.75); P.handL = f > 0.5 ? PERSON_HANDS.folded.L : [-34, -100]; P.handR = f > 0.5 ? PERSON_HANDS.folded.R : [40, -110]; P.tilt = -0.05; P.lid = Math.max(abLid(t, 150), abBlinkAt(AB_T3(t), 69.8) > 0 ? K.clamp(1 - Math.abs(AB_T3(t) - 70.0) / 0.25) : 0); }
  a2Lead(ctx, t, P, m, { shc: A2_SH, kick: 0.3 * beatIn(tc, 69.6, 69.9) * (1 - beatIn(tc, 70.1, 70.5)) }); return P;
}
function a2S8World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'cave';
  a2CaveWorld(ctx, t, cam, { dim: 0.34, door: { open: 1, crack: 1, light: 1 } });
  a2CoinTrail(ctx, {}); a2BigSack(ctx, t);
  A2_MEN_IN.forEach((M, j) => a2ManIn(ctx, t, j, m, { P: (P, tc2) => {
    if (j === 0 && tc2 > 68.6 && tc2 < 69.3) return { handL: [-60, -150], handR: [60, -150], tip: -0.04 };                       // shrug
    if (j === 1 && tc2 > 68.8 && tc2 < 69.6) return { handL: [20, -136 + 4 * Math.sin(tc2 * 30)], handR: [26, -132], gaze: [1, 0.4] };   // cracks his knuckles
    if (j === 2 && tc2 > 69.0 && tc2 < 69.8) return { mouth: 'o', tilt: -0.12, lid: 0.7, handR: [10, -168] }; } }));                       // yawns
  a2Heap(ctx, t, { slump: 1, skip: [1, 3] }); abSack(ctx, 330, 910, 0.64, 1, { coin: true, rot: -0.5 });
  const L = a2S8Leader(ctx, t, m);
  // the offered sack: in his hands, then dropped; it rolls away to the right
  if (tc >= 64.12 && tc < 64.86) abSack(ctx, 548, 852, 0.6, 1, { coin: true, rot: -0.1 });
  else if (tc >= 64.86) { const u = K.clamp((tc - 64.86) / 0.7), x = K.lerp(548, 720, K.ease.out(u)); abSack(ctx, x, 908, 0.6, 1, { coin: true, rot: (x - 548) * 0.03 }); }
  else abSack(ctx, 535, 911, 0.64, 1, { coin: true, rot: 0.12 });
  // the leader's long shadow falls over him
  const sh = K.ease.inOut(beatIn(tc, 69.6, 70.2)); if (sh > 0) { ctx.save(); ctx.globalAlpha = 0.38 * sh; ctx.fillStyle = '#1a0c20'; ctx.beginPath(); const lx = L.x; ctx.moveTo(lx - 20, 904); ctx.lineTo(lx + 26, 904); ctx.lineTo(lx + 330, 860 - 200 * sh); ctx.lineTo(lx + 380, 980); ctx.closePath(); ctx.fill(); ctx.restore(); }
  a2S8Cassim(ctx, t, m);
  if (tc >= A2_TURBAN_OFF[0] && tc < A2_TURBAN_OFF[1]) { const u = K.clamp((tc - A2_TURBAN_OFF[0]) / 0.3), x = K.lerp(560, 520, u), y = K.lerp(800, 896, u * u) - 30 * Math.sin(Math.PI * u), rot = -1.2 * u;
    const up = beatIn(tc, 67.55, 67.85), X = K.lerp(x, 600, up), Y = K.lerp(y, 720, up);
    ctx.save(); ctx.translate(X, Y); ctx.rotate(rot * (1 - up)); abBlob(ctx, 0, -20, 50, 30, AB_CAS0.hc, AB_CAS0.hd, { lw: 3, off: 10 }); abBlob(ctx, 14, -22, 8, 9, AB_CAS0.jewel, '#8a1010', { lw: 2 }); ctx.restore(); }
}
AB_SHOTS.push({ a: 63.06, b: 71.43, ww: 1600, cam: a2Cam(A2_S8_CAM), under: a2CaveUnder(() => 0.17), world: a2S8World,
  over: (ctx, t, cam, S) => { abStalactites(ctx, cam); const [cx, cy] = abP(600, 900 - 200, cam);
    abSay(ctx, S, [[65.78, 'NEVER AGAIN!'], [66.26, 'NEVER AGAIN! I PROMISE!']], t, 600, 330, [cx, cy], { size: 50, gone: 67.6, wobble: 5 }); } });
