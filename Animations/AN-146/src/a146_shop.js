// ===== AN-146 inside the shop: S7 the candle and the scholar act (dark), S8 the time lapse to dawn, S11 the morning mess and the empty corner =====
const A146_CAND1 = [505, 800], A146_CAND2 = [445, 800];
const A146_BOOKS = [[[300, 552], [372, 886], 56.1], [[350, 552], [575, 892], 56.18], [[400, 552], [648, 884], 56.26]];
const A146_ROW = 330;   // the bales' row beside the door before dawn

// ---------- S7 51.6..66.08 ----------
const A146_S7I = a146X([[51.6, 400], [56.06, 400], [56.3, 480]]);
const A146_S7W = a146X([[56.42, 150], [62.66, 150], [63.4, 300], [64.56, 300], [65.3, 130]]);
function a146S7(ctx, t) {
  const door = t < 56.42 ? 0 : t < 65.3 ? settleTo(t, 56.42, 0, 0.7, 0.4, 0.08) : 0.7 * (1 - K.clamp((t - 65.3) / 0.5));
  const H = a146Hall(ctx, t, { u: 0.75, door, light: 0 });
  // open ledgers on the floor (the books he swept down), one page flips by itself
  for (const [a, b, t0] of A146_BOOKS) if (t >= t0 + 0.3) a146Ledger(ctx, b[0], b[1], { open: t >= 56.6 ? 1 : 0, s: 0.9, flip: b[0] === 575 ? K.clamp((t - 59.6) / 0.4) : 0 });
  // candles
  const lit1 = K.clamp((t - 53.38) / 0.2), f1 = a146Candle(ctx, A146_CAND1[0], A146_CAND1[1], { lit: lit1, melt: 0.1, t, seed: 1 });
  if (t >= 63.25) a146Candle(ctx, A146_CAND2[0], A146_CAND2[1], { lit: 1, melt: 0.05, t, seed: 4 });
  // the bales in the alcove
  a146Stack(ctx, A146_STK, 900, {});
  // impostor
  const itf = turnFlip(t, [[0, 1], [56.1, -1]], 0.25), x = A146_S7I(t), P = a146Imp(x, { ...a146Step(A146_S7I, t), dir: itf.dir });
  const sit = K.clamp((t - 56.1) / 0.3); if (sit > 0) { P.sit = sit; P.seat = 'floor'; P.amp = 0; }
  P.sq = landSquash(t, 56.4, 0.12) * (a146In(t, 55.34, 56.06) ? 0.92 : 1);
  if (t < 53.38) P.gaze = a146Gaze(t, P, [[51.6, [600, 760]], [51.95, [250, 760]], [52.3, [520, 800]]], 0.07);
  else if (t < 55.34) { P.gaze = t < 54.02 ? a146LookAt(P, f1) : a146LookAt(P, [780, 760]); P.mouth = 'smile'; P.brow = -0.4; }
  else if (t < 56.06) { P.eyes = 'wide'; P.gaze = a146LookAt(P, [130, 880]); P.look = -1; P.mouth = 'o'; }
  else if (t < 58.14) { P.gaze = t < 56.6 ? a146LookAt(P, [130, 700]) : a146LookAt(P, [x - 30, 880]); P.lid = t > 56.6 ? 0.45 : 0; }
  else if (t < 65.3) { P.gaze = a146In(t, 60.8, 62.6) ? a146LookAt(P, [300, 520]) : a146LookAt(P, [x - 40, 880]); P.lid = a146In(t, 60.8, 62.6) ? 0.1 : 0.5; P.brow = 0.3; P.talk = talk(t, [[60.7, 62.4]]) * 0.4; P.drop = a146Nods(t, [60.8, 61.3, 61.92], 0.25, 5); }
  else { const grin = t > 65.5; P.gaze = a146LookAt(P, [150, 700]); P.wink = 'R'; P.brow = -0.4; P.mouth = grin ? 'smile' : 'closed'; P.lid = 0; }   // v2: left eye opens on 65.30, grin 0.2 s later, held
  if (a146In(t, 63.84, 65.3)) P.lid = 0.9;   // v2: eyes down, absorbed, while the watchman hushes
  P.hR = a146HT(t, P, [[51.6, A146H.rest], [52.3, { w: [500, 780] }, 0.2], [53.6, A146H.rest, 0.3], [54.1, (tt) => [30 + 5 * Math.sin(tt * 16), -134], 0.2], [55.2, PERSON_HANDS.cupEar.R, 0.12], [56.06, { w: [330, 560] }, 0.1], [56.25, A146H.rest, 0.1], [58.14, PERSON_HANDS.chin.R, 0.25]]);
  P.hL = a146HT(t, P, [[51.6, A146H.restL], [52.3, { w: [490, 784] }, 0.2], [53.6, A146H.restL, 0.3], [54.1, (tt) => [24 - 5 * Math.sin(tt * 16), -140], 0.2], [55.3, A146H.restL, 0.2], [58.14, [10, -100], 0.25],
    [60.7, [-62, -206], 0.15], [62.6, [10, -100], 0.25]]);
  a146Person(ctx, P);
  if (t >= 56.6) a146Ledger(ctx, a146W(P, [0, -60])[0], a146W(P, [0, -60])[1], { open: 1, s: 0.95, rot: 0.08 * itf.dir });
  // the three account books swept off the shelf
  for (const [a, b, t0] of A146_BOOKS) if (a146In(t, t0, t0 + 0.3)) { const u = (t - t0) / 0.3; ctx.save(); ctx.translate(K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - 80 * Math.sin(Math.PI * u)); ctx.rotate(u * 6); a146Ledger(ctx, 0, 0, { s: 0.8 }); ctx.restore(); }
  if (a146In(t, 56.4, 57.0)) a146Dust(ctx, x, 902, t, 56.4, 6, 8);
  // the watchman leans in, tiptoes in with his candle, hushes and backs out
  const W = a146Wat(A146_S7W(t), { ...a146Walk(A146_S7W, t, 0.7), dir: 1 }); W.hidden = t < 56.42 || t > 65.45;
  W.tip = (t < 57.3 ? 0.18 * K.clamp((t - 56.42) / 0.3) : 0) + 0.1 * pulse(t, 63.84, 0.7); W.alpha = t > 65.0 ? 1 - K.clamp((t - 65.0) / 0.4) : 1;
  W.gaze = t < 57.22 ? a146Gaze(t, W, [[56.42, [300, 650]], [56.8, [600, 650]], [57.0, [420, 820]]], 0.1) : a146LookAt(W, a146Head(P)); W.brow = t > 57.22 && t < 58.4 ? -0.5 : -0.2;
  W.mouth = a146In(t, 62.66, 63.5) ? 'o' : 'smile';
  W.hR = a146HT(t, W, [[56.42, [44, -150]], [63.0, { w: [A146_CAND2[0], A146_CAND2[1] - 14] }, 0.3], [63.5, A146H.rest, 0.25], [63.84, PERSON_HANDS.hush.R, 0.2], [64.5, A146H.rest, 0.25]]);
  if (!W.hidden) { a146DrawWat(ctx, W, { t }); if (t < 63.25) a146Candle(ctx, W.HR[0], W.HR[1] + 6, { lit: 1, s: 0.8, t, seed: 3 }); }
  // dark room: candle light discs, a moonlit pane, the lantern line under the door, eyes in the dark
  const holes = [[MERCHANT.window.x0 + 50, MERCHANT.window.top + 70, 70]];
  if (lit1 > 0) holes.push([f1[0], f1[1], 260 * K.ease.out(K.clamp((t - 53.38) / 0.5))]);
  if (!W.hidden) { holes.push([W.HR[0], W.HR[1] - 20, 170]); const wh = a146Head(W); if (t > 57.3) holes.push([wh[0], wh[1] + 10, 125 * (W.alpha ?? 1)]); }   // v2: his own face lit by his candle if (t >= 63.25) holes.push([A146_CAND2[0], A146_CAND2[1] - 60, 200]);
  if (door > 0.05) holes.push({ pts: [[60, 600], [200, 600], [420, 905], [420, 1230], [60, 1230]], c: [130, 800] });
  a146Dark(ctx, 0.85, [-60, -60, 1120, 1360], holes);
  if (lit1 > 0) a146Glow(ctx, f1[0], f1[1], 80, 0.25); if (t >= 63.25) a146Glow(ctx, A146_CAND2[0], A146_CAND2[1] - 50, 70, 0.22);
  if (a146In(t, 55.34, 56.42)) { ctx.save(); ctx.globalAlpha = 0.9; seg(ctx, 66, 896, 194, 896, 6, C.yellow, 0); ctx.restore(); a146Glow(ctx, 130, 900, 60, 0.3); }
  if (t < 53.4) { const hd = a146Head(P), g = P.gaze || [0, 0]; for (const sd of [-1, 1]) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(hd[0] + sd * 16, hd[1] - 5, 10, 13, 0, 0, 7); ctx.fill(); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(hd[0] + sd * 16 + g[0] * 5, hd[1] - 4 + g[1] * 5, 5, 0, 7); ctx.fill(); } }
  if (a146In(t, 52.54, 52.7)) { star(ctx, 500, 770, 40, C.yellow); star(ctx, 500, 770, 20, C.white); }
  return { P, W };
}

// ---------- S8 66.08..70.7: time lapse, the bales hauled to the door, the candles melt, dawn ----------
// held poses cut every ~0.5 s: [t0, impostor {x, dir, pose}, bale positions [red, blue, yellow, green] as [x, y] or 'stack'/'row' index]
const A146_ROWP = a146StackPts(A146_ROW, 900), A146_STKP = a146StackPts(A146_STK, 900);
const A146_S8 = [
  [66.08, { x: 480, dir: -1, pose: 'sit' }, ['s', 's', 's', 's']],
  [66.6, { x: 640, dir: 1, pose: 'grab' }, ['s', 's', 's', 's']],
  [67.62, { x: 420, dir: 1, pose: 'drag' }, [[540, 900], 's', 's', 's']],
  [68.22, { x: 540, dir: 1, pose: 'drag' }, ['r', [660, 900], 's', 's']],
  [68.66, { x: 470, dir: -1, pose: 'carry' }, ['r', 'r', 'carry', [620, 900]]],
  [69.06, { x: 520, dir: -1, pose: 'wipe' }, ['r', 'r', 'r', 'r']],
  [69.4, { x: 560, dir: -1, pose: 'yawn' }, ['r', 'r', 'r', 'r']],
  [69.98, { x: 560, dir: -1, pose: 'up' }, ['r', 'r', 'r', 'r']]];
function a146S8(ctx, t) {
  const u = kfn(t, [[66.1, 0.75], [70.0, 0.98]], 'lin'), light = K.clamp((t - 69.98) / 0.4);
  a146Hall(ctx, t, { u, door: 0, light });
  const melt = kfn(t, [[66.1, 0.2], [70.0, 0.85]], 'lin'), lit = t < 70.3 ? 1 - 0.5 * K.clamp((t - 69.9) / 0.4) : 0;
  const f1 = a146Candle(ctx, A146_CAND1[0], A146_CAND1[1], { lit, melt, t, seed: 1 }), f2 = a146Candle(ctx, A146_CAND2[0], A146_CAND2[1], { lit, melt: melt * 0.95, t, seed: 4 });
  // wax drips off the desk edge on a fixed rhythm, a puddle grows
  shape(ctx, ell(560, 899, 20 + melt * 40, 5, 14), A146_WAX, { lw: 3, seed: 640 }); const dp = ((t - 66.1) * 2) % 1; shape(ctx, ell(600, MERCHANT.desk.top + dp * 95, 4, 6, 8), A146_WAX, { lw: 2, seed: 641 });
  for (const [a, b] of A146_BOOKS) a146Ledger(ctx, b[0], b[1], { open: 1, s: 0.9 });
  const i = Math.max(0, A146_S8.findIndex((k, j) => t >= k[0] && (j === A146_S8.length - 1 || t < A146_S8[j + 1][0]))), [t0, I, BP] = A146_S8[i];
  const cols = ['red', 'blue', 'yellow', 'green'];
  BP.forEach((b, k) => { if (b === 'carry') return; const p = b === 's' ? A146_STKP[k] : b === 'r' ? A146_ROWP[k] : b; a146Bale(ctx, p[0], p[1], { col: cols[k], knot: k === 2, noTassel: b !== 's', rot: k === 3 && b === 's' ? 0.03 : 0 });
    if (Array.isArray(b)) { ctx.save(); ctx.globalAlpha = 0.5; seg(ctx, p[0] + 70, 905, p[0] + 200, 905, 8, '#d9c9a0', 0); ctx.restore(); } });
  const P = a146Imp(I.x, { dir: I.dir });
  if (I.pose === 'sit') { P.sit = 1; P.seat = 'floor'; P.gaze = [0, 0.05]; P.mouth = 'smile'; P.brow = -0.4; P.lid = 0.3; P.hR = PERSON_HANDS.chin.R; P.hL = [10, -100]; }
  if (I.pose === 'grab') { P.gaze = a146LookAt(P, [700, 820]); P.lid = 0.3; P.hR = { w: [700, 840] }; P.hL = { w: [690, 870] }; P.tip = 0.06; }
  if (I.pose === 'drag') { P.tip = -0.2; P.sq = 0.95; P.mouth = 'frown'; P.ph = 1.0; P.amp = 0.7; const b = BP.find((v) => Array.isArray(v)); P.hR = { w: [b[0] - 60, 850] }; P.hL = { w: [b[0] - 70, 870] }; P.gaze = a146LookAt(P, [b[0], 850]); }
  if (I.pose === 'carry') { P.tip = -0.08; P.sq = 0.95; P.ph = 2; P.amp = 0.6; P.hR = [20, -205]; P.hL = [-24, -200]; P.gaze = a146LookAt(P, [300, 860]); }
  if (I.pose === 'wipe') { P.hR = [30, -214]; P.lid = 0.4; P.mouth = 'o'; P.gaze = [0, 0.1]; }
  if (I.pose === 'yawn') { P.sit = 1; P.seat = 'floor'; P.lid = 0.7; P.mouth = 'o'; P.tilt = -0.1; P.hR = [40, -206]; P.hL = [-40, -200]; }
  if (I.pose === 'up') { const sq = landSquash(t, 70.2, 0.1); P.y -= hop(t, 69.98, 0.22, 0, 0, 22)[1]; P.sq = sq; P.eyes = t < 70.3 ? 'wide' : 'open'; P.gaze = a146LookAt(P, [560, 400]); P.hR = A146H.rest; if (t > 70.3) { P.brow = 0.2; P.mouth = 'closed'; P.gaze = a146LookAt(P, [130, 760]); } }
  a146Person(ctx, P);
  if (I.pose === 'carry') { const h = a146Head(P); a146Bale(ctx, h[0] + 6, h[1] - 40, { col: 'yellow', s: 0.9, rot: 0.1 }); }
  if (t - t0 < 0.25 && i > 0) a146Dust(ctx, I.x, 902, t, t0, 4, i);
  // light: dark overlay fades toward dawn, then the gold shaft
  const dark = kfn(t, [[66.1, 0.82], [69.9, 0.5], [70.3, 0.0]], 'lin');
  a146Dark(ctx, dark, [-60, -60, 1120, 1360], [[f1[0], f1[1], 240 * lit], [f2[0], f2[1], 200 * lit], [MERCHANT.window.x0 + 50, MERCHANT.window.top + 70, 80 + 60 * K.clamp((t - 69) / 1)]]);
  if (lit > 0) { a146Glow(ctx, f1[0], f1[1], 70 * lit, 0.22); a146Glow(ctx, f2[0], f2[1], 60 * lit, 0.2); }
  if (light > 0) { ctx.save(); ctx.globalAlpha = 0.25 * light; ctx.fillStyle = '#ffb02a'; ctx.fillRect(-60, -60, 1120, 1360); ctx.restore(); }
  return { P };
}

// ---------- S11 101.2..111.0: the morning mess, the empty corner ----------
const A146_S11X = a146X([[101.2, 30], [102.42, 130], [102.9, 230], [103.9, 230], [104.4, 290], [106.0, 290], [107.4, 560]]);
const A146_TASSEL = [680, 892], A146_S11STUB = [[436, 800], [398, 899]];
function a146S11(ctx, t) {
  const door = settleTo(t, 101.2, 0.45, 0.9, 0.5, 0.08);   // v2: the cut lands with the door already swinging
  a146Hall(ctx, t, { u: 0.22, door });
  // the light shaft through the open door sweeps the floor
  if (door > 0.05) { ctx.save(); ctx.globalAlpha = 0.28 * door; ctx.fillStyle = dotPat(ctx, C.yellow, 12, 0.36); K.poly(ctx, [[60, 600], [200, 600], [200 + 300 * door, 905], [200 + 520 * door, 1230], [60, 1230]], true); ctx.fill(); ctx.restore(); }
  // wax stubs, puddles and the drip trail down the desk leg; open ledgers; the empty corner and the fallen tassel
  shape(ctx, ell(560, 899, 56, 6, 14), A146_WAX, { lw: 3, seed: 640 }); seg(ctx, 600, 806, 604, 896, 5, A146_WAX, 2);
  // v2: two big burnt-down stubs clear of the coins: one at the desk's left end (wax puddle, drips over the edge), one on the floor below
  shape(ctx, ell(436, 801, 46, 7, 16), A146_WAX, { lw: 3.5, seed: 642 }); for (const [dx, dl] of [[-30, 26], [-14, 40]]) shape(ctx, [[412 + dx + 30, 800], [418 + dx + 30, 800], [418 + dx + 30, 800 + dl], [415 + dx + 30, 806 + dl], [412 + dx + 30, 800 + dl]], A146_WAX, { lw: 2.5, seed: 643 });
  a146Candle(ctx, A146_S11STUB[0][0], A146_S11STUB[0][1], { lit: 0, melt: 0.92, s: 2.0, seed: 5 });
  A146_BOOKS.forEach(([a, b], k) => { if (k === 0 && t >= 105.24) return; a146Ledger(ctx, b[0], b[1], { open: 1, s: 0.9 }); }); a146Ledger(ctx, 470, 893, { open: 1, s: 0.9, col: C.blue });
  shape(ctx, ell(A146_S11STUB[1][0], 904, 44, 7, 14), A146_WAX, { lw: 3, seed: 644 }); a146Candle(ctx, A146_S11STUB[1][0], 906, { lit: 0, melt: 0.9, s: 1.5, seed: 6 });   // v2: the second stub on the floor, in front of the books
  if (t >= 107.62) { const bl = t < 108.2 ? (Math.sin((t - 107.62) * 22) > 0 ? 1 : 0.15) : 1, gp = a146StackPts(A146_STK, 900);   // v2: black dashes, each with a faint tint of its colour pulsing in turn
    ctx.save(); ctx.globalAlpha = bl; ['red', 'blue', 'yellow', 'green'].forEach((c, i) => a146Bale(ctx, gp[i][0], gp[i][1], { col: c, ghost: true, tint: 0.22 + 0.4 * pulse(t, 108.34 + [0, 1, 3, 2][i] * 0.22, 0.45), rot: i === 3 ? 0.03 : i === 2 ? -0.02 : 0 })); ctx.restore(); }
  const got = t >= 110.45;
  if (!got) { ctx.save(); ctx.translate(A146_TASSEL[0], A146_TASSEL[1]); ctx.rotate(1.4); ctx.scale(1.7, 1.7); shape(ctx, [[-7, -12], [7, -12], [11, 16], [-11, 16], [-7, -12]], C.yellow, { lw: 3, seed: 303, dot: C.red, pitch: 5, rad: 0.2, da: 0.4 }); ctx.restore(); }
  // the merchant
  const x = A146_S11X(t), P = a146Mer(x, a146Step(A146_S11X, t));
  if (a146In(t, 102.9, 103.3)) { P.ph = 1.2; P.amp = 0.7; }
  P.drop = a146In(t, 102.9, 103.4) ? -4 : 0; P.tip = -0.04 * pulse(t, 102.9, 0.6) + 0.15 * pulse(t, 105.24, 0.6) + 0.12 * pulse(t, 110.2, 0.6);
  if (t < 103.36) P.gaze = [0.4, -0.3];
  else if (t < 106.52) P.gaze = a146Gaze(t, P, [[103.36, [250, 780]], [103.7, [450, 800]], [104.06, [500, 790]], [105.24, [380, 880]], [105.6, [360, 760]]], 0.25);
  else if (t < 108.34) P.gaze = a146Gaze(t, P, [[106.52, [x, 900]], [106.7, [780, 760]]], 0.3);
  else P.gaze = t < 109.58 ? [0, 0.05] : t < 110.2 ? a146LookAt(P, [780, 800]) : a146LookAt(P, A146_TASSEL);
  if (a146In(t, 104.56, 105.24)) P.brow = 0.4;
  if (a146In(t, 106.6, 107.6)) P.tilt = 0.06 * K.clamp((t - 106.8) / 0.4);
  if (t >= 108.34) { const up = t < 109.58; P.sq = up ? settleTo(t, 108.34, 1, 1.12, 0.25, 0.1) : K.lerp(1.12, 0.92, K.clamp((t - 109.58) / 0.25)) + 0.08 * K.clamp((t - 110.1) / 0.4);
    P.drop = up ? -14 * pulse(t, 108.34, 0.25) : 0; if (up) { P.eyes = 'wide'; P.mouth = 'open'; } else { P.lid = t > 109.95 ? 0.45 : 0.2; P.brow = t > 109.95 ? -0.4 : 0; P.mouth = t > 109.95 ? 'closed' : 'frown'; P.drop = a146Nods(t, [110.0, 110.7], 0.45, 6); } }
  const lg = [380, 885];
  P.hR = a146HT(t, P, [[101.9, [30, -100]], [102.9, A146H.rest, 0.3], [104.3, { w: [A146_S11STUB[0][0] + 22, 794] }, 0.2], [104.85, (tt) => [22 + 4 * Math.sin(tt * 30), -156], 0.25], [105.2, { w: lg }, 0.2], [105.5, [60, -160], 0.3], [106.4, A146H.rest, 0.3],
    [108.34, PERSON_HANDS.headHold.R, 0.12], [109.58, A146H.rest, 0.3], [110.2, { w: A146_TASSEL }, 0.25], [110.5, [44, -140], 0.3]]);
  P.hL = a146HT(t, P, [[101.9, A146H.restL], [104.85, [10, -150], 0.25], [105.2, A146H.restL, 0.3], [108.34, PERSON_HANDS.headHold.L, 0.12], [109.58, A146H.restL, 0.3]]);
  a146Person(ctx, P);
  if (a146In(t, 105.4, 106.5)) { ctx.save(); ctx.translate(P.HR[0], P.HR[1]); ctx.rotate(1.3 + swing(t, 105.5, 0.4)); a146Ledger(ctx, 50, 0, { open: 1, s: 0.9 }); ctx.restore(); }
  if (got) { ctx.save(); ctx.translate(P.HR[0], P.HR[1]); ctx.rotate(swing(t, 110.5, 0.5)); ctx.scale(1.5, 1.5); seg(ctx, 0, 0, 0, 24, 4, A146_ROPED, 1.5); shape(ctx, [[-7, 22], [7, 22], [11, 48], [-11, 48], [-7, 22]], C.yellow, { lw: 3, seed: 303, dot: C.red, pitch: 5, rad: 0.2, da: 0.4 }); ctx.restore(); }
  return { P };
}
