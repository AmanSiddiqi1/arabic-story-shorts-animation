// ===== AN-092: inside Ali's tale, the road (S4) and the market (S5) =====
// ---------- S4 (26.78-33.06): walking in place, the landscape scrolls; the small leather bag ----------
const A92_SCROLL = (t) => kfn(t, [[26.78, 0], [29.9, 330], [30.2, 345], [32.5, 380], [33.1, 450]], 'lin');
const A92_ROADBACK = () => bake('a92road', 1000, 1230, (c) => { sky(c); });
function a92Road(ctx, t) {
  ctx.drawImage(A92_ROADBACK(), 0, 0, 1000, 1230); sun(ctx, 800, 170, t); cloudFlat(ctx, 300 - ((t - 26) * 10) % 1300 + 300, 250, 0.9);
  const d = A92_SCROLL(t);
  for (const [par, fn] of [[0.35, (c) => hillTrees(c)]]) { const off = -((d * par) % 1000); for (const k of [0, 1000]) { ctx.save(); ctx.translate(off + k, 0); fn(ctx); ctx.restore(); } }
  ground(ctx);
  const off = -(d % 300); for (let x = off - 300; x < 1300; x += 300) { for (const [dx, dy, w] of [[40, 960, 40], [180, 1060, 60], [250, 930, 26]]) seg(ctx, x + dx, dy, x + dx + w, dy, 5, '#2b7a38', 2); }
}
function a92AliRoad(t) {
  const W = walk(A92_SCROLL, t, { stride: 28 });
  const A = { ...A92_ALI, x: 480, y: 900, ph: W.ph, amp: W.amp, dir: 1, mouth: 'smile', gaze: [0.8, -0.2] };
  A.y -= Math.abs(Math.sin(W.ph)) * 4 * W.amp;
  return A;
}
function a92S4(ctx, t, cam) {
  a92Road(ctx, t);
  const A = a92AliRoad(t);
  const hipBag = (P) => { const b = a92Pt(P, -36, -60); return [b[0], b[1] + 14]; };
  let bag = hipBag(A), bagRot = 0.18 * Math.sin(A.ph) * A.amp + swing(t, 32.95, 0.2);
  if (t >= 28.8 && t < 30.04) A.gaze = lookAt(a92Eye(A), bag);
  if (t >= 30.04 && t < 32.75) { const u = A92B(t, 30.04, 0.4, 'out'), palm = a92Pt(A, -20, -112); bag = [K.lerp(bag[0], palm[0], u), K.lerp(bag[1], palm[1] + 2, u)]; bagRot = 0;
    A.handLW = [bag[0], bag[1] + 6]; A.gaze = lookAt(a92Eye(A), [bag[0], bag[1] - 30]); A.brow = -0.5; A.drop = 4; }
  if (t >= 31.02 && t < 32.4) { A.handR = [16 + 6 * Math.sin(t * 14), -110]; A.lid = 0.3; A.brow = -0.2; }
  if (t >= 32.4 && t < 32.75) { const p = Math.max(pulse(t, 32.4, 0.16), pulse(t, 32.58, 0.16)); A.handRW = [bag[0] + 8, bag[1] - 70 - 14 * p]; A.gaze = lookAt(a92Eye(A), bag); }
  if (t >= 32.75) { const u = A92B(t, 32.75, 0.2), hb = hipBag(A); bag = [K.lerp(a92Pt(A, -20, -112)[0], hb[0], u), K.lerp(a92Pt(A, -20, -112)[1], hb[1], u)]; }
  a92Blink(A, t);
  person(ctx, A);
  a92Bag(ctx, bag[0], bag[1], { s: 1, rot: bagRot, sq: landSquash(t, 32.95, 0.15) * (1 - 0.12 * Math.max(pulse(t, 32.42, 0.14), pulse(t, 32.6, 0.14))), strapTo: t < 30.04 || t >= 32.95 ? a92Pt(A, 26, -142) : null });
  // dust on each footfall
  for (const f of A92_RF) dustBurst(ctx, 470 + (f.odd ? 14 : -14), 900, t - f.t, 3, 4, 8, 18, 0.35, Math.round(f.t * 10));
  return { A, bag };
}
const A92_RF = footfalls(A92_SCROLL, 26.78, 33.06, 28);
function a92O4(ctx, t, P, S, r, L) {
  if (a92In(t, 28.8, 31.0)) { const b = P(r.bag[0], r.bag[1] - 35); L.arr([b[0] - 300, b[1] - 260], [b[0] - 50, b[1] - 40], 28.8, 31.0, { width: 18, bend: 0.2 }); L.lab('SMALL LEATHER BAG', b[0] - 200, b[1] - 300, 28.8, 31.0, { size: 46 }); }
  if (t >= 31.02 && t < 32.3 && r.A) { const h = P(...a92Head(r.A)), k = t < 32.0 ? A92B(t, 31.02, 0.3, 'out') : 1 - A92B(t, 32.0, 0.3); a92Balloon(ctx, h[0] + 170, h[1] - 170, 72, [h[0] + 50, h[1] - 60], k, (c) => { c.scale(2.2, 2.2); a92Food(c, 'bread', 0, 10, 1); }); }
}

// ---------- S5 (33.06-46.68): the market; the stranger grabs the bag and claims it ----------
const A92_MKT = { palace: false, palette: 'clear' };
const A92_AX5 = (t) => kfn(t, [[33.06, -80], [34.16, 520], [40.64, 520], [41.2, 590], [45.4, 590], [45.7, 560]], 'out');
const A92_KX5 = (t) => kfn(t, [[35.56, -120], [36.26, 290], [36.98, 385]], 'out');
const A92_ONX = [[42.96, -100, 110], [43.09, -160, 215], [43.22, 1120, 900]];
const A92_AF5 = footfalls(A92_AX5, 33.06, 34.2, 28), A92_KF5 = footfalls(A92_KX5, 35.56, 37.0, 30);
function a92S5(ctx, t, cam) {
  marketStreet(ctx, { ...A92_MKT, t });
  // the seller (behind the counter), then the stall
  const Se = { ...A92_SELLER, x: 730, y: 900, dir: -1, mouth: 'smile', gaze: [-0.8, 0] };
  if (t >= 34.16 && t < 36.9) { Se.handL = PERSON_HANDS.palmsUp.L; Se.handR = PERSON_HANDS.palmsUp.R; Se.talk = talk(t, [[34.3, 35.8]]); }
  const W = walk(A92_AX5, t, { stride: 28 }); const A = { ...A92_ALI, ...W, y: 900, dir: 1, mouth: 'smile', gaze: [1, 0.1] };
  const K5 = { ...A92_KURD, ...walk(A92_KX5, t, { stride: 30 }), y: 900, dir: 1, gaze: [1, 0], brow: 0.6 };
  const hipBag = (P) => { const b = a92Pt(P, -36, -60); return [b[0], b[1] + 14]; };
  let bag = hipBag(A), bagRot = 0.15 * Math.sin(A.ph || 0) * (A.amp || 0), strap = a92Pt(A, 26, -142), fruit = null;
  // Ali at the stall
  if (t >= 34.16 && t < 36.98) { fruit = a92Reach(A, 1, [598, 768 - 30 * A92B(t, 34.6, 0.4)]); A.handRW = fruit; A.gaze = lookAt(a92Eye(A), fruit); A.drop = 6 * pulse(t, 35.0, 0.8); }
  if (t >= 34.16 && t < 36.98) Se.gaze = lookAt(a92Eye(Se), a92Eye(A));
  // the stranger: eyes on the bag before Ali notices
  if (t >= 35.56) K5.gaze = lookAt(a92Eye(K5), bag);
  if (t >= 36.26 && t < 36.98) { K5.tip = 0.08; K5.sq = 0.95; K5.gaze = gazePlan(t, [[36.26, lookAt(a92Eye(K5), bag)], [36.45, [-1, 0]], [36.62, [1, 0]], [36.8, lookAt(a92Eye(K5), bag)]], 0.07); K5.handR = [70, -150 + 30 * A92B(t, 36.5, 0.4)]; }
  if (t >= 36.98 && t < 39.56) { K5.handRW = a92Pt(A, -28, -140); K5.mouth = 'smile'; K5.brow = 0.7; K5.gaze = lookAt(a92Eye(K5), a92Eye(A)); A.sq = settleTo(t, 36.98, 1.1, 1, 0.35); A.eyes = t < 37.6 ? 'wide' : 'open'; A.gaze = lookAt(a92Eye(A), a92Eye(K5)); A.mouth = 'o'; }
  // the pomegranate pops out and the seller catches it
  if (t >= 36.98 && t < 37.6) { const u = K.clamp((t - 36.98) / 0.5); fruit = [K.lerp(598, 690, u), K.lerp(740, 760, u) - 90 * Math.sin(Math.PI * u)]; Se.handLW = [690, 770]; Se.gaze = lookAt(a92Eye(Se), fruit); }
  if (t >= 37.6 && t < 39.0) { fruit = [690, 770]; Se.handLW = [690, 776]; Se.mouth = 'o'; }
  // tug of war
  const tug = t >= 39.56 && t < 40.64;
  if (tug) { const tr = tremble(t, 2, 9); bag = [440 + tr * 2, 790]; bagRot = 0.1 * Math.sin(t * 24);
    K5.tip = -0.15; K5.handLW = [bag[0] - 40, 800]; K5.handRW = [bag[0] - 30, 790]; K5.mouth = 'open'; K5.brow = 1; K5.gaze = lookAt(a92Eye(K5), bag);
    A.tip = 0.15; A.handLW = [bag[0] + 34, 796]; A.handRW = [bag[0] + 46, 788]; A.brow = 0.8; A.mouth = 'open'; A.gaze = lookAt(a92Eye(A), bag); A.x += tr; strap = null; }
  if (t >= 40.64) { // the stranger swings it up over his head
    K5.aR = [K.lerp(1.4, 2.75, A92B(t, 40.64, 0.3, 'out')), K.lerp(1.4, 2.95, A92B(t, 40.64, 0.3, 'out'))]; const hand = a92Pt(K5, 31 + Math.sin(K5.aR[0]) * 38 + Math.sin(K5.aR[1]) * 36, -132 + Math.cos(K5.aR[0]) * 38 + Math.cos(K5.aR[1]) * 36);
    bag = [hand[0] + 6, hand[1] + 74]; bagRot = swing(t, 40.9, 0.4) + swing(t, 44.04, 0.2); strap = [hand[0], hand[1] - 2];
    K5.mouth = 'smile'; K5.lid = 0.25; K5.gaze = lookAt(a92Eye(K5), [bag[0], bag[1] - 40]);
    if (t < 41.3) { A.aL = [2.2 + Math.sin(t * 16) * 0.8, 2.4 + Math.sin(t * 16) * 0.6]; A.aR = [-2.2 - Math.cos(t * 16) * 0.8, -2.5]; A.tip = -0.1 * pulse(t, 40.64, 0.7); A.mouth = 'o'; A.eyes = 'wide'; } }
  if (t >= 41.72 && t < 44.04) { K5.handL = [-34, -178]; K5.talk = talk(t, [[41.75, 43.8]]); K5.brow = 0.8; K5.sq = 1.04; K5.gaze = [-0.9, -0.1]; }
  if (t >= 44.04 && t < 46.68) { K5.handL = t < 44.7 ? [-44, -205] : [-4, -120]; K5.lid = 0.3; K5.talk = talk(t, [[44.05, 44.6], [44.75, 45.4]]); K5.gaze = t < 44.7 ? [0.3, -1] : [0.6, 0.1]; }
  if (t >= 41.3) { A.gaze = lookAt(a92Eye(A), a92Eye(K5)); A.mouth = 'frown'; A.brow = 0.5; }
  if (t >= 45.52) { A.handL = t < 45.9 ? PERSON_HANDS.armsOut.L : PERSON_HANDS.palmsUp.L; A.handR = t < 45.9 ? PERSON_HANDS.armsOut.R : PERSON_HANDS.palmsUp.R; A.brow = -0.6; A.talk = talk(t, [[45.55, 46.6]]); A.gaze = [-0.7, -0.2]; Se.handL = PERSON_HANDS.palmsUp.L; Se.handR = PERSON_HANDS.palmsUp.R; Se.drop = 4; Se.gaze = lookAt(a92Eye(Se), a92Eye(A)); Se.mouth = 'frown'; }
  [A, K5, Se].forEach((P) => a92Blink(P, t));
  // onlookers arrive and watch, eyes ping-ponging
  const on = A92_ONX.map(([t0, x0, x1], i) => { const xf = (tt) => kfn(tt, [[t0, x0], [t0 + 0.9, x1]], 'out'); const P = { ...A92_ONL[i], ...walk(xf, t, { stride: 26 * A92_ONL[i].s }), y: 900, dir: x1 > 500 ? -1 : 1 };
    const sp = [[t0, a92Eye(K5)], [44.04 + i * 0.1, [bag[0], bag[1] - 40]], [45.52 + i * 0.12, a92Eye(A)], [46.0 + i * 0.1, a92Eye(K5)], [46.35 + i * 0.1, a92Eye(A)]]; P.gaze = look(t, a92Eye(P), sp, 0.08); if (i === 1 && t > 44.7) P.handR = PERSON_HANDS.mouthCover.R; return a92Blink(P, t); });
  person(ctx, Se);
  marketStall(ctx, { x: 730, kind: 'fruit' });
  if (t >= 42.96) on.forEach((P) => person(ctx, P));
  person(ctx, A); if (t >= 35.56) person(ctx, K5);
  if (fruit) shape(ctx, ell(fruit[0], fruit[1], 15, 14, 14), C.red, { lw: 3.5, seed: 480, dot: '#a8160f', pitch: 5, rad: 0.3, da: 0.5 });
  if (tug) { seg(ctx, bag[0] - 34, 798, bag[0] + 40, 792, 4, '#7a4212', 2); }
  a92Bag(ctx, bag[0], bag[1], { s: 1, rot: bagRot, strapTo: strap, sq: tug ? 1 + 0.06 * Math.sin(t * 20) : 1 });
  for (const f of A92_AF5.concat(A92_KF5)) dustBurst(ctx, f.x, 900, t - f.t, 3, 4, 8, 18, 0.35, Math.round(f.t * 10));
  return { A, K5, bag };
}
function a92O5(ctx, t, P, S, r, L) {
  if (a92In(t, 38.2, 40.4) && r.K5) { const h = P(...a92Head(r.K5)); L.arr([h[0] + 10, h[1] - 300], [h[0], h[1] - 90], 38.2, 40.4, { width: 18, bend: -0.2 }); L.lab('A KURDISH STRANGER', 500, h[1] - 330, 38.2, 40.4, { size: 46 }); }
  if (a92In(t, 40.5, 41.7)) L.word('YOINK!', 780, 330, 40.5, 41.7, 96, { rot: -0.1 });
  if (a92In(t, 44.7, 46.4)) L.word('MINE!', 760, 300, 44.7, 46.4, 100, { rot: 0.06, fill: C.red });
}
