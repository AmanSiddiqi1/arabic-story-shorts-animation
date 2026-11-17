// ===== AN-140 Said's street (one 1600 strip): S1 0-9.4, S2 9.4-21.6, S13 122.4-128.3, S16 149.6-157.2, S17 157.2-174.9 =====
// Said's house x 968..1330: door 1130..1230 (cx 1180), shuttered window 990..1080 x 530..630 (both drawn by the scene).
const A140_HOUSES = [
  { x0: -10, x1: 300, top: 500, col: 0, door: [60, 150, 650, 'round'], windows: [[200, 570, 78, 92]] },
  { x0: 308, x1: 620, top: 470, col: 1, windows: [[340, 570, 78, 92], [520, 570, 78, 92]] },
  { x0: 628, x1: 960, top: 520, col: 2, door: [680, 770, 650, 'round'], windows: [[850, 580, 78, 92]] },
  { x0: 968, x1: 1330, top: 450, col: 0, windows: [] },
  { x0: 1338, x1: 1610, top: 500, col: 1, windows: [[1380, 570, 78, 92], [1500, 570, 78, 92]] },
];
const A140_SD = { x0: 1130, x1: 1230, top: 640, cx: 1180 }, A140_SW = [990, 530, 90, 100];
const A140_MULES = [100, 300, 500, 700], A140_MS = 0.72, A140_HX = 960;   // mule line (S13-S17) and the heap centre
const a140W = (P, l) => { const s = P.s || 1, d = Math.sign(P.dir || 1); return [P.x + l[0] * s * d, P.y + l[1] * s * (P.sq ?? 1)]; };

function a140Sky(ctx, u, cam, t) { ctx.save(); ctx.translate(cam.x - 500, 0); skyCycle(ctx, u, { w: 1000, t, hills: false }); ctx.restore(); }
function a140StreetSet(ctx, t, cam, o) {
  a140Sky(ctx, o.u, cam, t);
  const so = { w: 1600, sky: false, palace: false, houses: A140_HOUSES, doors: [0, 0], stalls: [{ x: 170, kind: 'fruit', state: 'closed', w: 240 }], props: [['crate', 450, {}], ['pots', 1520, {}]], t };
  marketStreet(ctx, { ...so, palette: o.pal || 'clear' });
  if (o.toClear > 0) { ctx.save(); ctx.globalAlpha *= o.toClear; marketStreet(ctx, { ...so, palette: 'clear' }); ctx.restore(); }
  // Said's door (always ours) and window
  const lit = o.lit || 0, D = A140_SD;
  if (lit > 0) { ctx.save(); ctx.globalAlpha *= 0.45 * lit; ctx.fillStyle = '#ffd98a'; K.poly(ctx, [[D.x0, 900], [D.x1, 900], [D.x1 + 90, 1060], [D.x0 - 90, 1060]], true); ctx.fill(); ctx.restore(); }
  ink(ctx, townArchPts(D.x0 - 12, D.x1 + 12, D.top - 12, 900, 'round').slice(1, -1), 9, 48);
  townDoor(ctx, D.x0, D.x1, D.top, 900, o.door || 0, { arch: 'round', paint: WOOD, inside: lit > 0 ? (c) => { c.save(); c.globalAlpha *= lit; c.fillStyle = '#ffd98a'; c.fillRect(D.x0, D.top, 100, 260); c.fillStyle = dotPat(c, C.yellow, 10, 0.3); c.fillRect(D.x0, D.top, 100, 260); c.restore(); } : null });
  const [wx, wy, ww, wh] = A140_SW; seg(ctx, wx - 10, wy + wh + 6, wx + ww + 10, wy + wh + 6, 8, '#a8741a', 3);
  townWindow(ctx, wx, wy, ww, wh, { lit: o.winLit || 0, shutters: o.shut ?? 0, inside: o.winInside, col: C.blue });
}
// door leaf over an actor who is going in (clip the actor first with a140DoorClip)
const a140DoorLeaf = (ctx, open) => townDoor(ctx, A140_SD.x0, A140_SD.x1, A140_SD.top, 900, open, { arch: 'round', paint: WOOD, leafOnly: true });
function a140DoorClip(ctx) { ctx.beginPath(); ctx.rect(-400, 0, A140_SD.x0 + 400, 1230); K.poly(ctx, townArchPts(A140_SD.x0, A140_SD.x1, A140_SD.top, 900, 'round'), true); ctx.clip(); }
// a held bill at a world point
const a140HeldBill = (ctx, p, s = 0.6, rot = 0, struck = 0) => a140Bill(ctx, p[0], p[1] - 24 * s, s, { rot, struck });

// ---------- creditors ----------
// i 0 fat/angry, 1 sly, 2 old with the stick. Returns the person fields; o: x function, gaze target, etc.
function a140Cred(i, t, x, extra = {}) { const B = A140_CR[i]; return { ...B, x, y: 900, dir: 1, mouth: i === 1 ? 'smile' : 'closed', ...extra }; }

// ================= S1 + S2 (0-21.6) =================
const A140_BILLT = [6.55, 6.85, 7.12, 7.4, 7.66, 8.45];
function a140S1Said(t) {
  const P = a140Who(A140_SAID, { x: 1060, y: 900, dir: 1, mouth: 'smile', brow: 0 });
  P.sq = breathe(t, 2);
  P.tip = 0.08 * pulse(t, 0.3, 0.7);
  P.gaze = gazePlan(t, [[0, [0.3, 0.1]], [0.3, [0, 0.05]], [0.85, [1, 0.15]], [1.64, [-0.5, -0.9]], [3.4, [0.1, -1]], [3.9, [-0.5, -0.9]], [5.82, [0, -1]]], 0.2);
  if (t >= 1.64) { const u = a140E(t, 1.64, 0.55); P.handL = [-10 - 34 * u, -90 + 8 * u]; P.handR = [10 + 34 * u, -90 + 8 * u]; P.brow = -0.2; }
  if (t >= 2.2) { const u = a140E(t, 2.2, 0.3); P.handL = a140Lp([-44, -82], PERSON_HANDS.hipsHands.L, u); P.handR = a140Lp([44, -82], PERSON_HANDS.hipsHands.R, u); }
  if (t >= 5.82) { const u = a140E(t, 5.82, 0.35); P.handL = a140Lp(PERSON_HANDS.hipsHands.L, [-36, -98], u); P.handR = a140Lp(PERSON_HANDS.hipsHands.R, [36, -98], u); P.brow = -0.5; P.mouth = 'closed'; P.sq *= anticipate(t, 5.82, 0.4, 0.04); }
  // eyes follow each bill down
  for (let i = 0; i < 6; i++) { const lt = A140_BILLT[i]; if (t >= lt - 0.4 && t < lt) P.gaze = [0, K.lerp(-1, 0.4, (t - lt + 0.4) / 0.4)]; }
  P.y += Math.abs(kick(t, A140_BILLT, 5, 11, 9));
  if (t >= 7.22) { const u = a140E(t, 7.22, 0.3); P.sq *= K.lerp(1, 0.94, u); P.tip = -0.07 * u; P.mouth = 'o'; P.eyes = 'wide'; P.tilt = 0.06 * u; }
  if (t >= 7.62) { const xf = (tt) => 1060 + 10 * a140E(tt, 7.62, 0.4); Object.assign(P, walk(xf, t)); P.tip = -0.07 + swing(t, 7.66, 0.05) * 0.6; }
  if (t >= 8.32) { P.eyes = 'open'; P.brow = -0.6; P.gaze = gazePlan(t, [[0, [0, 0.4]], [8.5, [-1, 0]], [8.75, [1, 0]], [9.0, [-1, 0.1]], [9.25, [0.2, -0.3]]], 0.07); P.lid = Math.max(pulse(t, 8.62, 0.16), pulse(t, 9.08, 0.16)); }
  return P;
}
// the stack of bills: bills 1-5 flat on the hands, bill 6 upright in front of the face. hands centre (world), sway angle
function a140Stack(ctx, t, base, sway, tDrop = 99) {
  const sb = 0.85, th = 80 * sb * (1 - 0.82 * 0.95);
  for (let i = 0; i < 6; i++) { const lt = A140_BILLT[i]; if (t < lt - 0.35) break;
    const slot = i < 5 ? [0, -th * (i + 0.5)] : [0, -42], fall = K.clamp((t - lt + 0.35) / 0.35);
    let x, y, rot, flat = i < 5 ? 0.95 : 0;
    if (t >= tDrop) { // dropped: scatter to the ground by the wall and settle
      const r = K.rng(31 + i), gx = 990 + r() * 150, d = K.clamp((t - tDrop - i * 0.04) / 0.4); x = K.lerp(base[0], gx, d); y = K.lerp(base[1] + slot[1], 896 - i * 2, d * d) - 40 * Math.sin(Math.PI * d); rot = d * (r() - 0.5) * 2; flat = K.lerp(flat, 0.92, d);
      a140Bill(ctx, x, y, sb, { rot, flat, seed: i }); continue; }
    const c = Math.cos(sway), sn = Math.sin(sway), lx = slot[0] * c - slot[1] * sn, ly = slot[0] * sn + slot[1] * c;
    x = base[0] + lx; y = fallY(t, lt - 0.35, lt, base[1] + ly - 520, base[1] + ly); rot = sway + (1 - fall) * (i % 2 ? 0.8 : -0.7);
    const sq = impactSquash(t, lt, 0.8); ctx.save(); ctx.translate(x, y); ctx.scale(1, sq); ctx.translate(-x, -y); a140Bill(ctx, x, y, i === 5 ? 0.95 : sb, { rot, flat, seed: i }); ctx.restore(); }
}
function a140S2Creds(t) {
  const X = [kfn(t, [[10.12, 450], [11.75, 1075]]), kfn(t, [[10.3, 380], [12.05, 945]]), kfn(t, [[10.5, 290], [12.6, 825]])];
  const fns = [(tt) => kfn(tt, [[10.12, 450], [11.75, 1075]]), (tt) => kfn(tt, [[10.3, 380], [12.05, 945]]), (tt) => kfn(tt, [[10.5, 290], [12.6, 825]])];
  const out = [], door = [A140_SD.x0, 780], win = [1035, 580];
  const lap = t >= 12.66 && t < 14.1 ? Math.floor((t - 12.66) / 0.48) : -1;
  for (let i = 0; i < 3; i++) {
    const P = a140Cred(i, t, X[i], { ...walk(fns[i], t) }); const head = a140Head(P), bob = i === 2 ? 0.7 : 1;
    P.gaze = lookAt(head, door); P.handL = [-30, -230]; if (i === 2) P.handR = [40, -90];
    if (i === 1) P.handL = [-50, -110];
    // knocks (cr1): lift and whip; the others lean in
    if (i === 0 && t >= 11.75) { let h = 0; for (const k of [11.95, 12.2, 12.45]) h += pulse(t, k - 0.12, 0.2); P.handR = [62 + 18 * h, -150 - 10 * h]; P.handL = [-30, -110]; P.brow = 0.8; }
    if (i > 0 && a140In(t, 11.9, 12.66)) P.tip = 0.05 * a140E(t, 11.9 + i * 0.13, 0.25);
    // the day laps: knock, call, wave the bill (each creditor on its own phase)
    if (lap >= 0) { const ph = ((t - 12.66) % 0.48) / 0.48;
      if (lap === 0) { if (i === 0) P.handR = [62 + 18 * Math.abs(Math.sin(ph * Math.PI * 3)), -150]; else P.tip = 0.04; }
      if (lap === 1) { P.handR = PERSON_HANDS.cupMouth.R; P.talk = 0.8 * Math.abs(Math.sin((ph + i * 0.3) * Math.PI * 2)); if (i === 2) P.hold = null; }
      if (lap === 2) { P.handL = [-30 + 14 * Math.sin((ph + i * 0.25) * Math.PI * 4), -230]; P.talk = 0.6; } }
    if (t >= 14.12) { const sh = Math.sin(t * 16 + i * 2) * 12; P.handL = i === 1 ? [-30, -200 + sh] : [-30 + sh, -225]; P.talk = a140In(t, 14.12 + i * 0.4, 14.62 + i * 0.4) ? 0.5 + 0.5 * Math.abs(Math.sin(t * 11 + i)) : 0;
      if (i === 1) { P.handR = PERSON_HANDS.palmsUp.R; P.handL = [44 - 6 * Math.abs(Math.sin(t * 9)), -112]; }
      if (i === 2) P.y -= 4 * Math.max(pulse(t, 14.3, 0.18), pulse(t, 14.7, 0.18), pulse(t, 15.1, 0.18)) * bob; }
    if (t >= 15.4) { if (i !== 1) { P.handR = i === 2 ? [40, -90] : PERSON_HANDS.palmsUp.R; } if (i === 2) P.handL = [-58, -104];
      const tc = 15.4 + stagger(i, 0.25); if (t >= tc && t < 16.3) P.gaze = lookAt(head, a140W(P, i === 2 ? [-58, -104] : [60, -100])); }
    if (t >= 16.3) { P.gaze = lookAt(head, door); P.talk = 0; P.handL = i === 1 ? [-50, -110] : [-30, -120]; P.handR = i === 2 ? [40, -90] : [44, -108]; }
    out.push(P);
  }
  return out;
}
function a140S12World(ctx, t, cam) {
  const W = {}; const u = t >= 12.66 && t < 14.1 ? 0.22 + 3 * (t - 12.66) / 1.44 : 0.22;
  // Said in the window (S2, 16.72-21.6)
  const inWin = t >= 16.72 ? (c) => { const P = a140Who(A140_SAID, { x: 1035, y: 761, dir: 1, brow: -0.6, mouth: 'closed' });
      const E = [1035, 761 - 201 * 0.9], cr = [[825, 720], [945, 720], [1075, 720]];
      P.gaze = lookAt(E, gazePlan(t, [[0, cr[0]], [16.9, cr[0]], [17.45, cr[1]], [17.95, cr[2]], [18.5, cr[1]], [18.95, cr[0]]], 0.07));
      if (t >= 17.34 && t < 19.22) P.eyes = 'wide';
      if (t >= 19.22) { P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.gaze = gazePlan(t, [[0, [-1, 0]], [19.5, [1, 0.1]], [19.8, [0, -1]], [20.1, [0, 0.4]]], 0.07); P.lid = pulse(t, 20.0, 0.45); P.mouth = 'frown'; }
      if (t >= 20.26) { P.y = 761 + 150 * a140E(t, 20.26, 0.6, 'in'); P.handL = [-30, -110]; P.handRW = t < 20.9 ? [1050, 632] : [1050, 632 + 160 * a140E(t, 20.9, 0.3, 'in')]; P.handR = null; }
      person(c, P); } : null;
  let shut = 0; if (t >= 16.72) shut = K.lerp(0, 0.33, a140E(t, 16.72, 0.25)); if (t >= 17.34) shut = K.lerp(0.33, 0.22, a140E(t, 17.34, 1.0)); if (t >= 19.22) shut = 0.5;
  const sOpen = t < 9.65 ? 0 : t < 10.25 ? 0.75 * a140E(t, 9.65, 0.2) : 0.75 * (1 - a140E(t, 10.25, 0.25));
  a140StreetSet(ctx, t, cam, { u, pal: 'clear', door: sOpen, shut, winInside: inWin });
  // creditors (S2)
  if (t >= 9.4) { const CR = a140S2Creds(t);
    for (let i = 2; i >= 0; i--) { const P = CR[i]; person(ctx, P);
      a140HeldBill(ctx, a140W(P, P.handL), 0.55, 0.1 * Math.sin(t * 3 + i));
      if (t >= 15.4 + stagger(i, 0.25) && t < 16.3) { const hp = a140W(P, i === 2 ? [-58, -104] : [60, -100]); const k = K.ease.back(K.clamp((t - 15.4 - stagger(i, 0.25)) / 0.25)); if (k > 0) { ctx.save(); ctx.translate(hp[0], hp[1] - 34); ctx.scale(k, k); a140Coin(ctx, 0, 0, 18); ctx.restore(); } }
      if (i === 0) W.c1 = a140Head(P); }
    // knock: the leaf shakes on each contact
    const kn = kick(t, [12.07, 12.32, 12.57, 12.74, 12.86, 12.98], 3, 18, 10); if (Math.abs(kn) > 0.05) { ctx.save(); ctx.translate(kn, 0); a140DoorLeaf(ctx, 0); ctx.restore(); }
  }
  // Said and his stack (S1 and the start of S2)
  if (t < 10.6) { let P; if (t < 9.4) P = a140S1Said(t); else { P = a140Who(A140_SAID, { x: 1060, y: 900, dir: 1, brow: -0.6, mouth: 'o', eyes: 'wide' });
      P.gaze = t < 9.62 ? [-1, 0] : [1, 0]; P.handL = [-36, -98]; P.handR = [36, -98]; if (t >= 9.55) { P.handL = [-30, -110]; P.handR = [30, -110]; }
      if (t >= 9.62) { const xf = (tt) => kfn(tt, [[9.62, 1060], [10.25, 1180]], 'in'); Object.assign(P, walk(xf, t)); P.tip = 0.12; } }
    W.said = a140Head(P);
    ctx.save(); if (t >= 9.9) a140DoorClip(ctx); person(ctx, P); ctx.restore();
    if (t >= 9.9 && t < 10.6) a140DoorLeaf(ctx, 0.75 * (1 - a140E(t, 10.25, 0.25)));
    const base = a140W(P, [0, -98]); a140Stack(ctx, t, [base[0] + (t >= 9.55 ? 0 : 0), base[1]], t >= 7.62 && t < 9.55 ? swing(t, 7.66, 0.06) : 0, 9.55);
    W.stack = [base[0], base[1] - 60];
  } else a140Stack(ctx, t, [1060, 811], 0, 9.55);
  // the day laps: night tint on the street
  const nt = dayCycle(u).night; if (nt > 0) { ctx.save(); ctx.globalAlpha = 0.45 * nt; ctx.fillStyle = '#0d2260'; ctx.fillRect(0, 0, 1600, 1230); ctx.restore(); }
  return W;
}
const A140_CAM12 = [[0, { x: 980, y: 690, zoom: 1.15 }], [5.8, { x: 990, y: 690, zoom: 1.15 }], [8.4, { x: 1060, y: 700, zoom: 1.45 }], [9.39, { x: 1060, y: 700, zoom: 1.45 }],
  [9.4, { x: 1000, y: 690, zoom: 1.3 }], [16.5, { x: 1000, y: 690, zoom: 1.3 }], [17.3, { x: 1035, y: 600, zoom: 1.9 }], [19.21, { x: 1035, y: 600, zoom: 1.9 }], [19.22, { x: 1035, y: 590, zoom: 2.5 }], [21.6, { x: 1035, y: 600, zoom: 2.5 }]];

// ================= S13, S16, S17 (122.4-174.9), dusk then morning =================
// Said's run in, the mules, the creditors behind them, the messenger at the door
const a140SaidX = (tt) => tt < 124.36 ? K.lerp(-120, 1080, K.clamp((tt - 122.45) / 1.91)) : 1080;
function a140Mules(ctx, t, o = {}) {
  for (let i = 0; i < 4; i++) { const mx = A140_MULES[i]; if (o.skip === i) continue;
    const pass = 122.45 + (mx + 120) / 1200 * 1.91, M = { x: mx, y: 900, s: A140_MS, dir: 1, seed: 90 + i, tailSwish: Math.sin(t * (1.6 + i * 0.3) + i), headDown: 0.12 + 0.08 * Math.sin(t * 0.7 + i * 2) };
    M.earL = 0.75 - 0.9 * pulse(t, 2 + i * 1.7 + Math.floor(t / 3.1) * 3.1, 0.25); M.earR = 0.75 - 0.9 * pulse(t, i * 1.3 + Math.floor(t / 2.7) * 2.7, 0.2);
    if (a140In(t, 122.4, 126)) { M.headTurn = 0.3 * pulse(t, pass - 0.15, 0.8); M.earL = 1 - 1.4 * pulse(t, pass, 0.3); M.tailSwish = Math.sin(t * 9 + i); }
    M.load = o.loads ? o.loads[i] : ['chest', 'sack'];
    if (o.dy) M.y -= o.dy[i] || 0; if (o.sq) M.sq = o.sq[i];
    a140Mule(ctx, M); }
}
function a140S13World(ctx, t, cam) {
  const W = {}; a140StreetSet(ctx, t, cam, { u: 0.45, pal: 'dusk' });
  const sx = a140SaidX(t), S = a140Who(A140_SAID, { x: sx, y: 900, s: 0.95, dir: 1, brow: -0.4, mouth: 'o' });
  // creditors behind the mules
  for (let i = 0; i < 3; i++) { const P = a140Cred(i, t, 200 + i * 200, { y: 878, s: A140_CR[i].s * 0.9 }); const h = a140Head(P);
    P.gaze = t < 124.5 ? lookAt(h, [sx, 720]) : lookAt(h, [A140_MULES[i + 1] - 10, 690]); if (t >= 123.96 + stagger(i)) { P.mouth = 'o'; P.eyes = 'wide'; P.brow = -0.4; } P.handL = [-34, -86]; P.handR = i === 2 ? [40, -90] : [34, -86];
    person(ctx, P); a140HeldBill(ctx, a140W(P, P.handL), 0.5, 0.3); }
  a140Mules(ctx, t);
  // messenger at the door
  const M = a140Who(A140_MSGR, { x: 1200, y: 900, dir: -1, mouth: 'smile' }); M.gaze = lookAt(a140Head(M), [sx, 720]); M.handR = [40, -120];
  const hs = [1080 + 40, 810], mh = a140W(M, [40, -120]);
  if (t >= 125.14) { M.tip = 0.2 * pulse(t, 125.0, 0.9); M.handRW = a140Lp(mh, hs, a140E(t, 125.14, 0.35)); M.handR = null; if (t > 125.6) { M.handR = [30, -90]; M.handRW = null; } M.gaze = lookAt(a140Head(M), hs); }
  person(ctx, M);
  // servant behind Said
  const vxf = (tt) => kfn(tt, [[122.6, -350], [124.9, 960]], 'out'), V = a140Who(A140_SERV, { y: 900, dir: 1, mouth: 'open', ...walk(vxf, t) });
  V.tip = 0.1 * K.clamp(V.amp); V.gaze = lookAt(a140Head(V), [1150, 700]); if (t >= 124.9) { V.mouth = 'smile'; V.handL = [-30, -90]; V.handR = [30, -90]; V.sq = 1 + 0.03 * Math.sin(t * 9); }
  if (V.x > -150) person(ctx, V);
  // Said
  Object.assign(S, walk(a140SaidX, t, { amp: 140 })); const run = K.clamp(S.amp);
  S.tip = 0.12 * run + lurch(t, 124.36, 0.18); S.gaze = [1, -0.1];
  if (run > 0.1) { const sn = Math.sin(S.ph); S.handL = [-30 + 34 * sn, -125]; S.handR = [30 - 34 * sn, -125]; }
  let let0 = null, letRoll = 1;
  if (t >= 124.36) { S.mouth = 'o'; S.gaze = lookAt(a140Head(S), [1180, 760]); S.handL = [-30, -110]; S.handR = [36, -110]; }
  if (t >= 125.0) { S.handRW = t < 125.49 ? a140Lp(a140W(S, [36, -110]), [1130, 810], a140E(t, 125.0, 0.35)) : null; S.handR = t < 125.49 ? null : [36, -110]; }
  if (t >= 125.49) { // letter in both hands, in front of him
    const op = a140E(t, 125.92, 0.55), tr = t >= 126.72 ? tremble(t, 3, 11) : 0; letRoll = 1 - op;
    let0 = [1080 + tr, 815 + tr * 0.5]; S.handLW = [let0[0] - K.lerp(40, 52, op), let0[1] + 4]; S.handRW = [let0[0] + K.lerp(40, 52, op), let0[1] + 4]; S.handL = S.handR = null;
    S.gaze = lookAt(a140Head(S), [let0[0], let0[1] - 20]); S.brow = -0.5; S.mouth = 'closed'; if (t >= 126.72) { S.wet = true; S.drop = 4 * pulse(t, 127.2, 0.4); S.mouth = 'o'; } }
  person(ctx, S); W.said = a140Head(S);
  // the letter: in the messenger's hand, handed over, opened
  if (t < 125.14) a140Letter(ctx, mh[0], mh[1] - 6, 0.5, { roll: 1, seal: true, rot: -0.3 });
  else if (t < 125.49) { const p = a140Lp(mh, hs, a140E(t, 125.14, 0.35)); a140Letter(ctx, p[0], p[1] - 6, 0.5, { roll: 1, seal: true, rot: -0.3 + 0.3 * a140E(t, 125.14, 0.35) }); }
  else a140Letter(ctx, let0[0], let0[1], 0.6, { roll: letRoll, seal: true, broken: t >= 125.92, lines: a140E(t, 126.3, 0.6) });
  if (t >= 124.36) for (const dx of [-14, 18]) a140Dust(ctx, 1080 + dx, 900, t, 124.36, 5, dx > 0 ? 2 : 3);
  W.letter = [1080, 815, 0.6];
  return W;
}
const A140_CAM13 = [[122.4, { x: 455, y: 640, zoom: 1.1 }], [124.4, { x: 1000, y: 650, zoom: 1.1 }], [125.3, { x: 1030, y: 670, zoom: 1.15 }], [126.0, { x: 1080, y: 760, zoom: 1.9 }], [128.3, { x: 1080, y: 760, zoom: 1.95 }]];

// ---------- S16 + S17 ----------
const A140_TOSS = [[151.7, 3], [152.5, 4]];          // [toss time, heap item]; the chest leaves the mule at 700, lands 0.45 s later
const A140_PURSE = [[156.28, 0], [157.6, 1], [158.3, 2]];   // Said hands a purse to creditor i
function a140CredLate(i, t) {
  // queue in front (y 940), step up to Said, take the purse, bow, leave left
  const [tp] = A140_PURSE[i], start = [520, 400, 280][i];
  const keys = i === 0 ? [[149.6, start], [155.3, start], [156.05, 990], [157.1, 990], [158.6, 300]] : i === 1 ? [[149.6, start], [156.3, start], [156.7, 640], [157.0, 640], [157.4, 990], [158.2, 990], [160.0, 300]] : [[149.6, start], [156.3, start], [156.8, 520], [157.5, 520], [158.1, 990], [158.9, 990], [161.2, 300]];
  const xf = (tt) => kfn(tt, keys), leaving = t > keys[keys.length - 2][0];
  const P = a140Cred(i, t, xf(t), { y: 940, ...walk(xf, t) }); P.dir = leaving ? -1 : 1;
  const h = a140Head(P); P.gaze = lookAt(h, [1100, 730]); P.handL = [-34, -100]; P.handR = i === 2 ? [40, -90] : [34, -100];
  if (t >= tp - 0.5 && t < tp + 0.45) { P.handR = [70, -120]; if (i === 2) P.hold = null; }
  if (t >= 156.3 && t < tp - 0.5 && i > 0) { P.handR = [70, -110]; P.handL = [-20, -120]; P.mouth = 'smile'; }   // eager hands
  if (t >= tp + 0.2) { P.brow = -0.4; P.mouth = 'smile'; P.tip = 0.28 * pulse(t, tp + 0.25, 0.7) * (P.dir); }
  if (leaving) P.gaze = [-1, 0.1];
  return { P, xf, paid: t >= tp + 0.2, tp };
}
function a140S1617World(ctx, t, cam) {
  const W = {}, S17 = t >= 157.2;
  const morn = a140E(t, 169.58, 1.1), u = t < 169.58 ? 0.45 : 0.45 + 0.63 * morn;
  const sOpen = t < 169.58 ? 0 : t < 174.0 ? a140E(t, 169.58, 0.6) : 1 - 0.9 * a140E(t, 174.0, 0.6);
  a140StreetSet(ctx, t, cam, { u, pal: 'dusk', toClear: a140E(t, 169.9, 0.8), door: sOpen, lit: a140E(t, 169.7, 0.6), shut: t < 169.58 ? 0 : a140E(t, 169.7, 0.6), winLit: a140E(t, 169.7, 0.6) });
  // servant leads the last mule in (170.88); the mule passes behind the heap and Said and goes in at the door
  const mxf = (tt) => kfn(tt, [[170.88, 700], [173.6, 1340]], 'lin'), vxf = (tt) => kfn(tt, [[170.88, 790], [172.3, 1185]], 'lin');
  const loads = S17 ? [[], [], [], []] : [['chest', 'sack'], ['chest', 'sack'], ['chest', 'sack'], t < 151.7 + 0.2 ? ['chest', 'sack'] : t < 152.5 + 0.2 ? ['sack'] : []];
  const dy = [0, 0, 0, 6 * a140E(t, 151.9, 0.3) + 6 * a140E(t, 152.7, 0.3)], msq = [1, 1, 1, 1 + 0.04 * (pulse(t, 151.9, 0.4) + pulse(t, 152.7, 0.4))];
  a140Mules(ctx, t, { loads, dy, sq: msq, skip: t >= 170.88 ? 3 : null });
  if (t >= 170.88) { ctx.save(); a140DoorClip(ctx);
    const M = { ...walk(mxf, t, { stride: GAIT.donkey * A140_MS }), y: 896, s: A140_MS, dir: 1, seed: 93, tailSwish: Math.sin(t * 3), earL: 0.9, earR: 0.9, load: [] }; a140Mule(ctx, M);
    const V = a140Who(A140_SERV, { y: 892, dir: 1, mouth: 'smile', ...walk(vxf, t) }); V.handL = [-60, -110]; person(ctx, V);
    const hp = a140W(V, [-60, -110]); seg(ctx, hp[0], hp[1], M.x + 150 * A140_MS * 1.1, 900 - 230 * A140_MS, 3, '#7a4212', 1); ctx.restore(); }
  // the servant unloads (S16) and waits (S17)
  if (t < 170.88) { const V = a140Who(A140_SERV, { x: 790, y: 915, dir: -1, mouth: 'smile' }); V.gaze = lookAt(a140Head(V), [700, 700]);
    let carry = null;
    for (const [tt, item] of A140_TOSS) { if (t >= tt - 0.5 && t < tt) { V.handLW = [690, 710]; V.handRW = [720, 700]; V.tip = 0.1; }
      if (t >= tt && t < tt + 0.45) { const u = (t - tt) / 0.45, dst = a140HeapPos(item, A140_HX, 900, 0.9); carry = [K.lerp(705, dst[0], u), K.lerp(690, dst[1] - 30, u) - 120 * Math.sin(Math.PI * u), item, u]; V.dir = 1; V.handL = [-20, -200]; V.handR = [20, -200]; V.gaze = lookAt(a140Head(V), carry); } }
    if (S17) { V.dir = 1; V.gaze = lookAt(a140Head(V), [1100, 720]); V.handL = [-30, -100]; V.handR = [30, -100]; if (t >= 168.34) V.mouth = 'open'; }
    person(ctx, V);
    W.carry = carry; }
  // the heap (3 items at 149.6, +2 tossed, all 9 after the cut to S17)
  const n = S17 ? 9 : 3 + A140_TOSS.filter(([tt]) => t >= tt + 0.45).length, land = {}; for (const [tt, it] of A140_TOSS) land[it] = tt + 0.45;
  a140Heap(ctx, A140_HX, 900, n, t, 0.9, { landT: land, glint: t >= 155.06 });
  if (W.carry) { const [x, y, item, u] = W.carry; ctx.save(); ctx.translate(x, y); ctx.rotate(u * 0.6 - 0.3); packLoad(ctx, [A140_HEAP[item][2]], 0, 30, 0.9); ctx.restore(); }
  // messenger right of the door
  if (t < 173.4) { const M = a140Who(A140_MSGR, { x: 1290, y: 900, dir: -1, mouth: 'smile' }); M.gaze = lookAt(a140Head(M), [1100, 720]); M.handL = PERSON_HANDS.clasp.L; M.handR = PERSON_HANDS.clasp.R; if (t >= 155.06) M.tip = 0.12 * pulse(t, 155.2, 0.8); person(ctx, M); }
  // Said
  const S = a140Who(A140_SAID, { x: 1100, y: 900, s: 0.95, dir: -1, brow: -0.7, mouth: 'smile', wet: true });
  let letP = [1100, 815], letA = 1, purse = null;
  const LH = () => { S.handLW = [letP[0] - 52, letP[1] + 4]; S.handRW = [letP[0] + 52, letP[1] + 4]; S.handL = S.handR = null; };
  if (!S17) {
    letP = [1100, kfn(t, [[149.64, 815], [150.4, 850]])]; LH(); S.gaze = t < 150.84 ? lookAt(a140Head(S), [1060, 640]) : [-0.7, -0.8];
    S.drop = 2 * Math.sin(t * 13) * (t < 150.6 ? 1 : 0);
    if (t >= 153.2) { const m = Math.min(3, Math.floor((t - 153.2) / 0.6) + 1); S.tip = -0.035 * m; S.mouth = 'o'; }
    if (t >= 155.06) { S.tip = -0.1 + 0.06 * a140E(t, 155.3, 0.4); S.handLW = S.handRW = null; S.handL = PERSON_HANDS.cheeks.L; S.handR = PERSON_HANDS.cheeks.R; S.mouth = 'open'; S.eyes = 'wide'; letA = 0; }
    if (t >= 155.06) { letP = [1146, 846]; letA = 0.7; }
  }
  if (t >= 155.8) { // purses to the creditors: the letter goes to his left hand, the right hand gives
    S.mouth = 'smile'; S.eyes = 'open'; S.tip = 0; S.handLW = [1138, 840]; S.handL = null; S.handR = [30, -105]; S.handRW = null; S.gaze = lookAt(a140Head(S), [990, 730]); letA = 0.7; letP = [1140, 812];
    for (const [tp, i] of A140_PURSE) { if (t >= tp - 0.5 && t < tp + 0.2) { const u = a140E(t, tp - 0.5, 0.45); S.handRW = a140Lp(a140W(S, [20, -100]), [1040, 790], u); S.handR = null; purse = [S.handRW[0], S.handRW[1] + 14]; } } }
  if (S17) {
    if (t >= 158.52) { letA = 1; letP = [1100, 830]; LH(); S.gaze = gazePlan(t, [[0, [0, 1]], [158.52, [-0.2, 0.9]], [159.2, [0.3, -0.9]]], 0.4); S.brow = K.lerp(-0.6, -0.9, a140E(t, 159.2, 0.6)); S.mouth = t >= 159.2 ? 'o' : 'closed'; S.wet = true; }
    if (t >= 159.66 && t < 166.56) { S.gaze = [-0.3, -0.95]; S.mouth = t >= 163.78 ? 'smile' : 'o'; }
    if (t >= 166.56) { letA = 0; S.handLW = S.handRW = null; S.handL = [-30, -100]; S.handR = [30, -100]; S.mouth = 'o'; S.gaze = gazePlan(t, [[0, [-0.4, 0.3]], [166.7, [-0.4, -0.2]], [167.14, [-0.3, -1]]], 0.4); }
    if (t >= 167.14) { S.tip = -0.1 * a140E(t, 167.14, 0.4) * (1 - a140E(t, 168.0, 0.3)); S.tilt = -0.14 * pulse(t, 167.4, 0.9); S.handR = t < 168.0 ? a140Lp([30, -100], [14, -246], a140E(t, 167.45, 0.25)) : [30, -100]; }
    if (t >= 168.0) { S.sq = anticipate(t, 168.0, 0.34, 0.1) * landSquash(t, 168.8, 0.14); S.y = 900 - hop(t, 168.34, 0.46, 0, 0, 34)[1]; if (t >= 168.2 && t < 169.2) { S.eyes = 'shut'; S.mouth = 'open'; } S.handL = [-44, -150]; S.handR = [44, -150]; }
    if (t >= 169.2) { S.mouth = 'smile'; S.eyes = 'open'; S.handL = [-30, -100]; S.handR = [30, -100]; S.gaze = [0.3, -0.7]; }
    if (t >= 170.28) { const u = a140E(t, 170.28, 0.4); S.handL = a140Lp([-30, -100], [-62, -228], u); S.handR = a140Lp([30, -100], [62, -228], u); S.gaze = [0, -1]; S.lid = 0.25; S.brow = -0.3; }
    if (t >= 171.4) { S.lid = null; S.handL = [-30, -100]; S.gaze = lookAt(a140Head(S), [1150, 760]); S.handR = [64 + 10 * Math.sin(t * 9), -196]; S.drop = 3 * pulse(t, 171.6, 0.5); }
    if (t >= 172.4) S.gaze = [0, 0.05];
    if (t >= 173.4) { const xf = (tt) => kfn(tt, [[173.4, 1100], [173.95, 1180]]); Object.assign(S, walk(xf, t)); S.dir = t < 173.95 ? 1 : -1; S.handR = t < 173.95 ? [30, -100] : [64 + 10 * Math.sin(t * 9), -196]; S.gaze = t < 173.95 ? [1, 0] : [0, 0.05]; }
  }
  // creditors in front (y 940)
  const late = [0, 1, 2].map((i) => a140CredLate(i, t));
  ctx.save(); if (t >= 173.4) a140DoorClip(ctx); person(ctx, S); ctx.restore(); W.said = a140Head(S);
  if (t >= 173.4) a140DoorLeaf(ctx, sOpen);
  if (letA > 0) a140Letter(ctx, letP[0], letP[1], letA < 1 ? 0.4 : 0.6, { roll: 0, seal: true, broken: true, rot: letA < 1 ? 0.2 : 0 });
  if (t >= 155.8 && t < 155.8 + 0.3) a140Purse(ctx, ...a140W(S, [30, -95]), 0.6);
  if (purse) a140Purse(ctx, purse[0], purse[1], 0.6);
  for (let i = 2; i >= 0; i--) { const { P, paid, tp } = late[i]; if (P.x < 300 || (t < 149.6)) continue; person(ctx, P);
    const bh = a140W(P, P.handL); if (!paid) a140HeldBill(ctx, bh, 0.5, 0.15); else { const d = t - tp - 0.2, fx = bh[0] - 20 * d, fy = Math.min(905, bh[1] + 160 * d * d * 4); a140Bill(ctx, fx + 10 * Math.sin(d * 9), fy, 0.5, { rot: Math.sin(d * 7) * 0.6, struck: 1, flat: fy >= 904 ? 0.9 : 0 }); }
    if (paid) a140Purse(ctx, ...a140W(P, P.handR), 0.6);
    if (i === 0) W.c1 = a140Head(P); }
  W.heapTop = a140HeapTop(A140_HX, 900); W.letter = [letP[0], letP[1], 0.6];
  return W;
}
const A140_CAM1617 = [[149.6, { x: 1100, y: 760, zoom: 1.7 }], [150.9, { x: 1100, y: 760, zoom: 1.7 }], [153.0, { x: 900, y: 660, zoom: 1.05 }], [157.19, { x: 900, y: 660, zoom: 1.05 }],
  [157.2, { x: 1060, y: 700, zoom: 1.5 }], [165.6, { x: 1060, y: 700, zoom: 1.5 }], [166.56, { x: 1040, y: 790, zoom: 1.5 }], [168.3, { x: 1010, y: 615, zoom: 1.0 }], [174.9, { x: 1010, y: 615, zoom: 1.0 }]];
