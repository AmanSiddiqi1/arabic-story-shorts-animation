// ===== AN-112 court: S12 the hearing, S13 the dream, S14 the reveal, S15 the gifts, S18 the judge's turban; S19 the judge's court =====
// palaceHall palace variant: door arch 40..250, dais 560..900 (top 860), throne x 730 (sitY 848). Abu kneels on the carpet facing the throne.
const A112_THRONE = { x: 730, sitY: 848 }, A112_DAIS = 860;
const a112CourtLate = (t) => t >= 150.76;
// ---------------- Caliph al-Maamun ----------------
const a112CalX = (t) => a112Tr(t, [[0, 730], [103.0, 690, 0.6], [112.0, 640, 0.01], [127.04, 730, 0.7], [150.7, 730, 0.01], [157.3, 680, 0.6]]);
function a112Caliph(t) {
  const late = a112CourtLate(t), W = a112Walk(a112CalX, t, 24);
  const P = { costume: 'caliph', age: 0.4, s: 1.05, dir: -1, seed: 91, seat: 'bench', ...W };
  if (P.amp < 0.04) P.amp = 0;
  P.sit = late ? a112Tr(t, [[0, 1], [157.18, 0, 0.35]]) : a112Tr(t, [[0, 1], [102.9, 0, 0.4], [127.3, 1, 0.5]]);
  P.y = K.lerp(A112_DAIS, A112_THRONE.sitY, P.sit);
  P.lean = 0.12 * a112Win(t, 96.96, 99.0, 0.3) + 0.06 * a112Win(t, 155.88, 157.1, 0.25);
  P.sq = breathe(t, 9) * anticipate(t, 102.75, 0.2, 0.05) * (a112In(t, 159.22, 160.3) ? 1 + 0.06 * a112Win(t, 159.4, 160.2, 0.2) : 1);
  P.y -= 10 * a112Win(t, 159.4, 160.2, 0.2);   // up on the toes
  P.drop = a112Nods(t, [155.9, 156.4], 0.3, 7);
  P.talk = talk(t, [[96.96, 97.9], [99.06, 99.8], [102.9, 104.7], [112.6, 114.5], [116.6, 117.2], [127.04, 127.8], [158.46, 159.2], [160.4, 161.0]], 0.9) * 0.7;
  P.mouth = a112In(t, 102.2, 104.7) || a112In(t, 112.6, 128) || a112In(t, 155.0, 166) ? 'smile' : a112In(t, 101.88, 102.9) ? (t > 102.3 ? 'smile' : 'closed') : 'closed';
  P.brow = a112Tr(t, [[0, -0.4], [101.88, -0.2], [112.6, -0.3]]);
  let lid = 0.3 * a112Win(t, 155.88, 157.1, 0.2) + 0.3 * a112Win(t, 127.04, 127.9, 0.2); lid = Math.max(lid, blink(t, 91)); P.lid = Math.min(1, lid);
  const AH = () => a112Head(a112CourtAbu(t, true));
  P.gaze = a112Look(t, P, [[0, AH], [101.88, [270, 520]], [102.2, [440, 520]], [102.5, [610, 520]], [102.8, AH], [103.0, [700, 250]], [104.0, AH], [113.7, [180, 700]], [114.6, AH], [116.1, [200, 700]], [116.9, [330, 960]], [117.6, AH],
    [120.4, [200, 700]], [120.9, AH], [123.74, [400, 960]], [124.9, AH], [158.4, [560, 700]], [159.4, [520, 560]], [160.26, AH]], 0.16);
  const R = [[0, A112H.rest], [96.96, A112H.wave, 0.2], [97.25, [60, -170], 0.15], [97.5, A112H.wave, 0.15], [97.8, A112H.rest, 0.3], [99.06, A112H.palm, 0.3], [100.2, A112H.rest, 0.3], [101.88, A112H.chin, 0.3],
    [102.9, A112H.up, 0.25], [104.4, A112H.rest, 0.3], [112.6, A112H.palm, 0.3], [113.7, A112H.fwd, 0.25], [114.6, A112H.rest, 0.3],
    [116.08, [14, -136], 0.1], [116.22, [40, -136], 0.08], [116.32, [14, -136], 0.08], [116.46, [40, -136], 0.08], [116.6, A112H.rest, 0.3], [119.8, [14, -136], 0.1], [119.95, [40, -136], 0.08], [120.1, A112H.rest, 0.3],
    [123.2, [14, -136], 0.1], [123.35, [40, -136], 0.08], [123.5, A112H.rest, 0.3], [127.04, A112H.wave, 0.2], [127.3, [50, -170], 0.15], [127.55, A112H.rest, 0.3],
    [155.88, A112H.cover, 0.3], [157.1, A112H.rest, 0.2], [157.18, [14, -136], 0.08], [157.3, [40, -136], 0.08], [157.42, A112H.rest, 0.3], [158.9, { w: [560, 680] }, 0.35], [159.4, A112H.raise, 0.6], [160.3, A112H.fwd, 0.3], [161.0, A112H.rest, 0.4], [162.0, A112H.palm, 0.3], [163.6, A112H.rest, 0.3]];
  const L = [[0, A112H.restL], [96.96, A112H.restL], [102.9, A112H.restL], [112.6, A112H.palmL, 0.3], [114.0, A112H.restL, 0.3], [116.08, [-14, -136], 0.1], [116.6, A112H.restL, 0.3], [119.8, [-14, -136], 0.1], [120.1, A112H.restL, 0.3],
    [123.2, [-14, -136], 0.1], [123.5, A112H.restL, 0.3], [157.18, [-14, -136], 0.08], [157.42, A112H.restL, 0.3], [158.9, { w: [540, 690] }, 0.35], [159.4, A112H.raiseL, 0.6], [160.3, A112H.restL, 0.4]];
  P.aR = a112Arm(t, P, 1, R); P.aL = a112Arm(t, P, -1, L);
  return P;
}
// ---------------- Abu at court ----------------
function a112CourtAbu(t, light = false) {
  const late = a112CourtLate(t);
  const xf = late ? (tt) => a112Tr(tt, [[0, 120], [153.02, 410, 1.3], [156.2, 455, 0.6]]) : (tt) => a112Tr(tt, [[0, 130], [97.2, 400, 1.0]]);
  const P = { costume: 'physician', age: 0.55, s: 1.1, dir: 1, seed: 31, pal: late ? { head: 'none', robe: C.white, dot: '#b9b4c6' } : { head: 'none' }, ...a112Walk(xf, t, 24), y: 900 };
  if (P.amp < 0.04) P.amp = 0;
  P.kneel = late ? 0 : a112Tr(t, [[0, 0], [98.1, 1, 0.4]]);
  if (light) return P;
  P.sq = breathe(t, 7) * landSquash(t, 98.5, 0.05) * (a112In(t, 115.18, 116.08) ? 0.9 + 0.14 * A112B(t, 115.4, 0.5) : 1) * (late ? impactSquash(t, 160.26, 0.85) : 1);
  P.tip = (late ? 0.25 * a112Win(t, 154.62, 155.3, 0.2) + 0.1 * a112Win(t, 164.4, 165.1, 0.2) : 0.5 * a112Win(t, 126.58, 127.4, 0.2) + 0.08 * a112Win(t, 97.2, 98.4, 0.2) + 0.06 * a112Win(t, 119.44, 120.3, 0.2));
  P.drop = (late ? 0 : 4) + a112Nods(t, [99.9, 100.6], 0.3, 4);
  P.look = late ? a112Tr(t, [[0, 0], [158.46, 0.6], [158.7, -0.9, 0.2], [158.95, 0.9, 0.2], [159.2, 0, 0.2]]) : 0;
  P.tilt = 0.1 * a112Win(t, 103.84, 104.7, 0.2) - 0.08 * a112Win(t, 158.7, 159.1, 0.12);
  P.talk = talk(t, [[99.82, 102.0], [115.4, 116.0]], 0.2) * 0.75;
  P.mouth = a112In(t, 115.18, 116.08) ? 'open' : a112In(t, 160.6, 166) || a112In(t, 153.0, 155.0) || a112In(t, 120.0, 122.7) ? 'smile' : a112In(t, 122.8, 123.7) || a112In(t, 158.46, 159.2) ? 'o' : a112In(t, 112.6, 115.1) ? 'frown' : 'closed';
  P.brow = a112Tr(t, [[0, -0.5], [103.84, -0.6], [104.8, -0.4], [113.6, -0.7], [115.18, -0.2], [122.8, -0.8], [123.8, -0.3], [153, -0.2], [158.46, -0.6], [160.6, -0.3]]);
  P.eyes = a112In(t, 160.3, 160.8) ? 'wide' : 'open';
  P.wet = a112In(t, 99.82, 102.9) || a112In(t, 115.18, 127.9);
  let lid = 0.3 * a112Win(t, 119.44, 120.6, 0.2) + 0.8 * (a112Pulse(t, 103.9, 0.18) + a112Pulse(t, 104.25, 0.18)) + 0.3 * a112Win(t, 97.2, 98.5, 0.2);
  if (P.eyes !== 'wide') lid = Math.max(lid, blink(t, 31)); P.lid = Math.min(1, lid);
  const CH = () => a112Head(a112Caliph(t)), G = () => a112Head(a112CourtGuard(t, 0));
  P.gaze = a112Look(t, P, [[0, [400, 960]], [98.5, [400, 980]], [99.82, CH], [100.6, [270, 520]], [101.06, [440, 520]], [101.42, [610, 520]], [101.9, CH], [113.7, G], [114.62, G], [115.18, CH],
    [116.7, [300, 970]], [117.3, CH], [119.44, [300, 960]], [120.42, [450, 970]], [121.0, CH], [122.8, [300, 900]], [123.1, [450, 970]], [123.4, CH], [123.74, [600, 970]], [125, CH],
    [153.02, [400, 300]], [153.8, CH], [157.18, [200, 700]], [158.46, [560, 650]], [159.22, (tt) => a112TurbanPos(tt)], [160.6, CH], [162.2, [300, 330]], [163.8, CH], [164.38, [560, 800]], [165.0, CH]], 0.14);
  const R = [[0, A112H.rest], [97.2, [30, -126], 0.3], [99.82, A112H.palm, 0.3], [100.4, [60, -140], 0.25], [100.8, A112H.palm, 0.25], [101.3, [60, -140], 0.25], [101.8, A112H.palm, 0.25], [102.9, [30, -110], 0.3],
    [119.44, { w: [300, 930] }, 0.3], [119.9, [28, -100], 0.35], [126.5, [70, -60], 0.2], [127.4, [28, -100], 0.3],
    [154.62, A112H.chest, 0.2], [155.3, A112H.rest, 0.3], [158.7, A112H.chest, 0.2], [159.2, A112H.rest, 0.3], [160.6, [30, -214], 0.15], [160.9, A112H.rest, 0.3], [164.38, { w: [560, 790] }, 0.3], [165.0, [50, -126], 0.3]];
  const L = [[0, A112H.restL], [97.2, [-6, -126], 0.3], [99.82, A112H.palmL, 0.3], [100.4, [-50, -150], 0.25], [100.8, A112H.palmL, 0.25], [101.3, [-50, -150], 0.25], [101.8, A112H.palmL, 0.25], [102.9, [-6, -110], 0.3],
    [119.44, { w: [270, 930] }, 0.3], [119.9, [-6, -100], 0.35], [126.5, [60, -60], 0.2], [127.4, [-6, -100], 0.3], [164.38, { w: [530, 790] }, 0.3], [165.0, [-10, -126], 0.3]];
  P.aR = a112Arm(t, P, 1, R); P.aL = a112Arm(t, P, -1, L);
  return P;
}
// the judge's turban: on the servant's cushion, taken by the Caliph, lifted, lands on Abu (160.26)
function a112TurbanPos(t) {
  const S = a112Servant(t), cu = [S.x + 4, S.y - 210 * 1.1 * 0.62 - 50];
  if (t < 159.22) return cu;
  const A = a112CourtAbu(t, true), h = a112Head({ ...A, kneel: 0 }), top = [540, 520];
  if (t < 159.9) { const u = A112B(t, 159.22, 0.68); return [K.lerp(cu[0], top[0], u), K.lerp(cu[1], top[1], u) - 40 * Math.sin(Math.PI * u)]; }
  const u = A112B(t, 159.9, 0.36, 'in'); return [K.lerp(top[0], h[0], u), K.lerp(top[1], h[1], u)];
}
// ---------------- palace servant boy ----------------
function a112Servant(t) {
  const late = a112CourtLate(t);
  const xf = late ? (tt) => a112Tr(tt, [[0, -80], [157.4, 570, 1.0], [159.5, 330, 0.8], [163.4, 560, 0.9], [164.9, -80, 1.2]]) + (late ? 18 * Math.sin((tt - 157.4) * 6) * a112Win(tt, 157.5, 158.3, 0.2) : 0)
    : (tt) => a112Tr(tt, [[0, -80], [116.1, 300, 0.55], [117.0, -80, 0.6], [119.85, 450, 0.55], [120.7, -80, 0.65], [123.74, 640, 1.15], [126.0, -80, 1.0]]);
  const P = { costume: 'servant', child: true, s: 1.1, seed: 95, ...a112Walk(xf, t, 18), y: 900 };
  P.dir = (late ? a112In(t, 159.5, 160.3) || a112In(t, 164.9, 166) : a112In(t, 116.7, 117.6) || a112In(t, 120.42, 121.4) || a112In(t, 125.4, 127)) ? -1 : 1;
  if (!late && a112In(t, 123.74, 124.9)) P.dir = -1;   // drags the big purse backwards
  if (P.amp < 0.04) P.amp = 0;
  P.hidden = P.x < -40;
  P.mouth = a112In(t, 120.42, 121.4) || a112In(t, 124.9, 125.4) ? 'open' : 'smile';
  P.sit = !late && a112In(t, 124.9, 125.4) ? a112Win(t, 124.9, 125.4, 0.1) : 0; P.seat = 'floor';
  P.tip = !late && a112In(t, 123.74, 124.9) ? -0.15 * Math.abs(Math.sin((t - 123.74) * Math.PI * 2.6)) : 0;
  P.gaze = late && t < 158.4 ? [0, -1] : [1, 0.2];
  if (late && t < 159.25) { P.aR = A112H.raise.a; P.aL = A112H.raiseL.a; }
  else if (!late && (a112In(t, 116.0, 116.7) || a112In(t, 119.8, 120.42))) { P.aR = A112H.raise.a; P.aL = A112H.raiseL.a; }
  else if (!late && a112In(t, 123.74, 124.9)) { P.handR = [-60, -100]; P.handL = [-70, -96]; }
  else if (late && a112In(t, 163.8, 164.6)) { P.handR = [70, -120]; }
  return P;
}
// ---------------- guards in the court ----------------
function a112CourtGuard(t, i) {
  const late = a112CourtLate(t), P = { ...A112_GUARD(i ? C.blue : C.red), y: 900, s: i ? 1.0 : 0.95, seed: 81 + i, dir: 1, x: late ? (i ? 265 : 25) : 225 };
  P.brow = 0.6; P.mouth = a112In(t, 114.62, 116.2) ? 'smile' : 'frown'; P.drop = a112Nods(t, [114.7], 0.3, 6);
  P.lid = blink(t, 81 + i);
  P.gaze = a112Look(t, P, [[0, [600, 700]], [114.62, [430, 720]]], 0.2);
  P.aR = [0.3, 0.4];
  P.spearUp = late ? 18 * a112Pulse(t, 152.4 + (i ? 0.15 : 0), 0.3) : 0;
  if (!late && a112In(t, 114.4, 116.5)) { P.aL = a112Arm(t, P, -1, [[0, A112H.restL], [114.62, [50, -200], 0.25], [115.0, [60, -186], 0.12], [115.2, [50, -200], 0.12]]); }
  return P;
}

// ---------------- the court ----------------
function a112Court(ctx, t, cam) {
  const late = a112CourtLate(t);
  palaceHall(ctx, { variant: 'palace', wall: 'blue', lampsLit: true, t });
  const Ca = a112Caliph(t), Ab = a112CourtAbu(t), Sv = a112Servant(t);
  const guards = late ? [a112CourtGuard(t, 0), a112CourtGuard(t, 1)] : (t >= 112.6 && t < 116.2 ? [a112CourtGuard(t, 0)] : t < 102.9 ? [a112CourtGuard(t, 0)] : []);
  guards.forEach((G, i) => a112DrawGuard(ctx, t, G, i ? C.blue : C.red));
  if (!late && t >= 114.4 && t < 116.5 && guards[0]) { const h = a112HandW(guards[0], 'L'); a112Scroll(ctx, h[0], h[1] - 120, { L: 150, w: 80, portrait: 1, s: 0.95 }); }
  person(ctx, Ca);
  // Abu and the gift purses (S15)
  const pursesS15 = !late && t >= 116.7;
  if (pursesS15) {
    const p1 = t < 119.44 ? [300, 905] : (() => { const h = a112HandW(Ab, 'R'), u = A112B(t, 119.44, 0.4); return [K.lerp(300, h[0] - 10, u), K.lerp(905, h[1] - 14, u)]; })();
    if (t >= 120.42) a112Purse(ctx, 450, 905, { s: 0.85, sq: impactSquash(t, 120.42, 0.8) });
    if (t >= 124.9) a112Purse(ctx, 620, 860, { s: 1.5, sq: impactSquash(t, 124.9, 0.8), rot: 0.05 });
    person(ctx, Ab); a112Hat(ctx, Ab, 'scholar', { dx: 6, rot: -0.14, tail: swing(t, 127.0, 0.8) });
    a112Purse(ctx, p1[0], p1[1], { s: 0.85, sq: impactSquash(t, 116.7, 0.8) });
  } else {
    person(ctx, Ab);
    const onHead = late && t >= 160.26;
    if (!onHead) a112Hat(ctx, Ab, 'scholar', late ? { dx: 0, rot: 0 } : { dx: 6, rot: -0.14 });
    else a112Hat(ctx, Ab, 'judge', { k: 1.15, dy: a112Tr(t, [[0, 34], [160.6, 6, 0.3]]), rot: 0 });
  }
  // servant and what he carries
  if (!Sv.hidden) {
    if (!late && a112In(t, 123.74, 124.9)) { const sx = Sv.x + 90; a112Purse(ctx, sx, 860 - 6 * Math.abs(Math.sin((t - 123.74) * Math.PI * 2.6)), { s: 1.5, rot: -0.3 }); }
    person(ctx, Sv);
    if (!late && (a112In(t, 116.0, 116.7) || a112In(t, 119.8, 120.42))) { const h = a112HandW(Sv, 'R'); a112Purse(ctx, h[0] - 8, h[1] - 70, { s: 0.85 }); }
    if (late && t < 159.22) { const h = a112HandW(Sv, 'R'), h2 = a112HandW(Sv, 'L'); a112TurbanCushion(ctx, (h[0] + h2[0]) / 2, (h[1] + h2[1]) / 2 - 4, 0.8); }
    if (late && t >= 159.22 && t < 164.6) { const h = a112HandW(Sv, 'R'), h2 = a112HandW(Sv, 'L'); a112TurbanCushion(ctx, (h[0] + h2[0]) / 2, (h[1] + h2[1]) / 2 - 4, 0.8, false); }
    if (late && a112In(t, 163.8, 164.6)) { const h = a112HandW(Sv, 'R'); a112Purse(ctx, h[0], h[1] - 40, { s: 0.45 }); a112Scroll(ctx, h[0] + 20, h[1] - 50, { L: 60, w: 50, s: 0.6, seal: 1, rot: -1.4, lines: false }); }
  }
  if (late && t >= 159.22 && t < 160.26) { const p = a112TurbanPos(t); ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(1.1, 1.1); a112HatShape(ctx, 'judge', { k: 1.15 }); ctx.restore(); }
  if (late && t >= 164.6) { const h = a112HandW(Ab, 'R'); a112Purse(ctx, h[0], h[1] - 40, { s: 0.45, sq: 1 + 0.1 * a112Pulse(t, 165.1, 0.3) }); a112Scroll(ctx, h[0] + 26, h[1] - 50, { L: 60, w: 50, s: 0.6, seal: 1, rot: -1.4, lines: false }); }
  // dust when the big purse tips over, spear-butt thumps (S18)
  if (a112In(t, 124.9, 125.5)) dustBurst(ctx, 620, 900, t - 124.9, 6, 8, 16, 40, 0.5, 6);
  if (late && a112In(t, 152.4, 153.2)) { dustBurst(ctx, 60, 900, t - 152.6, 4, 6, 12, 24, 0.4, 3); dustBurst(ctx, 330, 900, t - 152.75, 4, 6, 12, 24, 0.4, 5); }
}
// ---------------- S13 the dream (inside the thought cloud) ----------------
// a112DreamPicture(c, t, small): world 1000 x 1230; navy night, moon, the Caliph in bed, the glowing HELP balloon
function a112DreamPicture(c, t, small = false) {
  c.fillStyle = A112_NIGHT; c.fillRect(-300, -300, 1600, 1830); c.fillStyle = dotPat(c, '#2a4fae', 14, 0.3); c.fillRect(-300, -300, 1600, 1830);
  stars(c, { w: 1000, h: 700, n: 40, seed: 8 });
  // three nights: the moon sets and rises again (108.3, 108.6, 108.9)
  const nt = small ? 3 : (t < 108.3 ? 1 : t < 108.6 ? 2 : t < 108.9 ? 3 : 3), ph = small ? 1 : a112In(t, 108.3, 109.05) ? ((t - 108.3) % 0.3) / 0.3 : 1;
  const my = 300 + (ph < 1 ? 200 * Math.sin(Math.PI * ph) : 0); if (ph > 0.4 && ph < 0.6) { c.save(); c.globalAlpha = 0.5; c.fillStyle = C.yellow; c.fillRect(-300, -300, 1600, 1830); c.restore(); }
  moon(c, 230, my, 90);
  // bed: frame, pillow, bedpost with the crown
  shape(c, K.rectPts(250, 760, 560, 40), C.yellow, { lw: 6, seed: 500, dot: C.red, pitch: 9, rad: 0.2, da: 0.4 }); for (const lx of [262, 798]) seg(c, lx, 800, lx, 880, 14, C.yellow, 4);
  seg(c, 812, 870, 812, 640, 14, C.yellow, 4); seg(c, 248, 870, 248, 680, 14, C.yellow, 4);
  const cb = 632; shape(c, [[786, cb], [790, cb - 30], [802, cb - 14], [812, cb - 40], [822, cb - 14], [834, cb - 30], [838, cb], [786, cb]], C.yellow, { lw: 4.5, seed: 501, dot: C.red, pitch: 6, rad: 0.2, da: 0.5 });
  shape(c, ell(400, 744, 60, 26, 20), C.white, { lw: 5, seed: 502 });
  const wake = small ? 0 : Math.max(a112Win(t, 107.9, 108.25, 0.12), a112Win(t, 108.42, 108.56, 0.06), a112Win(t, 108.72, 108.86, 0.06), a112Win(t, 109.0, 109.12, 0.05), t > 109.12 ? 1 : 0);
  const sitUp = small ? 0 : (t > 111.7 ? 1 : 0.8 * wake);
  const pokes = small ? 0 : a112Pulse(t, 109.6, 0.3) + a112Pulse(t, 110.1, 0.3);
  const P = { x: 520, y: 760, s: 1.15, dir: 1, costume: 'caliph', age: 0.4, pal: { head: 'smallTurban' }, lie: 1 - sitUp, seed: 91, sq: 1 + 0.1 * pulse(t, 107.9, 0.4), tip: -0.08 * pokes };
  P.lid = small ? 1 : t < 107.9 ? 1 : t > 111.7 ? Math.max(0.4, blink(t, 91)) : wake > 0.5 ? 0 : 0.6; P.eyes = !small && wake > 0.5 && t < 111.7 ? 'wide' : 'open'; if (P.eyes === 'wide') delete P.lid;
  P.mouth = !small && wake > 0.5 ? (t > 111.7 ? 'smile' : 'o') : 'closed';
  if (!small && t > 107.9 && t < 109.1) P.gaze = [Math.sin(t * 9), -0.2];
  if (!small && t > 109.12) P.gaze = lookAt([520, 600], [760, 330]);
  if (t > 111.7 && !small) { P.handL = [-60, -100]; P.handR = [60, -100]; P.drop = a112Nods(t, [111.9, 112.25], 0.3, 8); }
  person(c, P);
  // blanket (rises and falls while asleep)
  const br = small || t < 107.9 ? 4 * Math.sin(t * 2.4) : 0, bt = K.lerp(746, 790, sitUp);
  shape(c, [[430, 800], [440, bt - br], [600, bt - 8 - br], [760, bt - br], [790, 800], [430, 800]], C.blue, { lw: 5, seed: 503, dot: NAVY, pitch: 9, rad: 0.25, da: 0.5 });
  if ((small || t < 107.6) && !wake) zzz(c, 420, 620, t);
  // the glowing jagged balloon (from 107.64 in the film; always in the small retelling)
  const bp = small ? 1 : A112B(t, 107.64, 0.3), glow = 0.6 + 0.4 * Math.sin(t * 8);
  if (bp > 0) { const bx = K.lerp(1100, 700, bp), by = 300; c.save(); c.globalAlpha = 0.35 * glow; c.fillStyle = C.yellow; c.beginPath(); c.arc(bx, by, 230, 0, 7); c.fill(); c.restore();
    c.save(); c.translate(bx, by); const pts = []; for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2, r = i % 2 ? 150 : 190; pts.push([Math.cos(a) * r * 1.25, Math.sin(a) * r * 0.85]); } pts.push(pts[0]);
    shape(c, pts, C.yellow, { lw: 7, seed: 504, dot: C.red, pitch: 10, rad: 0.18, da: 0.4 });
    if (!small && t > 110.54) { c.save(); c.translate(140, -30); a112Scroll(c, 0, -60, { L: 150, w: 90, portrait: A112B(t, 110.54, 0.3), s: 1 }); c.restore(); }
    c.font = K.font(70, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 10; c.strokeStyle = C.white; c.lineJoin = 'round';
    const tx = !small && t > 110.54 ? -60 : 0; c.strokeText('HELP', tx, -40); c.strokeText('ABU HASSAN!', tx, 40); c.fillStyle = C.red; c.fillText('HELP', tx, -40); c.fillText('ABU HASSAN!', tx, 40); c.restore();
    // speed lines as it swoops in
    if (!small && a112In(t, 107.64, 108.1)) for (let i = 0; i < 4; i++) seg(c, bx + 200 + i * 20, by - 80 + i * 50, bx + 320 + i * 40, by - 80 + i * 50, 6, C.white, 2);
    // the arrow that pokes him (109.12-110.4)
    if (!small && a112In(t, 109.12, 110.6)) { const tip = [600 + 30 * pokes, 650 + 20 * pokes], from = [bx - 140, by + 130]; c.save(); c.globalAlpha = a112Fade(t, 109.12, 110.6, 0.15); S0.arrow(c, from, [K.lerp(from[0], tip[0], 0.6 + 0.4 * pokes), K.lerp(from[1], tip[1], 0.6 + 0.4 * pokes)], A112B(t, 109.12, 0.3), { width: 26, bend: -0.1 }); c.restore(); } }
}
// the dream frame: a thought cloud grows from the Caliph's head until its scalloped edge sits inside the panel (104.72-106.1), shrinks back at 112.6
function a112DreamFrame(ctx, t, cam) {
  const grow = A112B(t, 104.72, 1.3), shrink = A112B(t, 112.6, 0.45, 'in'), k = grow * (1 - shrink); if (k <= 0) return;
  const Ca = a112Caliph(Math.min(t, 104.7)), h = a112P(...a112Head(Ca), cam), cx = K.lerp(h[0] - 60, 500, k), cy = K.lerp(h[1] - 140, 615, k), w = K.lerp(220, 1060, k), hh = K.lerp(170, 1300, k), sc = K.lerp(0.18, 0.92, k);
  thoughtCloud(ctx, cx, cy, w, hh, t, { p: t < 112.6 ? K.clamp(0.3 + grow * 1.2) : 1, tail: k < 0.9 ? [h[0] - 20, h[1] - 60] : null, scale: sc, at: [500, 615], bg: A112_NIGHT, fill: A112_NIGHT, seed: 21, inside: (c) => a112DreamPicture(c, t) });
}
// ---------------- S19 the judge's court ----------------
const A112_JDAIS = [300, 700, 860];
function a112Judge(t) {
  const P = { costume: 'physician', age: a112Tr(t, [[0, 0.55], [167.86, 0.9, 1.2]]), s: 1.1, dir: 1, seed: 31, pal: { head: 'none', robe: NAVY, dot: '#2a4fae', sash: C.yellow }, x: 500, y: A112_JDAIS[2], sit: 1, seat: 'bench' };
  const stamps = []; for (let s = 166.0; s < 171.0; s += 0.62) stamps.push(s);
  P.drop = stamps.reduce((a, s) => a + 4 * a112Pulse(t, s, 0.3), 0);
  P.aR = a112Arm(t, P, 1, [[0, [50, -120]], ...stamps.flatMap((s) => [[s - 0.18, [56, -150], 0.16], [s, [56, -112], 0.1]]), [171.0, [50, -120], 0.2], [171.0, A112H.wave, 0.25], [171.2, [60, -186], 0.15], [171.4, A112H.wave, 0.15], [171.6, [50, -120], 0.4], [172.7, [30, -214], 0.2], [173.1, [50, -120], 0.4]]);
  P.aL = a112Arm(t, P, -1, [[0, [-30, -112]]]);
  P.lid = Math.max(0.2, blink(t, 31)); P.mouth = t > 170.96 ? 'smile' : 'closed';
  P.gaze = t > 170.96 ? [0, 1] : [0.5, 0.8];
  if (a112In(t, 172.6, 173.0)) P.lid = 0;
  return P;
}
function a112Crowd(t) {
  const row = [['khor', 160, { costume: 'merchant', pal: A112_KHOR }, 168.66], ['wife', 330, { costume: 'villageWoman' }, 169.8], ['shop1', 500, { costume: 'beanSeller' }, 170.54], ['shop2', 665, { costume: 'carpenter' }, 170.7], ['child', 830, { costume: 'servant', child: true, pal: { robe: C.blue, dot: NAVY, hc: C.yellow } }, 170.96]];
  return row.map(([id, x, o, a], i) => { const P = { x, y: 1330 + 220 * (1 - A112B(t, 168.4 + i * 0.08, 0.5)), s: 1.25, dir: i < 2 ? 1 : -1, seed: 60 + i, ...o };
    P.talk = talk(t, [[a, a + 0.8]], i) * 0.8; P.mouth = t > 170.96 ? 'smile' : t > a + 0.2 ? 'o' : 'closed'; P.brow = t > a ? -0.5 : 0;
    const up = t > 170.96 + i * 0.06, judge = [500, 680];
    P.gaze = up ? lookAt([x, 1000], judge) : i === 0 ? [1, -0.2] : [i < 2 ? 1 : -1, -0.1];
    if (id === 'khor' && a112In(t, 168.66, 169.7)) { P.handL = [-80, -150]; P.handR = [90, -150]; }
    if (id === 'child' && t > 170.96) P.aR = A112H.raise.a;
    P.sq = 1 + 0.03 * a112Pulse(t, a, 0.4); P.lid = up ? 0 : blink(t, 60 + i);
    return P; });
}
function a112JudgeCourt(ctx, t, cam) {
  const u = t < 166.92 ? 0.3 : (0.3 + 6 * A112B(t, 166.92, 1.68, 'in')) % 1;
  palaceHall(ctx, { variant: 'palace', wall: 'paper', throne: false, door: false, dais: A112_JDAIS, u, t });
  const J = a112Judge(t);
  // bench on the dais, the judge, his desk with an open scroll
  shape(ctx, K.rectPts(430, 806, 140, 54), WOOD, { lw: 5, seed: 520, dot: '#7a4212', pitch: 8, rad: 0.2, da: 0.4 });
  person(ctx, J); a112Hat(ctx, J, 'judge', { k: 1.1, dy: 8 + 26 * a112Win(t, 172.6, 173.2, 0.12) });
  shape(ctx, K.rectPts(365, 790, 270, 70), A112_BROWN, { lw: 6, seed: 521, dot: A112_BROWND, pitch: 8, rad: 0.2, da: 0.4 });
  shape(ctx, K.rectPts(380, 782, 120, 12), A112_PAPER, { lw: 3.5, seed: 522 });
  const hits = []; for (let s = 166.0; s < 171.0; s += 0.62) hits.push(s);
  hits.forEach((s, i) => { if (t > s) { ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(400 + (i % 5) * 20, 788, 5, 0, 7); ctx.fill(); ctx.restore(); } });
  // the listeners in a row along the panel bottom (chest up)
  const crowd = a112Crowd(t); crowd.forEach((P) => person(ctx, P));
  return { J, crowd };
}
