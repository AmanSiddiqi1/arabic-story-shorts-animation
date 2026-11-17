// ===== KD-008 S1-S6 at the pond (0 - 109.6): home, drought, the lake idea, the stick plan, the rule, the bite =====
const KD8_HOT = 20.05;                        // palette switch under the DAYS LATER card
const kd8Level = (t) => kfn(t, [[23.4, 1], [25.3, 0.5], [30.2, 0.5], [32.0, 0.14]]);
const kd8Crack = (t) => kfn(t, [[26.7, 0], [27.1, 0.35], [27.45, 0.35], [27.8, 0.7], [28.0, 0.7], [28.3, 1]]);
// ---------- tortoise ----------
const KD8_TX = (t) => kfn(t, [[8.06, 232], [9.6, 300], [30.2, 300], [32.0, 330], [36.7, 330], [37.05, 337], [37.4, 337], [37.75, 344], [38.1, 344], [38.45, 352], [56.9, 352], [57.6, 362], [57.8, 362], [58.4, 372]]);
const KD8_TY = (t) => kfn(t, [[8.06, 904], [9.6, 926], [24.0, 926], [26.0, 938]]);
const KD8_TFALLS = footfalls(KD8_TX, 8.0, 59, 14);
const KD8_TKEYS = [
  [0, { hide: 1, lid: 0.7, mouth: 'closed', neck: 0.2 }], [0.5, { hide: 0, neck: 0.4 }, 0.7], [0.9, { mouth: 'yawn', open: 0.7 }], [1.4, { mouth: 'smile', lid: 0.08 }, 0.5],
  [1.78, { nAng: -0.1, headRot: 0.25 }], [3.82, { nAng: -0.35, headRot: -0.1 }], [5.22, { nAng: -0.6, headRot: -0.35, brow: -0.6, sq: 0.96 }, 0.25], [5.5, { sq: 1.03 }, 0.2], [5.8, { sq: 1 }],
  [6.32, { tip: -0.07 }], [7.56, { mouth: 'open', open: 0.6, lid: 0.55, tip: 0 }, 0.2], [8.0, { mouth: 'smile', lid: 0, nAng: -0.3, headRot: 0, brow: 0 }],
  [11.84, { neck: 0.7, nAng: -0.08, headRot: 0.14, lid: 0.15 }, 0.5], [12.4, { lid: 0 }], [16.06, { headRot: -0.35, mouth: 'o', nAng: -0.45 }], [16.98, { headRot: 0.35, mouth: 'closed', nAng: 0 }],
  [17.6, { headRot: -0.15, mouth: 'smile', wet: true, nAng: -0.3 }], [18.02, { sq: 1.03 }, 0.6], [18.6, { sq: 0.97 }, 0.6], [19.2, { sq: 1, wet: false }],
  // S2: drought
  [20.05, { neck: 0.4, nAng: -0.35, headRot: -0.2, mouth: 'closed', brow: -0.2, lid: 0.1 }], [21.3, { lid: 0.3, headRot: 0 }],
  [22.5, { headRot: -0.4, nAng: -0.6, brow: -0.6, mouth: 'o', lid: 0 }], [23.3, { headRot: 0, nAng: -0.25, brow: -0.2, mouth: 'frown' }, 0.5],
  [25.5, { neck: 1.0, nAng: 0.55, headRot: 0.45, mouth: 'frown' }, 0.6], [26.4, { neck: 0.45, nAng: -0.2, headRot: 0 }],
  [28.4, { headRot: 0.2 }], [30.2, { neck: 0.6, nAng: 0.2, tip: 0.05 }], [32.2, { headRot: 0.4, brow: -0.6, tip: 0.02 }],
  [33.93, { hide: 0.5, brow: -1, eyes: 'wide', mouth: 'o', tip: 0, neck: 0.4, nAng: -0.2, headRot: 0 }, 0.25],
  [35.3, { hide: 0.05, eyes: 'open', lid: 0.2, mouth: 'closed', brow: -0.5, nAng: -0.45, neck: 0.55 }, 0.5],
  [36.6, { tip: 0.07, brow: 0.5, lid: 0.25, mouth: 'tight', nAng: -0.15 }], [38.5, { tip: 0, mouth: 'open', open: 0.35, lid: 0.5, wet: true, nAng: 0.25, neck: 0.4, brow: -0.4 }, 0.6],
  // S3: the lake idea
  [40.4, { mouth: 'closed', lid: 0, nAng: -0.35, headRot: -0.15, brow: -0.3 }, 0.6], [43.54, { mouth: 'o', headRot: -0.4, nAng: -0.55, wet: false }],
  [45.1, { headRot: -0.15, nAng: -0.35 }], [47.6, { eyes: 'wide', mouth: 'smile', neck: 0.85, nAng: -0.7, headRot: -0.4, brow: -0.4 }],
  [49.5, { eyes: 'open', mouth: 'closed', neck: 0.45, nAng: -0.1, headRot: 0.4, brow: -0.6 }, 0.6], [51.1, { headRot: -0.12, nAng: -0.3, tip: -0.05 }], [53.5, { tip: 0 }],
  [56.9, { headRot: 0, nAng: -0.25, brow: -0.2 }], [58.6, { lid: 0.4, headRot: 0.1, brow: 0 }],
  // S4: the plan
  [60.4, { lid: 0, nAng: -0.3, headRot: 0 }], [66.6, { neck: 0.8, nAng: 0.45, headRot: 0.3, brow: -0.5 }, 0.5], [67.9, { neck: 0.45, nAng: -0.5, headRot: -0.3, brow: -0.3 }],
  [71.32, { eyes: 'wide', mouth: 'o', tip: -0.08, footUp: 1, headRot: -0.1, nAng: -0.3 }], [73.0, { eyes: 'open', mouth: 'closed', tip: 0, footUp: 0 }],
  [73.96, { headRot: 0.3, nAng: 0 }], [77.6, { headRot: -0.5, nAng: -0.6, mouth: 'closed' }], [78.6, { brow: 0.45, headRot: -0.2 }], [79.88, { mouth: 'smile', brow: -0.3 }],
  // S5: joy, the rule
  [81.6, { lid: 1, mouth: 'open', open: 0.5 }, 0.2], [83.0, { lid: 0 }], [84.24, { lid: 0, mouth: 'o', footUp: 1, brow: -0.5 }, 0.12], [85.6, { footUp: 0, mouth: 'closed' }, 0.9],
  [88.6, { tip: 0.04, neck: 0.55, nAng: -0.2 }], [90.92, { mouth: 'tight', headRot: 0.15 }], [92.6, { headRot: 0 }], [94.2, { puff: 1 }], [95.6, { puff: 0 }],
  [97.4, { hide: 0.4, eyes: 'wide', tip: 0 }, 0.15], [99.0, { hide: 0, eyes: 'open', brow: 0.3 }, 0.4], [101.7, { lid: 1, mouth: 'smile', puff: 0 }, 0.3], [102.6, { lid: 0 }],
];
function kd8TortPond(t) {
  const P = kd8Pose(t, { s: 1.3, dir: 1, neck: 0.35, nAng: -0.3, headRot: 0, hide: 0, mouth: 'smile', brow: 0, lid: 0, sq: 1, tip: 0 }, KD8_TKEYS);
  Object.assign(P, walk(KD8_TX, t, { stride: 14, amp: 40 })); P.y = KD8_TY(t);
  if (t > 26.9 && t < 27.6) P.footUp = pulse(t, 27.1, 0.4) * 0.8;   // a crack under her foot
  if (t > 32.2 && t < 33.1) P.footUp = pulse(t, 32.2, 0.8);           // one foot into the puddle
  if (t > 33.93 && t < 35.3) { P.x += tremble(t, 1.6, 11); P.noBlink = true; }
  if (t > 38.5 && t < 40.4) P.sq = breathe(t, 2, 0.035) * (1 - 0.02 * pulse(t, 39.0, 1.2));
  if (t > 11.84 && t < 13.6) P.sq = breathe(t, 3, 0.02);
  if (t > 73.96 && t < 74.9) { P.mouth = (t % 0.44) < 0.18 ? 'open' : 'tight'; P.open = 0.55; }   // jaw practice: snap, snap
  if (t > 77.6 && t < 78.3) P.neck += 0.06 * pulse(t, 77.9, 0.3);                                  // swallow
  if (t > 92.0 && t < 95.6) P.mouth = 'tight';
  if (t > 98.76 && t < 102.0) { const nd = 0.55 * pulse(t, 99.65, 0.6) + 0.25 * pulse(t, 100.94, 0.35) + 0.25 * pulse(t, 101.64, 0.35); P.nAng = (P.nAng || 0) + nd; P.mouth = t > 100.8 ? 'tight' : P.mouth; }
  // joy: heavy hops and a turn
  if (t > 81.3 && t < 84.24) { const h1 = hop(t, 82.07, 0.55, 0, 0, 30)[1], h2 = hop(t, 83.42, 0.4, 0, 0, 16)[1]; P.y -= h1 + h2; P.sq = anticipate(t, 81.75, 0.3, 0.1) * landSquash(t, 82.62) * landSquash(t, 83.82, 0.1);
    const tf = turnFlip(t, [[0, 1], [82.1, -1], [83.45, 1]], 0.5); P.dir = tf.dir; P.ph = t * 9; P.amp = t > 83.2 ? 0.5 : 0; }
  if (t > 101.64 && t < 102.3) P.sq = 1 - 0.03 * pulse(t, 101.8, 0.35);   // the pat on the shell
  return P;
}
const KD8_DFALL = [{ x: 640, y: 930, s: 1.15, dir: -1 }, { x: 800, y: 945, s: 1.15, pal: 1, dir: -1 }];
function kd8TortGazePond(t, P, D) {
  D = D || KD8_DFALL; const g = kd8TortGeo(P).head;
  P.gaze = kd8Gaze(t, g, [[0, [520, 990]], [1.78, [520, 1000]], [3.6, (u) => kd8Bird(u)], [5.0, [900, 120]], [6.4, () => kd8DuckHead(D[0])], [11.84, () => kd8DuckHead(D[0])],
    [15.1, (u) => [K.lerp(380, 820, K.clamp((u - 15.1) / 0.9)), 430]], [16.06, [600, 300]], [16.98, [P.x + 40, 960]], [17.6, [760, 420]], [19.2, [600, 600]],
    [20.5, (u) => kd8SunPos(u)], [22.5, [560, 260]], [23.3, [600, 990]], [27.2, [P.x + 60, 990]], [28.4, (u) => kd8Leaf(u)], [30.0, [560, 1000]], [32.2, [P.x + 150, 1000]],
    [32.7, [1000, 900]], [33.93, [700, 700]], [35.42, [1000, 700]], [36.6, [700, 930]], [38.6, [P.x + 120, 990]],
    [40.6, () => kd8DuckHead(D[0])], [43.54, [520, 380]], [45.1, [1000, 760]], [46.0, [560, 400]], [49.5, [P.x + 60, 960]], [51.1, () => kd8DuckHead(D[0])], [53.9, () => kd8DuckHead(D[1])],
    [56.0, () => kd8DuckHead(D[0])], [58.6, (u) => [kd8SnailX(u) + 20, 930]], [60.3, () => kd8DuckHead(D[0])], [61.0, () => kd8DuckHead(D[1])], [61.7, () => kd8DuckHead(D[0])], [63.6, [880, 900]],
    [66.6, [520, 930]], [67.9, (u) => [K.lerp(320, 720, K.clamp((u - 67.9) / 1.6)), 400]], [70.68, [330, 380]], [71.3, () => kd8DuckHead(D[0])], [73.1, [P.x + 260, 930]], [74.9, [520, 380]],
    [75.3, (u) => [K.lerp(520, 700, K.clamp((u - 75.3) / 2)), K.lerp(380, 300, K.clamp((u - 75.3) / 2))]], [77.6, [560, 0]], [79.0, [760, 420]], [80.0, () => kd8DuckHead(D[0])],
    [84.24, () => kd8DuckHead(D[0])], [87.1, () => kd8DuckHead(D[0])], [90.92, [P.x + 260, 950]], [91.6, () => kd8DuckHead(D[0])], [92.4, () => kd8DuckHead(D[1])],
    [93.4, [200, 700]], [94.2, [800, 760]], [94.9, [240, 760]], [95.6, () => kd8DuckHead(D[1])], [96.6, [690, 940]], [98.76, () => kd8DuckHead(D[0])]], 0.12);
  return P;
}
// ---------- ducks: A (white, leader) and B (mallard, eager) ----------
const kd8DuckHead = (D) => kd8DuckGeo(D).head;
const KD8_AX = (t) => kfn(t, [[8.06, 610], [9.6, 560], [39.9, 560], [40.4, 730], [40.62, 730], [41.3, 690], [61.8, 690], [62.7, 840], [63.6, 840], [64.24, 840], [64.9, 760], [84.9, 760], [85.6, 720]]);
const KD8_BX = (t) => kfn(t, [[8.06, 760], [9.6, 700], [39.9, 700], [40.5, 830], [61.8, 830], [62.7, 700], [64.3, 700], [64.9, 940], [66.4, 940], [67.0, 950], [84.9, 950], [85.7, 900]]);
function kd8Bird(t) { const u = K.clamp((t - 3.6) / 1.4); return [K.lerp(560, 880, u) + Math.sin(u * 9) * 20, K.lerp(560, 452, K.ease.out(u)) - Math.sin(u * Math.PI) * 60]; }
const kd8SunPos = (t) => { if (t < 20.5 || t > 22.2) return [700, 200]; const u = ((t - 20.5) / 1.7 * 3) % 1; return [K.lerp(-120, 1120, u), 340 - 240 * Math.sin(Math.PI * u)]; };
const kd8Leaf = (t) => { const u = K.clamp((t - 28.6) / 1.3); return [808 - 60 * u + Math.sin(u * 12) * 18, K.lerp(830, 985, u)]; };
const kd8SnailX = (t) => kfn(t, [[58.5, 230], [61.2, 600]], "lin");
// flight in (S1) and landing on the water
function kd8FlyIn(t, t0, t1, from, to) { const u = K.clamp((t - t0) / (t1 - t0)), e = K.ease.out(u); return [K.lerp(from[0], to[0], e), K.lerp(from[1], to[1], e) - Math.sin(Math.PI * u) * 60]; }
function kd8DucksPond(t, T) {
  const tg = kd8TortGeo(T).head, out = [];
  for (const i of [0, 1]) {
    const A = i === 0, X = A ? KD8_AX : KD8_BX, base = { s: 1.2, pal: i, dir: -1, neck: 0, headRot: 0, wing: 0, wingF: 0, talk: 0, tip: 0, sq: 1, brow: 0 };
    const land1 = A ? 7.56 : 7.76, land3 = A ? 40.4 : 40.55;
    const keys = A ? [
      [12.0, { headRot: 0.1 }], [13.92, { wing: 2.6 }, 0.4], [14.5, { wing: 1.6 }, 0.5], [15.0, { wing: 0 }, 0.5],
      [40.62, { wing: -2.5, headRot: 0.1 }, 0.5], [41.5, { wing: 0 }], [42.44, { wing: 2.2, brow: -0.4, tip: 0.06 }], [43.4, { wing: 0, tip: 0 }], [45.76, { wing: 0.65, headRot: -0.15 }, 0.5], [47.0, { wing: 0, headRot: 0 }],
      [51.2, { headRot: 0.18 }], [54.1, { headRot: 0 }], [55.7, { wing: 1.1, headRot: 0.25 }], [56.4, { wing: 0, headRot: 0 }],
      [61.28, { wing: 2.35, headRot: -0.15 }], [61.8, { wing: 0, headRot: 0 }], [64.5, { neck: 1 }], [64.95, { neck: 0 }, 0.4], [65.68, { tip: -0.1 }, 0.2], [66.2, { tip: 0 }], [67.0, { neck: 1 }, 0.4], [67.5, { neck: 0, tip: 0.05 }], [67.94, { wing: 2.0, talk: 0, tip: 0 }],
      [70.4, { wing: 0 }], [71.32, { wing: 2.75 }], [72.8, { wing: 0 }], [75.4, { wing: 0.5 }], [77.0, { wing: 0 }],
      [80.0, { headRot: 0.12 }], [84.24, { wing: 2.2, brow: 0.4 }, 0.15], [85.0, { wing: 0, tip: 0.05 }], [87.1, { wing: 2.15, tip: 0.06 }], [89.4, { wing: 0 }], [90.76, { wing: -2.3, clamp: true }, 0.3], [92.2, { wing: 0, clamp: false, tip: 0.08 }],
      [97.3, { brow: 0.6 }], [99.0, { brow: 0, tip: 0 }], [101.64, { wing: -2.75, tip: 0.1 }, 0.25], [102.4, { wing: 0, tip: 0 }],
    ] : [
      [14.3, { headRot: 0.15 }], [14.9, { headRot: 0 }], [16.06, { wing: 2.0, wingF: 2.0, sq: 1.1 }, 0.35], [17.0, { wing: 0, wingF: 0, sq: 1 }, 0.4],
      [41.6, { headRot: 0.12 }], [42.1, { headRot: 0 }], [53.9, { headRot: 0.4 }], [54.8, { wing: 1.9, headRot: 0.2 }, 0.2], [55.3, { wing: 0 }, 0.2], [56.2, { headRot: 0 }],
      [61.28, { headRot: -0.3, wing: 2.5 }], [62.0, { wing: 0, headRot: 0 }], [63.0, { headRot: -0.35 }], [63.44, { headRot: 0.1, bill: 0.6, sq: 1.06 }, 0.12], [64.0, { bill: 0, sq: 1 }],
      [64.5, { neck: 1 }], [64.95, { neck: 0 }, 0.4], [65.68, { tip: -0.1 }, 0.2], [66.2, { tip: 0 }], [67.05, { neck: 1 }, 0.4], [67.55, { neck: 0 }], [70.75, { wing: 2.4 }], [71.2, { wing: 0 }],
      [71.4, { wing: 2.75 }], [72.8, { wing: 0 }], [75.4, { wing: 1.9, wingF: 1.9, sq: 1.06 }], [77.4, { wing: 0, wingF: 0, sq: 1 }],
      [84.4, { brow: 0.4 }], [85.1, { tip: 0.05 }], [92.4, { wing: 1.7, wingF: 1.7, clamp: true, sq: 1.04 }, 0.3], [93.3, { wing: 0, wingF: 0, clamp: false, sq: 1 }],
      [95.66, { clamp: true }], [96.42, { bill: 0.9, clamp: false }, 0.1], [97.0, { bill: 0 }], [99.0, { tip: 0 }],
    ];
    const P = kd8Pose(t, base, keys);
    // flight in (S1, S3), swimming (S1), standing (S3 on)
    if (t < 20.05) {
      const to = A ? [610, 993] : [760, 1013];
      if (t < land1) { const p = kd8FlyIn(t, A ? 6.2 : 6.45, land1, A ? [1150, 120] : [1180, 220], to); Object.assign(P, { x: p[0], y: p[1], fly: true, flap: Math.sin(t * 16 + i * 2.1), neck: 0.25 }); }
      else { P.swim = true; P.x = X(t); P.y = (A ? 993 : 1013) - (A ? 0 : 0) + (t < 9.6 ? kfn(t, [[8.06, 0], [9.6, -24]]) : -24) + Math.sin(t * 2 + i) * 2; P.sq = landSquash(t, land1, 0.2);
        P.ph = t * 6; }
    } else {
      if (t < land3) { const p = kd8FlyIn(t, A ? 39.6 : 39.75, land3, A ? [1150, 200] : [1200, 300], [X(land3), A ? 930 : 945]); Object.assign(P, { x: p[0], y: p[1], fly: true, flap: Math.sin(t * 15 + i * 2.1), neck: 0.2 }); }
      else { P.y = A ? 930 : 945; Object.assign(P, walk(X, t, { stride: 10, amp: 60 })); P.sq *= landSquash(t, land3, 0.18);
        // facing: they pace (cross), pick the branch up facing left
        if (t > 61.8 && t < 62.75) P.dir = A ? 1 : -1;
        if (t > 64.24 && t < 64.9) P.dir = A ? -1 : 1;
        if (!A && t > 55.4 && t < 56.2) { const h = hop(t, 55.52, 0.5, 0, 0, 34)[1]; P.y -= h; P.sq = anticipate(t, 55.3, 0.22, 0.1) * landSquash(t, 56.02); P.wing = 2.2 * pulse(t, 55.45, 0.5); P.wingF = P.wing; } }
    }
    // nods and head shakes, never in unison
    const nodT = A ? [10.0, 10.66, 88.9, 99.9] : [10.33, 14.3, 41.62, 89.2, 89.75];
    for (const n of nodT) P.headRot = (P.headRot || 0) + 0.35 * kd8Nod(t, n, 0.4);
    if (t > 93.4 && t < 95.6) P.headRot = (P.headRot || 0) + 0.18 * Math.sin((t - 93.4) * 14 + i * 1.6);
    if (A && t > 90.76 && t < 92.2) P.clamp = true;
    out.push(P);
  }
  for (const i of [0, 1]) { const A = i === 0, P = out[i], O = out[1 - i], hd = kd8DuckGeo(P).head;
    P.gaze = kd8Gaze(t, hd, A ? [[0, [400, 800]], [6.4, tg], [13.92, [600, 380]], [14.6, tg], [40.5, tg], [43.6, [520, 380]], [44.4, tg], [45.76, [1000, 700]], [46.6, tg], [55.6, [hd[0] + 80, hd[1] + 40]], [56.4, tg],
      [61.28, [hd[0], hd[1] - 120]], [61.5, [hd[0] - 100, hd[1] - 60]], [61.65, [hd[0] + 120, hd[1] - 100]], [62.0, [1000, 900]], [63.6, [900, 900]], [64.24, [880, 920]], [65.0, () => kd8DuckHead(O)],
      [65.4, [800, 820]], [67.9, [520, 380]], [68.6, tg], [69.5, [520, 380]], [70.2, tg], [79.0, tg], [87.1, tg], [96.42, [690, 940]], [97.6, tg]]
      : [[0, [400, 800]], [6.4, tg], [13.92, () => kd8DuckHead(O)], [14.6, tg], [15.9, [600, 300]], [16.9, tg], [40.6, () => kd8DuckHead(O)], [41.7, tg], [43.6, [520, 380]], [45.0, tg],
      [53.9, [hd[0] + 60, hd[1] + 50]], [55.3, [hd[0], hd[1] - 120]], [56.2, tg], [59.0, () => kd8DuckHead(O)], [59.8, tg],
      [61.28, [hd[0] - 80, hd[1] - 120]], [61.45, [hd[0] + 100, hd[1] - 80]], [61.6, [hd[0], hd[1] - 140]], [62.9, [hd[0] - 60, hd[1] - 200]], [63.44, [880, 915]], [64.9, () => kd8DuckHead(O)], [65.4, [700, 820]],
      [67.9, [520, 380]], [68.8, tg], [70.6, [520, 380]], [71.4, tg], [75.3, [600, 320]], [77.5, tg], [87.3, [hd[0] - 60, hd[1] - 30]], [87.8, tg], [96.42, [690, 860]], [96.8, [690, 940]], [97.6, tg]], 0.1);
  }
  return out;
}
// ---------- the stick at the pond ----------
function kd8StickPond(t, D) {
  if (t < 64.9) return { ends: [[429, 914], [1029, 914]], sag: 0 };                     // lying by the reeds
  if (t < 67.6) { const g = kd8Grips(kd8Grip(D[0]), kd8Grip(D[1])); return { ends: [g[1], g[0]], sag: t > 65.68 && t < 66.4 ? -10 * Math.sin((t - 65.68) * 16) * Math.exp(-(t - 65.68) * 5) : 6 }; }
  return { ends: [[429, 916], [1029, 916]], sag: 0 };                                       // laid in front of her
}
// ---------- S6: the bite and the grip (102.9 - 109.6): ducks over the two ends, facing right ----------
function kd8S6(t) {
  const clampU = K.clamp((t - 106.8) / 0.5), clampB = K.clamp((t - 107.05) / 0.5);
  const A = { x: 130, y: 900, s: 1.3, pal: 0, dir: 1, neck: 0.12 * K.ease.inOut(clampU), clamp: t > 106.9, wing: 0, wingF: 0 };
  const B = { x: 640, y: 900, s: 1.3, pal: 1, dir: 1, neck: 0.12 * K.ease.inOut(clampB), clamp: t > 107.15, wing: 0, wingF: 0 };
  // wings spread and beat (107.82 - 109.6), crouch before the first beat
  if (t > 107.6) { for (const [D, ph] of [[A, 0], [B, 2.1]]) { const on = K.clamp((t - 107.82 - ph * 0.05) / 0.3); D.wing = on * (1.6 + 0.9 * Math.sin((t - 107.82) * 13 + ph)); D.wingF = D.wing + 0.15; D.sq = anticipate(t, 107.55, 0.3, 0.08); } }
  if (t > 106.8) { A.headRot = 0.25 * kd8Nod(t, 107.5, 0.4); B.headRot = 0.25 * kd8Nod(t, 107.7, 0.4); }
  const gA = kd8Grip(A), gB = kd8Grip(B), st = kd8Grips(gA, gB), bit = t >= 105.44;
  const sag = bit ? 8 + 10 * Math.exp(-(t - 105.44) * 5) * Math.cos((t - 105.44) * 14) : 2;
  const mid = kd8StickPt(st[0], st[1], sag, 0.5);
  const tk = kd8Pose(t, { s: 1.3, dir: 1, nAng: -1.15, headRot: -0.15, mouth: 'closed', brow: 0.2, lid: 0 },
    [[103.2, { nAng: -1.0 }, 0.3], [104.0, { mouth: 'open', open: 1, brow: 0.35, nAng: -1.2 }, 0.4], [105.44, { mouth: 'closed', lid: 0.5, sq: 0.94 }, 0.08], [105.6, { lid: 0, sq: 1 }, 0.3], [107.8, { brow: -0.4, eyes: 'wide' }]]);
  let target = [mid[0], mid[1] + (bit ? 0 : 28 + 12 * (1 - K.clamp((t - 103.24) / 1.2)))];
  if (!bit && t > 104.6) target = [mid[0], mid[1] + K.lerp(28, 0, K.clamp((t - 104.6) / 0.84))];
  const T = kd8TortToMouth(tk, target, 900, 1.3);
  if (T.y < 900) T.y = 900, T.x = T.x;   // on the ground here
  T.gaze = t > 107.8 ? [Math.sin((t - 107.8) * 5) > 0 ? -0.9 : 0.9, -0.3] : lookAt(kd8TortGeo(T).head, mid);
  return { A, B, T, stick: st, sag, bite: bit };
}
// ---------- the pond scene ----------
const KD8_POND_CAM = [[0, { x: 500, y: 640, zoom: 1.0 }], [1.0, { x: 500, y: 640, zoom: 1.0 }], [5.2, { x: 470, y: 860, zoom: 1.75 }], [13.6, { x: 500, y: 860, zoom: 1.75 }], [14.6, { x: 560, y: 770, zoom: 1.35 }],
  [20.04, { x: 560, y: 770, zoom: 1.35 }], [20.05, { x: 500, y: 700, zoom: 1.1 }], [23.3, { x: 500, y: 760, zoom: 1.2 }], [25.3, { x: 470, y: 860, zoom: 1.6 }], [27.2, { x: 430, y: 880, zoom: 1.7 }], [30.0, { x: 600, y: 890, zoom: 1.7 }], [32.0, { x: 500, y: 880, zoom: 1.7 }],
  [33.0, { x: 500, y: 880, zoom: 1.7 }], [33.93, { x: 430, y: 850, zoom: 2.0 }], [35.3, { x: 430, y: 850, zoom: 2.0 }], [36.6, { x: 560, y: 800, zoom: 1.45 }], [39.4, { x: 560, y: 800, zoom: 1.45 }],
  [40.8, { x: 580, y: 830, zoom: 1.85 }], [43.54, { x: 580, y: 830, zoom: 1.85 }], [45.1, { x: 540, y: 700, zoom: 1.3 }], [49.0, { x: 540, y: 700, zoom: 1.3 }], [49.6, { x: 580, y: 830, zoom: 1.85 }],
  [56.8, { x: 580, y: 830, zoom: 1.85 }], [57.4, { x: 430, y: 880, zoom: 2.0 }], [60.0, { x: 450, y: 880, zoom: 1.9 }],
  [61.3, { x: 600, y: 820, zoom: 1.5 }], [63.4, { x: 650, y: 830, zoom: 1.55 }], [64.24, { x: 700, y: 830, zoom: 1.55 }], [66.4, { x: 700, y: 830, zoom: 1.55 }], [67.6, { x: 540, y: 620, zoom: 1.15 }],
  [80.9, { x: 540, y: 620, zoom: 1.15 }], [81.4, { x: 580, y: 830, zoom: 1.6 }], [84.24, { x: 580, y: 830, zoom: 1.6 }], [87.1, { x: 580, y: 830, zoom: 1.6 }], [90.0, { x: 600, y: 830, zoom: 1.9 }],
  [96.9, { x: 600, y: 830, zoom: 1.9 }], [97.4, { x: 650, y: 870, zoom: 1.9 }], [98.6, { x: 650, y: 870, zoom: 1.9 }], [99.4, { x: 500, y: 840, zoom: 2.4 }], [102.89, { x: 500, y: 840, zoom: 2.4 }],
  [102.9, { x: 470, y: 760, zoom: 2.8 }], [105.7, { x: 470, y: 760, zoom: 2.6 }], [106.8, { x: 420, y: 760, zoom: 1.4 }], [109.6, { x: 420, y: 760, zoom: 1.4 }]];
const KD8_SC_POND = { ww: KD8_VW, wh: KD8_VH, cam: KD8_POND_CAM,
  draw(ctx, t) {
    const hot = t >= KD8_HOT;
    ctx.drawImage(kd8PondBack(hot), 0, 0, KD8_VW, KD8_VH);
    if (!hot) { const sb = t > 9.92 && t < 11.1 ? Math.abs(Math.sin((t - 9.92) / 1.1 * Math.PI * 3)) * 26 : 0; sun(ctx, 820, 190 - sb, t); cloudFlat(ctx, 180 + ((t * 5) % 1100), 230, 0.75); }
    else { const sp = kd8SunPos(t); sun(ctx, sp[0], sp[1], t); if (t > 22.3 && t < 23.7) { const u = (t - 22.3) / 1.4; cloudFlat(ctx, K.lerp(260, 560, u), 260, 0.7 * (1 - K.ease.in(K.clamp((u - 0.35) / 0.65)))); } }
    // songbird flits and perches (S1)
    if (t > 3.4 && t < 20.05) { const p = kd8Bird(t), perched = t > 5.0; songbird(ctx, { x: p[0], y: p[1], s: 0.9, dir: 1, fly: !perched, flap: t * 18, col: C.red }); }
    kd8Reeds(ctx, t, hot ? K.clamp((t - 28.68) / 1.2) : 0);
    kd8Pond(ctx, t, hot ? kd8Level(t) : 1, hot ? kd8Crack(t) : 0, hot);
    // ripples
    if (!hot) { for (const [x, y, t0] of [[480, 990, 0.3], [640, 1010, 1.9], [620, 990, 2.4]]) ripple(ctx, x, y, t0, t, 0.9); for (const [i, tl] of [[0, 7.56], [1, 7.76]]) ripple(ctx, i ? 760 : 610, i ? 1000 : 980, tl, t, 1.2); }
    if (t > 32.2 && t < 34) ripple(ctx, 560, 1000, 32.45, t, 0.6);
    // the snail overtakes her (S3)
    const s6 = t >= 102.9;
    if (s6) { const R = kd8S6(t); kd8DrawRig(ctx, R);
      if (t > 107.8) for (const [x0, t0] of [[180, 108.0], [700, 108.2], [430, 108.6], [250, 109.1], [650, 109.3]]) dustBurst(ctx, x0, 900, t - t0, 5, 8, 18, 40, 0.7, Math.round(t0 * 10));
      return; }
    const T = kd8TortPond(t);
    const D = (t > 20.05 && t < 39.5) ? null : kd8DucksPond(t, T);
    kd8TortGazePond(t, T, D);
    const S = kd8StickPond(t, D || KD8_DFALL);
    if (t >= 59.5 && (t < 64.9 || t >= 67.6)) kd8Stick(ctx, S.ends[0], S.ends[1], S.sag);
    kd8Tort(ctx, T);
    if (t > 58.4 && t < 62) kd8Snail(ctx, kd8SnailX(t), 975, 1.0, t);   // the snail overtakes her
    if (D) { const order = D[0].y <= D[1].y ? [0, 1] : [1, 0]; for (const i of order) kd8Duck(ctx, D[i]); }
    if (t >= 64.9 && t < 67.6) kd8Stick(ctx, S.ends[0], S.ends[1], S.sag);
    // pebble: held in B's bill, dropped on تكلمتِ, bounces once
    if (D && t > 95.6 && t < 102.9) { const B = D[1], g = kd8Grip(B); let px = g[0], py = g[1] + 12, sq = 1;
      if (t >= 96.42) { const gy = 948; py = Math.min(gy, fallY(t, 96.42, 97.2, g[1] + 12, gy)); if (t >= 97.2) { py = gy - rebound(t, 97.2, 22, 0.32); sq = impactSquash(t, 97.2, 0.7); } }
      kd8Pebble(ctx, px, py, 1.3, sq); dustBurst(ctx, px, 950, t - 97.2, 6, 6, 14, 34, 0.6, 9); }
    kd8Reeds(ctx, t, hot ? K.clamp((t - 28.68) / 1.2) : 0, true);
    if (t > 28.5 && t < 30.2) { const l = kd8Leaf(t); shape(ctx, ell(l[0], l[1], 14, 6, 10), '#c9a24a', { lw: 3, seed: 97 }); }
    // spray on landing, dust on her footfalls and the hard steps
    for (const [x, tl, sd] of [[610, 7.56, 1], [760, 7.76, 2]]) kd8Spray(ctx, x, 990, t - tl, sd);
    for (const f of KD8_TFALLS) dustBurst(ctx, f.x + 40, 930, t - f.t, 3, 4, 9, 18, 0.45, Math.round(f.t * 10));
    if (t > 82.6 && t < 84) for (const tl of [82.62, 83.82]) dustBurst(ctx, T.x, 935, t - tl, 6, 6, 14, 40, 0.6, Math.round(tl * 10));
    if (t > 33.93 && t < 35.4) kd8Sweat(ctx, kd8TortGeo(T).head[0] - 30, kd8TortGeo(T).head[1] - 40, (t - 34.2) % 1.2);
    if (t > 38.6 && t < 40.4) kd8Steam(ctx, kd8TortGeo(T).mouth[0], kd8TortGeo(T).mouth[1], (t - 38.7) % 0.9, 1);
  },
};
