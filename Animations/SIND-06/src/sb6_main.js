// ===== SIND-06 "The River Beneath the Mountain": shot dispatch, panel framing, shakes, the DAYS LATER... transition, sound =====
function sbShot(t) { for (const s of SB_SHOTS) if (t >= s.a && t < s.b) return s; return SB_SHOTS[SB_SHOTS.length - 1]; }
// panel-only shakes: [t0, t1, amp] (CRASH!, the rapid, rose's slide, the captain sits)
const SB6_SHAKES = [[23.52, 24.02, 8], [86.9, 87.3, 5], [34.9, 35.1, 2], [35.5, 35.7, 2]];
function sbShake(t) { let a = 0; for (const [t0, t1, amp] of SB6_SHAKES) if (t >= t0 && t < t1) a = amp * Math.min(1, (t - t0) / 0.04, (t1 - t) / 0.25); return a ? [a * Math.sin(t * 61), a * 0.7 * Math.cos(t * 47)] : [0, 0]; }
const SCENE = {
  duration: SB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = SB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sh = sbShake(t), sc = sbShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const cam = sc.cam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S); }
    ctx.restore();
    if (t >= 137.4 && t < 138.5) S.transition(ctx, W, H, K.clamp((t - 137.4) / 1.1), { rect: SB_PANEL, caption: 'DAYS LATER...' });
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (timeline gaps) or after the last word; master 0.6 at render
    k.bed('tape', 0, SB_DUR, 0.6);
    k.play('riser', 18.4, { dur: 0.45, gain: 0.4 });    // 18.04-19.19: the rock coast towers over the ship
    k.play('thud', 36.55, { gain: 0.45 });              // 36.06-37.21: NO WAY OUT, the captain sits
    k.play('chime', 54.7, { note: 'E6', gain: 0.45 });  // 54.30-55.33: GEMS?!
    k.play('blip', 75.35, { gain: 0.45 });              // 74.98-75.79: the forearm grip
    k.play('whoosh', 89.0, { gain: 0.4 });              // 88.66-89.56: out of the rapid into the gallery
    k.play('riser', 108.0, { dur: 0.45, gain: 0.4 });   // 107.75-108.68: the white bloom
    k.play('blip', 122.55, { gain: 0.45 });             // 122.20-122.96: he slides off the donkey
    k.play('chime', 147.0, { note: 'C6', gain: 0.55 }); // after the last word: the pebble, THE END
  },
};
window.SCENE = SCENE;
