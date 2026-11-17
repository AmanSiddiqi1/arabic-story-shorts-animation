// ===== KD-017 cast: servant (SV), friend/thief (TH), owner (OW), wife (WF); door states, knocks, props. All pure functions of t =====
const K17H = PERSON_HANDS;
const K17_SVB = { costume: 'servant', s: 0.92, pal: { dot: '#7fa3e8', sash: C.yellow }, seed: 11 };
const K17_THB = { costume: 'thief', s: 1.0, pal: { robe: C.yellow, stripes: C.red }, seed: 23 };
const K17_OWB = { costume: 'merchant', s: 1.05, pal: { robe: C.yellow, dot: C.red, trim: C.red, sash: C.red }, seed: 37 };
const K17_WFB = { costume: 'lady', s: 0.95, pal: { robe: C.red, dot: '#a8160f', trim: C.yellow }, seed: 41 };
const K17_THUMB = [-2.6, -2.0];   // the friend's thumb over the shoulder (aL): setup 78.9, payoff 154.1 (identical)
const K17_POINT = [1.55, 1.58];   // a full horizontal arm toward the facing side (aR)
// direction lists [t, dir] -> dir and a short squeeze on each turn
function k17Dir(t, list) { let d = list[0][1], sq = 1; for (const [t0, v] of list) { if (t >= t0) d = v; if (t0 > 0) sq = Math.min(sq, 1 - 0.07 * pulse(t, t0 - 0.06, 0.18)); } return { dir: d, sq }; }
const k17Nods = (t, list, a = 7, d = 0.22) => list.reduce((s, h) => s + a * pulse(t, h, d), 0);
const k17Arms = (P, amt = 1) => { const k = Math.sin(P.ph || 0) * amt; P.aR = [0.6 + 0.7 * k, 1.5 + 0.6 * k]; P.aL = [-0.6 + 0.7 * k, -1.5 + 0.6 * k]; };   // pumping run arms
const k17Look = (t, plan, e = 0.12) => gazePlan(t, plan, e);

// ---------- tracks (x keys; kfn eases every segment: walks start and stop softly) ----------
const K17_SVX = [[0, 780], [8.2, 780], [9.35, 780], [10.9, 1195], [15.0, 1195], [15.8, 990], [21.84, 990], [21.86, 560], [25.95, 560], [26.25, 455], [26.85, 455], [28.6, 1050], [29.9, 1050], [31.2, 680],
  [47.9, 680], [49.6, 745], [57.6, 745], [57.9, 760], [65.6, 760], [67.4, 930], [74.0, 930], [75.8, 690], [76.0, 690], [77.0, 665], [91.55, 665], [91.8, 705], [103.6, 705], [103.61, 1050],
  [116.9, 1050], [117.6, 1085], [123.3, 1085], [123.31, 1090], [138.7, 1090], [139.9, 885], [163.8, 885], [164.5, 690], [169.2, 690]];
const K17_SVD = [[0, 1], [8.1, -1], [9.05, 1], [12.2, -1], [15.0, 1], [21.85, -1], [26.75, 1], [29.85, -1], [31.0, 1], [44.75, -1], [47.9, 1], [74.0, -1], [77.02, 1], [138.65, -1], [139.9, 1], [163.75, -1]];
const K17_THX = [[0, 1420], [8.6, 1420], [9.0, 1345], [15.6, 1345], [17.2, 1160], [21.84, 1160], [21.86, 1420], [27.7, 1420], [28.9, 1230], [29.9, 1230], [31.2, 800], [35.0, 800], [35.3, 838],
  [44.85, 838], [45.15, 880], [48.2, 880], [50.4, 835], [65.25, 835], [67.6, 1240], [68.35, 1240], [68.8, 1222], [69.35, 1222], [70.6, 1290], [75.2, 1290], [76.6, 860], [77.6, 790],
  [91.56, 790], [92.0, 860], [103.6, 860], [103.61, 1160], [116.9, 1160], [118.0, 1200], [118.94, 1200], [119.3, 1350], [119.4, 1350], [119.96, 1490], [120.56, 1490], [121.4, 1210],
  [123.3, 1210], [123.31, 1190], [138.64, 1190], [142.0, 1265], [143.14, 1265], [143.8, 1250], [161.4, 1250], [164.6, 380], [166.5, 200]];
const K17_THD = [[0, -1], [57.9, 1], [74.95, -1], [90.7, 1], [93.8, -1], [119.0, 1], [120.5, -1], [137.25, 1], [145.6, -1]];
const K17_OWX = [[0, 1000], [11.9, 1000], [14.6, 360], [16.5, -120], [21.84, -120], [21.86, 640], [23.64, 640], [26.6, -120], [46.9, -120], [46.91, 300], [50.0, 300], [50.4, 285], [52.6, 285], [52.9, 300],
  [108.9, 300], [109.3, 322], [121.0, 322], [122.5, 270], [128.25, 270], [130.3, 640], [131.0, 640], [131.6, 790], [139.12, 790], [142.3, 1180], [145.8, 1180], [146.4, 1140], [161.3, 1140], [164.5, 330], [166.5, 130]];
const K17_OWD = [[0, -1], [46.9, 1], [161.35, -1]];
const K17_WFX = [[0, 1060], [12.3, 1060], [14.85, 330], [16.8, -100], [21.84, -100], [21.86, 720], [24.1, 720], [27.2, -100], [46.9, -100], [46.91, 190], [127.0, 190], [128.6, 345], [163.6, 345], [166.0, 60]];
const K17_WFD = [[0, -1], [46.9, 1], [163.5, -1]];
const k17X = (keys) => (u) => kfn(u, keys);

// ---------- knocks: front door hits [t, amp] (narrated, never heard), bulges in the inset ----------
const K17_KNOCKS = (() => { const L = [[44.49, 1.2], [46.06, 0.9], [46.74, 0.8], [47.52, 0.7], [48.2, 0.7], [48.75, 0.7]];
  for (let h = 54.0; h < 103.5; h += 0.9) L.push([h, 0.22]);
  for (let h = 103.6, i = 0; h < 107.0; h += 0.55, i++) L.push([h, 0.55 + i * 0.12]);
  for (const h of [107.2, 107.47, 107.74]) L.push([h, 1.3]);
  for (const h of [116.9, 118.0, 119.1, 120.2, 121.3, 122.4]) L.push([h, 0.9]);
  return L; })();
const k17Kn = (t) => K17_KNOCKS.reduce((s, [h, a]) => s + (t >= h && t < h + 0.6 ? K.spring(t, h, a, 5, 13) : 0), 0);
const k17Bulge = (t) => Math.max(0, k17Kn(t)) * (t > 103.5 ? 1 : 0.4);
const k17LampSwing = (t) => K17_KNOCKS.reduce((s, [h, a]) => s + (t >= h && t < h + 4 ? swing(t, h, 0.05 * a, 1.1, 1.2) : 0), 0);
const k17Shake = (t) => K17_KNOCKS.reduce((s, [h, a]) => s + (a >= 0.5 && t >= h && t < h + 0.7 ? K.spring(t, h, 4.5 * Math.min(a, 1.2), 12, 9) : 0), 0) + K.spring(t, 119.35, 3, 12, 9) + K.spring(t, 145.3, 3, 12, 9) + K.spring(t, 15.05, 1.5, 12, 9);
// owner's fist arm keyed to the hits he is seen making (raise 0.25 s before, contact on the hit)
function k17Pound(t, hits) {
  const up = [2.6, 2.9], hit = [1.75, 1.55], rest = [0.3, 0.2], L = (a, b, u) => [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u)];
  let h = null; for (const x of hits) if (t >= x - 0.3 && t < x + 0.3) h = x; if (h == null) return null; const d = h - t;
  if (d > 0.14) return L(rest, up, K.ease.out(K.clamp((0.3 - d) / 0.16)));
  if (d > 0) return L(up, hit, K.ease.in(K.clamp((0.14 - d) / 0.14)));
  return L(hit, rest, K.ease.out(K.clamp(-d / 0.3)));
}
const K17_POUND_S5 = [47.52, 48.2, 48.75], K17_POUND_S11R = [107.2, 107.74], K17_POUND_S11L = [107.47], K17_POUND_IN = [116.9, 118.0, 119.1, 120.2, 121.3, 122.4];

// ---------- doors ----------
function k17FrontOpen(t) {
  if (t < 15.05) return kfn(t, [[13.9, 0], [14.3, 1], [14.85, 1], [15.05, 0]]);
  if (t < 21.85) return Math.max(0, K.spring(t, 15.05, 0.1, 4, 8));
  if (t < 26.35) return t < 26.0 ? 1 : 1 - K.ease.in(K.clamp((t - 26.0) / 0.35));
  if (t < 125.68) return Math.max(0, K.spring(t, 26.35, 0.08, 4, 8));
  return K.ease.inOut(K.clamp((t - 125.68) / 1.4));
}
function k17BackOpen(t) {
  if (t < 21.85) return kfn(t, [[9.0, 0], [9.2, 0.3], [15.58, 0.3], [15.9, 1], [17.0, 1], [17.4, 0]]);
  if (t < 68.3) return kfn(t, [[27.6, 0], [27.9, 1], [28.9, 1], [29.25, 0]]);
  return Math.min(1, K.ease.out(K.clamp((t - 68.3) / 0.55)) + K.spring(t, 68.85, 0.06, 3, 6));
}
const k17Night = (t) => t >= K17_NIGHT_T;
// doormat at the back door (x0, lift of the left corner): slides back under the running feet 138.6-142
const k17Mat = (t) => ({ x0: 1150 - (t > 138.64 ? K.clamp((t - 138.64) / 3.36) * 100 : 0), lift: 32 * pulse(t, 121.6, 1.4) });
const k17PotLift = (t) => ({ lift: 46 * pulse(t, 120.0, 0.5), tilt: -0.5 * pulse(t, 120.0, 0.5) });

// ---------- sacks: A (servant's) at 745 -> dragged to 720 (76-77); B (friend's) at 860 ----------
function k17SackA(t) { if (t < 31.0) return null; return { x: kfn(t, [[76.0, 745], [77.0, 720]]), fill: k17Lin(t, [[31.0, 0.15], [31.9, 0.15], [32.0, 0.6], [32.85, 0.6], [32.95, 0.9], [45.5, 0.9], [45.6, 1]]), poke: t < 164.55 ? 'candle' : null, bounce: [31.95, 32.9, 45.6] }; }
function k17SackB(t) { if (t < 31.0) return null; const sat = t >= 35.25 && t < 44.95 ? K.ease.out(K.clamp((t - 35.25) / 0.3)) : 0;
  return { x: 860, fill: k17Lin(t, [[31.0, 0.15], [32.35, 0.15], [32.45, 0.6], [34.35, 0.6], [34.45, 1]]), sq: 1 - 0.15 * sat, slump: t > 164.5 ? K.ease.out(K.clamp((t - 164.5) / 0.4)) : 0, bounce: [32.4, 34.4, 133.6] }; }
const k17SackBounce = (t, list) => list.reduce((s, h) => s + (t >= h && t < h + 0.6 ? K.spring(t, h, 0.06, 4, 8) : 0), 0);

// ---------- valuables on the shelf (boards: top 690, middle 770, low 850) and in flight ----------
// returns {x, y, rot, mode}: mode 'shelf' (drawn behind the cast), 'fly' (after), 'hand:<who>:<i>' (drawn at that hand), 'in' (hidden), 'floor'
const k17Arc = (t, t0, d, a, b, h = 60) => { const u = K.clamp((t - t0) / d); return [K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - h * 4 * u * (1 - u)]; };
const K17_ITEMS = {
  vase: { at: [600, 690], draw: k17Vase, path: (t) => t < 31.48 ? 'shelf' : t < 31.95 ? { fly: k17Arc(t, 31.48, 0.47, [600, 690], [745, 790], 70), rot: (t - 31.48) * 6 } : 'in' },
  plateA: { at: [700, 770], draw: k17Plate, path: (t) => t < 31.95 ? 'shelf' : t < 32.4 ? { fly: k17Arc(t, 31.95, 0.45, [700, 770], [860, 790], 70), rot: (t - 31.95) * 8 } : 'in' },
  candle: { at: [650, 850], draw: k17Candle, path: (t) => t < 32.4 ? 'shelf' : t < 32.9 ? { fly: k17Arc(t, 32.4, 0.5, [650, 850], [745, 790], 90), rot: (t - 32.4) * 5 } : t < 164.55 ? 'in' : t < 165.0 ? 'hand:SV:1' : t < 165.4 ? { fly: k17Arc(t, 165.0, 0.4, [640, 820], [650, 850], 20), rot: 0 } : 'shelf' },
  cup: { at: [715, 690], draw: k17Cup, path: (t) => t < 33.0 ? 'shelf' : t < 33.25 ? { fly: k17Arc(t, 33.0, 0.25, [715, 690], [860, 712], 30), rot: 0 } : t < 34.12 ? 'hand:TH:0' : t < 34.45 ? { fly: k17Arc(t, 34.12, 0.33, [858, 712], [860, 790], 40), rot: 0 } : t < 131.75 ? 'in' : t < 133.4 ? 'hand:OW:1' : t < 133.6 ? { fly: k17Arc(t, 133.4, 0.2, [830, 760], [860, 800], 10), rot: 0 } : t < 164.55 ? 'in'
    : { fly: [K.lerp(880, 940, K.ease.out(K.clamp((t - 164.55) / 0.7))), 898], rot: K.clamp((t - 164.55) / 0.5) * 1.57 + swing(t, 165.2, 0.18, 1.6, 2.5) } },
  plateB: { at: [620, 770], draw: k17Plate, path: (t) => t < 39.45 ? 'shelf' : t < 39.7 ? { fly: k17Arc(t, 39.45, 0.25, [620, 770], [704, 800], 30), rot: 0 } : t < 44.49 ? 'hand:SV:0' : t < 45.3 ? { fly: [680 + 20 * Math.sin((t - 44.49) * 14), 760 - 80 * Math.abs(Math.sin((t - 44.49) * 5.8))], rot: (t - 44.49) * 9 } : t < 45.6 ? { fly: k17Arc(t, 45.3, 0.3, [690, 740], [745, 790], 20), rot: 3 } : 'in' },
  jar: { at: [655, 690], draw: k17Jar, path: () => 'shelf' },
};
// the jar teeters with the knocks (S11), then settles
const k17JarRot = (t) => K17_KNOCKS.reduce((s, [h, a]) => s + (h > 103 && t >= h && t < h + 2 ? swing(t, h, 0.05 * a, 1.8, 2.2) : 0), 0);

// ---------- the servant ----------
function k17SV(t, TH) {
  const P = { ...K17_SVB, y: K17_GR }; k17Walk(P, k17X(K17_SVX), t); const f = k17Dir(t, K17_SVD); P.dir = f.dir; P.sq = f.sq;
  let tgt = null, talkL = [[86.38, 88.1], [88.9, 90.4], [90.6, 93.1], [113.86, 117.6]];
  const THh = TH ? k17Head(TH) : [1300, 700];
  if (t < 3.5) { const u = (t % 0.66) / 0.66, sw = Math.sin(u * Math.PI * 2); P.handRW = [P.x + 34 + sw * 20, 812]; P.handLW = [P.x + 6 + sw * 12, 770]; P.drop = 3 * Math.abs(sw); P.mouth = 'smile'; P.broom = [P.x + 70 + sw * 26, 898];
    tgt = t > 2.6 && t < 3.0 ? [650, 680] : [P.x + 70, 900]; if (t > 2.6 && t < 3.0) P.lid = 0.3; }
  else if (t < 4.78) { P.handR = [26, -206 + 4 * Math.sin(t * 18)]; P.brow = -0.3; P.mouth = 'smile'; P.tip = 0.04 * K17B(t, 3.54, 0.3); P.lid = Math.max(0.25, pulse(t, 4.15, 0.4)); tgt = [P.x + 200, 640]; }
  else if (t < 6.92) { P.handL = [-6, -118]; P.handR = [12, -116 + 6 * Math.abs(Math.sin(t * 7))]; P.mouth = 'smile'; tgt = k17Look(t, [[4.78, [400, 760]], [6.08, [1300, 760]]], 0.9); P.look = K.lerp(-1, 1, K.clamp((t - 4.9) / 1.3)) * 0.8; }
  else if (t < 8.08) { P.handL = K17H.armsOut.L; P.handR = K17H.armsOut.R; P.mouth = 'smile'; P.sq = settleTo(t, 6.92, 1, 1.04, 0.3); tgt = [850, 600]; }
  else if (t < 9.05) { P.handL = [-8, -112 + 4 * Math.sin(t * 20)]; P.handR = [10, -114 - 4 * Math.sin(t * 20)]; P.mouth = 'smile'; P.brow = 0.4; P.lid = 0.4; tgt = k17Look(t, [[8.1, [400, 760]], [8.4, [1300, 760]], [8.7, [400, 760]]], 0.07); }
  else if (t < 10.9) { P.handL = [-14, -130]; P.handR = [16, -132]; P.tip = 0.08; P.y -= 6 * Math.abs(Math.sin(P.ph)); P.brow = 0.3; tgt = THh; if (t < 9.35) P.eyes = 'wide'; }
  else if (t < 11.4) { P.handR = K17H.cupMouth.R; P.talk = talk(t, [[10.95, 11.35]]) * 0.6; P.tip = 0.1; tgt = THh; }
  else if (t < 12.2) { P.handRW = [1262, 792 + 6 * Math.sin(t * 22)]; P.mouth = 'smile'; P.brow = 0.4; P.sq = 1 - 0.05 * pulse(t, 11.45, 0.25); tgt = THh; }
  else if (t < 14.95) { P.lean = 0.38 * K17B(t, 12.2, 0.4, 'inOut'); P.mouth = 'smile'; P.handL = [-10, -100]; P.handR = [14, -104]; tgt = [kfn(t, K17_OWX), 700]; }
  else if (t < 17.6) { P.lean = 0.38 * (1 - K17B(t, 14.95, 0.3)); P.mouth = 'smile'; P.brow = 0.5; P.handL = [-8, -112 + 4 * Math.sin(t * 20)]; P.handR = [10, -114 - 4 * Math.sin(t * 20)]; tgt = t < 15.6 ? [400, 760] : THh; }
  else if (t < 19.62) { P.tip = 0.1 * K17B(t, 17.6, 0.3); P.mouth = 'smile'; tgt = [1070, 880]; }
  else if (t < 20.7) { P.handRW = [P.x + 46, 806]; P.mouth = 'smile'; P.drop = k17Nods(t, [19.75, 20.05, 20.35], 6); tgt = [P.x + 46, 800]; }
  else if (t < 21.85) { P.handR = [30, -86 + 6 * Math.abs(Math.sin(t * 14))]; P.mouth = 'smile'; P.lid = Math.max(blink(t, 11), t > 20.8 && t < 21.3 ? 1 : 0); }
  // ---- night ----
  else if (t < 25.76) { P.handRW = [kfn(t, [[21.86, 532], [25.7, 532]]), 772]; P.lean = 0.32 * (1 - K17B(t, 23.9, 0.5, 'inOut')); P.mouth = 'smile'; tgt = [kfn(t, K17_OWX), 700]; }
  else if (t < 26.0) { P.handR = [70 + 14 * Math.sin(t * 22), -196]; P.mouth = 'smile'; tgt = [80, 700]; }
  else if (t < 26.4) { P.handRW = [K.lerp(532, 432, K17B(t, 26.0, 0.35, 'in')), 772]; tgt = [440, 760]; }
  else if (t < 26.72) { P.handR = K17H.cupEar.R; P.tip = 0.16; P.gaze = [0.4, -1]; }
  else if (t < 28.6) { P.mouth = 'smile'; P.brow = 0.5; if (t < 26.85) { P.handL = [-8, -112]; P.handR = [10, -114]; } else { P.tip = 0.1; k17Arms(P, 0.8); } tgt = [1300, 760]; }
  else if (t < 29.85) { P.mouth = 'smile'; tgt = k17Look(t, [[28.6, THh], [29.1, [P.x + 40, 780]]], 0.1); if (t > 29.0) { P.handLW = [P.x + 26, 792]; P.handRW = [P.x + 56, 786]; P.sq = landSquash(t, 29.55, 0.12); } }
  else if (t < 31.0) { P.handRW = [P.x - 40, 800]; P.tip = 0.08; tgt = [745, 860]; P.mouth = 'smile'; }
  else if (t < 34.98) { P.tip = 0.08; P.mouth = 'smile'; tgt = [745, 820];
    if (t >= 31.3 && t < 31.75) P.handLW = k17Arc(Math.max(t, 31.48), 31.48, 0.47, [600, 690], [745, 790], 70);
    else if (t >= 32.25 && t < 32.7) P.handLW = k17Arc(Math.max(t, 32.4), 32.4, 0.5, [650, 850], [745, 790], 90);
    else if (t >= 33.0 && t < 34.1) { tgt = THh; P.mouth = 'frown'; P.brow = 0.4; }
    else if (t >= 34.12) P.handRW = [745, 778 + 6 * Math.abs(Math.sin(t * 16))]; }
  else if (t < 44.49) { P.mouth = 'smile'; P.lid = 0.3; tgt = [900, 700];
    if (t >= 36.16 && t < 37.4) tgt = [P.x + 30, 420];
    if (t >= 38.42 && t < 39.6) P.drop = k17Nods(t, [38.5, 38.85, 39.2], 7, 0.3);
    if (t >= 39.6) { P.handL = [26, -128]; P.handR = [30 + 12 * Math.cos(t * 9), -140 + 10 * Math.sin(t * 9)]; P.brow = -0.3; tgt = k17Hand(P, 0); P.lid = Math.max(0.3, pulse(t, 40.5, 0.5)); if (t > 41.2) P.handR = [36, -126]; P.tip = 0; tgt = [P.x + 34, 752]; } }
  else if (t < 47.9) { P.noBlink = t < 45.3; P.eyes = 'wide'; P.mouth = 'o'; tgt = [400, 760];
    if (t < 45.3) { P.handL = [-20 + 30 * Math.sin((t - 44.49) * 14), -170]; P.handR = [20 - 30 * Math.sin((t - 44.49) * 14), -176]; tgt = [690, 720]; }
    P.drop = 8 * pulse(t, 46.06, 0.2) + 6 * pulse(t, 46.74, 0.2) + 4 * pulse(t, 47.52, 0.2); P.sq *= 1 - 0.06 * pulse(t, 46.06, 0.2) - 0.04 * pulse(t, 46.74, 0.2) - 0.03 * pulse(t, 47.52, 0.2); }
  else if (t < 53.92) { P.wet = true; P.brow = -0.6; P.mouth = 'o'; tgt = [400, 760]; if (t > 49.6 && TH) P.handRW = k17L2W(TH, 31, -136); P.x += tremble(t, 1.5, 9); }
  else if (t < 56.79) { P.wet = true; P.brow = -0.6; P.mouth = 'o'; if (TH) { P.handRW = k17L2W(TH, 31, -136); P.handLW = k17L2W(TH, -31, -136); } P.x += tremble(t, 2.5, 9); P.ph = 1.2 * Math.sin(t * 30); P.amp = 0.25; tgt = [400, 760];
    if (t >= 55.38) { P.gaze = [0, 0.05]; P.drop = 5 * pulse(t, 55.95, 0.3); } }
  else if (t < 57.7) { P.brow = K.lerp(-0.6, -0.9, K17B(t, 57.2, 0.3)); tgt = k17Look(t, [[56.8, [400, 760]], [57.0, [1300, 760]], [57.15, [400, 760]], [57.35, [1300, 760]]], 0.07); P.bulb = K.clamp((t - 57.3) / 0.3); }
  else if (t < 60.34) { if (TH) { P.handRW = k17L2W(TH, 31, -136); P.handLW = k17L2W(TH, -31, -136); } P.tip = 0.1; P.brow = -0.5; P.talk = t > 59.02 ? talk(t, [[59.02, 60.3]]) : 0; P.drop = k17Nods(t, [59.4, 60.04], 5); tgt = THh; }
  else if (t < 62.9) { P.handR = [44, -206 + 6 * Math.sin(t * 16)]; P.talk = talk(t, [[60.34, 62.5]]); P.brow = -0.5; tgt = THh; }
  else if (t < 65.2) { const u = K17B(t, 63.05, 0.2, 'out'); P.aR = t < 63.05 ? [K.lerp(0.2, 0.3, K17B(t, 62.9, 0.15)), 0.2] : [K.lerp(0.3, K17_POINT[0], u) + 0.08 * swing(t, 63.25, 1, 2, 4), K.lerp(0.2, K17_POINT[1], u)]; P.tip = 0.1 * u; P.talk = talk(t, [[63.21, 64.9]]) * 0.7; P.brow = -0.4; tgt = [1300, 760]; }
  else if (t < 74.0) { tgt = TH ? THh : [1200, 700]; P.mouth = 'smile';
    if (t >= 68.3 && t < 71.75) { P.handL = K17H.clasp.L; P.handR = K17H.clasp.R; }
    if (t >= 71.75 && t < 72.6) { P.handR = [K.lerp(-14, 40, K17B(t, 71.8, 0.6, 'inOut')), -206]; P.lid = 1; P.gaze = null; tgt = null; }
    if (t >= 72.6) { P.lid = 0.6; tgt = null; P.gaze = [0, -0.2]; } }
  else if (t < 77.02) { P.lid = 0.35; P.mouth = 'smile'; tgt = [620, 860]; if (t > 75.8) { P.handRW = [kfn(t, [[76.0, 745], [77.0, 720]]) - 30, 790]; P.handLW = [kfn(t, [[76.0, 745], [77.0, 720]]) - 10, 784]; P.tip = -0.12; } }
  else if (t < 77.7) { const u = (t - 77.02) / 0.68; P.look = u < 0.3 ? -0.8 : 0.4; P.eyes = u > 0.3 ? 'wide' : 'open'; P.mouth = 'o'; P.sq *= 1 - 0.1 * pulse(t, 77.25, 0.3); tgt = THh; }
  else if (t < 83.52) { tgt = THh; P.brow = t > 80.68 ? -0.2 : 0; P.mouth = t < 78.0 ? 'o' : 'closed';
    if (t >= 82.12) { P.lid = t < 82.62 ? Math.sin(Math.PI * (t - 82.12) / 0.5) : 0.45; P.noBlink = true; if (t >= 82.9) { P.gaze = [0, 0.05]; tgt = null; } } }
  else if (t < 86.58) { P.handL = K17H.headHold.L; P.handR = K17H.headHold.R; P.sq *= t < 83.8 ? 1 + 0.08 * K17B(t, 83.6, 0.2) : 1.08 - 0.16 * K17B(t, 83.8, 0.25) + 0.08 * K17B(t, 84.4, 0.4); P.eyes = t < 85.0 ? 'shut' : 'open'; tgt = THh; P.brow = 0.6; P.talk = talk(t, [[86.38, 86.58]]); }
  else if (t < 88.22) { const u = K17B(t, 86.58, 0.18, 'in'); P.aR = [K.lerp(2.8, 1.1, u), K.lerp(2.7, 0.7, u)]; if (t > 87.2) P.aR = [K.lerp(1.1, 0.2, K17B(t, 87.2, 0.4)), K.lerp(0.7, 0.1, K17B(t, 87.2, 0.4))]; P.brow = 0.8; P.talk = talk(t, talkL); tgt = THh; }
  else if (t < 89.34) { const u = K.clamp((t - 88.22) / 0.95), cx = P.x + 50; P.handRW = u < 0.5 ? [K.lerp(cx, cx + 25, u * 2), 690] : [cx + 25, K.lerp(690, 790, (u - 0.5) * 2)]; P.handLW = u < 0.5 ? [K.lerp(cx, cx - 25, u * 2), 690] : [cx - 25, K.lerp(690, 790, (u - 0.5) * 2)]; P.talk = talk(t, talkL); P.brow = 0.5; tgt = THh; P.chalk = u; }
  else if (t < 90.56) { const th = THh; P.handRW = [th[0] - 8 * (TH ? TH.dir : 1) * -1, th[1] - 6 - 10 * (pulse(t, 89.4, 0.2) + pulse(t, 89.75, 0.2))]; P.talk = talk(t, talkL); P.brow = 0.6; tgt = th; }
  else if (t < 91.56) { if (TH) { P.handRW = k17L2W(TH, 31, -136); P.handLW = k17L2W(TH, -31, -136); } P.talk = talk(t, talkL); P.brow = 0.6; tgt = THh; }
  else if (t < 92.46) { P.tip = 0.15 * pulse(t, 91.56, 0.7) + 0.05; if (TH && t < 91.9) { P.handRW = k17L2W(TH, -31, -120); P.handLW = k17L2W(TH, -31, -150); } P.talk = talk(t, talkL); P.brow = 0.8; tgt = THh; }
  else if (t < 93.7) { P.y -= 8 * pulse(t, 92.46, 0.18); P.aR = K17_POINT; P.talk = talk(t, talkL); P.brow = 0.8; tgt = [1300, 760]; P.stamp = 92.64; }
  else if (t < 103.6) { tgt = THh; P.brow = -0.4; P.mouth = 'frown';
    if (t >= 99.2 && t < 100.18) { tgt = k17Look(t, [[99.2, THh], [99.45, [400, 760]], [99.65, THh], [99.82, [400, 760]], [99.95, THh], [100.05, [400, 760]]], 0.05); P.x += tremble(t, 1.5 + 2 * K.clamp((t - 99.2) / 0.9), 10); P.wet = true; }
    if (t >= 100.18) { P.wet = true; P.handL = K17H.cheeks.L; P.handR = K17H.cheeks.R; }
    if (t >= 102.84) { P.handL = K17H.headHold.L; P.handR = K17H.headHold.R; P.mouth = 'open'; P.gaze = [0, -1]; tgt = null; P.tilt = -0.12; P.x += tremble(t, 2, 12); } }
  // ---- S12 back door ----
  else if (t < 118.94) { const kn = t < 115.0 ? K17B(t, 111.3, 0.35, 'inOut') : 1 - K17B(t, 115.0, 0.35, 'inOut'); P.kneel = kn; P.wet = true; P.brow = -0.8; P.talk = talk(t, talkL); tgt = THh;
    if (t < 113.86) { P.handL = K17H.clasp.L; P.handR = K17H.clasp.R; P.y += 0; }
    else if (t < 115.32) { P.handL = [24, -196]; P.handR = [-24, -196]; P.look = 0.5 * Math.sin(t * 12); }
    else if (t < 116.86) { P.handL = K17H.armsOut.L; P.handR = K17H.armsOut.R; P.mouth = 'smile'; tgt = k17Look(t, [[115.4, [1300, 760]], [115.8, THh], [116.2, [1300, 760]]], 0.07); }
    else { P.tip = 0.25 * K17B(t, 116.86, 0.3); if (TH) { P.handRW = k17L2W(TH, 31, -110); P.handLW = k17L2W(TH, 31, -150); } P.ph = 2 * Math.sin(t * 14); P.amp = 0.4; P.brow = 0.6; } }
  else if (t < 123.31) { const u = K17B(t, 118.94, 0.42, 'in'); P.tip = K.lerp(0.25, 1.45, u); P.eyes = t > 119.36 ? 'shut' : 'wide'; P.mouth = t > 119.36 ? 'frown' : 'o'; P.dust = 119.36;
    if (t >= 121.42) P.aR = [0.8 + 0.7 * Math.abs(Math.sin(t * 9)), 0.4]; if (t > 119.36) P.sq = impactSquash(t, 119.36, 0.88); }
  // ---- S13-S14 ----
  else if (t < 137.2) { tgt = THh; P.brow = 0.6;
    if (t >= 134.58 && t < 136.7) { const mine = t < 135.3 || t >= 136.0; if (mine) { P.aR = K17_POINT; P.talk = talk(t, [[134.6, 136.7]]); P.tip = 0.06; } else { P.handL = K17H.folded.L; P.handR = K17H.folded.R; } }
    if (t >= 136.75) { P.noBlink = true; P.eyes = 'wide'; P.gaze = [K.lerp(0.9, 0, K17B(t, 136.75, 0.35)), 0.05]; tgt = null; P.look = K.lerp(1, 0, K17B(t, 136.75, 0.35)); } }
  else if (t < 139.9) { P.eyes = 'wide'; P.mouth = 'o'; if (t > 138.65) { P.tip = 0.12; k17Arms(P, 1); } tgt = [850, 820]; }
  else if (t < 163.75) { P.kneel = 1; P.handL = [-10, -110]; P.handR = [14, -112]; P.eyes = 'open'; P.brow = -0.6; tgt = t < 145.7 ? [1240, 700] : [1220, 700];
    P.drop = t < 143.14 ? 30 : t < 155.2 ? 6 : 6 + 40 * K17B(t, 155.2, 0.6, 'inOut'); if (t >= 155.2) { P.handL = K17H.mouthCover.L; P.handR = K17H.mouthCover.R; P.lid = 0.6; } }
  else { const r = K17B(t, 163.75, 0.3, 'inOut'); P.kneel = 1 - r; P.drop = 46 * (1 - r) + 6; P.lean = 0.12; P.brow = -0.5; P.mouth = 'frown'; tgt = [650, 880];
    if (t >= 164.55 && t < 165.0) { P.handRW = [kfn(t, [[164.55, 722], [164.9, 660]]), kfn(t, [[164.55, 790], [164.9, 820]])]; }
    if (t >= 165.0 && t < 165.5) P.handRW = [kfn(t, [[165.0, 655], [165.4, 655]]), kfn(t, [[165.0, 822], [165.4, 842]])];
    if (t > 165.6) { P.handL = K17H.clasp.L; P.handR = K17H.clasp.R; P.gaze = [0.2, 0.6]; tgt = null; } }
  if (!P.gaze || tgt) k17Life(P, t, 11, tgt); else k17Life(P, t, 11, null);
  return P;
}

// ---------- the friend (thief) ----------
function k17TH(t, SV) {
  const P = { ...K17_THB, y: K17_GR }; k17Walk(P, k17X(K17_THX), t); const f = k17Dir(t, K17_THD); P.dir = f.dir; P.sq = f.sq;
  let tgt = null; const SVh = SV ? k17Head(SV) : [700, 720], talkL = [[78.88, 83.3], [95.2, 103.4], [154.08, 157.5]];
  if (t < 8.6) { P.alpha = 0; }
  else if (t < 9.9) { P.tip = 0.24 * K17B(t, 9.0, 0.2); P.eyes = t < 9.4 ? 'wide' : 'open'; P.mouth = t < 9.4 ? 'o' : 'smile'; P.handR = [48 + 8 * Math.sin(t * 20), -196]; tgt = SVh; }
  else if (t < 11.4) { P.tip = 0.2; P.handR = K17H.cupEar.R; P.drop = k17Nods(t, [10.6, 11.0], 6); tgt = SVh; }
  else if (t < 12.2) { P.tip = 0.12; P.handRW = [1262, 792 + 6 * Math.sin(t * 22)]; P.sq *= 1 - 0.05 * pulse(t, 11.5, 0.25); if (t > 11.6 && t < 12.1) { P.wink = 'R'; P.gaze = [0, 0.05]; } else tgt = SVh; P.mouth = 'smile'; }
  else if (t < 15.6) { P.tip = 0.18; P.lid = 0.45; tgt = [kfn(t, K17_OWX), 700]; P.handL = [-20, -150]; }
  else if (t < 17.25) { P.handL = [-22, -146]; P.handR = [24, -140]; P.y -= 10 * Math.abs(Math.sin(P.ph)); P.brow = 0.3; P.mouth = 'smile'; tgt = [650, 720]; P.held = 'sack'; }
  else if (t < 19.62) { P.tip = 0.1 * K17B(t, 17.6, 0.3); P.mouth = 'smile'; tgt = [1070, 880]; }
  else if (t < 20.7) { P.handRW = [P.x - 46, 806]; P.mouth = 'smile'; P.drop = k17Nods(t, [19.85, 20.15, 20.45], 6); tgt = [P.x - 46, 800]; }
  else if (t < 21.85) { P.handR = [30, -86 + 6 * Math.abs(Math.sin(t * 14 + 1))]; P.mouth = 'smile'; P.lid = Math.max(blink(t, 23), t > 20.9 && t < 21.4 ? 1 : 0); }
  else if (t < 27.6) { P.alpha = 0; }
  else if (t < 29.08) { P.handRW = [P.x + 4, 744]; P.y -= 10 * Math.abs(Math.sin(P.ph)); P.held = 'two'; tgt = k17Look(t, [[27.7, [900, 760]], [28.0, [1500, 760]], [28.3, [900, 760]], [28.6, SVh]], 0.07); P.brow = 0.3; }
  else if (t < 29.9) { const u = K17B(t, 28.95, 0.25, 'in'); P.aR = [K.lerp(-1.6, 1.7, u), K.lerp(-2.6, 1.5, u)]; if (t > 29.4) P.aR = null; P.held = t < 29.08 ? 'two' : 'one'; tgt = SVh; P.mouth = 'smile'; }
  else if (t < 31.0) { P.handRW = [P.x - 30, 796]; P.held = 'one'; P.tip = 0.08; tgt = [860, 860]; P.mouth = 'smile'; }
  else if (t < 34.98) { P.tip = 0.06; P.mouth = 'smile'; tgt = [860, 820];
    if (t >= 31.8 && t < 32.25) P.handRW = k17Arc(Math.max(t, 31.95), 31.95, 0.45, [700, 770], [860, 790], 70);
    else if (t >= 33.0 && t < 34.12) { P.handLW = [860, 712 + 4 * Math.sin(t * 6)]; P.eyes = t < 33.4 ? 'wide' : 'open'; P.mouth = t < 33.4 ? 'o' : 'smile'; P.brow = t < 33.4 ? -0.4 : 0.4; tgt = [860, 680]; P.tip = -0.04; }
    else if (t >= 34.12 && t < 34.45) P.handLW = [860, 760];
    else if (t >= 34.45) P.handLW = [862, 778 + 6 * Math.abs(Math.sin(t * 15))]; }
  else if (t < 44.49) { const s = K17B(t, 35.15, 0.4, 'inOut'); P.sit = s; P.seat = 'bench'; P.y = K17_GR - 66 * s; P.lid = 0.4; P.mouth = 'smile'; tgt = [600, 760]; P.sq *= 1 - 0.04 * pulse(t, 35.6, 0.6);
    if (t >= 36.16 && t < 37.4) tgt = [P.x - 20, 420];
    if (t >= 37.44 && t < 38.4) { const u = pulse(t, 37.44, 0.95); P.aR = [K.lerp(0.2, 2.9, u), K.lerp(0.1, 3.1, u)]; P.aL = [K.lerp(-0.2, -2.9, u), K.lerp(-0.1, -3.1, u)]; P.lid = 0.7; P.mouth = u > 0.3 ? 'open' : 'smile'; P.tilt = -0.15 * u; }
    if (t >= 41.3 && t < 42.2) { P.handR = [70 + 12 * Math.sin(t * 8), -150]; P.lid = 1; P.tilt = -0.08; }
    if (t >= 42.2) P.lid = 0.55; }
  else if (t < 47.9) { P.noBlink = t < 45.3; P.eyes = 'wide'; P.mouth = 'o'; tgt = t < 44.75 ? [600, 760] : [400, 760];
    const s = t < 44.85 ? 1 : 1; P.sit = s; P.seat = t < 44.85 ? 'bench' : 'floor'; P.y = t < 44.85 ? K17_GR - 66 : K.lerp(K17_GR - 66, K17_GR, K17B(t, 44.85, 0.3, 'in'));
    if (t >= 45.15) P.sq *= impactSquash(t, 45.15, 0.85);
    P.drop = 8 * pulse(t, 46.16, 0.2) + 6 * pulse(t, 46.84, 0.2) + 4 * pulse(t, 47.62, 0.2); }
  else if (t < 53.92) { P.sit = 1 - K17B(t, 48.2, 0.4, 'inOut'); P.seat = 'floor'; P.wet = true; P.eyes = 'wide'; P.mouth = 'o'; tgt = [400, 760]; if (t > 49.8 && SV) P.handRW = k17L2W(SV, 31, -136); P.x += tremble(t + 0.3, 1.5, 8); }
  else if (t < 56.79) { if (SV) { P.handRW = k17L2W(SV, 31, -136); P.handLW = k17L2W(SV, -31, -136); } P.wet = true; P.brow = -0.6; P.eyes = 'wide'; P.mouth = 'o'; P.x += tremble(t + 0.5, 2.5, 8); P.ph = 1.2 * Math.sin(t * 26 + 1); P.amp = 0.25; tgt = [400, 760];
    if (t >= 55.5) { P.gaze = [0, 0.05]; tgt = null; P.drop = 5 * pulse(t, 56.05, 0.3); } }
  else if (t < 60.34) { P.brow = -0.4; tgt = SVh; P.look = t > 57.9 && t < 58.05 ? -0.8 : 0; P.drop = k17Nods(t, [59.5, 60.14], 5); }
  else if (t < 62.54) { tgt = t < 61.9 ? [SVh[0] - 60, 520] : [P.x + 10, 520]; P.drop = t > 62.0 ? 6 * pulse(t, 62.05, 0.45) : 0; P.brow = -0.3; }
  else if (t < 64.4) { tgt = [1300, 760]; P.mouth = 'smile'; }
  else if (t < 65.25) { P.drop = k17Nods(t, [64.4, 64.56, 64.72, 64.88], 6, 0.14); P.handR = t > 64.5 && t < 64.95 ? [34, -206] : null; P.mouth = 'smile'; P.brow = 0.4; tgt = [1300, 760]; P.sq *= anticipate(t, 64.95, 0.3, 0.12); P.tip = 0.15 * K17B(t, 64.95, 0.3); }
  else if (t < 67.6) { P.tip = 0.18; k17Arms(P, 1); P.brow = 0.5; tgt = [1300, 760]; P.sq *= t < 65.5 ? 1 + 0.08 * pulse(t, 65.25, 0.3) : 1; }
  else if (t < 68.3) { P.tip = 0.18 * lurch(t, 67.6, 1) - 0.08; P.sq *= 0.92 + 0.08 * K17B(t, 67.8, 0.4); P.ph = Math.PI / 2; P.amp = 0.6; tgt = [1300, 760]; }
  else if (t < 69.22) { const lo = k17BackOpen(t); P.handRW = [1280 - 16 - 94 * lo + 14, 765]; P.tip = -0.06; P.eyes = t > 68.9 ? 'wide' : 'open'; P.mouth = t > 68.9 ? 'smile' : 'closed'; tgt = [1500, 760]; }
  else if (t < 71.75) { P.mouth = 'smile'; P.brow = -0.2; tgt = [1720, 780]; if (t > 70.6) { P.ph = Math.PI / 2; P.amp = 1; P.tip = 0.06; } }
  else if (t < 72.5) { P.ph = Math.PI / 2; P.amp = 1; P.tip = 0.06; P.noBlink = true; P.mouth = t < 72.1 ? 'smile' : 'closed'; tgt = [1600, 820]; }
  else if (t < 73.36) { P.handR = [40, -204]; tgt = k17Look(t, [[72.5, [1200, 700]], [72.75, [1700, 720]], [73.0, [1480, 400]], [73.2, [1480, 900]]], 0.07); P.look = t < 72.75 ? -0.8 : t < 73.0 ? 0.8 : 0; }
  else if (t < 73.86) { P.brow = -0.6; P.mouth = 'o'; tgt = [1480, 800]; }
  else if (t < 74.4) { P.look = -1; P.tip = -0.12; tgt = [1200, 760]; P.brow = -0.4; }
  else if (t < 74.95) { P.handR = [44, -212 + 6 * Math.sin(t * 24)]; P.brow = -0.6; tgt = [1480, 800]; }
  else if (t < 77.7) { P.tip = t > 75.2 && t < 76.8 ? 0.15 : 0; k17Arms(P, P.amp); P.lid = 0.2; tgt = SVh; if (t > 77.5) P.tip = -0.06 * lurch(t, 77.5, 1); }
  else if (t < 83.52) { tgt = SVh; P.lid = Math.max(P.lid || 0, 0.2); P.talk = talk(t, talkL);
    if (t < 78.38 && SV) P.handRW = k17L2W(SV, 31, -138 - 8 * pulse(t, 77.85, 0.2) - 8 * pulse(t, 78.1, 0.2));
    else if (t >= 78.88 && t < 80.4) { P.aL = K17_THUMB; P.drop = k17Nods(t, [79.0, 79.4], 7, 0.25); P.mouth = 'smile'; }
    else if (t >= 80.68 && t < 82.6) { P.handL = K17H.palmsUp.L; P.handR = K17H.palmsUp.R; P.brow = -0.5; } }
  else if (t < 93.8) { tgt = SVh; P.lid = 0.2;
    if (t >= 86.58 && t < 86.8) P.lid = 1;
    if (t >= 89.34 && t < 90.3) { P.lid = Math.max(pulse(t, 89.42, 0.14), pulse(t, 89.77, 0.14)); P.tilt = -0.08 * (pulse(t, 89.42, 0.25) + pulse(t, 89.77, 0.25)); }
    if (t >= 90.7 && t < 90.85) P.look = -0.8;
    if (t >= 91.56 && t < 92.2) { P.tip = -0.1 * pulse(t, 91.56, 0.6); P.amp = 0; } }
  else if (t < 103.6) { tgt = SVh; P.lid = 0.2; P.talk = talk(t, talkL); P.brow = 0;
    if (t < 95.2) P.handR = K17H.pointUp.R;
    else if (t < 96.9) { P.handR = K17H.pointFwd.R; P.brow = 0.3; }
    else if (t < 97.6) tgt = [P.x - 20, 500];
    else if (t < 98.6) { P.aL = [-1.55, -1.6]; tgt = [1300, 760]; }
    else if (t < 99.15) { P.handR = [36, -200]; P.look = K.lerp(-1, 1, K17B(t, 98.64, 0.45, 'inOut')); tgt = [K.lerp(500, 1200, K17B(t, 98.64, 0.45, 'inOut')), 760]; }
    else if (t < 100.18) { }
    else if (t < 101.28) { P.handL = K17H.palmsUp.L; P.handR = K17H.palmsUp.R; P.look = 0.6 * Math.sin((t - 100.18) * 14); P.mouth = 'frown'; P.brow = -0.6; }
    else { P.handL = K17H.folded.L; P.handR = K17H.folded.R; P.tilt = -0.1; P.sq *= settleTo(t, 101.28, 0.96, 1, 0.3); P.ph = 0.7; P.amp = 0.5; if (t >= 102.84) { P.lid = 1; P.tilt = -0.2; } } }
  // ---- S12 ----
  else if (t < 118.94) { P.handL = K17H.folded.L; P.handR = K17H.folded.R; P.lid = 0.25; tgt = SVh; if (t >= 116.86) { P.tip = 0.12; P.amp = 0; } }
  else if (t < 120.56) { tgt = [1600, 800]; P.y -= hop(t, 118.94, 0.36, 0, 0, 28)[1]; P.brow = 0.2; P.lid = 0.15;
    if (t >= 119.96) { const pl = k17PotLift(t); P.handRW = [1522, 840 - pl.lift]; P.tip = 0.25; tgt = [1520, 900]; } }
  else if (t < 121.42) { tgt = [900, 760]; P.talk = talk(t, [[120.6, 121.3]]) * 0.8; P.brow = -0.5; P.handL = K17H.palmsUp.L; P.handR = K17H.palmsUp.R; P.y -= (P.x > 1235 && P.x < 1300) ? 22 * Math.sin(Math.PI * (P.x - 1235) / 65) : 0; }
  else if (t < 123.31) { P.tip = 0.3 * pulse(t, 121.5, 1.5); P.handRW = [k17Mat(t).x0 + 4, 896 - k17Mat(t).lift]; tgt = [1170, 900]; P.brow = -0.4; }
  // ---- S13 ----
  else if (t < 137.25) { tgt = SVh; P.lid = 0.2;
    if (t >= 134.58 && t < 136.7) { const mine = t >= 135.3 && t < 136.0; if (mine) { const a = (t - 135.3) * 9; P.handR = [40 + 26 * Math.cos(a), -150 + 18 * Math.sin(a)]; P.handL = [-40 + 26 * Math.cos(a + 3.1), -150 + 18 * Math.sin(a)]; P.talk = talk(t, [[135.3, 136.0]]); } else { P.handL = K17H.folded.L; P.handR = K17H.folded.R; } }
    if (t >= 136.75) { P.noBlink = true; P.eyes = 'wide'; P.gaze = [K.lerp(-0.9, 0, K17B(t, 136.85, 0.35)), 0.05]; tgt = null; P.look = K.lerp(-1, 0, K17B(t, 136.85, 0.35)); P.lid = 0; } }
  // ---- S14: run in place on the slipping mat, caught, lifted, set down ----
  else if (t < 145.72) { P.eyes = 'wide'; P.mouth = 'open'; P.noBlink = true; tgt = [1500, 760];
    const spin = t < 143.2 ? 1 : 1 - K.clamp((t - 143.2) / 1.2) * 0.75; P.ph = t * 26; P.amp = t < 137.6 ? 0 : spin; k17Arms(P, P.amp);
    P.sq *= t < 137.6 ? anticipate(t, 137.25, 0.35, 0.1) : 1 + 0.1 * pulse(t, 138.64, 0.35);
    P.tip = t < 142.48 ? 0.2 : 0.2 * (1 - K17B(t, 142.48, 0.12)) - 0.15 * pulse(t, 142.6, 0.3) + 0.25 * pulse(t, 142.48, 0.15);
    if (t >= 142.48) { P.sq *= 1 + 0.15 * pulse(t, 142.48, 0.2); P.y -= 25 * K17B(t, 142.55, 0.2) + 25 * K17B(t, 143.14, 0.5) - 50 * K17B(t, 145.0, 0.3, 'in'); P.rot = swing(t, 143.5, 0.14, 1.2, 1.4) * (t < 145.1 ? 1 : 0); P.gaze = [-0.6, -0.4]; tgt = null; }
    if (t >= 145.3) { P.sq *= landSquash(t, 145.3, 0.14); P.amp = 0; P.mouth = 'o'; } P.runDust = t >= 137.6 && t < 143.2; }
  // ---- S15-S16 ----
  else if (t < 161.4) { P.lid = 0.2; tgt = SV && t > 155.2 && t < 155.6 ? SVh : [1150, 680]; P.talk = talk(t, talkL);
    if (t >= 148.22 && t < 150.0) tgt = k17Look(t, [[148.3, [1180, 760]], [148.7, [1300, 760]], [149.4, [1150, 680]]], 0.1);
    if (t >= 151.92 && t < 152.98) { P.handR = [44, -212 + 6 * Math.sin(t * 22)]; tgt = k17Look(t, [[151.92, [1300, 760]], [152.3, [1500, 820]], [152.65, [1250, 900]]], 0.1); P.look = 0.6; }
    if (t >= 152.98 && t < 154.08) { P.brow = -0.6; P.mouth = 'frown'; }
    if (t >= 154.08 && t < 155.4) { P.aL = K17_THUMB; P.drop = k17Nods(t, [154.2, 154.6], 7, 0.25); P.mouth = 'smile'; }
    if (t >= 156.54 && t < 158.0) { P.handL = K17H.palmsUp.L; P.handR = K17H.palmsUp.R; P.wet = true; tgt = [1180, 640]; }
    if (t >= 158.9 && t < 160.3) { const u = K.clamp((t - 158.9) / 1.2); P.handL = [-22, -132 + 40 * u]; P.handR = [22, -132 + 40 * u]; P.mouth = 'smile'; } }
  else { P.lid = 0.2; P.gaze = [0.9, -0.15]; P.look = 0.5; P.handR = [52, -112]; P.mouth = 'closed'; }
  if (tgt || !P.gaze) k17Life(P, t, 23, tgt); else k17Life(P, t, 23, null);
  return P;
}

// ---------- the owner ----------
function k17OW(t, TH) {
  const P = { ...K17_OWB, y: K17_GR }; k17Walk(P, k17X(K17_OWX), t); const f = k17Dir(t, K17_OWD); P.dir = f.dir; P.sq = f.sq;
  let tgt = null; const THh = TH ? k17Head(TH) : [1200, 700];
  if (t < 11.9) P.alpha = 0;
  else if (t < 21.85) { P.alpha = K.clamp((t - 11.9) / 0.3); P.tilt = -0.06; tgt = [200, 700]; if (t > 13.85 && t < 14.4) P.handRW = [kfn(t, [[13.9, 432], [14.3, 520]]), 770]; }
  else if (t < 26.6) { P.tilt = -0.06; tgt = [100, 700]; if (t < 23.64) { P.handR = [36, -232 + 4 * Math.sin(t * 3)]; P.handL = [-30, -228]; } }
  else if (t < 46.9) P.alpha = 0;
  // ---- S5 street ----
  else if (t < 50.08) { P.brow = 0.6; P.mouth = 'frown'; tgt = [400, 740]; const a = k17Pound(t, K17_POUND_S5); if (a && t < 49.1) P.aR = a; }
  else if (t < 52.82) { P.brow = 0.7; P.sq *= t < 50.9 ? anticipate(t, 50.08, 0.8, 0.07) : 1 + 0.06 * K17B(t, 50.9, 0.6) - 0.06 * K17B(t, 52.5, 0.3); P.handL = [-30, -178]; P.handR = K17H.cupMouth.R; tgt = [400, 740]; }
  else if (t < 54.0) { P.talk = talk(t, [[52.82, 53.9]]) + 0.4; P.handL = [-30, -178]; P.handR = K17H.cupMouth.R; P.tip = 0.1; P.brow = 0.9; tgt = [420, 740]; P.arcs = true; }
  else if (t < 107.12) { P.brow = 0.6; P.mouth = 'frown'; tgt = [400, 740]; P.handL = K17H.hipsHands.L; P.handR = K17H.hipsHands.R; }
  // ---- S11 street ----
  else if (t < 108.38) { P.brow = 0.9; P.mouth = 'open'; tgt = [400, 740]; const r = k17Pound(t, K17_POUND_S11R), l = k17Pound(t, K17_POUND_S11L); if (r) P.aR = r; if (l) P.aL = l; P.tip = 0.05; }
  else if (t < 108.9) { P.handL = K17H.hipsHands.L; P.handR = K17H.hipsHands.R; P.brow = 0.7; P.mouth = 'frown'; P.ph = 0.5 * Math.abs(Math.sin(t * 12)); P.amp = 1; tgt = [400, 740]; }
  else if (t < 110.06) { P.tip = 0.2 * K17B(t, 108.9, 0.3); P.handR = K17H.cupEar.R; P.handL = K17H.hipsHands.L; P.brow = -0.3; P.gaze = [K.lerp(0.2, 1, K17B(t, 109.4, 0.4)), 0]; P.inArcs = true; }
  else if (t < 121.0) { P.brow = 1; P.mouth = 'frown'; P.flush = K17B(t, 110.06, 0.8); P.steam = t < 112.5; P.x += tremble(t, 1.5, 11); P.handL = K17H.hipsHands.L; P.handR = K17H.hipsHands.R; tgt = [400, 740];
    if (t >= 116.6) { const r = k17Pound(t, K17_POUND_IN); if (r) P.aR = r; P.handR = null; P.handL = null; P.aL = [-0.4, -0.3]; } }
  // ---- S13 ----
  else if (t < 130.65) { P.brow = 0.8; P.mouth = 'frown'; P.flush = 0.5; tgt = t < 128.25 ? [430, 740] : k17Look(t, [[128.3, [560, 780]], [129.0, [950, 700]], [129.8, [1150, 720]]], 0.15); }
  else if (t < 131.7) { P.eyes = 'wide'; P.brow = 0.4; tgt = [810, 840]; P.flush = 0.4; }
  else if (t < 133.95) { P.flush = 0.3; const up = K17B(t, 131.9, 0.4, 'inOut'); P.handRW = t < 131.9 ? [858, 792] : t < 133.4 ? [K.lerp(858, 830, up), K.lerp(792, 712, up)] : [K.lerp(830, 858, K17B(t, 133.4, 0.2)), K.lerp(712, 790, K17B(t, 133.4, 0.2))];
    P.brow = t < 132.6 ? -0.5 : 1; P.mouth = t < 132.6 ? 'o' : 'frown'; tgt = t < 131.9 ? [860, 820] : [834, 690]; P.tip = t < 131.95 ? 0.12 : 0; }
  else if (t < 137.2) { P.brow = 0.5; P.mouth = 'closed'; tgt = [1140, 700]; P.look = K17B(t, 134.1, 0.25); P.lid = Math.max(pulse(t, 135.2, 0.18), pulse(t, 135.9, 0.18), 0.3); if (t >= 136.75) { P.handR = K17H.mouthCover.R; P.brow = 0.6; } }
  // ---- S14 ----
  else if (t < 142.48) { P.brow = 1; P.mouth = 'frown'; P.lean = t > 139.12 ? 0.1 : 0; tgt = TH ? k17Collar(TH) : [1250, 760]; if (t > 141.9 && TH) P.handRW = k17Collar(TH); }
  else if (t < 145.72) { P.brow = 1; P.mouth = 'frown'; P.tip = -0.1 * K17B(t, 142.48, 0.2); if (TH) P.handRW = k17Collar(TH); tgt = THh; }
  // ---- S15-S16 ----
  else if (t < 161.28) { tgt = THh; P.brow = 0.5; P.tilt = 0.08; P.talk = talk(t, [[148.22, 150.6]]); P.mouth = 'closed';
    if (t < 158.95 && TH) P.handRW = k17Collar(TH);
    P.handL = K17H.hipsHands.L;
    if (t >= 148.22 && t < 150.0) { P.handL = null; P.aL = [1.45, 1.62]; P.brow = -0.5; tgt = k17Look(t, [[148.3, [1300, 760]], [149.5, THh]], 0.15); }
    if (t >= 150.16 && t < 151.5) { P.handL = [52, -118]; P.lid = pulse(t, 150.6, 0.5); }
    if (t >= 151.5) P.brow = -0.3;
    if (t >= 158.56 && t < 160.36) { tgt = k17Look(t, [[158.56, [1300, 760]], [158.95, THh], [159.35, [1300, 760]], [159.8, THh]], 0.12); P.mouth = 'o'; P.lid = Math.max(P.lid || 0, pulse(t, 158.95, 0.45)); }
    if (t >= 160.36) { P.gaze = [0, 0.05]; tgt = null; P.handR = [8, -198]; P.handL = K17H.hipsHands.L; P.mouth = 'frown'; } }
  else { tgt = [200, 720]; P.brow = 0.4; P.mouth = 'frown'; if (TH && t < 164.8) P.handLW = k17Hand(TH, 1); }
  if (tgt || !P.gaze) k17Life(P, t, 37, tgt); else k17Life(P, t, 37, null);
  return P;
}

// ---------- the wife ----------
function k17WF(t, OW) {
  const P = { ...K17_WFB, y: K17_GR }; const xf = k17X(K17_WFX); k17Walk(P, xf, t); P.ph += 1.3; const f = k17Dir(t, K17_WFD); P.dir = f.dir; P.sq = f.sq;
  let tgt = OW ? k17Head(OW) : null;
  if (t < 12.3) P.alpha = 0;
  else if (t < 21.85) { P.alpha = K.clamp((t - 12.3) / 0.3); tgt = [150, 760]; }
  else if (t < 27.2) { P.handR = [40, -110]; P.bundle = true; tgt = [100, 760]; }
  else if (t < 46.9) P.alpha = 0;
  else if (t < 127.0) { P.handL = K17H.folded.L; P.handR = K17H.folded.R; P.tip = (t > 52.8 && t < 54.2 ? -0.12 : 0) + (t > 107.9 ? -0.14 * K17B(t, 107.9, 0.5) : 0); tgt = t > 107.0 && t < 112 ? (OW ? k17Head(OW) : null) : [400, 740]; }
  else if (t < 163.5) { P.tip = 0.14 * K17B(t, 128.6, 0.4); tgt = [760, 820]; P.mouth = t > 130.98 && t < 132 ? 'o' : 'closed'; P.handR = [30, -150]; }
  else { tgt = [100, 760]; }
  k17Life(P, t, 41, tgt);
  return P;
}
