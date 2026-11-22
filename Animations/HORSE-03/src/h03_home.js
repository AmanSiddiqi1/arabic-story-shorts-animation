// ===== HORSE-03: homecoming. S1 the descent (skyFlight, 0 - 2.58), S2-S3 the king's garden (palaceGarden, 2.58 - 18.4) =====
// ---------- S1: the descent toward home (panel units) ----------
const H3_S1_X = H3_F([[0, 400], [2.58, 520]]), H3_S1_Y = H3_F([[0, 300], [2.58, 380]]);
function h3S1Horse(t) { const tc = EH_T2(t); return ehRigP(H3_S1_X(t), H3_S1_Y(t) + idleSway(tc, 5, 6, 2.4), 0.55, 1, -0.21 + idleSway(tc, 6, 0.012, 3.1)); }
function h3S1Panel(ctx, t, S) {
  const tc = EH_T2(t), H = h3S1Horse(t), ps = EH_FIRUZ.s * H.s / H3_HS;
  ehSkyFlight(ctx, t, { w: { low: 1 }, sx: -150 * t, sy: -240 * t, cloud: 'day', sun: [840, 160, 54], land: { y: H3_F([[0, 820], [2.58, 640]])(t), k: H3_F([[0, 0.32], [2.58, 0.5]])(t), variant: 'home', toy: H3_F([[0, 0.12], [1.46, 0.17], [2.58, 0.3]])(t), toyX: 640, glint: 1 } });
  // two doves rise from the palace roofs toward him and wheel past
  if (t > 1.9) for (let i = 0; i < 2; i++) { const u = (t - 1.9 - i * 0.12) / 1.0; if (u > 0) bird(ctx, { kind: 'dove', pal: 0, x: 640 - 120 * u + i * 50, y: 900 - 520 * u + 40 * Math.sin(u * 5 + i), s: 0.32 + 0.1 * u, dir: -1, fly: true, flap: Math.sin(tc * 26 + i * 2) }); }
  const PP = { s: ps, lid: ehLid(t, 3, [1.46]), sq: breathe(tc, 3, 0.016), lurch: 0.24 + idleSway(tc, 31, 0.02, 2.2), handR: h3Loc(H, ps, [EH_EBG.lever[0] + 8, EH_EBG.lever[1] + 4]), handL: [12, -214], gaze: [0.7, 0.7], brow: 0.3, mouth: 'closed' };
  if (t >= 1.46) { PP.mouth = 'smile'; PP.brow = 0.5; PP.eyes = 'wide'; PP.handL = [K.lerp(12, 70, ehE(tc, 1.46, 0.3)), K.lerp(-214, -236, ehE(tc, 1.46, 0.3)) + 10 * Math.sin(tc * 14)]; PP.sq *= 1 + 0.03 * pulse(tc, 1.5, 0.4); }
  castFinish(ctx, H.x, H.y + 40, 520, 620, (c) => { ehWindRibbons(c, H, tc, { ang: Math.PI + 0.35, len: 200 }); ehRide(c, H, 'firuz', PP, t, { tc, stream: 1, ang: Math.PI * 1.08 }); }, { rim: '#fff2c0', light: [1, -1], rimW: 2.5 });
  ehSkyFront(ctx, t, { sx: -300 * t, sy: -500 * t, cloud: 'day', a: 0.5 });
  // the chrome title with the Arabic line in Lalezar (clear of the rider)
  if (t < 2.62) { ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 2.3) / 0.3);
    S.title(ctx, 'THE PROMISE AND', 500, 600, K.clamp((t - 0.3) / 0.8), { size: 70, align: 'center' }); S.title(ctx, 'THE THEFT', 500, 690, K.clamp((t - 0.42) / 0.8), { size: 76, align: 'center' });
    if (t > 0.7) S.title(ctx, 'الوعد وسرقة الحصان', 500, 800, K.clamp((t - 0.7) / 0.8), { size: 66, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); ctx.restore(); }
}

// ---------- S2-S3: the king's garden ----------
const H3_CART = 1330, H3_STAR = 1020;
// the horse: three steps down over the star tile, touchdown at 4.02
const H3_HY = H3_F([[2.58, 330], [2.95, 470], [3.2, 470], [3.5, 640], [3.68, 640], [3.9, 820], [4.02, 900], [30, 900]]);
const H3_HX = H3_F([[2.58, 760], [3.5, 960], [4.02, 1020], [30, 1020]]);
function h3HomeHorse(t) { const lift = 900 - H3_HY(t); return { x: H3_HX(t), y: H3_HY(t) + (t > 4.02 && t < 4.4 ? 4 * Math.sin((t - 4.02) * 30) * Math.exp(-(t - 4.02) * 8) : 0), s: H3_HS, dir: 1, lift, lit: t < 4.02 ? { hooves: 0.25, chest: 0.25, neck: 0.25, joints: 0.25 } : {} }; }
// Firuz: rides until 6.2, hops down, walks into the hug, then onto the cart edge at 9.6 to tell the story
const H3_FZ_X = H3_F([[6.62, 1120], [7.0, 1120], [7.6, 1168], [9.6, 1168]]);
function h3FzHome(t) {
  const tc = EH_T2(t), sd = 3; if (t < 6.2) return null;
  let P = { x: H3_FZ_X(t), y: 930, s: EH_FIRUZ.s, dir: 1, lid: ehLid(t, sd, [7.0]), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'smile', gaze: [1, 0], brow: 0.3, handL: [-26, -98], handR: [26, -98] };
  if (t < 6.62) { const H = h3HomeHorse(t), seat = mountSeat('horse', H), [x, l] = hop(tc, 6.2, 0.42, seat.x + 20, 1120, 50); P.x = x; P.y = K.lerp(seat.y + 52 * P.s, 930, ehE(tc, 6.2, 0.42, 'in')) - l; P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.amp = 0; return P; }
  Object.assign(P, walk(H3_FZ_X, tc, { stride: 24 })); P.sq *= landSquash(tc, 6.62, 0.12) * 1 || 1;
  if (t < 7.76) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.mouth = 'open'; }
  else if (t < 8.74) { const lift = 22 * flow(tc, [[7.9, 0], [8.15, 1], [8.45, 1], [8.7, 0]]); P.y -= lift; P.lift = 0; P.handL = [40, -150]; P.handR = [60, -140]; P.lid = 0.6; P.mouth = 'smile'; P.sq = 1 - 0.05 * pulse(tc, 7.8, 0.4); P.amp = 0; }
  else if (t < 9.6) { P.gaze = [-0.6, 0.2]; P.handL = [-24, -98]; P.handR = [30, -100]; P.mouth = 'smile'; P.amp = 0; }
  else { // on the cart, telling it all
    const [x, l] = hop(tc, 9.6, 0.36, 1168, 1250, 46); const onCart = tc >= 9.96, cy = EH_GR - 20 - 58; P.x = x; P.y = K.lerp(930, cy, ehE(tc, 9.6, 0.36)) - l; P.amp = 0; if (onCart) P.sq *= landSquash(tc, 9.96, 0.14);
    P.talk = ehTalk(t, 9.6, 17.72, 3, 0.8); P.gaze = [-1, 0.3]; P.dir = -1; P.brow = 0.4; const g = Math.sin(tc * 3.7);
    P.handL = [-50 - 20 * g, -150 + 20 * Math.cos(tc * 2.9)]; P.handR = [60 + 20 * g, -170 - 20 * Math.abs(g)];
    if (t < 10.24) { P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; }
    if (t >= 10.7 && t < 12.3) { P.gaze = [-0.5, -1]; P.handR = [70, -200 + 10 * Math.sin(tc * 6)]; }
    if (t >= 12.3 && t < 13.24) { const u = flow(tc, [[12.3, 0], [12.5, 0.2], [12.85, 1], [13.24, 1]]); P.handR = [K.lerp(60, 80, u), K.lerp(-210, -70, u)]; P.handL = [-30, -110]; P.tip = 0.06 * u; P.gaze = [0.5, 1]; }
    if (t >= 13.24 && t < 16.34) { const u = flow(tc, [[13.98, 0], [14.82, 1], [16.0, 1]]); P.handL = [K.lerp(-90, -40, u), K.lerp(-150, -230, u)]; P.handR = [70, -120]; P.gaze = [-0.4, -0.9]; }
    if (t >= 15.46 && t < 16.34) P.lid = Math.max(P.lid, 0.2);
    if (t >= 16.34) { P.handR = PERSON_HANDS.pointUp.R; P.handR = [P.handR[0] - 10, P.handR[1] - 30 * ehE(tc, 16.34, 0.3)]; P.gaze = [0, -1]; P.tip = -0.04; P.mouth = 'open'; }
    if (t >= 17.72) { P.talk = 0; P.mouth = 'smile'; } }
  return P;
}
// the king: slumped on the throne, springs up at 4.84, runs (belly bounce) to the hug, then listens beside the child
const H3_KX = H3_F([[5.3, 1760], [5.9, 1560], [6.2, 1480], [7.5, 1236], [7.76, 1230], [8.8, 1230], [9.6, 1110], [30, 1110]]);
function h3King(t) {
  const tc = EH_T2(t), sd = 9, P = { x: 1760, y: 840, s: EH_KING.s, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.3), mouth: 'frown', gaze: [-1, 0.2], handL: [-26, -96], handR: [30, -98] };
  if (t < 4.84) { P.sit = 1; P.seat = 'bench'; P.sq *= 0.96; P.lid = Math.max(P.lid, 0.5); P.drop = 8; P.handR = PERSON_HANDS.chin.R; P.handL = [20, -100]; P.gaze = [-0.4, 0.4];
    if (t > 3.3) { P.gaze = [-0.6, -0.8]; P.lid = Math.max(ehLid(t, sd, [3.32]), 0.2); P.drop = 4; } if (t > 3.9) { P.eyes = 'wide'; P.mouth = 'o'; P.drop = 0; P.handR = [30, -120]; } return P; }
  if (t < 5.3) { const u = ehE(tc, 4.84, 0.2, 'out'); P.sit = 1 - u; P.seat = 'bench'; P.sq = 1 + 0.08 * pulse(tc, 4.9, 0.4); P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.eyes = 'wide'; P.mouth = 'open'; P.brow = 0.6; P.gaze = [-1, 0]; return P; }
  Object.assign(P, walk(H3_KX, tc, { stride: 22 })); const x = P.x; P.y = x > 1540 ? 840 : x > 1480 ? K.lerp(905, 840, (x - 1480) / 60) : 905;
  P.y -= Math.abs(Math.sin(P.ph)) * 6 * P.amp; P.sq *= 1 + 0.04 * Math.sin(P.ph * 2) * P.amp; P.mouth = 'open'; P.eyes = 'wide'; P.brow = 0.5; P.handL = [-80, -160]; P.handR = [80, -170];
  if (t >= 7.6 && t < 8.8) { const lift = 22 * flow(tc, [[7.9, 0], [8.15, 1], [8.45, 1], [8.7, 0]]); P.y -= lift; P.handL = [60, -150]; P.handR = [70, -140]; P.mouth = 'smile'; P.lid = 0.7; P.wet = true; P.sq = 1 - 0.06 * pulse(tc, 7.8, 0.4); P.amp = 0; }
  if (t >= 8.8 && t < 9.6) { P.mouth = 'smile'; P.handL = [-30, -100]; P.handR = [36, -110]; P.wet = t < 9.2; P.dir = -1; }
  if (t >= 9.6) { P.dir = 1; P.mouth = 'smile'; P.eyes = 'open'; P.brow = 0.3; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.gaze = [0.8, -0.5]; P.amp = 0;   // v2 (note 10): proud, not cross
    if (t >= 11.84 && t < 12.5) { P.drop = 8 * pulse(tc, 11.84, 0.5); P.tip = 0.06 * pulse(tc, 11.84, 0.5); }
    if (t >= 12.55 && t < 13.24) { P.gaze = [0.6, 0.6]; P.drop = 8 * pulse(tc, 12.55, 0.7); }
    if (t >= 15.46 && t < 16.4) { P.handR = [40, -194]; P.handL = PERSON_HANDS.clasp.L; P.gaze = [1, -0.4]; P.lid = 0.35; P.tip = 0.04; }
    if (t >= 16.5) { P.gaze = [0.2, -1]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 16.5)); P.mouth = 'o'; } }
  return P;
}
// the household (5) and the child: heads turn up one by one, the ragged rush in, listening
const H3_HH = [   // [guest index, x0, x1 (rush), x2 (listening), y, t0 of the rush, seed]
  [0, 620, 940, 960, 926, 6.46, 21], [1, 760, 1030, 870, 936, 6.6, 23], [3, 1420, 1310, 1420, 934, 6.5, 25], [6, 1500, 1390, 1500, 924, 6.75, 27], [5, 1880, 1880, 1880, 840, 99, 29]];
function h3Household(t) {
  const tc = EH_T2(t), out = [];
  H3_HH.forEach(([gi, x0, x1, x2, y, tr, sd], k) => {
    const xf = H3_F([[tr, x0], [tr + 1.1, x1], [9.6, x1], [10.4, x2]]), P = { ...walk(xf, tc, { stride: 22 }), y: gi === 5 ? 840 : y, s: EH_GUESTS[gi].s, dir: xf(t + 0.05) < xf(t) ? -1 : 1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.015), tip: idleSway(tc, sd, 0.025, 2.6 + k * 0.3), mouth: 'smile', gaze: [k < 2 ? 1 : -1, 0], handL: [-26, -96], handR: [28, -98] };
    if (t < 6.4) { P.dir = gi === 5 ? -1 : (k < 2 ? 1 : -1); const up = 2.9 + k * 0.2; if (t > up) { P.gaze = [P.dir * 0.3, -1]; P.lid = Math.max(P.lid, ehBlinkAt(tc, up)); P.mouth = 'o'; } if (k === 1 && t > 3.5) P.handR = PERSON_HANDS.pointUp.R; if (t > 4.02) { P.gaze = [P.dir * 0.9, -0.1]; P.eyes = 'wide'; } }
    else if (t < 9.6) { P.mouth = 'open'; P.eyes = 'wide'; P.dir = x1 > x0 ? 1 : -1; if (Math.abs(x1 - x0) < 1) P.dir = -1;
      if (t > tr + 1.1 || gi === 5) { const cl = Math.sin(tc * 18 + k) > 0; P.handL = cl ? [24, -150] : [-10, -150]; P.handR = cl ? [30, -150] : [64, -150]; P.dir = P.x > 1200 ? -1 : 1; P.mouth = 'smile'; }
      if (gi === 5) { P.handR = [50, -170]; P.fan = Math.sin(tc * 12); } }
    else { P.dir = P.x > 1250 ? -1 : 1; P.mouth = 'smile'; P.gaze = lookAt([P.x, P.y - 190], [1250, 640]); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R;
      if (gi === 1 && t > 10.4) { P.sit = 1; P.seat = 'stool'; P.handL = [20, -100]; P.handR = [30, -100]; }
      const dip = flow(tc, [[12.45 + k * 0.08, 0], [12.85 + k * 0.08, 1], [13.4 + k * 0.08, 0]]); if (dip > 0) { P.drop = 10 * dip; P.gaze = [P.dir * 0.4, 0.8]; }
      if (t > 13.4 && t < 16.34) P.gaze = lookAt([P.x, P.y - 190], [700, 300]);
      if (gi === 1 && t >= 15.46 && t < 16.3) { P.sq *= 1 - 0.04 * pulse(tc, 15.5, 0.8); P.lid = 0.5; P.handL = PERSON_HANDS.chest.R.map((v, i) => (i ? v : -v)); }
      if (t >= 16.34 + k * 0.15) { P.gaze = [0.1 * P.dir, -1]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 16.34 + k * 0.15)); P.mouth = 'o'; } }
    out.push([gi, P]); });
  return out;
}
const H3_CHX = H3_F([[1.0, 1300], [6.5, 1300], [7.3, 1100], [8.8, 1100], [9.1, 1105], [9.9, 1105], [10.3, 1180], [30, 1180]]);
function h3Child(t) {
  const tc = EH_T2(t), sd = 33, P = { ...walk(H3_CHX, tc, { stride: 16 }), y: 948, s: 1, child: true, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.018), tip: idleSway(tc, sd, 0.03, 2.2), mouth: 'smile', gaze: [-1, -0.2], handL: [-26, -96], handR: [28, -98] };
  if (t < 6.5) { if (t > 3.7) { P.gaze = [-0.4, -1]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 3.7)); P.mouth = 'o'; } }
  else if (t < 8.8) { P.mouth = 'open'; P.handL = [-60, -170]; P.handR = [60, -170]; P.y -= 14 * Math.abs(Math.sin(tc * 6)) * (t > 7.3 ? 1 : 0); }
  else if (t < 9.9) { P.dir = -1; P.gaze = [-0.5, -1]; P.handRW = [1112 + 8 * Math.abs(Math.sin(tc * 14)), 790]; P.mouth = 'smile'; P.y = 940; }
  else { P.dir = 1; P.gaze = [0.6, -0.6]; P.y = 952; if (t > 10.24) { P.sit = 1; P.seat = 'floor'; P.handL = [20, -60]; P.handR = [30, -60]; }
    const dip = flow(tc, [[12.8, 0], [13.2, 1], [13.8, 0]]); if (dip > 0) { P.drop = 14 * dip; P.gaze = [0.3, 1]; }
    if (t > 13.4) P.gaze = [-0.6, -0.8]; if (t >= 16.95) { P.gaze = [0, -1]; P.mouth = 'o'; P.lid = Math.max(P.lid, ehBlinkAt(tc, 16.95)); } }
  return P;
}
// the inventor behind the cypress at 720 (the plant): slides into view at 9.0, cups an ear at 15.6, eyes on the blue dome at 17.0
const H3_INVX = H3_F([[8.9, 742], [9.3, 694], [15.4, 694], [15.6, 686], [17.2, 686], [17.6, 742]]);
function h3InvCypress(t) {
  if (t < 8.9) return null; const tc = EH_T2(t), sd = 41, P = { x: H3_INVX(t), y: 878, s: EH_INVENTOR.s, dir: 1, lid: Math.max(0.4, ehLid(t, sd)), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 3.0), mouth: 'closed', brow: 0.4, gaze: [1, 0], handL: [-20, -100], handR: [40, -150] };
  P.gaze = gazePlan(tc, [[8.9, [1, 0]], [9.5, [1, 0.1]], [10.8, [0.6, -0.8]], [12.4, [1, 0.1]], [13.4, [0.6, -0.9]]], 0.07);
  if (t >= 15.6) { P.handR = PERSON_HANDS.cupEar.R; P.tip = 0.06; P.gaze = [0.6, -0.9]; P.lid = 0.45; }
  if (t >= 16.6) { P.gaze = [0.4, -0.9]; P.lid = 0.5; P.mouth = 'smirk'; P.brow = 0.5; }
  return P;
}
function h3CypressFront(ctx) { const x = EH_GARDEN.cypress[1], L = [-1, -1];
  celShade(ctx, [[x, 430], [x + 26, 520], [x + 40, 640], [x + 30, 760], [x - 30, 760], [x - 40, 640], [x - 26, 520]], '#2f7a4a', '#1e5434', { light: L, off: 18, hi: '#4f9a62', lw: 3.5, line: '#123a22' });
  celShade(ctx, [[x - 8, 800], [x - 8, 760], [x + 8, 760], [x + 8, 800]], '#7a4a2a', '#4a2a14', { off: 4, lw: 2.5 }); }
function h3Tray(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, ell(0, 0, 50 * s, 10 * s, 20), '#e0b038', { lw: 2.5, line: '#6a4a10' });
  for (const [dx, c] of [[-20, '#ff8a3a'], [0, '#8ad04a'], [20, '#e8364f']]) ehBlob(ctx, dx * s, -10 * s, 9 * s, 9 * s, c, ehDark(c, 0.3), { lw: 1.5 }); ctx.restore(); }
function h3HomeDoves(ctx, t) {
  const tc = EH_T2(t), dove = (x, y, s, dir, fly, ph, o = {}) => bird(ctx, { kind: 'dove', pal: 0, x, y, s, dir, fly, flap: fly ? Math.sin(tc * 26 + ph) : 0, ...o });
  for (const [k, x0] of [[0, 452], [1, 590], [2, 520]]) { const a = 7.14 + k * 0.1; if (t < a) dove(x0, 848, 0.36, k ? -1 : 1, false, 0, { headRot: Math.sin(tc * 2 + k) * 0.2, lid: ehLid(t, 90 + k) }); else if (t < a + 2.6) { const u = t - a; dove(x0 + (k - 1) * 160 * u, 848 - 300 * u + 30 * u * u, 0.36 + 0.05 * u, k === 0 ? -1 : 1, true, k * 2); } }
}
function h3HomeWorld(ctx, t, cam) {
  const tc = EH_T2(t), H = h3HomeHorse(t), wind = t > 7.1 && t < 8.2 ? pulse(t, 7.14, 1.0) : 0;
  ehGarden(ctx, t, cam, { wind, gadget: 1 });
  h3HomeDoves(ctx, t);
  // the inventor behind the cypress (the front layer of the cypress goes over him)
  const inv = h3InvCypress(t); if (inv) { ehInvTail(ctx, inv, tc, {}); person(ctx, ehDressP(EH_INVENTOR, inv)); h3CypressFront(ctx); }
  // the dais: the king (seated or running) and the fan servant; the tray beside the throne clatters at 4.84
  const HH = h3Household(t), K0 = h3King(t), fan = HH.find((h) => h[0] === 5)[1];
  person(ctx, ehDressP(EH_GUESTS[5], fan)); { const [hx, hy] = ehHandW(fan, fan.handR); ctx.save(); ctx.translate(hx, hy); ctx.rotate((fan.fan || 0) * 0.5 - 0.4); celShade(ctx, [[0, 0], [-30, -70], [0, -84], [30, -70]], '#ffd36a', '#e09a2a', { off: 6, lw: 2.5, line: '#6a4a10' }); ctx.restore(); }
  { const u = t - 4.84, b = u > 0 && u < 0.7 ? Math.abs(Math.sin(u * 12)) * 26 * Math.exp(-u * 4) : 0; h3Tray(ctx, 1856 + (u > 0 ? Math.min(u, 0.4) * 30 : 0), 832 - b, 0.9, u > 0 && u < 0.7 ? 0.3 * Math.sin(u * 20) * Math.exp(-u * 4) : 0); }
  if (K0.y < 880) h3Person(ctx, EH_KING, K0, t);
  // the cart at the right, the horse on the star with its shadow (growing as it comes down) and the rider until 6.2
  h3Shadow(ctx, H3_CART, EH_GR - 18, 330, 0); platformCart(ctx, H3_CART, EH_GR - 20, { dir: 1, wheel: 0 });
  h3Shadow(ctx, H.x, 904, 300 * H3_HS, H.lift, { alpha: 0.3, fall: 520 });
  if (t > 4.02 && t < 4.9) dustBurst(ctx, H.x, 902, t - 4.02, 12, 8, 18, 150, 0.8, 7);
  if (t < 6.2) { const PP = { s: EH_FIRUZ.s, lid: ehLid(t, 3), mouth: 'smile', gaze: [0.6, 0.4], brow: 0.4, handL: [70, -110], handR: [76, -100], sq: breathe(tc, 3, 0.016) * (t > 4.02 ? landSquash(tc, 4.02, 0.12) : 1), lurch: t < 4.02 ? 0.1 : 0.1 * Math.exp(-(t - 4.02) * 4) };
    if (t > 4.84) { PP.gaze = [1, 0]; PP.eyes = 'wide'; PP.handR = [70, -200]; PP.mouth = 'open'; }
    ehRide(ctx, H, 'firuz', PP, t, { tc, stream: t < 4.02 ? 0.5 : 0, ang: Math.PI / 2 + 0.6 }); }
  else ebonyHorse(ctx, H);
  if (H.lift > 4) ehWindRibbons(ctx, H, tc, { ang: -Math.PI / 2 - 0.3, len: 160 });
  // the cast in depth order
  const rows = [], fz = h3FzHome(t), ch = h3Child(t);
  if (K0.y >= 880) rows.push([K0.y, () => h3Person(ctx, EH_KING, K0, t)]);
  for (const [gi, P] of HH) if (gi !== 5) rows.push([P.y, () => h3Person(ctx, EH_GUESTS[gi], P, t)]);
  rows.push([ch.y, () => h3Person(ctx, EH_CHILD, ch, t)]);
  if (fz) rows.push([fz.y > 900 ? fz.y : 900.5, () => h3Person(ctx, EH_FIRUZ, fz, t, { cape: true, vx: t > 6.6 && t < 7.6 ? 60 : 0, swing: swing(tc, 6.62, 0.3) + swing(tc, 9.96, 0.3) })]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  // petals thrown in the rush, the inventor's glint at 17.0
  if (t > 6.9 && t < 8.6) for (let i = 0; i < 14; i++) { const R = K.rng(300 + i), u = (t - 6.9 - R() * 0.3) / 1.4; if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = 1 - u * u; ctx.fillStyle = ['#ff6a8a', '#ffd36a', '#fff6ea'][i % 3]; ctx.translate(1200 + (R() - 0.5) * 300 + 60 * Math.sin(u * 6 + i), 640 + u * 280); ctx.rotate(u * 8 + i); ctx.fillRect(-5, -3, 10, 6); ctx.restore(); } }
  if (inv && t > 17.0 && t < 17.5) { const [hx, hy] = ehHeadOf(inv); ehGlint(ctx, hx + 18, hy - 6, 22, (t - 17.0) / 0.5); }
  ehGardenFront(ctx, t);
}
// camera: whole palace at 0.62, crane in to 0.9 for the run and hug; S3 pans left so the cypress comes into the left third
const H3_HCAM = [[2.58, { x: 1200, y: 400, zoom: 0.62 }], [3.9, { x: 1200, y: 400, zoom: 0.62 }], [5.8, { x: 1340, y: 550, zoom: 0.9 }], [7.2, { x: 1250, y: 550, zoom: 0.9 }], [9.6, { x: 1180, y: 550, zoom: 0.9 }], [15.4, { x: 960, y: 550, zoom: 0.9 }], [18.4, { x: 940, y: 545, zoom: 0.9 }]];
function h3HomeCam(t) { const c = K.camAt(H3_HCAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, EH_GARDEN.w - 500 / z), y: K.clamp(c.y, EH_GARDEN.top + 615 / z, 1230 - 615 / z), zoom: z }; }
// ---------- S3 picture clouds (inside units: a 1000 x 1230 sky panel) ----------
function h3CloudLever(c, t) {   // 10.7 - 13.24: the tiny rider on the deck, hands walking the mane; then the lever insert of episode 1
  const tc = EH_T2(t);
  if (t < 11.84) { c.drawImage(ehSkyPlate('high'), 0, 0, 1000, 1230); ehTile(c, ehCloudTile('mid', 'day'), -t * 60, 0, 0.8); ehDeck(c, 780, -t * 120, t, 'day');
    const H = ehRigP(500, 520, 0.8, 1, 0), ps = EH_FIRUZ.s * 0.8 / H3_HS, j = Math.min(5, Math.floor((tc - 11.2) / 0.12)), mane = EH_EBG.mane[Math.max(0, j)];
    ehRide(c, H, 'firuz', { s: ps, lid: 0.2, mouth: 'o', gaze: [0.8, 0.6], lurch: 0.3, handR: t > 11.2 ? h3Loc(H, ps, [mane[0], mane[1] - 6]) : [76, -100], handL: [70, -110] }, t, { tc, stream: 1 }); return; }
  ehGrad(c, 0, 0, 1000, 1230, EH_SKY.gold); const s = 3.6, lx = 520, ly = 560, H = { x: lx - EH_EBG.lever[0] * s, y: ly - EH_EBG.lever[1] * s, s, dir: 1, close: true, reveal: 1, lever: t > 12.4 ? 0.5 : 0, lit: t > 12.45 ? { neck: 0.6 } : {} };
  ebonyHorse(c, H); ehGlow(c, lx, ly, 200, 0.5 + 0.3 * Math.sin(t * 8), '#ffd36a'); handInsert(c, lx - 70, ly + 60, { s: 0.9, grip: t > 12.3 ? 1 : 0.2, point: t > 12.3 ? 0 : 0.8, rot: -0.35, sleeve: '#eadcc0', cuff: '#f2c040' });
}
function h3CloudFar(c, t) {   // 13.24 - 17.72: the dashed arc over the clouds, the tiny horse rides it, the river city rises at its end
  const tc = EH_T2(t); c.drawImage(ehSkyPlate('low'), 0, 0, 1000, 1230); ehTile(c, ehCloudTile('far', 'day'), -t * 30, 0, 0.9); ehDeck(c, 860, -t * 40, t, 'day');
  const a = [80, 760], b = [820, 560], p = K.clamp((tc - 13.3) / 1.5); h3DashArc(c, a, b, 0.5, p, '#ff7ad9', 14);
  const pts = K.trim(K.arcPts(a, b, 0.5, 40), Math.max(0.02, p)), e = pts[pts.length - 1];
  const rise = ehE(tc, 14.82, 0.6, 'out'); if (rise > 0) { c.save(); c.globalAlpha = rise; h3Palace(c, 820, 900 - 200 * rise, 0.9, false); ehRiverTowers(c, 630, 980, 900 - 200 * rise, 260, 50, EH_RC_DUSK, {}); c.restore(); if (t > 17.0 && t < 17.6) ehGlint(c, 820 - 270, 900 - 200 - 300, 60, (t - 17.0) / 0.6); }
  ehRide(c, ehRigP(e[0], e[1] - 60, 0.45, 1, 0.1), 'firuz', { s: EH_FIRUZ.s * 0.45 / H3_HS, lid: 0, mouth: 'smile', handL: [70, -110], handR: [76, -100] }, t, { tc, stream: 1 });
}
function h3HomeOver(ctx, t, cam, S) {
  const P = (x, y) => h3P(x, y, cam), fz = h3FzHome(t), K0 = h3King(t), fzH = fz ? P(...ehHeadOf(fz)) : null, kH = P(...ehHeadOf(K0));
  if (t >= 5.9 && t < 7.7) h3Say(ctx, S, [[5.9, 'MY SON!']], t, kH, { gone: 7.45, size: 54, up: 170 });
  if (fzH && t >= 10.7 && t < 17.95) { const p1 = t < 13.04 ? K.clamp((t - 10.7) / 0.5) : 1 - K.clamp((t - 13.04) / 0.2), p2 = t < 13.24 ? 0 : t < 17.5 ? K.clamp((t - 13.24) / 0.4) : 1 - K.clamp((t - 17.5) / 0.4);
    if (p1 > 0) thoughtCloud(ctx, 560, 300, 560, 400, t, { p: p1, tail: [fzH[0] - 20, fzH[1] - 50], seed: 5, bg: '#bfe6ff', scale: 0.42, at: [500, 615], inside: (c) => h3CloudLever(c, t) });
    if (p2 > 0) thoughtCloud(ctx, 520, 300, 620, 420, t, { p: p2, tail: [fzH[0] - 20, fzH[1] - 50], seed: 7, bg: '#bfe6ff', scale: 0.44, at: [500, 700], inside: (c) => h3CloudFar(c, t) }); }
}
