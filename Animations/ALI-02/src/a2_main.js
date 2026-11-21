// ===== ALI-02: panel framing, the shot dispatch, the one tape transition, sound =====
// Shots are pushed by a2_s1..a2_s4.js: { a, b, ww, cam(t), under, world(ctx, t, cam), over(ctx, t, cam, S) } through the camera in
// the 1000 x 1230 panel, or { panel(ctx, t, S) } in panel units (eye close-ups).
const A2_TAPE = [106.45, 107.3];
const SCENE = {
  duration: AB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = AB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sh = a2Shake(t), sc = abShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const cam = abCamClamp(sc.cam(t), sc.ww || 1000); if (sc.under) sc.under(ctx, t, cam, S); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S); }
    ctx.restore();
    if (t >= A2_TAPE[0] && t < A2_TAPE[1]) S.transition(ctx, W, H, K.clamp((t - A2_TAPE[0]) / (A2_TAPE[1] - A2_TAPE[0])), { rect: AB_PANEL, caption: 'BACK HOME...' });
    for (const c of [33.46, 35.18, 35.72]) abTracking(ctx, t, c - 0.02, 0.15);    // the three jump cuts
    abTracking(ctx, t, 47.46, 0.15); abTracking(ctx, t, 141.4, 0.55);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 9 quiet effects, each inside a measured narration pause (silencedetect -35 dB); master 0.6 at render
    k.bed('tape', 0, AB_DUR, 0.6);
    k.play('thud', 13.42, { gain: 0.4 });              // pause 13.40-14.70: the big sack wins
    k.play('blip', 32.55, { gain: 0.4 });              // 32.36-33.63: two heartbeats
    k.play('blip', 32.95, { gain: 0.35 });
    k.play('riser', 51.78, { dur: 0.75, gain: 0.45 }); // 51.67-52.99: into the door opening
    k.play('stamp', 70.62, { gain: 0.35 });            // 70.48-71.80: the leader's shadow
    k.play('blip', 90.3, { gain: 0.45 });              // 90.03-91.27: Cassim lifts his head
    k.play('glitch', 106.6, { gain: 0.6 });            // 106.49-107.77: the tape transition
    k.play('whoosh', 124.65, { gain: 0.45 });          // 124.51-125.84: the crane up
    k.play('chime', 139.1, { note: 'C6', gain: 0.55 });// after the last word: THE END
  },
};
window.SCENE = SCENE;
