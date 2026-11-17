// ===== AN-124 cast: one pose function per character (world camp: ground y 900; returns null when off stage) =====
const MT_U_WED = { sash: C.red, jewel: C.red };
const MT_GROOM_PAL = { robe: MT_GREEN, dot: '#2b7a38', hc: C.yellow, hd: C.red, sash: C.yellow, trim: C.yellow };
const MT_FATHER_PAL = { cape: NAVY, capeDot: '#2a4fae', robe: C.paper, dot: '#d9c9a0' };
const MT_S1_PAL = { robe: C.yellow, dot: C.red, head: 'smallTurban', hc: C.white, hd: C.red };
const MT_POET_PAL = { patches: C.blue };
const MT_FAR = [1500, 840];

// ---------- Umaymah ----------
const MT_UX = mtKX([[0, 640], [13.6, 700, 0.5], [20.25, 630, 0.6], [21.54, 700, 0.01], [54.9, 860, 0.01], [130.4, 860, 0.4], [153.4, 700, 1.0], [156.7, 875, 1.1]]);
const mtUSit = (t) => (t < 21.54 ? 0 : t < 30.1 ? 1 : t < 54.9 ? 0 : t < 158.4 ? mtSit(t, [[0, 1], [129.9, 0]]) : mtSit(t, [[0, 0], [158.47, 1]]));
function mtUma(t) {
  if (t < 9.1) return null;
  const P = { s: 0.96, costume: 'lady', dir: 1, seed: 11, y: 900, ...mtWalk(MT_UX, t, 13) };
  if (t >= 54.9) P.pal = MT_U_WED;
  P.sit = mtUSit(t); if (P.sit > 0) { P.seat = 'bench'; P.amp = 0; }
  const H = (keys) => mtTr(t, keys, 0.25);
  if (t < 21.54) {   // S2: the wait at the post
    P.sq = breathe(t, 2) * (mtIn(t, 11.8, 12.7) ? 1 - 0.02 * Math.abs(Math.sin((t - 11.8) * 7)) : 1) * (mtIn(t, 13.4, 14.2) ? 1.04 : 1);
    P.gaze = mtLookPlan(t, P, [[9.1, [1300, 830]], [9.6, [1450, 840]], [10.0, [1250, 820]], [10.9, [566, 716]], [11.9, [1400, 840]], [12.75, [1550, 830]], [13.0, [K.lerp(1550, 250, mtB(t, 12.7, 2.5, 'lin')), 820]], [15.3, [1500, 840]], [19.7, [330, 700]], [20.1, [1500, 840]]], 0.07);
    P.handL = H([[0, mtLoc(P, [566, 760])], [11.8, mtMir(MTH.clasp)], [12.75, [-36, -62]], [20.3, mtLoc(P, [568, 735])]]);
    const scr = mtIn(t, 10.9, 11.9) ? 8 * Math.sin(Math.PI * K.clamp((t - 11.1) / 0.5)) : 0;
    P.handR = H([[0, MTH.brow], [10.85, mtLoc(P, [570, 706 + scr])], [11.8, MTH.clasp], [13.55, [60, -170]], [14.4, [62, -150], 0.4], [14.9, MTH.rest, 0.5], [20.3, MTH.rest]]);
    if (mtIn(t, 10.85, 11.9)) P.handR = mtLoc(P, [570, 706 + scr]);
    P.lid = mtLid(t, mtIn(t, 10.9, 11.9) ? 0.3 : t > 15.2 ? 0.45 : 0, 11);
    if (mtIn(t, 19.7, 20.2)) P.lid = 1;
    P.mouth = t > 15.2 ? 'frown' : 'closed'; P.drop = t > 14.4 ? 6 * mtB(t, 14.4, 0.6) : 0; P.tip = t > 15.2 ? -0.04 : 0; P.look = mtIn(t, 19.6, 20.2) ? -1 : 0;
    P.wet = t > 20.2;
    return P;
  }
  if (t < 30.1) {   // S3: the scroll and the refusal (seated at the tent mouth)
    P.x = 700; P.sq = breathe(t, 2) * (mtIn(t, 23.3, 24.6) ? 1.02 : 1);
    const toChest = mtB(t, 23.3, 0.4);
    P.handL = H([[0, [-14, -88]], [23.3, [-4, -122]], [27.6, [-8, -118]]]);
    P.handR = H([[0, [26, -86]], [23.3, [10, -124]], [27.62, [70, -150], 0.15], [29.6, [12, -120], 0.5]]);
    P.gaze = mtLookPlan(t, P, [[21.5, [700, 880]], [26.7, [950, 700]], [27.65, [600, 720]], [28.3, [700, 880]], [29.4, [940, 720]]], 0.1);
    P.lid = mtIn(t, 23.4, 23.95) ? 1 : mtIn(t, 27.7, 28.2) ? 1 : mtLid(t, t < 23.3 ? 0.25 : 0, 11);
    P.mouth = mtIn(t, 22.2, 26.6) ? 'smile' : t > 27.6 ? 'closed' : 'closed';
    P.tip = mtIn(t, 23.3, 24.6) ? -0.05 * mtB(t, 23.3, 0.3) : t > 27.6 && t < 27.67 ? 0.03 : t >= 27.67 ? -0.1 * mtB(t, 27.67, 0.2) * (1 - mtB(t, 29.6, 0.5)) : 0;
    P.look = t >= 27.67 ? -1 * (1 - mtB(t, 29.4, 0.4)) : 0;
    P.scroll = { side: toChest > 0.5 ? 'chest' : 'lap', open: K.clamp((t - 21.6) / 0.8) };
    return P;
  }
  if (t < 54.9) {   // S4-S5: boxed in by family, the nod
    P.x = 700; P.sq = breathe(t, 2) * (mtIn(t, 47.6, 50.8) ? 0.94 + 0.06 * mtB(t, 50.8, 0.5) : 1);
    P.gaze = mtLookPlan(t, P, [[30.1, [700, 880]], [30.4, [600, 700]], [31.4, [820, 700]], [31.75, [600, 690]], [33.5, [640, 760]], [35.9, [815, 700]], [36.7, [1100, 720]], [37.6, [1450, 820]], [40.4, [700, 880]], [41.6, [566, 690]],
      [43.5, [700, 880]], [43.9, [900, 720]], [44.6, [1010, 720]], [45.2, [1120, 700]], [46.0, [700, 860]], [51.6, [700, 860]], [52.42, [1500, 840]], [53.8, [700, 860]]], 0.08);
    P.handL = H([[0, [-14, -96]], [47.6, [-10, -110]], [53.9, [-14, -96]]]);
    P.handR = H([[0, [36, -62]], [35.9, mtLoc(P, [768, 790])], [37.9, [36, -62]], [52.5, [20, -86]], [53.85, [16, -88]]]);
    P.lid = mtLid(t, mtIn(t, 40.4, 43.5) ? 0.5 : mtIn(t, 47.6, 49.9) ? 0.35 : 0, 11);
    if (mtIn(t, 49.9, 51.6)) P.lid = mtIn(t, 50.1, 51.55) ? 1 : 0.5;
    P.drop = mtIn(t, 49.9, 51.6) ? (t < 50.1 ? -4 * mtB(t, 49.9, 0.12) : -4 + 14 * mtB(t, 50.1, 0.25)) * (1 - mtB(t, 51.3, 0.3)) : mtIn(t, 47.6, 49.9) ? 4 : 0;
    P.wet = (t > 40.4 && t < 43.5) || t > 51.6; P.mouth = t > 30.1 && t < 43.5 ? 'closed' : 'closed';
    P.scroll = t < 43.5 ? { side: 'handL', open: 0 } : { side: 'sash', open: 0 };
    return P;
  }
  // S6-S16: the wedding
  P.sq = breathe(t, 2); const G = MT_GX(t), M = mtPoetX(t);
  if (mtIn(t, 103.6, 105.3)) P.sq = t < 104.1 ? K.lerp(1, 1.04, mtB(t, 103.6, 0.25)) : t < 104.8 ? K.lerp(1.04, 0.95, mtB(t, 104.1, 0.5)) : K.lerp(0.95, 1, mtB(t, 104.8, 0.4));
  if (mtIn(t, 127.5, 129.68)) P.sq = 1.03;
  const plan = [[54.9, [860, 905]], [57.8, [820, 905]], [59.2, [780, 860]], [60.5, [860, 905]], [93.6, [860, 905]], [98.4, [920, 880]], [101.8, [860, 905]], [105.2, [1000, 300]], [108.64, [1000, 360]],
    [111.2, [1050, 420]], [116.4, [880, 860]], [124.88, [M - 10, 680]], [129.9, [M, 690]], [151.3, [M, 700]], [151.8, [M, 740]], [152.3, [M, 690]], [153.4, [560, 700]], [156.7, [M, 700]], [158.9, [900, 760]], [160.6, [800, 900]], [161.0, [700, 1100]],
    [166.74, [860, 960]], [168.18, [M, 690]]];
  P.gaze = mtLookPlan(t, P, plan, mtIn(t, 124.8, 125.2) ? 0.06 : 0.12);
  P.look = mtIn(t, 98.4, 101.6) ? 0.8 : mtIn(t, 124.88, 129.9) ? 0.6 * mtB(t, 124.98, 0.15) : 0;
  P.tip = mtIn(t, 102.6, 105.2) ? 0.06 * mtB(t, 102.6, 0.4) : mtIn(t, 160.6, 176.2) ? -0.1 * mtB(t, 160.6, 0.6) : 0;
  P.drop = mtIn(t, 63.9, 105.2) ? 6 : mtIn(t, 116.4, 121.8) ? 8 * mtB(t, 116.4, 0.6) : mtIn(t, 166.74, 168.2) ? 6 : 0;
  P.lid = mtLid(t, mtIn(t, 63.9, 105.2) ? 0.5 : mtIn(t, 116.4, 121.8) ? 0.5 : mtIn(t, 105.2, 108.7) ? 0.2 : 0, 11);
  if (mtIn(t, 104.1, 104.8)) P.lid = 1; if (mtIn(t, 98.9, 99.25)) P.lid = 0.9;
  if (mtIn(t, 127.5, 130.0)) { P.lid = 0; P.noBlink = true; P.eyes = 'wide'; }
  P.wet = mtIn(t, 98.4, 160.6);
  P.mouth = mtIn(t, 106.1, 117.9) ? 'closed' : mtIn(t, 127.5, 132.0) ? 'o' : t >= 132.0 ? 'smile' : 'closed';
  P.talk = mtIn(t, 106.1, 117.9) ? (t < 116.4 ? 0.7 : 0.4) * Math.abs(Math.sin(t * 7.3)) : 0;
  if (mtIn(t, 108.7, 116.4)) P.x += 3 * Math.sin(t * 2.6);
  // hands
  const sc = MT_SASH;
  P.handL = H([[0, [-14, -96]], [63.9, [-6, -94]], [105.3, [-14, -126]], [108.7, [-20, -130]], [127.5, [-20, -118]], [129.9, [-40, -110]], [132.0, mtMir(MTH.cheek)], [132.5, [-70, -140]], [134.0, [-30, -100], 0.6],
    [152.4, mtLoc({ ...P }, [K.lerp(860, M, 0.5) - 8, 790])], [153.5, [-36, -62]], [157.85, [-20, -110]], [158.6, [-22, -90]]]);
  P.handR = H([[0, [24, -90]], [63.9, sc], [105.3, [14, -126]], [108.7, [22, -132]], [127.5, [26, -114]], [132.0, MTH.cheek], [132.5, [64, -134]], [134.0, [30, -100], 0.6], [152.4, mtLoc({ ...P }, [K.lerp(860, M, 0.5) + 8, 795])],
    [153.5, [36, -62]], [158.6, [14, -150]], [159.2, [24, -92]]]);
  if (mtIn(t, 153.5, 156.6)) P.handL = H([[153.5, [-36, -62]], [153.9, [-100, -150]], [155.9, [-36, -62]]]);
  if (mtIn(t, 132.0, 132.6)) P.x += tremble(t, 1.2);
  P.scroll = t < 105.3 ? { side: 'sash' } : t < 130.86 ? { side: 'hands', open: 1, slip: mtIn(t, 127.5, 130.86) ? mtB(t, 127.5, 2.4) : 0 } : null;
  return P;
}
const MT_SASH = [22, -86];

// ---------- the poet ----------
const mtPoetX = mtKX([[0, 1405], [73.3, 1420, 0.5], [89.4, 1120, 1.8], [120.0, 1095, 1.2], [130.0, 1000, 1.4], [137.1, 930, 0.5], [146.6, 1000, 1.0], [150.32, 950, 0.95], [153.6, 615, 0.95], [156.7, 740, 0.95]]);
const mtPoetY = (t) => mtTr(t, [[0, 900], [73.3, 900], [89.4, 885, 1.8], [130.0, 898, 1.4], [137.1, 906, 0.5], [146.6, 900, 1.0], [156.7, 902, 0.9]]);
function mtPoet(t) {   // standing poet in the camp (from the dismount)
  if (t < 69.9) return null;
  const P = { s: 1, costume: 'bedouin', age: 0.35, pal: MT_POET_PAL, dir: -1, seed: 21, ...mtWalk(mtPoetX, t, 14), y: mtPoetY(t) };
  const H = (keys) => mtTr(t, keys, 0.25), G = MT_GX(t);
  P.kneel = mtTr(t, [[0, 0], [73.7, 1, 0.45], [85.9, 0, 0.25]]); if (P.kneel > 0) P.amp = 0;
  P.sit = t > 158.3 ? mtSit(t, [[0, 0], [158.3, 1]]) : 0; if (P.sit > 0) { P.seat = 'bench'; P.amp = 0; }
  P.sq = breathe(t, 5) * landSquash(t, 69.95, 0.12);
  if (mtIn(t, 85.9, 86.6)) P.sq = settleTo(t, 85.9, 0.9, 1.06, 0.3, 0.1) * (t > 86.2 ? 0.97 / 1.06 + 0.03 * mtB(t, 86.2, 0.4) : 1);
  if (mtIn(t, 84.8, 85.9)) P.sq = 0.95;
  if (mtIn(t, 87.6, 88.5)) P.sq = K.lerp(0.97, 1, mtB(t, 87.6, 0.9));
  if (mtIn(t, 119.0, 120.0)) P.sq = anticipate(t, 119.0, 1.0, 0.05);
  if (mtIn(t, 159.7, 160.6)) P.sq = K.lerp(1.03, 0.98, mtB(t, 159.7, 0.9));
  // gaze
  const lampSweep = [K.lerp(1350, 620, mtB(t, 70.5, 0.8, 'lin')), 560];
  const plan = [[69.9, [1300, 860]], [70.3, [1350, 560]], [70.5, lampSweep], [71.3, [900, 600]], [73.3, [1355, 820]], [75.4, [860, 640]], [76.2, [1355, 800]], [78.3, [1100, 560]], [79.9, [1180, 560]], [82.5, [1180, 560]],
    [83.1, [1250, 560]], [84.8, [1330, 860]], [85.9, [1200, 700]], [86.8, [700, 560]], [87.1, [400, 820]], [87.4, [860, 400]], [87.6, [1300, 900]], [88.5, [1100, 760]], [89.4, [1050, 900]], [90.3, [860, 720]], [91.3, [1120, 960]], [93.0, [860, 700]],
    [112.5, [860, 690]], [119.0, [860, 690]], [129.9, [880, 690]], [137.08, [775, 700]], [139.5, [775, 680]], [146.2, [400, 760]], [148.6, [875, 690]], [154.5, [562, 690]], [155.6, [470, 600]], [156.6, [870, 700]], [159.7, [860, 700]], [166.0, [1030, 860]], [167.0, [860, 700]]];
  P.gaze = mtLookPlan(t, P, plan, mtIn(t, 86.7, 87.7) ? 0.07 : 0.15);
  if (mtIn(t, 82.46, 83.0)) P.gaze = [0, 0.05];
  if (mtIn(t, 70.3, 71.2) || mtIn(t, 85.9, 86.7) || mtIn(t, 91.2, 92.2) || mtIn(t, 127.0, 129.7)) P.noBlink = true;
  P.eyes = mtIn(t, 70.3, 71.0) || mtIn(t, 85.9, 86.8) || mtIn(t, 93.6, 94.6) ? 'wide' : 'open';
  P.brow = mtIn(t, 70.3, 73.3) ? -0.6 : mtIn(t, 73.3, 78.3) ? -0.3 : mtIn(t, 83.1, 85.9) ? -0.8 : mtIn(t, 85.9, 88.5) ? -0.6 : mtIn(t, 88.5, 93.6) ? 0.3 : mtIn(t, 112.5, 119.0) ? -0.5 : mtIn(t, 154.5, 155.6) ? -0.7 : 0;
  P.mouth = mtIn(t, 72.0, 73.3) ? 'smile' : mtIn(t, 73.3, 78.3) ? 'smile' : mtIn(t, 78.3, 82.4) ? 'smile' : mtIn(t, 83.1, 85.9) ? 'o' : mtIn(t, 85.9, 88.5) ? 'frown' : mtIn(t, 131.6, 150.3) ? 'smile' : mtIn(t, 154.5, 155.6) ? 'o' : t > 155.6 ? 'smile' : 'closed';
  P.wet = mtIn(t, 84.8, 88.6) || mtIn(t, 131.5, 160.0);
  P.lid = mtIn(t, 119.0, 119.6) ? 1 : mtIn(t, 159.7, 176.2) ? mtLid(t, 0.5 * mtB(t, 159.7, 0.4), 21) : mtIn(t, 92.3, 92.7) ? 1 : P.noBlink ? 0 : undefined;
  if (P.lid === undefined) delete P.lid;
  P.drop = mtIn(t, 84.8, 85.9) ? 8 : mtIn(t, 87.6, 88.5) ? 8 * mtB(t, 87.6, 0.4) : mtIn(t, 89.4, 92.2) ? 4 : mtIn(t, 92.2, 92.7) ? 8 : 0;
  P.tip = mtIn(t, 79.9, 82.4) ? 0.08 * mtB(t, 79.9, 0.4) : mtIn(t, 89.4, 91.3) ? 0.06 : mtIn(t, 120.0, 121.8) ? -0.04 : mtIn(t, 142.92, 143.8) ? 0.1 * mtPulse(t, 142.92, 0.8) : mtIn(t, 159.7, 176.2) ? 0.06 * mtB(t, 159.7, 0.6) : 0;
  P.look = mtIn(t, 72.0, 73.3) ? 1 : 0;
  // hands
  const neck = [1385, 800];
  P.handR = H([[0, [36, -62]], [70.0, mtLoc(P, neck)], [70.35, [36, -62]], [72.0, MTH.cupEar], [73.2, [36, -62]], [75.4, [104, -150]], [76.1, [70, -110]], [76.7, [36, -62]], [78.4, MTH.chest], [82.6, MTH.chest], [84.85, [36, -62], 0.6],
    [85.9, [60, -150], 0.15], [87.6, MTH.chest], [88.5, [36, -62]], [112.5, [70, -150], 0.5], [113.5, [60, -120], 0.6], [119.0, [40, -70]], [121.8, [80, -130], 0.4], [123.5, [40, -80], 0.8], [131.54, [24, -150], 0.2], [132.0, [36, -62], 0.4],
    [137.1, [50, -100]], [138.0, [36, -62]], [154.45, mtLoc(P, [566, K.lerp(650, 735, mtB(t, 154.55, 0.9))])], [155.6, [36, -62]], [157.4, [36, -62]]]);
  if (mtIn(t, 82.9, 83.6)) P.handR = [8, -118 + 6 * Math.sin((t - 82.9) * 25)];
  P.handL = H([[0, [-36, -62]], [85.9, [-60, -150], 0.15], [86.8, [-36, -62]], [88.5, [-28, -180], 0.3], [89.4, [-36, -62], 0.4], [130.0, [-36, -62]], [131.54, [-24, -160], 0.15], [131.9, [-36, -62], 0.3],
    [144.9, mtLoc(P, [895, 795])], [146.0, [-30, -100]], [147.0, [-36, -62]], [152.4, mtLoc({ ...P }, [K.lerp(860, mtPoetX(t), 0.5) + 6, 795])], [153.5, [-36, -62]], [157.4, mtLoc(P, [mtPoetX(t) + 70, 790])], [157.9, [-30, -96]], [159.0, [-36, -66]]]);
  if (mtIn(t, 112.5, 114.0)) { P.handR = [70, -150 + tremble(t, 3)]; }
  if (mtIn(t, 153.5, 154.45)) P.handL = [-50, -100];   // led by the hand
  P.cover = t < 88.5 ? 0 : t < 89.4 ? mtB(t, 88.5, 0.9) : t < 117.8 ? 1 : t < 131.54 ? 1 - 0.15 * mtB(t, 117.8, 0.6) : 0.85 * (1 - mtB(t, 131.54, 0.3));
  P.puff = mtIn(t, 122.41, 125.5) ? 3 * Math.abs(Math.sin(t * 8.1)) : 0;
  return P;
}

// ---------- the groom ----------
const MT_GX = (t) => (t < 54.9 ? 1120 : t < 137.0 ? mtTr(t, [[0, 740], [101.72, 775, 0.6]]) : mtTr(t, [[0, 775], [144.44, 700, 0.6], [145.0, 845, 0.45], [146.2, -100, 4.0]]));
const MT_GXW = (t) => mtTr(t, [[0, 775], [144.44, 700, 0.6], [145.0, 845, 0.45]]);
function mtGroomXf(tt) { if (tt < 146.2) return MT_GXW(tt); const u = (tt - 146.2) / 3.9; return 845 - 940 * u; }
function mtGroom(t) {
  if (t < 45.0 || t > 150.2) return null;
  const P = { s: 1, costume: 'merchant', pal: MT_GROOM_PAL, age: 0.3, dir: t < 54.9 || t > 146.2 ? -1 : 1, seed: 31, y: 900 };
  const H = (keys) => mtTr(t, keys, 0.25);
  if (t < 54.9) {   // in the suitors' queue: calm, hands folded
    Object.assign(P, mtWalk(mtKX([[0, 1260], [45.0, 1120, 0.6]]), t, 14)); P.handL = [-14, -108]; P.handR = [14, -108];
    P.mouth = 'smile'; P.gaze = mtLookPlan(t, P, [[45.0, [700, 720]], [47.5, [700, 740]], [52.4, [640, 700]]]);
    if (mtIn(t, 50.8, 51.6)) P.handR = [24, -200];
    P.flower = true; return P;
  }
  P.x = t < 146.2 ? MT_GX(t) : mtGroomXf(t);
  P.sit = t < 137.0 ? 1 : mtSit(t, [[0, 1], [137.0, 0]]); if (P.sit > 0) P.seat = 'bench';
  if (t > 144.4) Object.assign(P, mtWalk(t < 146.2 ? MT_GXW : mtGroomXf, t, 14));
  const U = MT_UX(t), M = mtPoetX(t), beat = mtBeat(t), clap = mtIn(t, 95.4, 101.6) && mtPlaying(t);
  P.sq = breathe(t, 7) * (mtIn(t, 137.8, 138.9) ? K.lerp(0.97, 1, mtB(t, 137.8, 1.0)) : 1) * (t > 137.0 && t < 137.3 ? anticipate(t, 137.0, 0.3, 0.05) : 1);
  const plan = [[54.9, [600, 760]], [59.0, [1110, 760]], [60.0, [860, 720]], [61.0, [400, 820]], [95.4, [400, 830]], [101.7, [860, 720]], [107.3, [860, 700]], [117.8, [800, 860]], [127.5, [860, 690]],
    [132.74, [860, 690]], [133.05, [M, 690]], [133.35, [860, 690]], [133.65, [M, 690]], [135.38, [900, 925]], [136.0, [M, 760]], [136.4, [M, 690]], [139.5, [M, 690]], [140.3, [860, 690]], [141.1, [M, 690]], [145.3, [M, 700]], [146.0, [860, 690]], [146.4, [300, 760]]];
  P.gaze = mtLookPlan(t, P, plan, mtIn(t, 132.7, 133.9) ? 0.07 : 0.15);
  P.mouth = mtIn(t, 54.9, 101.7) ? 'smile' : mtIn(t, 101.7, 103.6) ? 'smile' : mtIn(t, 135.38, 136.4) ? 'o' : mtIn(t, 137.8, 150.3) ? 'smile' : 'closed';
  if (mtIn(t, 95.4, 96.6)) P.talk = 0.6 * Math.abs(Math.sin(t * 9));
  if (mtIn(t, 141.44, 142.6)) P.talk = 0.6 * Math.abs(Math.sin(t * 7.7));
  P.brow = mtIn(t, 101.7, 103.6) ? -0.3 : mtIn(t, 135.38, 136.4) ? -0.7 : mtIn(t, 137.8, 139.5) ? -0.4 : 0;
  P.lid = mtIn(t, 136.4, 137.8) ? mtLid(t, 0.4, 31) : undefined; if (P.lid === undefined) delete P.lid;
  P.tip = mtIn(t, 142.72, 143.8) ? 0.2 * mtPulse(t, 142.72, 1.0) : 0;
  P.look = mtIn(t, 139.5, 141.1) ? Math.sin((t - 139.5) * 9) : 0;
  P.handL = H([[0, clap ? [-6, -120] : [-20, -90]], [59.0, [-20, -90]], [139.5, mtMir(MTH.palm)], [141.1, [-24, -92]], [146.2, [-36, -62]]]);
  P.handR = H([[0, [20, -90]], [59.0, [64, -200]], [59.6, [20, -90]], [101.72, MTH.sash, 0.2], [102.0, [96, -134], 0.5], [105.2, [80, -120]], [107.3, [40, -90], 0.8], [137.08, MTH.sash], [137.8, [50, -120], 0.4], [139.5, MTH.palm], [141.1, MTH.heart],
    [143.9, [36, -62]], [144.44, [96, -140], 0.4], [145.2, mtLoc({ ...P }, [892, 800])], [146.0, [36, -62]], [147.86, [60, -196], 0.25], [148.5, [36, -62], 0.4]]);
  if (clap) { const k = Math.max(0, 1 - beat * 5); P.handL = [-12 - 18 * (1 - k), -120]; P.handR = [12 + 18 * (1 - k), -120]; }
  P.flower = t < 145.3 ? (mtIn(t, 101.72, 107.6) ? 'hand' : mtIn(t, 137.8, 145.3) ? 'hand' : true) : false;
  return P;
}

// ---------- the family and the suitors ----------
function mtFather(t) {
  if (!(mtIn(t, 30.1, 43.5) || mtIn(t, 46.8, 54.9))) return null;
  const xf = t < 43.5 ? mtKX([[0, 380], [30.2, 600, 0.8]]) : mtKX([[0, 470], [46.9, 630, 0.6]]);
  const P = { s: 1, costume: 'bedouin', age: 0.75, pal: MT_FATHER_PAL, dir: 1, seed: 41, y: 900, ...mtWalk(xf, t, 13) };
  P.dir = mtIn(t, 41.3, 43.5) || mtIn(t, 33.5, 34.6) ? -1 : 1;
  P.gaze = mtLookPlan(t, P, [[30.1, [700, 690]], [33.5, [300, 560]], [34.6, [700, 690]], [41.4, [562, 690]], [47.0, [700, 700]], [52.4, [1120, 700]]]);
  P.talk = mtIn(t, 31.7, 33.5) || mtIn(t, 52.5, 54.0) ? 0.7 * Math.abs(Math.sin(t * 8)) : 0; P.brow = t < 43.5 ? 0.2 : 0;
  P.mouth = mtIn(t, 50.86, 54.9) ? 'smile' : 'closed';
  P.look = mtIn(t, 39.82, 40.6) ? Math.sin((t - 39.82) * 12) : 0;
  P.tip = mtIn(t, 47.6, 50.8) ? 0.1 * mtB(t, 47.6, 0.4) : 0;
  P.sq = mtIn(t, 50.86, 51.8) ? 1 + 0.03 * mtPulse(t, 50.86, 0.9) : 1;
  P.handL = mtTr(t, [[0, [-36, -62]], [31.8, [-60, -110]], [32.5, mtMir(MTH.palm)], [33.5, [-36, -62]]]);
  P.handR = [44, -90]; P.stick = 'up';
  if (mtIn(t, 33.5, 34.6)) { P.handR = [92, -140]; P.stick = 'point'; }
  if (t > 41.3 && t < 43.5) { const k = [41.62, 42.12, 42.64].reduce((s, a) => s + mtPulse(t, a - 0.12, 0.3), 0); P.handR = [60 + 6 * k, -112 + 10 * k]; P.stick = 'tally'; P.tap = k; }
  if (mtIn(t, 48.6, 49.5)) { const k = mtPulse(t, 48.66, 0.25) + mtPulse(t, 49.08, 0.25); P.handR = [44, -96 + 8 * k]; P.tap = k; }
  return P;
}
function mtMother(t) {
  if (!(mtIn(t, 30.1, 43.5) || mtIn(t, 47.4, 54.9))) return null;
  const xf = t < 43.5 ? mtKX([[0, 1060], [30.9, 815, 0.9]]) : mtKX([[0, 900], [47.5, 770, 0.6]]);
  const P = { s: 0.95, costume: 'oldWoman', dir: -1, seed: 43, y: 900, ...mtWalk(xf, t, 12) };
  P.gaze = mtLookPlan(t, P, [[30.1, [700, 700]], [36.6, [1100, 720]], [37.7, [1450, 830]], [38.6, [700, 700]], [52.4, [1120, 700]]]);
  P.talk = mtIn(t, 35.9, 36.6) ? 0.4 * Math.abs(Math.sin(t * 8)) : mtIn(t, 52.5, 54.0) ? 0.5 * Math.abs(Math.sin(t * 7)) : 0;
  P.mouth = mtIn(t, 50.86, 54.9) ? 'smile' : 'closed';
  P.tip = mtIn(t, 47.6, 50.8) ? 0.1 * mtB(t, 47.6, 0.4) : 0;
  const reach = PERSON_HANDS.reachBoth;
  P.handL = mtTr(t, [[0, reach.L], [32.2, [-36, -70]], [35.9, mtLoc(P, [760, 792])], [36.6, mtLoc(P, [900, 700])], [37.9, mtLoc(P, [1150, 690]), 1.2], [39.0, [-36, -62]], [50.86, [-8, -120], 0.15], [51.2, mtLoc(P, [720, 760])]]);
  P.handR = mtTr(t, [[0, reach.R], [32.2, [36, -70]], [35.9, mtLoc(P, [772, 796])], [36.6, mtLoc(P, [770, 792])], [39.0, [36, -62]], [50.86, [8, -120], 0.15], [51.2, [36, -62]]]);
  if (mtIn(t, 50.86, 51.2)) { const k = Math.abs(Math.sin((t - 50.86) * 18)); P.handL = [-8 - 14 * k, -120]; P.handR = [8 + 14 * k, -120]; }
  return P;
}
function mtSuitor1(t) {
  if (!(mtIn(t, 26.5, 30.1) || mtIn(t, 43.6, 54.9))) return null;
  const P = { s: 1, costume: 'prince', pal: MT_S1_PAL, dir: -1, seed: 51, y: 900 };
  if (t < 30.1) {
    Object.assign(P, mtWalk(mtKX([[0, 1120], [26.6, 900, 0.8], [29.35, 960, 0.35], [29.75, 1010, 0.35]]), t, 13));
    P.tip = mtIn(t, 27.3, 27.7) ? 0.12 * mtPulse(t, 27.3, 0.5) : t > 29.3 ? 0.06 : 0; P.mouth = t < 28.6 ? 'smile' : t < 28.9 ? 'o' : 'frown'; P.brow = t < 28.6 ? -0.4 : -0.6;
    P.drop = t > 29.3 ? 6 : 0; P.gaze = mtLookPlan(t, P, [[26.6, [700, 730]], [28.7, [900, 820]], [29.3, [700, 740]]]);
    const droop = mtB(t, 28.6, 0.5); P.handL = [-28 + 0 * droop, -112 + 14 * droop]; P.handR = [28, -112 + 14 * droop]; P.gift = { kind: 'necklace', droop }; return P;
  }
  const [hx, hy] = hop(t, 43.7, 0.4, 990, 900, 34); P.x = hx; P.y = 900 - hy; P.sq = landSquash(t, 44.1, 0.14) * anticipate(t, 43.6, 0.1, 0.08);
  P.mouth = 'smile'; P.handL = [-28, -112]; P.handR = [28, -112]; P.gift = { kind: 'necklace', droop: 0 };
  P.gaze = mtLookPlan(t, P, [[43.6, [700, 730]], [47.5, [700, 760]]]); if (mtIn(t, 50.8, 51.6)) P.handR = [26, -200];
  return P;
}
function mtSuitor2(t) {
  if (!mtIn(t, 44.4, 54.9)) return null;
  const P = { s: 1, costume: 'merchant', dir: -1, seed: 53, y: 900 };
  const [hx, hy] = hop(t, 44.5, 0.4, 1090, 1010, 30); P.x = hx; P.y = 900 - hy; P.sq = landSquash(t, 44.9, 0.14);
  P.brow = 0.3; P.mouth = 'closed'; P.look = mtIn(t, 45.0, 46.4) ? -1 : 0;
  P.gaze = mtLookPlan(t, P, [[44.5, [700, 730]], [45.0, [900, 700]], [46.4, [700, 740]]]);
  P.handL = [-34, -118]; P.handR = [30, -118]; P.gift = { kind: 'bolt' };
  P.raiseFoot = mtIn(t, 45.0, 46.4) ? Math.abs(Math.sin((t - 45.0) * 9)) : 0; P.y -= 3 * P.raiseFoot;
  if (mtIn(t, 50.8, 51.6)) P.handR = [26, -200];
  return P;
}
function mtGossips(t) {
  if (!mtIn(t, 9.1, 21.54)) return [];
  const A = { x: 265, y: 900, s: 1, costume: 'villager', pal: { robe: '#8a501a', dot: '#5b3010' }, dir: 1, seed: 61 }, B = { x: 385, y: 900, s: 1, costume: 'beanSeller', age: 0.5, dir: -1, seed: 63 };
  A.gaze = mtLookPlan(t, A, [[9.1, [390, 690]], [17.6, [640, 700]], [17.85, [390, 690]], [18.6, [640, 700]], [18.8, [390, 690]]], 0.07);
  B.gaze = mtLookPlan(t, B, [[9.1, [300, 690]], [18.3, [300, 700]], [19.0, [345, 560]]]);
  A.tip = mtIn(t, 17.3, 19.0) ? 0.1 * mtB(t, 17.3, 0.3) : 0; A.handR = mtIn(t, 17.3, 19.0) ? PERSON_HANDS.cupMouth.R : [36, -62]; A.brow = mtIn(t, 17.3, 19.0) ? -0.5 : 0;
  B.handR = mtIn(t, 18.1, 21.6) ? MTH.chin : [36, -62]; B.drop = 4 * mtPulse(t, 18.17, 0.4) + 4 * mtPulse(t, 18.6, 0.4); B.look = mtIn(t, 18.9, 19.6) ? Math.sin((t - 18.9) * 12) : 0;
  return [A, B];
}

// ---------- the feast: drummers, guests, children ----------
function mtDrummer(t, i) {
  if (t < 57.7) return null;
  const x0 = MT_CAMP.drum[i], t0 = 57.82 + i * 0.27, xf = mtKX([[0, x0 - 260 - i * 60], [t0, x0, 0.75]]);
  const P = { s: 1, costume: i ? 'villager' : 'servant', age: i ? 0.55 : 0.15, dir: 1, seed: 71 + i, y: 900, ...mtWalk(xf, t, 13) };
  P.sit = mtTr(t, [[0, 0], [t0 + 0.75, 1, 0.3]]); if (P.sit > 0) { P.seat = 'floor'; P.amp *= 1 - P.sit; }
  P.sq = landSquash(t, t0 + 1.05, 0.08);
  const off = i ? 0.2 : 0, play = mtPlaying(t) && !mtIn(t, 166.74, 167.3) && t < 107.3 + i * 0.25 || t >= 163.32, sb = mtBeat(t, off);
  const k = play ? Math.max(0, 1 - sb * 6) : 0, lift = play ? K.clamp(sb * 5) : 0;
  P.hit = k; const dx = 34;
  P.handR = play ? [dx + 6, -78 - 26 * lift + 20 * k] : t > 107.3 ? [dx + 4, -76] : [30, -70];
  P.handL = play ? [dx - 18, -78 - 20 * (1 - lift)] : t > 107.3 ? [dx - 22, -74] : [-30, -70];
  if (t >= 162.0 && t < 163.32) { P.handR = [dx + 8, -126]; P.handL = [dx - 20, -126]; }
  P.drop = play ? 3 * Math.sin((t + off) / 0.4 * Math.PI) : 0;
  const U = [860, 700], M = mtPoetX(t);
  P.gaze = mtLookPlan(t, P, [[57.8, [700, 860]], [62.4, [P.x + 40, 860]], [107.3 + i * 0.17, U], [123.3 + 0.13 * (2 + i), [M, 690]], [127.0, U], [146.2, [400, 760]], [148.6, [860, 700]], [163.3, [P.x + 40, 860]]]);
  if (i === 0 && mtIn(t, 138.98, 139.6)) P.handL = [-10, -200];
  if (i === 1 && mtIn(t, 147.2, 147.9)) P.handR = [40, -170];
  P.tip = mtIn(t, 137.08, 138.98) ? -0.08 * mtB(t, 137.08 + i * 0.13, 0.3) : 0;
  return P;
}
function mtGuest(t, i) {   // 0: guestA (carpenter), 1: the singer
  if (t < 58.6) return null;
  const x0 = i ? MT_CAMP.guests[1] : mtTr(t, [[0, MT_CAMP.guests[0]], [90.2, 1050, 0.6]]), t0 = 58.7 + i * 0.2, xf = (tt) => (tt < t0 + 0.7 ? K.lerp(1460 + i * 60, x0, K.ease.out(K.clamp((tt - t0) / 0.7))) : i ? x0 : mtTr(tt, [[0, MT_CAMP.guests[0]], [90.2, 1050, 0.6]]));
  const P = { s: 1, costume: i ? 'villageWoman' : 'carpenter', dir: -1, seed: 81 + i, y: 900, ...mtWalk(xf, t, 13) };
  P.sit = mtTr(t, [[0, 0], [t0 + 0.7, 1, 0.3]]); if (P.sit > 0) { P.seat = 'floor'; P.amp *= 1 - P.sit; }
  const U = [860, 700], M = [mtPoetX(t), 690], b = mtBeat(t, 0.1 + i * 0.07), play = mtPlaying(t) && t < 107.3 || t >= 163.32;
  P.gaze = mtLookPlan(t, P, [[58.6, [740, 720]], [62.4, [430, 840]], [91.28, i ? M : [430, 840]], [92.3, [430, 840]], [107.3 + (2 + i) * 0.17, U], [123.3 + i * 0.13, M], [127.0, U], [146.2, [400, 760]], [148.6, [860, 700]], [163.3, [430, 840]]], 0.12);
  P.tip = mtIn(t, 137.08, 138.98) ? 0.08 * mtB(t, 137.08 + (2 + i) * 0.13, 0.3) : 0;
  if (i === 0) { if (mtIn(t, 59.0, 59.6)) P.handR = [64, -196 + 8 * Math.sin(t * 20)]; else if (play) { const k = Math.max(0, 1 - b * 5); P.handL = [-12 - 16 * (1 - k), -118]; P.handR = [12 + 16 * (1 - k), -118]; } P.drop = play ? 3 * Math.abs(Math.sin((t + 0.13) / 0.4 * Math.PI)) : 0; }
  else {
    const sing = mtIn(t, 61.7, 107.3) || t > 162.0; P.mouth = sing ? 'open' : 'closed'; P.lid = sing && mtIn(t, 61.7, 63.0) ? 0.8 : undefined; if (P.lid === undefined) delete P.lid;
    P.handR = mtIn(t, 61.7, 63.0) ? MTH.chest : play ? [14 + 14 * (1 - Math.max(0, 1 - b * 5)), -118] : [36, -62]; P.handL = play && !mtIn(t, 61.7, 63.0) ? [-14 - 14 * (1 - Math.max(0, 1 - b * 5)), -118] : [-36, -62];
    if (mtIn(t, 91.28, 92.3)) { P.look = 1; P.handL = [-36, -62]; P.handR = [36, -62]; } if (mtIn(t, 92.2, 92.6)) P.sq = 1 + 0.05 * mtPulse(t, 92.2, 0.4);
    if (mtIn(t, 162.0, 163.3)) { P.aL = [-2.5, -2.8]; P.aR = [2.5, 2.8]; P.sq = 1.03; }
    P.tilt = mtIn(t, 61.7, 63.0) ? -0.15 : 0;
  }
  if (mtIn(t, 166.74, 167.3)) { P.handL = [-20, -100]; P.handR = [20, -100]; }
  return P;
}
function mtKid(t, i) {   // 0: the boy (bold, nearer the poet), 1: the girl (shy, sharp)
  if (t < 73.3) return null;
  const x0 = i ? 1300 : 1355, xf = mtKX([[0, x0], [i ? 74.4 : 99, i ? 1318 : x0, 0.4], [165.9, i ? 1000 : 1060, 0.9]]);
  const P = { s: 1, child: true, costume: i ? 'maiden' : 'servant', dir: 1, seed: 91 + i, y: 900, ...mtWalk(xf, t, 10) };
  const M = mtHead(mtPoet(Math.max(t, 70)) || { x: 1420, y: 900, s: 1 }), U = [860, 700];
  if (t < 73.3) P.gaze = lookAt(mtHead(P), [1352, 880 - 30 * Math.abs(Math.sin(t * 3))]);
  else P.gaze = mtLookPlan(t, P, i ? [[73.3, M], [79.9, [1180, 560]], [80.3, M], [80.7, [1180, 560]], [81.1, M], [84.8, M], [166.0, [930, 700]], [166.6, [1040, 760]], [168.0, U]] : [[73.3, M], [78.3, [1180, 560]], [84.3, [1300, 790]], [84.6, M], [166.0, U]], 0.08);
  if (i === 0) { P.mouth = mtIn(t, 77.1, 78.4) ? 'open' : mtIn(t, 75.5, 79.0) ? 'smile' : 'smile'; P.talk = mtIn(t, 77.1, 78.2) ? 0.9 * Math.abs(Math.sin(t * 9)) : 0; P.handL = mtIn(t, 77.1, 78.3) ? mtMir(PERSON_HANDS.cupMouth.R) : [-36, -62]; P.handR = mtIn(t, 77.1, 78.3) ? PERSON_HANDS.cupMouth.R : [36, -62];
    P.y -= [77.14, 77.6, 78.08].reduce((s, a) => s + 16 * mtPulse(t, a, 0.3), 0); P.drop = mtIn(t, 74.3, 77) ? -4 : 0;
    if (mtIn(t, 84.6, 85.2)) { P.look = -1; P.handL = [-50, -110]; } }
  else { P.lid = mtIn(t, 74.3, 79.8) ? mtLid(t, 0.3, 92) : undefined; if (P.lid === undefined) delete P.lid; P.handL = mtIn(t, 74.3, 79.0) ? MTH.chin.map((v, k) => (k ? v : -v)) : [-36, -62];
    if (mtIn(t, 84.22, 85.4)) { P.handR = mtLoc(P, [1340, 830]); P.handL = mtLoc(P, M); P.y -= 6 * mtPulse(t, 84.22, 0.3); }
    if (mtIn(t, 165.9, 166.6)) { P.handR = mtLoc(P, M); P.drop = 6 * mtPulse(t, 166.2, 0.35); } }
  if (t > 166.0) { const ph = (t - 166.0) * 4.2 + i * 1.3; P.y -= Math.abs(Math.sin(ph)) * 14; if (!(i && mtIn(t, 165.9, 166.6))) { P.aL = [-2.3 - 0.2 * Math.sin(ph), -2.7]; P.aR = [2.3 + 0.2 * Math.cos(ph), 2.7]; } P.mouth = 'smile'; }
  if (mtIn(t, 166.74, 167.3)) { P.y = 900; delete P.aL; delete P.aR; }
  return P;
}
function mtBall(t) {   // the children's ball: bounces between them, rolls to a stop at 74.0
  if (t < 73.3 || t > 165.9) return null;
  return [mtTr(t, [[0, 1328], [73.3, 1385, 0.7]]), 890 - 30 * mtPulse(t, 73.3, 0.35)];
}

// ---------- the camel in the camp ----------
const MT_CAMELX = mtKX([[0, 1700], [66.3, 1470, 2.8]]);
function mtCamelCamp(t) {
  if (t < 65.04) return null;
  const P = { s: 0.7, dir: -1, pal: 0, saddle: true, seed: 101, ...mtWalk(MT_CAMELX, t, GAIT.camel * 0.7) };
  P.amp = Math.min(P.amp, 0.5);
  P.y = 900 + K.clamp((P.x - 1480) / 200) * 230;
  P.kneel = mtTr(t, [[0, 0], [69.1, 1, 0.9]]); P.neck = mtIn(t, 66.3, 69.1) ? -0.1 : 0.2;
  P.talk = mtIn(t, 69.3, 69.9) ? 0.4 * Math.abs(Math.sin(t * 10)) : mtIn(t, 170.44, 171.4) ? 0.6 * Math.abs(Math.sin(t * 9)) : 0;
  P.chew = t > 70.3 && !mtIn(t, 170.44, 171.4) ? (t * 1.6) % 1 : 0;
  if (t > 140) { P.x = 1390; P.y = 900; }
  if (mtIn(t, 170.2, 171.5)) P.neck = 0.2 + 0.6 * mtPulse(t, 170.2, 1.3);
  P.gaze = [-1, 0];
  return P;
}
