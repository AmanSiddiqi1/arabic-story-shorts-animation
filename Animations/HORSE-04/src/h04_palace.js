// ===== HORSE-04: the far palace in golden light. S2 the landing and the lie (7.96 - 20.33), S3 the truth (20.33 - 28.56),
// S4 the king and the horse (28.56 - 39.07), S5 the closed court (39.07 - 46.6). World units on farPalace (ground y 900).
const H4_GCAM = [[7.96, { x: 1500, y: 420, zoom: 0.62 }], [8.9, { x: 1460, y: 440, zoom: 0.66 }], [10.5, { x: 1260, y: h4GY(0.8), zoom: 0.8 }], [11.3, { x: 1380, y: h4GY(0.95), zoom: 0.95 }],
  [12.6, { x: 1420, y: h4GY(1.2), zoom: 1.2 }], [20.1, { x: 1420, y: h4GY(1.22), zoom: 1.22 }], [21.0, { x: 1480, y: h4GY(1.45), zoom: 1.45 }], [28.4, { x: 1480, y: h4GY(1.45), zoom: 1.45 }],
  [30.8, { x: 1410, y: h4GY(1.32), zoom: 1.32 }], [32.2, { x: 1440, y: h4GY(1.25), zoom: 1.25 }], [39.0, { x: 1430, y: h4GY(1.25), zoom: 1.25 }], [45.3, { x: 1400, y: h4GY(1.2), zoom: 1.2 }], [46.6, { x: 1700, y: h4GY(1.05), zoom: 1.05 }]];
function h4GCam(t) { return h4Cam(H4_GCAM, t, EH_FP.w, -700, 1430); }
// ---------- the horse and the cart ----------
const H4_LAND = [[7.96, 640], [8.22, 430], [8.34, 410], [8.58, 160], [8.68, 140], [8.9, 0]];
const H4_CARTX = H4_F([[44.9, 1150], [45.34, 1150], [45.62, 1320], [45.92, 1320], [46.6, 1720]]);
function h4GHorse(t) { const H = { x: 1320, y: 900, s: H4_HS, dir: 1, lift: 0 };
  if (t < 8.9) { H.lift = kfn(t, H4_LAND, 'lin'); H.x = 1320 - 0.12 * H.lift; }
  if (t >= 45.34) { H.y = 900 - 58 * ehE(EH_T2(t), 45.34, 0.24); H.x = t >= 45.92 ? H4_CARTX(t) : 1320; }
  return H; }
// ---------- the princess (front seat until 19.4, then on her feet) ----------
const H4_PRX = H4_F([[19.9, 1430], [20.33, 1430], [20.98, 1515], [42.4, 1515], [42.9, 1370], [45.9, 1370], [46.6, 1560]]);
function h4GPrincess(t, H) {
  const tc = EH_T2(t), sd = 11, P = { s: EH_PRINCESS.s, lid: ehLid(t, sd, [17.16, 28.56, 39.07]), mouth: 'closed', brow: -0.1, gaze: [1, 0.1], handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.1) };
  if (t < 19.4) { P.lurch = 0.02 + idleSway(tc, 31, 0.015, 2.4) + (t > 8.9 ? -0.06 * Math.exp(-(t - 8.9) * 8) : 0); P.bob = t > 8.9 && t < 9.2 ? 6 * Math.sin((t - 8.9) * 20) : 0; P.gaze = t < 15.8 ? [1, 0.3] : [1, 0];
    if (t >= 15.8) { P.lurch = -0.04; P.lid = Math.max(P.lid, 0.2); }
    if (t >= 17.16 && t < 17.7) { P.dir = osc(tc - 17.16, 0.28) > 0 ? 1 : 0.55; P.gaze = [osc(tc - 17.16, 0.28), 0]; }
    return { seat: true, P }; }
  P.x = H4_PRX(t); P.y = 912; Object.assign(P, walk(H4_PRX, tc, { stride: 22 })); P.dir = 1;
  if (t < 19.9) { const st = mountSeat('horse', ehSeatShift(H, EH_SEAT2.front, 0)), u = ehE(tc, 19.4, 0.5); P.x = K.lerp(st.x + 20, 1430, u); P.y = K.lerp(st.y + 70, 912, u) - 30 * Math.sin(Math.PI * u); P.amp = 0; P.handL = [-30, -150]; P.handR = [40, -150]; return { P }; }
  P.sq *= landSquash(tc, 19.9, 0.1); if (t < 20.33) { P.handL = [-16, -84 + 4 * Math.sin(tc * 20)]; P.handR = [20, -82 + 4 * Math.sin(tc * 20 + 1)]; P.gaze = [0.3, 0.9]; }
  const toK = [1640, 700], toI = [1220, 700], look = (w) => lookAt(ehHeadOf(P), w);
  if (t >= 20.33 && t < 39.07) P.gaze = look(toK);
  if (t >= 20.98 && t < 22.38) { P.handR = PERSON_HANDS.chest.R; P.tip = 0.07 * ehE(tc, 20.98, 0.3) + idleSway(tc, sd, 0.01, 3); P.drop = 4; }
  if (t >= 22.38 && t < 23.22) { P.handL = [12, -96]; P.handR = [30, -98]; P.sq *= 1 + 0.02 * pulse(tc, 22.5, 0.8); }
  if (t >= 23.22 && t < 25.58) { const u = ehE(tc, 23.22, 0.25); P.handL = [K.lerp(10, -112, u), K.lerp(-100, -152, u)]; P.handR = [30, -98]; }
  if (t >= 24.18 && t < 25.5) P.talk = ehTalk(t, 24.18, 25.5, 3, 0.8);
  if (t >= 25.58 && t < 28.56) { P.handR = PERSON_HANDS.chest.R; P.handL = [14, -96]; }
  if (t >= 26.5 && t < 27.95) P.talk = ehTalk(t, 26.5, 27.95, 5, 0.8);
  if (t >= 27.98 && t < 28.6) { P.wet = true; P.tip = -0.04; P.lid = Math.min(P.lid, 0.1); }
  if (t >= 28.56 && t < 39.07) { P.gaze = look([1500, 700]); P.handL = [12, -96]; P.handR = [30, -98]; }
  if (t >= 31.9 && t < 32.4) { P.handL = [-50, -210]; P.handR = [50, -214]; P.eyes = 'wide'; P.mouth = 'o'; }
  if (t >= 36.54 && t < 37.2) { P.tip = 0.06 * Math.sin(Math.PI * K.clamp((tc - 36.54) / 0.6)); P.gaze = look(toK); }
  if (t >= 39.07 && t < 42.4) { P.gaze = t < 39.5 ? look(toK) : look([h4GInvX(t), 700]); if (t >= 39.86) { P.eyes = t < 40.3 ? 'wide' : 'open'; P.lid = t < 40.3 ? 0 : 0.32; } }
  if (t >= 42.4 && t < 43.1) { P.dir = -1; P.gaze = look([1290, 700]); P.brow = 0.3; P.handL = [20, -110]; P.handR = [60, -140]; }
  if (t >= 43.1 && t < 45.9) { P.dir = 1; P.gaze = look([1640, 690]); const u = ehE(tc, 43.6, 0.3); P.handR = [K.lerp(60, 108, u), K.lerp(-140, -170, u)]; if (t < 43.6) P.handR = [-90, -150]; P.handL = [14, -96]; }
  if (t >= 44.6 && t < 45.9) P.talk = ehTalk(t, 44.6, 45.9, 9, 0.8);
  if (t >= 45.9) { P.dir = 1; P.gaze = [1, 0.2]; }
  return { P };
}
// ---------- the inventor ----------
const H4_INVX = H4_F([[11.67, 1160], [12.48, 1160], [12.8, 1230], [35.4, 1230], [35.7, 1200], [39.5, 1200], [42.4, 1300], [42.6, 1280], [46.2, 1280], [46.6, 1440]]);
const h4GInvX = (t) => H4_INVX(t);
const H4_BOW = [[11.67, 0], [11.9, 0.05], [12.15, 0.38], [12.4, 0.38], [12.7, 0.02]];
function h4GInventor(t, H) {
  const tc = EH_T2(t), sd = 7, P = { s: EH_INVENTOR.s, lid: Math.max(0.15, ehLid(t, sd, [18.18])), mouth: 'smile', brow: 0.3, gaze: [1, 0.1], handL: [-30, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.7) };
  if (t < 11.32) { P.handR = h4Loc(H, P.s, [EH_EBG.knob[0] - 4, EH_EBG.knob[1]], EH_SEAT2.rear, EH_SEAT2.rearDy); P.lurch = idleSway(tc, 37, 0.02, 2.3) + (t > 8.9 ? 0.08 * Math.exp(-(t - 8.9) * 7) : 0); P.gaze = [0.8, 0.5]; return { seat: true, P }; }
  Object.assign(P, walk(H4_INVX, tc, { stride: 24 })); P.y = 918; P.dir = 1;
  if (t < 11.67) { const st = mountSeat('horse', ehSeatShift(H, EH_SEAT2.rear, EH_SEAT2.rearDy)), u = ehE(tc, 11.32, 0.35, 'in'); P.x = K.lerp(st.x - 30, 1160, u); P.y = K.lerp(st.y + 70, 918, u); P.amp = 0; P.dir = -1; P.handL = [-40, -170]; P.mouth = 'o'; return { P }; }
  const look = (w) => lookAt(ehHeadOf(P), w), K_ = [1640, 690];
  P.sq *= landSquash(tc, 11.67, 0.14); P.x += t < 11.9 ? 8 * Math.sin((tc - 11.67) * 30) : 0;
  if (t < 12.48) { P.tip = flow(tc, H4_BOW) + lagged((u) => flow(u, H4_BOW), tc, 0.12, 0.3); P.handR = [70, -120]; P.handL = [-90, -150]; P.gaze = [1, 0.6]; return { P }; }
  P.gaze = look(K_);
  if (t >= 12.8 && t < 13.0) P.handRW = ehHorsePt(H, [60, -205]);
  if (t >= 13.0 && t < 15.1) { const u = ehE(tc, 13.0, 0.3); P.handL = [K.lerp(-30, -100, u), K.lerp(-100, -160, u)]; P.handR = [K.lerp(40, 100, u), K.lerp(-110, -168, u)]; P.tip = -0.03; }
  if (t >= 13.48 && t < 15.0) P.talk = ehTalk(t, 13.48, 15.0, 2, 0.9);
  if (t >= 15.1 && t < 18.6) { P.handR = [96, -176 - 6 * Math.sin(tc * 3)]; P.handL = [-24, -100]; P.gaze = gazePlan(tc, [[15.1, [1, -0.6]], [16.4, [1, -0.1]]]); }
  if (t >= 16.48 && t < 18.1) P.talk = ehTalk(t, 16.48, 18.1, 4, 0.9);
  if (t >= 18.18 && t < 18.36) { P.mouth = 'closed'; P.lid = 0.45; P.brow = -0.5; P.gaze = [1, -0.6]; P.talk = 0; }
  if (t >= 20.33 && t < 24.8) { P.handL = [-20, -96]; P.handR = [24, -98]; P.x += 6 * Math.sin(tc * 3.1); P.tip = 0.03 * Math.sin(tc * 3.1); P.lid = 0.2; }
  if (t >= 24.8 && t < 26.4) { const u = ehE(tc, 24.8, 0.15); P.x -= 14 * u; P.handL = [-70, -150]; P.handR = [70, -150]; P.brow = 0.9; P.eyes = 'wide'; P.mouth = 'o'; P.tip = -0.08 * u; }
  if (t >= 26.4 && t < 31.9) { P.handL = [-20, -96]; P.handR = [24, -98]; P.gaze = look(t < 28.56 ? [1515, 700] : [1560, 690]); P.lid = 0.35; P.brow = 0.4; P.mouth = 'smirk'; }
  if (t >= 31.9 && t < 32.5) { P.handL = [-50, -214]; P.handR = [56, -210]; P.eyes = 'wide'; P.mouth = 'o'; P.lid = 0; }
  if (t >= 32.5 && t < 35.84) { P.mouth = 'smile'; P.lid = 0.15; P.gaze = look(K_); }
  if (t >= 35.84 && t < 37.24) { P.mouth = 'smile'; P.handR = [10, -218]; P.handL = [-20, -100]; P.x += 3 * Math.sin(tc * 30); P.lid = 0.1; P.brow = 0.6; }
  if (t >= 36.9 && t < 37.24) { P.handR = [70, -130]; P.handRW = ehHorsePt(H, [-20, -180]); }
  if (t >= 37.24 && t < 39.5) { const u = ehE(tc, 37.24, 0.3); P.handR = [K.lerp(70, 20, u), K.lerp(-130, -118, u)]; P.eyes = 'wide'; P.lid = 0; P.tip = -0.05 * u; P.mouth = 'o'; }
  if (t >= 39.5 && t < 42.4) { P.handL = [-34, -86]; P.handR = [-22, -88]; P.mouth = 'o'; P.lid = 0.3; P.gaze = [1, -0.3]; P.ph = tc * 6; P.amp = 0.35; P.sq *= 1.03; }
  if (t >= 41.56 && t < 42.4) { P.handRW = [K.lerp(1330, ehHorsePt(H, EH_EBG.knob)[0] - 10, ehE(tc, 41.56, 0.8)), K.lerp(800, ehHorsePt(H, EH_EBG.knob)[1] + 10, ehE(tc, 41.56, 0.8))]; P.gaze = look(ehHorsePt(H, EH_EBG.knob)); P.mouth = 'smirk'; }
  if (t >= 42.4 && t < 44.9) { P.handR = [60 + 20 * Math.sin(tc * 16), -150]; P.gaze = look([1370, 690]); P.mouth = 'smile'; P.brow = 0.7; P.lid = 0.15; }
  if (t >= 44.9 && t < 46.2) { P.gaze = look([1600, 690]); P.mouth = 'o'; P.handL = [-30, -120]; P.handR = [40, -120]; }
  if (t >= 46.2) { P.handL = [70, -150]; P.handR = [90, -146]; P.mouth = 'o'; P.eyes = 'wide'; P.tip = 0.06; }
  return { P };
}
// ---------- the far king ----------
const H4_KX = H4_F([[10.9, 2190], [11.2, 2190], [13.4, 1660], [14.28, 1660], [14.6, 1625], [29.94, 1625], [30.78, 1585], [31.46, 1585], [31.62, 1625], [40, 1625]]);
function h4GKing(t) {
  const tc = EH_T2(t), sd = 13, P = { s: EH_FARKING.s, lid: ehLid(t, sd, [28.56, 30.78, 35.14]), mouth: 'smile', brow: 0.2, gaze: [-1, 0.1], handL: [-26, -96], handR: [26, -96], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.025, 3.3), dir: -1 };
  if (t < 10.9) { Object.assign(P, { x: 2190, y: 850, sit: 1, seat: 'bench', gaze: [-1, 0.2], handR: PERSON_HANDS.chin.R }); if (t > 8.9) { P.eyes = 'wide'; P.handR = [30, -150]; P.tip = 0.06; } return P; }
  Object.assign(P, walk(H4_KX, tc, { stride: 24 })); P.dir = -1; P.y = 905 - (P.x > 2060 ? 55 * K.clamp((P.x - 2060) / 60) : 0);
  if (t < 11.2) { const u = ehE(tc, 10.9, 0.3); P.sit = 1 - u; P.seat = 'bench'; P.x = 2190; P.y = 850; }
  const look = (w) => lookAt(ehHeadOf(P), w), H = h4GHorse(t);
  if (t >= 11.2 && t < 13.4) { P.tip = 0.08 + idleSway(tc, sd, 0.02, 1); P.handL = [-50, -110]; P.handR = [40, -112]; P.gaze = look([1320, 700]); }
  if (t >= 13.4) P.gaze = look([1230, 700]);
  if (t >= 14.28 && t < 18.6) { P.brow = 0.8; P.gaze = look(ehHorsePt(H, [60, -240])); P.eyes = 'wide'; P.mouth = 'o'; }
  if (t >= 16.48 && t < 18.6) { P.gaze = look([1380, 640]); P.eyes = 'open'; P.mouth = 'closed'; }
  if (t >= 18.6 && t < 20.33) { P.gaze = gazePlan(tc, [[18.6, [-1, 0.2]], [19.2, [-0.6, -0.4]], [19.8, [-1, 0.2]]], 0.12); P.handR = PERSON_HANDS.chin.R; P.handR = [P.handR[0], P.handR[1] + 8 * Math.sin(tc * 6)]; P.mouth = 'closed'; }
  if (t >= 20.33 && t < 28.56) { P.gaze = look([1515, 720]); P.mouth = 'closed'; P.handR = PERSON_HANDS.chin.R; }
  if (t >= 21.66 && t < 28.2) P.tip = 0.1 * ehE(tc, 21.66, 0.4) + idleSway(tc, sd, 0.01, 3);
  if (t >= 28.2 && t < 28.56) { P.tip = 0.1 * (1 - ehE(tc, 28.2, 0.36)); P.mouth = 'smile'; }
  // S4: eyes first, then the head; the walk; looks it over; the knuckle; the hop back; the finger; the palm
  if (t >= 28.56 && t < 31.46) { P.gaze = t < 28.9 ? [-1, 0.3] : look(ehHorsePt(H, [80, -200])); P.mouth = 'o'; P.handR = [30, -100]; P.tip = t < 28.9 ? 0 : 0.05; }
  if (t >= 29.94 && t < 30.78) { P.handL = [-40, -120]; P.handR = [40, -120]; P.tip = 0.08; }
  if (t >= 30.78 && t < 31.46) { P.gaze = look(ehHorsePt(H, [K.lerp(80, 130, ehE(tc, 30.78, 0.5)), K.lerp(-20, -300, ehE(tc, 30.78, 0.5))])); const rap = Math.abs(Math.sin((tc - 31.1) * Math.PI / 0.12)); if (t > 31.1) P.handRW = ehHorsePt(H, [118 + 6 * rap, -200]); }
  if (t >= 31.46 && t < 31.9) { P.lift = hop(tc, 31.46, 0.16, 0, 0, 26)[1]; P.eyes = 'wide'; P.brow = 1; P.mouth = 'o'; P.handL = [-50, -170]; P.handR = [50, -170]; P.sq = landSquash(tc, 31.62, 0.14); }
  if (t >= 31.9 && t < 32.22) { P.handRW = [K.lerp(1560, ehHorsePt(H, EH_EBG.knob)[0] + 20, ehE(tc, 31.9, 0.25)), ehHorsePt(H, EH_EBG.knob)[1] - 10]; P.gaze = look(ehHorsePt(H, EH_EBG.knob)); P.mouth = 'smile'; P.tip = 0.08; }
  if (t >= 32.22 && t < 35.14) { const u = ehE(tc, 32.22, 0.4); P.handR = [K.lerp(30, 44, u), K.lerp(-100, -214, u)]; P.tip = -0.03 * u; P.gaze = look([1230, 690]); P.mouth = 'closed'; P.brow = -0.2; P.sq *= 1 + 0.03 * u; }
  if (t >= 33.92 && t < 35.1) P.talk = ehTalk(t, 33.92, 35.1, 6, 0.8);
  if (t >= 35.14 && t < 36.54) { const w = Math.sin((tc - 35.14) * 5); P.handL = [-70, -140 + 22 * w]; P.handR = [70, -140 - 22 * w]; P.gaze = t < 35.84 ? look([1230, 690]) : look([1515, 700]); P.mouth = 'closed'; P.tip = 0.03 * w; }
  if (t >= 36.54 && t < 39.07) { P.gaze = look([1515, 700]); P.mouth = 'smile'; P.handR = PERSON_HANDS.chin.R; }
  if (t >= 39.07) { P.gaze = look([1440, 700]); P.handL = [-26, -96]; P.handR = [26, -96]; P.mouth = 'closed'; }
  if (t >= 44.9 && t < 45.5) { P.tip = 0.07 * Math.sin(Math.PI * K.clamp((tc - 44.9) / 0.5)); P.gaze = look([1560, 700]); }
  return P;
}
// ---------- the captain and the four guards ----------
const H4_CAPX = H4_F([[10.46, 2320], [11.6, 1880], [35.3, 1880], [36.9, 1290], [38.4, 1290], [39.6, 1580], [45.0, 1580], [45.4, 1520], [46.6, 1580]]);
function h4GCaptain(t) { const tc = EH_T2(t), sd = 17; if (t < 10.46) return null;
  const P = { ...walk(H4_CAPX, tc, { stride: 26 }), y: 896, s: EH_CAPTAIN.s, dir: -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.02, 3.4), mouth: 'closed', brow: 0.3, gaze: [-1, 0.1], handL: [-26, -100], handR: [40, -110] }, o = { helmet: {}, neck: true, spear: { lean: 0 } };
  if (t < 11.6) { P.handL = [10, -232]; o.helmet = { tilt: -0.3 + 0.2 * Math.sin(tc * 14) }; P.mouth = 'o'; P.tip = 0.1; }
  if (t >= 36.9 && t < 39.6) { o.spear = { lean: t < 37.24 ? 0 : -0.06 * (1 - ehE(tc, 37.24, 0.2)), hand: [40, -110] }; P.y = 912; P.gaze = [-1, 0.3]; P.brow = 0.6; P.sq *= 1 - 0.04 * pulse(tc, 37.24, 0.3); }
  if (t >= 39.6) { P.dir = -1; P.gaze = lookAt(ehHeadOf(P), [1440, 700]); }
  if (t >= 44.9 && t < 45.5) { P.dir = 1; P.handL = [-10, -200]; P.gaze = [1, 0]; }
  if (t >= 45.5 && t < 45.92) { P.handL = [-90, -150 + 20 * Math.sin(tc * 14)]; P.dir = -1; }
  if (t >= 45.92) { P.dir = -1; o.spear = { lean: -1.35, hand: [70, -120] }; P.gaze = [-1, 0.1]; }
  return [P, o]; }
const H4_GUARD_SPOT = [1720, 1780, 1840, 1900];
function h4GGuardX(i) { const s = H4_GUARD_SPOT[i], d = stagger(i, 0.12);
  return H4_F([[10.46 + d, 2250 + i * 70], [11.4 + d, s], [32.55 + d, s], [33.1, s - 36], [44.9 + d * 0.5, s - 36], [45.3, i < 2 ? (i ? 1430 : 1210) : s - 36], [45.92, i < 2 ? (i ? 1430 : 1210) : s - 36], [46.6, i < 2 ? (i ? 1830 : 1610) : s + 60]]); }
const H4_GX = [0, 1, 2, 3].map(h4GGuardX);
function h4GGuard(t, i) { const tc = EH_T2(t), sd = 21 + i * 4; if (t < 10.46 + stagger(i, 0.12)) return null; const D = EH_FARGUARDS[i];
  const P = { ...walk(H4_GX[i], tc, { stride: 24 }), y: 898 - i * 2, s: D.s, dir: -1, lid: ehLid(t, sd, [25.1 + stagger(i, 0.15)]), sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.022, 2.8 + i * 0.3), mouth: 'closed', gaze: [-1, 0.1], handL: [-26, -100], handR: [40, -110] }, o = { helmet: { tilt: 0 }, neck: true, spear: { lean: 0.05 * Math.sin(tc * 2 + i) } };
  if (P.amp > 0.3) { o.spear.lean = 0.1 * Math.sin(P.ph * 2); P.tip += 0.05; }
  const look = (w) => lookAt(ehHeadOf(P), w);
  if (t >= 20.33 && t < 25.1 + stagger(i, 0.15)) P.gaze = look([1515, 700]);
  if (t >= 25.1 + stagger(i, 0.15) && t < 33.1) P.gaze = look([1230, 700]);
  if (t >= 33.1 && t < 34.22 + stagger(i, 0.14)) { P.ph = Math.PI / 2 * (i % 2 ? 1 : -1); P.amp = 0.8; P.x += tremble(tc, 1.5, 3 + i); P.gaze = look([1625, 640]); P.eyes = 'wide'; }
  if (t >= 34.22 + stagger(i, 0.14) && t < 34.6 + stagger(i, 0.14)) P.sq *= landSquash(tc, 34.22 + stagger(i, 0.14), 0.08);
  if (t >= 34.22 && t < 44.9) P.gaze = look(t < 39 ? [1230, 700] : [1440, 700]);
  if (t >= 45.3 && t < 45.92 && i < 2) { P.dir = i ? -1 : 1; P.handL = [60, -120]; P.handR = [70, -150]; P.sq *= 1 - 0.1 * ehE(tc, 45.34, 0.2); o.spear = null; P.mouth = 'grit'; }
  if (t >= 45.92 && i < 2) { P.dir = 1; P.handL = [70, -140]; P.handR = [80, -150]; P.tip = 0.12; o.spear = null; }
  return [P, o, D]; }
// ---------- gardener, boy, peacocks ----------
function h4GGardeners(ctx, t) { const tc = EH_T2(t), up = t > 8.3;
  const G = { x: 900, y: 878, s: 0.95, dir: 1, lid: ehLid(t, 41), mouth: up ? 'o' : 'smile', eyes: up ? 'wide' : 'open', gaze: up ? [0.6, -0.8] : [0.6, 0.6], handL: [-20, -100], handR: [44, -100], sq: breathe(tc, 41, 0.014), tip: idleSway(tc, 41, 0.02, 3) - (up ? 0.06 : 0) };
  h4Fig(ctx, { costume: 'villager', s: 0.95, pal: { robe: '#3f9d4a', dot: '#2b7a38', hc: '#f2d860', hd: '#c8a830', band: '#f2d860' } }, G, t);
  const [hx, hy] = ehHandW(G, G.handR), tilt = up ? 0.9 : 0.3; ctx.save(); ctx.translate(hx, hy + 20); ctx.rotate(tilt); celShade(ctx, [[-20, -10], [20, -10], [16, 26], [-16, 26]], '#7ab0c8', '#4a80a0', { off: 6, lw: 2.5, line: '#1a3a5a' }); seg(ctx, 18, 0, 50, -14, 5, '#4a80a0', 1); ctx.restore();
  if (t > 8.3) for (let i = 0; i < 5; i++) { const u = ((tc * 3 + i / 5) % 1); ctx.fillStyle = '#8ad8f8'; ctx.beginPath(); ctx.arc(hx + 30 + 4 * i % 9, hy + 30 + u * (878 - hy - 40), 4, 0, 7); ctx.fill(); }
  const B = { x: 966, y: 882, s: 1, child: true, dir: 1, lid: ehLid(t, 43), mouth: up ? 'o' : 'smile', eyes: up ? 'wide' : 'open', gaze: up ? [0.5, -0.9] : [1, 0.3], handL: [-20, -100], handR: up ? [40, -180] : [40, -110], sq: breathe(tc, 43, 0.02), tip: idleSway(tc, 43, 0.03, 2.5) };
  h4Fig(ctx, { costume: 'servant', child: true, pal: { robe: '#5ab8f0', dot: '#3a8ac8', sleeve: '#8ad0ff', hc: '#fff6ea' } }, B, t);
  const rk = up ? ehE(tc, 8.4, 0.4, 'in') : 0, [rx, ry] = up ? [B.x + 40, 880] : ehHandW(B, B.handR); ctx.save(); ctx.translate(rx, ry); ctx.rotate(-0.2 - 1.3 * rk); seg(ctx, 0, 0, 0, -160, 5, '#a8703a', 1.5); seg(ctx, -22, -160, 22, -160, 5, '#5a5a6a', 1); ctx.restore(); }
function h4GPeacocks(ctx, t) { const tc = EH_T2(t);
  { const [x, l] = hop(tc, 9.3, 0.3, 760, 690, 40); h4Shadow(ctx, x, 950, 70, l); peacock(ctx, { x, y: 950 - l, s: 0.5, dir: t < 9.3 ? 1 : -1, fan: t < 9.3 ? 0 : ehE(tc, 9.45, 0.3) * (1 - ehE(tc, 13.5, 0.6)), tilt: idleSway(tc, 51, 0.2, 2), ph: tc * 5, amp: t < 9.3 ? 0.3 : 0 }); }
  { const xf = H4_F([[38.3, 1690], [42.5, 1060]]), x = xf(t), mv = t > 38.3 && t < 42.5; h4Shadow(ctx, x, 960, 70);
    peacock(ctx, { x, y: 960, s: 0.5, dir: t < 38.3 ? -1 : -1, fan: t < 38.3 ? 0.85 + 0.1 * Math.sin(tc * 2) : 1 - ehE(tc, 38.3, 0.4), tilt: t >= 31.46 && t < 33 ? 0.45 : idleSway(tc, 53, 0.2, 2.2), ph: tc * 7, amp: mv ? 0.6 : 0, peck: !mv && t > 43 ? Math.max(0, Math.sin(tc * 3)) : 0 }); } }
// ---------- the world ----------
function h4GoldenWorld(ctx, t, cam) {
  const tc = EH_T2(t), H = h4GHorse(t);
  farPalace(ctx, t, cam, { model: 'golden', sky: (c, dx, dy) => { ehGlow(c, 2500 + dx, 560 + dy, 420, 0.7, '#ffd890'); celShade(c, ell(2500 + dx, 560 + dy, 60, 60, 30), '#fff2c0', '#ffd890', { off: 8, lw: 0 }); } });
  h4Doves(ctx, t, [[8.6, 900, 300, 1, 160], [9.4, 1000, 220, 1, 190], [24, 1100, 330, -1, 120], [37, 1800, 300, -1, 140]]);
  if (t < 11) h4GGardeners(ctx, t);
  const items = [];
  // cart (parked, then under the horse, then pushed)
  items.push([899, () => { const x = t >= 44.9 ? H4_CARTX(t) : 1150; platformCart(ctx, x, 900, { dir: 1, wheel: (x - 1150) / 24, sag: t >= 45.4 ? 6 : 0 }); }]);
  items.push([900, () => { h4Shadow(ctx, H.x, 900, 260 * H.s, H.lift + (900 - H.y)); const HH = { ...H, y: H.y - H.lift };
    const pr = h4GPrincess(t, HH), iv = h4GInventor(t, HH);
    if (pr.seat || iv.seat) { const ld = t > 8.9 && t < 9.4 ? landSquash(tc, 8.9, 0.1) : 1; const F = pr.seat ? { who: 'princess', D: EH_PRINCESS, P: { ...pr.P, sq: (pr.P.sq || 1) * ld } } : null, R = iv.seat ? { who: 'inventor', D: EH_INVENTOR, P: { ...iv.P, sq: (iv.P.sq || 1) * ld } } : null;
      twoRiders(ctx, HH, F, R, t, { tc, tail: { stream: t < 8.9 ? 0.4 : 0, torn: true }, veil: { stream: 0 } }); } else ebonyHorse(ctx, HH);
    ehRosettes(ctx, HH, { missing: 3, t: tc });
    if (t >= 14.28 && t < 15.3) ehBand(ctx, [HH.x - 160, HH.y - 360, 420, 380], (t - 14.28) / 1.0, { w: 70, alpha: 0.6 });
    if (t >= 8.9 && t < 9.6) dustBurst(ctx, HH.x, 905, t - 8.9, 12, 8, 18, 160, 0.6, 3); }]);
  // people
  const king = h4GKing(t); items.push([king.y + 4, () => { if (king.lift) { const q = { ...king }; h4Fig(ctx, EH_FARKING, q, t); } else h4Fig(ctx, EH_FARKING, king, t); }]);
  const cap = h4GCaptain(t); if (cap) items.push([cap[0].y, () => h4Fig(ctx, EH_CAPTAIN, cap[0], t, cap[1])]);
  for (let i = 0; i < 4; i++) { const g = h4GGuard(t, i); if (g) items.push([g[0].y, () => h4Fig(ctx, g[2], g[0], t, g[1])]); }
  const HH = { ...H, y: H.y - H.lift }, pr = h4GPrincess(t, HH), iv = h4GInventor(t, HH);
  if (!pr.seat) items.push([pr.P.y, () => h4Fig(ctx, EH_PRINCESS, pr.P, t, { veil: true, swing: t >= 17.16 && t < 17.9 ? swing(tc, 17.3, 0.4, 2) : 0 })]);
  if (!iv.seat) items.push([iv.P.y, () => h4Fig(ctx, EH_INVENTOR, iv.P, t, { tail: true, vx: t > 39.5 && t < 42.4 ? 60 : 0 })]);
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  h4GPeacocks(ctx, t);
}
function h4GoldenOver(ctx, t, cam, S) {
  const H = h4GHorse(t), HH = { ...H, y: H.y - H.lift }, iv = h4GInventor(t, HH), pr = h4GPrincess(t, HH), king = h4GKing(t);
  const ih = iv.seat ? h4P(...ehRiderPt(ehRiderFrame(HH, EH_SEAT2.rear, EH_SEAT2.rearDy, 0, 0, iv.P.s), 0, -130), cam) : h4Head(iv.P, cam);
  const ph = pr.seat ? h4P(...ehRiderPt(ehRiderFrame(HH, EH_SEAT2.front, 0, 0, 0, pr.P.s), 0, -130), cam) : h4Head(pr.P, cam), kh = h4Head(king, cam);
  h4Say(ctx, S, [[13.48, 'A GIFT FOR YOU,\nGREAT KING!']], t, ih, { gone: 15.3, size: 44, up: 190, dx: 140 });
  h4Say(ctx, S, [[16.48, 'SHE CHOSE TO COME!']], t, ih, { gone: 18.3, size: 44, up: 170, dx: 120 });
  h4Say(ctx, S, [[24.18, 'THIS MAN DECEIVED ME.']], t, ph, { gone: 25.9, size: 42, up: 200, dx: -40 });
  h4Say(ctx, S, [[26.5, 'I WISH TO GO HOME.']], t, ph, { gone: 28.4, size: 42, up: 200, dx: -60 });
  if (t >= 26.5 && t < 28.6) { const p = K.clamp((t - 26.7) / 0.3) * K.clamp((28.6 - t) / 0.25); iconBalloon(ctx, 760, 260, 330, 230, p, [ph[0] + 60, ph[1] - 70], (c, w, h) => {
    ehGrad(c, 0, 0, w, h, [[0, '#4a62c8'], [1, '#ffb8a8']]); princessPalace(c, w / 2 + 40, h - 60, 0.36, { night: true, lit: 1 }); ehGrad(c, 0, h - 60, w, 60, [[0, '#3a6ac8'], [1, '#2e4aa8']]);
    moonPath(c, [[w * 0.2, h - 30], [w * 0.8, h - 30]], t, K.clamp((t - 27.02) / 0.8), { w: 2, w1: 6, scatter: 60 }); ehMoon(c, w - 50, 50, 22, t, 1); }); }
  h4Say(ctx, S, [[33.92, 'WAIT.'], [34.6, 'WAIT.\nFIRST THE TRUTH.']], t, kh, { gone: 36.0, size: 44, up: 180, dx: 60 });
  h4Say(ctx, S, [[44.6, 'LOCK IT IN\nA CLOSED COURT!']], t, ph, { gone: 46.3, size: 44, up: 190, dx: 60 });
  // the fear cloud over her: the inventor alone on the horse, flying off over the mountains
  if (t >= 41.02 && t < 42.55) { const p = K.clamp((t - 41.02) / 0.35) * (t > 42.4 ? 1 - (t - 42.4) / 0.15 : 1);
    thoughtCloud(ctx, 640, 250, 380, 270, t, { p, tail: [ph[0], ph[1] - 50], bg: '#cfe6ff', scale: 0.32, at: [500, 600], seed: 5, lw: 7, inside: (k) => { h4S1Range(k, 760, 1.2, -60, '#9aa8e0', '#7480c0', '#ffffff', 3);
      ehRide(k, ehRigP(500 + 300 * ((t - 41.02) / 1.5), 540 - 120 * ((t - 41.02) / 1.5), 0.9, 1, 0.2), 'inventor', { s: EH_INVENTOR.s, mouth: 'smile', handL: [60, -110], handR: [70, -110] }, t, { stream: 1 }); } }); }
}
