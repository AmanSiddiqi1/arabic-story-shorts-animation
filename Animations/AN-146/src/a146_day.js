// ===== AN-146 paragraph 1: S1 the shop opens (street, day), S2 a day of trade (interior), S3 closing at dusk (street) =====
const A146_STK = 780;   // bale stack centre in the shop alcove (bales 702..936)

// ---------- S1 0.0..9.2: the ex-thief throws away his mask and opens a cloth shop ----------
const A146_S1X = a146X([[0, 500], [4.86, 500], [5.5, 600], [9.2, 600]]);
function a146MaskPos(t) { if (t < 1.38) return null; const u = K.clamp((t - 1.38) / 0.6), a = [470, 600], b = [336, 790]; return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 160 * Math.sin(Math.PI * u), u]; }
function a146S1(ctx, t) {
  const door = t < 5.52 ? 0 : settleTo(t, 5.52, 0, 0.9, 0.5, 0.1), shut = K.clamp((t - 6.34) / 0.3);
  a146Street(ctx, t, { u: 0.22, door, shut, stall: t < 6.55 ? 'closed' : 'open', sign: K.clamp((t - 5.52) / 0.35), signSw: swing(t, 5.87, 0.25, 1.3, 1.6) + 0.02 * Math.sin(t * 1.4),
    bolts: [0, 1, 2].map((i) => K.clamp((t - 7.48 - i * 0.15) / 0.25)), lock: t < 5.25 ? 1 : 0, lockShake: a146Shake(t, 5.1, 0.25, 3, 2) });
  if (t >= 6.5 && t < 7.0) a146Dust(ctx, 165, 560, t, 6.55, 5, 3);
  // the man
  const tf = turnFlip(t, [[0, 1], [2.9, -1], [3.15, 1], [8.35, -1]], 0.25), thief = t < 3.15, x = A146_S1X(t);
  const P = thief ? a146Thf(x, t >= 1.38 ? { pal: { head: 'hair' } } : {}) : a146Mer(x, t < 3.4 ? { pal: { head: 'hair' } } : {});
  Object.assign(P, a146Step(A146_S1X, t), { dir: tf.dir, drop: 10 * tf.tuck });
  const [hx, hy] = hop(t, 4.3, 0.32, 0, 0, 14); P.y -= hy;
  P.sq = (t < 1.38 ? 0.96 * anticipate(t, 1.18, 0.2, 0.06) : 1) * landSquash(t, 4.62, 0.08) * (t > 7.48 && t < 8.3 ? 1.03 : 1);
  P.tip = 0.12 * pulse(t, 8.6, 0.6) + 0.04 * pulse(t, 1.38, 0.4);
  P.brow = a146In(t, 2.5, 3.0) ? -0.4 : 0; P.mouth = t >= 3.3 ? 'smile' : t >= 1.98 ? 'smile' : 'closed';
  const mk = a146MaskPos(t);
  P.gaze = t < 1.38 ? a146Gaze(t, P, [[0, [250, 640]], [0.35, [760, 640]], [0.7, [250, 660]], [1.05, [760, 640]]], 0.07)
    : t < 2.0 ? a146LookAt(P, mk ? [mk[0], mk[1]] : [336, 790]) : t < 3.0 ? [0, -1] : t < 4.86 ? [0, 0.1] : t < 7.48 ? a146LookAt(P, [662, 790]) : t < 8.45 ? a146LookAt(P, [780, 700]) : a146LookAt(P, [300, 650]);
  P.lid = a146In(t, 1.98, 2.3) ? 0.8 : a146In(t, 2.7, 2.95) ? Math.sin(Math.PI * (t - 2.7) / 0.25) : a146In(t, 7.8, 8.15) ? 1 : undefined;
  P.hL = a146HT(t, P, [[0, [-40, -66]], [1.4, A146H.restL, 0.3], [2.5, A146H.restL], [4.3, [-40, -100], 0.15], [4.45, [-42, -66], 0.2], [7.48, PERSON_HANDS.armsOut.L, 0.25], [8.3, A146H.restL, 0.3]]);
  P.hR = a146HT(t, P, [[0, A146H.rest], [1.18, [24, -205], 0.2], [1.38, { a: [2.9, 2.5] }, 0.12], [1.55, { a: [1.2, 0.6] }, 0.3], [1.9, A146H.rest, 0.3], [2.5, A146H.chest, 0.3], [2.9, A146H.rest, 0.3],
    [4.3, [40, -100], 0.15], [4.45, [42, -66], 0.2], [4.86, [60, -110], 0.3], [5.05, { w: [650, 792] }, 0.2], [5.45, A146H.rest, 0.3], [7.48, PERSON_HANDS.armsOut.R, 0.25], [8.3, A146H.rest, 0.3], [8.6, [40, -96], 0.3], [9.0, A146H.rest, 0.3]]);
  if (t < 3.3 || t >= 3.4) a146Person(ctx, P); else a146Person(ctx, P);
  // falling turban (3.15..3.4) then a tiny dust star when it lands
  if (a146In(t, 3.15, 3.4)) { const hd = a146Head(P), u = (t - 3.15) / 0.25; ctx.save(); ctx.translate(hd[0], hd[1] - 40 * 1.25 - (1 - u * u) * 260); shape(ctx, ell(0, 0, 50, 26, 20), C.white, { lw: 5, seed: 16, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 }); ctx.restore(); }
  if (a146In(t, 3.4, 3.7)) star(ctx, a146Head(P)[0] + 50, a146Head(P)[1] - 80, 20 * pulse(t, 3.4, 0.3), C.white);
  // the swag sack: in his left hand, then flopped on the ground
  const sk = t < 1.5 ? P.HL : [440, 900 - Math.max(0, 1 - (t - 1.5) / 0.25) * 60]; if (t < 4.86 || true) { ctx.save(); ctx.translate(sk[0], sk[1]); shape(ctx, t < 1.75 ? [[-18, 0], [18, 0], [24, 50], [-24, 50], [-18, 0]] : [[-34, 0], [-20, -16], [20, -18], [36, 0], [-34, 0]], '#e6c27a', { lw: 4, seed: 610, dot: '#a8741a', pitch: 7, rad: 0.2, da: 0.4 }); ctx.restore(); }
  // mask and cap fly into the barrel
  if (mk && mk[2] < 1) { ctx.save(); ctx.translate(mk[0], mk[1]); ctx.rotate(mk[2] * 9); shape(ctx, ell(0, 0, 30, 12, 16), C.black, { lw: 3, seed: 611 }); shape(ctx, ell(-8, -2, 5, 4, 8), C.white, { lw: 0 }); shape(ctx, ell(8, -2, 5, 4, 8), C.white, { lw: 0 }); ctx.restore(); }
  if (a146In(t, 1.98, 2.5)) a146Dust(ctx, 336, 790, t, 1.98, 5, 4);
  if (t >= 4.86 && t < 5.6) a146Keys(ctx, P.HR[0], P.HR[1], { s: 1.1, sw: 0.3 * Math.sin(t * 9) * K.clamp(5.6 - t), glint: pulse(t, 5.25, 0.3) });
  if (t >= 4.62 && t < 5.2) a146Dust(ctx, x, 902, t, 4.62, 4, 5);
  // the customer
  const CX = a146X([[7.9, -80], [9.1, 300]]), Q = a146Cus(CX(t), a146Walk(CX, t, 1.15)); if (t > 7.9) { Q.gaze = t < 8.8 ? a146LookAt(Q, [780, 700]) : a146LookAt(Q, a146Head(P)); Q.tilt = 0.08 * K.clamp((t - 8.8) / 0.3); a146Person(ctx, Q); }
  return { P, mk };
}

// ---------- S2 9.2..15.5: a day of trade, the four bales counted and tied with his own knot ----------
const A146_S2CUS = a146X([[9.2, 340], [11.7, 340], [12.6, 120]]), A146_S2MER = a146X([[9.2, 600], [12.45, 600], [12.95, 640], [13.6, 640], [13.85, 745]]);
const A146_PATS = [13.04, 13.45, 13.9, 14.3];
function a146S2(ctx, t) {
  const u = kfn(t, [[10.06, 0.12], [12.0, 0.33], [15.2, 0.36], [15.5, 0.45]]), door = kfn(t, [[9.2, 0.9], [12.6, 0.9], [13.1, 0]]);
  const H = a146Hall(ctx, t, { u, door }), D = H.desk;
  // cloth unrolled across the desk, coin stacks growing
  const cl = K.clamp((t - 9.4) / 0.6) * (t < 11.4 ? 1 : 0); if (cl > 0) shape(ctx, K.rectPts(600 - 190 * cl, D.top - 18, 190 * cl, 16), C.blue, { lw: 3.5, seed: 620, dot: NAVY, pitch: 6, rad: 0.25, da: 0.5 });
  const n = t < 10.06 ? 1 : Math.min(4, 1 + Math.floor((t - 10.06) / 0.35)); for (let i = 0; i < n; i++) { const k = i === n - 1 ? landSquash(t, 10.06 + (i) * 0.35, 0.3) : 1; for (let j = 0; j < 3 + i; j++) shape(ctx, ell(470 + i * 26, D.top - 6 - j * 7 * k, 11, 4, 12), C.yellow, { lw: 2.5, seed: 621 }); }
  // the four bales (squash under the pats), the knot tied at 14.6
  const tied = t >= 14.75, stSq = [0, 1, 2, 3].map((i) => 1 - 0.06 * pulse(t, A146_PATS[[0, 3, 1, 2].indexOf(i)], 0.25));
  a146Stack(ctx, A146_STK, 900, { sq: stSq, tassel: swing(t, 14.9, 0.5) + 0.25 * pulse(t, 14.3, 0.4), noTassel: !tied });
  // the customer
  const ctf = turnFlip(t, [[0, 1], [11.5, -1]], 0.4), Q = a146Cus(A146_S2CUS(t), { ...a146Walk(A146_S2CUS, t, 1.15), dir: ctf.dir, mouth: t > 11.0 ? 'smile' : 'closed' });
  Q.alpha = 1 - K.clamp((t - 12.3) / 0.3); Q.drop = 6 * pulse(t, 11.1, 0.35);
  Q.hR = a146HT(t, Q, [[9.2, A146H.rest], [9.9, { w: [430, D.top - 14] }, 0.4], [10.6, A146H.rest, 0.3], [10.85, { w: [420, 760] }, 0.2], [11.4, [30, -96], 0.3]]);
  Q.hL = a146HT(t, Q, [[9.2, A146H.restL], [11.4, [-30, -110], 0.3]]);
  // the merchant
  const mtf = turnFlip(t, [[0, -1], [12.34, 1]], 0.45), P = a146Mer(A146_S2MER(t), { ...a146Step(A146_S2MER, t), dir: mtf.dir, drop: 8 * mtf.tuck, mouth: 'smile' });
  const cb = countedBeats(t, A146_PATS); P.drop += 5 * cb.accent * (t < 14.6 ? 1 : 0) + 6 * pulse(t, 15.0, 0.45);
  P.tip = 0.15 * pulse(t, 11.5, 0.6) + (t > 13.9 && t < 15.2 ? 0.08 : 0); P.talk = talk(t, [[9.5, 10.6]]);
  P.lid = t > 12.34 && t < 13.0 ? 0.3 : a146In(t, 15.0, 15.3) ? 1 : undefined; P.sq = anticipate(t, 14.6, 0.25, 0.04);
  const B = a146StackPts(A146_STK, 900), top = (i) => [B[i][0], B[i][1] - 100], knot = [B[2][0] + 40, B[2][1] - 55];
  P.gaze = t < 11.4 ? a146LookAt(P, a146Head(Q)) : t < 12.34 ? a146LookAt(P, [200, 700]) : t < 14.5 ? a146LookAt(P, top(cb.n ? [0, 3, 1, 2][Math.min(3, cb.n - 1)] : 0)) : a146LookAt(P, knot);
  P.hR = a146HT(t, P, [[9.2, A146H.rest], [9.4, { w: [560, D.top - 20] }, 0.3], [10.6, A146H.rest, 0.3], [10.9, { w: [570, 765] }, 0.2], [11.5, [64, -196], 0.3], [11.9, A146H.rest, 0.3],
    [12.9, { w: top(0) }, 0.14], [13.3, { w: top(3) }, 0.14], [13.75, { w: top(1) }, 0.14], [14.15, { w: top(2) }, 0.14], [14.45, { w: [knot[0] - 4, knot[1] - 10] }, 0.15], [14.9, { w: [knot[0] - 8, knot[1] - 30] }, 0.12], [15.15, A146H.rest, 0.3]]);
  P.hL = a146HT(t, P, [[9.2, A146H.restL], [9.4, { w: [540, D.top - 20] }, 0.3], [10.6, A146H.restL, 0.3], [14.45, { w: [knot[0] - 20, knot[1]] }, 0.15], [14.9, { w: [knot[0] - 30, knot[1] + 12] }, 0.12], [15.15, A146H.restL, 0.3]]);
  a146Person(ctx, P); a146Person(ctx, Q);
  if (t > 11.4 && t < 12.6) packLoad(ctx, [{ kind: 'bolt', col: C.blue }], Q.HR[0], Q.HR[1] + 10, 0.7);
  const cn = a146CoinFly(ctx, t, 11.0, 0.45, [Q.HR[0], Q.HR[1]], [P.HR[0], P.HR[1]], 60, 10); if (a146In(t, 11.45, 11.9)) star(ctx, P.HR[0], P.HR[1] - 20, 18 * pulse(t, 11.45, 0.45), C.white);
  return { P, knot };
}
// the stack positions without drawing (bottom centres: red, blue, yellow, green)
const a146StackPts = (x, y, s = 1) => [[x - 78 * s, y], [x + 78 * s, y], [x + 76 * s, y - 103 * s], [x - 70 * s, y - 103 * s]];

// ---------- S3 15.5..21.9: he locks up at dusk and walks home humming ----------
const A146_S3X = a146X([[15.5, 630], [16.0, 690], [18.45, 690], [20.4, 1060]]);
function a146S3(ctx, t) {
  const u = kfn(t, [[15.5, 0.42], [21.4, 0.55]]), door = t < 16.28 ? 0.9 : K.ease.in(K.clamp(1 - (t - 16.28) / 0.32)) * 0.9;
  const lit = A146_WINS.map((_, i) => K.clamp((t - 17.8 - i * 0.15) / 0.12));
  a146Street(ctx, t, { u, pal: 'dusk', door, shut: 1 - K.clamp((t - 16.0) / 0.4), stall: t < 16.0 ? 'open' : 'closed', sign: 1, signSw: 0.03 * Math.sin(t * 1.3), lit, lamp: K.clamp((t - 17.95) / 0.15),
    lock: t >= 16.86 ? 1 : 0, lockShake: a146Shake(t, 17.1, 0.3, 3, 2), glint: pulse(t, 20.9, 0.4), doorShake: 2 * Math.exp(-(t - 16.6) * 12) * (t > 16.6 ? Math.sin((t - 16.6) * 60) : 0) });
  a146Night(ctx, kfn(t, [[17.0, 0], [21.4, 0.28]]), [[940, 610, 150 * K.clamp((t - 17.95) / 0.2)]]);
  const tf = turnFlip(t, [[0, 1], [16.05, -1], [18.2, 1]], 0.4), x = A146_S3X(t), P = a146Mer(x, { ...a146Step(A146_S3X, t), dir: tf.dir, drop: 8 * tf.tuck, mouth: 'smile' });
  P.alpha = K.clamp((t - 15.5) / 0.2); P.sq = 1 + 0.04 * pulse(t, 15.8, 0.5); P.tip = -0.06 * pulse(t, 16.15, 0.45);
  const hm = t > 18.48; if (hm) { P.lid = 0.5; P.drop += 3 * Math.abs(Math.sin(t * 4)); }
  P.gaze = t < 16.0 ? [0.3, 0.1] : t < 17.6 ? a146LookAt(P, [662, 790]) : t < 19.76 ? a146LookAt(P, [x + 300, 650]) : t < 20.25 ? a146LookAt(P, [630, 650]) : a146LookAt(P, [x + 300, 650]);
  if (a146In(t, 19.76, 20.25)) { P.lid = 0.2; P.look = -1; }
  const sw = Math.sin(P.ph || 0) * P.amp;
  P.hR = a146HT(t, P, [[15.5, A146H.rest], [16.1, { w: [640, 780] }, 0.2], [16.6, A146H.rest, 0.2], [16.75, { w: [660, 792] }, 0.12], [17.1, { w: [646, 782] }, 0.1], [17.4, [36, -82], 0.25], [17.75, A146H.rest, 0.3], [18.48, (tt) => [37 + 14 * Math.sin(P.ph || 0) * P.amp, -58], 0.3]]);
  P.hL = a146HT(t, P, [[15.5, A146H.restL], [15.7, [-40, -200], 0.3], [16.1, A146H.restL, 0.3], [18.48, (tt) => [-37 - 14 * Math.sin(P.ph || 0) * P.amp, -58], 0.3]]);
  if (t < 20.6) a146Person(ctx, P);
  if (a146In(t, 16.75, 17.45)) a146Keys(ctx, P.HR[0], P.HR[1], { s: 1.1, sw: 0.35 * Math.sin(t * 10) });
  if (hm && t < 20.6) { const hd = a146Head(P); for (let i = 0; i < 2; i++) { const q = ((t - 18.48) * 0.8 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha = 1 - q; note(ctx, hd[0] + 40 + q * 40, hd[1] - 70 - q * 80, 0.8, C.black); ctx.restore(); } }
  return { P };
}
