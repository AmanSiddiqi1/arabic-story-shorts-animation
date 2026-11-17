// ===== AN-138 main: which scene, camera, overlays (lettering, counters, balloons, thought clouds, diagram, card), the scene object, sound =====
const YP_DUR = 175.77;   // plan duration 172.269 + end hold 3.5
const YP_VW = 1000, YP_VH = 1230;

// ---------- scene table ----------
const YP_SCENES = [[0, ypSceneArrival], [38.5, ypSceneRoomS5], [42.22, ypSceneHall67], [61.28, ypSceneRoomS8], [72.24, ypSceneRoomS9], [84.13, ypSceneNight], [117.28, ypSceneEscape], [127.24, ypSceneEmpty], [131.44, ypSceneHallLate], [161.06, ypSceneDawn]];
const ypSceneAt = (t) => { let f = YP_SCENES[0][1]; for (const [t0, fn] of YP_SCENES) if (t >= t0) f = fn; return f; };

// ---------- camera (keys 0.01 s apart are cuts) ----------
const ypC = (x, y, zoom) => ({ x, y, zoom });
const YP_CAM = [
  [0, ypC(500, 615, 1.0)], [1.0, ypC(500, 615, 1.0)], [6.7, ypC(560, 640, 1.15)], [8.11, ypC(560, 640, 1.15)],
  [8.12, ypC(600, 700, 1.6)], [11.24, ypC(605, 705, 1.62)], [11.8, ypC(625, 770, 2.2)], [13.3, ypC(625, 770, 2.2)], [13.95, ypC(600, 700, 1.6)], [15.3, ypC(600, 700, 1.6)], [16.1, ypC(520, 690, 1.7)], [22.97, ypC(520, 690, 1.75)],
  [22.98, ypC(520, 700, 1.9)], [32.31, ypC(515, 690, 2.1)], [33.8, ypC(515, 690, 2.1)], [36.9, ypC(600, 690, 1.5)], [38.49, ypC(600, 690, 1.5)],
  [38.5, ypC(480, 720, 1.25)], [42.21, ypC(500, 720, 1.25)],
  [42.22, ypC(500, 615, 1.0)], [44.0, ypC(500, 615, 1.0)], [47.2, ypC(590, 700, 1.5)], [50.87, ypC(590, 700, 1.55)],
  [50.88, ypC(380, 680, 1.35)], [56.51, ypC(380, 680, 1.35)], [56.52, ypC(600, 690, 1.6)], [61.27, ypC(600, 690, 1.65)],
  [61.28, ypC(560, 730, 1.35)], [72.23, ypC(590, 735, 1.4)],
  [72.24, ypC(380, 700, 1.4)], [81.7, ypC(380, 700, 1.4)], [82.3, ypC(460, 770, 2.3)], [84.12, ypC(460, 770, 2.35)],
  [84.13, ypC(520, 720, 1.25)], [87.0, ypC(520, 720, 1.25)], [88.0, ypC(560, 700, 1.25)], [91.93, ypC(560, 700, 1.25)],
  [91.94, ypC(560, 600, 1.5)], [104.0, ypC(580, 610, 1.8)], [105.97, ypC(580, 610, 1.8)],
  [105.98, ypC(620, 700, 1.5)], [111.0, ypC(660, 700, 1.5)], [114.4, ypC(620, 700, 1.5)], [117.27, ypC(580, 700, 1.5)],
  [117.28, ypC(720, 700, 1.5)], [118.8, ypC(690, 700, 1.5)], [120.8, ypC(560, 700, 1.35)], [123.0, ypC(430, 690, 1.2)], [125.22, ypC(380, 680, 1.1)], [127.23, ypC(380, 680, 1.1)],
  [127.24, ypC(480, 720, 1.25)], [131.43, ypC(480, 720, 1.25)], [131.44, ypC(560, 680, 1.3)], [133.0, ypC(580, 690, 1.4)], [138.79, ypC(580, 690, 1.4)],
  [138.8, ypC(580, 690, 1.4)], [139.6, ypC(700, 640, 2.0)], [141.2, ypC(700, 640, 2.0)], [141.8, ypC(560, 680, 1.35)], [143.6, ypC(560, 680, 1.35)], [145.0, ypC(640, 690, 1.5)], [150.13, ypC(640, 690, 1.5)],
  [150.14, ypC(640, 690, 1.5)], [152.4, ypC(640, 690, 1.5)], [153.2, ypC(500, 695, 1.15)], [160.6, ypC(500, 695, 1.15)], [161.05, ypC(600, 690, 1.4)],
  [161.06, ypC(400, 640, 1.25)], [167.0, ypC(400, 640, 1.25)], [168.5, ypC(620, 640, 1.25)], [YP_DUR, ypC(620, 640, 1.25)]];
function ypCam(t) { const c = K.camAt(YP_CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, YP_VW - 500 / z), y: K.clamp(c.y, 615 / z, YP_VH - 615 / z), zoom: z }; }
const ypW2V = (p, c) => (p ? [500 + (p[0] - c.x) * c.zoom, 615 + (p[1] - c.y) * c.zoom] : null);

// ---------- lettering helpers (panel units) ----------
function ypName(S, ctx, t, text, t0, d, at, to, o = {}) {
  const p = ypEnv(t, t0, t0 + d, 0.2); if (p <= 0) return; const k = K.clamp((t - t0) / 0.45);
  ctx.save(); ctx.globalAlpha = K.clamp((t0 + d - t) / 0.25);
  if (to) S.arrow(ctx, [at[0], at[1] + 30], to, K.clamp((t - t0 - 0.1) / 0.4), { width: 16 });
  S.label(ctx, text, at[0], at[1], k, { align: 'center', size: o.size || 40, fill: o.fill, color: o.color }); ctx.restore();
}
function ypWord(S, ctx, t, text, t0, d, at, o = {}) { const p = K.clamp((t - t0) / 0.35); if (t < t0 || t > t0 + d) return; ctx.save(); ctx.globalAlpha = K.clamp((t0 + d - t) / 0.2); S.label(ctx, text, at[0], at[1], p, { align: 'center', size: o.size || 46, fill: o.fill || C.yellow, color: o.color, tilt: o.tilt ?? -0.03 }); ctx.restore(); }

// ---------- overlays ----------
function ypOverlays(ctx, t, cam, F, S) {
  const hv = (k) => ypW2V(F.heads[k], cam);
  // S1-S2 names
  if (t < 4.2 && hv('Y')) { const h = hv('Y'); ypName(S, ctx, t, 'YAHYA THE VIZIER', 1.68, 2.2, [Math.max(260, h[0] + 60), 250], [h[0] + 10, h[1] - 90]); }
  if (ypIn(t, 6.68, 8.12)) S.title(ctx, 'BAGHDAD', 240, 200, K.clamp((t - 6.68) / 0.6), { size: 64, align: 'center' });
  if (ypIn(t, 10.52, 11.3)) { const h = hv('G'); ypName(S, ctx, t, 'A POOR MAN', 10.52, 0.75, [h[0] + 60, h[1] - 220], [h[0] + 20, h[1] - 80]); }
  // S3 coin balloon
  if (ypIn(t, 27.64, 28.9)) { const h = hv('G'), b = ypW2V([725, 520], cam); ypBalloon(ctx, b[0], b[1], 150, 130, [h[0] + 30, h[1] - 50], ypEnv(t, 27.64, 28.9, 0.15) * 1.4, (c) => { ypCoin(c, 0, 0, 40, 1); c.lineCap = 'round'; c.lineWidth = 14; c.strokeStyle = C.red; c.beginPath(); c.moveTo(-44, -44); c.lineTo(44, 44); c.stroke(); }); }
  // S4 question tags, struck and swept away
  [['FAMILY?', 34.46, [250, 170], ypTreeIcon], ['JOB?', 35.54, [640, 250], ypHammerIcon]].forEach(([txt, t0, wp, icon], i) => {
    if (t < t0 || t > 37.0) return; const v = wp, fly = ypE(t, 36.3 + i * 0.06, 0.55, 'in');
    ctx.save(); ctx.translate(v[0] - 300 * fly, v[1] - 700 * fly); ctx.rotate(-2.5 * fly); const r = S.label(ctx, txt, 0, 0, K.clamp((t - t0) / 0.25), { align: 'center', size: 50 }); icon(ctx, -r.w / 2 - 26, -14); ypStrike(ctx, 0, -12, r.w + 20, (t - t0 - (i ? 0.15 : 0.25)) / 0.25); ctx.restore(); });
  // S5
  if (ypIn(t, 39.54, 41.0)) ypName(S, ctx, t, 'GUEST ROOM', 39.54, 1.45, [330, 250], [700, 770]);
  // S6: treasurer, 1000, coin stacks, every day
  if (ypIn(t, 44.9, 46.5) && hv('T')) { const h = hv('T'); ypName(S, ctx, t, 'THE TREASURER', 44.9, 1.5, [Math.max(240, h[0] + 20), h[1] - 230], [h[0], h[1] - 80]); }
  if (ypIn(t, 48.7, 50.88)) { ctx.save(); ctx.globalAlpha = K.clamp((50.88 - t) / 0.2); S.counter(ctx, 1000, 470, 250, K.clamp((t - 48.7) / 0.4), { size: 110 }); ypCoin(ctx, 300, 200, 34, 1);
    for (let i = 0; i < 10; i++) { const k = K.ease.back(K.clamp((t - 49.16 - i * 0.067) / 0.2)); if (k > 0) { ctx.save(); ctx.translate(300 + i * 38, 410); ctx.scale(k, k); ypStack(ctx, 0, 0, 5, 15); ctx.restore(); } }
    if (t >= 49.9) S.label(ctx, 'EVERY DAY', 520, 500, K.clamp((t - 49.9) / 0.3), { align: 'center', size: 54, fill: C.red, color: C.white, tilt: -0.03 }); ctx.restore(); }
  // S7: the picture equation
  if (ypIn(t, 53.98, 56.5)) ypDiagram(ctx, t, S);
  // S7: hourglass balloon, NO END DATE on the empty box
  if (ypIn(t, 58.52, 59.9) && hv('T')) { const h = hv('T'), b = ypW2V([575, 520], cam), fl = ypE(t, 59.4, 0.45, 'in');
    ctx.save(); ctx.translate(fl * 380, -fl * 420); ypBalloon(ctx, b[0], b[1], 150, 150, [h[0] + 40, h[1] - 40], K.clamp((t - 58.52) / 0.25), (c) => { c.rotate(fl * 3); ypHourglass(c, 0, 0, 1 - (t - 58.52) / 2, t); ypStrike(c, 0, 0, 100, (t - 59.3) / 0.12); }, { alpha: 1 - fl }); ctx.restore(); }
  if (ypIn(t, 59.3, 61.28) && F.ledger && F.ledger.open > 0.6) { const L = F.ledger, v = ypW2V([L.x + 39 * L.s, L.y + 25 * L.s], cam); S.label(ctx, 'NO END DATE', v[0], v[1] + 12, K.clamp((t - 59.3) / 0.3), { align: 'center', size: 36, fill: C.red, color: C.white, tilt: -0.05 }); }
  // S8: day / week counter
  if (ypIn(t, 64.32, 72.24)) { const d = Math.floor(ypDays(t) + 0.25), wk = t < 66.2 ? 0 : t < 66.6 ? 2 : t < 67.0 ? 3 : 4; const txt = wk ? 'WEEK ' + wk : 'DAY ' + Math.min(7, Math.max(1, d));
    S.label(ctx, txt, 190, 150, 1, { align: 'center', size: 52, fill: C.yellow, tilt: -0.02 }); }
  // S9-S10 running total
  const tot = ypTotal(t); if (tot && !ypIn(t, 89.8, 91.25)) { ctx.save(); ctx.globalAlpha = tot.a; S.counter(ctx, tot.v, 800, 190, 1, { size: 62 }); ctx.restore(); }
  // S10: thirty moons, 30 NIGHTS, 30,000 DIRHAMS
  if (ypIn(t, 85.0, 87.7)) { ypMoons(ctx, t, 85.14, { alpha: 1 - ypE(t, 87.16, 0.4), flash: (t - 86.1) / 0.5 }); if (t >= 86.1) S.label(ctx, '30 NIGHTS', 500, 350, K.clamp((t - 86.1) / 0.3), { align: 'center', size: 56, fill: C.yellow }); }
  if (ypIn(t, 89.8, 91.25)) { ctx.save(); ctx.globalAlpha = K.clamp((91.25 - t) / 0.25); S.emphasis(ctx, 420, 360, 170, K.clamp((t - 89.8) / 0.4), { word: 'RICH!', wx: 0.95, wy: 0.75 }); S.counter(ctx, 30000, 420, 380, K.clamp((t - 89.8) / 0.35), { size: 104 }); S.label(ctx, 'DIRHAMS', 420, 520, K.clamp((t - 90.0) / 0.3), { align: 'center', size: 50, fill: C.yellow }); ctx.restore(); }
  // S11: the fear cloud
  if (ypIn(t, 96.24, 105.7)) ypFearCloud(ctx, t, hv('G'), S);
  // S14: GONE!, the report balloon
  if (ypIn(t, 130.32, 131.44)) { ctx.save(); ctx.globalAlpha = K.clamp((131.44 - t) / 0.2); S.emphasis(ctx, 720, 700, 140, K.clamp((t - 130.32) / 0.4), { word: 'GONE!', wx: 0.2, wy: 1.6 }); ctx.restore(); }
  if (ypIn(t, 134.16, 138.1) && hv('A')) ypReport(ctx, t, hv('A'), S);
  // S15-S16 Yahya's clouds
  if (ypIn(t, 146.12, 150.14) && hv('Y')) ypWarmCloud(ctx, t, hv('Y'));
  if (ypIn(t, 152.76, 161.06) && hv('Y')) ypVision(ctx, t, hv('Y'), S);
  // S17
  if (ypIn(t, 169.3, 172.3)) ypName(S, ctx, t, 'STILL OPEN', 169.3, 2.9, [300, 360], ypW2V([700, 790], cam), { size: 46 });
}
function ypTotal(t) {
  if (ypIn(t, 75.98, 83.36)) { let v = 1000; [77.92, 78.14, 78.36, 78.58].forEach((r) => { if (t >= r) v += 1000; }); if (t >= 78.6) v = Math.round(K.lerp(5000, 12000, ypE(t, 78.6, 0.4, 'out')) / 1000) * 1000; return { v, a: K.clamp((83.36 - t) / 0.2) }; }
  if (ypIn(t, 88.8, 91.94)) return { v: Math.round(K.lerp(29000, 30000, ypE(t, 88.8, 0.8)) / 50) * 50, a: K.clamp((91.94 - t) / 0.3) };
  return null;
}
// picture equation card: two equal trays, the family under one, the guest under the other
function ypDiagram(ctx, t, S) {
  const p = ypEnv(t, 53.98, 56.5, 0.2), k = K.ease.back(K.clamp((t - 53.98) / 0.3)); if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = K.clamp((56.5 - t) / 0.2); S.box(ctx, 90, 100, 820, 500, K.clamp((t - 53.98) / 0.25), { fill: C.white, dot: '#cfe0ff' });
  if (k > 0.4) {
    const slide = ypE(t, 54.05, 0.35); ypTray(ctx, 290, 230, 1.6, { noCover: true, t }); ypTray(ctx, K.lerp(290, 710, slide), 230, 1.6, { noCover: true, t });
    const eq = K.ease.back(K.clamp((t - 54.35) / 0.25)); if (eq > 0) { ctx.save(); ctx.translate(500, 190); ctx.scale(eq, eq); for (const dy of [-14, 14]) shape(ctx, K.rectPts(-36, dy - 8, 72, 16), C.red, { lw: 4, seed: 990 }); ctx.restore(); }
    if (t >= 55.0) { const a = ypE(t, 55.0, 0.25); ctx.save(); ctx.globalAlpha *= a;
      person(ctx, { costume: 'lady', x: 230, y: 560, s: 0.85, sit: 1, seat: 'floor', mouth: 'smile', gaze: [0.6, 0.3], handR: [50, -140] });
      person(ctx, { costume: 'prince', child: true, x: 360, y: 560, s: 0.85, sit: 1, seat: 'floor', mouth: 'smile', dir: -1, handR: [60 + 10 * Math.sin(t * 6), -150], gaze: [-0.6, -0.4] });
      S.label(ctx, 'FAMILY', 290, 300, a, { align: 'center', size: 40 }); ctx.restore(); }
    if (t >= 55.92) { const a = ypE(t, 55.92, 0.25); ctx.save(); ctx.globalAlpha *= a; person(ctx, ypGuest({ x: 710, y: 560, s: 0.85, sit: 1, seat: 'floor', mouth: 'smile', dir: -1, handR: [50, -140] }, 62));
      S.label(ctx, 'GUEST', 710, 300, a, { align: 'center', size: 40 }); ctx.restore(); }
  }
  ctx.restore();
}
// S11: the cold thought cloud (the imagined, angry accountant)
function ypFearCloud(ctx, t, head, S) {
  const p = t < 105.4 ? K.clamp((t - 96.24) / 0.5) : 1 - K.clamp((t - 105.4) / 0.2);
  thoughtCloud(ctx, 490, 300, 760, 450, t, { p, tail: head ? [head[0] - 20, head[1] - 60] : [640, 600], fill: YP_COLD, bg: YP_COLD, scale: 0.72, at: [600, 700], seed: 7, inside: (c) => {
    const angry = t >= 98.56, tal = Math.min(30, Math.max(0, (t - 97.46) * 30));
    const Y = ypYahya({ x: 400, y: 900, dir: 1, brow: angry ? 1 : 0.3, mouth: angry ? 'open' : 'closed', gaze: lookAt([400, 640], [560, 760]), sq: 1 + 0.05 * pulse(t, 98.56, 0.3) });
    if (t < 102.9) { Y.handRW = [520 + (tal % 5) * 6, 760 + Math.floor(tal / 5) * 6]; } else { Y.handR = PERSON_HANDS.reach.R; Y.gaze = [0, 0.05]; Y.tip = 0.06; }
    person(c, Y); ypTable(c, 470, 720, 800); ypLedger(c, 590, 770, 1.3, { open: 1, n: tal });
    if (t >= 100.22 && t < 103.2) { const h = 520 * settleTo(t, 100.22, 0, 1, 0.5, 0.18) + 8 * Math.sin(t * 9) * ypE(t, 100.7, 0.2); const a = 1 - ypE(t, 102.9, 0.3);
      c.save(); c.globalAlpha *= a; for (let y = 0; y < h; y += 14) ypCoin(c, 860 + 3 * Math.sin(y * 0.3), 900 - y, 26, 0.35); c.setLineDash([22, 14]); c.lineWidth = 8; c.strokeStyle = C.red; c.beginPath(); c.moveTo(760, 520); c.lineTo(980, 520); c.stroke(); c.setLineDash([]); c.restore(); }
    if (t >= 103.0) { const g = K.lerp(1, 1.6, ypE(t, 103.0, 0.4, 'out')); ypPalm(c, 600, 560, g * 1.4); }
    if (t >= 104.06) { const k = ypE(t, 104.3, 0.7); ypSack(c, 860, 920, 0.9, { mark: false }); c.save(); c.setLineDash([16, 10]); c.lineWidth = 6; c.strokeStyle = C.black; c.beginPath(); c.moveTo(800, 860); c.lineTo(930, 860); c.stroke(); c.restore();
      ypSack(c, K.lerp(860, 640, k), K.lerp(860, 600, k) , 0.45, { mark: false }); }
  } });
  if (ypIn(t, 100.22, 102.9)) S.label(ctx, 'TOO MUCH!', 760, 190, K.clamp((t - 100.4) / 0.3), { align: 'center', size: 44, fill: C.red, color: C.white, tilt: 0.04 });
  if (ypIn(t, 103.0, 105.4)) S.label(ctx, 'GIVE IT BACK!', 490, 110, K.clamp((t - 103.0) / 0.3), { align: 'center', size: 48, fill: C.red, color: C.white, tilt: -0.04 });
}
// S14: the report balloon: a tiptoeing silhouette, then the sack and 30,000
function ypReport(ctx, t, head, S) {
  ypBalloon(ctx, 300, 370, 300, 240, [head[0] - 10, head[1] - 60], ypEnv(t, 134.16, 138.1, 0.2) * 1.3, (c) => {
    if (t < 136.3) { const sn = ypSneak(70, -70, 134.3, 136.2, t, 4), P = ypGuest({ x: sn.x, y: 100 - sn.bob, s: 0.5, dir: -1, ph: sn.ph, amp: sn.amp, tip: 0.2, handL: [-30, -186], handR: [56, -64] }, 120);
      c.save(); c.filter = 'brightness(0)'; ypBackSack(c, P, t); person(c, P); c.restore(); }
    else { const k = K.ease.back(K.clamp((t - 136.3) / 0.25)); c.save(); c.scale(k, k); ypSack(c, 0, 95, 0.95); c.restore();
      if (t >= 136.78) S.label(c, '30,000', 0, 10, K.clamp((t - 136.78) / 0.25), { align: 'center', size: 46, fill: C.yellow, tilt: -0.06 }); }
  });
}
// S15: Yahya's warm cloud: the worried guest and the heart door that he feared would close
function ypWarmCloud(ctx, t, head) {
  const p = t < 149.5 ? K.clamp((t - 146.12) / 0.45) : 1 - K.clamp((t - 149.5) / 0.6);
  thoughtCloud(ctx, 320, 300, 500, 330, t, { p, tail: [head[0] - 30, head[1] - 70], fill: '#fff1a8', bg: '#fff1a8', scale: 0.7, at: [570, 770], seed: 9, inside: (c) => {
    const op = t < 146.58 ? 0 : t < 148.36 ? ypE(t, 146.58, 0.35) : t < 149.06 ? 1 - ypE(t, 148.36, 0.1) : ypE(t, 149.06, 0.6);
    if (t >= 146.5) ypHeartDoor(c, 720, 900, op, 1.2);
    const jump = hop(t, 148.4, 0.35, 0, 0, 40)[1], P = ypGuest({ x: 420, y: 900 - jump, dir: -1, tip: 0.2, gaze: [1, -0.1], brow: -0.8, mouth: t > 148.36 && t < 149.2 ? 'o' : 'frown', handL: [-30, -186], handR: [56, -64], ph: t * 6, amp: 0.3 }, 120);
    ypBackSack(c, P, t); person(c, P); } });
}
// S16: the vision of the life he left
function ypVision(ctx, t, head, S) {
  const p = t < 160.6 ? K.clamp((t - 152.76) / 0.5) : 1 - K.clamp((t - 160.6) / 0.4);
  thoughtCloud(ctx, 440, 260, 780, 390, t, { p, tail: [head[0] - 20, head[1] - 70], fill: '#fff1a8', bg: TOWN_WALLS.clear[2], scale: 0.8, at: [610, 730], seed: 12, inside: (c) => {
    const u = ypU(t); ypRoom(c, t, { u, dent: 0.8, dentX: 700 });
    const hh = 40 + 520 * ypE(t, 153.4, 7.0, 'in'); ypHeap(c, 515, 904, Math.min(120, 50 + hh * 0.2), hh, 31);
    const pa = ypArc(t, 160.44, 0.3, [515, 200], [515, 900 - hh], 0); if (pa) ypPurse(c, pa[0], pa[1], 0.9, { mark: '1000' });
    const age = K.lerp(0.3, 1, ypE(t, 155.72, 1.2)), G = ypGuest({ x: 700, y: YP_SITY, dir: -1, sit: 1, seat: 'bench', mouth: 'smile', age, sq: breathe(t, 4, 0.02), lid: t > 156.38 ? 0.4 : 0, gaze: [-0.6, 0.2] }, 62);
    if (t > 155.9) { G.hold = 'stick'; G.handR = [44, -110]; } person(c, G);
    const sx = (tt) => kfn(tt, [[158.3, 120], [159.2, 330]], 'lin');
    if (t >= 158.3) { const S2 = ypServA({ ...ypWalk(sx, t, 0.6), dir: 1, age: 1, tip: 0.12, mouth: 'smile', gaze: [1, 0.3] }); S2.handRW = [sx(t) + 70, 790]; S2.handLW = [sx(t) + 30, 795]; person(c, S2);
      const ty = t < 159.28 ? 786 : 822 - 4; ypTray(c, t < 159.28 ? sx(t) + 52 : 390, ty, 0.6, { noCover: true, t }); }
    ypRoomDim(c, t, u); } });
  if (ypIn(t, 154.32, 160.6)) { ctx.save(); ctx.globalAlpha = K.clamp((160.6 - t) / 0.3); S.label(ctx, 'IF HE HAD STAYED...', 440, 110, K.clamp((t - 154.32) / 0.3), { align: 'center', size: 42, fill: C.yellow, tilt: -0.02 }); ctx.restore(); }
}
// white speed smear for the whips (panel units)
function ypWhip(ctx, t, t0, d = 0.3) { if (t < t0 || t >= t0 + d) return; const u = (t - t0) / d; ctx.save(); ctx.globalAlpha = 0.9 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(Math.round(t0 * 10)); for (let i = 0; i < 30; i++) ctx.fillRect(-200 + r() * 1200 - u * 400, r() * 1230, 260 + r() * 300, 8 + r() * 18); ctx.restore(); }

// ---------- the scene ----------
const SCENE = {
  duration: YP_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K.spring(t, 7.4, 2, 14, 7);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / YP_VW, ph / YP_VH);
    const cam = ypCam(t), F = { heads: {} };
    ctx.save(); K.camera(ctx, YP_VW, YP_VH, cam); ypSceneAt(t)(ctx, t, F); ctx.restore();
    ypOverlays(ctx, t, cam, F, S);
    ypWhip(ctx, t, 38.35); ypWhip(ctx, t, 131.3);
    if (t >= 83.36 && t < 84.9) S.transition(ctx, YP_VW, YP_VH, (t - 83.36) / 1.54, { caption: 'LATER...' });
    if (t >= 172.3) S.title(ctx, 'THE END', 300, 240, K.clamp((t - 172.3) / 0.8), { size: 88, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's five quiet effects, in the narration's only pauses and after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, YP_DUR, 0.5);
    k.play('thud', 7.72, { gain: 0.35 });                  // the horse stops
    k.play('chime', 15.86, { note: 'E6', gain: 0.4 });     // Yahya walks up to him
    k.play('pop', 22.4, { gain: 0.35 });                   // lifted to his feet
    k.play('pop', 41.95, { gain: 0.35 });                  // he sinks into the couch
    k.play('chime', 172.6, { note: 'C6', gain: 0.6 });     // THE END
  },
};
window.SCENE = SCENE;
