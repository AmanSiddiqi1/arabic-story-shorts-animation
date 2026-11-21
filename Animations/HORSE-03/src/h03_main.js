// ===== HORSE-03: shot list, transitions, sound =====
const H3_SHOTS = [
  { a: 0, b: 2.58, panel: h3S1Panel }, { a: 2.58, b: 18.4, world: 'home' }, { a: 18.4, b: 34.39, world: 'roof' }, { a: 34.39, b: 40.46, world: 'garden' }, { a: 40.46, b: 48.92, world: 'road' },
  { a: 48.92, b: 107.94, world: 'garden' }, { a: 107.94, b: 109.5, panel: h3KnobInsert }, { a: 109.5, b: 114.42, world: 'garden' }, { a: 114.42, b: 120.58, panel: h3S17Panel },
  { a: 120.58, b: 129.12, world: 'after' }, { a: 129.12, b: 130.1, panel: h3ScrapInsert }, { a: 130.1, b: 1e9, world: 'after' }];
const H3_CUTS = [2.58, 34.39, 40.46, 82.53, 107.94, 109.5, 114.42, 120.58, 129.12, 130.1];
const H3_WORLDS = { home: [h3HomeCam, h3HomeWorld, h3HomeOver], roof: [h3RoofCam, h3RoofWorld, h3RoofOver], garden: [h3GardenCam, h3GardenWorld, h3GardenOver], road: [h3RoadCam, h3RoadWorld, h3RoadOver], after: [h3AfterCam, h3AfterWorld, h3AfterOver] };
function h3Shot(t) { for (const s of H3_SHOTS) if (t >= s.a && t < s.b) return s; return H3_SHOTS[H3_SHOTS.length - 1]; }
const SCENE = {
  duration: H3_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = null;
    S.background(ctx, W, H, t, THEME.page);
    const [px, py, pw, ph] = EH_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    const sc = h3Shot(t), shk = t > 110.36 && t < 110.8 ? 4 * (1 - (t - 110.36) / 0.44) : t > 4.02 && t < 4.2 ? 2 : 0, sh = shk ? [shk * Math.sin(t * 61), shk * 0.7 * Math.cos(t * 47)] : [0, 0];
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh[0], py + sh[1]); ctx.scale(pw / 1000, ph / 1230);
    if (sc.panel) sc.panel(ctx, t, S);
    else { const [camF, worldF, overF] = H3_WORLDS[sc.world], cam = camF(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); worldF(ctx, t, cam); ctx.restore(); overF(ctx, t, cam, S); }
    ctx.restore();
    if (t >= 17.9 && t < 18.94) S.transition(ctx, W, H, K.clamp((t - 17.9) / 1.04), { rect: EH_PANEL, caption: 'DAYS LATER...' });
    for (const c of H3_CUTS) ehTracking(ctx, t, c - 0.04, 0.16);
    subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // the CRT pass, always last
  },
  score(k, S) {   // 9 quiet effects, each inside a narration pause (or after the last word); master 0.6 at render
    k.bed('tape', 0, H3_DUR, 0.6);
    k.play('blip', 9.15, { gain: 0.45 });                 // 8.74-9.60: the child pats the wooden horse
    k.play('glitch', 18.3, { gain: 0.55 });               // 17.72-18.94: DAYS LATER (tape)
    k.play('chime', 33.85, { note: 'E6', gain: 0.4 });    // 33.30-34.39: the cat on the trunk
    k.play('blip', 51.05, { gain: 0.45 });                // 50.50-51.60: the cat's ear turns
    k.play('blip', 67.2, { gain: 0.45 });                 // 66.72-67.67: the cat's stare, he sinks
    k.play('blip', 82.12, { gain: 0.45 });                // 81.68-82.53: the cloud bursts
    k.play('blip', 100.95, { gain: 0.45 });               // 100.52-101.43: the footstool set down
    k.play('whoosh', 120.1, { gain: 0.45 });              // 119.63-120.58: the horse gone into the distance
    k.play('chime', 140.2, { note: 'C6', gain: 0.55 });   // after the last word: TO BE CONTINUED
  },
};
window.SCENE = SCENE;
