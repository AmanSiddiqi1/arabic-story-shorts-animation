// ===== AN-111 shops: the jewel expert (S16, S17) and the rich merchant (S18), both palaceHall variant 'merchant' =====
const A111_DESK = [470, 730, 792];
function a111Desk(ctx, rich) { const [x0, x1, top] = A111_DESK; shape(ctx, [[x0, top], [x1, top], [x1, 902], [x0, 902], [x0, top]], rich ? '#7a2a10' : BARKY, { lw: 6, seed: 750, dot: rich ? C.red : '#7a4212', pitch: 9, rad: 0.18, da: 0.4 });
  shape(ctx, [[x0 - 12, top - 14], [x1 + 12, top - 14], [x1 + 12, top + 4], [x0 - 12, top + 4], [x0 - 12, top - 14]], rich ? C.yellow : WOOD, { lw: 5, seed: 751 });
  if (rich) for (let k = 0; k < 3; k++) shape(ctx, ell(530 + k * 80, 850, 16, 16, 14), C.yellow, { lw: 3, seed: 752 + k }); }
const a111ShopO = (t, rich) => rich ? { variant: 'merchant', wall: 'blue', curtain: 1, treasure: true, carpet: true, desk: false, u: 0.22, light: 0.6, doorOpen: 0.7, t }
  : { variant: 'merchant', wall: 'ochre', curtain: 0, desk: false, u: 0.12, doorOpen: a111B(t, 103.6, 0.5) * 0.8 * (1 - a111B(t, 105.6, 0.6)) + (t > 119.8 ? 0.8 * a111B(t, 119.8, 0.4) : 0), t };
const A111_JX = 610, A111_PEARL_DESK = [530, 776], A111_PR = 15;
// the dark cloth the pearl lies on (S16-S17)
function a111Cloth(ctx) { shape(ctx, [[492, 786], [568, 786], [562, 774], [498, 774], [492, 786]], NAVY, { lw: 3.5, seed: 759, dot: '#2a4fae', pitch: 6, rad: 0.25, da: 0.4 }); }
// the jeweller seated behind the desk
function a111Jeweller(t) {
  const P = a111P(A111_JEWEL, { x: A111_JX, y: 862, sit: 1, seat: 'bench' });
  return P;
}

// ---------- S16 (102.30-109.96): next day: the jewel expert ----------
const A111_S16X = a111X([[104.0, 120], [105.6, 420]]);
function a111S16(ctx, t) {
  palaceHall(ctx, a111ShopO(t, false));
  const J = a111Jeweller(t), Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S16X, t) }), up = t > 109.12;
  if (Hh.amp) Hh.amp *= 0.6;
  J.hR = up ? [40, -110] : A111H.chin; J.hL = a111HT(t, J, [[0, { w: [560, 784] }], [105.42, [-34, -100], 0.4]]); J.lid = up ? (t < 109.3 ? 0 : null) : Math.max(0.5, blink(t, 17)); J.eyes = up && t < 109.8 ? 'wide' : 'open';
  J.sq = up ? settleTo(t, 109.12, 1, 1.06, 0.25, 0.1) * (t > 109.5 ? 1 / 1.06 : 1) : 1; J.mouth = up ? 'o' : 'closed'; J.drop = up ? 0 : 6;
  a111Gz(J, t < 105.42 ? [560, 790] : t < 107.8 ? a111Head(Hh) : A111_PEARL_DESK);
  const untie = a111B(t, 107.8, 0.4), roll = a111B(t, 108.2, 0.6, 'out');
  Hh.hR = t < 107.7 ? A111H.chest : a111HT(t, Hh, [[107.7, A111H.chest], [107.72, { w: [486, 780] }, 0.3], [108.3, [38, -96], 0.4]]);
  Hh.hL = t < 107.7 ? A111H.chestL : a111HT(t, Hh, [[107.7, A111H.chestL], [108.4, A111H.palmL, 0.3]]);
  Hh.look = a111In(t, 104.7, 105.1) ? -0.6 : 0.3; Hh.brow = -0.3; Hh.mouth = 'smile'; Hh.talk = a111In(t, 108.4, 109.3) ? a111Talk(t, 0.6, 6) : 0;
  a111Gz(Hh, a111In(t, 104.7, 105.1) ? [60, 760] : t < 107.7 ? a111Head(J) : t < 108.8 ? A111_PEARL_DESK : a111Head(J));
  Hh.after = (c, Q) => { if (t < 107.8) { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Knot(c, m[0], m[1] + 4, 0.8, 0); } };
  a111Draw(ctx, t, J); a111Desk(ctx, false);
  // the gem tray and the expert's own small coin stack
  shape(ctx, [[560, 786], [640, 786], [636, 776], [564, 776], [560, 786]], NAVY, { lw: 3.5, seed: 755 });
  [[578, C.red], [600, C.blue], [622, GREEN]].forEach(([x, col], i) => { shape(ctx, [[x - 8, 776], [x, 766], [x + 8, 776], [x, 782], [x - 8, 776]], col, { lw: 2.5, seed: 756 + i }); const g = pulse(t, 106.06 + i * 0.4, 0.4); if (g > 0) star(ctx, x + 4, 764, 12 * g, C.white, t * 3); });
  a111Stack(ctx, 690, 784, 3, 13);
  if (t > 107.6) a111Cloth(ctx);
  if (t > 107.8) { a111Knot(ctx, 478, 788, 0.8, untie); a111Pearl(ctx, K.lerp(482, A111_PEARL_DESK[0], roll), A111_PEARL_DESK[1] - 4, A111_PR, { hl: -2.3 + roll * 4, glint: pulse(t, 108.9, 0.5) }); }
  a111Draw(ctx, t, Hh);
}

// ---------- S17 (109.96-120.50): valuable, but go to a richer man ----------
function a111S17(ctx, t) {
  palaceHall(ctx, a111ShopO(t, false));
  const J = a111Jeweller(t), Hh = a111P(A111_HERO, { x: 420, y: 900 });
  if (t > 120.1) Object.assign(Hh, a111Walk(a111X([[120.1, 420], [121.0, 300]]), t));
  const lens = a111In(t, 110.4, 113.7), stackX = 690 - 120 * a111B(t, 114.85, 0.35) + 120 * a111B(t, 115.95, 0.3);
  const pearlHeld = a111In(t, 110.0, 113.6) || a111In(t, 116.2, 117.0), pearlInHero = t > 116.9;
  // jeweller: lifts the pearl to the lens, turns it, the glint, nods hard with hands narrow to wide, the coin stack, returns the pearl, points out
  J.hL = a111HT(t, J, [[0, [-34, -100]], [109.96, { w: A111_PEARL_DESK }, 0.3], [110.4, [-8, -176], 0.4], [113.6, { w: A111_PEARL_DESK }, 0.3], [113.85, [-30, -140], 0.15], [114.0, A111H.outL, 0.35],
    [116.2, { w: A111_PEARL_DESK }, 0.3], [116.5, { w: [506, 778] }, 0.4], [117.0, { w: [500, 772] }, 0.3], [117.88, [-100, -160], 0.35], [119.4, [-34, -100], 0.4]]);
  J.hR = a111HT(t, J, [[0, [34, -100]], [113.85, [30, -140], 0.15], [114.0, A111H.out, 0.35], [114.82, () => ({ w: [stackX + 4, 776] }), 0.25], [116.2, [34, -100], 0.3]]);
  J.wink = lens ? 'L' : null; J.mouth = t > 112.4 && t < 113.9 ? 'o' : t > 115.3 && t < 116.2 ? 'smile' : 'closed'; J.talk = a111In(t, 113.8, 114.7) || a111In(t, 117.9, 119.3) ? a111Talk(t, 0.75, 7) : 0;
  J.brow = t > 113.78 ? -0.5 : 0; J.drop = a111Nods(t, [113.85, 114.2], 0.3, 8); J.look = a111Shake(t, 115.25, 0.6, 0.8) + (t > 117.88 && t < 119.4 ? -0.5 : 0); J.tip = a111Shake(t, 115.25, 0.6, 0.09);
  a111Gz(J, gazePlan(t, [[0, A111_PEARL_DESK], [110.4, [600, 720]], [113.9, () => a111Head(Hh)], [114.85, [600, 776]], [115.25, () => a111Head(Hh)], [117.88, [80, 720]], [118.6, () => a111Head(Hh)]], 0.12));
  J.after = (c, Q) => { if (lens) a111Loupe(c, Q, 1); if (pearlHeld) a111Pearl(c, Q.HL[0], Q.HL[1] - 12, A111_PR, { hl: -2.3 + (t - 111.5) * 2.5, glint: pulse(t, 113.0, 0.6), grot: t }); };
  // hero: hopeful, then the palm for the pearl, a bow of thanks, turns to go
  Hh.hR = a111HT(t, Hh, [[0, A111H.chest], [114.9, A111H.chin, 0.35], [116.0, { w: [500, 786] }, 0.35], [117.2, [30, -116], 0.4], [119.4, A111H.chest, 0.3]]); Hh.hL = a111HT(t, Hh, [[0, A111H.chestL], [114.9, [-30, -110], 0.35], [116.0, { w: [478, 790] }, 0.35], [117.2, [-6, -116], 0.4]]);
  const puzz = a111In(t, 114.85, 116.2); Hh.brow = puzz ? -0.5 : -0.25; Hh.mouth = puzz ? 'o' : t > 113.78 && t < 114.85 ? 'open' : 'smile'; Hh.eyes = a111In(t, 113.8, 114.7) ? 'wide' : 'open';
  Hh.tilt = puzz ? 0.14 * a111B(t, 114.9, 0.3) : 0; Hh.tip = 0.12 * pulse(t, 119.45, 0.8); Hh.drop = a111Nods(t, [113.95, 118.7, 119.0], 0.3, 7); Hh.look = t > 120.1 ? -0.5 : 0.4;
  a111Gz(Hh, gazePlan(t, [[0, () => (J.HL || A111_PEARL_DESK)], [113.8, () => a111Head(J)], [114.9, [stackX, 770]], [115.3, () => a111Head(J)], [117.0, () => (Hh.HR || [500, 790])], [117.4, () => a111Head(J)], [117.95, [100, 720]], [118.6, () => a111Head(J)], [120.1, [0, 760]]], 0.12));
  Hh.after = (c, Q) => { if (pearlInHero && t < 119.6) a111Pearl(c, (Q.HR[0] + Q.HL[0]) / 2, Q.HR[1] - 12, A111_PR, {}); if (t > 119.6) a111Knot(c, (Q.HL[0] + Q.HR[0]) / 2, (Q.HL[1] + Q.HR[1]) / 2 + 4, 0.8, 0); };
  a111Draw(ctx, t, J); a111Desk(ctx, false);
  shape(ctx, [[560, 786], [640, 786], [636, 776], [564, 776], [560, 786]], NAVY, { lw: 3.5, seed: 755 }); [[578, C.red], [600, C.blue], [622, GREEN]].forEach(([x, col], i) => shape(ctx, [[x - 8, 776], [x, 766], [x + 8, 776], [x, 782], [x - 8, 776]], col, { lw: 2.5, seed: 756 + i }));
  a111Knot(ctx, 470, 788, 0.8, 1); a111Cloth(ctx); a111Stack(ctx, stackX, 784, 3, 13);
  if (!pearlHeld && !pearlInHero) a111Pearl(ctx, A111_PEARL_DESK[0], A111_PEARL_DESK[1] - 4, A111_PR, { glint: pulse(t, 115.3, 0.5) });
  a111Draw(ctx, t, Hh);
  // the advice: a big turban over a tall stack of coins
  if (a111In(t, 117.88, 119.6)) { const p = a111B(t, 117.88, 0.3, 'lin') * (1 - a111B(t, 119.35, 0.25));
    a111Balloon(ctx, 690, 470, 230, 180, p, a111W(J, [30, -250]), (c) => { c.fillStyle = '#fff3d6'; c.fillRect(-120, -95, 240, 190); a111Stack(c, 46, 70, 12, 22);
      const m = a111P(A111_MERCH, { x: -40, y: 280, s: 1.0, mouth: 'smile', noBlink: true }); m.gaze = [0.3, 0]; a111Draw(c, t, m); }); }
}

// ---------- S18 (120.50-127.80): the rich merchant pays seventy thousand dirhams ----------
const A111_S18HX = a111X([[120.5, 120], [121.7, 360], [121.75, 360], [122.0, 400]]);
const A111_STOOL = 380;
function a111S18(ctx, t) {
  palaceHall(ctx, a111ShopO(t, true));
  seatStool(ctx, A111_STOOL, 900);
  const M = a111P(A111_MERCH, { x: 560, y: 900 }), Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S18HX, t) }), sit = a111B(t, 125.64, 0.15, 'in');
  // merchant: takes the pearl, holds it to the light, a quick nod, one clap, sacks slide in, sets the pearl on a cushion, shakes the limp hand
  const clap = a111In(t, 123.24, 123.5);
  M.hL = a111HT(t, M, [[0, [-36, -90]], [121.9, { w: [470, 786] }, 0.3], [122.3, [-40, -214], 0.4], [123.0, [-30, -120], 0.2], [123.24, [-6, -136], 0.12], [123.5, [-70, -120], 0.3], [126.2, { w: [672, 778] }, 0.3], [126.7, { w: [462, 806] }, 0.35]]);
  M.hR = a111HT(t, M, [[0, [36, -90]], [123.0, [30, -120], 0.2], [123.24, [6, -136], 0.12], [123.5, A111H.out, 0.3], [124.6, [36, -100], 0.4]]);
  M.tip = t > 126.6 ? -0.15 * a111B(t, 126.6, 0.3) : 0; M.mouth = t > 122.4 ? 'smile' : 'closed'; M.brow = a111In(t, 122.3, 123.0) ? -0.6 : 0; M.drop = 7 * pulse(t, 122.75, 0.3);
  a111Gz(M, gazePlan(t, [[0, () => a111Head(Hh)], [121.9, [470, 786]], [122.3, () => (M.HL ? [M.HL[0], M.HL[1] - 10] : [520, 680])], [123.2, [660, 790]], [124.3, () => a111Head(Hh)], [126.2, [672, 770]], [126.7, () => a111Head(Hh)]], 0.12));
  const pearlM = a111In(t, 122.05, 126.45);
  M.after = (c, Q) => { if (pearlM) a111Pearl(c, Q.HL[0], Q.HL[1] - 10, 11, { glint: pulse(t, 122.5, 0.6) }); };
  // hero: enters small, looks up and around, offers the pearl, the jaw drops, sits down hard, two quick blinks, his limp hand shaken
  Hh.sit = sit; Hh.seat = 'bench'; if (sit > 0) Hh.x = 400;
  Hh.hR = a111HT(t, Hh, [[0, A111H.chest], [121.75, { w: [470, 786] }, 0.3], [122.2, [36, -96], 0.4], [126.65, { w: [466, 808] }, 0.35]]); Hh.hL = a111HT(t, Hh, [[0, A111H.chestL], [122.2, [-36, -90], 0.4]]);
  if (a111In(t, 126.95, 127.6)) Hh.hR = { w: [466, 808 + 8 * Math.sin((t - 126.95) * 22)] };
  Hh.mouth = t > 125.64 ? 'open' : t > 124.3 ? 'o' : 'closed'; Hh.eyes = t > 124.3 ? 'wide' : 'open'; Hh.lid = a111In(t, 126.0, 126.1) || a111In(t, 126.25, 126.35) ? 1 : t > 124.3 ? 0 : null;
  Hh.sq = t > 125.79 ? impactSquash(t, 125.79, 0.9) : 1;
  a111Gz(Hh, gazePlan(t, [[0, [700, 360]], [121.0, [880, 420]], [121.5, [520, 360]], [121.8, () => a111Head(M)], [123.3, [660, 790]], [124.3, [400, 200]], [125.0, [660, 790]], [126.5, () => a111Head(M)]], 0.1));
  Hh.after = (c, Q) => { if (t < 121.9) { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Knot(c, m[0], m[1] + 4, 0.8, 0); } else if (t < 122.1) a111Knot(c, Q.HR[0], Q.HR[1] + 4, 0.8, 1); };
  a111Draw(ctx, t, M); a111Desk(ctx, true);
  // the three sacks slide onto the desk one after another; the pearl on its cushion
  [[123.4, 600], [123.62, 650], [123.84, 700]].forEach(([a, x]) => { if (t < a) return; const u = a111B(t, a, 0.3, 'out'); a111Sack(ctx, K.lerp(860, x, u), 792, 0.25, { sq: impactSquash(t, a + 0.3, 0.85) }); });
  if (t > 126.4) { shape(ctx, ell(672, 784, 24, 8, 16), C.red, { lw: 3, seed: 758, dot: C.yellow, pitch: 5, rad: 0.25, da: 0.4 }); a111Pearl(ctx, 672, 772, 11, {}); a111Glow(ctx, 672, 772, 46, a111B(t, 126.45, 0.3) * (1 - 0.5 * a111B(t, 127.0, 0.6)), t, { col: 'white' }); }
  a111Draw(ctx, t, Hh);
}
