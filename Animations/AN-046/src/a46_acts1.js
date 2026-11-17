// ===== AN-046 acts 1: S1 garden, S2-S5 summit (the king is chosen, the minister serves, the minister is late) =====
const a46bHead = (B) => { const s = B.s || 1; return [B.x + (B.dir ?? 1) * 38 * s, B.y + (-70 + (B.drop || 0)) * s]; };   // Library lark-rig birds
const a46cam = (x, y, zoom) => ({ x, y, zoom });
const a46crestLag = (t, keys) => { let v = 0; for (const k of keys) v += swing(t, k, -0.18, 1.6, 3); return v; };   // crest stalks sway a beat late after head moves

// ---------------------------------------------------------------- S1 garden 0-11.0
const A46_S1 = { fan: 9.6, wow: 9.95 };
const a46U1 = (t) => kfn(t, [[0, 0.06], [5.24, 0.14], [7.44, 0.45], [11, 0.46]]);
function a46s1Pea(t) {
  const P = { x: 600, y: A46_GR, s: 1, dir: -1, t, seed: 61, fan: 0, crest: a46crestLag(t, [2.62, 9.6]), mouth: 'smile' };
  P.preen = t < 2.62 ? 0.85 + 0.08 * Math.sin(t * 5) : K.clamp(1 - (t - 2.62) / 0.35); P.headRot = t < 2.62 ? 0.1 * Math.sin(t * 7) : 0;
  P.lid = t < 2.62 ? 0.6 : a46lid(t, 61); P.neck = settleTo(t, 2.62, 0.9, 1, 0.45, 0.12);
  const pH = [532, 590], sH = a46sHead(a46s1Sp(t, true));
  P.gaze = t < 2.62 ? [0.2, 1] : lookAt(pH, sH);
  if (a46in(t, 2.62, 3.3)) P.bow = 0.25 * pulse(t, 2.7, 0.55);   // nod
  P.talk = talk(t, [[3.0, 3.6], [4.2, 4.8], [5.3, 5.8]]) * 0.6;
  if (a46in(t, 5.94, 6.75)) { P.headRot = 0.5 * a46e(t, 6.0, 0.2); P.gaze = [1, 0.6]; P.talk = 0; }   // turns to the friend on his back, shares a berry
  if (a46in(t, 7.02, 7.9)) P.gaze = gazePlan(t, [[7.02, [-0.9, -0.5]], [7.5, lookAt(pH, sH)]], 0.2);   // the low sun, then the friend
  // the display: anticipation dip, snap open with overshoot, shimmer, chest out
  P.sq = anticipate(t, 9.3, 0.3, 0.08) * (t > 9.6 ? 1 + 0.03 * a46e(t, 9.6, 0.2) : 1);
  P.fan = t < A46_S1.fan ? 0 : settleTo(t, A46_S1.fan, 0, 1, 0.35, 0.1); P.fanShake = a46fade(t, 9.95, 10.7, 0.15);
  if (t >= 9.6) { P.lid = Math.max(0.4, blink(t, 61)); P.neck = 1.06; P.headRot = -0.08; P.talk = 0; if (a46in(t, 10.7, 11)) P.lid = Math.max(0.4, a46tap(t, [10.75], 0.3)); }
  return P;
}
// sparrow keys: in the time lapse he hops to the ground, onto the peacock's back, and back to the branch
function a46s1Sp(t, posOnly) {
  const PER = A46_PERCH, BACK = [606, 704], GROUND = [440, 900];
  let P = a46sp({ x: PER[0], y: PER[1], dir: 1, seed: 7 });
  if (t < 1.0) { const F = a46fly(t, [[0.3, -60, 300], [1.0, PER[0], PER[1]]], { hz: 11, arc: 40 }); Object.assign(P, F); if (t < 0.3) P.x = -100; }
  else if (t < 5.94) { /* on the branch */ }
  else if (t < 6.75) { const h1 = hop(t, 5.94, 0.22, PER[0], GROUND[0], 40), h2 = hop(t, 6.22, 0.24, GROUND[0], BACK[0], 60);
    if (t < 6.16) { P.x = h1[0]; P.y = K.lerp(PER[1], GROUND[1], a46e(t, 5.94, 0.22)) - h1[1]; }
    else if (t < 6.22) { P.x = GROUND[0]; P.y = GROUND[1]; }
    else { P.x = h2[0]; P.y = K.lerp(GROUND[1], BACK[1], a46e(t, 6.22, 0.24)) - h2[1]; } }
  else if (t < 7.02) { const F = a46fly(t, [[6.75, BACK[0], BACK[1]], [7.02, PER[0], PER[1]]], { hz: 12, arc: -60 }); Object.assign(P, F); }
  if (posOnly) return P;
  P.gaze = lookAt(a46sHead(P), [532, 590]); P.beak = t > 0.3 && t < 1.0 ? 0.4 : 0;
  if (t >= 1.0) P.sq = landSquash(t, 1.0, 0.18) * (t > 1.06 ? 1 + 0.06 * Math.exp(-(t - 1.06) * 8) : 1);
  P.tailDrop = -0.4 * pulse(t, 1.05, 0.25);
  if (a46in(t, 1.74, 2.6)) { P.drop = 8 * (a46tap(t, [1.8, 2.15], 0.3)); P.beak = 1.4 * a46tap(t, [1.85, 2.2], 0.2); }
  P.beak = Math.max(P.beak || 0, talk(t, [[3.7, 4.6], [5.24, 5.9]]) * 0.9);
  if (a46in(t, 5.94, 6.16) || a46in(t, 6.22, 6.46)) P.sq = 1.1;
  if (a46in(t, 6.46, 6.75)) { P.dir = 1; P.gaze = [1, -0.2]; P.lid = 0.3; P.beak = 0.3; }   // delighted on the back
  if (a46in(t, 7.02, 8.1)) { P.beak = 1.2 * pulse(t, 7.1, 0.6); P.lid = Math.max(0.5, pulse(t, 7.2, 0.7)); }   // yawn and a long blink
  if (t >= 8.14 && t < 9.6) { const H = a46sHead(P); P.gaze = lookAt(H, gazePlan(t, [[8.14, [560, 560]], [8.5, [600, 750]], [8.85, [800, 820]], [9.2, [540, 600]]], 0.07)); P.headRot = 0.12 * Math.sin((t - 8.14) * 4.4); P.tip = 0.1 * a46e(t, 8.9, 0.3); }
  if (t >= 9.9) { P.tip = -0.14 * a46e(t, 9.9, 0.12, 'out'); P.x -= 8 * a46e(t, 9.9, 0.15); P.eyes = 'wide'; P.beak = 1.1; P.lid = 0; P.gaze = [1, 0]; }
  if (t >= 10.62) { const c = a46tap(t, [10.62, 10.86], 0.22); P.sag = -0.7 * c; P.y -= 6 * c; P.beak = 0.8; }
  return P;
}
function a46s1(ctx, t) {
  a46garden(ctx, t, a46U1(t));
  const pea = a46s1Pea(t); halftoneShadow(ctx, pea.x - 40, A46_GR + 4, 90, 0.3);
  const sp = a46s1Sp(t), onBack = a46in(t, 6.36, 6.75);
  if (!onBack) a46pea(ctx, pea);
  if (sp.x > -60) bird(ctx, sp);
  if (onBack) { a46pea(ctx, pea); bird(ctx, sp); fig(ctx, 588, 640, 11); }   // noon pose: tiny on his back, sharing a berry
  if (t >= 9.95 && t < 11) heart(ctx, A46_PERCH[0] - 30 + 6 * Math.sin(t * 6), 500 - 30 * a46e(t, 9.95, 1), 22 * K.ease.back(K.clamp((t - 9.95) / 0.3)), { alpha: 1 - K.clamp((t - 10.7) / 0.3) });
}
function a46o1(ctx, t, cam, S, tp) {
  const d = dayCycle(a46U1(t));
  if (a46in(t, 3.9, 5.3) && d.sun) { const [x, y] = tp(d.sun[0] + 150, d.sun[1] + 40); S.label(ctx, 'MORNING', x, y, a46e(t, 3.9, 0.4) * (1 - K.clamp((t - 5.1) / 0.2)), { size: 40 }); }
  if (a46in(t, 7.02, 8.3)) S.label(ctx, 'EVENING', 640, 150, a46e(t, 7.02, 0.4) * (1 - K.clamp((t - 8.1) / 0.2)), { size: 40, fill: C.yellow });
  if (a46in(t, A46_S1.wow, 11)) { const [x, y] = tp(780, 420); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 10.75) / 0.25); S.emphasis(ctx, x, y, 110, a46e(t, A46_S1.wow, 0.5), { word: 'WOW!', wx: 0.6, wy: 0.9 }); ctx.restore(); }
}

// ---------------------------------------------------------------- the flock (S2-S4): six Library birds, never in unison
// [kind, x, y, s, from [x, y], arrive t, seed]: ledge (y 810) and floor (y 900)
const A46_FLOCK = [
  { k: 'y', x: 85, y: 810, s: 0.75, from: [-120, 500], t: 12.0, seed: 11 },
  { k: 'lark', x: 168, y: 810, s: 0.8, from: [200, -80], t: 12.22, seed: 12 },
  { k: 'b', x: 252, y: 810, s: 0.75, from: [-150, 300], t: 12.44, seed: 13 },
  { k: 'crow', x: 150, y: 900, s: 0.9, from: [-160, 640], t: 12.66, seed: 14 },
  { k: 'r', x: 262, y: 900, s: 0.8, from: [600, -100], t: 12.88, seed: 15 },
  { k: 'song', x: 380, y: 900, s: 1.0, from: [1150, 350], t: 13.1, seed: 16 },
];
const A46_SQ = { a: 17.48, b: 18.62, row: 19.58 };
function a46flockP(i, t, look) {
  const F = A46_FLOCK[i], P = { kind: F.k === 'song' ? undefined : F.k, x: F.x, y: F.y, s: F.s, dir: 1, seed: F.seed };
  if (t < F.t + 0.6) { const F2 = a46fly(t, [[F.t - 0.6, F.from[0], F.from[1]], [F.t, F.x + (F.k === 'song' ? 24 : 0), F.y]], { hz: 8 + i, arc: -30 }); Object.assign(P, F2); if (t >= F.t) { P.fly = false; P.x = F.x + (F.k === 'song' ? 24 * (1 - a46e(t, F.t + 0.2, 0.3)) : 0); P.y = F.y - (F.k === 'song' ? hop(t, F.t + 0.2, 0.3, 0, 0, 14)[1] : 0); } }
  if (t >= F.t) P.sq = landSquash(t, F.t, F.k === 'crow' ? 0.3 : 0.16);
  if (t < F.t - 0.6) return null;
  // squabble: crow (3) and red (4) beak to beak over a berry; the yellow ducks
  if (t >= A46_SQ.a && t < A46_SQ.row + 0.3 && (i === 3 || i === 4)) {
    const toward = a46e(t, A46_SQ.a, 0.2) * (1 - a46e(t, A46_SQ.b, 0.3)); P.x += (i === 3 ? 30 : -30) * toward; if (i === 4) P.dir = t < A46_SQ.b + 0.4 ? -1 : 1;
    if (t < A46_SQ.b) { const jab = Math.max(0, Math.sin((t - A46_SQ.a) * Math.PI / 0.3 + (i === 3 ? 0 : Math.PI))); P.tip = 0.12 * toward * (0.5 + jab); P.beak = 1.5 * jab; P.brow = 1; P.sag = -0.5 * jab; }
    else { P.drop = 6 * a46e(t, A46_SQ.b, 0.3); P.gaze = i === 3 ? [-1, 0.6] : [1, 0.6]; }
  }
  if (i === 0 && a46in(t, A46_SQ.a, A46_SQ.b)) P.sq = 0.8;
  // the tidy row: small side hops into place (the songbird is late and squeezes in)
  if (t >= A46_SQ.row) { const d = stagger(i, 0.12); P.y -= hop(t, A46_SQ.row + d, 0.22, 0, 0, 10)[1]; if (i === 5) { P.x = K.lerp(380, 318, a46e(t, 20.2, 0.3)); P.y = 900 - hop(t, 20.2, 0.3, 0, 0, 18)[1]; } }
  if (look) { const H = a46bHead(P); P.gaze = lookAt(H, look(i, t)); }
  return P;
}
function a46flock(ctx, t, look, mod) {
  for (let i = 0; i < 6; i++) { let P = a46flockP(i, t, look); if (!P) continue; if (mod) P = mod(i, P, t) || P;
    if (A46_FLOCK[i].k === 'song') songbird(ctx, { ...P, col: C.yellow, flap: P.fly ? P.flap : 0 }); else bird(ctx, P); }
}

// ---------------------------------------------------------------- S2 summit 11.0-22.0: the assembly
const A46_U_SUM = 0.3;
const a46s2PeaX = (t) => kfn(t, [[15.02, 1090], [16.0, 955]], 'out');
function a46s2Pea(t) {
  const P = { y: A46_GR, s: 1, dir: -1, t, seed: 61, ...walk(a46s2PeaX, t, { stride: A46_PST }), fan: 0, crest: a46crestLag(t, [16.0, 16.2]) };
  P.gaze = t < 16.16 ? [-1, 0.2] : t < 17.5 ? lookAt(a46peaHead(P), [810, 690]) : t < 19.6 ? lookAt(a46peaHead(P), [200, 860]) : [-1, 0.25];
  if (t > 20.9) P.gaze = lookAt(a46peaHead(P), a46sHead({ x: 520, y: 900 }));
  P.neck = 0.96; P.lid = a46lid(t, 61, 0.15); return P;
}
function a46s2Sp(t) {
  const P = a46sp({ x: 520, y: 900, seed: 7 });
  if (t < 13.48) { if (t < 12.9) return null; Object.assign(P, a46fly(t, [[12.9, 820, 300], [13.48, 520, 900]], { hz: 11 })); if (t >= 13.48) P.fly = false; }
  P.sq = landSquash(t, 13.48, 0.16); P.tailDrop = -0.3;
  const H = a46sHead(P);
  P.gaze = lookAt(H, gazePlan(t, [[13.5, [100, 760]], [13.9, [200, 840]], [14.3, [380, 860]], [15.2, [930, 600]], [16.2, [810, 690]], [17.6, [200, 860]]], 0.12));
  if (a46in(t, 18.0, 18.62)) { P.lid = 0.4 * pulse(t, 18.0, 0.3); P.gaze = lookAt(H, a46sac(t, [[18.0, [200, 860]], [18.25, [810, 690]], [18.45, [880, 600]]])); }
  if (t >= 18.62 && t < 20.9) P.gaze = lookAt(H, [250, 860]);
  if (t >= 20.9) { P.gaze = lookAt(H, [880, 600]); P.sq = 1 + 0.08 * a46e(t, 21.0, 0.25); P.beak = 0.6 * a46e(t, 21.3, 0.2); P.eyes = 'wide'; }
  return P;
}
function a46s2(ctx, t) {
  a46summit(ctx, t, A46_U_SUM);
  for (let i = 0; i < 2; i++) { const u = K.clamp((t - 11.0 - i * 0.3) / 1.4); if (u > 0 && u < 1) songbird(ctx, { x: K.lerp(-50, 1050, u), y: 1060 - 60 * u - i * 40, s: 0.35, fly: true, flap: Math.sin(t * 20 + i), col: C.black }); }
  const look = (i, t2) => (t2 < 16.16 + stagger(i, 0.07) ? [520 + 40 * Math.sin(i), 820] : t2 < A46_SQ.a ? [810, 690] : t2 < A46_SQ.row ? [205, 860] : t2 < 20.9 ? [810, 700] : [520, 840]);
  const pea = a46s2Pea(t); if (t >= 15.02) a46pea(ctx, pea);
  if (a46in(t, A46_SQ.a - 0.4, A46_SQ.b + 1.2)) { const rx = t < A46_SQ.b ? 205 : K.lerp(205, 330, a46e(t, A46_SQ.b, 0.8, 'out')); fig(ctx, rx, 890, 10, (rx - 205) / 10); }
  a46flock(ctx, t, look);
  const sp = a46s2Sp(t); if (sp) bird(ctx, sp);
  if (t >= 16.16) { const k = K.ease.back(K.clamp((t - 16.16) / 0.25)); a46crown(ctx, 810, 690 + 6 * Math.sin(t * 4), 1.0 * k, { ghost: true }); }
  if (t >= 21.3) bulb(ctx, 548, 790, a46e(t, 21.3, 0.25));
}
function a46o2(ctx, t, cam, S, tp) {
  if (a46in(t, 14.54, 16.3)) { const p = a46e(t, 14.54, 0.4) * (1 - K.clamp((t - 16.0) / 0.3)); S.label(ctx, 'MOUNTAIN TOP', 60, 150, p, { size: 44 }); if (p > 0.3) S.arrow(ctx, [300, 175], tp(470, 870), K.clamp((t - 14.8) / 0.4), { width: 16 }); }
  if (a46in(t, 17.7, 18.7)) { const [x, y] = tp(205, 740); a46word(ctx, 'SQUAWK!', x, y - 40, 60, a46e(t, 17.7, 0.25) * (1 - K.clamp((t - 18.5) / 0.2)), { rot: -0.08, fill: C.white }); }
}

// ---------------------------------------------------------------- S3 summit 22.0-34.0: "the peacock!" crown, bow, badge
const A46_S3 = { hop: 22.12, point: 24.3, me: 24.9, cheer: 26.58, crown: 27.3, step: 27.7, bow: 28.12, badge: 31.82, perch: 32.76 };
const A46_THRONE_P = [845, 790], A46_PLACE = [752, 791];
const a46s3PeaX = (t) => kfn(t, [[27.7, 955], [28.0, 890]]);
function a46s3Pea(t) {
  const P = { y: A46_GR, s: 1, dir: -1, t, seed: 61, fan: 0, ...walk(a46s3PeaX, t, { stride: A46_PST }) };
  if (t >= 28.0) { const h = hop(t, 28.0, 0.3, 890, A46_THRONE_P[0], 34); P.x = h[0]; P.y = K.lerp(900, A46_THRONE_P[1], a46e(t, 28.0, 0.3)) - h[1]; P.amp = 0; P.sq = landSquash(t, 28.3, 0.08); }
  const H = a46peaHead(P), spH = a46sHead(a46s3Sp(t, true));
  P.gaze = lookAt(H, spH); P.lid = a46lid(t, 61);
  P.crest = a46crestLag(t, [24.9, 27.45, 28.12, 29.0]);
  if (a46in(t, A46_S3.me, 26.5)) { const back = pulse(t, A46_S3.me, 0.6); P.neck = 1 - 0.08 * a46e(t, A46_S3.me, 0.15); P.headRot = -0.25 * back; P.gaze = back > 0.3 ? [1, -0.1] : lookAt(H, spH); P.eyes = 'wide';
    const me = a46e(t, 25.5, 0.25) * (1 - a46e(t, 26.3, 0.2)); P.wing = 0.6 * me; P.wingA = 2.2; P.brow = -0.6 * me; }
  if (t >= A46_S3.crown) { P.crown = 1; P.crownY = t < A46_S3.crown + 0.12 ? -60 * (1 - (K.clamp((t - A46_S3.crown) / 0.12)) ** 2) : 0; P.neck = (P.neck ?? 1) * impactSquash(t, A46_S3.crown + 0.12, 0.92); P.crest = (P.crest || 0) + swing(t, A46_S3.crown + 0.12, 0.2, 2, 3); }
  if (a46in(t, A46_S3.step, A46_S3.bow)) { P.fan = 0.5 * a46e(t, A46_S3.step, 0.25); P.fanShake = 0.6; }
  if (t >= A46_S3.bow) { P.fan = 0.5 * (1 - a46e(t, A46_S3.bow, 0.4)); P.bow = 0.8 * a46e(t, A46_S3.bow, 0.35) * (1 - a46e(t, 29.0, 0.4)); if (a46in(t, 28.4, 29.0)) P.lid = 1; }
  if (t >= 30.64) { const r = a46e(t, 30.64, 0.4) * (1 - a46e(t, 32.1, 0.4)); P.wing = 0.85 * r; P.wingA = 0.25; P.bow = Math.max(P.bow || 0, 0.35 * a46e(t, 31.2, 0.4) * (1 - a46e(t, 32.1, 0.4))); }
  if (t >= 33.36) { P.gaze = [-1, 0.3]; P.lid = Math.max(0.3, blink(t, 61)); P.fan = 0.3 * a46e(t, 33.36, 0.5); }
  P.talk = talk(t, [[29.1, 30.4], [30.64, 31.6]]) * 0.5;
  return P;
}
function a46s3Sp(t, posOnly) {
  const P = a46sp({ x: 520, y: 900, seed: 7, badge: t >= A46_S3.badge });
  if (t >= A46_S3.hop) { const h = hop(t, A46_S3.hop, 0.32, 520, A46_POST.x, 40); P.x = h[0]; P.y = K.lerp(900, A46_POST.top, a46e(t, A46_S3.hop, 0.32)) - h[1]; }
  if (t >= A46_S3.perch) { const F = a46fly(t, [[A46_S3.perch, A46_POST.x, A46_POST.top], [33.2, A46_PLACE[0], A46_PLACE[1]]], { hz: 12, arc: -50 }); Object.assign(P, F); P.dir = 1; }
  if (posOnly) return P;
  const H = a46sHead(P), peaH = a46peaHead(a46s3Pea(t));
  P.sq = anticipate(t, 21.92, 0.2, 0.12) * landSquash(t, A46_S3.hop + 0.32, 0.16) * landSquash(t, 33.2, 0.12);
  P.beak = talk(t, [[22.2, 23.5], [23.66, 24.3], [24.5, 25.9]]) * 1.0; P.gaze = lookAt(H, t < 23.6 ? [200, 820] : peaH);
  if (a46in(t, 22.5, 24.2)) P.sag = -0.4 * a46e(t, 22.5, 0.2);
  if (a46in(t, A46_S3.point, 26.4)) { const k = a46e(t, A46_S3.point, 0.15); P.sag = -0.85 * k; P.tip = 0.1 * k; P.gaze = lookAt(H, peaH); }
  if (a46in(t, A46_S3.cheer, 27.4)) { P.y -= hop(t, 26.7, 0.25, 0, 0, 12)[1]; P.sag = -0.6 * pulse(t, 26.6, 0.7); P.beak = 1.2 * pulse(t, 26.6, 0.6); }
  if (a46in(t, 29.72, 30.64)) { P.drop = 6 * (1 - a46e(t, 30.2, 0.3)); P.gaze = t < 30.2 ? [0.3, 1] : lookAt(H, peaH); P.lid = a46tap(t, [30.25, 30.45], 0.12); P.ph = 2 * Math.sin((t - 29.72) * 8); P.amp = 0.4 * (1 - a46e(t, 30.2, 0.2)); }
  if (a46in(t, A46_S3.badge - 0.05, A46_S3.perch)) { P.gaze = t < 32.2 ? [0.3, 1] : lookAt(H, peaH); P.sq = 1 + 0.08 * a46e(t, 32.2, 0.25); P.drop = t < 32.2 ? 6 : 0; }
  if (t >= 33.36) P.gaze = [-1, 0.4];
  return P;
}
function a46s3(ctx, t) {
  a46summit(ctx, t, A46_U_SUM);
  const sp = a46s3Sp(t), spH = a46sHead(sp);
  const look = (i, t2) => (t2 < 23.66 + stagger(i, 0.06) ? [810, 700] : t2 < A46_S3.point + 0.2 ? spH : [880, 600]);
  const mod = (i, P, t2) => { if (a46in(t2, A46_S3.cheer, 27.6)) { const d = A46_S3.cheer + stagger(i, 0.1); P.y -= hop(t2, d, 0.3, 0, 0, i === 1 || i === 4 ? 30 : 14)[1]; P.sag = -0.7 * pulse(t2, d, 0.5); P.beak = 1.2 * pulse(t2, d, 0.5); } if (a46in(t2, 23.66, 24.2) && i === 2) P.headRot = 0.25; return P; };
  const pea = a46s3Pea(t);
  a46pea(ctx, pea);
  a46flock(ctx, t, look, mod);
  bird(ctx, sp);
  if (t >= A46_S3.badge && t < A46_S3.badge + 0.5) a46glint(ctx, spH[0] - 12, spH[1] + 30, 26, (t - A46_S3.badge) / 0.5);
  // the ghost crown: over the throne, slides above his head, turns gold and drops onto it
  const H = a46peaHead(pea);
  if (t < A46_S3.crown) { const at = a46lp([810, 690], [H[0], H[1] - 90], a46e(t, 25.1, 0.7)); a46crown(ctx, at[0], at[1] + 5 * Math.sin(t * 4), 1, { ghost: true }); }
  if (a46in(t, A46_S3.crown, A46_S3.crown + 0.6)) { const k = (t - A46_S3.crown) / 0.6; for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.45; seg(ctx, H[0] + Math.cos(a) * 50, H[1] - 20 + Math.sin(a) * 50, H[0] + Math.cos(a) * (60 + 30 * k), H[1] - 20 + Math.sin(a) * (60 + 30 * k), 6 * (1 - k), C.yellow, 2); } }
  // the badge in the king's wing, then pinned
  if (a46in(t, 30.64, A46_S3.badge)) { const wingTip = [pea.x - 112 - 30 * K.clamp(pea.bow / 0.35), pea.y - 150 + 40 * K.clamp(pea.bow / 0.35)]; const at = a46lp(wingTip, [spH[0] - 14, spH[1] + 36], a46e(t, 31.3, 0.5)); a46badge(ctx, at[0], at[1] + 12, 0.8 * a46e(t, 30.64, 0.3)); }
}
function a46o3(ctx, t, cam, S, tp) {
  if (a46in(t, A46_S3.point, 26.3)) { const sp = a46s3Sp(t, true), H = a46peaHead(a46s3Pea(t)); ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 26.0) / 0.3); S.arrow(ctx, tp(sp.x + 34, sp.y - 50), tp(H[0] - 40, H[1] + 60), a46e(t, A46_S3.point, 0.3), { width: 18, bend: -0.2 }); ctx.restore(); }
  if (a46in(t, 26.7, 27.6)) { const [x, y] = tp(170, 700); a46word(ctx, 'YES!', x, y, 70, a46e(t, 26.7, 0.25) * (1 - K.clamp((t - 27.4) / 0.2)), { rot: -0.1 }); }
  if (a46in(t, 31.9, 34)) { const sp = a46s3Sp(t, true), [x, y] = tp(sp.x - 20, sp.y + 60); S.label(ctx, 'MINISTER', Math.min(x, 760), Math.min(y, 1150), a46e(t, 31.9, 0.4) * (1 - K.clamp((t - 33.0) / 0.2)), { size: 40, align: 'center', fill: C.yellow }); }
}

// ---------------------------------------------------------------- S4 summit 34.0-42.0: montage of service
const a46kingSeat = (t, o = {}) => ({ x: A46_THRONE_P[0], y: A46_THRONE_P[1] + 2, s: 1, dir: -1, t, seed: 61, sit: 1, crown: 1, fan: 0, lid: a46lid(t, 61, 0.2), ...o });
const a46s4X = (t) => kfn(t, [[34.06, 430], [35.3, 235]], 'lin');
function a46s4Sp(t) {
  const P = a46sp({ seed: 7, badge: true, y: 900, dir: -1 });
  if (t < 37.64) { Object.assign(P, walk(a46s4X, t, { stride: GAIT.bird * A46_SS })); P.y -= Math.abs(Math.sin(P.ph * 1)) * 6 * P.amp; P.sq = 1.06; P.tip = -0.06; P.drop = -2; }
  if (a46in(t, 35.3, 37.64)) { P.dir = -1; const k = a46e(t, 35.4, 0.15) * (1 - a46e(t, 36.4, 0.3)); P.sag = -0.75 * k; P.brow = 0.7 * k; P.tip = 0.05 * k; }
  if (t >= 37.64) { Object.assign(P, a46fly(t, [[37.64, 235, 900], [38.6, A46_PLACE[0] - 6, A46_PLACE[1]]], { hz: 11, arc: -90 })); if (t >= 38.6) P.dir = 1; }
  if (t >= 39.2) { P.drop = 8 * pulse(t, 39.2, 0.6); P.tip = 0.2 * pulse(t, 39.2, 0.6); }
  if (t >= 40.06 && t < 40.94) { const h = hop(t, 40.06, 0.24, A46_PLACE[0] - 6, 806, 30); P.x = h[0]; P.y = K.lerp(A46_PLACE[1], 604, a46e(t, 40.06, 0.24)) - h[1]; P.dir = -1; P.beak = talk(t, [[40.35, 40.9]]) * 0.5; P.sag = -0.3; P.tip = 0.12; }
  if (t >= 40.94) { P.x = A46_PLACE[0] - 6; P.y = A46_PLACE[1]; P.dir = 1; P.sq = landSquash(t, 40.94 + Math.floor((t - 40.94) / 0.31) * 0.31, 0.14); }
  P.gaze = t < 37.64 ? [-1, 0.3] : [1, -0.6];
  return P;
}
function a46s4(ctx, t) {
  const u = t < 40.94 ? A46_U_SUM : 0.12 + ((t - 40.94) / 0.31 % 1) * 0.3;
  a46summit(ctx, t, u);
  const king = a46kingSeat(t, { gaze: [-1, 0.3] }), kH = a46peaHead(king);
  if (t >= 38.78) { king.headRot = 0.2 * a46e(t, 38.78, 0.3); king.gaze = [-0.4, 1]; king.lid = Math.max(0.2, blink(t, 61)); }
  if (a46in(t, 39.5, 40.4)) { king.bow = 0.5 * pulse(t, 39.5, 0.5); king.gulp = K.clamp((t - 39.95) / 0.45); }
  if (a46in(t, 40.06, 40.94)) { king.gaze = [1, -0.2]; king.eyes = t > 40.5 ? 'wide' : 'open'; king.bow = 0.12 * pulse(t, 40.7, 0.3); }
  if (t >= 41.36) { king.gaze = [-1, -0.6]; king.lid = Math.max(0.35, a46tap(t, [41.6], 0.3)); }
  a46pea(ctx, king);
  const mod = (i, P, t2) => { if ((i === 3 || i === 4) && t2 < 35.6) { const n = a46tap(t2, [34.3, 34.8, 35.2], 0.25); P.tip = 0.15 * n; P.x += (i === 3 ? 8 : -8) * n; P.dir = i === 4 ? -1 : 1; } if (t2 >= 36.78) P.drop = 6 * pulse(t2, 36.9 + stagger(i, 0.1), 0.35); if (t2 >= 35.5 && (i === 3 || i === 4)) P.gaze = [1, 0.3]; return P; };
  a46flock(ctx, t, () => [a46s4X(t), 860], mod);
  if (a46in(t, 34.0, 35.9)) fig(ctx, K.lerp(212, 268, a46e(t, 35.5, 0.3)), 890, 9);
  const sp = a46s4Sp(t);
  // gifts at the king's feet: a worm and a berry (eaten in one peck); during the day counter a different gift each flip
  if (t >= 39.2 && t < 40.94) { worm(ctx, 774, 786, t); if (t < 39.85) fig(ctx, 760, 782, 9); }
  if (t >= 40.94) { const n = Math.min(2, Math.floor((t - 40.94) / 0.31)); if (n === 0) worm(ctx, 774, 786, t); else if (n === 1) fig(ctx, 770, 782, 9); else for (let i = 0; i < 5; i++) a46grainDot(ctx, 766 + i * 5, 786 - (i % 2) * 3, i); }
  bird(ctx, sp);
  if (a46in(t, 40.2, 40.94)) a46picBalloon(ctx, 610, 470, 170, 120, 770, 560, a46e(t, 40.2, 0.25), (c) => { bird(c, a46sp({ x: -10, y: 30, s: 0.6, silhouette: true })); c.font = K.font(54, BF, 400); c.fillStyle = C.red; c.textAlign = 'center'; c.fillText('!', 40, 20); });
  void kH;
}
function a46o4(ctx, t, cam, S, tp) {
  if (a46in(t, 36.78, 38.0)) { const p = a46e(t, 36.78, 0.4) * (1 - K.clamp((t - 37.8) / 0.2)); S.label(ctx, 'KINGDOM', 60, 150, p, { size: 44 }); if (p > 0.4) S.arrow(ctx, tp(120, 790), tp(560, 790), K.clamp((t - 37.0) / 0.5), { width: 16, bend: 0.25 }); }
  if (t >= 40.94) { const n = Math.min(3, 1 + Math.floor((t - 40.94) / 0.31)); S.label(ctx, 'DAY', 60, 150, 1, { size: 50, fill: C.yellow }); S.counter(ctx, n, 290, 210, K.clamp((t - 40.94 - (n - 1) * 0.31) / 0.2), { size: 90 }); }
}

// ---------------------------------------------------------------- S5 summit 42.0-50.3: the minister is late
const A46_S5 = { arrive: 44.86, land: 45.9, why: 46.9, point: 49.8 };
function a46s5Sp(t) {
  if (t < A46_S5.arrive) return null;
  const P = a46sp({ seed: 7, badge: true, x: A46_PLACE[0], y: A46_PLACE[1], dir: 1 });
  if (t < A46_S5.land) { Object.assign(P, a46fly(t, [[A46_S5.arrive, -40, 260], [45.3, 300, 560], [A46_S5.land, A46_PLACE[0] - 20, A46_PLACE[1]]], { hz: 15, arc: 30 })); P.sag = 0.2 * Math.sin(t * 31); P.rot = (P.rot || 0) + 0.2 * Math.sin(t * 13); }
  else { P.x = A46_PLACE[0] - 20 + 20 * a46e(t, A46_S5.land, 0.25, 'out'); P.sq = Math.min(landSquash(t, A46_S5.land, 0.25), 1) * (1 + 0.03 * Math.sin(t * 2 * Math.PI * 3)); P.beak = 0.7; P.eyes = 'wide'; P.tip = 0.06 * Math.sin(t * 19) * (t < 46.3 ? 1 : 0); }
  const H = a46sHead(P), kH = a46peaHead(a46kingSeat(t));
  P.gaze = lookAt(H, kH);
  if (a46in(t, 49.1, 49.8)) { P.gaze = t < 49.45 ? [-1, -0.1] : lookAt(H, kH); P.x += tremble(t, 2); P.drop = 3 * pulse(t, 49.1, 0.2); P.eyes = 'open'; }
  if (t >= A46_S5.point) { P.beak = talk(t, [[49.8, 50.3]]); P.sag = -0.8 * a46e(t, A46_S5.point, 0.15); P.eyes = 'open'; }
  return P;
}
function a46s5(ctx, t) {
  a46summit(ctx, t, 0.32);
  const king = a46kingSeat(t), H = a46peaHead(king);
  king.gaze = lookAt(H, gazePlan(t, [[42.0, [748, 760]], [42.9, [300, 150]], [43.5, [748, 760]]], 0.3));
  king.tap = t < 44.0 ? a46tap(t, [42.2, 42.7, 43.2, 43.7], 0.25) : 0;
  if (a46in(t, 44.0, A46_S5.land)) { king.neck = 1 + 0.15 * a46e(t, 44.0, 0.3); king.brow = -0.5; king.crest = 0.2; king.gaze = [-0.8, -0.6]; }
  if (t >= A46_S5.land) king.gaze = lookAt(H, a46sHead(a46s5Sp(t)));
  if (t >= A46_S5.why) { king.bow = 0.3 * a46e(t, A46_S5.why, 0.4); king.headRot = 0.15 * a46e(t, A46_S5.why, 0.4); king.brow = -0.5; king.talk = talk(t, [[46.95, 47.9], [48.1, 49.6]]) * 0.6; }
  if (t >= A46_S5.point) king.gaze = [-1, 0.2];
  king.crest = (king.crest || 0) + a46crestLag(t, [44.0, A46_S5.why]);
  a46pea(ctx, king);
  if (t < A46_S5.land) { const a = 0.25 + 0.25 * Math.max(0, Math.sin((t - 42.8) * Math.PI * 2 / 0.8)); ctx.save(); ctx.globalAlpha = a; bird(ctx, a46sp({ x: A46_PLACE[0], y: A46_PLACE[1], silhouette: true, noBlink: true })); ctx.restore(); }
  const sp = a46s5Sp(t); if (sp) { bird(ctx, sp); if (t >= A46_S5.land) dustBurst(ctx, A46_PLACE[0], A46_PLACE[1], t - A46_S5.land, 5, 6, 12, 30, 0.5, 3); }
}
function a46o5(ctx, t, cam, S, tp) {
  if (a46in(t, 42.9, 44.8)) { const [x, y] = tp(A46_PLACE[0], 660); a46word(ctx, 'LATE!', x, y, 64, a46e(t, 42.9, 0.3) * (1 - K.clamp((t - 44.6) / 0.2)), { rot: -0.06, fill: C.red, stroke: C.black }); }
  if (a46in(t, 47.2, 49.0)) { const H = a46peaHead(a46kingSeat(t, { bow: 0.3 })), [x, y] = tp(H[0] + 20, H[1] - 90); a46word(ctx, '?', x, y, 80, a46e(t, 47.2, 0.25) * (1 - K.clamp((t - 48.8) / 0.2)), { fill: C.white }); }
}
