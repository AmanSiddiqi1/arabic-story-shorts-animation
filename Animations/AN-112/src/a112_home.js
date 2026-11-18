// ===== AN-112 home: the scholar's room (S2-S9, S16-S17). Abu right of the desk facing left, the Khorasani left facing right =====
// Set: palaceHall merchant variant, ochre wall, no desk stacks, no shelves goods, no curtain (the room must read as poor); desk, shelf, peg and mat by the story.
const A112_PEG = [752, 640];
const a112HomeLate = (t) => t >= 127.88;
// door leaf: knocks jolt it, opens for each entrance and exit
const a112DoorOpen = (t) => a112Tr(t, [[0, 0], [16.0, 1, 0.35], [17.7, 0, 0.45], [44.5, 1, 0.3], [45.7, 0, 0.35], [46.9, 1, 0.3], [49.4, 0, 0.4], [58.9, 1, 0.3], [62.6, 0, 0.45], [78.0, 1, 0.3], [79.0, 0, 0.3],
  [127.8, 1, 0.25], [128.9, 0, 0.35], [130.6, 1, 0.3], [132.2, 0, 0.45]]) + 0.05 * (a112Pulse(t, 14.84, 0.12) + a112Pulse(t, 15.05, 0.12) + a112Pulse(t, 15.26, 0.12) + a112Pulse(t, 58.4, 0.1) + a112Pulse(t, 58.58, 0.1) + a112Pulse(t, 58.76, 0.1) + a112Pulse(t, 129.76, 0.12) + a112Pulse(t, 129.96, 0.12) + a112Pulse(t, 130.16, 0.12));
// time of day in the window
const a112HomeU = (t) => t < 55.92 ? 0.27 : t < 74.5 ? a112Tr(t, [[0, 0.93], [56.74, 1.08, 1.4]]) % 1 : t < 78.78 ? (0.08 + A112B(t, 74.64, 0.6) * 1.0) % 1 : t < 82.4 ? a112Tr(t, [[0, 0.55], [78.78, 0.76, 1.0]]) : 0.3;
const a112Night = (t) => a112In(t, 78.4, 82.4) ? A112B(t, 78.45, 0.6) : 0;

// ---------------- the Khorasani ----------------
const A112_KX = [[0, -80], [16.26, 300, 1.15], [44.55, 30, 1.2], [58.95, 128, 0.01], [61.56, 300, 0.85], [78.1, 30, 0.68], [130.76, 300, 1.1], [149.74, 410, 0.45]];
const a112KX = (t) => a112Tr(t, A112_KX);
const a112KStaff = (t) => a112In(t, 16.0, 20.0) || a112In(t, 44.3, 61.9) || a112In(t, 78.1, 80);
const A112_KPALM = [446, 772];   // the open palm (S7 and S16 share it)
const A112_KPALM2 = [482, 772];   // S17: the same palm, same height, a little further along the desk (clear of the purse he set down)
const A112_HANG = { a: [0.1, 0.04] }, A112_HANGL = { a: [-0.06, -0.02] };   // arms hanging loose (grief, listening)
// S17: the single purse on the desk: Abu slides it across (133.26), the Khorasani sets it on his end (392), pushes it to Abu, Abu pushes it back, the hard push bumps Abu's belly
const a112SlideX = (t) => a112Tr(t, [[0, 520], [133.26, 466, 1.0]]);
const a112LPX = (t) => a112Tr(t, [[0, 392], [147.48, 530, 0.35], [148.0, 455, 0.3], [148.52, 566, 0.25]]);
function a112Khor(t) {
  const late = a112HomeLate(t), W = a112Walk(a112KX, t, 24);
  const P = { costume: 'merchant', pal: A112_KHOR, s: 1.15, y: 900, seed: 44, ...W };
  if (P.amp < 0.04) P.amp = 0;
  P.dir = a112In(t, 44.55, 45.9) || a112In(t, 78.1, 79) ? -1 : 1;
  P.hidden = P.x < 60 || (a112In(t, 45.9, 58.9)) || (a112In(t, 79.0, 130.6));
  if (a112KStaff(t)) P.hold = 'stick';
  // posture: warm and upright the first time, heavy and low the second
  const sad = a112In(t, 58.9, 70.2) || a112In(t, 130.6, 133.2);
  P.drop = (sad ? 8 : 0) + a112Nods(t, [33.45, 33.8, 41.0, 77.9, 78.3], 0.3, 7) + 10 * a112Win(t, 64.4, 65.3, 0.2) + 8 * a112Win(t, 139.3, 141.4, 0.3) - 6 * a112Win(t, 149.28, 149.8, 0.15);
  P.tip = 0.08 * a112Win(t, 62.2, 66.5, 0.4) + 0.06 * a112Win(t, 21.14, 22.6, 0.2) + 0.1 * a112Win(t, 40.04, 41.0, 0.25) - 0.04 * a112Win(t, 26.3, 27.8, 0.2) + 0.05 * a112Win(t, 147.48, 148.0, 0.12) + 0.08 * a112Win(t, 148.52, 149.0, 0.12) + 0.06 * a112Win(t, 68.14, 70.0, 0.3) + 0.06 * a112Win(t, 131.98, 134.5, 0.3);
  P.sq = breathe(t, 4) * anticipate(t, 23.2, 1.0, 0.05) * (1 + 0.03 * Math.sin((t - 29.52) * 40) * a112Win(t, 29.52, 29.9, 0.05)) * (1 + 0.02 * Math.sin((t - 139.3) * 30) * a112Win(t, 139.3, 139.7, 0.05)) * landSquash(t, 17.4, 0.05) * landSquash(t, 62.4, 0.05) * (1 - 0.06 * a112Win(t, 62.2, 66.5, 0.4));
  P.look = a112Tr(t, [[0, 0], [26.3, -1, 0.15], [26.8, 1, 0.2], [27.3, 0, 0.2], [142.56, -1, 0.3], [143.2, 0.6, 0.4], [143.8, 0, 0.3], [144.56, -0.8, 0.2], [144.8, 0.8, 0.2], [145.05, 0, 0.2], [149.28, -0.9, 0.25], [149.95, 0, 0.3]]);
  P.tilt = 0.1 * a112Win(t, 34.12, 35.3, 0.2) - 0.08 * a112Win(t, 138.4, 139.2, 0.2);
  // face
  P.talk = talk(t, [[21.14, 23.1], [30.18, 31.2], [32.2, 34.1], [34.3, 36.4], [37.6, 38.9], [40.04, 41.2], [61.6, 62.3], [63.0, 64.3], [65.3, 66.5], [68.14, 68.8], [69.38, 70.1], [140.64, 141.3], [142.0, 142.5], [145.9, 146.6]], 0.7) * 0.75;
  P.mouth = a112In(t, 16.26, 23.1) || a112In(t, 30.18, 41.4) || a112In(t, 44.3, 45.7) || a112In(t, 147.48, 148.5) || a112In(t, 149.9, 151) ? 'smile' : a112In(t, 59.0, 66.5) || a112In(t, 139.26, 141.0) || a112In(t, 145.2, 145.9) ? 'frown' : a112In(t, 138.38, 139.26) || a112In(t, 134.56, 135.3) ? 'o' : 'closed';
  P.brow = a112Tr(t, [[0, -0.3], [26.3, -0.6, 0.2], [29.6, -0.2], [34.12, -0.4], [35.4, -0.2], [59, -0.5], [62.2, -0.6], [68.14, -0.2], [70.2, 0], [77.4, 0.4, 0.2], [78.0, 0], [131.98, 0.2], [138.38, -0.7, 0.2], [139.26, -0.6], [145.2, -0.5], [148.52, 0.4, 0.15], [149.74, -0.3, 0.3]]);
  P.wet = a112In(t, 59.0, 66.6) || a112In(t, 139.0, 151);
  let lid = 0.4 * a112Win(t, 59.0, 66.5, 0.3) + 0.5 * a112Win(t, 68.14, 70.1, 0.3) + 0.9 * a112Win(t, 64.45, 64.95, 0.15) + 0.2 * a112Win(t, 32.2, 33.2, 0.2) + 0.3 * a112Win(t, 36.6, 37.7, 0.2) + 0.3 * a112Win(t, 130.7, 133.0, 0.3) + 0.4 * a112Win(t, 139.26, 141.4, 0.3) + 0.5 * a112Win(t, 144.5, 145.2, 0.2)
    + 1.0 * a112Win(t, 140.8, 141.2, 0.1) + 1.0 * a112Win(t, 149.28, 149.8, 0.1) + 0.9 * a112Pulse(t, 77.75, 0.35);
  lid = Math.max(lid, blink(t, 44)); P.lid = Math.min(1, lid);
  if (a112In(t, 149.74, 150.15)) { P.wink = 'L'; P.lid = 0; }
  // gaze
  const AH = () => a112Head(a112Abu(t, true)), cloud = [500, 330];
  P.gaze = a112Look(t, P, [[0, AH], [20.3, [520, 300]], [21.14, AH], [23.2, [300, 780]], [24.36, [495, 690]], [24.9, AH], [26.3, [100, 700]], [26.8, [600, 650]], [27.3, AH], [30.18, AH],
    [36.5, cloud], [37.5, AH], [44.4, [130, 700]], [45.3, [700, 680]], [59.0, [600, 860]], [61.56, [400, 860]], [62.2, [420, 880]], [63.76, [640, 320]], [64.38, [440, 880]], [65.6, AH], [67.38, [270, 890]], [68.14, AH], [69.38, A112_KPALM], [69.9, AH],
    [77.3, [760, 330]], [77.7, AH], [78.1, [100, 760]], [130.76, [400, 880]], [131.98, AH], [133.5, A112_KPALM], [134.56, A112_KPALM], [135.5, AH], [137.62, [700, 360]], [138.0, [400, 720]], [138.6, AH],
    [139.26, [430, 760]], [140.0, AH], [142.56, [340, 450]], [142.9, [830, 890]], [143.4, [620, 560]], [143.9, AH], [145.2, (tt) => a112HandW(a112Khor(Math.min(tt, 145.19)), 'R')], [145.9, AH], [147.4, () => [a112LPX(t), 720]], [148.1, AH], [149.28, [150, 600]], [149.74, AH]], 0.16);
  // arms (R near the visitor's front; he faces +x)
  const R = [[0, A112H.rest], [16.0, [44, -100], 0.2], [20.0, A112H.rest, 0.3], [20.3, A112H.up, 0.25], [21.14, A112H.mouth, 0.25], [22.6, A112H.rest], [23.2, [12, -112], 0.35],
    [24.0, { w: [470, 700] }, 0.3], [24.5, A112H.rest, 0.4], [26.3, [10, -100], 0.25], [29.52, { w: [470, 704] }, 0.25], [30.18, { w: [540, 712] }, 0.8], [31.2, A112H.rest, 0.3], [32.2, { w: [535, 690] }, 0.3], [32.9, A112H.palm, 0.3],
    [33.4, A112H.chest, 0.15], [34.12, A112H.up, 0.25], [35.4, A112H.rest, 0.3], [36.6, A112H.palm, 0.3], [37.7, A112H.rest, 0.3], [40.04, [92, -132], 0.3], [41.3, A112H.rest, 0.3], [44.3, [44, -100], 0.2], [44.5, A112H.wave, 0.2], [45.2, [44, -100], 0.3],
    [59.0, [44, -100]], [61.9, A112_HANG, 0.3], [62.2, A112H.chest, 0.4], [65.3, [24, -196], 0.25], [65.8, A112_HANG, 0.4], [68.14, { w: A112_KPALM }, 0.4], [70.4, A112H.rest, 0.4], [76.0, A112H.hip, 0.4], [78.1, [44, -100], 0.2],
    [130.6, A112_HANG], [131.98, { w: A112_KPALM }, 0.4], [134.56, { w: [A112_KPALM[0], A112_KPALM[1] + 16] }, 0.1], [134.8, { w: A112_KPALM }, 0.3], [135.4, [30, -100], 0.4],
    [138.0, { w: [400, 772] }, 0.35], [138.6, A112_HANG, 0.4], [140.64, [24, -196], 0.25], [141.3, A112_HANG, 0.35],
    [144.4, { w: A112_KPALM2 }, 0.4], [145.5, A112H.chest, 0.4], [147.25, (tt) => ({ w: [a112LPX(tt) - 42, 772] }), 0.2],
    [148.95, A112H.foldR, 0.3], [149.74, (tt) => ({ w: a112W(a112Abu(tt, true), [30, -146]) }), 0.4]];
  const L = [[0, A112H.restL], [17.92, [-24, -136], 0.2], [18.5, A112H.restL, 0.3], [23.2, [-12, -112], 0.35], [24.0, { w: [450, 704] }, 0.3], [24.5, A112H.restL, 0.4], [26.3, [-4, -98], 0.25], [29.52, A112H.restL, 0.3],
    [32.2, { w: [470, 700] }, 0.3], [32.9, A112H.palmL, 0.3], [33.4, A112H.restL, 0.3], [36.6, A112H.palmL, 0.3], [37.7, A112H.restL, 0.3], [61.9, A112_HANGL, 0.4], [67.2, [-30, -150], 0.15], [67.5, A112_HANGL, 0.3],
    [70.4, A112H.restL, 0.35], [76.0, A112H.hipL, 0.4], [78.1, A112H.restL, 0.3],
    [130.6, A112_HANGL], [135.4, [-8, -98], 0.4], [138.0, { w: [376, 772] }, 0.35], [138.6, A112_HANGL, 0.4], [148.95, A112H.foldL, 0.3]];
  P.aR = a112Arm(t, P, 1, R); P.aL = a112Arm(t, P, -1, L);
  // the staff taps twice (17.92, 18.3)
  P.staffY = 6 * (a112Pulse(t, 17.92, 0.18) + a112Pulse(t, 18.3, 0.18));
  P.bundle = !late && t < 67.38;
  return P;
}
function a112DrawKhor(ctx, t, P) {
  if (P.hidden) return;
  const late = a112HomeLate(t);
  if (P.bundle) { const b = a112W(P, [-44, -150]), bob = swing(t, 17.4, 4, 2.2, 3) + swing(t, 62.4, 3, 2.2, 3) + (P.amp > 0 ? 3 * Math.abs(Math.sin(P.ph)) : 0); a112Bundle(ctx, b[0] - 6 * (P.dir || 1), b[1] + bob, 1.05); }
  person(ctx, P);
  if (P.bundle) { const sh = a112W(P, [-26, -146]), hip = a112W(P, [18, -96]); seg(ctx, sh[0], sh[1], hip[0], hip[1], 7, C.red, 2.5); }
}

// ---------------- Abu Hassan at home ----------------
function a112Abu(t, light = false) {   // light: position only; 'arms': no gaze
  const late = a112HomeLate(t);
  const P = { costume: 'physician', age: 0.55, s: 1.15, dir: -1, seed: 31, pal: { head: 'none' }, seat: 'stool', y: 900 };
  if (!late) {
    if (t < 55.6) { P.x = 690; P.sit = a112Tr(t, [[0, 1], [17.3, 0, 0.45], [45.0, 1, 0.4]]); P.amp = 0; }
    else if (t < 61.56) { P.x = 735; P.lie = a112Tr(t, [[0, 1], [59.92, 0, 0.25]]); P.y = K.lerp(900, 886, P.lie); }
    else if (t < 78.78) Object.assign(P, a112Walk((tt) => a112Tr(tt, [[0, 650], [65.0, 628, 0.45], [69.6, 650, 0.4]]), t, 24));
    else { P.x = 800; P.dir = 1; P.lie = 1; P.y = 886 - 12 * a112Pulse(t, 80.9, 0.5); P.tilt = 0.5 * a112Pulse(t, 80.9, 0.5); }   // S9: head toward the window light
  } else Object.assign(P, a112Walk((tt) => a112Tr(tt, [[0, 190], [127.88, 640, 1.1], [140.04, 615, 0.5], [149.74, 592, 0.4]]), t, 24));
  if (P.amp < 0.04) P.amp = 0;
  if (light === true) return P;
  const lying = (P.lie || 0) > 0.01;
  // body: squash and stretch on the big beats
  P.sq = breathe(t, 7) * anticipate(t, 17.15, 0.15, 0.06) * landSquash(t, 45.4, 0.06) * (a112In(t, 43.54, 44.4) ? 0.93 + 0.07 * A112B(t, 43.9, 0.5) : 1)
    * (a112In(t, 59.92, 60.6) ? 1 + 0.12 * a112Pulse(t, 59.92, 0.6) : 1) * (1 - 0.06 * a112Win(t, 6.74, 8.1, 0.3)) * (1 - 0.08 * a112Win(t, 78.1, 78.8, 0.15))
    * (1 + 0.04 * a112Pulse(t, 25.3, 0.6)) * (1 + 0.04 * a112Pulse(t, 128.0, 0.5)) * (1 - 0.08 * a112Pulse(t, 66.85, 0.45)) * (1 - 0.06 * a112Pulse(t, 148.7, 0.35));
  P.tip = 0.12 * a112Win(t, 17.6, 18.4, 0.2) + 0.07 * a112Win(t, 35.36, 37.6, 0.3) + 0.06 * a112Win(t, 21.9, 23.0, 0.2) + 0.1 * a112Win(t, 41.32, 42.2, 0.2) - 0.05 * a112Win(t, 148.6, 149.0, 0.1) + 0.06 * a112Win(t, 149.74, 150.7, 0.3) + 0.05 * a112Win(t, 139.5, 147.2, 0.4);
  P.drop = a112Nods(t, [41.5, 129.5], 0.4, 10) + 6 * a112Win(t, 39.3, 39.6, 0.08) + 6 * a112Win(t, 64.6, 65.2, 0.2) + 6 * a112Win(t, 14.2, 15.1, 0.2) - 4 * a112Win(t, 133.6, 134.6, 0.2);
  P.look = a112Tr(t, [[0, 0], [45.1, 0.5, 0.15], [45.5, -0.6, 0.15], [45.9, 0, 0.15], [46.0, -0.8, 0.15], [46.3, 0, 0.15], [70.14, 0.7, 0.07], [70.35, -0.7, 0.07], [70.55, 0.6, 0.07], [70.8, 0, 0.1]]);
  P.tilt = (P.tilt || 0) - 0.12 * a112Win(t, 75.08, 76.6, 0.25) + 0.08 * a112Win(t, 136.36, 137.5, 0.2) + 0.05 * Math.sin((t - 50.68) * 2.6) * a112Win(t, 50.9, 54.6, 0.4);
  if (a112In(t, 13.2, 14) || a112In(t, 70.14, 71.3) || a112In(t, 60.84, 61.56)) P.x += tremble(t, 1.5, 11);
  // face
  P.talk = talk(t, [[31.3, 31.9], [72.34, 74.0], [74.64, 75.0], [75.2, 76.4], [76.72, 77.5], [133.3, 133.9], [136.36, 139.2], [148.0, 148.4]], 0.4) * 0.75;
  P.mouth = a112In(t, 17.3, 21.0) || a112In(t, 50.68, 55.3) || a112In(t, 56, 58.4) || a112In(t, 71.38, 78.1) || a112In(t, 127.88, 136.3) || a112In(t, 149.74, 151) ? 'smile'
    : a112In(t, 25.3, 26.3) || a112In(t, 31.28, 32.2) || a112In(t, 60.84, 61.56) || a112In(t, 148.0, 148.5) ? 'o' : a112In(t, 6.74, 8.1) || a112In(t, 78.2, 82.4) || a112In(t, 62.44, 66.6) ? 'frown' : 'closed';
  P.brow = a112Tr(t, [[0, -0.3], [14.2, 0.2, 0.2], [15.22, -0.6, 0.15], [16.3, -0.3], [21.9, -0.4], [24.36, -0.8, 0.1], [26.3, -0.3], [31.28, -0.6, 0.15], [32.4, -0.3], [39.2, -0.5], [41.32, -0.6], [42.4, -0.3],
    [46.0, 0.2], [50.68, -0.2], [62.44, -0.5], [64.6, -0.7], [66, -0.4], [70.14, -0.8], [75.08, 0.3], [76.4, -0.4], [78.1, -0.8], [128, -0.2], [136.36, -0.6], [137.6, -0.3], [140.04, -0.7], [141.5, -0.4], [148.0, -0.7], [149.74, -0.5]]);
  P.eyes = a112In(t, 24.36, 26.3) || a112In(t, 59.92, 61.56) || a112In(t, 71.38, 72.3) || a112In(t, 148.0, 148.5) ? 'wide' : 'open';
  let lid = 0.3 * a112Win(t, 5.0, 5.8, 0.2) + 0.4 * a112Win(t, 14.2, 15.1, 0.2) + 0.6 * a112Win(t, 50.68, 54.6, 0.3) + 1.0 * a112Win(t, 143.85, 144.35, 0.15) + 0.3 * a112Win(t, 119, 120, 0.3) + 0.4 * a112Win(t, 64.6, 65.2, 0.2) + 0.2 * a112Win(t, 75.08, 76.2, 0.2) + 0.3 * a112Win(t, 149.74, 150.8, 0.3);
  if (t > 55.0 && t < 58.5) lid = 1;   // asleep (from the yawn under the card to the knock)
  if (a112In(t, 79.62, 81.3)) P.noBlink = true; else if (P.eyes !== 'wide') lid = Math.max(lid, blink(t, 31));
  P.lid = Math.min(1, lid); if (P.lid <= 0) delete P.lid;
  if (a112In(t, 58.5, 59.92)) { P.wink = 'L'; P.lid = 0; }
  P.wet = a112In(t, 141.5, 151);
  // gaze
  if (light !== 'arms') {
  const KH = () => a112Head(a112Khor(t)), door = [130, 700], bills = [575, 780], purse = () => { const q = a112PurseState(t); return [q.x, q.y + 40]; };
  P.gaze = a112Look(t, P, [[0, KH], [14.2, bills], [15.22, door], [16.0, door], [16.3, KH], [18.82, [500, 300]], [20.3, KH], [24.36, purse], [24.7, [560, 690]], [25.6, [540, 788]], [26.3, KH], [31.28, KH],
    [35.36, (tt) => a112HandW(a112Khor(tt), 'R')], [36.5, [500, 330]], [37.5, KH], [38.98, purse], [39.5, bills], [39.8, purse], [40.1, KH], [43.54, purse], [44.44, KH], [45.1, purse], [45.45, door], [45.8, bills], [46.24, purse],
    [47.42, [180, 720]], [48.8, [880, 760]], [50.12, [920, 720]], [50.68, purse], [52.0, [500, 330]], [58.5, door], [60.84, A112_PEG], [61.1, door], [61.3, A112_PEG], [61.56, KH], [64.6, [450, 880]], [65.6, KH], [66.6, A112_PEG], [67.3, KH],
    [70.14, [400, 600]], [70.3, [800, 700]], [70.45, [300, 800]], [70.6, A112_PEG], [71.38, KH], [74.2, [560, 400]], [75.08, [820, 330]], [77.6, KH], [78.1, door], [78.9, [600, 560]], [79.62, [560, 640]], [80.5, [440, 800]], [80.75, [880, 800]],
    [81.0, [660, 520]], [81.3, [700, 700]], [127.88, KH], [128.0, [500, 700]], [130.0, door], [131.98, KH], [133.26, purse], [134.0, KH], [136.36, [620, 420]], [137.62, KH], [140.04, KH], [147.6, purse], [148.6, KH], [148.95, purse], [149.5, KH]], 0.14);
  }
  // arms (dir -1: local +x is toward the visitor)
  const R = [[0, A112H.rest], [14.2, { w: [575, 778] }, 0.3], [15.22, { w: [575, 786] }, 0.12], [15.5, A112H.rest, 0.3], [17.3, A112H.chest, 0.3], [18.6, A112H.rest, 0.4], [21.9, A112H.ear, 0.3], [23.0, A112H.rest, 0.3],
    [31.28, A112H.chest, 0.2], [32.2, A112H.rest, 0.3], [39.5, { w: [585, 786] }, 0.15], [39.8, A112H.rest, 0.25], [41.32, A112H.chest, 0.2], [42.4, A112H.rest, 0.3], [43.54, { w: [532, 708] }, 0.25], [43.9, [40, -98], 0.4],
    [46.24, [34, -96], 0.2], [47.42, [96, -150], 0.12], [47.6, [40, -96], 0.15], [47.8, [96, -150], 0.12], [48.0, [40, -96], 0.15], [48.8, [-40, -150], 0.15], [49.05, [36, -96], 0.15], [49.3, [-40, -150], 0.12], [49.5, [36, -96], 0.15],
    [50.68, A112H.chin, 0.35], [55.0, A112H.rest, 0.4], [60.84, A112H.head, 0.12], [61.3, A112H.rest, 0.3], [62.44, A112H.mouth, 0.3], [64.38, A112H.chest, 0.35], [66.3, A112H.rest, 0.4],
    [70.5, { w: [748, 650] }, 0.18], [70.75, [-58, -104], 0.3], [78.4, A112H.rest, 0.4],
    [127.88, [24, -106]], [129.0, { w: [545, 770] }, 0.3], [129.4, [10, -130], 0.12], [129.55, [24, -126], 0.1], [129.7, [10, -130], 0.1], [130.0, A112H.hip, 0.3],
    [133.26, (tt) => ({ w: [a112SlideX(tt) + 36, 764] }), 0.3], [134.3, [30, -112], 0.3], [135.38, [104, -150], 0.35], [137.62, A112H.chest, 0.4], [139.0, PERSON_HANDS.clasp.R, 0.5],
    [148.0, (tt) => ({ w: [a112LPX(tt) + 38, 770] }), 0.15], [148.4, [30, -118], 0.12], [148.75, [24, -90], 0.2]];
  const L = [[0, A112H.restL], [14.2, A112H.head, 0.3], [15.22, { w: [565, 786] }, 0.12], [15.5, A112H.restL, 0.3], [43.54, { w: [470, 708] }, 0.25], [43.9, [-4, -98], 0.4], [46.24, [18, -92], 0.25], [47.0, [20, -84], 0.2],
    [50.68, [20, -84], 0.2], [50.9, [20, -76], 0.1], [51.1, [20, -84], 0.1], [51.3, [20, -76], 0.1], [51.5, [20, -84], 0.1], [60.84, A112H.headL, 0.12], [61.3, A112H.restL, 0.3], [64.6, A112H.restL],
    [72.34, [64, -112], 0.2], [72.55, [64, -100], 0.12], [72.75, [64, -112], 0.12], [72.95, [64, -100], 0.12], [73.15, [64, -112], 0.12], [74.2, { w: [560, 560] }, 0.3], [75.08, A112H.restL, 0.4],
    [127.88, [-14, -106]], [129.0, { w: [505, 770] }, 0.3], [129.4, [-10, -130], 0.12], [129.55, [-24, -126], 0.1], [129.7, [-10, -130], 0.1], [130.0, A112H.hipL, 0.3],
    [133.26, (tt) => ({ w: [a112SlideX(tt) + 4, 768] }), 0.3], [134.3, [-6, -112], 0.3], [135.38, [92, -140], 0.35], [137.0, [6, -104], 0.4], [139.0, PERSON_HANDS.clasp.L, 0.5],
    [148.0, (tt) => ({ w: [a112LPX(tt) + 14, 770] }), 0.15], [148.4, [-4, -118], 0.12], [148.75, [6, -92], 0.2]];
  if (!lying) { P.aR = a112Arm(t, P, 1, R); P.aL = a112Arm(t, P, -1, L); }
  else { P.pal = { head: 'smallTurban' }; }
  // the scholar's turban: crooked by default, straight in S16-S17, jumps off at 60.84, slips in the fluster at 70.14
  P.hat = late ? { dx: 0, dy: 0, rot: 0 } : { dx: a112Tr(t, [[0, 6], [70.14, 11, 0.3]]), dy: -70 * a112Pulse(t, 60.84, 0.5) + 6 * a112Win(t, 70.14, 72, 0.2), rot: a112Tr(t, [[0, -0.14], [60.84, -0.42, 0.45], [62.44, -0.12, 0.5], [70.14, -0.3, 0.3]]) - 0.6 * a112Pulse(t, 60.84, 0.5), tail: swing(t, 17.6, 0.6) + swing(t, 41.4, 0.5) };
  return P;
}
function a112DrawAbu(ctx, t, P) {
  if ((P.lie || 0) > 0.01) { person(ctx, P); return; }
  person(ctx, P); a112Hat(ctx, P, 'scholar', P.hat || {});
}

// ---------------- the purse: one state function (owner, position, fill, open, bow) ----------------
// fill 1 until 46.24, falls to 0 by 55.0; three new full purses from 127.88 (the first one is the deposit returned)
function a112PurseFill(t) { if (t < 46.24) return 1; if (t < 127) return 1 - K.clamp((t - 47.2) / 7.5); return 1; }
function a112PurseState(t) {
  const deskY = (s) => A112_DESK.top - 112 * s, s = 0.85, Q = { s, fill: a112PurseFill(t), open: 0, bow: 0, rot: 0, sq: 1, sw: 0, show: true, glow: 0 };
  const pl = (p) => { Q.x = p[0]; Q.y = p[1]; };
  const kh = () => { const K0 = a112Khor(t); return [(a112HandW(K0, 'R')[0] + a112HandW(K0, 'L')[0]) / 2, (a112HandW(K0, 'R')[1] + a112HandW(K0, 'L')[1]) / 2]; };
  const ah = () => { const A0 = a112Abu(t, 'arms'); return [(a112HandW(A0, 'R')[0] + a112HandW(A0, 'L')[0]) / 2, (a112HandW(A0, 'R')[1] + a112HandW(A0, 'L')[1]) / 2]; };
  if (t < 23.9) Q.show = false;
  else if (t < 24.36) { const h = kh(); pl([h[0], h[1] - 10]); }
  else if (t < 26.3) { pl([495, deskY(s)]); Q.sq = impactSquash(t, 24.36, 0.8); }
  else if (t < 29.6) { const h = kh(); pl([h[0] + 10, h[1] - 12]); }
  else if (t < 30.18) pl([462, deskY(s)]);
  else if (t < 43.54) { pl([K.lerp(462, 520, A112B(t, 30.18, 0.85)), deskY(s)]); Q.sw = swing(t, 31.0, 0.3) + swing(t, 39.3, 0.25); Q.bow = A112B(t, 38.98, 0.5, 'lin'); }
  else if (t < 55.3) { const hb = ah(), hl = a112HandW(a112Abu(t, 'arms'), 'L'), k = A112B(t, 46.24, 0.4), h = [K.lerp(hb[0], hl[0] - 6, k), K.lerp(hb[1], hl[1], k)], u = A112B(t, 43.54, 0.3);   // from 46.24 it rests in the left hand at lap height
    pl([K.lerp(520, h[0], u), K.lerp(deskY(s), h[1] - 8, u)]); Q.bow = t < 46.24 ? 1 : 0; Q.sw = swing(t, 43.9, 0.4) + swing(t, 47.42, 0.3) + swing(t, 48.8, 0.3) + swing(t, 54.7, 0.5, 1.6); Q.open = A112B(t, 46.24, 0.4); Q.glow = Q.open * (Q.fill > 0.1 ? 1 : 0.2); Q.rayK = 0.6; Q.flop = 1; }
  else if (t < 70.5) { pl([A112_PEG[0] + 4, A112_PEG[1] + 6]); Q.sw = swing(t, 58.4, 0.35, 1.6) + swing(t, 60.84, 0.2, 1.6); }
  else if (t < 78.78) { const A0 = a112Abu(t, 'arms'), h = a112HandW(A0, 'R'); pl([h[0], h[1] - 4]); Q.sw = swing(t, 70.8, 0.8, 1.8, 2) + swing(t, 72.34, 0.4, 1.8) + swing(t, 75.08, 0.5, 1.8); Q.flop = 1; }
  else if (t < 82.4) { pl([A112_PEG[0] + 4, A112_PEG[1] + 6]); Q.fill = 0; }
  else if (t < 127.88) Q.show = false;
  else if (t < 129.0) { const h = ah(); pl([h[0] - 10, h[1] - 10]); }   // Abu carries ONE purse home (the deposit)
  else if (t < 133.26) pl([520, deskY(s)]);
  else if (t < 134.3) pl([a112SlideX(t), deskY(s)]);   // slid across the desk with both hands
  else if (t < 134.56) { const u = A112B(t, 134.3, 0.26); pl([K.lerp(466, A112_KPALM[0] + 4, u), K.lerp(deskY(s), A112_KPALM[1] - 92, u)]); }
  else if (t < 138.0) { const h = t < 135.4 ? [A112_KPALM[0], A112_KPALM[1] + 18 * a112Pulse(t, 134.56, 0.4) - 92] : (() => { const k0 = kh(); return [k0[0] + 6, k0[1] - 14]; })(); pl([h[0] + 4, h[1]]); Q.sq = impactSquash(t, 134.56, 0.85); }
  else if (t < 138.5) { const k0 = kh(), u = A112B(t, 138.0, 0.45); Q.s = K.lerp(s, 0.72, u); pl([K.lerp(k0[0] + 10, 392, u), K.lerp(k0[1] - 14, deskY(Q.s), u)]); }   // set down on HIS end of the desk
  else if (t < 148.95) { Q.s = 0.72; pl([a112LPX(t), deskY(Q.s)]); Q.sw = swing(t, 147.6, 0.3) + swing(t, 148.1, 0.3) + swing(t, 148.7, 0.4); Q.sq = impactSquash(t, 148.72, 0.75); }
  else { const h = ah(); Q.s = 0.72; pl([h[0], h[1] - 10]); Q.sq = impactSquash(t, 148.95, 0.9); }   // Abu holds it at belt height
  return Q;
}
function a112DrawPurse(ctx, t, Q) { if (!Q.show) return; a112Purse(ctx, Q.x, Q.y, Q); }
// the other two purses of S16 (stacked on the desk at 129.0)
// v2: the other two gift purses sit quietly on the floor by the mat (the fresh start), away from every face
function a112ExtraPurses(ctx, t) {
  if (!a112In(t, 127.88, 150.8)) return;
  a112Purse(ctx, 905, 900 - 116 * 0.7, { s: 0.7 }); a112Purse(ctx, 962, 900 - 116 * 0.62, { s: 0.62, rot: 0.06 });
}

// ---------------- other people in the doorway and at the window (S5) ----------------
function a112ShopsAtDoor(t) {   // only their upper bodies lean in at the door
  const k = A112B(t, 47.0, 0.4) * (1 - A112B(t, 49.0, 0.4));
  return [{ x: 150 + 40 * k, y: 900, s: 1.0, dir: 1, costume: 'beanSeller', seed: 51, mouth: 'smile', tip: 0.08 * k, alpha: 1, gaze: [1, -0.2], handR: [70, -150], vis: k },
    { x: 95 + 45 * k, y: 900, s: 1.08, dir: 1, costume: 'carpenter', seed: 52, mouth: t > 48.2 ? 'smile' : 'closed', tip: 0.05 * k, gaze: [1, -0.1], handR: t > 48.2 ? A112H.mouth : [70, -150], vis: k }];
}
function a112Family(t) {
  const wx = a112Tr(t, [[0, 1080], [48.8, 870, 0.8], [51.5, 1080, 1.2]]), cx = a112Tr(t, [[0, 1100], [49.3, 945, 0.7], [51.6, 1120, 1.2]]);
  const Wf = { costume: 'villageWoman', s: 1.0, seed: 61, dir: -1, ...a112Walk((tt) => a112Tr(tt, [[0, 1080], [48.8, 870, 0.8], [51.5, 1080, 1.2]]), t, 24), y: 900 };
  Wf.dir = t > 51.5 ? 1 : -1; Wf.brow = t < 49.4 ? 0.5 : -0.3; Wf.mouth = t > 49.4 ? 'smile' : 'closed'; Wf.handR = [60, -110]; Wf.gaze = lookAt([wx, 700], t < 49.4 ? [690, 760] : [wx - 30, 820]);
  const hop2 = hop(t, 50.12, 0.28, 0, 0, 22)[1] + hop(t, 50.42, 0.28, 0, 0, 22)[1];
  const Ch = { costume: 'servant', child: true, pal: { robe: C.blue, dot: NAVY, hc: C.yellow }, s: 1.0, seed: 62, dir: -1, ...a112Walk((tt) => a112Tr(tt, [[0, 1100], [49.3, 945, 0.7], [51.6, 1120, 1.2]]), t, 20), y: 900 - hop2 };
  Ch.dir = t > 51.6 ? 1 : -1; Ch.mouth = a112In(t, 50.0, 51.0) ? 'open' : 'smile'; Ch.handR = t > 49.9 ? A112H.raise : [40, -90]; Ch.handL = t > 49.9 ? A112H.raiseL : [-40, -90]; Ch.gaze = [0, -1];
  return { Wf, Ch, show: a112In(t, 48.7, 52.8) };
}

// ---------------- draw the room ----------------
function a112Home(ctx, t, cam) {
  const late = a112HomeLate(t), u = a112HomeU(t), night = a112Night(t), Kp = a112Khor(t), Ap = a112Abu(t), Q = a112PurseState(t);
  const S5 = a112In(t, 46.8, 52.8);
  palaceHall(ctx, { variant: 'merchant', wall: 'ochre', desk: false, shelves: [], lamps: [], stools: [], u, doorOpen: a112DoorOpen(t), t,
    behind: (c) => { if (S5) a112ShopsAtDoor(t).forEach((P) => { if (P.vis > 0.01) person(c, P); }); } });
  a112HomeExtras(ctx, t);
  if (S5) for (const P of a112ShopsAtDoor(t)) { if (P.vis <= 0.01) continue; }   // (drawn behind the wall through the door)
  // staff leaning on the wall
  if (!late && !a112KStaff(t) && t > 19.9 && t < 80) { seg(ctx, 226, 902, 262, 760, 13, '#c58a18', 4.5); shape(ctx, ell(264, 755, 14, 14, 10), '#c58a18', { lw: 4 }); }
  // dropped bundle
  if (!late && t >= 67.38) { const u2 = A112B(t, 67.38, 0.25, 'in'), b0 = a112W(Kp, [-44, -150]); a112Bundle(ctx, t < 67.63 ? K.lerp(b0[0], 250, u2) : 250, t < 67.63 ? K.lerp(b0[1], 872, u2) : 872, 1.05, impactSquash(t, 67.63, 0.75)); if (t < 68.2) dustBurst(ctx, 250, 898, t - 67.63, 6, 8, 16, 40, 0.5, 9); }
  a112Desk(ctx, t, 6 * impactSquash(t, 24.36, 0) * 0 + 5 * a112Pulse(t, 24.36, 0.2));
  // desk things: the two bills under the reading scroll, the lamp
  if (!late) { const pk = 14 * a112Win(t, 39.2, 39.55, 0.08); a112Scroll(ctx, 560 + pk, 782, { s: 0.6, L: 100, w: 70, rot: -1.45, lines: true }); a112Scroll(ctx, 570, 788, { s: 0.6, L: 110, rot: -1.6, stamp: t > 48.0 ? 1 : 0 }); }
  a112DeskLamp(ctx, 425, A112_DESK.top, late || t < 55.3 ? (night > 0 ? 0.3 : 0) : 0, t);
  // people: the family by the window, the visitor, Abu
  if (S5) { const F = a112Family(t); if (F.show) { a112Basket(ctx, a112HandW(F.Wf, 'R')[0] - 10, a112HandW(F.Wf, 'R')[1] + 30, K.clamp((t - 49.2) / 0.9), 0.9); person(ctx, F.Wf); person(ctx, F.Ch); if (t > 49.9) a112Loaf(ctx, a112HandW(F.Ch, 'R')[0] - 14, a112HandW(F.Ch, 'R')[1] - 10, 0.9); } }
  a112ExtraPurses(ctx, t);
  a112DrawKhor(ctx, t, Kp);
  // the open palm (S7 demand) and the same palm closing into a fist (S17, 145.2)
  if (Q.show && t >= 55.3 && t < 82.4) a112DrawPurse(ctx, t, Q);   // on the peg / behind Abu's back: never in front of his face
  if ((Ap.lie || 0) > 0.01) { a112DrawAbu(ctx, t, Ap); a112Blanket(ctx, t, Ap); }
  else a112DrawAbu(ctx, t, Ap);
  if (Q.show && !(t >= 55.3 && t < 82.4)) a112DrawPurse(ctx, t, Q);
  // the open palm (S7 demand) and the same palm closing into a fist (S17, 145.2)
  if (!Kp.hidden && (a112In(t, 68.45, 70.3) || a112In(t, 144.7, 146.0))) { const h = a112HandW(Kp, 'R'); a112Palm(ctx, h[0], h[1], t < 100 ? 1 : 1 - A112B(t, 145.2, 0.3), 1.15, 1); }
  if (a112In(t, 46.24, 47.2)) { const u = A112B(t, 46.24, 0.9, 'in'); ctx.save(); ctx.translate(Q.x - 10 * u, Q.y + 230 * u * u); ctx.rotate(2.5 * u); a112Purse(ctx, 0, 0, { s: 0.85, bow: 1, fill: 0, open: 0, sq: 0.0001 }); ctx.restore(); }
  // flying coins (S5): to the shopkeepers at the door, to the wife's basket
  if (a112In(t, 47.3, 50.4)) { const src = [Q.x, Q.y - 6];
    [[47.42, [215, 760]], [47.62, [205, 740]], [47.82, [240, 770]], [48.02, [228, 752]]].forEach(([a, b], i) => a112CoinArc(ctx, t, a, 0.42, src, b, 110 + i * 10));
    [[48.85, [850, 820]], [49.05, [860, 815]], [49.3, [845, 822]], [49.5, [858, 818]]].forEach(([a, b], i) => a112CoinArc(ctx, t, a, 0.4, src, b, 90 + i * 8)); }
  // a coin jumps out and spins on the desk (24.36)
  if (a112In(t, 24.4, 26.4)) { const u3 = K.clamp((t - 24.4) / 0.4), x = K.lerp(500, 560, u3), y = A112_DESK.top - 12 - 60 * Math.sin(Math.PI * Math.min(1, u3)); a112Coin(ctx, x, y, 11, t < 24.8 ? Math.cos(t * 20) : Math.cos(t * 22) * Math.max(0.15, 1 - (t - 24.8) / 1.4)); }
  // tears (S7, S17)
  if (a112In(t, 64.38, 65.4)) teardrops(ctx, t, 64.38, 64.9, () => a112Eye(Kp), { rate: 3, groundY: 900, vx: 10 });
  if (a112In(t, 139.26, 140.8)) teardrops(ctx, t, 139.26, 140.0, () => a112Eye(Kp), { rate: 2.6, groundY: 900, vx: 18 });
  if (a112In(t, 149.74, 151)) teardrops(ctx, t, 149.9, 150.4, () => a112Eye(Ap), { rate: 2, groundY: 900, vx: -10 });
  // sweat (S7 forced smile, S8 fluster)
  if (a112In(t, 70.14, 71.6)) { const h = a112Head(Ap); drops(ctx, h[0] - 30, h[1] - 30, t, a112In(t, 70.14, 71.6) ? 4 : 1, '#5fa0ff'); }
  // moth: no (street only). zzz while asleep (S6)
  if (a112In(t, 56.6, 58.42)) zzz(ctx, 850, 760, t);
  if (a112In(t, 58.4, 58.9)) { const u4 = A112B(t, 58.4, 0.5); ctx.save(); ctx.globalAlpha = 1 - u4; sfx(ctx, 'Z', 900 - 20 * u4, 700 + 60 * u4, 46, 1, { fill: C.white, rot: 0.6 * u4 }); sfx(ctx, 'Z', 940 + 20 * u4, 690 + 80 * u4, 46, 1, { fill: C.white, rot: -0.6 * u4 }); ctx.restore(); }
  // night wash (S9) and moonlight
  if (night > 0) { ctx.save(); ctx.globalAlpha = 0.6 * night; ctx.fillStyle = A112_NIGHT; ctx.fillRect(-50, -50, 1100, 1330); ctx.restore();
    // the moonbeam falls on his face; Abu is redrawn almost at full brightness so the whites of his eyes are the brightest thing in the room
    ctx.save(); ctx.globalAlpha = 0.22 * night; ctx.fillStyle = '#dfe8ff'; K.poly(ctx, [[510, 470], [610, 470], [790, 900], [540, 900]], true); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.85 * night; a112DrawAbu(ctx, t, Ap); a112Blanket(ctx, t, Ap); ctx.restore(); }
  a112HomeClouds(ctx, t, Kp, Ap, Q);
}
// blanket over the lying scholar (S6 until he bolts up, S9); it lags behind his turns
function a112Blanket(ctx, t, P) {
  const lie = P.lie || 0; if (lie < 0.5) return; const night = t > 78.7, up = night ? A112B(t, 81.7, 0.4) : 0, lag = night ? 8 * Math.sin((t - 80.5) * 6) * a112Win(t, 80.5, 81.3, 0.1) : 0;
  if (night) {   // S9: head toward -x (the window light); the blanket covers hips to feet, and is pulled over the head at 81.7
    const x0 = K.lerp(740, 600, up) - 10 * a112Pulse(t, 80.9, 0.5), x1 = 935, top = K.lerp(842, 812, up) + lag * 0.3 - 10 * a112Pulse(t, 80.9, 0.5);
    shape(ctx, [[x0 - 4, 890], [x0, top + 24], [x0 + 40, top], [x1 - 30, top + 6], [x1, top + 34], [x1 + 4, 890], [x0 - 4, 890]], C.blue, { lw: 5, seed: 470, dot: NAVY, pitch: 9, rad: 0.25, da: 0.5 }); return; }
  const x0 = night ? K.lerp(700, 700, up) : 700, x1 = K.lerp(850, 962, up) + lag, top = K.lerp(846, 800, up) + lag * 0.3;
  ctx.save(); ctx.globalAlpha *= K.clamp((lie - 0.5) * 2); shape(ctx, [[x0, 890], [x0 + 6, top + 20], [x0 + 60, top], [x1 - 20, top - 4], [x1, top + 30], [x1 + 4, 890], [x0, 890]], C.blue, { lw: 5, seed: 470, dot: NAVY, pitch: 9, rad: 0.25, da: 0.5 }); ctx.restore();
}
// thought clouds at home
function a112HomeClouds(ctx, t, Kp, Ap, Q) {
  const kh = a112Head(Kp), ah = a112Head(Ap), kt = [kh[0] + 10, kh[1] - 60], at = [ah[0] - 10, ah[1] - 60];
  const road = (c, tt, o = {}) => { c.fillStyle = o.dusk ? '#ef8a3c' : '#5f95ef'; c.fillRect(-200, -200, 1400, 1700); desertRoad(c, { w: 1000, sky: false, sun: o.dusk ? [800, 520] : [820, 300], milestones: o.stone ? [560] : [], palms: [180, 820], camX: (o.scroll || 0) % 300, thorns: [], rocks: [] }); };
  // S2: the road to Mecca (18.82-21.14)
  if (a112In(t, 18.82, 21.4)) thoughtCloud(ctx, 470, 330, 520, 330, t, { p: A112B(t, 18.82, 0.7, 'lin') * (1 - A112B(t, 21.14, 0.25)), tail: kt, scale: 0.5, at: [520, 760], seed: 3, inside: (c) => { road(c, t, { scroll: (t - 18.8) * 60 }); a112Sign(c, 640, 905, 'MECCA', 1.2); } });
  // S3: fear: a robber snatches the purse (27.88-29.6)
  if (a112In(t, 27.88, 29.8)) thoughtCloud(ctx, 560, 320, 520, 330, t, { p: A112B(t, 27.88, 0.5, 'lin') * (1 - A112B(t, 29.52, 0.25)), tail: kt, scale: 0.5, at: [520, 760], seed: 5, bg: '#ffd98a', inside: (c) => {
    road(c, t, {}); const run = A112B(t, 28.2, 1.2, 'lin'), hx = K.lerp(520, 900, run), hy = 900 - Math.abs(Math.sin(run * Math.PI * 3)) * 40;
    person(c, { x: 330, y: 900, s: 1.1, costume: 'merchant', pal: A112_KHOR, mouth: 'o', eyes: 'wide', handR: run > 0.05 ? A112H.raise : A112H.fwd, handL: run > 0.05 ? A112H.raiseL : A112H.restL, seed: 9 });
    person(c, { x: hx, y: hy, s: 1.1, kind: 'thief', ph: run * 12, amp: 1, mouth: 'smile', handR: A112H.raise });
    a112Purse(c, run > 0.02 ? hx + 30 : 420, run > 0.02 ? hy - 260 : 750, { s: 0.8 }); } });
  // S4: the two outcomes (left: back to him; right: to Abu) and the quiet milestone (36.5-37.9)
  if (a112In(t, 36.5, 38.2)) thoughtCloud(ctx, 640, 330, 420, 300, t, { p: A112B(t, 36.5, 0.5, 'lin') * (1 - A112B(t, 37.9, 0.3)), tail: kt, scale: 0.42, at: [560, 760], seed: 7, bg: '#ef8a3c', inside: (c) => {
    road(c, t, { dusk: true, stone: true });     shape(c, ell(560, 812, 46, 18, 20), C.yellow, { lw: 5, seed: 18, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); shape(c, ell(562, 796, 34, 14, 18), C.yellow, { lw: 5, seed: 19 }); seg(c, 620, 900, 660, 700, 10, '#c58a18', 4); } });
  // S5: hope: the purse fills again while a tiny pilgrim walks a long road (52.32-55.4)
  if (a112In(t, 52.32, 55.9)) thoughtCloud(ctx, 720, 400, 360, 250, t, { p: A112B(t, 52.32, 0.6, 'lin') * (1 - A112B(t, 55.6, 0.25)), tail: at, scale: 0.36, at: [500, 720], seed: 9, inside: (c) => {
    road(c, t, {}); person(c, { x: 820 - 20 * (t - 52.3), y: 900, s: 0.45, costume: 'merchant', pal: A112_KHOR, ph: t * 4, amp: 1 }); a112Purse(c, 400, 700, { s: 1.4, fill: K.clamp((t - 52.5) / 2.4) });
    for (let i = 0; i < 4; i++) { const a = 52.6 + i * 0.55, u = K.clamp((t - a) / 0.4); if (u > 0 && u < 1) a112Coin(c, 400, 520 + 160 * u, 16, Math.cos(t * 12)); } } });
  // S7: the father fades (63.76-65.2); the Mecca road returns and is crossed out (65.22-67.4)
  if (a112In(t, 63.76, 65.4)) thoughtCloud(ctx, 600, 410, 420, 330, t, { p: A112B(t, 63.76, 0.5, 'lin') * (1 - A112B(t, 65.1, 0.25)), tail: kt, scale: 0.45, at: [500, 640], seed: 11, bg: '#fff3d6', inside: (c) => {
    shape(c, [[380, 900], [384, 870], [616, 870], [620, 900]], C.red, { lw: 5, seed: 22, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
    person(c, { x: 500, y: 880, s: 1.95, costume: 'ascetic', age: 0.9, mouth: 'smile', lid: 0.3, handR: PERSON_HANDS.clasp.R, handL: PERSON_HANDS.clasp.L, alpha: 1 - A112B(t, 64.4, 0.8), seed: 3 }); } });
  if (a112In(t, 65.22, 67.6)) { const p = A112B(t, 65.22, 0.5, 'lin'), drop = A112B(t, 67.3, 0.3, 'in');
    ctx.save(); ctx.translate(0, 300 * drop); ctx.globalAlpha = 1 - drop;
    thoughtCloud(ctx, 330, 320, 420, 290, t, { p, tail: [kt[0], kt[1] - 300 * drop], scale: 0.42, at: [520, 760], seed: 3, inside: (c) => { road(c, t, {}); a112Sign(c, 640, 905, 'MECCA', 1.2); } });
    a112Cross(ctx, 330, 320, 110, A112B(t, 66.58, 0.45, 'lin')); ctx.restore(); }
  // S8: the excuse cloud: a question-mark friend hugs a full purse (76.72-78.5), its edge wobbles
  if (a112In(t, 76.72, 78.78)) { const wob = 1 + 0.05 * Math.sin(t * 14); ctx.save(); ctx.translate(700, 330); ctx.scale(wob, 2 - wob); ctx.translate(-700, -330);
    thoughtCloud(ctx, 700, 330, 400, 300, t, { p: A112B(t, 76.72, 0.45, 'lin') * (1 - A112B(t, 78.55, 0.2)), tail: at, scale: 0.45, at: [500, 740], seed: 13, bg: '#e6e6ee', inside: (c) => {
      person(c, { x: 500, y: 900, s: 1.3, costume: 'villager', pal: { robe: '#8c8a94', dot: '#6f6a86', head: 'none', sash: '#6f6a86' }, handR: [20, -120], handL: [-20, -120], noBlink: true, eyes: 'shut', seed: 2 });
      sfx(c, '?', 500, 640, 150, 1, { fill: C.white }); a112Purse(c, 500, 700, { s: 1.0 }); } }); ctx.restore(); }
  // S16: the Caliph's dream, small, as Abu tells it (137.62-139.2)
  if (a112In(t, 137.62, 139.4)) thoughtCloud(ctx, 700, 330, 420, 300, t, { p: A112B(t, 137.62, 0.5, 'lin') * (1 - A112B(t, 139.1, 0.25)), tail: at, scale: 0.4, at: [500, 760], seed: 15, bg: A112_NIGHT, inside: (c) => a112DreamPicture(c, t, true) });
}
