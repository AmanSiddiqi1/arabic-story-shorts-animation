// ===== HP.stage: the shared structure of every Halftone Pop film =====
// All four films drew the same frame: a shaking page, the style's background, a bordered panel holding a camera-driven world,
// overlays (title, counters, emphasis), an optional "new panel" transition, a caption box for subtitles, and the finishing pass.
// This file lifts that structure out so a new film only supplies drawWorld(), overlays(), camera keys and a score.
// Defaults reproduce the approved 9:16 geometry exactly. Other layouts are EXPERIMENTAL (never rendered or tested).
window.HP = window.HP || {};
HP.LAYOUTS = {
  // tested: used by all four Kalila wa Dimna films. Panel in the top two thirds, plain caption box in the bottom third.
  '9x16': { status: 'tested', W: 1080, H: 1920, panel: { x: 54, y: 54, w: 972, h: 1196 }, caption: { x: 54, y: 1296, w: 972, h: 566 } },
  // experimental: same page without a caption box (no subtitles), and landscape / square variants
  '9x16-nocaption': { status: 'experimental', W: 1080, H: 1920, panel: { x: 54, y: 54, w: 972, h: 1812 }, caption: null },
  '16x9': { status: 'experimental', W: 1920, H: 1080, panel: { x: 54, y: 54, w: 1812, h: 972 }, caption: null },
  '1x1': { status: 'experimental', W: 1080, H: 1080, panel: { x: 54, y: 54, w: 972, h: 972 }, caption: null },
};
HP.layout = HP.LAYOUTS[(window.HP_CONFIG && window.HP_CONFIG.layout) || '9x16'] || HP.LAYOUTS['9x16'];
// world units: 1000 wide, height from the panel's aspect (1000 x 1230 for 9:16). Draw your world in these units.
HP.worldOf = (layout = HP.layout) => ({ w: 1000, h: Math.round(1000 * layout.panel.h / layout.panel.w) });
HP.world = HP.worldOf();
// keyframed camera with a clamp so it never shows beyond the drawn world. keys: [[t, {x, y, zoom}], ...]
HP.camera = (keys, world = HP.world) => {
  const at = (t) => { const c = K.camAt(keys, t), z = c.zoom; return { x: K.clamp(c.x, world.w / 2 / z, world.w - world.w / 2 / z), y: K.clamp(c.y, world.h / 2 / z, world.h - world.h / 2 / z), zoom: z }; };
  const toPanel = (x, y, c) => [world.w / 2 + (x - c.x) * c.zoom, world.h / 2 + (y - c.y) * c.zoom];   // world point -> panel space (for overlays)
  return { at, toPanel };
};
// opts: { duration, cameraKeys, drawWorld(ctx,t,cam), overlays(ctx,t,cam,S,camera), shake(t)->px, transitions:[{from,to,caption}],
//         score(k,S), background:{dot}, panelFill, subtitles: true|false }
HP.stage = (opts) => {
  const L = HP.layout, world = HP.world, camera = HP.camera(opts.cameraKeys, world), P = L.panel;
  const SCENE = {
    duration: opts.duration,
    draw(ctx, W, H, t, S) {
      const shake = opts.shake ? opts.shake(t) : 0;
      ctx.save(); ctx.translate(shake * 0.8, -shake * 0.5);
      S.background(ctx, W, H, t, Object.assign({ dot: C.blue }, opts.background));
      S.box(ctx, P.x, P.y, P.w, P.h, 1, { fill: opts.panelFill || C.blue, lw: 11, seed: 3 });
      ctx.save(); ctx.beginPath(); ctx.rect(P.x + 9, P.y + 9, P.w - 18, P.h - 18); ctx.clip();
      ctx.translate(P.x, P.y); ctx.scale(P.w / world.w, P.h / world.h);
      const cam = camera.at(t);
      ctx.save(); K.camera(ctx, world.w, world.h, cam); opts.drawWorld(ctx, t, cam); ctx.restore();
      if (opts.overlays) opts.overlays(ctx, t, cam, S, camera);
      for (const tr of opts.transitions || []) if (t > tr.from && t < tr.to) { ctx.save(); S.transition(ctx, world.w, world.h, K.clamp((t - tr.from) / (tr.to - tr.from)), { caption: tr.caption }); ctx.restore(); }
      ctx.restore();
      if (opts.subtitles !== false && L.caption && HP.subtitle) HP.subtitle(ctx, W, H, t, S);
      ctx.restore();
      S.finish(ctx, W, H, t);
    },
    score: opts.score || (() => {}),
  };
  window.SCENE = SCENE; HP.camera.current = camera; return SCENE;
};
