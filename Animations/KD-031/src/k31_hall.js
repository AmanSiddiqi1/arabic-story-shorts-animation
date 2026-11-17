// ===== KD-031 S15: the king's hall (the man tells his story, offers the gold to the treasury, the king gives it back) =====
const K31HALL = { dais: [620, 900, 860], throne: 760, vault: { x0: 80, x1: 230, top: 560, open: 0 }, door: false };
function k31drawHall(ctx, t) {
  const A = palaceHall(ctx, { ...K31HALL, t, light: 0.8 });
  // the king
  const rise = k31e(t, 160.54, 0.6), down = k31e(t, 161.0, 0.4);
  const K2 = { ...K31KING, x: K.lerp(760, K.lerp(735, 690, down), rise), y: K.lerp(A.throne.sitY, K.lerp(860, 900, down), rise) - 14 * pulse(t, 161.0, 0.4), dir: -1, sit: 1 - rise, seat: 'bench', mouth: 'smile', brow: -0.2, lid: Math.max(0.2, blink(t, 13)) };
  K2.sq = anticipate(t, 160.3, 0.24, 0.07);
  K2.handL = [-40, -86]; K2.handR = [40, -86];
  // the man
  const walkX = (tt) => k31kv(tt, [[150.5, 360], [155.56, 360], [156.5, 520]]), M = k31man({ ...walk(walkX, t, { stride: 26 }), dir: 1, seed: 11 });
  M.handL = PERSON_HANDS.clasp.L; M.handR = PERSON_HANDS.clasp.R; M.mouth = 'closed'; M.gaze = lookAt(k31head(M), k31head(K2));
  let jar = { x: 450, y: 900, lid: true, s: 0.7 }, lid = null;
  if (t >= 151.94 && t < 155.56) { const o = Math.abs(Math.sin(t * 2.1)); M.handL = [-60 - 10 * o, -110]; M.handR = [60 + 10 * o, -110]; M.talk = 0.7 * Math.abs(Math.sin(t * 11)) * (Math.sin(t * 1.7) > -0.5 ? 1 : 0.2); }
  if (t >= 155.56) { const lift = k31e(t, 155.56, 0.3), set = k31e(t, 156.5, 0.35); M.kneel = 0.6 * k31e(t, 156.45, 0.4); M.sq = anticipate(t, 155.4, 0.2, 0.06) * (t < 156.5 ? 0.97 : 1);
    const carry = k31L2W(M, [32, -62]); jar = { x: K.lerp(K.lerp(450, carry[0], lift), 600, set), y: K.lerp(K.lerp(900, carry[1], lift), 900, set), lid: true, s: 0.7 };
    M.handL = k31W2L(M, [jar.x - 44, jar.y - 64]); M.handR = k31W2L(M, [jar.x + 44, jar.y - 64]); M.gaze = [0.3, 0.6]; }
  if (t >= 156.98) { jar.x = 600 + 20 * k31e(t, 156.98, 0.35); M.tip = 0.12 * k31e(t, 156.98, 0.3); M.lid = Math.max(0.6, blink(t, 4)); M.drop = 6; M.handL = k31W2L(M, [jar.x - 44, 860]); M.handR = k31W2L(M, [jar.x + 44, 860]); }
  if (t >= 157.42) { const u = k31e(t, 157.42, 0.4); jar.lid = false; lid = [K.lerp(jar.x, 560, u), K.lerp(jar.y - 110, 900, u)]; M.handR = k31W2L(M, [lid[0] + 10, lid[1] - 20]); M.handL = [-40, -96]; M.lid = blink(t, 4); M.drop = 0; M.tip = 0.06; }
  if (t >= 158.32 && t < 159.72) { M.handL = [-100, -150]; M.handR = [40, -96]; M.gaze = t < 158.9 ? [-1, -0.2] : lookAt(k31head(M), k31head(K2)); M.talk = t > 158.9 ? 0.5 * Math.abs(Math.sin(t * 10)) : 0; M.tip = 0; }
  if (t >= 159.72) { M.handL = PERSON_HANDS.clasp.L; M.handR = PERSON_HANDS.clasp.R; M.gaze = lookAt(k31head(M), k31head(K2)); M.tip = 0; }
  if (t >= 162.04) { const back = k31e(t, 162.2, 0.4); jar.x = K.lerp(620, 550, back); jar.tilt = 0.08 * swing(t, 162.6, 1, 2.2, 4); jar.lid = t > 162.15; lid = t > 162.15 ? null : lid; }
  if (t >= 164.28) { M.handR = PERSON_HANDS.chest.R; M.handL = [-40, -96]; M.wet = true; M.brow = -0.6; M.mouth = t < 164.55 ? 'o' : 'smile'; M.drop = -4; M.lid = Math.max(blink(t, 4), k31long(t, 164.4, 0.3)); }
  // the king's acting
  K2.gaze = lookAt(k31head(K2), k31head(M));
  if (t >= 152.78 && t < 154.54) K2.gaze = lookAt(k31head(K2), [380, 380]);
  if (t >= 153.38 && t < 154.54) { K2.handR = PERSON_HANDS.chin.R; K2.brow = -0.5; K2.tilt = 0.06; }
  if (t >= 154.54 && t < 159.72) { K2.gaze = lookAt(k31head(K2), [jar.x, jar.y - 60]); K2.drop = -4 * k31e(t, 154.54, 0.3); }
  if (t >= 157.42 && t < 159.72) { K2.eyes = t < 158.0 ? 'wide' : 'open'; K2.mouth = t < 158.0 ? 'o' : 'smile'; }
  if (t >= 158.32 && t < 159.72) K2.gaze = lookAt(k31head(K2), [150, 650]);
  if (t >= 159.72) { K2.handR = k31kv(t, [[159.72, [40, -86]], [160.1, [64, -170]]]); K2.gaze = lookAt(k31head(K2), k31head(M)); K2.brow = -0.2; }
  if (t >= 161.16) { K2.tip = 0.1 * k31e(t, 161.16, 0.4); K2.mouth = 'smile'; K2.handR = [40, -86]; }
  if (t >= 162.04 && t < 163.5) { K2.tip = 0.16; K2.handR = k31W2L(K2, [K.lerp(620, 550, k31e(t, 162.2, 0.4)) + 36, 850]); K2.handL = k31W2L(K2, [K.lerp(620, 550, k31e(t, 162.2, 0.4)) + 30, 820]); }
  if (t >= 163.5) { K2.tip = 0.06; K2.handR = PERSON_HANDS.pointFwd.R; K2.talk = t < 164.4 ? 0.7 * Math.abs(Math.sin(t * 11)) : 0; K2.drop = 6 * pulse(t, 163.9, 0.4); }
  if (t >= 162.04 && t < 163.5) K2.talk = 0.6 * Math.abs(Math.sin(t * 10));
  person(ctx, K2); person(ctx, M);
  if (lid) k31jarLid(ctx, lid[0], lid[1], 0.7, 0.2);
  k31jar(ctx, jar.x, jar.y, jar.s, { lid: jar.lid, fill: jar.lid ? 0 : 1, tilt: jar.tilt || 0 });
  if (t >= 157.42 && t < 162.3) k31goldGlow(ctx, jar.x, jar.y - 110, 130, t, k31e(t, 157.42, 0.3) * (1 - k31e(t, 162.0, 0.3)));
  if (t >= 158.32 && t < 159.9) { const a = (t - 158.4) % 0.7; if (a < 0.4) star(ctx, 160, 700, 16 * Math.sin(Math.PI * a / 0.4), C.white); }
  return { man: M, king: K2 };
}
// the story balloon above the man: the cage, the two hoopoes, the jar with rays
function k31storyBalloon(ctx, t, man) {
  const p = k31fade(t, 152.78, 155.5, 0.3); if (p <= 0) return; const h = k31head(man);
  ctx.save(); ctx.globalAlpha *= p; bubble(ctx, 360, 390, 330, 180, h[0] + 10, h[1] - 40, K.clamp((t - 152.6) / 0.3), ''); ctx.restore();
  const pop = (a) => K.ease.back(K.clamp((t - a) / 0.3));
  ctx.save(); ctx.globalAlpha *= p;
  { const k = pop(152.78); if (k > 0) { ctx.save(); ctx.translate(255, 450); ctx.scale(k, k); k31cage(ctx, 0, 0, 0.42, 'back'); k31cage(ctx, 0, 0, 0.42, 'front'); ctx.restore(); } }
  { const k = pop(153.86); if (k > 0) { ctx.save(); ctx.translate(360, 440); ctx.scale(k, k); k31hoopoe(ctx, { x: -22, y: 0, s: 0.42, dir: 1, pal: 1, crest: 1, noBlink: true }); k31hoopoe(ctx, { x: 22, y: 0, s: 0.42, dir: -1, pal: 0, crest: 1, noBlink: true }); ctx.restore(); } }
  { const k = pop(154.54); if (k > 0) { ctx.save(); ctx.translate(462, 450); ctx.scale(k, k); k31goldGlow(ctx, 0, -60, 70, t, 1); k31jar(ctx, 0, 0, 0.42, { fill: 1 }); ctx.restore(); } }
  ctx.restore();
}
