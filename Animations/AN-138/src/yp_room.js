// ===== AN-138 guest room scenes: S5 (the room), S8 (days spin), S9 (mornings), S10 (thirty nights), S11 (the fear), S12 (packing), S14a (empty couch) =====
const YP_SITY = YP_ROOM.diwan[2] + 48;   // a person sitting on the diwan stands on this line (sit 1, seat 'bench')
// heap of silver on the floor: height from the purses that landed (S8 and S9)
const YP_LAND = [70.78, 71.71, 71.99, 72.2, 77.28, 78.14, 78.36, 78.58, 78.8];
function ypHeapH(t) { let h = 0; YP_LAND.forEach((tl, i) => { if (t >= tl) h += (i < 4 ? 8 : 7) * landSquash(t, tl, -0.25, 9); });
  [78.9, 79.1, 79.3].forEach((tl) => { if (t >= tl) h += 22 * settleTo(t, tl, 0, 1, 0.18, 0.2); }); return h; }
function ypDrawHeap(ctx, t, x = YP_ROOM.heap) { const h = ypHeapH(t); if (h < 1) return 900; const w = 40 + h * 0.65; ypHeap(ctx, x, YP_GR + 4, w, h, 21);
  const n = YP_LAND.filter((tl) => t >= tl + 0.12).length; for (let i = 0; i < n; i++) ypPurse(ctx, x - w * 0.55 + ((i * 37) % Math.max(1, w * 1.1)), YP_GR + 2 - h * 0.25 - (i % 3) * h * 0.18, 0.6, { rot: ((i * 0.7) % 1.2) - 0.6, mark: i >= 4 ? '1000' : null, markSize: 18 }); return YP_GR - h; }

// ---------- S5: the guest room is made ready; he arrives and sinks into the couch ----------
function ypSceneRoomS5(ctx, t, F) {
  const cq = 1 - 0.2 * pulse(t, 38.75, 0.25) + 0.1 * pulse(t, 39.0, 0.25) - 0.25 * landSquash(t, 42.0, -1, 8) * (t > 42 ? 1 : 0) * 0 - (t >= 41.6 && t < 41.8 ? 0.08 : 0);
  const sinking = t >= 41.8 ? ypE(t, 41.8, 0.25) : 0;
  ypRoom(ctx, t, { u: 0.25, lamp: ypE(t, 39.54, 0.4), rug: ypE(t, 38.7, 0.5), dent: sinking * 0.8, dentX: 650, cushion: cq });
  // servant A unrolls the rug, servant B plumps the cushion; both leave past him with bows
  const ax = (tt) => kfn(tt, [[38.5, 520], [40.9, 520], [42.2, 120]], 'inOut'), bx = (tt) => kfn(tt, [[38.5, 790], [41.0, 790], [42.22, 230]], 'inOut');
  const A = ypServA({ ...ypWalk(ax, t, 1.05), dir: t < 40.9 ? 1 : -1, kneel: 0.7 * ypEnv(t, 38.5, 39.4, 0.2), handRW: ypIn(t, 38.5, 39.3) ? [K.lerp(560, 900, ypE(t, 38.7, 0.5)), 900] : null, gaze: t < 39.3 ? [1, 0.8] : [0, 0.2] });
  A.tip = 0.25 * ypEnv(t, 41.1, 41.6, 0.15); A.alpha = 1 - ypE(t, 42.0, 0.2);
  const B = ypServB({ ...ypWalk(bx, t, 1.05), dir: t < 41.0 ? 1 : -1, tip: 0.3 * ypEnv(t, 38.5, 39.3, 0.15), handRW: ypIn(t, 38.5, 39.3) ? [800, 790 + 14 * Math.abs(Math.sin((t - 38.6) * 10))] : null, gaze: [0.5, 0.8] });
  if (t > 39.3) { B.gaze = [-1, 0.1]; B.handR = PERSON_HANDS.chest.R; } B.alpha = 1 - ypE(t, 42.0, 0.2); B.tip = Math.max(B.tip, 0.25 * ypEnv(t, 41.2, 41.7, 0.15));
  // the guest: two steps in, frozen with darting eyes, a poke, then he sits and sinks
  const gx = (tt) => kfn(tt, [[40.38, 120], [40.75, 300], [41.3, 300], [41.62, 560]], 'inOut');
  const G = ypGuest({ ...ypWalk(gx, t, 1.2), dir: 1, mouth: 'o', lean: 0.03 }, t);
  if (t < 40.38) G.alpha = 0;
  const gh = [G.x, 650];
  if (ypIn(t, 40.75, 41.3)) { G.gaze = lookAt(gh, gazePlan(t, [[40.75, [700, 800]], [40.88, [730, 260]], [41.0, [560, 400]], [41.14, [720, 800]]], 0.07)); G.sq = 1.03; }
  if (ypIn(t, 41.6, 41.85)) { G.handRW = [650, 838]; G.gaze = lookAt(gh, [650, 838]); }
  if (t >= 41.62) { G.x = K.lerp(560, 640, ypE(t, 41.62, 0.25)); G.amp = 0; }
  if (t >= 41.8) { const k = ypE(t, 41.8, 0.22); G.sit = k; G.seat = 'bench'; G.y = K.lerp(YP_GR, YP_SITY, k); G.dir = -1; G.sq = landSquash(t, 42.0, 0.12); G.mouth = t > 42.05 ? 'smile' : 'o'; G.lid = t > 42.05 ? 0.3 : 0; G.gaze = [0, -0.2]; }
  person(ctx, G); person(ctx, A); person(ctx, B);
  dustBurst(ctx, 650, 830, t - 42.0, 7, 8, 16, 46, 0.5, 42);
  F.heads.G = ypHead(G);
}

// ---------- S8: the days and weeks spin past ----------
// v2 (note 7): a new pose with every DAY / WEEK label, the tray on his knees for يأكل 68.02 (hand to mouth twice, cheeks full)
const YP_LAP = [700, 846];   // tray rim on his knees (world)
function ypGuestS8(t) {
  const G = ypGuest({ x: 700, y: YP_SITY, dir: -1, sit: 1, seat: 'bench', mouth: 'smile', sq: breathe(t, 4, 0.02) }, t);
  G.gaze = lookAt([700, 600], gazePlan(t, [[61.28, [560, 400]], [62.3, [300, 450]], [63.2, [730, 260]], [63.9, [560, 400]]], 0.3));
  // he tries the cushion: two bounces, then settles back
  if (ypIn(t, 62.4, 63.3)) { G.sq = 1 - 0.07 * Math.abs(Math.sin((t - 62.4) * Math.PI / 0.3)); G.mouth = 'open'; G.handL = PERSON_HANDS.palmsUp.L; G.handR = PERSON_HANDS.palmsUp.R; }
  if (ypIn(t, 63.3, 64.32)) { G.handL = PERSON_HANDS.headHold.L; G.handR = PERSON_HANDS.headHold.R; G.tip = -0.08 * ypE(t, 63.3, 0.3); G.lid = 0.5; }
  if (ypIn(t, 64.32, 67.7)) { const i = t < 66.2 ? ypDayIdx(t) : 6 + ypWeekIdx(t) - 1;   // 0..6 days, 7..9 weeks
    const pose = [0, 1, 2, 3, 4, 5, 6, 2, 3, 7][i]; G.gaze = [-0.8, 0.1];
    if (pose === 0) { G.handL = PERSON_HANDS.folded.L; G.handR = PERSON_HANDS.folded.R; G.mouth = 'smile'; }
    if (pose === 1) { G.handRW = [770, 826 + 8 * Math.abs(Math.sin(t * 22))]; G.handR = null; G.gaze = lookAt([700, 600], [770, 830]); }
    if (pose === 2) { G.aL = [-2.45, -2.8]; G.aR = [2.45, 2.8]; G.mouth = 'open'; G.lid = 0.9; G.sq = 1.04; }
    if (pose === 3) { G.handL = PERSON_HANDS.headHold.L; G.handR = PERSON_HANDS.headHold.R; G.tip = -0.1; G.lid = 0.6; }
    if (pose === 4) { G.handR = PERSON_HANDS.mouthCover.R; G.handL = PERSON_HANDS.folded.L; G.lid = 0.3; G.mouth = 'closed'; }
    if (pose === 5) { G.handR = [54 + 10 * Math.sin(t * 30), -196]; G.gaze = [0.2, -0.4]; G.mouth = 'o'; }
    if (pose === 6) { G.lie = 0.45; G.sit = 0.55; G.y = K.lerp(YP_SITY, YP_ROOM.diwan[2] + 4, 0.45); G.handL = [-44, -214]; G.handR = [40, -216]; G.lid = 0.7; }
    if (pose === 7) { G.handL = PERSON_HANDS.folded.L; G.handR = PERSON_HANDS.folded.R; G.lid = 0.55; G.mouth = 'smile'; G.sq = 1.03; } }
  // يأكل: tray on his knees, hand to mouth twice, cheeks full
  if (ypIn(t, 67.7, 68.62)) { G.gaze = lookAt([700, 600], YP_LAP); G.mouth = 'closed';
    const bite = Math.max(pulse(t, 67.78, 0.3), pulse(t, 68.1, 0.3)); G.handR = ypL2([24, -62], PERSON_HANDS.mouthCover.R, bite); G.handL = [30, -66];
    if (t >= 68.0) { G.lid = 0.4; G.sq = 1 + 0.02 * Math.sin((t - 68.0) * 26); } }
  const lie = ypE(t, 68.6, 0.5) * (1 - 0.5 * ypE(t, 70.0, 0.3));
  if (t >= 68.6) { G.sit = 1 - lie; G.lie = lie; G.y = K.lerp(YP_SITY, YP_ROOM.diwan[2] + 4, lie); G.handL = [-44, -214]; G.handR = [40, -216]; G.lid = 1; G.mouth = 'smile'; G.gaze = null; G.x = 700; }
  if (t >= 69.84) { G.lid = 0; G.wink = 'L'; G.gaze = lookAt([700, 700], [500, 720]); }
  if (ypIn(t, 70.0, 70.6)) { G.handRW = [590, 760]; G.handR = null; }
  if (t >= 70.6) { G.handR = [44, -150]; G.wink = t < 71.2 ? 'L' : null; G.lid = t > 71.2 ? 0.6 : 0; }
  return G;
}
// puffed cheeks while chewing
function ypCheeks(ctx, P, a) { if (a <= 0) return; ypOnBody(ctx, P, (c) => { const y = ypHdY(P) + 14; c.globalAlpha *= a; for (const sd of [-1, 1]) shape(c, ell(sd * 30, y, 12 * a, 10 * a, 12), C.white, { lw: 3.5, seed: 17, dot: C.skin, pitch: 5, rad: 0.25, da: 0.5 }); }); }
function ypSceneRoomS8(ctx, t, F) {
  const u = ypU(t);
  ypRoom(ctx, t, { u, dent: 0.8, dentX: 700 });
  ypDrawHeap(ctx, t);
  const G = ypGuestS8(t);
  const trK = ypE(t, 67.6, 0.2) * (1 - ypE(t, 68.62, 0.25)), trayD = () => ypTray(ctx, K.lerp(610, YP_LAP[0], trK), K.lerp(832, YP_LAP[1], trK), K.lerp(0.55, 0.75, trK), { noCover: true, t });
  if (t < 69.0 && trK < 0.5) trayD();
  const sx = (tt) => kfn(tt, [[69.0, -60], [69.8, 470]], 'out');
  if (t >= 69.0) { const S = ypServA({ ...ypWalk(sx, t, 1.05), dir: 1, handR: PERSON_HANDS.reach.R, gaze: [1, 0.2] }); if (t > 71.2) S.handR = ypL2([60, -100], [96, -190], Math.abs(Math.sin((t - 71.2) * Math.PI / 0.28))); person(ctx, S);
    if (t < 70.35) ypPurse(ctx, ...ypPt(S, 105, -160), 0.8, { mark: '1000', markSize: 18 }); }
  person(ctx, G); if (t < 69.0 && trK >= 0.5) trayD(); ypCheeks(ctx, G, ypEnv(t, 68.0, 68.62, 0.08));
  if (t >= 68.6 && t < 69.84) zzz(ctx, 760, 700, t);
  // the purses fly to the heap
  const hp = ypPt(G, 44, -150);
  if (ypIn(t, 70.35, 70.45)) ypPurse(ctx, hp[0], hp[1] + 20, 0.8, { mark: '1000', markSize: 18 });
  const a1 = ypArc(t, 70.45, 0.33, [hp[0], hp[1]], [YP_ROOM.heap, 880], 90); if (a1) ypPurse(ctx, a1[0], a1[1], 0.8, { rot: (t - 70.45) * 9, mark: '1000', markSize: 18 });
  [71.36, 71.64, 71.85].forEach((t0, i) => { const a = ypArc(t, t0, YP_LAND[i + 1] - t0, [520, 720], [YP_ROOM.heap + (i - 1) * 20, 880], 70); if (a) ypPurse(ctx, a[0], a[1], 0.8, { rot: (t - t0) * 9, mark: '1000', markSize: 18 }); });
  ypRoomDim(ctx, t, u);
  F.heads.G = ypHead(G);
}
function ypRoomDim(ctx, t, u, lamp = 1) { const n = ypRoomNight(t, u); ypNight(ctx, n * (1 - 0.15 * lamp), lamp > 0.05 ? [[YP_ROOM.lamp[0], YP_ROOM.lamp[1] + 380, 420 * (0.6 + 0.4 * lamp) * (1 + 0.03 * Math.sin(t * 13))]] : []); }

// ---------- S9: mornings, purses and the growing heap ----------
function ypSceneRoomS9(ctx, t, F) {
  const u = ypU(t), D = YP_ROOM.door, rep = [77.92, 78.14, 78.36, 78.58];
  ypRoom(ctx, t, { u, dent: 0.8, dentX: 700, doorOpen: ypEnv(t, 74.4, 80.0, 0.3) });
  // morning beam from the window toward the door
  if (t >= 73.42) { ctx.save(); ctx.globalAlpha = 0.35 * ypE(t, 73.42, 0.6); ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.4); K.poly(ctx, [[515, 470], [605, 470], [300, 900], [70, 900]], true); ctx.fill(); ctx.restore(); }
  const top = ypDrawHeap(ctx, t);
  // the treasurer in the doorway with a purse marked 1000, then the quick repeats
  if (ypIn(t, 74.6, 79.8)) { const r = rep.findIndex((r0) => t >= r0 && t < r0 + 0.22), k = r >= 0 ? r + 1 : 0, tx = (tt) => kfn(tt, [[74.6, -40], [75.0, 150], [79.3, 150], [79.75, -40]], 'inOut');
    ctx.save(); ctx.beginPath(); ctx.rect(D[0] + 6, -100, 3000, 2000); ctx.clip();
    const T = ypTreas({ ...ypWalk(tx, t, 1.1), dir: t < 79.3 ? 1 : -1, tip: (0.15 - k * 0.03) * (pulse(t, 75.0, 0.5) + (r >= 0 ? pulse(t, rep[r], 0.2) : 0)), mouth: 'smile', handR: t < 75.6 || r >= 0 ? PERSON_HANDS.reach.R : null, gaze: lookAt([150, 680], [320, 680]) });
    T.ledgerUnder = true; person(ctx, T); ypOnBody(ctx, T, (c) => ypLedger(c, -40, -110, 0.6, { open: 0 }));
    if (t < 75.6 || r >= 0) ypPurse(ctx, ...ypPt(T, 108, -160), 0.85, { mark: '1000', markSize: 18 }); ctx.restore(); }
  rep.forEach((t0, i) => { const a = ypArc(t, t0 + 0.02, YP_LAND[5 + i] - t0 - 0.02, [250, 760], [YP_ROOM.heap + (i % 2 ? 24 : -24), 880], 80); if (a) ypPurse(ctx, a[0], a[1], 0.8, { rot: (t - t0) * 10, mark: '1000', markSize: 18 }); });
  // the guest
  const gx = (tt) => kfn(tt, [[79.38, 330], [79.7, 270], [81.3, 270], [81.9, 410]], 'inOut');
  const G = ypGuest({ ...ypWalk(gx, t, 1.2), dir: -1, mouth: 'smile' }, t);
  const tf = turnFlip(t, [[0, -1], [76.7, 1]], 0.35); G.dir = tf.dir;
  const gh = [G.x, 650];
  if (ypIn(t, 73.42, 74.6)) { const k = ypEnv(t, 73.5, 74.5, 0.25); G.aL = [-2.45 * k, -2.8 * k]; G.aR = [2.45 * k, 2.8 * k]; if (k < 0.05) { G.aL = null; G.aR = null; } G.mouth = 'open'; G.lid = 0.9 * k; G.sq = 1 + 0.05 * k; }
  if (ypIn(t, 75.3, 77.0)) { G.handR = PERSON_HANDS.reachBoth.R; G.handL = PERSON_HANDS.reachBoth.L; G.gaze = lookAt(gh, [160, 680]); G.tip = 0.12 * ypEnv(t, 75.95, 76.6, 0.15); }
  if (t >= 76.7) G.gaze = lookAt(gh, [YP_ROOM.heap, top]);
  if (ypIn(t, 79.38, 80.4)) { G.handL = PERSON_HANDS.headHold.L; G.handR = PERSON_HANDS.headHold.R; G.sq = 0.94 + 0.06 * ypE(t, 79.5, 0.4); G.mouth = 'o'; G.brow = -0.8; }
  if (ypIn(t, 80.54, 81.3)) { G.handR = PERSON_HANDS.cheeks.R; G.lid = ypIn(t, 80.6, 80.9) ? 1 : 0; G.mouth = t < 80.9 ? 'frown' : 'open'; G.handL = null; }
  if (t >= 81.9) { const sc = ypE(t, 82.04, 0.25) * (1 - 0.6 * ypE(t, 82.4, 0.3)); G.handRW = [478, 800 - 30 * sc]; G.handLW = [452, 805 - 30 * sc]; G.handR = null; G.handL = null; G.wet = true; G.mouth = 'open'; G.tip = 0.15 * (1 - sc); G.gaze = lookAt(gh, [465, 780]); }
  person(ctx, G);
  if (ypIn(t, 75.6, 77.0)) ypPurse(ctx, ...ypPt(G, 98, -168), 0.85, { mark: '1000', markSize: 18 });
  const a0 = ypArc(t, 77.0, 0.28, [G.x + 60, 700], [YP_ROOM.heap, 880], 70); if (a0) ypPurse(ctx, a0[0], a0[1], 0.8, { rot: (t - 77) * 10, mark: '1000', markSize: 18 });
  // coins run through his fingers; the last one spins on its edge and falls flat
  if (t >= 82.3) { for (let i = 0; i < 7; i++) { const t0 = 82.3 + i * 0.08, y = fallY(t, t0, t0 + 0.35, 790, top + 10 + (i % 3) * 8); if (t >= t0 && t < t0 + 0.4) ypCoin(ctx, 458 + (i % 4) * 9, y, 9, 0.5 + 0.5 * Math.sin(t * 20 + i)); } }
  if (t >= 82.8) { const sp = K.clamp((t - 82.8) / 0.55), x = 440, y = top + 4; ypCoin(ctx, x, y - 10 * (1 - sp), 12, sp < 1 ? Math.cos((t - 82.8) * 30) * (1 - sp) + 0.08 : 0.35); }
  ypRoomDim(ctx, t, u);
  F.heads.G = ypHead(G);
}

// ---------- S10-S12 (night): the sack, the fear, the packing ----------
const YP_SACKX = 520;
function ypGuestNight(t) {
  const G = ypGuest({ x: 690, dir: -1, mouth: 'smile' }, t), gh = () => ypHead(G);
  // S10: proud beside the sack, catches the escaping coin
  if (t < 91.94) { G.handL = PERSON_HANDS.hipsHands.L; G.handR = PERSON_HANDS.hipsHands.R; G.tip = -0.05; G.gaze = lookAt([690, 650], [YP_SACKX, 640]);
    if (ypIn(t, 90.45, 91.3)) { G.handRW = t < 90.75 ? ypL2([630, 720], [600, 640], ypE(t, 90.45, 0.3)) : ypL2([600, 640], [560, 620], ypE(t, 90.8, 0.3)); G.handR = null; G.gaze = lookAt([690, 650], G.handRW); G.mouth = 'o'; }
    if (ypIn(t, 91.3, 91.9)) { G.handRW = [600, 690 + 10 * Math.abs(Math.sin((t - 91.3) * 10))]; G.handR = null; } return G; }
  // S11: sits before the sack; eyes climb it; fear
  if (t < 108.9) { G.x = 650; G.sit = 1; G.seat = 'floor'; G.handR = PERSON_HANDS.chin.R; G.handL = PERSON_HANDS.folded.L; G.gaze = lookAt([650, 640], [YP_SACKX, 860]); G.sq = breathe(t, 6, 0.015);
    if (t >= 93.74) { G.gaze = lookAt([650, 640], [YP_SACKX, kfn(t, [[93.74, 860], [94.94, 610]])]); G.drop = -8 * ypE(t, 93.74, 1.2); G.tilt = 0.06 * ypE(t, 93.74, 1.2); }
    if (t >= 95.42) { G.mouth = t < 95.62 ? 'smile' : t < 95.9 ? 'o' : 'frown'; G.brow = -0.8 * ypE(t, 95.42, 0.3); G.handR = PERSON_HANDS.folded.R; G.drop = -8; G.gaze = [0, -0.1]; }
    if (t >= 96.24 && t < 102.64) { G.gaze = lookAt([650, 640], [560, 300]); G.brow = -0.8; G.mouth = 'frown'; G.x += tremble(t, 0.6); }
    if (t >= 102.64 && t < 105.98) { const k = ypE(t, 102.64, 0.25); G.drop = 5 * pulse(t, 102.64, 0.3); G.handLW = [612, 780]; G.handRW = [606, 720]; G.handL = null; G.handR = null; G.tip = 0.14 * k; G.x += tremble(t, 2); G.mouth = 'frown'; G.wet = true; G.gaze = lookAt([650, 640], [560, 300]); }
    if (ypIn(t, 105.4, 105.98)) { G.look = Math.sin((t - 105.4) * 30) * ypEnv(t, 105.4, 105.98, 0.1); G.lid = 1; }
    if (t >= 105.98) { G.handR = PERSON_HANDS.clasp.R; G.handL = PERSON_HANDS.clasp.L; G.brow = -0.7; G.mouth = 'closed'; G.tip = 0;
      G.gaze = lookAt([650, 640], gazePlan(t, [[105.98, [130, 760]], [106.6, [560, 400]], [107.2, [130, 760]], [107.8, [560, 400]], [108.3, [130, 760]]], 0.07)); G.lid = 0.2; }
    return G; }
  // S12: stands, bites his knuckle, packs, hushes, heaves the sack, the slipping coin
  const gx = (tt) => kfn(tt, [[108.9, 650], [111.0, 650], [111.55, 770], [114.3, 770], [114.75, 650], [115.6, 650], [115.85, 625], [117.0, 625], [117.28, 560]], 'inOut');
  Object.assign(G, ypWalk(gx, t, 1.2)); G.mouth = 'closed'; G.brow = -0.6; G.dir = -1;
  G.sit = 1 - ypE(t, 109.0, 0.4); G.seat = 'floor'; G.sq = 1 - 0.08 * pulse(t, 108.9, 0.15);
  G.look = ypIn(t, 109.4, 109.9) ? 0.8 * Math.sin((t - 109.4) * 12.6) : 0;
  G.gaze = lookAt([G.x, 640], [130, 760]);
  if (ypIn(t, 110.24, 111.2)) { G.handR = PERSON_HANDS.mouthCover.R; G.gaze = [-0.6, -0.8]; G.x += tremble(t, 1.2, 11); }
  if (ypIn(t, 111.6, 114.2)) { G.kneel = 0.6 * ypEnv(t, 111.6, 114.2, 0.25); G.gaze = lookAt([G.x, 700], [700, 880]); G.handRW = [712 + 10 * Math.sin(t * 9), 860]; G.handLW = [690, 866]; G.handR = null; G.handL = null; }
  if (ypIn(t, 114.16, 114.75)) { G.handR = PERSON_HANDS.hush.R; G.gaze = lookAt([G.x, 640], [130, 760]); }
  const carry = ypE(t, 115.0, 0.4);
  if (ypIn(t, 114.75, 115.05)) { G.sq = 0.88; G.kneel = 0.3; G.handLW = [600, 860]; G.handRW = [606, 820]; G.handL = null; G.handR = null; }
  if (t >= 115.05) { G.tip = 0.28 * carry; G.sq = 1.06 - 0.12 * carry; G.handL = [-30, -186]; G.handR = [56, -64]; G.drop = 4; }
  if (ypIn(t, 115.8, 116.3)) { G.amp = 0.4; G.ph = 1.2; G.gaze = lookAt([G.x, 640], [G.x - 20, 880]); G.mouth = 'o'; G.brow = -0.9; }
  if (ypIn(t, 116.3, 117.0)) { G.amp = 0.4; G.ph = 1.2; G.lid = pulse(t, 116.4, 0.5); G.mouth = 'closed'; G.gaze = [0, 1]; }
  if (ypIn(t, 116.95, 117.28)) { G.handR = [60, -120]; }
  return G;
}
function ypSceneNight(ctx, t, F) {
  const u = 0.75, lampK = t < 87.16 ? 0.45 : t < 95.42 ? 1 : t < 114.16 ? 0.7 + 0.08 * Math.sin(t * 17) * (t < 96.5 ? 1 : 0) : 0.7 - 0.35 * ypE(t, 114.16, 0.45);
  ypRoom(ctx, t, { u, dent: 0.8, dentX: 700, lamp: lampK });
  const G = ypGuestNight(t), onBack = t >= 115.0;
  // bundle: cloth spread, three things hop in, the knot pulls tight; then it hangs from his hand
  if (ypIn(t, 111.64, 115.4)) { ypBundle(ctx, 700, 900, ypE(t, 113.5, 0.4)); }
  [[112.84, [645, 832], (c, x, y) => ypCup(c, x, y, 0.9)], [113.04, [870, 900], (c, x, y) => ypSandal(c, x, y, 1)], [113.24, [690, 832], (c, x, y) => ypPurse(c, x, y, 0.6, { fill: 0 })]].forEach(([t0, p0, fn]) => {
    if (t < t0 && t >= 105.98) fn(ctx, ...p0); const a = ypArc(t, t0, 0.3, p0, [700, 890], 50); if (a) fn(ctx, ...a); });
  if (!onBack) { const b = 1 + 0.06 * pulse(t, 90.28, 0.3), lift = ypE(t, 114.95, 0.1); ypSack(ctx, YP_SACKX + 40 * lift, YP_GR - 20 * lift, 1.6, { bulge: pulse(t, 90.28, 0.3) * 2, sq: (t >= 102.64 && t < 105.98 ? 0.97 : 1) / (1 + 0 * b) }); }
  else ypBackSack(ctx, G, t);
  person(ctx, G);
  if (t >= 115.45) { const h = ypPt(G, 56, -64); packLoad(ctx, ['bindle'], h[0], h[1] + 40, 0.45); }
  // the escaping coin in S10, the slipping coin in S12
  const c1 = ypArc(t, 90.3, 0.45, [YP_SACKX, 600], [600, 640], 70); if (c1) ypCoin(ctx, c1[0], c1[1], 11, Math.cos(t * 20));
  if (ypIn(t, 90.75, 91.2)) ypCoin(ctx, ...ypL2([600, 640], [560, 620], ypE(t, 90.8, 0.3)), 11, 1);
  if (t >= 115.8 && t < 117.2) { const top = ypPt(G, -38, -260); let x = G.x - 18, y = fallY(t, 115.8, 116.3, top[1], 878); if (t >= 116.95) { const a = ypArc(t, 116.95, 0.25, [x, 878], ypPt(G, 60, -120), 40); if (a) [x, y] = a; else { x = -999; } } ypCoin(ctx, x, y, 11, t < 116.3 ? Math.cos(t * 22) : 0.4); }
  if (ypIn(t, 95.6, 96.6)) ypSweat(ctx, ...ypPt(G, 30, -232), (t - 95.6) / 1.0);
  ypRoomDim(ctx, t, u, lampK);
  F.heads.G = ypHead(G);
}

// ---------- S14a: the empty couch in the morning ----------
function ypSceneEmpty(ctx, t, F) {
  ypRoom(ctx, t, { u: 1.05, dent: 0.8, dentX: 700, rugSkew: 14, doorOpen: ypE(t, 129.0, 0.3) });
  const ax = (tt) => kfn(tt, [[129.0, 60], [129.7, 420]], 'out'), bx = (tt) => kfn(tt, [[129.15, -80], [129.78, 330]], 'out');
  const A = ypServA({ ...ypWalk(ax, t, 1.05), dir: 1, handRW: [K.lerp(60, 420, 0) + ax(t) + 62, 790], handLW: [ax(t) + 40, 795], mouth: t < 129.5 ? 'smile' : 'closed' });
  A.tip = lurch(t, 129.78, 0.2); A.gaze = lookAt([A.x, 690], gazePlan(t, [[129.32, [700, 820]], [129.6, [520, 890]], [130.32, [700, 820]], [130.9, [330, 690]]], 0.2));
  if (t >= 130.32) { A.mouth = 'o'; A.drop = -4; }
  const B = ypServB({ ...ypWalk(bx, t, 1.05), dir: 1, mouth: 'smile', gaze: [1, 0] }); B.tip = -0.1 * pulse(t, 129.78, 0.3);
  if (t >= 130.32) { B.mouth = 'o'; B.gaze = lookAt([B.x, 690], t < 130.9 ? [700, 820] : [A.x, 690]); B.handL = PERSON_HANDS.cheeks.L; B.handR = PERSON_HANDS.cheeks.R; }
  person(ctx, B); person(ctx, A);
  const wob = 0.15 * swing(t, 129.78, 1, 3, 3), tp = [ax(t) + 52, 786];
  ctx.save(); ctx.translate(tp[0], tp[1]); ctx.rotate(wob); ypTray(ctx, 0, 0, 0.6, { cover: 0.98, t }); ypPurse(ctx, 34, -8, 0.6, { mark: '1000', markSize: 18 }); ctx.restore();
  const d = ypArc(t, 129.8, 0.5, [tp[0] + 30, tp[1] - 12], [tp[0] + 30, tp[1] - 8], 50); if (d) shape(ctx, ell(d[0], d[1], 6, 4, 10), YP_BROWND, { lw: 2, seed: 633 });
  F.heads.A = ypHead(A); F.heads.B = ypHead(B);
}
