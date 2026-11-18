// ===== AN-134 main: set per time, camera, panel overlays (lettering, labels, counters, cards), sound, SCENE =====
TIMING.chunks.forEach((c) => { c.en = c.en.replace(/\s*[—–]\s*/g, ', '); });   // display only: a script dash shows as ", "
function hkSet(t) {
  if (t < 30.62) return 'roadA'; if (t < 53.5) return 'garden'; if (t < 58.22) return 'high'; if (t < 85.94) return 'garden'; if (t < 99.1) return 'diagram';
  if (t < 140.4) return 'garden'; if (t < 151.5) return 'treasury'; if (t < 161.66) return 'garden'; return 'roadEnd';
}
// camera keys [t, x, y, zoom]; a cut is two keys 0.01 s apart
const HK_CAM = [
  [0, 430, 740, 1.45], [4.16, 430, 740, 1.45], [4.9, 520, 700, 1.15], [5.94, 520, 700, 1.15], [8.2, 980, 700, 1.15], [8.6, 1060, 650, 1.15], [9.4, 1150, 700, 1.15], [10.65, 1170, 700, 1.15],
  [10.66, 1240, 700, 1.5], [14.0, 1240, 700, 1.6], [18.4, 1240, 700, 1.6], [19.4, 1235, 680, 1.9], [21.81, 1235, 680, 1.9],
  [21.82, 1300, 720, 1.45], [23.0, 1300, 720, 1.45], [24.0, 1400, 720, 1.35], [30.0, 1400, 720, 1.35], [30.61, 1590, 760, 2.4],
  [30.62, 480, 720, 1.5], [31.9, 480, 720, 1.5], [33.3, 500, 700, 1.25], [39.8, 500, 700, 1.25], [40.6, 500, 672, 1.08], [42.83, 500, 672, 1.08],
  [42.84, 520, 760, 1.5], [44.0, 520, 760, 1.5], [44.5, 380, 760, 1.4], [45.0, 380, 760, 1.4], [45.4, 560, 800, 1.6], [50.3, 560, 800, 1.6], [52.4, 640, 800, 1.6], [53.22, 620, 800, 1.6], [53.5, 620, 560, 1.7],
  [53.51, 500, 615, 1.0], [58.21, 500, 615, 1.0],
  [58.22, 600, 700, 1.9], [62.0, 600, 700, 1.9], [62.8, 520, 700, 1.9], [63.4, 520, 700, 1.9], [63.9, 500, 640, 1.6],
  [64.18, 500, 640, 1.6], [74.94, 505, 640, 1.62], [80.3, 505, 640, 1.62], [81.5, 440, 800, 1.7], [83.0, 440, 800, 1.7], [83.6, 560, 640, 1.4], [85.3, 560, 640, 1.4], [85.93, 820, 450, 1.8],
  [85.94, 500, 615, 1.0], [86.6, 500, 615, 1.0], [98.8, 500, 630, 1.03], [99.09, 500, 630, 1.03],   // v2: the slow 3 % push
  [99.1, 320, 760, 1.5], [104.4, 320, 760, 1.5], [105.4, 600, 780, 1.6], [108.55, 600, 780, 1.6],
  [108.56, 500, 650, 1.5], [113.9, 500, 650, 1.5], [115.0, 520, 820, 1.7], [115.05, 520, 820, 1.7], [115.06, 600, 610, 2.6], [117.7, 600, 610, 2.6], [118.3, 500, 700, 1.4], [121.89, 500, 700, 1.4],
  [121.9, 600, 640, 1.6], [123.1, 600, 640, 2.2], [123.6, 600, 640, 2.2], [124.9, 560, 560, 1.5], [128.0, 560, 560, 1.5], [128.4, 400, 680, 1.9], [129.1, 400, 680, 1.9], [129.6, 600, 660, 1.8], [131.17, 600, 660, 1.8],
  [131.18, 600, 620, 1.8], [132.6, 600, 620, 1.8], [133.2, 600, 580, 1.8], [133.8, 600, 580, 1.8], [135.6, 500, 660, 1.15], [136.2, 500, 660, 1.5], [137.67, 500, 660, 1.5],
  [137.68, 680, 680, 1.6], [138.7, 680, 680, 1.6], [139.6, 300, 700, 1.3], [140.1, 300, 700, 1.3], [140.39, 60, 700, 1.3],
  [140.4, 560, 700, 1.2], [141.3, 360, 700, 1.5], [144.4, 360, 700, 1.5], [145.4, 500, 690, 1.15], [151.49, 500, 690, 1.15],
  [151.5, 540, 720, 1.25], [153.6, 540, 720, 1.25], [154.0, 420, 680, 1.7], [155.0, 420, 680, 1.7], [155.4, 345, 720, 1.9], [157.45, 345, 720, 1.9], [158.0, 430, 670, 1.4], [159.6, 430, 670, 1.4], [160.4, 500, 680, 1.3], [161.65, 500, 680, 1.3],
  [161.66, 1500, 700, 1.3], [163.4, 1500, 700, 1.3], [165.2, 900, 680, 1.1], [165.3, 900, 680, 1.1], [166.3, 1560, 720, 1.4], [166.4, 1560, 720, 1.4], [167.0, 1600, 720, 2.4], [168.2, 1600, 720, 2.4],
  [168.8, 1640, 720, 1.5], [172.3, 1640, 720, 1.5], [173.3, 1500, 660, 1.0], [HK_DUR, 1500, 660, 1.0],
].map(([t, x, y, zoom]) => [t, { x, y, zoom }]);
function hkCam(t) {
  const set = hkSet(t), WW = set === 'roadA' || set === 'roadEnd' ? 2200 : 1000, c = K.camAt(HK_CAM, t), z = c.zoom;
  // small breathing drift on the long two-shots
  if (t > 64.18 && t < 85.3) { c.x += 4 * Math.sin(t * 0.6); c.zoom *= 1 + 0.01 * Math.sin(t * 0.45); }
  return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: c.zoom };
}
const hkTP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// a label chip with an arrow to a world point (panel coordinates for the chip)
function hkLabel(ctx, S, t, txt, lx, ly, a, b, to, cam, o = {}) {
  if (t < a || t > b + 0.2) return; const k = hkB(t, a, 0.3, 'lin') * (1 - hkB(t, b, 0.2, 'lin'));
  ctx.save(); ctx.globalAlpha *= K.clamp(k * 3);
  if (to) { const tp = hkTP(to[0], to[1], cam); S.arrow(ctx, [lx + (o.ax || 0), ly + (o.ay ?? 34)], tp, hkB(t, a + 0.15, o.ad || 0.35, 'out'), { bend: o.bend ?? 0.15, width: 18 }); }
  S.label(ctx, txt, lx, ly, hkB(t, a, 0.4, 'lin'), { size: o.size || 34, align: 'center', fill: o.fill || C.white, seed: o.seed || 5 }); ctx.restore();
}
function hkWord(ctx, S, t, txt, x, y, a, b, size = 70, o = {}) { if (t < a || t > b) return; ctx.save(); ctx.globalAlpha *= K.clamp((b - t) / 0.2); sfx(ctx, txt, x, y, size, hkB(t, a, 0.3, 'lin') * 1.0, { fill: o.fill || C.yellow, rot: o.rot ?? -0.06 }); ctx.restore(); }

function hkOverlays(ctx, t, cam, S) {
  // S1 title and the caliph's name
  if (t < 3.6) { ctx.save(); ctx.globalAlpha *= K.clamp((3.4 - t) / 0.25 + 0.0001); S.title(ctx, 'THE CALIPH', 500, 150, hkB(t, 0.3, 0.8, 'lin'), { size: 70, align: 'center' }); S.title(ctx, 'AND THE MERCHANT', 500, 250, hkB(t, 0.55, 0.8, 'lin'), { size: 58, align: 'center' }); ctx.restore(); }
  if (t < 4.1) { const h = hkHead(hkRiderP({ ...walk(hkHX, t, { stride: GAIT.horse * 0.8 }), y: 900, s: 0.8, dir: 1, pal: 0 }, 0.76)); hkLabel(ctx, S, t, 'CALIPH AL HAKIM', 560, 400, 1.3, 3.8, [h[0], h[1] - 50], cam, { ax: -60 }); }
  hkLabel(ctx, S, t, 'THE OWNER', 760, 330, 11.5, 13.2, [1330, 680], cam, { ax: 20 });
  // S4
  hkLabel(ctx, S, t, 'ROOM FOR EVERYONE', 500, 300, 40.0, 41.6, [700, 950], cam, { bend: -0.2 });
  // S5 BRRR!
  if (t > 49.6 && t < 50.6) { const p = hkTP(880, 860, cam); hkWord(ctx, S, t, 'BRRR!', p[0] + 40, p[1] - 30, 49.7, 50.6, 56, { fill: TEAR }); }
  // S6 counter and tags
  if (t >= 53.9 && t < 58.22) { const n = hkFeastN(t); ctx.save(); const k = 1 + (t >= 56.32 && t < 56.42 ? 0.22 : 0); ctx.translate(200, 175); ctx.scale(k, k); S.counter(ctx, n, 0, 0, hkB(t, 53.9, 0.3, 'lin'), { size: 84 }); ctx.restore();   // v2: no second "100!" burst; a one-frame slam on مئة
    if (t > 57.6) hkHighBlocks(t).forEach(([, x], i) => { const p = hkHighP(x, 1075, t); S.label(ctx, '100', K.clamp(p[0], 120, 880), p[1], hkB(t, [57.6, 57.75, 57.9][i], 0.3, 'lin'), { size: 40, align: 'center', fill: C.yellow, seed: 20 + i }); }); }
  // S7 / S8 lettering
  if (t > 73.8 && t < 75.0) { S.label(ctx, 'DID YOU KNOW?', 240, 610, hkB(t, 73.8, 0.35, 'lin') * K.clamp((75.0 - t) / 0.2), { size: 46, align: 'center', fill: C.yellow, seed: 31 }); }
  if (t > 77.5 && t < 79.3) { const p = hkHead(hkMer(t)), q = hkTP(p[0], p[1], cam); hkWord(ctx, S, t, 'NO IDEA!', q[0], q[1] - 150, 77.5, 79.3, 84, { fill: C.yellow, rot: -0.08 }); }   // v2: larger, over the owner's own head
  hkLabel(ctx, S, t, 'JUST THE DAILY ROUTINE', 500, 330, 81.6, 84.9, [520, 990], cam, { ad: 1.0, bend: -0.15 });
  // S9 diagram labels and counter
  hkLabel(ctx, S, t, 'HIS HOUSE', 280, 130, 88.7, 90.8, hkDG(300, 250), cam, { ax: 40 });
  if (t >= 89.92 && t < 99.1) { const n = hkDiagN(t); ctx.save(); const k = 1 + 0.25 * hkPulse(t, 90.84, 0.4); ctx.translate(820, 150); ctx.scale(k, k); S.counter(ctx, n, 0, 0, hkB(t, 89.92, 0.3, 'lin'), { size: 80 }); ctx.restore(); }
  if (t > 93.78 && t < 99.1) S.label(ctx, 'EVERY DAY', 820, 262, hkB(t, 94.0, 0.35, 'lin'), { size: 36, align: 'center', fill: C.yellow, seed: 33 });
  // each tag lands beside its own part of the heap (as its first icons arrive)
  HK_WAVES.forEach(([, a, hx], i) => { const ta = a + HK_WTRAV; if (t > ta && t < 99.1) { const p = hkTP(...hkDG(hx, 1000), cam); S.label(ctx, ['FOOD', 'DRINK', 'COMFORTS'][i], p[0], p[1], hkB(t, ta, 0.35, 'lin'), { size: 34, align: 'center', fill: [C.red, TEAR, C.yellow][i], seed: 40 + i }); } });
  if (t > 93.0 && t < 94.6) { const a = hkTP(...hkDG(780, 330), cam), b = hkTP(...hkDG(420, 860), cam); S.arrow(ctx, a, b, hkB(t, 93.0, 0.35, 'out'), { bend: 0.25, width: 16 }); }
  // S10
  if (t > 99.1 && t < 101.3) hkReplay(ctx, t);
  hkLabel(ctx, S, t, 'THE USUAL', 330, 190, 102.88, 104.3, null, cam);   // v2 (review note 12): the chain arrow arcs above the heads
  if (t > 102.88 && t < 104.3) { const a = hkTP(120, 610, cam), b = hkTP(560, 610, cam); S.arrow(ctx, a, b, hkB(t, 102.95, 0.6, 'out'), { bend: -0.18, width: 16 }); }
  // S11 day cards and labels
  if (t > 118.58 && t < 121.0) { const a = hkTP(830, 500, cam), b = hkTP(420, 690, cam); ctx.save(); ctx.globalAlpha *= K.clamp((121.0 - t) / 0.2); S.arrow(ctx, a, b, hkB(t, 118.6, 0.5, 'out'), { bend: 0.3, width: 16 }); ctx.restore(); }
  if (t > 120.34 && t < 122.2) { const fade = K.clamp((122.2 - t) / 0.3); [['#ffe9a8', C.yellow], [C.blue, '#3f7be6'], ['#e2701a', C.red]].forEach(([bg, dt], i) => { const k = hkPop(t, 120.34 + i * 0.12, 0.3); if (k <= 0) return; const cx = 190 + i * 310, cy = 180; ctx.save(); ctx.globalAlpha *= fade; ctx.translate(cx, cy); ctx.scale(k, k); ctx.rotate((i - 1) * 0.03);
      ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(-102, -77, 220, 170); ctx.fillStyle = bg; ctx.fillRect(-110, -85, 220, 170); ctx.fillStyle = dotPat(ctx, dt, 10, 0.3); ctx.fillRect(-110, -85, 220, 170);
      if (i < 2) sun(ctx, 60, -45, 0); ctx.save(); ctx.scale(0.25, 0.25); sun(ctx, 0, 0, 0); ctx.restore(); ctx.fillStyle = HK_LAWN; ctx.fillRect(-110, 30, 220, 55); hkSprite(ctx, 'fruit', -55, 70, 0.55); hkSprite(ctx, 'dome', 0, 70, 0.55); hkSprite(ctx, 'jugs', 55, 70, 0.55);
      ink(ctx, K.rectPts(-110, -85, 220, 170), 6, 810 + i); ctx.restore(); });
    if (t > 120.7) { ctx.save(); ctx.globalAlpha *= fade; S.label(ctx, 'AN ORDINARY DAY', 500, 320, hkB(t, 120.7, 0.35, 'lin'), { size: 40, align: 'center', fill: C.yellow, seed: 35 }); ctx.restore(); } }
  // S12 / S13
  hkLabel(ctx, S, t, 'THIS MERCHANT', 560, 330, 128.2, 129.1, [400, 700], cam, { ax: -40 });
  hkLabel(ctx, S, t, 'ONE OF HIS PEOPLE', 420, 330, 136.2, 137.5, [400, 760], cam, { ax: -20 });
  // S15 treasury
  hkLabel(ctx, S, t, 'STATE TREASURY', 500, 140, 140.7, 142.15, null, cam);
  if (t >= 142.22 && t < 144.4) hkInsert(ctx, t, S);
  hkLabel(ctx, S, t, "THIS YEAR'S COINS", 500, 300, 144.45, 145.35, [340, 830], cam, { ax: -80 });
  if (t >= 145.42 && t < 151.5) { ctx.save(); const k = 1 + 0.25 * hkPulse(t, 150.38, 0.45) + 0.12 * hkPulse(t, 147.7, 0.35); ctx.translate(500, 196); ctx.scale(k, k); ctx.letterSpacing = '6px'; S.counter(ctx, hkCount(t), 0, 0, hkB(t, 145.42, 0.3, 'lin'), { size: 104 }); if (t > 148.5) hkSevenBar(ctx, hkCount(t), 104); ctx.restore();
    if (t > 150.38) S.label(ctx, 'DIRHAMS', 500, 340, hkB(t, 150.38, 0.3, 'lin'), { size: 44, align: 'center', fill: C.yellow, seed: 36 }); }   // v2: no WOW! burst over the climax number (review note 1)
  // S16
  if (t > 154.3 && t < 155.4) hkWord(ctx, S, t, 'ALL OF IT!', 430, 240, 154.3, 155.4, 80, { fill: C.yellow });   // v2: inside the panel, above the chests, left of the rays
  if (t > 154.12 && t < 155.1) { const a = hkTP(740, 590, cam), b = hkTP(250, 560, cam); S.arrow(ctx, a, b, hkB(t, 154.15, 0.7, 'out'), { bend: -0.3, width: 18 }); }   // v2: arcs over the heads
  if (t > 160.0 && t < 160.9) { const p = hkTP(740, 760, cam); hkWord(ctx, S, t, 'AND MORE!', p[0], p[1] - 190, 160.05, 160.9, 64, { fill: C.yellow }); }
  // S17
  // v2 (review note 2): the label points only at the goblet; the moral arrow starts at the goblet and comes down on the chests, clear of every head
  if (t > 167.1 && t < 173.0) { const M = hkMerS17(t), g = hkHandW(M, 'L'); hkLabel(ctx, S, t, 'ONE CUP OF WATER', 240, 230, 167.1, 168.25, [g[0] - 6, g[1] - 62], cam, { ax: 60, bend: 0.1 });   // close-up: the cup is left of his face
    hkLabel(ctx, S, t, 'ONE CUP OF WATER', 650, 230, 168.75, 172.9, [g[0] + 6, g[1] - 62], cam, { ax: -60, bend: -0.1 });   // after the turn: the cup is right of his face
    if (t > 168.6) { const a = hkTP(g[0] + 26, g[1] - 52, cam), b = hkTP(1830, 800, cam); ctx.save(); ctx.globalAlpha *= K.clamp((173.0 - t) / 0.3); S.arrow(ctx, a, b, hkB(t, 168.6, 0.8, 'out'), { bend: -0.35, width: 20 }); ctx.restore(); } }
  if (t > 169.44 && t < 173.0) { ctx.save(); ctx.globalAlpha *= K.clamp((173.0 - t) / 0.3); S.label(ctx, '3,700,000 DIRHAMS', 715, 440, hkB(t, 169.44, 0.4, 'lin'), { size: 40, align: 'center', fill: C.yellow, seed: 37 }); ctx.restore(); }
  // whips (smear lines) and the LATER card
  for (const [a, d, dx] of [[85.3, 0.64, 1], [140.1, 0.3, -1]]) if (t > a && t < a + d) hkSmear(ctx, t, (t - a) / d, dx);
  if (t > 151.0 && t < 152.0) S.transition(ctx, 1000, 1230, (t - 151.0) / 1.0, { caption: 'LATER...' });
  if (t >= 173.3) S.title(ctx, 'THE END', 500, 200, hkB(t, 173.3, 0.8, 'lin'), { size: 86, align: 'center' });
}
// v2 (review note 1): a continental cross-bar on every 7 of the counter so 3,700,000 cannot be read as 3,100,000 (call inside the counter's transform)
function hkSevenBar(ctx, v, size) {
  const sz = size * K.layout(ctx.canvas.width, ctx.canvas.height).s, txt = K.fmt(v); ctx.save(); ctx.font = K.font(sz, 'Bangers', 400);
  const tw = ctx.measureText(txt).width, yc = -sz * 0.33;
  for (let i = 0; i < txt.length; i++) if (txt[i] === '7') { const x0 = -tw / 2 + ctx.measureText(txt.slice(0, i)).width, w7 = ctx.measureText('7').width, xc = x0 + w7 * 0.42 + sz * 0.13;
    ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xc - sz * 0.2, yc); ctx.lineTo(xc + sz * 0.14, yc); ctx.lineWidth = sz * 0.12; ctx.strokeStyle = C.white; ctx.stroke(); ctx.lineWidth = sz * 0.065; ctx.strokeStyle = C.black; ctx.stroke(); }
  ctx.restore(); }
function hkSmear(ctx, t, u, dx) { const R = K.rng(9); ctx.save(); ctx.globalAlpha = 0.55 * Math.sin(Math.PI * u); ctx.strokeStyle = C.white; ctx.lineCap = 'round';
  for (let i = 0; i < 16; i++) { const y = R() * 1230, x = R() * 1000, L = 200 + R() * 300; ctx.lineWidth = 6 + R() * 10; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - dx * L, y + (dx > 0 ? L * 0.4 : 0)); ctx.stroke(); } ctx.restore(); }

const SCENE = {
  duration: HK_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const sh = K.spring(t, 151.9, 3, 14, 8);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);
    const cam = hkCam(t), set = hkSet(t);
    ctx.save(); K.camera(ctx, 1000, 1230, cam);
    if (set === 'roadA') hkRoadA(ctx, t, cam); else if (set === 'roadEnd') hkRoadEnd(ctx, t, cam); else if (set === 'garden') hkGarden(ctx, t, cam);
    else if (set === 'high') hkHigh(ctx, t, cam); else if (set === 'diagram') hkDiagram(ctx, t, cam); else hkTreasury(ctx, t, cam);
    ctx.restore();
    if (t < 0.6) { ctx.save(); ctx.globalAlpha = 1 - hkB(t, 0, 0.6); ctx.fillStyle = C.paper; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
    hkOverlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's twelve quiet effects, each inside a measured narration pause (master 0.6 at render)
    k.play('thud', 5.75, { gain: 0.35 });
    k.play('pop', 20.9, { gain: 0.4 }); k.play('chime', 21.4, { note: 'E6', gain: 0.35 });
    k.play('pop', 79.34, { gain: 0.4 });
    k.play('whoosh', 85.58, { gain: 0.3 });
    k.play('chime', 130.3, { note: 'G5', gain: 0.35 }); k.play('thud', 130.85, { gain: 0.4 });
    k.play('pop', 137.45, { gain: 0.35 });
    k.play('whoosh', 151.2, { gain: 0.3 }); k.play('thud', 151.6, { gain: 0.45 });
    k.play('chime', 173.45, { note: 'C6', gain: 0.45 }); k.play('pop', 174.3, { gain: 0.35 });
  },
};
window.SCENE = SCENE;
