const H3_SHOTS = [{ a: 0, b: 2.58, panel: h3S1Panel }, { a: 2.58, b: 18.4, world: 'home' }];
function h3Shot(t) { for (const s of H3_SHOTS) if (t >= s.a && t < s.b) return s; return H3_SHOTS[H3_SHOTS.length - 1]; }
const SCENE = { duration: H3_DUR, draw(ctx, W, H, t, S) { S0 = S; LIFE.t = null; S.background(ctx, W, H, t, THEME.page); const [px, py, pw, ph] = EH_PANEL; S.box(ctx, px, py, pw, ph, 1, THEME.panel);
  const sc = h3Shot(t); ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
  if (sc.panel) sc.panel(ctx, t, S); else { const cam = h3HomeCam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); h3HomeWorld(ctx, t, cam); ctx.restore(); h3HomeOver(ctx, t, cam, S); }
  ctx.restore(); subtitle(ctx, W, H, t, 1); S.finish(ctx, W, H, t); }, score(k, S) { k.bed('tape', 0, H3_DUR, 0.6); } };
window.SCENE = SCENE;
