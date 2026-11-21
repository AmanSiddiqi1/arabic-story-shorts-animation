// ===== HORSE-01 "The Flying Wooden Horse": the palace garden world, S1 - S8 part A (0 - 75.12 s) =====
// One continuous world (palaceGarden, 2000 wide) drawn through a keyed camera; every character is a pose function of the
// cel-stepped time (on twos), camera and light on every frame. The two knob inserts are panel shots (h01_inserts in h01_sky.js).

const H1_HS = 0.9;                                   // the ebony horse's scale in the garden
const H1_CX = 1020;                                   // the court star (the horse's spot)
const H1_CART_TOP = EH_GR - 58;
const H1_F = (keys) => (t) => flow(t, keys);
// ---------- the cart and the horse ----------
const H1_XH = H1_F([[4.4, 20], [5.0, 60], [6.0, 160], [12.6, 905], [13.6, 1004], [14.3, 1020], [15, 1020]]);
const H1_SEAMS = footfalls((t) => H1_XH(t), 7.6, 14.3, 60 / Math.PI).filter((f) => f.x > 640).map((f) => f.t);
// demo flight 40.76 - 46.9: body centre, facing and pitch (turns in 4 drawings: 1, 0.45, -0.45, -1)
const H1_ONCART_CY = H1_CART_TOP - 182 * H1_HS;
function h1DemoRig(t) {
  const turn = (a, from) => { const k = Math.min(3, Math.floor((t - a) / 0.083)); const seq = [1, 0.45, -0.45, -1]; return from * seq[k]; };
  let cx = H1_CX, cy = H1_ONCART_CY, dir = 1, pitch = 0;
  if (t >= 40.76 && t < 43.0) cy = K.lerp(H1_ONCART_CY, 338, K.ease.in(K.clamp((t - 40.76) / 2.1)) * 0.75 + 0.25 * ehE(t, 40.76, 2.2));
  else if (t >= 43.0 && t < 43.36) { cy = 338 + 6 * Math.sin((t - 43) * 9); dir = turn(43.0, 1); }
  else if (t >= 43.36 && t < 44.82) { const u = ehE(t, 43.36, 1.46); cx = K.lerp(H1_CX, 420, u); cy = K.lerp(338, 170, u) + 6 * Math.sin(t * 4); dir = -1; pitch = 0.14 * Math.sin(Math.PI * Math.min(1, u * 1.3)); }
  else if (t >= 44.82 && t < 45.15) { cx = 420; cy = 170; dir = turn(44.82, -1); }
  else if (t >= 45.15 && t < 46.0) { const u = ehE(t, 45.15, 0.85); cx = K.lerp(420, H1_CX, u); cy = K.lerp(170, 356, u); pitch = -0.08 * Math.sin(Math.PI * u); }
  else if (t >= 46.0 && t < 46.9) { cy = K.lerp(356, H1_ONCART_CY, K.ease.out(K.clamp((t - 46.0) / 0.9))); }
  return { cx, cy, dir, pitch };
}
// launch 71.65: straight up, nose up 55 degrees, out of the top of the frame by 74.4
function h1LaunchRig(t) { const u = t - 71.65, cy = H1_ONCART_CY - 60 * u - 520 * u * u, pitch = Math.min(0.96, u * 4) ; return { cx: H1_CX + 40 * u * u, cy, dir: 1, pitch }; }
function h1Lit(t) {
  let L = {};
  if (t >= 39.48 && t < 47.2) L = ehLitMax(L, ehPowerOn(t, 39.48, 0.22, 0.3));
  if (t >= 70.04) L = ehLitMax(L, ehPowerOn(t, 70.04, 0.11, 0.65, 1));
  if (t >= 70.6) L = ehLitMax(L, ehPowerOn(t, 70.6, 0.11, 0.65, 1));
  return L;
}
// the horse's P at time t (feet, rot, lit, knob)
function h1Horse(t) {
  const tc = EH_T2(t), lit = h1Lit(t), knob = t < 38.6 ? 0 : t < 69.4 ? Math.PI / 2 : Math.PI * 1.02 + 0.05 * Math.sin(tc * 30) * K.clamp(1 - (t - 69.4));
  if (t < 14.6) { const x = H1_XH(t), rk = 0.012 * kick(t, H1_SEAMS, 1, 12, 9); return { x, y: H1_CART_TOP + 2 * kick(t, H1_SEAMS, 1, 12, 9), s: H1_HS, dir: 1, rot: rk, lit, knob, cartX: x, sag: 6 }; }
  let r = null; if (t >= 40.76 && t < 46.9) r = h1DemoRig(t); if (t >= 71.65) r = h1LaunchRig(t);
  if (r) { const P = ehRigP(r.cx, r.cy, H1_HS, r.dir, r.pitch, { lit, knob }); P.cartX = H1_CX; P.air = true; P.lift = H1_ONCART_CY - r.cy; P.sag = 0; return P; }
  const onSag = (t > 36.1 && t < 48.9) || t > 67.38 ? 9 : 6, dip = 6 * Math.exp(-Math.max(0, t - 36.1) * 6) * (t > 36.1 ? 1 : 0) + 7 * Math.exp(-Math.max(0, t - 46.9) * 6) * (t > 46.9 ? 1 : 0) + 8 * Math.exp(-Math.max(0, t - 67.38) * 6) * (t > 67.38 ? 1 : 0);
  return { x: H1_CX, y: H1_CART_TOP + onSag + dip, s: H1_HS, dir: 1, rot: 0, lit, knob, cartX: H1_CX, sag: onSag + dip };
}
const h1Pt = (H, p) => ehHorsePt(H, p);

// ---------- the inventor ----------
const H1_INV_WALK = H1_F([[14.5, 845], [16.3, 1235], [17, 1235]]);
const H1_INV_S7 = H1_F([[58.94, 1235], [59.9, 1080], [67.3, 1080], [67.6, 1040], [68.3, 1050]]);
const H1_INV_BOW = [[16.3, 0], [16.9, 0.3], [17.6, 0.3], [21.9, 0.26], [22.9, 0], [24.2, 0], [26.4, -0.02], [27.2, -0.06], [29.6, -0.04], [30.4, 0]];
function h1InvMounted(t) { return (t >= 36.1 && t < 48.8); }
function h1InvGround(t) {
  const tc = EH_T2(t), D = EH_INVENTOR, sd = 7;
  const P = { s: D.s, dir: 1, y: 935, lid: ehLid(t, sd, [], 0.35), brow: 0.3, mouth: 'smile', sq: breathe(tc, sd), tip: idleSway(tc, sd, 0.02, 3.4) };
  if (t < 14.5) {   // pushing the cart in
    const xf = (u) => H1_XH(u) - 175; Object.assign(P, walk(xf, tc, { stride: 24 })); P.y = 905; P.tip = 0.1 + idleSway(tc, sd, 0.015, 1.3);
    const H = h1Horse(tc), bx = H.cartX - 170, by = H1_CART_TOP - 98; P.handLW = [bx - 6, by]; P.handRW = [bx + 8, by - 4];
    if (t > 9.26 && t < 10.9) { P.sq = anticipate(tc, 9.26, 0.3, 0.06) * (1 + 0.04 * pulse(tc, 9.56, 0.6)); P.tip = 0.16 * pulse(tc, 9.4, 1.4) + 0.1; }
    if (t > 13.34) { P.tip = 0.1 + lurch(tc, 13.4, 0.12); P.sq = settleTo(tc, 13.4, 1, 1, 0.4, 0.05); if (t > 13.8) { const k = Math.sin(tc * 30) * 8; P.handLW = null; P.handRW = null; P.handL = [-10 + k, -112]; P.handR = [18 - k, -116]; P.tip = 0; } }
    P.gaze = [1, -0.1]; return P;
  }
  if (t < 35.1) {
    P.x = H1_INV_WALK(tc); Object.assign(P, walk(H1_INV_WALK, tc, { stride: 24 })); P.tip = flow(tc, H1_INV_BOW) + idleSway(tc, sd, 0.015, 3.4);
    const kingHead = [1760, 640], neck = h1Pt(h1Horse(t), [70, -230]);
    P.gaze = t < 16.3 ? [1, 0] : lookAt([P.x, 700], kingHead); P.lid = ehLid(t, sd, [16.3, 22.3], 0.35);
    if (t > 16.4 && t < 22.26) { P.handR = PERSON_HANDS.chest.R; P.handL = [-30, -96]; }
    if (t >= 22.26 && t < 23.74) { P.handR = [40, K.lerp(-150, -215, ehE(tc, 22.3, 0.4))]; P.gaze = [-0.4, 0.1]; }   // the finger: laughter dies
    if (t >= 23.74 && t < 27.66) { P.handLW = [neck[0] + 30, neck[1] + 10]; P.dir = -1; P.gaze = lookAt([P.x, 700], kingHead);
      P.handR = [44, -200 + (t > 25.56 && t < 26.2 ? 10 * Math.sin(tc * 30) : 0)]; P.talk = ehTalk(t, 24.2, 25.9, 3) + ehTalk(t, 26.28, 29.5, 4); }
    if (t >= 27.66 && t < 29.72) { const u = ehE(tc, 27.66, 0.9); P.dir = 1; P.handR = [K.lerp(100, 50, u), K.lerp(-150, -250, u)]; P.handL = [-30 + 10 * lagged((v) => ehE(v, 27.66, 0.9), tc, 0.12, 1), -96];
      P.gaze = [0.5 * (1 - u) + 0.2, -0.3 - 0.7 * u]; P.talk = ehTalk(t, 26.28, 29.5, 4); P.brow = -0.2; }
    if (t >= 29.72) { P.gaze = lookAt([P.x, 700], kingHead); if (t > 32.5) P.mouth = 'smile'; }
    return P;
  }
  if (t < 36.1) {   // bows, crouches and hops up into the saddle (lands seated at 36.1)
    const H = h1Horse(t), seat = mountSeat('horse', H), sx = seat.x + 22 * D.s, sy = seat.y + 52 * D.s, [hx, lift] = hop(tc, 35.5, 0.6, 1235, sx, 80);
    P.x = hx; P.y = K.lerp(935, sy, ehE(tc, 35.5, 0.6)) - lift; P.sq = anticipate(tc, 35.2, 0.3, 0.1); P.tip = 0.2 * pulse(tc, 35.1, 0.5); P.gaze = [-1, 0.2]; P.lift = 935 - P.y; return P;
  }
  if (t < 48.8) return null;
  if (t < 49.4) { const H = h1Horse(t), seat = mountSeat('horse', H), [hx, lift] = hop(tc, 48.8, 0.5, seat.x + 22, 1235, 60); P.x = hx; P.y = K.lerp(seat.y + 52, 935, ehE(tc, 48.8, 0.5)) - lift; P.sq = landSquash(tc, 49.3, 0.12); P.lift = 935 - P.y; P.handR = PERSON_HANDS.wave.R; return P; }
  // after the demo: proud bow, then the warning scene (S7)
  P.x = H1_INV_S7(tc); Object.assign(P, walk(H1_INV_S7, tc, { stride: 22 })); P.sq = landSquash(tc, 49.3, 0.12) * breathe(tc, sd);
  const knob = h1Pt(h1Horse(t), EH_EBG.knob), ear = h1Pt(h1Horse(t), EH_EBG.lever), fz = h1FiruzGround(t);
  P.tip = flow(tc, [[49.3, 0], [49.6, 0.24], [50.0, 0.24], [50.5, 0]]) + idleSway(tc, sd, 0.015, 3.4); if (t < 50.3) { P.handR = PERSON_HANDS.chest.R; P.handL = [-90, -150]; }
  P.gaze = fz ? lookAt([P.x, 720], ehHeadOf(fz)) : [-1, 0]; P.lid = ehLid(t, sd, [55.9, 66.0], t > 54.06 && t < 56 ? 0.45 : 0.35); P.brow = t > 54 && t < 56 ? 0.45 : 0.3;
  if (t >= 58.94 && t < 60.5) { P.handL = [-70, -190]; P.handR = [80, -185]; P.brow = -0.6; P.mouth = 'o'; P.tip = 0.06 * Math.sin(tc * 18) * K.clamp(1 - (tc - 59.6)); }
  if (t >= 60.5 && t < 63.1) { P.handL = [-28, -100]; P.handR = [44, -205 + (t > 61.62 ? 8 * Math.abs(Math.sin(tc * 9)) : 0)]; P.tip = 0.07; P.brow = -0.3; P.mouth = 'closed'; P.talk = ehTalk(t, 61.62, 64.4, 5); }
  if (t >= 63.1 && t < 63.68) { P.handRW = [knob[0] + 4, knob[1] + 6]; P.handL = [-28, -100]; P.gaze = lookAt([P.x, 720], knob); P.talk = ehTalk(t, 61.62, 64.4, 5); }
  if (t >= 63.68 && t < 65.6) { P.handRW = [ear[0], ear[1] + 4]; P.handL = [-28, -100]; P.gaze = lookAt([P.x, 720], ear); P.talk = ehTalk(t, 61.62, 64.4, 5); }
  if (t >= 65.6 && t < 67.38) { P.handR = [90, -170]; P.handL = [-28, -100]; const u = ehE(tc, 66.0, 0.4); P.gaze = [K.lerp(0.6, -0.9, u), 0]; P.dir = u > 0.5 ? -1 : 1; P.brow = -0.4; }
  if (t >= 67.38 && t < 70.04) { P.dir = -1; P.tip = 0.18 * pulse(tc, 67.38, 1.0) + lagged((v) => 0.18 * pulse(v, 67.38, 1.0), tc, 0.1, 0.4); P.handR = [110, -150]; P.handL = [-40, -120]; P.mouth = 'o'; P.brow = -0.7; P.gaze = [-0.8, -0.5]; }
  if (t >= 70.04) { P.dir = -1; P.handL = [-60, -240]; P.handR = [60, -246]; P.mouth = 'o'; P.brow = -0.8; P.tip = -0.08 * ehE(tc, 70.04, 0.3) + tremble(tc, 0.01, 6); P.gaze = lookAt([P.x, 700], h1Pt(h1Horse(t), [0, -200])); }
  return P;
}
// the inventor riding the demo (36.1 - 48.8): rideOn person fields
function h1InvRider(t) {
  const tc = EH_T2(t), sd = 7, H = h1Horse(t), P = { lid: ehLid(t, sd, [36.6, 43.1, 44.9], 0.35), brow: 0.25, mouth: 'smile', handL: [40, -110], handR: [50, -112], sq: breathe(tc, sd) };
  if (t < 37.64) { const u = ehE(tc, 36.9, 0.7); P.gaze = [K.lerp(-0.8, 0.8, ehE(tc, 36.2, 0.6)), 0.1 + 0.6 * u]; P.handR = [K.lerp(50, 66, u), K.lerp(-112, -40, u)]; }
  else if (t < 40.76) { P.handR = [66, -40]; P.gaze = [0.6, 0.6]; P.lurch = 0.05; }
  else { P.gaze = [H.dir > 0 ? 0.6 : -0.6, 0.4]; P.lurch = (H.dir > 0 ? 1 : -1) * 0.04 + 0.05 * Math.sin(tc * 3); P.handL = [44, -112]; P.handR = [56, -110];
    if (t > 42.86 && t < 43.5) { P.handR = [60 + 10 * Math.sin(tc * 24), -230]; P.mouth = 'open'; } if (t > 46.4) P.lurch = lurch(tc, 46.9, 0.18); }
  if (t > 47.0) { P.mouth = 'smile'; P.gaze = [1, -0.2]; P.handR = [70, -200]; }
  return P;
}

// ---------- Prince Firuz on the ground (until the vault at 66.66) ----------
const H1_FZ_X = H1_F([[50.1, 1300], [52.3, 1146], [52.5, 1150], [65.12, 1150], [65.4, 1136], [66.4, 990], [66.7, 985]]);
function h1FiruzGround(t) {
  if (t >= 66.66) return null;
  const tc = EH_T2(t), sd = 3, H = h1Horse(t), D = EH_FIRUZ;
  const P = { x: H1_FZ_X(tc), y: 930, s: D.s, dir: 1, lid: ehLid(t, sd, [4.5, 55.9]), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'closed' };
  if (t >= 50.1) Object.assign(P, walk(H1_FZ_X, tc, { stride: 22 }));
  const head = [P.x, 720], hh = h1Pt(H, [180, -280]), knob = h1Pt(H, EH_EBG.knob);
  // S1: bored by the tin bird; the glance to the gate
  if (t < 6.72) { P.gaze = t < 4.4 ? lookAt(head, [1360, 790]) : [-1, 0]; P.lid = Math.max(0.3, P.lid); P.tip += 0.03; P.handL = PERSON_HANDS.hipsHands.L; }
  else P.gaze = lookAt(head, hh);
  if (t >= 6.72 && t < 7.8) P.x += 10 * ehE(tc, 6.8, 0.4);
  if (t >= 7.8 && t < 50.1) P.x += 10;
  if (t >= 19.3 && t < 22.0) { P.handR = PERSON_HANDS.chin.R; P.gaze = lookAt(head, knob); P.tip = 0.05 + idleSway(tc, sd, 0.02, 2.9); }
  if (t >= 27.9 && t < 29.4) P.gaze = t < 28.9 ? [-0.3, -1] : lookAt(head, knob);
  if (t >= 36.2 && t < 40.76) P.gaze = lookAt(head, knob);
  if (t >= 40.76 && t < 47.0) { const c = h1Pt(H, [0, -180]); P.gaze = lookAt(head, c); P.mouth = 'o'; P.eyes = 'wide'; P.tip = -0.06 + idleSway(tc, sd, 0.02, 2.9); }
  if (t >= 47.0 && t < 49.3) { const k = Math.abs(Math.sin(tc * 11)); P.handL = [-8 - 22 * k, -140]; P.handR = [10 + 22 * k, -140]; P.mouth = 'smile'; }
  if (t >= 50.1 && t < 52.4) { P.gaze = lookAt(head, hh); P.dir = -1; P.mouth = 'smile'; }
  if (t >= 52.3) P.dir = -1;
  if (t >= 52.42 && t < 53.4) { const u = flow(tc, [[52.42, 0], [52.7, 1], [53.0, 0.6], [53.4, 0]]); P.tip = 0.3 * u + lagged((v) => 0.3 * flow(v, [[52.42, 0], [52.7, 1], [53.0, 0.6], [53.4, 0]]), tc, 0.1, 0.4); P.drop = 10 * u;
    const hoof = h1Pt(H, [90, -20]), chest = h1Pt(H, EH_EBG.chest), neck = h1Pt(H, [100, -250]); P.handRW = tc < 52.75 ? hoof : tc < 53.05 ? chest : neck; P.gaze = lookAt(head, P.handRW); }
  if (t >= 53.4 && t < 54.06) { const u = ehE(tc, 53.4, 0.6); P.gaze = lookAt(head, h1Pt(H, [K.lerp(220, -170, u), -240])); P.lid = Math.max(P.lid, ehBlinkAt(tc, 53.7)); }
  if (t >= 54.06 && t < 55.81) { P.gaze = lookAt(head, knob); P.eyes = t < 54.4 ? 'wide' : 'open'; P.mouth = t > 54.5 ? 'smile' : 'o'; P.tip = 0.06;
    if (t > 55.2) { P.handRW = [knob[0] + 18, knob[1] - 6 + (tc > 55.4 && tc < 55.5 ? 6 : 0)]; P.tip = 0.12; } }
  if (t >= 55.81) { P.gaze = lookAt(head, [H1_INV_S7(tc), 735]); P.lid = Math.max(P.lid, ehBlinkAt(tc, 55.9)); P.mouth = 'smile';
    P.sq = (P.sq || 1) * (t > 58.14 && t < 58.9 ? 1 + 0.045 * Math.sin((tc - 58.14) * Math.PI * 2 / 0.38) : 1); }
  if (t >= 57.16 && t < 58.9) { P.talk = ehTalk(t, 57.16, 58.8, 9); P.handR = t < 58.0 ? PERSON_HANDS.chest.R : null; if (t >= 58.0) P.handLW = h1Pt(H, [-8, -250]); }
  if (t >= 62.0 && t < 65.12) { const stir = h1Pt(H, [20, -150]); P.gaze = lookAt(head, stir); P.mouth = 'smile'; if (t > 63.68) { P.y = 930; P.tip = 0.08; } }
  if (t >= 65.12) { const u = flow(tc, [[65.12, 0], [65.5, 1], [66.2, 1], [66.5, 0.3]]); P.drop = 28 * u; P.tip = -0.18 * u; P.mouth = 'smile'; P.gaze = [-1, 0.2]; P.dir = -1; P.handL = [-60, -130]; }
  return P;
}
// Firuz in the saddle (67.38 on, garden): vault landing, the hand to the knob, the grin that becomes an 'o'
function h1FiruzRider(t) {
  const tc = EH_T2(t), sd = 3, P = { lid: ehLid(t, sd), mouth: 'smile', handL: [40, -110], handR: [56, -112], sq: landSquash(tc, 67.38, 0.12) * breathe(tc, sd, 0.014), lurch: lurch(tc, 67.38, 0.12), gaze: [0.7, 0.5] };
  if (t >= 68.16) { const u = ehE(tc, 68.16, 0.5); P.handR = [K.lerp(56, 64, u), K.lerp(-112, -40, u)]; P.gaze = [0.6, 0.8]; P.brow = 0.3; }
  if (t >= 70.04) { P.mouth = 'o'; P.eyes = 'wide'; P.handL = [60, -70]; P.handR = [66, -40]; P.gaze = [0.4, 0.6]; P.brow = -0.5; }
  if (t >= 71.65) { P.lurch = 0.35 * K.clamp((tc - 71.65) * 4); P.lid = 1; P.mouth = 'closed'; P.eyes = 'shut'; P.handL = [70, -90]; P.handR = [78, -60]; }
  return P;
}
// the vault 66.66 - 67.38: anticipation crouch, hop 110 high from the ground into the saddle
function h1FiruzVault(t) {
  const tc = EH_T2(t), H = h1Horse(t), seat = mountSeat('horse', H), D = EH_FIRUZ, sx = seat.x + 22 * D.s, sy = seat.y + 52 * D.s, [x, lift] = hop(tc, 66.78, 0.6, 985, sx, 110);
  return { x, y: K.lerp(930, sy, ehE(tc, 66.78, 0.6)) - lift, s: D.s, dir: 1, sq: tc < 66.78 ? 0.9 : 1.06, tip: -0.1, gaze: [0.6, 0.3], mouth: 'smile', handL: [-60, -230], handR: [70, -220], lift: 930 - (K.lerp(930, sy, ehE(tc, 66.78, 0.6)) - lift) };
}

// ---------- the king ----------
const H1_KING_SIT = H1_F([[0, 0], [5.6, 0], [6.3, 1], [41.98, 1], [42.5, 0], [50.6, 0], [51.4, 1], [64.44, 1], [64.8, 0.5], [65.6, 0.5], [66.0, 1], [72.2, 1], [72.6, 0]]);
function h1King(t) {
  const tc = EH_T2(t), sd = 11, D = EH_KING, sit = H1_KING_SIT(tc);
  const P = { x: EH_GARDEN.throne.x, y: EH_GARDEN.throne.sitY, s: D.s, dir: -1, sit, seat: 'bench', lid: ehLid(t, sd), mouth: 'smile', sq: breathe(tc, sd, 0.018), tip: idleSway(tc, sd, 0.02, 3.6), gaze: [-1, 0.2] };
  if (t < 4.8) { if (sit < 0.5) P.x = 1730; const arms = ehE(tc, 0.54, 0.5), lag = lagged((v) => ehE(v, 0.54, 0.5), tc, 0.12, 0.5);
    P.handL = [K.lerp(-30, -100, arms + lag), K.lerp(-96, -170, arms)]; P.handR = [K.lerp(30, 100, arms + lag), K.lerp(-96, -170, arms)]; P.sq *= 1 + 0.03 * ehE(tc, 0.54, 0.4) - 0.03 * ehE(tc, 1.5, 0.5);
    if (t > 2.88) { const u = ehE(tc, 2.88, 0.5); P.handL = null; P.handR = [K.lerp(100, 110, u), K.lerp(-170, -150, u)]; P.handL = [-30, -100]; P.gaze = [-1, 0.3]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 2.9)); }
    P.mouth = t > 0.54 && t < 3.4 ? 'open' : 'smile'; }
  if (t >= 17.0 && t < 18.12) { P.tip = 0.08 * ehE(tc, 17, 0.4); P.handR = PERSON_HANDS.chin.R; P.brow = -0.4; P.handR = [16 + 4 * Math.sin(tc * 12), -160]; }
  if (t >= 18.12 && t < 22.5) { P.mouth = 'open'; P.sq *= 1 + 0.02 * Math.abs(Math.sin(tc * 7)); }
  if (t >= 29.72 && t < 36.2) { P.gaze = [-1, 0.25]; const back = flow(tc, [[31.02, 0], [31.4, -0.06], [31.8, -0.06], [32.3, 0.08], [34.4, 0.06], [35, 0]]); P.tip = back + idleSway(tc, sd, 0.015, 3.6); P.brow = t < 32.3 ? -0.5 : 0.1;
    if (t > 31.9) { P.handL = [-34, -70]; P.handR = [34, -70]; }
    if (t >= 32.44 && t < 33.82) { P.handR = [110, -150]; P.handL = [-34, -70]; P.talk = ehTalk(t, 32.44, 33.6, 11); P.mouth = 'smile'; }
    if (t >= 33.82 && t < 34.6) { const u = ehE(tc, 33.82, 0.6); P.handR = [K.lerp(110, -40, u), -150 + 30 * Math.sin(u * Math.PI)]; P.gaze = [K.lerp(-1, 0.6, u), 0.2]; } }
  if (t >= 41.98 && t < 47.0) { const H = h1Horse(t), c = h1Pt(H, [0, -180]); P.gaze = lookAt([P.x, 640], c); P.mouth = 'o'; P.eyes = 'wide'; P.handL = [-40, -110]; }
  if (t >= 47.2 && t < 49.6) { const k = Math.abs(Math.sin(tc * 9)); P.handL = [-20 - 24 * k, -250]; P.handR = [20 + 24 * k, -250]; P.mouth = 'open'; P.sq *= 1 + 0.03 * Math.abs(Math.sin(tc * 9 + 0.6)); P.tip = 0.02 * Math.sin(tc * 9 - 0.9); }
  if (t >= 64.44 && t < 66.0) { P.handR = [70, -230]; P.brow = -0.7; P.mouth = 'o'; P.gaze = [-1, 0.25]; }
  if (t >= 72.2) { const H = h1Horse(t), c = h1Pt(H, [0, -180]); P.gaze = lookAt([P.x, 640], c); P.mouth = 'o'; P.eyes = 'wide'; P.tip = -0.1 * ehE(tc, 72.4, 0.4);
    if (t > 74.36) { P.handL = [-8, -230]; P.handR = [40, -300]; P.tip = -0.12; } }
  return P;
}

// ---------- the guests and the child ----------
const H1_G = [ { x: 830, y: 872, dir: 1 }, { x: 742, y: 866, dir: 1 }, { x: 664, y: 878, dir: 1 }, { x: 1252, y: 905, dir: -1 }, { x: 1372, y: 913, dir: -1 }, { x: 1906, y: 840, dir: -1 }, { x: 1474, y: 886, dir: -1 } ];
const H1_G4_X = H1_F([[19.5, 1372], [20.4, 1232], [29.8, 1232], [30.9, 1372]]);
const H1_G6_X = H1_F([[2.2, 1060], [4.6, 1474]]);
const H1_HAT = [72.68, 74.6];
function h1Guest(i, t) {
  const tc = EH_T2(t), g = H1_G[i], D = EH_GUESTS[i], sd = 40 + i * 13, st = stagger(i, 0.14);
  const P = { x: g.x, y: g.y, dir: g.dir, s: D.s * (g.y < 880 ? 0.93 : 1), lid: ehLid(t, sd), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.6 + i * 0.37), mouth: 'closed' };
  if (i === 4) { P.x = H1_G4_X(tc); if (t > 19.5 && t < 30.9) Object.assign(P, walk(H1_G4_X, tc, { stride: 22 })); }
  if (i === 6 && t < 4.6) { P.x = H1_G6_X(tc); Object.assign(P, walk(H1_G6_X, tc, { stride: 22 })); P.y = 884; }
  const head = ehHeadOf(P), H = h1Horse(t), hh = h1Pt(H, [180, -280]), inv = h1InvGround(t), invH = inv ? ehHeadOf(inv) : h1Pt(H, [-8, -470]), king = [1730, 640];
  const fz = h1FiruzGround(t), fzH = fz ? ehHeadOf(fz) : h1Pt(H, [-8, -470]);
  let tg = [g.x + g.dir * 140, head[1] + 10];                                     // chatting with a neighbour
  if (t < 4.8) { P.talk = (i % 2 ? ehTalk(t, 0.4 + i * 0.3, 2.0 + i * 0.4, sd) : ehTalk(t, 2.2 + i * 0.2, 3.6 + i * 0.3, sd)); if (t > 3.7 + st && i >= 3) tg = [1390, 780]; }
  if (t >= 6.2 + st) tg = hh;
  if (t >= 18.12 + st * 0.6 && t < 22.6 + i * 0.28) {                            // laughter, each at its own rate
    const r = 8 + i * 1.3, k = Math.abs(Math.sin(tc * r + i)); P.sq *= 1 + 0.045 * k; P.mouth = 'open'; P.eyes = k > 0.7 ? 'shut' : 'open'; P.tip = (i % 2 ? -0.05 : 0.04) * k + idleSway(tc, sd, 0.02, 2);
    if (i === 0) P.handRW = hh; if (i === 1) { P.handL = PERSON_HANDS.mouthCover.L; P.handR = PERSON_HANDS.mouthCover.R; } if (i === 2) { P.handL = [-24, -108]; P.handR = [26, -104]; P.tip = 0.08 * k; }
    if (i === 3) { P.handR = [50, -70 + 30 * k]; } tg = i % 2 ? [g.x - g.dir * 140, head[1]] : hh; }
  if (i === 4 && t >= 20.5 && t < 21.4) { P.handRW = [hh[0] + 10 + 18 * Math.sin(tc * 20), hh[1] + 10]; P.mouth = 'smile'; tg = hh; }
  if (i === 4 && t >= 21.0 && t < 21.6) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.handRW = null; tg = [1100, head[1]]; }
  if (i === 2 && t >= 23.2 && t < 23.9) { P.handR = PERSON_HANDS.mouthCover.R; P.sq *= 1 - 0.03 * Math.abs(Math.sin(tc * 20)); P.mouth = 'closed'; }
  if (t >= 22.6 + i * 0.28 && t < 27.9) tg = invH;
  if (t >= 27.9 + st && t < 29.6) { tg = [1300, -300]; P.tip = -0.06; }
  if (t >= 29.72 + st * 0.7 && t < 34.38 + st) tg = king;
  if (t >= 34.38 + st && t < 40.76) tg = t < 37 ? invH : h1Pt(H, EH_EBG.knob);
  if (t >= 40.02 + st && t < 40.9 + st) P.tip = -0.08 * Math.sin(Math.PI * ehE(tc, 40.02 + st, 0.9)) - 0.03;
  if (t >= 40.76 && t < 47.0) { tg = h1Pt(H, [0, -180]); if (t >= 41.98 + st) { P.mouth = 'o'; P.eyes = 'wide'; } P.tip += -0.04; }
  if (i === 0 && t >= 45.6 && t < 47) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; }   // clutches his turban in the wake
  if (t >= 47.0 && t < 49.3 + st) { const k = Math.abs(Math.sin(tc * (9 + i * 1.7) + i)); P.handL = [-6 - 22 * k, -138]; P.handR = [8 + 22 * k, -140]; P.mouth = 'smile'; P.sq *= 1 + 0.02 * k; tg = invH;
    if (i === 0) { P.handL = [-10, -170]; P.handR = [12, -172]; P.mouth = 'o'; } }
  if (t >= 49.32 && t < 50.6 && (i === 3 || i === 4)) { P.eyes = 'wide'; tg = [g.x - g.dir * 140, head[1]]; if (i === 4) { const u = ehE(tc, 49.4, 0.9); P.handR = [K.lerp(40, 110, u), -190 + 40 * Math.sin(u * Math.PI)]; } }
  if (t >= 50.1) tg = fzH;
  if (t >= 58.94 && t < 71.65) tg = (i % 2 ? invH : fzH);
  if (t >= 70.04 + st) P.x += (g.x < H1_CX ? -1 : 1) * 30 * ehE(tc, 70.04 + st, 0.4);
  if (t >= 71.65) { tg = h1Pt(H, [0, -180]); P.tip = -0.1 * ehE(tc, 72.68 + st, 0.4); P.mouth = 'o'; P.eyes = 'wide'; P.x += (g.x < H1_CX ? -1 : 1) * 30; }
  // the fan servant on the dais and the tray servant
  if (i === 5) { const stop = t >= 33.02 && t < 34.5, ang = stop ? -0.7 : Math.sin(tc * 5) * 0.5 - 0.2; P.fan = ang; P.handR = [60 + 30 * Math.cos(ang + 1.2), -170 + 40 * Math.sin(ang)]; if (stop) P.lid = Math.max(P.lid, 0.4);
    if (t >= 64.44 && t < 66) P.tip = -0.12; }
  if (i === 6) { P.handL = [-50, -150]; P.handR = [-20, -152]; P.tray = !(t >= H1_HAT[0]); }
  P.gaze = lookAt(head, tg);
  return P;
}
const H1_CHILD_X = H1_F([[11.8, 1190], [12.5, 930], [13.0, 960], [13.6, 990], [14.2, 1000], [19.6, 1000], [20.4, 880], [23.5, 880], [24.2, 940], [39.9, 940], [40.3, 868], [46.5, 868], [47.0, 960]]);
function h1Child(t) {
  const tc = EH_T2(t), sd = 61, D = EH_CHILD, H = h1Horse(t);
  const P = { x: H1_CHILD_X(tc), y: 942, dir: 1, s: 1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.02), tip: idleSway(tc, sd, 0.03, 2.1), mouth: 'smile' };
  Object.assign(P, walk(H1_CHILD_X, tc, { stride: 16 })); const head = ehHeadOf(P); P.gaze = lookAt(head, h1Pt(H, [0, -180]));
  if (t >= 12.64 && t < 13.6) { const flank = h1Pt(H, [40, -170]); P.handRW = [flank[0] + 6 * Math.sin(tc * 36), flank[1]]; P.dir = 1; }
  if (t >= 13.6 && t < 14.4) { P.handR = [40 + 10 * Math.sin(tc * 30), -120]; P.gaze = [1, -0.5]; P.mouth = 'open'; }
  if (t >= 18.2 && t < 20.4) { P.mouth = 'open'; P.sq *= 1 + 0.05 * Math.abs(Math.sin(tc * 11)); }
  if (t >= 20.96 && t < 21.4) { const tail = h1Pt(H, [-175, -150]); P.handLW = tail; P.handRW = [tail[0] + 6, tail[1] + 4]; P.tip = -0.18; P.dir = -1; P.gaze = lookAt(head, tail); }
  if (t >= 21.4 && t < 23.4) { P.sit = flow(tc, [[21.4, 0], [21.55, 1], [23.0, 1], [23.4, 0]]); P.seat = 'floor'; P.sq = landSquash(tc, 21.55, 0.14); P.mouth = 'o'; P.gaze = [0.2, -1]; }
  if (t >= 40.3 && t < 47) { P.handL = [-40, -100]; P.handR = [40, -110]; P.y = 864; P.gaze = lookAt(head, h1Pt(H, [0, -180])); P.mouth = 'o'; }
  if (t >= 47.0 && t < 49.4) { const [, l] = hop(tc, 47.1 + Math.floor((tc - 47.1) / 0.55) * 0.55, 0.45, 0, 0, 30); P.lift = l; P.y -= l; P.handL = [-50, -210]; P.handR = [50, -210]; P.mouth = 'open'; }
  if (t >= 71.65) { P.mouth = 'o'; P.gaze = [0.2, -1]; }
  return P;
}

// ---------- props, doves ----------
function h1Fan(ctx, P) { const s = P.s, [hx, hy] = [P.x + (P.dir > 0 ? 1 : -1) * s * (P.handR[0]), P.y + s * P.handR[1]]; ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.fan - 0.6);
  seg(ctx, 0, 0, 0, -90 * s, 5, '#8a5a32', 1); ctx.translate(0, -90 * s); for (let k = -3; k <= 3; k++) { ctx.save(); ctx.rotate(k * 0.2); celShade(ctx, [[0, 0], [-10 * s, -50 * s], [0, -90 * s], [10 * s, -50 * s]], k % 2 ? '#2fb8b0' : '#fff6ea', '#8ac8c8', { off: 4, lw: 2 }); ctx.restore(); } ctx.restore(); }
function h1Tray(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, ell(0, 0, 50 * s, 10 * s, 20), '#e0b038', { lw: 2.5, line: '#6a4a10' });
  for (const [cx, col] of [[-20, '#e8364f'], [0, '#ffd36a'], [20, '#7ac85a']]) ehBlob(ctx, cx * s, -10 * s, 10 * s, 9 * s, col, ehDark(col, 0.3), { lw: 2 }); ctx.restore(); }
function h1Doves(ctx, t) {
  const tc = EH_T2(t), dove = (x, y, s, dir, fly, ph, o = {}) => bird(ctx, { kind: 'dove', pal: 0, x, y, s, dir, fly, flap: fly ? Math.sin(tc * 26 + ph) : 0, ...o });
  if (t > 0.8 && t < 4.2) for (let i = 0; i < 6; i++) { const R = K.rng(80 + i), x = 520 + (t - 0.8) * 520 - i * 70 + R() * 40, y = 160 + i * 22 + Math.sin(tc * 2 + i) * 10; dove(x, y, 0.42 + R() * 0.1, 1, true, i * 1.7); }
  // the fountain pair: perched, take off at 11.8
  for (const [k, x0] of [[0, 452], [1, 590]]) { const a = 11.8 + k * 0.12; if (t < a) dove(x0, 848, 0.36, k ? -1 : 1, false, 0, { headRot: Math.sin(tc * 2 + k) * 0.2, lid: ehLid(t, 90 + k) }); else if (t < a + 2.5) { const u = t - a; dove(x0 - 120 * u * (k ? -0.6 : 1), 848 - 260 * u, 0.36 + 0.05 * u, k ? 1 : -1, true, k * 2); } }
  // the dove that perches on the horse's head (21.6 - 27.9), then leaves along the arc of the inventor's sweep
  if (t > 20.9 && t < 29.4) { const H = h1Horse(t), top = h1Pt(H, [150, -340]);
    if (t < 21.9) { const u = ehE(t, 20.9, 1.0, 'out'); dove(K.lerp(1420, top[0], u), K.lerp(260, top[1], u), 0.36, -1, true, 0); }
    else if (t < 27.9) dove(top[0], top[1] + 2 * (1 - landSquash(tc, 21.9, 1)), 0.36, -1, false, 0, { headRot: Math.round(Math.sin(tc * 1.3) * 2) * 0.25, sq: landSquash(tc, 21.9, 0.14) });
    else { const u = t - 27.9; dove(top[0] + 220 * u, top[1] - 380 * u + 60 * u * u, 0.36, 1, true, 1); } }
  // the gate doves scatter in the demo flight; the dome doves burst at the launch
  if (t > 44.6 && t < 47.5) for (let i = 0; i < 4; i++) { const u = t - 44.6 - i * 0.05; if (u > 0) dove(180 + i * 40 - 120 * u, 630 - 300 * u + i * 10, 0.38, -1, true, i); }
  if (t > 73.5 && t < 76) for (let i = 0; i < 5; i++) { const a = -2.6 + i * 0.5, u = t - 73.5; dove(1350 + Math.cos(a) * 340 * u, 60 + Math.sin(a) * 240 * u, 0.4, Math.cos(a) > 0 ? 1 : -1, true, i); }
}

// ---------- the world ----------
function h1Shadow(ctx, x, y, w, lift = 0) { groundShadow(ctx, x, y, w, lift, { flat: true, color: '#2b1a3a', alpha: 0.22, fall: 260 }); }
function h1Person(ctx, D, P, o = {}) { if (!P) return; h1Shadow(ctx, P.x, P.y + (P.lift || 0), 90 * (P.s || 1), P.lift || 0); if (o.cape) ehCapeStand(ctx, P, EH_T2(o.t), { vx: o.vx || 0, swing: o.swing || 0 }); if (o.tail) h1InvTail(ctx, P, o.t, o.tail); person(ctx, ehDressP(D, P)); }
function h1InvTail(ctx, P, t, k = 1) { const [hx, hy] = ehHeadOf(P), d = Math.sign(P.dir || 1), s = P.s || 1, w = t > 29.12 && t < 29.9 ? pulse(t, 29.12, 0.8) : 0, sw = swing(t, 9.4, 0.4) + swing(t, 67.4, 0.5);
  ehRibbon(ctx, hx - d * 30 * s, hy - 40 * s, Math.PI / 2 + d * (0.35 + sw) - w * 1.2 * d, 110 * s * k, 16 * s, EH_T2(t), EH_SAFFRON, { wave: 5 + 8 * w + (k > 1 ? 14 : 0), hz: 1.2 + 2 * w + (k > 1 ? 2 : 0), tip: 0.6, shade: '#c07a10' }); }
function h1World(ctx, t, cam) {
  const tc = EH_T2(t), H = h1Horse(t), wind = t > 29.12 && t < 29.9 ? pulse(t, 29.12, 0.8) : 0, wake = t > 44.36 && t < 45.4 ? pulse(t, 44.5, 0.8) : 0;
  ehGarden(ctx, t, cam, { wind: wind + (t > 71.65 && t < 74 ? 0.8 : 0), wake, gadget: 1 });
  h1Doves(ctx, t);
  // the king and the fan servant on the dais
  const fanP = h1Guest(5, t); h1Person(ctx, EH_GUESTS[5], fanP); h1Fan(ctx, fanP);
  h1Person(ctx, EH_KING, h1King(t));
  // the back row (left group, the tray servant)
  const G = [0, 1, 2, 3, 4, 6].map((i) => [i, h1Guest(i, t)]);
  const child = h1Child(t), back = (y) => y < 895;
  for (const [i, P] of G) if (back(P.y)) { h1Person(ctx, EH_GUESTS[i], P); if (i === 6 && P.tray) h1Tray(ctx, P.x - 30 * P.s, P.y - 156 * P.s, P.s); }
  if (child.y < 895) h1Person(ctx, EH_CHILD, child);
  // the cart, the horse (and a rider), with the contact shadow; the demo shadow shrinks on the court as it rises
  if (t >= 4.4) {
    if (H.air) { const gx = h1Pt(H, [0, 0])[0]; h1Shadow(ctx, gx, gx < 800 ? 905 : 912, 300 * H1_HS, H.lift || 0); }
    h1Shadow(ctx, H.cartX, EH_GR + 4, 330, 0);
    const wheel = H1_XH(Math.min(t, 14.3)) / 24, cartRock = t > 71.65 ? 4 * Math.sin((t - 71.65) * 16) * Math.exp(-(t - 71.65) * 2) : 0;
    ctx.save(); if (cartRock) { ctx.translate(H.cartX, EH_GR); ctx.rotate(cartRock * 0.006); ctx.translate(-H.cartX, -EH_GR); }
    platformCart(ctx, H.cartX, EH_GR, { dir: 1, wheel, sag: H.air ? -8 * Math.exp(-Math.max(0, (t > 71.65 ? t - 71.65 : t - 40.76)) * 3) * Math.cos((t - 40.76) * 14) : H.sag || 0 }); ctx.restore();
    if (H.air) ehWindRibbons(ctx, H, tc, { ang: t > 71.65 ? Math.PI / 2 : (H.dir > 0 ? Math.PI : 0), len: t > 71.65 ? 320 : 200 });
    if (h1InvMounted(t)) ehRide(ctx, H, 'inventor', h1InvRider(t), t, { tc, stream: H.air ? 0.8 : 0 });
    else if (t >= 67.38) ehRide(ctx, H, 'firuz', h1FiruzRider(t), t, { tc, stream: t > 71.65 ? 1 : 0, ang: t > 71.65 ? Math.PI * 0.62 : undefined });
    else ebonyHorse(ctx, H);
    if (t > 40.76 && t < 41.6) dustBurst(ctx, H.cartX, EH_GR - 50, t - 40.76, 10, 8, 18, 120, 0.8, 7);
    if (t > 46.9 && t < 47.8) dustBurst(ctx, H.cartX, EH_GR - 50, t - 46.9, 10, 8, 18, 110, 0.8, 9);
    if (t > 70.04 && t < 71.65) dustBurst(ctx, H.cartX, EH_GR - 40, ((t - 70.04) % 0.8), 8, 8, 16, 100, 0.8, 11);
    h1HorseLight(ctx, t, H);
  }
  // the front row
  const inv = h1InvGround(t), fz = t < 66.66 ? h1FiruzGround(t) : t < 67.38 ? h1FiruzVault(t) : null;
  const rows = [];
  for (const [i, P] of G) if (!back(P.y)) rows.push([P.y, () => h1Person(ctx, EH_GUESTS[i], P)]);
  if (child.y >= 895) rows.push([child.y, () => h1Person(ctx, EH_CHILD, child)]);
  if (inv) rows.push([inv.y + (inv.lift || 0), () => h1Person(ctx, EH_INVENTOR, inv, { tail: t > 72.68 ? 1.8 : 1, t })]);
  if (fz) rows.push([fz.y + (fz.lift || 0), () => { const vx = t >= 50.1 && t < 52.4 ? -180 : t > 65.2 && t < 66.6 ? -300 : 0; h1Person(ctx, EH_FIRUZ, fz, { cape: true, t, vx, swing: swing(tc, 52.4, 0.3) + swing(tc, 66.5, 0.3) }); }]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  if (t >= H1_HAT[0] && t < H1_HAT[1]) { const u = t - H1_HAT[0]; h1Tray(ctx, 1440 - 60 * u, 760 - 420 * u + 140 * u * u, 0.9, u * 7); }
  ehGardenFront(ctx, t);
}
// glints walking up the brass (14.5 - 16.1), the star on the chest plate (16.14), the light band over the held cel
function h1HorseLight(ctx, t, H) {
  const tc = EH_T2(t), G = EH_EBG;
  if (t >= 14.5 && t < 16.2) { const pts = [[-110, -6], [-86, -6], [68, -6], [90, -6], [-98, -146], [80, -146], [-76, -84], [90, -84], [G.chest[0], G.chest[1]], [176, -286], [192, -266], G.eye];
    pts.forEach((p, i) => { const a = 14.5 + i * 0.13, u = (tc - a) / 0.25; if (u > 0 && u < 1) { const [x, y] = h1Pt(H, p); ehGlint(ctx, x, y, 22, u); } });
    const [x0, y0] = h1Pt(H, [-200, -380]); ehBand(ctx, [x0, y0, 440, 400], (t - 14.6) / 1.5, { clip: (c) => h1HorseClip(c, H), w: 70, alpha: 0.55 }); }
  if (t >= 16.14 && t < 17.0) { const [x, y] = h1Pt(H, G.chest); ehGlint(ctx, x, y, 70, (t - 16.14) / 0.86); ehGlow(ctx, x, y, 140, pulse(t, 16.14, 0.86) * 0.7); }
  if (t >= 54.3 && t < 55.0) { const [x, y] = h1Pt(H, G.knob); ehGlint(ctx, x, y, 34, (t - 54.3) / 0.7); }
}
function h1HorseClip(ctx, H) {
  const m = ctx.getTransform(); ctx.translate(H.x, H.y); if (H.rot) ctx.rotate(H.rot); ctx.scale((H.dir ?? 1) * H.s, H.s); ctx.beginPath();
  for (const poly of [EH_EBG.body, EH_EBG.neck, EH_EBG.head]) poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  for (const [hx, fx] of EH_EBG.legs) { ctx.moveTo(hx - 13, -152); ctx.lineTo(hx + 13, -152); ctx.lineTo(fx + 16, 0); ctx.lineTo(fx - 16, 0); }
  ctx.setTransform(m); ctx.clip('nonzero');
}

// ---------- camera ----------
const H1_CAM_X2 = H1_F([[5.3, 500], [7.4, 505], [11.0, 770], [14.3, 1040], [18.12, 1040]]);
const H1_CAM = [
  [0, { x: 1000, y: 238, zoom: 0.62 }], [0.6, { x: 1000, y: 238, zoom: 0.62 }], [2.2, { x: 1150, y: 420, zoom: 0.8 }], [4.4, { x: 1380, y: 615, zoom: 1.0 }], [4.8, { x: 1380, y: 615, zoom: 1.0 }],
];
const H1_CAM3 = [
  [18.12, { x: 1040, y: 610, zoom: 1.0 }], [21.0, { x: 1180, y: 610, zoom: 1.05 }], [23.5, { x: 1080, y: 610, zoom: 1.1 }], [27.5, { x: 1080, y: 600, zoom: 1.1 }], [28.2, { x: 1080, y: 540, zoom: 1.08 }], [29.2, { x: 1080, y: 590, zoom: 1.05 }],
  [29.72, { x: 1080, y: 612, zoom: 1.0 }], [30.8, { x: 1560, y: 615, zoom: 1.0 }], [33.8, { x: 1560, y: 615, zoom: 1.0 }], [35.0, { x: 1100, y: 615, zoom: 1.0 }], [36.2, { x: 1090, y: 615, zoom: 1.0 }],
  [37.64, { x: 1080, y: 612, zoom: 1.0 }], [39.5, { x: 1080, y: 600, zoom: 1.0 }], [41.0, { x: 1060, y: 560, zoom: 0.95 }], [43.3, { x: 900, y: 238, zoom: 0.62 }], [46.0, { x: 900, y: 238, zoom: 0.62 }], [46.95, { x: 1050, y: 560, zoom: 0.85 }],
  [46.99, { x: 1050, y: 560, zoom: 0.85 }], [47.0, { x: 1180, y: 605, zoom: 1.0 }], [50.1, { x: 1180, y: 605, zoom: 1.0 }], [52.4, { x: 1090, y: 600, zoom: 1.15 }], [55.7, { x: 1090, y: 600, zoom: 1.15 }],
  [55.81, { x: 1100, y: 600, zoom: 1.2 }], [69.08, { x: 1130, y: 600, zoom: 1.2 }], [70.0, { x: 1060, y: 590, zoom: 1.0 }], [71.65, { x: 1040, y: 575, zoom: 0.92 }],
  [72.4, { x: 1030, y: 300, zoom: 0.75 }], [74.2, { x: 1020, y: 120, zoom: 0.7 }], [74.45, { x: 1020, y: 160, zoom: 0.7 }], [75.12, { x: 1150, y: 352, zoom: 0.7 }],
];
function h1CamClamp(c) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, EH_GARDEN.w - 500 / z), y: K.clamp(c.y, EH_GARDEN.top + 615 / z, 1230 - 615 / z), zoom: z }; }
function h1Cam(t) { const c = h1CamRaw(t); return h1CamClamp({ ...c, y: c.y - 45 * K.clamp((c.zoom - 0.85) / 0.15) }); }
function h1CamRaw(t) {
  if (t < 4.8) return h1CamClamp(K.camAt(H1_CAM, t));
  if (t < 18.12) { const x = t < 5.3 ? K.lerp(1380, 500, ehE(t, 4.8, 0.5, 'out')) : H1_CAM_X2(t); return h1CamClamp({ x, y: 615, zoom: 1.0 }); }
  return h1CamClamp(K.camAt(H1_CAM3, t));
}
const h1P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- lettering over the garden (panel units) ----------
// a speech balloon just above the speaker's head (short tail), kept inside the panel
function h1SayAt(ctx, S, steps, t, head, o = {}) { const [hx, hy] = head, w = o.half || 230; ehSay(ctx, S, steps, t, K.clamp(hx + (o.dx || 0), 40 + w, 960 - w), Math.max(110, hy - (o.up || 150)), [hx, hy - 30], o); }
function h1Over(ctx, t, cam, S) {
  const H = h1Horse(t), P = (x, y) => h1P(x, y, cam);
  if (t < 3.6) { const a = 1 - K.clamp((t - 3.2) / 0.4); ctx.save(); ctx.globalAlpha *= a; S.title(ctx, 'THE FLYING', 500, 200, K.clamp((t - 0.3) / 1.0), { size: 80, align: 'center' }); S.title(ctx, 'WOODEN HORSE', 500, 296, K.clamp((t - 0.45) / 1.0), { size: 80, align: 'center' });
    if (t > 0.9) S.title(ctx, 'الحصان الخشبي الطائر', 500, 410, K.clamp((t - 0.9) / 1.0), { size: 74, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); ctx.restore(); }
  if (t >= 4.8 && t < 5.4) ehSpeed(ctx, [0, 0, 1000, 1230], t, { n: 30, speed: 5000, dir: 1, alpha: 0.55 * (1 - (t - 4.8) / 0.6) });
  if (t >= 12.9 && t < 13.8) { const [x, y] = P(h1Pt(H, [40, -170])[0], 600); ctx.save(); ctx.globalAlpha *= K.clamp((13.8 - t) / 0.2); S.title(ctx, 'TOK TOK', x - 40, y - 60 + 6 * Math.sin(EH_T3(t) * 20), K.clamp((t - 12.9) / 0.3), { size: 46, align: 'center' }); ctx.restore(); }
  if (t >= 18.4 && t < 21.6) { for (const [k, gx] of [[0, 760], [1, 1300]]) { const [x, y] = P(gx, 560); ctx.save(); ctx.globalAlpha *= K.clamp((21.6 - t) / 0.3); S.title(ctx, 'HA HA!', K.clamp(x, 150, 850) + 10 * Math.sin(EH_T3(t) * 15 + k * 2), y - k * 30, K.clamp((t - 18.4 - k * 0.3) / 0.3), { size: 52, align: 'center' }); ctx.restore(); } }
  const inv = h1InvGround(t);
  if (inv && t >= 24.2 && t < 29.7) { const [mx, my] = P(...ehHeadOf(inv)); h1SayAt(ctx, S, [[24.3, 'THIS IS NO ORNAMENT!']], t, [mx, my], { gone: 26.1, size: 46, half: 380 }); h1SayAt(ctx, S, [[26.4, 'IT FLIES FASTER...'], [27.7, 'IT FLIES FASTER THAN THE WIND!']], t, [mx, my], { gone: 29.5, size: 40, half: 470, up: 190 }); }
  if (t >= 29.12 && t < 29.8) { ctx.save(); ctx.globalAlpha *= pulse(t, 29.12, 0.7); for (const yy of [160, 230]) { ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const x0 = -200 + (t - 29.12) * 2200; for (let x = 0; x < 600; x += 20) ctx.lineTo(x0 + x, yy + Math.sin((x0 + x) * 0.01) * 20); ctx.stroke(); } ctx.restore(); }
  if (t >= 32.44 && t < 34.3) { const [mx, my] = P(1735, 620); h1SayAt(ctx, S, [[32.5, 'PROVE IT!']], t, [mx, my], { gone: 34.0, size: 60, half: 150, dx: -120 }); }
  if (t >= 47.5 && t < 49.2) { const [x, y] = P(780, 600); S.title(ctx, 'BRAVO!', K.clamp(x, 160, 840), y + 4 * Math.sin(EH_T3(t) * 17), K.clamp((t - 47.5) / 0.3), { size: 58, align: 'center' }); }
  if (t >= 51.2 && t < 53.6) { const fz = h1FiruzGround(t); if (fz) { const hd = ehHeadOf(fz), [hx, hy] = P(hd[0], hd[1] - 60); ctx.save(); ctx.globalAlpha *= K.clamp((53.6 - t) / 0.3);
    S.label(ctx, 'PRINCE FIRUZ', hx + 130, 140, K.clamp((t - 51.2) / 0.4), { size: 44 }); S.arrow(ctx, [hx + 80, 190], [hx + 10, hy - 10], K.clamp((t - 51.4) / 0.4), { width: 10 }); ctx.restore(); } }
  const fz = h1FiruzGround(t);
  if (fz && t >= 57.16 && t < 59.2) { const [mx, my] = P(...ehHeadOf(fz)); h1SayAt(ctx, S, [[57.2, 'LET ME TRY IT!']], t, [mx, my], { gone: 58.95, size: 52, half: 200, dx: 60 }); }
  if (inv && t >= 62.36 && t < 64.9) { const [mx, my] = P(...ehHeadOf(inv)); h1SayAt(ctx, S, [[62.4, 'LEARN UP AND DOWN FIRST!']], t, [mx, my], { gone: 64.6, size: 42, half: 440, dx: -60, up: 330 }); }
  if (t >= 63.1 && t < 64.6) { const k = h1Pt(H, EH_EBG.knob), [x, y] = P(k[0], k[1]); S.arrow(ctx, [x + 100, y + 70], [x + 12, y + 8], K.clamp((t - 63.1) / 0.3), { width: 8 }); S.label(ctx, 'UP', x + 130, y + 96, K.clamp((t - 63.2) / 0.3), { size: 34 }); }
  if (t >= 63.68 && t < 64.6) { const e = h1Pt(H, EH_EBG.lever), [x, y] = P(e[0], e[1]); S.arrow(ctx, [x + 120, y - 20], [x + 10, y - 8], K.clamp((t - 63.68) / 0.3), { width: 8, color: '#ff7ad9' }); S.label(ctx, 'DOWN', x + 170, y - 20, K.clamp((t - 63.78) / 0.3), { size: 34 }); }
  if (t >= 71.65 && t < 72.5) { const [x, y] = P(...h1Pt(H, [0, -200])); S.emphasis(ctx, x, y, 220, K.clamp((t - 71.65) / 0.85), { rect: [0, 0, 1000, 1230], word: 'WHOOSH!', wx: 0, wy: 1.2, seed: 7 }); }
  if (t >= 74.36 && t < 75.12) { ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 74.5) / 0.6); const [x0, y0] = P(H1_CX, 600), [x1] = P(H1_CX + 80, 0); S.arrow(ctx, [x0, Math.min(1100, y0)], [x1, -40], 1, { width: 14, color: '#7fe3ff', bend: 0.02 }); ctx.restore(); }
}
