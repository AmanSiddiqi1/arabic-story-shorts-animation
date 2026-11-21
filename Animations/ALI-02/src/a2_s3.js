// ===== ALI-02 shots S9-S12 (71.43 - 107.3 s): Ali Baba tracks the cart; the pebbles; GUARDS?!; the row of backs; WAIT!; the escape =====

// Ali Baba's sash tail: a short vermilion ribbon from the waist, streaming back by speed (k 0 hangs .. 1 straight out), on twos
function a2Sash(ctx, P, t, k = 0) { const s = P.s || 0.95, d = Math.sign(P.dir || 1), [bx, by] = a2BodyPt(P, -24, -96, A2_ALI), tc = AB_T2(t), pts = [], pts2 = [];
  for (let j = 0; j <= 5; j++) { const u = j / 5, wv = Math.sin(tc * 14 - j * 1.2) * 6 * u * s * (0.3 + k), x = bx - d * (6 + 46 * u * (0.35 + 0.65 * k)) * s, y = by + (40 * (1 - k) * u + 6 * u) * s + wv; pts.push([x, y]); pts2.push([x - d * 4 * s, y + (12 - 6 * u) * s]); }
  celShade(ctx, [...pts, ...pts2.reverse()], AB_ACC, abDark(AB_ACC, 0.35), { light: [d, -1], off: 3, lw: 2.2 }); }

// ---------- S9 71.43-77.22: the bright morning forest; Ali Baba follows the cart ruts ----------
const A2_S9_X = (t) => flow(t, [[71.43, 300], [73.0, 480], [74.08, 560], [74.35, 568], [76.48, 568], [76.9, 610], [77.22, 660]]);
function a2S9World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning', x = A2_S9_X(tc);
  a2Ruts(ctx, cam.x - 700, cam.x + 900, { y: 924, lit: t > 75.78 && t < 76.6 ? x + 60 + 1500 * (t - 75.78) : null });
  const P = { x, y: 900, dir: 1, ...walk(A2_S9_X, tc, { stride: 24 }), gaze: gazePlan(tc, [[71.43, [1, -0.1]], [72.0, [1, 0.3]], [72.4, [-0.6, 0]], [72.8, [1, -0.1]]]), lid: abLid(t, 81, [72.4, 73.3, 75.5]), mouth: 'closed', brow: -0.3, tip: 0.05 + idleSway(tc, 82, 0.02, 2.4), sq: breathe(tc, 83) };
  let k = K.clamp(P.amp) * 0.7;
  if (tc > 73.0 && tc < 74.08) { P.handR = [6, -122]; P.brow = -0.7; P.gaze = [0.4, -0.3]; }
  if (tc >= 74.08 && tc < 74.78) { P.gaze = [0.5, 0.9]; P.drop = 4; P.tip = 0.04 * settleTo(tc, 74.08, 0, 1, 0.3, 0.2); }
  if (tc >= 74.78 && tc < 76.48) { const kn = K.ease.inOut(beatIn(tc, 74.78, 75.0)); P.kneel = 0.6 * kn; P.handRW = [x + 60, 900 + 6 * kn]; P.gaze = tc < 75.5 ? [0.6, 0.9] : [1, 0.2]; P.tip = 0.08 * kn; }
  if (tc >= 76.48) { P.tip = 0.12; P.kneel = 0.6 * (1 - beatIn(tc, 76.48, 76.62)); k = 1; P.gaze = [1, -0.1]; P.brow = 0.2; }
  a2Sash(ctx, P, t, k); a2Ali(ctx, P, m, { shc: '#6a4a2a' });
  if (t > 71.6) abFlock(ctx, t - 71.6, cam.x - 600, 260, 160, 4, 13, 0.45);
  return P;
}
function a2S9Under(ctx, t, cam) { abForest(ctx, cam, t, 'morning'); }
AB_SHOTS.push({ a: 71.43, b: 77.22, ww: 1e5, cam: (t) => ({ x: A2_S9_X(t) + 40, y: 690, zoom: 1.2 }), under: a2S9Under, world: a2S9World,
  over: (ctx, t, cam, S) => {
    if (t > 73.0 && t < 74.2) { const [hx, hy] = abP(A2_S9_X(t), 900 - 200, cam); thoughtCloud(ctx, 640, 330, 260, 190, t, { p: K.clamp((t - 73.0) / 0.35) * (1 - K.clamp((t - 73.95) / 0.2)), tail: [hx + 20, hy - 30], inside: (c) => {
      abBlob(c, 470, 720, 150, 110, AB_CAS0.hc, AB_CAS0.hd, { lw: 8, off: 40 }); abBlob(c, 500, 700, 30, 34, AB_CAS0.jewel, '#8a1010', { lw: 6 }); c.save(); c.font = 'italic 800 260px "Barlow Semi Condensed"'; c.fillStyle = '#2f63d6'; c.fillText('?', 620, 800); c.restore(); } }); }
    if (t > 76.5 && t < 77.22) a2Inset(ctx, t, [70, 100, 330, 220], K.clamp((t - 76.5) / 0.15) * (1 - K.clamp((t - 77.05) / 0.15)), (c) => {
      c.save(); c.translate(70, 100); c.scale(330 / 900, 220 / 600); c.translate(-760, -460); c.drawImage(a2GladePlate('dawn'), 0, 0);
      a2MuleCart(c, t, 0, 'dawn', { xf: (u) => 700 + 300 * (u - 76.5), moving: true, load: true }); c.restore(); }); } });

// ---------- S10-S12 at the open rock, bright morning: one continuous state, many framings ----------
const A2_G = 'morning', A2_GSH = '#5a3a3a';
// v2 (note 7): the six sacks lie on open ground left of the door, large (one is taken at 99.8, five stay: the counter)
const A2_DOOR_SACKS = [[1742, 0.78, 908], [1590, 0.86, 910], [1638, 0.9, 914], [1684, 0.84, 908], [1612, 0.74, 896], [1660, 0.76, 898]];
// pebbles: three leave his hand 0.1 s apart (81.28), arc over the thieves, land on the scree top and bounce down it
const A2_PEB = (i, t) => { const u = (t - 81.28 - 0.12 * i) / 0.75; if (u < 0) return null; if (u < 1) return [K.lerp(960, 2360 - 10 * i, u), K.lerp(690, 600, u) - 4 * 470 * u * (1 - u), u * 9];
  return a2Roll(t, 82.03 + 0.12 * i, A2_SCREE_PTS.map(([x, y]) => [x - 10 * i, y]), [70, 45, 25, 10]); };
function a2Roll(t, t0, pts, hops, dur = 0.22) { if (t < t0) return null; const n = pts.length - 1, k = Math.min(n - 1, Math.floor((t - t0) / dur)), u = K.clamp((t - t0 - k * dur) / dur);
  if (t - t0 >= n * dur) { const e = K.clamp((t - t0 - n * dur) / 0.5), [x, y] = pts[n]; return [x - 24 * K.ease.out(e), y, (x - 24 * K.ease.out(e)) * 0.05]; }
  const [x0, y0] = pts[k], [x1, y1] = pts[k + 1], x = K.lerp(x0, x1, u), y = K.lerp(y0, y1, u) - (hops[k] || 8) * Math.sin(Math.PI * u); return [x, y, x * 0.08]; }
const A2_LOOSE = [0, 1, 2, 3, 4, 5].map((j) => ({ t0: 82.03 + 0.22 * (j % 4) + 0.1 * (j % 3) + 0.1, k: j % 4, dx: (j - 2.5) * 12, r: 8 + (j % 3) * 4 }));
function a2Contact(t, t0) { return t > t0 && t < t0 + 0.6 ? t - t0 : -1; }
// the leader's path: inside the doorway (facing in) -> out and right to the line (85.18-86.2); stateX drives in/out
// v2 (note 1): on «حراسًا» the whole band walks right to the foot of the scree (x 2110..2262), leaving open ground between the door
// and the nearest thief; from 88.3 they stand with their backs to the camera (a2BackCel), eyes on the slope
const A2_LDX = (t) => kfn(t, [[85.18, 1800], [86.9, 2262]], 'inOut'), A2_LDS = (t) => kfn(t, [[85.18, 1800], [85.6, 1600]], 'out');
const A2_LDY = 914;
const A2_MEN_OUT = [{ i: 0, x: 2112, s: 0.95, y: 918, t0: 86.32 }, { i: 1, x: 2165, s: 0.92, y: 910, t0: 86.52 }, { i: 2, x: 2214, s: 0.9, y: 922, t0: 86.72 }];
const A2_SENT = [{ i: 3, x0: 1980, xa: 2150, y: 900, s: 0.92, go: 88.4, x1: 2290, x2: 2392 }, { i: 4, x0: 2080, xa: 2236, y: 902, s: 0.94, go: 88.55, x1: 2340, x2: 2380 }];
const A2_BACK_T = 88.3;
// Cassim: kneeling in the doorway; slips behind the left jamb (91.0-91.5); peeks round it (turban, feather, one eye) from «انشغل»
// 91.66; two tiptoe steps out on «قاسم» 95.1; the one-foot freeze on «ينتظر»; the grab; the sprint
const A2_PEEK_X = (t) => kfn(t, [[91.0, 1850], [91.5, 1652], [95.1, 1652], [95.35, 1775]], 'inOut');
const A2_CAS_X = (t) => kfn(t, [[95.35, 1775], [95.9, 1690], [100.4, 1690], [101.3, 980], [101.5, 760]], 'inOut');
const A2_ALI_X = (t) => kfn(t, [[101.04, 845], [101.3, 960], [101.5, 690]], 'inOut');
function a2AliG(t) {   // Ali Baba at the thicket: y 980 = hidden; 880 = head and arm above the leaves
  const tc = AB_T2(t), P = { x: 845, y: 980, s: 0.95, dir: 1, gaze: [1, -0.1], lid: abLid(t, 91, [93.5, 94.4]), mouth: 'closed', brow: -0.4, tip: idleSway(tc, 92, 0.02, 2.6), sq: breathe(tc, 93) }; let show = false, out = false, k = 0;
  if (tc >= 80.3 && tc < 82.3) { show = true; P.y = K.lerp(900, 812, K.ease.out(beatIn(tc, 80.3, 80.55))); const pick = beatIn(tc, 80.3, 80.5) * (1 - beatIn(tc, 80.55, 80.7));
    P.tip = 0.3 * pick; P.handR = [60, -40 * pick - 100 * (1 - pick)];
    if (tc >= 80.6) { P.handR = [40, -150 - 10 * Math.abs(osc(tc, 0.2))]; P.gaze = [1, -0.4]; }
    if (tc >= 80.9) { const back = beatIn(tc, 80.9, 81.2), thr = beatIn(tc, 81.2, 81.32), fol = beatIn(tc, 81.32, 81.7); P.tip = -0.15 * back * (1 - thr) + 0.12 * thr * (1 - 0.6 * fol); P.sq = 1 + 0.04 * back;
      P.handR = thr > 0 ? [K.lerp(-60, 100, thr) - 20 * fol, K.lerp(-230, -190, thr) + 80 * fol] : [-30 - 40 * back, -170 - 60 * back]; k = thr; P.gaze = [1, -0.8]; }
    if (tc >= 81.7) { P.gaze = gazePlan(tc, [[81.7, [1, -0.8]], [82.0, [1, -0.3]]]); P.y = K.lerp(812, 960, beatIn(tc, 81.9, 82.3)); } }
  if (tc >= 93.0 && tc < 101.04) { show = true; P.y = K.lerp(960, 850, K.ease.out(beatIn(tc, 93.0, 93.3))); P.gaze = [1, -0.3]; P.brow = -0.8;
    if (tc < 93.82) { P.handR = [64 + 10 * osc(tc, 0.35), -200]; }
    else if (tc < 94.3) { P.handR = [92, -196]; P.tilt = 0.06 * Math.sin(tc * 18); }
    else if (tc < 99.06) { P.handR = PERSON_HANDS.hush.R; P.tilt = 0.05 * Math.sin(tc * 14) * (1 - beatIn(tc, 94.3, 94.9)); }
    else { P.handR = [86 - 16 * Math.abs(Math.sin((tc - 99.06) * 9)), -196]; P.gaze = [1, -0.2]; } }
  if (tc >= 101.04) { show = true; out = true; P.x = A2_ALI_X(tc); P.y = 900; Object.assign(P, walk(A2_ALI_X, tc, { stride: 26 })); P.dir = tc < 101.3 ? 1 : -1; P.tip = 0.12 * P.dir; P.gaze = tc < 101.36 ? [1, 0] : [-1, 0]; P.brow = 0.2; k = 1;
    if (tc > 101.3) { P.handRW = null; P.handL = [-90, -140]; } }
  return show ? { P, out, k } : null;
}
function a2CasG(t, cam) {   // Cassim: kneeling inside the doorway; his head lifts (90.05); out to the left jamb; WAIT; the grab; the sprint
  const tc = AB_T2(t), x = tc < 95.35 ? A2_PEEK_X(tc) : A2_CAS_X(tc), P = { x, y: 902, dir: -1, kneel: 1, gaze: [1, -0.3], lid: abLid(t, 101), mouth: 'o', brow: -0.8, tip: 0.2 + idleSway(tc, 102, 0.02, 2.2), sq: breathe(tc, 103), wet: true }, o = { fa: 1.1 };
  if (tc >= 90.05 && tc < 91.0) { const up = K.ease.out(beatIn(tc, 90.05, 90.4)); P.tip = 0.2 * (1 - up); P.dir = 1; P.gaze = [1, -0.2]; P.lid = abBlinkAt(AB_T3(t), 90.5); o.fa = 1.1 - 0.6 * beatIn(tc - 0.15, 90.05, 90.5); }
  if (tc >= 91.0 && tc < 95.35) { P.x = A2_PEEK_X(tc); P.kneel = 1 - beatIn(tc, 91.0, 91.25); Object.assign(P, walk(A2_PEEK_X, tc, { stride: 16 })); P.dir = tc < 91.5 ? -1 : 1; P.mouth = 'closed'; P.gaze = [1, -0.1]; o.fa = 0.4; P.handL = [-30, -120]; P.handR = [40, -130]; P.tip = 0.04;
    if (tc >= 91.5) { const lean = K.ease.out(beatIn(tc, 91.5, 91.72)) * (1 - K.ease.inOut(beatIn(tc, 95.05, 95.2))); P.tip = 0.5 * lean + idleSway(tc, 102, 0.02, 2.2); P.gaze = gazePlan(tc, [[91.6, [1, 0]], [92.6, [1, 0.2]], [93.6, [-0.6, -0.1]], [94.1, [1, 0.1]]]); P.lid = abLid(t, 104, [92.9, 94.3]);
      o.fa = 0.4 + lagged((u) => 0.5 * beatIn(u, 91.5, 91.72), tc, 0.12, 1) + (tc > 94.82 && tc < 95.1 ? 0.3 * Math.sin(tc * 50) : 0); if (tc > 94.82) { P.eyes = 'wide'; P.gaze = [-1, 0]; } }
    return { P, o, peek: true }; }
  if (tc >= 95.35 && tc < 95.9) { Object.assign(P, walk(A2_CAS_X, tc, { stride: 26 })); P.kneel = 0; P.amp = 0.6; P.y = 894; P.dir = -1; P.tip = 0.1; P.gaze = [-1, -0.1]; P.eyes = 'wide'; P.mouth = 'closed'; P.handL = [-50, -150]; P.handR = [60, -156]; o.fa = 0.4 + lagged((u) => 0.3 * Math.sin(u * 20), tc, 0.1, 1); }
  if (tc >= 95.9 && tc < 96.36) { P.kneel = 0; P.dir = 1; P.gaze = [1, -0.1]; P.eyes = 'wide'; P.handL = PERSON_HANDS.mouthCover.L; P.handR = PERSON_HANDS.mouthCover.R; P.tip = 0.03; P.lid = 0.2; }
  if (tc >= 96.36 && tc < 99.06) { P.kneel = 0; P.dir = 1; P.ph = Math.PI / 2; P.amp = 1; P.y = 896; P.tip = 0.06 * osc(tc, 0.7) + 0.03 * osc(tc, 0.43); P.handL = PERSON_HANDS.armsOut.L; P.handR = PERSON_HANDS.armsOut.R; P.gaze = [1, -0.2]; P.mouth = 'closed'; o.fa = 0.4 + 0.1 * osc(tc, 0.7);
    if (tc > 97.64 && tc < 98.3) { o.fa = 0.4 + 0.35 * Math.sin(tc * 55); P.eyes = 'wide'; P.x += tremble(tc, 1.2, 9); } }
  if (tc >= 99.06 && tc < 100.4) { P.kneel = 0; P.dir = 1; P.gaze = tc < 99.6 ? [-1, -0.2] : [1, 0.4]; if (tc > 99.6) { const r = beatIn(tc, 99.6, 99.8), b = beatIn(tc, 99.85, 100.0) * (1 - beatIn(tc, 100.1, 100.25)); P.handRW = [K.lerp(1700, 1745, r) + 40 * b, K.lerp(800, 850, r)]; P.tip = 0.1 * r; } P.dir = 1; }
  if (tc >= 100.4) { P.kneel = 0; P.dir = -1; P.tip = 0.12; P.handL = [20, -120]; P.handR = [36, -116]; P.mouth = 'o'; P.gaze = [1, 0]; o.fa = 0.9; }
  return { P, o };
}
function a2LeadG(t) {   // the leader: inside the doorway facing in; strides out (85.18); points (87.28); stands with his back to the door
  const tc = AB_T2(t), x = tc < 85.18 ? 1800 : A2_LDX(tc), P = { x, y: tc < 85.18 ? 902 : K.lerp(902, A2_LDY, beatIn(tc, 85.6, 86.9)), dir: 1, ...(tc > 85.18 ? walk(A2_LDX, tc, { stride: 28 }) : {}), gaze: [1, 0.3], lid: abLid(t, 150), brow: 1, tip: idleSway(tc, 151, 0.015, 3.2), sq: breathe(tc, 152), handL: PERSON_HANDS.hipsHands.L, handR: PERSON_HANDS.hipsHands.R, mouth: 'closed' };
  if (tc > 85.18 && tc < 85.5) P.dir = -1;
  if (tc >= 85.4) { P.gaze = [1, -0.1]; P.talk = abTalk(t, 85.4, 86.3, 14); if (P.talk) P.mouth = 'open'; }
  if (tc >= 87.28 && tc < 88.4) { const p1 = beatIn(tc, 87.28, 87.4), p2 = beatIn(tc, 87.6, 87.72), sw = beatIn(tc, 87.95, 88.2); P.handL = [-30, -100]; P.handR = sw > 0 ? [K.lerp(70, 110, sw), K.lerp(-170, -190, sw)] : p2 > 0 ? [100, -150] : [90, -130 - 20 * p1]; P.talk = abTalk(t, 87.28, 88.34, 15); P.mouth = P.talk ? 'open' : 'closed'; }
  if (tc >= 84.51 && tc < 85.18) { P.gaze = [-1, -0.2]; P.brow = 1; }   // «فظنوا»: the head snaps toward the noise (he faces into the cave)
  if (tc >= 88.4) { P.tip = 0.05 + idleSway(tc, 151, 0.02, 3.2); P.handR = tc > 92.0 && tc < 96.0 ? [96, -196] : PERSON_HANDS.hipsHands.R; P.handL = PERSON_HANDS.hipsHands.L; }   // back to us; one arm points up the slope
  let back = tc >= A2_BACK_T ? 1 : 0;
  if (tc >= 106.1) { P.dir = tc > 106.3 ? -1 : 1; P.gaze = [1, 0]; P.lid = abBlinkAt(AB_T3(t), 106.25); back = 0; }
  return { P, sx: tc < 85.18 ? 1800 : A2_LDS(tc), back };
}
function a2MenOutP(t, j) { const M = A2_MEN_OUT[j], tc = AB_T2(t); if (tc < M.t0) return null; const xf = (u) => kfn(u, [[M.t0, 1830], [M.t0 + 1.4, M.x]], 'out'), sx = kfn(tc, [[M.t0, 1830], [M.t0 + 0.5, 1600]], 'out'), x = xf(tc);
  const P = { x, y: M.y, s: M.s, dir: 1, ...walk(xf, tc, { stride: 22 }), gaze: [1, -0.1], lid: abLid(t, 160 + j), tip: 0.04 + idleSway(tc, 161 + j, 0.025, 2.4 + 0.5 * j), sq: breathe(tc, 162 + j), handL: [-30, -110], handR: [34, -112], brow: 0.5 };
  P.y = M.y - 0 * j; P.gaze = [1, -0.4];
  if (tc > A2_BACK_T) { if (j === 0) P.handR = [104, -196 + 6 * osc(tc, 1.3)]; if (j === 1) P.handR = [58, -222]; if (j === 2) { P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; P.sq *= 1 + 0.02 * osc(tc, 2.1); } }   // a pointer, an eye-shader, hands on hips
  if (tc > 89.02) P.tip += 0.05 * beatIn(tc, 89.02 + 0.12 * j, 89.4 + 0.12 * j);
  let back = tc >= A2_BACK_T + 0.15 * j ? 1 : 0;
  // the suspense beat: on «ابتعد» man 0 starts to turn round (cover off for six drawings, eyes sliding left), yawns, turns back
  if (j === 0 && tc >= 97.7 && tc < 98.1) { back = 0; P.gaze = [K.lerp(0.2, -1, beatIn(tc, 97.7, 97.9)), -0.1]; P.handR = tc > 97.86 ? [12, -170] : P.handR; P.mouth = tc > 97.86 ? 'o' : 'closed'; P.lid = tc > 97.86 ? 0.7 : 0; P.tilt = tc > 97.86 ? -0.12 : 0; }
  if (j === 0 && tc > 105.48) { const dt = tc - 105.48; back = dt < 0.12 ? 1 : 0; P.dir = dt < 0.25 || dt > 0.55 ? -1 : 1; P.gaze = [1, 0]; P.lid = abBlinkAt(AB_T3(t), 105.7); if (dt > 0.7) { P.dir = -1; P.handR = [100, -170]; P.mouth = 'open'; P.tip = 0.08; } }   // the double take, then he points
  return { P, sx, M, back }; }
function a2SentP(t, j) { const M = A2_SENT[j], tc = AB_T2(t), xf = (u) => kfn(u, [[85.4 + 0.12 * j, M.x0], [86.6 + 0.12 * j, M.xa], [M.go, M.xa], [M.go + 0.9, M.x1], [97.12 + 0.1 * j, M.x1], [98.4 + 0.1 * j, M.x2]], 'inOut'), x = xf(tc);
  const climb = 80 * beatIn(tc, M.go, M.go + 0.9) + 60 * beatIn(tc, 97.12, 98.2);
  const P = { x, y: M.y - climb, s: M.s * (1 - 0.1 * beatIn(tc, M.go, M.go + 0.9) - 0.1 * beatIn(tc, 97.12, 98.2)), dir: -1, ...walk(xf, tc, { stride: 20 }), gaze: [1, 0.1], lid: abLid(t, 170 + j), tip: idleSway(tc, 171 + j, 0.03, 2.2 + j), sq: breathe(tc, 172 + j), handL: [-30, -110], handR: [34, -112], brow: 0.3 };
  if (tc < 84.1 + 0.1 * j) { if (j === 0 && tc > 81.5 && tc < 82.6) { P.mouth = 'o'; P.tilt = -0.12; P.lid = 0.7; P.handR = [10, -168]; } if (j === 1) { P.handL = [20, -134 + 3 * Math.sin(tc * 30)]; P.handR = [26, -130]; } }
  else { P.dir = 1; P.gaze = [1, -0.2]; if (tc < 86.0) { P.handR = j ? [30, -200] : [40, -80]; P.sq *= j ? 1 : 0.95; } }
  if (tc >= 88.34 && tc < 88.6) { P.tilt = 0.1 * pulse(tc, 88.34, 0.25); }
  if (tc >= M.go) { P.dir = 1; P.sq = 0.9; P.tip = 0.14; P.handL = [10, -130]; P.handR = [50, -140]; if (j === 1 && tc > 89.0 && tc < 89.6) { P.dir = -1; } }
  if (tc >= 97.12) { P.dir = 1; if (j === 0 && tc > 97.4 && tc < 98.0) { P.dir = -1; P.handR = [60 - 20 * Math.abs(Math.sin(tc * 9)), -170]; } }
  if (tc >= 85.4 && tc < 86.7) { P.dir = 1; P.handL = [-30, -110]; P.handR = [34, -112]; }
  const fade = 1 - K.clamp((tc - 98.3 - 0.1 * j) / 0.6); return fade > 0 ? { P, fade, back: tc >= M.go + 0.3 ? 1 : 0 } : null; }
function a2OutWorld(ctx, t, cam, o = {}) {
  const tc = AB_T2(t), m = A2_G;
  abGladeBack(ctx, m, t, { rip: tc > 79.7 && tc < 80.3 ? 1 : 0 });
  a2StandHorses(ctx, t, m, { shc: A2_GSH, P: (h, k, tc2) => {
    if (h.pal === 3 && tc2 > 79.7 && tc2 < 80.4) return { headDown: 0.5, neck: -0.6, snort: 1, earL: 1 };                   // the chestnut sniffs the thicket
    if (tc2 > 84.1 && tc2 < 86.0) return { earL: 1, earR: 1, neck: 0.2 }; if (h.pal === 3 && tc2 > 100.6 && tc2 < 101.0) return { earL: -0.5 }; } });
  // the rock open in gold light; inside the arch: the leader's back and small kneeling Cassim, clipped
  abRock(ctx, 1820, 900, { model: m, open: 1, crack: 1, glow: 1, t, inside: (c) => { c.save(); c.translate(-1820, -900);
    const L = a2LeadG(t); a2DoorFig(c, t, L.P.x, 902, (cc, xx, yy, k) => a2Lead(cc, t, { ...L.P, x: xx, y: yy, s: 1.08 * k }, m, { shadow: false }), 'in', { stateX: L.sx });
    const C2 = a2CasG(t);
    if (C2.peek) { const st = C2.P.x >= AB_DIN ? abDoorState(C2.P.x) : { sink: 0, k: 1 }; c.save(); c.beginPath(); c.rect(1736, 0, 400, 1230); c.clip();   // behind the left jamb: only what leans past it shows
      a2Cas(c, { ...C2.P, y: 902 + st.sink, s: 1.1 * st.k, fin: { rim: '#ffd76a', light: [1, -0.3], rimW: 3 } }, m, { ...C2.o, shadow: false }); c.restore(); }
    else a2DoorFig(c, t, C2.P.x, 902, (cc, xx, yy, k) => a2Cas(cc, { ...C2.P, x: xx, y: yy, s: 1.1 * k }, m, { ...C2.o, shadow: false }), 'in', { maxDark: 0.3, rim: '#ffd76a' });
    for (let j = 0; j < 3; j++) { const R = a2MenOutP(t, j); const sx = R ? R.sx : 1860 + 20 * j; if (sx < AB_DIN) continue; a2DoorFig(c, t, R ? R.P.x : 1860 + 20 * j, 902, (cc, xx, yy, k) => abMan(cc, A2_MEN_OUT[j].i, { ...(R ? R.P : { dir: 1, tip: idleSway(tc, 180 + j, 0.02, 2) }), x: xx, y: yy, s: 0.95 * k }, m), 'in', { stateX: sx }); }
    c.restore(); } });
  // the six sacks left on the steps (one taken at 99.8); one tips over and coins run down (103.9)
  abByY(A2_DOOR_SACKS.map(([x, s, y], i) => ({ x, s, y, i }))).forEach(({ x, s, y, i }) => { if (i === 0 && tc > 99.8) return; const tip = i === 3 ? K.ease.in(beatIn(tc, 103.9, 104.3)) : 0; abSack(ctx, x, y, s, 1, { coin: true, rot: (i % 2 ? 0.08 : -0.06) + 1.3 * tip, sq: 1 }); });
  if (tc > 104.2) for (let k = 0; k < 8; k++) { const u = K.clamp((t - 104.2 - k * 0.08) / 0.6); if (u <= 0) continue; abBlob(ctx, 1700 + 110 * u + k * 6, 914 + 20 * u + (k % 2) * 6 - 8 * Math.abs(Math.sin(u * 9 + k)), 9, 5, '#ffcf3a', '#c07a12', { lw: 2, off: 2, hi: '#fff3b0' }); }
  if (tc >= 99.8 && tc < 100.4) { const C2 = a2CasG(t), h = a2Hand(C2.P, 1, A2_CAS); abSack(ctx, h[0], h[1] + 40, 0.7, 1, { coin: true }); }
  // the mule and cart: the mule looks left (92.2); its ears turn back (98.22); it looks at the sacks, then goes home (104.9)
  // v2 (note 7): the mule has turned round while the brothers ran (the shot after the run opens on it facing home); it looks at the
  // sacks on «أكياس», then trots off on «الذهب» with dust at the wheels
  const turned = tc >= 101.5, mdir = turned ? -1 : 1, cxf = (u) => (!turned ? A2_CARTX : kfn(u, [[104.9, A2_CARTX + 120], [106.45, A2_CARTX - 640]], 'in'));
  if (tc > 104.9) for (const f of [0, 1]) dustBurst(ctx, cxf(tc) + 40, 904, ((t * 3 + f * 0.5) % 1) * 0.5, 4, 4, 9, 26, 0.5, 23 + f + Math.floor(t * 3));
  a2MuleCart(ctx, t, A2_CARTX, m, { xf: cxf, dir: mdir, moving: tc > 104.9, shc: A2_GSH, load: true, P: { headTurn: (tc > 92.2 && tc < 93.4) || (tc > 104.26 && tc < 104.9) ? 0.7 : 0, earL: tc > 98.22 && !turned ? -0.4 : 0.5 + idleSway(tc, 61, 0.3, 1.3), earR: tc > 98.22 && !turned ? -0.5 : 0.3 + idleSway(tc, 62, 0.35, 1.7), headDown: tc > 104.26 && tc < 104.9 ? 0.3 : 0 } });
  // Ali Baba behind the thicket (thicket front pass over him) unless he is out
  const A = a2AliG(t); if (A && !A.out) { a2Sash(ctx, A.P, t, A.k); a2Ali(ctx, A.P, m, { shadow: false }); }
  abThicketFront(ctx, m, t);
  if (o.eyeGap) a2EyeGap(ctx, t, 860, 815, o.eyeGap);
  // the leader, the men, Cassim outside
  const C2 = a2CasG(t); if (!C2.peek && C2.P.x < AB_DIN && tc >= 91.0) a2DoorFig(ctx, t, C2.P.x, C2.P.y, (cc, xx, yy) => a2Cas(cc, { ...C2.P, x: xx, y: yy }, m, { ...C2.o, shc: A2_GSH }), 'out', { maxDark: 0.25, rim: '#ffd76a' });
  if (tc >= 100.4 && C2.P.x < AB_DIN) { const h = a2Hand(C2.P, 1, A2_CAS); abSack(ctx, h[0] + 10, h[1] + 40, 0.58, 1, { coin: true }); for (const f of [0, 1]) dustBurst(ctx, C2.P.x + 30, 904, ((t * 3 + f * 0.5) % 1) * 0.4, 3, 3, 6, 16, 0.4, f + Math.floor(t * 3)); }
  if (A && A.out) { a2Sash(ctx, A.P, t, 1); a2Ali(ctx, A.P, m, { shc: A2_GSH }); }
  ctx.drawImage(a2ScreeFront(m), 2000, 600);
  // the band at the foot of the scree (v2 note 1), in front of the slope's first boulders; backs to us from 88.3
  const band = [];
  const L = a2LeadG(t); if (L.sx < AB_DIN || L.P.x >= AB_DEND) band.push({ y: L.P.y, f: () => a2DoorFig(ctx, t, L.P.x, L.P.y, (cc, xx, yy, k) => { const Q = { ...L.P, x: xx, y: yy }; a2Lead(cc, t, Q, m, { shc: A2_GSH, kick: 0.4 * beatIn(tc, 87.95, 88.2) }); a2BackCel(cc, Q, AB_LEAD0, { ...A2_LEAD, t, ph: 2 }, L.back); }, 'out', { stateX: L.sx }) });
  A2_SENT.forEach((M, j) => { const R = a2SentP(t, j); if (!R) return; band.push({ y: R.P.y, f: () => { ctx.save(); ctx.globalAlpha *= R.fade; a2Man(ctx, M.i, R.P, m, { shc: A2_GSH, t }); a2BackCel(ctx, R.P, AB_RIDER0[M.i], { s: M.s, age: 0.35, t, ph: j }, R.back); ctx.restore(); } }); });
  for (let j = 0; j < 3; j++) { const R = a2MenOutP(t, j); if (!R || R.sx >= AB_DIN) continue; band.push({ y: R.M.y, f: () => a2DoorFig(ctx, t, R.P.x, R.M.y, (cc, xx, yy) => { const Q = { ...R.P, x: xx, y: yy }; a2Man(cc, R.M.i, Q, m, { shc: A2_GSH, t }); a2BackCel(cc, Q, AB_RIDER0[R.M.i], { s: R.M.s, age: 0.35, t, ph: 3 + j }, R.back); }, 'out', { stateX: R.sx }) }); }
  band.sort((a, b) => a.y - b.y).forEach((b) => b.f());
  // pebbles and the stones they knock loose
  // v2 (note 6): three times bigger pebbles, light grey with a dark line, each with a short white arc trail; a 2-frame squash per bounce
  for (let i = 0; i < 3; i++) { const p = A2_PEB(i, t); if (p && t < 84.5) { const fly = t < 82.03 + 0.12 * i;
      if (fly) for (let k = 1; k <= 5; k++) { const q = A2_PEB(i, t - k * 0.025); if (!q) break; ctx.save(); ctx.globalAlpha *= 0.55 * (1 - k / 6); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(q[0], q[1], 22 - 3 * k, 0, 7); ctx.fill(); ctx.restore(); }
      let sq = 1; if (!fly) for (let k = 0; k < 4; k++) { const d = a2Contact(t, 82.03 + 0.12 * i + 0.22 * k); if (d >= 0 && d < 0.067) sq = 0.7; }
      ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(p[2]); ctx.scale(1 / Math.sqrt(sq), sq); abBlob(ctx, 0, 0, 27, 21, '#d4cccc', '#7a6a7a', { lw: 3.5, off: 8, line: '#2b1a3a', hi: '#f4f0f0' }); ctx.restore(); } for (let k = 0; k < 4; k++) { const d = a2Contact(t, 82.03 + 0.12 * i + 0.22 * k); if (d >= 0) dustBurst(ctx, A2_SCREE_PTS[k + 1][0] - 10 * i, A2_SCREE_PTS[k + 1][1], d, 6, 4, 10, 40, 0.55, 40 + i * 4 + k); } }
  for (const L2 of A2_LOOSE) { const p = a2Roll(t, L2.t0, A2_SCREE_PTS.slice(L2.k).map(([x, y]) => [x + L2.dx, y - 6]), [40, 25, 14, 6]) || (t < L2.t0 ? [A2_SCREE_PTS[L2.k][0] + L2.dx, A2_SCREE_PTS[L2.k][1] - 6, 0] : null); if (!p || t > 99.1) continue; ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(p[2]); abStone(ctx, 0, 6, L2.r, '#c8a07a', '#806070'); ctx.restore(); }
  if (t > 98.3 && t < 99.06) { const p = a2Roll(t, 98.3, A2_SCREE_PTS.map(([x, y]) => [x + 20, y]), [30, 20, 12, 6], 0.15); if (p) { ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(p[2]); abBlob(ctx, 0, 0, 8, 6, '#a89a9a', '#5a4a5a', { lw: 2, off: 3 }); ctx.restore(); } }
}
// the eye gap in the thicket leaves (world units): a dark slot, Ali Baba's eyes inside, leaves breathing around it; o.open 0..1
function a2EyeGap(ctx, t, x, y, o = {}) { const g = o.open ?? 1, [f, s] = AB_LEAF.morning, dk = abDark(f, 0.45), ds = abDark(s, 0.5), R = K.rng(93);
  if (g > 0.02) { ctx.save(); ctx.beginPath(); ctx.roundRect(x - 80, y - 30 * g, 160, 60 * g, 22); ctx.fillStyle = '#120a16'; ctx.fill(); ctx.clip();
    abFace(ctx, x + 4 + tremble(t, 1, 7), y + 12, 0.34, { who: 'ali', gaze: o.gaze || [0.6, 0.1], lid: o.lid || 0, iris: o.iris ?? 0.6, brow: -0.6, wide: 1, m: 'morning', mouth: 'none' });
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(40,60,50,0.4)'; ctx.fillRect(x - 90, y - 40, 180, 80); ctx.restore(); }
  for (let i = 0; i < 10; i++) { const a = R() * Math.PI * 2, d = 70 + R() * 50, r = 36 + R() * 20; abBlob(ctx, x + Math.cos(a) * d * 1.2 + Math.sin(t * (1.1 + 0.3 * (i % 2)) + i) * 2, y + Math.sin(a) * d * 0.6, r, r * 0.75, i % 2 ? f : dk, i % 2 ? s : ds, { off: r * 0.3, lw: 3, line: abDark(s, 0.5) }); } }
const a2Out = (o) => (ctx, t, cam) => a2OutWorld(ctx, t, cam, o);
function a2PebCam(t) { const p = A2_PEB(1, Math.min(t, 82.02)) || [960, 600]; return { x: p[0], y: 600, zoom: 1.25 }; }
function a2Clatter(ctx, t, cam, S) { if (t > 83.12) { const [x, y] = abP(2290, 700, cam); a2Tag(ctx, S, 'CLATTER!', K.clamp(x, 200, 800), y - 160, t, 83.12, 84.0, { size: 54, rot: 0.07 }); } }
// S10
AB_SHOTS.push({ a: 77.22, b: 78.0, ww: 2400, cam: () => ({ x: 900, y: 760, zoom: 1.6 }), under: a2GladeUnder(A2_G), world: a2Out({ eyeGap: { gaze: [0.6, 0.1], iris: 0.55 } }) });
AB_SHOTS.push({ a: 78.0, b: 80.3, ww: 2400, cam: a2Cam([[78.0, { x: 900, y: 760, zoom: 1.6 }], [79.5, { x: 1640, y: 630, zoom: 1.1 }], [80.3, { x: 1650, y: 630, zoom: 1.1 }]]), under: a2GladeUnder(A2_G), world: a2Out({ eyeGap: { gaze: [0.8, 0.2], iris: 0.55 } }),
  over: (ctx, t, cam, S) => { if (t > 79.56) S.arrow(ctx, abP(1660, 500, cam), abP(1790, 640, cam), K.clamp((t - 79.56) / 0.4), { color: '#7fe3ff' }); } });
AB_SHOTS.push({ a: 80.3, b: 81.28, ww: 2400, cam: () => ({ x: 930, y: 740, zoom: 1.5 }), under: a2GladeUnder(A2_G), world: a2Out({}) });
AB_SHOTS.push({ a: 81.28, b: 82.02, ww: 2400, cam: a2PebCam, under: a2GladeUnder(A2_G), world: a2Out({}), over: (ctx, t) => abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, n: 22, alpha: 0.45 * Math.sin(Math.PI * beatIn(t, 81.28, 82.02)) }) });
AB_SHOTS.push({ a: 82.02, b: 84.1, ww: 2400, cam: (t) => ({ x: 2200, y: 690, zoom: 1.32 - 0.04 * beatIn(t, 82.02, 84.1) }), under: a2GladeUnder(A2_G), world: a2Out({}), over: a2Clatter });
AB_SHOTS.push({ a: 84.1, b: 90.9, ww: 2400, cam: () => ({ x: 1900, y: 615, zoom: 1.0 }), under: a2GladeUnder(A2_G), world: a2Out({}),
  over: (ctx, t, cam, S) => { const L = a2LeadG(t).P, [lx, ly] = abP(L.x, 900 - 260, cam);
    abSay(ctx, S, [[85.4, 'GUARDS?!']], t, K.clamp(lx + 60, 220, 780), 330, [lx, ly], { size: 56, gone: 86.5 });
    if (t > 85.6 && t < 86.6) thoughtCloud(ctx, K.clamp(lx - 250, 170, 830), 560, 240, 160, t, { p: K.clamp((t - 85.6) / 0.3) * (1 - K.clamp((t - 86.4) / 0.15)), tail: [lx - 20, ly + 10], inside: (c) => {
      for (const [hx, hy] of [[380, 680], [500, 660], [620, 690]]) { abBlob(c, hx, hy, 60, 50, '#c8d0e8', '#6a7090', { lw: 6, off: 14 }); seg(c, hx, hy - 50, hx, hy - 90, 10, '#c8d0e8', 4); }
      for (const [bx, by] of [[300, 780], [480, 790], [660, 785]]) abBlob(c, bx, by, 110, 70, '#c8a07a', '#806070', { lw: 6, off: 20 }); } });
    if (t > 88.34 && t < 89.4) S.counter(ctx, 2, abP(2150, 520, cam)[0], 200, K.clamp((t - 88.34) / 0.3) * (1 - K.clamp((t - 89.1) / 0.3)), { size: 110, color: '#ffd36a' }); } });
// S11
const A2_S11_CAM = (t) => { if (t < 92.22) return { x: 1900, y: 615, zoom: 1.0 }; if (t < 94.8) return K.camAt([[92.22, { x: 1900, y: 615, zoom: 1.0 }], [93.0, { x: 1000, y: 700, zoom: 1.4 }]], t);
  if (t < 97.1) return K.camAt([[94.8, { x: 1000, y: 700, zoom: 1.4 }], [95.2, { x: 1880, y: 660, zoom: 1.15 }]], t); return K.camAt([[97.1, { x: 1880, y: 660, zoom: 1.15 }], [98.2, { x: 1960, y: 640, zoom: 1.15 }]], t); };
function a2InsetAli(ctx, t, rect, p, word) { a2Inset(ctx, t, rect, p, (c) => { const [x, y, w, h] = rect; c.save(); c.translate(x + w / 2, y + h / 2); c.scale(w / 1000 * 2.6, w / 1000 * 2.6); c.translate(-865, -690);
  c.drawImage(a2GladePlate(A2_G), 0, 0); abGladeBack(c, A2_G, t); const A = a2AliG(t); if (A) { a2Sash(c, A.P, t, 0); a2Ali(c, A.P, A2_G, { shadow: false }); } abThicketFront(c, A2_G, t); c.restore(); });
  if (word && p > 0.5) S0.label(ctx, word, rect[0] + rect[2] / 2, rect[1] + rect[3] + 40, K.clamp((p - 0.5) * 3), { size: 46 }); }
AB_SHOTS.push({ a: 90.9, b: 99.06, ww: 2400, cam: A2_S11_CAM, under: a2GladeUnder(A2_G), world: a2Out({}),
  over: (ctx, t, cam, S) => { if (t > 94.8 && t < 95.2) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, n: 22, alpha: 0.45 * Math.sin(Math.PI * beatIn(t, 94.8, 95.2)) });
    if (t > 95.82 && t < 97.25) a2InsetAli(ctx, t, [70, 90, 330, 240], K.clamp((t - 95.82) / 0.15) * (1 - K.clamp((t - 97.05) / 0.15)), 'WAIT!'); } });
// S12
const A2_S12_CAM = (t) => { if (t < 100.4) return { x: 1960, y: 640, zoom: 1.15 }; if (t < 101.5) { const x = Math.min(1960, A2_CAS_X(t) + 60 + 270 * (1 - beatIn(t, 100.4, 100.9))); return { x, y: 660, zoom: 1.15 }; }
  return K.camAt([[102.58, { x: 1700, y: 650, zoom: 1.2 }], [104.5, { x: 1640, y: 640, zoom: 1.05 }], [106.45, { x: 1620, y: 640, zoom: 1.05 }]], t); };
AB_SHOTS.push({ a: 99.06, b: 101.5, ww: 2400, cam: A2_S12_CAM, under: a2GladeUnder(A2_G), world: a2Out({}),
  over: (ctx, t, cam, S) => { if (t < 100.3) a2InsetAli(ctx, t, [70, 90, 330, 240], K.clamp((t - 99.06) / 0.15) * (1 - K.clamp((t - 100.15) / 0.15)), null);
    if (t > 100.5) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, n: 14, alpha: 0.3 }); } });
// the run through the trees (leftward tracking, speed lines, shafts)
const A2_RUN = (t) => 5000 - 430 * (t - 101.5);
function a2RunWorld(ctx, t, cam) { const tc = AB_T2(t), x = A2_RUN(tc);
  const A = { x: x - 80, y: 900, s: 0.95, dir: -1, ph: x / 26, amp: 1, tip: 0.14, gaze: [1, 0], lid: abLid(t, 95), brow: 0.2, handL: [-40, -120], handR: [-60, -140], mouth: 'closed', sq: 1 + 0.03 * Math.abs(Math.sin(x * 0.06)) };
  const C2 = { x: x + 30, y: 902, s: 1.1, dir: -1, ph: x / 24, amp: 1, tip: 0.1, gaze: [1, -0.1], lid: abLid(t, 96), mouth: 'o', brow: -0.6, handL: [20, -120], handR: [36, -116], sq: 1 + 0.04 * Math.abs(Math.sin(x * 0.05)) };
  a2Sash(ctx, A, t, 1); a2Ali(ctx, A, 'morning', { shc: '#6a4a2a' }); a2Cas(ctx, C2, 'morning', { shc: '#6a4a2a', fa: 1.0 + 0.1 * Math.sin(tc * 20) });
  const h = a2Hand(C2, 1, A2_CAS); abSack(ctx, h[0] + 6, h[1] + 40, 0.58, 1, { coin: true });
  for (const f of [0, 1]) { dustBurst(ctx, A.x + 40, 904, ((t * 3 + f * 0.5) % 1) * 0.4, 3, 3, 6, 16, 0.4, f + Math.floor(t * 3)); dustBurst(ctx, C2.x + 40, 904, ((t * 3 + f * 0.5 + 0.25) % 1) * 0.4, 3, 3, 6, 16, 0.4, 7 + f + Math.floor(t * 3)); } }
AB_SHOTS.push({ a: 101.5, b: 102.58, ww: 1e5, cam: (t) => ({ x: A2_RUN(t) - 40, y: 690, zoom: 1.25 }), under: (ctx, t, cam) => abForest(ctx, cam, t, 'morning'), world: a2RunWorld,
  over: (ctx, t) => abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, n: 24, alpha: 0.4 }) });
AB_SHOTS.push({ a: 102.58, b: 106.88, ww: 2400, cam: A2_S12_CAM, under: a2GladeUnder(A2_G), world: a2Out({}),
  over: (ctx, t, cam, S) => { if (t > 104.26 && t < 105.5) { S.arrow(ctx, abP(1540, 620, cam), abP(1620, 800, cam), K.clamp((t - 104.26) / 0.4), { color: '#7fe3ff' }); S.counter(ctx, 5, abP(1560, 560, cam)[0], 300, K.clamp((t - 104.26) / 0.3) * (1 - K.clamp((t - 105.2) / 0.3)), { size: 120, color: '#ffd36a' }); }
    abGlints(ctx, [abP(1560, 820, cam)[0], abP(1560, 820, cam)[1], 200 * cam.zoom, 100 * cam.zoom], t, 4, 31, 16); } });
