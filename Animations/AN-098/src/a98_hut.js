// ===== AN-098 cast bases and the hut (S1-S3, 0-31.6): the empty purse, the gossip, the forgery =====
const A98_FPAL = { robe: '#8a9a5a', dot: '#5f6e3a', shoes: 'bare', head: 'cap', hc: C.white, hd: '#d9d2bf', patches: C.blue };
const A98_FPAL_C = { ...A98_FPAL, cape: C.yellow, capeDot: C.red, trim: C.red };      // the gift cloak from 116.9 on
const a98F = (t, o = {}) => ({ costume: 'villager', s: 0.95, age: 0.2, seed: 11, y: 900, dir: 1, pal: t >= 116.9 ? A98_FPAL_C : A98_FPAL, ...o });
const a98Abd = (o = {}) => ({ ...A98_ABD, y: 900, dir: -1, ...o });
const a98Yah = (o = {}) => ({ ...A98_YAH, y: 900, dir: -1, ...o });
const A98_ENV = { costume: 'bedouin', s: 0.92, seed: 41, pal: { hc: '#f4ecd8', hd: '#c9bfa6', band: C.black } };
const A98_SERV = [{ costume: 'servant', s: 0.88, seed: 51 }, { costume: 'servant', s: 0.88, seed: 53, pal: { robe: C.blue, dot: '#0d2f80' } }];
// tongue tip at the mouth corner (concentration)
function a98Tongue(ctx, P) { const [hx, hy] = a98Head(P), s = P.s || 1, d = Math.sign(P.dir || 1); shape(ctx, ell(hx + d * 12 * s, hy + 24 * s, 6 * s, 5 * s, 10), C.red, { lw: 2.5, seed: 600 }); }
// purse held upside down
function a98Purse(ctx, x, y, sh = 0) { ctx.save(); ctx.translate(x + sh, y); shape(ctx, [[-10, 0], [10, 0], [18, 34], [10, 44], [-10, 44], [-18, 34]], '#b0692a', { lw: 4, seed: 601 }); seg(ctx, -12, 4, 12, 4, 4, C.black, 0); ctx.restore(); }

// ---------- hut layout ----------
const A98_HUT = { jar: [300, 250, 360], stool: 470, table: [540, 660, 800], ink: [640, 800], paper: [592, 800] };
function a98HutO(t) { return { t, door: 0, window: [690, 400, 140, 140], hook: false, shelf: [160, 290, 500], stool: A98_HUT.stool, mat: false, niche: [600, 560], lamp: 0 }; }

// the forger in the hut
function a98FHut(t) {
  const P = a98F(t, { x: 380, mouth: 'frown', brow: -0.4 }); const out = { P };
  const H0 = [P.x, 712];
  if (t < 0.94) { P.drop = 6; P.gaze = [0.35, 0.8]; P.handRW = [P.x + 46, 760 + tremble(t, 3, 7)]; out.purse = [P.x + 46 + tremble(t, 4, 7), 768]; }
  else if (t < 2.76) { P.drop = 4; P.lid = Math.max(0.3, a98Env(t, 1.3, 1.65, 0.1)); P.gaze = [0, 0.6];
    if (t < 1.6) { const k = a98E(t, 0.94, 0.2); P.handL = [K.lerp(-34, -60, k), K.lerp(-80, -100, k)]; P.handR = [K.lerp(34, 60, k), K.lerp(-80, -100, k)]; }
    else { const k = a98E(t, 1.6, 0.3); P.handL = [-60 + 26 * k, -100 + 22 * k]; P.handR = [60 - 26 * k, -100 + 22 * k]; } out.pockets = t < 2.7; }
  else if (t < 3.5) { P.brow = -0.5; const g = gazePlan(t, [[0, [300, 650]], [2.76, [300, 650]], [3.05, [225, 490]], [3.3, [125, 760]]], 0.07); P.gaze = lookAt(H0, g); P.tilt = (g[0] < P.x ? -0.03 : 0); }
  if (t >= 3.5 && t < 4.5) { P.dir = -1; P.x = 365; P.sq = 1 - 0.06 * pulse(t, 3.5, 0.14); P.gaze = lookAt([365, 712], [300, 660]); P.mouth = t >= 3.75 && t < 4.05 ? 'o' : 'frown';
    const k = a98Env(t, 3.6, 4.15, 0.12); if (k > 0) P.handRW = [K.lerp(330, 300, k), K.lerp(790, 690 - 6 * pulse(t, 3.7, 0.1), k)]; }
  if (t >= 4.5) { const xf = (tt) => kfn(tt, [[4.5, 365], [5.05, 492]]); Object.assign(P, walk(xf, t, { stride: 24 })); P.dir = 1; P.gaze = [1, 0.3]; P.mouth = 'frown';
    P.sit = a98E(t, 4.98, 0.45); P.sq = landSquash(t, 5.43, 0.06) * anticipate(t, 4.9, 0.12, 0.04); }
  if (t >= 5.86 && t < 7.0) { P.handR = PERSON_HANDS.chin.R; P.lid = Math.max(0.45, blink(t, 11)); P.gaze = [-0.5, 0.5]; P.sq = (P.sq || 1) * breathe(t, 2, 0.02); P.drop = 4; }
  if (t >= 7.0 && t < 7.6) { const k = a98E(t, 7.0, 0.15); P.drop = 4 * (1 - k); P.lid = 0; P.brow = -0.6; P.gaze = [-1, -0.1]; P.mouth = 'closed'; P.sq = settleTo(t, 7.0, 0.98, 1, 0.3, 0.1); if (t < 7.2) P.handR = PERSON_HANDS.chin.R; }
  // S2: listens, the idea
  if (t >= 7.6 && t < 18.44) { P.sit = 1; P.mouth = 'closed'; P.brow = -0.5; P.gaze = [-1, -0.2];
    const lean = a98Env(t, 7.88, 16.2, 0.35); P.tip = -0.08 * lean; if (lean > 0) P.handL = [-42, -200];
    if (t >= 8.76) P.gaze = lookAt(a98Head(P), [480, 380]);
    if (t >= 12.64 && t < 13.3) P.eyes = undefined, P.sq = 1 - 0.03 * pulse(t, 12.64, 0.3);
    if (t >= 16.2) { const g = gazePlan(t, [[0, [426, 359]], [16.2, [426, 359]], [16.45, [520, 380]], [16.7, [613, 367]], [16.95, [520, 380]]], 0.07); P.gaze = lookAt(a98Head(P), g); P.handR = PERSON_HANDS.chin.R; }
    if (t >= 17.46) { P.mouth = 'smile'; P.brow = -0.4; P.sq = settleTo(t, 17.46, 1, 1.05, 0.3, 0.1) - 0.05 * a98E(t, 17.9, 0.3); P.handR = undefined; }
    if (t >= 17.9 && t < 18.3) P.gaze = [0, 0.05]; }
  // S3: the forgery
  if (t >= 18.44) { P.sit = 1; P.brow = 0.4; P.mouth = 'closed'; P.x = 492; P.ph = 0; P.amp = 0;
    let hand; const pen = [600 - 40 * K.clamp((t - 19.7) / 1.8) + 4 * Math.sin(t * 22), 792];
    if (t < 19.0) hand = [K.lerp(560, 640, a98E(t, 18.5, 0.45)), K.lerp(800, 782, a98E(t, 18.5, 0.45))];
    else if (t < 19.5) hand = [640 - 40 * a98E(t, 19.15, 0.35), 782 - 8 * pulse(t, 19.0, 0.3)];
    else hand = pen;
    if (t < 29.0) { P.handRW = hand; out.quill = hand; out.tongue = t > 19.0; P.gaze = lookAt(a98Head(P), [hand[0], hand[1] + 6]); P.drop = 4;
      if (t >= 20.14 && t < 21.0) { P.gaze = gazePlan(t, [[0, [-1, -0.1]], [20.14, [-1, -0.1]], [20.5, [1, -0.4]], [20.85, P.gaze]], 0.07); P.drop = 6; P.tip = 0; } }
    if (t >= 29.0) { out.paperOn = t < 30.65; P.mouth = 'smile'; P.lid = 0.3; P.brow = -0.3; P.gaze = [0.2, 0.1];
      if (t < 30.0) { const tap = pulse(t, 29.15, 0.2) + pulse(t, 29.5, 0.2); P.handR = [4 + 10 * tap, -122]; P.sq = 1 - 0.03 * tap; P.gaze = [0.1, 0.05]; }
      else if (t < 31.0) { P.handRW = t < 30.3 ? [592, 795 - 6 * pulse(t, 30.08, 0.18)] : [600, 760]; out.seal = t >= 30.1; P.gaze = lookAt(a98Head(P), [595, 800]);
        if (t >= 30.3 && t < 30.62) { P.mouth = 'o'; P.sq = 1.02; } if (t >= 30.62) out.roll = a98E(t, 30.62, 0.28); out.rollAt = [600, 760]; }
      if (t >= 30.95 && t < 31.35) { P.wink = 'R'; P.gaze = [0, 0.05]; P.lid = 0; }
      if (t >= 31.0) { P.sit = 1 - a98E(t, 31.1, 0.3); P.sq = anticipate(t, 31.0, 0.12, 0.06) * settleTo(t, 31.1, 1, 1.04, 0.3, 0.1); out.sash = true; P.handR = t < 31.2 ? [30, -110] : [24, -150]; out.bindle = t >= 31.2; } } }
  return out;
}

function a98HutWorld(ctx, t, cam) {
  const o = a98HutO(t), F = a98FHut(t), P = F.P, out = { fh: a98Head(P) };
  hutRoom(ctx, { ...o, layer: 'back' });
  const jsw = swing(t, 3.72, 0.13, 1.3, 1.6); out.jarB = a98Jar(ctx, A98_HUT.jar[0], A98_HUT.jar[1], A98_HUT.jar[2], jsw);
  if (a98In(t, 3.8, 4.5)) { ctx.save(); ctx.globalAlpha *= a98Env(t, 3.8, 4.5, 0.15); soundArcs(ctx, 300, 650, -1, t - 3.8, C.white); ctx.restore(); }
  if (a98In(t, 7.0, 8.2)) { ctx.save(); ctx.globalAlpha *= a98Env(t, 7.0, 8.2, 0.15); soundArcs(ctx, 150, 700, 1, t - 7.0, C.white); ctx.restore(); }
  if (t < 31.2) a98Bindle(ctx, 430, 900, -1, 0.7);
  person(ctx, P);
  if (F.purse) a98Purse(ctx, F.purse[0], F.purse[1]);
  if (t >= 0.94 && t < 1.6) { const k = a98E(t, 0.94, 0.25); a98Purse(ctx, 440, fallY(t, 0.94, 1.25, 760, 856), 0); }
  else if (t >= 1.6 && t < 7.6) a98Purse(ctx, 440, 856);
  if (F.pockets) for (const sd of [-1, 1]) { const k = settleTo(t, 0.94, 0, 1, 0.3, 0.2); shape(ctx, [[P.x + sd * 30, 832], [P.x + sd * (30 + 16 * k), 838], [P.x + sd * (30 + 12 * k), 832 + 20 * k], [P.x + sd * 30, 846]], C.white, { lw: 3, seed: 602 + sd }); }
  if (a98In(t, 1.05, 1.9)) for (const sd of [-1, 1]) dustBurst(ctx, P.x + sd * 40, 860, t - 1.05, 4, 4, 9, 22, 0.8, 7 + sd);
  if (t >= 4.5 && t < 5.5) for (const f of footfalls((tt) => kfn(tt, [[4.5, 365], [5.05, 492]]), 4.5, 5.05, 24)) dustBurst(ctx, f.x, 902, t - f.t, 3, 4, 8, 16, 0.4, Math.round(f.t * 10));
  // the table, ink and the letter (S3 and the background of S1, S2)
  a98Table(ctx, A98_HUT.table[0], A98_HUT.table[1], A98_HUT.table[2]); a98Inkpot(ctx, A98_HUT.ink[0], A98_HUT.ink[1]);
  if (t >= 18.44 && (t < 30.62 || F.paperOn)) { shape(ctx, [[560, 798], [626, 798], [632, 792], [566, 792]], A98_PAPER, { lw: 3, seed: 603 }); if (F.seal) shape(ctx, ell(612, 795, 8 * a98E(t, 30.05, 0.15), 3.5, 12), C.red, { lw: 2.5, seed: 604 }); }
  if (F.roll != null && t < 31.0) a98Scroll(ctx, F.rollAt[0], F.rollAt[1], 0.75, { roll: 0.3 + 0.7 * F.roll, seal: C.red, rot: -0.2 });
  if (F.quill && t >= 18.44) a98Quill(ctx, F.quill[0] + 2, F.quill[1] + 2, 0.5, 0.8);
  if (F.tongue && t < 29.0) a98Tongue(ctx, P);
  if (F.sash) a98Scroll(ctx, P.x + 16, 900 - 92 * 0.95, 0.6, { roll: 1, seal: C.red, rot: -0.5 });
  if (F.bindle) { const hd = a98Head(P); a98Bindle(ctx, P.x + 26, hd[1] + 70, 1, 0); }
  hutRoom(ctx, { ...o, layer: 'front' });
  // S2 thought cloud: the governor and the vizier back to back, the rift between them
  if (a98In(t, 8.76, 18.44)) { const p = Math.min(K.clamp((t - 8.76) / 0.55), 1 - K.clamp((t - 18.0) / 0.4));
    thoughtCloud(ctx, 520, 400, 620, 380, t, { p, tail: [out.fh[0] - 6, out.fh[1] - 50], scale: 0.55, at: [500, 760], bg: '#e8f0ff', inside: (c, tt) => a98CloudFeud(c, tt, 9.0, 12.64, 13.22, 15.2) }); }
  return out;
}
// cloud contents (inside units): Abdullah left, Yahya right, back to back; rift between. tA appear, tR rift, tW webs, tY Yahya appears
function a98CloudFeud(c, t, tA, tR, tW, tY, o = {}) {
  const A = a98Abd({ x: 330, y: 900, s: 1.1, handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, brow: 0.5, mouth: 'closed', gaze: [0, 0.1] });
  A.sq = settleTo(t, tA, 0.6, 1, 0.35, 0.12);
  if (t >= tA + 2.58 && t < tA + 3.3) { A.handR = PERSON_HANDS.moustache.R; A.handL = undefined; A.lid = 0.3; A.handR = [20 + 4 * Math.sin(t * 12), -172]; }
  if (t >= tR) { A.gaze = [-1, 0]; A.brow = 1; A.mouth = 'frown'; A.tip = 0.06 * settleTo(t, tR, 0, 1, 0.25, 0.3); A.handR = PERSON_HANDS.folded.R; A.handL = PERSON_HANDS.folded.L; A.lid = undefined; }
  person(c, A);
  if (t >= tY) { const Y = a98Yah({ x: 670, y: 900, s: 1.08, dir: 1, gaze: [1, 0], brow: 0.3, lid: 0.2, mouth: 'closed', handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L }); Y.sq = settleTo(t, tY, 0.5, 1, 0.35, 0.12); person(c, Y); }
  if (t >= tR) a98Rift(c, 500, 690, 460, { open: a98E(t, tR, 0.3, 'out'), webs: a98E(t, tW, 0.7), close: o.close || 0 });
}
