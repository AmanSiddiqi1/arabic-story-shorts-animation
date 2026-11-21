// ===== HORSE-01: shot list, panel framing, sound =====
// Shots: { a, b, world: true } (the garden through h1Cam) or { a, b, panel(ctx, t, S) } (sky and inserts, panel units).
const H1_DUR = 138.15;   // narration 134.15 + plan end_hold 4.0
const H1_SHOTS = [
  { a: 0, b: 37.64, world: true }, { a: 37.64, b: 39.4, panel: (c, t, S) => h1KnobInsert(c, t, S, 'inventor') },
  { a: 39.4, b: 69.08, world: true }, { a: 69.08, b: 70.0, panel: (c, t, S) => h1KnobInsert(c, t, S, 'firuz') },
  { a: 70.0, b: 75.12, world: true }, { a: 75.12, b: 117.68, panel: h1SkyPanel }, { a: 117.68, b: 121.3, panel: h1LeverInsert },
  { a: 121.3, b: 130.86, panel: h1SkyPanel }, { a: 130.86, b: 132.14, panel: h1ReachInsert }, { a: 132.14, b: 1e9, panel: h1SkyPanel },
];
function h1Shot(t) { for (const s of H1_SHOTS) if (t >= s.a && t < s.b) return s; return H1_SHOTS[H1_SHOTS.length - 1]; }
const SCENE = {
  duration: H1_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = EH_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sc = h1Shot(t), shk = t > 71.65 && t < 72.4 ? 5 * (1 - (t - 71.65) / 0.75) : t > 94.74 && t < 95.2 ? 3 : 0, sh = shk ? [shk * Math.sin(t * 61), shk * 0.7 * Math.cos(t * 47)] : [0, 0];
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const cam = h1Cam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); h1World(ctx, t, cam); ctx.restore(); h1Over(ctx, t, cam, S); }
    ctx.restore();
    if (t >= 107.9 && t < 108.69) S.transition(ctx, W, H, K.clamp((t - 107.9) / 0.79), { rect: EH_PANEL, caption: 'HOURS LATER...' });
    ehTracking(ctx, t, 75.1, 0.2); ehTracking(ctx, t, 132.1, 0.2); ehTracking(ctx, t, 37.6, 0.15); ehTracking(ctx, t, 69.05, 0.15);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (timeline gaps); master 0.6 at render
    k.bed('tape', 0, H1_DUR, 0.6);
    k.play('chime', 17.3, { note: 'E6', gain: 0.45 });   // 16.96-18.12: the brass star glint
    k.play('blip', 35.6, { gain: 0.5 });                  // 35.10-36.20: the inventor lands in the saddle
    k.play('blip', 55.3, { gain: 0.45 });                 // 54.86-55.81: the knock beside the knob
    k.play('riser', 71.0, { dur: 0.6, gain: 0.45 });      // 70.82-71.65: into the launch
    k.play('whoosh', 89.5, { gain: 0.45 });               // 89.34-90.22: the climb goes on
    k.play('glitch', 108.0, { gain: 0.55 });              // 107.78-108.69: HOURS LATER (tape)
    k.play('chime', 122.3, { note: 'A5', gain: 0.45 });   // 121.98-122.82: the lever found
    k.play('chime', 134.2, { note: 'C6', gain: 0.55 });   // after the last word: TO BE CONTINUED
  },
};
window.SCENE = SCENE;
