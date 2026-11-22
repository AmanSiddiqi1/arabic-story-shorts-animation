// ===== ALI-06 shots S15-S18 (89.02-116.2): the thank-you feast in the courtyard at sunset (the ALI-04 evening model + feastSpread).
// The household round the low table (seated on cushions behind it), Morgiana with the tray, THANK YOU, MORGIANA!, the gold coin
// dropped, the casket and three futures, the smile and I WILL OPEN A SHOP IN THE MARKET!, the push into the shop picture (match cut).
// The jar row is cleared away for the feast (the rug lies where it stood).
const A6_SEAT = { ali: 1000, wife: 1090, kid: 1180, neph: 1290, morg: 905 };
const A6_FY = 884;   // seated feet line behind the table
const A6_MX15 = (u) => kfn(u, [[91.3, 560], [93.4, 790], [96.8, 790], [97.3, 900]]);

function a6FeastPeople(t) { const tc = AB_T2(t), r = (a) => beatIn(tc, a, a + 0.3), sitBack = (a) => beatIn(tc, a, a + 0.3);
  // rise at 92.0 (staggered, the kid last and scrambling); sit back at 97.2 (Ali stays standing for S16-S17)
  const up = (a) => r(a) * (1 - sitBack(97.2 + (a - 92.0) * 0.5));
  const A = { ...a5Base(t, 901), x: A6_SEAT.ali, y: A6_FY + 4, dir: 1, sit: 1 - r(92.0), seat: 'floor', gaze: [-1, 0.1], mouth: 'smile', handL: [-26, -104], handR: [26, -104] };
  if (tc < 92.0) { A.gaze = tc > 90.6 ? [-1, 0] : [1, 0.3]; if (tc > 90.14 && tc < 90.9) A.handR = [40 + 14 * Math.floor((tc - 90.14) * 6) % 3, -120]; }
  if (tc >= 92.0 && tc < 97.44) { A.handR = PERSON_HANDS.chest.R; A.dir = -1; if (tc > 93.22 && tc < 94.6) { A.talk = abTalk(t, 93.22, 94.5, 71, 0.6); A.mouth = A.talk ? 'open' : 'grin'; A.handL = [-80, -180]; } }
  const Wf = { ...a5Base(t, 911), x: A6_SEAT.wife, y: A6_FY, dir: -1, sit: 1 - up(92.4), seat: 'floor', gaze: [-1, 0], mouth: 'smile', handL: [-26, -104], handR: [40, -120] };
  if (tc > 90.14 && tc < 91.4) { Wf.handR = [60, -120]; Wf.gaze = [1, 0.5]; }
  if (tc > 94.8 && tc < 97.44) { Wf.sit = 0; Wf.x = kfn(tc, [[94.8, A6_SEAT.wife], [95.6, 870], [96.6, 870], [97.4, A6_SEAT.wife]]); Object.assign(Wf, walk((u) => kfn(u, [[94.8, A6_SEAT.wife], [95.6, 870], [96.6, 870], [97.4, A6_SEAT.wife]]), tc, { stride: 15 })); Wf.y = 900; Wf.dir = tc < 96.6 ? -1 : 1;
    if (tc > 95.62 && tc < 96.6) { Wf.handL = [40, -130]; Wf.handR = [50, -132]; Wf.dir = -1; } if (tc > 96.0 && tc < 96.5) { Wf.handL = [-20, -205]; } }
  const Kd = { ...a5Base(t, 921), x: A6_SEAT.kid, y: A6_FY, dir: -1, sit: 1 - up(92.7), seat: 'floor', gaze: [-1, 0.2], mouth: 'grin', handL: [-20, -60], handR: [20, -60] };
  if (tc > 92.7 && tc < 93.0) Kd.y -= 10 * Math.sin(Math.PI * beatIn(tc, 92.7, 93.0));
  if (tc > 96.0 && tc < 97.44) { Kd.sit = 0; const kx = (u) => kfn(u, [[96.0, A6_SEAT.kid], [96.6, 850], [96.8, 850], [97.4, 960]]); Object.assign(Kd, walk(kx, tc, { stride: 12 })); Kd.y = 902; Kd.dir = tc < 96.7 ? -1 : 1; if (tc > 96.5 && tc < 96.8) Kd.handL = [-16, -110]; if (tc > 96.8) Kd.handL = [-40, -70]; }
  const N = { ...a5Base(t, 931), x: A6_SEAT.neph, y: A6_FY, dir: -1, sit: 1 - up(92.2), seat: 'floor', gaze: [-1, 0.2], mouth: 'smile', handL: [-22, -104], handR: [24, -104] };
  if (tc > 90.14 && tc < 91.2) { N.handL = [60, -120]; N.gaze = [1, 0.2]; }
  if (tc > 94.4 && tc < 95.62) { N.handL = [60, -140]; N.handR = tc < 94.9 ? [70, -140] : [90, -200 + 40 * beatIn(tc, 94.9, 95.1)]; N.mouth = 'grin'; if (tc > 95.1) N.handR = [100, -150]; }
  const M = { ...a5Base(t, 941), ...a6Walk(A6_MX15, tc, 1, 15), y: 902, dir: 1, gaze: [1, 0], mouth: 'smile', handL: [40, -128], handR: [52, -126] }; let tray = tc < 95.62 ? 'M' : tc < 96.6 ? 'W' : null;
  if (tc >= 93.6 && tc < 94.4) { M.gaze = [-1, 0]; M.look = -0.4; M.dir = 1; M.mouth = 'o'; M.brow = -0.4; M.drop = 4; }
  if (tc >= 94.4 && tc < 95.62) { M.gaze = [1, 0]; M.mouth = 'o'; M.wet = 0.2; M.blush = 1; }
  if (tc >= 95.62) { M.handL = [-24, -104]; M.handR = [30, -110]; M.mouth = 'smile'; M.lid = Math.max(M.lid, 0.3); M.tilt = -0.05; }
  if (tc >= 96.8) { M.handL = [-50, -80]; }
  return { A, Wf, Kd, N, M, tray }; }

function a6S16Pose(t) { const tc = AB_T2(t), A = { ...a5Base(t, 951), x: 1010, y: 902, dir: -1, gaze: [-1, 0.3], mouth: 'smile', brow: 0, handL: [-26, -104], handR: PERSON_HANDS.chest.R };
  const M = { ...a5Base(t, 961), x: A6_SEAT.morg, y: 904, dir: 1, sit: 1, seat: 'floor', gaze: [1, -0.6], mouth: 'smile', handL: [24, -70], handR: [30, -72] }; let coin = null;
  if (tc >= 98.68 && tc < 101.12) { A.handR = [40, -215]; A.gaze = [0.4, -0.8]; coin = 'hand'; }
  if (tc >= 99.72 && tc < 101.0) { A.talk = abTalk(t, 99.72, 101.0, 81, 0.6); A.mouth = A.talk ? 'open' : 'closed'; A.gaze = [-1, 0.3]; }
  if (tc >= 101.12) coin = 'fall'; if (tc >= 101.76) { A.handR = [92, -136]; A.gaze = [-1, 0.4]; A.tip = 0.05; }
  if (tc >= 102.32) { A.talk = abTalk(t, 102.32, 103.1, 82, 0.6); A.mouth = A.talk ? 'open' : 'smile'; M.wet = 0.45; M.lid = Math.max(abBlinkAt(AB_T3(t), 102.9), 0.05); M.mouth = 'smile'; M.gaze = [1, -0.8]; }
  // S17: the casket
  if (tc >= 103.16) { A.handR = [40, -120]; A.handL = [36, -124]; A.mouth = 'smile'; A.x = kfn(tc, [[103.16, 1010], [103.6, 1060], [104.2, 1060], [104.9, 985], [108.4, 985], [108.9, 1040]]); Object.assign(A, walk((u) => kfn(u, [[103.16, 1010], [103.6, 1060], [104.2, 1060], [104.9, 985], [108.4, 985], [108.9, 1040]]), tc, { stride: 15 }));
    A.dir = tc < 103.6 ? 1 : tc < 104.2 ? 1 : -1; if (tc > 108.4) { A.handL = PERSON_HANDS.palmsUp.L; A.handR = PERSON_HANDS.palmsUp.R; A.dir = -1; } }
  if (tc >= 104.68) { M.sit = 1 - beatIn(tc, 104.68, 105.0); M.gaze = [1, 0]; M.handL = [36, -124]; M.handR = [44, -126]; }
  if (tc >= 106.04) { M.gaze = [1, 0.5]; M.lid = 0; M.mouth = 'o'; M.wet = 0.3; }
  if (tc >= 106.92 && tc < 109.1) { M.gaze = gazePlan(tc, [[106.92, [-0.6, -0.9]], [107.3, [0.1, -1]], [107.7, [0.7, -0.9]], [108.0, [-0.6, -0.9]]], 0.12); M.mouth = 'closed'; M.look = M.gaze[0] * 0.3; }
  if (tc >= 109.1) { M.handL = [20, -140]; M.handR = [26, -142]; M.gaze = [1, 0]; M.mouth = 'closed'; M.lid = Math.max(M.lid, 0.3); }
  // S18: the smile in three steps, a raised finger, the balloon, the cheer
  if (tc >= 110.05) { const st = Math.min(3, Math.floor((tc - 110.05) / 0.35)); M.lid = [0.3, 0.45, 0.45, 0.45][st]; M.mouth = ['closed', 'closed', 'smile', 'grin'][st]; M.sq *= [1, 1, 1, 1.02][st]; M.drop = [0, 0, 0, -3][st]; M.gaze = [1, -0.2]; M.wet = 0.3; }
  if (tc >= 112.14) { M.dir = 1; M.handR = PERSON_HANDS.pointUp.R; M.handL = [20, -140]; M.gaze = [1, 0]; M.lid = 0.2; }
  if (tc >= 113.92) { M.talk = abTalk(t, 113.92, 115.6, 91, 0.6); M.mouth = M.talk ? 'open' : 'grin'; }
  if (tc >= 115.0) { A.handL = PERSON_HANDS.hipsHands.L; A.handR = PERSON_HANDS.hipsHands.R; A.mouth = 'grin'; A.lid = 0.5; A.tip = -0.04 + 0.02 * Math.sin(tc * 20); }
  return { A, M, coin }; }

function a6FeastWorld(ctx, t, cam) { const tc = AB_T2(t), late = tc >= 97.44;
  courtyard(ctx, t, cam, { m: 'evening', sun: [1300, 420, 1], K: { open: 1, lit: 1 }, gate: { open: 0, bar: null }, back: [0, 1], bwin: 0.8, lan: 1 });
  feastLanterns(ctx, t, 1); feastRug(ctx, { cushions: [[A6_SEAT.morg, '#14c2c8']] });
  const F = a6FeastPeople(t), S2 = late ? a6S16Pose(t) : null, L = [];
  const A = late ? S2.A : F.A, M = late ? S2.M : F.M, Wf = late ? { ...F.Wf, sit: tc > 115 ? 0 : 1 - beatIn(tc, 108.4, 108.7) * 0, x: A6_SEAT.wife } : F.Wf;
  if (late) { Wf.sit = tc > 115.0 ? 1 - beatIn(tc, 115.0, 115.3) : 1; Wf.tip = tc > 108.4 && tc < 110 ? -0.08 : 0; Wf.handL = tc > 115 ? [40, -132] : [-26, -104]; Wf.handR = tc > 115 ? [50, -130] : [40, -120]; Wf.dir = -1; Wf.gaze = [-1, 0]; }
  const Kd = late ? { ...F.Kd, x: A6_SEAT.kid, y: A6_FY, sit: 1, dir: -1, gaze: [-1, 0] } : F.Kd; if (late && tc > 115.0) { Kd.sit = 0; Kd.y = A6_FY - 26 * Math.abs(Math.sin((tc - 115) * 7)); Kd.handL = [-30, -100]; Kd.handR = [30, -100]; Kd.mouth = 'grin'; } if (late && tc > 108.4 && tc < 110) Kd.tip = -0.1;
  const N = late ? { ...F.N, x: A6_SEAT.neph, sit: tc < 103.16 ? 1 : tc < 103.4 ? 1 - beatIn(tc, 103.16, 103.3) : 0, dir: -1, gaze: [-1, 0], handL: [-22, -104], handR: [24, -104] } : F.N;
  if (late && tc > 103.0 && tc < 103.6) { N.handR = [50, -120]; N.x = kfn(tc, [[103.0, A6_SEAT.neph], [103.4, 1180]]); } if (late && tc > 103.4) N.x = 1180 + 0 * tc; if (late && tc > 108.4 && tc < 110) N.tip = -0.07; if (late && tc > 115.0) { N.handL = [10 + 14 * Math.sin(tc * 20), -130]; N.handR = [30, -132]; N.mouth = 'grin'; }
  for (const [P, d] of [[Wf, (c) => abWife(c, Wf, 'dusk')], [Kd, (c) => abKid(c, Kd, 'dusk')], [N, (c) => abNephew(c, t, N, 'dusk', { shc: A6_ESH })]]) L.push({ y: P.sit > 0.5 ? A6_FY : P.y, d: () => { if (P !== N) a3Shadow(ctx, P.x, P.y, 80, 0, A6_ESH); d(ctx); } });
  L.push({ y: late ? 902 : A.sit > 0.5 ? A6_FY + 1 : 902, d: () => a2Ali(ctx, A, 'dusk', { shc: A6_ESH }) });
  if (late || tc >= 91.3) L.push({ y: M.sit ? 904 : 902, d: () => { morgiana(ctx, t, M, 'dusk', { shc: A6_ESH });
    if (!late && F.tray) { const P = F.tray === 'M' ? M : Wf, B = F.tray === 'M' ? A3_MORG : { s: 0.92, age: 0.25 }, [hx, hy] = a2Hand(P, 1, B), dip = tc > 93.6 && tc < 94.0 ? 8 * Math.sin(Math.PI * beatIn(tc, 93.6, 94.0)) : 0;
      celShade(ctx, ell(hx - 6, hy + dip, 46, 9, 16), '#e8b040', '#a8701a', { lw: 2.5, line: '#6a4410' }); celShade(ctx, [...K.circlePts(hx - 6, hy - 2 + dip, 30, 26, 12, Math.PI, Math.PI), [hx - 36, hy - 2 + dip]], '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 5, hi: '#fff3b0', lw: 2.5, line: '#6a4410' }); }
    if (late && tc >= 103.16) { let hx, hy, lid = 0, light = 0; if (tc < 105.06) { const B = { s: 0.95, age: 0.25 }; [hx, hy] = a2Hand(A, 1, B); hy += 20; } else { const ho = handOver(tc, 105.06, 0.01, [0, 0], [0, 0], { weight: 10 }); [hx, hy] = a2Hand(M, 1, A3_MORG); hy += 24 + Math.max(0, ho.dip); lid = K.clamp((tc - 106.04) / 0.4) * (1 - K.clamp((tc - 109.1) / 0.4)); light = lid; }
      if (tc < 103.4) { const [nx, ny] = a2Hand(N, 1, A5_NEPH); hx = nx; hy = ny + 20; } rewardBox(ctx, hx - 4, hy, 0.8, { lid, light, glint: tc > 105.1 && tc < 105.5 ? (tc - 105.1) / 0.4 : 0 }); } } });
  for (const q of abByY(L)) q.d();
  // the table (front pass) and the coin
  let coin = null; if (late && S2.coin === 'fall') { const u = beatIn(tc, 101.12, 101.3); coin = u < 1 ? null : { x: 1040, spin: beatIn(tc, 101.3, 102.0), flat: tc > 102.0 }; }
  feastTable(ctx, t, { coin });
  if (late && S2.coin === 'hand') { const [hx, hy] = a2Hand(A, 1, { s: 0.95, age: 0.25 }); goldCoin(ctx, hx, hy - 6, 1.2, { spin: 1, glint: tc > 98.9 && tc < 99.5 ? (tc - 98.9) / 0.6 : 0 }); }
  if (late && S2.coin === 'fall' && tc < 101.3) { const [hx, hy] = [1046, 690], u = beatIn(tc, 101.12, 101.3); goldCoin(ctx, K.lerp(hx, 1040, u), K.lerp(hy, FS.top, u * u), 1.2, { spin: 0.2 }); }
  if (late && tc > 108.6 && tc < 110.05) { const cx = (u) => kfn(u, [[108.6, 760], [109.6, 870]]), cw = walk(cxF6, tc, { stride: 9 }); a5Cat(ctx, t, { x: cw.x, y: 910, gy: 910, dir: 1, sit: 0, ph: cw.ph, amp: cw.amp, gaze: [1, -0.3] }, A6_ESH); }
  return { A, M, N, Wf, Kd };
}
const cxF6 = (u) => kfn(u, [[108.6, 760], [109.6, 870]]);

// the three futures (world-sized drawings inside the thought cloud; panel units, centre x, y, box w)
function a6Future(ctx, t, i, x, y, w, o = {}) { const h = w * 0.7; ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 14); ctx.clip();
  if (i === 0) { abGrad(ctx, x - w / 2, y - h / 2, w, h, [[0, '#8cc0f6'], [1, '#fff2d6']]); ctx.fillStyle = '#e8c890'; ctx.fillRect(x - w / 2, y + h * 0.36, w, h * 0.2); const sc = h / 500; ctx.translate(x, y + h / 2 - 6); ctx.scale(sc, sc); ctx.translate(-SF.cx, -905); lampShop(ctx, t, { awning: o.awning ?? 0, old: o.awning ? 0 : 0.6, board: o.awning ?? 0, lit: o.lit || 0, lamps: 6 }); }
  else if (i === 1) { abGrad(ctx, x - w / 2, y - h / 2, w, h, [[0, '#ffb07a'], [1, '#ffe0a0']]); ctx.fillStyle = '#e8c890'; ctx.beginPath(); ctx.moveTo(x - w / 2, y + h / 2); ctx.lineTo(x - 10, y); ctx.lineTo(x + 10, y); ctx.lineTo(x + w / 2, y + h / 2); ctx.fill();
    ctx.translate(x - w * 0.15, y + h * 0.4); ctx.scale(w / 900, w / 900); camel(ctx, { x: 0, y: 0, s: 1, dir: 1, ph: AB_T2(t) * 6, amp: 1, saddle: true, load: ['rug'] }); }
  else { abGrad(ctx, x - w / 2, y - h / 2, w, h, [[0, '#9ad0ff'], [1, '#e8f8e0']]); ctx.fillStyle = '#7ac04a'; ctx.fillRect(x - w / 2, y + h * 0.2, w, h * 0.3);
    celShade(ctx, K.rectPts(x - w * 0.2, y - h * 0.15, w * 0.4, h * 0.38), '#fff1d8', '#e0c8a0', { off: 6, lw: 3 }); celShade(ctx, [[x - w * 0.25, y - h * 0.13], [x, y - h * 0.36], [x + w * 0.25, y - h * 0.13]], '#e8642a', '#b8441a', { off: 4, lw: 3 }); ctx.fillStyle = '#5a3a2a'; ctx.fillRect(x - 10, y + h * 0.05, 20, h * 0.18);
    for (const fx of [-0.38, 0.36]) abBlob(ctx, x + fx * w, y + h * 0.1, w * 0.1, w * 0.12, '#4aa85a', '#2a7a3a', { lw: 2 }); }
  ctx.restore(); ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = '#2b1a3a'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 14); ctx.stroke(); ctx.restore(); }

// ---------- S15 89.02-97.44 ----------
function a6S15Over(ctx, t, cam, S) { if (t > 93.1 && t < 95.2) { const F = a6FeastPeople(t), [ax, ay] = abP(...a2HeadPt(F.A, 0, 10, { s: 0.95, age: 0.25 }), cam); a5Say(ctx, S, [[93.22, 'THANK YOU, MORGIANA!']], t, ax + 100, ay - 250, [ax, ay - 40], { size: 46, gone: 94.9 }); }
  if (t > 93.7 && t < 94.4) { const F = a6FeastPeople(t), [mx, my] = abP(...a2HeadPt(F.M, 0, 10, A3_MORG), cam); a5Glyph(ctx, 'q', mx - 60, my - 110, 1, K.clamp((t - 93.7) / 0.2) * (1 - K.clamp((t - 94.2) / 0.2))); } }
AB_SHOTS.push({ a: 89.02, b: 97.44, ww: 2200, cam: a5Cam([[89.02, { x: 900, y: 600, zoom: 1.08 }], [91.8, { x: 1080, y: 600, zoom: 1.08 }], [92.6, { x: 1020, y: 640, zoom: 1.22 }], [97.44, { x: 1010, y: 640, zoom: 1.22 }]]), world: a6FeastWorld, over: a6S15Over });

// ---------- S16 97.44-103.16: GOLD DID NOT SAVE US. YOUR WISDOM DID. ----------
function a6S16Over(ctx, t, cam, S) { const P = a6S16Pose(t), [ax, ay] = abP(...a2HeadPt(P.A, 0, 10, { s: 0.95, age: 0.25 }), cam);
  if (t > 99.6 && t < 101.3) a5Say(ctx, S, [[99.72, 'GOLD DID NOT SAVE US.']], t, ax + 40, ay - 260, [ax, ay - 40], { size: 46, gone: 101.0 });
  if (t > 101.4 && t < 101.95) { const [cx, cy] = abP(1040, FS.top, cam); a2Tag(ctx, S, 'tink', cx - 40, cy + 70, t, 101.42, 101.9, { size: 30 }); }
  if (t > 102.2 && t < 103.16) a5Say(ctx, S, [[102.32, 'YOUR WISDOM DID.']], t, ax + 40, ay - 260, [ax, ay - 40], { size: 50, gone: 103.1 }); }
AB_SHOTS.push({ a: 97.44, b: 103.16, ww: 2200, cam: a5Cam([[97.44, { x: 960, y: 640, zoom: 1.2 }], [102.2, { x: 960, y: 640, zoom: 1.24 }], [103.16, { x: 960, y: 650, zoom: 1.32 }]]), world: a6FeastWorld, over: a6S16Over });

// ---------- S17 103.16-110.05: the casket and three futures ----------
function a6S17Over(ctx, t, cam, S) { if (t < 106.04) return; const p = K.clamp((t - 106.04) / 0.35) * (1 - K.clamp((t - 109.4) / 0.4)), P = a6S16Pose(t), [mx, my] = abP(...a2HeadPt(P.M, 0, 10, A3_MORG), cam);
  if (p <= 0) return; thoughtCloud(ctx, 500, 330, 700, 380, t, { p, tail: [mx, my - 60], seed: 9 });
  ctx.save(); ctx.globalAlpha *= K.clamp(p * 2 - 1); [[0, 290], [1, 500], [2, 710]].forEach(([i, x], j) => a6Future(ctx, t, i, x, 330 + 5 * Math.sin(t * 2 + j), 190)); ctx.restore(); }
AB_SHOTS.push({ a: 103.16, b: 110.05, ww: 2200, cam: a5Cam([[103.16, { x: 960, y: 640, zoom: 1.25 }], [105.9, { x: 975, y: 630, zoom: 1.25 }], [106.4, { x: 985, y: 590, zoom: 1.05 }], [110.05, { x: 985, y: 590, zoom: 1.05 }]]), world: a6FeastWorld, over: a6S17Over });

// ---------- S18 110.05-116.2: the smile, I WILL OPEN A SHOP IN THE MARKET!, the push into the shop picture ----------
function a6S18Over(ctx, t, cam, S) { const P = a6S16Pose(t), [mx, my] = abP(...a2HeadPt(P.M, 0, 10, A3_MORG), cam);
  if (t > 110.9) { const p = K.clamp((t - 110.9) / 0.35), slide = beatIn(t, 111.36, 111.9), grow = beatIn(t, 114.72, 115.2), push = beatIn(t, 115.6, 116.2);
    const cw = 640 + 360 * push, ch = 360 + 870 * push; thoughtCloud(ctx, 560, K.lerp(330, 615, push), cw, ch, t, { p, tail: push > 0 ? null : [mx, my - 60], seed: 9 });
    ctx.save(); ctx.globalAlpha *= 1 - slide; a6Future(ctx, t, 1, 600, 330, 170); a6Future(ctx, t, 2, 790, 330, 170); ctx.restore();
    const w = K.lerp(170, 300, slide) + 120 * grow + 900 * push; a6Future(ctx, t, 0, K.lerp(410, 560, slide), K.lerp(330, 615, push), w, { awning: grow, lit: 2 * grow });
    if (push > 0.6) { ctx.save(); ctx.globalAlpha *= (push - 0.6) / 0.4; ctx.fillStyle = '#fff8e8'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); } }
  if (t > 113.8 && t < 115.6) a5Say(ctx, S, [[113.92, 'I WILL OPEN A SHOP'], [114.6, 'I WILL OPEN A SHOP IN THE MARKET!']], t, mx - 60, Math.max(my - 220, 560), [mx, my - 40], { size: 40, gone: 115.5 });
  if (t > 115.0 && t < 115.7) a2Tag(ctx, S, 'HOORAY!', 760, 1000, t, 115.0, 115.55, { size: 44 }); }
AB_SHOTS.push({ a: 110.05, b: 116.2, ww: 2200, cam: a5Cam([[110.05, { x: 920, y: 640, zoom: 1.3 }], [111.6, { x: 925, y: 640, zoom: 1.32 }], [112.3, { x: 990, y: 600, zoom: 1.05 }], [116.2, { x: 995, y: 600, zoom: 1.05 }]]), world: a6FeastWorld, over: a6S18Over });
