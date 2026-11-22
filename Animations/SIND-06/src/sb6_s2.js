// ===== SIND-06 shots S5-S8 (26.48 - 60.46 s): the cove: ashore, the ring of cliffs, the search, the stream, the gems, the thought =====
// a figure standing in water: drawn only above the waterline wl (the sea hides the rest), a ring at the waterline
function sbWade(ctx, x, wl, t, draw, ring = true) { ctx.save(); ctx.beginPath(); ctx.rect(x - 300, wl - 600, 600, 600 + 4); ctx.clip(); draw(); ctx.restore(); if (ring) { ctx.save(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.ellipse(x, wl + 2, 34 + 4 * Math.sin(SB_T3(t) * 5), 7, 0, 0, 7); ctx.stroke(); ctx.restore(); } }
// the cove sea line near the shore (front layer) at x
const sbCoveWL = (x, t) => seaY(x, t, 3, SB_COVE_SEA);

// ---------- S5 (26.48 - 37.21): ashore, the head count, the ring of cliffs, the failed climb, NO WAY OUT ----------
const SB6_CAM5 = [[26.48, { x: 700, y: 690, zoom: 1.15 }], [30.4, { x: 860, y: 690, zoom: 1.15 }], [31.3, { x: 1000, y: 376, zoom: 0.72 }], [32.3, { x: 1000, y: 376, zoom: 0.72 }], [34.0, { x: 1230, y: 376, zoom: 0.72 }], [35.0, { x: 1150, y: 500, zoom: 0.85 }], [37.21, { x: 1160, y: 500, zoom: 0.85 }]];
// the sailors wading in: [index, start, from x, to x, gait]
const SB6_WADE = [[1, 28.6, 560, 1000, 'haul'], [0, 28.6, 520, 1050, 'hauled'], [3, 28.95, 540, 1150, 'limp'], [2, 29.2, 520, 1220, 'cough']];
const SB6_CPX = (t) => kfn(t, [[29.4, 560], [30.4, 940]], 'inOut');
function sbS5World(ctx, t, cam) {
  const tc = SB_T2(t);
  sbCoveBack(ctx, t, cam, { mid: (c) => { sbFlotsam(c, 'wood', 420 + 20 * Math.sin(t * 0.4), sbCoveWL(420, t), t, { s: 0.7, seed: 2 }); sbDebris(c, 'barrel', 280, sbCoveWL(280, t) + 6, 0.2 * Math.sin(t), 0.6); } });
  // camp props already in the cove: the wreckage pile (planks washed up)
  for (let i = 0; i < 5; i++) sbDebris(ctx, i % 2 ? 'plank' : 'barrel', 830 + i * 34, 900 - (i % 2) * 6, 0.2 * (i - 2), 0.7);
  // Sinbad: clings to a plank and kicks in (26.48 - 27.6), crawls up the wet sand (27.6 - 28.6), rolls onto his back (28.6 - 33.3), sits up, wrings the tail
  const SX = (u) => kfn(u, [[26.48, 540], [27.6, 730]], 'out');
  if (t < 27.6) { const x = SX(t), wl = sbCoveWL(x, t); sbWade(ctx, x, wl + 14, t, () => sbCling(ctx, { x: x + 40, y: wl - 2, rot: 0.04 * Math.sin(t * 2) }, wl, t, { lid: 0.4, head: 0.6, gaze: [1, 0.1], mouth: t > 27.0 && t < 27.3 ? 'o' : 'closed' }));
    if (t > 27.0 && t < 27.4) { const p = [x + 70, wl - 60]; sbDrops6(ctx, p[0], p[1], (t - 27.0) / 0.4); } }
  else { const CX = (u) => kfn(u, [[27.6, 760], [28.6, 880]], 'out'), x = CX(t), crawl = t < 28.6, P = sbLive(t, 11, { x, y: 900, dir: 1, gaze: [1, 0.2], mouth: 'o', wet: true }, [33.4]);
    if (crawl) { P.kneel = 1; P.lean = 0.9 + 0.08 * Math.sin(tc * 9); P.handLW = [x + 60 + 14 * Math.sin(tc * 9), 900]; P.handRW = [x + 70 - 14 * Math.sin(tc * 9), 900]; P.lid = 0.4; P.tailA = 1.1; }
    else if (t < 33.3) { const roll = K.clamp((t - 28.6) / 0.35); P.lie = roll; P.y = 900; P.lid = 0.7; P.sq *= breathe(tc * 2, 11, 0.04); P.mouth = 'open'; P.talk = 0.4 + 0.3 * Math.abs(Math.sin(tc * 4)); if (t > 32.3) { P.gaze = [0.2, -1]; P.lid = 0.2; P.mouth = 'o'; } }
    else if (t < 36.3) { const up = K.clamp((t - 33.3) / 0.35); P.sit = 1; P.seat = 'floor'; P.lie = 1 - up; P.gaze = [0.3, -1]; P.lid = sbLid(t, 11, [33.8]); P.mouth = 'o'; if (t > 33.5 && t < 34.4) { const w = osc(tc, 0.3); P.handL = [-30 + 6 * w, -190]; P.handR = [-20, -200 + 10 * w]; } }
    else { const st = sbF(t, [[36.3, 0], [36.6, 1], [37.21, 1]]); P.sit = 1 - st; P.seat = 'floor'; P.gaze = [1, -0.1]; P.mouth = 'closed'; P.brow = -0.3; if (t > 36.6 && t < 36.95) { P.handL = [20, -60 + 10 * osc(tc, 0.15)]; P.handR = [30, -70 - 10 * osc(tc, 0.15)]; P.tip = 0.3; } P.wind = -0.6; }
    sbSin6(ctx, P); }
  // the sailors wade in one after another, each drops at a different spot
  for (const [i, t0, x0, x1, gait] of SB6_WADE) { if (t < t0) continue; const dur = 1.3 + i * 0.1, xf = (u) => kfn(u, [[t0, x0], [t0 + dur, x1]], gait === 'limp' ? 'lin' : 'out'), x = xf(t), wl = sbCoveWL(x, t), wet = x < 760;
    const P = sbLive(t, 60 + i, { ...walk(xf, tc, { stride: 24 }), y: wet ? Math.max(900, wl + 120 - (x - 520) * 0.4) : 900, dir: 1, gaze: [1, 0], mouth: 'open', wet: true });
    if (gait === 'haul') { P.handRW = [x - 40, P.y - 170]; P.tip = 0.15; }
    if (gait === 'hauled') { P.tip = -0.3; P.lid = 0.6; P.aL = [0.6, 0.4]; P.aR = [0.6, 0.4]; P.x = Math.min(x, xf(t) ); }
    if (gait === 'limp') P.y += 4 * Math.abs(Math.sin(tc * 6));
    if (gait === 'cough') { P.handR = PERSON_HANDS.mouthCover.R; P.tip = 0.2 * Math.abs(Math.sin(tc * 7)); }
    // at rest: sitting, lying, kneeling (each different); the heads turn up the wall in a slow wave (32.2 - 33.3)
    if (t > t0 + dur) { P.amp = 0; P.mouth = 'open'; P.talk = 0.3 * Math.abs(Math.sin(tc * 3 + i)); if (i === 0) { P.sit = 1; P.seat = 'floor'; } else if (i === 1) { P.handL = [-40, -82]; P.handR = [40, -82]; P.tip = 0.2; } else if (i === 3) { P.kneel = 1; } else { P.sit = 1; P.seat = 'floor'; P.tip = -0.1; }
      const up = t > 32.2 + stagger([3, 2, 1, 0].indexOf(i), 0.2); if (up) { P.gaze = [0.3, -1]; P.mouth = 'o'; P.look = 0.3; } }
    // rose tries to climb at x 1380 (34.0 - 35.3): three holds, a stone breaks, he slides back and lands sitting
    if (i === 2 && t > 33.8) { const [cx, L] = SB_COVE.climb, k = t < 34.0 ? 0 : t < 34.3 ? 1 : t < 34.6 ? 2 : t < 34.85 ? 3 : 0, fy = t < 34.85 ? 900 - [0, 60, 120, 170][k] : Math.min(900, K.lerp(730, 900, K.clamp((t - 34.85) / 0.22)) ** 1); P.x = t < 34.0 ? K.lerp(1220, cx, K.clamp((t - 33.8) / 0.2)) : cx; P.amp = 0; P.sit = 0;
      P.y = t < 35.07 ? fy : 900; if (t > 34.0 && t < 34.85) { P.handLW = [cx - 20, L[Math.min(2, k)] - 30]; P.handRW = [cx + 24, L[Math.min(2, Math.max(0, k - 1))] - 40]; P.gaze = [0, -1]; P.mouth = 'closed'; P.brow = -0.5; }
      if (t >= 34.85) { P.sit = t > 35.07 ? 1 : 0; P.seat = 'floor'; P.sq *= landSquash(tc, 35.07, 0.18); P.eyes = t < 35.4 ? 'wide' : undefined; P.mouth = 'o'; P.aL = [2.2, 2.4]; P.aR = t > 35.07 ? [0.4, 0.3] : [2.2, 2.4]; }
      groundShadow(ctx, cx, 902, 70, 900 - P.y, { flat: true });
      if (t > 34.8 && t < 35.3) { sbStone(ctx, cx + 10, K.lerp(600, 900, K.clamp((t - 34.8) / 0.3)), 14, '#c8a0a0', '#8a6a7a'); } dustBurst(ctx, cx, 900, t - 35.07, 7, 8, 20, 70, 0.6, 5); }
    // mustard walks left to the wall, turns, walks right to the other, turns (34.8 - 35.6): arms rise and fall
    if (i === 1 && t > 34.6) { const mf = (u) => kfn(u, [[34.6, 1000], [35.05, 900], [35.15, 900], [35.6, 1120]], 'inOut'); Object.assign(P, walk(mf, tc, { stride: 24 })); P.dir = t < 35.1 ? -1 : 1; P.tip = 0; P.y = 900; const ar = 0.5 + 0.5 * Math.sin(tc * 5); P.aL = [0.5 + 1.6 * ar, 0.5]; P.aR = [0.5 + 1.6 * ar, 0.5]; P.handL = null; P.handR = null; if (t > 35.6) { P.amp = 0; P.handL = [-40, -82]; P.handR = [40, -82]; } }
    const draw = () => sbSailor(ctx, i, P);
    if (wet) sbWade(ctx, x, wl + 6, t, draw); else draw();
    if (gait === 'cough' && t < t0 + dur + 0.6) sbDrops6(ctx, x + 40, P.y - 200, ((t - t0) * 2) % 1); }
  // the captain walks out of the surf last, turban in hand, counts heads; sits heavily on a spar (35.38)
  if (t > 29.4) { const x = SB6_CPX(t), wl = sbCoveWL(x, t), wet = x < 760, P = sbLive(t, 51, { ...walk(SB6_CPX, tc, { stride: 22 }), y: wet ? Math.max(900, wl + 100 - (x - 560) * 0.45) : 900, dir: 1, gaze: [1, 0], pal: { hc: '#fff1d8' }, wet: true });
    if (t > 30.4) { P.amp = 0; P.handR = [70, -190]; P.talk = sbTalk(t, 29.5, 30.4, 5); P.gaze = gazePlan(SB_T3(t), [[29.5, [1, 0.2]], [29.9, [1, 0]], [30.2, [0.6, 0.1]]], 0.1); if (t > 30.4) { P.handR = [30, -100]; P.sq *= 0.97; } }
    if (t > 32.2) { P.gaze = [0.2, -1]; P.handR = [30, -100]; }
    if (t > 35.38) { const sd = K.clamp((t - 35.38) / 0.3); P.sit = sd; P.seat = 'bench'; P.y = 900; P.sq *= impactSquash(tc, 35.68, 0.9); P.lid = 0.5; P.gaze = [0.3, 0.6]; if (t > 35.8) { P.handL = [-30, -200]; P.handR = [30, -200]; P.pal = {}; } }
    if (t > 35.3) sbDebris(ctx, 'plank', 950, 902, 0, 0.9);
    const draw = () => sbCaptain(ctx, P); if (wet) sbWade(ctx, x, wl + 6, t, draw); else draw();
    if (t > 29.4 && t < 35.8) { const h = sbHandW(P, 1); if (t > 30.4) sbBlob(ctx, h[0] + 6, h[1] + 8, 18, 12, '#ffffff', '#e4e4ee', { lw: 2 }); } }
  sbCoveFront(ctx, t, cam);
}
function sbDrops6(ctx, x, y, u) { if (u <= 0 || u >= 1) return; ctx.save(); ctx.fillStyle = '#9fe0ff'; ctx.strokeStyle = '#2a6aa0'; ctx.lineWidth = 1.5; for (let i = 0; i < 4; i++) { const a = -1.2 + i * 0.5, r = 40 * u; ctx.globalAlpha = 1 - u; ctx.beginPath(); ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r + 30 * u * u, 5, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); }
function sbS5Over(ctx, t, cam, S) {
  if (t > 29.4 && t < 30.6) sbHeadCount(ctx, S, t, 29.4, 0.15, [[880, 720], [1000, 680], [1050, 690], [1150, 680], [1220, 690], [SB6_CPX(t), 660]], cam);
  if (t > 29.9 && t < 31.3) { const p = sbP(1000, 600, cam); sbTag(ctx, S, 'ALL SAFE', p[0], p[1] - 120, t, 29.9, 31.0, { size: 46 }); }
  if (t > 31.4 && t < 32.3) { const a = sbP(700, 1000, cam), b = sbP(1300, 760, cam), k = K.clamp((t - 31.4) / 0.4); S.arrow(ctx, [a[0] - 120, a[1]], [a[0] + 40, a[1] - 40], k, { bend: 0 }); S.arrow(ctx, [b[0], b[1] - 160], [b[0], b[1] - 10], k, { bend: 0 }); }
  if (t > 35.5 && t < 37.21) { sbTag(ctx, S, 'NO WAY OUT', 500, 170, t, 35.5, 37.0, { size: 52 }); }
}
SB_SHOTS.push({ a: 26.48, b: 37.21, cam: sbKeys(SB6_CAM5), world: sbS5World, over: sbS5Over });

// ---------- S6 (37.21 - 48.32): the search pan right, one drop, the crab, the sound of water, the stream, the leaf, the cave mouth ----------
const SB6_SX6 = (t) => kfn(t, [[37.21, 1060], [38.0, 1060], [38.6, 1230], [39.2, 1230], [39.5, 1300], [40.2, 1300], [40.5, 1400], [41.2, 1400], [41.88, 1690], [43.6, 1690], [44.4, 1720], [46.2, 2120], [48.32, 2120]], 'inOut');
const SB6_LEAF = (t) => kfn(t, [[42.9, 1700], [44.4, 1950], [45.6, 2210], [46.6, 2380]], 'lin');
const SB6_CAM6 = (t) => { const sx = SB6_SX6(t), base = t < 44.4 ? sx + 90 : t < 46.3 ? K.lerp(1810, 2050, K.ease.inOut(K.clamp((t - 44.4) / 1.9))) : 2050;
  const up = t < 47.2 ? 0 : t < 47.75 ? K.ease.inOut((t - 47.2) / 0.55) : t < 47.95 ? 1 : 1 - K.ease.inOut(K.clamp((t - 47.95) / 0.37)); return { x: Math.min(2100, base), y: K.lerp(615, -60, up), zoom: 1 }; };
function sbS6World(ctx, t, cam) {
  const tc = SB_T2(t), x = SB6_SX6(t), lit = K.clamp((t - 43.4) / 4.9) * 0.25;
  sbCoveBack(ctx, t, cam, { lit, draught: t > 46.3 && t < 47.6 ? Math.sin(Math.PI * (t - 46.3) / 1.3) : 0 });
  for (let i = 0; i < 5; i++) sbDebris(ctx, i % 2 ? 'plank' : 'barrel', 830 + i * 34, 900 - (i % 2) * 6, 0.2 * (i - 2), 0.7);
  sbGull(ctx, 2260 + 120 * Math.cos(t * 0.8), -560 + 30 * Math.sin(t * 0.8), t, { s: 0.36, dir: Math.sin(t * 0.8) > 0 ? -1 : 1, seed: 3 });
  // the frog on a boulder by the stream: croaks once as the leaf passes (43.9)
  frog(ctx, { x: 1880, y: 884, s: 0.55, dir: -1, croak: pulse(t, 43.9, 0.4), eyes: t > 43.8 && t < 44.8 ? 'open' : 'open' });
  // the barrel he lifts and the crab that walks out (39.2 - 40.2)
  const lift = sbF(t, [[39.2, 0], [39.5, 1], [40.0, 1], [40.2, 0.1]]);
  const cx = t < 39.5 ? 1352 : 1352 + 80 * K.clamp((t - 39.5) / 1.2); sbCrab(ctx, cx, 904, { s: 0.8, ph: tc * 14, wave: t > 39.6 && t < 40.3 ? Math.abs(Math.sin(tc * 6)) : 0 });
  if (t < 41) { ctx.save(); ctx.translate(1352, 904 - 60 * lift); ctx.rotate(-0.3 * lift); sbDebris(ctx, 'barrel', 0, 0, 0, 0.8); ctx.restore(); }
  // the leaf on the stream (42.6 -)
  if (t > 42.6 && t < 46.62) { const lx = t < 42.9 ? 1700 : SB6_LEAF(t), ly = (t < 42.9 ? 905 : sbCoveRiverY(lx)) + 2 * Math.sin(tc * 6); sbLeaf(ctx, lx, ly, tc * 4, 1.2); }
  // Sinbad
  const P = sbLive(t, 11, { ...walk(SB6_SX6, tc, { stride: 26 }), y: x > 1560 ? 892 : 900, dir: 1, gaze: [1, 0.2], mouth: 'closed', wind: -0.5 });
  if (t < 38.0) { const k = sbF(t, [[37.21, 0], [37.5, 1], [37.8, 1], [38.0, 0]]); P.handL = [-30, -96 + 4 * k]; P.handR = [30 + 6 * k, -92]; P.tip = 0.08 * k; P.brow = -0.4; P.gaze = gazePlan(SB_T3(t), [[37.21, [0.6, 0.8]], [37.6, [1, -0.4]]], 0.12); }
  else if (t > 38.6 && t < 39.4) { const k = sbF(t, [[38.6, 0], [38.85, 1], [39.15, 1], [39.4, 0]]); P.handR = [20, -230 * k - 100 * (1 - k)]; P.handL = [10, -200 * k - 90 * (1 - k)]; P.tilt = -0.4 * k; P.mouth = k > 0.5 ? 'open' : 'closed'; P.gaze = [0.3, -1]; P.wink = t > 38.9 && t < 39.2 ? 'L' : undefined; if (t > 39.2) { P.gaze = [1, -0.3]; P.mouth = 'frown'; } }
  else if (t > 39.2 && t < 40.2) { P.handLW = [1340, 904 - 60 * lift - 30]; P.handRW = [1366, 904 - 60 * lift - 30]; P.tip = 0.3 * (1 - lift * 0.6); P.gaze = [0.6, 0.7]; P.brow = t < 39.7 ? 0.5 : -0.2; if (t > 39.9) { P.handL = [10, -110]; P.handR = null; P.handRW = null; P.mouth = 'frown'; P.tip = 0; } }
  else if (t > 40.2 && t < 41.2) { P.amp = 0.8; P.ph = Math.PI * 0.5; P.y -= 6; P.tilt = 0.22; P.gaze = gazePlan(SB_T3(t), [[40.2, [0.3, 0]], [40.5, [1, 0]]], 0.2); P.lid = 0; P.mouth = 'o'; P.tip = 0; P.idle = 0; }
  else if (t > 41.88 && t < 43.6) { P.kneel = 1; P.y = 896; const cup = t < 42.3 ? [1735, 912] : t < 42.5 ? [1712, 800] : [1730, 820]; P.handLW = cup; P.handRW = [cup[0] + 18, cup[1]]; P.tip = t < 42.3 ? 0.5 : 0.1; P.mouth = t > 42.3 && t < 42.6 ? 'smile' : t > 42.6 ? 'frown' : 'o'; P.gaze = t < 42.5 ? [0.6, 1] : [1, 0.6]; P.tilt = t > 42.5 ? 0.2 : 0;
    if (t > 42.6) { P.handLW = [K.lerp(1735, 1760, K.clamp((t - 42.6) / 0.3)), 904]; P.handRW = null; P.handR = [30, -100]; P.gaze = gazePlan(SB_T3(t), [[42.9, [1, 0.6]], [43.2, [1, 0.2]]], 0.15); P.look = t > 43.1 ? 0.5 : 0; } if (t > 43.3) { const up = K.clamp((t - 43.3) / 0.3); P.kneel = 1 - up; P.y = 892; P.handLW = null; P.handL = [-30, -100]; } }
  else if (t > 46.2) { P.tip = 0.22; P.handRW = [2172, 760]; P.gaze = [1, 0.1]; P.mouth = 'o'; P.wind = -1; }
  if (t > 40.0 && t < 40.6) sbS6Growl(ctx, x, t);
  sbSin6(ctx, P);
  if (t > 38.6 && t < 39.6) { const h = sbHandW(P, 1); sbWaterskin(ctx, h[0], h[1] - 20, Math.PI * 0.8 * K.clamp((t - 38.6) / 0.25), 0.5, 0.7); if (t > 38.9 && t < 39.15) sbDrops6(ctx, h[0] - 10, h[1] + 20, (t - 38.9) / 0.25); }
  if (t > 41.9 && t < 42.4) sbRing(ctx, 1740, 912, (t - 41.9) / 0.5, 50);
  if (t > 42.6 && t < 43.0) sbRing(ctx, 1700, 906, (t - 42.6) / 0.4, 60);
  sbCoveFront(ctx, t, cam);
}
function sbS6Growl(ctx, x, t) { const u = (t - 40.0) / 0.6; ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#e8364f'; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 8; i++) ctx.lineTo(x + 40 + i * 8, 780 + (i % 2 ? -8 : 8)); ctx.stroke(); ctx.restore(); }
function sbS6Over(ctx, t, cam, S) {
  if (t > 40.2 && t < 41.3) { soundArcs(ctx, 900, 560, -1, t); }
  if (t > 42.3 && t < 43.4) { const a = sbP(1760, 960, cam), b = sbP(1980, 960, cam); S.arrow(ctx, a, b, K.clamp((t - 42.35) / 0.4), { bend: 0 }); sbTag(ctx, S, 'WRONG WAY?', a[0] + 80, a[1] + 110, t, 42.4, 43.3, { size: 38 }); }
  if (t > 39.55 && t < 40.3) { const p = sbP(1300, 700, cam); sbTag(ctx, S, 'GRRR...', Math.min(820, p[0] + 140), p[1] - 80, t, 39.95, 40.3, { size: 52 }); }
}
SB_SHOTS.push({ a: 37.21, b: 48.32, cam: SB6_CAM6, world: sbS6World, over: sbS6Over });

// ---------- S7 (48.32 - 55.33): the glints, the banks light up, the pebble insert, the light spot, four colours, rose's misses ----------
const SB6_CAM7 = [[48.32, { x: 1850, y: 615, zoom: 1.0 }], [51.84, { x: 1850, y: 615, zoom: 1.0 }], [52.7, { x: 1820, y: 660, zoom: 1.15 }], [55.33, { x: 1830, y: 660, zoom: 1.15 }]];
function sbS7World(ctx, t, cam) {
  const tc = SB_T2(t), lit = 0.25 + 0.75 * K.clamp((t - 49.6) / 1.3);
  sbCoveBack(ctx, t, cam, { lit: t < 49.6 ? 0.12 + 0.12 * K.clamp((t - 48.32) / 1.2) : lit });
  frog(ctx, { x: 1880, y: 884, s: 0.55, dir: -1, croak: 0, eyes: 'open' });
  // rose peeks over a boulder behind him (54.3 -), three grabs at a rolling pebble
  if (t > 53.9) { const up = K.clamp((t - 53.9) / 0.3), P = sbLive(t, 62, { x: 1610, y: 892 + 40 * (1 - up), dir: 1, eyes: 'wide', mouth: 'o', gaze: [1, 0.5] }); const g = Math.floor((t - 54.4) / 0.3);
    if (t > 54.4) { P.handRW = [1650 + 40 * Math.min(3, g + 1) + 20 * ((t - 54.4) % 0.3) / 0.3, 880]; P.tip = 0.25; } sbSailor(ctx, 2, P);
    sbPebble(ctx, 1680 + (t > 54.4 ? 46 * Math.min(3, (t - 54.4) / 0.3) + 10 : 0), 884, 10, 4, { rot: (t - 54) * 8 }); }
  sbStone(ctx, 1610, 900, 46, '#c8b8d0', '#8a7a9a');
  // Sinbad kneels on the far bank (screen x ~430)
  const P = sbLive(t, 11, { x: 1780, y: 896, dir: 1, kneel: 1, gaze: [0.4, 1], mouth: 'closed', wind: -0.4 }, [48.9, 53.9]);
  if (t < 49.6) { P.gaze = gazePlan(SB_T3(t), [[48.32, [1, 0.2]], [48.6, [0.2, 1]]], 0.12); P.drop = t > 48.75 ? 6 : 0; P.mouth = 'o'; }
  else if (t < 50.9) { P.gaze = gazePlan(SB_T3(t), [[49.6, [-1, 0.6]], [50.2, [1, 0.6]]], 0.3); P.mouth = 'o'; P.eyes = 'wide'; }
  else if (t < 52.6) { P.handRW = [1810, 860]; P.handLW = [1790, 840 + 10 * Math.sin(tc * 12)]; P.gaze = [0.3, 0.5]; P.tongue = true; P.tip = 0.1; }
  else if (t < 53.4) { P.handRW = [1830 + 10 * Math.sin(tc * 3), 640]; P.gaze = [0.6, -1]; P.wink = 'L'; P.mouth = 'smile'; P.tip = -0.05; }
  else { P.handRW = [1840, 760]; P.handLW = [1800, 790]; P.gaze = gazePlan(SB_T3(t), [[53.4, [0.3, 0.8]], [53.9, [-1, -0.1]]], 0.15); P.brow = 0.6; P.mouth = 'smile'; }
  const Q = sbSin6(ctx, P);
  if (t > 50.9) { const h = sbHandW(Q, 1); sbPebble(ctx, h[0] + 4, h[1] - 10, 11, 0, { glow: t > 52.6 ? 0.6 : 0.3, glint: ((SB_T3(t) * 0.9) % 1.3) }); }
  if (t > 53.3) { const h = sbHandW(Q, 0); for (let k = 1; k < 5; k++) sbPebble(ctx, h[0] - 14 + (k - 1) * 10, h[1] - 6 - (k % 2) * 6, 8, k, { glint: ((SB_T3(t) + k * 0.3) % 1.2) }); }
  // the red light spot dancing over his tunic and the rock (52.6 - 53.4)
  if (t > 52.6 && t < 53.45) { const sx = 1770 + 30 * Math.sin(tc * 5), sy = 800 + 20 * Math.cos(tc * 4); ctx.save(); ctx.globalCompositeOperation = 'screen'; sbGlow(ctx, sx, sy, 40, 0.9, '#ff4a6a'); ctx.restore(); sbGlow(ctx, 1980 + 40 * Math.sin(tc * 3), 720, 34, 0.7, '#ff6a8a'); }
  sbCoveFront(ctx, t, cam);
}
// the insert (51.84 - 52.7): finger and thumb, the pebble 150 px wide glowing ruby, his eye behind it with the pebble in the iris
function sbS7Insert(ctx, t, S) { const tc = SB_T2(t);
  sbGrad(ctx, 0, 0, 1000, 1230, [[0, '#f4d8b8'], [0.6, '#e8b8a8'], [1, '#c8a0c0']]);
  for (let i = 0; i < 12; i++) sbGlow(ctx, 80 + (i * 173) % 900, 200 + (i * 311) % 900, 60, 0.4, SB_GEMC[i % 5][0]);
  const pw = 1 + 0.15 * K.clamp((t - 51.9) / 0.4);
  sbFace(ctx, 640, 380, 1.55, { gaze: [-0.8, 0.5], lid: 0.05, iris: 1.0, brow: 0.5, mouth: 'o', pupil: pw, reflect: (c, ir) => { c.fillStyle = '#ff4a6a'; c.globalAlpha = 0.85; c.beginPath(); c.ellipse(-ir * 0.2, ir * 0.25, ir * 0.35, ir * 0.3, 0, 0, 7); c.fill(); } });
  const px = 360, py = 760, r = 78; sbGlow(ctx, px, py, r * 3.4, 0.8, '#ff4a6a');
  sbPebble(ctx, px, py, r, 0, { lw: 5, glint: (t - 51.95) / 0.6 });
  // thumb over the top, finger under
  celShade(ctx, [[px - 150, py + 130], [px - 70, py + 60], [px - 20, py + 70], [px + 10, py + 96], [px - 20, py + 130], [px - 120, py + 200]], C.skin, '#d99a80', { light: [-1, -1], off: 14, lw: 4, line: '#6a3a2a' });
  celShade(ctx, [[px - 210, py - 40], [px - 110, py - 70], [px - 50, py - 70], [px - 30, py - 50], [px - 60, py - 30], [px - 180, py + 20]], C.skin, '#d99a80', { light: [-1, -1], off: 14, lw: 4, line: '#6a3a2a' });
  sbGlint(ctx, px + 20, py - 30, 60, ((t - 52.05) / 0.4));
}
function sbS7Over(ctx, t, cam, S) {
  if (t > 53.5 && t < 55.2) { const p = sbP(1800, 560, cam); sbTag(ctx, S, 'GEMS?!', p[0] + 120, p[1] - 160, t, 53.5, 55.0, { size: 56 }); }
  if (t >= 48.32 && t < 49.4) { const p = sbP(1795, 900, cam); S.arrow(ctx, [p[0] + 160, p[1] - 160], [p[0] + 40, p[1] - 20], K.clamp((t - 48.5) / 0.4), { bend: 0.1 }); }
}
SB_SHOTS.push({ a: 48.32, b: 51.84, cam: sbKeys(SB6_CAM7), world: sbS7World, over: sbS7Over });
SB_SHOTS.push({ a: 51.84, b: 52.7, panel: sbS7Insert });
SB_SHOTS.push({ a: 52.7, b: 55.33, cam: sbKeys(SB6_CAM7), world: sbS7World, over: sbS7Over });

// ---------- S8 (55.33 - 60.46): sitting back on his heels by the cave mouth; the thought cloud: the river through the mountain ----------
function sbS8World(ctx, t, cam) {
  const tc = SB_T2(t);
  sbCoveBack(ctx, t, cam, { lit: 1 });
  frog(ctx, { x: 1880, y: 884, s: 0.55, dir: 1, croak: pulse(t, 58.3, 0.3), eyes: 'open' });
  const P = sbLive(t, 11, { x: 2020, y: 896, dir: 1, kneel: 1, gaze: [1, 0.1], mouth: 'closed', wind: -0.5 }, [56.7, 59.0]);
  if (t < 56.6) { P.handR = PERSON_HANDS.chin.R; P.handL = [20, -110]; P.lid = Math.max(P.lid, 0.3); P.tilt = 0.12 * osc(tc, 1.4); P.gaze = [1, 0]; }
  else if (t < 59.7) { P.gaze = [-0.6, -1]; P.handL = [20, -110]; P.lid = 0.1; const tr = K.clamp((t - 57.6) / 1.4); P.handR = t > 57.6 ? [-30 + 110 * (tr - lagged((u) => K.clamp((u - 57.6) / 1.4), tc, 0.15, 0.4)), -230 - 20 * Math.sin(tr * 3)] : PERSON_HANDS.chin.R;
    if (t > 59.0) { P.brow = 0.6; P.mouth = 'smile'; P.drop = 6 * Math.abs(Math.sin(Math.PI * (t - 59.1) / 0.3)) * (t < 59.7 ? 1 : 0); } }
  else { const st = sbF(t, [[59.7, 0], [59.95, 1], [60.46, 1]]); P.kneel = 1 - st; P.dir = -1; P.gaze = [-1, -0.1]; P.handR = PERSON_HANDS.pointFwd.R; P.mouth = 'smile'; P.tip = 0.08 * st; P.brow = -0.3; P.sq *= 1 + 0.04 * st; }
  const Q = sbSin6(ctx, P); const h = sbHandW(Q, 0); sbPebble(ctx, h[0], h[1] - 4, 7, 0, { glow: 0.4 });
  sbCoveFront(ctx, t, cam);
}
function sbS8Over(ctx, t, cam, S) {
  if (t > 56.6 && t < 60.46) { const hd = sbP(2020, 700, cam), close = K.clamp((t - 60.0) / 0.3); if (close >= 1) return; ctx.save(); ctx.globalAlpha *= 1 - close;
    thoughtCloud(ctx, 560, 300, 460, 300, t, { p: K.clamp((t - 56.6) / 0.45), tail: [hd[0] + 20, hd[1] - 60], fill: '#fff6ea', scale: 0.6, at: [520, 540], seed: 13, inside: (k) => sbMountainDiagram(k, t) }); ctx.restore(); }
}
// inside the thought: the mountain in section, the river line drawn on through it, the houses beyond with a question mark
function sbMountainDiagram(c, t) { const ox = 300, oy = 560;
  c.save(); c.translate(ox, oy);
  sbGrad(c, -40, -200, 500, 300, [[0, '#bfe4ff'], [1, '#e8f6ff']]);
  celShade(c, [[20, 120], [150, -150], [260, -90], [330, 120]], '#d89aa0', '#a87080', { light: [-1, -1], off: 16, lw: 3, line: '#6a3a5a' });
  c.fillStyle = '#7ac87a'; c.fillRect(-40, 120, 520, 40);
  const draw1 = K.clamp((t - 57.6) / 0.6), draw2 = K.clamp((t - 58.2) / 0.8), pts = [[-30, 100], [60, 100], [180, 104], [300, 100], [420, 104]], n = draw1 * 0.5 + draw2 * 0.5;
  c.strokeStyle = '#2a8ad8'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(...pts[0]); const L = n * 4; for (let i = 1; i <= Math.floor(L); i++) c.lineTo(...pts[i]); if (L < 4) { const k = Math.floor(L), f = L - k; c.lineTo(K.lerp(pts[k][0], pts[k + 1][0], f), K.lerp(pts[k][1], pts[k + 1][1], f)); } c.stroke();
  if (draw2 >= 1) { c.fillStyle = '#2a8ad8'; c.beginPath(); c.moveTo(440, 104); c.lineTo(414, 88); c.lineTo(414, 120); c.closePath(); c.fill(); }
  [[370, 0], [410, 1], [450, 2]].forEach(([hx, i]) => { const k = K.ease.back(K.clamp((t - 59.0 - i * 0.18) / 0.25)); if (k <= 0) return; c.save(); c.translate(hx - 30, 100); c.scale(k, k); celShade(c, [[-16, 0], [-16, -30], [16, -30], [16, 0]], ['#f6e0c0', '#f4c8c0', '#d8e8f4'][i], '#c8a890', { light: [-1, -1], off: 4, lw: 2 }); celShade(c, ell(0, -30, 12, 10, 12).filter((p) => p[1] <= -30), '#fff6ea', '#e0d0e8', { lw: 1.5 }); c.restore(); });
  if (t > 59.4) { palmTree(c, 470, 100, { s: 0.22, t: SB_T2(t), sway: 1 }); c.save(); c.globalAlpha = 0.6; c.fillStyle = '#c8c0d8'; for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(380 + 6 * Math.sin(t * 3 + k), 40 - k * 22, 8 + k * 3, 0, 7); c.fill(); } c.restore(); }
  if (t > 59.6) { c.font = `800 70px ${BF}`; c.fillStyle = '#e8364f'; c.textAlign = 'center'; c.fillText('?', 470, -60); }
  c.restore(); }
SB_SHOTS.push({ a: 55.33, b: 60.46, cam: sbKeys([[55.33, { x: 2150, y: 690, zoom: 1.15 }], [60.46, { x: 2160, y: 690, zoom: 1.15 }]]), world: sbS8World, over: sbS8Over });
