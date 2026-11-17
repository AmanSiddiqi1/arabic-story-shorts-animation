// ===== KD-005 scenes S6-S8: "do not!", the replay strike, strength is not the answer, the whisper, the plan board =====

// ---------------- S6 44.0-58.0 ----------------
const K5S6 = { a: 44.0, ww: 1000, cam: [[44, { x: 555, y: 640, zoom: 1.45 }], [51.69, { x: 545, y: 650, zoom: 1.5 }], [51.7, { x: 850, y: 850, zoom: 2.4 }], [52.59, { x: 850, y: 850, zoom: 2.4 }], [52.6, { x: 420, y: 730, zoom: 1.8 }], [55.9, { x: 420, y: 730, zoom: 1.8 }], [57.6, { x: 340, y: 770, zoom: 2.2 }], [58, { x: 340, y: 770, zoom: 2.2 }]],
  rv(t) {
    const P = { x: 428, y: 686, dir: -1, seed: 3, sq: 1.04 * breathe(t, 3), gaze: lookAt([395, 610], [300, 780]), lid: Math.max(0.25, blink(t, 3)) };
    if (t >= 44.2 && t < 46.54) P.gaze = lookAt([395, 610], [K5_CLOUD[0], K5_CLOUD[1]]);
    if (t >= 46.54) { P.sq = settleTo(t, 46.54, 1.04, 0.9, 0.2, 0.15); P.eyes = 'wide'; P.lid = 0; P.gaze = lookAt([395, 610], [300, 780]); P.x = 428 + 6 * K5_B(t, 46.54, 0.15); }
    if (t >= 48.1 && t < 50.9) { P.gaze = t < 49.5 ? lookAt([395, 610], [790, 560]) : [0.5, kfn(t, [[49.5, -0.2], [50.8, 1]])]; P.drop = 4 + 6 * K5_B(t, 49.5, 1.2); }
    if (t >= 50.9) { P.sq = 0.85 + 0.02 * Math.sin(t * 30) * (t < 51.7 ? 1 : 0); P.eyes = 'wide'; P.sag = 0.45; P.x = 434 + tremble(t, 1.5) * (t < 51.7 ? 1 : 0); P.drop = 6; P.beak = pulse(t, 51.0, 0.25) * 0.6; }
    if (t >= 52.7) { P.eyes = 'open'; P.sq = 0.95; P.sag = -0.55 - 0.2 * Math.max(0, Math.sin((t - 52.7) * 12)); P.gaze = [0.6, -0.4]; P.headRot = 0.15; P.drop = 0; }
    if (t >= 53.4) { P.sag = blend(t, 53.4, 54.0, -0.6, 0.35); P.gaze = lookAt([395, 610], [300, 780]); P.headRot = 0; P.drop = 5; P.lid = Math.max(0.3, blink(t, 3)); }
    if (t >= 54.3) { P.sag = 0.2; P.drop = 0; P.sq = 1; }
    if (t >= 55.9) { P.gaze = lookAt([395, 610], [300, 790]); P.headRot = -0.15; P.drop = -3; P.tip = 0.05; }
    return P;
  },
  jk(t) {
    const P = { x: 200, y: K5_GR, s: 0.8, dir: 1, seed: 7, sit: 0.4, plant: true, gaze: lookAt([300, 780], [420, 620]), tailUp: 0.4, headUp: -0.12 };
    if (t >= 44.2) { const up = K5_B(t, 44.6, 0.6, 'inOut'); P.sit = 0.4 * (1 - up) + 0.06 * pulse(t, 44.2, 0.4); P.plant = up < 0.9; P.gaze = gazePlan(t, [[44.2, [1, -0.4]], [44.9, [0.3, -0.2]], [45.3, [1, -0.4]], [45.7, [0.3, -0.2]], [46.1, [0.9, -0.5]]], 0.12); P.rot = Math.sin((t - 44.2) * 9) * 0.03 * (t < 46.3 ? 1 : 0); P.ears = 0; }
    if (t >= 46.54) { P.raise = K5_B(t, 46.54, 0.1); P.brow = 1; P.talk = k5Talk(t, [[46.54, 48.08], [48.08, 52.66]], 0.9); P.mouth = t < 47.4 ? 'open' : 'closed'; P.gaze = lookAt([300, 780], [420, 620]); }
    if (t >= 48.2) { P.raise = blend(t, 48.2, 48.5, 1, 0); P.brow = 0.4; P.gaze = lookAt([300, 780], [700, 520]); }
    if (t >= 50.9) { P.gaze = lookAt([300, 780], [420, 620]); P.brow = 0; }
    if (t >= 51.7) { P.drop = 6; }
    if (t >= 53.4) { P.gaze = gazePlan(t, [[53.4, [1, -0.3]], [53.8, [0.4, -0.1]], [54.1, [1, -0.3]]], 0.25); P.lid = Math.max(0.45, blink(t, 7)); P.drop = 4; P.talk = k5Talk(t, [[52.66, 55.94]], 0.6); }
    if (t >= 54.28) { P.raise = 0.85 + 0.15 * (pulse(t, 54.28, 0.25) + pulse(t, 54.8, 0.25)); P.headUp = -0.05 + 0.08 * (pulse(t, 54.28, 0.25) + pulse(t, 54.8, 0.25)); P.mouth = 'smile'; P.lid = Math.max(0.2, blink(t, 7)); P.gaze = lookAt([300, 780], [420, 620]); }
    if (t >= 55.9) { P.gaze = gazePlan(t, [[55.9, [1, 0.3]], [56.15, lookAt([300, 780], [420, 620])]], 0.07); P.drop = 12; P.ears = 0.5; P.raise = 0.5 + 0.35 * Math.max(0, Math.sin((t - 55.94) * 14)) * (t < 56.6 ? 1 : 0); P.headUp = 0.05; P.talk = k5Talk(t, [[55.94, 58.26]], 0.5); }
    if (t >= 56.6) { P.mouth = 'smile'; P.lid = Math.max(0.45, blink(t, 7)); P.tailUp = 0.45 + 0.35 * pulse(t, 56.9, 0.35); P.raise = blend(t, 56.6, 57.0, 0.5, 0); }
    return P;
  },
  draw(ctx, t) {
    k5Home(ctx, t);
    const ins = t >= 51.7 && t < 52.6; k5Burrow(ctx, ...K5_HOME.burrow, { eyes: ins ? { open: K5_B(t, 51.75, 0.15), look: [-0.6, -0.4] } : null });
    if (ins) { const tg = pulse(t, 52.0, 0.35); if (tg > 0) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 3; ctx.lineCap = 'round'; const [bx, by] = K5_HOME.burrow, L = 30 * tg; ctx.beginPath(); ctx.moveTo(bx - 2, by - 14); ctx.lineTo(bx - 2 - L, by - 10); ctx.lineTo(bx - 8 - L, by - 15); ctx.moveTo(bx - 2 - L, by - 10); ctx.lineTo(bx - 8 - L, by - 6); ctx.stroke(); ctx.restore(); } }
    const J = this.jk(t); k5Jackal(ctx, J); const P = this.rv(t); k5Raven(ctx, P, t);
    k5Cloud(ctx, t, k5HeadPos(P));
    if (t >= 49.5 && t < 51.4) { const u = k5u(t, 49.5, 50.8), x = 640 - 40 * u, y = fallY(t, 49.5, 50.8, 600, 930); if (y < 925) bird(ctx, { kind: 'crow', x, y, s: 0.5, fly: true, flap: -0.8, rot: u * 9, eyes: 'x' }); for (let i = 0; i < 2; i++) feather(ctx, t, { t0: 49.6 + i * 0.2, t1: 51.5, a: [640, 610], b: [600 + i * 80, 880], col: '#2a2a33' }); }
    if (t >= 54.28 && t < 55.9) { const sp = pulse(t, 54.28, 0.4) + pulse(t, 54.8, 0.4); k5Spark(ctx, J.x + 80, 735, 22 * sp, t * 3); }
  },
  over(ctx, t, cam, S) {
    if (t >= 46.6 && t < 48.0) { const [x, y] = k5P(380, 700, cam); sfx(ctx, 'NO!', x, y - 40, 84, K5_B(t, 46.6, 0.2), { rot: -0.1, fill: C.red }); }
    if (t >= 48.9 && t < 50.2) { const [x, y] = k5P(K5_CLOUD[0] + 40, K5_CLOUD[1] - 150, cam); sfx(ctx, 'SNAP!', x, y, 72, K5_B(t, 48.9, 0.2), { rot: 0.1 }); }
  } };

// ---------------- S7 58.0-63.4: hop down, lean in, the whisper ----------------
const K5S7 = { a: 58.0, ww: 1000, cam: [[58, { x: 400, y: 760, zoom: 1.7 }], [59.0, { x: 360, y: 790, zoom: 1.9 }], [62.7, { x: 340, y: 795, zoom: 2.6 }], [63.4, { x: 330, y: 790, zoom: 4.6 }]],
  rv(t) {
    const P = { x: 428, y: 686, dir: -1, seed: 3 };
    P.sq = anticipate(t, 58.0, 0.26, 0.16);
    if (t >= 58.26) { const f = k5u(t, 58.26, 58.9); P.x = K.lerp(428, 400, f); P.y = K.lerp(686, 862, f * f) - 70 * Math.sin(Math.PI * f) * (1 - f * 0.5); if (f < 1) { P.fly = true; P.flap = 0.5 + 0.3 * Math.sin(t * 14); P.sq = 1.1; } else P.sq = landSquash(t, 58.9, 0.18); }
    if (t >= 59.1) { const [hx, hy] = hop(t, 59.1, 0.35, 400, 378, 14); P.x = hx; P.y = 862 - hy; P.sq = landSquash(t, 59.45, 0.12); P.tailDrop = -0.5 * pulse(t, 59.45, 0.3); }
    P.gaze = lookAt(k5HeadPos(P), [320, 770]);
    if (t >= 59.86) { P.headRot = 0.35 * K5_B(t, 59.86, 0.25); P.gaze = lookAt(k5HeadPos(P), [320, 760]); }
    if (t >= 61.9) { P.eyes = t > 62.2 ? 'wide' : 'open'; P.drop = 5 * (pulse(t, 62.0, 0.2) + pulse(t, 62.4, 0.2)); P.gaze = gazePlan(t, [[61.9, [-0.8, -0.6]], [62.05, [-0.4, -0.2]], [62.25, [-0.9, -0.7]], [62.45, [-0.5, -0.5]]], 0.07); }
    return P;
  },
  jk(t) { const P = { x: 200, y: K5_GR, s: 0.8, dir: 1, seed: 7, mouth: 'smile', lid: Math.max(0.35, blink(t, 7)), gaze: lookAt([300, 780], [395, 790]), tailUp: 0.4 };
    if (t >= 60.8) { const g = K5_B(t, 60.8, 0.3); P.drop = 14 * g; P.headUp = 0.18 * g; P.raise = 0.8 * g; P.mouth = 'closed'; P.talk = k5Talk(t, [[60.84, 62.76]], 0.35); P.gaze = gazePlan(t, [[60.8, [1, 0.4]], [61.2, [1, -0.5]], [61.4, [0.8, 0.5]]], 0.08); }
    return P; },
  draw(ctx, t) { k5Home(ctx, t); k5Burrow(ctx, ...K5_HOME.burrow, {}); k5Jackal(ctx, this.jk(t)); k5Raven(ctx, this.rv(t), t); },
  over() {} };

// ---------------- S8 63.4-81.4: the plan as a picture ----------------
const K5_MAPY = 620;
const K5_PPL = [[230, 0], [290, 1]];   // tiny people start x, variant
function k5MiniHut(c) { shape(c, [[130, K5_MAPY], [130, 540], [250, 540], [250, K5_MAPY]], '#f3e2b8', { lw: 5, seed: 91, dot: C.red, pitch: 9, rad: 0.15, da: 0.35 }); shape(c, [[118, 545], [190, 488], [262, 545]], C.red, { lw: 5, seed: 92, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 }); shape(c, K.rectPts(176, 576, 28, 44), WOOD, { lw: 4, seed: 93 }); }
function k5MiniTree(c, x) { seg(c, x, K5_MAPY, x, 520, 14, WOOD, 4); for (const [dx, dy, r] of [[0, 490, 44], [-28, 515, 28], [30, 512, 30]]) { c.beginPath(); c.arc(x + dx, dy, r, 0, 7); c.fillStyle = GREEN; c.fill(); c.lineWidth = 5; c.strokeStyle = C.black; c.stroke(); } }
function k5PlanInside(c, t) {
  c.fillStyle = CREAM; c.fillRect(0, 0, 1000, 1000);
  c.fillStyle = GREEN; c.fillRect(40, K5_MAPY, 920, 30); c.fillStyle = SAND; c.fillRect(40, K5_MAPY + 30, 920, 200); c.fillStyle = C.black; c.fillRect(40, K5_MAPY - 3, 920, 5);
  const pop = (t0) => K.ease.back(K5_B(t, t0, 0.35));
  const ph = pop(67.9); if (ph > 0) { c.save(); c.translate(190, K5_MAPY); c.scale(ph, ph); c.translate(-190, -K5_MAPY); k5MiniHut(c); c.restore(); }
  for (const [x, i] of [[400, 0], [540, 1], [680, 2]]) { const p = pop(64.0 + i * 0.25); if (p > 0) { c.save(); c.translate(x, K5_MAPY); c.scale(p, p); c.translate(-x, -K5_MAPY); k5MiniTree(c, x); c.restore(); } }
  const pb = pop(64.6); if (pb > 0) k5Burrow(c, 845, K5_MAPY + 4, { s: 0.75 * pb, eyes: t > 76.92 ? { open: K5_B(t, 77.0, 0.2), look: [-0.5, 0] } : null });
  // people: stand by the hut, arms up when it is snatched, run along under the arc, arrive, bend, jump
  const PX = (i, tt = t) => kfn(tt, [[72.9, K5_PPL[i][0]], [75.0, 520 + i * 40], [78.82, 600 + i * 40], [79.6, 720 + i * 50]], 'lin');
  if (t >= 67.9) for (let i = 0; i < 2; i++) { const x = PX(i), mv = Math.abs(speed((tt) => PX(i, tt), t)) > 5, P = { x, y: K5_MAPY, s: 0.45 * pop(68.0 + i * 0.15), dir: 1, costume: i ? 'villageWoman' : 'villager', ph: x / 12, amp: mv ? 1 : 0, gaze: [0.8, -0.6] };
    if (P.s <= 0) continue;
    if (t >= 69.8 && t < 71.6) { P.aL = [-2.6, -2.8]; P.aR = [2.6, 2.8]; P.mouth = 'open'; P.gaze = lookAt([x, 520], k5PlanRv(t).neck || [x, 500]); }
    if (mv) { P.lean = 0.12; P.mouth = 'open'; }
    if (t >= 79.1) { P.lean = 0.25 * K5_B(t, 79.1, 0.3); P.handR = PERSON_HANDS.reach.R; }
    if (t >= 79.7) { P.y = K5_MAPY - 26 * pulse(t, 79.7 + i * 0.08, 0.35); P.lean = 0; P.eyes = 'wide'; P.mouth = 'o'; P.handR = null; P.aL = [-2.4, -2.7]; P.aR = [2.4, 2.7]; }
    person(c, P); }
  if (t >= 69.8 && t < 71.6) for (const [px] of K5_PPL) { const nk = k5PlanRv(t).neck; if (nk) k5Dash(c, [px + 8, 520], [nk[0], nk[1] + 20], K5_B(t, 69.8, 0.4), { w: 4, col: C.red }); }
  // necklace
  const R = k5PlanRv(t);
  if (t >= 66.7 && t < 69.3) k5Neck(c, 320, K5_MAPY - 6, { mode: 'lay', s: 0.9 * K.ease.back(K5_B(t, 66.7, 0.35)), spark: k5u(t, 67.1, 67.7) });
  if (t >= 75.86) { const y = t < 76.3 ? fallY(t, 75.86, 76.3, 470, K5_MAPY - 6) : K5_MAPY - 6 - rebound(t, 76.23, 14, 0.2); k5Neck(c, 815, y, { mode: t < 76.3 ? 'hang' : 'lay', s: 0.75, ang: t < 76.3 ? 0.2 : 0 }); }
  // tiny snake head between the people and the necklace
  if (t >= 79.7) { const o = K.ease.back(K5_B(t, 79.7, 0.25)), pts = [[845, K5_MAPY - 18, 0.5], [842, K5_MAPY - 18 - 30 * o, 0.8], [834, K5_MAPY - 22 - 50 * o, 1]]; k5Snake(c, pts, { w: 14, lid: 0.3, tongue: pulse(t, 80.0, 0.3), gaze: [-1, 0] }); k5BurrowShade(c, 845, K5_MAPY + 4, 0.75); }
  // dotted flight arc (step 2)
  if (t >= 71.7 && t < 79.0) { c.save(); c.setLineDash([10, 12]); c.lineWidth = 5; c.strokeStyle = C.blue; const a = K.bezier([330, 440], [480, 380], [680, 380], [820, 450], 30), n = Math.round(30 * K5_B(t, 71.7, 0.8)); c.beginPath(); a.slice(0, n + 1).forEach((p, i) => (i ? c.lineTo(...p) : c.moveTo(...p))); c.stroke(); c.restore(); }
  if (R) k5Raven(c, { ...R.P }, t);
}
function k5PlanRv(t) {   // the mini raven on the map: appears, scans, snatches, flies slowly, hovers, drops
  if (t < 65.3) return null; const P = { x: 330, y: 470, s: 0.5 * K.ease.back(K5_B(t, 65.3, 0.3)), dir: 1, fly: true, flap: Math.sin(t * 10), kind: 'crow' }; let neck = null;
  P.gaze = gazePlan(t, [[65.3, [-1, 0.3]], [65.7, [1, 0.3]], [66.1, [0, 1]]], 0.07);
  if (t >= 68.9) { const f = k5u(t, 68.9, 69.8), d = Math.sin(Math.PI * f); P.y = 470 + 110 * d; P.x = 330 - 10 * d; P.rot = 0.4 * d; }
  if (t >= 71.7) { const u = K.ease.inOut(k5u(t, 71.7, 75.0)), b = K.bezier([330, 440], [480, 380], [680, 380], [820, 450], 30), q = b[Math.round(u * 30)]; P.x = q[0]; P.y = q[1] + 30; P.flap = Math.sin(t * 5); }
  if (t >= 75.0) { P.y += Math.sin(t * 6) * 5; P.flap = Math.sin(t * 9); P.gaze = [0.2, 1]; }
  if (t >= 75.86) P.beak = 1;
  if (t >= 69.4 && t < 75.86) { P.neck = { ang: Math.sin(t * 2.5) * 0.25, s: 0.55 }; neck = k5Grip({ ...P, s: 0.5 }); }
  if (t >= 79.7) { P.eyes = 'wide'; P.y -= 20 * K5_B(t, 79.7, 0.2); }
  return { P, neck };
}
const K5S8 = { a: 63.4, ww: 1000, cam: [[63.4, { x: 500, y: 615, zoom: 1.0 }], [81.4, { x: 500, y: 600, zoom: 1.025 }]],
  rv(t) { const P = { x: 845, y: 1132, s: 1.4, dir: -1, seed: 3, gaze: lookAt([800, 1040], [500, 450]) };
    if (t >= 69.8 && t < 71.6) P.headRot = 0.3;
    if (t >= 76.9) { P.eyes = 'wide'; P.gaze = lookAt([800, 1040], [845, 600]); }
    if (t >= 80.5) { P.beak = t < 80.85 ? 1.2 : 0.35; P.eyes = 'open'; P.sq = settleTo(t, 80.85, 1, 1.06); P.drop = 6 * (pulse(t, 80.95, 0.18) + pulse(t, 81.15, 0.18)); P.lid = Math.max(0.2, blink(t, 3)); }
    return P; },
  jk(t) { const P = { x: 78, y: 1151, s: 1.1, dir: 1, seed: 7, headUp: -0.25, gaze: lookAt([170, 1010], [500, 450]), talk: k5Talk(t, [[63.72, 70.98], [71.7, 78.0], [78.82, 81.4]], 0.6) };
    if (t >= 71.7 && t < 73.8) P.raise = 0.5 + 0.3 * Math.sin((t - 71.7) * 7);
    if (t >= 80.5) { P.mouth = 'smile'; P.lid = Math.max(0.5, blink(t, 7)); P.talk = 0; P.headUp = -0.25 + 0.1 * pulse(t, 80.9, 0.4); }
    return P; },
  draw(ctx, t) {
    k5Home(ctx, t); k5Burrow(ctx, ...K5_HOME.burrow, {}); ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = NAVY2; ctx.fillRect(-50, -50, 1100, 1350); ctx.restore();
    const p = K5_B(t, 63.4, 0.7); thoughtCloud(ctx, 500, 455, 900, 740, t, { p, tail: [190, 990], scale: 1, at: [500, 455], inside: (c) => k5PlanInside(c, t), seed: 8, n: 13 });
    k5Jackal(ctx, this.jk(t)); k5Raven(ctx, this.rv(t), t);
  },
  over(ctx, t, cam, S) {
    const chip = (n, x, y, t0) => { const p = K5_B(t, t0, 0.3); if (p <= 0) return; S.box(ctx, x - 34, y - 34, 68, 68, p, { fill: C.yellow, lw: 6, seed: 40 + n }); if (p > 0.6) { ctx.save(); ctx.font = K.font(54, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(String(n), x, y + 3); ctx.restore(); } };
    const P = (x, y) => k5P(x, y, cam);
    { const [x, y] = P(150, 300); chip(1, x, y, 65.3); } { const [x, y] = P(500, 290); chip(2, x, y, 71.7); } { const [x, y] = P(850, 300); chip(3, x, y, 75.0); }
    if (t >= 66.8 && t < 71.0) { const [x, y] = P(320, K5_MAPY); S.label(ctx, 'NECKLACE', x + 20, y + 120, K5_B(t, 66.8, 0.3), { align: 'center', size: 40 }); }
    if (t >= 72.5 && t < 74.8) { const [x, y] = P(580, 730); sfx(ctx, 'SLOWLY!', x, y, 58, K5_B(t, 72.5, 0.3), { rot: -0.06, fill: C.white }); }
    if (t >= 73.0 && t < 75.6) { const R = k5PlanRv(t); if (R) { const [a, b] = P(560, 560), [c2, d] = P(R.P.x - 30, R.P.y + 20); S.arrow(ctx, [a, b], [c2, d], K5_B(t, 73.3, 0.5, 'out'), { width: 14, bend: -0.2 }); } }
    if (t >= 75.9 && t < 77.4) { const [x, y] = P(760, 470); S.arrow(ctx, [x, y], [x, y + 130], K5_B(t, 75.9, 0.3, 'out'), { width: 14, bend: 0 }); }
    if (t >= 77.0) { const [x, y] = P(845, K5_MAPY); S.label(ctx, 'SNAKE HOLE', x - 40, y + 120, K5_B(t, 77.0, 0.3), { align: 'center', size: 40 }); }
  } };
