// ===== AN-138 street scenes: S1-S4 (arrival, plea, no questions, the order), S13 (the night escape), S17 (dawn, the open door) =====
const YP_HX = (t) => kfn(t, [[0.42, -220], [7.4, 300]], 'out');
const YP_HX2 = (t) => kfn(t, [[12.5, 300], [14.6, -420]], 'in');          // the horse led away (empty) while the camera is close
const YP_YX = (t) => kfn(t, [[14.8, 250], [16.0, 420]], 'inOut');        // Yahya on foot
const YP_GX = 610;                                                          // the poor man at the steps

// ---------- the poor man in S1-S4 ----------
function ypGuestStreet(t) {
  const P = ypGuest({ x: YP_GX, lean: 0.05, sit: 0, gaze: [-1, 0.1] }, t), yh = ypHead(ypYahStreet(t));
  const gh = [YP_GX, 640];
  // sitting by the steps, knees up, head low
  if (t < 13.35) { P.sit = 1; P.seat = 'floor'; P.drop = 6; P.gaze = [0, 1]; P.lid = 0.5; P.sq = breathe(t, 3, 0.02); }
  if (t >= 8.74 && t < 13.35) { P.lid = K.lerp(0.5, 0, ypE(t, 8.74, 0.35)); P.drop = K.lerp(6, 0, ypE(t, 8.74, 0.4)); const rider = t < 12.5 ? [YP_HX(t) + 30, 560] : [250, 600]; P.gaze = lookAt([YP_GX, 760], rider); }
  if (t >= 11.24 && t < 13.2) { P.wet = true; P.brow = -0.5; P.mouth = 'closed'; }
  if (t >= 11.98 && t < 13.2) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.lid = Math.max(pulse(t, 12.1, 0.14), pulse(t, 12.38, 0.14)); P.drop = 4 * pulse(t, 12.6, 0.3); }
  // scrambles up: dip, rise with overshoot, two pats of dust
  if (t >= 13.2) { P.sit = 1 - ypE(t, 13.35, 0.5); P.seat = 'floor'; P.sq = (1 - 0.08 * pulse(t, 13.2, 0.16)) * (1 + 0.05 * pulse(t, 13.78, 0.3)); }
  if (ypIn(t, 13.9, 14.4)) P.handR = [34, -84 + 10 * Math.abs(Math.sin((t - 13.9) * 12))];
  // bow, hand on chest
  if (ypIn(t, 14.4, 15.6)) { P.tip = 0.14 * ypEnv(t, 14.4, 15.6, 0.25); P.lid = 0.7 * ypEnv(t, 14.4, 15.6, 0.2); P.handR = PERSON_HANDS.chest.R; P.gaze = [0, 1]; }
  if (t >= 15.2) P.gaze = lookAt(gh, yh);
  // the greeting, the plea, the point at the door, the half kneel
  P.handR = ypTr(t, [[16.18, 16.9, [60, -186]], [18.14, 19.6, PERSON_HANDS.palmsUp.R], [19.58, 19.9, PERSON_HANDS.chest.R, 0.12], [20.06, 21.5, PERSON_HANDS.reachBoth.R]], P.handR);
  P.handL = ypTr(t, [[18.14, 19.6, PERSON_HANDS.palmsUp.L], [20.06, 21.5, PERSON_HANDS.reachBoth.L]], P.handL);
  if (ypIn(t, 19.85, 20.15)) { P.handLW = [705, 700]; P.handL = null; P.gaze = lookAt(gh, [740, 700]); }
  if (ypIn(t, 16.18, 22.98)) { P.mouth = 'smile'; }
  if (ypIn(t, 18.14, 21.0)) { P.brow = -0.5; P.mouth = 'closed'; }
  P.talk = ypIn(t, 16.18, 16.8) ? 0.7 * talk(t, [[16.18, 16.8]]) : ypIn(t, 18.14, 20.0) ? 0.8 * talk(t, [[18.14, 20.0]], 1) : 0;
  if (t >= 20.06 && t < 21.6) { P.kneel = 0.5 * ypE(t, 20.06, 0.4) * (1 - ypE(t, 20.85, 0.6)); P.wet = true; P.x += t < 20.85 ? tremble(t, 1.5) : 0; }
  // S3: his trouble, the purse, the moth, the clasp, hope
  if (t >= 22.98) {
    P.talk = ypIn(t, 22.98, 25.4) ? 0.8 * talk(t, [[22.98, 25.4]], 2) : ypIn(t, 27.5, 28.2) ? 0.6 * talk(t, [[27.5, 28.2]]) : 0;
    P.mouth = 'closed'; P.brow = -0.4; P.lean = 0.07;
    if (ypIn(t, 25.62, 28.2)) { P.handRW = [552, 700]; P.handLW = [538, 704]; P.handR = null; P.handL = null; }
    if (ypIn(t, 26.32, 27.0)) P.gaze = lookAt(gh, ypMothPos(t));
    if (t >= 28.22) { P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; P.tip = 0.08 * ypE(t, 28.22, 0.3) * (1 - ypE(t, 30.8, 0.5)); P.brow = -0.7; P.wet = t < 30.9; }
    if (t >= 30.9) { P.brow = K.lerp(-0.7, -0.3, ypE(t, 30.9, 0.3)); P.mouth = t < 31.2 ? 'o' : 'smile'; }
  }
  // S4: braces for questions; the tags; the order
  if (t >= 32.32) {
    P.drop = 6 * ypE(t, 32.32, 0.3) * (1 - ypE(t, 36.2, 0.3)); P.lean = 0.09 * (1 - ypE(t, 36.2, 0.3)); P.lid = ypIn(t, 32.32, 34.3) ? 0.4 : 0; P.mouth = 'closed'; P.brow = -0.5;
    P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; P.tip = 0;
    if (ypIn(t, 33.0, 33.4)) P.gaze = [0, 1];
    if (ypIn(t, 34.46, 36.2)) P.gaze = lookAt(gh, t < 35.54 ? [470, 420] : [580, 470]);
    if (ypIn(t, 36.22, 37.4)) { P.gaze = [0.2, -1]; P.mouth = 'o'; P.brow = -0.8; }
    if (t >= 37.4) { P.gaze = lookAt(gh, [760, 700]); P.mouth = 'o'; P.sq = 1 + 0.06 * ypEnv(t, 37.56, 38.5, 0.15); P.lid = 0; }
  }
  return P;
}
// ---------- Yahya in S1-S4 (on foot from 12.5) ----------
function ypYahStreet(t) {
  const P = ypYahya({ ...ypWalk(YP_YX, t, 1.3), dir: 1, mouth: 'smile', handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R });
  const gh = [YP_GX, 655], yh = [P.x, 640];
  P.gaze = lookAt(yh, gh);
  if (ypIn(t, 16.8, 17.6)) { P.handR = PERSON_HANDS.chest.R; P.handL = null; P.drop = 5 * pulse(t, 16.9, 0.45); P.lid = pulse(t, 16.95, 0.3); }
  if (ypIn(t, 18.14, 20.6)) P.tilt = 0.07 * ypEnv(t, 18.14, 20.6, 0.3);
  if (ypIn(t, 20.68, 21.7)) { const k = ypEnv(t, 20.68, 21.7, 0.25); P.tip = 0.12 * k; P.handRW = [YP_GX - 26, 760 + 30 * (1 - ypE(t, 20.85, 0.6))]; P.handR = null; P.look = 0.6 * Math.sin((t - 21.0) * 14) * ypEnv(t, 21.0, 21.6, 0.1); }
  // S3: listens, slow blink, thinks, smiles, nods
  if (t >= 22.98) { P.tilt = 0.06 * ypE(t, 24.18, 0.6); P.lid = pulse(t, 24.3, 0.45); P.mouth = t < 30.74 ? 'closed' : 'smile'; }
  if (ypIn(t, 26.32, 27.0)) P.gaze = lookAt(yh, ypMothPos(t));
  if (ypIn(t, 30.28, 31.4)) { P.handR = PERSON_HANDS.chin.R; P.handL = PERSON_HANDS.folded.L; P.lid = 0.2; }
  if (ypIn(t, 31.3, 32.0)) P.drop = -3 * pulse(t, 31.3, 0.2) + 7 * pulse(t, 31.5, 0.45);
  // S4: almost asks, then smiles; sweeps the tags; claps and orders
  if (t >= 32.32) { P.tilt = 0; P.mouth = ypIn(t, 32.9, 33.05) ? 'o' : 'smile'; P.look = ypIn(t, 33.1, 33.6) ? 0.5 * Math.sin((t - 33.1) * 18) : 0; }
  if (ypIn(t, 36.1, 36.75)) { const k = ypE(t, 36.22, 0.4); P.handR = ypL2([70, -205], [-30, -175], k); P.handL = PERSON_HANDS.folded.L; P.gaze = [0, -1]; }
  if (t >= 36.94) { P.drop = -4 * ypE(t, 36.94, 0.3); P.talk = ypIn(t, 37.0, 37.7) ? 0.8 * talk(t, [[37.0, 37.7]]) : 0; P.gaze = lookAt(yh, [760, 700]);
    if (t < 37.12) { P.handR = [12, -140]; P.handL = [8, -138]; } else { P.handRW = [690, 700]; P.handR = null; P.handL = PERSON_HANDS.folded.L; } }
  return P;
}
const ypMothPos = (t) => { const u = K.clamp((t - 26.32) / 1.4); return [K.lerp(545, 330, u) + 18 * Math.sin(u * 14), K.lerp(720, 470, u) + 14 * Math.sin(u * 23)]; };

function ypSceneArrival(ctx, t, F) {
  const door = t < 37.3 ? 0 : 0.8 * settleTo(t, 37.3, 0, 1, 0.4, 0.15);
  ypStreet(ctx, t, { door, light: t >= 37.3 ? ypE(t, 37.3, 0.4) : 0 });
  if (door > 0) ypDoorGlow(ctx, 1, door);
  ypGlint(ctx, 270, 334, 46, (t - 3.86) / 0.9);
  // servants popping out of the doorway (clipped to the opening)
  if (ypIn(t, 37.5, 38.5)) { const D = YP_HOUSE.door; ctx.save(); K.poly(ctx, townArchPts(D.x0, D.x1, D.top, D.bottom, 'pointed'), true); ctx.clip();
    [[ypServA, 728, 0], [ypServB, 782, 0.07]].forEach(([mk, x, dl]) => { const t0 = 37.56 + dl, k = ypE(t, t0, 0.15, 'back'); if (t < t0) return;
      const P = mk({ x, y: D.bottom + 4, s: 0.95, sq: K.lerp(0.6, 1, k), tip: 0.3 * ypEnv(t, t0 + 0.15, t0 + 0.6, 0.12), alpha: 1 - ypE(t, 38.1 + dl, 0.3), gaze: [-1, 0.2], handR: PERSON_HANDS.chest.R }); person(ctx, P); });
    ctx.restore(); }
  const G = ypGuestStreet(t);
  // the horse (with Yahya until 12.5, then led away empty)
  let rider = null;
  if (t < 12.5) {
    const H = { ...walk(YP_HX, t, { stride: GAIT.horse * 0.8 }), y: YP_GR, s: 0.8, pal: 0, dir: 1, gaze: [1, 0.1] };
    H.earL = 1 - 1.8 * pulse(t, 3.86, 0.7); H.snort = pulse(t, 7.5, 0.8); H.tailSwish = (t > 7.4 ? 0.8 : 0.3) * Math.sin(t * 2.4); H.neck = 0.4 * pulse(t, 7.2, 0.7);
    if (t > 9.9) H.gaze = [1, 0.5];
    const R = ypYahya({ s: 0.95, lurch: lurch(t, 7.4), gaze: [1, 0.1], mouth: 'smile', lid: undefined });
    if (t >= 9.72) { R.gaze = lookAt([YP_HX(t) + 40, 560], [YP_GX, 760]); R.brow = -0.4; R.tilt = 0.1 * ypE(t, 9.72, 0.3); R.mouth = 'closed'; }
    rider = rideOn(ctx, 'horse', H, R);
    // the servant jogging behind with a rolled document
    const SX = (tt) => YP_HX(tt) - 230, S = ypServA({ ...ypWalk(SX, t, 1.05), mouth: 'o', gaze: [1, -0.2] }); S.handR = [44, -110]; person(ctx, S);
    const hp = ypPt(S, 44, -112); seg(ctx, hp[0] - 4, hp[1] - 22, hp[0] + 4, hp[1] + 18, 12, C.white, 3);
  } else if (t < 14.7) {
    const hx = YP_HX2(t), H = { ...walk(YP_HX2, t, { stride: GAIT.horse * 0.8 }), y: YP_GR, s: 0.8, pal: 0, dir: -1, tailSwish: 0.5 * Math.sin(t * 3) };
    horse(ctx, H); const S = ypServA({ ...ypWalk((tt) => YP_HX2(tt) - 150, t, 1.05), dir: -1, handLW: [hx - 100, 700] }); person(ctx, S);
  }
  if (t >= 12.5) person(ctx, ypYahStreet(t));
  person(ctx, G);
  // his flat purse on the sash, later the empty purse turned inside out
  if (t < 25.62) ypOnBody(ctx, G, (c) => ypPurse(c, 22, -70, 0.9, { fill: 0 }));
  else if (t < 28.2) { const k = ypE(t, 25.62, 0.3); if (k < 1) ypOnBody(ctx, G, (c) => ypPurse(c, 22, -70, 0.9, { fill: 0, alpha: 1 - k })); else ypPurse(ctx, 545, 704, 1.2, { inside: true }); }
  else ypOnBody(ctx, G, (c) => ypPurse(c, 22, -70, 0.9, { fill: 0 }));
  if (ypIn(t, 26.32, 27.72)) ypMoth(ctx, ...ypMothPos(t), t, 1.7);
  // dust from the hooves and the stop
  if (t < 7.9) for (const f of YP_HFALLS) dustBurst(ctx, f.x + 60, YP_GR - 4, t - f.t, 3, 5, 10, 22, 0.45, Math.round(f.t * 10));
  dustBurst(ctx, 400, YP_GR - 4, t - 7.4, 6, 8, 16, 40, 0.6, 74);
  if (ypIn(t, 13.9, 14.6)) for (const tt of [13.95, 14.2]) dustBurst(ctx, YP_GX - 20, 830, t - tt, 4, 4, 9, 30, 0.4, Math.round(tt * 10));
  F.heads.G = ypHead(G); F.heads.Y = t < 12.5 ? (rider ? [rider.x + 10, rider.y - 190 * 0.95] : null) : ypHead(ypYahStreet(t)); F.rider = rider;
}
const YP_HFALLS = footfalls(YP_HX, 0.42, 7.4, GAIT.horse * 0.8);

// ---------- S13: the night escape ----------
const YP_ESC_X = (t) => (t < 118.6 ? 770 : t < 118.76 ? kfn(t, [[118.6, 770], [118.76, 715]], 'out') : t < 120.6 ? ypSneak(715, 520, 118.76, 119.5, t, 3).x : kfn(t, [[120.6, 520], [125.22, 130], [127.24, -40]], 'inOut'));
function ypGuestEscape(t) {
  const x = YP_ESC_X(t), far = ypE(t, 125.22, 2.0), P = ypGuest({ x, y: x > 650 ? 872 : K.lerp(900, 872, K.clamp((x - 600) / 50)), dir: -1, mouth: 'closed', brow: -0.5, tip: 0.22, sq: 0.95 }, t);
  P.y -= 40 * far; P.s = K.lerp(1.2, 0.8, far);
  const sn = ypSneak(715, 520, 118.76, 119.5, t, 3);
  if (ypIn(t, 118.76, 119.5)) { P.ph = sn.ph; P.amp = sn.amp; P.y -= sn.bob; P.drop = 8; P.gaze = lookAt([x, 650], [590, 760]); }
  else if (t >= 120.6) Object.assign(P, walk(YP_ESC_X, t, { stride: 26 * P.s * 0.8 }), { x });
  if (ypIn(t, 119.1, 119.24)) { P.ph = sn.ph; P.amp = 0.4; }   // frozen mid-step at the snore
  const tf = turnFlip(t, [[0, -1], [119.42, 1], [120.08, -1]], 0.35); P.dir = tf.dir; P.drop = (P.drop || 0) + 6 * tf.tuck;
  if (ypIn(t, 119.5, 120.1)) { P.gaze = lookAt([x, 650], [750, 680]); P.handR = ypL2(ypRest.R, [62, -170], Math.sin(Math.PI * K.clamp((t - 119.58) / 0.45))); P.tip = 0.1; P.brow = -0.7; P.wet = true; }
  else { P.handR = [56, -64]; P.handL = [-30, -186]; }
  if (ypIn(t, 118.22, 118.62)) { P.tip = 0.22 + 0.12 * Math.abs(Math.sin((t - 118.22) * 16)); }
  if (t >= 120.6) { P.gaze = [-1, 0.1]; P.mouth = t > 121.6 ? 'smile' : 'closed'; P.brow = 0; }
  if (ypIn(t, 123.58, 124.7)) { P.lid = 1; P.mouth = 'smile'; P.handL = ypL2([-30, -186], [-44, -150], Math.abs(Math.sin((t - 123.58) * 6))); }
  return P;
}
// sack on his back: drawn before him, behind the shoulder on the trailing side
function ypBackSack(ctx, P, t, o = {}) { const k = (P.s || 1.2) / 1.2, q = ypPt(P, -44, -120), sg = Math.sign(P.dir || 1); ypSack(ctx, q[0], q[1] + 95 * k, 1.1 * k * (o.scale || 1), { rot: -sg * (0.2 + (P.tip || 0) * 0.5), sq: o.sq ?? 1 }); }
function ypSceneEscape(ctx, t, F) {
  const door = t < 117.28 ? 0 : t < 118.22 ? 0.25 * ypE(t, 117.28, 0.35) : t < 126.5 ? K.lerp(0.25, 0.6, ypE(t, 118.3, 0.4)) : K.lerp(0.6, 1, ypE(t, 126.5, 0.7));
  ypStreet(ctx, t, { palette: 'cold', u: 0.75, door, light: door * (t > 126.5 ? 1 : 0.6) });
  ypDoorGlow(ctx, t > 126.5 ? 1 : 0.8, door);
  const D = YP_HOUSE.door, gap = D.x0 + (D.x1 - D.x0) * (1 - door);
  if (ypIn(t, 117.45, 118.22)) for (const dx of [-8, 10]) { const lk = Math.sin((t - 117.45) * 5); shape(ctx, ell(gap + 14 + dx, 704, 8, 10, 12), C.white, { lw: 3, seed: 901 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(gap + 14 + dx + 3 * lk, 706, 3.5, 0, 7); ctx.fill(); }
  // the dozing servant left of the steps
  const Z = ypServA({ x: 590, sit: 1, seat: 'floor', lid: 1, mouth: 'o', drop: 6 + 7 * pulse(t, 119.1, 0.5), tilt: -0.15, handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, sq: breathe(t, 2, 0.03) }); person(ctx, Z);
  zzz(ctx, 620, 650, t);
  if (t >= 118.22) { const G = ypGuestEscape(t); const stuck = ypIn(t, 118.22, 118.62);
    ypBackSack(ctx, G, t, { sq: stuck ? 0.82 : 1 + 0.08 * pulse(t, 118.62, 0.25) + 0.06 * (pulse(t, 123.6, 0.2) + pulse(t, 123.85, 0.2)) });
    person(ctx, G); const h = ypPt(G, 56, -64); packLoad(ctx, ['bindle'], h[0], h[1] + 40 * G.s / 1.2, 0.45 * G.s / 1.2);
    if (t > 120.6 && t < 125.4) for (const f of YP_EFALLS) dustBurst(ctx, f.x, YP_GR - 4, t - f.t, 3, 3, 7, 16, 0.35, Math.round(f.t * 10));
    F.heads.G = ypHead(G);
  }
  ypNight(ctx, 0.75, [[750, 760, 230 + 60 * door]]);
  if (F.heads.G) {
    // padlocked-sack thought, above and ahead of him
    const p = ypEnv(t, 122.84, 124.64, 0.25); if (p > 0) { const hh = F.heads.G; thoughtCloud(ctx, hh[0] + 90, hh[1] - 200, 220, 170, t, { p: K.clamp(p * 1.5), tail: [hh[0] - 20, hh[1] - 50], scale: 0.42, at: [0, -60], inside: (c) => { ypSack(c, 0, 80, 1); ypPadlock(c, 0, -60, 1.4); } }); }
  }
}
const YP_EFALLS = footfalls(YP_ESC_X, 120.6, 125.2, 22);

// ---------- S17: dawn, the far figure, the open door ----------
function ypSceneDawn(ctx, t, F) {
  const u = kfn(t, [[161.06, 0.02], [175.77, 0.08]], 'lin');
  const br = 0.85 + 0.15 * Math.sin(t * 1.7);
  ypStreet(ctx, t, { u, door: 1, light: br });
  ypDoorGlow(ctx, 0.9 + 0.1 * Math.sin(t * 1.7), 1);
  // doves cross the sky
  [[0, 300], [0.35, 345]].forEach(([dl, y], i) => { const k = (t - 162.54 - dl) / 3.4; if (k < 0 || k > 1) return; bird(ctx, { kind: 'dove', pal: 0, x: K.lerp(-60, 1060, k), y: y - 30 * Math.sin(Math.PI * k), s: 0.4, dir: 1, fly: true, flap: Math.sin(t * 13 + i * 2) }); });
  // the tiny figure far down the street with his sack, going out of sight
  if (ypIn(t, 161.06, 166.4)) { const fx = (tt) => kfn(tt, [[161.06, 230], [166.3, -40]], 'lin'), x = fx(t);
    const P = ypGuest({ ...walk(fx, t, { stride: 26 * 0.35 }), y: 880, s: 0.35, dir: -1, tip: 0.25, handL: [-30, -186], handR: [56, -64] }, t); if (ypIn(t, 164.9, 165.4)) P.gaze = [1, 0];
    ypBackSack(ctx, P, t); person(ctx, P); const q = ypPt(P, -38, -150); ypGlint(ctx, q[0], q[1] - 20, 22, (t - 165.58) / 0.6); }
  // Yahya comes into the doorway; a servant sets a fresh tray on the top step
  const D = YP_HOUSE.door, ya = ypE(t, 167.6, 0.9);
  if (ya > 0) { const P = ypYahya({ x: 752, y: K.lerp(862, 872, ya), alpha: ya, dir: -1, mouth: 'smile', lid: 0.2, gaze: [-1, 0.05], handR: t > 168.5 ? PERSON_HANDS.chest.R : PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L });
    P.lid = Math.max(0.2, pulse(t, 171.18, 0.7)); P.drop = 6 * pulse(t, 171.3, 0.8); P.tilt = -0.04;
    ctx.save(); K.poly(ctx, townArchPts(D.x0 - 30, D.x1 + 30, D.top - 60, D.bottom + 30, 'pointed'), true); ctx.clip(); person(ctx, P); ctx.restore(); F.heads.Y = ypHead(P); }
  const bend = ypEnv(t, 168.6, 169.7, 0.25);
  if (t > 167.9) { const S = ypServA({ ...ypWalk((tt) => kfn(tt, [[167.9, 1060], [168.6, 900], [169.9, 900], [171.0, 1090]], 'inOut'), t, 1.05), y: 872, dir: -1, tip: 0.35 * bend, handRW: ypIn(t, 168.75, 169.6) ? [862, 858] : null, handR: ypIn(t, 168.75, 169.6) ? null : [70, -110], gaze: [-1, 0.6] }); if (t > 169.6) S.dir = 1; person(ctx, S);
    const hp = t > 168.75 ? [862, 868] : ypPt(S, 70, -104); ypTray(ctx, hp[0], hp[1], 0.6, { noCover: true, t }); }
}
