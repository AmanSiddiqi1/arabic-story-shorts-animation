// ===== AN-083 cast: Ma'an, two huntsmen, three girls. Every pose is a pure function of t (frame state memoised per t). =====
// World 2000 x 1230, ground y 900. Zone A x 0-800 (thirst), zone B x 900-1700 (meeting). Library person + costume presets.
const AN83_GR = 900, AN83_WW = 2000, AN83_VW = 1000, AN83_VH = 1230, AN83_DUR = 169.9;   // plan: duration 165.407 + end_hold 4.5
const AN83_DL = [-26, -60], AN83_DR = [38, -60];
const AN83_INSET = [520, 352, 318];   // verse inset centre and radius, PANEL space (view 1000 x 1230): drawn over the world, the sun hidden
const AN83_INW = [1354, 410];          // where the inset sits in the world during the verses (camera x 1340, zoom 1.45), for gazes
const AN83_PAL = {
  maan: { robe: C.blue, dot: NAVY, sash: C.yellow, cape: null, hc: C.white, hd: C.blue },
  man2: { robe: '#8a501a', dot: '#5b3010', cape: null, hc: C.red, hd: '#a8160f' },
  g2: { robe: C.blue, dot: NAVY, hc: C.white, hd: C.blue },
  g3: { robe: GREEN, dot: GREEND, hc: C.red, hd: '#a8160f' },
};
// ---------- small helpers ----------
function an83Lerp(a, b, u) { return Array.isArray(a) ? a.map((v, i) => K.lerp(v, b[i], u)) : K.lerp(a, b, u); }
function an83Ov(u, o) { return u < 0.6 ? K.ease.out(u / 0.6) * (1 + o) : 1 + o * (1 - K.ease.inOut((u - 0.6) / 0.4)); }
// stepped keys: hold each value and ease to the next over d (per-key d as 3rd element); null = def; over = overshoot (settle)
function an83St(t, keys, d = 0.3, def = 0, over = 0) {
  let cur = keys[0][1] ?? def;
  for (let i = 1; i < keys.length; i++) { const k = keys[i]; if (t < k[0]) break; const u0 = K.clamp((t - k[0]) / (k[2] ?? d)); cur = an83Lerp(cur, k[1] ?? def, over ? an83Ov(u0, over) : K.ease.inOut(u0)); }
  return cur;
}
const an83HL = (t, keys) => an83St(t, keys, 0.28, AN83_DL, 0.1);
const an83HR = (t, keys) => an83St(t, keys, 0.28, AN83_DR, 0.1);
// piecewise path with per-segment ease: [[t, v, ease]]
function an83Path(t, keys) { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1, e] = keys[i]; return K.lerp(v0, v1, K.ease[e || 'lin'](K.clamp((t - t0) / (t1 - t0)))); } return keys[keys.length - 1][1]; }
// person walk: leg phase from distance, amplitude from speed (stride matches the swing so feet do not skate).
// Position snaps hidden by a camera cut (AN83_SNAPS) are measured one-sided so legs do not flail on the frames around a cut.
const AN83_SNAPS = [80.2355];
function an83Walk(xf, t, s = 1, amp = 0.85) { const x = xf(t); let v; const c = AN83_SNAPS.find((k) => Math.abs(t - k) < 0.06);
  v = c == null ? Math.abs(speed(xf, t)) : Math.abs(t < c ? (xf(t) - xf(t - 0.05)) / 0.05 : (xf(t + 0.05) - xf(t)) / 0.05); return { x, ph: x / (29 * amp * s), amp: amp * K.clamp(v / 22) }; }
const an83Hd = (x, s = 1, y = AN83_GR) => [x, y - 195 * s];
const an83Gz = (P, to) => lookAt(an83HeadW(P), to);
const an83Talk = (t, list, k = 1, ph = 0) => talk(t, list, ph) * k;
const an83Lid = (P, t, v) => { P.lid = Math.max(v, P.noBlink ? 0 : blink(t, P.seed)); };

// ---------- position tracks (v2 blocking: men as a tight cluster, Ma'an between, a clear gap, then the girls; man2 and girl3 a step upstage) ----------
const AN83_MXA = (t) => an83Path(t, [[0.44, -80], [6.0, 520], [8.8, 650], [10.3, 700, 'out'], [11.0, 700], [11.4, 720, 'inOut']]);
const AN83_MXB = (t) => an83Path(t, [[20.0, 900], [23.4, 1180, 'out'], [29.02, 1180], [30.9, 1270, 'inOut'], [54.3, 1270], [54.8, 1315, 'inOut'], [59.5, 1315], [60.2, 1270, 'inOut']]);
// S16: Ma'an last to leave, a turn and a wave at 164.4, then up the dune
const AN83_MXC = (t) => an83Path(t, [[107.95, 1270], [108.7, 1250, 'inOut'], [159.9, 1250], [160.6, 1232, 'in'], [164.3, 1050], [164.45, 1044, 'out'], [165.3, 1044], [165.7, 1036, 'in'], [169.9, 962]]);
const an83MX = (t) => t < 20 ? AN83_MXA(t) : t < 90.45 ? AN83_MXB(t) : AN83_MXC(t);
const AN83_1A = (t) => an83Path(t, [[0.9, -260], [6.0, 370], [10.43, 600, 'out']]);
// S5 the huntsmen hurry round BEHIND Ma'an and girl1 (upstage) to girl2 and girl3, and back
const AN83_1B = (t) => an83Path(t, [[20.0, 770], [23.55, 1040, 'out'], [29.3, 1040], [31.0, 1160, 'inOut'], [37.9, 1160], [39.75, 1665, 'inOut'], [44.85, 1665], [47.6, 1160, 'inOut'], [160.1, 1160], [160.7, 1140, 'in'], [166.0, 940], [169.9, 892]]);
const AN83_2A = (t) => an83Path(t, [[1.4, -390], [6.0, 250], [10.57, 490, 'out']]);
const AN83_2B = (t) => an83Path(t, [[20.0, 670], [22.0, 850], [22.5, 868, 'out'], [23.7, 940, 'inOut'], [29.5, 940], [31.3, 1100, 'inOut'], [38.0, 1100], [40.35, 1850, 'inOut'], [44.9, 1850], [48.3, 1100, 'inOut'], [159.95, 1100], [160.5, 1080, 'in'], [165.15, 862], [165.5, 856, 'out'], [166.2, 856], [169.9, 825, 'in']]);
const an83X1 = (t) => t < 20 ? AN83_1A(t) : AN83_1B(t), an83X2 = (t) => t < 20 ? AN83_2A(t) : AN83_2B(t);
// depth (y offset, negative = upstage): man2 half behind man1; both run upstage in S5
const AN83_1Y = (t) => an83Path(t, [[37.9, 0], [38.3, -40, 'inOut'], [39.3, -40], [39.75, -6, 'inOut'], [44.85, -6], [45.3, -40, 'inOut'], [47.1, -40], [47.6, 0, 'inOut']]);
const AN83_2Y = (t) => t < 20 ? 0 : an83Path(t, [[20, -12], [38.0, -12], [38.4, -52, 'inOut'], [39.8, -52], [40.35, -4, 'inOut'], [44.9, -4], [45.4, -52, 'inOut'], [47.8, -52], [48.3, -12, 'inOut']]);
// receding up the dune (S16): 0..1 by 166.0
// v3: they keep walking away to the last frame: an eased start, then steady, scale down to 0.45 by 169.9 (no stop at 166)
const an83Rec = (t, t0) => { const u = K.clamp((t - t0) / (AN83_DUR - t0)); return (u < 0.15 ? u * u / 0.3 : u - 0.075) / 0.925; };
// walking into depth: legs keep cycling with the distance walked up the dune (380 world units over the recession), stride matched to the current scale
const an83RecWalk = (P, r, still = 0, amp = 0.65) => { if (r <= 0) return; P.ph = (P.ph || 0) + 380 * r / (29 * amp * P.s); P.amp = Math.max((P.amp || 0) * (1 - still), amp * K.clamp(r * 12) * (1 - still)); };
// girls: lip of the front dune, entrance paths and later marks
function an83LipY(x) { return an83Path(x, [[1450, 902], [1520, 860], [1560, 850], [1680, 856], [2010, 870]]); }
const AN83_GIRL = [   // [rise start, crest time, flat time, xa (behind), xc (crest), mark x]
  [23.5, 24.5, 27.0, 1610, 1545, 1420], [24.0, 25.0, 27.6, 1700, 1640, 1510], [24.4, 25.4, 28.2, 1790, 1730, 1568]];
const AN83_R = 1385;
const AN83_RCV = [72.16, 74.2, 76.72];   // the bundle lands in each girl's hands on the counted word   // S8: each girl comes to this spot in front of Ma'an (1270) to receive her ten arrows
const AN83_GX = [
  (t) => an83Path(t, [[27.0, 1420], [70.5, 1420], [71.1, AN83_R, 'inOut'], [72.4, AN83_R], [73.0, 1445, 'inOut'], [80.235, 1445], [80.236, 1425], [100.4, 1425], [101.0, 1460, 'inOut'], [107.5, 1460], [108.3, 1425, 'inOut'], [160.4, 1425], [161.6, 1440, 'inOut']]),
  (t) => an83Path(t, [[27.6, 1510], [38.3, 1510], [39.0, 1560, 'inOut'], [44.8, 1560], [45.5, 1510, 'inOut'], [72.6, 1510], [73.5, AN83_R, 'inOut'], [74.4, AN83_R], [75.0, 1520, 'inOut'], [80.235, 1520], [80.236, 1505], [86.7, 1505], [87.2, 1490, 'inOut'], [100.4, 1490], [101.0, 1530, 'inOut'], [107.5, 1530], [108.3, 1505, 'inOut'], [160.5, 1505], [161.7, 1560, 'inOut']]),
  (t) => an83Path(t, [[28.2, 1568], [38.4, 1568], [39.4, 1750, 'inOut'], [44.85, 1750], [45.9, 1568, 'inOut'], [74.8, 1568], [75.7, AN83_R, 'inOut'], [77.0, AN83_R], [77.7, 1595, 'inOut'], [80.235, 1595], [80.236, 1580], [86.7, 1580], [87.2, 1555, 'inOut'], [100.4, 1555], [101.0, 1600, 'inOut'], [107.4, 1600], [108.2, 1580, 'inOut'], [160.6, 1580], [161.8, 1680, 'inOut']]),
];
// y offset toward the camera: the reciter steps forward (S12-S14); depth offsets (girl3 a step upstage, the S8 queue steps back upstage);
// S16 the girls come forward into the right foreground
const AN83_FG = (t) => AN83_B(t, 160.4, 1.8);
const AN83_GY = [
  (t) => 25 * (AN83_B(t, 107.5, 0.9) - AN83_B(t, 121.4, 0.8)) + an83Path(t, [[72.4, 0], [73.0, -30, 'inOut'], [80.235, -30], [80.236, 0]]) + 60 * AN83_FG(t),
  (t) => 25 * (AN83_B(t, 121.9, 0.9) - AN83_B(t, 135.0, 0.8)) + an83Path(t, [[74.4, 0], [75.0, -30, 'inOut'], [80.235, -30], [80.236, 0]]) + 75 * AN83_FG(t),
  (t) => 25 * (AN83_B(t, 135.34, 0.76) - AN83_B(t, 144.3, 0.6)) + an83Path(t, [[28.2, -12], [38.4, -12], [39.4, 0, 'inOut'], [44.85, 0], [45.9, -12, 'inOut'], [74.8, -12], [75.7, 0, 'inOut'], [77.0, 0], [77.7, -30, 'inOut'], [80.235, -30], [80.236, -8], [160.6, -8], [161.8, 0, 'inOut']]) + 50 * AN83_FG(t),
];
const AN83_GS = [0.9, 0.86, 0.8];
const AN83_GSK = (t) => 1 + 0.27 * AN83_FG(t);   // girls' foreground scale in S16

// ---------- the frame state ----------
let AN83_MEMO = { t: -1, F: null };
function an83F(t) { if (AN83_MEMO.t === t) return AN83_MEMO.F; const F = an83Build(t); AN83_MEMO = { t, F }; return F; }

function an83Build(t) {
  const F = { t, props: [] };
  const M = an83Maan(t), m1 = an83Man1(t), m2 = an83Man2(t), g = [0, 1, 2].map((i) => an83Girl(t, i));
  Object.assign(F, { M, m1, m2, g });
  an83Props(t, F);
  return F;
}

// ===================== MA'AN =====================
function an83Maan(t) {
  const P = { costume: 'bedouin', pal: AN83_PAL.maan, age: 0.3, s: 1, y: AN83_GR, seed: 31, mouth: 'closed', brow: 0 };
  const W = an83Walk(an83MX, t, 1, t < 6.5 ? 0.9 : 0.7); Object.assign(P, W);
  // facing
  let tf; if (t < 20) tf = turnFlip(t, [[0, 1], [11.0, -1]], 0.35); else if (t < 70.4) tf = turnFlip(t, [[0, 1], [49.4, -1]], 0.35); else tf = turnFlip(t, [[0, 1], [159.85, -1], [164.4, 1], [165.3, -1]], 0.35);
  P.dir = tf.dir; P.sq = 1 - 0.04 * tf.sink;
  if (t >= 160.6) { const r = an83Rec(t, 160.6); P.y = AN83_GR - 80 * r; P.s = 1 - 0.55 * r; an83RecWalk(P, r, K.clamp(Math.min((t - 164.2) / 0.2, (165.5 - t) / 0.2))); }
  const g1h = an83Hd(AN83_GX[0](t), 0.9, AN83_GR + AN83_GY[0](t)), g2h = an83Hd(AN83_GX[1](t), 0.86, AN83_GR + AN83_GY[1](t)), g3h = an83Hd(AN83_GX[2](t), 0.8, AN83_GR + AN83_GY[2](t));
  const m1h = an83Hd(an83X1(t), 0.98), m2h = an83Hd(an83X2(t), 0.95), IN = [AN83_INW[0], AN83_INW[1] + 40];
  let hL = AN83_DL, hR = AN83_DR, lid = 0, gz = null;
  if (t < 11.4) {   // S1 the walk in the heat
    P.tip = an83St(t, [[0, 0.04], [7.0, 0, 1.2]]); P.mouth = t < 7 ? 'smile' : t < 10.32 ? (t > 9 ? 'o' : 'closed') : 'frown';
    gz = [P.x + 300, 690]; if (t >= 10.3) gz = [P.x + 40, 900];
    if (t >= 3.4 && t < 3.95) lid = 0.35;
    hR = an83HR(t, [[0, AN83_DR], [3.5, [34, -204], 0.25], [4.25, AN83_DR, 0.35], [10.32, [8, -152], 0.25]]);
    if (t >= 10.32) { lid = 0.45; P.drop = 3 * pulse(t, 10.75, 0.3); }
  } else if (t < 20) {   // S2 the waterskin search
    P.brow = -0.3; P.mouth = t < 18.9 ? 'closed' : 'smile'; gz = m1h;
    hR = an83HR(t, [[11.4, [8, -152]], [11.7, AN83_DR], [14.66, [62, -104]], [16.2, AN83_DR]]);
    if (t >= 14.66 && t < 16.2) gz = gazePlan(t, [[14.66, m1h], [15.1, m2h], [15.55, m1h]], 0.07);
    if (t >= 16.2) { gz = [m1h[0] + 40, 790]; lid = 0.3; }
    if (t >= 18.88 && t < 19.6) { lid = 0.5; P.handover = 'skin'; }
    if (t >= 19.4 && t < 19.65) lid = Math.sin(Math.PI * (t - 19.4) / 0.25);
  } else if (t < 29.0) {   // S3 trudging; the girls appear
    P.tip = t < 23.4 ? -0.03 : an83St(t, [[23.4, -0.01], [27.9, 0.03, 0.6]]); lid = t < 27.9 ? 0.5 : 0.5 * (1 - AN83_B(t, 27.9, 0.6)); P.mouth = t < 23.4 ? 'o' : t < 27.9 ? 'closed' : 'smile';
    gz = t < 23.6 ? [P.x + 200, 860] : g1h; if (t >= 27.9) { P.brow = -0.5; gz = [g1h[0] - 30, 790]; }
  } else if (t < 40.0) {   // S4 the request and the handover
    gz = g1h; P.brow = -0.4; P.mouth = 'smile';
    if (t >= 30.9 && t < 31.8) { P.tip = 0.08 * Math.sin(Math.PI * (t - 30.9) / 0.9); if (t < 31.15) lid = 0.6; }
    hR = an83HR(t, [[29, AN83_DR], [30.9, [4, -122]], [31.7, [22, -168], 0.22], [32.6, [80, -112], 0.22], [33.6, AN83_DR]]);
    P.talk = an83Talk(t, [[31.78, 33.3]], 0.6); if (t >= 31.78 && t < 33.6) P.mouth = 'closed';
    P.drop = 3 * pulse(t, 33.3, 0.3);
    if (t >= 37.4) { P.handover = 'skin'; if (t < 38.1) P.eyes = 'wide'; P.sq = settleTo(t, 37.45, 1, 0.95, 0.25) * (t > 37.8 ? settleTo(t, 37.8, 0.95, 1, 0.35) / 0.95 : 1); }
    if (t >= 39.2) { P.tip = -0.04 * AN83_B(t, 39.2, 0.6); lid = 0.8 * AN83_B(t, 39.4, 0.5); gz = [P.x + 30, 560]; }
  } else if (t < 49.0) {   // S5 drinking, thanks, no purse
    P.handover = t < 44.6 ? 'skin' : null;
    if (t < 43.14) { P.tip = -0.04; lid = 1; P.noBlink = true; P.mouth = 'closed'; gz = null; P.gaze = [0.3, -0.2];
      P.sq = K.lerp(0.97, 1.02, AN83_B(t, 40.3, 2.8)) - 0.025 * [40.6, 41.55, 42.5].reduce((a, c) => a + pulse(t, c, 0.32), 0); P.drop = 3 * [40.6, 41.55, 42.5].reduce((a, c) => a + pulse(t, c, 0.32), 0); }
    else if (t < 43.96) { P.tip = -0.04 * (1 - AN83_B(t, 43.14, 0.4)); P.mouth = 'smile'; P.sq = 1.04 - 0.04 * AN83_B(t, 43.5, 0.45); P.drop = 4 * AN83_B(t, 43.45, 0.3); gz = g1h; P.eyes = t < 43.5 ? 'wide' : 'open'; lid = t < 43.4 ? 0.6 * (1 - AN83_B(t, 43.14, 0.26)) : 0; }
    else { gz = g1h; P.mouth = 'smile'; P.sq = 1 + 0.01 * (1 - AN83_B(t, 44, 2)); }
    if (t >= 44.0 && t < 45.0) P.tip = 0.08 * Math.sin(Math.PI * (t - 44.0) / 1.0);
    if (t >= 45.14) { P.brow = -0.3; P.talk = an83Talk(t, [[45.14, 46.3]], 0.4); if (t > 46.3) P.mouth = 'smile'; }
    hR = an83HR(t, [[44.6, AN83_DR], [45.14, [4, -122]], [45.7, [62, -104]], [46.6, AN83_DR], [47.58, [14, -84], 0.18], [48.2, AN83_DR]]);
    hL = an83HL(t, [[44.6, AN83_DL], [45.7, [-60, -100]], [46.6, AN83_DL], [48.1, [-12, -84], 0.18], [48.8, AN83_DL]]);
    if (t >= 47.58) { gz = [P.x + 10, 900]; P.brow = -0.6; P.mouth = t < 48.4 ? 'smile' : 'closed'; hR = [hR[0], hR[1] + 6 * Math.sin(t * 38) * (an83In(t, 47.75, 48.15) ? 1 : 0)]; hL = [hL[0], hL[1] + 6 * Math.sin(t * 38) * (an83In(t, 48.3, 48.75) ? 1 : 0)]; }
  } else if (t < 60.1) {   // S6 asking the men for money
    P.brow = -0.4; gz = t < 50.4 ? m1h : gazePlan(t, [[50.4, m1h], [51.5, m2h], [52.5, m1h], [54.4, m1h], [56.9, m2h], [58.26, [P.x - 60, 900]]], 0.2);
    P.talk = an83Talk(t, [[50.3, 51.2], [51.6, 53.6]], 0.5);
    hR = an83HR(t, [[49, AN83_DR], [50.5, [72, -152]], [51.3, [58, -150], 0.2], [54.3, AN83_DR], [58.26, [34, -194]], [59.4, AN83_DR]]);
    if (an83In(t, 50.5, 51.3)) hR = [hR[0] - 14 * Math.max(0, Math.sin(t * 16)), hR[1]];
    if (an83In(t, 51.4, 54.3)) hR = [hR[0] + 3 * Math.sin(t * 30), hR[1]];
    if (an83In(t, 58.4, 59.4)) hR = [hR[0] + 6 * Math.sin(t * 14), hR[1]];
    if (t >= 58.26) { lid = 0.4; P.sq = 0.97; P.mouth = 'closed'; P.brow = 0; }
  } else if (t < 70.4) {   // S7 the idea and the quiver
    P.sq = 1; gz = [P.x - 120, 860];
    if (t >= 60.7 && t < 61.92) { gz = gazePlan(t, [[60.7, [P.x - 200, 920]], [61.05, [P.x - 60, 400]], [61.4, [P.x + 30, 860]], [61.7, [P.x - 150, 900]]], 0.07); P.brow = 0.3; if (an83In(t, 61.45, 61.75)) lid = Math.sin(Math.PI * (t - 61.45) / 0.3); }
    if (t >= 61.92) { const q = an83W({ ...P, x: an83MX(t) }, 30, -186); gz = [q[0], q[1] + 10]; P.eyes = t > 62.3 && t < 63.1 ? 'wide' : 'open'; P.brow = an83St(t, [[61.92, 0.3], [62.5, -0.6, 0.3]]); P.mouth = t > 62.85 ? 'smile' : 'closed'; }
    hR = an83HR(t, [[60.1, AN83_DR], [60.7, [16, -160]], [62.6, AN83_DR]]);
    if (t >= 63.36) { P.tip = -0.04 * pulse(t, 63.36, 0.4); P.quiverGrab = true; gz = an83W(P, -24, -118); P.mouth = 'smile'; P.brow = -0.5; }
    if (t >= 69.9) { P.mouth = 'smile'; gz = m2h; hR = [52, -196]; P.holdArrow = true; P.quiverGrab = false; }
  } else if (t < 80.24) {   // S8 ten arrows to each girl: he stays left, each girl comes to AN83_R in turn
    P.mouth = 'smile'; P.brow = -0.3;
    const gi = t < 72.5 ? 0 : t < 74.8 ? 1 : 2, tgt = [g1h, g2h, g3h][gi]; gz = tgt;
    if ([70.42, 72.5, 74.9].some((c, k) => an83In(t, c, c + 0.9))) gz = an83W(P, 30, -128);   // counting the arrows out
    P.count = true;
    if (t >= 76.9) gz = m2h;
    if (t >= 77.5 && t < 79.0) { P.quiverUp = true; P.sq = 1 + 0.03 * pulse(t, 78.7, 0.3); gz = null; P.gaze = [0.2, -0.1]; P.mouth = 'smile'; P.brow = -0.6; }
    if (t >= 79.0) gz = [P.x + 120, 420];
  } else if (t < 90.45) {   // S9 off-screen left
    gz = g1h; P.mouth = 'smile';
  } else if (t < 100.18) {   // S10 caught
    P.mouth = 'smile'; P.brow = -0.5; gz = g1h;
    if (t < 92.3) { P.eyes = t < 90.7 ? 'wide' : 'open'; P.noBlink = true; P.brow = t < 90.7 ? -0.7 : -0.3; P.mouth = t < 90.7 ? 'o' : 'smile'; if (t >= 90.56) { gz = null; P.gaze = gazePlan(t, [[90.56, an83Gz(P, g1h)], [90.7, an83Gz(P, g1h)], [90.95, [0, 0.08]]], 0.22); } hR = an83HR(t, [[90.45, AN83_DR], [91.2, PERSON_HANDS.hush.R, 0.2], [92.1, AN83_DR]]); P.tip = -0.03 * AN83_B(t, 91.3, 0.3); }
    if (t >= 94.86 && t < 99.5) gz = [AN83_GX[0](t) + 40, 520];
    if (t >= 99.5) { lid = 0.4; gz = [P.x + 30, 900]; hR = an83HR(t, [[99.4, AN83_DR], [99.55, [34, -194]]]); hR = [hR[0] + 5 * Math.sin(t * 14), hR[1]]; }
  } else if (t < 107.9) {   // S11 waiting politely
    gz = gazePlan(t, [[100.18, g1h], [101.5, g2h], [103.0, g1h]], 0.3); P.mouth = 'closed';
    hL = [24, -140]; hR = [30, -134];
    P.tip = 0.06 * AN83_B(t, 102.24, 0.4) * (1 - AN83_B(t, 103.7, 0.4));
  } else if (t < 144.06) {   // S12-S14 listening to the verses
    lid = 0.3; P.mouth = 'smile'; const gr = t < 121.6 ? g1h : t < 135.2 ? g2h : g3h;
    gz = gazePlan(t, [[107.9, g1h], [110.6, IN], [114.7, [IN[0] + 80, IN[1] + 80]], [116.6, g1h], [117.6, IN], [119.8, g1h], [122.0, g2h], [125.0, IN], [129.0, [IN[0] - 60, IN[1] + 40]], [130.4, [IN[0] + 80, IN[1] + 40]], [131.2, [P.x + 40, 900]], [133.0, IN], [134.2, g2h], [135.5, g3h], [137.6, IN], [141.0, [IN[0] - 40, IN[1] + 60]], [142.6, [IN[0] + 90, IN[1] + 40]], [143.5, [P.x + 40, 900]]], 0.3);
    void gr;
    P.tip = 0.035 * [113.8, 116.0, 120.6, 127.3, 130.5, 134.0, 139.8, 142.0].reduce((a, c) => a + pulse(t, c, 0.5), 0);
    hR = an83HR(t, [[107.9, AN83_DR], [119.56, [4, -122]], [121.6, AN83_DR], [131.2, [22, -176]], [132.9, AN83_DR]]);
    if (an83In(t, 131.4, 132.8)) hR = [hR[0] + 4 * Math.sin(t * 12), hR[1]];
    if (t >= 143.46) { P.drop = 6 * AN83_B(t, 143.46, 0.4); lid = 0.6; P.mouth = 'closed'; }
  } else if (t < 158.5) {   // S15 moved; recognised by his gift
    P.mouth = 'smile';
    if (t < 145.6) { lid = 0.4; P.drop = 6 * (1 - AN83_B(t, 145.2, 0.5)); P.mouth = 'closed'; gz = [P.x + 40, 880]; P.sq = breathe(t, 3, 0.02); }
    else { gz = gazePlan(t, [[145.6, g1h], [146.3, g1h], [146.85, g2h], [147.35, g3h], [148.0, g1h], [148.7, an83Hd(AN83_GX[0](t) - 35, 0.9, 1000)], [149.6, g1h], [151.0, [P.x + 200, 640]], [151.7, g1h], [154.3, [P.x + 60, 420]], [155.3, g1h], [156.3, [P.x + 10, 900]], [157.0, g1h], [157.5, m1h]], 0.2); if (t < 152) P.wet = true; }
    P.tip = 0.06 * [146.45, 146.95, 147.45].reduce((a, c) => a + pulse(t, c, 0.4), 0);
    hR = an83HR(t, [[144.06, AN83_DR], [146.22, [4, -122]], [147.8, AN83_DR], [150.4, [8, -152], 0.2], [151.0, AN83_DR], [156.3, [40, -62]], [156.9, [60, -102]], [157.6, AN83_DR]]);
    hL = an83HL(t, [[144.06, AN83_DL], [156.3, [-30, -62]], [156.9, [-60, -102]], [157.6, AN83_DL]]);
    if (an83In(t, 156.35, 156.9)) { hR = [hR[0], hR[1] + 8 * Math.sin(t * 30)]; hL = [hL[0], hL[1] - 8 * Math.sin(t * 30)]; }
    if (an83In(t, 150.5, 150.66)) P.mouth = 'open';
    if (an83In(t, 150.8, 151.6)) { P.talk = 0.5 + 0.5 * Math.abs(Math.sin(t * 16)); P.sq = 1 + 0.02 * Math.sin(t * 32); }
    if (an83In(t, 156.9, 157.5)) P.sq = 1 + 0.03 * pulse(t, 156.9, 0.5);
  } else {   // S16 farewell
    P.mouth = 'smile'; gz = t < 160.6 ? g1h : null;
    hR = an83HR(t, [[158.5, AN83_DR], [159.5, [64, -196]], [160.5, AN83_DR]]);
    if (an83In(t, 159.6, 160.4)) hR = [hR[0] + 10 * Math.sin(t * 14), hR[1]];
    if (t >= 159.0 && t < 159.5) P.quiverSling = AN83_B(t, 159.0, 0.5);
    if (t >= 164.4 && t < 165.3) { gz = null; P.gaze = [1, 0]; hR = an83HR(t, [[164.4, AN83_DR], [164.55, [64, -196], 0.15], [165.0, [64, -196]], [165.25, AN83_DR]]); if (t < 165.0) hR = [hR[0] + 9 * Math.sin(t * 15), hR[1]]; }
    if (!gz && !(t >= 164.4 && t < 165.3)) P.gaze = [-1, 0.1];
    if (t > 160.0 && t < 160.9) P.gaze = [1, 0];   // a warm look back over the shoulder
  }
  P.handL = hL; P.handR = hR;
  if (gz) P.gaze = an83Gz(P, gz);
  if (P.noBlink) P.lid = lid; else an83Lid(P, t, lid);
  return P;
}

// ===================== HUNTSMAN 1 (loyal, slightly smug) =====================
function an83Man1(t) {
  const P = { costume: 'bedouin', age: 0.45, s: 0.98, y: AN83_GR, seed: 41, mouth: 'closed' };
  Object.assign(P, an83Walk(an83X1, t, 0.98, 0.75)); const tf = turnFlip(t, [[0, 1], [39.45, -1], [47.55, 1], [160.1, -1]], 0.4); P.dir = tf.dir; P.sq = 1 - 0.04 * tf.sink;
  if (t >= 20) P.y = AN83_GR + AN83_1Y(t);
  if (t >= 160.7) { const r = an83Rec(t, 160.7); P.y = AN83_GR - 80 * r; P.s = 0.98 * (1 - 0.54 * r); an83RecWalk(P, r); }
  const Mh = an83Hd(an83MX(t)), m2h = an83Hd(an83X2(t), 0.95), g1h = an83Hd(AN83_GX[0](t), 0.9), g2h = an83Hd(AN83_GX[1](t), 0.86);
  let gz = Mh, lid = 0, hL = AN83_DL, hR = AN83_DR;
  if (t < 11.4) { P.tip = 0.03 * (1 - AN83_B(t, 7, 2)); if (t > 8.8) lid = 0.3; if (t >= 10.43) { P.mouth = 'frown'; lid = 0.4; } }
  else if (t < 20) {
    P.mouth = 'closed';
    if (t < 12.0) { P.skinMode = 'upend'; P.tip = -0.05; P.mouth = 'open'; gz = gazePlan(t, [[11.4, [P.x + 20, 560]], [11.65, [P.x + 30, 900]]], 0.15); P.sq = t > 11.9 ? settleTo(t, 11.9, 0.95, 1, 0.3) : 1; P.noBlink = true; }
    else if (t < 13.6) { gz = m2h; P.skinMode = 'hold'; }
    else if (t < 14.6) { P.skinMode = 'peer'; P.wink = 'L'; gz = an83W(P, 34, -196); P.look = 0.6; }
    else if (t < 16.2) { gz = Mh; P.skinMode = 'hold'; }
    else if (t < 17.66) { P.skinMode = 'pour'; P.look = 1.0 * Math.sin((t - 16.2) * 12) * (1 - AN83_B(t, 17.2, 0.4)); lid = 0.4; P.mouth = 'frown'; gz = [P.x + 60, 900]; }
    else if (t < 19.6) { P.skinMode = t < 18.9 ? 'offer' : 'given'; P.tip = 0.1 * AN83_B(t, 17.66, 0.4) * (1 - AN83_B(t, 19.3, 0.3)); gz = [P.x + 80, 900]; lid = 0.35; }
    else P.skinMode = 'hold';
  } else if (t < 29.0) {
    P.tip = t < 23.55 ? -0.02 : 0; lid = t < 25.6 ? 0.4 : 0;
    if (t >= 22.0 && t < 23.4) { gz = m2h; hL = an83L({ ...P }, an83X2(t) + 26, 790); }
    if (t >= 24.0) gz = g1h;
    if (t >= 25.6 && t < 27.2) { P.eyes = 'wide'; P.mouth = 'open'; P.sq = settleTo(t, 25.6, 1, 1.06, 0.25) * (t > 26.0 ? 1 / settleTo(t, 26.0, 1, 1.06, 0.4) * 1 : 1); }
    hR = an83HR(t, [[20, AN83_DR], [25.6, [100, -150], 0.2], [27.3, AN83_DR]]);
    if (t >= 27.2) { P.mouth = 'smile'; gz = an83Hd(AN83_GX[0](t) - 30, 0.9, 960); }
  } else if (t < 49.0) {
    gz = t < 37.4 ? g1h : t < 38.6 ? Mh : g2h; P.mouth = 'smile';
    if (an83In(t, 37.9, 39.75)) { gz = [P.x + 300, 700]; P.mouth = 'open'; P.tip = 0.06; }
    if (t >= 39.4 && t < 40.0) { hL = an83HL(t, [[39.4, AN83_DL], [39.6, [92, -150]]]); hR = an83HR(t, [[39.4, AN83_DR], [39.6, [100, -170]]]); }
    if (t >= 40.5 && t < 44.3) { P.tip = -0.05; lid = 1; P.noBlink = true; P.drop = -4; }
    if (an83In(t, 44.85, 47.6)) { gz = [P.x - 300, 760]; P.mouth = 'smile'; }
    if (t >= 47.6) gz = Mh;
  } else if (t < 60.1) {
    gz = Mh; P.mouth = 'closed';
    if (t >= 54.44) { gz = gazePlan(t, [[54.44, m2h], [55.0, [P.x + 30, 900]], [55.7, an83W(P, 40, -200)], [57.4, Mh]], 0.15); P.mouth = 'frown'; }
    if (t >= 55.4 && t < 57.6) { P.purse = true; hR = an83HR(t, [[55.4, [40, -150]], [55.62, [64, -206], 0.2]]); if (t > 55.95 && t < 56.55) hR = [hR[0], hR[1] + 14 * Math.sin((t - 55.95) * 21)]; if (t > 56.6) { hR = an83HR(t, [[56.6, [64, -206]], [56.75, [44, -200], 0.2]]); P.wink = 'L'; P.look = 0.7; P.tip = 0.06; gz = an83W(P, 40, -214); } }
  } else if (t < 70.4) {
    gz = Mh; P.mouth = 'closed';
    if (t >= 64.3 && t < 65.84) { P.tip = 0.1 * AN83_B(t, 64.3, 0.4); gz = an83W(an83Maan(t), -20, -118); }
    if (t >= 69.9) { hL = [22, -105]; hR = [-18, -112]; lid = 0.4; P.mouth = 'smile'; P.tip = 0.04 * pulse(t, 70.0, 0.35); }
  } else if (t < 107.9) {
    gz = t < 80.24 ? Mh : t < 92 ? g1h : t < 100.18 ? (t < 94.86 ? Mh : [AN83_GX[0](t), 520]) : g2h; P.mouth = 'smile';
    if (t < 80.24) { hL = [22, -105]; hR = [-18, -112]; lid = 0.3; P.tip = 0.04 * pulse(t, 76.8, 0.4); }
    if (t >= 96.56 && t < 98.2) { hL = an83HL(t, [[96.5, AN83_DL], [96.65, [96, -152]]]); hR = an83HR(t, [[96.5, AN83_DR], [96.65, [80, -152], 0.15], [96.9, [12, -142], 0.4], [97.45, [70, -150], 0.1], [97.65, [12, -142], 0.35]]); gz = [P.x + 300, 600]; P.mouth = 'closed'; }
    if (t >= 102.24 && t < 103.9) { P.tip = 0.1 * AN83_B(t, 102.3, 0.4) * (1 - AN83_B(t, 103.6, 0.3)); gz = g1h; }
  } else if (t < 158.5) {
    lid = 0.3; P.mouth = 'smile'; const r = t < 121.6 ? 0 : t < 135.2 ? 1 : 2, rx = AN83_GX[r](t);
    gz = gazePlan(t, [[107.9, an83Hd(rx, 0.9, 935)], [111.0, [AN83_INW[0], AN83_INW[1] + 30]], [121.8, an83Hd(rx, 0.86, 935)], [125.2, [AN83_INW[0], AN83_INW[1] + 30]], [135.6, an83Hd(rx, 0.8, 935)], [137.8, [AN83_INW[0], AN83_INW[1] + 30]], [144.3, Mh], [146.5, g1h]], 0.35);
    P.tip = 0.03 * [114.2, 128.4, 140.2].reduce((a, c) => a + pulse(t, c, 0.5), 0);
    if (t >= 143.46 && t < 145) { lid = 0.6; P.mouth = 'closed'; }
    if (t >= 157.54) { hR = an83HR(t, [[157.5, AN83_DR], [157.6, [4, -122], 0.2]]); P.brow = t < 158.0 ? 0.6 : 0; P.mouth = t < 158.0 ? 'o' : 'smile'; gz = Mh; lid = 0; }
  } else {
    P.mouth = 'smile'; gz = t < 160.1 ? g1h : null; hR = t < 158.9 ? [4, -122] : AN83_DR;
    if (t >= 165.25 && t < 166.1) { hR = an83L(P, an83X2(t) + 20, P.y - 150 * P.s); P.eyes = 'wide'; }
    if (!gz) P.gaze = [-1, 0.1];
  }
  P.handL = hL; P.handR = hR; if (gz) P.gaze = an83Gz(P, gz);
  if (P.noBlink) P.lid = lid; else an83Lid(P, t, lid);
  return P;
}

// ===================== HUNTSMAN 2 (the clown: reacts biggest and late) =====================
function an83Man2(t) {
  const P = { costume: 'bedouin', pal: AN83_PAL.man2, age: 0.15, s: 0.95, y: AN83_GR, seed: 53, mouth: 'closed' };
  Object.assign(P, an83Walk(an83X2, t, 0.95, 0.75)); const tf = turnFlip(t, [[0, 1], [40.05, -1], [48.25, 1], [159.95, -1]], 0.4); P.dir = tf.dir; P.sq = 1 - 0.04 * tf.sink;
  if (t >= 20) P.y = AN83_GR + AN83_2Y(t);
  if (t >= 160.5) { const r = an83Rec(t, 160.5); P.y = AN83_GR - 12 - 80 * r; P.s = 0.95 * (1 - 0.53 * r); an83RecWalk(P, r, K.clamp(Math.min((t - 165.05) / 0.1, (166.3 - t) / 0.15))); }
  const Mh = an83Hd(an83MX(t)), m1h = an83Hd(an83X1(t), 0.98), g1h = an83Hd(AN83_GX[0](t), 0.9), g3h = an83Hd(AN83_GX[2](t), 0.8);
  let gz = Mh, lid = 0, hL = AN83_DL, hR = AN83_DR;
  if (t < 11.4) {
    gz = t < 4.0 ? [P.x + 300, 700] : t < 8.8 ? null : [P.x + 200, 880]; if (!gz) P.gaze = [-0.35, -0.94];
    if (t >= 8.8) { lid = 0.5; P.mouth = 'o'; P.sq = 0.96; P.x += tremble(t, 1); hR = an83HR(t, [[8.8, AN83_DR], [8.95, [64, -190]]]); hR = [hR[0] + 12 * Math.sin(t * 19) * (t < 10.4 ? 1 : 0), hR[1]]; if (t > 10.4) hR = an83HR(t, [[10.4, [64, -190]], [10.45, AN83_DR]]); }
  } else if (t < 20) {
    gz = m1h; P.mouth = 'closed';
    if (t < 12.06) gz = gazePlan(t, [[11.4, [m1h[0] + 20, 560]], [11.75, [m1h[0] + 30, 900]]], 0.2);
    else if (t < 13.6) { P.skinMode = t < 12.9 ? 'ear' : 'squeeze'; P.brow = t < 12.9 ? -0.4 : 0.3; P.mouth = t < 12.9 ? 'o' : 'frown'; gz = [P.x + 100, 700]; }
    else if (t < 14.66) gz = m1h;
    else if (t < 16.27) gz = Mh;
    if (t >= 16.27 && t < 17.66) { P.skinMode = 'pour'; P.look = 1.1 * Math.sin((t - 16.27) * 12) * (1 - AN83_B(t, 17.2, 0.4)); lid = 0.4; P.mouth = 'frown'; gz = [P.x + 60, 900]; }
    else if (t >= 12.06 && t < 13.6) { /* set above */ } else if (t >= 11.4) P.skinMode = t >= 17.66 ? 'hang' : 'hold';
    if (t >= 17.66) { gz = Mh; lid = 0.35; P.mouth = 'frown'; }
  } else if (t < 29.0) {
    P.tip = -0.03 + 0.12 * pulse(t, 22.05, 0.45); lid = 0.45; P.mouth = 'o';
    if (t >= 22.0 && t < 23.4) P.sq = anticipate(t, 22.0, 0.12, 0.07) * (t > 22.12 ? settleTo(t, 22.12, 0.93, 1, 0.5) : 1);
    if (t >= 23.85) { gz = g1h; lid = 0; P.eyes = t > 24.6 && t < 26.5 ? 'wide' : 'open'; P.mouth = t > 24.6 ? 'open' : 'o'; }
    if (t >= 27.0) P.mouth = 'smile';
  } else if (t < 49.0) {
    gz = t < 37.4 ? g1h : t < 38.6 ? Mh : g3h; P.mouth = 'smile';
    if (an83In(t, 38.0, 40.35)) { gz = [P.x + 300, 700]; P.mouth = 'open'; P.tip = 0.08; }
    if (t >= 40.0 && t < 40.6) { hL = an83HL(t, [[40.0, AN83_DL], [40.2, [92, -150]]]); hR = an83HR(t, [[40.0, AN83_DR], [40.2, [100, -170]]]); }
    if (t >= 41.0 && t < 43.4) { P.tip = -0.05; lid = 1; P.noBlink = true; P.drop = -4; }
    if (t >= 43.4 && t < 44.45) { P.tip = -0.05; P.noBlink = true; lid = 0.85 + 0.15 * Math.sin(t * 25); P.mouth = 'open'; P.splash = true; }
    if (an83In(t, 44.9, 48.3)) { gz = [P.x - 300, 760]; P.mouth = 'smile'; }
    if (t >= 48.3) gz = Mh;
  } else if (t < 60.1) {
    gz = Mh; P.mouth = 'closed';
    if (t >= 54.5) { gz = gazePlan(t, [[54.5, m1h], [55.05, [P.x + 30, 900]], [55.8, m1h], [56.9, Mh]], 0.15); P.mouth = 'frown'; }
    if (t >= 57.49 && t < 58.9) { hL = an83HL(t, [[57.49, PERSON_HANDS.armsOut.L, 0.18]]); hR = an83HR(t, [[57.49, [60, -196], 0.18]]); P.brow = -0.6; P.mouth = 'smile'; P.drop = -8 * pulse(t, 57.55, 0.6); P.sq = 1 - 0.04 * pulse(t, 57.55, 0.6); P.bowUp = AN83_B(t, 57.49, 0.2); gz = null; P.gaze = [0.1, 0.05]; }
  } else if (t < 70.4) {
    gz = Mh; P.mouth = 'closed';
    if (t >= 64.4 && t < 65.84) { P.tip = 0.12 * AN83_B(t, 64.4, 0.4); gz = an83W(an83Maan(t), -20, -118); }
    if (t >= 69.95) { P.eyes = 'wide'; P.mouth = 'open'; P.sq = settleTo(t, 69.95, 1, 1.05, 0.3); P.noBlink = true; }
  } else if (t < 107.9) {
    gz = t < 80.24 ? Mh : t < 92 ? g1h : t < 100.18 ? (t < 94.86 ? Mh : [AN83_GX[0](t), 520]) : g3h; P.mouth = 'smile';
    if (t < 71.0) { P.eyes = 'wide'; P.mouth = 'o'; }
    if (t >= 77.6 && t < 79.2) { hR = an83HR(t, [[77.6, AN83_DR], [77.75, [22, -214], 0.12]]); lid = 0.6; P.mouth = 'open'; P.drop = 4 * pulse(t, 77.8, 0.3); }
    if (t >= 96.96 && t < 98.6) { hL = an83HL(t, [[96.9, AN83_DL], [97.05, [96, -152]]]); hR = an83HR(t, [[96.9, AN83_DR], [97.05, [80, -152], 0.15], [97.3, [12, -142], 0.4], [97.85, [70, -150], 0.1], [98.05, [12, -142], 0.35]]); gz = [P.x + 300, 600]; P.mouth = 'closed'; }
    if (t >= 102.24 && t < 103.9) { P.tip = 0.14 * AN83_B(t, 102.4, 0.4) * (1 - AN83_B(t, 103.6, 0.3)); hR = an83HR(t, [[102.3, AN83_DR], [102.5, [42, -200]], [103.7, AN83_DR]]); gz = g1h; }
  } else if (t < 158.5) {
    lid = 0.3; P.mouth = 'smile'; const r = t < 121.6 ? 0 : t < 135.2 ? 1 : 2, rx = AN83_GX[r](t);
    gz = gazePlan(t, [[107.9, an83Hd(rx, 0.9, 935)], [111.3, [AN83_INW[0], AN83_INW[1] + 30]], [122.1, an83Hd(rx, 0.86, 935)], [125.5, [AN83_INW[0], AN83_INW[1] + 30]], [135.8, an83Hd(rx, 0.8, 935)], [138.0, [AN83_INW[0], AN83_INW[1] + 30]], [144.3, Mh], [146.8, g3h]], 0.35);
    P.tip = 0.03 * [115.0, 129.0, 141.0].reduce((a, c) => a + pulse(t, c, 0.5), 0);
    if (t >= 143.46 && t < 145) { lid = 0.6; P.mouth = 'closed'; }
    if (t >= 157.6) { hL = [22, -105]; hR = [-18, -112]; P.brow = t < 158.05 ? 0.6 : 0; P.mouth = t < 158.05 ? 'frown' : 'smile'; gz = Mh; lid = 0; }
  } else {
    P.mouth = 'smile'; gz = t < 159.95 ? g1h : null; if (t < 158.9) { hL = [22, -105]; hR = [-18, -112]; }
    if (!gz) P.gaze = an83In(t, 162.9, 163.55) ? [1, 0] : [-1, 0.1];
    if (t >= 165.15 && t < 166.2) { P.tip = 0.28 * pulse(t, 165.25, 0.9); P.sq = anticipate(t, 165.15, 0.1, 0.06); P.eyes = 'wide'; P.mouth = 'o'; hL = [-80, -150]; hR = [80, -150]; P.trip = true; }
  }
  P.handL = hL; P.handR = hR; if (gz) P.gaze = an83Gz(P, gz);
  if (P.noBlink) P.lid = lid; else an83Lid(P, t, lid);
  return P;
}

// ===================== THE THREE GIRLS =====================
function an83Girl(t, i) {
  const s = AN83_GS[i], E = AN83_GIRL[i], pal = i === 0 ? undefined : i === 1 ? AN83_PAL.g2 : AN83_PAL.g3;
  const P = { costume: 'villageWoman', age: 0, s, seed: [61, 67, 71][i], mouth: 'smile', dir: -1 };
  if (pal) P.pal = pal;
  // position: rising over the dune lip, then the marks
  if (t < E[1]) { const u = K.clamp((t - E[0]) / (E[1] - E[0])); P.x = K.lerp(E[3], E[4], u); P.y = an83LipY(E[4]) + 230 * (1 - K.ease.out(u)); P.behind = true; P.ph = P.x / (29 * 0.8 * s); P.amp = t > E[0] ? 0.8 : 0; }
  else if (t < E[2]) { const xf = (tt) => K.lerp(E[4], E[5], K.ease.inOut(K.clamp((tt - E[1]) / (E[2] - E[1])))), x = xf(t); P.x = x; P.y = K.lerp(an83LipY(E[4]), AN83_GR, K.clamp((E[4] - x) / (E[4] - E[5]))); Object.assign(P, an83Walk(xf, t, s, i === 2 ? 0.7 : 0.8)); P.y = K.lerp(an83LipY(E[4]), AN83_GR, K.clamp((E[4] - P.x) / (E[4] - E[5]))); }
  else { Object.assign(P, an83Walk(AN83_GX[i], t, s, i === 2 ? 0.65 : 0.75)); P.y = AN83_GR + AN83_GY[i](t); if (t > 160) { P.s = s * AN83_GSK(t); P.ph = P.x / (29 * 0.75 * P.s); } }
  P.hidden = t < E[0];
  // facing
  const turns = [[[0, -1], [59.5, 1], [69.95, -1], [85.5, 1], [89.9, -1], [100.3, 1], [107.3, -1]], [[0, -1], [38.3, 1], [44.75, -1], [59.75, 1], [70.1, -1]], [[0, -1], [38.45, 1], [44.8, -1]]][i];
  const tf = turnFlip(t, turns, 0.35); P.dir = tf.dir; P.sq = 1 - 0.04 * tf.sink;
  // walking back to the line facing the right way, then facing left again (g2, g3 after the drink)
  const F = { Mh: an83Hd(an83MX(t), 1, 900), m1h: an83Hd(an83X1(t), 0.98), m2h: an83Hd(an83X2(t), 0.95) };
  const gh = [0, 1, 2].map((k) => an83Hd(AN83_GX[k](t), AN83_GS[k], AN83_GR + AN83_GY[k](t)));
  let gz = F.Mh, lid = 0, hL = AN83_DL, hR = AN83_DR; P.bundle = t >= AN83_RCV[i] ? 'both' : null;
  const IN = [AN83_INW[0], AN83_INW[1] + 30];
  if (t < 29.0) {   // S3 entrance
    gz = i === 1 && an83In(t, 24.5, 26.6) ? gh[2] : [P.x - 200, 820];
    if (i === 1) P.talk = an83Talk(t, [[24.6, 26.4]], 0.5);
    if (t >= 28.0) gz = i === 2 ? F.Mh : F.Mh;
    if (i === 2 && t >= 28.3) { lid = 0.3; P.mouth = 'closed'; }
  } else if (t < 40.0) {   // S4
    gz = F.Mh;
    if (i === 0) { if (t >= 33.74) P.sq *= anticipate(t, 33.74, 0.2, 0.04); if (t >= 36.72) P.tip = 0.06 * AN83_B(t, 36.72, 0.3) * (1 - AN83_B(t, 37.7, 0.4)); }
    if (i === 1) { P.talk = an83Talk(t, [[34.38, 35.3]], 0.45); hR = an83HR(t, [[34.3, AN83_DR], [34.45, [40, -150], 0.5], [35.6, AN83_DR], [36.2, [60, -100]], [36.8, AN83_DR]]); if (an83In(t, 34.38, 36.1)) gz = F.Mh; P.mouth = an83In(t, 34.3, 36.2) ? 'closed' : 'smile'; if (an83In(t, 36.2, 36.8)) P.sq *= 1 + 0.03 * pulse(t, 36.2, 0.6); }
    if (i === 2) { lid = t < 33.0 ? 0.35 : 0; gz = t < 33.0 ? [P.x - 100, 860] : F.Mh; }
    if (i > 0 && t >= 38.3) { gz = i === 1 ? F.m1h : F.m2h; }
  } else if (t < 49.0) {   // S5
    gz = F.Mh;
    if (i === 0 && t < 44.0) { gz = F.Mh; P.mouth = 'smile'; if (t >= 43.14) P.sq *= 1 + 0.03 * pulse(t, 43.2, 0.5); }
    if (i === 1 && t < 44.75) { gz = F.m1h; if (an83In(t, 43.6, 44.5)) { hR = [10, -172]; P.mouth = 'smile'; } }
    if (i === 2 && t < 44.8) { gz = F.m2h; if (an83In(t, 43.5, 44.5)) { P.mouth = 'open'; P.talk = 0.5 + 0.5 * Math.abs(Math.sin(t * 15)); P.tip = -0.05; } }
    if (t >= 46.38 && t < 47.6) {
      if (i === 0) P.look = 0.9 * Math.sin((t - 46.38) * 11);
      if (i === 1) { hR = [64, -170 + 14 * Math.sin(t * 20)]; }
      if (i === 2) { lid = 0.4; gz = [P.x - 30, 920]; }
    }
    if (t >= 47.58) { gz = an83W(an83Maan(t), 10, -84); }
  } else if (t < 60.1) {   // S6
    gz = t < 52 ? F.Mh : t < 54.3 ? [an83MX(t) - 30, 560] : t < 56.84 ? F.m1h : F.m2h;
    if (t >= 59.5) { if (i === 2) { hR = an83HR(t, [[59.5, AN83_DR], [59.65, [56, -176]]]); hR = [hR[0] + 6 * Math.sin(t * 14), hR[1]]; gz = F.Mh; } else gz = [P.x + 200 * P.dir, 820]; }
  } else if (t < 70.4) {   // S7
    gz = i === 0 && t < 69.9 ? (t >= 64.3 ? F.Mh : [P.x + 200, 820]) : F.Mh; if (i === 1 && t < 69.9) gz = [P.x + 200, 800];
    if (i === 2) gz = F.Mh;
  } else if (t < 80.24) {   // S8 receiving: she comes to AN83_R, both hands come up, the bundle crosses a gap, her hands dip
    const tr = AN83_RCV[i]; gz = F.Mh;
    if (t >= tr - 0.75 && t < tr) { hL = an83HL(t, [[tr - 0.75, AN83_DL], [tr - 0.55, [52, -146]]]); hR = an83HR(t, [[tr - 0.75, AN83_DR], [tr - 0.55, [62, -156]]]); gz = an83W(an83Maan(t), 80, -170); P.eyes = 'wide'; P.mouth = 'o'; }
    if (t >= tr) { const d = t - tr, dip = 12 * Math.exp(-d * 6) * Math.cos(d * 13); hL = [AN83_GH[0], AN83_GH[1] + dip]; hR = [AN83_GH[0] + 10, AN83_GH[1] + 6 + dip]; P.bundleDip = dip; P.sq *= 1 - 0.03 * pulse(t, tr, 0.4); if (d < 0.9) { gz = an83W(P, 30, -200); P.mouth = 'o'; P.eyes = 'wide'; } }
    if (t >= 77.5) { gz = F.Mh; P.mouth = 'open'; P.talk = 0.4 + 0.4 * Math.abs(Math.sin(t * 13 + i)); if (t > 78.9) { P.mouth = 'smile'; P.talk = 0; } }
  } else if (t < 88.0) {   // S9 they examine the gold, look at each other, the name dawns
    const st = [0, 0.1, 0.2][i], bh = an83W(P, 30, -200);
    gz = t < 80.24 + st ? [P.x + 40 * P.dir, 700] : bh; P.eyes = 'wide'; P.drop = 6 * AN83_B(t, 80.24 + st, 0.25);
    if (i === 1 && t >= 81.6 && t < 84.04) { P.eyeArrow = AN83_B(t, 81.6, 0.4); P.bundle = 'L'; hL = [18, -118]; gz = an83W(P, 46, -232); P.drop = 6 * (1 - P.eyeArrow); P.eyes = 'open'; P.wink = t > 82.0 ? 'L' : undefined; P.mouth = 'o'; }
    if (i === 0 && t >= 82.6 && t < 83.4) { P.tap = true; P.eyes = 'open'; }
    if (i === 2 && t >= 82.9 && t < 84.0) { P.holdUp = AN83_B(t, 82.9, 0.4) * (1 - AN83_B(t, 83.75, 0.25)); P.mouth = 'o'; gz = [P.x - 20, 560]; P.eyes = 'open'; }
    if (t >= 84.04) { P.drop = 6 * (1 - AN83_B(t, 84.05, 0.3)); P.eyes = 'wide'; P.noBlink = t < 84.9; P.brow = -0.7 * (1 - AN83_B(t, 85.1, 0.4)); P.mouth = t < 85.0 ? 'o' : 'smile';
      gz = gazePlan(t, [[84.04, i === 0 ? gh[1] : i === 1 ? gh[0] : gh[1]], [84.6 + st, i === 0 ? gh[2] : gh[0]]], 0.25); }
    if (i === 0 && t >= 85.44) { gz = gh[1]; P.sq *= 1 + 0.03 * pulse(t, 85.44, 0.5); P.tip = 0.08 * AN83_B(t, 85.85, 0.3); hR = an83HR(t, [[85.8, AN83_DR], [85.95, an83L(P, AN83_GX[1](t) - 20, 798), 0.2]]); P.bundle = 'L'; hL = [18, -118]; }
    if (i === 1 && t >= 85.44) { P.bundle = 'L'; hL = [-30, -72]; }   // v3: on her far side, away from girl1's face
    if (i > 0 && t >= 86.0) { gz = gh[0]; P.tip = (i === 1 ? 0.09 : 0.11) * AN83_B(t, 86.05, 0.3); if (i === 2) P.y -= 10 * AN83_B(t, 86.1, 0.3); }
  } else if (t < 100.18) {   // S10 only Ma'an does this
    if (i === 0) {
      P.talk = an83Talk(t, [[88.57, 92.06], [92.45, 94.68], [95.27, 98.6]], 0.7); P.bundle = 'L'; hL = [18, -118]; P.arrowR = true; gz = t < 89.84 ? gh[1] : F.Mh;
      hR = an83HR(t, [[88.0, [40, -100]], [89.95, [100, -154], 0.3]]); if (t < 89.84) { hR = [40, -100 + 8 * Math.sin(t * 13)];   /* v3: the single arrow held low, clear of the faces */ P.look = 0.5 * Math.sin(t * 9); }
      if (an83In(t, 89.84, 90.2)) P.sq *= 1 + 0.03 * Math.sin(Math.PI * (t - 89.84) / 0.36);
      if (t >= 94.86) { P.aR = [K.lerp(0.3, 2.65, AN83_B(t, 94.86, 0.5)), K.lerp(0.2, 2.85, AN83_B(t, 94.86, 0.5))]; gz = an83W(P, ...an83HandL(1, null, P.aR)); gz = [gz[0], gz[1] - 80]; }
    } else {
      const g0 = 90.56 + i * 0.1;   // the gasp, staggered 3 and 6 frames after the name
      if (i === 1 && t < g0) { P.bundle = 'L'; hL = [-30, -72]; }
      gz = t < g0 ? gh[0] : gazePlan(t, [[g0, F.Mh], [92.6, an83W(P, 24, -190)], [93.1, F.Mh], [94.0, [AN83_GX[0](t), 560]]], 0.12);
      if (t >= g0 && t < 93.2) { P.eyes = 'wide'; P.noBlink = true; P.mouth = 'o'; P.bundle = 'tuck'; const H = i === 1 ? PERSON_HANDS.mouthCover : PERSON_HANDS.cheeks; hL = an83HL(t, [[g0, AN83_DL], [g0 + 0.01, H.L, 0.15]]); hR = an83HR(t, [[g0, AN83_DR], [g0 + 0.01, H.R, 0.15]]); P.sq *= 1 + 0.03 * pulse(t, g0, 0.4); }
    }
  } else if (t < 107.9) {   // S11 the huddle
    const ctr = [1520, 800];
    gz = i === 0 ? gh[1] : gh[0];
    if (i === 0) P.talk = an83Talk(t, [[101.53, 103.0], [103.76, 104.3]], 0.6);
    P.tip = 0.07 + (i ? 0.01 : 0); P.drop = 3 * pulse(t, 102.4 + i * 0.3, 0.4) + 3 * pulse(t, 103.2 + i * 0.25, 0.4);
    if (an83In(t, 101.0 + i * 0.6, 101.5 + i * 0.6) && i > 0) gz = [1250, 700];
    P.bundle = 'L'; hL = i === 0 ? AN83_HIP : [10, -82];   // v3: the speaker's sheaf at her hip, the others at chest height
    if (t >= 103.76 && t < 104.95) { const st = 103.85 + i * 0.1; hR = an83L(P, ctr[0], ctr[1] - [0, 10, 20][i] - 4 * pulse(t, 104.3, 0.25)); if (t < st) hR = an83HR(t, [[st - 0.3, AN83_DR], [st, hR]]); }
    if (t >= 104.96 && t < 106.2) { const st = 105.0 + i * 0.3; if (t >= st) hR = an83HR(t, [[st, AN83_DR], [st + 0.01, [44, -205]]]); P.tip = 0.02; gz = [P.x, 600]; }
    if (t >= 105.92) gz = [1540, 560];
    if (t >= 107.26) { P.tip = 0; gz = F.Mh; if (i === 0) { hR = an83HR(t, [[107.26, AN83_DR], [107.5, [4, -122]]]); P.drop = -3; } }
  } else if (t < 144.06) {   // S12-S14 the verses
    const rec = t < 121.4 ? 0 : t < 135.2 ? 1 : 2;
    gz = rec === i ? F.Mh : gh[rec]; P.bundle = 'L'; hL = rec === i ? AN83_HIP : [10, -82];   // v3: reciter one hand at the hip, listeners chest height
    if (t >= 110.6 && t < 143.4 && rec !== i) gz = gazePlan(t, [[110.6, gh[rec]], [111.8 + i * 0.4, IN], [118.0 + i * 0.3, gh[0]], [119.3, IN], [122.4, gh[1]], [125.1 + i * 0.3, IN], [131.4, gh[1]], [132.8, IN], [134.4, gh[1]], [136.0, gh[2]], [137.5 + i * 0.3, IN], [143.4, gh[2]]], 0.3);
    if (i === 0) {
      if (t < 121.4) { P.talk = an83Talk(t, [[108.89, 116.54], [116.94, 121.34]], 0.65); lid = 0.3; P.drop = -3;
        P.aR = [an83St(t, [[107.9, 0.3], [108.9, 2.05, 1.1], [116.54, 1.5, 0.6], [118.1, 2.05, 0.6], [119.56, 0.4, 0.6]]), an83St(t, [[107.9, 0.15], [108.9, 2.4, 1.1], [116.54, 1.55, 0.6], [118.1, 2.4, 0.6], [119.56, 0.2, 0.6]])];
        if (t < 107.9 + 1.0) P.aR = null; gz = t >= 116.54 && t < 118.1 ? [P.x - 500, 700] : t >= 110.6 ? IN : F.Mh; if (t >= 119.56) gz = F.Mh;
        if (t >= 121.34) P.tip = 0.1 * pulse(t, 121.34, 0.5); }
      else if (t >= 143.46) { lid = 0.6; P.mouth = 'closed'; gz = gh[2]; P.drop = 4; }
    }
    if (i === 1) {
      if (rec === 1) { P.talk = an83Talk(t, [[122.69, 126.0], [126.53, 131.2], [131.71, 135.34]], 0.8); gz = t > 124.38 && t < 131.2 ? IN : F.Mh;
        hL = AN83_HIP; P.bundle = 'L';   // v3: the sheaf stays at her hip; the right hand keeps the gestures
        hR = an83HR(t, [[121.9, AN83_DR], [122.7, [95, -150]], [124.4, [60, -104]], [126.7, [44, -205]], [128.0, [95, -150]], [129.5, [60, -104]], [131.2, [44, -205]], [132.9, [60, -104]], [134.08, AN83_DR]]);
        if (an83In(t, 131.3, 132.9)) hR = [hR[0] + 10 * Math.sin(t * 2 * Math.PI / 0.4), hR[1]];
        if (t >= 134.08) { P.sq *= 1 - 0.08 * pulse(t, 134.3, 0.7); P.tip = 0.1 * pulse(t, 134.3, 0.7); gz = gh[2]; } }
      if (t >= 143.46) { hR = an83L(P, AN83_GX[2](t) + 26, AN83_GR + AN83_GY[2](t) - 146 * 0.8); lid = 0.6; P.mouth = 'closed'; gz = gh[2]; }
      if (rec === 0 && an83In(t, 117.0, 118.2)) P.talk = 0.25;
    }
    if (i === 2) {
      if (rec === 1) { if (an83In(t, 124.38, 126.0)) P.talk = 0.2; if (t >= 134.4) { P.look = 0.8 * Math.sin((t - 134.4) * 12) * (1 - AN83_B(t, 134.9, 0.2)); } if (t >= 134.9) P.sq *= 1 + 0.03 * pulse(t, 134.95, 0.4); }
      if (rec === 2) { P.talk = an83Talk(t, [[135.93, 144.06]], t < 137.16 ? 0.35 : 0.5); lid = t < 137.16 ? 0.4 : 0; P.mouth = t < 143.46 ? 'closed' : 'closed';
        gz = t < 137.16 ? [P.x - 40, 960] : IN; if (t >= 137.16) hR = an83HR(t, [[137.16, AN83_DR], [137.5, [60, -104]], [142.9, AN83_DR]]); if (t >= 143.46) { lid = 0.6; gz = [P.x - 40, 960]; } }
    }
    if (t >= 142.52 && i > 0 && rec !== i) P.mouth = 'closed';
  } else if (t < 158.5) {   // S15
    gz = F.Mh; P.bundle = 'both'; hL = AN83_GH; hR = [20, -90];
    if (t < 145.6) { lid = 0.4; P.mouth = 'closed'; }
    if (t >= 147.76 && t < 148.64) { if (i === 2) { P.bundle = 'face'; hL = [6, -176]; hR = [20, -170]; } if (i === 1) { P.bundle = 'L'; hR = an83HR(t, [[147.8, AN83_DR], [147.95, [100, -150], 0.15], [148.3, AN83_DR]]); gz = gh[0]; } }
    if (i === 0 && t >= 148.64 && t < 150.3) { P.bundle = 'L'; hL = [18, -118]; hR = an83HR(t, [[148.64, [30, -112]], [148.8, [-24, -132]]]); if (t > 149.0) hR = [hR[0], hR[1] + 5 * Math.sin(t * 20)]; gz = an83W(P, -40, -128); }
    if (i === 0 && t >= 152.76 && t < 154.2) { P.bundle = 'L'; hL = [18, -118]; hR = an83HR(t, [[152.76, [30, -112]], [152.9, [32, -206]], [153.4, [100, -150]]]); if (an83In(t, 153.0, 153.35)) hR = [hR[0], hR[1] + 4 * Math.sin(t * 40)]; }
    if (t >= 154.54) { const st = 154.54 + i * 0.1; P.lift = 30 * AN83_B(t, st, 0.25) * (1 - AN83_B(t, 155.6, 0.5)); gz = [P.x - 30, 560]; if (t > 155.6) gz = F.Mh; }
    if (t >= 156.3 && t < 158.5) gz = t < 157.5 ? an83W(an83Maan(t), 0, -40) : F.m1h;
  } else {   // S16 farewell
    gz = t < 162.4 ? F.Mh : [Math.min(F.Mh[0], 1100), 760]; P.bundle = 'both'; hL = AN83_GH; hR = [20, -90];
    const wave = (a, b, big) => { if (t >= a && t < b) { P.bundle = 'L'; hR = an83HR(t, [[a, [20, -90]], [a + 0.2, big ? [70, -205] : [56, -176]], [b - 0.3, big ? [70, -205] : [56, -176]], [b, [20, -90]]]); if (t < b - 0.3) hR = [hR[0] + (big ? 14 : 7) * Math.sin(t * 14 + i), hR[1]]; } };
    if (i === 1) { wave(160.28, 161.8, true); wave(163.5, 165.3, true); P.talk = an83Talk(t, [[162.0, 162.6]], 0.6); }
    if (i === 2) { wave(160.6, 161.7, false); wave(163.6, 165.6, false); if (t >= 162.0 && t < 162.6) { P.bundle = 'L'; hR = an83HR(t, [[162.0, [30, -112]], [162.15, [-30, -196], 0.3]]); } }
    if (i === 0) { wave(163.7, 165.9, false); }
    if (t >= 160.28 && t < 161.8 && i === 0) P.mouth = 'smile';
  }
  // holding the bundle when the hands have nothing else to do
  if (P.bundle && P.bundle !== 'tuck' && P.bundle !== 'face' && hL === AN83_DL) hL = AN83_GH;
  if (P.bundle === 'both' && hR === AN83_DR) hR = [AN83_GH[0] + 10, AN83_GH[1] + 6];
  if (P.bundle === 'R' && hR === AN83_DR) hR = AN83_GH;
  P.handL = hL; P.handR = hR;
  if (gz) P.gaze = an83Gz(P, gz);
  if (P.noBlink) P.lid = lid; else an83Lid(P, t, lid);
  return P;
}
const AN83_GH = [10, -82];
const AN83_CHIN = 31;            // v3: chin below the head centre (figure-local), for the sheaf face clearance
const AN83_HIP = [-6, -68];      // v3: a reciter's sheaf hand, one hand at hip height

// ===================== PROPS CARRIED AND HANDED OVER =====================
// Fills F.pre[key] (drawn before that figure: slung behind the body), F.post[key] (after it: in the hands) and F.top (after everyone:
// objects passing between two people). It may also move a figure's hand targets onto the prop it holds (hands are drawn later).
function an83Props(t, F) {
  const { M, m1, m2, g } = F, pre = { M: [], m1: [], m2: [], g0: [], g1: [], g2: [] }, post = { M: [], m1: [], m2: [], g0: [], g1: [], g2: [] }, top = [];
  F.pre = pre; F.post = post; F.top = top;
  const loc = (P, f) => (c) => an83Local(c, P, () => f(c));
  const setH = (P, sd, w) => { const l = an83L(P, w[0], w[1]); if (sd < 0) P.handL = l; else P.handR = l; };
  const both = (P, w, dx = 12) => { setH(P, -1, [w[0] - dx * (P.dir > 0 ? 1 : -1), w[1] + 4]); setH(P, 1, [w[0] + dx * (P.dir > 0 ? 1 : -1), w[1]]); };
  const lw = (P, l) => an83W(P, l[0], l[1]);
  const skinW = (c, w, o) => an83Skin(c, w[0], w[1], o);
  // ---- bows on the backs ----
  for (const [P, k] of [[M, 'M'], [m1, 'm1'], [m2, 'm2']]) if (!(k === 'm2' && P.bowUp)) pre[k].push(loc(P, (c) => an83Bow(c, k === 'M' ? 40 : -46, -122, k === 'M' ? -0.35 : 0.35, { s: 0.85 })));
  if (m2.bowUp) { const h = an83HandW(m2, 1); post.m2.push((c) => an83Bow(c, h[0], h[1], 0.1 * Math.sin(t * 9), { s: 0.85 * m2.s })); }
  // ---- the men's own skins ----
  const slungMan = (P, k) => pre[k].push(loc(P, (c) => an83Skin(c, -40, -108, { fill: 0.12, tilt: -0.5, slosh: Math.sin(P.ph * 2) * P.amp })));
  const sl1 = () => slungMan(m1, 'm1'), sl2 = () => slungMan(m2, 'm2');
  if (t >= 11.4 && t < 20) {
    const md = m1.skinMode; let l1 = null, tilt = 0;
    if (md === 'upend') { l1 = [24, -268]; tilt = 1.9; }
    else if (md === 'hold') { l1 = [44, -128]; tilt = 0.2; }
    else if (md === 'peer') { l1 = [70, -196]; tilt = Math.PI - 0.15; }
    else if (md === 'pour') { l1 = [74, -150 + 5 * Math.sin(t * 30)]; tilt = Math.PI / 2; }
    else if (md === 'offer') { l1 = [K.lerp(44, 100, AN83_B(t, 17.66, 0.4)), K.lerp(-128, -146, AN83_B(t, 17.66, 0.4))]; tilt = 0.4; }
    if (md === 'given') {   // Ma'an takes it, tilts it to his mouth, gets nothing, hands it back
      const a = lw(m1, [100, -146]), mh = lw(M, [70, -150]), up = lw(M, [40, -214]);
      let w = t < 19.05 ? an83Lerp(a, mh, AN83_B(t, 18.88, 0.17)) : t < 19.4 ? an83Lerp(mh, up, AN83_B(t, 19.05, 0.15)) : an83Lerp(up, a, AN83_B(t, 19.4, 0.2));
      const tl = t < 19.05 ? 0.4 : t < 19.4 ? K.lerp(0.4, 2.5, AN83_B(t, 19.05, 0.15)) : K.lerp(2.5, 0.4, AN83_B(t, 19.4, 0.2));
      top.push((c) => an83Skin(c, w[0], w[1], { fill: 0.08, tilt: tl * (M.dir < 0 ? -1 : 1) + (M.dir < 0 ? Math.PI : 0), s: 1 }));
      if (t < 19.45) both(M, w, 14); setH(m1, 1, t < 19.45 ? lw(m1, [100, -146]) : w);
    } else if (l1) {
      const w = lw(m1, l1); post.m1.push((c) => an83Skin(c, w[0], w[1], { fill: md === 'upend' ? 0.2 : 0.08, tilt: m1.dir > 0 ? tilt : Math.PI - tilt, s: m1.s, squeeze: 0 }));
      if (md === 'peer') setH(m1, 1, [w[0] + 20, w[1] + 4]); else both(m1, w, 16);
    } else sl1();
    const md2 = m2.skinMode; let l2 = null, tl2 = 0, sq2 = 0;
    if (md2 === 'ear') { l2 = [54 + 6 * Math.sin(t * 70), -196]; tl2 = -0.3; }
    else if (md2 === 'squeeze') { l2 = [44, -140]; sq2 = AN83_B(t, 12.9, 0.6); }
    else if (md2 === 'hold') { l2 = [44, -128]; tl2 = 0.2; }
    else if (md2 === 'pour') { l2 = [74, -150 + 5 * Math.sin(t * 30 + 1)]; tl2 = Math.PI / 2; }
    else if (md2 === 'hang') { l2 = [46, -86]; tl2 = 1.2; }
    if (l2) { const w = lw(m2, l2); post.m2.push((c) => an83Skin(c, w[0], w[1], { fill: 0.08, tilt: tl2, s: m2.s, squeeze: sq2 })); if (md2 === 'ear' || md2 === 'hang') setH(m2, 1, [w[0] - 10, w[1] + 4]); else both(m2, w, 16); }
    else sl2();
  } else { sl1(); sl2(); }
  // ---- the girls' full skins ----
  const SL = [-38, -126];
  const slungGirl = (i, fill) => { const P = g[i]; if (P.hidden) return; const sl = Math.sin((P.ph || 0) * 2 - 0.5) * (P.amp || 0); pre['g' + i].push(loc(P, (c) => an83Skin(c, SL[0], SL[1], { fill, tilt: -0.35 + 0.12 * sl, slosh: sl }))); };
  const inGirlHands = (i, l, fill, tilt = 0.15) => { const P = g[i], w = lw(P, l); post['g' + i].push((c) => an83Skin(c, w[0], w[1], { fill, tilt: P.dir > 0 ? tilt : Math.PI - tilt, s: P.s, slosh: 0.5 * Math.sin(t * 6) })); both(P, w, 14); return w; };
  const unsling = (i, a, d, fill, to = [52, -142]) => { const u = an83Ov(K.clamp((t - a) / d), 0.12), l = an83Lerp(SL, to, u); return inGirlHands(i, l, fill, K.lerp(-0.35, 0.15, u)); };
  // girl 1 -> Ma'an
  const f1 = t < 40.4 ? 1 : t < 43.14 ? K.lerp(1, 0.2, (t - 40.4) / 2.74) : 0.2;
  if (t < 33.74 || t >= 45.4) slungGirl(0, f1);
  else if (t < 36.72) unsling(0, 33.8, 1.0, 1);
  else if (t < 37.4) inGirlHands(0, an83Lerp([52, -142], [100, -168], AN83_B(t, 36.72, 0.35)), 1);
  else if (t < 44.6) {   // with Ma'an
    const gw = lw(g[0], [100, -168]);
    let l = [62, -150 + 12 * Math.exp(-(t - 37.6) * 6) * (t > 37.6 ? 1 : 0)], tilt = 0.15;
    const SIP = [78, -214], ST = 2.75;   // the skin held up beside the mouth in 3/4, neck to the lips, eyes clear
    if (t >= 39.4 && t < 43.14) { const u = AN83_B(t, 39.4, 0.6); l = an83Lerp(l, SIP, u); tilt = K.lerp(0.15, ST, u); }
    if (t >= 43.14) { const u = AN83_B(t, 43.14, 0.5); l = an83Lerp(SIP, [62, -146], u); tilt = K.lerp(ST, 0.15, u); }
    let w = lw(M, l); if (t < 37.7) w = an83Lerp(gw, w, AN83_B(t, 37.4, 0.3));
    if (t >= 44.2) { const gb = lw(g[0], [52, -142]); w = an83Lerp(lw(M, [62, -146]), gb, AN83_B(t, 44.2, 0.4)); }
    top.push((c) => an83Skin(c, w[0], w[1], { fill: f1, tilt: M.dir > 0 ? tilt : Math.PI - tilt, s: 1, slosh: 0.6 * Math.sin(t * 7) }));
    if (t >= 37.4 && t < 44.4) both(M, w, 16); if (t < 37.55 || t >= 44.2) both(g[0], w, 14);
  } else inGirlHands(0, an83Lerp([52, -142], SL, AN83_B(t, 44.8, 0.6)), f1, -0.2);
  // girls 2 and 3 -> the huntsmen
  for (const [i, Mn, T0, Th, Td0, Td1, Tb, Tbk, hi] of [[1, m1, 38.3, 39.75, 40.4, 44.25, 44.4, 44.75, false], [2, m2, 38.45, 40.35, 40.9, 44.4, 44.45, 44.85, true]]) {
    const fl = t < Td0 + 0.3 ? 1 : t < Td1 ? K.lerp(1, 0.6, (t - Td0 - 0.3) / (Td1 - Td0 - 0.3)) : 0.6;
    if (t < T0 || t >= Tbk + 0.55) slungGirl(i, fl);
    else if (t < Th) unsling(i, T0, 0.6, 1);
    else if (t < Tb + 0.3) {
      let l = [70, -160], tilt = 0.2;
      if (t >= Td0 - 0.2 && t < Td1) { const u = AN83_B(t, Td0 - 0.2, 0.4); l = an83Lerp(l, hi ? [44, -300] : [40, -226], u); tilt = K.lerp(0.2, hi ? 2.0 : 2.45, u); }
      if (t >= Td1) { const u = AN83_B(t, Td1, 0.4); l = an83Lerp(hi ? [44, -300] : [40, -226], [70, -150], u); tilt = K.lerp(hi ? 2.0 : 2.45, 0.2, u); }
      let w = lw(Mn, l); if (t < Th + 0.2) w = an83Lerp(lw(g[i], [52, -142]), w, AN83_B(t, Th, 0.2));
      if (t >= Tb) w = an83Lerp(lw(Mn, [70, -150]), lw(g[i], [52, -142]), AN83_B(t, Tb, 0.3));
      top.push((c) => an83Skin(c, w[0], w[1], { fill: fl, tilt: Mn.dir > 0 ? tilt : Math.PI - tilt, s: Mn.s, slosh: 0.6 * Math.sin(t * 7 + i) }));
      both(Mn, w, 16); if (t < Th + 0.2 || t >= Tb) both(g[i], w, 14);
    } else inGirlHands(i, an83Lerp([52, -142], SL, AN83_B(t, Tbk, 0.5)), fl, -0.2);
  }
  // ---- Ma'an's quiver ----
  const QB = [-58, -212, -0.6], QF = [-22, -122, -0.12];
  const qNow = () => {
    if (t < 63.36 || t >= 159.5) return { l: QB, back: true };
    if (t < 64.3) { const u0 = K.clamp((t - 63.55) / 0.6), u = an83Ov(u0, 0.14), l = [K.lerp(QB[0], QF[0], u), K.lerp(QB[1], QF[1], u) - 30 * Math.sin(Math.PI * K.clamp(u0)), K.lerp(QB[2], QF[2], u)]; return { l, back: u < 0.5, grab: true }; }
    if (t >= 159.0) { const u = AN83_B(t, 159.0, 0.5), l = [K.lerp(QF[0], QB[0], u), K.lerp(QF[1], QB[1], u) - 30 * Math.sin(Math.PI * u), K.lerp(QF[2], QB[2], u)]; return { l, back: u > 0.5, grab: true }; }
    return { l: QF, back: false };
  };
  const nIn = t < 70.42 ? 6 : t < 72.5 ? 4 : t < 74.9 ? 2 : 0, op = t < 64.4 ? 0 : AN83_B(t, 64.4, 0.4);
  if (M.quiverUp) {   // held upside down by its bottom: empty
    setH(M, 1, lw(M, [64, -176])); const h = an83HandW(M, 1); setH(M, -1, lw(M, [40, -128 + 6 * Math.max(0, Math.sin((t - 78.1) * 20)) * (an83In(t, 78.1, 78.7) ? 1 : 0)]));
    post.M.push((c) => an83Quiver(c, h[0], h[1] + 116, { rot: Math.PI + 0.1 * Math.sin(t * 6), open: 1, n: 0 }));
  } else {
    const q = qNow(), f = (c) => an83Quiver(c, q.l[0], q.l[1], { rot: q.l[2], open: op, n: nIn });
    (q.back ? pre.M : post.M).push(loc(M, f));
    if (q.grab) M.handL = [q.l[0] + 4, q.l[1] + 16];
    if (t >= 64.3 && t < 65.84) M.handR = an83HR(t, [[64.3, AN83_DR], [64.42, [QF[0] + 6, QF[1] - 18], 0.15], [65.0, [QF[0] + 30, QF[1] + 20]]]);
  }
  // ---- Ma'an holds up the first gold arrow (69.9-70.4) ----
  if (M.holdArrow) { const h = an83HandW(M, 1); post.M.push((c) => an83Arrow(c, h[0] + 6, h[1] - 64, -Math.PI / 2 - 0.15, { glint: K.clamp((t - 69.95) / 0.4) })); }
  // ---- counting out the bundles (S8): he counts ten into his left hand, holds it out, it crosses the gap into her raised hands ----
  if (t >= 70.42 && t < 76.72) {
    const B3 = [[70.42, 71.75, 0], [72.5, 73.8, 1], [74.9, 76.3, 2]];
    for (const [c0, h0, gi] of B3) {
      const R = AN83_RCV[gi]; if (t < c0 || t >= R) continue; const n = Math.min(5, 1 + Math.floor((t - c0) / ((h0 - 0.35 - c0) / 5)));
      M.handL = an83HL(t, [[c0, [30, -126]], [h0 - 0.35, [70, -156], 0.25]]);
      if (t < h0 - 0.35) { const k = Math.floor((t - c0) / 0.1) % 2; M.handR = k ? [QF[0] + 8, QF[1] - 10] : [26, -128]; }
      let w = an83HandW(M, -1); w = [w[0], w[1] - 4];
      if (t >= h0) { const P = g[gi], gw = an83Lerp(an83HandW(P, -1), an83HandW(P, 1), 0.5); w = an83Lerp(w, gw, AN83_B(t, h0, R - h0)); w[1] -= 26 * Math.sin(Math.PI * K.clamp((t - h0) / (R - h0))); }
      const s = 1.2; top.push((c) => an83Bundle(c, w[0], w[1], n, { s, rot: 0.3 * Math.sign(M.dir) }));
    }
  }
  // ---- the girls' bundles and single arrows ----
  for (let i = 0; i < 3; i++) {
    const P = g[i]; if (!P.bundle) continue;
    if (P.lift) { P.handL = [P.handL[0] + 0.8 * P.lift, P.handL[1]]; P.handR = [P.handR[0] + 0.8 * P.lift, P.handR[1]]; }   // v3: the S15 show is a push forward, not a raise in front of the face
    // v3 face clearance: from 76.7 on, a held sheaf's highest gold tip stays >= 10 screen px below the holder's chin
    // (the hands are lowered until it does; tuck / face and the single raised arrows are separate props and exempt)
    if (t >= 76.7 && (P.bundle === 'L' || P.bundle === 'R' || P.bundle === 'both')) {
      const zw = 10 / (an83Cam(t).zoom * 0.972), sb = P.s * 1.25, rb = 0.22 * Math.sign(P.dir);
      const topOf = (w) => Math.min(...[0, 1, 2, 3, 4].map((k) => w[1] + Math.sin(-Math.PI / 2 + rb + (k / 4 - 0.5) * 1.15) * (k % 2 ? 58 : 70) * sb)) - 6 * sb;
      const gripOf = () => { const hl = an83HandW(P, -1), hr = an83HandW(P, 1); return P.bundle === 'L' ? hl : P.bundle === 'R' ? hr : an83Lerp(hl, hr, 0.5); };
      const chin = an83W(P, (P.look || 0) * 4, -195 + (P.drop || 0) + an83Age(P) * 6 + AN83_CHIN)[1];
      for (let it = 0; it < 4; it++) { const need = chin + zw - topOf(gripOf()); if (need <= 0.3) break; const dl = need / (P.s * (P.sq ?? 1));
        if (P.bundle !== 'R' && P.handL) P.handL = [P.handL[0], P.handL[1] + dl]; if (P.bundle !== 'L' && P.handR) P.handR = [P.handR[0], P.handR[1] + dl]; }
      P.bundleSlip = Math.max(0, chin + zw - topOf(gripOf()));   // the arm cannot reach lower: the sheaf slides down in the fist
    } else P.bundleSlip = 0;
    const hl = an83HandW(P, -1), hr = an83HandW(P, 1);
    let w = P.bundle === 'L' ? hl : P.bundle === 'R' ? hr : an83Lerp(hl, hr, 0.5), rot = 0.22 * Math.sign(P.dir);
    if (P.bundle === 'tuck') { w = lw(P, [-24, -112]); rot = -0.35 * P.dir; }
    if (P.bundle === 'face') { w = lw(P, [14, -150]); rot = 0.1 * Math.sign(P.dir); }
    w = [w[0], w[1] + (P.bundle === 'both' ? 0 : P.bundleDip || 0) + (P.bundleSlip || 0)];
    // one slow glint at a time, cycling girl1 -> girl2 -> girl3 every 2.4 s from 76.7 to the end (plus the S16 waves)
    const gl = (k) => { let v = 0; const wave = (t0) => { const d = t - t0; return d > 0 && d < 0.45 ? d / 0.45 : 0; };
      if (t >= 76.7) { const n = Math.floor((t - 76.7) / 2.4), t0 = 76.7 + n * 2.4; if (n % 3 === i && k === (n * 2 + 1) % 5) v = wave(t0); }
      if (i === 0 && k === 2 && an83In(t, 82.6, 83.3)) v = Math.max(v, (t - 82.6) / 0.7); return v; };
    const nb = P.holdUp || P.arrowR || P.earArrow || P.eyeArrow ? 9 : 10;
    post['g' + i].push((c) => an83Bundle(c, w[0], w[1], nb, { s: P.s * 1.25, rot, glints: gl }));
    if (i === 0 && P.tap) { const a = -Math.PI / 2 + rot + 0.08, tip = [w[0] + Math.cos(a) * 66 * P.s * 1.25, w[1] + Math.sin(a) * 66 * P.s * 1.25]; setH(P, 1, [tip[0] + 10 * P.dir, tip[1] + 14 - 10 * Math.max(0, Math.sin((t - 82.6) * 18))]); F.tapAt = tip; }
    // girl2 lifts one arrow to eye level and tilts it; a patch of gold light on her face
    if (i === 1 && P.eyeArrow) { const e = P.eyeArrow, h0 = lw(P, an83Lerp([30, -120], [52, -186], e)); setH(P, 1, h0); const h = an83HandW(P, 1), ang = -Math.PI / 2 + P.dir * (0.25 + 0.35 * Math.sin((t - 81.6) * 2.4)), tip = [h[0] + Math.cos(ang) * 70 * P.s, h[1] + Math.sin(ang) * 70 * P.s];
      post.g1.push((c) => { an83Arrow(c, tip[0], tip[1], ang, { s: P.s * 1.1, len: 100, head: 1.9, fl: 0.6, flc: CREAM, glint: K.clamp((t - 82.2) / 0.5) });
        const hd = an83HeadW(P); c.save(); c.globalAlpha = 0.5 * e; c.fillStyle = dotPat(c, C.yellow, 7, 0.5); c.beginPath(); c.ellipse(hd[0] + 10 * P.dir, hd[1] + 4, 26 * P.s, 20 * P.s, 0, 0, 7); c.fill(); c.restore(); }); }
  }
  { const P = g[0]; if (P.arrowR) { const h = an83HandW(P, 1); const a0 = -Math.PI / 2 + 0.6;   /* she faces right (toward girl2) until 89.9 */ let ang = a0 + 0.2 * Math.sin(t * 13) * (t < 89.84 ? 1 : 0); if (t >= 89.84 && t < 94.86) ang = K.lerp(a0, P.dir > 0 ? 0 : Math.PI, AN83_B(t, 89.95, 0.3)); if (t >= 94.86) ang = K.lerp(P.dir > 0 ? 0 : Math.PI, -Math.PI / 2, AN83_B(t, 94.86, 0.5));
    const reach = t >= 94.86 ? K.lerp(62, 112, AN83_B(t, 94.86, 0.5)) : 62, tip = [h[0] + Math.cos(ang) * reach * P.s, h[1] + Math.sin(ang) * reach * P.s]; F.g1Tip = tip; post.g0.push((c) => an83Arrow(c, tip[0], tip[1], ang, { s: P.s * 1.1, len: 100, head: 2.0, fl: 0.6, flc: CREAM, glint: t >= 99.5 ? K.clamp((t - 99.5) / 0.6) : 0 })); } }
  { const P = g[2]; if (P.holdUp) { P.aR = [K.lerp(0.3, 2.55, P.holdUp), K.lerp(0.2, 2.85, P.holdUp)]; P.handR = null; const h = an83HandW(P, 1), tip = [h[0], h[1] - 66 * P.s]; F.g3Tip = tip; post.g2.push((c) => an83Arrow(c, tip[0], tip[1], -Math.PI / 2, { s: P.s * 1.1, len: 100, head: 1.9, fl: 0.6, flc: CREAM, glint: K.clamp((t - 83.2) / 0.6) })); }
    if (t >= 162.0) { P.earArrow = true; if (t < 162.45) { const h = an83HandW(P, 1); post.g2.push((c) => an83Arrow(c, h[0] - 30 * P.dir, h[1] - 50 * P.s, -Math.PI / 2 - 0.5 * P.dir, { s: P.s, len: 100, head: 1.8, fl: 0.6, flc: CREAM })); }
      else post.g2.push(loc(P, (c) => an83Arrow(c, -26, -266, -Math.PI / 2 - 0.45, { s: 0.9, len: 100, head: 1.8, fl: 0.6, flc: CREAM }))); } }
  // ---- the purse (man1, 55.7-57.4) ----
  if (m1.purse) { const h = an83HandW(m1, 1), up = AN83_B(t, 55.62, 0.22) * (1 - 0.7 * AN83_B(t, 56.6, 0.2)); const flap = an83In(t, 55.95, 56.75) ? Math.sin((t - 55.95) * 21 - 0.6) * Math.min(1, (56.75 - t) / 0.2) : 0; top.push((c) => an83Purse(c, h[0], h[1] + 4, Math.PI * up * (m1.dir > 0 ? 1 : -1), { s: 1.15 * m1.s, open: up, flap, t })); F.purseMouth = [h[0], h[1] + 4 - 4 * up]; }
  // the moth and the dust that fall out of the empty purse (56.0-57.3)
  if (an83In(t, 55.95, 57.4)) { const h = F.purseMouth || an83HandW(m1, 1), u = (t - 55.95) / 1.45;
    top.push((c) => { c.save(); c.globalAlpha = Math.min(1, (57.4 - t) / 0.3); for (let k = 0; k < 6; k++) { const v = K.clamp(u * 1.6 - k * 0.08); if (v <= 0 || v >= 1) continue; c.globalAlpha = 0.7 * (1 - v); shape(c, ell(h[0] + (k - 2.5) * 6 + 18 * v * Math.sin(k * 2.1), h[1] + 8 + 90 * v, 5 + 7 * v, 5 + 7 * v, 10), '#e8d8a8', { lw: 2, seed: 900 + k }); }
      c.globalAlpha = 1;
      // v3: the moth at 2x; it tumbles out with the dust, then after the second shake (56.55) flutters up and away on a looping path for 0.6 s
      const v = K.clamp((t - 55.95) / 0.6), bx = h[0] + 8 * Math.sin(9), by = h[1] + 46, w = Math.max(0, (t - 56.55) / 0.6), sx = m1.dir > 0 ? 1 : -1;
      const mx = t < 56.55 ? h[0] + sx * 4 * v + 8 * Math.sin(v * 9) : bx + sx * (4 + 50 * w * w + 12 * Math.sin(w * 3 * Math.PI)), my = t < 56.55 ? h[1] + 16 + 30 * v : by - 300 * Math.pow(w, 0.7) + 20 * (1 - Math.cos(w * 3 * Math.PI)), fl = Math.abs(Math.sin(t * 26));
      for (const sd of [-1, 1]) shape(c, an83Close([[mx, my], [mx + sd * 36, my - 20 * fl - 8], [mx + sd * 30, my + 14]]), '#e8dcc0', { lw: 3, seed: 905, dot: '#a89070', pitch: 6, rad: 0.25, da: 0.5 }); shape(c, ell(mx, my, 7, 16, 10), '#6a5a4a', { lw: 2.5 }); c.restore(); }); }
}
