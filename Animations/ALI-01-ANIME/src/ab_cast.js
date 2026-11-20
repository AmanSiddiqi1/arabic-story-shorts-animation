// ===== ALI-01-ANIME: the cast as colour-modelled cels =====
// People take their colour model as a palette (each set has its own colours; skin keeps its own colour); Ali Baba's sash and
// turban band stay the pure accent AB_ACC in every model. Animals and riders go through the abCel tint pass.

const AB_ALI0 = { robe: '#8f8a40', dot: '#64612a', sleeve: '#8f8a40', pants: '#efe2c4', hc: '#f6efe0', hd: '#cfc4ae', beard: '#2a1a14', hair: '#2a1a14' };
const AB_WIFE0 = { robe: '#c86a7c', dot: '#97485a', sleeve: '#c86a7c', hc: '#f3e2c0', hd: '#d6bf96' };
const AB_KID0 = { robe: '#f2eadc', dot: '#c6bca8', pants: '#efe2c4', hc: '#e8902a', sash: '#3f7ad0' };
const AB_CAS0 = { robe: '#1f9a6a', dot: '#126e4a', sleeve: '#1f9a6a', sash: '#f2a71b', trim: '#f2a71b', hc: '#f2a71b', hd: '#c07a10', band: '#c8481a', jewel: '#e8364f', beard: '#2a1612' };
const AB_LEAD0 = { robe: '#2a2032', dot: '#18121e', sleeve: '#2a2032', cape: '#a8183a', capeDot: '#6a0e22', hc: '#2c2c3c', hd: '#d8a830', beard: '#160c10', pants: '#3a2e40' };
const AB_RIDER0 = [   // indigo, plum, rust (+ face cloths in different colours)
  { robe: '#2e3470', dot: '#1e2250', cape: '#3a2a5a', capeDot: '#241a3e', hc: '#c8c0a8', hd: '#7a2a2a', beard: '#1a1210' },
  { robe: '#5a2a5a', dot: '#3e1a3e', cape: '#2a2032', capeDot: '#1a1220', hc: '#3a5a8a', hd: '#202a4a', beard: '#1a1210' },
  { robe: '#8a3a1e', dot: '#5e2410', cape: '#3a2a20', capeDot: '#241a12', hc: '#e8d2a0', hd: '#8a6a3a', beard: '#2a1a10' },
];
// every person goes through the story's cel finish (abCast: hard shade away from the light, coloured lines, optional rim via P.fin)
const abPerson = (ctx, P, m, D) => { abCast(ctx, P, 360, 330, (c) => person(c, D), m, P.fin || {}); return P; };
function abAli(ctx, P, m = 'morning', extra = 1) { const pal = abPal(AB_ALI0, m, extra); pal.sash = AB_ACC; pal.band = AB_ACC; return abPerson(ctx, { s: 0.95, ...P }, m, { costume: 'villager', s: 0.95, age: 0.25, ...P, pal }); }
function abWife(ctx, P, m = 'morning') { return abPerson(ctx, { s: 0.92, ...P }, m, { costume: 'villageWoman', s: 0.92, age: 0.25, ...P, pal: abPal(AB_WIFE0, m) }); }
function abKid(ctx, P, m = 'morning') { return abPerson(ctx, { s: 0.75, ...P }, m, { costume: 'servant', child: true, s: 1, ...P, pal: abPal(AB_KID0, m) }); }
function abCassim(ctx, P, m = 'night') { return abPerson(ctx, { s: 1.1, ...P }, m, { costume: 'merchant', s: 1.1, age: 0.4, ...P, pal: abPal(AB_CAS0, m) }); }
function abLeader(ctx, P, m = 'afternoon') { return abPerson(ctx, { s: 1.08, ...P }, m, { costume: 'bedouin', s: 1.08, age: 0.4, brow: 0.7, ...P, pal: abPal(AB_LEAD0, m) }); }
function abMan(ctx, i, P, m = 'afternoon') { return abPerson(ctx, { s: 0.95, ...P }, m, { costume: 'bedouin', s: 0.95, ...P, pal: abPal(AB_RIDER0[i % 3], m) }); }
// world position of a person's hand after drawing (P.hands is figure-local)
function abHand(P, i = 1) { const h = (P.hands || [[0, -100], [0, -100]])[i], s = P.s || 1, d = Math.sign(P.dir || 1); return [P.x + d * s * h[0], P.y + s * h[1] * (P.sq || 1)]; }

// animals through the tint pass (bb: feet x, y, width, height)
function abDonkey(ctx, P, m, o = {}) { const s = P.s || 1; abCel(ctx, [P.x, P.y, 380 * s, 380 * s], (c) => donkey(c, P), { m, ...(AB_FIN[m] || {}), shadeD: 18, rim: null, ...o }); }
function abHorse(ctx, P, m, o = {}) { const s = P.s || 1; abCel(ctx, [P.x, P.y, 440 * s, 400 * s], (c) => horse(c, P), { m, ...(AB_FIN[m] || {}), shadeD: 18, rim: null, ...o }); }
// a rider (person on a horse) as one cel, with a cloak ribbon tied to speed (v3, Fable review 2 note 4): hang 0 = streaming back
// on a travelling sine (4 drawings, galloping); hang 1 = hanging behind the saddle as a tapered ribbon whose tip sways on a calm
// 6-drawing cycle (standing). ph: the rider's own phase seed.
function abCloak(ctx, seat, dir, s, t, col, len = 1, hang = 0, ph = 0) {
  const tc = AB_T3(t), d = Math.sign(dir || 1), x0 = seat.x - d * 14 * s, y0 = seat.y - 120 * s, pts = [], pts2 = [], h = K.clamp(hang);
  const q = Math.floor((t + ph) * 4) / 4;   // calm cycle: 6 drawings of 0.25 s
  for (let k = 0; k <= 6; k++) { const u = k / 6, wv = Math.sin(tc * 14 - k * 1.1) * 14 * u * s, sw = Math.sin(q * Math.PI * 2 / 1.5 - u * 1.4) * 16 * u * u * s;
    const sx = x0 - d * u * 150 * s * len, sy = y0 + u * 30 * s + wv, hx = x0 - d * (16 + 58 * u + 14 * Math.sin(Math.PI * u)) * s * len - d * sw, hy = y0 + u * 118 * s;
    const x = K.lerp(sx, hx, h), y = K.lerp(sy, hy, h), wid = (36 - 20 * u) * s * (1 - 0.3 * h * u);
    pts.push([x, y]); pts2.push([x - d * wid * h, y + wid * (1 - h)]); }
  celShade(ctx, [...pts, ...pts2.reverse()], col, abDark(col, 0.45), { light: [-d, -1], off: 6 * s, lw: 3 });
}
function abRider(ctx, i, H, PP, m, o = {}) {
  const s = H.s || 1, cape = (i < 0 ? AB_LEAD0 : AB_RIDER0[i % 3]).cape, hang = o.hang ?? 1 - K.clamp((H.amp || 0) * 1.5 + (H.gallop ? 1 : 0));
  const cloak = (c, col) => { const seat = mountSeat('horse', H); abCloak(c, seat, H.dir, s, o.t || 0, col, o.cloak, hang, o.ph ?? i * 0.37); };
  // the leader's cloak keeps its crimson in the saddle: drawn once-tinted outside the cel tint pass (same colour as on foot)
  if (o.cloak && i < 0) cloak(ctx, abMul(cape, AB_MODEL[m].tint, AB_MODEL[m].k));
  abCel(ctx, [H.x, H.y, 460 * s, 640 * s], (c) => {
    if (o.cloak && i >= 0) cloak(c, abMul(cape, AB_MODEL[m].tint, AB_MODEL[m].k));
    if (o.sacks) { const seat = mountSeat('horse', H), d = Math.sign(H.dir || 1), bob = o.sackBob || 0; abSack(c, seat.x - d * 60 * s, seat.y + 40 * s + bob, s * 0.6 * (o.sackS || 1), o.flat ? 0 : 1, { coin: o.coin, sq: 1 - Math.abs(bob) * 0.008 }); }
    rideOn(c, 'horse', H, { costume: 'bedouin', s: s * (i < 0 ? 1.08 : 0.95), brow: i < 0 ? 0.7 : 0.3, ...PP, pal: abPal(i < 0 ? AB_LEAD0 : AB_RIDER0[i % 3], m) });
  }, { m, ...(AB_FIN[m] || {}), shadeD: 18, rim: null, ...o });
}
// baked silhouette strip: 11 small riders in one of 4 gallop drawings (cheap crowd: reuse with offsets)
function abSilStrip(f, dir = 1) {
  return K.cached(`ab:silstrip:${f}:${dir}`, () => { const c = K.layer(2300, 420), x = c.getContext('2d'), R = K.rng(64);
    for (let i = 0; i < 11; i++) { const px = 110 + i * 200 + R() * 40, s = 0.42 + R() * 0.1, H = { x: px, y: 400, s, dir, ph: f * Math.PI / 2 + i * 1.37, amp: 1, gallop: 1, silhouette: true };
      horse(x, H); const st = mountSeat('horse', H), d = dir; x.fillStyle = C.black;
      x.beginPath(); x.moveTo(st.x - 22 * s, st.y); x.lineTo(st.x + 20 * s * d, st.y); x.lineTo(st.x + 34 * s * d, st.y - 120 * s); x.lineTo(st.x - 6 * s * d, st.y - 130 * s); x.closePath(); x.fill();
      x.beginPath(); x.arc(st.x + 18 * s * d, st.y - 150 * s, 24 * s, 0, 7); x.fill();
      x.beginPath(); x.moveTo(st.x, st.y - 120 * s); x.quadraticCurveTo(st.x - d * 90 * s, st.y - 110 * s + (f % 2 ? 20 : -10) * s, st.x - d * 150 * s, st.y - 70 * s); x.lineTo(st.x - d * 10 * s, st.y - 70 * s); x.fill(); }
    return c; });
}
function abSilRow(ctx, x, y, t, s = 1, dir = 1, alpha = 1, seed = 0) { const f = Math.floor(AB_T2(t) * 8 + seed) % 4; ctx.save(); ctx.globalAlpha *= alpha; ctx.drawImage(abSilStrip(f, dir), x, y - 400 * s, 2300 * s, 420 * s); ctx.restore(); }
// a dust cloud: soft (painted) puffs, for the riders
function abDustSprite(col) { return K.cached('ab:dust:' + col, () => { const c = K.layer(420, 220), x = c.getContext('2d'), R = K.rng(19); x.filter = 'blur(7px)';
  for (let i = 0; i < 14; i++) { const px = 210 + (R() - 0.5) * 300, py = 190 - R() * 110, r = 34 + R() * 34; x.fillStyle = i % 3 ? col : abMul(col, '#7a5a8a', 0.4); x.beginPath(); x.ellipse(px, py, r * 1.4, r, 0, 0, 7); x.fill(); } return c; }); }
function abDust(ctx, x, y, w, h, t, a = 1, col = '#e8c49a') { const S = abDustSprite(col); ctx.save(); ctx.globalAlpha *= a;
  for (let k = 0; k < 2; k++) { const dx = Math.sin(t * 1.3 + k * 2) * 14, sw = w * (1 + 0.06 * Math.sin(t * 0.9 + k)); ctx.drawImage(S, x - sw / 2 + dx + (k ? w * 0.12 : -w * 0.12), y - h * 1.05, sw, h * 1.1); }
  ctx.restore(); }
