// ===== AN-098 the road (desertRoad strip 2400): S4 to Armenia (31.6-35.0), S8 the envoy to Baghdad (67.0-72.62), S13 home to Baghdad (129.68-135.4)
// direction rule: to Armenia left to right, to Baghdad right to left. Baghdad (domes, far layer) at the left end, Armenia (walled town + snowy mountains) at the right.
const A98_RW = 2400;
const a98CamX4 = (t) => kfn(t, [[31.6, 0], [34.9, 1400]]);
const a98HX8 = (t) => kfn(t, [[68.62, 1950], [71.3, 620], [72.62, 330]], 'lin');
const a98CamX8 = (t) => t < 68.62 ? 1400 : t < 71.3 ? Math.max(100, a98HX8(t) - 520) : 100;
const a98CamX13 = (t) => kfn(t, [[129.5, 1300], [135.5, 300]], 'lin');
function a98RoadCam(t) { let cx;
  if (t < 50) cx = a98CamX4(t); else if (t < 100) cx = a98CamX8(t); else cx = a98CamX13(t);
  return { x: cx + 500, y: 615, zoom: 1.0 }; }
// sky and mountains in screen space (the sky never scrolls; the mountains scroll slowly)
function a98RoadSky(ctx, t, camX, u) { ctx.save(); ctx.translate(camX, 0); skyCycle(ctx, u, { t, hills: false });
  const mx = (x) => x - 0.35 * camX; a98Mountains(ctx, [[mx(1110), 300, 260], [mx(1260), 340, 300], [mx(1400), 260, 240]], 760); ctx.restore(); }

function a98RoadWorld(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom, out = {};
  const u = t < 50 ? kfn(t, [[32.34, 0.2], [34.9, 0.48]]) : t < 100 ? 0.3 : 0.32;
  a98RoadSky(ctx, t, camX, u);
  desertRoad(ctx, { w: A98_RW, camX, t, sky: false, sun: false, city: 'right', farCity: 300, palms: [[760, 520, 20], [1500, 480, -14]], thorns: [1150, 2300], rocks: [560, 1700] });
  if (t < 50) a98Road4(ctx, t, camX, out); else if (t < 100) a98Road8(ctx, t, camX, out); else a98Road13(ctx, t, camX, out);
  return out;
}
// S4: the long walk to Armenia
function a98Road4(ctx, t, camX, out) {
  const xf = (tt) => a98CamX4(tt) + 420, P = a98F(t, { ...walk(xf, t, { stride: 46, amp: 300 }), mouth: 'smile', gaze: [1, -0.1] });
  const tire = a98Env(t, 32.96, 33.9, 0.3); P.amp *= 1 - 0.4 * tire; P.lid = tire > 0.3 ? Math.max(0.35, blink(t, 11)) : undefined; P.tip = 0.08 * tire; P.drop = 5 * tire;
  if (tire > 0.3) { P.handL = [-22, -205]; P.mouth = 'frown'; }
  if (t >= 33.9) { P.gaze = [0.8, -0.5]; P.sq = settleTo(t, 33.9, 1, 1.03, 0.3, 0.1); P.handR = t < 34.6 ? [16 + 6 * pulse(t, 34.2, 0.2), -96] : undefined; }
  person(ctx, P); const hd = a98Head(P); out.fh = hd;
  a98Scroll(ctx, P.x + 12, 900 - 92 * 0.95, 0.6, { roll: 1, seal: C.red, rot: -0.5 });
  a98Bindle(ctx, P.x + 26 * 0.95, hd[1] + 70, 1, 0.6 * tire);
  for (const f of footfalls(xf, 31.6, 35.0, 46)) dustBurst(ctx, f.x, 902, t - f.t, 3, 4, 8, 18, 0.4, Math.round(f.t * 10));
}
// S8: the envoy rides to Baghdad
function a98Road8(ctx, t, camX, out) {
  // Abdullah at the town gate, small
  const A = a98Abd({ x: 2130, s: 0.8, dir: -1, gaze: lookAt([2130, 740], [1950, 640]), mouth: 'closed', brow: 0.2 });
  if (t < 68.2) A.handR = [K.lerp(40, 70, a98E(t, 67.2, 0.4)), K.lerp(-110, -200, a98E(t, 67.2, 0.4))];
  if (t > 68.6) A.gaze = [-1, 0];
  person(ctx, A);
  const s = t > 71.3 ? K.lerp(0.75, 0.5, a98E(t, 71.3, 1.3)) : 0.75, y = t > 71.3 ? K.lerp(900, 868, a98E(t, 71.3, 1.3)) : 900;
  const H = { ...walk(a98HX8, t, { stride: GAIT.horse * s * 1.6 }), y, s, dir: -1, pal: 1 };
  const go = a98E(t, 68.62, 0.3); H.gallop = go; H.amp = Math.max(go, H.amp); H.rear = 0.4 * pulse(t, 68.3, 0.55); H.earL = H.earR = -0.3 * go; H.tailUp = 0.6 * go;
  if (t < 68.3) { H.amp = 0; H.headDown = 0.1 + 0.1 * Math.sin(t * 2); }
  const E = { ...A98_ENV, s: s * 1.02, gaze: t < 68.4 ? lookAt([1950, 650], [2130, 720]) : [-1, 0], mouth: 'closed', lurch: lurch(t, 68.62, 0.22) - 0.15 * pulse(t, 68.3, 0.5), tip: t < 67.9 ? 0.15 * a98Env(t, 67.3, 67.95, 0.2) : 0 };
  const seat = rideOn(ctx, 'horse', H, E);
  const bob = H.gallop ? 6 * Math.sin(H.ph * 2) : 0, sx = seat.x + 18 * s, sy = seat.y - 30 * s;
  a98Satchel(ctx, sx, sy + bob, s * 1.1, { scroll: t >= 67.9, rot: 0.25 * Math.sin(H.ph * 2 + 0.6) * go });
  if (a98In(t, 67.35, 67.95)) { const u = a98E(t, 67.35, 0.55), a = [2130 + 50, 900 - 175 * 0.8], b = [sx, sy - 10]; a98Scroll(ctx, K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 50 * Math.sin(Math.PI * u), 0.55, { roll: 1, seal: C.red, rot: u * 2 }); }
  if (a98In(t, 70.36, 70.9)) a98Glint(ctx, sx + 4, sy - 22, 22, (t - 70.36) / 0.5);
  if (t > 68.62) for (const f of footfalls(a98HX8, 68.62, 72.62, GAIT.horse * 0.75 * 1.6)) dustBurst(ctx, f.x + 60 * s, y + 2, t - f.t, 5, 6, 14, 40, 0.5, Math.round(f.t * 10));
  if (a98In(t, 68.3, 69.2)) dustBurst(ctx, 1980, 902, t - 68.4, 8, 10, 24, 70, 0.8, 21);
  // Yahya's medallion pops above the domes of Baghdad
  if (t >= 71.32) a98Medal(ctx, camX + 250, 470, 52 * K.ease.back(K.clamp((t - 71.32) / 0.4)), 'yah', { gaze: [1, 0.2] });
  out.env = [seat.x, seat.y - 160 * s]; out.city = [camX + 250, 600];
}
// S13: home to Baghdad with the gifts
function a98Road13(ctx, t, camX, out) {
  const s = 0.66, xf = (tt) => a98CamX13(tt) + 440, sp = 205;
  const pals = [1, 2, 1], loads = [['chest', 'sack'], [{ kind: 'bolt', col: C.red }, { kind: 'bolt', col: C.blue }], ['sack', 'chest']];
  const heads = [];
  for (let i = 2; i >= 0; i--) { const xi = (tt) => xf(tt) + sp * (i + 1);
    const H = { ...walk(xi, t + i * 0.13, { stride: GAIT.horse * s }), y: 900, s, dir: -1, pal: pals[i], saddle: false, load: loads[i], tailSwish: Math.sin(t * 2 + i) };
    H.x = xi(t); H.headDown = 0.15 + 0.12 * Math.sin(t * 2.4 + i * 2);
    if (i === 0 && t >= 134.52) { H.snort = pulse(t, 134.7, 0.6); H.headTurn = 0.3 * pulse(t, 134.6, 0.8); }
    horse(ctx, H); heads.push([H.x - 150 * s, 900 - 300 * s]); }
  heads.reverse();
  const H = { ...walk(xf, t, { stride: GAIT.horse * s }), y: 900, s, dir: -1, pal: 0 };
  const lookBack = (t >= 132.88 && t < 133.6) || (t >= 134.52 && t < 135.4);
  const R = { ...a98F(131, {}), s: s * 1.4, gaze: lookBack ? [1, 0] : [-1, 0], lid: 0, brow: -0.6, mouth: 'closed', bob: 3 * Math.sin(H.ph * 2 - 0.4) };
  if (lookBack) { R.mouth = t >= 134.52 ? (t > 134.9 ? 'smile' : 'open') : 'o'; R.tilt = 0.05; }
  if (t >= 134.52) R.sq = 1 + 0.04 * pulse(t, 134.52, 0.25);
  if (t >= 133.68 && t < 134.4) { R.handR = [-14, -128]; R.lid = a98In(t, 133.85, 134.0) ? 0.8 : 0; R.mouth = 'frown'; }
  const seat = rideOn(ctx, 'horse', H, R, { reins: !(t >= 133.68 && t < 134.4) });
  // lead ropes
  const hand = [seat.x + 30 * s, seat.y - 70 * s]; let prev = hand;
  for (const hd of heads) { ctx.save(); ctx.strokeStyle = '#7a4212'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.quadraticCurveTo((prev[0] + hd[0]) / 2, Math.max(prev[1], hd[1]) + 40, hd[0], hd[1]); ctx.stroke(); ctx.restore(); prev = [hd[0] + 120 * s, 900 - 230 * s]; }
  if (a98In(t, 133.85, 134.3)) a98Glint(ctx, seat.x - 20, seat.y - 100 * s, 18, (t - 133.85) / 0.45);
  out.fh = [seat.x, seat.y - 160 * s * 1.4]; out.string = [heads[1][0], 560];
}
