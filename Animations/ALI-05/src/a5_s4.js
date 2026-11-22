// ===== ALI-05 shots S9, S10, S16: the street at late dusk (the neighbours, TELL THE GUARDS. QUIETLY!), the courtyard (the bar, her
// smile), and the last scene in the courtyard (the run, ONE MOMENT, SIR!, YOU FORGOT YOUR GIFT!, the stop, the turn, the helmets,
// TO BE CONTINUED...) =====
// ---------- S9 69-78.3: the street ----------
const A5_MX9 = (u) => kfn(u, [[69.0, 930], [69.9, 930], [70.3, 920], [71.2, 745], [71.9, 745], [72.6, 570], [77.9, 570], [78.3, 650]]);
function a5Morg9(t) { const tc = AB_T2(t), W = walk(A5_MX9, tc, { stride: 15 }), P = { ...a5Base(t, 701), y: 915, ...W, dir: -1, mouth: 'smile', gaze: [-1, 0], handL: [24, -126], handR: [34, -130] }, o = { stream: 0, kick: 0 };
  if (tc < 70.3) { P.gaze = gazePlan(tc, [[69.3, [-1, 0]], [69.6, [1, 0]], [69.9, [-1, 0.1]]], 0.08); P.look = tc > 69.6 && tc < 69.9 ? 0.6 : -0.4; if (tc > 69.5 && tc < 70.0) { P.handR = PERSON_HANDS.hush.R; P.dir = 1; P.gaze = [1, 0.6]; } }
  else if (tc < 71.2) { P.drop = 10; P.tip = 0.12; P.amp = Math.min(1, W.amp * 1.3); o.stream = 0.8; P.mouth = 'closed'; }
  else if (tc < 71.9) { P.sq *= landSquash(tc, 71.2, 0.1); P.tip = -0.05 * (1 - beatIn(tc, 71.2, 71.4)); o.kick = 0.6 * swing(tc, 71.2, 1, 1.6, 3); if (tc > 71.62) { P.dir = 1; P.handRW = [712 + 8 * (Math.floor((tc - 71.62) * 8) % 2), 760]; P.gaze = [1, 0]; } }
  else if (tc < 72.6) { P.handR = [-60, -170 + 10 * Math.sin(tc * 16)]; P.drop = 6; }
  else { P.dir = tc < 74.6 ? -1 : 1; P.gaze = tc < 74.6 ? [-1, 0] : [1, 0]; if (tc >= 74.6 && tc < 75.9) { P.handR = PERSON_HANDS.mouthCover.R; P.tip = 0.08; P.talk = abTalk(t, 74.68, 75.8, 3, 0.4); } if (tc >= 75.9 && tc < 77.26) { P.dir = -1; P.gaze = [-1, 0]; P.handR = [60, -160]; } if (tc >= 77.26 && tc < 77.9) { P.handR = PERSON_HANDS.hush.R; P.dir = -1; } if (tc >= 77.9) { P.dir = 1; P.drop = 8; P.tip = 0.08; P.lid = abBlinkAt(AB_T3(t), 77.9) > 0 ? 1 : P.lid; } }
  return { P, o }; }
function a5S9World(ctx, t, cam) {
  const tc = AB_T2(t), d3 = kfn(tc, [[69.0, 0], [69.4, 0.35], [69.8, 0.35], [70.1, 0]]), d2 = kfn(tc, [[72.3, 0], [72.6, 1]]), d1 = kfn(tc, [[72.4, 0], [72.7, 1]]), M = a5Morg9(t);
  const inD3 = tc < 69.6;
  a3Street(ctx, t, cam, { m: 'evening', m2: 'night', k: 0.35, lan: 1, washing: { empty: true }, marks: { tm: 0 }, bodies: (c) => tsMoon(c, 1350, 300, 0.7),
    doors: [{ i: 3, open: d3, lit: 1, inside: inD3 ? (c) => morgiana(c, t, M.P, A5_EV, { shc: A5_ESH }) : null }, { i: 2, open: d2, lit: 1 }, { i: 1, open: d1, lit: 1 }], win: { sh: 0.5, lit: 0.8 } });
  // the cat between the doors: watches, gets the hush, licks a paw across its mouth at 77.26
  a5Cat(ctx, t, { x: 840, y: 905, dir: -1, gaze: tc < 69.6 ? [1, -0.3] : [-1, -0.1], lick: a5Win(tc, 77.3, 77.9, 0.1, 0.1), raise: a5Win(tc, 77.3, 77.9, 0.1, 0.1) }, A5_ESH);
  const L = [];
  // the old neighbour (plum door 2) with her broom; the baker (green door 1) and his apprentice
  if (tc > 72.3) { const nx = kfn(tc, [[72.4, 660], [73.0, 700]]), N = { ...a5Base(t, 711), x: nx, y: 915, dir: -1, mouth: tc > 72.9 ? 'grin' : 'o', gaze: [-1, 0], handL: [-26, -104], handR: tc > 73.0 && tc < 74.4 ? [40, -200] : [26, -104] };
    if (tc >= 74.6 && tc < 75.9) { N.tip = -0.1; N.gaze = [-1, 0.1]; } if (tc >= 77.41 && tc < 77.9) N.handR = PERSON_HANDS.hush.R;
    L.push({ y: 915, d: () => a3Neighbour(ctx, t, N, A5_EV, { broom: tc > 73.0 && tc < 74.4 ? 30 : 0, lift: tc > 73.0 && tc < 74.4 ? 0.8 : 0, shc: A5_ESH }) }); }
  if (tc > 72.4) { const B = { ...a5Base(t, 721), x: kfn(tc, [[72.5, 370], [73.0, 400]]), y: 915, dir: 1, mouth: 'grin', gaze: [1, 0], handL: [-26, -104], handR: [40, -130] };
    if (tc > 73.0 && tc < 74.4) { B.handR = [40, -150 + 20 * Math.abs(Math.sin((tc - 73) * 9))]; B.handL = [30, -132]; } if (tc >= 74.6 && tc < 75.9) { B.tip = 0.1; B.gaze = [1, 0.1]; } if (tc >= 77.56 && tc < 78.1) B.handL = PERSON_HANDS.hush.R.map((v, i) => (i ? v : -v));
    L.push({ y: 914, d: () => baker(ctx, t, B, A5_EV, { pin: 1, pinRot: -0.4, shc: A5_ESH }) });
    const bxf = (u) => kfn(u, [[72.6, 380], [73.0, 470], [76.6, 470], [77.4, -120]]), Y = { ...a5Base(t, 731), y: 917, ...walk(bxf, tc, { stride: 16 }), dir: 1, mouth: 'grin', gaze: [1, 0], handL: [-20, -100], handR: [24, -104] };
    let pan = true; if (tc > 73.0 && tc < 74.4) Y.handR = [30, -200]; if (tc >= 74.6 && tc < 75.9) { Y.tip = 0.08; Y.gaze = [1, 0.1]; } if (tc >= 76.48 && tc < 76.7) { Y.tilt = 0.12 * Math.sin((tc - 76.48) * 50); Y.handR = [60, -130]; } if (tc >= 76.6) { pan = false; Y.dir = -1; Object.assign(Y, sneakChain(bxf, 0, tc, { stride: 18, dir: -1 })); Y.dir = -1; Y.y = 917; }
    if (Y.x > 60) L.push({ y: 917, d: () => a3ArchFig(ctx, Y.x, Y.y, (c) => apprentice(c, t, Y, A5_EV, { pan, shc: A5_ESH })) }); }
  L.push({ y: 915.5, d: () => { if (!inD3) morgiana(ctx, t, M.P, A5_EV, { shc: A5_ESH, ...M.o }); const [hx, hy] = a2Hand(M.P, 0, A3_MORG); if (!inD3) abBlob(ctx, hx, hy + 18, 18, 24, '#c8743a', '#8a4a1e', { lw: 2.5 }); } });
  for (const q of abByY(L)) q.d();
}
function a5S9Over(ctx, t, cam, S) {
  const M = a5Morg9(t).P, [mx, my] = abP(...a2HeadPt(M, 0, 10, A3_MORG), cam);
  if (t > 71.6 && t < 72.4) for (let k = 0; k < 3; k++) { const [kx, ky] = abP(712, 760, cam); a2Tag(ctx, S, 'tok', kx + 30, ky - 40 - k * 34, t, 71.62 + k * 0.16, 72.2, { size: 30 }); }
  if (t > 74.6 && t < 76.2) a5Say(ctx, S, [[74.68, 'TELL THE GUARDS. QUIETLY!']], t, mx - 20, my - 220, [mx, my - 40], { size: 44, gone: 75.9 });
  if (t > 75.8 && t < 77.0) { const p = K.clamp((t - 75.8) / 0.3) * (1 - K.clamp((t - 76.7) / 0.25)); a3PicBalloon(ctx, mx - 10, my - 380, 260, 160, [mx, my - 40], p, (c) => { a5Helmet(c, mx - 70, my - 370, 1.3, { face: 0, glint: t > 75.9 && t < 76.4 ? (t - 75.9) / 0.5 : 0 }); if (t > 76.05) silverRing(c, mx + 60, my - 370, 26, { glint: (t * 2) % 1 }); }); }
  if (t > 76.48 && t < 77.2) a2Tag(ctx, S, 'NOD NOD!', ...abP(470, 640, cam), t, 76.48, 77.0, { size: 34 });
}
AB_SHOTS.push({ a: 69.0, b: 78.3, ww: 2000, cam: a5Cam([[69, { x: 880, y: 587, zoom: 1.3 }], [70.3, { x: 880, y: 587, zoom: 1.3 }], [71.6, { x: 600, y: 587, zoom: 1.3 }], [77.9, { x: 590, y: 587, zoom: 1.3 }], [78.3, { x: 660, y: 587, zoom: 1.3 }]]), world: a5S9World, over: a5S9Over, noClues: true });

// ---------- S10 78.3-80.6: the courtyard; in by the gate, the bar lowered, the smile put on ----------
const A5_MX10 = (u) => kfn(u, [[78.3, 735], [78.7, 680], [79.92, 680], [80.6, 540]]);
function a5S10World(ctx, t, cam) {
  const tc = AB_T2(t), gopen = kfn(tc, [[78.3, 0.4], [78.6, 0.4], [79.0, 0]]), bar = tc < 79.36 ? 0 : beatIn(tc, 79.36, 79.6), M = { ...a5Base(t, 751), y: 908, ...walk(A5_MX10, tc, { stride: 15 }), dir: -1, mouth: 'closed', gaze: [-1, 0], handL: [24, -126], handR: [34, -130] };
  if (tc >= 78.7 && tc < 79.92) { M.dir = 1; M.gaze = [1, 0]; if (tc < 79.0) M.handRW = [730, 760]; else if (tc < 79.36) { M.handLW = [700, 728]; M.handRW = [760, 728]; } else if (tc < 79.75) { M.handLW = [690, 728 + 52 * beatIn(tc, 79.36, 79.6)]; M.handRW = [770, 728 + 52 * beatIn(tc, 79.36, 79.6)]; } else M.handRW = [720, 776 - 6 * Math.abs(Math.sin((tc - 79.75) * 20))]; }
  if (tc >= 79.92) { const st = Math.min(2, Math.floor((tc - 79.92) / 0.09)); M.mouth = ['closed', 'smile', 'smile'][st]; M.lid = [0.2, 0.3, 0.35][st]; M.sq *= [1, 0.99, 0.98][st]; M.brow = [0.3, 0, -0.2][st]; M.dir = -1; M.gaze = [-1, 0]; M.tilt = 0.06 * st / 2; }
  courtyard(ctx, t, cam, { m: 'night', moon: [1000, 170], K: { open: tc > 80.2 ? beatIn(tc, 80.2, 80.5) : 0, lit: 0.9 }, gate: { open: gopen, bar, inside: tc < 78.62 ? (c) => morgiana(c, t, M, 'night', { shc: A5_NSH }) : null }, bwin: 0.6 });
  for (let i = 0; i < 3; i++) oilJar(ctx, 890 + 115 * i, CY.jarY, CY.jarS, {});
  a5Cat(ctx, t, { x: 960, y: CY.wall.top - 2, gy: CY.wall.top - 2, dir: -1, gaze: tc > 79.4 ? [-1, 0.8] : [-1, 0.3] }, 'rgba(43,26,58,0.3)');
  if (tc >= 78.62) morgiana(ctx, t, M, 'night', { shc: A5_NSH }); const [hx, hy] = a2Hand(M, 0, A3_MORG); if (tc >= 78.62 && tc < 78.9 || tc > 80.0) abBlob(ctx, hx, hy + 18, 18, 24, '#c8743a', '#8a4a1e', { lw: 2.5 });
}
AB_SHOTS.push({ a: 78.3, b: 80.6, ww: 2200, cam: a5Cam([[78.3, { x: 640, y: 587, zoom: 1.3 }], [80.6, { x: 610, y: 587, zoom: 1.3 }]]), world: a5S10World, noClues: true });

// ---------- S16 122.6-137.82: the run, the call, the stop, the turn, the helmets, TO BE CONTINUED... ----------
const A5_GX16 = (u) => kfn(u, [[122.6, 170], [122.86, 200], [124.4, 440], [126.9, 470], [127.18, 474], [128.9, 474], [130.4, 505]], 'lin');
function a5Guest16(t) {
  const tc = AB_T2(t), W = walk(A5_GX16, tc, { stride: tc < 124.4 ? 40 : 18 }), P = { ...a5Base(t, 801), y: 908, dir: 1, ...W, mouth: 'o', brow: -0.5, lid: 0.1, gaze: [1, 0], handL: [-50, -140], handR: [60, -150] }, o = { fine: 1, stream: 0, kick: 0, cuffR: tc > 130.9 ? 0 : 1, ring: tc > 132.8 && tc < 133.4 ? (tc - 132.8) / 0.6 : 0, feather: lagged((u) => 0.5 * walk(A5_GX16, u).amp, tc, 0.25, 1) };
  if (tc < 124.4) { P.tip = 0.14; P.amp = 1; o.stream = 1; P.sq = 1.03; if (tc > 124.0) P.handRW = [640, 760]; }
  else if (tc < 127.18) { P.tip = 0.08; P.drop = 8; P.amp = Math.min(1, W.amp * 1.4); P.handRW = [600, 770]; P.handL = [-30, -140]; P.mouth = 'closed'; P.gaze = tc > 125.8 ? [-1, 0] : [1, 0]; P.look = tc > 125.8 ? -0.3 : 0.2; o.kick = 0.3; }
  else if (tc < 128.9) { P.ph = 1.2; P.amp = 1; P.drop = 8; P.tip = 0.06 + 0.01 * Math.sin(tc * 3); P.handRW = [598, 770]; P.handL = [-34, -150]; P.lid = tc < 127.5 ? 0 : 0.1; P.mouth = 'closed'; P.gaze = [-1, -0.05]; P.look = -0.2; o.feather = 0.2 * Math.sin(tc * 4); }
  else if (tc < 130.4) { P.tip = 0.16; P.amp = 1; o.stream = 0.7; P.handRW = [K.lerp(600, 596, beatIn(tc, 129.8, 130.4)), 770]; P.mouth = 'closed'; P.brow = 0.8; P.lid = 0.3; P.gaze = [1, 0]; }
  else if (tc < 131.82) { P.amp = 0; P.tip = 0.16 * (1 - beatIn(tc, 130.4, 130.8)) + 0.04; P.sq *= landSquash(tc, 130.45, 0.08); o.kick = 1.2 * swing(tc, 130.5, 1, 1.4, 2.5); P.handRW = [596, 770 + 4 * beatIn(tc, 131.0, 131.4)]; P.mouth = 'closed'; P.brow = 0.85; P.lid = 0.35; P.gaze = [1, 0.1]; P.sq *= 1 + 0.015 * Math.sin(Math.PI * beatIn(tc, 131.1, 131.6));
    o.curl = beatIn(tc, 131.0, 131.6); }
  else { const u = tc - 131.82; P.amp = 0; P.gaze = u < 0.15 ? [1, 0] : [-1, 0]; P.lid = Math.max(abBlinkAt(AB_T3(t), 132.0), 0.35); P.dir = u < 0.3 ? 1 : -1; P.tip = K.lerp(0.12, -0.04, K.ease.inOut(K.clamp(u / 0.6))) * (u < 0.3 ? 1 : -1) + idleSway(tc, 811, 0.015, 3);
    P.x = 505 - 6 * K.clamp(u / 0.5); const st = Math.min(3, Math.floor(Math.max(0, u - 0.4) / 0.18)); P.mouth = ['closed', 'closed', 'smile', 'grin'][st]; P.brow = [0.85, 0.6, 0.2, -0.2][st]; P.handR = [24, -104 + (tc > 134.6 && tc < 135.0 ? 4 * (Math.floor(tc * 12) % 2) : 0)]; P.handL = PERSON_HANDS.clasp.L; if (st >= 3) { P.lid = Math.max(P.lid, 0.45); P.handR = PERSON_HANDS.clasp.R; } }
  return { P, o };
}
function a5Morg16(t) { const tc = AB_T2(t), P = { ...a5Base(t, 821), x: 170, y: tc < 126.0 ? 900 : kfn(tc, [[126.0, 900], [126.4, 916]]), dir: 1, mouth: 'smile', gaze: [1, 0], lid: Math.max(0.15, abLid(t, 821)), handL: [-24, -104], handR: [34, -170] };
  P.talk = abTalk(t, 126.76, 127.8, 13, 0.5) || abTalk(t, 128.56, 129.3, 14, 0.5); if (P.talk) P.mouth = 'open';
  if (tc > 127.9 && tc < 128.4) P.tip = 0.08 * Math.sin(Math.PI * beatIn(tc, 127.9, 128.4)); if (tc > 129.3) { P.handR = [40, -215]; } return P; }
function a5S16World(ctx, t, cam) {
  const tc = AB_T2(t), G = a5Guest16(t), M = a5Morg16(t), inDoor = tc < 126.2, kop = kfn(tc, [[122.6, 0], [122.75, 1]]);
  const inside = (c) => { if (tc >= 133.3) { const up = beatIn(tc, 133.3, 133.7); abNephew(c, t, { ...a5Base(t, 841), x: 220, y: 892 + 40 * (1 - up), dir: -1, gaze: [1, 0], mouth: 'o', handL: [-20, -104], handR: [20, -106] }, 'night', { shadow: false }); a2Ali(c, { ...a5Base(t, 831), x: 130, y: 892 + 40 * (1 - beatIn(tc, 133.45, 133.85)), dir: 1, gaze: [1, 0], mouth: 'o', brow: -0.6, handL: [-26, -104], handR: [26, -104] }, 'night', { shadow: false }); }
    if (tc < 122.86) abNewMerchant(c, t, { ...G.P, x: 170 + 120 * beatIn(tc, 122.6, 122.86) }, 'night', { ...G.o, shadow: false });
    if (inDoor && tc >= 124.6) { const k = beatIn(tc, 124.6, 124.9); c.save(); c.globalAlpha *= k; morgiana(c, t, M, 'night', { shadow: false }); const [hx, hy] = a2Hand(M, 1, A3_MORG); giftBox(c, hx, hy - 4, 1.6); c.restore(); } };
  courtyard(ctx, t, cam, { m: 'night', moon: [1000, 170], K: { open: kop, lit: 1, inside }, gate: { open: 0, bar: 1 }, bwin: 0.7 });
  // the helmets rise behind the wall coping (133.3), clipped above it
  if (tc > 133.2) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 2200, CY.wall.top - 2); ctx.clip(); [[690, 0], [770, 0.12], [850, 0.24], [940, 0.4]].forEach(([x, dl], i) => { const up = beatIn(tc, 133.3 + dl, 133.8 + dl); a5Helmet(ctx, x, CY.wall.top + 40 - 64 * up + 3 * Math.sin(tc * 2 + i), 1, { plume: i === 3, pl: Math.sin(tc * 3 + 1), face: 1 }); }); ctx.restore(); }
  gateBar(ctx, CY.gate.cx, CY.gate.bar, { down: 1 }); if (tc > 130.3 && tc < 131.6) abGlow(ctx, CY.gate.cx - 60, CY.gate.bar, 90, 0.5 * a5Win(tc, 130.3, 131.6, 0.15, 0.4), '#ffe9a0');
  for (let i = 0; i < 3; i++) oilJar(ctx, 890 + 115 * i, CY.jarY, CY.jarS, {});
  a5Cat(ctx, t, { x: 1080, y: CY.wall.top - 2, gy: CY.wall.top - 2, dir: -1, gaze: tc > 130 ? [-1, 0.7] : [-1, 0.4] }, 'rgba(43,26,58,0.3)');
  // his long shadow toward her (the door light) once he stops
  if (tc > 130.4) { ctx.save(); ctx.globalAlpha = 0.28 * beatIn(tc, 130.4, 131.0); ctx.fillStyle = '#3a2a6a'; ctx.beginPath(); ctx.moveTo(G.P.x - 30, 906); ctx.lineTo(G.P.x + 30, 906); ctx.lineTo(260, 990); ctx.lineTo(200, 960); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if (tc >= 130.4 && tc < 131.0) abDust(ctx, G.P.x + 20, 912, 180, 60, t, 0.7 * (1 - beatIn(tc, 130.4, 131.0)), '#b8b0d8');
  if (!inDoor) { morgiana(ctx, t, M, 'night', { shc: A5_NSH }); const [hx, hy] = a2Hand(M, 1, A3_MORG); giftBox(ctx, hx, hy - 4, 1.6, { glint: tc > 129.3 && tc < 129.9 ? (tc - 129.3) / 0.6 : tc > 134 ? ((tc - 134) * 0.4) % 1 : 0 }); abGlow(ctx, M.x, 760, 140, 0.25, '#ffcf7a'); }
  if (tc >= 122.86) abNewMerchant(ctx, t, G.P, 'night', { ...G.o, shc: A5_NSH });
}
function a5S16Over(ctx, t, cam, S) {
  const M = a5Morg16(t), [mx, my] = abP(...a2HeadPt(M, 0, 10, A3_MORG), cam);
  if (t > 126.7 && t < 128.3) a5Say(ctx, S, [[126.76, 'ONE MOMENT, SIR!']], t, mx + 120, my - 220, [mx, my - 40], { size: 50, gone: 128.0 });
  if (t > 128.5 && t < 130.4) a5Say(ctx, S, [[128.56, 'YOU FORGOT YOUR GIFT!']], t, mx + 140, my - 220, [mx, my - 40], { size: 50, gone: 130.1 });
  if (t > 130.4 && t < 131.2) { const [gx, gy] = abP(520, 900, cam); a2Tag(ctx, S, 'SKID!', gx + 60, gy - 40, t, 130.45, 131.0, { size: 38 }); }
  if (t > 133.5) { const off = t < 134.0 ? [1, 0, 1, 1, 0, 1][Math.min(5, Math.floor((t - 133.5) * 12))] : 1; if (off) S.title(ctx, 'TO BE CONTINUED...', 500, 200, K.clamp((t - 133.5) / 0.6), { size: 68, align: 'center' }); if (t > 133.7 && t < 134.4) abGlint(ctx, 820, 160, 40, (t - 133.7) / 0.7); }
}
AB_SHOTS.push({ a: 122.6, b: AB_DUR + 1, ww: 2200, cam: a5Cam([[122.6, { x: 400, y: 588, zoom: 1.25 }], [123.4, { x: 420, y: 588, zoom: 1.25 }], [124.2, { x: 530, y: 588, zoom: 1.25 }], [133.0, { x: 540, y: 588, zoom: 1.25 }], [AB_DUR, { x: 510, y: 588, zoom: 1.25 }]]), world: a5S16World, over: a5S16Over, noClues: true });
