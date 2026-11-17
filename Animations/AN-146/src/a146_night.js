// ===== AN-146 paragraphs 2-3 outside: S4 another thief changes behind the stall, S5 he asks the watchman for a light, S6 he opens the shop =====
// one street timeline 21.9..51.6 (night: palette cold, u 0.75, one lamp, the watchman's lantern)
const A146_IX = a146X([[23.45, -70], [24.56, 360], [26.4, 360], [26.85, 165], [33.6, 165], [34.55, 400], [36.82, 400], [37.5, 480], [47.26, 480], [47.86, 600], [50.92, 600], [51.4, 640]]);
const A146_WX = a146X([[34.5, 1180], [36.7, 700], [44.4, 700], [47.0, 1150]]);
const A146_HIDE = (t) => (t < 26.64 ? 0 : t < 27.0 ? K.ease.in(K.clamp((t - 26.64) / 0.36)) * 190 : t < 28.32 ? 190 : t < 28.8 ? K.lerp(190, 105, K.ease.out(K.clamp((t - 28.32) / 0.25))) : t < 29.1 ? K.lerp(105, 0, K.ease.out(K.clamp((t - 28.8) / 0.25))) : 0);
function a146WatNight(t) {
  const tf = turnFlip(t, [[0, -1], [42.5, 1]], 0.4), W = a146Wat(A146_WX(t), { ...a146Walk(A146_WX, t, 1.2), dir: tf.dir, drop: 8 * tf.tuck, hold: 'stick' });
  W.hidden = t < 34.5 || t > 47.0;
  const yawn = a146In(t, 35.18, 36.1); if (yawn) { W.mouth = 'o'; W.lid = 0.55; W.tilt = -0.06; }
  W.y -= hop(t, 36.95, 0.25, 0, 0, 10)[1]; W.sq = landSquash(t, 37.2, 0.08);
  W.tip = 0.1 * K.clamp((t - 38.94) / 0.3) * (t < 39.6 ? 1 : 0) + 0.04 * pulse(t, 43.0, 0.6);
  W.drop = (W.drop || 0) + a146Nods(t, [41.2, 41.55], 0.3, 7);
  W.mouth = W.mouth || (t > 40.9 && t < 42.6 ? 'smile' : 'closed');
  W.hR = a146HT(t, W, [[34.5, A146H.rest], [36.85, [26, -212], 0.18], [37.7, A146H.rest, 0.25], [39.15, [42, -84], 0.12], [39.3, A146H.rest, 0.1], [39.4, [42, -84], 0.1], [39.5, PERSON_HANDS.palmsUp.R, 0.2], [40.2, A146H.rest, 0.3],
    [41.14, A146H.chest, 0.25], [41.9, PERSON_HANDS.pointUp.R, 0.2], [42.5, A146H.rest, 0.25]]);
  W.hL = a146HT(t, W, [[34.5, [-44, -70]], [39.5, PERSON_HANDS.palmsUp.L, 0.2], [40.2, [-44, -70], 0.3]]);
  if (a146In(t, 36.8, 37.75) || a146In(t, 39.1, 40.2) || a146In(t, 41.1, 42.55)) W.hold = undefined;
  return W;
}
function a146ImpNight(t, W) {
  const x = A146_IX(t), thief = t < 27.7, P = thief ? a146Thf(x) : a146Imp(x);
  const tip = t < 24.56 || a146In(t, 47.26, 47.86); Object.assign(P, a146Walk(A146_IX, t, tip ? 0.6 : 1.25));
  if (a146In(t, 24.56, 26.4)) { P.ph = 1.2; P.amp = 0.8; }   // frozen mid step, one foot up
  if (t < 24.56) P.sq = 0.94;
  P.y += A146_HIDE(t); P.sq = (P.sq ?? 1) * anticipate(t, 26.4, 0.24, 0.08) * (t > 28.8 ? settleTo(t, 28.8, 1, 1, 0.45, 0.06) : 1);
  const head = () => a146Head(P), hw = W && !W.hidden ? a146Head(W) : [1100, 650];
  // gaze and faces
  if (t < 24.56) P.gaze = a146Gaze(t, P, [[23.3, [400, 700]], [23.75, [120, 640]], [24.1, [500, 620]]], 0.07);
  else if (t < 25.7) { P.gaze = [0, 0.05]; P.lid = a146In(t, 25.0, 25.35) ? Math.sin(Math.PI * (t - 25.0) / 0.35) : 0; }
  else if (t < 26.8) { P.gaze = a146LookAt(P, [630, 720]); P.brow = 0.4 * -1; P.mouth = 'smile'; }
  else if (t < 29.16) P.gaze = a146Gaze(t, P, [[28.32, [40, 640]], [28.55, [400, 640]], [28.8, [80, 660]]], 0.07);
  else if (t < 31.88) { P.gaze = a146LookAt(P, [420, 570]); P.mouth = 'smile'; P.lid = 0.25; if (a146In(t, 30.4, 30.95)) { P.mouth = 'open'; P.brow = -0.4; P.lid = 0.35; } }
  else if (t < 33.6) { P.gaze = t < 32.78 ? a146LookAt(P, [200, 760]) : [0, 0.05]; P.brow = -0.4; P.mouth = 'smile'; if (a146In(t, 33.0, 33.45)) P.wink = 'R'; }
  else if (t < 34.6) { P.gaze = a146LookAt(P, [630, 720]); P.brow = -0.3; }
  else if (t < 35.74) { P.gaze = a146LookAt(P, [1000, 700]); P.look = 1; if (t < 35.0) { P.eyes = 'wide'; P.sq = 0.9; } P.drop = 8 * pulse(t, 35.0, 0.3); P.mouth = 'o'; }
  else if (t < 46.5) { P.gaze = a146In(t, 38.04, 39.0) ? a146LookAt(P, [580, 700]) : a146In(t, 39.76, 40.6) ? a146LookAt(P, [470, 760]) : a146LookAt(P, hw); P.lid = 0.25; P.mouth = 'smile'; P.tip = -0.05 + 0.1 * pulse(t, 43.18, 0.9);
    P.drop = 6 * pulse(t, 35.9, 0.35); if (a146In(t, 38.04, 38.9)) P.brow = -0.4; }
  else if (t < 47.26) { P.gaze = a146LookAt(P, hw); P.brow = -0.4; P.lid = 0.4; P.mouth = 'smile'; }
  else if (t < 49.36) { P.gaze = t < 47.6 ? a146LookAt(P, [1000, 650]) : a146LookAt(P, [662, 792]); P.brow = 0.3; P.mouth = t > 47.86 ? 'frown' : 'closed'; }
  else { P.gaze = a146LookAt(P, [662, 760]); P.brow = -0.5; P.mouth = 'smile'; P.y -= hop(t, 49.45, 0.22, 0, 0, 6)[1]; P.tip = -0.08 * pulse(t, 49.95, 0.3); }
  if (a146In(t, 45.1, 46.5)) { P.gaze = a146LookAt(P, hw); P.lid = 0.25; }
  // hands
  const rub = Math.sin(t * 16) * 5;
  P.hR = a146HT(t, P, [[23, [30, -110]], [26.4, A146H.rest, 0.2], [28.8, A146H.rest], [29.3, [30, -214], 0.2], [29.9, A146H.rest, 0.3], [31.88, [20, -86], 0.3], [32.6, { a: [2.45, 2.85] }, 0.18], [33.6, [36, -86], 0.25], [33.9, A146H.rest, 0.25],
    [35.74, PERSON_HANDS.folded.R, 0.25], [36.82, PERSON_HANDS.wave.R, 0.2], [37.4, PERSON_HANDS.folded.R, 0.25], [38.04, { w: [585, 735] }, 0.25], [39.6, A146H.rest, 0.2],
    [39.76, (tt) => [30 + 8 * Math.sin(tt * 18), -116 + 4 * Math.cos(tt * 18)], 0.2], [41.2, PERSON_HANDS.folded.R, 0.25], [46.5, (tt) => [30 + rub, -134], 0.2], [47.26, A146H.rest, 0.2],
    [47.75, (tt) => ({ w: [658 + (tt < 49.36 ? 4 * Math.sin(tt * 40) : 0), 792] }), 0.12], [50.0, A146H.rest, 0.25], [50.15, { w: [650, 780] }, 0.15], [50.6, A146H.rest, 0.2]]);
  P.hL = a146HT(t, P, [[23, [-30, -110]], [26.4, A146H.restL, 0.2], [31.88, [-80, -110], 0.15], [32.3, A146H.restL, 0.3], [35.74, PERSON_HANDS.folded.L, 0.25], [38.04, { w: [560, 650] }, 0.25], [39.6, A146H.restL, 0.2],
    [39.76, [22, -112], 0.2], [41.2, PERSON_HANDS.folded.L, 0.25], [46.5, (tt) => [24 - rub, -140], 0.2], [47.26, A146H.restL, 0.2]]);
  return P;
}
function a146Nite(ctx, t) {
  const door = t < 50.06 ? 0 : t < 50.92 ? settleTo(t, 50.1, 0, 0.8, 0.5, 0.08) : kfn(t, [[51.0, 0.8], [51.5, 0.25]]);
  const dsh = (a146In(t, 47.86, 49.3) ? 2 * Math.sin(t * 40) * (Math.sin(t * 6) > 0 ? 1 : 0.3) : 0);
  a146Street(ctx, t, { u: 0.75, pal: 'cold', door, shut: 0, stall: 'closed', sign: 1, signSw: 0.04 * Math.sin(t * 1.1), lamp: 1, lit: [0, 0, 0, 0, 0.6], lock: t < 49.5 ? 1 : 0, hasp: K.clamp((t - 49.36) / 0.15), doorShake: dsh, lockShake: dsh * 1.5 });
  const W = a146WatNight(t), P = a146ImpNight(t, W);
  // the long shadow first (23.06), then the tiptoeing thief
  if (a146In(t, 23.06, 24.8)) { const fx = Math.max(-200, A146_IX(Math.max(t, 23.3)) - (t < 23.3 ? (23.3 - t) * 200 : 0)), L = 260; ctx.save(); ctx.globalAlpha = 0.35 * Math.min(1, (t - 23.06) / 0.3) * K.clamp((24.8 - t) / 0.3); ctx.fillStyle = NAVY2;
    ctx.beginPath(); ctx.moveTo(fx - 20, 902); ctx.lineTo(fx + 20, 902); ctx.lineTo(fx + L, 918); ctx.lineTo(fx + L + 30, 912); ctx.arc(fx + L + 40, 914, 22, 0, 7); ctx.lineTo(fx - 20, 930); ctx.fill(); ctx.restore(); }
  // impostor (clipped at the ground while he crouches behind the stall), then the stall front as occluder
  ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, 1300, 1002); ctx.clip(); if (t > 50.92) { ctx.beginPath(); ctx.rect(A146_DOOR.x0, 0, 900, 1000); ctx.clip(); P.alpha = 1 - K.clamp((t - 50.92) / 0.5); }
  if (t < 51.45) a146Person(ctx, P); ctx.restore();
  // the cloak tail is the last thing through the door
  if (a146In(t, 50.92, 51.5)) { const u = (t - 50.92) / 0.58; a146Cloak(ctx, 605 + u * 30, 720, { tw: 40, bw: 90 * (1 - u), h: 150, rot: 0.5 * (1 - u), t }); }
  a146StallFront(ctx, 'closed', a146In(t, 27.7, 28.4) ? 3 * Math.sin(t * 50) : 0);
  // clothes thrown up from behind the stall
  for (const [t0, kind] of [[27.7, 'shirt'], [27.9, 'mask']]) if (a146In(t, t0, t0 + 0.5)) { const u = (t - t0) / 0.5, x = 150 + (kind === 'mask' ? 40 : -10), y = 770 - 230 * Math.sin(Math.PI * u); ctx.save(); ctx.translate(x, y); ctx.rotate(u * 5 * (kind === 'mask' ? -1 : 1));
    if (kind === 'shirt') { const sp = [[-34, -30], [34, -30], [30, 34], [-30, 34], [-34, -30]]; ctx.save(); K.poly(ctx, sp, true); ctx.fillStyle = C.white; ctx.fill(); ctx.clip(); ctx.fillStyle = C.black; for (let y2 = -30; y2 < 34; y2 += 16) ctx.fillRect(-40, y2, 80, 7); ctx.restore(); ink(ctx, sp, 4, 612); }
    else { shape(ctx, ell(0, 0, 30, 12, 16), C.black, { lw: 3, seed: 611 }); shape(ctx, ell(-8, -2, 5, 4, 8), C.white, { lw: 0 }); shape(ctx, ell(8, -2, 5, 4, 8), C.white, { lw: 0 }); } ctx.restore(); }
  // the bundle under his arm (thief), the keys (raised, at the lock), the unlit candle
  if (t < 26.8) packLoad(ctx, ['bindle'], P.HR[0] + 6, P.HR[1] + 24, 0.6);
  if (a146In(t, 32.6, 33.75)) a146Keys(ctx, P.HR[0], P.HR[1] - 8, { s: 1.2, sw: swing(t, 32.9, 0.6), glint: pulse(t, 33.0, 0.35) });
  if (a146In(t, 47.75, 50.0)) a146Keys(ctx, P.HR[0], P.HR[1], { s: 1.1, sw: 0.25 * Math.sin(t * 22) * (t < 49.36 ? 1 : 0.3) });
  if (a146In(t, 38.0, 39.65)) a146Candle(ctx, P.HR[0], P.HR[1] + 8, { s: 0.8, lit: 0 });
  // the watchman with staff and lantern
  if (!W.hidden) a146DrawWat(ctx, W, { lantern: 1, t, lag: 4 * pulse(t, 37.15, 0.25) });
  // portrait comparison (29.16..31.5) and the ledger balloon (39.76..41.6)
  if (a146In(t, 29.16, 31.7)) { const p = Math.min(K.clamp((t - 29.16) / 0.35), K.clamp((31.7 - t) / 0.2)); a146Portrait(ctx, 430, 560, 70, { p, gaze: t > 30.32 ? [-1, 0.1] : [0, 0.1], lid: t > 30.32 ? 0.4 : 0 });
    if (p > 0.5) for (const dy of [-12, 12]) seg(ctx, 285, 600 + dy, 330, 600 + dy, 10, C.white, 4); }
  if (a146In(t, 39.76, 41.7)) { const hd = a146Head(P); a146Balloon(ctx, hd[0] - 30, hd[1] - 190, 230, 140, [hd[0] - 10, hd[1] - 70], Math.min(K.clamp((t - 39.76) / 0.3), K.clamp((41.7 - t) / 0.2)),
    [{ draw: (c) => { a146Ledger(c, -10, 0, { open: 1, s: 1.1 }); seg(c, 40, -40, 70, -80, 4, C.black, 0); shape(c, [[66, -86], [86, -112], [74, -80], [66, -86]], C.white, { lw: 3, seed: 613 }); } }]); }
  // night overlay: the lamp and the lantern cut light holes
  const holes = [[940, 610, 150]]; if (!W.hidden) holes.push([W.HL[0], W.HL[1] + 40, 230]);
  a146Night(ctx, 0.45, holes); if (!W.hidden) a146Glow(ctx, W.HL[0], W.HL[1] + 40, 90, 0.22);
  if (a146In(t, 49.36, 49.8)) star(ctx, 662, 780, 24 * pulse(t, 49.36, 0.4), C.white);
  return { P, W };
}
