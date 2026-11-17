// ===== AN-113 scenes 1-4: the home empties (S1), the wife's advice (S2), the friend's 500 dinars (S3), the walk and the memory (S4) =====
// shallow wooden bowl held or set down; rot tilts it toward the viewer
function pmBowl(ctx, x, y, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, [[-36, -10], [36, -10], [26, 10], [-26, 10]], '#c98a3a', { lw: 4, seed: 600, dot: '#7a4212', pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, ell(0, -10, 36, 7, 18), '#7a4212', { lw: 3.5, seed: 601 }); ctx.restore(); }

// ---------- S1 + S2: the home (morning) ----------
const PM_GOODS = [[2.18, [225, 360, 230, 230]], [2.58, [395, 760, 250, 145]], [3.32, [780, 320, 200, 585]]];   // [pop time, clip rect]: shelves, desk, alcove
function pmHomeMorning(ctx, t) {
  const s1 = t < 8.98, O = pmHomeO({ u: 0.2, lampsLit: 0, stools: s1 ? [] : [528], curtain: t < 3.32 ? 1 : settleTo(t, 3.32, 1, 0.5, 0.6), t });
  palaceHall(ctx, O);
  pmShelfMarks(ctx, t < 2.18 ? 0 : 1);
  if (t < 3.5) for (const [tp, r] of PM_GOODS) { if (t >= tp + 0.14) continue; ctx.save(); ctx.globalAlpha = t < tp ? 1 : 1 - (t - tp) / 0.14; ctx.beginPath(); ctx.rect(...r); ctx.clip(); palaceHall(ctx, pmHomeO({ u: 0.2, lampsLit: 0, shelves: undefined, desk: [410, 630, 800], treasure: true, curtain: 1, t })); ctx.restore(); }
  for (const [tp, r] of PM_GOODS) dustBurst(ctx, r[0] + r[2] / 2, r[1] + Math.min(r[3], 200) * 0.6, t - tp, 9, 14, 30, 90, 0.55, Math.round(tp * 10));
  if (s1) { const M = pmManS1(t), Wf = pmWifeS1(t); pmDraw(ctx, t, M); pmDraw(ctx, t, Wf); }
  else { const M = pmManS2(t), Wf = pmWifeS2(t); pmBowlS2(ctx, t, Wf); pmDraw(ctx, t, M); pmDraw(ctx, t, Wf);
    pmMedal(ctx, 528, 455, 62, { ...PM_FRIENDF, lid: Math.max(0.25, pulse(t, 12.4, 0.22)) }, { p: pmPop(t, 11.66, 0.5) }); }
}
// pale patches where the shelves hung
function pmShelfMarks(ctx, k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.45 * k; ctx.fillStyle = '#fbe3a8'; ctx.fillRect(232, 368, 216, 80); ctx.fillRect(232, 488, 216, 80); ctx.restore(); }
// the purse that lives on the man's belt (limp) or in his right hand
function pmManPurse(M, f = 0, inHand = false, rot = 0) { return (ctx) => { const p = inHand ? pmHandW(M, 'R') : pmW(M, [26, -66]); pmPurse(ctx, p[0], p[1] + (inHand ? 50 : 34), inHand ? 0.9 : 0.7, { fill: f, rot }); }; }
function pmManS1(t) {
  const P = pmC('man', { x: 690, dir: 1 }), sl = t >= 3.82;
  if (t < 3.32) P.pal = { hc: C.yellow, sash: C.yellow, jewel: C.red };
  P.sq = (sl ? settleTo(t, 3.82, 1.03, 0.95, 0.5) : 1.03) * breathe(t, 2);
  P.tip = 0.05 * pmB(t, 3.82, 0.5); P.drop = 6 * pmB(t, 3.82, 0.5) + 6 * pulse(t, 2.33, 0.25);
  const wide = pmIn(t, 2.33, 3.9); P.eyes = wide ? 'wide' : 'open';
  P.lid = wide ? null : t < 2.33 ? 0.3 : Math.max(0.45, pulse(t, 4.15, 0.5));
  if (wide) P.noBlink = true;
  P.brow = t < 2.33 ? -0.1 : -0.6; P.mouth = t < 2.18 ? 'smile' : t < 3.82 ? 'o' : 'frown';
  P.look = pmTr(t, [[0, 0], [2.33, -0.7, 0.07], [2.62, -0.2, 0.07], [3.36, 0.8, 0.07], [3.95, 0, 0.3], [6.9, 0.6, 0.3], [8.35, -0.4, 0.3]]);
  P.aR = pmArm(t, P, 1, [[0, PMH.hips], [3.82, PMH.side, 0.45], [4.48, [52, -150], 0.35], [5.56, PMH.palm, 0.3], [6.16, [38, -92], 0.45]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.hipsL], [3.82, PMH.sideL, 0.45], [5.56, PMH.palmL, 0.3], [6.16, PMH.sideL, 0.45]]);
  const turn = pmB(t, 4.8, 0.22) * (1 - pmB(t, 5.3, 0.25));
  P.held = [pmManPurse(P, 0, t >= 4.48, Math.PI * turn + swing(t, 5.55, 0.35, 1.3, 2.2)), (ctx) => { if (pmIn(t, 4.98, 5.6)) { const h = pmHandW(P, 'R'); dustBurst(ctx, h[0], h[1] - 30, t - 4.98, 5, 6, 12, 26, 0.55, 3); } }];
  P.gaze = pmLook(t, P, [[0, [300, 480]], [1.0, [520, 780]], [1.7, [880, 700]], [2.33, [330, 470]], [2.62, [520, 790]], [3.36, [880, 720]], [3.95, [700, 1100]], [4.6, () => pmHandW(P, 'R')], [5.56, [640, 1150]], [6.9, [880, 700]], [7.9, [820, 790]], [8.35, [560, 1100]]], 0.1);
  return pmFin(t, P);
}
function pmWifeS1(t) {
  if (t < 6.68) return null;
  const xf = (tt) => kfn(tt, [[6.68, 1080], [7.78, 840]], 'out'), P = pmC('wife', { ...pmWalk(xf, t, 12), dir: -1 });
  P.tilt = pmShake(t, 7.95, 0.8, 0.1, 2.5); P.lid = 0.15; P.mouth = 'closed';
  const tl = pmB(t, 7.84, 0.3) * (1 - pmB(t, 8.7, 0.3));
  P.aR = pmArm(t, P, 1, [[0, [34, -118 - 12 * tl]]]); P.aL = pmArm(t, P, -1, [[0, [-4, -116]]]);
  P.held = [(ctx) => { const a = pmHandW(P, 'R'), b = pmHandW(P, 'L'); pmBowl(ctx, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 4, -0.7 * tl); }];
  P.gaze = pmLook(t, P, [[6.68, [690, 712]]]);
  return pmFin(t, P);
}
function pmManS2(t) {
  const P = pmC('man', { x: 470, dir: 1 }), up = pmB(t, 14.96, 0.4);
  P.sq = K.lerp(0.95, 1.02, up) * breathe(t, 2, 0.02) * anticipate(t, 15.45, 0.3, 0.06);
  P.tip = 0.04 * (1 - up); P.drop = 6 * (1 - up) + pmNods(t, [14.55], 0.35, 7);
  P.lid = pmTr(t, [[8.98, 0.5], [12.74, 0.1, 0.4], [13.85, 0.4, 0.25], [14.96, 0.05, 0.3]]); P.wet = pmIn(t, 13.85, 15.84);
  P.brow = pmTr(t, [[8.98, -0.5], [12.74, 0, 0.4], [13.85, -0.5, 0.3], [14.96, 0.15, 0.3]]);
  P.mouth = pmIn(t, 13.28, 13.8) ? 'smile' : pmIn(t, 13.85, 14.9) ? 'frown' : 'closed';
  P.look = pmTr(t, [[8.98, 0.3], [12.74, 0.4, 0.3], [14.96, -0.7, 0.3]]);
  P.aR = pmArm(t, P, 1, [[0, [38, -92]], [13.6, [60, -112], 0.35], [14.96, [40, -96], 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.sideL]]);
  P.held = [pmManPurse(P, 0, pmIn(t, 13.6, 15.2))];
  P.gaze = pmLook(t, P, [[8.98, [520, 1100]], [9.6, [585, 1000]], [12.74, [528, 455]], [13.85, () => pmHandW(P, 'R')], [14.3, [585, 715]], [14.96, [140, 720]]], 0.15);
  return pmFin(t, P);
}
function pmWifeS2(t) {
  const P = pmC('wife', { x: 585, dir: -1 }), M = { ...pmC('man', { x: 470 }), sq: 0.97 };
  P.tip = 0.06 * pmWin(t, 9.0, 10.9, 0.3) + 0.05 * pmWin(t, 14.0, 15.0, 0.25); P.drop = pmNods(t, [11.25, 14.3], 0.4, 8);
  P.talk = talk(t, [[9.05, 10.3], [10.9, 12.45], [13.3, 15.0]]) * 0.7; P.lid = 0.1;
  P.mouth = pmIn(t, 15.0, 15.84) ? 'smile' : 'closed';
  P.aR = pmArm(t, P, 1, [[0, [30, -118]], [9.0, { w: [528, 846] }, 0.35], [9.5, { w: [512, 784] }, 0.3], [10.8, [56, -210], 0.3], [11.9, [30, -110], 0.4], [14.12, { w: [536, 790] }, 0.3], [15.2, [30, -110], 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, [-6, -116]], [9.3, PMH.sideL, 0.4]]);
  P.gaze = pmLook(t, P, [[8.98, () => pmHead(M)], [10.92, [300, 520]], [11.8, [528, 455]], [12.5, () => pmHead(M)], [14.12, [535, 800]], [14.5, () => pmHead(M)]], 0.2);
  return pmFin(t, P);
}
function pmBowlS2(ctx, t, Wf) { const A = (() => { const a = pmHandW(Wf, 'R'), b = pmHandW(Wf, 'L'); return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 4]; })(); const p = t < 9.0 ? A : pmHandOver(t, 9.0, 0.32, A, [528, 846], 3); pmBowl(ctx, p[0], p[1]); }

// ---------- S3 + S12 + S13: the friend's house ----------
const pmFriendSet = (t, o = {}) => pmFriendO({ u: 0.3, t, ...o });
const PM_DESKPURSE = [470, 800];
function pmFriendHouse1(ctx, t) {
  palaceHall(ctx, pmFriendSet(t, { doorOpen: pmTr(t, [[15.84, 0.15], [15.85, 0.9, 0.3], [17.4, 0, 0.7]]) }));
  const M = pmManS3(t), F = pmFriendS3(t);
  if (t < 24.85) pmPurse(ctx, PM_DESKPURSE[0], PM_DESKPURSE[1] - 2, 0.9, { fill: 1 });
  pmDraw(ctx, t, F); pmDraw(ctx, t, M);
  // the fat purse: desk -> friend's left hand -> the man's two hands
  if (t >= 24.85) { const fh = pmHandW(F, 'L'), a = pmHandW(M, 'R'), b = pmHandW(M, 'L'), mh = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const p = t < 25.38 ? fh : pmHandOver(t, 25.38, 0.26, fh, mh, 8); pmPurse(ctx, p[0], p[1] + 46, 0.95, { fill: 1, sq: impactSquash(t, 25.64, 0.88) }); }
}
function pmManS3(t) {
  const xf = (tt) => 120 + 210 * K.ease.out(K.clamp((tt - 15.84) / 1.35)), P = pmC('man', { ...pmWalk(xf, t, 11), dir: 1 });
  P.tip = 0.06 * pmB(t, 17.1, 0.3) * (1 - pmB(t, 26.6, 0.3)) + 0.12 * pmWin(t, 28.4, 29.6, 0.25) + 0.03 * pmWin(t, 22.98, 23.4, 0.1) * -1;
  P.sq = (t < 19.52 ? 1 : settleTo(t, 19.52, 1, 0.95, 0.5) + 0.05 * pmB(t, 25.64, 0.6)) * breathe(t, 3, 0.015);
  P.drop = 7 * (1 - pmB(t, 26.62, 0.3)) - 3 * pmWin(t, 22.98, 23.4, 0.1);
  P.x += pmIn(t, 20.3, 22.9) ? tremble(t, 1, 8) : 0;
  P.lid = t < 19.52 ? 0.4 : t < 22.98 ? 0.7 : t < 26.62 ? 0.4 : t < 28.4 ? 0 : Math.max(0.2, pmWin(t, 28.5, 28.85, 0.08));
  if (pmIn(t, 22.98, 23.4)) P.lid = 0.15;
  P.eyes = pmIn(t, 26.62, 28.3) ? 'wide' : 'open'; if (P.eyes === 'wide') { P.lid = null; P.noBlink = true; }
  P.wet = pmIn(t, 19.52, 23.6) || t > 28.3;
  P.brow = t < 26.62 ? -0.5 : t < 28.3 ? -0.7 : -0.3;
  P.mouth = pmIn(t, 19.52, 22.98) ? 'frown' : pmIn(t, 26.62, 28.3) ? 'o' : t > 28.6 ? 'smile' : 'closed';
  P.talk = talk(t, [[17.24, 19.5], [19.52, 21.0]]) * 0.55;
  const F = () => [xfF(t), 698];
  P.aR = pmArm(t, P, 1, [[0, PMH.side], [17.24, [76, -122], 0.35], [19.4, PMH.side, 0.4], [24.34, PMH.sash, 0.3], [25.2, [44, -124], 0.3], [28.4, [8, -124], 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.sideL], [20.3, [-10, -186], 0.3], [22.98, PMH.sideL, 0.3], [25.2, [22, -118], 0.3], [28.4, [-4, -118], 0.4]]);
  P.held = [t < 24.6 ? pmManPurse(P, 0, true, swing(t, 17.6, 0.3, 1.4, 2)) : pmManPurse(P, 0, false)];
  P.gaze = pmLook(t, P, [[15.84, [400, 1000]], [17.24, [500, 1050]], [19.52, [380, 1100]], [22.98, F], [23.4, [420, 1080]], [25.2, () => pmHandW(P, 'R')], [26.62, () => pmHandW(P, 'R')], [27.0, F], [28.4, [380, 1050]]], 0.15);
  return pmFin(t, P);
}
const xfF = (tt) => pmTr(tt, [[15.84, 650], [18.46, 622, 0.5], [22.95, 430, 0.65]]);
function pmFriendS3(t) {
  const xf = xfF, P = pmC('friend', { ...pmWalk(xf, t, 13), dir: -1 });
  P.mouth = pmIn(t, 16.66, 18.46) || t > 25.0 ? 'smile' : 'closed'; P.brow = t < 18.46 ? -0.3 : t < 25.0 ? -0.5 : -0.2;
  P.tilt = 0.08 * pmWin(t, 18.6, 22.95, 0.4); P.drop = pmNods(t, [22.2], 0.7, 8) + pmNods(t, [27.6, 27.95], 0.3, 5);
  P.lid = pmIn(t, 23.5, 25.0) ? 0.25 : pmIn(t, 21.02, 22.92) ? 0.15 : 0.2;
  P.talk = talk(t, [[27.38, 28.25]]) * 0.5;
  P.tip = -0.04 * pmWin(t, 24.4, 25.2, 0.2) + 0.04 * pmWin(t, 25.3, 25.8, 0.15);
  const M = () => pmHead(pmManS3(t));
  P.look = pmTr(t, [[15.84, 0.6], [16.5, 0, 0.3], [24.34, -0.8, 0.2], [25.25, 0, 0.3]]);
  P.aR = pmArm(t, P, 1, [[0, PMH.side], [16.66, PMH.out, 0.3], [17.4, PMH.side, 0.5], [21.02, PMH.chin, 0.4], [22.92, PMH.side, 0.3], [23.55, () => ({ w: pmW(pmManS3(t), [31, -140]) }), 0.25], [24.34, PMH.side, 0.3], [27.38, PMH.fwd, 0.3], [28.3, PMH.side, 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.sideL], [16.66, PMH.outL, 0.3], [17.4, PMH.sideL, 0.5], [24.34, { w: [470, 778] }, 0.45], [24.95, [-30, -150], 0.3], [25.38, () => { const M2 = pmManS3(t), a = pmHandW(M2, 'R'), b = pmHandW(M2, 'L'); return { w: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] }; }, 0.26], [25.9, PMH.sideL, 0.4]]);
  P.gaze = pmLook(t, P, [[15.84, [300, 470]], [16.5, M], [24.34, [470, 790]], [25.25, M]], 0.2);
  return pmFin(t, P);
}

// ---------- S4: the market walk and the memory inset ----------
function pmManS4(t) {
  const xf = (tt) => 120 + 200 * K.ease.out(K.clamp((tt - 29.42) / 3.46)), W = pmWalk(xf, t, 13), P = pmC('man', { ...W, dir: 1 });
  P.sq = settleTo(t, 32.88, 1, 1.02, 0.4, 0.3) * breathe(t, 3, 0.012);
  P.lid = 0.2; P.brow = t < 32.88 ? -0.2 : 0.2; P.mouth = t < 32.88 ? 'closed' : 'smile';
  P.look = pmTr(t, [[29.42, -0.5], [32.88, 0.3, 0.3], [33.3, 0.6, 0.3]]); P.tilt = -0.06 * (1 - pmB(t, 32.88, 0.3));
  const toss = 14 * Math.abs(Math.sin(W.ph * 0.5)) * W.amp;
  P.aR = pmArm(t, P, 1, [[0, [42, -112 - toss * 0.4]], [32.88, [58, -152], 0.35]]); P.aL = pmArm(t, P, -1, [[0, PMH.sideL]]);
  P.held = [(ctx) => { const h = pmHandW(P, 'R'); pmPurse(ctx, h[0], h[1] + 8 - toss, 0.8, { fill: 1 }); }];
  P.gaze = pmLook(t, P, [[29.42, [W.x - 300, 300]], [32.88, () => pmHandW(P, 'R')], [33.3, [1000, 700]]], 0.2);
  return pmFin(t, P);
}
// the memory: the young jeweller at his bench (drawn in panel space inside a circle)
function pmInsetYouth(ctx, t, cx, cy) {
  const k = t < 31.42 ? 0 : t < 33.35 ? K.ease.back(K.clamp((t - 31.42) / 0.3)) : 1 - pmB(t, 33.35, 0.3); if (k <= 0.01) return; const r = 190 * k;
  ctx.save(); ctx.translate(cx, cy); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.save(); ctx.clip();
  ctx.fillStyle = '#e8b25a'; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.fillStyle = dotPat(ctx, C.red, 12, 0.2); ctx.fillRect(-r, -r, 2 * r, 2 * r);
  ctx.scale(0.95, 0.95); shape(ctx, K.rectPts(-200, 150, 400, 80), '#c98a3a', { lw: 5, seed: 610 });
  shape(ctx, K.rectPts(10, 62, 170, 16), WOOD, { lw: 4, seed: 611 }); seg(ctx, 30, 78, 30, 150, 8, WOOD, 3); seg(ctx, 160, 78, 160, 150, 8, WOOD, 3);
  const taps = [31.78, 32.0, 32.22], up = taps.reduce((s, a) => s + pulse(t, a - 0.11, 0.22), 0), eye = pmB(t, 32.5, 0.3);
  const Y = { costume: 'villager', age: 0, s: 0.92, x: -50, y: 150, dir: 1, sit: 1, seat: 'stool', seed: 31, mouth: t > 32.5 ? 'smile' : 'closed', brow: -0.2 };
  Y.gaze = eye > 0.5 ? [0.3, 0] : [0.7, 0.8]; Y.wink = eye > 0.6 ? 'R' : undefined; Y.lid = eye > 0.6 ? null : 0.2;
  Y.aR = armTo(1, PM_SH, eye > 0 ? [K.lerp(80, 26, eye), K.lerp(-118 - 30 * up, -196, eye)] : [80, -118 - 30 * up]); Y.aL = armTo(-1, PM_SH, [40, -112]);
  person(ctx, pmFin(t, Y)); const h = pmHandW(Y, 'R');
  if (eye < 0.3) { seg(ctx, h[0], h[1], h[0] + 16, h[1] - 26, 6, WOOD, 2); shape(ctx, K.rectPts(h[0] + 8, h[1] - 38, 22, 12), '#4a5878', { lw: 3, seed: 612 }); pmGem(ctx, 92, 54, 10, C.red, pulse(t, 31.9, 0.3) + pulse(t, 32.12, 0.3) + pulse(t, 32.34, 0.3)); }
  else pmGem(ctx, h[0] + 4, h[1] - 10, 11, C.red, 0.6 + 0.4 * Math.sin(t * 9));
  ctx.restore(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
  ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.stroke();
  if (pmIn(t, 31.85, 32.7)) { ctx.save(); ctx.globalAlpha = pmFade(t, 31.85, 32.7, 0.15); sfx(ctx, 'TINK!', 70, -90, 64, pmB(t, 31.85, 0.2, 'lin'), { rot: -0.1 }); ctx.restore(); }
  ctx.restore();
}
