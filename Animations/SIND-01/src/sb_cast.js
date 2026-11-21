// ===== SIND-01 cast (series bible; shared by the Sinbad episodes): Sinbad, the captain, the crew, the three merchants, the family,
// the island king and court, the grooms, the king's horses. All are Library figures (person, equine rig) with this story's palettes.
// No colour-model tint over the cast (owner direction): every figure keeps its colours in every light; a rim is the only light effect.
// In this style a costume's "dot" fills the robe as its flat tone, so dot = the visible robe colour (a step darker than robe).

// Sinbad: villager costume, age 0, s 0.95, no beard. Tangerine turban and sash (the one accent), warm white knee tunic with short
// sleeves, plum trousers, brown shoes (bare after the wreck: P.bare). The turban tail is a separate 60-unit ribbon (SIND-02 unwinds it).
const SB_SIN = { robe: '#f7f0e0', dot: '#f1e8d4', sleeve: '#f7f0e0', sleeveLen: 'short', sash: SB_ACC, hc: SB_ACC, hd: SB_ACCD, band: '#ffffff', pants: '#7b4bb0', head: 'smallTurban', beard: 'none', tache: false, shoes: '#7a4a2a', hair: '#2a1a14' };
const SB_CAPT = { robe: '#1f5f8a', dot: '#1f5f8a', sleeve: '#4a90c0', sash: '#f2b01e', trim: '#f2b01e', hc: '#ffffff', hd: '#e4e4ee', jewel: '#e8364f', belly: 0.4 };
const SB_SAILOR = [   // teal, mustard, rose, leaf, sky tunics; contrasting caps; bare feet
  { robe: '#2aa39a', dot: '#2aa39a', sleeve: '#2aa39a', hc: '#e8364f', sash: '#ffd36a', pants: '#f3e6cc', shoes: 'bare' },
  { robe: '#e0a82a', dot: '#e0a82a', sleeve: '#e0a82a', hc: '#2a5ad0', sash: '#d0285a', pants: '#f3e6cc', shoes: 'bare' },
  { robe: '#d85a7a', dot: '#d85a7a', sleeve: '#d85a7a', hc: '#2aa39a', sash: '#ffd36a', pants: '#f3e6cc', shoes: 'bare' },
  { robe: '#5aa84a', dot: '#5aa84a', sleeve: '#5aa84a', hc: '#ffd36a', sash: '#2a5ad0', pants: '#f3e6cc', shoes: 'bare' },
  { robe: '#5a9ae0', dot: '#5a9ae0', sleeve: '#5a9ae0', hc: '#fff1d8', sash: '#e8364f', pants: '#f3e6cc', shoes: 'bare' },
];
const SB_MERCH = [    // fat (emerald, saffron turban), plum (thin, lilac sleeves), rust (villager)
  { costume: 'merchant', s: 1.02, age: 0.4, pal: { robe: '#1f9a6a', dot: '#1f9a6a', sleeve: '#3fb486', hc: '#f2a71b', hd: '#c07a10', sash: '#ffd36a', trim: '#ffd36a', belly: 1, jewel: '#e8364f' } },
  { costume: 'merchant', s: 0.97, age: 0.35, pal: { robe: '#8a4a9a', dot: '#8a4a9a', sleeve: '#b88ad0', hc: '#ffffff', hd: '#e4e4ee', sash: '#ffd36a', trim: '#e8c070', belly: 0, beard: '#2a1a14', jewel: '#2a8ad0' } },
  { costume: 'villager', s: 0.96, age: 0.3, pal: { robe: '#c8602a', dot: '#c8602a', sleeve: '#c8602a', hc: '#fff1d8', hd: '#e0c8a0', band: '#2a6ad8', sash: '#2a6ad8', pants: '#f3e6cc' } },
];
const SB_FAM = {
  mother: { costume: 'villageWoman', s: 0.9, age: 0.5, pal: { robe: '#a88ad8', dot: '#a88ad8', sleeve: '#a88ad8', hc: '#fff1d8', hd: '#e8d8b8' } },
  father: { costume: 'physician', s: 0.98, age: 0.7, pal: { robe: '#8f8a40', dot: '#8f8a40', sleeve: '#a8a258', hc: '#ffffff', hd: '#e4e4ee', sash: '#e8c070' } },
  sister: { costume: 'maiden', child: true, s: 1, age: 0, pal: { robe: '#6fd0a8', dot: '#6fd0a8', sleeve: '#6fd0a8', band: SB_ACC, sash: SB_ACC, hair: '#2a1a14' } },
};
const SB_KING = { costume: 'caliph', s: 1.05, age: 0.5, pal: { robe: '#1f9a6a', dot: '#1f9a6a', sleeve: '#3fb486', trim: '#ffd36a', cape: '#7a4ab8', capeDot: '#7a4ab8', sash: '#ffd36a', hc: '#ffffff', hd: '#e4e4ee', jewel: '#2a6ad8', head: 'bigTurban' } };
const SB_VIZ = { costume: 'vizier', s: 1.0, age: 0.5 };
const SB_GUARD = { costume: 'servant', s: 0.98, age: 0.3, pal: { robe: '#2ab0a0', dot: '#2ab0a0', sleeve: '#2ab0a0', sash: '#ffd36a', hc: '#ffd36a', pants: '#f3e6cc', beard: '#2a1a14' } };
const SB_GROOM = [
  { costume: 'servant', s: 0.95, age: 0.15, pal: { robe: '#2f63d6', dot: '#2f63d6', sleeve: '#2f63d6', sash: '#ffd36a', hc: '#f0d070', pants: '#f3e6cc', shoes: 'bare' } },
  { costume: 'servant', s: 0.98, age: 0.5, pal: { robe: '#2f63d6', dot: '#2f63d6', sleeve: '#2f63d6', sash: '#ffd36a', hc: '#f0d070', pants: '#f3e6cc', shoes: 'bare' } },
];
// the king's horses: white, bay, black (lifted so the legs read), each with a royal blue cloth and gold trim
const SB_HORSE_PAL = [
  { body: '#f6f2ea', dot: '#d8d0c8', far: '#d0c8c0', mane: '#8a8296', hoof: '#4a4658', muzzle: '#e0d8d0' },
  { body: '#a0581e', dot: '#a0581e', far: '#6a3812', mane: '#241a1a', hoof: '#2a2a33', blaze: '#fff6ea' },
  { body: '#4a4658', dot: '#4a4658', far: '#27242f', mane: '#14121a', hoof: '#7a7690', blaze: '#fff6ea' },
];
const SB_HORSE_B = { ...EQUINE.horse, pal: SB_HORSE_PAL };
function sbHorse(ctx, P) { equine(ctx, { cloth: '#2f63d6', trim: '#ffd36a', ...P }, SB_HORSE_B);
  if (P.saddle !== false) { const st = mountSeat('horse', { ...P }), s = P.s || 1; celShade(ctx, [[st.x - 10 * s, st.y + 34 * s], [st.x - 8 * s, st.y + 20 * s], [st.x, st.y + 28 * s], [st.x + 8 * s, st.y + 20 * s], [st.x + 10 * s, st.y + 34 * s]], '#ffd36a', '#c8901a', { light: [-1, -1], off: 2, lw: 1.5 }); } }

// ---------- world position of a point on a person (handles sit/kneel/lie, lean, tilt, child, rot, tip, sq) ----------
// q: [x, y] relative to the head centre (head = true) or upper-body local (head = false)
function sbPt(P, q, head = true) {
  const D = PEOPLE.dress(P), lie = K.clamp(P.lie || 0), s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, hipY = -75;
  const hc = personPose(P, -1, 0).hipC, off = [hc[0], hc[1] - hipY], lean = (P.lean || 0) + D.age * 0.12 * (1 - lie);
  const rot = (p, a, cx, cy) => { const c = Math.cos(a), n = Math.sin(a), dx = p[0] - cx, dy = p[1] - cy; return [cx + dx * c - dy * n, cy + dx * n + dy * c]; };
  let p = q;
  if (head) { const hs = P.child ? 1.25 : 1, hx0 = (P.look || 0) * 4, hdY = -195 + (P.drop || 0) + D.age * 6 - (P.child ? 9 : 0); p = rot([hx0 + q[0] * hs, hdY + q[1] * hs], (P.tilt || 0) + 0.35 * lie, hx0, hdY); }
  p = rot(p, lean, 0, hipY); p = [p[0] + off[0], p[1] + off[1]];
  if (lie > 0) { p = rot(p, -Math.PI / 2 * lie, 0, hipY); p = [p[0], p[1] + 41 * lie]; }
  let d = [dir * s * p[0], s * p[1]]; if (P.rot) d = rot(d, P.rot, 0, 0);
  const sq = P.sq ?? 1, tip = (P.tip || 0) * Math.sign(dir || 1); d = [d[0] * (1 + (1 - sq) * 0.7), d[1] * sq]; if (tip) d = rot(d, tip, 0, 0);
  return [P.x + d[0], P.y + d[1]];
}
const sbHandW = (P, i = 1) => sbPt(P, P.hands ? P.hands[i] : [0, -100], false);

// ---------- people ----------
function sbPerson(ctx, base, P) { const Q = { ...base, ...P, pal: { ...(base.pal || {}), ...(P.pal || {}) } }; person(ctx, Q); P.hands = Q.hands; return Q; }
// Sinbad. P.tail: [angle offset, wind 0..1] for the turban tail; P.bare: bare feet; P.noTail; P.wind (-1 blows the tail left .. 1 right)
function sbSinbad(ctx, P) {
  const Q = { costume: 'villager', s: 0.95, age: 0, ...P, pal: { ...SB_SIN, ...(P.bare ? { shoes: 'bare' } : {}), ...(P.pal || {}) } }, t = P.t || 0, dir = Q.dir || 1, wind = P.wind ?? -dir * 0.4;
  if (!P.noTail) { const a = sbPt(Q, [-22, -32]), ang = Math.PI / 2 - wind * 0.42 * Math.PI + (P.tailA || 0);
    sbRibbon(ctx, a[0], a[1], ang, 60 * Q.s * (P.child ? 0.62 : 1), 16 * Q.s, t, { amp: 6 + 8 * Math.abs(wind), freq: 9 + 4 * Math.abs(wind), ph: 0.6 }); }
  person(ctx, Q); P.hands = Q.hands;
  // the sash end at the hip (front), arriving late
  if (!P.noSash && !(Q.lie > 0.5)) { const h = sbPt(Q, [dir > 0 ? -26 : -26, -86], false); sbRibbon(ctx, h[0], h[1], Math.PI / 2 - 0.3 * wind + (P.sashA || 0), 34 * Q.s, 12 * Q.s, t, { amp: 3 + 4 * Math.abs(wind), freq: 7, ph: 2 }); }
  return Q;
}
function sbCaptain(ctx, P) { return sbPerson(ctx, { costume: 'merchant', s: 1.08, age: 0.6, pal: SB_CAPT }, P); }
function sbSailor(ctx, i, P) { return sbPerson(ctx, { costume: 'servant', s: 0.92, age: 0.2 + (i % 3) * 0.1, pal: SB_SAILOR[i % 5] }, P); }
function sbMerchant(ctx, i, P) { return sbPerson(ctx, SB_MERCH[i], P); }
function sbFamily(ctx, who, P) { const Q = sbPerson(ctx, SB_FAM[who], P);
  if (who === 'sister') for (const sd of [-1, 1]) { const b = sbPt(Q, [sd * 26 * Q.dir, -50]); sbBlob(ctx, b[0] - 6, b[1], 6, 4, SB_ACC, SB_ACCD, { lw: 1.5, off: 2 }); sbBlob(ctx, b[0] + 6, b[1], 6, 4, SB_ACC, SB_ACCD, { lw: 1.5, off: 2 }); }
  return Q; }
// the king: bigTurban with a separate gold crown on top (it can hop off: P.crown = {dx, dy, rot} offsets, or null to draw it on)
function sbKing(ctx, P) { const Q = sbPerson(ctx, SB_KING, P), c = sbPt(Q, [0, -62]), o = P.crown || { dx: 0, dy: 0, rot: 0 };
  ctx.save(); ctx.translate(c[0] + o.dx, c[1] + o.dy); ctx.rotate(o.rot + (Q.tip || 0) * (Q.dir || 1)); const s = Q.s;
  celShade(ctx, [[-30 * s, 0], [-28 * s, -30 * s], [-14 * s, -14 * s], [0, -38 * s], [14 * s, -14 * s], [28 * s, -30 * s], [30 * s, 0]], '#ffd36a', '#c8901a', { light: [-1, -1], off: 6, hi: '#fff3b0', lw: 3 });
  shape(ctx, ell(0, -10 * s, 6 * s, 6 * s, 10), '#2a6ad8', { lw: 2 }); ctx.restore(); return Q; }
function sbVizier(ctx, P) { return sbPerson(ctx, SB_VIZ, P); }
function sbGuard(ctx, P) { const Q = sbPerson(ctx, SB_GUARD, P), h = sbHandW(Q, 1), a = P.spear ?? 0.05;
  ctx.save(); ctx.translate(h[0], h[1]); ctx.rotate(a); seg(ctx, 0, 110, 0, -210, 6, '#a8743e', 1.5); celShade(ctx, [[0, -250], [12, -214], [0, -200], [-12, -214]], '#d8dcef', '#8f94b8', { light: [-1, -1], off: 4, lw: 2 }); ctx.restore(); return Q; }
function sbGroom(ctx, i, P) { return sbPerson(ctx, SB_GROOM[i], P); }

// ---------- Sinbad in the water: the Library person, the chest at the wave line (the sea layers drawn after hide the rest) ----------
// wy: the water line at his x. crawl: phase (radians) of the crawl stroke, k 0..1 stroke size; returns the figure (hands in P.hands)
function sbSwimmer(ctx, x, wy, t, o = {}) {
  const s = 0.95, ph = o.crawl ?? 0, k = o.k ?? 1, arm = (sd) => { const c = 0.5 + 0.5 * Math.sin(ph + (sd > 0 ? 0 : Math.PI)); return [0.5 + 2.5 * c * k, 0.6 + 2.2 * c * k + 0.4]; };
  const P = { x, y: wy + (o.depth ?? 150) * s, dir: o.dir || 1, t, tip: o.tip ?? 0.18, bare: true, aL: o.aL || arm(-1), aR: o.aR || arm(1), mouth: o.mouth || 'closed', gaze: o.gaze || [1, -0.1], lid: o.lid ?? 0, brow: o.brow || 0, wet: true, drop: o.drop || 0, tilt: o.tilt || 0, sq: o.sq, wind: o.wind ?? -0.6, noSash: true, handLW: o.handLW, handRW: o.handRW };
  if (o.handLW) delete P.aL; if (o.handRW) delete P.aR;
  return sbSinbad(ctx, P);
}

// ---------- a hand gripping an edge (close-ups; SIND-01 revision 1) ----------
// the bare forearm from (ax, ay) to the knuckles on the edge at (x, y), the back of the hand on top, four fingers curled over and down
// the near face, the thumb along the top. s scale (1 = 1.3x the Library hand at Sinbad's size), sq 0..1 squeeze (fingers tighten,
// knuckles whiten), dir +1 / -1 which way the fingers point (toward the camera side). o {skin, shade, line}
function sbGripHand(ctx, ax, ay, x, y, s = 1, sq = 0, o = {}) {
  const skin = o.skin || C.skin, sh = o.shade || '#d99a80', line = o.line || '#6a3a2a', dir = o.dir || 1;
  const ang = Math.atan2(y - ay, x - ax), w = 13 * s, nx = -Math.sin(ang) * w, ny = Math.cos(ang) * w;
  celShade(ctx, [[ax + nx, ay + ny], [x + nx * 0.9, y + ny * 0.9 - 4 * s], [x - nx * 0.9, y - ny * 0.9 - 4 * s], [ax - nx, ay - ny]], skin, sh, { light: [-1, -1], off: 5 * s, lw: 2.5, line });
  // fingers: curled over the edge, down the near face (shorter and tighter with the squeeze)
  for (let k = 0; k < 4; k++) { const fx = x + (k - 1.5) * 9.5 * s * dir, fl = (17 - 5 * sq - Math.abs(k - 1.5) * 2) * s;
    celShade(ctx, [[fx - 4.6 * s, y - 4 * s], [fx + 4.6 * s, y - 4 * s], [fx + 4.4 * s, y + fl - 3 * s], [fx, y + fl], [fx - 4.4 * s, y + fl - 3 * s]], skin, sh, { light: [-1, -1], off: 2.5 * s, lw: 2, line }); }
  // back of the hand on top of the edge, the thumb along it
  celShade(ctx, ell(x, y - 8 * s, 22 * s, 11 * s, 18), skin, sh, { light: [-1, -1], off: 4 * s, hi: sbLight(skin, 0.4), lw: 2.5, line });
  celShade(ctx, ell(x - dir * 22 * s, y - 6 * s, 9 * s, 6 * s, 12), skin, sh, { light: [-1, -1], off: 2 * s, lw: 2, line });
  // knuckles: hard highlights that whiten with the squeeze
  for (let k = 0; k < 4; k++) { ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * sq; ctx.fillStyle = sbMix(sbLight(skin, 0.5), '#ffffff', sq); ctx.beginPath(); ctx.ellipse(x + (k - 1.5) * 9.5 * s * dir, y - 4 * s, 3.4 * s, 2.2 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
}

// ---------- the series "cling" pose (SIND-01 revision 1): Sinbad over a floating plank ----------
// chest and both forearms over the wood, cheek on it, legs trailing below (the caller draws the front water after, which clips them).
// pl {x, y, rot} the plank (sbPlank origin), wy the water line at him. o: {lid, breath (0..1 phase), slip (0..1: the near hand slides
// off and re-grips), head (0 cheek on the wood .. 1 head up), gaze, mouth, eyes, wind, hs (hand scale, default 0.8)}. Returns the figure.
function sbCling(ctx, pl, wy, t, o = {}) {
  const hd = 1 - K.clamp(o.head ?? 0), br = Math.sin((o.breath ?? t * 0.9) * Math.PI * 2);
  const Q = sbSwimmer(ctx, pl.x - 34, wy + 10, t, { depth: 108 + 3 * br, dir: 1, tip: 0.5 + 0.06 * hd, drop: 14 * hd, tilt: 0.3 * hd, lid: o.lid ?? 0.6, gaze: o.gaze || [1, 0.4], mouth: o.mouth || 'closed', wind: o.wind ?? -0.4, sq: 1 + 0.02 * br,
    handLW: [pl.x - 70, pl.y - 2], handRW: [pl.x + 40, pl.y - 2] });
  if (o.eyes) Q.eyes = o.eyes;
  sbPlank(ctx, pl.x, pl.y, { rot: pl.rot, t, wet: true });
  const ca = Math.cos(pl.rot), sa = Math.sin(pl.rot), E = (lx, dy = 0) => [pl.x + lx * ca - (dy - 4) * sa, pl.y + lx * sa + (dy - 4) * ca], h = sbPt(Q, [0, 0]), hs = o.hs ?? 0.8, sl = K.clamp(o.slip || 0);
  const far = E(h[0] - pl.x - 64), near = E(h[0] - pl.x + 58 + 30 * sl, 22 * sl);
  sbGripHand(ctx, h[0] - 16, pl.y - 10 + 2 * br, far[0], far[1], hs, 0.4, { dir: -1 });
  sbGripHand(ctx, h[0] + 22, pl.y - 6 + 2 * br, near[0], near[1], hs, 0.4 * (1 - sl), { dir: 1 });
  return Q;
}
