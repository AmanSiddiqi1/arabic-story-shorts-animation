// ===== AN-092: the palace at night (S1-S3 the frame story, S13 the laugh and the gift, S15 asleep) =====
// palaceHall (blue wall, no throne) + a night view in the door and window + a navy wash; diwan on the dais (seat top 812).
const A92_DX = 760;   // the Caliph's seat on the diwan (x); dais top 860
function a92Night(c) { c.fillStyle = NAVY2; c.fillRect(0, 300, 1000, 640); c.save(); c.globalAlpha = 0.9; stars(c, { w: 1000, h: 900, n: 140, seed: 9 }); c.restore();
  shape(c, ell(878, 392, 24, 24, 20), '#fff3a0', { lw: 4, seed: 450 }); shape(c, ell(888, 386, 20, 20, 18), NAVY2, { lw: 0 });
  shape(c, [[-10, 860], [300, 860], [300, 930], [-10, 930]], '#2a3f7a', { lw: 4, seed: 451 }); }
function a92Palace(ctx, t, o = {}) {
  palaceHall(ctx, { wall: 'blue', throne: false, dais: [560, 940, 860], cushions: [], lamps: [], outside: a92Night, light: 0, t });
  ctx.save(); ctx.fillStyle = 'rgba(13,34,96,0.30)'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
  hangingLamp(ctx, 380, 250, t, { lit: 1, chain: 70 }); hangingLamp(ctx, 930, 250, t + 1.7, { lit: o.dim ?? 1, chain: 70 });
  a92Diwan(ctx, 580, 930, 860);
  shape(ctx, [[280, 900], [284, 878], [376, 878], [380, 900]], C.yellow, { lw: 5, seed: 452, dot: C.red, pitch: 8, rad: 0.2, da: 0.5 });   // Ali's floor cushion
}
// ---------- the Caliph: lying (bed surface under the hips at 812) or sitting on the diwan ----------
function a92CaliphLie(t, o = {}) { return { ...A92_CALIPH, x: 800, y: 812, lie: 1, dir: 1, ...o }; }
function a92CaliphSit(o = {}) { return { ...A92_CALIPH, x: A92_DX, y: 860, sit: 1, seat: 'bench', dir: -1, ...o }; }
function a92DrawLying(ctx, P, t, br) { a92Pillow(ctx, 630, 812, 1); person(ctx, P); a92Blanket(ctx, 690, 920, 812, 6 * Math.sin(t * 1.9) * br + (P.bump || 0), 1); }
const A92_ALI_SEAT = [330, 900];
const a92AliSeated = (o = {}) => ({ ...A92_ALI, x: A92_ALI_SEAT[0], y: 900, sit: 1, seat: 'floor', dir: 1, ...o });

// ---------- S1 (0-12.34): sleepless; claps; Ja'far skids in; scroll, laugh face, worry ----------
const A92_JX1 = (t) => kfn(t, [[6.3, 60], [7.15, 470]], 'out');
function a92S1(ctx, t, cam) {
  a92Palace(ctx, t);
  let C1, sitting = t >= 4.16;
  const up = A92B(t, 4.16, 0.6, 'out');
  if (!sitting) {
    C1 = a92CaliphLie(t, { lid: 0, brow: -0.4, mouth: 'closed', noBlink: t < 1 });
    C1.gaze = gazePlan(t, [[0, [-0.4, -0.9]], [0.6, [0.3, -1]], [1.2, [0.8, -0.6]], [1.7, [-0.5, -0.8]]], 0.07);
    if (t >= 2.2 && t < 3.2) { C1.sq = 1 - 0.1 * pulse(t, 2.2, 0.4); C1.brow = 0.5; C1.mouth = 'frown'; C1.bump = 10 * pulse(t, 2.35, 0.5); C1.tip = 0.04 * pulse(t, 2.2, 0.5); }
    if (t >= 3.2) { C1.lid = 1; C1.brow = 0.3; }
    if (t >= 3.6) { C1.lid = 0; C1.wink = 'L'; C1.gaze = [0, -1]; }
    if (t >= 3.78) { C1.wink = null; C1.brow = -0.5; }
    if (t < 2.2 || t >= 3.78) a92Blink(C1, t);
    a92DrawLying(ctx, C1, t, 1);
    if (t >= 2.2 && t < 2.9) dustBurst(ctx, 630, 790, t - 2.3, 4, 4, 9, 22, 0.4, 5);
  } else {
    C1 = a92CaliphSit({ lid: 0.35, brow: -0.4, mouth: 'frown' });
    C1.sit = up; C1.lie = 1 - up; C1.x = K.lerp(800, A92_DX, up); C1.y = K.lerp(812, 860, up); if (up < 1) C1.dir = 1;
    C1.sq = (up < 1 ? 1 : settleTo(t, 4.76, 0.96, 1, 0.35)) * (1 - 0.04 * pulse(t, 4.9, 0.6));
    C1.gaze = [0.2, -0.5]; if (t < 5.4) { C1.handL = PERSON_HANDS.headHold.L; }
    if (t >= 5.3 && t < 6.2) { C1.gaze = lookAt(a92Eye(C1), [150, 720]); const c = Math.max(pulse(t, 5.3, 0.22), pulse(t, 5.55, 0.22)); C1.handL = [-50 + 44 * c, -138]; C1.handR = [50 - 44 * c, -138]; C1.mouth = 'open'; C1.brow = 0.3; C1.lid = 0.1; }
    if (t >= 6.2) C1.gaze = lookAt(a92Eye(C1), [A92_JX1(t), 700]);
    if (t >= 8.0 && t < 8.9) { C1.handR = PERSON_HANDS.pointUp.R; C1.gaze = [-0.4, -0.9]; C1.mouth = 'closed'; C1.talk = 0.4 * Math.abs(Math.sin(t * 10)); }
    if (t >= 8.9 && t < 9.4) { C1.mouth = 'smile'; C1.gaze = [-0.4, -0.9]; C1.lid = 0.15; }
    if (t >= 9.4) { C1.mouth = 'frown'; C1.brow = -0.6; C1.lid = 0.4; C1.drop = 6 * A92B(t, 9.4, 0.4); }
    if (t >= 9.92 && t < 11.0) { const a = (t - 9.92) * 5; C1.handR = [60 + 10 * Math.sin(a), -205 + 8 * Math.cos(a)]; C1.gaze = [0.1, -1]; }
    if (t >= 11.0) C1.gaze = lookAt(a92Eye(C1), a92Eye(a92Jafar1(t)));
    a92Blink(C1, t);
    if (t < 4.9) a92Blanket(ctx, 690, 920, 812, 0, 1 - up * 0.8);
    a92Pillow(ctx, 630, 812, 1);
    person(ctx, C1);
    if (up > 0.5) shape(ctx, [[A92_DX - 70, 812], [A92_DX - 60, 790], [A92_DX + 60, 786], [A92_DX + 74, 812]], C.blue, { lw: 5, seed: 405, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.4 });   // blanket on the lap
  }
  if (t >= 6.3) person(ctx, a92Jafar1(t));
  for (const f of A92_JF1) dustBurst(ctx, f.x, 900, t - f.t, 3, 4, 8, 18, 0.35, Math.round(f.t * 10));
  return { C1 };
}
const A92_JF1 = footfalls(A92_JX1, 6.3, 7.2, 28);
function a92Jafar1(t) {
  const J = { ...A92_JAFAR, ...walk(A92_JX1, t, { stride: 28 }), y: 900, dir: 1, gaze: [1, -0.2] };
  J.tip = 0.1 * lurch(t, 7.15, 1) ; if (t >= 7.26) { J.tip = 0.16 * pulse(t, 7.26, 1.1); J.handR = PERSON_HANDS.chest.R; J.lid = t < 8.0 ? 0.6 : 0; }
  if (t >= 7.8) J.gaze = lookAt(a92Eye(J), [A92_DX, 650]);
  if (t >= 8.0 && t < 9.9) J.gaze = lookAt(a92Eye(J), [640, 520]);
  if (t >= 8.9 && t < 9.4) J.drop = 6 * pulse(t, 8.9, 0.4);
  if (t >= 11.0) { J.handR = PERSON_HANDS.chin.R; J.gaze = gazePlan(t, [[11.0, [-0.7, -0.7]], [11.45, [0.7, -0.7]], [11.9, [0.3, -0.9]]], 0.07); J.x += 3 * Math.sin((t - 11) * 3); }
  if (t >= 8.0) a92Blink(J, t);
  return J;
}
function a92O1(ctx, t, P, S, r, L) {
  if (a92In(t, 1.0, 4.0)) { L.lab('CALIPH HARUN AL-RASHID', 420, 230, 1.0, 4.0, { size: 44 }); L.arr([500, 270], [P(640, 760)[0] - 40, P(640, 760)[1] - 90], 1.0, 4.0, { width: 16, bend: 0.2 }); }
  if (a92In(t, 7.26, 9.6)) { const h = P(470, 640); L.lab("VIZIER JA'FAR", h[0], h[1] - 150, 7.26, 9.6, { size: 44 }); }
  if (t >= 8.0 && t < 9.9 && r.C1) { const h = P(...a92Head(r.C1)); const k = t < 9.6 ? A92B(t, 8.0, 0.3, 'out') : 1 - A92B(t, 9.6, 0.3); a92Balloon(ctx, h[0] - 150, h[1] - 190, 70, [h[0] - 40, h[1] - 50], k, (c) => (t < 8.9 ? a92ScrollIcon(c) : a92LaughIcon(c, t))); }
  if (t >= 9.92 && r.C1) { const h = P(...a92Head(r.C1)); const s = settleTo(t, 9.92, 0, 1, 0.4) * (1 + 0.12 * pulse(t, 11.36, 0.5) + 0.04 * Math.sin(t * 5)); a92Scribble(ctx, h[0] + 30 * Math.sin(t * 0.9), h[1] - 130 * cam_z(r), t, { s: s * 1.4 }); }
}
const cam_z = (r) => r.z || 1.35;

// ---------- S2 (12.34-23.98): the idea, Ali in the cloud, Ali walks in and sits ----------
const A92_AX2 = (t) => kfn(t, [[20.28, 60], [21.28, 330]], 'out');
const A92_JX2 = (t) => kfn(t, [[21.3, 470], [21.8, 545]]);
const A92_AF2 = footfalls(A92_AX2, 20.28, 21.3, 28);
function a92Ali2(t) {
  if (t < 20.28) return null;
  const A = { ...A92_ALI, ...walk(A92_AX2, t, { stride: 28 }), y: 900, dir: 1, mouth: 'smile', gaze: [0.8, -0.4] };
  if (t >= 21.3) { A.tip = 0.14 * pulse(t, 21.3, 0.5); A.handR = PERSON_HANDS.chest.R; A.lid = t < 21.6 ? 0.5 : 0; }
  if (t >= 21.76) { A.sq = anticipate(t, 21.76, 0.12, 0.05); const u = A92B(t, 21.82, 0.5); A.sit = Math.min(1.08, settleTo(t, 21.82, 0, 1, 0.5, 0.08)); A.seat = 'floor'; A.handR = null; A.handL = [-40, -100]; A.handR = [40, -100]; if (u < 0.01) A.sit = 0; }
  if (t >= 21.6) A.gaze = lookAt(a92Eye(A), [A92_DX, 640]);
  a92Blink(A, t); return A;
}
function a92S2(ctx, t, cam) {
  a92Palace(ctx, t);
  const C1 = a92CaliphSit({ lid: 0.35, brow: -0.4, mouth: 'frown', gaze: [-0.6, -0.2] });
  const J = { ...A92_JAFAR, x: A92_JX2(t), y: 900, dir: 1, gaze: [0.6, -0.5] };
  // Ja'far's idea
  if (t < 13.78) { J.handR = PERSON_HANDS.pointUp.R; J.mouth = 'smile'; J.brow = -0.5; J.eyes = t < 12.8 ? 'wide' : 'open'; const [, h] = hop(t, 12.34, 0.3, 0, 0, 14); J.y = 900 - h; J.sq = landSquash(t, 12.64, 0.12); }
  else if (t < 19.4) { J.handR = PERSON_HANDS.pointUp.R; J.talk = talk(t, [[13.8, 15.6], [16.2, 18.4]]); J.gaze = lookAt(a92Eye(J), [300, 380]); J.mouth = 'smile'; }
  else if (t < 21.3) { J.gaze = lookAt(a92Eye(J), [150, 700]); const c = Math.max(pulse(t, 19.9, 0.2), pulse(t, 20.15, 0.2)); J.handL = [-50 + 44 * c, -138]; J.handR = [50 - 44 * c, -138]; }
  else { J.handL = PERSON_HANDS.palmsUp.L; J.handR = PERSON_HANDS.palmsUp.R; J.gaze = lookAt(a92Eye(J), [330, 760]); if (t >= 22.62) { J.handL = PERSON_HANDS.clasp.L; J.handR = PERSON_HANDS.clasp.R; J.gaze = lookAt(a92Eye(J), [A92_DX, 640]); } }
  J.x += 0; a92Blink(J, t);
  // the Caliph: interest grows, then he sends for Ali
  if (t >= 13.78) C1.gaze = lookAt(a92Eye(C1), [300, 380]);
  if (t >= 16.78) { C1.tip = 0.08 * A92B(t, 16.78, 0.5); C1.brow = -0.5; C1.lid = 0.1; C1.mouth = 'closed'; }
  if (t >= 19.4 && t < 20.3) { C1.drop = 8 * (pulse(t, 19.4, 0.3) + pulse(t, 19.7, 0.3)); C1.handR = PERSON_HANDS.pointFwd.R; C1.gaze = lookAt(a92Eye(C1), [150, 700]); }
  const A = a92Ali2(t);
  if (t >= 20.3) { C1.gaze = lookAt(a92Eye(C1), A ? a92Eye(A) : [150, 700]); C1.tip = 0.06; }
  if (t >= 23.3) { C1.handR = t < 23.6 ? PERSON_HANDS.palmsUp.R : PERSON_HANDS.chin.R; C1.lid = 0.25; C1.tip = 0.03; }
  a92Blink(C1, t);
  a92Pillow(ctx, 630, 812, 1); person(ctx, C1); shape(ctx, [[A92_DX - 70, 812], [A92_DX - 60, 790], [A92_DX + 60, 786], [A92_DX + 74, 812]], C.blue, { lw: 5, seed: 405, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.4 });
  person(ctx, J);
  if (A) person(ctx, A);
  for (const f of A92_AF2) dustBurst(ctx, f.x, 900, t - f.t, 3, 4, 8, 18, 0.35, Math.round(f.t * 10));
  return { C1, J, A };
}
// Ali telling a tale inside a cloud (world units for the cloud's inside callback)
function a92CloudTale(c, t) {
  c.fillStyle = C.yellow; c.fillRect(0, 0, 1000, 1230); c.fillStyle = dotPat(c, C.red, 14, 0.2); c.fillRect(0, 0, 1000, 1230);
  shape(c, K.rectPts(-10, 900, 1020, 340), '#e8a04a', { lw: 6, seed: 460 });
  const A = { ...A92_ALI, x: 500, y: 900, s: 1.4, mouth: 'smile', talk: 0.5 + 0.5 * Math.abs(Math.sin(t * 9)), gaze: [-0.5, 0.1] };
  const ph = (t * 0.7) % 2; if (ph < 1) { A.handL = PERSON_HANDS.armsOut.L; A.handR = PERSON_HANDS.armsOut.R; } else A.handR = PERSON_HANDS.pointUp.R;
  person(c, A);
  if (t >= 15.88) for (let i = 0; i < 2; i++) { const L = { costume: i ? 'maiden' : 'servant', child: true, x: 180 + i * 160, y: 900, s: 1.4, mouth: 'open', lid: 0.7, noBlink: true }; L.tip = -0.08 * Math.max(0, Math.sin((t - 15.88) * 15 + i * 1.7)); L.sq = 1 + 0.03 * Math.sin((t - 15.88) * 18 + i * 2); person(c, L); }
}
function a92O2(ctx, t, P, S, r, L) {
  // scribble (half size after 16.78)
  if (r.C1) { const h = P(...a92Head(r.C1)); const s = 1.1 * K.lerp(1, 0.5, A92B(t, 16.78, 0.6)); a92Scribble(ctx, h[0] + 30 * Math.sin(t * 0.9), h[1] - 200, t, { s: s * 1.3 }); }
  // Ja'far's thought cloud
  if (t >= 13.78 && t < 20.5 && r.J) { const p = t < 19.6 ? K.clamp((t - 13.78) / 0.7) : 1 - K.clamp((t - 19.6) / 0.6); const c = P(300, 380), h = P(...a92Head(r.J)), z = r.z || 1.2;
    thoughtCloud(ctx, c[0], c[1], 420 * z, 300 * z, t, { p, tail: [h[0] - 10, h[1] - 50 * z], scale: 0.42 * z, at: [430, 700], inside: (k) => a92CloudTale(k, t) }); }
  if (a92In(t, 18.52, 20.3)) { const c = P(300, 380); L.lab('ALI THE PERSIAN', c[0], c[1] + 210, 18.52, 20.3, { size: 46 }); }
}

// ---------- S3 (23.98-26.78): Ali begins; his thought cloud grows to fill the panel ----------
function a92S3(ctx, t, cam) {
  a92Palace(ctx, t);
  const A = a92AliSeated({ mouth: 'smile', talk: talk(t, [[24.0, 25.6]]), gaze: [0.6, -0.5] });
  A.sq = anticipate(t, 23.98, 0.25, 0.05) * (t > 24.23 ? 1.02 - 0.02 * A92B(t, 24.23, 0.4) : 1);
  A.handR = PERSON_HANDS.pointUp.R; if (t >= 24.8) A.gaze = [0.3, -0.8];
  a92Blink(A, t);
  const C1 = a92CaliphSit({ lid: 0.15, brow: -0.4, mouth: 'closed', tip: 0.06 + 0.04 * A92B(t, 25.0, 0.6) }); C1.gaze = lookAt(a92Eye(C1), a92Eye(A)); a92Blink(C1, t);
  const J = { ...A92_JAFAR, x: 545, y: 900, dir: 1, handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R, tilt: 0.08 * A92B(t, 25.0, 0.5) }; J.gaze = lookAt(a92Eye(J), a92Eye(A)); a92Blink(J, t);
  a92Pillow(ctx, 630, 812, 1); person(ctx, C1); shape(ctx, [[A92_DX - 70, 812], [A92_DX - 60, 790], [A92_DX + 60, 786], [A92_DX + 74, 812]], C.blue, { lw: 5, seed: 405, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.4 });
  person(ctx, J); person(ctx, A);
  return { A, C1 };
}
function a92O3(ctx, t, P, S, r, L) {
  if (r.C1) { const h = P(...a92Head(r.C1)); a92Scribble(ctx, h[0] + 30 * Math.sin(t * 0.9), h[1] - 250, t, { s: 0.75 }); }
  // the tale cloud (taleZoom): trail, then growth past the panel edges; its sky-blue inside matches the road's sky
  if (t >= 26.02 && r.A) { const h = P(...a92Head(r.A)), u = K.clamp((t - 26.02) / 0.76), g = K.ease.in(K.clamp((u - 0.25) / 0.75)), w = K.lerp(300, 4200, g), c = [K.lerp(h[0] + 90, 500, g), K.lerp(h[1] - 240, 615, g)];
    thoughtCloud(ctx, c[0], c[1], w, w * 0.8, t, { p: K.clamp(u * 2.2), tail: [h[0] + 10, h[1] - 60], fill: C.blue, lw: 11 });
    if (u > 0.3) { ctx.save(); ctx.globalAlpha = K.clamp((u - 0.3) / 0.2); S.title(ctx, "ALI'S TALE", c[0], c[1] + 30, A92B(t, 26.3, 0.4), { size: 70, align: 'center' }); ctx.restore(); } }
}

// ---------- S13 (144.92-155.28): the tale cloud shrinks back; the Caliph laughs; the purse ----------
const A92_JX13 = (t) => kfn(t, [[153.0, 545], [153.5, 430]]);
function a92S13(ctx, t, cam) {
  a92Palace(ctx, t);
  const C1 = a92CaliphSit({ mouth: 'closed', brow: -0.3, lid: 0.8 });
  if (t < 145.3) { C1.sq = 0.93; C1.x += tremble(t, 2, 8); C1.mouth = 'closed'; C1.cheeks = true; }
  const la = a92Laugh(t, 145.3, 1, 2.2), lb = a92Laugh(t, 148.4, 0.55, 1.4);
  if (t >= 145.3) { const q = t >= 148.4 ? lb : la; Object.assign(C1, q); C1.mouth = 'open'; C1.brow = -0.6; C1.handL = t < 147.5 ? [-70 + 8 * Math.sin(t * 15), -60] : null; }
  if (t >= 148.16 && t < 149.0) { C1.handR = [18, -196]; C1.wet = true; }
  if (t >= 150.5) { C1.tip = 0.03; C1.talk = 0; C1.mouth = 'smile'; C1.lid = 0.3; C1.sq = 1; C1.drop = 0; }
  if (t >= 152.4 && t < 153.3) { C1.handR = PERSON_HANDS.pointFwd.R; C1.talk = 0.4 * Math.abs(Math.sin(t * 12)); }
  if (t >= 154.34) { C1.mouth = 'open'; C1.talk = 0; C1.lid = K.lerp(0.3, 0.85, A92B(t, 154.34, 0.4)); C1.sq = 1 + 0.05 * pulse(t, 154.34, 0.9); C1.handR = [30, -175]; }
  if (t >= 150.5 && t < 154.34) a92Blink(C1, t);
  const A = a92AliSeated({ mouth: 'smile', gaze: [0.6, -0.5] });
  A.gaze = lookAt(a92Eye(A), a92Eye(C1));
  if (t < 145.6) { A.talk = 0.5 * Math.abs(Math.sin(t * 10)); A.handL = [-50, -120]; A.handR = [40, -160]; }
  if (t >= 149.62 && t < 150.96) { const d = t - 149.62; if (d < 0.4) A.handR = [70, -150 + 40 * A92B(t, 149.62, 0.3)]; else { const b = Math.sin((d - 0.4) * 18); A.handL = [-10 + 14 * b, -120]; A.handR = [10 - 14 * b, -116]; } A.brow = -0.5; }
  if (t >= 150.96 && t < 151.9) { A.tip = 0.12 * pulse(t, 150.96, 0.9); A.handR = PERSON_HANDS.chest.R; A.lid = 0.5; }
  // the purse: in Ja'far's hands, then in Ali's
  const J = { ...A92_JAFAR, ...walk(A92_JX13, t, { stride: 28 }), y: 900, dir: 1, mouth: 'smile', lid: 0.4 };
  J.gaze = lookAt(a92Eye(J), a92Eye(C1));
  if (t >= 147.0 && t < 151.5) { J.handL = PERSON_HANDS.mouthCover.L; J.handR = PERSON_HANDS.mouthCover.R; J.lid = 0.6; J.x += tremble(t + 0.13, 1.5, 5); J.sq = 1 + 0.02 * Math.sin(t * 31); }
  let purse = null;
  if (t >= 152.4 && t < 153.58) { purse = [J.x + 44, 900 - 92]; J.handLW = [purse[0] - 22, purse[1] - 20]; J.handRW = [purse[0] + 22, purse[1] - 20]; J.gaze = lookAt(a92Eye(J), a92Eye(A)); J.lid = 0; }
  if (t >= 153.58) {
    const dip = 14 * (1 - settleTo(t, 153.58, 0, 1, 0.4, 0.2)); const seatP = a92Pt(A, 60, -112); purse = [seatP[0] + 6, seatP[1] + dip + 22];
    A.handLW = [purse[0] - 24, purse[1] - 18]; A.handRW = [purse[0] + 26, purse[1] - 20]; A.gaze = lookAt(a92Eye(A), purse); A.lid = 0; A.mouth = t < 154.1 ? 'o' : 'smile'; A.brow = -0.6;
    if (t < 153.9) { J.handLW = [purse[0] - 20, purse[1] - 24]; J.handRW = [purse[0] + 22, purse[1] - 26]; } else { J.handL = PERSON_HANDS.clasp.L; J.handR = PERSON_HANDS.clasp.R; }
    J.gaze = lookAt(a92Eye(J), purse);
  }
  a92Blink(A, t); if (t < 147 || t >= 151.5) a92Blink(J, t);
  a92Pillow(ctx, 630, 812, 1); person(ctx, C1); shape(ctx, [[A92_DX - 70, 812], [A92_DX - 60, 790], [A92_DX + 60, 786], [A92_DX + 74, 812]], C.blue, { lw: 5, seed: 405, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.4 });
  person(ctx, A); person(ctx, J);
  if (purse) a92Purse(ctx, purse[0], purse[1], 0.9, { glint: t >= 153.58 ? pulse(t, 153.7, 0.5) + pulse(t, 154.0, 0.4) : 0 });
  if (t >= 154.34 && t < 155.28) { const u = K.clamp((t - 154.34) / 0.55), cx = purse[0] + 40 * u, cy = purse[1] - 60 - 110 * Math.sin(Math.PI * u) + 50 * u * u; shape(ctx, ell(cx, cy, 10, 10 * Math.abs(Math.cos(t * 20)) + 2, 12), C.yellow, { lw: 3, seed: 470 }); }
  return { C1, A, J };
}
function a92O13(ctx, t, P, S, r, L) {
  if (r.C1) { const h = P(...a92Head(r.C1)); if (t < 145.3) a92Scribble(ctx, h[0], h[1] - 200, t, { s: 0.7 * (1 + 0.15 * Math.sin(t * 20)) }); else a92Scribble(ctx, h[0], h[1] - 200, t, { s: 0.7, burst: K.clamp((t - 145.3) / 0.7) }); }
  if (a92In(t, 145.4, 149.4)) L.word('HA HA HA!', 300, 260, 145.4, 149.4, 92, { rot: -0.08 });
  // the tale cloud shrinks back into Ali's head (inside: the last court picture)
  if (t < 145.62 && r.A) { const h = P(...a92Head(r.A)), u = K.ease.out(K.clamp((t - 144.92) / 0.7)), w = K.lerp(4200, 120, u), c = [K.lerp(500, h[0] + 60, u), K.lerp(615, h[1] - 150, u)];
    thoughtCloud(ctx, c[0], c[1], w, w * 0.8, t, { p: 1, tail: [h[0] + 10, h[1] - 60], fill: C.white, scale: w / 1300, at: [470, 680], inside: (k) => { a92CourtSet(k, 144.9); a92Desk(k); } }); }
}

// ---------- S15 (166.6-170.67): asleep and smiling; Ja'far hushes; Ali tiptoes out ----------
const A92_AX15 = (t) => kfn(t, [[166.9, 330], [169.6, 170]], 'lin');
function a92S15(ctx, t, cam) {
  a92Palace(ctx, t, { dim: K.lerp(1, 0.5, A92B(t, 169.0, 1.0)) });
  const C1 = a92CaliphLie(t, { lid: 1, mouth: 'smile', noBlink: true, sq: 1 + 0.015 * Math.sin(t * 2.2) });
  a92DrawLying(ctx, C1, t, 1);
  const J = { ...A92_JAFAR, x: 545, y: 900, dir: 1, handR: t >= 167.0 ? PERSON_HANDS.hush.R : PERSON_HANDS.clasp.R, handL: PERSON_HANDS.clasp.L, mouth: 'closed' };
  const W = walk(A92_AX15, t, { stride: 18 }); const A = { ...A92_ALI, ...W, amp: W.amp * 0.7, y: 900, dir: -1, mouth: 'smile', sq: 0.95 };
  J.gaze = lookAt(a92Eye(J), a92Eye(A)); a92Blink(J, t);
  const pur = a92Pt(A, -10, -100); A.handLW = [pur[0] - 20, pur[1] - 12]; A.handRW = [pur[0] + 20, pur[1] - 12];
  A.gaze = t > 168.0 && t < 168.8 ? lookAt(a92Eye(A), [760, 760]) : [-0.9, 0.1]; A.tilt = t > 168.0 && t < 168.8 ? 0.08 : 0; a92Blink(A, t);
  person(ctx, J); person(ctx, A); a92Purse(ctx, pur[0], pur[1] + 8, 0.85);
  return { C1 };
}
function a92O15(ctx, t, P, S, r, L) {
  if (t >= 169.0) { for (let i = 0; i < 3; i++) { const d = t - 169.0 - i * 0.45; if (d < 0) continue; const h = P(640, 700); ctx.save(); ctx.globalAlpha = K.clamp(1 - d / 1.6); ctx.font = K.font(40 + i * 10, BF, 400); ctx.fillStyle = C.white; ctx.strokeStyle = C.black; ctx.lineWidth = 6; ctx.textAlign = 'center';
    const x = h[0] + 20 + i * 30 + 10 * Math.sin(d * 3), y = h[1] - 60 - d * 70; ctx.strokeText(i ? 'z' : 'Z', x, y); ctx.fillText(i ? 'z' : 'Z', x, y); ctx.restore(); } }
}
