// ===== KD-014 S1-S3 (0.00-27.30): the riverbank. The hawk drops the mouse; the ascetic saves her, prays, POOF: a little girl. =====
// Set measured on the Library pieces: bank top y 700 (the plan's "bank top"), bank edge x 470..525, river to the right, fig tree left (s 0.8).
const K14R_BANK = 700, K14R_STONE = [405, 700], K14R_ASC = 230, K14R_LAND = [345, 700];
const K14R_bake = () => bake('k14river', 1000, 1230, (x) => {
  sky(x, { preset: 'day' }); hillTrees(x, { y: 720, seed: 9, n: 13 });
  x.fillStyle = WATERD; x.fillRect(0, 772, 1000, 460); x.fillStyle = dotPat(x, '#2a62c9', 14, 0.3); x.fillRect(0, 772, 1000, 460);
  shape(x, [[1010, 700], [880, 700], [840, 760], [1010, 772]], SAND, { lw: 7, seed: 401, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(x, [[1010, 694], [880, 694], [872, 710], [1010, 710]], GREEN, { lw: 5, seed: 402, dot: GREEND, pitch: 8, rad: 0.2 });
  shape(x, [[-10, K14R_BANK], [470, K14R_BANK], [522, 778], [526, 1240], [-10, 1240]], SAND, { lw: 8, seed: 403, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(x, [[-10, K14R_BANK - 6], [470, K14R_BANK - 6], [490, K14R_BANK + 18], [-10, K14R_BANK + 18]], GREEN, { lw: 6, seed: 404, dot: GREEND, pitch: 8, rad: 0.2 });
  for (let px = 10; px < 470; px += 26) seg(x, px, K14R_BANK - 6, px + 4, K14R_BANK - 20, 5, GREEN2, 2.5);
  figTree(x, { x: 130, s: 0.8 });
});
// hawk path (dir -1, facing left)
const K14R_HX = (t) => t < 8.4 ? kfn(t, [[4.38, 1090], [8.4, 360]], 'out') : kfn(t, [[8.56, 360], [11.6, -170]], 'in');
const K14R_HY = (t) => (t < 8.4 ? kfn(t, [[4.38, 450], [5.5, 410], [8.4, 135]])   /* v2: enters below the sun, against plain sky */ : kfn(t, [[8.56, 135], [11.6, 70]])) + 6 * Math.sin(t * 5.2);
const K14R_GRIP = (t) => [K14R_HX(t) + 4, K14R_HY(t) + 74];   // where the carried mouse hangs (measured on stills)
// mouse fall: release 8.56 (0.2 s tug up), fall to the crown clump, bounce, drop out of the leaves, land 11.34
function k14rMousePos(t) {
  const g = K14R_GRIP(8.56);
  if (t < 8.76) return [g[0], g[1] - 10 * pulse(t, 8.56, 0.2), 0];
  if (t < 9.9) return [K.lerp(g[0], 300, (t - 8.76) / 1.14), fallY(t, 8.76, 9.9, g[1], 345), (t - 8.76) * 4];
  if (t < 10.5) { const [hx, hy] = hop(t, 9.9, 0.6, 300, 330, 46); return [hx, K.lerp(345, 400, (t - 9.9) / 0.6) - hy, 4.6 + (t - 9.9) * 3]; }
  if (t < 10.9) return [330 + tremble(t, 2, 6), 400, 6.4];
  if (t < 11.34) return [K.lerp(330, K14R_LAND[0], (t - 10.9) / 0.44), fallY(t, 10.9, 11.34, 400, K14R_BANK), 6.4 + (t - 10.9) * 5];
  return [K14R_LAND[0], K14R_BANK, 0];
}
function k14rAsc(t) {
  const P = { x: K14R_ASC, y: K14R_BANK, s: 1, dir: 1, costume: 'ascetic', mouth: 'smile', seed: 11 };
  const sit = 1 - blend(t, 9.0, 9.5, 0, 1), kn = blend(t, 9.0, 9.6, 0, 1); P.sit = sit; P.seat = 'floor'; P.kneel = kn;
  P.lid = t < 3.68 ? 1 : Math.max(blend(t, 3.68, 3.88, 1, 0), blink(t, 11));
  P.lean = 0.02 * Math.sin(t * 1.9) * (t < 3.68 ? 1 : 0);
  // beads in the right hand, three clicks (0.98-2.10), stop at 3.68
  P.handR = [26, -96]; P.handL = [-18, -92];
  const head = [K14R_ASC + 4, 530], mp = k14rMousePos(t);
  if (t >= 3.68) { P.gaze = lookAt(head, [K14R_HX(t), K14R_HY(t)]); P.brow = -0.5; P.mouth = 'closed'; P.drop = -4 * blend(t, 3.68, 3.95, 0, 1); }
  if (t >= 5.7) P.gaze = lookAt(head, K14R_GRIP(t));
  if (t >= 8.56) { P.gaze = lookAt(head, [mp[0], mp[1] - 20]); P.mouth = 'o'; }
  if (t >= 9.0 && t < 12.08) { const k = blend(t, 9.0, 9.4, 0, 1); P.handL = [K.lerp(-18, 66, k), K.lerp(-92, -128, k)]; P.handR = [K.lerp(26, 84, k), K.lerp(-96, -140, k)]; P.tip = 0.1 * k * (1 - blend(t, 11.4, 12.0, 0, 1)); }
  if (t >= 11.34) { P.mouth = 'o'; P.brow = -0.6; }
  // S2: scoop, hover 0.25 s, lift to the chest
  if (t >= 12.08 && t < 16.7) { const lift = blend(t, 12.85, 13.3, 0, 1), cx = K.lerp(K14R_LAND[0] - 8, 322, lift), cy = K.lerp(K14R_BANK - 8, 640, lift) + (t < 12.6 ? -26 * (1 - blend(t, 12.08, 12.6, 0, 1)) : 0);
    P.handLW = [cx - 16, cy]; P.handRW = [cx + 16, cy + 2]; P.handL = P.handR = null; P.tip = 0.12 * (1 - lift) + 0.04; P.lid = Math.max(0.25, blink(t, 11)); P.brow = -0.4; P.mouth = 'closed';
    P.gaze = lookAt(head, [cx, cy - 20]); if (t >= 13.6 && t < 14.4) { P.mouth = 'smile'; P.tilt = 0.07 * blend(t, 13.6, 13.9, 0, 1); P.handRW = [cx + 10 + 6 * Math.sin((t - 13.6) * 8), cy - 14]; }
    if (t >= 14.4) P.mouth = 'smile';
    if (t >= 14.7 && t < 15.48) { P.gaze = lookAt(head, [720, 220]); P.brow = 0.5; P.mouth = 'closed'; P.lid = blink(t, 11); }
    if (t >= 15.48 && t < 16.3) { const k = blend(t, 15.48, 15.75, 0, 1); P.handLW = [cx - 10, cy - 8 * k]; P.handRW = [cx + 6, cy - 34 * k]; P.tip = -0.06 * k; P.gaze = lookAt(head, [760, 200]); P.brow = 0.5; P.mouth = 'closed'; }
    if (t >= 16.3) { const k = blend(t, 16.3, 16.7, 0, 1); P.handLW = [K.lerp(cx - 10, K14R_STONE[0] - 14, k), K.lerp(cy, K14R_STONE[1] - 34, k)]; P.handRW = [K.lerp(cx + 6, K14R_STONE[0] + 14, k), K.lerp(cy - 30, K14R_STONE[1] - 32, k)]; P.tip = 0.14 * k; P.gaze = lookAt(head, [K14R_STONE[0], 660]); P.brow = -0.4; }
  }
  // prayer: both hands raised by angles, eyes shut (16.7-19.5)
  if (t >= 16.7 && t < 19.5) { const k = settleTo(t, 16.7, 0, 1, 0.4); P.aL = [K.lerp(-0.3, -2.55, k), K.lerp(-0.2, -2.9, k)]; P.aR = [K.lerp(0.3, 2.55, k), K.lerp(0.2, 2.9, k)]; P.handLW = P.handRW = null; P.tip = 0.0; P.lid = blend(t, 16.7, 17.0, 0, 1); P.mouth = 'smile'; P.drop = -6; P.lean = -0.03 + 0.012 * Math.sin(t * 2); }
  if (t >= 19.5 && t < 23.2) { const k = blend(t, 19.5, 19.9, 0, 1); P.aL = [K.lerp(-2.55, -0.4, k), K.lerp(-2.9, -0.9, k)]; P.aR = [K.lerp(2.55, 0.5, k), K.lerp(2.9, 1.0, k)]; P.lid = blink(t, 11); P.gaze = lookAt(head, [K14R_STONE[0], 660]); P.mouth = 'smile'; P.brow = -0.3;
    if (t >= 22.1) { const a = (t - 22.1) * 4; P.gaze = lookAt(head, [K14R_STONE[0] + Math.cos(a) * 90, 640 + Math.sin(a) * 40]); P.mouth = 'o'; } }
  // S3: the POOF throws his hands apart; jaw drops; delight; offers a hand
  if (t >= 23.2) { const k = settleTo(t, 23.2, 0, 1, 0.3, 0.2); P.aL = [-1.6 * k - 0.4 * (1 - k), -1.9 * k - 0.9 * (1 - k)]; P.aR = [1.6 * k + 0.5 * (1 - k), 1.9 * k + 1.0 * (1 - k)]; P.mouth = 'o'; P.brow = -0.8; P.tip = -0.08 * pulse(t, 23.2, 0.8); P.gaze = lookAt(head, [K14R_STONE[0], 600]); P.lid = t < 25.3 ? 0 : blink(t, 11);
    if (t >= 26.1) { P.mouth = 'smile'; P.wet = true; P.sq = 1 + 0.05 * pulse(t, 26.1, 0.35); const o = blend(t, 26.6, 27.0, 0, 1); P.aL = [K.lerp(-1.6, -0.4, o), K.lerp(-1.9, -0.9, o)]; P.aR = null; P.handRW = [K.lerp(330, 372, o), K.lerp(560, 628, o)]; } }
  return P;
}
function k14rDrawMouse(ctx, t) {
  if (t < 8.56 || t >= 23.2) return;
  if (t < 12.08) { const [x, y, spin] = k14rMousePos(t), landed = t >= 11.34;
    const P = { x, y, s: 0.75, who: 'her', dir: 1, t, ears: landed ? 0 : -1, eyes: landed && t < 11.74 ? 'x' : t < 11.34 ? 'wide' : 'open', ph: t * 20, amp: landed ? 0 : 0.8, sit: landed ? blend(t, 11.6, 11.9, 0, 1) : 0 };
    if (!landed) { P.rot = spin * 0.5; P.sq = 1.15; } else { P.sq = impactSquash(t, 11.34, 0.55); P.y -= rebound(t, 11.34, 14); P.gaze = lookAt([x, y - 40], [K14R_ASC, 520]); }
    k14Mouse(ctx, P); if (landed) dustBurst(ctx, x, y, t - 11.34, 5, 5, 10, 30, 0.6, 41); return; }
  let P;
  if (t < 16.7) { const a = k14rAsc(t), cx = (a.handLW[0] + a.handRW[0]) / 2, cy = Math.min(a.handLW[1], a.handRW[1]) - 2;
    P = { x: cx - 2, y: cy + 6, s: 0.75, who: 'her', dir: -1, t, sit: 0.4, ears: blend(t, 13.36, 14.4, -1, 0.3), lid: t < 13.5 ? 1 : t < 13.75 ? 0.5 : blink(t, 23), gaze: lookAt([cx, cy - 30], [K14R_ASC + 4, 525]) };
    P.x += tremble(t, 3 * (1 - blend(t, 13.36, 14.4, 0, 1)), 11); if (t >= 15.48 && t < 16.3) { P.sq = 0.75; P.ears = 1; P.lid = 0.3; }
    if (t >= 16.3) { const k = blend(t, 16.3, 16.7, 0, 1); P.x = K.lerp(cx, K14R_STONE[0], k); P.y = K.lerp(cy + 6, K14R_STONE[1] - 14, k); }
  } else {
    P = { x: K14R_STONE[0], y: K14R_STONE[1] - 14, s: 0.75, who: 'her', dir: -1, t, sit: t >= 19.76 ? blend(t, 19.76, 20.1, 0, 1) : 0.2, ears: 0.6, gaze: lookAt([405, 640], [K14R_ASC, 520]) };
    if (t >= 17.4) P.gaze = lookAt([405, 640], [560, 430]);
    if (t >= 19.76 && t < 21.0) { P.twitch = t; P.sniff = 1; }
    if (t >= 22.1) { const a = (t - 22.1) * 4; P.gaze = lookAt([405, 640], [405 + Math.cos(a) * 90, 640 + Math.sin(a) * 40]); P.dir = Math.cos(a) > 0 ? 1 : -1; if (t >= 22.9) P.lid = 1; }
  }
  k14Mouse(ctx, P);
}
function k14rChild(t) {
  const P = { x: K14R_STONE[0], y: K14R_STONE[1] + 2, s: 1, dir: -1, costume: 'maiden', child: true, sit: 1, seat: 'bench', mouth: 'o', eyes: 'wide', seed: 31 };
  P.handL = [-14, -96]; P.handR = [18, -96]; P.gaze = [0.1, 1]; P.lid = Math.max(pulse(t, 25.5, 0.3), pulse(t, 25.9, 0.3));
  if (t >= 26.02) { P.handR = [18 + 6 * Math.sin(t * 30), -100]; P.handL = [-14 + 6 * Math.sin(t * 30 + 1), -100]; P.tilt = 0.05 * Math.sin(t * 40) * pulse(t, 26.02, 0.4); P.eyes = 'open'; }
  if (t >= 26.4) { P.mouth = 'smile'; P.gaze = lookAt([405, 600], [K14R_ASC, 520]); P.lid = blink(t, 31); P.handL = null; P.handLW = [K.lerp(388, 372, blend(t, 26.6, 27.0, 0, 1)), K.lerp(640, 630, blend(t, 26.6, 27.0, 0, 1))]; }
  return P;
}
const K14_RIVER = {
  a: 0, b: 27.3, bounds: [0, 1000, 0, 1230],
  cam: [[0, { x: 480, y: 520, zoom: 1.2 }], [0.5, { x: 480, y: 520, zoom: 1.2 }], [2.8, { x: 330, y: 560, zoom: 1.55 }], [3.7, { x: 330, y: 560, zoom: 1.55 }], [4.6, { x: 500, y: 535, zoom: 1.15 }], [7.0, { x: 480, y: 535, zoom: 1.15 }],
    [8.4, { x: 380, y: 260, zoom: 1.9 }], [8.56, { x: 375, y: 260, zoom: 1.9 }], [9.9, { x: 320, y: 400, zoom: 1.6 }], [11.34, { x: 300, y: 560, zoom: 1.5 }], [12.07, { x: 300, y: 565, zoom: 1.5 }],
    [12.08, { x: 310, y: 600, zoom: 2.3 }], [16.3, { x: 315, y: 600, zoom: 2.3 }], [19.5, { x: 400, y: 520, zoom: 1.45 }], [23.2, { x: 380, y: 560, zoom: 1.45 }], [26.0, { x: 360, y: 580, zoom: 1.8 }], [27.3, { x: 360, y: 580, zoom: 1.8 }]],
  draw(ctx, t) {
    ctx.drawImage(K14R_bake(), 0, 0, 1000, 1230);
    sun(ctx, 860, 150, t);
    cloudFlat(ctx, 160 + (t * 5) % 200, 120, 0.7);
    for (const [rx, t0] of [[700, 2.18], [820, 2.5]]) ripple(ctx, rx, 800, t0, t, 1.2);
    // a drifting fig leaf (calm before the event)
    { const u = K.clamp(t / 3); if (u < 1) { const lx = 260 + 60 * Math.sin(u * 6), ly = K.lerp(380, 690, u); ctx.save(); ctx.translate(lx, ly); ctx.rotate(Math.sin(u * 8)); shape(ctx, ell(0, 0, 12, 6, 12), GREEN, { lw: 3, seed: 410 }); ctx.restore(); } }
    shape(ctx, ell(K14R_STONE[0], K14R_STONE[1] - 10, 48, 16, 24), K14_ROCK, { lw: 5, seed: 411, dot: K14_ROCKD, pitch: 7, rad: 0.2, da: 0.4 });
    // the hawk's shadow before the hawk (3.1-3.8): slides right to left across his face
    if (t > 3.0 && t < 3.9) { const x = kfn(t, [[3.0, 1100], [3.9, -250]], 'lin'); bird(ctx, { x, y: 560, s: 1.6, kind: 'hawk', fly: true, flap: Math.sin(t * 9), dir: -1, silhouette: true, alpha: 0.28, sq: 0.6 }); }
    const A = k14rAsc(t);
    person(ctx, A);
    // beads in his right hand (they click until his eyes open)
    if (t < 9.0) { const clicks = t < 0.98 ? 0 : t < 3.68 ? Math.min(3, (t - 0.98) / 0.35) : 3; beadString(ctx, A.x + 30, A.y - 66, 0.9, clicks); }
    // the mouse
    k14rDrawMouse(ctx, t);
    // light cone (17.2-23.2)
    skyLight(ctx, 340, -20, 720, 520, 0.45 * K14B(t, 17.2, 1.1, 'inOut') * (1 - K14B(t, 22.6, 0.8)));
    // hawk
    if (t >= 4.38 && t < 11.7) { const fl = Math.sin(t * 5.2) * 0.9, look = pulse(t, 10.64, 0.6);
      bird(ctx, { x: K14R_HX(t), y: K14R_HY(t), s: 0.9, kind: 'hawk', fly: true, flap: fl, dir: -1, brow: 0.6, headRot: 0.5 * look, lid: look > 0.2 ? 0.5 : blink(t, 7), gaze: [-1, 0.2],
        grip: t < 8.56 ? 1 : 0.2, carry: t < 8.56 ? (c) => { c.save(); c.rotate(Math.sin(t * 7) * (t > 7 ? 0.35 : 0.15)); k14Mouse(c, { x: 4, y: 34, s: 0.62, who: 'her', dir: -1, t, ears: -1, eyes: 'wide', ph: t * 22, amp: 0.9, gaze: t > 7 && t < 7.7 ? [0, 1] : [0.3, -1], brow: t > 7.7 ? 0.6 : -0.5 }); c.restore(); } : null }); }
    if (t >= 14.52 && t < 16.3) { const a = (t - 14.52) * 3.2, ex = blend(t, 15.6, 16.3, 0, 1); bird(ctx, { x: 700 + Math.cos(a) * 90 + ex * 500, y: 220 + Math.sin(a) * 40 - ex * 60, s: 0.38, kind: 'hawk', fly: true, flap: Math.sin(t * 8), dir: Math.sin(a) > 0 ? -1 : 1, silhouette: true }); }
    // leaf bursts in the crown
    for (const [t0, x, y] of [[9.9, 300, 345], [10.5, 330, 400], [10.9, 330, 410]]) if (t >= t0 && t < t0 + 1.4) { const r = K.rng(Math.round(t0 * 10)); for (let i = 0; i < 6; i++) { const d = t - t0, a = r() * 6.28, sp = 60 + r() * 80; ctx.save(); ctx.translate(x + Math.cos(a) * sp * d, y + Math.sin(a) * sp * d * 0.4 + 120 * d * d); ctx.rotate(d * 6 + i); shape(ctx, ell(0, 0, 11, 5, 10), GREEN, { lw: 3, seed: 420 + i }); ctx.restore(); } }
    // thought cloud: mouse -> girl, then a house around her and a heart (18.0-22.4); stars gather 22.1-23.2
    { const p = K14B(t, 18.0, 0.6) * (1 - K14B(t, 22.1, 0.4)); if (p > 0) thoughtCloud(ctx, 610, 360, 330, 250, t, { p, tail: [300, 500], bg: C.yellow, scale: 0.3, at: [500, 760], inside: (c) => {
      k14Mouse(c, { x: 200, y: 860, s: 2.6, who: 'her', dir: 1, t, sit: 1, ears: 0.6, twitch: t > 19.76 && t < 21 ? t : 0 });
      if (t >= 18.3) { c.save(); c.lineWidth = 22; c.strokeStyle = C.black; c.lineCap = 'round'; const k = K14B(t, 18.3, 0.3); c.beginPath(); c.moveTo(370, 760); c.lineTo(370 + 170 * k, 760); c.stroke(); if (k > 0.9) { c.beginPath(); c.moveTo(510, 710); c.lineTo(550, 760); c.lineTo(510, 810); c.stroke(); } c.restore(); }
      if (t >= 18.48) { const k = K.ease.back(K14B(t, 18.48, 0.4)); c.save(); c.translate(770, 1000); c.scale(k, k); person(c, { x: 0, y: 0, s: 2.4, costume: 'maiden', child: true, mouth: 'smile', dir: -1 }); c.restore(); }
      if (t >= 21.06) { const k = K14B(t, 21.06, 0.5, 'inOut'), pts = [[570, 1030], [570, 590], [770, 400], [970, 590], [970, 1030]]; c.save(); c.lineWidth = 16; c.strokeStyle = C.red; c.lineJoin = 'round'; K.poly(c, K.trim(pts, k)); c.stroke(); c.restore(); }
      if (t >= 21.3) heart(c, 770, 500, 50 * K.ease.back(K14B(t, 21.3, 0.35)));
    } }); }
    if (t >= 22.1 && t < 23.25) { const u = K.clamp((t - 22.1) / 1.1); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + u * 5, r = K.lerp(140, 30, K.ease.in(u)); star(ctx, K14R_STONE[0] + Math.cos(a) * r, 650 + Math.sin(a) * r * 0.6, 14, C.yellow, u * 8 + i); } }
    // S3: POOF and the silhouette morph
    if (t >= 23.2) {
      const d = t - 23.2;
      if (d >= 0.9) { const P = k14rChild(t); if (d < 2.0) { ctx.save(); ctx.filter = 'brightness(0)'; const k = K.clamp((d - 0.9) / 0.6); P.sq = K.lerp(0.5, 1, k); P.alpha = 0.9; person(ctx, P); ctx.restore(); } else person(ctx, P); }
      if (d < 0.9) k14Mouse(ctx, { x: K14R_STONE[0], y: K14R_STONE[1] - 14, s: 0.75, who: 'her', dir: -1, sit: 1, silhouette: true, sq: K.lerp(1, 1.6, K.clamp(d / 0.9)) });
      poofBurst(ctx, K14R_STONE[0], 630, d, 190, 5);
      if (t >= 26.02 && t < 27.3) { const r = K.rng(77); for (let i = 0; i < 5; i++) { const a = r() * 6.28, rr = 90 + r() * 40, k = K14B(t, 26.02 + i * 0.08, 0.4, 'out'); star(ctx, K14R_STONE[0] + Math.cos(a) * rr, 590 + Math.sin(a) * rr * 0.6 + 20 * k, 10 * (1 - 0.3 * k), C.yellow, i); } }
    }
  },
  over(ctx, t, cam, S) {
    k14Label(ctx, S, cam, 170, 330, 'THE ASCETIC', t, 0.3, 2.9); k14Arrow(ctx, S, cam, [190, 350], [222, 470], t, 0.45, 2.9, { width: 16 });
    k14Label(ctx, S, cam, 760, 1000, 'RIVER', t, 2.18, 3.6, { size: 36 });
    if (t >= 5.7 && t < 7.1) { const g = K14R_GRIP(t); k14Label(ctx, S, cam, g[0] + 160, g[1] + 150, 'MOUSE!', t, 5.7, 7.1); k14Arrow(ctx, S, cam, [g[0] + 130, g[1] + 120], [g[0] + 30, g[1] + 50], t, 5.8, 7.1, { width: 16 }); }
    k14Sfx(ctx, cam, K14R_LAND[0] + 70, K14R_LAND[1] - 90, 'PLOP!', t, 11.4, 0.9, 70);
    k14Sfx(ctx, cam, K14R_STONE[0] + 120, 470, 'POOF!', t, 23.25, 1.3, 110, { rot: -0.08 });
  },
};
