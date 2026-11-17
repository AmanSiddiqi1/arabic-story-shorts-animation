// ===== AN-092 Ali the Persian: scene table, camera, transitions, lettering, sound =====
// Every scene: [start, end, camera keys [t, x, y, zoom], draw function name, overlay function name]. World 1000 x 1230, floor y 900.
const A92_SCENES = [
  [0, 12.34, [[0, 720, 790, 1.85], [4.0, 720, 790, 1.85], [4.4, 690, 740, 1.55], [5.6, 690, 740, 1.55], [5.85, 520, 660, 1.1], [6.35, 520, 660, 1.1], [7.4, 600, 740, 1.5]], 'a92S1', 'a92O1'],   // v2: open close on the Caliph; the wide only 5.85-6.35 before Ja'far runs in
  [12.34, 23.98, [[12.34, 600, 740, 1.5], [13.6, 480, 620, 1.25], [19.6, 480, 620, 1.25], [20.3, 470, 740, 1.4], [21.5, 600, 745, 1.4]], 'a92S2', 'a92O2'],   // v2: two-shot Ali + whole Caliph from 21.5
  [23.98, 26.78, [[23.98, 600, 745, 1.4], [24.6, 600, 745, 1.4], [25.6, 430, 760, 1.85]], 'a92S3', 'a92O3'],
  [26.78, 33.06, [[26.78, 500, 740, 1.6], [28.6, 500, 740, 1.6], [29.1, 470, 770, 1.9], [30.8, 470, 770, 1.9], [31.3, 500, 740, 1.6]], 'a92S4', 'a92O4'],
  [33.06, 46.68, [[33.06, 470, 740, 1.4], [35.4, 470, 740, 1.4], [36.0, 430, 750, 1.5], [39.3, 430, 750, 1.5], [39.6, 450, 760, 1.75], [41.5, 450, 760, 1.75], [42.1, 500, 740, 1.3]], 'a92S5', 'a92O5'],
  // court. v2: the piles get following framings (left list 59.24-70.96, right list 83.2-96.0) with short reaction cuts, the judge's
  // balloon framing, the table-top insert 128.3-135.9 (its own composition, identity camera), the faces cut, the closer toss
  [46.68, 144.92, [[46.68, 500, 615, 1.0], [51.0, 500, 615, 1.0], [51.6, 480, 700, 1.2], [53.7, 480, 700, 1.2], [54.1, 500, 790, 2.2], [54.85, 500, 790, 2.2], [55.4, 480, 700, 1.2], [59.24, 480, 700, 1.2],
    [59.9, 360, 640, 1.45], [60.95, 360, 640, 1.45], [60.95, 500, 690, 2.6], [61.56, 500, 690, 2.6], [61.56, 360, 620, 1.45], [66.4, 360, 565, 1.4], [67.95, 362, 545, 1.38], [67.95, 750, 780, 2.0], [68.65, 750, 780, 2.0],
    [68.65, 364, 535, 1.37], [69.32, 370, 505, 1.35], [70.96, 370, 505, 1.35], [71.7, 500, 790, 1.9], [73.95, 500, 790, 1.9], [73.96, 780, 720, 1.7], [76.86, 780, 720, 1.7], [77.6, 790, 700, 2.0], [80.44, 790, 700, 2.0], [81.1, 500, 615, 1.0],
    [83.2, 500, 615, 1.0], [83.9, 640, 600, 1.45], [87.86, 640, 525, 1.4], [89.52, 640, 485, 1.35], [90.45, 640, 470, 1.32], [90.45, 250, 760, 2.4], [91.15, 250, 760, 2.4], [91.15, 640, 470, 1.32],
    [93.46, 640, 470, 1.32], [93.46, 500, 700, 2.6], [94.16, 500, 700, 2.6], [94.16, 640, 470, 1.32], [95.4, 640, 470, 1.32], [96.0, 500, 615, 1.0],
    [98.4, 500, 615, 1.0], [99.2, 500, 660, 1.3], [108.0, 500, 660, 1.3], [108.6, 500, 520, 1.25], [114.82, 500, 520, 1.25], [115.4, 500, 660, 1.3], [117.3, 500, 660, 1.3], [118.0, 500, 615, 1.0],
    [119.0, 500, 615, 1.0], [121.0, 510, 790, 1.7], [121.84, 510, 790, 1.7], [122.2, 500, 820, 2.3], [124.0, 500, 820, 2.3], [124.5, 500, 700, 1.6], [128.3, 500, 700, 1.6],
    [128.3, 500, 615, 1.0], [135.9, 500, 615, 1.0], [135.9, 500, 690, 1.9], [136.22, 500, 690, 1.9], [136.22, 425, 745, 1.7], [139.96, 425, 745, 1.7], [140.9, 500, 680, 1.1], [141.5, 500, 680, 1.1], [142.5, 480, 700, 1.7]], 'a92Court', 'a92OCourt'],
  [144.92, 155.28, [[144.92, 620, 690, 1.3], [151.5, 620, 690, 1.3], [152.4, 560, 720, 1.4], [153.0, 520, 740, 1.45]], 'a92S13', 'a92O13'],   // v2: two-shot, the Caliph whole
  [155.28, 166.6, [[155.28, 500, 615, 1.0], [166.28, 500, 615, 1.0], [166.59, 500, 700, 1.12]], 'a92S14', 'a92O14'],   // v2: no push-in at 162.6, so the food arc stays clear of the label
  [166.6, A92_DUR + 1, [[166.6, 660, 740, 1.5], [169.5, 500, 615, 1.0]], 'a92S15', 'a92O15'],
];
const a92Scene = (t) => A92_SCENES.find((s) => t < s[1]) || A92_SCENES[A92_SCENES.length - 1];
function a92Cam(sc, t) { const k = sc[2], i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, 1000 - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const a92P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// lettering helpers in panel space (view 1000 x 1230)
function a92Letters(ctx, t, S) { return {
  lab: (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a92Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, A92B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); },
  arr: (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a92Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, A92B(t, a, 0.4), o); ctx.restore(); },
  word: (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a92Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); },
  stamp: (txt, x, y, a, b, size = 70, o = {}) => { if (t < a || t >= b) return; const d = t - a, k = d < 0.07 ? 1.6 - 8 * d : 1 + 0.06 * Math.exp(-(d - 0.07) * 10) * Math.cos((d - 0.07) * 30);
    ctx.save(); ctx.globalAlpha = a92Fade(t, a, b, 0.12); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.08); ctx.scale(k, k); ctx.font = K.font(size, BF, 400); const w = ctx.measureText(txt).width + size * 0.6;
    ctx.lineWidth = 9; ctx.strokeStyle = C.red; ctx.strokeRect(-w / 2, -size * 0.62, w, size * 1.2); ctx.fillStyle = 'rgba(255,250,240,0.85)'; ctx.fillRect(-w / 2 + 5, -size * 0.62 + 5, w - 10, size * 1.2 - 10);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText(txt, 0, 2); ctx.restore(); },
}; }
// page turn to the recap card (a yellow page sweeps across, covering the cut at 155.28)
function a92PageTurn(ctx, t, a, d) { if (!a92In(t, a, a + d)) return; const u = (t - a) / d, x = K.lerp(1300, -900, K.ease.inOut(u));
  shape(ctx, [[x, -20], [x + 1400, -20], [x + 1400, 1250], [x - 300, 1250]], C.yellow, { lw: 12, seed: 3, dot: C.blue, pitch: 16, rad: 0.18, da: 0.5 });
  shape(ctx, [[x, -20], [x - 300, 1250], [x - 180, 1250]], '#e8b25a', { lw: 8, seed: 4 }); }

const SCENE = {
  duration: A92_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const sh = K.spring(t, 87.86, 3, 10, 6) + K.spring(t, 96.9, 5, 11, 6) + (t > 145.3 && t < 148.6 ? 3 * Math.sin(t * 2.5 * Math.PI * 2) * Math.exp(-(t - 145.3) / 1.6) : 0);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);   // shake the picture only
    const sc = a92Scene(t), cam = a92Cam(sc, t), drawFn = window[sc[3]], overFn = window[sc[4]];
    let r = {}; ctx.save(); K.camera(ctx, 1000, 1230, cam); if (drawFn) r = drawFn(ctx, t, cam) || {}; ctx.restore(); r.z = cam.zoom;
    const L = a92Letters(ctx, t, S); if (overFn) overFn(ctx, t, (x, y) => a92P(x, y, cam), S, r, L, cam);
    if (t >= 46.18 && t < 47.18) S.transition(ctx, 1000, 1230, (t - 46.18) / 1.0, { caption: 'TO THE JUDGE!' });
    a92PageTurn(ctx, t, 155.0, 0.56);
    if (t >= 167.67) S.title(ctx, 'THE END', 500, 190, A92B(t, 167.67, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's seven quiet effects, all in narration pauses or after the last word (master 0.6 at render)
    k.bed(S.sfx.bed, 0, A92_DUR, 0.5);
    k.play('pop', 5.3, { gain: 0.4 });
    k.play('chime', 12.08, { note: 'E6', gain: 0.45 });
    k.play('pop', 32.7, { gain: 0.4 });
    k.play('pop', 73.45, { gain: 0.35 });
    k.play('thud', 96.88, { gain: 0.55 });
    k.play('pop', 108.25, { gain: 0.4 });
    k.play('chime', 167.6, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
