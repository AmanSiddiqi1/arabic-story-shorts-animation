// ===== ALI-06: panel framing, the shot dispatch (a3_base.js AB_SHOTS) with ALI-04's courtyard foreground pass (cyFore), the one
// impact frame (THE LEADER!, 14.26), the one tape transition (NEXT MORNING..., 70.35-71.1), a few tape flicks on cuts, sound.
const A6_TAPE = [70.35, 71.1];
function a6DrawShot(ctx, sc, t, S) {
  if (sc.panel) { sc.panel(ctx, t, S); return; }
  const cam = abCamClamp(sc.cam(t), sc.ww || 1000); ctx.save(); K.camera(ctx, 1000, 1230, cam); CY_FG.on = false; sc.world(ctx, t, cam, S); if (CY_FG.on) cyFore(ctx, t, cam, CY_FG.m); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S);
}
const SCENE = {
  duration: AB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = AB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sc = abShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
    a6DrawShot(ctx, sc, t, S);
    if (t >= 14.26 && t < 15.0) { const p = K.clamp((t - 14.26) / 0.74); S.emphasis(ctx, 600, 560, 240, p, { rect: [0, 0, 1000, 1230], word: 'THE LEADER!', wx: 0, wy: 1.5 }); }
    ctx.restore();
    if (t >= A6_TAPE[0] && t < A6_TAPE[1]) S.transition(ctx, W, H, K.clamp((t - A6_TAPE[0]) / (A6_TAPE[1] - A6_TAPE[0])), { rect: AB_PANEL, caption: 'NEXT MORNING...' });
    for (const c of [3.5, 7.6, 11.2, 54.21, 76.28, 80.64, 84.98, 89.02, 116.2, 132.52]) abTracking(ctx, t, c - 0.02, 0.15);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 9 quiet effects, each inside a narration pause (timing.json word gaps); master 0.6 at render
    k.bed('tape', 0, AB_DUR, 0.6);
    k.play('chime', 10.9, { note: 'E6', gain: 0.4 });  // 10.72-11.74: the memory closes into the ring
    k.play('stamp', 15.4, { gain: 0.45 });            // 15.24-16.45: after the impact frame (the frame itself is under a word)
    k.play('blip', 34.75, { gain: 0.4 });             // 34.38-35.58: the cat on the wall
    k.play('pop', 53.5, { gain: 0.4 });               // 53.26-54.21: the knock at the back gate
    k.play('glitch', 70.5, { gain: 0.4 });            // 70.29-71.14: NEXT MORNING...
    k.play('chime', 88.3, { note: 'G6', gain: 0.4 }); // 88.13-89.02: the third check
    k.play('chime', 109.3, { note: 'C6', gain: 0.4 });// 109.10-110.05: the lid closes
    k.play('blip', 123.85, { gain: 0.35 });           // 123.65-124.48: the cat on the counter
    k.play('chime', 142.1, { note: 'C6', gain: 0.55 });// after the last word: THE END
  },
};
window.SCENE = SCENE;
