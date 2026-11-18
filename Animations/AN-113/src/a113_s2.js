// ===== AN-113 scenes 4-11: the jewel market (stall opens, three strangers, the witnesses, the two bags, the lady, the doors of fortune) =====
const PM_APRON = { apron: EARTH };
const PM_KIN = ['kin1', 'kin2', 'kin3'];
const PM_LANDS = [95.22, 95.94, 96.39, 96.8, 97.0, 97.14];   // the lady's purses land
const PM_ROLL = [[72.3, 425], [72.55, 446], [72.8, 405], [73.05, 386]];   // gems rolling out of the open bag: [start, rest x]

// ---------- state of the stall and the street ----------
const pmOpen = (t) => (t < 34.92 ? 0 : settleTo(t, 34.92, 0, 1, 0.7, 0.08));
// v2: the doors of fortune, one per stressed word, each a proper event (leaf swings with overshoot, the opening fills with process yellow,
// a ray fan climbs the wall and spills across the street, coins roll out toward him)
const PM_DOORT = [[0, 104.68], [3, 105.32], [1, 106.32], [2, 107.04]];   // [door index, time]: أبواب, الرزق, فتحت, له (beside him, so the hop at 107.3 has a cause)
function pmDoorsS11(t) { const d = [0, 0, 0, 0]; if (t < 104.6 || t > 109.4) return d; const cl = pmB(t, 108.7, 0.6); PM_DOORT.forEach(([i, a]) => { d[i] = (t < a ? 0 : settleTo(t, a, 0, 1, 0.35, 0.18)) * (1 - cl); }); return d; }
function pmDoorLight(ctx, t, doors) {
  doors.forEach((d, i) => { if (d < 0.03) return; const H = PM_HOUSES[i].door, x = PM_DOORS[i], k = K.clamp(d) * (1 + 0.35 * pulse(t, 108.3, 0.5));
    // the opening, lit solid yellow, then the leaf drawn over it
    townDoor(ctx, H[0], H[1], H[2], 900, K.clamp(d), { arch: H[3], paint: WOOD, inside: (c) => { c.fillStyle = C.yellow; c.fillRect(H[0], H[2] - 20, H[1] - H[0], 940 - H[2]); c.fillStyle = dotPat(c, C.red, 10, 0.22); c.fillRect(H[0], H[2] - 20, H[1] - H[0], 940 - H[2]); } });
    ctx.save(); ctx.globalAlpha = 0.42 * K.clamp(k); ctx.fillStyle = '#ffe680'; ctx.beginPath(); ctx.moveTo(H[0], 900); ctx.lineTo(H[1], 900); ctx.lineTo(x + 100, 1060); ctx.lineTo(x - 100, 1060); ctx.fill();
    ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.4); ctx.fill(); ctx.restore();
    pmGlow(ctx, x, H[2] + 30, 150, t, 0.75 * K.clamp(k), { seed: i + 3, n: 9, a0: -Math.PI * 0.97, a1: -Math.PI * 0.03 }); });
}
// two coins roll out of each door toward the middle of the street
function pmDoorCoins(ctx, t) {
  if (!pmIn(t, 104.7, 109.4)) return;
  PM_DOORT.forEach(([i, a], n) => [0, 1].forEach((j) => { const t0 = a + 0.18 + j * 0.14; if (t < t0) return; const x0 = PM_DOORS[i], dirx = x0 < 600 ? 1 : -1, xe = x0 + dirx * (70 + 45 * j), u = pmB(t, t0, 0.7, 'out'),
    x = K.lerp(x0, xe, u), y = 912 + 10 * j - 18 * Math.abs(Math.sin(u * 7)) * (1 - u); pmCoin(ctx, x, y, 11, u < 1 ? Math.cos((t - t0) * 16) : Math.max(0.25, 0.6 * Math.exp(-(t - t0 - 0.7) * 3))); }));
}

// ---------- the scene ----------
function pmMarketScene(ctx, t) {
  const doors = pmDoorsS11(t), op = pmOpen(t);
  pmMarketSet(ctx, t, [0, 0, 0, 0]); pmDoorLight(ctx, t, doors);
  const st = { open: op, awning: t < 34.92 ? 0 : settleTo(t, 34.92, 0, 1, 0.45, 0.12), sign: pmPop(t, 35.94, 0.35), t };
  let M = null; const street = [];
  if (t < 33.7) street.push(pmManS4(t));
  else if (t < 42.86) M = pmManS5(t);
  else if (t < 64.84) { M = pmManS6(t); PM_KIN.forEach((n, i) => street.push(pmKinS6(i, t))); if (t > 57.0) street.push(pmNbS7(0, t), pmNbS7(1, t)); }
  else if (t < 86.35) { M = pmManS8(t); PM_KIN.forEach((n, i) => street.push(pmKinS8(i, t))); }
  else if (t < 100.1) { M = pmManS10(t); street.push(pmLadyS10(t)); }
  else M = pmManS11(t);
  pmStall(ctx, 'back', st);
  if (t > 86.35) { pmBag(ctx, 738, 902, { s: 0.62 }); pmBag(ctx, 786, 904, { s: 0.6, rot: 0.06 }); }   // the two bags, tucked away beside the stall
  if (M) pmDraw(ctx, t, M);
  pmStall(ctx, 'front', st);
  pmCounterItems(ctx, t, M, street);
  pmDoorCoins(ctx, t);
  street.filter(Boolean).sort((a, b) => a.y - b.y || a.x - b.x).forEach((P) => pmDraw(ctx, t, P));
  if (pmIn(t, 41.1, 42.86)) { const xf = (tt) => kfn(tt, [[41.14, 940], [42.74, 120]], 'lin'), W = walk(xf, t, { stride: GAIT.cat * 0.7 }); cat(ctx, { ...W, y: 965, s: 0.7, dir: -1, pal: 2, tailUp: 1, gaze: [-1, 0], seed: 41 }); }
  if (pmIn(t, 33.7, 34.85)) pmLandlord(ctx, t);
}
// the landlord's arm at the right edge: coins out, key in
function pmLandlord(ctx, t) {
  const k = pmB(t, 33.72, 0.3) * (1 - pmB(t, 34.5, 0.3)), hx = K.lerp(1040, 880, k), hy = 770;
  seg(ctx, 1060, 720, hx + 10, hy, 22, '#8a501a', 4.5); shape(ctx, ell(hx, hy, 13, 13, 12), C.white, { lw: 3.5, seed: 620, dot: C.skin, pitch: 5, rad: 0.3 });
  if (t > 34.05) { pmCoin(ctx, hx - 4, hy - 14, 9); pmCoin(ctx, hx + 6, hy - 18, 9); }
  if (t < 34.3) pmKey(ctx, hx - 6, hy + 6, 0.2);
}
function pmKey(ctx, x, y, r = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(r); seg(ctx, 0, 0, 34, 0, 6, C.yellow, 2.5); shape(ctx, ell(-6, 0, 9, 9, 12), C.yellow, { lw: 3, seed: 621 }); seg(ctx, 28, 0, 28, 10, 5, C.yellow, 2); seg(ctx, 20, 0, 20, 8, 5, C.yellow, 2); ctx.restore(); }

// ---------- things on the counter ----------
function pmCounterItems(ctx, t, M, street) {
  const hop = Math.abs(kick(t, [66.14], 6, 12, 8));
  // tray gems
  if (t >= 37.2 && t < 86.35) { [[0, C.red, 37.22], [1, C.blue, 37.52], [2, '#3f9d4a', 37.82]].forEach(([i, col, a]) => { const k = pmPop(t, a, 0.25); if (k <= 0) return; const [x, y] = PM_TRAY[i]; pmGem(ctx, x + (i === 1 ? 3 * pmB(t, 38.6, 0.15) : 0), y - hop, 10 * k, col, pulse(t, a, 0.5)); });
    if (t > 38.12) { const k = pmPop(t, 38.12, 0.3); for (let j = 0; j < 7; j++) { const x = 530 + j * 12, y = PM_TRAY[0][1] - 2 - hop + 6 * Math.sin(j / 6 * Math.PI); shape(ctx, ell(x, y, 4.5 * k, 4.5 * k, 8), j % 3 === 1 ? C.red : C.yellow, { lw: 2, seed: 625 }); } } }
  if (t >= 86.35) { PM_TRAY.forEach(([x, y], i) => { const col = PM_GEMC[i % 4], gone = [[1, 92.16], [4, 92.36], [6, 92.56]].find((g) => g[0] === i); if (gone && t > gone[1]) { if (t > gone[1] + 0.25) return; const u = pmB(t, gone[1], 0.25, 'lin'); pmGem(ctx, K.lerp(x, 630, u), K.lerp(y, 760, u) - 50 * Math.sin(Math.PI * u), 10, col, 0); return; }
    const hi = gone ? pulse(t, [90.66, 91.1, 91.6][[1, 4, 6].indexOf(i)], 0.5) : 0; pmGem(ctx, x, y, 10, col, hi); if (hi > 0) pmRing(ctx, x, y, t, [90.66, 91.1, 91.6][[1, 4, 6].indexOf(i)], 22); }); }
  // the purse he set beside the tray (S5 to S9)
  if (t >= 37.0 && t < 86.35) { const p = t < 37.2 && M ? pmHandOver(t, 36.95, 0.25, pmHandW(M, 'L'), [655, 782]) : [655, 782 - hop]; pmPurse(ctx, p[0], p[1], 0.8, { fill: t < 37.2 ? 1 : K.lerp(1, 0.4, pmB(t, 37.2, 1.4)) }); }
  // the two bags (S8, S9)
  if (t >= 64.84 && t < 86.35) pmBagsS8(ctx, t, M, street);
  // the jewel box (S10)
  if (pmIn(t, 86.35, 100.1)) { const L = street.find((P) => P && P.costume === 'lady'), take = t > 99.95 && L, bx = take ? pmHandW(L, 'L') : [K.lerp(632, 492, pmB(t, 99.15, 0.3)), 790];
    pmBox(ctx, bx[0], bx[1] + (take ? 30 : 0), 0.8, take ? 0 : pmTr(t, [[86.35, 0], [91.9, 1, 0.2], [92.86, 0, 0.06]])); }
  // the purses (S10 to S11)
  if (t >= 95.0) { const shove = -40 * pmWin(t, 99.0, 99.5, 0.18); PM_LANDS.forEach((a, i) => { if (t < a - 0.05) return; let x = 455 + shove; for (let j = i + 1; j < PM_LANDS.length; j++) x += 30 * pmB(t, PM_LANDS[j], 0.12);
    const L = street.find((P) => P && P.costume === 'lady'), p = t < a && L ? pmHandW(L, 'R') : [x, 783]; pmPurse(ctx, p[0], p[1], 0.62, { fill: 1, sq: impactSquash(t, a, 0.8) }); }); }
}
function pmBagsS8(ctx, t, M, street) {
  const K2 = street[1], K3 = street[2], K1 = street[0];
  // bag 1 (kin2): carried, heaved up, dropped THUD at 466, pulled to 560 by the jeweller
  let b1; if (t < 65.85) { const a = pmHandW(K2, 'R'), b = pmHandW(K2, 'L'); b1 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 66]; }
  else if (t < 66.04) { const a = pmHandW(K2, 'R'); b1 = [K.lerp(a[0], 466, pmB(t, 65.85, 0.19)), K.lerp(a[1] + 66, 738, pmB(t, 65.85, 0.19))]; }
  else if (t < 66.14) b1 = [466, fallY(t, 66.04, 66.14, 738, 782)];
  else b1 = [K.lerp(466, 562, pmB(t, 66.36, 0.3)), 782 - rebound(t, 66.14, 6, 0.16)];
  // bag 2 (kin3): set down gently at 470 (open from 68.3; coins, light, necklace, gems)
  let b2; if (t < 66.5) { const a = pmHandW(K3, 'R'), b = pmHandW(K3, 'L'); b2 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 64]; } else b2 = [K.lerp(pmHandW(K3, 'R')[0], 470, pmB(t, 66.5, 0.19)), K.lerp(pmHandW(K3, 'R')[1] + 64, 782, pmB(t, 66.5, 0.19))];
  if (t > 66.69) b2 = [470, 782];
  const op = pmB(t, 68.3, 0.6), gl = pmB(t, 69.02, 0.4) * (1 - 0.35 * pmB(t, 74.0, 1));
  if (t > 69.0) pmGlow(ctx, 470, 712, 190 * (0.6 + 0.4 * gl), t, gl, { a0: -Math.PI * 0.92, a1: -Math.PI * 0.08 });
  pmBag(ctx, b1[0], b1[1], { s: 0.9, sq: impactSquash(t, 66.14, 0.6), glint: 0 });
  pmBag(ctx, b2[0], b2[1], { s: 0.9, open: op, sq: impactSquash(t, 66.69, 0.88) * (1 - 0.06 * (pulse(t, 66.9, 0.15) + pulse(t, 67.1, 0.15))), inside: (c, o) => { pmCoinPile(c, 0, -62 - 22 * pmB(t, 69.02, 0.5), 10, 0.9, 5); } });
  if (t > 69.1) pmCoinPile(ctx, 470, 722 - 10 * pmB(t, 69.1, 0.5), Math.round(9 * pmB(t, 69.1, 0.6)), 0.9, 8);
  // the necklace lifted (71.2) and laid on the counter (73.9)
  if (t > 71.2) { if (t < 73.9) { const h = pmHandW(K1, 'R'); pmNecklace(ctx, h[0], h[1] + 4, 0.9, swing(t, 71.6, 0.5, 1.2, 1.4), t); } else pmNecklace(ctx, 432, 744, 0.55, 1.45, t); }
  // four gems roll out of the open bag
  PM_ROLL.forEach(([a, xe], i) => { if (t < a) return; const u = pmB(t, a, 0.45, 'out'), x = K.lerp(458, xe, u), rock = 0.2 * Math.exp(-(t - a - 0.45) * 5) * Math.sin((t - a) * 20); pmGem(ctx, x, 788 + i % 2 * 2 - 6 * Math.sin(Math.PI * Math.min(1, u * 1.4)) * (1 - u), 14, PM_GEMC[i], t > a + 0.4 ? Math.max(0, Math.sin(t * 3 + i * 1.5)) : 0); });
}

// ---------- S5: rent, open, stock, wait ----------
function pmManS5(t) {
  const xf = (tt) => pmTr(tt, [[33.7, 770], [35.7, 600, 1.2], [38.8, 584, 0.3]]), W = pmWalk(xf, t, 13);
  const P = pmC('man', { ...W, dir: t < 35.6 ? 1 : -1, pal: PM_APRON, seat: 'bench' });
  P.sit = settleTo(t, 39.16, 0, 0.5, 0.5, 0.1);
  P.sq = breathe(t, 3, 0.015) * (1 + 0.03 * pmWin(t, 41.3, 41.9, 0.12) - 0.04 * pmB(t, 41.95, 0.3));
  P.tilt = 0.1 * pmWin(t, 38.6, 39.6, 0.2); P.drop = pmNods(t, [34.42], 0.3, 7) + 4 * pmB(t, 41.95, 0.3);
  P.lid = t > 41.95 ? 0.4 : 0.1; P.brow = t > 39.16 ? -0.3 : 0;
  P.mouth = t < 40.9 || pmIn(t, 41.3, 41.95) ? 'smile' : 'closed';
  const drum = [40.45, 40.6, 40.75, 40.9].reduce((s, a) => s + pulse(t, a, 0.12), 0);
  P.aR = pmArm(t, P, 1, [[0, [58, -112]], [33.75, { w: [862, 768] }, 0.3], [34.5, [40, -100], 0.3], [35.0, PMH.side, 0.3],
    ...[37.22, 37.52, 37.82, 38.12].map((a, i) => [a - 0.22, { w: i < 3 ? [PM_TRAY[i][0], PM_TRAY[i][1] - 12] : [560, 760] }, 0.2]), [38.56, { w: [PM_TRAY[1][0] - 4, PM_TRAY[1][1] - 8] }, 0.15], [38.8, [40, -100], 0.3],
    [39.3, () => ({ w: [554, 778 - 6 * drum] }), 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.sideL], [36.75, { w: [640, 760] }, 0.2], [37.25, PMH.sideL, 0.3], [39.3, { w: [606, 780] }, 0.4]]);
  P.held = [(ctx) => { if (t < 34.05) { const h = pmHandW(P, 'R'); pmCoin(ctx, h[0] - 4, h[1] - 12, 9); pmCoin(ctx, h[0] + 6, h[1] - 16, 9); } if (pmIn(t, 34.3, 35.0)) { const h = pmHandW(P, 'R'); pmKey(ctx, h[0] - 6, h[1] + 4, 1.2); }
    if (t < 36.95) { const b = pmW(P, [-26, -66]); pmPurse(ctx, b[0], b[1] + 34, 0.7, { fill: 1 }); } }];
  P.gaze = pmLook(t, P, [[33.7, [870, 760]], [34.6, [560, 640]], [35.7, [520, 790]], [37.2, () => pmHandW(P, 'R')], [38.9, [520, 780]], [39.6, [250, 820]], [40.34, [100, 860]], [40.84, [1000, 860]], [41.3, () => [kfn(t, [[41.14, 940], [42.74, 120]], 'lin'), 930]], [42.2, [500, 1050]]], 0.12);
  return pmFin(t, P);
}

// ---------- S6 + S7: three strangers, the question, the witnesses ----------
function pmManS6(t) {
  const right = pmIn(t, 55.42, 63.0), P = pmC('man', { x: 580, dir: right ? 1 : -1, pal: PM_APRON, seat: 'bench' });
  P.sit = pmTr(t, [[42.86, 0.5], [43.95, 0, 0.28]]);
  P.sq = anticipate(t, 43.72, 0.22, 0.07) * (1 + 0.05 * pulse(t, 43.98, 0.45)) * breathe(t, 3, 0.012);
  P.tip = -0.05 * pmWin(t, 55.42, 55.75, 0.12) + 0.04 * pmWin(t, 55.75, 56.2, 0.12);
  P.drop = pmNods(t, [54.95, 61.6], 0.35, 8) + 3 * pmWin(t, 48.86, 52.8, 0.4);
  P.look = pmShake(t, 50.52, 0.9, 0.8, 2.4) * 1 + (right ? 0.4 : 0);
  P.lid = t < 43.6 ? 0.35 : pmIn(t, 48.86, 52.86) ? 0.5 : 0.1; P.wet = pmIn(t, 50.52, 53.5);
  P.brow = pmIn(t, 48.86, 54.9) ? -0.4 : t > 54.9 && t < 56.5 ? 0.2 : -0.2;
  P.mouth = pmIn(t, 44.0, 48.86) || pmIn(t, 60.7, 63.5) ? 'smile' : 'closed';
  P.talk = talk(t, [[49.47, 51.9], [55.75, 56.1]]) * (t > 55 ? 0.9 : 0.4);
  const wave = Math.sin((t - 56.1) * 14) * 14 * pmWin(t, 56.1, 56.7, 0.1);
  P.aR = pmArm(t, P, 1, [[0, [42, -100]], [44.1, PMH.out, 0.3], [44.9, [58, -108], 0.4], [48.86, PMH.chest, 0.4], [52.0, [40, -100], 0.4], [54.92, PMH.chest, 0.25], [55.6, [34, -178], 0.2], [56.1, () => [64 + wave, -196], 0.15], [56.7, [40, -100], 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, [-40, -100]], [44.1, [-50, -104], 0.3]]);
  P.gaze = pmLook(t, P, [[42.86, [200, 960]], [43.6, () => [kfn(t, [[42.86, -100], [44.6, 385]], 'out'), 700]], [45.74, [385, 690]], [48.86, [480, 820]], [52.86, [385, 690]], [55.42, [980, 700]], [58.2, [800, 712]], [59.5, [895, 707]], [60.7, [850, 700]], [63.0, [385, 690]], [64.1, [300, 800]]], 0.15);
  return pmFin(t, P);
}
function pmKinS6(i, t) {
  const X = [390, 280, 160][i], x0 = [-100, -210, -330][i], ta = [44.6, 44.9, 45.2][i], xf = (tt) => kfn(tt, [[42.86, x0], [ta, X]], 'out');
  const P = pmC(PM_KIN[i], { ...pmWalk(xf, t, [15, 12, 12][i]), dir: 1 });
  const tb = [51.82, 52.22, 51.95][i], bow = pmWin(t, tb, tb + 0.9, 0.25), rock = i === 1 ? 0.03 * Math.sin((t - 58.3) * 9) * pmWin(t, 58.3, 59.0, 0.15) : 0;
  P.sq = breathe(t, 5 + i, 0.012) * landSquash(t, ta, 0.04); P.tip = 0.12 * bow + rock; P.drop = 10 * bow + (i === 0 ? pmNods(t, [64.1], 0.35, 10) : 0);
  P.tilt = i === 0 ? 0.1 * pmWin(t, 45.74, 47.0, 0.3) : 0;
  P.lid = i === 0 ? (pmIn(t, 45.74, 47.0) ? 0.3 : 0.15) + 0.6 * bow : 0.1 + 0.65 * bow;
  P.mouth = (i === 1 && pmIn(t, 62.05, 62.8)) ? 'smile' : (i === 2 && pmIn(t, 62.15, 62.75)) ? 'smile' : 'closed';   // v2: the slip, held a little longer under the push-in
  P.brow = i === 0 ? (pmIn(t, 62.35, 63.0) ? 0.5 : -0.3) : i === 1 ? -0.1 : -0.3;
  P.talk = i === 0 ? talk(t, [[47.2, 48.6], [52.91, 55.5]]) * 0.7 : 0;
  const fold = pmB(t, 58.0 + i * 0.1, 0.4) * (1 - pmB(t, 64.0, 0.3));
  if (i === 0) { P.aR = pmArm(t, P, 1, [[0, PMH.side], [46.86, [82, -132], 0.3], [48.4, PMH.side, 0.4], [51.82, PMH.chest, 0.3], [52.86, PMH.fwd, 0.3], [53.6, [60, -205], 0.3], [54.4, PMH.side, 0.4], [58.0, PMH.foldR, 0.4], [63.9, PMH.side, 0.3], [64.1, [60, -120], 0.2]]);
    P.aL = pmArm(t, P, -1, [[0, PMH.sideL], [58.0, PMH.foldL, 0.4], [63.9, PMH.sideL, 0.3]]); }
  else { const off = pmB(t, 64.1 + (i - 1) * 0.12, 0.35); P.aL = pmArm(t, P, -1, [[0, [-36, -162]], [64.1 + (i - 1) * 0.12, [-6, -104], 0.35]]);
    P.aR = pmArm(t, P, 1, [[0, PMH.side], [tb, PMH.chest, 0.3], [tb + 1.0, PMH.side, 0.3], [58.1, PMH.foldR, 0.4], [64.1 + (i - 1) * 0.12, [26, -104], 0.35]]);
    P.held = [(ctx) => { const sh = pmW(P, [-30, -58]), a = pmHandW(P, 'R'), b = pmHandW(P, 'L'), fr = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 64], p = [K.lerp(sh[0], fr[0], off), K.lerp(sh[1], fr[1], off)];
      if (off < 0.5) { const st = pmW(P, [-14, -150]); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(st[0], st[1]); ctx.lineTo(p[0], p[1] - 60); ctx.stroke(); ctx.restore(); }
      pmBag(ctx, p[0], p[1], { s: i === 1 ? 0.7 : 0.66, rot: 0.08 * (1 - off) + swing(t, 64.5 + (i - 1) * 0.12, 0.25, 1.3, 2.5) }); }]; }
  void fold;
  const Mh = [580, 707];
  P.gaze = pmLook(t, P, i === 0 ? [[42.86, [560, 760]], [45.74, Mh], [51.82, [420, 1000]], [52.86, Mh], [57.2, [850, 700]], [58.8, Mh], [62.35, [250, 700]], [62.85, Mh], [64.1, [250, 800]]]
    : i === 1 ? [[42.86, [520, 775]], [46.0, Mh], [52.4, [385, 700]], [52.9, Mh], [57.2, [850, 700]], [59.0, Mh], [62.1, [200, 700]], [62.5, Mh]]
      : [[42.86, [520, 760]], [45.9, [390, 690]], [47.0, Mh], [57.2, [850, 700]], [59.0, Mh], [62.15, [280, 700]], [62.6, Mh]], 0.1);
  return pmFin(t, P);
}
function pmNbS7(i, t) {
  const xf = i === 0 ? (tt) => kfn(tt, [[57.02, 1100], [58.0, 800]], 'out') : (tt) => kfn(tt, [[57.52, 1180], [58.62, 895]], 'out');
  const P = pmC(i === 0 ? 'nA' : 'nB', { ...pmWalk(xf, t, i === 0 ? 9 : 15), dir: -1 });
  P.sq = breathe(t, 8 + i, 0.012); P.lid = i === 1 ? 0.3 : 0.1; P.mouth = 'closed';
  P.drop = i === 0 ? pmNods(t, [59.0, 59.35], 0.3, 8) : pmNods(t, [59.9], 0.7, 9);
  P.talk = i === 0 ? talk(t, [[58.78, 60.5]]) * 0.8 : talk(t, [[60.0, 60.9]]) * 0.5;
  const rub = 8 * Math.sin(t * 16) * pmWin(t, 57.0, 58.6, 0.2);
  if (i === 0) { P.aR = pmArm(t, P, 1, [[0, () => [12 + rub, -96]], [58.78, PMH.fwd, 0.25], [60.4, [30, -100], 0.4]]); P.aL = pmArm(t, P, -1, [[0, () => [-6 - rub, -94]], [58.78, PMH.sideL, 0.4]]); }
  else { P.aR = pmArm(t, P, 1, [[0, PMH.side], [59.46, PMH.raise, 0.35], [61.2, PMH.side, 0.5]]); P.aL = pmArm(t, P, -1, [[0, PMH.sideL]]); }
  P.gaze = pmLook(t, P, [[57.0, [580, 707]], [62.2, [385, 690]], [62.9, [580, 707]]], 0.25);
  return pmFin(t, P);
}

// ---------- S8 + S9: the two bags, the trust, the heir ----------
function pmManS8(t) {
  const P = pmC('man', { x: 650, dir: -1, pal: PM_APRON });
  const shock = pmIn(t, 69.92, 74.4);
  P.sq = (shock ? 1 + 0.05 * pmWin(t, 69.92, 73.5, 0.2) : 1) * breathe(t, 3, 0.012) * (1 - 0.03 * pulse(t, 66.14, 0.3));
  P.tip = 0.05 * pmWin(t, 66.3, 66.7, 0.12) + 0.06 * pmWin(t, 68.1, 69.0, 0.2);
  P.x += pmIn(t, 73.54, 75.0) ? tremble(t, 1.5, 9) : 0;
  P.eyes = shock || pmIn(t, 83.86, 84.6) || pmIn(t, 66.14, 66.5) ? 'wide' : 'open'; if (P.eyes === 'wide') P.noBlink = true;
  P.lid = P.eyes === 'wide' ? null : pmIn(t, 80.18, 83.8) ? 0.3 : 0.1; P.wet = pmIn(t, 79.5, 86.4);
  P.brow = shock ? -1 : pmIn(t, 83.86, 85) ? -0.8 : -0.3;
  P.mouth = shock || pmIn(t, 83.86, 84.8) || pmIn(t, 66.14, 66.6) ? 'o' : pmIn(t, 64.84, 66.0) ? 'smile' : 'closed';
  P.drop = pmNods(t, [65.3], 0.3, 5) + 4 * pmWin(t, 84.6, 86.4, 0.3);
  P.aR = pmArm(t, P, 1, [[0, [44, -100]], [66.32, { w: [526, 760] }, 0.15], [66.7, [44, -100], 0.35], [73.54, PMH.cheek, 0.15], [74.9, [44, -100], 0.5], [80.18, PMH.mouth, 0.3], [83.0, [44, -100], 0.3], [83.86, [10, -128], 0.2], [84.8, [40, -100], 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, [-40, -100]], [66.32, { w: [600, 762] }, 0.15], [66.7, [-40, -100], 0.35], [73.54, PMH.cheekL, 0.15], [74.9, [-40, -100], 0.5], [80.18, PMH.mouthL, 0.3], [83.0, [-40, -100], 0.3]]);
  P.gaze = pmLook(t, P, [[64.84, [330, 690]], [65.8, [466, 740]], [66.8, [470, 760]], [67.6, [395, 690]], [68.1, [470, 760]], [71.3, () => pmHandW(pmKinS8(0, t), 'R')], [72.3, [430, 790]], [73.54, [500, 770]], [74.0, [395, 690]], [79.0, [330, 420]], [80.2, [395, 690]], [82.6, [515, 760]], [83.4, [395, 690]], [84.6, [515, 770]]], 0.12);
  return pmFin(t, P);
}
function pmKinS8(i, t) {
  const xk = i === 0 ? [[64.84, 390], [64.9, 330, 0.6], [67.4, 395, 0.5], [85.05, -200, 1.6]] : i === 1 ? [[64.84, 280], [65.0, 392, 0.8], [66.4, 280, 0.6], [85.12, -210, 1.5]] : [[64.84, 160], [65.75, 382, 0.6], [67.3, 170, 0.6], [85.42, -150, 1.0]];
  const xf = (tt) => pmTr(tt, xk), P = pmC(PM_KIN[i], { ...pmWalk(xf, t, 13), dir: (i === 2 ? t < 85.42 : t < 84.95) ? 1 : -1 });
  const tb = i === 2 ? 84.62 : 84.62 + stagger(i, 0.13), bow = pmWin(t, tb, tb + 0.35, 0.12);
  P.sq = breathe(t, 5 + i, 0.012) * (i === 1 ? anticipate(t, 65.7, 0.15, 0.06) : 1); P.tip = 0.12 * bow + (i === 0 ? 0.1 * pmWin(t, 64.9, 65.6, 0.2) : 0) + (i === 1 ? 0.06 * pmWin(t, 65.85, 66.2, 0.08) : 0);
  P.drop = 8 * bow + (i === 0 ? 6 * pmWin(t, 64.9, 65.6, 0.2) : 0);
  P.lid = i === 0 ? (pmIn(t, 68.1, 69.0) ? 0.35 : 0.15) : 0.1; P.brow = i === 0 ? -0.2 : -0.1;
  P.mouth = (i === 2 && pmIn(t, 84.95, 86.4)) || (i === 0 && pmIn(t, 68.2, 68.9)) ? 'smile' : 'closed'; if (i === 2 && pmIn(t, 85.0, 85.4)) P.wink = 'R';
  P.talk = i === 0 ? talk(t, [[74.44, 75.41], [75.71, 80.9], [81.39, 84.5]]) * 0.7 : 0;
  if (i === 0) { P.aR = pmArm(t, P, 1, [[0, PMH.side], [64.9, [90, -118], 0.3], [65.9, PMH.side, 0.4], [67.9, { w: [470, 744] }, 0.3], [68.3, () => ({ w: [470 + 10 * Math.sin(t * 8), 744 - 46 * pmB(t, 68.3, 0.6)] }), 0.1], [69.0, PMH.side, 0.35],
    [71.2, { w: [470, 712] }, 0.2], [71.45, { w: [430, 640] }, 0.4], [73.55, { w: [432, 744] }, 0.3], [74.0, PMH.side, 0.3], [74.44, [70, -186], 0.3], [81.02, [10, -124], 0.2], [81.25, PMH.fwd, 0.8], [82.4, PMH.side, 0.4], [84.62, PMH.chest, 0.2], [85.2, PMH.side, 0.3]]);
    P.aL = pmArm(t, P, -1, [[0, PMH.sideL], [74.44, PMH.chestL, 0.3], [81.0, PMH.sideL, 0.4]]); }
  else if (i === 1) { P.aR = pmArm(t, P, 1, [[0, [26, -104]], [65.85, { w: [466, 690] }, 0.18], [66.1, [40, -116], 0.25], [66.6, PMH.side, 0.3], [84.75, PMH.chest, 0.2], [85.3, PMH.side, 0.3]]);
    P.aL = pmArm(t, P, -1, [[0, [-6, -104]], [65.85, { w: [470, 700] }, 0.18], [66.1, PMH.sideL, 0.4]]); }
  else { const wv = 12 * Math.sin((t - 85.0) * 18); P.aR = pmArm(t, P, 1, [[0, [26, -104]], [66.45, { w: [470, 726] }, 0.2], [66.86, () => ({ w: [470, 712 + 10 * (pulse(t, 66.9, 0.15) + pulse(t, 67.1, 0.15))] }), 0.1], [67.25, PMH.side, 0.3], [84.62, PMH.chest, 0.15], [84.98, PMH.side, 0.2]]);
    P.aL = pmArm(t, P, -1, [[0, [-6, -104]], [66.45, { w: [476, 730] }, 0.2], [66.8, PMH.sideL, 0.3], [84.98, () => [-60 - wv, -192], 0.12], [85.42, PMH.sideL, 0.25]]); }
  const Mh = [650, 707];
  P.gaze = pmLook(t, P, i === 0 ? [[64.84, Mh], [67.9, [470, 760]], [69.1, Mh], [71.2, [470, 720]], [71.5, () => pmHandW(P, 'R')], [73.6, Mh]]
    : i === 1 ? [[64.84, [466, 760]], [66.4, Mh], [68.0, [470, 760]], [69.5, Mh]] : [[64.84, [470, 770]], [67.2, [395, 690]], [68.0, [470, 760]], [69.5, Mh], [84.98, [400, 640]], [85.42, [-200, 700]]], 0.12);
  return pmFin(t, P);
}

// ---------- S10: the lady ----------
function pmLadyS10(t) {
  if (t < 88.0) return null;
  const xf = (tt) => pmTr(tt, [[88.0, -90], [88.08, 400, 1.4], [99.3, 420, 0.25], [100.0, 300, 0.6]]), W = pmWalk(xf, t, 8), turn = t > 99.9;
  const P = pmC('lady', { ...W, dir: turn ? -1 : 1 }); P.y -= 3 * Math.abs(Math.sin(W.ph)) * W.amp;
  const jabs = [90.66, 91.1, 91.6], jab = jabs.reduce((s, a) => s + pulse(t, a, 0.25), 0);
  P.tip = 0.06 * pmWin(t, 90.5, 92.0, 0.2) + 0.04 * pmWin(t, 95.0, 97.3, 0.2); P.sq = breathe(t, 9, 0.012) * (turn ? 0.85 + 0.15 * pmB(t, 99.9, 0.2) : 1);
  P.drop = pmNods(t, [95.0], 0.4, 7) + pmNods(t, [99.0], 0.3, 4);
  P.lid = turn ? 0.3 : 0.12; P.mouth = turn ? 'smile' : 'closed';
  const land = PM_LANDS.map((a) => [[a - 0.3, { w: [452, 760] }, 0.2], [a + 0.05, [36, -112], 0.12]]).flat();
  P.aR = pmArm(t, P, 1, [[0, [30, -108]], [90.5, () => [76 + 14 * jab, -96 + 6 * jab], 0.15], [92.0, [30, -108], 0.4], ...land, [97.3, [30, -108], 0.3], [99.45, { w: [462, 772] }, 0.15], [99.55, () => ({ w: [500, 768 - 8 * (pulse(t, 99.66, 0.12) + pulse(t, 99.82, 0.12))] }), 0.1], [99.92, [30, -108], 0.2]]);
  P.aL = pmArm(t, P, -1, [[0, [-10, -108]], [99.9, [10, -120], 0.2]]);
  P.gaze = pmLook(t, P, [[88.0, [520, 780]], [92.2, [630, 780]], [93.4, [560, 707]], [95.0, [460, 790]], [99.0, [560, 707]], [99.9, [100, 800]]], 0.2);
  return pmFin(t, P);
}
function pmManS10(t) {
  const P = pmC('man', { x: 560, dir: -1, pal: PM_APRON, seat: 'bench' });
  P.sit = t < 89.02 ? 0.5 : settleTo(t, 89.02, 0.5, 0, 0.4, 0.1);
  P.sq = breathe(t, 3, 0.012) * anticipate(t, 88.85, 0.17, 0.06); P.tip = 0.08 * pmWin(t, 89.5, 90.1, 0.15) + 0.05 * pmWin(t, 99.0, 99.4, 0.1);
  const frz = pmIn(t, 96.8, 98.7);
  P.look = pmShake(t, 98.78, 0.8, 0.9, 3);
  P.lid = 0.1; P.brow = pmIn(t, 98.78, 100.1) ? -0.8 : frz ? -0.5 : -0.2;
  P.mouth = t < 95.94 ? 'smile' : frz ? 'o' : t < 98.78 ? 'smile' : 'closed';
  P.talk = talk(t, [[93.5, 94.4], [98.8, 99.4]]) * 0.6;
  const gemKeys = [92.16, 92.36, 92.56].map((a, i) => [a - 0.12, { w: [PM_TRAY[[1, 4, 6][i]][0], PM_TRAY[0][1] - 8] }, 0.1]);
  P.aR = pmArm(t, P, 1, [[0, [40, -100]], [89.05, PMH.chest, 0.3], [90.2, [40, -100], 0.4], ...gemKeys, [92.75, { w: [632, 750] }, 0.15], [93.0, [40, -100], 0.2], [93.38, PMH.raise, 0.25], [94.7, [40, -100], 0.4], [98.78, PMH.palm, 0.2], [99.0, { w: [586, 774] }, 0.15], [99.25, { w: [520, 776] }, 0.2], [99.95, [40, -100], 0.3]]);
  P.aL = pmArm(t, P, -1, [[0, [-40, -100]], [91.9, { w: [610, 760] }, 0.2], [92.9, [-40, -100], 0.3], [98.78, PMH.palmL, 0.2], [99.15, { w: [640, 780] }, 0.15], [99.5, [-40, -100], 0.3]]);
  P.gaze = pmLook(t, P, [[86.35, [200, 980]], [88.3, [300, 720]], [89.5, [400, 720]], [92.0, [600, 780]], [93.4, [400, 720]], [95.2, [460, 790]], [96.4, [400, 725]], [96.8, [520, 790]], [98.78, [400, 725]], [99.95, [520, 790]]], 0.15);
  return pmFin(t, P);
}

// ---------- S11: alone with the purses; the doors of fortune ----------
function pmManS11(t) {
  // v2: on وشعر he comes out from behind the counter to the open street (x 835, between two doors) so the doors happen around him
  const xf = (tt) => pmTr(tt, [[100.1, 560], [103.45, 835, 0.95]]), W = pmWalk(xf, t, 13), out = t > 104.35;
  const P = pmC('man', { ...W, dir: out ? -1 : 1, pal: PM_APRON }), [, lift] = hop(t, 107.3, 0.45, 0, 0, 30); P.y -= lift;
  const cam = pmIn(t, 101.6, 102.5), jump = pmIn(t, 107.3, 108.9);
  P.sq = breathe(t, 3, 0.012) * anticipate(t, 107.1, 0.2, 0.08) * landSquash(t, 107.75, 0.14) * (1 + 0.03 * pmWin(t, 103.4, 104.4, 0.3)) * (1 + 0.02 * pmWin(t, 102.5, 103.3, 0.2));
  P.drop = 5 * pmWin(t, 102.5, 103.3, 0.2) - 3 * pmWin(t, 104.6, 107.0, 0.3);
  P.eyes = pmIn(t, 107.3, 107.9) ? 'shut' : pmIn(t, 104.68, 107.2) ? 'wide' : 'open'; P.noBlink = P.eyes !== 'open' || cam;
  P.lid = P.eyes !== 'open' ? null : cam ? Math.max(0.05, pulse(t, 102.0, 0.4)) : 0.05;
  P.brow = cam ? -0.9 : t < 101.6 ? -0.5 : pmIn(t, 104.68, 107.2) ? 0.5 : -0.2; P.mouth = jump ? 'open' : t < 101.6 ? 'o' : t < 102.5 ? 'closed' : pmIn(t, 104.68, 107.2) ? 'o' : 'smile';
  const scr = 6 * Math.sin(t * 22) * pmWin(t, 100.3, 101.3, 0.1);
  P.aR = pmArm(t, P, 1, [[0, [40, -100]], [102.5, PMH.palm, 0.3], [103.4, PMH.chest, 0.3], [104.4, [40, -100], 0.4], [107.2, PMH.raise, 0.15], [108.9, [40, -100], 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, [-40, -100]], [100.3, () => [-44 + scr, -212], 0.25], [101.3, [-40, -100], 0.3], [102.5, PMH.palmL, 0.3], [103.4, PMH.sideL, 0.3], [107.2, PMH.raiseL, 0.15], [108.9, [-40, -100], 0.4]]);
  P.gaze = cam ? [0, 0.05] : pmLook(t, P, [[100.1, [530, 790]], [100.4, [760, 880]], [100.75, [530, 790]], [101.05, [750, 870]], [102.5, [500, 640]], [103.4, [900, 760]], [104.4, [600, 760]], [104.68, [255, 720]], [105.32, [915, 720]], [106.32, [384, 730]], [107.04, [760, 720]], [107.55, [835, 1300]], [107.95, [835, 2400]]], 0.07);
  if (t > 107.9) P.gaze = [0, 0.05];   // delighted look to camera, held to 108.9
  return pmFin(t, P);
}
