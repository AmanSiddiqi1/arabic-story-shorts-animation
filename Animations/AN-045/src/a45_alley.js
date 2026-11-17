// ===== AN-045: the alley (S7 the rags, S8 the rich wrapping) =====
const A45_CR = [500, 820], A45_BAR = [660, 790];
function a45SetAlley(ctx, t) { marketStreet(ctx, { alley: true, u: 0.22, t }); }
const A45_TX7 = (t) => kfn(t, [[63.4, 1120], [64.7, 400]], 'out');
// the alley monkey: bounds in, sits on the barrel (facing the thief, dir -1)
function a45Monkey7(t) {
  const M = a45MonkeyBase({ x: A45_BAR[0], y: A45_BAR[1], dir: -1, gaze: [-0.8, 0.3], ph: t * 2 });
  if (t < 65.7) { const u = A45B(t, 64.9, 0.8, 'lin'); M.x = K.lerp(1100, A45_BAR[0], u); const b = ((t - 64.9) % 0.27) / 0.27; M.lift = t < 64.9 ? 0 : (u < 0.7 ? 50 * Math.sin(Math.PI * b) : 0);
    if (u >= 0.7) { const f = K.clamp((u - 0.7) / 0.3); M.y = K.lerp(900, A45_BAR[1], f) - 60 * Math.sin(Math.PI * f); } else M.y = 900; M.sq = 1.08; return M; }
  M.sq = landSquash(t, 65.7, 0.15);
  return M;
}
function a45S7(ctx, t, cam) {
  a45SetAlley(ctx, t);
  const W = walk(A45_TX7, t, { stride: A45_ST }), tx = A45_TX7(t), T = a45Thief({ ...W, seed: 11, gaze: [0.9, 0], mouth: 'closed' });
  const M = a45Monkey7(t); let B = null;   // {x, y, s, open, sq, held}
  if (t < 65.7) { T.handLW = [tx - 40, 800]; B = { x: tx - 52, y: 850, s: 0.75, front: true }; T.gaze = (t > 63.9 && t < 64.15) || (t > 64.35 && t < 64.6) ? [1, -0.1] : [-0.8, 0]; T.tilt = (t > 63.9 && t < 64.15) || (t > 64.35 && t < 64.6) ? 0.1 : 0; }
  if (t >= 65.7 && t < 66.6) { const u = A45B(t, 65.72, 0.3); B = { x: tx + 30, y: K.lerp(840, 640, u), s: 0.75, front: true }; T.handLW = [tx - 10, B.y - 30]; T.handRW = [tx + 70, B.y - 30]; T.mouth = 'smile'; T.eyes = 'wide'; T.lid = null; T.brow = -0.7; T.gaze = lookAt(a45Eye(T), [B.x, B.y - 60]); M.gaze = lookAt([M.x, M.y - 100], [B.x, B.y - 60]); }
  if (t >= 66.6 && t < 68.4) { const u = A45B(t, 66.6, 0.3); B = { x: tx + 8, y: K.lerp(640, 850, u), s: 0.75, front: true }; T.handLW = [tx - 40, 790]; T.handRW = [tx + 52, 790];
    T.gaze = t < 67.12 ? [0.3, 0.2] : look(t, a45Eye(T), [[67.12, [100, 650]], [67.28, [900, 650]], [67.44, [500, 250]]], 0.07); T.tilt = t >= 67.12 && t < 67.6 ? (t < 67.28 ? -0.08 : t < 67.44 ? 0.08 : 0) : 0;
    if (t >= 67.64) { T.sq = 1 - 0.03 * pulse(t, 67.7, 0.6); T.drop = 5 * A45B(t, 67.7, 0.4); T.gaze = [0.2, 0.3]; } }
  if (t >= 68.4) { if (t < 68.75) { const u = A45B(t, 68.4, 0.35); B = { x: K.lerp(tx + 8, A45_CR[0], u), y: K.lerp(850, A45_CR[1] + 2, u) - 30 * Math.sin(Math.PI * u), s: 0.75, front: true }; T.handRW = [B.x, B.y - 60]; T.handLW = [B.x - 50, B.y - 40]; }
    else { B = { x: A45_CR[0], y: A45_CR[1] + 2, s: 0.75, sq: impactSquash(t, 68.75, 0.88) }; if (t < 69.12) { const c = Math.sin((t - 68.75) * 30); T.handL = [-8 + c * 8, -130]; T.handR = [8 - c * 8, -130 + c * 4]; T.mouth = 'smile'; T.drop = -4; } }
    T.gaze = lookAt(a45Eye(T), [A45_CR[0], A45_CR[1] - 40]); M.gaze = lookAt([M.x, M.y - 100], [A45_CR[0], A45_CR[1] - 40]); }
  if (t >= 69.12) { B.open = A45B(t, 69.12, 0.95, 'lin'); B.sq = 1; if (t < 70.1) { T.handRW = [A45_CR[0] - 10 + 30 * Math.sin((t - 69.12) * 12), 760]; T.handLW = [A45_CR[0] - 50, 780]; } }
  if (t >= 70.14 && t < 70.86) { T.tip = 0.14 * A45B(t, 70.14, 0.3); T.brow = -0.8; T.mouth = 'o'; T.eyes = 'wide'; T.lid = null; T.handL = [-40, -100]; T.handR = [40, -100]; M.tip = 0.2 * A45B(t, 70.14, 0.3); M.mouth = 'o'; }
  let shirt = null;
  if (t >= 70.86) { const eye = [tx + 16, 900 - 199 * 1.25 + 1.5], up = A45B(t, 70.86, 0.3), down = A45B(t, 71.52, 0.3, 'in');
    const hole = [A45_HOLE[0] * 0.8, A45_HOLE[1] * 0.8], held = [eye[0] - hole[0], eye[1] - hole[1]], heap = [A45_CR[0] - 4, A45_CR[1] - 50];
    shirt = [K.lerp(K.lerp(heap[0], held[0], up), heap[0], down), K.lerp(K.lerp(heap[1], held[1], up), heap[1], down)]; B.shirt = false;
    T.handRW = [shirt[0] + 22, shirt[1] - 54]; T.gaze = [1, 0];
    if (t >= 71.52) { const f = A45B(t, 71.52, 0.35); T.mouth = 'frown'; T.brow = -0.6; T.lid = 0.3; T.drop = settleTo(t, 71.52, 0, 10, 0.4, 0.2); T.sq = 1 - 0.04 * f; T.gaze = lookAt(a45Eye(T), [A45_CR[0], A45_CR[1] - 40]); T.handRW = t < 71.85 ? T.handRW : null; T.handL = [-28, -80]; T.handR = t < 71.85 ? null : [28, -80];
      M.handL = [-6, -150]; M.handR = [22, -150]; M.mouth = 'frown'; M.tip = 0; } }
  if (T.lid != null && T.lid < 0.9) a45Lid(T, t, 11);
  if (B && !B.front) a45Bundle(ctx, B.x, B.y, { s: B.s, open: B.open || 0, sq: B.sq, contents: 'rags', shirt: B.shirt !== false });
  a45Draw(ctx, T); a45Monkey(ctx, M);
  if (B && B.front) { a45Bundle(ctx, B.x, B.y, { s: B.s }); if (t >= 65.7) { a45Hand(ctx, T.handLW[0], T.handLW[1]); a45Hand(ctx, T.handRW[0], T.handRW[1]); } }
  if (shirt) { const look = t < 71.52; a45Shirt(ctx, shirt[0], shirt[1], 0.8, { eye: look && t > 71.0 ? [1, 0] : null, sway: Math.sin(t * 6) * 0.3 }); if (t < 71.85) a45Hand(ctx, shirt[0] + 22, shirt[1] - 54); }
  a45Moth(ctx, A45_CR[0], A45_CR[1] - 150, t, 70.95, 1.4, 2);
  // a leaf drifting across the empty alley
  if (a45In(t, 67.6, 69.4)) { const u = (t - 67.6) / 1.8, lx = 820 - 520 * u, ly = 380 + 420 * u + Math.sin(u * 12) * 20; ctx.save(); ctx.translate(lx, ly); ctx.rotate(Math.sin(u * 9)); shape(ctx, ell(0, 0, 16, 7, 12), '#c98a3a', { lw: 3, seed: 93 }); ctx.restore(); }
  return { T, M };
}
function a45O7(ctx, t, P, S, r, L) { if (a45In(t, 71.6, 72.9)) L.word('RAGS!?', 560, 300, 71.6, 72.9, 96, { rot: -0.08, fill: C.red }); }

// ---------- S8 (72.1-84.6): the idea, the rich cloth, the fake ----------
function a45S8(ctx, t, cam) {
  a45SetAlley(ctx, t);
  const tx = 400, T = a45Thief({ x: tx, seed: 11, gaze: lookAt([tx, 650], [500, 800]), mouth: 'frown', brow: -0.6, lid: 0.3, drop: 10 });
  const M = a45MonkeyBase({ x: A45_BAR[0], y: A45_BAR[1], dir: -1, handL: [-6, -150], handR: [22, -150], mouth: 'frown', gaze: [-0.6, 0.4] });
  let heap = true, drape = 0, rich = null, polish = 0;
  if (t < 72.94) { T.drop = 10 - 10 * A45B(t, 72.3, 0.4); T.handR = PERSON_HANDS.chin.R; T.gaze = look(t, a45Eye(T), [[72.1, [500, 800]], [72.35, [250, 400]], [72.55, [600, 380]], [72.75, [420, 300]]], 0.07);
    if (t > 72.75) { T.brow = -0.8; T.mouth = 'smile'; T.lid = 0.3; } }
  if (t >= 72.94 && t < 74.48) { const c = Math.sin((t - 72.94) * 10); T.handLW = [470 + c * 20, 790]; T.handRW = [530 - c * 20, 790]; T.drop = 0; T.mouth = 'closed'; T.brow = -0.4; T.tip = 0.06; T.gaze = lookAt([tx, 650], [500, 790]); }
  if (t >= 74.3 && t < 75.2) { T.sq = anticipate(t, 74.3, 0.18, 0.06); T.drop = 0; const u = A45B(t, 74.48, 0.6); T.handRW = [K.lerp(tx + 10, tx + 90, u), K.lerp(760, 560, u)]; T.handL = [-28, -80]; T.mouth = 'smile'; T.gaze = lookAt([tx, 650], T.handRW); }
  if (t >= 75.2) { drape = A45B(t, 75.2, 0.27, 'out'); T.handR = [40, -110]; T.handL = [-28, -80]; T.mouth = 'smile'; T.gaze = lookAt([tx, 650], [500, 860]); T.lid = 0.2; T.brow = -0.6; }
  if (t >= 75.72) { M.handL = [-30, -80]; M.handR = t > 75.95 && t < 76.5 ? [96 + 10 * Math.sin(t * 14), -60] : [30, -80]; M.mouth = 'o'; M.eyes = 'wide'; M.gaze = lookAt([M.x, 690], [560, 860]); M.tip = t > 75.95 && t < 76.5 ? 0.15 : 0; }
  if (t >= 76.42 && t < 77.4) { T.tilt = 0.1; T.drop = 0; }
  if (t >= 77.4 && t < 78.6) { T.handR = [24 + 5 * Math.sin(t * 30), -130]; T.gaze = lookAt([tx, 650], [250, 560]); T.mouth = 'smile'; }
  if (t >= 78.78) { drape = 0; heap = false; const op = 1 - A45B(t, 78.78, 0.95, 'lin'); rich = { open: op, sq: t >= 79.82 ? impactSquash(t, 79.82, 0.86) : 1, tassel: swing(t, 79.82, 0.6, 1.6, 2.5) + swing(t, 81.54, 0.25, 1.6, 3), glint: K.clamp((t - 79.9) / 0.6) * (t < 80.5 ? 1 : 0) };
    T.handLW = op > 0 ? [440, 780 - 20 * Math.sin(t * 9)] : null; T.handRW = op > 0 ? [560, 780 - 20 * Math.cos(t * 9)] : null; T.gaze = lookAt([tx, 650], [500, 780]); T.tip = 0.06; }
  if (t >= 79.82) { T.handLW = null; T.handRW = null; T.handL = PERSON_HANDS.palmsUp.L; T.handR = [70, -110]; T.tip = 0; T.mouth = 'smile'; M.gaze = lookAt([M.x, 690], [500, 760]); M.mouth = 'smile'; M.eyes = null; M.tip = 0; }
  if (t >= 81.54 && t < 83.2) { polish = 1; T.handRW = [480 + 30 * Math.sin((t - 81.54) * 12), 770]; T.handR = null; T.lid = 0.5; T.sq = 1.03; T.tip = 0.04; T.mouth = 'smile'; if (t > 82.3) { T.handRW = [500, 740 - 10 * Math.abs(Math.sin((t - 82.3) * 12))]; } }
  if (t >= 83.2) { T.handRW = null; T.handR = [30, -100]; T.handL = [-30, -100]; T.tip = 0; T.sq = 1.03; T.gaze = [0, 0.05]; T.lid = 0.3; if (t >= 83.38 && t < 84.0) T.wink = 'R'; T.mouth = 'smile';
    M.handL = [20, -100]; M.handR = [-10, -104]; M.mouth = 'smirk'; M.lid = 0.4; M.gaze = [0, 0.1]; M.dir = 1; M.x = A45_BAR[0]; }
  if (T.lid < 0.9 && !T.wink) a45Lid(T, t, 11);
  // the old plain cloth flies off to the ground
  const fl = A45B(t, 73.2, 0.5, 'lin'); if (t >= 73.2) { const x = K.lerp(500, 220, fl), y = K.lerp(820, 900, fl) - 120 * Math.sin(Math.PI * fl); a45ClothFill(ctx, [[x - 60, y], [x - 30, y - 16 + 30 * (1 - fl)], [x + 40, y - 12], [x + 60, y]], 'plain', 1); }
  if (heap) a45Rags(ctx, A45_CR[0], A45_CR[1] + 2, t < 72.94 ? 0.75 : 0.7, { shirt: true });
  if (t < 72.94) a45Bundle(ctx, A45_CR[0], A45_CR[1] + 2, { s: 0.75, open: 1, contents: 'none' });
  if (rich) a45Bundle(ctx, A45_CR[0], A45_CR[1] + 2, { s: 0.85, wrap: 'rich', open: rich.open, sq: rich.sq, tassel: rich.tassel, glint: rich.glint, contents: 'rags' });
  a45RichDrape(ctx, 410, 590, A45_CR[1], 74, drape, t);
  if (t >= 76.42 && t < 77.3) for (let i = 0; i < 3; i++) { const u = K.clamp((t - 76.42 - i * 0.25) / 0.35); if (u > 0 && u < 1) star(ctx, 440 + i * 60, 850 + (i % 2) * 14, 18 * Math.sin(Math.PI * u), C.white, u * 3); }
  a45Draw(ctx, T); a45Monkey(ctx, M);
  if (t >= 74.48 && t < 75.2) { const h = T.handRW; shape(ctx, K.rectPts(h[0] - 26, h[1] - 30, 52, 40), C.red, { lw: 4, seed: 94, dot: C.yellow, pitch: 8, rad: 0.3, da: 0.7 }); }
  if (polish) a45Hand(ctx, T.handRW[0], T.handRW[1]);
  if (t >= 72.5 && t < 73.4) { const h = a45Head(T); bulb(ctx, h[0] + 80, h[1] - 90, K.clamp((t - 72.5) / 0.3)); }
  // the round cutaway on the bundle: the same rags inside
  if (t >= 80.58 && t < 83.4) { const p = t < 83.2 ? K.clamp((t - 80.58) / 0.2) : 1 - K.clamp((t - 83.2) / 0.2); a45Inset(ctx, 500, 770, 92, p, (c) => { c.fillStyle = '#3a2a1a'; c.fillRect(380, 650, 240, 240); a45Rags(c, 500, 830, 0.85, { shirt: true }); }); }
  return { T, M };
}
function a45O8(ctx, t, P, S, r, L) {
  if (a45In(t, 77.4, 78.7)) { const c = P(250, 600); a45CoinPile(ctx, c[0], c[1], 6, 1.3); L.arr([c[0] + 70, c[1] - 10], [c[0] + 70, c[1] - 120], 77.5, 78.7, { width: 16, bend: 0 }); }
  if (a45In(t, 79.82, 83.2)) { const b = P(430, 700); L.lab('OUTSIDE: FANCY', b[0] - 90, 250, 79.82, 83.2, { size: 46 }); L.arr([b[0] - 120, 290], [b[0] - 10, b[1] - 10], 79.9, 83.2, { width: 16, bend: 0.2 }); }
  if (a45In(t, 80.7, 83.2)) { const b = P(590, 770); L.lab('INSIDE: RAGS', 770, 1000, 80.7, 83.2, { size: 46, fill: C.yellow }); L.arr([760, 960], [b[0] + 10, b[1] + 20], 80.8, 83.2, { width: 16, bend: -0.2 }); }
}
