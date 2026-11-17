// ===== KD-005 scenes S12-S15 (home tree): the drop, the snake rises, the fight, two days of watching, new chicks, THE END =====
const K5_NLAY = [842, 873];   // where the necklace lies on the burrow lip
const K5_HM1 = (t) => kfn(t, [[127.68, -140], [129.9, 770]], 'out'), K5_HW = (t) => kfn(t, [[128.5, -140], [130.1, 640]], 'out'), K5_HM2 = (t) => kfn(t, [[129.0, -160], [130.3, 470]], 'out');
const K5_HFALLS = [K5_HM1, K5_HW, K5_HM2].map((f, i) => footfalls(f, [127.68, 128.5, 129.0][i], 130.4, 30));
const K5_GRIP = { aR: [2.3, 2.42], aL: [1.95, 2.12] };

// ---------------- S12 120.4-133.9 ----------------
function k5S12Rv(t) {
  const P = { x: 860, y: 740, dir: 1, seed: 3, s: 1.2 };
  if (t < 121.5) { const u = k5u(t, 120.4, 121.5), b = K.bezier([-80, 520], [300, 560], [640, 720], [860, 740], 30), q = b[Math.round(K.ease.out(u) * 30)]; Object.assign(P, { x: q[0], y: q[1], fly: true, flap: Math.sin(t * (u < 0.7 ? 15 : 8)), gaze: [1, 0.3] }); }
  else { Object.assign(P, { fly: true, flap: Math.sin(t * 8), y: 740 + 5 * Math.sin(t * 4), gaze: gazePlan(t, [[121.5, [0.1, 1]], [122.1, [-1, 0.2]], [122.6, [0.1, 1]]], 0.15) }); }
  if (t < 124.8) P.neck = { ang: swing(t, 121.5, 0.45) + 0.1 * Math.sin(t * 4), s: 0.8 };
  if (t >= 124.0) { P.drop = -5 * pulse(t, 124.0, 0.3); P.beak = K5_B(t, 124.22, 0.25) * 1.4; }
  if (t >= 125.4) { const u = k5u(t, 125.4, 126.2), b = K.bezier([860, 740], [840, 560], [740, 500], K5_HOME.stub, 24), q = b[Math.round(K.ease.inOut(u) * 24)]; Object.assign(P, { x: q[0], y: q[1], fly: u < 1, flap: u < 1 ? Math.sin(t * 12) : 0, beak: 0, drop: 0 }); if (u >= 1) { P.sq = landSquash(t, 126.2, 0.15) * 0.9; P.drop = 4; } P.gaze = lookAt([700, 492], K5_HOME.burrow); }
  if (t >= 126.9) { P.eyes = 'wide'; P.noBlink = true; }
  if (t >= 127.7) { P.eyes = 'open'; P.noBlink = false; P.gaze = lookAt([700, 492], [400, 700]); }
  if (t >= 130.0) P.gaze = lookAt([700, 492], K5_NLAY);
  if (t >= 130.92) { P.gaze = lookAt([700, 492], [840, 760]); P.eyes = 'wide'; P.sq = 0.88; }
  if (t >= 132.3) { P.sag = -0.4 * K5_B(t, 132.4, 0.3); P.x = K5_HOME.stub[0] + tremble(t, 1.2); }
  return P;
}
function k5S12People(t) {
  const out = [];
  const m1 = k5Man(1, { s: 0.9, y: K5_GR, dir: 1, ...walk(K5_HM1, t, { stride: 32, amp: 70 }), lean: 0.14 + lurch(t, 129.9, 0.3), brow: 0.6, mouth: 'open', gaze: [1, 0.3] }); m1.amp = Math.min(1.3, m1.amp * 1.3); m1.aR = [0.9, 1.6]; let sa = 0.6;
  if (t >= 130.0) { const g = K5_B(t, 130.0, 0.6, 'inOut'); m1.lean = 0.38 * g + lurch(t, 129.9, 0.3); m1.handRW = [K.lerp(820, 835, g), K.lerp(800, 862, g)]; m1.aR = null; m1.gaze = lookAt([790, 700], K5_NLAY); m1.mouth = 'closed'; m1.aL = [-0.4, -0.2]; }
  if (t >= 131.44) { const r = t < 131.64 ? 0 : settleTo(t, 131.64, 0, 1, 0.12, 0.25); m1.eyes = 'wide'; m1.mouth = 'o'; m1.gaze = t < 131.64 ? lookAt([790, 700], [840, 800]) : [0.6, -0.5]; m1.lean = K.lerp(0.38, -0.12, r); m1.handRW = [K.lerp(835, 790, r), K.lerp(862, 760, r)]; }
  const step = (i, d) => -d * K5_B(t, 131.5 + stagger(i, 0.12), 0.25);   // v2: three separate marks on the recoil
  if (t >= 131.5) m1.x += step(0, 30);
  if (t >= 131.7) { m1.handRW = null; m1.aR = K5_GRIP.aR; m1.aL = K5_GRIP.aL; m1.brow = 1; m1.eyes = 'wide'; m1.mouth = 'closed'; m1.lean = -0.05; m1.gaze = [1, -0.4]; sa = kfn(t, [[131.7, 1.6], [131.85, 0.5]], 'out'); }   // staff snaps across his body
  out.push({ P: m1, staff: t >= 131.7 ? sa : (t >= 130.0 ? null : sa), grip: t >= 131.7, staffL: t >= 130.0 && t < 131.7 ? 0.15 : null });
  const w = { costume: 'villageWoman', s: 0.85, seed: 11, y: K5_GR, dir: 1, ...walk(K5_HW, t, { stride: 30, amp: 70 }), lean: 0.12 + lurch(t, 130.1, 0.25), mouth: 'open', handL: [-20, -80], gaze: [1, 0.3] }; w.amp = Math.min(1.2, w.amp * 1.2);
  if (t >= 128.6 && t < 130.4) w.handR = PERSON_HANDS.pointFwd.R;
  if (t >= 130.4) { w.gaze = lookAt([640, 700], K5_NLAY); w.mouth = 'closed'; w.handR = null; }
  if (t >= 131.5) { w.handL = PERSON_HANDS.cheeks.L; w.handR = PERSON_HANDS.cheeks.R; w.eyes = 'wide'; w.mouth = 'o'; w.gaze = [1, -0.3]; w.x += step(1, 45); }
  out.push({ P: w });
  const m2 = k5Man(2, { s: 0.85, y: K5_GR, dir: 1, ...walk(K5_HM2, t, { stride: 26, amp: 70 }), lean: 0.1 + lurch(t, 130.3, 0.3), handL: [-26, -222], mouth: 'open', lid: 0.35, gaze: [1, 0.2] });
  if (t >= 130.3) { m2.x += 18 * pulse(t, 130.3, 0.4); m2.lid = Math.max(0.3, blink(t, 22)); }
  if (t >= 131.62) { const g = K5_B(t, 131.62, 0.3); Object.assign(m2, walk((tt) => K.lerp(470, 545, K5_B(tt, 131.62, 0.3)), t, { stride: 22 })); m2.lean = -0.45 * g; m2.eyes = 'wide'; m2.handL = PERSON_HANDS.headHold.L; m2.handR = PERSON_HANDS.headHold.R; m2.lid = 0; m2.gaze = [1, 0.1]; m2.mouth = 'o'; }   // hides behind the trunk, head and cap peeking
  out.push({ P: m2, behind: t >= 131.62 });
  return out;
}
function k5DrawPeople(ctx, list) {
  for (const o of list) { person(ctx, o.P);
    if (o.staff != null) { if (o.grip) { const hR = k5Hand(o.P, 1, o.P.aR), hL = k5Hand(o.P, -1, o.P.aL); k5Staff(ctx, hR, o.staff * o.P.dir, 150, 70); k5Fist(ctx, hR, o.P.s); k5Fist(ctx, hL, o.P.s); }
      else if (o.P.aR) { const h = k5Hand(o.P, 1, o.P.aR); const tip = k5Staff(ctx, h, o.staff * o.P.dir, 175, 50); k5Fist(ctx, h, o.P.s); if (o.hang) o.hang(tip); } }
    if (o.staffL != null && o.P.aL) { const h = k5Hand(o.P, -1, o.P.aL); k5Staff(ctx, h, o.staffL * o.P.dir, 150, 60); k5Fist(ctx, h, o.P.s); }
    if (o.stone && o.P.handR) { const s = o.P.s, h = [o.P.x + o.P.handR[0] * s * o.P.dir, o.P.y + o.P.handR[1] * s]; shape(ctx, ell(h[0], h[1] - 4, 13, 10, 12), STONE, { lw: 4, seed: 88 }); } }
}
const K5S12 = { a: 120.4, ww: 1000, cam: [[120.4, { x: 640, y: K5_GLY(1.4), zoom: 1.4 }], [122.6, { x: 640, y: K5_GLY(1.4), zoom: 1.4 }], [124.1, { x: 800, y: K5_GLY(2.0), zoom: 2.0 }], [127.6, { x: 800, y: K5_GLY(2.0), zoom: 2.0 }], [128.3, { x: 600, y: 640, zoom: 1.3 }], [130.4, { x: 600, y: 640, zoom: 1.3 }], [131.4, { x: 680, y: K5_GLY(1.9), zoom: 1.9 }], [133.9, { x: 680, y: K5_GLY(1.9), zoom: 1.9 }]],   // v2: ground near 80 %, the raised stub in frame
  draw(ctx, t) {
    const ppl = t >= 127.68 ? k5S12People(t) : [];
    k5Home(ctx, t, { behind: (c) => k5DrawPeople(c, ppl.filter((o) => o.behind)) }); const R = k5S12Rv(t);
    k5Burrow(ctx, ...K5_HOME.burrow, { eyes: t >= 126.9 && t < 130.9 ? { open: K5_B(t, 126.9, 0.2), look: [-0.5, 0.3] } : null });
    if (t >= 124.8) { const g0 = k5Grip({ ...R, x: 860, y: 740 + 5 * Math.sin(124.8 * 4), fly: true }), lay = t >= 125.17;
      const y = lay ? K5_NLAY[1] - rebound(t, 125.1, 12, 0.2) : fallY(t, 124.8, 125.17, g0[1], K5_NLAY[1] - 30); k5Neck(ctx, lay ? K5_NLAY[0] : K.lerp(g0[0], K5_NLAY[0], k5u(t, 124.8, 125.17)), y, { mode: lay ? 'lay' : 'hang', s: 0.8, ang: 0.3, spark: t > 127.0 && t < 127.6 ? k5u(t, 127.0, 127.5) : 0 }); }
    if (t >= 126.95 && t < 127.6) { const tg = pulse(t, 126.95, 0.6); ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 3; ctx.lineCap = 'round'; const L = 22 * tg; ctx.beginPath(); ctx.moveTo(854, 872); ctx.lineTo(854 - L * 0.6, 872 + L * 0.2); ctx.stroke(); ctx.restore(); }
    if (t >= 130.92) { const hs = kfn(t, [[130.92, 0], [131.35, 72], [132.3, 72], [133.1, K5_RISE.len]], 'out'), sway = t > 132.3 ? 10 * Math.sin((t - 132.3) * 5) : 0;
      const pts = K5_RISE.slice(hs - K5_SNL, hs, 6).map(([x, y, u]) => [x + sway * Math.max(0, (880 - y) / 200), y, u]);
      k5Snake(ctx, pts, { lid: 0.2, tongue: pulse(t, 131.3, 0.3) + pulse(t, 133.3, 0.3), mouth: t > 132.4 ? K5_B(t, 132.4, 0.2) : 0, gaze: [-1, -0.2] }); k5BurrowShade(ctx, ...K5_HOME.burrow); }
    K5_HFALLS.forEach((F, i) => { for (const f of F) if (t >= f.t && t - f.t < 0.5) dustBurst(ctx, f.x + (f.odd ? 14 : -14), K5_GR - 4, t - f.t, 3, 5, 10, 22, 0.45, Math.round(f.t * 10) + i); });
    k5DrawPeople(ctx, ppl.filter((o) => !o.behind).reverse());
    k5Raven(ctx, R, t);
  },
  over(ctx, t, cam, S) {
    if (t >= 125.5 && t < 127.6) { const [x, y] = k5P(K5_NLAY[0], K5_NLAY[1], cam); S.label(ctx, 'RIGHT HERE', x - 200, y + 150, K5_B(t, 125.5, 0.3), { align: 'center', size: 44 }); S.arrow(ctx, [x - 160, y + 110], [x - 30, y + 20], K5_B(t, 125.7, 0.3, 'out'), { width: 18, bend: -0.15 }); }
    if (t >= 132.5 && t < 133.9) { const [x, y] = k5P(830, 650, cam); sfx(ctx, 'HISS!', x + 70, y - 40, 66, K5_B(t, 132.5, 0.25), { rot: 0.12, fill: C.white }); }
  } };

// ---------------- S13 133.9-140.0: the fight cloud, the necklace back, they go home ----------------
const K5_LIMP = (() => { const r = []; for (let k = 0; k <= 30; k++) { const f = k / 30; r.push([960 - f * 250, 916 - 3 * Math.sin(f * 9), f]); } return r; })();
// v2: the exit is staggered: man2 (hiding behind the trunk) scurries off first, then man1 with the snake on his staff, then the woman with the necklace
const K5_GO = (x0, t0, v) => (t) => { const u = Math.max(0, t - t0); return x0 - v * (u < 0.4 ? u * u / 0.8 : u - 0.2); };
const K5_GO2 = K5_GO(545, 137.45, 520), K5_GO1 = K5_GO(690, 138.0, 600), K5_GOW = K5_GO(805, 138.25, 620);
function k5S13People(t) {
  const out = [], hop2 = Math.abs(Math.sin((t - 134.4) * 9)) * 14 * (t > 134.4 && t < 135.6 ? 1 : 0);
  // man1
  const m1 = k5Man(1, { s: 0.9, y: K5_GR, x: 740, dir: 1, brow: 1, aR: K5_GRIP.aR, aL: K5_GRIP.aL, gaze: [1, -0.2] }); let sa = 0.5, grip = true;
  if (t >= 133.9) { const a = K5_B(t, 133.9, 0.45, 'out'); m1.aR = [K.lerp(2.3, 2.85, a), K.lerp(2.42, 3.05, a)]; m1.aL = [K.lerp(1.95, 2.5, a), K.lerp(2.12, 2.9, a)]; sa = K.lerp(0.5, -0.5, a); m1.lean = -0.1 * a; m1.mouth = 'open'; }
  if (t >= 135.5) { Object.assign(m1, walk((tt) => K.lerp(740, 690, K5_B(tt, 135.5, 0.5)), t, { stride: 26 })); m1.aR = [1.2, 1.9]; m1.aL = [-0.3, -0.2]; grip = false; sa = 1.6; m1.lean = 0; m1.brow = 0.3; m1.mouth = 'closed'; m1.gaze = [0.8, 0.6]; }
  if (t >= 137.6) { const a = K5_B(t, 137.95, 0.3); m1.dir = t < 137.95 ? 1 : -1; sa = t < 137.95 ? 1.8 : K.lerp(2.0, -1.2, a); m1.aR = t < 137.95 ? [1.0, 1.7] : [0.7, 1.3]; m1.gaze = [-1, 0]; }   // hooks the snake, shoulders the staff
  if (t >= 138.0) { Object.assign(m1, walk(K5_GO1, t, { stride: 30, amp: 60 })); m1.lean = 0.06; }
  out.push({ P: m1, staff: sa, grip, carry: t >= 137.95 });
  // woman: hops at the edge, fetches the necklace, hugs it, leaves patting it and looks back once
  const w = { costume: 'villageWoman', s: 0.85, seed: 11, y: K5_GR - hop2, x: 595, dir: 1, mouth: 'o', handL: PERSON_HANDS.cheeks.L, handR: PERSON_HANDS.cheeks.R, gaze: [1, 0.3], eyes: t < 135.6 ? 'wide' : 'open' };
  if (t >= 135.6) { w.handL = [-20, -80]; w.handR = null; w.mouth = 'closed'; }
  if (t >= 136.1) { const wx = (tt) => K.lerp(595, 805, K5_B(tt, 136.1, 0.45)), a = K5_B(t, 136.1, 0.45); Object.assign(w, walk(wx, t, { stride: 26 })); w.lean = 0.35 * pulse(t, 136.4, 0.6); w.handRW = t < 137.0 ? [K.lerp(820, 838, a), K.lerp(800, 866, K5_B(t, 136.3, 0.35))] : null; w.gaze = lookAt([770, 700], K5_NLAY); }
  if (t >= 137.0) { w.x = 805; w.amp = 0; w.lean = 0; w.handL = PERSON_HANDS.clasp.L; w.handR = PERSON_HANDS.clasp.R; w.lid = 1; w.mouth = 'smile'; w.handRW = null; }
  if (t >= 137.6) { w.lid = 0; }
  if (t >= 138.25) { Object.assign(w, walk(K5_GOW, t, { stride: 30, amp: 60 }), { dir: -1, gaze: [-1, 0] }); w.handL = [-20, -80]; w.handR = [24, -132 + 6 * Math.sin((t - 138.25) * 14)]; if (t > 138.75 && t < 139.15) { w.gaze = [1, 0.3]; w.look = 0.6; } }
  out.push({ P: w, neck: t >= 136.85 });
  // man2: peeking from behind the trunk, then scurries home first, bent over and puffing
  const m2 = k5Man(2, { s: 0.85, y: K5_GR, x: 545, dir: 1, lean: -0.45, eyes: 'wide', mouth: 'o', handL: PERSON_HANDS.headHold.L, handR: PERSON_HANDS.headHold.R, gaze: [1, 0.1] });
  if (t >= 135.6) { m2.eyes = 'open'; m2.lean = -0.4; m2.lid = 0.3; }
  if (t >= 137.45) { Object.assign(m2, walk(K5_GO2, t, { stride: 24, amp: 60 }), { dir: -1, lean: K.lerp(-0.4, 0.24, K5_B(t, 137.45, 0.3)), handL: [-26, -222], handR: null, mouth: 'o', gaze: t > 138.2 && t < 138.5 ? [1, 0.3] : [-1, 0] }); }
  out.push({ P: m2, behind: m2.x > 470 });
  return out;
}
const K5S13 = { a: 133.9, ww: 1000, cam: [[133.9, { x: 640, y: 640, zoom: 1.3 }], [137.6, { x: 640, y: 640, zoom: 1.3 }], [140, { x: 560, y: 640, zoom: 1.3 }]],
  draw(ctx, t) {
    const ppl = k5S13People(t);
    k5Home(ctx, t, { behind: (c) => k5DrawPeople(c, ppl.filter((o) => o.behind)) }); k5Burrow(ctx, ...K5_HOME.burrow, {});
    if (t < 134.5) { const pts = K5_RISE.slice(K5_RISE.len - K5_SNL, K5_RISE.len, 6).map(([x, y, u]) => [x + 10 * Math.sin((t - 132.3) * 5) * Math.max(0, (880 - y) / 200), y, u]); k5Snake(ctx, pts, { lid: 0.2, mouth: 1 }); k5BurrowShade(ctx, ...K5_HOME.burrow); }
    if (t >= 135.5 && t < 137.95) k5Snake(ctx, K5_LIMP, { eyes: 'x', tongue: 0.7 });
    if (t >= 134.4 && t < 136.85) k5Neck(ctx, ...K5_NLAY, { mode: 'lay', s: 0.8 });
    for (const o of ppl.filter((q) => !q.behind).reverse()) {
      person(ctx, o.P);
      if (o.staff != null) { if (o.grip) { const hR = k5Hand(o.P, 1, o.P.aR), hL = k5Hand(o.P, -1, o.P.aL); k5Staff(ctx, hR, o.staff * o.P.dir, 150, 70); k5Fist(ctx, hR, o.P.s); k5Fist(ctx, hL, o.P.s); }
        else { const h = k5Hand(o.P, 1, o.P.aR), tip = k5Staff(ctx, h, o.staff * o.P.dir, 175, 50); k5Fist(ctx, h, o.P.s);
          if (o.carry) { const sw = 0.15 * Math.sin(t * 5), d = o.P.dir; k5Snake(ctx, [[tip[0] - 26 * d, tip[1] + 110, 0], [tip[0] - 20 * d, tip[1] + 50, 0.25], [tip[0] - 4 * d, tip[1] + 4, 0.45], [tip[0] + 10 * d, tip[1] + 6, 0.6], [tip[0] + 16 * d + sw * 20, tip[1] + 60, 0.8], [tip[0] + 14 * d + sw * 40, tip[1] + 116, 1]], { w: 18, eyes: 'x', tongue: 0.6 }); } } }
      if (o.stone) { const h = k5Hand(o.P, 1, o.P.aR || [2.6, 2.9]); shape(ctx, ell(h[0], h[1] - 10, 13, 10, 12), STONE, { lw: 4, seed: 88 }); }
      if (o.neck) { const s = o.P.s, h = [o.P.x + 26 * s * o.P.dir, o.P.y - 132 * s]; k5Neck(ctx, h[0], h[1] - 10, { s: 0.7, ang: 0.1, spark: t < 137.6 ? k5u(t, 137.1, 137.5) : 0 }); }
    }
    k5FightCloud(ctx, 830, 830, 160, t, k5u(t, 134.4, 135.75));
    const R = { x: K5_HOME.stub[0], y: K5_HOME.stub[1], dir: t >= 138.1 && t < 139.75 ? -1 : 1, seed: 3, s: 1.2, gaze: lookAt([700, 492], [830, 830]) };
    if (t >= 134.6 && t < 135.6) { R.sag = -0.95; R.headRot = 0.3; R.lid = blend(t, 135.0, 135.4, 0.9, 0); R.sq = 0.88; }
    if (t >= 135.6) { R.gaze = lookAt([700, 492], [740, 900]); R.sq = 0.95; }
    if (t >= 138.1) { R.gaze = lookAt([630, 492], [Math.max(-100, K5_GOW(t)), 700]); R.sq = 0.95 * (1 - 0.15 * pulse(t, 138.0, 0.2)); R.headRot = 0.1; }   // follows them out (the last walker)
    if (t >= 139.75) { R.gaze = lookAt([700, 492], K5_HOME.burrow); R.sq = 1 - 0.15 * pulse(t, 139.65, 0.2); R.headRot = 0.2; }
    k5Raven(ctx, R, t);
  },
  over(ctx, t, cam, S) { if (t >= 134.5 && t < 135.6) { const [x, y] = k5P(830, 650, cam); sfx(ctx, 'WHACK!', x, y - 30, 84, K5_B(t, 134.5, 0.2), { rot: -0.1 }); } } };

// ---------------- S14 140.0-150.4: watching from the top, two days, cobweb and flower ----------------
// v2: one smooth pass per day, no holds: day (0.7 s), dusk, night, dawn (about 0.33 s each), ending in plain daylight
const K5_U14 = (t) => kfn(t, [[145.3, 0.25], [146.0, 0.5], [146.33, 0.75], [146.66, 1.0], [147.0, 1.25], [147.7, 1.5], [148.03, 1.75], [148.36, 2.0], [148.7, 2.25]], 'lin');
const K5S14 = { a: 140.0, ww: 1000, cam: [[140, { x: 600, y: 250, zoom: 2.4 }], [142.6, { x: 600, y: 250, zoom: 2.4 }], [143.4, { x: 510, y: 615, zoom: 1.02 }], [148.7, { x: 510, y: 615, zoom: 1.02 }], [149.4, { x: 840, y: 850, zoom: 2.3 }], [149.89, { x: 840, y: 850, zoom: 2.3 }], [149.9, { x: 610, y: 250, zoom: 2.4 }], [150.4, { x: 610, y: 250, zoom: 2.4 }]],
  rv(t) { const [tx, ty] = K5_HOME.twig, P = { x: tx, y: ty, dir: 1, seed: 3, s: 1.2, gaze: lookAt([640, 140], K5_HOME.burrow), sq: breathe(t, 3) };
    if (t < 142.0) P.gaze = lookAt([640, 140], gazePlan(t, [[140, [860, 880]], [140.6, [820, 900]], [141.0, [880, 870]], [141.5, [850, 890]]], 0.07));
    if (t >= 143.7) { const [hx] = hop(t, 143.7, 0.3, tx, tx + 6, 6); P.x = hx; P.sq = (t < 144.9 ? 0.95 + 0.02 * Math.sin(t * 25) * pulse(t, 144.1, 0.5) : 0.97); }
    if (t >= 144.9 && t < 148.7) { const d = dayCycle(K5_U14(t)); P.noBlink = true; P.lid = Math.max(0.5 * d.night, pulse(t, 145.5, 0.45), pulse(t, 147.2, 0.45)); P.gaze = lookAt([640, 140], K5_HOME.burrow); }   // one slow blink per day
    if (t >= 147.55 && t < 148.7) P.gaze = gazePlan(t, [[147.55, [0.6, 1]], [147.85, [1, 0.5]], [148.15, [0.4, 1]]], 0.15);
    if (t >= 149.9) { const g = K5_B(t, 149.95, 0.3); P.sq = 1 - 0.07 * g; P.drop = 5 * g; P.lid = pulse(t, 149.95, 0.4); P.beak = 0.5 * K5_B(t, 150.1, 0.2); P.sag = 0.2 * g; P.gaze = [0.6, 0.6]; }
    return P; },
  draw(ctx, t) {
    const u = K5_U14(t), d = dayCycle(u);   // v2: the cycled sky for the whole scene (no sun jump at 144.9), no cloud behind the raven
    k5Home(ctx, t, { u });
    const web = Math.max(K5_B(t, 147.0, 0.35), 0), fl = K5_B(t, 147.6, 0.8);
    k5Burrow(ctx, ...K5_HOME.burrow, { web, dew: t > 148.6, flower: fl, nod: 0.12 * Math.sin(t * 3) * fl });
    if (t >= 149.4) { const u2 = k5u(t, 149.4, 149.75), x = K.lerp(1060, 905, K.ease.out(u2)), y = K.lerp(700, 830, u2); songbird(ctx, { x, y: y + (u2 >= 1 ? Math.abs(Math.sin(t * 7)) * -3 : 0), s: 0.6, dir: -1, fly: u2 < 1, flap: t * 30, col: C.yellow }); }
    if (d) k5Night(ctx, d.night);
    k5Raven(ctx, this.rv(t), t);
    if (t >= 142.0 && t < 149.0) k5Dash(ctx, [655, 175], [850, 860], K5_B(t, 142.2, 0.9), { w: 6, col: C.yellow });
  },
  over(ctx, t, cam, S) {
    const dc = t >= 147.55 ? 2 : t >= 146.29 ? 1 : 0;
    if (dc && t < 149.9) { S.label(ctx, 'DAY', 170, 150, K5_B(t, 146.29, 0.3), { align: 'center', size: 40 }); S.counter(ctx, dc, 170, 290, K5_B(t, dc === 1 ? 146.29 : 147.55, 0.3), { size: 90 }); }
    if (t >= 149.45 && t < 149.9) { const [x, y] = k5P(860, 830, cam); S.label(ctx, 'NO SNAKE!', x - 60, y - 190, K5_B(t, 149.45, 0.25), { align: 'center', size: 50, fill: C.yellow }); }
  } };

// ---------------- S15 151.15-163.3: new chicks, the jackal passes, THE END ----------------
const K5_HATCH2 = [153.6, 153.95, 154.3], K5_CRACK2 = [152.6, 152.95, 153.3];
const K5_JX2 = (t) => kfn(t, [[157.5, -220], [158.6, 200]], 'out');   // v2: trots in, halts on his mark
const K5S15 = { a: 151.15, ww: 1000, cam: [[151.15, { x: 510, y: 350, zoom: 2.2 }], [157.4, { x: 510, y: 350, zoom: 2.2 }], [159.2, { x: 470, y: K5_GLY(1.25, 0.85), zoom: 1.25 }], [163.3, { x: 470, y: K5_GLY(1.25, 0.85), zoom: 1.25 }]],
  rv(t) { const P = { x: 425, y: 346, dir: 1, seed: 3, s: 1.2, gaze: lookAt([463, 270], [K5_NEST[0], K5_NEST[1] - 40]), sq: breathe(t, 3) };
    if (t < 152.4) P.gaze = gazePlan(t, [[151.15, [0.7, 0.4]], [151.95, [0.5, 1]], [152.3, [0.7, 0.4]]], 0.12);
    if (t >= 152.5) { const g = K5_B(t, 152.5, 0.3); P.tip = 0.1 * g; P.eyes = 'wide'; P.sag = -0.3 * g; }
    if (t >= 153.6) { P.gaze = lookAt([463, 270], gazePlan(t, [[153.6, k5ChickW(0)], [153.95, k5ChickW(1)], [154.3, k5ChickW(2)]], 0.08)); }
    if (t >= 155.0) { P.tip = 0; P.eyes = 'open'; P.wet = true; P.sag = 0; P.sq = anticipate(t, 155.0, 0.15, 0.14); const [, hy] = hop(t, 155.15, 0.4, 0, 0, 28); P.y -= hy; if (t > 155.55) P.sq = landSquash(t, 155.55, 0.15); P.beak = 0.4; }
    if (t >= 155.9) { P.beak = 0; P.wet = false; }
    if (t >= 156.6) { const d = pulse(t, 156.6, 0.9); P.worm = t < 157.0; P.drop = 14 * d; P.headRot = 0.45 * d; P.gaze = [0.8, 0.8]; }
    if (t >= 158.6) P.gaze = lookAt([463, 270], [300, 780]);
    if (t >= 159.3 && t < 160.75) { const f = k5Flip(t, 159.4, 1, -1, 0.16), g = k5Flip(t, 160.6, -1, 1, 0.16), b = K5_B(t, 159.55, 0.1) * (1 - K5_B(t, 160.05, 0.15)); P.dir = t < 160.0 ? f.dir : g.dir; P.sag = -1.7 * b; P.tip = -0.06 * b; P.sq = (1 + 0.05 * b) * f.sq * g.sq; P.x = 440; P.gaze = [-0.8, 0.6]; }   // the wing salute to the jackal, held 12+ frames
    if (t >= 160.3) P.gaze = lookAt([463, 270], [K5_NEST[0], K5_NEST[1] - 40]);
    return P; },
  ck(t) { return [0, 1, 2].map((i) => { const h = K5_HATCH2[i]; if (t < h) return null; const k = { bob: Math.max(0, Math.sin((t - h) * 10)) * 3 * Math.exp(-(t - h) * 2) };
      k.gx = [0, 1, -1][i]; k.gy = [-1, 0, -0.3][i]; if (t > 155.8) { k.open = Math.max(0, Math.sin(t * 8 + i * 2.1)); k.gy = -1; k.gx = -0.5; } if (t > 156.6 && t < 157.5) { k.gx = -1; k.gy = -0.6; if (i) k.cw = -0.4 * pulse(t, 156.8, 0.7); }
      if (t > 157.0 && i === 0) k.open = 0.2; return k; }); },
  draw(ctx, t) {
    k5Home(ctx, t); k5Burrow(ctx, ...K5_HOME.burrow, { web: 1, dew: true, flower: 1, nod: 0.1 * Math.sin(t * 3) });
    const ch = K5_HATCH2.filter((h) => t >= h).length; nestDraw(ctx, ...K5_NEST, { t, eggs: 3, chicks: ch, ck: this.ck(t), feed: t > 157.0 && t < 157.8 });
    for (let i = 0; i < 3; i++) { const [ex, ey] = [K5_NEST[0] + K5_EGGX[i], K5_NEST[1] - 43]; if (t < K5_HATCH2[i]) k5Crack(ctx, ex, ey, k5u(t, K5_CRACK2[i], K5_CRACK2[i] + 0.3));
      else { const u = k5u(t, K5_HATCH2[i], K5_HATCH2[i] + 0.6); k5Shell(ctx, ex + (i - 1) * 30 * u + 14 * u, ey - 16 - 40 * Math.sin(Math.PI * u) + 34 * u, u * 5 * (i % 2 ? -1 : 1), 0.8); } }
    if (t > 155.8 && t < 160) for (let i = 0; i < 3; i++) { const [cx, cy] = k5ChickW(i); soundArcs(ctx, cx + 20, cy - 6, 1, t + i * 0.3, C.white); }
    if (t > 157.5) for (let i = 0; i < 4; i++) { const u = ((t - 157.5) * 0.35 + i / 4) % 1; ctx.save(); ctx.globalAlpha = Math.min(1, u * 4) * (1 - u); note(ctx, 500 + (i - 1.5) * 90 + Math.sin(u * 6 + i) * 20, 240 - u * 200, 1.1, C.white); ctx.restore(); }
    for (const [x0, y0, x1, y1, t0, dir] of [[-80, 120, 690, 128, 157.6, 1], [1080, 180, 800, 318, 157.8, -1]]) if (t >= t0) { const u = k5u(t, t0, t0 + 0.7); songbird(ctx, { x: K.lerp(x0, x1, K.ease.out(u)), y: K.lerp(y0, y1, u), s: 0.6, dir, fly: u < 1, flap: t * 30, col: dir > 0 ? C.red : C.yellow }); }
    if (t >= 157.5) { const P = { y: K5_GR, s: 0.75, dir: 1, seed: 7, ...walk(K5_JX2, t, { stride: 26 * 0.75, amp: 60 }), tailUp: 0.5 };
      if (t >= 158.6) { P.amp = 0; P.sit = settleTo(t, 158.65, 0, K5_SIT, 0.4, 0.12); P.plant = true; P.ears = 0; P.gaze = lookAt([300, 790], [460, 280]); P.headUp = blend(t, 158.9, 159.35, 0, -0.32); P.mouth = 'smile'; P.tailUp = 0.6 + 0.2 * Math.sin((t - 158.9) * 14) * (t < 159.6 ? 1 : 0); }
      if (t >= 160.4) P.headUp = -0.32 + 0.14 * pulse(t, 160.4, 0.45);   // his small nod
      if (t >= 161.0) { P.lid = blink(t, 7); P.tailUp = 0.6; }
      k5Jackal(ctx, P); }
    k5Raven(ctx, this.rv(t), t);
  },
  over(ctx, t, cam, S) {
    if (t >= 153.6 && t < 157.4) { const n = K5_HATCH2.filter((h) => t >= h).length; S.label(ctx, 'CHICKS', 170, 150, K5_B(t, 153.6, 0.3), { align: 'center', size: 40 }); S.counter(ctx, n, 170, 290, K5_B(t, K5_HATCH2[n - 1], 0.3), { size: 90 }); }
    if (t >= 156.7 && t < 158.6) { const [x, y] = k5P(K5_NEST[0], K5_NEST[1] - 100, cam); sfx(ctx, 'CHEEP! CHEEP!', Math.min(760, x + 200), y - 110, 52, K5_B(t, 156.7, 0.3), { rot: 0.08, fill: C.yellow }); }
  } };
