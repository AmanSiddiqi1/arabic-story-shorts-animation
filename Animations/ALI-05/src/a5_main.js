// ===== ALI-05: panel framing, the shot dispatch (a3_base.js), the one tape transition (THAT EVENING...), the one impact frame
// (THE LEADER!), the CLUES counter, sound. Shots: { a, b, ww, cam(t), world(ctx, t, cam), over(ctx, t, cam, S) } through the camera
// in the 1000 x 1230 panel, or { panel(ctx, t, S) } in panel units (the ring insert, the split memory, the eye close-up).
const A5_TAPE = [34.6, 35.4];
const A5_CLUES = [[50.2, 1], [57.38, 2], [67.6, 3], [98.08, 4], [105.9, 5]];
function a5DrawShot(ctx, sc, t, S) {
  if (sc.panel) { sc.panel(ctx, t, S); return; }
  const cam = abCamClamp(sc.cam(t), sc.ww || 1000); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S);
}
const SCENE = {
  duration: AB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = AB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sc = abShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
    a5DrawShot(ctx, sc, t, S);
    // the CLUES counter (top right) in the shots of the reveal and the dinner
    const cl = A5_CLUES.filter(([a]) => t >= a).pop();
    if (cl && !sc.noClues && (t < 51 ? t >= 50.2 : t < 122.6)) clueCounter(ctx, S, t, 840, 96, cl[1], cl[0]);
    if (t >= 109.54 && t < 110.3) { const p = K.clamp((t - 109.54) / 0.76); S.emphasis(ctx, 560, 560, 230, p, { rect: [0, 0, 1000, 1230], word: 'THE LEADER!', wx: 0, wy: 1.5 }); }
    ctx.restore();
    if (t >= A5_TAPE[0] && t < A5_TAPE[1]) S.transition(ctx, W, H, K.clamp((t - A5_TAPE[0]) / (A5_TAPE[1] - A5_TAPE[0])), { rect: AB_PANEL, caption: 'THAT EVENING...' });
    for (const c of [8.5, 17.7, 24.0, 41.0, 42.2, 51.0, 69.0, 78.3, 80.6, 88.6, 106.6, 122.6]) abTracking(ctx, t, c - 0.02, 0.15);   // a few cuts carry a tape flick
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 9 quiet effects, each inside a narration pause (word gaps from timing.json); master 0.6 at render
    k.bed('tape', 0, AB_DUR, 0.6);
    k.play('pop', 8.45, { gain: 0.4 });                // 8.16-8.78: the smile switches on
    k.play('whoosh', 17.6, { gain: 0.4 });             // 17.14-18.32: the whip to the storehouse
    k.play('glitch', 34.8, { gain: 0.4 });             // 34.56-35.59: THAT EVENING...
    k.play('blip', 50.4, { gain: 0.4 });              // 50.22-51.22: CLUES 1 (a short blip: a chime tail would reach the next word)
    k.play('blip', 68.85, { gain: 0.35 });             // 68.58-69.50: out into the street
    k.play('pop', 88.4, { gain: 0.4 });                // 88.18-89.06: the cut to the two of them
    k.play('riser', 106.3, { gain: 0.35, dur: 0.6 });         // 106.22-107.03: her eyes
    k.play('whoosh', 120.9, { gain: 0.4 });            // 120.73-121.58: the bolt
    k.play('chime', 133.6, { note: 'C6', gain: 0.55 });// after the last word: TO BE CONTINUED...
  },
};
window.SCENE = SCENE;
