// ===== ALI-01-ANIME shots S1-S4 (0 - 34.5 s): home at dawn, the morning forest, the riders heard, the climb and the hiding =====
const AB_SHOTS = [];

// ---------- S1 0-7.78: dawn crane down to the cottage yard; title; family; axe; empty purse ----------
const AB_S1_CAM = [[0, { x: 500, y: 300, zoom: 2.0 }], [2.6, { x: 500, y: 300, zoom: 2.0 }], [4.6, { x: 540, y: 660, zoom: 1.35 }], [5.4, { x: 540, y: 660, zoom: 1.35 }], [7.6, { x: 480, y: 670, zoom: 1.6 }]];
const AB_S1_ALI_TIP = [[3.72, 0], [4.05, -0.05], [4.4, 0.04], [4.72, 0], [4.95, 0.12], [5.25, 0.02], [5.7, -0.04], [6.0, 0]];
const AB_S1_WIFE = (t) => kfn(t, [[1.94, 905], [3.4, 620]], 'out');
const AB_S1_KID = (t) => kfn(t, [[2.1, 905], [3.5, 540]], 'out');
function abS1World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dawn';
  // plates with parallax (sky 0.3, far town 0.6, yard 1)
  ctx.save(); ctx.translate((cam.x - 500) * 0.7, (cam.y - 700) * 0.7); ctx.drawImage(abDawnSky(), -100, -150, 1200, 1476); ctx.restore();
  ctx.save(); ctx.translate((cam.x - 500) * 0.4 - 200, (cam.y - 700) * 0.4 - 40); ctx.drawImage(abTownRoofs('dawn'), 0, 0); ctx.restore();
  const A = villageYard(ctx, { sky: false, sun: false, door: K.clamp((t - 1.8) / 0.3), t,
    inside: (c) => { if (t > 1.9 && t < 2.6) abWife(c, { x: AB_S1_WIFE(t), y: 900, dir: -1, ...walk(AB_S1_WIFE, tc), gaze: [-1, 0] }, m); } });
  // dawn glaze over the Library set (the cels stay flat, the land takes the dawn light)
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,190,170,0.35)'; ctx.fillRect(0, 300, 1000, 930); ctx.restore();
  abGrad(ctx, 0, 912, 1000, 320, [[0, '#c88a72'], [0.35, '#9a6a6a'], [1, '#5a3e5a']]); ctx.save(); ctx.filter = 'blur(3px)'; ctx.fillStyle = 'rgba(255,210,170,0.45)'; ctx.beginPath(); ctx.ellipse(470, 950, 420, 34, 0, 0, 7); ctx.fill(); ctx.restore();
  abGlaze(ctx, 640, 640, 520, '#ffd0a0', 0.28);
  // the chopping stump and the axe leaning on it (until he takes it)
  celShade(ctx, [[300, 902], [302, 846], [390, 846], [392, 902]], '#9a6a3e', '#6a4024', { light: [-1, -1], off: 10, lw: 3.5 }); shape(ctx, ell(346, 846, 46, 10, 18), '#e8c890', { lw: 3 });
  const grab = 5.2, axeOn = t < grab;
  if (axeOn) abAxe(ctx, 368, 880, -1.25);
  // the donkey tethered by the tree, facing right; ears flick and it looks back at him at the end
  const dk = { x: 210, y: 900, s: 0.78, dir: 1, earL: 0.6 + idleSway(tc, 3, 0.15, 1.7) + (t > 7.0 ? 0.4 * pulse(tc, 7.0, 0.5) : 0), earR: 0.4 + idleSway(tc, 4, 0.2, 2.3) - (t > 7.05 ? 0.9 * pulse(tc, 7.05, 0.6) : 0),
    tailSwish: osc(tc, 2.2, 0.3) + (t > 7.0 ? pulse(tc, 7.0, 0.7) : 0), headTurn: t > 7.1 ? 0.25 * abE(tc, 7.1, 0.3) : 0, neck: idleSway(tc, 5, 0.12, 3.1), lid: abLid(t, 21, [7.05]), chew: t < 6 ? (osc(tc, 0.8) * 0.5 + 0.5) * 0.6 : 0 };
  seg(ctx, 120, 760, dk.x + 120, 790, 3, '#c8a070', 1);
  abDonkey(ctx, dk, m);
  // the wife and the child come out; the child runs ahead to him with arms up
  const kidIn = t > 2.1, kx = AB_S1_KID(t);
  if (t >= 2.6) { const wp = { x: AB_S1_WIFE(tc), y: 900, dir: -1, ...walk(AB_S1_WIFE, tc), mouth: 'smile', gaze: [-1, -0.2], lid: abLid(t, 31), tip: idleSway(tc, 32, 0.02, 3.3) };
    if (t > 6.46) { wp.gaze = t < 6.9 ? [-0.6, 0.5] : [-1, -0.3]; }
    if (t > 6.9) { wp.handRW = [K.lerp(560, 500, abE(tc, 6.9, 0.3)), 790]; }
    abWife(ctx, wp, m);
    if (t > 6.9 && t < 7.3) shape(ctx, ell(wp.handRW[0] - 10, 786, 26, 9, 14), '#e8b86a', { lw: 3 }); }
  if (kidIn) { const arrive = AB_S1_KID(tc) < 560; const kp = { x: kx, y: 900, dir: -1, ...walk(AB_S1_KID, tc, { stride: 20 }), mouth: 'smile', gaze: [-1, -0.6], lid: abLid(t, 41) };
    if (arrive) { kp.handL = [-30, -190 + 6 * osc(tc, 0.5)]; kp.handR = [30, -196]; kp.tip = -0.05 + idleSway(tc, 42, 0.03, 1.6); }
    if (t > 6.6) { kp.tip = 0.06 * pulse(tc, 6.75, 0.7); kp.gaze = [-0.4, -0.3]; }   // copies the shrug, late
    if (t > 2.1 && t < 2.55) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, A.door.x0 + 4, 1230); ctx.rect(A.door.x0, 0, 200, A.door.top); ctx.clip(); abKid(ctx, kp, m); ctx.restore(); } else abKid(ctx, kp, m); }
  // Ali Baba
  const P = { x: 430, y: 900, dir: 1, lid: abLid(t, 11, [2.05, 4.8, 6.1]), gaze: [0.6, 0.1], mouth: 'smile', tip: flow(tc, AB_S1_ALI_TIP) + idleSway(tc, 12, 0.02, 3.1), sq: breathe(tc, 1) };
  if (t < 2.2) { P.handL = [-10, -96 + 4 * osc(tc, 0.35)]; P.handR = [14, -92 - 6 * Math.abs(osc(tc, 0.5))]; P.gaze = [0.1, 1]; P.drop = 6 * (1 - abE(tc, 1.9, 0.25)); P.mouth = 'closed'; }
  else if (t < 3.72) { P.gaze = look(tc, [430, 700], [[0, [900, 760]], [2.6, [kx, 760]]]); }
  else if (t < 4.72) { P.handRW = [kx + 6, 742 + 6 * Math.abs(osc(tc, 0.33))]; P.gaze = tc < 4.15 ? [0.5, 0.7] : [0.6, -0.9]; P.brow = tc > 4.15 ? -0.4 : 0; }
  if (t >= 4.72 && t < 6.2) {   // takes the axe: turns to the stump, dips, swings it to the shoulder; the axe head arrives 2 drawings late
    P.dir = t < 5.75 ? -1 : 1; P.sq = anticipate(tc, 4.9, 0.25, 0.08) * landSquash(tc, 5.62, 0.06);
    P.handR = tc < 5.2 ? [70, -60] : [K.lerp(70, 18, abE(tc, 5.2, 0.4)), K.lerp(-60, -168, abE(tc, 5.2, 0.4))]; P.gaze = tc < 5.5 ? [0.6, 0.8] : [0.5, -0.2]; }
  if (t >= 6.2) { P.handR = [18, -168]; }
  if (t >= 6.46) { P.handL = [52, -140 + 4 * osc(tc, 0.3)]; P.gaze = [0.6, 0.6]; P.brow = -0.4; P.mouth = 'smile'; }
  if (t >= 7.0) { P.handLW = [K.lerp(500, 470, abE(tc, 7.0, 0.3)), 790]; P.gaze = [1, -0.2]; }
  abAli(ctx, P, m);
  if (!axeOn) { const h = abHand(P, 1), u = abE(tc - 0.17, 5.2, 0.45), rot = P.dir > 0 ? K.lerp(-2.4, -2.6, u) : K.lerp(-1.6, -0.4 - Math.PI, u); abAxe(ctx, h[0], h[1], rot); }
  if (t >= 6.46 && t < 7.0) { const h = abHand(P, 0); abPurse(ctx, h[0], h[1] + 6, 0.9, Math.PI + 0.3 * osc(tc, 0.3)); if (t > 6.6) dustBurst(ctx, h[0], h[1] + 50, t - 6.62, 3, 3, 5, 10, 0.4, 9); }
  if (t >= 7.0) { const h = abHand(P, 0); shape(ctx, ell(h[0] + 6, h[1] - 2, 26, 9, 14), '#e8b86a', { lw: 3 }); }
  yardLeaves(ctx, 0.4, t, { dx: 0 });
}
function abS1Over(ctx, t, cam, S) {
  // chrome title flickers on in the sky; flickers off in three drawings as the roofs rise
  if (t > 0.3 && t < 3.6) { const off = t > 3.1 ? [1, 0, 1, 0, 0, 0][Math.min(5, Math.floor((t - 3.1) * 12))] : 1;
    if (off) { const dy = (cam.y - 410) * -0.6; S.title(ctx, 'OPEN SESAME', 500, 260 + dy, K.clamp((t - 0.3) / 1.0), { size: 96, align: 'center' });
      if (t > 0.9) S.title(ctx, 'افتح يا سمسم', 500, 400 + dy, K.clamp((t - 0.9) / 1.0), { size: 80, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); } }
  if (t > 5.52) { const [x, y] = abP(430, 640, cam); S.label(ctx, 'ALI BABA', x - 40, y - 150, K.clamp((t - 5.52) / 0.6), { size: 40 }); }
}
AB_SHOTS.push({ a: 0, b: 7.78, ww: 1000, cam: (t) => K.camAt(AB_S1_CAM, t), world: abS1World, over: abS1Over });

// ---------- S2 7.78-16.45: side tracking through the morning forest; the rope tug; chopping; loading; off to market ----------
const AB_S2_TUG = (t) => 34 * K.smooth(9.9, 10.15, t) - 34 * K.smooth(10.5, 11.1, t);
const AB_S2_A = (t) => 360 + 118 * (t - 7.78) - AB_S2_TUG(t);                              // Ali Baba
const AB_S2_LAG = (t) => 118 * K.clamp(t - 9.38, 0, 1.15) * (1 - K.smooth(10.6, 11.5, t));    // the donkey stops at the fern, then trots to catch up
const AB_S2_D = (t) => AB_S2_A(t) + AB_S2_TUG(t) - 190 - AB_S2_LAG(t);
function abS2TrackCam(t) { return { x: AB_S2_A(t) + 70 / 1.25, y: 690, zoom: 1.25 }; }
function abS2Track(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning';
  const D = { y: 900, s: 0.74, dir: 1, ...walk(AB_S2_D, tc, { stride: GAIT.donkey * 0.74 }), lid: abLid(t, 22), tailSwish: osc(tc, 1.9) };
  const sniff = beatIn(tc, 9.38, 9.7) * (1 - beatIn(tc, 10.4, 10.7)); D.headDown = sniff * 0.9; D.earL = 0.7 - 0.4 * sniff + idleSway(tc, 6, 0.12, 1.4); D.earR = 0.7 + (tc > 10.0 && tc < 10.6 ? -1.2 : 0) + idleSway(tc, 7, 0.15, 1.9);
  if (tc > 10.4 && tc < 10.9) D.neck = 0.6 * pulse(tc, 10.4, 0.5);   // gives in with a head toss
  const AP = { y: 900, dir: 1, ...walk(AB_S2_A, tc, { stride: 24 }), mouth: 'smile', lid: abLid(t, 13, [8.66]), gaze: tc > 8.66 && tc < 9.3 ? [0.5, -1] : [1, 0], tip: 0.03 + idleSway(tc, 14, 0.02, 2.4) };
  AP.drop = 3 * Math.abs(Math.sin((AP.ph || 0) - 0.5));   // head bob, lagged behind the stride
  if (tc > 9.95 && tc < 10.9) { AP.dir = 1; AP.gaze = [-1, 0.2]; AP.tip = -0.08 * pulse(tc, 9.95, 0.6) + lurch(tc, 9.95, 0.1); }
  AP.handL = [-50, -110]; AP.handR = [18, -168];
  // the rope from his hand to the halter
  const ropeA = [AP.x - 40, 900 - 104], ropeB = [D.x + 110 * 0.74, 900 - 220 * 0.74 + sniff * 70], taut = K.clamp(1 - Math.abs(ropeA[0] - ropeB[0] - 150) / 80);
  ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...ropeB); ctx.quadraticCurveTo((ropeA[0] + ropeB[0]) / 2, Math.max(ropeA[1], ropeB[1]) + 40 * (1 - taut), ...ropeA); ctx.stroke(); ctx.restore();
  abDonkey(ctx, D, m);
  abAli(ctx, AP, m); const h = abHand(AP, 1); abAxe(ctx, h[0], h[1], -2.5);
  if (t > 10.96 && t < 11.95) bird(ctx, { kind: 'sparrow', x: AB_S2_A(t) + 520 - (t - 10.96) * 900, y: 420 + 40 * Math.sin(t * 6), s: 0.8, dir: -1, fly: true, flap: Math.sin(AB_T2(t) * 30) });
}
const AB_S2_BLOWS = [12.3, 12.86, 13.3];
function abS2Chop(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning';
  // the log: whole until the third blow, then three billets
  const split = tc >= 13.3, bw = Math.max(...AB_S2_BLOWS.map((b) => (tc >= b && tc < b + 0.25 ? 1 - (tc - b) / 0.25 : 0)));
  if (!split) { ctx.save(); ctx.translate(660, 900); ctx.scale(1, 1 - 0.06 * bw); celShade(ctx, [[-100, 2], [-100, -58], [100, -58], [100, 2]], '#a8743e', '#6a4424', { light: [-1, -1], off: 12, lw: 4 }); shape(ctx, ell(100, -28, 14, 30, 18), '#f0d29a', { lw: 3 }); ctx.restore(); }
  else if (tc < 13.62) for (let k = 0; k < 3; k++) { const dx = (k - 1) * 30 * abE(tc, 13.3, 0.2, 'out'); celShade(ctx, K.rectPts(574 + k * 58 + dx, 846, 52, 56), '#a8743e', '#6a4424', { light: [-1, -1], off: 8, lw: 3.5 }); }
  for (const b of AB_S2_BLOWS) dustBurst(ctx, 640, 850, t - b, 5, 4, 8, 40, 0.45, Math.round(b * 10));
  // the donkey watches, blinks on each blow, ears flick back two drawings late; takes the bundle and sinks
  const loadT = 14.15, D = { x: 290, y: 900, s: 0.76, dir: 1, lid: Math.max(abLid(t, 23), ...AB_S2_BLOWS.map((b) => abBlinkAt(AB_T3(t), b))),
    earL: 0.6 - 0.9 * Math.max(...AB_S2_BLOWS.map((b) => pulse(tc, b + 0.08, 0.35))) + idleSway(tc, 8, 0.1, 1.6), earR: 0.7 - 0.7 * Math.max(...AB_S2_BLOWS.map((b) => pulse(tc, b + 0.12, 0.4))),
    chew: tc < 13.5 ? (osc(tc, 0.7) * 0.5 + 0.5) * 0.7 : 0, tailSwish: osc(tc, 2.3), sq: landSquash(tc, loadT, 0.06, 10), sag: tc > 14.6 && tc < 15.4 ? 0.3 * pulse(tc, 14.6, 0.8) : 0 };
  abDonkey(ctx, D, m);
  const seat = mountSeat('donkey', D);
  // Ali Baba: strike cycle, then the bundle onto the donkey, then pats it and points the way
  const P = { x: 500, y: 900, dir: 1, lid: abLid(t, 15, [14.55]), gaze: [1, 0.6], mouth: 'closed', tip: idleSway(tc, 16, 0.02, 2.8), sq: breathe(tc, 2) };
  let axeRot = -2.5, axeIn = true;
  if (tc < 13.45) { let up = 0, hit = 0;
    for (const b of AB_S2_BLOWS) { if (tc >= b - 0.32 && tc < b) up = abE(tc, b - 0.32, 0.25, 'out'); if (tc >= b && tc < b + 0.2) hit = 1; }
    const u = hit ? 0 : up; P.handR = [K.lerp(96, 6, u), K.lerp(-96, -250, u)]; P.handL = [K.lerp(80, 0, u), K.lerp(-100, -236, u)]; P.tip = K.lerp(0.14, -0.08, u); axeRot = K.lerp(0.7, -2.2, u); P.sq *= hit ? 0.97 : 1; P.mouth = hit ? 'grit' : 'closed'; }
  else if (tc < loadT) { P.dir = -1; P.x = K.lerp(500, 440, abE(tc, 13.45, 0.3)); P.handLW = [seat.x + 10, seat.y - 60 - 40 * (1 - abE(tc, 13.7, 0.4))]; P.handRW = [seat.x + 60, seat.y - 70 - 40 * (1 - abE(tc, 13.7, 0.4))]; P.sq = anticipate(tc, 13.5, 0.3, 0.1); P.gaze = [-1, 0.2]; axeIn = false; }
  else { P.x = 440; P.dir = tc < 14.46 ? -1 : 1; P.gaze = tc < 14.46 ? [-1, 0.3] : [1, -0.1]; axeIn = false;
    if (tc < 14.46) P.handLW = [seat.x + 30, seat.y - 70 + 8 * Math.abs(osc(tc, 0.25))]; else { P.handR = PERSON_HANDS.pointFwd.R; P.mouth = 'smile'; } }
  if (tc >= 13.62) abBundle(ctx, tc < loadT ? K.lerp(560, seat.x + 20, abE(tc, 13.7, 0.45)) : seat.x + 20, tc < loadT ? K.lerp(890, seat.y - 6, abE(tc, 13.7, 0.45)) : seat.y - 6 + (D.sq < 1 ? 6 : 0), 0.9, tc < loadT ? -0.1 : 0);
  if (!axeIn) abAxe(ctx, 330, 898, -0.25);
  abAli(ctx, P, m);
  if (axeIn) { const h = abHand(P, 1); abAxe(ctx, h[0], h[1], axeRot); for (const b of AB_S2_BLOWS) if (tc >= b && tc < b + 0.1) abGlint(ctx, 640, 846, 46, 0.5); }
  // a leaf falls in the pause
  if (t > 15.2) { const u = (t - 15.2) / 1.25; ctx.save(); ctx.translate(560 + 40 * Math.sin(u * 7), 560 + u * 300); ctx.rotate(Math.sin(u * 9)); abBlob(ctx, 0, 0, 14, 7, '#7ad08a', '#3e9a6a', { lw: 2.5, off: 4 }); ctx.restore(); }
}
function abS2Cam(t) { if (t < 11.96) return abS2TrackCam(t); return t < 14.4 ? { x: 560, y: 720, zoom: 1.5 } : K.camAt([[14.4, { x: 560, y: 720, zoom: 1.5 }], [15.2, { x: 520, y: 700, zoom: 1.35 }]], t); }
AB_SHOTS.push({ a: 7.78, b: 16.45, ww: 1e5, cam: abS2Cam,
  under: (ctx, t, cam) => abForest(ctx, t < 11.96 ? cam : { ...cam, x: 3200 + (cam.x - 560) }, t, 'morning'),
  world: (ctx, t, cam) => { if (t < 11.96) abS2Track(ctx, t, cam); else abS2Chop(ctx, t, cam); },
  over: (ctx, t, cam) => { if (t < 11.96) abForestFront(ctx, cam, 'morning'); } });

// ---------- the glade (S3, S4, S10): back plate + cels ----------
function abGladeUnder(m) { return (ctx, t, cam) => { ctx.save(); K.camera(ctx, 1000, 1230, cam); ctx.drawImage(abGladePlate(m), 0, 0); ctx.restore(); }; }
// the donkey with its bundle (S3) at x, facing right
function abS3Donkey(ctx, t, m, o = {}) {
  const tc = AB_T2(t), hear = beatIn(tc, 17.6, 17.75);
  const D = { x: o.x ?? 720, y: 900, s: 0.76, dir: -1, lid: abLid(t, 24), tailSwish: osc(tc, 2.1), earL: 0.4 + 0.6 * hear + idleSway(tc, 9, 0.1, 1.5), earR: 0.3 + 0.7 * hear + idleSway(tc, 10, 0.12, 2.1),
    neck: tc > 17.85 ? 0.6 * abE(tc, 17.85, 0.25) * (1 - beatIn(tc, 21.6, 21.8)) : 0, eyes: tc > 17.7 && tc < 21.6 ? 'wide' : undefined, ...o.P };
  if (tc > 21.7 && tc < 22.4) { D.raise = pulse(tc, 21.7, 0.5); D.tailUp = 0.8; D.sq = landSquash(tc, 21.95, 0.05); }
  abDonkey(ctx, D, m); if (!o.noLoad) { const st = mountSeat('donkey', D); abBundle(ctx, st.x + 14, st.y - 4, 0.88); }
  return D;
}

// ---------- S3 16.45-25.61: the donkey hears first; he listens; the dust cloud; fear close-up; riders between trunks; THIEVES? ----------
const AB_S3_CAM = [[16.45, { x: 480, y: 720, zoom: 1.4 }], [19.41, { x: 480, y: 720, zoom: 1.4 }], [19.7, { x: 160, y: 660, zoom: 1.3 }], [20.95, { x: 160, y: 660, zoom: 1.3 }], [21.3, { x: 480, y: 720, zoom: 1.4 }]];
function abS3Ali(ctx, t, m, cam) {
  const tc = AB_T2(t), P = { x: 600, y: 900, dir: 1, lid: abLid(t, 17, [18.6, 25.0]), mouth: 'smile', tip: idleSway(tc, 18, 0.02, 2.6), sq: breathe(tc, 3) };
  if (tc < 18.26) { P.handL = [70, -178 + 5 * osc(tc, 0.4)]; P.handR = [104, -170 - 6 * Math.abs(osc(tc, 0.6))]; P.lid = Math.max(0.2, P.lid); P.gaze = [0.6, 0.7]; P.tip += 0.03 * osc(tc, 1.2); }
  else if (tc < 18.8) { P.mouth = 'closed'; P.handL = [70, -178]; P.handR = [104, -170]; P.gaze = [-1, -0.1]; }   // only the pupils move first
  else { P.mouth = 'closed'; P.dir = -1; P.handL = [20, -110]; P.handR = PERSON_HANDS.cupEar.R; P.gaze = [-1, -0.1]; P.tip = 0.06; }
  if (tc >= 21.3) { P.dir = -1; P.handR = [40, -110]; P.mouth = 'o'; P.gaze = [-1, 0]; }
  if (tc >= 24.61) { P.dir = -1; P.gaze = gazePlan(tc, [[24.61, [-1, 0]], [24.95, [1, 0.5]], [25.3, [-0.3, -1]]]); P.drop = 4 * pulse(tc, 24.85, 0.35); P.handR = [20, -120]; P.brow = -0.6; }
  abAli(ctx, P, m); return P;
}
function abS3World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon';
  abGladeBack(ctx, m, t);
  // far down the path: the dust cloud grows in three held steps, rider shapes inside, sound arcs leaving it
  if (t > 19.3 && t < 23.0) { const st = t < 20.07 ? 0.45 : t < 20.6 ? 0.62 : t < 21.01 ? 0.8 : 1, flash = [20.07, 20.6, 21.01].some((b) => t >= b && t < b + 1 / 30);
    abDust(ctx, 140, 868, 300 * st, 120 * st, t, 0.95); abSilRow(ctx, 40, 868, t, 0.16 * st, 1, 0.8);
    if (flash) { ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(140, 830, 160 * st, 60 * st, 0, 0, 7); ctx.fill(); ctx.restore(); }
    soundArcs(ctx, 300, 800, 1, t, '#fff1d8');
    for (let i = 0; i < 6; i++) { const px = 220 + i * 50, hop = Math.abs(Math.sin(t * 18 + i * 1.7)) * 6 * (t < 21.6 ? 1 : 0); shape(ctx, ell(px, 902 - hop, 6, 4, 8), '#a8806a', { lw: 2 }); } }
  abS3Donkey(ctx, t, m);
  abThicketFront(ctx, m, t);
  abS3Ali(ctx, t, m, cam);
}
// 22.41-23.81: extreme close-up, held: irises shrink in three drawings, a sweat bead, a hard blink, light bands sweep the held cel
function abS3Close(ctx, t, S) {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#2a4a3a'], [1, '#6a5a2a']]);
  const tc = AB_T3(t), ir = tc < 22.66 ? 1 : tc < 22.79 ? 0.8 : tc < 22.92 ? 0.64 : 0.52;
  abFace(ctx, 500, 640, 3.0, { who: 'ali', wide: 1, iris: ir, gaze: [-0.25 + 0.05 * Math.sin(t * 40) * (t > 22.66 ? 1 : 0), 0], lid: abBlinkAt(tc, 23.07), brow: -0.7, mouth: 'none', sweat: K.clamp((t - 22.8) / 0.9), m: 'afternoon' });
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#7affb0', '#ffd36a'], alpha: 0.16, w: 160, speed: 380 });
}
// 23.81-24.61: long view between trunks: riders flicker past the gaps, sacks bouncing
function abS3Riders(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon';
  abSilRow(ctx, 200 + (t - 23.81) * 900, 880, t, 0.42, 1, 0.9);
  abDust(ctx, 300 + (t - 23.81) * 700, 900, 900, 160, t, 0.6);
  [[0, 520, 0.82, 2], [1, 160, 0.78, 1], [2, -200, 0.84, 2]].forEach(([i, x0, s, pal]) => { const xf = (u) => x0 + (u - 23.81) * 980;
    const H = { y: 905, s, dir: 1, pal, ...walk(xf, tc, { stride: GAIT.horse * s }), gallop: 1, earL: -0.3, earR: -0.2, tailUp: 0.6 };
    const bob = 6 * Math.sin((H.ph || 0) * 2 + i); abRider(ctx, i, H, { lurch: 0.15 * Math.sin((H.ph || 0) * 2), gaze: [1, 0], tip: 0.1 }, m, { cloak: 1, t, sacks: true, sackBob: bob, coin: i === 0 }); });
}
AB_SHOTS.push({ a: 16.45, b: 22.41, ww: 2400, cam: (t) => K.camAt(AB_S3_CAM, t), under: abGladeUnder('afternoon'), world: abS3World });
AB_SHOTS.push({ a: 22.41, b: 23.81, panel: abS3Close });
AB_SHOTS.push({ a: 23.81, b: 24.61, ww: 2400, cam: (t) => ({ x: 900 + (t - 23.81) * 60, y: 740, zoom: 1.25 }), under: abGladeUnder('afternoon'), world: abS3Riders,
  over: (ctx, t) => { for (const [x, w] of [[90, 150], [520, 120], [880, 170]]) { celShade(ctx, [[x - w / 2, -10], [x + w / 2, -10], [x + w / 2 + 10, 1240], [x - w / 2 - 10, 1240]], '#2a1a2a', '#160c18', { light: [-1, 0], off: 30, lw: 3 }); } } });
AB_SHOTS.push({ a: 24.61, b: 25.61, ww: 2400, cam: () => ({ x: 480, y: 720, zoom: 1.4 }), under: abGladeUnder('afternoon'), world: abS3World,
  over: (ctx, t, cam, S) => { const [x, y] = abP(600, 640, cam); S.label(ctx, 'THIEVES?', x + 140, y - 120, K.clamp((t - 24.61) / 0.5), { size: 44 }); } });

// ---------- S4 25.61-34.5: the donkey hidden, the climb, the branch, the leaf curtain, the eye in the thicket, the pan to the rock ----------
const AB_S4_CAM = [[25.61, { x: 470, y: 700, zoom: 1.2 }], [26.4, { x: 470, y: 700, zoom: 1.2 }], [28.2, { x: 560, y: 430, zoom: 1.5 }], [29.6, { x: 560, y: 430, zoom: 1.5 }], [30.2, { x: 600, y: 390, zoom: 2.4 }], [30.73, { x: 600, y: 390, zoom: 2.4 }]];
const AB_S4_PAN = [[31.38, { x: 600, y: 390, zoom: 2.4 }], [33.3, { x: 1250, y: 560, zoom: 1.0 }]];
const AB_CLIMB_Y = [[26.75, 880], [27.2, 760], [27.7, 600], [28.2, 452]];
const AB_S4_DX = (t) => kfn(t, [[25.61, 720], [26.3, 905]], 'inOut');   // the donkey shoved rump-first into the thicket
// the climber: on twos, hands on alternating trunk points, legs from the climb phase, body sways side to side
function abClimber(ctx, t, m, y, o = {}) {
  const tc = AB_T2(t), ph = (900 - y) / 22, sw = Math.sin(ph * 0.5), P = { x: 600 + 6 * sw, y, dir: -1, ph, amp: 1, tip: 0.16 + 0.03 * sw, lid: abLid(t, 19), gaze: o.gaze || [-0.4, -1], mouth: 'grit', brow: -0.3 };
  const tr = AB_TREE.x + 36, a = Math.sin(ph * 0.5) > 0; P.handLW = [tr, y - 200 * 0.95 - (a ? 40 : 0)]; P.handRW = [tr + 4, y - 200 * 0.95 - (a ? 0 : 40)];
  abAli(ctx, P, m); return P;
}
function abS4World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon', dip = (tc > 28.6 ? 10 * swing(tc, 28.6, 1, 2.2, 3.2) : 0) + (tc > 28.6 ? 6 : 0);
  abGladeBack(ctx, m, t, { dip });
  // the donkey: ears that will not stay down
  const press = tc > 25.95 && tc < 26.3, D = abS3Donkey(ctx, t, m, { x: AB_S4_DX(tc), noLoad: false, P: { ...walk(AB_S4_DX, tc, { stride: GAIT.donkey * 0.76 }), earL: press ? -0.6 + 1.5 * pulse(tc, 26.1, 0.2) : 1 + idleSway(tc, 9, 0.1, 1.5), earR: press ? -0.5 : 1, eyes: 'wide', neck: -0.3 } });
  abThicketFront(ctx, m, t);
  let P; const AXF = (u) => kfn(u, [[25.61, 600], [26.05, 760], [26.3, 760], [26.45, 640]]);
  if (tc < 26.45) { P = { x: AXF(tc), y: 900, dir: tc < 26.3 ? 1 : -1, ...walk(AXF, tc, { stride: 24 }), tip: 0.12, lid: abLid(t, 19), gaze: [1, 0.2], mouth: 'grit' };
    if (tc < 25.95) P.handRW = [D.x - 70, 760]; else if (press) P.handRW = [D.x - 100, 640 + 20 * pulse(tc, 26.1, 0.2)]; else { P.handR = PERSON_HANDS.hush.R; P.gaze = [0.6, -0.2]; }
    abAli(ctx, P, m); }
  else if (tc < 26.75) { const u = beatIn(tc, 26.45, 26.75), [hx, lift] = hop(tc, 26.5, 0.25, 640, 600, 70);   // anticipation crouch, the jump to the trunk
    groundShadow(ctx, tc < 26.5 ? 640 : hx, 902, 90, lift, { flat: true, color: '#2b1a3a' });
    P = { x: tc < 26.5 ? 640 : hx, y: 900 - lift - (tc > 26.6 ? 20 * beatIn(tc, 26.6, 26.75) : 0), dir: -1, sq: tc < 26.5 ? anticipate(tc, 26.45, 0.05, 0.12) * 0.9 : 1.08, handL: [-30, -230], handR: [40, -240], lid: 0, gaze: [-0.3, -1], mouth: 'grit' };
    abAli(ctx, P, m); }
  else if (tc < 28.3) P = abClimber(ctx, t, m, flow(tc, AB_CLIMB_Y));
  else { const swingIn = beatIn(tc, 28.3, 28.6); P = { x: K.lerp(600, 640, swingIn), y: 448 + dip * 0.6, dir: 1, sit: swingIn, seat: 'bench', lid: abLid(t, 19, [29.3]), gaze: [0.4, 0.2], mouth: 'closed', tip: -0.04 + idleSway(tc, 20, 0.02, 2.1), handLW: [AB_TREE.x + 44, 330 + dip], handR: [30, -120] };
    if (tc > 29.27) { P.handRW = [K.lerp(700, 640, abE(tc, 29.27, 0.5)), 330]; P.gaze = [0.8, 0]; }
    abAli(ctx, P, m); }
  // the leaf curtain closes; only the eye gap is left
  const cover = beatIn(tc, 29.3, 29.95); abFoliageFront(ctx, m, t, cover, { hole: cover > 0.95 ? 1 : 0 });
  if (cover > 0.95) { const [gx, gy, gw, gh] = AB_TREE.gap; ctx.save(); ctx.beginPath(); ctx.roundRect(gx - gw / 2, gy - gh / 2, gw, gh, 22); ctx.fillStyle = '#120a16'; ctx.fill(); ctx.clip();
    const gz = tc < 31.25 ? [0.2, 0.2] : [1, 0.25], lid = tc < 30.1 ? abBlinkAt(AB_T3(t), 29.98) : 0; abFace(ctx, gx + 2, gy + 8, 0.29, { who: 'ali', gaze: gz, lid, iris: tc > 30.1 ? 1.15 : 1, brow: -0.3, m });
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(40,30,80,0.4)'; ctx.fillRect(gx - gw, gy - gh, gw * 2, gh * 2); ctx.restore(); }
  // the blank rock, first seen at the end of the pan; the riders' dust and a horse's nose at the left edge
  abRock(ctx, 1820, 900, { model: 'afternoon' });
  if (t > 33.3) { abDust(ctx, 640 + (t - 33.3) * 200, 900, 380, 150, t, K.clamp((t - 33.3) / 0.5)); const H = { x: 560 + (t - 33.4) * 220, y: 905, s: 0.8, dir: 1, pal: 2, ph: AB_T2(t) * 9, amp: 1, gallop: 1, earL: -0.2 }; if (t > 33.4) abHorse(ctx, H, m); }
}
// 30.73-31.2 insert: in the thicket one donkey eye opens between the leaves and looks the same way
function abS4Eye(ctx, t, cam) {
  const tc = AB_T3(t), m = 'afternoon';
  abLeafBlobs(ctx, 900, 790, 170, m, 31);
  ctx.save(); ctx.beginPath(); ctx.ellipse(800, 800, 40, 26, 0, 0, 7); ctx.fillStyle = '#1a1020'; ctx.fill(); ctx.clip();
  const lid = 1 - abE(tc, 30.8, 0.15); shape(ctx, ell(800, 800, 30, 22, 18), '#fffaf0', { lw: 3 }); shape(ctx, ell(788, 802, 12, 15, 14), '#2a1418', { lw: 0 }); shape(ctx, ell(784, 796, 4, 5, 8), '#ffffff', { lw: 0 });
  ctx.fillStyle = '#8a8a96'; ctx.fillRect(760, 774, 80, 52 * lid); ctx.restore();
  abThicketFront(ctx, m, t);
}
AB_SHOTS.push({ a: 25.61, b: 30.73, ww: 2400, cam: (t) => K.camAt(AB_S4_CAM, t), under: abGladeUnder('afternoon'), world: abS4World });
AB_SHOTS.push({ a: 30.73, b: 31.25, ww: 2400, cam: () => ({ x: 820, y: 790, zoom: 2.6 }), under: abGladeUnder('afternoon'), world: abS4Eye });
AB_SHOTS.push({ a: 31.25, b: 34.5, ww: 2400, cam: (t) => K.camAt(AB_S4_PAN, t), under: abGladeUnder('afternoon'), world: abS4World });
