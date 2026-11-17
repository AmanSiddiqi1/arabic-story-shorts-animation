// ===== KD-022 street scenes: S1 the physician's stall (0-21.55), S3 the man on the wall (45.05-54.9), S4 the palace door (54.9-70.0) =====
// clamp a world hand target to what the arm can reach (so props drawn at the target stay in the hand)
function k22reach(P, sd, w, f = 0.97) { const sh = k22L2W(P, [sd * 31, -132]), dx = w[0] - sh[0], dy = w[1] - sh[1], d = Math.hypot(dx, dy), m = 73.5 * f * (P.s || 1) * (P.sq ?? 1); return d <= m ? w : [sh[0] + dx / d * m, sh[1] + dy / d * m]; }
const k22mouth = (P) => { const h = k22head(P); return [h[0], h[1] + 24 * (P.s || 1)]; };
const k22eye = (P, to) => lookAt(k22head(P), to);

// ---------- S1 ----------
function k22s1Doc(t) {
  const age = k22e(t, 12.4, 1.5), P = { x: 380, y: K22GR, s: K22S, dir: 1, ...K22DOC, age, mouth: 'smile', lean: 0 };
  const bowlHome = [405, 768];
  let hL = [330, 772], hR = [440, 770], gazeTo = [600, 640], held = null, bowl = { p: bowlHome, lv: 0 };
  // 3.5-4.95 reads a jar label at a normal distance
  if (k22in(t, 3.5, 5.0)) { const k = k22kv(t, [[3.5, [330, 772]], [3.8, [312, 745]], [4.2, [300, 688]], [4.62, [300, 688]], [4.95, [312, 745]]]); hL = k; if (t > 3.8 && t < 4.95) held = { at: [k[0], k[1] + 26], col: 'ochre', key: 312 }; gazeTo = [300, 660]; }
  // 4.86-6.1 one exact pinch from the blue jar, two taps, two stirs
  if (k22in(t, 4.86, 6.15)) { hR = k22kv(t, [[4.86, [440, 770]], [5.1, [452, 728]], [5.3, [430, 742]], [5.55, [412, 750]], [5.7, [412, 758]], [6.15, [425, 760]]]);
    hR = [hR[0], hR[1] + 6 * k22tap(t, [5.32, 5.56], 0.16)]; if (t > 5.7) { const a = (t - 5.7) * 2 * Math.PI / 0.22; hR = [405 + Math.cos(a) * 10, 758 + Math.sin(a) * 3]; } gazeTo = [410, 768]; }
  // the bowl goes to patient A (6.15-6.5) and back (7.35-7.8); again for B (7.8-8.1 pinch, 8.1 out, 8.9-9.2 back)
  const kA = [[6.15, [425, 760]], [6.5, [505, 738]]], kB = [[7.35, [495, 738]], [7.8, [425, 760]]];
  if (k22in(t, 6.15, 6.55)) { hR = k22kv(t, kA); bowl = { p: [hR[0], hR[1] + 6], lv: 1 }; gazeTo = [600, 650]; }
  if (k22in(t, 7.35, 7.8)) { hR = k22kv(t, kB); bowl = { p: [hR[0], hR[1] + 6], lv: 0.1 }; }
  if (k22in(t, 7.8, 8.15)) { hR = k22kv(t, [[7.8, [425, 760]], [7.92, [452, 728]], [8.0, [412, 752]], [8.15, [470, 742]]]); bowl = { p: t > 8.0 ? [hR[0], hR[1] + 6] : bowlHome, lv: t > 7.98 ? 1 : 0.1 }; gazeTo = [640, 650]; }
  if (k22in(t, 8.9, 9.25)) { hR = k22kv(t, [[8.9, [500, 740]], [9.25, [425, 760]]]); bowl = { p: [hR[0], hR[1] + 6], lv: 0.1 }; }
  if (t >= 9.3 && t < 11.2) { P.lid = 0.45 * k22e(t, 9.35, 0.3); P.drop = 4 * pulse(t, 9.4, 0.7); gazeTo = [640, 660]; }
  // 11.2 the first hint: one slow blink, a rubbed eye
  if (k22in(t, 11.2, 12.4)) { P.lid = Math.max(pulse(t, 11.2, 0.7), 0.0); P.brow = -0.3; if (t > 11.55) hL = null, P.handL = [-12 + 4 * Math.sin(t * 22), -190 + 3 * Math.cos(t * 22)]; gazeTo = [520, 760]; }
  // 12.4-13.9 the years: he keeps working (slow stirring)
  if (k22in(t, 12.4, 13.88)) { const a = t * 2 * Math.PI / 0.9; hR = [405 + Math.cos(a) * 12, 758 + Math.sin(a) * 3]; gazeTo = [405, 768]; P.mouth = 'closed'; }
  // 13.88 squints; a jar to his nose
  if (t >= 13.88) { P.lid = Math.max(0.55, blink(t, 3) * 0.9); P.brow = -0.5; P.mouth = 'closed'; P.tip = 0.06 * k22e(t, 13.9, 0.5); }
  if (k22in(t, 13.88, 17.4)) { const k = k22kv(t, [[13.88, [330, 772]], [14.2, [312, 745]], [14.7, [386, 668]], [17.0, [386, 668]], [17.4, [330, 772]]]); hL = k; if (t > 14.2 && t < 17.3) held = { at: [k[0], k[1] + 24], col: 'ochre', key: 312 }; gazeTo = [386, 640]; P.tip = 0.1 * k22e(t, 14.3, 0.5); }
  // 17.42 the reach: blue jar intended, white jar found; freeze; pull back; hands flat on the table
  if (t >= 17.4) { hR = k22kv(t, [[17.42, [440, 770]], [17.9, [494, 736]], [18.6, [494, 736]], [18.95, [430, 762]], [19.25, [440, 774]]]);
    if (k22in(t, 17.9, 18.3)) hR = [hR[0] + 2 * Math.sin(t * 40), hR[1]];
    gazeTo = t < 18.6 ? [470, 780] : [400, 790]; P.tip = 0.05; if (t > 18.6 && t < 19.2) P.look = 0.8 * Math.sin((t - 18.6) * 2 * Math.PI / 0.3);
    if (t > 19.14) { hL = [332, 774]; P.lid = Math.max(0.6, K.clamp(1 - Math.abs(t - 19.5) / 0.35)); P.mouth = 'frown'; P.drop = 7 * k22e(t, 19.14, 0.4); P.lean = -0.02; } }
  if (hL) P.handLW = k22reach(P, -1, hL); if (hR) P.handRW = k22reach(P, 1, hR);
  P.gaze = k22eye(P, gazeTo); if (P.lid != null) P.lid = Math.max(P.lid, blink(t, 3));
  return { P, held, bowl };
}
function k22s1Patients(t) {
  // A: townsman with a bandage; B: townswoman. Both face the stall (dir -1).
  const xA = k22kv(t, [[0, 600], [7.4, 600], [7.8, 730], [11.3, 730], [12.9, 1160]]), xB = k22kv(t, [[0, 760], [7.4, 760], [7.9, 640], [11.4, 640], [12.9, 1180]]);
  const A = { x: xA, y: K22GR, s: 1.3, dir: -1, costume: 'villager', ph: 0, amp: 0 }, B = { x: xB, y: K22GR, s: 1.26, dir: -1, costume: 'villageWoman' };
  Object.assign(A, walk((tt) => k22kv(tt, [[0, 600], [7.4, 600], [7.8, 730], [11.3, 730], [12.9, 1160]]), t, { stride: 34 })); Object.assign(B, walk((tt) => k22kv(tt, [[0, 760], [7.4, 760], [7.9, 640], [11.4, 640], [12.9, 1180]]), t, { stride: 34 }));
  const curedA = t >= 6.98, curedB = t >= 8.58;
  A.tip = curedA ? 0 : 0.1; A.lid = curedA ? null : 0.5; A.mouth = curedA ? 'smile' : 'frown'; B.tip = curedB ? 0 : 0.06; B.mouth = curedB ? 'smile' : 'frown'; if (!curedB) B.lid = 0.4;
  if (curedA) { A.y -= hop(t, 6.98, 0.38, 0, 0, 30)[1]; A.sq = t < 7.36 ? 1.08 : landSquash(t, 7.36, 0.12); }
  if (curedB) { B.y -= hop(t, 8.58, 0.3, 0, 0, 18)[1]; }
  const bowlA = k22in(t, 6.5, 7.35), bowlB = k22in(t, 8.15, 8.9);
  let bowlAt = null;
  if (bowlA) { const m = k22mouth(A), k = k22kv(t, [[6.5, [505, 738]], [6.62, [m[0] - 6, m[1] + 8]], [6.95, [m[0] - 6, m[1] + 8]], [7.35, [495, 738]]]); A.handRW = k22reach(A, 1, k); bowlAt = { p: [A.handRW[0], A.handRW[1] + 6], lv: t < 6.95 ? 1 - k22e(t, 6.62, 0.33) : 0.1, rot: k22in(t, 6.62, 6.95) ? -0.5 : 0 }; }
  if (bowlB) { const m = k22mouth(B), k = k22kv(t, [[8.15, [470, 742]], [8.28, [m[0] - 6, m[1] + 8]], [8.55, [m[0] - 6, m[1] + 8]], [8.9, [500, 740]]]); B.handRW = k22reach(B, 1, k); bowlAt = { p: [B.handRW[0], B.handRW[1] + 6], lv: t < 8.55 ? 1 - k22e(t, 8.28, 0.27) : 0.1, rot: k22in(t, 8.28, 8.55) ? -0.5 : 0 }; }
  if (t >= 9.3 && t < 11.3) { for (const [Q, d] of [[A, 0], [B, 0.13]]) { Q.handR = PERSON_HANDS.chest.R; Q.drop = 6 * k22e(t, 9.3 + d, 0.3); Q.tip = 0.06 * pulse(t, 9.3 + d, 1.4); Q.lid = 0.3; Q.mouth = 'smile'; } }
  A.gaze = k22eye(A, [400, 640]); B.gaze = k22eye(B, [400, 640]);
  if (t > 11.3) { A.gaze = [1, 0]; B.gaze = [1, 0]; }
  if (A.lid != null) A.lid = Math.max(A.lid, blink(t, 7)); if (B.lid != null) B.lid = Math.max(B.lid, blink(t, 11));
  return { A, B, bowlAt, curedA, curedB };
}
function k22bandage(ctx, P) { ctx.save(); k22headXf(ctx, P); shape(ctx, [[-40, -26], [40, -30], [40, -14], [-40, -10]], C.white, { lw: 3.5, seed: 160 }); seg(ctx, -12, -26, 6, -12, 3, C.red, 0); ctx.restore(); }
function k22povJars(ctx, t, amt, kind) {   // the physician's point of view (kind 'shelf' S1, 'tray' S2, 'bowl' S7)
  ctx.save(); ctx.fillStyle = '#e9c98a'; ctx.fillRect(0, 0, K22W, K22H); ctx.fillStyle = dotPat(ctx, '#c9973f', 14, 0.22); ctx.fillRect(0, 0, K22W, K22H); ctx.restore();
  k22blur(ctx, (c) => {
    if (kind === 'shelf') { shape(c, K.rectPts(40, 690, 920, 40), WOOD, { lw: 6, seed: 170 }); shape(c, K.rectPts(40, 1040, 920, 40), WOOD, { lw: 6, seed: 171 });
      ['brown', 'yellow', 'blue', 'white', 'green'].forEach((col, i) => k22jar(c, 150 + i * 175, 690, { col, s: 2.0, seed: 500 + i })); ['ochre', 'blue', 'white', 'red'].forEach((col, i) => k22jar(c, 240 + i * 175, 1040, { col, s: 2.0, seed: 510 + i })); }
    else if (kind === 'tray') { shape(c, ell(500, 760, 400, 110, 40), K22BRASS, { lw: 7, seed: 172, dot: K22BRASSD, pitch: 10, rad: 0.2, da: 0.4 }); k22mortar(c, 500, 760, { s: 2.6, level: 0 }); K22RECIPE.forEach((r, i) => k22jar(c, 200 + i * 300, 1080, { ...r, s: 1.6, seed: 520 + i })); }
    else { k22bowl(c, 500, 640, { s: 6, level: 1 }); }
  }, amt * (0.85 + 0.15 * Math.sin(t * 2.4)), t);
}
function k22drawS1(ctx, t) {
  const u = 0.1 + 3 * k22e(t, 12.4, 1.5);
  marketStreet(ctx, { palace: K22PALACE, u: u % 1, t, doors: [0, 0] });
  if (t < 2.4) for (const [i, x] of [140, 880].entries()) person(ctx, { x: x + (t * 30) * (i ? -1 : 1), y: K22GR + 6, s: 0.7, costume: ['merchant', 'villager'][i], dir: i ? -1 : 1, ...walk((tt) => x + tt * 30 * (i ? -1 : 1), t, { stride: 20 }) });
  cloudFlat(ctx, 160 + t * 6, 250, 0.9);
  if (k22in(t, 12.3, 14.0)) { const f = (u - 0.1) % 1, a = Math.PI * f; sun(ctx, 120 + 760 * f, 430 - 200 * Math.sin(a), t); const g = (f + 0.5) % 1; shape(ctx, ell(120 + 760 * g, 430 - 200 * Math.sin(Math.PI * g), 34, 34, 20), C.white, { lw: 5, seed: 8 }); }
  const D = k22s1Doc(t), Pt = k22s1Patients(t);
  k22stall(ctx, t);
  k22person(ctx, D.P, { tear: 0 });
  k22stallFront(ctx, t, { hide: D.held ? [D.held.key] : [], fade: 0.5 * k22e(t, 12.4, 1.5) });
  if (D.held) k22jar(ctx, D.held.at[0], D.held.at[1], { col: D.held.col, s: 0.5, seed: 210 + D.held.key });
  const bw = Pt.bowlAt || D.bowl; k22bowl(ctx, bw.p[0], bw.p[1], { level: bw.lv, rot: bw.rot || 0, s: 0.8 });
  for (const [Q, cured, sd] of (t > 7.5 ? [[Pt.A, Pt.curedA, 7], [Pt.B, Pt.curedB, 11]] : [[Pt.B, Pt.curedB, 11], [Pt.A, Pt.curedA, 7]])) { if (Q.x > 1100) continue; k22person(ctx, Q, { pale: cured ? 0 : 1 }); if (Q === Pt.A && !cured) k22bandage(ctx, Q); }
  if (k22in(t, 9.4, 11.4)) for (let i = 0; i < 2; i++) { const u2 = k22e(t, 9.45 + i * 0.25, 1.5, 'out'); heart(ctx, 600 - 110 * u2 + i * 40, 610 - 150 * u2, 22, { alpha: 1 - K.clamp((t - 10.9 - i * 0.25) / 0.4) }); }
  if (k22in(t, 6.98, 7.5)) dustBurst(ctx, Pt.A.x, K22GR - 4, t - 7.36, 5, 5, 10, 24, 0.4, 7);
}

// ---------- S3 and S4: the man, the gossips, the palace door ----------
const K22OFF1 = { costume: 'vizier', s: 1.42 }, K22OFF2 = { costume: 'vizier', s: 1.27, pal: { robe: '#3f9d4a', dot: '#2b7a38', cape: '#2b7a38', hc: C.yellow, hd: C.red } };
function k22quackStreet(t) {
  const xf = (tt) => k22kv(tt, [[55.7, 300], [57.2, 560], [69.4, 560], [70.4, 830]], 'lin');
  const P = { y: K22GR, s: K22S, dir: 1, mouth: 'smile' }, o = { t };
  if (t < 54.9) {   // S3 on the wall
    P.x = 140 + 6 * k22e(t, 50.7, 0.4); P.tip = K.lerp(-0.08, 0, k22e(t, 50.7, 0.4)); P.lid = t < 47.9 ? 0.6 : t < 50.7 ? 0.45 : 0.35; P.mouth = t < 47.9 ? 'closed' : 'smile';
    P.handR = t < 46.6 ? [18 + 2 * Math.sin(t * 9), -170] : t < 47.9 ? [18, -168] : t < 50.7 ? PERSON_HANDS.cupEar.R : t < 51.7 ? [26 + 6 * Math.sin(t * 25), -120] : t < 53.1 ? [24 + 5 * Math.sin(t * 20), -122] : PERSON_HANDS.moustache.R;
    P.handL = t < 50.7 ? [-36, -82] : t < 53.1 ? [4 + 6 * Math.sin(t * 25 + 1), -118] : [-40, -84];
    if (t >= 47.9 && t < 50.7) { P.tip = -0.08 + 0.1 * k22e(t, 47.9, 0.4); P.brow = -0.5; P.tilt = 0.12 * k22e(t, 47.9, 0.4); }
    P.sq = t < 50.7 ? 1 : anticipate(t, 50.7, 0.25, 0.06) * (t > 50.95 ? K.lerp(1, 1.06, k22e(t, 50.95, 0.3)) : 1);
    if (t > 53.1) P.sq = 1.06 + 0.01 * Math.sin(t * 3);
    const gz = t < 46.6 ? [0.2, 0.3] : t < 49.5 ? k22lp([0.2, 0.3], [1, 0.05], k22e(t, 46.6, 0.5)) : t < 51.7 ? [0.7, -0.7] : [0.6 + 0.15 * Math.sin((t - 51.7) * 5.2), -0.75 + 0.1 * Math.cos((t - 51.7) * 5.2)];
    P.gaze = gz; P.lid = Math.max(P.lid, blink(t, 17) * (t < 49.5 ? 1 : 0));
    o.toothpick = t < 47.9;
  } else {   // S4 to the door
    Object.assign(P, walk(xf, t, { stride: 34 })); P.tip = -0.06; P.lid = 0.4; P.sq = 1.04; o.trot = 0.12 * Math.sin((P.ph || 0) * 2 - 0.6) * (P.amp || 0);
    P.y -= 4 * Math.abs(Math.sin(P.ph || 0)) * (P.amp || 0);
    if (t < 55.7) { P.handR = t < 55.35 ? [34, -245] : [30, -70 + 6 * Math.sin(t * 30)]; P.handL = t < 55.35 ? [-40, -84] : [-30, -70 + 6 * Math.sin(t * 30 + 1)]; P.tip = 0; o.trot = t < 55.35 ? 0.1 * Math.sin(t * 30) : 0; }
    else if (t < 57.2) { P.handR = [62, -96]; P.handL = [-62, -96]; }
    if (t >= 57.2 && t < 58.4) { const k = k22e(t, 57.28, 0.5); P.handR = k22lp([62, -96], [104, -112], k); P.tip = 0.24 * pulse(t, 57.4, 0.9); P.handL = [-40, -84]; P.gaze = [1, 0.1]; }
    if (t >= 58.4) { P.sq = K.lerp(1.04, 1.08, k22e(t, 58.4, 0.3)); P.tip = -0.06; P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; }
    if (k22in(t, 59.1, 60.8)) { const tp = k22tap(t, [59.2, 60.1], 0.25); P.handR = [10 + 10 * tp, -122 + 6 * tp]; P.drop = 4 * tp; P.brow = -0.4; }
    if (k22in(t, 62.2, 63.5)) { const a = (t - 62.2) * 2 * Math.PI * 1.6; P.handR = t < 62.9 ? [76 + Math.cos(a) * 22, -136 + Math.sin(a) * 12] : t < 63.2 ? [86, -150] : [96 - 20 * k22e(t, 63.2, 0.12), -170]; P.lid = 0.6; P.handL = [-50, -110]; }
    if (k22in(t, 63.5, 65.3)) { P.handL = [36, -112]; P.handR = [86, -118]; P.mouth = 'smile'; }
    if (k22in(t, 65.3, 67.0)) { P.handR = PERSON_HANDS.chest.R; P.lid = 0.7; P.brow = -0.6; P.drop = 8 * pulse(t, 65.8, 0.9); P.tip = 0.08 * pulse(t, 65.8, 0.9); }
    if (t >= 69.3) { P.handL = [-40, -84]; P.handR = [40, -84]; P.gaze = [1, -0.2]; P.lid = 0.45; }
    if (!P.gaze) P.gaze = t < 57.2 ? [1, 0] : k22eye(P, [820, 640]);
    if (k22in(t, 63.95, 64.06)) { P.gaze = k22eye(P, [820, 560]); P.brow = 0.7; P.mouth = 'closed'; }
    P.lid = Math.max(P.lid, blink(t, 17));
  }
  return { P, o };
}
function k22officials(t) {
  const x1 = k22kv(t, [[68.7, 770], [69.2, 680]]), x2 = k22kv(t, [[68.7, 905], [69.1, 955]]);
  const O1 = { ...K22OFF1, x: x1, y: K22GR, dir: -1 }, O2 = { ...K22OFF2, x: x2, y: K22GR, dir: -1 };
  Object.assign(O1, walk((tt) => k22kv(tt, [[68.7, 770], [69.2, 680]]), t, { stride: 34 })); Object.assign(O2, walk((tt) => k22kv(tt, [[68.7, 905], [69.1, 955]]), t, { stride: 34 }));
  const q = k22quackStreet(t).P, notice1 = 56.5, notice2 = 56.5 + 0.13;
  for (const [O, n] of [[O1, notice1], [O2, notice2]]) O.gaze = t < n ? [-0.3, 0.3] : k22eye(O, k22head(q));
  if (t >= 60.9 && t < 62.2) { O2.brow = -0.8; O2.gaze = k22eye(O2, k22head(O1)); O1.handR = PERSON_HANDS.chin.R; O1.brow = 0.2; }
  if (t >= 62.2 && t < 67.0) { O1.handR = PERSON_HANDS.chin.R; O2.brow = -0.6; O2.mouth = 'o'; }
  if (t >= 67.0 && t < 68.7) { O1.gaze = k22eye(O1, k22head(O2)); O2.gaze = k22eye(O2, k22head(O1)); O1.drop = 5 * pulse(t, 67.4, 0.4); O2.drop = 5 * (pulse(t, 67.55, 0.25) + pulse(t, 67.8, 0.25) + pulse(t, 68.05, 0.25)); O1.mouth = O2.mouth = 'smile'; }
  if (t >= 68.7) { O1.tip = 0.14 * k22e(t, 69.2, 0.3); O2.tip = 0.12 * k22e(t, 69.4, 0.3); O2.handR = t < 69.6 ? [90, -110] : [40, -84]; O1.mouth = O2.mouth = 'smile'; O1.lid = O2.lid = 0.4; }
  return { O1, O2, door: k22e(t, 69.0, 0.6) };
}
function k22drawS34(ctx, t) {
  const S4 = t >= 54.9, OF = S4 ? k22officials(t) : null;
  marketStreet(ctx, { palace: K22PALACE, preset: 'day', t, palaceDoor: OF ? OF.door * 0.9 : 0, doors: [0, 0] });
  cloudFlat(ctx, 300 + t * 5, 230, 0.8);
  k22stall(ctx, t, { closed: true }); k22stallFront(ctx, t, { closed: true });
  // gossips: S3 heads together at the stall; S4 small in the background
  const gA = { costume: 'villager', y: K22GR, s: 1.25, x: 335, dir: 1, talk: 0, mouth: 'smile' }, gB = { costume: 'villageWoman', y: K22GR, s: 1.2, x: 515, dir: -1, mouth: 'smile' };
  if (!S4) { gA.talk = 0.4 + 0.4 * Math.sin(t * 13) * (Math.sin(t * 1.7) > 0); gB.talk = Math.sin(t * 1.7) <= 0 ? 0.4 + 0.4 * Math.sin(t * 12) : 0; gA.tip = 0.05; gB.tip = 0.05;
    gA.handR = [70 + 14 * Math.sin(t * 6), -140]; gB.handR = [60, -130 + 10 * Math.sin(t * 5)]; gA.gaze = k22eye(gA, k22head(gB)); gB.gaze = k22eye(gB, k22head(gA));
    if (Math.floor(t * 0.7) % 2) { gA.gaze = [1, -0.3]; } }
  else { gA.x = 90; gB.x = 170; gA.s = gB.s = 0.95; gA.y = gB.y = K22GR - 4; gA.dir = gB.dir = 1; gA.gaze = gB.gaze = [1, 0]; gA.handR = PERSON_HANDS.pointFwd.R; }
  person(ctx, gA); person(ctx, gB);
  if (!S4 && k22in(t, 45.3, 48.5)) { const p = k22e(t, 45.4, 0.35, 'out') * (1 - k22e(t, 48.2, 0.3)); if (p > 0) { bubble(ctx, 430, 470, 230, 120, 430, 560, p, ''); ctx.save(); ctx.globalAlpha = p; k22crown(ctx, 370, 490, 0.45); shape(ctx, K.rectPts(415, 465, 46, 22), C.white, { lw: 3, seed: 5 }); k22bowl(ctx, 500, 470, { s: 0.6 }); ctx.restore(); } }
  const Q = k22quackStreet(t);
  if (S4) { person(ctx, OF.O1); person(ctx, OF.O2); }
  k22quack(ctx, Q.P, Q.o);
  if (Q.o.toothpick) { const h = k22L2W(Q.P, [20, -168]); seg(ctx, h[0] - 4, h[1] + 2, h[0] + 24, h[1] - 6, 3, CREAM, 1.5); }
  // the thought cloud: coins, then a crown with a tiny him bowing
  const cp = !S4 ? k22e(t, 49.52, 0.6) : 1 - k22e(t, 55.0, 0.25);
  if (cp > 0 && t < 55.3) thoughtCloud(ctx, 360, 390, 320, 250, t, { p: cp, tail: k22L2W(Q.P, [40, -250]), bg: C.yellow, scale: 0.55, at: [540, 800], inside: (c) => {
    // v2: the story he heard first (bed and bowl from the gossip balloon), pushed aside by a sparkle on fursa, then big coins, then the crown and him bowing
    const pa = k22e(t, 50.76, 0.5, 'in'), ia = 1 - K.clamp((t - 51.0) / 0.35);
    if (t < 51.4 && ia > 0) { const k = K.ease.back(K.clamp((t - 49.9) / 0.35)); c.save(); c.globalAlpha *= ia;
      c.save(); c.translate(400 - 260 * pa, 830); c.scale(k, k); shape(c, K.rectPts(-110, -20, 220, 50), '#a8160f', { lw: 7, seed: 600 }); shape(c, K.rectPts(-118, -34, 236, 20), C.white, { lw: 6, seed: 601 }); shape(c, ell(80, -46, 40, 18, 16), C.white, { lw: 6, seed: 602 }); shape(c, ell(70, -66, 24, 24, 16), C.skin, { lw: 6, seed: 603 }); c.restore();
      c.save(); c.translate(690 + 260 * pa, 800); c.scale(k, k); k22bowl(c, 0, 0, { s: 2.6 }); c.restore(); c.restore(); }
    if (k22in(t, 50.7, 51.7)) k22glint(c, 540, 800, 120 * K.ease.back(K.clamp((t - 50.76) / 0.3)) * (1 - K.clamp((t - 51.4) / 0.3)));
    const n = Math.floor(K.clamp((t - 52.48) / 1.0) * 12); k22coins(c, 560, 1010, n, 3.0); if (n > 3) k22glint(c, 600 + 60 * Math.sin(t * 3), 840, 40);
    if (t > 54.15) { const k = K.ease.back(K.clamp((t - 54.15) / 0.35)); shape(c, ell(400, 660, 120 * k, 95 * k, 24), C.white, { lw: 7, seed: 604 }); k22crown(c, 400, 710 - 30 * (1 - k), 1.6 * k);
      if (t > 54.35) { const mini = { x: 730, y: 985, s: 1.4, dir: -1, tip: 0.3 * pulse(t, 54.5, 0.6) + 0.05, mouth: 'smile', gaze: [-1, 0.3], noBlink: true }; k22quack(c, mini, {}); } } } });
}
