// ===== AN-014 well scenes: S10 the bottom of the well (64.0-73.78), S11 the jinn talk (73.78-85.8), S12 the cure (85.8-98.14) =====
const K14_FLOOR = 1186;
function k14JA(t) {
  const P = { ...K14_JA, pal: { ...K14_JA.pal }, x: 215, y: K14_CAVE.floor, s: 1.0, dir: 1, mouth: 'smile', brow: -0.4 };
  if (t >= 85.8) { const [, l] = hop(t, 86.0, 0.4, 0, 0, 50); P.x = kfn(t, [[86.0, 215], [86.4, 180]]); P.y = kfn(t, [[86.0, K14_CAVE.floor], [86.4, 1124]]) - l; P.sq = Math.min(anticipate(t, 85.8, 0.2, 0.1), landSquash(t, 86.4, 0.16)); }
  P.talk = talk(t, [[76.08, 77.4], [77.6, 79.6], [80.0, 81.7], [83.2, 84.3], [88.96, 90.6], [91.4, 94.6]]);
  const sw = Math.sin(t * 5);
  if (inI(t, [[76.08, 77.4], [77.6, 79.7], [88.96, 90.6], [91.5, 93.1]])) { P.handL = sw > 0 ? PERSON_HANDS.armsOut.L : [-50, -110]; P.handR = sw > 0 ? [60, -110] : PERSON_HANDS.armsOut.R; }
  if (t >= 79.78 && t < 81.0) { P.handL = [-40 + 10 * Math.sin(t * 20), -170]; P.handR = [40 + 10 * Math.sin(t * 20 + 1), -175]; }
  if (t >= 81.86 && t < 83.1) { P.handR = [30, -214]; P.sq = 1.05; P.lid = 0.4; }
  if (t >= 86.6 && t < 87.4) P.handR = PERSON_HANDS.pointUp.R;
  if (t >= 90.74 && t < 91.45) { P.aL = K14_UP.aL; P.aR = K14_UP.aR; P.mouth = 'open'; }
  return P;
}
function k14JB(t) {
  const P = { ...K14_JB, pal: { ...K14_JB.pal }, x: 390, y: K14_CAVE.floor, s: 1.0, dir: -1, sit: 1, seat: 'floor', mouth: 'o', brow: -0.3 };
  if (t >= 76.08 && t < 77.9) { P.handR = PERSON_HANDS.chin.R; P.tip = 0.08; }
  if (t >= 77.96 && t < 78.8) P.handR = PERSON_HANDS.pointUp.R;
  if (t >= 78.82 && t < 79.75) { P.handR = PERSON_HANDS.cheeks.R; P.handL = PERSON_HANDS.cheeks.L; }
  if (t >= 79.78 && t < 81.0) { P.x += tremble(t, 2.5); P.eyes = 'wide'; }
  if (t >= 81.86 && t < 83.1) { P.drop = 6 * (pulse(t, 82.0, 0.3) + pulse(t, 82.45, 0.3)); P.mouth = 'smile'; }
  if (t >= 85.8) { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; }
  if (t >= 93.54 && t < 94.72) { P.handL = [-34, -236]; P.handR = [34, -236]; P.mouth = 'open'; }
  return P;
}
// the balloon content (box-local units, 300 x 200 box)
function k14Gossip(c, t) {
  if (t < 85.8) {
    if (t < 83.18) { const ill = t >= 78.82, spin = t * 3; k14IconPrincess(c, -55, -78, 0.85, { ill, spin }); if (t >= 77.96) k14Crown(c, 80, 30, 1.1 * K.ease.back(K.clamp((t - 77.96) / 0.3)));
      if (t >= 79.78) { const P = { x: -50, y: 30, s: 0.45 }; k14Wisp(c, -55, -55, t, { s: 0.35, r: 90, alpha: K.clamp((t - 79.78) / 0.3) }); } }
    else { if (t < 83.72) sfx(c, '?', 0, 30, 130, K14B(t, 83.18, 0.3)); else k14Tick(c, 0, 10, 2.2 * K.ease.back(K.clamp((t - 83.72) / 0.3))); }
    return;
  }
  if (t < 91.38) { k14IconBowl(c, 0, -10, 1.2, t >= 89.7 ? K.ease.back(K.clamp((t - 89.7) / 0.3)) : 0); return; }
  if (t < 93.22) { const n = Math.min(7, Math.floor((t - 91.38) / 0.08) + 1); c.fillStyle = '#262633'; c.fillRect(-160, -110, 320, 220); k14Hairs(c, 0, 70, n, 2, { flash: t >= 92.1 && t < 92.9 ? Math.sin(Math.PI * (t - 92.1) / 0.8) : 0 }); return; }
  const k = t < 93.54 ? 0 : K.ease.back(K.clamp((t - 93.54) / 0.3));
  cat(c, { x: K.lerp(160, 30, k), y: 85, s: 0.75, dir: 1, tailUp: 1, tailHairs: 7, lid: Math.max(pulse(t, 94.0, 0.15), pulse(t, 94.3, 0.15)), eyes: 'open', tailCurl: 0.4 * Math.sin(t * 4) });
}
function k14JEyes(ctx, t, h, seed, a) { if (a <= 0) return; const b = blink(t, seed); ctx.save(); ctx.globalAlpha = a; for (const sd of [-1, 1]) { ctx.save(); ctx.beginPath(); ctx.ellipse(h[0] + sd * 13, h[1] - 4, 9, 11 * (1 - b * 0.95), 0, 0, 7); ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(h[0] + sd * 13 + 3, h[1] - 3, 3.5 * (1 - b), 0, 7); ctx.fill(); ctx.restore(); } ctx.restore(); }

// the kind man in the shaft
function k14GMWell(t) {
  const P = k14GM(t, { x: 680, y: K14_FLOOR, s: 0.85, dir: -1, mouth: 'closed' });
  if (t < 66.22) { P.lie = 1; P.x = 700; P.lid = t < 65.74 ? 1 : 0; if (t >= 65.74 && t < 66.0) { P.wink = 'L'; P.lid = 0; } P.noBlink = t < 66.0; if (t >= 65.9) P.gaze = [Math.cos(t * 12), Math.sin(t * 12)]; return P; }
  if (t < 67.06) { const u = K.clamp((t - 66.22) / 0.3); P.lie = 1 - u; P.sit = u; P.seat = 'floor'; P.x = K.lerp(700, 680, u);
    if (t >= 66.4) P.handR = t < 66.6 ? [20, -226] : t < 66.8 ? PERSON_HANDS.chest.R : [-20, -110]; P.mouth = t > 66.5 ? 'smile' : 'o'; return P; }
  if (t < 68.2) { P.sit = 1 - K.clamp((t - 67.06) / 0.25); P.seat = 'floor'; P.gaze = [0, -1]; P.x = kfn(t, [[67.2, 680], [67.4, 600]]);
    const up = kfn(t, [[67.4, 0], [67.7, 70], [67.78, 70], [67.98, 0]]); P.y = K14_FLOOR - up; if (t >= 67.4 && t < 67.98) { P.handLW = [566, P.y - 210]; P.aR = K14_UP.aR; } P.sq = landSquash(t, 67.98, 0.14); P.mouth = t > 67.8 ? 'frown' : 'closed'; return P; }
  if (t < 72.8) { P.x = 640; P.sit = K.clamp((t - 68.2) / 0.3); P.seat = 'floor'; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.sq = breathe(t, 3, 0.02); P.lid = 0.5 * pulse(t, 68.7, 0.7) + 0.2;
    if (t >= 69.44) { P.sq = settleTo(t, 69.44, 1.08, 1, 0.3); P.eyes = 'wide'; P.gaze = [-1, 0]; P.lid = 0; P.noBlink = true; P.mouth = 'o'; if (t >= 69.8) { P.handR = PERSON_HANDS.cupEar.R; P.handL = undefined; } } return P; }
  // ear to the stones, finger on his lips
  P.x = kfn(t, [[72.8, 640], [73.2, 606]]); P.sit = 1 - K.clamp((t - 72.8) / 0.25); P.seat = 'floor'; P.tip = -0.07; P.handR = PERSON_HANDS.hush.R; P.gaze = [-1, 0.1]; P.noBlink = t > 84.38;
  if (t >= 75.5 && t < 76.6) { P.handL = PERSON_HANDS.mouthCover.L; P.handR = PERSON_HANDS.mouthCover.R; P.eyes = 'wide'; P.sq = 0.94; }
  if (t >= 76.6) P.handR = PERSON_HANDS.cupEar.R;
  if (t >= 83.18) P.tip = -0.12;
  if (t >= 84.38) P.gaze = [-1, 0.15 * Math.sin(t * 1.7)];
  return P;
}
function k14S10(ctx, t) {
  const u = kfn(t, [[68.2, 0.32], [69.4, 0.76]]);
  k14Shaft(ctx, t, { u });
  const P = k14GMWell(t); k14Act(ctx, P, t, 1, null);
  if (t < 65.95) { const h = [P.x - 120, K14_FLOOR - 40]; dizzy(ctx, h[0], h[1] - 30, t, 50); }
  if (t >= 67.8) for (const k of [0, 1]) seg(ctx, 566 + k * 10, 1030, 568 + k * 10, 1110, 2, C.white, 0);
  if (t >= 69.44 && t < 70.6) soundArcs(ctx, 575, 1080, 1, t);
  const a = K.clamp((t - 70.22) / 0.3), hA = k14Head(k14JA(t)), hB = k14Head(k14JB(t));
  k14JEyes(ctx, t, hA, 71, a); k14JEyes(ctx, t + 1.3, hB, 72, K.clamp((t - 70.5) / 0.3));
  if (t >= 71.74) { k14Squiggle(ctx, hA[0], hA[1] - 90, hA[0], hA[1] - 30, inI(t, [[71.74, 72.1], [72.45, 72.8]]) ? 1 : 0); k14Squiggle(ctx, hB[0] + 20, hB[1] - 100, hB[0], hB[1] - 30, inI(t, [[72.1, 72.45]]) ? 1 : 0); }
}
function k14JinnGaze(t) {
  const bal = [330, 720], A = k14JA(t), B = k14JB(t), hA = k14Head(A), hB = k14Head(B);
  const balloonOn = inI(t, [[77.48, 83.18], [89.18, 94.72]]);
  let gA = balloonOn && Math.sin(t * 1.3) > 0.2 ? bal : hB, gB = balloonOn ? bal : hA;
  if (t >= 87.5 && t < 88.5) gB = gazePlan(t, [[87.5, [0, hB[1]]], [87.85, [1000, hB[1]]], [88.2, hA]], 0.07);
  return [gA, gB];
}
function k14S11(ctx, t) {
  k14Shaft(ctx, t, { u: 0.76 });
  const cave = K.ease.out(K.clamp((t - 73.78) / 0.9)), [gA, gB] = k14JinnGaze(t);
  k14Cavern(ctx, t, cave, (c) => { k14Act(c, k14JB(t), t, 72, gB); k14Act(c, k14JA(t), t, 71, gA); });
  if (t < 74.7) { const a = K.clamp((74.7 - t) / 0.9); k14JEyes(ctx, t, k14Head(k14JA(t)), 71, a); k14JEyes(ctx, t + 1.3, k14Head(k14JB(t)), 72, a); }
  k14Act(ctx, k14GMWell(t), t, 1, null);
  const hA = k14Head(k14JA(t)), bp = t < 77.48 ? 0 : K14B(t, 77.48, 0.35) * K.clamp((85.8 - t) / 0.2);
  k14Balloon(ctx, 330, 720, 300, 210, hA[0] + 20, hA[1] - 50, bp, (c) => k14Gossip(c, t));
}
function k14S12(ctx, t) {
  k14Shaft(ctx, t, { u: 0.76 });
  const [gA, gB] = k14JinnGaze(t), lit = t < 97.55 ? 1 : K.clamp(1 - (t - 97.55) / 0.3);
  k14Cavern(ctx, t, 1, (c) => { k14Act(c, k14JB(t), t, 72, gB); k14Act(c, k14JA(t), t, 71, gA); }, { lit });
  // the man: listening, then (close shot) counting and storing the cure in his turban
  const P = k14GMWell(t);
  if (t >= 94.72) { P.handR = [20 + 6 * Math.sin(t * 10), -150]; P.handL = undefined; P.talk = 0.35 * talk(t, [[94.8, 96.1]]); P.gaze = [-0.5, -0.85]; P.brow = 0.3; P.tip = 0; P.drop = 4 * pulse(t, 95.3, 0.3) + 4 * pulse(t, 95.8, 0.3); P.noBlink = false; P.mouth = 'closed'; }
  if (t >= 96.3) { P.handR = undefined; P.gaze = [0, -1]; P.drop = 4 * (pulse(t, 96.55, 0.2) + pulse(t, 96.85, 0.2) + pulse(t, 97.15, 0.2)); }
  if (t >= 97.42) { P.handR = [12, -232 + 10 * Math.abs(Math.sin((t - 97.42) * 12))]; P.drop = 5 * pulse(t, 97.9, 0.3); P.gaze = [0.2, 0.1]; P.lid = pulse(t, 97.75, 0.2); P.mouth = 'closed'; P.brow = 0.2; }
  k14Act(ctx, P, t, 1, null);
  if (t >= 96.3) { const h = k14Head(P); [['7', -55, 96.55], ['hair', 0, 96.85], ['cat', 55, 97.15]].forEach(([k, dx, td], i) => {
    const pin = K.ease.back(K.clamp((t - 96.3 - i * 0.08) / 0.2)), dropU = K.clamp((t - td) / 0.25); if (dropU >= 1) return;
    const x = h[0] + dx * (1 - dropU), y = h[1] - 120 + 70 * dropU; ctx.save(); ctx.globalAlpha = 1 - dropU * 0.6;
    if (k === '7') sfx(ctx, '7', x, y, 48 * pin, 1); else if (k === 'hair') k14Hairs(ctx, x, y + 26, 7, 0.5 * pin); else cat(ctx, { x: x + 12, y: y + 26, s: 0.25 * pin, silhouette: true, tailUp: 1 }); ctx.restore(); }); }
  const hA = k14Head(k14JA(t)), bp = t < 89.18 ? 0 : K14B(t, 89.18, 0.35) * K.clamp((94.72 - t) / 0.01);
  k14Balloon(ctx, 330, 720, 300, 210, hA[0] + 20, hA[1] - 50, bp, (c) => k14Gossip(c, t));
}
function k14WellOver(ctx, t, cam, S) {
  k14Label(ctx, S, t, 'ALIVE!', 680, 960, cam, 66.4, 67.7); if (t >= 66.5 && t < 67.7) k14Tick(ctx, ...k14P(800, 950, cam), K.ease.back(K.clamp((t - 66.5) / 0.3)));
  k14Label(ctx, S, t, 'JINN', 300, 600, cam, 75.38, 77.4); k14Arrow(ctx, S, t, [300, 630], [260, 980], cam, 75.42, 77.4, { bend: 0.1 });
  k14Arrow(ctx, S, t, [470, 960], [538, 1050], cam, 87.5, 88.6, { width: 12, bend: -0.2, color: C.yellow });
  if (t >= 90.74 && t < 92.4) { const [x, y] = k14P(110, 930, cam); ctx.save(); ctx.globalAlpha = K.clamp((92.4 - t) / 0.2); S.counter(ctx, 7, x, y, K14B(t, 90.74, 0.35), { size: 100 }); ctx.restore(); }
}
