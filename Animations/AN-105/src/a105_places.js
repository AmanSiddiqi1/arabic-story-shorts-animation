// ===== AN-105 the other places: Alexandria street (S1 day, S4 night), the inn room (S2, S12, S13), Cairo market (S10), the road (S11), the lanes yard (S17, S18, S21) =====
// Each draw function paints the set and the actors in world units and returns { heads } (world points for lettering).

// ---------- Alexandria street (world 1800) ----------
const A105_HOUSES = [
  { x0: -10, x1: 320, top: 470, col: 0, door: [60, 150, 650, 'round'], windows: [[200, 570, 80, 96]] },
  { x0: 328, x1: 860, top: 400, col: 2, door: [640, 760, 600, 'pointed'], windows: [[380, 520, 90, 100], [520, 520, 80, 96]] },
  { x0: 868, x1: 1180, top: 500, col: 1, windows: [[900, 570, 78, 92], [1080, 570, 78, 92]] },
  { x0: 1188, x1: 1450, top: 470, col: 0, door: [1230, 1320, 650, 'round'], windows: [[1360, 570, 70, 90]] },
  { x0: 1458, x1: 1810, top: 520, col: 1, windows: [[1500, 580, 78, 92], [1700, 580, 78, 92]] }];
const A105_INN = { cx: 700, x0: 640, x1: 760, top: 600 }, A105_STALL1 = 380;
const a105So1X = (t) => (t < 9.6 ? kfn(t, [[0.3, -80], [2.98, 655]], 'out') : kfn(t, [[9.6, 655], [10.3, 712]], 'in'));
const A105_FALLS1 = footfalls(a105So1X, 0.3, 3.0, 26);
function a105Street1(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom, night = t >= 25.9;
  if (!night) { skyCycle(ctx, 0.3, { w: 1800, t, hills: false, sun: false }); sun(ctx, 1650, 170, t); }
  else { skyCycle(ctx, 0.8, { w: 1800, t, hills: false, sun: false, moon: true }); }
  a105Lighthouse(ctx, 1560, 560, t, 1.25);
  const doorOpen = night ? a105E(t, 26.6, 0.3) * (1 - a105E(t, 28.55, 0.15)) : a105Env(t, 5.2, 10.6, 0.4);
  marketStreet(ctx, { w: 1800, palette: night ? 'cold' : 'clear', palace: false, houses: A105_HOUSES, sky: false, camX, t, doors: [0, doorOpen, 0], windowsLit: night ? 1 : 0,
    stalls: [{ x: A105_STALL1, kind: 'seed', state: night ? 'closed' : 'open' }], props: night ? [['crate', 1250]] : [['sacks', 1000], ['pots', 1300]] });
  if (night) townDim(ctx, -10, 0, 1820, 1230, 0.9);
  // warm light on the step when the door opens
  if (doorOpen > 0.05) { ctx.save(); ctx.globalAlpha = 0.35 * doorOpen; ctx.fillStyle = dotPat(ctx, C.yellow, 11, 0.4); ctx.beginPath(); ctx.ellipse(A105_INN.cx, 905, 110, 26, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // INN sign on its bracket (to the right of the door), swings when knocked / slammed
  const sr = swing(t, 4.08, 0.1, 1.3, 1.6) + swing(t, 4.7, 0.05, 1.3, 2) + swing(t, 25.95, 0.06, 1.4, 2) + swing(t, 28.58, 0.12, 1.3, 1.6);
  a105InnSign(ctx, 830, 560, sr);
  return night ? a105Street4(ctx, t) : a105Street1Cast(ctx, t);
}
function a105Street1Cast(ctx, t) {
  const W = a105Walk(a105So1X, t, 26), stop = 2.98;
  const P = a105Mk('soldier', { ...W, y: 900, dir: 1, brow: 0.2, mouth: 'smile', lid: 0, bag: { bulge: 1, slit: 0, swing: swing(t, stop, 0.25, 1.6, 3) + (t < stop ? 0.12 * Math.sin(W.ph) : 0) } });
  P.drop = t < stop ? -4 : 0; P.gaze = t < stop ? [0.6, -0.4] : [0.2, -0.9];
  if (t < stop) P.amp = Math.min(1, P.amp * 1.2);
  if (a105In(t, stop, 3.6)) { P.sq = settleTo(t, stop, 0.97, 1, 0.4); P.brow = -0.4; }
  if (a105In(t, 4.6, 5.3)) { P.handR = [96, -150 + 14 * (pulse(t, 4.65, 0.25) + pulse(t, 4.95, 0.25))]; P.gaze = [1, -0.1]; }
  if (a105In(t, 5.3, 5.9)) { P.mouth = 'smile'; P.gaze = [1, -0.2]; }
  if (a105In(t, 5.9, 6.7)) { P.handR = [40 + 6 * (pulse(t, 5.9, 0.15) + pulse(t, 6.1, 0.15)), -96]; P.lid = 0.3; P.drop = 4; P.gaze = gazePlan(t, [[5.9, [-1, 0]], [6.2, [1, 0]], [6.45, [-1, 0.1]]], 0.07); P.mouth = 'closed'; }
  let purse = null;
  if (a105In(t, 6.76, 9.75)) { const lift = a105E(t, 6.76, 0.5); P.bag.flap = 1 - a105E(t, 9.6, 0.15); P.handL = [70, -112]; P.handR = a105L2([46, -86], [64, -126], lift); P.gaze = [0.4, 0.5]; P.mouth = 'smile'; P.lid = 0.25;
    const hp = a105Pt(P, 66, -112); purse = [hp[0], hp[1] + 6 - 6 * landSquash(t, 7.3, 0.4)]; }
  if (a105In(t, 9.45, 9.75)) P.gaze = [-1, 0];
  if (a105In(t, 9.6, 10.3)) { P.handR = [40 + 8 * (pulse(t, 9.75, 0.15) + pulse(t, 9.95, 0.15)), -96]; P.drop = 3 * pulse(t, 9.7, 0.4); P.alpha = 1 - a105E(t, 10.0, 0.3); P.bag.bulge = 1; P.bag.flap = 0; }
  a105Lid(P, t);
  // the sharper: yellow turban and two eyes rise behind the stall counter (9.02), sink when the soldier glances round (9.4)
  const rise = a105Env(t, 9.02, 9.6, 0.13);   // v2: up at the stall's right edge, held 0.3 s, down as the soldier glances round
  const SH = a105Mk('sharper', { x: A105_STALL1 + 70, y: 925 + 120 * (1 - rise), dir: 1, lid: 0.4, brow: -0.4, mouth: 'closed', clipY: 780, gaze: [1, 0.3] });
  if (rise > 0.02) { SH.gaze = lookAt(a105Head(SH), purse || [700, 800]); a105Draw(ctx, SH); }
  a105Draw(ctx, P);
  if (purse) a105Purse(ctx, purse[0], purse[1] + 52, 0.7, { sq: t < 7.6 ? impactSquash(t, 7.36, 0.85) : 1, glint: a105B(t, 8.2, 0.5) });
  for (const f of A105_FALLS1) for (const lx of [10, -10]) dustBurst(ctx, f.x + lx, 900, t - f.t, 3, 5, 10, 22, 0.4, Math.round(f.t * 10));
  return { heads: { so: a105Head(P), purse: purse || a105Pt(P, 40, -80), sh: a105Head(SH) } };
}
// S4: the inn emptied at night
const A105_LINE = [800, 890, 980, 1070];
function a105Street4(ctx, t) {
  const GA = a105Mk('guardA', { x: 590, y: 900, dir: 1, brow: 0.6, mouth: 'closed', lid: 0.3 }), GB = a105Mk('guardB', { x: 1160, y: 905, dir: -1, brow: 0.3, mouth: 'closed' });
  // three knocks
  GA.handR = a105Tr(t, [[25.9, 26.85, (tt) => { const k = [25.9, 26.18, 26.46].reduce((s, h) => s + pulse(tt, h, 0.26), 0); return [96 + 18 * k, -170 + 10 * k]; }]], null);
  if (t >= 30.56 && t < 31.9) { GA.handR = PERSON_HANDS.folded.R; GA.handL = PERSON_HANDS.folded.L; GA.lid = 0.5; }
  const march = (tt) => (tt < 32.58 ? 0 : (tt - 32.58) * 220);
  const actors = [GA, GB];
  for (let i = 0; i < 4; i++) {
    const t0 = 26.9 + i * 0.4, xf = (tt) => kfn(tt, [[t0, A105_INN.cx], [t0 + 0.75, A105_LINE[i]]]) + march(tt);
    const G = a105Mk(A105_GUESTS[i], { ...a105Walk(xf, t, 20), y: 905, dir: 1, brow: -0.3, mouth: 'frown' });
    if (t < t0) { G.hidden = true; continue; }
    G.alpha = K.clamp((t - t0) / 0.2);
    if (i === 0) { G.lid = 0.6; G.amp *= 0.6; G.pillow = !(t > 32.7 && t < 33.0); }
    if (i === 1) G.drop = -3;
    if (i === 2) { G.brow = 0.6; G.handR = [90, -200]; }
    if (i === 3) { G.talk = 0.3 * Math.abs(Math.sin(t * 9)); G.y -= Math.abs(Math.sin(G.ph)) * 5; }
    // concertina at 29.14: bump forward, lurch, settle; shrugs staggered
    const st = a105St(i);
    if (a105In(t, 29.14, 30.4)) { G.x += 18 * pulse(t, 29.14 + st * 0.6, 0.35) * (i + 1) * 0.5; G.tip = 0.08 * pulse(t, 29.14 + st * 0.6, 0.35); if (t > 29.6 + st) { G.handR = PERSON_HANDS.palmsUp.R; G.handL = PERSON_HANDS.palmsUp.L; G.drop = -4 * pulse(t, 29.6 + st, 0.5); G.dir = i % 2 ? -1 : 1; } }
    if (i === 2 && a105In(t, 30.56, 31.8)) { G.handR = PERSON_HANDS.pointUp.R; G.talk = a105Talk(t, [[30.56, 31.8]], 0.9); G.dir = -1; G.brow = 0.8; }
    if (i === 0 && a105In(t, 32.7, 33.2)) { G.dir = -1; G.y -= hop(t, 32.75, 0.3, 0, 0, 26)[1]; G.sq = landSquash(t, 33.05, 0.12); G.handR = [80, -40]; }
    G.gaze = t > 29.14 && t < 30.4 ? [i % 2 ? -1 : 1, 0] : t > 30.56 && t < 31.8 && i !== 2 ? [i < 2 ? 1 : -1, 0] : [1, 0.1];
    a105Lid(G, t);
    if (G.pillow) G.post = [(c) => { const p = a105Pt(G, 10, -118); shape(c, ell(p[0], p[1], 30, 18, 16), C.white, { lw: 4, seed: 441, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 }); }];
    actors.push(G);
  }
  if (t >= 32.58) { GA.x = 590 + march(t) * 0.9; Object.assign(GA, a105Walk((tt) => 590 + march(tt) * 0.9, t, 26)); GB.x = 1160 + march(t); Object.assign(GB, a105Walk((tt) => 1160 + march(tt), t, 22)); GB.dir = 1; }
  GA.gaze = t < 26.9 ? [1, -0.1] : [1, 0.1]; GB.gaze = [-1, 0];
  a105Lid(GA, t); a105Lid(GB, t);
  actors.sort((a, b) => a.y - b.y).forEach((P) => a105Draw(ctx, P));
  if (t > 32.7 && t < 33.05) shape(ctx, ell(A105_LINE[0] + march(t) - 20, 893, 30, 14, 16), C.white, { lw: 4, seed: 441, dot: C.blue, pitch: 7, rad: 0.2, da: 0.4 });
  return { heads: { ga: a105Head(GA), g: actors.slice(2).map((G) => a105Head(G)) } };
}

// ---------- the inn room (S2 night; S12, S13 the flashback) ----------
const A105_MAT = [665, 860], A105_BAGF = [270, 900];   // v2: room re-dressed 65 px right so the thief can kneel on the far side of the bag
function a105InnSet(ctx, t, o) { return hutRoom(ctx, { palette: 'night', u: 0.8, doorSide: 'right', mattress: { x0: 315, x1: 585, head: 'left' }, mat: false, stool: 625, lampAt: [625, 850], t, ...o }); }
function a105InnMat(ctx) { shape(ctx, K.rectPts(A105_MAT[0], 880, A105_MAT[1] - A105_MAT[0], 22), C.red, { lw: 4.5, seed: 450, dot: C.yellow, pitch: 9, rad: 0.2, da: 0.4 }); shape(ctx, ell(A105_MAT[0] + 44, 870, 36, 13, 18), '#fff3d6', { lw: 4, seed: 451 }); }
function a105Inn(ctx, t, cam) {
  const flash = t >= 100;
  const lamp = flash ? 1 - 0.6 * a105E(t, 107.0, 0.8) : 1 - 0.6 * a105E(t, 11.38, 0.5);
  const dark = flash ? 0.15 + 0.55 * a105E(t, 107.0, 0.8) : 0.3 + 0.4 * a105E(t, 11.38, 0.5);   // v2: S2 night lifted (blue wash, not murk)
  const doorO = flash ? a105Env(t, 101.9, 103.6, 0.3) + a105Env(t, 114.6, 116, 0.2) : a105Env(t, 12.75, 13.1, 0.08) * 0.18 + a105E(t, 18.2, 0.2);
  a105InnSet(ctx, t, { layer: 'back', lamp, dark, door: doorO });
  a105InnMat(ctx);
  const F = flash ? a105InnFlash(ctx, t) : a105Inn2(ctx, t);
  a105InnSet(ctx, t, { layer: 'front', lamp, dark, door: doorO });
  // S2 (v2): the right part stays dark (the second sleeper unseen); a door-width dark strip at the left (x 40..150) beside the bag hides the thief:
  // moonlight from the window keeps the bag bright; a silhouette turban with one glinting eye (11.82), a sleeved forearm and hand (12.2-13.0)
  if (!flash) {
    const blk = a105E(t, 11.38, 0.5);
    if (blk > 0.01) { ctx.save(); ctx.globalAlpha = 0.92 * blk; ctx.fillStyle = '#0a0f24'; ctx.fillRect(136, 560, 94, 342); ctx.restore(); }
    if (blk > 0.01 && !bagHeld2(t)) { ctx.save(); ctx.globalAlpha = 0.5 * blk; ctx.fillStyle = dotPat(ctx, '#eef3ff', 9, 0.45); ctx.beginPath(); ctx.moveTo(365, 560); ctx.lineTo(485, 560); ctx.lineTo(365, 905); ctx.lineTo(215, 905); ctx.closePath(); ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.moveTo(365, 560); ctx.lineTo(485, 560); ctx.lineTo(365, 905); ctx.lineTo(215, 905); ctx.closePath(); ctx.clip(); a105BagFloor(ctx, t, { bulge: 1, slit: 0, jig: 3 * pulse(t, 12.6, 0.15) }); ctx.restore(); }
    if (a105In(t, 11.6, 13.3)) { const up = a105E(t, 11.6, 0.3) * (1 - a105E(t, 13.0, 0.3)); a105ThiefShadow(ctx, 180, 860 - 70 * up, t, a105In(t, 11.82, 12.9) ? a105B(t, 11.82, 0.25) : 0); }
    if (a105In(t, 12.2, 13.0)) { const k = t < 12.55 ? a105E(t, 12.2, 0.35) : t < 12.75 ? 1 : 1 - a105E(t, 12.75, 0.2, 'in'); a105ThiefArm(ctx, [215, 832], [K.lerp(215, 261, k), K.lerp(832, 806, k)], t); }
  }
  return F;
}
const bagHeld2 = (t) => t >= 14.64;
// v2: the night intruder in silhouette: a turban outline in the dark strip (rim-lit) with one glinting eye
function a105ThiefShadow(ctx, x, y, t, eye) {
  ctx.save(); const rim = { lw: 4, seed: 470 };
  shape(ctx, ell(x, y + 40, 38, 30, 20), '#0b1030', rim); shape(ctx, ell(x, y, 46, 22, 24), '#0b1030', rim); shape(ctx, ell(x + 4, y - 22, 32, 18, 20), '#0b1030', rim);
  ctx.lineWidth = 5; ctx.strokeStyle = '#a9bcf2'; ctx.beginPath(); ctx.ellipse(x, y, 46, 22, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + 4, y - 22, 32, 18, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
  if (eye > 0) { ctx.translate(x + 22, y + 36); ctx.scale(1, eye); shape(ctx, ell(0, 0, 9, 7, 12), C.white, { lw: 3, seed: 471 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(3, 0, 3.5, 0, 7); ctx.fill(); star(ctx, 10, -10, 7 * eye); }
  ctx.restore();
}
// v2: a dark sleeved forearm with a pale cuff and a hand with fingers, from the elbow e to the wrist w (world points)
function a105ThiefArm(ctx, e, w, t) {
  const rim = { lw: 4, seed: 472 };
  seg(ctx, e[0] - 30, e[1] + 6, e[0], e[1], 34, '#0b1030', 4);
  seg(ctx, e[0], e[1], w[0], w[1], 28, '#0b1030', 4);
  const a = Math.atan2(w[1] - e[1], w[0] - e[0]); ctx.save(); ctx.translate(w[0], w[1]); ctx.rotate(a);
  shape(ctx, K.rectPts(-8, -16, 12, 32), '#7f95d6', { lw: 3.5, seed: 473 });   // the cuff
  shape(ctx, ell(16, 0, 15, 12, 14), '#1a2048', rim);
  for (let f = 0; f < 4; f++) { const fa = -0.5 + f * 0.33, wig = 0.15 * Math.sin(t * 20 + f); seg(ctx, 24, -6 + f * 4, 24 + 20 * Math.cos(fa + wig), -6 + f * 4 + 20 * Math.sin(fa + wig), 7, '#1a2048', 3); }
  ctx.restore();
}
function a105BagFloor(ctx, t, o) { a105Bag(ctx, A105_BAGF[0], A105_BAGF[1] - 58 + (o.jig || 0), 0.5, o); }
function a105Inn2(ctx, t) {
  const P = a105Mk('soldier', { x: 450, y: 864, dir: 1, lie: 1, lid: 1, mouth: 'closed', noBlink: true, sq: 1 + 0.015 * Math.sin(t * 2.4) });
  if (t < 11.3) { const u = a105E(t, 10.9, 0.4); P.lie = u; P.sit = 1 - u; P.seat = 'floor'; P.mouth = 'o'; P.lid = a105E(t, 10.6, 0.7); if (t < 10.95) { P.aR = [2.5, 2.9]; P.aL = [-2.5, -2.9]; } }
  let bag = { bulge: 1, slit: 0, jig: 3 * pulse(t, 12.6, 0.15) }, held = null;
  if (t >= 13.16) {
    P.lid = t < 13.4 ? 0.5 : 0; P.wink = t < 13.4 ? 'R' : null; P.noBlink = false; P.lie = 1 - a105E(t, 13.5, 0.35); P.sit = 1 - P.lie; P.seat = 'floor'; P.x = K.lerp(450, 395, a105E(t, 13.5, 0.35));
    if (a105In(t, 13.94, 14.64)) { P.handLW = [A105_BAGF[0] + 20, A105_BAGF[1] - 30 - 10 * Math.abs(Math.sin((t - 13.94) * 14))]; }
    if (t >= 14.64) { const lift = a105E(t, 14.64, 0.4); const hp = a105L2([A105_BAGF[0] + 20, A105_BAGF[1] - 40], [505, 742], lift); /* v2: beside his head, not in front of it */ P.handLW = [hp[0] - 20, hp[1]]; P.handRW = [hp[0] + 20, hp[1]]; held = hp;
      bag = { bulge: 0, slit: t < 15.58 ? 0 : K.clamp(settleTo(t, 15.58, 0, 1, 0.3, 0.15)), rot: swing(t, 14.9, 0.15, 1.2, 2) }; }
    if (t >= 15.58) { P.eyes = 'wide'; P.brow = -0.6; P.mouth = 'o'; P.noBlink = true; }
    if (a105In(t, 16.54, 17.4)) { P.handRW = [held[0] + 40, held[1] + 20]; }
    if (t >= 17.3) { P.sq = t < 17.5 ? anticipate(t, 17.3, 0.2, 0.08) : settleTo(t, 17.5, 1, 1.12, 0.3) - 0.1 * a105E(t, 17.8, 0.3); P.handL = PERSON_HANDS.headHold.L; P.handR = PERSON_HANDS.headHold.R; P.handLW = P.handRW = null; held = [P.x + 60, 800]; P.mouth = 'open'; }
    if (t >= 18.1) { P.sit = 1 - a105E(t, 18.1, 0.15); const xf = (tt) => kfn(tt, [[18.2, 395], [18.6, 760]], 'in'); P.ph = (t - 18.1) * 40; P.amp = 1; P.x = xf(t); P.tip = 0.15; held = a105Pt(P, 60, -100); }
  }
  P.gaze = t < 13.16 ? [0, -1] : t < 13.94 ? [0.3, -0.8] : t < 14.64 ? [-0.8, 0.5] : t < 16.54 ? lookAt(a105Head(P), held || [365, 760]) : t < 17.4 ? lookAt(a105Head(P), [held[0] + 10, held[1] + 50]) : [0, 0.05];
  a105Lid(P, t);
  if (!held) a105BagFloor(ctx, t, bag);
  a105Draw(ctx, P);
  if (held) { a105Bag(ctx, held[0], held[1], 0.62, { ...bag, slitCol: '#fff3d6' }); if (a105In(t, 16.54, 17.4)) { const fx = held[0] - 4, fy = held[1] + 40, pk = a105E(t, 16.54, 0.2); for (let f = 0; f < 3; f++) { const ang = 0.5 + f * 0.45 + 0.3 * Math.sin(t * 22 + f * 1.7); const L = 30 * pk, bx = fx + f * 11, by = fy + f * 8; seg(ctx, bx, by, bx + Math.cos(ang) * L, by + Math.sin(ang) * L, 12, C.skin, 3.5); } } }   // v2: three skin-coloured fingers wiggle out of the slit
  if (t > 10.9 && t < 13.1) zzz(ctx, 365, 760, t, 10.9);
  return { heads: { so: a105Head(P), bag: held || [A105_BAGF[0], A105_BAGF[1] - 40] } };
}
// S12-S13: the same room lit; both lodge; the theft
const a105So12X = (t) => kfn(t, [[102.0, 840], [102.8, 405]]);
const a105Sh12X = (t) => kfn(t, [[102.9, 850], [103.8, 770]]);
const a105Sh13X = (t) => kfn(t, [[109.58, 720], [109.9, 640], [110.22, 560], [110.6, 285], [114.5, 285], [115.0, 820]]);
const a105Sh13Xv2 = (t) => kfn(t, [[109.58, 770], [110.0, 585], [110.22, 565], [110.6, 565], [111.0, 190]]);   // v2: tiptoe, freeze over the sleeper, scurry to the far side of the bag
function a105InnFlash(ctx, t) {
  // soldier (v2: sits up guarding the bag, nods twice, eyes close at 107.90, arm slides off, lies down; head stays clear of the thief)
  const S = a105Mk('soldier', { x: 365, y: 900, dir: -1, mouth: 'closed', brow: -0.1, lid: 0.3 });
  let bagHeld = t < 102.8;
  if (t < 102.8) { Object.assign(S, a105Walk(a105So12X, t, 22)); S.dir = -1; S.drop = 4; S.bag = { bulge: 1 }; }
  else if (t < 108.0) { S.sit = a105E(t, 102.8, 0.4); S.seat = 'floor'; S.y = 864; S.x = K.lerp(405, 365, a105E(t, 102.8, 0.4)); S.dir = 1;
    if (t >= 103.3) S.handLW = [A105_BAGF[0] + 34, A105_BAGF[1] - 46];
    const nod = (t0) => a105Env(t, t0, t0 + 0.42, 0.14);
    S.lid = t < 105.2 ? 0.2 : t < 106.5 ? 0.45 : 0.55; S.noBlink = true;
    if (a105In(t, 106.5, 106.92)) { const k = nod(106.5); S.drop = 12 * k; S.tip = 0.12 * k; S.lid = K.lerp(0.55, 1, k); }
    if (a105In(t, 107.0, 107.42)) { const k = nod(107.0); S.drop = 14 * k; S.tip = 0.14 * k; S.lid = K.lerp(0.55, 1, k); }
    if (t >= 107.9) { S.lid = 1; S.drop = 6; S.handLW = a105L2([A105_BAGF[0] + 34, A105_BAGF[1] - 46], [327, 878], a105E(t, 107.9, 0.1, 'in')); }
    S.gaze = t < 105.2 ? [0.6, 0] : [0.2, 0.6]; }
  else { S.lie = a105E(t, 108.0, 0.4); S.sit = 1 - S.lie; S.seat = 'floor'; S.y = 864; S.x = K.lerp(365, 450, S.lie); S.dir = 1; S.handLW = [327, 880];
    S.lid = 1; S.noBlink = true; S.mouth = 'open'; S.gaze = [0, -1]; }
  if (a105In(t, 110.22, 110.7)) { S.tip = 0.04 * Math.sin((t - 110.22) * 24); S.mouth = 'o'; S.drop = 4 * pulse(t, 110.22, 0.3); S.sq = 1 + 0.04 * pulse(t, 110.22, 0.3); }   // snore twitch
  // sharper
  const P = a105Mk('sharper', { x: 770, y: 880, dir: -1, mouth: 'smile', brow: -0.5, lid: 0 });
  if (t < 102.9) P.hidden = true;
  else if (t < 104.4) { Object.assign(P, a105Walk(a105Sh12X, t, 20)); P.dir = -1; P.y = 900; if (t > 103.8) { P.handR = PERSON_HANDS.chest.R; P.tip = 0.15 * a105Env(t, 103.85, 104.4, 0.2); P.lid = 0.8; P.mouth = 'smile'; P.y = 900; } }
  else if (t < 108.4) { P.y = K.lerp(900, 880, a105E(t, 104.8, 0.4)); P.lie = a105E(t, 104.8, 0.4); P.x = K.lerp(770, 790, P.lie); P.dir = P.lie > 0.5 ? 1 : -1;   /* v2: lies with his head on the pillow, facing the soldier */
    if (t < 105.22) { P.handR = [16, -178]; P.mouth = 'o'; P.lid = 0.7; P.noBlink = true; P.tip = -0.06 * a105Env(t, 104.4, 104.9, 0.15); }   // a theatrical yawn, one hand to the mouth
    else if (t < 106.5 || (t >= 106.85 && t < 107.9)) { P.wink = 'R'; P.lid = 0; P.eyes = 'wide'; P.noBlink = true; P.talk = 0.25 * Math.abs(Math.sin(t * 3)); P.mouth = 'closed'; }   // one eye wide open on the bag, fake snore
    else if (t < 106.85) { P.lid = 1; P.noBlink = true; P.mouth = 'closed'; }   // the soldier's head comes up: snap shut
    else { P.mouth = 'smile'; P.lid = 0; } }
  else {
    // sits up stiffly, tiptoes, freezes on one leg, kneels on the far side of the bag, cuts, lifts, hush
    if (t < 109.58) { P.y = 880; P.lie = 1 - a105E(t, 108.4, 0.35, 'in'); P.x = K.lerp(790, 770, 1 - P.lie); P.sit = 1 - P.lie; P.seat = 'floor'; P.dir = -1; P.lid = 0; P.mouth = 'closed'; P.noBlink = true; }
    else { Object.assign(P, a105Walk(a105Sh13Xv2, t, 20)); P.y = 912; P.dir = -1; P.amp = Math.min(0.9, P.amp * 1.6); P.drop = -4; P.lid = 0; P.brow = -0.6; P.mouth = 'closed';
      if (t < 111.0) { P.handR = [70, -150]; P.handL = [-50, -150]; }
      if (a105In(t, 110.22, 110.6)) { P.ph = 1.1; P.amp = 0.6; P.x += tremble(t, 1); P.eyes = 'wide'; P.sweat = a105B(t, 110.22, 0.5); }
      if (t >= 111.0) { P.dir = 1; P.kneel = a105E(t, 111.0, 0.22); P.amp = 0; P.mouth = 'o'; P.x = 190; }
      if (a105In(t, 111.1, 112.3)) { P.handR = [86, -64 - 18 * a105E(t, 111.36, 0.6)]; P.blade = true; P.gaze = [0.5, 0.7]; }
      if (a105In(t, 113.08, 113.66)) { P.aR = [K.lerp(1.4, 2.45, a105E(t, 113.08, 0.4)), K.lerp(1.4, 2.85, a105E(t, 113.08, 0.4))]; P.handR = null; P.pinch = true; P.gaze = [0.3, -0.7]; P.mouth = 'closed'; }
      if (a105In(t, 113.66, 114.16)) { P.handR = PERSON_HANDS.chest.R; P.purseChest = true; P.eyes = 'wide'; P.gaze = lookAt(a105Head(P), a105Head(S)); }
      if (t >= 114.16) { P.handR = PERSON_HANDS.hush.R; P.wink = 'L'; P.gaze = [0, 0.05]; P.mouth = 'closed'; }   // hush to the camera; holds until the cut at 115.0
    } }
  if (!P.gaze) P.gaze = t < 105.22 ? lookAt(a105Head(P), a105Head(S)) : lookAt(a105Head(P), [A105_BAGF[0], A105_BAGF[1] - 40]);
  if (t >= 108.4 && t < 109.58) P.gaze = gazePlan(t, [[108.4, [-1, 0]], [108.8, [1, 0]], [109.1, [-1, 0.2]], [109.35, [-0.8, 0.5]]], 0.07);
  a105Lid(S, t); a105Lid(P, t);
  // bag: on the floor, slit from 111.36
  const slit = t < 111.36 ? 0 : a105E(t, 111.36, 0.6), bag = { bulge: t < 113.08 ? 1 : 0.2, slit, purseIn: t > 112.1 && t < 113.08 };
  if (!bagHeld) a105BagFloor(ctx, t, bag);
  // moonlight wedge on the bag
  if (a105In(t, 112.1, 113.9)) { ctx.save(); ctx.globalAlpha = 0.35 * a105Env(t, 112.1, 113.9, 0.3); ctx.fillStyle = '#d6e4ff'; ctx.beginPath(); ctx.moveTo(755, 400); ctx.lineTo(895, 540); ctx.lineTo(365, 910); ctx.lineTo(215, 910); ctx.closePath(); ctx.fill(); ctx.restore(); }
  const order = [S, P].filter((a) => !a.hidden).sort((a, b) => a.y - b.y);
  for (const a of order) {
    a105Draw(ctx, a);
    if (a === P && P.blade) { const h = a105Hand(P, 1); seg(ctx, h[0], h[1], h[0] - 28, h[1] + 14, 5, A105_STEEL, 2); }
    if (a === P && P.pinch) { const h = a105Hand(P, 1); a105Purse(ctx, h[0] + 2, h[1] + 62, 0.62, { rot: 0.1 * Math.sin(t * 6) }); }
    if (a === P && P.purseChest) { const h = a105Pt(P, 10, -118); a105Purse(ctx, h[0], h[1] + 30, 0.6); }
    if (a === P && P.sweat) { const h = a105Head(P); a105Sweat(ctx, h[0] + 30, h[1] - 20, P.sweat); }
  }
  if ((t > 108.3 && t < 110.2) || (t > 110.7 && t < 115)) zzz(ctx, 365, 790, t, 108.3);   // v2: his sleeping face and Zzz stay in view
  return { heads: { so: a105Head(S), sh: P.hidden ? null : a105Head(P), bag: [A105_BAGF[0], A105_BAGF[1] - 40] } };
}

// ---------- Cairo: the money changers' market (S10) ----------
function a105Cairo(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom;
  marketStreet(ctx, { w: 1000, palette: 'clear', palace: false, camX, t, stalls: [{ x: 470, kind: 'empty' }], props: [['crate', 120]] });
  // stall dressing: coin stacks, scale, MONEY CHANGERS board
  const sp = a105E(t, 94.7, 0.3);
  shape(ctx, K.rectPts(340, 470, 260, 56), C.white, { lw: 5, seed: 452 }); ctx.font = K.font(36, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText('MONEY CHANGERS', 470, 500 + 2 * pulse(t, 94.7, 0.3));
  void sp;
  // the changer behind the counter (clipped at the counter top)
  const CH = a105Mk('changer', { x: 450, y: 880, dir: 1, mouth: 'closed', lid: 0.3, brow: 0.2, clipY: 782 });
  CH.handR = a105Tr(t, [[89.0, 89.5, PERSON_HANDS.moustache.R], [89.9, 91.6, (tt) => [70 + 18 * Math.sin(tt * 12), -110]], [91.64, 92.4, [92, -150]]], [60, -110]);
  CH.handL = [50, -110]; CH.talk = a105In(t, 89.9, 91.6) ? 0.25 * Math.abs(Math.sin(t * 12)) : 0; CH.gaze = [0.4, 0.6];
  const tiltScale = t < 91.64 ? 0.3 * Math.sin(t * 6) * a105Env(t, 89.9, 91.6, 0.2) : -0.6 * a105Env(t, 91.64, 92.4, 0.15);
  // the soldier in front of the counter
  const xf = (tt) => kfn(tt, [[95.36, 600], [96.0, 900]], 'in');
  const S = a105Mk('soldier', { ...a105Walk(xf, t, 26), y: 930, dir: -1, mouth: 'smile', lid: 0.2, bag: { bulge: t > 93.72 ? 1 : 0, slit: 0, flap: a105Env(t, 93.4, 94.2, 0.2) } });
  if (t < 95.36) { S.x = 600; S.amp = 0; }
  S.handL = a105Tr(t, [[89.0, 89.85, (tt) => [-60 + 6 * Math.sin(tt * 24), -110]]], null);
  let purse = null;
  if (a105In(t, 91.5, 93.9)) { S.handR = [70, -118 - 14 * (pulse(t, 92.96, 0.25) + pulse(t, 93.25, 0.25))]; S.handL = t < 92.96 ? [40, -126] : null; purse = a105Pt(S, 70, -110); S.mouth = 'open'; S.gaze = lookAt(a105Head(S), purse); }
  if (a105In(t, 93.72, 94.6)) { S.handR = [40 + 6 * (pulse(t, 93.9, 0.15) + pulse(t, 94.1, 0.15)), -96]; S.gaze = [-0.3, 0.5]; }
  if (t >= 94.6) { S.dir = t < 95.36 ? K.lerp(-1, 1, a105E(t, 94.6, 0.4)) : 1; if (Math.abs(S.dir) < 0.7) S.dir = Math.sign(S.dir || 1) * 0.7; S.gaze = [1, 0]; }
  if (!S.gaze) S.gaze = t < 89.9 ? [-0.6, -0.3] : lookAt(a105Head(S), [520, 760]);
  // the sharper behind the barrel (x 820)
  // v2: crouched behind the barrel: only the turban and eyes over the rim (y 950); rises 20 px with the coin glint at 92.36; drops out of sight at 93.72
  const BX = 820, shY = kfn(t, [[90.4, 1030], [90.75, 964], [92.3, 964], [92.5, 944], [93.0, 944], [93.2, 964], [93.72, 964], [93.9, 1040]]), rise = shY < 1020 ? 1 : 0;
  const shx = t < 95.36 ? BX + 10 : kfn(t, [[95.36, BX + 10], [96, 980]]);
  const SH = a105Mk('sharper', { x: shx, y: shY, dir: -1, lid: 0.3, brow: -0.5, mouth: 'closed', clipY: t < 95.36 ? 792 : null });
  if (t >= 95.36) { Object.assign(SH, a105Walk((tt) => kfn(tt, [[95.36, BX + 10], [96, 980]]), t, 20)); SH.y = 900; SH.dir = 1; SH.drop = -6; SH.amp = 0.9; }
  SH.gaze = t < 91.04 ? [-0.8, 0] : t < 91.4 ? lookAt(a105Head(SH), a105Head(S)) : lookAt(a105Head(SH), purse || [520, 770]);
  if (t >= 92.36 && t < 93.9) SH.coinEyes = K.ease.back(a105B(t, 92.36, 0.3));
  a105Lid(CH, t); a105Lid(S, t);
  a105Draw(ctx, CH);
  // counter goods over the changer's waist
  for (const [x, n] of [[380, 4], [410, 6], [560, 5]]) a105Stack(ctx, x, 780, n);
  a105Scale(ctx, 480, 780, 0.8, tiltScale);
  // coins pour from the pan into the purse
  if (a105In(t, 91.64, 92.5) && purse) for (let i = 0; i < 8; i++) { const u = ((t - 91.64) * 2.2 + i / 8) % 1, p0 = [540, 690], p1 = [purse[0], purse[1] - 20]; a105Coin(ctx, K.lerp(p0[0], p1[0], u), K.lerp(p0[1], p1[1], u) - 60 * Math.sin(Math.PI * u), 8, 0.6); }
  if (rise > 0.02 || t >= 95.36) a105Draw(ctx, SH);
  townProp(ctx, 'barrel', BX, { y: 902 });
  a105Draw(ctx, S);
  if (purse) a105Purse(ctx, purse[0], purse[1] + 48, 0.62, { sq: 1 - 0.06 * pulse(t, 92.96, 0.25) });
  return { heads: { so: a105Head(S), sh: a105Head(SH), purse: purse || [600, 800], ch: a105Head(CH) } };
}

// ---------- the road to Alexandria (S11, world 2400) ----------
const A105_ROAD = { palm: 860, wall: [1500, 1760, 850], ms: [900, 1300] };
const a105So11X = (t) => (t < 98.7 ? kfn(t, [[95.5, 300], [98.7, 1600]], 'lin') : t < 100.9 ? 1600 : kfn(t, [[100.9, 1600], [102.0, 2080]], 'lin'));
// v2: the sharper keeps >= 220 px behind, on tiptoe; hides behind the palm (97.35-98.0); behind the wall only a hand, then turban and brows
const a105Sh11Xv2 = (t) => kfn(t, [[95.5, -120], [97.35, A105_ROAD.palm - 6], [98.0, A105_ROAD.palm - 6], [98.7, 1330]], 'lin');
const a105Sh11X = (t) => (t < 98.7 ? kfn(t, [[95.6, -40], [97.55, 870], [97.95, 870], [98.7, 1300]]) : t < 101.5 ? 1700 : kfn(t, [[101.5, 1700], [102.0, 1880]], 'lin'));
const a105U11 = (t) => kfn(t, [[95.5, 0.28], [98.06, 0.3], [99.3, 1.3]], 'lin');   // v2: one smooth day-dusk-night-morning sweep, then day
function a105Road(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom, u = a105U11(t) % 1;
  desertRoad(ctx, { w: 2400, camX, u, t, palms: [[A105_ROAD.palm, 520, 10]], milestones: A105_ROAD.ms, wall: A105_ROAD.wall, wallFront: true, city: 'right', thorns: [520, 1150], rocks: [1950] });
  const night = dayCycle(u).night; if (night > 0.02) townDim(ctx, -10, 0, 2420, 1230, night * 0.8);
  // soldier
  const sitting = t >= 98.7 && t < 100.9;
  const S = a105Mk('soldier', { ...a105Walk(a105So11X, t, 30), y: 900, dir: 1, mouth: 'o', lid: 0.1, bag: { bulge: 1, swing: 0.1 * Math.sin(t * 8) } });
  if (!sitting) S.amp = Math.min(1, S.amp * 1.4);
  if (sitting) { S.sit = a105Env(t, 98.7, 100.9, 0.2); S.seat = 'bench'; S.amp = 0; S.mouth = 'closed'; S.gaze = [-0.3, -0.2]; }
  if (a105In(t, 97.45, 97.95)) { S.gaze = [-1, 0]; S.tilt = -0.1; }
  if (a105In(t, 99.6, 100.9)) { S.bag = null; S.handR = [30, -100]; S.handL = [-10, -100]; S.mouth = 'o'; S.lid = 0.5; S.hug = true; }
  if (!S.gaze) S.gaze = [1, -0.2];
  a105Lid(S, t);
  // sharper (v2): sneaking on tiptoe at a distance, only turban and eyes beside the palm trunk, then behind the wall
  const SH = a105Mk('sharper', { ...a105Walk(a105Sh11Xv2, t, 14), y: 900, dir: 1, brow: -0.5, mouth: 'closed', lid: 0.1 });
  SH.amp = Math.min(0.6, SH.amp); SH.drop = -6; SH.handR = [60, -170]; SH.handL = [-40, -160]; SH.tip = 0.08;
  const behindPalm = t >= 97.35 && t < 98.0, hiddenWall = t >= 98.7, onRoad = t < 98.7 && !behindPalm;
  if (behindPalm) { SH.amp = 0; SH.tip = 0; SH.tilt = 0.18; SH.gaze = lookAt(a105Head(SH), a105Head(S)); SH.x = A105_ROAD.palm + 24; SH.clipY = a105Head(SH)[1] + 30; SH.brow = -0.7; }
  if (!SH.gaze) SH.gaze = lookAt(a105Head(SH), a105Head(S));
  a105Lid(SH, t);
  if (onRoad && t > 95.5) a105Draw(ctx, SH);
  // the wall: a forearm and hand rise behind it beside the bag (98.86), snap down at 99.60; the turban and angry brows rise at 99.98
  if (a105In(t, 98.86, 99.75)) { const k = t < 99.6 ? a105E(t, 98.86, 0.5) : 1 - a105E(t, 99.6, 0.12, 'in'); const bx = 1668, by = 852 + 6 - 96 * k;
    seg(ctx, bx, 900, bx, by + 22, 26, A105_GREEN, 4); shape(ctx, K.rectPts(bx - 15, by + 14, 30, 12), C.yellow, { lw: 3.5, seed: 474 });
    shape(ctx, ell(bx, by, 14, 14, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); for (let f = 0; f < 3; f++) seg(ctx, bx - 8 + f * 8, by - 8, bx - 14 + f * 8 - 4 * Math.sin(t * 18 + f), by - 26, 7, C.white, 2.5); }
  if (t >= 99.98) { const W = a105Mk('sharper', { x: 1700 + tremble(t, 1.2), y: 1012 - 12 * a105E(t, 99.98, 0.2), dir: -1, brow: 1, mouth: 'frown', lid: 0.2, clipY: 852, flush: 0.8 });
    W.gaze = lookAt(a105Head(W), a105Head(S)); if (t > 100.9) W.y = 1000; a105Draw(ctx, W); const h = a105Head(W); if (t < 101.4) { steam(ctx, h[0] - 34, h[1] - 50, t); steam(ctx, h[0] + 34, h[1] - 50, t + 0.4); } }
  desertRoad(ctx, { w: 2400, front: true, wall: A105_ROAD.wall, wallFront: true });
  // the palm trunk in front (he hides behind it): redraw the tree over him
  if (a105In(t, 97.2, 98.2)) { palmTree(ctx, A105_ROAD.palm, 900, { h: 520, lean: 10, t }); if (behindPalm) { const h = a105Head(SH); ctx.save(); ctx.beginPath(); ctx.rect(h[0] + 4, h[1] - 120, 200, 200); ctx.clip(); a105Draw(ctx, SH); ctx.restore(); } }
  a105Draw(ctx, S);
  if (S.hug) { const p = a105Pt(S, 20, -95); a105Bag(ctx, p[0], p[1] - 30, 0.45, { bulge: 1 }); }
  return { heads: { so: a105Head(S), sh: a105Head(SH) } };
}

// ---------- the lanes yard (S17, S18, S21; world 1600) ----------
// S17 the sharper: out of the door, leap, splash, periscope, out, lanes
function a105ShYard(t) {
  const P = a105Mk('sharper', { x: 1470, y: 900, dir: -1, brow: 0.1, mouth: 'smile', lid: 0, noBlink: true });
  P.purse = null; let up = false;
  // v2: two running steps, crouch (136.0), a parabolic leap tipped forward with knees tucked and the purse held high (136.32), feet-first entry (137.14), periscope fist (138.04)
  if (t < 136.0) { Object.assign(P, a105Walk((tt) => kfn(tt, [[135.48, 1470], [136.0, 1200]], 'lin'), t, 34)); P.amp = 1; P.tip = 0.18; P.dir = -1; P.handR = [30, -230]; up = true; P.alpha = K.clamp((t - 135.45) / 0.1); }
  else if (t < 137.14) { P.x = 1200; up = true; P.aR = [2.6, 2.95]; P.dir = -1;
    if (t < 136.32) { P.sq = 1 - 0.15 * a105Env(t, 136.0, 136.34, 0.12); P.tip = 0.12; P.drop = 6; P.handL = [-40, -120]; }
    else { const u = a105B(t, 136.32, 0.82), [x, l] = hop(t, 136.32, 0.82, 1200, 960, 180); P.x = x; P.y = 900 - l; P.tip = 0.3 * Math.sin(Math.PI * Math.min(1, u * 1.3)); P.sit = 0.7 * Math.sin(Math.PI * u); P.seat = 'floor'; P.aL = [-2.2, -1.6]; P.mouth = 'open'; P.sq = u < 0.15 ? 1.06 : 1; } }
  else if (t < 138.8) { const xf = (tt) => kfn(tt, [[137.14, 960], [138.04, 960], [138.7, 800]]); P.x = xf(t); P.y = 900 + 280 * a105E(t, 137.14, 0.5, 'in'); P.clipY = 900; P.aR = [2.75, 3.0]; up = t < 137.5; P.wet = true; P.dir = -1; if (t >= 137.6) P.peri = a105E(t, 137.6, 0.3); }
  else if (t < 139.62) { const [x, l] = hop(t, 138.8, 0.35, 770, 690, 70); P.x = x; P.y = 900 - l + (t < 138.95 ? 100 * (1 - a105B(t, 138.8, 0.15)) : 0); P.sq = landSquash(t, 139.15, 0.15); P.handR = [40, -150]; P.handL = [-40, -150];
    if (t > 139.15) { P.x = 690 + 4 * Math.sin((t - 139.15) * 75) * a105Env(t, 139.15, 139.55, 0.05); P.tilt = 0.1 * Math.sin((t - 139.15) * 75) * a105Env(t, 139.15, 139.55, 0.05); P.lid = 1; } P.dripping = true; }
  else if (t < 140.0) { Object.assign(P, a105Walk((tt) => kfn(tt, [[139.62, 690], [140.0, 610]]), t, 26)); P.amp = 1; P.alpha = 1 - a105E(t, 139.8, 0.2); P.y = 900 - 30 * a105E(t, 139.7, 0.3); }
  else if (t < 140.7) { Object.assign(P, a105Walk((tt) => kfn(tt, [[140.1, 190], [140.65, 400]]), t, 26)); P.amp = 1; P.dir = 1; P.y = 870; P.alpha = Math.min(K.clamp((t - 140.1) / 0.1), 1 - a105E(t, 140.5, 0.15)); P.mouth = 'open'; }
  else if (t >= 141.88 && t < 142.9) { P.x = 640; P.y = 870; P.dir = 1; P.clipR = [540, 0, 140, 2000]; P.tip = -0.25 * a105Env(t, 141.9, 142.8, 0.15); P.handR = a105Tr(t, [[142.1, 142.7, [30, -232]]], null); P.wink = a105In(t, 142.2, 142.6) ? 'L' : null; P.gaze = [0, 0.05]; P.drop = 2; P.alpha = 1 - a105E(t, 142.7, 0.2); }
  else P.hidden = true;
  if (!P.gaze) P.gaze = [P.dir, 0.1];
  if (up) P.purse = a105Hand(P, 1);   // computed after drawing (hands)
  P.up = up;
  return P;
}
const A105_PRINTS = (() => { const L = []; for (let i = 0; i < 6; i++) L.push([745 - i * 26, 912 + (i % 2) * 8, 139.15 + i * 0.08]); for (let i = 0; i < 6; i++) L.push([200 + i * 36, 900 + (i % 2) * 8, 140.15 + i * 0.08]); for (let i = 0; i < 4; i++) L.push([280 - i * 20, 912 + (i % 2) * 8, 141.88]); return L; })();
// S18 guards and the chief
const a105GaY = (t) => (t < 149.14 ? kfn(t, [[146.4, 1430], [147.74, 1160]], 'out') : t < 150.1 ? kfn(t, [[149.14, 1160], [150.0, 190]], 'lin') : kfn(t, [[150.1, 610], [150.4, 420]], 'lin'));
const a105GbY = (t) => (t < 149.14 ? kfn(t, [[146.6, 1460], [147.9, 1180]], 'out') : t < 150.1 ? kfn(t, [[149.3, 1180], [150.0, 610]], 'lin') : kfn(t, [[150.1, 190], [150.4, 385]], 'lin'));
function a105Yard(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom, dusk = t >= 171;
  const wave = a105B(t, 140.74, 1.0), wk = a105Env(t, 140.74, 141.8, 0.15) + 0.6 * a105Env(t, 149.2, 150.3, 0.2);
  a105LanesYard(ctx, { t, u: dusk ? 0.5 : 0.3, camX, wave: t > 149 ? 1 - a105B(t, 149.2, 1.1) : wave, wk });
  a105Pool(ctx, A105_POOL[0], A105_POOL[1], 'back', t);
  a105Prints(ctx, A105_PRINTS, t, dusk ? 0.01 : 40);
  if (t > 137.6 && t < 141) for (let k = 0; k < 3; k++) { const t0 = 138.04 + k * 0.22; if (t > t0) ripple(ctx, 960 - (t0 - 138.04) * 240, 915, t0, t, 1); }
  if (t > 147.7 && t < 149.5) ripple(ctx, 1080, 920, 147.8, t, 1);
  const heads = {}; let lateG = null;
  if (!dusk && t < 142.95) {
    const P = a105ShYard(t);
    if (!P.hidden) { a105Draw(ctx, P);
      if (P.peri) { const k = P.peri, bx = P.x, top = 905 - 70 * k; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 3000, 900); ctx.clip(); seg(ctx, bx, 940, bx, top + 14, 20, A105_GREEN, 4); shape(ctx, ell(bx, top, 13, 13, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); a105Purse(ctx, bx + 2, top - 6, 0.62, {}); ctx.restore(); }   // v2 periscope: only the fist and the purse above the water
      if (P.up) { const h = a105Hand(P, 1); a105Purse(ctx, h[0] + 2, h[1] - 6, 0.62, {}); }
      if (P.dripping) drops(ctx, P.x, P.y - 200, t, 3); heads.sh = a105Head(P); }
  }
  if (!dusk && t >= 142.9) {
    const CH = a105Mk('chief', { x: 1520, y: 900, dir: -1, brow: 1, mouth: 'open', lid: 0, sit: 0 });
    CH.tilt = 0.14; CH.helmRot = 0;
    if (a105In(t, 143.02, 143.7)) { CH.handR = PERSON_HANDS.cupMouth.R; CH.handL = PERSON_HANDS.cupMouth.R.map((v, i) => (i ? v : -v * 0.4)); CH.sq = settleTo(t, 143.02, 1, 1.08, 0.3); CH.tip = 0.1; CH.talk = a105Talk(t, [[143.02, 143.7]], 1); }
    if (a105In(t, 143.7, 146.9)) { CH.handR = PERSON_HANDS.pointFwd.R; CH.handL = [-40, -190 + 12 * Math.sin(t * 22)]; CH.flush = a105E(t, 143.7, 0.6); CH.talk = a105Talk(t, [[143.8, 146.8]], 0.9); CH.tip = 0.08; }
    if (t >= 146.9) { CH.flush = 1; CH.mouth = 'frown'; if (t > 151.84) { CH.handR = [26, -214]; CH.lid = 1; CH.drop = 4; } }
    CH.gaze = [-1, 0.1]; a105Draw(ctx, CH); heads.ch = a105Head(CH);
    // the guards
    const jam = a105In(t, 145.1, 146.4);
    const G = [['guardA', a105GaY, 0], ['guardB', a105GbY, 1]].map(([nm, xf, i]) => {
      const P = a105Mk(nm, { ...a105Walk(xf, t, 28), y: i ? 905 : 900, dir: -1, brow: 0.6, mouth: 'open' });
      if (t < 145.1) { P.hidden = true; return P; }
      if (jam) { P.x = 1430 + i * 50 + 3 * Math.sin(t * 40 + i); P.amp = 0.5; P.ph = t * 20; P.sq = 0.95; P.mouth = 'o'; P.brow = -0.3; P.sqx = 0.9; }
      if (t >= 146.4) { P.amp = Math.min(1, P.amp * 1.4); P.tip = 0.12; }
      if (a105In(t, 147.74 + i * 0.1, 148.46)) { P.amp = 0; P.tip = 0.25 * Math.sin((t - 147.74) * 9); P.aR = [2 + Math.sin(t * 25), 2.4 + Math.sin(t * 25)]; P.aL = [-2 - Math.sin(t * 25 + 1), -2.4 - Math.sin(t * 25 + 1)]; P.eyes = 'wide'; }
      if (a105In(t, 148.46, 149.14)) { P.amp = 0; P.tip = 0; P.gaze = gazePlan(t, [[148.46, lookAt(a105Head(P), [190, 760])], [148.65, lookAt(a105Head(P), [400, 760])], [148.85, lookAt(a105Head(P), [610, 760])], [149.0, [i ? -1 : 1, 0]]], 0.07); P.mouth = 'o'; }
      if (a105In(t, 149.14, 150.1)) { P.y = 1010; P.alpha = t > 149.85 ? 1 - a105E(t, 149.85, 0.15) : 1; P.brow = 0.8; P.mouth = 'closed'; }
      if (a105In(t, 150.1, 150.4)) { P.y = 880; P.dir = i ? 1 : -1; P.alpha = K.clamp((t - 150.1) / 0.08); }
      if (t >= 150.4) { P.x = i ? 375 : 430; P.y = 885; P.dir = i ? 1 : -1; P.sit = a105E(t, 150.45, 0.2); P.seat = 'floor'; P.sq = t < 150.6 ? impactSquash(t, 150.4, 0.7) : 1; P.dizzy = t < 151.0; P.mouth = 'o'; P.brow = -0.3; P.eyes = t < 151 ? 'shut' : 'open'; P.amp = 0; P.tip = 0; }
      if (i === 0 && t >= 151.0) { P.handR = PERSON_HANDS.palmsUp.R; P.handL = PERSON_HANDS.palmsUp.L; P.sq = 1 + 0.03 * Math.sin(t * 14); P.gaze = [0, 0.05]; }
      if (i === 1 && t >= 151.84) { P.helm = false; P.handR = [60, -170]; P.handL = [30, -170]; P.gaze = [0.4, -0.6]; P.bowl = true; }
      if (!P.gaze) P.gaze = [P.dir, 0.1];
      a105Lid(P, t);
      return P; });
    const drawG = (P) => { a105Draw(ctx, P); if (P.dizzy) { const h = a105Head(P); dizzy(ctx, h[0], h[1] - 50, t, 30); } if (P.bowl) { const h = a105Hand(P, 1); a105HelmetBowl(ctx, h[0] - 10, h[1] - 4 + 4 * Math.sin(t * 30), 0.2 * Math.sin(t * 15)); } };
    const front = a105In(t, 149.0, 150.1);   // v2: they run back along the sand in front of the pool, drawn after its near rim
    if (!front) G.filter((P) => !P.hidden).sort((a, b) => a.y - b.y).forEach(drawG); else lateG = G.filter((P) => !P.hidden).sort((a, b) => a.y - b.y).map((P) => () => drawG(P));
    heads.ga = a105Head(G[0]); heads.gb = a105Head(G[1]);
  }
  a105Pool(ctx, A105_POOL[0], A105_POOL[1], 'front', t);
  if (lateG) lateG.forEach((f) => f());
  if (t >= 137.14 && t < 138.6) a105Splash(ctx, 960, 905, t - 137.14, 1.1);
  // S21 dusk: on the roof, wringing the turban tail, toss and catch, wink, stroll off
  if (dusk) {
    const xf = (tt) => kfn(tt, [[173.3, 400], [173.7, 300]], 'in');
    const P = a105Mk('sharper', { ...a105Walk(xf, t, 20), y: 548, s: 0.8, dir: -1, mouth: 'smile', lid: 0.2, brow: -0.3 });
    if (t < 173.0) { P.handR = [30 + 6 * Math.sin(t * 14), -130]; P.handL = [10 - 6 * Math.sin(t * 14), -110]; P.gaze = [0.3, 0.6]; P.dir = 1; }
    let pp = null;
    if (t >= 173.0) { const k = a105B(t, 173.0, 0.4); P.handR = [60, -140]; const h0 = a105Pt(P, 60, -140); pp = [h0[0], h0[1] - 60 * Math.sin(Math.PI * k)]; if (k >= 1) pp = a105Pt(P, 60, -140); P.dir = t < 173.3 ? 1 : -1; P.wink = a105In(t, 173.15, 173.4) ? 'L' : null; P.gaze = t < 173.4 ? [0, 0.05] : [-1, 0]; }
    a105Draw(ctx, P);
    if (t < 173.0) { const h = a105Pt(P, 20, -120); drops(ctx, h[0], h[1] + 20, t, 3); seg(ctx, h[0] - 30, h[1], h[0] + 30, h[1] + 8, 9, C.yellow, 3); }
    if (pp) a105Purse(ctx, pp[0], pp[1] + 40, 0.5, { sq: landSquash(t, 173.4, 0.15) });
    heads.sh = a105Head(P);
  }
  return { heads };
}
