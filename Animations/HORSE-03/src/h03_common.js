// ===== HORSE-03 "The Promise and the Theft": shared episode helpers (story names h3 / H3_) =====
const H3_DUR = 144.44;   // narration 140.44 + plan end_hold 4.0
const H3_F = (keys) => (t) => flow(t, keys);
const H3_HS = 0.9;       // the ebony horse's scale on the ground (as in episodes 1-2)
const h3P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
function h3Shadow(ctx, x, y, w, lift = 0, o = {}) { groundShadow(ctx, x, y, w, lift, { flat: true, color: '#2b1a3a', alpha: o.alpha ?? 0.2, fall: o.fall ?? 260 }); }
// rider body-local point for a horse-local point p (rider scale ps on horse H; seat shift d, dy as in twoRiders)
function h3Loc(H, ps, p, d = 0, dy = 0) { const k = H.s / ps; return [(p[0] - (-8 + d)) * k - 22, (p[1] - (-238 + dy)) * k - 52]; }
// a balloon placed above a head (panel units), rows split on '\n'; steps [[t, text]...]; o {gone, size, dx, up, col}
function h3Say(ctx, S, steps, t, head, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0]; for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const rows = txt.split('\n'), size = o.size || 46, half = Math.max(...rows.map((r) => r.length)) * size * 0.36 + size * 0.6, x = K.clamp(head[0] + (o.dx || 0), 30 + half, 970 - half);
  const y0 = K.clamp(head[1] - (o.up || 150) - (rows.length - 1) * size * 2.05, 100, 1060), pop = 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), p = K.clamp((t - steps[0][0]) / 0.3);
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25); ctx.translate(x, y0); ctx.scale(pop, pop); ctx.translate(-x, -y0);
  rows.forEach((r, i) => S.label(ctx, r, x, y0 + i * size * 2.05, p, { size, balloon: true, to: i === rows.length - 1 && !o.noTail ? [head[0], head[1] - 34] : null, color: o.col })); ctx.restore();
}
function h3DashArc(ctx, a, b, bend, p, col = '#ff7ad9', w = 8) { const pts = K.trim(K.arcPts(a, b, bend, 40), K.clamp(p)); if (pts.length < 2) return a; ctx.save(); ctx.lineCap = 'round'; ctx.setLineDash([18, 14]); ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.strokeStyle = col; ctx.lineWidth = w; K.poly(ctx, pts); ctx.stroke(); ctx.shadowBlur = 0; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = w * 0.38; ctx.stroke(); ctx.restore(); return pts[pts.length - 1]; }
// a word in chrome lettering with a soft fade window
function h3Word(ctx, S, txt, x, y, t, a, b, o = {}) { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= K.clamp((b - t) / 0.25); S.title(ctx, txt, x, y, K.clamp((t - a) / 0.25), { size: o.size || 66, align: 'center', glow: o.glow }); ctx.restore(); }
function h3Click(ctx, x, y, t, times, col = '#fff6c8') { for (const tr of times) { const u = (t - tr) / 0.4; if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, 30 + 120 * u, 0, 7); ctx.stroke(); ctx.restore(); } } }
// a person with its shadow (and optional cape / tail / veil / cloak)
function h3Person(ctx, D, P, t, o = {}) {
  if (!P) return; const tc = EH_T2(t); h3Shadow(ctx, P.x, P.y + (P.lift || 0), 90 * (P.s || 1), P.lift || 0);
  const draw = (c) => { if (o.cape) ehCapeStand(c, P, tc, { vx: o.vx || 0, swing: o.swing || 0 }); if (o.tail) ehInvTail(c, P, tc, { torn: o.torn, vx: o.vx || 0, swing: o.swing || 0 }); if (o.veil) ehVeilRibbon(c, P, tc, { vx: o.vx || 0, swing: o.swing || 0 }); person(c, ehDressP(D, { ...P, y: P.y - (P.lift || 0) })); };
  if (o.rim) castFinish(ctx, P.x, P.y + 10, 320, 340, draw, o.rim); else draw(ctx);
}
// the rose palace (and optionally the two river towers) baked once at s 1; drawn at (x, y) (palace centre bottom) and scale k
function h3PalaceSprite(towers) { return ehBakeAt('h3pal:' + (towers ? 1 : 0), 1500, 700, (c) => { c.translate(760, 640); if (towers) ehRiverTowers(c, -620, 620, 0, 420, 76, EH_RC_DUSK, {}); princessPalace(c, 0, 0, 1, {}); }, 0.6); }
function h3Palace(ctx, x, y, k, towers = false) { ctx.drawImage(h3PalaceSprite(towers), x - 760 * k, y - 640 * k, 1500 * k, 700 * k); }
