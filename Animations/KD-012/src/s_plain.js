// ===== KD-012 scenes on the 1000-wide sets: S1-S2 dryPlain, S5 thicketMeet. Times are seconds on the final MP3 (creative_plan.json). =====
const KINGB = { s: 0.85, seed: 11, crown: true }, COWB = { s: 0.7, seed: 23 }, SCOUTB = { s: 0.56, seed: 37 };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// drinking cycle: trunk down to the water, curl to the mouth, swallow (head bob). Returns {trunk, hbob, dip: cycle start}
function drinkCyc(t, t0, per = 1.4) { const k = Math.floor((t - t0) / per), u = ((t - t0) / per) - k; return { trunk: u < 0.45 ? 0 : 0.7 * Math.sin(Math.PI * (u - 0.45) / 0.55), hbob: u > 0.8 ? 5 * Math.sin(Math.PI * (u - 0.8) / 0.2) : 0, dip: t0 + k * per }; }
const shadowUnder = (ctx, P, off = 0, a = 0.35) => halftoneShadow(ctx, P.x + (P.dir ?? 1) * P.s * 40 + off, P.y + 6, 190 * P.s, a);
const elWalkHb = (xf, t, amp = 5) => { const w = walk(xf, t); return amp * Math.sin(w.ph * 2) * w.amp; };

// ================= S1 + S2: the herd at the drying pond =================
const dryBack = () => bakeK('dry', VW, VH, 2, (c) => { sky(c); hillTrees(c); treeRow(c, { n: 3, hmin: 420 }); ground(c); });
const PONDP = { x: 640, y: 962, w: 300, h: 72 };
const KXd = (t) => kfn(t, [[3.72, 120], [4.6, 165], [18.4, 165], [22.0, 1310]]);
const CXd = (t) => kfn(t, [[10.5, 395], [10.9, 420], [11.5, 420], [11.9, 445], [18.7, 445], [22.5, 1420]]);
const SXd = (t) => kfn(t, [[10.6, 820], [12.1, 792], [19.4, 792], [20.3, 805], [21.9, 805], [22.9, 1300]]);
const FALLS_D = footfalls(KXd, 18.4, 22.0, 30);
const sunPass = (t) => { if (t < 7) return [820, 170]; if (t >= 10) return [790, 165]; const k = Math.floor(t - 7), f = (t - 7) - k, g = k < 2 ? f : f * 0.359; return [560 + 640 * g, 600 - 480 * Math.sin(Math.PI * g)]; }; // v3: arc kept right of the DAY burst; day 3 ends on (790, 165)
const sunAlpha = (t) => (t >= 7 && t < 10 ? K.clamp(((t - 7) % 1) / 0.12) : 1);
const pondLevel = (t) => (t < 10 ? 1 : t < 12.3 ? K.lerp(1, 0.12, K.ease.inOut((t - 10) / 2.3)) : t < 13.2 ? 0.12 : K.lerp(0.12, 0, K.clamp((t - 13.2) / 0.6)));
const dayDroop = (t) => K.clamp((t - 7) / 3) * 3;   // 0..3 days of sinking
function dryKing(t) {
  const w = walk(KXd, t), P = { ...KINGB, y: 905, dir: 1, ...w, amp: w.amp * 0.75, flapEar: 0.4, trunk: 0.1 };
  P.hbob = elWalkHb(KXd, t); P.crownLag = elWalkHb(KXd, t - 0.07) - P.hbob;
  P.gaze = t < 5.12 ? [0.6, 0.5] : [1, -0.12]; if (t >= 3.72 && t < 7) { P.drop = blend(t, 3.7, 4.5, 0, -10); P.lid = t > 4.6 && t < 4.95 ? 0.9 : null; }
  if (t >= 7) { const d = dayDroop(t); P.drop = 5 * d; P.earUp = -0.1 * d; }
  if (t >= 9.5 && t < 10.2) { P.gaze = [0.2, -1]; P.earUp = 0.5; P.drop = 0; }
  if (t >= 10.2) P.gaze = lookAt(elEye(P), [PONDP.x, PONDP.y]);
  if (t >= 14.5) { P.tongue = true; P.lid = 0.55; P.earUp = -0.3; P.sq = breathe(t, 2, 0.02); }
  if (t >= 16.0) { P.wet = true; P.lid = t > 17.1 && t < 17.4 ? 1 : 0.6; P.brow = -0.6; }
  if (t >= 17.3) { P.sq = anticipate(t, 17.44, 0.3, 0.06); P.drop = blend(t, 17.44, 17.74, 15, 22); }
  if (t >= 17.74) { P.tongue = false; P.lid = 0; P.wet = false; P.brow = 0; P.drop = settleTo(t, 17.74, 22, -10); P.earUp = blend(t, 17.74, 18.0, -0.3, 0.4); P.trunk = blend(t, 17.74, 18.1, 0.1, 0.62); P.reach = blend(t, 17.74, 18.1, 0, 1); P.gaze = [1, -0.1]; }
  if (t >= 18.4) { P.trunk = blend(t, 18.4, 19.0, 0.62, 0.15); P.reach = blend(t, 18.4, 19.0, 1, 0); P.earUp = 0; P.drop = 6; P.tongue = true; }
  return P;
}
function dryCow(t) {
  const w = walk(CXd, t), P = { ...COWB, y: 936, dir: 1, ...w, amp: w.amp * 0.75, flapEar: 0.3, drop: 30, tip: 0.08, reach: 0.25, lid: 0.3 };
  const dc = drinkCyc(t, 0.4); if (t < 7) { P.trunk = dc.trunk; P.hbob = dc.hbob; } else P.trunk = 0;
  P.gaze = lookAt(elEye(P), [PONDP.x, PONDP.y + 10]);
  if (t >= 7) { const d = dayDroop(t); P.drop = 30 + 4 * d; P.earUp = -0.1 * d; P.lid = 0.3; }
  if (t >= 9.62 && t < 10.35) { P.gaze = [0.1, -1]; P.earUp = 0.5; P.drop = 10; P.tip = 0; }
  if (t >= 12.3 && t < 14.5) P.gaze = lookAt(elEye(P), [720, 900]);
  if (t >= 14.5) { P.tongue = true; P.lid = 0.55; P.earUp = -0.3; P.sq = breathe(t, 5, 0.02); }
  if (t >= 17.9) { P.gaze = t < 18.3 ? lookAt(elEye(P), elTrunk(dryKing(t))) : [1, -0.1]; P.lid = 0.2; }
  if (t >= 18.5) { P.drop = blend(t, 18.5, 18.9, 34, 8); P.tip = blend(t, 18.5, 18.9, 0.08, 0); P.reach = 0; }
  return P;
}
function dryScout(t) {
  const w = walk(SXd, t), tf = turnFlip(t, [[0, -1], [18.8, 1]], 0.7), P = { ...SCOUTB, y: 946, dir: tf.dir, ...w, flapEar: 0.6, tail: 0.25 * Math.sin(t * 3) };
  P.amp = w.amp * (t > 21.5 ? 1.1 : 0.8);
  if (t >= 1.7 && t < 3.2) { P.drop = blend(t, 1.7, 2.0, 0, 22) * (1 - B(t, 2.1, 0.3)); P.trunk = blend(t, 2.1, 2.45, 0, 1); P.tip = 0.06 * pulse(t, 1.7, 0.8); if (t > 2.4) { P.eyes = 'shut'; P.sq = t < 2.7 ? 0.96 : 1.04; P.tail = 0.5 * Math.sin(t * 14); } }
  if (t >= 3.2 && t < 3.7) P.trunk = blend(t, 3.2, 3.7, 1, 0.1);
  P.gaze = t >= 5.42 && t < 7 ? [1, -0.15] : [-0.6, 0.4];
  if (t >= 7) { const d = dayDroop(t); P.drop = 4 * d; P.earUp = -0.12 * d; }
  if (t >= 9.75 && t < 10.5) { P.gaze = [-0.1, -1]; P.earUp = 0.5; P.drop = 0; }
  if (t >= 10.5 && t < 11.0) P.sq = 1 - 0.05 * pulse(t, 10.5, 0.5);
  if (t >= 12.3 && t < 14.05) { P.drop = blend(t, 12.3, 12.7, 0, 40); P.tip = blend(t, 12.3, 12.7, 0, 0.12); P.eyes = 'wide'; P.gaze = [-0.6, 0.8]; P.sq = 1 + 0.025 * Math.sin(t * 22) * B(t, 12.8, 0.2); }
  if (t >= 14.05 && t < 14.6) { P.drop = blend(t, 14.05, 14.2, 40, 0); P.trunk = blend(t, 14.05, 14.22, 0, 1); P.earUp = t < 14.25 ? 0 : 0.8 * (1 - B(t, 14.35, 0.25)); P.lid = t > 14.26 && t < 14.36 ? 1 : 0; P.eyes = 'open'; }
  if (t >= 14.6) { P.tongue = true; P.lid = 0.55; P.earUp = -0.3; P.trunk = blend(t, 14.6, 15.0, 1, 0); P.sq = breathe(t, 7, 0.02); P.drop = 10; }
  if (t >= 17.9) { P.gaze = t < 18.45 ? lookAt(elEye(P), elTrunk(dryKing(t))) : [-1, 0]; P.lid = 0.2; }
  if (t >= 18.8) { P.tongue = true; P.lid = 0.4; P.drop = 6; P.gaze = [1, 0]; }
  if (t >= 20.56 && t < 21.9) { P.gaze = lookAt(elEye(P), [PONDP.x, PONDP.y]); P.lid = 0.4; P.wet = t > 20.9; P.earOff = 0.18 * Math.sin((t - 20.56) * 12) * (1 - B(t, 20.9, 0.5)); P.drop = blend(t, 20.56, 21.0, 6, 22); P.trunk = 0.25 * pulse(t, 20.9, 0.8); P.tail = -0.3; }
  return P;
}
function drawDry(ctx, t) {
  ctx.drawImage(dryBack(), 0, 0, VW, VH); const [sx, sy] = sunPass(t); ctx.save(); ctx.globalAlpha *= sunAlpha(t); sun(ctx, sx, sy, t); ctx.restore();
  if (t >= 9.2 && t < 10.6) cloudFlat(ctx, kfn(t, [[9.2, -160], [9.8, 430], [10.0, 430], [10.6, 1200]]), 330, 1);
  if (t < 1.9) for (const [i, y0] of [[0, 240], [1, 300]]) songbird(ctx, { x: 1050 - 620 * t - i * 90, y: y0 + 8 * Math.sin(t * 9 + i), s: 0.55, fly: true, flap: t * 22 + i, dir: -1, col: i ? C.yellow : C.red });
  const k = dryKing(t), c = dryCow(t), s = dryScout(t), off = t >= 7 && t < 10 ? (500 - sx) * 0.18 : 0;
  pond(ctx, { ...PONDP, level: pondLevel(t), t, seed: 7 });
  for (const P of [k, c, s]) shadowUnder(ctx, P, off, 0.3);
  elephantK(ctx, k); elephantK(ctx, c); elephantK(ctx, s);
  // water play and dust
  const ct = elTrunk(c), dc = drinkCyc(t, 0.4); if (t < 7) ripple(ctx, ct[0], ct[1] + 8, dc.dip, t, 0.6);
  if (t >= 2.45 && t < 3.3) { const st = elTrunk(s); for (let i = 0; i < 9; i++) { const u = ((t - 2.45) * 1.6 + i / 9) % 1; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(st[0] + u * 120 + i * 3, st[1] - 40 * Math.sin(Math.PI * u) + u * 60, 6, 9, 10), '#5fa0ff', { lw: 2.5, seed: i }); ctx.restore(); } }
  if (t >= 12.6 && t < 13.8) { const st = elTrunk(s); ripple(ctx, st[0], st[1] + 10, 12.6, t, 0.4); }
  if (t >= 14.25) { const st = elTrunk(s); dustBurst(ctx, st[0] - 6, st[1] - 10, t - 14.25, 8, 8, 16, 60, 0.75, 4); }
  if (t >= 14.6 && t < 17.6) for (const P of [k, c, s]) { ctx.save(); ctx.globalAlpha = 0.7 * K.clamp((t - 14.6) / 0.4); steam(ctx, P.x, P.y - 280 * P.s, t + P.s); ctx.restore(); }
  if (t >= 16.1 && t < 17.6) teardrops(ctx, t, 16.2, 17.3, (tt) => { const e = elEye(dryKing(tt)); return [e[0] - 30, e[1] - 30]; }, { groundY: 905, rate: 1.7, vx: 10 });
  for (const f of FALLS_D) dustBurst(ctx, f.x + 90, GR + 4, t - f.t, 4, 6, 12, 26, 0.5, Math.round(f.t * 10));
}
const S1 = { a: 0, b: 7.0, ww: VW, cam: [[0, { x: 480, y: 700, zoom: 1.35 }], [1.0, { x: 480, y: 700, zoom: 1.35 }], [6.4, { x: 500, y: 615, zoom: 1 }]], draw: drawDry,
  over(ctx, t, cam, S) {
    if (t >= 3.8 && t < 6.2) { ctx.save(); ctx.globalAlpha = K.clamp((6.2 - t) / 0.3); const [hx, hy] = toPanel(240, 600, cam); S.label(ctx, 'THE HERD', hx, hy - 120, B(t, 3.8, 0.4), { align: 'center', size: 46, fill: C.yellow }); S.arrow(ctx, [hx, hy - 85], [hx + 10, hy + 6], B(t, 4.0, 0.4, 'out'), { width: 18, bend: 0.1 }); ctx.restore(); }
  } };
const S2 = { a: 7.0, b: 22.96, ww: VW, cam: [[7, { x: 500, y: 615, zoom: 1 }], [12.3, { x: 500, y: 615, zoom: 1 }], [12.9, { x: 700, y: 800, zoom: 1.5 }], [15.6, { x: 700, y: 800, zoom: 1.5 }], [16.0, { x: 350, y: 720, zoom: 1.7 }], [17.6, { x: 350, y: 720, zoom: 1.7 }], [18.2, { x: 580, y: 660, zoom: 1.1 }], [20.3, { x: 650, y: 660, zoom: 1.1 }], [23, { x: 700, y: 660, zoom: 1.1 }]], draw: drawDry,
  over(ctx, t, cam, S) {
    if (t >= 7.0 && t < 10.6) { ctx.save(); ctx.globalAlpha = K.clamp((10.6 - t) / 0.3); S.label(ctx, 'DAY', 235, 150, B(t, 7.0, 0.3), { align: 'center', size: 44, fill: C.yellow }); S.counter(ctx, Math.floor(1 + 59 * K.clamp((t - 7.05) / 2.9)), 235, 300, B(t, 7.1, 0.3), { size: 96 }); ctx.restore(); }
    if (t >= 14.1 && t < 15.2) { const st = elTrunk(dryScout(14.3)), [px, py] = toPanel(st[0] - 30, st[1] - 90, cam); ctx.save(); ctx.globalAlpha = K.clamp((15.2 - t) / 0.3); sfx(ctx, 'PFFT!', px, py, 84, B(t, 14.1, 0.15), { rot: -0.12, fill: C.white }); ctx.restore(); }
  } };

// ================= S5: the hares meet at dusk, far from the lake =================
const meetBack = () => bakeK('meet', VW, VH, 2, (c) => { sky(c, { preset: 'dusk' }); thicket(c, { x0: -90, w: 300, seed: 5 }); bush(c, { x: 940, w: 230, h: 150, seed: 7 }); ground(c);
  stump(c, 620, 854); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = '#f2b08a'; c.fillRect(0, 880, VW, VH); c.restore(); });
const L5 = [{ s: 0.55, x: 330, seed: 41, t0: 51.0 }, { s: 0.5, x: 400, seed: 42, t0: 51.3 }, { s: 0.46, x: 472, seed: 43, t0: 51.6 }, { s: 0.52, x: 545, seed: 44, t0: 51.9 }];
const STOMPS = [58.3, 58.6, 58.9];
const turnTo = (t, t0, d0, d1, dur = 0.35) => (t < t0 ? d0 : t > t0 + dur ? d1 : (t < t0 + dur / 2 ? d0 : d1) * (0.7 + 0.3 * Math.abs(Math.cos(Math.PI * (t - t0) / dur))));
function heroS5(t) {
  const h = hops(t, [860, GR], [[62.9, 0.5, 740, GR, 50], [63.55, 0.55, 620, 856, 60]]), P = { pal: 0, s: 0.6, seed: 5, dir: -1, x: h.x, y: h.y, sq: h.sq, ears: 1, lid: 0.15 };
  if (t > 70.3) P.x = blend(t, 70.3, 70.7, 620, 604);
  P.gaze = lookAt(hHead(P), [430, 820]);
  if (t >= 61.95 && t < 62.4) P.gaze = lookAt(hHead(P), gazePlan(t, [[61.95, [500, 700]], [62.05, [900, 600]], [62.16, [600, 860]], [62.27, [820, 640]]], 0.07));
  if (t >= 62.4 && t < 62.9) { P.ears = settleTo(t, 62.4, 0.9, 1.25, 0.25); P.eyes = t < 62.6 ? 'wide' : 'open'; P.mouth = t > 62.6 ? 'smile' : 'closed'; P.gaze = [0, -0.6]; P.lid = 0; }
  if (t >= 64.2 && t < 64.9) { P.raise = 1.25 + 0.15 * Math.sin((t - 64.2) * 18); P.ears = 1.1; }
  if (t >= 64.9) { P.sq = (P.sq || 1) * 1.05; P.brow = 0.5; P.raise = 0.9; P.mouth = 'smile'; P.gaze = lookAt(hHead(P), [K.lerp(330, 545, 0.5 + 0.5 * Math.sin(t * 1.4)), 830]); }
  if (t >= 66.5 && t < 68.1) { P.raise = 1.7; P.gaze = [0.1, -1]; }
  if (t >= 68.9 && t < 70.3) { P.raise = 0.85 + 0.2 * Math.sin((t - 68.9) * 16); P.lid = 0.4; P.tip = 0.05; P.mouth = 'smile'; P.brow = 0.3; }
  if (t >= 70.3) { P.gaze = t < 70.7 ? [-0.3, 0.6] : lookAt(hHead(P), [420, 820]); P.lid = t > 70.75 && t < 71.15 ? 1 : 0.2; P.raise = 0.2; }
  P.talk = talk(t, [[64.0, 66.5], [67.0, 68.0], [68.9, 72.0]], 1.3);
  return P;
}
function drawMeet(ctx, t) {
  ctx.drawImage(meetBack(), 0, 0, VW, VH);
  // elder
  const E = { pal: 2, s: 0.62, seed: 7, dir: 1, x: blend(t, 54.9, 55.3, 175, 195), y: GR, ears: 0.2, tip: t > 54.9 ? 0.06 : 0.03, brow: 0.6, mouth: 'frown', lid: 0.25 };
  E.sq = t > 54.9 && t < 55.3 ? 1 + 0.08 * Math.sin(Math.PI * (t - 54.9) / 0.4) : breathe(t, 3); E.y -= 18 * pulse(t, 54.9, 0.4);
  E.raise = t > 55.0 && t < 61.9 ? 0.55 + 0.15 * Math.sin(t * 3) : 0; E.talk = talk(t, [[56.7, 61.94]], 0.4); E.gaze = lookAt(hHead(E), [430, 820]);
  if (t >= 56.4 && t < 61.9) { E.gaze = t < 57.4 || t > 59.1 ? [0.3, -1] : lookAt(hHead(E), [430, 820]); }
  if (t >= 59.1 && t < 61.9) E.nod = 0.12 * Math.sin((t - 59.1) * 4);
  if (t >= 62.9) E.gaze = lookAt(hHead(E), hHead(heroS5(t)));
  if (t >= 71.24) { E.brow = 0.6; E.mouth = 'frown'; E.ears = 0.3; }
  const hero = heroS5(t);
  // listeners
  const Ls = L5.map((L, i) => { const h = hops(t, [-80, GR], [[L.t0, 0.45, (L.x - 80) / 2 - 20, GR, 40], [L.t0 + 0.6, 0.45, L.x, GR, 34]]);
    const P = { pal: 1, s: L.s, seed: L.seed, x: h.x, y: h.y, sq: h.sq * (h.air ? 1 : breathe(t, i, t < 54 ? 0.05 : 0.012)), dir: 1, ears: 0.8 };
    if (t > L.t0 + 1.1) { P.dir = turnTo(t, L.t0 + 1.1, 1, -1); P.gaze = t < 54.9 + stagger(i, 0.2) ? [1, -0.1] : lookAt(hHead(P), hHead(E)); }
    if (t >= 54.9 + stagger(i, 0.2)) P.gaze = lookAt(hHead(P), hHead(E));
    const ns = STOMPS.filter((s) => t >= s).length; if (ns) { const s0 = STOMPS[ns - 1], amt = [1, 0.5, 0.2][ns - 1]; P.sq *= 1 - 0.28 * amt * Math.exp(-(t - s0) * 5); P.ears -= 1.2 * amt * Math.exp(-(t - s0) * 4); P.eyes = 'wide'; }
    if (t >= 60.82 + stagger(i, 0.15)) { P.ears = blend(t, 60.82 + stagger(i, 0.15), 61.2 + stagger(i, 0.15), 0.8, -0.7); P.wet = i % 2 === 0; P.mouth = 'frown'; P.eyes = 'open'; }
    if (t >= 62.95 + stagger(i, 0.12)) { P.dir = turnTo(t, 62.95 + stagger(i, 0.12), -1, 1); P.gaze = lookAt(hHead(P), hHead(hero)); }
    if (t >= 66.6 && t < 68.2) { P.tip = -0.1; P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [0.4, -0.9]; }
    if (t >= 68.2 && t < 68.9) { P.gaze = [i % 2 ? -1 : 1, 0]; P.eyes = 'wide'; P.mouth = 'o'; if (t > 68.45) P.gaze = lookAt(hHead(P), hHead(hero)); }
    if (i === 2 && t >= 68.4 && t < 69.6) P.tip = -0.5 * B(t, 68.4, 0.2, 'out') * (1 - B(t, 69.2, 0.4));
    if (i === 3 && t >= 68.45 && t < 69.6) { P.tip = -0.22 * (1 - B(t, 69.2, 0.4)); P.x -= 14; }
    if (t >= 71.24 + stagger(i, 0.12)) { P.ears = blend(t, 71.24 + stagger(i, 0.12), 71.7 + stagger(i, 0.12), -0.7, 0.4); P.mouth = i === 0 || i === 3 ? 'smile' : 'closed'; P.wet = false; P.eyes = 'open'; }
    return P; });
  // the kit: arrives last, hides between two adults, ears trembling
  const kh = hops(t, [-60, GR], [[52.5, 0.4, 230, GR, 30], [53.0, 0.35, 436, GR, 22]]), kit = { pal: 1, s: 0.38, seed: 9, x: kh.x, y: kh.y, sq: kh.sq * (t > 53.4 ? 0.86 : 1), dir: -1, ears: 1, earWig: t > 53.4 ? 0.12 * Math.sin(t * 40) : 0 };
  kit.gaze = lookAt(hHead(kit), t < 62.95 ? hHead(E) : hHead(hero)); if (t > 62.95) kit.dir = turnTo(t, 63.2, -1, 1);
  if (t >= 60.9 && t < 71.2) { kit.ears = -0.8; kit.lid = t > 61.0 && t < 62.6 ? 1 : 0; }
  if (t >= 71.3) { kit.ears = 0.8; kit.raise = 0.6 + 0.3 * Math.abs(Math.sin((t - 71.3) * 12)); kit.mouth = 'smile'; }
  hare(ctx, kit); hare(ctx, E); Ls.forEach((P) => hare(ctx, P)); hare(ctx, hero);
  // thought clouds
  if (t >= 56.2 && t < 62.0) { const p = t < 61.7 ? B(t, 56.2, 0.5) : 1 - B(t, 61.7, 0.25); cloud(ctx, 330, 560, 230, 130, C.white, p, { tail: [-120, 220], inside: (c) => {
      c.save(); c.translate(-330, -470); const by = 535, sunU = K.clamp((t - 58.2) / 0.9) * 3, sk = Math.floor(sunU), sf = sunU - sk;
      if (t >= 58.2 && t < 59.1) sun(c, 150 + sf * 360, 420 - 60 * Math.sin(Math.PI * sf), 0);
      c.fillStyle = GREEN; c.fillRect(100, by, 460, 30); burrow(c, 300, by, { collapse: B(t, 60.82, 0.3), seed: 8 });
      let sY = blend(t, 57.0, 57.8, 380, by - 6); for (const s of STOMPS) if (t > s - 0.22 && t < s) sY -= 80 * Math.sin(Math.PI * (t - s + 0.22) / 0.22);
      shape(c, [[340, sY - 200], [400, sY - 200], [404, sY], [336, sY]], ELEPH, { lw: 6, seed: 3, dot: ELEPHD, pitch: 8, rad: 0.16, da: 0.5 }); shape(c, ell(370, sY, 36, 10, 16), '#e9e2d0', { lw: 4, seed: 4 });
      for (const s of STOMPS) dustBurst(c, 370, by, t - s, 5, 5, 10, 30, 0.4, 3);
      c.restore(); } }); }
  if (t >= 62.4 && t < 63.3) bulb(ctx, hero.x - 20, hero.y - 210, B(t, 62.4, 0.3) * (1 - B(t, 63.0, 0.3)));
  if (t >= 66.5 && t < 72.2) { const p = t < 71.9 ? B(t, 66.5, 0.5) : 1 - B(t, 71.9, 0.25); cloud(ctx, 640, 500, 230, 150, C.white, p, { tail: [-30, 240], inside: (c) => {
      c.save(); c.translate(-640, -430); c.fillStyle = GREEN; c.fillRect(400, 520, 480, 40);
      const lf = t < 70.3 ? 0 : t < 70.62 ? 100 * B(t, 70.3, 0.2, 'out') : 100 * (1 - B(t, 70.62, 0.12, 'in'));
      elephantK(c, { x: 500, y: 525, s: 0.42, dir: 1, crown: true, eyes: 'smug', brow: -0.4, lift: lf, drop: lf ? -30 : 0, noBlink: true });
      hare(c, { pal: 0, s: 0.2, x: 745, y: 525, dir: -1, noBlink: true });
      if (t >= 68.9) { c.save(); c.setLineDash([10, 9]); c.lineWidth = 6; c.strokeStyle = C.red; c.beginPath(); c.moveTo(640, 533); c.lineTo(640 + 90 * B(t, 68.9, 0.5), 533); c.stroke(); c.restore(); }
      if (t > 70.62) dustBurst(c, 618, 525, t - 70.62, 5, 5, 10, 30, 0.4, 2);
      c.restore(); } }); }
}
const S5 = { a: 51.0, b: 72.3, ww: VW, cam: [[51, { x: 500, y: 741, zoom: 1.5 }], [54.8, { x: 500, y: 741, zoom: 1.5 }], [55.4, { x: 400, y: 760, zoom: 1.7 }], [62.3, { x: 400, y: 760, zoom: 1.7 }], [62.45, { x: 800, y: 800, zoom: 1.9 }], [64.3, { x: 700, y: 800, zoom: 1.9 }], [64.9, { x: 560, y: 740, zoom: 1.5 }], [68.9, { x: 560, y: 740, zoom: 1.5 }], [69.6, { x: 600, y: 700, zoom: 1.7 }]], draw: drawMeet,
  over(ctx, t, cam, S) {
    if (t >= 53.56 && t < 55.4) { ctx.save(); ctx.globalAlpha = K.clamp((55.4 - t) / 0.3); const [lx, ly] = toPanel(470, 800, cam); S.label(ctx, 'FAR AWAY', lx - 40, ly - 190, B(t, 53.56, 0.4), { align: 'center', size: 44, fill: C.yellow }); S.arrow(ctx, [lx - 40, ly - 160], [lx, ly - 22], B(t, 53.8, 0.4, 'out'), { width: 16, bend: -0.15 }); ctx.restore(); }
    if (t >= 58.3 && t < 59.4) { const [px, py] = toPanel(600, 470, cam); sfx(ctx, 'STOMP!', px, py, 70, B(t, 58.3, 0.15), { rot: -0.1, fill: C.yellow }); }
    if (t >= 59.18 && t < 61.7) { const [px, py] = toPanel(470, 590, cam), v = t < 60.0 ? 2 : t < 60.82 ? 1 : 0; S.counter(ctx, v, px, py, B(t, 59.18, 0.3), { size: 70 }); }
    if (t >= 64.2 && t < 66.3) { ctx.save(); ctx.globalAlpha = K.clamp((66.3 - t) / 0.3); const [hx, hy] = toPanel(640, 600, cam); S.label(ctx, 'THE CLEVER ONE', hx, hy - 80, B(t, 64.2, 0.4), { align: 'center', size: 44, fill: C.yellow }); S.arrow(ctx, [hx - 40, hy - 50], [hx - 30, hy + 40], B(t, 64.4, 0.4, 'out'), { width: 16, bend: 0.2 }); ctx.restore(); }
    if (t >= 68.25 && t < 69.0) { const [px, py] = toPanel(440, 690, cam); sfx(ctx, 'HIM?!', px, py, 64, B(t, 68.25, 0.15), { rot: 0.08, fill: C.white }); }
    if (t >= 69.3 && t < 71.9) { const [px, py] = toPanel(685, 660, cam); ctx.save(); ctx.globalAlpha = K.clamp((71.9 - t) / 0.3); S.label(ctx, 'SAFE DISTANCE', px, py, B(t, 69.3, 0.4), { align: 'center', size: 30, fill: C.white }); ctx.restore(); }
  } };
