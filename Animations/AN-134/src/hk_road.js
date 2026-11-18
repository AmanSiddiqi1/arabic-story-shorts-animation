// ===== AN-134 road scenes: S1-S3 (the procession, the cup of water, the invitation) and S17 (the ride home, the cup and the chests) =====
// ---------- S1-S3 paths ----------
const hkHX = (t) => (t < 8.6 ? K.lerp(150, 940, t / 8.6) : 940 + 190 * (1 - Math.pow(1 - K.clamp((t - 8.6) / 1.9), 1.5)));   // white horse: steady walk, eased stop at 10.5
const hkVX = (t) => hkHX(t - 0.15) - 230;                                    // the vizier's bay follows a beat behind
const HK_FG = [(t) => kfn(t, [[0, 430], [10.9, 1780]], 'lin'), (t) => kfn(t, [[0, 545], [11.0, 1890]], 'lin')];   // front guards (the second carries the pennant)
const HK_RG = [(t) => hkHX(t - 0.3) - 420, (t) => hkHX(t - 0.45) - 520];     // rear guards (accordion stop a beat late)
const HK_FALLS = [...HK_FG, ...HK_RG].map((f) => hkFalls(f, 0, 11.2, 12));
const HK_HFALLS = footfalls(hkHX, 0, 10.6, GAIT.horse * 0.8);
// the caliph on foot after the dismount (S3)
const hkCalX3 = (t) => kfn(t, [[28.2, 1250], [28.4, 1250], [29.8, 1590], [30.4, 1640]], 'inOut');
const hkMerX3 = (t) => kfn(t, [[21.82, 1232], [22.4, 1380], [28.4, 1380], [29.3, 1570], [29.8, 1630]], 'inOut');
const HK_CALF3 = hkFalls(hkCalX3, 28.3, 30.4, 13);

function hkGuardWalkP(i, xf, t, front, extra = {}) {
  const W = hkWalk(xf, t, 12), P = hkP(HK_GRD[i], W.x, 900, 0.9, 1, { ph: W.ph + i * 0.8, amp: W.amp });
  P.aR = hkArm(t, P, 1, [[0, [44, -112]]]); P.aL = hkArm(t, P, -1, [[0, [-30, -70 + 8 * Math.sin(W.ph)]]]);
  P.gaze = [1, 0]; if (i === 1) P.pennant = Math.sin(t * 5 + 1) * 0.6 + swing(t, 11.0, 1, 1.4, 1.5);
  P.spearRot = 0.03 * Math.sin(W.ph * 2);
  return Object.assign(P, extra);
}
function hkHorseP(t, x, pal, extra = {}) {
  const P = { ...walk(x, t, { stride: GAIT.horse * 0.8 }), y: 900, s: 0.8, dir: 1, pal, seed: 30 + pal };
  P.earL = 0.65 + 0.35 * Math.sin(t * 4.8 + pal); P.earR = 0.65 + 0.35 * Math.sin(t * 4.8 + 2 + pal); P.tailSwish = Math.sin(t * 2.2 + pal * 2);
  return Object.assign(P, extra);
}

// ---------- S1-S3 ----------
function hkRoadA(ctx, t, cam) {
  const camL = cam.x - 500 / cam.zoom; hkRoadBack(ctx, t, camL, 0);
  const HX = hkHX(t), behind = [], front = [];
  // the owner and his two servants behind the wall (S2), the jug stand and jug
  const merOn = t >= 10.66 && t < 21.82;
  let jugTilt = 0, gobMer = null;
  if (t < 21.82) {
    // servants
    const s0 = hkP(HK_SERV[0], 1275, 880, 0.9, 1), s1 = hkP(HK_SERV[1], 1445, 880, 0.9, -1);
    const road = [1130, 640];
    s0.gaze = t < 13.42 ? [0.3, 0.2] : hkG(s0, road); s1.gaze = t < 13.55 ? [-0.4, 0.3] : hkG(s1, road);
    hkArms(t, s0, [[0, [60, -100]], [13.5, { w: [1320, 760] }, 0.2], [14.0, [60, -100], 0.3]], [[0, [-36, -62]]]);
    hkArms(t, s1, [[0, [40, -150]], [15.0, [40, -150]]], [[0, [-36, -62]]]);
    s1.aR = [s1.aR[0] + 0.25 * Math.sin(t * 7) * (t < 14.9 ? 1 : 0), s1.aR[1]];
    const fl = (k) => 6 * hkPulse(t, 16.38 + k * 0.1, 0.3); s0.x -= fl(0); s1.x += fl(1);
    s0.after = (c, P) => { const h = hkHandW(P, 'R'); if (t < 13.5 || t > 14.1) hkTray(c, h[0] + 10, h[1] + 4, 0.55, 'fruit'); };
    s1.after = (c, P) => { const h = hkHandW(P, 'R'); c.save(); c.translate(h[0], h[1]); c.rotate(-0.3 + 0.3 * Math.sin(t * 7) * (t < 14.9 ? 1 : 0)); shape(c, ell(0, -34, 22, 30, 16), C.yellow, { lw: 3.5, seed: 793, dot: HK_ORANGE, pitch: 6, rad: 0.3, da: 0.5 }); seg(c, 0, 0, 0, -10, 4, HK_WOODC, 2); c.restore(); };
    behind.push(s0, s1);
  }
  // jug stand
  const jugA = t < 17.88 ? 0 : t < 18.5 ? 0.9 * hkB(t, 17.88, 0.25) : 0.9 * (1 - hkB(t, 18.35, 0.2));
  let merFront = null;
  if (merOn) {
    const M = hkMerS2(t, HX); if (M.onRoad) merFront = M; else behind.push(M); gobMer = M;
  }
  // the caliph in S3 on foot, and the owner on the road
  let calFoot = null, merRoad = null, vizFoot = null;
  if (t >= 21.82) { merRoad = hkMerS3(t); }
  if (t >= 27.85) calFoot = hkCalS3(t);
  if (t >= 29.55) vizFoot = hkVizS3(t);
  for (const P of [calFoot, merRoad, vizFoot]) if (P && P.inGate) behind.push(P);
  // gate servant at the leaf (S3)
  if (t >= 21.82 && t < 30.62) { const g = hkP(HK_SERV[2], 1660, 878, 0.85, -1, { lean: 0.2 * hkB(t, 23.3, 0.3) * (1 - hkB(t, 24.4, 0.4)) }); g.gaze = hkG(g, [1130, 620]); behind.push(g); }
  behind.forEach((P) => hkDraw(ctx, P));
  if (t < 21.82) { hkStand(ctx, HK_ROAD.stand, 880); hkJug(ctx, HK_ROAD.stand + 6, 820, 0.62, { tilt: -jugA }); }
  if (gobMer && t >= 17.88 && t < 18.5) hkPour(ctx, HK_ROAD.stand + 6, 820, 0.62, -jugA, HK_ROAD.stand - 30, 792, jugA);
  // gate leaf, wall
  const open = t < 18.3 ? 0 : t < 23.06 ? 0.75 * settleTo(t, 18.3, 0, 1, 0.3, 0.08) : settleTo(t, 23.06, 0.75, 1, 0.5, 0.05);   // v2: flung open as the owner runs out (18.3)
  hkGateLeaf(ctx, open); ctx.drawImage(hkRoadWall(), 0, 0, 2200, 920);
  // road actors: rear guards, vizier's bay, the white horse with the caliph, front guards
  for (let i = 0; i < 2; i++) { const xf = HK_RG[i]; if (t < 30.62) front.push(['g', hkGuardWalkP(i + 2, xf, t, false, { gaze: t > 10.8 ? hkG({ ...HK_GRD[0], x: xf(t), y: 900, s: 0.9 }, [1330, 760]) : [1, 0] })]); }
  // vizier on the bay (dismounts at 29.38)
  const VP = hkHorseP(t, hkVX, 1);
  const vz = { costume: 'vizier', s: 0.76, lurch: lurch(t, 10.6, 0.2), seed: 61 };
  vz.lid = Math.max(0.3, hkPulse(t, 5.3, 0.25) > 0.3 ? 1 : 0); vz.mouth = hkIn(t, 5.15, 5.6) ? 'o' : 'closed';
  vz.gaze = t < 4.78 ? [1, 0] : t < 7.62 ? [Math.sin((t - 4.78) * 2.2), 0.1] : t < 23.8 ? [1, -0.3] : [1, -0.1];
  if (hkIn(t, 4.78, 6.6)) vz.handR = [16, -160 + 6 * Math.sin(t * 9)];
  if (hkIn(t, 24.3, 25.0)) { vz.handL = [-60, -110]; vz.handR = [60, -110]; vz.drop = 4 * hkPulse(t, 24.6, 0.3); }
  front.push(['h', () => { if (t < 29.55) rideOn(ctx, 'horse', VP, vz); else horse(ctx, VP); }]);
  // the white horse and the caliph
  const HP = hkHorseP(t, hkHX, 0, { snort: hkPulse(t, 3.2, 0.5) + hkPulse(t, 21.3, 0.5), headDown: 0.25 * hkPulse(t, 27.28, 0.45) });
  if (t > 10.5) { HP.amp = Math.min(HP.amp, 1); }
  const ps = 0.76, cal = hkCalRider(t, HP, ps);
  front.push(['h', () => { if (t < 27.85) { rideOn(ctx, 'horse', HP, cal); if (cal.__gob) { const h = hkHandW(hkRiderP(HP, ps, { aR: cal.aR, aL: cal.aL }), 'R'); hkGoblet(ctx, h[0], h[1] + 9, 0.6, cal.__gob); } } else horse(ctx, HP); }]);
  for (let i = 0; i < 2; i++) if (t < 30.62) { const G = hkGuardWalkP(i, HK_FG[i], t, true); if (i === 0 && t > 29.4) Object.assign(G, hkGateGuard(t)); front.push(['g', G]); }
  for (const P of [calFoot, merRoad, vizFoot, merFront]) if (P && !P.inGate) front.push(['p', P]);
  for (const [k, v] of front) { if (k === 'h') v(); else hkDraw(ctx, v); }
  // dust on footfalls
  HK_FALLS.forEach((L, i) => L.forEach((f) => dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 9, 20, 0.45, 100 + i * 37 + Math.round(f.t * 10))));
  HK_HFALLS.forEach((f) => dustBurst(ctx, f.x + 40, 898, t - f.t, 3, 5, 11, 26, 0.5, 300 + Math.round(f.t * 10)));
  HK_CALF3.forEach((f) => dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 8, 18, 0.4, 400 + Math.round(f.t * 10)));
  if (t > 28.2 && t < 28.8) dustBurst(ctx, 1250, 898, t - 28.2, 6, 6, 14, 40, 0.55, 451);
  // songbirds and fruit glints (S1)
  for (let i = 0; i < 2; i++) { const u = (t - 7.54 - i * 0.18) / 1.6; if (u > 0 && u < 1) songbird(ctx, { x: 1200 - 40 + i * 50 - 380 * u, y: 470 - 260 * u + 30 * Math.sin(u * 9), s: 0.8, fly: true, flap: t * 30 + i, col: i ? C.yellow : C.red, dir: -1 }); }
  [[1135, 465, 7.6], [1250, 500, 7.9], [1420, 450, 8.2]].forEach(([x, y, a]) => { const k = hkPulse(t, a, 0.45); if (k > 0) star(ctx, x, y, 18 * k, C.white, t * 3); });
  // S2: the picture balloon (a cup with a drop) and AHH!
  const rh = hkHead(hkRiderP(HP, ps));
  if (hkIn(t, 15.66, 16.9)) hkBalloon(ctx, rh[0] - 150, rh[1] - 120, 150, 120, [rh[0] - 40, rh[1] - 30], hkB(t, 15.66, 0.25) * (1 - hkB(t, 16.7, 0.2)), (c) => { hkGoblet(c, 0, 40, 0.9, { fill: 1 }); drops(c, 26, -34, t, 1); });
  if (hkIn(t, 20.7, 21.82)) sfx(ctx, 'AHH!', rh[0] - 120, rh[1] - 70, 64, hkPop(t, 20.75, 0.3), { fill: C.yellow, rot: -0.1 });
  if (hkIn(t, 20.8, 21.4)) star(ctx, rh[0] + 4, rh[1] - 6, 14 * hkPulse(t, 20.8, 0.5), C.white, t * 4);
  // the guard's spear stopped by the arch (S3)
  if (hkIn(t, 29.9, 30.2)) star(ctx, 1600, 650, 22 * hkPulse(t, 29.9, 0.3), C.yellow, t * 5);
}
// the owner in S2: seated, springs up, runs to the jug, pours, then (v2, review note 3) runs out through the gate and along the road to stand
// in front of the horse's head, reaching the cup up on tiptoe; the caliph leans down to take it (19.3); he takes it back at 21.5
const HK_MX2 = [[16.82, 1355], [17.8, 1438], [18.4, 1438], [18.72, 1590], [19.12, 1232]];
const hkMerX2 = (t) => kfn(t, HK_MX2, 'inOut');
const hkMerY2 = (t) => K.lerp(880, 900, hkB(t, 18.66, 0.16));
function hkMerS2(t, HX) {
  const x = hkMerX2(t), y = hkMerY2(t), onRoad = t >= 18.76;
  const P = hkP(HK_MER, x, y, 1, t < 18.7 ? 1 : -1, { seed: 71, onRoad });
  const run = hkIn(t, 16.82, 17.8) || hkIn(t, 18.4, 19.12);
  if (run) { const W = hkWalk(hkMerX2, t, 10); P.ph = W.ph; P.amp = Math.min(1.2, W.amp * 1.2); P.tip = 0.12 * Math.sign(P.dir); }
  P.sit = t < 16.28 ? 1 : 1 - hkB(t, 16.28, 0.3); P.seat = 'bench'; P.sq = anticipate(t, 16.18, 0.1, 0.08) * (t > 19.0 && t < 19.7 ? K.lerp(1, 1.06, hkB(t, 19.0, 0.2)) * (1 - 0.06 * hkB(t, 19.45, 0.25)) + 0.06 * hkB(t, 19.45, 0.25) * 0 : 1);
  if (t > 19.0 && t < 19.7) P.y -= 8 * hkB(t, 19.0, 0.15) * (1 - hkB(t, 19.45, 0.25));   // tiptoe
  if (t < 16.28) P.sq *= (t > 12.08 && t < 13.3 ? 1 - 0.02 * hkPulse(t, 12.6, 0.7) : breathe(t, 3));
  P.gaze = t < 14.9 ? [0.2, 0.6] : t < 16.82 ? hkG(P, [1130, 600]) : t < 18.4 ? hkG(P, [1470, 800]) : t < 18.85 ? [P.dir, 0] : t < 20.7 ? hkG(P, [1170, 640]) : hkG(P, [1150, 650]);
  P.lid = t < 14.9 ? Math.max(0.45, hkIn(t, 12.6, 12.9) ? 1 : 0) : undefined;
  P.mouth = t < 14.9 ? 'smile' : t < 16.82 ? 'o' : t < 20.7 ? 'closed' : 'smile'; P.brow = hkIn(t, 14.9, 16.82) ? -0.6 : hkIn(t, 19.66, 20.7) ? -0.4 : 0.1; P.noBlink = hkIn(t, 14.9, 15.5);
  hkArms(t, P, [[0, [40, -150]], [12.08, [8, -168], 0.3], [13.3, [40, -150], 0.3], [16.28, [60, -110], 0.2], [17.8, { w: [1478, 770] }, 0.2], [18.4, [60, -110], 0.15], [19.0, { w: [1222, 682] }, 0.2], [19.4, [30, -150], 0.3], [19.66, [30, -134], 0.3], [21.2, { w: [1212, 704] }, 0.3]],
    [[0, [-60, -100]], [16.28, [-60, -110], 0.2], [17.8, { w: [1440, 800] }, 0.2], [18.4, [60, -120], 0.15], [19.0, { w: [1232, 690] }, 0.2], [19.4, [-24, -140], 0.3], [21.2, [-60, -110], 0.3]]);
  if (t < 14.9 || hkIn(t, 13.3, 14.9)) P.aR = [P.aR[0] + (t < 14.9 ? 0.25 * Math.sin(t * 5) : 0), P.aR[1]];   // fanning himself
  // the goblet: his own sip (12.08), the poured cup (17.88), up to the rider (19.3), back to him (21.5)
  if (t < 16.28) P.gob = { side: 'R', fill: 0.6, tilt: hkIn(t, 12.08, 13.3) ? 0.6 * hkPulse(t, 12.08, 1.2) : 0 };
  else if (t >= 17.88 && t < 19.3) P.gob = { side: 'L', fill: t < 17.95 ? 0 : hkB(t, 17.95, 0.4, 'lin') };
  else if (t >= 21.5) P.gob = { side: 'R', fill: 0, glint: hkPulse(t, 21.55, 0.4) };
  P.talk = 0; return P;
}
function hkCalRider(t, HP, ps) {
  const R = hkRiderP(HP, ps, { seed: 81 });
  const P = { costume: 'caliph', s: ps, lurch: lurch(t, 10.5, 0.18) + (t > 18.6 && t < 20 ? 0.16 * hkB(t, 18.6, 0.4) * (1 - hkB(t, 19.45, 0.4)) : 0) + (t > 20.95 && t < 21.9 ? 0.12 * hkPulse(t, 20.95, 0.9) : 0), seed: 81 };
  P.lid = t < 7.54 ? Math.max(0.25, hkIn(t, 2.4, 2.75) ? 1 : 0) : undefined; if (hkIn(t, 19.66, 20.6)) P.lid = 1;
  P.gaze = t < 6.62 ? [1, 0] : t < 10.66 ? lookAt(hkHead(R), [1200, 480]) : t < 23.8 ? lookAt(hkHead(R), t < 19.6 ? [1290, 760] : [1300, 760]) : hkGP(t, R, [[23.8, [1590, 700]], [24.3, [880, 600]], [24.9, [1380, 680]]], 0.12);
  P.brow = hkIn(t, 6.62, 7.54) ? -0.3 : hkIn(t, 14.18, 15.6) ? -0.2 : 0; P.mouth = t > 7.54 && t < 14.18 ? 'smile' : t > 20.7 ? 'smile' : 'closed';
  P.talk = hkIn(t, 14.18, 15.6) ? 0.4 + 0.5 * Math.abs(Math.sin(t * 11)) : 0; P.drop = 6 * hkPulse(t, 27.18, 0.45);
  if (t > 10.66 && t < 12.0) P.tilt = 0.06;
  const reinsR = [52, -118], reinsL = [34, -122];
  P.aR = hkArm(t, R, 1, [[0, reinsR], [14.18, HKH.wave, 0.25], [14.7, [10, -170], 0.25], [15.7, reinsR, 0.3], [18.7, { w: [1222, 688] }, 0.5], [19.4, [12, -168], 0.3], [20.7, [50, -130], 0.3], [21.15, { w: [1212, 704] }, 0.3], [21.6, reinsR, 0.3], [23.8, [16, -160], 0.3], [25.2, reinsR, 0.3]]);
  P.aL = hkArm(t, R, -1, [[0, hkMir(reinsL)]]);
  if (hkIn(t, 14.7, 15.6)) P.aR = [P.aR[0], P.aR[1] + 0.25 * Math.sin((t - 14.7) * 9)];
  const hold = t >= 19.3 && t < 21.5; const hd = hold ? { fill: t < 19.66 ? 1 : 1 - hkB(t, 19.66, 0.9, 'lin'), tilt: hkIn(t, 19.66, 20.6) ? -1.1 * hkPulse(t, 19.66, 1.0) : 0, glint: hkPulse(t, 20.7, 0.4) } : null;
  P.__gob = hd; return P;
}
// S3 on foot
function hkMerS3(t) {
  const x = hkMerX3(t), W = hkWalk(hkMerX3, t, 10), inG = x > 1520;
  const P = hkP(HK_MER, x, inG ? K.lerp(900, 870, K.clamp((x - 1520) / 100)) : 900, inG ? 0.95 : 1, -1, { ph: W.ph, amp: W.amp, seed: 71, inGate: inG });
  P.alpha = 1 - hkB(t, 29.5, 0.3);
  P.lean = 0.3 * hkB(t, 21.95, 0.25) * (1 - hkB(t, 22.4, 0.25)) + (t > 28.4 ? 0.12 : 0); P.sq = anticipate(t, 21.82, 0.12, 0.04);
  if (hkIn(t, 22.2, 22.45)) P.lid = 1;
  P.gaze = t < 28.4 ? hkG(P, [1130, 610]) : hkG(P, [hkCalX3(t), 700]); P.brow = hkIn(t, 22.5, 23.7) ? -0.4 : 0; P.mouth = 'smile';
  P.talk = hkIn(t, 22.5, 23.7) || hkIn(t, 25.24, 25.8) ? 0.4 + 0.5 * Math.abs(Math.sin(t * 10)) : 0;
  const pat = (k) => 18 * Math.max(hkPulse(t, 25.24, 0.25), hkPulse(t, 25.5, 0.25)) * k;
  hkArms(t, P, [[0, [36, -62]], [21.82, HKH.chest, 0.2], [22.5, [36, -62], 0.3], [25.2, [62, -110], 0.15], [25.86, [26, -176], 0.25], [27.1, [36, -62], 0.3], [28.4, [90, -110], 0.3]],
    [[0, [-36, -62]], [22.5, [-100, -150], 0.35], [23.7, [-36, -62], 0.3], [25.2, [-62, -110], 0.15], [25.86, [-18, -182], 0.25], [27.1, [-36, -62], 0.3]]);
  if (hkIn(t, 25.24, 25.8)) { P.aR = [P.aR[0], P.aR[1] + pat(0.012)]; P.aL = [P.aL[0], P.aL[1] - pat(0.012)]; P.sq = 1 - pat(0.0017); }
  if (hkIn(t, 25.86, 27.1)) { P.tilt = 0.14 * hkB(t, 25.86, 0.3); P.lid = t < 26.6 ? 1 : undefined; if (t >= 26.6) { P.wink = 'R'; P.lid = undefined; P.gaze = [-0.5, -0.8]; } }
  return P;
}
function hkCalS3(t) {
  // dismount: hop from the saddle (1150, 700) down to the road at 1250 (land 28.2), then walk to the gate and in
  let x = hkCalX3(t), y = 900, s = 1;
  if (t < 28.2) { const u = K.clamp((t - 27.85) / 0.35); x = K.lerp(1150, 1250, u); y = K.lerp(830, 900, u * u) - 40 * Math.sin(Math.PI * u); }
  const inG = x > 1520; if (inG) { y = K.lerp(900, 870, K.clamp((x - 1520) / 100)); s = K.lerp(1, 0.9, K.clamp((x - 1520) / 100)); }
  const W = hkWalk(hkCalX3, t, 13), P = hkP(HK_CAL, x, y, s, 1, { ph: t > 28.3 ? W.ph : 0, amp: t > 28.3 ? W.amp : 0, seed: 81, inGate: inG });
  P.sq = landSquash(t, 28.2, 0.14); P.alpha = 1 - hkB(t, 30.05, 0.4); P.mouth = 'smile'; P.gaze = hkG(P, [1700, 760]);
  hkArms(t, P, [[0, [60, -150]], [28.2, [40, -70], 0.3]], [[0, [-60, -150]], [28.2, [-40, -70], 0.3]]); return P;
}
function hkVizS3(t) {
  const xf = (tt) => kfn(tt, [[29.85, 1000], [30.62, 1300]], 'in');
  let x = xf(t), y = 900; if (t < 29.85) { const u = K.clamp((t - 29.55) / 0.3); x = K.lerp(940, 1000, u); y = K.lerp(830, 900, u * u) - 30 * Math.sin(Math.PI * u); }
  const W = hkWalk(xf, t, 13), P = hkP(HK_VIZ, x, y, 1, 1, { ph: W.ph, amp: W.amp, seed: 61, sq: landSquash(t, 29.85, 0.12), gaze: [1, 0] }); return P;
}
// the guard whose spear will not go under the arch (29.4-30.6): walks left into the gate, stops, tips the spear, goes on
function hkGateGuard(t) { const xf = (tt) => kfn(tt, [[29.4, 1780], [29.9, 1640], [30.15, 1640], [30.62, 1560]], 'inOut'), W = hkWalk(xf, t, 12);
  return { x: xf(t), dir: -1, ph: W.ph, amp: W.amp, spearRot: t < 29.9 ? 0 : -0.7 * hkB(t, 30.0, 0.15), mouth: hkIn(t, 29.9, 30.1) ? 'o' : 'closed', tip: -0.05 * hkPulse(t, 29.9, 0.2), gaze: [-0.3, -1] }; }

// ---------- shared road back layers ----------
function hkRoadBack(ctx, t, camL, warm) {
  ctx.fillStyle = C.blue; ctx.fillRect(-1500, -800, 5200, 1000);
  ctx.drawImage(hkRoadFar(), camL * 0.7 - 300, -20, 3000, 920);
  if (warm > 0.01) { ctx.save(); ctx.globalAlpha = 0.2 * warm; ctx.fillStyle = '#ffc04a'; ctx.fillRect(-1500, -800, 5200, 1700); ctx.restore(); }
  ctx.drawImage(hkRoadMid(), 0, 0, 2200, 1230);
  ctx.fillStyle = SANDL; ctx.fillRect(-1500, 896, 1500, 340); ctx.fillRect(2200, 896, 1500, 340);
}

// ---------- S17: the ride home ----------
const hkHX17 = (t) => kfn(t, [[163.44, 1360], [166.3, 300]], 'in');
const hkCalX17 = (t) => kfn(t, [[161.66, 1590], [162.15, 1420]], 'inOut');
function hkRoadEnd(ctx, t, cam) {
  const camL = cam.x - 500 / cam.zoom, warm = hkB(t, 163.4, 2.5);
  hkRoadBack(ctx, t, camL, 0.35 + 0.65 * warm);
  // far city with the palace on the left horizon (parallax with the hills)
  ctx.save(); const fx = camL * 0.7 + 180; townFarCity(ctx, fx, 870, 1.3, '#c98a3a'); shape(ctx, ell(fx + 10, 760, 46, 46, 20).filter(([, y]) => y <= 761), '#e8a04a', { lw: 4, seed: 800 }); ctx.restore();
  // owner's people behind the wall
  const peep = [hkP(HK_SERV[0], 1460, 880, 0.85, 1), hkP(HK_SERV[1], 1730, 880, 0.85, -1)];
  peep.forEach((P, i) => { P.gaze = hkG(P, [hkHX17(t), 700]); P.mouth = 'smile'; P.clipL = i ? 1700 : undefined; P.clipR = i ? undefined : 1500; P.alpha = hkB(t, 165.3 + i * 0.2, 0.3); });
  peep.forEach((P) => hkDraw(ctx, P));
  hkGateLeaf(ctx, 1); ctx.drawImage(hkRoadWall(), 0, 0, 2200, 920);
  // the four chests on the road with their glow
  const glow = t < 169.44 ? 0.45 : K.lerp(0.5, 0.9, hkPulse(t, 169.44, 1.1)) + (t > 170.0 ? 0.15 : 0);
  hkGlow(ctx, 1880, 860, 360, t, glow * 0.7);
  [1700, 1820, 1940, 2060].forEach((x, i) => hkChest(ctx, x, 905, 0.9, { lid: 1, fill: 1, sq: 1 - 0.04 * hkPulse(t, 169.44 + i * 0.1, 0.3) }));
  // procession: vizier and guards ahead (to the left), then the caliph
  const HX = hkHX17(t), on = t >= 162.4;
  const dirH = t < 163.0 ? 1 : -1;
  const HP = { ...(t < 163.44 ? { x: 1360, ph: 0, amp: 0 } : walk(hkHX17, t, { stride: GAIT.horse * 0.8 })), y: 900, s: 0.8, dir: dirH, pal: 0, seed: 30, rear: 0.3 * hkPulse(t, 162.62, 0.8), sq: t > 162.85 && t < 163.15 ? 0.9 : 1,
    earL: 0.8, earR: 0.6 + 0.4 * Math.sin(t * 5), tailSwish: Math.sin(t * 2.4) };
  if (t < 163.44) HP.x = 1360 - 20 * hkB(t, 162.3, 0.3);   // sidestep under the mount
  const VP = { ...walk((tt) => hkHX17(tt) - 260, t, { stride: GAIT.horse * 0.8 }), y: 900, s: 0.8, dir: -1, pal: 1, seed: 31, tailSwish: Math.sin(t * 2.4 + 1) };
  if (t < 163.44) VP.x = 1100;
  const items = [];
  items.push(() => rideOn(ctx, 'horse', VP, { costume: 'vizier', s: 0.76, seed: 61, mouth: 'smile', gaze: [-1, 0] }));
  for (let i = 0; i < 2; i++) { const xf = (tt) => (tt < 163.44 ? 960 - i * 90 : hkHX17(tt) - 420 - i * 100), W = hkWalk(xf, t, 12), G = hkP(HK_GRD[i], W.x, 900, 0.9, -1, { ph: W.ph, amp: W.amp, gaze: [-1, 0] });
    G.aR = hkArm(t, G, 1, [[0, [44, -112]]]); if (i === 1) G.pennant = Math.sin(t * 5) * 0.6; items.push(() => hkDraw(ctx, G)); }
  if (on) { const cp = { costume: 'caliph', s: 0.76, seed: 81, mouth: 'smile', gaze: t > 164.5 && t < 165.3 ? [1, -0.1] : [-1, 0], tilt: t > 164.5 && t < 165.3 ? -0.08 : 0 };
    if (hkIn(t, 164.5, 165.3)) cp.aR = hkArm(t, hkRiderP(HP, 0.76), 1, [[164.5, HKH.wave, 0.2]]), cp.aR = [cp.aR[0] + 0.3 * Math.sin(t * 12), cp.aR[1]];
    const bobUp = t < 162.6 ? 30 * (1 - hkB(t, 162.4, 0.2)) : 0; cp.bob = bobUp;
    items.push(() => rideOn(ctx, 'horse', HP, cp));
  } else { items.push(() => horse(ctx, HP));
    const xf = hkCalX17, W = hkWalk(xf, t, 13); let x = xf(t), y = 900; if (t > 162.18) { const u = K.clamp((t - 162.18) / 0.22); x = K.lerp(1420, 1380, u); y = 900 - 120 * K.ease.out(u); }
    const C1 = hkP(HK_CAL, x, y, 1, -1, { ph: W.ph, amp: W.amp, seed: 81, sq: anticipate(t, 162.05, 0.13, 0.08), mouth: 'smile', gaze: t < 161.9 ? [1, -0.2] : [-1, 0] }); items.push(() => hkDraw(ctx, C1)); }
  items.forEach((f) => f());
  // the owner at the gate with the goblet; the boy hops for joy
  const M = hkMerS17(t); hkDraw(ctx, M);
  const by = hkP(HK_BOY, 1475, 900 - 26 * Math.abs(Math.sin((t - 170.6) * 7)) * (t > 170.6 && t < 172.0 ? 1 : 0), 1, -1, { mouth: 'smile', gaze: [1, -0.4] }); hkDraw(ctx, by);
  // the last drop from the rim
  const gp = hkHandW(M, 'L'); if (hkIn(t, 167.3, 168.3)) { const y = fallY(t, 167.3, 167.75, gp[1] - 30, 900); if (t < 167.75) shape(ctx, [[gp[0] + 18, y - 10], [gp[0] + 24, y + 4], [gp[0] + 12, y + 4], [gp[0] + 18, y - 10]], TEAR, { lw: 2.5, seed: 801 }); else ripple(ctx, gp[0] + 18, 902, 167.75, t, 0.4); }
  if (hkIn(t, 167.02, 167.7)) star(ctx, gp[0] + 14, gp[1] - 40, 22 * hkPulse(t, 167.02, 0.6), C.white, t * 3);
  // dust behind the procession
  if (t > 163.44) for (let i = 0; i < 6; i++) { const ft = 163.5 + i * 0.4; dustBurst(ctx, hkHX17(ft) + 60, 898, t - ft, 4, 6, 14, 36, 0.7, 500 + i); }
  // birds settle back in the trees at the end
  for (let i = 0; i < 2; i++) { const u = K.clamp((t - 172.3 - i * 0.25) / 1.2); if (t > 172.3) songbird(ctx, { x: K.lerp(1300 + i * 300, 1780 + i * 180, u), y: K.lerp(300, 470 - i * 20, u) - 30 * Math.sin(Math.PI * u), s: 0.8, fly: u < 1, flap: t * 30 + i, col: i ? C.yellow : C.red, dir: 1 }); }
  if (t > 173.3) for (let i = 0; i < 3; i++) hkLeaf(ctx, t, 173.3 + i * 0.9, [1420 + i * 330, 480], [1380 + i * 330, 880], 2.0);
}
// v2 (review note 2): on سببًا (168.24) he turns to the chests and holds the cup out toward them (so the moral arrow runs goblet -> chests and
// crosses no face); on يتوقعها (170.54) both palms up, brows up, eyes to camera, held without a blink to 172.4
function hkMerS17(t) {
  const tf = turnFlip(t, [[0, -1], [168.24, 1]], 0.35);
  const P = hkP(HK_MER, 1590, 900, 1, tf.dir, { seed: 71 }); P.sq = breathe(t, 2) * (1 - 0.04 * tf.sink);
  P.mouth = 'smile'; P.brow = t > 170.54 && t < 172.6 ? -0.7 : 0;
  P.gaze = t < 166.38 ? hkG(P, [hkHX17(t), 650]) : t < 168.24 ? hkG(P, [1560, 860]) : t < 169.44 ? hkG(P, [K.lerp(1700, 1900, hkB(t, 168.4, 1.0)), 800]) : t < 170.54 ? hkG(P, [1880, 820]) : t < 172.4 ? [0, 0.05] : hkG(P, [1000, 600]);
  if (hkIn(t, 170.54, 172.4)) P.noBlink = true;
  P.drop = 6 * hkB(t, 166.38, 0.3) * (1 - hkB(t, 168.3, 0.3));
  const wave = hkIn(t, 165.3, 166.38);
  hkArms(t, P, [[0, [36, -62]], [165.3, HKH.wave, 0.25], [166.38, [36, -62], 0.3], [170.54, [-96, -138], 0.25], [172.4, [36, -62], 0.4]],
    [[0, [-40, -110]], [166.38, [-30, -120], 0.3], [168.4, [-96, -122], 0.35], [170.54, [-96, -138], 0.25], [172.4, [-40, -110], 0.4]]);
  if (wave) P.aR = [P.aR[0] + 0.3 * Math.sin(t * 11), P.aR[1]];
  if (t > 170.54 && t < 172.4) { P.sq *= 1 + 0.03 * hkPulse(t, 170.6, 0.4); P.drop = -4 * hkB(t, 170.54, 0.2); }
  P.gob = { side: 'L', fill: 0, glint: hkPulse(t, 167.02, 0.6) };
  return P;
}
