// ===== SIND-01 shots S1-S4 (0 - 31.72 s): the Baghdad quay and the goodbye, three days at sea, LAND!, the skiffs and the captain =====

// ---------- S1 + S2 (0 - 15.06): one continuous shot on the Baghdad quay, morning ----------
const SB_Q1SEA = { hz: 620, y: [632, 700, 945, 1030], amp: 5, pal: 'morning', swells: [{ x0: 1700, v: -300, t0: 4.22, t1: 5.7, h: 12, w: 130 }] };
const SB_Q1CAM = [[0, { x: 1150, y: 495, zoom: 1.25 }], [1.6, { x: 1130, y: 640, zoom: 1.1 }], [5.84, { x: 1150, y: 640, zoom: 1.1 }], [6.6, { x: 900, y: 650, zoom: 1.15 }], [7.2, { x: 890, y: 650, zoom: 1.15 }],
  [7.9, { x: 850, y: 700, zoom: 1.45 }], [8.3, { x: 850, y: 700, zoom: 1.45 }], [8.7, { x: 860, y: 650, zoom: 1.15 }], [10.8, { x: 900, y: 650, zoom: 1.15 }], [12.4, { x: 1380, y: 640, zoom: 1.0 }], [13.95, { x: 1380, y: 640, zoom: 1.0 }], [15.06, { x: 1420, y: 640, zoom: 1.0 }]];
const SB_GANG = { a: [1092, 900], b: [1528, 800] };
const sbGangY = (x) => K.lerp(SB_GANG.a[1], SB_GANG.b[1], K.clamp((x - SB_GANG.a[0]) / (SB_GANG.b[0] - SB_GANG.a[0])));
// Sinbad on the quay: x path and the moments he is airborne
const SB_S1X = (t) => kfn(t, [[5.84, 1000], [6.1, 935], [6.3, 900], [10.86, 900], [11.5, 990], [11.56, 990], [12.8, 1500]], 'inOut');
const SB_DHOWX = (t) => kfn(t, [[14.2, 1660], [15.06, 1740]], 'in');
// the three chests: start on the quay floor, lifted into a stack at x 860 (s 0.8: 64 high), the top two carried aboard by the sailors
const SB_CH = [{ from: [760, 900], at: 6.0, to: [820, 900] }, { from: [945, 900], at: 6.75, to: [820, 836] }, { from: [985, 900], at: 7.35, to: [820, 772] }];
function sbChestPos(i, t) { const c = SB_CH[i], d = 0.42, u = K.clamp((t - c.at) / d), e = K.ease.inOut(u); let x = K.lerp(c.from[0], c.to[0], e), y = K.lerp(c.from[1], c.to[1], e) - 70 * Math.sin(Math.PI * u), sq = 1;
  if (t > c.at + d) sq = impactSquash(t, c.at + d, 0.86); return [x, y, sq, u > 0 && u < 1]; }
function sbS1World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_Q1SEA, dx = SB_DHOWX(t), moored = t < 14.2;
  sbHarbourQuay(ctx, 'baghdad', t, cam, sea, { sun: (c) => sbSun(c, 1760, 250, 50, '#fff6c8', '#ffd0a0', 0.8), far: (c) => {
    if (t > 2.3 && t < 4.2) { const u = (t - 2.3) / 1.9; c.save(); c.globalAlpha = Math.min(1, u * 4, (1 - u) * 4); sbDhow(c, { x: 1250 + u * 260, y: 634, s: 0.12, t, far: true }); c.restore(); }   // far sail on the horizon
    sbGulls(c, t, 600, 260, 40, 3, 1, 0.34); } });
  if (t > 9.6 && t < 11.2) sbGlint(ctx, 520, 258, 40, (t - 9.9) / 0.6);   // the gold dome glints behind the father
  // the dhow at its berth (it eases away at the end), the captain at the rail, two sailors at work
  const f = sbFloat(dx, t, sea, 2, 200), ds = SB_QUAY.dhowS, sail = K.clamp(SB_T2(t - 13.95) / 0.42);
  const D = { x: dx, y: f.y - 2, s: ds, pitch: f.rot * 0.4, t, sail: t < 13.95 ? 0 : sail, billow: 0.6, crew: (c) => sbOnDeck(c, ds, (q) => sbS1Crew(q, t, ds)) };
  sbDhow(ctx, D);
  // mooring rope from the bollard to the bow, thrown off at 14.1
  const bowW = sbDhowPt(D, 240, -150), bol = [1080, 862];
  if (t < 14.1) { ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bol[0], bol[1]); ctx.quadraticCurveTo((bol[0] + bowW[0]) / 2, Math.max(bol[1], bowW[1]) + 40, bowW[0], bowW[1]); ctx.stroke(); ctx.restore(); }
  else if (t < 14.7) { const u = (t - 14.1) / 0.6; ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bowW[0], bowW[1]); ctx.quadraticCurveTo(bowW[0] - 60, bowW[1] - 60 * Math.sin(Math.PI * u), bowW[0] - 140 * u, bowW[1] + 40 * u); ctx.stroke(); ctx.restore(); }
  sbQuayWater(ctx, t, sea, 0, 2300);
  // the whale's shadow glides right to left under the gangplank (the audience sees it; Sinbad never looks down); rev 1: larger, darker
  if (t > 4.1 && t < 5.9) { const u = (t - 4.1) / 1.8; ctx.save(); ctx.beginPath(); ctx.rect(1112, 958, 1400, 400); ctx.clip(); sbWhale(ctx, K.lerp(2000, 900, u), 1010, { s: 0.7, dir: -1, silhouette: 0.55 * Math.min(1, 1.6 * Math.sin(Math.PI * u)) }); ctx.restore(); }
  for (const [x, t0] of [[1240, 5.0], [1300, 5.35]]) { const u = (t - t0) / 1.6; sbRing(ctx, x, 955, u, 120, { a: 0.7 }); }
  // the gangplank (bends under each footfall), drawn in front of the hull
  const bend = kick(t, SB_FALLS1, 6, 9, 8) + (t > 11.4 && t < 13.2 ? 4 : 0);
  if (t < 14.0) { ctx.save(); ctx.lineCap = 'round'; const mx = (SB_GANG.a[0] + SB_GANG.b[0]) / 2, my = (SB_GANG.a[1] + SB_GANG.b[1]) / 2 + bend;
    ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(...SB_GANG.a); ctx.quadraticCurveTo(mx, my, ...SB_GANG.b); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke();
    for (let k = 1; k < 8; k++) { const u = k / 8, x = K.lerp(SB_GANG.a[0], SB_GANG.b[0], u), y = K.lerp(SB_GANG.a[1], SB_GANG.b[1], u) + bend * 4 * u * (1 - u); seg(ctx, x - 1, y - 6, x + 1, y + 6, 2, '#8a5a30', 0); } ctx.restore(); }
  // the crate he sits on, the chests
  celShade(ctx, K.rectPts(968, 852, 64, 48), '#c08a52', '#8a5a30', { light: [-1, -1], off: 8, lw: 3 }); seg(ctx, 970, 876, 1030, 876, 3, '#8a5a30', 0);
  sbS1Chests(ctx, t);
  sbS1Family(ctx, t);
  sbS1Sailors(ctx, t, 'quay');
  // Sinbad (on the quay and the gangplank; on deck he is drawn with the crew)
  if (t < 12.86) sbSinbad(ctx, sbS1Sin(t));
  // a gull perched on the bollard lifts off as the shadow passes
  const gu = K.clamp((t - 5.02) / 1.2); sbGull(ctx, 1080 + 260 * gu * gu, 852 - 300 * gu, t, { fly: gu > 0, flap: gu > 0 ? undefined : 0, s: 0.34, dir: gu > 0 ? 1 : -1, beak: t > 5.0 && t < 5.4 ? 1.2 : 0, seed: 7 });
  // the low gull that takes the crumb
  if (t > 2.4 && t < 4.6) { const u = (t - 2.4) / 2.2, gx = K.lerp(1560, 760, u), gy = 760 - 200 * Math.sin(Math.PI * u) - 60 * u; sbGull(ctx, gx, gy, t, { dir: -1, s: 0.4, seed: 3, beak: t > 3.5 && t < 3.75 ? 1 : 0 }); }
  if (t > 3.15 && t < 3.62) { const u = (t - 3.15) / 0.47, h = sbS1Sin(3.15), hx = 1040, x = K.lerp(hx, 1160, u), y = K.lerp(800, 600, u) - 160 * Math.sin(Math.PI * u) * 0.5; sbBlob(ctx, x, y, 6, 4, '#e8c890', '#b89050', { lw: 1.5, off: 2 }); }
}
const SB_FALLS1 = footfalls((t) => SB_S1X(t), 11.56, 12.8, 30);
function sbS1Sin(t) {
  const tc = SB_T2(t), x = SB_S1X(t), P = sbAlive(t, 11, { x, y: 900, dir: 1, mouth: 'smile', wind: -0.3 });
  P.lid = sbLid(t, 11, [2.42, 5.12, 9.0, 12.3], 0);
  if (t < 5.84) { // on the crate: chin on fist, the breath of sea air, the crumb, the shrug
    P.x = 1000 + 22 * 0.95; P.sit = 1; P.seat = 'bench'; P.gaze = [1, -0.1]; P.lid = Math.max(P.lid, t < 1.96 ? 0.25 : 0);
    if (t < 1.96) { P.handR = PERSON_HANDS.chin.R; P.tip += -0.04; P.handL = [-30, -96]; }
    else if (t < 3.1) { const arms = sbF(t, [[1.96, 0], [2.3, 1], [2.9, 1], [3.1, 0.3]]), lag = arms + lagged((u) => flow(u, [[1.96, 0], [2.3, 1], [2.9, 1], [3.1, 0.3]]), tc, 0.17, 0.6);
      P.aL = [K.lerp(0.2, 2.2, arms), K.lerp(0.1, 2.6, lag)]; P.aR = [K.lerp(0.2, 2.2, arms), K.lerp(0.1, 2.5, lag)]; P.sq *= anticipate(tc, 1.96, 0.2, 0.04) * (1 + 0.04 * pulse(tc, 2.16, 0.8)); P.tip += 0.08 * arms;
      if (t > 2.05 && t < 2.55) P.lid = 1; P.wet = t > 2.6; P.gaze = look(tc, [1040, 700], [[0, [1500, 600]], [2.6, [K.lerp(1560, 760, (2.7 - 2.4) / 2.2), 700]]]); }
    else if (t < 4.2) { const fl = sbF(t, [[3.1, 0], [3.2, -0.4], [3.35, 1], [3.6, 0.6], [4.1, 0]]); P.handR = [40 + 20 * fl, -120 - 70 * fl]; P.handL = [-30, -96]; P.gaze = [0.5, -0.9]; P.mouth = t > 3.6 && t < 3.95 ? 'open' : 'smile'; }
    else { P.gaze = t > 5.05 && t < 5.4 ? [0.6, -0.4] : [0.8, -0.7]; P.handL = [-30, -96]; P.handR = [40, -110];
      if (t > 5.1) { const sh = pulse(tc, 5.1, 0.6); P.aL = [0.3 + 1.1 * sh, 0.3 + 1.3 * sh]; P.aR = [0.3 + 1.1 * sh, 0.3 + 1.3 * sh]; delete P.handL; delete P.handR; P.brow = -0.3 * sh; P.drop = 4 * sh; P.mouth = sh > 0.3 ? 'closed' : 'smile'; } }
    return P; }
  // hops off the crate, lands, steps to the chests
  if (t < 6.3) { const [hx, lift] = hop(t, 5.84, 0.26, 1000, 935, 30); P.x = t < 6.1 ? hx : x; P.y = 900 - lift; P.sq *= landSquash(tc, 6.1, 0.12); P.dir = -1; P.gaze = [-1, 0.4]; P.amp = 0; }
  else if (t < 10.86) { P.dir = -1; P.gaze = [-0.6, 0.3]; P.mouth = 'smile';
    // lifting the chests: both hands on the moving chest, weight back, knees give (sq) on each set-down
    for (let i = 0; i < 3; i++) { const c = SB_CH[i]; if (t > c.at - 0.2 && t < c.at + 0.55) { const [cx, cy] = sbChestPos(i, t); P.handLW = [cx - 30, cy - 40]; P.handRW = [cx + 30, cy - 40]; P.tip -= 0.08 * Math.sin(Math.PI * K.clamp((t - c.at + 0.2) / 0.75)); P.sq *= 1 - 0.05 * pulse(tc, c.at + 0.4, 0.2); } }
    if (t > 6.55 && t < 6.8) { P.handLW = [850, 790]; P.handRW = [860, 780 - 10 * Math.abs(osc(tc, 0.12))]; }   // claps the dust off
    if (t > 7.15 && t < 7.4) P.handR = PERSON_HANDS.headHold.R;                                                // wipes his brow
    if (t > 7.85 && t < 8.3) { const sl = sbF(t, [[7.85, 0], [8.0, -0.5], [8.08, 1], [8.3, 0.8]]); P.handRW = [820 + 6 * sl, 760 - 70 * (1 - Math.abs(sl))]; P.sq *= anticipate(tc, 7.9, 0.12, 0.05); P.tip += 0.05 * pulse(tc, 8.08, 0.3); }   // the star seal
    if (t > 7.6 && t < 7.86) { P.handLW = [795, 765]; P.handRW = [845, 765]; }   // ties the band
    if (t > 8.26) { P.gaze = look(tc, [905, 700], [[8.26, [600, 760]], [9.2, [820, 720]]]); P.lid = sbLid(t, 11, [8.3, 10.15], 0); }
    if (t > 9.22 && t < 10.1) { P.handLW = [860 + 6 * Math.abs(osc(tc, 0.35)), 760]; P.mouth = 'smile'; P.tip -= 0.04; }   // pats mother's back
    if (t > 10.12) { P.drop = 4; P.handR = PERSON_HANDS.chest.R; P.gaze = [-0.4, -0.5]; } }
  else if (t < 11.56) { P.dir = -1; Object.assign(P, walk(SB_S1X, tc, { stride: 26 })); const w = sbF(t, [[10.86, 0], [11.0, 1], [11.5, 1]]); P.aR = [2.6 * w + 0.2, 2.9 * w + 0.4 * osc(tc, 0.3) * w]; P.gaze = [-1, -0.2]; }
  else { Object.assign(P, walk(SB_S1X, tc, { stride: 26 })); P.y = sbGangY(P.x) + kick(t, SB_FALLS1, 2, 9, 8); P.dir = 1; P.tip += 0.08; P.gaze = t > 12.2 && t < 12.5 ? [-1, -0.2] : [1, -0.2]; P.wind = -0.6; }
  return P;
}
function sbS1Chests(ctx, t) {
  for (let i = 0; i < 3; i++) { if (i > 0 && t > 10.95) continue; const [x, y, sq] = sbChestPos(i, t), top = i === 2, band = top && t > 7.62, seal = top && t > 8.08;
    sbChest(ctx, x, y, { s: 0.8, sq, band: band ? SB_ACC : null, seal: seal ? 'star' : null });
    if (top && band && t < 7.86) { ctx.save(); ctx.fillStyle = SB_ACC; ctx.fillRect(x - 6, y - 64, 12, 64 * K.clamp((t - 7.62) / 0.24)); ctx.restore(); }
    if (top && t > 8.1 && t < 8.8) sbGlint(ctx, x + 10, y - 40, 36, (t - 8.1) / 0.7); }
}
// the family: mother (quick short steps), father (slow, stooped), sister (skipping); never in step
const SB_FAMX = { mother: (t) => kfn(t, [[8.2, 560], [9.0, 760], [9.3, 850], [10.1, 850], [10.3, 790], [12.9, 790], [13.9, 820]]), father: (t) => kfn(t, [[8.2, 470], [9.4, 690], [10.0, 690], [10.3, 830], [10.9, 830], [11.2, 720]]),
  sister: (t) => kfn(t, [[8.3, 600], [9.0, 820], [9.3, 980], [10.3, 980], [10.6, 760], [12.9, 760], [13.9, 1060]]) };
function sbS1Family(ctx, t) {
  if (t < 8.2) return; const tc = SB_T2(t), sin = sbS1Sin(t);
  for (const [who, seed, stride] of [['father', 31, 22], ['mother', 32, 18], ['sister', 33, 16]]) {
    const xf = SB_FAMX[who], P = sbAlive(t, seed, { x: xf(t), y: 900, dir: speed(xf, t) < -1 ? -1 : 1, ...walk(xf, tc, { stride }), mouth: 'smile', gaze: lookAt([xf(t), 700], [sin.x, 700]) });
    if (who === 'sister') { P.y -= Math.abs(Math.sin(P.ph || 0)) * 12 * (P.amp || 0); if (t > 9.3 && t < 10.2) { P.dir = -1; P.handLW = [sin.x + 26, 815]; P.gaze = [-0.3, -1]; P.tip -= 0.12; } }
    if (who === 'mother' && t > 9.25 && t < 10.15) { P.handLW = [sin.x - 20, 735]; P.handRW = [sin.x + 18, 740]; P.wet = true; P.lid = 0.5; P.tip += 0.12; }
    if (who === 'mother' && t > 10.15) { P.wet = true; P.handR = PERSON_HANDS.cheeks.R; }
    if (who === 'father' && t > 10.12 && t < 10.9) { P.handRW = [sin.x - 16, 735]; P.handL = [-50, -150 - 20 * sbF(t, [[10.12, 0], [10.4, 1], [10.9, 1]])]; P.lid = sbLid(t, 31, [10.5]); P.tip += 0.02 * Math.sin(tc * 9); }
    // the waves from the quay (12.86 on): each on its own beat
    if (t > 12.86) { const k = who === 'mother' ? 0.13 : who === 'father' ? 0.3 : 0, w = osc(tc + k, who === 'sister' ? 0.35 : 0.6); P.dir = 1; P.gaze = [1, -0.4];
      if (who === 'mother') P.handR = [30 + 8 * w, -175]; else if (who === 'father') P.handR = [44, -186 - 6 * w]; else { P.aL = [2.6 + 0.3 * w, 2.9]; P.aR = [2.6 - 0.3 * w, 2.9]; P.mouth = 'open'; } }
    sbFamily(ctx, who, P); }
}
// two sailors: wait by the bollards, then carry the top two chests up the gangplank (bent under the weight, out of step)
const SB_SAILX = [(t) => kfn(t, [[10.3, 1180], [10.95, 850], [11.15, 850], [12.4, 1500]]), (t) => kfn(t, [[10.45, 1200], [11.1, 870], [11.3, 870], [12.7, 1480]])];
function sbS1Sailors(ctx, t) {
  if (t < 10.3 || t > 12.75) return; const tc = SB_T2(t);
  for (let i = 0; i < 2; i++) { const xf = SB_SAILX[i], x = xf(t), carry = t > 11.05 + i * 0.15, P = sbAlive(t, 41 + i, { x, y: x > SB_GANG.a[0] ? sbGangY(x) : 900, dir: speed(xf, t) < -1 ? -1 : 1, ...walk(xf, tc, { stride: 22 }), gaze: [1, 0] });
    if (carry) { P.tip += 0.12; P.sq *= 0.97; P.handL = [30, -205]; P.handR = [60, -205]; }
    if (carry) { const h = sbPt(P, [45, -215], false); sbChest(ctx, h[0], h[1] + 4, { s: 0.7, band: i === 0 ? SB_ACC : null, seal: i === 0 ? 'star' : null, rot: 0.08 * Math.sin(tc * 6 + i) }); }
    sbSailor(ctx, i, P); }
}
// the captain and crew on deck (world-scale units inside the hull: deck y = -80 * ds)
function sbS1Crew(c, t, ds) {
  const tc = SB_T2(t), dy = -80 * ds;
  // the captain: hand on chest, then points to the bow
  const C = sbAlive(t, 51, { x: 20 * ds, y: dy, dir: -1, gaze: [-1, 0.2] });
  if (t > 12.04) { C.handR = t < 12.5 ? PERSON_HANDS.chest.R : [-90, -150]; C.dir = t < 12.5 ? -1 : 1; C.gaze = t < 12.5 ? [-1, 0.2] : [1, 0]; C.lid = sbLid(t, 51, [12.45]); C.tip += 0.05 * pulse(tc, 12.1, 0.5); }
  if (t > 13.0) { C.dir = 1; C.handR = PERSON_HANDS.cupMouth.R; C.gaze = [1, -0.2]; }
  sbCaptain(c, C);
  // two deck hands haul the halyard as the sail drops
  for (let i = 2; i < 4; i++) { const P = sbAlive(t, 60 + i, { x: (i === 2 ? 120 : 175) * ds, y: dy, dir: -1, gaze: [-0.3, -1] }); const h = osc(tc + i * 0.2, 0.5) * (t > 13.9 ? 1 : 0.15);
    P.handL = [10, -200 + 20 * h]; P.handR = [20, -170 - 20 * h]; sbSailor(c, i, P); }
  // the sailors who carried the chests set them down by the mast
  if (t > 12.4) { sbChest(c, 60 * ds, dy, { s: 0.7, band: SB_ACC, seal: 'star' }); sbChest(c, 100 * ds, dy, { s: 0.7 }); }
  // Sinbad hops onto the deck and waves from the stern
  if (t >= 12.86) { const [hx, lift] = hop(t, 12.86, 0.3, -122 * ds, -110 * ds, 24), P = sbAlive(t, 11, { x: hx, y: dy - lift, dir: t < 13.2 ? 1 : -1, mouth: 'smile', gaze: [-1, -0.1] });
    P.sq *= landSquash(tc, 13.16, 0.12); const w = osc(tc, 0.45); if (t > 13.2) { P.aR = [2.5 + 0.35 * w, 2.8 + 0.3 * w]; P.handL = [-30, -100]; } P.wind = -0.4; sbSinbad(c, P); }
}
function sbS1Over(ctx, t, cam, S) {
  // chrome title in the sky, with the Arabic episode title in Lalezar; flickers off by 3.0
  if (t > 0.3 && t < 3.0) { const off = t > 2.55 ? [1, 0, 1, 0, 0, 0][Math.min(5, Math.floor((t - 2.55) * 12))] : 1;
    if (off) { const dy = 0; S.title(ctx, 'THE ISLAND', 500, 170 + dy, K.clamp((t - 0.3) / 0.9), { size: 92, align: 'center' }); S.title(ctx, 'THAT MOVED', 500, 270 + dy, K.clamp((t - 0.45) / 0.9), { size: 92, align: 'center' });
      if (t > 0.9) S.title(ctx, 'الجزيرة التي تحركت', 500, 390 + dy, K.clamp((t - 0.9) / 0.9), { size: 70, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); } }
  if (t > 1.2 && t < 2.9) { const [x, y] = sbP(1020, 640, cam); sbTag(ctx, S, 'SINBAD', x, y - 40, t, 1.3, 2.7, { size: 42 }); }
}
SB_SHOTS.push({ a: 0, b: 15.06, ww: 2200, cam: (t) => K.camAt(SB_Q1CAM, t), world: sbS1World, over: sbS1Over });

// ---------- S3 (15.06 - 24.9): three days at sea, the lookout, LAND!, the island on the horizon ----------
// the ship holds still in the world at x 400; the water and the clouds slide (a tracking shot). Sky repainted per day.
const SB_S3SKY = [[15.06, 'day'], [16.9, 'day'], [17.35, 'sunset'], [17.85, 'night'], [18.9, 'night'], [19.3, 'dawn'], [20.2, 'day']];
function sbSkyAt(t, keys) { for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const [t0, a] = keys[i - 1], [t1, b] = keys[i], u = K.clamp((t - t0) / Math.min(0.5, t1 - t0)); return a === b ? [[a, 1]] : [[a, 1], [b, u]]; } return [[keys[keys.length - 1][1], 1]]; }
function sbS3Sea(t) { const sk = sbSkyAt(t, SB_S3SKY), amp = t > 18.3 && t < 19.2 ? 3 : 6; return { hz: 600, y: [615, 700, 820, 905], amp, scroll: 150, pal: sk[0][0], pal2: sk[1] ? sk[1][0] : null, mix: sk[1] ? sk[1][1] : 0 }; }
const SB_S3CAM = [[15.06, { x: 500, y: 615, zoom: 1.0 }], [23.3, { x: 500, y: 615, zoom: 1.0 }], [24.4, { x: 920, y: 615, zoom: 1.0 }], [24.9, { x: 930, y: 615, zoom: 1.0 }]];
const SB_ISLE3 = { x: 1120, s: (t) => kfn(t, [[24.06, 0.22], [24.9, 0.4]], 'inOut') };
function sbS3World(ctx, t, cam) {
  const tc = SB_T2(t), sea = sbS3Sea(t), sk = sbSkyAt(t, SB_S3SKY);
  sbSky(ctx, sk, cam, { par: 0.92, dx: -((t * 18) % 600) });
  // sun and moon on their arcs
  const sunA = t < 17.4 ? kfn(t, [[15.06, 0.35], [17.4, 1.05]]) : null, moonA = t > 17.4 && t < 19.4 ? kfn(t, [[17.5, -0.05], [19.3, 0.7]]) : null;
  if (sunA != null) sbSun(ctx, 840 + 20 * sunA, 150 + 470 * Math.pow(sunA, 2), 46, '#fff6c8', t > 16.9 ? '#ff9a6a' : '#ffe0a0', 0.8);
  if (moonA != null) sbMoon(ctx, 760 - 200 * moonA, 560 - 360 * Math.sin(Math.PI * Math.min(1, moonA + 0.3)), 40, 1);
  if (t > 19.1) { const u = K.clamp((t - 19.1) / 1.3); sbSun(ctx, 760, 600 - 130 * K.ease.out(u), 50, '#fff1b0', '#ffb070', 1); }
  sbSeaBack(ctx, t, sea, 0, 2000);
  if (moonA != null) sbLightPath(ctx, t, 760 - 200 * moonA, 602, 815, 70, '#fff2c8', 0.7);
  if (t > 19.1 && t < 22) sbLightPath(ctx, t, 760, 602, 815, 80, '#ffe0a0', 0.8 * K.clamp((t - 19.2) / 0.6));
  // the island on the horizon: only its cap above the water; hazy first, sharpening as it nears
  if (t > 22.6) { const s = SB_ISLE3.s(t), wl = seaY(SB_ISLE3.x, t, 0, sea); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 3000, wl + 2); ctx.clip(); sbWhale(ctx, SB_ISLE3.x, wl - 80 * s + 4, { s, dress: 1, t, lid: 1, sway: 0.5 }); ctx.restore();
    sbFoamLine(ctx, [[SB_ISLE3.x - 660 * s, wl], [SB_ISLE3.x - 300 * s, wl + 2], [SB_ISLE3.x + 300 * s, wl + 2], [SB_ISLE3.x + 660 * s, wl]], t, { w: 6 });
    const hz = 1 - K.clamp((t - 23.6) / 1.2); if (hz > 0) { ctx.save(); ctx.globalAlpha = 0.55 * hz; ctx.fillStyle = '#e8f6fa'; ctx.fillRect(SB_ISLE3.x - 400, wl - 200, 800, 204); ctx.restore(); } }
  // flying fish beside the bow
  for (let i = 0; i < 3; i++) { const t0 = 17.86 + i * 0.22, u = (t - t0) / 0.55; sbFishJump(ctx, 700 + i * 40, 820 + i * 50, seaY(760, t, 2, sea) + 6, u, 90, 0.55); }
  // the dhow and crew; the glass-calm reflection of the sail; the light band up the sail at sunrise
  const f = sbFloat(400, t, sea, 2, 200), ds = 0.95, D = { x: 400, y: f.y, s: ds, pitch: f.rot + 0.026 * osc(t, 3.4), t, sail: 1, billow: t > 18.3 && t < 19.2 ? 0.15 : 0.6,
    light: t > 19.3 && t < 20.6 ? (c) => sbBands(c, [-300, -600, 700, 560], t, { cols: ['#ffd36a'], n: 1, w: 120, speed: 600, alpha: 0.4, angle: 0.3, phase: -19.3 * 600 }) : null,
    crew: (c) => sbOnDeck(c, ds, (q) => sbS3Crew(q, t, ds)) };
  if (t > 18.3 && t < 19.3) { ctx.save(); ctx.globalAlpha = 0.25 * Math.sin(Math.PI * (t - 18.3)); ctx.translate(0, 2 * f.y + 20); ctx.scale(1, -0.6); ctx.translate(0, -f.y); sbDhow(ctx, { ...D, crew: null, light: null }); ctx.restore(); }
  sbDhow(ctx, D);
  sbWake(ctx, 400, f.y, ds, 1, t, t > 18.3 && t < 19.2 ? 0.3 : 1);
  // gulls arrive (land is near) and circle the mast; one lands on the yard
  if (t > 21.0) { const u = t - 21.0; sbGull(ctx, 430 + 160 * Math.cos(u * 2.2), 170 + 40 * Math.sin(u * 2.2) + Math.max(0, 1.2 - u) * 300, t, { dir: Math.sin(u * 2.2) > 0 ? -1 : 1, s: 0.36, seed: 5 });
    const g2 = K.clamp((t - 21.0) / 0.9); sbGull(ctx, K.lerp(1100, 560, K.ease.out(g2)), K.lerp(220, f.y - 405, K.ease.out(g2)) , t, { dir: -1, s: 0.36, seed: 9, fly: g2 < 1, flap: g2 < 1 ? undefined : 0.1 * osc(tc, 1.1) }); }
  sbSeaFront(ctx, t, sea, 0, 2000, { mid: (c) => sbReflect(c, 400, f.y, 470, ['#a8643a', '#2ab0b0', '#fbf3df', '#d0285a', '#fbf3df'], t, { rows: 7, gap: 10, a: 0.5 }) });
  // life: flying fish skip alongside on every day (rev 1: one living thing per sea shot)
  for (const [t0, xa, xb] of [[15.4, 860, 640], [16.2, 980, 760], [19.6, 900, 700], [20.5, 1000, 820], [21.4, 880, 690]]) sbFlyingFish(ctx, xa, xb, seaY(xa, t, 3, sea) + 10, (t - t0) / 0.8, 80, 0.5);
  sbSeaNear(ctx, t, sea, cam);
  if (t > 21.0 && t < 21.9) sbGlints(ctx, [0, 640, 1000, 160], t, 10, 4, 22);
}
// the deck: Sinbad at the bow (shades his eyes, points at the fish, sleeps by the rope coil, wakes, bounces), the haulers, the mopper,
// the dozer, the lookout at the masthead, the captain at the stern
function sbS3Crew(c, t, ds) {
  const tc = SB_T2(t), dy = -80 * ds;
  // masthead basket and the lookout
  const lk = sbAlive(t, 71, { x: 30 * ds, y: -470 * ds, dir: 1, gaze: [1, 0] });
  const lean = sbF(t, [[21.8, 0], [21.95, -0.12], [22.2, 0.22], [22.5, 0.22], [22.54, 0.3], [23.3, 0.26]]); lk.tip += lean;
  if (t > 21.8 && t < 22.54) lk.handR = PERSON_HANDS.cupEar.R; if (t >= 22.54) { const a = sbF(t, [[22.54, 0], [22.7, 1], [24.9, 1]]); lk.aR = [K.lerp(0.4, 1.25, a), K.lerp(0.3, 1.35, a)]; lk.mouth = 'open'; lk.handL = [-10, -100]; }
  sbSailor(c, 0, lk); celShade(c, [[-20 * ds, -470 * ds], [80 * ds, -470 * ds], [72 * ds, -420 * ds], [-12 * ds, -420 * ds]], '#a86a3a', '#6a3a1e', { light: [-1, -1], off: 6, lw: 3 });
  // the captain at the stern
  const C = sbAlive(t, 51, { x: -175 * ds, y: -232 * ds + 0, dir: 1, gaze: [1, -0.1], handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L }); if (t > 24.06) C.brow = 0.4; sbCaptain(c, C);
  // haulers (alternate hand over hand) and the mopper / dozer
  for (let i = 1; i < 3; i++) { const P = sbAlive(t, 72 + i, { x: (-60 + i * 60) * ds, y: dy, dir: 1, gaze: [-0.2, -1] }), h = osc(tc + i * 0.25, 0.7);
    if (t < 18.3 || t > 22.6) { P.handL = [12, -190 + 30 * h]; P.handR = [24, -160 - 30 * h]; P.tip -= 0.05 * h; }
    if (i === 2 && t > 18.3 && t < 19.4) { P.lid = 1; P.drop = 8 - 10 * pulse(tc, 18.9, 0.3); P.handR = PERSON_HANDS.folded.R; P.handL = PERSON_HANDS.folded.L; P.tip = -0.06; }
    if (t > 22.6) { const rx = kfn(t, [[22.6 + i * 0.25, (-60 + i * 60) * ds], [23.2 + i * 0.25, (130 + i * 30) * ds]]); P.x = rx; Object.assign(P, walk(() => rx, tc)); P.gaze = [1, -0.3]; P.mouth = 'open'; if (i === 2) P.tip += 0.1 * pulse(tc, 23.3, 0.3); }
    sbSailor(c, i, P); }
  const mop = sbAlive(t, 76, { x: -110 * ds, y: dy, dir: 1, gaze: [0.3, 0.6] }); mop.handL = [40 + 20 * osc(tc, 0.8), -100]; mop.handR = [60 + 20 * osc(tc, 0.8), -120]; if (t > 16.1 && t < 16.5) { mop.handR = PERSON_HANDS.headHold.R; mop.gaze = [0, -0.3]; } sbSailor(c, 3, mop);
  // Sinbad at the bow
  const P = sbAlive(t, 11, { x: 205 * ds, y: dy, dir: 1, gaze: [1, -0.2], mouth: 'smile', wind: -1 });
  if (t < 17.8) { P.handR = PERSON_HANDS.cupEar.R; P.sq *= 1.02; P.tip += 0.04; }
  else if (t < 18.5) { P.handR = PERSON_HANDS.pointFwd.R; P.mouth = 'open'; P.gaze = [1, 0.3]; P.y -= 6 * Math.abs(osc(tc, 0.35)); }
  else if (t < 21.2) { P.x = 150 * ds; P.sit = 1; P.seat = 'floor'; P.lid = t < 20.46 ? 1 : sbF(t, [[20.46, 1], [20.6, 0.6], [20.9, 0.2], [21.2, 0]]); P.drop = t < 20.46 ? 10 : 0; P.tilt = t < 20.46 ? 0.25 : 0; P.wind = -0.5;
    if (t > 20.46) { const st = sbF(t, [[20.46, 0], [20.7, 1], [21.0, 1], [21.2, 0]]), lag = st + lagged((u) => flow(u, [[20.46, 0], [20.7, 1], [21.0, 1], [21.2, 0]]), tc, 0.17, 0.6); P.aL = [0.2 + 2.6 * st, 0.2 + 2.8 * lag]; P.aR = [0.2 + 2.6 * st, 0.2 + 2.8 * lag]; P.mouth = st > 0.5 ? 'o' : 'closed'; } }
  else if (t < 21.6) { P.x = 150 * ds; P.sit = 1 - K.clamp((t - 21.2) / 0.4); P.seat = 'floor'; P.gaze = [0.5, -0.4]; }
  else { P.x = kfn(t, [[21.6, 150 * ds], [22.4, 210 * ds]]); Object.assign(P, walk(() => P.x, tc)); P.gaze = t > 22.54 ? look(tc, [P.x, -200], [[22.54, [0, -500]], [23.2, [900, -100]]]) : [0.5, -0.6];
    if (t > 24.06) { P.y -= 10 * Math.abs(osc(tc, 0.3)); P.aL = [2.7, 2.9]; P.aR = [2.7, 2.9]; P.mouth = 'open'; } }
  // the rope coil by the bow
  for (let k = 0; k < 3; k++) shape(c, ell(120 * ds, dy - 8 - k * 7, 34 - k * 6, 9, 18), '#d8b878', { lw: 2.5 });
  sbSinbad(c, P);
}
function sbS3Over(ctx, t, cam, S) {
  if (t > 16.56 && t < 19.6) { const n = t < 17.58 ? 1 : t < 18.4 ? 2 : 3, a = K.clamp(Math.min((t - 16.56) / 0.3, (19.6 - t) / 0.3)); ctx.save(); ctx.globalAlpha *= a; S.label(ctx, 'DAY', 150, 150, 1, { size: 44 });
    const st = [16.56, 17.58, 18.4][n - 1]; S.counter(ctx, n, 280, 170, K.clamp((t - st) / 0.25), { size: 120 }); ctx.restore(); }
  if (t > 22.54) { const tl = sbDhowPt({ x: 400, y: 820, s: 0.95 }, 70, -560), [x, y] = sbP(tl[0], tl[1], cam); sbSay(ctx, S, [[22.6, 'LAND!']], t, x + 210, Math.max(120, y - 30), [x + 30, y + 30], { size: 58 }); }
}
SB_SHOTS.push({ a: 15.06, b: 24.9, ww: 2000, cam: (t) => K.camAt(SB_S3CAM, t), world: sbS3World, over: sbS3Over });

// ---------- S4 (24.9 - 31.72): the skiffs to the island; the captain and his spyglass; the inset; two bubbles ----------
const SB_S4SEA = { hz: 600, y: [615, 700, 830, 915], amp: 6, pal: 'day' };
const SB_ISLE4 = { x: 1280, s: 0.52 };
const SB_S4CAM = [[24.9, { x: 800, y: 615, zoom: 1.0 }], [27.6, { x: 820, y: 615, zoom: 1.0 }], [27.9, { x: 380, y: 680, zoom: 1.3 }], [30.6, { x: 380, y: 680, zoom: 1.3 }], [31.2, { x: 760, y: 615, zoom: 1.0 }], [31.72, { x: 780, y: 615, zoom: 1.0 }]];
const SB_SKIFFX = [(t) => kfn(t, [[24.9, 560], [26.62, 1030]], 'out'), (t) => kfn(t, [[25.05, 480], [26.9, 940]], 'out')];
function sbS4World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_S4SEA;
  sbSky(ctx, 'day', cam); sbSun(ctx, 1500, 160, 50, '#fff6c8', '#ffe0a0', 0.7); sbSeaBack(ctx, t, sea, 0, 1800); sbGulls(ctx, t - 24.9, 900, 280, -30, 2, 4, 0.32);
  // the island (cap above the water) with the camp's first figures stepping ashore; breathing very slowly (only the spyglass sees it)
  const wl = seaY(SB_ISLE4.x, t, 1, sea) + 40, s = SB_ISLE4.s, cy = wl - 80 * s + 2 * osc(t, 3.2);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 3000, wl + 2); ctx.clip(); sbWhale(ctx, SB_ISLE4.x, cy, { s, dress: 1, t, lid: 1 }); ctx.restore();
  sbFoamLine(ctx, [[SB_ISLE4.x - 690 * s, wl], [SB_ISLE4.x - 320 * s, wl + 3], [SB_ISLE4.x + 320 * s, wl + 3], [SB_ISLE4.x + 690 * s, wl]], t, { w: 7 });
  // the men hop out of the first skiff and the fat merchant flops on the grass (26.62-27.55), seen small
  if (t > 26.62) for (let i = 0; i < 3; i++) { const t0 = 26.7 + i * 0.22, [hx, lift] = hop(t, t0, 0.3, 1000 - i * 20, 1060 + i * 40, 30), y = wl - 8 - lift; if (t < t0) continue;
    const P = sbAlive(t, 81 + i, { x: hx, y, s: 0.5, dir: 1, gaze: [1, 0] }); P.sq *= landSquash(tc, t0 + 0.3, 0.14); if (i === 0 && t > 27.2) { P.lie = K.clamp((t - 27.2) / 0.25); P.y = wl - 6 + rebound(tc, 27.45, 6); P.aL = [1.6, 1.8]; P.aR = [1.6, 1.8]; }
    groundShadow(ctx, hx, wl - 6, 40, lift, { flat: true }); sbMerchant(ctx, i, { ...P, s: 0.5 * SB_MERCH[i].s }); }
  // the bubbles beside the island (the pause)
  for (let i = 0; i < 2; i++) { const t0 = 30.75 + i * 0.35, u = (t - t0) / 0.6, bx = SB_ISLE4.x - 420 + i * 60; if (u > 0 && u < 1) sbBubble(ctx, bx + Math.sin(u * 12) * 6, wl + 30 - 60 * u, 16 + 4 * Math.sin(u * 20), 1); if (u >= 1 && u < 1.6) for (let k = 0; k < 5; k++) { const a = k * 1.26, v = (u - 1) * 60; sbBlob(ctx, bx + Math.cos(a) * v, wl - 30 + Math.sin(a) * v * 0.6 + 40 * (u - 1) * (u - 1), 4, 5, '#e8fbff', '#8fd0f0', { lw: 1.5, off: 2 }); } }
  // the dhow at anchor (left third) with the captain at the rail
  const f = sbFloat(330, t, sea, 2, 200), ds = 0.95, D = { x: 330, y: f.y, s: ds, pitch: f.rot, t, sail: 0.15, crew: (c) => sbOnDeck(c, ds, (q) => sbS4Crew(q, t, ds)) };
  sbDhow(ctx, D);
  // the two skiffs, rowed on twos, the second half a stroke behind
  for (let i = 1; i >= 0; i--) { const xf = SB_SKIFFX[i], x = xf(t), fl = sbFloat(x, t, sea, 2, 90), ph = tc * 7 + i * 1.6, ground = i === 0 && t > 26.62, surge = 6 * Math.max(0, Math.sin(ph));
    sbSkiff(ctx, { x: x + surge, y: fl.y + (ground ? -6 : 0), s: 1.25, pitch: fl.rot + (ground ? 0.06 * lurch(tc, 26.62) : 0), oar: ph, row: ground ? 0.1 : 1, crew: (c) => sbOnDeck(c, 1.25, (q) => {
      for (let k = 0; k < 2; k++) { const P = sbAlive(t, 90 + i * 3 + k, { x: (-40 + k * 30) * 0.95, y: -14 * 0.95, s: 0.62, dir: -1, gaze: [-1, 0], tip: -0.12 * Math.sin(ph) }); P.handL = [40, -130]; P.handR = [50, -125]; sbSailor(q, 2 + i + k, P); }
      if (i === 0 && t < 26.7) { const S = sbAlive(t, 11, { x: 60 * 0.95, y: -24, s: 0.62, dir: 1, tip: 0.12, gaze: [1, -0.3], wind: -1, mouth: 'open' }); S.handR = PERSON_HANDS.pointFwd.R; sbSinbad(q, S);
        const M = sbAlive(t, 81, { x: 20 * 0.95, y: -14, s: 0.64, dir: 1, mouth: 'o', eyes: 'wide', tip: 0.05 * Math.sin(ph) }); M.handLW = [-10, -40]; M.handRW = [40, -40]; sbMerchant(q, 0, { ...M, s: 0.64 }); }
      if (i === 1) { const M = sbAlive(t, 85, { x: 40 * 0.95, y: -14, s: 0.6, dir: 1, gaze: [1, -0.2] }); sbMerchant(q, 1, { ...M, s: 0.6 }); } }) });
    sbWake(ctx, x, fl.y, 0.5, 1, t + i, ground ? 0 : 0.8); }
  sbSeaFront(ctx, t, sea, 0, 1800, { mid: (c) => { sbReflect(c, 330, sbFloat(330, t, sea, 2, 200).y, 470, ['#a8643a', '#2ab0b0', '#fbf3df'], t, { rows: 6, gap: 9, a: 0.5 });
    for (let i = 0; i < 2; i++) { const x = SB_SKIFFX[i](t), y = sbFloat(x, t, sea, 2, 90).y, ph = SB_T2(t) * 7 + i * 1.6; sbReflect(c, x, y, 280, ['#a8643a', '#2ab0b0'], t, { rows: 4, gap: 8, a: 0.45, seed: 30 + i });
      if (!(i === 0 && t > 26.62)) for (const sd of [-1, 1]) sbRing(c, x - 150 + sd * 30, y + 8, ((ph / (2 * Math.PI)) % 1), 50, { lw: 3, a: 0.7 }); } } });
  // life: a pair of dolphins arcing past the anchored dhow
  for (const [t0, k] of [[25.3, 0], [25.62, 1]]) sbDolphinLeap(ctx, 760 + k * 50, 520 + k * 50, seaY(640, t, 3, sea) + 8, (t - t0) / 0.9, 120, 0.55);
  sbSeaNear(ctx, t, sea, cam);
  if (t > 27.6 && t < 27.95) sbSpeed(ctx, [0, 200, 1800, 900], t, { dir: -1, alpha: 0.6, col: '#ffffff' });
}
function sbS4Crew(c, t, ds) {
  const tc = SB_T2(t), dy = -80 * ds, C = sbAlive(t, 51, { x: -40 * ds, y: dy, dir: 1, gaze: [1, -0.1], handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L });
  // elbow leads, the glass arrives last; the sweep; the frown; the glass snaps back up
  const up = sbF(t, [[28.46, 0], [28.75, 0.7], [29.0, 1], [30.2, 1], [30.35, 0.75], [30.6, 1], [31.72, 1]]), sw = sbF(t, [[29.28, -0.25], [30.0, 0.05]]);
  if (t > 28.46) { C.handRW = [K.lerp(-10, 30, up) * ds + 20 * up, dy - K.lerp(130, 205, up)]; C.handL = [20, -110]; C.wink = up > 0.8 ? 'L' : null; C.gaze = [1, sw * 0.5]; C.tip += sw * 0.15 + 0.04 * up; C.brow = t > 30.04 ? 0.6 : 0.2; C.mouth = t > 30.04 && t < 30.6 ? 'frown' : 'closed'; C.lid = t > 30.3 && t < 30.45 ? 1 : C.lid; }
  sbCaptain(c, C);
  if (t > 28.46) { const h = sbHandW(C, 1), a = -0.08 + sw * 0.6 + (1 - up) * 1.1; sbSpyglass(c, h[0] - 14, h[1] - 6, a, 1, K.clamp(up * 1.3), t > 28.9 && t < 29.4 ? (t - 28.9) / 0.5 : 0); }
  for (let i = 0; i < 2; i++) { const P = sbAlive(t, 95 + i, { x: (120 + i * 70) * ds, y: dy, dir: -1, gaze: [-1, 0.2] }); P.handL = [10, -110 + 10 * osc(tc, 1.2 + i)]; sbSailor(c, 3 + i, P); }
}
function sbS4Over(ctx, t, cam, S) {
  // the spyglass inset: the island's rock end with barnacles, the shore line breathing (round, upper right, clear of his face)
  if (t > 30.0 && t < 30.75) { const p = K.clamp(Math.min((t - 30.0) / 0.15, (30.75 - t) / 0.12)), r = 190 * K.ease.out(p), cx = 760, cy = 290;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.translate(cx, cy); ctx.scale(1.2, 1.2); ctx.translate(-560, -610);
    const sea = { ...SB_S4SEA, y: [560, 640, 690, 760] }; sbSky(ctx, 'day', { x: 500 }); sbSeaBack(ctx, t, sea, 300, 900);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 2000, 690); ctx.clip(); sbWhale(ctx, 50, 640 - 10 * (0.5 + 0.5 * osc(t, 1.6)), { s: 1.0, dress: 1, t, lid: 1 }); ctx.restore();
    sbSeaFront(ctx, t, sea, 300, 900); ctx.restore();
    ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = '#2b1a3a'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#e0b040'; ctx.stroke(); ctx.restore(); }
}
SB_SHOTS.push({ a: 24.9, b: 31.72, ww: 1800, cam: (t) => K.camAt(SB_S4CAM, t), world: sbS4World, over: sbS4Over });
