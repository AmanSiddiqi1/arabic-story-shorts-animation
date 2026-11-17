// ===== AN-140 Abdullah ibn Malik's room (merchant palaceHall, ochre): S3-S6 21.6-63.1, S10-S12 86.6-122.4 =====
// door 60..200 (leaf), window 510..610 (time of day), Said's stool at 428 (Said sits at x 450), Abdullah on a bench at 680 behind the desk 550..790.
const A140_RD = { stool: 428, sx: 450, ax: 680, desk: [550, 790, 800] };
const a140RoomU = (t) => t < 86.6 ? 0.25 : t < 94.72 ? 0.33 : kfn(t, [[94.72, 0.33], [97.0, 0.45], [122.4, 0.47]]);
const A140_BILLDESK = [566, 794];

// ---------- Said in the room ----------
function a140RoomSaid(t) {
  const P = a140Who(A140_SAID, { x: A140_RD.sx, y: 900, dir: 1, sit: 1, seat: 'bench', brow: -0.5, mouth: 'closed' });
  const A = [A140_RD.ax, 749], door = [130, 760]; let H; const look = (p) => { H = a140Head(P); P.gaze = lookAt(H, p); };
  if (t < 31.2) { // S3: in, door, wait, sit, plead
    const xf = (tt) => kfn(tt, [[21.84, 130], [22.6, 240], [22.85, 240], [23.4, 330], [27.2, 330], [27.7, A140_RD.sx]]);
    Object.assign(P, walk(xf, t)); P.sit = a140E(t, 27.7, 0.35); P.tip = 0.06 * (1 - P.sit); look(A);
    if (t < 22.5) P.gaze = [-1, 0.05]; P.lid = pulse(t, 22.55, 0.15);
    if (a140In(t, 22.4, 22.85)) { P.handLW = [205, 770]; P.dir = 1; }
    P.handL = [-24, -112]; P.handR = [24, -112]; P.sq = landSquash(t, 28.05, 0.08);
    if (t >= 27.7) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.brow = -0.6; P.talk = talk(t, [[27.75, 28.6]]); }
    if (t >= 28.7) { const u = a140E(t, 28.7, 0.4), v = a140E(t, 29.1, 0.25); P.handR = null; P.handRW = a140Lp(a140Lp([470, 820], A140_BILLDESK, u), [478, 812], v); P.tip = 0.1 * u * (1 - v); look(a140Lp([470, 820], A140_BILLDESK, u)); }
    if (t >= 29.32) { P.handRW = null; P.handR = [30, -100]; const u = a140E(t, 29.32, 0.5) * (1 - a140E(t, 30.0, 0.35)); P.handL = a140Lp([-24, -110], [-98, -160], u); P.gaze = u > 0.4 ? [-1, -0.1] : P.gaze; P.talk = talk(t, [[29.3, 30.4]]); }
    if (t >= 30.6) { const u = a140E(t, 30.6, 0.4); P.handL = [-24, -64]; P.handR = [24, -64]; P.sq = 1 - 0.05 * u; P.lid = 0.4 * u; P.mouth = 'frown'; }
  } else if (t < 41.7) { // S4: listening, leaning in
    look(A); P.handL = [-24, -64]; P.handR = [24, -64]; P.lid = 0.3; P.mouth = 'frown';
    if (t >= 33.7) { const fx = [A140_RD.ax - 44 - 12 * (a140In(t, 34.18, 35.2) ? Math.sin((t - 34.18) * Math.PI * 4) : 0), 900 - 205 * 0.9]; look(fx); P.lid = 0; }
    if (t >= 35.74) { P.tip = 0.06; P.mouth = 'o'; P.handL = [-20, -60]; P.handR = [20, -60]; P.brow = -0.4; look(A); }
    if (a140In(t, 37.4, 38.9)) P.gaze = [0.2, -1];
    if (t >= 40.7) P.gaze = gazePlan(t, [[0, P.gaze], [40.72, [-1, -0.1]]], 0.2);
  } else if (t < 52.0) { // S5: half rises, fear
    P.sit = t < 42.6 ? 1 - 0.5 * pulse(t, 41.7, 0.9) : 1; P.sq = settleTo(t, 42.3, 0.97, 1, 0.3); P.handL = [-24, -64]; P.handR = [24, -64];
    P.gaze = gazePlan(t, [[0, [-1, 0]], [42.2, [0.1, 0.9]], [42.88, [-0.7, 0.6]], [43.7, lookAt([450, 749], A)]], 0.2); P.drop = -4 * pulse(t, 42.65, 0.25);
    if (t >= 42.88) { P.handR = [30 + 6 * Math.sin(t * 10), -205]; P.lid = 0.35; P.mouth = 'frown'; }
    if (t >= 43.7) { P.handR = PERSON_HANDS.chest.R; P.lid = 0; P.talk = talk(t, [[43.7, 45.6]]); P.brow = -0.6; }
    if (t >= 45.7) { P.x += t < 46.3 ? tremble(t, 2) : 0; P.gaze = [-0.1, -1]; P.talk = 0; P.mouth = 'o'; }
    if (t >= 49.12) P.sq = 1 - 0.04 * pulse(t, 49.12, 0.4);
    if (t >= 51.38) { P.drop = 8 * a140E(t, 51.38, 0.4); P.lid = 0.6; P.mouth = 'frown'; P.sq = 0.95; P.gaze = [0, 1]; P.handR = [24, -64]; }
  } else if (t < 63.1) { // S6
    P.handL = [-24, -64]; P.handR = [24, -64]; P.mouth = 'frown'; P.lid = 0.4; P.drop = 6; P.gaze = [0, 1];
    if (t >= 53.98) { P.drop = 0; P.lid = 0; look([538, 726]); P.brow = -0.5; P.mouth = 'closed'; }
    if (t >= 59.5) look([620, 560]);
    if (t >= 61.28) P.brow = -0.7;
    if (t >= 62.48) { P.sit = 1 - a140E(t, 62.6, 0.35); P.sq = anticipate(t, 62.4, 0.25, 0.06); P.mouth = 'closed'; P.brow = 0.2; P.gaze = [-1, -0.05]; P.handL = [-30, -96]; P.handR = [30, -96]; }
  } else if (t < 92.0) { // S10: storms in, complains, mocks the prayer
    const xf = (tt) => kfn(tt, [[86.75, 130], [87.7, 420]]); Object.assign(P, walk(xf, t)); P.sit = 0; P.tip = 0.05 * K.clamp(P.amp); P.brow = 0.4; P.mouth = 'frown'; look(A);
    P.talk = talk(t, [[86.9, 88.0], [89.1, 90.2], [90.4, 91.2], [91.4, 91.95]]); P.handL = [-30, -100]; P.handR = [30, -100];
    if (t >= 89.04) { const k = settleTo(t, 89.04, 0, 1, 0.35, 0.15); P.handL = a140Lp([-30, -100], PERSON_HANDS.armsOut.L, k); P.handR = a140Lp([30, -100], PERSON_HANDS.armsOut.R, k); P.tip = -0.05; }
    if (t >= 90.32) { P.handL = A140_PRAY.handL; P.handR = A140_PRAY.handR; P.tip = 0; if (t < 90.75) { P.gaze = [0, -1]; P.lid = 0.2; } }
    if (t >= 91.38) { const f = Math.sin(Math.min(1, (t - 91.38) / 0.4) * Math.PI) * 10; P.handL = [-60, -100 + f]; P.handR = [60, -100 + f]; look(A); }
  } else if (t < 105.3) { // S11
    P.x = 420; P.sit = 0; P.handL = [-30, -100]; P.handR = [30, -100]; P.brow = -0.3; P.mouth = 'frown'; look(A);
    if (t >= 94.22) { P.gaze = gazePlan(t, [[0, P.gaze], [94.25, lookAt([420, 726], [428, 860])], [94.9, [-1, 0]], [95.6, lookAt([420, 726], A)]], 0.2); P.tip = 0.02 * Math.sin((t - 94.22) * 4); }
    if (t >= 97.9) { const xf = (tt) => kfn(tt, [[97.9, 420], [98.18, A140_RD.sx]]); Object.assign(P, walk(xf, t)); P.sit = a140E(t, 98.18, 0.18, 'in'); P.sq = landSquash(t, 98.36, 0.1); P.gaze = [0, 0.6]; }
    if (t >= 99.92) { P.handR = PERSON_HANDS.chin.R; P.handL = [-24, -64]; P.lid = 0.5; P.y += 1.5 * Math.abs(Math.sin(t * 7)); }
    if (t >= 101.78) { P.gaze = [-0.2, -1]; P.lid = 0.2; }
    if (t >= 103.52) P.sq = 1 - 0.06 * pulse(t, 103.55, 0.35);
    if (t >= 104.78) { P.handR = [6, -198]; P.lid = 1; P.drop = 4; }
  } else { // S12
    P.sit = 1; P.handR = PERSON_HANDS.chin.R; P.handL = [-24, -64]; P.lid = 0.5; P.mouth = 'frown'; P.gaze = [0, 0.6]; P.sq = breathe(t, 3, 0.02);
    if (t >= 109.56) { P.sq = settleTo(t, 109.56, 1.06, 1, 0.4); P.eyes = 'wide'; P.lid = null; P.handR = [24, -64]; P.brow = -0.5; P.mouth = 'o'; look([250, 720]); }
    if (t >= 112.88) { P.gaze = gazePlan(t, [[0, P.gaze], [112.95, [0.05, -1]], [114.4, [-0.4, -0.9]], [115.9, [0.1, -1]], [118.1, [0.5, -0.9]], [120.9, [0.6, -0.8]]], 0.2); P.mouth = 'o'; P.eyes = 'wide'; }
    if (t >= 114.28) P.talk = 0.15 * Math.min(4, Math.floor((t - 114.28) / 0.3) + 1);
    if (t >= 116.98) { P.sit = 1 - 0.5 * a140E(t, 116.98, 0.4); P.brow = -0.8; P.handL = [-34, -90]; P.handR = [34, -90]; }
    if (t >= 120.86) { P.sit = 0.5 - 0.5 * a140E(t, 120.86, 0.4); P.talk = 0; P.mouth = 'o'; }
    if (t >= 121.54) { look([A140_RD.ax, 749]); P.eyes = 'open'; }
  }
  return P;
}
// ---------- Abdullah ----------
function a140RoomAbd(t, saidH) {
  const P = a140Who(A140_ABD, { x: A140_RD.ax, y: 900, dir: -1, sit: 1, seat: 'bench', mouth: 'smile', brow: -0.2 });
  const H = a140Head(P), S = saidH || [450, 749]; P.gaze = lookAt(H, S);
  const coins = () => { P.handRW = [612 + 8 * Math.sin(t * 5), 790 - 4 * Math.abs(Math.sin(t * 5))]; P.handLW = [660, 792]; P.gaze = lookAt(H, [620, 790]); P.lid = 0.35; };
  if (t < 31.2) {
    if (t < 22.78) coins();
    else { P.handLW = [660, 792]; P.handRW = [630, 792]; P.brow = -0.3; }
    if (t >= 23.3) { P.handRW = null; P.handR = PERSON_HANDS.wave.R; P.handR = [64 + 8 * Math.sin(t * 10) * (t < 24.2 ? 1 : 0), -196]; }
    if (t >= 24.3) { P.handR = [86, -96]; P.talk = talk(t, [[24.3, 25.2]]); }
    if (t >= 25.4) { P.handR = null; P.handRW = [628, 792]; P.drop = 3 * pulse(t, 26.3, 0.3) + 3 * pulse(t, 28.0, 0.3); }
    if (a140In(t, 28.75, 29.6)) P.gaze = lookAt(H, A140_BILLDESK);
    if (t >= 30.6) { P.handRW = null; P.handR = [16 + 4 * Math.sin(t * 6), -158]; P.lid = 0.2; P.mouth = 'closed'; }
  } else if (t < 41.7) {
    P.tip = 0.05 * a140E(t, 31.38, 0.4); P.talk = talk(t, [[31.38, 33.6], [34.2, 37.2], [39.3, 41.5]]); P.handLW = [660, 792]; P.handR = [60, -110];
    if (t >= 33.55) { P.drop = -4 * pulse(t, 33.55, 0.2); P.handR = [44 + (a140In(t, 34.18, 35.2) ? 12 * Math.sin((t - 34.18) * Math.PI * 4) : 0), -205]; P.look = a140In(t, 34.18, 35.2) ? -0.5 * Math.sin((t - 34.18) * Math.PI * 4) : 0; P.brow = 0.2; }
    if (a140In(t, 37.4, 38.9)) P.gaze = [-0.2, -1];
    if (t >= 39.3) { P.handR = PERSON_HANDS.pointFwd.R; P.drop = 4 * pulse(t, 39.4, 0.3); P.brow = -0.1; }
    if (t >= 40.46) { const u = a140E(t, 40.46, 0.5); P.handR = a140Lp(PERSON_HANDS.pointFwd.R, [104, -182], u); P.gaze = u > 0.3 ? [-1, -0.05] : P.gaze; }
  } else if (t < 52.0) {
    P.handLW = [660, 792]; P.handR = [16 + 3 * Math.sin(t * 4), -158]; P.mouth = 'closed'; P.brow = -0.1; if (t >= 45.7) P.lid = 0.2;
  } else if (t < 63.1) {
    if (t < 52.45) { P.sit = 1 - a140E(t, 52.02, 0.4); P.handLW = [660, 792]; }
    else { const xf = (tt) => kfn(tt, [[52.45, A140_RD.ax], [53.5, 540]]); Object.assign(P, walk(xf, t)); P.sit = 0; P.seat = null; }
    const sh = [478, 790];
    if (t >= 53.4) { P.handRW = sh; P.handL = [-24, -100]; P.mouth = 'smile'; P.gaze = lookAt(a140Head(P), [450, 760]); }
    if (t >= 55.58) { P.handRW = sh; P.handLW = null; P.handL = t < 56.0 ? [-42, -200] : a140Lp([-42, -200], [-110, -150], a140E(t, 56.0, 0.4)); P.lid = 0.5; P.talk = talk(t, [[55.6, 57.8]]); }
    if (t >= 56.56) { P.handL = [-4, -120]; P.drop = 3 * (pulse(t, 56.7, 0.2) + pulse(t, 57.0, 0.2)); P.lid = 0; }
    if (t >= 58.3) { P.handL = [-34, -226]; P.gaze = [0.1, -1]; }
    if (t >= 59.5) { P.handL = [-24, -100]; P.gaze = lookAt(a140Head(P), [450, 760]); P.talk = talk(t, [[59.5, 62.3]]); }
    if (t >= 62.4) { P.handRW = a140Lp(sh, a140W(P, [30, -100]), a140E(t, 62.4, 0.3)); P.mouth = 'smile'; P.talk = 0; }
  } else if (t < 92.0) {
    coins(); if (t >= 87.2) { P.gaze = lookAt(H, S); P.lid = 0; }
    if (t >= 88.18) { P.brow = -0.5; P.handRW = null; P.handR = [60, -110]; P.mouth = 'closed'; }
    if (t >= 91.38) { P.handR = PERSON_HANDS.moustache.R; P.mouth = 'smile'; P.lid = 0.3; }
  } else if (t < 105.3) {
    P.handLW = [660, 792]; P.handR = [86, -70 + 8 * (pulse(t, 92.3, 0.2) + pulse(t, 92.6, 0.2))]; P.gaze = lookAt(H, [430, 860]); P.talk = talk(t, [[92.4, 93.8]]);
    if (t >= 93.0) P.gaze = lookAt(H, S);
    if (t >= 96.3) { P.handR = PERSON_HANDS.pointUp.R; P.tilt = 0.1; P.brow = -0.4; P.wink = a140In(t, 96.55, 96.95) ? 'R' : null; P.talk = talk(t, [[96.3, 97.2]]); }
    if (t >= 97.36) { P.tilt = 0; P.handR = null; const u = a140E(t, 97.4, 0.5); P.handRW = a140Lp([612, 788], [645, 762], u); P.gaze = lookAt(H, [630, 790]); P.lid = 0.35; }
    if (t >= 98.2) coins();
    if (t >= 101.78) { P.gaze = lookAt(H, S); P.lid = 0.2; P.mouth = 'closed'; P.handRW = null; P.handR = PERSON_HANDS.chin.R; }
  } else {
    if (t < 108.48) coins(); else { P.gaze = lookAt(H, [250, 720]); P.handLW = [660, 792]; P.handR = [60, -110]; P.mouth = 'closed'; }
    if (t >= 112.88) P.gaze = [-0.4, -0.9];
    if (t >= 118.0) P.mouth = 'smile';
    if (t >= 121.54) { P.handR = PERSON_HANDS.moustache.R; P.gaze = lookAt(H, S); P.brow = -0.3; P.lid = 0.3; P.tilt = 0.06; }
  }
  return P;
}
// ---------- the servant bursts in (S12) ----------
function a140RoomServ(t) {
  const xf = (tt) => kfn(tt, [[108.5, 60], [110.22, 250]], 'lin'), P = a140Who(A140_SERV, { y: 900, dir: 1, mouth: 'open', eyes: 'wide', ...walk(xf, t, { amp: 120 }) });
  P.tip = 0.14 * K.clamp(P.amp) + lurch(t, 110.22, 0.2); const sn = Math.sin(P.ph); P.handL = [-30 + 30 * sn, -120]; P.handR = [30 - 30 * sn, -120];
  P.gaze = lookAt(a140Head(P), [450, 740]);
  if (t >= 110.3) { const u = a140E(t, 110.3, 0.25); P.tip = 0.34 * u; P.handL = [-24, -72]; P.handR = [24, -72]; P.sq = 1 - 0.04 * Math.abs(Math.sin(t * 12)); P.mouth = 'open'; }
  if (t >= 111.06) { P.tip = 0.34 * (1 - a140E(t, 111.06, 0.25)); P.handL = PERSON_HANDS.armsOut.L; P.handR = [30, -100]; P.talk = 0.5 + 0.5 * Math.abs(Math.sin(t * 12)); P.sq = 1; P.gaze = [-1, -0.1]; }
  if (t >= 112.0) P.gaze = lookAt(a140Head(P), [450, 740]);
  if (t >= 112.88) { P.handL = [-30, -100]; P.handR = [60, -200]; P.talk = talk(t, [[112.9, 122.2]]); }
  if (t >= 114.28) { const k = Math.min(4, Math.floor((t - 114.28) / 0.38) + 1); P.handR = [40 + 10 * k, -150 - 10 * k]; P.handL = [-30, -100]; }
  if (t >= 116.0) { P.handL = [-40, -150]; P.handR = [40, -150]; P.sq = 1 - 0.05 * pulse(t, 116.0, 0.3); }
  if (t >= 118.04) { P.tilt = -0.1; P.handL = [-34, -86]; P.handR = [34, -86]; P.mouth = 'closed'; P.talk = 0; P.eyes = 'open'; }
  if (t >= 119.76) { const u = a140E(t, 119.76, 0.4); P.tilt = 0; P.handL = [-10 - 50 * u, -140]; P.handR = [10 + 50 * u, -140]; P.talk = talk(t, [[119.8, 122.2]]); P.mouth = 'smile'; }
  return P;
}
function a140RoomWorld(ctx, t, cam) {
  const W = {}, u = a140RoomU(t);
  let door = 0; if (t < 31.2) door = t < 21.84 ? 0 : t < 22.45 ? 0.8 * a140E(t, 21.84, 0.3) : 0.8 * (1 - a140E(t, 22.45, 0.35));
  if (a140In(t, 86.6, 92.0)) door = t < 86.7 ? 0 : t < 87.6 ? 0.9 * a140E(t, 86.7, 0.2) : 0.9 * (1 - a140E(t, 87.6, 0.4));
  if (t >= 108.48) door = settleTo(t, 108.48, 0, 0.95, 0.25, 0.1);
  palaceHall(ctx, { variant: 'merchant', wall: 'ochre', desk: false, stools: [], u, doorOpen: door, t });
  const said = a140RoomSaid(t), sh = a140Head(said), abd = a140RoomAbd(t, sh);
  // Abdullah's bench, the stool
  shape(ctx, K.rectPts(626, 852, 112, 48), '#a8261a', { lw: 5, seed: 700, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.45 });
  seatStool(ctx, A140_RD.stool, 900 + 2 * pulse(t, 98.36, 0.2));
  const front = abd.x < 555;
  if (!front) person(ctx, abd);
  a140Desk(ctx, A140_RD.desk[0], A140_RD.desk[1], A140_RD.desk[2], { extra: t >= 97.9 && t < 122.4 ? 1 : 0 });
  if (t >= 29.1 || (t >= 28.7 && said.handRW)) { const onDesk = t >= 29.1; const p = onDesk ? A140_BILLDESK : said.handRW; a140Bill(ctx, p[0], p[1] - (onDesk ? 3 : 10), 0.5, { flat: onDesk ? 0.85 : 0, rot: onDesk ? 0.2 : -0.2 }); }
  if (a140In(t, 97.4, 97.9)) a140Coin(ctx, ...a140Lp([612, 780], [645, 754], a140E(t, 97.4, 0.5)), 12, 0.6);
  if (front) person(ctx, abd);
  if (t >= 108.48 && t < 122.4) { const V = a140RoomServ(t); person(ctx, V); W.serv = a140Head(V);
    for (const f of [108.75, 109.15, 109.55, 109.95]) a140Dust(ctx, (60 + 190 * (f - 108.5) / 1.72) - 10, 900, t, f, 3, Math.round(f * 10));
    a140Dust(ctx, 270, 900, t, 110.22, 7, 9); }
  person(ctx, said);
  W.said = sh; W.abd = a140Head(abd);
  return W;
}
// cameras (world 1000 x 1230)
const A140_CAMROOM = [
  [21.6, { x: 470, y: 700, zoom: 1.25 }], [31.19, { x: 470, y: 700, zoom: 1.25 }],
  [31.2, { x: 565, y: 720, zoom: 1.5 }], [36.6, { x: 565, y: 720, zoom: 1.5 }], [37.4, { x: 565, y: 680, zoom: 1.5 }], [41.69, { x: 565, y: 680, zoom: 1.5 }],
  [41.7, { x: 440, y: 700, zoom: 1.7 }], [45.4, { x: 440, y: 700, zoom: 1.7 }], [46.2, { x: 480, y: 580, zoom: 1.25 }], [51.99, { x: 480, y: 580, zoom: 1.25 }],
  [52.0, { x: 540, y: 720, zoom: 1.45 }], [62.3, { x: 540, y: 720, zoom: 1.45 }], [62.9, { x: 470, y: 715, zoom: 1.7 }], [63.1, { x: 470, y: 715, zoom: 1.7 }],
  [86.6, { x: 550, y: 720, zoom: 1.4 }], [91.99, { x: 550, y: 720, zoom: 1.4 }],
  [92.0, { x: 550, y: 720, zoom: 1.35 }], [98.0, { x: 550, y: 720, zoom: 1.35 }], [100.5, { x: 470, y: 690, zoom: 1.6 }], [105.29, { x: 470, y: 690, zoom: 1.6 }],
  [105.3, { x: 500, y: 660, zoom: 1.1 }], [108.3, { x: 500, y: 660, zoom: 1.1 }], [108.55, { x: 455, y: 660, zoom: 1.1 }], [109.2, { x: 500, y: 660, zoom: 1.1 }], [112.0, { x: 500, y: 650, zoom: 1.25 }], [122.4, { x: 500, y: 650, zoom: 1.25 }]];
