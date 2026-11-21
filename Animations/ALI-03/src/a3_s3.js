// ===== ALI-03 shots S8-S10 (64.4 - 86.3 s): day to night, the sneak chain, the reveal pan, WHICH DOOR?!, the withdrawal =====
const A3_N = 'night', A3_NRIM = { rim: '#bfe0ff', light: [1, -1], rimW: 3 }, A3_WRIM = { rim: '#ffc070', light: [-1, -0.4], rimW: 3.5 };
const A3_CHAIN_X = (u) => u < 68.9 ? K.lerp(-40, 370, (u - 66.5) / 2.4) : 370 + 30 * K.ease.out(K.clamp((u - 68.9) / 0.3));
const A3_CHAIN = [{ who: 'spy' }, { who: 'leader' }, { who: 0 }, { who: 2 }, { who: 4 }];
const A3_REVEAL_X = (t) => flow(K.clamp(t, 70.2, 73.85), [[70.2, 520], [71.4, 760], [72.4, 1030], [73.2, 1420], [73.85, 1500]]);

// ---------- S8a 64.4-66.5: the time-lapse in one framing ----------
function a3TLWorld(ctx, t, cam) {
  const tc = AB_T2(t), D = dayToNight(beatIn(t, 64.5, 66.4)), items = 4 - Math.floor(beatIn(tc, 64.85, 65.4) * 4.99);
  const gate = kfn(tc, [[65.05, 0], [65.25, 0.8], [65.55, 0.8], [65.75, 0]]), dx = kfn(tc, [[65.2, 1290], [65.6, 1330]]);
  a3Street(ctx, t, cam, { m: 'day', m2: A3_N, k: D.k, bodies: (c) => { tsSun(c, 1250, D.sunY, D.sunK); tsMoon(c, 1350, D.moonY, D.moonK); }, washing: { items }, lan: D.lan,
    win: { sh: 1 - beatIn(tc, 65.85, 66.1), lit: D.k > 0.6 ? 0.6 : 0, inside: tc > 64.7 && tc < 65.5 ? (c) => morgianaWindow(c, t, { x: 1080, gaze: [-1, -0.6], handLW: [1040, 470], handRW: [1070, 500] }, 'morning') : null },
    gate, gateIn: tc > 65.25 && tc < 65.75 ? (c) => abDonkey(c, { x: dx, y: 905, s: 0.82, dir: 1, pal: 0, ph: dx / 20, amp: 0.6 }, 'morning') : null });
  if (tc < 65.25) { a3Shadow(ctx, 1290, 905, 230); abDonkey(ctx, { x: 1290, y: 905, s: 0.82, dir: -1, pal: 0, chew: Math.abs(Math.sin(tc * 6)), earL: 0.5, earR: 0.4, tailSwish: osc(tc, 1.6), lid: abLid(t, 103) }, 'morning'); }
  a3Cat(ctx, t, { x: 1000, y: 242, dir: -1, sit: 1, lid: tc > 65.8 ? 1 : abLid(t, 95), tailCurl: 1 });
  a3Neighbour(ctx, t, { x: 600 - 80 * beatIn(tc, 64.6, 65.2), y: 905, dir: 1, ...walk((u) => 600 - 80 * beatIn(u, 64.6, 65.2), tc, { stride: 20 }), gaze: [1, -0.4], mouth: 'closed' }, 'morning', { broom: 0, shadow: true });
}

// ---------- S8b 66.5-73.9: the chain sneaks in; THIS ONE!; the reveal pan with the counter ----------
function a3ChainPose(k, t) {
  const tc = AB_T2(t), C = sneakChain(A3_CHAIN_X, k, tc, { gap: 80, delay: 0.3, stride: 15, stop: 69.15 }), P = { y: 905, dir: 1, ...C, lid: abLid(t, 200 + k), gaze: [1, -0.1], mouth: 'closed' };
  if (k === 0 && tc < 69.2) { P.handL = [-60, -150 + 8 * osc(tc, 0.3)]; P.mouth = 'smile'; }
  if (tc > 68.75 && tc < 69.05) { P.sq *= 0.9; P.drop = 14; }
  return P;
}
function a3DimOverlay(ctx, a) { if (a > 0.01) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#1a1840'; ctx.globalCompositeOperation = 'multiply'; ctx.fillRect(-200, 0, 2400, 1230); ctx.restore(); } }
function a3NightGroupWorld(ctx, t, cam) {
  const tc = AB_T2(t), bright = beatIn(t, 68.7, 69.2), rev = t > 70.15, rx = A3_REVEAL_X(t);
  a3Street(ctx, t, cam, { m: A3_N, lan: 1, bodies: (c) => { tsMoon(c, 1350, 230); const cx = K.lerp(1350, 1640, bright); abCloud(c, cx, 236, 300, 90, '#6a6aa8', '#c8b8e8', 4); },
    underCast: (c) => a3DimOverlay(c, 0.28 * (1 - bright)),
    marks: { glow: 0.2 + 0.35 * bright, flare: (M) => M.kind === 'x' && rev ? Math.exp(-Math.pow((tsDoor(M.door).mark[0] - rx) / 230, 2)) : 0 } });
  tsMoth(ctx, t, 3); tsMoth(ctx, t + 1.7, 0);
  a3Cat(ctx, t, { x: 1615, y: 302, dir: -1, sit: 1, lid: tc > 72.45 && tc < 73.0 ? 0.35 : 1, tailCurl: 1, gaze: [-1, 0.2] });
  for (let k = A3_CHAIN.length - 1; k >= 0; k--) { const P = a3ChainPose(k, t), who = A3_CHAIN[k].who;
    if (k === 0 && tc >= 69.2) { P.amp = 0; P.handR = [100, -150]; P.handL = [72, -140]; P.tip = 0.1 * Math.min(1, (tc - 69.2) * 6); P.lid = tc < 70.1 ? 1 : 0; P.mouth = 'smile';
      if (tc >= 70.1) { P.wink = tc < 70.25 ? 'L' : null; P.eyes = tc > 70.25 ? 'wide' : undefined; P.gaze = [1, -0.1]; P.look = tc > 70.35 ? 0.8 : 0; P.lid = Math.max(abBlinkAt(tc, 70.3), abBlinkAt(tc, 70.5)); P.tip = 0.04; }
      if (tc >= 73.9) { const w = Math.min(1, Math.floor((tc - 73.9) * 8) / 3); P.mouth = 'o'; P.handR = [K.lerp(100, 66, w), K.lerp(-150, -84, w)]; P.x += tremble(tc, 2, 9); P.eyes = 'wide'; P.wet = true; P.tip = 0; } }
    if (k === 1 && tc >= 69.3) { P.amp = 0; P.tip = 0.06 * pulse(tc, 69.35, 0.35); P.gaze = [1, 0]; if (tc > 69.6 && tc < 70.3) P.handRW = [408, 800]; if (tc > 70.3) { P.handR = [30, -100]; P.gaze = [1, -0.2]; }
      if (tc > 74.6) { P.look = K.lerp(1, 0.2, beatIn(tc, 74.6, 75.0)); P.gaze = [1, 0.1]; P.lid = Math.sin(Math.PI * beatIn(tc, 74.65, 75.0)) * 0.9; P.brow = 1; } }
    if (k >= 2 && tc >= 73.9) { P.amp = 0; P.gaze = gazePlan(tc, [[73.9, [k === 3 ? -1 : 1, -0.2]], [74.25 + 0.05 * k, [k === 3 ? 1 : -1, -0.1]], [74.7, [1, 0]]]); P.eyes = 'wide'; }
    let lift = 0; if (k === 1) { lift = 18 * Math.sin(Math.PI * beatIn(tc, 74.75, 75.0)); P.sq *= tc > 75.0 ? impactSquash(tc, 75.0, 0.9) : 1; }
    const draw = (c) => { const Q = { ...P, y: 905 - lift }; if (who === 'spy') spyDisguise(c, t, 1, Q, A3_N, { shc: A3_NSH, kick: 0.3, gy: 905, lift });
      else if (who === 'leader') a2Lead(c, t, { ...Q, fin: A3_NRIM }, A3_N, { shc: A3_NSH, kick: 0.3 + 0.4 * pulse(tc, 75.0, 0.4), lift }); else a2Man(c, who, { ...Q, fin: null }, A3_N, { t, shc: A3_NSH }); };
    a3ArchFig(ctx, P.x, 905, draw);
    if (k === 0 && tc > 73.95) { const [x, y] = a2HeadPt(P, 30, -20 + 40 * ((tc - 73.95) % 0.6) / 0.6, { s: 0.98, age: 0.35 }); celShade(ctx, [[x, y - 9], [x + 4, y], [x, y + 3], [x - 4, y]], '#cfeaff', '#7fb0e0', { off: 2, lw: 1.5, line: '#3a5a9a' }); } }
  if (t > 75.0) dustBurst(ctx, 330, 905, t - 75.0, 6, 4, 9, 40, 0.5, 3);
}
function a3NightGroupOver(ctx, t, cam, S) {
  if (t > 69.2 && t < 71.2) { const [hx, hy] = abP(400, 690, cam); abSay(ctx, S, [[69.3, 'THIS ONE!'], [70.18, 'NO... THIS ONE?']], t, K.clamp(hx + 40, 260, 740), hy - 140, [hx, hy - 30], { size: 52, gone: 70.85 }); }
  if (t > 70.2 && t < 73.9) { const rx = A3_REVEAL_X(t), xs = [460, 750, 1020, 1670, 1950]; let v = 0, last = 70.2; for (const [i, x] of xs.entries()) if (x <= rx + 60 || (i === 4 && t > 73.7)) v++;
    const pop = 1 + 0.3 * Math.max(0, Math.sin(Math.PI * (((rx + 60) % 1) ))) * 0; S.counter(ctx, v, 500, 190, K.clamp((t - 70.25) / 0.3), { size: 130, color: v === 5 ? '#ff7ad9' : '#7fe3ff' });
    for (const [i, x] of xs.entries()) { const [px, py] = abP(x, 770, cam); if (px > 0 && px < 1000) tsRing(ctx, px, py, ((t - 70.2 - i * 0.2) % 0.8) / 0.8, '#ffffff', { r0: 24, grow: 40, w: 3 }); } }
}

// ---------- S9 75.2-84.2: the two-shot. Anger; WHICH DOOR?! (impact frame); eeny meeny; UH...; the palm down the face ----------
const A3_S9_ARM = [[79.7, [40, -130]], [80.0, [-30, -150]], [80.35, [112, -206]], [80.9, [124, -150]], [81.2, [30, -110]]];
function a3S9World(ctx, t, cam) {
  const tc = AB_T2(t);
  a3Street(ctx, t, cam, { m: A3_N, lan: 1, marks: { glow: 0.55 } });
  tsMoth(ctx, t, 1);
  // the men behind the leader
  [[0, 80], [2, 140], [4, 200]].forEach(([i, x0], k) => { const back = beatIn(tc, 76.4 + 0.12 * k, 76.9 + 0.12 * k), xf = (u) => x0 - 30 * beatIn(u, 76.4 + 0.12 * k, 76.9 + 0.12 * k) - (k === 2 ? 30 * beatIn(u, 76.6, 77.0) : 0);
    const P = { y: 893, dir: 1, ...walk(xf, tc, { stride: 18 }), lid: abLid(t, 220 + k), tip: idleSway(tc, 230 + k, 0.03, 1.9) + tremble(tc, 0.01, 7), sq: breathe(tc, 240 + k, 0.02), eyes: 'wide', gaze: [1, 0], handL: [20, -140], handR: [30, -150], mouth: 'o' };
    if (tc > 79.9 && tc < 81) { P.look = K.clamp((tc - 79.9 - 0.1 * k) * 4) * 0.9; P.gaze = [1, -0.4]; }
    if (k === 2 && tc > 80.2 && tc < 80.85) { P.handR = [8, -170]; P.mouth = 'closed'; P.eyes = undefined; P.gaze = [1, 0]; if (tc > 80.65) P.handR = [20, -110]; }
    a2Man(ctx, i, P, A3_N, { t, shc: A3_NSH }); });
  // the leader
  const L = { x: 300, y: 905, dir: 1, lid: abLid(t, 251), tip: idleSway(tc, 252, 0.015, 3), sq: breathe(tc, 253, 0.012), brow: 1, gaze: [1, 0.05], mouth: 'frown', fin: A3_WRIM };
  const rise = flow(tc, [[75.2, 0], [75.5, 0], [76.3, 1], [83.4, 1], [84.2, 0.6]]); L.sq *= 1 + 0.06 * rise; L.lid = Math.max(L.lid, 0.35 * rise); L.handL = [-42, -94]; L.handR = [42, -96];
  const loom = flow(tc, [[77.1, 0], [77.6, 1], [78.9, 1], [79.6, 0.6], [80.0, 0.3]]); L.tip += 0.15 * loom; L.x += 20 * loom; if (tc > 77.3 && tc < 79.6) L.handRW = [445, 742];
  if (tc > 78.94 && tc < 79.6) { L.talk = 0.35 * Math.abs(Math.sin(AB_T3(t) * 20)); L.mouth = 'open'; }
  if (tc >= 79.7 && tc < 81.2) { L.handR = flow(tc, A3_S9_ARM.map(([a, v]) => [a, v[0]])); L.handR = [L.handR, flow(tc, A3_S9_ARM.map(([a, v]) => [a, v[1]]))]; L.handRW = null; L.gaze = [1, -0.3]; if (tc > 80.4 && tc < 80.9) { L.look = -0.8; L.gaze = [-1, 0]; } }
  if (tc >= 81.2 && tc < 83.4) { L.handL = [22, -105]; L.handR = [-18, -112]; L.gaze = [1, 0.1]; }
  if (tc >= 83.4) { const d = beatIn(tc, 83.45, 84.1); L.handR = [12, -214 + 62 * d]; L.lid = 1; L.drop = 4; }
  const kick = 0.5 * rise * (tc < 77 ? 1 : 0.4) + 0.5 * pulse(tc, 80.0, 0.8) - (tc > 83.4 && tc < 83.9 ? 0.2 : 0);
  a2Lead(ctx, t, L, A3_N, { shc: A3_NSH, kick: Math.max(0, kick) });
  // the spy
  const P = { x: 450, y: 905, dir: -1, lid: abLid(t, 261), tip: 0, sq: breathe(tc, 263, 0.02), eyes: 'wide', wet: true, gaze: [-1, 0], mouth: 'o', handL: [20, -140], handR: [30, -146], fin: A3_NRIM };
  P.x += tremble(tc, 1.5 + (tc > 80.9 ? 1.5 * beatIn(tc, 80.9, 82.2) : 0), 9); P.tip = -0.15 * loom; if (tc > 78.1 && tc < 79.8) { P.sq *= 0.92; P.drop = 10; P.tilt = 0.15; }
  if (tc >= 80.94 && tc < 82.2) { const st = tc < 81.3 ? 0 : tc < 81.7 ? 1 : 2; P.gaze = [[-1, 0], [1, 0], [1, -0.3]][st]; P.look = [-0.6, 0.6, 0.9][st];
    if (st === 0 && tc > 81.05) P.handR = [100, -150]; if (st === 1 && tc > 81.42) { P.handL = [-100, -150]; P.handR = [30, -120]; } if (st === 2 && tc > 81.82) { P.handL = [-112, -186]; P.handR = [30, -120]; } P.mouth = Math.floor(AB_T3(t) * 8) % 2 ? 'o' : 'closed'; }
  if (tc >= 82.2 && tc < 82.9) { P.handL = [-24, -110]; P.handR = [24, -112]; P.gaze = [-0.3, -0.3]; P.mouth = 'closed'; }
  if (tc >= 82.9) { P.handL = [-60, -100]; P.handR = [60, -100]; P.mouth = 'smile'; P.drop = 12; P.lid = 0.5; P.eyes = undefined; P.sq *= 0.97; }
  spyDisguise(ctx, t, 1, P, A3_N, { shc: A3_NSH, kick: 0.15 });
  const [sx, sy] = a2HeadPt(P, -30, -20 + 40 * ((tc % 0.7) / 0.7), { s: 0.98, age: 0.35 }); celShade(ctx, [[sx, sy - 9], [sx + 4, sy], [sx, sy + 3], [sx - 4, sy]], '#cfeaff', '#7fb0e0', { off: 2, lw: 1.5, line: '#3a5a9a' });
}
function a3S9Over(ctx, t, cam, S) {
  const [lx, ly] = abP(310, 680, cam);
  if (t >= 78.94 && t < 79.55) S.emphasis(ctx, lx, ly, 200, K.clamp((t - 78.94) / 0.6), { rect: [0, 0, 1000, 1230], word: '', seed: 5 });
  if (t > 78.9 && t < 80.5) abSay(ctx, S, [[78.94, 'WHICH DOOR?!']], t, K.clamp(lx + 40, 250, 700), ly - 190, [lx + 10, ly - 40], { size: 58, gone: 80.2 });
  if (t > 82.2 && t < 83.3) { const [sx, sy] = abP(450, 690, cam); abSay(ctx, S, [[82.3, 'UH...']], t, sx + 60, sy - 150, [sx, sy - 40], { size: 40, gone: 82.95, wobble: 6 }); }
}

// ---------- S10 84.2-86.3: a window lights, the chain backs out, the shutter slit closes; NEXT DAY... ----------
function a3S10World(ctx, t, cam) {
  const tc = AB_T2(t), lit = beatIn(t, 84.25, 84.45), slit = tc > 85.2 && tc < 85.75 ? 1 - beatIn(tc, 85.5, 85.75) : 0;
  a3Street(ctx, t, cam, { m: A3_N, lan: 1, marks: { glow: 0.5 }, win: { sh: 0, slit, inside: slit > 0 ? (c) => { const W = TS.win; c.fillStyle = AB_MORG_ACC; c.fillRect(W.cx - 9, W.y + 10, 18, 26); c.fillStyle = '#f7c6a3'; c.fillRect(W.cx - 9, W.y + 36, 18, 24); c.fillStyle = '#2a1018'; c.beginPath(); c.ellipse(W.cx - 1, W.y + 46, 4, 3, 0, 0, 7); c.fill(); abGlint(c, W.cx, W.y + 18, 20, ((t - 85.2) / 0.4) % 1, '#bff6f8'); } : null } });
  if (lit > 0) { ctx.save(); ctx.globalAlpha = lit; K.poly(ctx, townArchPts(560, 624, 400, 484, 'round', 8), true); ctx.fillStyle = '#ffd98a'; ctx.fill(); ctx.restore(); abGlow(ctx, 592, 442, 110, 0.7 * lit, '#ffcf6a');
    celShade(ctx, [[624, 410], [624 + 20 * lit, 414], [624 + 20 * lit, 480], [624, 484]], '#5a7ad0', '#3a5aa0', { off: 3, lw: 2.5 }); }
  a3Cat(ctx, t, { x: 1010, y: 242, dir: 1, sit: 1, gaze: [0.5, 1], lid: 0, tailCurl: 0.8 });
  const frz = tc > 84.3 && tc < 84.55;
  [[0, 80], [2, 140], [4, 200]].forEach(([i, x0], k) => { const xf = (u) => kfn(u, [[84.5 + 0.1 * k, x0 - 30 + (k === 2 ? -30 : 0)], [85.7 + 0.1 * k, -90]], 'in'), W = walk(xf, tc, { stride: 15 });
    const P = { y: 893, dir: 1, ...W, amp: frz ? 0.9 : Math.min(1, W.amp * 1.3), ph: frz ? Math.PI / 2 : W.ph, gaze: [0.6, -0.8], look: 0.6, eyes: 'wide', handL: [20, -150], handR: [30, -160], drop: 8, tip: -0.05, lid: 0 };
    a3ArchFig(ctx, P.x, 893, (c) => a2Man(c, i, P, A3_N, { t, shc: A3_NSH })); });
  const lxf = (u) => kfn(u, [[84.6, 320], [85.9, -60]], 'in'), W = walk(lxf, tc, { stride: 18 }), L = { y: 905, dir: 1, ...W, amp: frz ? 0.9 : W.amp, ph: frz ? Math.PI / 2 : W.ph, gaze: [1, -0.2], brow: 1, mouth: 'frown', lid: 0.3 };
  const sx = L.x + 80, P = { x: sx, y: 905, dir: -1, tip: tc > 84.6 ? -0.25 : 0, eyes: 'wide', mouth: 'o', handL: [-20 + lagged((u) => lxf(u), tc, 0.15, 0.1), -56], handR: [20, -52], gaze: [0, 0.6], drop: 10 };
  if (tc > 84.6) { ctx.save(); ctx.strokeStyle = 'rgba(60,40,80,0.5)'; ctx.lineWidth = 4; for (const dy of [0, 10]) { ctx.beginPath(); ctx.moveTo(sx + 20, 908 + dy); ctx.lineTo(460, 908 + dy); ctx.stroke(); } ctx.restore(); }
  L.handRW = tc > 84.6 ? [sx - 4, 905 - 150] : null;
  a3ArchFig(ctx, sx, 905, (c) => spyDisguise(c, t, 1, P, A3_N, { shc: A3_NSH }));
  a3ArchFig(ctx, L.x, 905, (c) => a2Lead(c, t, L, A3_N, { shc: A3_NSH, kick: 0.3 }));
}

AB_SHOTS.push({ a: 64.4, b: 66.5, ww: 2000, cam: a3Cam([[64.4, { x: 900, y: 615, zoom: 1.0 }], [66.5, { x: 920, y: 615, zoom: 1.0 }]]), world: a3TLWorld });
AB_SHOTS.push({ a: 66.5, b: 73.9, ww: 2000, cam: (t) => t < 70.15 ? K.camAt([[66.5, { x: 500, y: 615, zoom: 1.0 }], [69.2, { x: 500, y: 615, zoom: 1.0 }], [69.7, { x: 540, y: 650, zoom: 1.12 }], [70.15, { x: 520, y: 620, zoom: 1.02 }]], t) : { x: A3_REVEAL_X(t), y: 615, zoom: 1.0 }, world: a3NightGroupWorld, over: a3NightGroupOver });
AB_SHOTS.push({ a: 73.9, b: 75.2, ww: 2000, cam: a3Cam([[73.9, { x: 420, y: 670, zoom: 1.25 }], [75.2, { x: 410, y: 675, zoom: 1.28 }]]), world: a3NightGroupWorld, over: a3NightGroupOver });
AB_SHOTS.push({ a: 75.2, b: 84.2, ww: 2000, cam: a3Cam([[75.2, { x: 390, y: 700, zoom: 1.4 }], [78.9, { x: 390, y: 700, zoom: 1.4 }], [82.2, { x: 400, y: 705, zoom: 1.55 }], [83.4, { x: 400, y: 700, zoom: 1.5 }], [84.2, { x: 500, y: 640, zoom: 1.15 }]]), world: a3S9World, over: a3S9Over });
AB_SHOTS.push({ a: 84.2, b: 86.3, ww: 2000, cam: a3Cam([[84.2, { x: 640, y: 615, zoom: 1.0 }], [86.3, { x: 630, y: 615, zoom: 1.0 }]]), world: a3S10World });
