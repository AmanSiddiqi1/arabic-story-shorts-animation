// ===== AN-104 the mansion court (S3-S6, 20.44-83.3): guests, servant, lord, the four dogs, the stranger, the gold dish =====
const A104_DAIS = [600, 900, 860];
const A104_DOGS = [{ x: 430, y: 935, s: 0.9, pal: 1, seed: 81, chew: 5.2, wag: 2.2 }, { x: 580, y: 888, s: 0.78, pal: 0, seed: 82, chew: 6.4, wag: 3.1 },
  { x: 730, y: 935, s: 0.9, pal: 2, seed: 83, chew: 5.8, wag: 2.6 }, { x: 870, y: 888, s: 0.78, pal: 3, seed: 84, chew: 7.0, wag: 3.5 }];
const A104_FILLT = [44.5, 44.0, 43.5, 43.0];          // ladle times per dog (dog1..dog4)
const A104_EATT = [44.9, 44.35, 43.85, 43.3];         // each starts eating (dog1 last)
const a104DishX0 = (i) => A104_DOGS[i].x - A104_DOGS[i].s * 160;

// ---------- dog1's dish: position and fill ----------
function a104Dish1(t) {
  let x = kfn(t, [[72.38, a104DishX0(0)], [72.85, a104DishX0(0) - 45], [73.44, a104DishX0(0) - 45], [73.9, a104DishX0(0) - 90]], 'out'), y = 943, tilt = 0;
  x += 2 * Math.sin((t - 72.85) * 30) * Math.exp(-(t - 72.85) * 8) * (t > 72.85 ? 1 : 0) + 3 * Math.sin((t - 73.9) * 30) * Math.exp(-(t - 73.9) * 8) * (t > 73.9 ? 1 : 0);
  // lifted to his chest 80.28-82.1
  if (t >= 80.6) { const ch = a104Pt(a104Mk('poor', { x: 175, y: 935, dir: 1, kneel: 1 }), 0, -70), k = a104E(t, 80.9, 1.1); x = K.lerp(x, ch[0], k); y = K.lerp(y, ch[1], k); tilt = -0.15 * k; }
  // fill: dog1's slow meal, then the man's three scoops
  let fill = K.clamp((t - A104_FILLT[0]) / 0.3); if (t > 44.9) fill -= 0.15 * K.clamp((t - 44.9) / 4.4);
  if (t > 66.8) fill = K.lerp(fill, 0.62, a104E(t, 66.8, 0.35)); if (t > 67.4) fill = K.lerp(fill, 0.3, a104E(t, 67.4, 0.3)); if (t > 67.85) fill = K.lerp(fill, 0, a104E(t, 67.85, 0.3));
  return { x, y, tilt, fill };
}

// ---------- the stranger in the court ----------
const a104SX3 = (t) => (t < 23.4 ? a104GuestX(2, t) - 75 : t < 24.7 ? a104GuestX(2, 23.4) - 75 + (t > 23.6 ? 20 * a104E(t, 23.6, 1.1) : 0) : kfn(t, [[24.7, a104GuestX(2, 23.4) - 55], [26.05, 140]]));
function a104StrangerCourt(t) {
  const P = a104Mk('poor', { y: 905, dir: 1, mouth: 'frown', brow: -0.5, lid: 0.3 });
  const T = t;
  if (t < 26.1) {   // the sneak and the walk to the corner
    P.x = a104SX3(t); a104Walk(P, a104SX3, t, 0.9); P.y = t < 24.7 ? 905 : K.lerp(905, 935, a104E(t, 24.7, 1.35));
    P.sq = t < 24.7 ? 0.92 : K.lerp(0.92, 1, a104E(t, 24.7, 0.4)); P.tip = 0.06;
    P.gaze = gazePlan(t, [[0, [0.9, -0.3]], [22.0, [0.9, -0.2]], [22.3, [-0.2, -0.1]], [22.6, [0.95, -0.35]], [22.9, [0.2, -0.2]], [23.4, [0.0, -0.95]], [23.9, [0.95, -0.2]], [24.7, [-0.9, 0.3]]], 0.07);
    P.eyes = t >= 23.4 && t < 23.62 ? 'wide' : undefined; P.lid = t >= 23.4 && t < 23.62 ? null : 0.1;
    if (t >= 23.4 && t < 23.62) { P.amp = 0; P.mouth = 'o'; }
    if (t >= 24.7) { P.lid = Math.max(0.2, pulse(t, 24.75, 0.45)); P.mouth = 'smile'; P.drop = 4 * a104E(t, 24.7, 0.4); P.sq = K.lerp(P.sq, 0.98, 0.5); }
    return a104Lid(P, t);
  }
  P.x = 140; P.y = 935; P.seat = 'floor'; P.sit = settleTo(t, 26.14, 0, 1, 0.5, 0.1); P.sq = 0.95 * breathe(t, 3);
  P.gaze = [0.6, 0.2];
  if (t < 29.5) { P.handL = [-22, -86]; P.handR = [22, -86];
    if (t >= 28.38) { P.handR = [12, -96]; P.gaze = gazePlan(t, [[0, [0.3, 0.4]], [28.6, [0.95, -0.1]]], 0.6); P.x += tremble(t, 1.2) * a104Env(t, 28.5, 29.2); } }
  else if (t < 41.68) { // the dogs
    P.lid = 0; P.brow = -0.8; P.mouth = 'o';
    const dogH = (i) => [A104_DOGS[i].x - 80, A104_DOGS[i].y - 150];
    P.gaze = lookAt(a104Head(P), gazePlan(t, [[0, [300, 800]], [29.6, dogH(0)], [30.3, dogH(1)], [30.5, dogH(2)], [30.7, dogH(3)], [31.4, dogH(0)], [32.45, dogH(0)], [32.75, dogH(1)], [33.0, dogH(2)], [33.25, dogH(3)], [33.7, dogH(0)], [35.0, [700, 840]], [37.4, [900, 860]], [38.3, [a104DishX0(0), 900]], [40.5, [140, 860]]], 0.12));
    P.handL = [-22, -86]; P.handR = [22, -86];
    if (t >= 40.2) { const k = a104Env(t, 40.45, 41.68, 0.3); P.handL = a104L2(P.handL, PERSON_HANDS.palmsUp.L.map((v) => v * 0.7), k); P.handR = a104L2(P.handR, PERSON_HANDS.palmsUp.R.map((v) => v * 0.7), k); P.mouth = 'frown'; P.lid = 0.3 + 0.7 * pulse(t, 40.9, 0.3); }
  } else if (t < 62.0) { // fed dogs, the long look, the invitation
    P.handL = [-22, -86]; P.handR = [22, -86]; P.mouth = 'closed'; P.lid = 0.15; P.brow = -0.5;
    const D1 = a104DogP(0, t), dh = a104DogHead(D1), dish = [a104DishX0(0), 905];
    P.gaze = lookAt(a104Head(P), t < 45.84 ? [700, 860] : t < 50.4 ? dish : dh);
    if (t >= 45.84 && t < 47.2) { P.tip = 0.1 * a104Env(t, 45.84, 47.3, 0.4); P.wet = true; P.drop = 4 * pulse(t, 46.6, 0.3); P.mouth = 'o'; }
    if (t >= 47.2 && t < 49.5) { const k = a104Env(t, 47.2, 49.5, 0.2); P.handL = a104L2(P.handL, [-14, -100], k); P.handR = a104L2(P.handR, [18, -100], k); P.x += tremble(t, 1.5) * a104Env(t, 47.25, 48.4); P.brow = -0.8; P.lid = t < 47.55 ? 1 : 0.2; P.mouth = 'frown'; }
    if (t >= 50.9 && t < 52.04) { P.gaze = t < 51.4 ? [0.2, 0.95] : P.gaze; P.sq = 0.95; }
    if (t >= 52.04 && t < 54.3) { P.lid = Math.max(0.15, pulse(t, 53.5, 0.3)); P.sq = breathe(t, 3, 0.015) * 0.97; P.wet = true; }
    if (t >= 54.3 && t < 58.8) { P.brow = -0.7; P.mouth = 'o'; P.gaze = lookAt(a104Head(P), t < 55.5 ? dh : t < 57.0 ? dish : dh); }
    if (t >= 58.8) { const k = a104Env(t, 58.8, 61.6, 0.25); P.handR = a104L2(P.handR, PERSON_HANDS.chest.R, k); P.brow = -0.9; P.mouth = 'o';
      P.gaze = gazePlan(t, [[0, lookAt(a104Head(P), dh)], [59.4, [0.95, -0.25]], [59.9, [0.6, -0.8]], [60.5, lookAt(a104Head(P), dh)]], 0.07); P.look = 0.3 * Math.sin((t - 59.4) * 6) * a104Env(t, 59.4, 60.5); }
  } else {             // S6: hesitation, the meal, the dish
    P.handL = [-22, -86]; P.handR = [22, -86]; P.mouth = 'closed'; P.lid = 0.15; P.brow = -0.6;
    const D1 = a104DogP(0, t), dh = a104DogHead(D1), d = a104Dish1(t), dishP = [d.x, d.y - 30];
    P.gaze = lookAt(a104Head(P), gazePlan(t, [[0, dh], [62.3, dishP], [62.7, dh], [63.0, dishP]], 0.08));
    if (t < 63.42) { P.sit = 1 - 0.5 * pulse(t, 62.1, 1.2); P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
    else if (t < 65.46) { P.gaze = gazePlan(t, [[0, [-0.95, -0.2]], [63.9, [0.95, -0.25]], [64.4, lookAt(a104Head(P), dh)]], 0.07); P.look = gazePlan(t, [[0, [-0.4, 0]], [63.9, [0.4, 0]], [64.4, [0, 0]]], 0.12)[0]; P.handR = PERSON_HANDS.hush.R; }
    // crawl to the dish (sit -> kneel), eat, sit back on his heels
    const kx = kfn(t, [[65.46, 140], [66.6, 228], [68.3, 228], [69.5, 175]]);
    if (t >= 65.46) { P.x = kx; P.sit = 1 - a104E(t, 65.46, 0.5); P.kneel = a104E(t, 65.6, 0.6); P.seat = undefined; P.tip = 0.12 * a104Env(t, 65.46, 66.7, 0.3); P.y = 935 + 4 * Math.abs(Math.sin((t - 65.46) * 9)) * a104Env(t, 65.5, 66.6, 0.1); if (t > 66.6) P.kneel = settleTo(t, 66.6, 1, 1, 0.3, 0.05); }
    if (t >= 66.7 && t < 68.3) { const scoops = [66.8, 67.42, 67.88], mouthP = a104Pt(P, 4, a104HdY(P) + 26);
      let hand = [d.x - 10, d.y - 40]; for (const s0 of scoops) { const u = (t - s0) / (s0 === 66.8 ? 0.55 : 0.4); if (u >= 0 && u < 1) hand = a104L2([d.x - 10, d.y - 40], mouthP, Math.sin(Math.PI * u)); }
      P.handRW = hand; P.handL = [-10, -96]; P.gaze = lookAt(a104Head(P), dishP); P.lid = t > 67.3 && t < 67.8 ? 1 : 0.2; P.wet = true; P.mouth = t > 67.0 ? 'o' : 'closed'; P.tip = 0.08; }
    if (t >= 68.26 && t < 70.8) { P.mouth = 'smile'; P.lid = 0.55; P.brow = -0.2; P.handR = [10 + 4 * Math.sin(t * 9) * a104Env(t, 68.6, 69.6), -96]; P.handL = [-18, -90]; P.wet = true; P.sq = 1 + 0.03 * pulse(t, 68.3, 1.2); }
    if (t >= 69.76 && t < 72.3) { P.gaze = lookAt(a104Head(P), dh); P.mouth = 'smile'; if (t >= 70.82) { P.drop = 9 * pulse(t, 70.85, 0.6); P.lid = Math.max(0.3, pulse(t, 70.9, 0.4)); } }
    if (t >= 72.3 && t < 75.6) { P.gaze = lookAt(a104Head(P), t < 74.6 ? dishP : dh); P.brow = -0.8; P.mouth = 'o'; P.sq = t > 73.9 ? K.lerp(0.93, 1, a104E(t, 73.9, 0.35)) : 1; P.handL = [-30, -110]; P.handR = [30, -110]; if (t > 73.9) P.eyes = t < 74.4 ? 'wide' : undefined; }
    if (t >= 75.6 && t < 78.18) { P.gaze = lookAt(a104Head(P), gazePlan(t, [[0, dh], [76.6, [480, 560]], [77.42, dh]], 0.2)); P.brow = -0.7; P.mouth = 'o'; }
    if (t >= 78.18 && t < 80.28) { const k1 = a104Env(t, 78.18, 78.9, 0.15), k2 = a104Env(t, 78.85, 79.6, 0.15); P.handR = a104Tr(t, [[78.18, 78.9, PERSON_HANDS.pointDown.R, 0.15], [78.85, 79.6, PERSON_HANDS.chest.R, 0.15]], [22, -86]); P.brow = -0.9; P.look = 0.35 * Math.sin((t - 79.0) * 14) * a104Env(t, 79.0, 79.8, 0.1); P.gaze = lookAt(a104Head(P), t < 79.4 ? dishP : dh); P.mouth = 'frown'; }
    if (t >= 80.28) { const k = a104E(t, 80.28, 0.6); const L = [d.x - 48, d.y - 26], R = [d.x + 48, d.y - 26]; P.handLW = L; P.handRW = R; P.wet = true; P.lid = Math.max(0.3, pulse(t, 81.2, 0.5)); P.mouth = 'frown'; P.brow = -0.6;
      P.gaze = lookAt(a104Head(P), t < 81.5 ? dishP : dh); P.x += tremble(t, 0.8) * a104Env(t, 80.5, 82.0); if (t >= 82.14) { P.drop = 14 * a104E(t, 82.14, 0.5); P.gaze = [0.1, 0.9]; P.lid = 0.6; P.mouth = 'smile'; } }
  }
  if (T >= 26.14 && P.kneel == null && P.sit == null) P.sit = 1;
  return a104Lid(P, t);
}

// ---------- guests, servant, lord ----------
const A104_GUEST_PATH = [[[20.44, 110], [22.5, 640]], [[20.75, 110], [23.7, 860]], [[21.3, 110], [25.6, 720]]];
const A104_GUEST_SIT = [23.0, 24.2, 26.1];
const a104GuestX = (i, t) => kfn(t, A104_GUEST_PATH[i], 'lin');
function a104Guest(i, t) {
  const name = ['guestA', 'guestB', 'guestC'][i], xf = (tt) => a104GuestX(i, tt), P = a104Mk(name, { y: 905, dir: 1 });
  a104Walk(P, xf, t, i === 2 ? 0.7 : 1, 22); const x = P.x;
  P.y = x > A104_DAIS[0] - 30 ? K.lerp(905, 862, K.clamp((x - A104_DAIS[0] + 30) / 40)) : 905;
  if (t >= A104_GUEST_SIT[i] - 0.4) { P.sit = settleTo(t, A104_GUEST_SIT[i] - 0.4, 0, 1, 0.5, 0.08); P.seat = 'floor'; P.amp = 0; P.y = 862; }
  const lordH = [790, 760];
  P.gaze = lookAt([x, P.y - 120], i === 0 ? lordH : [x + 100, 770]);
  if (i === 0 && t < 22.4) P.handR = a104Tr(t, [[21.0, 22.0, PERSON_HANDS.wave.R]], null);
  if (t > 26) { const ph = (t * 0.37 + i * 0.33) % 1; P.talk = ph < 0.3 ? 0.6 : 0; P.gaze = lookAt([x, P.y - 110], i === 1 ? [640, 770] : lordH); if (i === 1) P.mouth = ph > 0.8 ? 'open' : undefined; }
  return P;
}
function a104Servant(t) {   // servantA: bows at the door (S3), ladles the food with servantB (S5)
  if (t < 41.68) {
    const P = a104Mk('servantA', { x: 300, y: 905, dir: 1, handR: PERSON_HANDS.chest.R, mouth: 'smile' });
    const bows = [21.0, 21.6, 22.45]; let b = 0; for (const b0 of bows) b = Math.max(b, pulse(b0 === 22.45 ? t : t, b0, b0 === 22.45 ? 0.95 : 0.6));
    P.drop = 26 * b; P.sq = 1 - 0.06 * b; P.lid = b > 0.5 ? 1 : 0.2; P.gaze = lookAt([300, 720], [a104GuestX(0, t), 760]);
    if (t >= 23.3 && t < 24.9) { P.drop = 0; P.lid = 0; P.gaze = gazePlan(t, [[0, [-0.6, -0.8]], [24.2, [0.9, -0.2]]], 0.25); P.look = -0.3 * a104Env(t, 23.4, 24.2); P.mouth = 'closed'; }
    if (t >= 24.6) { const xf = (tt) => kfn(tt, [[24.6, 300], [27.0, 560], [41.0, 560]]); a104Walk(P, xf, t, 1, 24); P.gaze = [0.9, -0.2]; P.handR = null; if (t > 27) P.alpha = 1 - K.clamp((t - 27) / 0.5); }
    return a104Lid(P, t);
  }
  return null;
}
// S5: the two servants with the pot and ladle
const a104ServX = (t) => kfn(t, [[41.68, 1080], [42.9, A104_DOGS[3].x - 125 + 60], [43.15, A104_DOGS[3].x - 125 + 60], [43.4, A104_DOGS[2].x - 144 + 60], [43.65, A104_DOGS[2].x - 144 + 60], [43.9, A104_DOGS[1].x - 125 + 60], [44.15, A104_DOGS[1].x - 125 + 60], [44.4, a104DishX0(0) + 60], [44.7, a104DishX0(0) + 60], [48.2, 1100]]);
function a104Servers(ctx, t) {
  if (t < 41.68 || t > 48.2) return;
  const A = a104Mk('servantA', { y: 912, dir: -1, lid: 0.5, mouth: 'closed' }), B = a104Mk('servantB', { y: 900, dir: -1, lid: 0.5, mouth: 'closed' });
  a104Walk(A, a104ServX, t, 1, 24); const bx = (tt) => a104ServX(tt) + 95; a104Walk(B, bx, t, 1, 24);
  const back = t > 44.7; if (back) { A.dir = 1; B.dir = 1; }
  A.gaze = [back ? 0.9 : -0.6, 0.6]; B.gaze = [back ? 0.9 : -0.8, 0.3]; a104Lid(A, t); a104Lid(B, t);
  const potC = [B.x - 20, B.y - 104]; B.handLW = [potC[0] - 40, potC[1] - 30]; B.handRW = [potC[0] + 40, potC[1] - 30];
  let tip = 0; for (const f of A104_FILLT) tip = Math.max(tip, pulse(t, f - 0.15, 0.4)); const hand = [A.x - 34, A.y - 120 + 20 * tip]; A.handRW = hand;
  person(ctx, B); a104Pot(ctx, potC[0], potC[1], 0.8); person(ctx, A); if (!back) a104Ladle(ctx, hand, 0.6 + 0.8 * tip);
}
function a104Lord(t) {
  const P = a104Mk('lord', { x: 795, y: 862, dir: 1, sit: 1, seat: 'floor', mouth: 'smile' });
  P.gaze = lookAt([795, 750], t < 26 ? [a104GuestX(Math.min(2, Math.floor((t - 20.44) / 1.6)), t), 770] : [680, 770]);
  if (t < 23.0) { P.handR = a104Tr(t, [[21.0, 22.6, PERSON_HANDS.wave.R]], null); }
  if (t > 26) { const ph = (t * 0.37 + 0.66) % 1; P.talk = ph > 0.55 && ph < 0.8 ? 0.6 : 0; P.handR = ph > 0.5 && ph < 0.85 ? PERSON_HANDS.palmsUp.R : null; }
  return P;
}

// ---------- the four dogs ----------
function a104DogP(i, t) {
  const D = A104_DOGS[i], P = { x: D.x, y: D.y, s: D.s, dir: -1, pal: D.pal, seed: D.seed, collar: 'gold', lid: 0.3, ears: 0, tailWag: t * D.wag + i, wagAmp: 0.25, tailUp: 0.4 };
  const st = stagger(i, 0.11);
  // S3: resting (lying, half asleep); S4: counted, sit up tall; S5: eat
  P.lie = 1 - a104E(t, 31.36 + st, 0.35); P.sit = t < 31.36 + st ? 0 : 1; if (t >= 31.36 + st) P.sit = settleTo(t, 31.36 + st, 0, 1, 0.4, 0.06);
  P.lid = t < 30.0 ? 0.65 : 0.3; P.gaze = [-0.9, 0.2];
  const cnt = 30.1 + i * 0.2; if (t >= cnt && t < cnt + 0.7) { if (i === 0) P.earFlick = pulse(t, cnt, 0.4) * 2; if (i === 1) P.drop = -14 * pulse(t, cnt, 0.6); if (i === 2) P.mouth = t < cnt + 0.5 ? 'open' : undefined; if (i === 3) P.tailWag = 1.6 * pulse(t, cnt, 0.5) * 3; P.lid = 0.1; }
  if (t >= 31.36 + st) { P.sq = K.lerp(1, 1.05, a104Env(t, 31.36 + st, 33.0, 0.3)); P.ears = 0.6; P.lid = 0.3; }
  if (i === 2 && t >= 35.0 && t < 37.2) P.headTilt = 0.25 * Math.sin((t - 35.0) * 16) * a104Env(t, 35.0, 36.4, 0.15);
  if (i === 0 && t >= 38.26 && t < 39.8) P.headDown = 0.35 * pulse(t, 38.4, 1.2);
  if (i === 0 && t >= 40.2) { P.earFlick = pulse(t, 40.3, 0.5); P.gaze = lookAt(a104DogHead(P), [140, 800]); }
  // eat
  const e0 = A104_EATT[i];
  if (t >= e0 - 0.4) { P.sit = 1 - a104E(t, e0 - 0.4, 0.4); P.headDown = a104E(t, e0, 0.35) * (i === 0 ? 1 : 1); P.chew = (t - e0) * D.chew; P.lid = 0.4; P.gaze = [-0.4, 0.8]; P.wagAmp = 0.35; }
  if (i === 2 && t >= 69.9 && t < 71.6) { P.headDown = 1 - pulse(t, 69.9, 1.6); P.gaze = lookAt(a104DogHead(P), [180, 820]); P.lid = 0.2; }
  if (i !== 0) return P;
  // dog1 from the moment it notices him
  const man = [140, 790];
  if (t >= 49.3) { P.chew = t < 49.5 ? P.chew : undefined; P.earFlick = pulse(t, 49.3, 0.5) * 2; P.headDown = 1 - a104E(t, 49.55, 0.45); P.gaze = lookAt(a104DogHead(P), man); P.lid = 0.25; P.wagAmp = 0.05; }
  if (t >= 50.32) { P.headTilt = 0.25 * a104E(t, 50.32, 0.4) * (1 - a104E(t, 52.0, 0.4)); P.brow = -0.4; }
  if (t >= 52.04 && t < 54.3) { P.lid = Math.max(0.25, pulse(t, 53.0, 0.35)); P.sq = breathe(t, 5, 0.015); P.tailWag = 0; P.wagAmp = 0;
    if (t >= 53.18) P.gaze = lookAt(a104DogHead(P), gazePlan(t, [[0, man], [53.3, [a104DishX0(0), 920]], [53.9, man]], 0.2)); }
  const dx = kfn(t, [[54.5, 430], [55.6, 520], [71.4, 520], [72.25, 430], [72.5, 430], [72.95, 385], [73.5, 385], [73.95, 340]]);
  if (t >= 54.3) { const xf = (tt) => kfn(tt, [[54.5, 430], [55.6, 520], [71.4, 520], [72.25, 430], [72.5, 430], [72.95, 385], [73.5, 385], [73.95, 340]]); const w = walk(xf, t, { stride: A104_DOG_STRIDE * D.s }); P.x = dx; P.ph = w.ph; P.amp = w.amp;
    P.headDown = 0.3 * pulse(t, 54.3, 0.4); P.headTilt = 0; P.brow = 0; P.gaze = lookAt(a104DogHead(P), man); P.sit = settleTo(t, 55.6, 0, 1, 0.45, 0.06); P.lid = 0.25; P.wagAmp = 0.2; P.tailWag = t * 1.6; }
  if (t >= 56.2 && t < 61.0) { P.headDown = 0.3 * (pulse(t, 56.98, 0.45) + pulse(t, 57.68, 0.45) + pulse(t, 60.5, 0.45)); P.raise = a104Env(t, 57.96, 58.9, 0.25); P.ears = 0.4; }
  if (t >= 61.0) { P.lie = a104E(t, 61.0, 0.8); P.sit = 1 - P.lie; P.tailWag = 1.4 * pulse(t, 61.9, 0.35) + 1.4 * pulse(t, 64.75, 0.5); P.wagAmp = 0.5; }
  if (t >= 69.76) { P.tongue = 0.6 * a104Env(t, 69.9, 71.3, 0.3); P.headTilt = 0.15 * a104Env(t, 69.9, 71.3); P.tailWag = t * 3; P.wagAmp = 0.35; }
  if (t >= 71.4) { P.lie = 1 - a104E(t, 71.4, 0.45); P.sit = 0; }
  // the two pushes and the paw on the rim
  const dsh = a104Dish1(t), rim = [dsh.x + 46, dsh.y - 30];
  if (t >= 71.9 && t < 75.6) { P.raise = Math.max(a104Env(t, 72.0, 72.9, 0.25), a104Env(t, 73.1, 73.95, 0.2), a104Env(t, 74.4, 75.6, 0.25)); P.pawW = rim; P.gaze = lookAt(a104DogHead(P), t < 74.3 ? [rim[0], rim[1]] : man); P.ears = 0.5; P.headDown = 0.25 * (pulse(t, 72.3, 0.5) + pulse(t, 73.35, 0.5)); P.tip = -0.03 * (pulse(t, 72.05, 0.4) + pulse(t, 73.1, 0.35)); }
  if (t >= 75.5) { P.sit = settleTo(t, 75.6, 0, 1, 0.4, 0.06); P.gaze = lookAt(a104DogHead(P), man); P.lid = 0.25; P.tailWag = t * 2; P.wagAmp = 0.3; }
  if (t >= 77.42 && t < 78.4) { P.headDown = 0.3 * pulse(t, 77.45, 0.45); P.ears = 0.7; }
  if (t >= 82.14) { P.lie = a104E(t, 82.14, 0.7); P.sit = 1 - P.lie; P.lid = 0.6; }
  return P;
}
// each dog's floor stake (the chain end): under its belly at the first mark
const a104Stake = (i) => [A104_DOGS[i].x - 18, A104_DOGS[i].y + 4];
function a104DrawDog(ctx, i, t) {
  const P = a104DogP(i, t), D = A104_DOGS[i], dish = i === 0 ? a104Dish1(t) : { x: a104DishX0(i), y: D.y + 8, fill: K.clamp((t - A104_FILLT[i]) / 0.3) * (1 - 0.5 * K.clamp((t - A104_EATT[i]) / 40)), tilt: 0 };
  const dishFill = dish.fill * (1 + 0.15 * pulse(t, A104_FILLT[i] + 0.3, 0.25));
  const glint = i === 0 && t >= 39.6 && t < 41.0 ? (t - 39.6) / 1.4 : i === 0 && t >= 73.9 && t < 74.6 ? (t - 73.9) / 0.7 : ((t * 0.25 + i * 0.37) % 3) / 0.9;
  const drawDish = () => { if (i === 0 && t >= 39.86 && t < 41.3) a104Rays(ctx, dish.x, dish.y - 30, 120, a104Env(t, 39.86, 41.3, 0.3) * (t < 40.4 ? 1 : 0.5), t);
    if (!(i === 0 && t >= 82.0)) a104Dish(ctx, dish.x, dish.y, { s: D.s * 0.9, fill: dishFill, steam: t, glint, tilt: dish.tilt }); };
  a104Dog(ctx, P); a104DogChain(ctx, i, P, t); if (i === 0) return drawDish; drawDish(); return dish;
}
function a104DogChain(ctx, i, P, t) {
  const r = a104DogRing(P), s = a104Stake(i), slack = Math.max(10, 70 - Math.abs(r[0] - s[0]) * 0.25);
  const sw = i === 2 ? swing(t, 35.0, 30, 2.4, 1.6) : 0, gl = t >= 36.2 && t < 37.4 ? (t - 36.2 - i * 0.12) / 0.8 : -1;
  a104Post(ctx, s[0], s[1], s[1] - 22); a104Chain(ctx, r, [s[0], s[1] - 30], { sag: slack, swing: sw, glint: gl, links: 10 });
}

// ---------- the court world ----------
function a104CourtWorld(ctx, t) {
  palaceHall(ctx, { variant: 'palace', wall: 'paper', throne: false, dais: A104_DAIS, cushions: [640, 720, 795, 870], t, lamps: [[380, 250], [900, 250]], light: 0.6 });
  // lord and guests on the dais (background)
  const lord = a104Lord(t); person(ctx, lord);
  const guests = [0, 1, 2].filter((i) => t >= A104_GUEST_PATH[i][0][0]).map((i) => a104Guest(i, t));
  const onDais = guests.filter((g) => g.y < 880), floor = guests.filter((g) => g.y >= 880);
  onDais.forEach((g) => person(ctx, g));
  // back-row dogs, servant, walking guests, front-row dogs, the stranger
  const out = { lord, dogs: [] };
  a104DrawDog(ctx, 3, t); a104DrawDog(ctx, 1, t);
  const sv = a104Servant(t); if (sv) person(ctx, sv);
  floor.forEach((g) => person(ctx, g));
  a104Servers(ctx, t);
  const S = t >= 21.55 ? a104StrangerCourt(t) : null;
  const behind = S && S.y < 930;   // while he sneaks he is behind the front row of dogs
  if (S && behind) { a104BackScrolls(ctx, S, t, 3); a104Person(ctx, S); }
  a104DrawDog(ctx, 2, t); const dish1 = a104DrawDog(ctx, 0, t); if (!S || behind) dish1();
  if (S && !behind) { a104BackScrolls(ctx, S, t, 3); a104Person(ctx, S); if (t < 80.6) dish1(); }
  if (t >= 80.6) { const d = a104Dish1(t); a104Dish(ctx, d.x, d.y, { s: 0.81, fill: 0, tilt: d.tilt, glint: ((t - 80.6) % 2) / 0.8 }); }
  if (t >= 82.14 && S) a104Glow(ctx, a104Head(S)[0], a104Head(S)[1] + 40, 120, a104Env(t, 82.3, 83.3, 0.3));
  out.S = S; out.D1 = a104DogP(0, t); out.dish = a104Dish1(t);
  return out;
}
