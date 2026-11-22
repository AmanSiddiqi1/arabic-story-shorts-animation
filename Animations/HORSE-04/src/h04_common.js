// ===== HORSE-04 "The Stolen Horse": shared episode helpers (story names h4 / H4_) =====
const H4_DUR = 145.52;   // narration 141.52 + plan end_hold 4.0
const H4_F = (keys) => (t) => flow(t, keys);
const H4_HS = 0.9;       // the ebony horse's scale on the ground (as in episodes 1-3)
const h4P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// camera from a key table [[t, {x, y, zoom}]...], clamped to a strip w wide and a plate [top, bottom]
function h4Cam(table, t, w, top, bottom) { const c = K.camAt(table, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, w - 500 / z), y: K.clamp(c.y, top + 615 / z, bottom - 615 / z), zoom: z }; }
// ground at panel y g for zoom z: the camera y
const h4GY = (z, g = 950) => 900 - (g - 615) / z;
function h4Shadow(ctx, x, y, w, lift = 0, o = {}) { groundShadow(ctx, x, y, w, lift, { flat: true, color: '#2b1a3a', alpha: o.alpha ?? 0.2, fall: o.fall ?? 260 }); }
// a person with its shadow and extras; o {cape, tail (torn), veil, helmet {tilt}, neck, spear {lean, hand}, vx, swing, lift}
function h4Fig(ctx, D, P, t, o = {}) {
  if (!P) return; const tc = EH_T2(t), lift = P.lift || 0; h4Shadow(ctx, P.x, P.y, 90 * (P.s || 1) * (P.child ? 0.7 : 1), lift);
  const Q = h4W({ ...P, y: P.y - lift });
  if (o.cape) ehCapeStand(ctx, Q, tc, { vx: o.vx || 0, swing: o.swing || 0 });
  if (o.tail) ehInvTail(ctx, Q, tc, { torn: true, vx: o.vx || 0, swing: o.swing || 0 });
  if (o.veil) ehVeilRibbon(ctx, Q, tc, { vx: o.vx || 0, swing: o.swing || 0 });
  person(ctx, ehDressP(D, Q));
  if (o.neck) ehFarNeck(ctx, Q);
  if (o.helmet) ehFarHelmet(ctx, Q, { t: tc, ...o.helmet });
  if (o.spear) { const [hx, hy] = ehHandW(Q, o.spear.hand || Q.handR || [40, -110]); ehFarSpear(ctx, hx, hy, Q.s || 1, o.spear.lean || 0, tc); }
  if (o.after) o.after(ctx, Q);
}
// a balloon above a head (panel units); steps [[t, text]...], rows split on '\n'; o {gone, size, dx, up, col, noTail}
function h4Say(ctx, S, steps, t, head, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0]; for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const rows = txt.split('\n'), size = o.size || 46, half = Math.max(...rows.map((r) => r.length)) * size * 0.36 + size * 0.6, x = K.clamp(head[0] + (o.dx || 0), 40 + half, 960 - half);
  const y0 = K.clamp(head[1] - (o.up || 150) - (rows.length - 1) * size * 2.05, 90, 1080), pop = 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), p = K.clamp((t - steps[0][0]) / 0.3);
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25); ctx.translate(x, y0); ctx.scale(pop, pop); ctx.translate(-x, -y0);
  rows.forEach((r, i) => S.label(ctx, r, x, y0 + i * size * 2.05, p, { size, balloon: true, to: i === rows.length - 1 && !o.noTail ? [head[0], head[1] - 34] : null, color: o.col })); ctx.restore();
}
function h4Word(ctx, S, txt, x, y, t, a, b, o = {}) { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= K.clamp((b - t) / 0.25); S.title(ctx, txt, x, y, K.clamp((t - a) / 0.25), { size: o.size || 66, align: 'center', glow: o.glow }); ctx.restore(); }
// head point of P in panel units
const h4Head = (P, cam) => h4P(...ehHeadOf(P), cam);
// a bobbing value on twos for walking people that are not moving (weight shift)
const h4Shift = (tc, seed, a = 4) => a * Math.sin(tc * 2.2 + seed);
// doves crossing (world units): list [[t0, x0, y0, dir, speed]]
function h4Doves(ctx, t, list, s = 0.32) { const tc = EH_T2(t); for (const [t0, x0, y0, d, sp] of list) { const u = t - t0; if (u < 0 || u > 8) continue;
  bird(ctx, { kind: 'dove', x: x0 + d * sp * u, y: y0 - 30 * Math.sin(u * 0.8) + 8 * Math.sin(tc * 5 + x0), s, dir: d, fly: true, flap: Math.sin(tc * 19 + x0), pal: 0 }); } }
// person-local hand target that reaches a world point W (for a standing P, ignoring tip)
function h4Reach(P, W) { const s = P.s || 1, d = Math.sign(P.dir || 1); return [(W[0] - P.x) / (s * d), (W[1] - P.y) / s]; }
// rider body-local point for a horse-local point p (rider scale ps on horse H; seat shift d, dy as in twoRiders)
function h4Loc(H, ps, p, d = 0, dy = 0) { const k = H.s / ps; return [(p[0] - (-8 + d)) * k - 22, (p[1] - (-238 + dy)) * k - 52]; }
// a world hand target only works when the local one is empty (people.js: handL || toLocal(handLW)); review 1: reaches were lost
function h4W(P) { if (P && P.handRW) { P.handR = h4Reach(P, P.handRW); P.handRW = null; } if (P && P.handLW) { P.handL = h4Reach(P, P.handLW); P.handLW = null; } return P; }
