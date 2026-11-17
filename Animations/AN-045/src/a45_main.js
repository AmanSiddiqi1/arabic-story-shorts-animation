// ===== AN-045 The Thief and His Monkey: scene table, camera, transitions, lettering, sound =====
// Every scene: [start, end, world width, camera keys [t, x, y, zoom], draw function name, overlay function name]
const A45_SCENES = [
  [0, 10.4, 1800, [[0, 500, 615, 1.0], [4.9, 500, 615, 1.0], [8.3, 580, 720, 1.5], [10.4, 580, 720, 1.5]], 'a45S1', 'a45O1'],
  [10.4, 21.1, 1800, [[10.4, 580, 720, 1.5], [11.2, 520, 700, 1.3], [14.6, 700, 700, 1.3], [17.6, 700, 700, 1.3], [18.3, 615, 720, 1.8], [21.1, 615, 720, 1.8]], 'a45S2', 'a45O2'],
  [21.1, 34.8, 1800, [[21.1, 1330, 650, 1.1], [25.4, 1330, 650, 1.1], [25.75, 1345, 740, 2.2], [27.1, 1345, 740, 2.2], [27.5, 1300, 650, 1.25], [34.8, 1300, 650, 1.25]], 'a45S3', 'a45O3'],
  [34.8, 42.0, 1800, [[34.8, 1310, 720, 1.5], [42.0, 1310, 720, 1.5]], 'a45S4', 'a45O4'],
  [42.0, 54.2, 1800, [[42.0, 1300, 720, 1.35], [51.4, 1330, 720, 1.4], [54.2, 1345, 720, 1.4]], 'a45S5', 'a45O5'],
  [54.2, 63.4, 1800, [[54.2, 1250, 720, 1.4], [56.4, 1180, 760, 1.9], [61.6, 1180, 760, 1.9], [62.3, 1250, 700, 1.3], [63.4, 1250, 700, 1.3]], 'a45S6', 'a45O6'],
  [63.4, 72.1, 1000, [[63.4, 500, 650, 1.1], [68.4, 500, 650, 1.1], [69.1, 500, 740, 1.7], [72.1, 500, 740, 1.7]], 'a45S7', 'a45O7'],
  [72.1, 84.6, 1000, [[72.1, 500, 740, 1.6], [79.4, 500, 740, 1.6], [79.9, 500, 760, 2.0], [83.0, 500, 760, 2.0], [83.4, 480, 740, 1.7], [84.6, 480, 740, 1.7]], 'a45S8', 'a45O8'],
  [84.6, 98.7, 1800, [[84.6, 500, 650, 1.1], [89.9, 500, 650, 1.1], [90.5, 520, 700, 1.4], [98.7, 520, 700, 1.4]], 'a45S9', 'a45O9'],
  [98.7, 105.0, 1800, [[98.7, 560, 720, 1.4], [100.2, 560, 720, 1.4], [100.8, 600, 560, 1.4], [105.0, 600, 560, 1.4]], 'a45S10', 'a45O10'],
  [105.0, 119.2, 1800, [[105.0, 560, 700, 1.25], [107.2, 560, 700, 1.25], [107.7, 590, 720, 1.7], [111.0, 590, 720, 1.7], [111.5, 540, 640, 1.3], [119.2, 540, 680, 1.3]], 'a45S11', 'a45O11'],
  [119.2, 125.3, 1800, [[119.2, 600, 660, 1.2], [124.8, 1400, 660, 1.2], [125.3, 1420, 660, 1.2]], 'a45S12', 'a45O12'],
  [125.3, 134.5, 1000, [[125.3, 520, 700, 1.25], [134.5, 520, 700, 1.25]], 'a45S13', 'a45O13'],
  [134.5, 145.8, 1000, [[134.5, 520, 700, 1.25], [145.8, 560, 660, 1.6]], 'a45S14', 'a45O14'],
  [145.8, 156.1, 1000, [[145.8, 590, 700, 1.6], [150.2, 590, 700, 1.6], [150.9, 520, 680, 1.3], [156.1, 520, 680, 1.3]], 'a45S15', 'a45O15'],
  [156.1, 160.4, 1000, [[156.1, 300, 700, 1.3], [160.4, 700, 700, 1.3]], 'a45S16', 'a45O16'],
  [160.4, 171.5, 1000, [[160.4, 480, 720, 1.4], [166.8, 500, 720, 1.6], [168.0, 520, 700, 1.25], [171.5, 520, 700, 1.25]], 'a45S17', 'a45O17'],
];
const a45Scene = (t) => A45_SCENES.find((s) => t < s[1]) || A45_SCENES[A45_SCENES.length - 1];
function a45Cam(sc, t) { const k = sc[3], i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, sc[2] - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const a45P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// lettering helpers in panel space (view 1000 x 1230)
function a45Letters(ctx, t, S) { return {
  lab: (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a45Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, A45B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); },
  arr: (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a45Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, A45B(t, a, 0.4), o); ctx.restore(); },
  word: (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = a45Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); },
  stamp: (txt, x, y, a, b, size = 70, o = {}) => { if (t < a || t >= b) return; const d = t - a, k = d < 0.07 ? 1.6 - 8 * d : 1 + 0.06 * Math.exp(-(d - 0.07) * 10) * Math.cos((d - 0.07) * 30);
    ctx.save(); ctx.globalAlpha = a45Fade(t, a, b, 0.12); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.08); ctx.scale(k, k); ctx.font = K.font(size, BF, 400); const w = ctx.measureText(txt).width + size * 0.6;
    ctx.lineWidth = 9; ctx.strokeStyle = C.red; ctx.strokeRect(-w / 2, -size * 0.62, w, size * 1.2); ctx.fillStyle = 'rgba(255,250,240,0.85)'; ctx.fillRect(-w / 2 + 5, -size * 0.62 + 5, w - 10, size * 1.2 - 10);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText(txt, o.icon ? size * 0.4 : 0, 2); if (o.icon) o.icon(ctx, -w / 2 + size * 0.55, 0); ctx.restore(); },
}; }
// transitions (panel space)
function a45Whip(ctx, t, a, d) { if (!a45In(t, a, a + d)) return; const u = (t - a) / d, k = Math.sin(Math.PI * u); ctx.save(); ctx.globalAlpha = 0.85 * k; ctx.fillStyle = C.paper; ctx.fillRect(0, 0, 1000, 1230); ctx.globalAlpha = k;
  const r = K.rng(9); for (let i = 0; i < 26; i++) { const y = r() * 1230, x = (r() * 1400 - 200) - u * 600; seg(ctx, x, y, x + 300 + r() * 400, y, 6 + r() * 8, C.black, 0); } ctx.restore(); }
function a45Wipe(ctx, t, a, d) { if (!a45In(t, a, a + d)) return; const u = (t - a) / d, x = K.lerp(-700, 1500, u);
  shape(ctx, [[x, -20], [x + 520, -20], [x + 260, 1250], [x - 260, 1250]], C.yellow, { lw: 12, seed: 3, dot: C.red, pitch: 12, rad: 0.22, da: 0.5 }); }
function a45Iris(ctx, t, a, d, cx, cy) { if (t < a) return; const u = K.clamp((t - a) / d), r = K.lerp(900, 0, K.ease.in(u)); ctx.save(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.rect(-10, -10, 1020, 1250); ctx.moveTo(cx + Math.max(0, r), cy); ctx.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2, true); ctx.fill('evenodd'); ctx.restore(); }

const SCENE = {
  duration: A45_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
    const sc = a45Scene(t), cam = a45Cam(sc, t), drawFn = window[sc[4]], overFn = window[sc[5]];
    let r = {}; ctx.save(); K.camera(ctx, 1000, 1230, cam); if (drawFn) r = drawFn(ctx, t, cam) || {}; ctx.restore();
    const L = a45Letters(ctx, t, S); if (overFn) overFn(ctx, t, (x, y) => a45P(x, y, cam), S, r, L, cam);
    a45Whip(ctx, t, 20.95, 0.3); a45Wipe(ctx, t, 63.25, 0.3); a45Wipe(ctx, t, 125.15, 0.3);
    if (t >= 83.6 && t < 85.6) S.transition(ctx, 1000, 1230, (t - 83.6) / 2.0, { caption: 'LATER...' });
    if (t >= 159.9 && t < 160.4 && r.iris) a45Iris(ctx, t, 159.9, 0.5, ...a45P(r.iris[0], r.iris[1], cam));
    if (t >= 168.2) S.title(ctx, 'THE END', 500, 190, A45B(t, 168.2, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's seven quiet effects, all in narration pauses or after the last word (master 0.6 at render)
    k.bed(S.sfx.bed, 0, A45_DUR, 0.5);
    k.play('pop', 3.9, { gain: 0.45 });
    k.play('whoosh', 21.05, { gain: 0.4 });
    k.play('pop', 41.9, { gain: 0.4 });
    k.play('whoosh', 63.35, { gain: 0.4 });
    k.play('thud', 68.75, { gain: 0.45 });
    k.play('thud', 167.75, { gain: 0.5 });
    k.play('chime', 168.5, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
