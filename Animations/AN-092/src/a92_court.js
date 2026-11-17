// ===== AN-092: the court (S6-S12, 46.68-144.92). One continuous state for the judge, the two claimants, the onlookers, the bag and the piles =====
// Set: palaceHall (paper wall, one centre arch, no door, window, lamps, carpet or throne), dais x 360..640 top 820, bench + desk (top 750) for the judge,
// a tall evidence table x 390..610 (top 860, front to y 1000) with the bag on it. Claimants at y 930 (stranger x 190, Ali x 810), onlookers at the back edges.
const A92_CT = { wall: 'paper', door: false, window: false, arches: [[400, 600, 330]], lamps: [], dais: [360, 640, 820], throne: false, cushions: [], carpet: false };
function a92CourtSet(ctx, t) {
  palaceHall(ctx, { ...A92_CT, t });
  shape(ctx, K.rectPts(415, 700, 170, 70), '#7a4212', { lw: 5, seed: 500, dot: C.black, pitch: 9, rad: 0.15, da: 0.3 });   // bench back
}
function a92Desk(ctx) { shape(ctx, K.rectPts(395, 750, 210, 70), BARKY, { lw: 6, seed: 501, dot: '#7a4212', pitch: 9, rad: 0.2, da: 0.45 }); shape(ctx, K.rectPts(388, 742, 224, 14), WOOD, { lw: 5, seed: 502 });
  shape(ctx, [[420, 742], [470, 742], [468, 734], [422, 734]], '#fff3d6', { lw: 3.5, seed: 503 }); }
function a92Table(ctx) { shape(ctx, K.rectPts(392, 860, 216, 140), WOOD, { lw: 6, seed: 504, dot: '#7a4212', pitch: 10, rad: 0.18, da: 0.35 });
  shape(ctx, [[384, 848], [616, 848], [624, 862], [612, 920], [388, 920], [376, 862]], C.red, { lw: 5, seed: 505, dot: C.yellow, pitch: 8, rad: 0.2, da: 0.5 });
  seg(ctx, 392, 1000, 608, 1000, 3, C.black, 1); }
const A92_BAG0 = [500, 852];   // bag base on the table

// ---------- the claim piles (data) ----------
const A92_PL = [[60.62, 'tent', 145, 520, { badge: 'x2' }], [61.56, 'rug', 250, 520, { badge: 'x2' }], [62.78, 'cow', 145, 417], [63.90, 'calf', 250, 417], [65.10, 'sheep', 145, 314], [66.42, 'camel', 250, 314], [67.50, 'lion', 150, 211], [69.32, 'room', 222, 92, { size: 136 }]];
const A92_PR = [[83.40, 'house', 745, 565, { size: 125 }], [84.68, 'school', 875, 565, { size: 125 }], [85.84, 'garden', 810, 440, { size: 125 }], [87.86, 'baghdad', 805, 315, { size: 125, wide: 1, label: 'BAGHDAD' }], [89.52, 'basra', 815, 190, { size: 125, wide: 1, label: 'BASRA' }], [90.16, 'army', 800, 68, { size: 125, wide: 1 }]];
const A92_SMALL = [[56.12, 'cup', 440], [56.6, 'comb', 500], [57.0, 'cloth', 560]];
const A92_TC = 97.3;   // both piles collapse

// ---------- the judge's turban (one keyed table: tilt back 66.42, slip 89.52, straighten 98.62, roll off 144.24) ----------
function a92TB(t, J) {
  if (t >= 144.24) { const u = K.clamp((t - 144.24) / 0.5), x = 520 + 70 * K.ease.out(u); return { off: [x, 738 - 14 * Math.sin(Math.PI * Math.min(1, u * 1.2)) * (1 - u), (x - 520) / 24 + swing(t, 144.74, 0.25, 1.8, 3)] }; }
  const r = kfn(t, [[66.42, 0], [66.8, -0.08], [89.52, -0.08], [89.75, -0.3], [98.62, -0.3], [99.0, 0]], 'out');
  return { rot: r + 0.04 * pulse(t, 96.9, 0.3) };
}
// ---------- the judge ----------
function a92Judge(t) {
  const J = { ...A92_JUDGE, x: 500, y: 820, sit: 1, seat: 'bench', dir: 1, gaze: [0, 1], mouth: 'closed', brow: 0 };
  const quill = (k = 1) => { J.handRW = [530 + 10 * Math.sin(t * 9) * k, 744 - 3 * Math.abs(Math.sin(t * 13)) * k]; };
  const eye = () => a92Eye(J), at = (p) => lookAt(eye(), p);
  if (t < 49.66) { quill(); J.drop = 4; }
  else if (t < 58.54) { J.gaze = at([300, 800]); J.brow = -0.5;
    if (t >= 50.6) J.gaze = at(A92_BAG0);
    if (t >= 51.16 && t < 52.92) { J.handL = [-100, -150]; J.talk = talk(t, [[51.2, 52.7]]); J.brow = 0; J.gaze = at([190, 720]); }
    if (t >= 52.92 && t < 54.9) { J.handRW = [530, 760]; J.gaze = at(A92_BAG0); J.talk = talk(t, [[52.95, 53.7]]); }
    if (t >= 54.9) { J.gaze = at([190, 720]); }
    if (t >= 56.12) { quill(0.5); J.drop = 6 * (pulse(t, 56.2, 0.3) + pulse(t, 56.7, 0.3) + pulse(t, 57.5, 0.3) + pulse(t, 57.9, 0.3)); J.gaze = t < 57.48 ? at([500, 735]) : [0, 1]; } }
  else if (t < 73.96) { quill(t < 61.56 ? 0.6 : 0); J.gaze = at([200, 470]);
    if (t >= 60.62) { J.drop = 4; J.gaze = look(t, eye(), [[60.62, [500, 735]], [60.9, [145, 520]], [61.56, [250, 520]], [62.78, [145, 417]], [63.9, [250, 417]], [65.1, [145, 314]], [66.42, [250, 314]], [67.5, [150, 211]], [69.32, [222, 92]], [70.96, [360, 600]], [71.6, A92_BAG0]], 0.3); }
    if (t >= 62.78) { J.brow = -0.6; J.handRW = [560, 752]; }
    if (t >= 66.42) J.tilt = -0.06;
    if (t >= 69.32) J.mouth = 'o'; }
  else if (t < 96.4) { J.mouth = 'closed'; J.brow = -0.3; J.handRW = [560, 752]; J.gaze = at([810, 700]);
    if (t >= 80.44) { J.brow = 0.3; J.tilt = 0.04; }
    if (t >= 83.4) { const pl = [[83.4, [745, 565]], [84.68, [875, 565]], [85.84, [810, 440]], [87.86, [805, 315]], [89.52, [815, 190]], [90.16, [800, 68]], [91.72, [650, 40]], [92.44, [800, 40]]]; J.gaze = look(t, eye(), pl, 0.25); J.mouth = 'o'; J.brow = -0.6; }
    if (t >= 89.52 && t < 90.6) { J.handR = PERSON_HANDS.headHold.R; J.tilt = -0.08; }
    if (t >= 93.46) { J.y = 820 + 40 * A92B(t, 93.46, 0.6); J.gaze = [0.6, -0.8]; J.lid = 0; J.handRW = null; J.handL = [-40, -150]; J.handR = [40, -150]; } }
  if (t >= 96.4 && t < 118.88) { J.gaze = [0, 0.2]; J.y = 820 + 40 * (1 - A92B(t, 96.4, 0.4));
    if (t < 96.9) { const u = A92B(t, 96.4, 0.45); J.aL = [-K.lerp(0.3, 2.6, u), -K.lerp(0.2, 2.9, u)]; J.aR = [K.lerp(0.3, 2.6, u), K.lerp(0.2, 2.9, u)]; J.brow = 1; J.sq = 1.04; }
    else if (t < 98.62) { J.handLW = [440, 752]; J.handRW = [560, 752]; J.brow = 1; J.mouth = 'open'; J.sq = impactSquash(t, 96.9, 0.9); J.gaze = [0, 0.4]; }
    else if (t < 99.82) { J.handR = PERSON_HANDS.headHold.R; J.brow = 0.6; J.gaze = [0.2, -0.4]; }
    if (t >= 99.82) { J.sit = 1 - settleTo(t, 99.82, 0, 1, 0.5, 0.1); J.talk = talk(t, [[99.9, 101.6], [101.9, 105.3], [106.7, 107.9], [108.6, 114.6], [115.9, 116.4], [116.6, 117.2]]); J.brow = 0.6;
      if (t < 101.88) { J.handR = [44 + 14 * Math.sin((t - 99.82) * 6 * Math.PI), -205]; J.gaze = gazePlan(t, [[99.82, [-0.8, 0.1]], [100.6, [0.8, 0.1]], [101.3, [-0.8, 0.1]]], 0.1); }
      else if (t < 103.76) { J.handR = PERSON_HANDS.cupEar.R; J.look = Math.sin((t - 101.88) * 8) * 1.2; J.lid = 0.3; J.gaze = [0, 0.1]; }
      else if (t < 105.44) { if (t < 104.6) { J.handL = PERSON_HANDS.palmsUp.L; J.handL = [-80, -120]; J.gaze = [-1, 0.2]; } else { J.handR = [80, -120]; J.gaze = [1, 0.2]; } }
      else if (t < 106.64) { J.handL = PERSON_HANDS.headHold.L; J.handR = PERSON_HANDS.headHold.R; J.lid = t < 106.0 ? 1 : 0.3; J.sq = 1 - 0.04 * pulse(t, 105.5, 0.8); }
      else if (t < 108.0) { J.aL = [-1.45, -1.6]; J.aR = [1.45, 1.6]; J.gaze = gazePlan(t, [[106.64, [-1, 0.1]], [107.2, [1, 0.1]]], 0.08); J.brow = 1; }
      else if (t < 114.82) { J.gaze = [0, -1]; J.handR = PERSON_HANDS.pointUp.R; J.brow = -0.4; } }
    if (t >= 114.82) { J.sit = settleTo(t, 114.82, 0, 1, 0.4, 0.1); J.lid = t < 115.2 ? 1 : 0; J.sq = landSquash(t, 115.15, 0.08); J.brow = 0;
      if (t >= 115.82) { J.handRW = [540, 770]; J.gaze = at(A92_BAG0); J.noBlink = true; J.lid = 0; }
      if (t >= 117.46) { J.gaze = at(A92_BAG0); } } }
  if (t >= 118.88 && t < 136.22) { J.gaze = at([520, 800]); J.handRW = [560, 752];
    if (t >= 120.62) { J.sit = 1 - 0.4 * A92B(t, 120.62, 0.4); J.drop = 8; J.gaze = at(A92_BAG0); J.lid = 0; }
    if (t >= 123.24 && t < 124.48) J.gaze = gazePlan(t, [[123.24, at([470, 820])], [123.55, at([540, 820])], [123.85, at([470, 820])], [124.15, at([520, 830])]], 0.07);
    if (t >= 123.24 && t < 124.0) J.brow = -0.6;
    if (t >= 124.48 && t < 128.3) J.gaze = [0, -1];
    if (t >= 128.3) { J.gaze = at([560, 850]); J.brow = t >= 132.76 && t < 134.2 ? -0.7 : -0.2; } }
  if (t >= 136.22) { J.gaze = at([575, 780]); J.handRW = [560, 752];
    if (t >= 139.96) J.gaze = at([1000, 760]);
    if (t >= 141.78) J.gaze = look(t, eye(), [[141.78, [1000, 760]], [142.08, [300, 720]], [142.4, [345, 990]]], 0.08);
    if (t >= 142.66) J.gaze = at([300, 760]);
    if (t >= 143.36) { J.handR = [12, -192 + 6 * A92B(t, 143.36, 0.5)]; J.handRW = null; J.lid = 0.5; J.gaze = [0, 0.05]; J.noBlink = true; J.drop = 4; }
    if (t >= 144.24) { const u = A92B(t, 144.24, 0.35, 'in'); J.drop = 4 + 46 * u; J.tip = 0.05 * u; J.sq = 1 - 0.06 * u + (u >= 1 ? 0.04 * Math.exp(-(t - 144.6) * 8) : 0); J.lid = 1; J.handR = [30, -150]; } }
  if (J.lid < 0.9 && !J.noBlink) a92Blink(J, t);
  return J;
}
// ---------- the stranger (claimant, left) ----------
const A92_KX = (t) => kfn(t, [[47.6, -160], [48.1, -40], [48.4, -30], [48.9, 80], [49.2, 90], [49.66, 400], [50.6, 400], [51.3, 190], [54.9, 190], [55.15, 230], [118.9, 230], [119.7, 385], [136.22, 385], [136.23, 300], [144.24, 300], [144.92, 120]], 'inOut');
const A92_KY = (t) => kfn(t, [[118.9, 930], [119.7, 942], [136.22, 942], [136.23, 960]], 'inOut');
function a92Kurd(t, bag) {
  const K6 = { ...A92_KURD, ...walk(A92_KX, t, { stride: 30 }), y: A92_KY(t), dir: 1, gaze: [1, 0], brow: 0.5, mouth: 'closed' };
  const eye = () => a92Eye(K6), at = (p) => lookAt(eye(), p);
  if (t < 50.4) { K6.handRW = [bag[0] - 26, bag[1] - 52]; K6.brow = 0.7; K6.gaze = [1, -0.2]; K6.mouth = 'frown'; }
  else if (t < 54.9) { K6.gaze = at(A92_BAG0); if (t >= 51.16) { K6.gaze = at(a92Eye(a92Judge(t))); K6.mouth = 'smile'; } }
  else if (t < 58.54) { const [, h] = hop(t, 54.9, 0.25, 0, 0, 8); K6.y -= h; K6.handR = [44, -205 + 6 * Math.sin(t * 7)]; K6.talk = talk(t, [[55.0, 58.3]]); K6.brow = -0.3; K6.mouth = 'smile'; K6.gaze = at([500, 640]); }
  else if (t < 73.96) { K6.mouth = 'smile'; K6.lid = 0.35; K6.gaze = t < 58.9 ? at([810, 700]) : at([500, 640]); K6.sq = t < 59.24 ? 1 + 0.06 * A92B(t, 58.54, 0.6) : 1.05 + 0.02 * Math.sin(t * 6);
    if (t >= 59.24) { const u = A92B(t, 59.24, 0.35, 'out'); K6.aL = [-K.lerp(0.3, 2.45, u), -K.lerp(0.2, 2.85, u)]; K6.aR = [K.lerp(0.3, 2.45, u), K.lerp(0.2, 2.85, u)]; K6.talk = talk(t, [[59.3, 70.8]]); K6.lid = 0.2; }
    if (t >= 68.8 && t < 69.32) { K6.aR = null; K6.handR = PERSON_HANDS.pointUp.R; K6.sq = 1.08; K6.talk = 0; }
    if (t >= 70.96) { K6.aL = null; K6.aR = null; K6.handL = PERSON_HANDS.hipsHands.L; K6.handR = PERSON_HANDS.hipsHands.R; K6.talk = talk(t, [[71.0, 72.9]]); K6.gaze = at(A92_BAG0); K6.sq = 1; } }
  else if (t < 96.7) { K6.gaze = at([810, 700]); K6.mouth = 'smile'; K6.lid = 0.4; K6.handL = PERSON_HANDS.folded.L; K6.handR = PERSON_HANDS.folded.R; K6.tip = t >= 75.74 ? 0.04 * Math.sin((t - 75.74) * 3) : 0;
    if (t >= 79.84) { K6.lid = 0.25; K6.brow = -0.2; }
    if (t >= 83.4) K6.gaze = look(t, eye(), [[83.4, [745, 565]], [84.68, [875, 565]], [85.84, [810, 440]], [87.86, [805, 315]], [89.52, [815, 190]], [90.16, [800, 68]], [92.44, [700, 40]]], 0.2);
    if (t >= 87.86) { K6.lid = 0; K6.eyes = 'wide'; K6.mouth = 'closed'; K6.tip = 0; }
    if (t >= 90.16) { K6.handL = [-40, -100]; K6.handR = [40, -100]; }
    if (t >= 91.72) K6.mouth = 'o';
    if (t >= 96.0) { K6.sq = 0.95; K6.handL = null; K6.handR = null; K6.eyes = 'open'; K6.lid = 0.3; } }
  else if (t < 118.88) { K6.gaze = at(a92Eye(a92Judge(t))); K6.brow = -0.4;
    if (t >= 96.9 && t < 99.6) { K6.handL = PERSON_HANDS.shield.L; K6.handR = PERSON_HANDS.shield.R; K6.sq = Math.min(0.92 + 0.08 * A92B(t, 98.8, 0.6), 1); K6.eyes = t < 97.6 ? 'wide' : 'open'; }
    if (t >= 103.76 && t < 106.64) { K6.gaze = [0.1, 1]; K6.drop = 6; }
    if (t >= 106.64 && t < 108.3) { K6.sq = 1.04; K6.handL = PERSON_HANDS.clasp.L; K6.handR = PERSON_HANDS.clasp.R; }
    if (t >= 108.3 && t < 114.82) K6.gaze = at([500, 300]);
    if (t >= 117.46) { K6.gaze = at(A92_BAG0); K6.drop = 4 * pulse(t, 117.6, 0.3); K6.mouth = 'closed'; } }
  else if (t < 136.22) { K6.gaze = at([500, 830]); K6.brow = -0.5; K6.mouth = 'closed';
    if (t >= 120.62) { K6.tip = 0.1 * A92B(t, 120.66, 0.4); K6.x += tremble(t, 1.2, 9); }
    if (t >= 124.48 && t < 127.66) K6.gaze = [0, -1];
    if (t >= 127.66 && t < 128.3) { K6.gaze = [-0.8, -0.8]; K6.mouth = 'o'; K6.tip = 0; }
    if (t >= 128.3) { K6.gaze = at([560, 850]); K6.tip = 0.06; }
    if (t >= 134.58 && t < 135.44) { K6.eyes = 'wide'; K6.mouth = 'smile'; K6.gaze = at([520, 760]); }
    if (t >= 135.44) { K6.gaze = at([370, 960]); K6.mouth = 'o'; } }
  else { K6.gaze = at([575, 760]); K6.brow = -0.6; K6.mouth = 'closed';
    if (t >= 138.02 && t < 139.18) { K6.gaze = at(bag); }
    if (t >= 138.62) { K6.x -= 18 * A92B(t, 138.62, 0.2, 'out'); const [, h] = hop(t, 138.62, 0.2, 0, 0, 10); K6.y -= h; }
    if (t >= 139.18) { K6.gaze = t < 139.6 ? [0.2, 1] : at([575, 760]); K6.sq = 0.96; K6.mouth = 'o'; }
    if (t >= 139.96 && t < 142.66) K6.gaze = at([900, 760]);
    if (t >= 142.66 && t < 144.24) { K6.kneel = 0.4 * pulse(t, 142.66, 0.5); K6.handRW = t < 142.9 ? [bag[0], bag[1] - 50] : [bag[0] - 4, bag[1] - 62]; K6.handL = PERSON_HANDS.palmsUp.L; K6.mouth = 'smile'; K6.brow = -0.6; K6.gaze = at(a92Eye(a92Judge(t))); K6.x += t > 143.0 ? 2 * Math.sin(t * 20) * 0 : 0; K6.drop = 2 * Math.sin(t * 9); }
    if (t >= 144.24) { K6.sq = 0.92; K6.tip = -0.06; K6.gaze = [-0.9, 0]; K6.handRW = [bag[0] - 4, bag[1] - 62]; } }
  if (K6.eyes !== 'wide') a92Blink(K6, t);
  return K6;
}
// ---------- Ali (right) ----------
const A92_AX = (t) => kfn(t, [[47.6, -60], [48.1, 60], [48.4, 70], [48.9, 180], [49.2, 190], [49.66, 600], [50.6, 600], [51.4, 810], [78.16, 810], [78.4, 770], [118.88, 770], [119.9, 575], [139.96, 575], [141.6, 1120]], 'inOut');
const A92_AY = (t) => kfn(t, [[118.88, 930], [119.9, 942]], 'inOut');
function a92Ali(t, bag) {
  const A = { ...A92_ALI, ...walk(A92_AX, t, { stride: 28 }), y: A92_AY(t), dir: -1, gaze: [-1, 0], mouth: 'closed' };
  const eye = () => a92Eye(A), at = (p) => lookAt(eye(), p);
  if (t < 50.4) { A.handLW = [bag[0] + 26, bag[1] - 52]; A.brow = 0.7; A.gaze = [-1, -0.2]; A.mouth = 'frown'; }
  else if (t < 58.54) { A.gaze = at(A92_BAG0); A.brow = 0.3;
    if (t >= 51.16) A.gaze = at([190, 700]);
    if (t >= 57.48) { A.handL = PERSON_HANDS.folded.L; A.handR = PERSON_HANDS.folded.R; A.gaze = gazePlan(t, [[57.48, [-0.6, -0.6]], [57.8, [0, -1]], [58.1, [0.6, -0.6]]], 0.15); A.lid = 0.3; } }
  else if (t < 73.96) { A.handL = PERSON_HANDS.folded.L; A.handR = PERSON_HANDS.folded.R; A.gaze = at([190, 700]); A.lid = 0.3;
    if (t >= 60.62) A.gaze = at([200, 450]);
    if (t >= 63.9) { A.handL = null; A.handR = null; A.mouth = 'o'; A.lid = 0; A.gaze = look(t, eye(), [[63.9, [250, 417]], [65.1, [145, 314]], [66.42, [250, 314]], [67.5, [150, 211]], [69.32, [222, 92]], [70.96, A92_BAG0]], 0.25); }
    if (t >= 72.94) { A.gaze = look(t, eye(), [[72.94, [222, 92]], [73.3, A92_BAG0], [73.75, [222, 92]]], 0.18); A.noBlink = true; A.lid = pulse(t, 73.55, 0.3) * 1.0; } }
  else if (t < 96.7) {
    if (t < 76.86) { A.sq = settleTo(t, 73.96, 1.12, 1, 0.4); A.handL = PERSON_HANDS.cheeks.L; A.handR = PERSON_HANDS.cheeks.R; A.eyes = t < 74.86 ? 'wide' : 'open'; A.mouth = 'o';
      A.gaze = t < 74.86 ? at([222, 92]) : look(t, eye(), [[74.86, [190, 560]], [75.3, [222, 92]], [75.9, A92_BAG0], [76.3, [190, 700]]], 0.15); A.drop = t > 74.86 ? 4 * Math.sin((t - 74.86) * 3) : 0; }
    else if (t < 78.16) { const u = A92B(t, 76.86, 0.8); A.lid = 0.35 * u; A.brow = 0.4 * u; A.mouth = u > 0.4 ? 'smile' : 'closed'; A.gaze = at([190, 700]); A.handL = t < 77.5 ? [20, -110] : [-20, -116]; A.handR = t < 77.5 ? [16, -100] : [-24, -100]; }
    else { const [, h] = hop(t, 78.16, 0.25, 0, 0, 10); A.y -= h; A.sq = landSquash(t, 78.41, 0.1); A.lid = 0.3; A.brow = 0.4; A.mouth = 'smile'; A.handR = PERSON_HANDS.pointUp.R; A.drop = -4; A.gaze = at([500, 640]);
      if (t >= 80.44) { A.handL = PERSON_HANDS.armsOut.L; A.handR = PERSON_HANDS.armsOut.R; A.talk = talk(t, [[80.5, 95.9]]); }
      if (t >= 82.06 && t < 83.4) { A.handL = null; A.handR = t < 82.56 ? PERSON_HANDS.pointDown.R : PERSON_HANDS.chest.R; A.gaze = t < 82.56 ? at(A92_BAG0) : at([500, 640]); }
      if (t >= 83.4 && t < 86.84) { const k = Math.floor((t - 83.4) / 0.6) % 2; A.aL = null; A.handL = k ? PERSON_HANDS.armsOut.L : [-60, -190]; A.handR = k ? PERSON_HANDS.armsOut.R : PERSON_HANDS.pointUp.R; A.gaze = at([810, 440]); }
      if (t >= 86.84 && t < 87.86) { const u = A92B(t, 86.84, 1.0); A.sq = anticipate(t, 86.84, 0.6, 0.06); A.aL = [-K.lerp(0.9, 2.6, u * u), -K.lerp(0.6, 2.9, u * u)]; A.aR = [K.lerp(0.9, 2.6, u * u), K.lerp(0.6, 2.9, u * u)]; A.handL = null; A.handR = null; }
      if (t >= 87.86 && t < 96.0) { A.aL = [-2.5 + 0.2 * Math.sin(t * 4), -2.8]; A.aR = [2.5 - 0.2 * Math.sin(t * 4 + 1), 2.8]; A.handL = null; A.handR = null; A.gaze = at([800, 120]); A.sq = 1.03; if (t >= 92.44) A.gaze = at([600, 40]); }
      if (t >= 96.0) { A.aL = null; A.aR = null; A.handL = [-6, -124]; A.handR = [6, -124]; A.lid = 0.4; A.mouth = 'smile'; A.drop = -6; A.talk = 0; A.gaze = at([500, 640]); } } }
  else if (t < 118.88) { A.gaze = at(a92Eye(a92Judge(t))); A.brow = -0.3;
    if (t >= 96.9 && t < 99.6) { A.handL = PERSON_HANDS.shield.L; A.handR = PERSON_HANDS.shield.R; A.sq = Math.min(0.92 + 0.08 * A92B(t, 98.8, 0.6), 1); A.eyes = t < 97.6 ? 'wide' : 'open'; }
    if (t >= 103.76 && t < 106.64) { A.gaze = [-0.1, 1]; A.drop = 6; }
    if (t >= 106.64 && t < 108.3) { A.sq = 1.04; A.handL = PERSON_HANDS.clasp.L; A.handR = PERSON_HANDS.clasp.R; }
    if (t >= 108.3 && t < 114.82) A.gaze = at([500, 300]);
    if (t >= 117.46) { A.handL = PERSON_HANDS.palmsUp.L; A.handR = PERSON_HANDS.palmsUp.R; A.drop = 3; A.mouth = 'smile'; A.gaze = at(A92_BAG0); } }
  else if (t < 136.22) { A.mouth = 'smile'; A.gaze = at(A92_BAG0);
    if (t < 119.9) { A.handL = [24, -110]; A.handR = [-20, -104]; }
    if (t >= 120.0 && t < 121.0) { const p = Math.sin((t - 120) * 3 * Math.PI * 2); A.handLW = [bag[0] - 14, bag[1] - 58 - 4 * p]; A.handRW = [bag[0] + 16 + 6 * Math.max(0, p), bag[1] - 58]; A.mouth = 'closed'; }
    if (t >= 121.0 && t < 128.3) { A.handL = [-36, -96]; A.handR = [36, -96]; A.lid = 0; if (t >= 127.66) { A.gaze = [0.8, -0.8]; A.mouth = 'o'; } }
    if (t >= 124.48 && t < 127.66) A.gaze = [0, -1]; }
  else { A.mouth = 'closed'; A.lid = 0.3; A.gaze = at([300, 760]);
    if (t < 138.1) A.handRW = [bag[0], bag[1] - 62];
    if (t >= 137.74 && t < 138.02) A.sq = anticipate(t, 137.74, 0.28, 0.05);
    if (t >= 138.02 && t < 139.96) { A.gaze = at(bag); A.handR = [70, -150]; }
    if (t >= 139.96 && t < 140.6) { const b = Math.sin((t - 139.96) * 20); A.handL = [-12 + 14 * b, -118]; A.handR = [12 - 14 * b, -114]; A.gaze = [0.3, 0.6]; }
    if (t >= 140.3) { A.dir = 1; A.gaze = [1, -0.1]; A.drop = -5; A.mouth = 'smile'; } }
  if (A.eyes !== 'wide' && !A.noBlink) a92Blink(A, t);
  return A;
}
// ---------- onlookers (back edges): eyes ping-pong; lean in; one covers her mouth ----------
function a92Onl(t, i, K6, A) {
  const P = { ...A92_ONL[i], x: i ? 905 : 95, y: 905, s: A92_ONL[i].s * 0.9, dir: i ? -1 : 1 };
  const e = a92Eye(P); const sp = [[46.7, [500, 640]], [50.4 + i * 0.1, A92_BAG0], [54.9 + i * 0.12, a92Eye(K6)], [60.62 + i * 0.1, [200, 450]], [73.96 + i * 0.1, a92Eye(A)], [83.4 + i * 0.12, [810, 400]], [96.9 + i * 0.1, [500, 640]], [108.3 + i * 0.1, [500, 300]], [114.9, [500, 640]], [117.46 + i * 0.15, A92_BAG0], [139.96 + i * 0.1, [1000, 760]], [141.6, [500, 640]]];
  P.gaze = look(t, e, sp, 0.1); if (t >= 46.7 && t < 49) P.alpha = K.clamp((t - 46.9) / 0.4);
  if (t >= 65.1 && t < 73.96) P.tip = 0.08 * A92B(t, 65.1 + i * 0.13, 0.4) * (i ? -1 : 1) * (i ? -1 : 1);
  if (i === 1 && t >= 67.5 && t < 70.5) { P.handL = PERSON_HANDS.mouthCover.L; P.handR = PERSON_HANDS.mouthCover.R; }
  if (i === 0 && t >= 106.64 && t < 108.3) { P.handR = PERSON_HANDS.mouthCover.R; P.y += 0; P.sq = 1 + 0.02 * Math.sin(t * 30); P.lid = 0.6; }
  if (t >= 117.46 && t < 136.22) P.tip = 0.1 * A92B(t, 117.46 + i * 0.15, 0.4);
  if (t >= 87.86 && t < 96.7) P.mouth = 'o';
  return a92Blink(P, t);
}
// ---------- the bag through the court ----------
function a92BagState(t, A) {
  // carried between the claimants, set on the table, the hop at the slam, untied and opened, rummaged, shaken, then tossed
  let x = A92_BAG0[0], y = A92_BAG0[1], o = { s: 1 };
  if (t < 50.4) { const kx = A92_KX(t), ax = A92_AX(t); x = (kx + ax) / 2 + 5 * Math.sin(t * 7); y = 800 + 4 * Math.sin(t * 9); o.rot = 0.12 * Math.sin(t * 5); if (t > 49.9) { y = K.lerp(800, A92_BAG0[1], A92B(t, 49.9, 0.5, 'in')); x = K.lerp(x, 500, A92B(t, 49.9, 0.5)); } }
  else { o.sq = landSquash(t, 50.4, 0.18); }
  if (t >= 98.62 && t < 99.3) { const [, h] = hop(t, 98.62, 0.3, 0, 0, 12); y -= h; o.sq = landSquash(t, 98.92, 0.15); }
  if (t >= 96.9 && t < 97.3) o.sq = impactSquash(t, 96.9, 0.85);
  if (t >= 120.0) { o.tie = 1 - A92B(t, 120.0, 0.9); }
  if (t >= 121.0 && t < 136.22) { o.open = settleTo(t, 121.0, 0, 1, 0.4, 0.15); }
  if (t >= 128.3 && t < 130.82) { o.sq = 1 + 0.05 * Math.sin(t * 16); o.rot = 0.04 * Math.sin(t * 11); }
  if (t >= 134.58 && t < 136.22) { const u = A92B(t, 134.58, 0.35, 'out'); x = K.lerp(500, 520, u); y = K.lerp(A92_BAG0[1], 820, u); o.rot = Math.PI * u; o.limp = 0.3 * u; if (t > 134.95) { x += 8 * Math.sin((t - 134.95) * 26) * (t < 135.44 ? 1 : 0.2); } }
  if (t >= 136.22) { o.open = 0; o.tie = 1; const hand = a92Reach(A, 1, a92Pt(A, 46, -118)); x = hand[0]; y = hand[1] + 62;
    if (t < 137.74) { y -= 10 * Math.abs(Math.sin((t - 136.3) * 6)) * (t < 137.3 ? 1 : 0); }
    else if (t < 138.02) { x += 30 * A92B(t, 137.74, 0.28); y -= 20 * A92B(t, 137.74, 0.28); }
    else { const f = K.clamp((t - 138.02) / 0.6); x = K.lerp(x + 30, 345, f); y = K.lerp(y - 20, 1000, f) - 160 * Math.sin(Math.PI * f); o.rot = -6 * f; if (f >= 1) { o.rot = 0; o.sq = impactSquash(t, 138.62, 0.7); } } }
  return { x, y, o };
}
// ---------- draw the whole court ----------
function a92Court(ctx, t, cam) {
  a92CourtSet(ctx, t);
  // piles first (behind everyone), with their bubble trails
  const lt = a92In(t, 60.62, A92_TC + 1.2), rt = a92In(t, 83.4, A92_TC + 1.2);
  if (lt) a92Trail(ctx, [480, 790], [220, 585], K.clamp((t - 60.4) / 0.5), { r: 12, alpha: t > A92_TC + 0.8 ? 0 : 1 });
  if (rt) a92Trail(ctx, [520, 790], [790, 640], K.clamp((t - 83.2) / 0.5), { r: 13, alpha: t > A92_TC + 0.8 ? 0 : 1 });
  if (t >= 60.62 && t < A92_TC + 1.4) a92Pile(ctx, t, A92_PL.map((e) => (e[1] === 'lion' ? [...e.slice(0, 4), { roar: pulse(t, 67.5, 0.6) }] : e[1] === 'sheep' ? [...e.slice(0, 4), { tremble: a92In(t, 67.5, 68.3) }] : e[1] === 'cow' ? [...e.slice(0, 4), { moo: pulse(t, 62.78, 0.7) }] : e)), { tc: A92_TC, base: [200, 575], droop: t >= 96.0 ? 0.06 * A92B(t, 96.0, 0.4) : 0, amp: 0.03 });
  if (t >= 83.4 && t < A92_TC + 1.4) a92Pile(ctx, t, A92_PR, { tc: A92_TC, base: [810, 630], amp: 0.025 });
  // the brick falls off the old house; the soldiers march; the crowd of witnesses
  if (t >= 83.96 && t < 85.2) { const y = fallY(t, 83.96, 84.6, 600, 1000); if (y < 1000) shape(ctx, K.rectPts(700, y, 18, 10), '#c8481a', { lw: 3, seed: 510 }); }
  if (t >= 91.72 && t < A92_TC) for (let i = 0; i < 6; i++) { const d = t - 91.72 - i * 0.18; if (d < 0) continue; const sx = 690 - d * 60, bob = Math.abs(Math.sin(d * 10 + i)) * 3; seg(ctx, sx, 22 - bob, sx, 4 - bob, 7, C.red, 2); shape(ctx, ell(sx, -2 - bob, 5, 5, 10), C.white, { lw: 2, seed: 511 }); seg(ctx, sx + 6, 22 - bob, sx + 6, -14 - bob, 1.5, '#7a4212', 1); }
  if (t >= 92.44 && t < A92_TC + 0.2) a92Heads(ctx, t, 92.44, 64, [340, 8, 990, 70], { seed: 56, spread: 0.9, hands: 94.62, alpha: t >= A92_TC ? K.clamp(1 - (t - A92_TC) / 0.2) : 1 });
  // the three small sensible tiles (shoved aside by the tents)
  for (const [t0, kind, x] of A92_SMALL) { if (t < t0 || t >= 62.3) continue; const u = A92B(t, 61.56, 0.6); ctx.save(); ctx.globalAlpha = 1 - u; a92Tile(ctx, x + 160 * u, 735 - 20 * u, kind, { size: 58, p: K.clamp((t - t0) / 0.3), rot: 0.3 * u }); ctx.restore(); }
  if (t >= 56.12 && t < 62.3) a92Trail(ctx, [500, 792], [500, 770], 1, { r: 6, alpha: 1 - A92B(t, 61.56, 0.4) });
  // people
  const A = a92Ali(t, [0, 0]), bs = a92BagState(t, A), bag = [bs.x, bs.y];
  const J = a92Judge(t), K6 = a92Kurd(t, bag), A2 = a92Ali(t, bag);
  if (t >= 142.66) { const hp = a92Reach(K6, 1, a92Pt(K6, 64, -112)), u = A92B(t, 142.66, 0.4); bag[0] = K.lerp(345, hp[0], u); bag[1] = K.lerp(1000, hp[1] + 64, u); bs.o.rot = 0.1 * Math.sin(t * 5); bs.o.sq = 1; K6.handRW = [bag[0], bag[1] - 64]; K6.handR = null; }
  if (t >= 46.68) [0, 1].forEach((i) => person(ctx, a92Onl(t, i, K6, A2)));
  a92JudgeDraw(ctx, J, t >= 144.24 ? a92TB(t, J) : a92TB(t, J));
  // the quill
  if (t < 93.46 && J.handRW) seg(ctx, J.handRW[0] + 4, J.handRW[1], J.handRW[0] + 22, J.handRW[1] - 34, 3, C.white, 1.5);
  if (t >= 93.46 && t < 94.6) { const y = fallY(t, 93.46, 93.9, 744, 860); seg(ctx, 560, y, 578, y - 30 + 20 * K.clamp((t - 93.46) / 0.44), 3, C.white, 1.5); }
  a92Desk(ctx);
  if (t >= 144.24) { const tb = a92TB(t, J); a92Turban(ctx, tb.off[0], tb.off[1], J.s, tb.off[2]); }
  // both claimants stand behind the table plane (y < 1000): drawn before it; the bag, the food and the lemon after it
  const food = t >= 128.3 && t < 136.22 ? a92Food2(t, A2) : null;
  person(ctx, K6); person(ctx, A2);
  a92Table(ctx);
  if (food) food(ctx);
  a92Bag(ctx, bag[0], bag[1], bs.o);
  if (t >= 121.84 && t < 123.0) { ctx.save(); ctx.globalAlpha = K.clamp(1 - (t - 121.84) / 1.1); dustBurst(ctx, 500, 790, t - 121.84, 4, 3, 7, 26, 1.0, 9); ctx.restore(); }
  if (t >= 138.62 && t < 139.4) dustBurst(ctx, 345, 1000, t - 138.62, 5, 5, 10, 30, 0.5, 12);
  if (t >= 117.46 && t < 118.6) a92Sweat(ctx, a92Head(K6)[0] + 40, a92Head(K6)[1] - 20, (t - 117.46) / 1.1);
  if (t >= 120.62 && t < 121.8) a92Sweat(ctx, a92Head(K6)[0] + 40, a92Head(K6)[1] - 20, (t - 120.62) / 1.1);
  // footfalls
  for (const f of A92_CF) dustBurst(ctx, f.x, 930, t - f.t, 3, 4, 8, 18, 0.35, Math.round(f.t * 10));
  return { J, K6, A: A2, bag };
}
const A92_CF = footfalls(A92_KX, 47.6, 51.4, 30).concat(footfalls(A92_AX, 47.6, 51.4, 28), footfalls(A92_AX, 139.96, 141.6, 28));
// ---------- S11: the food comes out of the bag (bread, cheese, olives, the lemon) ----------
const A92_FOOD = [[130.82, 'bread', 560, 852], [132.76, 'cheese', 598, 858]];
const A92_OLV = [[540, 866], [552, 868], [564, 865], [546, 872], [600, 868]];
function a92LemonPos(t) {
  if (t < 135.44) return null; const d = t - 135.44;
  if (d < 0.18) return [470, fallY(t, 135.44, 135.62, 800, 858), 0];
  if (d < 0.34) return [470 - 30 * (d - 0.18) / 0.16, 858 - 24 * Math.sin(Math.PI * (d - 0.18) / 0.16), -d * 8];
  if (d < 0.46) return [440 - 20 * (d - 0.34) / 0.12, 858 - 10 * Math.sin(Math.PI * (d - 0.34) / 0.12), -d * 10];
  if (d < 0.56) return [420 - 30 * (d - 0.46) / 0.1, 858, -d * 12];
  if (d < 0.66) return [390 - 8 * (d - 0.56) / 0.1, fallY(t, 136.0, 136.1, 858, 960), -d * 12];
  return [382 - 14 * K.ease.out(K.clamp((d - 0.66) / 0.5)), 960, -d * 6];
}
function a92Food2(t, A) {
  const draws = [];
  // Ali's hand (handLW) carries each item from the bag mouth to its place
  const mouth = [500, 805]; let hand = null, held = null;
  for (const [t0, kind, x, y] of A92_FOOD) {
    if (t >= t0) draws.push((c) => a92Food(c, kind, x, y, 1));
    else if (t >= t0 - 0.5) { const u = A92B(t, t0 - 0.5, 0.5); hand = [K.lerp(mouth[0], x, u), K.lerp(mouth[1], y - 12, u) - 30 * Math.sin(Math.PI * u)]; held = [kind, hand[0], hand[1] + 10]; }
  }
  if (t >= 133.52) A92_OLV.forEach(([x, y], i) => { const r = K.rng(600 + i), u = K.ease.out(K.clamp((t - 133.52 - i * 0.05) / 0.4)); let ox = K.lerp(520, x, u), oy = K.lerp(830, y, u); if (i === 4) { ox = K.lerp(520, 612, K.ease.out(K.clamp((t - 133.6) / 0.5))); if (t > 134.1) ox = 604; } const rr = r() * 2; if (t >= 133.52 + i * 0.05) draws.push((c) => a92Food(c, 'olive', ox, oy, 1, rr)); });
  else if (t >= 133.1) { const u = A92B(t, 133.1, 0.4); hand = [K.lerp(mouth[0], 530, u), K.lerp(mouth[1], 840, u)]; }
  if (t >= 128.3 && t < 130.32) hand = [500 + 6 * Math.sin(t * 13), 822 + 4 * Math.cos(t * 11)];   // rummaging inside (hidden by the bag)
  if (hand) { A.handRW = hand; A.handR = null; }
  if (t >= 131.44 && t < 132.2) { A.handL = [40, -170]; A.wink = 'R'; }
  if (t >= 134.0 && t < 134.4) A.handLW = [606, 862];
  if (t >= 134.58 && t < 136.22) { A.handRW = [500, 800]; A.handLW = [530, 790]; }
  if (held) draws.push((c) => a92Food(c, held[0], held[1], held[2], 1));
  const L = a92LemonPos(t); if (L) draws.push((c) => a92Food(c, 'lemon', L[0], L[1], 1, L[2]));
  return (c) => draws.forEach((d) => d(c));
}

// ---------- overlays (panel space) ----------
function a92OCourt(ctx, t, P, S, r, L) {
  if (a92In(t, 49.66, 51.6) && r.J) { const h = P(...a92Head(r.J)); L.lab('THE JUDGE', h[0], h[1] - 170, 49.66, 51.6, { size: 48 }); }
  if (a92In(t, 52.92, 54.9)) { const b = P(510, 740); L.word('?', b[0], b[1], 52.92, 54.9, 90, { fill: C.white }); }
  if (a92In(t, 71.72, 73.9)) { const b = P(500, 800); L.arr([b[0] + 200, 1080], [b[0] + 60, b[1] + 10], 71.72, 73.9, { width: 18, bend: 0.25 }); L.lab('IN THIS SMALL BAG?!', 500, 1130, 72.22, 73.9, { size: 54 }); }
  if (a92In(t, 79.84, 81.0)) { const h = P(...a92Head(r.A)); L.word('EVEN BIGGER!', h[0] - 300, h[1] - 120, 79.84, 81.0, 76, { rot: -0.06 }); }
  if (a92In(t, 92.44, 96.6)) { const n = t < 93.2 ? Math.round(K.lerp(1, 999, K.ease.in(K.clamp((t - 92.44) / 0.75)))) : '1000s'; const c = [500, 200]; ctx.save(); ctx.globalAlpha = a92Fade(t, 92.44, 96.6, 0.2);
    S.label(ctx, String(n), c[0], c[1] + 40, A92B(t, 92.44, 0.3), { size: 58, align: 'center', fill: C.yellow }); ctx.restore(); }
  if (a92In(t, 97.0, 98.6)) L.word('ENOUGH!', 500, 230, 97.0, 98.6, 120, { rot: -0.05, fill: C.red });
  if (a92In(t, 116.64, 118.4)) L.word('OPEN IT!', 500, 300, 116.64, 118.4, 104, { rot: 0.05 });
  // the judge's balloon: a bottomless sea, then a hall for everyone
  if (t >= 108.3 && t < 115.0 && r.J) { const p = t < 114.82 ? K.clamp((t - 108.3) / 0.6) : 0; const c = P(500, 300), h = P(...a92Head(r.J)), z = r.z || 1.2;
    thoughtCloud(ctx, c[0], c[1], 470 * z, 340 * z, t, { p, tail: [h[0], h[1] - 70 * z], fill: C.white, scale: z, at: [0, 0], inside: (k) => a92BalloonInside(k, t) }); }
  if (t >= 114.82 && t < 115.4) { const c = P(500, 300); dustBurst(ctx, c[0], c[1], t - 114.82, 12, 8, 18, 160, 0.55, 21); }
  // ghost tiles over the open bag, crossed out one by one
  if (t >= 124.48 && t < 128.6) { const fo = t > 128.0 ? 1 - K.clamp((t - 128.0) / 0.3) : 1; ctx.save(); ctx.globalAlpha = fo;
    const G = [[124.48, [['baghdad', 0, { wide: 1, label: 'BAGHDAD' }]]], [126.02, [['camel', -70, {}], ['lion', 70, {}]]], [127.66, [['army', 0, { wide: 1 }]]]];
    G.forEach(([t0, items], gi) => { if (t < t0) return; const nx = gi < G.length - 1 ? G[gi + 1][0] : 1e9, sl = t >= nx ? A92B(t, nx, 0.4) : 0; const ga = 0.5 - 0.3 * sl;
      items.forEach(([kind, dx, o]) => { const c = P(500 + dx - 330 * sl * (gi === 0 ? 1 : gi === 1 ? 1 : 0), 480 - 40 * sl), z = r.z || 1.6; a92Tile(ctx, c[0], c[1], kind, { ...o, size: 100 * z, ghost: true, ga: ga + 0.1, p: K.clamp((t - t0) / 0.3), t }); });
      const c = P(500 - 330 * sl * (gi < 2 ? 1 : 0), 480 - 40 * sl); ctx.save(); ctx.globalAlpha *= 1 - sl * 0.6; a92X(ctx, c[0], c[1], 50 * (r.z || 1.6) * 0.8, K.clamp((t - t0 - 0.25) / 0.12)); ctx.restore(); });
    ctx.restore(); }
  // S11: counter of the foods and THAT'S ALL!
  if (t >= 130.82 && t < 136.22) { const n = t >= 135.44 ? 4 : t >= 133.52 ? 3 : t >= 132.76 ? 2 : 1, last = [130.82, 132.76, 133.52, 135.44][n - 1];
    ctx.save(); ctx.translate(850, 140); const k = 1 + 0.25 * Math.exp(-(t - last) * 9); ctx.scale(k, k); shape(ctx, ell(0, 0, 62, 62, 30), C.yellow, { lw: 7, seed: 520, dot: C.red, pitch: 9, rad: 0.2, da: 0.4 });
    ctx.font = K.font(84, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(String(n), 0, 6); ctx.restore(); }
  if (a92In(t, 135.9, 136.22)) L.word("THAT'S ALL!", 500, 330, 135.9, 136.3, 92, { rot: -0.05 });
}
// what the judge imagines: the bag as a bottomless sea, then as a hall that swallows a queue of people (balloon-local units)
function a92BalloonInside(c, t) {
  c.fillStyle = '#fff3d6'; c.fillRect(-300, -200, 600, 400);
  const sea = t < 111.98, bx = 0, by = 140;
  if (sea) {
    c.save(); c.translate(bx, by); c.scale(3.2, 3.2); a92Bag(c, 0, 0, { open: 1 }); c.restore();
    // the mouth is a sea: waves, a rocking boat, a fish
    c.save(); c.beginPath(); c.ellipse(0, by - 190, 85, 26, 0, 0, 7); c.clip(); c.fillStyle = C.blue; c.fillRect(-100, by - 230, 200, 80); c.lineWidth = 4; c.strokeStyle = C.white;
    for (let k = 0; k < 3; k++) { c.beginPath(); for (let x = -100; x <= 100; x += 8) { const y = by - 200 + k * 10 + 3 * Math.sin(x * 0.12 + t * 4 + k); x === -100 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); } c.restore();
    const bob = 4 * Math.sin(t * 3), bt = 0.12 * Math.sin(t * 2.6); c.save(); c.translate(-10, by - 208 + bob); c.rotate(bt); shape(c, [[-34, 0], [34, 0], [24, 14], [-24, 14]], '#7a4212', { lw: 4, seed: 530 }); seg(c, 0, 0, 0, -50, 3, C.black, 1); shape(c, [[0, -50], [0, -8], [26, -12]], C.white, { lw: 3, seed: 531 });
    if (t >= 110.2) { shape(c, ell(-18, -12, 8, 8, 10), C.white, { lw: 2.5, seed: 532, dot: C.skin, pitch: 4, rad: 0.3 }); if (t > 111.0) seg(c, -12, -14, -6, -24, 3, C.white, 1.5); } c.restore();
    const fu = ((t - 109.68) % 1.6) / 0.8; if (t >= 109.9 && fu < 1) { c.save(); c.translate(40 + 30 * fu, by - 210 - 50 * Math.sin(Math.PI * fu)); c.rotate(-1 + 2 * fu); shape(c, [[-12, 0], [0, -6], [12, 0], [0, 6]], C.yellow, { lw: 2.5, seed: 533 }); shape(c, [[-12, 0], [-20, -6], [-20, 6]], C.yellow, { lw: 2.5, seed: 534 }); c.restore(); }
    // the anchor chain runs down and down inside the bag
    if (t >= 110.2) { c.save(); c.beginPath(); c.ellipse(0, by - 90, 80, 100, 0, 0, 7); c.clip(); c.fillStyle = 'rgba(13,34,96,0.5)'; c.fillRect(-90, by - 190, 180, 200); const sc = (t - 110.2) * 120;
      for (let y = -60; y < 220; y += 14) { const yy = by - 190 + ((y + sc) % 220); c.lineWidth = 3; c.strokeStyle = '#b9b4c6'; c.beginPath(); c.ellipse(-14, yy, 4, 7, 0, 0, 7); c.stroke(); } c.restore();
      c.font = K.font(30, BF, 400); c.fillStyle = C.black; c.textAlign = 'left'; c.fillText(Math.round((t - 110.2) * 900) + ' FT...', 70, by - 60); }
  } else {
    const bu = 1 + (t >= 113.66 ? 0.15 * Math.abs(Math.sin((t - 113.66) * 6)) : 0);
    c.save(); c.translate(bx, by); c.scale(3.2 * bu, 3.2); a92Bag(c, 0, 0, { open: t >= 113.66 ? 0.8 : 0.2 }); c.restore();
    shape(c, townArchPts(-24, 24, by - 110, by - 30, 'pointed'), C.black, { lw: 4, seed: 535 });
    for (let i = 0; i < 8; i++) { const d = ((t - 111.98) * 70 + i * 34) % 300, x = -260 + d; if (x > -24) continue; const bob = Math.abs(Math.sin(t * 9 + i)) * 4; seg(c, x, by - 40 - bob, x, by - 60 - bob, 9, [C.red, C.blue, GREEN, C.yellow][i % 4], 2); shape(c, ell(x, by - 70 - bob, 7, 7, 10), C.white, { lw: 2, seed: 536, dot: C.skin, pitch: 4, rad: 0.3 }); }
    if (t >= 113.66) for (let i = 0; i < 12; i++) { const r = K.rng(700 + i), k = K.ease.back(K.clamp((t - 114.08 - i * 0.04) / 0.2)); if (k <= 0) continue; const hx = (r() - 0.5) * 140, hy = by - 200 - r() * 50; c.save(); c.translate(hx, hy); c.scale(k, k); shape(c, ell(0, 0, 11, 11, 12), C.white, { lw: 2.5, seed: 537, dot: C.skin, pitch: 4, rad: 0.3 }); c.fillStyle = C.black; c.fillRect(-5, -2, 3, 3); c.fillRect(2, -2, 3, 3); c.restore(); }
  }
}
