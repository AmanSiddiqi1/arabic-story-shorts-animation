// ===== AN-149 the teacher's sitting room (S7-S8, 64.22-107.66): the interview in a sickroom mood =====
const SM_RM = { sc: 380, tc: 640 };
function smRoomDressing(ctx) {
  townBake(ctx, 'sm-room-dress', 200, 360, 760, 560, (c) => {
    for (const y of [440, 560]) { seg(c, 240, y, 440, y, 10, BARKY, 3.5); for (const bx of [260, 420]) seg(c, bx, y + 6, bx - 10, y + 30, 6, BARKY, 2.5);
      const r = K.rng(y); let x = 252; while (x < 430) { const bw = 14 + r() * 10, bh = 52 + r() * 22, col = [C.red, C.blue, C.yellow, GREEN, '#7a4212'][Math.floor(r() * 5)];
        shape(c, K.rectPts(x, y - 5 - bh, bw, bh), col, { lw: 3.5, seed: 1100 + Math.floor(x) }); seg(c, x + 3, y - 5 - bh * 0.7, x + bw - 3, y - 5 - bh * 0.7, 2, C.yellow, 0); x += bw + 2; } }
    smBookStack(c, 790, 902, 5, { seed: 3 }); smBookStack(c, 880, 902, 3, { seed: 4 }); smBookStack(c, 830, 902 - 5 * 26, 0, {});
    smBook(c, 735, 898, 0.8, { col: C.blue, open: 0.35, rot: 0.02 });
  });
  smHankies(ctx, 745, 904, 0.9);   // v2 (note 9): on the teacher's far side, away from the scholar
}
function smRoomTeacher(t, S) {
  const P = { x: SM_RM.tc, y: 900, s: 1.15, costume: 'merchant', pal: SM_MOURN, age: 0.2, sit: K.lerp(0.55, 1, smB(t, 64.3, 0.35)), seat: 'floor', dir: -1, seed: 23, wet: true, lid: 0.55, tip: 0.07, tilt: 0.08, mouth: 'frown', brow: -0.6 };
  P.sq = landSquash(t, 64.65, 0.07) * breathe(t, 5, 0.02); const sH = S ? smHead(S) : [380, 734];
  P.hR = SM_H.knee; P.hL = SM_H.kneeL; P.gaze = [0.2, 0.9];
  if (smIn(t, 68.78, 70.4)) { P.sq *= t < 69.5 ? 1 + 0.04 * smB(t, 68.78, 0.6) : 1.04 - 0.08 * smB(t, 69.5, 0.5); if (t > 69.5 && t < 70.3) P.x += tremble(t, 1.8, 9); P.lid = 0.7; }
  P.x += smShakeX(t, 74.02, 0.8, 5, 1) + smShakeX(t, 75.32, 0.8, 6, 2) + smShakeX(t, 76.76, 0.9, 7, 3);
  if (smIn(t, 74.0, 77.7)) P.gaze = [Math.sin((t - 74) * 6 * Math.PI) > 0 ? 0.6 : -0.6, 0.8];
  if (smIn(t, 76.76, 77.7)) P.lid = 1;
  if (smIn(t, 75.32, 75.6)) P.sq *= 1.02;
  if (t >= 79.62) { P.hR = smTr(t, [[79.62, SM_H.knee], [79.65, [80, -96], 0.2], [79.9, [60, -86], 0.2], [80.38, SM_H.chest, 0.4]]); }
  if (t >= 80.38) { P.lid = K.lerp(0.55, 0.2, smB(t, 80.38, 0.5)); P.gaze = smLookAt(P, sH); P.brow = -0.8; P.tip = 0.04; P.x += tremble(t, 0.8, 7) * (t < 82.2 ? 1 : 0); }
  if (t >= 83.26) { P.lid = 0.45; P.mouth = 'smile'; P.gaze = smLookAt(P, [720, 400]); }
  if (t >= 85.48) { P.mouth = 'frown'; P.gaze = smLookAt(P, sH); P.lid = 0.45; P.hR = SM_H.knee;
    P.sq *= 1 - 0.03 * (pulse(t, 87.45, 0.2) + pulse(t, 87.8, 0.2) + pulse(t, 88.15, 0.2)); }
  if (t >= 91.66) { P.gaze = smGaze(t, P, [[91.66, [340, 400]], [92.28, [340, 400]], [92.6, [900, 620]]], 0.2); P.x += smShakeX(t, 92.6, 0.9, 6, 2); P.lid = 0.6; }
  if (t >= 93.89) { P.gaze = smGaze(t, P, [[93.89, [900, 640]], [94.2, sH], [94.45, [880, 700]], [94.8, sH], [95.0, [700, 880]]], 0.07); P.mouth = 'closed'; P.lid = 0.4; }
  if (t >= 94.92) { P.hR = PERSON_HANDS.clasp.R; P.hL = PERSON_HANDS.clasp.L; P.hR = [30 + 4 * Math.sin(t * 9), -134]; P.talk = smTalk(t, [[94.92, 98.7]], 0.35); P.sq *= 0.97; P.gaze = [0.2, 0.9]; }
  if (t >= 98.78) { const k = pulse(t, 98.78, 0.5); P.y -= 4 * k; P.hR = smTr(t, [[98.78, P.hR], [98.8, [50, -106], 0.25]]); P.hL = smTr(t, [[98.78, PERSON_HANDS.clasp.L], [98.8, [-50, -106], 0.25]]); P.gaze = smLookAt(P, sH); P.mouth = 'smile'; P.talk = 0; }
  if (t >= 99.97) { P.hR = PERSON_HANDS.clasp.R; P.hL = PERSON_HANDS.clasp.L; P.mouth = 'frown'; P.gaze = [0.2, 0.95]; P.lid = 0.6; P.noBlink = true;   // flinches 0.15 s after the recoil, eyes down
    P.x += 8 * pulse(t, 99.97, 0.3); P.sq *= 1 - 0.05 * pulse(t, 99.97, 0.3); P.tip = 0.07 - 0.05 * pulse(t, 99.97, 0.3); }
  if (t >= 102.26) { P.hR = smTr(t, [[102.26, PERSON_HANDS.clasp.R], [102.3, SM_H.knee, 0.5]]); P.hL = smTr(t, [[102.26, PERSON_HANDS.clasp.L], [102.3, SM_H.kneeL, 0.5]]); P.noBlink = false; }
  if (t >= 106.6) { P.gaze = smLookAt(P, [560, 400]); P.lid = 0.4; P.mouth = 'smile'; P.sq *= 1 + 0.03 * pulse(t, 106.6, 0.9); }
  return P;
}
const SM_RSX = smX([[65.44, 120], [66.6, SM_RM.sc]]);
function smRoomScholar(t, T) {
  const P = { y: 900, s: 1.15, costume: 'physician', age: 0.6, seed: 32, dir: 1, mouth: 'frown', brow: -0.5 }, tH = T ? smHead(T) : [640, 734];
  if (t < 65.44) { P.hidden = true; return P; }
  if (t < 85.48) { const w = smWalk(SM_RSX, t, 1.15); P.x = w.x; P.ph = w.ph; P.amp = w.amp; P.sit = smB(t, 66.9, 0.5); P.seat = 'floor'; P.sq = landSquash(t, 67.4, 0.06);
    P.gaze = smLookAt(P, tH); if (t < 66.6) P.y = 892;
    if (t >= 70.4) { P.tip = 0.08 * smB(t, 70.4, 0.4) * (1 - smB(t, 82.24, 0.4)); P.brow = -0.6; P.talk = smTalk(t, [[70.4, 72.9], [73.65, 77.3]], 0.45); }
    P.hR = smTr(t, [[66.9, SM_H.rest], [73.9, [62, -150], 0.25], [74.02, [62, -160], 0.1], [75.32, [64, -168], 0.1], [76.76, [66, -176], 0.1], [77.8, [60, -150], 0.3], [79.7, SM_H.rest, 0.5]]);
    if (t >= 82.24) { P.noBlink = true; P.lid = Math.max(blink(t, 32) * 0, pulse(t, 83.0, 0.18)); P.mouth = 'closed'; }
    if (t >= 84.9) { P.mouth = 'o'; P.brow = -0.9; P.sq = settleTo(t, 84.9, 1, 1.03, 0.35, 0.2); P.tip = settleTo(t, 84.9, 0, -0.05, 0.4, 0.2); P.noBlink = false; P.lid = null; }
    return P; }
  // S8
  const hx = hop(t, 85.6, 0.3, SM_RM.sc, 425, 14), hx2 = hop(t, 86.05, 0.3, 425, 470, 14); P.x = t < 86.05 ? hx[0] : hx2[0]; P.y = 900 - (t < 86.05 ? hx[1] : hx2[1]);
  P.sit = 1; P.seat = 'floor'; P.sq = landSquash(t, 85.9, 0.05) * landSquash(t, 86.35, 0.05); P.gaze = smLookAt(P, tH); P.mouth = 'smile'; P.brow = -0.4;
  const sh = [T.x - 31 * 1.15 + 2, 790];
  P.hR = smHT(t, P, [[85.48, SM_H.rest], [87.2, { w: sh }, 0.25], [87.45, { w: [sh[0], sh[1] - 10] }, 0.1], [87.6, { w: sh }, 0.1], [87.8, { w: [sh[0], sh[1] - 10] }, 0.1], [87.95, { w: sh }, 0.1], [88.15, { w: [sh[0], sh[1] - 10] }, 0.1], [88.3, { w: sh }, 0.1], [88.6, SM_H.rest, 0.4]]);
  P.hL = smTr(t, [[85.48, SM_H.restL], [88.54, [-86, -196], 0.4], [91.0, SM_H.restL, 0.5]]);
  P.talk = smTalk(t, [[88.54, 91.4], [91.66, 92.3]], 0.6); if (smIn(t, 89.2, 91.0)) P.gaze = smLookAt(P, [560, 400]);
  if (t >= 93.89) { P.mouth = 'closed'; P.brow = -0.6; P.tip = 0.03; }
  if (t >= 98.9 && t < 99.82) { P.noBlink = true; P.lid = Math.max(pulse(t, 99.0, 0.22), pulse(t, 99.4, 0.22)); P.sq = anticipate(t, 99.68, 0.14, 0.06); P.tip = 0.03 + 0.06 * pulse(t, 99.68, 0.14); }
  if (t >= 99.82) P.x -= 70 * settleTo(t, 99.82, 0, 1, 0.3, 0.15);   // thrown back and left
  if (t >= 99.82) { const k = K.clamp((t - 99.82) / 0.12); P.eyes = t < 101.1 ? 'wide' : 'open'; P.mouth = t < 101.1 ? 'open' : 'closed'; P.brow = -1;
    P.tip = settleTo(t, 99.82, 0, -0.14, 0.35, 0.3) * (1 - smB(t, 101.0, 0.6)) + 0.1 * smB(t, 102.26, 0.5); P.sq = settleTo(t, 99.82, 1, 1.06, 0.3, 0.3) - 0.06 * smB(t, 100.6, 0.5);
    P.tilt = -0.12 * smB(t, 99.95, 0.2) * (1 - smB(t, 107.0, 0.4)) + (t >= 101.1 && t < 101.75 ? 0.12 * smB(t, 101.1, 0.15) : 0);   // head and turban knocked crooked until 107 P.drop = -10 * pulse(t, 99.82, 0.3);
    P.hR = smTr(t, [[99.82, P.hR], [99.83, SM_H.up, 0.12], [101.0, SM_H.rest, 0.5], [102.6, SM_H.palmR, 0.3]]); P.hL = smTr(t, [[99.82, SM_H.restL], [99.83, SM_H.upL, 0.12], [101.0, SM_H.restL, 0.5], [102.26, SM_H.headL, 0.2], [102.6, SM_H.palmL, 0.3]]);
    P.gaze = t >= 101.1 && t < 101.75 ? [0, 0.05] : smLookAt(P, tH); if (t >= 101.1 && t < 101.75) { P.noBlink = true; P.lid = 0.25 + 0.75 * pulse(t, 101.3, 0.4); P.tip = 0; }   // look to camera, one slow blink
    P.talk = smTalk(t, [[102.26, 106.82]], 0.7); }
  if (t >= 106.6) P.gaze = smLookAt(P, [560, 400]);
  return P;
}
// little busts for the picture balloons: head at (x, y)
function smBustPic(c, x, y, s, F) { const P = { x, y: y + 195 * s, s, noBlink: true, gaze: [0, 0.3], ...F }; if (F.child) P.y = y + (195 + 9) * s * 0.62 + 0 * s; smPerson(c, P); return P; }
function smRoomBalloons(ctx, t, S, T) {
  const sTop = smTop(S), tTop = smTop(T), fade = (a, b, f = 0.3) => Math.min(K.clamp((t - a) / f), K.clamp((b - t) / 0.2));
  // v2 (note 10): balloon 15 % larger, three whole figures (feet visible) centred with clearance
  if (smIn(t, 70.4, 82.5)) smBalloon(ctx, 335, 405, 390, 236, fade(70.4, 82.5), [sTop[0] + 10, sTop[1] - 10], (c) => {
    c.fillStyle = '#e6eef8'; c.fillRect(-200, -125, 400, 250); if (t < 74.02) smQ(c, 0, 0, 120, (t - 70.6) / 0.3, C.blue);
    [[74.02, -108, { costume: 'ascetic', age: 1, mouth: 'closed', s: 0.58 }, 0], [75.32, 0, { costume: 'villager', age: 0, mouth: 'closed', s: 0.58 }, 1], [76.76, 108, null, 2]].forEach(([a, x, F, i]) => { const k = K.ease.back(K.clamp((t - a) / 0.3)); if (k <= 0) return;
      c.save(); c.translate(x, 80); c.scale(k, k); if (F) smPerson(c, { x: 0, y: 0, noBlink: true, gaze: [0, 0.3], ...F }); else [[-26, 'villageWoman'], [26, 'servant'], [0, 'carpenter']].forEach(([dx, cs], j) => smPerson(c, { x: dx, y: j === 2 ? -4 : 0, s: 0.42, costume: cs, mouth: 'closed', noBlink: true, gaze: [0, 0.3] }));
      c.restore(); smCross(c, x, 10, 46, (t - 79.62 - i * 0.2) / 0.2); }); });
  if (smIn(t, 83.26, 85.6)) smBalloon(ctx, 725, 410, 280, 220, fade(83.26, 85.6), [tTop[0] + 6, tTop[1] - 10], (c) => {
    c.fillStyle = '#fff3c4'; c.fillRect(-150, -120, 300, 240); smMiniLady(c, -40, 105, 0.62, t); if (t >= 83.9) heart(c, 80, -10, 34 * K.ease.back(K.clamp((t - 83.9) / 0.25)) * (1 + 0.15 * (pulse(t, 84.3, 0.25) + pulse(t, 84.7, 0.25)))); });
  if (smIn(t, 91.66, 93.8)) smBalloon(ctx, 340, 400, 400, 190, fade(91.66, 93.8), [sTop[0] + 20, sTop[1] - 10], (c) => {
    c.fillStyle = '#ffe9b0'; c.fillRect(-210, -100, 420, 200);
    [['lady', {}], ['maiden', {}], ['villageWoman', {}], ['lady', { robe: GREEN, dot: GREEND, sleeve: GREEN }], ['villageWoman', { robe: C.blue, dot: '#0d2f80', sleeve: C.blue, hc: C.white }]].forEach(([cs, pal], i) => { const k = K.ease.back(K.clamp((t - 91.66 - i * 0.2) / 0.3)); if (k <= 0) return;
      c.save(); c.translate(-150 + i * 75, 20); c.scale(k, k); smBustPic(c, 0, -20, 0.42, { costume: cs, pal, mouth: 'smile', gaze: [0, 0.2] }); c.restore(); }); });
  if (smIn(t, 97.38, 99.85)) smBalloon(ctx, 735, 425, 270, 220, fade(97.38, 99.85), [tTop[0] + 6, tTop[1] - 10], (c) => {
    c.fillStyle = '#e6eef8'; c.fillRect(-150, -120, 300, 240); smMiniLady(c, -50, 105, 0.6, t); smEyeIcon(c, 70, -10, 42, (t - 97.9) / 0.3); });
  if (smIn(t, 103.88, 106.9)) smBalloon(ctx, 340, 400, 380, 200, fade(103.88, 106.9),   // v2 (note 11): gone before the match-cut move
    [sTop[0] + 20, sTop[1] - 10], (c) => {
    c.fillStyle = '#fff3c4'; c.fillRect(-200, -110, 400, 220); heart(c, -110, -10, 44 * K.ease.back(K.clamp((t - 103.88) / 0.3)));
    smQ(c, 0, 0, 120, (t - 104.6) / 0.3, C.blue); if (t >= 105.66) { const k = K.ease.back(K.clamp((t - 105.66) / 0.3)); c.save(); c.translate(110, 0); c.scale(k, k); smEyeIcon(c, 0, 0, 46, (t - 105.9) / 0.3); c.restore(); } });
}
function smRoom(ctx, t, cam) {
  const T0 = smRoomTeacher(t, null), S = smRoomScholar(t, T0), T = smRoomTeacher(t, S.hidden ? null : S);
  palaceHall(ctx, { variant: 'merchant', wall: 'ochre', curtain: 0, desk: false, shelves: [], treasure: false, lampsLit: 0, u: 0.3, light: 0.5, t, doorOpen: t < 65.3 ? 0 : t < 66.8 ? 0.8 * smB(t, 65.3, 0.3) : 0.8 * (1 - smB(t, 66.8, 0.6)) });
  smRoomDressing(ctx);
  smCushion(ctx, SM_RM.sc + (t >= 85.48 ? K.clamp((t - 85.6) / 0.75) * 90 : 0), 906, 130, C.blue, C.white); smCushion(ctx, SM_RM.tc, 906, 140, '#55555f', '#26262e');
  smPerson(ctx, T); smPerson(ctx, S);
  if (t >= 66.9 && t < 70.4) { const e = smHead(T); teardrops(ctx, t, 66.9, 69.5, [e[0] - 15, e[1] + 4], { groundY: 870, rate: 3.5, vx: -10 }); teardrops(ctx, t, 67.05, 69.5, [e[0] + 15, e[1] + 4], { groundY: 870, rate: 3.5, vx: 10 }); }   // v2 (note 9): a steady stream on both cheeks
  smRoomBalloons(ctx, t, S, T);
  return { S, T };
}
// v2 (Fable note 3): the recoil plays inside the close two-shot (a 7 % pull-back that follows the scholar), the wide framing only after the look to camera
const SM_ROOM_CAM = [[64.22, 480, 700, 1.2], [66.9, 480, 700, 1.2], [67.35, 600, 690, 1.5], [69.6, 600, 690, 1.5], [70.4, 510, 645, 1.45], [93.89, 510, 645, 1.45], [94.5, 625, 650, 1.75], [99.72, 625, 650, 1.75], [100.0, 560, 650, 1.63], [101.75, 560, 650, 1.63], [102.9, 510, 645, 1.45], [106.6, 510, 645, 1.45], [107.66, 560, 520, 1.6]];
