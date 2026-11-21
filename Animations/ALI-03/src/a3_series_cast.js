// ===== ALI-03 series cast: morgiana (+ windowBust, eye close-up), spyDisguise, oilMerchant, the old neighbour, townsfolk, sneakChain =====
// Written for episodes 3 to 6 (copy this file). Built on the Library person (ab_cast.js abPerson, the series cel finish) with palettes
// and small overlays only (no new body). Every figure takes the scene's colour model m (k 0: no tint over the cast) and draws its own
// flat ground shadow unless o.shadow === false.

const A3_SH = '#3a2a4a';   // flat ground shadow colour (day); night scenes pass o.shc
const a3Shadow = (ctx, x, y, w, lift = 0, col = A3_SH) => groundShadow(ctx, x, y, w, lift, { flat: true, color: col });

// ---------- Morgiana: cream dress, violet waistcoat, ONE accent: the turquoise headscarf and sash (never tinted) ----------
const AB_MORG_ACC = '#14c2c8';
const AB_MORG0 = { robe: '#f4e6c8', dot: '#cdb894', sleeve: '#8a62c0', trim: '#6a3fa0', hc: AB_MORG_ACC, hd: '#0e8a90', sash: AB_MORG_ACC, hair: '#3a2216' };
const A3_MORG = { s: 0.93, age: 0.15 };
function abMorgiana(ctx, P, m = 'morning') { const pal = abPal(AB_MORG0, m); pal.hc = AB_MORG_ACC; pal.sash = AB_MORG_ACC; return abPerson(ctx, { s: 0.93, ...P }, m, { costume: 'villageWoman', s: 0.93, age: 0.15, ...P, pal }); }
// the scarf tail: a ribbon from the back of the head on a travelling sine; o.stream 0..1 (running: it flies back), o.kick (a swing value)
function morgScarf(ctx, P, t, o = {}) {
  const d = Math.sign(P.dir || 1), s = (P.s || 0.93) * (P.sq || 1), [ax, ay] = a2HeadPt(P, -d * 26, 14, A3_MORG), tc = AB_T2(t), st = K.clamp(o.stream || 0), kk = o.kick || 0, pts = [], pts2 = [];
  for (let k = 0; k <= 6; k++) { const u = k / 6, wv = Math.sin(tc * 9 - k * 1.1) * (5 + 10 * st) * u * s, hx = ax - d * (8 + 22 * u) * s - d * kk * 40 * u * u, hy = ay + 74 * u * s, fx = ax - d * 82 * u * s, fy = ay + 18 * u * s;
    const x = K.lerp(hx, fx, st), y = K.lerp(hy, fy, st) + wv * (st > 0.3 ? 1 : 0.4), w = (15 - 9 * u) * s; pts.push([x - d * w * 0.5 * (1 - st), y - w * st * 0.5]); pts2.push([x + d * w * 0.5 * (1 - st), y + w * (st * 0.5 + 0.2)]); }
  celShade(ctx, [...pts, ...pts2.reverse()], AB_MORG_ACC, '#0e8a90', { light: [-d, -1], off: 4 * s, lw: 2.5, line: '#0a5a60' });
}
// the violet waistcoat panels over the bodice (front-facing figure)
function morgVest(ctx, P) { const pt = (x, y) => a2BodyPt(P, x, y, A3_MORG), col = '#6a3fa0';
  for (const sd of [-1, 1]) celShade(ctx, [pt(sd * 31, -142), pt(sd * 10, -142), pt(sd * 14, -96), pt(sd * 33, -90)], col, '#4a2878', { light: [-1, -1], off: 4, lw: 2.5, line: '#2e1650' }); }
// a market basket (oranges, carrots); x, y = its bottom centre
function a3Basket(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (o.full !== false) { for (const [ox, oy] of [[-18, -40], [2, -46], [20, -38]]) abBlob(ctx, ox, oy, 12, 12, '#ff9a2a', '#d0661a', { lw: 2, off: 3, hi: '#ffd08a', line: '#8a3a10' });
    ctx.save(); ctx.translate(-6, -44); ctx.rotate(-0.5); celShade(ctx, [[-3, 0], [3, 0], [1, -30], [-1, -30]], '#ff7a1a', '#c04a0a', { off: 1.5, lw: 1.5 }); seg(ctx, 0, -30, -6, -42, 3, '#3f9a4a', 0); ctx.restore(); }
  celShade(ctx, [[-34, -34], [34, -34], [26, 0], [-26, 0]], '#d8a050', '#a06a2a', { light: [-1, -1], off: 6, lw: 2.5, line: '#5a3410' });
  ctx.strokeStyle = '#a06a2a'; ctx.lineWidth = 2; for (const yy of [-24, -12]) { ctx.beginPath(); ctx.moveTo(-31, yy); ctx.lineTo(31, yy); ctx.stroke(); }
  ctx.restore();
}
// morgiana(ctx, t, P, m, o): the full figure. o: {stream, kick (scarf), basket 'hip' | [x, y] (on the ground), chalk, bowl, shadow, shc, lift}
function morgiana(ctx, t, P, m, o = {}) {
  const s = P.s || 0.93; if (o.shadow !== false) a3Shadow(ctx, P.x, o.gy ?? P.y + (o.lift || 0), 104 * s, o.lift || 0, o.shc);
  morgScarf(ctx, P, t, o);
  if (o.basket === 'hip') { P.handL = P.handL || [-40, -96]; }
  abMorgiana(ctx, P, m); morgVest(ctx, P);
  if (o.basket === 'hip') { const [hx, hy] = a2Hand(P, 0, A3_MORG); a3Basket(ctx, hx + 4 * Math.sign(P.dir || 1), hy + 22, 0.72 * s, { rot: -0.08 * Math.sign(P.dir || 1) }); }
  if (o.chalk) { const [hx, hy] = a2Hand(P, 1, A3_MORG); seg(ctx, hx - 2, hy - 2, hx + 6, hy - 18, 6, '#fffaf2', 1.5); if (o.chalk > 1) abGlint(ctx, hx + 6, hy - 20, 22, (t * 1.5) % 1); }
  if (o.bowl) { const [hx, hy] = a2Hand(P, 0, A3_MORG); celShade(ctx, [[hx - 22, hy - 8], [hx + 22, hy - 8], [hx + 14, hy + 10], [hx - 14, hy + 10]], '#e8d2b0', '#a8906a', { off: 3, lw: 2 }); ctx.fillStyle = '#c8202a'; ctx.beginPath(); ctx.ellipse(hx, hy - 8, 19, 4, 0, 0, 7); ctx.fill(); }
  if (o.redTip) { const [hx, hy] = a2Hand(P, 1, A3_MORG); ctx.fillStyle = '#e8202a'; ctx.beginPath(); ctx.arc(hx + 4, hy - 6, 4, 0, 7); ctx.fill(); }
  return P;
}
// windowBust: Morgiana in Ali Baba's window, clipped to the recess (feet at sill + 150); arms on the sill by world hand targets
function morgianaWindow(ctx, t, P, m, o = {}) {
  const W = TS.win, Q = { y: W.sill + 150, dir: -1, ...P };
  ctx.save(); ctx.beginPath(); ctx.rect(W.x, W.y, W.w, W.h + 2); ctx.clip(); morgScarf(ctx, Q, t, o); abMorgiana(ctx, Q, m); morgVest(ctx, Q); ctx.restore(); return Q;
}

// ---------- the eye close-up (panel units, full panel): a3Eyes(ctx, t, F) ----------
// F: who 'morgiana' | 'leader', gaze [gx, gy], lid 0..1, wide 0..1, brow -1..1, reflect(ctx, r, sd) (drawn inside each iris), glint 0..1
const A3_EYES = {
  morgiana: { skin: '#f7c6a3', shade: '#e0a080', line: '#6a3a2a', iris: '#8a4a1e', irisD: '#4a2410', brow: '#3a2216', cloth: AB_MORG_ACC, clothS: '#0e8a90', lash: '#2a1018', lashes: true },
  leader: { skin: '#e8b08a', shade: '#c08060', line: '#4a2418', iris: '#3a2418', irisD: '#140a06', brow: '#160c10', cloth: '#3a3446', clothS: '#241e30', lash: '#140a10', heavy: true },
};
function a3Eyes(ctx, t, F = {}) {
  const D = A3_EYES[F.who || 'morgiana'], gz = F.gaze || [0, 0];
  abGrad(ctx, 0, 0, 1000, 1230, [[0, D.shade], [0.5, D.skin], [1, D.shade]]);
  ctx.save(); ctx.translate(500, 640); ctx.scale(1.55, 1.55);
  // head cloth band across the top, the scarf edge with a hard fold
  celShade(ctx, [[-420, -420], [420, -420], [420, -205], [200, -180], [0, -172], [-200, -180], [-420, -205]], D.cloth, D.clothS, { light: [-1, -1], off: 26, hi: abLight(D.cloth, 0.4), lw: 5, line: abDark(D.clothS, 0.4) });
  if (F.who === 'leader') { ctx.save(); ctx.strokeStyle = '#e0b038'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-420, -212); ctx.quadraticCurveTo(0, -186, 420, -212); ctx.stroke(); ctx.restore(); }
  for (const sd of [-1, 1]) {
    const ex = sd * 190, ey = 0, ew = 140, eh = 82 + 14 * (F.wide || 0), lid = K.clamp(F.lid ?? 0);
    const alm = [[ex - sd * ew, ey + 8], [ex - sd * ew * 0.5, ey - eh * 0.95], [ex + sd * ew * 0.3, ey - eh * 1.05], [ex + sd * ew * 1.05, ey - 8], [ex + sd * ew * 0.4, ey + eh * 0.85], [ex - sd * ew * 0.5, ey + eh * 0.8]];
    ctx.save(); K.poly(ctx, alm, true); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.clip();
    const ir = 58 * (F.iris ?? 1), ix = ex + gz[0] * 56, iy = ey + gz[1] * 24;
    ctx.fillStyle = D.iris; ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.84, ir * 1.1, 0, 0, 7); ctx.fill();
    ctx.fillStyle = D.irisD; ctx.beginPath(); ctx.ellipse(ix, iy - ir * 0.35, ir * 0.84, ir * 0.6, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#120a10'; ctx.beginPath(); ctx.ellipse(ix, iy + 3, ir * 0.36, ir * 0.48, 0, 0, 7); ctx.fill();
    if (F.reflect) { ctx.save(); ctx.beginPath(); ctx.ellipse(ix, iy, ir * 0.84, ir * 1.1, 0, 0, 7); ctx.clip(); ctx.translate(ix, iy); F.reflect(ctx, ir, sd); ctx.restore(); }
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(ix - ir * 0.34, iy - ir * 0.44, ir * 0.24, ir * 0.3, -0.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(ix + ir * 0.3, iy + ir * 0.42, ir * 0.1, ir * 0.1, 0, 0, 7); ctx.fill();
    if (F.glint) { ctx.fillStyle = '#ffd890'; ctx.beginPath(); ctx.ellipse(ix + ir * 0.4, iy - ir * 0.5, ir * 0.16, ir * 0.16, 0, 0, 7); ctx.fill(); }
    if (lid > 0) { ctx.fillStyle = D.skin; ctx.fillRect(ex - ew * 1.2, ey - eh * 1.2, ew * 2.4, eh * 2.3 * lid); }
    ctx.restore();
    const ly = ey - eh + eh * 1.9 * lid;
    ctx.save(); ctx.strokeStyle = D.lash; ctx.lineCap = 'round'; ctx.lineWidth = D.heavy ? 20 : 16; ctx.beginPath(); ctx.moveTo(ex - sd * ew * 1.02, ey + 4 + (ly - ey) * 0.4); ctx.quadraticCurveTo(ex, ly - 10, ex + sd * ew * 1.12, ly + 6 - (lid > 0.9 ? 0 : 14)); ctx.stroke();
    if (D.lashes) { ctx.lineWidth = 7; for (const k of [0.6, 0.85, 1.05]) { const lx = ex + sd * ew * k, lyy = ly - 6 + (k - 0.6) * 20; ctx.beginPath(); ctx.moveTo(lx, lyy); ctx.lineTo(lx + sd * 30, lyy - 26); ctx.stroke(); } }
    ctx.lineWidth = 5; ctx.strokeStyle = D.line; ctx.beginPath(); ctx.moveTo(ex - sd * ew * 0.4, ey + eh * 0.95); ctx.quadraticCurveTo(ex + sd * ew * 0.2, ey + eh * 1.05, ex + sd * ew * 0.8, ey + eh * 0.5); ctx.stroke();
    const by = F.brow || 0, b0 = ey - 128 - (by < 0 ? -by * 40 : 0), inner = by > 0 ? by * 34 : by * 30;
    ctx.lineWidth = D.heavy ? 34 : 14; ctx.strokeStyle = D.brow; ctx.beginPath(); ctx.moveTo(ex - sd * ew * 0.95, b0 + inner); ctx.quadraticCurveTo(ex, b0 - 26, ex + sd * ew * 1.1, b0 + 12 - (by < 0 ? by * 10 : 0)); ctx.stroke(); ctx.restore();
  }
  // the nose bridge
  ctx.save(); ctx.fillStyle = D.shade; ctx.beginPath(); ctx.moveTo(10, 40); ctx.lineTo(44, 300); ctx.lineTo(4, 320); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.restore();
}

// ---------- spyDisguise: the first spy (plum thief, tall) and the second spy (green thief, short and round) ----------
// d: 0 the thief's own head cloth, 1 bare head (changing), 2 the disguise. o: {d, kick (cloak), chalk 'hand', dot (red practice dot on
// the turban), cap slip 0..1 (spy 2), brush 'ear' | 'hand', smear, pot 'hand' + potSwing, shadow, shc}
const A3_SPY = [null, { i: 1, s: 0.98, age: 0.35, cloak: '#c8a070', pal: { head: 'turban', hc: '#f3e6c8', hd: '#d8c8a0', band: '#8e4a8e', cape: '#c8a070', capeDot: '#9a7448' } },
  { i: 3, s: 0.84, age: 0.35, cloak: '#a8a8b8', pal: { head: 'none', hair: '#2a1a10', cape: '#a8a8b8', capeDot: '#7a7a8e' } }];
function spyDisguise(ctx, t, which, P, m, o = {}) {
  const S = A3_SPY[which], d = o.d ?? 2, base = AB_RIDER0[S.i], s = S.s, dir = Math.sign(P.dir || 1), Q = { s, ...P }, B = { s, age: S.age };
  if (o.shadow !== false) a3Shadow(ctx, P.x, o.gy ?? P.y + (o.lift || 0), 110 * s, o.lift || 0, o.shc);
  const cloakCol = d >= 2 ? S.cloak : base.cape; a2HangCloak(ctx, Q, AB_T2(t), cloakCol, o.kick || 0, which * 0.41);
  const pal = abPal({ ...base, ...(d >= 2 ? S.pal : d === 1 ? { head: 'none', hair: '#2a1a10' } : {}) }, m);
  abPerson(ctx, Q, m, { costume: 'bedouin', ...Q, age: S.age, pal });
  if (which === 2 && d >= 2) { const sl = K.clamp(o.slip || 0), [hx, hy] = a2HeadPt(Q, 0, -26 + 22 * sl, B), sc = s * (Q.sq || 1), tl = (Q.tip || 0) * dir + (Q.tilt || 0) * dir;
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(tl + (o.capTilt || 0)); ctx.scale(sc, sc);
    const dome = [...K.circlePts(0, 4, 50, 40, 22, Math.PI, Math.PI), [-50, 4]]; ctx.save(); K.poly(ctx, dome, true); ctx.fillStyle = '#fff1d8'; ctx.fill(); ctx.clip(); ctx.fillStyle = '#d8323a'; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(k * 16 - 6, 6); ctx.lineTo(k * 9 - 3, -40); ctx.lineTo(k * 9 + 4, -40); ctx.lineTo(k * 16 + 5, 6); ctx.fill(); } ctx.restore(); ink(ctx, dome, 3, 1, '#6a1a1a');
    seg(ctx, -50, 4, 50, 4, 9, '#d8323a', 2); shape(ctx, ell(0, -38, 8, 7, 10), '#d8323a', { lw: 2 }); ctx.restore(); }
  if (which === 1 && o.dot) { const [x, y] = a2HeadPt(Q, -dir * 30, -40, B); doorMark(ctx, x, y, { kind: 'dot', s: 0.55 * s, p: K.clamp(o.dot) }); }
  if (o.chalk) { const [hx, hy] = a2Hand(Q, 1, B); seg(ctx, hx - 2, hy - 4, hx + dir * 4, hy - 20, 6, '#fffaf2', 1.5); }
  if (o.whiteHand) { const [hx, hy] = a2Hand(Q, 1, B); ctx.save(); ctx.globalAlpha *= o.whiteHand; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(hx, hy, 11 * s, 0, 7); ctx.fill(); ctx.restore(); }
  if (o.brush) { const at = o.brush === 'ear' ? a2HeadPt(Q, dir * 36, -4, B) : a2Hand(Q, 1, B), rot = o.brush === 'ear' ? -0.9 * dir : (o.brushRot ?? -0.6 * dir); ctx.save(); ctx.translate(at[0], at[1]); ctx.rotate(rot);
    seg(ctx, -22, 0, 18, 0, 5, '#c8a070', 1.5); celShade(ctx, [[18, -5], [34, -3], [40, 0], [34, 3], [18, 5]], '#e8202a', '#a01018', { off: 2, lw: 1.5 }); ctx.restore(); }
  if (o.smear) { const [x, y] = a2HeadPt(Q, dir * 36, 6, B); ctx.fillStyle = '#e8202a'; ctx.beginPath(); ctx.ellipse(x, y, 5, 3, 0.4, 0, 7); ctx.fill(); }
  if (o.pot) { const [hx, hy] = a2Hand(Q, 0, B); a3PaintPot(ctx, hx, hy, o.potSwing || 0, s, o.potCol); }
  return Q;
}
// a small pot of red paint on a wire handle (hand point hx, hy; swing radians)
function a3PaintPot(ctx, hx, hy, sw = 0, s = 1, col = '#e8202a') { ctx.save(); ctx.translate(hx, hy); ctx.rotate(sw); ctx.scale(s, s); ctx.strokeStyle = '#5a5a6a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 18, 18, Math.PI, 0); ctx.stroke();
  celShade(ctx, [[-18, 18], [18, 18], [15, 50], [-15, 50]], '#c8b090', '#8a7458', { off: 4, lw: 2.5 }); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 19, 17, 4, 0, 0, 7); ctx.fill(); ctx.fillRect(-4, 18, 8, 12); ctx.restore(); }

// ---------- oilMerchant: the leader's rig in the merchant costume (not revealed in this episode); the silver ring on the right hand ----------
const AB_OILM0 = { robe: '#d8a43a', dot: '#a8781e', sleeve: '#ecc062', sash: '#fff1d8', trim: '#fff1d8', hc: '#f6efe0', hd: '#8a98b8', jewel: '#3a8ae8', beard: '#160c10', pants: '#7a4a2a' };
const A3_OILM = { s: 1.08, age: 0.4 };
function oilMerchant(ctx, t, P, m, o = {}) {
  const s = 1.08, Q = { s, ...P }; if (o.shadow !== false) a3Shadow(ctx, P.x, P.y, 140, 0, o.shc);
  a2HangCloak(ctx, { ...Q, x: Q.x + Math.sign(Q.dir || 1) * 4 }, AB_T2(t), '#c8203f', o.kick || 0, 0.7);   // the crimson lining (only a sliver shows)
  a2HangCloak(ctx, Q, AB_T2(t), '#7a4a2a', o.kick || 0, 0.7);
  abPerson(ctx, Q, m, { costume: 'merchant', brow: 0.7, ...Q, age: 0.4, pal: abPal(AB_OILM0, m) });
  if (o.rope) { const [hx, hy] = a2Hand(Q, 0, A3_OILM); ctx.save(); ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + o.rope[0]) / 2, Math.max(hy, o.rope[1]) + (o.slack ?? 30), o.rope[0], o.rope[1]); ctx.stroke(); ctx.restore(); }
  const [rx, ry] = a2Hand(Q, 1, A3_OILM); silverRing(ctx, rx + 3, ry - 3, 4.5, { glint: o.glint || 0 });
  return Q;
}

// ---------- the old neighbour (door 2): oldWoman, a broom ----------
function a3Neighbour(ctx, t, P, m, o = {}) {
  const Q = { s: 0.88, ...P }; if (o.shadow !== false) a3Shadow(ctx, P.x, P.y, 96, 0, o.shc);
  abPerson(ctx, Q, m, { costume: 'oldWoman', age: 0.8, ...Q, pal: abPal({ robe: '#8a5a8a', dot: '#6a3a6a', sleeve: '#a87aa8', hc: '#5a6a9a', hd: '#3e4a7a' }, m) });
  if (o.broom != null) { const [hx, hy] = a2Hand(Q, 1, { s: 0.88, age: 0.8 }), bx = hx + (o.broom || 0), by = 902; seg(ctx, hx, hy - 30, bx, by - 26, 6, '#c8a070', 1.5);
    celShade(ctx, [[bx - 6, by - 30], [bx + 6, by - 30], [bx + 22, by], [bx - 22, by]], '#e8c870', '#b89040', { light: [-1, -1], off: 4, lw: 2 }); }
  return Q;
}
// market townsfolk (all Library presets with their own colours)
const A3_FOLK = {
  fruit: { costume: 'villager', s: 0.92, pal: { robe: '#e8742a', dot: '#b5501a', sleeve: '#f09a5a', hc: '#fff1d8', band: '#3f7ad0', pants: '#efe2c4' } },
  cloth: { costume: 'merchant', s: 0.95, pal: { robe: '#2f9a8e', dot: '#1f6e66', sleeve: '#5ac0b4', hc: '#ffd36a', hd: '#c08a1a', sash: '#e8364f', trim: '#ffd36a' } },
  granny: { costume: 'oldWoman', s: 0.84, age: 0.85, hold: 'stick', pal: { robe: '#4a6ab8', dot: '#344a8a', sleeve: '#6a8ad0', hc: '#c86a8a', hd: '#8a4a5a' } },
  jar: { costume: 'beanSeller', s: 0.95, pal: { robe: '#7a4ac8', dot: '#5a3098', sleeve: '#9a72e0', hc: '#fff1d8', apron: '#fff6ea' } },
};
function a3Folk(ctx, kind, P, m, o = {}) { const F = A3_FOLK[kind]; if (o.shadow !== false) a3Shadow(ctx, P.x, P.y, 100, 0, o.shc); return abPerson(ctx, { s: F.s, ...P }, m, { ...F, ...P, pal: abPal(F.pal, m) }); }

// ---------- sneakChain: a single file of tiptoeing figures following a leader position function ----------
// sneakChain(xf, i, tc, o): pose fields for member i (delay o.delay per member, gap o.gap behind); high knees, short stride, arms tucked,
// an accordion bump at o.stop (each member a little later). o.back: walking backward (dir stays facing the doors).
function sneakChain(xf, i, tc, o = {}) {
  const dl = (o.delay ?? 0.3) * i, gap = (o.gap ?? 90) * i, f = (u) => xf(u - dl) - (o.dir ?? 1) * gap, W = walk(f, tc, { stride: o.stride ?? 15, amp: 50 });
  const bump = o.stop != null ? lurch(tc, o.stop + dl * 0.6, 0.12) : 0;
  return { ...W, amp: Math.min(1, W.amp * 1.3), tip: 0.06 * (o.dir ?? 1) + bump + idleSway(tc, 300 + i, 0.02, 2.1), sq: 1 - 0.04 * W.amp + 0.02 * Math.abs(Math.sin(W.ph)), handL: [30, -150 + 6 * Math.sin(W.ph)], handR: [38, -162 - 6 * Math.sin(W.ph)], drop: 6 };
}
