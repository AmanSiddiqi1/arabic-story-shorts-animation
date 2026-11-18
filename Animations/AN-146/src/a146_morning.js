// ===== AN-146 the street by day: S9 dawn loading and two dirhams, S10 the real merchant's royal welcome, S12 the questioning =====
// silhouette icon (cached): draws fn at feet-centre (0, 0) into a w x h layer and fills it black; drawn with its feet at (x, y), scale sc
// v2: icons are drawn in colour (black silhouettes could not be told apart at phone size); sil = true keeps the black version
function a146Sil(c, key, w, h, fn, x = 0, y = 0, sc = 1, sil = false) {
  const L = K.cached('a146icon:' + key + (sil ? ':s' : ''), () => { const l = K.layer(w, h), g = l.getContext('2d'); g.translate(w / 2, h - 4); const sv = LIFE.t; LIFE.t = 0; fn(g); LIFE.t = sv; if (sil) { g.globalCompositeOperation = 'source-in'; g.fillStyle = C.black; g.fillRect(-w / 2, -h, w, h + 4); } return l; });
  c.drawImage(L, x - w / 2 * sc, y - (h - 4) * sc, w * sc, h * sc);
}
const A146_ICON = {
  man: (c, x, y, sc) => a146Sil(c, 'man', 220, 300, (g) => person(g, { x: 0, y: 0, s: 1, costume: 'merchant', noBlink: true }), x, y, sc),
  cloak: (c, x, y, sc) => a146Sil(c, 'cloak', 260, 300, (g) => { const P = { x: 0, y: 0, s: 1, costume: 'merchant', pal: { ...A146_IMP_PAL }, cloak: 1, noBlink: true, mouth: 'smile', brow: -0.4, hR: [80, -150] }; a146Person(g, P); }, x, y, sc),
  driver: (c, x, y, sc) => a146Sil(c, 'driver', 300, 300, (g) => { person(g, { x: -30, y: 0, s: 1, costume: 'bedouin', noBlink: true, aR: armTo(1, -132, [95, -110]) }); g.lineWidth = 8; g.strokeStyle = C.black; g.beginPath(); g.moveTo(65, -110); g.quadraticCurveTo(110, -40, 140, -120); g.stroke(); }, x, y, sc),
  camel: (c, x, y, sc) => a146Sil(c, 'camel', 520, 420, (g) => { camel(g, { x: 0, y: 0, s: 1, noBlink: true }); a146CamelLoad(g, { x: 0, y: 0, s: 1 }, 4); }, x, y, sc),
};

// ---------- S9 70.7..87.2: dawn, the camel, four bales, two dirhams ----------
// v2 staging in three clear columns: camel kneeling at the left (x 190), the driver between it and the door, the four bales stacked
// in front of the door (x 640), the impostor right of the door (x 790) and the watchman at the far right (x 930).
// The driver and camel come in from the left edge (the watchman, who ran off to the right, re-enters from the left pushing the camel).
const A146_S9I = a146X([[70.6, 700], [71.1, 810], [82.38, 810], [82.9, 700], [83.0, 700], [83.3, 690], [85.6, 690], [87.4, 120]]);
const A146_S9W = a146X([[72.36, 925], [72.9, 890], [73.85, 880], [74.6, 1260], [75.0, -560], [76.4, -150], [76.6, -150], [77.9, 925], [82.0, 925], [82.5, 900]]);
const A146_S9D = a146X([[74.3, -120], [76.3, 510], [81.1, 510], [83.6, -380]]);
const A146_S9C = a146X([[74.5, -380], [76.4, 230], [81.6, 230], [84.2, -480]]);
const A146_LAND = [79.2, 79.6, 79.96, 80.35];
const A146_S9STK = 640, A146_S9BS = 0.72;   // the bales outside the door (2 x 2), picked red, blue (top) then yellow, green (bottom)
const A146_S9POS = (() => { const p = a146StackPts(A146_S9STK, 900, A146_S9BS); return [p[3], p[2], p[0], p[1]]; })();
const A146_S9PICK = 0.75, A146_S9UP = 0.47;  // each bale: from the stack into the driver's raised arms, then heaved back over his head onto the camel
function a146S9Camel(t) {
  const back = t >= 81.5, C2 = { ...walk(A146_S9C, t, { stride: GAIT.camel * 1.0 }), y: 900, s: 1.0, dir: back ? -1 : 1, pal: 0, chew: t % 1.4 / 1.4, lid: 0.5 };
  C2.kneel = t < 76.88 ? 0 : t < 80.54 ? K.ease.inOut(K.clamp((t - 76.88) / 1.1)) : 1 - K.ease.inOut(K.clamp((t - 80.54) / 0.8));
  C2.talk = a146In(t, 76.9, 77.9) ? 0.5 * Math.abs(Math.sin(t * 7)) : 0; C2.sq = A146_LAND.reduce((s, a) => s * (1 - 0.03 * pulse(t, a, 0.25)), 1) * (1 - 0.06 * pulse(t, 81.4, 0.25));
  C2.rot = swing(t, 81.7, 0.03, 1.2, 2);
  if (a146In(t, 79.0, 80.6)) C2.headTurn = 0.3 * K.clamp((t - 79.0) / 0.3) * K.clamp((80.6 - t) / 0.3);
  return C2;
}
// where bale k is at t (null when on the stack or already landed); also whether it is in the driver's arms
function a146S9Bale(t, k, D, seat) {
  const land = A146_LAND[k], a = land - A146_S9PICK; if (t < a || t >= land) return null; const q = (t - a) / A146_S9PICK, s0 = A146_S9POS[k];
  const over = [D.x - 6, 900 - 252];   // over the driver's head
  if (q < A146_S9UP) { const u = K.ease.inOut(q / A146_S9UP); return { x: K.lerp(s0[0], over[0], u), y: K.lerp(s0[1], over[1], u) - 40 * Math.sin(Math.PI * u), rot: -0.2 * u, s: K.lerp(A146_S9BS, 0.8, u), held: true }; }
  const u = (q - A146_S9UP) / (1 - A146_S9UP); return { x: K.lerp(over[0], seat.x, u), y: K.lerp(over[1], seat.y + 30, u) - 110 * Math.sin(Math.PI * u), rot: -0.2 - 1.6 * u, s: K.lerp(0.8, 0.66, u), held: u < 0.12 };
}
function a146S9(ctx, t) {
  const u = kfn(t, [[86.74, 0.02], [87.2, 0.12]]), door = t < 70.5 ? 0.25 : t < 82.9 ? settleTo(t, 70.5, 0.25, 0.9, 0.4, 0.08) : 0.9 * (1 - K.clamp((t - 82.9) / 0.3));
  a146Street(ctx, t, { u, door, shut: 0, stall: 'closed', sign: 1, signSw: 0.03 * Math.sin(t * 1.2), lock: t > 83.6 ? 1 : 0, lamp: 0 });
  const Cm = a146S9Camel(t), n = A146_LAND.filter((a) => t >= a).length, seat = mountSeat('camel', Cm);
  // driver: leads the camel in, turns to the bales, heaves each one back over his head; turns and leads the camel out to the left
  const dtf = turnFlip(t, [[0, 1], [81.0, -1]], 0.35), D = a146Drv(A146_S9D(t), { ...a146Walk(A146_S9D, t, 1.2), dir: dtf.dir, drop: 8 * dtf.tuck });
  D.hidden = t < 74.3; D.tip = lurch(t, 76.3, 0.12);
  const bs = [0, 1, 2, 3].map((k) => a146S9Bale(t, k, D, seat)), held = bs.find((b) => b && b.held);
  const nextK = A146_LAND.findIndex((a) => t < a - A146_S9PICK), reachTo = nextK >= 0 ? [A146_S9POS[nextK][0] - 50, A146_S9POS[nextK][1] - 50] : null;
  const handT = (sd) => (tt) => { const b = [0, 1, 2, 3].map((k) => a146S9Bale(tt, k, D, seat)).find((v) => v && v.held); if (b) return { w: [b.x + sd * 50 * b.s, b.y - 40 * b.s] };
    return reachTo && tt > 78.3 && tt < 80.0 ? { w: [reachTo[0] + sd * 20, reachTo[1]] } : sd > 0 ? A146H.rest : A146H.restL; };
  D.hR = a146HT(t, D, [[74.3, [70, -120]], [78.2, handT(1), 0.2], [80.45, [60, -110], 0.2], [80.6, [70, -150], 0.12], [80.75, [50, -100], 0.12], [81.0, [70, -120], 0.2]]);
  D.hL = a146HT(t, D, [[74.3, A146H.restL], [78.2, handT(-1), 0.2], [80.45, A146H.restL, 0.3]]);
  if (held) { D.sq = 0.95; D.tip = (D.tip || 0) - 0.08; D.mouth = 'o'; }
  D.gaze = t < 76.3 ? [1, 0] : t < 78.2 ? a146LookAt(D, [790, 650]) : held ? a146LookAt(D, [held.x, held.y - 30]) : t < 80.5 ? a146LookAt(D, [A146_S9STK, 820]) : a146LookAt(D, [100, 760]);
  // impostor: right of the door, supervising
  const itf = turnFlip(t, [[0, 1], [71.1, -1], [85.6, -1]], 0.35), I = a146Imp(A146_S9I(t), { ...a146Step(A146_S9I, t), dir: itf.dir, drop: 8 * itf.tuck });
  I.alpha = K.clamp((t - 70.6) / 0.2); I.tip = -0.04; I.lid = 0.25; I.mouth = 'smile';
  const W = a146Wat(A146_S9W(t), { ...a146Walk(A146_S9W, t, 1.2), dir: t >= 74.9 && t < 77.95 ? 1 : -1, hold: 'stick' }); const wh = a146Head(W);
  if (t < 71.1) I.dir = 1;
  I.gaze = t < 71.68 ? [0.5, 0.1] : t < 74.0 ? a146LookAt(I, wh) : t < 82.38 ? a146LookAt(I, held ? [held.x, held.y] : [420, 760]) : t < 83.0 ? a146LookAt(I, wh) : t < 84.2 ? a146LookAt(I, [662, 790]) : a146LookAt(I, wh);
  if (a146In(t, 82.38, 83.1) || t > 85.6) { I.brow = -0.4; I.lid = 0.35; }
  I.hR = a146HT(t, I, [[70.6, A146H.rest], [71.6, PERSON_HANDS.cupMouth.R, 0.15], [72.3, A146H.rest, 0.2], [73.46, PERSON_HANDS.pointFwd.R, 0.2], [74.4, A146H.rest, 0.3], [76.88, PERSON_HANDS.pointFwd.R, 0.2], [77.3, A146H.rest, 0.2],
    [78.0, [70, -120], 0.15], [78.3, A146H.rest, 0.2], [79.1, (tt) => [70 + 30 * A146_LAND.reduce((s, a) => s + pulse(tt, a - 0.4, 0.35), 0), -140], 0.1], [80.5, A146H.rest, 0.3],
    [83.3, { w: [662, 792] }, 0.2], [83.6, (tt) => [60 + 10 * Math.sin(tt * 14), -150], 0.2], [84.0, [60, -130], 0.15], [84.3, [70, -170], 0.08], [84.45, [60, -130], 0.12], [84.7, [70, -170], 0.08], [84.85, A146H.rest, 0.25], [85.6, PERSON_HANDS.wave.R, 0.2], [86.4, A146H.rest, 0.3]]);
  I.hL = a146HT(t, I, [[70.6, A146H.restL], [78.0, [-60, -120], 0.15], [78.3, A146H.restL, 0.2], [79.1, (tt) => [-50, -130], 0.1], [80.5, A146H.restL, 0.3]]);
  // watchman: dozing on his staff, the jolt, salute, runs off right, re-enters from the left pushing the camel, runs to his post, salutes the loading, catches the coins, bows
  W.hidden = a146In(t, 74.6, 75.0); const caught = [84.75, 85.15];
  W.lid = t < 71.85 ? 1 : undefined; W.tip = (t < 71.85 ? 0.08 : 0) + (a146In(t, 75.0, 76.5) ? 0.15 : 0);
  W.y -= hop(t, 71.85, 0.25, 0, 0, 14)[1] + caught.reduce((s, a) => s + hop(t, a, 0.2, 0, 0, 8)[1], 0); W.sq = landSquash(t, 72.1, 0.1) * anticipate(t, 73.84, 0.2, 0.1);
  W.mouth = t < 71.85 ? 'o' : t > 84.7 ? 'smile' : 'closed'; W.eyes = a146In(t, 71.85, 72.3) ? 'wide' : 'open';
  W.gaze = a146In(t, 82.38, 84.3) ? a146LookAt(W, a146W(I, [0, -86])) : t >= 84.3 && t < 85.3 ? a146LookAt(W, a146CoinAt(t, I, W) || [700, 700]) : a146In(t, 78.0, 80.6) ? a146LookAt(W, held ? [held.x, held.y] : [400, 760]) : a146LookAt(W, a146Head(I));
  if (a146In(t, 82.38, 85.4) || a146In(t, 72.9, 73.4) || a146In(t, 75.0, 76.6) || a146In(t, 80.54, 81.3) || t > 85.4) W.hold = undefined;
  W.hR = a146HT(t, W, [[70.6, [40, -96]], [72.9, [26, -212], 0.18], [73.4, [40, -96], 0.2], [75.0, PERSON_HANDS.reachBoth.R, 0.2], [76.5, [40, -96], 0.2], [80.54, [26, -212], 0.15], [81.2, [40, -96], 0.2], [82.38, PERSON_HANDS.palmsUp.R, 0.3], [84.1, [56, -116], 0.2],
    [85.46, [44, -206], 0.2], [85.9, [40, -96], 0.3], [86.6, (tt) => [10 + 8 * Math.sin(tt * 14), -120], 0.2]]);
  W.hL = a146HT(t, W, [[70.6, A146H.restL], [75.0, PERSON_HANDS.reachBoth.L, 0.2], [76.5, A146H.restL, 0.2], [84.1, [40, -110], 0.2], [85.46, A146H.restL, 0.3], [86.6, [-6, -126], 0.2]]);
  if (a146In(t, 80.54, 81.2)) { W.sq = (W.sq ?? 1) * (1 + 0.04 * pulse(t, 80.54, 0.3)); W.mouth = 'smile'; }
  W.tip += 0.0; a146ApplyBow(W, a146Bow(t, 85.9, 0.45, 0.26));
  a146Arms(D); a146Arms(I); a146Arms(W);
  // draw: the watchman behind everyone while he crosses back to his post; camel (with the landed bales), the stack at the door, driver, impostor, watchman
  const wBehind = t < 78.0;
  if (wBehind && !W.hidden) a146DrawWat(ctx, W, { t, lag: 6 * pulse(t, 72.0, 0.3) });
  if (t > 74.5 && t < 84.2) { camel(ctx, Cm); a146CamelLoad(ctx, Cm, n, { t, land: A146_LAND, tassel: swing(t, 80.35, 0.4) + 0.2 * Math.sin(t * 5) * (t > 81.6 ? 1 : 0) }); }
  const cols = ['red', 'blue', 'yellow', 'green'];
  [2, 3, 0, 1].forEach((k) => { if (t < A146_LAND[k] - A146_S9PICK) { const p = A146_S9POS[k]; a146Bale(ctx, p[0], p[1], { col: cols[k], s: A146_S9BS, knot: k === 2, rot: k === 1 ? 0.02 : k === 0 ? -0.02 : 0 }); } });
  if (a146In(t, 76.88, 77.6)) a146Dust(ctx, 230, 902, t, 76.95, 6, 9); if (a146In(t, 74.04, 74.6)) a146Dust(ctx, 1000, 902, t, 74.04, 6, 10);
  if (!D.hidden) { a146Person(ctx, D); ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = A146_ROPED; const hz = [Cm.x + 230 * Cm.dir, Cm.y - 330 + Cm.kneel * 110]; ctx.beginPath(); ctx.moveTo(D.HL[0], D.HL[1]); ctx.quadraticCurveTo((D.HL[0] + hz[0]) / 2, Math.max(D.HL[1], hz[1]) + 40, hz[0], hz[1]); if (t > 74.5 && t < 78.2 && Math.abs(D.x - hz[0]) < 260) ctx.stroke(); ctx.restore(); }
  bs.forEach((b, k) => { if (b) a146Bale(ctx, b.x, b.y, { col: cols[k], s: b.s, rot: b.rot, knot: k === 2 }); });
  a146Person(ctx, I); if (a146In(t, 83.3, 84.0)) a146Keys(ctx, I.HR[0], I.HR[1], { s: 1.1, sw: (t - 83.3) * 14 });
  if (!wBehind && !W.hidden) a146DrawWat(ctx, W, { t, lag: 6 * pulse(t, 72.0, 0.3) });
  if (t < 71.85) zzz(ctx, wh[0] + 30, wh[1] - 90, t);
  for (const [a, k] of [[84.3, 0], [84.7, 1]]) { a146CoinFly(ctx, t, a, 0.45, [I.HR[0], I.HR[1] - 10], [W.HR[0], W.HR[1] - 10], 110, 12); }
  if (t > 84.75 && t < 86.6) { a146Coin(ctx, W.HR[0] - 6, W.HR[1] - 12, 11, t * 3, pulse(t, 85.5, 0.4)); if (t > 85.15) a146Coin(ctx, W.HR[0] + 12, W.HR[1] - 6, 11, t * 3 + 1, pulse(t, 85.8, 0.4)); }
  // the plan balloon: a man and a camel (v2: the first icon pops with the balloon)
  if (a146In(t, 73.46, 76.0)) { const hd = a146Head(I); a146Balloon(ctx, hd[0] - 60, hd[1] - 210, 300, 170, [hd[0] - 10, hd[1] - 70], Math.min(K.clamp((t - 73.46) / 0.3), K.clamp((76.0 - t) / 0.2)),
    [{ p: K.clamp((t - 73.46) / 0.3), draw: (c) => A146_ICON.driver(c, 0, 66, 0.42) }, { p: K.clamp((t - 74.98) / 0.3), draw: (c) => A146_ICON.camel(c, 0, 66, 0.34) }]); }
  return { I, W, D, Cm, seat };
}
// where the coin in flight is (for the watchman's eyes)
function a146CoinAt(t, I, W) { const a0 = I.HR || [I.x + 70, 730], b0 = W.HR || [W.x - 50, 760]; for (const a of [84.3, 84.7]) if (t >= a && t <= a + 0.45) { const u = (t - a) / 0.45; return [K.lerp(a0[0], b0[0], u), K.lerp(a0[1], b0[1], u) - 110 * Math.sin(Math.PI * u)]; } return null; }

// ---------- S10 87.2..101.2: the real merchant is welcomed like a king ----------
const A146_S10M = a146X([[87.58, 1120], [89.7, 720], [100.26, 720], [100.95, 655]]), A146_S10W = a146X([[91.4, 360], [92.0, 470], [92.72, 470], [92.94, 545], [93.62, 545], [93.82, 485], [99.8, 485], [100.3, 430]]);
function a146S10(ctx, t) {
  a146Street(ctx, t, { u: 0.17, door: 0, shut: 0, stall: 'closed', sign: 1, signSw: 0.03 * Math.sin(t * 1.2), lock: 1, lockShake: a146Shake(t, 100.95, 0.25, 3, 2) });
  const M = a146Mer(A146_S10M(t), { ...a146Step(A146_S10M, t), dir: -1, mouth: 'smile' }), W = a146Wat(A146_S10W(t), { ...a146Walk(A146_S10W, t, 1.2), dir: 1, hold: 'stick' });
  const wh = a146Head(W), mh = a146Head(M);
  // merchant
  M.lid = t < 89.7 ? 0.4 : a146In(t, 89.8, 90.6) ? 1 : undefined; M.sq = 1 + 0.04 * pulse(t, 89.72, 0.9);
  M.tip = -0.1 * K.clamp((t - 93.78) / 0.25) * (t < 94.6 ? 1 : 0) + 0.05 * (a146In(t, 98.68, 99.6) ? 1 : 0);
  if (t < 92.9) M.gaze = t < 91.4 ? [-0.6, 0.1] : a146LookAt(M, wh);
  else if (t < 93.78) M.gaze = [-0.3, -1];
  else if (t < 98.68) { M.gaze = t < 94.58 ? a146LookAt(M, wh) : a146LookAt(M, W.HR || wh); M.brow = -0.5; }
  else if (t < 99.72) { M.gaze = t > 98.9 && t < 99.5 ? [0, 0.05] : a146LookAt(M, wh); M.lid = Math.max(pulse(t, 98.72, 0.15), pulse(t, 98.95, 0.15)); M.tilt = 0.05; M.brow = -0.3; M.mouth = 'closed'; }
  else { M.gaze = a146Gaze(t, M, [[99.72, W.HR || wh], [100.1, [630, 760]]], 0.2); M.brow = 0.3; M.mouth = 'closed'; }
  if (t > 98.4) M.mouth = 'closed';
  M.hR = a146HT(t, M, [[87.58, [44, -110]], [89.7, A146H.rest, 0.3], [98.68, PERSON_HANDS.chin.R, 0.25], [99.7, A146H.rest, 0.3], [100.5, [60, -120], 0.2], [100.8, { w: [662, 792] }, 0.2]]);
  if (t < 89.8 || t > 100.4) M.keys = true;
  // watchman: dozy coin polishing, spring, bow, welcome, dusting, sweeping, the coins, the thought, pointing
  W.lid = t < 91.34 ? 0.45 : undefined; W.mouth = t < 91.34 ? 'closed' : 'smile';
  W.y -= hop(t, 91.34, 0.25, 0, 0, 16)[1]; W.sq = landSquash(t, 91.6, 0.1);
  W.tip = 0.12 * Math.max(0, Math.sin((t - 100.3) * 5)) * (t > 100.3 ? 1 : 0);   // v2: the bows are a146Bow (feet planted, tip capped), applied after the hands
  W.gaze = t < 91.34 ? a146LookAt(W, [W.x + 40, 760]) : a146In(t, 94.58, 96.0) ? [0, 0.05] : a146LookAt(W, mh); if (a146In(t, 94.9, 95.4)) W.wink = 'R';
  W.drop = a146Nods(t, [97.4, 97.75, 98.1], 0.3, 6);
  if (t < 91.34 || a146In(t, 92.5, 93.75) || a146In(t, 94.5, 98.6)) W.hold = undefined;
  const sh = a146W(M, [-30, -150]), tb = [mh[0], mh[1] - 50];
  W.hR = a146HT(t, W, [[87.2, (tt) => [10 + 8 * Math.sin(tt * 12), -120]], [91.34, [40, -96], 0.2], [92.6, PERSON_HANDS.armsOut.R, 0.25], [92.94, { w: sh }, 0.2], [93.15, (tt) => ({ w: [sh[0] + 8 * Math.sin(tt * 20), sh[1]] }), 0.05], [93.3, { w: tb }, 0.2],
    [93.78, (tt) => [70 + 20 * Math.sin(tt * 10), -70], 0.2], [94.58, [64, -112], 0.25], [97.34, PERSON_HANDS.pointFwd.R, 0.2], [97.8, PERSON_HANDS.pointDown.R, 0.2], [98.3, [64, -112], 0.25], [100.0, [40, -96], 0.3]]);
  W.hL = a146HT(t, W, [[87.2, [-6, -126]], [91.34, A146H.restL, 0.2], [92.6, PERSON_HANDS.armsOut.L, 0.25], [93.4, A146H.restL, 0.3]]);
  a146ApplyBow(W, a146Bow(t, 92.06, 0.3, 0.26)); a146ApplyBow(W, a146Bow(t, 93.84, 0.22, 0.22));
  a146Person(ctx, M); if (M.keys) a146Keys(ctx, M.HR[0], M.HR[1], { s: 1.1, sw: 0.2 * Math.sin(t * 5) });
  a146DrawWat(ctx, W, { t, lag: 6 * pulse(t, 91.6, 0.3) });
  if (t < 91.34) a146Coin(ctx, W.HR[0], W.HR[1] - 12, 11, t * 2, pulse(t, 88.5, 0.4));
  if (t >= 94.58 && t < 100) { const g = (k) => Math.max(0, Math.sin((t - 95.36) * 6 + k * Math.PI)); a146Coin(ctx, W.HR[0] - 12, W.HR[1] - 16, 16, 0, t > 95.36 ? g(0) : pulse(t, 94.7, 0.4)); a146Coin(ctx, W.HR[0] + 14, W.HR[1] - 10, 16, 0.2, t > 95.36 ? g(1) : 0); }
  if (a146In(t, 91.34, 92.0)) a146Dust(ctx, 440, 902, t, 91.4, 5, 11);
  // the thought cloud: the real merchant (black beard) giving him two coins by night
  if (a146In(t, 96.84, 98.75)) { const p = Math.min(K.clamp((t - 96.84) / 0.6), t < 98.68 ? 1 : 0); thoughtCloud(ctx, 520, 380, 440, 300, t, { p, tail: [wh[0] + 10, wh[1] - 80], scale: 0.55, at: [510, 740], bg: NAVY, inside: (c) => {
    c.fillStyle = NAVY; c.fillRect(0, 300, 1000, 900); moon(c, 760, 470, 50); const cm = a146Mer(400, { gaze: [1, 0.1], mouth: 'smile', noBlink: true, hR: [70, -150] }); a146Person(c, cm);
    const cw = a146Wat(620, { gaze: [-1, -0.2], mouth: 'smile', noBlink: true, hR: [56, -116] }); a146DrawWat(c, cw, {});
    const q = ((t - 96.84) * 1.2) % 1; a146Coin(c, K.lerp(cm.HR[0], cw.HR[0], q), K.lerp(cm.HR[1], cw.HR[1], q) - 70 * Math.sin(Math.PI * q), 14, q * 10); } }); }
  if (a146In(t, 98.68, 99.1)) { const d = t - 98.68; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28; star(ctx, 520 + Math.cos(a) * (60 + 400 * d), 380 + Math.sin(a) * (40 + 260 * d), 16 * (1 - d / 0.42), C.white); } }
  return { M, W };
}

// ---------- S12 111.0..123.6: questioning the watchman, fetching the driver ----------
const A146_S12W = a146X([[118.68, 760], [119.2, 1250], [119.3, 1250], [120.1, 780], [120.4, 780], [121.1, 860]]);
const A146_S12D = a146X([[119.3, 1330], [120.3, 690], [123.1, 690], [123.6, 380]]), A146_S12C = a146X([[119.5, 1460], [120.4, 1080], [123.3, 1080], [123.6, 1000]]);
const A146_S12M = a146X([[111.0, 520], [123.25, 520], [123.6, 470]]);
function a146S12(ctx, t) {
  a146Street(ctx, t, { u: 0.17, door: 0.9, shut: 0, stall: 'closed', sign: 1, signSw: 0.03 * Math.sin(t * 1.2) });
  const Cm = { ...walk(A146_S12C, t, { stride: GAIT.camel * 1.0 }), y: 900, s: 1.0, dir: -1, pal: 0, chew: (t % 1.3) / 1.3, lid: 0.5 };
  Cm.headTurn = t < 120.6 ? 0 : t < 122.58 ? K.ease.inOut(K.clamp((t - 120.6) / 0.6)) : 1 - K.ease.inOut(K.clamp((t - 122.7) / 0.5));
  const mtf = turnFlip(t, [[0, 1], [123.1, -1]], 0.35), M = a146Mer(A146_S12M(t), { ...a146Step(A146_S12M, t), dir: mtf.dir, drop: 8 * mtf.tuck });
  const wtf = turnFlip(t, [[0, -1], [118.7, 1], [119.3, -1]], 0.2), W = a146Wat(A146_S12W(t), { ...a146Walk(A146_S12W, t, 1.2), dir: wtf.dir });
  const D = a146Drv(A146_S12D(t), { ...a146Walk(A146_S12D, t, 1.2), dir: -1 });
  const mh = a146Head(M), wh = a146Head(W), dh = a146Head(D);
  // merchant
  M.talk = talk(t, [[111.54, 112.7], [121.14, 121.9]]); M.brow = t < 115.0 ? 0.5 : a146In(t, 118.3, 119.0) ? 0.5 : 0.1; M.tip = 0.08 * pulse(t, 111.6, 1.0) + 0.06 * pulse(t, 121.14, 0.8);
  M.gaze = t < 118.3 ? a146LookAt(M, wh) : t < 119.4 ? a146LookAt(M, [1000, 650]) : t < 123.1 ? a146LookAt(M, dh) : [-1, 0];
  if (a146In(t, 117.02, 118.3)) { M.lid = 0.4; M.drop = (M.drop || 0) + a146Nods(t, [117.1, 117.6], 0.5, 6); }
  M.hR = a146HT(t, M, [[111.0, A146H.rest], [111.54, PERSON_HANDS.pointFwd.R, 0.2], [112.7, A146H.rest, 0.3], [115.4, (tt) => [16 + 4 * Math.sin(tt * 8), -150], 0.25], [118.25, PERSON_HANDS.pointFwd.R, 0.1], [118.9, A146H.rest, 0.3],
    [121.14, PERSON_HANDS.palmsUp.R, 0.25], [122.4, A146H.rest, 0.3]]);
  M.hL = a146HT(t, M, [[111.0, [-40, -80]], [121.14, [-40, -200], 0.2], [122.4, [-40, -90], 0.3]]);
  // watchman: frozen grin, saccades, gulp, coins hidden, trembling knees, the explanation, the run, the tug
  W.mouth = t < 113.86 ? 'smile' : t < 115.2 ? 'frown' : 'closed'; W.talk = talk(t, [[115.22, 118.0]]) * 0.8; W.brow = a146In(t, 113.86, 115.22) ? -0.6 : 0;
  W.gaze = a146In(t, 112.78, 113.86) ? a146Gaze(t, W, [[112.78, [W.x + 30, 800]], [113.05, mh], [113.3, [W.x + 30, 800]], [113.55, mh]], 0.07) : t < 118.6 ? a146LookAt(W, mh) : t < 120.4 ? [1, 0] : a146LookAt(W, mh);
  W.drop = 8 * pulse(t, 113.9, 0.3); if (a146In(t, 113.86, 115.22)) W.x += tremble(t, 2, 11);
  W.sq = anticipate(t, 118.5, 0.18, 0.1); W.tip = (a146In(t, 119.3, 120.1) ? 0.1 : 0);
  W.hR = a146HT(t, W, [[111.0, [56, -116]], [113.86, [-36, -84], 0.2], [115.22, PERSON_HANDS.palmsUp.R, 0.25], [116.4, PERSON_HANDS.pointFwd.R, 0.2], [117.2, PERSON_HANDS.palmsUp.R, 0.25], [118.2, A146H.rest, 0.2],
    [119.3, (tt) => ({ w: [D.x - 20, 780] }), 0.1], [120.1, A146H.rest, 0.2], [121.3, PERSON_HANDS.wave.R, 0.2]]);
  W.hL = a146HT(t, W, [[111.0, A146H.restL], [115.22, PERSON_HANDS.palmsUp.L, 0.25], [118.2, A146H.restL, 0.2]]);
  if (t > 123.1) { W.tip = 0.06; W.drop = 6; }
  // driver: pulled in by the sleeve, confused; remembers and points to the port
  D.hidden = t < 119.3; D.brow = t < 122.58 ? -0.5 : 0; D.tip = lurch(t, 120.3, 0.1); D.gaze = t < 122.58 ? a146LookAt(D, mh) : [-1, -0.2];
  D.hR = a146HT(t, D, [[119.3, [40, -130]], [120.3, A146H.rest, 0.3], [121.94, (tt) => [44 + 6 * Math.sin(tt * 18), -212], 0.2], [122.58, PERSON_HANDS.pointFwd.R, 0.15], [123.1, [70, -120], 0.25]]);
  if (t > 122.7) D.mouth = 'smile';
  // draw
  if (t > 119.5) camel(ctx, Cm);
  if (!D.hidden) { a146Person(ctx, D); }
  a146Person(ctx, M); a146DrawWat(ctx, W, { t, lag: 4 * pulse(t, 118.8, 0.3) });
  if (t < 113.86) { a146Coin(ctx, W.HR[0] - 8, W.HR[1] - 12, 10, 0, 0); a146Coin(ctx, W.HR[0] + 8, W.HR[1] - 8, 10, 0.2, 0); }
  const tas = M.HL; ctx.save(); ctx.translate(tas[0], tas[1]); ctx.rotate(0.15 * Math.sin(t * 3)); seg(ctx, 0, 0, 0, 22, 4, A146_ROPED, 1.5); shape(ctx, [[-7, 20], [7, 20], [11, 46], [-11, 46], [-7, 20]], C.yellow, { lw: 3, seed: 303, dot: C.red, pitch: 5, rad: 0.2, da: 0.4 }); ctx.restore();
  if (a146In(t, 118.68, 119.3)) a146Dust(ctx, 780, 902, t, 118.7, 6, 12);
  // the explanation balloon: cloaked man, a man with a lead rope, the camel with four bales
  if (a146In(t, 115.22, 118.4)) { a146Balloon(ctx, 640, 420, 380, 200, [wh[0] - 6, wh[1] - 70], Math.min(K.clamp((t - 115.22) / 0.3), K.clamp((118.4 - t) / 0.2)),
    [{ p: 1, draw: (c) => A146_ICON.cloak(c, 0, 66, 0.42) }, { p: K.clamp((t - 116.34) / 0.3), draw: (c) => A146_ICON.driver(c, 0, 66, 0.42) }, { p: K.clamp((t - 117.02) / 0.3), draw: (c) => A146_ICON.camel(c, 0, 66, 0.3) }]); }
  // the searching dashed arrow from the tassel (with a little bale), swinging to the driver's finger
  if (a146In(t, 121.94, 123.4)) { const a0 = [tas[0], tas[1] - 30], sw = t < 122.58 ? 0.5 * Math.sin((t - 121.94) * 7) : K.lerp(0.5 * Math.sin(0.64 * 7), Math.PI, K.ease.inOut(K.clamp((t - 122.58) / 0.4))), L = 160 * K.clamp((t - 121.94) / 0.3);
    const b = [a0[0] + Math.cos(-0.9 + sw * (t < 122.58 ? 1 : 0) - (t >= 122.58 ? sw * 0.6 : 0)) * L, a0[1] + Math.sin(-0.9 + (t < 122.58 ? sw : -sw * 0.25)) * L]; ctx.save(); ctx.globalAlpha = K.clamp((123.4 - t) / 0.2); a146Dash(ctx, a0, b, 1, { col: C.yellow }); a146Bale(ctx, b[0], b[1] + 18, { col: 'yellow', s: 0.3 }); ctx.restore(); }
  return { M, W, D };
}
