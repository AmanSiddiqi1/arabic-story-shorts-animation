// ===== SIND-01 shots S5-S8 (31.72 - 69.88 s): the camp on the island, the eye, RUMBLE!, the water climbs, the captain's shout,
// the reveal (THAT IS NO ISLAND), the run to the boats, the island sinks =====
// whaleIsland world 1600 x 1230: the whale's crown at (800, 880 - rise), s 1, head to the right; water (ship layer) at y 960.
const SB_ISEA = { hz: 600, y: [615, 700, 960, 1050], amp: 5, pal: 'day' };
const SB_RISE = [[41.3, 0], [41.6, -6], [41.68, 14], [42.3, 2], [43.18, 0]];
// rev 1: the island sinks in three visible steps (12, 28, 45) on "المياه" 45.70, 47.0 and "الجزيرة" 48.28, each with a foam surge
const SB_SINK = [[45.7, 0], [46.05, -12], [47.0, -12], [47.35, -28], [48.28, -28], [48.63, -45], [66.08, -45], [66.9, -150], [67.5, -260], [68.3, -380], [68.9, -470]];
const SB_SURGE = [45.7, 47.0, 48.28];
function sbRise(t) { let r = t < 43.18 ? (t > 41.3 ? flow(t, SB_RISE) : 0) : 8 * osc(t - 43.18, 2.6) * K.clamp((t - 43.18) / 0.6) * (t < 60.8 ? 1 : 0.3);
  if (t > 50.34 && t < 51.3) r += flow(t, [[50.34, 0], [50.56, 10], [50.9, -14], [51.3, 0]]);   // "مخيف": the ground breathes once
  return r + (t > 45.7 ? kfn(t, SB_SINK, 'inOut') : 0); }
function sbTiltI(t) { return (t > 41.6 && t < 43 ? 0.035 * Math.exp(-(t - 41.6) * 3) * Math.cos((t - 41.6) * 9) : 0) + (t > 66.08 ? 0.07 * K.ease.inOut(K.clamp((t - 66.08) / 0.5)) : 0); }
const sbWY = (t) => 880 - sbRise(t);
// the grass top at world x (where feet stand)
function sbGround(x, t) { const lx = x - 800; return sbWY(t) + sbWhaleTop(lx) + lx * Math.tan(sbTiltI(t)) - 14; }
const sbSkiffY = (x, t, sea) => Math.min(sbGround(x, t) + 22, seaY(x, t, 2, sea));
// the island as a place: sky, far sea, the whale with its island, (actors), then the near water over everything below y 960
function sbIsland(ctx, t, cam, o = {}) {
  sbSky(ctx, o.sky || 'day', cam); sbSun(ctx, 1320, 170, 50, '#fff6c8', '#ffe0a0', 0.7); sbSeaBack(ctx, t, SB_ISEA, 0, 1600);
  if (o.far !== false) { const f = sbFloat(260, t, { ...SB_ISEA, y: [615, 632, 640, 700] }, 2, 40); sbDhow(ctx, { x: 260, y: f.y, s: 0.14, t, far: true, sail: 0.2 }); }
  const W = { s: 1, dress: 1, t, lid: 1, tilt: sbTiltI(t), sway: o.sway ?? 1, spout: o.spout, breathe: t > 43.18 ? 0.5 + 0.5 * osc(t - 43.18, 2.6) : 0 };
  sbWhale(ctx, 800, sbWY(t), W);
  // shore foam where the back meets the water (it moves inward as the island sinks)
  const wl = 962, d = (wl - sbWY(t)) / 80; if (d > 0) { const hx = 650 * Math.sqrt(d); for (const sd of [-1, 1]) { const x = 800 + sd * hx; sbFoamLine(ctx, [[x - 60, wl - 2], [x - 20, wl - 6], [x + 20, wl - 6], [x + 60, wl - 2]], t + sd, { w: 12 }); } }
  // rev 1: at each sinking step a foam surge runs inward over the grass from both shores and drains back
  if (d > 0) for (const ts of SB_SURGE) { const u = (t - ts) / 0.9; if (u < 0 || u > 1) continue; const hx = 650 * Math.sqrt(d), run = 150 * Math.sin(Math.PI * Math.min(1, u * 1.2));
    for (const sd of [-1, 1]) { const xs = 800 + sd * hx, xe = xs - sd * run, pts = []; for (let k = 0; k <= 6; k++) { const x = K.lerp(xs + sd * 30, xe, k / 6); pts.push([x, Math.min(wl - 2, sbGround(x, t) + 12)]); }
      ctx.save(); ctx.globalAlpha = 1 - u * 0.5; sbFoamLine(ctx, pts, t + sd, { w: 16 }); ctx.restore(); } }
  return W;
}
// rev 1: with the camera, the near water gets its streaks and the foreground crest band (series sea rule)
function sbIslandFront(ctx, t, cam) { sbSeaFront(ctx, t, SB_ISEA, -200, 1800, { alpha: [0.86, 0.93] }); if (cam) sbSeaNear(ctx, t, SB_ISEA, cam); }
// the camp: positions (Sinbad 760, fat 960, plum 1040, rust 640), the fire at 880
const SB_FIRE = 880;
const SB_FIREON = (t) => t < 37.18 ? 0 : t < 63.86 ? K.clamp((t - 37.18) / 0.7) : 1 - K.clamp((SB_T3(t) - 63.86) / 0.75);

// ---------- S5 (31.72 - 40.2): the camp ----------
// rev 1: one second on the wide, then in to zoom 1.4 with the grass line at ~70% of the panel, panning left to right across the camp
const SB_S5CAM = [[31.72, { x: 880, y: 615, zoom: 1.0 }], [32.7, { x: 880, y: 615, zoom: 1.0 }], [33.5, { x: 700, y: 694, zoom: 1.4 }], [35.0, { x: 820, y: 694, zoom: 1.4 }], [36.6, { x: 900, y: 694, zoom: 1.38 }], [37.2, { x: 860, y: 700, zoom: 1.32 }], [40.2, { x: 860, y: 700, zoom: 1.32 }]];
const SB_WALKIN = [(t) => kfn(t, [[31.72, 1300], [32.4, 760]], 'out'), (t) => kfn(t, [[31.72, 1340], [32.9, 960]], 'out'), (t) => kfn(t, [[31.8, 1380], [33.3, 1040]], 'out'), (t) => kfn(t, [[31.9, 1260], [33.0, 640]], 'out')];
function sbCampPeople(ctx, t, o = {}) {
  const tc = SB_T2(t), still = t > 39.22 && t < 41.6, J = o.jolt || 0;
  // saccades in the stillness: pupils snap on twos, each man a few drawings after the last
  const sac = (i) => { const k = Math.floor((tc - 39.3 - i * 0.17) / 0.33); return k < 0 ? [0, 0.3] : [[-0.9, 0.2], [0.9, 0.1], [-0.6, 0.6], [0.7, -0.2], [0, 0.8]][k % 5]; };
  const G = (x) => sbGround(x, t);
  // rust merchant (640): sits, shakes sand from a shoe; strikes the flint (35.86-37.1)
  { const x = SB_WALKIN[3](t), P = sbAlive(t, 23, { x, y: G(x), dir: 1, ...walk(SB_WALKIN[3], tc), gaze: [1, 0.3] });
    if (t > 33.0) { P.sit = K.clamp((t - 33.0) / 0.3); P.seat = 'floor'; P.amp = 0; const sh = osc(tc, 0.5); if (t < 35.8) { P.handRW = [x + 40, G(x) - 90 + 14 * sh]; P.handLW = [x + 30, G(x) - 100]; P.gaze = [0.4, 0.5]; }
      else if (t < 37.2) { const k = Math.floor((t - 35.86) / 0.42), u = ((t - 35.86) % 0.42) / 0.42; P.handLW = [x + 120, G(x) - 40]; P.handRW = [x + 112 + 20 * (u < 0.6 ? -u : 1 - u), G(x) - 70 + 40 * (u < 0.6 ? -u * 0.5 : u)]; P.tip += 0.18; P.gaze = [1, 0.8]; }
      else { P.handR = PERSON_HANDS.palmsUp.R; P.handL = PERSON_HANDS.palmsUp.L; P.mouth = 'smile'; P.gaze = [1, 0.2]; } }
    if (still) { P.gaze = sac(3); P.handR = P.handL = undefined; P.mouth = 'o'; }
    sbJolt(P, J, 3); sbMerchant(ctx, 2, P); }
  // Sinbad (760): drops cross-legged, looks up through the fronds, feeds a stick, sniffs
  { const x = SB_WALKIN[0](t), P = sbAlive(t, 11, { x, y: G(x), dir: 1, ...walk(SB_WALKIN[0], tc), gaze: [1, 0], mouth: 'smile', wind: -0.2 });
    if (t > 32.3) { P.sit = K.clamp((t - 32.3) / 0.25); P.seat = 'floor'; P.amp = 0; P.y -= rebound(tc, 32.55, 6); P.handL = [-50, -60]; P.handR = [-40, -64]; P.tip -= 0.1; }
    if (t > 32.42 && t < 35.0) { P.gaze = [0.1, -1]; P.lid = Math.max(P.lid, 0.45); P.tilt = -0.1; }
    if (t > 37.96 && t < 38.6) { const k = sbF(t, [[37.96, 0], [38.2, 1], [38.35, 1], [38.5, 0.3]]); P.handRW = [x + 60 + 50 * k, G(x) - 70 + 20 * k]; P.tip += 0.15 * k; P.gaze = [1, 0.7]; if (t > 38.35) P.handR = [40, -110 + 8 * Math.sin(t * 40)]; }
    if (t > 38.6 && t < 39.22) { P.lid = 1; P.tilt = -0.14; P.mouth = 'smile'; P.sq *= 1.02; }
    if (still) { P.gaze = sac(0); P.handRW = [x + 70, G(x) - 120]; P.mouth = 'closed'; P.lid = 0; }
    sbJolt(P, J, 0); sbSinbad(ctx, P); o.sin = P; }
  // the fire and the pot (between Sinbad and the fat merchant)
  if (t > 35.86 && t < 37.2) for (let k = 0; k < 3; k++) { const ts = 36.1 + k * 0.42; if (t > ts && t < ts + 0.17) sbGlint(ctx, SB_FIRE - 30 + k * 8, G(SB_FIRE) - 30, 24, (t - ts) / 0.17, '#fff3b0'); }
  sbFire(ctx, SB_FIRE, G(SB_FIRE) + 4, t, { fire: SB_FIREON(t) * (still ? 0.8 : 1), lean: still ? -1 : 0, steam: o.steam || 0 });
  // fat merchant (960): flops on one elbow, fans himself with his turban tail; the coconut; holds out his bowl
  { const x = SB_WALKIN[1](t), P = sbAlive(t, 21, { x, y: G(x), dir: -1, ...walk(SB_WALKIN[1], tc), gaze: [-1, 0.2] });
    if (t > 33.0) { P.amp = 0; P.sit = 1; P.seat = 'floor'; P.handR = [50 + 10 * osc(tc, 0.4), -150]; P.handL = [-50, -60]; P.tip -= 0.15; P.mouth = 'smile'; P.lid = Math.max(P.lid, 0.3); }
    if (t > 35.5 && t < 36.2) { P.gaze = [0.6, 0.6]; P.eyes = 'wide'; P.tip += 0.12 * pulse(tc, 35.55, 0.4); P.mouth = 'o'; }
    if (t > 38.6 && t < 39.22) { P.handRW = [x - 60, G(x) - 90]; P.mouth = 'open'; P.gaze = [-1, 0.3]; }
    if (still) { P.gaze = sac(1); P.mouth = 'o'; }
    sbJolt(P, J, 1); sbMerchant(ctx, 0, P); if (t > 38.6 && t < 42) { const h = sbHandW(P, 1); shape(ctx, ell(h[0], h[1] - 6, 18, 8, 14), '#e8b86a', { lw: 2.5 }); } }
  // plum merchant (1040): kneels, unwraps a bundle; stirs the pot
  { const x = SB_WALKIN[2](t), P = sbAlive(t, 22, { x, y: G(x), dir: -1, ...walk(SB_WALKIN[2], tc), gaze: [-1, 0.4] });
    if (t > 33.4) { P.amp = 0; P.kneel = K.clamp((t - 33.4) / 0.3); P.handLW = [x - 50, G(x) - 50 + 6 * osc(tc, 0.7)]; P.handRW = [x - 30 + 14 * osc(tc, 0.9), G(x) - 60]; }
    if (t > 37.96 && t < 39.22) { const a = tc * 9; P.handRW = [SB_FIRE + 18 + Math.cos(a) * 14, G(SB_FIRE) - 150 + Math.sin(a) * 5]; P.tip += 0.1; }
    if (still) { P.gaze = sac(2); P.mouth = 'o'; }
    sbJolt(P, J, 2); sbMerchant(ctx, 1, P); }
  // the pot on the tripod over the fire (37.96 on)
  if (t > 37.96 && !(o.potOff)) { const sw = o.potSwing || 0; sbCookPot(ctx, SB_FIRE, G(SB_FIRE) + 2, { stir: t < 39.22 ? tc * 9 : null, swing: sw, lidRattle: t > 39.22 && t < 40.2, t });
    if (t > 38.6 && t < 39.4) steam(ctx, SB_FIRE, G(SB_FIRE) - 120, t);
    if (t > 39.22 && t < 40.2) for (let k = 0; k < 2; k++) sbRing(ctx, SB_FIRE, G(SB_FIRE) - 104, ((t - 39.22 - k * 0.3) % 0.6) / 0.6, 30, { lw: 2 }); }
}
// the jolt: squash, arms flung out (each on its own beat), turban tail late
function sbJolt(P, J, i) { if (!J) return; const u = J - i * 0.06; if (u <= 0) return; P.sq = (P.sq || 1) * (u < 0.1 ? 0.86 : 1 - 0.1 * Math.exp(-(u - 0.1) * 6)); if (u < 0.7) { P.aL = [1.6, 2.0]; P.aR = [1.6, 2.0]; delete P.handL; delete P.handR; delete P.handLW; delete P.handRW; P.eyes = 'wide'; P.mouth = 'o'; } P.tip += 0.12 * Math.exp(-u * 4) * Math.sin(u * 20); }
function sbS5World(ctx, t, cam) {
  const tc = SB_T2(t);
  sbIsland(ctx, t, cam, { sway: t > 35.0 && t < 35.8 ? 2.5 : 1 });
  // the coconut: falls by the fat merchant, bounces twice
  if (t > 35.04) { const x0 = 720, y0 = sbGround(700, t) - 190, gy = sbGround(900, t) - 8, u = t - 35.04, x = x0 + Math.min(u, 0.9) * 200;
    let y = u < 0.35 ? fallY(t, 35.04, 35.39, y0, gy) : gy - rebound(t, 35.32, 40, 0.3) - rebound(t, 35.62, 16, 0.2); groundShadow(ctx, x, gy + 8, 30, gy - y, { flat: true });
    sbBlob(ctx, x, y, 14, 13 * (t > 35.39 ? impactSquash(t, 35.39, 0.8) : 1), '#8a5a2a', '#5a3418', { lw: 2.5, off: 4 }); }
  // the skiffs beached at the shore
  for (const [x, k] of [[1380, 0], [1300, 1]]) sbSkiff(ctx, { x, y: sbSkiffY(x, t, SB_ISEA), s: 0.85, pitch: -0.08 + k * 0.05, row: 0, oar: 1 + k });
  sbCampPeople(ctx, t, {});
  // birds burst out of the palms at "suddenly"
  if (t > 39.22) for (let i = 0; i < 5; i++) { const u = t - 39.22 - i * 0.07; if (u < 0) continue; sbGull(ctx, [520, 700, 1180, 700, 520][i] + (i % 2 ? 1 : -1) * 300 * u, sbGround(700, t) - 300 - 260 * u - i * 10, t, { dir: i % 2 ? 1 : -1, s: 0.32, seed: 20 + i }); }
  // light through the fronds slides over Sinbad
  if (t > 32.42 && t < 35.0) sbBands(ctx, [600, 600, 300, 300], t, { cols: ['#fff3b0'], alpha: 0.18, w: 60, speed: 80, n: 3, angle: 0.4 });
  sbIslandFront(ctx, t, cam);
}
SB_SHOTS.push({ a: 31.72, b: 40.2, ww: 1600, cam: (t) => K.camAt(SB_S5CAM, t), world: sbS5World });
// 40.2 - 41.2: the eye opens under the water
SB_SHOTS.push({ a: 40.2, b: 41.2, panel(ctx, t) {
  const lid = t < 40.62 ? 1 - 0.85 * K.clamp((SB_T2(t) - 40.2) / 0.42) : 0.15 + 0.85 * pulse(SB_T2(t), 40.8, 0.3), pup = 1.25 - 0.5 * K.clamp((t - 40.5) / 0.3), gz = [0.15 * K.clamp((t - 40.7) / 0.4), -0.8 * K.clamp((t - 40.7) / 0.4)];
  sbWhaleEyeCU(ctx, { t, lid, pupil: pup, gaze: gz, brow: 0.3 }); } });

// ---------- S6 (41.2 - 52.21): RUMBLE!, the breathing ground, the water climbs, the spout ----------
const SB_S6CAM = [[41.2, { x: 860, y: 720, zoom: 1.25 }], [44.5, { x: 860, y: 720, zoom: 1.25 }], [45.4, { x: 800, y: 700, zoom: 1.15 }], [47.24, { x: 800, y: 700, zoom: 1.15 }], [47.7, { x: 560, y: 700, zoom: 1.18 }], [48.2, { x: 1040, y: 700, zoom: 1.18 }], [48.6, { x: 800, y: 700, zoom: 1.15 }], [50.9, { x: 800, y: 700, zoom: 1.15 }], [51.35, { x: 970, y: 700, zoom: 1.15 }], [52.21, { x: 975, y: 700, zoom: 1.16 }]];
// the knot: they back uphill into a tight group (48.28 - 49.0)
const SB_KNOT = [[760, 790], [960, 860], [1040, 900], [640, 740]];
function sbS6World(ctx, t, cam) {
  const tc = SB_T2(t), G = (x) => sbGround(x, t), J = t > 41.6 ? t - 41.6 : 0;
  sbIsland(ctx, t, cam, { spout: t > 51.2 ? K.clamp((t - 51.2) / 0.9) : 0, sway: t < 42.6 ? 2.2 : 1 });
  // skiffs: beached, then floating, swinging round and knocking together; a loose oar slides overboard
  for (const [x, k] of [[1380, 0], [1300, 1]]) { const fl = t > 46.28, sw = fl ? 0.12 * Math.sin((t - 46.28) * 3 + k * 2) : 0, xx = x + (fl ? (k ? 40 : -30) * Math.sin((t - 46.28) * 1.5) : 0);
    sbSkiff(ctx, { x: xx, y: sbSkiffY(xx, t, SB_ISEA), s: 0.85, pitch: (fl ? 0 : -0.08 + k * 0.05) + sw, row: 0, oar: 1 + k, oarOff: k === 1 && t > 46.8 }); }
  if (t > 46.7 && t < 48.5) { const u = (t - 46.7) / 1.8; ctx.save(); ctx.translate(1340 + 120 * u, seaY(1400, t, 2, SB_ISEA) - 10 + 20 * u); ctx.rotate(0.3 + u); seg(ctx, -70, 0, 70, 0, 6, '#c89a5a', 2); ctx.restore(); }
  if (t < 44.56) { // close on the camp: the jolt, the pot spills, the coconut rolls, the ground breathes under his palm
    sbCampPeopleS6(ctx, t); }
  else sbKnot(ctx, t);
  // a fish jumps where the grass was a moment ago; the water at the first palm's roots
  sbFishJump(ctx, 330, 470, 962, (t - 49.06) / 0.9, 120, 0.6); if (t > 49.9) sbRing(ctx, 470, 962, (t - 49.9) / 1.2, 90);
  if (t > 51.6) for (let i = 0; i < 6; i++) { const u = ((t - 51.6) * 0.8 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 0.6 * (1 - u); ctx.fillStyle = '#e8fbff'; ctx.fillRect(650 + i * 50 + Math.sin(i * 3) * 20, G(800) - 260 + u * 220, 4, 10); ctx.restore(); }
  sbIslandFront(ctx, t, cam);
  if (t > 50.34 && t < 51.2) sbBands(ctx, [300, 300, 1000, 700], t, { cols: ['#bfe0ff'], alpha: 0.2, n: 1, w: 160, speed: 700, phase: -50.34 * 700 });
}
function sbCampPeopleS6(ctx, t) {
  const tc = SB_T2(t), G = (x) => sbGround(x, t), J = t > 41.6 ? t - 41.6 : 0;
  // the coconut rolls downhill after the jolt
  { const u = K.clamp((t - 42.68) / 1.4), x = 920 + 260 * u * u, y = G(x) - 12; ctx.save(); ctx.translate(x, y); ctx.rotate(u * u * 12); sbBlob(ctx, 0, 0, 14, 13, '#8a5a2a', '#5a3418', { lw: 2.5, off: 4 }); ctx.restore(); }
  // the camp under the jolt; the pot swings off and spills (42.68)
  const potOff = t > 43.0, o = { jolt: J, potSwing: swing(t, 41.6, 0.5, 1.4, 1.2) + (t > 42.68 ? (t - 42.68) * 3 : 0), potOff, steam: t > 42.9 && t < 44 ? 0.4 : 0 };
  // custom: Sinbad's feet and palm (43.18 on), fat hugs the palm (43.62), plum points down trembling
  if (t < 43.18) sbCampPeople(ctx, t, o);
  else { const x = 760, P = sbAlive(t, 11, { x, y: G(x), dir: 1, gaze: [0, 1], brow: -0.6, mouth: 'closed', wind: -0.2 }), lift = sbF(t, [[43.18, 0], [43.4, 1], [43.55, 0], [43.7, -1], [43.85, 0]]);
    P.kneel = K.clamp((t - 43.9) / 0.3) * 0.7; P.tip += 0.04 * lift; if (t > 44.0) { P.handRW = [x + 60, G(x + 60) - 4]; P.gaze = [0.6, 0.9]; } P.y -= Math.abs(lift) * 4;
    sbSinbad(ctx, P);
    sbFire(ctx, SB_FIRE, G(SB_FIRE) + 4, t, { fire: 0.8, steam: 0.2 });
    const F = sbAlive(t, 21, { x: 690, y: G(690), dir: 1, sit: K.clamp((t - 43.62) / 0.2), seat: 'floor', eyes: 'wide', mouth: 'o', gaze: [1, 0.4] }); F.x += tremble(tc, 2); F.handLW = [710, G(700) - 140]; F.handRW = [712, G(700) - 110]; sbMerchant(ctx, 0, F);
    const L = sbAlive(t, 22, { x: 1000, y: G(1000), dir: -1, mouth: 'o', handR: PERSON_HANDS.pointDown.R }); L.x += tremble(tc, 2); L.gaze = look(tc, [1000, 700], [[43.62, [1000, 960]], [43.95, [760, 700]], [44.25, [1000, 960]]]); sbMerchant(ctx, 1, L);
    const R = sbAlive(t, 23, { x: 600, y: G(600), dir: 1, eyes: 'wide', gaze: [0.8, 0.6], handL: PERSON_HANDS.armsOut.L, handR: PERSON_HANDS.armsOut.R }); sbMerchant(ctx, 2, R); }
  if (t > 42.8 && t < 43.6) { const h = [940, G(940) - 30]; for (let k = 0; k < 6; k++) { const u = (t - 42.8) / 0.8; sbBlob(ctx, h[0] + k * 14 + u * 80, h[1] + u * u * 40 - k * 3, 8, 5, '#c8a058', '#8a6a30', { lw: 1.5, off: 2 }); } }   // the spilled soup
  if (t > 43.0) { ctx.save(); ctx.translate(990, G(990) - 18); ctx.rotate(1.4); celShade(ctx, [[-42, 44], [42, 44], [46, 70], [32, 100], [-32, 100], [-46, 70]].map(([a, b]) => [a, b - 70]), '#5a5a72', '#363648', { light: [-1, -1], off: 10, lw: 3 }); ctx.restore(); }
}
// the four in a knot on the crown (44.56 on), each watching a different shore; then the spout and the turn
function sbKnot(ctx, t) {
  const tc = SB_T2(t), G = (x) => sbGround(x, t), back = K.clamp((t - 48.28) / 0.72), turn = (i) => t > 51.3 + i * 0.12;
  const draw = [[3, 'rust'], [0, 'sin'], [1, 'fat'], [2, 'plum']];
  for (const [i, who] of draw) { const x = K.lerp(SB_KNOT[i][0], SB_KNOT[i][1], K.ease.inOut(back)), P = sbAlive(t, 90 + i, { x, y: G(x), dir: i === 0 || i === 3 ? -1 : 1, mouth: 'o', brow: -0.5 });
    P.x += tremble(tc + i, t > 50.34 ? 1.5 : 0.6); P.gaze = t > 48.28 && t < 51.3 ? [[-1, 0.4], [1, 0.4], [1, 0.6], [-1, 0.6]][(i + Math.floor(tc * 2)) % 4] : [P.dir, 0.5]; P.eyes = t > 50.34 ? 'wide' : 'open';
    if (back > 0 && back < 1) Object.assign(P, { ph: x / 26, amp: 0.6 });
    // rev 1: "تتصاعد" 46.28 plum points at the water, fat lifts his hem; "حول" 47.24 eyes follow the foam round the rim, a beat apart;
    // "على نحو" 49.06 feet lift alternately (never mirrored) with rings at the ankles; "مخيف" 50.34 all drop into a wide stance, staggered
    if (who === 'plum' && t > 46.28 && t < 47.3) { P.handR = PERSON_HANDS.pointDown.R; P.gaze = [P.dir, 0.9]; }
    if (who === 'fat' && t > 46.4 && t < 48.2) { P.handLW = [x - 16, G(x) - 60]; P.handRW = [x + 14, G(x) - 62]; P.gaze = [1, 0.9]; }
    if (t > 47.24 + i * 0.1 && t < 48.6) P.gaze = [t < 47.7 + i * 0.1 ? -1 : 1, 0.6];
    if (t > 49.06 && t < 50.34) { Object.assign(P, { ph: tc * 9 + i * 1.3, amp: 0.35 }); sbRing(ctx, x, G(x) + 4, ((t - 49.06 + i * 0.21) % 0.6) / 0.6, 30, { lw: 2 }); }
    if (t > 50.34 + i * 0.07) { const w = sbF(t, [[50.34 + i * 0.07, 0], [50.5 + i * 0.07, 1]]); P.aL = [1.5 * w + 0.2, 1.7 * w + 0.2]; P.aR = [1.4 * w + 0.2, 1.8 * w + 0.2]; P.sq *= 1 - 0.06 * w; delete P.handRW; }
    if (turn(i)) { P.gaze = [-1, -0.5]; P.dir = -1; P.lid = sbLid(t, 90 + i, [51.3 + i * 0.12]); }
    if (who === 'sin') { if (t > 48.6) P.handRW = [K.lerp(SB_KNOT[2][0], SB_KNOT[2][1], back) - 10, G(x) - 140]; P.wind = -0.6; sbSinbad(ctx, P); }
    else sbMerchant(ctx, { rust: 2, fat: 0, plum: 1 }[who], P); }
}
function sbS6Over(ctx, t, cam, S) {
  if (t > 41.6 && t < 42.6) { ctx.save(); ctx.globalAlpha = K.clamp((42.6 - t) / 0.3); S.emphasis(ctx, 500, 520, 200, K.clamp((t - 41.6) / 0.5), { word: 'RUMBLE!', rect: [0, 0, 1000, 1230], wx: 0, wy: 1.3 }); ctx.restore(); }
  if (t > 45.7 && t < 47.3) for (const x of [180, 1420]) { const [px, py] = sbP(x, 1000, cam); S.arrow(ctx, [px, py + 60], [px + (x < 800 ? 40 : -40), py - 90], K.clamp((t - 45.7) / 0.4)); }
}
SB_SHOTS.push({ a: 41.2, b: 52.21, ww: 1600, cam: (t) => K.camAt(SB_S6CAM, t), world: sbS6World, over: sbS6Over });

// ---------- S7 (52.21 - 60.82): the captain's shout, then the camera sinks below the water: the island is a whale ----------
// world: the dhow at x 260 (left), the island (whale s 0.9, crown at 1130) on the right. Group G: translate up 470 (57.68 - 58.9),
// then scale 1 -> 0.55 about (1130, 820) (58.92 - 59.9). Balloons are drawn outside G in panel units.
const SB_S7SEA = { hz: 600, y: [615, 700, 830, 915], amp: 6, pal: 'day' };
const SB_S7W = { x: 960, y: 800, s: 0.9 };
const SB_S7CAM = [[52.21, { x: 330, y: 680, zoom: 1.3 }], [53.8, { x: 330, y: 680, zoom: 1.3 }], [54.5, { x: 640, y: 615, zoom: 1.0 }], [58.92, { x: 640, y: 615, zoom: 1.0 }], [59.9, { x: 900, y: 615, zoom: 1.0 }], [60.82, { x: 910, y: 615, zoom: 1.0 }]];
function sbS7G(t) { const up = 470 * K.ease.inOut(K.clamp((t - 57.68) / 1.22)) - 237 * K.ease.inOut(K.clamp((t - 58.92) / 0.98)), sc = 1 - 0.45 * K.ease.inOut(K.clamp((t - 58.92) / 0.98)); return { up, sc }; }
const sbS7Pt = (t, p) => { const g = sbS7G(t); return [960 + (p[0] - 960) * g.sc, 820 + (p[1] - 820) * g.sc - g.up]; };
function sbS7World(ctx, t, cam) {
  const tc = SB_T2(t), g = sbS7G(t), sea = SB_S7SEA, deep = K.clamp((t - 57.68) / 0.6);
  ctx.save(); ctx.fillStyle = '#18346e'; ctx.fillRect(-2000, -2000, 6000, 6000); ctx.restore();
  ctx.save(); ctx.translate(0, -g.up); ctx.translate(960, 820); ctx.scale(g.sc, g.sc); ctx.translate(-960, -820);
  ctx.fillStyle = SB_SKIES.day.g[0][1]; ctx.fillRect(-1400, -1500, 4800, 1502); ctx.drawImage(sbSkyPlate('day'), -1400, 0, 4800, 640); sbSeaBack(ctx, t, sea, -1400, 3600);
  ctx.drawImage(sbUnderPlate(2400, 1800), -1600, 836, 5600, 2000);
  sbBubbles(ctx, 600, 1500, t, 57.9, 10, 600, 31, 12);
  sbSchool(ctx, 760, 1200, t, 14, { scatter: K.clamp((t - 59.34) / 0.6), dir: 1 });
  // the whale: the island on its back; awake and groggy at the end (lid, roll up, brow down, tail flex, bubbles)
  // rev 1: on "ضخم" 59.34 the lid opens half way and the pupil rolls up toward the fire; brow down on "نائم" 60.08; one slow blink
  const lid = t < 59.34 ? 1 : Math.min(1, sbF(t, [[59.34, 1], [59.62, 0.5]]) + 0.5 * sbBlinkAt(t, 60.35)), brow = K.clamp((t - 60.08) / 0.3), gz = [-0.2 - 0.5 * K.clamp((t - 59.5) / 0.4), -0.8 * K.clamp((t - 59.5) / 0.4)];
  sbWhale(ctx, SB_S7W.x, SB_S7W.y, { s: SB_S7W.s, dress: 1, t, lid, brow, gaze: gz, eyeK: 2.4, tail: 0.08 * pulse(tc, 60.3, 0.5), bubbles: t > 60.4 ? 60.4 : null, breathe: 0.5 + 0.5 * osc(t, 2.6) });
  // the camp fire's glow on its back and the four men, small, in a knot
  const fp = sbWhalePt(SB_S7W.x, SB_S7W.y, SB_S7W, 80, -14); if (t > 60.08) sbGlow(ctx, fp[0], fp[1] - 10, 60, 0.8, '#ffb050'); sbFire(ctx, fp[0], fp[1], t, { s: 0.6, smoke: false });
  for (let i = 0; i < 4; i++) { const lx = -60 + i * 40, p = sbWhalePt(SB_S7W.x, SB_S7W.y, SB_S7W, lx, sbWhaleTop(lx) - 14), turned = t > 57.04 + i * 0.13, P = sbAlive(t, 110 + i, { x: p[0], y: p[1], s: 0.5 * SB_MERCH[Math.min(2, i)].s, dir: turned ? -1 : (i % 2 ? 1 : -1), gaze: turned ? [-1, -0.2] : [0, 0.5], eyes: 'wide', mouth: 'o' });
    if (i === 1) sbSinbad(ctx, { ...P, s: 0.48 }); else sbMerchant(ctx, [0, 0, 1, 2][i], P); }
  // the ship: the captain at the rail, sailors behind him; the hull shows under the water once the camera sinks
  const f = sbFloat(220, t, sea, 2, 200), ds = 0.95; sbDhow(ctx, { x: 220, y: f.y, s: ds, pitch: f.rot, t, sail: 0.15, crew: (c) => sbOnDeck(c, ds, (q) => sbS7Crew(q, t, ds)) });
  // the water surface: opaque near layers fade as the camera sinks below, leaving a bright surface line
  sbSeaFront(ctx, t, sea, -1400, 3600, { alpha: [1 - deep * 0.85, 1 - deep * 0.95] });
  // rev 1 life: a pair of dolphins flee from the island toward the ship, arcing (they know)
  if (deep < 1) for (const [t0, k] of [[52.6, 0], [52.9, 1], [55.9, 0]]) sbDolphinLeap(ctx, 860 - k * 60, 560 - k * 60, seaY(700, t, 3, sea) + 10, (t - t0) / 0.85, 110, 0.6);
  if (deep > 0) { ctx.save(); ctx.globalAlpha = deep; ctx.strokeStyle = '#c8f6ff'; ctx.lineWidth = 6; ctx.beginPath(); for (let x = -1400; x < 3600; x += 30) { const y = seaY(x, t, 2, sea); x === -1400 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }
  // sound arcs travelling from the captain across the water
  if (t > 53.82 && t < 56.1) for (let k = 0; k < 3; k++) { const u = ((t - 53.82) * 0.7 + k / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(320 + u * 520, 560, 30 + u * 30, -0.7, 0.7); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (deep < 1) { sbSeaNear(ctx, t, sea, cam, { a: 0.8 * (1 - deep), fore: { alpha: 1 - deep } }); }
}
function sbS7Capt(t, ds) {
  const tc = SB_T2(t), C = sbAlive(t, 51, { x: 140 * ds, y: -80 * ds, dir: 1, gaze: [1, -0.1], brow: 0.8 }), sh = t > 52.9 && t < 57.0;
  C.tip += sbF(t, [[52.21, 0], [52.6, -0.1], [52.9, 0.18], [53.8, 0.14], [54.58, 0.08], [57.0, 0.06]]) + lagged((u) => flow(u, [[52.21, 0], [52.6, -0.1], [52.9, 0.18]]), tc, 0.1, 0.3);
  C.sq *= anticipate(tc, 52.4, 0.4, 0.05); C.talk = sbTalk(t, 52.9, 53.8, 3) + sbTalk(t, 54.58, 56.05, 4) + sbTalk(t, 57.04, 57.6, 5) + sbTalk(t, 58.92, 59.6, 6);
  if (t < 54.58) { C.handL = PERSON_HANDS.cupMouth.R.map((v, i) => i ? v : -v); C.handR = PERSON_HANDS.cupMouth.R; }
  else if (t < 55.44) { const a = sbF(t, [[54.58, 0], [54.8, 1], [55.0, 0.1], [55.15, 1], [55.3, 0.1], [55.44, 0.5]]); C.aR = [K.lerp(1.4, 2.4, a), K.lerp(1.6, 3.6, a)]; }
  else if (t < 56.1) { C.handR = PERSON_HANDS.pointFwd.R; C.sq *= impactSquash(tc, 55.6, 0.9); }
  else { C.handR = PERSON_HANDS.pointFwd.R; C.tilt = t < 57.0 ? 0.18 * Math.sin((t - 56.1) * 14) : 0; C.lid = sbLid(t, 51, [56.2, 56.6]); }
  C.mouth = C.talk > 0.1 ? 'open' : 'frown'; return C;
}
function sbS7Crew(c, t, ds) {
  const tc = SB_T2(t);
  for (let i = 0; i < 3; i++) { const run = t > 55.44 + i * 0.1 && i < 2, x = run ? kfn(t, [[55.44 + i * 0.1, (-60 - i * 50) * ds], [56.05 + i * 0.1, (190 - i * 30) * ds]]) : (-60 - i * 50) * ds;
    const P = sbAlive(t, 120 + i, { x, y: -80 * ds, dir: t > 52.9 + i * 0.13 ? 1 : -1, gaze: [1, 0], mouth: t > 57 ? 'o' : 'closed' }); if (run) Object.assign(P, walk(() => x, tc)); sbSailor(c, i, P); }
  const C = sbS7Capt(t, ds); sbCaptain(c, C);
  const h = sbPt(C, [0, 80], true); c.save(); c.strokeStyle = '#6a4a2a'; c.lineWidth = 2; const gx = h[0] + 14 + swing(t, 52.21, 20, 1.6, 1.5), gy = h[1] + 40; c.beginPath(); c.moveTo(h[0] - 10, h[1] - 30); c.lineTo(gx, gy); c.stroke(); c.restore(); sbSpyglass(c, gx, gy, 1.3 + swing(t, 52.21, 0.4, 1.6, 1.5), 0.9, 0.3);
}
function sbS7Over(ctx, t, cam, S) {
  const ds = 0.95, C = sbS7Capt(t, ds), hw = sbPt(C, [0, -30], true), f = sbFloat(220, t, SB_S7SEA, 2, 200), wp = sbDhowPt({ x: 220, y: f.y, s: ds, pitch: f.rot }, hw[0] / ds, hw[1] / ds), gp = sbS7Pt(t, wp), [hx, hy] = sbP(gp[0], gp[1], cam);
  sbSay(ctx, S, [[54.58, 'COME BACK!'], [55.44, 'COME BACK! QUICK!']], t, 520, 170, [hx + 20, hy - 30], { gone: 56.9, size: 54 });
  sbSay(ctx, S, [[57.04, 'THAT IS NO ISLAND...']], t, 500, 170, [hx + 20, hy - 30], { gone: 58.6, size: 52 });
  sbSay(ctx, S, [[58.95, 'IT IS A WHALE!']], t, 500, 170, [Math.max(80, hx), Math.max(260, hy - 30)], { size: 62 });
  if (t > 58.92 && t < 59.5) S.emphasis(ctx, 600, 700, 260, K.clamp((t - 58.92) / 0.5), { word: '', rect: [0, 0, 1000, 1230] });
}
SB_SHOTS.push({ a: 52.21, b: 60.82, ww: 1700, cam: (t) => K.camAt(SB_S7CAM, t), world: sbS7World, over: sbS7Over });

// ---------- S8 (60.82 - 69.88): the run to the boats, HISS!, the island sinks, the tail, Sinbad alone ----------
const SB_S8CAM = [[60.82, { x: 900, y: 640, zoom: 1.1 }], [62.8, { x: 980, y: 640, zoom: 1.1 }], [63.86, { x: 900, y: 720, zoom: 1.5 }], [65.4, { x: 900, y: 720, zoom: 1.5 }], [66.0, { x: 820, y: 615, zoom: 1.0 }], [69.88, { x: 800, y: 615, zoom: 1.0 }]];
const SB_RUNX = [(t) => kfn(t, [[60.82, 960], [63.08, 1290]], 'in'), (t) => kfn(t, [[60.95, 1040], [63.2, 1330]], 'in'), (t) => kfn(t, [[61.1, 640], [63.5, 1250]], 'in')];
const SB_SIN8X = (t) => kfn(t, [[62.65, 520], [65.6, 1050], [65.9, 1050], [67.3, 830]], 'inOut');
const SB_SKIF8X = [(t) => kfn(t, [[63.3, 1300], [68.5, 1720]], 'in'), (t) => kfn(t, [[63.6, 1380], [68.8, 1800]], 'in')];
function sbFluke(ctx, x, y, s, lift, t) { if (lift <= 0) return; ctx.save(); ctx.translate(x, y + (1 - lift) * 320 * s); ctx.scale(s, s); ctx.rotate(0.08 * Math.sin(t * 1.3));
  celShade(ctx, [[-50, 40], [-36, -160], [-60, -230], [-200, -300], [-240, -270], [-120, -180], [0, -200], [120, -180], [240, -270], [200, -300], [60, -230], [36, -160], [50, 40]], SB_WH.back, SB_WH.shade, { light: [-0.3, -1], off: 22, lw: 5, line: SB_WH.line });
  for (let i = 0; i < 8; i++) { const u = ((t * 1.4 + i / 8) % 1); ctx.globalAlpha = 1 - u; sbBlob(ctx, -180 + i * 52, -260 + u * 300, 6, 10, '#eafcff', '#9ad8f0', { lw: 2, off: 2 }); } ctx.restore(); }
function sbS8World(ctx, t, cam) {
  const tc = SB_T2(t), G = (x) => sbGround(x, t), sea = SB_ISEA;
  sbIsland(ctx, t, cam, { sway: 1.5 });
  // the tail fluke rises at the far end (66.98) and slaps down (69.1)
  const fl = t < 69.1 ? sbF(t, [[66.98, 0], [67.5, 0.85], [68.6, 1], [69.1, 0.9]]) : 1 - K.clamp((t - 69.1) / 0.25); sbFluke(ctx, 380, 962, 0.9, fl, t);
  if (t > 69.2) sbSplash(ctx, 380, 960, t - 69.2, 2.2);
  // the fire: HISS! the wave lip, the steam; the black sticks float apart
  const wv = K.clamp((t - 63.86) / 0.5); if (t > 63.6 && t < 65.2) { const x0 = K.lerp(1250, SB_FIRE - 30, K.ease.out(wv)); ctx.save(); ctx.globalAlpha = 0.92 * (t < 64.9 ? 1 : 1 - (t - 64.9) / 0.3); celShade(ctx, [[x0, G(x0) + 4], [x0 + 20, G(x0) - 22], [x0 + 80, G(x0 + 80) - 16], [1400, G(1300) - 6], [1400, 1000], [x0, 1000]], '#4fb6d6', '#2f88cf', { light: [0, -1], off: 6, lw: 3, line: '#1f5fc0' }); sbFoamLine(ctx, [[x0, G(x0) - 4], [x0 + 60, G(x0 + 60) - 14], [x0 + 140, G(x0 + 140) - 10]], t, { w: 10 }); ctx.restore(); }
  if (t < 65.0) sbFire(ctx, SB_FIRE, G(SB_FIRE) + 4, t, { fire: SB_FIREON(t), steam: K.clamp((t - 63.9) / 0.3) * (1 - K.clamp((t - 65.6) / 0.5)) });
  else for (let i = 0; i < 4; i++) { const x = SB_FIRE - 30 + i * 22 + (t - 65) * (i - 1.5) * 30, y = Math.min(seaY(x, t, 2, sea), G(x)) - 4; ctx.save(); ctx.translate(x, y); ctx.rotate(i * 0.7 + Math.sin(t * 2 + i) * 0.2); seg(ctx, -24, 0, 24, 0, 7, '#2a2028', 1.5); ctx.restore(); if (i === 1 && t < 65.5) sbGlint(ctx, x, y - 4, 14, (t - 65.0) / 0.5, '#ffb050'); }
  // skiffs float, take the men, pull away
  for (let k = 1; k >= 0; k--) { const x = SB_SKIF8X[k](t), f = sbFloat(x, t, sea, 2, 90), dip = 8 * (kick(t, [63.08 + k * 0.12, 63.2 + k * 0.2, 63.5], 1, 6, 5)), ph = tc * 7 + k;
    sbSkiff(ctx, { x, y: f.y + dip, s: 0.85, pitch: f.rot + 0.06 * Math.sin(t * 3 + k), oar: ph, row: t > 63.3 ? 1 : 0, crew: (c) => sbOnDeck(c, 0.85, (q) => {
      const R = sbAlive(t, 130 + k, { x: -30, y: -12, s: 0.6, dir: -1, tip: -0.12 * Math.sin(ph), gaze: [-1, 0] }); R.handL = [40, -130]; R.handR = [50, -125]; sbSailor(q, 1 + k, R);
      if (k === 0 && t > 63.1) for (let i = 0; i < 2; i++) { const M = sbAlive(t, 135 + i, { x: 30 + i * 36, y: -12, s: 0.62, dir: -1, gaze: [-1, -0.2], mouth: 'o' }); M.aL = [2.2, 2.6]; sbMerchant(q, i, { ...M, s: 0.62 }); }
      if (k === 1 && t > 63.5) { const M = sbAlive(t, 137, { x: 30, y: -12, s: 0.62, dir: -1, gaze: [-1, -0.2], mouth: 'o' }); M.handR = PERSON_HANDS.reach.R; sbMerchant(q, 2, { ...M, s: 0.62 }); } }) }); }
  // the three merchants run (fat with the pot on his head; plum loses his turban and snatches it back)
  for (let i = 0; i < 3; i++) { const xf = SB_RUNX[i], x = xf(t); if (t > [63.08, 63.2, 63.5][i]) continue; const y = Math.min(G(x), 2000), P = sbAlive(t, 140 + i, { x, y, dir: 1, ...walk(xf, tc, { stride: 30, amp: 50 }), tip: 0.18, mouth: 'o', eyes: 'wide', gaze: [1, 0] });
    if (i === 1 && t > 61.98) P.pal = { head: 'hair' }; sbMerchant(ctx, i, P);
    if (i === 0) { const h = sbPt({ ...SB_MERCH[0], ...P }, [0, -40]); ctx.save(); ctx.translate(h[0], h[1]); ctx.rotate(3.14 + 0.15 * Math.sin(tc * 10)); celShade(ctx, [[-42, -10], [42, -10], [46, 16], [32, 46], [-32, 46], [-46, 16]], '#5a5a72', '#363648', { light: [-1, -1], off: 8, lw: 3 }); ctx.restore(); }
    if (i === 1 && t > 61.98) { const u = K.clamp((t - 61.98) / 0.5), h = sbPt({ ...SB_MERCH[1], ...P }, [0, -40]); const tx = u < 1 ? h[0] - 60 * Math.sin(Math.PI * u) : h[0] + 30, ty = u < 1 ? h[1] - 80 * Math.sin(Math.PI * u) : h[1] + 60;
      sbBlob(ctx, tx, ty, 26, 14, '#ffffff', '#d8d8e8', { lw: 2.5 }); if (u < 1) sbRibbon(ctx, tx, ty, Math.PI, 70, 14, t, { col: '#ffffff', shade: '#d8d8e8', amp: 14 }); }
    for (const f of footfalls(xf, t - 0.4, t, 30)) if (x > 1050) { const fx = f.x; sbRing(ctx, fx, G(fx) + 4, (t - f.t) / 0.5, 30, { lw: 3 }); } }
  // Sinbad: firewood at the far palm, the double take, drops the wood, runs, splashes, backs onto the last hump
  { const x = SB_SIN8X(t), gy = G(x), wy = 962, y = Math.min(gy, wy + 100), P = sbAlive(t, 11, { x: t < 62.65 ? 520 : x, y: t < 62.65 ? G(520) : y, dir: 1, gaze: [1, 0], wind: -0.6, mouth: 'closed' });
    if (t < 62.3) { P.handLW = [540, G(520) - 120]; P.handRW = [575, G(520) - 118]; P.gaze = [-0.5, 0.4]; }
    else if (t < 62.65) { P.gaze = t < 62.45 ? [1, 0] : [1, -0.1]; P.lid = sbLid(t, 11, [62.35]); P.eyes = t > 62.45 ? 'wide' : 'open'; P.sq *= anticipate(tc, 62.45, 0.2, 0.08); P.tip -= 0.1 * pulse(tc, 62.45, 0.2); }
    else if (t < 65.9) { Object.assign(P, walk(SB_SIN8X, tc, { stride: 30, amp: 50 })); P.tip += 0.18; P.aL = [1.2 * Math.sin(P.ph) + 0.4, 1.2]; P.aR = [-1.2 * Math.sin(P.ph) + 0.4, 1.2]; P.mouth = 'o'; P.gaze = [1, 0];
      if (x > 980) { const ff = footfalls(SB_SIN8X, t - 0.4, t, 30); for (const f of ff) sbSplash(ctx, f.x, wy, t - f.t, 0.3); } }
    else { P.dir = t < 66.2 ? 1 : 1; P.aL = [1.5 + 0.2 * Math.sin(tc * 5), 1.9]; P.aR = [1.5 - 0.2 * Math.sin(tc * 5 + 1), 1.9]; P.tip += 0.08 * Math.sin(tc * 3);
      if (t < 67.3) Object.assign(P, walk(SB_SIN8X, tc, { stride: 26 }));
      P.gaze = t > 67.52 ? look(tc, [x, 700], [[67.52, [1600, 900]], [67.9, [300, 640]], [68.25, [x, 1000]], [69.15, [380, 700]]]) : [-1, 0.2]; P.lid = sbLid(t, 11, [67.9, 69.12]); }
    sbSinbad(ctx, P);
    if (t > 62.45 && t < 63.3) for (let i = 0; i < 4; i++) { const t0 = 62.5 + i * 0.05, y0 = G(520) - 120, yy = fallY(t, t0, t0 + 0.3, y0, G(520) - 6); ctx.save(); ctx.translate(530 + i * 12, yy); ctx.rotate(i * 0.8 + (t - t0) * 4 * (yy < G(520) - 7 ? 1 : 0)); seg(ctx, -24, 0, 24, 0, 7, '#8a5a32', 1.5); ctx.restore(); }
    else if (t >= 63.3) for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(530 + i * 12, G(530 + i * 12) - 6); ctx.rotate(i * 0.8 + 1.2); seg(ctx, -24, 0, 24, 0, 7, '#8a5a32', 1.5); ctx.restore(); }
    if (t < 62.3) for (let i = 0; i < 4; i++) seg(ctx, 530 - 28, G(520) - 124 + i * 7, 530 + 34, G(520) - 128 + i * 7, 7, i % 2 ? '#8a5a32' : '#a8743e', 1.5);
    // foam rings close round him as the last grass goes
    for (let k = 0; k < 3; k++) sbRing(ctx, x, wy + 2, (t - 68.38 - k * 0.15) / 0.6, 140, { rev: true, lw: 5 }); }
  // palms going under leave rings
  SB_WH.palms.forEach((lx, i) => { const t0 = [66.95, 66.7, 66.56][i]; sbRing(ctx, 800 + lx, 962, (t - t0) / 1.2, 100); });
  sbIslandFront(ctx, t, cam);
}
function sbS8Over(ctx, t, cam, S) { if (t > 64.0 && t < 65.2) { const [x, y] = sbP(SB_FIRE + 40, 600, cam); ctx.save(); ctx.globalAlpha = K.clamp((65.2 - t) / 0.3); S.title(ctx, 'HISS!', x, y, K.clamp((t - 64.0) / 0.3), { size: 84 }); ctx.restore(); } }
SB_SHOTS.push({ a: 60.82, b: 69.88, ww: 1600, cam: (t) => K.camAt(SB_S8CAM, t), world: sbS8World, over: sbS8Over });
