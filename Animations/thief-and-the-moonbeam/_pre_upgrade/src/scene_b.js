// ===== the story: world layers, timeline, subtitles, score =====
const WW = 1000, WH = 1230, LH = 1450, Z2 = 2, ROOFY = 560, HOLE = [590, 810], FLOORY = 1100, DUR = 164;
const SH = [121.91, 123.11, 124.4, 125.75, 127.06, 128.39, 129.71]; // the seven Shulams, onsets measured from the narration
const MOON = [730, 175, 105];
const BEAM = [[680, 240], [790, 240], [820, 1100], [540, 1100]];
const beamX = (y, side) => side ? K.lerp(790, 820, (y - 240) / 860) : K.lerp(680, 540, (y - 240) / 860);

function layer2(key, h, draw) { return K.cached(key, () => { const c = K.layer(WW * Z2, h * Z2), x = c.getContext('2d'); x.scale(Z2, Z2); draw(x); return c; }); }
function skyLayer() {
  return layer2('sky', 700, (x) => {
    x.fillStyle = C.blue; x.fillRect(0, 0, WW, 700);
    const r = K.rng(5); x.fillStyle = C.yellow;
    for (let gy = 0, row = 0; gy < 700; gy += 12, row++) for (let gx = (row % 2) * 6; gx < WW; gx += 12) { const d = Math.hypot(gx - MOON[0], gy - MOON[1]), R = 360; if (d < R && d > MOON[2] - 6) { const rr = 5.2 * Math.pow(1 - d / R, 1.1); if (rr > 0.5) { x.beginPath(); x.arc(gx, gy, rr, 0, Math.PI * 2); x.fill(); } } }
    x.fillStyle = C.white; for (let i = 0; i < 46; i++) { const sx = r() * WW, sy = r() * 440, sz = 2 + r() * 3.2; if (Math.hypot(sx - MOON[0], sy - MOON[1]) > 150) { x.beginPath(); x.arc(sx, sy, sz, 0, Math.PI * 2); x.fill(); } }
    for (let i = 0; i < 6; i++) { const sx = 40 + r() * 560, sy = 40 + r() * 330; x.save(); x.translate(sx, sy); x.fillStyle = C.white; x.beginPath(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, rr = k % 2 ? 3 : 11; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } x.closePath(); x.fill(); x.restore(); }
    // skyline of city houses
    const rr = K.rng(9); let px = -30;
    while (px < WW + 30) { const w = 74 + rr() * 56, h = 60 + rr() * 80, y0 = 700 - (700 - ROOFY) - h + 40; const body = [[px, 700], [px, y0], [px + w, y0], [px + w, 700]];
      shape(x, body, NAVY, { lw: 5, seed: 40 + Math.floor(px) % 7 }); const g = rr() > 0.4 ? [[px - 6, y0], [px + w / 2, y0 - 38], [px + w + 6, y0]] : null; if (g) shape(x, g, NAVY2, { lw: 5, seed: 50 });
      x.fillStyle = C.yellow; for (let wy = y0 + 16; wy < 600; wy += 30) for (let wx = px + 12; wx < px + w - 14; wx += 26) if (rr() > 0.55) x.fillRect(wx, wy, 11, 15);
      px += w + 8 + rr() * 10; }
    // the moon: yellow disc, red dot shading, craters
    const mp = ell(MOON[0], MOON[1], MOON[2], MOON[2], 64); x.fillStyle = C.yellow; K.poly(x, mp, true); x.fill();
    x.save(); K.poly(x, mp, true); x.clip(); x.fillStyle = dotPat(x, C.red, 9, 0.3); x.beginPath(); x.ellipse(MOON[0] + 42, MOON[1] + 40, 130, 118, 0, 0, Math.PI * 2); x.ellipse(MOON[0] + 8, MOON[1] + 6, 100, 90, 0, 0, Math.PI * 2, true); x.fill('evenodd'); x.restore();
    ink(x, mp, 9, 77); for (const [cx, cy, cr] of [[-35, -30, 17], [28, 18, 13], [-8, 46, 10], [40, -42, 9]]) ink(x, ell(MOON[0] + cx, MOON[1] + cy, cr, cr * 0.85, 18), 4.5, 78);
  });
}
function roomLayer() {
  return layer2('room', LH, (x) => {
    x.fillStyle = NAVY2; x.fillRect(0, 622, WW, LH - 622); x.fillStyle = dotPat(x, '#274fae', 14, 0.26); x.fillRect(0, 622, WW, LH - 622);
    // interior wall + night window
    x.fillStyle = WALL; x.fillRect(72, 622, 856, 478); x.fillStyle = dotPat(x, '#2c58b8', 16, 0.28); x.fillRect(72, 622, 856, 478);
    x.fillStyle = C.black; x.fillRect(72, 1078, 856, 22);
    shape(x, [[110, 668], [226, 668], [226, 770], [110, 770]], C.blue, { lw: 8, seed: 60 }); x.fillStyle = C.yellow; x.beginPath(); x.arc(172, 710, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = C.blue; x.beginPath(); x.arc(182, 703, 18, 0, Math.PI * 2); x.fill(); seg(x, 168, 668, 168, 770, 5, C.black, 0); seg(x, 110, 720, 226, 720, 5, C.black, 0);
    // door
    shape(x, [[836, 868], [920, 868], [920, 1100], [836, 1100]], NAVY2, { lw: 8, seed: 61, dot: C.blue, pitch: 10, rad: 0.25 }); shape(x, ell(895, 990, 8, 8, 10), C.yellow, { lw: 3 });
    // floor planks
    x.fillStyle = C.yellow; x.fillRect(40, 1100, 920, 350); x.fillStyle = dotPat(x, C.red, 12, 0.28); x.globalAlpha = 0.5; x.fillRect(40, 1180, 920, 270); x.globalAlpha = 1;
    for (let px = 40; px < 960; px += 84) seg(x, px, 1100, px - 14, 1450, 4, C.black, 0); seg(x, 40, 1230, 960, 1230, 4, C.black, 0); ink(x, K.rectPts(40, 1100, 920, 350), 8, 62);
    // bed: headboard, posts, pillows
    shape(x, [[84, 806], [98, 772], [442, 772], [456, 806], [456, 1100], [84, 1100]], WOOD, { lw: 7, seed: 63, dot: C.black, pitch: 9, rad: 0.2, da: 0.55 });
    for (const px of [205, 335]) shape(x, [[px - 66, 982], [px - 72, 930], [px - 50, 906], [px + 50, 906], [px + 72, 930], [px + 66, 982]], C.white, { lw: 6, seed: 64 + px % 3, dot: C.blue, pitch: 10, rad: 0.22, da: 0.5 });
  });
}
function roofLayer() {
  return layer2('roof', 1110, (x) => {
    shape(x, [[40, 622], [72, 622], [72, 1100], [40, 1100]], '#a8261a', { lw: 7, seed: 70, dot: C.black, pitch: 9, rad: 0.2, da: 0.5 });
    shape(x, [[928, 622], [960, 622], [960, 1100], [928, 1100]], '#a8261a', { lw: 7, seed: 71, dot: C.black, pitch: 9, rad: 0.2, da: 0.5 });
    for (const [a, b] of [[40, HOLE[0]], [HOLE[1], 960]]) {
      const p = [[a, ROOFY], [b, ROOFY], [b, 622], [a, 622]]; shape(x, p, C.red, { lw: 8, seed: 72, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.45 });
      x.save(); K.poly(x, p, true); x.clip(); for (let px = a + 20; px < b; px += 36) seg(x, px, ROOFY + 14, px, 622, 4, C.black, 0); x.fillStyle = C.yellow; x.fillRect(a, ROOFY, b - a, 11); x.restore(); ink(x, p, 8, 73);
    }
  });
}
// camera: [t, {x, y, zoom}]
const CAM = [
  [0, { x: 640, y: 380, zoom: 1.55 }], [5.8, { x: 540, y: 430, zoom: 1.45 }], [6.4, { x: 280, y: 470, zoom: 1.9 }], [9.6, { x: 450, y: 465, zoom: 1.85 }], [13.4, { x: 500, y: 790, zoom: 1.0 }],
  [17.0, { x: 430, y: 740, zoom: 1.2 }], [21.6, { x: 430, y: 740, zoom: 1.2 }], [22.8, { x: 300, y: 860, zoom: 1.95 }], [27.5, { x: 275, y: 850, zoom: 1.85 }], [33, { x: 300, y: 860, zoom: 1.85 }], [39.6, { x: 330, y: 870, zoom: 1.85 }], [48.8, { x: 300, y: 860, zoom: 1.85 }],
  [55.8, { x: 440, y: 720, zoom: 1.4 }], [63.4, { x: 440, y: 790, zoom: 1.3 }], [78, { x: 450, y: 800, zoom: 1.3 }], [84.4, { x: 600, y: 650, zoom: 1.2 }], [90.5, { x: 450, y: 800, zoom: 1.3 }],
  [96.0, { x: 450, y: 800, zoom: 1.3 }], [97.3, { x: 440, y: 520, zoom: 2.0 }], [101.4, { x: 450, y: 520, zoom: 2.15 }], [108.5, { x: 470, y: 700, zoom: 1.3 }], [113.7, { x: 600, y: 490, zoom: 1.9 }], [120.5, { x: 650, y: 500, zoom: 2.0 }], [131, { x: 640, y: 530, zoom: 1.95 }],
  [136.3, { x: 660, y: 540, zoom: 1.7 }], [137.4, { x: 665, y: 590, zoom: 1.55 }], [138.6, { x: 680, y: 700, zoom: 1.45 }], [140.5, { x: 680, y: 880, zoom: 1.4 }], [142.4, { x: 680, y: 950, zoom: 1.5 }], [145, { x: 620, y: 960, zoom: 1.6 }], [147.5, { x: 560, y: 940, zoom: 1.45 }], [151.5, { x: 600, y: 920, zoom: 1.6 }], [153, { x: 600, y: 840, zoom: 1.4 }], [160, { x: 600, y: 830, zoom: 1.4 }],
];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, LH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

function walker(t, keys, base) { const e = t < 13.6 ? 'lin' : 'inOut', x = kfn(t, keys, e), v = (kfn(t + 0.05, keys, e) - kfn(t - 0.05, keys, e)) / 0.1; return { x, ph: x / 21, amp: K.clamp(Math.abs(v) / 80) }; }
const LK = [[5.8, -60], [12.8, 505], [58, 505], [60, 540], [113, 540], [114, 556]];
const T2K = [[6.2, -190], [13.0, 400], [58, 400], [60, 470], [143, 470], [144.8, 585]];
const T3K = [[6.6, -320], [13.4, 305], [58, 305], [60, 380], [143.5, 380], [145.2, 500]];

function drawWorld(ctx, t, cam) {
  ctx.drawImage(skyLayer(), 0, 0, WW, 700);
  ctx.drawImage(roomLayer(), 0, 0, WW, LH);
  // moon hits
  let g = 0; for (const h of SH) if (t >= h) g = Math.max(g, Math.exp(-(t - h) * 3.6));
  const awake = t > 84.5 && t < 90 ? 0.25 : 0; g = Math.max(g, awake * (0.6 + 0.4 * Math.sin(t * 6)));
  for (const h of SH) if (t >= h && t < h + 0.8) { const u = (t - h) / 0.8; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 10 * (1 - u) + 2; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(MOON[0], MOON[1], MOON[2] + 8 + u * 130, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
  // the moonbeam
  const beamA = 0.38 + 0.22 * g + (t < 5 ? K.beat(t, 1.2, 2, 'out') * 0.1 : 0.1);
  ctx.save(); K.poly(ctx, BEAM, true); ctx.fillStyle = `rgba(255,226,110,${beamA})`; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.yellow, 13, 0.3); ctx.globalAlpha = 0.75 + 0.25 * g; ctx.fillRect(500, 230, 340, 880); ctx.restore();
  // sleepers / waking couple
  bedPeople(ctx, t);
  ctx.drawImage(roofLayer(), 0, 0, WW, 1110);
  roofCast(ctx, t);
  worldFX(ctx, t, cam);
}
// ---------- the couple in bed, and the owner when he gets up ----------
function bedPeople(ctx, t) {
  const sitO = kfn(t, [[16.8, 0], [19.2, 0.55], [21.8, 0.55], [24.4, 1], [108.4, 1], [109.4, 0], [142.3, 0], [142.5, 0.2]], 'inOut');
  const sitW = kfn(t, [[24.9, 0], [26.4, 1], [108.4, 1], [109.4, 0], [142.4, 0], [143.1, 1]], 'inOut');
  const rise = kfn(t, [[147.7, 0], [148.6, 1]], 'inOut');
  const owX = kfn(t, [[147.9, 205], [150.4, 470]], 'inOut');
  const wob = t > 56.3 && t < 62.2 ? Math.sin(t * 16) * 0.05 : 0;
  const hush = [[27.5, 33.1], [35.1, 39.6], [52.6, 56.2], [65.3, 77.2], [84.7, 90.7], [91, 97], [152.9, 155.8]];
  const wTalk = [[43.3, 48.8], [56.3, 62.2], [78.4, 82.7]];
  const own = { x: owX, y: K.lerp(1065, 1100, rise), s: 1.02, dir: 1, kind: 'owner', look: 0.7, ph: t * 10 * (rise > 0 && t < 150.6 ? 1 : 0), amp: rise > 0 && t < 150.6 ? 0.7 : 0, showLegs: rise > 0.2, legs: rise > 0.2 ? 1 : undefined };
  own.y += (1 - K.ease.inOut(sitO)) * 70 * (1 - rise);
  own.eyes = t < 21.9 ? 'shut' : t < 48.8 ? 'open' : t < 56.3 ? 'open' : t < 108.4 ? 'open' : t < 142.4 ? 'shut' : t < 147.7 ? 'wide' : 'wide';
  if (t >= 56.3 && t < 62.2) own.eyes = 'squint';
  own.talk = talk(t, hush, 0); own.mouth = t > 147.7 && t < 152.9 ? 'smile' : 'closed'; own.brow = t > 147.7 ? 1 : t < 21.9 ? 0 : 0.35; own.tilt = wob;
  own.aR = t > 24.8 && t < 26.6 ? [1.45, 1.7] : t > 33 && t < 35.2 ? [1.7, 2.1] : t > 48.8 && t < 56.2 ? [1.2, 2.6] : t > 150 ? [2.4, 2.7] : null;
  if (t > 147.8) { own.hold = 'stick'; own.aR = [2.35, 2.75 + Math.sin(t * 9) * 0.12 * (t < 152 ? 1 : 0)]; own.brow = 1; }
  own.capDroop = t > 147.8 ? 14 : 0;
  const wife = { x: 335, y: 1065 + (1 - K.ease.inOut(sitW)) * 70, s: 1.02, dir: -1, kind: 'wife', look: 0.7, gown: true };
  wife.eyes = t < 25.2 ? 'shut' : t >= 43.3 && t < 48.8 ? 'wide' : t < 108.4 ? 'open' : t < 142.5 ? 'shut' : 'wide';
  wife.talk = talk(t, wTalk, 1.3); wife.mouth = t >= 142.5 && t < 151 ? 'o' : t >= 143 ? 'frown' : 'closed'; wife.tilt = wob * 0.8;
  wife.aL = t >= 143.1 ? [-2.6, -3.3] : null;
  person(ctx, wife);
  if (rise < 0.4) person(ctx, own);
  // blanket
  shape(ctx, [[78, 992], [462, 992], [468, 1100], [72, 1100]], C.red, { lw: 7, seed: 80, dot: C.white, pitch: 11, rad: 0.2, da: 0.8 });
  shape(ctx, [[78, 992], [462, 992], [462, 1010], [78, 1010]], C.yellow, { lw: 5, seed: 81 });
  if (rise >= 0.4) person(ctx, own);
  const zz = (t >= 13.4 && t < 17.0) || (t >= 109 && t < 142.3);
  if (zz) { ctx.save(); ctx.globalAlpha = t < 17 ? K.env(t, 13.4, 17.0, 0.4, 0.4) : K.env(t, 109, 142.3, 0.5, 0.2); zzz(ctx, 215, 880, t); zzz(ctx, 345, 880, t, 0.5); ctx.restore(); }
}
// ---------- the three thieves on the roof + the leader's leap and fall ----------
function roofCast(ctx, t) {
  const cast = [{ k: LK, v: 0, s: 1.12, id: 'L' }, { k: T2K, v: 1, s: 1.0, id: 2 }, { k: T3K, v: 2, s: 0.95, id: 3 }];
  for (const c of cast) {
    if (c.id === 'L' && t >= 136.3) continue;
    const w = walker(t, c.k), P = { x: w.x, y: ROOFY + 4, s: c.s, dir: 1, kind: 'thief', v: c.v, ph: w.ph, amp: w.amp, look: 0.8, eyes: 'open' };
    const peek = t >= 56.3 && t < 62.4 ? 1 : 0;
    if (peek) { P.lean = [0.3, 0.2, 0.12][c.v] * K.env(t, 56.3, 62.4, 0.5, 0.4); P.aR = [2.6, 3.4]; }
    if (t >= 97.1 && t < 101.3) { P.eyes = 'wide'; P.mouth = 'o'; P.aL = [-0.9, -1.4]; P.aR = [0.9, 1.4]; P.drop = -3 * Math.sin(t * 30); }
    if (t >= 101.4 && t < 108.4) { P.lean = c.v === 0 ? 0 : 0.2; P.look = c.v === 0 ? 0.3 : 1; if (c.v === 0) { P.talk = talk(t, [[104.3, 108.1]], 0.5); P.aR = [1.9, 2.0]; } else P.mouth = 'smile'; }
    if (t >= 108.7 && t < 113.6) { P.lean = 0.08; P.aR = [0.3, 1.2]; P.aL = [-0.3, -1.2]; }
    if (c.v === 0 && t >= 114 && t < 120.9) { P.aR = [2.05, 2.1]; P.lean = 0.06; }
    if (c.v === 0 && t >= 120.9 && t < 131) { const hit = SH.some((h) => t >= h - 0.05 && t < h + 0.45); P.aL = [-2.4, -2.9 + (hit ? 0.3 : 0)]; P.aR = [2.4, 2.9 - (hit ? 0.3 : 0)]; P.talk = talk(t, SH.map((h) => [h, h + 0.5]), 0); P.drop = hit ? 3 : 0; P.lean = hit ? -0.06 : 0; P.eyes = 'wide'; }
    if (c.v === 0 && t >= 131 && t < 136.3) { P.aR = [1.5, 1.5]; P.aL = [1.4, 1.4]; P.lean = 0.22 * K.beat(t, 131, 1.2); P.mouth = 'closed'; P.eyes = 'wide'; P.y -= 6 * K.beat(t, 133, 1.5); }
    if (c.v !== 0 && t >= 138.7 && t < 144) { P.eyes = 'wide'; P.mouth = 'o'; P.aR = [2.6, 3.4]; P.aL = [-2.6, -3.4]; P.lean = 0.12; }
    if (c.v !== 0 && t >= 144) { P.eyes = 'open'; P.mouth = 'frown'; P.lean = 0.28 * K.beat(t, 144.2, 0.8); P.look = 0.6; P.aR = [2.0, 2.9]; P.aL = [-2.0, -2.9]; }
    if (c.v !== 0 && t >= 160.2) P.drop = 8 * K.beat(t, 160.2, 0.8);
    if (c.v !== 0 && t >= 152.5 && t < 160.2) P.mouth = 'frown';
    person(ctx, P);
  }
  leaderFall(ctx, t);
}
function leaderFall(ctx, t) {
  if (t < 136.3) return;
  const s = 1.12, P = { s, dir: 1, kind: 'thief', v: 0, look: 0.6 };
  if (t < 142.4) {
    let x, y, rot = 0;
    if (t < 138.0) { const u = K.clamp((t - 136.3) / 1.7); x = K.lerp(556, 682, K.ease.out(u)); y = ROOFY + 4 - 120 * Math.sin(Math.PI * Math.min(1, u * 1.15)) + K.ease.in(Math.max(0, u - 0.55) / 0.45) * 140; }
    else if (t < 141.5) { const u = K.clamp((t - 138.0) / 3.5); x = 682 + Math.sin(t * 2.2) * 10; y = K.lerp(ROOFY + 144, 770, u); rot = Math.sin(t * 3.1) * 0.12; }
    else { const u = K.clamp((t - 141.5) / 0.9); x = 682 - 14 * u; y = K.lerp(770, 1100, K.ease.in(u)); }
    const fl = Math.sin(t * 16) * 0.5; P.x = x; P.y = y; P.rot = rot; P.ph = t * 13; P.amp = t > 138 ? 1 : 0.3; P.eyes = 'wide'; P.mouth = t > 138.6 ? 'o' : 'closed';
    P.aL = [-2.3 + fl, -2.8 - fl]; P.aR = [2.3 - fl, 2.8 + fl]; if (t > 138 && t < 141.5) { P.aL = [-1.5 + fl, -1.5]; P.aR = [1.5 - fl, 1.5]; } person(ctx, P); return;
  }
  const u = K.ease.out(K.clamp((t - 142.4) / 0.5)), sit = K.beat(t, 147.2, 0.9);
  if (t < 147.2) { P.x = K.lerp(668, 560, u); P.y = K.lerp(1100, 1074, u); P.rot = 1.45 * u; P.eyes = 'shut'; P.mouth = t > 145 ? 'o' : 'closed'; P.aL = [0.2, 0.2]; P.aR = [0.3, 0.2]; P.drop = 0; }
  else { P.x = 560 + 70 * sit; P.y = K.lerp(1074, 1092, sit); P.rot = K.lerp(1.45, 0.3, sit); P.legs = K.lerp(1, 0.35, sit); P.eyes = t > 150.8 ? 'wide' : 'open'; P.mouth = t > 150.8 ? 'o' : 'frown'; P.aR = t > 150.4 ? [2.6, 3.2] : [1.0, 2.4]; P.aL = [-0.8, -2.2]; P.look = 0.8; }
  if (t >= 152.9) { P.mouth = t > 156.5 && t < 159.8 ? 'open' : 'frown'; P.talk = talk(t, [[156.6, 159.7]], 0.3); P.aR = t >= 157 ? [0.9, 0.2] : [2.4, 3.0]; P.drop = 14 * K.beat(t, 160.3, 0.9); P.eyes = t > 160.3 ? 'shut' : 'open'; P.rot = 0.3 + 0.1 * K.beat(t, 160.3, 0.9); P.look = t > 159.8 ? -0.2 : 0.8; if (t > 160) { P.tilt = 0.3 * K.beat(t, 160.2, 0.9); } }
  person(ctx, P);
}
// ---------- props, lettering, balloons, the thought cloud ----------
function worldFX(ctx, t, cam) {
  const A = K.clamp;
  // hole arrow while the thieves arrive
  if (t > 9.2 && t < 13.5) { ctx.save(); ctx.globalAlpha = K.env(t, 9.2, 13.5, 0.2, 0.5); S0.arrow(ctx, [430, 395], [640, 505], K.beat(t, 9.3, 0.7, 'out'), { bend: -0.15, width: 24 }); ctx.restore(); }
  // footsteps on the roof
  [17.7, 18.5, 19.3, 20.1].forEach((h, i) => { if (t >= h && t < h + 0.9) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - h - 0.55) / 0.35); sfx(ctx, i % 2 ? 'TAP' : 'TIP', 330 + i * 70, 505 - (i % 2) * 24, 58, K.beat(t, h, 0.22, 'lin'), { rot: i % 2 ? 0.14 : -0.14 }); ctx.restore(); } });
  // whisper balloons and the idea
  if (t >= 27.6 && t < 33.2) { bubble(ctx, 290, 700, 190, 90, 245, 780, K.beat(t, 27.6, 0.3, 'lin'), 'SHH!', { size: 50 }); }
  if (t >= 30.4 && t < 33.2) bubble(ctx, 120, 760, 110, 84, 170, 820, K.beat(t, 30.4, 0.3, 'lin'), '!', { size: 56, fill: C.yellow });
  if (t >= 32.0 && t < 35) bulb(ctx, 205, 720, K.beat(t, 32.0, 0.3, 'lin'));
  if (t >= 35.2 && t < 39.7) bubble(ctx, 215, 700, 210, 96, 215, 800, K.beat(t, 35.2, 0.3, 'lin'), '$ ?', { size: 56 });
  if (t >= 43.4 && t < 49.0) { const k = K.beat(t, 43.4, 0.3, 'lin'); sfx(ctx, 'HOW?!', 410, 700, 78, k, { rot: 0.1, fill: C.yellow }); }
  if (t >= 48.9 && t < 56.3) { for (let i = 0; i < 3; i++) { const u = ((t * 1.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[262 + i * 12, 806 + u * 40], [270 + i * 12, 826 + u * 40], [262 + i * 12, 836 + u * 40], [254 + i * 12, 826 + u * 40]], '#5fa0ff', { lw: 3.5 }); ctx.restore(); } sfx(ctx, 'HMM...', 430, 735, 60, K.beat(t, 49.2, 0.3, 'lin'), { rot: -0.1, fill: C.white }); }
  if (t >= 56.4 && t < 62.4) { sfx(ctx, 'PLEASE!', 440, 760, 62, K.beat(t, 56.4, 0.25, 'lin'), { rot: 0.08, fill: C.white }); sfx(ctx, '!?', 450, 235, 70, K.beat(t, 57.0, 0.25, 'lin'), { rot: -0.1 }); }
  // flashback / explanation cloud
  if (t >= 65.2 && t < 97.0) {
    const p = K.beat(t, 65.2, 0.5, 'lin') * (t > 96.4 ? 1 - K.beat(t, 96.4, 0.6, 'lin') : 1);
    cloud(ctx, 620, 775, 245, 160, NAVY, p, { tail: [-390, 110], inside: (c) => cloudScene(c, t) });
  }
  // thieves react
  if (t >= 97.2 && t < 101.3) for (const [x, y, d] of [[330, 330, 0], [470, 300, 0.12], [600, 330, 0.24]]) sfx(ctx, '!!', x, y, 74, K.beat(t, 97.2 + d, 0.2, 'lin'), { fill: C.red, rot: (x - 470) / 900 });
  if (t >= 101.6 && t < 108.4) bubble(ctx, 640, 330, 190, 92, 580, 400, K.beat(t, 101.6, 0.25, 'lin'), 'PSST!', { size: 52 });
  if (t >= 108.8 && t < 113.6) clockFace(ctx, 705, 420, 74, t - 108.8, K.beat(t, 108.8, 0.3, 'lin'));
  // the chant: one balloon per Shulam
  SH.forEach((h, i) => { const e = i < 6 ? SH[i + 1] : 131; if (t >= h && t < e - 0.02) bubble(ctx, 735, 300, 300, 112, 600, 350, K.beat(t, h, 0.18, 'lin'), 'SHULAM!', { size: 60, fill: i % 2 ? C.white : '#fff1a8' }); });
  // arrow down the beam, then the lunge
  if (t >= 114.4 && t < 119) { ctx.save(); ctx.globalAlpha = K.env(t, 114.4, 119, 0.2, 0.6); S0.arrow(ctx, [740, 300], [704, 520], K.beat(t, 114.5, 0.8, 'out'), { bend: 0.05, width: 22 }); ctx.restore(); }
  if (t >= 138.8 && t < 141.5) sfx(ctx, 'NOTHING!', 850, 640, 56, K.beat(t, 138.8, 0.2, 'lin'), { rot: -0.12, fill: C.white });
  if (t >= 142.6 && t < 147.3) dizzy(ctx, 780 - 8, 1030, t);
  if (t >= 145.4 && t < 147.4) sfx(ctx, 'OW!', 840, 980, 70, K.beat(t, 145.4, 0.2, 'lin'), { rot: 0.15 });
  if (t >= 147.9 && t < 152.9) { sfx(ctx, '!', 560, 860, 110, K.beat(t, 147.9, 0.2, 'lin'), { fill: C.red }); }
  if (t >= 153.0 && t < 156.2) bubble(ctx, 360, 790, 150, 100, 450, 910, K.beat(t, 153.0, 0.25, 'lin'), '?', { size: 70 });
  if (t >= 160.3 && t < 163.5) { for (let i = 0; i < 3; i++) { const u = ((t * 0.9 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; sfx(ctx, '...', 760 + i * 30, 960 - u * 70, 50, 1, { fill: C.white }); ctx.restore(); } }
}
let S0 = null;
// tiny scene inside the thought cloud (cloud-local coordinates, +-200 x +-130)
function cloudScene(c, t) {
  c.scale(1.2, 1.2); c.translate(0, 30);
  c.fillStyle = C.blue; c.fillRect(-230, -150, 460, 300); c.fillStyle = C.yellow; c.beginPath(); c.arc(-135, -62, 36, 0, Math.PI * 2); c.fill(); c.fillStyle = C.blue; c.beginPath(); c.arc(-122, -70, 33, 0, Math.PI * 2); c.fill();
  c.fillStyle = C.white; for (const [x, y] of [[-170, -100], [-60, -90], [20, -110], [120, -80], [170, -30], [-40, -40]]) { c.beginPath(); c.arc(x, y, 3.4, 0, Math.PI * 2); c.fill(); }
  const beamOn = K.beat(t, 70.6, 1.2, 'lin') * (t > 77.5 && t < 90.5 ? 0.7 : 1);
  c.save(); c.globalAlpha = Math.max(0.35, beamOn); shape(c, [[-120, -60], [-100, -78], [150, 100], [120, 118]], 'rgba(255,226,110,0.7)', { lw: 0 }); c.restore();
  shape(c, [[-230, 140], [-230, 40], [-150, 40], [-60, 62], [40, -26], [150, 62], [230, 62], [230, 140]], C.black, { lw: 5, seed: 90 });
  shape(c, [[-30, 140], [-30, 88], [170, 88], [170, 140]], NAVY2, { lw: 4, seed: 91, dot: C.yellow, pitch: 9, rad: 0.18, da: 0.6 });
  const climb = K.clamp((t - 65.4) / 5.2), slide1 = K.clamp((t - 75.0) / 2.4), slide2 = K.clamp((t - 91.0) / 3.2);
  const slope = (u) => [K.lerp(-150, 40, u), K.lerp(40, -26, u)];
  let x, y, pose = {}, ph = 0, amp = 0;
  if (t < 75) { [x, y] = slope(climb); ph = climb * 40; amp = climb < 1 ? 0.8 : 0; if (t > 70.8) { pose = { aL: [-2.4, -2.9], aR: [2.4, 2.9], mouth: 'open' }; } }
  else if (t < 91 || t >= 94.4) { const u = t < 91 ? slide1 : 1; x = K.lerp(40, 150, K.ease.inOut(u)); y = K.lerp(-26, 95, K.ease.inOut(u)); pose = u < 1 ? { aL: [-2.5, -2.9], aR: [2.5, 2.9] } : { aL: [-0.3, -1], aR: [0.3, 1] }; if (t >= 94.4) { x = 150; y = 95; pose = { aL: [-0.9, -1.6], aR: [0.9, 1.6] }; } }
  else { const u = slide2; x = K.lerp(40, 150, K.ease.inOut(u)); y = K.lerp(-26, 95, K.ease.inOut(u)); pose = { aL: [-2.5, -2.9], aR: [2.5, 2.9], mouth: 'smile' }; }
  if (t > 88.2 && t < 91 && t >= 88.2) { x = 40; y = -26; pose = { aL: [-2.4, -2.9], aR: [2.4, 2.9], mouth: 'open' }; }
  person(c, Object.assign({ x, y, s: 0.4, dir: 1, kind: 'owner', look: 0.5, eyes: 'open', ph, amp, showLegs: true, legs: 1 }, pose));
  if (t >= 71 && t < 73.5) star(c, 92, -92, 30, C.white, t * 2);
  if (t >= 88.3 && t < 91) sfx(c, 'SHULAM x7', 40, -92, 46, K.beat(t, 88.3, 0.2, 'lin'), { rot: -0.06 });
  if (t >= 94.6 && t < 97) sfx(c, 'SHHH...', 70, -92, 48, K.beat(t, 94.6, 0.2, 'lin'), { rot: 0.05, fill: C.white });
}

// ---------- subtitles ----------
function subtitle(ctx, W, H, t, s) {
  const ch = TIMING.chunks; let cur = null;
  for (let i = 0; i < ch.length; i++) { const e = ch[i], nx = ch[i + 1], endAt = nx && nx.a - e.b < 1.4 ? nx.a - 0.1 : e.b + 0.6; if (t >= e.a - 0.12 && t < endAt) { cur = e; break; } }
  const bx = 54, by = 1296, bw = 972, bh = 566;
  S0.box(ctx, bx, by, bw, bh, 1, { fill: C.white, lw: 9, seed: 13 });
  if (!cur) return;
  const a = K.clamp((t - cur.a + 0.12) / 0.14), maxW = bw - 90; ctx.save(); ctx.globalAlpha = a;
  let fs = 70, lines, lh; ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (; fs >= 44; fs -= 2) { ctx.font = K.font(fs, AF, AW); lines = K.wrap(ctx, cur.ar, maxW); lh = fs * 1.72; if (lines.length * lh <= 340) break; }
  let es = 44, enL, elh; ctx.direction = 'ltr';
  for (; es >= 30; es -= 2) { ctx.font = K.font(es, BF, 400); enL = K.wrap(ctx, cur.en, maxW); elh = es * 1.25; if (enL.length * elh <= 150) break; }
  const total = lines.length * lh + 22 + enL.length * elh, y0 = by + (bh - total) / 2;
  ctx.direction = 'rtl'; ctx.font = K.font(fs, AF, AW); ctx.fillStyle = C.black; lines.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + (i + 0.5) * lh));
  ctx.direction = 'ltr'; ctx.font = K.font(es, BF, 400); ctx.fillStyle = C.blue; ctx.letterSpacing = '1px'; enL.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + lines.length * lh + 22 + (i + 0.5) * elh)); ctx.letterSpacing = '0px';
  ctx.restore();
}

const SCENE = {
  duration: 166,
  draw(ctx, W, H, tNew, S) {
    const t = toOld(tNew); S0 = S; const L = K.layout(W, H), s = L.s;
    const shake = K.spring(t, 142.4, 14, 8, 5) + SH.reduce((a, h) => a + K.spring(t, h, 3.5, 11, 9), 0);
    ctx.save(); ctx.translate(shake * 0.8, -shake * 0.5);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px, py); ctx.scale(pw / WW, ph / WH);
    const cam = camAt(t);
    ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t, cam); ctx.restore();
    // panel-space overlays
    overlays(ctx, t, cam, S, s);
    // new-panel wipe before the leader steps up
    if (t > 112.9 && t < 114.5) { ctx.save(); S.transition(ctx, WW, WH, K.clamp((t - 112.9) / 1.6), { caption: 'LATER...' }); ctx.restore(); }
    ctx.restore();
    subtitle(ctx, W, H, tNew, s);
    ctx.restore();
    S.finish(ctx, W, H, t);
  },
  score(k0, S) {
    const k = { play: (n, t, p) => k0.play(n, toNew(t), p) }; k0.bed(S.sfx.bed, 0, 166, 0.5);
    [0.3, 0.75, 1.2, 1.65].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.08, gain: 0.4 }));
    k.play('scribble', 9.3, { medium: 'brush', dur: 0.7, gain: 0.5 }); k.play('pop', 10.15, { pitch: 1.2, gain: 0.5 });
    [17.7, 18.5, 19.3, 20.1].forEach((h) => k.play('thud', h, { gain: 0.3 }));
    k.play('pop', 27.6, { gain: 0.5 }); k.play('pop', 30.4, { pitch: 1.3, gain: 0.5 }); k.play('ding', 32.0, { gain: 0.5 }); k.play('pop', 35.2, { gain: 0.5 });
    k.play('stamp', 43.5, { gain: 0.4 }); k.play('pop', 49.2, { pitch: 0.8, gain: 0.5 }); k.play('pop', 56.4, { pitch: 1.1, gain: 0.5 }); k.play('pop', 57.0, { pitch: 1.4, gain: 0.4 });
    k.play('pop', 65.2, { pitch: 0.9, gain: 0.5 }); k.play('chime', 71.0, { note: 'E6', gain: 0.4 }); k.play('chime', 88.4, { note: 'C6', gain: 0.35 }); k.play('pop', 94.7, { pitch: 0.8, gain: 0.4 });
    k.play('stamp', 97.2, { gain: 0.4 }); k.play('pop', 97.35, { pitch: 1.2, gain: 0.4 }); k.play('pop', 101.6, { pitch: 1.1, gain: 0.4 });
    for (let t0 = 108.9; t0 < 113.5; t0 += 0.5) k.play('tick', t0, { gain: 0.5 });
    k.play('whoosh', 112.9, { dur: 0.9, gain: 0.55 }); k.scribble && 0;
    SH.forEach((h, i) => { k.play('pop', h, { pitch: 0.9 + i * 0.07, gain: 0.7 }); k.play('tick', h + 0.05, { gain: 0.6, pitch: 1 + i * 0.05 }); });
    k.play('stamp', SH[6], { gain: 0.4 });
    k.play('whoosh', 136.3, { dur: 0.7, gain: 0.5 }); k.play('wrong', 139.2, { gain: 0.6 }); k.play('whoosh', 141.5, { dur: 0.9, up: false, gain: 0.5 });
    k.play('stamp', 142.4, { gain: 1 }); k.play('thud', 142.4, { gain: 1 }); k.play('ding', 143.0, { gain: 0.3 }); k.play('pop', 145.5, { pitch: 0.7, gain: 0.5 });
    k.play('pop', 147.9, { pitch: 1.3, gain: 0.6 }); k.play('stamp', 147.9, { gain: 0.4 });
    k.play('pop', 153.0, { pitch: 1.0, gain: 0.5 }); k.play('whoosh', 158.8, { dur: 0.7, up: false, gain: 0.25 }); k.play('wrong', 160.4, { gain: 0.5 });
    k.play('stamp', 163.5, { gain: 0.7 }); k.play('chime', 163.9, { note: 'C6', gain: 0.9 });
  },
};
function overlays(ctx, t, cam, S, s) {
  // title card: gets out of the way within ~3 s
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Thief and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Moonbeam', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  // three thieves counter
  if (t >= 10.0 && t < 13.2) { ctx.save(); ctx.globalAlpha = K.env(t, 10.0, 13.2, 0.1, 0.4); S.counter(ctx, 3, 850, 330, K.beat(t, 10.0, 0.4, 'lin'), { size: 80 }); ctx.restore(); }
  // Shulam counter, one step per word
  if (t >= SH[0] - 0.05 && t < 131.6) { let n = 0; SH.forEach((h, i) => { if (t >= h) n = i + 1; }); const h = SH[Math.max(0, n - 1)]; ctx.save(); ctx.globalAlpha = K.env(t, SH[0] - 0.05, 131.6, 0.1, 0.5); S.counter(ctx, n, 850, 1040, K.clamp(0.4 + K.beat(t, h, 0.25, 'lin')), { size: 100, seed: 80 + n }); ctx.restore(); }
  // CRASH
  if (t >= 142.4 && t < 145.4) { const [cx, cy] = toPanel(668, 1010, cam); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 144.7) / 0.7); S.emphasis(ctx, cx, cy, 190, K.beat(t, 142.4, 0.45, 'lin'), { word: 'CRASH!', wx: 0.7, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 163.5) { S.title(ctx, 'THE END', 500, 190, K.beat(t, 163.5, 0.8, 'lin'), { size: 80, align: 'center' }); }
}
window.SCENE = SCENE; window.__SH = SH;
