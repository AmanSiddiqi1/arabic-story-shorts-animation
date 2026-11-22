// ===== ALI-05 series cast (new in episode 5, for episode 6: copy this file): the new merchant (the leader's second disguise) and
// the nephew (Cassim's son). Both are palette variants of the Library person through abPerson (ab_cast.js: no tint, k 0) with small
// overlays only: long cream cuffs that hide the hands (the ring shows only when a cuff slides back), the fine dinner cloak with a gold
// trim, the turban jewel and a feather that trails three drawings late; the nephew's emerald waistcoat, blush and a gift in his hands.
// Every drawing is a pure function of its arguments (and t). Prefixes: abNewMerchant / abNephew / A5_.

const AB_NEWM0 = { robe: '#f08a5a', dot: '#c8643a', sleeve: '#f6e2c0', sash: '#ffd36a', trim: '#ffd36a', hc: '#7a3a8a', hd: '#5a2268', band: '#ffcf3a', jewel: '#3a8ae8', beard: '#b8562a', hair: '#8a3a1a', pants: '#7a4a6a' };
const A5_NM = { s: 1.08, age: 0.4 };                      // body-point defaults (a2BodyPt / a2HeadPt / a2Hand)
const A5_CLOAK = '#7a3a8a', A5_GOLD = '#ffcf3a';
// the feather on the turban: a curved plume whose angle trails the head (lag: a value the scene computes with lagged())
function a5Feather(ctx, P, lag = 0, B = A5_NM, col = '#fffaf0') {
  const d = Math.sign(P.dir || 1), sc = (P.s || 1.08) * (P.sq || 1), [bx, by] = a2HeadPt(P, -6 * d, -66, B), tot = d * ((P.tip || 0) + (P.tilt || 0)) - d * (0.25 + lag), L = 70 * sc, pts = [], pts2 = [];
  for (let k = 0; k <= 6; k++) { const u = k / 6, a = tot - d * 0.5 * u * u, w = (10 - 7 * u) * sc, x = bx + Math.sin(a) * L * u, y = by - Math.cos(a) * L * u; pts.push([x - Math.cos(a) * w, y - Math.sin(a) * w]); pts2.push([x + Math.cos(a) * w, y + Math.sin(a) * w]); }
  celShade(ctx, [...pts, ...pts2.reverse()], col, '#e0c8e8', { light: [-d, -1], off: 4 * sc, lw: 2.5, line: '#8a5a8a' });
}
// abNewMerchant(ctx, t, P, m, o): P person fields (x, y, dir, gaze, lid, mouth, brow, tip, sq, handL/handR/handLW/handRW, sit...).
// o: {fine 0/1 (dinner clothes: plum cloak with gold trim, jewel, feather), kick (cloak swing), stream 0..1 (cloak streams: running),
//     cuffL / cuffR 0..1 (1 = the cuff covers the hand, default 1), ring glint 0..1 (drawn when cuffR < 0.5), ringR (ring radius, 7),
//     feather lag, shadow, shc, gy, lift, noCloak}
function abNewMerchant(ctx, t, P, m, o = {}) {
  const Q = { s: 1.08, age: 0.4, brow: 0.7, ...P }, d = Math.sign(Q.dir || 1), tc = AB_T2(t);
  if (o.shadow !== false) a3Shadow(ctx, Q.x, o.gy ?? Q.y + (o.lift || 0), 150, o.lift || 0, o.shc);
  if (o.fine && !o.noCloak) {
    if (o.stream) { abStandCloak(ctx, { ...Q, x: Q.x + d * 5 }, t, A5_GOLD, 1, o.stream); abStandCloak(ctx, Q, t, A5_CLOAK, 1, o.stream); }
    else { a2HangCloak(ctx, { ...Q, x: Q.x + d * 6, y: Q.y + 4 }, tc, A5_GOLD, o.kick || 0, 0.45); a2HangCloak(ctx, Q, tc, A5_CLOAK, o.kick || 0, 0.45); }
  }
  abPerson(ctx, Q, m, { costume: 'merchant', ...Q, pal: abPal(AB_NEWM0, m) });
  if (o.fine) a5Feather(ctx, Q, o.feather || 0);
  // the cuffs: cream sleeve ends over the hands (the hands are hidden all film unless a cuff slides back)
  for (const i of [0, 1]) { const cf = K.clamp(i ? o.cuffR ?? 1 : o.cuffL ?? 1); const [hx, hy] = a2Hand(Q, i, A5_NM);
    if (i === 1 && cf < 0.5) silverRing(ctx, hx + 2 * d, hy - 4, o.ringR || 7, { glint: o.ring || 0 });
    if (cf > 0.02) { const sc = Q.s * (Q.sq || 1), r = 15 * sc * cf; celShade(ctx, ell(hx, hy - 4 * sc, r * 1.05, r, 14), '#f6e2c0', '#d8b88a', { light: [-1, -1], off: r * 0.35, lw: 2.5, line: '#8a6a3a' }); } }
  return Q;
}
// the leader underneath (the light band): the same pose in indigo and crimson (ab_cast abLeader + cloak)
function a5LeaderAs(ctx, t, P, m, o = {}) { return a2Lead(ctx, t, { ...P }, m, { shc: o.shc, kick: o.kick || 0, shadow: false }); }

// ---------- the nephew: white shirt, emerald waistcoat and saffron sash (his father's colours), rust skullcap, no beard ----------
const AB_NEPH0 = { robe: '#fffaf0', dot: '#d8d0c8', sleeve: '#fffaf0', sash: '#f2a71b', pants: '#efe2c4', hc: '#b8482a', hd: '#8a2e18', hair: '#2a1612', shoes: '#8a4a2a' };
const A5_NEPH = { s: 0.94, age: 0.08 };
function a5NephVest(ctx, P) { const pt = (x, y) => a2BodyPt(P, x, y, A5_NEPH), col = '#1f9a6a';
  for (const sd of [-1, 1]) celShade(ctx, [pt(sd * 34, -150), pt(sd * 9, -148), pt(sd * 12, -88), pt(sd * 36, -84)], col, '#126e4a', { light: [-1, -1], off: 4, lw: 2.5, line: '#0a4a30' }); }
function a5Blush(ctx, P, k, B = A5_NEPH) { if (k <= 0.02) return; const sc = (P.s || 1) * (P.sq || 1); ctx.save(); ctx.globalAlpha *= 0.75 * K.clamp(k);
  for (const sd of [-1, 1]) { const [x, y] = a2HeadPt(P, sd * 20, 12, B); ctx.fillStyle = '#ff8a9a'; ctx.beginPath(); ctx.ellipse(x, y, 10 * sc, 5.5 * sc, 0, 0, 7); ctx.fill(); } ctx.restore(); }
// abNephew(ctx, t, P, m, o): o {blush 0..1, box (the gift between the hands: giftBox scale), crate (a crate in both hands), shadow, shc, gy, lift}
function abNephew(ctx, t, P, m, o = {}) {
  const Q = { s: 0.94, age: 0.08, ...P };
  if (o.shadow !== false) a3Shadow(ctx, Q.x, o.gy ?? Q.y + (o.lift || 0), 100, o.lift || 0, o.shc);
  abPerson(ctx, Q, m, { costume: 'servant', ...Q, pal: abPal(AB_NEPH0, m) }); a5NephVest(ctx, Q); a5Blush(ctx, Q, o.blush || 0);
  if (o.box) { const [ax, ay] = a2Hand(Q, 0, A5_NEPH), [bx, by] = a2Hand(Q, 1, A5_NEPH); giftBox(ctx, (ax + bx) / 2, (ay + by) / 2 + 4, o.box, { t }); }
  return Q;
}
