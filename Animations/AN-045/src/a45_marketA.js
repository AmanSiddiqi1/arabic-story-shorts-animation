// ===== AN-045: cast factories and Market A (S1-S6: the routine, the seller, the bundle, the steal) =====
const A45_TH = { costume: 'servant', pal: { robe: '#141414', dot: '#fffaf0', sash: C.yellow, hc: C.red }, age: 0.2, s: 1.25 };
const A45_SELLER = { costume: 'beanSeller', age: 0.6, s: 1.25 };
const A45_BUYER = { costume: 'merchant', pal: { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red }, s: 1.3 };
const A45_WIFE = { costume: 'villageWoman', s: 1.25 };
const A45_CROWD = [{ costume: 'villager', s: 1.15 }, { costume: 'maiden', s: 1.1 }, { costume: 'bedouin', s: 1.15 }, { costume: 'carpenter', s: 1.15 }, { costume: 'servant', child: true, s: 1.15 }];
const A45_ST = 26 * 1.25;   // walk stride at s 1.25
const a45Thief = (o) => ({ ...A45_TH, y: 900, lid: 0.45, brow: -0.4, ...o });
const a45Purse0 = (x, s = 1.15) => [x - 26 * s, 900 - 76 * s];
// draw a person with an optional purse on the sash
function a45Draw(ctx, P, purse) { if (P.handRW && P.handR) P.handR = null; if (P.handLW && P.handL) P.handL = null;   /* v2: a world hand target always wins (v1 silently ignored it when a local pose was also set) */
  person(ctx, P); if (purse != null) { const [px, py] = a45Purse0(P.x, P.s); a45Purse(ctx, px, py, P.s, purse); } }
// monkey sitting on the thief's right shoulder (v2: farther out and higher, drawn behind his head, so his face stays clear)
const a45Shoulder = (T) => [T.x + 95 * (T.dir || 1) + (T.tip || 0) * 200, T.y - 205 + (T.drop || 0) * 1.25 + Math.abs(Math.sin(T.ph || 0)) * 3 * (T.amp || 0)];
const a45MonkeyBase = (o) => ({ s: 0.7, dir: 1, y: 900, fez: true, mouth: 'smile', ...o });
// the two-finger signal: two short finger strokes at a hand point
function a45Signal(ctx, x, y, p) { if (p <= 0) return; const k = Math.sin(Math.PI * K.clamp(p)); seg(ctx, x + 6, y - 8, x + 26 + 10 * k, y - 22 - 4 * k, 5, C.white, 2.5); seg(ctx, x + 8, y - 2, x + 30 + 10 * k, y - 8 - 2 * k, 5, C.white, 2.5); }
// dotted eye line
function a45EyeLine(ctx, a, b, p) { if (p <= 0) return; ctx.save(); ctx.globalAlpha = K.clamp(p); ctx.setLineDash([3, 14]); ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.strokeStyle = C.black;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(K.lerp(a[0], b[0], K.clamp(p * 1.5)), K.lerp(a[1], b[1], K.clamp(p * 1.5))); ctx.stroke(); ctx.restore(); }

// ---------- Market A set ----------
const A45_SETA = { w: 1800, palace: false, stalls: [{ x: 250, kind: 'fruit', cols: [C.red, C.white] }, { x: 780, kind: 'cloth', cols: [C.yellow, C.red] }], props: [['mat', 1330, { w: 300 }]] };
function a45SetA(ctx, t, cam, u = 0.15) { marketStreet(ctx, { ...A45_SETA, u, t, camX: cam.x - 500 / cam.zoom }); }
function a45Pot(ctx, x) { shape(ctx, [[x - 46, 900], [x + 46, 900], [x + 34, 850], [x + 26, 838], [x - 26, 838], [x - 34, 850]], '#c8481a', { lw: 5, seed: 90, dot: '#8a2a0a', pitch: 8, rad: 0.25, da: 0.5 }); }

// ---------- S1 (0-10.4): the stroll, the label, the monkey's three tricks ----------
const A45_TX1 = (t) => kfn(t, [[1.0, -80], [2.75, 380]]);
const A45_P0X = (t) => kfn(t, [[0.3, -120], [3.0, 1150]], 'lin');     // villager passer-by
const A45_P1X = (t) => kfn(t, [[0.4, 1120], [3.1, -140]], 'lin');     // maiden passer-by
const A45_ONX = [720, 800, 880];
function a45Monkey1(t, T) {
  const sh = a45Shoulder(T); let M = a45MonkeyBase({ x: sh[0], y: sh[1], gaze: [0.3, 0.3] });
  if (t < 3.6) return null;
  if (t < 3.9) { const u = A45B(t, 3.6, 0.3, 'out'); M = { ...M, x: T.x + 40, y: K.lerp(T.y - 40, sh[1] - 6, u), eyes: 'wide', behind: true }; return M; }
  if (t < 4.75) { M.behind = true; M.sq = landSquash(t, 3.9, 0.12); M.gaze = t < 4.4 ? [-0.5, 0.2] : [0.6, 0.6]; M.ph = t * 3; return M; }
  if (t < 4.9) { M.behind = true; M.sq = anticipate(t, 4.75, 0.15, 0.14); return M; }
  if (t < 5.4) { const f = A45B(t, 4.9, 0.5, 'lin'); const [x, h] = hop(t, 4.9, 0.5, sh[0], 560, 120); M = { ...M, x, y: K.lerp(sh[1], 900, f * f) - h, sq: 1.12, gaze: [0.4, 0.8] }; return M; }
  M = { ...M, x: 560, y: 900, sq: landSquash(t, 5.4, 0.15), gaze: lookAt([560, 790], a45Eye(T)), ph: t * 2 };
  if (t >= 5.75 && t < 6.85) { const a = (t - 5.75) * 9; M.handR = [42 + Math.cos(a) * 12, -196 + Math.sin(a) * 12]; M.gaze = [0.5, -0.8]; M.tilt = Math.sin(a) * 0.08; }
  if (t >= 6.88 && t < 7.4) { const u = A45B(t, 6.88, 0.32, 'out'); M.rot = Math.PI * u; M.lift = 24 * Math.sin(Math.PI * K.clamp((t - 6.88) / 0.32)); M.handL = [-40, -210]; M.handR = [40, -210]; M.kick = Math.sin(t * 22) * 14; M.ph = t * 12; M.gaze = [0, -1]; }
  if (t >= 7.4 && t < 8.26) { const k = Math.sin((t - 7.4) * 11.3); M.handL = [-50, -150 - 30 * Math.max(0, k)]; M.handR = [50, -150 - 30 * Math.max(0, -k)]; M.mouth = 'open'; M.gaze = [0, -1]; M.sq = landSquash(t, 7.4, 0.1); }
  if (t >= 8.1 && t < 8.26) M.sq = anticipate(t, 8.1, 0.16, 0.16);
  if (t >= 8.26 && t < 8.86) { const u = A45B(t, 8.26, 0.6); M.rot = -2 * Math.PI * u; M.lift = 90 * Math.sin(Math.PI * K.clamp((t - 8.26) / 0.6)); M.sq = 1.08; }
  if (t >= 8.86) { M.sq = landSquash(t, 8.86, 0.16); M.handL = [-80, -150]; M.handR = [80, -150]; M.mouth = 'open'; M.gaze = [0, 0.1]; M.fezLag = swing(t, 8.86, 0.25); M.figs = true; }
  return M;
}
function a45S1(ctx, t, cam) {
  a45SetA(ctx, t, cam);
  // passers-by (never in step)
  const p0 = { ...A45_CROWD[0], ...walk(A45_P0X, t, { stride: 26 * 1.15 }), y: 900, gaze: [0.2, 0] }; if (t > 1.4 && t < 2.0) p0.gaze = [-0.6, -0.2];
  if (t < 3.1) a45Draw(ctx, p0, 0.3);
  const p1 = { ...A45_CROWD[1], ...walk(A45_P1X, t, { stride: 26 * 1.1, amp: 60 }), y: 900, gaze: [-0.4, 0] }; if (t > 0.9 && t < 1.5) p1.gaze = [-0.7, -0.3];
  if (t < 3.2) a45Draw(ctx, p1, 0.2);
  // onlookers step in (staggered) and laugh
  const on = [0, 2, 3].map((ci, i) => { const t0 = 9.1 + stagger(i, 0.11), x = kfn(t, [[t0, A45_ONX[i] + 260], [t0 + 0.7, A45_ONX[i]]], 'out'); const W = walk((tt) => kfn(tt, [[t0, A45_ONX[i] + 260], [t0 + 0.7, A45_ONX[i]]], 'out'), t, { stride: 30 });
    const P = { ...A45_CROWD[ci], ...W, y: 900, x, mouth: 'smile', gaze: lookAt([x, 680], [560, 820]) }; if (t > t0 + 0.4) { P.talk = 0.4 + 0.4 * Math.abs(Math.sin((t - t0) * 12 + i)); P.sq = 1 + 0.02 * Math.sin((t - t0) * 24 + i); } return P; });
  // the thief
  const W = walk(A45_TX1, t, { stride: A45_ST }); const T = a45Thief({ ...W, handL: [-18, -96], handR: [18, -98], seed: 11 });
  T.gaze = [0.3, 0.2];
  if (t > 1.2 && t < 2.5) T.gaze = lookAt(a45Eye(T), a45Purse0(A45_P0X(t)));
  if (t >= 2.82 && t < 3.25) { T.gaze = [0, 0.05]; T.brow = -0.8; T.lid = 0.3; }
  if (t >= 3.25 && t < 3.6) { T.gaze = [0.2, -1]; T.mouth = 'o'; T.lid = 0.35; }
  const M = a45Monkey1(t, T);
  if (M && t >= 3.6 && t < 4.9) { T.gaze = lookAt(a45Eye(T), [M.x, M.y - 100]); T.tilt = -0.05 * K.clamp((t - 3.9) / 0.15) * (t < 4.9 ? 1 : 0); }
  if (t >= 5.5 && t < 6.85) { const a = (t - 5.5) * 9; T.handR = [44 + Math.cos(a) * 12, -205 + Math.sin(a) * 12]; T.gaze = lookAt(a45Eye(T), [560, 800]); T.brow = -0.4; }
  if (t >= 6.85 && t < 9.74) { T.gaze = lookAt(a45Eye(T), [560, 780]); T.mouth = 'smile'; T.lid = 0.3; }
  if (t >= 9.74) { const pl = [[9.74, a45Purse0(A45_ONX[0])], [10.0, a45Purse0(A45_ONX[1])], [10.22, a45Purse0(A45_ONX[2])]]; T.gaze = look(t, a45Eye(T), pl, 0.07); T.lid = 0.5; T.mouth = 'closed'; }
  if (T.lid < 0.9) a45Lid(T, t, 11);
  if (M && M.behind) a45Monkey(ctx, M);
  a45Draw(ctx, T);
  if (M && !M.behind) { a45Monkey(ctx, M); if (M.figs) for (let i = 0; i < 3; i++) fig(ctx, M.x + 8 * 0.7 + (i - 1) * 14, M.y - 0.7 * 210 - 6 - (i === 1 ? 10 : 0), 11); }
  if (M && t >= 7.4 && t < 8.26) a45Juggle(ctx, M.x + 4, M.y - 150, t, 7.4, 150, 46);
  dustBurst(ctx, 560, 900, t - 5.4, 5, 6, 12, 30, 0.45, 3); dustBurst(ctx, 560, 900, t - 8.86, 5, 6, 12, 30, 0.45, 4);
  on.forEach((P, i) => a45Draw(ctx, P, i === 0 ? 1 : 0.4));
  return { T, M };
}
function a45O1(ctx, t, P, S, r, L) {
  if (t < 3.4) S.title(ctx, 'THE THIEF AND HIS MONKEY', 500, 175, A45B(t, 0.05, 0.6) * (t > 3.0 ? 1 - A45B(t, 3.0, 0.4) : 1), { size: 60, align: 'center' });
  if (a45In(t, 2.82, 4.3)) { const h = P(...a45Head(r.T)); L.arr([h[0] - 260, h[1] - 170], [h[0] - 60, h[1] - 50], 2.82, 4.3, { width: 18, bend: 0.2 }); L.lab('THIEF', h[0] - 280, h[1] - 210, 2.82, 4.3, { size: 50 }); }
  if (a45In(t, 8.6, 9.7)) L.word('HA HA!', 760, 360, 8.6, 9.7, 80, { rot: -0.08 });
}

// ---------- S2 (10.4-21.1): along the stalls, the signal, the act, the purses ----------
const A45_TX2 = (t) => kfn(t, [[10.6, 380], [14.4, 580]]);
const A45_ON2 = [680, 770, 860], A45_POT = 1010;
const a45TX2b = (t) => kfn(t, [[19.6, 580], [20.2, 618]]);
function a45S2(ctx, t, cam) {
  a45SetA(ctx, t, cam); a45Pot(ctx, A45_POT);
  const tx = t < 19.6 ? A45_TX2(t) : a45TX2b(t), W = walk((tt) => (tt < 19.6 ? A45_TX2(tt) : a45TX2b(tt)), t, { stride: A45_ST });
  const T = a45Thief({ ...W, x: tx, handL: [-18, -96], handR: [18, -98], seed: 11, gaze: [0.6, 0.1] });
  if (t >= 12.9 && t < 14.4) T.gaze = [Math.sin((t - 12.9) * 2.2) * 0.8, -0.1];
  if (t >= 13.0 && t < 14.6) T.mouth = 'smile';
  // the crowd: step to their places, then watch the act
  const on = [0, 2, 3].map((ci, i) => { const x = kfn(t, [[10.6 + i * 0.2, A45_ONX[i]], [11.6 + i * 0.2, A45_ON2[i]]]), P = { ...A45_CROWD[ci], x, y: 900, ph: x / 30, amp: K.clamp(Math.abs(speed((tt) => kfn(tt, [[10.6 + i * 0.2, A45_ONX[i]], [11.6 + i * 0.2, A45_ON2[i]]]), t)) / 40), gaze: [0.8, 0.2] }; return P; });
  const pass = { ...A45_CROWD[1], ...walk((tt) => kfn(tt, [[11.2, 1250], [13.4, 250]], 'lin'), t, { stride: 26 * 1.1, amp: 60 }), y: 900, s: 1.0, gaze: [-0.8, 0] };
  // the monkey
  let M = null; const sh = a45Shoulder(T);
  if (t < 10.75) { const u = A45B(t, 10.35, 0.4); const [x, h] = hop(t, 10.35, 0.4, 560, sh[0], 110); M = a45MonkeyBase({ x, y: K.lerp(900, sh[1], u) - h, sq: 1.08 }); }
  else if (t < 15.48) { M = a45MonkeyBase({ x: sh[0], y: sh[1], gaze: [Math.sin(t * 1.3) * 0.8, 0.2], fezLag: Math.sin(t * 7) * 0.08 * W.amp, ph: t * 2 }); if (t > 15.25) M.sq = anticipate(t, 15.25, 0.23, 0.15); }
  else if (t < 16.08) { const f = A45B(t, 15.48, 0.6, 'lin'), [x, h] = hop(t, 15.48, 0.6, sh[0], A45_POT, 260); M = a45MonkeyBase({ x, y: K.lerp(sh[1], 838, f) - h, sq: 1.12, rot: 0.3 * Math.sin(Math.PI * f), gaze: [0.6, 0.6] }); }
  else { M = a45MonkeyBase({ x: A45_POT, y: 838, sq: landSquash(t, 16.08, 0.15), handL: [-70, -170], handR: [70, -170], mouth: 'open', ph: t * 3 });
    if (t >= 16.18 && t < 16.9) { const u = A45B(t, 16.18, 0.7); M.rot = 4 * Math.PI * u; M.lift = 30 * Math.sin(Math.PI * u); M.ph = t * 14; M.fezLag = -0.3; }
    if (t >= 16.9) { M.lift = Math.abs(Math.sin((t - 16.9) * 5)) * 16; M.handL = [-75, -165 - 10 * Math.sin(t * 6)]; M.handR = [75, -165 + 10 * Math.sin(t * 6)]; M.fezLag = Math.sin(t * 10) * 0.1; }
    if (t >= 20.6) { M.gaze = lookAt([A45_POT, 740], a45Eye(T)); M.mouth = 'smirk'; M.lift = 0; } }
  // crowd reactions
  on.forEach((P, i) => { const t0 = 16.92 + stagger(i, 0.12); if (M) P.gaze = lookAt(a45Eye(P), [M.x, M.y - 90]);
    if (t >= 15.5) { P.mouth = 'smile'; } if (t >= t0) { P.tip = (0.06 + 0.02 * i) * A45B(t, t0, 0.35); const c = Math.abs(Math.sin((t - t0) * 9 + i)); if (t < t0 + 1.8) { P.handL = [-12 - 20 * c, -140]; P.handR = [12 + 20 * c, -140]; } P.talk = 0.3 * Math.abs(Math.sin((t - t0) * 11)); } });
  // the purses: pupils jump, the hand hovers
  if (t >= 14.6 && t < 15.5) { T.handRW = [tx + 52, 812]; T.gaze = [0.9, 0.35]; }
  if (t >= 15.5 && t < 18.3) T.gaze = lookAt(a45Eye(T), [M.x, M.y - 80]);
  if (t >= 18.3) { const pl = [[18.3, a45Purse0(A45_ON2[2])], [18.78, a45Purse0(A45_ON2[1])], [19.04, a45Purse0(A45_ON2[0])]]; T.gaze = look(t, a45Eye(T), pl, 0.07); T.brow = t < 18.78 ? -0.5 : t < 19.04 ? -0.65 : -0.8; T.noBlink = true; T.lid = 0.45; if (t > 19.04) { T.mouth = 'smile'; T.drop = -4; } }
  if (t >= 19.72) { const pu = a45Purse0(A45_ON2[0]), u = A45B(t, 19.72, 0.6); T.handRW = [K.lerp(tx + 40, pu[0] - 26, u) + Math.sin(t * 30) * 3 * u, K.lerp(800, pu[1], u)]; T.tip = 0.08 * u; T.lid = 0.5; }
  if (T.lid < 0.9 && !T.noBlink) a45Lid(T, t, 11);
  if (t > 11.2 && t < 13.4) a45Draw(ctx, pass, 0.3);
  const onSh = M && t >= 10.75 && t < 15.48; if (onSh) a45Monkey(ctx, M);
  a45Draw(ctx, T); if (t >= 14.6 && t < 15.5) a45Signal(ctx, tx + 52, 812, (t - 14.6) / 0.6);
  dustBurst(ctx, A45_POT, 840, t - 16.08, 5, 6, 12, 30, 0.45, 5);
  on.forEach((P, i) => a45Draw(ctx, P, i === 0 ? 1 : 0.4 - i * 0.1));
  if (M && !onSh) a45Monkey(ctx, M);
  if (t >= 16.92 && t < 17.7) on.forEach((P, i) => a45EyeLine(ctx, a45Eye(P), [M.x, M.y - 100], (t - 16.92 - i * 0.1) / 0.4 * (t < 17.5 ? 1 : 1 - (t - 17.5) / 0.2)));
  return { T, M, on };
}
function a45O2(ctx, t, P, S, r, L) {
  [[18.3, 2, 0.8], [18.78, 1, 0.9], [19.04, 0, 1.2]].forEach(([t0, i, k]) => { if (!a45In(t, t0, 20.5)) return; const pu = P(...a45Purse0(A45_ON2[i])); L.arr([pu[0] - 10 * k, pu[1] - 150 * k], [pu[0], pu[1] - 26], t0, 20.5, { width: 14 * k, bend: 0.1 }); });
}

// ---------- S3 (21.1-34.8): the old-clothes seller ----------
const A45_SX = 1330, A45_HEAP = [1250, 905];
const A45_V1 = (t) => kfn(t, [[28.3, 1820], [30.2, 860]], 'lin'), A45_V2 = (t) => kfn(t, [[29.4, 860], [31.2, 1820]], 'lin');
const A45_V3 = (t) => (t < 33.4 ? kfn(t, [[31.5, 860], [32.3, 1180]], 'out') : kfn(t, [[33.6, 1180], [34.7, 820]], 'in'));
function a45Post(ctx, x) { shape(ctx, [[x - 46, 560], [x + 46, 560], [x + 40, 905], [x - 40, 905]], C.yellow, { lw: 6, seed: 91, dot: C.red, pitch: 10, rad: 0.25, da: 0.5 });
  for (let y = 600; y < 900; y += 60) seg(ctx, x - 40, y, x + 40, y + 10, 6, C.red, 1.5); seg(ctx, x, 520, x, 905, 14, WOOD, 4); }
function a45SellerS3(t) {
  const P = { ...A45_SELLER, x: A45_SX, y: 900, gaze: [-0.4, 0.1], brow: -0.5, mouth: 'smile', seed: 23 };
  let shirt = null;   // [x, y, rot, sway]
  if (t >= 23.0) { P.talk = 0.6 * Math.abs(Math.sin(t * 9)) * (t < 24.2 ? 1 : 0); }
  if (t >= 24.18 && t < 27.4) { const sx = A45_SX + 30 * Math.sin((t - 24.18) * 3.2) * (t < 25.5 ? 1 : 0), sy = 770; shirt = [sx, sy, 0.05 * Math.sin(t * 3), Math.sin(t * 5) * 0.4];
    P.handLW = [sx - 52, sy - 60]; P.handRW = [sx + 52, sy - 60]; P.tip = 0.04; P.gaze = [Math.sin((t - 24.18) * 3.2), 0.1];
    if (t >= 25.62 && t < 26.38) { P.gaze = lookAt(a45Eye(P), [sx + 14, sy]); P.mouth = 'o'; }
    if (t >= 26.38) { P.gaze = lookAt(a45Eye(P), [sx - 40, sy - 420 * (t - 26.38) / 1.6]); P.mouth = 'smile'; P.lid = 0.3; } }
  if (t >= 27.4) { // calling with the shirt dangling from the left hand
    const callK = t < 30.68 ? 0.9 : K.lerp(0.9, 0.4, K.clamp((t - 30.68) / 1.2)); shirt = [A45_SX - 70, 760, 0.1 + 0.05 * Math.sin(t * 2), Math.sin(t * 3) * 0.3];
    P.handLW = [A45_SX - 60, 690]; P.handR = [34, -178 + (1 - callK) * 40]; P.talk = callK * Math.abs(Math.sin(t * 10)); P.brow = -0.5;
    P.gaze = [-0.6, 0.1];
    const v1 = A45_V1(t); if (t >= 28.6 && t < 30.2) { P.gaze = lookAt(a45Eye(P), [v1, 650]); P.handR = null; P.handRW = [K.clamp(v1 + 60, 1250, 1420), 720]; shirt = [K.clamp(v1 + 60, 1250, 1420) - 20, 760, 0.1, 0.3]; P.handLW = null; P.tip = 0.05 * Math.sign(v1 - A45_SX); }
    if (t >= 29.78 && t < 31.2) { P.gaze = lookAt(a45Eye(P), [A45_V2(t), 660]); if (t > 30.2) P.mouth = 'closed'; }
    if (t >= 31.3 && t < 32.3) { P.talk = 0.3 * Math.abs(Math.sin(t * 8)); P.mouth = 'closed'; P.gaze = [-0.8, 0.2]; P.lid = 0.3; }
    if (t >= 32.28 && t < 33.4) { P.handR = PERSON_HANDS.clasp.R; P.handL = PERSON_HANDS.clasp.L; P.handLW = null; P.handRW = null; P.brow = -0.6; P.tip = -0.06; P.mouth = 'smile'; P.talk = 0; P.gaze = lookAt(a45Eye(P), [1180, 640]); shirt = null; }
    if (t >= 33.4) { const out = t < 34.1; P.handLW = out ? [1240, 760] : null; P.handRW = out ? [1270, 760] : null; P.handL = out ? null : [-20, -80]; P.handR = out ? null : [20, -80]; P.talk = 0; P.mouth = t < 34.1 ? 'o' : 'frown';
      shirt = out ? [1255, 820, 0.2, 0.4] : [A45_SX - 30, 820, 0.4, 0.2]; P.gaze = lookAt(a45Eye(P), [A45_V3(t), 650]); }
    if (t >= 34.14) { P.gaze = [0.6, -1]; P.drop = 6 * A45B(t, 34.14, 0.4); P.brow = -0.2; P.lid = 0.3; } }
  return { P, shirt };
}
function a45S3(ctx, t, cam) {
  const u = kfn(t, [[30.55, 0.15], [32.05, 0.3]], 'lin'); a45SetA(ctx, t, cam, u);   // v2: the sky eases over 1.5 s (note 11)
  // post shadow stretches with the sun
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = NAVY2; const L = 60 + 160 * K.clamp((u - 0.15) / 0.15); ctx.beginPath(); ctx.moveTo(950, 900); ctx.lineTo(990, 900); ctx.lineTo(990 + L, 930); ctx.lineTo(950 + L, 930); ctx.fill(); ctx.restore();
  a45Stool(ctx, 1420, 900, 1.25);
  const sock = K.clamp((t - 24.94) / 0.5); a45Rags(ctx, A45_HEAP[0], A45_HEAP[1], 1.0, { shirt: false, sock: false }); shape(ctx, [[1310 + 30 * sock, 900], [1340 + 30 * sock, 892], [1348 + 30 * sock, 904], [1314 + 30 * sock, 908]], A45_GREY, { lw: 3.5, seed: 67 });
  const { P: Sl, shirt } = a45SellerS3(t); a45Lid(Sl, t, 23);
  // the thief peeks from behind the stall post (drawn first, the post covers him)
  const px = kfn(t, [[22.5, 930], [23.0, 975], [33.0, 975], [33.4, 960]]), T = a45Thief({ x: px, seed: 11, tip: 0.05, gaze: lookAt([px, 650], [A45_SX, 650]), handR: [30, -150] });
  if (t >= 23.3) T.mouth = 'smile'; a45Lid(T, t, 11);
  const M = a45MonkeyBase({ x: px - 4, y: 900 - 255 + 30 * (1 - A45B(t, 22.9, 0.4)), gaze: lookAt([px, 600], [A45_SX, 650]), handL: [-40, -60], handR: [40, -60] });
  a45Monkey(ctx, M); a45Draw(ctx, T); a45Post(ctx, 960);
  a45Draw(ctx, Sl);
  if (shirt) { a45Shirt(ctx, shirt[0], shirt[1], 0.85, { rot: shirt[2], sway: shirt[3] }); if (t >= 24.18 && t < 27.4) { a45Hand(ctx, shirt[0] - 48, shirt[1] - 58); a45Hand(ctx, shirt[0] + 48, shirt[1] - 58); }
    if (t >= 25.62 && t < 26.38) { const ho = [shirt[0] + 12, shirt[1] - 5], k = A45B(t, 25.75, 0.2) * (1 - A45B(t, 26.05, 0.15)); a45Hand(ctx, ho[0] + 4 - 30 * (1 - k), ho[1] + 4, 0.9); if (t > 26.05) a45Hand(ctx, ho[0], ho[1], 1.1); } }
  a45Moth(ctx, A45_SX - 50, 760, t, 26.38, 1.6, 1);
  // passers-by in front (bigger, s 1.3)
  if (t >= 28.3 && t < 30.2) { const W = walk(A45_V1, t, { stride: 34 }); const V = { ...A45_CROWD[0], ...W, s: 1.3, y: 930, gaze: [-1, 0] }; if (t > 28.9 && t < 29.7) { V.handL = PERSON_HANDS.palmsUp.L; V.tip = 0; } a45Draw(ctx, V); }
  if (t >= 29.4 && t < 31.2) { const W = walk(A45_V2, t, { stride: 32, amp: 50 }); const V = { ...A45_CROWD[1], ...W, s: 1.25, y: 930, gaze: t > 29.9 && t < 30.3 ? [0.6, 0.6] : [1, -0.1], mouth: 'o' }; if (t > 30.3) V.mouth = 'closed'; a45Draw(ctx, V); a45Brows(ctx, V, t > 29.9 && t < 30.6 ? -0.8 : 0); }
  if (t >= 31.5 && t < 34.7) { const W = walk(A45_V3, t, { stride: 34 }); const V = { ...A45_CROWD[2], ...W, s: 1.3, y: 930, gaze: lookAt([A45_V3(t), 650], [A45_SX, 700]) };
    if (t >= 32.3 && t < 33.4) { const up = A45B(t, 32.5, 0.4); const sx = 1230, sy = K.lerp(760, 540, up); V.handLW = [sx - 48, sy - 58]; V.handRW = [sx + 48, sy - 58]; V.gaze = [0.4, -0.6]; V.brow = 0.3; a45Draw(ctx, V); a45Shirt(ctx, sx, sy, 0.85, { sway: 0.3 });
      if (t > 32.95) { const k = A45B(t, 32.95, 0.2); a45Hand(ctx, sx + 14 + 20 * (1 - k), sy - 5); } a45Hand(ctx, sx - 48, sy - 58); }
    else { if (t >= 33.4 && t < 33.8) { V.handRW = [1260, 740]; } a45Draw(ctx, V); } }
  return { T, Sl };
}
function a45O3(ctx, t, P, S, r, L) {
  if (a45In(t, 23.58, 25.2)) { const h = P(...a45Head(r.Sl)); L.arr([h[0] + 230, h[1] - 170], [h[0] + 60, h[1] - 50], 23.58, 25.2, { width: 18, bend: -0.2 }); L.lab('SELLER', h[0] + 250, h[1] - 210, 23.58, 25.2, { size: 50 }); }
  if (a45In(t, 27.9, 29.0)) L.word('OLD CLOTHES!', 640, 230, 27.9, 29.0, 72, { rot: -0.05 });
  if (a45In(t, 28.0, 31.0)) { const m = P(r.Sl.x + 10, a45Head(r.Sl)[1] + 26); soundArcs(ctx, m[0] - 40, m[1], -1, t); }
  if (t >= 34.14) { const k = A45B(t, 34.14, 0.35), b = t > 34.45 ? -Math.abs(Math.sin((t - 34.45) * 9)) * 12 * Math.exp(-(t - 34.45) * 4) : 0;
    a45PopBox(ctx, S, 640, 120, 320, 120, k, { fill: C.white, lw: 7, seed: 8 }, (c) => { c.font = K.font(64, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.black; c.fillText('SOLD:', 760, 182); c.fillStyle = C.red; c.fillText('0', 880, 182 + b); }); }
}

// ---------- S4 (34.8-42.0): tired, the bundle, the rest, eyes at the edge ----------
const A45_SX4 = (t) => kfn(t, [[39.5, A45_SX], [40.1, 1400]]);
function a45S4(ctx, t, cam) {
  a45SetA(ctx, t, cam, 0.3); a45Stool(ctx, 1400, 900, 1.25);
  const sx = A45_SX4(t), P = { ...A45_SELLER, x: sx, y: 900, seed: 23, lid: 0.5, mouth: 'frown', lean: 0.08, brow: -0.2, gaze: [-0.3, 0.6] };
  let shirt = t < 37.5 ? [A45_SX - 30, 820, 0.4, 0.2] : null;
  if (t < 37.0) P.handLW = [A45_SX - 30, 760];
  if (t >= 34.92 && t < 36.1) { const k = pulse(t, 34.92, 1.1); P.handR = [K.lerp(20, 34, k), K.lerp(-80, -222, k)]; P.lid = 0.55; }
  if (t >= 36.18 && t < 36.98) { P.sq = t < 36.5 ? 1 + 0.03 * A45B(t, 36.18, 0.3) : 1.03 - 0.08 * A45B(t, 36.5, 0.4); P.drop = 6 * A45B(t, 36.5, 0.4); P.lid = 0.6; P.mouth = 'o'; }
  // kneel and gather
  let B = { x: 1250, open: 0, sq: 1, show: false };
  if (t >= 36.98) { P.kneel = settleTo(t, 36.98, 0, 1, 0.45, 0.08); P.lean = 0.04; P.drop = 4; P.mouth = 'closed'; P.gaze = lookAt(a45Eye(P), [1250, 880]); B.show = true; B.open = 1;
    const sw = Math.sin((t - 36.98) * 7); P.handLW = [1250 - 30 + sw * 30, 860]; P.handRW = [1290 + sw * 20, 870];
    if (t >= 37.5 && t < 37.92) shirt = [K.lerp(A45_SX - 30, 1250, A45B(t, 37.5, 0.4)), K.lerp(820, 870, A45B(t, 37.5, 0.4)), 0.6, 0];
    if (t >= 37.92) { B.open = 1 - A45B(t, 37.92, 0.9, 'lin'); P.handLW = [1210, 840 - 30 * Math.sin((t - 37.92) * 9)]; P.handRW = [1290, 840 - 30 * Math.cos((t - 37.92) * 9)]; }
    if (t >= 38.9) { B.open = 0; B.sq = impactSquash(t, 38.9, 0.88); P.handLW = [1236, 790 - 14 * pulse(t, 38.9, 0.3)]; P.handRW = [1266, 790 - 14 * pulse(t, 38.9, 0.3)]; P.drop = 4 + 6 * pulse(t, 39.1, 0.3); } }
  if (t >= 39.44) { P.kneel = 1 - A45B(t, 39.44, 0.3); B.x = kfn(t, [[39.5, 1250], [40.0, 1220]]); P.handLW = t < 40.0 ? [B.x, 790] : null; P.handRW = null;
    P.sit = settleTo(t, 39.85, 0, 1, 0.45, 0.14); P.seat = 'bench'; P.gaze = [0.3, 0.6]; P.sq = landSquash(t, 40.2, 0.06); if (t >= 40.0) { P.handL = [-34, -70]; P.handR = [34, -70]; } }
  if (t >= 40.5) { P.handR = PERSON_HANDS.chin.R; P.lid = 0.6; P.sq = breathe(t, 2, 0.02); P.gaze = [0.6, 0.8]; P.drop = 8; }
  if (P.lid < 0.9) a45Lid(P, t, 23);
  if (t < 36.98) a45Rags(ctx, A45_HEAP[0], A45_HEAP[1], 1.0, { shirt: false, sock: false });   // the heap stays until the cloth is spread under it
  if (B.show) { if (t < 38.9) a45Bundle(ctx, B.x, 902, { s: 0.9, open: B.open, contents: 'rags', shirt: t >= 37.92 }); else a45Bundle(ctx, B.x, 902, { s: 0.9, sq: B.sq }); }
  a45Draw(ctx, P); if (shirt) a45Shirt(ctx, shirt[0], shirt[1], 0.85, { rot: shirt[2], sway: shirt[3] });
  if (t >= 34.92 && t < 36.0) a45Sweat(ctx, sx + 40, a45Head(P)[1] - 20, (t - 35.2) / 0.8);
  if (t >= 36.25 && t < 36.9) { const k = (t - 36.25) / 0.65, m = a45Head(P); ctx.save(); ctx.globalAlpha = 1 - k; shape(ctx, ell(m[0] + 30 + 40 * k, m[1] + 40 - 20 * k, 14 + 14 * k, 10 + 8 * k, 12), C.white, { lw: 3, seed: 92 }); ctx.restore(); }
  // v2 (note 6): the thief leans out from behind the stall post at the left edge (as in S3), the monkey's head and fez pop up above him
  let T = null, M = null;
  if (t >= 41.55) { const x0 = cam.x - 500 / cam.zoom, k = K.ease.back(K.clamp((t - 41.55) / 0.3)), px = x0 - 60 + 70 * k;
    T = a45Thief({ x: px, seed: 11, tip: 0.22 * k, lid: 0.45, brow: -0.4, gaze: lookAt([px, 650], [1250, 840]), handR: [30, -150] });
    const km = K.ease.back(K.clamp((t - 41.72) / 0.22)); M = a45MonkeyBase({ x: px + 62, y: 900 - 262 + 80 * (1 - km), tip: 0.15, gaze: lookAt([px, 600], [1250, 840]), handL: [-40, -60], handR: [40, -60] });
    if (km > 0) a45Monkey(ctx, M); a45Draw(ctx, T); a45Post(ctx, x0); }
  return { Sl: P, B };
}
function a45O4(ctx, t, P, S, r, L) {
  if (a45In(t, 38.9, 40.3)) { const b = P(1250, 800); L.arr([b[0] + 40, b[1] - 260], [b[0] + 5, b[1] - 50], 38.9, 40.3, { width: 18, bend: 0.2 }); L.lab('BUNDLE', b[0] + 40, b[1] - 300, 38.9, 40.3, { size: 50 }); }
}

// ---------- S5 (42.0-54.2): the act for the seller ----------
const A45_TX5 = (t) => kfn(t, [[42.4, 860], [43.42, 1100]]), A45_MX = 1590;
function a45SellerSit(t, o = {}) { return { ...A45_SELLER, x: 1400, y: 900, sit: 1, seat: 'bench', seed: 23, handL: [-34, -70], handR: [34, -70], ...o }; }
function a45MonkeyAct(t, T) {
  const sh = a45Shoulder(T); let M = a45MonkeyBase({ x: sh[0], y: sh[1], gaze: [0.6, 0.3], ph: t * 2 });
  if (t < 45.5) { if (t > 45.45) M.sq = anticipate(t, 45.45, 0.29, 0.15); return M; }
  if (t < 46.34) { const f = A45B(t, 45.74, 0.6, 'lin'), [x, h] = hop(t, 45.74, 0.6, sh[0], A45_MX, 300); return { ...M, x, y: K.lerp(sh[1], 900, f) - h, sq: 1.12, rot: -0.4 * Math.sin(Math.PI * f), gaze: [0.6, 0.6] }; }
  M = a45MonkeyBase({ x: A45_MX, y: 900, dir: -1, sq: landSquash(t, 46.34, 0.15), mouth: 'open', ph: t * 3, gaze: [-0.5, 0.2] });
  if (t >= 46.34 && t < 47.0) { const i = Math.floor((t - 46.34) / 0.22), u = ((t - 46.34) % 0.22) / 0.22; M.lift = (24 + i * 16) * Math.sin(Math.PI * u); M.sq = u < 0.15 || u > 0.85 ? 0.88 : 1.06; M.fezLag = -0.25 * Math.sin(Math.PI * u); }
  if (t >= 47.0 && t < 47.9) { const k = Math.sin((t - 47.0) * 11.3); M.handL = [-50, -150 - 30 * Math.max(0, k)]; M.handR = [50, -150 - 30 * Math.max(0, -k)]; M.gaze = [0, -1]; if (t > 47.7) { M.gaze = [0.15, -1]; M.look = 0; } }
  if (t >= 47.9 && t < 48.62) { const u = A45B(t, 47.9, 0.25); M.rot = Math.PI * u; M.x = A45_MX - 50 * A45B(t, 48.15, 0.45); M.handL = [-40, -210]; M.handR = [40, -210]; M.ph = t * 12; M.kick = Math.sin(t * 16) * 12; M.lift = 12 * Math.abs(Math.sin((t - 48.15) * 9)); }
  if (t >= 48.62 && t < 52.08) { M.x = A45_MX - 50; M.rot = Math.PI * (1 - A45B(t, 48.62, 0.3)); M.sq = landSquash(t, 48.92, 0.12); M.handL = [-70, -160]; M.handR = [70, -160]; M.gaze = [-0.6, 0]; }
  if (t >= 51.9 && t < 52.08) { M.x = A45_MX - 50; M.sq = anticipate(t, 51.9, 0.18, 0.16); }
  if (t >= 52.08 && t < 52.68) { M.x = A45_MX - 50; const u = A45B(t, 52.08, 0.6); M.rot = 2 * Math.PI * u; M.lift = 90 * Math.sin(Math.PI * u); }
  if (t >= 52.68) { M.x = A45_MX - 50; M.sq = landSquash(t, 52.68, 0.15); M.handL = [-85, -150]; M.handR = [85, -150]; M.tip = t > 52.82 ? 0.08 * Math.sin((t - 52.82) * 4) : 0; M.gaze = [0, -1]; M.mouth = 'o'; M.nose = t > 52.82; }
  return M;
}
function a45S5(ctx, t, cam) {
  a45SetA(ctx, t, cam, 0.32); a45Stool(ctx, 1400, 900, 1.25);
  const W = walk(A45_TX5, t, { stride: A45_ST }), T = a45Thief({ ...W, seed: 11, mouth: 'smile', brow: -0.6, lid: 0.2, gaze: [0.8, 0.2] });
  if (t < 43.2) T.gaze = t > 42.8 && t < 43.1 ? lookAt(a45Eye(T), [1220, 860]) : [0.9, 0.1];
  if (t >= 43.42 && t < 44.3) { T.handR = PERSON_HANDS.wave.R; T.handR = [64 + 10 * Math.sin(t * 16), -196]; T.tip = 0.08 * pulse(t, 43.7, 0.6); }
  const M = a45MonkeyAct(t, T);
  if (t >= 45.02 && t < 45.5) { T.handR = [70, -150]; T.gaze = lookAt(a45Eye(T), [M.x, M.y - 80]); }
  if (t >= 45.4 && t < 45.74) { T.handRW = [T.x + 52, 812]; T.gaze = [0.9, 0.2]; }
  if (t >= 45.74 && t < 50.7) T.gaze = lookAt(a45Eye(T), [M.x, M.y - 100]);
  if (t >= 50.7) { const u = A45B(t, 50.7, 0.25); T.mouth = u > 0.5 ? 'closed' : 'smile'; T.lid = K.lerp(0.2, 0.45, u); T.brow = K.lerp(-0.6, -0.2, u); T.gaze = lookAt(a45Eye(T), [1220, 850]); }
  if (T.lid < 0.9) a45Lid(T, t, 11);
  // the seller
  const Sl = a45SellerSit(t, { lid: 0.6, gaze: [0.5, 0.8], handR: PERSON_HANDS.chin.R, drop: 8 });
  if (t >= 44.24) { Sl.lid = K.lerp(0.6, 0.1, A45B(t, 44.24, 0.5)); Sl.handR = t < 44.6 ? PERSON_HANDS.chin.R : [34, -70]; Sl.drop = 8 * (1 - A45B(t, 44.24, 0.4)) + 5 * pulse(t, 44.6, 0.4); Sl.gaze = lookAt(a45Eye(Sl), a45Head(T)); Sl.mouth = 'smile'; }
  if (t >= 45.74) Sl.gaze = lookAt(a45Eye(Sl), [M.x, M.y - (M.rot && Math.abs(M.rot) > 2 ? 30 : 110)]);
  if (t >= 48.62) { const lt = t - 48.62; Sl.talk = Math.abs(Math.sin(lt * 11)) * 0.9; Sl.sq = 1 + 0.035 * Math.sin(lt * 26); Sl.lid = lt < 0.6 ? 0.8 : 0.1; Sl.mouth = 'smile'; Sl.tip = -0.04; }
  if (t >= 49.88 && t < 50.6) { const c = Math.abs(Math.cos((t - 49.88) * Math.PI / 0.28)); Sl.handL = t < 50.4 ? [-14 - 26 * c, -130] : [-34, -70]; Sl.handR = t < 50.4 ? [14 + 26 * c, -130] : [40, -64]; }
  if (t >= 51.36) { Sl.tip = 0.06 + 0.06 * A45B(t, 53.62, 0.4); Sl.drop = 6 * pulse(t, 52.2, 0.4); Sl.talk = t < 52.8 ? Sl.talk : 0; if (t >= 52.8) Sl.mouth = 'open'; }
  if (t >= 53.62) { Sl.eyes = 'wide'; Sl.lid = null; }
  if (Sl.lid != null && Sl.lid < 0.9) a45Lid(Sl, t, 23);
  a45Bundle(ctx, 1220, 902, { s: 0.9 });
  if (t < 45.74) a45Monkey(ctx, M);
  a45Draw(ctx, T); if (t >= 45.4 && t < 45.74) a45Signal(ctx, T.x + 52, 812, (t - 45.4) / 0.34);
  a45Draw(ctx, Sl);
  if (t >= 45.74) a45Monkey(ctx, M);
  if (t >= 47.0 && t < 47.7) a45Juggle(ctx, M.x - 4, M.y - 150, t, 47.0, 150, 46);
  if (t >= 47.7 && t < 48.0) fig(ctx, M.x - 6, K.lerp(M.y - 300, M.y - 0.7 * 220, A45B(t, 47.7, 0.2)), 12);
  if (M.nose) { const nx = M.x - 0.7 * 6, ny = M.y - 0.7 * 135 - 40; fig(ctx, nx + Math.sin(t * 4) * 4, ny, 13, Math.sin(t * 4) * 0.3); }
  dustBurst(ctx, A45_MX, 900, t - 46.34, 5, 6, 12, 30, 0.45, 6);
  if (t >= 53.62) a45EyeLine(ctx, a45Eye(Sl), [M.x - 4, M.y - 0.7 * 135 - 40], (t - 53.62) / 0.5);
  return { T, Sl, M };
}
function a45O5(ctx, t, P, S, r, L) { if (a45In(t, 49.0, 50.4)) { const h = P(...a45Head(r.Sl)); L.word('HA HA!', h[0] + 30, h[1] - 170, 49.0, 50.4, 84, { rot: 0.07 }); } }

// ---------- S6 (54.2-63.4): the steal ----------
const A45_KNOT = [1220, 806];
const A45_TX6 = (t) => { if (t < 60.5) return 1100; const st = [[60.5, 1100], [60.72, 1070], [60.97, 1040], [61.22, 1010], [61.47, 980]]; for (let i = 1; i < st.length; i++) if (t < st[i][0]) return K.lerp(st[i - 1][1], st[i][1], K.ease.inOut(K.clamp((t - st[i - 1][0]) / 0.17))); return t < 62.6 ? 980 : kfn(t, [[62.6, 980], [63.1, 760]], 'in'); };
function a45S6(ctx, t, cam) {
  a45SetA(ctx, t, cam, 0.34); a45Stool(ctx, 1400, 900, 1.25);
  const tx = A45_TX6(t), T = a45Thief({ x: tx, ph: tx / 14, amp: t >= 60.5 && t < 61.5 ? 0.9 : t >= 62.6 ? walk(A45_TX6, t, { stride: A45_ST }).amp : 0, seed: 11, gaze: [0.8, 0.3], noBlink: true, lid: 0.45 });
  const Sl = a45SellerSit(t, { tip: 0.12, eyes: 'wide', mouth: 'smile', talk: Math.abs(Math.sin(t * 9)) * 0.6, gaze: [1, -0.2] });
  Sl.sq = 1 + 0.025 * Math.sin(t * 24);
  // the monkey keeps balancing far right
  const M = a45MonkeyBase({ x: A45_MX - 50, y: 900, dir: -1, handL: [-85, -150], handR: [85, -150], mouth: 'o', gaze: [0, -1], tip: 0.08 * Math.sin(t * 4) });
  let bx = 1220, by = 902, bBehind = false, bShow = true, bsq = 1, btilt = 0;
  if (t < 56.48) { T.gaze = look(t, a45Eye(T), [[54.2, [1400, 660]], [55.78, [1220, 840]], [56.0, [1400, 660]], [56.22, [1220, 840]]], 0.07); }
  if (t >= 56.48 && t < 58.16) { const u = A45B(t, 56.48, 1.0); T.handRW = [K.lerp(1150, A45_KNOT[0], u), K.lerp(800, A45_KNOT[1], u)]; T.tip = 0.1 * u; T.drop = -4 * u; T.gaze = look(t, a45Eye(T), [[56.48, [1220, 820]], [57.2, [1420, 640]], [57.5, [1220, 820]]], 0.07); if (t > 57.56) { bsq = 0.95; btilt = -0.04; } }
  // v2 false alarm (note 2): the laugh subsides, the seller's gaze drifts halfway to centre for 6 frames, the thief freezes; the monkey flips and the gaze snaps back
  const a45Drift = t >= 57.62 && t < 57.95;
  if (a45Drift) { Sl.talk = 0.1; Sl.mouth = 'closed'; Sl.sq = 1; Sl.tip = 0.06; Sl.gaze = [K.lerp(1, 0.05, A45B(t, 57.62, 0.12)), 0.05]; T.eyes = 'wide'; T.lid = null; T.gaze = lookAt(a45Eye(T), a45Head(Sl)); T.tip = 0.1; T.drop = -4; }
  if (t >= 58.16 && t < 59.62) { const u = A45B(t, 58.16, 0.8); bx = K.lerp(1220, 1112, u); by = K.lerp(902, 840, u) - 40 * Math.sin(Math.PI * u); T.handRW = [bx + 20, by - 96]; T.handLW = [bx - 30, by - 70]; T.tip = 0.1 * (1 - u) - 0.04 * u; btilt = swing(t, 58.96, 0.15); T.gaze = lookAt(a45Eye(T), a45Head(Sl)); T.lid = 0.45; T.eyes = null; }
  if (t >= 57.95 && t < 58.3) Sl.talk = Math.abs(Math.sin(t * 12)) * 0.9;
  if (t >= 59.62) { bBehind = true; bx = tx - 6; by = 845; T.handL = [-26, -88]; T.handR = [26, -90]; T.mouth = t < 60.5 ? 'o' : 'closed'; T.gaze = t < 60.4 ? [0.1, -1] : lookAt(a45Eye(T), a45Head(Sl)); T.lid = 0.45; T.eyes = null; T.tip = -0.03; }
  if (t >= 60.5 && t < 61.5) { const k = ((t - 60.5) % 0.25) / 0.25; T.drop = -6 * Math.sin(Math.PI * k); T.sq = 1.02; T.ph = Math.floor((t - 60.5) / 0.25) * Math.PI + Math.PI / 2 * Math.sin(Math.PI * k); T.amp = 1; }
  if (t >= 62.26 && t < 62.8) { T.handR = PERSON_HANDS.hush.R; T.gaze = lookAt(a45Eye(T), [M.x, M.y - 100]); T.mouth = 'closed'; }
  if (t >= 62.6) { bShow = true; }
  if (t >= 61.0 && t < 62.6) Sl.handR = t > 62.2 ? [64 + 10 * Math.sin(t * 16), -196] : Sl.handR;
  if (t >= 62.9) { Sl.handR = [64 + 12 * Math.sin(t * 16), -196]; Sl.gaze = lookAt(a45Eye(Sl), [M.x, 800]); Sl.tip = 0.04; }
  if (t >= 57.95 && t < 58.35) { const u = A45B(t, 57.95, 0.4); M.rot = -2 * Math.PI * u; M.lift = 70 * Math.sin(Math.PI * u); M.sq = 1.06; M.tip = 0; }
  // monkey bow and scamper
  if (t >= 62.6 && t < 63.0) { M.tip = 0.3 * pulse(t, 62.6, 0.4); M.handR = [30, -200]; M.fezUp = 14 * pulse(t, 62.6, 0.4); M.handL = [-30, -80]; M.mouth = 'smile'; M.gaze = [-0.8, 0.3]; }
  if (t >= 63.0) { M.x = kfn(t, [[63.0, A45_MX - 50], [63.4, 900]], 'in'); M.lift = 30 * Math.abs(Math.sin((t - 63.0) * 16)); M.handL = [-40, -60]; M.handR = [40, -60]; M.mouth = 'smile'; }
  a45Ghost(ctx, 1220, 902, 0.9, t >= 59.1 ? (0.6 + 0.4 * Math.sin(t * 8)) * 0.8 : 0);
  if (bBehind) a45Bundle(ctx, bx, by, { s: 0.85, tilt: 0.1 });
  if (!bBehind && bShow && t < 58.16) a45Bundle(ctx, bx, by, { s: 0.9, sq: bsq, tilt: btilt });
  a45Draw(ctx, T);
  if (!bBehind && t >= 58.16) { a45Bundle(ctx, bx, by, { s: 0.88, tilt: btilt }); a45Hand(ctx, bx + 20, by - 96); }
  if (t >= 56.6 && t < 58.16) a45Hand(ctx, T.handRW[0], T.handRW[1]);
  if (t >= 57.62 && t < 58.3) a45Sweat(ctx, tx + 46, a45Head(T)[1] - 30, (t - 57.62) / 0.68);
  a45Draw(ctx, Sl); a45Monkey(ctx, M);
  // the seller's eye line to the monkey stays alive (faint) through the reach and the lift; it breaks during the drift
  if (t >= 54.2 && t < 59.1 && !a45Drift) { const nx = M.x - 0.7 * 6, ny = M.y - 0.7 * 135 - 40 - (M.lift || 0); a45EyeLine(ctx, a45Eye(Sl), [nx, ny], (t < 54.6 ? 1 : 0.45) * (t > 58.8 ? (59.1 - t) / 0.3 : 1)); }
  if (t < 63.0) { const nx = M.x - 0.7 * 6, ny = M.y - 0.7 * 135 - 40; if (t < 62.6) fig(ctx, nx + Math.sin(t * 4) * 4, ny, 13, Math.sin(t * 4) * 0.3); }
  return { T, Sl, M };
}
function a45O6(ctx, t, P, S, r, L) {
  if (a45In(t, 59.2, 60.4)) { const b = P(1150, 640); L.word('SWIPE!', b[0] - 40, b[1] - 120, 59.2, 60.4, 80, { rot: -0.1, fill: C.yellow }); }
  if (a45In(t, 61.6, 62.9)) { const g = P(1220, 850); L.arr([g[0] + 40, g[1] - 260], [g[0] + 6, g[1] - 70], 61.6, 62.9, { width: 18, bend: -0.2 }); }
}
