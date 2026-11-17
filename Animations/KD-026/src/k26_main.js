// ===== KD-026 main: world dispatch (road, yard, hut), camera, panel lettering helpers, the card, THE END, sound =====
const K26_CUT1 = 33.34, K26_CUT2 = 63.41;
const k26P = (x, y, cam) => [500 + (x - cam.x) * cam.zoom, 615 + (y - cam.y) * cam.zoom];
function k26Lab(ctx, S, t, txt, x, y, a, b, o = {}) { if (!k26In(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k26Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, k26B(t, a, 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); }
function k26Arr(ctx, S, t, a0, a1, a, b, o = {}) { if (!k26In(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k26Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, k26B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); }
function k26Word(ctx, t, txt, x, y, a, b, size = 70, o = {}) { if (!k26In(t, a, b)) return; ctx.save(); ctx.globalAlpha *= k26Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, k26Pop(t, a, 0.25), o); ctx.restore(); }
function k26Cam(t) {
  const road = t < K26_CUT1, keys = road ? K26_RCAM : t < K26_CUT2 ? K26_YCAM : K26_HCAM, W = road ? K26_RW : 1000, c = K.camAt(keys, t), z = c.zoom;
  if (c.rot && Math.abs(c.rot) > 0.01) return c;
  const y = 900 - 450 / z;   // the ground sits low in the panel at every zoom (key y values are ignored)
  return { x: K.clamp(c.x, 500 / z, W - 500 / z), y: K.clamp(y, 615 / z, 1230 - 615 / z), zoom: z, rot: 0 };
}
// panel-only shake: the loudest words (119.7 ME!!, 128.8 and 135.3 WAKE UP!)
const k26Shake = (t) => K.spring(t, 119.7, 3, 14, 7) + K.spring(t, 128.8, 4, 14, 7) + K.spring(t, 135.3, 4, 14, 7);
let K26_LAST = null;
const SCENE = {
  duration: K26_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = k26Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);
    const cam = k26Cam(t); let Wd;
    ctx.save(); K.camera(ctx, 1000, 1230, cam);
    if (t < K26_CUT1) Wd = k26RoadWorld(ctx, t, cam); else if (t < K26_CUT2) Wd = k26YardWorld(ctx, t); else Wd = k26HutWorld(ctx, t);
    ctx.restore();
    // whip streaks (125.94 whip out, 143.7 cut back)
    for (const [a, b] of [[125.94, 126.2]]) if (t >= a && t < b) { const u = (t - a) / (b - a); ctx.save(); ctx.globalAlpha = 0.7 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(9); for (let i = 0; i < 24; i++) ctx.fillRect(-100 + r() * 1100 + u * 300, r() * 1230, 220 + r() * 300, 6 + r() * 8); ctx.restore(); }
    if (t < K26_CUT1) k26RoadOver(ctx, t, cam, S, Wd); else if (t < K26_CUT2) k26YardOver(ctx, t, cam, S, Wd); else k26HutOver(ctx, t, cam, S, Wd);
    if (t >= 62.98 && t < 63.84) S.transition(ctx, 1000, 1230, (t - 62.98) / 0.86, { caption: 'THAT NIGHT...' });
    if (t >= 166.66) S.title(ctx, 'THE END', 500, 240, k26B(t, 166.66, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // sparse, quiet effects only in narration pauses (plan); master 0.6 at render
    k.bed(S.sfx.bed, 0, K26_DUR, 0.5);
    k.play('pop', 6.45, { gain: 0.35 });                 // the daydream cloud opens (pause 6.06-6.78)
    k.play('tick', 15.6, { gain: 0.3 }); k.play('tick', 15.8, { gain: 0.25 });   // the thief rubs his hands (15.14-16.16)
    k.play('whoosh', 21.25, { dur: 0.35, gain: 0.3 });  // horns behind the tree (20.92-21.66)
    k.play('whoosh', 63.05, { dur: 0.45, gain: 0.35 }); // THAT NIGHT card (62.98-63.84)
    k.play('ding', 69.4, { gain: 0.25 });                // spoon on the bowl (69.00-69.84)
    k.play('pop', 90.9, { gain: 0.35 });                 // the strip unfolds (90.56-91.52)
    k.play('pop', 109.2, { gain: 0.35 });                // the thief's strip (108.98-109.64)
    k.play('chime', 166.9, { note: 'C6', gain: 0.6 });   // THE END
  },
};
window.SCENE = SCENE;
