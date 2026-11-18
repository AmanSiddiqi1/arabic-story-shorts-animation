// ===== AN-151 street: a 2400 strip (houses of the woman and the neighbour, a plain house with a stall, the school front, the mosque front) =====
// scenes S1 (0-9.28), S2 (9.28-13.34), S4 (21.24-28.7), S10 (86.06-92.98), S11 (92.98-106.26), S13 (118.08-124.32)
const IL_HOUSES = [
  { x0: -10, x1: 245, top: 470, col: 2, windows: [[70, 560, 80, 92]] },
  { x0: 250, x1: 600, top: 430, col: 0, door: [350, 490, 620, 'round'], windows: [[515, 560, 66, 84]] },   // the woman's house
  { x0: 608, x1: 900, top: 400, col: 1, door: [812, 890, 665, 'round'] },                                    // the neighbour's (window drawn live)
  { x0: 908, x1: 1245, top: 450, col: 2, windows: [[960, 560, 80, 92], [1140, 560, 80, 92]] },
  { x0: 1250, x1: 1650, top: 380, col: 0, door: [1380, 1520, 610, 'pointed'], windows: [[1290, 640, 60, 80], [1570, 640, 60, 80]] },   // the school
];
const IL_NWIN = [690, 505, 120, 130];          // neighbour's shuttered window (x, y, w, h)
const IL_STEP = [300, 545, 852];               // the woman's doorstep block (x0, x1, top), 48 high: a seated figure's hips land on it
const IL_NOTICE = [1840, 690];                 // the wall notice on the mosque wall (S1)
const IL_SIGN = [1450, 392];                   // SCHOOL sign hooks (cx, y)

// ---------- impostor in the street ----------
function ilImpStreet(t) {
  const P = ilWho(IL_IMP, { y: 900, dir: 1 }); let broom = null, tab = null, chalk = null, turban = t >= 21.24;
  if (t < 9.28) { // S1: sweeping, the notice, the mask, the passer-by
    P.x = kfn(t, [[1.72, 1960], [2.84, 1940], [7.2, 1940], [7.42, 1918]]); const sw = t < 1.72 ? Math.sin(t * Math.PI * 4) : 0;
    P.tip = 0.06 * sw * (t < 1.72 ? 1 : 0); P.gaze = [0.3, 0.8]; P.lid = Math.max(0.25, blink(t, 3));
    if (t < 3.38) { const f = [2040 + 26 * sw, 897], h0 = [P.x + 30 + 8 * sw, 775]; broom = [h0, f]; P.handRW = h0; P.handLW = ilLp(h0, f, 0.35); }
    if (t >= 1.72) { P.gaze = look(t, [P.x, 700], [[1.72, [2100, 900]], [1.9, IL_NOTICE], [2.84, [1800, 640]], [3.0, [1880, 740]], [3.12, [1790, 720]], [3.24, [1880, 640]]], 0.07);
      P.brow = -0.3; P.tilt = -0.07 * ilE(t, 1.72, 0.4); }
    if (t >= 2.84) { P.tip = -0.08 * ilE(t, 2.84, 0.3); P.lid = Math.max(0.55, blink(t, 3)); P.mouth = 'frown'; }
    if (t >= 3.38) { broom = [[2010, 712], [2046, 897]]; if (t < 4.68) P.handR = [44 + tremble(t, 3, 6), -210]; }
    if (t >= 4.68 && t < 5.5) { P.handLW = [1890 + tremble(t, 3, 11), 700 + tremble(t + 0.1, 3, 7)]; chalk = K.clamp((t - 4.68) / 0.8); P.mouth = 'o'; P.brow = 0.4; P.gaze = lookAt([P.x, 700], [1880, 700]); }
    if (t >= 5.5 && t < 5.94) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.drop = 4; P.mouth = 'frown'; P.tip = -0.08 * (1 - ilE(t, 5.5, 0.3)); }
    if (t >= 5.94) { P.tip = 0; P.tilt = 0; P.gaze = [0, 0.05]; P.brow = -0.4; P.mouth = 'smile'; P.lid = Math.max(0.3, blink(t, 3)); P.sq = settleTo(t, 5.94, 1, 1.03, 0.35); broom = [[P.x + 46, 770], [P.x + 52, 897]]; P.handRW = [P.x + 46, 770]; P.handL = null; P.handR = null; }
    if (t >= 6.9) P.gaze = look(t, [P.x, 700], [[6.9, [2300, 760]], [7.3, [2170, 700]]]);
    if (t >= 7.42 && t < 8.05) { broom = [[P.x + 58, 772], [P.x + 74, 897]]; P.handRW = null; P.handR = PERSON_HANDS.chin.R; P.handR = [16 + 5 * Math.sin(t * 16), -160];   // the wise chin stroke
      const u = ilE(t, 7.5, 0.45, 'lin'); P.handLW = [K.lerp(1880, 1846, u), 700 + 4 * Math.sin(u * 20)]; P.gaze = lookAt([P.x, 700], P.handLW); P.lid = 0.45; P.brow = -0.5; P.tip = -0.05; P.mouth = 'closed'; }
    if (t >= 8.05) { broom = [[P.x + 58, 772], [P.x + 74, 897]]; P.handRW = null; P.handR = null; P.handLW = null; P.tip = 0; }
    if (t >= 8.1) { P.wink = 'R'; P.gaze = [0, 0.05]; P.lid = 0; P.handL = null; P.drop = 0; P.mouth = 'smile'; }
    if (chalk == null && t >= 5.5) chalk = t < 5.9 ? 1 : 0;
    return { P, broom, chalk, turban: false };
  }
  if (t < 13.34) { // S2: the idea, the door, the sign, the children
    P.x = kfn(t, [[11.12, 1330], [11.5, 1290]]); P.lid = Math.max(0.2, blink(t, 3));
    P.sq = anticipate(t, 9.08, 0.2, 0.06) * settleTo(t, 9.28, 1, 1.03, 0.3); P.handR = PERSON_HANDS.pointUp.R; P.brow = -0.5; P.mouth = 'smile';
    P.gaze = gazePlan(t, [[9.28, [0.6, -0.9]], [9.8, [0, 0.05]]]);
    if (t >= 10.1) { P.handR = null; P.handRW = [kfn(t, [[10.1, 1395], [10.5, 1430], [10.9, 1400]]), 762]; P.tip = 0.08 * pulse(t, 10.1, 0.9); P.gaze = [1, 0.1]; }
    if (t >= 11.12) { P.handRW = null; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = lookAt([P.x, 700], [1450, 540]); P.sq = settleTo(t, 11.12, 1, 1.04, 0.3); }
    if (t >= 12.6) { P.handR = PERSON_HANDS.wave.R; P.handR = [64 + 10 * Math.sin(t * 14), -196]; P.gaze = [1, 0.1]; P.mouth = 'open'; P.talk = 0; }
    return { P, bulb: t >= 9.28 ? K.clamp((t - 9.28) / 0.3) * (1 - ilE(t, 10.0, 0.25)) : 0 };
  }
  if (t < 28.7) { // S4: the statue in the doorway, the bow
    P.x = kfn(t, [[27.0, 1450], [27.5, 1560]]); P.dir = -1; P.lid = Math.max(0.5, blink(t, 3)); P.gaze = [-0.6, -0.5]; P.handLW = [P.x + 30, 790]; tab = true;
    P.sq = breathe(t, 3); P.amp = P.x > 1452 && P.x < 1558 ? 0.6 : 0; P.ph = P.x / 22;
    if (t >= 23.4) { P.drop = -4 * ilE(t, 23.4, 0.3); P.mouth = 'smile'; }
    if (t >= 26.4) { P.gaze = look(t, [P.x, 700], [[26.4, [1200, 820]], [26.9, [1300, 860]]]); P.lid = Math.max(0.35, blink(t, 3)); }
    let slump = 0, hand = null;
    if (t >= 27.5) { P.handL = PERSON_HANDS.armsOut.L; P.handLW = null; tab = false; P.gaze = [-0.4, 0.6]; P.mouth = 'smile'; }
    let bowTip = 0;
    if (t >= 28.08) { P.tip = 0.2 * ilE(t, 28.08, 0.25); slump = 0.5 * ilE(t, 28.12, 0.2) * (1 - ilE(t, 28.5, 0.15)); bowTip = 0.44 * ilE(t, 28.1, 0.18) * (1 - ilE(t, 28.5, 0.15)); if (t >= 28.2) { hand = true; P.handL = [-46, -232]; P.handR = [52, -226]; }
      if (t >= 28.4) P.gaze = gazePlan(t, [[28.4, [-0.9, 0]], [28.55, [-0.6, -0.2]]], 0.06); }
    return { P, tab, slump, turban, bowTip };
  }
  return null;
}

// ---------- the street world ----------
function ilStreetWorld(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom, R = {};
  const dSchool = t < 10.3 ? 0 : t < 13.34 ? settleTo(t, 10.3, 0, 0.8, 0.5) : t < 29 ? 1 : t < 124.1 ? 0 : Math.min(1, (t - 124.1) / 0.1) * (1 - 0.15 * Math.sin(Math.min(1, (t - 124.2) / 0.3) * Math.PI));
  const dNei = t < 92.55 ? 0 : t < 118 ? settleTo(t, 92.55, 0, 0.9, 0.4) : 0.9;
  marketStreet(ctx, { w: 2400, palette: 'clear', palace: false, houses: IL_HOUSES, doors: [0, dNei, dSchool], stalls: [{ x: 1075, kind: 'fruit', w: 240 }], t, camX });
  // the neighbour's window (live shutters, his head inside)
  const shut = t < 90.72 ? 0 : t < 92.6 ? settleTo(t, 90.72, 0, 1, 0.35) : t < 118 ? 1 : 1;
  const [wx, wy, ww, wh] = IL_NWIN;
  townWindow(ctx, wx, wy, ww, wh, { shutters: shut, col: C.blue, inside: t >= 90.72 && t < 92.7 ? (c) => { const duck = t >= 92.46 ? ((t - 92.46) / 0.1) * 120 : 0, rise = 60 * (1 - ilE(t, 90.85, 0.35));
    const N = ilWho(IL_NEI, { x: 752, y: 752 + rise + duck, dir: -1, gaze: lookAt([752, 560], [470, 780]), brow: -0.4, lid: blink(t, 13) });
    if (t >= 91.8) { N.handR = PERSON_HANDS.cupEar.R; N.tilt = -0.12 * ilE(t, 91.8, 0.3); }
    if (t >= 92.46) { N.eyes = 'wide'; N.mouth = 'o'; N.lid = null; } person(c, N); } : null });
  seg(ctx, wx - 12, wy + wh + 6, wx + ww + 12, wy + wh + 6, 12, '#d9c69a', 4);
  // the woman's doorstep and the mosque
  shape(ctx, K.rectPts(IL_STEP[0], IL_STEP[2], IL_STEP[1] - IL_STEP[0], 900 - IL_STEP[2]), '#d9c69a', { lw: 5, seed: 245, dot: '#a8741a', pitch: 9, rad: 0.18, da: 0.35 });
  // SCHOOL sign
  const signDrop = t < 11.12 ? 0 : K.clamp((t - 11.12) / 0.25) ** 2, signA = swing(t, 11.37, 0.16, 1.2, 1.6) + (t > 122 ? swing(t, 123.6, 0.08, 1.3, 1.5) + swing(t, 124.1, 0.06, 2, 2) : 0) + 0.015 * Math.sin(t * 1.3);
  ilSign(ctx, IL_SIGN[0], IL_SIGN[1], signDrop, signA);
  const L = [];   // draw list: [y, fn]
  if (t >= 11.92 && t < 13.34) {   // S2: the two children peek round the mosque wall (drawn before it)
    { ctx.save(); ctx.beginPath(); ctx.rect(1500, 0, 260, 1230); ctx.clip();   // the two children peek round the mosque wall (clipped at its edge)
      const k = ilE(t, 11.92, 0.3, 'out'); for (const [i, x, kn] of [[1, 1790 - 50 * k, 0], [0, 1784 - 82 * K.clamp((t - 12.0) / 0.3), 0.7]]) {
        const C2 = ilWho(IL_PUP[i], { x, y: 900, dir: -1, sit: kn, seat: 'bench', tip: 0.12, gaze: lookAt([x, 760], [1450, 560]), eyes: 'wide', lid: null, noBlink: true });
        if (t >= 12.6) { C2.gaze = lookAt([x, 760], [1300, 720]); C2.mouth = 'o'; }
        if (i === 1 && t > 12.25 && t < 12.4) C2.eyes = 'shut'; person(ctx, C2); } ctx.restore(); }
  }
  ilMosqueBack(ctx);
  // ---- S1 ----
  if (t < 9.28) {
    const I = ilImpStreet(t);
    ilTablet(ctx, IL_NOTICE[0], IL_NOTICE[1], 2.0, { bands: 4 });
    L.push([880, () => { if (t < 6.78) return; const xf = (u) => kfn(u, [[6.78, 2420], [7.42, 2170], [7.95, 2170], [9.28, 2480]], 'lin'); const B = ilWho(IL_BED, { ...walk(xf, t, { stride: 24 }), y: 880, dir: t < 7.95 ? -1 : 1, gaze: [-1, 0.1] });
      if (t >= 7.2 && t < 7.95) { B.gaze = lookAt([B.x, 700], t < 7.6 ? [1850, 690] : [1960, 700]); B.mouth = 'o'; B.brow = -0.5; B.drop = 6 * (pulse(t, 7.55, 0.2) + pulse(t, 7.75, 0.2)); B.handR = PERSON_HANDS.chest.R; }
      if (t >= 7.95) { B.gaze = [1, 0.1]; B.mouth = 'smile'; } R.bed = ilHead(B); person(ctx, B); }]);
    L.push([900, () => { const P = I.P; if (I.broom) ilBroom(ctx, I.broom[0], I.broom[1]); person(ctx, P); R.imp = ilHead(P); }]);
    if (I.chalk > 0) { ctx.save(); if (t >= 5.5) ctx.globalAlpha *= 1 - ilE(t, 5.55, 0.33); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.lineCap = "round"; ctx.beginPath(); const n = Math.floor(40 * I.chalk), r = K.rng(9); for (let k = 0; k < n; k++) ctx.lineTo(1860 + r() * 50, 680 + r() * 45); ctx.stroke(); ctx.restore(); }
    for (const [ts, fx] of [[0.25, 2040], [0.75, 2050], [1.25, 2035]]) dustBurst(ctx, fx, 896, t - ts, 4, 4, 8, 22, 0.5, Math.round(ts * 10));
  }
  if (t < 9.28) { if (t >= 0.9 && t < 1.7) { const g = (t - 0.9) / 0.8; ilStar(ctx, 2120 + 40 * g, 250 + 30 * g, 26 * Math.sin(Math.PI * g)); } }
  // ---- S2 ----
  if (t >= 9.28 && t < 13.34) {
    const I = ilImpStreet(t);
    L.push([900, () => { person(ctx, I.P); R.imp = ilHead(I.P); if (I.bulb > 0) ilBulb(ctx, R.imp.x + 20, R.imp.y - 92, I.bulb, t); }]);
  }
  // ---- S4 ----
  if (t >= 21.24 && t < 28.7) {
    const I = ilImpStreet(t);
    L.push([920, () => { person(ctx, I.P); const h = ilHead(I.P), hl = ilHead(ilImpStreet(t - 0.1).P); R.imp = h;
      ilTurban(ctx, h.x, h.y, { s: h.s, rot: h.rot, wob: (hl.rot - h.rot) * 0.8 + 0.03 * Math.sin(t * 2.2) - (I.bowTip || 0) - 0.06 * pulse(t, 28.2, 0.3), slump: I.slump, side: -1, feather: 0.12 * Math.sin(t * 2.6) + (hl.x - h.x) * 0.01, glint: (t - 23.4) / 0.6 });
      if (I.tab) ilTablet(ctx, I.P.x + 26, 800, 0.85, { rot: 0.25 }); }]);
    const stop = 22.78, pk = [[700, 1040], [780, 1150]];
    [IL_LADY, IL_BED].forEach((base, i) => { const xf = (u) => kfn(u, [[21.64 + i * 0.1, pk[i][0]], [stop, pk[i][1]]], 'out');
      L.push([893 + i, () => { const P = ilWho(base, { ...walk(xf, t, { stride: 24 }), y: 893 + i, dir: 1, gaze: [1, 0] });
        P.lurch = 0; if (t >= stop) { P.tip = (i === 0 ? -0.05 : -0.03) * ilE(t, stop, 0.2) + lurch(t, stop, 0.04); P.gaze = look(t, [P.x, 700], [[stop, [1450, 900]], [stop + 0.4, [1450, 700]], [stop + 0.8, [1450, 560]]]); P.mouth = 'o'; P.brow = -0.6; }
        if (t >= 25.0) { P.drop = (i === 0 ? 6 * (pulse(t, 25.0, 0.4) + pulse(t, 25.4, 0.4)) : 7 * pulse(t, 25.6, 0.5)); P.mouth = 'smile'; }
        if (i === 1 && t >= 24.32 && t < 26.4) P.handR = PERSON_HANDS.chin.R;
        if (t >= 26.4) { const kid = i === 0 ? 1095 : 1205; P.handRW = [kid + 6, 812]; P.gaze = gazePlan(t, [[26.4, lookAt([0, 0], [0.4, 1])], [26.9, [1, -0.3]]]); if (i === 0 && t >= 26.6 && t < 27.4) { P.handRW = null; P.handR = PERSON_HANDS.pointFwd.R; } }
        if (t >= 27.6) { P.handRW = null; P.handR = null; P.gaze = [1, 0.1]; }
        person(ctx, P); R[i ? 'bed' : 'lady'] = ilHead(P); }]); });
    // the four children: trail the parents (skipping), stop, then go to the door one by one (A eager first, D last, looking back)
    const kidStop = [1315, 1260, 1205, 1095], kidGo = [27.14, 27.3, 27.45, 27.6], kidDur = [0.45, 0.6, 0.7, 1.0];
    for (let i = 0; i < 4; i++) { const xf = (u) => kfn(u, [[21.64 + 0.15 * i, kidStop[i] - 400], [stop + 0.25 + 0.06 * i, kidStop[i]], [kidGo[i], kidStop[i]], [kidGo[i] + kidDur[i] * 1.5, 1590]], 'inOut');
      L.push([912 + i, () => { const W = walk(xf, t, { stride: 16 }), P = ilWho(IL_PUP[i], { ...W, y: 912 + i - Math.abs(Math.sin(W.ph * 0.5)) * 10 * W.amp, dir: 1, gaze: [1, -0.2] });
        if (t >= stop + 0.3) P.gaze = lookAt([P.x, 780], [1450, 640]); if (t >= 24.32 && t < 26.4) P.mouth = 'o';
        if (i === 3 && t >= 27.6) { P.gaze = [-1, -0.3]; P.brow = -0.5; }
        if (P.x > 1585) return; ctx.save(); if (t >= kidGo[i]) { ctx.beginPath(); ctx.rect(0, 0, 1514, 1230); ctx.clip(); } person(ctx, P); ctx.restore(); }]); }
  }
  // ---- S10, S11, S13: the woman's doorstep ----
  if (t >= 86.06 && t < 124.32) ilDoorstep(ctx, t, L, R);
  L.sort((a, b) => a[0] - b[0]); for (const [, f] of L) f();
  if (t >= 86.06 && t < 124.32) ilDoorstepFx(ctx, t, R);
  return R;
}

// ---------- the woman, her children and the neighbour (S10, S11, S13) ----------
const IL_WX = (t) => kfn(t, [[86.06, 1000], [88.25, 470], [121.12, 470], [124.1, 1440]], 'lin');
function ilWomanSt(t) {
  const P = ilWho(IL_WOM, { y: 900, dir: -1, ...walk(IL_WX, t, { stride: 20 }) }); let letter = { s: 0.42, crumple: 1, fold: 0.6, hand: 'L' };
  if (t < 88.25) { P.tip = 0.1; P.lid = 0.7; P.wet = true; P.mouth = 'frown'; P.gaze = [-0.5, 0.6]; P.handL = [-34, -100]; }
  else if (t < 118.08) { P.sit = ilE(t, 88.25, 0.4); P.seat = 'bench'; P.dir = 1; P.amp = 0; P.x = 470;
    P.drop = 10 * P.sit; P.wet = true; P.mouth = 'frown'; P.lid = 0.7; P.gaze = [0.2, 0.7]; P.handL = [-24, -110];
    if (t >= 88.7 && t < 96.32) { P.handL = PERSON_HANDS.cheeks.L; P.handR = [34, -176]; P.lid = 1; P.mouth = 'open'; P.tip = 0.03 * Math.sin(t * 20); P.drop = 14; letter.hidden = true; }
    if (t >= 96.32) { const k = ilE(t, 96.32, 0.4); P.lid = K.lerp(0.5, 0.1, k); P.drop = 14 - 10 * k - 4 * pulse(t, 96.9, 0.25); P.gaze = lookAt([470, 700], [580, 640]); P.mouth = 'o'; P.handL = [-24, -110]; P.handR = null; letter.hidden = false; }
    if (t >= 97.42) { P.gaze = lookAt([470, 700], [640, 420]); P.brow = -1; }
    if (t >= 99.66) { P.brow = K.lerp(-1, -0.2, ilE(t, 99.66, 0.4)); P.mouth = 'o'; P.lid = Math.max(0.1, blink(t, 7)); }
    if (t >= 101.26 && t < 102.4) { P.handR = [26 + 6 * Math.sin(t * 9), -194]; P.gaze = [-0.3, 0.8]; P.brow = -0.4; P.mouth = 'frown'; }
    if (t >= 102.4) { P.gaze = lookAt([470, 700], [585, 760]); P.handR = null; P.mouth = 'closed'; P.lid = Math.max(0, blink(t, 7)); P.brow = -0.3; }
    if (t >= 102.94) letter.hidden = true;
    if (t >= 104.9) { P.handR = PERSON_HANDS.chest.R; P.sq = K.lerp(0.96, 1, ilE(t, 105.0, 0.8)); P.lid = 0.4; P.mouth = t < 105.3 ? 'closed' : 'smile'; P.wet = true; P.gaze = lookAt([470, 700], [585, 760]); }
    if (t >= 105.48) { P.tip = 0.1 * ilE(t, 105.48, 0.4); P.lid = 0; }
    if (t >= 106.2) { P.wet = false; P.mouth = 'smile'; P.lid = Math.max(0.3, blink(t, 7)); P.brow = -0.2; P.tip = 0.06; }
  } else { // S13: stands up in one move, fists on hips, snatches the letter, marches
    P.sit = 1 - ilE(t, 118.18, 0.18); P.seat = 'bench'; P.dir = 1; P.brow = 1; P.mouth = 'frown'; P.wet = false; letter.hidden = true;
    P.sq = anticipate(t, 118.0, 0.15, 0.08) * landSquash(t, 118.5, 0.1); P.y = 900 - hop(t, 118.25, 0.25, 0, 0, 20)[1]; P.lid = Math.max(0.3, blink(t, 7));
    if (t < 121.12) { P.x = 470; P.amp = 0; }
    if (t >= 119.32 && t < 121.1) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = [1, 0]; }
    if (t >= 120.38 && t < 120.62) { P.handRW = [kfn(t, [[120.38, 520], [120.48, 585], [120.62, 520]]), 770]; P.handR = null; if (t >= 120.48) letter = { s: 0.42, hand: 'R', fold: 0 }; }
    if (t >= 120.62) { letter = { s: 0.42, hand: 'R', fold: 0, high: true }; P.handR = null; P.aR = [2.55, 2.85]; }
    if (t >= 121.12) { P.tip = 0.12; P.gaze = [1, 0]; P.handL = [-30, -110 + 8 * Math.sin(t * 9)]; }
  }
  return { P, letter };
}
function ilDoorstep(ctx, t, L, R) {
  const W = ilWomanSt(t);
  L.push([900, () => { person(ctx, W.P); const h = ilHead(W.P); R.wom = h; R.womP = W.P;
    if (!W.letter.hidden) { const hp = ilHandW(W.P, W.letter.hand === 'L' ? 0 : 1); if (hp) ilLetter(ctx, hp[0], hp[1] - (W.letter.high ? 30 : 0), W.letter.s, { crumple: W.letter.crumple || 0, fold: W.letter.fold || 0, rot: W.letter.high ? -0.2 : 0.3 }); } }]);
  // the two children
  for (let i = 0; i < 2; i++) { const st = [342, 284][i];
    const xf = (u) => kfn(u, [[86.6 + 0.2 * i, 1080 + 60 * i], [88.6 + 0.4 * i, st], [121.9 + 0.15 * i, st], [124.3, 1180 - 80 * i]], 'lin');
    L.push([905 + i, () => { const Wk = walk(xf, t, { stride: 14 }), P = ilWho(IL_KID[i], { ...Wk, y: 905, dir: -1, gaze: lookAt([0, 0], [-0.3, -1]), brow: -0.6 });
      if (t >= 88.6 + 0.4 * i) { P.dir = 1; P.gaze = lookAt([P.x, 800], [470, 720]); }
      // hops of joy (104.86): anticipation, 28 px up, arms up, squash on landing; staggered 0.2 s, each on its own spot beside the mother
      const h0 = 104.98 + 0.2 * i, hp = hop(t, h0, 0.34, 0, 0, 28)[1]; P.y = 905 - hp; P.sq = anticipate(t, h0 - 0.14, 0.14, 0.1) * landSquash(t, h0 + 0.34, 0.14);
      if (t >= h0 - 0.05 && t < h0 + 0.9) { P.aL = [-2.5, -2.9]; P.aR = [2.5, 2.9]; P.mouth = 'open'; }
      const cry = t >= 89.8 + 0.35 * i && t < 97.42 + 0.4 * i; if (cry) { P.eyes = 'shut'; P.mouth = 'open'; P.tilt = -0.15; P.lid = null; }
      if (t >= 97.42 + 0.4 * i && t < 104.86) { P.gaze = lookAt([P.x, 790], [640, 420]); P.mouth = 'o'; }
      if (t >= 104.86 && t < 118.08) { P.gaze = lookAt([P.x, 740], [585, 760]); if (t >= 104.98 + 0.2 * i + 0.9) P.mouth = 'smile'; }
      if (t >= 118.7) { P.eyes = 'wide'; P.gaze = lookAt([P.x, 760], [470, 700]); P.y += 0; P.x -= 12 * ilE(t, 118.7, 0.2); }
      if (t >= 121.9) { P.dir = 1; P.gaze = [1, 0]; P.eyes = null; P.mouth = 'o'; if (i === 1) P.y -= hop(t, 122.6, 0.3, 0, 0, 16)[1]; }
      person(ctx, P); R['kid' + i] = ilHead(P); }]); }
  // the neighbour comes out (92.98) and reads (103.62)
  if (t >= 92.6) { const xf = (u) => kfn(u, [[92.98, 852], [93.75, 600]], 'out');
    L.push([903, () => { const P = ilWho(IL_NEI, { ...walk(xf, t, { stride: 22 }), y: 903, dir: -1, gaze: lookAt([600, 700], [470, 740]), brow: -0.3 }); let note = null, page = null, finger = null;
      if (t < 92.98) P.alpha = K.clamp((t - 92.6) / 0.3);
      if (t >= 93.5 && t < 94.94) { P.tip = 0.08 * ilE(t, 93.5, 0.3); P.handL = [-50, -100 + 10 * Math.sin(t * 8)]; P.handR = [50, -100 + 10 * Math.sin(t * 8 + 1)]; }
      if (t >= 94.08) { P.talk = talk(t, [[94.08, 94.9], [95.1, 99.6], [99.9, 102.0]]); P.look = 0.8 * Math.sin((t - 94.08) * 7) * (t < 95.0 ? 1 : 0); if (!P.talk) P.mouth = 'smile'; }
      if (t >= 94.94 && t < 102.02) { P.tip = 0; P.handL = null; P.handR = [36, -206]; note = ilW(P, [44, -236]); P.brow = -0.3; }
      if (t >= 102.02) { P.handR = PERSON_HANDS.reach.R; P.gaze = lookAt([600, 700], [500, 770]); }
      if (t >= 102.94) { P.handR = [56, -150]; page = ilW(P, [62, -172]); P.gaze = lookAt([600, 710], page); }
      if (t >= 103.62 && t < 118.08) { const rd = K.clamp((t - 103.62) / 2.4); P.handL = [44 - 30 * ((rd * 6) % 1), -168 + 12 * Math.floor(rd * 6) * 0.35]; finger = true; P.gaze = lookAt([600, 708], [page[0] + 18 - 36 * ((rd * 6) % 1), page[1]]); P.talk = talk(t, [[103.62, 106.2]]); if (t >= 105.48 && t < 105.9) P.gaze = lookAt([600, 700], [470, 690]); }
      if (t >= 118.08) { finger = false; P.handL = null; P.tip = -0.1 * ilE(t, 118.7, 0.2); P.gaze = lookAt([600, 700], [470, 700]); P.eyes = t < 119.3 ? 'wide' : null; }
      if (t >= 120.48) { page = null; P.handR = [56, -150]; P.lid = pulse(t, 120.6, 0.2); }
      if (t >= 121.9) { P.handR = [64 + 12 * Math.sin(t * 12), -196]; P.mouth = 'smile'; P.gaze = [1, 0]; P.tip = 0; }
      person(ctx, P); R.nei = ilHead(P);
      if (note) { ilLetter(ctx, note[0], note[1], 0.45, {}); R.note = note; }
      if (page) { const rd = t >= 103.62 ? K.clamp((t - 103.62) / 2.4) : 0; ilLetter(ctx, page[0], page[1], 0.55, { read: rd, crumple: 0.4 * (1 - ilE(t, 103.0, 0.5)) }); R.page = page; } }]); }
  // the hand-over 102.94: the page flies from her fist to his hand (0.25 s, weight dip on arrival)
  if (t >= 102.94 && t < 103.2) L.push([950, () => { const u = ilE(t, 102.94, 0.25), a = [478, 800], b = [592, 732], p = ilLp(a, b, u); ilLetter(ctx, p[0], p[1] - 22 * Math.sin(Math.PI * u), K.lerp(0.42, 0.55, u), { crumple: 1 - u * 0.6, fold: 0.6 * (1 - u) }); }]);
}
// world position of a person's hand (0 = left, 1 = right) from P.hands (filled by person()); costumed figure, standing or seated
function ilHandW(P, i) { const wt = i ? P.handRW : P.handLW; if (wt) return wt; const ang = i ? P.aR : P.aL, sd = i ? 1 : -1;
  let h = i ? P.handR : P.handL; if (!h && ang) { const e1 = [sd * 31 + Math.sin(ang[0]) * 38, -132 + Math.cos(ang[0]) * 38]; h = [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36]; }
  if (!h && P.hands) h = P.hands[i]; if (!h) h = [sd * 34, -60]; const sit = K.clamp(P.sit || 0), off = sit > 0 ? (P.seat === 'floor' ? [0, 51 * sit] : [-22 * sit, 23 * sit]) : [0, 0];
  return ilW(P, [h[0] + off[0], h[1] + off[1]]); }
// effects after the cast: tears, WAAH arcs, sound arcs to the neighbour's window, steam, march dust
function ilDoorstepFx(ctx, t, R) {
  const eye = (k) => (u) => { const h = R[k]; return h ? [h.x - h.r * 0.3, h.y] : [470, 700]; };
  if (R.wom) { teardrops(ctx, t, 86.3, 88.25, (u) => [R.wom.x - 10, R.wom.y + 2], { groundY: 898, rate: 1.8 }); teardrops(ctx, t, 88.8, 96.3, (u) => [R.wom.x + 26, R.wom.y + 20], { groundY: 850, rate: 2.5, vx: 40 }); }
  for (let i = 0; i < 2; i++) if (R['kid' + i]) teardrops(ctx, t, 89.9 + 0.35 * i, 97.4 + 0.4 * i, (u) => [R['kid' + i].x + 12, R['kid' + i].y], { groundY: 898, rate: 3, vx: 30 });
  if (t >= 91.8 && t < 92.6) for (let k = 0; k < 3; k++) { const u = ((t - 91.8) * 1.4 + k / 3) % 1, p = ilLp([520, 700], [700, 570], u); ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * u); soundArcs(ctx, p[0], p[1], 1, t, C.white); ctx.restore(); }
  if (t >= 118.7 && t < 119.9 && R.wom) for (const [sd, d] of [[-1, 0], [1, 0.25]]) dustBurst(ctx, R.wom.x + sd * 40, R.wom.y - 40, t - 118.7 - d, 5, 8, 14, 50, 0.8, 7 + d * 10);
  if (t >= 121.12 && t < 124.32) { for (const f of IL_MARCH) dustBurst(ctx, f.x + 10, 898, t - f.t, 4, 5, 10, 26, 0.5, Math.round(f.t * 10)); }
}
const IL_MARCH = footfalls(IL_WX, 121.12, 124.1, 20);
