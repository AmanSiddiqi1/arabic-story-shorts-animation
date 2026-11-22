// ===== ALI-04: panel framing, the shot dispatch (a3_base.js), the one dissolve (evening -> night), the one tape transition
// (LATER THAT NIGHT...), the one impact frame (CAUGHT!), sound. Shots: { a, b, ww, cam(t), world(ctx, t, cam), over(ctx, t, cam, S) }
// through the camera in the 1000 x 1230 panel, or { panel(ctx, t, S) } in panel units (inserts and close-ups).
const A4_TAPE = [32.5, 33.3];
const A4_DISSOLVE = [16.3];
function a4DrawShot(ctx, sc, t, S) {
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
    const dz = A4_DISSOLVE.find((d) => Math.abs(t - d) < 0.25);
    if (dz == null) a4DrawShot(ctx, sc, t, S);
    else {   // cross-dissolve: outgoing shot held on its last frame, the incoming one (held on its first) faded in through a layer
      a4DrawShot(ctx, abShot(dz - 0.002), Math.min(t, dz - 0.002), S);
      const L = abLay('dz', ctx.canvas.width, ctx.canvas.height), g = L.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, L.width, L.height); g.setTransform(ctx.getTransform());
      a4DrawShot(g, abShot(dz), Math.max(t, dz), S); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = K.clamp((t - dz + 0.25) / 0.5); ctx.drawImage(L, 0, 0); ctx.restore();
    }
    if (t >= 112.46 && t < 113.25) { const p = K.clamp((t - 112.46) / 0.75); S.emphasis(ctx, 500, 560, 230, p, { rect: [0, 0, 1000, 1230], word: 'CAUGHT!', wx: 0, wy: 1.5 }); }
    ctx.restore();
    if (t >= A4_TAPE[0] && t < A4_TAPE[1]) S.transition(ctx, W, H, K.clamp((t - A4_TAPE[0]) / (A4_TAPE[1] - A4_TAPE[0])), { rect: AB_PANEL, caption: 'LATER THAT NIGHT...' });
    for (const c of [8.9, 45.5, 65.0, 70.2, 78.4, 96.3, 105.6, 129.5]) abTracking(ctx, t, c - 0.02, 0.15);   // a few cuts carry a tape flick
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (word gaps from timing.json); master 0.6 at render
    k.bed('tape', 0, AB_DUR, 0.6);
    k.play('blip', 15.45, { gain: 0.4 });              // 15.10-16.41: the sky cools
    k.play('glitch', 32.8, { gain: 0.4 });             // 32.28-33.50: LATER THAT NIGHT...
    k.play('pop', 51.8, { gain: 0.4 });                // 51.34-52.59: resolve
    k.play('pop', 69.7, { gain: 0.4 });                // 69.26-70.57: the idea
    k.play('blip', 87.95, { gain: 0.35 });             // 87.48-88.77: a fingertip knock at the gate
    k.play('blip', 105.2, { gain: 0.35 });             // 104.79-106.08: pebbles
    k.play('whoosh', 117.35, { gain: 0.4 });           // 116.93-118.39: the whip back
    k.play('chime', 135.95, { note: 'C6', gain: 0.55 });// after the last word: TO BE CONTINUED...
  },
};
window.SCENE = SCENE;
