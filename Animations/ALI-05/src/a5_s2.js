// ===== ALI-05 shots S5-S6 (35 - 51 s): THAT EVENING the guest arrives in fine clothes; Morgiana at the window; the salute, the
// ring insert, the memory panel (THE SAME RING!), CLUES 1 =====
const A5_EV = 'dusk';
const A5_GX2 = (u) => kfn(u, [[35.0, 260], [38.3, 780], [50.0, 780], [50.8, 925]]);
function a5Guest2(t) {
  const tc = AB_T2(t), W = walk(A5_GX2, tc, { stride: 30 }), P = { ...a5Base(t, 601), y: 915, dir: 1, ...W, mouth: 'smile', brow: 0.6, lid: Math.max(0.3, abLid(t, 601)), gaze: [1, 0], handL: [-26, -106], handR: [24, -110] };
  const o = { fine: 1, kick: 0.3 * W.amp, cuffR: a5RingShown(t) ? 0 : 1, ring: 0, feather: lagged((u) => 0.3 * walk(A5_GX2, u).amp * Math.sin(walk(A5_GX2, u).ph * 2), tc, 0.25, 1) };
  if (W.amp > 0.05) { P.tip = 0.02; P.gaze = [1, -0.1]; P.handL = [-30 + 8 * Math.sin(W.ph), -104]; P.handR = [30 - 8 * Math.sin(W.ph), -106]; }
  if (tc >= 38.3 && tc < 41.0) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = 'grin'; P.gaze = [1, -0.05]; P.tip = 0.06 * Math.sin(Math.PI * beatIn(tc, 38.6, 39.4)); }
  if (tc >= 41.0 && tc < 50.0) { const f = flow(tc, [[41.0, 0], [41.3, 1], [41.6, 1.6], [41.9, 2.05], [42.2, 2]]); P.handR = f < 1 ? [K.lerp(24, 4, f), K.lerp(-110, -122, f)] : [K.lerp(4, 40, f - 1), K.lerp(-122, -206, Math.min(1, f - 1))]; P.tip = 0.08; P.gaze = [1, -0.1]; P.mouth = 'grin'; P.lid = 0.4;
    o.ring = tc > 41.8 && tc < 42.2 ? (tc - 41.8) / 0.4 : 0; }
  if (tc >= 50.0) { P.handR = [-4, -100]; P.handL = [-10, -110]; P.gaze = [1, 0]; }
  return { P, o };
}
function a5S5World(ctx, t, cam) {
  const tc = AB_T2(t), door = kfn(tc, [[38.0, 0], [38.5, 1], [50.6, 1], [51.0, 0.15]]), shut = tc < 50.1 ? 1 : kfn(tc, [[50.1, 1], [50.6, 0.5]]);
  const M = { x: 1095, gaze: tc < 38.54 ? [0.4, 0.8] : tc < 41.8 ? gazePlan(tc, [[38.54, [-1, 0.9]], [41.0, [-1, 0.8]]], 0.08) : tc < 50.1 ? [-1, 0.7] : [-0.4, 0.3], lid: tc > 41.14 && tc < 42.4 ? 0 : abLid(t, 611), look: tc < 38.7 ? 0.2 : -0.5, mouth: tc > 41.8 ? 'closed' : 'smile', tip: idleSway(tc, 612, 0.02, 2.4), brow: tc > 41.8 ? 0.4 : 0 };
  const canP = tc < 38.54 ? 1 : 0;   // rev 1: the stream stops mid-pour on "لمحته"
  a3Street(ctx, t, cam, { m: 'evening', lan: 1, washing: { empty: true }, marks: { tm: 0 }, flock: [-200, 300, 140, 4, 21, 35],
    doors: [{ i: 3, open: door, lit: 1, inside: (c) => { if (tc > 37.9 && tc < 50.9) { const A = { ...a5Base(t, 621), x: 930, y: 905, dir: -1, mouth: 'smile', gaze: [-1, 0], handL: tc > 38.2 ? [-96, -160] : [-26, -104], handR: tc > 38.2 ? [96, -160] : [26, -104] }; abAli(c, A, A5_EV); } } }, { i: 2, open: 0, lit: 0 }],
    win: { sh: shut, lit: 0.5, inside: (c) => { const Q = morgianaWindow(c, t, { ...M, handLW: [1060, 548], handRW: canP ? [1125, 520] : [1120, 548] }, A5_EV, { kick: tc > 38.54 && tc < 39.3 ? swing(tc, 38.6, 0.8, 1.6, 3) : 0 }); } } });
  // the watering can on the sill (stops pouring at 40.3; one drip falls)
  { const tilt = tc < 38.54 ? -0.5 : tc < 38.7 ? -0.4 : -0.1, cx = 1128, cy = 532; ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt); celShade(ctx, K.rectPts(-14, -16, 28, 22), '#5ab0e0', '#3a80b0', { off: 4, lw: 2 }); seg(ctx, 12, -6, 34, -20, 4, '#5ab0e0', 1); ctx.restore();
    if (tc < 38.54) { ctx.save(); ctx.strokeStyle = '#bfe8ff'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(1150 + k * 3, 522); ctx.lineTo(1150 + k * 4, 548); ctx.stroke(); } ctx.restore(); }
    else if (tc < 39.2) { const y = fallY(tc, 38.6, 39.1, 524, 556); abBlob(ctx, 1152, y, 3, 4, '#bfe8ff', '#7fb0e0', { lw: 0 }); } }
  // the cat on the courtyard wall (arches at 37.66), the donkey by the gate (ears flat)
  const ar = a5Win(tc, 37.66, 39.2, 0.15, 0.3); a5Cat(ctx, t, { x: 1215, y: 588, gy: 588, dir: -1, arch: ar, puff: ar, mouth: ar > 0.3 ? 'open' : 'closed', ears: ar > 0.3 ? -1 : 0.4, gaze: [-1, 0.6] }, 'rgba(43,26,58,0.3)');
  { const P = { x: 1330, y: 905, s: 0.72, dir: -1, pal: 1, earL: tc > 37.7 ? -0.9 : 0.4 + idleSway(tc, 631, 0.3, 1.6), earR: tc > 37.8 ? -0.9 : 0.3 + idleSway(tc, 632, 0.3, 2.1), tailSwish: osc(tc, 1.5), lid: abLid(t, 633), neck: idleSway(tc, 634, 0.08, 3.1), headDown: 0.3 };
    a3Shadow(ctx, 1330, 905, 200, 0, A5_ESH); abDonkey(ctx, P, A5_EV); }
  // the nephew at the door, waving and hopping
  if (tc < 41.0) { const h = Math.max(hop(tc, 36.24, 0.3, 0, 0, 22)[1], hop(tc, 36.6, 0.3, 0, 0, 16)[1]), N = { ...a5Base(t, 641), x: kfn(tc, [[37.8, 1030], [38.3, 1120]]), y: 915 - h, dir: -1, mouth: 'grin', gaze: [-1, 0], handL: tc < 37.0 ? [-70, -205 + 12 * Math.sin(tc * 16)] : [-24, -104], handR: tc < 37.0 ? [70, -205 - 12 * Math.sin(tc * 16)] : [24, -106] };
    N.sq *= landSquash(tc, 36.54, 0.1) * landSquash(tc, 36.9, 0.08); abNephew(ctx, t, N, A5_EV, { shc: A5_ESH, lift: h }); }
  // the guest (fine clothes), three glints along the trim and a light band at 37.66
  const G = a5Guest2(t); abNewMerchant(ctx, t, G.P, A5_EV, { ...G.o, shc: A5_ESH });
  if (tc > 37.66 && tc < 38.6) for (let k = 0; k < 3; k++) { const u = (t - 37.66 - k * 0.2) / 0.4; if (u > 0 && u < 1) abGlint(ctx, G.P.x - 50 + k * 10, 760 + k * 50, 22, u); }
  if (tc > 41.14 && tc < 41.3) abGlint(ctx, ...a2Hand(G.P, 1, A5_NM), 30, (tc - 41.14) / 0.16);
  if (tc > 37.66 && tc < 38.6) abBands(ctx, [G.P.x - 140, 600, 280, 330], t - 37.66, { n: 1, w: 90, speed: 420, alpha: 0.3, cols: ['#ffe9a0'] });
  if (tc > 38.0) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.35 * door; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.moveTo(875, 902); ctx.lineTo(985, 902); ctx.lineTo(1060, 1100); ctx.lineTo(760, 1100); ctx.closePath(); ctx.fill(); ctx.restore(); }
}
function a5S5Over(ctx, t, cam, S) { if (t > 50.0 && t < 51) { const [mx, my] = abP(1095, 460, cam); a5Glyph(ctx, 'x', mx, my - 60, 0.8, K.clamp((t - 50.1) / 0.3) * (1 - K.clamp((t - 50.8) / 0.2))); } }
AB_SHOTS.push({ a: 35.0, b: 42.2, ww: 2000, cam: a5Cam([[35.0, { x: 840, y: 545, zoom: 1.15 }], [38.2, { x: 870, y: 545, zoom: 1.15 }], [38.9, { x: 950, y: 690, zoom: 1.5 }], [42.2, { x: 958, y: 690, zoom: 1.5 }]]), world: a5S5World, over: a5S5Over });

// ---------- S6 insert 42.2-47.1: the saluting hand and the ring (full panel), slow push; 47.1-50.0 split with the memory ----------
// the ring's position on the big hand (a3BigHand finger 2 at curl 0: local (14, 90.8) at scale k about (x, y), rot)
function a5RingPt(x, y, k, rot) { const lx = 14 * k, ly = 90.8 * k, c = Math.cos(rot), s = Math.sin(rot); return [x + lx * c - ly * s, y + lx * s + ly * c]; }
function a5RingHand(ctx, t, x, y, k, rot, o = {}) {
  a3BigHand(ctx, x, y, k, { sleeve: '#f6e2c0', sleeveD: '#d8b88a', rot, ring: { glint: o.glint || 0 }, curl: o.curl || 0 });
  const [rx, ry] = a5RingPt(x, y, k, rot), r = 20 * k;
  if ((o.stone || 0) > 0) abGlow(ctx, rx, ry - r * 0.55, r * (2.5 + 0.3 * Math.sin(t * 6)), o.stone, '#3a8ae8');
  if ((o.crack || 0) > 0) { const p = o.crack, ax = rx - r * 0.35, ay = ry - r * 0.9, bx = rx + r * 0.3, by = ry - r * 0.2; ctx.save(); ctx.strokeStyle = '#e8f6ff'; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 14; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(K.lerp(ax, bx, p), K.lerp(ay, by, p)); ctx.stroke(); ctx.restore(); if (p >= 1 && o.crackGlint) abGlint(ctx, bx, by, 30, o.crackGlint); }
  return [rx, ry];
}
// revision 1: the ring 160 px across at about (500, 650), Morgiana's eyes in a strip across the top, one change per word on twos:
// 42.2-42.9 the cuff slides back, 43.00 a glint runs round the band, 43.74 the fingers flex, 45.10 the stone glows (push), 46.32 the crack
function a5S6Panel(ctx, t, S) {
  const tc = AB_T2(t), split = t >= 47.1;
  a3WallBg(ctx, '#e0a888', { seed: 9 }); abGlaze(ctx, 300, 300, 600, '#ffd8a8', 0.5);
  const push = 1 + 0.03 * K.clamp((tc - 42.2) / 4.9) + 0.05 * beatIn(tc, 45.1, 45.64);
  const k = (split ? kfn(t, [[47.1, 6.4], [47.5, 3.0]]) : 6.4) * push, rx = split ? kfn(t, [[47.1, 500], [47.5, 720]]) : 500 + 4 * Math.sin(tc * 2.1), ry = split ? kfn(t, [[47.1, 660], [47.5, 560]]) : 660 + 3 * Math.sin(tc * 1.6);
  const rot = 0.04 + 0.01 * Math.sin(tc * 1.7), curl = 0.3 * Math.sin(Math.PI * beatIn(tc, 43.74, 44.3)), x = rx - 14 * k, y = ry - (60 + 88 * (1 - 0.62 * curl) * 0.35) * k;
  const stone = t > 45.1 ? K.clamp((t - 45.1) / 0.25) * (t > 45.64 ? 0.75 + 0.2 * Math.sin(t * 4) : 0.6) : 0, crack = a5Step(tc, 46.32, 0.4, 4);
  const pulse2 = t > 47.92 && t < 48.4 ? Math.sin(Math.PI * (t - 47.92) / 0.48) : 0;
  a3BigHand(ctx, x, y, k, { sleeve: '#f6e2c0', sleeveD: '#d8b88a', rot, curl });
  // the cream cuff slides back off the hand (held drawings)
  { const cu = a5Step(tc, 42.2, 0.7, 4); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); const cy = K.lerp(40, -250, cu);
    celShade(ctx, [[-74, cy - 70], [74, cy - 70], [80, cy + 40], [0, cy + 52], [-80, cy + 40]], '#f6e2c0', '#d8b88a', { light: [-1, -0.3], off: 14, lw: 4, line: '#8a6a3a' }); ctx.restore(); }
  const c = Math.cos(rot), sn = Math.sin(rot), [lx, ly] = [14 * k, (60 + 88 * (1 - 0.62 * curl) * 0.35) * k], R1 = [x + lx * c - ly * sn, y + lx * sn + ly * c], r = 20 * k;
  if (stone > 0) abGlow(ctx, R1[0], R1[1] - r * 0.55, r * (2.2 + 0.3 * Math.sin(t * 6)), stone, '#3a8ae8');
  silverRing(ctx, R1[0], R1[1], r, { rot: 0.05, noSplit: true, glint: t > 43.0 && t < 43.7 ? (t - 43.0) / 0.7 : split ? pulse2 : 0 });
  if (t > 43.0 && t < 43.7) { const a = Math.PI * 2 * (t - 43.0) / 0.7 + Math.PI; abGlint(ctx, R1[0] + r * Math.cos(a), R1[1] + r * 0.45 * Math.sin(a), 18 + r * 0.4, 0.5); }
  if (crack > 0) { const ax = R1[0] - r * 0.35, ay = R1[1] - r * 0.9, bx = R1[0] + r * 0.3, by = R1[1] - r * 0.2; ctx.save(); ctx.strokeStyle = '#0e1a40'; ctx.lineWidth = Math.max(2, r * 0.1); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(K.lerp(ax, bx, crack), K.lerp(ay, by, crack)); ctx.stroke();
    if (tc < 47.1) { ctx.strokeStyle = '#e8f6ff'; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 12; ctx.lineWidth = Math.max(1.5, r * 0.05) * (1 + 0.5 * Math.sin(t * 8)); ctx.stroke(); } ctx.restore();
    if (tc >= 46.72 && tc < 47.1) abGlint(ctx, bx, by, 36, (tc - 46.72) / 0.38); if (tc >= 46.32 && tc < 46.5) abGlow(ctx, R1[0], R1[1] - r * 0.5, r * 2.5, 0.8, '#ffffff'); }
  if (!split && t > 45.6 && t < 46.4) abBands(ctx, [R1[0] - 200, R1[1] - 200, 400, 300], t - 45.6, { n: 1, w: 60, speed: 500, alpha: 0.3, cols: ['#ffffff'] });
  // Morgiana's eyes across the top fifth, looking down: they snap to the ring on "خاتمه", narrow on "المشقوق"
  if (!split || t < 47.4) { const sk = split ? 1 - K.clamp((t - 47.1) / 0.3) : 1, st = AB_T3(t); ctx.save(); ctx.globalAlpha *= sk; ctx.beginPath(); ctx.rect(0, 0, 1000, 250); ctx.clip(); ctx.translate(500, 120); ctx.scale(0.62, 0.62); ctx.translate(-500, -640);
    a3Eyes(ctx, t, { who: 'morgiana', gaze: st < 42.3 ? [0.6, 0.2] : [(R1[0] - 500) / 500, 0.95], lid: Math.max(abBlinkAt(st, 44.6) > 0 ? K.clamp(abBlinkAt(st, 44.6) * 1.6) : 0, st >= 46.32 ? 0.5 : st >= 42.3 ? 0.28 : 0.05), wide: st >= 42.3 && st < 46.32 ? 0.25 : 0, brow: st >= 46.32 ? 0.4 : 0 }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= sk; ctx.strokeStyle = '#2b1a3a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 252); ctx.lineTo(1000, 252); ctx.stroke(); ctx.restore(); }
  if (split) { // the memory: the oil merchant's fist knocking at this door, the same ring; then the man by his jars; then the leader over the wall
    const p = K.clamp((t - 47.1) / 0.35), rect = [40, 150, 470, 760];
    memoryPanel(ctx, t, rect, p, (c) => { a3WoodBg(c, '#8a5a3a'); const ph = t < 48.46 ? 0 : t < 49.52 ? 1 : 2;
      if (ph === 0) { const kn = Math.abs(Math.sin((t - 47.1) * 9)) * 20; a3BigHand(c, 290, 250 - kn, 2.4, { sleeve: '#d8a43a', sleeveD: '#a8781e', curl: 1, ring: { glint: pulse2 }, rot: -0.12 });
        if (pulse2 > 0) { const [rx, ry] = [326, 415 - kn]; abGlow(c, rx, ry, 110, pulse2, '#3a8ae8'); } }
      else if (ph === 1) { abGrad(c, 40, 150, 470, 760, [[0, '#ffb98a'], [1, '#e8a080']]); c.save(); c.translate(275, 830); c.scale(1.6, 1.6); c.translate(-275, -900); for (const jx of [140, 410]) oilJar(c, jx, 900, 1.2, {});
        oilMerchant(c, t, { x: 275, y: 900, dir: 1, mouth: 'smile', brow: 0.7, lid: 0.35, gaze: [1, 0], tip: idleSway(tc, 651, 0.02, 2), sq: breathe(tc, 652, 0.015), handL: [-26, -104], handR: [60, -140] }, 'dusk', { glint: (t * 1.2) % 1 }); c.restore(); }
      else { abGrad(c, 40, 150, 470, 760, [[0, '#3e5aa0'], [1, '#a47ab4']]); celShade(c, K.rectPts(40, 640, 470, 270), '#b89ab8', '#8a7aa0', { off: 10, lw: 3 }); seg(c, 40, 640, 510, 640, 14, '#8a7ac0', 2);
        const u = K.clamp((t - 49.52) / 0.5), lx = K.lerp(220, 330, u), ly = K.lerp(640, 560, u); c.save(); c.translate(lx, ly); c.scale(1.5, 1.5); c.translate(-lx, -ly);
        a2Lead(c, t, { x: lx, y: ly, dir: 1, tip: 0.2 * u, handL: [-60, -190], handR: [60, -200], mouth: 'closed', brow: 0.9, lid: 0.3, gaze: [1, 0] }, 'night', { shadow: false, kick: 0.8 }); c.restore();
        celShade(c, [[120, 900], [200, 860], [260, 900]], '#7a4a2a', '#5a3018', { off: 6, lw: 3 }); } }, { wash: 0.12 });
    if (t > 47.92 && t < 48.6) { a4StreakLite(ctx, S, [400, 470], [R1[0] - 40, R1[1] - 40], t, 47.92, 48.4); }
    if (t > 47.16 && t < 50.0) a2Tag(ctx, S, 'THE SAME RING!', 500, 1080, t, 47.16, 49.8, { size: 52 });
  }
}
AB_SHOTS.push({ a: 42.2, b: 50.0, panel: a5S6Panel, noClues: true });
AB_SHOTS.push({ a: 50.0, b: 51.0, ww: 2000, cam: a5Cam([[50.0, { x: 958, y: 690, zoom: 1.5 }], [51.0, { x: 962, y: 690, zoom: 1.5 }]]), world: a5S5World, over: a5S5Over });
