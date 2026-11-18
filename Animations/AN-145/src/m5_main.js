// ===== AN-145 main: scene table, camera, panel shake, lettering dispatch, sound =====
// camera keys [t, x, y, zoom] (eased between keys; two keys 0.01 apart = a cut)
const M5_CAM = [
  [0, 330, 800, 2.0], [5.78, 330, 800, 2.0], [7.9, 500, 615, 1.0], [9.05, 500, 615, 1.0],
  [9.06, 333, 760, 1.5], [11.5, 333, 760, 1.5], [12.6, 540, 470, 1.3], [13.09, 540, 470, 1.3],
  [13.1, 400, 750, 1.5], [18.8, 400, 750, 1.5], [20.1, 480, 770, 1.7], [21.79, 480, 770, 1.7],
  [21.8, 380, 760, 1.5], [26.4, 380, 760, 1.5], [27.2, 560, 590, 1.08], [29.6, 560, 590, 1.08], [30.4, 545, 671, 1.1], [32.95, 545, 671, 1.1],
  [32.96, 667, 770, 1.5], [41.0, 667, 770, 1.5], [42.2, 500, 615, 1.0], [43.19, 500, 615, 1.0],
  [43.2, 500, 615, 1.0], [49.9, 500, 615, 1.0], [50.5, 545, 671, 1.1], [53.67, 545, 671, 1.1],
  [53.68, 500, 615, 1.0], [59.86, 500, 615, 1.0], [61.19, 290, 830, 2.6], [61.2, 500, 615, 1.0], [65.05, 500, 615, 1.0],
  [65.06, 500, 615, 1.0], [66.9, 500, 615, 1.0], [67.8, 560, 695, 1.15], [72.29, 560, 695, 1.15],
  [72.3, 500, 700, 1.25], [79.1, 500, 700, 1.25], [82.3, 500, 690, 1.32], [87.55, 500, 690, 1.32],
  [87.56, 240, 720, 2.3], [93.4, 240, 730, 2.6], [96.11, 240, 730, 2.6], [96.12, 750, 760, 2.0], [97.27, 750, 760, 2.0],
  [97.28, 440, 800, 1.8], [99.0, 440, 800, 1.8], [99.55, 500, 615, 1.0], [101.6, 500, 615, 1.0], [102.3, 450, 760, 1.5], [104.5, 450, 760, 1.5], [105.3, 500, 615, 1.0], [107.65, 500, 615, 1.0],
  [107.66, 500, 615, 1.0], [110.6, 500, 615, 1.0], [111.6, 560, 520, 1.2], [113.3, 560, 520, 1.2], [114.4, 520, 470, 1.9], [116.9, 520, 470, 1.9], [117.04, 560, 730, 3.0], [119.61, 560, 730, 3.0],
  [119.62, 500, 615, 1.0], [124.89, 500, 615, 1.0], [124.9, 500, 560, 1.3], [128.9, 500, 615, 1.0], [129.79, 500, 615, 1.0],
  [129.8, 520, 600, 1.45], [138.42, 520, 600, 1.45], [139.2, 515, 610, 1.7], [142.32, 515, 610, 1.7], [143.3, 520, 600, 1.45], [147.9, 520, 600, 1.45], [148.6, 540, 760, 1.9], [150.34, 540, 760, 1.9], [151.6, 620, 560, 1.2], [152.61, 620, 560, 1.2],
  [152.62, 490, 615, 1.02], [155.82, 490, 615, 1.02], [156.8, 470, 800, 1.6], [160.2, 470, 800, 1.6], [161.2, 500, 738, 1.25], [163.83, 500, 738, 1.25],
  [163.84, 500, 738, 1.25], [165.5, 500, 615, 1.04], [168.98, 500, 615, 1.0], [170.4, 330, 800, 1.9], [172.56, 330, 800, 1.9], [173.6, 500, 615, 1.0], [M5_DUR + 1, 500, 615, 1.0]];
function m5Cam(t) { const k = M5_CAM, i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, 1000 - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const m5ToP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// scene table: [start, end, world(ctx, t, cam), overlay(ctx, t, cam, S, P)]
const M5_SCENES = [[0, 9.06, 'S1'], [9.06, 13.1, 'S2'], [13.1, 21.8, 'S3'], [21.8, 32.96, 'S4'], [32.96, 43.2, 'S5'], [43.2, 53.68, 'S6'], [53.68, 65.06, 'S7'], [65.06, 72.3, 'S8'], [72.3, 87.56, 'S9'],
  [87.56, 97.28, 'S10'], [97.28, 107.66, 'S11'], [107.66, 119.62, 'S12'], [119.62, 129.8, 'S13'], [129.8, 142.32, 'S14'], [142.32, 152.62, 'S15'], [152.62, 163.84, 'S16'], [163.84, 1e9, 'S17']];
const m5Scene = (t) => M5_SCENES.find((s) => t >= s[0] && t < s[1]) || M5_SCENES[M5_SCENES.length - 1];
// panel shake on the three strikes only (S5)
const m5Shake = (t) => [34.76, 35.44, 36.5].reduce((s, h) => s + (t >= h && t < h + 0.6 ? K.spring(t, h, 4, 13, 9) : 0), 0);
// dissolves: the outgoing scene drawn under the incoming one for d seconds
const M5_DISSOLVE = [[107.66, 0.5], [129.8, 0.6], [152.62, 0.7]];

function m5DrawWorld(ctx, t, id) { const f = window['m5' + id]; if (f) f(ctx, t); }
function m5DrawAt(ctx, t, S) { const sc = m5Scene(t), cam = m5Cam(t), P = (x, y) => m5ToP(x, y, cam);
  ctx.save(); K.camera(ctx, 1000, 1230, cam); m5DrawWorld(ctx, t, sc[2]); ctx.restore();
  const o = window['m5O' + sc[2].slice(1)]; if (o) o(ctx, t, cam, S, P); }
const SCENE = {
  duration: M5_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = m5Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh, py - sh * 0.6); ctx.scale(pw / 1000, ph / 1230);
    const dv = M5_DISSOLVE.find(([a, d]) => t >= a && t < a + d);
    if (dv) { m5DrawAt(ctx, dv[0] - 0.001, S); ctx.save(); ctx.globalAlpha = M5B(t, dv[0], dv[1], 'lin'); m5DrawAt(ctx, t, S); ctx.restore(); }
    else m5DrawAt(ctx, t, S);
    if (t >= 64.0 && t < 66.2) S.transition(ctx, 1000, 1230, (t - 64.0) / 2.12, { caption: 'LATER...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's three quiet effects: the wall breaks in the only pause, then THE END (master 0.6 at render)
    k.play('chime', 66.94, { note: 'E6', gain: 0.4 });
    k.play('chime', 173.66, { note: 'C6', gain: 0.55 });
    k.play('whoosh', 175.0, { gain: 0.25 });
  },
};
window.SCENE = SCENE;
