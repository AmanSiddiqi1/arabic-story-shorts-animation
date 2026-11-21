// ===== SIND-01: shot dispatch, panel framing, transitions, sound =====
function sbShot(t) { for (const s of SB_SHOTS) if (t >= s.a && t < s.b) return s; return SB_SHOTS[SB_SHOTS.length - 1]; }
function sbCamClamp(c, ww) { const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
// panel-only shakes (the jolt, the stamp on deck, the fluke slap)
function sbShake(t) { let a = 0; for (const [t0, t1, amp] of [[41.6, 42.6, 5], [66.08, 66.9, 3], [69.1, 69.7, 4], [55.6, 55.9, 2]]) if (t >= t0 && t < t1) a = amp * Math.min(1, (t - t0) / 0.06, (t1 - t) / 0.3); return a ? [a * Math.sin(t * 61), a * 0.7 * Math.cos(t * 47)] : [0, 0]; }
const SCENE = {
  duration: SB_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = SB_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sh = sbShake(t), sc = sbShot(t);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const cam = sbCamClamp(sc.cam(t), sc.ww || 1000); ctx.save(); K.camera(ctx, 1000, 1230, cam); sc.world(ctx, t, cam, S); ctx.restore(); if (sc.over) sc.over(ctx, t, cam, S); }
    ctx.restore();
    if (t >= 114.5 && t < 115.6) S.transition(ctx, W, H, K.clamp((t - 114.5) / 1.1), { rect: SB_PANEL, caption: 'DAYS LATER...' });
    sbTracking(ctx, t, 126.66, 0.2); sbTracking(ctx, t, 127.48, 0.2);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (timeline gaps) or after the last word; master 0.6 at render
    k.bed('tape', 0, SB_DUR, 0.6);
    k.play('whoosh', 14.4, { gain: 0.45 });           // pause 13.88-15.06: the sail drops and fills
    k.play('blip', 31.1, { gain: 0.45 });             // 30.64-31.72: two bubbles pop by the island
    k.play('riser', 51.5, { dur: 0.45, gain: 0.4 });  // 51.08-52.21: the spout, into the shout
    k.play('thud', 69.3, { gain: 0.5 });              // 68.90-69.88: the fluke slaps down
    k.play('whoosh', 88.6, { gain: 0.4 });            // 88.26-89.17: the swell passes
    k.play('blip', 108.6, { gain: 0.45 });            // 108.26-109.08: the horse and the date
    k.play('chime', 128.9, { note: 'E6', gain: 0.45 });// 128.47-129.43: SINBAD?! ALIVE?!
    k.play('chime', 145.7, { note: 'C6', gain: 0.55 });// after the last word: the wonder, THE END
  },
};
window.SCENE = SCENE;
