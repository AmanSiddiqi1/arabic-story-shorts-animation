// ===== ALI-04 series cast (new in episode 4, for episodes 4 to 6: copy this file): the town guard preset (three builds + the captain
// with the dark lantern), the baker and his apprentice (palette variants), night dress (nightcaps; Ali Baba's nightshirt), the folded
// thief inside a jar. All on the Library person through abPerson (ab_cast.js), palettes and small overlays only; k 0 (no tint).

// ---------- nightcap: a soft cap with a tassel ribbon that trails (lag) ----------
function nightcap(ctx, P, col, o = {}) { const d = Math.sign(P.dir || 1), B = { s: P.s, age: P.age ?? 0.3 }, [hx, hy] = a2HeadPt(P, 0, -34, B), sc = (P.s || 1) * (P.sq || 1), tl = ((P.tip || 0) + (P.tilt || 0)) * d;
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(tl); ctx.scale(sc, sc);
  celShade(ctx, [[-40, 10], [-36, -14], [-10, -34], [30, -30], [52, -6 + (o.flop || 0) * 10], [40, 12]].map(([x, y]) => [x * d, y]), col, abDark(col, 0.3), { light: [-d, -1], off: 6, lw: 2.5, line: abDark(col, 0.6) });
  const sw = o.sway || 0; seg(ctx, 50 * d, -4, (62 + 6 * sw) * d, 18 + 4 * sw, 4, abDark(col, 0.2), 0); shape(ctx, ell((64 + 7 * sw) * d, 22 + 4 * sw, 8, 8, 10), o.tassel || '#fff6ea', { lw: 2 });
  seg(ctx, -40 * d, 10, 40 * d, 12, 7, abLight(col, 0.4), 1.5); ctx.restore(); }

// ---------- the town guards: sky-blue tunics, saffron sashes, brass helmets with a point and a white neck cloth, rag-wrapped spears ----------
const A4_GUARD0 = { robe: '#5aa0e0', dot: '#3a7ab8', sleeve: '#8cc0f0', sash: '#f2a71b', pants: '#efe2c4', head: 'cap', hc: '#e8c050', hd: '#b08a20', beard: '#3a2418' };
const A4_GUARDS = [   // builds: tall thin, short stout, young; the captain (white cape, red plume, grey moustache)
  { s: 1.05, age: 0.35, w: 0.94 }, { s: 0.9, age: 0.4, w: 1.12 }, { s: 0.96, age: 0.05, w: 1, beard: 'none' },
  { s: 1.06, age: 0.55, w: 1.04, cap: true },
];
// guard(ctx, t, k, P, m, o): k 0..2 guards, 3 the captain. o: {spear 'up' | 'level' | 'down' | angle (radians from vertical), spearAt [x, y] (butt world point),
//   lantern {open} in the left hand (captain), helmetSlip 0..1 (over the eyes), shadow, shc, kick (cape)}
function guard(ctx, t, k, P, m, o = {}) {
  const G = A4_GUARDS[k], Q = { s: G.s, age: G.age, ...P }, d = Math.sign(Q.dir || 1), tc = AB_T2(t), B = { s: G.s, age: G.age };
  if (o.shadow !== false) a3Shadow(ctx, Q.x, o.gy ?? Q.y + (o.lift || 0), 110 * G.s * G.w, o.lift || 0, o.shc);
  if (G.cap) a2HangCloak(ctx, { ...Q, s: G.s }, tc, '#f6f0e6', o.kick || 0, 0.21);
  const pal = abPal({ ...A4_GUARD0, beard: G.age > 0.5 ? '#9a9aa8' : A4_GUARD0.beard }, m);
  ctx.save(); if (G.w !== 1) { ctx.translate(Q.x, 0); ctx.scale(G.w, 1); ctx.translate(-Q.x, 0); }
  abPerson(ctx, Q, m, { costume: 'villager', ...Q, s: G.s, age: G.age, pal: G.beard === 'none' ? { ...pal, beard: '#3a2418' } : pal, ...(G.beard === 'none' ? { } : {}) });
  ctx.restore();
  // helmet point, rim and neck cloth (the cloth lags the head)
  const sl = K.clamp(o.helmetSlip || 0), [hx, hy] = a2HeadPt(Q, 0, -40 + 22 * sl, B), sc = G.s * (Q.sq || 1), tl = ((Q.tip || 0) + (Q.tilt || 0)) * d + (o.helmetTilt || 0);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(tl); ctx.scale(sc, sc);
  const nc = idleSway(tc, 700 + k, 0.4, 1.7) + (o.kick || 0); celShade(ctx, [[-d * 26, 0], [-d * 44, 4], [-d * (58 + 8 * nc), 46], [-d * (34 + 4 * nc), 52], [-d * 18, 14]], '#fffaf0', '#d8d0e0', { light: [-d, -1], off: 4, lw: 2.5, line: '#8a8098' });
  celShade(ctx, [[-36, 4], [-34, -18], [-14, -34], [0, -58], [14, -34], [34, -18], [36, 4]], '#e8c050', '#b08a20', { light: [-1, -1], off: 7, hi: '#fff0a0', lw: 2.5, line: '#6a4a10' });
  seg(ctx, -38, 4, 38, 4, 7, '#c89a30', 1.5);
  if (G.cap) { const pl = idleSway(tc, 710, 0.25, 1.3) + (o.kick || 0) * 0.6; celShade(ctx, [[-2, -56], [4, -58], [-d * (22 + 10 * pl), -88], [-d * (34 + 14 * pl), -84], [-d * 16, -64]], '#e8364f', '#a81a2a', { off: 3, lw: 2, line: '#6a0a14' }); }
  ctx.restore();
  if (G.cap) { const [mx, my] = a2HeadPt(Q, 0, 14, B); ctx.save(); ctx.translate(mx, my); ctx.scale(sc, sc); for (const sd of [-1, 1]) celShade(ctx, [[sd * 2, -2], [sd * 22, -4], [sd * 34, 4], [sd * 30, 10], [sd * 14, 6], [sd * 2, 6]], '#c8c8d4', '#9a9aa8', { off: 2, lw: 2, line: '#5a5a6a' }); ctx.restore(); }
  // spear (guards) or the dark lantern (captain)
  if (o.spear != null && !G.cap) { const [hx2, hy2] = o.spearHand || a2Hand(Q, 1, B), ang = typeof o.spear === 'number' ? o.spear : { up: 0.05 * d, level: 1.45 * d, down: Math.PI - 0.3 * d, cross: 0.42 * d }[o.spear] ?? 0;
    const L = 300 * G.s, ux = Math.sin(ang), uy = -Math.cos(ang), bx = hx2 - ux * L * 0.4, by = hy2 - uy * L * 0.4, tx = hx2 + ux * L * 0.6, ty = hy2 + uy * L * 0.6;
    seg(ctx, bx, by, tx, ty, 6, '#a8743e', 1.5);
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(ang); celShade(ctx, [[0, 4], [-8, -6], [0, -30], [8, -6]], '#d8dce8', '#8a90b0', { off: 3, lw: 2, line: '#3a3e5a' }); ctx.restore();
    if (o.glint) abGlint(ctx, tx + ux * 18, ty + uy * 18, 20, o.glint);
    ctx.save(); ctx.translate(bx, by); ctx.rotate(ang); celShade(ctx, K.rectPts(-8, -6, 16, 34), '#e8dcc8', '#b8a890', { off: 3, lw: 2 }); ctx.restore(); }
  if (o.lantern) { const [lx, ly] = a2Hand(Q, 0, B); darkLantern(ctx, lx, ly + 6, 0.9, { open: o.lantern.open || 0, t }); }
  return Q;
}

// ---------- the baker (door 1) and his apprentice ----------
const A4_BAKER0 = { robe: '#b8d4f0', dot: '#8aaed8', sleeve: '#d0e4f8', apron: '#fffaf0', pants: '#d0e4f8', head: 'cap', hc: '#f2903a', hd: '#c86a1a', beard: '#6a3a1e' };
function baker(ctx, t, P, m, o = {}) { const Q = { s: 1.1, age: 0.45, ...P }; if (o.shadow !== false) a3Shadow(ctx, Q.x, o.gy ?? Q.y + (o.lift || 0), 140, o.lift || 0, o.shc);
  ctx.save(); ctx.translate(Q.x, 0); ctx.scale(1.12, 1); ctx.translate(-Q.x, 0); abPerson(ctx, Q, m, { costume: 'carpenter', sleeveLen: 'long', ...Q, pal: abPal(A4_BAKER0, m) }); ctx.restore();
  nightcap(ctx, Q, '#f2903a', { sway: idleSway(AB_T2(t), 720, 1, 1.5) + (o.capKick || 0), flop: o.flop || 0, tassel: '#fff6ea' });
  if (o.pin) { const [hx, hy] = a2Hand(Q, 1, { s: 1.1, age: 0.45 }); rollingPin(ctx, hx, hy, o.pinRot ?? -0.6 * Math.sign(Q.dir || 1), 1); }
  if (o.flour) { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.7)'; const R = K.rng(5); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(Q.x - 20 + R() * 40, Q.y - 120 + R() * 40, 3, 0, 7); ctx.fill(); } ctx.restore(); }
  return Q; }
const A4_BOY0 = { robe: '#5aa860', dot: '#3a8a46', sleeve: '#7ac080', pants: '#efe2c4', head: 'cap', hc: '#f2c84a', hd: '#c8a020', sash: '#e8742a', shoes: 'bare' };
function apprentice(ctx, t, P, m, o = {}) { const Q = { s: 0.8, age: 0.05, ...P }; if (o.shadow !== false) a3Shadow(ctx, Q.x, o.gy ?? Q.y + (o.lift || 0), 84, o.lift || 0, o.shc);
  abPerson(ctx, Q, m, { costume: 'servant', ...Q, pal: abPal({ ...A4_BOY0, ...(o.noCap ? { head: 'none', hair: '#3a2216' } : {}) }, m) });
  if (o.capSlip && !o.noCap) { const [hx, hy] = a2HeadPt(Q, 8, -22, { s: 0.8, age: 0.05 }); celShade(ctx, ell(hx, hy, 22 * 0.8, 10, 14), '#f2c84a', '#c8a020', { off: 3, lw: 2 }); }
  if (o.pan) { const [hx, hy] = a2Hand(Q, o.panHand ?? 1, { s: 0.8, age: 0.05 }); fryingPan(ctx, hx, hy, o.panRot ?? -1.2, 0.95); }
  return Q; }
// the cap the boy leaves in the air (a separate cel): x, y, spin
function a4Cap(ctx, x, y, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); celShade(ctx, [...K.circlePts(0, 6, 30, 24, 16, Math.PI, Math.PI), [-30, 6]], '#f2c84a', '#c8a020', { light: [-1, -1], off: 5, lw: 2.5, line: '#6a5010' }); ctx.restore(); }

// ---------- night dress: the old neighbour's white nightcap; Ali Baba's cream nightshirt and cap (the vermilion sash kept) ----------
function neighbourNight(ctx, t, P, m, o = {}) { const Q = a3Neighbour(ctx, t, P, m, o); nightcap(ctx, { ...Q, age: 0.8 }, '#fffaf0', { sway: idleSway(AB_T2(t), 730, 1, 1.8), tassel: '#c86a8a' }); return Q; }
const A4_ALINIGHT0 = { ...AB_ALI0, robe: '#f0ead8', dot: '#cfc6ae', sleeve: '#f6f0e0', pants: '#f0ead8', head: 'none', hair: '#2a1a14' };
function aliNight(ctx, t, P, m, o = {}) { const Q = { s: 0.95, age: 0.25, ...P }; if (o.shadow !== false) a3Shadow(ctx, Q.x, Q.y, 110, 0, o.shc);
  const pal = abPal(A4_ALINIGHT0, m); pal.sash = AB_ACC; abPerson(ctx, Q, m, { costume: 'villager', ...Q, pal });
  nightcap(ctx, Q, '#f6efe0', { sway: idleSway(AB_T2(t), 740, 1, 1.6), tassel: AB_ACC });
  if (o.candle) { const [hx, hy] = a2Hand(Q, o.candleHand ?? 0, A2_ALI); celShade(ctx, ell(hx, hy + 4, 16, 5, 12), '#e8c050', '#a88020', { off: 2, lw: 2 }); celShade(ctx, K.rectPts(hx - 5, hy - 26, 10, 28), '#fffaf0', '#d8d0c0', { off: 2, lw: 2 });
    const f = 1 + 0.15 * Math.sin(AB_T2(t) * 21); abGlow(ctx, hx, hy - 34, 60, 0.7, '#ffc860'); celShade(ctx, [[hx - 4, hy - 28], [hx, hy - 28 - 14 * f], [hx + 4, hy - 28]], '#fff2a0', '#ffb030', { off: 1, lw: 1.5 }); }
  return Q; }

// ---------- the folded thief inside a jar (jar-local units: the jar is 70 x 150 at s 1, figure scale 0.62 / jar scale) ----------
// jarMan(ctx, t, i, F): F {pose 'thumb' | 'yawn' | 'fan' | 'sleep' | 'bite' | 'scratch', nod 0..1, lid, gaze}
function jarMan(ctx, t, i, F = {}) { const tc = AB_T2(t), s = 0.62 / CY.jarS, ph = i * 0.37, br = breathe(tc, 760 + i, 0.03);
  const P = { x: 0, y: -8, s, dir: i % 2 ? -1 : 1, sit: 1, seat: 'floor', sq: br, tip: idleSway(tc, 770 + i, 0.04, 2.2) + 0.12 * (F.nod || 0), lid: F.lid ?? abLid(t, 780 + i), gaze: F.gaze || [0, 0], mouth: 'closed', handL: [24, -120], handR: [30, -126] };
  const pose = F.pose;
  if (pose === 'thumb') { P.handR = [40, -190]; P.mouth = 'smile'; }
  else if (pose === 'yawn') { const y = Math.abs(osc(tc, 2.4, ph)); P.mouth = y > 0.5 ? 'o' : 'closed'; P.handR = y > 0.5 ? [10, -160] : [30, -126]; P.lid = Math.max(P.lid, 0.5); }
  else if (pose === 'fan') { P.handR = [36 + 10 * Math.sin(tc * 14), -170]; P.mouth = 'frown'; }
  else if (pose === 'sleep') { P.lid = 1; P.tip = 0.18 + 0.03 * osc(tc, 2.6); P.mouth = 'closed'; P.handL = [20, -140]; P.handR = [26, -146]; }
  else if (pose === 'bite') { P.handR = [10, -166 + 4 * Math.sin(tc * 18)]; P.eyes = 'wide'; P.gaze = [osc(tc, 1.1) * 0.6, 0]; }
  else if (pose === 'scratch') { P.handR = [20, -180 + 6 * Math.sin(tc * 20)]; P.mouth = 'frown'; }
  abMan(ctx, i, P, 'night');
  if (pose === 'sleep') { ctx.save(); ctx.translate(18 * P.dir, -120); ctx.rotate(-0.3); seg(ctx, 0, 0, 0, 60, 5, '#c8a050', 1); celShade(ctx, K.rectPts(-12, -6, 24, 8), '#e8c050', '#a88020', { off: 2, lw: 1.5 }); ctx.restore();
    if (F.bubble) { const b = 0.5 + 0.5 * osc(tc, 1.6); ctx.save(); ctx.globalAlpha = 0.85; ctx.strokeStyle = '#bfe0ff'; ctx.lineWidth = 1.5; ctx.fillStyle = 'rgba(190,230,255,0.4)'; ctx.beginPath(); ctx.arc(10 * P.dir, -100, 4 + 6 * b, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); } }
  return P; }
