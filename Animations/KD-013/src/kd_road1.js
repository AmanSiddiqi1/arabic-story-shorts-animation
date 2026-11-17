// ===== KD-013 road scenes 1: S3 (12-20.53) walk home + eyes in the tree, S4 (20.53-27.5) three thieves, S5 (27.5-41.4) the plan,
// S6-S7 (41.4-63.25) thief 1 at the milestone, S8 (63.25-77) thief 2 at the bush, S9 (77-83.9) the first doubt =====
// countryRoad strip 3000 wide; places (index): 0 tree 420, 1 milestone 1260, 2 bush 1760, 3 low wall 2200 (seat), 4 bush 2420, 5 tree 2560
const KD_PLACES = [{ kind: 'tree', x: 420 }, { kind: 'milestone', x: 1260 }, { kind: 'bush', x: 1760 }, { kind: 'wall', x: 2200, w: 240, h: 56 }, { kind: 'bush', x: 2420, seed: 5 }, { kind: 'tree', x: 2560 }];
const KD_SEATY = KD_GR - 56 + 48;   // person y for sitting on the wall (seat 48 above y)
function kdRoad(ctx, cam, hx) { const camX = cam.x - 500 / cam.zoom; return countryRoad(ctx, { w: KD_RW, places: KD_PLACES, camX, house: { x: hx } }); }
const kdFront = (ctx, occ) => countryRoad(ctx, { w: KD_RW, places: KD_PLACES, front: true, occlude: occ });
// draw an actor that rises from behind cover: clipped at the ground line so nothing shows below the road
function kdBehind(ctx, fn) { ctx.save(); ctx.beginPath(); ctx.rect(-50, -200, KD_RW + 100, KD_GR + 202); ctx.clip(); fn(); ctx.restore(); }
const KD_THIEF = [{ costume: 'thief', s: 1 }, { costume: 'thief', s: 0.88, pal: { robe: C.yellow, stripes: C.red } }, { costume: 'thief', s: 1.08, pal: { robe: C.white, stripes: C.blue, cape: '#6a2a8a', capeDot: '#3f1757' } }];
const kdThief = (i, o) => ({ ...KD_THIEF[i], y: KD_GR, mouth: 'closed', ...o, sq: (i === 1 ? 0.95 : 1) * (o.sq ?? 1) });
function kdNotes(ctx, x, y, t, t0, t1) { if (t < t0 || t > t1) return; for (let i = 0; i < 2; i++) { const u = ((t - t0) * 0.8 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); note(ctx, x + 20 + u * 40 + i * 10, y - 20 - u * 90, 0.8); ctx.restore(); } }
// walker helpers
const kdAscWalk = (xf, t, o = {}) => ({ costume: 'ascetic', s: 1, y: KD_GR, ...walk(xf, t), ...o });
function kdGoatAt(xf, t, o = {}) { const w = walk(xf, t, { stride: 16 }), v = speed(xf, t); return { s: 0.85, y: KD_GR, dir: v < -5 ? -1 : 1, ...w, fat: 1, chew: t, t, seed: 5, ...o }; }

// ================= S3: walking home; eyes in the tree =================
const KD_AX3 = (t) => kfn(t, [[12.3, 150], [20.53, 740], [24.6, 1060]], 'lin');
const KD_AX3e = (t) => (t < 12.3 ? 150 : t < 12.6 ? K.lerp(150, 162, K.ease.in((t - 12.3) / 0.3)) : KD_AX3(t));
const KD_GX3 = (t) => KD_AX3e(t - 0.25) - 150;
const KD_FALLS3 = footfalls(KD_AX3e, 12.3, 20.6, 26);
function kdAsc3(t) {
  const P = kdAscWalk(KD_AX3e, t, { dir: 1, brow: -0.3, mouth: 'smile', handL: [-48 + 3 * Math.sin(t * 5), -96] });
  P.sq = anticipate(t, 12.2, 0.25, 0.05); let tg = [P.x + 300, 700];
  if (t >= 14.08 && t < 15.2) { P.handR = PERSON_HANDS.pointFwd.R; P.drop = -4; P.gaze = [1, -0.2]; tg = null; }
  if (t >= 15.26 && t < 16.7) { P.sq = 1 + 0.03 * Math.abs(Math.sin(P.ph)); P.lid = 0.45; P.y = KD_GR - 4 * Math.abs(Math.sin(P.ph)); }
  if (t >= 16.78 && t < 17.7) { tg = kdGoatHead(kdGoatAt(KD_GX3, t)); P.brow = -0.4; P.handL = [-50, -100 + 8 * Math.sin(t * 22) * pulse(t, 16.9, 0.6)]; P.look = -0.6; }
  P.lid = Math.max(P.lid || 0, blink(t, 3)); if (tg) P.gaze = lookAt(kdHead(P), tg);
  return P;
}
function kdGoat3(t) {
  const G = kdGoatAt(KD_GX3, t); G.y -= Math.abs(Math.sin(G.ph * 2)) * 3 * G.amp; G.earLift = 0.3 * Math.sin(G.ph * 2 - 1.2) * G.amp;
  if (t < 12.8) G.tip = -0.06 * pulse(t, 12.2, 0.6);
  G.gaze = [1, -0.1]; if (t >= 16.78 && t < 17.7) { G.gaze = [1, -0.6]; G.talk = 0.5 * pulse(t, 17.0, 0.5); G.headTilt = -0.15; }
  return G;
}
const KD_EYES3 = [[17.78, 420, 380], [19.0, 372, 450], [19.3, 470, 462]];
function kdTreeEyes(ctx, t, gx) {
  for (const [t0, x, y] of KD_EYES3) { if (t < t0) continue; const open = K.clamp((t - t0) / 0.2), lk = K.clamp((gx - x) / 160, -1, 1.2), shut = open < 0.5 || (t > 20.25 && t < 20.42) || (y > 455 && blink(t, 7) > 0.5);
    ctx.save(); ctx.globalAlpha = open; peekEyes(ctx, x, y, lk, shut); ctx.restore(); }
}
const KS3 = {
  a: 12.0, ww: KD_RW,
  cam: (() => { const k = []; for (let t = 12.0; t <= 18.4; t += 0.4) k.push([t, { x: KD_AX3e(t) + 100, y: 690, zoom: 1.4 }]); k.push([19.6, { x: 580, y: 660, zoom: 1.4 }], [20.6, { x: 580, y: 660, zoom: 1.4 }]); return k; })(),
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 820); cloudFlat(ctx, 300 + t * 6, 220, 0.8); cloudFlat(ctx, 1100 + t * 4, 300, 0.6);
    const G = kdGoat3(t), A = kdAsc3(t);
    kdTreeEyes(ctx, t, G.x);
    kdGoatShadow(ctx, G); kdGoat(ctx, G); halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A);
    const nk = kdGoatNeck(G); kdLoop(ctx, nk, 0.85); kdRope(ctx, kdHand(A, 0), nk, t < 12.7 ? 40 : 110);
    for (const f of KD_FALLS3) dustBurst(ctx, f.x + (f.odd ? 14 : -14), KD_GR - 2, t - f.t, 3, 5, 10, 20, 0.45, Math.round(f.t * 10));
    kdNotes(ctx, kdHead(A)[0], kdHead(A)[1] - 30, t, 15.26, 16.8);
  },
  over(ctx, t, cam, S) {
    if (t >= 14.08 && t < 15.7) { const [hx, hy] = kdP(820 + 0.7 * (cam.x - 500 / cam.zoom), 830, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 14.08, 15.7, 0.2);
      S.label(ctx, 'HOME', Math.min(hx, 880), hy - 210, KB(t, 14.15, 0.3), { align: 'center', size: 46, fill: C.yellow }); S.arrow(ctx, [Math.min(hx, 880) - 10, hy - 170], [Math.min(hx, 900), hy - 50], KB(t, 14.25, 0.3, 'out'), { width: 16 }); ctx.restore(); }
    if (t >= 15.9 && t < 16.9) { const [x, y] = kdP(kdAsc3(t).x, 560, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 15.9, 16.9, 0.2); sfx(ctx, 'HUM HUM', x + 110, y - 40, 40, KB(t, 15.95, 0.3), { rot: -0.1, fill: C.white }); ctx.restore(); }
  },
};

// ================= S4: three thieves behind the tree =================
// heads stacked on the right of the trunk (x 365..475): thief3 top, thief1 middle, thief2 bottom
const KD_T4 = [{ i: 0, x: 425, y: 800, t0: 20.86 }, { i: 2, x: 425, y: 720, t0: 21.8 }, { i: 1, x: 425, y: 875, t0: 22.06 }];
function kdThief4(k, t) {
  const d = KD_T4[k], out = t < d.t0 ? 0 : settleTo(t, d.t0, 0, 1, 0.3, k === 2 ? 0.35 : 0.12), P = kdThief(d.i, { x: d.x, y: d.y, dir: 1, tip: 0.33 * out });
  P.handRW = [478, d.y - 150]; P.lid = d.i === 0 ? 0.4 : 0; P.mouth = d.i === 2 ? 'smile' : 'closed'; let tg = kdGoatHead(kdGoat3(t));
  if (d.i === 1 && t > 22.06 && t < 22.6) P.tip += 0.08 * Math.sin((t - 22.06) * 25) * (1 - (t - 22.06) / 0.54);
  if (d.i === 1 && t >= 23.74 && t < 24.6) { P.eyes = 'wide'; P.mouth = 'smile'; P.handRW = null; P.handR = [10 + 6 * Math.sin(t * 30), -118]; P.handL = [-6 - 6 * Math.sin(t * 30), -114]; P.drop = 4; }
  if (d.i === 2 && t >= 24.64 && t < 25.4) { P.tip = 0.33 + 0.1 * KB(t, 24.64, 0.3); P.handRW = null; P.aR = [1.45, 1.55 + 0.15 * Math.sin(t * 30)]; P.eyes = 'wide'; }
  if (d.i === 2 && t >= 25.4 && t < 26.2) { const u = KB(t, 25.4, 0.4); P.handRW = null; P.aR = [K.lerp(1.45, 0.3, u), K.lerp(1.6, 0.2, u)]; P.mouth = 'frown'; }
  if (d.i === 0 && t >= 25.4 && t < 26.2) { P.handRW = [478 + 10, 610]; P.look = Math.sin((t - 25.6) * 18) * pulse(t, 25.6, 0.6); P.lid = 0.5; if (t > 25.9) tg = [440, 300]; }
  if (d.i === 1 && t >= 26.22) { P.handRW = null; P.handR = [56, -96]; P.mouth = 'o'; tg = [520, kfn(t, [[26.3, 760], [27.4, 560]])]; }
  if (k === 2 && t > 22.4 && t < 22.9) P.lid = 1;    // all three blink out of sync
  if (k === 0 && t > 22.55 && t < 22.7) P.lid = 1; if (k === 1 && t > 22.7 && t < 22.85) P.lid = 1;
  kdLife(P, t, 20 + k, tg); return P;
}
const KS4 = {
  a: 20.53, ww: KD_RW,
  cam: [[20.53, { x: 420, y: 640, zoom: 1.7 }], [22.94, { x: 440, y: 640, zoom: 1.8 }], [23.12, { x: 560, y: 660, zoom: 1.8 }], [23.55, { x: 560, y: 660, zoom: 1.8 }], [23.72, { x: 450, y: 640, zoom: 1.85 }], [24.6, { x: 450, y: 640, zoom: 1.9 }], [27.6, { x: 450, y: 640, zoom: 1.9 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 820);
    const G = kdGoat3(t), A = kdAsc3(t); kdGoatShadow(ctx, G); kdGoat(ctx, G); person(ctx, A); const nk = kdGoatNeck(G); kdLoop(ctx, nk, 0.85); kdRope(ctx, kdHand(A, 0), nk, 110);
    if (t >= 22.94 && t < 23.7) star(ctx, G.x - 10, G.y - 90, 14 * pulse(t, 23.0, 0.6), C.white, t * 3);
    const T = [0, 1, 2].map((k) => kdThief4(k, t)); for (const P of [T[1], T[0], T[2]]) person(ctx, P);
    kdFront(ctx, [0]);
    // hands on the bark stay in front of the trunk edge
    for (const P of T) if (P.handRW) shape(ctx, ell(P.handRW[0] - 2, P.handRW[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 });
    if (t >= 26.22) { const h = kdHand(T[2], 1); shape(ctx, [[h[0] - 4, h[1]], [h[0] + 22, h[1] - 2], [h[0] + 18, h[1] + 26], [h[0] + 2, h[1] + 22]], C.white, { lw: 3.5, seed: 9 });
      const u = t - 26.4; if (u > 0) { const mx = h[0] + 20 + 30 * u + 10 * Math.sin(u * 9), my = h[1] - 60 * u; ctx.save(); ctx.fillStyle = '#b9b4c6'; ctx.strokeStyle = C.black; ctx.lineWidth = 2.5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(mx + sd * 7, my, 8, 5 * Math.abs(Math.sin(u * 30)) + 1, sd * 0.4, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); } }
  },
  over(ctx, t, cam, S) {
    if (t >= 21.54 && t < 27.5) { const n = t < 21.8 ? 1 : t < 22.06 ? 2 : 3; ctx.save(); ctx.globalAlpha = kdFade(t, 21.54, 27.5, 0.25); S.counter(ctx, n, 150, 200, KB(t, [21.54, 21.8, 22.06][n - 1], 0.3), { size: 100 }); ctx.restore(); }
    if (t >= 22.36 && t < 25.3) { const [hx, hy] = kdP(500, 640, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 22.36, 25.3, 0.2); S.label(ctx, '3 THIEVES', 760, 210, KB(t, 22.4, 0.3), { align: 'center', size: 50, fill: C.yellow }); S.arrow(ctx, [720, 260], [hx + 60, hy - 90], KB(t, 22.5, 0.3, 'out'), { width: 18 }); ctx.restore(); }
    if (t >= 26.9 && t < 27.5) { const [hx, hy] = kdP(560, 690, cam); ctx.save(); ctx.globalAlpha = kdFade(t, 26.9, 27.5, 0.12); ctx.translate(hx, hy - 60); const k = K.ease.back(KB(t, 26.9, 0.25)); ctx.scale(k, k); kdCoin(ctx, 0, 0, 36);
      ctx.lineCap = 'round'; for (const [w, c] of [[14, C.black], [8, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(-40, -40); ctx.lineTo(40, 40); ctx.stroke(); } ctx.restore(); }
  },
};

// ================= S5: the plan, seen from behind the tree (reverse angle, its own 1000-wide strip) =================
// v2: a tight huddle beside the trunk (heads in a triangle), thief 2 a beat late
const KD_HUDDLE = [{ i: 1, x0: 250, x: 412, t0: 28.15, d: 0.55 }, { i: 0, x0: 420, x: 525, t0: 27.75, d: 0.5 }, { i: 2, x0: 780, x: 640, t0: 27.9, d: 0.55 }];
const KD_EXIT5 = [[41.1, 0.3], [41.18, 0.45], [41.24, 0.32]];
function kdThief5(k, t) {
  const h = KD_HUDDLE[k], ex = KD_EXIT5[h.i], xf = (u) => (u < 41 ? kfn(u, [[h.t0, h.x0], [h.t0 + h.d, h.x]]) : kfn(u, [[ex[0], h.x], [ex[0] + ex[1] + 0.5, h.x + 900]], 'in'));
  const P = kdThief(h.i, { ...walk(xf, t, { stride: 26 * KD_THIEF[h.i].s }), dir: k === 0 ? 1 : k === 1 ? 1 : -1 }); if (t > 41) P.dir = 1;
  const lead = [520, 680]; let tg = h.i === 0 ? [380, 690] : lead;
  if (t < 29.18) { if (h.i === 0) P.handR = [70, -150 + 10 * Math.sin(t * 16) * pulse(t, 27.75, 0.8)]; }
  if (t >= 29.18 && t < 30.38) { P.tip = h.i === 0 ? 0 : 0.12; const sc = Math.floor((t - 29.18) / 0.3 + k) % 2; tg = sc ? [P.x + 400 * (k - 1 || 1), 600] : [P.x - 400 * (k - 1 || 1), 640]; }
  if (t >= 30.38 && t < 31.6) { if (h.i === 0) { P.handR = PERSON_HANDS.cupMouth.R; P.talk = talk(t, [[30.5, 31.4]]) * 0.5; P.dir = -1; } else { P.tip = 0.1; P.drop = h.i === 1 ? 6 * Math.abs(Math.sin(t * 14)) : 10 * pulse(t, 30.9, 0.6); } }
  if (t >= 31.86 && t < 33.3) { tg = [520, 260]; if (h.i === 1) { P.mouth = 'o'; P.eyes = 'wide'; if (t > 32.6) tg = lead; } if (h.i === 2) P.mouth = 'smile'; }
  if (h.i === 0 && t >= 33.3 && t < 35.08) { P.aR = [2.75, 3.05]; P.drop = -5; P.lid = 0.3; tg = [kfn(t, [[33.5, 300], [34.4, 760]]), 680]; }
  if (h.i === 0 && t >= 35.08 && t < 35.86) { P.aR = [2.75 + 0.25 * Math.sin(t * 18), 3.05 + 0.3 * Math.sin(t * 18)]; P.look = -0.5 * Math.sin(t * 18); P.mouth = 'o'; }
  if (h.i === 1 && t >= 35.86 && t < 38.0) { const deflate = t >= 37.08 ? KB(t, 37.1, 0.3) : 0; P.tip = 0.15 * (1 - deflate); P.sq = (1.04 - 0.12 * deflate) * 0.95; P.mouth = deflate > 0.5 ? 'frown' : 'smile'; P.handR = [60, -150 + 50 * deflate]; P.handL = [30, -140 + 40 * deflate]; P.y = KD_GR - 6 * (1 - deflate) * (t < 37.08 ? 1 : 0); }
  if (h.i === 0 && t >= 37.08 && t < 38.0) { P.dir = -1; P.handR = [110, -100 + 20 * KB(t, 37.1, 0.3)]; P.brow = 1; tg = [380, 760]; }
  if (h.i === 0 && t >= 38.1 && t < 38.92) { P.handR = [42, -206 + 6 * Math.abs(Math.sin((t - 38.1) * Math.PI / 0.2))]; P.mouth = 'smile'; P.lid = 0.3; P.dir = 1; }
  if (t >= 38.92 && t < 39.46) { if (h.i === 0) { P.dir = -1; P.handR = PERSON_HANDS.pointFwd.R; } tg = [190, 820]; if (t < 38.92 + stagger(k, 0.1)) tg = lead; }
  if (t >= 39.46 && t < 40.28) { const u = KB(t, 39.6, 0.5); if (h.i === 0) { P.dir = -1; P.handR = [70, -135 + 10 * u]; } tg = [440, kfn(t, [[39.7, 780], [40.2, 900]])]; }
  if (t >= 40.28 && t < 41.1) { if (h.i === 2) { P.x += tremble(t, 2); P.lid = 0.6; P.mouth = 'smile'; } if (h.i === 1 && t > 40.6) { P.x += tremble(t, 2); P.lid = 0.6; P.mouth = 'smile'; } if (h.i === 0) { P.wink = 'R'; P.gaze = [0, 0.05]; P.mouth = 'smile'; tg = null; } }
  if (t >= 41.1 && h.i === 1) P.tip = -0.12 * pulse(t, 41.2, 0.25);
  // huddle (28.5-33.3): crouched, leaning in, then they rise as the boss speaks
  const hk = t < 28.4 ? KB(t, h.t0 + h.d - 0.1, 0.3) : t < 33.3 ? 1 : 1 - KB(t, 33.3, 0.4);
  if (hk > 0 && t < 33.8) { P.sq = (P.sq ?? 1) * (1 - (h.i === 0 ? 0.05 : 0.1) * hk); if (h.i !== 0) P.tip = Math.max(P.tip || 0, 0.15 * hk); P.drop = (P.drop || 0) + (h.i === 0 ? 0 : 8 * hk); }
  if (t >= 31.86 && t < 33.3 && h.i !== 0) { tg = t < 32.5 ? [520, 260] : [h.i === 1 ? 640 : 420, 690]; }
  if (h.i === 1 && t >= 32.6 && t < 33.3) { P.handR = [14 + 6 * Math.sin(t * 22), -232]; P.mouth = 'o'; }
  if (h.i === 2 && t >= 32.5 && t < 33.4) { P.drop = (P.drop || 0) + 12 * pulse(t, 32.55, 0.8); P.lid = 0.4; P.mouth = 'smile'; }
  P.lid = Math.max(P.lid || 0, blink(t, 30 + k)); if (tg) P.gaze = lookAt(kdHead(P), tg);
  return P;
}
function kdFar5(t) {   // the ascetic waits far off while the goat grazes (small, on the far road line)
  const A = { costume: 'ascetic', s: 0.36, dir: 1, x: 190, y: 880, mouth: 'smile', lid: Math.max(0.3, blink(t, 3)), gaze: [0.5, 0.6] };
  const G = { s: 0.3, dir: 1, x: 120, y: 882, fat: 1, chew: t, headDown: 1, t }; return [A, G];
}
const KS5 = {
  a: 27.5, ww: 1000,
  cam: [[27.5, { x: 520, y: 650, zoom: 1.8 }], [35.0, { x: 520, y: 650, zoom: 1.8 }], [35.6, { x: 500, y: 690, zoom: 2.1 }], [38.0, { x: 500, y: 690, zoom: 2.1 }], [38.9, { x: 470, y: 640, zoom: 1.5 }], [41.6, { x: 470, y: 640, zoom: 1.5 }]],
  draw(ctx, t, cam) {
    countryRoad(ctx, { w: 1000, places: [{ kind: 'tree', x: 800 }], camX: cam.x - 500 / cam.zoom, house: false });
    const [A, G] = kdFar5(t); kdGoat(ctx, G); person(ctx, A);
    const T = [0, 1, 2].map((k) => kdThief5(k, t));
    for (const P of T) { halftoneShadow(ctx, P.x, KD_GR + 4, 55 * P.s, 0.3); person(ctx, P); }
    // the sack (thief 2), the imaginary rope (leader), leaves drifting
    const t2 = T[0]; if (t >= 35.86 && t < 41.4) { const h = kdHand(t2, 1), fl = t >= 41.1, sx = fl ? 400 : h[0], sy = fl ? KD_GR : h[1] + 50; kdSack(ctx, sx, sy, 0.7, t >= 37.08 ? KB(t, 37.1, 0.3) : 0);
      // v2: the red X crosses the OBJECT (the sack = force), not the label
      if (t >= 37.08 && t < 38.6) { const k = KB(t, 37.2, 0.22), cy = sy - 28, r = 36; ctx.save(); ctx.globalAlpha = kdFade(t, 37.08, 38.6, 0.15); ctx.lineCap = 'round'; for (const [w, c] of [[14, C.black], [8, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(sx - r, cy - r); ctx.lineTo(sx - r + 2 * r * k, cy - r + 2 * r * k); ctx.moveTo(sx + r, cy - r); ctx.lineTo(sx + r - 2 * r * k, cy - r + 2 * r * k); ctx.stroke(); } ctx.restore(); } }
    if (t >= 39.46 && t < 40.4) { const h = kdHand(T[1], 1), u = K.clamp((t - 39.85) / 0.4); ctx.save(); ctx.setLineDash([8, 8]); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.globalAlpha = 1 - u; ctx.beginPath(); ctx.moveTo(h[0], h[1] + u * 120); ctx.quadraticCurveTo(h[0] - 30, h[1] + 80 + u * 60, h[0] - 60, KD_GR - 10); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 2; i++) { const u = K.clamp((t - 29.18 - i * 0.4) / 2.4); if (u > 0 && u < 1) { const lx = 760 - u * 200 + 30 * Math.sin(u * 9 + i), ly = 420 + u * 470; shape(ctx, ell(lx, ly, 12, 6, 10).map(([x, y]) => [x, y + 0 * i]), '#3f9d4a', { lw: 3, seed: 95 + i }); } }
    for (const [k, [t0]] of KD_EXIT5.entries()) dustBurst(ctx, [525, 412, 640][k] + 20, KD_GR - 4, t - t0, 4, 7, 14, 30, 0.5, 40 + k);
  },
  over(ctx, t, cam, S) {
    if (t >= 31.86 && t < 35.0) { const tail = kdP(...kdHead(kdThief5(1, t)), cam); thoughtCloud(ctx, 500, 260, 560, 300, t, { p: KB(t, 31.86, 0.5), tail: [tail[0], tail[1] - 60], inside: (c) => {
      kdGoatIcon(c, -150, 20, 62); if (t > 32.3) for (const y of [-10, 10]) shape(c, K.rectPts(-26, y - 5, 52 * KB(t, 32.3, 0.2), 10), C.black, { lw: 0 }); if (t > 32.6) kdDogIcon(c, 160, 0, 52 * K.ease.back(KB(t, 32.6, 0.3)), { q: t > 32.9 }); }, at: [0, 0], scale: 1 });
      ctx.save(); ctx.globalAlpha = kdFade(t, 32.0, 35.0, 0.2); S.label(ctx, 'GOAT = DOG ?', 500, 470, KB(t, 32.0, 0.3), { align: 'center', size: 40, fill: C.yellow }); ctx.restore(); }
    if (t >= 34.3 && t < 37.0) { const [hx, hy] = kdP(...kdHead(kdThief5(1, t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 34.3, 37.0, 0.2); S.label(ctx, 'THE BOSS', 230, 330, KB(t, 34.35, 0.3), { align: 'center', size: 48, fill: C.yellow }); S.arrow(ctx, [260, 380], [hx - 60, hy - 30], KB(t, 34.45, 0.3, 'out'), { width: 16 }); ctx.restore(); }
    if (t >= 37.08 && t < 38.6) { const [sx, sy] = kdP(...kdHand(kdThief5(0, t), 1), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 37.08, 38.6, 0.2); S.label(ctx, 'NO FORCE', 500, 250, KB(t, 37.1, 0.3), { align: 'center', size: 56, fill: C.white }); ctx.restore(); }
  },
};

// ================= S6 + S7: thief 1 at the milestone =================
// v2: at 55.14 he steps aside (right) to present the whole goat; 60.92 he walks on briskly and is past thief 1 by 61.5
const KD_AX6 = (t) => (t < 60.92 ? kfn(t, [[43.6, 720], [46.4, 1040], [47.7, 1090], [55.14, 1090], [55.6, 1120]], 'out') : kfn(t, [[60.92, 1120], [61.55, 1335], [62.6, 1520]], 'lin'));
const KD_GX6 = (t) => KD_AX6(t - 0.25) - 150;
const KD_FALLS6 = footfalls(KD_AX6, 43.6, 62.7, 26);
const KD_TX6 = (t) => kfn(t, [[41.72, 880], [42.3, 1305], [47.72, 1305], [48.2, 1245], [60.7, 1245], [61.0, 1268]], 'out');
const kdUp6 = (t) => (t < 60.7 ? 0 : KB(t, 60.7, 0.3));   // thief 1 steps back upstage (behind the passing ascetic)
const KD_SKID6 = footfalls(KD_TX6, 41.72, 42.3, 26);
function kdAsc6(t) {
  const P = kdAscWalk(KD_AX6, t, { dir: 1, brow: -0.3, mouth: 'smile', handL: [-48, -96] }); const T = kdThief6raw(t), th = [T.x, 700];
  let tg = t < 46.54 ? [P.x + 300, 690] : th;
  if (t < 46.54) P.lid = 0.4;
  if (t >= 46.54 && t < 47.6) { P.drop = 6 * pulse(t, 46.7, 0.5); }
  if (t >= 47.72 && t < 48.5) { P.tip = -0.05 * pulse(t, 47.72, 0.8); P.brow = -0.6; P.mouth = 'o'; }
  if (t >= 48.5 && t < 50.8) { P.brow = -0.5; P.mouth = 'closed'; tg = t > 49.8 && t < 50.4 ? [960, 800] : th; }
  if (t >= 50.88 && t < 52.5) { tg = t < 51.4 ? [960, 800] : th; P.mouth = t > 51.54 ? 'smile' : 'closed'; }
  if (t >= 52.5 && t < 53.76) { P.lid = 1; P.mouth = 'open'; P.drop = -7; P.x += tremble(t, 2.5, 8); P.handL = [-30, -110]; P.handR = [30, -108]; }
  if (t >= 53.76 && t < 55.14) { P.mouth = 'smile'; P.wet = t < 54.6; P.handR = t < 54.4 ? [16, -200] : [kfn(t, [[54.4, 40], [54.7, 100]]), -130]; P.handRW = null; }
  if (t >= 55.14 && t < 56.8) { P.handL = [-95, -112]; P.handR = [-40, -104]; P.brow = -0.3; P.mouth = 'smile'; }
  if (t >= 56.8 && t < 58.4) { P.aR = [2.6 + 0.2 * Math.sin(t * 16), 2.9 + 0.3 * Math.sin(t * 16)]; P.look = 0.5 * Math.sin(t * 9); P.mouth = 'smile'; P.talk = talk(t, [[56.8, 58.4]]) * 0.5; }
  if (t >= 58.56 && t < 59.2) { P.handR = [22, -195]; P.eyes = 'wide'; }
  if (t >= 59.3 && t < 60.6) { P.tip = settleTo(t, 59.3, 0, 0.1); P.eyes = 'wide'; P.lid = 0.2; }
  if (t >= 60.6) { P.tip = settleTo(t, 60.6, 0.12, 0); P.mouth = 'smile'; P.look = 0.4 * Math.sin(t * 8) * (t < 61.5 ? 1 : 0); tg = [P.x + 300, 690]; if (t < 61.0) P.handL = [-48, -96 + 10 * pulse(t, 60.7, 0.3)]; }
  if (t >= 52.5 && t < 61.0) P.talk = Math.max(P.talk || 0, talk(t, [[54.44, 55.0], [55.14, 55.9], [56.8, 58.4], [58.56, 60.1]]) * 0.6);
  if (t >= 45.26 && t < 46.5) P.lid = 0.4;
  if (P.lid < 1) P.lid = Math.max(P.lid || 0, blink(t, 3)); P.gaze = lookAt(kdHead(P), tg);
  return P;
}
function kdThief6raw(t) { return { x: KD_TX6(t) }; }
function kdThief6(t) {
  const P = kdThief(0, { ...walk(KD_TX6, t), dir: -1 }); const A = { x: KD_AX6(t) }, ah = [A.x, 700], gh = [KD_GX6(t) + 70, 790];
  let tg = ah, skew = 0.3;
  if (t < 42.3) { P.tip = 0.2 * (t > 41.9 ? 1 - KB(t, 42.1, 0.3) : 0); P.amp = Math.min(P.amp, 1); }
  if (t >= 42.3 && t < 42.9) { P.handR = [10, -230]; P.handL = [-10, -232]; P.look = Math.sin((t - 42.3) * 20) > 0 ? 1 : -1; tg = null; P.gaze = [P.look, 0]; }
  if (t >= 42.9 && t < 47.6) { P.handRW = [1280, 822]; P.tip = -0.12; P.mouth = 'o'; tg = ah; if (t < 43.9) { P.handL = [-24, -236]; skew = blend(t, 43.0, 43.8, 0.3, 0.05); } else skew = 0.05; }
  if (t >= 44.02 && t < 46.54) { P.wink = 'L'; P.lid = 0; }
  if (t >= 47.0 && t < 47.72) { P.sq = anticipate(t, 47.3, 0.4, 0.06); }
  if (t >= 47.72) skew = 0.05;
  if (t >= 47.72 && t < 48.5) { P.handRW = null; P.handR = PERSON_HANDS.wave.R; P.tip = 0; P.mouth = 'closed'; }
  if (t >= 48.5 && t < 49.5) { P.eyes = 'wide'; P.mouth = 'o'; const k = t < 48.75 ? 0 : t < 49.0 ? 1 : 2; tg = [gh, [1600, 600], gh][k]; P.look = [0.6, -0.8, 0.6][k]; if (k === 2) { P.sq = settleTo(t, 49.0, 1.0, 1.06, 0.2); P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; } }
  if (t >= 49.62 && t < 50.88) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.tilt = 0.12; P.talk = talk(t, [[49.62, 50.8]]) * 0.7; }
  if (t >= 50.88 && t < 51.54) { P.aR = [1.25, 1.38]; P.tip = 0.06; P.talk = talk(t, [[50.88, 51.5]]) * 0.7; tg = gh; }   // v2: the arm points at the goat
  if (t >= 51.54 && t < 52.5) { P.handL = [-70, -170]; P.look = -0.4; P.talk = talk(t, [[51.54, 52.4]]) * 0.6; }
  if (t >= 52.5 && t < 59.3) { P.mouth = 'o'; P.eyes = 'wide'; if (t > 53.9 && t < 54.6) P.tip = -0.05; }
  if (t >= 59.3 && t < 60.7) { P.tip = -0.17 * KB(t, 59.3, 0.3); P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.eyes = 'wide'; P.mouth = 'o'; }
  // v2: 60.7 a small bow, 'after you' (arm sweeps toward the road); 61.52 back turned: the surprised face drops, smirk, point ahead to the next man
  if (t >= 60.7 && t < 61.52) { P.eyes = 'wide'; P.mouth = 'smile'; tg = ah; P.tip = 0.22 * pulse(t, 60.75, 0.75); P.aR = [0.9, 1.3 + 0.2 * KB(t, 60.8, 0.3)]; P.handL = [-34, -112]; }
  if (t >= 61.52) { P.dir = 1; P.lid = 0.4; P.eyes = 'open'; P.mouth = 'smile'; P.wink = 'L'; P.tilt = 0.08; P.aR = [1.45 + 0.04 * Math.sin(t * 9), 1.5]; tg = [1800, 700]; P.handL = PERSON_HANDS.hipsHands.L; }
  P.skew = skew; const up = kdUp6(t); P.y = KD_GR - 22 * up; P.s = 1 - 0.06 * up; kdLife(P, t, 13, tg); return P;
}
function kdGoat6(t) {
  const G = kdGoatAt(KD_GX6, t); G.y -= Math.abs(Math.sin(G.ph * 2)) * 3 * G.amp; G.gaze = [1, -0.1];
  if (t >= 50.88 && t < 52.3) { G.gaze = [0.6, -0.8]; G.headTilt = -0.1; }
  if (t >= 55.94 && t < 56.7) { G.talk = 1; G.headTilt = -0.3; G.earLift = -0.8; G.gaze = [0.3, -0.7]; }
  if (t >= 61.0 && t < 62.6) G.gaze = lookAt(kdGoatHead(G), [KD_TX6(t), 700]);
  return G;
}
function kdDrawRoadTrio(ctx, t, A, G, T, ropeLen = 110, ropeHand = 0, goatFront = false) {
  if (!goatFront) { kdGoatShadow(ctx, G); kdGoat(ctx, G); } halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A); if (goatFront) { kdGoatShadow(ctx, G); kdGoat(ctx, G); }
  if (T) { halftoneShadow(ctx, T.x, KD_GR + 4, 60 * T.s, 0.3); person(ctx, T); }
  const nk = kdGoatNeck(G); kdLoop(ctx, nk, 0.85); kdRope(ctx, kdHand(A, ropeHand), nk, ropeLen);
}
const KS6 = {
  a: 41.4, ww: KD_RW,
  cam: [[41.4, { x: 1180, y: 670, zoom: 1.6 }], [47.7, { x: 1180, y: 670, zoom: 1.6 }], [48.5, { x: 1082, y: 740, zoom: 2.3 }], [60.6, { x: 1082, y: 740, zoom: 2.3 }], [61.4, { x: 1250, y: 715, zoom: 2.0 }], [63.3, { x: 1330, y: 715, zoom: 2.0 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 1220); cloudFlat(ctx, 900 + t * 5, 260, 0.7);
    const A = kdAsc6(t), G = kdGoat6(t), T = kdThief6(t), upT = t >= 60.7;
    if (upT) { halftoneShadow(ctx, T.x, T.y + 4, 60 * T.s, 0.3); person(ctx, T); kdTurban(ctx, T, T.skew); }
    kdDrawRoadTrio(ctx, t, A, G, upT ? null : T, t > 60.9 && t < 61.2 ? 60 : 110);
    if (!upT) kdTurban(ctx, T, t < 42.3 ? 0 : T.skew);
    for (const f of KD_FALLS6) if (Math.abs(t - f.t) < 0.6) dustBurst(ctx, f.x + (f.odd ? 14 : -14), KD_GR - 2, t - f.t, 3, 5, 10, 20, 0.45, Math.round(f.t * 10));
    for (const f of KD_SKID6) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 4, 7, 14, 30, 0.5, Math.round(f.t * 10));
    kdNotes(ctx, kdHead(T)[0] - 30, kdHead(T)[1] - 30, t, 43.0, 44.0); kdNotes(ctx, kdHead(A)[0], kdHead(A)[1] - 30, t, 45.26, 46.5);
  },
  over(ctx, t, cam, S) {
    const T = kdThief6(t), [hx, hy] = kdP(...kdHead(T), cam);
    if (t >= 42.92 && t < 45.2) { ctx.save(); ctx.globalAlpha = kdFade(t, 42.92, 45.2, 0.2); S.label(ctx, 'THIEF 1', hx + 40, hy - 230, KB(t, 42.95, 0.3), { align: 'center', size: 50, fill: C.yellow }); S.arrow(ctx, [hx + 40, hy - 190], [hx + 8, hy - 70], KB(t, 43.05, 0.3, 'out'), { width: 16 }); ctx.restore(); }
    if (t >= 50.88 && t < 57.7) { const pop = t > 57.4 ? 1 - KB(t, 57.4, 0.3) : 1; ctx.save(); ctx.globalAlpha = pop; const bx = hx - 255, by = hy - 225;
      bubble(ctx, bx - 20, by + 10, 250, 200, hx - 20, hy - 50, KB(t, 50.9, 0.3), ''); if (t > 51.0) kdDogIcon(ctx, bx - 34, by + 14, 62, { q: true, cross: t > 56.9 ? KB(t, 56.9, 0.3) : 0 }); ctx.restore(); }
    kdDogCounter(ctx, t, S);
    if (t >= 52.5 && t < 54.0) { const [ax, ay] = kdP(...kdHead(kdAsc6(t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 52.5, 54.0, 0.2); sfx(ctx, 'HA HA!', ax - 150, ay - 160, 64, KB(t, 52.55, 0.3), { rot: -0.12 }); ctx.restore(); }
    if (t >= 55.94 && t < 57.3) { const [gx, gy] = kdP(...kdGoatHead(kdGoat6(t)), cam); ctx.save(); ctx.globalAlpha = kdFade(t, 55.94, 57.3, 0.2); sfx(ctx, 'MEH!', gx + 60, gy - 120, 56, KB(t, 55.96, 0.25), { rot: 0.1, fill: C.white });
      S.label(ctx, 'GOAT', gx - 190, gy - 70, KB(t, 56.1, 0.3), { align: 'center', size: 46, fill: C.yellow }); S.arrow(ctx, [gx - 170, gy - 30], [gx - 130, gy + 30], KB(t, 56.2, 0.3, 'out'), { width: 14 }); ctx.restore(); }
  },
};
// the DOG? counter, top-right of the picture: 1 at 50.88, 2 at 73.60, 3 at 91.46 (+ stamp 3 OUT OF 3), gone at 95.0
function kdDogCounter(ctx, t, S) {
  if (t < 50.88 || t >= 95.0) return; const on = [50.88, 73.60, 91.46], n = on.filter((x) => t >= x).length, last = on[n - 1];
  ctx.save(); ctx.globalAlpha = Math.min(K.clamp((t - 50.88) / 0.2), K.clamp((95.0 - t) / 0.3));
  S.label(ctx, 'DOG?', 830, 150, 1, { align: 'center', size: 44, fill: C.white }); S.counter(ctx, n, 830, 285, KB(t, last, 0.3), { size: 96 });
  if (n === 3) { const k = K.ease.back(KB(t, 91.6, 0.3)); ctx.translate(200, 190); ctx.rotate(-0.12); ctx.scale(k, k); S.label(ctx, '3 OUT OF 3', 0, 0, 1, { align: 'center', size: 44, fill: C.red, color: C.white }); }
  ctx.restore();
}
const KS7 = KS6;   // the same shot continues (S7 52.3-62.6)

// ================= S8: thief 2 at the bush (after A LITTLE LATER...) =================
const KD_AX8 = (t) => kfn(t, [[63.25, 1380], [66.6, 1560]], 'out');
const KD_GX8 = (t) => KD_AX8(t - 0.25) + 80;
const KD_FALLS8 = footfalls(KD_AX8, 63.25, 66.7, 26);
// v2: thief 2 leaves to the RIGHT past the bush (76.26-77.2), peeks back from the frame edge at 77.3 (drawn in S9), then ducks out
const KD_TX8 = (t) => (t < 76.26 ? kfn(t, [[65.62, 1800], [67.5, 1770]]) : t < 77.3 ? kfn(t, [[76.26, 1770], [77.2, 1990]], 'in') : kfn(t, [[77.3, 1990], [77.5, 1925], [77.8, 1925], [78.0, 2060]], 'inOut'));
function kdAsc8(t) {
  const P = kdAscWalk(KD_AX8, t, { dir: 1, brow: -0.3, mouth: 'smile', handR: [56, -100] }); const th = [KD_TX8(t), 720]; let tg = th;
  if (t < 64.88) { P.look = 0.3 * Math.sin(t * 8); tg = [P.x + 300, 700]; }
  if (t >= 72.22 && t < 73.6) P.sq = settleTo(t, 72.3, 1, 1.03);
  if (t >= 73.6) { P.mouth = 'closed'; P.brow = -0.4; P.sq = 1.0; }
  if (t >= 75.0) { tg = kdGoatHead(kdGoat8(t)); P.mouth = 'closed'; }
  if (t >= 76.26) tg = t < 76.6 ? kdGoatHead(kdGoat8(t)) : [KD_TX8(t), 720];
  return kdLife(P, t, 3, tg);
}
function kdGoat8(t) {
  const G = kdGoatAt(KD_GX8, t); G.gaze = [1, 0];
  if (t >= 67.6 && t < 70.6) { G.gaze = [1, -0.2]; G.lid = t > 68.6 && t < 69.0 ? 0.9 : 0.25; G.earLift = 0.6 * pulse(t, 68.9, 0.25); }
  if (t >= 73.6 && t < 74.3) G.gaze = [1, -0.5];
  if (t >= 76.26) G.gaze = lookAt(kdGoatHead(G), [KD_TX8(t), 720]);
  return G;
}
function kdThief8(t) {
  const rise = t < 64.88 ? 0 : KB(t, 64.88, 0.6, 'out'), P = kdThief(1, { ...walk(KD_TX8, t, { stride: 23 }), dir: -1 }); P.y = KD_GR + 210 * (1 - rise);
  const ah = kdHead({ costume: 'ascetic', x: KD_AX8(t), y: KD_GR, s: 1, dir: 1 }), gh = kdGoatHead(kdGoatAt(KD_GX8, t)); let tg = ah, slip = 0, sw = 0;
  if (t < 65.62) { P.handR = t > 65.1 ? [30, -205] : null; P.handL = t > 65.1 ? [-30, -205] : null; tg = [P.x, 500]; }
  if (t >= 65.62 && t < 67.6) { P.aL = [-0.45, -0.2]; P.aR = [-0.45, -0.2]; tg = [P.x - 100, 300]; P.mouth = 'o'; }
  if (t >= 67.6 && t < 70.58) { P.tip = settleTo(t, 67.6, 0, 0.3); P.eyes = 'wide'; tg = gh; sw = swing(t, 67.7, 0.5); }
  if (t >= 69.2 && t < 70.58) { P.eyes = 'open'; if (t < 69.8) { P.handL = [-14, -198 + 4 * Math.sin(t * 30)]; P.handR = [14, -198 - 4 * Math.sin(t * 30)]; } else { const k = Math.floor((t - 69.8) / 0.22) % 3; tg = [gh, ah, gh][k]; } slip = t < 70.2 ? K.clamp((t - 69.3) / 0.4) * 0.7 : 0.7 * (1 - KB(t, 70.2, 0.25)); if (t > 70.15 && t < 70.45) P.handL = [-24, -170]; }
  if (t >= 70.58 && t < 72.22) { P.tip = settleTo(t, 70.58, 0.3, 0); P.handR = PERSON_HANDS.chest.R; P.talk = talk(t, [[70.6, 72.1]]) * 0.7; tg = ah; }
  if (t >= 72.22 && t < 73.0) { const u = KB(t, 72.22, 0.6); P.handR = [95, K.lerp(-200, -70, u)]; P.talk = talk(t, [[72.22, 72.9]]) * 0.7; tg = [ah[0], K.lerp(ah[1], 880, u)]; }
  if (t >= 73.0 && t < 73.6) { P.handR = [70, -125]; P.mouth = 'frown'; }
  if (t >= 73.6 && t < 74.38) { P.handR = [90, -80]; tg = gh; P.talk = talk(t, [[73.6, 74.3]]) * 0.7; }
  if (t >= 74.38 && t < 75.0) { P.aR = [-1.6 + 1.2 * KB(t, 74.4, 0.5), -1.6 + 1.2 * KB(t, 74.4, 0.5)].map((v) => -v); P.look = Math.sin((t - 74.38) * 14) > 0 ? 1 : -1; tg = null; P.gaze = [P.look, 0]; }
  if (t >= 75.0 && t < 76.26) { P.lid = 0.5; P.mouth = 'frown'; P.look = 0.5 * Math.sin((t - 75) * 5); P.talk = talk(t, [[75.0, 76.2]]) * 0.4; }
  if (t >= 76.26 && t < 77.3) { P.dir = 1; const sw = Math.sin(P.ph); P.aL = [0.5 * sw, 0.3 * sw]; P.aR = [-0.5 * sw, -0.3 * sw]; tg = [P.x + 300, 700]; P.lid = 0.4; P.mouth = 'frown'; }
  if (t >= 77.3) { P.dir = -1; P.amp = 0; P.tip = 0.28 * pulse(t, 77.3, 0.7); P.eyes = 'wide'; P.mouth = 'o'; tg = ah; P.handR = [40, -150]; slip = K.clamp((t - 77.35) / 0.3) * 0.9; }
  P.slip = slip; P.swingA = sw; P.fx = rise < 1 || t < 65.8;   // behind the bush until he steps out
  kdLife(P, t, 22, tg); return P;
}
const KS8 = {
  a: 63.25, ww: KD_RW,
  cam: [[63.25, { x: 1650, y: 690, zoom: 1.7 }], [67.6, { x: 1650, y: 690, zoom: 1.7 }], [68.3, { x: 1700, y: 750, zoom: 2.2 }], [70.9, { x: 1700, y: 750, zoom: 2.2 }], [71.6, { x: 1650, y: 700, zoom: 1.85 }], [77.1, { x: 1650, y: 700, zoom: 1.85 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 1520);
    const A = kdAsc8(t), G = kdGoat8(t), T = kdThief8(t);
    const beard = () => { if (t > 65.1) { ctx.save(); ctx.globalAlpha = K.clamp((t - 65.1) / 0.2); kdFalseBeard(ctx, T, T.slip, T.swingA); ctx.restore(); } };
    if (T.fx) { kdBehind(ctx, () => { person(ctx, T); beard(); }); for (let i = 0; i < 3; i++) { const u = K.clamp((t - 65.0 - i * 0.12) / 0.9); if (u > 0 && u < 1) shape(ctx, ell(T.x - 30 + i * 30 + 20 * Math.sin(u * 8 + i), KD_GR - 200 + u * 190, 11, 6, 10), '#3f9d4a', { lw: 3, seed: 97 + i }); } }
    kdFront(ctx, [2]);
    kdGoatShadow(ctx, G); kdGoat(ctx, G); halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A);
    const nk = kdGoatNeck(G); kdLoop(ctx, nk, 0.85); kdRope(ctx, kdHand(A, 1), nk, 80);
    if (!T.fx) { const T2 = { ...T, y: KD_GR + 8 }; halftoneShadow(ctx, T2.x, KD_GR + 12, 55, 0.3); person(ctx, T2); kdFalseBeard(ctx, T2, T.slip, T.swingA); }
    for (const f of KD_FALLS8) if (Math.abs(t - f.t) < 0.6) dustBurst(ctx, f.x + (f.odd ? 14 : -14), KD_GR - 2, t - f.t, 3, 5, 10, 20, 0.45, Math.round(f.t * 10));
    if (t >= 65.62 && t < 67.6) kdNotes(ctx, kdHead(T)[0] - 30, kdHead(T)[1] - 20, t, 65.7, 67.5);
  },
  over(ctx, t, cam, S) {
    const T = kdThief8(t), [hx, hy] = kdP(...kdHead({ ...T, y: T.fx ? T.y : KD_GR + 8 }), cam);
    if (t >= 65.62 && t < 67.6) { ctx.save(); ctx.globalAlpha = kdFade(t, 65.62, 67.6, 0.2); S.label(ctx, 'THIEF 2', hx + 120, hy - 220, KB(t, 65.65, 0.3), { align: 'center', size: 50, fill: C.yellow }); S.arrow(ctx, [hx + 110, hy - 180], [hx + 30, hy - 70], KB(t, 65.75, 0.3, 'out'), { width: 16 }); ctx.restore(); }
    if (t >= 73.6 && t < 75.6) { ctx.save(); ctx.globalAlpha = kdFade(t, 73.6, 75.6, 0.2); const bx = hx + 150, by = hy - 220; bubble(ctx, bx, by, 240, 190, hx + 30, hy - 60, KB(t, 73.62, 0.3), ''); if (t > 73.7) kdDogIcon(ctx, bx - 14, by + 4, 60, { q: true }); ctx.restore(); }
    kdDogCounter(ctx, t, S);
    if (t >= 75.0 && t < 76.2) { ctx.save(); ctx.globalAlpha = kdFade(t, 75.0, 76.2, 0.15); sfx(ctx, 'TSK TSK', hx + 130, hy - 90, 40, KB(t, 75.05, 0.25), { rot: 0.1, fill: C.white }); ctx.restore(); }
  },
};

// ================= S9: he stops; the first doubt (v2: one continuous geography with S8, goat ahead, no bump) =================
// 76.95 he walks on; 78.04 (real onset of the word) he stops dead mid-step; the goat walks one more step, the rope goes taut (TUG),
// the goat turns round to face him and stays in front of him, head clear of his robe (drawn after him)
const KD_STOP9 = 78.04;
const KD_AX9 = (t) => kfn(t, [[76.95, 1560], [KD_STOP9, 1630]], 'in');
const KD_GX9 = (t) => (t < KD_STOP9 ? KD_AX9(t - 0.25) + 80 : kfn(t, [[KD_STOP9, KD_AX9(KD_STOP9 - 0.25) + 80], [78.3, 1838], [78.42, 1830]], 'out'));
function kdAsc9(t) {
  const P = kdAscWalk(KD_AX9, t, { dir: 1, brow: -0.3, mouth: 'closed', handR: [56, -100] }); let tg = [1900, 700];
  if (t >= 76.95 && t < KD_STOP9) P.amp = Math.max(P.amp, 0.7);
  if (t >= KD_STOP9) { P.amp = 0; P.sq = settleTo(t, KD_STOP9, 0.96, 1, 0.4); P.tip = -0.07 * pulse(t, KD_STOP9, 0.5); P.eyes = t < 78.5 ? 'wide' : 'open'; P.brow = -0.5; }
  if (t >= 78.3 && t < 78.6) P.handR = [64, -102 + 6 * pulse(t, 78.3, 0.25)];
  if (t >= 78.6) { P.lid = 0.2; tg = gazePlan(t, [[78.6, [2000, 690]], [79.4, [1780, 790]]], 0.3); }
  if (t >= 79.3) { P.brow = -0.5; P.handL = [16 + 2 * Math.sin(t * 6), -160]; }
  if (t >= 80.72) { tg = gazePlan(t, [[80.72, [1780, 420]], [81.8, [1720, 420]], [82.2, [1860, 420]], [82.6, [1720, 420]]], 0.07); P.lid = 0; }
  if (t >= 83.12) { tg = kdGoatHead(kdGoat9(t)); P.handL = null; P.lid = (t > 83.5 && t < 83.62) || (t > 83.72 && t < 83.84) ? 1 : 0; P.eyes = t > 83.25 && t < 83.5 ? 'wide' : 'open'; P.tip = 0.06 * K.clamp((t - 83.12) / 0.3); }
  if (P.lid < 1) P.lid = Math.max(P.lid || 0, t < 78.6 ? blink(t, 3) : 0); P.gaze = lookAt(kdHead(P), tg); return P;
}
function kdGoat9(t) {
  const G = kdGoatAt(KD_GX9, t); const tf = turnFlip(t, [[0, 1], [78.5, -1]], 0.6); G.dir = tf.dir; G.y += 6 * tf.sink; G.gaze = [1, -0.1];
  if (t >= 78.25 && t < 78.55) { G.tip = 0.07 * pulse(t, 78.25, 0.3); G.sq = 0.95; G.earLift = 0.8; }
  if (t >= 79.1) { G.gaze = lookAt(kdGoatHead(G), kdHead({ costume: 'ascetic', x: KD_AX9(t), y: KD_GR, s: 1, dir: 1 })); G.lid = Math.max(pulse(t, 80.2, 0.5), pulse(t, 82.1, 0.5)) * 0.95; }
  if (t >= 83.12 && t < 83.46) { G.asDog = 0.55; G.earLift = -0.6; }
  if (t >= 83.46) { G.gaze = [0.6, -0.5]; G.headTilt = -0.12; }
  return G;
}
const KS9 = {
  a: 77.0, ww: KD_RW,
  cam: [[77.0, { x: 1650, y: 700, zoom: 1.85 }], [78.0, { x: 1650, y: 700, zoom: 1.85 }], [79.0, { x: 1730, y: 710, zoom: 1.85 }], [82.4, { x: 1730, y: 710, zoom: 1.95 }], [83.05, { x: 1700, y: 745, zoom: 2.25 }], [84, { x: 1700, y: 745, zoom: 2.25 }]],
  draw(ctx, t, cam) {
    kdRoad(ctx, cam, 1520);
    // thief 2 leaving right and peeking back from the frame edge (77.0-78.0)
    if (t < 78.0) { const T = kdThief8(t), T2 = { ...T, y: KD_GR + 8 }; halftoneShadow(ctx, T2.x, KD_GR + 12, 55, 0.3); person(ctx, T2); kdFalseBeard(ctx, T2, T.slip, T.swingA); }
    kdFront(ctx, [2]);
    const A = kdAsc9(t), G = kdGoat9(t);
    halftoneShadow(ctx, A.x, KD_GR + 4, 60, 0.3); person(ctx, A); kdGoatShadow(ctx, G); kdGoat(ctx, G);
    const nk = kdGoatNeck(G), hd = kdHand(A, 1), dd = Math.hypot(nk[0] - hd[0], nk[1] - hd[1]); kdLoop(ctx, nk, 0.85); kdRope(ctx, hd, nk, t < KD_STOP9 ? 80 : Math.max(dd, t < 78.25 ? dd + 40 : t < 78.6 ? dd : dd + 30));
    kdHandsOver(ctx, A, [1]);
    if (t < 78.1) for (const f of footfalls(KD_AX9, 76.95, KD_STOP9, 26)) dustBurst(ctx, f.x, KD_GR - 2, t - f.t, 3, 5, 10, 20, 0.45, 9);
    const h = kdHead(A); kdSweat(ctx, h[0] + 34, h[1] - 20, t, 82.0);
    if (t >= 78.25 && t < 78.9) { ctx.save(); ctx.globalAlpha = kdFade(t, 78.25, 78.9, 0.1); sfx(ctx, 'TUG', (hd[0] + nk[0]) / 2, Math.min(hd[1], nk[1]) - 50, 30, KB(t, 78.25, 0.15), { fill: C.white, rot: -0.15 }); ctx.restore(); }
  },
  over(ctx, t, cam, S) {
    if (t >= 80.72 && t < 83.1) { const tail = kdP(...kdHead(kdAsc9(t)), cam); ctx.save(); ctx.globalAlpha = K.clamp((83.1 - t) / 0.2); thoughtCloud(ctx, 560, 290, 400, 250, t, { p: KB(t, 80.72, 0.45), tail: [tail[0] + 30, tail[1] - 70], inside: (c) => {
      kdThiefHead(c, -80, 0, 44, 0); kdThiefHead(c, 80, 0, 44, 1); kdDogIcon(c, -30, 50, 20); kdDogIcon(c, 130, 50, 20); }, at: [0, 0], scale: 1 }); ctx.restore(); }
  },
};
