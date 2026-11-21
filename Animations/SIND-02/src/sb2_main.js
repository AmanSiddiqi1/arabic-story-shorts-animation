// ===== SIND-02 "The Roc and the Diamond Valley": shot dispatch, panel framing, transition, sound =====
function sbShot(t) { for (const s of SB_SHOTS) if (t >= s.a && t < s.b) return s; return SB_SHOTS[SB_SHOTS.length - 1]; }
// shots clamp the camera to their world (ww, wy0..wy1); o.free skips the clamp (the valley cranes, the nest pull-out)
function sbCamFit(c, sc) { if (sc.free) return c; const z = c.zoom, ww = sc.ww || 1000, y0 = sc.wy0 ?? 0, y1 = sc.wy1 ?? 1230; return { x: K.clamp(c.x, (sc.wx0 ?? 0) + 500 / z, ww - 500 / z), y: K.clamp(c.y, y0 + 615 / z, Math.max(y0 + 615 / z, y1 - 615 / z)), zoom: z }; }
// panel-only shakes: [t0, t1, amp] (the roc's touchdown, the landing in the valley, THUD!, the clap)
const SB2_SHAKES = [[48.94, 49.36, 10], [69.68, 70.0, 4], [93.58, 93.9, 5], [39.54, 39.8, 2], [121.42, 121.6, 3]];
function sbShake(t) { let a = 0; for (const [t0, t1, amp] of SB2_SHAKES) if (t >= t0 && t < t1) a = amp * Math.min(1, (t - t0) / 0.05, (t1 - t) / 0.2); return a ? [a * Math.sin(t * 61), a * 0.7 * Math.cos(t * 47)] : [0, 0]; }
const SCENE = {
  duration: SB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = SB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sh = sbShake(t), sc = sbShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const cam = sbCamFit(sc.cam(t), sc); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S); }
    ctx.restore();
    if (t >= 16.6 && t < 17.5) S.transition(ctx, W, H, K.clamp((t - 16.6) / 0.9), { rect: SB_PANEL, caption: 'LATER...' });
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (timeline gaps) or after the last word; master 0.6 at render
    k.bed('tape', 0, SB_DUR, 0.6);
    k.play('glitch', 16.9, { gain: 0.5 });             // pause 16.46-17.66: the LATER... tape transition
    k.play('riser', 35.2, { dur: 0.45, gain: 0.4 });   // 34.82-35.85: into the clearing and the dome
    k.play('thud', 54.3, { gain: 0.45 });              // 53.96-54.98: the roc settles and sleeps
    k.play('blip', 71.3, { gain: 0.45 });              // 70.98-71.92: he pats himself, all there
    k.play('whoosh', 92.0, { gain: 0.4 });             // 91.54-92.48: the shadow of the falling joint
    k.play('chime', 109.3, { note: 'E6', gain: 0.45 });// 108.90-109.75: AHA!
    k.play('blip', 127.6, { gain: 0.45 });             // 127.17-128.07: over the rim onto the grass
    k.play('chime', 143.6, { note: 'C6', gain: 0.55 });// after the last word: the feather, THE END
  },
};
window.SCENE = SCENE;
