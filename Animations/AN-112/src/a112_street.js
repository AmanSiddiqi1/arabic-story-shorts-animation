// ===== AN-112 streets: S1 Baghdad by day (debts), S10-S11 the dawn street (mule, guards, the palace) =====
const A112_HOUSES = [{ x0: -10, x1: 300, top: 500, col: 0, windows: [[190, 570, 78, 92]] }, { x0: 308, x1: 522, top: 470, col: 1, door: [352, 448, 650, 'round'], windows: [] }];
// ---------------- S1 ----------------
const a112S1X1 = (t) => a112Tr(t, [[0, -90], [8.6, 230, 1.9]]), a112S1X2 = (t) => a112Tr(t, [[0, 1090], [9.3, 640, 1.6]]);
function a112S1Abu(t) {
  const P = { x: 400, y: 900, s: 1.35, dir: 1, costume: 'physician', age: 0.55, seed: 31, pal: { head: 'none' } };
  P.sq = breathe(t, 7) * (1 - 0.06 * a112Win(t, 6.74, 9.3, 0.3)) * (a112In(t, 9.5, 10.8) ? 1 + 0.05 * a112Pulse(t, 9.5, 0.5) - 0.08 * A112B(t, 10.0, 0.6) * a112Win(t, 9.5, 10.8, 0.1) : 1) * (1 - 0.12 * A112B(t, 13.2, 0.3));
  P.tip = 0.05 * a112Win(t, 6.74, 9.0, 0.3); P.drop = 6 * a112Win(t, 6.74, 9.0, 0.3);
  if (t > 13.2) P.x += tremble(t, 1.6, 11);
  P.mouth = a112In(t, 2.1, 3.6) ? 'smile' : a112In(t, 6.74, 9.3) ? 'frown' : a112In(t, 10.82, 14) ? 'o' : 'closed';
  P.talk = talk(t, [[2.2, 3.4]], 0.3) * 0.4; P.brow = a112Tr(t, [[0, -0.3], [6.74, -0.7], [9.5, -0.8]]);
  P.eyes = a112In(t, 9.5, 10.8) || t > 13.2 ? 'wide' : 'open';
  let lid = 0.3 * a112Win(t, 4.7, 6.7, 0.2) + 0.45 * a112Win(t, 6.74, 8.6, 0.3) + 0.9 * a112Pulse(t, 7.4, 0.5); if (P.eyes !== 'wide') lid = Math.max(lid, blink(t, 31)); P.lid = Math.min(1, lid);
  const purse = [480, 700];
  P.gaze = a112Look(t, P, [[0, [300, 700]], [2.1, [400, 780]], [3.0, [440, 700]], [3.6, [400, 780]], [4.7, purse], [6.74, [400, 860]], [8.6, [150, 720]], [9.5, [180, 720]], [9.9, [700, 720]], [10.3, [230, 700]],
    [12.16, [640, 720]], [12.6, [500, 900]], [13.2, [230, 680]], [13.4, [640, 680]], [13.6, [230, 680]], [13.8, [640, 680]]], 0.1);
  const read = [[0, [24, -128]], [3.0, A112H.up, 0.2], [3.5, [24, -128], 0.2], [4.7, [30, -100], 0.3], [5.1, [54, -150], 0.3], [8.4, A112H.rest, 0.4], [13.2, [16, -178], 0.2]];
  const readL = [[0, [-20, -128]], [4.7, A112H.restL, 0.3], [5.8, [44, -160], 0.25], [6.7, A112H.restL, 0.3], [13.2, [-14, -178], 0.2]];
  P.aR = a112Arm(t, P, 1, read); P.aL = a112Arm(t, P, -1, readL);
  P.hat = { dx: 6, rot: -0.14, tail: -0.5 * a112Win(t, 6.74, 9, 0.4) };
  return P;
}
function a112Shop(t, i) {
  const xf = i ? a112S1X2 : a112S1X1, W = a112Walk(xf, t, 24), dl = i ? 0.25 : 0;
  const P = { y: 900, s: i ? 1.08 : 1.0, dir: i ? -1 : 1, costume: i ? 'carpenter' : 'beanSeller', seed: 51 + i, ...W };
  if (P.amp < 0.04) P.amp = 0;
  P.brow = i ? 0.6 : 0.8; P.mouth = i ? (t > 12.16 ? 'smile' : 'closed') : 'frown';
  P.talk = talk(t, i ? [[12.2, 13.0]] : [[10.82, 12.0]], i) * 0.8;
  P.tip = i ? -0.03 : 0.08 * a112Win(t, 10.82, 12.4, 0.2); P.drop = i ? -4 : 0;
  if (i) P.lid = Math.max(0.4 * a112Win(t, 12.16, 14, 0.3), blink(t, 52)); else P.lid = blink(t, 51);
  P.gaze = lookAt(a112Head(P), [400, 690]);
  if (!i) { P.aR = a112Arm(t, P, 1, [[0, A112H.rest], [10.82 + dl, A112H.fwd, 0.25]]); P.aL = a112Arm(t, P, -1, [[0, [-20, -112]], [10.82, [26, -150], 0.25]]); }
  else { P.aR = a112Arm(t, P, 1, [[0, A112H.foldR], [12.16, [70, -150], 0.25]]); P.aL = a112Arm(t, P, -1, [[0, A112H.foldL], [12.16, [-40, -150], 0.25]]); }
  return P;
}
function a112Street(ctx, t, cam) {
  marketStreet(ctx, { palette: 'clear', houses: A112_HOUSES, stalls: [{ x: 150, kind: 'seed' }], doors: [0.15], t });
  // a dove crosses the sky
  if (t < 3.5) bird(ctx, { kind: 'dove', x: -60 + t * 360, y: 230 + 20 * Math.sin(t * 3), s: 0.8, fly: true, flap: Math.sin(t * 14), dir: 1 });
  const A = a112S1Abu(t), S1 = a112Shop(t, 0), S2 = a112Shop(t, 1);
  // bills: shop1 lets his unroll to the ground (10.82); shop2's longer one rolls on past Abu's feet (12.16), still rolling after his hand stops
  person(ctx, S1); person(ctx, S2);
  if (t > 9.0) { const h = a112HandW(S1, 'L'), L = (880 - h[1]); a112Scroll(ctx, h[0] + 10, h[1], { L, len: t < 10.82 ? 0.08 : A112B(t, 10.82, 0.45, 'in'), w: 64, s: 1 }); }
  if (t > 9.6) { const h = a112HandW(S2, 'L'), L = (888 - h[1]), u = A112B(t, 12.16, 0.4, 'in'), roll = A112B(t, 12.5, 0.9, 'out');
    a112Scroll(ctx, h[0] - 10, h[1], { L, len: t < 12.16 ? 0.08 : u, w: 64, s: 1 });
    if (roll > 0) { const x1 = K.lerp(h[0] - 10, 300, roll); shape(ctx, [[x1, 880], [h[0] - 10, 880], [h[0] - 10, 896], [x1, 896]], A112_PAPER, { lw: 4, seed: 414 }); shape(ctx, ell(x1, 880, 16, 16, 14), A112_PAPER, { lw: 4, seed: 415 }); } }
  person(ctx, A); a112Hat(ctx, A, 'scholar', A.hat);
  // Abu's reading scroll (until 4.9) and again as a hiding shield (13.2)
  const hR = a112HandW(A, 'R'), hL = a112HandW(A, 'L');
  if (t < 4.95) a112Scroll(ctx, (hR[0] + hL[0]) / 2, (hR[1] + hL[1]) / 2, { L: 170, len: t < 4.7 ? 1 : 1 - A112B(t, 4.7, 0.25), w: 70, s: 0.9 });
  if (t > 13.2) a112Scroll(ctx, (hR[0] + hL[0]) / 2, (hR[1] + hL[1]) / 2 + 4, { L: 190, len: A112B(t, 13.2, 0.25), w: 82, s: 0.95 });
  // the empty purse: out of the sash, looked into, turned over and shaken; a moth flies out
  if (a112In(t, 4.95, 8.5)) { const p = [hR[0], hR[1] - 4], flip = A112B(t, 5.8, 0.25), sh = Math.sin((t - 5.95) * 28) * a112Win(t, 5.95, 6.7, 0.08);
    a112Purse(ctx, p[0], p[1] + 6 * sh, { s: 0.85, fill: 0, open: 1 - flip * 0.7, rot: Math.PI * flip, sw: Math.sin(t * 9) * 0.4 + sh * 0.5 }); }
  if (a112In(t, 6.0, 8.6)) { const u = t - 6.0; a112Moth(ctx, 470 - 40 * u + 25 * Math.sin(u * 5), 760 - 110 * u, t); }
}

// ---------------- S10-S11: the dawn street ----------------
const A112_DW = 2000, A112_LANES = [480, 1010];
// mule x: out of the lane at the left, plods to the fork, stops (86.82); led to the palace from 94.64
const a112MuleX = (t) => a112Tr(t, [[0, 240], [83.25, 740, 3.55], [94.64, 1520, 1.75]]);
function a112Mule(t) {
  const W = walk(a112MuleX, t, { stride: GAIT.donkey * 1.12 });
  const P = { ...W, y: 900, s: 1.12, pal: 1, dir: 1, seed: 71 };
  const flat = a112In(t, 90.5, 94.6);
  P.earL = flat ? -1 : 0.4 + 0.5 * Math.sin(P.ph * 1.0); P.earR = flat ? -1 : 0.4 - 0.5 * Math.sin(P.ph * 1.0);
  if (a112In(t, 88.26, 89.6)) { P.earL = 1; P.earR = -0.6; }
  P.headTurn = a112Win(t, 88.26, 89.5, 0.25); P.tailSwish = Math.sin(t * 3); P.sag = 0.3 * a112Win(t, 84, 86.8, 0.4);
  P.tip = -0.06 * a112Win(t, 94.64, 95.1, 0.12); P.lid = Math.max(blink(t, 71), 0.9 * a112Pulse(t, 88.6, 0.3));
  P.gaze = t > 88.26 && t < 89.5 ? [-1, -0.4] : [1, 0];
  return P;
}
function a112Rider(t) {
  const P = { costume: 'physician', age: 0.55, seed: 31, lurch: lurch(t, 86.82, 0.2), drop: 8 * (1 - a112Win(t, 89.8, 96, 0.3)) };
  P.lid = Math.max(0.5 * (1 - a112Win(t, 89.8, 96, 0.2)), blink(t, 31)); P.lean = 0.08 * (1 - a112Win(t, 89.8, 96, 0.3));
  P.mouth = a112In(t, 90.5, 94.6) ? 'o' : 'frown'; P.brow = a112In(t, 90.5, 95) ? -0.8 : -0.4; P.eyes = a112In(t, 90.5, 91.6) ? 'wide' : 'open'; if (P.eyes === 'wide') delete P.lid;
  P.gaze = gazePlan(t, [[0, [0.6, 0.6]], [87.78, [-1, 0]], [88.0, [1, 0]], [88.26, [0.3, 0.5]], [89.74, [1, 0]], [90.5, [-1, 0]], [91.12, [1, 0]], [93.9, [0, 1]], [94.3, [1, -0.2]]], 0.12);
  if (a112In(t, 87.78, 88.3)) { P.handL = [-60, -100]; P.handR = [60, -100]; }
  if (a112In(t, 90.5, 94.64)) { const r = A112B(t, 90.5, 0.6); P.handL = [-40 - 10 * r, -110 - 90 * r]; P.handR = [40 + 10 * r, -110 - 90 * r]; P.x0 = tremble(t, 1.2, 10); }
  return P;
}
// soldier preset (planned 'soldier'): a person with a belted tunic, chest plate, helmet with neck cloth and a spear, drawn by the story
const A112_GUARD = (col) => ({ costume: 'villager', pal: { robe: col, dot: col === C.red ? '#a8160f' : NAVY, len: 'knee', sash: C.yellow, pants: NAVY2, head: 'none', beard: 'short' } });
function a112DrawGuard(ctx, t, P, col) {
  a112HelmetBack(ctx, P, col === C.red ? C.blue : C.red);
  person(ctx, P);
  const c = a112W(P, [0, -122]); shape(ctx, ell(c[0], c[1], 20 * a112S(P), 20 * a112S(P), 18), STONE2, { lw: 4, seed: 67, dot: STONED, pitch: 6, rad: 0.2 });
  a112Hat(ctx, P, 'helmet', { col: col === C.red ? C.blue : C.red });
  if (P.spear !== false) { const h = a112HandW(P, 'R'); a112Spear(ctx, h[0], h[1] - (P.spearUp || 0), a112S(P), (P.dir || 1) * 0.04, 340); }
}
function a112Guard1(t) {   // leader, red; comes out of the right lane, stern; carries the portrait
  const xf = (tt) => a112Tr(tt, [[0, A112_LANES[1] + 60], [89.74, 930, 0.7], [94.64, 1720, 1.75]]), W = a112Walk(xf, t, 24);
  const P = { ...A112_GUARD(C.red), ...W, y: 900, s: 1.0, seed: 81, dir: t < 94.64 ? -1 : 1 };
  if (P.amp < 0.04) P.amp = 0;
  P.brow = 0.8; P.mouth = 'frown'; P.talk = talk(t, [[91.3, 92.0], [92.9, 93.6]], 0) * 0.6; P.drop = a112Nods(t, [92.02], 0.3, 12);
  P.gaze = a112Look(t, P, [[0, [800, 690]], [91.12, [860, 760]], [91.4, [800, 680]], [91.7, [860, 760]], [92.0, [690, 700]], [92.02, [600, 700]], [92.4, [800, 680]], [94.64, [1900, 700]]], 0.12);
  P.aR = a112Arm(t, P, 1, [[0, [30, -100]]]); P.aL = a112Arm(t, P, -1, [[0, A112H.restL], [91.12, [60, -150], 0.3], [94.4, A112H.restL, 0.2], [94.64, (tt) => ({ w: [a112MuleX(tt) + 230, 700] }), 0.3]]);
  return P;
}
function a112Guard2(t) {   // taller, blue, always half a beat late; out of the left lane behind the mule
  const xf = (tt) => a112Tr(tt, [[0, A112_LANES[0] - 40], [90.46, 590, 0.7], [94.9, 1290, 1.75]]), W = a112Walk(xf, t, 25);
  const P = { ...A112_GUARD(C.blue), ...W, y: 900, s: 1.05, seed: 82, dir: 1 };
  if (P.amp < 0.04) P.amp = 0;
  P.brow = 0.5; P.mouth = 'closed'; P.drop = -4 + a112Nods(t, [92.3], 0.3, 10);
  P.gaze = a112Look(t, P, [[0, [740, 680]], [91.4, [930, 700]], [92.48, [600, 760]], [93.1, [760, 690]], [94.9, [1500, 700]]], 0.15);
  P.aR = a112Arm(t, P, 1, [[0, [30, -100]]]); P.aL = a112Arm(t, P, -1, [[0, A112H.restL], [92.48, [70, -140], 0.3], [94.6, A112H.restL, 0.3]]);
  return P;
}
function a112Dawn(ctx, t, cam) {
  const u = a112Tr(t, [[0, 0.9], [84.24, 1.0, 1.4]]) % 1;
  marketStreet(ctx, { w: A112_DW, palette: 'cold', u: u === 0 ? 0.999 : u, stalls: [{ x: 280, kind: 'cloth', state: 'closed' }, { x: 1250, kind: 'pots', state: 'closed' }], palace: 'lit', palaceDoor: A112B(t, 96.3, 0.5), windowsLit: 0.3 + 0.7 * A112B(t, 84.6, 0.4), t, camX: cam.x - 500 / cam.zoom });
  // the two lane mouths of the fork (dark openings) and the light from the palace door
  for (const lx of A112_LANES) { shape(ctx, townArchPts(lx - 62, lx + 62, 600, 900, 'round'), '#0a1a4a', { lw: 7, seed: 480 }); }
  if (t > 96.3) { const L = A112B(t, 96.3, 0.5), D = marketStreetAnchors({ w: A112_DW }).palace.door; ctx.save(); ctx.globalAlpha = 0.45 * L; ctx.fillStyle = C.yellow; K.poly(ctx, [[D.x0, 872], [D.x1, 872], [D.x1 + 120, 1000], [D.x0 - 160, 1000]], true); ctx.fill(); ctx.restore(); }
  const G1 = a112Guard1(t), G2 = a112Guard2(t), M = a112Mule(t), R = a112Rider(t);
  const g1in = t > 89.74, g2in = t > 90.46;
  if (g2in) a112DrawGuard(ctx, t, G2, C.blue);
  // S10 start: Abu leads the mule out, then hops on (83.0)
  if (t < 83.0) { const Ab = { x: a112Tr(t, [[0, 140], [82.32, 300, 0.6]]), y: 900 - hop(t, 82.75, 0.3, 0, 0, 30)[1], s: 1.12, dir: 1, costume: 'physician', age: 0.55, seed: 31, lid: 0.5, mouth: 'frown', handR: [70, -130] };
    Object.assign(Ab, { ph: Ab.x / 24, amp: t < 82.9 ? 1 : 0 }); donkey(ctx, { ...M, x: 330 }); person(ctx, Ab); }
  else { const mp = { ...M, sq: landSquash(t, 83.0, 0.05) }; rideOn(ctx, 'donkey', mp, { ...R, s: 1.06, bob: 0 }); }
  if (g1in) { const P = { ...G1 }; a112DrawGuard(ctx, t, P, C.red);
    // the spear tip slides into view first
    if (a112In(t, 91.12, 94.6)) { const h = a112HandW(P, 'L'); a112Scroll(ctx, h[0] - 34, h[1] - 70, { L: 150, w: 80, len: A112B(t, 91.12, 0.35), portrait: A112B(t, 91.4, 0.3), s: 0.95 }); } }
  if (g2in && a112In(t, 92.48, 94.6)) { const h = a112HandW(G2, 'L'); a112Scroll(ctx, h[0] + 30, h[1] - 70, { L: 150, w: 80, len: A112B(t, 92.48, 0.3), seal: A112B(t, 92.7, 0.3), lines: true, s: 0.95 }); }
  // the bundle of reins: guard1 leads the mule
  if (t > 94.9) { const h = a112HandW(G1, 'L'), m = [M.x + 190 * M.s, M.y - 250 * M.s]; ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = '#5b3a1e'; ctx.beginPath(); ctx.moveTo(m[0], m[1]); ctx.quadraticCurveTo((m[0] + h[0]) / 2, Math.max(m[1], h[1]) + 30, h[0], h[1]); ctx.stroke(); ctx.restore(); }
  // spear tip peeking before guard1 steps out
  if (a112In(t, 89.6, 89.75)) a112Spear(ctx, A112_LANES[1] + 20, 760, 1, -0.04, 340);
  // dust at the stop
  if (a112In(t, 86.8, 87.4)) dustBurst(ctx, a112MuleX(t) + 120, 898, t - 86.82, 5, 8, 14, 34, 0.5, 4);
}
