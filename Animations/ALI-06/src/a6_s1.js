// ===== ALI-06 shots S1-S10 (0-71.14): the night courtyard (a6_yard.js world), the ring insert, the memory inset, the stand-off,
// the names, the guards, the map card, the procession. Balloons and tags are panel lettering (a5Say / a2Tag clamp them inside).
const a6Head = (P, B, cam) => abP(...a2HeadPt(P, 0, 10, B), cam);

// ---------- S1 0-3.5 the ALI-05 end framing: she brings the gift, folds back the cuff ----------
function a6S1Over(ctx, t, cam, S) {
  if (t >= 0.3 && t < 3.3) { const off = t < 0.7 ? [1, 0, 1, 1, 0][Math.min(4, Math.floor((t - 0.3) * 12))] : 1, fade = 1 - K.clamp((t - 2.8) / 0.4);
    if (off && fade > 0) { ctx.save(); ctx.globalAlpha *= fade; S.title(ctx, "MORGIANA'S CLEVER PLAN", 500, 170, K.clamp((t - 0.3) / 0.9), { size: 56, align: 'center' });
      if (t > 0.7) S.title(ctx, 'خطة مرجانة الذكية', 500, 290, K.clamp((t - 0.7) / 0.9), { size: 72, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); if (t > 0.9 && t < 1.5) abGlint(ctx, 820, 130, 40, (t - 0.9) / 0.6); ctx.restore(); } }
  if (t > 1.52 && t < 2.4) { const G = a6G(t).P, [hx, hy] = abP(...a2Hand(G, 1, A5_NM), cam); a2Tag(ctx, S, 'FLIP!', hx - 10, hy - 110, t, 1.56, 2.2, { size: 38 }); }
}
AB_SHOTS.push({ a: 0, b: 3.5, ww: 2200, cam: a5Cam([[0, { x: 510, y: 588, zoom: 1.25 }], [0.6, { x: 510, y: 588, zoom: 1.25 }], [2.4, { x: 450, y: 592, zoom: 1.3 }], [3.5, { x: 445, y: 592, zoom: 1.3 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S1Over });

// ---------- S1 insert 3.5-7.6: his hand on the gift box, the ring large, her fingers on the folded cuff ----------
function a6RingPt(x, y, k, rot) { const lx = 14 * k, ly = 90.8 * k, c = Math.cos(rot), s = Math.sin(rot); return [x + lx * c - ly * s, y + lx * s + ly * c]; }
function a6RingHand(ctx, t, x, y, k, rot, o = {}) {
  if (!o.noBox) giftBox(ctx, x + 10, y + 300 * k / 2.6 + 250, 5.2, { glint: 0 });
  a3BigHand(ctx, x, y, k, { sleeve: '#f6e2c0', sleeveD: '#d8b88a', rot, ring: { glint: o.glint || 0 }, curl: 0.25 });
  // the folded-back cuff: a cream roll across the wrist with a gold edge; her two fingers on it from the left
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); celShade(ctx, [[-72, -78], [72, -78], [74, -40], [-74, -40]], '#fff1d8', '#d8b88a', { light: [-1, -1], off: 8, lw: 3.5, line: '#8a6a3a' }); seg(ctx, -70, -44, 70, -44, 4, '#ffcf3a', 0);
  if (o.her) for (const fy of [-66, -50]) celShade(ctx, [[-160, fy - 7], [-60, fy - 8], [-52, fy], [-60, fy + 8], [-160, fy + 8]], '#f7c6a3', '#e0a080', { light: [-1, -1], off: 4, lw: 3, line: '#6a3a2a' });
  ctx.restore();
  const [rx, ry] = a6RingPt(x, y, k, rot), r = 20 * k;
  if ((o.stone || 0) > 0) abGlow(ctx, rx, ry - r * 0.55, r * (2.5 + 0.3 * Math.sin(t * 6)), o.stone, '#3a8ae8');
  if ((o.crack || 0) > 0) { const p = o.crack, ax = rx - r * 0.35, ay = ry - r * 0.9, bx = rx + r * 0.3, by = ry - r * 0.2, sh = 3 * p; ctx.save(); ctx.strokeStyle = '#e8f6ff'; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 14; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax - sh, ay); ctx.lineTo(K.lerp(ax, bx, p) - sh, K.lerp(ay, by, p)); ctx.stroke(); ctx.restore(); }
  return [rx, ry]; }
function a6S1Insert(ctx, t, S) { const tc = AB_T2(t), push = kfn(t, [[3.5, 1.0], [7.6, 1.08]], 'lin');
  a3WallBg(ctx, '#9a8ac8', { seed: 11 }); abGlaze(ctx, 760, 260, 520, '#ffcf7a', 0.45); abGlaze(ctx, 200, 1000, 500, '#7fe3ff', 0.18);
  ctx.save(); ctx.translate(540, 600); ctx.scale(push, push); ctx.translate(-540, -600);
  const tr = tc < 6.9 ? 1.2 * Math.sin(tc * 13) : 0, gl = Math.max(t > 4.46 && t < 5.1 ? (t - 4.46) / 0.64 : 0, t > 3.6 && t < 4.2 ? (t - 3.6) / 0.6 : 0), stone = t > 5.66 ? K.clamp((t - 5.66) / 0.3) * (0.8 + 0.2 * Math.sin(t * 5)) : 0;
  const crack = Math.floor(K.clamp((t - 6.86) / 0.5) * 4) / 4, R1 = a6RingHand(ctx, t, 520 + tr, 260, 2.6, 0.04, { glint: gl, stone, crack, her: 1 });
  if (t > 3.6 && t < 4.4) abBands(ctx, [180, 200, 700, 700], t - 3.6, { n: 1, w: 60, speed: 900, alpha: 0.35, cols: ['#ffffff'] });
  if (t > 7.0) { const th = beatIn(tc, 7.0, 7.5); ctx.save(); ctx.translate(R1[0] + 120 - 40 * th, R1[1] + 10); celShade(ctx, [[-30, -22], [70, -26], [80, 0], [70, 24], [-30, 22]], '#f0b890', '#c88a6a', { light: [-1, -1], off: 8, lw: 3.5, line: '#6a3a2a' }); ctx.restore(); }
  ctx.restore();
  if (t > 5.8 && t < 7.0) a6Streak(ctx, S, [880, 180], [R1[0] + 40, R1[1] - 60], t, 5.8, 6.8);
  if (t > 6.9 && t < 7.6) a2Tag(ctx, S, 'THE SPLIT STONE!', 500, 1100, t, 6.95, 7.5, { size: 48 });
}
AB_SHOTS.push({ a: 3.5, b: 7.6, panel: a6S1Insert });

// ---------- S2 7.6-11.2: two-shot, the memory of the night of the jars ----------
function a6S2Over(ctx, t, cam, S) { const tc = AB_T2(t), rect = [70, 110, 440, 330], shrink = beatIn(t, 10.75, 11.15);
  if (t < 8.4) return; const G = a6G(t).P, [hx, hy] = abP(...a2Hand(G, 1, A5_NM), cam);
  if (shrink > 0) { ctx.save(); const cx = K.lerp(290, hx, shrink), cy = K.lerp(275, hy, shrink), k = 1 - shrink; ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-290, -275); }
  memoryPanel(ctx, t, rect, K.clamp((t - 8.4) / 0.3), (c) => {
    c.save(); c.translate(70, 110); c.scale(0.44, 0.44); c.translate(-560, -380); cySky(c, { x: 1100, y: 615, zoom: 1 }, 'night'); c.drawImage(cyPlate('night'), 0, 0); cyLanterns(c, t, 1);
    for (let i = 0; i < 6; i++) oilJar(c, CY.jars[i], CY.jarY, CY.jarS, i === 2 && tc > 9.94 ? { xs: CY.jarXs, t, peek: { lift: beatIn(tc, 9.94, 10.2), eyes: 1, gaze: [1, 0], blink: abLid(t, 77) } } : { xs: CY.jarXs }); c.restore();
    const rap = tc > 9.02 && tc < 9.94 ? Math.abs(Math.sin((tc - 9.02) * 7)) * 22 : 0; a3BigHand(c, 316, 70 - rap, 0.9, { sleeve: '#d8a43a', sleeveD: '#a8781e', curl: 1, ring: { glint: rap > 15 ? 1 : 0 }, rot: -0.3 });
  }, { wash: 0.08 });
  if (shrink > 0) ctx.restore();
  if (t > 10.75 && t < 11.2) abGlint(ctx, hx, hy, 30, (t - 10.75) / 0.45);
  if (t > 8.5 && t < 10.7) a2Tag(ctx, S, 'THE NIGHT OF THE JARS', 290, 480, t, 8.5, 10.5, { size: 34 });
}
AB_SHOTS.push({ a: 3.5 + 4.1, b: 11.2, ww: 2200, cam: a5Cam([[7.6, { x: 470, y: 620, zoom: 1.35 }], [11.2, { x: 450, y: 620, zoom: 1.35 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S2Over });

// ---------- S3 11.2-16.45 wide: THIS PROVES WHO YOU ARE. the box drops, the light band, the household ----------
function a6S3Over(ctx, t, cam, S) { const M = a6M(t).P, [mx, my] = a6Head(M, A3_MORG, cam);
  if (t > 12.4 && t < 15.3) a5Say(ctx, S, [[12.44, 'THIS PROVES WHO YOU ARE.']], t, mx + 60, my - 230, [mx, my - 40], { size: 46, gone: 15.0 });
  if (t > 13.5 && t < 14.2) { const [bx, by] = abP(440, 900, cam); a2Tag(ctx, S, 'THUD', bx + 40, by - 60, t, 13.52, 14.0, { size: 32 }); }
}
AB_SHOTS.push({ a: 11.2, b: 16.45, ww: 2200, cam: a5Cam([[11.2, { x: 420, y: 600, zoom: 1.12 }], [16.45, { x: 440, y: 600, zoom: 1.12 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S3Over });

// ---------- S4 16.45-23.6: the step back, the dash, the heaves, the bar, the key ----------
function a6S4Over(ctx, t, cam, S) {
  if (t > 19.3 && t < 22.0) for (const [a, s] of [[19.35, 40], [21.1, 34], [21.48, 28]]) { const [gx, gy] = abP(760, 700, cam); a2Tag(ctx, S, 'RATTLE', gx + (s - 34) * 3, gy - 40 - (s - 28) * 2, t, a, a + 0.4, { size: s }); }
  if (t > 22.86 && t < 23.9) { const [gx, gy] = abP(CY.gate.cx, CY.gate.top, cam); a2Tag(ctx, S, 'LOCKED!', gx, gy - 50, t, 22.86, 23.6, { size: 46 }); }
}
AB_SHOTS.push({ a: 16.45, b: 23.6, ww: 2200, cam: a5Cam([[16.45, { x: 440, y: 600, zoom: 1.12 }], [18.4, { x: 450, y: 600, zoom: 1.12 }], [19.3, { x: 590, y: 600, zoom: 1.2 }], [21.9, { x: 590, y: 600, zoom: 1.2 }], [23.0, { x: 540, y: 600, zoom: 1.12 }], [23.6, { x: 540, y: 600, zoom: 1.12 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S4Over });

// ---------- S5 23.6-35.58: the palm, NOBODY LEAVES BEFORE THE GUARDS ARRIVE., the spear tips ----------
function a6S5Over(ctx, t, cam, S) { const M = a6M(t).P, [mx, my] = a6Head(M, A3_MORG, cam);
  if (t > 25.5 && t < 26.4) a2Tag(ctx, S, 'STAY BACK.', mx - 140, my - 150, t, 25.5, 26.2, { size: 36 });
  if (t > 30.4 && t < 34.5) a5Say(ctx, S, [[30.48, 'NOBODY LEAVES BEFORE'], [31.6, 'NOBODY LEAVES BEFORE THE GUARDS ARRIVE.']], t, mx + 120, my - 250, [mx, my - 40], { size: 42, gone: 34.2 });
  if (t > 26.6 && t < 27.4) { const A = a6A(t).P, [ax, ay] = a6Head(A, { s: 0.95, age: 0.25 }, cam); a3Q(ctx, S, ax, ay - 110, t, 26.7, 27.3, { size: 40 }); }
}
AB_SHOTS.push({ a: 23.6, b: 35.58, ww: 2200, cam: a5Cam([[23.6, { x: 430, y: 600, zoom: 1.12 }], [29.2, { x: 430, y: 600, zoom: 1.12 }], [31.0, { x: 560, y: 600, zoom: 1.12 }], [33.4, { x: 600, y: 600, zoom: 1.12 }], [34.6, { x: 640, y: 570, zoom: 1.12 }], [35.58, { x: 650, y: 570, zoom: 1.12 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S5Over });

// ---------- S6 35.58-44.78: the mask back on, I AM ONLY A TRAVELING MERCHANT!, the forgotten name, HASAN ----------
function a6TagsAt(t, cam) { const G = a6G(t).P, [gx, gy] = a6Head(G, A5_NM, cam); return [gx, gy]; }
function a6S6Over(ctx, t, cam, S) { const G = a6G(t).P, [gx, gy] = a6Head(G, A5_NM, cam);
  if (t > 38.4 && t < 40.9) a5Say(ctx, S, [[38.5, 'I AM ONLY A'], [39.3, 'I AM ONLY A TRAVELING MERCHANT!']], t, gx - 60, gy - 260, [gx, gy - 50], { size: 42, gone: 40.7 });
  if (t > 41.8 && t < 42.6) { const p = K.clamp((t - 41.84) / 0.3); thoughtCloud(ctx, gx + 40, gy - 270, 300, 190, t, { p, tail: [gx, gy - 70], seed: 7 }); nameTag(ctx, '', gx + 40, gy - 330, p, { blank: 1, swing: 0.4 * Math.sin(AB_T2(t) * 8) }); }
  if (t > 42.4 && t < 44.2) a5Say(ctx, S, [[42.48, 'MY NAME IS...'], [43.0, 'MY NAME IS... ER...'], [43.4, 'MY NAME IS... ER... HASAN!']], t, gx - 40, gy - 270, [gx, gy - 50], { size: 42, gone: 43.9 });
  if (t > 43.85) { const p = K.clamp((t - 43.85) / 0.25), y = K.lerp(gy - 300, 230, K.ease.inOut(beatIn(t, 43.9, 44.5))); nameTag(ctx, 'HASAN', K.lerp(gx, gx - 80, beatIn(t, 43.9, 44.5)), y, p, { swing: swing(t, 43.5, 0.3, 1.2, 1.5) + 0.04 * Math.sin(t * 2) }); }
}
AB_SHOTS.push({ a: 35.58, b: 44.78, ww: 2200, cam: a5Cam([[35.58, { x: 540, y: 610, zoom: 1.22 }], [44.78, { x: 570, y: 610, zoom: 1.22 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S6Over });

// ---------- S7 44.78-54.21: WHAT IS YOUR SHOP CALLED? KARIM'S! two tags and the glyph, the lean ----------
function a6S7Over(ctx, t, cam, S) { const G = a6G(t).P, N = a6N(t).P, [gx, gy] = a6Head(G, A5_NM, cam), [nx, ny] = a6Head(N, A5_NEPH, cam), sw = 0.05 * Math.sin(AB_T2(t) * 2.2);
  if (t > 46.2 && t < 48.5) a5Say(ctx, S, [[46.24, 'WHAT IS YOUR'], [46.9, 'WHAT IS YOUR SHOP CALLED?']], t, nx - 20, ny - 260, [nx, ny - 50], { size: 42, gone: 48.3 });
  if (t > 47.76 && t < 48.7) { const p = K.clamp((t - 47.76) / 0.2) * (1 - K.clamp((t - 48.4) / 0.2)); a3PicBalloon(ctx, nx + 150, ny - 120, 200, 130, [nx + 30, ny - 50], p, (c) => { c.save(); c.translate(nx + 150, ny - 120); c.scale(0.32, 0.32); c.translate(-1110, -700); shopFront(c, t, { sign: 0.05 }); c.restore(); }); }
  if (t > 48.4 && t < 49.5) a5Say(ctx, S, [[48.46, "KARIM'S!"]], t, gx + 40, gy - 220, [gx, gy - 50], { size: 54, gone: 49.2 });
  // the two tags above the wall (HASAN already there from S6), KARIM drops beside it, the not-equal glyph stamps between them
  const tx = (t < 50.4 ? gx : abP(640, 0, cam)[0]), ty = 200;
  nameTag(ctx, "HASAN", tx - 190, ty, 1, { swing: sw }); if (t > 49.26) nameTag(ctx, "KARIM", tx + 190, ty - 30 * (1 - K.clamp((t - 49.26) / 0.2)), 1, { swing: swing(t, 49.3, 0.35, 1.3, 1.4) + sw });
  if (t > 49.7) notEqual(ctx, tx, ty + 70, beatIn(t, 49.7, 49.95), 1);
  if (t > 52.06 && t < 53.6) { const heads = [[a6M(t).P, A3_MORG], [a6A(t).P, { s: 0.95, age: 0.25 }], [N, A5_NEPH], [a6Wife(t), { s: 0.92, age: 0.25 }]]; heads.forEach(([P, B], i) => { const [hx, hy] = a6Head(P, B, cam); if (hx > 40 && hx < 960) a5Glyph(ctx, 'q', hx, hy - 120, 1, K.clamp((t - 52.06 - 0.16 * i) / 0.2) * (1 - K.clamp((t - 53.3) / 0.2))); }); }
  if (t > 53.6 && t < 54.21) { const [bx, by] = abP(1590, 700, cam); a2Tag(ctx, S, 'KNOCK KNOCK', Math.min(bx, 860), by, t, 53.62, 54.2, { size: 32 }); }
}
AB_SHOTS.push({ a: 44.78, b: 54.21, ww: 2200, cam: a5Cam([[44.78, { x: 520, y: 620, zoom: 1.3 }], [50.4, { x: 520, y: 620, zoom: 1.3 }], [51.0, { x: 430, y: 600, zoom: 1.12 }], [52.4, { x: 400, y: 600, zoom: 1.12 }], [53.2, { x: 520, y: 605, zoom: 1.15 }], [54.21, { x: 540, y: 605, zoom: 1.15 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S7Over });

// ---------- S8 54.21-59.98: the back gate, the guards, the half ring, empty hands ----------
function a6S8Over(ctx, t, cam, S) {
  if (t > 55.9 && t < 57.2) a6Streak(ctx, S, abP(CY.gate.cx, 600, cam), abP(1590, 600, cam), t, 55.9, 56.9);
  if (t > 55.95 && t < 57.0) { const [bx, by] = abP(1590, 560, cam); a2Tag(ctx, S, 'THE OTHER DOOR!', bx, by - 50, t, 56.0, 56.9, { size: 38 }); }
  if (t > 57.08 && t < 58.0) for (let k = 0; k < 3; k++) { const [sx, sy] = abP(A6_GUARDX[k](57.3), 920, cam); a2Tag(ctx, S, 'TOK', sx, sy - 10 - 44 * k, t, 57.08 + 0.25 * k, 57.5 + 0.25 * k, { size: 28 }); }
}
AB_SHOTS.push({ a: 54.21, b: 59.98, ww: 2200, cam: a5Cam([[54.21, { x: 540, y: 605, zoom: 1.15 }], [54.6, { x: 1430, y: 600, zoom: 1.1 }], [56.4, { x: 1400, y: 600, zoom: 1.1 }], [57.6, { x: 1000, y: 600, zoom: 1.05 }], [59.98, { x: 990, y: 600, zoom: 1.05 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S8Over });

// ---------- S9 59.98-67.28: the ring names him, the map ----------
function a6S9Over(ctx, t, cam, S) { const G = a6G(t).P, [rx, ry] = abP(...a2Hand(G, 1, A5_NM), cam);
  if (t > 62.58 && t < 64.6) { const p = K.clamp((t - 62.58) / 0.25) * (1 - K.clamp((t - 64.3) / 0.3)), cx = 300, cy = 330, r = 150 * K.ease.back(p);
    if (p > 0) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#fff1d8'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#2b1a3a'; ctx.stroke(); ctx.clip(); a3WallBg(ctx, '#9a8ac8', { seed: 4 }); a6RingHand(ctx, t, cx - 22, cy - 150, 1.6, 0.04, { glint: (t * 1.5) % 1, stone: 0.8, crack: 1, noBox: 1 }); ctx.restore(); ctx.save(); ctx.globalAlpha *= p; S.arrow(ctx, [cx + r * 0.7, cy + r * 0.7], [rx, ry], 1, { color: '#7fe3ff', bend: 0.2 }); ctx.restore(); } }
  if (t > 65.0 && t < 67.2) { const p = K.clamp((t - 65.18) / 0.3) * (1 - K.clamp((t - 66.9) / 0.25)), draw = K.clamp((t - 66.0) / 0.54);
    if (p > 0) { ctx.save(); ctx.translate(500, 420); ctx.scale(K.ease.back(p), K.ease.back(p)); ctx.translate(-500, -420);
      ctx.fillStyle = '#fff1d0'; ctx.beginPath(); ctx.roundRect(240, 230, 520, 380, 18); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#7a5a2a'; ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.roundRect(240, 230, 520, 380, 18); ctx.clip(); abGrad(ctx, 240, 230, 520, 380, [[0, '#fff1d0'], [1, '#f0dcb0']]);
      for (const [hx, hy] of [[420, 420], [560, 380], [680, 430]]) celShade(ctx, [[hx - 90, hy + 60], [hx, hy - 40], [hx + 90, hy + 60]], '#a8d890', '#78b070', { off: 8, lw: 3, line: '#4a7a3a' });
      celShade(ctx, K.rectPts(280, 500, 70, 50), '#f0c890', '#c89a5a', { off: 5, lw: 3, line: '#6a4a24' }); celShade(ctx, [[272, 500], [315, 468], [358, 500]], '#e8364f', '#a81a2a', { off: 4, lw: 3 });
      abRock(ctx, 690, 520, { s: 0.14, model: 'afternoon' });
      ctx.strokeStyle = '#e8364f'; ctx.lineWidth = 6; ctx.setLineDash([12, 10]); ctx.beginPath(); const pts = [[350, 525], [430, 545], [520, 500], [600, 540], [660, 510]], n = Math.floor(draw * (pts.length - 1) * 8) / 8;
      ctx.moveTo(...pts[0]); for (let i = 1; i <= Math.ceil(n); i++) { const u = Math.min(1, n - (i - 1)); ctx.lineTo(K.lerp(pts[i - 1][0], pts[i][0], u), K.lerp(pts[i - 1][1], pts[i][1], u)); } ctx.stroke(); ctx.setLineDash([]);
      if (t > 66.54) { const s = 1 + 0.6 * (1 - K.clamp((t - 66.54) / 0.15)); ctx.save(); ctx.translate(690, 470); ctx.scale(s, s); ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-22, -22); ctx.lineTo(22, 22); ctx.moveTo(22, -22); ctx.lineTo(-22, 22); ctx.stroke(); ctx.restore(); }
      ctx.restore(); ctx.restore(); a2Tag(ctx, S, 'MAP TO THE CAVE', 500, 650, t, 65.3, 66.9, { size: 40 }); } }
  if (t > 66.6 && t < 67.28) { const A = a6A(t).P, [ax, ay] = a6Head(A, { s: 0.95, age: 0.25 }, cam); a2Tag(ctx, S, 'NOD', Math.max(ax, 120), ay - 110, t, 66.6, 67.2, { size: 30 }); }
}
AB_SHOTS.push({ a: 59.98, b: 67.28, ww: 2200, cam: a5Cam([[59.98, { x: 860, y: 625, zoom: 1.25 }], [63.4, { x: 870, y: 625, zoom: 1.25 }], [64.2, { x: 920, y: 625, zoom: 1.25 }], [67.28, { x: 910, y: 625, zoom: 1.25 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S9Over });

// ---------- S10 67.28-71.14: the key, the procession, TO THE JUDGE!, the look back ----------
function a6S10Over(ctx, t, cam, S) {
  if (t > 67.3 && t < 67.9) { const [px, py] = abP(CY.gate.cx, CY.gate.bar, cam); a2Tag(ctx, S, 'CLICK', px + 70, py - 70, t, 67.32, 67.8, { size: 32 }); }
  if (t > 69.1 && t < 70.4) { const C3 = a6Guard(t, 3).P, [cx, cy] = a6Head(C3, A4_GUARDS[3], cam); a5Say(ctx, S, [[69.16, 'TO THE JUDGE!']], t, cx + 80, cy - 230, [cx, cy - 50], { size: 46, gone: 70.2 }); }
}
AB_SHOTS.push({ a: 67.28, b: 70.72, ww: 2200, cam: a5Cam([[67.28, { x: 760, y: 605, zoom: 1.12 }], [68.4, { x: 760, y: 605, zoom: 1.12 }], [70.72, { x: 690, y: 605, zoom: 1.12 }]]), world: (c, t, cam) => a6YardWorld(c, t, cam), over: a6S10Over });
