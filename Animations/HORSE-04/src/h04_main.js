// ===== HORSE-04: shot list, transitions, sound =====
const H4_SHOTS = [
  { a: 0, b: 7.96, panel: 'h4S1Panel' }, { a: 7.96, b: 46.6, world: 'golden' }, { a: 46.6, b: 57.0, world: 'court' }, { a: 57.0, b: 65.88, world: 'road' }, { a: 65.88, b: 68.7, panel: 'h4OrnInsert' },
  { a: 68.7, b: 75.64, world: 'road' }, { a: 75.64, b: 94.76, world: 'day' }, { a: 94.76, b: 100.78, world: 'court' }, { a: 100.78, b: 102.3, panel: 'h4KnobInsert' }, { a: 102.3, b: 120.44, world: 'court' },
  { a: 120.44, b: 124.5, panel: 'h4EyesClose' }, { a: 124.5, b: 132.4, world: 'court' }, { a: 132.4, b: 1e9, world: 'morning' }];
const H4_CUTS = [7.96, 46.6, 65.88, 68.7, 94.76, 100.78, 102.3, 120.44, 124.5];
const H4_WORLDS = { golden: ['h4GCam', 'h4GoldenWorld', 'h4GoldenOver'], court: ['h4CCam', 'h4CourtWorld', 'h4CourtOver'], road: ['h4RCam', 'h4RoadWorld', 'h4RoadOver'],
  day: ['h4DCam', 'h4DayWorld', 'h4DayOver'], morning: ['h4MCam', 'h4MornWorld', 'h4MornOver'] };
const h4Fn = (n) => (typeof window[n] === 'function' ? window[n] : typeof globalThis[n] === 'function' ? globalThis[n] : null);
function h4Shot(t) { for (const s of H4_SHOTS) if (t >= s.a && t < s.b) return s; return H4_SHOTS[H4_SHOTS.length - 1]; }
const SCENE = {
  duration: H4_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = EH_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sc = h4Shot(t), shk = t > 47.5 && t < 47.8 ? 5 * (1 - (t - 47.5) / 0.3) : 0, sh = shk ? [shk * Math.sin(t * 61), shk * 0.7 * Math.cos(t * 47)] : [0, 0];
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) { const f = h4Fn(sc.panel); if (f) f(ctx, t, S); }
    else { const [camN, worldN, overN] = H4_WORLDS[sc.world], camF = h4Fn(camN), worldF = h4Fn(worldN), overF = h4Fn(overN);
      if (camF && worldF) { const cam = camF(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); worldF(ctx, t, cam); ctx.restore(); if (overF) overF(ctx, t, cam, S); } }
    ctx.restore();
    if (t >= 56.5 && t < 57.49) S.transition(ctx, W, H, K.clamp((t - 56.5) / 0.99), { rect: EH_PANEL, caption: 'MEANWHILE...' });
    if (t >= 74.95 && t < 75.64) h4Whip(ctx, t);
    if (t >= 131.6 && t < 133.2) S.transition(ctx, W, H, K.clamp((t - 131.6) / 1.6), { rect: EH_PANEL, caption: 'NEXT MORNING...' });
    for (const c of H4_CUTS) ehTracking(ctx, t, c - 0.04, 0.16);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 8 quiet effects, each inside a narration pause (or after the last word); master 0.6 at render
    k.bed('tape', 0, H4_DUR, 0.6);
    k.play('blip', 19.75, { gain: 0.45 });                // she gets down by herself
    k.play('stamp', 38.5, { gain: 0.5 });                 // the captain's spear between them (pause 38.3 - 39.07)
    k.play('glitch', 56.85, { gain: 0.55 });              // MEANWHILE (tape)
    k.play('whoosh', 75.15, { gain: 0.45 });              // the whip to the far palace
    k.play('blip', 94.3, { gain: 0.45 });                 // he pushes the crimson corner back
    k.play('blip', 112.42, { gain: 0.45 });               // the lanterns light
    k.play('chime', 128.1, { note: 'E6', gain: 0.4 });    // the tear wiped
    k.play('chime', 141.3, { note: 'C6', gain: 0.55 });   // after the last word: TO BE CONTINUED
  },
};
// the whip pan (74.95 - 75.64): speed streaks across the panel
function h4Whip(ctx, t) { const u = (t - 74.95) / 0.69; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u) * 0.9; ehSpeed(ctx, EH_PANEL, t, { n: 40, speed: 5200, dir: -1, alpha: 0.8, col: '#fff6ea', col2: '#ffe08a' }); ctx.restore(); }
window.SCENE = SCENE;
