// ===== KD-022 store scenes: S5 the medicine store (70.0-86.9), S6 the mixing (86.9-106.9) =====
const K22MORT = [560, 760], K22BOWLT = [470, 750], K22POWDER = [640, 760];
const K22PEST = (t) => k22in(t, 101.16, 103.85) ? 1.3 + 0.08 * Math.sin((t - 101.16) * 2 * Math.PI * 1.5) : t >= 103.85 ? -0.9 : 0.5;   // v2: angled out toward him, the top below his chin
const K22MIX = (t) => mixHex(C.yellow, K22PURP, k22e(t, 101.2, 1.3));
// the man's x along the back of the table (his legs are hidden by the table)
const K22QX = [[70.1, 120], [71.6, 400], [79.9, 400], [84.5, 400], [84.8, 480], [88.36, 480], [88.8, 318], [89.7, 318], [90.1, 450], [90.6, 450], [91.0, 420], [93.16, 420], [95.5, 668], [99.9, 668], [100.3, 610], [106.6, 610]];
function k22storeQuack(t) {
  const P = { x: k22kv(t, K22QX), y: K22GR, s: K22S, dir: 1, mouth: 'smile', lid: 0.4 }, o = { t }, hand = {};
  const moving = Math.abs(speed((tt) => k22kv(tt, K22QX), t)) > 20; P.y -= moving ? 5 * Math.abs(Math.sin(t * 14)) : 0; o.trot = moving ? 0.08 * Math.sin(t * 14 - 0.8) : 0;
  let hL = null, hR = null, gaze = [0.3, -0.2];
  if (t < 71.6) { Object.assign(P, walk((tt) => k22kv(tt, K22QX), t, { stride: 34 })); P.sq = 1.06; P.tip = -0.05; gaze = [1, 0]; }
  if (k22in(t, 71.4, 77.7)) { gaze = t < 74.1 ? [0.1, -1] : [K.clamp((t - 75.8) / 1.8, -1, 1), -0.7]; P.drop = -4; P.tilt = -0.06; P.lid = 0.15; P.sq = 1.06; }
  if (k22in(t, 77.7, 78.36)) { hR = null; P.handR = PERSON_HANDS.wave.R; P.aR = null; gaze = [-1, 0]; P.mouth = 'smile'; P.lid = 0.35; P.sq = 1.08; }
  if (t >= 78.36) { P.sq = K.lerp(1.08, 0.96, k22e(t, 78.4, 0.3)); P.brow = -0.7; P.mouth = 'o'; P.lid = 0; o.sweat = t > 79.9 ? 1 : 0; }
  if (k22in(t, 78.36, 79.94)) gaze = k22sac(t, [[78.36, [0, 0]], [78.5, [-1, 0]], [78.75, [1, 0]], [79.0, [0.2, -1]], [79.25, [-0.7, -0.4]], [79.55, [0.8, -0.5]]]);
  if (k22in(t, 79.94, 80.64)) { const u = (t - 79.94) / 0.7; P.dir = u < 0.25 || u > 0.75 ? 1 : -1; P.sq *= u > 0.2 && u < 0.3 || u > 0.7 && u < 0.8 ? 0.94 : 1; o.trot = 0.2 * Math.sin(u * Math.PI * 2 - 0.5); P.ph = u * 6; P.amp = 0.4; gaze = [P.dir * 0.8, -0.5]; }
  // 80.64 takes the green jar down and reads it; 83.36 upside down; 84.3 back on the shelf
  // v2: the jar is held beside the head (hand outside the cheek at ear height, label to camera), never over the face; upside down beside the face on aktharuha
  if (k22in(t, 80.64, 84.6)) { const k = k22kv(t, [[80.64, [380, 760]], [81.0, [382, 612]], [81.3, [382, 612]], [81.8, [P.x + 96, 652]], [84.25, [P.x + 96, 652]], [84.6, [382, 612]]]); hR = k; const up = k22e(t, 83.4, 0.3) - k22e(t, 84.0, 0.3);
    hand.jar = { sd: 1, at: [k[0], k[1] + 30], key: 22, col: 'green', rot: Math.PI * up, ctr: true }; gaze = k22eye(P, [P.x + 96, 630]); P.mouth = 'frown'; P.tilt = k22in(t, 81.6, 84.4) ? 0.1 + 0.18 * up : 0; }
  // 84.92 lifts the lid of the powder jar and sniffs; 86.6 ACHOO
  if (k22in(t, 84.8, 86.9)) { const k = k22kv(t, [[84.8, [600, 760]], [85.0, [K22POWDER[0], 690]], [85.3, [540, 650]], [86.5, [540, 650]], [86.75, [600, 740]]]); hR = k; hand.powder = { at: [k[0], k[1] + 30] };
    hL = k22kv(t, [[84.8, [440, 760]], [85.0, [K22POWDER[0] - 4, 668]], [85.3, [430, 700]]]); hand.lid = k22in(t, 85.0, 86.9) ? hL : null;
    gaze = [0.5, 0.2]; P.lid = t > 85.3 ? 1 : 0.3; P.mouth = t < 85.9 ? 'closed' : 'o'; P.brow = t > 85.9 ? 0.4 : -0.3; P.tip = t < 86.6 ? -0.1 * k22e(t, 85.9, 0.7) : 0.2 * Math.exp(-(t - 86.6) * 5) - 0.02; P.sq = t < 86.6 ? 0.96 : landSquash(t, 86.6, 0.1);
    if (t > 86.6) { o.slip = 26 * k22e(t, 86.6, 0.12); P.mouth = 'open'; } }
  // ---------- S6 ----------
  if (t >= 86.9) { o.slip = 26 * (1 - k22e(t, 87.3, 0.4)); P.mouth = 'smile'; P.lid = 0.4; P.brow = 0; P.sq = 1; o.sweat = 0; }
  if (k22in(t, 87.3, 88.4)) { if (t < 87.7) P.handR = [24, -236]; gaze = t < 87.8 ? [0, 0] : t < 88.1 ? [-1, 0] : [0.2, 0]; if (t > 88.1) { P.handL = PERSON_HANDS.palmsUp.L; P.handR = PERSON_HANDS.palmsUp.R; P.sq = 1 + 0.05 * pulse(t, 88.1, 0.3); } }
  // pinch 1: the yellow leaf jar, eyes on the ceiling
  if (k22in(t, 88.8, 90.6)) { const k = k22kv(t, [[88.8, [300, 700]], [89.0, [272, 616]], [89.25, [272, 616]], [89.45, [222, 650]], [89.8, [222, 650]], [90.1, [460, 700]], [90.6, [362, 746]]]); hL = k; hand.jar = { sd: -1, at: [k[0], k[1] + 30], key: 21, col: 'yellow', mark: 'leaf', rot: k22in(t, 90.1, 90.5) ? 0.9 : 0, ctr: k22in(t, 89.25, 90.0) }; gaze = [0.1, -1]; P.mouth = 'smile'; if (k22in(t, 89.4, 89.9)) P.tilt = -0.1;
    if (k22in(t, 90.1, 90.5)) hR = [K22MORT[0] - 30, 700 + 10 * Math.sin(t * 30)]; }
  // pinch 2: eeny-meeny, eyes shut, the green jar
  if (k22in(t, 90.9, 93.0)) { const hop = [[91.1, [330, 625]], [91.4, [384, 625]], [91.7, [436, 625]], [92.0, [382, 616]]]; hR = t < 92.0 ? k22sac(t, hop) : k22kv(t, [[92.0, [382, 616]], [92.4, [K22MORT[0] - 20, 690]], [92.7, [K22MORT[0] - 20, 690]], [93.0, [640, 748]]]);
    if (t < 92.0) hR = [hR[0], hR[1] - 12 * Math.abs(Math.sin((t - 91.1) * Math.PI / 0.3))]; else hand.jar = { sd: 1, at: [hR[0], hR[1] + 30], key: 22, col: 'green', rot: k22in(t, 92.4, 92.7) ? -0.9 : 0 };
    P.lid = 1; P.mouth = 'o'; gaze = [0, 0]; }
  // the hand drifts along the shelf, past the blue jar, onto the red one
  if (k22in(t, 93.16, 95.6)) { hR = [P.x + 40, 618 + 4 * Math.sin(t * 9)]; P.handL = [-30, -84]; gaze = [0.6, -0.6]; P.lid = 0.55; P.mouth = 'closed'; }
  // v2: the red jar at shoulder height to the right of his face: face, X label and the POISON! arrow are three separate shapes
  if (k22in(t, 95.58, 101.2)) { const k = k22kv(t, [[95.58, [710, 616]], [95.9, [710, 616]], [96.4, [768, 736]], [98.8, [768, 736]], [99.2, [758, 706]], [99.85, [758, 706]], [100.3, [640, 700]], [101.2, [700, 748]]]); hR = [k[0], k[1] + 4 * Math.sin(t * 7) * (t > 96.4 && t < 98.8)];
    hand.jar = { sd: 1, at: [hR[0], hR[1] + 30], key: 25, col: 'red', mark: 'X', rot: k22in(t, 100.3, 100.7) ? -0.8 : 0, ctr: k22in(t, 96.0, 100.0), pulse: k22in(t, 96.56, 98.8) ? 0.5 + 0.5 * Math.sin(t * 10) : 0 };
    gaze = k22eye(P, [hR[0], hR[1] - 40]); P.mouth = 'smile'; P.lid = 0.3;
    if (k22in(t, 98.84, 99.9)) { P.brow = 0.35; P.mouth = 'frown'; P.lid = 0.6; P.tip = 0.04; }
    if (k22in(t, 99.75, 100.1)) { P.handL = PERSON_HANDS.palmsUp.L; P.mouth = 'smile'; P.brow = 0; }
    if (k22in(t, 100.25, 100.7)) { hL = [K22MORT[0] + 10, 700 - 30 * k22e(t, 100.35, 0.15)]; } }
  // grinding, two random pinches, the pour, the admired bowl
  if (k22in(t, 101.16, 103.85)) { const a = (t - 101.16) * 2 * Math.PI * 1.5, pa = K22PEST(t); hR = [K22MORT[0] + Math.sin(pa) * 108, K22MORT[1] - 40 - Math.cos(pa) * 90 + 8]; P.tip = 0.04 * Math.sin(a); o.trot = 0.1 * Math.sin(a - 1); gaze = [0.3, 0.6];
    if (t > 102.4) { gaze = [-1, 0]; P.mouth = 'o'; hL = k22kv(t, [[102.4, [460, 750]], [102.55, [K22POWDER[0] - 220, 700]], [102.7, [K22MORT[0] - 10, 690]], [102.85, [440, 748]], [103.0, [K22MORT[0] - 10, 690]], [103.2, [460, 750]]]); } }
  if (k22in(t, 103.85, 105.1)) { hR = [K22MORT[0] + 30, 700]; hL = [K22MORT[0] - 40, 700]; gaze = k22eye(P, K22BOWLT); P.mouth = 'closed'; P.lid = 0.3; }
  if (t >= 105.1) { const k = k22kv(t, [[105.1, [K22BOWLT[0], K22BOWLT[1] - 8]], [105.35, [600, 724]], [105.6, [700, 668]], [106.6, [700, 668]], [106.85, [560, 700]]]); hR = [k[0] + 14, k[1] + 4]; if (t < 105.4) hL = [k[0] - 16, k[1]]; else P.handL = [-40, -84]; hand.bowl = k; P.sq = 1.08; P.tip = -0.05; P.lid = 0.4; P.mouth = 'smile'; gaze = k22eye(P, k); if (t > 106.65) { P.dir = -1; gaze = [-1, 0]; } }
  if (hL) P.handLW = k22reach(P, -1, hL); if (hR) P.handRW = k22reach(P, 1, hR);
  if (hand.jar) { const w = hand.jar.at, hh = k22reach(P, hL && hand.jar.key !== 25 && !(t > 91 && t < 93.2) && !(hand.jar.key === 22 && t < 84.6) ? -1 : 1, [w[0], w[1] - 30]), r = hand.jar.rot || 0;
    hand.jar.at = hand.jar.ctr ? [hh[0] - 42 * Math.sin(r), hh[1] - 20 + 42 * Math.cos(r)] : [hh[0], hh[1] + 30]; if (hand.jar.ctr) hand.jar.rotC = true; }
  if (hand.bowl) hand.bowl = P.handLW && t < 105.4 ? [(P.handLW[0] + P.handRW[0]) / 2, P.handRW[1] - 4] : [P.handRW[0] - 12, P.handRW[1] - 8];
  P.gaze = gaze; P.lid = Math.max(P.lid || 0, P.lid === 1 ? 1 : blink(t, 17)); return { P, o, hand };
}
function k22storeOfficial(t) {
  const xf = (tt) => k22kv(tt, [[70.0, 120], [70.6, 230], [77.7, 230], [78.3, 60]]), O = { ...K22OFF1, ...walk(xf, t, { stride: 34 }), y: K22GR, dir: t < 77.7 ? 1 : -1, mouth: 'smile', lid: 0.35 };
  O.handR = t < 71.4 ? PERSON_HANDS.armsOut.R : [40, -84]; O.handL = t < 71.4 ? [-40, -84] : [-40, -84]; if (k22in(t, 77.2, 77.7)) { O.tip = 0.16 * pulse(t, 77.2, 0.5); }
  O.gaze = k22eye(O, [500, 400]); O.lid = Math.max(O.lid, blink(t, 23)); return O;
}
function k22drawStore(ctx, t) {
  k22storeBack(ctx);
  const door = t < 70.0 ? 0 : k22e(t, 70.0, 0.5) * (1 - k22e(t, 78.0, 0.4)); townDoor(ctx, 40, 170, 560, K22GR, door, { arch: 'round', inside: (k) => { k.fillStyle = '#e9c98a'; k.fillRect(0, 0, K22W, K22H); } });
  k22herbs(ctx, t);
  const Q = k22storeQuack(t), take = {}; if (Q.hand.jar) take[Q.hand.jar.key] = true;
  const placed = { 21: t > 90.6, 22: t > 93.0, 25: t > 101.2 };   // jars left on the table after use
  if (t > 90.6) take[21] = true; if (t > 93.0) take[22] = true; if (t > 95.9) take[25] = true;
  k22storeJars(ctx, t, { take, glint: k22in(t, 74.0, 77.8) ? [74.1, 0.15] : null, hop: t > 86.6 && t < 88 ? 86.62 : null, glow: { 24: k22in(t, 94.3, 94.9) ? pulse(t, 94.3, 0.6) : 0 } });
  if (t < 78.4) person(ctx, k22storeOfficial(t));
  k22quack(ctx, Q.P, Q.o);
  // the worktable and what stands on it
  k22table(ctx);
  const mixLv = t < 90.3 ? 0 : t < 92.6 ? 0.25 : t < 100.4 ? 0.45 : t < 103.9 ? 0.75 : 1 - k22e(t, 103.95, 0.8) * 0.85;
  const pour = k22in(t, 103.85, 105.1) ? k22e(t, 103.9, 0.25) * (1 - k22e(t, 104.8, 0.25)) : 0;
  ctx.save(); ctx.translate(K22MORT[0], K22MORT[1]); ctx.rotate(-0.6 * pour); ctx.translate(-K22MORT[0], -K22MORT[1]);
  const pest = K22PEST(t);
  k22mortar(ctx, K22MORT[0], K22MORT[1], { level: mixLv, mix: K22MIX(t), specks: t > 100.4 ? 1 : 0, pest, noPestle: pour > 0.1 }); ctx.restore();
  if (pour > 0.3) { ctx.save(); ctx.strokeStyle = K22PURP; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(K22MORT[0] - 62, 712); ctx.quadraticCurveTo(K22BOWLT[0] + 20, 705, K22BOWLT[0] + 6, K22BOWLT[1] - 4); ctx.stroke(); ctx.restore(); }
  if (t > 103.85 && !Q.hand.bowl) k22bowl(ctx, K22BOWLT[0], K22BOWLT[1] - 6, { level: k22e(t, 103.95, 0.85), s: 0.8 });
  if (Q.hand.bowl) k22bowl(ctx, Q.hand.bowl[0], Q.hand.bowl[1], { level: 1, s: 0.8, bubble: t < 106.3 ? 0 : (t - 106.3) / 0.36 });
  if (k22in(t, 106.66, 107.0)) dustBurst(ctx, Q.hand.bowl ? Q.hand.bowl[0] + 6 : 560, (Q.hand.bowl ? Q.hand.bowl[1] : 640) - 6, t - 106.66, 5, 2, 5, 14, 0.3, 61);
  if (placed[21]) k22jar(ctx, 362, 760, { col: 'yellow', mark: 'leaf', s: 0.7, seed: 421 }); if (placed[22]) k22jar(ctx, 640, 760, { col: 'green', s: 0.7, seed: 422 }); if (placed[25]) k22jar(ctx, 700, 760, { col: 'red', mark: 'X', s: 0.7, seed: 425 });
  if (t < 84.85 || t > 86.9) k22jar(ctx, K22POWDER[0] - (t > 90 ? 220 : 0) + (t > 90 ? 0 : 0), 760, { col: 'white', s: 0.7, seed: 430, lidOff: t > 86.9 ? 6 : 0 });
  if (Q.hand.powder) { k22jar(ctx, Q.hand.powder.at[0], Q.hand.powder.at[1], { col: 'white', s: 0.7, seed: 430 }); }
  if (Q.hand.lid) shape(ctx, K.rectPts(Q.hand.lid[0] - 16, Q.hand.lid[1] - 6, 32, 11), '#8a501a', { lw: 3, seed: 431 });
  if (Q.hand.jar) { const j = Q.hand.jar; k22jar(ctx, j.at[0], j.at[1], { col: j.col, mark: j.mark, s: 0.88, rot: j.rot, seed: 400 + j.key, markPulse: j.pulse || 0 }); }
  // dust: the loose lid at 77.1, the sneeze at 86.6, the red pinch at 100.35
  dustBurst(ctx, K22POWDER[0], 690, t - 77.1, 7, 4, 9, 30, 0.7, 77);
  if (k22in(t, 86.6, 87.8)) dustBurst(ctx, 560, 720, t - 86.6, 14, 8, 20, 160, 1.1, 86);
  if (k22in(t, 100.35, 101.2)) { ctx.save(); ctx.fillStyle = C.red; const r = K.rng(100), u = k22e(t, 100.35, 0.8, 'out'); ctx.globalAlpha = 1 - u; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(K22MORT[0] + (r() - 0.5) * 90 * u, 690 - r() * 120 * u, 4, 0, 7); ctx.fill(); } ctx.restore(); }
}
