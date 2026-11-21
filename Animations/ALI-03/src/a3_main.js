// ===== ALI-03: panel framing, the shot dispatch, the one tape transition (NEXT DAY...), sound =====
// Shots are pushed by a3_s1..a3_s5.js: { a, b, ww, cam(t), under, world(ctx, t, cam), over(ctx, t, cam, S) } through the camera in
// the 1000 x 1230 panel, or { panel(ctx, t, S) } in panel units (eye close-ups and inserts).
const A3_TAPE = [85.9, 86.7];
const A3_SHAKE = [[75.02, 75.32], [78.94, 79.2]];
function a3Shake(t) { let a = 0; for (const [t0, t1] of A3_SHAKE) if (t >= t0 && t < t1) a = 3 * Math.min(1, (t - t0) / 0.06, (t1 - t) / 0.1); return a ? [a * Math.sin(t * 61), a * 0.7 * Math.cos(t * 47)] : [0, 0]; }
function a3DrawShot(ctx, sc, t, S) {
  if (sc.panel) { sc.panel(ctx, t, S); return; }
  const cam = abCamClamp(sc.cam(t), sc.ww || 1000); if (sc.under) sc.under(ctx, t, cam, S); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S);
}
const SCENE = {
  duration: AB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = AB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sh = a3Shake(t), sc = abShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    const dz = A3_DISSOLVE.find((d) => Math.abs(t - d) < 0.25);
    if (dz == null) a3DrawShot(ctx, sc, t, S);
    else {   // cross-dissolve: the outgoing shot held on its last frame, the incoming one (held on its first) faded in through a layer
      a3DrawShot(ctx, abShot(dz - 0.002), Math.min(t, dz - 0.002), S);
      const L = abLay('dz', ctx.canvas.width, ctx.canvas.height), g = L.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, L.width, L.height); g.setTransform(ctx.getTransform());
      a3DrawShot(g, abShot(dz), Math.max(t, dz), S); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = K.clamp((t - dz + 0.25) / 0.5); ctx.drawImage(L, 0, 0); ctx.restore();
    }
    ctx.restore();
    if (t >= A3_TAPE[0] && t < A3_TAPE[1]) S.transition(ctx, W, H, K.clamp((t - A3_TAPE[0]) / (A3_TAPE[1] - A3_TAPE[0])), { rect: AB_PANEL, caption: 'NEXT DAY...' });
    for (const c of [16.9, 45.0, 75.2, 93.5, 100.8, 116.2]) abTracking(ctx, t, c - 0.02, 0.15);   // a few cuts carry a tape flick
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 10 quiet effects, each inside a narration pause (word gaps from timing.json); master 0.6 at render
    k.bed('tape', 0, AB_DUR, 0.6);
    k.play('whoosh', 6.7, { gain: 0.45 });             // 6.24-7.44: the whip to the market
    k.play('blip', 16.95, { gain: 0.4 });              // 16.40-17.70: the street
    k.play('chime', 35.0, { note: 'E6', gain: 0.4 });  // 34.96-36.16: Morgiana (early, so the tail ends before the word)
    k.play('pop', 55.9, { gain: 0.45 });               // 55.42-56.85: the idea
    k.play('stamp', 75.0, { gain: 0.4 });              // 74.60-75.88: the stomp
    k.play('blip', 93.2, { gain: 0.4 });               // 92.76-94.03: the practice dot
    k.play('pop', 100.75, { gain: 0.4 });              // 100.36-101.53: the shutters open
    k.play('whoosh', 111.2, { gain: 0.4 });            // 110.86-112.15: into the second night
    k.play('thud', 128.2, { gain: 0.4 });              // 127.85-129.24: the leader leaves
    k.play('chime', 143.6, { note: 'C6', gain: 0.55 });// after the last word: TO BE CONTINUED...
  },
};
window.SCENE = SCENE;
