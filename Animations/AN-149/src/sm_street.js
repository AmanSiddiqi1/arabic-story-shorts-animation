// ===== AN-149 townStreet strip (w 2000): school, neighbour, teacher's house; S1, S5-S6, S9-S12 (flashback), S14-S15 =====
const SM_ST = { w: 2000, school: { x0: 440, x1: 560, top: 690, cx: 500 }, neigh: { x0: 850, x1: 950, top: 700, cx: 900 }, home: { x0: 1370, x1: 1470, top: 700, cx: 1420 },
  owin: [780, 490, 120, 140], twin: [1475, 405, 170, 190], sill: 595, nail: [500, 704], book: [1488, 893] };
const SM_HOUSES = [
  { x0: -10, x1: 292, top: 470, col: 1, windows: [[70, 570, 80, 96], [190, 570, 80, 96]] },
  { x0: 300, x1: 700, top: 430, col: 0, door: [440, 560, 690, 'round'], windows: [[330, 520, 80, 90], [590, 520, 80, 90]] },
  { x0: 760, x1: 1060, top: 450, col: 2, door: [850, 950, 700, 'round'], windows: [[975, 560, 70, 90]] },
  { x0: 1068, x1: 1312, top: 500, col: 0, windows: [[1110, 580, 78, 92], [1210, 580, 78, 92]] },
  { x0: 1320, x1: 1680, top: 330, col: 1, door: [1370, 1470, 700, 'round'], windows: [[1350, 430, 70, 86]] },
  { x0: 1688, x1: 2010, top: 480, col: 2, windows: [[1740, 570, 80, 96], [1880, 570, 80, 96]] }];
const smFbU = (t) => (t < 128.16 ? 0.42 : 0.42 + 2 * smB(t, 128.16, 1.34, 'inOut'));
// the strip; o: {palette, u, doors [school, neigh, home], ow (old woman shutters), tw (teacher shutters), shut (school chain 0..1), board (alpha), swing, t}
function smStreetSet(ctx, t, o) {
  const A = marketStreet(ctx, { w: SM_ST.w, palette: o.palette, u: o.u, preset: o.preset, palace: false, houses: SM_HOUSES, doors: o.doors || [0, 0, 0], shutters: [1, 1, 1, 1, 1, 1], props: [['barrel', 180, {}], ['crate', 1150, {}]], t });
  if (o.u != null) { const d = dayCycle(((o.u % 1) + 1) % 1); townDim(ctx, 0, 0, SM_ST.w, 1230, d.night); }
  // the school sign board and the school door with chain, lock and CLOSED board
  const S = SM_ST.school; townBake(ctx, 'sm-sign', 380, 590, 240, 100, (c) => { shape(c, K.rectPts(392, 604, 216, 72), C.yellow, { lw: 6, seed: 951, dot: C.red, pitch: 8, rad: 0.2, da: 0.4 }); c.font = K.font(54, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.black; c.fillText('SCHOOL', 500, 642); });
  if (o.shut > 0) townDoor(ctx, S.x0, S.x1, S.top, 900, 0, { arch: 'round', lock: o.shut > 0.5, shut: o.shut, paint: WOOD });
  if (o.board > 0) smClosedBoard(ctx, SM_ST.nail[0], SM_ST.nail[1], o.swing || 0, o.board);
  return A;
}
// the old woman's upper window (neighbour): bust clipped to the opening
function smOldWin(ctx, t, o, P) { const [x, y, w, h] = SM_ST.owin;
  townWindow(ctx, x, y, w, h, { arch: 'round', shutters: o.ow ?? 0, col: '#4a5878', inside: P ? (c) => smPerson(c, P) : null }); seg(ctx, x - 12, y + h + 6, x + w + 12, y + h + 6, 12, STONE2, 4); }
// the teacher's upper window: bust, open book on the sill, sill ledge on top
function smTeachWin(ctx, t, o, P, book) { const [x, y, w, h] = SM_ST.twin;
  townWindow(ctx, x, y, w, h, { arch: 'round', shutters: o.tw ?? 1, lit: o.lit || 0, col: '#4a5878', inside: P ? (c) => { smPerson(c, P); if (P.hanky) shape(c, ell(P.HR[0] - 6, P.HR[1] + 4, 22, 16, 14), C.white, { lw: 3.5, seed: 961, dot: '#9ec3ff', pitch: 6, rad: 0.25 }); } : null });
  shape(ctx, K.rectPts(x - 15, SM_ST.sill, w + 30, 18), STONE2, { lw: 5, seed: 962, dot: STONED, pitch: 8, rad: 0.15, da: 0.3 });
  if (P) for (const k of ['HR', 'HL']) if (P[k] && P[k][1] > SM_ST.sill - 16) shape(ctx, ell(P[k][0], SM_ST.sill - 2, 11, 9, 12), C.white, { lw: 3.5, seed: 963, dot: C.skin, pitch: 5, rad: 0.3 });
  if (book) book(ctx); }
// window bust of the teacher: person standing behind the sill (feet below it)
function smBust(extra) { return { x: 1560, y: 668, s: 0.95, costume: 'merchant', age: 0.2, seed: 22, dir: -1, ...extra }; }

// ---------- S1: the scholar strolls past the small school ----------
const SM_S1X = smX([[0.0, -80], [3.1, 330]]);
function smS1(ctx, t) {
  smStreetSet(ctx, t, { palette: 'clear', preset: 'day', doors: [0.65, 0, 0], tw: 0, ow: 0 });
  sun(ctx, 860, 170, t); smTeachWin(ctx, t, { tw: 0 }, null); smOldWin(ctx, t, { ow: 0 }, null);
  if (t > 1.5) { smTablet(ctx, 548, 800 + 4 * Math.sin(t * 5), 0.8, { rot: -0.3 + 0.1 * Math.sin(t * 5), n: 3 }); soundArcs(ctx, 470, 780, -1, t, C.white); }
  const w = smWalk(SM_S1X, t, 1.1), P = { ...w, y: 900, s: 1.1, costume: 'physician', age: 0.6, seed: 31, dir: 1, tip: 0.03, gaze: [1, 0.1], mouth: 'smile', hL: [-30, -104] };
  if (t >= 3.1) { P.gaze = smLookAt(P, [500, 780]); P.brow = -0.4 * smB(t, 3.1, 0.3); P.tip = 0.03 + 0.04 * smB(t, 3.2, 0.4); P.hR = smTr(t, [[3.1, SM_H.rest], [3.2, SM_H.cupR, 0.35]]); }
  smPerson(ctx, P); smBook(ctx, P.HL[0] + 4, P.HL[1] - 6, 0.6, { col: C.blue, rot: 1.35 });
  for (const f of footfalls(SM_S1X, 0.05, 3.1, 24 * 1.1)) dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 9, 18, 0.4, Math.round(f.t * 10));
}
// ---------- S5-S6: the locked school, the neighbours, the walk to his house ----------
const SM_S5X = smX([[44.86, -70], [46.7, 310], [49.95, 310], [50.3, 290], [58.85, 290], [62.15, 1335]]);   // v2 (note 11): stops left of the CLOSED board
function smScholarS5(t) {
  const w = smWalk(SM_S5X, t, 1.1), P = { ...w, y: 900, s: 1.1, costume: 'physician', age: 0.6, seed: 31, dir: 1, mouth: 'smile', brow: -0.3, hL: [-30, -104] };
  const door = [480, 790], carp = [990, 690], old = [840, 524];
  if (t < 46.79) { P.gaze = [1, 0.05]; return P; }
  P.mouth = t < 47.4 ? 'smile' : 'closed'; P.brow = -0.5 * smB(t, 46.79, 0.4);
  P.hR = smHT(t, P, [[46.79, SM_H.rest], [46.9, { w: [418, 792] }, 0.3], [47.3, { w: [428, 796] }, 0.08], [47.4, { w: [418, 792] }, 0.08], [47.6, SM_H.rest, 0.4], [49.35, { w: [418, 760] }, 0.2], [49.55, { w: [428, 762] }, 0.08], [49.7, { w: [418, 760] }, 0.08], [49.85, { w: [428, 762] }, 0.08], [50.05, SM_H.rest, 0.3]]);
  P.tip = 0.05 * smB(t, 46.79, 0.3) * (1 - smB(t, 47.6, 0.4));
  P.gaze = smGaze(t, P, [[46.79, door], [48.4, [500, 760]], [50.3, [470, 560]], [50.75, [120, 700]], [51.0, carp]], 0.12);
  if (t >= 51.82) { P.gaze = smGaze(t, P, [[51.82, carp], [52.0, door], [52.4, carp], [53.4, carp], [56.3, old], [57.0, carp], [57.94, [440, 900]], [58.6, carp]], 0.2);
    P.hL = smTr(t, [[51.82, [-30, -104]], [51.9, [-100, -150], 0.25], [52.4, [-30, -104], 0.3]]); P.hR = smTr(t, [[51.82, SM_H.rest], [52.3, SM_H.palmR, 0.3], [53.2, SM_H.rest, 0.4], [57.94, SM_H.chest, 0.4], [58.7, SM_H.rest, 0.3]]);
    P.talk = smTalk(t, [[51.82, 52.35]], 0.6); P.brow = -0.6; if (t >= 57.94) { P.brow = -0.7; P.lid = t < 58.5 ? smB(t, 57.94, 0.15) * 0.9 : 0.4 * (1 - smB(t, 58.5, 0.3)); } }
  if (t >= 58.72) { P.mouth = 'closed'; P.y += smNods(t, [58.75], 0.3, 5); P.gaze = smLookAt(P, [P.x + 400, 700]);
    if (t >= 60.94) { P.mouth = 'frown'; P.brow = -0.5; P.hL = smTr(t, [[60.94, [-30, -104]], [61.0, SM_H.headL, 0.25], [61.5, [-30, -104], 0.3]]); }
    if (t >= 62.15) { P.gaze = smLookAt(P, [1420, 760]); P.tip = 0.05; P.hR = smHT(t, P, [[62.15, SM_H.rest], [62.2, { w: [1382, 760] }, 0.12], [62.3, { w: [1390, 762] }, 0.06], [62.42, { w: [1380, 760] }, 0.06], [62.55, { w: [1390, 762] }, 0.06], [62.67, { w: [1380, 760] }, 0.06], [62.8, { w: [1390, 762] }, 0.06], [62.95, SM_H.rest, 0.3]]);
      if (t >= 63.14) { P.gaze = smLookAt(P, [1440, 800]); P.brow = -0.7; P.tip = 0.05 - 0.04 * smB(t, 63.14, 0.4); } } }
  return P;
}
function smCarpenter(t) {
  const out = smB(t, 50.88, 0.8), P = { x: K.lerp(900, 990, out), y: 900, s: K.lerp(0.95, 1.05, out), costume: 'carpenter', age: 0.35, seed: 51, dir: -1, mouth: 'closed' };
  if (t < 50.88) { P.hidden = true; return P; }
  const w = smWalk((tt) => K.lerp(900, 990, smB(tt, 50.88, 0.8)), t, 1); P.ph = w.ph; P.amp = w.amp;
  const sc = [SM_S5X(t) + 0, 690];
  P.hR = smTr(t, [[50.88, [10, -110]], [51.0, [-10, -104], 0.2], [51.25, [12, -112], 0.2], [51.5, [-10, -104], 0.2], [51.8, SM_H.rest, 0.3], [55.6, SM_H.fwd, 0.25], [56.6, SM_H.rest, 0.4], [58.8, SM_H.wave, 0.25]]);
  P.hR = t >= 55.6 && t < 56.6 ? [-100, -150] : P.hR; P.hL = smTr(t, [[50.88, [-10, -104]], [51.0, [12, -112], 0.2], [51.25, [-10, -104], 0.2], [51.8, SM_H.restL, 0.3]]);
  if (smIn(t, 58.8, 59.6)) P.hR = [64 + 14 * Math.sin((t - 58.8) * 18), -196];
  P.gaze = smGaze(t, P, [[50.88, sc], [53.6, [1100, 760]], [54.2, sc], [55.6, [1500, 700]], [56.1, sc], [58.8, (tt) => [SM_S5X(tt), 690]]], 0.25);
  P.talk = smTalk(t, [[53.38, 54.5], [54.6, 58.1]], 0.7); P.brow = -0.3;
  return P;
}
function smOldWoman(t) { if (t < 51.28) return null; const P = { x: 840, y: 668, s: 0.85, costume: 'oldWoman', pal: { hc: '#f4efe0', hd: '#d8cfb8' }, seed: 52, dir: 1, mouth: 'frown', tip: 0.04 * smB(t, 51.28, 0.5) };
  P.gaze = smLookAt(P, [SM_S5X(t), 690]); P.x += smShakeX(t, 56.22, 1.6, 5, 2);
  P.hR = smTr(t, [[51.28, SM_H.rest], [56.5, SM_H.eyeR, 0.35], [57.6, SM_H.rest, 0.4]]); if (t >= 56.4 && t < 57.6) { P.lid = 0.6; P.gaze = [0, 0.5]; }
  return P; }
// the carpenter's answer balloon (S5) and the knock and sniff lines
function smS5Balloon(ctx, t, C2) {
  if (!smIn(t, 53.38, 58.72)) return; const p = Math.min(K.clamp((t - 53.38) / 0.3), K.clamp((58.72 - t) / 0.2)), top = smTop(C2);
  smBalloon(ctx, 770, 330, 340, 220, p, [top[0] - 30, top[1] - 6], (c) => {
    c.fillStyle = '#bfe0ff'; c.fillRect(-160, -110, 320, 220);
    // v2 (note 10): the mini teacher on المعلم 54.64 (fills the balloon), his house around him on بيته 55.60, the tear on حزين 56.22
    const bk = K.ease.back(K.clamp((t - 54.64) / 0.3)), hk = K.ease.back(K.clamp((t - 55.6) / 0.35));
    if (bk > 0) { c.save(); c.translate(0, 18);
      if (hk > 0) { c.save(); c.scale(hk, hk); shape(c, K.rectPts(-150, -95, 300, 200), TOWN_WALLS.cold[0], { lw: 5, seed: 971, dot: '#9aa4be', pitch: 8, rad: 0.15 }); shape(c, townArchPts(-62, 62, -60, 100, 'round'), NAVY2, { lw: 5, seed: 973 }); c.restore(); }
      c.save(); if (hk > 0.98) { K.poly(c, townArchPts(-60, 60, -58, 100, 'round'), true); c.clip(); } c.scale(bk, bk);
      const P = { x: 0, y: 205, s: 0.95, costume: 'merchant', pal: SM_MOURN, age: 0.2, noBlink: true, lid: 0.55, mouth: 'frown', gaze: [0, 0.6], wet: true }; smPerson(c, P); c.restore();
      if (t >= 56.22) { const P2 = { x: 0, y: 205, s: 0.95, costume: 'merchant', age: 0.2 }, h = smHead(P2), u = ((t - 56.22) * 0.9) % 1, k = K.ease.back(K.clamp((t - 56.22) / 0.3)); c.save(); c.translate(h[0] + 30, h[1] + 10 + u * 30); c.scale(k * 2, k * 2);
        c.beginPath(); c.moveTo(0, -11); c.quadraticCurveTo(6, -3, 6, 2); c.arc(0, 2, 6, 0, Math.PI); c.quadraticCurveTo(-6, -3, 0, -11); c.fillStyle = TEAR; c.fill(); c.lineWidth = 2.5; c.strokeStyle = C.black; c.stroke(); c.restore(); }
      c.restore(); }
    if (bk <= 0) smQ(c, 0, 0, 120, K.clamp((t - 53.6) / 0.3), C.red, 0.05);
  });
}
function smS5(ctx, t) {
  const sw = swing(t, 48.5, 0.22, 1.2, 1.2) + swing(t, 49.4, 0.08, 1.4, 2) + swing(t, 49.75, 0.08, 1.4, 2);
  smStreetSet(ctx, t, { palette: 'cold', preset: 'day', doors: [0, K.clamp((t - 50.88) / 0.4) * 0.85, t >= 63.14 ? 0.35 * smB(t, 63.14, 0.8, 'out') : 0], shut: 1, board: 1, swing: sw });
  const OW = smOldWoman(t); smOldWin(ctx, t, { ow: t < 51.28 ? 0 : smB(t, 51.28, 0.4) }, OW); smTeachWin(ctx, t, { tw: 0 }, null);
  const C2 = smCarpenter(t), P = smScholarS5(t);
  smPerson(ctx, C2); smPerson(ctx, P); smBook(ctx, P.HL[0] + 4, P.HL[1] - 6, 0.6, { col: C.red, rot: 1.35 });
  for (const f of footfalls(SM_S5X, 44.9, 62.2, 24 * 1.1)) dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 9, 18, 0.4, Math.round(f.t * 10));
  for (const k of [47.3, 49.55, 49.85]) smImpact(ctx, 436, 780, 26, pulse(t, k, 0.25), 4, Math.PI);
  for (const k of [62.3, 62.55, 62.8]) smImpact(ctx, 1396, 760, 22, pulse(t, k, 0.22), 4, 0);
  if (t >= 63.4) { ctx.save(); ctx.globalAlpha = smFade(t, 63.4, 64.3, 0.2); ctx.lineWidth = 4; ctx.strokeStyle = C.black; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let j = 0; j <= 10; j++) ctx.lineTo(1470 + j * 6 + (t - 63.4) * 30, 760 + k * 22 + Math.sin(j * 1.2 + t * 8) * 5); ctx.stroke(); } ctx.restore(); }
  smS5Balloon(ctx, t, C2);
  return { P, C2 };
}
const SM_S5_CAM = [[43.93, 460, 700, 1.4], [48.5, 460, 700, 1.4], [48.9, 500, 770, 1.8], [49.3, 500, 770, 1.8], [49.7, 460, 700, 1.4], [50.88, 460, 700, 1.4], [51.6, 690, 690, 1.3], [58.85, 690, 690, 1.3]];
function smS5Cam(t) { if (t < 58.85) return smCamK(SM_S5_CAM, t, 2000); const x = SM_S5X(t) + 230, k = smB(t, 58.85, 0.8); return smCamK([[0, K.lerp(690, Math.min(1500, x), k), K.lerp(690, 640, k), K.lerp(1.3, 1.2, k)]], t, 2000); }

// ---------- S9-S12: the told flashback at the upper window (dusk, dream wash) ----------
// v2 (note 6): he strolls out of frame (brisker) before the push-ins; the dream wash is drawn under the figures so he keeps his colours
const SM_SING1 = smX([[111.34, 1050], [117.3, 1560], [118.7, 1990]]), SM_SING2 = smX([[130.38, 1050], [137.0, 1400], [137.5, 1400], [138.7, 1990]]);
function smSinger(t) {
  const day2 = t >= 128.16, xf = day2 ? SM_SING2 : SM_SING1, t0 = day2 ? 130.38 : 111.34; if (t < t0 - 0.05 || xf(t) > 1975) return null;
  const w = smWalk(xf, t, 1.05), P = { ...w, y: 900 - 7 * Math.abs(Math.sin(w.ph * 0.5)) * w.amp, s: 1.05, costume: 'villager', pal: SM_SINGER, age: 0.3, seed: 61, dir: 1, eyes: 'shut', mouth: 'smile', tip: -0.04 };
  P.talk = 0.5 + 0.45 * Math.abs(Math.sin(t * 5.2)); P.drop = -4 * Math.abs(Math.sin(t * 2.6));
  P.hL = [-58, -168]; P.hR = [12 + 12 * Math.sin(t * 2 * Math.PI * 6), -112];
  if (day2 && smIn(t, 137.0, 137.6)) { P.eyes = 'open'; P.talk = 0; P.mouth = 'smile'; P.gaze = [0.3, 0]; const k = pulse(t, 137.0, 0.6); P.hR = [60, -104 - 10 * k]; P.y -= 6 * k; }
  return P;
}
function smSingerDraw(ctx, P) { if (!P) return; smPerson(ctx, P); const b = smW(P, [6, -116]); smOud(ctx, b[0], b[1], 0.8 * P.s, -0.85); shape(ctx, ell(P.HR[0], P.HR[1], 11, 11, 12), C.white, { lw: 3.5, seed: 981, dot: C.skin, pitch: 5, rad: 0.3 }); }
function smFbTeacher(t) {
  if (t >= 142.45) return null;
  const P = smBust({ pal: SM_GREEN, mouth: 'smile' }), down = [1250, 760];
  if (t < 110.8) { P.hR = { w: [1535, 586] }; P.hL = { w: [1588, 586] }; P.lid = 0.3; P.gaze = [0.1, 0.9]; P.talk = 0.15 * Math.abs(Math.sin(t * 7)); P.mouth = 'closed'; return P; }
  if (t < 117.9) { P.hR = smHT(t, P, [[110.8, { w: [1535, 586] }], [110.85, SM_H.cupR, 0.3]]); P.hL = { w: [1588, 586] }; P.tilt = 0.1 * smB(t, 110.8, 0.4); P.look = -0.6;
    const sg = smSinger(t); P.gaze = smGaze(t, P, [[110.8, [1600, 470]], [111.1, [1100, 760]], [111.6, sg ? smHead(sg) : down], [114.6, [1500, 640]], [115.4, (tt) => smLadyNote(tt)], [116.9, (tt) => smNamePos(tt)]], 0.2);
    if (t >= 117.2) { P.eyes = 'wide'; P.mouth = 'o'; P.s = 0.95 + 0.06 * smB(t, 117.2, 0.4); P.y = 668 + 12 * smB(t, 117.2, 0.4); P.hR = { w: [1530, 588] }; } return P; }
  if (t < 128.16) {   // S10: reasoning, then smitten
    P.hR = smHT(t, P, [[117.9, { w: [1532, 588] }], [117.92, SM_H.chin, 0.35], [124.48, SM_H.cheekR, 0.3]]); P.hL = smHT(t, P, [[117.9, { w: [1590, 588] }], [124.48, SM_H.cheekL, 0.3]]); P.lid = 0.15;
    P.gaze = smGaze(t, P, [[117.9, [1640, 360]], [118.6, [1500, 340]], [119.2, [1420, 330]], [119.7, [1360, 320]], [122.5, [1340, 300]], [124.48, [1700, 300]]], 0.07);
    if (t >= 124.48) { P.lid = 0.45; P.mouth = 'smile'; P.sq = 0.96; P.tilt = 0.12 * Math.sin(t * 1.7); P.x += 3 * Math.sin(t * 1.7); }
    return P; }
  if (t < 137.58) {   // S11: waiting two days, the second song
    P.hR = smHT(t, P, [[128.16, SM_H.chin], [129.89, SM_H.cupR, 0.25], [133.06, { w: [1532, 588] }, 0.3]]); P.hL = smHT(t, P, [[128.16, { w: [1590, 588] }], [130.2, SM_H.headL, 0.2], [130.6, { w: [1590, 588] }, 0.3]]); P.lid = t < 129.89 ? 0.45 : 0; P.mouth = 'smile'; P.tilt = t < 129.89 ? 0.1 : 0.08; P.look = t < 129.89 ? 0 : -0.6;
    const sg = smSinger(t); P.gaze = t < 129.89 ? [0.2, -0.4] : smLookAt(P, sg ? smHead(sg) : down);
    if (t >= 133.06) { P.gaze = smLookAt(P, [1290, 330]); P.s = 0.95 + 0.05 * smB(t, 133.06, 0.4); P.y = 668 + 10 * smB(t, 133.06, 0.4); P.mouth = 'open'; }
    return P; }
  // S12: the second leap
  P.hR = { w: [1532, 588] }; P.hL = { w: [1590, 588] }; P.s = 1.0; P.y = 678;
  P.eyes = t < 141.54 ? 'wide' : 'open'; P.noBlink = true; P.mouth = t < 138.6 ? 'smile' : 'closed'; P.gaze = smGaze(t, P, [[137.58, [1290, 330]], [138.6, [1290, 330]], [139.0, [1360, 420]], [139.96, [1360, 300]]], 0.5);
  if (t >= 141.54) { P.mouth = 'open'; P.wet = true;   // v2 (note 11): the wail starts on ماتت and holds 0.9 s before the whip
    P.brow = -0.9; P.gaze = [0, -1]; P.drop = 6; P.x += tremble(t, 3, 9); P.hR = SM_H.head; P.hL = SM_H.headL; }
  return P;
}
// the lady on the big note (S9) and the drifting name
function smLadyNote(t) { const u = smB(t, 115.38, 1.8, 'out'); return [K.lerp(1300, 1405, u) + 20 * Math.sin(u * 7), K.lerp(720, 470, u)]; }
function smNamePos(t) { const u = smB(t, 116.84, 0.6, 'out'); return [K.lerp(1420, 1440, u), K.lerp(300, 240, u)]; }   // v2 (note 6): in the open sky above the roof
function smMiniLady(c, x, y, s, t, o = {}) { const P = { x, y, s, costume: 'lady', seed: 71, noBlink: true, mouth: 'smile', hR: o.arms ? SM_H.armOut : [20, -120], hL: o.arms ? SM_H.armOutL : [-20, -120], ...o.P }; smPerson(c, P); smMystery(c, P, { t, glint: o.glint }); return P; }
// the book on the sill: reading, then slipping off (125.24) and landing in the street (127.3)
function smSillBook(t) { return (ctx) => {
  if (t >= 142.45 && t < 150.2) return;   // in S12 after the whip the strip is seen from the school; the book lies in the street (drawn by smStreetBook)
  if (t < 125.24 || t >= 150.2) { if (t < 125.24) { const flip = pulse(t, 109.26, 0.5); smBook(ctx, 1560, 588, 0.95, { col: C.blue, open: 1 - 0.3 * flip }); } return; }
  const slide = smB(t, 125.24, 1.36, 'in'), x = K.lerp(1560, 1470, slide);
  if (t < 126.6) { smBook(ctx, x, 588, 0.95, { col: C.blue, open: 1 - slide * 0.7, rot: -0.3 * K.clamp((x - 1500) / -40) }); return; }
  if (t < 127.3) { const y = fallY(t, 126.6, 127.3, 588, SM_ST.book[1] - 6); smBook(ctx, K.lerp(1468, SM_ST.book[0], (t - 126.6) / 0.7), y, 0.95, { col: C.blue, rot: -0.5 - (t - 126.6) * 5 }); } }; }
function smStreetBook(ctx, t) { if (t < 127.3 || t >= 152.95) return; const q = impactSquash(t, 127.3, 0.6); ctx.save(); ctx.translate(SM_ST.book[0], SM_ST.book[1]); ctx.scale(2 - q, q); smBook(ctx, 0, -10, 0.95, { col: C.blue, rot: 0.08 }); ctx.restore(); dustBurst(ctx, SM_ST.book[0], 895, t - 127.3, 6, 5, 11, 40, 0.6, 7); }
// thought cloud at the window (S10 love, S12 death)
function smFbCloud(ctx, t, T) {
  const love = smIn(t, 119.66, 128.3), dead = smIn(t, 139.96, 142.45); if (!love && !dead) return;
  const p = love ? Math.min(K.clamp((t - 119.66) / 0.6), K.clamp((128.3 - t) / 0.3)) : Math.min(K.clamp((t - 139.96) / 0.5), K.clamp((142.45 - t) / 0.1)), sw = love ? 1 + 0.1 * pulse(t, 123.4, 0.9) : 1;
  const top = T ? smTop(T) : [1540, 430];
  thoughtCloud(ctx, 1350, 290, 360 * sw, 280 * sw, t, { p, tail: [top[0] - 26, top[1] + 4], scale: 0.55 * sw, at: [560, 800], bg: love ? '#fff3c4' : (t >= 141.54 ? '#d6d2e0' : '#e6eef8'), inside: (c) => {
    if (love) { // the poet bows to an empty pedestal; the lady rises in glory, face unknown
      shape(c, K.rectPts(560, 830, 160, 70), STONE2, { lw: 5, seed: 991, dot: STONED, pitch: 8, rad: 0.15 }); shape(c, K.rectPts(545, 815, 190, 20), STONE, { lw: 5, seed: 992 });
      // v2 (note 7): the poet is a white-and-blue figure, upright on the pedestal's ground line, bowing on يمدحونها 120.80 with the scroll held out
      const bow = settleTo(t, 120.8, 0, 1, 0.4, 0.15) * (0.85 + 0.15 * Math.sin((t - 120.8) * 3)), PO = { x: 410, y: 900, s: 0.9, costume: 'villager', pal: { robe: C.white, dot: '#9ec3ff', sleeve: C.white, sash: C.blue, hc: C.blue, hd: '#0d2f80' }, age: 0.5, seed: 81, dir: 1, tip: 0.22 * bow, noBlink: true, lid: 0.5, mouth: 'smile', hR: SM_H.fwd, hL: SM_H.chestL, gaze: [1, 0.2] }; smPerson(c, PO);
      c.save(); c.translate(PO.HR[0] + 18, PO.HR[1] - 4); c.rotate(-0.15); shape(c, K.rectPts(-34, -11, 68, 22), C.white, { lw: 4, seed: 993 }); seg(c, -34, -11, -34, 11, 7, C.yellow, 3); c.restore();
      if (t >= 122.5) { const r = smB(t, 122.5, 0.7, 'out'), g = r * (1 + 0.4 * pulse(t, 123.4, 1.0)); smGlow(c, 640, 640, 230, g, t); smMiniLady(c, 640, 815 + 120 * (1 - r), 1.0, t, { glint: 0.6 + 0.6 * pulse(t, 123.4, 0.9), P: { alpha: r } }); } }
    else { // the song's empty road, then the grave he invents
      shape(c, [[100, 900], [900, 880], [900, 1000], [100, 1000]], SANDL, { lw: 5, seed: 994, dot: C.red, pitch: 10, rad: 0.15 }); palmTree(c, 820, 895, { s: 0.42, fronds: 7, nuts: 0, t });
      if (t >= 141.54) { const r = smB(t, 141.54, 0.25, 'out'); smGrave(c, 500, 895, 1.4 * landSquash(t, 141.8, 0.1), { rise: r }); dustBurst(c, 500, 890, t - 141.6, 8, 8, 16, 70, 0.6, 3); } }
  } });
}
// hearts above the turban (S10-S12)
function smFbHearts(ctx, t, T) { if (!T) return; const h = smTop(T);
  if (smIn(t, 124.48, 128.16)) [124.5, 124.8, 125.1].forEach((a, i) => { const u = (t - a) / 2.2; if (u < 0 || u > 1) return; heart(ctx, h[0] + (i - 1) * 40 + 10 * Math.sin(u * 8 + i), h[1] - 20 - 160 * u, 18 * K.ease.back(K.clamp(u * 5)), { alpha: 1 - Math.max(0, u - 0.7) / 0.3 }); });
  if (smIn(t, 128.16, 141.8)) { const bob = t < 137.58 ? 8 * Math.sin(t * 3.2) + 10 * pulse(t, 129.89, 0.5) : 0; heart(ctx, h[0] + 6, h[1] - 34 + bob, 18); }
  if (smIn(t, 141.8, 142.45)) smHeartSplit(ctx, h[0] + 6, h[1] - 34, 18, smB(t, 141.8, 0.25));
  if (t >= 141.6 && t < 142.45) { const e = smHead(T); teardrops(ctx, t, 141.6, 142.45, [e[0] - 14, e[1]], { groundY: 600, rate: 10, vx: -40 }); teardrops(ctx, t, 141.65, 142.45, [e[0] + 14, e[1]], { groundY: 600, rate: 10, vx: 40 }); } }
// the song balloon of day two (S11) and its contents (reused by the S13 insert)
function smSongPic(c, t, tt, o = {}) {   // balloon-local units, centre (0, 0), about 380 x 230
  c.fillStyle = '#ffe9b0'; c.fillRect(-210, -150, 420, 300); shape(c, [[-210, 92], [210, 84], [210, 150], [-210, 150]], SANDL, { lw: 4, seed: 1001, dot: C.red, pitch: 8, rad: 0.15 });
  palmTree(c, 175, 94, { s: 0.17, fronds: 7, nuts: 0, t });   // v2 (Fable note 2): a palm marks the road's end, never a stone
  const lady = K.clamp((tt - 133.06) / 0.3), don = K.clamp((tt - 134.02) / 0.3), gone = tt >= 135.3 ? (tt - 135.3) / 0.9 : 0;
  if (don <= 0 && lady > 0) { c.save(); c.translate(-40, 92); c.scale(K.ease.back(lady), K.ease.back(lady)); smMiniLady(c, 0, 0, 0.62, t); c.restore(); }
  if (don > 0 && gone < 1.6) { const xf = (q) => (q < 135.3 ? -40 : -40 + (q - 135.3) * 380), x = xf(tt), k = K.ease.back(don);
    c.save(); c.translate(x, 92); c.scale(k, k); const D = { x: 0, y: 0, s: 0.46, dir: 1, pal: 0, ph: tt < 135.3 ? 0 : (tt - 135.3) * 14, amp: tt < 135.3 ? 0 : 1, earL: 0.8, earR: 0.8, tailSwish: Math.sin(t * 9), mouth: 'smile', seed: 72 };
    const seat = mountSeat('donkey', D); rideOn(c, 'donkey', D, { costume: 'lady', s: 0.5, seed: 71, noBlink: true, mouth: 'smile' });
    const rp = { x: seat.x + 22 * 0.5, y: seat.y + 52 * 0.5, s: 0.5, sit: 1, seat: 'bench', costume: 'lady' }; smMystery(c, rp, { t }); c.restore(); }
  if (gone > 0.2) for (let k = 0; k < 2; k++) dustBurst(c, 40 + k * 70, 92, (tt - 135.6 - k * 0.3) % 1.4, 4, 5, 10, 26, 1.2, 4 + k);
}
function smS11Balloon(ctx, t, sg) { if (!smIn(t, 131.54, 137.75)) return; const p = Math.min(K.clamp((t - 131.54) / 0.3), K.clamp((137.75 - t) / 0.2)), h = sg ? smTop(sg) : [1300, 640];
  smBalloon(ctx, 1300, 330, 420, 290, p, [h[0] + 10, h[1] - 20], (c) => smSongPic(c, t, t)); }
// the flashback street: S9-S12
function smFb(ctx, t, cam) {
  const u = smFbU(t), whip = t >= 142.45;
  const shut = whip ? K.clamp((t - 143.45) / 0.3) : 0, sw = swing(t, 143.9, 0.3, 1.3, 1.1);
  smStreetSet(ctx, t, { palette: 'dusk', u, doors: [whip ? (t < 143.3 ? 0.8 : 0.8 * (1 - smB(t, 143.3, 0.15, 'in'))) : 0.8, 0, 0], shut, board: whip ? K.clamp((t - 143.8) / 0.15) : 0, swing: sw });
  const d = dayCycle(((u % 1) + 1) % 1); if (d.moon) {}
  smOldWin(ctx, t, { ow: 0 }, null);
  // v2 (note 5): a stronger dream wash on the set only (panel corners), under the figures so nobody is dimmed
  { ctx.save(); ctx.setTransform(SM_PTF); smDreamWash(ctx, 0.6 * smFade(t, 107.66, 146.58, 0.5)); ctx.restore(); }
  const T = smFbTeacher(t); smTeachWin(ctx, t, { tw: 1, lit: whip ? 0 : 0.6 }, T, smSillBook(t));
  smStreetBook(ctx, t);
  const sg = smSinger(t); smSingerDraw(ctx, sg);
  if (sg) for (const f of footfalls(t < 128.16 ? SM_SING1 : SM_SING2, t < 128.16 ? 111.34 : 130.38, t < 128.16 ? 121.6 : 140.6, 24 * 1.05)) dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 8, 16, 0.35, Math.round(f.t * 10));
  // notes and the lady on the big note (S9), notes of day two (S11)
  if (sg) { const ob = smW(sg, [6, -116]); smNotes(ctx, ob[0] - 10, ob[1] - 70, t, { t0: t < 128.16 ? 112.0 : 131.0, t1: t < 128.16 ? 120.5 : 137.2, gap: 0.32, life: 1.6, to: t < 128.16 && t > 114.4 ? [1560, 470] : null, seed: t < 128.16 ? 5 : 8, s: 1.1 }); }
  if (smIn(t, 110.9, 113.2)) smNotes(ctx, 1235, 840, t, { t0: 110.9, t1: 111.7, gap: 0.22, life: 1.4, to: [1490, 560], seed: 12, s: 1.1 });   // v2 (note 5): his first notes reach the window before he is seen
  if (smIn(t, 115.38, 117.9)) { const [x, y] = smLadyNote(t), a = smFade(t, 115.38, 117.9, 0.25); ctx.save(); ctx.globalAlpha = a; note(ctx, x, y + 40, 2.4, C.red); smMiniLady(ctx, x - 14, y + 16, 0.36, t); ctx.restore(); }
  smFbCloud(ctx, t, T); smFbHearts(ctx, t, T); smS11Balloon(ctx, t, sg);
  if (whip) smFbSchool(ctx, t);
  return { T, sg };
}
// S12 second half: he locks the school, the pupils cheer, the costume turns black
const SM_RUN = smX([[142.62, 1080], [143.4, 600], [145.9, 600], [146.6, 760], [150.2, 1500]]);
function smFbSchool(ctx, t) {
  const tf = turnFlip(t, [[0, -1], [144.6, 1]], 0.5), f = smB(t, 144.83, 0.06), w = smWalk(SM_RUN, t, 1.05);
  const P = { ...w, y: 900, s: 1.05, costume: 'merchant', pal: smPalMix(SM_GREEN, SM_MOURN, f), age: 0.2, seed: 22, dir: t < 145.9 ? tf.dir : 1, noBlink: t < 144.6, mouth: 'open', brow: -0.8 };
  P.amp *= t < 145.9 ? 1.4 : 0.5; P.tip = t < 143.4 ? -0.12 : 0; P.sq = (t >= 143.4 && t < 143.8 ? 0.9 + 0.1 * smB(t, 143.4, 0.4) : 1) * (1 - 0.1 * tf.sink); P.drop = 22 * tf.tuck;
  P.hR = smHT(t, P, [[142.62, [70, -150]], [143.2, { w: [548, 790] }, 0.15], [143.6, { w: [500, 800] }, 0.15], [143.95, { w: [500, 706] }, 0.15], [144.3, SM_H.rest, 0.3], [145.74, SM_H.rest]]);
  P.hL = smTr(t, [[142.62, [-70, -150]], [143.3, SM_H.restL, 0.3]]);
  P.gaze = t < 144.0 ? smLookAt(P, [500, 790]) : [0.2, 0.7];
  if (t >= 144.3) { P.mouth = 'frown'; P.wet = true; P.lid = 0.5; P.tilt = 0.1; P.brow = -0.7; }
  if (t >= 145.74) { P.tip = 0.08; P.lid = 0.6; P.drop = 6; }
  smPerson(ctx, P); if (t >= 144.3) teardrops(ctx, t, 145.0, 147, () => smHead(P), { groundY: 895, rate: 2, vx: 10 });
  if (t < 143.4) for (const f of footfalls(SM_RUN, 142.62, 143.4, 24 * 1.05)) dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 9, 20, 0.35, Math.round(f.t * 10));
  smImpact(ctx, 560, 790, 30, pulse(t, 143.45, 0.3), 5, 0); smImpact(ctx, 500, 800, 26, pulse(t, 143.75, 0.25), 5, Math.PI / 2);
  // pupils: jump at the slam, look at the lock, throw the tablets and skip off left
  [0, 1, 2].forEach((i) => { const d = stagger(i, 0.1) + (i === 2 ? 0.1 : 0), x0 = [270, 330, 390][i], xf = smX([[144.6 + d, x0], [146.6 + d, x0 - 520]]), w2 = smWalk(xf, t, 0.7);
    const K0 = SM_KIDS[i], kp = { ...K0, s: K0.s * 0.95, ...w2, y: 900 - hop(t, 143.42 + d, 0.35, 0, 0, 26)[1] - (t > 144.6 + d ? 14 * Math.abs(Math.sin(w2.ph)) : 0), child: true, dir: t > 144.6 + d ? -1 : 1, mouth: t < 144.4 ? 'o' : 'open' };
    kp.gaze = t < 143.9 ? smLookAt(kp, [500, 790]) : t < 144.2 + d ? smLookAt(kp, [x0 + (i === 1 ? 60 : -60), 800]) : [-1, -0.3];
    kp.hR = t < 144.4 + d ? [24, -124] : [44, -205]; kp.hL = t < 144.4 + d ? [-24, -124] : [-44, -205]; if (t < 143.42) kp.eyes = 'open'; else if (t < 144.0) kp.eyes = 'wide';
    smPerson(ctx, kp);
    if (t < 144.4 + d) { const a = kp.HR, b = kp.HL; smTablet(ctx, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 14, 0.55, { n: 3, seed: 20 + i }); }
    else { const q = t - 144.4 - d; if (q < 1.4) smTablet(ctx, x0 + (i - 1) * 40 + q * 60, 640 - 420 * q + 520 * q * q, 0.55, { rot: q * 9 * (i % 2 ? 1 : -1), n: 3, seed: 20 + i }); } });
}
// v2 (note 5): open close on the reading bust (zoom 1.6), pull back and down on رجلًا 111.34 to reveal the street
const SM_FB_CAM = [[107.66, 1560, 520, 1.85], [111.34, 1560, 520, 1.85], [112.4, 1490, 600, 1.4], [114.5, 1480, 640, 1.4], [116.8, 1490, 560, 1.4], [117.9, 1490, 560, 1.4], [118.9, 1470, 430, 1.7], [128.16, 1470, 430, 1.7], [129.5, 1440, 600, 1.4],
  [137.58, 1440, 600, 1.4], [138.5, 1470, 430, 1.7], [142.45, 1470, 430, 1.7], [142.75, 560, 680, 1.2], [146.58, 560, 680, 1.2]];

// ---------- S14-S15: present day; the scholar leaves, rescues the book, walks home thinking ----------
const SM_S14X = smX([[150.6, 1420], [151.6, 1398], [152.3, 1398], [152.9, 1452], [156.84, 1452], [166.38, 760]]);
function smPresentTeacher(t) { const P = smBust({ pal: SM_MOURN, wet: true, lid: 0.5, mouth: 'frown', tilt: 0.08, brow: -0.6 });
  P.hR = smHT(t, P, [[150.2, SM_H.eyeR], [151.6, { w: [1532, 588] }, 0.4], [153.8, [10, -168], 0.2], [155.0, { w: [1532, 588] }, 0.5]]);
  P.hL = smHT(t, P, [[150.2, { w: [1590, 588] }], [153.8, [-8, -168], 0.2], [155.0, { w: [1590, 588] }, 0.5]]);
  if (smIn(t, 153.8, 155.0)) { P.hanky = true; P.lid = 1; P.x += tremble(t, 2, 7); P.sq = 1 + 0.04 * Math.abs(Math.sin(t * 9)); }
  P.gaze = t < 153.8 ? [0.1, 0.7] : smLookAt(P, [1452, 700]); return P; }
function smPresentScholar(t) {
  const xf = SM_S14X, w = smWalk(xf, t, 1.1), P = { ...w, y: 900, s: 1.1, costume: 'physician', age: 0.6, seed: 31, dir: 1, mouth: 'closed', brow: -0.4 }, win = [1560, 500], book = SM_ST.book;
  if (t < 150.6) { P.hidden = true; return P; }
  P.amp *= t < 156.84 ? 1 : 0.7;
  if (t < 156.84) {
    P.sq = t < 152.0 ? 1 + 0.03 * pulse(t, 151.6, 0.5) - 0.02 * pulse(t, 152.0, 0.4) : 1;
    P.gaze = smGaze(t, P, [[150.6, [1300, 760]], [151.6, [1300, 800]], [152.02, book], [153.7, win], [156.14, [900, 700]], [156.5, win]], 0.2);
    const dip = smB(t, 152.95, 0.25) * (1 - smB(t, 153.35, 0.3)); P.kneel = 0.55 * dip; P.sq = (P.sq || 1) * (1 - 0.08 * dip);
    P.hR = smHT(t, P, [[150.6, SM_H.rest], [151.6, [-10, -60], 0.4], [152.1, SM_H.rest, 0.2], [152.95, { w: [book[0] - 2, book[1] - 18] }, 0.25], [153.35, [40, -120], 0.3], [154.86, SM_H.palmR, 0.5], [156.14, SM_H.rest, 0.4]]);
    P.hL = smTr(t, [[150.6, SM_H.restL], [153.5, [26, -118], 0.15], [153.65, [10, -112], 0.12], [153.8, [26, -118], 0.12], [154.0, SM_H.restL, 0.3], [154.86, SM_H.palmL, 0.5], [156.14, [-30, -104], 0.4]]);
    if (t >= 153.7) { P.brow = -0.8; P.mouth = t > 155.5 ? 'smile' : 'closed'; }
    if (t >= 154.86) { P.brow = -1; P.x += smShakeX(t, 154.86, 1.3, 6, 2); P.tip = settleTo(t, 154.86, 0, -0.03, 0.5, 0.2); }
    if (t >= 156.14) P.dir = t < 156.4 ? 1 - 2 * smB(t, 156.14, 0.26) : -1;
    if (Math.abs(P.dir) < 0.3 && P.dir !== -1) P.dir = P.dir < 0 ? -0.3 : 0.3;
    return P; }
  // S15: walking home under the thought cloud
  P.dir = -1; P.hL = [-30, -104]; P.hR = [20, -96]; P.mouth = t < 172.0 ? 'closed' : 'smile';
  P.gaze = smLookAt(P, [K.lerp(P.x - 100, P.x + 120, 0.5), 300]);
  if (t >= 166.38) { P.wink = t < 171.6 ? 'L' : null; P.lid = t < 171.6 ? 0.45 : null; P.sq = 0.97; P.brow = -0.8; P.gaze = smLookAt(P, [P.x + 60, 330]); }
  if (t >= 171.8) { P.sq = landSquash(t, 171.85, 0.07) * (1 - 0.04 * pulse(t, 171.8, 0.3)); P.wink = null; P.lid = null; P.hR = smTr(t, [[171.8, [20, -96]], [172.1, SM_H.palmR, 0.4]]); P.hL = smTr(t, [[171.8, [-30, -104]], [172.1, [-40, -104], 0.4]]); P.y -= 5 * pulse(t, 172.3, 0.5); P.brow = -0.5; P.gaze = [0.1, 0.1]; }
  return P;
}
function smPresentKids(ctx, t) { if (t < 165.0) return; const ball = (t * 1.25) % 2, xb = ball < 1 ? K.lerp(320, 450, ball) : K.lerp(450, 320, ball - 1), yb = 760 - 140 * Math.sin(Math.PI * (ball % 1));
  [[320, 0], [450, 1], [385, 2]].forEach(([x, i]) => { const K0 = SM_KIDS[i], P = { ...K0, s: K0.s * 0.9, x, y: 900 - (i === 2 ? hop(t % 1.3, 0.2, 0.35, 0, 0, 20)[1] : 0), child: true, dir: x < 385 ? 1 : -1, mouth: 'open', gaze: lookAt([x, 790], [xb, yb]) };
    P.hR = Math.abs(xb - x) < 30 && i < 2 ? [44, -205] : [30, -150]; P.hL = Math.abs(xb - x) < 30 && i < 2 ? [-44, -205] : [-30, -150]; smPerson(ctx, P); });
  shape(ctx, ell(xb, yb, 16, 16, 16), C.red, { lw: 4, seed: 1011, dot: C.yellow, pitch: 6, rad: 0.25 }); }
function smPresent(ctx, t, cam) {
  smStreetSet(ctx, t, { palette: 'clear', preset: 'day', doors: [0, 0, t < 150.4 ? 0 : t < 151.6 ? 0.6 * smB(t, 150.4, 0.5) : 0.6 * (1 - smB(t, 151.6, 0.7))], shut: 1, board: 1, swing: swing(t, 171.8, 0.06, 1.4, 2) });
  sun(ctx, 1500, 170, t); smOldWin(ctx, t, { ow: 0 }, null);
  const T = smPresentTeacher(t); smTeachWin(ctx, t, { tw: 1 }, T, null);
  if (t < 152.95) smStreetBook(ctx, t);
  smPresentKids(ctx, t);
  const P = smPresentScholar(t); smPerson(ctx, P);
  if (t >= 153.35 && !P.hidden) { const h = t < 156.14 ? P.HR : P.HL; smBook(ctx, h[0] + 2, h[1] - 6, 0.85, { col: C.blue, rot: t < 156.14 ? -0.2 : 1.35 }); if (smIn(t, 153.5, 154.0)) dustBurst(ctx, h[0], h[1] - 10, t - 153.5, 5, 3, 7, 30, 0.5, 9); }
  if (t >= 156.84) for (const f of footfalls(SM_S14X, 156.84, 166.38, 24 * 1.1)) dustBurst(ctx, f.x, 898, t - f.t, 3, 4, 8, 16, 0.35, Math.round(f.t * 10));
  return { P, T };
}
function smPresentCam(t) { if (t < 156.84) return smCamK([[150.2, 1420, 700, 1.4], [151.0, 1420, 700, 1.4], [153.7, 1440, 640, 1.15], [156.84, 1400, 640, 1.15]], t, 2000);
  const z = smTr(t, [[156.84, 1.15], [157.0, 1.25, 1.4]]), sx = SM_S14X(t) - 96, x = t < 166.38 ? sx : K.lerp(SM_S14X(166.38) - 96, 600, smB(t, 166.38, 2.0)), y = 900 - (1150 - 615) / z;
  return smCamK([[0, t < 158.2 ? K.lerp(1400, x, smB(t, 156.84, 1.3)) : x, t < 158.2 ? K.lerp(640, y, smB(t, 156.84, 1.3)) : y, z]], t, 2000); }
