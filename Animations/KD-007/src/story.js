// ===== KD-007 The Three Fish: tracks, acting and the world draw (one split-level world, 2200 x 1230) =====
// Times are seconds on the final MP3 (planning/inputs/timeline.json); onsets after pauses use the silence-refined starts in timing.json.
const K7VW = 1000, K7VH = 1230, K7DUR = 171.9;   // narration 168.405 s + 3.5 s held ending (creative plan)
const k7in = (t, a, b) => t >= a && t < b;
const k7fo = (t, t1, d = 0.3) => K.clamp((t1 - t) / d);
const k7loop = (cx, cy, r, t0, d) => (t) => { const a = Math.PI * 2 * K.ease.inOut(K.clamp((t - t0) / d)); return [cx + r * Math.sin(a), cy + r * Math.cos(a)]; };

// ---------- fish tracks ----------
const k7idle1 = (t) => [470 + 200 * Math.sin(0.5 * (t - 2.6)), 720 + 60 * Math.sin(1.0 * (t - 2.6))];
const k7idle2 = (t) => [460 - 220 * Math.sin(0.42 * (t - 3.0)), 820 + 50 * Math.sin(0.84 * (t - 3.0))];
const k7idle3 = (t) => [560 + 180 * Math.sin(0.6 * (t - 3.6)), 870 - 70 * Math.sin(1.2 * (t - 3.6))];
const k7circ = (k) => (t) => { const a = 0.95 * (t - 37.4) - k * 0.7; return [500 - 260 * Math.cos(a), 800 + 120 * Math.sin(a) + (k === 2 ? 18 * Math.sin(t * 3) : 0)]; };
const k7ring = (a0) => (t) => { const a = a0 + Math.PI * 2 * K.ease.inOut(K.clamp((t - 162.3) / 1.1)); return [1792 + 88 * Math.cos(a), 1000 + 55 * Math.sin(a)]; };
function k7resolve(items) { for (let i = 0; i < items.length; i++) if (items[i].at === null) { const p = items[i - 1]; items[i].at = p.fn ? p.fn(items[i].t) : p.at; } return items; }
const K7F1 = k7track(k7resolve([
  { t: 0, at: [90, 700] }, { t: 0.46, at: [90, 700] }, { t: 2.0, at: [560, 650], e: 'out' }, { t: 3.4, at: [560, 650] }, { t: 4.4, fn: k7idle1 },
  { t: 22.04, at: [600, 840], cut: true }, { t: 24.55, at: [470, 870] }, { t: 24.62, at: [470, 870] }, { t: 25.0, at: [340, 1040], e: 'out' },
  { t: 25.25, at: [330, 1045], face: 1 }, { t: 25.4, at: [330, 1045], face: 1 }, { t: 25.95, at: [405, 1045], face: 1 }, { t: 26.05, at: [405, 1045] }, { t: 26.9, at: [560, 950] },
  { t: 27.3, at: [150, 700], cut: true }, { t: 27.31, fn: (t) => [150 + 20 * Math.sin(t * 0.7), 700 + 15 * Math.sin(t * 1.3)] }, { t: 32.2, at: [10, 640], cut: true }, { t: 36.0, at: null }, { t: 37.4, fn: k7circ(0) },
  { t: 40.14, at: null }, { t: 41.2, at: [400, 615] }, { t: 57.9, at: [400, 615] }, { t: 58.75, at: [380, 690], face: -1 }, { t: 63.6, at: [380, 690], face: 1 },
  { t: 69.95, at: [380, 690], face: 1 }, { t: 70.6, at: [700, 640], e: 'in' }, { t: 71.35, at: [905, 548], e: 'lin' }, { t: 72.95, at: [1330, 548], e: 'lin' }, { t: 73.6, at: [1470, 680], e: 'out' },
  { t: 74.6, at: [1700, 800] }, { t: 74.62, fn: k7loop(1700, 740, 60, 74.62, 0.95), face: 1 }, { t: 75.6, at: null }, { t: 75.7, at: [1720, 800] }, { t: 76.96, at: [1720, 800] }, { t: 78.3, at: [1965, 1100] },
  { t: 158.4, at: [1965, 1100], cut: true }, { t: 161.7, at: [1965, 1100] }, { t: 162.1, at: [1880, 1000], e: 'out' }, { t: 162.3, at: [1880, 1000] }, { t: 162.31, fn: k7ring(0) },
  { t: 163.4, at: null }, { t: 165.3, at: [2010, 930] }, { t: 165.95, at: [2010, 930], face: -1 }, { t: 168.2, at: [1950, 885], face: 1 }, { t: 171.9, at: [2060, 870], e: 'inOut' },
]), { dir0: 1 });
const K7F2 = k7track(k7resolve([
  { t: 0, at: [100, 810] }, { t: 0.9, at: [100, 810] }, { t: 2.4, at: [320, 800], e: 'out' }, { t: 3.4, at: [320, 800] }, { t: 4.4, fn: k7idle2 }, { t: 19.78, at: null }, { t: 20.4, at: [430, 790], face: 1 }, { t: 22.0, at: [430, 790], face: 1 },
  { t: 22.04, at: [760, 640], cut: true }, { t: 27.3, at: [560, 790], cut: true, face: -1 }, { t: 31.4, at: [560, 790], face: 1 }, { t: 31.6, at: [606, 800], e: 'out', face: 1 }, { t: 32.0, at: [585, 795], face: 1 },
  { t: 32.2, at: [880, 600], cut: true }, { t: 36.0, at: [880, 600] }, { t: 37.4, fn: k7circ(1) }, { t: 40.14, at: null }, { t: 41.2, at: [610, 645] }, { t: 57.9, at: [610, 645] }, { t: 58.75, at: [585, 705], face: -1 },
  { t: 64.7, at: [585, 705], face: -1 }, { t: 65.4, at: [590, 640], face: -1 }, { t: 71.0, at: [590, 640] }, { t: 79.5, at: [820, 562] }, { t: 84.1, at: [820, 562], face: -1 }, { t: 88.84, at: [820, 562], face: -1 }, { t: 90.2, at: [520, 760] }, { t: 90.3, at: [520, 760] },
  { t: 90.65, at: [440, 950] }, { t: 90.75, at: [440, 950] }, { t: 91.05, at: [590, 935] }, { t: 91.15, at: [590, 935] }, { t: 91.8, at: [520, 790] }, { t: 91.81, fn: (t) => [520 + 70 * Math.sin(1.3 * (t - 91.81)) * (t > 101.4 ? K.lerp(1, 0.5, K.clamp(t - 101.4)) : 1), 790 + 6 * Math.sin(t * 2)] },
  { t: 103.6, at: [520, 760], cut: true }, { t: 110.6, at: [520, 760] }, { t: 111.6, at: [620, 740] }, { t: 112.9, at: [620, 740] }, { t: 113.9, at: [440, 690] }, { t: 114.3, at: [440, 690], face: 1 },
  { t: 115.2, at: [620, 650], e: 'in', face: 1 }, { t: 116.4, at: [760, 600], e: 'lin', face: 1 }, { t: 117.45, at: [821, 555], e: 'lin', face: 1 }, { t: 117.47, at: [821, 555], face: 1 }, { t: 117.95, at: [700, 590], e: 'out', face: 1 },
  { t: 118.9, at: [720, 580], face: 1 }, { t: 119.35, at: [815, 525], e: 'in', face: 1 }, { t: 119.6, at: [760, 540], e: 'out', face: 1 }, { t: 119.95, at: [818, 575], e: 'in', face: 1 }, { t: 120.2, at: [780, 570], e: 'out', face: 1 },
  { t: 120.6, at: [812, 556], face: 1 }, { t: 131.66, at: [812, 560], face: 1 }, { t: 132.6, at: [812, 516], e: 'out', face: 1 }, { t: 137.5, at: [812, 516], face: 1 },
  { t: 143.9, at: [1610, 520], cut: true, face: 1 }, { t: 145.2, at: [1800, 800], e: 'out' }, { t: 146.4, at: [1840, 820] },
  { t: 158.4, at: [1380, 900], cut: true }, { t: 159.6, at: [1380, 900] }, { t: 161.2, at: [1690, 980] }, { t: 161.7, at: [1690, 980] }, { t: 162.1, at: [1704, 1000], e: 'out' }, { t: 162.3, at: [1704, 1000] }, { t: 162.31, fn: k7ring(Math.PI) },
  { t: 163.4, at: null }, { t: 164.48, at: [1860, 975] }, { t: 164.5, fn: k7loop(1860, 915, 60, 164.5, 0.7), face: 1 }, { t: 165.2, at: null }, { t: 165.5, at: [1935, 960] }, { t: 165.73, at: [1935, 960], face: -1 },
  { t: 168.35, at: [1880, 1000], face: 1 }, { t: 171.9, at: [1985, 990], e: 'inOut' },
]), { dir0: 1 });
const K7F3 = k7track(k7resolve([
  { t: 0, at: [110, 880] }, { t: 1.3, fn: (t) => { const u = K.clamp((t - 1.3) / 1.1), a = Math.PI * 2 * K.clamp((u - 0.3) / 0.5); return [K.lerp(110, 690, K.ease.out(u)) + 60 * Math.sin(a), 965 - 50 * (1 - Math.cos(a))]; } },
  { t: 2.4, at: null }, { t: 2.75, at: [730, 955], e: 'out' }, { t: 3.4, at: [720, 955] }, { t: 4.4, fn: k7idle3 }, { t: 18.68, at: null }, { t: 20.2, at: [560, 600] }, { t: 21.2, at: [560, 600] }, { t: 22.0, at: [560, 640] },
  { t: 22.04, at: [780, 820], cut: true }, { t: 27.3, at: [1000, 810], cut: true }, { t: 30.9, at: [1000, 810] }, { t: 32.1, at: [150, 830], e: 'lin' },
  { t: 32.22, at: [690, 985], cut: true, face: -1 }, { t: 32.46, at: [690, 985], face: -1 }, { t: 34.38, at: [504, 990], e: 'in', face: -1 }, { t: 34.39, at: [504, 990], face: -1 }, { t: 34.69, at: [575, 978], e: 'out', face: -1 }, { t: 36.0, at: [590, 975], face: -1 },
  { t: 37.4, fn: k7circ(2) }, { t: 40.14, at: null }, { t: 41.2, at: [505, 725] }, { t: 57.9, at: [505, 725] }, { t: 58.75, at: [480, 790] }, { t: 62.45, at: [480, 790] }, { t: 62.9, at: [655, 795], e: 'out', face: -1 }, { t: 64.7, at: [655, 795], face: -1 }, { t: 65.4, at: [605, 835], face: -1 }, { t: 70.0, at: [605, 835], face: -1 },
  { t: 81.1, at: [290, 590], cut: true, face: 1 }, { t: 100.4, at: [330, 600], face: 1 }, { t: 100.45, fn: k7loop(330, 670, 70, 100.45, 1.6), face: 1 }, { t: 102.05, at: null }, { t: 102.4, at: [330, 640] },
  { t: 103.6, at: [600, 1048], cut: true, face: -1 }, { t: 146.7, at: [640, 820], cut: true, face: -1 }, { t: 147.7, at: [640, 820], face: -1 }, { t: 149.3, at: [700, 820], face: -1 }, { t: 149.5, at: [700, 820] },
  { t: 150.2, at: [835, 600], e: 'in' }, { t: 150.32, at: [800, 618], e: 'out' }, { t: 150.7, at: [690, 548], e: 'in' }, { t: 150.82, at: [690, 585], e: 'out' }, { t: 151.2, at: [660, 1035], e: 'in' }, { t: 151.34, at: [660, 1000], e: 'out' },
  { t: 151.66, at: [640, 1000] }, { t: 152.3, at: [492, 1052], e: 'in', face: -1 }, { t: 152.9, at: [492, 1052], face: -1 }, { t: 153.3, at: [560, 735], e: 'out', face: 1 }, { t: 160, at: [560, 735], face: 1 },
]), { dir0: 1, turn: 0.25 });

// ---------- the fishermen ----------
const K7AX = (t) => kfn(t, [[0, 3000], [43.19, 3000], [43.2, 1350], [47.1, 600], [57.2, 600], [60.8, -250], [105.6, -250], [107.6, 420], [130.8, 420], [133.9, 640], [138.3, 640], [139.9, 1340], [140.6, 1340], [142.2, 1290], [146.0, 1290], [155.4, 1050], [156.6, 700]]);
const K7BX = (t) => kfn(t, [[0, 3000], [43.59, 3000], [43.6, 1500], [47.3, 725], [47.55, 662], [47.9, 690], [57.5, 690], [61.3, -200], [105.7, -380], [107.7, 300], [110.0, 300], [111.5, 960], [113.1, 960], [115.2, 500], [131.5, 500], [133.9, 960], [138.8, 960], [141.5, 400], [146.7, 210], [152.5, 330], [155.2, 520]]);
const K7NETX = (t) => kfn(t, [[146.7, 260], [152.5, 380], [155.2, 590]], 'in');
const K7FALLS = [...footfalls(K7AX, 43.2, 47.1, 24), ...footfalls(K7BX, 43.6, 47.5, 20), ...footfalls(K7AX, 57.2, 60.8, 24), ...footfalls(K7BX, 57.5, 61.3, 20), ...footfalls(K7AX, 105.6, 107.6, 24), ...footfalls(K7BX, 105.7, 107.7, 20), ...footfalls(K7BX, 110.0, 111.5, 20)].sort((a, b) => a.t - b.t);
const K7HITS = [111.75, 112.3], K7REACH = 172;   // A's hand-net reach in S7 (he stands at x 640, clear of the floating fish at 812)
function k7hand(P, i) { const h = P.hands ? P.hands[i] : [0, -120]; return [P.x + h[0] * (P.s || 1) * Math.sign(P.dir || 1), P.y + h[1] * (P.s || 1)]; }
const K7A_PAL = { robe: C.blue, dot: '#0d2f80' }, K7B_PAL = { robe: C.red, dot: '#a8160f', hc: C.yellow, hd: C.red };
function k7manA(t) {
  const xf = K7AX, P = { ...walk(xf, t, { stride: 24 }), y: K7BANK, s: 0.95, costume: 'villager', pal: K7A_PAL, lid: blink(t, 41), dir: speed(xf, t) < -5 ? -1 : speed(xf, t) > 5 ? 1 : (t < 100 ? -1 : t < 140.4 ? 1 : t < 143.9 ? -1 : t < 146 ? 1 : -1) };
  P.gaze = [P.dir * 0.8, 0.3];
  if (k7in(t, 46.62, 57.2)) { P.gaze = lookAt([600, 230], [480, 700]); P.drop = 6; }
  if (k7in(t, 47.6, 47.94)) { P.dir = 1; P.mouth = 'o'; P.brow = -0.6; P.gaze = [1, 0]; }
  if (k7in(t, 47.94, 49.6)) { P.handR = [30, -205]; P.tip = 0.06 * K7B(t, 47.94, 0.4, 'out'); P.brow = -0.4; P.mouth = t < 48.8 ? 'o' : 'smile'; }
  if (k7in(t, 49.6, 50.62)) { P.tip = 0.06; P.mouth = 'smile'; P.handR = [30, -205]; }
  if (k7in(t, 50.62, 51.9)) { P.gaze = lookAt([600, 230], [690, 260]); P.handL = [-90, -120]; P.mouth = 'smile'; }
  if (k7in(t, 51.75, 54.86)) { const a = anticipate(t, 51.75, 0.15, 0.06); P.sq = a; P.handR = [K.lerp(40, 80, K7B(t, 51.9, 0.2, 'out')), K.lerp(-150, -70, K7B(t, 51.9, 0.2, 'out'))]; P.tip = 0.08; }
  if (k7in(t, 54.86, 56.04)) { P.handR = [K.lerp(80, -20, K7B(t, 54.86, 0.25, 'out')), -170]; P.gaze = lookAt([600, 230], [690, 260]); P.drop = 6 * pulse(t, 55.4, 0.4); }
  if (k7in(t, 56.04, 57.6)) { P.mouth = 'smile'; P.gaze = lookAt([600, 230], [690, 260]); }
  P.talk = talk(t, [[51.9, 53.9], [54.86, 57.6]]);
  if (k7in(t, 57.6, 61)) P.mouth = 'smile';
  if (k7in(t, 105, 121.6)) P.gaze = lookAt([P.x, 230], [520, 760]);
  if (k7in(t, 105.6, 109.26)) P.handL = [-34, -150];
  if (k7in(t, 120.3, 121.8)) { P.handR = [60, -90]; P.handL = [30, -100]; P.tip = 0.05; }
  if (k7in(t, 133.9, 137.38)) { P.gaze = lookAt([P.x, 230], [812, 515]); P.tip = 0.1; P.brow = -0.5; }
  if (k7in(t, 135.6, 136.3)) { P.gaze = lookAt([P.x, 230], [K7BX(t), 250]); P.tip = 0.03; }
  if (k7in(t, 136.3, 137.2)) { const u = K7B(t, 136.3, 0.2, 'out'); P.handL = [-60 * u - 14 * (1 - u), -100]; P.handR = [60 * u + 14 * (1 - u), -100]; P.mouth = 'frown'; P.brow = -0.6; P.drop = 5 * pulse(t, 136.3, 0.5); P.gaze = lookAt([P.x, 230], [K7BX(t), 250]); P.tip = 0; }
  if (k7in(t, 137.38, 140.3)) { P.handR = [56, -120]; P.handL = [30, -125]; P.gaze = [P.dir * 0.8, 0.4]; }
  if (k7in(t, 140.3, 143.9)) { P.gaze = [-1, 0.1]; }
  if (k7in(t, 143.9, 145.28)) { const u = K7B(t, 143.9, 0.2, 'out'); P.handL = [-90 * u, -140]; P.handR = [90 * u, -140]; P.mouth = 'o'; P.gaze = lookAt([1290, 230], [1650, 600]); P.brow = -1; P.sq = impactSquash(t, 143.95, 0.85); }
  if (k7in(t, 145.28, 146.7)) { P.handL = [-44, -210]; P.handR = [44, -210]; P.mouth = 'frown'; P.brow = 1; P.y += -Math.abs(Math.sin((t - 145.28) * 9)) * 8 * K.clamp(1 - (t - 145.28)); }
  if (k7in(t, 156.4, 158.4)) { P.handL = [-40, -220]; P.handR = [-10, -230]; P.gaze = lookAt([P.x, 230], [600, 500]); }
  return P;
}
function k7manB(t) {
  const xf = K7BX, sp = speed(xf, t), P = { ...walk(xf, t, { stride: 20 }), y: K7BANK, s: 0.8, costume: 'villager', pal: K7B_PAL, lid: blink(t, 53), dir: sp < -5 ? -1 : sp > 5 ? 1 : (t < 47.6 ? -1 : t < 100 ? -1 : t < 113.1 ? 1 : t < 131.5 ? -1 : t < 138.8 ? -1 : 1) };
  P.gaze = [P.dir * 0.8, 0.3]; P.brow = 0;
  if (k7in(t, 43.6, 47.5)) P.gaze = [0.1, 0.9];   // eyes on his basket
  if (k7in(t, 47.5, 48.4)) { P.sq = impactSquash(t, 47.55, 0.8); P.mouth = 'o'; P.drop = -6 * pulse(t, 47.55, 0.4); }
  if (k7in(t, 48.4, 57.5)) P.gaze = lookAt([690, 260], [600, 230]);
  if (k7in(t, 52.6, 54.0)) { const c = countedBeats(t, [52.6, 53.0, 53.4]); P.handR = [70, -90 + 10 * c.accent]; P.gaze = lookAt([690, 260], [470, 650]); P.eyes = 'wide'; P.tip = 0.08; }
  if (k7in(t, 56.04, 56.88)) { const u = K7B(t, 56.04, 0.35, 'out'); P.handL = [K.lerp(-74, -40, u), -110]; P.handR = [K.lerp(74, 90, u), K.lerp(-110, -100, u)]; P.mouth = 'smile'; }
  if (k7in(t, 56.88, 57.9)) { P.handL = [-20, -120]; P.handR = [20, -122]; P.mouth = 'smile'; P.drop = 3 * Math.sin(t * 20); }
  if (k7in(t, 105.7, 109.26)) { P.handR = [34, -150]; P.mouth = 'o'; P.gaze = [0.6, 0.4]; }
  if (k7in(t, 110.0, 111.5)) { P.handL = [-30, -100]; P.mouth = 'closed'; }
  if (k7in(t, 111.5, 113.1)) { P.dir = -1; P.gaze = lookAt([960, 300], [915, 520]); const lift = (h) => K.clamp((t - (h - 0.3)) / 0.3), hit = K7HITS.find((h) => t < h + 0.25) ?? 112.3; const u = t < hit ? lift(hit) : Math.exp(-(t - hit) * 10); P.handR = [60, K.lerp(-110, -220, u)]; P.handL = [40, K.lerp(-100, -200, u)]; }
  if (k7in(t, 112.8, 113.1)) { P.handL = [-20, -110 + 6 * Math.sin(t * 40)]; P.handR = [20, -110 - 6 * Math.sin(t * 40)]; P.mouth = 'smile'; }
  if (k7in(t, 133.9, 138.8)) { P.gaze = lookAt([960, 300], [812, 515]); P.dir = -1; P.tip = 0.06; }
  if (k7in(t, 134.6, 135.6)) { const u = pulse(t, 134.7, 0.9); P.handR = [70 + 40 * u, -100 + 30 * u]; }
  if (k7in(t, 135.6, 136.6)) { P.gaze = lookAt([960, 300], [K7AX(t), 240]); P.tip = 0; P.brow = -0.4; }
  if (k7in(t, 136.6, 137.6)) { P.dir = 1; P.handR = [10, -172]; P.handL = [-50, -110 + 12 * Math.sin(t * 18)]; P.eyes = 'shut'; P.mouth = 'frown'; P.gaze = null; P.lid = 0; P.tip = -0.08; }
  if (k7in(t, 146.7, 156.4)) { P.handR = [60, -110]; P.handL = [40, -116]; P.tip = -0.06; P.mouth = 'grit'; P.gaze = lookAt([P.x, 300], [K7NETX(t), 700]); }
  if (k7in(t, 156.4, 158.4)) { P.handL = [10, -230]; P.handR = [40, -220]; P.gaze = lookAt([P.x, 300], [600, 500]); }
  return P;
}

// ---------- the fish: tracks plus acting ----------
// the three peeks of the 'dead' fish: 132.8 (before the men arrive), 136.6 (B turns away pinching his nose), 140.8 (A's back turned)
const K7PEEKS = [132.8, 136.6, 140.85], k7peek = (t) => K7PEEKS.find((a) => t >= a && t < a + 0.75);
function k7base(F, t, pal) { const r = F(t); return { x: r.x, y: r.y, dir: r.dir, ph: r.ph, amp: r.amp, rot: r.tip, pal, _v: r }; }
const k7look = (P, to) => lookAt([P.x, P.y], to);
function k7f1(t) {
  const P = k7base(K7F1, t, 0), sp = P._v.v;
  if (t < 22.04) { if (k7in(t, 18.0, 22.04)) P.gaze = k7look(P, [K7F3(t).x, K7F3(t).y]); }
  else if (t < 42.54) {
    if (k7in(t, 23.95, 24.62)) { P.gaze = [0.25, -1]; P.amp = 0.15; }
    if (k7in(t, 24.45, 24.62)) { P.bend = -0.5 * K7B(t, 24.45, 0.12); P.sq = anticipate(t, 24.45, 0.17, 0.1); }
    if (k7in(t, 24.62, 25.1)) { P.sq = 1.12; P.dorsal = 0; P.amp = 1; }
    if (k7in(t, 25.95, 26.9)) { P.lid = 0.25; P.gaze = [1, -0.2]; }
    if (k7in(t, 25.4, 25.95)) { P.gaze = [1, -0.6]; P.dorsal = 0.3; }
    if (k7in(t, 37.4, 40.14)) P.gaze = [Math.sign(P.dir), 0];
    if (k7in(t, 40.6, 41.4)) P.lid = 0.25 + 0.75 * pulse(t, 40.6, 0.7);
  } else if (t < 63.4) {
    if (t >= 43.1) P.gaze = k7look(P, [Math.max(300, K7AX(t)), 300]);
    if (k7in(t, 49.6, 50.62)) { P.amp = 0.05; P.dorsal = 0.3; }
    if (k7in(t, 52.6, 52.9)) P.sq = 1 - 0.06 * pulse(t, 52.6, 0.3);
    if (t >= 58.82) { P.amp = 0; P.gaze = gazePlan(t, [[58.82, [0, -1]], [60.2, [-0.5, -1]]], 0.4); }
    if (t >= 61.89) { const j = pulse(t, 61.89, 0.25); P.sq = impactSquash(t, 61.89, 0.8); P.x -= 10 * j; P.y -= 6 * j; P.brow = 0.6; P.lid = 0; P.eyes = t < 62.3 ? 'wide' : 'open'; P.dorsal = 1; P.mouth = 'closed'; }
    if (t >= 62.58) P.gaze = [-0.3, -1];
  } else if (t < 81.1) {
    if (t < 69.95) { P.brow = 0.4; P.mouth = 'closed'; P.gaze = k7look(P, [585, 705]); }
    if (k7in(t, 63.4, 63.9)) P.gaze = [-0.3, -1];
    P.talk = talk(t, [[66.96, 69.1]]);
    if (k7in(t, 66.96, 67.34)) { P.bend = 0.5 * Math.sin((t - 66.96) / 0.19 * Math.PI * 2); P.eyes = 'shut'; }
    if (k7in(t, 67.34, 67.95)) { P.fin = K.lerp(1, -1, K7B(t, 67.34, 0.5, 'inOut')); P.gaze = [-0.3, -1]; }
    if (k7in(t, 67.98, 69.0)) { P.finPt = K7B(t, 67.98, 0.2, 'out'); P.gaze = gazePlan(t, [[67.98, [1, -0.2]], [68.35, [0.5, 0.3]], [68.7, [1, -0.2]]], 0.07); }
    if (k7in(t, 68.6, 69.2)) P.fin = Math.sin((t - 68.6) * 18) * 0.8;
    if (k7in(t, 69.6, 69.95)) { P.bend = -0.6 * K7B(t, 69.6, 0.3); P.sq = anticipate(t, 69.6, 0.35, 0.12); P.gaze = [1, -0.2]; }
    if (k7in(t, 69.95, 70.6)) { P.sq = 1.15; P.dorsal = 0.2; P.amp = 1; P.brow = 0.5; }
    if (k7in(t, 70.6, 73.6)) { P.amp = 1; P.dorsal = t > 71.35 && t < 72.95 ? 1 : 0.4; P.brow = 0.4; }
    if (k7in(t, 71.35, 72.95)) { P.sq = 1.1; P.lid = 0.45; P.rot = 0; }
    if (k7in(t, 74.62, 75.6)) { const v = P._v; P.rot = Math.atan2(v.vy, v.vx); P.dir = 1; P.mouth = t < 75.1 ? 'o' : 'smile'; }
    if (k7in(t, 75.6, 76.96)) { P.gaze = gazePlan(t, [[75.6, [1, 0]], [75.9, [-0.6, 0.8]], [76.3, [0.7, 0.7]], [76.7, [1, 0.6]]], 0.07); }
    if (k7in(t, 76.96, 78.42)) P.gaze = k7look(P, [1965, 1100]);
    if (t >= 78.42) { P.mouth = 'smile'; P.lid = 0.3; P.amp = 0.2; }
    if (t >= 79.14) { P.mouth = 'closed'; P.gaze = [-1, -0.3]; P.brow = -0.4; P.lid = Math.max(0.2, pulse(t, 79.6, 0.45)); }
  } else if (t >= 158.4) {
    P.gaze = t < 161.25 ? [-1, -0.2] : k7look(P, [K7F2(t).x, K7F2(t).y]); P.lid = 0.2;
    if (k7in(t, 161.25, 161.8)) { P.eyes = 'wide'; P.dorsal = 1; }
    if (k7in(t, 162.0, 162.6)) { P.sq = impactSquash(t, 162.1, 0.85); P.mouth = 'smile'; }
    if (k7in(t, 162.6, 165.3)) P.mouth = 'smile';
    if (k7in(t, 164.5, 165.3)) P.gaze = k7look(P, [K7F2(t).x, K7F2(t).y]);
    if (k7in(t, 165.3, 167.98)) { P.gaze = [-1, -0.1]; P.mouth = 'closed'; }
    if (k7in(t, 166.6, 167.8)) { P.lid = Math.max(0.2, Math.sin(Math.PI * (t - 166.6) / 1.2)); P.rot = 0.08; }
    if (t >= 167.98) { P.gaze = [1, 0]; P.mouth = 'closed'; }
    P.s = 1 - 0.3 * K.clamp((t - 168.6) / 3.3);
  }
  return P;
}
function k7f2(t) {
  const P = k7base(K7F2, t, 1);
  if (t < 22.04) {
    P.gaze = [Math.sign(P.dir), 0];
    if (k7in(t, 0.9, 1.4)) P.gaze = k7look(P, [K7F1(t).x, K7F1(t).y]);
    if (t >= 19.78) { P.gaze = k7look(P, [K7F3(t).x, K7F3(t).y]); P.brow = -0.5; P.lid = Math.max(0, Math.sin(Math.PI * K.clamp((t - 20.6) / 0.5))); P.rot = -0.1; P.amp = 0.2; }
  } else if (t < 42.54) {
    if (k7in(t, 27.3, 32.2)) {
      P.brow = -0.4; P.eyes = 'wide';
      P.gaze = gazePlan(t, [[27.3, [0, -1]], [27.9, [-0.8, 0.3]], [28.25, [0.8, 0.3]], [28.6, [-0.8, 0.3]], [28.85, [0.8, 0.3]], [30.1, [-0.8, 0.3]], [30.45, [0.8, 0.3]], [30.95, [-0.8, 0.3]]], 0.07);
      const l1 = settleTo(t, 29.34, 0, -40, 0.3) - settleTo(t, 29.7, 0, -40, 0.3), l2 = settleTo(t, 29.95, 0, 40, 0.3) - settleTo(t, 30.3, 0, 40, 0.3);
      if (t < 31.4) { P.x += l1 + l2; P.dir = t > 29.9 && t < 30.4 ? 1 : -1; }
      if (k7in(t, 30.08, 30.95)) { P.mouth = 'closed'; P.eyes = 'open'; }
      if (k7in(t, 31.0, 31.4)) { P.eyes = 'wide'; P.gaze = k7look(P, [K7F3(t).x, K7F3(t).y]); }
      if (k7in(t, 31.4, 32.2)) { P.mouth = t < 31.65 ? 'open' : 'smile'; P.eyes = 'open'; P.puff = pulse(t, 31.7, 0.4); P.gaze = [1, 0]; }
    }
    if (k7in(t, 37.4, 40.14)) P.gaze = k7look(P, [K7F1(t).x, K7F1(t).y]);
    if (k7in(t, 40.6, 42.54)) P.mouth = 'smile';
  } else if (t < 63.4) {
    if (t >= 43.25) P.gaze = k7look(P, [Math.max(300, K7AX(t)), 300]);
    if (k7in(t, 49.6, 50.62)) { P.amp = 0.05; P.dorsal = 0.3; }
    if (k7in(t, 53.0, 53.3)) P.sq = 1 - 0.06 * pulse(t, 53.0, 0.3);
    if (k7in(t, 58.82, 62.09)) { P.amp = 0; P.gaze = [-0.2, -1]; P.eyes = 'wide'; P.mouth = t > 59.32 ? 'o' : 'closed'; }
    if (t >= 62.09) { P.eyes = 'wide'; P.x += tremble(t, 2.5); P.y += tremble(t, 1.5, 7); P.puff = pulse(t, 62.09, 0.35); P.brow = -0.7; P.mouth = 'o'; P.amp = 0.15;
      P.gaze = gazePlan(t, [[62.09, [-1, -0.3]], [62.3, [1, -0.3]], [62.5, [-1, -0.3]], [62.7, [1, -0.3]], [62.9, [-1, -0.3]], [63.1, [0, -1]]], 0.06); P.fin = 0.85; P.dorsal = 1; }
  } else if (t < 81.1) {
    P.gaze = k7look(P, [K7F1(t).x, K7F1(t).y]); P.brow = -0.3;
    if (k7in(t, 68.4, 70.3)) { P.x += 25 * K7B(t, 68.4, 0.5, 'out') * (1 - K7B(t, 69.6, 0.6)); P.rot = 0.06; }
    if (k7in(t, 70.0, 71.0)) { P.eyes = 'wide'; P.gaze = [1, -0.1]; }
  } else if (t < 103.6) {
    P.brow = -0.3;
    if (t < 84.1) { P.gaze = [1, -0.1]; const l = settleTo(t, 82.6, 0, 40, 0.3) - settleTo(t, 83.0, 0, 40, 0.35) + settleTo(t, 83.3, 0, 35, 0.3) - settleTo(t, 83.7, 0, 35, 0.35); P.x += l; P.gaze = t > 82.95 && t < 83.3 ? [-1, 0] : [1, 0]; }
    if (k7in(t, 84.1, 88.84)) { P.fin = settleTo(t, 84.3, 0, 1, 0.35); P.gaze = t < 85.2 ? [-0.2, 0.15] : [-1, 0.2]; P.brow = -0.5; P.mouth = 'smile'; P.rot = 0.04 * pulse(t, 85.6, 0.5) + 0.04 * pulse(t, 86.3, 0.5); }
    if (k7in(t, 86.14, 87.82)) { P.fin = 1; P.gaze = [-1, 0.2]; }
    P.talk = talk(t, [[85.56, 87.82]]);
    if (k7in(t, 89.6, 90.25)) P.gaze = gazePlan(t, [[89.6, [-1, 0.3]], [89.9, [1, 0.3]]], 0.15);
    if (k7in(t, 90.25, 91.26)) { P.gaze = [Math.sign(P.dir), 0.5]; P.eyes = 'wide'; }
    if (t >= 91.26) { P.fin = 0.7; P.finPt = 0.3; P.brow = 0.3; P.gaze = gazePlan(t, [[91.26, [0.3, -1]], [93, [-0.3, -1]]], 0.5); P.mouth = 'closed'; }
    if (k7in(t, 97.26, 99.72)) P.gaze = gazePlan(t, [[97.26, [-1, -0.4]], [98.1, [1, -0.2]], [98.7, [-1, -0.4]]], 0.15);
    if (t >= 101.48) { P.lid = 0.5; P.mouth = pulse(t, 101.6, 0.8) > 0.3 ? 'open' : 'closed'; P.amp = 0.15; }
  } else if (t < 125.4) {
    P.gaze = [Math.sign(P.dir), 0];
    if (t < 104.66) { P.lid = 0.8; P.amp = 0.1; }
    if (k7in(t, 104.66, 110.9)) { P.eyes = t < 105.5 ? 'wide' : 'open'; P.sq = t < 105.0 ? 0.9 + 0.1 * K7B(t, 104.7, 0.3) : 1; P.gaze = k7look(P, [Math.max(0, K7AX(t)), 300]); P.brow = -0.4; }
    if (k7in(t, 109.3, 109.6)) P.sq = 1 - 0.08 * pulse(t, 109.3, 0.3);
    if (k7in(t, 110.9, 113.9)) { P.gaze = k7look(P, [K7BX(t), 330]); P.eyes = 'wide'; }
    if (k7in(t, 113.95, 114.3)) { P.bend = -0.6 * K7B(t, 113.95, 0.3); P.sq = anticipate(t, 113.95, 0.35, 0.12); P.gaze = [1, -0.2]; P.brow = 0.5; }
    if (k7in(t, 114.3, 117.45)) { P.sq = t < 114.9 ? 1.15 : 1.08; P.amp = 1; P.brow = 0.5; P.gaze = [1, -0.1]; P.dorsal = 0.3; }
    if (k7in(t, 116.6, 117.45)) { P.eyes = 'wide'; P.brow = -0.6; }
    if (k7in(t, 117.45, 118.9)) { P.sq = impactSquash(t, 117.45, 0.6); P.rot = -Math.PI * 2 * K7B(t, 117.5, 0.45, 'out'); P.eyes = t < 118.2 ? 'x' : 'open'; P.mouth = 'o'; P.amp = 0.6; }
    if (k7in(t, 118.9, 121.0)) { P.brow = -0.7; P.wet = t > 119.6; P.gaze = [1, 0]; P.mouth = t > 120.2 ? 'frown' : 'grit'; P.amp = 0.7; }
    if (k7in(t, 119.33, 119.6)) P.sq = impactSquash(t, 119.35, 0.8);
    if (k7in(t, 119.93, 120.2)) P.sq = impactSquash(t, 119.95, 0.9);
    if (k7in(t, 120.6, 121.07)) { P.fin = 0.9; P.finPt = 0.6; P.mouth = 'frown'; P.x += tremble(t, 1); P.amp = 0.2; }
    if (k7in(t, 121.07, 121.7)) { P.gaze = [-1, 0.1]; P.eyes = 'wide'; P.wet = true; P.lid = t > 121.5 ? 1 : 0; P.brow = -0.6; }
    if (k7in(t, 121.7, 122.74)) { P.gaze = gazePlan(t, [[121.7, [-0.7, -0.7]], [121.95, [0.7, -0.7]], [122.2, [0.2, 0.9]], [122.45, [-0.5, -0.8]]], 0.07); P.brow = 0.3 * Math.sin(t * 9); P.wet = true; }
    if (k7in(t, 122.74, 123.84)) { P.gaze = [-0.6, -0.8]; P.eyes = 'wide'; }
    if (k7in(t, 123.84, 124.44)) { P.brow = K.lerp(-0.6, -0.4, K7B(t, 123.84, 0.3)); P.mouth = 'smirk'; P.gaze = [-0.6, -0.8]; }
    if (t >= 124.44) { P.puff = K7B(t, 124.44, 0.4, 'out'); P.gaze = t < 125.0 ? [0, 0.05] : [1, 0]; P.lid = 0; P.mouth = 'closed'; P.brow = -0.4; }
  } else if (t < 146.7) {
    P.puff = 1;
    const roll = t < 126.63 ? 0 : t < 128.6 ? 0.5 * K7B(t, 126.63, 1.9, 'inOut') : 0.5 + 0.5 * K7B(t, 128.6, 0.5, 'inOut');
    if (t < 140.0) { P.roll = roll; P.amp = K.lerp(0.25, 0, K7B(t, 125.72, 0.8)); P.fin = K.lerp(0, -0.6, K7B(t, 125.72, 0.8)); P.limp = K7B(t, 130.22, 0.8); P.eyes = t >= 129.12 ? 'shut' : 'open'; P.mouth = t >= 129.12 ? 'open' : 'closed';
      if (t < 129.12) P.gaze = [0, -1];
      const bob = t > 132.6 ? 3 * Math.sin((t - 132.6) * 2.2) : 0; P.y += bob; P.rot = t > 132.6 ? 0.04 * Math.sin((t - 132.6) * 1.6) : 0;
      const pk = k7peek(t); if (pk && t < 140) { P.eyes = 'open'; P.lid = 0.35; P.noBlink = true; P.gaze = t < 134 ? [-1, -0.5] : [1, -0.6]; }
      if (k7in(t, 134.7, 135.7)) { P.rot = 0.4 * pulse(t, 134.75, 0.9); P.y += 6 * pulse(t, 134.75, 0.5); }
    }
    if (k7in(t, 137.6, 140.0)) { const A = k7manA(t), h = k7hand({ ...A, hands: [[30, -125], [56, -120]] }, 1), bx = h[0] + K7REACH * Math.sign(A.dir), by = h[1] - 10 + 70 + 28; P.x = bx; P.y = by; P.rot = 0.9 * Math.sign(A.dir) + swing(t, 137.9, 0.3, 1.4, 1.5); P.roll = 1; P.limp = 1; P.eyes = 'shut'; P.mouth = 'open'; P.s = 0.85; }
    if (k7in(t, 140.0, 142.9)) { const u = K7B(t, 140.0, 0.22, 'in'); P.x = K.lerp(1450, K7SPOT[0], u); P.y = t < 140.22 ? K.lerp(395, K7SPOT[1], u) : K7SPOT[1] - rebound(t, 140.22, 10, 0.25); P.roll = 1; P.limp = 1; P.dir = 1; P.rot = 0; P.eyes = 'shut'; P.mouth = 'open'; P.sq = impactSquash(t, 140.22, 0.8); P.amp = 0;
      if (k7peek(t)) { P.eyes = 'open'; P.lid = 0.35; P.noBlink = true; P.gaze = [-1, -0.4]; }
      if (t >= 142.1) { P.eyes = 'wide'; P.bend = 1 * K7B(t, 142.1, 0.2, 'out'); P.sq = 0.8; P.roll = 1 - K7B(t, 142.1, 0.3); P.limp = 0; P.mouth = 'grit'; P.puff = 0; P.gaze = [1, 0.5]; } }
    if (k7in(t, 142.9, 143.9)) { const u = (t - 142.9) / 1.0; P.x = K.lerp(1450, 1610, u); P.y = K.lerp(K7SPOT[1], 505, u) - 210 * Math.sin(Math.PI * u) ; P.rot = -Math.PI * 2 * K.ease.inOut(u); P.sq = u < 0.2 ? 1.2 : 1.05; P.eyes = 'open'; P.mouth = 'smile'; P.puff = 0; P.roll = 0; P.amp = 0.8; P.dir = 1; }
    if (t >= 143.9) { P.puff = 0; P.amp = Math.max(P.amp, t < 145.2 ? 1 : 0.3); P.gaze = [1, 0.3]; P.mouth = 'smile'; P.brow = -0.2;
      if (t >= 145.28) { P.gaze = [-1, -0.4]; P.mouth = 'smirk'; P.brow = -0.4; } }
  } else if (t >= 158.4) {
    P.lid = t < 161.25 ? 0.35 : 0; P.amp = Math.max(P.amp, 0.3); P.gaze = t < 161.25 ? gazePlan(t, [[159.6, [1, 0.3]], [160.3, [1, -0.3]], [160.8, [0.8, 0.5]]], 0.2) : k7look(P, [K7F1(t).x, K7F1(t).y]);
    if (k7in(t, 161.25, 161.8)) { P.eyes = 'wide'; P.mouth = 'o'; }
    if (k7in(t, 162.0, 162.6)) { P.sq = impactSquash(t, 162.1, 0.85); P.mouth = 'smile'; }
    if (k7in(t, 162.6, 165.73)) P.mouth = 'smile';
    if (k7in(t, 164.5, 165.2)) { const v = P._v; P.rot = Math.atan2(v.vy, v.vx); P.dir = 1; P.eyes = 'shut'; P.sq = 1.08; }
    if (k7in(t, 165.73, 167.98)) { P.gaze = [-1, -0.1]; P.mouth = 'closed'; P.wet = t > 166.6; P.brow = -0.4; }
    if (t >= 167.98) { P.gaze = k7look(P, [K7F1(t).x, K7F1(t).y]); P.mouth = 'closed'; P.x += 6 * pulse(t, 168.0, 0.4); }
    P.s = 1 - 0.3 * K.clamp((t - 168.6) / 3.3);
  }
  return P;
}
function k7f3(t) {
  const P = k7base(K7F3, t, 2); P.eyes = 'shut'; P.mouth = 'smile';
  if (t < 22.04) {
    if (k7in(t, 1.3, 2.4)) { const v = P._v; P.rot = Math.atan2(v.vy, v.vx); P.dir = 1; P.amp = 1; }
    if (k7in(t, 18.68, 21.2)) { Object.assign(P, K7FLOAT); P.roll = K7B(t, 18.68, 0.7, 'inOut'); P.limp = P.roll; P.mouth = 'smile'; P.amp = 0.1; }
    if (k7in(t, 21.2, 22.04)) { P.roll = 1 - K7B(t, 21.2, 0.4, 'inOut'); P.amp = 0.4 + 0.6 * Math.exp(-(t - 21.6) * 3); P.ph += Math.sin((t - 21.2) * 25) * 2; }
  } else if (t < 42.54) {
    if (k7in(t, 30.9, 32.1)) { P.amp = 0.8; P.mouth = t > 31.45 && t < 31.6 ? 'open' : 'smile'; }
    if (k7in(t, 32.22, 34.38)) { P.roll = 1; P.fin = Math.sin(t * 6) * 0.9; P.amp = 0.6; P.mouth = 'smile'; }
    if (k7in(t, 34.38, 35.1)) { P.roll = 1 - K7B(t, 34.6, 0.4); P.sq = impactSquash(t, 34.38, 0.55); P.eyes = 'x'; P.mouth = 'o'; }
    if (k7in(t, 35.1, 36.0)) { P.mouth = 'smile'; P.eyes = 'shut'; P.roll = 0; P.rot = 0.06 * Math.sin((t - 35.1) * 5); P.amp = 0.3; }
    if (k7in(t, 37.4, 40.14)) { P.amp = 0.6; P.rot += 0.2 * Math.sin(t * 3); }
    if (t >= 40.14) P.mouth = 'smile';
  } else if (t < 63.4) {
    if (t >= 43.7) { P.eyes = 'shut'; P.mouth = 'smile'; }
    if (k7in(t, 49.6, 50.62)) { P.amp = 0.05; }
    if (k7in(t, 53.4, 53.7)) P.sq = 1 - 0.06 * pulse(t, 53.4, 0.3);
    if (k7in(t, 58.82, 62.39)) P.amp = 0;
    if (t >= 62.39) { P.eyes = 'wide'; P.lid = 0; P.mouth = 'o'; P.sq = t < 62.6 ? impactSquash(t, 62.39, 0.8) : 1; P.gaze = t < 62.9 ? [0, -1] : [-1, -0.6]; P.dorsal = 0.2; P.brow = -0.6; P.fin = -0.6; P.x += tremble(t, 1.5); }
  } else if (t < 81.1) {
    P.eyes = t < 64.7 ? 'wide' : 'open'; P.lid = t < 64.7 ? 0 : 0.2; P.gaze = t < 64.7 ? [-1, -0.6] : k7look(P, [K7F1(t).x, K7F1(t).y]); P.mouth = t < 64.7 ? 'o' : 'closed'; P.brow = t < 64.7 ? -0.6 : -0.2;
  } else if (t < 103.6) {
    if (t < 100.4) { P.roll = 1; P.limp = 0.4; P.amp = 0.15; P.mouth = 'smile'; P.fin = -0.4 + 0.2 * Math.sin(t * 2); }
    if (k7in(t, 94.12, 99.46)) { P.eyes = 'open'; P.lid = 0.6; P.gaze = [0.8, 0.6]; }
    P.talk = talk(t, [[95.23, 99.46]]);
    if (k7in(t, 95.23, 96.4)) { P.fin = Math.sin((t - 95.23) * 14); P.y += 6 * Math.sin((t - 95.23) * 14); }
    if (k7in(t, 96.5, 97.2)) { P.fin = settleTo(t, 96.5, 0, 1, 0.3); P.brow = -0.7; P.mouth = 'frown'; }
    if (k7in(t, 98.96, 99.75)) { P.puff = t < 99.6 ? K7B(t, 98.96, 0.4) : 0; P.mouth = t >= 99.6 ? 'o' : 'closed'; }
    if (k7in(t, 99.75, 100.4)) { P.x += tremble(t, 2); P.mouth = 'open'; P.eyes = 'shut'; }
    if (k7in(t, 100.45, 102.05)) { const v = P._v; P.roll = 1 - K7B(t, 100.4, 0.3); P.rot = Math.atan2(v.vy, v.vx); P.dir = 1; P.amp = 1; P.limp = 0; }
  } else if (t < 146.7) {
    P.roll = 0; P.lid = 1; P.eyes = 'shut'; P.amp = 0.1; P.mouth = 'smile'; P.rot = 0.05;
  } else {
    P.eyes = 'wide'; P.mouth = 'frown'; P.brow = -0.7; P.dorsal = 0.2; P.fin = -1;
    if (t < 149.38) { P.x += tremble(t, 2); P.gaze = [-1, 0]; P.amp = 0.6; }
    if (k7in(t, 149.38, 151.0)) { P.amp = 1; P.mouth = 'o'; P.gaze = [Math.sign(P.dir), 0]; }
    for (const h of [150.2, 150.7, 151.2]) if (k7in(t, h, h + 0.4)) { P.sq = impactSquash(t, h, 0.7); P.eyes = t < h + 0.15 ? 'x' : 'wide'; }
    if (k7in(t, 151.34, 151.66)) { P.gaze = gazePlan(t, [[151.34, [1, -0.3]], [151.5, [-1, 0.4]]], 0.06); P.amp = 0.5; }
    if (k7in(t, 151.66, 152.3)) { P.gaze = [-1, 0.3]; P.amp = 1; P.mouth = 'o'; }
    if (k7in(t, 152.3, 152.95)) { const w = Math.sin((t - 152.3) * 26); P.sq = 0.86 + 0.06 * w; P.x += 6 * w; P.rot = 0.08 * w; P.amp = 1; P.ph = t * 30; P.mouth = 'grit'; }
    if (k7in(t, 152.95, 153.3)) { P.amp = 0.6; P.wet = true; }
    if (t >= 153.3) { P.eyes = 'open'; P.lid = 0; P.wet = true; P.brow = -0.8; P.dorsal = 0; P.fin = -1; P.amp = 0.12; P.mouth = 'frown'; P.x += tremble(t, 1.6, 11); P.noBlink = true;
      P.gaze = gazePlan(t, [[153.3, [0.3, -1]], [153.95, [-1, 0.2]], [154.5, [-1, 0.4]]], 0.12); }
    if (t >= 155.15) { const u = K7B(t, 156.3, 0.85, 'in'); P.x = 560; P.y = K.lerp(735, 40, u); P.amp = t < 155.68 ? 0.8 : t < 156.2 ? 1 : 0.1; P.x += t > 155.68 && t < 156.2 ? 8 * Math.sin((t - 155.68) * 20) : 0; P.alpha = 0.85; P.dir = 1; P.eyes = 'wide'; }
  }
  return P;
}

// ---------- props and effects in the world ----------
function k7bigNet(ctx, t) {
  // on the bank, unrolled (109.26 .. 120.6)
  if (k7in(t, 109.26, 120.6)) { const u = K7B(t, 109.3, 0.5, 'out'), x1 = K.lerp(330, 760, u); ctx.save(); ctx.globalAlpha *= k7fo(t, 120.6, 0.4); k7net(ctx, [[220, 448], [x1, 448], [x1 + 10, 470], [210, 470]], { nu: 14, nv: 2, fill: 0.5, floats: true }); ctx.restore(); }
  // the wall in the pond: lowered at 120.6, dragged left to right in S8
  if (k7in(t, 120.6, 155.6)) { const x = t < 146.7 ? 260 : K7NETX(t), bot = K.lerp(520, k7bedY(x) - 12, K7B(t, 120.6, 1.0, 'out')), mv = t > 146.7 ? K.clamp(speed(K7NETX, t) / 60) : 0;
    const wrap = k7in(t, 155.15, 155.6) ? K7B(t, 155.15, 0.45) : 0;
    ctx.save(); if (wrap > 0) ctx.globalAlpha *= 1 - wrap;
    k7net(ctx, [[x - 45, 503], [x + 45, 503], [x + 45, bot], [x - 45, bot]], { nu: 5, nv: 12, fill: 0.4, floats: true, weights: true, bulge: [x, (503 + bot) / 2, -40 * mv + 70 * wrap, 140] }); ctx.restore();
    // ropes from the floats to the men's hands
    const B = k7manB(t), A = k7manA(t); if (t < 122 || t >= 146.7) { ctx.save(); ctx.strokeStyle = C.black; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 10, 500); ctx.lineTo(B.x + 30 * Math.sign(B.dir) * 0.8, 360); if (t < 146.7) { ctx.moveTo(x + 10, 500); ctx.lineTo(A.x + 40, 380); } ctx.stroke(); ctx.restore(); } }
  // the bag around Fish 3, lifted out
  if (k7in(t, 155.15, 158.46)) { const f = k7f3(t), r = 92 + 6 * (k7in(t, 155.68, 156.2) ? Math.sin((t - 155.68) * 20) : 0); ctx.save(); ctx.globalAlpha *= K7B(t, 155.15, 0.4); k7bag(ctx, f.x, f.y, r, f.y - 300); ctx.restore();
    if (k7in(t, 156.3, 157.1)) drops(ctx, f.x, f.y + r, t * 3, 4, '#9cc4ff'); }
}
function k7people(ctx, t) {
  const A = k7manA(t), B = k7manB(t), onA = A.x > -150 && A.x < 2300, onB = B.x > -150 && B.x < 2300;
  if (onB) person(ctx, B);
  if (onA) person(ctx, A);
  // A's hand net (S3 on the shoulder; S7 the scoop and carry)
  if (onA && (k7in(t, 43.0, 61.0))) { const h = k7hand(A, 1); k7handNet(ctx, h[0], h[1], h[0] - 90 * Math.sign(A.dir), h[1] - 120, -0.3 + 0.1 * Math.sin(t * 4)); }
  if (onA && k7in(t, 131.0, 137.38)) { const h = k7hand(A, 1), r = K7B(t, 136.9, 0.48, 'inOut'); k7handNet(ctx, h[0], h[1], h[0] + K.lerp(-85, K7REACH, r) * Math.sign(A.dir), h[1] + K.lerp(45, 120, r), 0.1 * Math.sin(t * 3) * (1 - r)); }
  if (onA && k7in(t, 137.38, 140.3)) { const h = k7hand(A, 1), dip = k7in(t, 137.38, 137.9) ? 1 - K7B(t, 137.38, 0.5, 'inOut') : 0, hx = h[0] + K7REACH * Math.sign(A.dir), hy = h[1] - 10 + dip * 130, tipU = K7B(t, 139.95, 0.3);
    k7handNet(ctx, h[0], h[1], hx, hy, swing(t, 137.9, 0.3, 1.4, 1.5) + 1.6 * tipU); }
  if (onA && t >= 140.3 && t < 146.7) { const h = k7hand(A, 1); k7handNet(ctx, h[0], h[1], h[0] - 85 * Math.sign(A.dir), h[1] + 45, swing(t, 143.9, 0.7, 1.3, 1.2)); }
  // B's basket (S3), stakes and mallet (S6), the prodding pole (S7)
  if (onB && k7in(t, 43.0, 62.0)) { const h = k7hand(B, 0); shape(ctx, [[h[0] - 26, h[1] - 6], [h[0] + 26, h[1] - 6], [h[0] + 20, h[1] + 30], [h[0] - 20, h[1] + 30]], '#c98a3a', { lw: 4, seed: 61, dot: '#7a4212', pitch: 6, rad: 0.3, da: 0.6 }); }
  if (onB && k7in(t, 110.0, 111.5)) { const h = k7hand(B, 0); seg(ctx, h[0] - 20, h[1] - 50, h[0] + 30, h[1] + 30, 8, WOOD, 3); seg(ctx, h[0] - 6, h[1] - 54, h[0] + 44, h[1] + 26, 8, WOOD, 3); }
  if (onB && k7in(t, 111.5, 112.8)) { const h = k7hand(B, 1), a = Math.atan2(h[1] - 300, h[0] - 960); seg(ctx, h[0], h[1], h[0] - 60, h[1] + 30, 7, WOOD, 3); shape(ctx, ell(h[0] - 70, h[1] + 34, 22, 14, 14), WOOD, { lw: 4, seed: 62 }); }
  if (onB && k7in(t, 133.9, 136.3)) { const h = k7hand(B, 1), u = pulse(t, 134.7, 0.9); seg(ctx, h[0], h[1], K.lerp(h[0] - 70, 860, 0.6 + 0.4 * u), K.lerp(h[1] + 20, 500, 0.6 + 0.4 * u), 7, WOOD, 3); }
  // the rolled net carried on a pole (S6)
  if (onA && onB && k7in(t, 105.6, 109.26)) { const a = k7hand(A, 0), b = k7hand(B, 1); k7roll(ctx, b[0], b[1], a[0], a[1], 28 + 8 * Math.sin(t * 7) + swing(t, 107.6, 10, 1.6, 2)); }
  if (k7in(t, 109.26, 109.8)) { const u = K7B(t, 109.26, 0.25, 'in'); shape(ctx, ell(360, K.lerp(330, 445, u), 120 * (1 - 0.3 * K7B(t, 109.5, 0.3)), 24, 20), '#f2e6c4', { lw: 5, seed: 97 }); dustBurst(ctx, 360, 466, t - 109.5, 8, 10, 26, 90, 0.6, 9); }
  // the cap on A's head is a turban; on the stamp a dust puff
  if (k7in(t, 145.3, 146.2)) dustBurst(ctx, A.x, 466, t - 145.3, 6, 8, 18, 50, 0.5, 4);
}
function k7drawWorld(ctx, t, cam) {
  // sky and time of day
  const u = t < 81 ? 0.25 : t < 103.6 ? kfn(t, [[84.7, 0.25], [87.6, 0.45], [102, 0.64]]) : t < 113 ? K.lerp(0.0, 0.25, K7B(t, 110.0, 2.6, 'inOut')) : 0.25, d = dayCycle(u);
  const SA = SKY[d.a], SB = SKY[d.b]; ctx.fillStyle = mixHex(SA.base, SB.base, d.f); ctx.fillRect(0, 0, K7W, 490); ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = dotPat(ctx, mixHex(SA.dot, SB.dot, d.f), 13, 0.3); ctx.fillRect(0, 0, K7W, 490); ctx.restore();
  if (d.stars > 0.02) { ctx.save(); ctx.globalAlpha *= d.stars; stars(ctx, { w: K7W, h: 300, n: 40, seed: 4 }); ctx.restore(); }
  const sunP = t < 81 ? [1060, 150] : t < 103.6 ? [1020, kfn(t, [[84.7, 300], [87.82, 388], [102.5, 520]])] : t < 125 ? [960, kfn(t, [[104, 520], [106.5, 250], [112, 170]])] : [1060, 150];
  if (sunP[1] < 520) sun(ctx, sunP[0], sunP[1], t * 0.3);
  k7back(ctx);
  // bank life
  if (t < 22.04) { const bx = kfn(t, [[4.74, -60], [5.9, 0]], 'out'), tip = k7reedTip(150, t, 5.9, 2), fly = t < 5.9; if (t > 4.74) songbird(ctx, { x: fly ? K.lerp(300, tip[0], (t - 4.74) / 1.16) : tip[0], y: fly ? K.lerp(260, tip[1] - 30, K.ease.out((t - 4.74) / 1.16)) - 40 * Math.sin(Math.PI * (t - 4.74) / 1.16) : tip[1] - 30, s: 0.8, dir: 1, fly, flap: t * 22, col: C.red }); }
  if (k7in(t, 12.6, 22.04)) { const hops = [[12.98, 260, 340], [13.45, 340, 420], [13.92, 420, 500]]; let x = 260, lift = 0, sq = 0; for (const [a, x0, x1] of hops) { if (t >= a) { const r = hop(t, a, 0.42, x0, x1, 30); x = r[0]; lift = r[1]; } } if (t < 12.98) x = kfn(t, [[12.6, 180], [12.98, 260]]);
    const wash = k7in(t, 14.6, 16.4); hare(ctx, { x, y: 468 - lift, s: 0.55, dir: 1, ears: 1, raise: wash ? 0.8 + 0.2 * Math.sin(t * 14) : 0, lid: wash ? 0.6 : 0.3, earWig: wash ? Math.sin(t * 14) : 0 }); }
  k7people(ctx, t);
  k7waterLive(ctx, t, cam);
  // pond weeds and nook weeds behind the fish in the nook
  k7weeds(ctx, 1965, 1160, t, k7in(t, 77.5, 78.6) ? pulse(t, 77.5, 1.1) : 0, 8);
  // crumbs (S2)
  if (k7in(t, 27.36, 32.2)) { const y = (x0) => K.lerp(520, 800, K7B(t, 27.4, 1.3, 'out')); if (t < 31.5) k7crumb(ctx, 430, y(430) + 4 * Math.sin(t * 3)); if (t < 31.62) k7crumb(ctx, 690, y(690) + 4 * Math.sin(t * 3 + 1)); }
  // the shadow passing over (S2)
  if (k7in(t, 23.9, 24.9)) halftoneShadow(ctx, K.lerp(-100, 900, (t - 23.9) / 1.0), 760, 150, 0.55 * Math.sin(Math.PI * (t - 23.9) / 1.0));
  // the men's shadow over the fish (S3)
  if (k7in(t, 49.4, 51.4)) halftoneShadow(ctx, 600, 620, 170, 0.45 * K7B(t, 49.4, 0.4) * k7fo(t, 51.4, 0.4));
  // bubbles and idle business
  if (k7in(t, 3.36, 6.0)) { const u = K7B(t, 3.36, 2.5, 'in'); if (u < 1) k7bubble(ctx, 450 + 6 * Math.sin(t * 5), K.lerp(1060, 506, u), 9); }
  k7bubbles(ctx, t, 18.9, 20.6, (te) => { const f = k7f3(te); return [f.x + 30, f.y - 30]; }, { rate: 3, r: 6 });
  k7bubbles(ctx, t, 103.6, 125.4, (te) => [640, 1020], { rate: 1.2, r: 6, life: 4 });
  k7bubbles(ctx, t, 69.95, 72.9, (te) => { const f = k7f1(te); return [f.x - 80, f.y]; }, { rate: 12, r: 5, life: 1.2, vy: 60 });
  k7bubbles(ctx, t, 114.3, 117.4, (te) => { const f = k7f2(te); return [f.x - 70, f.y]; }, { rate: 10, r: 5, life: 1.2, vy: 60 });
  if (k7in(t, 78.42, 80.5)) k7bubble(ctx, 2040, K.lerp(1080, 760, K7B(t, 78.42, 2.0, 'out')), 14);
  if (k7in(t, 130.6, 132.0)) k7bubble(ctx, 870, K.lerp(560, 510, K7B(t, 130.6, 1.4)), 6);
  if (k7in(t, 157.3, 158.46)) k7bubble(ctx, 560 + 5 * Math.sin(t * 6), K.lerp(1000, 512, K7B(t, 157.3, 1.15, 'in')), 9, 1);
  if (k7in(t, 102.3, 103.6)) { const bop = Math.abs(Math.sin((t - 102.3) * 5)); k7bubble(ctx, 400, 585 - 40 * bop, 14); }
  // fish
  const f1 = k7f1(t), f2 = k7f2(t), f3 = k7f3(t);
  if (t < 155.15 || t < 158.46) k7fish(ctx, f3);
  k7fish(ctx, f1);
  if (!(k7in(t, 140.0, 142.9))) k7fish(ctx, f2);
  if (t >= 18.68 && t < 21.2) { /* nothing more */ }
  // pond weeds in front (Fish 3 shows between the stems)
  k7weeds(ctx, K7WEEDS[0], K7WEEDS[1], t, k7in(t, 152.44, 153.4) ? pulse(t, 152.44, 0.96) : 0, 6);
  k7bigNet(ctx, t);
  // the barrier across the stream mouth (S6 on)
  if (t >= 111.5) { const dr = t < 111.75 ? 0 : t < 112.3 ? 0.5 : 1, bul = k7in(t, 117.45, 118.5) ? 40 * Math.exp(-(t - 117.45) * 5) * Math.cos((t - 117.45) * 22) : k7in(t, 119.35, 119.9) ? 20 * Math.exp(-(t - 119.35) * 6) : k7in(t, 119.95, 120.5) ? 12 * Math.exp(-(t - 119.95) * 6) : k7in(t, 120.6, 121.1) ? 6 : 0;
    k7barrier(ctx, dr + (t < 112.3 && t > 111.75 ? 0 : 0), K7B(t, 112.4, 0.3, 'out'), bul, k7f2(t).y); }
  k7front(ctx);
  // Fish 2 on the bank and in the air (in front of everything)
  if (k7in(t, 140.0, 142.9)) k7fish(ctx, f2);
  // surface, lily pads, reeds, leaf, ripples
  const jolt = kick(t, K7FALLS, 3, 11, 9);
  for (const [x, r, ph] of [[250, 52, 0], [520, 62, 1.7], [720, 46, 3.1]]) k7lilyPad(ctx, x, 498 + 3 * Math.sin(t * 2.5 + ph) + jolt * (x / 600) - 4 * K7B(t, 158.0, 0.4) * 0, r, 0.04 * Math.sin(t * 1.6 + ph));
  k7surface(ctx, t);
  k7reeds(ctx, 150, 4, t, 5.9, 3);
  if (k7in(t, 13.0, 22.04)) { ctx.save(); ctx.globalAlpha *= K7B(t, 14.34, 0.4); k7cobweb(ctx, 180, 452, 30); ctx.restore(); }
  if (k7in(t, 9.0, 13.2)) { const lx = kfn(t, [[9.08, 1680], [10.0, 1400], [10.9, 1120], [11.6, 930], [12.6, 780]], 'lin'); k7leaf(ctx, lx, 496, t * (lx < 1330 && lx > 910 ? 3 : 1)); }
  for (const f of K7FALLS) if (t > f.t && t < f.t + 1.4) ripple(ctx, f.x, 503, f.t, t, 0.7);
  if (k7in(t, 5.9, 7.4)) ripple(ctx, 450, 503, 5.9, t, 0.8);
  if (k7in(t, 21.4, 22.04)) ripple(ctx, 590, 503, 21.4, t, 0.7);
  for (const h of K7HITS) if (k7in(t, h, h + 1.4)) ripple(ctx, 915, 503, h, t, 0.6);
  if (k7in(t, 132.5, 134.0)) ripple(ctx, 812, 503, 132.5, t, 0.8);
  if (k7in(t, 138.7, 140.3)) for (const d of [138.75, 139.15, 139.5]) ripple(ctx, K7AX(d) + K7REACH, 503, d, t, 0.4);
  if (k7in(t, 143.9, 145.4)) k7splash(ctx, 1610, 500, t - 143.9);
  if (k7in(t, 145.5, 147.0)) ripple(ctx, 1380, 503, 145.5, t, 0.6);
  if (k7in(t, 156.5, 158.46)) { ripple(ctx, 560, 503, 156.5, t, 1.2); ripple(ctx, 560, 503, 156.9, t, 0.9); }
  if (k7in(t, 158.38, 158.46 + 1.4)) ripple(ctx, 600, 503, 158.38, t, 0.5);
  // time-of-day tint over the world
  if (d.night > 0.01) { ctx.save(); ctx.globalAlpha = 0.33 * d.night; ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, K7W, K7H); ctx.restore(); }
  if (d.warm > 0.01) { ctx.save(); ctx.globalAlpha = 0.12 * d.warm; ctx.fillStyle = '#ff9a2a'; ctx.fillRect(0, 0, K7W, K7H); ctx.restore(); }
}

// ---------- camera ----------
const K7CAM = [
  [0, { x: 540, y: 720, zoom: 1.4 }], [2.8, { x: 540, y: 720, zoom: 1.4 }], [5.4, { x: 500, y: 615, zoom: 1.0 }], [6.3, { x: 500, y: 615, zoom: 1.0 }], [8.6, { x: 1700, y: 615, zoom: 1.0 }], [9.1, { x: 1700, y: 615, zoom: 1.0 }],
  [10.9, { x: 1120, y: 520, zoom: 1.9 }], [12.6, { x: 500, y: 615, zoom: 1.0 }], [13.0, { x: 500, y: 615, zoom: 1.0 }], [14.0, { x: 560, y: 400, zoom: 1.5 }], [16.5, { x: 560, y: 400, zoom: 1.5 }], [17.6, { x: 500, y: 800, zoom: 1.45 }], [22.03, { x: 500, y: 800, zoom: 1.45 }],
  [22.04, { x: 330, y: 900, zoom: 1.8 }], [27.29, { x: 330, y: 900, zoom: 1.8 }], [27.3, { x: 560, y: 760, zoom: 1.8 }], [32.21, { x: 560, y: 760, zoom: 1.8 }], [32.22, { x: 470, y: 960, zoom: 1.8 }], [35.98, { x: 470, y: 960, zoom: 1.8 }],
  [37.8, { x: 500, y: 780, zoom: 1.2 }], [42.53, { x: 500, y: 760, zoom: 1.25 }], [42.54, { x: 500, y: 615, zoom: 1.0 }], [44.5, { x: 500, y: 615, zoom: 1.0 }], [45.9, { x: 720, y: 420, zoom: 1.4 }], [47.3, { x: 630, y: 420, zoom: 1.5 }], [48.9, { x: 560, y: 420, zoom: 1.5 }], [49.6, { x: 560, y: 420, zoom: 1.5 }],
  [50.4, { x: 540, y: 600, zoom: 1.15 }], [53.9, { x: 540, y: 600, zoom: 1.15 }], [54.6, { x: 600, y: 430, zoom: 1.45 }], [57.9, { x: 600, y: 430, zoom: 1.45 }], [59.2, { x: 480, y: 780, zoom: 1.9 }], [63.4, { x: 480, y: 780, zoom: 1.9 }],
  [65.0, { x: 470, y: 740, zoom: 2.0 }], [69.9, { x: 470, y: 740, zoom: 2.0 }], [71.3, { x: 900, y: 560, zoom: 2.0 }], [71.7, { x: 1120, y: 530, zoom: 2.4 }], [72.9, { x: 1250, y: 530, zoom: 2.4 }], [75.6, { x: 1700, y: 615, zoom: 1.0 }],
  [75.8, { x: 1700, y: 615, zoom: 1.0 }], [78.4, { x: 1900, y: 1000, zoom: 1.7 }], [81.1, { x: 1900, y: 1000, zoom: 1.7 }], [81.5, { x: 800, y: 640, zoom: 1.6 }], [84.2, { x: 800, y: 640, zoom: 1.6 }], [84.9, { x: 850, y: 560, zoom: 1.6 }], [88.9, { x: 850, y: 560, zoom: 1.6 }], [90.0, { x: 520, y: 760, zoom: 1.4 }],
  [92.58, { x: 520, y: 760, zoom: 1.4 }], [93.5, { x: 360, y: 700, zoom: 1.75 }], [99.9, { x: 360, y: 700, zoom: 1.75 }], [100.5, { x: 400, y: 660, zoom: 1.5 }], [102.05, { x: 400, y: 660, zoom: 1.5 }], [103.0, { x: 500, y: 640, zoom: 1.05 }], [103.59, { x: 500, y: 640, zoom: 1.05 }], [103.6, { x: 500, y: 615, zoom: 1.0 }],
  [107.2, { x: 500, y: 615, zoom: 1.0 }], [108.2, { x: 420, y: 430, zoom: 1.4 }], [110.0, { x: 420, y: 430, zoom: 1.4 }], [111.5, { x: 960, y: 500, zoom: 1.6 }], [113.1, { x: 960, y: 500, zoom: 1.6 }], [113.9, { x: 560, y: 760, zoom: 1.5 }],
  [114.3, { x: 560, y: 760, zoom: 1.5 }], [115.2, { x: 680, y: 690, zoom: 1.6 }], [117.2, { x: 840, y: 590, zoom: 1.9 }], [119.6, { x: 840, y: 590, zoom: 1.9 }], [120.3, { x: 640, y: 680, zoom: 1.2 }], [121.07, { x: 640, y: 680, zoom: 1.2 }],
  [124.4, { x: 840, y: 580, zoom: 2.5 }], [125.4, { x: 840, y: 575, zoom: 2.5 }], [131.6, { x: 830, y: 560, zoom: 2.3 }], [132.6, { x: 830, y: 500, zoom: 2.0 }], [133.9, { x: 830, y: 500, zoom: 2.0 }], [134.6, { x: 880, y: 430, zoom: 1.5 }],
  [137.9, { x: 880, y: 430, zoom: 1.5 }], [139.9, { x: 1400, y: 440, zoom: 1.5 }], [140.9, { x: 1420, y: 450, zoom: 1.6 }], [141.6, { x: 1450, y: 450, zoom: 2.2 }], [142.9, { x: 1450, y: 450, zoom: 2.2 }], [143.7, { x: 1450, y: 480, zoom: 1.3 }], [145.15, { x: 1450, y: 480, zoom: 1.3 }], [146.2, { x: 1680, y: 720, zoom: 1.3 }],
  [146.6, { x: 1680, y: 720, zoom: 1.3 }], [147.0, { x: 500, y: 700, zoom: 1.15 }], [149.4, { x: 500, y: 700, zoom: 1.15 }], [149.9, { x: 700, y: 790, zoom: 1.6 }], [151.66, { x: 700, y: 790, zoom: 1.6 }], [152.15, { x: 500, y: 960, zoom: 2.0 }], [152.95, { x: 500, y: 960, zoom: 2.0 }],
  [153.45, { x: 545, y: 760, zoom: 2.35 }], [154.84, { x: 545, y: 760, zoom: 2.35 }], [155.4, { x: 560, y: 700, zoom: 1.4 }], [156.3, { x: 560, y: 700, zoom: 1.4 }], [157.15, { x: 560, y: 640, zoom: 1.4 }],
  [157.5, { x: 500, y: 760, zoom: 1.2 }], [158.46, { x: 500, y: 760, zoom: 1.2 }], [158.47, { x: 1750, y: 800, zoom: 1.5 }], [161.4, { x: 1750, y: 850, zoom: 1.5 }], [162.2, { x: 1800, y: 960, zoom: 1.9 }], [163.4, { x: 1800, y: 960, zoom: 1.9 }],
  [167.9, { x: 1700, y: 615, zoom: 1.0 }], [K7DUR, { x: 1700, y: 615, zoom: 1.0 }],
];
const k7camAt = (t) => { const c = K.camAt(K7CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, K7W - 500 / z), y: K.clamp(c.y, 615 / z, K7H - 615 / z), zoom: z }; };
const k7toP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
