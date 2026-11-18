// ===== AN-105 main: which place is on screen, camera, overlays (labels, counters, balloons, thought clouds, dream wash), transitions, sound =====
const A105_DUR = 179.99;            // plan duration 178.262 + end hold 1.73 (3-minute cap)
const A105_VW = 1000, A105_VH = 1230;

// ---------- places ----------
function a105Place(t) {
  if (t < 10.3) return 'street'; if (t < 18.5) return 'inn'; if (t < 25.9) return 'hall'; if (t < 33.2) return 'street';
  if (t < 88.26) return 'hall'; if (t < 95.5) return 'cairo'; if (t < 102.0) return 'road'; if (t < 115.0) return 'inn';
  if (t < 135.4) return 'hall'; if (t < 152.84) return 'yard'; if (t < 171.2) return 'hall'; if (t < 173.7) return 'yard'; return 'hall';
}
const A105_WW = { street: 1800, inn: 1000, hall: 1000, cairo: 1000, road: 2400, yard: 1600 };

// ---------- camera ----------
// v2: a medium shot (zoom 1.5-1.8, floor band small) is the hall default; the wide shot only for the arrival, the canes, a 1 s re-establish at 49.04, the dash and CASE CLOSED
const A105_WIDE = { x: 520, y: 690, zoom: 1.15 };
const A105_CAMH = [
  [18.5, A105_WIDE], [19.8, A105_WIDE], [20.5, { x: 640, y: 810, zoom: 1.6 }], [21.9, { x: 640, y: 810, zoom: 1.6 }], [22.6, { x: 770, y: 810, zoom: 1.9 }], [24.3, { x: 770, y: 810, zoom: 1.9 }], [24.75, { x: 600, y: 800, zoom: 1.45 }],
  [33.2, A105_WIDE], [35.5, A105_WIDE], [36.1, { x: 380, y: 810, zoom: 1.6 }], [40.22, { x: 380, y: 810, zoom: 1.6 }], [41.0, { x: 260, y: 830, zoom: 1.9 }], [44.5, { x: 260, y: 830, zoom: 1.9 }],
  [44.95, { x: 400, y: 800, zoom: 1.6 }], [48.9, { x: 400, y: 800, zoom: 1.6 }], [49.3, A105_WIDE], [50.02, A105_WIDE], [50.6, { x: 450, y: 800, zoom: 1.8 }], [53.0, { x: 450, y: 800, zoom: 1.8 }], [53.6, { x: 560, y: 790, zoom: 2.4 }], [55.4, { x: 560, y: 790, zoom: 2.4 }],
  [55.6, { x: 560, y: 810, zoom: 2.2 }], [58.4, { x: 560, y: 810, zoom: 2.2 }], [59.2, { x: 620, y: 810, zoom: 1.7 }], [62.36, { x: 620, y: 810, zoom: 1.7 }], [63.0, { x: 380, y: 810, zoom: 1.6 }], [66.0, { x: 380, y: 810, zoom: 1.6 }],
  [66.6, { x: 580, y: 810, zoom: 1.45 }], [71.62, { x: 580, y: 810, zoom: 1.45 }], [77.62, { x: 590, y: 790, zoom: 1.85 }], [78.99, { x: 590, y: 790, zoom: 1.85 }],
  [79.35, { x: 730, y: 790, zoom: 2.0 }], [83.4, { x: 730, y: 790, zoom: 2.0 }], [84.4, { x: 440, y: 810, zoom: 1.6 }], [87.16, { x: 480, y: 810, zoom: 1.6 }], [88.25, { x: 560, y: 790, zoom: 2.4 }],
  [115.0, { x: 620, y: 810, zoom: 1.7 }], [116.68, { x: 620, y: 810, zoom: 1.7 }], [117.1, { x: 690, y: 800, zoom: 2.0 }], [124.3, { x: 690, y: 800, zoom: 2.0 }], [125.1, { x: 520, y: 810, zoom: 1.5 }],
  [130.2, { x: 480, y: 800, zoom: 1.6 }], [133.4, { x: 480, y: 800, zoom: 1.6 }], [134.1, { x: 430, y: 720, zoom: 1.25 }], [134.9, { x: 300, y: 720, zoom: 1.25 }], [135.39, { x: 300, y: 720, zoom: 1.25 }],
  [152.84, { x: 740, y: 780, zoom: 1.5 }], [165.3, { x: 740, y: 780, zoom: 1.5 }], [165.7, A105_WIDE], [166.5, A105_WIDE], [167.0, { x: 420, y: 790, zoom: 1.45 }], [168.45, { x: 420, y: 790, zoom: 1.45 }], [169.6, { x: 400, y: 720, zoom: 1.3 }], [171.19, { x: 400, y: 720, zoom: 1.3 }],
  [173.7, { x: 330, y: 800, zoom: 1.5 }], [174.4, { x: 330, y: 800, zoom: 1.5 }], [176.0, { x: 800, y: 780, zoom: 1.6 }], [177.3, { x: 820, y: 790, zoom: 1.75 }], [178.2, { x: 860, y: 810, zoom: 2.2 }], [A105_DUR, { x: 860, y: 810, zoom: 2.25 }]];
const A105_CAMI = [[10.3, { x: 395, y: 745, zoom: 2.0 }], [18.0, { x: 395, y: 745, zoom: 2.0 }], [18.5, { x: 560, y: 760, zoom: 1.5 }],   // v2: S2 in the same close framing as S13
  [102.0, { x: 480, y: 700, zoom: 1.15 }], [104.3, { x: 480, y: 700, zoom: 1.15 }], [104.9, { x: 585, y: 760, zoom: 1.75 }], [108.6, { x: 585, y: 760, zoom: 1.75 }], [109.4, { x: 495, y: 750, zoom: 1.5 }],
  [110.6, { x: 495, y: 750, zoom: 1.5 }], [111.1, { x: 340, y: 760, zoom: 2.0 }], [115.0, { x: 340, y: 760, zoom: 2.0 }]];   // v2: both mats close, then the S2 close framing for the lit theft
const A105_CAMC = [[88.26, { x: 470, y: 720, zoom: 1.5 }], [90.6, { x: 640, y: 720, zoom: 1.5 }], [94.6, { x: 640, y: 720, zoom: 1.5 }], [95.5, { x: 700, y: 720, zoom: 1.4 }]];
function a105CamRaw(t) {
  const pl = a105Place(t);
  if (pl === 'hall') { const c = { ...K.camAt(A105_CAMH, t) }, w = K.clamp((c.zoom - 1.15) / 0.25);   // v2: medium shots keep the feet low in the panel (floor band ~23%)
    c.y = K.lerp(c.y, 940 - 380 / c.zoom, w); return c; }
  if (pl === 'inn') return K.camAt(A105_CAMI, t);
  if (pl === 'cairo') return K.camAt(A105_CAMC, t);
  if (pl === 'street') {
    if (t < 10.3) { const sx = a105So1X(Math.min(t, 2.98)); const base = { x: Math.max(440, sx + 60), y: 700, zoom: 1.15 };
      if (t < 6.8) return base; if (t < 8.6) { const k = a105E(t, 6.8, 0.6); return { x: K.lerp(base.x, 700, k), y: K.lerp(700, 770, k), zoom: K.lerp(1.15, 1.7, k) }; }
      const k = a105E(t, 8.6, 0.6); return { x: K.lerp(700, 560, k), y: K.lerp(770, 720, k), zoom: K.lerp(1.7, 1.2, k) }; }
    return { x: kfn(t, [[25.9, 760], [32.5, 920]]), y: 700, zoom: 1.25 };
  }
  if (pl === 'road') { if (t < 98.4) return { x: a105So11X(t) - 230, y: 720, zoom: 1.3 }; const k = a105E(t, 98.4, 0.4); return { x: K.lerp(a105So11X(98.4) - 230, 1660, k) + (t > 100.9 ? a105So11X(t) - 1600 : 0) * 0.6, y: K.lerp(720, 770, k), zoom: K.lerp(1.3, 1.7, k) }; }   // v2: follow at a distance, then close on the wall
  // yard
  if (t < 142.9) return { x: kfn(t, [[135.4, 1250], [136.3, 1150], [137.1, 990], [138.75, 920], [139.4, 640], [140.1, 410]]), y: kfn(t, [[135.4, 700], [139.0, 700], [139.8, 740]]), zoom: kfn(t, [[135.4, 1.35], [137.1, 1.45], [138.75, 1.45], [139.8, 1.6]]) };   // v2: pool big in frame, then close on the lane mouths
  if (t < 152.84) return { x: kfn(t, [[142.9, 1350], [146.4, 1350], [147.8, 1120], [149.14, 1100], [150.0, 430]]), y: kfn(t, [[142.9, 740], [148.4, 680]]), zoom: kfn(t, [[142.9, 1.4], [146.4, 1.4], [147.8, 1.2], [150.0, 1.15], [150.9, 1.4]]) };
  return { x: 400, y: kfn(t, [[171.2, 820], [172.2, 560]]), zoom: 1.5 };
}
function a105Cam(t) { const c = a105CamRaw(t), z = c.zoom, WW = A105_WW[a105Place(t)]; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, A105_VH - 615 / z), zoom: z }; }
const a105W2V = (p, c) => (p ? [500 + (p[0] - c.x) * c.zoom, 615 + (p[1] - c.y) * c.zoom] : null);

// ---------- the world ----------
function a105World(ctx, t, cam) {
  const pl = a105Place(t);
  if (pl === 'street') return a105Street1(ctx, t, cam);
  if (pl === 'inn') return a105Inn(ctx, t, cam);
  if (pl === 'cairo') return a105Cairo(ctx, t, cam);
  if (pl === 'road') return a105Road(ctx, t, cam);
  if (pl === 'yard') return a105Yard(ctx, t, cam);
  // the hall
  const night = t < 26, dusk = t >= 173.7;
  palaceHall(ctx, { t, wall: 'blue', throne: false, dais: A105_DAIS, cushions: [A105_CHX], lampsLit: night || dusk ? 1 : 0.3, outside: a105HallOutside(t) });
  if (night || dusk) { ctx.save(); ctx.globalAlpha = night ? 0.35 : 0.2; ctx.fillStyle = night ? NAVY2 : '#a8261a'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
  if (dusk) a105Prints(ctx, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => [640 - i * 50, 918 + (i % 2) * 10, 0]), t, 1e9);
  const F = a105HallScene(t);
  for (const it of F.items) it.draw(ctx);
  return { heads: F.heads, F };
}

// ---------- lettering helpers (view units) ----------
function a105Name(ctx, t, text, t0, dur, at, head, o = {}) {
  if (t < t0 || t > t0 + dur) return; const p = K.clamp((t - t0) / 0.35), a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3);
  ctx.save(); ctx.globalAlpha = a; const r = S0.label(ctx, text, at[0], at[1], p, { size: o.size || 40, align: 'center', fill: o.fill, color: o.color });
  if (head) S0.arrow(ctx, [at[0] + (o.ax || 0), at[1] + r.h * 0.5], head, K.clamp((t - t0 - 0.15) / 0.4), { width: 16, bend: o.bend ?? 0.15 }); ctx.restore();
}
function a105Word(ctx, t, text, t0, dur, at, o = {}) {
  if (t < t0 || t > t0 + dur || !at) return; const a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3);
  ctx.save(); ctx.globalAlpha = a; S0.label(ctx, text, at[0], at[1], K.clamp((t - t0) / 0.3), { size: o.size || 50, align: 'center', fill: o.fill || C.yellow, color: o.color, tilt: o.tilt ?? -0.04, balloon: o.balloon }); ctx.restore();
}
function a105Count(ctx, t, t0, dur, v, at, o = {}) { if (t < t0 || t > t0 + dur || !at) return; const a = 1 - K.clamp((t - t0 - dur + 0.3) / 0.3); ctx.save(); ctx.globalAlpha = a; S0.counter(ctx, v, at[0], at[1], K.clamp((t - t0) / 0.3), { size: o.size || 80 }); ctx.restore(); }

// ---------- overlays ----------
function a105Overlays(ctx, t, cam, F) {
  const H = (F && F.heads) || {}, v = (p) => a105W2V(p, cam), above = (p, dy = 120) => (p ? [v(p)[0], v(p)[1] - dy] : null);
  // S1
  if (t < 2.6 && t > 0.25) { const k = K.ease.back(K.clamp((t - 0.25) / 0.35)); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 2.3) / 0.3); ctx.translate(500, 200); ctx.scale(k, k); ctx.translate(-500, -200); S0.title(ctx, 'THE SHARPER OF ALEXANDRIA', 500, 200, 1, { size: 54, align: 'center' }); ctx.restore(); }   // v2: the banner pops on whole (no overlapping word wipe)
  a105Name(ctx, t, 'ALEXANDRIA', 1.84, 2.1, [250, 320], v([1560, 330]), { size: 44, bend: -0.2 });
  if (a105In(t, 4.08, 5.4)) { const p = v([830, 520]); S0.arrow(ctx, [p[0] - 220, p[1] - 140], [p[0] - 50, p[1] - 30], a105B(t, 4.08, 0.4), { width: 16 }); }
  if (a105In(t, 8.2, 10.1) && H.purse) { const n = Math.round(1000 * K.ease.out(a105B(t, 8.2, 0.8))); a105Count(ctx, t, 8.2, 1.9, n, [v(H.purse)[0] - 60, v(H.purse)[1] - 400], { size: 84 }); }
  // S2
  if (a105In(t, 15.58, 16.6) && H.bag) { const b = v(H.bag); a105Name(ctx, t, 'CUT!', 15.58, 1.0, [b[0] + 110, b[1] - 250], [b[0] + 40, b[1] + 50], { size: 54, fill: C.yellow }); }
  if (a105In(t, 17.4, 18.4)) { const n = Math.round(1000 * (1 - K.ease.inOut(a105B(t, 17.52, 0.5)))); a105Count(ctx, t, 17.4, 1.0, n, [760, 300], { size: 90 }); a105Word(ctx, t, 'GONE!', 17.52, 0.9, [300, 250], { size: 60, fill: C.red, color: C.white }); }
  // S3
  if (H.ch && t > 20 && t < 26) a105Name(ctx, t, 'HUSAM AL-DIN, CHIEF OF POLICE', 21.0, 1.9, [520, 230], above(H.ch, 70), { size: 38 });
  if (H.ch && t > 25 && t < 26) a105Word(ctx, t, 'ARREST THEM ALL!', 25.16, 0.74, [480, 260], { size: 54, fill: C.red, color: C.white });
  // S4: numbers over the guests, the NO PROOF balloon, NEXT MORNING
  if (t > 26 && t < 29.5) [0, 1, 2, 3].forEach((i) => { const t0 = 27.3 + i * 0.4; if (t > t0 && t < 29.4) { const p = v([A105_LINE[i], 905 - 0.78 * 195 - 100 - (i % 2) * 55]); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 29.1) / 0.3);   /* v2: each number in its own slot above its guest's final place */ S0.counter(ctx, i + 1, p[0], p[1], a105B(t, t0, 0.3), { size: 46, seed: 70 + i }); ctx.restore(); } });
  if (a105In(t, 31.94, 32.9)) { a105Balloon(ctx, 560, 330, 300, 200, H.g && H.g[2] ? above(H.g[2], 40) : [560, 600], a105B(t, 31.94, 0.3), (c) => {
      c.save(); c.lineWidth = 6; c.strokeStyle = C.black; c.setLineDash([10, 8]); c.beginPath(); c.arc(-30, -10, 38, 0, 7); c.stroke(); c.restore();
      c.font = K.font(54, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.red; c.fillText('?', -30, -8);
      c.save(); c.translate(40, 10); c.lineWidth = 14; c.strokeStyle = C.black; c.beginPath(); c.moveTo(18, 18); c.lineTo(52, 52); c.stroke(); shape(c, ell(0, 0, 30, 30, 18), '#d6e4ff', { lw: 7, seed: 460 }); c.restore();
    }, { alpha: 1 - K.clamp((t - 32.6) / 0.3) }); a105Word(ctx, t, 'NO PROOF!', 32.1, 0.8, [560, 480], { size: 44, fill: C.white }); }
  // S5
  if (a105In(t, 43.26, 44.85) && H.so) { const h = v(H.so); thoughtCloud(ctx, h[0] + 200, h[1] - 230, 300, 210, t, { p: a105B(t, 43.26, 0.4), tail: [h[0] + 30, h[1] - 60], scale: 1, at: [0, 0], inside: (c) => {
      const k = a105E(t, 43.5, 0.6); a105Purse(c, -90 + 70 * k, 40 - 30 * k, 0.9); c.font = K.font(52, BF, 400); c.textAlign = 'center'; c.fillStyle = C.black; c.fillText('1000', 60, 30); } }); }
  // S6
  if (a105In(t, 50.78, 51.75) && H.sh) a105Word(ctx, t, 'STOP!', 50.78, 0.95, above(H.sh, 210), { size: 64, fill: C.red, color: C.white });
  if (a105In(t, 54.36, 55.5) && H.sh) a105Word(ctx, t, 'I TOOK IT!', 54.36, 1.1, [Math.min(760, v(H.sh)[0] + 150), v(H.sh)[1] - 250], { size: 52, balloon: true, fill: C.white });
  // S7
  if (a105In(t, 57.9, 59.6)) { const p = H.pu ? v(H.pu) : [520, 300]; a105Name(ctx, t, 'THE PURSE!', 57.9, 1.6, [Math.min(780, p[0] + 230), Math.max(170, p[1] - 200)], [p[0] + 30, p[1] - 20], { size: 46, fill: C.yellow }); a105Count(ctx, t, 58.0, 1.5, 1000, [220, 240], { size: 72 }); }
  if (a105In(t, 65.38, 66.25)) a105Word(ctx, t, 'PHEW!', 65.38, 0.87, [380, 230], { size: 48, fill: C.white });
  if (a105In(t, 66.4, 68.1)) a105Word(ctx, t, 'CLAP!', 66.4, 1.7, [230, 250], { size: 44, fill: C.white, tilt: -0.08 });   // v2: the praise is applause
  if (a105In(t, 66.85, 68.4)) a105Word(ctx, t, 'CLAP!', 66.85, 1.55, [480, 190], { size: 40, fill: C.yellow, tilt: 0.06 });
  // S8 the boast balloons
  const shV = H.sh ? v(H.sh) : [480, 600];
  if (a105In(t, 73.52, 75.6)) { const sh = 1 - a105E(t, 75.0, 0.5); a105Balloon(ctx, 300, 290, 320 * sh + 1, 210 * sh + 1, [shV[0] - 30, shV[1] - 70], a105B(t, 73.52, 0.3), (c) => {
      a105Purse(c, -70, 40, 0.9); c.save(); c.lineWidth = 8; c.strokeStyle = C.black; c.beginPath(); c.arc(0, 0, 60, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.restore();
      a105HeadIcon(c, A105_LOOK.soldier, 80, 10, 0.55, { mouth: 'smile' }); if (t > 74.62) a105Cross(c, 0, 0, 80, a105B(t, 74.62, 0.14)); }); }
  if (a105In(t, 76.72, 79.0)) { a105Balloon(ctx, 300, 290, 320, 210, [shV[0] - 30, shV[1] - 70], a105B(t, 76.72, 0.3), (c) => {
      const lift = Math.sin(t * 5) * 6; a105Purse(c, -30, 40 + lift, 0.9); shape(c, ell(-30, -40 + lift, 16, 16, 12), C.white, { lw: 4, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); seg(c, -30, -48 + lift, -60, -100, 18, A105_GREEN, 4);
      if (t > 77.2) { const k = K.ease.back(a105B(t, 77.2, 0.3)); c.save(); c.translate(80, -30); c.scale(k, k); shape(c, ell(0, 0, 44, 44, 20), C.red, { lw: 5, seed: 461 }); c.font = K.font(44, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.white; c.fillText('X2', 0, 2); c.restore(); } }); }
  if (a105In(t, 77.62, 79.0)) a105Word(ctx, t, 'STEALING IT TWICE!', 77.62, 1.38, [520, 520], { size: 46, fill: C.red, color: C.white });
  // S9
  if (a105In(t, 82.18, 83.0) && H.ch) a105Word(ctx, t, 'HOW?!', 82.18, 0.82, [v(H.ch)[0] - 80, v(H.ch)[1] - 190], { size: 60 });
  // S10-S13 the flashback labels
  if (a105In(t, 94.7, 95.5) && H.so) a105Name(ctx, t, 'CAIRO', 94.7, 0.8, [260, 260], null, { size: 50 });
  if (a105Place(t) === 'road') {
    for (const [txt, x, t0] of [['TOWN 1', A105_ROAD.ms[0], 96.98], ['TOWN 2', A105_ROAD.ms[1], 98.06], ['ALEXANDRIA', 2080, 101.3]]) { if (t < t0 || t > t0 + 1.4) continue; const p = v([x, 780]); a105Name(ctx, t, txt, t0, 1.4, [p[0] + 90, p[1] - 330], null, { size: 40 }); }
    // v2: the crossed-purse balloon (100.74) dropped: the fury over the wall says it
  }
  if (a105In(t, 104.16, 105.6)) a105Name(ctx, t, 'THE INN, ALEXANDRIA', 104.16, 1.4, [500, 230], null, { size: 40 });
  // S14
  if (a105In(t, 116.68, 117.9)) { const p = v([A105_PURSE[0], A105_PURSE[1] - 30]); ctx.save(); ctx.translate(p[0], p[1]); const k = 1 + 0.06 * Math.sin((t - 116.68) * 12); ctx.scale(k, k); a105Name(ctx, t, 'THE PURSE', 116.68, 1.2, [-180, -230], [-20, -40], { size: 44 }); ctx.restore(); }
  if (a105In(t, 119.52, 120.3) && H.sh) a105Word(ctx, t, 'MAY I?', 119.52, 0.78, [v(H.sh)[0] - 60, v(H.sh)[1] - 170], { size: 42, balloon: true, fill: C.white });
  if (a105In(t, 122.84, 123.45) && H.sh) a105Word(ctx, t, 'LIKE THIS...', 122.84, 0.61, [500, 300], { size: 46, fill: C.white });
  // S15-S16 the shared SAFE cloud, the burst, YOINK!
  if (a105In(t, 127.58, 132.4)) { const tail = H.so ? v(H.so) : [400, 600], burst = a105B(t, 131.5, 0.5); const cloudP = t < 131.6 ? a105B(t, 127.58, 0.5) : 1 - burst;
    if (cloudP > 0.02) thoughtCloud(ctx, 560, 300, 380, 230, t, { p: cloudP, tail: [tail[0] + 10, tail[1] - 60], scale: 1, at: [0, 0], inside: (c) => {
      a105Purse(c, -10, 60, 1.1); const pts = []; for (let i = 0; i < 9; i++) pts.push([-80 + i * 20, -10 + 18 * Math.sin(i * 0.7)]); a105Chain(c, pts, 1);
      a105Padlock(c, 90, 10, 0.8, a105E(t, 131.5, 0.25)); if (t > 130.22) { const k = K.ease.back(a105B(t, 130.22, 0.25)); c.save(); c.translate(-20, -50); c.rotate(-0.15); c.scale(k, k); c.lineWidth = 8; c.strokeStyle = A105_GREEN; c.strokeRect(-80, -34, 160, 68); c.font = K.font(60, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = A105_GREEN; c.fillText('SAFE', 0, 2); c.restore(); } } });
    if (burst > 0 && burst < 1) for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28; star(ctx, 560 + Math.cos(a) * 240 * burst, 300 + Math.sin(a) * 160 * burst, 18 * (1 - burst) + 4); } }
  if (a105In(t, 132.54, 133.4)) a105Word(ctx, t, 'YOINK!', 132.54, 0.86, [380, 300], { size: 66, fill: C.yellow, tilt: 0.06 });
  // S17-S18
  if (a105In(t, 137.66, 138.6)) a105Word(ctx, t, 'SPLASH!', 137.66, 0.94, [500, 360], { size: 66, fill: '#9cc4ff' });
  if (a105In(t, 140.1, 141.5)) { const a = v([400, 650]); a105Name(ctx, t, 'LANES OF ALEXANDRIA', 140.1, 1.4, [500, 250], a, { size: 40 }); }
  if (a105In(t, 145.68, 146.8)) a105Word(ctx, t, 'AFTER HIM!', 145.68, 1.1, [480, 300], { size: 58, fill: C.red, color: C.white });
  if (a105In(t, 148.46, 149.2)) a105Word(ctx, t, 'TOO LATE!', 148.46, 0.74, [500, 300], { size: 58 });
  if (a105In(t, 152.22, 152.84) && H.gb) { const p = v(H.gb); ctx.save(); S0.label(ctx, 'GOLD', p[0] + 120, p[1] - 240, a105B(t, 152.22, 0.3), { size: 36, align: 'center' }); ctx.restore(); a105Count(ctx, t, 152.22, 0.62, 0, [p[0] + 120, p[1] - 140], { size: 70 }); }
  // S19 the ruling, as a three-frame strip
  if (a105In(t, 156.6, 161.2)) { const fr = [[200, 'thief', 156.6, 157.16], [500, 'purse', 157.66, 158.62], [800, 'glass', 159.22, null]], a = 1 - K.clamp((t - 160.9) / 0.3);
    ctx.save(); ctx.globalAlpha = a;
    for (const [x, kind, t0, tk] of fr) { if (t < t0) continue; const k = K.ease.back(a105B(t, t0, 0.3)); ctx.save(); ctx.translate(x, 240); ctx.scale(k, k);
      ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(-120, -100, 250, 210); ctx.fillStyle = C.white; ctx.fillRect(-130, -110, 250, 210); ink(ctx, K.rectPts(-130, -110, 250, 210), 7, 462);
      ctx.save(); ctx.beginPath(); ctx.rect(-130, -110, 250, 210); ctx.clip();
      if (kind === 'thief') a105HeadIcon(ctx, A105_LOOK.sharper, -5, 0, 1.25, { mouth: 'smile', brow: -0.4 });
      if (kind === 'purse') a105Purse(ctx, -5, 60, 1.3);
      if (kind === 'glass') { const run = a105B(t, 159.25, 0.35), tip = a105E(t, 159.6, 0.25); a105Hourglass(ctx, -5, 0, 1 - run, t, { s: 1.3, rot: tip * 1.57, run: run < 1 }); }
      ctx.restore(); if (tk) a105Tick(ctx, 70, 50, 1.2, a105B(t, tk, 0.2)); ctx.restore(); }
    ctx.restore(); }
  if (a105In(t, 165.5, 166.6)) a105Word(ctx, t, 'CASE CLOSED!', 165.5, 1.1, [560, 300], { size: 56, fill: C.red, color: C.white });
  // S20 the empty bag: counter 0
  if (a105In(t, 167.08, 168.4) && H.so) a105Count(ctx, t, 167.08, 1.3, 0, [v(H.so)[0] + 300, v(H.so)[1] - 90], { size: 80 });
  // S22
  if (a105In(t, 175.72, 177.4)) a105Word(ctx, t, 'WHAT A SCANDAL!', 175.72, 1.68, [430, 280], { size: 54, fill: C.red, color: C.white });
  if (t >= 176.0 && t < 177.4 && H.ch) { const h = v(H.ch); steam(ctx, h[0] - 60, h[1] - 90, t); steam(ctx, h[0] + 60, h[1] - 90, t + 0.3); }
  if (t >= 178.3) S0.title(ctx, 'THE END', 270, 1120, K.clamp((t - 178.3) / 0.8), { size: 80, align: 'center' });
}

// ---------- the scene ----------
const A105_SHAKE = (t) => K.spring(t, 130.82, 4, 16, 7) + 2 * K.spring(t, 150.4, 5, 14, 7) + K.spring(t, 165.5, 2, 16, 8) + K.spring(t, 23.85, 2, 16, 8);
const a105DreamK = (t) => (t < 87.16 ? 0 : t < 88.26 ? 1.7 * a105E(t, 87.16, 1.1) : t < 88.9 ? K.lerp(1.7, 1, a105E(t, 88.26, 0.64)) : t < 114.84 ? 1 : 1 - a105E(t, 114.84, 0.6));
const SCENE = {
  duration: A105_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = A105_SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / A105_VW, ph / A105_VH);
    const cam = a105Cam(t);
    ctx.save(); K.camera(ctx, A105_VW, A105_VH, cam); const F = a105World(ctx, t, cam); ctx.restore();
    // whip pan streaks (the snatch, 134.1-135.4) and the cut to the yard
    if (t >= 134.3 && t < 135.6) { const u = (t - 134.3) / 1.3; ctx.save(); ctx.globalAlpha = 0.85 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(33); for (let i = 0; i < 28; i++) ctx.fillRect(-200 + r() * 1200 + u * 400, r() * 1230, 260 + r() * 300, 8 + r() * 16); ctx.restore(); }
    const dk = a105DreamK(t); if (dk > 0.01) a105Dream(ctx, dk, t, t > 88.4 && t < 114.84 ? K.clamp((t - 88.4) / 0.4) : 0);
    a105Overlays(ctx, t, cam, F);
    if (t >= 32.8 && t < 33.6) S.transition(ctx, A105_VW, A105_VH, (t - 32.8) / 0.8, { caption: 'NEXT MORNING...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // very few, quiet effects in the narration pauses (23.74, 95.36, 114.84, 142.56, 165.36, after 178.06); master 0.6 at render
    k.bed(S.sfx.bed, 0, A105_DUR, 0.4);
    k.play('thud', 23.82, { gain: 0.35 });                  // the chief's fist in his palm
    k.play('whoosh', 95.4, { dur: 0.15, gain: 0.2 });       // Cairo to the road
    k.play('chime', 114.9, { note: 'E6', gain: 0.3 });      // the dream wash clears
    k.play('whoosh', 142.62, { dur: 0.2, gain: 0.2 });      // the last tip of the turban
    k.play('thud', 165.48, { gain: 0.4 });                  // CASE CLOSED: the hand on the dais
    k.play('chime', 178.2, { note: 'C6', gain: 0.5 });      // THE END
  },
};
window.SCENE = SCENE;
