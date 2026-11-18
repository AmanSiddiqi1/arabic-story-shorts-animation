// ===== AN-046 main: scene table, cameras, transitions, panel shake, lettering pass, sound =====
// Cameras are keyed per scene in world units ({x, y, zoom}); the glade is 1600 wide.
const a46two = (a, b, m = 150, mx = 2.4) => twoShot(a, b, { margin: m, maxZoom: mx });
const A46_SCENES = [
  { id: 'S1', a: 0, b: 11.0, w: 1000, draw: a46s1, over: a46o1, cam: [[0, a46cam(520, 660, 1.12)], [3.6, a46cam(520, 660, 1.12)], [5.2, a46cam(480, 640, 1.45)], [9.4, a46cam(480, 640, 1.45)], [9.9, a46cam(520, 600, 1.15)]] },
  { id: 'S2', a: 11.0, b: 22.0, w: 1000, draw: a46s2, over: a46o2, cam: [[11.0, a46cam(500, 760, 1.25)], [11.18, a46cam(500, 760, 1.25)], [12.4, a46cam(500, 650, 1.15)], [16.0, a46cam(500, 650, 1.15)], [16.6, a46cam(560, 650, 1.25)], [17.3, a46cam(560, 650, 1.25)], [17.7, a46cam(300, 720, 1.7)], [19.4, a46cam(300, 720, 1.7)], [19.9, a46cam(500, 650, 1.15)], [20.9, a46cam(500, 650, 1.15)], [21.6, a46cam(620, 660, 1.3)]] },
  { id: 'S3', a: 22.0, b: 34.0, w: 1000, draw: a46s3, over: a46o3, cam: [[22.0, a46cam(570, 680, 1.3)], [26.2, a46cam(570, 680, 1.3)], [26.5, a46cam(480, 660, 1.12)], [27.6, a46cam(480, 660, 1.12)], [28.2, a46cam(690, 650, 1.5)], [31.3, a46cam(700, 660, 1.6)], [31.62, a46cam(775, 730, 2.35)], [32.62, a46cam(775, 730, 2.35)], [33.3, a46cam(660, 680, 1.35)]] },
  { id: 'S4', a: 34.0, b: 42.0, w: 1000, draw: a46s4, over: a46o4, cam: [[34.0, a46cam(300, 716, 2.0)], [37.5, a46cam(300, 716, 2.0)], [37.9, a46cam(700, 690, 1.6)], [40.8, a46cam(700, 690, 1.6)], [41.2, a46cam(650, 700, 1.3)]] },
  { id: 'S5', a: 42.0, b: 50.3, w: 1000, draw: a46s5, over: a46o5, cam: [[42.0, a46cam(770, 690, 1.75)], [44.6, a46cam(770, 690, 1.75)], [45.1, a46cam(560, 690, 1.15)], [46.4, a46cam(560, 690, 1.15)], [46.9, a46cam(720, 690, 1.75)]] },
  { id: 'S6', a: 50.3, b: 64.7, w: 1600, draw: a46s6, over: a46o6, dream: true, cam: [[50.3, a46cam(300, 560, 2.4)], [51.15, a46cam(300, 560, 2.4)], [51.16, a46cam(900, 700, 1.4)], [54.3, a46cam(900, 700, 1.4)], [54.75, a46cam(620, 660, 1.2)], [55.2, a46cam(620, 660, 1.2)], [55.6, a46cam(800, 720, 1.7)], [57.3, a46cam(800, 720, 1.7)], [57.8, a46cam(650, 770, 1.8)], [60.9, a46cam(720, 770, 1.8)], [62.8, a46cam(720, 770, 1.8)], [63.1, a46cam(870, 760, 1.5)], [63.79, a46cam(870, 760, 1.5)], [63.8, a46cam(300, 560, 2.4)]] },
  { id: 'S7', a: 64.7, b: 72.3, w: 1000, draw: a46s7, over: a46o7, cam: [[64.7, a46cam(700, 650, 1.7)]] },
  { id: 'S8', a: 72.3, b: 84.4, w: 1000, draw: a46s8, over: a46o8, cam: [[72.3, a46cam(760, 640, 1.4)], [77.3, a46cam(760, 640, 1.4)], [81.5, a46cam(770, 620, 1.6)], [82.19, a46cam(770, 620, 1.6)], [82.2, a46cam(700, 650, 1.7)], [84.0, a46cam(660, 650, 1.5)]] },
  { id: 'S9', a: 84.4, b: 99.2, w: 1600, draw: a46s9, over: a46o9, cam: [[84.4, a46cam(380, 600, 1.4)], [87.4, a46cam(380, 600, 1.4)], [87.97, a46cam(560, 640, 1.15)], [92.9, a46cam(560, 640, 1.15)], [93.5, a46cam(700, 620, 1.0)], [95.6, a46cam(900, 620, 1.0)], [96.6, a46cam(1290, 650, 1.4)], [97.6, a46cam(1290, 650, 1.4)], [98.1, a46cam(1045, 547, 0.9)]] },
  { id: 'S10', a: 99.2, b: 107.18, w: 1600, draw: a46s10, cam: [[99.2, a46cam(360, 500, 2.0)], [107.18, a46cam(385, 500, 2.0)]] },
  { id: 'S11', a: 107.18, b: 113.7, w: 1600, draw: a46s11, over: a46o11, cam: [[107.18, a46cam(440, 480, 1.6)], [110.6, a46cam(440, 480, 1.6)], [111.1, a46cam(740, 720, 1.6)], [112.9, a46cam(740, 720, 1.6)], [113.4, a46cam(820, 640, 1.1)]] },
  { id: 'S12', a: 113.7, b: 127.22, w: 1600, draw: a46s12, over: a46o12, cam: [[113.7, a46cam(480, 420, 2.1)], [119.91, a46cam(480, 420, 2.1)], [119.92, a46cam(760, 730, 1.7)], [120.74, a46cam(760, 730, 1.7)], [120.75, a46cam(1100, 800, 2.2)], [121.54, a46cam(1100, 800, 2.2)], [121.55, a46cam(480, 420, 2.1)], [125.5, a46cam(470, 440, 2.4)]] },
  { id: 'S13', a: 127.22, b: 138.4, w: 1600, draw: a46s13, over: a46o13, cam: [[127.22, a46cam(520, 540, 1.3)], [A46_S13.land, a46cam(760, 730, 1.6)], [132.3, a46cam(760, 730, 1.6)], [132.95, a46cam(925, 742, 1.68)]] },
  { id: 'S14', a: 138.4, b: 150.78, w: 1600, draw: a46s14, over: a46o14, cam: [[138.4, a46cam(760, 790, 2.4)], [145.9, a46cam(770, 790, 2.4)], [146.25, a46cam(800, 755, 1.9)], [147.85, a46cam(800, 755, 1.9)], [148.4, a46cam(900, 710, 1.4)]] },
  { id: 'S15', a: 150.78, b: 164.5, w: 1600, draw: a46s15, cam: [[150.78, a46cam(990, 742, 2.2)], [159.0, a46cam(985, 752, 2.35)], [159.4, a46cam(985, 752, 2.35)], [160.4, a46cam(950, 775, 3.2)]] },
  { id: 'S16', a: 164.5, b: A46_DUR + 0.01, w: 1600, draw: a46s16, over: a46o16, camFn: a46s16Cut, cam: [[164.5, a46cam(930, 720, 1.5)], [165.8, a46cam(930, 720, 1.5)], [170.2, a46cam(1120, 720, 1.5)], [170.47, a46cam(1125, 720, 1.5)], [170.48, a46cam(A46_BADGE[0], 820, 2.4)], [171.34, a46cam(A46_BADGE[0], 818, 2.4)], [172.1, a46cam(A46_MTN[0] + 10, 585, 2.3)]] },
];
const a46scene = (t) => A46_SCENES.find((s) => t >= s.a && t < s.b) || A46_SCENES[A46_SCENES.length - 1];
function a46camAt(sc, t) {
  const c = (sc.camFn && sc.camFn(t)) || K.camAt(sc.cam, t), z = c.zoom, lo = z >= 1 ? 615 / z : 615 / z, hi = 1230 - 615 / z;
  return { x: K.clamp(c.x, 500 / z, sc.w - 500 / z), y: z >= 1 ? K.clamp(c.y, lo, hi) : c.y, zoom: z };
}
// panel-only shake on the two hits
const a46shake = (t) => { let s = 0; for (const [tc, a] of [[A46_S6.snap, 9], [A46_S13.net, 11]]) if (t >= tc && t < tc + 0.35) s += a * Math.exp(-(t - tc) * 12) * Math.sin((t - tc) * 70); return s; };
function a46drawScene(ctx, sc, t, S) {
  const cam = a46camAt(sc, t), tp = (x, y) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom];
  ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.draw(ctx, t); ctx.restore();
  if (sc.dream) a46dream(ctx, a46fade(t, sc.a, sc.b, 0.35));
  if (sc.over) sc.over(ctx, t, cam, S, tp);
  return { cam, tp };
}
const SCENE = {
  duration: A46_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = a46shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);
    const sc = a46scene(t);
    a46drawScene(ctx, sc, t, S);
    // transitions: wipe (11.0), irises (50.3, 64.7), dissolve (99.2), the LATER card (107.18)
    if (a46in(t, 10.75, 11.0)) { const p = (t - 10.75) / 0.5; ctx.save(); const x = K.lerp(-500, 1500, K.ease.inOut(p)); K.poly(ctx, [[x + 260, -20], [x, 1250], [-100, 1250], [-100, -20]], true); ctx.clip(); a46drawScene(ctx, A46_SCENES[1], 11.0, S); ctx.restore(); a46wipe(ctx, p); }
    if (a46in(t, 11.0, 11.25)) { const p = (t - 10.75) / 0.5; ctx.save(); const x = K.lerp(-500, 1500, K.ease.inOut(p)); K.poly(ctx, [[x + 260, -20], [x, 1250], [1100, 1250], [1100, -20]], true); ctx.clip(); a46drawScene(ctx, A46_SCENES[0], 10.99, S); ctx.restore(); a46wipe(ctx, p); }
    a46iris(ctx, t, 50.3, 360, 560, 0.3, { after: [500, 660] });
    a46iris(ctx, t, 64.7, 500, 650, 0.3);
    if (a46in(t, 99.2, 99.65)) { ctx.save(); ctx.globalAlpha = 1 - (t - 99.2) / 0.45; a46drawScene(ctx, A46_SCENES[8], 99.19, S); ctx.restore(); }
    if (a46in(t, 106.78, 107.58)) S.transition(ctx, 1000, 1230, (t - 106.78) / 0.8, { caption: 'ANOTHER DAY...' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's six effects, all in measured pauses (silencedetect) or after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, A46_DUR, 0.5);
    k.play('chime', 5.0, { note: 'E6', gain: 0.35 });   // morning (pause 4.81-5.36)
    k.play('chime', 7.9, { note: 'A4', gain: 0.4 });    // evening (pause 7.77-8.28)
    k.play('pop', 21.3, { gain: 0.45 });                // the idea (pause 20.94-22.27)
    k.play('pop', 86.95, { gain: 0.4, pitch: 0.8 });   // HOME (pause 86.62-88.02)
    k.play('thud', 121.15, { gain: 0.35 });             // the eyes in the bush (pause 121.03-121.54; plan 120.8 is inside a word)
    k.play('chime', 172.75, { note: 'C5', gain: 0.6 }); // THE END
  },
};
window.SCENE = SCENE;
