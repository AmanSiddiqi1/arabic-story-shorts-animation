// ===== KD-007 The Three Fish: lettering, panel, transitions, subtitles, sound =====
function k7lbl(ctx, text, x, y, t, a, b, o = {}) { if (!k7in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k7fo(t, b, 0.3); S0.label(ctx, text, x, y, K7B(t, a, 0.35), { align: 'center', size: 44, fill: C.yellow, ...o }); ctx.restore(); }
function k7word(ctx, text, x, y, t, a, b, size = 80, o = {}) { if (!k7in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k7fo(t, b, 0.25); sfx(ctx, text, x, y, size, K7B(t, a, 0.15), { rot: -0.08, fill: C.yellow, ...o }); ctx.restore(); }
function k7arrow(ctx, from, to, t, a, b, o = {}) { if (!k7in(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k7fo(t, b, 0.3); S0.arrow(ctx, from, to, K7B(t, a, 0.35, 'out'), { width: 16, bend: 0.15, ...o }); ctx.restore(); }
function k7sunIcon(ctx, x, y, r) { ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; seg(ctx, x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25, x + Math.cos(a) * r * 1.65, y + Math.sin(a) * r * 1.65, 5, C.yellow, 2); } shape(ctx, ell(x, y, r, r, 18), C.yellow, { lw: 4, seed: 4, dot: C.red, pitch: 7, rad: 0.25, da: 0.5 }); ctx.restore(); }
// character-anchored tag: a label above its own fish (clamped inside the panel)
const K7TAGH = [31, 37, 47];
function k7tag(ctx, text, f, pal, t, a, b, cam) { if (!k7in(t, a, b)) return; const [x, y] = k7toP(f.x, f.y, cam); k7lbl(ctx, text, K.clamp(x, 110, 890), K.clamp(y - (K7TAGH[pal] + 62) * cam.zoom * (f.s || 1), 70, 1100), t, a, b, { fill: C.white }); }
// the peek glint: white tick marks beside the opened eye (and a ring around it)
function k7glint(ctx, P, f, t, a) { const u = K.clamp((t - a) / 0.75), k = K.ease.back(K.clamp(u / 0.2)) * (u > 0.85 ? (1 - u) / 0.15 : 1), F = K7FPAL[1], s = f.s || 1, ex = f.x + F.L * 0.56 / 2 * (f.dir || 1) * s, ey = f.y + (f.roll > 0.5 ? 9 : -9) * s;
  const [x, y] = P(ex, ey), z = k7camAt(t).zoom, r = F.eye * z * 1.3, d = Math.sign(f.dir || 1); if (k <= 0) return; ctx.save(); ctx.lineCap = 'round';
  for (const a0 of [-0.75, 0, 0.75]) { const ang = d > 0 ? a0 : Math.PI - a0, c = Math.cos(ang), sn = Math.sin(ang), r0 = r * 1.05, r1 = r * (1.05 + 0.55 * k); for (const [w, col] of [[11, C.black], [6, C.white]]) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x + c * r0, y + sn * r0); ctx.lineTo(x + c * r1, y + sn * r1); ctx.stroke(); } }
  ctx.restore(); }
// S8 bolts: [start, impact, from, to, X mark, arrow offset] (arrow drawn beside her path, never over her)
const K7BOLTS = [[149.5, 150.2, [720, 760], [820, 640], [925, 560], [-70, -70]], [150.32, 150.7, [790, 660], [700, 590], [770, 470], [60, 70]], [150.82, 151.2, [740, 640], [740, 960], [665, 1112], [80, 0]]];
function k7overlays(ctx, t, cam, S) {
  const P = (x, y) => k7toP(x, y, cam), f1 = k7f1(t), f2 = k7f2(t), f3 = k7f3(t);
  // ---- S1
  if (t < 2.9) { ctx.save(); ctx.globalAlpha *= k7fo(t, 2.9, 0.4); S.title(ctx, 'THE THREE FISH', 500, 150, K7B(t, 0.1, 0.8), { size: 64, align: 'center' }); ctx.restore(); }
  [[0.46, f1], [0.9, f2], [1.3, f3]].forEach(([a, f], i) => { if (k7in(t, a, 3.4)) { const [x, y] = P(f.x, f.y - 95); ctx.save(); ctx.globalAlpha *= k7fo(t, 3.4, 0.4); S.counter(ctx, i + 1, x, y, K7B(t, a + 0.1, 0.3), { size: 52 }); ctx.restore(); } });
  if (k7in(t, 7.98, 9.4)) { const [x, y] = P(1760, 640); k7lbl(ctx, 'RIVER', x, y, t, 7.98, 9.4, { size: 52 }); k7arrow(ctx, [x - 60, y + 30], P(1560, 840), t, 8.1, 9.4); }
  if (k7in(t, 11.2, 12.5)) { const [x, y] = P(1120, 400); k7lbl(ctx, 'NARROW STREAM', x, y, t, 11.2, 12.5, { size: 40 }); k7arrow(ctx, [x, y + 30], P(1120, 535), t, 11.3, 12.5, { width: 12 }); }
  if (k7in(t, 14.34, 16.5)) { const n = Math.max(0, 3 - Math.floor((t - 14.34) / 0.12)); k7lbl(ctx, 'VISITORS: ' + n, 500, 200, t, 14.34, 16.5, { size: 52, fill: C.white }); }
  // ---- S2
  k7tag(ctx, 'No. 1', f1, 0, t, 23.4, 27.2, cam); k7lbl(ctx, 'WISE + QUICK', 500, 1130, t, 26.04, 27.25);
  k7tag(ctx, 'No. 2', f2, 1, t, 27.36, 30.0, cam); k7lbl(ctx, 'CLEVER', 500, 1130, t, 28.1, 29.4);
  if (k7in(t, 30.08, 30.95)) { const [x, y] = P(f2.x - 10, f2.y - 120); k7word(ctx, 'HMM...', x, y - 40, t, 30.08, 30.95, 76, { fill: C.white }); }
  k7lbl(ctx, 'No. 3', 830, 150, t, 32.46, 35.95, { fill: C.white });
  if (k7in(t, 34.38, 35.1)) { const [x, y] = P(455, 925); k7word(ctx, 'BONK!', x - 40, y - 70, t, 34.38, 35.1, 96); }
  if (k7in(t, 34.45, 35.3)) { const [x, y] = P(f3.x + 10, f3.y - 70); dizzy(ctx, x, y, t, 50); }
  k7lbl(ctx, 'CAREFREE', 500, 1130, t, 35.26, 36.3);
  [[39.54, f1], [39.69, f2], [39.84, f3]].forEach(([a, f], i) => { if (k7in(t, a, 40.9)) { const [x, y] = P(f.x, f.y - 90); ctx.save(); ctx.globalAlpha *= k7fo(t, 40.9, 0.3); S.counter(ctx, i + 1, x, y, K7B(t, a, 0.25), { size: 46 }); ctx.restore(); } });
  // ---- S3
  if (k7in(t, 45.18, 47.2)) { k7lbl(ctx, 'TWO FISHERMEN', 500, 110, t, 45.18, 47.2, { size: 46 }); k7arrow(ctx, [500, 140], P((K7AX(t) + K7BX(t)) / 2, 175), t, 45.3, 47.2, { width: 14 }); }
  if (k7in(t, 51.9, 53.3)) { const [x, y] = P(470, 300); k7word(ctx, 'LOOK!', x - 150, y - 60, t, 51.9, 53.3, 86); k7arrow(ctx, P(540, 400), P(480, 580), t, 52.0, 53.6, { width: 14, bend: 0.05 }); }
  [[52.6, f1], [53.0, f2], [53.4, f3]].forEach(([a, f], i) => { if (k7in(t, a, 54.2)) { const [x, y] = P(f.x, f.y + 90); ctx.save(); ctx.globalAlpha *= k7fo(t, 54.2, 0.3); S.counter(ctx, i + 1, x, y, K7B(t, a, 0.25), { size: 40 }); ctx.restore(); } });
  if (k7in(t, 55.5, 57.7)) { const [ax, ay] = P(600, 250), cx = 790, cy = 190, p = K7B(t, 55.5, 0.35); ctx.save(); ctx.globalAlpha *= k7fo(t, 57.7, 0.3); bubble(ctx, cx, cy, 300, 230, ax + 50, ay - 30, p, '');
    if (p > 0.6) { if (t < 56.04) k7sunIcon(ctx, cx, cy - 30, 34); else k7net(ctx, [[cx - 60, cy - 70], [cx + 60, cy - 70], [cx + 45, cy + 10], [cx - 45, cy + 10]], { nu: 5, nv: 4, fill: 0.5 }); sfx(ctx, 'TOMORROW!', cx, cy + 55, 40, K7B(t, 55.55, 0.2), { fill: C.red }); } ctx.restore(); }
  if (k7in(t, 62.58, 63.7)) { const [x, y] = P(480, 610); ctx.save(); ctx.globalAlpha *= k7fo(t, 63.7, 0.3); thoughtCloud(ctx, x + 160, y - 150, 250, 170, t, { p: K7B(t, 62.58, 0.5), tail: [x + 40, y + 20], inside: (c) => k7net(c, [[-60, -50], [60, -50], [50, 45], [-50, 45]], { nu: 6, nv: 5, fill: 0.5, floats: true }), at: [0, 0], scale: 1 }); ctx.restore(); }
  // ---- S4
  k7tag(ctx, 'No. 1', f1, 0, t, 65.22, 66.9, cam);
  if (k7in(t, 68.0, 69.6)) { const [x, y] = P(f2.x - 60, f2.y - 85); k7arrow(ctx, [x, y], [975, y - 60], t, 68.0, 69.6, { width: 16, bend: 0.1 }); }
  if (k7in(t, 70.62, 71.5)) { const [x0, y0] = P(f1.x - 20, f1.y - 105), x = K.clamp(x0, 130, 870), y = K.clamp(y0, 90, 1100); k7word(ctx, 'ZIP!', x, y, t, 70.62, 71.5, 104); }
  if (k7in(t, 75.06, 76.8)) { ctx.save(); ctx.globalAlpha *= k7fo(t, 76.8, 0.4); S.title(ctx, 'THE WIDE RIVER', 500, 200, K7B(t, 75.06, 0.7), { size: 58, align: 'center' }); ctx.restore(); }
  if (k7in(t, 78.42, 79.8)) { const [x, y] = P(1965, 930); k7lbl(ctx, 'SAFE', x, y, t, 78.42, 79.8, { size: 54, fill: C.white }); }
  if (k7in(t, 80.3, 81.1)) { const [x, y] = P(f1.x - 30, f1.y - 40); thoughtCloud(ctx, x - 150, y - 230, 230, 160, t, { p: K7B(t, 80.3, 0.5), tail: [x - 30, y - 20], inside: (c) => { k7net(c, [[-50, -45], [50, -45], [40, 40], [-40, 40]], { nu: 5, nv: 4, fill: 0.5 }); k7redCross(c, 0, 0, 45, K7B(t, 80.6, 0.3)); }, at: [0, 0], scale: 1 }); }
  // ---- S5
  if (k7in(t, 81.1, 81.55)) { ctx.save(); ctx.globalAlpha = 0.8 * Math.sin(Math.PI * (t - 81.1) / 0.45); ctx.strokeStyle = C.white; ctx.lineWidth = 6; for (let i = 0; i < 14; i++) { const y = 60 + i * 85, x = (i * 173) % 700; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 300, y); ctx.stroke(); } ctx.restore(); }
  k7tag(ctx, 'No. 2', f2, 1, t, 82.72, 84.1, cam);
  if (k7in(t, 85.56, 88.0)) { const [ax, ay] = P(f2.x - 60, f2.y - 40), cx = 260, cy = 260, p = K7B(t, 85.56, 0.35); ctx.save(); ctx.globalAlpha *= k7fo(t, 88.0, 0.3); bubble(ctx, cx, cy, 300, 220, ax, ay, p, '');
    if (p > 0.6) { k7sunIcon(ctx, cx, cy - 40, 30); if (t >= 87.34) sfx(ctx, 'TOMORROW', cx, cy + 50, 44, K7B(t, 87.34, 0.2), { fill: C.red }); } ctx.restore(); }
  if (k7in(t, 86.14, 88.3)) { const a = P(f2.x + 70, f2.y - 70), b = P(985, 405); k7arrow(ctx, a, b, t, 86.14, 88.3, { width: 14, bend: -0.2 }); }
  if (k7in(t, 88.84, 90.3)) { const [x, y] = P(f2.x, f2.y - 100); k7lbl(ctx, 'STAYS', x + 60, y - 30, t, 88.84, 90.3, { fill: C.white, size: 54 }); }
  if (k7in(t, 90.7, 91.8)) { const [x, y] = P(410, 900); ctx.save(); ctx.globalAlpha *= k7fo(t, 91.8, 0.3); k7redCross(ctx, x, y, 34, K7B(t, 90.7, 0.25)); ctx.restore(); }
  if (k7in(t, 91.1, 91.9)) { const [x, y] = P(640, 880); ctx.save(); ctx.globalAlpha *= k7fo(t, 91.9, 0.3); k7redCross(ctx, x, y, 34, K7B(t, 91.1, 0.25)); ctx.restore(); }
  if (k7in(t, 91.26, 96.5) || k7in(t, 100.4, 102.6)) { const [x, y] = P(f2.x, f2.y - 60), a0 = t < 97 ? 91.26 : 100.4, a1 = t < 97 ? 96.5 : 102.6; ctx.save(); ctx.globalAlpha *= k7fo(t, a1, 0.4); thoughtCloud(ctx, x, y - 200, 250, 170, t, { p: K7B(t, a0, 0.5), tail: [x, y - 20], inside: (c) => { c.save(); c.font = K.font(46, BF, 400); c.textAlign = 'center'; c.fillStyle = C.black; c.fillText('PLAN?', 0, -14); c.restore(); c.save(); c.strokeStyle = C.black; c.lineWidth = 5; c.strokeRect(-34, 4, 68, 46); c.restore(); }, at: [0, 0], scale: 1 }); ctx.restore(); }
  k7tag(ctx, 'No. 3', f3, 2, t, 93.2, 94.6, cam);
  if (k7in(t, 95.23, 96.5)) { const [x, y] = P(f3.x + 60, f3.y - 120); k7word(ctx, 'RELAX!', x + 60, y, t, 95.23, 96.5, 76); }
  if (k7in(t, 97.26, 99.75)) { const [ax, ay] = P(f3.x + 50, f3.y - 40), cx = 700, cy = 250, p = K7B(t, 97.26, 0.35); bubble(ctx, cx, cy, 320, 200, ax, ay, p, '');
    if (p > 0.6) { for (const [dx, s] of [[-50, 0.36], [40, 0.3]]) person(ctx, { x: cx + dx, y: cy + 60, s, dir: 1, costume: 'villager', pal: dx < 0 ? K7A_PAL : K7B_PAL, ph: t * 8 + dx, amp: 0.8, lid: 0 }); k7redCross(ctx, cx, cy + 5, 60, K7B(t, 97.9, 0.3)); } }
  if (k7in(t, 99.0, 99.75)) { const [mx, my] = P(f3.x + 60, f3.y - 20), u = K7B(t, 99.0, 0.72, 'in'); k7bubble(ctx, K.lerp(mx, 640, u), K.lerp(my, 300, u), 18 + 8 * u); }
  if (k7in(t, 99.72, 100.2)) { const d = t - 99.72; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; star(ctx, 690 + Math.cos(a) * (40 + 300 * d), 260 + Math.sin(a) * (30 + 200 * d), 14 * (1 - d * 2), C.white, a); } }
  // ---- S6
  if (k7in(t, 108.46, 109.4)) { const [x, y] = P(360, 350); k7lbl(ctx, 'BIG NETS', x, y - 170, t, 108.46, 109.4, { size: 48 }); k7arrow(ctx, [x, y - 140], [x, y - 40], t, 108.5, 109.4, { width: 14 }); }
  if (k7in(t, 109.3, 110.2)) { const [x, y] = P(380, 420); k7word(ctx, 'FWUMP!', x + 100, y - 60, t, 109.3, 110.2, 80, { fill: C.white }); }
  if (k7in(t, 112.72, 114.0)) { const [x, y] = P(915, 380); k7lbl(ctx, 'BLOCKED', x, y, t, 112.72, 114.0, { size: 52, fill: C.red, color: C.white }); }
  if (k7in(t, 117.45, 118.5)) { const [x, y] = P(930, 470); k7word(ctx, 'BOING!', x - 40, y - 60, t, 117.45, 118.5, 92); }
  if (k7in(t, 117.6, 118.9)) { const [x, y] = P(f2.x + 30, f2.y - 50); dizzy(ctx, x, y, t, 60); }
  if (k7in(t, 122.74, 124.3)) { const [x, y] = P(f2.x - 40, f2.y - 50); ctx.save(); ctx.globalAlpha *= k7fo(t, 124.3, 0.3); thoughtCloud(ctx, x - 90, y - 270, 300, 210, t, { p: K7B(t, 122.74, 0.5), tail: [x - 20, y - 20], bg: '#2f6fd8',
    inside: (c) => { k7fish(c, { x: 0, y: 10, pal: 2, ...K7FLOAT, mouth: 'smile', ph: t * 3, amp: 0.1, s: 1.15 }); k7bubble(c, 50, -60, 9); }, at: [0, 0], scale: 1 }); ctx.restore(); }
  if (k7in(t, 123.84, 124.7)) { const [x, y] = P(f2.x - 70, f2.y - 90); k7word(ctx, '!', x - 30, y - 30, t, 123.84, 124.7, 110, { rot: 0.1 }); }
  // ---- S7
  if (k7in(t, 136.3, 137.4)) { const [x, y] = P(800, 165); k7word(ctx, 'DEAD?', x, y, t, 136.3, 137.4, 72, { fill: C.white }); }
  { const pk = k7peek(t); if (pk) k7glint(ctx, P, f2, t, pk); }
  if (k7in(t, 144.0, 145.25)) { const A = k7manA(t), [x, y] = P(A.x, 175); k7word(ctx, '?!', x + 20, y, t, 144.0, 145.25, 92, { fill: C.white, rot: 0.1 }); }
  if (k7in(t, 140.76, 142.0)) { const a = P(1450, 420), b = P(1500, 560); k7lbl(ctx, 'SO CLOSE!', a[0] + 60, a[1] - 230, t, 140.76, 142.0, { size: 48 }); { const c = P(1590, 380), e = P(1600, 590); k7arrow(ctx, c, e, t, 140.8, 142.0, { width: 14, bend: -0.25 }); } }
  if (k7in(t, 142.9, 143.7)) { const [x, y] = P(f2.x, f2.y - 110); k7word(ctx, 'FLIP!', x, y, t, 142.9, 143.7, 80); }
  if (k7in(t, 143.9, 144.7)) { const [x, y] = P(1610, 420); k7word(ctx, 'SPLASH!', x + 40, y - 30, t, 143.9, 144.7, 84, { fill: C.white }); }
  if (k7in(t, 146.6, 147.05)) { ctx.save(); ctx.globalAlpha = 0.8 * Math.sin(Math.PI * (t - 146.6) / 0.45); ctx.strokeStyle = C.white; ctx.lineWidth = 6; for (let i = 0; i < 14; i++) { const y = 60 + i * 85, x = 300 + (i * 173) % 700; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 300, y); ctx.stroke(); } ctx.restore(); }
  // ---- S8
  k7tag(ctx, 'No. 3', f3, 2, t, 148.36, 149.4, cam);
  for (const [a, h, s0, s1, xp, off] of K7BOLTS) {
    if (k7in(t, a, h + 0.12)) { const A = P(s0[0] + off[0], s0[1] + off[1]), B = P(s1[0] + off[0], s1[1] + off[1]); ctx.save(); ctx.globalAlpha *= k7fo(t, h + 0.12, 0.12); S0.arrow(ctx, A, B, K7B(t, a, 0.3, 'out'), { width: 12, bend: 0 }); ctx.restore(); }
    if (k7in(t, h, h + 0.4)) { const [x, y] = P(xp[0], xp[1]); ctx.save(); ctx.globalAlpha *= k7fo(t, h + 0.4, 0.25); k7redCross(ctx, x, y, 30, K7B(t, h, 0.12)); ctx.restore(); } }
  if (k7in(t, 153.3, 155.0)) { const [x, y] = P(f3.x + 10, f3.y - 95); k7word(ctx, '?', x, y, t, 153.3, 155.0, 120, { fill: C.white, rot: 0.08 }); }
  // ---- S9
  if (k7in(t, 160.16, 161.4)) k7lbl(ctx, 'THE WIDE RIVER', 500, 140, t, 160.16, 161.4, { size: 40, fill: C.white });
  if (k7in(t, 162.1, 163.2)) { const [x, y] = P(1792, 900); ctx.save(); ctx.globalAlpha *= k7fo(t, 163.2, 0.3); S.counter(ctx, 2, x, y, K7B(t, 162.1, 0.3), { size: 60 }); ctx.restore(); }
  if (k7in(t, 164.48, 165.4)) { const [x, y] = P(f2.x, f2.y - 130); k7word(ctx, 'FREE', x, y - 20, t, 164.48, 165.4, 92, { fill: C.white }); }
  if (k7in(t, 166.6, 168.5)) { const [x, y] = P((f1.x + f2.x) / 2, Math.min(f1.y, f2.y) - 60); ctx.save(); ctx.globalAlpha *= k7fo(t, 168.5, 0.4); thoughtCloud(ctx, x - 150, y - 300, 480, 320, t, { p: K7B(t, 166.6, 0.5), tail: [x - 20, y - 10], bg: '#2f6fd8',
    inside: (c) => { shape(c, [[-215, -40], [215, -40], [170, 100], [-170, 100]], EARTH, { lw: 5, seed: 5 }); shape(c, [[-190, -40], [190, -40], [148, 80], [-148, 80]], K7WATER, { lw: 0 });
      const fade = K7B(t, 167.0, 1.0);
      for (const [pal, x0, y0] of [[0, -100, -2], [1, 0, 40], [2, 100, -2]]) k7fish(c, { x: x0, y: y0, pal, s: 0.52, silhouette: false, ph: t * 4 + x0, amp: 0.3, eyes: 'shut', alpha: pal === 2 ? 1 - fade : 1 });
      if (fade > 0) { c.save(); c.globalAlpha *= fade; c.setLineDash([9, 7]); c.lineWidth = 4; c.strokeStyle = C.white; c.beginPath(); c.ellipse(100, -2, 34, 25, 0, 0, 7); c.moveTo(66, -2); c.lineTo(46, -20); c.lineTo(50, -2); c.lineTo(46, 16); c.closePath(); c.stroke(); c.restore(); } }, at: [0, 0], scale: 1 }); ctx.restore(); }
  if (t >= 168.6) S.title(ctx, 'THE END', 500, 190, K7B(t, 168.6, 0.8), { size: 80, align: 'center' });
  if (t >= 169.2) S.label(ctx, 'ACT IN TIME', 500, 330, K7B(t, 169.2, 0.4), { align: 'center', size: 44, fill: C.yellow });
}

// panel-only shake: the bump, BONK, FWUMP, BOING and the panic flips
const K7SHAKE = (t) => K.spring(t, 47.55, 4, 9, 6) + K.spring(t, 34.38, 5, 9, 6) + K.spring(t, 109.5, 4, 9, 6) + K.spring(t, 117.45, 7, 9, 6) + K.spring(t, 150.1, 2.5, 9, 7) + K.spring(t, 150.45, 2.5, 9, 7) + K.spring(t, 150.9, 2.5, 9, 7)
  + K.spring(t, 111.75, 2, 9, 7) + K.spring(t, 112.3, 2, 9, 7);
function k7render(ctx, t, cam) { ctx.save(); K.camera(ctx, K7VW, K7VH, cam); k7drawWorld(ctx, t, cam); ctx.restore(); }
const SCENE = {
  duration: K7DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = K7SHAKE(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K7VW, ph / K7VH);
    const cam = k7camAt(t);
    if (k7in(t, 158.46, 159.3)) { k7render(ctx, t, k7camAt(158.455)); ctx.save(); ctx.globalAlpha = K.ease.inOut((t - 158.46) / 0.84); k7render(ctx, t, cam); ctx.restore(); }
    else k7render(ctx, t, cam);
    k7overlays(ctx, t, cam, S);
    if (k7in(t, 103.15, 104.05)) S.transition(ctx, K7VW, K7VH, (t - 103.15) / 0.9, { caption: 'NEXT MORNING...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // only the planned effects, all inside narration pauses, quiet (master 0.6 at render)
    k.bed(S.sfx.bed, 0, K7DUR, 0.5);
    k.play('pop', 5.95, { pitch: 1.3, gain: 0.35 }); k.play('whoosh', 12.5, { dur: 0.4, gain: 0.25 }); k.play('pop', 21.4, { pitch: 1.4, gain: 0.3 });
    k.play('tick', 27.08, { gain: 0.35 }); k.play('thud', 42.15, { gain: 0.35 }); k.play('thud', 47.55, { gain: 0.45 });
    k.play('pop', 66.7, { pitch: 1.1, gain: 0.35 }); k.play('pop', 99.72, { pitch: 0.55, gain: 0.45 }); k.play('whoosh', 103.45, { dur: 0.45, gain: 0.3 });
    k.play('chime', 125.42, { note: 'A5', gain: 0.45 }); k.play('pop', 146.7, { pitch: 0.7, gain: 0.4 }); k.play('chime', 168.5, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;

// ===== subtitles (scene copy of Library/core/subtitle.js; same layout, with balanced line breaks: no orphan word, no full-width English line) =====
let S0 = null;
function k7wrapBal(ctx, text, maxW, minLines = 1) {
  let lines = K.wrap(ctx, text, maxW); const n = Math.max(lines.length, text.split(/\s+/).length > 1 ? minLines : 1); if (n === 1) return lines;
  let lo = maxW * 0.3, hi = maxW; for (let i = 0; i < 14; i++) { const mid = (lo + hi) / 2; if (K.wrap(ctx, text, mid).length <= n) hi = mid; else lo = mid; }
  return K.wrap(ctx, text, hi);
}
function subtitle(ctx, W, H, t, s) {
  const ch = TIMING.chunks; let cur = null;
  for (let i = 0; i < ch.length; i++) { const e = ch[i], nx = ch[i + 1], endAt = nx && nx.a - e.b < 1.4 ? nx.a - 0.1 : e.b + 0.6; if (t >= e.a - 0.12 && t < endAt) { cur = e; break; } }
  const bx = 54, by = 1296, bw = 972, bh = 566;
  S0.box(ctx, bx, by, bw, bh, 1, { fill: C.white, lw: 9, seed: 13 });
  if (!cur) return;
  const a = K.clamp((t - cur.a + 0.12) / 0.14), maxW = bw - 90; ctx.save(); ctx.globalAlpha = a;
  let fs = 70, lines, lh; ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (; fs >= 44; fs -= 2) { ctx.font = K.font(fs, AF, AW); lines = K.wrap(ctx, cur.ar, maxW); lh = fs * 1.72; if (lines.length * lh <= 340) break; }
  lines = k7wrapBal(ctx, cur.ar, maxW);
  let es = 44, enL, elh; ctx.direction = 'ltr'; ctx.letterSpacing = '1px';
  for (; es >= 30; es -= 2) { ctx.font = K.font(es, BF, 400); enL = K.wrap(ctx, cur.en, maxW); elh = es * 1.25; if (enL.length * elh <= 150) break; }
  enL = k7wrapBal(ctx, cur.en, maxW, ctx.measureText(cur.en).width > maxW * 0.9 ? 2 : 1); ctx.letterSpacing = '0px';
  const total = lines.length * lh + 22 + enL.length * elh, y0 = by + (bh - total) / 2;
  ctx.direction = 'rtl'; ctx.font = K.font(fs, AF, AW); ctx.fillStyle = C.black; lines.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + (i + 0.5) * lh));
  ctx.direction = 'ltr'; ctx.font = K.font(es, BF, 400); ctx.fillStyle = C.blue; ctx.letterSpacing = '1px'; enL.forEach((ln, i) => ctx.fillText(ln, bx + bw / 2, y0 + lines.length * lh + 22 + (i + 0.5) * elh)); ctx.letterSpacing = '0px';
  ctx.restore();
}
