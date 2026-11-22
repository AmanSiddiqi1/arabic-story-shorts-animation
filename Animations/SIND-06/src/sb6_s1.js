// ===== SIND-06 shots S1-S4 (0 - 26.48 s): the Baghdad quay, the calm sea, the current and the rock coast, the wreck =====

// ---------- S1 (0 - 4.96): Baghdad quay, morning (the series opening). Crane down from the dome, a slow drift right ----------
const SB6_Q = { hz: 620, y: [632, 700, 945, 1030], amp: 5, pal: 'morning' };
const SB6_S1X = (t) => kfn(t, [[0, 960], [0.9, 960], [1.5, 1092], [2.6, 1470]], 'inOut');
const SB6_FALLS1 = footfalls(SB6_S1X, 1.5, 2.6, 30);
const SB6_D1 = (t) => kfn(t, [[4.4, 1660], [4.96, 1760]], 'in');
function sbS1Dhow6(t) { const f = sbFloat(SB6_D1(t), t, SB6_Q, 2, 200), su = K.clamp((SB_T2(t) - 3.0) / 0.8); return { x: SB6_D1(t), y: f.y - 2, s: 1.15, pitch: f.rot * 0.4 + (t > 4.4 ? 0.02 * Math.sin((t - 4.4) * 1.9) : 0), t, sail: su < 1 ? K.ease.out(su) : 1, billow: 0.6 + 0.6 * pulse(t, 3.6, 0.5) }; }
// two sailors carry a bale and a jar up the plank (out of step) 0.6 - 1.7
const SB6_CARRY = [{ i: 0, a: 0.6, x0: 1000, x1: 1470, load: 'bale' }, { i: 1, a: 0.75, x0: 930, x1: 1420, load: 'jar' }];
function sbS1World6(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB6_Q;
  sbSkyTall(ctx, 'morning', cam, 620); sbSun(ctx, 1760, 250, 50, '#fff6c8', '#ffd0a0', 0.8); sbSeaBack(ctx, t, sea, 0, 2600);
  sbGulls(ctx, t, 1500, 240, 30, 2, 4, 0.3);
  ctx.drawImage(sbQuayPlate('baghdad'), 0, 0);
  const D = sbS1Dhow6(t); D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS1Crew6(q, t, D.s)); D.cargo = (c) => sbOnDeck(c, D.s, (q) => sbS1Cargo(q, t, D.s));
  sbDhow(ctx, D);
  // the mooring rope from the bollard to the bow, cast off at 4.4 (it slaps into the water)
  const bow = sbDhowPt(D, 240, -150), bol = [1080, 862];
  if (t < 4.4) { ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...bol); ctx.quadraticCurveTo((bol[0] + bow[0]) / 2, Math.max(bol[1], bow[1]) + 40, bow[0], bow[1]); ctx.stroke(); ctx.restore(); }
  else if (t < 4.96) { const u = (t - 4.4) / 0.56; ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bow[0], bow[1]); ctx.quadraticCurveTo(bow[0] - 80, bow[1] + 60 * u, bow[0] - 180 * u, 945); ctx.stroke(); ctx.restore(); if (u > 0.5) sbSplash(ctx, bow[0] - 180 * u, 945, (u - 0.5) * 2, 0.6); }
  sbQuayWater(ctx, t, sea, 0, 2600);
  sbReflect(ctx, D.x, D.y + 6, 560, ['#a8643a', '#2ab0b0', '#fbf3df'], t, { rows: 5, gap: 10, a: 0.45, seed: 31 });
  if (t > 4.4) sbWake(ctx, D.x, D.y, D.s, 1, t, K.clamp((t - 4.4) / 0.5));
  // the gangplank: bends under each footfall; pulled in from 3.6
  const ga = [1092, 900], gb = sbDhowPt(D, -150, -130);
  if (t < 4.3) { const hu = K.ease.inOut(K.clamp((t - 3.6) / 0.7)), a = [K.lerp(ga[0], gb[0] - 60, hu), K.lerp(ga[1], gb[1] + 10, hu) - 20 * Math.sin(Math.PI * hu)], bend = kick(t, SB6_FALLS1, 6, 9, 8) + 4 * Math.abs(Math.sin(tc * 9)) * (t > 0.6 && t < 1.7 ? 1 : 0);
    ctx.save(); ctx.lineCap = 'round'; const mx = (a[0] + gb[0]) / 2, my = (a[1] + gb[1]) / 2 + bend; ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(mx, my, ...gb); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore(); }
  sbCushion(ctx, 660, 846);
  // the carriers on the plank (until they step aboard at 1.7)
  for (const k of SB6_CARRY) { if (t < 0 || t >= 1.75) continue; const xf = (u) => kfn(u, [[0, k.x0], [k.a, k.x0], [1.75, k.x1]], 'inOut'), x = xf(t), P = sbLive(t, 60 + k.i, { ...walk(xf, tc, { stride: 24 }), y: x > 1092 ? K.lerp(900, 806, K.clamp((x - 1092) / 436)) : 900, dir: 1, gaze: k.i === 0 ? [0.4, 0.8] : [1, -0.3] });
    P.handL = [-10, -230]; P.handR = [20, -228]; if (k.i === 1) { P.tip -= 0.1; P.mouth = 'o'; } else P.tip += 0.06;
    const Q = sbSailor(ctx, k.i, P), h = sbHandW(Q, 1); if (k.load === 'bale') sbDebris(ctx, 'bale', h[0] - 10, h[1] - 6, 0.05, 0.9); else { ctx.save(); ctx.translate(h[0] - 8, h[1] - 4); ctx.rotate(-0.15); packLoad(ctx, ['jar'], 0, 0, 0.9); ctx.restore(); } }
  sbS1Family6(ctx, t);
  if (t < 2.6) { const x = SB6_S1X(t), P = sbLive(t, 11, { x, y: 900, dir: 1, mouth: 'smile', gaze: [1, -0.25], wind: -0.3 }, [0.85]);
    if (t > 0.9) { Object.assign(P, walk(SB6_S1X, tc, { stride: 28 })); P.tip += 0.07; if (x > 1092) P.y = K.lerp(900, 806, K.clamp((x - 1092) / 436)) + kick(t, SB6_FALLS1, 2, 9, 8); }
    else { P.gaze = [-1, -0.1]; P.handR = PERSON_HANDS.wave.R; }
    if (t > 1.5 && t < 1.72) { const [, lift] = hop(t, 1.5, 0.22, 0, 0, 18); P.y -= lift; }
    P.handL = [-34, -196]; const Q = sbSin6(ctx, P), sh = sbPt(Q, [-38, -196], false); sbSack(ctx, sh[0] - 6, sh[1] - 40 - 5 * Math.abs(Math.sin(P.ph || 0)) * (P.amp || 0), 0.9, -0.2 + lagged((u) => SB6_S1X(u) * 0.002, t, 0.12, 0.5)); }
}
function sbS1Family6(ctx, t) { const tc = SB_T2(t);
  // mother: waves small and slow with wet eyes; father lifts a palm; the sister skips along the quay edge, eyes locked on him
  const M = sbLive(t, 32, { x: 880, y: 900, dir: 1, mouth: 'smile', gaze: [1, -0.4], wet: t > 2.0 });
  if (t > 2.4) { const w = osc(tc, 1.0); M.handR = [36 + 6 * w, -188 - 4 * w]; M.handL = PERSON_HANDS.chest.R; }
  sbFamily(ctx, 'mother', M);
  const F = sbLive(t, 35, { x: 800, y: 900, dir: 1, gaze: [1, -0.3] }); if (t > 2.55) { const r = sbF(t, [[2.55, 0], [2.9, 1], [4.9, 1]]); F.handR = [30 + 20 * r, -120 - 80 * r]; } sbFamily(ctx, 'father', F);
  const sx = kfn(t, [[0, 990], [2.4, 990], [3.4, 1060]], 'inOut'), jt = t - 2.4, ph = jt > 0 ? (jt % 0.42) / 0.42 : 0, lift = jt > 0 && jt < 2.6 ? 18 * Math.sin(Math.PI * ph) : 0;
  groundShadow(ctx, sx, 902, 56, lift, { flat: true });
  const Sg = sbLive(t, 33, { x: sx, y: 900 - lift, dir: 1, mouth: t > 2.4 ? 'open' : 'smile', gaze: lookAt([sx, 780], [SB6_S1X(t), 700]) });
  if (t > 2.4) { const w = osc(tc + 0.2, 0.32); Sg.aL = [2.7 + 0.3 * w, 2.9]; Sg.aR = [2.7 - 0.3 * w, 2.9]; Sg.sq *= ph < 0.1 && jt > 0.1 ? 0.92 : 1; }
  sbFamily(ctx, 'sister', Sg);
}
// cargo amidships: bales, jars and the crate with the star seal (deck units)
function sbS1Cargo(c, t, ds) { const dy = -80 * ds, sl = t > 12.9 && t < 26 ? 0 : 0; sbDebris(c, 'bale', 40 * ds + sl, dy - 2, 0, 0.9); sbDebris(c, 'crate', 100 * ds, dy - 2, 0, 0.9); packLoad(c, ['jar'], 150 * ds, dy, 0.8); }
// deck: the captain (spyglass from 4.0), the rose sailor ticking cargo (3.7-4.6), the carriers aboard, Sinbad waving at the rail
function sbS1Crew6(c, t, ds) { const tc = SB_T2(t), dy = -80 * ds;
  const Cp = sbLive(t, 51, { x: -190 * ds, y: dy, dir: 1, gaze: [1, -0.1] }); let glass = 0;
  if (t > 4.0) { const r = sbF(t, [[4.0, 0], [4.35, 1], [4.96, 1]]), lag = r + lagged((u) => flow(u, [[4.0, 0], [4.35, 1], [4.96, 1]]), tc, 0.1, 0.6); Cp.handR = [30 + 20 * r, -150 - 40 * lag]; Cp.handL = [20 + 20 * r, -140 - 30 * r]; Cp.gaze = [1, -0.2]; glass = r; Cp.tip += 0.04 * Math.sin(Math.PI * K.clamp((t - 4.5) / 0.4)); }
  const CQ = sbCaptain(c, Cp); if (glass > 0) { const h = sbHandW(CQ, 1); sbSpyglass(c, h[0], h[1], -0.15, 0.9, glass, 0); }
  // rose: tablet in one hand, ticks with the other, quick head bobs counting, tongue out
  const Rs = sbLive(t, 62, { x: 70 * ds, y: dy, dir: 1, gaze: [0.3, 0.8] }); Rs.handL = [30, -130];
  if (t > 3.7 && t < 4.6) { Rs.handR = [40, -120 + 10 * Math.abs(osc(tc, 0.25))]; Rs.drop = 4 * Math.abs(osc(tc, 0.5)); }
  const RQ = sbSailor(c, 2, Rs); const hb = sbHandW(RQ, 0); celShade(c, [[hb[0] - 10, hb[1] - 16], [hb[0] + 14, hb[1] - 16], [hb[0] + 14, hb[1] + 12], [hb[0] - 10, hb[1] + 12]], '#e8d8b0', '#b8a080', { light: [-1, -1], off: 3, lw: 1.5 });
  if (t > 3.7 && t < 4.6) { const m = sbPt(RQ, [10, 26]); sbBlob(c, m[0] + 3, m[1] + 3, 4, 3, '#ff7a8a', '#d84a6a', { lw: 1, off: 1 }); }
  for (const k of SB6_CARRY) { if (t < 1.75) continue; const P = sbLive(t, 60 + k.i, { x: (k.i ? 170 : 220) * ds, y: dy, dir: -1, gaze: [-1, 0.1] }); if (t < 2.1) P.sq *= landSquash(tc, 1.75, 0.1); if (k.i === 1 && t > 2.7) { P.handR = PERSON_HANDS.wave.R; } sbSailor(c, k.i, P); }
  if (t >= 2.6) { const [hx, lift] = hop(t, 2.6, 0.26, -120 * ds, -80 * ds, 22), P = sbLive(t, 11, { x: hx, y: dy - lift, dir: t < 3.0 ? 1 : -1, mouth: 'smile', gaze: [-1, -0.1], wind: 0.6 }, [3.0]); P.sq *= landSquash(tc, 2.86, 0.12);
    if (t > 3.1) { const w = osc(tc, 0.5); P.aR = [2.5 + 0.4 * w, 2.8 + 0.4 * w + lagged((u) => osc(u, 0.5), tc, 0.1, 0.6)]; P.handL = [-30, -100]; }
    sbSin6(c, P); if (t > 2.9) sbSack(c, -40 * ds, dy - 76, 0.9, 0.1); }
}
function sbS1Over6(ctx, t, cam, S) {
  if (t > 0.3 && t < 2.9) { const fade = 1 - K.clamp((t - 2.6) / 0.3); ctx.save(); ctx.globalAlpha *= fade;
    S.title(ctx, 'THE RIVER BENEATH', 500, 170, K.clamp((t - 0.3) / 0.9), { size: 72, align: 'center' }); S.title(ctx, 'THE MOUNTAIN', 500, 252, K.clamp((t - 0.45) / 0.9), { size: 72, align: 'center' });
    if (t > 0.8) S.title(ctx, 'النهر تحت الجبل', 500, 370, K.clamp((t - 0.8) / 0.9), { size: 72, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); ctx.restore(); }
}
SB_SHOTS.push({ a: 0, b: 4.96, cam: sbKeys([[0, { x: 1000, y: 495, zoom: 1 }], [1.7, { x: 1000, y: 615, zoom: 1 }], [4.96, { x: 1060, y: 615, zoom: 1 }]]), world: sbS1World6, over: sbS1Over6 });

// ---------- S2 (4.96 - 11.5): the calm sea, islands passing, the open-armed breath ----------
const SB6_SEA2 = { hz: 600, y: [612, 680, 820, 900], amp: 4, pal: 'day', scroll: 80 };
function sbS2Dhow6(t) { const x = 520, f = sbFloat(x, t, SB6_SEA2, 2, 200); return { x, y: f.y - 2, s: 1.0, pitch: f.rot * 0.5 + 0.017 * Math.sin(t * 1.5), t, sail: 1, billow: 0.7 + 0.15 * Math.sin(t * 1.3) }; }
// a far island: 'palm' (green with palms), 'twin' (twin rock), 'bar' (sand bar with a white dome); x centre on the horizon, s scale
function sbFarIsle(ctx, kind, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (kind === 'palm') { celShade(ctx, [[-180, 4], [-120, -40], [-30, -70], [60, -64], [150, -30], [190, 4]], '#5ab86a', '#2f8a4a', { light: [-1, -1], off: 14, lw: 3, line: '#1f5a3a' }); shape(ctx, [[-200, 4], [200, 4], [190, 14], [-190, 14]], '#f4dcb0', { lw: 2 }); for (const [px, h] of [[-60, 150], [20, 180], [90, 130]]) palmTree(ctx, px, -50, { s: h / 400, t: SB_T2(t) + px, sway: 0.8 }); }
  else if (kind === 'twin') { for (const [dx, h, col] of [[-60, 160, '#c8a0c0'], [50, 120, '#e0b090']]) celShade(ctx, [[dx - 60, 4], [dx - 40, -h * 0.7], [dx, -h], [dx + 40, -h * 0.6], [dx + 60, 4]], col, sbDark(col, 0.25), { light: [-1, -1], off: 16, lw: 3, line: '#5a3a5a' }); }
  else { shape(ctx, [[-240, 4], [-180, -14], [180, -16], [240, 4]], '#f4dcb0', { lw: 2.5, line: '#b08a5a' }); celShade(ctx, ell(40, -14, 30, 34, 18).filter((p) => p[1] <= -14), '#fffaf0', '#d8c8f0', { light: [-1, -1], off: 8, lw: 2.5 }); shape(ctx, K.rectPts(14, -16, 52, 14), '#fffaf0', { lw: 2 }); palmTree(ctx, -120, -10, { s: 0.3, t: SB_T2(t), sway: 0.8 }); }
  ctx.restore(); }
function sbS2World6(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB6_SEA2;
  sbSkyTall(ctx, 'day', cam, 600); sbSun(ctx, 1150, 190, 46, '#fffbe0', '#ffe0a0', 0.8); sbSeaBack(ctx, t, sea, -400, 1600);
  // three islands at their own parallax (0.2 the far bar, 0.45 the near ones)
  const d = t - 4.96; sbFarIsle(ctx, 'bar', 1300 - d * 16, 604, 0.5, t); sbFarIsle(ctx, 'twin', 900 - d * 36, 606, 0.6, t); sbFarIsle(ctx, 'palm', 1400 - d * 70, 612, 0.75, t);
  sbLedgeBirds(ctx, t, 1400 - d * 70, 470, 3, 90, 0.22);
  sbSeaLayer(ctx, 2, t, sea, -400, 1600);
  const D = sbS2Dhow6(t); D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS2Crew6(q, t, D)); D.cargo = (c) => sbOnDeck(c, D.s, (q) => sbS1Cargo(q, t, D.s)); sbDhow(ctx, D); sbWake(ctx, D.x, D.y, D.s, 1, t, 0.7);
  // a gull lands on the yard at 10.6
  const gu = K.clamp((t - 10.3) / 0.6), yp = sbDhowPt(D, 160, -330); if (t > 9.4) sbGull(ctx, K.lerp(yp[0] + 400, yp[0], K.ease.out(gu)), K.lerp(yp[1] - 200, yp[1] - 16, K.ease.out(gu)), t, { fly: gu < 1, flap: gu < 1 ? undefined : 0, dir: -1, s: 0.34, seed: 7 });
  // flying fish skip beside the bow (10.3 - 11.3)
  for (let i = 0; i < 2; i++) sbFlyingFish(ctx, 760 + i * 60, 1020 + i * 60, 838 + i * 12, (t - 10.3 - i * 0.25) / 0.7, 80, 0.55);
  sbSeaFront(ctx, t, sea, -400, 1600, { from: 3, mid: null });
  sbReflect(ctx, D.x, D.y + 8, 520, ['#a8643a', '#2ab0b0', '#fbf3df', '#d0285a'], t, { rows: 6, gap: 10, a: 0.5, seed: 32 });
  sbSchoolShadow(ctx, 760 + 80 * Math.sin(t * 0.4), 1010, t, 12, { seed: 74 });
  sbSeaNear(ctx, t, sea, cam);
}
function sbS2Crew6(c, t, D) { const tc = SB_T2(t), dy = -80 * D.s;
  // captain at the tiller, one hand, a yawn into his beard (10.6 - 11.5)
  const Cp = sbLive(t, 51, { x: -210, y: dy, dir: 1, gaze: [1, -0.1] }); Cp.handR = [60, -120];
  if (t > 10.6) { const y = Math.sin(Math.PI * K.clamp((t - 10.6) / 0.8)); Cp.mouth = y > 0.3 ? 'open' : 'closed'; Cp.talk = y; Cp.lid = Math.max(Cp.lid, 0.4 + 0.5 * y); Cp.tilt = -0.12 * y + lagged((u) => -0.12 * Math.sin(Math.PI * K.clamp((u - 10.6) / 0.8)), tc, 0.12, 0.5); Cp.handL = [20, -170]; }
  sbCaptain(c, Cp);
  // teal fishes off the stern from 9.6 (the line bobs on a slow sine)
  const Tl = sbLive(t, 60, { x: -150, y: dy, dir: -1, gaze: [-0.6, 0.6], sit: 1, seat: 'bench' }); Tl.handR = [60, -110]; const TQ = sbSailor(c, 0, Tl), rh = sbHandW(TQ, 1), tip = [rh[0] - 70, rh[1] - 50];
  seg(c, rh[0], rh[1], tip[0], tip[1], 3, '#a87a4a', 0); c.save(); c.strokeStyle = '#ffffff'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(...tip); c.quadraticCurveTo(tip[0] - 40, tip[1] + 60, tip[0] - 60, 90 + 4 * Math.sin(tc * 2)); c.stroke(); c.restore();
  // rose naps against the bale, cap over his eyes, one foot twitching
  const Rs = sbLive(t, 62, { x: 20, y: dy, dir: 1, sit: 1, seat: 'floor', lid: 1, tip: -0.15, drop: 8, mouth: 'o' }); Rs.sq *= breathe(tc, 62, 0.03); sbSailor(c, 2, Rs);
  if (t > 9.6) { const h = sbPt(Rs, [10, -60]); zzz(c, h[0] + 30, h[1] - 10, t, 9.6); }
  // mustard leans on the rail chewing; leaf (lookout) shades his eyes and points each island out (6.4 - 7.6)
  const Mu = sbLive(t, 61, { x: 120, y: dy, dir: 1, tip: 0.12, gaze: [1, 0.2] }); Mu.handL = [70, -110]; Mu.handR = [64, -100]; Mu.talk = 0.3 * Math.abs(osc(tc, 0.4)); sbSailor(c, 1, Mu);
  const Lf = sbLive(t, 63, { x: 60, y: dy, dir: 1, gaze: [1, -0.3] }); if (t > 6.2 && t < 8.0) { Lf.handL = [30, -200]; Lf.handR = PERSON_HANDS.pointFwd.R; Lf.gaze = gazePlan(SB_T3(t), [[6.2, [1, -0.3]], [6.9, [0.6, -0.2]], [7.4, [1, -0.1]]], 0.15); } sbSailor(c, 3, Lf);
  // Sinbad: walks to the bow (7.76 - 9.0), the open-armed breath (9.0 - 10.3), follows the flying fish (10.3 - 11.3)
  const SX = (u) => kfn(u, [[7.76, 150], [9.0, 230]], 'inOut'), ARMS = [[9.0, 0], [9.3, 0.4], [9.7, 1], [10.1, 1], [10.5, 0.2]];
  const P = sbLive(t, 11, { ...walk(SX, tc, { stride: 26 }), y: dy, dir: 1, mouth: 'smile', gaze: [1, -0.3], wind: -1, lid: 0.2 }, [10.45]);
  if (t < 7.76) { P.dir = -1; P.gaze = [-1, 0]; P.handR = [30, -140]; }
  if (t > 8.9) { const op = sbF(t, ARMS), lag = lagged((u) => flow(u, ARMS), tc, 0.15, 0.6); P.aL = [K.lerp(0.3, 2.0, op), K.lerp(0.2, 2.1, op + lag)]; P.aR = [K.lerp(0.3, 2.0, op), K.lerp(0.2, 2.1, op + lag)]; P.sq *= 1 + 0.04 * op; P.tip -= 0.06 * op; if (op > 0.6) P.lid = 1; }
  else if (t > 8.2) P.handRW = [272, -400 * D.s * 0.6];
  if (t > 10.3) { P.gaze = gazePlan(SB_T3(t), [[10.3, [1, 0.6]], [10.8, [1, 0.2]]], 0.15); P.look = 0.5; }
  sbSin6(c, P);
}
SB_SHOTS.push({ a: 4.96, b: 11.5, cam: sbKeys([[4.96, { x: 500, y: 615, zoom: 1 }], [9.0, { x: 500, y: 615, zoom: 1 }], [11.5, { x: 520, y: 640, zoom: 1.12 }]]), world: sbS2World6 });

// ---------- S3 (11.5 - 19.19): the current: the line swings, streaks, the ship heels, the rock coast rises, tilt up ----------
// the water speeds up from 12.0 (a time warp on the waves: the ship is carried, not sailed)
const sbSoft = (d, r) => (d <= 0 ? 0 : d < r ? d * d / (2 * r) : d - r / 2);
const SB6_TW = (t) => t + 2 * sbSoft(t - 12.0, 0.8);
const SB6_SEA3 = { hz: 600, y: [612, 680, 820, 900], amp: 6, pal: 'day', scroll: 80 };
const SB6_CAM3 = [[11.5, { x: 500, y: 615, zoom: 1 }], [15.2, { x: 500, y: 615, zoom: 1 }], [16.6, { x: 1000, y: 615, zoom: 1 }], [17.1, { x: 1000, y: 615, zoom: 1 }], [18.0, { x: 1000, y: 355, zoom: 1 }], [19.19, { x: 1010, y: 380, zoom: 1.04 }]];
function sbS3Dhow6(t, cam) { const x = 380 + (cam.x - 500), tw = SB6_TW(t), f = sbFloat(x, tw, SB6_SEA3, 2, 200), heel = 0.12 * K.clamp((t - 12.9) / 0.5) * (t > 13.4 ? 0.6 + 0.4 * Math.sin((t - 13.4) * 2.6) : 1); return { x, y: f.y - 2, s: 1.0, pitch: f.rot * 0.5 + heel + lurch(t, 12.9, 0.05), t, sail: 1, billow: t > 12.9 && t < 14 ? -0.4 + 0.3 * Math.sin(tc3(t) * 14) : 0.7 }; }
const tc3 = (t) => SB_T3(t);
function sbS3World6(ctx, t, cam) {
  const tc = SB_T2(t), tw = SB6_TW(t), sea = SB6_SEA3;
  sbSkyTall(ctx, 'day', cam, 600); sbSun(ctx, 300, 190, 46, '#fffbe0', '#ffe0a0', 0.8);
  sbSeaBack(ctx, tw, sea, -200, 2200);
  sbRockCoast(ctx, 1350, 606, 1.0, K.clamp((t - 15.2) / 1.8), t); sbLedgeBirds(ctx, t, 1250, 250, 4, 140, 0.22);
  sbSeaLayer(ctx, 2, tw, sea, -200, 2200);
  const D = sbS3Dhow6(t, cam); D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS3Crew6(q, t, D)); D.cargo = (c) => sbOnDeck(c, D.s, (q) => sbS1Cargo(q, t, D.s)); sbDhow(ctx, D); sbWake(ctx, D.x, D.y, D.s, 1, t, 0.9);
  sbSeaFront(ctx, tw, sea, -200, 2200, { from: 3 });
  sbReflect(ctx, D.x, D.y + 8, 520, ['#a8643a', '#2ab0b0', '#fbf3df', '#d0285a'], t, { rows: 6, gap: 10, a: 0.5, seed: 33 });
  sbCurrentStreaks(ctx, t, cam.x - 600, cam.x + 600, 860, 1180, K.clamp((t - 12.0) / 0.8), { v: 620 });
  sbDolphinLeap(ctx, D.x + 380, D.x + 600, 930, (t - 16.0) / 0.9, 110, 0.5);
  sbSeaNear(ctx, tw, sea, cam);
}
function sbS3Crew6(c, t, D) { const tc = SB_T2(t), dy = -80 * D.s, lu = lurch(t, 12.9, 0.22), grab = (i) => t > 13.6 + stagger(i, 0.15);
  // captain: braces on the tiller with all his weight (14.2 - 15.2); it does not move
  const Cp = sbLive(t, 51, { x: -210, y: dy, dir: 1, gaze: [1, -0.1], tip: lu }); Cp.handR = [60, -120];
  if (t > 14.2) { Cp.handL = [70, -110]; Cp.tip = 0.2 + 0.02 * tremble(t, 1, 8); Cp.brow = -0.7; Cp.mouth = 'frown'; Cp.eyes = 'squint'; }
  sbCaptain(c, Cp);
  // teal stares at his line: it swings round to point ahead (11.5 - 12.1)
  const Tl = sbLive(t, 60, { x: -150, y: dy, dir: -1, gaze: [-0.6, 0.6], sit: grab(1) ? 0 : 1, seat: 'bench', tip: lu }); Tl.handR = [60, -110]; if (t > 11.7) { Tl.eyes = 'wide'; Tl.mouth = 'o'; } if (grab(1)) { Tl.handLW = [-170, -150]; Tl.handR = [40, -170]; }
  const TQ = sbSailor(c, 0, Tl); if (!grab(1)) { const rh = sbHandW(TQ, 1), sw = K.ease.inOut(K.clamp((t - 11.6) / 0.5)), ang = K.lerp(Math.PI * 0.75, Math.PI * 0.15, sw), tip = [rh[0] + Math.cos(ang) * 80, rh[1] - 50];
    seg(c, rh[0], rh[1], tip[0], tip[1], 3, '#a87a4a', 0); c.save(); c.strokeStyle = '#ffffff'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(...tip); c.quadraticCurveTo(tip[0] + Math.cos(ang) * 40, tip[1] + 60, tip[0] + Math.cos(ang) * 120, 90); c.stroke(); c.restore(); }
  // rose wakes at the lurch, cap falling; all four grab rail, rope or mast in turn (13.6 - 14.8)
  const Rs = sbLive(t, 62, { x: 20, y: dy, dir: 1, sit: t < 13.1 ? 1 : 0, seat: 'floor', lid: t < 12.95 ? 1 : undefined, tip: lu, mouth: t > 12.95 ? 'o' : 'closed' }); if (t > 13.0) Rs.eyes = 'wide'; if (grab(2)) { Rs.handRW = [30, -240]; Rs.handLW = [24, -190]; } sbSailor(c, 2, Rs);
  const Mu = sbLive(t, 61, { x: 120, y: dy, dir: 1, tip: 0.12 + lu, gaze: [1, 0.2] }); Mu.handL = [70, -110]; if (grab(0)) { Mu.handR = [80, -150]; Mu.eyes = 'wide'; Mu.sq *= 0.95; } sbSailor(c, 1, Mu);
  const Lf = sbLive(t, 63, { x: 60, y: dy, dir: 1, gaze: [1, -0.3], tip: lu }); if (grab(3)) { Lf.handLW = [30, -300]; Lf.eyes = 'wide'; }
  if (t > 18.1) { Lf.handR = [100 + tremble(t, 4, 9), -160]; Lf.handLW = [30, -300]; Lf.gaze = gazePlan(SB_T3(t), [[18.1, [1, 0.3]], [18.5, [-1, 0]], [18.8, [1, 0.3]]], 0.1); Lf.mouth = 'open'; } sbSailor(c, 3, Lf);
  // Sinbad at the bow: turns eyes, head, body to the mountains (15.2 - 16.4), mouth o (17 - 18), turban tail blown forward
  const P = sbLive(t, 11, { x: 230, y: dy, dir: 1, mouth: 'smile', gaze: [1, 0.3], wind: t > 12.4 ? 0.9 : -0.6, tip: lu }, [15.55]);
  if (t > 12.9) { P.mouth = 'o'; P.handLW = [250, -330]; P.sq *= 0.97; }
  if (t > 15.2) { P.gaze = gazePlan(SB_T3(t), [[15.2, [1, 0.3]], [15.35, [1, -0.6]]], 0.12); P.look = t > 15.5 ? 0.6 : 0; P.brow = -0.4; P.eyes = t > 16.2 ? 'wide' : undefined; }
  if (t > 17.0) { P.gaze = [0.6, -1]; P.mouth = 'o'; P.drop = -4; }
  sbSin6(c, P);
}
function sbS3Over6(ctx, t, cam, S) { if (t > 12.5 && t < 14.4) { const k = K.clamp((t - 12.5) / 0.3), x = 220 + 420 * K.clamp((t - 12.5) / 1.6); sbTag(ctx, S, 'THE CURRENT', 300, 1050, t, 12.5, 14.1, { size: 46 }); S.arrow(ctx, [x - 120, 1120], [x + 80, 1120], k, { bend: 0 }); } }
SB_SHOTS.push({ a: 11.5, b: 19.19, cam: sbKeys(SB6_CAM3), world: sbS3World6, over: sbS3Over6 });

// ---------- S4 (19.19 - 26.48): HARD TO PORT!, too slow, CRASH!, the mast, the hull in two, six jump clear ----------
// 19.19 - 22.04: deck medium (zoom 1.25) on the captain; 22.04: cut wide, the rocks ahead; 23.52 impact frame; pull out to 0.9
const SB6_SEA4 = { hz: 600, y: [612, 680, 820, 900], amp: 12, pal: 'day', scroll: 80 };
const SB6_D4X = (t) => (t < 22.04 ? 520 : kfn(t, [[22.04, 240], [23.52, 560]], 'in'));
function sbS4Dhow6(t) { const tw = SB6_TW(t), x = SB6_D4X(t), f = sbFloat(x, tw, SB6_SEA4, 2, 200), swingR = t < 22.04 ? -0.05 * K.ease.inOut(K.clamp((t - 20.6) / 1.4)) : -0.06, rise = t > 22.4 && t < 23.52 ? -40 * Math.sin(Math.PI * (t - 22.4) / 1.12) : 0;
  const wreck = t < 24.2 ? 0 : t < 25.0 ? 0.5 : 1; return { x, y: f.y - 2 + rise, s: 1.0, pitch: f.rot * 0.5 + 0.06 + swingR + (t > 23.52 ? 0.18 * Math.exp(-(t - 23.52) * 3) * Math.cos((t - 23.52) * 14) : 0), t, sail: 1, billow: 0.5, wreck, mastFall: K.ease.in(K.clamp((t - 24.3) / 0.6)), halves: [{ dx: -60 * K.ease.out(K.clamp((t - 25.08) / 0.9)), dy: 30 * K.clamp((t - 25.08) / 1.2), rot: -0.25 * K.ease.out(K.clamp((t - 25.08) / 0.9)) }, { dx: 70 * K.ease.out(K.clamp((t - 25.08) / 0.9)), dy: 20 * K.clamp((t - 25.08) / 1.2), rot: 0.2 * K.ease.out(K.clamp((t - 25.08) / 0.9)) }] }; }
// the six who jump clear: [lx (deck), jump start, who] - captain last after pushing the youngest
const SB6_JUMP = [[180, 25.3, 'mu'], [120, 25.5, 'lf'], [-40, 25.65, 'sin'], [20, 25.8, 'tl'], [-120, 26.0, 'rs'], [-200, 26.2, 'cp']];
function sbS4World6(ctx, t, cam) {
  const tw = SB6_TW(t), sea = SB6_SEA4, wide = t >= 22.04;
  sbSkyTall(ctx, 'day', cam, 600); if (wide) sbRockCoast(ctx, 1050, 606, 1.25, 1, t); else sbRockCoast(ctx, 1350, 606, 1.0, 1, t);
  sbSeaBack(ctx, tw, sea, -400, 2000); sbSeaLayer(ctx, 2, tw, sea, -400, 2000);
  const D = sbS4Dhow6(t);
  if (wide) sbRockTeeth(ctx, 640, 900, 830, t, { seed: 79, s: 1.2 });
  D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS4Crew6(q, t, D)); D.cargo = (c) => sbOnDeck(c, D.s, (q) => { if (t < 25.0) sbS1Cargo(q, t, D.s); });
  if (D.wreck > 0) sbDhowWreck(ctx, D); else sbDhow(ctx, D);
  // jumpers in the air and their splashes
  for (const [lx, t0, who] of SB6_JUMP) { const u = (t - t0) / 0.5, a = sbDhowPt(D, lx, -80); if (u > 0 && u < 1) { const x = a[0] + (lx < 0 ? -90 : 90) * u, y = K.lerp(a[1], 860, u) - 70 * Math.sin(Math.PI * u); sbS4Jumper(ctx, who, t, x, y, u); }
    if (u > 1 && u < 2.2) { const x = a[0] + (lx < 0 ? -90 : 90); sbSplash(ctx, x, 860, (u - 1) / 1.0, 0.7); sbRing(ctx, x, 864, (u - 1) / 1.2, 70); } }
  // debris floating out (25.0 -)
  if (t > 25.0) { const k = t - 25.0; [['plank', -160, 0.8], ['barrel', -60, 1.2], ['bale', 40, 0.6], ['crate', 120, 1.0], ['plank', 220, 1.4], ['barrel', 280, 0.9]].forEach(([kind, dx, v], i) => { const x = D.x + dx + Math.sign(dx || 1) * v * 50 * k, f = sbFloat(x, tw, sea, 3, 30); sbDebris(ctx, kind, x, f.y + 6, f.rot + 0.2 * i, 0.8); }); }
  if (wide) sbRockTeeth(ctx, 700, 980, 880, t, { seed: 80, n: 4, s: 0.9 });
  sbSeaFront(ctx, tw, sea, -400, 2000, { from: 3 });
  sbReflect(ctx, D.x, D.y + 8, 520, ['#a8643a', '#2ab0b0', '#fbf3df'], t, { rows: 5, gap: 10, a: 0.45, seed: 34 });
  sbCurrentStreaks(ctx, t, cam.x - 700, cam.x + 700, 880, 1180, wide && t < 24 ? 1 : 0.6, { v: 620 });
  sbSeaNear(ctx, tw, sea, cam);
}
function sbS4Jumper(ctx, who, t, x, y, u) { const P = sbLive(t, 70 + who.length, { x, y, dir: x > 500 ? 1 : -1, aL: [2.4, 2.6], aR: [2.4, 2.6], mouth: 'o', eyes: 'wide', gaze: [0, 1], tip: 0.3 * (u - 0.5) });
  if (who === 'sin') sbSin6(ctx, { ...P, wind: 1 }); else if (who === 'cp') sbCaptain(ctx, P); else sbSailor(ctx, { mu: 1, lf: 3, tl: 0, rs: 2 }[who], P); }
function sbS4Crew6(c, t, D) { const tc = SB_T2(t), dy = -80 * D.s, hit = t >= 23.52, thrown = hit ? 30 * K.ease.out(K.clamp((t - 23.52) / 0.2)) : 0, isq = impactSquash(tc, 23.52, 0.85);
  const gone = (lx) => { const j = SB6_JUMP.find((q) => q[0] === lx); return t >= j[1]; };
  // captain: breath in (anticipate) then the heave on the tiller (19.19 - 20.4); arm across the young sailor (22.4 -)
  if (!gone(-200)) { const Cp = sbLive(t, 51, { x: -200 + thrown, y: dy, dir: 1, gaze: [1, -0.1] }); Cp.sq *= anticipate(tc, 19.19, 0.3, 0.06) * isq; Cp.handR = [60, -120]; Cp.handL = [70, -110];
    if (t > 19.49 && t < 20.6) { Cp.tip = -0.2; Cp.mouth = 'open'; Cp.talk = sbTalk(t, 19.5, 20.6, 3); Cp.brow = -0.6; }
    if (t > 22.4) { Cp.handRW = [-120 + thrown, -160]; Cp.gaze = [1, -0.2]; Cp.eyes = 'wide'; } if (t > 25.9) { Cp.handRW = [-80, -160]; Cp.tip = 0.2; } sbCaptain(c, Cp); }
  // teal and mustard haul the sheet hand over hand (19.8 - 21.0), never together; rose and leaf push the yard
  [[0, 20, 'tl'], [1, 180, 'mu'], [2, -120, 'rs'], [3, 120, 'lf']].forEach(([i, lx, key]) => { if (gone(lx)) return; const P = sbLive(t, 60 + i, { x: lx + thrown, y: dy, dir: i < 2 ? -1 : 1, gaze: [i < 2 ? -0.5 : 1, -0.4] }); P.sq *= isq;
    if (t > 19.8 && t < 22.4) { const h = osc(tc + stagger(i, 0.17), 0.45); if (i < 2) { P.handL = [40, -150 + 30 * h]; P.handR = [50, -180 - 30 * h]; P.tip = -0.12; P.x += 3 * Math.sin(tc * 13 + i); } else { P.handL = [80, -200]; P.handR = [90, -180]; P.tip = 0.2; } }
    if (t > 22.4) { P.handLW = [lx + 10, -150]; P.eyes = 'wide'; P.mouth = 'o'; }
    sbSailor(c, i, P); });
  // Sinbad throws his weight on the sheet beside them (20.6 -)
  if (!gone(-40)) { const P = sbLive(t, 11, { x: -40 + thrown, y: dy, dir: -1, gaze: [-0.6, -0.4], wind: 0.8 }); P.sq *= isq; if (t > 20.6) { const h = osc(tc + 0.3, 0.45); P.handL = [40, -150 + 30 * h]; P.handR = [50, -180 - 30 * h]; P.tip = -0.16; P.brow = -0.6; P.mouth = 'frown'; }
    if (t > 22.4) { P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [1, 0]; } sbSin6(c, P); }
}
function sbS4Over6(ctx, t, cam, S) {
  if (t > 19.95 && t < 21.5) { const p = sbWP(sbDhowPt(sbS4Dhow6(t), -200, -300), cam); sbSay(ctx, S, [[20.0, 'HARD TO PORT!']], t, 330, 230, [p[0], p[1]], { gone: 21.3, size: 50 }); }
  if (t > 22.04 && t < 23.4) { S.arrow(ctx, [220, 1080], [600, 960], K.clamp((t - 22.1) / 0.5), { bend: -0.1 }); }
  if (t >= 23.52 && t < 24.3) S.emphasis(ctx, ...sbP(700, 760, cam), 220, K.clamp((t - 23.52) / 0.78), { word: 'CRASH!', rect: [0, 0, 1000, 1230] });
}
SB_SHOTS.push({ a: 19.19, b: 26.48, cam: (t) => (t < 22.04 ? K.camAt([[19.19, { x: 480, y: 620, zoom: 1.25 }], [22.04, { x: 470, y: 620, zoom: 1.25 }]], t) : K.camAt([[22.04, { x: 560, y: 560, zoom: 1.0 }], [24.6, { x: 600, y: 560, zoom: 1.0 }], [26.48, { x: 640, y: 540, zoom: 0.9 }]], t)), world: sbS4World6, over: sbS4Over6 });
