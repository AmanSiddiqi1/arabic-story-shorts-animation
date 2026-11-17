// ===== AN-113 main: world dispatch, balloons and icons (world), camera, lettering (panel), sound =====
const PM_CAM = [[0, 500, 615, 1.0], [3.3, 500, 615, 1.0], [5.6, 600, 740, 1.25], [8.97, 600, 740, 1.25],
  [8.98, 528, 640, 1.5], [15.83, 528, 640, 1.5],
  [15.84, 420, 700, 1.05], [16.6, 420, 700, 1.05], [17.6, 490, 700, 1.35], [21.0, 490, 700, 1.35], [22.6, 520, 700, 1.5], [23.4, 520, 700, 1.5], [24.3, 430, 730, 1.45], [29.41, 430, 730, 1.45],
  [29.42, 385, 740, 1.45], [33.0, 450, 740, 1.45], [33.69, 450, 740, 1.45],
  [33.7, 565, 700, 1.15], [37.0, 565, 700, 1.15], [39.2, 580, 760, 1.6], [42.85, 580, 760, 1.6],
  [42.86, 300, 760, 1.4], [43.4, 300, 760, 1.4], [45.5, 420, 760, 1.55], [52.85, 420, 760, 1.55],
  [52.86, 470, 760, 1.55], [54.0, 470, 760, 1.55], [56.6, 550, 760, 1.3], [64.83, 550, 760, 1.3],
  [64.84, 520, 760, 1.7], [68.9, 520, 760, 1.7], [69.4, 500, 765, 1.95], [73.0, 500, 765, 1.95], [73.6, 530, 760, 1.7], [74.43, 530, 760, 1.7],
  [74.44, 530, 750, 1.55], [82.5, 530, 750, 1.55], [83.6, 480, 740, 1.25], [86.34, 480, 740, 1.25],
  [86.35, 450, 760, 1.4], [89.6, 450, 760, 1.4], [90.6, 480, 760, 1.65], [96.6, 480, 760, 1.65], [97.3, 520, 770, 1.8], [100.09, 520, 770, 1.8],
  [100.1, 560, 760, 1.8], [103.6, 560, 760, 1.8], [105.3, 500, 690, 1.05], [109.33, 500, 690, 1.05],
  [109.34, 430, 700, 1.05], [111.0, 430, 700, 1.05], [112.8, 520, 700, 1.4], [117.91, 520, 700, 1.4],
  [117.92, 520, 700, 1.4], [119.0, 450, 705, 1.4], [125.4, 450, 705, 1.4], [125.9, 440, 735, 1.7], [128.5, 440, 735, 1.7], [128.9, 440, 705, 1.4], [131.91, 440, 705, 1.4],
  [131.92, 520, 740, 1.35], [136.3, 520, 740, 1.35], [138.9, 480, 760, 1.7], [139.19, 480, 760, 1.7],
  [139.2, 500, 620, 1.1], [143.64, 500, 620, 1.1], [144.2, 500, 620, 1.133], [148.82, 500, 620, 1.133], [149.4, 500, 620, 1.166], [154.34, 500, 620, 1.166], [155.2, 500, 620, 1.1], [165.33, 500, 620, 1.1],
  [165.34, 480, 700, 1.8], [171.7, 480, 700, 1.8], [174.3, 520, 700, 1.3], [PM_DUR + 1, 520, 700, 1.3]];
function pmCam(t) { const k = PM_CAM, i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  if (t >= 29.42 && t < 33.7) c.x = K.clamp(pmManS4(t).x + 180, 345, 470);   // S4 tracks the walk
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, 1000 - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const pmP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- world ----------
function pmWorld(ctx, t) {
  if (t < 15.84) pmHomeMorning(ctx, t);
  else if (t < 29.42) pmFriendHouse1(ctx, t);
  else if (t < 109.34) pmMarketScene(ctx, t);
  else if (t < 131.92) pmFriendHouse2(ctx, t);
  else pmHomeDusk(ctx, t);
  pmWorldIcons(ctx, t);
}
// speech balloon with a picture inside (world units)
function pmBalloon(ctx, x, y, w, h, tail, p, inner) { const k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0.01) return; bubble(ctx, x, y, w, h, tail[0], tail[1], p, null); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); inner(ctx); ctx.restore(); }
function pmQ(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = K.font(70 * s, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 8 * s; ctx.strokeStyle = C.black; ctx.strokeText('?', x, y); ctx.fillStyle = C.red; ctx.fillText('?', x, y); ctx.restore(); }
function pmHands(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const sd of [-1, 1]) { shape(ctx, [[sd * 6, 0], [sd * 34, -8], [sd * 40, -26], [sd * 10, -14]], C.white, { lw: 3.5, seed: 650, dot: C.skin, pitch: 5, rad: 0.3 }); } ctx.restore(); }
function pmWorldIcons(ctx, t) {
  // S6: the question about his father; the colour drains (51.32)
  if (pmIn(t, 48.18, 52.86)) { const k1 = pmKinS6(0, t); pmBalloon(ctx, 470, 430, 230, 170, pmMouth(k1), pmB(t, 48.18, 0.4, 'lin') * (1 - pmB(t, 52.6, 0.25, 'lin')), (c) => {
    pmMedal(c, -24, 0, 56, PM_FATHER, { grey: pmB(t, 51.32, 0.5) }); pmQ(c, 66, 0, 1, 1 - pmB(t, 51.32, 0.5)); }); }
  // S7: his face and the father's, compared; ? flips to a tick (61.26)
  if (pmIn(t, 54.4, 64.3)) { const a = pmFade(t, 54.4, 64.3, 0.3), sl = pmB(t, 54.4, 0.3, 'out'); ctx.save(); ctx.globalAlpha = a;
    pmMedal(ctx, 500, 420, 58, { costume: 'villager', age: 0.35, mouth: 'smile' }, { p: pmPop(t, 54.4, 0.3) }); pmMedal(ctx, K.lerp(900, 690, sl), 420, 58, PM_FATHER, {});
    ctx.font = K.font(64, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 8; ctx.strokeStyle = C.black; ctx.strokeText('=', 595, 405); ctx.fillStyle = C.yellow; ctx.fillText('=', 595, 405);
    if (t < 61.36) pmQ(ctx, 595, 465, 0.8, t < 61.26 ? 1 : 1 - (t - 61.26) / 0.1); else pmTick(ctx, 595, 470, 1, pmB(t, 61.36, 0.2, 'lin')); ctx.restore(); }
  // S9: the trust (father -> bags -> open hands)
  if (pmIn(t, 75.6, 84.4)) { const k1 = pmKinS8(0, t); pmBalloon(ctx, 375, 455, 310, 200, pmMouth(k1), pmB(t, 75.6, 0.4, 'lin') * (1 - pmB(t, 84.1, 0.25, 'lin')), (c) => {
    pmMedal(c, -100, -6, 52, PM_FATHER, { p: pmPop(t, 75.86, 0.3) }); const u = pmB(t, 76.46, 0.5); if (t > 76.3) { pmBag(c, K.lerp(-50, 70, u), 30, { s: 0.42 }); pmBag(c, K.lerp(-30, 105, u), 34, { s: 0.42 }); }
    if (t > 76.2) pmHands(c, 92, 52, pmPop(t, 76.2, 0.3)); }); }
  // S17: the heir picture struck and replaced by the friend, with a heart
  if (t > 169.32) { const out = pmB(t, 170.9, 0.45), a = 1 - out; if (a > 0.01) { ctx.save(); ctx.globalAlpha = a; pmMedal(ctx, 310 - 200 * out, 470, 70, PM_FATHER, { p: pmPop(t, 169.32, 0.35) }); ctx.restore(); }
    if (t > 171.7) pmMedal(ctx, 310, 470, 70, { ...PM_FRIENDF, wink: pmIn(t, 172.05, 172.4) ? 'R' : undefined }, { p: pmPop(t, 171.7, 0.4) });
    if (t > 172.8) { const b = 1 + 0.15 * (pulse(t, 173.0, 0.22) + pulse(t, 173.4, 0.22)); heart(ctx, 405, 420, 30 * pmPop(t, 172.8, 0.3) * b); } }
}

// ---------- lettering (panel space, view 1000 x 1230) ----------
function pmOverlays(ctx, t, cam, S) {
  const P = (x, y) => pmP(x, y, cam), lab = (txt, wx, wy, a, b, o = {}) => { if (!pmIn(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = pmFade(t, a, b, 0.2); S.label(ctx, txt, x, y, pmB(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); },
    arr = (a0, a1, a, b, o = {}) => { if (!pmIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = pmFade(t, a, b, 0.2); S.arrow(ctx, P(...a0), P(...a1), pmB(t, a, 0.4), { width: 18, ...o }); ctx.restore(); },
    word = (txt, wx, wy, a, b, size = 76, o = {}) => { if (!pmIn(t, a, b)) return; const [x, y] = P(wx, wy); ctx.save(); ctx.globalAlpha = pmFade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  if (t < 2.15) { ctx.save(); ctx.globalAlpha = pmFade(t, -1, 2.15, 0.3); S.title(ctx, 'THE POOR MAN AND', 500, 140, pmB(t, 0.1, 0.6), { size: 56, align: 'center' }); S.title(ctx, 'HIS FRIEND IN NEED', 500, 220, pmB(t, 0.35, 0.6), { size: 62, align: 'center' }); ctx.restore(); }
  word('POOF!', 340, 330, 2.3, 3.2, 84, { rot: -0.08 });
  { const M = t > 25.6 && t < 28.5 ? pmManS3(t) : null; if (M) { const a = pmHandW(M, 'R'); lab('500 DINARS', a[0] + 30, a[1] - 150, 25.64, 28.4, { fill: C.yellow }); arr([a[0] + 30, a[1] - 130], [a[0] - 4, a[1] - 20], 25.75, 28.4, { bend: 0.1, width: 16 }); } }
  if (pmIn(t, 31.4, 33.7)) pmInsetYouth(ctx, t, 720, 360);
  [[385, 44.6, '1'], [290, 44.9, '2'], [200, 45.2, '3']].forEach(([x, a, n]) => word(n, x, 540, a, 46.6, 80, { fill: C.yellow }));
  lab('HIS SON!', 330, 560, 61.26, 63.6, { fill: C.yellow }); arr([420, 585], [548, 770], 61.4, 63.6, { bend: -0.15 });
  word('THUD!', 540, 610, 66.14, 67.1, 86, { rot: -0.1 });
  if (pmIn(t, 69.02, 74.3)) { const v = Math.round(30000 * pmB(t, 69.02, 1.88, 'out') / 100) * 100, pop = 1 + 0.12 * pulse(t, 70.9, 0.25), [x, y] = P(500, 470); ctx.save(); ctx.globalAlpha = pmFade(t, 69.02, 74.3, 0.2); ctx.translate(x, y); ctx.scale(pop, pop); S.counter(ctx, v, 0, 0, pmB(t, 69.02, 0.3), { size: 86 }); ctx.restore(); lab('DINARS', 500, 640, 70.9, 74.3, { size: 44 }); }
  lab('IN TRUST', 375, 590, 78.78, 82.6, { fill: C.yellow });
  arr([470, 470], [520, 712], 82.54, 84.3, { bend: -0.2 });
  lab('THE HEIR', 790, 560, 83.86, 85.5, { fill: C.yellow }); arr([780, 590], [690, 770], 83.95, 85.5, { bend: 0.15 });
  if (t >= 85.5 && t < 87.2) S.transition(ctx, 1000, 1230, (t - 85.5) / 1.7, { caption: 'SOON AFTER...' });
  if (pmIn(t, 93.38, 97.9)) { lab('500', 632, 660, 93.38, 97.9, { size: 54 }); if (t > 97.14) { const [x, y] = P(632, 640); ctx.save(); ctx.globalAlpha = pmFade(t, 93.38, 97.9, 0.2); pmStrike(ctx, x - 52, y + 18, x + 52, y - 18, pmB(t, 97.14, 0.12, 'lin')); ctx.restore(); } }
  if (pmIn(t, 97.7, 100.1)) { const n = PM_LANDS.filter((a) => t >= Math.max(a, 97.7) + 0).length, v = t < 98.78 ? 500 * Math.max(1, Math.min(6, 1 + Math.floor((t - 97.7) / 0.18))) : 3000, [x, y] = P(520, 600), pop = 1 + 0.15 * pulse(t, 98.78, 0.3);
    void n; ctx.save(); ctx.globalAlpha = pmFade(t, 97.7, 100.1, 0.2); ctx.translate(x, y); ctx.scale(pop, pop); S.counter(ctx, v, 0, 0, pmB(t, 97.7, 0.3), { size: 80 }); ctx.restore(); if (t > 98.78) word('!', 640, 560, 98.78, 100.1, 110, { fill: C.red }); }
  if (pmIn(t, 110.4, 112.7)) { const M = pmManS12(t), F = pmFriendS12(t), p = pmPurse12(t, M, F); lab('500', p[0], p[1] - 120, 110.4, 112.7, { size: 52, fill: C.yellow }); }
  if (pmIn(t, 115.74, 117.9)) { const M = pmManS12(t), F = pmFriendS12(t), p = pmPurse12(t, M, F); lab('REPAID?', 560, 470, 115.74, 117.9, { fill: C.yellow }); arr([p[0] + 50, p[1] - 70], [670, 650], 115.74, 117.9, { bend: -0.25 }); }
  lab('A GIFT!', 440, 470, 122.9, 125.0, { fill: C.yellow, size: 54 });
  lab('HIS RELATIVES!', 500, 610, 143.64, 144.55, { fill: C.yellow, size: 50 });
  lab('HIS MOTHER!', 500, 610, 148.82, 149.65, { fill: C.yellow, size: 50 });
  lab('HIS GIFT!', 500, 610, 153.68, 154.4, { fill: C.yellow, size: 50 });
  lab('THE PLAN', 500, 175, 158.98, 161.95, { size: 50 });
  if (pmIn(t, 169.32, 171.3)) { lab('THE HEIR', 310, 585, 169.32, 171.3, { size: 44 }); if (t > 170.78) { const [x, y] = P(310, 570); pmStrike(ctx, x - 90, y + 4, x + 90, y - 22, pmB(t, 170.78, 0.15, 'lin')); } }
  if (t >= 176.5) S.title(ctx, 'THE END', 500, 175, pmB(t, 176.5, 0.8), { size: 84, align: 'center' });
}

const SCENE = {
  duration: PM_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const sh = K.spring(t, 35.62, 3, 12, 8) + K.spring(t, 66.14, 6, 12, 8);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);   // shake the picture only
    const cam = pmCam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); pmWorld(ctx, t); ctx.restore();
    pmOverlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's quiet effects, all in narration pauses or after the last word (master 0.6 at render)
    k.play('pop', 46.4, { gain: 0.4 });
    k.play('chime', 52.5, { note: 'C5', gain: 0.35 });
    k.play('pop', 58.4, { gain: 0.4 });
    k.play('whoosh', 64.3, { dur: 0.3, gain: 0.45 });
    k.play('chime', 108.3, { note: 'E6', gain: 0.45 });
    k.play('whoosh', 109.1, { dur: 0.28, gain: 0.4 });
    k.play('pop', 131.5, { gain: 0.4 });
    k.play('click', 134.5, { gain: 1.2 }); k.play('pop', 134.52, { pitch: 1.6, gain: 0.3 });
    k.play('chime', 176.4, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
