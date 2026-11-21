// ===== ALI-04 shots S1-S3 (0 - 16.3 s): evening street, WELCOME!, the jars set down in the courtyard =====
const A4_EV = 'dusk';   // the cast's colour model in the evening (k 0: no tint; light from the left)
// a pack mule with its two jars (donkey pal 1, the middle one pal 2), walking by a position function
function a4Mule(ctx, t, i, xf, o = {}) {
  const tc = AB_T2(t), W = walk(xf, tc, { stride: GAIT.donkey * 0.82 }), P = { x: W.x, y: o.y || 905, s: 0.82, dir: o.dir || 1, pal: i === 1 ? 2 : 1, ph: W.ph + (W.amp < 0.05 ? 0.15 * Math.sin(tc * 2 + i) : 0), amp: Math.max(W.amp, 0.04),
    headDown: 0.2 + 0.1 * Math.sin(W.ph + i) + (o.shake ? 0.25 * Math.sin(tc * 20) * o.shake : 0), earL: 0.2 + idleSway(tc, 600 + i, 0.3, 1.6) + (o.earBack ? -0.9 : 0), earR: 0.1 + idleSway(tc, 610 + i, 0.3, 2.1), tailSwish: osc(tc, 1.5 + i * 0.3, i * 0.2), lid: abLid(t, 620 + i), sag: o.light ? 0 : 0.25 };
  a3Shadow(ctx, P.x, P.y, 230, 0, o.shc || A4_ESH); abDonkey(ctx, P, 'dusk');
  if (!o.light) { const seat = mountSeat('donkey', P), sw = 0.08 * Math.sin(W.ph + 0.8) + lagged((u) => 0.08 * Math.sin(walk(xf, u, { stride: GAIT.donkey * 0.82 }).ph), tc, 0.12, 0.6) + (o.shake ? 0.12 * swing(t, o.shakeT, 1, 1.6, 2.5) : 0);
    jarPannier(ctx, seat, 0.82, P.dir, { sway: sw, stain: i === 1, lid: o.lid || 0 }); }
  return P;
}

// ---------- S1 0-8.9: the street, I AM AN OIL MERCHANT., A SAFE YARD FOR MY JARS? ----------
const A4_S1_CAM = [[0, { x: 930, y: 615, zoom: 1 }], [4.0, { x: 900, y: 615, zoom: 1 }], [5.7, { x: 1150, y: 615, zoom: 1 }], [6.4, { x: 1140, y: 615, zoom: 1 }], [7.6, { x: 560, y: 615, zoom: 1 }], [7.7, { x: 560, y: 615, zoom: 1 }], [8.9, { x: 900, y: 615, zoom: 1 }]];
const A4_OM_BOW = [[0, 0.22], [0.5, 0.12], [1.0, 0]];
function a4OilM1(t) {   // the merchant's pose S1-S2
  const tc = AB_T2(t), P = { x: 790, y: 905, dir: 1, lid: Math.max(0.3, abLid(t, 51)), tip: idleSway(tc, 52, 0.015, 3), sq: breathe(tc, 53, 0.012), gaze: [1, -0.1], mouth: 'smile', brow: 0.6, handL: [-30, -100], handR: [14, -98] };
  if (tc < 1.0) { P.tip = flow(tc, A4_OM_BOW); P.handR = [4, -122]; }
  else if (tc < 2.2) { P.handR = [4, -122 + 4 * (1 - beatIn(tc, 1.0, 1.4))]; }
  else if (tc < 3.28) { P.handR = [4, -126]; P.talk = abTalk(t, 2.2, 3.2, 3, 0.6); if (P.talk) P.mouth = 'open'; P.tip = 0.05 * pulse(tc, 2.9, 0.3); }
  else if (tc < 4.0) { const r = beatIn(tc, 3.28, 3.5); P.handL = [K.lerp(-30, -110, r), K.lerp(-100, -150, r)]; P.gaze = [-1, 0]; P.look = -0.6; }
  else if (tc < 5.04) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.tip = 0.08 * beatIn(tc, 4.0, 4.2); P.brow = -0.5; P.gaze = gazePlan(tc, [[4.0, [1, -0.2]], [4.5, [1, 0]]]); }
  else if (tc < 5.72) { const r = beatIn(tc, 5.04, 5.2); P.handR = [K.lerp(14, 96, r), K.lerp(-98, -176, r)]; P.talk = abTalk(t, 5.04, 5.7, 4, 0.6); if (P.talk) P.mouth = 'open'; P.gaze = [1, -0.3]; }
  else if (tc < 7.48) { P.gaze = [1, 0]; P.lid = 0.3; }
  else if (tc < 8.2) { if (tc < 7.8) { P.handR = PERSON_HANDS.pointUp.R; P.gaze = [0.6, -1]; } else { P.handR = PERSON_HANDS.mouthCover.R; P.mouth = 'o'; P.gaze = [1, 0]; P.tip = -0.04; } }
  else if (tc < 8.98) { P.gaze = [1, 0]; }
  else if (tc < 9.98) { P.gaze = [1, 0]; P.lid = 0.3; }
  else if (tc < 10.72) { P.handR = [70, -120]; P.tip = 0.04; P.gaze = [1, 0]; P.mouth = 'smile'; P.lid = 0.35; }
  else { P.gaze = [1, -0.05]; P.handL = [-60, -112]; }
  return P;
}
function a4Ali1(t) {
  const tc = AB_T2(t), x = tc < 10.72 ? kfn(tc, [[1.0, 952], [1.4, 930]]) : kfn(tc, [[10.72, 930], [11.4, 1215]]), W = walk(() => x, tc), P = { x, y: tc < 1.0 ? 900 : 908, dir: tc < 10.72 ? -1 : 1, lid: abLid(t, 61, [5.72]), tip: idleSway(tc, 62, 0.02, 2.6), sq: breathe(tc, 63, 0.015), gaze: [-1, 0], mouth: 'smile', handL: [-26, -100], handR: [26, -104] };
  if (tc >= 10.72 && tc < 11.4) { const Wk = walk((u) => kfn(u, [[10.72, 930], [11.4, 1215]]), tc, { stride: 20 }); Object.assign(P, Wk); P.tip = 0.05; P.handL = [-34 + 14 * Math.sin(Wk.ph), -104]; P.handR = [34 - 14 * Math.sin(Wk.ph), -104]; }
  if (tc < 1.0) { P.handRW = [985, 800]; P.gaze = [-1, 0]; }
  else if (tc < 2.0) { P.tilt = 0.08; P.handRW = tc < 1.5 ? [985, 800] : null; P.gaze = gazePlan(tc, [[1.0, [-1, 0]], [1.35, [-1, 0.3]], [1.7, [-1, -0.1]]]); }
  else if (tc < 5.72) { P.gaze = [-1, -0.1]; P.tilt = 0.04; }
  else if (tc < 6.5) { P.gaze = gazePlan(tc, [[5.72, [1, -0.2]], [6.0, [-1, 0]]]); P.look = tc < 6.0 ? 0.6 : -0.4; P.handR = PERSON_HANDS.chin.R; P.tip = 0.03; }
  else if (tc < 8.2) { P.handR = PERSON_HANDS.chin.R; P.gaze = [-1, -0.2]; }
  else if (tc < 8.98) { P.sq *= 1 + 0.03 * beatIn(tc, 8.2, 8.7); P.gaze = [-1, 0]; P.handL = [-30, -110]; P.handR = [30, -112]; }
  else if (tc < 9.98) { const f = flow(tc, [[8.98, 0], [9.2, 1.1], [9.5, 1]]); P.handL = [K.lerp(-30, -96, f), K.lerp(-110, -168, f)]; P.handR = [K.lerp(30, 96, f), K.lerp(-112, -172, f)]; P.sq *= 1 + 0.05 * pulse(tc, 8.98, 0.5); P.lid = 0.6; P.mouth = 'open'; P.talk = abTalk(t, 8.98, 9.6, 5); }
  else if (tc < 10.72) { P.handLW = [858, 812]; P.handRW = [866, 800]; P.tip = -0.05; P.lid = 0.5; }
  else if (tc < 11.44) { P.gaze = [1, 0]; }
  else { P.dir = -1; P.handR = [90, -170]; P.handL = [-40, -100]; P.tip = 0.06; P.gaze = [-1, 0]; }
  return P;
}
const A4_MULE1 = [560, 330, 100];
function a4S1World(ctx, t, cam) {
  const tc = AB_T2(t), gate = kfn(tc, [[11.44, 0], [12.1, 1]]), wsh = tc < 10.32 ? 0.45 : kfn(tc, [[10.32, 0.45], [10.7, 0]]);
  a3Street(ctx, t, cam, { m: 'evening', lan: 1, washing: { empty: true }, marks: { glow: 0.3 }, doors: [{ i: 3, open: 1, lit: 1 }], gate,
    flock: [-200, 260, 150, 4, 13, 0], win: { sh: wsh, lit: 0.4, inside: tc < 10.7 ? (c) => morgianaWindow(c, t, { x: tc < 10.32 ? 1090 : kfn(tc, [[10.32, 1090], [10.62, 1160]]), gaze: tc < 6.6 ? [-1, 0.7] : tc < 7.4 ? [-1, 0.9] : [-1, 0.6], lid: tc > 10.0 ? 0.55 : 0.35, handLW: [1052, 548] }, A4_EV, { kick: tc > 10.32 ? 0.6 : 0 }) : null } });
  if (tc > 10.72 && tc < 11.5) { const lift = beatIn(tc, 11.1, 11.4); gateBar(ctx, 1310 + 160 * beatIn(tc, 11.3, 11.44), 780, { down: 1 - lift }); } else if (tc <= 10.72) gateBar(ctx, 1310, 780, { down: 1 });
  a4Cat(ctx, t, { x: 700, y: 272, dir: 1, sit: 1, gaze: tc < 12 ? [1, 0.5] : [1, 0.8] }, A4_ESH);
  const P = a4OilM1(t);
  A4_MULE1.forEach((x0, i) => { const xf = (u) => (u < 12.14 ? x0 : x0 + 260 * K.ease.in(beatIn(u, 12.14 + 0.3 * i, 13.2 + 0.3 * i))); a4Mule(ctx, t, i, xf, { shake: i === 0 ? pulse(tc, 3.3, 0.6) : 0, shakeT: 3.3, lid: i === 2 ? Math.sin(Math.PI * beatIn(tc, 6.9, 7.35)) : 0, earBack: i === 2 && tc > 6.95 && tc < 7.8 }); });
  const m0 = A4_MULE1[0] + (tc > 12.14 ? 260 * K.ease.in(beatIn(tc, 12.14, 13.2)) : 0), slack = tc > 12.14 && tc < 12.3 ? 2 : 30;
  oilMerchant(ctx, t, P, A4_EV, { rope: [m0 + 118, 812], slack, kick: 0.15 * pulse(tc, 0.2, 0.8), glint: tc > 9.98 && tc < 10.5 ? K.clamp((tc - 10.0) / 0.4) : 0, shc: A4_ESH });
  a2Ali(ctx, a4Ali1(t), A4_EV, { shc: A4_ESH });
  if (tc > 7.48 && tc < 8.4) abGlint(ctx, 760, 150, 30, ((t - 7.48) / 0.9) % 1);
}
function a4S1Over(ctx, t, cam, S) {
  if (t > 0.3 && t < 3.2) { const off = t > 2.9 ? [1, 0, 1, 0, 0, 0][Math.min(5, Math.floor((t - 2.9) * 15))] : 1;
    if (off) { S.title(ctx, 'THE MERCHANT OF OIL', 500, 190, K.clamp((t - 0.3) / 1.0), { size: 76, align: 'center' });
      if (t > 0.8) S.title(ctx, 'تاجر الزيت الغريب', 500, 315, K.clamp((t - 0.8) / 1.0), { size: 70, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); } }
  const [hx, hy] = abP(800, 690, cam);
  if (t > 2.6 && t < 4.4) a4Say(ctx, S, [[2.66, 'I AM AN OIL MERCHANT.']], t, K.clamp(hx + 40, 300, 700), hy - 180, [hx + 10, hy - 30], { size: 50, gone: 4.1 });
  if (t > 5.0 && t < 6.9) a4Say(ctx, S, [[5.04, 'A SAFE YARD FOR MY JARS?']], t, K.clamp(hx + 60, 330, 680), hy - 190, [hx + 10, hy - 30], { size: 50, gone: 6.55 });
  if (t > 8.95 && t < 10.3) { const [ax, ay] = abP(935, 690, cam); a4Say(ctx, S, [[8.98, 'WELCOME!']], t, K.clamp(ax + 60, 330, 690), ay - 230, [ax, ay - 50], { size: 56, gone: 9.95 }); }
}
AB_SHOTS.push({ a: 0, b: 8.9, ww: 2000, cam: a3Cam(A4_S1_CAM), world: a4S1World, over: a4S1Over });
// ---------- S2 8.9-12.3: WELCOME!, the handclasp and the ring, Morgiana leaves the window, the gate opens ----------
AB_SHOTS.push({ a: 8.9, b: 12.3, ww: 2000, cam: a3Cam([[8.9, { x: 900, y: 650, zoom: 1.25 }], [10.7, { x: 905, y: 650, zoom: 1.25 }], [11.6, { x: 1230, y: 640, zoom: 1.1 }], [12.3, { x: 1250, y: 640, zoom: 1.1 }]]), world: a4S1World, over: a4S1Over });

// ---------- S3 12.3-16.3: the courtyard (evening), six jars set down, the counter, alone: the smile drops; the sky cools ----------
const A4_LAND = [13.12, 13.4, 13.7, 14.0, 14.3, 14.6];
const A4_S3_MX = (u) => (u < 13.12 ? kfn(u, [[12.3, 620], [13.0, 840]]) : u < 14.6 ? K.lerp(840, 1410, (u - 13.12) / 1.48) : kfn(u, [[14.6, 1410], [14.9, 1440]]));
function a4S3World(ctx, t, cam) {
  const tc = AB_T2(t), k = K.clamp((t - 15.6) / 0.7);
  courtyard(ctx, t, cam, { m: 'evening', m2: 'night', k, sun: [300, 560 + 80 * k, 1 - k], moon: [1500, K.lerp(330, 250, k), k], lan: 0.6 + 0.4 * k, K: { open: 0, lit: 0.8 }, G: { open: 0 }, gwin: { sh: 0.3, lit: 0.6 } });
  if (t < 12.9) abFlock(ctx, t - 12.3, 1000, 520, 260, 1, 17, 0.36);
  // jars already down (each lands with a squash and a puff)
  for (let i = 0; i < 6; i++) { const tl = A4_LAND[i]; if (tc < tl) continue; const sq = 1 - 0.06 * Math.exp(-(tc - tl) * 14) * (tc - tl < 0.3 ? 1 : 0); cyJar(ctx, t, i, { sq, shc: A4_ESH });
    if (t - tl < 0.4) a3Puff(ctx, CY_JARS[i].x, 884, (t - tl) / 0.4, 5, 9, '#f0d0b0'); }
  if (t > 14.04 && t < 14.6) { ctx.save(); ctx.strokeStyle = '#ffe9a0'; ctx.lineWidth = 3; for (let k2 = 0; k2 < 2; k2++) { ctx.globalAlpha = 0.8 * (1 - beatIn(t, 14.04 + k2 * 0.15, 14.5)); ctx.beginPath(); for (let j = 0; j <= 8; j++) ctx.lineTo(1440 + j * 6, 620 - k2 * 16 + 4 * Math.sin(j * 1.6 + t * 12)); ctx.stroke(); } ctx.restore(); }
  // mule 0 at the left with the first jar; Ali Baba leads the mules away
  const ax = kfn(tc, [[12.3, 700], [13.0, 760], [14.56, 860], [15.1, 700], [15.8, 380]]);
  if (cam.x - 500 < 760) a4Mule(ctx, t, 0, (u) => kfn(u, [[14.9, 520], [15.8, 260]]), { dir: tc < 14.9 ? 1 : -1, light: tc > 13.0 });
  const A = { x: ax, y: 915, dir: tc < 14.9 ? 1 : -1, ...walk((u) => kfn(u, [[12.3, 700], [13.0, 760], [14.56, 860], [15.1, 700], [15.8, 380]]), tc, { stride: 22 }), lid: abLid(t, 71, [13.8]), tip: idleSway(tc, 72, 0.02, 2.4), sq: breathe(tc, 73, 0.015), gaze: [1, 0], mouth: 'smile', handL: [-30, -104], handR: [30, -106] };
  if (tc > 12.44 && tc < 13.1) { A.handR = [96, -150]; A.tip = 0.06; }
  if (tc > 13.8 && tc < 14.56) { A.handR = tc < 14.1 ? [70, -170 + 10 * Math.sin(tc * 20)] : [14, -200]; A.gaze = [1, -0.2]; A.mouth = 'o'; }
  if (tc > 14.56 && tc < 14.9) { A.handR = [104, -190]; A.gaze = [1, -0.2]; }
  a2Ali(ctx, A, A4_EV, { shc: A4_ESH });
  // the merchant: strain lift, carries and sets down the jars, pats the oil jar, bows Ali Baba away, then the smile drops
  const W = walk(A4_S3_MX, tc, { stride: 26 }), P = { y: 920, dir: 1, ...W, lid: 0.3, tip: idleSway(tc, 81, 0.015, 3), sq: breathe(tc, 82, 0.012), gaze: [1, 0], mouth: 'smile', brow: 0.6, handL: [-30, -100], handR: [14, -98] };
  let carry = null;
  if (tc < 13.12) { P.sq *= tc > 12.44 ? K.lerp(0.94, 1.06, beatIn(tc, 12.6, 13.0)) : 1; P.x += tc > 12.44 ? tremble(tc, 1.5) : 0; P.handL = [30, -150]; P.handR = [44, -146]; P.mouth = 'grin'; P.brow = 0.9; if (tc > 12.6) { P.handR = [70, -130]; } carry = tc > 12.44 ? [P.x + 46, 905 - 60 * beatIn(tc, 12.44, 12.9)] : null;
    if (tc > 12.7) { A.handR = [100, -130]; } }
  else if (tc < 14.6) { P.handL = [40, -120]; P.handR = [50, -126]; P.tip = 0.05; P.mouth = 'grin'; const nxt = A4_LAND.findIndex((v) => v > tc); if (nxt > 0 && nxt < 6) carry = [P.x + 50, 860 + 20 * Math.max(0, 1 - (A4_LAND[nxt] - tc) / 0.15)]; }
  if (tc > 14.04 && tc < 14.56) { P.handR = [70, -120 + 14 * Math.abs(Math.sin(tc * 14))]; P.gaze = [1, 0.3]; P.mouth = 'smile'; }
  if (tc > 14.56 && tc < 15.2) { P.dir = -1; P.tip = 0.12 * Math.sin(Math.PI * beatIn(tc, 14.6, 15.1)); P.handR = [10, -118]; P.gaze = [-1, 0]; }
  if (tc >= 15.2) { const st = Math.min(2, Math.floor((tc - 15.2) / 0.22)); P.dir = 1; P.mouth = ['smile', 'closed', 'frown'][st]; P.brow = [0.6, 0.7, 0.85][st]; P.lid = [0.2, 0.3, 0.35][st]; P.gaze = st > 1 ? [1, 0.2] : [-1, 0]; P.handL = [-12, -96]; P.handR = [12, -98]; P.tip = 0; }
  oilMerchant(ctx, t, P, A4_EV, { kick: 0.25 * W.amp, shc: A4_ESH });
  if (carry) oilJar(ctx, carry[0], carry[1], 1.4, { rot: 0.05 * Math.sin(tc * 9) });
}
function a4S3Over(ctx, t, cam, S) {
  const n = A4_LAND.filter((v) => t >= v).length; if (n > 0 && t < 15.6) { const [x, y] = abP(1180, 470, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 15.3) / 0.3); S.counter(ctx, n, x, y, K.clamp((t - 13.12) / 0.3), { size: 96 }); ctx.restore(); }
}
AB_SHOTS.push({ a: 12.3, b: 16.3, ww: 2200, cam: a3Cam([[12.3, { x: 760, y: 615, zoom: 1 }], [14.6, { x: 1180, y: 615, zoom: 1 }], [16.3, { x: 1220, y: 625, zoom: 1.02 }]]), world: a4S3World, over: a4S3Over });
