// ===== AN-124 main: the road (S1), the camp (S2-S16), effects, camera, lettering, sound =====
const MT_CARD = [8.6, 9.6];                           // YEARS LATER card; the set changes under it at 9.1
const mtUAt = (t) => (t < 6.9 ? 0.75 : t < 8.8 ? mtTr(t, [[0, 0.75], [6.9, 2.75, 1.9]]) % 1 : t < 21.54 ? 0.25 : t < 30.1 ? 0.27 : t < 43.5 ? mtTr(t, [[0, 0.06], [30.1, 0.12, 13]]) : t < 54.9 ? 0.3 : t < 56.0 ? mtTr(t, [[0, 0.45], [55.0, 0.72, 1.0]]) : 0.72);

// ---------- S1: the road at night ----------
const MT_RCX = (t) => kfn(t, [[0, 0], [3.0, 0], [5.0, 760]]);
const MT_RX = (t) => (t < 5.0 ? kfn(t, [[0, 330], [3.4, 720], [5.0, 1250]], 'lin') : 1250 + 270 * K.ease.out(K.clamp((t - 5.0) / 1.9)));
function mtRoad(ctx, t, camX) {
  const u = mtUAt(t), d = dayCycle(u);
  ctx.save(); ctx.translate(camX, 0); skyCycle(ctx, u, { w: 1000, t, hills: false, moonR: 70 }); ctx.restore();
  const A = desertRoad(ctx, { w: 2400, sky: false, sun: false, night: 0, city: 'left', palms: [900, 1600], rocks: [1180, 1950], milestones: [], camX });   // v2: no milestone (it read as a headstone)
  mtDimGrad(ctx, 0, 420, 2400, 1240, d.night);   // v2: soft-edged night dim (no hard band)
  // the king on the wall top above the gate
  if (t > 2.45 && t < 5.4) { const k = mtB(t, 2.45, 0.25), K0 = { x: 420, y: 524 + 30 * (1 - k), s: 0.5, costume: 'caliph', dir: 1, seed: 3, alpha: k, brow: 0.9, mouth: 'open' };
    const snap = t > 2.62 ? settleTo(t, 2.62, 0, 1, 0.3, 0.15) : 0; K0.sq = anticipate(t, 2.42, 0.2, 0.06); K0.tip = 0.1 * snap; K0.handR = [K.lerp(36, 100, snap), K.lerp(-62, -160, snap)]; K0.handL = [-30, -120];
    K0.gaze = lookAt(mtHead(K0), [MT_RX(t), 700]); person(ctx, K0);
    shape(ctx, K.rectPts(340, 524, 180, 22), '#c98a3a', { lw: 5, seed: 820, dot: '#7a4212', pitch: 9, rad: 0.18, da: 0.4 }); }   // parapet in front of his feet
  // the camel and the poet
  const s = t < 5.0 ? 0.62 : K.lerp(0.62, 0.2, mtB(t, 5.0, 1.9)), y = t < 5.0 ? 900 : K.lerp(900, 790, mtB(t, 5.0, 1.9));
  if (t < 7.0) {
    const xf = MT_RX, Cm = { x: xf(t), y, s, dir: 1, pal: 0, saddle: true, seed: 101, ...mtWalk(xf, t, GAIT.camel * s) }; Cm.y = y; Cm.neck = t < 5 ? 0.6 : 0.1; Cm.ears = t < 5 ? -1 : 0; Cm.eyes = t < 5 ? 'wide' : 'open';
    if (t > 5) Cm.amp = Math.min(Cm.amp, 0.5);
    const look = t < 2.2 || mtIn(t, 5.9, 6.3);
    const R = { costume: 'bedouin', age: 0, seed: 21, lurch: 0.06 * Math.sin(Cm.ph * 2), gaze: look ? [-1, -0.1] : [1, 0], brow: t < 4.5 ? -0.5 : 0, mouth: t < 4.5 ? 'o' : 'closed', handL: [-4, -122], handR: [52, -118], look: look ? -1 : 0, lean: t < 5 ? 0.25 : 0.05 };
    ctx.save(); if (t > 6.2) ctx.globalAlpha = 1 - mtB(t, 6.2, 0.8); rideOn(ctx, 'camel', Cm, R); ctx.restore();
    if (t < 5) { const h = mtW({ ...R, x: Cm.x, y: Cm.y, s, dir: 1, sit: 1, seat: 'bench' }, [-4, -122]); }
    for (const f of mtFalls(xf, 0, Math.min(t, 5.0), GAIT.camel * 0.62).slice(-4)) dustBurst(ctx, f.x - 60, 900, t - f.t, 4, 6, 14, 30, 0.45, Math.round(f.t * 10));
    // footprints on the dune fade after he is gone
  }
  if (mtIn(t, 5.0, 8.8)) { ctx.save(); ctx.globalAlpha = 0.6 * (1 - mtB(t, 7.6, 1.2)); ctx.fillStyle = '#a8741a'; for (let k = 0; k < 9; k++) { const x = 1250 + k * 30, yy = K.lerp(900, 800, k / 9); if (MT_RX(t) > x + 10) { ctx.beginPath(); ctx.ellipse(x, yy + 4, 5, 2.4, 0, 0, 7); ctx.fill(); } } ctx.restore(); }
  // the thought he takes with him: Umaymah's face
  if (mtIn(t, 6.2, 7.2)) { const hx = MT_RX(t), hy = 790 - 120 * s / 0.62; const p = mtB(t, 6.25, 0.45, 'lin') * (1 - mtB(t, 6.95, 0.2));
    thoughtCloud(ctx, hx + 40, hy - 150, 170, 140, t, { p, tail: [hx + 4, hy], seed: 6, lw: 7, inside: (c) => portraitMedallion(c, 500, 700, 150, { costume: 'lady', mouth: 'smile' }), scale: 0.36, at: [500, 700] }); }
  desertRoad(ctx, { w: 2400, front: true, lip: null });
  return A;
}

// v2 S2: the passing horseman rides the far dune right of the tent, slowly: enters 13.22, passes 14.24, gone behind the tent by 15.6
const MT_HORSE_X = (t) => K.lerp(1330, 990, K.clamp((t - 13.1) / 2.6));

// ---------- camp: props attached to people ----------
function mtDrawUma(ctx, t, P) {
  person(ctx, P);
  const sc = P.scroll; if (sc) {
    const hL = mtW(P, P.handL || [-36, -62]), hR = mtW(P, P.handR || [36, -62]);
    if (mtIn(t, 27.6, 30.1)) mtScroll(ctx, hL[0] + 4, hL[1] - 6, 0.95, { open: 1, rot: 0.3 });
    else if (sc.side === 'lap' || sc.side === 'hands' || sc.side === 'chest') { const m = [(hL[0] + hR[0]) / 2, (hL[1] + hR[1]) / 2 + (sc.slip || 0) * 30]; mtScroll(ctx, m[0], m[1] - 4, 0.95, { open: sc.open ?? 1, rot: (sc.slip || 0) * 0.5, glint: mtIn(t, 22.5, 23.3) ? (t - 22.5) / 0.8 : null }); }
    else if (sc.side === 'handL') mtScroll(ctx, hL[0], hL[1] - 2, 0.8, { open: 0, rot: 1.2 });
    else if (sc.side === 'sash') { const p = mtW(P, [24, -96]); mtScroll(ctx, p[0], p[1] - 4, 0.7, { open: 0, rot: -1.1 }); }
  }
  // the flower: in her hand, then in her head band
  if (t >= 157.9 && t < 158.9) { const h = mtW(P, P.handR); mtFlower(ctx, h[0], h[1] - 6, 9); }
  if (t >= 158.9) { const h = mtHead(P); mtFlower(ctx, h[0] - 30 * mtS(P), h[1] - 28 * mtS(P), 8, -0.4); }
  // tears
  const eye = () => { const h = mtHead(P); return [h[0] + 10 * mtS(P), h[1] + 2]; };
  if (mtIn(t, 20.6, 21.6)) teardrops(ctx, t, 20.7, 20.75, eye(), { groundY: eye()[1] + 60, vx: 6 });
  if (mtIn(t, 98.6, 99.8)) teardrops(ctx, t, 98.7, 98.75, eye(), { groundY: eye()[1] + 60, vx: 6 });
  if (mtIn(t, 117.0, 118.2)) teardrops(ctx, t, 117.1, 117.15, eye(), { groundY: eye()[1] + 110, vx: 4 });
}
function mtDrawPoet(ctx, t, P) {
  person(ctx, P); mtFaceCover(ctx, P, P.cover || 0, P.puff || 0);
  if (t >= 145.3 && t < 157.9) { const h = mtW(P, P.handL); mtFlower(ctx, h[0], h[1] - 6, 9); }
}
function mtDrawGroom(ctx, t, P) {
  person(ctx, P);
  if (P.flower === true) { const p = mtW(P, [26, -90]); mtFlower(ctx, p[0], p[1], 8); }
  else if (P.flower === 'hand') { const h = mtW(P, P.handR); mtFlower(ctx, h[0] + 4, h[1] - 8, 9); }
}
function mtDrawFather(ctx, t, P) {
  person(ctx, P); const h = mtW(P, P.handR), dir = P.dir || 1;
  let tip = [h[0] + 10 * dir, 900 - 3 * (P.tap || 0)];
  if (P.stick === 'point') tip = [h[0] - 120, h[1] - 50];
  if (P.stick === 'tally') tip = [566, 664 + 30 * mtB(t, 41.62, 1.1, 'lin') - 8 * (P.tap || 0)];
  const top = [h[0] - (tip[0] - h[0]) * 0.25, h[1] - (tip[1] - h[1]) * 0.25];
  seg(ctx, top[0], top[1], tip[0], tip[1], 9, '#c58a18', 3.5); shape(ctx, ell(h[0], h[1], 10, 10, 12), C.white, { lw: 3, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 });
}
function mtDrawSuitor(ctx, t, P) {
  person(ctx, P); const hL = mtW(P, P.handL), hR = mtW(P, P.handR), m = [(hL[0] + hR[0]) / 2, (hL[1] + hR[1]) / 2];
  if (P.gift.kind === 'necklace') mtNecklace(ctx, m[0], m[1] - 6, 1.1, P.gift.droop || 0);
  else if (P.gift.kind === 'bolt') packLoad(ctx, [{ kind: 'bolt', col: C.red }], m[0], m[1] + 16, 0.55);
}
function mtDrawDrummer(ctx, t, P) {
  person(ctx, P); if ((P.sit || 0) < 0.6) return;
  const c = mtW(P, [34, -66]); drum(ctx, c[0], c[1] + 34, { r: 30, hit: P.hit || 0 });
  for (const v of [P.handL, P.handR]) { const h = mtW(P, v); shape(ctx, ell(h[0], h[1], 11, 11, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); }
}

// ---------- camp: the frame ----------
function mtLamps(t) {   // v2: a real dim to 0.35 on "had seemed sad" (166.74-168.18)
  return [0, 1, 2, 3, 4, 5, 6].map((i) => { const a = 56.06 + i * 0.18; let v = t < a ? 0 : t < a + 0.15 ? 1.4 * mtB(t, a, 0.15) : 1; if (t >= a + 0.15 && t < a + 0.4) v = 1 + 0.4 * (1 - mtB(t, a + 0.15, 0.25));
    if (mtIn(t, 166.74, 168.6)) v *= 1 - 0.65 * (mtB(t, 166.74, 0.12) - mtB(t, 168.18, 0.4)); if (mtIn(t, 163.32, 164.0)) v *= 1 + 0.25 * mtPulse(t, 163.32, 0.6); return v; });
}
function mtCamp(ctx, t, cam) {
  const u = mtUAt(t), b = mtBeat(t), play = mtPlaying(t) && !mtIn(t, 166.74, 167.3);
  const swing0 = swing(t, 149.4, 0.12, 1.3, 1.8), tentDim = mtIn(t, 166.74, 168.6) ? 0.38 * (mtB(t, 166.74, 0.15) - mtB(t, 168.18, 0.4)) : 0, swingAll = t > 164.9 ? 0.05 * Math.sin(t * 2.6) : 0;
  desertCamp(ctx, { u, t, camX: cam.x - 500 / cam.zoom, lamps: mtLamps(t), swing: [0, 1, 2, 3, 4, 5, 6].map((i) => (i === 0 ? swing0 : 0) + swingAll * Math.sin(i + 1)), pulse: play ? Math.max(0, 1 - b * 4) : 0,
    fire: t < 59.48 ? 0 : mtB(t, 59.48, 0.5), slit: t < 59.48 ? 0 : mtB(t, 59.7, 0.5), farLit: t < 59.48 ? 0 : mtB(t, 59.6, 0.6), deco: t < 54.9 ? 0 : 1, tentDim, tally: t < 10.94 ? 6 : 7, tallyHop: [41.62, 42.12, 42.64].reduce((s, a) => s + 2 * mtPulse(t, a, 0.2), 0), tallyGlow: mtIn(t, 154.5, 156.6) ? 0.8 : mtIn(t, 10.94, 11.4) ? 1 - mtB(t, 10.94, 0.46) : 0,
    behind: (c) => { if (mtIn(t, 13.1, 15.8)) { const H = { ...mtWalk(MT_HORSE_X, t, GAIT.horse * 0.45), y: 838, s: 0.45, dir: -1, pal: 1, seed: 111 }; H.gallop = 0.3; rideOn(c, 'horse', H, { costume: 'servant', seed: 113, gaze: [-1, 0] }); }
      mtDustDevil(c, 1320, 818, t, mtIn(t, 37.8, 39.1) ? Math.sin(Math.PI * (t - 37.8) / 1.3) : 0); } });
  // cushions
  if (mtIn(t, 21.54, 30.1)) mtCushion(ctx, 700, C.red, C.yellow);
  if (t >= 54.9) { mtCushion(ctx, t < 137 ? MT_GX(t) : t < 150.32 ? 775 : 760); mtCushion(ctx, 860, C.red, C.yellow); }
  // the fallen scroll on the carpet
  if (t >= 130.86 && t < 150.32) { const fy = t < 131.2 ? fallY(t, 130.86, 131.2, 820, 918) : 918 - rebound(t, 131.2, 8, 0.2); mtScroll(ctx, K.lerp(880, 905, mtB(t, 130.86, 0.4)), fy, 1.0, { open: mtB(t, 131.2, 0.4), rot: t < 131.2 ? 0.6 : 0.05 }); }
  // the cast, by depth
  const items = [], add = (P, f, z = 0) => P && items.push([P.y + z, () => f(ctx, t, P)]);
  add(mtUma(t), mtDrawUma, 0.5);
  add(mtGroom(t), mtDrawGroom, 0.2);
  const pz = t > 46.7 ? -1 : 1;   // v2 S5: the parents stand behind her line (drawn before her) so her face stays clear
  add(mtFather(t), mtDrawFather, pz); add(mtMother(t), (c, tt, P) => person(c, P), pz);
  add(mtSuitor1(t), mtDrawSuitor); add(mtSuitor2(t), mtDrawSuitor, -0.5);
  for (const G of mtGossips(t)) add(G, (c, tt, P) => person(c, P));
  for (const i of [0, 1]) { add(mtDrummer(t, i), mtDrawDrummer); add(mtGuest(t, i), (c, tt, P) => person(c, P), 1); add(mtKid(t, i), (c, tt, P) => person(c, P), 3 - i); }
  const Cm = mtCamelCamp(t);
  if (Cm) items.push([899, () => {
    const rising = t < 69.9, clip = Cm.y > 901;
    ctx.save(); if (clip) { ctx.beginPath(); ctx.rect(0, 0, 1600, 903); ctx.clip(); }
    if (rising) rideOn(ctx, 'camel', Cm, { costume: 'bedouin', age: 0.35, pal: MT_POET_PAL, seed: 21, lurch: lurch(t, 69.1, 0.2) + 0.04 * Math.sin(Cm.ph * 2), lid: mtLid(t, 0.4, 21), gaze: t < 68.2 ? [-1, 0.1] : [-1, -0.1], drop: 6 * Math.max(0, Math.sin(Cm.ph * 2 + 0.6)), handL: [-4, -120], handR: [40, -112] });
    else camel(ctx, Cm);
    ctx.restore(); }]);
  add(mtPoet(t), mtDrawPoet, 0.8);
  const ball = mtBall(t); if (ball) items.push([905, () => shape(ctx, ell(ball[0], ball[1], 11, 11, 14), C.red, { lw: 3.5, seed: 830, dot: C.yellow, pitch: 6, rad: 0.25 })]);
  // v2 S8: the guests left of the children sink into shadow so the poet and the children carry the shot
  const s8 = mtIn(t, 73.3, 86.2) ? Math.min(mtB(t, 73.3, 0.4), 1 - mtB(t, 85.8, 0.4)) : 0;
  items.push([901.5, () => { if (s8 > 0) { ctx.save(); const g = ctx.createLinearGradient(1160, 0, 1285, 0); g.addColorStop(0, 'rgba(10,26,74,' + (0.5 * s8).toFixed(3) + ')'); g.addColorStop(1, 'rgba(10,26,74,0)'); ctx.fillStyle = g; ctx.fillRect(900, 600, 385, 340); ctx.restore(); } }]);
  items.sort((a, c) => a[0] - c[0]).forEach((it) => it[1]());
  desertCamp(ctx, { layer: 'front', u, t });
  mtCampFx(ctx, t);
}

// ---------- camp effects in world units: balloons, ribbons, clouds, hearts, notes ----------
function mtCampFx(ctx, t) {
  const U = mtUma(t), M = mtPoet(t), G = mtGroom(t);
  // S2: the rumour balloon between the gossips
  if (mtIn(t, 19.45, 21.54)) iconBalloon(ctx, 345, 545, 190, 150, mtB(t, 19.45, 0.3, 'lin') * (1 - mtB(t, 21.3, 0.2, 'lin')), [345, 650], (c) => {
    portraitMedallion(c, 0, 0, 52, { costume: 'bedouin', age: 0, mouth: 'closed' }, { grey: mtB(t, 19.66, 0.3) });
    if (mtIn(t, 19.66, 19.95)) sfx(c, '?', 0, 0, 70, mtB(t, 19.66, 0.15), { fill: C.white }); mtX(c, 0, 0, 40, mtB(t, 19.95, 0.15, 'lin'), 12); });
  // S3: the heart beside her
  if (mtIn(t, 24.6, 30.1)) { const k = mtPop(t, 24.66, 0.3), pu = 1 + 0.15 * (mtPulse(t, 24.66, 0.35) + mtPulse(t, 25.42, 0.35) + mtPulse(t, 29.55, 0.35)); heart(ctx, 622, 690 - 8 * Math.sin(t * 2), 24 * k * pu); }
  // S4: the father's picture balloon: a new tent with a sun, then the messenger struck through
  const fb = mtIn(t, 34.3, 36.2) ? 1 : mtIn(t, 39.7, 41.4) ? 2 : 0;
  if (fb) { const a = fb === 1 ? 34.3 : 39.7, e = fb === 1 ? 36.2 : 41.4; iconBalloon(ctx, 800, 420, 220, 160, mtB(t, a, 0.3, 'lin') * (1 - mtB(t, e - 0.2, 0.2, 'lin')), [620, 640], (c) => {   // v2: over the tent roof, clear of the rising sun
    if (fb === 1) { c.fillStyle = '#9fd0ff'; c.fillRect(-110, -80, 220, 160); sun(c, 50, -28, t); shape(c, [[-80, 50], [-50, -10], [-20, -18], [10, 50]], MT_TENT, { lw: 4, seed: 840, dot: MT_TENTD, pitch: 8, rad: 0.2 }); c.fillStyle = '#e6c27a'; c.fillRect(-110, 50, 220, 30); seg(c, -110, 50, 110, 50, 3, C.black, 0); }
    else { if (t < 39.8) { c.fillStyle = C.white; c.fillRect(-110, -80, 220, 160); } horse(c, { x: 10, y: 50, s: 0.28, dir: -1, silhouette: true, gallop: 0.6, ph: t * 8, amp: 1 }); person(c, { x: 4, y: 0, s: 0.28, costume: 'servant', silhouette: true, sit: 1, seat: 'bench', dir: -1 });
      const k = mtB(t, 39.82, 0.2, 'lin'); if (k > 0) { c.save(); c.lineCap = 'round'; c.lineWidth = 16; c.strokeStyle = C.black; c.beginPath(); c.moveTo(-80, 50); c.lineTo(-80 + 160 * k, 50 - 110 * k); c.stroke(); c.lineWidth = 9; c.strokeStyle = C.red; c.stroke(); c.restore(); } } }); }
  // S8: the picture strip of the news
  if (mtIn(t, 78.3, 85.9)) iconBalloon(ctx, 1268, 555, 370, 170, mtB(t, 78.3, 0.3, 'lin') * (1 - mtB(t, 85.6, 0.3, 'lin')), [MT_CAMP.kids[1] - 6, 722], (c) => {   // v2: tail ends above the boy's head
    c.fillStyle = '#fff3d6'; c.fillRect(-190, -85, 380, 170);
    portraitMedallion(c, -125, 0, 52, { costume: 'lady', pal: MT_U_WED, mouth: 'closed' }, { bg: '#ffd9e0' });
    const kp = mtPop(t, 79.9, 0.3), out = mtB(t, 83.14, 0.3); if (kp > 0 && out < 1) { c.save(); c.globalAlpha = 1 - out; c.translate(0, 40 * out); c.scale(kp, kp); portraitMedallion(c, 0, 0, 52, { costume: 'bedouin', age: 0, mouth: 'smile' }); mtX(c, 0, 0, 40, mtB(t, 82.46, 0.13, 'lin'), 12); c.restore(); }
    if (t > 83.14) { const kg = mtB(t, 83.14, 0.35, 'out'); portraitMedallion(c, K.lerp(240, 125, kg), 0, 52, { costume: 'merchant', pal: MT_GROOM_PAL, mouth: 'smile' }, { bg: '#d8f0c8' });
      const kr = mtPop(t, 83.4, 0.3); if (kr > 0) { c.save(); c.translate(0, 0); c.scale(kr, kr); c.lineWidth = 12; c.strokeStyle = C.black; c.beginPath(); c.arc(0, 4, 18, 0, 7); c.stroke(); c.lineWidth = 6; c.strokeStyle = C.yellow; c.stroke(); shape(c, ell(0, -16, 7, 7, 10), C.red, { lw: 2.5, seed: 841 }); c.restore(); } } });
  // S10-S11: her verse ribbon, rising into the cloud
  const uM = U && mtMouth(U);
  if (U && mtIn(t, 106.1, 112.2)) { const pts = [[uM[0] + 8, uM[1] - 6], [uM[0] + 40, uM[1] - 150], [uM[0] + 140, uM[1] - 130], [930, 545]];
    const p = t < 107.3 ? 0.35 * mtB(t, 106.1, 1.2, 'lin') : 0.35 + 0.65 * mtB(t, 107.3, 2.2, 'lin'); verseRibbon(ctx, pts, t, { p, col: C.red, seed: 772, fade: mtB(t, 110.6, 1.5, 'lin') }); }
  // S11: her question cloud above the hooded man
  if (mtIn(t, 109.5, 126.0)) { const p = mtB(t, 109.5, 0.5, 'lin') * (1 - mtB(t, 125.5, 0.12, 'lin'));
    thoughtCloud(ctx, 1050, 430, 420, 260, t, { p, tail: [935, 560], seed: 9, scale: 0.36, at: [500, 700], bg: '#dff0ff', inside: (c) => mtCloudInside(c, t) }); }
  if (mtIn(t, 125.5, 126.0)) { const k = mtB(t, 125.5, 0.5, 'out'); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.save(); ctx.globalAlpha = 1 - k; ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(1050 + Math.cos(a) * 170 * (0.6 + k), 430 + Math.sin(a) * 110 * (0.6 + k)); ctx.lineTo(1050 + Math.cos(a) * 170 * (0.8 + k), 430 + Math.sin(a) * 110 * (0.8 + k)); ctx.stroke(); ctx.restore(); } }
  // S12: his answering verse, blue, from his covered mouth to her
  const RIB = MT_RIB(t);
  if (M && mtIn(t, 122.41, 130.6)) { const p = mtB(t, 122.41, 3.1, 'lin'), end = verseRibbon(ctx, RIB, t, { p: Math.max(0.01, p), col: C.blue, curl: mtB(t, 125.5, 0.6), seed: 773, fade: mtB(t, 129.9, 0.7, 'lin') });
    if (mtIn(t, 128.5, 130.8)) { const c = MT_RIB_END(); const k = mtPop(t, 128.56, 0.3) * (1 - mtB(t, 130.4, 0.4)), pu = 1 + 0.15 * (mtPulse(t, 128.9, 0.35) + mtPulse(t, 129.4, 0.35)); heart(ctx, c[0], c[1], 24 * k * pu); } }
  // S14: the groom's short yellow verse, bowing between the two like a bridge
  if (G && mtIn(t, 141.44, 144.4)) { const m = mtMouth(G); verseRibbon(ctx, [[m[0] + 12, m[1] - 4], [m[0] + 110, 540], [870, 500], [950, 630]], t, { p: mtB(t, 141.44, 1.0, 'lin'), col: C.yellow, seed: 774, fade: mtB(t, 143.6, 0.8, 'lin') }); }
  // v2 S9: the singer's '?' while she stares at the hooded stranger
  if (mtIn(t, 91.4, 92.2)) { const g = mtGuest(t, 1), h = mtHead(g); sfx(ctx, '?', h[0] + 6, h[1] - 78, 64, mtPop(t, 91.4, 0.2) * (1 - mtB(t, 92.0, 0.2)), { fill: C.yellow }); }
  // S15: the rumour undone beside the post
  if (mtIn(t, 155.5, 156.9)) iconBalloon(ctx, 450, 590, 160, 140, mtB(t, 155.5, 0.25, 'lin') * (1 - mtB(t, 156.6, 0.3, 'lin')), [548, 690], (c) => {
    portraitMedallion(c, 0, 0, 48, { costume: 'bedouin', age: 0.35, mouth: t > 156.0 ? 'smile' : 'closed' }, { grey: 1 - mtB(t, 155.9, 0.4) });
    if (t < 155.64) mtX(c, 0, 0, 38, 1, 11); else { const u = t - 155.64; for (const [sd, rx] of [[-1, -0.6], [1, 0.8]]) { c.save(); c.translate(sd * 8 * u * 6, fallY(t, 155.64, 156.3, 0, 120)); c.rotate(rx * u * 3); c.beginPath(); c.rect(sd < 0 ? -60 : 0, -60, 60, 120); c.clip(); mtX(c, 0, 0, 38, 1, 11); c.restore(); } } });
  // music: the singer, the notes that reach him, the restart, the heart
  const sing = mtGuest(t, 1); if (sing && (mtIn(t, 61.7, 65.04) || t > 162.0)) { const m = mtMouth(sing); musicNotes(ctx, m[0], m[1] - 20, t, { t0: t > 160 ? 162.0 : 61.75, gap: 0.4, n: 40, loop: true, seed: 7, life: 1.6 }); }
  if (M && mtIn(t, 72.0, 73.3)) { const h = mtHead(M); musicNotes(ctx, 1000, 640, t, { t0: 72.0, gap: 0.45, n: 2, life: 1.2, to: [h[0] - 30, h[1] - 10], seed: 9 }); }
  if (t > 168.78) { const k = mtPop(t, 168.78, 0.4), pu = 1 + 0.08 * Math.sin((t - 168.78) * 6); heart(ctx, 815, 560 - 6 * Math.sin(t * 2), 62 * k * pu); musicNotes(ctx, 815, 560, t, { t0: 168.9, gap: 0.35, n: 30, loop: true, seed: 11, life: 1.6 }); }
  if (mtIn(t, 103.7, 104.9) && U) { const m = mtMouth(U); for (let i = 0; i < 3; i++) { const u = K.clamp((t - 104.1 - i * 0.1) / 0.7); if (u <= 0 || u >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(m[0] + 20 + 40 * u, m[1] - 6 - 10 * u, 6 + 8 * u, 4 + 6 * u, 12), C.white, { lw: 3, seed: 850 + i }); ctx.restore(); } }
}
const MT_RIB = (t) => { const M = mtPoet(Math.max(t, 70)), m = mtMouth(M); return [[m[0] - 14, m[1] - 2], [m[0] - 20, 500], [850, 450], [862, 630]]; };   // v2: from his covered mouth over to her
const MT_RIB_END = () => { const r = MT_RIB(126); const a = r[3], b = mtBz(r, 0.97), ang = Math.atan2(a[1] - b[1], a[0] - b[0]); return [a[0] + Math.cos(ang - Math.PI / 2) * 30, a[1] + Math.sin(ang - Math.PI / 2) * 30]; };
function mtCloudInside(c, t) {   // drawn in a 1000 x 1230 world at scale 0.36 around (500, 700)
  const ph = t < 114.0 ? 0 : t < 117.88 ? 1 : 2;
  c.fillStyle = '#dff0ff'; c.fillRect(-200, 0, 1400, 1300);
  if (ph === 0) { person(c, { x: 470, y: 1180, s: 2.1, costume: 'bedouin', dir: 1, noBlink: true, lid: 0, alpha: 1, pal: { robe: C.black, dot: C.black, cape: C.black, capeDot: C.black, hc: C.black, hd: C.black, beard: C.black } });
    if (t > 111.22) sfx(c, '?', 760, 560, 260 * Math.min(1, mtPop(t, 111.22, 0.35)), 1, { fill: C.red }); }
  else if (ph === 1) { const u = mtB(t, 114.0, 3.8, 'lin'), sp = 1 + 1.2 * mtB(t, 115.1, 1.4, 'lin');
    c.fillStyle = '#ffd98a'; c.fillRect(-200, 0, 1400, 1300); sun(c, 760, 430, t);
    for (const [k, base, col] of [[0.4, 860, '#e0a13a'], [0.7, 920, '#edc65a'], [1, 980, SANDL]]) { const off = -300 * u * k * sp; const pts = [[-200, 1300]]; for (let x = -200; x <= 1400; x += 40) pts.push([x, base - 40 * Math.sin((x - off) * 0.01 * k + k * 3)]); pts.push([1400, 1300]); shape(c, pts, col, { lw: 6, seed: 860 }); }
    const cs = 0.5 * (1 - 0.85 * mtB(t, 115.1, 1.6)), cx = 500 + 200 * u, Cm = { x: cx, y: 880 - 60 * u, s: cs, dir: 1, pal: 0, saddle: true, ph: t * 6, amp: 0.4 }; camel(c, Cm); }
  else { const w = 1 + 0.25 * Math.sin(t * 17) * (1 - mtB(t, 121.47, 0.3)), br = 1 + 0.3 * mtB(t, 121.47, 0.4);
    c.fillStyle = '#1b2a5a'; c.fillRect(-200, 0, 1400, 1300);
    shape(c, [[430, 900], [570, 900], [550, 860], [450, 860]], '#c98a3a', { lw: 6, seed: 862 });
    c.save(); c.translate(500, 860); c.scale(w * br, br); shape(c, [[-40, 0], [-30, -80], [0, -170], [30, -80], [40, 0]], C.yellow, { lw: 6, seed: 863 }); shape(c, [[-18, 0], [0, -80], [18, 0]], C.red, { lw: 0, seed: 864 }); c.restore();
    if (t < 121.47) sfx(c, '?', 720, 640, 200, mtPop(t, 117.9, 0.3), { fill: C.white }); }
}

// ---------- camera ----------
// v2: wides framed so the carpet / foot line sits at about 84% of the panel (y = 900 - 430 / zoom); close shots stay on faces
const MT_CAM = [[9.1, 850, 593, 1.4], [15.6, 850, 593, 1.4], [16.4, 760, 581, 1.35], [17.2, 760, 581, 1.35], [17.7, 560, 581, 1.35], [21.53, 560, 581, 1.35],
  [21.54, 700, 695, 1.7], [26.6, 700, 695, 1.7], [27.2, 740, 695, 1.7], [30.09, 740, 695, 1.7],
  [30.1, 700, 575, 1.3], [39.6, 730, 575, 1.3], [41.4, 610, 675, 1.6], [43.49, 610, 675, 1.6],
  [43.5, 880, 540, 1.15], [47.4, 880, 540, 1.15], [50.0, 688, 750, 2.15], [52.4, 688, 750, 2.15], [53.6, 700, 762, 1.9], [54.89, 700, 762, 1.9],
  [54.9, 790, 410, 1.5], [55.2, 790, 410, 1.5], [57.6, 790, 545, 1.2], [65.03, 815, 545, 1.2],
  [65.04, 1165, 535, 1.15], [70.9, 1165, 535, 1.15], [72.0, 1050, 535, 1.15], [73.29, 1050, 535, 1.15],
  [73.3, 1267, 615, 1.5], [79.2, 1267, 615, 1.5], [82.0, 1337, 665, 1.9], [85.89, 1337, 665, 1.9],
  [85.9, 1300, 635, 1.6], [88.5, 1300, 635, 1.6], [91.2, 1080, 556, 1.25], [93.59, 1080, 556, 1.25],
  [93.6, 860, 603, 1.45], [97.5, 860, 603, 1.45], [98.4, 860, 685, 1.9], [100.8, 860, 685, 1.9], [101.6, 860, 603, 1.45], [105.2, 860, 603, 1.45], [106.5, 840, 545, 1.2], [108.63, 840, 545, 1.2],
  [108.64, 960, 615, 1.5], [117.9, 1000, 615, 1.5], [118.99, 1000, 615, 1.5],
  [119.0, 945, 650, 1.7], [122.4, 945, 650, 1.7], [126.5, 930, 590, 1.3], [129.67, 930, 590, 1.3],
  [129.68, 935, 600, 1.35], [131.5, 935, 600, 1.35], [132.1, 935, 672, 1.85], [132.74, 935, 672, 1.85], [133.6, 735, 700, 2.1], [136.99, 735, 700, 2.1],
  [137.0, 735, 700, 2.1], [137.5, 700, 765, 2.3], [138.98, 700, 765, 2.3], [139.54, 830, 613, 1.5], [144.3, 815, 613, 1.5], [146.1, 815, 613, 1.5], [147.1, 690, 535, 1.15], [150.31, 690, 535, 1.15],
  [150.32, 840, 625, 1.5], [153.6, 840, 625, 1.5], [154.4, 690, 625, 1.5], [156.6, 690, 625, 1.5], [157.3, 820, 625, 1.5], [158.3, 820, 625, 1.5], [160.0, 820, 695, 1.8], [163.8, 820, 695, 1.8],
  [164.0, 820, 695, 1.6], [170.4, 915, 556, 1.25], [177, 915, 556, 1.25]];
function mtCam(t) {
  const k = MT_CAM, i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, 1600 - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z };
}
const mtP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- lettering (panel space, view 1000 x 1230) ----------
function mtOverlays(ctx, t, cam, S, road) {
  const P = (x, y) => mtP(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (!mtIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = mtFade(t, a, b); S.label(ctx, txt, x, y, mtB(t, a, 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 76, o = {}) => { if (!mtIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = mtFade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!mtIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = mtFade(t, a, b); S.arrow(ctx, a0, a1, mtB(t, a, 0.4), { width: 14, ...o }); ctx.restore(); };
  if (road) {
    const r = P(MT_RX(t), 540), rl = K.clamp(r[0] - 60, 300, 700);
    lab('AL-MUTALAMMIS, THE POET', rl, r[1] - 200, 1.2, 2.5, { size: 46 }); arr([rl, r[1] - 150], [r[0], r[1] - 40], 1.3, 2.5, { bend: 0.15 });
    const k = P(420, 420), kl = K.clamp(k[0] + 190, 220, 780); lab('KING AL-NUMAN', kl, k[1] - 130, 3.1, 4.3, { size: 42, fill: C.yellow }); arr([kl - 40, k[1] - 85], [k[0] + 30, k[1] - 20], 3.2, 4.3, { bend: -0.2 });
    if (mtIn(t, 6.92, 9.0)) { const n = 1 + Math.min(6, Math.floor((t - 6.92) / 0.27)), tick = (t - 6.92) % 0.27 < 0.08 && n > 1 ? 1.12 : 1;   // v2: YEAR 1..7 across "a long time"
      ctx.save(); ctx.globalAlpha = mtFade(t, 6.92, 9.0, 0.15); ctx.translate(170, 150); ctx.scale(tick, tick); S.label(ctx, 'YEAR ' + n, 0, 0, mtB(t, 6.92, 0.2), { size: 50, align: 'center', fill: n === 7 ? C.yellow : C.white }); ctx.restore(); }
    return;
  }
  // S2
  { const U = mtUma(t); if (U) { const h = P(...mtHead(U)); lab('UMAYMAH, HIS WIFE', K.clamp(h[0], 260, 740), h[1] - 190, 10.1, 11.9, { size: 44 }); arr([K.clamp(h[0], 260, 740), h[1] - 150], [h[0], h[1] - 70], 10.2, 11.9); } }
  lab('NEWS?', ...P(1110, 620), 13.6, 15.0, { size: 52, fill: C.yellow });
  lab('DEAD?', ...P(345, 420), 19.75, 21.4, { size: 50, fill: C.white });
  // S3
  word('NO!', ...P(628, 592), 27.8, 28.9, 96, { fill: C.red, rot: -0.08 });   // v2: over the dark tent wall, above her raised hand
  // S4
  if (mtIn(t, 42.65, 43.5)) { ctx.save(); ctx.globalAlpha = mtFade(t, 42.65, 43.5, 0.15); S.counter(ctx, 7, ...P(470, 640), mtB(t, 42.65, 0.3), { size: 80 }); S.label(ctx, 'YEARS', ...P(470, 720), mtB(t, 42.75, 0.3), { size: 44, align: 'center', fill: C.yellow }); ctx.restore(); }
  // S5: suitors counter
  if (mtIn(t, 43.7, 46.6)) { const n = t < 44.54 ? 1 : t < 45.14 ? 2 : 3; ctx.save(); ctx.globalAlpha = mtFade(t, 43.7, 46.6); S.label(ctx, 'SUITORS: ' + n, ...P(1010, 470), mtB(t, 43.7, 0.3), { size: 50, align: 'center', fill: C.yellow }); ctx.restore(); }
  // S6
  if (mtIn(t, 56.8, 59.2)) { ctx.save(); ctx.globalAlpha = mtFade(t, 56.8, 59.2, 0.3); S.title(ctx, 'THE WEDDING NIGHT', 500, 200, mtB(t, 56.8, 0.6), { size: 64, align: 'center' }); ctx.restore(); }
  word('DUM!', ...P(320, 700), 63.3, 63.75, 64, { fill: C.yellow, rot: -0.1 }); word('TAK!', ...P(450, 690), 63.65, 64.1, 60, { fill: C.white, rot: 0.08 });
  // S7
  lab('THAT VERY NIGHT...', 300, 150, 65.1, 66.6, { size: 48, fill: C.yellow });
  { const R = mtCamelCamp(t); if (R && mtIn(t, 68.0, 69.1)) { const p = P(R.x + 10, R.y - 330); lab('HE IS ALIVE!', p[0] - 170, p[1] - 40, 68.0, 69.1, { size: 50, fill: C.yellow }); arr([p[0] - 80, p[1] - 6], [p[0] - 10, p[1] + 30], 68.05, 69.1); } }
  // S8
  { const B = mtKid(t, 0); if (B && mtIn(t, 77.2, 78.3)) { const h = P(...mtHead(B)); word('A WEDDING!', h[0] - 40, h[1] - 140, 77.2, 78.3, 58, { fill: C.yellow, rot: -0.06 }); } }
  // S10
  { const G = mtGroom(t); if (G && mtIn(t, 96.5, 97.5)) { const h = P(...mtHead(G)); lab('THE NEW GROOM', h[0] - 20, 200, 96.5, 97.5, { size: 44 }); arr([h[0] - 20, 245], [h[0], h[1] - 70], 96.55, 97.5); } }
  { const U = mtUma(t); if (U && mtIn(t, 103.7, 105.0)) { const h = P(...mtHead(U)); word('SIGH...', h[0] + 150, h[1] - 120, 103.7, 105.0, 50, { fill: C.white }); } }
  // S11
  if (mtIn(t, 110.5, 111.8)) { lab('HER VERSE', ...P(760, 460), 110.5, 111.8, { size: 44, fill: C.white }); }
  word('WHERE?', ...P(1080, 300), 111.3, 114.0, 56, { fill: C.yellow, rot: -0.05 });
  // S12: arrow back along his ribbon, RIGHT HERE!
  if (mtIn(t, 126.5, 128.6)) { const r = MT_RIB(t), a = P(...mtBz(r, 0.85)), b = P(...mtBz(r, 0.15)); arr([a[0], a[1] - 60], [b[0], b[1] - 60], 126.5, 128.6, { bend: -0.15 }); const m = P(...r[0]); lab('RIGHT HERE!', K.clamp(m[0], 260, 760), m[1] - 230, 126.6, 128.6, { size: 52, fill: C.yellow }); }
  // S13
  { const U = mtUma(t); if (U && mtIn(t, 130.0, 131.5)) { const h = P(...mtHead(U)); word('THAT VOICE!', K.clamp(h[0], 230, 770), h[1] - 170, 130.0, 131.5, 54, { fill: C.yellow, rot: -0.05 }); } }
  // S14
  lab('NO ANGER', 500, 170, 137.9, 139.5, { size: 50, fill: C.white });
  lab('THE PLACE IS YOURS', 500, 170, 144.5, 146.3, { size: 46, fill: C.yellow });
  // S15
  if (mtIn(t, 154.6, 156.5)) { ctx.save(); ctx.globalAlpha = mtFade(t, 154.6, 156.5, 0.15); S.counter(ctx, 7, ...P(650, 560), mtB(t, 154.6, 0.3), { size: 76 }); S.label(ctx, 'YEARS', ...P(650, 630), mtB(t, 154.7, 0.3), { size: 42, align: 'center', fill: C.yellow }); ctx.restore(); }
  word('DUM!', ...P(380, 680), 163.4, 164.3, 64, { fill: C.yellow, rot: -0.1 });
  word('GRRMPH', ...P(1235, 640), 170.44, 171.5, 44, { fill: C.white, rot: 0.06 });
  // THE END
  if (t >= 171.5) S.title(ctx, 'THE END', 500, 200, mtB(t, 171.5, 0.8), { size: 84, align: 'center' });
}

const SCENE = {
  duration: MT_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
    const road = t < 9.1;
    const cam = road ? { x: MT_RCX(t) + 500, y: 585, zoom: 1.2 } : mtCam(t);   // v2: road framed lower (ground at about 80% of the panel)
    ctx.save(); K.camera(ctx, 1000, 1230, cam);
    if (road) mtRoad(ctx, t, MT_RCX(t)); else mtCamp(ctx, t, cam);
    ctx.restore();
    if (t < 0.6) { ctx.save(); ctx.globalAlpha = 1 - mtB(t, 0, 0.6); ctx.fillStyle = C.paper; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
    mtOverlays(ctx, t, cam, S, road);
    if (t >= MT_CARD[0] && t < MT_CARD[1]) S.transition(ctx, 1000, 1230, (t - MT_CARD[0]) / (MT_CARD[1] - MT_CARD[0]), { caption: 'YEARS LATER...' });
    if (mtIn(t, 65.04, 65.3)) { ctx.save(); ctx.globalAlpha = 0.7 * (1 - mtB(t, 65.04, 0.26)); ctx.fillStyle = C.white; for (let i = 0; i < 9; i++) ctx.fillRect(0, 140 + i * 120, 1000, 18); ctx.restore(); }   // whip pan streaks
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's quiet effects that fall in real gaps (the 121.32 chime is dropped: it lands on a word in the audio)
    k.play('pop', 46.63, { gain: 0.35 });
    k.play('chime', 171.75, { note: 'E6', gain: 0.35 });
    k.play('thud', 172.6, { gain: 0.3 });
  },
};
window.SCENE = SCENE;
