// ===== ALI-06 shots S19-S21 (116.2-147.13): Morgiana's lamp shop in the false merchant's old premises, the honest scale, Ali Baba
// selling firewood again, the storyteller at golden hour, REMEMBER CLEVER MORGIANA!, her lamps, THE END.
function a6Apron(ctx, P) { const pt = (x, y) => a2BodyPt(P, x, y, A3_MORG); celShade(ctx, [pt(-26, -108), pt(26, -108), pt(34, -24), pt(-34, -24)], '#fffaf0', '#e8dcc8', { light: [-1, -1], off: 5, lw: 2.5, line: '#8a7a6a' });
  const [ax, ay] = pt(-34, -30), [bx, by] = pt(34, -30); seg(ctx, ax, ay, bx, by, 8, '#14c2c8', 1.5); }
function a6Morg(ctx, t, P, m, o = {}) { morgiana(ctx, t, P, m, { shc: o.shc || A6_DSH, ...o }); a6Apron(ctx, P); return P; }

// ---------- S19 116.2-124.48: refitting the shop, the level scale, the coin pushed back, the queue ----------
function a6S19World(ctx, t, cam) { const tc = AB_T2(t), m = 'afternoon', done = tc >= 118.68;
  ctx.drawImage(a5MarketPlate(), 0, 0); abFlock(ctx, t, -200, 230, 120, 4, 7, 0.42);
  const lamps = done ? Math.min(6, Math.floor(Math.max(0, tc - 119.62) / 0.14)) : 0;
  lampShop(ctx, t, { awning: done ? K.ease.out(beatIn(tc, 118.68, 119.0)) : 0, old: 0, board: done ? beatIn(tc, 118.8, 119.1) : 0, boardSwing: swing(tc, 119.1, 0.12, 1.2, 1.3), lamps });
  if (!done) { celShade(ctx, ell(900, 892, 90, 14, 16), '#f08a5a', '#c8643a', { lw: 2.5, line: '#8a3a1a' });   // the old coral awning, rolled on the ground
    celShade(ctx, K.rectPts(820, 860, 150, 34), '#0e8a90', '#0a5a60', { off: 4, lw: 2.5, line: '#06363a' }); ctx.font = 'italic 800 22px "Barlow Semi Condensed"'; ctx.fillStyle = '#fff6d8'; ctx.textAlign = 'center'; ctx.fillText(tc > 118.3 ? "MORGIANA'S" : "MORGIANA'", 895, 885); }
  const L = [];
  // Morgiana: steadies the box (117.6), then behind the counter with her apron (from 119.0); weighs, counts, pushes a coin back
  const mx = (u) => kfn(u, [[116.2, 1060], [118.6, 1060], [118.7, 1110]]), M = { ...a5Base(t, 1001), x: mx(tc), y: done ? 880 : 906, dir: done ? 1 : -1, gaze: [-1, 0.2], mouth: 'smile', handL: [-24, -104], handR: [30, -110] };
  if (!done && tc > 117.5 && tc < 118.0) { M.handR = [90, -170]; M.gaze = [-1, -0.2]; }
  if (done) { M.dir = -1; M.gaze = [-1, 0.2]; if (tc < 120.4) { M.handR = [60, -140 + 10 * Math.sin(tc * 12)]; M.handL = [30, -120]; } else if (tc < 121.42) { M.gaze = [-1, 0]; M.mouth = 'grin'; }
    else if (tc < 122.3) { M.handR = [64, -150]; M.gaze = [-0.4, 0.6]; } else if (tc < 123.0) { M.handR = [K.lerp(40, 90, beatIn(tc, 122.6, 122.9)), -110]; M.gaze = [-1, 0.4]; M.mouth = 'smile'; M.tilt = 0.06; } }
  const morgDraw = () => { if (done) { ctx.save(); ctx.beginPath(); ctx.rect(SF.x0, 0, SF.x1 - SF.x0, SF.counter + 4); ctx.clip(); a6Morg(ctx, t, M, m, { shadow: false }); ctx.restore(); } else morgiana(ctx, t, M, m, { shc: A6_DSH }); };
  if (done) morgDraw();
  // the scale on the counter (behind the counter's front pass), the oil, the coins
  if (done) { const tilt = tc < 121.42 ? 0 : tc < 121.9 ? -0.6 * beatIn(tc, 121.42, 121.6) : tc < 122.1 ? -0.6 + 0.6 * beatIn(tc, 121.9, 122.1) : 0.04 * swing(tc, 122.1, 1, 2, 4);
    balanceScale(ctx, 1060, SF.counter, 0.9, { tilt, glint: tc > 122.1 && tc < 122.6 ? (tc - 122.1) / 0.5 : 0, left: (c, px, py) => { if (tc > 121.42) celShade(c, ell(px, py - 6, 14, 8, 10), '#ffcf3a', '#c08a1a', { lw: 1.5 }); }, right: (c, px, py) => { c.fillStyle = '#8a8aa0'; c.fillRect(px - 8, py - 12, 16, 12); } });
    if (tc > 122.3 && tc < 124.48) { goldCoin(ctx, 1150, SF.counter, 0.9, { flat: true }); goldCoin(ctx, 1170, SF.counter, 0.9, { flat: true }); const u = beatIn(tc, 122.6, 122.9); goldCoin(ctx, K.lerp(1130, 990, u), SF.counter, 0.9, { flat: true }); } }
  lampCounter(ctx, t);
  if (done) for (let i = 0; i < Math.min(3, lamps); i++) brassLamp(ctx, 1150 + i * 32, SF.counter - 2, 0.8, { glint: ((tc * 0.5 + i * 0.3) % 1) });
  // the cat onto the end of the counter (123.65)
  if (tc > 123.65) { const u = beatIn(tc, 123.65, 123.95); a5Cat(ctx, t, { x: K.lerp(1320, 1215, u), y: K.lerp(906, SF.counter, u) - 40 * Math.sin(Math.PI * u), gy: SF.counter, dir: tc < 124.1 ? -1 : 1, sit: u >= 1 ? 1 : 0, gaze: [-1, 0.3] }, 'rgba(43,26,58,0.3)'); }
  if (!done) {
    const A = { ...a5Base(t, 1011), x: 960, y: 846, dir: 1, gaze: [1, -0.4], mouth: 'closed', brow: 0.3, handL: [40, -190], handR: [60, -200 + (tc < 117.0 ? 30 * Math.abs(Math.sin((tc - 116.2) * 12)) : 0)] };
    L.push({ y: 906, d: () => { a5Crate(ctx, 960, 906, 1.1); a2Ali(ctx, A, m, { shadow: false }); } });
    const nx = (u) => kfn(u, [[116.2, 640], [118.0, 1040], [118.6, 1040]]), NW = a6Walk(nx, tc, 1, 15), N = { ...a5Base(t, 1021), ...NW, y: 912, mouth: 'grin', gaze: [1, 0], handL: [40, -140], handR: [50, -142] };
    L.push({ y: 912, d: () => { abNephew(ctx, t, N, m, { shc: A6_DSH }); const [hx, hy] = a2Hand(N, 1, A5_NEPH); a5CrateStack(ctx, hx - 4, hy + 30, 3, 0.55, tc > 117.3 && tc < 117.6 ? 0.18 * Math.sin((tc - 117.3) * 20) : 0); } });
    const Wf = { ...a5Base(t, 1031), x: 1300, y: 910, dir: -1, gaze: [-1, -0.6], mouth: 'smile', handL: tc > 118.12 ? [40, -230] : [30, -130], handR: tc > 118.12 ? [60, -240] : [40, -132] };
    L.push({ y: 910, d: () => { a3Shadow(ctx, Wf.x, Wf.y, 96, 0, A6_DSH); abWife(ctx, Wf, m); if (tc < 118.12) { const [hx, hy] = a2Hand(Wf, 1, { s: 0.92, age: 0.25 }); celShade(ctx, K.rectPts(hx - 40, hy - 10, 80, 40), '#14c2c8', '#0e8a90', { off: 4, lw: 2.5 }); } } });
    const Kd = { ...a5Base(t, 1041), x: 840, y: 912, dir: 1, kneel: 1, gaze: [1, 0.8], mouth: 'smile', handL: [-20, -60], handR: [50, -50 + 6 * Math.sin(tc * 14)] };
    L.push({ y: 913, d: () => { a3Shadow(ctx, Kd.x, Kd.y, 70, 0, A6_DSH); abKid(ctx, Kd, m); } });
    L.push({ y: 906, d: () => morgDraw() });
  } else {
    // the queue: the old neighbour at the counter, the baker with his bread tray, the apprentice craning round him; Ali Baba and family watching
    const Nb = { ...a5Base(t, 1051), x: kfn(tc, [[118.68, 760], [120.48, 930]]), y: 912, dir: 1, gaze: [1, -0.1], mouth: 'smile', handL: [-24, -104], handR: tc > 122.3 && tc < 122.6 ? [80, -140] : [30, -110] };
    Object.assign(Nb, walk((u) => kfn(u, [[118.68, 760], [120.48, 930]]), tc, { stride: 13 })); if (tc > 122.9) { Nb.mouth = 'grin'; Nb.lid = 0.4; }
    L.push({ y: 912, d: () => a3Neighbour(ctx, t, Nb, m, { shc: A6_DSH, broom: tc < 120.6 ? 30 : null }) });
    if (tc > 120.6) { const bx = kfn(tc, [[120.6, 560], [121.4, 800]]), B = { ...a5Base(t, 1061), ...walk((u) => kfn(u, [[120.6, 560], [121.4, 800]]), tc, { stride: 16 }), x: bx, y: 914, dir: 1, mouth: 'smile', gaze: [1, 0], handL: [30, -140], handR: [40, -142] };
      if (tc > 122.8 && tc < 123.4) { B.dir = -1; B.drop = 6 * Math.abs(Math.sin((tc - 122.8) * 9)); B.gaze = [-1, 0]; }
      L.push({ y: 914, d: () => baker(ctx, t, B, m, { shc: A6_DSH }) });
      const yx = kfn(tc, [[120.8, 500], [121.6, 700]]), Y = { ...a5Base(t, 1071), ...walk((u) => kfn(u, [[120.8, 500], [121.6, 700]]), tc, { stride: 14 }), x: yx, y: 916, dir: 1, mouth: 'o', gaze: [1, -0.2], tip: 0.1, handL: [-20, -100], handR: [24, -104] };
      if (tc > 123.0 && tc < 123.6) { Y.dir = -1; Y.drop = 5 * Math.abs(Math.sin((tc - 123) * 9)); Y.tip = 0; }
      L.push({ y: 916, d: () => apprentice(ctx, t, Y, m, { shc: A6_DSH }) }); }
    const A = { ...a5Base(t, 1081), x: 1380, y: 908, dir: -1, gaze: [-1, 0], mouth: 'grin', handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R };
    L.push({ y: 908, d: () => a2Ali(ctx, A, m, { shc: A6_DSH }) });
  }
  for (const q of abByY(L)) q.d();
}
function a6S19Over(ctx, t, cam, S) { if (t > 116.25 && t < 117.1) { const [hx, hy] = abP(1000, 560, cam); a2Tag(ctx, S, 'TAP TAP TAP', hx, hy - 60, t, 116.3, 117.0, { size: 32 }); }
  if (t > 118.68 && t < 119.0) abBands(ctx, [0, 0, 1000, 1230], t - 118.68, { n: 2, w: 120, speed: 2600, alpha: 0.45, cols: ['#ffffff', '#bff4f0'] });
  if (t > 122.0 && t < 122.7) { const [sx, sy] = abP(1060, 640, cam); a2Tag(ctx, S, 'JUST RIGHT!', sx, sy - 60, t, 122.05, 122.6, { size: 34 }); } }
AB_SHOTS.push({ a: 116.2, b: 124.48, ww: 2000, cam: a5Cam([[116.2, { x: 1080, y: 630, zoom: 1.25 }], [118.6, { x: 1100, y: 630, zoom: 1.25 }], [120.5, { x: 1000, y: 630, zoom: 1.25 }], [121.6, { x: 960, y: 630, zoom: 1.25 }], [122.8, { x: 1040, y: 630, zoom: 1.25 }], [124.48, { x: 1050, y: 630, zoom: 1.25 }]]), world: a6S19World, over: a6S19Over });

// ---------- S20 124.48-132.52: Ali Baba's woodpile, change given, the rock let go ----------
function a6Wood(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); for (const [dx, dy] of [[-14, 0], [14, 0], [0, -18]]) { celShade(ctx, K.rectPts(-44 + dx, -14 + dy, 88, 22), '#b8743e', '#8a4a1e', { off: 4, lw: 2.5, line: '#4a2410' }); shape(ctx, ell(44 + dx, -3 + dy, 6, 11, 10), '#e8c08a', { lw: 2 }); }
  seg(ctx, -10, -34, -10, 10, 3, '#e8c870', 0); seg(ctx, 18, -34, 18, 10, 3, '#e8c870', 0); ctx.restore(); }
function a6S20World(ctx, t, cam) { const tc = AB_T2(t), m = 'afternoon';
  ctx.drawImage(a5MarketPlate(), 0, 0); abFlock(ctx, t, -200, 230, 120, 4, 7, 0.42); lampShop(ctx, t, { lamps: 6 }); lampCounter(ctx, t); a5Post(ctx);
  const n = tc < 125.9 ? 5 : 6; for (let i = 0; i < n - (tc > 128.2 ? 2 : 0); i++) a6Wood(ctx, 1640 + (i % 2) * 40, 900 - Math.floor(i / 2) * 38, 0.85);
  const L = [];
  const D = { x: 1440, y: 906, s: 0.8, dir: 1, pal: 0, earL: 0.4 + idleSway(tc, 71, 0.3, 1.3), earR: 0.3, tailSwish: osc(tc, 1.6), lid: abLid(t, 73), neck: tc > 126.48 && tc < 127.2 ? 0.2 : idleSway(tc, 74, 0.06, 3) };
  L.push({ y: 906, d: () => { groundShadow(ctx, D.x, 906, 220, 0, { flat: true, color: A6_DSH }); abDonkey(ctx, D, m); if (tc < 125.6) a6Wood(ctx, 1440, 770, 0.8); a6Wood(ctx, 1405, 775, 0.8, 0.1); } });
  const A = { ...a5Base(t, 1101), x: 1560, y: 910, dir: -1, gaze: [-1, 0], mouth: 'smile', handL: [-26, -104], handR: [26, -104] };
  if (tc >= 125.44 && tc < 126.48) { const u = beatIn(tc, 125.44, 126.2); A.dir = u < 0.5 ? -1 : 1; A.handL = [50, -150 + 40 * u]; A.handR = [60, -150 + 40 * u]; }
  else if (tc >= 126.48 && tc < 127.32) { A.handR = tc < 126.9 ? [10, -205] : [80, -150 + 8 * Math.sin(tc * 16)]; A.handL = [-26, -104]; A.dir = -1; A.mouth = 'closed'; A.lid = tc < 126.9 ? 0.5 : 0; }
  else if (tc >= 127.32 && tc < 127.96) { A.dir = 1; A.handL = [50, -100]; A.handR = [60, -100 - 20 * pulse(tc, 127.6, 0.2)]; A.gaze = [1, 0.6]; }
  else if (tc >= 127.96 && tc < 129.76) { A.dir = 1; A.gaze = [1, 0.4]; A.handL = [40, -130]; A.handR = tc < 128.92 ? [30, -124 + 3 * Math.sin(tc * 20)] : tc < 129.3 ? [90, -132] : PERSON_HANDS.chest.R; }
  else if (tc >= 129.76) { A.dir = -1; A.gaze = [-1, -0.6]; A.look = -0.2; A.mouth = 'closed'; if (tc > 131.22 && tc < 131.8) { A.look = 0.3 * Math.sin((tc - 131.22) * 18); A.mouth = 'smile'; A.handR = [60 + 30 * Math.sin((tc - 131.22) * 12), -160]; } if (tc > 131.8) { A.handL = [50, -110]; A.handR = [60, -112]; A.dir = 1; A.gaze = [1, 0.4]; } }
  L.push({ y: 910, d: () => { a2Ali(ctx, A, m, { shc: A6_DSH }); if (tc >= 125.44 && tc < 126.3) { const [hx, hy] = a2Hand(A, 1, { s: 0.95, age: 0.25 }); a6Wood(ctx, hx, hy + 14, 0.8); } if (tc >= 128.92 && tc < 129.3) { const [hx, hy] = a2Hand(A, 1, { s: 0.95, age: 0.25 }); goldCoin(ctx, hx + 6, hy - 4, 1, { spin: 1, glint: (tc - 128.92) / 0.4 }); } } });
  if (tc > 127.6 && tc < 130.0) { const px = (u) => kfn(u, [[127.6, 2000], [128.2, 1700], [129.2, 1700], [130.0, 2000]]), W = a6Walk(px, tc, -1, 16), P = { ...a5Base(t, 1111), ...W, y: 914, gaze: [-1, 0.2], mouth: 'smile', handL: [-26, -104], handR: tc > 128.92 && tc < 129.3 ? [70, -130] : [30, -110] };
    if (tc > 128.2 && tc < 129.2) P.dir = -1; L.push({ y: 914, d: () => { a6Folk(ctx, 'potter', P, m); if (tc > 128.2) { const [hx, hy] = a2Hand(P, 0, A6_FOLK.potter); a6Wood(ctx, hx, hy + 10, 0.7); } } }); }
  if (tc > 131.8) { const kx = (u) => kfn(u, [[131.8, 1300], [132.52, 1900]], 'lin'), W = a6Walk(kx, tc, 1, 12), Kd = { ...a5Base(t, 1121), ...W, y: 918, mouth: 'grin', gaze: [1, 0], handL: [-20, -70], handR: [40, -90] }; L.push({ y: 918, d: () => { a3Shadow(ctx, Kd.x, Kd.y, 70, 0, A6_DSH); abKid(ctx, Kd, m); const [hx, hy] = a2Hand(Kd, 1, { s: 1, child: true }); brassHorse(ctx, hx, hy + 4, 0.8); } }); }
  for (const q of abByY(L)) q.d();
}
function a6S20Over(ctx, t, cam, S) { if (t > 129.0 && t < 129.6) { const [ax, ay] = abP(1560, 700, cam); a2Tag(ctx, S, 'YOUR CHANGE.', ax + 60, ay - 80, t, 129.0, 129.5, { size: 32 }); }
  if (t > 129.76 && t < 132.0) { const pop = t > 131.8 ? 1 - K.clamp((t - 131.8) / 0.15) : K.clamp((t - 129.76) / 0.3), [ax, ay] = abP(1560, 690, cam);
    if (pop > 0) { thoughtCloud(ctx, 430, 330, 440, 310, t, { p: pop, tail: [ax - 30, ay - 40], seed: 5 }); ctx.save(); ctx.globalAlpha *= K.clamp(pop * 2 - 1); ctx.beginPath(); ctx.ellipse(430, 330, 180, 120, 0, 0, 7); ctx.clip(); abGrad(ctx, 250, 210, 360, 240, [[0, '#8cc0f6'], [1, '#c8f0c0']]);
      abRock(ctx, 430, 440, { s: 0.32, model: 'morning' }); const iv = K.clamp((t - 130.56) / 0.6); ctx.strokeStyle = '#2f9a4a'; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 12 * iv; k++) ctx.lineTo(430 + 10 * Math.sin(k * 1.3), 440 - k * 8); ctx.stroke();
      for (let k = 0; k < 8 * iv; k++) abBlob(ctx, 430 + 12 * Math.sin(k * 1.3 + 0.6), 432 - k * 12, 8, 6, '#4aa85a', '#2a7a3a', { lw: 1.5 });
      if (t > 130.9) { celShade(ctx, ell(470, 300, 22, 8, 12), '#b8743e', '#8a4a1e', { lw: 2 }); const u = beatIn(t, 130.9, 131.2); abBlob(ctx, K.lerp(560, 470, u), K.lerp(240, 290, u), 10, 8, '#e8642a', '#b8441a', { lw: 2 }); }
      ctx.restore(); } } }
AB_SHOTS.push({ a: 124.48, b: 132.52, ww: 2000, cam: a5Cam([[124.48, { x: 1100, y: 630, zoom: 1.22 }], [126.4, { x: 1560, y: 630, zoom: 1.22 }], [129.6, { x: 1560, y: 600, zoom: 1.22 }], [131.8, { x: 1570, y: 600, zoom: 1.22 }], [132.52, { x: 1600, y: 620, zoom: 1.22 }]]), world: a6S20World, over: a6S20Over });

// ---------- S21 132.52-147.13: the storyteller at golden hour, every arm points, REMEMBER CLEVER MORGIANA!, the lamps, THE END ----------
const A6_PT = [137.36, 138.02, 138.22, 138.42, 138.62, 138.82];   // the baker first, then one by one
function a6S21World(ctx, t, cam) { const tc = AB_T2(t), m = 'dusk', lit = tc < 140.3 ? 0 : tc < 141.7 ? 1 : Math.min(8, 1 + (tc - 141.7) / 0.18);
  ctx.drawImage(a6MarketDuskPlate(), 0, 0); abFlock(ctx, t, -200, 260, 110, 5, 9, 0.42);
  lampShop(ctx, t, { lamps: 6, lit, dusk: 1 });
  const L = [];
  // Morgiana behind her counter: trims, lights the first lamp with a taper (140.3), looks up, laughs and waves (141.06), bows to Ali Baba (144.0)
  const M = { ...a5Base(t, 1201), x: 1110, y: 880, dir: 1, gaze: [-1, 0.3], mouth: 'smile', handL: [-24, -104], handR: [60, -170] };
  if (tc > 140.3 && tc < 141.06) { M.gaze = [1, 0]; M.handR = [80, -200]; M.dir = -1; M.gaze = [-1, -0.1]; }
  if (tc >= 141.06 && tc < 142.6) { M.dir = -1; M.gaze = [-1, 0]; M.mouth = 'grin'; M.lid = 0.5; M.look = 0.2 * Math.sin((tc - 141.06) * 10); M.handR = [60, -210 + 10 * Math.sin(tc * 14)]; }
  if (tc >= 142.6) { M.dir = -1; M.gaze = [-1, 0.1]; M.handR = tc > 144.0 && tc < 145.0 ? [40, -130] : [60, -160]; M.tip = tc > 144.0 && tc < 145.0 ? 0.1 * Math.sin(Math.PI * beatIn(tc, 144.0, 145.0)) : 0; if (tc > 145.2) { M.dir = 1; M.gaze = [1, -0.2]; M.handR = [70, -190]; } }
  ctx.save(); ctx.beginPath(); ctx.rect(SF.x0, 0, SF.x1 - SF.x0, SF.counter + 4); ctx.clip(); a6Morg(ctx, t, M, m, { shadow: false }); const [hx, hy] = a2Hand(M, 1, A3_MORG); seg(ctx, hx, hy, hx - 30, hy - 30, 4, '#e8c870', 0); a6Flame(ctx, hx - 32, hy - 34, 0.7, tc, 9); ctx.restore();
  lampCounter(ctx, t); a5Post(ctx);
  // the low wall by the arch, the storyteller and his listeners
  celShade(ctx, K.rectPts(1610, 840, 160, 60), '#e8b898', '#b88a6a', { light: [-1, -1], off: 6, lw: 3, line: '#6a4a3a' });
  const pt = (i) => tc >= A6_PT[i] && tc < 142.0, ptK = (i) => beatIn(tc, A6_PT[i], A6_PT[i] + 0.2);
  const T = { ...a5Base(t, 1211), x: 1690, y: 900, dir: -1, sit: 1, seat: 'bench', gaze: [-1, 0], mouth: 'smile', handL: [-26, -104], handR: [30, -110] };
  if (tc > 134.2 && tc < 137.4) { T.handR = PERSON_HANDS.pointUp.R; T.talk = abTalk(t, 134.3, 137.2, 111, 0.5); T.mouth = T.talk ? 'open' : 'smile'; T.gaze = [-1, -0.1]; }
  if (tc >= 137.4) { T.handR = [100, -150]; T.dir = -1; T.mouth = 'grin'; }
  L.push({ y: 900, d: () => a6Folk(ctx, 'teller', T, m, { shc: A6_ESH }) });
  const kids = [['boy', 1560, 1121], ['girl', 1612, 1131]]; kids.forEach(([k, x, sd], i) => { const P = { ...a5Base(t, sd), x, y: 930, dir: 1, sit: tc > 132.52 + 0.3 * i ? 1 : 0, seat: 'floor', gaze: [1, -0.4], mouth: 'o', handL: [-20, -60], handR: [20, -60] };
    if (i === 1 && tc > 136.52 && tc < 137.4) { P.x = 1485; P.sit = 0; P.mouth = 'o'; P.gaze = [1, 0]; }
    if (pt(3 + i)) { P.dir = -1; P.handL = [-90, -80 * ptK(3 + i) - 40]; P.handR = [-80, -100]; P.gaze = [-1, 0]; P.mouth = 'grin'; }
    L.push({ y: 930, d: () => a6Folk(ctx, k, P, m, { shc: A6_ESH }) }); });
  const Y = { ...a5Base(t, 1141), x: 1500, y: 926, dir: 1, sit: 1, seat: 'floor', gaze: [1, -0.4], mouth: 'smile', handL: [-20, -100], handR: [24, -104] }; if (pt(2)) { Y.dir = -1; Y.handR = [100 * ptK(2), -150]; Y.gaze = [-1, 0]; }
  L.push({ y: 926, d: () => apprentice(ctx, t, Y, m, { shc: A6_ESH }) });
  const B = { ...a5Base(t, 1151), x: 1440, y: 912, dir: 1, gaze: [1, -0.2], mouth: 'smile', handL: [30, -140], handR: [40, -142] };
  if (tc > 137.36 && tc < 138.0) { B.drop = 4 * Math.abs(Math.sin((tc - 137.36) * 10)); B.look = 0.3 * Math.sin((tc - 137.36) * 12); B.mouth = 'grin'; } if (pt(0)) { B.dir = -1; B.handR = [100 * ptK(0), -150]; B.gaze = [-1, 0]; }
  L.push({ y: 912, d: () => baker(ctx, t, B, m, { shc: A6_ESH }) });
  const Nb = { ...a5Base(t, 1161), x: 1360, y: 906, dir: 1, gaze: [1, -0.2], mouth: 'smile', handL: [-24, -104], handR: [30, -110] }; if (pt(1)) { Nb.dir = -1; Nb.handR = [90, -170]; Nb.gaze = [-1, 0]; }
  L.push({ y: 906, d: () => a3Neighbour(ctx, t, Nb, m, { shc: A6_ESH, broom: pt(1) ? 60 * ptK(1) : 20, lift: pt(1) ? 0.9 * ptK(1) : 0 }) });
  // Ali Baba and the donkey: at the woodpile, then (143.3) up to the shop with the kid riding on the firewood
  const ax = (u) => kfn(u, [[143.3, 1320], [145.6, 1300], [146.2, 1300]]), AW = a6Walk((u) => kfn(u, [[143.3, 1900], [146.0, 1420]]), tc, -1, 16);
  const A = { ...a5Base(t, 1171), x: 1900, y: 914, dir: -1, gaze: [-1, -0.1], mouth: 'smile', handL: [-26, -104], handR: [26, -104] };
  if (pt(5)) { A.dir = -1; A.handR = [96 * ptK(5), -150]; A.gaze = [-1, 0]; A.mouth = 'grin'; }
  if (tc >= 143.3) { Object.assign(A, AW); A.dir = -1; A.handL = [60, -130]; A.gaze = [-1, 0]; if (tc > 144.0 && tc < 145.0) { A.handR = [30, -215]; A.tip = 0.06; } }
  const dx = tc < 143.3 ? 1940 : kfn(tc, [[143.3, 1940], [146.0, 1460]]);
  const D = { x: dx + 70, y: 908, s: 0.75, dir: -1, pal: 0, earL: 0.4 + idleSway(tc, 81, 0.3, 1.3), earR: 0.3, tailSwish: osc(tc, 1.7), lid: abLid(t, 83), ...(tc >= 143.3 && tc < 146.0 ? walk((u) => kfn(u, [[143.3, 2010], [146.0, 1530]]), tc, { stride: GAIT.donkey * 0.75 }) : {}) };
  L.push({ y: 908, d: () => { groundShadow(ctx, D.x, 908, 200, 0, { flat: true, color: A6_ESH }); abDonkey(ctx, D, 'afternoon'); a6Wood(ctx, D.x + 10, 770, 0.7); if (tc >= 143.3) { const Kd = { ...a5Base(t, 1181), x: D.x + 6, y: 760, dir: -1, sit: 1, seat: 'bench', gaze: [-1, 0], mouth: 'grin', handL: [-20, -60], handR: [-60, -110 + 8 * Math.sin(tc * 12)] }; abKid(ctx, Kd, 'dusk'); } } });
  L.push({ y: 914, d: () => a2Ali(ctx, A, m, { shc: A6_ESH }) });
  // the nephew and the wife arrive from the left at the end
  if (tc > 143.3) { const nx = (u) => kfn(u, [[143.3, 680], [145.0, 900]]), N = { ...a5Base(t, 1191), ...a6Walk(nx, tc, 1, 15), y: 916, gaze: [1, 0], mouth: 'grin', handL: [-22, -104], handR: tc > 145.2 ? [60, -200 + 10 * Math.sin(tc * 12)] : [24, -104] };
    L.push({ y: 916, d: () => abNephew(ctx, t, N, m, { shc: A6_ESH }) }); const wx = (u) => kfn(u, [[143.6, 600], [145.3, 820]]), Wf = { ...a5Base(t, 1195), ...a6Walk(wx, tc, 1, 15), y: 912, gaze: [1, 0], mouth: 'smile', handL: [-24, -104], handR: [26, -104] };
    L.push({ y: 912, d: () => { a3Shadow(ctx, Wf.x, Wf.y, 96, 0, A6_ESH); abWife(ctx, Wf, m); } }); }
  for (const q of abByY(L)) q.d();
  if (tc > 142.0) a5Cat(ctx, t, { x: 1230, y: SF.counter, gy: SF.counter, dir: -1, sit: 1, gaze: [-1, 0.2], tailCurl: 0.6 + 0.3 * osc(tc, 2.1) }, 'rgba(43,26,58,0.3)');
}
function a6S21Over(ctx, t, cam, S) { const tc = AB_T2(t);
  if (t > 135.18 && t < 138.0) { const p = K.clamp((t - 135.18) / 0.3) * (1 - K.clamp((t - 137.7) / 0.3)), [tx, ty] = abP(1660, 690, cam), bx = Math.min(tx - 120, 800), by = 330;
    a3PicBalloon(ctx, bx, by, 360, 220, [tx - 20, ty - 40], p, (c) => { abGrad(c, bx - 180, by - 110, 360, 220, [[0, '#ffb07a'], [1, '#ffe0a0']]); c.fillStyle = '#c88a6a'; c.fillRect(bx - 180, by + 40, 360, 70);
      const rows = t < 135.9 ? 1 : 3; for (let r = 0; r < rows; r++) abSilRow(c, bx - 150 + ((t * 120 + r * 50) % 120), by + 40 - r * 22, t + r * 0.3, 0.16 - r * 0.02, 1, 1, 7 + r);
      if (t > 136.52) { const n = Math.min(40, Math.floor((t - 136.52) / 0.6 * 40)); S.counter(c, n, bx + 120, by - 70, 1, { size: 48 }); } }); }
  if (t > 138.9 && t < 141.0) { const [bx, by] = abP(1460, 600, cam); a5Say(ctx, S, [[139.0, 'REMEMBER'], [139.6, 'REMEMBER CLEVER MORGIANA!']], t, Math.min(bx, 720), Math.max(by - 330, 230), [bx, by - 80], { size: 46, gone: 140.9 }); }
  if (t > 142.3) { const off = t < 142.8 ? [1, 0, 1, 1, 0, 1][Math.min(5, Math.floor((t - 142.3) * 12))] : 1; if (off) S.title(ctx, 'THE END', 500, 190, K.clamp((t - 142.3) / 0.8), { size: 86, align: 'center' }); if (t > 142.6 && t < 143.3) abGlint(ctx, 700, 150, 44, (t - 142.6) / 0.7); }
  if (t > 144.5) { const R = K.rng(3); ctx.save(); ctx.fillStyle = '#fff6ea'; for (let i = 0; i < 3; i++) { ctx.globalAlpha = K.clamp((t - 144.5 - i * 0.6) / 0.5) * (0.6 + 0.3 * Math.sin(t * 3 + i)); ctx.beginPath(); ctx.arc(150 + R() * 700, 90 + R() * 120, 3.5, 0, 7); ctx.fill(); } ctx.restore(); } }
AB_SHOTS.push({ a: 132.52, b: AB_DUR + 1, ww: 2000, cam: a5Cam([[132.52, { x: 1560, y: 630, zoom: 1.2 }], [137.4, { x: 1540, y: 630, zoom: 1.2 }], [141.0, { x: 1200, y: 630, zoom: 1.2 }], [143.0, { x: 1200, y: 610, zoom: 1.2 }], [AB_DUR, { x: 1180, y: 610, zoom: 1.2 }]]), world: a6S21World, over: a6S21Over });
