// ===== AN-145 scenes S7-S11: the tiny tunnel, the find, the weighing, the realisation, the departure =====
// small-scale strike for the tunnel figures (s 0.24): tip lands at x + 52 * dir
function m5Tiny(ctx, W, r, bend = 0) { const ang = m5StrikePose(W, r); person(ctx, W); m5Pick(ctx, ...m5Hand(W, 'R'), ang, W.s, bend); }
function m5Hoard(ctx, x, y, s, t, o = {}) { m5Glow(ctx, x, y - 40 * s, 120 * s, 0.5 * (o.glow ?? 1)); m5Mound(ctx, x + 70 * s, y, 110 * s, 1, { seed: 6 }); m5Chest(ctx, x - 20 * s, y, { s: s * 0.75, old: true, open: o.open || 0, fill: 1, jewels: true });
  if (o.glints) for (let i = 0; i < 4; i++) { const k = m5Pulse(t, o.glints + i * 0.22, 0.4); if (k > 0) star(ctx, x + (-40 + i * 40) * s, y - (60 + (i % 2) * 30) * s, 18 * s * k, C.white, t * 3); } }

// ---------- v2: the tunnel interior (close shots of S7 and S8), world 1000 x 1230 at camera zoom 1.0 ----------
// back wall of the passage y 500..1010, floor 1000..1230, end wall x 730..1010 (S8: it breaks and shows the hoard chamber)
const M5_TUN = { top: 500, floor: 1040, end: 730 };
function m5TunBack(c) {
  c.fillStyle = '#6a4420'; c.fillRect(0, 0, 1000, 1230); c.fillStyle = dotPat(c, '#1b1430', 9, 0.3); c.globalAlpha = 0.55; c.fillRect(0, 0, 1000, 1230); c.globalAlpha = 1;
  c.save(); c.lineWidth = 4; c.strokeStyle = 'rgba(20,12,6,0.7)'; for (let y = 0, k = 0; y < 520; y += 110, k++) { c.beginPath(); c.moveTo(0, y); c.lineTo(1000, y); c.stroke(); for (let x = (k % 2) * 90; x < 1000; x += 180) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 110); c.stroke(); } } c.restore();
  const r = K.rng(21), top = [[-10, 1010]]; for (let x = -10; x <= 1010; x += 40) top.push([x, M5_TUN.top + (r() - 0.5) * 30]); top.push([1010, 1010]);
  shape(c, top, '#3a2614', { lw: 8, seed: 801, dot: '#1b1430', pitch: 9, rad: 0.28, da: 0.5 });
  c.save(); K.poly(c, top, true); c.clip(); c.lineWidth = 3; c.strokeStyle = 'rgba(10,6,4,0.6)'; for (let y = 600, k = 0; y < 1010; y += 120, k++) { c.beginPath(); c.moveTo(0, y); c.lineTo(1000, y); c.stroke(); for (let x = (k % 2) * 100; x < 1000; x += 200) { c.beginPath(); c.moveTo(x, y - 120); c.lineTo(x, y); c.stroke(); } } c.restore();
  const fl = [[-10, 1240], [-10, M5_TUN.floor - 20], [1010, M5_TUN.floor - 30], [1010, 1240]]; shape(c, fl, '#8a5a2a', { lw: 8, seed: 802, dot: '#5b3010', pitch: 10, rad: 0.25, da: 0.5 });
  for (let i = 0; i < 14; i++) { const x = r() * 1000, y = M5_TUN.floor + 30 + r() * 150, z = 10 + r() * 18; shape(c, [[x - z, y], [x - z * 0.6, y - z], [x + z * 0.7, y - z * 0.8], [x + z, y]], i % 2 ? M5_STONED : '#a8741a', { lw: 3, seed: 803 + i }); }
}
// the end wall blocks: 2 columns x 4 rows; fall 0..1 tumbles them toward the floor (S8)
function m5EndWall(ctx, t, fall = 0, crack = 0, gone = 0) { if (gone >= 1) return; const x0 = M5_TUN.end, rows = 4, h = (M5_TUN.floor - 30 - M5_TUN.top) / rows;
  for (let rI = 0; rI < rows; rI++) for (let cI = 0; cI < 2; cI++) { const bx = x0 + cI * 150 + (rI % 2) * 30, by = M5_TUN.top + rI * h, w = 150, r = K.rng(rI * 7 + cI * 3 + 5);
    const f = K.clamp(fall * 1.6 - (rows - 1 - rI) * 0.1 - cI * 0.12), dx = 40 * f + 30 * r() * f, dy = (M5_TUN.floor - 40 - by - h) * f * f, rot = (r() - 0.3) * 0.9 * f;
    ctx.save(); ctx.globalAlpha *= 1 - gone; ctx.translate(bx + w / 2 + dx, by + h / 2 + dy); ctx.rotate(rot); ctx.scale(1 - 0.4 * gone, 1 - 0.4 * gone); shape(ctx, K.rectPts(-w / 2, -h / 2, w, h), '#7a5028', { lw: 6, seed: 810 + rI * 2 + cI, dot: '#3a2614', pitch: 9, rad: 0.25, da: 0.45 }); ctx.restore(); }
  if (crack > 0 && fall <= 0) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; const n = Math.round(crack * 5); const pts = [[x0 + 10, 760], [x0 + 60, 720], [x0 + 70, 800], [x0 + 140, 760], [x0 + 150, 840], [x0 + 220, 820]]; K.poly(ctx, pts.slice(0, n + 1)); ctx.stroke(); ctx.restore(); } }
// flat process-yellow light behind the figures: a solid disc with a ring of yellow dots (never drawn over the faces)
function m5Light(ctx, x, y, r, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r * 1.35, 0, 7); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.42); ctx.fillRect(x - 2 * r, y - 2 * r, 4 * r, 4 * r); ctx.restore();
  ctx.save(); ctx.globalAlpha = a * 0.9; ctx.fillStyle = '#f5b82a'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); }
function m5Tun(ctx, t) { ctx.drawImage(bake('m5tun', 1000, 1230, m5TunBack), 0, 0, 1000, 1230); }
// big hoard: red-and-yellow chest, coin heap, open 0..1
function m5BigHoard(ctx, t, o = {}) { const x = 865, y = M5_TUN.floor - 10, op = o.open || 0, sq = 1 + 0.08 * m5Pulse(t, 70.02, 0.25);
  if (o.rays > 0) { ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.08 + 0.84 * i / 8), l0 = 120, l1 = l0 + 170 * o.rays * (0.85 + 0.15 * Math.sin(t * 6 + i)); ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * l0, y - 90 + Math.sin(a) * l0); ctx.lineTo(x + Math.cos(a) * l1, y - 90 + Math.sin(a) * l1); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = C.yellow; ctx.stroke(); } ctx.restore(); }
  m5Mound(ctx, x - 100, y + 14, 200, 1, { seed: 11 }); m5Mound(ctx, x + 70, y + 20, 150, 0.8, { seed: 12 });
  m5Chest(ctx, x, y, { s: 1.25, sqy: sq, open: op, fill: 1, jewels: true, red: true });
  for (let i = 0; i < 3; i++) { const d = t - 70.1 - i * 0.12; if (d > 0) { const u = Math.min(1, d / 0.6), gx = x + (-90 + i * 90) * u, gy = y - 160 - 160 * Math.sin(Math.PI * u * 0.8) + 120 * u * u; m5Gem(ctx, gx, gy, 20, [C.red, C.blue, '#2f9a3e'][i]); } }
  if (o.glints) for (let i = 0; i < 4; i++) { const k = m5Pulse(t, o.glints + i * 0.22, 0.4); if (k > 0) star(ctx, x - 120 + i * 80, y - 150 - (i % 2) * 50, 26 * k, C.white, t * 3); } }

// ---------- S7 the cutaway (53.68 - 65.06): wide section with the tiny tunnel, then (61.2) the close interior ----------
function m5S7(ctx, t) {
  if (t >= 61.2) return m5S7close(ctx, t);
  const len = K.lerp(0.15, 1, M5B(t, 55.24, 1.2, 'out'));
  const xe = 109 + 260 * len, tf = [xe - 22 + 4 * Math.sin(t * 3), 818];
  m5Section(ctx, { t, u: 0.26, len, light: t > 56.44 ? { x: tf[0], y: tf[1], r: 40, a: 0.65 } : null });
  // the caliph waits outside at the mouth; inside only the torch flame shows at this scale
  const P = { ...M5_CAL, x: 40, y: 900, s: 0.3, dir: 1, handL: M5H.hipL, handR: M5H.hipR, gaze: [1, -0.3] }; person(ctx, P);
  if (t > 56.44) { ctx.save(); ctx.globalAlpha = M5B(t, 56.44, 0.4); m5Torch(ctx, tf[0], tf[1] + 22, t, { s: 0.3, ang: 0.1 }); ctx.restore(); }
}
function m5S7close(ctx, t) {
  m5Tun(ctx, t); m5EndWall(ctx, t);
  const sweep = K.clamp((t - 61.26) / 0.8), sw = K.ease.inOut(sweep), low = M5B(t, 62.06, 0.5);
  // the torch light travels over the bare wall from left to right, then shrinks as hope does
  const lx = t < 61.26 ? 300 : K.lerp(120, 900, sw), lr = 150 * (1 - 0.35 * low);
  const W3 = { ...M5_W3, x: 250, y: M5_TUN.floor, s: 1.4, dir: 1, brow: t > 61.26 ? -0.4 : 0 };
  W3.aR = [K.lerp(2.3, 2.6, sw) - 0.9 * low, K.lerp(2.0, 2.9, sw) - 0.9 * low]; W3.handL = t < 62.06 ? M5H.lowL : m5Tr(t, [[62.06, PERSON_HANDS.palmsUp.L, 0.3]]);
  W3.sq = 1 - 0.05 * low; W3.drop = 10 * low;
  const th = m5Hand(W3, 'R'), flame = [th[0] + Math.sin(-0.2 + 0.5 * sw) * 70 * 1.2, th[1] - 70 * 1.2];
  m5Light(ctx, lx, 760, lr, 0.95); if (t < 61.26) m5Light(ctx, flame[0], flame[1], 120, 0.9);
  const W1 = { ...M5_W1, x: 520, y: M5_TUN.floor, s: 1.4, dir: 1 };
  W3.gaze = lookAt(m5Head(W3), [lx, 760]); W1.gaze = lookAt(m5Head(W1), [lx, 760]);
  if (t > 62.06) { W3.mouth = 'frown'; W3.lid = 0.45; W3.gaze = [0.2, 0.7]; }
  m5Blink(W3, t, 41, W3.lid || 0); person(ctx, W3); m5Torch(ctx, ...th, t, { s: 1.2, ang: -0.2 + 0.5 * sw - 0.3 * low, light: 1 - 0.4 * low });
  if (t < 62.06) { W1.mouth = 'closed'; W1.brow = -0.3; m5Blink(W1, t, 31); const r = t < 61.26 ? 0.6 : K.lerp(0.6, 0.4, sw); const ang = m5StrikePose(W1, r); person(ctx, W1); m5Pick(ctx, ...m5Hand(W1, 'R'), ang, 1.4); }
  else { // palms up, shoulders drop, then he sits down on the floor
    const sit = M5B(t, 62.7, 0.5); Object.assign(W1, { handL: PERSON_HANDS.palmsUp.L, handR: PERSON_HANDS.palmsUp.R, mouth: 'frown', sq: 0.95, brow: 0.6, lid: 0.4, sit, seat: 'floor', gaze: t < 62.7 ? [-0.6, -0.3] : [0.1, 0.8] });
    if (sit > 0.5) { W1.handL = [-20, -90]; W1.handR = [24, -88]; } m5Blink(W1, t, 31, 0.4); person(ctx, W1);
    const u = M5B(t, 62.06, 0.35, 'in'); m5Pick(ctx, K.lerp(m5Hand({ ...W1, sit: 0 }, 'R')[0], 680, u), K.lerp(900, M5_TUN.floor + 10, u), K.lerp(-1.2, -0.1, u), 1.4); }
  // thought balloon: a heap of coins, struck out, deflating (about 340 px wide)
  if (m5In(t, 62.96, 64.6)) { const k = m5Pop(t, 62.96, 0.3) * (1 - M5B(t, 64.2, 0.4, 'in')); if (k > 0) { ctx.save(); ctx.translate(520, 330); ctx.scale(k * 4, k * 4); shape(ctx, ell(0, 0, 42, 30, 24), C.white, { lw: 2, seed: 740 }); [[0, 38], [2, 52]].forEach(([dx, dy], i) => shape(ctx, ell(dx, dy, 6 - i * 2, 6 - i * 2, 10), C.white, { lw: 1.5, seed: 741 })); m5Mound(ctx, 0, 14, 44, 1, { seed: 7 });
      const x = M5B(t, 63.3, 0.3); ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(-26, -20); ctx.lineTo(-26 + 52 * x, -20 + 40 * x); if (x >= 1) { ctx.moveTo(26, -20); ctx.lineTo(26 - 52 * M5B(t, 63.6, 0.25), -20 + 40 * M5B(t, 63.6, 0.25)); } ctx.stroke(); ctx.restore(); } }
}
function m5O7(ctx, t, cam, S, P) {
  if (m5In(t, 58.12, 59.95)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 58.12, 59.95, 0.2); const k = M5B(t, 58.12, 0.5); const br = (x0, x1, y, col) => { const a = P(x0, y), b = P(K.lerp(x0, x1, k), y); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1] - 14); ctx.lineTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0], b[1] - 14); ctx.stroke(); };
    br(60, 940, 950, C.white); br(100, 369, 930, C.red); ctx.restore(); }
  // v2: TINY! fades out before the push-in starts (59.86)
  if (m5In(t, 59.08, 59.86)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 59.08, 59.86, 0.2); const [x, y] = P(330, 1040); S.label(ctx, 'TINY!', x, y, M5B(t, 59.08, 0.35), { size: 60, align: 'center', fill: C.yellow }); S.arrow(ctx, [x - 40, y - 50], P(240, 860), M5B(t, 59.2, 0.4), { width: 16, bend: -0.2 }); ctx.restore(); }
}

// ---------- S8 the find (65.06 - 72.30): the tunnel interior, the end wall breaks on the swing ----------
function m5S8(ctx, t) {
  m5Tun(ctx, t);
  const fall = M5B(t, 66.68, 0.6, 'in'), gold = M5B(t, 66.7, 0.6), joy = t >= 71.06;
  // the chamber behind the end wall and its light (drawn behind everything in front)
  if (t > 66.6) { ctx.save(); ctx.beginPath(); ctx.rect(M5_TUN.end, M5_TUN.top, 300, M5_TUN.floor - 30 - M5_TUN.top); ctx.fillStyle = '#1a120a'; ctx.fill(); ctx.restore();
    m5Light(ctx, 860, 860, 120 + 110 * gold, gold); m5BigHoard(ctx, t, { open: M5B(t, 70.02, 0.2, 'out'), rays: M5B(t, 68.88, 0.6, 'out'), glints: 68.9 }); }
  m5EndWall(ctx, t, fall, t > 66.05 ? 1 : 0, M5B(t, 67.3, 0.5));
  if (t > 67.3) { const r = K.rng(66); ctx.save(); ctx.globalAlpha = M5B(t, 67.3, 0.4); for (let i = 0; i < 7; i++) { const x = 690 + r() * 90, z = 14 + r() * 16, y = M5_TUN.floor + 10 + r() * 40; shape(ctx, [[x - z, y], [x - z * 0.6, y - z], [x + z * 0.7, y - z * 0.8], [x + z, y]], '#7a5028', { lw: 3, seed: 830 + i }); } ctx.restore(); }
  // w3 with the torch; its light sits behind him
  const W3 = { ...M5_W3, x: 230, y: M5_TUN.floor, s: 1.4, dir: 1, handL: M5H.lowL, mouth: t > 66.9 ? 'o' : 'closed', brow: t > 66.9 ? -0.8 : 0, eyes: m5In(t, 66.7, 68.9) ? 'wide' : undefined };
  W3.aR = joy ? [K.lerp(2.2, 3.0, M5B(t, 71.06, 0.3)), K.lerp(2.3, 3.1, M5B(t, 71.06, 0.3))] : [2.2, 2.3]; if (t > 68.88 && !joy) W3.mouth = 'smile';
  if (joy) { W3.mouth = 'smile'; W3.eyes = 'wide'; W3.sq = landSquash(t, 71.4, 0.08); }
  const tor = m5Hand(W3, 'R'); m5Light(ctx, tor[0] + 20, tor[1] - 70, 130 * (1 - 0.3 * gold), 0.9);
  const W1 = { ...M5_W1, x: 470 + 20 * M5B(t, 66.08, 0.3), y: M5_TUN.floor, s: 1.4, dir: 1, lid: 0.4 };
  W3.gaze = t < 66.7 ? lookAt(m5Head(W3), [700, 800]) : t < 71.7 ? lookAt(m5Head(W3), [860, 900]) : lookAt(m5Head(W3), m5Head(W1));
  m5Blink(W3, t, 41, m5In(t, 65.1, 66.0) ? 0.3 : 0); person(ctx, W3); m5Torch(ctx, ...tor, t, { s: 1.2, ang: joy ? -0.05 : -0.2 });
  // w1: one more tired swing, the pick goes through, he stumbles; then joy
  if (!joy) { const st = m5Strike(t, [66.05], { lift: 0.6, top: 0.9, rest: 0.4 }); W1.tip = 0.1 * m5Win(t, 66.05, 66.9, 0.15);
    if (t > 66.7) { W1.lid = 0; W1.eyes = 'wide'; W1.gaze = lookAt(m5Head(W1), [860, 900]); W1.mouth = t > 68.88 ? 'smile' : 'o'; W1.brow = -0.8; } else W1.gaze = [1, 0];
    m5Blink(W1, t, 31, W1.lid); const ang = m5StrikePose(W1, st.r); person(ctx, W1); m5Pick(ctx, ...m5Hand(W1, 'R'), ang, 1.4); }
  else { // drops the pick, both arms up with a hop, lands; then the two look at each other
    Object.assign(W1, { lid: 0, mouth: 'smile', eyes: 'wide', brow: -0.8, aL: [-2.6, -2.9], aR: [2.6, 2.9] }); W1.y -= hop(t, 71.06, 0.34, 0, 0, 40)[1]; W1.sq = landSquash(t, 71.4, 0.14);
    W1.gaze = t < 71.7 ? lookAt(m5Head(W1), [860, 900]) : lookAt(m5Head(W1), m5Head(W3)); if (t > 71.7) { W1.aL = [-2.0, -2.4]; W1.aR = [2.0, 2.4]; }
    person(ctx, W1); const u = M5B(t, 71.06, 0.35, 'in'); m5Pick(ctx, K.lerp(640, 640, u), K.lerp(800, M5_TUN.floor + 6, u), K.lerp(-0.6, -0.05, u), 1.4); }
  if (m5In(t, 66.05, 66.8)) m5Spark(ctx, M5_TUN.end, 800, t, 66.05, 1.2);
  if (fall > 0 && fall < 1) dustBurst(ctx, 860, M5_TUN.floor - 30, t - 66.9, 8, 14, 26, 160, 0.8, 66);
}
function m5O8(ctx, t, cam, S, P) {
  if (m5In(t, 66.0, 66.6)) { const [x, y] = P(M5_TUN.end, 800); S.emphasis(ctx, x, y, 200, M5B(t, 66.0, 0.25) * 0.24, { seed: 8 }); }
  if (m5In(t, 68.88, 72.3)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 68.88, 72.3, 0.2); sfx(ctx, 'GOLD!', 640, 300, 150, M5B(t, 68.88, 0.3), { rot: -0.06 }); ctx.restore(); }
}

// ---------- S9 the weighing (72.30 - 87.56). FOUND is on the left pan (the caliph's side), SPENT on the right (the vizier's) ----------
const M5_SC = { x: 500, y: 950 }, M5_S9C = [200, 935], M5_S9V = [800, 935];
function m5Tilt(t) { // + = right pan down
  let a = t < 76.94 ? -0.22 * M5B(t, 74.6, 2.3) : t < 78.32 ? K.lerp(-0.22, 0.14, M5B(t, 76.94, 1.38)) : t < 82.32 ? 0.14 * Math.cos(2 * Math.PI * 0.9 * (t - 78.32)) * (1 - (t - 78.32) / 4) ** 2 : 0;
  return a - 0.06 * swing(t, 85.78, 1, 1.6, 4.5) * (t > 85.78 ? 1 : 0) * 1 + 0.06 * swing(t, 86.88, 1, 1.6, 4.5) * (t > 86.88 ? 1 : 0); }
const m5Found = (t) => Math.round(t < 74.6 ? 0 : t < 81.52 ? 86 * M5B(t, 74.6, 2.3, 'lin') : K.lerp(86, 100, M5B(t, 81.52, 0.78, 'out')));
const m5Spent = (t) => Math.round(t < 76.94 ? 0 : t < 81.52 ? 92 * M5B(t, 76.94, 1.36, 'lin') : K.lerp(92, 100, M5B(t, 81.52, 0.78, 'out')));
function m5S9(ctx, t) {
  m5Face(ctx, { t, u: 0.27 });   // v2: no dark tunnel mouth behind the right pan (it read as a black dome)
  const tilt = m5Tilt(t), still = m5In(t, 82.32, 82.52);
  // the chest of the find, carried in by the foreman
  const chX = (tt) => m5Tr(tt, [[0, 1150], [72.3, 370, 0.9]]), W3x = (tt) => m5Tr(tt, [[0, 1220], [72.3, 440, 0.9], [73.8, 1250, 1.0]]);
  if (t < 74.9) { const W3 = { ...M5_W3, ...m5Walk(W3x, t, 13), y: 975, s: 0.78, dir: t < 73.5 ? -1 : 1, handL: [70, -120], handR: [86, -116], mouth: 'smile', gaze: [-1, 0.4] }; if (t > 73.5) { W3.handL = M5H.lowL; W3.handR = M5H.lowR; } person(ctx, W3); }
  const chestOpen = M5B(t, 73.4, 0.4); m5Chest(ctx, chX(t), 1010 - (t < 73.16 ? 60 : 60 * (1 - M5B(t, 73.16, 0.3))), { s: 0.55, old: true, open: chestOpen, fill: K.lerp(1, 0.2, M5B(t, 74.6, 2.3)), jewels: t < 76 });
  const sc = m5Scale(ctx, M5_SC.x, M5_SC.y, tilt, { level: still || m5In(t, 82.32, 83.7) ? m5Win(t, 82.32, 83.7, 0.1) : 0,
    left: (c, x, y) => { const f = M5B(t, 74.6, 2.3); if (f > 0) m5Mound(c, x, y, 120, Math.max(0.15, f), { seed: 8 }); },
    right: (c, x, y) => { const f = M5B(t, 76.94, 1.36); if (f > 0) m5Mound(c, x, y, 120, Math.max(0.15, f), { seed: 8, red: true }); } });
  for (let i = 0; i < 14; i++) { const s0 = 74.6 + i * 0.16, u = K.clamp((t - s0) / 0.4); if (u > 0 && u < 1) { const a = [370, 930], b = [sc.pans[0][0], sc.pans[0][1] - 20]; (i % 4 === 3 ? (c, x, y) => m5Gem(c, x, y, 9, [C.red, C.blue, '#2f9a3e'][i % 3]) : (c, x, y) => m5Coin(c, x, y, 11, Math.cos(t * 14 + i)))(ctx, K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 110 * Math.sin(Math.PI * u)); } }
  // v2: what he paid arrives as red coins on arcs from the vizier's ledger (76.94 - 78.32)
  for (let i = 0; i < 9; i++) { const s0 = 76.94 + i * 0.12, u = K.clamp((t - s0) / 0.4); if (u > 0 && u < 1) { const a = [M5_S9V[0] - 40, M5_S9V[1] - 100], b = [sc.pans[1][0] - 20 + (i % 3) * 20, sc.pans[1][1] - 20]; m5Coin(ctx, K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 120 * Math.sin(Math.PI * u), 13, Math.cos(t * 14 + i), C.red); } }
  // the caliph
  const P = { ...M5_CAL, x: m5Tr(t, [[0, 140], [72.3, M5_S9C[0], 0.5]]), y: M5_S9C[1], s: 0.8, dir: 1, mouth: 'smile', brow: -0.2 };
  P.ph = P.x / 9; P.amp = m5In(t, 72.3, 72.8) ? 0.8 : 0;
  P.handL = m5Tr(t, [[0, M5H.hipL], [74.6, [16, -128], 0.3], [80.1, M5H.hipL, 0.4]]);
  P.handR = m5Tr(t, [[0, M5H.hipR], [72.4, [60, -190], 0.2], [72.9, [56, -186], 0.08], [73.1, M5H.hipR, 0.4], [74.6, [-10, -130], 0.3], [80.1, M5H.hipR, 0.4], [85.44, m5Loc({ ...P, x: M5_S9C[0] }, [sc.pans[0][0] + 40, sc.pans[0][1] - 4]), 0.3], [86.3, M5H.hipR, 0.4]]);
  if (m5In(t, 74.6, 80.1)) { P.handL = [P.handL[0] + 8 * Math.sin(t * 16), P.handL[1]]; P.sq = 1 + 0.03 * Math.max(0, Math.sin(t * 6)); }
  if (t > 76.94) P.mouth = t < 78.3 ? 'smile' : 'o';
  P.look = t > 78.32 && t < 82.32 ? -K.clamp(tilt * 6, -1, 1) : 0; P.tilt = t > 78.32 && t < 82.32 ? tilt * 0.8 : 0;
  P.tip = 0.12 * m5Win(t, 80.16, 83.9, 0.4); if (t > 80.16 && t < 83.7) { P.eyes = 'wide'; P.brow = -0.9; P.noBlink = true; P.mouth = 'o'; }
  if (t > 84.26) { P.mouth = 'closed'; P.brow = m5In(t, 85.44, 86.0) ? -0.5 : 0; }
  P.gaze = t < 78.32 ? m5Look(t, P, [[0, [370, 930]], [76.94, sc.pans[1]]]) : t < 82.32 ? lookAt(m5Head(P), sc.pans[tilt > 0 ? 1 : 0]) : t < 83.7 ? m5Look(t, P, [[82.32, sc.pans[0]], [82.9, sc.pans[1]], [83.3, sc.pans[0]]], 0.06) : m5Look(t, P, [[83.7, sc.pivot], [85.44, sc.pans[0]], [86.38, [800, 760]]]);
  if (!P.noBlink) m5Blink(P, t, 11);
  person(ctx, P);
  // the vizier and the ledger
  const V = { ...M5_VIZ, x: M5_S9V[0], y: M5_S9V[1], s: 0.75, dir: -1, brow: -0.3 };
  V.handL = m5Tr(t, [[0, M5H.ledgerL], [84.26, [-30, -170], 0.15], [85.2, M5H.ledgerL, 0.4]]);
  V.handR = t < 79.1 ? (m5In(t, 74.0, 74.3) ? M5H.mouth : m5In(t, 75.52, 76.9) ? [20, -100 + 30 * M5B(t, 75.52, 1.3)] : [28 + 6 * Math.sin(t * 12), -116]) : m5Tr(t, [[79.1, [40, -160], 0.3], [84.26, [40, -180], 0.15], [86.38, m5Loc({ ...V }, [sc.pans[1][0] - 40, sc.pans[1][1] - 4]), 0.3], [87.1, [60, -120], 0.3]]);
  V.talk = talk(t, [[75.52, 76.9]]) * 0.3; V.gaze = m5Look(t, V, [[0, [800, 840]], [74.6, sc.pans[0]], [75.52, [790, 840]], [78.32, sc.pivot], [82.32, sc.pans[1]], [84.26, [790, 840]], [84.8, M5_S9C], [86.38, sc.pans[1]], [87.0, m5Head(P)]]);
  if (t > 86.9) { V.brow = -0.6; V.drop = -4 * m5Pulse(t, 87.0, 0.5); }
  m5Blink(V, t, 17); person(ctx, V);
  const lp = t < 84.26 ? m5Hand(V, 'L') : [V.x - 30, V.y - 87]; m5Ledger(ctx, lp[0], lp[1], { s: 0.45, fill: 0.3 + 0.5 * M5B(t, 75.5, 3), rot: 0.15 });
  m5Pen(ctx, ...m5Hand(V, 'R'), -0.4);
}
function m5O9(ctx, t, cam, S, P) {
  if (t > 74.6) { const pu = 1.4 * (1 + 0.12 * m5Pulse(t, 82.3, 0.25)); ctx.save(); ctx.translate(235, 260); ctx.scale(pu, pu); m5Tag(ctx, S, 0, 0, 'FOUND', m5Found(t), M5B(t, 74.6, 0.35), C.yellow); ctx.restore(); }
  if (t > 76.94) { const pu = 1.4 * (1 + 0.12 * m5Pulse(t, 82.3, 0.25)); ctx.save(); ctx.translate(765, 260); ctx.scale(pu, pu); m5Tag(ctx, S, 0, 0, 'SPENT', m5Spent(t), M5B(t, 76.94, 0.35), C.red); ctx.restore(); }
  if (t > 82.94) { const k = K.ease.back(K.clamp((t - 82.94) / 0.3)); ctx.save(); ctx.translate(500, 262); ctx.scale(k, k); // v2: a plain two-bar equals sign drawn as shapes
    for (const dy of [-16, 16]) { ctx.fillStyle = C.white; ctx.fillRect(-41, dy - 14, 82, 28); ctx.fillStyle = C.black; ctx.fillRect(-35, dy - 8, 70, 16); } ctx.restore(); }
  if (t > 84.26) { const k = t < 84.33 ? 1.3 : 1; ctx.save(); ctx.translate(500, 450); ctx.scale(k, k); sfx(ctx, 'EXACTLY!', 0, 0, 96, M5B(t, 84.26, 0.12), { rot: -0.08, fill: C.yellow }); ctx.restore(); }
}

// ---------- S10 the realisation (87.56 - 97.28) ----------
function m5S10(ctx, t) {
  m5Face(ctx, { t, u: 0.27 });
  const sc = m5Scale(ctx, M5_SC.x, M5_SC.y, 0, { left: (c, x, y) => m5Mound(c, x, y, 120, 1, { seed: 8 }), right: (c, x, y) => m5Mound(c, x, y, 120, 1, { seed: 8, red: true }) });
  const P = { ...M5_CAL, x: M5_S9C[0], y: M5_S9C[1], s: 0.8, dir: 1, eyes: t < 88.7 ? 'wide' : undefined, mouth: t < 90.14 ? 'o' : t < 91.74 ? 'frown' : 'closed', tip: 0.12 * (1 - M5B(t, 87.56, 1.0)) };
  P.brow = t < 90.14 ? -0.6 : t < 91.74 ? -0.5 : 0.55; P.handL = m5Tr(t, [[0, M5H.hipL], [91.74, [-36, -78], 0.5]]);
  // v2 deflation on 91.74: hands slide off the hips and hang, shoulders sink, body lower, brows up in the middle, heavy lids; held
  P.handR = m5Tr(t, [[0, M5H.hipR], [90.14, [22, -236], 0.3], [90.9, M5H.hipR, 0.4], [91.74, [36, -78], 0.5]]); if (m5In(t, 90.44, 90.9)) P.handR = [22 + 6 * Math.sin(t * 30), -236];
  P.tilt = 0.1 * m5Win(t, 90.14, 91.0, 0.2); P.drop = 8 * M5B(t, 91.74, 0.6); P.sq = 1 - 0.06 * M5B(t, 91.74, 0.5); P.y += 10 * M5B(t, 91.74, 0.5);
  const zc = m5Cam(t), zw = [zc.x + (835 - 500) / zc.zoom, zc.y + (K.lerp(240, 404, M5B(t, 93.76, 0.5, 'in')) - 615) / zc.zoom];
  const lid = t > 94.34 && t < 94.54 ? 1 : (t > 91.74 ? 0.45 : 0) + 0.9 * (m5Pulse(t, 87.9, 0.4) + m5Pulse(t, 88.4, 0.4));
  P.gaze = t < 88.7 ? [0.2, 0] : t < 89.7 ? m5Look(t, P, [[88.7, sc.pans[0]], [89.05, sc.pans[1]], [89.4, sc.pans[0]]], 0.06) : t < 91.74 ? [0.3, -0.5] : t < 93.76 ? [0.2, 0.8] : t < 94.34 ? lookAt(m5Head(P), zw) : [0, 0.05];
  P.lid = Math.min(1, lid); if (t < 94.34) m5Blink(P, t, 11, P.lid); person(ctx, P);
  const V = { ...M5_VIZ, x: M5_S9V[0], y: M5_S9V[1], s: 0.75, dir: -1, brow: -0.6, mouth: t > 96.12 ? 'smile' : 'closed' };
  // v2 two-shot from 96.12: the chest upside down at arm's length above his head, two shakes, one coin, an apologetic smile
  const shk = t > 96.3 && t < 96.9 ? 14 * Math.sin((t - 96.3) * Math.PI * 2 / 0.3) : 0;
  V.gaze = t < 96.12 ? [0.3, -1] : t < 96.9 ? [0.1, -1] : t < 97.0 ? [-0.3, 0.8] : [-0.6, 0.6]; if (t > 96.12) { V.brow = 0.5; V.tip = 0.04 * Math.sin((t - 96.3) * 21) * (shk ? 1 : 0); }
  if (t > 96.12) { const u = M5B(t, 96.12, 0.25); V.aR = [K.lerp(1.6, 2.3, u), K.lerp(1.6, 2.2, u)]; V.aL = [K.lerp(1.2, 2.0, u), K.lerp(1.3, 2.3, u)]; }
  else { V.handR = [40 + 10 * Math.sin(t * 14), -170]; V.handL = M5H.ledgerL; }
  m5Blink(V, t, 17); person(ctx, V);
  if (t < 96.12) m5Ledger(ctx, ...m5Hand(V, 'R'), { open: 0, s: 0.45, rot: 0.6 * Math.sin(t * 14) });
  else { const h = m5Hand(V, 'R'), h2 = m5Hand(V, 'L'), cx = (h[0] + h2[0]) / 2 + shk, cy = (h[1] + h2[1]) / 2 - 95, rot = Math.PI * M5B(t, 96.12, 0.3); m5Chest(ctx, cx, cy, { s: 0.55, open: 1, fill: 0, rot });
    if (t > 96.62) { const d = t - 96.62, fall = Math.min(1, d / 0.3), y = K.lerp(cy + 60, 975, fall * fall), x = cx - 30 * fall, sp = d < 0.3 ? Math.cos(d * 20) : Math.max(0.25, Math.abs(Math.cos(d * 14)) * Math.exp(-(d - 0.3) * 3)); m5Coin(ctx, x, y, 16, sp); } }
}
function m5O10(ctx, t, cam, S, P) {
  ctx.save(); ctx.globalAlpha = 1 - M5B(t, 95.0, 0.4); [[240, 'FOUND', C.yellow], [760, 'SPENT', C.red]].forEach(([x, l, col]) => { ctx.save(); ctx.translate(x, 160); ctx.scale(0.75, 0.75); m5Tag(ctx, S, 0, 0, l, 100, 1, col); ctx.restore(); });
  if (m5In(t, 90.92, 92.6)) { const k = M5B(t, 90.92, 0.5); S.arrow(ctx, [370, 120], [630, 120], k, { width: 16, bend: -0.35 }); S.arrow(ctx, [630, 210], [370, 210], M5B(t, 91.2, 0.5), { width: 16, bend: -0.35 }); }
  ctx.restore();
  if (m5In(t, 93.42, 95.6)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 93.42, 95.6, 0.2); const k = m5Pop(t, 93.42, 0.3); ctx.translate(740, 400); ctx.scale(k, k);
    shape(ctx, [[-170, -60], [150, -60], [175, 0], [150, 60], [-170, 60]], C.white, { lw: 7, seed: 750 }); ctx.font = K.font(60, BF, 400); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('PROFIT', -150, 4);
    const u = M5B(t, 93.76, 0.5, 'in'), lay = t > 94.26 ? K.clamp(0.3 * Math.exp(-(t - 94.26) * 6) * Math.cos((t - 94.26) * 30) + 1, 0, 1.3) : 0; ctx.save(); ctx.translate(95, K.lerp(-160, 4, u)); ctx.rotate(t < 94.26 ? (t - 93.76) * 8 : 0); ctx.scale(1, t > 94.26 ? Math.max(0.6, 1 - 0.4 * K.clamp((t - 94.26) / 0.3) + 0.15 * (lay - 1)) : 1);
    ctx.font = K.font(130, BF, 400); ctx.textAlign = 'center'; ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.strokeText('0', 0, 0); ctx.fillStyle = C.red; ctx.fillText('0', 0, 0); ctx.restore(); ctx.restore(); }
}

// ---------- S11 the departure (97.28 - 107.66). v2: clear staging, the chest loaded in a close shot, the plan outline peels off ----------
const M5_S11O = [220, 640, 470, 900];   // the demolition outline on the great pyramid (far view)
function m5Chips(ctx, t, t0) { // the outline's dashes peel off left to right and fall as red chips
  const [x0, y0, x1, y1] = M5_S11O, per = [[x0, y1, x0, y0], [x0, y0, x1, y0], [x1, y0, x1, y1]], r = K.rng(31);
  per.forEach(([ax, ay, bx, by], si) => { for (let i = 0; i < 9; i++) { const f = (i + 0.5) / 9, x = K.lerp(ax, bx, f), y = K.lerp(ay, by, f), d = t - t0 - (x - x0) / (x1 - x0) * 0.35 - r() * 0.05; const vx = (r() - 0.3) * 80, rr = r() * 6;
    const hz = ay === by; ctx.save(); if (d > 0) { ctx.translate(x + vx * d, y + 700 * d * d); ctx.rotate(rr * d * 3); ctx.globalAlpha = K.clamp(1 - (d - 0.5) / 0.4); } else ctx.translate(x, y);
    if (ctx.globalAlpha > 0.02 && y + 700 * Math.max(0, d) ** 2 < 905) { ctx.lineCap = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); hz ? (ctx.moveTo(-9, 0), ctx.lineTo(9, 0)) : (ctx.moveTo(0, -9), ctx.lineTo(0, 9)); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = C.red; ctx.stroke(); }
    ctx.restore(); } }); }
function m5S11(ctx, t) {
  const draw = M5B(t, 99.25, 0.35, 'lin');
  m5Far(ctx, { u: 0.3, t, scar: 1, outline: t < 100.62 ? draw : 0 });
  if (t >= 100.62 && t < 102.0) m5Chips(ctx, t, 100.62);
  const ride = (tt) => K.lerp(215, -320, M5B(tt, 105.2, 2.0, 'in')), vr = (tt) => K.lerp(90, -420, M5B(tt, 105.4, 2.0, 'in')), cr = (tt) => K.lerp(430, -280, M5B(tt, 105.6, 1.9, 'in'));
  // vizier waits mounted at the far left
  const V = { ...walk(vr, t, { stride: GAIT.horse * 0.5 }), y: 905, s: 0.5, pal: 1, dir: -1, earL: 0.6, earR: 0.6, tailSwish: Math.sin(t * 2) * 0.4 };
  rideOn(ctx, 'horse', V, { ...M5_VIZ, gaze: [1, 0], mouth: 'closed' });
  // the caliph's horse waits behind him; he mounts with a hop at 104.3
  if (t < 104.6) horse(ctx, { x: 215, y: 905, s: 0.5, dir: -1, earL: 1, earR: 1, tailSwish: Math.sin(t * 2.5) * 0.5 });
  // the camel kneels alone, takes the chest, rises rear first
  const Cm = { ...walk(cr, t, { stride: GAIT.camel * 0.5 }), y: 905, s: 0.5, dir: -1, kneel: m5Tr(t, [[0, 1], [98.14, 0, 0.66]]), chew: (Math.sin(t * 8) + 1) / 2, lid: 0.4, talk: m5Pulse(t, 98.2, 0.5), saddle: true, load: t > 97.9 ? ['chest'] : undefined };
  camel(ctx, Cm);
  if (t < 104.6) { const P = { ...M5_CAL, x: 310, y: 905, s: 0.5, dir: 1, brow: -0.3, mouth: 'closed' }; P.dir = turnFlip(t, [[0, 1], [104.0, -1]], 0.4).dir;
    P.gaze = t < 98.0 ? lookAt(m5Head(P), [500, 830]) : t < 98.8 ? m5Look(t, P, [[98.0, [480, 800]]]) : t < 99.6 ? [0.3, -0.8] : t < 100.62 ? lookAt(m5Head(P), [345, 700]) : [1, 0];
    P.look = t > 100.62 && t < 101.4 ? Math.sin((t - 100.62) * 14) * 0.6 : 0; m5Blink(P, t, 11, t > 100.62 && t < 102.2 ? 0.3 : 0); if (t > 100.62 && t < 102.2) P.mouth = 'smile';
    P.handR = m5Tr(t, [[0, M5H.hipR], [100.4, [60, -200], 0.2], [100.62, [100, -150], 0.45], [101.2, M5H.hipR, 0.3], [102.22, [70, -200], 0.25], [103.4, M5H.hipR, 0.4]]); P.handL = M5H.hipL;
    P.y -= hop(t, 104.3, 0.3, 0, 0, 30)[1]; if (t > 104.3) P.x = K.lerp(310, 225, M5B(t, 104.3, 0.3)); person(ctx, P); }
  else { const H = { ...walk(ride, t, { stride: GAIT.horse * 0.5 }), y: 905, s: 0.5, dir: -1, earL: 1, earR: 1, tailSwish: Math.sin(t * 2.5) * 0.5 }; rideOn(ctx, 'horse', H, { ...M5_CAL, gaze: [-1, 0], mouth: 'closed', lurch: -lurch(t, 104.6, 0.2) }); }
  // workers stand clear at the right; w3 and w1 carry the chest to the saddle first (contact 97.9)
  const carry = M5B(t, 97.28, 0.5), back = M5B(t, 98.0, 0.6);
  [['w3', M5_W3, 630, 0], ['w1', M5_W1, 690, 1], ['w2', M5_W2, 750, 2]].forEach(([k, base, x, i]) => { const W = { ...base, x, y: 912, s: 0.5, dir: -1 };
    const carrier = k !== 'w2'; if (carrier && t < 98.6) { W.x = K.lerp(x, x - 80 - 50 * i, carry * (1 - back)); W.ph = W.x / 9; W.amp = (t < 97.8 || t > 98.0) ? 0.7 : 0; }
    if (carrier && t < 97.95) { W.handL = [70, -130]; W.handR = [80, -140]; } else W.handL = M5H.lowL;
    const drop = k === 'w2' ? 103.3 : k === 'w3' ? 103.55 : 103.8; W.handR = W.handR || (t < drop ? [40, -150] : M5H.lowR);
    W.gaze = t < 98.6 ? lookAt(m5Head(W), [482, 830]) : t < 102.22 ? [-1, -0.2] : m5Look(t, W, [[102.22, [300, 820]], [104.0, [300, 890]], [104.6, [100, 820]]]); if (k === 'w2' && t > 103.12) W.mouth = 'smile'; if (k !== 'w2' && t > drop + 0.2) W.mouth = 'smile';
    person(ctx, W);
    if (carrier && t < 97.95) return;
    const h = m5Hand(W, 'R'), tool = k === 'w2' ? m5Shovel : m5Pick;
    if (t < drop) tool(ctx, h[0], h[1], -1.9, 0.75); else { const d = t - drop, u = Math.min(1, d / 0.3), b = d > 0.3 ? 12 * Math.abs(Math.sin((d - 0.3) * 12)) * Math.exp(-(d - 0.3) * 6) : 0; tool(ctx, h[0] + 14 * u, K.lerp(h[1], 900, u * u) - b, K.lerp(-1.9, -3.05, u), 0.75); } });
  // the chest in the carriers' hands, then the arc onto the saddle
  if (t < 97.9) { const a = [K.lerp(630, 520, carry) + 10, 845], u = M5B(t, 97.6, 0.3), x = K.lerp(a[0], 482, u), y = K.lerp(a[1], 834, u) - 50 * Math.sin(Math.PI * u); m5Chest(ctx, x, y + 20, { s: 0.36, old: true }); }
  // his thought balloon: throne and scroll replace the pyramid (kept inside the panel, gone before he exits)
  if (m5In(t, 105.5, 107.0)) { const hx = ride(t) + 10, k = m5Pop(t, 105.5, 0.4) * (1 - M5B(t, 106.7, 0.3, 'in')), bx = Math.max(240, hx + 70); if (k > 0.01) thoughtCloud(ctx, bx, 600, 200 * k, 140 * k, t, { p: K.clamp(k), tail: hx > 0 ? [hx + 10, 760] : null, scale: 1, at: [0, 0], inside: (c) => { const sw = M5B(t, 106.0, 0.4); if (sw < 1) m5Icon(c, 'pyramid', 0, 0, (1 - sw) * k); if (sw > 0) { m5Icon(c, 'throne', -30, 4, 0.8 * sw * k); m5Icon(c, 'scroll', 40, 10, 0.7 * sw * k); } } }); }
}
function m5O11(ctx, t, cam, S, P) {
  if (m5In(t, 100.62, 101.5)) { const [x, y] = P(345, 770), k = m5Pop(t, 100.62, 0.25); ctx.save(); ctx.globalAlpha = m5Fade(t, 100.62, 101.5, 0.2); ctx.translate(x, y); ctx.scale(k, k); ctx.lineCap = 'round'; for (const [w, c] of [[22, C.black], [12, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(-40, -40); ctx.lineTo(40, 40); ctx.moveTo(40, -40); ctx.lineTo(-40, 40); ctx.stroke(); } ctx.restore(); }
  if (m5In(t, 103.12, 104.6)) { const [x, y] = P(420, 640); ctx.save(); ctx.globalAlpha = m5Fade(t, 103.12, 104.6, 0.15); sfx(ctx, 'STOP!', x, y, 100, M5B(t, 103.12, 0.25), { fill: C.red, rot: -0.05 }); ctx.restore(); }
}
