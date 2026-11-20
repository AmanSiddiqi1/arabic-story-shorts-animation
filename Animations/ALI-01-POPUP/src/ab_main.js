// ===== ALI-01-POPUP main: the book on the desk, the six spreads, page turns, camera, lettering, sound. Loaded last. =====
// Spreads: 1 home 0-15.9 | 2 forest day 15.9-56.5 | 3 forest dusk 56.5-88.9 | 4 cave 88.9-105.0 | 5 hut 105.0-131.8 | 6 road 131.8-143.44
const AB_CAPS = ['One day...', 'Much later...', '', '', ''];
const abCut = (T, a, b) => [[T - 0.005, a], [T + 0.005, b]];
const AB_CAM = [
  [0, { x: 690, y: 720, zoom: 1.35 }], [0.9, { x: 690, y: 720, zoom: 1.35 }], [4.6, { x: 500, y: 615, zoom: 1 }], [10.9, { x: 500, y: 640, zoom: 1.04 }], [12.0, { x: 400, y: 700, zoom: 1.22 }], [13.9, { x: 400, y: 700, zoom: 1.22 }], [15.0, { x: 500, y: 615, zoom: 1 }],
  ...abCut(15.9, { x: 500, y: 615, zoom: 1 }, { x: 500, y: 615, zoom: 1 }),
  [19.4, { x: 500, y: 615, zoom: 1 }], [22.4, { x: 600, y: 720, zoom: 1.3 }], [25.6, { x: 640, y: 720, zoom: 1.3 }], [28.0, { x: 720, y: 560, zoom: 1.3 }], [30.7, { x: 725, y: 540, zoom: 1.35 }], [31.6, { x: 735, y: 470, zoom: 1.9 }], [31.9, { x: 735, y: 480, zoom: 1.85 }], [33.2, { x: 500, y: 615, zoom: 1 }],
  [39.3, { x: 500, y: 615, zoom: 1 }], [40.4, { x: 330, y: 640, zoom: 1.25 }], [46.2, { x: 330, y: 650, zoom: 1.25 }], [47.8, { x: 280, y: 700, zoom: 1.5 }], [48.5, { x: 300, y: 680, zoom: 1.45 }], [49.2, { x: 735, y: 470, zoom: 1.8 }], [49.6, { x: 735, y: 470, zoom: 1.8 }], [50.3, { x: 500, y: 615, zoom: 1 }],
  ...abCut(56.5, { x: 500, y: 615, zoom: 1 }, { x: 500, y: 615, zoom: 1 }),
  [62.5, { x: 500, y: 615, zoom: 1 }], [63.4, { x: 360, y: 640, zoom: 1.25 }], [65.5, { x: 360, y: 640, zoom: 1.25 }], [68.2, { x: 500, y: 615, zoom: 1 }], [70.2, { x: 500, y: 615, zoom: 1 }], [71.0, { x: 735, y: 470, zoom: 1.6 }], [71.6, { x: 735, y: 440, zoom: 1.6 }], [73.0, { x: 500, y: 615, zoom: 1 }],
  [74.6, { x: 640, y: 680, zoom: 1.15 }], [76.6, { x: 740, y: 700, zoom: 1.25 }], [77.9, { x: 700, y: 700, zoom: 1.25 }], [79.6, { x: 400, y: 700, zoom: 1.3 }], [86.9, { x: 400, y: 700, zoom: 1.3 }], [87.8, { x: 440, y: 790, zoom: 2.0 }],
  ...abCut(88.9, { x: 440, y: 790, zoom: 2.0 }, { x: 500, y: 615, zoom: 1 }),
  [95.4, { x: 500, y: 615, zoom: 1 }], [96.0, { x: 500, y: 640, zoom: 1.05 }], [97.3, { x: 380, y: 700, zoom: 1.25 }], [98.6, { x: 420, y: 720, zoom: 1.25 }], [100.9, { x: 560, y: 800, zoom: 1.6 }], [101.6, { x: 500, y: 615, zoom: 1 }],
  ...abCut(105.0, { x: 500, y: 615, zoom: 1 }, { x: 500, y: 640, zoom: 1.05 }),
  [107.0, { x: 500, y: 640, zoom: 1.05 }], [107.8, { x: 520, y: 730, zoom: 1.45 }], [112.6, { x: 520, y: 730, zoom: 1.45 }], [113.2, { x: 560, y: 730, zoom: 1.45 }], [113.8, { x: 790, y: 720, zoom: 1.5 }], [116.9, { x: 760, y: 730, zoom: 1.45 }], [117.6, { x: 600, y: 730, zoom: 1.25 }],
  [120.9, { x: 600, y: 730, zoom: 1.25 }], [122.4, { x: 640, y: 700, zoom: 1.9 }], [123.3, { x: 630, y: 640, zoom: 1.7 }], [126.9, { x: 630, y: 640, zoom: 1.7 }], [127.6, { x: 580, y: 720, zoom: 1.3 }],
  ...abCut(131.8, { x: 580, y: 720, zoom: 1.3 }, { x: 500, y: 615, zoom: 1 }),
  [135.8, { x: 500, y: 615, zoom: 1 }], [137.4, { x: 300, y: 760, zoom: 1.6 }], [138.6, { x: 170, y: 770, zoom: 2.1 }], [AB_DUR, { x: 170, y: 770, zoom: 2.1 }],
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
