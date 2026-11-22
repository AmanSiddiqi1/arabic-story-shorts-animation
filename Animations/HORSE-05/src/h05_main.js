// ===== HORSE-05: shot list, transitions, sound =====
const H5_SHOTS = [
  { a: 0, b: 74.32, world: 'square' }, { a: 74.32, b: 76.36, panel: 'h5KnobInsert' }, { a: 76.36, b: 86.88, world: 'square' },
  { a: 86.88, b: 94.9, panel: 'h5FlightPanel' }, { a: 94.9, b: 96.4, panel: 'h5LeverInsert' }, { a: 96.4, b: 100.32, panel: 'h5FlightPanel' },
  { a: 100.32, b: 104.87, panel: 'h5RiverPanel' }, { a: 104.87, b: 125.0, world: 'home' }, { a: 125.0, b: 136.48, world: 'road' },
  { a: 136.48, b: 142.06, world: 'pgarden' }, { a: 142.06, b: 1e9, panel: 'h5SunsetPanel' }];
const H5_CUTS = [37.32, 67.42, 74.32, 76.36, 94.9, 96.4, 100.32, 104.87, 142.06];
const H5_WORLDS = { square: ['h5SqCam', 'h5SqWorld', 'h5SqOver'], home: ['h5HmCam', 'h5HmWorld', 'h5HmOver'], road: ['h5RdCam', 'h5RdWorld', 'h5RdOver'], pgarden: ['h5PgCam', 'h5PgWorld', 'h5PgOver'] };
const h5Fn = (n) => (typeof window[n] === 'function' ? window[n] : typeof globalThis[n] === 'function' ? globalThis[n] : null);
function h5Shot(t) { for (const s of H5_SHOTS) if (t >= s.a && t < s.b) return s; return H5_SHOTS[H5_SHOTS.length - 1]; }
function h5DrawShot(ctx, t, S, sc) {
  if (sc.panel) { const f = h5Fn(sc.panel); if (f) f(ctx, t, S); return; }
  const [camN, worldN, overN] = H5_WORLDS[sc.world], camF = h5Fn(camN), worldF = h5Fn(worldN), overF = h5Fn(overN);
  if (camF && worldF) { const cam = camF(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); worldF(ctx, t, cam); ctx.restore(); if (overF) overF(ctx, t, cam, S); } }
const SCENE = {
  duration: H5_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = EH_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const shk = t > 66.45 && t < 66.75 ? 5 * (1 - (t - 66.45) / 0.3) : t > 105.5 && t < 105.75 ? 4 * (1 - (t - 105.5) / 0.25) : 0, sh = shk ? [shk * Math.sin(t * 61), shk * 0.7 * Math.cos(t * 47)] : [0, 0];
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    h5DrawShot(ctx, t, S, h5Shot(t));
    if (t >= 86.1 && t < 87.6) h5CloudWipe(ctx, t);
    ctx.restore();
    if (t >= 124.4 && t < 125.6) S.transition(ctx, W, H, K.clamp((t - 124.4) / 1.2), { rect: EH_PANEL, caption: 'DAYS LATER...' });
    if (t >= 136.2 && t < 136.8) h5Whip(ctx, t);
    for (const c of H5_CUTS) ehTracking(ctx, t, c - 0.04, 0.16);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 9 quiet effects, each inside a narration pause (or after the last word); master 0.6 at render
    k.bed('tape', 0, H5_DUR, 0.6);
    k.play('blip', 9.55, { gain: 0.45 });                // she is called forward
    k.play('blip', 24.3, { gain: 0.45 });                // the last tap on the brass joint
    k.play('chime', 46.0, { note: 'E6', gain: 0.4 });    // the king's finger: speak
    k.play('stamp', 66.6, { gain: 0.5 });                // CLANK! the bar drops
    k.play('blip', 73.95, { gain: 0.45 });               // the rope is taut
    k.play('whoosh', 86.45, { gain: 0.45 });             // the cloud wipe
    k.play('chime', 104.45, { note: 'G6', gain: 0.4 });  // between the towers
    k.play('glitch', 124.8, { gain: 0.55 });             // DAYS LATER (tape)
    k.play('chime', 144.4, { note: 'C6', gain: 0.55 });  // after the last word: THE END
  },
};
// the cloud wipe (86.1 - 87.6): big puffs slide across the panel and clear
function h5CloudWipe(ctx, t) { const u = (t - 86.1) / 1.5; ctx.save();
  for (let i = 0; i < 7; i++) { const x = K.lerp(1500 + i * 90, -700 + i * 60, K.ease.inOut(K.clamp(u * 1.1 - i * 0.02))), y = 80 + i * 170;
    ehCloud(ctx, x, y, 900, 260, '#ffffff', '#cfe0f6', 0, 41 + i); } ctx.restore(); }
// the whip pan (136.2 - 136.8): speed streaks across the panel
function h5Whip(ctx, t) { const u = (t - 136.2) / 0.6; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u) * 0.9; ehSpeed(ctx, EH_PANEL, t, { n: 40, speed: 5200, dir: -1, alpha: 0.8, col: '#fff6ea', col2: '#ffe08a' }); ctx.restore(); }
window.SCENE = SCENE;
