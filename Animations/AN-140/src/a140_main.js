// ===== AN-140 main: scene switch, cameras, letter flashback frame, balloons and clouds, lettering, transitions, panel, sound =====
// cuts (s): street 0, room 21.6 (wipe), hall 63.1 (wipe), room 86.6, street 122.4 (whip), letter 128.3 (match cut), street 149.6 (match cut), end 174.9
const A140_CUTS = [[0, 's12'], [21.6, 'room'], [63.1, 'hall'], [86.6, 'room'], [122.4, 's13'], [128.3, 'letter'], [149.6, 's1617']];
const a140Scene = (t) => { let s = 's12'; for (const [a, n] of A140_CUTS) if (t >= a) s = n; return s; };
function a140CamOf(sc, t) { let c, ww = 1000;
  if (sc === 's12') { c = K.camAt(A140_CAM12, t); ww = 1600; }
  else if (sc === 'room') c = K.camAt(A140_CAMROOM, t);
  else if (sc === 'hall') c = K.camAt(A140_CAMHALL, t);
  else if (sc === 's13') { c = K.camAt(A140_CAM13, t); ww = 1600; }
  else if (sc === 'letter') c = K.camAt(A140_CAMLET, t);
  else { c = K.camAt(A140_CAM1617, t); ww = 1600; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
function a140World(ctx, sc, t) { const cam = a140CamOf(sc, t); ctx.save(); K.camera(ctx, 1000, 1230, cam);
  const W = sc === 's12' ? a140S12World(ctx, t, cam) : sc === 'room' ? a140RoomWorld(ctx, t, cam) : sc === 'hall' ? a140S789World(ctx, t, cam) : sc === 's13' ? a140S13World(ctx, t, cam) : sc === 'letter' ? (t < 143.6 ? a140S14World(ctx, t, cam) : a140S15World(ctx, t, cam)) : a140S1617World(ctx, t, cam);
  ctx.restore(); return { W: W || {}, cam }; }
// the open letter's rect in the panel (match cuts)
function a140LetterRect(sc, t, wp) { const cam = a140CamOf(sc, t), [x, y, s] = wp, a = a140P(x - 75 * s, y - 100 * s, cam), b = a140P(x + 75 * s, y + 100 * s, cam); return [a[0], a[1], b[0], b[1]]; }
const A140_R13 = () => a140LetterRect('s13', 128.29, [1080, 815, 0.6]), A140_R16 = () => a140LetterRect('s1617', 149.6, [1100, 815, 0.6]);

// ---------- transitions ----------
function a140Wipe(ctx, t, c, col = C.yellow, lines = false) { if (!a140In(t, c - 0.22, c + 0.22)) return; const u = (t - c + 0.22) / 0.44, x = K.lerp(1500, -800, u);
  shape(ctx, [[x, -20], [x + 560, -20], [x + 300, 1250], [x - 260, 1250]], col, { lw: 12, seed: 3, dot: col === C.yellow ? C.red : C.white, pitch: 12, rad: 0.22, da: 0.5 });
  if (lines) for (let i = 0; i < 7; i++) seg(ctx, x + 620 + i * 50, 100 + i * 160, x + 1100 + i * 50, 100 + i * 160, 8, C.black, 0); }
const a140Shake = (t) => { for (const [h, a] of [[108.48, 4], [155.06, 3]]) if (t >= h && t < h + 0.2) return a * Math.sin((t - h) * 90) * (1 - (t - h) / 0.2); return 0; };

// ---------- the letter flashback: inner picture inside the letter frame ----------
function a140LetterInner(ctx, t, open, r0) { const [x0, y0, x1, y1] = a140LFRect(open, r0);
  ctx.save(); a140LFClip(ctx, open, r0);
  ctx.fillStyle = A140_PAPER; ctx.fillRect(0, 0, 1000, 1230);
  for (let i = 0; i < 9; i++) { const yy = y0 + (y1 - y0) * (0.16 + i * 0.085); ctx.beginPath(); for (let k = 0; k <= 30; k++) ctx.lineTo(K.lerp(x1 - 50, x0 + 50, k / 30), yy + 6 * Math.sin(k * 1.3 + i)); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(20,20,20,0.5)'; ctx.stroke(); }
  const wipe = t < 129.2 ? a140E(t, 128.45, 0.7) : 1; if (wipe > 0) { ctx.save(); ctx.beginPath(); ctx.rect(x1 - (x1 - x0) * wipe, 0, (x1 - x0) * wipe + 10, 1230); ctx.clip();
    ctx.translate(x0, y0); ctx.scale((x1 - x0) / 1000, (y1 - y0) / 1230); const R = a140World(ctx, 'letter', t);
    a140Wipe(ctx, t, 143.6, C.blue, false); ctx.restore(); ctx.restore(); a140LetterFrame(ctx, open, r0); return R; }
  ctx.restore(); a140LetterFrame(ctx, open, r0); return null; }
// the amount tags: panel positions in the letter (S14, S15) and the column in S16
const A140_TAGS = [['1,000,000', 'chest', 134.46], ['300,000', 'sack', 138.8], ['1,000,000', 'fadl', 146.56], ['1,000,000', 'jaafar', 147.36]];
const A140_TAGPOS = [[230, 170], [230, 330], [230, 470], [230, 555]], A140_COLPOS = [[185, 130], [185, 200], [185, 270], [185, 340]];

// ---------- balloon insides (balloon-local units) ----------
function a140PalaceIcon(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);
  shape(c, [[-120, 0], [-120, -150], [-90, -150], [-90, -175], [-60, -175], [-60, -150], [60, -150], [60, -175], [90, -175], [90, -150], [120, -150], [120, 0]], '#fff3d6', { lw: 5, seed: 740, dot: C.blue, pitch: 11, rad: 0.18, da: 0.35 });
  shape(c, townArchPts(-50, 50, -130, 0, 'pointed'), C.yellow, { lw: 5, seed: 741, dot: C.red, pitch: 8, rad: 0.2, da: 0.45 }); townDoor(c, -32, 32, -110, 0, 0, { arch: 'pointed', paint: '#a8261a' });
  const d = ell(0, -150, 40, 46, 24).filter(([, y]) => y <= -149); shape(c, d.concat([[-40, -150]]), C.yellow, { lw: 5, seed: 742 }); c.restore(); }
function a140NewsStrip(c, t) {   // the servant's news: door, four mules, loads, the messenger with the sealed letter, two medallions
  a140HouseIcon(c, -300, 110, 0.6, { door: 0.3 });
  for (let i = 0; i < 4; i++) { const t0 = [114.28, 114.6, 115.04, 115.3][i], k = K.clamp((t - t0) / 0.25); if (k <= 0) continue; const x = -170 + i * 92, hopY = 14 * Math.sin(Math.PI * k) * (k < 1 ? 1 : 0);
    const tl = 115.86 + stagger(i, 0.15), loaded = t >= tl, sq = loaded ? 1 - 0.07 * Math.exp(-(t - tl) * 6) : landSquash(t, t0 + 0.25, 0.1);
    const M = { x, y: 112 - hopY, s: 0.3, dir: 1, silhouette: true, sq, earL: 0.8 - 1.2 * pulse(t, t0 + 0.2, 0.25), tailSwish: Math.sin(t * 3 + i) };
    if (loaded) { const dy = Math.min(1, (t - tl) / 0.15); M.load = dy >= 1 ? ['chest', 'sack'] : []; }
    a140Mule(c, M);
    if (loaded && t - tl < 0.15) { const d = (t - tl) / 0.15; packLoad(c, ['chest', 'sack'], ...a140MuleBack(x, 112 - 60 * (1 - d), 0.3), 0.3); }
    if (t >= 116.98) a140Glint(c, x - 2, 20, 14, ((t - 116.98 - i * 0.2) % 1.1) / 0.45); }
  if (t >= 118.04) { const a = a140E(t, 118.04, 0.3), P = a140Who(A140_MSGR, { x: 195 - 30 * (1 - a), y: 118, s: 0.5, dir: -1, handL: [-30, -100], handR: [30, -100], noBlink: true });
    if (t >= 119.76) P.handR = [40, -215]; a140Sil(c, (k) => { k.globalAlpha *= a; person(k, P); });
    if (t >= 119.76) { const k = K.ease.back(K.clamp((t - 119.76) / 0.3)), hp = a140W(P, [40, -215]); a140Letter(c, hp[0], hp[1] - 14, 0.5 * k, { roll: 1, seal: true, rot: -0.2 }); } }
  if (t >= 120.86) a140Medal(c, 285, -48, 40 * K.ease.back(K.clamp((t - 120.86) / 0.3)), 'fadl', { gaze: [-0.5, 0.2] });
  if (t >= 121.54) a140Medal(c, 285, 52, 40 * K.ease.back(K.clamp((t - 121.54) / 0.3)), 'jaafar', { gaze: [-0.5, -0.2] });
}

// ---------- lettering and panel-space pieces ----------
function a140Over(ctx, t, sc, cam, W, S) {
  const P = (p) => a140P(p[0], p[1], cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= a140Env(t, a, b, 0.2); S.label(ctx, txt, x, y, a140E(t, a, 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= a140Env(t, a, b, 0.2); S.arrow(ctx, a0, a1, a140E(t, a, 0.4), { width: 16, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= a140Env(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  if (sc === 's12') {
    if (W.said && t < 3.3) { const h = P(W.said); lab('SAID', h[0] - 220, h[1] - 170, 0.4, 3.3, { size: 52 }); arr([h[0] - 190, h[1] - 140], [h[0] - 50, h[1] - 30], 0.5, 3.3, { bend: 0.2 }); }
    if (a140In(t, 3.24, 6.4)) { ctx.save(); ctx.globalAlpha *= a140Env(t, 3.24, 6.4, 0.25); S.title(ctx, "HARUN AL-RASHID'S BAGHDAD", 500, 150 + 10 * (1 - settleTo(t, 3.3, 0, 1, 0.4)), a140E(t, 3.3, 0.8), { size: 50, align: 'center' }); ctx.restore(); }
    if (W.stack && t >= 7.62 && t < 9.4) { const h = P(W.stack), n = A140_BILLT.filter((b) => t >= b).length; lab('DEBTS!', h[0] - 250, h[1] - 120, 7.7, 9.4, { size: 56, fill: C.yellow }); arr([h[0] - 210, h[1] - 80], [h[0] - 70, h[1] - 10], 7.75, 9.4, { bend: -0.15 });
      ctx.save(); ctx.globalAlpha *= a140Env(t, 7.62, 9.4, 0.2); S.counter(ctx, Math.min(n, 6), h[0] + 230, h[1] - 150, K.clamp((t - 7.62) / 0.3), { size: 70 }); ctx.restore(); }
    if (a140In(t, 11.95, 12.66)) { const d = P([1180, 640]); word('KNOCK! KNOCK!', d[0] - 40, d[1] - 120, 11.95, 12.7, 62, { rot: -0.08 }); }
    if (a140In(t, 12.66, 14.4)) { const n = Math.min(3, Math.floor((t - 12.66) / 0.48) + 1); ctx.save(); ctx.globalAlpha *= a140Env(t, 12.66, 14.4, 0.15); S.label(ctx, 'DAY ' + n, 190, 150, 1, { size: 56, fill: C.yellow, tilt: -0.04 }); ctx.restore(); }
  }
  if (sc === 'room') {
    if (a140In(t, 25.34, 29.0) && W.abd) { const h = P(W.abd); lab('ABDULLAH IBN MALIK', 640, 300, 25.34, 29.0, { size: 46 }); arr([700, 345], [h[0] + 10, h[1] - 80], 25.45, 29.0, { bend: 0.1 }); }
    if (a140In(t, 37.32, 41.4) && W.abd) { const h = P(W.abd), p = a140E(t, 37.32, 0.35, 'out') * (1 - a140E(t, 41.1, 0.3));
      a140Balloon(ctx, 500, 300, 400, 280, p, [h[0] - 20, h[1] - 60], (c) => { c.fillStyle = '#9cc4ff'; c.fillRect(-200, -140, 400, 280); c.fillStyle = dotPat(c, C.white, 12, 0.25); c.fillRect(-200, -140, 400, 280);
        shape(c, K.rectPts(-200, 100, 400, 40), SANDL, { lw: 4, seed: 750 }); a140PalaceIcon(c, 0, 104, 0.95);
        for (const [who, dx, t0] of [['fadl', -95, 37.84], ['jaafar', 95, 38.0]]) a140Medal(c, dx, -58, 44 * K.ease.back(K.clamp((t - t0) / 0.3)), who, { gaze: [dx > 0 ? -0.3 : 0.3, 0.2] }); });
      lab('THE BARMAKIDS', 500, 490, 37.9, 41.2, { size: 48, fill: C.yellow }); }
    if (a140In(t, 45.7, 52.0) && W.said) { const h = P(W.said), p = a140E(t, 45.7, 0.6, 'out') * (1 - a140E(t, 51.6, 0.4)); let palm = null;
      thoughtCloud(ctx, 440, 330, 560, 420, t, { p, tail: [h[0], h[1] - 50], bg: '#ffe9a8', scale: 0.42, at: [500, 760], inside: (c) => { palm = a140CloudFear(c, t); } });
      word('HMPH!', 760, 170, 48.38, 49.9, 76, { fill: C.red, rot: 0.1 });
      if (palm && t >= 51.38) { const pp = [440 + 0.42 * (palm[0] - 500), 330 + 0.42 * (palm[1] - 760)]; lab('NOTHING', 760, 450, 51.38, 52.0, { size: 48 }); arr([700, 420], [pp[0] + 10, pp[1]], 51.4, 52.0, { bend: 0.2 }); } }
    if (a140In(t, 59.5, 63.0) && W.abd) { const h = P(W.abd), p = a140E(t, 59.5, 0.35, 'out') * (1 - a140E(t, 62.6, 0.3));
      a140Balloon(ctx, 680, 300, 360, 270, p, [h[0] + 10, h[1] - 60], (c) => { c.fillStyle = '#9cc4ff'; c.fillRect(-180, -135, 360, 270); shape(c, K.rectPts(-180, 95, 360, 40), '#d9c69a', { lw: 4, seed: 751 });
        const sh = t >= 61.28 ? tremble(t, 2, 11) : 0, crowd = a140E(t, 61.28, 0.6); a140HouseIcon(c, 0, 100, 0.85, { shiver: sh });
        for (let i = 0; i < 3; i++) { const t0 = 60.44 + i * 0.28; if (t < t0) continue; const k = K.ease.back(K.clamp((t - t0) / 0.3)), x0 = [-140, 120, 150][i], x1 = [-60, 70, 105][i], P2 = a140Cred(i, t, K.lerp(x0, x1, crowd), { y: 110 - 6 * Math.abs(Math.sin(t * 6 + i * 2)), s: 0.42 * k, dir: i === 0 ? 1 : -1, handL: [-30, -230], handR: [30, -100], noBlink: true });
          a140Sil(c, (q) => { person(q, P2); a140HeldBill(q, a140W(P2, [-30, -230]), 0.4 * k, 0.1); }); } }); }
    if (a140In(t, 101.78, 107.0) && W.said) { const h = P(W.said), p = a140E(t, 101.78, 0.6, 'out');
      thoughtCloud(ctx, 400, 340, 500, 360, t, { p, tail: [h[0], h[1] - 50], bg: '#9cc4ff', scale: 0.75, at: [600, 760], inside: (c) => a140CloudDoor(c, t) }); }
    if (W.serv) word('BANG!', 230, 420, 108.55, 109.6, 110, { fill: C.yellow, rot: -0.12 });
    if (a140In(t, 112.88, 122.4) && W.serv) { const h = P(W.serv), p = a140E(t, 112.88, 0.35, 'out');
      a140Balloon(ctx, 500, 330, 760, 250, p, [h[0] + 20, h[1] - 60], (c) => { c.fillStyle = '#fff3d6'; c.fillRect(-380, -125, 760, 250); c.fillStyle = dotPat(c, C.blue, 12, 0.18); c.fillRect(-380, -125, 760, 250); a140NewsStrip(c, t); });
      if (t >= 115.04) { ctx.save(); ctx.globalAlpha *= a140Env(t, 115.04, 122.4, 0.2); S.counter(ctx, 4, 650, 535, K.clamp((t - 115.04) / 0.3), { size: 52 }); ctx.restore(); word('x', 590, 522, 115.04, 122.4, 46, { fill: C.white }); } }
  }
  if (sc === 'hall') {
    if (W.fadl && t < 71.0) { const f = P(W.fadl), j = P(W.jaafar), sh = t >= 67.44 ? 1 - 0.2 * a140E(t, 67.44, 0.3) : 1;
      lab('AL-FADL', f[0] - 40, f[1] - 190, 64.9, 71.0, { size: 44 * sh }); arr([f[0] - 30, f[1] - 160], [f[0] - 5, f[1] - 60], 64.95, 71.0, { bend: 0.1, width: 13 });
      lab('JAAFAR', j[0] + 40, j[1] - 250, 65.5, 71.0, { size: 44 * sh }); arr([j[0] + 40, j[1] - 220], [j[0] + 5, j[1] - 60], 65.55, 71.0, { bend: -0.1, width: 13 });
      if (t >= 67.44) { ctx.save(); ctx.globalAlpha *= a140Env(t, 67.44, 71.0, 0.2); S.title(ctx, 'SONS OF YAHYA', 500, 150, a140E(t, 67.44, 0.7), { size: 54, align: 'center' }); ctx.restore(); } }
    if (a140In(t, 71.08, 72.4) && W.said) { const h = P(W.said), p = a140E(t, 71.08, 0.3, 'out') * (1 - a140E(t, 72.1, 0.3));
      a140Balloon(ctx, h[0] + 40, h[1] - 250, 230, 200, p, [h[0] + 10, h[1] - 50], (c) => { a140HouseIcon(c, 50, 90, 0.42); for (let i = 0; i < 6; i++) a140Bill(c, -55 + (i % 2) * 6, 80 - i * 26, 0.62, { flat: 0.55, rot: (i % 2 ? 0.08 : -0.06) }); }); }
    if (a140In(t, 80.98, 83.9) && W.palm) { const p = P(W.palm); lab('NO MONEY', p[0] + 150, p[1] - 230, 80.98, 83.9, { size: 56 }); arr([p[0] + 120, p[1] - 190], [p[0] + 10, p[1] - 30], 81.05, 83.9, { bend: 0.15 }); }
  }
  if (sc === 'letter' || (sc === 's1617' && t < 150.84)) { // tags in the letter
    for (let i = 0; i < 4; i++) { const [txt, ic, t0] = A140_TAGS[i]; if (t < t0) continue; const k = t < t0 + 0.3 ? settleTo(t, t0, 1.6, 1, 0.3, 0.1) : 1; const [x, y] = A140_TAGPOS[i];
      const a = sc === 's1617' ? 1 - a140E(t, 149.6, 0.3) : 1; ctx.save(); ctx.globalAlpha *= a; a140Tag(ctx, x, y, 1, txt, A140_TAG_ICON[ic], { s: k }); ctx.restore(); }
    if (sc === 'letter') { lab('FOR THE DEBT', 230, 250, 135.92, 143.6, { size: 34 }); lab('TO LIVE ON', 230, 410, 140.7, 143.6, { size: 34 }); }
  }
  if (sc === 's1617') {
    if (t >= 150.84 && t < 157.6) { const src = P([W.letter[0], W.letter[1]]), a = 1 - a140E(t, 157.2, 0.4);
      for (let i = 0; i < 4; i++) { const t0 = 150.84 + stagger(i, 0.07), u = a140E(t, t0, 0.45, 'out'); if (u <= 0) continue; const [x, y] = A140_COLPOS[i];
        ctx.save(); ctx.globalAlpha *= a; a140Tag(ctx, K.lerp(src[0], x, u), K.lerp(src[1], y, u) - 80 * Math.sin(Math.PI * u), 1, A140_TAGS[i][0], A140_TAG_ICON[A140_TAGS[i][1]], { s: K.lerp(0.3, 0.8, u), size: 46 }); ctx.restore(); }
      if (t >= 153.2) { const roll = t < 155.06 ? Math.min(3, Math.floor((t - 153.2) / 0.6) + 1) * 1000000 : 3300000, k = t >= 155.06 ? settleTo(t, 155.06, 1.25, 1, 0.3, 0.12) : 1;
        ctx.save(); ctx.globalAlpha *= a; ctx.translate(250, 490); ctx.scale(k, k); S.counter(ctx, roll, 0, 0, K.clamp((t - 153.2) / 0.3), { size: 66 }); ctx.restore();
        if (t >= 155.06) { ctx.save(); ctx.globalAlpha *= a * (1 - a140E(t, 155.3, 0.6)); S.emphasis(ctx, 250, 470, 170, a140E(t, 155.06, 0.4), { word: 'WOW!' }); ctx.restore(); }
        lab('DIRHAMS', 250, 585, 156.68, 157.6, { size: 46, fill: C.yellow }); } }
    if (a140In(t, 159.66, 166.9) && W.said) { const h = P(W.said), p = a140E(t, 159.66, 0.6, 'out') * (1 - a140E(t, 166.56, 0.3));
      thoughtCloud(ctx, 470, 330, 620, 430, t, { p, tail: [h[0] - 20, h[1] - 60], bg: '#9cc4ff', scale: 0.8, at: [640, 770], inside: (c) => a140CloudTruth(c, t) }); }
    if (t >= 172.2) { const k = a140E(t, 172.2, 0.9); S.title(ctx, 'THE END', 500, 170, k, { size: 86, align: 'center' }); const hk = K.ease.back(K.clamp((t - 172.6) / 0.4)); if (hk > 0) heart(ctx, 760, 110 - 8 * Math.sin((t - 172.6) * 2), 28 * hk); }
  }
}

const SCENE = {
  duration: A140_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = a140Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh, py - sh * 0.6); ctx.scale(pw / 1000, ph / 1230);
    const sc = a140Scene(t); let R;
    if (sc === 'letter' && t >= 128.75) { ctx.fillStyle = A140_PAPER; ctx.fillRect(0, 0, 1000, 1230); R = a140LetterInner(ctx, t, 1, A140_R13()) || { W: {}, cam: a140CamOf('letter', t) }; }
    else if (sc === 'letter') { a140World(ctx, 's13', t); R = a140LetterInner(ctx, t, a140E(t, 128.3, 0.45), A140_R13()) || { W: {}, cam: a140CamOf('letter', t) }; }
    else if (sc === 's1617' && t < 149.95) { R = a140World(ctx, 's1617', t); a140LetterInner(ctx, t, 1 - a140E(t, 149.6, 0.35), A140_R16()); }
    else R = a140World(ctx, sc, t);
    a140Over(ctx, t, sc, R.cam, R.W, S);
    a140Wipe(ctx, t, 21.6); a140Wipe(ctx, t, 63.1); a140Wipe(ctx, t, 122.4, C.blue, true);
    if (t >= 105.3 && t < 107.6) S.transition(ctx, 1000, 1230, (t - 105.3) / 2.3, { caption: 'SOON...' });
    if (t < 0.5) { ctx.save(); ctx.globalAlpha = 1 - a140E(t, 0, 0.5); ctx.fillStyle = C.paper || A140_PAPER; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // exactly the plan's five effects, in the measured narration gaps (9.16-9.52, 21.34-21.84, 122.24-122.66, 169.06-169.58) and after the last word (171.62)
    k.bed(S.sfx.bed, 0, A140_DUR, 0.5);
    k.play('thud', 9.34, { gain: 0.45 });                // the stack hits the ground
    k.play('whoosh', 21.6, { gain: 0.3, dur: 0.22 });    // wipe to Abdullah's room
    k.play('whoosh', 122.45, { gain: 0.32, dur: 0.22 }); // whip to the street
    k.play('chime', 169.3, { note: 'E6', gain: 0.45 });  // morning
    k.play('chime', 172.2, { note: 'C6', gain: 0.6 });   // THE END
  },
};
window.SCENE = SCENE;
