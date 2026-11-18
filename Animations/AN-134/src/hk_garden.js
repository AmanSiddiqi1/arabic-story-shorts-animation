// ===== AN-134 garden interior: S4-S8, S10-S14, S16 (one pose function per character over the whole garden time) =====
const HK_CUSH_T = [[420, 905], [500, 905], [622, 905], [622, 877], [760, 905], [860, 905]];
const HK_TRAYS = [['fruit', 520, 1010, 45.22], ['sweets', 700, 1005, 46.68], ['jugs', 850, 1010, 48.04], ['rice', 430, 1072, 50.5], ['bread', 620, 1076, 51.0], ['dome', 800, 1070, 51.5]];
const HK_EXTRA = (() => { const r = K.rng(33), a = [], k = ['fruit', 'sweets', 'jugs', 'rice', 'bread', 'dome', 'pomeg']; for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) a.push([k[Math.floor(r() * 7)], 150 + i * 88 + row * 40 + r() * 14, 1125 + row * 70]); return a; })();
const HK_S16 = (t) => t >= 151.5;
const hkBoyX4 = (t) => kfn(t, [[35.06, 110], [36.0, 470], [37.2, 470], [38.2, 300]], 'inOut');
const hkTower = (t) => 7 * Math.sin(t * 9) * Math.exp(-Math.max(0, t - 35.06) * 0.2) + swing(t, 36.0, 0.06, 1.4, 2.5) * 0;

// ---------- cushions ----------
function hkCushions(t) {
  if (t < 35.06 || HK_S16(t)) return [];
  const out = [], bx = hkBoyX4(t);
  HK_CUSH_T.forEach(([x, y], i) => { const col = HK_CUSH[i], tf = 36.08 + i * 0.12, top = 840 - (5 - i) * 30;
    let cx = x, cy = y, sq = 1, rot = 0;
    if (t < tf) { cx = bx + (i % 2 ? 4 : -4) + Math.sin(t * 8 + i) * (5 - i) * 1.5; cy = top; rot = 0.04 * Math.sin(t * 8 + i * 0.4); }
    else if (t < tf + 0.35) { const u = (t - tf) / 0.35; cx = K.lerp(bx, x, u); cy = K.lerp(top, y, u) - 140 * Math.sin(Math.PI * u); rot = u * 3.14; }
    else sq = landSquash(t, tf + 0.35, 0.3, 12);
    if (i === 2 || i === 3) sq *= impactSquash(t, 38.8, 0.9) * (t > 38.8 ? 0.92 : 1);
    if (i === 3 && t > 38.8) cy = 905 - 30 * (sq) + 2;
    if (i === 5 && t > 39.3) { sq *= t < 40.6 ? 0.55 : 0.75; }
    if (i === 1 && t > 128.14 && t < 129.2) sq *= 1 - 0.08 * Math.abs(Math.sin((t - 128.14) * 9));
    out.push({ x: cx, y: cy, col, sq, rot, i }); });
  return out;
}
function hkDrawCushion(ctx, c) { ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot || 0); hkCushion(ctx, 0, 0, { col: c.col[0], dot: c.col[1], sq: c.sq, w: 100, h: 30 }); ctx.restore(); }

// ---------- trays on the rug ----------
function hkTrayPos(t, k) {
  const [kind, x, y, land] = HK_TRAYS[k];
  if (t >= land) return { kind, x, y: y - 3 * hkPulse(t, land, 0.18) - HK_TRAYS.reduce((s, q, j) => s + (j !== k && q[3] > 50 ? 2 * hkPulse(t, q[3], 0.15) : 0), 0) };
  if (k >= 3) { const t0 = land - 0.45; if (t < t0) return null; const u = (t - t0) / 0.45; return { kind, x: K.lerp(235, x, u), y: K.lerp(800, y, u) - 160 * Math.sin(Math.PI * u), rot: (1 - u) * 0.4 }; }
  return null;
}

// ---------- the caliph ----------
function hkCal(t) {
  const P = hkP(HK_CAL, 520, 900, 1, -1, { seed: 81, mouth: 'smile' });
  if (t < 38.2) {   // S4 standing on the lawn
    if (t > 34.7) { const [hx, hy] = hop(t, 34.7, 0.25, 520, 535, 12); P.x = hx; P.y = 900 - hy; }
    P.sq = (t > 31.92 && t < 32.6 ? 0.94 + 0.06 * hkB(t, 32.1, 0.4) : 1) * landSquash(t, 34.95, 0.1);
    P.brow = hkIn(t, 31.92, 33.2) ? -0.6 : 0; P.mouth = t < 31.92 ? 'closed' : t < 33.2 ? 'o' : 'smile';
    P.gaze = hkGP(t, P, [[30.62, [520, 760]], [30.9, [250, 700]], [31.2, [820, 700]], [31.5, [560, 300]], [31.92, [300, 760]], [32.2, [760, 760]], [33.3, [400, 980]], [34.12, [500, 960]], [35.06, [300, 760]], [36.08, [600, 700]], [36.6, [760, 900]], [37.4, [420, 720]]], 0.07);
    hkArms(t, P, [[0, [40, -70]], [31.92, [60, -130], 0.12], [33.0, [40, -70], 0.4]], [[0, [-40, -70]], [31.92, [-60, -130], 0.12], [33.0, [-40, -70], 0.4]]);
    return P;
  }
  // seated on the cushion stack at 600 from 38.4 (sits down 38.4-38.8, bounces)
  P.x = t < 38.4 ? kfn(t, [[38.2, 535], [38.4, 600]]) : 600; P.sit = hkB(t, 38.4, 0.4); P.seat = 'bench'; P.y = 900 - 5 * hkPulse(t, 38.9, 0.25);
  P.sq = impactSquash(t, 38.8, 0.92) * breathe(t, 1);
  P.gob = t > 42.84 && t < 130.3 ? { side: 'L', fill: 0.5 } : null;
  let G = [[38.2, [622, 880]], [38.9, [400, 700]], [39.3, [770, 760]], [40.0, [500, 1000]], [42.0, [400, 700]]];
  let R = [[0, [40, -70]], [42.0, [30, -90], 0.3]], L = [[0, [-40, -70]], [42.0, [-60, -50], 0.25], [42.6, [-36, -100], 0.3]];
  if (t > 42.0 && t < 42.6) P.lid = 0.5;
  P.drop = 4 * hkPulse(t, 42.4, 0.4);
  if (t >= 42.84 && t < 53.5) {   // S5
    G = [[42.84, [400, 700]], [43.1, [140, 720]], [44.6, [300, 800]], [45.22, [520, 980]], [45.8, () => hkOrange(t) || [400, 1000]], [46.68, [700, 990]], [48.04, [850, 980]], [49.5, [870, 760]], [50.5, [430, 1060]], [51.0, [620, 1060]], [51.5, [800, 1060]], [52.4, [400, 700]]];
    P.brow = t < 50.5 ? 0 : t < 51.0 ? -0.2 : t < 51.5 ? -0.4 : -0.6; if (hkIn(t, 46.3, 46.9)) { P.lid = 0.5; P.sq *= 1 + 0.02 * Math.abs(Math.sin(t * 20)); }
  }
  if (t >= 58.22 && t < 64.18) {   // S6 medium: jaw drop, double take, sweep, suspicion
    G = [[58.22, [600, 1100]], [60.72, [140, 760]], [61.1, [600, 1080]], [61.5, [140, 760]], [62.04, [380, 1050]], [62.6, [860, 1050]], [63.44, [410, 720]]];
    if (t > 59.02) { P.mouth = t < 61.9 ? 'o' : 'closed'; P.brow = t < 63.44 ? -0.7 : -0.4; P.sq *= t < 60.6 ? K.lerp(1, 1.05, hkB(t, 59.02, 0.2)) : 1; }
    if (hkIn(t, 59.0, 60.2)) P.noBlink = true;
    if (hkIn(t, 59.02, 60.0)) P.hat = [0, -6 * hkPulse(t, 59.1, 0.3), 0];
    L = [[0, [-36, -100]]];   // v2 (review note 4): the cup stays on his knee; it tips forward in his slack hand at 59.0 and he rights it at 60.4
    if (P.gob && t > 58.95 && t < 60.75) P.gob = { ...P.gob, tilt: -0.75 * hkB(t, 58.95, 0.25) * (1 - hkB(t, 60.4, 0.3)), fill: 0.5 - 0.2 * hkB(t, 59.1, 0.6) };
    R = [[0, [40, -70]], [62.04, [80, -100], 0.2], [62.3, [100, -170], 0.9], [63.44, HKH.chin, 0.3]];
    if (t > 63.44) { P.lid = 0.35; P.mouth = 'smile'; }
  }
  if (t >= 64.18 && t < 85.94) {   // S7, S8: the question and the answer
    G = [[64.18, [410, 720]], [68.74, [420, 720]], [74.1, [600, 1060]], [74.56, [410, 730]], [80.34, [480, 1000]], [82.4, [410, 730]], [83.2, [830, 520]], [83.7, [410, 730]], [84.44, [780, 700]], [85.2, [410, 730]]];
    P.tip = 0.08 * hkB(t, 64.18, 0.4) * (1 - hkB(t, 66.0, 0.5)) - 0.06 * hkB(t, 78.4, 0.3) * (1 - hkB(t, 79.6, 0.5));
    P.talk = hkIn(t, 64.18, 65.8) || hkIn(t, 66.0, 68.6) || hkIn(t, 70.6, 72.4) ? 0.35 + 0.5 * Math.abs(Math.sin(t * 11)) : 0;
    P.brow = t < 65.0 ? -0.4 : t < 69.28 ? 0 : t < 78.4 ? -0.3 : t < 84.44 ? -0.6 : -0.5; P.mouth = t > 78.4 && t < 79.6 ? 'o' : t > 69.28 && t < 78.4 ? 'closed' : 'smile';
    if (hkIn(t, 69.28, 74.56)) P.lid = 0.45;
    if (hkIn(t, 74.56, 74.94)) P.noBlink = true;
    if (t > 78.45 && t < 78.9) P.lid = Math.max(hkPulse(t, 78.45, 0.15), hkPulse(t, 78.65, 0.15));
    R = [[0, [30, -90]], [64.18, HKH.up, 0.3], [65.8, [40, -80], 0.3], [73.64, { w: [420, 760] }, 0.15], [74.1, { w: [540, 980] }, 0.15], [74.56, [40, -80], 0.3]];
  }
  if (t >= 99.1 && t < 108.56) {   // S10: the pomegranate
    G = [[99.1, [300, 760]], [101.44, [400, 780]], [104.4, [520, 900]], [105.44, [520, 830]], [106.1, [550, 760]], [107.6, [540, 740]], [108.0, [410, 720]]];
    R = [[0, [30, -90]], [105.7, { w: [535, 815] }, 0.3], [106.1, [70, -140], 0.4]]; P.brow = t > 107.6 ? -0.3 - 0.3 * hkB(t, 107.6, 0.6) : 0; if (t > 107.6) P.lid = 0.2;
    if (t > 106.1) P.after = (c, Q) => { const h = hkHandW(Q, 'R'); shape(c, ell(h[0], h[1] - 6, 14, 14, 14), '#c21a3a', { lw: 3, seed: 880 }); seg(c, h[0], h[1] - 20, h[0] + 3, h[1] - 27, 4, HK_GOLDD, 0); };
  }
  if (t >= 108.56 && t < 121.9) {   // S11
    G = [[108.56, [410, 720]], [110.18, [340, 400]], [112.6, [600, 300]], [113.34, [500, 1050]], [115.06, [380, 1060]], [115.5, [560, 1060]], [115.95, [800, 1060]], [116.9, [620, 1060]], [117.74, [830, 520]], [118.6, [410, 720]], [120.34, [500, 300]], [121.0, [410, 720]]];
    if (hkIn(t, 116.3, 116.55)) P.lid = hkPulse(t, 116.3, 0.25);
    L = [[0, [-36, -100]]]; if (t > 121.3) { P.lid = 0.2 + 0.8 * hkPulse(t, 121.4, 0.45); P.mouth = 'closed'; }
    if (t > 108.56 && t < 110.18) P.after = (c, Q) => { const h = hkHandW(Q, 'R'); shape(c, ell(h[0], h[1] - 6, 14, 14, 14), '#c21a3a', { lw: 3, seed: 880 }); };
  }
  if (t >= 121.9 && t < 131.18) {   // S12: the wonder, the cloud, the cup set down, he stands
    G = [[121.9, [410, 720]], [124.74, [430, 380]], [125.82, [430, 150]], [126.92, [410, 730]], [128.14, [470, 820]], [129.2, [430, 520]], [130.2, [650, 900]], [130.6, [410, 730]]];
    P.lid = t < 122.5 ? 0.2 : 0.2 - 0.2 * hkB(t, 122.5, 0.5); if (t > 126.92) P.lid = undefined;
    P.brow = t < 122.5 ? -0.3 : t < 126.92 ? -0.3 - 0.4 * hkB(t, 122.5, 0.5) : -0.2; P.sq *= 1 + 0.05 * hkB(t, 122.5, 0.5) * (1 - hkB(t, 126.9, 0.6));
    P.mouth = t < 126.92 ? 'o' : 'smile';
    if (t > 123.12) { const u = t - 123.12, up = u < 0.4 ? 14 * Math.sin(Math.PI * u / 0.4) : 0, tilt = u < 0.38 ? 0 : 0.087; P.hat = [0, -up, t > 130.6 ? 0.087 * (1 - hkB(t, 130.6, 0.3)) : tilt]; }
    L = [[0, [-36, -100]], [130.2, { w: [652, 875] }, 0.15], [130.45, [-40, -70], 0.3]];
    P.look = t > 130.35 && t < 130.65 ? 4 * Math.sin((t - 130.35) * 21) / 4 : 0;
    P.sit = 1 - hkB(t, 130.6, 0.25); P.sq *= anticipate(t, 130.5, 0.1, 0.05) * landSquash(t, 130.85, 0.06);
    if (t > 130.3) P.gob = null;
  }
  if (t >= 131.18 && t < 137.68) {   // S13: thanks to God
    P.sit = 0; G = [[131.18, [600, 300]], [132.58, [600, -200]], [133.82, [900, 800]], [134.4, [150, 800]], [135.7, [410, 730]]];
    R = [[0, [40, -70]], [131.18, { a: [2.45, 2.85] }, 0.6], [135.7, { w: [440, 780] }, 0.45], [136.8, [40, -70], 0.4]];
    L = [[0, [-40, -70]], [131.25, { a: [-2.45, -2.85] }, 0.6], [135.7, [-40, -70], 0.45]];
    if (t > 132.58 && t < 133.82) P.lid = K.lerp(0.5, 1, hkB(t, 132.6, 0.5)); if (t > 135.7) P.wet = true;
  }
  if (t >= 137.68 && t < 140.4) {   // S14: the order
    P.sit = 0; const tf = turnFlip(t, [[0, -1], [137.68, 1]], 0.35); P.dir = tf.dir; P.sq = 1 - 0.04 * tf.sink; P.brow = 0.3;
    G = [[137.68, [770, 760]], [138.7, [400, 800]], [139.4, [160, 760]]];
    R = [[0, [40, -70]], [138.28, HKH.fwd, 0.12], [139.4, [40, -70], 0.4]]; L = [[0, [-40, -70]]];
    P.talk = hkIn(t, 138.28, 139.0) ? 0.5 + 0.4 * Math.abs(Math.sin(t * 12)) : 0; P.mouth = 'closed';
  }
  if (HK_S16(t)) {   // S16 standing at 370, facing the owner at 250
    P.sit = 0; P.x = 380;
    G = [[151.5, [700, 880]], [152.9, [680, 820]], [154.12, [860, 800]], [154.5, [260, 720]], [157.78, [260, 760]]];
    R = [[0, [40, -70]], [154.12, { w: [860, 800] }, 0.15], [154.3, { w: [300, 770] }, 0.7], [155.6, [40, -70], 0.4], [155.96, HKH.up, 0.25], [157.1, [40, -80], 0.3], [159.18, [95, -150], 0.25], [160.88, [30, -120], 0.4]];
    L = [[0, [-40, -70]], [159.18, [-95, -150], 0.25], [160.88, [-40, -80], 0.4]];
    if (t > 159.18 && t < 160.88) { const g = 0.12 * hkB(t, 159.2, 0.8); P.aR = null; P.aL = null; R = [[0, { a: [1.6 + g, 1.75 + g] }]]; L = [[0, { a: [-1.6 - g, -1.75 - g] }]]; }
    P.talk = hkIn(t, 155.96, 157.1) || hkIn(t, 158.3, 159.9) ? 0.35 + 0.45 * Math.abs(Math.sin(t * 10)) : 0; if (t > 155.96) P.lid = 0.2;
    if (t > 160.88) { P.wet = true; P.drop = 6 * hkB(t, 161.0, 0.3); }
  }
  P.gaze = hkGP(t, P, G, 0.15); hkArms(t, P, R, L);
  if (t >= 115.06 && t < 117.7) P.gaze = gazePlan(t, [[115.06, [-0.9, 0.5]], [115.5, [-0.2, 0.5]], [115.95, [0.6, 0.5]], [116.9, [0.1, 0.4]]], 0.07);
  return P;
}
// the orange that rolls off the fruit tray (45.8) and is caught by the boy (46.3)
function hkOrange(t) { if (t < 45.8 || t > 47.3) return null; if (t < 46.3) { const u = (t - 45.8) / 0.5; return [K.lerp(520, 380, u), u < 0.3 ? K.lerp(954, 1010, u / 0.3) - 10 : 1010 - 14 * Math.abs(Math.sin(u * 9)) * (1 - u)]; }
  return [kfn(t, [[45.9, 300], [46.3, 372]], 'out') + 34, 742]; }

// ---------- the owner ----------
function hkMer(t) {
  const P = hkP(HK_MER, 400, 900, 1, 1, { seed: 71, mouth: 'smile' });
  let G = [[0, [520, 700]]], R = [[0, [-18, -112]]], L = [[0, [22, -105]]];   // folded (right over left)
  if (t < 42.84) {
    G = [[30.62, [520, 700]], [31.92, [300, 760]], [33.3, [520, 700]], [38.2, [622, 880]], [38.9, [520, 700]]];
    if (t > 35.5 && t < 36.1) L = [[0, [22, -105]], [35.55, { w: [hkBoyX4(t) - 30, 700] }, 0.15], [36.0, [22, -105], 0.2]];
    if (t > 38.1) R = [[0, [-18, -112]], [38.2, [90, -110], 0.2], [38.9, [-18, -112], 0.3]];
    P.lid = 0.3;
  } else if (t < 64.18) {
    G = [[42.84, [600, 700]], [42.95, [140, 720]], [44.6, [300, 800]], [45.8, () => hkOrange(t) || [500, 1000]], [46.6, [600, 720]], [52.46, [600, 700]], [63.44, [600, 700]]];
    R = [[0, [-18, -112]], [42.9, [12, -132], 0.1], [43.1, [60, -132], 0.12], [43.4, [12, -132], 0.1], [43.6, [-18, -112], 0.3]];
    L = [[0, [22, -105]], [42.9, [-8, -132], 0.1], [43.1, [-60, -132], 0.12], [43.4, [-8, -132], 0.1], [43.6, [22, -105], 0.3]];
    if (t > 52.46) { P.lid = 0.3; P.tip = 0.02 * Math.sin((t - 52.46) * 4); }
    P.after = (c) => { for (const h of [43.0, 43.5]) if (t > h && t < h + 0.07) star(c, 400, 770, 18, C.white, 0); };
  } else {
    // seated on the cushion at 420 from 66.4
    P.x = t < 66.4 ? 400 : K.lerp(400, 410, hkB(t, 66.4, 0.4)); P.y = t < 66.4 ? 900 : K.lerp(900, 879, hkB(t, 66.4, 0.4)); P.sit = hkB(t, 66.4, 0.45); P.seat = 'floor';
    G = [[64.18, [600, 700]]]; P.drop = 3 * (hkPulse(t, 66.9, 0.3) + hkPulse(t, 67.5, 0.3));
    if (t < 99.1 && t >= 74.94) {   // S8 the answer
      G = [[74.94, [600, 700]], [79.6, [560, 1000]], [80.6, [600, 700]], [84.44, [560, 1000]]];
      P.look = hkIn(t, 74.94, 76.4) ? 5 * Math.sin((t - 74.94) * 8.6) : hkIn(t, 77.8, 78.3) ? 5 * Math.sin((t - 77.8) * 12) : 0; P.brow = hkIn(t, 74.94, 79.6) ? -0.5 : 0;
      P.talk = hkIn(t, 74.94, 76.4) || hkIn(t, 79.6, 83.7) ? 0.35 + 0.5 * Math.abs(Math.sin(t * 10)) : 0;
      R = [[0, [-18, -112]], [74.94, [60, -100], 0.25], [77.26, HKH.ear, 0.2], [77.8, [60, -100], 0.25], [79.6, [40, -80], 0.3], [83.1, { w: [520, 560] }, 0.2], [83.7, [40, -80], 0.3]];
      L = [[0, [22, -105]], [74.94, [-60, -100], 0.25], [79.6, { w: [520, 920] }, 0.35], [80.4, [-40, -100], 0.3], [84.44, [-20, -150], 0.3]];
      P.sq = 1 + 0.02 * hkPulse(t, 79.8, 0.5);
      if (t > 84.44) P.gob = { side: 'L', fill: 0.5, tilt: -0.5 * hkPulse(t, 84.6, 0.6) };
    }
    if (t >= 99.1 && t < 108.56) { G = [[99.1, [250, 760]], [102.0, [520, 760]], [104.4, [600, 720]]]; }
    if (t >= 108.56 && t < 121.9) {   // S11
      G = [[108.56, [600, 700]], [110.18, [330, 420]], [111.58, [450, 420]], [112.6, [700, 330]], [113.34, [500, 1050]], [114.2, [600, 700]], [119.0, [700, 520]], [119.6, [600, 700]]];
      P.talk = hkIn(t, 108.56, 110.1) || hkIn(t, 113.34, 114.5) ? 0.3 + 0.4 * Math.abs(Math.sin(t * 10)) : 0;
      R = [[0, [-18, -112]], [108.56, HKH.wave, 0.25], [110.1, [-18, -112], 0.3], [113.34, HKH.low, 0.2], [114.3, [-18, -112], 0.3], [120.7, [60, -100], 0.25]];
      L = [[0, [22, -105]], [120.7, [-60, -100], 0.25]]; if (hkIn(t, 108.56, 110.1)) P.aR = null;
      P.drop = 6 * hkPulse(t, 113.34, 0.4) + 4 * hkPulse(t, 119.2, 0.35); if (t > 120.7) P.lid = 0.3;
    }
    if (t >= 121.9 && t < 131.18) {   // S12: unaware, plumping the cushion at 500, humming
      G = [[121.9, [600, 700]], [127.6, [500, 880]], [129.3, [600, 700]]];
      if (t > 127.8 && t < 129.3) { R = [[0, [-18, -112]], [127.8, { w: [495, 865] }, 0.2], [129.2, [-18, -112], 0.3]]; P.lid = 0.5; P.drop = 3 * Math.abs(Math.sin(t * 6)); P.tip = 0.08; }
    }
    if (t >= 131.18 && t < 151.5) {   // S13, S14
      P.drop = 10 * hkB(t, 132.7, 0.3) * (1 - hkB(t, 133.9, 0.4)); G = [[131.18, [600, 640]], [132.7, [500, 1000]], [133.9, [600, 640]], [137.68, [700, 700]], [138.7, [300, 760]]];
      if (t > 136.18) { R = [[0, [-18, -112]], [136.18, HKH.chest, 0.25], [137.3, [-18, -112], 0.3]]; P.lean = 0.15 * hkPulse(t, 136.2, 1.1); if (hkIn(t, 136.4, 136.6)) P.lid = 1; }
    }
  }
  if (HK_S16(t)) {   // S16 standing at 250
    // v2 (review note 7): a body width from the caliph; "me?" finger to chest, a look over his shoulder, then cheeks, tremble, eyes wide, kneel
    P.x = 210; P.y = 900; P.sit = 0; P.lean = 0; P.drop = 0; P.mouth = t < 153.62 ? 'smile' : 'o';
    G = [[151.5, [380, 700]], [152.9, [620, 840]], [153.62, [500, 820]], [153.72, [620, 820]], [153.82, [740, 820]], [153.92, [860, 820]], [154.4, [380, 700]], [155.7, [-100, 690]], [156.15, [380, 700]]];
    P.brow = t > 153.62 ? (t > 155.22 ? -0.8 : -0.7) : 0; if (hkIn(t, 153.6, 154.0) || hkIn(t, 157.0, 158.6)) P.noBlink = true;
    if (hkIn(t, 157.0, 160.88)) P.eyes = 'wide';
    if (hkIn(t, 155.7, 156.15)) P.tilt = -0.08;
    R = [[0, [-18, -112]], [155.22, HKH.chest, 0.15], [157.0, HKH.cheek, 0.15], [160.88, HKH.heart, 0.3]];
    L = [[0, [22, -105]], [157.0, [-34, -180], 0.15], [160.88, [-36, -62], 0.3]];
    P.kneel = hkB(t, 157.35, 0.3) * (1 - hkB(t, 160.88, 0.4)); if (hkIn(t, 157.0, 157.6)) P.x += tremble(t, 2.5);
    if (t > 160.88) { P.wet = true; P.mouth = 'smile'; P.lean = 0.15 * hkPulse(t, 161.1, 0.6); }
  }
  P.gaze = hkGP(t, P, G, t > 153.6 && t < 154.0 ? 0.07 : 0.18); hkArms(t, P, R, L);
  return P;
}

// ---------- the vizier ----------
function hkViz(t) {
  if (HK_S16(t)) { const P = hkP(HK_VIZ, 570, 868, 0.9, -1, { seed: 61, mouth: 'smile', gaze: t < 152.9 ? [-1, 0.2] : t < 154.4 ? [0.3, 0.6] : [-1, 0] }); P.brow = t > 152.9 ? -0.5 : 0; return P; }
  if (t < 35.6) return null;
  const P = hkP(HK_VIZ, 770, 879, 1, -1, { seed: 61 });
  if (t < 38.92) { const xf = (tt) => kfn(tt, [[35.6, 120], [38.4, 770]], 'inOut'), W = hkWalk(xf, t, 13); Object.assign(P, { x: W.x, y: 885, ph: W.ph, amp: W.amp, dir: 1, gaze: [1, 0] }); P.y = K.lerp(885, 879, hkB(t, 38.5, 0.4)); if (t > 38.4) P.dir = -1; return P; }
  P.sit = hkB(t, 38.92, 0.4); P.seat = 'floor'; P.sq = impactSquash(t, 39.3, 0.94);
  let G = [[38.92, [600, 760]], [41.9, [770, 600]], [42.4, [600, 760]]], R = [[0, [36, -62]]], L = [[0, [-36, -62]]];
  if (t > 41.9 && t < 42.6) { P.gaze = [0, -1]; P.mouth = t > 42.3 ? 'o' : 'closed'; }
  if (t >= 42.84 && t < 58.22) {
    G = [[42.84, [600, 760]], [43.15, [140, 720]], [45.22, [520, 1000]], [45.9, () => hkOrange(t) || [400, 1000]], [46.68, [700, 960]], [47.1, [700, 1000]], [47.9, [770, 500]], [48.5, [700, 1000]], [49.5, [870, 760]], [50.5, [620, 1060]]];
    R = [[0, [36, -62]], [47.2, { w: [712, 965] }, 0.7], [47.9, [10, -88], 0.2], [48.6, [36, -62], 0.3], [50.5, [30, -150], 0.4]];
    P.mouth = hkIn(t, 46.68, 47.1) ? 'o' : t > 47.1 ? 'smile' : 'closed'; if (hkIn(t, 47.9, 48.5)) P.lid = 0.3;
    if (t > 50.5) P.after = (c, Q) => { const h = hkHandW(Q, 'R'); shape(c, [[h[0] - 9, h[1] - 8], [h[0], h[1] - 16], [h[0] + 9, h[1] - 8], [h[0], h[1]], [h[0] - 9, h[1] - 8]], HK_GOLDD, { lw: 3, seed: 881 }); };
  }
  if (t >= 58.22 && t < 64.18) { G = [[58.22, [600, 1000]], [59.3, [700, 1000]], [60.0, [600, 700]]]; R = [[0, [30, -150]]];
    if (t < 59.3) P.after = (c, Q) => { const h = hkHandW(Q, 'R'); shape(c, [[h[0] - 9, h[1] - 8], [h[0], h[1] - 16], [h[0] + 9, h[1] - 8], [h[0], h[1]], [h[0] - 9, h[1] - 8]], HK_GOLDD, { lw: 3, seed: 881 }); };
    else if (t < 59.8) P.after = (c, Q) => { const y = fallY(t, 59.3, 59.75, 780, 990); shape(c, [[731, y - 8], [740, y - 16], [749, y - 8], [740, y], [731, y - 8]], HK_GOLDD, { lw: 3, seed: 881 }); };
    P.mouth = t > 59.3 ? 'o' : 'closed'; }
  if (t >= 64.18 && t < 99.1) { G = [[64.18, [600, 700]], [65.86, [410, 720]], [74.94, [410, 720]], [84.44, [600, 700]], [85.3, [410, 720]]];
    P.tip = 0.1 * hkB(t, 65.86, 0.4) * (1 - hkB(t, 79.6, 0.6)); R = [[0, [36, -62]], [65.86, HKH.ear, 0.3], [79.6, [36, -62], 0.4]]; L = [[0, [-36, -62]], [84.44, [-60, -100], 0.25], [85.4, [-36, -62], 0.3]];
    if (t > 84.44 && t < 85.4) R = [[0, [60, -100]]]; if (hkIn(t, 74.56, 74.94)) P.noBlink = true; }
  if (t >= 99.1 && t < 131.18) { G = [[99.1, [300, 760]], [105.0, [600, 760]], [106.48, [800, 860]], [107.3, [870, 760]], [108.56, [500, 720]]];
    if (t > 106.0 && t < 108.6) { R = [[0, [10, -110]], [106.8, { w: [835, 830] }, 0.4], [107.5, [10, -110], 0.3]]; L = [[0, [-10, -112]]]; P.mouth = 'closed'; P.sq = 1.02;
      P.after = (c, Q) => { const h = hkHandW(Q, 'L'); for (let i = 0; i < 3; i++) shape(c, [[h[0] - 8 + i * 6, h[1] - 6 - i * 8], [h[0] + i * 6, h[1] - 14 - i * 8], [h[0] + 8 + i * 6, h[1] - 6 - i * 8], [h[0] + i * 6, h[1] + 2 - i * 8], [h[0] - 8 + i * 6, h[1] - 6 - i * 8]], HK_GOLDD, { lw: 2.5, seed: 882 }); }; } }
  if (t >= 131.18 && t < 137.68) { P.drop = 10 * hkB(t, 132.85, 0.3) * (1 - hkB(t, 134.0, 0.4)); G = [[131.18, [600, 640]], [132.85, [600, 1000]], [134.0, [600, 640]]]; }
  if (t >= 137.68) {   // S14: jolts up, gulps, salutes, runs to the gate
    G = [[137.68, [600, 680]]]; P.sit = 1 - hkB(t, 138.3, 0.18); P.mouth = hkIn(t, 138.35, 138.6) ? 'o' : 'closed'; P.eyes = t > 138.28 && t < 138.7 ? 'wide' : undefined;
    R = [[0, [36, -62]], [138.35, HKH.chest, 0.12], [138.55, [38, -206], 0.1], [138.75, [60, -110], 0.2]];
    if (t > 138.66) { const xf = (tt) => kfn(tt, [[138.66, 770], [139.85, 140]], 'in'), W = hkWalk(xf, t, 10); Object.assign(P, { x: W.x, y: 885, ph: W.ph, amp: Math.min(1.2, W.amp * 1.2), dir: -1, sit: 0, tip: 0.14, alpha: 1 - hkB(t, 139.7, 0.15) }); G = [[0, [100, 760]]]; }
  }
  P.gaze = hkGP(t, P, G, 0.15); if (t > 41.9 && t < 42.6) P.gaze = [0, -1]; hkArms(t, P, R, L);
  return P;
}
// ---------- the guards ----------
function hkGuard(i, t) {
  if (HK_S16(t)) { const x = i ? 830 : 700, P = hkP(HK_GRD[i], x, 868, 0.9, -1, { seed: 51 + i * 5, mouth: 'smile' });
    P.gaze = t < 152.9 ? [0.2, 0.5] : t < 154.4 ? [0, 0.7] : [-1, 0]; P.lean = t < 151.9 ? 0.25 : 0.25 * (1 - hkB(t, 151.9, 0.4)) - 0.08 * hkPulse(t, 152.2, 0.6);
    P.aR = hkArm(t, P, 1, [[0, [44, -112]]]); P.aL = hkArm(t, P, -1, [[0, [-60, -90]], [152.0, [-30, -80], 0.3]]); return P; }
  if (t < 35.9 + i * 0.3) return null;
  const sx = [870, 945][i], P = hkP(HK_GRD[i], sx, i ? 900 : 879, 1, -1, { seed: 51 + i * 5 });
  const tw = 38.6 + i * 0.3;
  if (t < tw) { const xf = (tt) => kfn(tt, [[35.9 + i * 0.3, 120], [tw, sx]], 'inOut'), W = hkWalk(xf, t, 12); Object.assign(P, { x: W.x, y: 885, ph: W.ph, amp: W.amp, dir: 1, gaze: [1, 0] }); P.aR = hkArm(t, P, 1, [[0, [44, -112]]]); return P; }
  const ts = 39.22 + i * 0.3; P.sit = hkB(t, ts, 0.35); P.seat = 'floor';
  if (i === 0) { P.y = 879 + 12 * hkB(t, ts + 0.2, 0.2) - 6 * hkB(t, 40.6, 0.4); P.mouth = t > ts + 0.25 && t < 40.8 ? 'o' : 'closed'; P.eyes = t > ts + 0.25 && t < 40.4 ? 'wide' : undefined; }
  P.spearRot = i === 1 ? -1.35 * hkB(t, 39.3, 0.4) * (1 - hkB(t, 40.0, 0.45)) : 0;   // v2: planted upright again (review note 9)
  let G = [[0, [600, 760]], [43.2 + i * 0.1, [140, 720]], [45.2, [520, 1000]], [47.7, [770, 760]], [48.3, [850, 980]], [50.4, [600, 760]]], R = [[0, [44, -112]]], L = [[0, [-36, -62]]];
  if (i === 0 && t >= 49.5 && t < 50.3) { R = [[0, [44, -112]], [49.5, { w: [842, 972] }, 0.15], [49.7, [40, -130], 0.15]]; P.sq = 0.97; P.x += tremble(t, 3, 11) * (t > 49.65 ? 1 : 0); P.mouth = 'o'; }
  if (i === 0 && t >= 106.48 && t < 108.56) { G = [[106.48, [770, 760]], [107.6, [900, 860]]]; L = [[0, [-36, -62]], [106.6, [-90, -140], 0.2], [107.2, [-60, -100], 0.3]]; P.look = hkIn(t, 106.6, 107.1) ? 4 * Math.sin((t - 106.6) * 20) : 0; }
  if (t >= 64.18 && t < 99.1) { G = [[64.18, [600, 700]], [74.56 + i * 0.1, [410, 720]], [80.0, [600, 700]]]; if (hkIn(t, 74.56, 74.94)) P.noBlink = true; }
  if (t >= 131.18 && t < 137.68) { P.drop = 10 * hkB(t, 133.0 + i * 0.15, 0.3) * (1 - hkB(t, 134.1, 0.4)); G = [[0, [600, 1000]], [134.1, [600, 660]]]; }
  if (t > 138.9 + i * 0.12) { const xf = (tt) => kfn(tt, [[138.9 + i * 0.12, sx], [140.35, 150 + i * 70]], 'in'), W = hkWalk(xf, t, 11); Object.assign(P, { x: W.x, y: 885, ph: W.ph, amp: Math.min(1.2, W.amp), dir: -1, sit: 0, tip: 0.1, spearRot: 0 }); G = [[0, [100, 760]]]; }
  P.gaze = hkGP(t, P, G, 0.15); hkArms(t, P, R, L);
  return P;
}
// ---------- servants ----------
const HK_EMERGE = [[330, -1, 255], [640, 1, 715], [930, -1, 862], [140, 1, 205]];   // trunk (or gate) x, step direction, first stand x
function hkServ(i, t) {
  const S = HK_SERV[i];
  if (HK_S16(t)) { if (i > 1) return null; const P = hkP(S, i ? 55 : 110, 880, 0.9, 1, { mouth: 'smile', gaze: [1, 0] }); if (i === 0 && hkIn(t, 155.22, 156.4)) { P.aR = hkArm(t, P, 1, [[155.3, HKH.fwd, 0.15]]); P.gaze = [1, 0.1]; } return P; }
  if (t < 30.62) return null;
  const [tx, sd, x0] = HK_EMERGE[i], t0 = 31.92 + i * 0.15;
  if (t < 42.84) {
    if (t < t0) return null;
    let x = t < t0 + 0.35 ? tx + sd * 30 : K.lerp(tx + sd * 30, x0, hkB(t, t0 + 0.35, 0.5));
    const retreat = [240, 170, 1060, 105][i];
    const plump = [470, 715, 905, 205][i];
    if (t > 36.6) x = K.lerp(x0, plump, hkB(t, 36.6, 0.4)); if (t > 38.2) x = K.lerp(plump, retreat, hkB(t, 38.2 + i * 0.1, 1.2));
    const xf = (tt) => (tt < t0 + 0.35 ? tx + sd * 30 : tt < 36.6 ? K.lerp(tx + sd * 30, x0, hkB(tt, t0 + 0.35, 0.5)) : tt < 38.2 ? K.lerp(x0, plump, hkB(tt, 36.6, 0.4)) : K.lerp(plump, retreat, hkB(tt, 38.2 + i * 0.1, 1.2)));
    const W = hkWalk(xf, t, 12), P = hkP(S, x, 885, 0.95, sd, { ph: W.ph, amp: W.amp, mouth: 'smile' });
    if (i < 3) { if (sd < 0) P.clipR = tx - 23; else P.clipL = tx + 23; } else P.alpha = hkB(t, t0, 0.3);
    if (t > t0 + 0.9) { P.clipL = undefined; P.clipR = undefined; }
    P.gaze = t < t0 + 0.35 ? [sd, -0.1] : hkG(P, [520, 700]); P.sq = 0.97;
    const rug = [0, -1, 1, 2][i], drop = [34.12, 0, 34.6, 35.0][i];
    if (rug >= 0 && t < drop) P.after = (c, Q) => { const h = hkHead(Q); hkRoll(c, h[0] - 6 * sd, h[1] + 52 + 3 * Math.sin(Q.ph || 0), 150, rug, 0.08 * sd); };
    let R = [[0, [36, -110]]], L = [[0, [-36, -110]]];
    if (t > drop && t < 35.6 && rug >= 0) { R = [[0, HKH.offer], [drop + 0.5, [36, -62], 0.3]]; L = [[0, [-92, -150]], [drop + 0.5, [-36, -62], 0.3]]; P.lean = 0.2 * hkPulse(t, drop, 0.6); }
    if (t > 36.8 && t < 38.2) { P.lean = 0.35; R = [[0, [80, -60 + 10 * Math.abs(Math.sin((t - 36.8) * (8 + i * 2)))]]]; L = [[0, [-36, -62]]]; P.gaze = [sd * 0.4, 1]; if (i === 1 && t > 37.6) { P.lean = 0; P.tilt = 0.12; } }
    if (t > 38.2) { R = [[0, [36, -62]]]; L = [[0, [-36, -62]]]; }
    hkArms(t, P, R, L); return P;
  }
  if (t < 53.5) {   // S5: the file with trays (S0..S2), S3 tosses from the gate
    if (i === 3) { const P = hkP(S, 205, 885, 0.95, 1, { mouth: 'smile', seed: 32 }); P.gaze = hkG(P, [600, 1000]);
      const toss = [50.05, 50.55, 51.05].find((a) => t > a - 0.3 && t < a + 0.25);
      hkArms(t, P, [[0, [36, -150]], ...[50.05, 50.55, 51.05].flatMap((a) => [[a - 0.25, [10, -110], 0.2], [a, [100, -190], 0.12], [a + 0.15, [36, -150], 0.2]])], [[0, [-36, -150]]]);
      if (t > 44.8 && t < 51.05) P.after = (c, Q) => { const k = [50.05, 50.55, 51.05].findIndex((a) => t < a); if (k < 0) return; const h = hkHandW(Q, 'R'), base = [50.05, 50.55, 51.05][k] - 0.42; hkTray(c, h[0] - 6, h[1] - 6, 0.6 * (k === 0 ? 1 : K.ease.back(K.clamp((t - base) / 0.2))), HK_TRAYS[3 + k][0]); };
      return P; }
    const [kind, tx2, ty2, land] = HK_TRAYS[i], at = [470, 670, 820][i], tin = 44.0 + i * 0.3, tk = land - 0.3;
    if (t < tin) return null;
    const xf = (tt) => (tt < tk ? kfn(tt, [[tin, 110], [tk, at]], 'inOut') : kfn(tt, [[land + 0.35, at], [land + 2.6, 110]], 'inOut')), W = hkWalk(xf, t, 12);
    const back = t > land + 0.35, P = hkP(S, xf(t), 885, 0.95, back ? -1 : 1, { ph: W.ph + i, amp: W.amp, mouth: 'smile' });
    P.kneel = t < tk ? 0 : hkB(t, tk, 0.25) * (1 - hkB(t, land + 0.1, 0.25)); P.gaze = t < tk ? [1, -0.2] : hkG(P, [tx2, ty2]); P.alpha = 1 - hkB(t, land + 2.35, 0.25);
    hkArms(t, P, [[0, [30, -228]], [tk, [80, -110], 0.25], [land + 0.3, [36, -62], 0.3]], [[0, [-30, -228]], [tk, [-20, -110], 0.25], [land + 0.3, [-36, -62], 0.3]]);
    if (t < land) P.after = (c, Q) => { const a = hkHandW(Q, 'R'), b = hkHandW(Q, 'L'), m = hkMid(a, b), u = hkB(t, land - 0.12, 0.12); hkTray(c, K.lerp(m[0], tx2, u), K.lerp(m[1] + 2 + 2 * Math.sin((Q.ph || 0) * 2 + 1), ty2, u), K.lerp(0.75, 1, u), kind); };
    return P;
  }
  if (t >= 58.22 && t < 64.18) { if (i !== 3) return null; const xf = (tt) => kfn(tt, [[60.6, -20], [61.0, 210]], 'out'), P = hkP(S, xf(t), 885, 0.95, 1, { mouth: 'o', seed: 32, tip: -0.15 * hkPulse(t, 60.95, 0.5), gaze: [1, 0] });
    P.after = (c) => { if (t > 60.6 && t < 61.2) for (let k = 0; k < 4; k++) seg(c, xf(t) - 60 - k * 18, 720 + k * 40, xf(t) - 140 - k * 18, 720 + k * 40, 5, C.white, 2); }; if (t > 61.0) P.sq = landSquash(t, 61.0, 0.1); return P; }
  if (t >= 99.1 && t < 108.56) {   // S10: the chain (v2, review note 12): spaced out to the owner's left, one pomegranate tray travels hand to hand over the heads
    const x = [95, 200, 305, 505][i], P = hkP(S, x, 878, 0.92, 1, { mouth: 'smile' }), ph = (t - 101.44) * 6 - i * 0.9, tp = hkPassTray(t);
    if (t < 101.44) { P.gaze = hkG(P, [200, 780]); P.aL = hkArm(t, P, -1, [[0, [-36, -62]]]); return P; }
    P.y += 3 * Math.max(0, Math.sin(ph)); P.gaze = tp ? hkG(P, tp) : hkG(P, [x + 60 * Math.cos(ph), 780]);
    const reachL = 0.5 + 0.5 * Math.cos(ph), near = tp ? K.clamp(1 - (Math.abs(tp[0] - x) - 40) / 50) : 0;
    P.aL = armTo(-1, HK_SH, [K.lerp(-36, -80, reachL), K.lerp(-62, -130, reachL)]); P.aR = armTo(1, HK_SH, [K.lerp(36, 80, 1 - reachL), K.lerp(-62, -130, 1 - reachL)]);
    if (near > 0) { const aR = hkAng(P, 1, { w: [tp[0] + 14, tp[1] + 4] }), aL = hkAng(P, -1, { w: [tp[0] - 14, tp[1] + 4] }); P.aR = P.aR.map((v, j) => K.lerp(v, aR[j], near)); P.aL = P.aL.map((v, j) => K.lerp(v, aL[j], near)); }
    if (i === 3 && t > 104.9) { const k = hkB(t, 104.9, 0.4); P.x = K.lerp(505, 520, k); P.y = K.lerp(878, 905, k); P.z = 901; P.kneel = hkB(t, 105.1, 0.35); P.drop = 6 * hkB(t, 105.3, 0.3); P.gaze = [1, 0.4];
      P.aR = hkArm(t, P, 1, [[0, { w: [tp[0] + 14, tp[1] + 4] }]]); P.aL = hkArm(t, P, -1, [[0, { w: [tp[0] - 14, tp[1] + 4] }]]); }
    if (i === 3) P.after = (c) => { if (tp) hkTray(c, tp[0], tp[1], 0.7, 'pomeg', {}); };
    return P;
  }
  return null;
}
// the S10 pomegranate tray: from the heap, hand to hand over the heads, to the kneeling servant in front of the caliph
function hkPassTray(t) {
  if (t < 101.44) return null; const K0 = [[101.44, 160, 860, 0], [101.95, 95, 676, 60], [102.6, 200, 676, 60], [103.25, 305, 676, 60], [104.3, 505, 676, 120], [105.45, 545, 815, 0]];
  for (let k = 1; k < K0.length; k++) { const [t1, x1, y1, h] = K0[k], [t0, x0, y0] = K0[k - 1]; if (t < t1) { const u = K.ease.inOut(K.clamp((t - t0) / (t1 - t0 - 0.12))); return [K.lerp(x0, x1, u), K.lerp(y0, y1, u) - h * Math.sin(Math.PI * u)]; } }
  return [545, 815];
}
// ---------- the boy ----------
function hkBoy(t) {
  if (HK_S16(t)) { const P = hkP(HK_BOY, 930, 905, 1, -1, { mouth: 'smile', gaze: t > 152.9 ? [-0.6, 0.5] : [-1, 0] }); P.tip = 0.35 * hkB(t, 160.0, 0.25) * (1 - hkB(t, 160.9, 0.3)); return P; }
  if (t < 35.06 || (t > 53.5 && t < 99.1) || t > 108.56) return null;
  if (t < 42.84) { const xf = hkBoyX4, W = hkWalk(xf, t, 9), P = hkP(HK_BOY, xf(t), 900, 1, t > 37.2 ? -1 : 1, { ph: W.ph, amp: W.amp, mouth: t > 36.6 ? 'smile' : 'closed', gaze: [1, 0] });
    P.tip = t < 36.08 ? 0.05 * Math.sin(t * 8) : 0; return P; }
  if (t < 53.5) {   // the orange: dive and catch
    const xf = (tt) => kfn(tt, [[45.9, 300], [46.3, 372]], 'out'), P = hkP(HK_BOY, xf(t), 900, 1, 1, { mouth: t > 46.35 ? 'smile' : 'o', gaze: [1, 0.6] });
    P.tip = 0.45 * hkB(t, 45.95, 0.25) * (1 - hkB(t, 46.35, 0.3)); P.y = 900 - 30 * hkPulse(t, 45.95, 0.45);
    if (t > 46.35 && t < 47.3) P.aR = [2.5, 2.7];
    if (t > 45.8 && t < 47.3) P.gaze = lookAt([P.x, 790], hkOrange(t) || [P.x, 790]);
    return P; }
  // S10: the armful at the end of the chain, then to the guards
  const xf = (tt) => kfn(tt, [[103.4, 560], [105.4, 905]], 'inOut'), W = hkWalk(xf, t, 9), P = hkP(HK_BOY, xf(t), 905, 1, 1, { ph: W.ph, amp: W.amp, mouth: 'smile' });
  P.tip = -0.1 * hkB(t, 102.0, 0.6) + 0.04 * Math.sin(t * 7) * (t > 102 ? 1 : 0); if (t < 101.9) P.alpha = hkB(t, 101.5, 0.3);
  const n = Math.min(7, 3 + Math.floor(Math.max(0, t - 101.98) / 0.2)) - (t > 106.48 ? Math.min(5, Math.floor((t - 106.48) / 0.3)) : 0);
  P.after = (c, Q) => { for (let k = 0; k < n; k++) hkSprite(c, ['bread', 'fruit', 'sweets', 'rice'][k % 4], Q.x + 18 + Math.sin(t * 7 + k) * k * 0.8, 860 - k * 26, 0.5); };
  return P;
}

// ---------- the garden, drawn ----------
function hkGarden(ctx, t, cam) {
  // v2 (review note 4): in the 115-117.7 close-up the back set slides 80 px so the trunk no longer rises out of the caliph's crown
  const bx = t < 115.06 || t > 118.3 ? 0 : t < 117.7 ? 80 : 80 * (1 - hkB(t, 117.7, 0.6));
  ctx.drawImage(hkGardenBack(), bx, 0, 1000, 1230); if (bx) ctx.drawImage(hkGardenBack(), 0, 0, bx + 2, 1230, 0, 0, bx + 2, 1230); hkGardenShade(ctx, t);
  // the vizier's bay horse waits outside the gate (seen through the arch), gallops off (S14)
  if (t > 137.68 && t < 140.4) { ctx.save(); K.poly(ctx, townArchPts(HK_GIN.gate[0], HK_GIN.gate[1], HK_GIN.gateTop, 900, 'pointed'), true); ctx.clip();
    const hx = t < 139.9 ? 170 : K.lerp(170, -150, K.ease.in(K.clamp((t - 139.9) / 0.45))), HP = { x: hx, y: 880, s: 0.42, dir: -1, pal: 1, gallop: t > 139.9 ? 1 : 0, ph: t * 14, amp: t > 139.9 ? 1 : 0, seed: 31 };
    if (t > 139.85) rideOn(ctx, 'horse', HP, { costume: 'vizier', s: 0.4, seed: 61 }); else horse(ctx, HP); ctx.restore(); }
  // rugs
  if (t >= 34.12) { hkRug(ctx, 250, 505, 885, 985, hkB(t, 34.12, 0.6, 'out') * (1 + 0.06 * hkPulse(t, 34.5, 0.3)), 0); hkRug(ctx, 950, 600, 885, 985, hkB(t, 34.6, 0.6, 'out'), 1); hkRug(ctx, 200, 950, 985, 1095, hkB(t, 35.0, 0.7, 'out'), 2, { skew: 20 }); }
  // S13: the light shaft (v2, review note 8): behind the figures, about 15 % opacity, three narrow beams
  if (t > 131.18 && t < 137.68) { const k = (0.6 + 0.4 * hkB(t, 132.58, 0.5)) * hkB(t, 131.18, 0.5) * (1 - hkB(t, 136.9, 0.7)); ctx.save(); ctx.fillStyle = '#fff3a8';
    [[850, 890, 520, 580, 0.16], [905, 935, 600, 650, 0.13], [955, 980, 680, 720, 0.1]].forEach(([a, b, c, d, o]) => { ctx.globalAlpha = o * k; ctx.beginPath(); ctx.moveTo(a, 150); ctx.lineTo(b, 150); ctx.lineTo(d, 905); ctx.lineTo(c, 905); ctx.closePath(); ctx.fill(); }); ctx.restore(); }
  // the heap at the gate (S10)
  if (t > 99.1 && t < 108.56) hkHeap(ctx, t);
  if (HK_S16(t)) { ctx.save(); ctx.globalAlpha *= 0.5; hkGlow(ctx, 680, 860, 380, t, 0.8 * hkB(t, 152.9, 0.8)); ctx.restore(); }   // v2 (review note 7): the chest rays behind every figure, half opacity
  const C0 = hkCushions(t), people = [];
  const add = (P, z) => { if (P) people.push([z ?? P.y, P]); };
  for (let i = 0; i < 4; i++) { const P = hkServ(i, t); add(P, P && P.z ? P.z : 870 + i * 0.1); }
  add(hkViz(t), t > 138.66 && t < 140.4 ? 860 : undefined); add(hkGuard(0, t)); add(hkGuard(1, t)); add(hkMer(t), 899); add(hkCal(t), 900); add(hkBoy(t), t < 36.08 ? 901 : 899.5);
  // cushions under the seated (draw first), the tower over the boy (after)
  C0.filter((c) => t >= 36.08 + c.i * 0.12).forEach((c) => hkDrawCushion(ctx, c));
  // S16 chests (behind the front people? chests sit on the rug in front of the vizier and guards)
  people.sort((a, b) => a[0] - b[0]);
  const chestZ = 880;
  let chestsDone = !HK_S16(t);
  for (const [z, P] of people) {
    if (!chestsDone && z > chestZ) { hkChestsS16(ctx, t); chestsDone = true; }
    hkDraw(ctx, P);
  }
  if (!chestsDone) hkChestsS16(ctx, t);
  C0.filter((c) => t < 36.08 + c.i * 0.12).forEach((c) => hkDrawCushion(ctx, c));
  // the goblet set down on the rug (130.3)
  if (t >= 130.3 && t < 151.5) hkGoblet(ctx, 652, 902, 0.75, { fill: 0.5 });
  // trays and the spread
  if (t >= 53.0 && !HK_S16(t)) HK_EXTRA.forEach(([k, x, y], i) => hkSprite(ctx, k, x, y, 0.8 * (t < 58.22 ? 0 : 1)));
  for (let k = 0; k < 6; k++) { const p = hkTrayPos(t, k); if (!p) continue; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot || 0); hkTray(ctx, 0, 0, 1, p.kind, { missing: k === 0 && t > 45.8, frost: k === 2 ? hkB(t, 49.4, 0.4) : 0, t }); ctx.restore(); }
  if (t > 51.6 && t < 140.4) steam(ctx, 800, 990, t);
  const o = hkOrange(t); if (o) shape(ctx, ell(o[0], o[1], 12, 12, 12), HK_ORANGE, { lw: 3, seed: 883 });
  // S4: trunks in front while the servants emerge; leaf on the vizier
  if (t > 31.5 && t < 33.4) for (const x of [330, 640, 930]) hkTrunkFront(ctx, x);
  hkLeaf(ctx, t, 41.56, [740, 430], [775, 690], 0.44); if (t > 42.0 && t < 42.3) { ctx.save(); ctx.translate(775, 690); shape(ctx, [[-12, 0], [0, -7], [12, 0], [0, 7], [-12, 0]], GREEN2, { lw: 3, seed: 770 }); ctx.restore(); }
  if (t > 42.3 && t < 42.84) hkLeaf(ctx, t, 42.3, [775, 690], [900, 560], 0.5);
  // fruit glints
  for (const [x, y, a] of [[520, 958, 113.95], [850, 975, 114.3], [430, 1030, 114.6], [520, 958, 134.6], [700, 980, 134.85], [850, 975, 135.1], [620, 1040, 135.35]]) { const k = hkPulse(t, a, 0.45); if (k) star(ctx, x, y, 16 * k, C.white, t * 3); }
  // S8: the sun icon over the roofline
  if (t > 83.72 && t < 84.45) { const u = hkB(t, 83.72, 0.62, 'lin'); ctx.save(); ctx.translate(K.lerp(720, 940, u), 450 - 70 * Math.sin(Math.PI * u)); ctx.scale(0.3, 0.3); sun(ctx, 0, 0, t); ctx.restore(); }
  if (t > 83.1 && t < 83.8) for (const [x, a] of [[738, 83.15], [830, 83.3], [922, 83.45]]) { const k = hkPulse(t, a, 0.35); if (k) star(ctx, x, 525, 14 * k, C.white, 0); }
  // S12 emphasis lines behind the caliph's head
  if (t > 123.12 && t < 123.9) { const h = hkHead(hkCal(t)); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5, r0 = 60, r1 = 60 + 50 * hkB(t, 123.12, 0.3); seg(ctx, h[0] + Math.cos(a) * r0, h[1] + Math.sin(a) * r0, h[0] + Math.cos(a) * r1, h[1] + Math.sin(a) * r1, 5, C.black, 0); } }
  // S11: icons over the back wall from the house
  if (t > 117.74 && t < 118.9) for (let k = 0; k < 5; k++) { const u = K.clamp((t - 117.74 - k * 0.12) / 0.7); if (u <= 0) continue; const dst = HK_TRAYS[(k + 1) % 6]; ctx.save(); ctx.globalAlpha = 1 - K.clamp((u - 0.85) / 0.15); hkSprite(ctx, dst[0], K.lerp(820 - k * 30, dst[1], u), K.lerp(520, dst[2], u) - 200 * Math.sin(Math.PI * u), 0.55); ctx.restore(); }
  // S12: coins trickle down from the cloud and become trays
  if (t > 129.2 && t < 130.4) for (let k = 0; k < 6; k++) { const t0 = 129.2 + k * 0.1, u = K.clamp((t - t0) / 0.6); if (u <= 0 || u >= 1) continue; const x = 330 + k * 40, y = K.lerp(500, 1000, u * u);
    if (u < 0.7) hkCoin(ctx, x, y, 14, { spin: t * 8 + k, col: HK_GOLD, dot: HK_GOLDD }); else hkSprite(ctx, ['fruit', 'dome', 'sweets'][k % 3], x, y + 20, 0.5 * ((u - 0.7) / 0.3)); }
  // clouds and balloons
  hkGardenClouds(ctx, t);
}
function hkHeap(ctx, t) { const R = K.rng(7), kinds = ['fruit', 'jugs', 'cushion', 'bread', 'sweets', 'dome', 'rice'];
  for (let i = 0; i < 14; i++) { const row = Math.floor(i / 4), x = 140 + (i % 4) * 36 + row * 14 + R() * 8, y = 900 - row * 46, t0 = 100.4 + i * 0.07; if (t < t0) continue; hkSprite(ctx, kinds[i % 7], x, fallY(t, t0, t0 + 0.2, y - 160, y) - rebound(t, t0 + 0.2, 6), 0.62); } }
function hkChestsS16(ctx, t) {
  if (!HK_S16(t)) return;
  [500, 620, 740, 860].forEach((x, i) => { const y = i === 3 ? fallY(t, 151.6, 151.9, 870, 905) : 905; hkChest(ctx, x, y, 0.88, { lid: hkB(t, 152.9 + i * 0.15, 0.3), fill: 1, sq: i === 3 ? impactSquash(t, 151.9, 0.85) : 1 }); });
  if (t > 160.0 && t < 160.9) { const a = hkPulse(t, 160.0, 0.9); hkGhostChest(ctx, 980, 905, 0.88, a); hkGhostChest(ctx, 1100, 905, 0.88, a * 0.7); sfx(ctx, '+', 960, 760, 80, a, { fill: C.yellow }); }
  if (t > 160.2 && t < 160.8) { const b = hkBoy(t), h = [b.x - 18, b.y - 118]; for (const dx of [-9, 9]) star(ctx, h[0] + dx, h[1], 9 * hkPulse(t, 160.2, 0.6), C.yellow, t * 4); }
}
function hkGardenClouds(ctx, t) {
  const cal = hkCal(t), ch = hkHead(cal), mh = hkHead(hkMer(t));
  // S7-S8: the suspicion cloud
  if (t > 68.74 && t < 79.6) thoughtCloud(ctx, 500, 455, 500, 300, t, { p: hkB(t, 68.74, 0.5, 'lin') * (1 - hkB(t, 79.3, 0.3, 'lin')), tail: [ch[0] - 20, ch[1] - 50], scale: 0.63, at: [600, 700], bg: '#dff0ff', seed: 6, inside: (c) => hkDreamSpy(c, t) });   // v2 (review note 11): inner scene 1.5x, ground line low
  if (t > 79.3 && t < 79.9) { const u = hkB(t, 79.3, 0.5, 'out'); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(500 + Math.cos(a) * 220 * (0.7 + u), 455 + Math.sin(a) * 130 * (0.7 + u), 30, 26, 14), C.white, { lw: 4, seed: 890 }); ctx.restore(); } }
  // S11: the banquet balloon that sags and blows away
  if (t > 110.18 && t < 113.3) { const drift = hkB(t, 112.6, 0.7, 'in'), sag = hkB(t, 111.58, 0.8);
    hkBalloon(ctx, 330 + 700 * drift, 440 - 60 * drift + 30 * sag, 300, 220, [mh[0] + 20, mh[1] - 50], hkB(t, 110.18, 0.3), (c) => {
      hkTray(c, 0, 70, 1.3, 'dome', { col: C.yellow }); for (const sd of [-1, 1]) hangingLamp(c, sd * 95, -70, t, { lit: 1 });
      const n = 7; for (let k = 0; k < n; k++) { const u = k / (n - 1), x = -130 + 260 * u, y0 = -80 + 30 * Math.sin(Math.PI * u); const fall = sag * (k + 1) * 14; shape(c, [[x - 12, y0 + fall], [x + 12, y0 + fall], [x, y0 + 26 + fall + 4 * Math.sin(t * 9 + k)], [x - 12, y0 + fall]], k % 2 ? C.red : C.blue, { lw: 3, seed: 891 }); } },
      { sy: 1 - 0.3 * sag, rot: 0.15 * drift }); }
  // S12: one tray = one coin, the pile bursts the cloud
  if (t > 124.74 && t < 129.98) { const p = hkB(t, 124.74, 0.4, 'lin') * (1 - hkB(t, 129.4, 0.5, 'lin')), burst = hkB(t, 125.82, 0.35);
    const CY = 350, H = t < 125.12 ? 0 : t < 125.32 ? 40 : t < 125.52 ? 90 : t < 125.82 ? 150 : 150 + 90 * burst;
    if (burst > 0) hkGlow(ctx, 470, 450 - H * 0.4, 260, t, 0.7 * burst * p);
    ctx.save(); if (burst > 0) { ctx.translate(430, CY); ctx.scale(1, 1 + 0.08 * hkPulse(t, 125.82, 0.5)); ctx.translate(-430, -CY); }
    thoughtCloud(ctx, 430, CY, 480, 320, t, { p, tail: [ch[0] - 20, ch[1] - 55], scale: 1, at: [0, 0], bg: '#fff7d0', seed: 9, inside: (c) => {
      if (t > 124.9) { hkSprite(c, 'fruit', -135, 22, 1.4); const e = hkB(t, 125.0, 0.2); if (e > 0) for (const dy of [-16, 16]) shape(c, K.rectPts(-72, -40 + dy - 8 * e, 56, 16 * e), C.white, { lw: 4, seed: 895 }); hkCoin(c, 40, -38, 52, { col: HK_GOLD, dot: HK_GOLDD, spin: t * 3 }); }   // v2: 2x
      const fl = [125.12, 125.32, 125.52].filter((a) => t > a).length; if (fl) { c.save(); c.translate(150, -45); c.scale(0.6, 0.6); c.scale(1, Math.abs(Math.cos((t - [125.12, 125.32, 125.52][fl - 1]) * 15)) * (t - 125.52 < 0.12 ? 1 : 1)); c.fillStyle = [C.yellow, C.blue, '#e2701a'][(fl - 1) % 3]; c.fillRect(-45, -35, 90, 70); ink(c, K.rectPts(-45, -35, 90, 70), 4, 892); c.restore(); }
      if (H > 0 && burst <= 0) hkCoinPile(c, 40, 165, 240, H, { col: HK_GOLD, dot: HK_GOLDD, seed: 5 }); } });
    ctx.restore();
    if (burst > 0) { ctx.save(); ctx.globalAlpha *= p; hkCoinPile(ctx, 470, 515, 240 + 120 * burst, H, { col: HK_GOLD, dot: HK_GOLDD, seed: 5 }); ctx.restore(); }
  }
  // S16: the caliph's balloon: the goblet with a heart, then a cushion and a tray
  if (t > 157.78 && t < 161.0) hkBalloon(ctx, 420, 410, 320, 210, [ch[0] + 20, ch[1] - 60], hkB(t, 157.78, 0.3, 'lin') * (1 - hkB(t, 160.8, 0.2, 'lin')), (c) => {
    hkGoblet(c, -90, 40, 1.2, { fill: 1 }); heart(c, -40, -40, 22 * K.ease.back(K.clamp((t - 157.9) / 0.3)));
    if (t > 158.28) { c.save(); c.translate(30, 50); c.scale(K.ease.back(K.clamp((t - 158.28) / 0.25)), K.ease.back(K.clamp((t - 158.28) / 0.25))); hkCushion(c, 0, 0, { w: 80, h: 26 }); c.restore(); }
    if (t > 158.43) { c.save(); c.translate(105, 50); const k = K.ease.back(K.clamp((t - 158.43) / 0.25)); c.scale(k, k); hkTray(c, 0, 0, 0.8, 'fruit'); c.restore(); } });
}
// inside the S7 cloud (world units around [520, 700], scale 0.42): the owner spying over his wall, the procession, the frantic stacking, then "?" and the red X
function hkDreamSpy(c, t) {
  c.fillStyle = C.blue; c.fillRect(-200, 0, 1500, 900); c.fillStyle = SANDL; c.fillRect(-200, 896, 1500, 400); hillTrees(c, { n: 14, seed: 3 });
  shape(c, K.rectPts(560, 820, 700, 80), HK_CREAM, { lw: 6, seed: 893, dot: HK_CREAMD, pitch: 9, rad: 0.2, da: 0.4 });
  // the procession as black silhouettes, right to left
  if (t > 70.8 && t < 73.6) for (let k = 0; k < 3; k++) { const x = K.lerp(1100, 100, (t - 70.8) / 2.8) + k * 260; horse(c, { x, y: 900, s: 0.6, dir: -1, ph: t * 6 + k, amp: 1, silhouette: true }); c.fillStyle = C.black; c.beginPath(); c.arc(x + 10, 640, 26, 0, 7); c.fill(); c.fillRect(x - 18, 660, 56, 80);
    if (k === 0) { seg(c, x + 40, 760, x + 40, 560, 5, C.black, 0); shape(c, [[x + 40, 560], [x - 30, 575], [x + 40, 595], [x + 40, 560]], C.red, { lw: 3, seed: 894 }); } }
  const frenzy = t > 71.48 && t < 77.0, frozen = t >= 77.0;
  if (!frenzy && !frozen) { const P = hkP(HK_MER, 700, 880, 1.1, -1, { seed: 72, gaze: [-1, 0], brow: 0.3 }); P.aR = hkArm(t, P, 1, [[0, [26, -190]]]); hkDraw(c, P); shape(c, K.rectPts(560, 820, 700, 80), HK_CREAM, { lw: 6, seed: 893, dot: HK_CREAMD, pitch: 9, rad: 0.2, da: 0.4 });
    if (t > 69.6) hkBang(c, 700, 560, hkB(t, 69.6, 0.3, 'lin')); }
  else { const tt = frozen ? 77.0 : t, spots = [380, 520, 660], x = spots[Math.floor(tt * 5) % 3] + 0 * Math.sin(tt), P = hkP(HK_MER, x, 900, 1.1, 1, { seed: 72, mouth: 'o', eyes: 'wide', ph: tt * 30, amp: frozen ? 0 : 1, tip: 0.1 });
    hkDraw(c, P); if (!frozen) drops(c, x + 40, 640, t, 3);
    [71.6, 72.0, 72.4].forEach((a, k) => { if (t > a) hkTray(c, 300 + k * 0, 900 - k * 34, 1.2 * K.ease.back(K.clamp((t - a) / 0.2)), ['fruit', 'sweets', 'dome'][k]); }); }
  if (t > 73.64 && t < 77.0) sfx(c, '?', 870, 600, 250, hkB(t, 73.64, 0.3, 'lin'), { fill: C.yellow });   // v2: in the right half, beside the owner
  for (const [a, x0, y0, x1, y1] of [[77.0, 250, 480, 950, 930], [77.3, 950, 480, 250, 930]]) { const u = hkB(t, a, 0.15, 'lin'); if (u > 0) { c.save(); c.lineCap = 'round'; c.lineWidth = 60; c.strokeStyle = C.red; c.beginPath(); c.moveTo(x0, y0); c.lineTo(K.lerp(x0, x1, u), K.lerp(y0, y1, u)); c.stroke(); c.restore(); } }
}
// S10 overlay: the dismount replayed in an inset circle (top right of the panel)
function hkReplay(ctx, t) {
  const p = hkB(t, 99.1, 0.2, 'lin') * (1 - hkB(t, 101.0, 0.2, 'lin')); if (p <= 0) return;
  const tr = 27.4 + (t - 99.3) * (1.0 / 1.4);
  hkInset(ctx, 790, 250, 150, p, (c) => { c.save(); c.scale(0.5, 0.5); c.translate(-1200, -770);
    c.drawImage(hkRoadMid(), 0, 0, 2200, 1230); c.drawImage(hkRoadWall(), 0, 0, 2200, 920);
    const HP = { x: 1130, y: 900, s: 0.8, dir: 1, pal: 0, seed: 30 };
    if (tr < 27.85) rideOn(c, 'horse', HP, { costume: 'caliph', s: 0.76, seed: 81, mouth: 'smile', sq: anticipate(tr, 27.6, 0.25, 0.08) });
    else { horse(c, HP); hkDraw(c, hkCalS3(Math.min(tr, 28.35))); } c.restore(); }, { wash: 0.3 });
}
