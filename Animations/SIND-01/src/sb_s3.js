// ===== SIND-01 shots S9-S13 (69.88 - 109.08 s): the leap and the swim, the plank, alone, the night, the real shore, the grooms =====

// ---------- S9 (69.88 - 80.48): the leap, SPLASH!, the swim, the missed oar, under, the plank ----------
const SB_S9SEA = { hz: 600, y: [615, 700, 820, 905], amp: 22, pal: 'day', long: 1.6, swells: [{ x0: 1500, v: -260, t0: 74.6, t1: 76.6, h: 120, w: 160 }] };
const SB_S9CAM = [[69.88, { x: 520, y: 700, zoom: 1.1 }], [71.9, { x: 560, y: 700, zoom: 1.1 }], [72.6, { x: 720, y: 700, zoom: 1.2 }], [75.5, { x: 880, y: 700, zoom: 1.2 }], [76.3, { x: 860, y: 700, zoom: 1.2 }], [77.0, { x: 700, y: 700, zoom: 1.2 }], [80.48, { x: 740, y: 700, zoom: 1.2 }]];
const SB_SW9X = (t) => kfn(t, [[72.3, 680], [74.0, 900], [75.5, 940], [77.2, 940], [78.0, 930], [80.48, 860]], 'inOut');
const SB_SK9X = (t) => kfn(t, [[69.88, 1080], [74.02, 1270], [75.5, 1650]], 'in');
const SB_PL9X = (t) => kfn(t, [[76.2, 280], [78.55, 690], [79.4, 760], [80.48, 790]], 'out');
// crawl phase with a slowing stroke (periods 0.8, 1.0, 1.3 s at the end)
function sbCrawl(t) { if (t < 79.42) return (t - 72.3) * Math.PI * 2 / 0.8; const b = (79.42 - 72.3) * Math.PI * 2 / 0.8; return b + (t < 80.22 ? (t - 79.42) / 0.8 : 1 + (t - 80.22) / 1.15) * Math.PI * 2 * 0.85; }
function sbS9World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_S9SEA;
  sbSky(ctx, 'day', cam); sbSun(ctx, 1500, 190, 48, '#fff6c8', '#ffe0a0', 0.6); sbSeaBack(ctx, t, sea, 0, 2000);
  // the last hump of grass, vanishing
  const hump = 1 - K.clamp((t - 69.9) / 1.4); if (hump > 0) { const hy = seaY(400, t, 2, sea) + 10 - 30 * hump; celShade(ctx, ell(400, hy, 110 * hump + 20, 30 * hump + 6, 24).filter((q) => q[1] <= hy + 1), '#4fb86a', '#2f8a50', { light: [-0.3, -1], off: 8, lw: 3 }); }
  // the skiff, dragged away by the whale's swirl, tips over a swell and is gone
  const skx = SB_SK9X(t); if (t < 76.0) { const f = sbFloat(skx, t, sea, 2, 90); sbSkiff(ctx, { x: skx, y: f.y, s: 0.9, pitch: f.rot, oar: tc * 7, row: 0.6, oars: true, crew: (c) => sbOnDeck(c, 0.9, (q) => {
    for (let k = 0; k < 3; k++) { const P = sbAlive(t, 150 + k, { x: -20 + k * 34, y: -12, s: 0.6, dir: -1, gaze: [-1, 0.2], mouth: 'o' }); if (k === 0 && t > 73.46) { P.tip = -0.3; P.handR = PERSON_HANDS.reach.R; } sbSailor(q, k, P); } }) });
    if (t > 73.46) { const f2 = sbFloat(skx, t, sea, 2, 90), a = -0.15 - 0.1 * K.clamp((t - 73.46) / 0.4); ctx.save(); ctx.translate(skx - 70, f2.y - 50); ctx.rotate(Math.PI + a); seg(ctx, 0, 0, 150, 0, 7, '#c89a5a', 2); celShade(ctx, [[130, -14], [195, -18], [195, 18], [130, 14]], '#c89a5a', '#8a6030', { light: [0, -1], off: 4, lw: 2.5 }); ctx.restore(); } }
  // the plank rides in from the left on the same wave line
  if (t > 76.2) { const px = SB_PL9X(t), f = sbFloat(px, t, sea, 2, 110); sbPlank(ctx, px, f.y - 8, { rot: f.rot + 0.2 * Math.sin(t * 0.7), t, wet: t > 77.7 }); }
  // Sinbad: crouch, leap (hanging feet, the shadow racing on the water), splash, swim, reach, under, up coughing
  if (t < 71.72) { const [x, lift] = hop(t, 70.65, 1.07, 400, 660, 160), base = seaY(400, t, 2, sea) - 10 - 30 * hump, y = t < 70.65 ? base : K.lerp(base, seaY(660, t, 2, sea), K.clamp((t - 70.65) / 1.07)) - lift;
    if (t > 70.65) groundShadow(ctx, x, seaY(x, t, 2, sea) + 6, 90, lift, { flat: true, color: '#1a3a7a' });
    const P = sbAlive(t, 11, { x, y, dir: 1, bare: true, wind: -0.8, gaze: [1, 0.2], mouth: 'closed' });
    P.sq *= t < 70.65 ? 1 - 0.18 * K.clamp((t - 69.9) / 0.4) : 1 + 0.12 * pulse(t, 70.65, 0.5); P.tip += t > 70.65 ? 0.3 : 0.1;
    if (t > 70.65) { P.aL = [2.4, 2.6]; P.aR = [2.3, 2.5]; P.legs = 0.9; } else P.handL = P.handR = undefined;
    sbSinbad(ctx, P); }
  else if (t > 71.9) { const x = SB_SW9X(t), wy = seaY(x, t, 2, sea), under = t > 75.56 && t < 76.3, ph = sbCrawl(t), cough = t > 76.3 && t < 76.9;
    const o = { crawl: ph, k: t > 77.2 && t < 79.42 ? 0.5 : 1, depth: under ? 230 : t < 72.32 ? 200 - 70 * K.clamp((t - 71.9) / 0.4) : 130, dir: t > 77.15 ? -1 : 1, mouth: cough ? 'open' : 'closed', lid: cough ? 1 : 0, wind: -0.6, tip: t > 79.42 ? 0.3 : 0.18, drop: t > 79.42 ? 6 : 0 };
    if (t > 74.02 && t < 74.85) { o.handRW = [x + 95 + 10 * Math.sin(tc * 8), wy - 60]; o.aL = [0.6, 0.8]; o.gaze = [1, -0.3]; }
    if (t > 76.9 && t < 77.65) { o.gaze = gazePlan(tc, [[0, [1, 0]], [77.14, [-1, 0.1]], [77.3, [-0.4, 0.3]], [77.42, [-1, 0.2]]], 0.07); o.brow = -0.7; o.k = 0.3; }
    if (t > 72.32 && t < 72.7) o.tilt = 0.2 * Math.sin((t - 72.32) * 30);
    sbSwimmer(ctx, x, wy, t, o);
    if (under) sbBubbles(ctx, x, wy, t, 75.56, 8, 120, 41, 10);
    if (!under && t > 72.32 && Math.sin(ph) > 0.85) sbSplash(ctx, x + 60, wy, ((ph % (2 * Math.PI)) / (2 * Math.PI)) * 0.8, 0.25); }
  if (t > 71.72) sbSplash(ctx, 670, seaY(670, t, 2, sea), t - 71.72, 1.2);
  for (const k of [0, 0.25]) sbRing(ctx, 670, seaY(670, t, 2, sea) + 4, (t - 71.9 - k) / 1.2, 180);
  sbSeaFront(ctx, t, sea, 0, 2000);
}
function sbS9Over(ctx, t, cam, S) {
  if (t > 71.72 && t < 72.6) { const [x, y] = sbP(670, 560, cam); ctx.save(); ctx.globalAlpha = K.clamp((72.6 - t) / 0.25); S.title(ctx, 'SPLASH!', x, y, K.clamp((t - 71.72) / 0.25), { size: 86 }); ctx.restore(); }
  if (t > 74.1 && t < 74.95) { const x = SB_SW9X(t), wy = seaY(x, t, 2, SB_S9SEA), a = sbP(x + 110, wy - 80, cam), b = sbP(SB_SK9X(t) - 265 - 80 * K.clamp((t - 74.4) / 0.4), wy - 80, cam); S.arrow(ctx, [a[0], a[1] - 60], [b[0], b[1] - 60], K.clamp((t - 74.1) / 0.3), { bend: 0.3 }); }
}
SB_SHOTS.push({ a: 69.88, b: 80.48, ww: 2000, cam: (t) => K.camAt(SB_S9CAM, t), world: sbS9World, over: sbS9Over });

// ---------- S10 (80.48 - 89.17): he clings to the plank; the grip; the ship far off hidden by two swells; alone ----------
const SB_S10SEA = { hz: 600, y: [615, 700, 840, 925], amp: 18, pal: 'gold', long: 1.6, swells: [{ x0: 1700, v: -380, t0: 86.24, t1: 87.4, h: 150, w: 200 }, { x0: 1900, v: -380, t0: 86.9, t1: 88.2, h: 190, w: 220 }] };
const SB_S10CAM = [[80.48, { x: 420, y: 760, zoom: 1.3 }], [82.0, { x: 420, y: 760, zoom: 1.3 }], [82.4, { x: 400, y: 770, zoom: 2.3 }], [83.1, { x: 400, y: 770, zoom: 2.3 }], [83.9, { x: 640, y: 615, zoom: 1.0 }], [89.17, { x: 650, y: 615, zoom: 1.0 }]];
const SB_PX10 = 400;
function sbS10Plank(t, sea) { const f = sbFloat(SB_PX10, t, sea, 2, 110), dip = 20 * Math.exp(-(t - 80.9) * 5) * Math.cos((t - 80.9) * 12) * (t > 80.9 ? 1 : 0); return { x: SB_PX10, y: f.y - 6 + dip, rot: f.rot }; }
function sbS10World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_S10SEA;
  sbSky(ctx, 'gold', cam); sbSun(ctx, 260, 430, 56, '#fff1c0', '#ffb070', 1); sbSeaBack(ctx, t, sea, -200, 1600); sbLightPath(ctx, t, 260, 602, 830, 70, '#ffe0a0', 0.6);
  // the dhow far off, in three held steps smaller, then hidden by the swells and gone
  if (t > 83.6 && t < 87.58) { const s = t < 85.44 ? 0.18 : t < 85.9 ? 0.13 : 0.1, x = 1100 + (t - 83.6) * 8; sbDhow(ctx, { x, y: seaY(x, t, 0, sea) + 2, s, t, far: true, sail: 1 });
    if (t < 85.4) for (let k = 0; k < 2; k++) { ctx.fillStyle = k ? '#d85a7a' : '#2aa39a'; ctx.fillRect(x - 20 + k * 8, seaY(x, t, 0, sea) - 18 - ((t * 10 + k * 3) % 8), 4, 5); } }
  // the plank and Sinbad: lunges, throws both arms over it, drags his chest on, cheek on the wood
  const pl = sbS10Plank(t, sea), wy = seaY(SB_PX10 - 30, t, 2, sea);
  const grab = K.clamp((t - 80.48) / 0.45), up = K.clamp((t - 81.72) / 0.3), wave = t > 85.44 ? sbF(t, [[85.44, 0], [85.6, 1], [86.8, 0.75], [87.58, 0.5], [88.26, 0]]) : 0, wv = osc(tc, t < 86.24 ? 0.5 : 0.8);
  const o = { depth: 150 - 40 * up, dir: 1, tip: 0.2 + 0.35 * up, mouth: t > 85.5 && t < 86.6 ? 'open' : 'closed', lid: t < 83.62 ? 0.6 : 0, wind: -0.5, wet: true, sq: breathe(tc, 11, t < 83.6 ? 0.04 : 0.015) };
  o.handLW = [pl.x - 40 + 60 * (1 - grab), pl.y + 4]; o.handRW = [pl.x + 30 + 40 * (1 - grab), pl.y + 2];
  if (wave > 0.02) { delete o.handRW; o.aR = [K.lerp(0.6, 2.7, wave), K.lerp(0.6, 2.9 + 0.3 * wv * wave, wave)]; o.gaze = [1, -0.3]; o.tip = 0.2; }
  else if (t > 88.26) { o.drop = 10; o.tilt = 0.25; o.lid = 0.6; }
  if (t > 83.62 && t < 85.44) { o.gaze = [1, -0.4]; o.lid = sbLid(t, 11, [83.7]); }
  if (t > 82.06 && t < 83.0) { o.brow = 0.7; o.mouth = 'closed'; o.gaze = [0.2, 0.2]; }
  sbSwimmer(ctx, pl.x - 40, wy + 10, t, o);
  sbPlank(ctx, pl.x, pl.y, { rot: pl.rot, t, wet: true });
  if (t > 82.06 && t < 83.2) { // knuckles as hard highlights on the grip
    for (const hx of [pl.x - 40, pl.x + 30]) for (let k = 0; k < 3; k++) sbBlob(ctx, hx - 8 + k * 8, pl.y - 4, 3, 2, '#fff2e0', '#e0b090', { lw: 0, off: 1 }); }
  // a wave washes over plank and man (82.78) and drops fall from his chin
  if (t > 82.78 && t < 83.6) { const u = (t - 82.78) / 0.8; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u) * 0.95; celShade(ctx, [[pl.x - 400 + u * 700, 1000], [pl.x - 300 + u * 700, pl.y - 120 * Math.sin(Math.PI * u)], [pl.x - 120 + u * 700, pl.y - 140 * Math.sin(Math.PI * u)], [pl.x + 60 + u * 700, 1000]], '#3a8ad0', '#2468b8', { light: [0, -1], off: 10, lw: 3, line: '#1f5fc0' }); ctx.restore(); }
  if (t > 83.3 && t < 84.2) drops(ctx, pl.x - 40, pl.y - 70, t, 2, '#bfe8ff');
  sbSeaFront(ctx, t, sea, -200, 1600);
  if (t > 88.3) sbBands(ctx, [-200, 620, 1800, 600], t, { cols: ['#ffd890'], alpha: 0.22, n: 1, w: 200, speed: 500, phase: -88.3 * 500, angle: 0 });
}
SB_SHOTS.push({ a: 80.48, b: 89.17, ww: 1600, cam: (t) => K.camAt(SB_S10CAM, t), world: sbS10World });

// ---------- S11 (89.17 - 95.66): the warm moonlit night, the gust, the wind drops, the turtle, dawn, the gull ----------
function sbS11Sea(t) { const calm = K.clamp((t - 92.74) / 1.2), dawn = K.clamp((t - 93.98) / 1.6); return { hz: 600, y: [615, 700, 840, 925], amp: K.lerp(30, 6, calm), pal: 'night', pal2: 'day', mix: dawn, long: 1.6 }; }
const SB_S11CAM = [[89.17, { x: 600, y: 615, zoom: 1.05 }], [95.66, { x: 660, y: 615, zoom: 1.05 }]];
function sbS11World(ctx, t, cam) {
  const tc = SB_T2(t), sea = sbS11Sea(t), dawn = sea.mix, calm = K.clamp((t - 92.74) / 1.2);
  sbSky(ctx, dawn < 0.5 ? [['night', 1], ['dawn', dawn * 2]] : [['dawn', 1], ['day', (dawn - 0.5) * 2]], cam);
  if (dawn < 1) { ctx.save(); ctx.globalAlpha = 1 - dawn; sbMoon(ctx, 820, 270, 70, 1); ctx.restore(); }
  // clouds slide off the moon
  if (t < 93) { const u = K.clamp((t - 91.82) / 0.9); ctx.save(); ctx.globalAlpha = 0.9 * (1 - dawn); sbBlob(ctx, 820 - 30 - 260 * u, 290, 150, 40, '#a89ad0', '#7a6aaa', { lw: 0, off: 10 }); sbBlob(ctx, 860 + 240 * u, 250, 120, 32, '#b8aad8', '#8a7ab8', { lw: 0, off: 8 }); ctx.restore(); }
  if (dawn > 0) sbSun(ctx, 860, 600 - 90 * K.ease.out(dawn), 50 * dawn, '#fff1b0', '#ffb070', dawn);
  sbSeaBack(ctx, t, sea, -200, 1800);
  if (dawn < 1) sbLightPath(ctx, t, 820, 602, 840, 80, '#fff2c8', 0.75 * (1 - dawn), calm);
  // whitecaps and wind streaks in the windy first half
  const wind = 1 - K.clamp((t - 91.82) / 0.9); if (wind > 0) { sbSpeed(ctx, [-200, 300, 2000, 600], t, { dir: -1, n: Math.round(12 * wind), alpha: 0.4 * wind, speed: 1600, col: '#eef6ff' }); sbGlints(ctx, [0, 650, 1400, 200], t, Math.round(8 * wind), 9, 12); }
  // the plank with Sinbad lying along it (asleep, one arm trailing); the jolt at the crest; a turtle cameo
  const px = 520, f = sbFloat(px, t, sea, 2, 120), rot = f.rot * (1 + 0.6 * wind), slide = t > 91.2 && t < 91.8 ? 20 * Math.sin(Math.PI * (t - 91.2) / 0.6) : 0;
  const tu = t - 93.42; if (tu > 0 && tu < 1.3) { const ty = seaY(700, t, 2, sea) + 30 - 40 * Math.sin(Math.PI * tu / 1.3); turtle(ctx, { x: 700, y: ty, s: 0.4, dir: -1, ph: t * 4, ext: 1, gaze: [-1, -0.3], lid: sbBlinkAt(t, 93.9) }); }
  ctx.save(); ctx.translate(px, f.y - 8); ctx.rotate(rot);
  const jolt = t > 91.2 && t < 91.8, P = { x: 10 + slide, y: -6, dir: -1, lie: 1, t, lid: jolt ? 0 : t < 91.8 ? 0.8 : K.clamp(0.8 + (t - 91.8) * 0.3), mouth: 'closed', wind: wind > 0 ? 0.8 : 0.2, bare: true, sq: breathe(tc, 11, 0.025) * (t > 93.42 && t < 94 ? 1 + 0.03 * Math.sin((t - 93.42) * 5) : 1) };
  if (jolt) { P.eyes = 'wide'; P.handLW = [px - 60, f.y - 6]; P.handRW = [px + 40, f.y - 8]; } else { P.aR = [1.4, 1.2]; P.aL = [0.3, 0.2]; }
  sbSinbad(ctx, P); sbPlank(ctx, 0, 0, { t, wet: true }); ctx.restore();
  if (!jolt) sbRing(ctx, px - 80, seaY(px - 80, t, 2, sea) + 4, ((t * 0.8) % 1), 40, { lw: 2, a: 0.6 });
  // morning: a gull lands on the end of the plank and pecks at it
  if (t > 94.98) { const u = K.clamp((t - 94.98) / 0.35), gx = K.lerp(900, px + 100, K.ease.out(u)), gy = K.lerp(380, f.y - 14, K.ease.out(u)); sbGull(ctx, gx, gy, t, { dir: -1, s: 0.36, fly: u < 1, flap: u < 1 ? undefined : 0, sq: landSquash(t, 95.33, 0.2), beak: t > 95.4 ? 0.4 + 0.4 * Math.sin(t * 20) : 0, seed: 12 }); }
  sbSeaFront(ctx, t, sea, -200, 1800);
}
SB_SHOTS.push({ a: 89.17, b: 95.66, ww: 1600, cam: (t) => K.camAt(SB_S11CAM, t), world: sbS11World });

// ---------- S12 + S13 (95.66 - 109.08): the real shore, knock knock, asleep; the grooms and the king's horses ----------
const SB_SHSEA = { hz: 600, y: [615, 700, 935, 1010], amp: 10, pal: 'day', long: 1.4, swells: [{ x0: 200, v: 300, t0: 96.62, t1: 97.7, h: 50, w: 160 }] };
const SB_S12CAM = [[95.66, { x: 560, y: 700, zoom: 1.1 }], [97.7, { x: 980, y: 660, zoom: 1.15 }], [100.5, { x: 980, y: 660, zoom: 1.15 }], [101.2, { x: 1300, y: 560, zoom: 1.05 }],
  [102.0, { x: 1160, y: 620, zoom: 1.05 }], [102.7, { x: 1040, y: 680, zoom: 1.3 }], [104.2, { x: 1040, y: 680, zoom: 1.3 }], [104.8, { x: 1240, y: 680, zoom: 1.3 }], [105.5, { x: 1060, y: 680, zoom: 1.3 }], [109.08, { x: 1070, y: 680, zoom: 1.3 }]];
const SB_PL12X = (t) => kfn(t, [[95.66, 340], [96.62, 620], [97.68, 930]], 'inOut');
const SB_SIN12 = 960;
// grooms and horses come along the beach from the right (101.2), groom A runs to Sinbad (102.74) and kneels
const SB_GAX = (t) => kfn(t, [[100.6, 1560], [102.08, 1180], [102.74, 1180], [103.2, 1060]], 'out');
const SB_GBX = (t) => kfn(t, [[100.6, 1760], [102.2, 1440]], 'out');
const SB_HX = [(t) => kfn(t, [[100.6, 1640], [102.08, 1240]], 'out'), (t) => kfn(t, [[100.6, 1900], [102.3, 1520]], 'out'), (t) => kfn(t, [[100.6, 2040], [102.4, 1680]], 'out')];
function sbS12World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_SHSEA, GY = SB_SHORE.sand;
  sbSky(ctx, 'day', cam); sbSun(ctx, 300, 200, 50, '#fff6c8', '#ffe0a0', 0.7); sbSeaBack(ctx, t, sea, -200, 1300);
  // the plank (before it lands it rides the waves; then lies on the sand)
  const px = SB_PL12X(t), landed = t > 97.68, f = sbFloat(px, t, sea, 2, 110), py = landed ? GY - 4 : f.y - 8, prot = landed ? 0.02 : f.rot - (t > 96.62 && t < 97.6 ? 0.12 : 0);
  // the shore plate goes on top of the near water: the sea is drawn first, the beach slopes into it
  if (!landed) { ctx.save(); ctx.translate(px, py); ctx.rotate(prot); const P = { x: 0, y: -6, dir: -1, lie: 1, t, lid: 1, bare: true, wind: -0.3, aR: [1.4, 1.2], aL: [0.3, 0.2] }; if (t > 96.62) { P.handLW = [px - 40, py]; P.handRW = [px + 40, py]; delete P.aR; delete P.aL; } sbSinbad(ctx, P); sbPlank(ctx, 0, 0, { t, wet: true }); ctx.restore(); }
  sbSeaFront(ctx, t, sea, -200, 1000);
  ctx.drawImage(sbShorePlate(), 0, 0);
  // the foam line advancing and retreating on threes over the wet sand
  const fx = 780 + 130 * Math.max(0, Math.sin((SB_T3(t) - 95.66) * 1.3)) + (t > 97.68 && t < 98.3 ? 60 * Math.sin(Math.PI * (t - 97.68) / 0.62) : 0); sbFoamLine(ctx, [[700, 962], [fx - 60, 930], [fx, 914], [fx + 30, 910]], t, { w: 12 });
  sbShorePalms(ctx, t);
  // three horses grazing on the meadow (until the grooms lead them down), and the grooms
  for (let i = 0; i < 3; i++) { const xf = SB_HX[i], x = t < 100.6 ? xf(100.6) : xf(t), walking = t > 100.6 && t < 102.5, H = { x, y: GY + 2, s: 0.78, dir: -1, pal: i, ...(walking ? walk(xf, tc, { stride: GAIT.horse * 0.78 }) : {}), headDown: walking ? 0 : t < 100.6 ? 0.9 + 0.1 * osc(tc + i, 1.7) : 0.1, chew: t < 100.6 ? 0.5 + 0.5 * osc(tc, 0.5 + i * 0.1) : 0, tailSwish: osc(tc + i * 0.4, 1.4 + i * 0.3), earL: 0.6 + idleSway(tc, 170 + i, 0.2, 1.7), earR: 0.4 + idleSway(tc, 173 + i, 0.25, 2.1), neck: idleSway(tc, 176 + i, 0.1, 3) };
    if (i === 0 && t > 102.08) { H.earL = 1; H.earR = 1; H.headDown = sbF(t, [[102.18, 0], [102.5, 0.8], [102.74, 0.6], [103.3, 0.2]]); H.snort = pulse(tc, 102.5, 0.3); }
    if (i === 0 && t > 104.24 && t < 104.95) { H.neck = 0.6 * pulse(tc, 104.3, 0.5); H.shake = pulse(tc, 104.3, 0.5); }
    if (i === 0 && t > 107.1) { const lean = sbF(t, [[107.1, 0], [107.5, 0.9], [108.0, 0.9], [108.3, 0.3]]); H.headDown = 0.55 * lean; H.x = x - 30 * lean; H.chew = t > 107.9 ? 0.5 + 0.5 * osc(tc, 0.3) : 0; H.mouth = t > 108.3 ? 'smile' : 'closed'; H.gaze = [-1, 0.3]; }
    if (i === 1 && t > 103.38 && t < 104.2) H.tailSwish = osc(tc, 0.4);
    sbHorse(ctx, H); }
  if (t > 100.6) { const xa = SB_GAX(t), A = sbAlive(t, 160, { x: xa, y: GY, dir: -1, ...walk(SB_GAX, tc, { stride: 24 }), gaze: [-1, 0.3] });
    if (t < 102.08) { A.handR = [40, -100 + 10 * osc(tc, 0.5)]; } // swings the waterskin
    if (t > 102.74 && t < 103.0) { A.sq *= 0.92; A.brow = -0.8; A.eyes = 'wide'; }
    if (t > 103.2) { A.amp = 0; A.kneel = K.clamp((t - 103.2) / 0.2); A.handRW = [SB_SIN12 + 20, GY - 30]; A.gaze = [-1, 0.6]; A.mouth = 'o'; }
    if (t > 104.98 && t < 105.54) { A.handR = [-30, -200]; A.tilt = -0.2; A.gaze = [1, -0.4]; A.mouth = 'smile'; }
    if (t > 105.54) { A.kneel = 1; A.handRW = [SB_SIN12 - 30, GY - 90]; A.handLW = [SB_SIN12 + 10, GY - 70]; A.mouth = 'smile'; }
    if (t > 106.64 && t < 107.1) { A.handLW = [SB_SIN12 + 30, GY - 150]; }
    if (t > 107.1 && t < 108.3) { A.handLW = [SB_SIN12 + 60, GY - 100]; }
    if (t > 108.3) { A.tilt = -0.25; A.mouth = 'open'; A.sq *= 1 + 0.03 * Math.abs(osc(tc, 0.3)); A.gaze = [0, -0.5]; }
    sbGroom(ctx, 0, A);
    if (t < 106.64) { const h = sbHandW(A, 1); sbWaterskin(ctx, h[0], h[1] + 16, 0.3, 0, 0.7); }
    if (t > 107.1) sbFoodTray(ctx, SB_SIN12 + 70, GY - 96, t < 107.6 ? 5 : t < 108.0 ? 4 : 3, 0.9);
    const xb = SB_GBX(t), B = sbAlive(t, 161, { x: xb, y: GY, dir: -1, ...walk(SB_GBX, tc, { stride: 24 }), gaze: [-1, 0], mouth: 'o' });
    if (t > 102.74 && t < 103.38) { B.handR = PERSON_HANDS.armsOut.R; B.gaze = [1, 0]; }
    if (t > 103.38) { B.handRW = [1500 + 40 * sbF(t, [[103.38, 0], [103.8, 1], [104.2, 0]]), GY - 190]; B.dir = 1; B.gaze = [1, -0.2]; B.mouth = 'smile'; }
    if (t > 108.3) { B.tilt = 0.15; B.mouth = 'open'; }
    sbGroom(ctx, 1, B); }
  // Sinbad: on the plank, surfed in, set down; lifts his head, pats, knocks, listens; smiles, collapses asleep; lifted, drinks, eats
  if (landed) { sbPlank(ctx, px - 30, py, { rot: prot, t, wet: true });
    const P = sbAlive(t, 11, { x: SB_SIN12, y: GY, dir: -1, bare: true, wind: 0.2, mouth: 'closed' });
    if (t < 98.34) { P.lie = 1; P.lid = 1; }
    else if (t < 99.2) { P.kneel = 0.8; P.tip = 0.5; P.gaze = [0.2, 0.9]; P.brow = 0.4; P.lid = 0.45; const k = Math.floor((t - 98.5) / 0.14);
      P.handRW = t < 98.5 ? [SB_SIN12 - 40, GY - 6] : t < 98.8 ? [SB_SIN12 - 50, GY - 8 - (k % 2 ? 18 : 0)] : PERSON_HANDS.cupEar.R && null; if (!P.handRW) P.handR = PERSON_HANDS.cupEar.R; if (t > 98.8) { P.tilt = 0.4; P.drop = 10; } }
    else if (t < 99.6) { P.kneel = 0.8 * (1 - K.clamp((t - 99.4) / 0.2)); P.mouth = 'smile'; P.lid = 0.2; P.tip = 0.2; P.aL = [1.5, 1.8]; P.aR = [1.5, 1.8]; }
    else if (t < 105.54) { P.lie = 1; P.lid = 1; P.mouth = 'smile'; P.y += rebound(tc, 99.6, 6); P.sq = 1 + 0.03 * Math.sin(t * 2.2); }
    else { const up = K.clamp((t - 105.54) / 0.5); P.lie = 1 - up; P.sit = up; P.seat = 'floor'; P.lid = t < 106.64 ? 0.8 - 0.4 * up : 0; P.drop = 10 * (1 - up) + lagged((u) => K.clamp((u - 105.54) / 0.5), tc, 0.17, 10);
      if (t > 106.64 && t < 107.1) { P.tilt = -0.25; P.drop = 4 * Math.abs(osc(tc, 0.15)); P.lid = 0.5 - (t - 106.64); }
      if (t > 107.1) { P.handRW = t < 107.6 ? [SB_SIN12 - 20, GY - 120] : undefined; P.mouth = t < 107.9 ? 'closed' : 'smile'; P.sq = 1 + 0.03 * Math.abs(osc(tc, 0.25)); if (t > 107.6) { P.handR = PERSON_HANDS.chest.R; P.gaze = [1, -0.3]; } }
      if (t > 108.3) { P.handRW = [SB_SIN12 + 60, GY - 110]; P.gaze = [1, -0.2]; P.mouth = 'smile'; } }
    sbSinbad(ctx, P);
    if (t > 106.64 && t < 107.1) { const h = sbPt(P, [8, 26]); sbWaterskin(ctx, h[0] + 20, h[1] - 6, -2.4, 0.3 * Math.abs(osc(tc, 0.15)), 0.7); drops(ctx, h[0] - 4, h[1] + 4, t, 1, '#9cd0ff'); }
    if (t > 99.6 && t < 102.3) { zzz(ctx, SB_SIN12 - 60, GY - 70, t - 99.6, 0); }
    // a gull stands on his back, flies off when the horse sniffs
    if (t > 100.0 && t < 102.6) { const off = K.clamp((t - 102.08) / 0.5); sbGull(ctx, SB_SIN12 + 10 + 200 * off, GY - 40 - 260 * off, t, { dir: -1, s: 0.34, fly: off > 0, flap: off > 0 ? undefined : 0, seed: 13 }); } }
}
function sbS12Over(ctx, t, cam, S) {
  if (t > 98.4 && t < 99.4) { const [x, y] = sbP(SB_SIN12 - 50, SB_SHORE.sand, cam); sbTag(ctx, S, 'REAL LAND', x - 80, y - 300, t, 98.4, 99.2, { size: 46 }); S.arrow(ctx, [x - 80, y - 250], [x - 10, y - 10], K.clamp((t - 98.5) / 0.3)); }
  if (t > 104.24 && t < 105.2) { const [x, y] = sbP(1450, 640, cam); sbTag(ctx, S, "THE KING'S HORSES", Math.min(x, 640), y - 30, t, 104.3, 105.0, { size: 44 }); }
  if (t > 104.98 && t < 105.6) { const [x, y] = sbP(1750, 340, cam); sbGlint(ctx, x, y, 40, (t - 105.0) / 0.5); }
}
SB_SHOTS.push({ a: 95.66, b: 109.08, ww: 2000, cam: (t) => K.camAt(SB_S12CAM, t), world: sbS12World, over: sbS12Over });
