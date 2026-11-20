// ===== ALI-01-POPUP main: the book on the desk, the six spreads, page turns, camera, lettering, sound. Loaded last. =====
// Spreads: 1 home 0-15.9 | 2 forest day 15.9-56.5 | 3 forest dusk 56.5-88.9 | 4 cave 88.9-105.0 | 5 hut 105.0-131.8 | 6 road 131.8-143.44
const AB_CAPS = ['One day...', 'Much later...', '', '', ''];
const abCut = (T, a, b) => [[T - 0.005, a], [T + 0.005, b]];
const AB_W1 = { x: 500, y: 615, zoom: 1 }, AB_ROCKCAM = { x: 417, y: 718, zoom: 1.2 };   // wide; rock and its pull-tab together
const AB_CAM = [
  [0, { x: 690, y: 720, zoom: 1.35 }], [0.9, { x: 690, y: 720, zoom: 1.35 }], [1.9, { x: 660, y: 760, zoom: 1.5 }], [4.6, { x: 640, y: 775, zoom: 1.62 }], [6.3, { x: 630, y: 760, zoom: 1.6 }], [7.3, { x: 620, y: 760, zoom: 1.55 }], [8.25, AB_W1],
  [10.9, { x: 500, y: 640, zoom: 1.04 }], [12.0, { x: 400, y: 700, zoom: 1.22 }], [13.9, { x: 400, y: 700, zoom: 1.22 }], [15.0, AB_W1],
  ...abCut(15.9, AB_W1, AB_W1),
  [16.4, AB_W1], [19.3, { x: 554, y: 681, zoom: 1.12 }], [22.4, { x: 600, y: 720, zoom: 1.3 }], [25.6, { x: 640, y: 720, zoom: 1.3 }], [28.0, { x: 720, y: 560, zoom: 1.3 }], [30.7, { x: 725, y: 540, zoom: 1.35 }], [31.6, { x: 735, y: 470, zoom: 1.9 }], [31.9, { x: 735, y: 480, zoom: 1.85 }], [33.2, AB_W1],
  [36.0, { x: 520, y: 640, zoom: 1.06 }], [39.3, AB_W1], [40.4, { x: 330, y: 640, zoom: 1.25 }], [44.55, { x: 350, y: 665, zoom: 1.34 }], [44.95, AB_ROCKCAM], [46.95, AB_ROCKCAM], [47.8, { x: 280, y: 700, zoom: 1.5 }], [48.5, { x: 300, y: 680, zoom: 1.45 }], [49.2, { x: 735, y: 470, zoom: 1.8 }], [49.6, { x: 735, y: 470, zoom: 1.8 }], [50.3, AB_W1],
  [52.95, AB_W1], [53.2, { x: 545, y: 640, zoom: 1.6 }], [54.45, { x: 540, y: 645, zoom: 1.62 }], ...abCut(54.5, { x: 540, y: 645, zoom: 1.62 }, AB_W1),
  ...abCut(56.5, AB_W1, AB_W1),
  [62.5, AB_W1], [63.4, { x: 360, y: 640, zoom: 1.25 }], [65.6, { x: 360, y: 650, zoom: 1.25 }], [66.15, AB_ROCKCAM], [67.7, AB_ROCKCAM], [68.4, AB_W1], [70.2, AB_W1], [71.0, { x: 735, y: 470, zoom: 1.6 }], [71.6, { x: 735, y: 440, zoom: 1.6 }], [73.0, AB_W1],
  [74.6, { x: 640, y: 680, zoom: 1.15 }], [76.6, { x: 740, y: 700, zoom: 1.25 }], [77.9, { x: 690, y: 720, zoom: 1.34 }], [79.6, { x: 400, y: 700, zoom: 1.3 }], [83.9, { x: 410, y: 715, zoom: 1.44 }], [84.85, AB_ROCKCAM], [86.5, AB_ROCKCAM], [87.6, { x: 440, y: 790, zoom: 2.0 }],
  ...abCut(88.9, { x: 440, y: 790, zoom: 2.0 }, { x: 687, y: 780, zoom: 1.6 }),
  [89.6, { x: 687, y: 790, zoom: 1.6 }], [90.75, { x: 660, y: 760, zoom: 1.5 }], [91.45, AB_W1], [95.2, { x: 540, y: 690, zoom: 1.14 }], [95.9, { x: 650, y: 760, zoom: 1.35 }], [97.3, { x: 570, y: 760, zoom: 1.3 }], [98.6, { x: 560, y: 770, zoom: 1.32 }],
  [99.4, { x: 540, y: 790, zoom: 1.9 }], [100.9, { x: 545, y: 795, zoom: 1.92 }], [101.6, { x: 650, y: 740, zoom: 1.3 }], [102.3, { x: 740, y: 770, zoom: 1.5 }], [103.2, { x: 700, y: 750, zoom: 1.35 }], [104.4, AB_W1],
  ...abCut(105.0, AB_W1, { x: 500, y: 700, zoom: 1.1 }),
  [106.0, { x: 560, y: 720, zoom: 1.18 }], [107.0, { x: 520, y: 730, zoom: 1.25 }], [107.8, { x: 520, y: 785, zoom: 1.45 }], [110.3, { x: 510, y: 792, zoom: 1.55 }], [112.6, { x: 520, y: 796, zoom: 1.6 }], [113.3, { x: 583, y: 754, zoom: 1.2 }], [116.8, { x: 600, y: 760, zoom: 1.3 }],
  [117.1, { x: 722, y: 722, zoom: 1.8 }], [117.6, { x: 722, y: 724, zoom: 1.8 }], [118.2, { x: 600, y: 761, zoom: 1.25 }], [120.9, { x: 610, y: 770, zoom: 1.38 }], [122.4, { x: 680, y: 700, zoom: 1.9 }], [123.3, { x: 660, y: 640, zoom: 1.7 }], [126.9, { x: 670, y: 660, zoom: 1.85 }],
  [127.6, { x: 580, y: 770, zoom: 1.3 }], [131.0, { x: 610, y: 790, zoom: 1.55 }],
  ...abCut(131.8, { x: 610, y: 790, zoom: 1.55 }, { x: 667, y: 790, zoom: 1.5 }),
  [133.0, { x: 667, y: 790, zoom: 1.5 }], [134.0, { x: 667, y: 800, zoom: 1.55 }], [135.6, { x: 640, y: 795, zoom: 1.5 }], [136.4, { x: 530, y: 790, zoom: 1.5 }], [137.3, { x: 480, y: 790, zoom: 1.55 }], [137.95, { x: 300, y: 770, zoom: 1.6 }], [138.8, { x: 238, y: 770, zoom: 2.1 }], [140.2, { x: 238, y: 770, zoom: 2.1 }], [AB_DUR, { x: 250, y: 752, zoom: 2.25 }],
];
const abCamAt = (t) => { const c = K.camAt(AB_CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, AB_WW - 500 / z), y: K.clamp(c.y, 615 / z, AB_WH - 615 / z), zoom: z }; };
const abToPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
function abWorld(ctx, t) {
  if (t < AB_TURN[0]) return abHome(ctx, t);
  if (t < AB_TURN[2]) return abForest(ctx, t);
  if (t < AB_TURN[3]) return abCave(ctx, t);
  if (t < AB_TURN[4]) return abHut(ctx, t);
  return abRoad(ctx, t);
}
function abOverlay(ctx, t, cam, S, W) {
  if (t < AB_TURN[0]) return abHomeOver(ctx, t, cam, S, W);
  if (t < AB_TURN[2]) return abForestOver(ctx, t, cam, S, W);
  if (t < AB_TURN[3]) return abCaveOver(ctx, t, cam, S, W);
  if (t < AB_TURN[4]) return abHutOver(ctx, t, cam, S, W);
  return abRoadOver(ctx, t, cam, S, W);
}
// lettering helpers in panel units (the panel is 1000 x 1230 at zoom 1)
const abB = (t, a, d) => K.beat(t, a, d, 'lin');
function abFade(ctx, t, a, b, f = 0.3) { ctx.globalAlpha = K.clamp((t - a) / 0.05) * K.clamp((b - t) / f); }
// a typed bubble whose text arrives in two steps (word 1 at w1, the rest at w2)
function abBubble(ctx, S, text, n1, x, y, to, t, w1, w2, tEnd, o = {}) {
  if (t < w1 - 0.1 || t > tEnd) return; const L = text.length, p1 = 0.15 + 0.6 * (n1 - 0.4) / L;
  const p = t < w2 ? Math.min(p1, 0.15 + (t - w1 + 0.1) * 1.4) : Math.min(1, p1 + (t - w2) * 1.6);
  ctx.save(); abFade(ctx, t, w1 - 0.1, tEnd, 0.3); S.label(ctx, text, x, y, p, { balloon: true, to, size: o.size || 40, tilt: o.tilt ?? -0.02 }); ctx.restore();
}
const SCENE = {
  duration: AB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, THEME.page);
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / AB_WW, ph / AB_WH);
    const cam = abCamAt(t); ctx.save(); K.camera(ctx, AB_WW, AB_WH, cam); abWorld(ctx, t); ctx.restore();
    // guard: the style's balloon label divides by its pop scale, so a label is only drawn once it has visibly begun (p > 0.02)
    const SG = Object.assign(Object.create(S), { label: (c, txt, x, y, p, o) => (p > 0.02 ? S.label(c, txt, x, y, p, o) : { w: 0, h: 0 }) });
    abOverlay(ctx, t, cam, SG, W);
    ctx.restore();
    // page turns: the flyleaf lifting off at the start, then one leaf per turn (hinged at the right edge: an Arabic book)
    if (t < 0.9) S.transition(ctx, W, H, 0.5 + t / 1.8, { rect: [px, py, pw, ph] });
    AB_TURN.forEach((T, i) => { if (t > T - 0.6 && t < T + 0.6) S.transition(ctx, W, H, (t - T + 0.6) / 1.2, { rect: [px, py, pw, ph], caption: AB_CAPS[i] }); });
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);
  },
  score(k, S) {   // sparse paper foley in the pauses only (timeline.md); the narration is the soundtrack
    k.bed(S.sfx.bed, 0, AB_DUR, 0.5);
    k.play('paper', 15.5, { gain: 1.6 }); k.play('pop', 16.2, { gain: 0.5 });
    k.play('tick', 21.85, { gain: 1.2 }); k.play('tick', 22.05, { gain: 0.9 });
    k.play('thud', 33.7, { gain: 0.45 }); k.play('thud', 34.0, { gain: 0.35 });
    k.play('pluck', 49.15, { note: 'E5', dur: 0.5, gain: 0.8 }); k.play('pluck', 49.4, { note: 'B5', dur: 0.5, gain: 0.7 });
    k.play('paper', 56.2, { gain: 1.6 }); k.play('pop', 56.8, { gain: 0.45 });
    k.play('tick', 61.9, { gain: 1.0 }); k.play('tick', 62.15, { gain: 0.9 });
    k.play('pluck', 65.75, { note: 'A4', dur: 0.35, gain: 0.8 });
    k.play('thud', 69.5, { gain: 0.4 }); k.play('thud', 69.8, { gain: 0.3 });
    k.play('tick', 77.3, { gain: 1.0 }); k.play('tick', 77.6, { gain: 0.8 });
    k.play('paper', 88.6, { gain: 1.6 }); k.play('pop', 89.2, { gain: 0.45 });
    k.play('pluck', 94.65, { note: 'G5', dur: 0.4, gain: 0.8 }); k.play('pluck', 94.85, { note: 'D6', dur: 0.4, gain: 0.6 });
    k.play('paper', 104.7, { gain: 1.6 }); k.play('pop', 105.25, { gain: 0.45 });
    k.play('pop', 122.9, { gain: 0.7 }); k.play('pop', 123.15, { gain: 0.5 });
    k.play('pluck', 139.0, { note: 'C5', dur: 0.5, gain: 0.8 }); k.play('paper', 139.25, { gain: 1.2 }); k.play('chime', 139.7, { note: 'C6', gain: 0.6 }); k.play('paper', 140.0, { gain: 1.0 });
  },
};
window.SCENE = SCENE;
