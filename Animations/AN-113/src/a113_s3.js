// ===== AN-113 scenes 12-17: the repayment refused, the sealed note, the reading, the reveal cloud, the friend's plan, the ending =====

// ---------- S12 + S13: the friend's house again ----------
const pmXM12 = (tt) => (tt < 131.25 ? kfn(tt, [[109.34, 120], [111.3, 340]], 'out') : 340 - 110 * pmB(tt, 131.3, 0.62, 'in'));
const pmXF12 = (tt) => pmTr(tt, [[109.34, 720], [118.6, 520, 0.7]]);
function pmFriendHouse2(ctx, t) {
  palaceHall(ctx, pmFriendSet(t, { stools: [742], doorOpen: pmTr(t, [[109.34, 0.9], [111.4, 0, 0.7], [131.3, 0.8, 0.4]]) }));
  const M = pmManS12(t), F = pmFriendS12(t);
  pmDraw(ctx, t, F); pmDraw(ctx, t, M);
  // the purse between them, and the note
  const pp = pmPurse12(t, M, F); pmPurse(ctx, pp[0], pp[1], 0.95, { fill: 1, bow: pmPop(t, 122.9, 0.35), sq: impactSquash(t, 119.65, 0.92) });
  const np = pmNote12(t, M, F); if (np) pmNote(ctx, np[0], np[1], { rot: np[2], s: 0.6 });
  if (t > 129.72 && t < 131.92) pmHouseIcon(ctx, 250, 575, pmPop(t, 129.72, 0.35) * 1.1);
}
function pmPurse12(t, M, F) {
  const a = pmHandW(M, 'R'), b = pmHandW(M, 'L'), mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 52];
  if (t > 124.4) { const l = pmHandW(M, 'L'); return [l[0], l[1] + 50]; }
  return mid;
}
function pmNote12(t, M, F) {
  if (t < 125.25 || t > 130.92) return null; const fr = pmHandW(F, 'R'), mr = pmHandW(M, 'R');
  if (t < 126.1) return [fr[0], fr[1] - 10, -0.4];
  const p = pmHandOver(t, 126.1, 0.25, [fr[0], fr[1] - 10], [mr[0], mr[1] - 6], 4); return [p[0], p[1], t > 126.92 ? 0.35 * Math.sin((t - 126.92) * 5) * pmWin(t, 126.92, 128.6, 0.2) : -0.2];
}
function pmManS12(t) {
  const P = pmC('man', { ...pmWalk(pmXM12, t, t < 112 ? 17 : 12), dir: t < 131.25 ? 1 : -1, pal: PM_APRON });
  const reach = pmWin(t, 112.82, 119.6, 0.3), bow = pmWin(t, 115.18, 115.9, 0.2);
  P.sq = breathe(t, 3, 0.015) * anticipate(t, 112.6, 0.22, 0.05) * (1 + 0.03 * pulse(t, 112.82, 0.6)) * (t > 124.28 ? 0.98 : 1);
  P.tip = 0.1 * bow + 0.08 * pmWin(t, 131.0, 131.3, 0.1) - 0.02 * pmWin(t, 119.6, 120.0, 0.1);
  P.drop = -4 * pmWin(t, 109.34, 112.8, 0.3) + 4 * bow;
  P.look = pmShake(t, 124.4, 0.8, 0.8, 2.5);
  P.lid = bow > 0.3 ? 0.4 : t > 124.28 && t < 126 ? 0.4 : 0.1; P.wet = pmIn(t, 124.28, 126.5);
  P.brow = pmIn(t, 119.5, 122.1) ? -0.6 : pmIn(t, 126.9, 131.92) ? -0.4 : -0.1;
  P.mouth = t < 112.6 || pmIn(t, 124.28, 126.0) ? 'smile' : 'closed';
  P.talk = talk(t, [[113.7, 114.3], [114.75, 117.8], [120.2, 121.0]]) * 0.6;
  P.aR = pmArm(t, P, 1, [[0, [44, -128]], [112.82, [94, -150], 0.35], [119.6, [16, -126], 0.6], [120.5, [62, -132], 0.4], [121.2, [16, -126], 0.4], [124.28, PMH.side, 0.4], [126.05, { w: [466, 722] }, 0.2], [126.4, [44, -140], 0.3], [130.58, PMH.sash, 0.3], [131.0, PMH.side, 0.3]]);
  P.aL = pmArm(t, P, -1, [[0, [24, -124]], [112.82, [80, -146], 0.35], [119.6, [-6, -122], 0.6], [120.5, [44, -128], 0.4], [121.2, [-6, -122], 0.4], [124.28, [-30, -100], 0.4]]);
  void reach;
  const Fh = [pmXF12(t), 688];
  P.gaze = pmLook(t, P, [[109.34, [600, 700]], [112.82, Fh], [119.5, [440, 790]], [120.1, Fh], [124.28, [400, 860]], [125.1, [461, 715]], [126.4, () => pmHandW(P, 'R')], [130.9, Fh], [131.15, [130, 700]]], 0.15);
  return pmFin(t, P);
}
function pmFriendS12(t) {
  const P = pmC('friend', { ...pmWalk(pmXF12, t, 13), dir: -1, seat: 'bench' });
  P.sit = t < 111.95 ? 1 : settleTo(t, 111.95, 1, 0, 0.45, 0.08);
  const shake = pmShake(t, 117.92, 1.3, 0.8, 1.6), mask = t > 131.3;
  P.look = shake; P.sq = breathe(t, 4, 0.012) * anticipate(t, 111.8, 0.15, 0.05);
  P.tip = 0.04 * pmWin(t, 119.5, 120.4, 0.15) + 0.04 * pmWin(t, 121.2, 121.6, 0.1);
  P.drop = pmNods(t, [123.0], 0.4, 6) + (t < 111.95 ? 8 : 0);
  P.lid = mask ? 0.3 : pmIn(t, 117.92, 119.5) ? 0.25 : 0.15; P.wink = mask && t < 131.75 ? 'R' : undefined;
  P.brow = pmIn(t, 128.72, 129.7) ? -0.5 : -0.25;
  P.mouth = mask ? 'open' : pmIn(t, 111.9, 116.9) || pmIn(t, 122.08, 124.5) || pmIn(t, 128.9, 130.6) ? 'smile' : 'closed';
  P.talk = mask ? 0 : talk(t, [[118.5, 120.1], [120.74, 124.9], [127.4, 129.5], [129.72, 131.0]]) * 0.55;
  const wag = Math.sin((t - 128.95) * 20) * 12 * pmWin(t, 128.95, 129.6, 0.08);
  const purse = () => ({ w: pmPurse12(t, pmManS12(t), P).map((v, i) => v - (i ? 40 : 0)) });
  P.aR = pmArm(t, P, 1, [[0, { w: [640, 786] }], [111.95, [70, -140], 0.3], [112.9, PMH.side, 0.4], [117.92, [56, -176], 0.3], [119.4, purse, 0.25], [121.0, PMH.side, 0.2], [121.15, purse, 0.15], [121.7, PMH.side, 0.3],
    [122.08, PMH.chest, 0.3], [124.4, PMH.side, 0.3], [125.02, [-14, -112], 0.25], [125.3, [56, -176], 0.4], [126.4, PMH.side, 0.3], [128.72, () => ({ w: pmHandW(pmManS12(t), 'R') }), 0.1], [128.95, () => [44 + wag, -205], 0.15], [129.72, PMH.fwd, 0.3], [130.5, PMH.side, 0.4], [131.3, [20, -96], 0.3]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.sideL], [111.95, [-70, -140], 0.3], [112.9, PMH.sideL, 0.4], [119.4, purse, 0.25], [121.0, PMH.sideL, 0.2], [121.15, purse, 0.15], [121.7, PMH.sideL, 0.3], [131.3, [-10, -94], 0.3]]);
  P.gaze = mask ? [0.5, 0.1] : pmLook(t, P, [[109.34, [640, 790]], [111.88, [pmXM12(t), 708]], [116.98, [440, 760]], [117.38, () => [pmXM12(t), 708]], [125.1, () => pmHandW(P, 'R')], [125.9, [400, 740]], [126.6, () => [pmXM12(t), 708]], [129.72, [130, 700]], [130.4, () => [pmXM12(t), 708]]], 0.15);
  return pmFin(t, P);
}

// ---------- S14 to S17: the home at dusk ----------
const PM_U2 = (t) => 0.48 + 0.04 * pmB(t, 177.4, 1.2);
function pmHomeDusk(ctx, t) {
  palaceHall(ctx, pmHomeO({ u: PM_U2(t), lampsLit: 1 - 0.5 * pulse(t, 177.4, 0.25), t })); pmShelfMarks(ctx, 1);
  pmPurse(ctx, 385, 902, 0.8, { fill: 1 });
  const M = pmManS14(t), Wf = pmWifeS14(t); pmDraw(ctx, t, M); pmDraw(ctx, t, Wf);
  // the note / letter in his hands
  // v2: the open note is about 55 percent of v1, hangs from the top roller held in both hands at chest height, tilted toward the wife, bottom swinging;
  // during the forehead slap (148.5) it stays in the left hand
  const a = pmHandW(M, 'R'), b = pmHandW(M, 'L'), sk = pmWin(t, 148.5, 149.45, 0.15), mid0 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], mid = [K.lerp(mid0[0], b[0] + 26, sk), K.lerp(mid0[1], b[1], sk)];
  const op = t < 134.92 ? 0 : settleTo(t, 134.92, 0, 1, 0.4, 0.06) * (1 - pmB(t, 174.05, 0.25)), tr = pmIn(t, 138.12, 139.6) ? tremble(t, 1, 11) : 0;
  if (op < 0.02) pmNote(ctx, mid[0], mid[1] - 4, { s: 0.6, seal: t < 134.5 ? 1 : 0, rot: 0.05 * Math.sin(t * 9) * pmWin(t, 132.6, 134.5, 0.2) });
  else pmNote(ctx, mid[0] + tr, mid[1] - 4, { s: 0.47, open: op, rot: -0.09 + 0.035 * Math.sin(t * 2.3) + 0.12 * sk, lines: 4 * pmB(t, 136.44, 0.72, 'lin') });
  if (pmIn(t, 134.5, 135.6)) for (const sd of [-1, 1]) { const x = mid[0] + sd * (6 + 30 * pmB(t, 134.5, 0.4)), y = fallY(t, 134.5, 134.95, mid[1] - 4, 896); shape(ctx, ell(x, Math.min(896, y), 7, 7, 10), C.red, { lw: 2.5, seed: 640 }); }
  if (pmIn(t, 173.6, 175.4)) teardrops(ctx, t, 173.6, 173.7, (tt) => pmW(pmManS14(tt), [-13, -191]), { groundY: 896, rate: 3 });
}
function pmManS14(t) {
  const P = pmC('man', { x: 470, dir: 1, pal: PM_APRON, seat: 'stool' });
  P.sit = t < 174.3 ? 1 : settleTo(t, 174.45, 1, 0, 0.5, 0.06);
  const frz = pmIn(t, 138.12, 139.6), jaw = pmIn(t, 142.96, 144.6), slap = pmIn(t, 148.5, 149.5), stand = t > 175.0;   // v2: jaw on أقارب, slap on أم
  P.sq = breathe(t, 3, 0.015) * anticipate(t, 174.1, 0.2, 0.06) * (stand ? settleTo(t, 175.24, 1.04, 1.0, 0.6, 0.1) : 1) * (1 - 0.04 * pmWin(t, 148.6, 149.1, 0.12)) * (1 + 0.04 * pulse(t, 143.05, 0.45)) * (t > 164.2 && t < 165.8 ? K.lerp(1.0, 0.97, pmB(t, 164.2, 1.2)) : 1);
  P.look = pmShake(t, 152.4, 1.3, 0.55, 1.3);   // slow head shake: he never knew
  P.drop = pmTr(t, [[131.92, 4], [137.2, 6, 0.4], [139.2, 0, 0.3], [164.2, 6, 0.4], [164.9, 0, 0.8], [175.24, -3, 0.5]]);
  P.x += pmIn(t, 173.6, 174.2) ? tremble(t, 1.2, 7) : 0;
  P.eyes = frz || jaw ? 'wide' : 'open';
  P.lid = P.eyes === 'wide' ? null : pmTr(t, [[131.92, 0.15], [137.2, 0.3], [137.6, 0, 0.4], [153.8, 0.25, 0.4], [164.2, 0.6, 0.4], [164.9, 0.2, 1.0], [175.24, 0.2]]);
  if (P.lid != null) P.lid = Math.max(P.lid, pulse(t, 166.2, 0.5) * 0.95, pulse(t, 102, 0.1));
  if (P.eyes === 'wide') P.noBlink = true;
  P.wet = t > 152.4; P.brow = jaw ? -1 : frz ? -0.6 : pmTr(t, [[131.92, -0.2], [165.34, -0.3], [169, 0.1, 1]]);
  P.mouth = slap || pmIn(t, 173.6, 174.0) ? 'open' : jaw ? 'open' : frz ? 'o' : pmIn(t, 165.34, 166.5) ? 'o' : t > 166.5 || pmIn(t, 149.5, 152.3) || pmIn(t, 153.5, 156.0) ? 'smile' : 'closed';
  P.talk = talk(t, [[156.14, 157.4], [158.0, 159.2]]) * 0.2;
  const read = (tt) => { const k = ((tt - 137.2) / 0.3) % 1; return [K.lerp(530, 420, k), 830 + 20 * Math.floor(((tt - 137.2) / 0.3) % 3)]; };
  P.aR = pmArm(t, P, 1, [[0, PMH.sash], [132.1, [44, -128], 0.4], [148.5, [40, -210], 0.15], [149.3, [44, -128], 0.35], [164.2, [42, -100], 0.8], [174.3, PMH.clasp, 0.35], [175.24, PMH.side, 0.6]]);
  P.aL = pmArm(t, P, -1, [[0, [-20, -110]], [132.3, [-28, -128], 0.4], [164.2, [-26, -100], 0.8], [174.3, PMH.claspL, 0.35], [175.6, PMH.claspL, 0.4]]);
  P.gaze = pmLook(t, P, [[131.92, [500, 830]], [137.2, read], [138.12, [480, 830]], [139.2, [520, 380]], [142.96, [500, 360]], [148.5, [470, 400]], [154.34, [520, 390]], [156.14, [490, 860]], [164.2, [470, 900]], [165.0, [560, 640]], [167.86, [385, 880]], [168.6, [480, 860]], [169.32, [310, 470]], [173.6, [560, 600]], [175.24, [560, 400]]], 0.12);
  return pmFin(t, P);
}
function pmWifeS14(t) {
  const P = pmC('wife', { x: pmTr(t, [[131.92, 620], [174.8, 578, 0.45]]), dir: -1 });
  P.tip = 0.07 * pmB(t, 132.4, 0.4) * (1 - pmB(t, 139.2, 0.4)) + 0.1 * pmWin(t, 156.14, 158.0, 0.3);
  P.sq = breathe(t, 6, 0.012); P.lid = 0.1;
  P.mouth = pmIn(t, 142.96, 145.0) ? 'o' : pmIn(t, 148.82, 150.5) || t > 152.5 ? 'smile' : 'closed';
  P.aR = pmArm(t, P, 1, [[0, PMH.clasp], [142.96, PMH.mouth, 0.15], [145.0, PMH.clasp, 0.4], [148.6, PMH.chest, 0.3], [150.5, PMH.clasp, 0.4], [175.24, () => ({ w: pmW(pmManS14(t), [40, -112]) }), 0.4]]);
  P.aL = pmArm(t, P, -1, [[0, PMH.claspL], [142.96, PMH.mouthL, 0.15], [145.0, PMH.claspL, 0.4]]);
  P.gaze = pmLook(t, P, [[131.92, [480, 830]], [138.3, [450, 730]], [139.4, [520, 380]], [142.96, [450, 730]], [143.7, [520, 380]], [148.9, [450, 730]], [149.6, [520, 380]], [156.14, [480, 840]], [164.2, [450, 730]], [169.32, [310, 470]], [172.0, [450, 730]], [175.24, () => pmHead(pmManS14(t))]], 0.2);
  return pmFin(t, P);
}

// ---------- the thought cloud (S15, S16): six pictures with right-to-left wipes ----------
const PM_PICS = [[139.2, 'kin'], [144.5, 'lady'], [150.0, 'bags'], [154.34, 'write'], [157.46, 'map'], [161.96, 'grey']];   // v2: bags picture starts on الأموال
// v2: drawn in PANEL space (after the camera) so the couple can be framed close below it; the tail ends beside his turban, not on it
const PM_CLOUD = { x: 500, y: 340, w: 900, h: 540, sc: 0.86 };
function pmCloud(ctx, t, cam) {
  const p = pmB(t, 139.2, 0.55, 'lin') * (1 - pmB(t, 163.94, 0.5, 'lin')); if (p <= 0) return;
  const hd = pmP(...pmHead(pmManS14(t)), cam), tail = [hd[0] + 95, hd[1] - 80];
  thoughtCloud(ctx, PM_CLOUD.x, PM_CLOUD.y, PM_CLOUD.w, PM_CLOUD.h, t, { p, tail, bg: '#fff3d6', scale: PM_CLOUD.sc, at: [0, 0], seed: 7, inside: (c) => {
    let i = 0; for (let k = 0; k < PM_PICS.length; k++) if (t >= PM_PICS[k][0]) i = k;
    const u = pmB(t, PM_PICS[i][0], 0.25, 'lin');
    if (u < 1 && i > 0) pmPic(c, t, PM_PICS[i - 1][1]);
    c.save(); if (u < 1 && i > 0) { c.beginPath(); c.rect(K.lerp(620, -620, u), -1000, 3000, 2000); c.clip(); } pmPic(c, t, PM_PICS[i][1]); c.restore();
    if (u < 1 && i > 0) { const x = K.lerp(620, -620, u); seg(c, x, -900, x, 900, 10, C.black, 0); } } });
}
// one cloud picture, drawn around its own centre (cloud-local units = world / 0.55)
function pmPic(c, t, kind) {
  const at = { kin: [300, 770], lady: [480, 770], bags: [480, 790], write: [620, 770], map: [500, 720], grey: [520, 780] }[kind];
  c.save(); if (kind === 'map') c.scale(0.68, 0.68); c.translate(-at[0], -at[1]);
  if (kind === 'kin' || kind === 'lady' || kind === 'bags') { pmMarketSet(c, t); pmStall(c, 'back', { open: 1, t }); pmStall(c, 'front', { open: 1, awning: 1, sign: 1, t }); }
  if (kind === 'kin') {
    const K1 = pmC('kin1', { x: 390 }), K2 = pmC('kin2', { x: 280 }), K3 = pmC('kin3', { x: 160 }), F = pmC('friend', { ...pmWalk((tt) => kfn(tt, [[142.3, -180], [142.96, 40]], 'out'), t, 13), dir: 1 });
    const ks = [K1, K2, K3]; ks.forEach((P, i) => { const tg = 142.96 + stagger(i, 0.1); P.mouth = t > tg ? 'smile' : 'closed'; P.lid = 0.15; P.gaze = t > tg + 0.1 ? [-1, 0.05] : [1, 0]; P.brow = t > tg ? -0.4 : 0; P.sq = breathe(t, 5 + i, 0.015); P.seed = 14 + i;
      if (t > tg + 0.1) P.tip = -0.05 * pmB(t, tg + 0.1, 0.3); });
    K2.talk = t > 143.2 ? 0.4 + 0.5 * Math.abs(Math.sin(t * 12)) : 0;
    K3.aR = armTo(1, PM_SH, t > 143.2 ? [64 + 14 * Math.sin(t * 14), -196] : PMH.side);
    F.mouth = 'smile'; F.lid = 0.2; F.gaze = [1, 0.05]; F.seed = 13; const op = pmB(t, 142.8, 0.35);
    F.aR = armTo(1, PM_SH, PEOPLE.lp(PMH.side, PMH.out, op)); F.aL = armTo(-1, PM_SH, PEOPLE.lp(PMH.sideL, [60, -190], op));
    [K3, K2, K1].forEach((P) => person(c, pmFin(t, P))); if (t > 142.3) person(c, pmFin(t, F));
    pmRing(c, ...pmW(K1, [0, -76]), t, 140.76, 50); pmRing(c, ...pmW(K2, [0, -76]), t, 140.96, 50); pmRing(c, ...pmW(K3, [0, -238]), t, 141.16, 50);
  } else if (kind === 'lady') {
    const L = pmC('lady', { x: 400 }), F = pmC('friend', { ...pmWalk((tt) => kfn(tt, [[147.68, 760], [148.2, 500]], 'out'), t, 13), dir: -1 });
    const ear = pmWin(t, 146.0, 147.4, 0.25), kiss = pmB(t, 148.0, 0.3) * (1 - pmB(t, 148.45, 0.2)), pats = [148.5, 148.8].reduce((s, a) => s + pulse(t, a, 0.2), 0);
    L.lid = 0.3; L.mouth = t > 146.16 ? 'smile' : 'closed'; L.seed = 17; L.gaze = t > 147.8 ? [1, -0.2] : [0.2, 0.3]; L.tilt = ear * 0.1;
    F.tip = 0.25 * kiss; F.mouth = 'smile'; F.eyes = t > 148.45 ? 'shut' : 'open'; F.lid = F.eyes === 'shut' ? null : 0.2; F.seed = 13; F.gaze = [-1, 0.2];
    const fc = pmW(F, [-24, -184]);
    L.aR = armTo(1, PM_SH, t < 147.6 ? PEOPLE.lp([30, -110], [44, -206 + 4 * Math.sin(t * 40) * ear], ear) : t < 148.4 ? PEOPLE.lp([30, -110], pmLoc(L, [pmMouth(F)[0] - 4, pmMouth(F)[1] + 6]), pmB(t, 147.7, 0.3)) : pmLoc(L, [fc[0] - 6, fc[1] - 10 * pats]));
    L.aL = armTo(-1, PM_SH, [-6, -112]); F.aR = armTo(1, PM_SH, PMH.side); F.aL = armTo(-1, PM_SH, PMH.sideL);
    if (t > 147.68) person(c, pmFin(t, F)); person(c, pmFin(t, L));
    const bx = t < 147.5 ? pmHandW(L, 'R') : pmHandW(L, 'L'); pmBox(c, bx[0] + 2 * Math.sin(t * 40) * ear, bx[1] + 30, 0.9, 0);
  } else if (kind === 'bags') {
    const gl = 0.75 + 0.15 * Math.sin(t * 3); pmGlow(c, 505, 760, 280, t, gl, { a0: -Math.PI * 0.95, a1: -Math.PI * 0.05 });
    pmBag(c, 455, 782, { s: 0.9, glint: pulse(t, 150.4, 0.5) }); pmBag(c, 640, 782, { s: 0.9, glint: pulse(t, 150.9, 0.5) });
    for (let k = 0; k < 6; k++) pmPurse(c, 505 + k * 17, 790, 0.55, { fill: 1 });
    pmRing(c, 455, 730, t, 150.3, 46); pmRing(c, 640, 730, t, 150.9, 46);
    if (t > 150.3) { const xf = (tt) => kfn(tt, [[150.3, -150], [151.0, 210]], 'out'), F = pmC('friend', { ...pmWalk(xf, t, 13), dir: 1, mouth: 'smile', lid: 0.2, seed: 13, gaze: [1, 0.2] });
      F.aR = armTo(1, PM_SH, t > 153.68 ? PMH.hush : t > 152.3 ? [96, -140] : PMH.side); F.wink = t > 153.75 ? 'R' : undefined; person(c, pmFin(t, F)); const h = pmHandW(F, 'R');
      if (t > 152.4) [[455, 720], [550, 760], [640, 720]].forEach((q, j) => pmDots(c, [h[0] + 14, h[1]], q, pmB(t, 152.4 + j * 0.15, 0.6, 'lin'), { r: 6, gap: 24, bend: 40 })); }
  } else if (kind === 'write') {
    palaceHall(c, pmFriendO({ u: 0.75, t, stools: [742] }));
    const F = pmC('friend', { x: 720, dir: -1, sit: 1, seat: 'bench', seed: 13, lid: 0.45, gaze: [-0.6, 0.8] }), k = ((t - 154.4) * 0.9) % 1, blow = pmWin(t, 156.9, 157.4, 0.1);
    F.mouth = blow > 0.5 ? 'o' : 'closed'; F.tilt = -0.06; F.aR = armTo(1, PM_SH, pmLoc(F, [K.lerp(640, 560, k), 786 - 4 * Math.abs(Math.sin(t * 20))])); F.aL = armTo(-1, PM_SH, pmLoc(F, [650, 790]));
    shape(c, K.rectPts(545, 784, 110, 12), PM_PAPER, { lw: 3, seed: 645 }); person(c, pmFin(t, F)); const h = pmHandW(F, 'R'); seg(c, h[0], h[1], h[0] + 12, h[1] - 34, 4, C.black, 0);
    const m = pmMouth(F); if (blow < 0.5) shape(c, ell(m[0] - 6, m[1] + 3, 5, 4, 10), C.red, { lw: 2, seed: 646 }); else for (let j = 0; j < 3; j++) seg(c, m[0] - 16 - j * 12, m[1] + 6 + j * 6, m[0] - 26 - j * 12, m[1] + 14 + j * 6, 3, C.white, 1.5);
  } else if (kind === 'map') {
    c.fillStyle = '#fff3d6'; c.fillRect(-300, -100, 1600, 1600); c.fillStyle = dotPat(c, '#e2c68a', 14, 0.25); c.fillRect(-300, -100, 1600, 1600);
    const C0 = [500, 720], ends = [[[140, 480], 157.94], [[860, 480], 158.19], [[150, 980], 158.44], [[860, 990], 160.0]];
    ends.forEach(([e, a]) => pmDots(c, C0, e, pmB(t, a, 0.3, 'lin'), { r: 9, gap: 34 }));
    const ip = (a) => pmPop(t, a + 0.25, 0.3);
    [['kin1', -70], ['kin2', 0], ['kin3', 70]].forEach(([n, dx]) => pmMedal(c, 140 + dx, 480, 52, { ...PM_CAST[n], mouth: 'smile' }, { p: ip(157.94) }));
    pmMedal(c, 860, 480, 70, { ...PM_CAST.lady, mouth: 'smile' }, { p: ip(158.19) });
    if (ip(158.44) > 0) { c.save(); c.translate(150, 1000); c.scale(ip(158.44), ip(158.44)); pmBag(c, -60, 0, { s: 0.9 }); pmBag(c, 60, 0, { s: 0.9 }); c.restore(); }
    if (t > 160.2) { const k = pmPop(t, 160.2, 0.3), Mm = pmC('man', { x: 860, y: 1060, s: 0.75 * k, pal: PM_APRON, mouth: 'smile', seed: 11, sq: 1 + 0.04 * pulse(t, 160.5, 0.5), drop: -3 }); shape(c, K.rectPts(770, 1000, 180, 60), BARKY, { lw: 4, seed: 647 }); person(c, Mm); shape(c, K.rectPts(770, 1000, 180, 60), BARKY, { lw: 4, seed: 647 }); }
    pmMedal(c, C0[0], C0[1], 120, { ...PM_FRIENDF, wink: t > 158.5 && t < 158.9 ? 'R' : undefined }, { p: pmPop(t, 157.5, 0.35) });
  } else if (kind === 'grey') {
    palaceHall(c, pmFriendO({ u: 0.3, t }));
    const Mg = pmC('man', { x: 400, dir: 1, seed: 11, drop: 12, tip: 0.12, lid: 0.7, mouth: 'frown' }), Fg = pmC('friend', { x: 640, dir: -1, seed: 13, mouth: 'closed', lid: 0.2 });
    Mg.aR = armTo(1, PM_SH, [84, -118]); Mg.aL = armTo(-1, PM_SH, PMH.sideL); person(c, Mg); person(c, Fg);
    c.save(); c.globalCompositeOperation = 'saturation'; c.fillStyle = '#808080'; c.fillRect(-300, 0, 1600, 1300); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 0.35; c.fillStyle = PM_PAPER; c.fillRect(-300, 0, 1600, 1300); c.restore();
    pmCross(c, 520, 700, 230, pmB(t, 162.8, 0.1, 'lin'), pmB(t, 162.95, 0.1, 'lin'), 28);
  }
  c.restore();
}
