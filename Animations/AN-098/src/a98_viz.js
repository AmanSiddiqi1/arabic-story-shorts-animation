// ===== AN-098 Yahya's hall in Baghdad (palaceHall, ochre wall, cushions, desk): S10 (83.28-105.04), S14-S16 (135.4-167.0)
const A98_VCAM = [   // v2: establishing wides at 83.28 and 135.4 only; the rest is dialogue framing
  [83.28, { x: 600, y: 690, zoom: 1.35 }], [84.7, { x: 600, y: 690, zoom: 1.35 }], [85.6, { x: 610, y: 740, zoom: 1.6 }], [91.04, { x: 610, y: 740, zoom: 1.6 }], [92.4, { x: 690, y: 600, zoom: 2.0 }], [95.8, { x: 690, y: 600, zoom: 2.0 }],
  [96.4, { x: 640, y: 700, zoom: 1.9 }], [103.3, { x: 640, y: 700, zoom: 1.9 }], [104.0, { x: 560, y: 740, zoom: 1.5 }], [105.04, { x: 560, y: 740, zoom: 1.5 }],
  [135.4, { x: 500, y: 640, zoom: 1.05 }], [136.6, { x: 500, y: 640, zoom: 1.05 }], [137.9, { x: 590, y: 730, zoom: 1.5 }], [140.6, { x: 590, y: 730, zoom: 1.5 }],
  [141.2, { x: 590, y: 720, zoom: 1.6 }], [143.5, { x: 590, y: 720, zoom: 1.6 }], [144.5, { x: 480, y: 750, zoom: 1.6 }], [146.5, { x: 480, y: 750, zoom: 1.6 }],
  [147.2, { x: 450, y: 740, zoom: 1.35 }], [148.7, { x: 450, y: 740, zoom: 1.35 }], [149.3, { x: 550, y: 750, zoom: 1.55 }], [150.76, { x: 550, y: 750, zoom: 1.55 }],
  [151.0, { x: 510, y: 740, zoom: 1.5 }], [161.7, { x: 510, y: 740, zoom: 1.5 }], [163.0, { x: 490, y: 720, zoom: 1.4 }], [167.0, { x: 490, y: 720, zoom: 1.4 }]];
const a98VizCam = (t) => K.camAt(A98_VCAM, t);
function a98VizOutside(c, t) {
  skyCycle(c, 0.22, { t, hills: false });
  shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], '#edc65a', { lw: 5, seed: 640, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 });
  const rows = []; if (t >= 146.9) rows.push([[1, 0.72, 905, 30, 146.95], [2, 0.72, 905, 110, 147.15]]); if (t >= 163.9) rows.unshift([[0, 0.6, 870, 75, 164.16]]);   // v2: one more head joins the first ones on 164.16
  for (const row of rows) for (const [pal, s, y, x1, ta] of row) { const x = kfn(t, [[ta - 0.4, -320], [ta, x1]], 'out');
    horse(c, { x, y, s, dir: 1, pal, headDown: 0.2 + 0.15 * Math.sin(t * 2.1 + x1), earL: 0.6, earR: 0.4, load: s < 0.6 ? ['chest'] : null, saddle: false }); }
  if (t < 146.9) { seg(c, 150, 870, 150, 760, 12, A98_WOOD, 4); seg(c, 132, 772, 168, 772, 8, A98_WOOD, 3); }
}
function a98Desk(ctx) { for (const x of [834, 884]) seg(ctx, x, 834, x, 860, 8, A98_WOOD, 3); shape(ctx, K.rectPts(820, 824, 80, 12), '#c98a3a', { lw: 4, seed: 641 });
  shape(ctx, [[830, 824], [864, 820], [868, 812], [834, 816]], A98_PAPER, { lw: 3, seed: 642 }); a98Inkpot(ctx, 884, 824, 0.6); }

// ---------- Yahya ----------
function a98YahViz(t, fh) {
  const P = a98Yah({ x: A98_THX, y: A98_SITY, sit: 1, seat: 'bench', mouth: 'closed', brow: 0, lid: 0.2 }), o = { P }, yh = [A98_THX, 680];
  P.gaze = lookAt(yh, fh);
  if (t < 105.04) {
    P.handLW = [A98_THX + 14, 790]; P.handRW = [A98_THX - 36, 792];
    if (t < 84.5) { const k = a98Env(t, 83.8, 84.6, 0.3); P.handRW = [K.lerp(A98_THX - 36, 585, k), K.lerp(792, 742, k)]; P.tip = 0.1 * k; if (t >= 84.3) o.scroll = { at: P.handRW, roll: 1, seal: C.red }; }
    else if (t < 90.16) { P.handLW = [A98_THX + 14, 790]; P.handRW = [A98_THX - 34, 792]; P.drop = 3;
      o.scroll = { at: [A98_THX - 10, 790], roll: 1 - a98E(t, 85.3, 0.5), open: true, seal: t < 84.95 ? C.red : null }; P.gaze = [0, 0.7];
      if (t >= 84.7 && t < 85.2) P.handRW = [A98_THX - 20, 778 - 4 * pulse(t, 84.85, 0.15)];
      if (t >= 86.22) P.gaze = [0.6 - 1.2 * (((t - 86.22) / 0.26) % 1), 0.7];
      if (t >= 87.0) { P.gaze = [0, 0.75]; P.noBlink = true; P.lid = 0; P.brow = -0.6 * a98E(t, 87.0, 0.3); } }
    else { P.handLW = [A98_THX + 14, 790]; P.handRW = [A98_THX - 34, 792]; o.scroll = { at: [A98_THX - 10, 800], roll: 0, open: true }; P.brow = -0.3; P.lid = 0.4; P.gaze = [0, 0.6];
      if (t >= 91.04) { P.handRW = undefined; P.handR = PERSON_HANDS.chin.R; P.gaze = gazePlan(t, [[0, [0, 0.6]], [91.04, [0, 0.6]], [91.3, [0.6, -0.5]]], 0.6); P.noBlink = true; P.lid = a98In(t, 91.8, 92.15) ? 1 : 0.15; P.brow = -0.2; }
      if (t >= 93.26) P.mouth = 'smirk', P.gaze = [-0.5, -0.7];
      if (t >= 94.88) { P.mouth = 'smile'; P.lid = 0.3; P.drop = 3 * a98E(t, 95.0, 0.4); P.noBlink = false; }
      if (t >= 96.1) { P.handR = undefined; P.handRW = [A98_THX - 34, 792]; P.gaze = lookAt(yh, fh); P.tip = 0.06; P.talk = a98Talk(t, 96.2, 99.2); P.mouth = 'smile'; P.lid = a98In(t, 96.55, 96.72) ? 1 : 0.2; }
      // v2: he taps the forged letter on his lap (98.40), then the wink to us behind the envoy's bowed head (99.28-100.3)
      if (t >= 98.4 && t < 100.46) { P.handRW = [A98_THX - 14, 792 - 9 * (pulse(t, 98.45, 0.18) + pulse(t, 98.7, 0.18) + pulse(t, 98.95, 0.18))]; P.drop = 3; }
      if (t >= 99.28 && t < 100.3) { P.mouth = 'smirk'; P.gaze = [0, 0.05]; P.lid = 0; P.talk = 0; P.wink = 'L'; P.brow = 0.4; P.tip = 0.02; }
      if (t >= 100.46 && t < 102.0) { P.handRW = [A98_THX - 30 + 14 * Math.sin(t * 20), 786]; P.gaze = [0, 0.8]; P.talk = 0; P.tip = 0.04; o.quill = P.handRW; o.newScroll = { lines: a98E(t, 100.5, 0.8), seal: t >= 101.35 ? C.yellow : null }; }
      if (t >= 102.0 && t < 103.5) { const k = a98Env(t, 102.14, 102.9, 0.3); P.handRW = [K.lerp(A98_THX - 34, 570, k), K.lerp(792, 745, k)]; P.tip = 0.1 * k; if (t < 102.7) o.give = P.handRW; P.talk = 0; P.gaze = lookAt(yh, fh);
        if (t >= 102.75) { P.handL = [98, -150]; P.handLW = undefined; /* v2: open palm toward the door */ P.brow = -0.2; P.talk = a98Talk(t, 102.8, 103.4); } }
      if (t >= 103.56) { P.handRW = [A98_THX - 34, 792]; P.gaze = lookAt(yh, [Math.max(60, fh[0]), 700]); P.lid = 0.5; P.drop = 4 * pulse(t, 104.0, 0.3); P.mouth = 'smile'; } }
    return o; }
  // S14-S16
  P.handLW = [A98_THX + 14, 790]; P.handRW = [A98_THX - 34, 792]; P.gaze = [0.1, 0.7]; o.paper = t < 137.14;
  if (t >= 137.14) { P.gaze = lookAt(yh, gazePlan(t, [[0, fh], [137.14, fh], [137.5, [fh[0] + 10, fh[1] + 110]], [137.85, fh]], 0.12)); P.brow = -0.4; if (t >= 137.6) P.mouth = 'smirk'; }
  if (t >= 140.2 && t < 140.8) P.drop = 6 * pulse(t, 140.25, 0.5);
  // rise, step to the edge, lift him by the elbow, back to the seat
  const xf = (tt) => kfn(tt, [[141.45, A98_THX], [141.85, 620], [143.0, 620], [143.6, A98_THX], [151.6, A98_THX], [152.2, 660], [153.3, 660], [153.7, 600], [153.9, A98_CHA + 95 + 180], [154.9, A98_CHA + 95], [155.1, A98_CHA + 95], [155.8, 600], [162.2, 600], [162.9, 810]]);
  const up1 = a98Env(t, 141.2, 143.75, 0.3), up2 = a98E(t, 151.3, 0.4);
  if (t >= 141.2) { Object.assign(P, walk(xf, t, { stride: 26 })); P.sit = t < 150 ? 1 - up1 : 1 - up2; const onFloor = t >= 153.6;
    P.y = onFloor ? K.lerp(K.lerp(A98_DAIS, 900, a98E(t, 153.4, 0.3)), A98_DAIS, a98E(t, 162.3, 0.4)) : K.lerp(A98_SITY, A98_DAIS, 1 - P.sit); P.dir = (t >= 143.0 && t < 143.6) ? 1 : -1; P.handLW = P.handRW = undefined; o.paper = false; }
  if (t >= 141.68 && t < 143.0) { P.handRW = [fh[0] + 30, fh[1] + 85]; P.tip = 0.18; P.mouth = 'smile'; P.gaze = lookAt(a98Head(P), fh); P.lid = 0.2; }
  if (t >= 143.75 && t < 150.76) { P.handLW = [A98_THX + 14, 790]; P.handRW = [A98_THX - 34, 792]; P.gaze = lookAt(yh, fh); P.mouth = 'smirk'; }
  if (t >= 150.0 && t < 150.76) { P.gaze = lookAt(yh, gazePlan(t, [[0, [540, 830]], [150.0, [540, 830]], [150.25, [150, 690]], [150.5, fh]], 0.2)); P.noBlink = true; P.lid = 0; }
  if (t >= 150.76) { P.mouth = 'smile'; P.lid = 0.35; P.gaze = lookAt(a98Head(P), fh); P.brow = -0.2;
    if (t >= 152.48 && t < 153.5) { P.handR = PERSON_HANDS.shield.R; P.gaze = lookAt(a98Head(P), gazePlan(t, [[0, fh], [152.6, [fh[0] - 60, fh[1]]], [152.85, [fh[0] + 60, fh[1]]], [153.1, fh]], 0.07)); }
    if (t >= 153.76 && t < 154.95) { const cx = a98ChestX(t); P.handRW = [cx + 30, 832]; P.tip = 0.2; P.gaze = lookAt(a98Head(P), [cx, 840]); }
    if (t >= 155.62 && t < 157.0) { P.handL = PERSON_HANDS.palmsUp.L; P.talk = a98Talk(t, 155.8, 156.9); }
    if (t >= 157.12 && t < 158.0) { P.handR = PERSON_HANDS.pointFwd.R; P.talk = 0; }
    if (t >= 158.94 && t < 160.9) { P.handL = [-50, -212]; P.gaze = [0.2, -1]; P.handR = undefined; }
    if (t >= 161.7 && t < 162.6) { const c = Math.abs(Math.sin((t - 161.7) * 9)); P.handL = [-6 - 28 * c, -160]; P.handR = [6 + 28 * c, -160]; P.gaze = [1, 0]; P.lid = 0; P.mouth = 'smile'; }
    if (t >= 162.6) { P.gaze = lookAt(a98Head(P), [760, 800]); P.handL = PERSON_HANDS.hipsHands.L; }
    if (t >= 164.16) P.gaze = lookAt(a98Head(P), fh); }
  return o;
}
// the chest of S14-S16 (fortune 1): pushed in, pushed to the dais, slid back
// v2 layout of the doubling: forger 255, set A (chest 360 + heap 470), set B (chest 610 + heap 720), Yahya back on the dais at 810
const A98_CHA = 330, A98_HPA = 432, A98_CHB = 625, A98_HPB = 727, A98_F16 = 235;
const a98ChestX = (t) => kfn(t, [[144.6, 40], [145.5, 330], [145.65, 330], [146.3, 540], [154.1, 540], [154.9, A98_CHA]], 'inOut');

// ---------- the forger (S14-S16) and the envoy (S10) ----------
function a98FViz(t, yh) {
  const P = a98F(t, { x: 470, mouth: 'closed', brow: -0.5 }), o = { P };
  const xf = (tt) => kfn(tt, [[135.5, 70], [137.0, 470], [144.6, 470], [145.5, 262], [145.65, 262], [146.3, 472], [153.85, 472], [154.7, A98_F16], [166.14, A98_F16], [166.5, A98_CHA + 21]]);
  Object.assign(P, walk(xf, t, { stride: 24 })); P.amp *= t < 137 ? K.lerp(1, 0.4, K.clamp((t - 135.5) / 1.5)) : 1; P.gaze = lookAt(a98Head(P), yh);
  if (t < 137.92) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.drop = 3 + 4 * K.clamp((t - 135.5) / 1.5); P.lid = 0.3; o.sash = true; }
  if (t >= 137.92 && t < 144.6) { P.kneel = t < 141.9 ? a98E(t, 137.95, 0.4) : K.lerp(1, 0.4, a98E(t, 141.9, 0.7)); if (t >= 144.25) P.kneel = 0.4 * (1 - a98E(t, 144.25, 0.35)); P.sq = landSquash(t, 138.35, 0.08);
    if (t < 139.46) { P.handLW = [535, 812]; P.handRW = [545, 806]; o.offer = [540, 798]; P.drop = 8; P.lid = 0.5; P.gaze = [0.2, 0.8]; }
    else if (t < 140.64) { P.gaze = [-0.7, -0.8]; P.lid = 0.5; P.mouth = 'frown'; P.drop = 4; o.sash = false; }
    else { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.wet = true; P.brow = -0.7; P.talk = a98Talk(t, 140.7, 141.6); P.gaze = lookAt(a98Head(P), yh); }
    if (t >= 142.9 && t < 143.7) { P.handR = [18, -196]; P.handL = undefined; P.lid = 0.6; P.talk = 0; }
    if (t >= 143.7) { P.mouth = 'smile'; P.handL = P.handR = undefined; } }
  if (t >= 144.6 && t < 146.34) { P.dir = t < 145.6 ? -1 : 1; P.handR = t < 145.3 ? [64 + 8 * Math.sin(t * 14), -196] : undefined; P.mouth = 'smile'; P.brow = -0.3; P.gaze = t < 145.4 ? [-1, -0.1] : [1, 0.3]; }
  // v2 offer: pushes the chest forward with both hands, opens the lid, sweeps an arm to the horses in the door, then both hands toward Yahya with a bow
  if (t >= 145.5 && t < 146.34) { P.dir = 1; P.tip = 0.2; const cx = a98ChestX(t); P.handLW = [cx - 60, 842]; P.handRW = [cx - 54, 828]; P.gaze = [1, 0.4]; P.mouth = 'closed'; P.sq = 1; P.handR = P.handL = undefined; }
  if (t >= 146.34 && t < 147.02) { const cx = a98ChestX(t), k = a98E(t, 146.34, 0.35); P.handRW = [cx - 30, 830 - 46 * k]; P.handLW = undefined; P.tip = 0.12; P.gaze = lookAt(a98Head(P), [cx, 800]); P.mouth = 'smile'; P.brow = -0.3; }
  if (t >= 147.02 && t < 150.76) { P.mouth = 'smile'; P.brow = -0.4;
    if (t < 148.6) { const k = a98E(t, 147.02, 0.45); P.handL = [K.lerp(60, -108, k), K.lerp(-100, -165, k)]; P.gaze = k > 0.5 ? [-1, -0.1] : [1, 0.4]; P.tilt = -0.04 * k; }
    else { P.handL = [-40, -110]; P.gaze = lookAt(a98Head(P), yh); }
    if (t >= 149.02) { const k = a98E(t, 149.02, 0.35); P.handL = PERSON_HANDS.reachBoth.L; P.handR = PERSON_HANDS.reachBoth.R; P.lean = 0.3 * k; P.sq = breathe(t, 3, 0.025); P.brow = 0.5; P.gaze = lookAt(a98Head(P), yh); } }
  if (t >= 150.76) { P.gaze = lookAt(a98Head(P), yh); P.mouth = 'closed';
    if (t >= 152.48) { P.mouth = 'o'; P.brow = -0.6; }
    if (t >= 153.85 && t < 155.7) { P.dir = 1; P.gaze = [0.6, 0.9]; P.mouth = 'o'; P.brow = 0.6; P.sq = landSquash(t, 155.4, 0.06); }   // v2: backs away as the chest is slid at him
    if (t >= 157.98 && t < 158.9) { P.handR = PERSON_HANDS.chest.R; P.gaze = a98In(t, 158.2, 158.5) ? [-1, 0] : lookAt(a98Head(P), yh); P.mouth = 'o'; }
    if (t >= 158.94) { P.gaze = [0.4, -0.9]; P.mouth = 'o'; }
    if (t >= 160.9) { P.mouth = 'smile'; P.brow = -0.3; P.gaze = lookAt(a98Head(P), yh); }
    if (t >= 161.9 && t < 163.5) { P.mouth = 'o'; P.gaze = lookAt(a98Head(P), [A98_HPA, 860]); }
    if (t >= 163.52) { P.gaze = lookAt(a98Head(P), [A98_CHB + 50, 840]); P.tilt = 0.04; P.mouth = 'open'; P.eyes = 'wide'; }
    if (t >= 164.16) { P.gaze = [-1, -0.2]; P.tilt = -0.04; P.dir = -1; }
    if (t >= 165.26) { P.dir = 1; P.gaze = [0.3, -0.9]; P.tilt = 0; }
    if (t >= 166.14) { P.dir = 1; P.eyes = undefined; P.gaze = [0, 0.05]; P.tilt = 0; P.handL = PERSON_HANDS.cheeks.L; P.handR = PERSON_HANDS.cheeks.R; P.lid = 0; P.mouth = 'o';
      if (t >= 166.45) { P.sit = a98E(t, 166.45, 0.3); P.y = K.lerp(900, 880, P.sit); P.sq = impactSquash(t, 166.75, 0.88); P.gaze = [0, 0.05]; P.mouth = 'open'; } } }
  return o;
}
function a98EnvViz(t, yh) {
  const E = { ...A98_ENV, x: 470, y: 900, dir: 1, kneel: 1, mouth: 'closed', gaze: lookAt([470, 740], yh), brow: -0.2 };
  if (t < 84.4) { E.handLW = [565, 750]; E.handRW = [578, 738]; E.drop = 4; }
  if (t >= 84.4 && t < 90.16) { E.gaze = [0.3, 0.6]; E.drop = 6; }
  if (t >= 90.16) E.gaze = lookAt([470, 740], yh), E.brow = -0.3;
  if (t >= 98.4 && t < 100.4) { const k = a98Env(t, 98.4, 100.4, 0.3); E.lean = 0.55 * k; E.drop = 10 * k; E.gaze = [0.2, 1]; E.lid = 0.6 * k; }   // v2: a deep bow
  if (t >= 102.4 && t < 103.5) { E.handLW = [560, 752]; E.handRW = [572, 742]; }
  if (t >= 103.56) { const xf = (tt) => kfn(tt, [[103.95, 470], [104.95, -80]], 'in'); Object.assign(E, walk(xf, t, { stride: 30 })); E.kneel = 1 - a98E(t, 103.7, 0.25); E.tip = 0.3 * pulse(t, 103.56, 0.3) + (t > 103.95 ? 0.1 : 0); E.dir = t < 103.9 ? 1 : -1; E.gaze = [-1, 0]; }
  return E;
}

function a98VizWorld(ctx, t, cam) {
  const out = {};
  palaceHall(ctx, { wall: 'ochre', t, cushions: [610, 850], outside: (c) => a98VizOutside(c, t) });
  a98Desk(ctx);
  const s10 = t < 105.04;
  let fh = [500, 720];
  if (s10) fh = a98Head(a98EnvViz(t, [A98_THX, 680])); else fh = a98Head(a98FViz(t, [A98_THX, 680]).P);
  const Y = a98YahViz(t, fh), yh = a98Head(Y.P); out.yh = yh; out.fh = fh;
  person(ctx, Y.P);
  if (Y.paper) shape(ctx, [[A98_THX - 50, 786], [A98_THX + 10, 780], [A98_THX + 14, 792], [A98_THX - 46, 798]], A98_PAPER, { lw: 3, seed: 643 });
  const sc = Y.scroll; if (sc) { if (sc.open) a98Scroll(ctx, sc.at[0], sc.at[1], 0.9, { roll: sc.roll, seal: sc.seal }); else a98Scroll(ctx, sc.at[0], sc.at[1], 0.6, { roll: 1, seal: sc.seal, rot: -0.3 }); }
  if (Y.newScroll) { a98Scroll(ctx, A98_THX - 20, 800, 0.6, { roll: 0, lines: Y.newScroll.lines, seal: Y.newScroll.seal }); a98Quill(ctx, Y.quill[0], Y.quill[1] - 4, 0.4, 0.7); }
  if (s10) { const E = a98EnvViz(t, yh); person(ctx, E); if (t < 104.9) a98Satchel(ctx, E.x - 22, 840, 0.9, { scroll: false });
    if (t < 84.3) a98Scroll(ctx, 572, 742, 0.6, { roll: 1, seal: C.red, rot: -0.2 });
    if (Y.give) { a98Scroll(ctx, Y.give[0], Y.give[1] - 6, 0.55, { roll: 1, seal: C.red, rot: -0.2 }); a98Scroll(ctx, Y.give[0] + 6, Y.give[1] + 8, 0.55, { roll: 1, seal: C.yellow, rot: 0.2 }); }
    if (t >= 102.7 && t < 103.9) { a98Scroll(ctx, 566, 744, 0.55, { roll: 1, seal: C.red, rot: -0.2 }); a98Scroll(ctx, 572, 758, 0.55, { roll: 1, seal: C.yellow, rot: 0.2 }); }
    if (a98In(t, 83.4, 84.4)) for (const sd of [-1, 1]) dustBurst(ctx, 470 + sd * 40, 790, t - 83.4, 4, 4, 9, 20, 0.9, 30 + sd);
    if (a98In(t, 84.9, 85.7)) for (const k of [0, 1]) shape(ctx, ell(A98_THX - 10 + (k ? 8 : -6), fallY(t, 84.9 + k * 0.05, 85.4 + k * 0.05, 790, 850), 4, 3, 8), C.red, { lw: 2, seed: 644 + k });
    if (a98In(t, 103.9, 105.0)) dustBurst(ctx, Math.max(0, kfn(t, [[103.95, 470], [104.95, -80]], 'in')) + 30, 902, t - 103.95, 5, 5, 12, 30, 0.8, 41);
    // the decision cloud
    if (a98In(t, 92.3, 96.1)) { const p = Math.min(K.clamp((t - 92.3) / 0.45), 1 - K.clamp((t - 95.75) / 0.35));
      thoughtCloud(ctx, 625, 420, 270, 180, t, { p, tail: [yh[0] - 10, yh[1] - 60], scale: 0.42, at: [500, 700], bg: '#fff7e0', inside: (c, tt) => {
        const cl = a98E(tt, 94.88, 0.5), gap = K.lerp(330, 210, a98E(tt, 95.2, 0.55));
        a98Feud(c, 500, 700, 100, { gap, open: 1, close: cl, webs: 1, webFall: a98E(tt, 95.0, 0.6), pA: (tt - 92.5) / 0.35, pY: (tt - 92.75) / 0.35, gazeIn: a98E(tt, 95.3, 0.4), t: tt });
        if (tt >= 93.26) a98Scroll(c, 500, K.lerp(960, 690, a98E(tt, 93.26, 0.6)), 2.2, { roll: 1, seal: C.red, rot: 0.08 * Math.sin(tt * 3) * (1 - cl) }); } }); } }
  else { const F = a98FViz(t, yh), P = F.P;
    if (t >= 144.6) a98Chest(ctx, a98ChestX(t), 902, 0.8, { open: t < 153.9 ? a98E(t, 147.0, 0.25, 'out') : 1 - a98E(t, 153.9, 0.2), content: 'both', sq: landSquash(t, 147.0, 0.1) * landSquash(t, 154.9, 0.06) });
    if (t >= 144.6 && t < 146.6) for (let i = 0; i < 2; i++) { const xs = (tt) => kfn(tt, [[144.4, -120 - i * 70], [145.6, 220 - i * 70], [145.9, 220 - i * 70], [146.6, -160 - i * 70]]);
      const S = { ...A98_SERV[i], ...walk(xs, t, { stride: 24 }), y: 900, dir: t < 145.9 ? 1 : -1, gaze: [1, 0.3], tip: t < 145.6 ? 0.12 : 0 }; if (t < 145.6) { S.handLW = [xs(t) + 50, 840]; S.handRW = [xs(t) + 56, 828]; } person(ctx, S); }
    // v2 doubling: heap A pours out beside chest A after the clap; on 163.52 an identical set B drops in to the right, clearly apart
    const heapIn = (x, t0, seed) => { for (let i = 0; i < 8; i++) { const c0 = t0 + i * 0.06; if (t >= c0 && t < c0 + 0.35) a98Coin(ctx, x - 50 + (i * 31) % 100, fallY(t, c0, c0 + 0.35, 520, 860), 11, Math.cos(t * 12 + i)); }
      a98CoinPile(ctx, x, 902, a98E(t, t0 + 0.1, 0.5, 'out'), 150, seed); };
    if (t >= 161.9) heapIn(A98_HPA, 161.9, 6);
    if (t >= 163.3) { const land = 163.52, y = t < land ? fallY(t, 163.3, land, 520, 902) : 902; a98Chest(ctx, A98_CHB, y, 0.8, { open: 0, sq: landSquash(t, land, 0.14) });
      dustBurst(ctx, A98_CHB, 904, t - land, 6, 5, 11, 34, 0.6, 81); heapIn(A98_HPB, 163.6, 6); }
    person(ctx, P);
    if (F.sash) a98Scroll(ctx, P.x + 14, 900 - 92 * 0.95, 0.55, { roll: 1, seal: C.red, rot: -0.5 });
    if (F.offer) a98Scroll(ctx, F.offer[0], F.offer[1], 0.6, { roll: 1, seal: C.red, rot: 0 });
    if (a98In(t, 135.5, 137.1)) for (const f of footfalls((tt) => kfn(tt, [[135.5, 70], [137.0, 470]]), 135.5, 137.0, 24)) dustBurst(ctx, f.x, 902, t - f.t, 3, 4, 8, 16, 0.4, Math.round(f.t * 10));
    // the stick box from the bargain, struck through and falling away
    if (a98In(t, 142.82, 143.75)) { ctx.save(); ctx.globalAlpha *= 1 - a98E(t, 143.45, 0.3); a98IconBox(ctx, 470, 560, 130, 110, K.clamp((t - 142.82) / 0.3) * (1 + 0.15 * pulse(t, 143.3, 0.2)), 'stick', { stickT: 1, cross: a98E(t, 142.9, 0.3) }); ctx.restore(); }   // v2: fully in frame between the heads
    // the medallions above Yahya's palm
    if (a98In(t, 158.94, 161.7)) { const pp = K.clamp((t - 158.94) / 0.35), r = K.lerp(56, 68, a98E(t, 159.3, 1.2)) * (1 - a98E(t, 161.3, 0.4));
      a98Feud(ctx, 580, 450, r, { gap: 2.25 * r, pA: pp, pY: pp, heart: (t - 159.1) / 0.3, gazeIn: 1, nodA: 5 * pulse(t, 159.85, 0.35), nodY: 5 * pulse(t, 160.25, 0.35), open: a98In(t, 160.76, 161.4) ? 1 : 0, riftAlpha: 0.3 * a98Env(t, 160.76, 161.4, 0.15), t }); }
    out.chest = [a98ChestX(t), 850]; }
  return out;
}
