// ===== the story: world layers, timeline, subtitles, score =====
const WW = 1000, WH = 1230, LH = 1450, Z2 = 2, ROOFY = 560, HOLE = [590, 810], FLOORY = 1100, DUR = 164;
const SH = [116.5, 117.7, 119.0, 120.4, 121.7, 123.0, 124.35].map(toOld); // the seven Shulams: audio onsets measured from the narration (film time), on the scene's old clock
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
  [96.0, { x: 450, y: 800, zoom: 1.3 }], [97.3, { x: 440, y: 520, zoom: 2.0 }], [101.4, { x: 450, y: 520, zoom: 2.15 }], [108.5, { x: 470, y: 700, zoom: 1.3 }], [113.7, { x: 580, y: 490, zoom: 1.9 }], [120.5, { x: 620, y: 495, zoom: 1.95 }], [toOld(125.3), { x: 620, y: 500, zoom: 1.9 }], [toOld(129.7), { x: 650, y: 500, zoom: 1.8 }], [toOld(131.9), { x: 665, y: 520, zoom: 1.75 }], [toOld(135.0), { x: 675, y: 560, zoom: 1.7 }], [toOld(135.6), { x: 680, y: 800, zoom: 1.5 }], [142.4, { x: 680, y: 950, zoom: 1.5 }], [145, { x: 620, y: 960, zoom: 1.6 }], [147.5, { x: 560, y: 940, zoom: 1.45 }], [151.5, { x: 600, y: 920, zoom: 1.6 }], [153, { x: 600, y: 840, zoom: 1.4 }], [toOld(157.2), { x: 600, y: 840, zoom: 1.4 }], [toOld(158.0), { x: 600, y: 728, zoom: 1.42 }], [166, { x: 600, y: 728, zoom: 1.42 }],
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
// ---------- acting layer (2026-11-15 upgrade, Fable 5.2 direction): every beat below is in FILM time T = toNew(t) ----------
// landmarks (world): the hole, the moon, the beam, the floor, the couple's heads
const LM = { hole: [700, 600], holeDeep: [700, 900], roof: [450, 560], moon: [730, 175], beam: [705, 520], floor: [650, 1100], wife: [335, 860], owner: [205, 860], bed: [270, 930], lens: null };
const headOf = (P, h = 190) => [P.x, P.y - h * (P.s || 1)];
const gz = (T, P, plan, ease) => look(T, headOf(P), plan, ease);
const between = (T, a, b) => T >= a && T < b;
const T_IMP = toNew(142.4);                       // the crash frame stays where it was (about 136.1 s)
const ON = [116.5, 117.7, 119.0, 120.4, 121.7, 123.0, 124.35];   // the seven Shulams, measured audio onsets (film time)

// ---------- the couple in bed, and the owner when he gets up ----------
function bedPeople(ctx, t) {
  const T = toNew(t);
  const sitO = kfn(T, [[25.9, 0], [27.2, 1], [103.62, 1], [104.6, 0], [141.12, 0], [141.3, 0.2]], 'inOut');
  const sitW = kfn(T, [[25.9, 0], [27.2, 1], [103.62, 1], [104.6, 0], [136.2, 0], [136.9, 1]], 'inOut');
  const rise = kfn(T, [[141.12, 0], [141.45, 1]], 'inOut');
  // the owner springs out of bed: crouch, hop, land beside the thief exactly on "ظهر" (142.36)
  const [hx, hl] = hop(T, 141.5, 0.86, 205, 470, 70), owX = T < 141.5 ? 205 : hx;
  const hush = [[27.5, 33.1], [35.1, 39.6], [52.6, 56.2], [65.3, 77.2], [84.7, 90.7], [91, 97], [152.9, 155.8]];
  const wTalk = [[43.3, 48.8], [56.3, 62.2], [78.4, 82.7]];
  const own = { x: owX, y: K.lerp(1065, 1100, rise) - hl, s: 1.02, dir: 1, kind: 'owner', look: 0.7, showLegs: rise > 0.2, legs: rise > 0.2 ? 1 : undefined };
  own.y += (1 - K.ease.inOut(sitO)) * 70 * (1 - rise);
  own.talk = talk(t, hush, 0); own.mouth = 'closed'; own.brow = T < 21.15 ? 0 : 0.2;
  // eyes: asleep, hears (brow twitch, head turns), one eye then the other opens quietly, pupils follow the feet above
  own.eyes = 'open';
  if (T < 21.15) { own.eyes = 'shut'; if (T > 18.62) { own.brow = 0.25 * K.beat(T, 18.62, 0.3, 'lin'); own.tilt = -0.08 * K.beat(T, 18.7, 0.5, 'out'); } }
  else if (T < 21.84) { own.wink = 'L'; own.lid = K.lerp(1, 0.3, K.beat(T, 21.15, 0.5, 'out')); own.tilt = -0.08; }
  else if (T < 22.58) own.lid = K.lerp(0.3, 0, K.beat(T, 21.84, 0.6, 'out'));
  own.gaze = gz(T, own, [[0, LM.roof], [21.15, [330, 560]], [22.4, [430, 560]], [23.5, [520, 560]], [24.1, LM.wife], [27.27, [460, 520]], [28.7, LM.wife], [34.96, LM.hole], [36.0, LM.wife], [41.6, [650, 560]],
    [47.62, [80, 760]], [48.3, [420, 740]], [48.9, LM.wife], [50.42, LM.hole], [51.3, [-200, 900]], [52.0, [700, 900]], [52.8, LM.hole], [54.0, LM.wife], [60.6, LM.hole], [69.5, LM.wife], [70.4, LM.hole], [79.5, LM.wife], [80.4, LM.hole],
    [93.3, LM.hole], [104.6, LM.hole], [136.2, LM.floor], [141.12, [620, 1060]], [151.4, [640, 1040]], [157.6, LM.hole], [158.4, [640, 1040]]], 0.18);
  if (T >= 21.15) own.lid = Math.max(own.lid || 0, blink(T + 0.4, 11));
  // nudge, hush, thumb at the roof, calm her, the idea, the whisper, point up, conduct, "more", the act, the stage whisper
  if (between(T, 24.3, 25.6)) { own.handR = [96 + 10 * pulse(T, 24.4, 0.25) + 10 * pulse(T, 24.9, 0.25), -112]; }
  if (between(T, 25.74, 27.27)) own.handR = PERSON_HANDS.hush.R;
  if (between(T, 27.27, 29.6)) own.handR = PERSON_HANDS.pointUp.R;
  if (between(T, 30.0, 31.12)) { own.handR = [78, -112 + 8 * Math.sin((T - 30) * 7)]; own.brow = -0.2; }
  if (between(T, 31.12, 32.44)) { own.handR = PERSON_HANDS.chin.R; own.lid = 0.35; own.brow = -0.4; own.mouth = 'smile'; }
  if (between(T, 32.44, 34.96)) { own.handR = PERSON_HANDS.cupMouth.R; own.tilt = 0.1; }
  if (between(T, 34.96, 35.9)) own.handR = PERSON_HANDS.pointUp.R;
  if (between(T, 40.7, 41.3)) own.handR = [72, -150 - 22 * pulse(T, 40.8, 0.4)];
  if (between(T, 41.84, 47.08)) { const a = (T - 41.84) * 5; own.handR = [62 + 12 * Math.cos(a), -138 + 12 * Math.sin(a)]; }
  if (between(T, 47.62, 50.42)) { own.handR = [20 + 6 * Math.sin(T * 9), -172]; own.brow = -0.3; if (between(T, 49.3, 49.62)) { own.wink = 'R'; own.tilt = 0.12; own.mouth = 'smile'; } }
  if (between(T, 50.42, 54.0)) { own.tip = -0.04; if (T > 52.4) own.handR = PERSON_HANDS.hush.R; }
  if (between(T, 54.0, 56.0)) own.tilt = 0.12 * Math.sin(Math.PI * 2 * K.clamp((T - 54.4) / 0.9));
  if (between(T, 60.6, 61.6)) own.sq = 1 + 0.05 * pulse(T, 60.6, 0.45) - 0.05 * pulse(T, 61.0, 0.55);
  // telling the tale with his hands: climbing mime, the downward sweep, the two-fist grip
  if (between(T, 64.46, 66.5)) { const k = Math.sin((T - 64.46) * 7); own.handL = [-36, -175 - 22 * k]; own.handR = [40, -175 + 22 * k]; }
  if (between(T, 72.12, 73.6)) { const u = K.ease.inOut(K.clamp((T - 72.12) / 1.3)); own.handR = [K.lerp(44, 90, u), K.lerp(-205, -90, u)]; }
  if (between(T, 88.22, 89.9)) { own.handL = PERSON_HANDS.grip.L; own.handR = PERSON_HANDS.grip.R; }
  // feigned sleep: one eye open under the snore ("they THOUGHT the couple slept")
  if (between(T, 104.6, 136.1)) { own.wink = 'L'; own.lid = 0.55; }
  if (T >= 136.1 && T < 141.12) { own.mouth = 'smile'; own.brow = 0.3; }
  // the sudden entry, the stick, the loom, the question; then the threat is over
  if (T > 141.12) { own.hold = 'stick'; own.capDroop = 14; own.brow = 1; own.eyes = 'wide'; own.lid = 0;
    const br = pulse(T, 144.3, 1.0); own.aR = [2.35 - 0.5 * pulse(T, 144.26, 0.35) + 0.25 * br, 2.75];
    if (T > 145.44) own.tip = 0.15 * K.beat(T, 145.44, 1.5, 'inOut');
    if (between(T, 149.1, 149.5)) own.drop = 6 * pulse(T, 149.1, 0.4);
    if (between(T, 150.2, 150.7)) own.aR = [1.7, 1.6];
    if (T > 151.44) { const u = K.beat(T, 151.44, 1.1, 'inOut'); own.aR = [K.lerp(2.35, 0.5, u), K.lerp(2.75, 0.3, u)]; own.brow = K.lerp(1, 0.2, u); own.tip = K.lerp(0.15, 0, u); own.eyes = 'open'; own.tilt = 0.1 * Math.sin(Math.PI * 2 * K.clamp((T - 157.0) / 0.9)); own.lid = blink(T, 12); }
  }
  if (rise > 0 && T < 142.36) { own.sq = T < 141.5 ? anticipate(T, 141.12, 0.38, 0.12) : 1.06; } else if (T >= 142.36) own.sq = (own.sq || 1) * landSquash(T, 142.36, 0.14);
  if (!own.sq && T > 22.6 && T < 103.6) own.sq = breathe(T, 1);
  const wife = { x: 335, y: 1065 + (1 - K.ease.inOut(sitW)) * 70, s: 1.02, dir: -1, kind: 'wife', look: 0.7, gown: true };
  wife.eyes = T < 25.3 ? 'shut' : T < 25.74 ? 'open' : 'open'; if (T >= 25.3 && T < 25.74) wife.lid = 0.6;
  wife.talk = talk(t, wTalk, 1.3); wife.mouth = 'closed';
  wife.gaze = gz(T, wife, [[0, LM.owner], [27.27, [500, 520]], [28.8, LM.owner], [36.3, LM.hole], [36.9, LM.owner], [40.2, LM.owner], [41.84, LM.hole], [47.4, LM.owner], [54.0, LM.owner], [56.0, LM.hole], [60.6, LM.owner], [74.12, LM.hole], [79.0, LM.owner],
    [93.3, LM.owner], [136.2, LM.floor], [141.6, [470, 900]], [142.6, [620, 1060]], [143.4, [470, 900]], [144.4, [620, 1060]], [145.6, [470, 900]], [146.8, [620, 1060]], [148.2, [470, 900]], [149.6, [620, 1060]], [151.44, [470, 900]], [153.3, [620, 1060]], [156, [470, 900]]], 0.18);
  if (T >= 25.74) wife.lid = Math.max(wife.lid || 0, blink(T, 21));
  if (between(T, 25.74, 27.27)) wife.eyes = 'wide';
  if (between(T, 27.27, 30.0)) { wife.eyes = 'wide'; wife.wet = true; wife.handL = PERSON_HANDS.mouthCover.L; wife.handR = PERSON_HANDS.mouthCover.R; wife.x += tremble(T, 1.6); }
  if (between(T, 30.0, 31.2)) { const u = K.beat(T, 30.0, 0.8, 'inOut'); wife.handL = [-6, K.lerp(-168, -120, u)]; wife.handR = [10, K.lerp(-172, -124, u)]; }
  if (between(T, 36.0, 36.7)) wife.drop = 5 * pulse(T, 36.0, 0.3) + 5 * pulse(T, 36.35, 0.3);
  if (between(T, 37.0, 47.6)) wife.mouth = 'smile';
  if (between(T, 38.12, 41.84)) { wife.sq = 1.04; if (between(T, 39.4, 39.8)) wife.drop = 4 * pulse(T, 39.4, 0.4); if (between(T, 41.0, 41.84)) wife.tip = -0.06 * pulse(T, 41.0, 0.84); }
  if (between(T, 41.84, 45.84)) { wife.handR = PERSON_HANDS.cupMouth.R; wife.tilt = -0.12; }
  if (between(T, 45.84, 47.08)) { wife.handL = PERSON_HANDS.clasp.L; wife.handR = PERSON_HANDS.clasp.R; }
  if (between(T, 49.35, 50.6)) wife.mouth = 'smile';
  if (between(T, 54.0, 56.02)) { wife.handR = [92 + 12 * pulse(T, 54.3, 0.3) + 12 * pulse(T, 54.9, 0.3), -118]; wife.y -= 6 * pulse(T, 54.3, 0.3) + 6 * pulse(T, 54.9, 0.3); }
  if (between(T, 74.12, 78.94)) { wife.eyes = 'wide'; wife.handL = PERSON_HANDS.cheeks.L; wife.handR = PERSON_HANDS.cheeks.R; }
  if (between(T, 79.0, 80.4)) { wife.handL = PERSON_HANDS.mouthCover.L; wife.handR = PERSON_HANDS.mouthCover.R; wife.y += 2 * Math.abs(Math.sin(T * 18)); wife.lid = 0.5; }
  if (T >= 103.62 && T < 136.2) { wife.eyes = 'shut'; wife.lid = 0; wife.gaze = null; }
  if (T >= 136.2) { wife.eyes = T < 141.12 ? 'wide' : 'open'; wife.handL = [-4, -150]; wife.handR = [12, -152]; if (T > 151.44 && T < 159) { wife.handL = PERSON_HANDS.mouthCover.L; wife.handR = PERSON_HANDS.mouthCover.R; wife.lid = 0.3; } }
  if (!wife.sq && T > 27.2 && T < 103.6) wife.sq = breathe(T, 3);
  person(ctx, wife);
  if (rise < 0.4) person(ctx, own);
  // blanket (flips back when he springs out)
  ctx.save();
  shape(ctx, [[78, 992], [462, 992], [468, 1100], [72, 1100]], C.red, { lw: 7, seed: 80, dot: C.white, pitch: 11, rad: 0.2, da: 0.8 });
  shape(ctx, [[78, 992], [462, 992], [462, 1010], [78, 1010]], C.yellow, { lw: 5, seed: 81 }); ctx.restore();
  if (rise >= 0.4) person(ctx, own);
  const zz = (T >= 13.4 && T < 17.0) || (T >= 104.6 && T < 136.1);
  if (zz) { ctx.save(); ctx.globalAlpha = T < 17 ? K.env(T, 13.4, 17.0, 0.4, 0.4) : K.env(T, 104.6, 136.1, 0.5, 0.2); zzz(ctx, 215, 880, t); if (T < 17) zzz(ctx, 345, 880, t, 0.5); ctx.restore(); }
}
// ---------- the three thieves on the roof (leader, No. 2 the eager copycat, No. 3 the nervous one) ----------
function chantLeader(P, T) {
  const b = countedBeats(T, ON, { ant: 0.12, decay: 5 }), n = b.n; P.gaze = lookAt(headOf(P), LM.moon); P.mouth = 'closed'; P.brow = 0.5;
  if (n === 0) { P.drop = 4 * pulse(T, 115.75, 0.3); P.talk = 0; }
  P.talk = b.since < 0.55 ? 0.5 + 0.5 * Math.abs(Math.sin(b.since * 14)) : 0;
  const lvl = Math.min(n, 7);
  if (lvl === 1) { P.sq = 0.97; if (T < 116.9) P.gaze = lookAt(headOf(P), [430, 360]); P.handR = [40, -128]; }
  if (lvl >= 2) P.handR = [62, -152];
  if (lvl >= 3) { P.handR = null; P.aR = [2.45, 2.85]; }
  if (lvl >= 4) { P.handL = null; P.aL = [-2.45, -2.85]; }
  if (lvl >= 5) { P.sq = 1.05; P.drop = -4; }
  if (lvl >= 6) { P.eyes = 'shut'; const q = 0.08 * Math.sin(T * 40); P.aR = [2.65 + q, 3.0]; P.aL = [-2.65 - q, -3.0]; }
  if (lvl >= 7) { P.tip = -0.1 * K.beat(T, ON[6], 0.4, 'out'); P.eyes = 'shut';
    if (T > 125.0) { const u = K.beat(T, 125.0, 0.4, 'inOut'); P.aR = [K.lerp(2.65, 0.3, u), K.lerp(3.0, 0.2, u)]; P.aL = [K.lerp(-2.65, -0.3, u), K.lerp(-3.0, -0.2, u)]; P.tip = -0.1 * (1 - u); P.eyes = 'open'; P.wink = 'L'; } }
  P.sq = (P.sq || 1) * (1 - 0.05 * b.dip) * (1 + 0.04 * b.accent);
  // after the chant: proud; then step to the very lip, reach into the light, look at the empty fist, take the rope grip, glance back, crouch
  if (T >= 125.3) { P.wink = null; P.aL = P.aR = null; P.eyes = 'shut'; P.mouth = 'smile'; P.handL = [-30, -100]; P.handR = [30, -100]; P.tip = 0; P.sq = 1.02;
    if (T > 125.9) { P.eyes = 'open'; P.gaze = lookAt(headOf(P), LM.beam); }
    if (T > 126.04) { const u = K.clamp((T - 126.04) / 1.3); P.x = K.lerp(580, 600, K.ease.inOut(u)); P.ph = u * 4; P.amp = u < 1 ? 0.5 : 0; P.lean = 0.1;
      const r = K.ease.out(K.clamp((T - 126.3) / 0.6)), l = K.ease.out(K.clamp((T - 126.8) / 0.6)); P.handR = [K.lerp(30, 104, r), K.lerp(-100, -190, r)]; P.handL = [K.lerp(-30, 92, l), K.lerp(-100, -165, l)];
      P.gaze = lookAt(headOf(P), [P.x + 110, P.y - 210]); P.mouth = 'closed'; }
    if (between(T, 127.36, 128.4)) { P.handR = [96, -186]; P.brow = -0.4; P.tilt = 0.12; P.gaze = lookAt(headOf(P), [P.x + 100, P.y - 205]); P.lid = blink(T, 41) || (pulse(T, 127.9, 0.15)); P.mouth = 'o'; }
    if (T >= 128.4) { P.handL = PERSON_HANDS.grip.L; P.handR = PERSON_HANDS.grip.R; P.mouth = 'smile'; P.lid = 0.3; P.brow = 0.6; P.drop = 3 * pulse(T, 128.8, 0.3);
      if (between(T, 129.0, 129.3)) P.gaze = lookAt(headOf(P), [380, 380]); }
    if (T >= 129.25) { P.sq = anticipate(T, 129.25, 0.45, 0.18); P.tip = -0.08 * K.beat(T, 129.25, 0.3, 'out'); } }
}
function watchLeap(P, T, i) {
  const lx = 690;
  if (T < 129.7) { P.gaze = lookAt(headOf(P), [600, 360]); if (i === 1) P.lean = 0.12; if (i === 2) { P.handL = [-4, -186]; P.handR = [14, -190]; } }
  else if (T < 135.14) { P.lean = 0.22; P.gaze = lookAt(headOf(P), [lx, T < 131.9 ? 470 : 500]); P.mouth = 'o'; P.eyes = 'wide'; }
  else if (T < T_IMP) { P.tip = -0.06; P.eyes = 'wide'; P.mouth = 'o'; P.gaze = lookAt(headOf(P), [lx, 900]); }
  else if (T < T_IMP + 0.7) { P.eyes = 'shut'; P.sq = 0.94; P.mouth = 'frown'; P.handL = PERSON_HANDS.mouthCover.L; P.handR = PERSON_HANDS.mouthCover.R; }
  else { P.lean = 0.28 * K.beat(T, T_IMP + 0.7, 0.6, 'out'); P.eyes = 'open'; P.mouth = T > 151.4 ? 'frown' : 'o'; P.gaze = lookAt(headOf(P), [620, 1060]); P.lid = blink(T, 51 + i); }
  if (T > 129.7) P.x += i === 1 ? 16 : 10;
}
// ---------- the leader: jump, hang, realise, fall, crash, lie still, get up hurt, the confession, the shame ----------
// ---------- the three thieves on the roof + the leader's leap and fall ----------
function roofCast(ctx, t) {
  const T = toNew(t);
  const cast = [{ k: LK, v: 0, s: 1.12, i: 0 }, { k: T2K, v: 1, s: 1.0, i: 1 }, { k: T3K, v: 2, s: 0.95, i: 2 }];
  const pos = {};
  for (const c of cast) {
    if (c.i === 0 && T >= 129.7) continue;
    const w = walker(t, c.k), d = stagger(c.i, 0.13), Ti = T - d;
    const P = { x: w.x, y: ROOFY + 4, s: c.s, dir: 1, kind: 'thief', v: c.v, ph: w.ph, amp: w.amp, look: 0.8, eyes: 'open' };
    // shuffle steps on the TIP / TAP (16.6-20.3): a real foot plant under each letter
    const steps = [17.7, 18.5, 19.3, 20.1].map(toNew); let sx = 0; for (const h of steps) { if (T > h - 0.25) sx += 7 * K.clamp((T - h + 0.25) / 0.25); if (T > h - 0.25 && T < h) { P.ph = Math.PI / 2; P.amp = 0.6; P.y -= 5 * Math.sin(Math.PI * (T - h + 0.25) / 0.25); } }
    if (T > 16 && T < 108.8) P.x += sx * (c.i === 2 ? 1.2 : 1);
    // the leader alone walks the last two steps to the lip after LATER...
    if (c.i === 0 && T >= 108.86) { const u = K.clamp((T - 108.86) / 1.84); P.x = K.lerp(540 + sx, 580, K.ease.inOut(u)); P.ph = u * 6.3; P.amp = u < 1 ? 0.8 : 0; }
    P.gaze = gz(T, P, [[0, [1200, 520]], [13.55, LM.bed], [20.3, LM.bed], [27.27, LM.bed], [50.4 + d, LM.holeDeep], [72.12 + d, LM.moon], [73.0 + d, LM.beam], [74.12, LM.holeDeep], [93.3, [P.x, 300]],
      [95.6 + d, c.i === 0 ? [380, 380] : [560, 380]], [96.76, LM.holeDeep], [97.3, c.i === 0 ? [380, 380] : [560, 380]], [99.72, LM.beam], [101.68, c.i === 2 ? LM.holeDeep : [560, 380]], [103.62, LM.holeDeep],
      [108.86, LM.holeDeep], [112.34, [720, 420]], [113.3, LM.moon], [125.3, LM.beam], [129.7, [690, 480]], [131.9, [690, 500]], [135.14, [690, 760]], [135.7, LM.floor], [158.96, [630, 1040]], [160.58, c.i === 1 ? [380, 380] : [560, 380]], [161.4, [630, 1040]]], 0.2);
    P.lid = blink(T, 31 + c.i * 7);
    if (T > 20.3 && T < 56) P.sq = breathe(T, c.i + 4);
    // sneak in: forward lean, hands up at the chest; the leader stops the line, checks left and right
    if (T >= 6.2 && T < 13.24) { P.lean = 0.15; P.handL = [16, -128]; P.handR = [30, -136]; P.drop = 3;
      if (c.i === 0 && between(T, 9.15, 9.85)) { P.handR = [72, -176]; P.gaze = lookAt(headOf(P), T < 9.5 ? [-400, 520] : [1400, 520]); }
      if (c.i > 0) P.sq = 1 - 0.08 * pulse(T, 9.4 + c.i * 0.16, 0.22); }
    if (c.i === 0 && between(T, 11.7, 13.24)) P.handR = PERSON_HANDS.pointDown.R;
    // they think everyone is asleep
    if (between(T, 13.55, 16.56)) { P.lean = 0.2;
      if (c.i === 0 && between(T, 14.3, 15.7)) { P.handL = [-14, -186]; P.handR = [12, -190]; P.tilt = 0.25; P.lid = 0.7; }
      if (c.i === 1) P.drop = 5 * pulse(T, 14.6, 0.3) + 5 * pulse(T, 15.0, 0.3);
      if (c.i === 2 && T > 15.2) P.gaze = lookAt(headOf(P), [-300, 500]); }
    // the word "secret": heads snap to the hole in order
    if (between(T, 50.42, 56.2)) P.lean = 0.1 * K.beat(T, 50.42 + d, 0.25, 'out');
    // listening at the edge: crouched, hands on knees, a change every 2-3 s, never all at once
    const crouch = K.beat(T, 56.72 + d, 0.8, 'inOut') * (1 - K.beat(T, 91.4 + d, 1.6, 'inOut'));
    if (crouch > 0) { P.legs = K.lerp(1, 0.72, crouch); P.lean = 0.25 * crouch; P.y += 0; if (crouch > 0.5) { P.handL = [-6, -64]; P.handR = [30, -66]; }
      if (between(T, 62, 67)) P.tilt = (c.i === 1 ? 0.18 : 0.1) * K.beat(T, 62 + d * 2, 0.4, 'out');
      if (c.i === 1 && between(T, 62.4, 67)) P.handR = PERSON_HANDS.cupEar.R;
      if (between(T, 67.78, 70.94)) { P.drop = -4 * (c.i === 0 ? 1 : 0); P.gaze = lookAt(headOf(P), c.i === 0 ? [380, 380] : [560, 380]); }
      if (c.i === 1 && between(T, 84.46, 86.8)) { P.handR = [46, -150 - 8 * Math.abs(Math.sin(T * 6))]; P.talk = 0.4 + 0.4 * Math.abs(Math.sin(T * 9)); }
      if (c.i === 0 && between(T, 84.46, 86.8)) P.handR = PERSON_HANDS.chin.R;
      if (c.i === 0 && between(T, 88.22, 91.4)) P.handR = [60, -120 - 10 * Math.abs(Math.sin((T - 88.22) * 4))];
      if (c.i === 2) P.x -= 14 * crouch; }
    // the shock: squint, then pop wide and settle; three different reactions; then they look at each other
    if (between(T, 93.28 + d, 96.76)) { const k = T - 93.28 - d; if (k < 0.1) { P.eyes = 'squint'; P.sq = 0.97; } else { P.eyes = 'wide'; P.sq = settleTo(T, 93.38 + d, 0.97, 1, 0.35, 0.09); P.lid = 0; P.mouth = 'o'; }
      P.gaze = T < 95.6 + d ? [0, 0.05] : P.gaze; Object.assign(P, c.i === 0 ? { handL: PERSON_HANDS.headHold.L, handR: PERSON_HANDS.headHold.R } : c.i === 1 ? { handL: PERSON_HANDS.armsOut.L, handR: PERSON_HANDS.armsOut.R } : { handL: PERSON_HANDS.mouthCover.L, handR: PERSON_HANDS.mouthCover.R }); }
    // the huddle and the whisper
    if (between(T, 96.76, 103.62)) { P.mouth = 'smile';
      if (c.i === 0) { if (T > 97.3 && T < 99.72) { P.dir = -1; P.handR = T < 97.9 ? [70 - 14 * Math.sin(T * 14), -150] : PERSON_HANDS.cupMouth.R; P.talk = talk(T, [[98.0, 99.6]], 0.5); P.lean = 0.12; }
        if (between(T, 99.72, 100.7)) P.handR = PERSON_HANDS.pointFwd.R; if (between(T, 100.7, 101.68)) { P.handL = [22 + 4 * Math.sin(T * 30), -128]; P.handR = [30 - 4 * Math.sin(T * 30), -124]; } }
      else { P.lean = 0.2 * K.beat(T, 97.5 + d, 0.4, 'out') * (1 - K.beat(T, 101.6, 0.4)); }
      if (c.i === 1 && between(T, 101.68, 102.6)) P.drop = 6 * Math.abs(Math.sin((T - 101.68) * 10));
      if (c.i === 2 && T > 101.68) { P.drop = 5 * pulse(T, 102.3, 0.3) + 6 * pulse(T, 102.9, 0.35); P.mouth = 'closed'; } }
    // waiting: arms folded and a tapping foot; nodding off on the edge; peeking down
    if (between(T, 103.62, 108.6)) { if (c.i === 0) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.ph = Math.PI / 2; P.amp = 0.25 * Math.abs(Math.sin(T * 7)); }
      if (c.i === 1) { P.legs = 0.45; P.drop = 10 * K.clamp((T - 104.4) % 2.2 / 1.8); P.lid = 0.6; }
      if (c.i === 2) { P.lean = 0.3; P.gaze = lookAt(headOf(P), LM.holeDeep); } }
    // the leader at the lip: looks down the drop, wobbles back, swallows; then his eyes climb the beam to the moon
    if (c.i === 0 && between(T, 108.86, 115.6)) { P.tip = -0.06 * pulse(T, 111.0, 0.5); P.drop = 5 * pulse(T, 111.6, 0.35); P.brow = T > 113.8 ? 0.6 : 0; P.mouth = 'closed'; }
    if (c.i === 1 && between(T, 112.4, 113.2)) P.handR = [70 + 20 * pulse(T, 112.4, 0.8), -140];
    // the chant: seven Shulams, each one bigger than the last
    if (c.i === 0 && between(T, 115.0, 129.7)) chantLeader(P, T);
    if (c.i === 1 && between(T, 116.3, 125.6)) { const b = countedBeats(T, ON); P.handR = [46, -152 - 10 * b.accent]; P.gaze = lookAt(headOf(P), [580, 360]); }
    if (c.i === 2 && between(T, 116.3, 125.6)) P.gaze = lookAt(headOf(P), [[580, 360], LM.moon, LM.holeDeep][Math.floor((T - 116.3) / 1.1) % 3]);
    // watching the leap: eager / covering his eyes; lean over; heads track him; flinch; wince at the crash; peek down
    if (c.i > 0 && between(T, 125.3, 158.96)) watchLeap(P, T, c.i);
    if (c.i > 0 && T >= 158.96) { P.lean = 0.28; P.legs = 1; P.mouth = 'frown';
      if (c.i === 1 && between(T, 159.2, 160.4)) P.handR = [64 + 8 * Math.sin(T * 12), -196];
      if (c.i === 2 && between(T, 159.4, 164)) P.handR = [8, -214];
      if (T >= 160.58) { P.x -= 12 * K.beat(T, 160.58, 0.6, 'inOut'); P.lean = K.lerp(0.28, 0.1, K.beat(T, 160.58, 0.6, 'inOut')); } }
    pos[c.i] = P; person(ctx, P);
  }
  leaderFall(ctx, t);
}
function leaderFall(ctx, t) {
  const T = toNew(t); if (T < 129.7) return;
  const s = 1.12, P = { s, dir: 1, kind: 'thief', v: 0, look: 0.6 };
  if (T < T_IMP) {
    if (T < 130.3) { const u = K.clamp((T - 129.7) / 0.6), e = K.ease.out(u); P.x = K.lerp(600, 690, e); P.y = ROOFY + 4 - 90 * Math.sin(Math.PI / 2 * e); P.sq = K.lerp(1.15, 1.04, u); P.eyes = 'open'; P.mouth = 'smile'; P.handL = PERSON_HANDS.grip.L; P.handR = PERSON_HANDS.grip.R; P.ph = Math.PI / 2; P.amp = 0.5; }
    else if (T < 135.14) { const sink = 12 * K.clamp((T - 130.3) / 1.6) + 4 * K.clamp((T - 131.9) / 3.2); P.x = 690; P.y = ROOFY + 4 - 90 + sink; P.handL = PERSON_HANDS.grip.L; P.handR = PERSON_HANDS.grip.R;
      P.ph = Math.PI / 2; P.amp = swing(T, 130.3, 0.9, 1.3, 1.6) + (T > 134.4 ? 0.4 * Math.sin((T - 134.4) * 12) : 0);
      if (T < 131.9) { P.eyes = 'shut'; P.mouth = 'smile'; }
      else if (T < 133.64) { P.eyes = 'open'; P.mouth = 'closed'; P.brow = -0.4; P.gaze = T < 132.3 ? [0, 1] : T < 132.7 ? lookAt([690, 300], [690, 380]) : [0.2, 1]; }
      else { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.eyes = 'open'; P.brow = -0.5; P.mouth = 'closed';
        P.gaze = T < 134.2 ? lookAt([690, 300], [690, 420]) : [0, 0.05]; P.lid = T > 134.2 ? 0.5 + 0.5 * pulse(T, 134.5, 0.18) : 0;
        if (T > 134.78) { P.drop = 4 * pulse(T, 134.78, 0.3); P.handL = [-90, -170 + 30 * Math.sin(T * 20)]; P.handR = [90, -170 - 30 * Math.sin(T * 20)]; P.eyes = 'wide'; } } }
    else { P.x = K.lerp(690, 682, K.clamp((T - 135.14) / (T_IMP - 135.14))); P.y = fallY(T, 135.14, T_IMP, ROOFY + 4 - 74, 1100); P.sq = 1.18; P.rot = 0.5 * K.clamp((T - 135.14) / (T_IMP - 135.14));
      P.eyes = 'wide'; P.mouth = 'o'; const fl = Math.sin(T * 18) * 0.4; P.aL = [-2.6 + fl, -3.0]; P.aR = [2.6 - fl, 3.0]; P.ph = T * 13; P.amp = 1; }
    person(ctx, P); return;
  }
  // on the floor
  const u = K.ease.out(K.clamp((T - T_IMP) / 0.5));
  const sit = T < 139.34 ? 0 : T < 140.0 ? 0.55 * K.ease.out((T - 139.34) / 0.66) : T < 140.35 ? K.lerp(0.55, 0.4, (T - 140.0) / 0.35) : K.lerp(0.4, 1, K.ease.inOut(K.clamp((T - 140.35) / 0.65)));
  if (sit <= 0) { P.x = K.lerp(668, 560, u); P.y = K.lerp(1100, 1074, u) - rebound(T, T_IMP, 18); P.rot = 1.45 * u; P.eyes = 'shut'; P.mouth = 'closed'; P.aL = [0.2, 0.2]; P.aR = [0.3, 0.2]; P.sq = impactSquash(T, T_IMP);
    if (between(T, 137.3, 138.64)) { P.ph = 1.2 * Math.sin((T - 137.3) * 9); P.amp = 1 - K.clamp((T - 138.2) / 0.4); } }
  else { P.x = 560 + 70 * sit; P.y = K.lerp(1074, 1092, sit); P.rot = K.lerp(1.45, 0.3, sit); P.legs = K.lerp(1, 0.35, sit); P.eyes = 'squint'; P.wet = true; P.mouth = 'frown'; P.handR = PERSON_HANDS.headHold.R; P.aL = [-0.8, -2.2]; P.x += tremble(T, 1.5) * (T < 141.12 ? 1 : 0); }
  // the owner appears: jolt, scoot back, shield, eyes on the stick; shrink under the loom
  if (T >= 142.36) { const sc = K.ease.out(K.clamp((T - 142.36) / 0.35)); P.x -= 30 * sc; P.sq = 1 + 0.08 * pulse(T, 142.36, 0.3) - 0.08 * K.beat(T, 145.44, 1.5, 'inOut'); P.eyes = 'wide'; P.wet = false; P.mouth = 'o';
    P.handL = PERSON_HANDS.shield.L; P.handR = PERSON_HANDS.shield.R; P.aL = null; P.gaze = lookAt(headOf(P, 130), [520, 820]); P.x += tremble(T, 1.2);
    if (between(T, 146.6, 147.4)) P.gaze = [-1, 0.2]; if (T > 149.1) P.mouth = 'frown'; }
  // the sigh, the confession, the look up at his companions, and only then the head goes down
  if (T >= 151.44) { P.handL = [-24, -84]; P.handR = [28, -86]; P.mouth = 'frown'; P.eyes = 'open'; P.gaze = lookAt(headOf(P, 130), [520, 820]); P.sq = 1 + 0.04 * pulse(T, 151.44, 0.3) - 0.06 * K.beat(T, 151.74, 0.4) * (1 - K.beat(T, 153.0, 0.5));
    if (T < 152.4) { P.eyes = 'shut'; P.drop = 8 * K.beat(T, 151.74, 0.4); }
    if (between(T, 153.3, 155.52)) { P.lid = 0.45; P.handR = PERSON_HANDS.chest.R; P.tilt = 0.08 * Math.sin((T - 153.3) * 6); P.talk = talk(t, [[156.6, 159.7]], 0.3); }
    if (between(T, 155.52, 156.54)) { P.handR = [70, -190]; P.gaze = lookAt(headOf(P, 130), [700, 700]); }
    if (between(T, 156.54, 158.96)) { const k = K.beat(T, 156.54, 0.5, 'in'); P.handR = [K.lerp(70, 28, k), K.lerp(-190, -86, k)]; }
    P.talk = talk(t, [[156.6, 159.7]], 0.3);
    if (T >= 158.96) { P.gaze = lookAt(headOf(P, 130), [520, 360]); P.drop = -4; P.lid = 0; }
    if (T >= 161.68) { const k = K.beat(T, 161.68, 0.9, 'inOut'); P.drop = K.lerp(-4, 16, k); P.lean = 0.12 * k; P.lid = K.lerp(0, 0.75, k) + (T > 163.6 ? 0.25 * pulse(T, 163.6, 0.5) : 0); P.gaze = [0.1, 1]; P.handL = [-10, -70]; P.handR = [14, -72]; P.tilt = 0.2 * k; }
    if (T < 158.96) P.lid = Math.max(P.lid || 0, blink(T, 61)); }
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
  if (t >= 27.6 && t < toOld(29.6)) { bubble(ctx, 290, 700, 190, 90, 245, 780, K.beat(t, 27.6, 0.3, 'lin'), 'SHH!', { size: 50 }); }
  if (t >= 32.0 && t < 35) bulb(ctx, 205, 720, K.beat(t, 32.0, 0.3, 'lin'));
  if (t >= 35.2 && t < 39.7) bubble(ctx, 215, 700, 210, 96, 215, 800, K.beat(t, 35.2, 0.3, 'lin'), '$ ?', { size: 56 });
  if (t >= 43.4 && t < 49.0) { const k = K.beat(t, 43.4, 0.3, 'lin'); sfx(ctx, 'HOW?!', 410, 700, 78, k, { rot: 0.1, fill: C.yellow }); }
  if (t >= 48.9 && t < 56.3) { sfx(ctx, 'HMM...', 430, 735, 60, K.beat(t, 49.2, 0.3, 'lin'), { rot: -0.1, fill: C.white }); }
  if (t >= 56.4 && t < 62.4) { sfx(ctx, 'PLEASE!', 440, 760, 62, K.beat(t, 56.4, 0.25, 'lin'), { rot: 0.08, fill: C.white }); sfx(ctx, '!?', 450, 235, 70, K.beat(t, 57.0, 0.25, 'lin'), { rot: -0.1 }); }
  // flashback / explanation cloud
  if (t >= 65.2 && t < 97.0) {
    const p = K.beat(t, 65.2, 0.5, 'lin') * (t > 96.4 ? 1 - K.beat(t, 96.4, 0.6, 'lin') : 1);
    cloud(ctx, 640, 770, 330, 210, NAVY, p, { tail: [-400, 120], inside: (c) => { c.scale(1.3, 1.3); cloudScene(c, t); } });
  }
  // thieves react
  if (t >= 97.2 && t < 101.3) for (const [x, y, d] of [[470, 290, 0]]) sfx(ctx, '!!', x, y, 74, K.beat(t, 97.2 + d, 0.2, 'lin'), { fill: C.red, rot: (x - 470) / 900 });
  if (t >= 101.6 && t < toOld(99.5)) bubble(ctx, 520, 330, 190, 92, 545, 395, K.beat(t, 101.6, 0.25, 'lin'), 'PSST!', { size: 52 });
  if (t >= 108.8 && t < 113.6) clockFace(ctx, 705, 420, 74, t - 108.8, K.beat(t, 108.8, 0.3, 'lin'));
  // the chant: one balloon per Shulam
  SH.forEach((h, i) => { const e = i < 6 ? SH[i + 1] : 131; if (i === 0 && t >= h && t < e - 0.02) bubble(ctx, 735, 300, 300, 112, 600, 350, K.beat(t, h, 0.18, 'lin'), 'SHULAM!', { size: 60, fill: i % 2 ? C.white : '#fff1a8' }); });
  // arrow down the beam, then the lunge
  if (t >= 114.4 && t < toOld(toNew(114.4) + 2)) { ctx.save(); ctx.globalAlpha = K.env(t, 114.4, toOld(toNew(114.4) + 2), 0.2, 0.5); S0.arrow(ctx, [740, 300], [704, 520], K.beat(t, 114.5, 0.8, 'out'), { bend: 0.05, width: 22 }); ctx.restore(); }
  if (t >= toOld(133.64) && t < toOld(135.1)) sfx(ctx, 'NOTHING!', 850, 640, 56, K.beat(t, 138.8, 0.2, 'lin'), { rot: -0.12, fill: C.white });
  if (t >= 142.6 && t < 147.3) dizzy(ctx, 780 - 8, 1030, t);
  if (t >= 145.4 && t < 147.4) sfx(ctx, 'OW!', 840, 980, 70, K.beat(t, 145.4, 0.2, 'lin'), { rot: 0.15 });
  if (t >= toOld(142.36) && t < toOld(142.9)) { sfx(ctx, '!', 470, 760, 100, K.beat(t, toOld(142.36), 0.15, 'lin'), { fill: C.red }); }
}
let S0 = null;
// tiny scene inside the thought cloud (cloud-local coordinates, +-200 x +-130)
// the tall tale inside the thought cloud, cued to the owner's words (film time), large enough to read; the two-fist rope grip at 88.22
// is the pose the leader copies at 128.4 (cloud-local coordinates, about +-200 x +-130 before the scale)
function cloudScene(c, t) {
  const T = toNew(t);
  c.scale(1.2, 1.2); c.translate(0, 30);
  c.fillStyle = C.blue; c.fillRect(-230, -150, 460, 300); c.fillStyle = C.yellow; c.beginPath(); c.arc(-135, -62, 36, 0, Math.PI * 2); c.fill(); c.fillStyle = C.blue; c.beginPath(); c.arc(-122, -70, 33, 0, Math.PI * 2); c.fill();
  c.fillStyle = C.white; for (const [x, y] of [[-170, -100], [-60, -90], [20, -110], [120, -80], [170, -30], [-40, -40]]) { c.beginPath(); c.arc(x, y, 3.4, 0, Math.PI * 2); c.fill(); }
  const beamOn = K.beat(T, 66.6, 1.2, 'lin');
  c.save(); c.globalAlpha = Math.max(0.35, beamOn); shape(c, [[-120, -60], [-100, -78], [150, 100], [120, 118]], 'rgba(255,226,110,0.7)', { lw: 0 }); c.restore();
  shape(c, [[-230, 140], [-230, 40], [-150, 40], [-60, 62], [40, -26], [150, 62], [230, 62], [230, 140]], C.black, { lw: 5, seed: 90 });
  shape(c, [[-30, 140], [-30, 88], [170, 88], [170, 140]], NAVY2, { lw: 4, seed: 91, dot: C.yellow, pitch: 9, rad: 0.18, da: 0.6 });
  const P = { x: 40, y: -26, s: 0.52, dir: 1, kind: 'owner', look: 0.5, eyes: 'open', showLegs: true, legs: 1, mouth: 'smile' };
  const slope = (u) => [K.lerp(-150, 40, u), K.lerp(40, -26, u)], down = (u) => [K.lerp(40, 150, u), K.lerp(-26, 95, u)];
  if (T < 66.56) { const u = K.clamp((T - 62.6) / 3.9); [P.x, P.y] = slope(u); P.ph = u * 40; P.amp = u < 1 ? 0.8 : 0;            // hauls himself up the roof
    if (T > 64.46) { P.handL = [-30, -190 + 20 * Math.sin(T * 8)]; P.handR = [40, -190 - 20 * Math.sin(T * 8)]; P.lean = 0.2; P.mouth = 'closed'; } }
  else if (T < 72.12) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.gaze = lookAt([40, -100], [-135, -62]);   // hands on hips, looks up at the moon
    if (T > 69.4 && T < 70.94) { P.handR = PERSON_HANDS.pointUp.R; P.handL = PERSON_HANDS.hipsHands.L; } }                         // the magic word: finger up
  else if (T < 78.94) { const u = K.ease.inOut(K.clamp((T - 72.12) / 2.0)); [P.x, P.y] = down(u); P.eyes = 'shut'; P.handL = PERSON_HANDS.grip.L; P.handR = PERSON_HANDS.grip.R; if (u >= 1) { P.handL = [-30, -100]; P.handR = PERSON_HANDS.hush.R; P.eyes = 'open'; } }
  else if (T < 84.46) { P.x = 40; P.y = -26; P.handR = [36, -186]; P.gaze = lookAt([40, -100], [130, 90]); }                          // shades his eyes, looks along the beam
  else if (T < 88.22) { const b = countedBeats(T, [84.6, 85.0, 85.4, 85.8, 86.2, 86.5, 86.8]); P.x = 40; P.y = -26; P.talk = b.since < 0.3 ? 1 : 0; P.handR = [50, -150 - 16 * b.accent]; P.gaze = lookAt([40, -100], [-135, -62]); }
  else if (T < 89.64) { P.x = 40; P.y = -26; P.handL = PERSON_HANDS.grip.L; P.handR = PERSON_HANDS.grip.R; P.mouth = 'smile'; P.gaze = lookAt([40, -100], [60, -160]); }   // grips the light: hold so it registers
  else if (T < 91.42) { const u = K.ease.inOut(K.clamp((T - 89.64) / 1.6)); [P.x, P.y] = down(u); P.handL = PERSON_HANDS.grip.L; P.handR = PERSON_HANDS.grip.R; P.eyes = 'shut'; }   // slides down like a pole
  else { P.x = 150; P.y = 95; P.sq = landSquash(T, 91.42, 0.16); P.handR = PERSON_HANDS.hush.R; P.handL = [-30, -100]; P.ph = Math.PI / 2; P.amp = 0.2; }                    // tiptoe landing, finger to lips
  person(c, P);
  if (T >= 69.4 && T < 70.94) star(c, 92, -92, 30, C.white, t * 2);
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
    k.play('pop', 27.6, { gain: 0.5 }); k.play('ding', 32.0, { gain: 0.5 }); k.play('pop', 35.2, { gain: 0.5 });
    k.play('stamp', 43.5, { gain: 0.4 }); k.play('pop', 49.2, { pitch: 0.8, gain: 0.5 }); k.play('pop', 56.4, { pitch: 1.1, gain: 0.5 }); k.play('pop', 57.0, { pitch: 1.4, gain: 0.4 });
    k.play('pop', 65.2, { pitch: 0.9, gain: 0.5 }); k.play('chime', 71.0, { note: 'E6', gain: 0.4 }); k.play('chime', 88.4, { note: 'C6', gain: 0.35 }); k.play('pop', 94.7, { pitch: 0.8, gain: 0.4 });
    k.play('stamp', 97.2, { gain: 0.4 }); k.play('pop', 97.35, { pitch: 1.2, gain: 0.4 }); k.play('pop', 101.6, { pitch: 1.1, gain: 0.4 });
    for (let t0 = 108.9; t0 < 113.5; t0 += 0.5) k.play('tick', t0, { gain: 0.5 });
    k.play('whoosh', 112.9, { dur: 0.9, gain: 0.55 }); k.scribble && 0;
    SH.forEach((h, i) => { k.play('pop', h, { pitch: 0.9 + i * 0.07, gain: 0.7 }); k.play('tick', h + 0.05, { gain: 0.6, pitch: 1 + i * 0.05 }); });
    k.play('stamp', SH[6], { gain: 0.4 });
    k.play('whoosh', toOld(129.7), { dur: 0.6, gain: 0.45 }); k.play('wrong', toOld(133.7), { gain: 0.5 }); k.play('whoosh', toOld(135.14), { dur: 0.9, up: false, gain: 0.5 });
    k.play('stamp', 142.4, { gain: 1 }); k.play('thud', 142.4, { gain: 1 }); k.play('ding', 143.0, { gain: 0.3 }); k.play('pop', 145.5, { pitch: 0.7, gain: 0.5 });
    k.play('thud', toOld(142.36), { gain: 0.5 }); k.play('stamp', toOld(142.4), { gain: 0.3 });
    k.play('whoosh', 158.8, { dur: 0.7, up: false, gain: 0.25 }); k.play('wrong', 160.4, { gain: 0.5 });
    k.play('stamp', toOld(164.4), { gain: 0.7 }); k.play('chime', toOld(164.7), { note: 'C6', gain: 0.9 });
  },
};
function overlays(ctx, t, cam, S, s) {
  // title card: gets out of the way within ~3 s
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Thief and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Moonbeam', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  // three thieves counter
  if (t >= 10.0 && t < 13.2) { ctx.save(); ctx.globalAlpha = K.env(t, 10.0, 13.2, 0.1, 0.4); S.counter(ctx, 3, 850, 330, K.beat(t, 10.0, 0.4, 'lin'), { size: 80 }); ctx.restore(); }
  // Shulam counter, one step per word
  if (t >= SH[0] - 0.05 && t < toOld(125.8)) { let n = 0; SH.forEach((h, i) => { if (t >= h) n = i + 1; }); const h = SH[Math.max(0, n - 1)]; ctx.save(); ctx.globalAlpha = K.env(t, SH[0] - 0.05, toOld(125.8), 0.1, 0.4); S.counter(ctx, n, 850, 1040, K.clamp(0.4 + K.beat(t, h, 0.25, 'lin')), { size: 100, seed: 80 + n }); ctx.restore(); }
  // CRASH
  if (t >= 142.4 && t < 145.4) { const [cx, cy] = toPanel(668, 1010, cam); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 144.7) / 0.7); S.emphasis(ctx, cx, cy, 190, K.beat(t, 142.4, 0.45, 'lin'), { word: 'CRASH!', wx: 0.7, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= toOld(164.4)) { S.title(ctx, 'THE END', 500, 560, K.beat(t, toOld(164.4), 0.8, 'lin'), { size: 80, align: 'center' }); }
}
window.SCENE = SCENE; window.__SH = SH;
