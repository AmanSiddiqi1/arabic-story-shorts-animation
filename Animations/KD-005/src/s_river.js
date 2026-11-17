// ===== KD-005 scenes S9-S11: morning at the river, the theft, the cry and the chase from tree to tree =====
const K5_WPH = (t) => t * 2 * Math.PI * 2;   // two scrub strokes a second
function k5WomanRiver(t) {
  const [wx, wy] = K5_RIV.woman, P = { x: wx, y: wy, s: 0.8, dir: -1, costume: 'villageWoman', kneel: 1, seed: 11, mouth: 'smile', lid: Math.max(0.5, blink(t, 11)) };
  const ph = K5_WPH(t), sc = [690 + 14 * Math.sin(ph), 724 + 3 * Math.cos(ph)]; let cloth = [sc[0] - 6, sc[1] + 8], fold = 0.5, drip = false;
  P.handLW = [sc[0] + 10, sc[1] + 4]; P.handRW = [sc[0] - 10, sc[1] - 2]; P.lean = 0.06 + 0.05 * Math.sin(ph); P.gaze = [-0.6, 0.6];
  if (t >= 87.7 && t < 88.8) { const d = Math.sin(Math.PI * k5u(t, 87.7, 88.8)), p = [688 - 6 * d, 724 + 52 * d]; P.handLW = [p[0] + 8, p[1]]; P.handRW = [p[0] - 8, p[1] - 4]; cloth = [p[0], p[1] + 14]; fold = 0.2; drip = t > 88.3; P.lean = 0.12; }
  if (t >= 92.5 && t < 93.3) { const w = Math.sin((t - 92.5) * 18); P.handL = [16, -128 + 4 * w]; P.handR = [30, -122 - 4 * w]; P.handLW = P.handRW = null; P.lean = 0; cloth = null; fold = 1; }
  if (t >= 96.12 && t < 97.0) { const g = pulse(t, 96.12, 0.88); P.handR = [K.lerp(30, 6, g), K.lerp(-150, -218, g)]; P.handRW = null; P.lid = Math.max(0.5, g * 0.8); P.mouth = 'closed'; }
  if (t >= 99.4) { P.handLW = [705, 728]; P.handRW = [690, 722]; P.lean = 0; P.mouth = 'o'; P.lid = 0;
    P.look = blend(t, 99.4, 99.7, 0, -1); if (t >= 99.8) { P.dir = 1; P.look = 0.6; } P.gaze = t < 100.1 ? [1, 0.4] : lookAt([wx, wy - 150], [855, 330]); }
  return { P, cloth: t >= 101.9 ? null : cloth, fold, drip };
}
function k5RiverScene(ctx, t, extra) {
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.clip(); skyCycle(ctx, kfn(t, [[81.4, 0.03], [83.3, 0.26]]), { t }); ctx.restore();
  river(ctx, t, { back: true }); ctx.drawImage(k5RiverLand(), 0, 0, 1000, 1230);
  extra(ctx);
  river(ctx, t, { front: true });
}
// the raven at the river (S9 / S10)
function k5RiverRv(t) {
  const [rx, ry] = K5_RIV.ridge, P = { x: rx, y: ry, s: 1.0, dir: -1, seed: 3 };
  if (t < 84.4) { const u = k5u(t, 83.4, 84.4), b = K.bezier([1080, 120], [980, 140], [900, 250], [rx, ry], 24), q = b[Math.round(u * 24)]; return { ...P, x: q[0], y: q[1], fly: true, flap: Math.sin(t * 12) * 0.6 - (u > 0.8 ? 0.6 : 0), sq: 1.06 }; }
  P.sq = landSquash(t, 84.4, 0.14) * 1.02; P.gaze = gazePlan(t, [[84.4, [-1, 0.4]], [84.85, [1, 0.3]], [85.1, [-0.6, 1]], [86.1, lookAt([rx - 32, ry - 64], [742, 680])]], 0.07);
  if (t >= 89.0) P.gaze = lookAt([rx - 32, ry - 64], K5_RIV.rock);
  if (t >= 91.7) { P.lid = Math.max(0.3, blink(t, 3) * 0); P.gaze = lookAt([rx - 32, ry - 64], K5_RIV.rock); }
  if (t >= 93.3) { P.gaze = gazePlan(t, [[93.3, lookAt([rx - 32, ry - 64], [742, 640])], [93.55, lookAt([rx - 32, ry - 64], K5_RIV.rock)]], 0.07); P.sq = anticipate(t, 93.3, 0.6, 0.18) * (t > 93.9 ? 0.82 : 1); P.sag = -0.3 * K5_B(t, 93.4, 0.3); P.lid = 0.25; P.brow = 1; }
  if (t >= 94.2) { const u = k5u(t, 94.2, 95.3), b = K.bezier([rx, ry], [700, 420], [700, 760], [892, 796], 30), q = b[Math.round(K.ease.in(u) * 30)]; if (u < 1) return { ...P, x: q[0], y: q[1], fly: true, flap: u < 0.7 ? -0.6 : 0.9, sq: 1.15, rot: u < 0.6 ? -0.7 * (1 - u) : 0, dir: u < 0.45 ? -1 : 1, brow: 1 }; }
  if (t >= 95.3) { Object.assign(P, { x: 892, y: 796, dir: -1, sq: landSquash(t, 95.3, 0.1) * 0.9, sag: 0, brow: 0.5, lid: 0, gaze: lookAt([860, 730], [742, 640]) }); }
  if (t >= 96.1 && t < 97.0) { P.gaze = lookAt([860, 730], [742, 650]); P.noBlink = true; }
  if (t >= 97.0) { const d = pulse(t, 97.0, 0.6); P.drop = 16 * d; P.headRot = -0.6 * d; P.gaze = [-0.6, 1]; P.sq = 0.9 + 0.12 * K5_B(t, 97.4, 0.4); }
  if (t >= 97.3) P.neck = { ang: swing(t, 97.4, 0.5) + 0.1, s: 0.8, spark: k5u(t, 98.1, 98.6) };
  if (t >= 98.7) { P.sq = anticipate(t, 98.7, 0.2, 0.16); P.drop = 4; }
  if (t >= 98.9) { const u = k5u(t, 98.9, 100.62), b = K.bezier([892, 796], [1000, 640], [960, 380], [rx, ry], 30), q = b[Math.round(K.ease.inOut(u) * 30)]; if (u < 1) Object.assign(P, { x: q[0], y: q[1], fly: true, flap: Math.sin(t * 9) * 1.2, drop: 7, dir: u < 0.5 ? 1 : -1, sq: 1 }); P.neck.ang = -0.35 * Math.sin(t * 9) + (u < 0.5 ? 0.4 : -0.3); P.neck.spark = 0; }
  if (t >= 100.62) { Object.assign(P, { x: rx, y: ry, dir: -1, fly: false, flap: 0, drop: 0, sq: landSquash(t, 100.62, 0.14) * 1.05, gaze: lookAt([rx - 32, ry - 64], [742, 640]), brow: 0 }); P.neck = { ang: swing(t, 100.62, 0.4) + 0.3 * pulse(t, 101.2, 0.4) * Math.sin(t * 30), s: 0.8, spark: k5u(t, 101.0, 101.5) }; }
  if (t >= 101.8) { P.gaze = lookAt([rx - 32, ry - 64], [742, 640]); }
  if (t >= 105.7) { const u = k5u(t, 105.7, 106.5), b = K.bezier([rx, ry], [900, 330], [1000, 300], [1120, 280], 20), q = b[Math.round(u * 20)]; Object.assign(P, { x: q[0], y: q[1], fly: u > 0, flap: Math.sin(t * 10), dir: 1, gaze: [-1, 0.5] }); P.neck = { ang: -0.5, s: 0.8 }; }
  return P;
}

// ---------------- S9 81.4-94.0 ----------------
const K5S9 = { a: 81.4, ww: 1000, cam: [[81.4, { x: 520, y: 640, zoom: 1.1 }], [85.2, { x: 520, y: 640, zoom: 1.1 }], [86.2, { x: 740, y: 700, zoom: 1.75 }], [89.0, { x: 740, y: 700, zoom: 1.75 }], [90.2, { x: 830, y: 760, zoom: 2.6 }], [91.69, { x: 830, y: 760, zoom: 2.6 }], [91.7, { x: 825, y: 300, zoom: 4.0 }], [92.39, { x: 825, y: 300, zoom: 4.0 }], [92.4, { x: 780, y: 620, zoom: 1.5 }], [94, { x: 780, y: 620, zoom: 1.5 }]],
  draw(ctx, t) { k5RiverScene(ctx, t, (c) => {
    const W = k5WomanRiver(t); k5Neck(c, 832, 794, { mode: 'lay', s: 0.8, spark: Math.max(k5u(t, 91.06, 91.3), k5u(t, 91.35, 91.6), k5u(t, 91.6, 91.85)) });
    person(c, W.P); if (W.cloth) k5Cloth(c, W.cloth[0], W.cloth[1], { fold: W.fold, rot: 0.2 }); if (W.drip) drops(c, W.cloth[0], W.cloth[1] + 14, t, 3);
    if (t > 86.1 && t < 92.5) for (let i = 0; i < 3; i++) { const u = ((t * 0.9 + i / 3) % 1); c.save(); c.globalAlpha = 1 - u; c.lineWidth = 3; c.strokeStyle = C.black; c.fillStyle = C.white; c.beginPath(); c.arc(680 + i * 14, 740 - u * 40, 5 + 4 * u, 0, 7); c.fill(); c.stroke(); c.restore(); }
    ripple(c, 682, 774, 88.2, t, 0.8);
    const P = k5RiverRv(t); k5Raven(c, P, t);
    if (t >= 91.7 && t < 92.4) { const h = k5HeadPos(P); k5Spark(c, h[0] - 4, h[1] - 8, 5 * K5_B(t, 91.8, 0.2), t * 4); }
  }); },
  over(ctx, t, cam, S) {
    if (t >= 90.3 && t < 91.7) { const [x, y] = k5P(832, 790, cam); S.label(ctx, 'GOLD!', x, y - 250, K5_B(t, 90.3, 0.3), { align: 'center', size: 52, fill: C.yellow }); S.arrow(ctx, [x, y - 215], [x - 4, y - 50], K5_B(t, 90.45, 0.3, 'out'), { width: 18, bend: 0.05 }); }
  } };

// ---------------- S10 94.0-101.8 ----------------
const K5S10 = { a: 94.0, ww: 1000, cam: [[94, { x: 780, y: 620, zoom: 1.5 }], [94.6, { x: 790, y: 680, zoom: 1.7 }], [95.3, { x: 800, y: 760, zoom: 2.3 }], [98.7, { x: 800, y: 760, zoom: 2.3 }], [99.8, { x: 780, y: 640, zoom: 1.4 }], [101.8, { x: 780, y: 640, zoom: 1.4 }]],
  draw(ctx, t) { k5RiverScene(ctx, t, (c) => {
    const W = k5WomanRiver(t); if (t < 97.3) k5Neck(c, 832, 794, { mode: 'lay', s: 0.8 });
    person(c, W.P); if (W.cloth) k5Cloth(c, W.cloth[0], W.cloth[1], { fold: W.fold, rot: 0.2 });
    const P = k5RiverRv(t);
    if (t > 94.3 && t < 95.3) { const v = [P.x, P.y - 40]; c.save(); c.strokeStyle = C.white; c.lineWidth = 6; c.lineCap = 'round'; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(v[0] + 30 - i * 10, v[1] - 70 - i * 18); c.lineTo(v[0] + 90 - i * 10, v[1] - 170 - i * 18); c.stroke(); } c.restore(); }
    k5Raven(c, P, t);
  }); },
  over(ctx, t, cam, S) { if (t >= 94.5 && t < 95.6) { const [x, y] = k5P(760, 500, cam); sfx(ctx, 'SWOOP!', x, y, 70, K5_B(t, 94.5, 0.25), { rot: -0.15 }); } } };

// ---------------- S11 101.8-120.4: the cry, then the chase ----------------
const k5Man = (i, o) => ({ costume: 'villager', s: 0.82, seed: 20 + i, ...(i === 2 ? { pal: { robe: '#7aa6e8', dot: C.blue, hc: C.red }, age: 0.45 } : {}), ...o });
// river part (to 106.4)
function k5RiverPeople(t) {
  const W = k5WomanRiver(t), out = [];
  if (t >= 101.9) { const u = K5_B(t, 101.9, 0.4); Object.assign(W.P, { kneel: 1 - u, dir: 1, look: 0, lean: 0, sq: settleTo(t, 101.9, 0.95, 1.08, 0.3, 0.1), mouth: 'open', lid: 0, eyes: 'wide', handLW: null, handRW: null, aL: [-2.6, -2.9], aR: [2.6, 2.9], gaze: lookAt([742, 600], [855, 330]) }); }
  if (t >= 103.2) { Object.assign(W.P, { aL: null, aR: null, handR: PERSON_HANDS.pointUp.R, handL: [-64, -196 + 14 * Math.sin(t * 14)], x: 742 + tremble(t, 2), sq: 1, mouth: t < 104.2 ? 'open' : 'o' }); }
  if (t >= 105.7) { const x = kfn(t, [[105.7, 742], [106.5, 980]], 'in'); Object.assign(W.P, { x, ...walk((tt) => kfn(tt, [[105.7, 742], [106.5, 980]], 'in'), t, { stride: 30 }), handR: null, handL: [-20, -80], lean: 0.12, mouth: 'open' }); }
  out.push(W.P);
  const m1x = (tt) => kfn(tt, [[104.1, 1090], [104.9, 905], [105.75, 905], [106.5, 1100]], 'out'), m2x = (tt) => kfn(tt, [[104.6, 1110], [105.6, 975], [105.85, 975], [106.5, 1120]], 'out');
  if (t >= 104.1) { const P = k5Man(1, { y: 760, dir: t < 105.75 ? -1 : 1, ...walk(m1x, t, { stride: 30, amp: 60 }), lean: 0.14, gaze: lookAt([905, 600], [855, 330]), mouth: 'open', brow: 1 }); P.amp *= 1.3; P.aR = [0.9, 1.6]; out.push(P); }
  if (t >= 104.6) { const P = k5Man(2, { y: 770, dir: t < 105.85 ? -1 : 1, ...walk(m2x, t, { stride: 26, amp: 60 }), lean: 0.1, handL: [-26, -222], gaze: lookAt([975, 600], [855, 330]), mouth: 'o' }); out.push(P); }
  return { W, out };
}
// chase part (from 106.4): positions of the raven and the three runners
const K5_RX = [[106.4, 300], [107.7, 520], [108.9, 700], [109.3, 760], [110.1, 850], [111.5, 900], [112.3, 1080], [114.0, 1080], [114.6, 1530], [115.3, 1530], [115.9, 1980], [116.6, 1980], [117.6, 2200], [118.4, 2350], [119.7, 2560], [120.4, 2820]];
const K5_RY = [[106.4, 470], [107.7, 520], [108.9, 560], [109.3, 505], [110.1, 520], [111.5, 505], [112.3, 546], [114.0, 546], [114.3, 480], [114.6, 546], [115.3, 546], [115.6, 480], [115.9, 546], [116.6, 546], [117.6, 470], [118.4, 460], [119.7, 450], [120.4, 400]];
const K5_M1 = (t) => kfn(t, [[106.4, 120], [108.9, 600], [109.6, 720], [110.1, 760], [111.5, 880], [112.3, 960], [113.2, 1035], [114.0, 1050], [115.2, 1460], [115.9, 1590], [116.5, 1890], [117.6, 2080], [118.4, 2180], [119.8, 2400], [120.4, 2480]], 'lin');
const K5_W = (t) => K5_M1(t - 0.35) - 70;
const K5_M2 = (t) => kfn(t, [[106.4, -60], [108.9, 340], [110.1, 520], [111.0, 520], [112.5, 760], [113.2, 860], [115.2, 1120], [116.5, 1500], [118.4, 1850], [120.4, 2200]], 'lin');
const K5_FALLS = [K5_M1, K5_W, K5_M2].map((f) => footfalls(f, 106.4, 120.4, 30));
const k5ChaseRv = (t) => { const x = kfn(t, K5_RX, 'inOut'), y = kfn(t, K5_RY, 'inOut'), v = speed((tt) => kfn(tt, K5_RX, 'inOut'), t), perched = Math.abs(v) < 20 && y > 540;
  const P = { x, y, s: 1.05, dir: 1, seed: 3, fly: !perched, flap: perched ? 0 : Math.sin(t * (Math.abs(v) > 120 ? 13 : 6)), gaze: [-1, 0.6], neck: { ang: perched ? swing(t, 112.3, 0.3) : -K.clamp(v / 500, -0.6, 0.6) + 0.15 * Math.sin(t * 6), s: 0.8, spark: 0 } };
  if (perched) { P.sq = landSquash(t, [112.3, 114.6, 115.9].reduce((a, b) => (t >= b ? b : a), 112.3), 0.14); }
  if (t >= 117.6 && t < 118.3) { P.neck.ang = 0.5 * Math.sin((t - 117.6) * 22); P.neck.spark = Math.max(k5u(t, 117.6, 117.9), k5u(t, 117.95, 118.25)); }
  if (t >= 118.4) P.gaze = [1, 0.2];
  return P; };
function k5ChasePeople(t) {
  const R = k5ChaseRv(t), hp = [R.x + 60, R.y - 40], out = [];
  // man1 with the staff
  { const P = k5Man(1, { y: K5_GR, dir: 1, ...walk(K5_M1, t, { stride: 32, amp: 70 }), lean: 0.14, brow: 1, mouth: 'open' }); P.amp = Math.min(1.3, P.amp * 1.3);
    let sa = 0.6; P.aR = [0.9, 1.6];
    if (t >= 108.9 && t < 110.0) { P.sq = anticipate(t, 108.9, 0.15, 0.12) * (t > 109.6 ? landSquash(t, 109.6, 0.14) : 1); P.y = K5_GR - hop(t, 109.05, 0.55, 0, 0, 46)[1]; P.aR = [2.7, 2.9]; sa = kfn(t, [[109.05, -0.7], [109.4, 1.4]], 'in'); P.mouth = 'open'; }
    if (t >= 113.2 && t < 114.1) { P.gaze = lookAt([P.x, 700], hp); P.aR = [2.4, 2.9]; sa = 0.3; P.lean = 0; }
    P.gaze = P.gaze || lookAt([P.x, 700], hp); out.push({ P, staff: sa }); }
  // the woman
  { const P = { costume: 'villageWoman', s: 0.8, seed: 11, y: K5_GR, dir: 1, ...walk(K5_W, t, { stride: 30, amp: 70 }), lean: 0.12, mouth: 'open', handL: [-20, -80], gaze: lookAt([K5_W(t), 700], hp) }; P.amp = Math.min(1.2, P.amp * 1.2);
    if (t >= 111.5 && t < 112.3) { P.aR = [2.4 + 0.25 * Math.sin((t - 111.5) * 16), 2.75]; P.brow = 1; }
    if (t >= 113.3 && t < 114.1) { P.gaze = lookAt([P.x, 700], hp); P.handR = PERSON_HANDS.pointUp.R; }
    out.push({ P }); }
  // man2, puffing, holding his cap
  { const P = k5Man(2, { y: K5_GR, dir: 1, ...walk(K5_M2, t, { stride: 26, amp: 70 }), lean: 0.1, handL: [-26, -222], mouth: 'o', gaze: lookAt([K5_M2(t), 700], hp) });
    if (t >= 110.1 && t < 111.0) { P.lean = 0.35; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.lid = 0.4; P.mouth = 'open'; }
    if (t >= 110.6 && t < 111.0) { P.handR = PERSON_HANDS.wave.R; P.lean = 0.25; }
    out.push({ P }); }
  if (t >= 114.0 && t < 115.2) out.forEach((o, i) => { if (t < 114.05 + stagger(i, 0.15)) o.P.gaze = [-0.2, -1]; });
  return { R, out };
}
const K5S11 = { a: 101.8, ww: 1000,
  cam: [[101.8, { x: 760, y: 680, zoom: 1.5 }], [106.39, { x: 760, y: 640, zoom: 1.45 }]],
  camFn(t) { if (t < 106.4) return null; const R = k5ChaseRv(t), m = K5_M1(t); let x = (m + R.x) / 2 + 80; if (t >= 118.4) x = K.lerp(x, 2560, K5_B(t, 118.4, 1.3, 'inOut')); return { x, y: 640, zoom: 1.15 }; },
  wwAt(t) { return t < 106.4 ? 1000 : K5_CW; },
  draw(ctx, t) {
    if (t < 106.4) { k5RiverScene(ctx, t, (c) => { const { W, out } = k5RiverPeople(t);
      if (t >= 101.9) { const u = k5u(t, 101.9, 102.3); if (u < 1) k5Cloth(c, 690, K.lerp(732, 780, u * u), { fold: 0.3, rot: u * 2 }); ripple(c, 690, 776, 102.25, t, 1.1); }
      for (const P of out.slice(1)) person(c, P); person(c, W.P);
      const R = k5RiverRv(t); k5Raven(c, R, t);
      for (const P of out.slice(1)) if (P.aR && P.costume === 'villager' && P.seed === 21) { const h = k5Hand(P, 1, P.aR); k5Staff(c, h, 0.5 * P.dir); k5Fist(c, h, 0.82); }
    }); return; }
    ctx.drawImage(k5ChaseLayer(), 0, 0, K5_CW, 1230);
    const { R, out } = k5ChasePeople(t);
    K5_FALLS.forEach((F, i) => { for (const f of F) if (t - f.t < 0.5 && t >= f.t) dustBurst(ctx, f.x + (f.odd ? 14 : -14), K5_GR - 4, t - f.t, 3, 5, 10, 22, 0.45, Math.round(f.t * 10) + i); });
    if (t >= 116.6 && t < 117.6) for (const o of out) { const s = o.P.s, a = [o.P.x + 6, o.P.y - 200 * s]; const g = k5Grip(R); k5Dash(ctx, a, [g[0], g[1] + 40], K5_B(t, 116.6 + stagger(out.indexOf(o), 0.1), 0.3), { w: 4, col: C.yellow }); }
    for (const o of out.slice().reverse()) { person(ctx, o.P); if (o.staff != null) { const h = k5Hand(o.P, 1, o.P.aR); k5Staff(ctx, h, o.staff, 175, 50); k5Fist(ctx, h, 0.82); } }
    k5Raven(ctx, R, t);
    if (t >= 107.7 && t < 108.95) { const m = out[0].P, top = [m.x + 30, m.y - 230 * 0.82], g = [R.x, R.y - 10]; const p = K5_B(t, 107.7, 0.3); k5Dash(ctx, [top[0] + 70, top[1] - 6], [top[0] + 70, K.lerp(top[1], g[1] + 10, p)], 1, { w: 5, col: C.white }); }
  },
  over(ctx, t, cam, S) {
    if (t >= 102.0 && t < 103.4) { const [x, y] = k5P(742, 540, cam); sfx(ctx, 'HEY!', x - 60, y - 40, 90, K5_B(t, 102.0, 0.2), { rot: -0.12, fill: C.red }); }
    if (t >= 108.0 && t < 108.95) { const R = k5ChaseRv(t), m = K5_M1(t), [x, y] = k5P(m + 100, (R.y + 700) / 2, cam); S.label(ctx, 'NOT TOO HIGH', x + 140, y, K5_B(t, 108.0, 0.3), { align: 'center', size: 40 }); }
    if (t >= 109.4 && t < 110.2) { const [x, y] = k5P(K5_M1(t) + 60, 520, cam); sfx(ctx, 'SWISH!', x, y - 40, 60, K5_B(t, 109.4, 0.2), { rot: 0.1, fill: C.white }); }
    const tc = t >= 115.3 ? 3 : t >= 114.46 ? 2 : t >= 113.28 ? 1 : 0;
    if (tc > 0 && t < 118.4) { S.label(ctx, 'TREE', 170, 150, K5_B(t, 113.28, 0.3), { align: 'center', size: 40 }); S.counter(ctx, tc, 170, 290, K5_B(t, [113.28, 114.46, 115.3][tc - 1], 0.3), { size: 90 }); }
  } };
