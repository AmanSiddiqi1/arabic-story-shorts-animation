// ===== KD-012 lakeShore scenes, day and dusk: S3 the lake and the burrows, S4 the charge, S6 the rock, S7 the messenger of the moon =====
// burrow states over the whole film: B1 cracks (40.85); B2, B3, B4 are crushed (46.45, 48.2, 48.6) and pop back at the end (161.0, 161.4, 161.8)
const CRUSH = { B2: [46.45, 161.0], B3: [48.2, 161.4], B4: [48.6, 161.8] };
function bState(k, t) { if (k === 'B1') return { crack: B(t, 40.85, 0.3) * (1 - B(t, 160.7, 0.3)), collapse: 0 }; const c = CRUSH[k]; if (!c) return { crack: 0, collapse: 0 };
  return { crack: 0, collapse: t < c[1] ? B(t, c[0], 0.12) : 1 - B(t, c[1], 0.25, 'out') }; }
function mounds(ctx, t, o = {}) { for (const [k, x] of Object.entries(BX)) burrow(ctx, x, GR + 4 - (o.kick ? Math.abs(o.kick) : 0), { ...bState(k, t), eyes: o.eyes && o.eyes[k], seed: (x % 13) + 2 }); }
function roomSoil(ctx, t) { for (const k of ['B2', 'B3', 'B4']) { const c = bState(k, t).collapse; if (c > 0.01) { const [rx, ry] = ROOMS[k]; ctx.save(); ctx.globalAlpha = c; seg(ctx, rx, 934, rx, ry - 30, 30, SOIL, 3); shape(ctx, ell(rx, ry, 52, 42, 28), SOIL, { lw: 5, seed: 84, dot: SOILD, pitch: 8, rad: 0.25, da: 0.6 }); ctx.restore(); } } }
const room = (k, dx) => [ROOMS[k][0] + dx, ROOMS[k][1] + 38];
function lakeBase(ctx, t, pre, celestial) { lakeSky(ctx, pre); if (celestial) celestial(ctx); lakeLand(ctx, pre); roomSoil(ctx, t); }
function sparkles(ctx, t, a = 1) { const r = K.rng(31); for (let i = 0; i < 9; i++) { const x = 1500 + r() * 400, y = 930 + r() * 170, ph = r() * 6, k = Math.max(0, Math.sin(t * 5 + ph)); if (k > 0.2) { ctx.save(); ctx.globalAlpha = a * k; star(ctx, x, y, 8 + 10 * k, C.white, t); ctx.restore(); } } }
const rideKit = (M, t) => ({ pal: 1, s: 0.32, seed: 9, x: M.x - (M.dir ?? 1) * 6 * M.s / 0.5, y: M.y - 66 * M.s / 0.5, dir: M.dir, ears: -0.4, eyes: 'wide', mouth: 'o', sq: M.sq });

// ================= S3 =================
const S3K = (t) => kfn(t, [[22.96, -40], [26.4, 300]]), S3C = (t) => kfn(t, [[22.96, -260], [26.7, 80]]), S3S = (t) => kfn(t, [[22.96, -440], [25.53, -170]], 'lin');
function herd3(t) {
  const k = { ...KINGB, y: 902, dir: 1, ...walk(S3K, t), tongue: true, lid: 0.6, drop: 12, flapEar: 0.3 }, c = { ...COWB, y: 888, dir: 1, ...walk(S3C, t), tongue: true, lid: 0.6, drop: 14 }, s = { ...SCOUTB, y: 912, dir: 1, ...walk(S3S, t), tongue: true, lid: 0.5, drop: 10, flapEar: 0.6 };
  for (const P of [k, c, s]) P.amp *= 0.6; k.hbob = elWalkHb(S3K, t, 4); k.crownLag = elWalkHb(S3K, t - 0.07, 4) - k.hbob; k.gaze = [1, 0.2]; c.gaze = [1, 0.25];
  s.sq = 1 - 0.1 * pulse(t, 24.4, 0.3); s.tip = 0.08 * pulse(t, 24.4, 0.3); s.gaze = [1, 0.3];
  if (t >= 25.3 && t < 25.53) s.sq = anticipate(t, 25.3, 0.23, 0.06);
  if (t >= 25.52) { s.earUp = settleTo(t, 25.52, 0, 1, 0.3); s.amp = 0; s.drop = blend(t, 25.7, 26.0, 10, -12); s.tongue = t < 25.9; s.lid = t < 25.9 ? 0.5 : 0; s.eyes = t > 25.6 ? 'wide' : 'open'; s.gaze = [1, -0.2]; s.trunk = t > 26.0 ? 0.4 + 0.08 * Math.sin(t * 22) : 0; }
  if (t >= 27.9) { s.trunk = 1; s.y -= Math.abs(14 * Math.sin(Math.PI * (t - 27.94) / 0.35)) * (t < 29.0 ? 1 : 0); s.tail = -0.6; s.sq = t < 29 ? 1.04 : 1; for (const P of [k, c]) { P.tongue = false; P.lid = 0; P.drop = 0; P.gaze = [1, -0.1]; } }
  return { k, c, s };
}
function drawS3(ctx, t) {
  lakeBase(ctx, t, 'day', (c) => { sun(c, 1700, 200, t); cloudFlat(c, 520 + t * 6, 220, 0.9); });
  if (t >= 26.9 && t < 29.0) sparkles(ctx, t);
  if (t >= 27.26 && t < 29.0) for (const r0 of [27.5, 28.3]) ringOut(ctx, 1680, 1010, r0, t, 180, 1.2);
  // rooms: sleeper, nibbler, mother; the kit slides down to her
  hare(ctx, { pal: 1, s: 0.3, seed: 52, x: room('B1', 18)[0], y: room('B1', 0)[1], dir: -1, lid: 1, sq: breathe(t, 2, 0.04), ears: 0.3 }); if (t > 34.3) zzz(ctx, 860, 990, t);
  const m2 = room('B2', -16); hare(ctx, { pal: 1, s: 0.3, seed: 53, x: m2[0], y: m2[1], dir: 1, ears: 0.6, gaze: t > 34.55 ? [0.3, -1] : [1, 0], lid: t > 35.0 ? 0.3 : 0, mouth: t > 35 ? 'smile' : 'closed', tip: t > 35.0 ? 0.08 : 0 });
  hare(ctx, { pal: 1, s: 0.3, seed: 55, x: room('B4', 4)[0], y: room('B4', 0)[1], dir: -1, ears: 0.8, talk: t > 34.3 ? 0.3 + 0.3 * Math.abs(Math.sin(t * 9)) : 0 }); shape(ctx, ell(1150, 1063, 8, 5, 10), GREEN2, { lw: 2.5, seed: 3 });
  if (t >= 34.5 && t < 34.9) hare(ctx, { pal: 1, s: 0.24, seed: 9, x: 950, y: blend(t, 34.5, 34.9, 960, 1078, 'in'), dir: 1, ears: 1, sq: 1.1 });
  if (t >= 34.9) hare(ctx, { pal: 1, s: 0.24, seed: 9, x: 972, y: 1078, dir: -1, ears: 0.9, sq: landSquash(t, 34.9, 0.25, 10), tip: t > 35.2 ? 0.12 : 0, lid: t > 35.3 ? 0.4 : 0, mouth: 'smile' });
  const { k, c, s } = herd3(t); for (const P of [c, k, s]) { shadowUnder(ctx, P, 0, 0.25); elephantK(ctx, P); }
  if (t >= 27.26 && t < 28.99) { const F = { ...SCOUTB, x: kfn(t, [[27.86, 990], [28.2, 1095]], 'out'), y: 912, dir: 1, ph: 0, amp: 0, eyes: 'wide', earUp: 0.7, flapEar: 0.6, trunk: blend(t, 27.94, 28.15, 0.2, 1), gaze: [1, 0.2] };
    F.y -= Math.abs(14 * Math.sin(Math.PI * (t - 27.94) / 0.35)) * (t > 27.94 ? 1 : 0); F.sq = t > 27.94 ? 1.04 : 1; elephantK(ctx, F); if (t >= 27.94) soundArcs(ctx, ...elTrunk(F), 1, t); }
  // hares popping out
  const A = { pal: 1, s: 0.5, seed: 51, x: 840, y: GR, dir: 1, ears: 1, earWig: 0.4 * (1 - B(t, 30.65, 0.2)) };
  A.gaze = lookAt(hHead(A), gazePlan(t, [[30.5, [700, 820]], [30.9, [1100, 820]], [31.5, [960, 860]], [32.2, [1100, 860]]])); hareUp(ctx, A, B(t, 30.42, 0.3, 'out'));
  const kh = hops(t, [950, GR], [[31.42, 0.3, 950, 862, 26], [34.3, 0.18, 950, GR + 4, 10]]), kit = { pal: 1, s: 0.38, seed: 9, x: kh.x, y: kh.y, sq: kh.sq, dir: 1, eyes: 'wide', ears: 1 - 0.7 * pulse(t, 31.15, 0.45) };
  if (t < 31.42) hareUp(ctx, kit, B(t, 31.06, 0.3, 'out')); else if (t >= 34.48) hareUp(ctx, kit, 1 - B(t, 34.48, 0.12));
  const hh = hops(t, [1060, GR], [[32.05, 0.3, 1102, GR, 22]]), hero = { pal: 0, s: 0.6, seed: 5, x: hh.x, y: hh.y, sq: hh.sq, dir: -1, lid: 0.3, mouth: 'smile', ears: 1 };
  if (t >= 32.4) hero.raise = 1.25 + 0.15 * Math.sin(t * 11);
  if (t >= 35.75) { hero.raise = 1.25; hero.earWig = -0.4 * B(t, 35.75, 0.08); hero.gaze = t > 35.84 ? [-1, 0] : [0.2, 0.3]; hero.lid = 0; hero.mouth = 'closed'; } else hero.gaze = [0.2, 0.3];
  if (t < 32.05) hareUp(ctx, hero, B(t, 31.74, 0.3, 'out'));
  mounds(ctx, t, { eyes: t >= 29.0 && t < 30.42 ? { B1: [Math.sin(t * 2), blink(t, 3) > 0.5], B4: [-0.6, blink(t, 6) > 0.5] } : null });
  if (t >= 31.42 && t < 34.48) hare(ctx, kit); if (t >= 32.05) hare(ctx, hero);
  shape(ctx, ell(1080, 858 - Math.abs(K.spring(t, 35.6, 14, 6, 6)), 7, 5, 10), STONE, { lw: 3, seed: 5 });
  // two more hares hop in from the lake side, out of step
  if (t >= 29.0) for (const [i, x0, x1, t0] of [[0, 1520, 1215, 32.4], [1, 1600, 1290, 32.6]]) { const h = hops(t, [x0, GR], [[t0, 0.32, (x0 + x1) / 2, GR, 34], [t0 + 0.35, 0.32, x1, GR, 30]]); hare(ctx, { pal: 1, s: [0.46, 0.52][i], seed: 56 + i, x: h.x, y: h.y, sq: h.sq, dir: -1, ears: 0.9 }); }
}
const S3 = { a: 22.96, b: 36.0, ww: LW, cam: [[22.96, { x: 420, y: 700, zoom: 1.2 }], [27.0, { x: 420, y: 700, zoom: 1.2 }], [27.26, { x: 1583, y: 700, zoom: 1.2 }], [28.98, { x: 1583, y: 700, zoom: 1.2 }], [28.99, { x: 1000, y: 700, zoom: 1.5 }], [33.2, { x: 1000, y: 700, zoom: 1.5 }], [34.3, { x: 1000, y: 820, zoom: 1.5 }]], draw: drawS3,
  over(ctx, t, cam, S) {
    if (t >= 27.26 && t < 28.9) { const [px, py] = toPanel(1730, 880, cam); ctx.save(); ctx.globalAlpha = K.clamp((28.9 - t) / 0.2); S.label(ctx, 'THE LAKE', px, py - 340, B(t, 27.26, 0.3), { align: 'center', size: 48, fill: C.yellow }); S.arrow(ctx, [px, py - 300], [px + 10, py - 30], B(t, 27.4, 0.35, 'out'), { width: 18, bend: 0.12 }); ctx.restore(); }
    if (t >= 33.8 && t < 35.5) { ctx.save(); ctx.globalAlpha = K.clamp((35.5 - t) / 0.3); const [px, py] = toPanel(ROOMS.B2[0], ROOMS.B2[1], cam); S.label(ctx, 'HOME', px + 200, py + 120, B(t, 33.8, 0.35), { align: 'center', size: 44, fill: C.yellow }); S.arrow(ctx, [px + 160, py + 100], [px + 60, py + 30], B(t, 34.0, 0.35, 'out'), { width: 16, bend: -0.2 }); ctx.restore(); }
  } };

// ================= S4: the charge =================
// v3: herd 250 further right while it hurries in (36.0-38.2), blended out inside the whip to the lake (38.2-38.6)
const S4OFF = (t) => 250 * (1 - B(t, 38.2, 0.4, 'inOut'));
const S4K = (t) => kfn(t, [[36.0, -200], [38.9, 420], [40.8, 700], [42.6, 830], [46.5, 830], [49.6, 1330]], 'lin') + S4OFF(t);
const S4C = (t) => kfn(t, [[36.3, -470], [39.2, 200], [42.0, 420], [44.0, 560], [45.6, 760], [48.2, 980], [50.3, 1240]], 'lin') + S4OFF(t);
const S4S = (t) => kfn(t, [[36.6, -640], [39.5, 60], [44.5, 560], [48.6, 1106], [50.3, 1160]], 'lin') + S4OFF(t);
const FALLS4 = [...footfalls(S4K, 36, 42.6, 34), ...footfalls(S4C, 36.3, 50.3, 34), ...footfalls(S4S, 36.6, 50.3, 34)].sort((a, b) => a.t - b.t);
const STEPS3 = [44.02, 44.7, 45.5];
const CLOSE4 = (t) => t >= 43.08 && t < 46.7;   // the close shot on B2: herd out of frame, only the big foot
// sole height of the big foreground foot: three counted drops (dip before each), hover, slam on 46.45
const FOOT_LV = [575, 705, 815];
function footY(t) {
  const cb = countedBeats(t, STEPS3, { ant: 0.1 }); let y;
  if (cb.n === 0) y = blend(t, 43.3, 43.9, 380, 470);
  else y = K.lerp(cb.n === 1 ? 470 : FOOT_LV[cb.n - 2], FOOT_LV[cb.n - 1], K.ease.out(K.clamp(cb.since / 0.22)));
  y -= 16 * cb.dip;
  if (t >= 45.72 && t < 46.3) y += 3 * Math.sin(t * 47);
  if (t >= 46.3 && t < 46.45) y -= 34 * K.ease.out(B(t, 46.3, 0.15));
  if (t >= 46.45) y = K.lerp(FOOT_LV[2] - 34, GR + 4, K.ease.in(K.clamp((t - 46.45) / 0.06)));
  return y;
}
// bigFoot(ctx, x, soleY, w): a foreground elephant leg column with toenails (the drawing from the elder's thought cloud), entering from above
function bigFoot(ctx, x, sY, w = 150) {
  const top = sY - 900;
  shape(ctx, [[x - w * 0.44, top], [x + w * 0.44, top], [x + w * 0.5, sY], [x - w * 0.5, sY]], ELEPH, { lw: 9, seed: 3, dot: ELEPHD, pitch: 10, rad: 0.16, da: 0.5 });
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.lineCap = 'round';
  for (const [dy, dx] of [[-150, -12], [-120, 14], [-260, -4]]) { ctx.beginPath(); ctx.moveTo(x + dx - w * 0.22, sY + dy); ctx.quadraticCurveTo(x + dx, sY + dy + 8, x + dx + w * 0.22, sY + dy); ctx.stroke(); }
  ctx.restore();
  shape(ctx, ell(x, sY, w * 0.52, w * 0.12, 20), '#e9e2d0', { lw: 6, seed: 4 });
  for (const dx of [-0.3, 0, 0.3]) shape(ctx, [...ell(x + dx * w, sY - 4, w * 0.11, w * 0.1, 12).slice(6, 13), [x + dx * w + w * 0.11, sY - 2]], C.white, { lw: 4, seed: 6 });
}
function herd4(t) {
  const k = { ...KINGB, y: 902, dir: 1, ...walk(S4K, t), tongue: true, gaze: [1, -0.05], earUp: 0.35, flapEar: 0.2 }, c = { ...COWB, y: 886, dir: 1, ...walk(S4C, t), tongue: true, gaze: [1, -0.05], earUp: 0.35 }, s = { ...SCOUTB, y: 878, dir: 1, ...walk(S4S, t), tongue: true, gaze: [1, 0], earUp: 0.4 };
  k.hbob = elWalkHb(S4K, t, 6); k.crownLag = elWalkHb(S4K, t - 0.07, 6) - k.hbob;
  if (t >= 42.6 && t < 46.7) { k.amp = 0; k.sq = impactSquash(t, 46.45, 0.9); k.drop = -12 * B(t, 42.6, 0.3); }
  if (t >= 46.7 && t < 47.2) { k.drop = blend(t, 46.7, 47.1, -12, 0); k.earUp = 0.35 + 0.2 * pulse(t, 46.7, 0.4); }
  if (t >= 49.6) { const d = drinkCyc(t, 49.6); Object.assign(k, { trunk: d.trunk, hbob: d.hbob, eyes: 'shut', drop: 22, tip: 0.06, tongue: false, tail: 0.35 * Math.sin(t * 5), reach: 0.2 }); }
  for (const [P, t0] of [[c, 50.3], [s, 50.3]]) if (t >= t0) { const d = drinkCyc(t, t0 + 0.3 * (P === s)); Object.assign(P, { trunk: d.trunk, hbob: d.hbob, eyes: 'shut', drop: 24, tip: 0.07, tongue: false, tail: 0.4 * Math.sin(t * 6 + P.s * 9), reach: 0.3 }); }
  return { k, c, s };
}
function scatter(t, t0, x0) { return hops(t, [x0, GR], [[t0, 0.32, x0 - 170, GR, 50], [t0 + 0.36, 0.32, x0 - 340, GR, 50], [t0 + 0.72, 0.32, x0 - 510, GR, 50], [t0 + 1.08, 0.32, x0 - 680, GR, 50]]); }
const scared = (P) => Object.assign(P, { eyes: 'wide', mouth: 'o', ears: -0.8, dir: -1 });
function drawS4(ctx, t) {
  lakeBase(ctx, t, 'day', (c) => { sun(c, 1700, 200, t); cloudFlat(c, 520 + t * 6, 220, 0.9); });
  if (t >= 37.9 && t < 38.95) sparkles(ctx, t);
  const kk = kick(t, FALLS4, 3, 11, 9), bounce = (t0) => 30 * pulse(t, t0, 0.35);
  // rooms: A + sleeper in room 1, mother + kit in room 2, B + nibbler in room 4
  if (t >= 39.3 && t < 49.5) hare(ctx, { pal: 1, s: 0.3, seed: 51, x: room('B1', -22)[0], y: room('B1', 0)[1] - bounce(42.7), dir: 1, ears: t > 42.7 ? -0.6 : 0.6, eyes: 'wide', gaze: [0.2, -1] });
  hare(ctx, { pal: 1, s: 0.3, seed: 52, x: room('B1', 22)[0], y: room('B1', 0)[1] - bounce(42.7) - 18 * pulse(t, 40.9, 0.3), dir: -1, lid: t < 40.9 ? 1 : 0, eyes: t > 40.9 ? 'wide' : 'open', ears: t > 40.9 ? -0.5 : 0.3, sq: breathe(t, 2, 0.04) });
  if (t < 40.9) zzz(ctx, 860, 990, t);
  if (t >= 40.9 && t < 42.3) for (let i = 0; i < 4; i++) { const u = K.clamp((t - 40.9 - i * 0.1) / 0.6); shape(ctx, ell(820 + i * 14, 975 + u * 70, 4, 4, 8), SOIL, { lw: 2, seed: i }); }
  if (t < 46.4) { const mx = blend(t, 45.9, 46.4, 934, 860), kx = blend(t, 45.95, 46.4, 968, 885), my = blend(t, 45.9, 46.4, 1078, 1048), up = t > 43.5 ? [0.15, -1] : [1, 0];
    const M = { pal: 1, s: 0.3, seed: 53, x: mx, y: my - bounce(42.7), dir: t < 45.85 ? 1 : -1, ears: t > 42.7 ? -0.5 : 0.6, gaze: up, wet: t > 44.7, eyes: t > 42.7 ? 'wide' : 'open', tip: t > 45.6 && t < 45.9 ? 0.15 : 0, raise: t > 45.6 && t < 45.9 ? 0.8 : 0 };
    const Kt = { pal: 1, s: 0.24, seed: 9, x: kx + (t > 45.5 && t < 45.95 ? tremble(t, 1.8, 12) : 0), y: my - bounce(42.75), dir: -1, ears: t > 42.7 ? -0.7 : 0.9, gaze: up, wet: t > 44.7, eyes: 'wide', mouth: t > 44 ? 'o' : 'closed', sq: t > 45.5 && t < 45.95 ? 0.92 : 1 }; hare(ctx, M); hare(ctx, Kt); }
  if (t >= 39.5 && t < 48.35) { hare(ctx, { pal: 1, s: 0.3, seed: 57, x: room('B4', -20)[0], y: room('B4', 0)[1] - bounce(42.7), dir: 1, ears: t > 42.7 ? -0.6 : 0.6, eyes: 'wide', gaze: [0, -1] }); }
  if (t < 48.35) hare(ctx, { pal: 1, s: 0.3, seed: 55, x: room('B4', 18)[0], y: room('B4', 0)[1] - bounce(42.8), dir: -1, ears: t > 42.7 ? -0.6 : 0.8, eyes: t > 37 ? 'wide' : 'open', gaze: [0, -1] });
  for (const s3 of STEPS3) for (let i = 0; i < 5; i++) { const u = K.clamp((t - s3 - i * 0.05) / 0.5); if (u > 0 && u < 1) shape(ctx, ell(915 + i * 17, 1004 + u * 60, 4.5, 4.5, 8), SOIL, { lw: 2, seed: i }); }
  // elephants
  const { k, c, s } = herd4(t); if (!CLOSE4(t)) for (const P of [s, c, k]) { shadowUnder(ctx, P, 0, 0.25); elephantK(ctx, P); }
  if (!CLOSE4(t)) for (const f of FALLS4) dustBurst(ctx, f.x + 80, GR + 2, t - f.t, 4, 6, 12, 28, 0.45, Math.round(f.t * 10));
  dustBurst(ctx, 930, GR - 4, t - 46.45, 10, 10, 30, 130, 0.7, 5); dustBurst(ctx, 1060, GR - 4, t - 48.2, 8, 8, 22, 90, 0.6, 7); dustBurst(ctx, 1170, GR - 4, t - 48.6, 8, 8, 20, 80, 0.6, 9);
  // hares outside: dives, the hero's peek and escape, mother and kit at the next mound, the scatter
  const A = { pal: 1, s: 0.5, seed: 51, x: 840, y: GR - Math.abs(kk), dir: -1, ears: 1, eyes: 'wide', gaze: [-1, -0.2] }; if (t < 39.3) hareUp(ctx, A, 1 - B(t, 39.0, 0.25));
  if (t >= 49.5) { hareUp(ctx, scared({ ...A, ...scatter(t, 49.68, 840) }), B(t, 49.5, 0.15)); }
  const hh = hops(t, [1102, GR], [[39.5, 0.22, 1060, GR, 20]]), hero = { pal: 0, s: 0.6, seed: 5, x: hh.x, y: hh.y - (t < 39.5 ? Math.abs(kk) : 0), sq: hh.sq, dir: -1, ears: 1, eyes: 'wide', gaze: [-1, -0.2] };
  if (t < 39.75) hare(ctx, hero); else if (t < 48.05) { hero.gaze = [-0.4, -1]; hareUp(ctx, hero, t < 40.1 ? 1 - B(t, 39.75, 0.15) : 0.42 * B(t, 40.1, 0.3)); }
  const MK = { pal: 1, s: 0.5, seed: 53, x: 886, y: GR, dir: 1, ears: -0.6, wet: true, mouth: 'frown', gaze: [1, 0.15] };
  if (t >= 46.7 && t < 49.32) { hareUp(ctx, MK, B(t, 46.7, 0.3, 'out')); hareUp(ctx, { pal: 1, s: 0.36, seed: 9, x: 866, y: GR, dir: 1, ears: -0.7, wet: true, gaze: [1, 0.1] }, B(t, 46.85, 0.3, 'out')); }
  if (CLOSE4(t) && t >= 43.4) { const n = countedBeats(t, STEPS3).n, fy = footY(t); halftoneShadow(ctx, 945, GR + 2, K.lerp(40, 150, K.clamp((fy - 470) / 400)) + 6 * n, 0.25 + 0.1 * n); }
  mounds(ctx, t, { kick: t < 46 ? kk * 0.6 : 0 });
  if (CLOSE4(t) && t >= 43.4) bigFoot(ctx, 940, footY(t), 150);
  if (t >= 48.05) { const h = t < 49.2 ? hops(t, [1060, GR], [[48.12, 0.28, 1000, GR, 40]]) : scatter(t, 49.2, 1000); const P = scared({ ...hero, ...h, gaze: [-1, 0] }); if (t < 48.4) P.sq = 1.15; hare(ctx, P); }
  if (t >= 49.32) { const M = scared({ ...MK, ...scatter(t, 49.32, 886) }); hare(ctx, M); hare(ctx, rideKit(M, t)); }
  for (const [i, x0, t0] of [[0, 1150, 49.44], [1, 1190, 49.56]]) if (t >= 48.35) { const pre = hops(t, [1170, GR], [[48.35, 0.2, x0, GR, 26]]), h = t < t0 ? pre : scatter(t, t0, x0); hare(ctx, scared({ pal: 1, s: [0.46, 0.5][i], seed: 57 - 2 * i, x: h.x, y: h.y, sq: h.sq })); }
  if (t < 39.4) for (const [i, x0, x1, tt] of [[0, 1215, 1170, 39.0], [1, 1290, 1330, 39.2]]) { const h = hops(t, [x0, GR], [[tt, 0.2, x1, GR, 20]]); const P = { pal: 1, s: [0.46, 0.52][i], seed: 56 + i, x: h.x, y: h.y - Math.abs(kk), dir: x1 < x0 ? -1 : 1, ears: 1, eyes: 'wide', gaze: [-1, -0.2] }; if (t < tt + 0.2) hare(ctx, P); else hareUp(ctx, P, 1 - B(t, tt + 0.2, 0.15)); }
}
const S4 = { a: 36.0, b: 51.0, ww: LW, cam: [[36.0, { x: 435, y: 700, zoom: 1.15 }], [36.9, { x: 435, y: 700, zoom: 1.15 }], [37.95, { x: 640, y: 700, zoom: 1.15 }], [38.38, { x: 1450, y: 700, zoom: 1.15 }], [38.89, { x: 1450, y: 700, zoom: 1.15 }], [38.9, { x: 860, y: 860, zoom: 1.7 }], [43.07, { x: 900, y: 860, zoom: 1.7 }], [43.08, { x: 950, y: 849, zoom: 2.0 }], [46.69, { x: 950, y: 849, zoom: 2.0 }], [46.7, { x: 960, y: 800, zoom: 1.6 }], [47.6, { x: 960, y: 800, zoom: 1.6 }], [48.3, { x: 1000, y: 760, zoom: 1.5 }], [48.9, { x: 1100, y: 700, zoom: 1.2 }]], draw: drawS4,
  over(ctx, t, cam, S) {
    if (t >= 40.82 && t < 42.4) { ctx.save(); ctx.globalAlpha = K.clamp((42.4 - t) / 0.3); const [px, py] = toPanel(1005, 1150, cam), [ax, ay] = toPanel(1005, 925, cam); S.label(ctx, 'BURROWS!', px, py, B(t, 40.82, 0.35), { align: 'center', size: 46, fill: C.yellow }); S.arrow(ctx, [px, py - 40], [ax, ay], B(t, 41.0, 0.35, 'out'), { width: 16, bend: 0.1 }); ctx.restore(); }
    if (t >= 46.45 && t < 47.4) { const [px, py] = toPanel(1085, 872, cam); sfx(ctx, 'CRUNCH!', px, py, 90, B(t, 46.45, 0.12), { rot: -0.08, fill: C.yellow }); }
    if (t >= 47.22 && t < 51.0) { ctx.save(); ctx.globalAlpha = K.clamp((51.0 - t) / 0.3); const v = t < 47.6 ? 5 : t < 48.2 ? 4 : t < 48.6 ? 3 : 2; S.label(ctx, 'SAFE HOMES', 180, 120, B(t, 47.22, 0.3), { align: 'center', size: 40, fill: C.white }); S.counter(ctx, v, 180, 280, B(t, 47.3, 0.3), { size: 100, seed: 77 + v }); ctx.restore(); }
  } };

// ================= S6: the rock at dusk =================
const K67 = (t) => (t < 81.08 ? kfn(t, [[77.0, -360], [81.08, 200]]) : kfn(t, [[81.08, 200], [94.98, 380]], 'lin'));
const MOONR = (t) => [680, kfn(t, [[84.1, 770], [84.85, 470]], 'out'), 110];
function king67(t) {
  const w = walk(K67, t), P = { ...KINGB, y: 902, dir: 1, ...w, amp: w.amp * 0.6, eyes: 'smug', brow: -0.6, flapEar: 0.35 }; P.hbob = elWalkHb(K67, t, 4); P.crownLag = elWalkHb(K67, t - 0.07, 4) - P.hbob;
  const hd = hHead(heroP67(t)), e = elEye(P), MO = MOONR(t);
  if (t >= 78.9 && t < 81.08) { P.earOff = 0.3 * B(t, 78.9, 0.2); P.hbob += -8 * B(t, 79.1, 0.3); if (t > 79.3) { P.eyes = 'open'; P.gaze = lookAt(e, hd); } }
  if (t >= 81.08) { P.eyes = 'smug'; P.gaze = lookAt(e, hd); P.trunk = 0.14 + 0.1 * Math.sin((t - 81.08) * 2.4); P.earOff = 0.3 * pulse(t, 81.7, 0.35); P.hbob += 4 * pulse(t, 82.0, 0.3); }
  if (t >= 85.48) { P.eyes = t < 86.5 ? 'wide' : 'open'; P.brow = blend(t, 85.48, 85.8, -0.6, 0.6); P.earUp = -0.35 * B(t, 85.55, 0.3); P.hbob -= 10 * B(t, 85.48, 0.2); P.crownLag = 12 * (B(t, 85.48, 0.2) - B(t, 85.55, 0.2)) - 6 * pulse(t, 85.7, 0.3); P.gaze = lookAt(e, gazePlan(t, [[85.48, hd], [85.9, [MO[0], MO[1]]]], 0.4)); }
  if (t >= 86.66 && t < 88.62) P.gaze = [1, 0.1];
  if (t >= 88.62 && t < 90.12) P.gaze = lookAt(e, gazePlan(t, [[88.62, [MO[0], MO[1]]], [89.5, [1300, 900]]], 0.5));
  if (t >= 90.12 && t < 91.42) { P.sq = 1 - 0.03 * B(t, 90.12, 0.15); P.trunk = 0.45 * B(t, 90.12, 0.2); P.gaze = lookAt(e, hd); }
  if (t >= 91.42 && t < 94.98) { P.trunk = 0.2; P.gaze = lookAt(e, gazePlan(t, [[91.42, [950, 880]], [93.3, [P.x + 100, 900]], [94.2, [950, 880]]], 0.25)); }
  if (t >= 94.98) { P.amp = 0; P.lift = t < 96.6 ? 70 * B(t, 94.98, 0.12) : 70 * (1 - B(t, 96.6, 0.9)); P.drop = -10; P.eyes = 'wide'; P.earUp = 0.5; P.gaze = [0.6, 0.2]; P.tip = bumpChain(t, 94.98, 0).tip; P.brow = 0; }
  if (t >= 96.52 && t < 97.72) { P.eyes = 'open'; P.gaze = [0.3, 1]; P.drop = 6; P.earUp = 0.1; }
  if (t >= 97.72 && t < 98.84) { P.eyes = 'open'; P.gaze = lookAt(e, gazePlan(t, [[97.72, [200, 300]], [98.0, [800, 280]], [98.3, [520, 120]]], 0.07)); }
  if (t >= 98.84) { P.eyes = 'open'; P.brow = -0.6; P.drop = blend(t, 98.84, 99.4, 6, 10); P.trunk = blend(t, 98.84, 99.4, 0, 1); P.earUp = 0.15; P.gaze = lookAt(e, hd); }
  if (t >= 100.6 && t < 102.14) { P.talk = talk(t, [[100.6, 102.14]], 0.7) * 0.7; P.hbob = -9 * pulse(t, 100.81, 0.3) + 8 * pulse(t, 101.64, 0.3); P.earOff = 0.2 * pulse(t, 100.81, 0.5); P.gaze = t >= 101.64 && t < 101.95 ? [0.15, -1] : lookAt(e, hd); P.trunk = 1 + 0.06 * Math.sin(t * 5); P.reach = 0.15; }
  if (t >= 102.14) { P.x += 14 * B(t, 102.14, 0.3); P.gaze = lookAt(e, hd); }
  return P;
}
function followers67(t, k) { const cs = []; const base = (t < 94.98 ? k.x : K67(94.98)); for (const [i, B0, gap, y] of [[1, COWB, 240, 888], [2, SCOUTB, 420, 878]]) { const xf = (tt) => (tt < 94.98 ? K67(tt) : K67(94.98)) - gap + (tt >= 94.98 ? bumpChain(tt, 94.98, i, 70).dx : 0), w = walk(xf, t);
    const P = { ...B0, y, dir: 1, ...w, amp: w.amp * 0.6, gaze: [1, -0.2] }; if (t >= 94.98) { P.tip = bumpChain(t, 94.98, i).tip; P.eyes = t > 94.98 + 0.18 * i ? 'wide' : 'open'; } if (t >= 79.6) P.gaze = lookAt(elEye(P), [680, 520]); if (t >= 86.8 && t < 88.6) P.gaze = i === 1 ? (t < 87.6 ? [1, 0.1] : [-1, 0]) : (t < 87.8 ? [1, 0.1] : [1, -0.3]);
    cs.push(P); } void base; return cs; }
function heroP67(t) {
  const h = hops(t, [560, GR], [[73.78, 0.42, ROCK.l1[0], ROCK.l1[1], 40], [74.56, 0.38, ROCK.l2[0], ROCK.l2[1], 40], [75.02, 0.6, ROCK.top[0], ROCK.top[1], 60]]);
  const P = { pal: 0, s: 0.6, seed: 5, x: h.x, y: h.y, sq: h.sq, dir: t < 75.9 ? 1 : turnTo(t, 75.9, 1, -1), ears: 1 };
  if (t < 73.78) { P.gaze = [0.3, -1]; P.sq = 1 - 0.06 * pulse(t, 72.95, 0.35); }
  if (t >= 74.94 && t < 75.02) P.tip = 0.12; if (t >= 74.98 && t < 75.1) P.tip = -0.06;
  if (t >= 75.62) { P.sq = landSquash(t, 75.62, 0.15, 3); P.gaze = [-1, 0.1]; }
  if (t >= 76.42 && t < 76.92) { P.x += t < 76.7 ? tremble(t, 2) : 0; P.sq = t < 76.7 ? 0.92 : 1.08; P.ears = t < 76.7 ? 0.4 : 1.2; P.brow = t < 76.7 ? -0.5 : 0.8; P.eyes = t < 76.7 ? 'wide' : 'open'; }
  if (t >= 76.92 && t < 77.62) { P.raise = 0.95; P.nod = -0.25; P.talk = 1; P.eyes = 'shut'; P.sq = 1.08; P.ears = 1.2; }
  if (t >= 77.62) { P.brow = 0.4; P.sq = 1.04; P.gaze = lookAt(hHead(P), [K67(t) + 160, 720]); }
  return P;
}
function heroS7(t) {
  const P = heroP67(t), k = king67(t); P.gaze = lookAt(hHead(P), elEye(k)); P.earWig = t < 83.4 ? 0.06 * Math.sin(t * 30) : 0; P.brow = 0.4;
  if (t >= 82.7 && t < 84.1) P.sq = settleTo(t, 82.7, 1, 1.08, 0.3) * anticipate(t, 83.24, 0.18, 0.07);
  if (t >= 83.42 && t < 84.1) { P.raise = 0.15 + 0.2 * Math.abs(Math.sin((t - 83.42) * 9)); P.lid = 0.3; P.nod = -0.08; }
  if (t >= 84.8 && t < 86.6) { P.raise = 1.8; P.sq = settleTo(t, 84.8, 1, 1.1, 0.3); P.ears = 1.2; P.gaze = [-0.3, -0.5]; }
  if (t >= 86.66 && t < 88.5) { P.dir = turnTo(t, 86.66, -1, 1, 0.25); P.raise = 0.3 + 0.1 * Math.sin(t * 3); P.gaze = [1, 0.2]; }
  if (t >= 88.5 && t < 88.85) P.dir = turnTo(t, 88.5, 1, -1, 0.25);
  if (t >= 88.62 && t < 90.12) P.gaze = [0.2, 0.6];
  if (t >= 90.12 && t < 91.42) { P.y -= 10 * pulse(t, 90.12, 0.2); P.sq = 1 - 0.1 * pulse(t, 90.28, 0.15); P.brow = 1; P.mouth = 'frown'; }
  if (t >= 91.42 && t < 94.98) { P.dir = turnTo(t, 91.42, -1, 1, 0.25); P.raise = -0.5; P.gaze = lookAt(hHead(P), [950, 880]); P.brow = 0.8; }
  if (t >= 94.98) { P.dir = t < 95.3 ? turnTo(t, 94.98, 1, -1, 0.25) : -1; P.brow = 0.6; P.raise = 0; }
  if (t >= 100.6 && t < 101.6) { P.mouth = 'smile'; P.lid = 0.25; P.brow = 0; }
  if (t >= 102.14) { P.raise = 0.6 + 0.35 * pulse(t, 102.14, 0.3); P.dir = turnTo(t, 102.2, -1, 1, 0.2); }
  P.talk = talk(t, [[83.4, 85.48], [86.47, 89.32], [89.79, 94.98]], 0.9);
  return P;
}
function drawDusk(ctx, t) {
  const MO = MOONR(t);
  lakeBase(ctx, t, 'dusk', (c) => { if (t >= 84.0) { halo(c, MO[0], MO[1], MO[2], 330, 0.8 * Math.sin(t * 2), B(t, 84.6, 0.5)); moon(c, MO[0], MO[1], MO[2]); } if (t >= 97.72) cloudFlat(c, kfn(t, [[97.72, 260], [98.4, 690]]), 470, 1.9); });
  if (t >= 86.6 && t < 88.8) sparkles(ctx, t);
  const k = king67(t), fs = followers67(t, k); for (const P of [...fs.slice().reverse(), k]) { shadowUnder(ctx, P, 30, 0.22); elephantK(ctx, P); }
  if (t >= 94.98 && t < 95.6) dustBurst(ctx, k.x + 130, GR, t - 94.98, 6, 6, 12, 40, 0.5, 2);
  if (t < 81.08) for (const [x, t0, i] of [[470, 79.5, 0], [840, 79.8, 1], [950, 80.1, 2]]) hareUp(ctx, { pal: 1, s: 0.46, seed: 60 + i, x, y: GR + 8, dir: -1, ears: 1, gaze: [-1, -0.4] }, 0.28 * B(t, t0, 0.2, 'out'));
  mounds(ctx, t);
  // the witnesses on the rubble of B2
  if (t >= 81.08) { const nud = pulse(t, 92.42, 0.3), sad = { ears: -0.7, wet: true, mouth: 'frown', lid: 0.35 }, ke = elEye(king67(t)), side = t >= 93.34 && t < 94.2;
    const W1 = { pal: 1, s: 0.48, seed: 61, x: 912, y: 884, dir: 1, ...sad, tip: 0.18 * nud, gaze: t > 92.3 && t < 92.75 ? [1, 0] : [-0.6, -0.4] };
    if (t >= 91.42 && t < 92.3) { W1.raise = 0.5 + 0.06 * Math.sin(t * 9); W1.gaze = [1, 0.25]; W1.lid = 0.2; W1.mouth = 'o'; }
    if (side) { W1.gaze = lookAt(hHead(W1), ke); W1.lid = 0.5; } hare(ctx, W1);
    const W2 = { pal: 1, s: 0.46, seed: 62, x: 990, y: 886, dir: -1, ...sad, gaze: [-0.7, -0.4] };
    if (t >= 92.28 && t < 92.55) Object.assign(W2, { ears: 0.9, wet: false, mouth: 'smile', lid: 0, gaze: [0.6, -0.8] });
    if (t >= 92.55) Object.assign(W2, { ears: -1.3, tip: 0.16 * B(t, 92.55, 0.2), sq: 1 - 0.07 * B(t, 92.55, 0.2), lid: 0.6, mouth: 'frown' });
    if (side) { W2.gaze = lookAt(hHead(W2), ke); W2.lid = 0.5; } hare(ctx, W2);
    if (t >= 91.42 && t < 93.4) teardrops(ctx, t, 91.5, 93.2, (tt) => { const h = hHead(W1); return [h[0] + 6, h[1] + 6]; }, { groundY: 884, rate: 2.2, vx: 8 });
    if (t >= 92.6 && t < 94.2) teardrops(ctx, t, 92.65, 94.0, (tt) => { const h = hHead(W2); return [h[0] - 8, h[1] + 8]; }, { groundY: 886, rate: 4, vx: -14 });
    const kit = { pal: 1, s: 0.36, seed: 9, x: 952, y: 874, dir: -1, ...sad, raise: t > 93.34 ? 1.1 : 0, gaze: [-0.8, -0.5] }; hare(ctx, kit);
    if (t > 93.34) { const hx = kit.x - 44 * kit.s / 0.5 * 0.9, hy = kit.y - (50 + 64 * 1.1) * kit.s; seg(ctx, hx, hy - 4, hx - 14, hy - 40, 4, WOOD, 2); seg(ctx, hx - 8, hy - 26, hx - 22, hy - 30, 3, WOOD, 2); } }
  const H = t < 81.08 ? heroP67(t) : heroS7(t); hare(ctx, H);
  if (t >= 82.0 && t < 82.7) { const tp = elTrunk(king67(82.0)), u = (t - 82.0) / 0.7; for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(tp[0] + 20 + u * (50 + i * 22), tp[1] - 6 - i * 12 - u * 20, 9 + u * 16, 7 + u * 11, 14), C.white, { lw: 3, seed: 40 + i }); ctx.restore(); } }
  if (t >= 76.92 && t < 78.9) soundArcs(ctx, hHead(H)[0] - 40, hHead(H)[1] + 10, -1, t);
  // pebbles shaken off the rock and stars around the risen moon
  if (t >= 74.6) shape(ctx, ell(640 - (t - 74.6) * 30, fallY(t, 74.6, 75.3, 724, 904), 6, 5, 8), STONE, { lw: 3, seed: 6 });
  for (const [px, py] of [[620, 812], [700, 609]]) shape(ctx, ell(px, py - 6 - Math.abs(K.spring(t, 76.65, 10, 7, 7)), 6, 4, 8), STONE, { lw: 3, seed: 7 });
  if (t >= 84.8 && t < 97.9) for (let i = 0; i < 6; i++) { const a = i * 1.05 + 0.4; star(ctx, MO[0] + Math.cos(a) * 170, MO[1] + Math.sin(a) * 150, 14 * K.ease.back(B(t, 84.8 + i * 0.08, 0.25)), C.white, t * 0.5); }
  if (t >= 90.12 && t < 91.5) { const kk = king67(t), e = elEye(kk); cloud(ctx, 330, 430, 120, 96, C.white, B(t, 90.12, 0.35) * (1 - B(t, 91.3, 0.2)), { tail: [e[0] - 330 - 40, e[1] - 430 - 60], inside: (c) => { moon(c, 0, 0, 52); c.save(); c.lineWidth = 7; c.strokeStyle = C.black; c.lineCap = 'round'; c.beginPath(); c.moveTo(-30, -24); c.lineTo(-6, -12); c.moveTo(30, -24); c.lineTo(6, -12); c.moveTo(-18, 24); c.quadraticCurveTo(0, 8, 18, 24); c.stroke(); c.restore(); } }); }
}
const S6 = { a: 72.3, b: 81.08, ww: LW, cam: [[72.3, { x: 640, y: 780, zoom: 1.7 }], [73.7, { x: 640, y: 780, zoom: 1.7 }], [76.2, { x: 680, y: 560, zoom: 1.7 }], [76.9, { x: 680, y: 560, zoom: 1.7 }], [77.9, { x: 520, y: 615, zoom: 1.0 }]], draw: drawDusk,
  over(ctx, t, cam, S) { if (t >= 76.95 && t < 78.2) { const [px, py] = toPanel(560, 470, cam); sfx(ctx, 'O KING!', px, py, 76, B(t, 76.95, 0.15), { rot: -0.1, fill: C.yellow }); } } };
const S7 = { a: 81.08, b: 102.3, ww: LW, cam: [[81.08, { x: 470, y: 600, zoom: 1.35 }], [84.2, { x: 470, y: 600, zoom: 1.35 }], [84.8, { x: 470, y: 540, zoom: 1.35 }], [86.66, { x: 470, y: 540, zoom: 1.35 }], [87.2, { x: 1620, y: 640, zoom: 1.35 }], [87.9, { x: 1620, y: 640, zoom: 1.35 }], [88.6, { x: 470, y: 560, zoom: 1.35 }], [91.2, { x: 470, y: 560, zoom: 1.35 }], [91.7, { x: 950, y: 790, zoom: 1.9 }], [94.4, { x: 950, y: 790, zoom: 1.9 }], [94.98, { x: 420, y: 640, zoom: 1.1 }], [98.84, { x: 420, y: 640, zoom: 1.1 }], [99.6, { x: 560, y: 620, zoom: 1.6 }]], draw: drawDusk,
  over(ctx, t, cam, S) {
    if (t >= 84.9 && t < 86.6) { ctx.save(); ctx.globalAlpha = K.clamp((86.6 - t) / 0.25); S.label(ctx, 'MESSENGER OF THE MOON', 500, 110, B(t, 84.9, 0.4), { align: 'center', size: 46, fill: C.yellow }); ctx.restore(); }
    if (t >= 95.1 && t < 96.4) { const [px, py] = toPanel(K67(94.98) - 120, 560, cam); sfx(ctx, 'BONK!', px, py, 76, B(t, 95.1, 0.15), { rot: 0.1, fill: C.yellow }); }
  } };
