// ===== AN-151 main: scene switch, cameras, clouds and balloons, lettering, transitions, panel, sound =====
// cuts (s): street 0 (S1), cut 9.28 (S2), wipe 13.34 room (S3), cut 21.24 street (S4), wipe 28.7 room (S5-S9, ONE DAY card 43.32),
// wipe 86.06 street (S10-S11), zoom 106.26 letter (S12), zoom 118.08 street (S13), whip 124.32 room (S14-S17), THE END 169.6
const IL_CUTS = [[0, 'street'], [13.34, 'room'], [21.24, 'street'], [28.7, 'room'], [86.06, 'street'], [106.26, 'letter'], [118.08, 'street'], [124.32, 'room']];
const ilScene = (t) => { let s = 'street'; for (const [a, n] of IL_CUTS) if (t >= a) s = n; return s; };
const ilK = (x, y, zoom) => ({ x, y, zoom });
const IL_CAMST = [[0, ilK(1900, 615, 1)], [2.24, ilK(1900, 615, 1)], [3.4, ilK(1960, 690, 1.5)], [7.4, ilK(1960, 690, 1.5)], [8.2, ilK(1950, 700, 1.8)], [9.27, ilK(1950, 700, 1.8)],
  [9.28, ilK(1480, 700, 1.5)], [13.34, ilK(1480, 700, 1.5)], [21.24, ilK(1290, 700, 1.4)], [23.9, ilK(1300, 700, 1.4)], [24.5, ilK(1300, 680, 1.4)], [26.4, ilK(1340, 680, 1.4)], [28.7, ilK(1340, 680, 1.4)],
  [86.06, ilK(1000, 700, 1.3)], [88.0, ilK(520, 700, 1.3)], [92.97, ilK(520, 700, 1.3)], [92.98, ilK(520, 690, 1.4)], [102.0, ilK(520, 690, 1.4)], [102.8, ilK(540, 720, 1.8)], [106.26, ilK(540, 720, 1.8)],
  [118.08, ilK(520, 690, 1.4)], [120.3, ilK(520, 690, 1.4)]];
const IL_CAMRM = [[13.34, ilK(480, 740, 1.4)], [18.3, ilK(480, 740, 1.4)], [19.9, ilK(690, 640, 1.7)], [21.24, ilK(690, 640, 1.7)],
  [28.7, ilK(490, 745, 1.5)], [29.19, ilK(490, 745, 1.5)], [29.2, ilK(565, 680, 1.8)], [33.3, ilK(565, 680, 1.8)], [34.0, ilK(378, 680, 1.8)], [36.3, ilK(378, 680, 1.8)], [36.7, ilK(350, 780, 1.9)], [39.7, ilK(350, 780, 1.9)], [40.3, ilK(740, 720, 2.0)], [43.32, ilK(740, 720, 2.0)],
  [43.33, ilK(480, 625, 1.5)], [45.9, ilK(480, 625, 1.5)], [46.6, ilK(640, 668, 1.85)], [49.6, ilK(640, 668, 1.85)], [50.3, ilK(700, 650, 1.7)], [52.7, ilK(700, 650, 1.7)], [52.95, ilK(860, 600, 1.7)], [55.2, ilK(860, 600, 1.7)], [55.6, ilK(680, 690, 1.5)], [56.35, ilK(680, 690, 1.5)],
  [56.36, ilK(650, 665, 1.6)], [62.44, ilK(650, 665, 1.6)], [62.45, ilK(660, 660, 1.85)], [64.34, ilK(660, 660, 1.85)], [64.35, ilK(360, 735, 2.1)], [65.04, ilK(360, 735, 2.1)], [65.05, ilK(660, 660, 1.85)], [69.2, ilK(660, 660, 1.85)], [69.8, ilK(600, 620, 1.9)], [73.57, ilK(600, 620, 1.9)],
  [73.58, ilK(650, 665, 1.7)], [79.4, ilK(650, 665, 1.7)], [79.9, ilK(740, 660, 1.9)], [80.9, ilK(740, 660, 1.9)], [81.4, ilK(640, 668, 1.75)], [82.7, ilK(640, 668, 1.75)], [84.0, ilK(755, 730, 2.3)], [86.06, ilK(755, 730, 2.3)],
  [124.32, ilK(490, 745, 1.5)], [125.6, ilK(490, 745, 1.5)], [126.0, ilK(640, 690, 1.6)], [128.1, ilK(640, 690, 1.6)], [132.0, ilK(740, 650, 2.0)], [134.77, ilK(740, 650, 2.0)],
  [134.78, ilK(615, 590, 1.3)], [144.2, ilK(615, 590, 1.3)], [145.0, ilK(650, 690, 1.7)], [149.2, ilK(650, 680, 1.6)], [151.94, ilK(650, 680, 1.6)], [151.95, ilK(350, 790, 2.2)], [152.89, ilK(350, 790, 2.2)], [152.9, ilK(480, 640, 1.4)], [156.13, ilK(480, 640, 1.4)],
  [156.14, ilK(740, 700, 1.7)], [158.4, ilK(740, 700, 1.7)], [161.5, ilK(500, 655, 1.35)], [169.4, ilK(500, 655, 1.35)], [170.4, ilK(680, 700, 1.8)], [173.5, ilK(680, 700, 1.8)]];
function ilCamOf(sc, t) { let c, ww = 1000;
  if (sc === 'street') { ww = 2400; c = K.camAt(IL_CAMST, t);
    if (t >= 118.08) { const z = K.lerp(1.4, 1.3, ilE(t, 120.3, 0.7)); c = ilK(K.lerp(520, IL_WX(t) + 150, ilE(t, 120.3, 0.8)), K.lerp(690, 700, ilE(t, 120.3, 0.7)), z); } }
  else if (sc === 'room') c = K.camAt(IL_CAMRM, t);
  else c = ilK(500, 615, 1);
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }

// ---------- clouds and balloons in world units (inside the camera) ----------
function ilWorldFx(ctx, t, sc, W) {
  if (sc === 'street' && ilIn(t, 24.32, 28.2) && W.lady && W.bed) { const p = ilE(t, 24.32, 0.6, 'out') * (1 - ilE(t, 27.8, 0.4)), m = [(W.lady.x + W.bed.x) / 2, Math.min(W.lady.y, W.bed.y) - 50];
    thoughtCloud(ctx, 1110, 420, 420, 290, t, { p, tail: m, bg: '#9cc4ff', scale: 0.5, at: [520, 720], inside: ilCloudScholar }); }
  if (sc === 'room' && ilIn(t, 48.14, 50.5) && W.wom) { const p = ilE(t, 48.14, 0.5, 'out') * (1 - ilE(t, 50.1, 0.4));
    thoughtCloud(ctx, 560, 520, 360, 240, t, { p, tail: [W.wom.x, W.wom.y - 50], bg: '#ffe9a8', scale: 0.42, at: [520, 760], inside: ilCloudFar }); }
  if (sc === 'room' && ilIn(t, 70.8, 73.58) && W.wom) { const p = ilE(t, 70.8, 0.5, 'out');
    thoughtCloud(ctx, 590, 455, 420, 280, t, { p, tail: [W.wom.x, W.wom.y - 45], bg: '#ffe9a8', scale: 0.76, at: [520, 790], inside: ilCloudFear }); }
  if (sc === 'room' && ilIn(t, 135.74, 145.4) && W.imp) { const p = ilE(t, 135.74, 0.5, 'out') * (1 - ilE(t, 145.0, 0.4));
    thoughtCloud(ctx, 600, 318, 640, 360, t, { p, tail: [W.imp.x - 20, W.imp.y + 18], fill: IL_PAPER, bg: IL_PAPER, scale: 0.9, at: [520, 770], inside: ilToldPicture }); }
  if (sc === 'street' && ilIn(t, 97.42, 102.4) && W.nei) { const p = ilE(t, 97.42, 0.4, 'out') * (1 - ilE(t, 102.0, 0.35));
    ilPicBalloon(ctx, 640, 410, 420, 280, p, [W.nei.x - 6, W.nei.y + 16], (c) => { c.scale(0.52, 0.52); ilBalloonNews(c, t); }); }
  // the neighbour's "yesterday" sign by his note
  if (sc === 'street' && ilIn(t, 95.66, 97.4) && W.note) { const k = K.ease.back(K.clamp((t - 95.66) / 0.3)), a = 1 - ilE(t, 97.1, 0.3); ctx.save(); ctx.globalAlpha *= a; ctx.translate(W.note[0] - 80, W.note[1] - 40); ctx.scale(0.3 * k, 0.3 * k); sun(ctx, 0, 0, t); ctx.restore();
    ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(W.note[0] - 80, W.note[1] - 40, 55, -0.3, Math.PI * 1.1 * k); ctx.stroke(); ctx.restore(); }
  // worry scribble over the turban (68.1), crooked bulb (133.12), the floating question mark (166.54)
  if (sc === 'room' && W.imp && ilIn(t, 67.5, 69.3)) ilWorry(ctx, W.imp.x + 62, W.imp.y + 12, t, (t - 67.5) / 0.3 * (1 - ilE(t, 69.0, 0.3)), 0.55);
  if (sc === 'room' && W.imp && ilIn(t, 133.12, 134.6)) ilBulb(ctx, W.imp.x + 10, W.imp.y - 190, (t - 133.12) / 0.3 * (1 - ilE(t, 134.3, 0.3)), t, { crook: 0.4 });
  if (sc === 'room' && ilIn(t, 166.54, 168.3)) { const u = ilE(t, 166.54, 1.5, 'lin'), x = K.lerp(720, 140, u), y = 700 - 40 * Math.sin(Math.PI * u) + 12 * Math.sin(t * 6), pop = t > 168.04 ? (t - 168.04) / 0.25 : 0;
    ctx.save(); ctx.globalAlpha *= 1 - K.clamp(pop); ctx.translate(x, y); ctx.scale(1 + pop, 1 + pop); ctx.font = K.font(110, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.strokeText('?', 0, 0); ctx.fillStyle = C.white; ctx.fillText('?', 0, 0); ctx.restore();
    if (pop > 0) ilImpact(ctx, 140, 700, t, 168.04, 50); }
  if (sc === 'room' && ilIn(t, 168.9, 169.5)) { const u = (t - 168.9) / 0.6; ilStar(ctx, 600 + 46, 472 - 40, 22 * Math.sin(Math.PI * u), C.yellow); ilStar(ctx, 600 - 44, 472 + 30, 14 * Math.sin(Math.PI * u), C.white); }
}
// a picture balloon (rounded rect + tail), world units; inside(c) draws with (0, 0) at the centre
function ilPicBalloon(ctx, x, y, w, h, p, tail, inside) { const k = K.ease.back(K.clamp(p)); if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const rp = [], rr = 26; for (const [cx, cy, a0] of [[w / 2 - rr, -h / 2 + rr, -Math.PI / 2], [w / 2 - rr, h / 2 - rr, 0], [-w / 2 + rr, h / 2 - rr, Math.PI / 2], [-w / 2 + rr, -h / 2 + rr, Math.PI]]) for (let i = 0; i <= 6; i++) { const a = a0 + i / 6 * Math.PI / 2; rp.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  const tx = (tail[0] - x) / k, ty = (tail[1] - y) / k, bx = K.clamp(tx * 0.4, -w / 2 + 40, w / 2 - 40), by = h / 2 - 4, tl = [[bx - 18, by], [K.lerp(bx, tx, 0.8), K.lerp(by, ty, 0.8)], [bx + 18, by]];
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.save(); ctx.translate(7, 7); K.poly(ctx, rp, true); ctx.fill(); ctx.restore(); ctx.fillStyle = C.white; K.poly(ctx, rp, true); ctx.fill(); K.poly(ctx, tl, true); ctx.fill();
  ctx.save(); K.poly(ctx, rp, true); ctx.clip(); inside(ctx); ctx.restore(); ink(ctx, rp.concat([rp[0]]), 6, 320);
  ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...tl[0]); ctx.lineTo(...tl[1]); ctx.lineTo(...tl[2]); ctx.stroke(); ctx.restore(); ctx.restore(); }

function ilWorld(ctx, sc, t) { const cam = ilCamOf(sc, t); ctx.save(); K.camera(ctx, 1000, 1230, cam);
  const W = sc === 'street' ? ilStreetWorld(ctx, t, cam) : sc === 'room' ? ilRoomWorld(ctx, t, cam) : {}; ilWorldFx(ctx, t, sc, W); ctx.restore(); return { W, cam }; }

// ---------- lettering, balloons and panel pieces ----------
function ilOver(ctx, t, sc, cam, W, S) {
  const P = (p) => ilP(p[0], p[1], cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= ilEnv(t, a, b, 0.2); S.label(ctx, txt, x, y, ilE(t, a, 0.35), { size: 48, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= ilEnv(t, a, b, 0.2); S.arrow(ctx, a0, a1, ilE(t, a, 0.4), { width: 16, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= ilEnv(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  // speech balloon placed relative to the speaker's head; the tail ends just short of the mouth (o.face: -1 faces left, 1 right)
  const say = (txt, h, dx, dy, a, b, o = {}) => { if (t < a || t >= b || !h) return; const q = P([h.x, h.y]), m = P([h.x + (o.face ?? -1) * 8 * h.s, h.y + 27 * h.s]), w = o.w || 260, bx = q[0] + dx, by = q[1] + dy, d = Math.hypot(m[0] - bx, m[1] - by) || 1;
    ctx.save(); ctx.globalAlpha *= ilEnv(t, a, b, 0.12); bubble(ctx, bx, by, w, o.h || 130, m[0] - (m[0] - bx) / d * 16, m[1] - (m[1] - by) / d * 16, K.clamp((t - a) / 0.3), txt, { size: o.size || 76 }); ctx.restore(); };
  const say2 = (txt, x, y, w, h, tx, ty, a, b, size = 78) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= ilEnv(t, a, b, 0.12); bubble(ctx, x, y, w, h, tx, ty, K.clamp((t - a) / 0.3), txt, { size }); ctx.restore(); };
  const count = (txt, x, y, a, b, n = 0) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= ilEnv(t, a, b, 0.2); S.label(ctx, txt, x, y, ilE(t, a, 0.3), { size: 44, align: 'center', fill: C.yellow }); S.counter(ctx, n, x, y + 120, ilE(t, a + 0.15, 0.3), { size: 70 }); ctx.restore(); };
  if (sc === 'street') {
    if (W.imp && t < 9.28) { const h = P([W.imp.x, W.imp.y]); lab("CAN'T READ!", h[0] - 120, h[1] - 230, 3.38, 5.9, { size: 52 }); arr([h[0] - 120, h[1] - 195], [h[0] - 20, h[1] - 60], 3.45, 5.9, { bend: 0.25 }); }
    if (W.wom && ilIn(t, 88.7, 90.6)) { const d = P([420, 585]); word('WAAH!', d[0], d[1], 88.7, 90.6, 92, { fill: C.white, rot: -0.08 }); }
  }
  if (sc === 'room') {
    if (W.imp && ilIn(t, 19.94, 21.24)) { const h = P([W.imp.x, W.imp.y]); lab('BIG TURBAN', h[0] - 230, h[1] - 330, 19.94, 21.24, { size: 54 }); arr([h[0] - 210, h[1] - 300], [h[0] - 100, h[1] - 150], 20.0, 21.24, { bend: -0.2 }); }
    say2('WRITE!', 430, 560, 330, 160, 772, 796, 32.25, 33.1); say2('READ!', 760, 500, 300, 160, 1010, 760, 35.67, 36.5);
    if (W.imp && ilIn(t, 41.74, 43.1)) { const h = P([W.imp.x, W.imp.y]); count('LESSONS TAUGHT:', 270, 300, 41.74, 43.1); }
    if (ilIn(t, 39.02, 40.2) && W.pup0 && W.pup2) { const a = P([W.pup0.x, W.pup0.y - 30]), c = P([W.pup2.x, W.pup2.y - 30]), b = P([W.pup1.x, W.pup1.y - 30]), d = P([W.pup3.x, W.pup3.y - 30]);
      arr([a[0], a[1] - 40], [c[0] - 10, c[1] - 50], 39.02, 40.2, { bend: -0.6, width: 13 }); arr([b[0], b[1] - 40], [d[0] - 10, d[1] - 50], 39.2, 40.2, { bend: -0.6, width: 13 }); }
    if (ilIn(t, 52.92, 54.8)) { const w = P([895, 420]); word('STUCK!', w[0] - 120, w[1] - 20, 52.92, 54.8, 96, { fill: C.yellow, rot: -0.1 }); }
    if (W.imp) say('YES!', W.imp, -230, -330, 80.44, 81.6, { w: 250 });
    if (W.imp && ilIn(t, 83.14, 85.95)) { ctx.save(); ctx.globalAlpha *= ilEnv(t, 83.14, 85.95, 0.2); S.label(ctx, 'WORDS READ:', 260, 200, ilE(t, 83.14, 0.3), { size: 46, align: 'center', fill: C.yellow }); S.counter(ctx, 0, 260, 330, ilE(t, 83.3, 0.3), { size: 80 }); ctx.restore(); }
    if (W.wom) say('WHY?!', W.wom, -40, -300, 125.66, 126.75, { w: 270, face: 1 });
    if (W.imp && ilIn(t, 130.28, 132.4)) { const h = P([W.imp.x, W.imp.y]), creep = ilE(t, 130.28, 0.6, 'out'), sw = t >= 131.08 ? (t - 131.08) / 0.8 : 0;
      ctx.save(); ctx.translate(K.lerp(-120, 250, creep) - 500 * sw, 190 + 900 * sw * sw); ctx.rotate(-1.5 * sw); S.label(ctx, "CAN'T READ!", 0, 0, 1, { size: 52 }); ctx.restore();
      if (sw === 0) arr([K.lerp(-120, 250, creep) + 40, 225], [h[0] - 60, h[1] - 120], 130.5, 131.08, { bend: 0.2 }); }
    if (W.wom) say('OH! I SEE.', W.wom, 60, -300, 151.2, 151.95, { w: 370, size: 64, face: 1 });
    if (W.imp && ilIn(t, 164.3, 167.3)) { ctx.save(); ctx.globalAlpha *= ilEnv(t, 164.3, 167.3, 0.2); S.label(ctx, 'LESSONS TAUGHT:', 250, 95, ilE(t, 164.3, 0.3), { size: 44, align: 'center', fill: C.yellow }); S.counter(ctx, 0, 250, 200, ilE(t, 164.45, 0.3), { size: 64 }); ctx.restore(); }
    if (t >= 169.6) { S.title(ctx, 'THE END', 500, 1105, ilE(t, 169.6, 0.9), { size: 90, align: 'center' }); }
  }
  if (sc === 'letter') {
    if (ilIn(t, 111.76, 114.6)) { lab('10 DAYS', 820, 370, 111.76, 114.6, { size: 60, fill: C.yellow }); }
    // QUILT and CANDLE SNUFFER labels are drawn with the gifts (ilLetterGifts)
  }
}

// ---------- the insert (62.58-63.54): the page fills the panel, upside down, his eyes over the top edge ----------
function ilInsert(ctx, t, S) { ctx.fillStyle = C.yellow; ctx.fillRect(0, 0, 1000, 1230); ctx.fillStyle = dotPat(ctx, C.red, 14, 0.25); ctx.fillRect(0, 0, 1000, 1230);
  // the page finishes its turn (62.6); UPSIDE DOWN! 62.75-64.2; his eyes scan left-right, right-left, diagonal with one confident nod (63.5-64.2)
  const s = 2.2, nod = 10 * pulse(t, 63.98, 0.3), P = ilWho(IL_IMP, { x: 500, y: 330 + 195 * s + nod, s, dir: -1, lid: 0.15, brow: -0.6, noBlink: true,
    gaze: gazePlan(t, [[62.45, [0, 0.9]], [63.5, [-0.95, 0.6]], [63.68, [0.95, 0.6]], [63.86, [-0.95, 0.6]], [63.98, [0.9, -0.4]], [64.12, [-0.8, 0.9]]], 0.08) });
  if (t >= 63.95) P.mouth = 'smile';
  person(ctx, P); const h = ilHead(P); ilTurban(ctx, h.x, h.y, { s: h.s, rot: 0, feather: 0.1 * Math.sin(t * 3) + 0.15 * pulse(t, 64.0, 0.35) });
  ilLetter(ctx, 500, 760, 5.0, { rot: Math.PI - 0.7 * (1 - ilE(t, 62.45, 0.15, 'out')) });
  ctx.save(); ctx.globalAlpha *= 1 - ilE(t, 64.1, 0.15); S.label(ctx, 'UPSIDE DOWN!', 520, 1165, ilE(t, 62.75, 0.3), { size: 68, align: 'center', fill: C.yellow });
  if (t >= 62.8) S.arrow(ctx, [140, 1060], [400, 960], ilE(t, 62.8, 0.4), { width: 18, bend: -0.35 }); ctx.restore(); }

const IL_SHAKE = [[52.92, 4], [124.1, 3]];
const ilShake = (t) => { for (const [h, a] of IL_SHAKE) if (t >= h && t < h + 0.25) return a * Math.sin((t - h) * 90) * (1 - (t - h) / 0.25); return 0; };
function ilWipe(ctx, t, c, col = C.yellow) { if (!ilIn(t, c - 0.22, c + 0.22)) return; const u = (t - c + 0.22) / 0.44, x = K.lerp(1500, -800, u);
  shape(ctx, [[x, -20], [x + 560, -20], [x + 300, 1250], [x - 260, 1250]], col, { lw: 12, seed: 3, dot: col === C.yellow ? C.red : C.white, pitch: 12, rad: 0.22, da: 0.5 }); }
function ilWhip(ctx, t, c) { if (!ilIn(t, c - 0.15, c + 0.15)) return; const a = 1 - Math.abs(t - c) / 0.15; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.white; ctx.fillRect(0, 0, 1000, 1230); for (let i = 0; i < 16; i++) seg(ctx, -50, 60 + i * 75, 1050, 60 + i * 75 + 20, 6, C.black, 0); ctx.restore(); }
// the open letter's panel rect (from the neighbour's page in the street)
function ilPageRect(W, cam) { const p = W.page || [585, 760], s = 0.55, a = ilP(p[0] - 45 * s, p[1] - 60 * s, cam), b = ilP(p[0] + 45 * s, p[1] + 60 * s, cam); return [a[0], a[1], b[0], b[1]]; }

const SCENE = {
  duration: IL_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = ilShake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh, py - sh * 0.6); ctx.scale(pw / 1000, ph / 1230);
    const sc = ilScene(t); let R;
    if (sc === 'letter' && t < 106.9) { R = ilWorld(ctx, 'street', t); const r0 = ilPageRect(R.W, R.cam), open = ilE(t, 106.26, 0.6); const ix = ilLFRect(open, r0);
      ctx.save(); ctx.beginPath(); ctx.rect(ix[0], ix[1], ix[2] - ix[0], ix[3] - ix[1]); ctx.clip(); ctx.translate(ix[0], ix[1]); ctx.scale((ix[2] - ix[0]) / 1000, (ix[3] - ix[1]) / 1230); ilLetterWorld(ctx, t); ctx.restore(); ilLetterFrame(ctx, open, r0); R = { W: {}, cam: ilK(500, 615, 1) }; }
    else if (sc === 'letter') { ilLetterWorld(ctx, t); ilLetterFrame(ctx, 1, [0, 0, 1000, 1230]); ilWomanInset(ctx, t, 132, 138, 74); R = { W: {}, cam: ilK(500, 615, 1) }; }
    else if (sc === 'street' && t >= 118.08 && t < 118.6) { R = ilWorld(ctx, 'street', t); const r0 = ilPageRect(R.W, R.cam), open = 1 - ilE(t, 118.08, 0.5), ix = ilLFRect(open, r0);
      ctx.save(); ctx.beginPath(); ctx.rect(ix[0], ix[1], ix[2] - ix[0], ix[3] - ix[1]); ctx.clip(); ctx.translate(ix[0], ix[1]); ctx.scale((ix[2] - ix[0]) / 1000, (ix[3] - ix[1]) / 1230); ilLetterWorld(ctx, 118.07); ctx.restore(); ilLetterFrame(ctx, open, r0); }
    else R = ilWorld(ctx, sc, t);
    if (ilIn(t, 62.45, 64.35)) ilInsert(ctx, t, S);
    ilOver(ctx, t, sc, R.cam, R.W, S);
    ilWipe(ctx, t, 13.34); ilWipe(ctx, t, 28.7, C.blue); ilWipe(ctx, t, 86.06); ilWhip(ctx, t, 124.32);
    if (t >= 42.42 && t < 44.22) S.transition(ctx, 1000, 1230, (t - 42.42) / 1.8, { caption: 'ONE DAY...' });
    if (t < 0.4) { ctx.save(); ctx.globalAlpha = 1 - ilE(t, 0, 0.4); ctx.fillStyle = IL_PAPER; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's six effects only, in the narration gaps (5.62-5.94, 8.72-9.28, 20.66-21.24, 161.52-161.84) and after the last word (169.26)
    k.bed(S.sfx.bed, 0, IL_DUR, 0.5);
    k.play('pop', 5.78, { gain: 0.35 });                    // the mask comes on
    k.play('chime', 9.0, { note: 'E6', gain: 0.4 });         // the idea
    k.play('pluck', 20.95, { gain: 0.4 });                   // the turban wobble (boing)
    k.play('pop', 161.68, { gain: 0.3 });                    // carry on
    k.play('tick', 169.42, { gain: 0.35 });                  // the turban slides down (soft tap)
    k.play('chime', 170.3, { note: 'C6', gain: 0.55 });      // THE END
  },
};
window.SCENE = SCENE;
