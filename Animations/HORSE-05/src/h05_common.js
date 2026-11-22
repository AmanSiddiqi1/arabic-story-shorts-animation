// ===== HORSE-05 "The Rescue in the Sky": shared episode helpers (story names h5 / H5_) =====
const H5_DUR = 148.51;
const SCRIPT_TITLE_AR = 'النجاة في السماء';   // narration 144.51 + plan end_hold 4.0
const H5_F = (keys) => (t) => flow(t, keys);
const H5_HS = 0.9;       // the ebony horse's scale on the ground (as in episodes 1-4)
const H5_FZR = { ...EH_FIRUZ, pal: { ...EH_FIRUZ.pal, ...EH_FIRUZ_RIDE } };   // Firuz riding
const h5P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
// camera from a key table [[t, {x, y, zoom}]...], clamped to a strip w wide and a plate [top, bottom]
function h5Cam(table, t, w, top, bottom) { const c = K.camAt(table, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, w - 500 / z), y: K.clamp(c.y, top + 615 / z, bottom - 615 / z), zoom: z }; }
// camera y that puts the ground (world y gy) at panel y g for zoom z
const h5GY = (z, g = 950, gy = 900) => gy - (g - 615) / z;
const h5K = (t, x, z, g = 950, gy = 900, dy = 0) => [t, { x, y: h5GY(z, g, gy) + dy, zoom: z }];
function h5Shadow(ctx, x, y, w, lift = 0, o = {}) { groundShadow(ctx, x, y, w, lift, { flat: true, color: '#2b1a3a', alpha: o.alpha ?? 0.2, fall: o.fall ?? 260 }); }
// a person with its shadow and extras; o {cape, tail (torn), veil, helmet {tilt}, neck, spear {lean, hand}, vx, swing, crown {slip, lift}}
function h5Fig(ctx, D, P, t, o = {}) {
  if (!P) return; const tc = EH_T2(t), lift = P.lift || 0; h5Shadow(ctx, P.x, P.y, 90 * (P.s || 1) * (P.child ? 0.7 : 1), lift);
  const Q = { ...P, y: P.y - lift }; ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
  if (o.cape) ehCapeStand(ctx, Q, tc, { vx: o.vx || 0, swing: o.swing || 0 });
  if (o.tail) ehInvTail(ctx, Q, tc, { torn: true, vx: o.vx || 0, swing: o.swing || 0 });
  if (o.veil) ehVeilRibbon(ctx, Q, tc, { vx: o.vx || 0, swing: o.swing || 0 });
  person(ctx, ehDressP(D, o.crown ? { ...Q, pal: { ...(Q.pal || {}), head: 'none' } } : Q));
  if (o.crown) h5HairCrown(ctx, Q, o.crown);
  if (o.neck) ehFarNeck(ctx, Q);
  if (o.helmet) ehFarHelmet(ctx, Q, { t: tc, ...o.helmet });
  if (o.spear) { const [hx, hy] = ehHandW(Q, o.spear.hand || Q.handR || [40, -110]); ehFarSpear(ctx, hx, hy, Q.s || 1, o.spear.lean || 0, tc); }
  if (o.after) o.after(ctx, Q);
  ctx.restore();
}
// Firuz's hair and the gold crown drawn by the story (for the crown out of the toolbox and the slipping crown): c {on 0..1, slip rad, lift, at [x, y]}
function h5HairCrown(ctx, P, c = {}) {
  const s = P.s || 1, [hx, hy] = ehHeadOf(P), ln = '#3a1a2a';
  ctx.save(); ctx.translate(hx, hy); ctx.scale(s, s);
  shape(ctx, [[-38, 2], [-36, -22], [-16, -40], [16, -40], [36, -22], [38, 2], [28, -16], [10, -24], [-12, -24], [-28, -16]], '#1a1420', { lw: 3, line: ln });
  ctx.restore();
  if ((c.on ?? 1) <= 0) return;
  const at = c.at, x = at ? at[0] : hx, y = at ? at[1] : hy - 32 * s - (c.lift || 0);
  ctx.save(); ctx.translate(x, y); ctx.rotate(c.slip || 0); ctx.scale(s, s);
  celShade(ctx, [[-28, 0], [-26, -26], [-13, -12], [0, -30], [13, -12], [26, -26], [28, 0]], '#f2c040', '#c8961a', { light: [-1, -1], off: 6, hi: '#fff1b0', lw: 3, line: '#6a4a10' });
  shape(ctx, ell(0, -8, 5, 5, 10), EH_CRIMSON, { lw: 2, line: '#6a0a20' }); ctx.restore();
}
// a balloon above a head (panel units); steps [[t, text]...], rows split on '\n'; o {gone, size, dx, up, col, noTail, tails: [[x, y]...]}
function h5Say(ctx, S, steps, t, head, o = {}) {
  if (t < steps[0][0] || (o.gone && t > o.gone + 0.25)) return; let txt = steps[0][1], t0 = steps[0][0]; for (const [ts, tx] of steps) if (t >= ts) { txt = tx; t0 = ts; }
  const rows = txt.split('\n'), size = o.size || 46, half = Math.max(...rows.map((r) => r.length)) * size * 0.36 + size * 0.6, x = K.clamp(head[0] + (o.dx || 0), 40 + half, 960 - half);
  const y0 = K.clamp(head[1] - (o.up || 150) - (rows.length - 1) * size * 2.05, 90, 1080), pop = 1 + 0.12 * Math.max(0, 1 - (t - t0) / 0.2), p = K.clamp((t - steps[0][0]) / 0.3);
  ctx.save(); if (o.gone && t > o.gone) ctx.globalAlpha *= 1 - K.clamp((t - o.gone) / 0.25); ctx.translate(x, y0); ctx.scale(pop, pop); ctx.translate(-x, -y0);
  rows.forEach((r, i) => { const last = i === rows.length - 1 && !o.noTail;
    if (last && o.tails) o.tails.forEach((tl, k) => S.label(ctx, k ? '' : r, x, y0 + i * size * 2.05, p, { size, balloon: true, to: tl, color: o.col }));
    else S.label(ctx, r, x, y0 + i * size * 2.05, p, { size, balloon: true, to: last ? [head[0], head[1] - 34] : null, color: o.col }); });
  ctx.restore();
}
function h5Word(ctx, S, txt, x, y, t, a, b, o = {}) { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha *= K.clamp((b - t) / 0.25); S.title(ctx, txt, x, y, K.clamp((t - a) / 0.25), { size: o.size || 66, align: 'center', glow: o.glow }); ctx.restore(); }
const h5Head = (P, cam) => h5P(...ehHeadOf(P), cam);
// doves crossing (world units): list [[t0, x0, y0, dir, speed]]
function h5Doves(ctx, t, list, s = 0.32) { const tc = EH_T2(t); for (const [t0, x0, y0, d, sp] of list) { const u = t - t0; if (u < 0 || u > 8) continue;
  bird(ctx, { kind: 'dove', x: x0 + d * sp * u, y: y0 - 30 * Math.sin(u * 0.8) - 40 * u + 8 * Math.sin(tc * 5 + x0), s, dir: d, fly: true, flap: Math.sin(tc * 19 + x0), pal: 0 }); } }
// person-local hand target that reaches a world point W (for a standing P, ignoring tip)
function h5Reach(P, W) { const s = P.s || 1, d = Math.sign(P.dir || 1); return [(W[0] - P.x) / (s * d), (W[1] - P.y) / s]; }
// rider body-local point for a horse-local point p (rider scale ps on horse H; seat shift d, dy as in twoRiders)
function h5Loc(H, ps, p, d = 0, dy = 0) { const k = H.s / ps; return [(p[0] - (-8 + d)) * k - 22, (p[1] - (-238 + dy)) * k - 52]; }
// rider fields for the pair on the horse H: front = princess, rear = Firuz (scales follow the horse)
const h5PsF = (H) => EH_PRINCESS.s * H.s / H5_HS, h5PsR = (H) => EH_FIRUZ.s * H.s / H5_HS;
// draw the pair (or the princess alone: rear null) on H; o passes to twoRiders; returns the frames
function h5Pair(ctx, H, PF, PR, t, o = {}) {
  return twoRiders(ctx, H, PF ? { who: 'princess', D: EH_PRINCESS, P: { s: h5PsF(H), ...PF } } : null, PR ? { who: 'firuz', D: H5_FZR, P: { s: h5PsR(H), ...PR } } : null, t, { tc: EH_T2(t), ...o });
}
// rider heads (world) for balloons
function h5RiderHeads(H, PF, PR) { const out = {};
  if (PF) { const F = ehRiderFrame(H, EH_SEAT2.front, 0, PF.lurch || 0, PF.bob || 0, h5PsF(H)); out.f = ehRiderPt(F, 0, -150); }
  if (PR) { const F = ehRiderFrame(H, EH_SEAT2.rear, EH_SEAT2.rearDy, PR.lurch || 0, PR.bob || 0, h5PsR(H)); out.r = ehRiderPt(F, 0, -150); }
  return out; }
// the saddle rope: crimson cord from the saddle horn round both waists (taut 0..1 with a short vibration after tTaut)
function saddleRope(ctx, H, t, o = {}) { const tc = EH_T2(t), F = ehRiderFrame(H, EH_SEAT2.front, 0, o.lf || 0, 0, h5PsF(H)), R = ehRiderFrame(H, EH_SEAT2.rear, EH_SEAT2.rearDy, o.lr || 0, 0, h5PsR(H));
  const horn = ehHorsePt(H, [44, -246]), wf = ehRiderPt(F, 0, -40), wr = ehRiderPt(R, 0, -40), taut = K.clamp(o.taut ?? 1), vib = o.tTaut != null && t > o.tTaut ? 4 * Math.exp(-(t - o.tTaut) * 9) * Math.sin((t - o.tTaut) * 60) : 0;
  const sag = (1 - taut) * 26 * H.s + vib;
  h5Cord(ctx, horn, wf, sag, 6 * H.s); h5Cord(ctx, wf, wr, sag * 0.8, 6 * H.s);
  for (const p of [wf, wr]) celShade(ctx, ell(p[0], p[1], 7 * H.s, 6 * H.s, 10), EH_CRIMSON, '#b0183a', { off: 2, lw: 2, line: '#6a0a20' }); }
function h5Cord(ctx, a, b, sag, w) { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + sag; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#6a0a20'; ctx.lineWidth = w + 3; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(mx, my, b[0], b[1]); ctx.stroke(); ctx.strokeStyle = EH_CRIMSON; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); }
// the scales icon (balance scales: post 60 high, beam 70 wide, two pans), centre bottom (x, y), tilt rad, s
function scalesIcon(ctx, x, y, tilt = 0, s = 1) { const ln = '#6a4a10'; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  celShade(ctx, [[-22, 0], [22, 0], [14, -10], [-14, -10]], '#e0b038', '#b8861c', { off: 4, lw: 2.5, line: ln }); seg(ctx, 0, -10, 0, -66, 6, '#e0b038', 0);
  ctx.save(); ctx.translate(0, -64); ctx.rotate(tilt); seg(ctx, -38, 0, 38, 0, 6, '#e0b038', 0);
  for (const sd of [-1, 1]) { const px = sd * 36, py = 0; ctx.save(); ctx.translate(px, py); ctx.rotate(-tilt); ctx.strokeStyle = ln; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-14, 34); ctx.moveTo(0, 0); ctx.lineTo(14, 34); ctx.stroke();
    celShade(ctx, [[-20, 34], [20, 34], [12, 44], [-12, 44]], '#f2c040', '#c8961a', { off: 3, lw: 2.5, line: ln }); ctx.restore(); }
  ctx.restore(); celShade(ctx, ell(0, -66, 7, 7, 10), '#fff1b0', '#e0b038', { off: 2, lw: 2, line: ln }); ctx.restore(); }
// a round memory card (panel units), centre (cx, cy), radius r, pop p, draw(c, r) inside (origin at the centre)
function memoryCardRound(ctx, cx, cy, r, p, draw) { ehCallout(ctx, cx, cy, r, p, (c) => draw(c, r)); }
// the cloak thrown off: a flat brown panel flying along an arc from a to b (u 0..1), flapping, then draped over a helmet
function h5ThrownCloak(ctx, a, b, u, t, s = 1) { const x = K.lerp(a[0], b[0], u), y = K.lerp(a[1], b[1], u) - 160 * Math.sin(Math.PI * u) * s, fl = Math.sin(t * 22) * (1 - u), sp = 1 - 0.5 * u;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.6 + 0.9 * u + 0.2 * fl); ctx.scale(s, s);
  celShade(ctx, [[-60 * sp - 10, -40], [60 * sp + 10, -46 + 10 * fl], [50 * sp, 40], [0, 54 + 12 * fl], [-54 * sp, 38]], EH_CRAFT.pal.cape, '#6a3e1e', { light: [-1, -1], off: 10, lw: 3, line: '#3a2414' }); ctx.restore(); }
// the cloak hanging over a helmet (head point hx, hy), k 0..1 still on
function h5CloakOnHead(ctx, hx, hy, s, t, k = 1) { if (k <= 0) return; const sw = 4 * Math.sin(t * 3);
  ctx.save(); ctx.globalAlpha *= K.clamp(k * 3); ctx.translate(hx, hy - 60 * s + (1 - k) * 80 * s); ctx.scale(s, s);
  celShade(ctx, [[-56, 10], [-30, -40], [30, -42], [58, 8], [62 + sw, 110], [20, 90], [-20, 96], [-60 + sw, 118]], EH_CRAFT.pal.cape, '#6a3e1e', { light: [-1, -1], off: 12, lw: 3, line: '#3a2414' }); ctx.restore(); }
// the soft cap flying off (centre x, y, rot)
function h5Cap(ctx, x, y, rot, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); celShade(ctx, [...K.circlePts(0, 0, 37, 26, 20, Math.PI, Math.PI), [-37, 0]], EH_CRAFT.pal.hc, '#b8a880', { off: 6, lw: 3, line: '#5a4a2a' }); seg(ctx, -35, -2, 35, -2, 4, EH_CRAFT.pal.hd, 2); ctx.restore(); }
// picture icons used in balloons and cards (box units w x h)
function h5IconRose(c, w, h) { ehGrad(c, 0, 0, w, h, [[0, '#8ac8ff'], [1, '#e6f6ff']]); c.fillStyle = '#7ac85a'; c.fillRect(0, h * 0.78, w, h); princessPalace(c, w * 0.52, h * 0.82, Math.min(w, h) / 900, {}); ehRiverTowers(c, w * 0.08, w * 0.26, h * 0.84, h * 0.42, 9, ehRCP(false), { lamps: false }); }
function h5IconCream(c, w, h) { ehGrad(c, 0, 0, w, h, [[0, '#8ac8ff'], [1, '#fff2d0']]); c.fillStyle = '#6ab85a'; c.fillRect(0, h * 0.8, w, h); c.drawImage(ehPalacePlate(), w * 0.5 - 0.34 * w, h * 0.82 - 0.5 * w * 0.75, 0.68 * w, 0.5 * w); }
function h5IconScales(c, w, h, t) { ehGrad(c, 0, 0, w, h, [[0, '#fff6e0'], [1, '#ffe2b0']]); scalesIcon(c, w / 2, h * 0.86, 0.18 * Math.sin(EH_T2(t) * 3) * Math.exp(-(t - 54.66) * 1.2), Math.min(w, h) / 100); }
