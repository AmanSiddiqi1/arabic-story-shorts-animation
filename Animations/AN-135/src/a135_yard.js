// ===== AN-135 the yard (S3, S4, S6-S16): one set, one timeline for every actor. Positions in world units, ground y 900. =====
// Marks: horse x 170 facing right (morning), x 200 facing left at the post (evening, see notes.md), king x 455, girl x 590, door 630..730.
const A135_COT = { x0: 600, x1: 960, top: 560, door: [630, 730, 640], win: [785, 905, 595, 700], chimney: [880, 915, 440] };
const A135_DOORX = 680, A135_KS = 1.05, A135_GS = 0.98, A135_HS = 0.85;
const A135_FIELD = [290, 530], A135_STALK = [612, 898, 600, 712];   // the wrung stalk leaning on the wall left of the door (base x, y, top x, y)
const a135Even = (t) => t >= 98.9 && t < 159.4;    // evening layout (horse at the post facing left)

// ---------- sky, door, window ----------
const a135U = (t) => (t < 95.86 ? 0.26 : t < 98.9 ? kfn(t, [[95.86, 0.26], [98.9, 0.46]], 'lin') : t < 159.4 ? kfn(t, [[98.9, 0.47], [107.9, 0.52], [139, 0.55]], 'lin') : 0.4);
function a135Door(t) {
  if (t < 98.9) return a135Tr(t, [[0, 0], [17.02, (tt) => 0.3 + 0.04 * Math.sin(Math.max(0, tt - 17.4) * 14) * Math.exp(-Math.max(0, tt - 17.4) * 6), 0.4], [21.88, (tt) => settleTo(tt, 21.88, 0.3, 1, 0.45, 0.1), 0.01], [96.3, 0, 0.4]]);
  return a135Tr(t, [[98.9, 0], [101.56, 1, 0.4, 'out']]);
}
const a135WinLit = (t) => (t < 98.9 ? 0 : t < 159.4 ? kfn(t, [[104.0, 0], [104.5, 1]]) : 0.9);

// ---------- the cane field: one state for every yard scene ----------
function a135CaneState(t) {
  const n = 7, lush = [], bend = [], droop = [];
  for (let i = 0; i < n; i++) { const ti = t - i * 0.22, tr = t - (n - 1 - i) * 0.16;
    let l = kfn(ti, [[96.5, 1], [97.6, 0.3]]); let b = 0;
    if (t >= 136.4) { l = kfn(ti, [[136.4, 0.3], [137.4, 0.15]]); b = kfn(ti, [[136.4, 0], [137.5, 0.45]]); }
    if (t >= 151.78) { l = settleTo(tr, 151.78, 0.15, 1, 0.6, 0.15); b = settleTo(tr, 151.78, 0.45, 0, 0.6, 0.3); }
    if (t >= 159.4) { l = 1; b = 0; }
    lush.push(l); bend.push(b); droop.push(0); }
  if (t >= 92.38 && t < 151.78) droop[6] = kfn(t, [[92.38, 0], [93.5, 0.5]]);
  if (t >= 151.78 && t < 159.4) droop[6] = settleTo(t, 151.78, 0.5, 0, 0.5, 0.3);
  const sway = t >= 14.4 && t < 15.6 ? 0.04 + 0.06 * pulse(t, 14.4, 1.2) : t >= 159.4 ? 0.06 : 0.035;
  return { lush, bend, droop, sway };
}

// ---------- the horse ----------
const A135_HX_AM = a135X([[13.3, -260], [14.5, 170], [95.5, 170], [97.7, 1180]]);
const A135_HX_PM = a135X([[98.9, 1180], [99.5, 1180], [101.3, 200], [155.9, 200], [156.4, 236], [158.0, 236]]);
function a135HorseP(t) {
  const ev = a135Even(t), s16 = t >= 159.4, xf = ev ? A135_HX_PM : A135_HX_AM;
  const P = { y: 900, s: A135_HS, pal: 0, seed: 5, dir: ev ? -1 : 1, ...(s16 ? { x: 150, ph: 0, amp: 0 } : walk(xf, t, { stride: GAIT.horse * A135_HS })) };
  if (!s16) { const v = Math.abs(speed(xf, t)); P.gallop = K.clamp((v - 260) / 400) * 0.6; }
  P.earL = 0.4; P.earR = 0.4; P.tailSwish = 0.3 * Math.sin(t * 1.7);
  // morning
  if (t < 19.3) { P.headDown = 0.25; P.tongue = a135In(t, 14.5, 15.6); P.talk = a135In(t, 14.5, 15.6) ? 0.4 + 0.3 * Math.abs(Math.sin(t * 9)) : 0; }
  else if (t < 21.6) { P.headDown = kfn(t, [[19.3, 0.25], [19.8, 1], [20.9, 1], [21.4, 0.5]]); P.snort = pulse(t, 20.2, 0.6); P.earL = -0.2; P.earR = -0.2; }
  else if (t < 37) { P.headDown = 0.5; P.talk = a135In(t, 23.4, 24.7) ? 0.35 + 0.35 * Math.abs(Math.sin(t * 10)) : 0; P.tongue = a135In(t, 23.4, 24.7); P.earL = a135In(t, 23.9, 24.6) ? 0.8 : 0.3; }
  else if (t < 95.5) {
    P.headDown = 0.35; P.neck = 0;
    if (a135In(t, 40.96, 42.1)) { P.gaze = [0, 0.05]; P.lid = pulse(t, 41.55, 0.22); P.headDown = 0.2; }
    P.headDown += 0.35 * pulse(t, 45.2, 1.3); P.snort = Math.max(P.snort || 0, pulse(t, 45.7, 0.6));
    if (a135In(t, 70.44, 75.9)) { P.neck = a135B(t, 70.44, 0.4) * 0.7 * (1 - a135B(t, 75.4, 0.5)); P.earL = 1; P.earR = 1; P.gaze = [1, 0.1]; }
  }
  // evening
  if (ev) { P.headDown = 0.45; P.sag = 0.15;
    if (a135In(t, 101.3, 101.9)) P.headDown = 0.45 - 0.2 * pulse(t, 101.3, 0.6);
    if (a135In(t, 106.84, 107.9)) { const y = pulse(t, 106.84, 1.06); P.talk = y; P.mouth = 'open'; P.lid = y; P.neck = 0.5 * y; P.headDown = 0.45 - 0.4 * y; }
    if (t >= 124.42 && t < 126.6) { P.headTurn = a135B(t, 124.42, 0.6) * (1 - a135B(t, 126.0, 0.5)); P.gaze = [1, 0]; }
    if (t >= 137.98 && t < 148.4) { P.headTurn = a135B(t, 137.98, 0.9) * (1 - a135B(t, 147.6, 0.6)); P.earL = -0.5; P.earR = -0.5; P.lid = 0.4; P.gaze = [1, 0]; P.headDown = 0.25; }
    if (t >= 155.4 && t < 157.4) { P.headTurn = a135B(t, 155.4, 0.4) * (1 - a135B(t, 157.0, 0.4)); P.headDown = 0.2; P.earL = 1; P.earR = 1; }
  }
  if (s16) { P.headDown = 0.3; P.earL = 0.6; P.earR = 0.6;
    if (t >= 171.4) { P.headDown = 0.3 + 0.35 * a135B(t, 171.4, 0.5) - 0.3 * a135B(t, 172.4, 0.4); P.chew = t > 172.2 ? Math.abs(Math.sin(t * 9)) : 0; P.neck = 0.3 * a135B(t, 171.4, 0.5); } }
  return P;
}
// saddlebag point (top centre) from the horse pose
function a135BagAt(H) { const st = mountSeat('horse', H), d = H.dir, c = Math.cos(st.rot), n = Math.sin(st.rot), lx = -d * 74 * H.s, ly = 14 * H.s; return [st.x + lx * c - ly * n, st.y + lx * n + ly * c, st.rot]; }

// ---------- the king ----------
const A135_KX = a135X([[14.9, 205], [15.15, 215], [16.15, 545], [17.05, 545], [17.75, 455], [75.38, 455], [75.62, 436], [76.4, 455], [93.2, 455], [94.4, 330], [94.7, 330], [95.15, 238],
  [101.55, 262], [102.6, 455], [156.4, 455], [156.75, 392], [157.1, 392], [157.6, 455], [159.4, 470]]);
const a135KMode = (t) => (t < 15.0 ? 'ride' : t < 15.32 ? 'dismount' : t < 95.15 ? 'stand' : t < 95.5 ? 'mount' : t < 101.3 ? 'ride' : t < 101.6 ? 'dismount' : 'stand');
const a135Crowned = (t) => (t >= 157.28 && !a135In(t, 165.95, 166.75));
function a135KingP(t) {
  const xf = A135_KX, P = { y: 900, s: A135_KS, costume: 'caliph', age: 0.35, seed: 3, dir: 1, ...a135Walk(xf, t, A135_KS) };
  P.pal = { head: a135Crowned(t) ? 'crownTurban' : 'bigTurban' };
  if (t >= 159.4) { P.x = 470; P.amp = 0; }
  if (a135In(t, 78.6, 95.15) || a135In(t, 156.4, 156.75)) P.dir = -1;
  const gH = a135GirlHead(t), door = [680, 760];
  // ---- hands (body-local, or {w} world)
  const bowl = a135BowlS(t);
  const bowlL = { w: [bowl.x - 50, bowl.y + 4] }, bowlR = { w: [bowl.x + 50, bowl.y + 4] }, bowlUnder = { w: [bowl.x, bowl.y + 30] };
  const holdK = bowl.by === 'king2', holdKR = bowl.by === 'kingR';
  let hR = A135H.rest, hL = A135H.restL;
  if (t < 37) {
    hR = a135HT(t, P, [[0, A135H.rest], [16.1, { w: [626, 768] }, 0.15], [16.33, { w: [618, 772] }, 0.08], [16.45, { w: [628, 766] }, 0.08], [16.6, { w: [618, 772] }, 0.08], [16.72, A135H.cupR, 0.2],
      [17.15, A135H.rest, 0.3], [17.94, [12, -160], 0.3], [19.2, A135H.rest, 0.4], [20.64, A135H.foldR, 0.4], [23.18, [12, -163], 0.3], [24.3, A135H.foldR, 0.35]]);
    hL = a135HT(t, P, [[0, A135H.restL], [17.94, [-8, -150], 0.3], [19.2, A135H.restL, 0.4], [20.64, A135H.foldL, 0.4]]);
  } else if (t < 95.2) {
    const big = a135In(t, 52.16, 52.85);
    hR = a135HT(t, P, [[37, A135H.foldR], [38.1, [104, -150], 0.25, 'out'], [38.66, () => bowlR, 0.25], [47.2, () => bowlUnder, 0.3], [65.48, () => bowlUnder, 0.01], [66.0, A135H.rest, 0.4],
      [66.62, [100, -112], 0.3], [67.6, A135H.up, 0.3], [70.6, A135H.rest, 0.5], [75.38, [70, -150], 0.12], [75.9, A135H.rest, 0.5],
      [79.36, A135H.belly, 0.25], [79.65, () => ({ w: a135ScrollEnd(t, 1) }), 0.25], [80.62, () => ({ w: a135ScrollTap(t) }), 0.25], [82.2, () => ({ w: a135ScrollEnd(t, 1) }), 0.3], [83.26, A135H.chin, 0.3],
      [84.4, () => ({ w: a135ScrollEnd(t, 1) }), 0.3], [87.88, () => ({ w: a135ScrollTap(t, 1) }), 0.2], [89.14, () => ({ w: a135ScrollEnd(t, 1) }), 0.2], [90.3, A135H.belly, 0.3], [90.6, [10, -92], 0.1],
      [91.04, { a: [1.0, 0.6] }, 0.3], [91.4, { a: [2.1, 1.8] }, 0.45, 'out'], [92.0, { a: [1.3, 0.9] }, 0.4], [92.4, A135H.rest, 0.5], [93.2, A135H.rest, 0.1]]);
    hL = a135HT(t, P, [[37, A135H.foldL], [38.1, [-60, -160], 0.25, 'out'], [38.66, () => bowlL, 0.25], [47.2, [-30, -110], 0.3], [47.4, () => ({ w: [bowl.x - 12, bowl.y + 2 + 6 * Math.sin(t * 14)] }), 0.3], [48.38, () => ({ w: [bowl.x - 6, bowl.y - 10] }), 0.3],
      [49.5, [-62, -120], 0.3], [52.16, { a: [-2.45, -2.95] }, 0.25, 'out'], [52.85, [-62, -110], 0.3], [57.08, A135H.mouthL, 0.3], [58.3, A135H.restL, 0.4], [63.02, A135H.bellyL, 0.2], [63.6, A135H.restL, 0.4],
      [64.06, A135H.chestL, 0.3], [65.4, A135H.restL, 0.4], [75.38, [-70, -150], 0.12], [75.9, A135H.restL, 0.5],
      [79.36, A135H.bellyL, 0.25], [79.65, () => ({ w: a135ScrollEnd(t, -1) }), 0.25], [89.9, A135H.restL, 0.4], [93.2, A135H.restL, 0.1]]);
    if (big) { P.drop = -4; }
  } else {
    hR = a135HT(t, P, [[95.2, A135H.rest], [102.7, A135H.up, 0.3], [103.6, A135H.rest, 0.4], [106.2, A135H.foldR, 0.4], [108.5, () => bowlR, 0.3], [109.36, () => bowlUnder, 0.25],
      [129.28, () => bowlUnder, 0.01], [129.9, A135H.rest, 0.4], [139.0, A135H.rest, 0.1],
      [148.52, { a: [-0.6, -0.3], sd: 1 }, 0.3], [148.85, { a: [2.7, 2.6] }, 0.25, 'out'], [149.25, { a: [1.6, 1.3] }, 0.3], [149.8, A135H.rest, 0.4],
      [150.42, () => ({ w: a135ScrollEnd(t, 1) }), 0.3], [150.98, [96, -168], 0.15, 'out'], [151.3, A135H.rest, 0.5], [152.68, A135H.chest, 0.35], [154.4, A135H.rest, 0.5],
      [156.75, () => ({ w: a135CrownS(t).hand }), 0.15], [157.35, A135H.rest, 0.3], [157.88, [104, -172], 0.4], [158.54, () => ({ w: a135HandMeet(t) }), 0.3], [159.4, A135H.rest, 0.01],
      [161.0, A135H.rest, 0.3], [165.86, () => ({ w: a135CrownS(t).hand }), 0.2], [166.9, A135H.rest, 0.3]]);
    hL = a135HT(t, P, [[95.2, A135H.restL], [95.6, A135H.waveL, 0.25], [96.6, A135H.restL, 0.3], [102.7, [-14, -168], 0.3], [103.6, A135H.restL, 0.4], [106.2, A135H.foldL, 0.4], [108.5, () => bowlL, 0.3],
      [109.36, [-60, -102], 0.3], [110.3, A135H.restL, 0.4], [125.8, () => ({ w: [bowl.x - 8, bowl.y - 6] }), 0.3], [126.4, A135H.pointBack, 0.35], [127.2, A135H.restL, 0.5],
      [140.22, [-48, -150], 0.5], [141.6, A135H.restL, 0.6], [150.42, () => ({ w: a135ScrollEnd(t, -1) }), 0.3], [150.98, [-96, -168], 0.15, 'out'], [151.3, A135H.restL, 0.5],
      [156.4, () => ({ w: a135CrownS(t).hand2 }), 0.3], [157.35, A135H.restL, 0.3], [158.54, A135H.restL, 0.3]]);
  }
  if (a135In(t, 63.5, 64.4)) { P.drop = (P.drop || 0) + 2 * Math.sin(t * 30); }   // a silent laugh
  P.hR = hR; P.hL = hL;
  // ---- face
  P.brow = a135Tr(t, [[0, 0], [9.3, -0.4], [17.94, -0.6, 0.3], [19.3, -0.3], [38.1, -0.2], [42.6, 0.5, 0.15], [43.4, -0.1], [47.2, -0.6], [49.6, -0.3], [54.6, 0], [75.38, -0.5, 0.1], [76.2, 0],
    [78.6, -0.2], [83.26, -0.4], [87.88, -0.5], [91.04, -0.3], [94.0, 0], [102.7, -0.3], [109.36, -0.6], [111, -0.3], [124.42, 0.2, 0.8], [125.8, -0.4], [131.3, 0, 0.3],
    [133.66, 0.1, 0.1], [135.5, -0.6, 0.2], [139.3, -0.5, 0.4], [139.9, 0.3, 0.5], [143.5, -0.6, 0.2], [145.08, -0.3], [148.52, 0.4, 0.2], [150.42, 0.5], [152.68, -0.3, 0.4], [157.88, -0.4], [160, -0.2]]);
  P.mouth = t < 9 ? 'smile' : a135In(t, 17.94, 19.2) || a135In(t, 23.18, 24.3) ? 'o' : a135In(t, 38.1, 38.7) ? 'o' : a135In(t, 42.5, 43.2) ? 'o' : a135In(t, 45.2, 48.0) ? 'smile'
    : a135In(t, 52.16, 52.85) ? 'open' : a135In(t, 63.4, 66.0) ? 'smile' : a135In(t, 75.38, 76.6) ? 'o' : a135In(t, 76.6, 79.3) ? 'smile' : a135In(t, 83.9, 93.0) ? 'smile'
    : a135In(t, 94.9, 96.6) ? 'smile' : a135In(t, 102.7, 103.6) ? 'smile' : a135In(t, 135.5, 136.3) ? 'o' : a135In(t, 148.52, 151.8) ? 'closed' : a135In(t, 152.68, 157.0) ? 'smile'
    : a135In(t, 157.0, 174) ? 'smile' : a135In(t, 139.3, 148.4) ? 'frown' : 'closed';
  P.talk = talk(t, [[48.38, 49.5], [49.92, 51.4], [102.7, 103.5], [109.5, 110.3], [125.8, 127.1], [165.0, 165.8]], 1.3) * 0.7;
  P.lid = Math.max(a135Tr(t, [[0, 0], [9.34, 0.5, 0.3], [11.16, 0, 0.2], [17.94, 0.3], [19.3, 0.1], [23.18, 0.35], [24.4, 0.1], [38.1, 0, 0.1], [43.66, 0.6, 0.2], [45.2, 1, 0.15], [45.75, 0.2, 0.2],
    [64.06, 0.3], [65.4, 0.1], [75.38, 0, 0.05], [83.26, 0.4, 0.3], [85.26, 0.5], [87.88, 0.55], [91.04, 0.5], [92.3, 0.25], [94.5, 0.1], [109.36, 0], [124.42, 0.3, 0.5], [125.8, 0.1], [133.66, 0, 0.05],
    [139.3, 0, 0.3], [139.9, 0.3, 0.4], [145.08, 0.45, 0.4], [148.52, 0.15, 0.2], [152.68, 0.2], [157.88, 0.15]]),
    a135In(t, 133.66, 135.4) ? 0 : blink(t, 3), pulse(t, 124.6, 0.5), pulse(t, 140.6, 0.6));
  P.noBlink = true;
  // gaze
  P.gaze = a135Gaze(t, P, [[0, [1200, 760]], [14.6, [560, 760]], [16.0, door], [19.3, [180, 760]], [20.1, door], [21.95, gH], [23.18, gH], [38.1, () => [a135BowlS(t).x, a135BowlS(t).y]], [39.4, gH],
    [42.02, () => [a135BowlS(t).x, a135BowlS(t).y]], [45.2, gH], [47.2, () => [a135BowlS(t).x, a135BowlS(t).y + 10]], [48.38, gH], [49.92, [330, 540]], [51.6, gH], [57.08, [470, 460]], [58.34, gH],
    [59.66, [560, 470]], [61.46, gH], [66.62, () => [a135BowlS(t).x, a135BowlS(t).y]], [67.6, gH], [68.34, [340, 520]], [71.58, gH], [74.12, [560, 640]], [75.98, [560, 640]], [76.4, () => [a135BowlS(t).x, a135BowlS(t).y]],
    [76.9, [400, 620]], [79.36, [690, 720]], [79.8, () => a135ScrollC(t)], [82.48, [380, 560]], [82.85, () => a135ScrollC(t)], [85.26, [200, 400]], [87.18, [470, 330]], [89.14, () => a135ScrollC(t)],
    [91.04, [380, 600]], [93.2, [200, 760]], [95.6, [690, 740]], [96.6, [1200, 740]],
    [101.6, [690, 740]], [102.4, gH], [106.2, [450, 300]], [106.7, door], [107.2, [450, 300]], [107.94, gH], [109.36, () => [a135BowlS(t).x, a135BowlS(t).y + 10]], [109.9, gH],
    [111.94, [330, 450]], [113.0, gH], [115.66, [500, 450]], [117.0, gH], [120.0, [500, 450]], [120.5, () => [a135BowlS(t).x, a135BowlS(t).y + 10]], [120.9, [500, 450]], [121.36, gH], [123.08, [700, 450]], [124.42, [380, 640]],
    [125.8, () => [a135BowlS(t).x, a135BowlS(t).y]], [126.4, [380, 640]], [127.2, gH], [131.3, [720, 470]], [133.66, () => a135HBag(t)], [134.05, gH], [135.5, [455, 1400]], [136.3, [380, 640]], [137.98, [250, 700]], [138.6, gH],
    [139.3, [470, 1000]], [140.22, () => a135W(P, [-48, -150])], [141.72, [560, 330]], [143.5, [560, 330]], [145.08, gH], [145.7, [470, 1300]], [148.52, [560, 330]], [150.42, () => a135ScrollC(t)], [151.78, [400, 600]],
    [152.68, gH], [156.4, () => a135HBag(t)], [157.0, gH], [157.88, gH], [159.4, gH], [162.0, [480, 560]], [162.6, gH], [163.62, [150, 760]], [164.92, [460, 880]], [165.86, gH], [166.98, [170, 560]],
    [169.6, [170, 560]], [170.5, gH], [171.6, [200, 700]], [172.6, gH]], 0.2);
  if (a135In(t, 135.5, 136.3)) P.gaze = [0, 0.05];
  if (a135In(t, 133.66, 134.2)) P.gaze = lookAt(a135Head(P), t < 133.95 ? a135HBag(t) : gH);
  // ---- body
  let tip = a135Tr(t, [[0, 0], [9.34, 0.06, 0.3], [11.16, 0, 0.3], [17.94, 0.06], [19.3, 0], [23.18, 0.05], [24.3, 0], [42.02, -0.04, 0.2], [42.5, 0.02, 0.15], [43.0, 0], [64.06, 0.08, 0.35], [65.0, 0, 0.4],
    [143.5, -0.08, 0.2], [144.6, 0], [145.08, 0.06, 0.6], [148.52, 0, 0.3], [165.86, 0.1, 0.4], [166.6, 0, 0.4]]);
  tip += 0.012 * Math.sin(t * 2.2) * (a135In(t, 106.2, 107.9) ? 2.5 : 0);
  P.tip = tip;
  P.sq = (a135In(t, 75.38, 76.0) ? settleTo(t, 75.38, 1, 1.0, 0.5, 0.06) + 0.06 * pulse(t, 75.38, 0.3) : 1) * breathe(t, 3) * (1 - 0.03 * pulse(t, 45.4, 1.0)) * anticipate(t, 148.2, 0.3, 0.05);
  P.drop = (P.drop || 0) + 6 * pulse(t, 135.55, 0.3) + kfn(t, [[145.08, 0], [145.7, 8], [148.3, 8], [148.6, 0]]) + 3 * pulse(t, 157.28, 0.3) + a135Nods(t, [131.5, 132.1, 132.7, 133.25], 0.35, 5)
    + a135Nods(t, [64.2, 162.2, 163.0, 165.95], 0.45, 6) + 3 * pulse(t, 44.3, 0.3) + 3 * pulse(t, 44.9, 0.3) + 3 * pulse(t, 43.75, 0.3);
  P.tilt = a135Tr(t, [[0, 0], [47.2, 0.12], [48.4, 0], [109.36, 0.1], [110.3, 0], [42.02, 0], [52.16, -0.15, 0.2], [52.85, 0, 0.2]]);
  P.look = a135Tr(t, [[0, 0], [16.0, 0.4], [17.5, 0], [19.3, -0.5], [20.1, 0.4], [21.0, 0], [79.36, -0.6, 0.15], [79.8, 0], [133.66, t < 133.95 ? -0.5 : 0, 0.08], [134.05, 0], [156.4, -0.6], [157.0, 0]]);
  if (a135In(t, 106.2, 107.2)) { P.ph = Math.sin(t * 9) * 0.6; P.amp = 0.18; }                  // a foot taps while he waits
  if (t >= 157.88 && t < 159.4) P.kneel = settleTo(t, 157.88, 0, 0.7, 0.4, 0.08);
  return P;
}
// king helpers that other actors need
const A135_KING_HEAD = (t) => a135Head(a135KingPSimple(t));
function a135KingPSimple(t) { return { x: A135_KX(t), y: 900, s: A135_KS, costume: 'caliph', age: 0.35, dir: 1 }; }
function a135Hand(t, side) { const P = a135KingP(t); a135Arms(P); return side === 'L' ? P.HL : P.HR; }
const a135HBag = (t) => { const H = a135HorseP(t), b = a135BagAt(H); return [b[0], b[1] + 20]; };

// ---------- the girl ----------
const A135_GX = a135X([[21.9, 680], [22.3, 680], [23.0, 590], [25.0, 590], [25.45, 680], [37.12, 680], [38.05, 590], [78.62, 590], [79.5, 680], [107.94, 680], [108.6, 590], [159.4, 580]]);
// mode: 'door' = in the doorway behind the door leaf (drawn inside the door clip), 'out' = in the yard, 'hidden'
function a135GMode(t) {
  if (t < 21.9 || a135In(t, 25.55, 37.12) || a135In(t, 96.35, 101.6) || a135In(t, 104.1, 107.9)) return 'hidden';
  if (a135In(t, 21.9, 22.3) || a135In(t, 25.45, 25.55) || a135In(t, 37.12, 37.3) || a135In(t, 96.0, 96.35) || a135In(t, 101.6, 102.2) || a135In(t, 103.75, 104.1) || a135In(t, 107.9, 108.05)) return 'door';
  return 'out';
}
const a135GirlHead = (t) => [A135_GX(t) + 0, 900 - 195 * A135_GS];
function a135GirlP(t) {
  const xf = A135_GX, P = { y: 900, s: A135_GS, costume: 'maiden', seed: 7, dir: -1, ...a135Walk(xf, t, A135_GS) };
  if (t >= 159.4) { P.x = 580; P.amp = 0; }
    if (a135In(t, 152.68, 153.3)) P.dir = t < 152.95 ? 1 : -1;     // spins round to the cane
  const mode = a135GMode(t); P.mode = mode;
  P.alpha = mode === 'door' ? (t < 22.3 ? a135B(t, 21.9, 0.3) : a135In(t, 25.45, 25.55) ? 1 - a135B(t, 25.45, 0.1) : t < 37.3 && t > 37 ? a135B(t, 37.12, 0.18) : a135In(t, 96.0, 96.35) ? 1 - a135B(t, 96.0, 0.3)
    : a135In(t, 101.6, 102.2) ? a135B(t, 101.6, 0.3) : a135In(t, 103.75, 104.1) ? 1 - a135B(t, 103.75, 0.3) : a135B(t, 107.9, 0.15)) : undefined;
  const bowl = a135BowlS(t), kH = A135_KING_HEAD(t);
  const bowlL = { w: [bowl.x - 50, bowl.y + 4] }, bowlR = { w: [bowl.x + 50, bowl.y + 4] };
  // hands: her R (local +x) is on the world-left (toward the king), her L on the world-right
  P.hR = a135HT(t, P, [[0, A135H.foldR], [23.9, [40, -196], 0.25, 'out'], [24.7, A135H.foldR, 0.3], [37.0, () => bowlL, 0.01], [38.95, A135H.foldR, 0.4], [53.34, A135H.up, 0.3], [54.4, A135H.palmR, 0.3],
    [56.0, A135H.foldR, 0.4], [58.34, A135H.clR, 0.25], [59.4, A135H.palmR, 0.3], [61.46, { a: [2.3, 2.75] }, 0.35], [62.9, A135H.belly, 0.25], [64.06, A135H.foldR, 0.4],
    [65.48, () => ({ w: [a135BowlS(t).x + 50, a135BowlS(t).y + 4] }), 0.3], [66.6, A135H.rest, 0.35], [73.34, () => ({ w: a135StalkHold(t) }), 0.3], [73.75, () => ({ w: a135StalkHold(t) }), 0.01],
    [78.62, () => ({ w: a135StalkHold(t) }), 0.01], [95.6, A135H.wave, 0.25], [96.0, A135H.rest, 0.3],
    [102.0, A135H.foldR, 0.1], [103.0, A135H.foldR, 0.1], [107.9, () => bowlL, 0.01], [109.2, A135H.rest, 0.4], [110.3, A135H.palmR, 0.3], [111.94, A135H.up, 0.3], [113.28, [8, -128], 0.2],
    [114.46, A135H.rest, 0.3], [115.66, A135H.up, 0.3], [118.58, [95, -150], 0.3], [119.9, A135H.rest, 0.4], [121.36, A135H.rest, 0.3], [125.6, A135H.foldR, 0.4],
    [128.04, A135H.chin, 0.3], [129.28, () => ({ w: [a135BowlS(t).x + 50, a135BowlS(t).y + 4] }), 0.3], [130.3, A135H.palmR, 0.3], [131.3, A135H.rest, 0.4],
    [134.3, () => [10 + 8 * Math.sin(t * 16), -126], 0.25], [135.4, A135H.rest, 0.3], [136.4, A135H.fwd, 0.35], [137.9, A135H.rest, 0.4],
    [146.68, () => ({ w: [548 + 10 * Math.sin(t * 3), 728 + 8 * Math.sin(t * 3 + 1)] }), 0.5], [148.4, A135H.rest, 0.4], [155.36, A135H.hip, 0.25], [157.0, A135H.wave, 0.2, 'out'], [157.6, [34, -180], 0.2],
    [158.54, () => ({ w: a135HandMeet(t) }), 0.3], [159.4, A135H.rest, 0.01], [160.98, A135H.palmR, 0.3], [162.0, A135H.rest, 0.4], [169.6, [60, -200], 0.12, 'out'], [170.2, A135H.rest, 0.4]]);
  P.hL = a135HT(t, P, [[0, A135H.foldL], [37.0, () => bowlR, 0.01], [38.95, A135H.foldL, 0.4], [54.6, A135H.palmL, 0.3], [56.0, A135H.foldL, 0.4], [58.34, A135H.clL, 0.25], [59.4, A135H.foldL, 0.4],
    [61.46, { a: [-2.3, -2.75] }, 0.35], [62.9, A135H.restL, 0.3], [64.06, A135H.foldL, 0.4], [65.9, () => ({ w: [a135BowlS(t).x - 4, a135BowlS(t).y + 30] }), 0.3], [79.6, () => ({ w: [a135BowlS(t).x - 4, a135BowlS(t).y + 30] }), 0.01],
    [96.0, A135H.restL, 0.3], [107.9, () => bowlR, 0.01], [109.2, A135H.restL, 0.4], [110.3, A135H.palmL, 0.3], [111.94, A135H.restL, 0.4], [113.28, [-8, -122], 0.2], [114.46, A135H.restL, 0.3],
    [118.58, [-95, -150], 0.3], [119.9, A135H.restL, 0.4], [121.36, A135H.pointBack, 0.35], [122.7, A135H.restL, 0.4], [125.6, A135H.foldL, 0.4],
    [129.6, () => ({ w: [a135BowlS(t).x - 4, a135BowlS(t).y + 30] }), 0.3], [159.4, A135H.restL, 0.01], [169.6, A135H.restL, 0.4]]);
  // face
  P.mouth = a135In(t, 22.3, 37) ? 'closed' : a135In(t, 46.56, 54.3) ? 'smile' : a135In(t, 71.58, 73.3) ? 'smile' : a135In(t, 101.6, 103.0) ? 'smile' : a135In(t, 152.0, 152.7) || a135In(t, 151.85, 152.68) ? 'o'
    : a135In(t, 155.36, 157.0) ? 'smile' : a135In(t, 157.0, 157.5) ? 'o' : t >= 157.5 ? 'smile' : a135In(t, 63.02, 64.0) || a135In(t, 134.3, 135.4) ? 'frown' : 'closed';
  P.talk = talk(t, [[54.6, 56.4], [57.5, 58.3], [59.66, 61.4], [63.3, 64.0], [71.58, 72.6], [110.3, 111.9], [112.5, 113.3], [115.66, 116.6], [119.0, 119.9], [121.36, 123.0], [129.28, 131.3], [131.6, 133.6], [136.4, 137.6], [160.98, 162.0]], 0.4) * 0.8;
  P.lid = Math.max(a135Tr(t, [[0, 0], [24.4, 0], [36.0, 0], [46.56, 0.2], [48, 0], [72.1, 1, 0.1], [72.4, 0, 0.1], [118.58, 0.3], [119.9, 0], [146.68, 0.4], [148.4, 0]]), blink(t, 7));
  P.noBlink = true;
  P.gaze = a135Gaze(t, P, [[0, kH], [22.3, [455, 895]], [22.9, kH], [23.9, [180, 760]], [24.3, kH], [25.0, [680, 760]], [37.12, () => [a135BowlS(t).x, a135BowlS(t).y]], [37.7, kH], [38.66, () => [a135BowlS(t).x, a135BowlS(t).y]], [39.2, kH],
    [56.46, [470, 470]], [57.08, kH], [59.66, [560, 470]], [60.4, kH], [68.34, [340, 520]], [70.0, kH], [73.34, [608, 800]], [74.0, kH], [77.4, [400, 600]], [78.62, [720, 760]], [79.6, kH], [93.8, [530, 600]], [94.3, kH],
    [95.6, kH], [95.9, [530, 620]], [101.6, kH], [107.94, () => [a135BowlS(t).x, a135BowlS(t).y]], [108.5, kH], [111.94, [330, 450]], [112.6, kH], [118.58, () => [a135BowlS(t).x, a135BowlS(t).y]], [119.4, kH],
    [123.08, [700, 450]], [123.8, kH], [128.04, [400, 620]], [128.5, [600, 300]], [128.9, kH], [131.3, [720, 470]], [132.0, kH], [136.4, [400, 620]], [137.4, kH], [139.3, [400, 640]], [146.68, [548, 720]],
    [151.85, [400, 620]], [153.82, [400, 620]], [154.1, [460, 890]], [154.35, kH], [157.88, kH], [163.62, [150, 760]], [164.4, kH], [166.98, [170, 560]], [169.6, [170, 560]], [170.5, kH], [171.6, [200, 700]], [172.6, kH]], 0.18);
  // body
  P.tilt = a135Tr(t, [[0, 0], [22.3, -0.08], [23.4, 0], [39.4, 0.14, 0.3], [40.9, 0, 0.4], [53.34, -0.08], [54.3, 0], [101.6, 0.12], [103.0, 0], [155.36, -0.1, 0.25], [156.3, 0]])
    + a135Shake(t, 71.58, 1.0, 0.14, 2) + a135Shake(t, 114.46, 1.0, 0.12, 2) + a135Shake(t, 152.68, 0.6, 0.1, 1);
  P.tip = a135Tr(t, [[0, 0], [25.0, 0.06, 0.15], [25.4, 0], [58.34, 0.05], [59.4, 0], [73.34, 0.06, 0.2], [73.8, 0]]) + 0.025 * Math.sin((t - 46.56) * 9) * (a135In(t, 46.56, 47.2) ? 1 : 0);
  P.drop = a135Nods(t, [24.15, 65.6, 103.7], 0.4, 7) - 4 * pulse(t, 35.6, 0.5);
  let sq = breathe(t, 7, a135In(t, 107.94, 110.3) ? 0.035 : 0.012);
  if (a135In(t, 107.94, 110.3)) sq = 1 + 0.03 * Math.sin(t * 13);
  sq *= anticipate(t, 73.2, 0.25, 0.06);
  if (t >= 156.85 && t < 157.6) { const h = hop(t, 157.0, 0.4, 0, 0, 26)[1]; P.y -= h; sq *= landSquash(t, 157.4, 0.14) * anticipate(t, 156.85, 0.15, 0.08); }
  if (t >= 158.6 && t < 159.3) sq *= landSquash(t, 158.95, 0.1);
  P.sq = sq;
  if (mode === 'door') P.amp = 0;
  return P;
}
const a135GirlCrowned = (t) => t >= 158.95;
// the stalk she holds up at 73.34 (world point of her grip) and its piece pose
function a135StalkHold(t) { if (t < 73.34) return [608, 790]; if (t < 74.0) return [K.lerp(608, 560, a135B(t, 73.6, 0.4)), K.lerp(790, 680, a135B(t, 73.6, 0.4, 'out'))]; if (t < 78.62) return [560, 680]; const g = A135_GX(t); return [g - 34, 830]; }

// ---------- the bowl (yard) ----------
// {x, y (rim centre), tilt, fill, cut, specks, water, by: 'girl2' | 'king2' | 'kingR' | 'girlL' | 'set' | null}
function a135BowlS(t) {
  const kx = A135_KX(t), gx = A135_GX(t), G2 = [gx - 8, 784], K2 = [kx + 34, 774], KR = [kx + 46, 802], GL = [gx + 44, 818];
  let p = null, by = null, tilt = 0;
  if (t < 37.0 || a135In(t, 96.35, 107.9)) return { show: false };
  if (t < 38.66) { p = G2; by = 'girl2'; }
  else if (t < 39.3) { p = a135Mix(G2, K2, a135B(t, 38.66, 0.64)); by = 'king2'; p[1] += 4 * pulse(t, 38.9, 0.25); }
  else if (t < 47.2) { p = K2; by = 'king2';
    if (t >= 42.02 && t < 45.4) { const up = a135Tr(t, [[42.02, 0], [42.02, 1, 0.45, 'out'], [42.5, 0.75, 0.2], [43.1, 0.85, 0.3], [45.2, 0, 0.3]]); p = a135Mix(K2, [kx + 18, 738], up);
      tilt = -0.35 * a135B(t, 42.02, 0.45) * (1 - a135B(t, 42.5, 0.2)) - 0.3 * (pulse(t, 43.7, 0.45) + pulse(t, 44.3, 0.45) + pulse(t, 44.9, 0.45)); } }
  else if (t < 65.48) { p = a135Mix(K2, KR, a135B(t, 47.2, 0.3)); by = 'kingR'; if (a135In(t, 52.8, 53.4)) { const u = pulse(t, 52.8, 0.6); p = a135Mix(KR, [kx + 20, 740], u); tilt = -0.25 * u; } }
  else if (t < 66.6) { p = t < 66.0 ? a135Mix(KR, [530, 792], a135B(t, 65.48, 0.52)) : a135Mix([530, 792], GL, a135B(t, 66.0, 0.6)); by = t < 66.0 ? 'kingR' : 'girlL'; }
  else if (t < 96.35) { p = GL; by = 'girlL'; }
  else if (t < 108.6) { p = G2; by = 'girl2'; }
  else if (t < 109.2) { p = a135Mix(G2, K2, a135B(t, 108.6, 0.6)); by = 'king2'; }
  else if (t < 129.28) { p = a135Mix(K2, KR, a135B(t, 109.36, 0.3)); by = 'kingR'; }
  else if (t < 130.3) { p = t < 129.8 ? a135Mix(KR, [530, 792], a135B(t, 129.28, 0.5)) : a135Mix([530, 792], GL, a135B(t, 129.8, 0.5)); by = t < 129.8 ? 'kingR' : 'girlL'; }
  else if (t < 159.4) { p = GL; by = 'girlL'; }
  else { p = [662, 852]; by = 'set'; }
  const fill = t < 43.7 ? 1 : t < 96.35 ? kfn(t, [[43.7, 1], [45.2, 0.55], [47.0, 0.5], [52.8, 0.5], [53.3, 0.15]]) : 0.45;
  return { show: true, x: p[0], y: p[1], tilt, fill, cut: a135In(t, 107.9, 130.3), specks: t < 96 ? 1 : 0, water: 1, by, s: 0.7 };
}
function a135DrawBowl(ctx, t) { const b = a135BowlS(t); if (!b.show) return; a135Bowl(ctx, b.x, b.y, { s: b.s, fill: b.fill, cut: b.cut, specks: b.specks, water: b.water, tilt: b.tilt, t, wob: b.by === 'girl2' ? 0.5 : 0.2 }); }
// the point where the two hands meet at the proposal
const a135HandMeet = (t) => [522, 796];

// ---------- the tax scroll ----------
// scroll top-roller centre (world) while the king holds it
function a135ScrollPos(t) { const P = a135KingPSimple(t); P.dir = t < 95 ? -1 : 1; const c = a135W(P, [0, -128]); return [c[0], c[1] + (t < 95 ? 0 : -10)]; }
const a135ScrollEnd = (t, sd) => { const c = a135ScrollPos(t), op = a135ScrollOpen(t), w = 48 * op + 8; return [c[0] + sd * w, c[1] + 4]; };
const a135ScrollC = (t) => { const c = a135ScrollPos(t); return [c[0], c[1] + 50]; };
const a135ScrollTap = (t, drum) => { const c = a135ScrollPos(t); return drum ? [c[0] + 6, c[1] + 108 + 5 * Math.sin(t * 22)] : [c[0] + 21, c[1] + 22 + 10 * Math.abs(Math.sin((t - 80.7) * Math.PI / 0.5))]; };
function a135ScrollOpen(t) { if (t < 95) return a135Tr(t, [[79.36, 0], [79.75, 1, 0.3, 'back'], [89.14, 0, 0.6]]); return a135Tr(t, [[150.42, 0], [150.5, 1, 0.3, 'back']]); }
function a135DrawScroll(ctx, t) {
  if (a135In(t, 79.36, 90.45)) { const sh = K.clamp((t - 89.8) / 0.6); let c = a135ScrollPos(t);
    if (t < 79.7) { const k = a135B(t, 79.36, 0.34); const P = a135KingPSimple(t); P.dir = -1; const b = a135W(P, [0, -96]); c = a135Mix(b, c, k); }
    if (sh > 0) { const P = a135KingPSimple(t); P.dir = -1; c = a135Mix(c, a135W(P, [0, -96]), sh); }
    a135Scroll(ctx, c[0], c[1], { s: 0.8 * (1 - 0.6 * sh), open: a135ScrollOpen(t), coins: 3 }); return; }
  if (t >= 150.42 && t < 174) {
    if (t < 150.98) { const c = a135ScrollPos(t); a135Scroll(ctx, c[0], c[1], { s: 0.8, open: a135ScrollOpen(t), coins: 3 }); return; }
    const c = a135ScrollPos(150.98), u = a135B(t, 151.15, 0.7, 'in'), fl = (sd) => swing(t, 151.15, 0.5 * sd, 1.6, 1.5);
    const halves = [{ dx: K.lerp(-38, 425 - c[0], u), dy: K.lerp(0, 852 - c[1], u), rot: K.lerp(-0.25, -1.45, u) + fl(1) * (1 - u) }, { dx: K.lerp(38, 515 - c[0], u), dy: K.lerp(0, 860 - c[1], u), rot: K.lerp(0.25, 1.4, u) + fl(-1) * (1 - u) }];
    if (t >= 159.4) { halves[0] = { dx: 420 - c[0], dy: 852 - c[1], rot: -1.45 }; halves[1] = { dx: 505 - c[0], dy: 860 - c[1], rot: 1.4 }; }
    const tr = K.clamp((t - 150.98) / 0.2);
    a135Scroll(ctx, c[0], c[1], { s: 0.8, open: 1, coins: 3, torn: 1, halves: halves.map((h) => ({ dx: h.dx / 0.8 * (t < 151.15 ? tr : 1), dy: h.dy / 0.8, rot: h.rot })) }); }
}

// ---------- the crowns ----------
// king's crown: in the bag (tips showing) until 156.75; lifted out, carried to the head by 157.28; S16: lifted off 165.95..166.75
function a135CrownS(t) {
  const H = a135HorseP(t), bag = a135BagAt(H), P = a135KingP0(t), head = a135W(P, [0, -255]);
  if (t < 156.75) return { inBag: true, hand: [bag[0] + 6, bag[1] - 4], hand2: [bag[0] - 8, bag[1] + 6] };
  if (t < 157.28) { const u = a135B(t, 156.8, 0.45); const p = a135Mix([bag[0] - 4, bag[1] - 20], head, u); p[1] -= 40 * Math.sin(Math.PI * u); return { at: p, s: 1.0, hand: [p[0] + 30, p[1] + 10], hand2: [p[0] - 30, p[1] + 10] }; }
  if (a135In(t, 165.95, 166.75)) { const u = pulse(t, 165.95, 0.8), p = [head[0] + 10, head[1] - 40 * u]; return { at: p, s: 1.0, hand: [p[0] + 34, p[1] + 10], hand2: [p[0] - 34, p[1] + 10] }; }
  return { hand: [head[0] + 34, head[1] + 10], hand2: [head[0] - 34, head[1] + 10] };
}
function a135KingP0(t) { return { x: A135_KX(t) + (t >= 159.4 ? 470 - A135_KX(t) : 0), y: 900, s: A135_KS, costume: 'caliph', age: 0.35, dir: 1 }; }

// ---------- villagers (S16) ----------
const A135_VIL = [
  { costume: 'villager', age: 0.55, s: 0.85, seed: 21, x: a135X([[163.62, -120], [165.1, 70]]) },
  { costume: 'servant', child: true, s: 0.85, seed: 22, x: a135X([[163.85, -200], [165.4, 175]]) },
  { costume: 'villageWoman', s: 0.85, seed: 23, x: a135X([[163.7, -60], [165.0, 268]]) }];
function a135VillagerP(t, i) {
  const V = A135_VIL[i], P = { y: 900, s: V.s, costume: V.costume, child: V.child, age: V.age, seed: V.seed, dir: 1, ...a135Walk(V.x, t, V.s * (V.child ? 0.62 : 1)) };
  const hunch = kfn(t, [[166.98, 1], [167.5, 0.94], [169.6, 0.94], [169.9, 1]]);
  P.sq = hunch * breathe(t, V.seed);
  P.gaze = a135Gaze(t, P, [[163.6, [600, 700]], [166.98 + i * 0.1, [170, 540]], [170.0 + i * 0.1, [520, 700]], [171.6, [200, 690]], [172.7, [520, 700]]], 0.2);
  P.mouth = t > 169.8 ? 'smile' : t > 167.0 ? 'frown' : 'closed';
  P.brow = t > 167 && t < 169.8 ? -0.5 : 0;
  if (i === 1) { const k = Math.floor((t - 163.85) / 0.45); if (t < 165.4 && t > 163.85 && k % 2 === 1) P.y -= 14 * Math.sin(Math.PI * ((t - 163.85) / 0.45 - k));
    if (a135In(t, 168.12, 169.7)) { P.x = K.lerp(P.x, 232, a135B(t, 168.12, 0.4)); }
    if (t >= 169.7) { P.x = K.lerp(232, 175, a135B(t, 169.7, 0.4)); P.y -= hop(t, 169.95, 0.45, 0, 0, 30)[1]; } }
  const cheer = t >= 169.9 && t < 171.8 ? 1 : 0;
  if (cheer) { P.aR = [2.5 + 0.15 * Math.sin(t * 8 + i), 2.9]; P.aL = [-2.5 - 0.15 * Math.sin(t * 8 + i), -2.9]; }
  if (i === 2 && !cheer) { P.hR = [-30, -170]; P.hL = A135H.foldL; }
  if (i === 2 && cheer) P.aL = [-0.3, -0.2];
  return P;
}
// the woman's cane bundle on her shoulder (world)
function a135Bundle(ctx, P, t) { const sh = a135W(P, [-20, -150]); ctx.save(); ctx.translate(sh[0], sh[1]); ctx.rotate(-0.55);
  const bite = t > 172.2 ? 1 : 0; for (let k = 0; k < 4; k++) a135CanePiece(ctx, -60, -10 + k * 9 - 18, { len: k === 0 && bite ? 140 : 190, w: 15, rot: 0.02 * k, lush: 1 });
  seg(ctx, -50, -40, -50, 25, 6, C.red, 2); ctx.restore(); }

// ---------- draw the yard ----------
function a135Yard(ctx, t, cam) {
  const u = a135U(t), dark = t >= 98.9 && t < 159.4 ? K.clamp((u - 0.44) / 0.12) : 0;
  const G = a135GirlP(t), KP = a135KingP(t), H = a135HorseP(t), mode = a135KMode(t);
  const winInside = (c) => { if (!a135In(t, 104.3, 107.95)) return; a135Silhouette(c, (cc) => {
      const twist = a135In(t, 104.94, 105.6) ? Math.abs(Math.sin((t - 104.94) * 7)) : a135In(t, 106.6, 107.7) ? Math.abs(Math.sin((t - 106.6) * 7)) : 0, reach = a135In(t, 105.9, 106.6) ? pulse(t, 105.9, 0.7) : 0;
      const S = { x: 845, y: 725, s: 0.48, costume: 'maiden', dir: -1, drop: a135In(t, 105.6, 105.95) ? 10 : 0, tilt: -0.15 * reach, hR: [10 - 30 * reach, -130 - 40 * reach], hL: [-12, -128 + 4 * twist], noBlink: true, lid: 0 };
      a135Arms(S); person(cc, S); a135CanePiece(cc, 845 - 0.48 * (twist * 3), 725 - 0.48 * 130, { len: 90, w: 9, twist, rot: 0.1 }); }, 785, 595, 120, 120); };
  const inside = (c) => { if (G.mode === 'door') { const P = { ...G }; a135Person(c, P); a135GirlHeld(c, t, P); }
    if (a135In(t, 17.3, 21.85)) { const a = a135Fade(t, 17.3, 21.85, 0.15) * (1 - blink(t, 9)); c.save(); c.globalAlpha = a; c.fillStyle = C.white; for (const ex of [668, 688]) { c.beginPath(); c.arc(ex, 718, 4.5, 0, 7); c.fill(); } c.restore(); } };
  villageYard(ctx, { u, t, cottage: A135_COT, tree: false, door: a135Door(t), inside, winLit: a135WinLit(t), winInside, sun: false });
  const cs = a135CaneState(t); a135CaneField(ctx, A135_FIELD[0], A135_FIELD[1], 885, { n: 7, h: 360, lush: cs.lush, bend: cs.bend, droop: cs.droop, sway: cs.sway, t, seed: 11 });
  // glints on the lush field
  for (const [gt, gx, gy] of [[14.9, 330, 560], [15.2, 450, 540], [77.5, 330, 560], [77.9, 450, 540], [78.2, 370, 600], [92.4, 520, 560], [153.2, 330, 560], [153.5, 490, 540]]) { const q = pulse(t, gt, 0.5); if (q > 0) star(ctx, gx, gy, 16 * q, C.white, t); }
  if (t < 159.4 || t >= 159.4) a135Post(ctx, 268);
  // the wrung stalk leaning on the wall (from S8) or lying on the doorstep
  if (t >= 37 && t < 73.6) a135CanePiece(ctx, (A135_STALK[0] + A135_STALK[2]) / 2, (A135_STALK[1] + A135_STALK[3]) / 2 + 6, { len: 190, w: 18, rot: -1.5, twist: 1, limp: 0.15 });
  // king behind the horse (dismount / mount)
  const kBehind = mode === 'stand' && KP.x < 330 && ((t < 17) || (t > 93 && t < 96) || (t > 101 && t < 103));
  if (kBehind) a135Person(ctx, KP);
  // horse (+ rider)
  const riderVis = mode === 'ride' ? 1 : mode === 'dismount' ? 1 - a135B(t, t < 50 ? 15.0 : 101.3, 0.3) : mode === 'mount' ? a135B(t, 95.15, 0.33) : 0;
  const rider = { costume: 'caliph', pal: { head: 'bigTurban' }, age: 0.35, s: A135_KS, seed: 3, lurch: lurch(t, t < 50 ? 14.5 : 101.3), gaze: [H.dir, 0], mouth: 'closed', noBlink: true, lid: blink(t, 3) };
  if (mode === 'mount' || (t > 95 && t < 98)) { rider.handL = [-64, -196]; rider.mouth = 'smile'; }
  if (riderVis >= 0.999) rideOn(ctx, 'horse', H, rider);
  else { horse(ctx, H); if (riderVis > 0.01) { const st = mountSeat('horse', H), ps = rider.s; ctx.save(); ctx.translate(st.x, st.y); ctx.rotate(st.rot); ctx.beginPath(); ctx.rect(-400, -600, 800, 602); ctx.clip(); person(ctx, { ...rider, x: 22 * H.dir * ps, y: 52 * ps + (1 - riderVis) * 150 * ps, dir: H.dir, sit: 1, seat: 'bench', handL: [34, -122], handR: [52, -118] }); ctx.restore(); } }
  const bag = a135BagAt(H); a135Bag(ctx, bag[0], bag[1], H.s * 1.25, { rot: bag[2], crown: t < 156.75, lift: a135In(t, 156.4, 156.75) ? 12 * a135B(t, 156.4, 0.3) : 0 });
  if (t < 156.75) { const q = pulse(t, 2.2, 0.5) + pulse(t, 41.3, 0.6) + pulse(t, 133.75, 0.4); if (q > 0) star(ctx, bag[0] - 6, bag[1] - 22, 18 * q, C.white, t * 2); }
  // standing king, girl
  if (mode === 'stand' && !kBehind) a135Person(ctx, KP);
  const cr = a135CrownS(t); if (cr.at) a135Crown(ctx, cr.at[0], cr.at[1], cr.s);
  if (G.mode === 'out') { a135Person(ctx, G); a135GirlHeld(ctx, t, G); }
  a135DrawBowl(ctx, t); a135DrawScroll(ctx, t);
  if (t >= 159.4) { for (let i = 0; i < 3; i++) { const P = a135VillagerP(t, i); if (P.x < -100) continue; a135Person(ctx, P); if (i === 2) a135Bundle(ctx, P, t); } }
  if (dark > 0) { ctx.save(); ctx.globalAlpha = 0.18 * dark; ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
  return { G, KP, H };
}
// things the girl holds: the stalk (S8-S10) and her small crown (from 158.95)
function a135GirlHeld(ctx, t, P) {
  if (a135In(t, 73.6, 96.35)) { a135Arms(P); const h = P.HR, up = a135In(t, 73.75, 78.62); a135CanePiece(ctx, h[0] + (up ? 0 : -4), h[1] + (up ? 30 : 40), { len: 190, w: 18, rot: up ? 1.45 : 1.5, twist: 1, limp: up ? 0.75 + 0.1 * swing(t, 74.0, 1, 2, 2) : 0.3, s: 0.9 }); }
  if (t >= 158.55) { const hd = a135Head(P), u = a135B(t, 158.55, 0.4, 'in'), y = K.lerp(hd[1] - 260, hd[1] - 30, u); a135Crown(ctx, hd[0], t < 158.95 ? y : hd[1] - 30 - 3 * pulse(t, 158.95, 0.25), 0.62, { rot: -0.05 }); }
}
