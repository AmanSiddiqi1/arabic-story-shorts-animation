// ===== AN-135 S5: inside the girl's house. She kneels on the floor mat; the bowl stands on the floor in front of her (cross-section). =====
const A135_HUT = { palette: 'day', u: 0.26, doorSide: 'left', door: 0.6, window: [360, 420, 120, 110], niche: false, mat: [380, 720], hook: false, jug: null, shelf: null };
const A135_HB = [440, 824];          // v2: bowl moved left of the girl so her chest and arms show          // bowl rim centre (s 1)
const A135_HG = 545;                 // girl x (kneeling)
function a135HutStalk(t) {   // the one stalk she takes: centre, rotation, twist, limp
  if (t < 25.95) return { c: [632, 752], rot: -1.42, twist: 0, limp: 0 };
  if (t < 26.5) { const u = a135B(t, 25.95, 0.55); return { c: a135Mix([628, 760], [A135_HB[0], 784], u), rot: K.lerp(-1.42, 0, u), twist: 0, limp: 0 }; }
  if (t < 30.0) { const tw = kfn(t, [[26.58, 0], [27.2, 0.6], [27.9, 0.6], [28.5, 1]]); return { c: [A135_HB[0], 784 + 2 * Math.sin(t * 20) * pulse(t, 26.58, 0.8)], rot: 0.22 * (Math.sin((t - 26.58) * 9) * pulse(t, 26.58, 0.9) + Math.sin((t - 27.9) * 9) * pulse(t, 27.9, 0.9)), twist: tw, limp: 0 }; }
  const u = a135B(t, 30.0, 0.5); return { c: a135Mix([A135_HB[0], 784], [365, 886], u), rot: 0, twist: 1, limp: 0.6 * u + swing(t, 30.5, 0.15, 3, 4) };
}
function a135HutJug(t) {   // jug centre and tilt
  if (t < 30.6) return { c: [618, 852], tilt: 0 };
  if (t < 31.38) { const u = a135B(t, 30.6, 0.7); return { c: a135Mix([618, 852 + 4 * pulse(t, 30.6, 0.25)], [600, 795], u), tilt: K.lerp(0, -0.3, u) }; }
  if (t < 32.6) return { c: [600, 795], tilt: kfn(t, [[31.38, -0.3], [31.7, -1.1], [32.3, -1.1], [32.6, -0.3]]) };
  const u = a135B(t, 32.6, 0.4); return { c: a135Mix([600, 795], [618, 852], u), tilt: K.lerp(-0.3, 0, u) };
}
function a135HutBowl(t) {
  const fill = kfn(t, [[26.7, 0], [27.05, 0.33], [27.7, 0.33], [28.0, 0.62], [28.6, 0.62], [28.95, 0.9], [31.5, 0.9], [32.5, 1]]);   // v2: three steps to the brim
  const stand = a135B(t, 36.18, 0.75), c = a135Mix(A135_HB, [470, 786], stand);
  return { x: c[0], y: c[1], fill: Math.min(fill, 1), water: kfn(t, [[31.5, 0], [32.5, 1]]), specks: kfn(t, [[33.9, 0], [35.0, 1]]), wob: pulse(t, 26.6, 2.6) * 0.8 + pulse(t, 31.4, 1.2) * 0.8 };
}
function a135HutGirl(t) {
  const P = { x: A135_HG, y: 900, s: A135_GS, costume: 'maiden', seed: 7, dir: -1, kneel: 1 - a135B(t, 36.18, 0.75), noBlink: true };
  const st = a135HutStalk(t), jug = a135HutJug(t), bw = a135HutBowl(t);
  P.hR = a135HT(t, P, [[25.5, A135H.foldR], [25.95, () => ({ w: [st.c[0] - 44, st.c[1] + 2] }), 0.4], [30.4, A135H.rest, 0.4], [36.0, () => ({ w: [a135HutBowl(t).x - 70, a135HutBowl(t).y + 6] }), 0.3]]);
  P.hL = a135HT(t, P, [[25.5, A135H.foldL], [25.74, { w: [626, 770] }, 0.22], [25.95, () => ({ w: [st.c[0] + 44 * Math.cos(st.rot), st.c[1] + 44 * Math.sin(st.rot) - 2] }), 0.15],
    [30.3, A135H.restL, 0.3], [30.6, () => { const j = a135HutJug(t), c = Math.cos(j.tilt), n = Math.sin(j.tilt); return { w: [j.c[0] + 46 * c, j.c[1] + 46 * n] }; }, 0.3],
    [32.7, { w: [615, 760] }, 0.4], [33.72, () => ({ w: [470 + 4 * Math.sin(t * 22) * (t < 35.3 ? 1 : 0), 752] }), 0.3], [35.3, A135H.restL, 0.4], [36.0, () => ({ w: [a135HutBowl(t).x + 70, a135HutBowl(t).y + 6] }), 0.3]]);
  P.gaze = a135Gaze(t, P, [[25.5, [640, 700]], [26.0, [440, 790]], [27.32, [440, 830]], [30.0, [370, 880]], [30.6, [618, 820]], [31.38, [445, 830]], [32.68, [90, 720]], [33.3, [615, 750]],
    [33.72, [450, 830]], [36.2, [450, 830]], [36.7, [90, 760]]], 0.12);
  P.lid = Math.max(a135Tr(t, [[25.5, 0.2], [29.0, 0], [35.4, 1, 0.12], [35.75, 0, 0.12], [36.2, 0.1]]), blink(t, 7));
  P.mouth = a135In(t, 28.95, 30.2) || a135In(t, 32.95, 33.7) || t > 35.8 ? 'smile' : 'closed';
  P.drop = -4 * pulse(t, 35.4, 0.6) + 3 * pulse(t, 30.6, 0.3);
  P.tip = 0.07 * Math.sin((t - 26.58) * 9) * pulse(t, 26.58, 0.9) + 0.07 * Math.sin((t - 27.9) * 9) * pulse(t, 27.9, 0.9) - 0.07 * a135B(t, 32.7, 0.2) * (1 - a135B(t, 33.2, 0.25));
  P.brow = a135Tr(t, [[25.5, 0], [28.95, 0.7, 0.15], [30.4, 0.1, 0.5], [32.7, -0.3, 0.15], [33.3, 0.1, 0.3]]);   // v2: brows up on the brim, wary at the door
  P.look = a135Tr(t, [[25.5, 0], [32.7, -2.5, 0.18], [33.25, 0, 0.25]]);
  P.tilt = a135Tr(t, [[25.5, 0.06], [32.7, -0.2, 0.18], [33.25, 0.05, 0.25]]);
  P.sq = breathe(t, 7) * anticipate(t, 36.0, 0.2, 0.05) * (1 - 0.06 * pulse(t, 26.58, 0.5) - 0.06 * pulse(t, 27.9, 0.5));   // a squeeze on each twist
  return { P, st, jug, bw };
}
function a135Hut(ctx, t, cam) {
  hutRoom(ctx, { ...A135_HUT, t, layer: 'back' });
  seg(ctx, 588, 772, 694, 772, 9, BARKY, 3.5);                                      // a little wall shelf with the powder jar
  const { P, st, jug, bw } = a135HutGirl(t);
  if (t < 32.7 || t > 35.3) shape(ctx, [[604, 772], [626, 772], [630, 750], [622, 740], [608, 740], [600, 750], [604, 772]], '#7a4212', { lw: 3, seed: 12 });
  for (let k = 1; k < 4; k++) a135CanePiece(ctx, 632 + k * 18, 752 + k * 2, { len: 300, w: 22, rot: -1.42 - k * 0.04, lush: 1, s: 0.75 });
  a135Person(ctx, P);
  if (t < 30.0 || t >= 30.0) a135CanePiece(ctx, st.c[0], st.c[1], { len: 220, w: 22, rot: st.rot, twist: st.twist, limp: st.limp, s: 0.75 });
  if (a135In(t, 32.7, 35.3)) shape(ctx, [[P.HL[0] - 10, P.HL[1] + 10], [P.HL[0] + 10, P.HL[1] + 10], [P.HL[0] + 13, P.HL[1] - 10], [P.HL[0] - 13, P.HL[1] - 10]], '#7a4212', { lw: 3, seed: 12 });
  a135Bowl(ctx, bw.x, bw.y, { s: 1, fill: bw.fill, cut: true, specks: bw.specks, water: bw.water, t, wob: bw.wob });
  // juice: the wrung stalk drips into the bowl
  const amt = pulse(t, 26.65, 0.7) + pulse(t, 27.95, 0.7) + pulse(t, 28.55, 0.6);
  a135Stream(ctx, st.c[0], st.c[1] + 8, A135_HB[1] + 56 * (1 - bw.fill), t, amt);
  const sp = a135Jug(ctx, jug.c[0], jug.c[1], { tilt: jug.tilt });
  if (a135In(t, 31.6, 32.4)) a135Pour(ctx, sp, [A135_HB[0] + 10, A135_HB[1] + 6], t, 6, '#5fa0ff', 18);
  if (a135In(t, 33.72, 35.4)) a135Powder(ctx, 470, 762, t - 33.75, { land: A135_HB[1] + 3 });
  a135Aroma(ctx, A135_HB[0], A135_HB[1] - 10, t, a135Fade(t, 35.38, 36.6, 0.3));
}
