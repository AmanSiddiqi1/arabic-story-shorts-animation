// ===== ALI-02 shots S13-S14 (106.88 - 142.69 s): home in the bright yard (the telling off, shame, thanks, the oath, the hush);
// sunset at the rock: the footprints, TWO KNOW OUR SECRET!, SEARCH THE TOWN!, the far town, THE END =====

// ---------- S13 106.88-125.27: the yard in full morning ----------
const A2_S13_CAM = [[106.88, { x: 500, y: 690, zoom: 1.18 }], [110.2, { x: 500, y: 690, zoom: 1.18 }], [111.3, { x: 400, y: 720, zoom: 1.5 }], [120.0, { x: 404, y: 720, zoom: 1.5 }], [120.9, { x: 450, y: 700, zoom: 1.25 }], [124.4, { x: 455, y: 700, zoom: 1.25 }], [125.27, { x: 470, y: 492, zoom: 1.25 }]];
const A2_AX = (t) => kfn(t, [[107.3, -80], [108.4, 430], [120.2, 430], [120.42, 446], [120.7, 430]], 'out');
const A2_CX = (t) => kfn(t, [[107.4, -200], [108.5, 268], [120.18, 268], [120.35, 330], [120.75, 330], [121.0, 290]], 'out');
const A2_WX = (t) => kfn(t, [[107.9, 830], [108.7, 700]], 'out'), A2_KX = (t) => kfn(t, [[108.0, 830], [108.5, 610], [108.8, 640], [114.2, 640], [114.45, 730]], 'out');
const A2_SOFT = (t) => [0.6, 0.6, 0.35, 0.1, 0][Math.min(4, Math.max(0, Math.floor((t - 118.86) / 0.17) + 1))];   // the stern face softens over three drawings
function a2S13World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning';
  ctx.save(); ctx.translate((cam.x - 500) * 0.7, (cam.y - 700) * 0.7); ctx.drawImage(a2MorningSky(), -100, -150, 1200, 1476); abSun(ctx, 760, 210, 62, '#fff6c8', '#ffe8a0', 0.8); ctx.restore();
  ctx.save(); ctx.translate((cam.x - 500) * 0.4 - 200, (cam.y - 700) * 0.4 - 40); ctx.drawImage(abTownRoofs('dawn'), 0, 0); ctx.restore();
  ctx.save(); const vx = (cam.x - 500) * 0.15 - 200, vy = (cam.y - 700) * 0.1; ctx.translate(vx, vy); ctx.drawImage(abVillage(), 0, 0); a2Washing(ctx, t, 0, 0); ctx.restore();
  abFlock(ctx, t - 106.88, -80, 300, 150, 4, 3, 0.45); if (t > 112) abFlock(ctx, t - 112, 1080, 380, -120, 3, 8, 0.4); if (t > 124.0) abFlock(ctx, t - 124.0, -100, 200, 220, 5, 17, 0.5);
  ctx.drawImage(a2YardPlate(), 0, 0);
  celShade(ctx, [[96, 904], [104, 640], [92, 520], [128, 520], [140, 640], [150, 904]], '#8a5a4a', '#5a3440', { light: [1, -0.5], off: 18, lw: 3.5, line: '#3a2030' });
  for (const [lx, ly, lr, sd] of [[120, 470, 120, 1], [40, 540, 90, 2], [210, 520, 95, 3]]) abLeafBlobs(ctx, lx, ly, lr, 'morning', 200 + sd, t, 0.15);
  a2Smoke(ctx, t, 1000, 560); abCottage(ctx, K.clamp((t - 107.8) / 0.3), t);
  for (const [x, h, col] of [[880, 70, '#c8603a'], [916, 52, '#e88a4a']]) celShade(ctx, [[x - 16, 902], [x - 26, 902 - h * 0.55], [x - 12, 902 - h], [x + 12, 902 - h], [x + 26, 902 - h * 0.55], [x + 16, 902]], col, abDark(col, 0.3), { light: [1, -0.5], off: 8, hi: abLight(col, 0.4), lw: 3 });
  // the grey donkey behind them; ears flat on "danger", then up for the hush, and a look to camera
  const dk = { x: 590, y: 872, s: 0.6, dir: -1, pal: 0, earL: tc > 114.08 && tc < 117 ? -0.8 : 0.5 + idleSway(tc, 3, 0.15, 1.7) + (tc > 123.62 ? 0.4 : 0), earR: tc > 114.2 && tc < 117 ? -0.7 : 0.4 + idleSway(tc, 4, 0.2, 2.3), tailSwish: osc(tc, 2.2, 0.3), headTurn: tc > 123.9 ? 0.25 : 0, neck: idleSway(tc, 5, 0.12, 3.1), lid: abLid(t, 21, [123.9]), chew: tc < 110 ? (osc(tc, 0.8) * 0.5 + 0.5) * 0.6 : 0 };
  groundShadow(ctx, dk.x, 874, 160, 0, { flat: true, color: '#8a5a3a' }); abDonkey(ctx, dk, m);
  // the mule and the cart arrive last at the left edge
  a2MuleCart(ctx, t, 0, m, { xf: (u) => kfn(u, [[107.6, -620], [108.9, -270]], 'out'), moving: tc < 108.9, shc: '#8a5a3a', load: true, P: { earL: 0.6 + idleSway(tc, 61, 0.3, 1.3), headDown: tc > 110 ? 0.5 + 0.2 * osc(tc, 2.4) : 0 } });
  const hushAt = (t0) => tc > t0;
  // the wife and the child come out
  if (t > 107.9) { const wp = { x: A2_WX(tc), y: 900, dir: -1, ...walk(A2_WX, tc), mouth: 'o', gaze: [1, -0.2], lid: abLid(t, 31), tip: idleSway(tc, 32, 0.02, 3.3), sq: breathe(tc, 33), handL: PERSON_HANDS.cheeks.L, handR: PERSON_HANDS.cheeks.R, brow: -0.6 };
    if (tc > 108.72) wp.gaze = gazePlan(tc, [[108.72, [1, -0.1]], [109.4, [-1, -0.1]], [110.2, [1, -0.1]], [111.0, [-0.6, 0]], [112.0, [1, 0]]]);
    if (tc > 115.4) { wp.handL = [-30, -110]; wp.handR = [26, -114]; wp.mouth = 'closed'; } if (tc > 120.18) { wp.sq *= 0.98; wp.mouth = 'smile'; wp.tip = -0.03; }
    if (hushAt(123.82)) { wp.handR = PERSON_HANDS.hush.R; wp.mouth = 'closed'; }
    const kp = { x: A2_KX(tc), y: 900, dir: -1, ...walk(A2_KX, tc, { stride: 20 }), mouth: 'o', gaze: [1, -0.5], lid: abLid(t, 41), tip: idleSway(tc, 42, 0.03, 1.6) };
    if (tc > 114.2 && tc < 120.18) { kp.tip = -0.1; kp.handL = [-20, -170]; kp.handR = [24, -168]; kp.gaze = [1, -0.2]; }
    if (tc > 120.18 && tc < 121.2) { kp.handR = PERSON_HANDS.mouthCover.R; kp.mouth = 'smile'; kp.sq = 1 + 0.03 * Math.abs(Math.sin(tc * 20)); kp.x = 700; }
    if (tc >= 121.2) kp.x = 690;
    if (hushAt(124.02)) { kp.handR = PERSON_HANDS.hush.R; kp.mouth = 'closed'; }
    const kidBehind = tc > 114.45 && tc < 120.18; if (kidBehind) abKid(ctx, kp, m); groundShadow(ctx, wp.x, 900, 110, 0, { flat: true, color: '#8a5a3a' });
    if (tc < 108.15) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, AB_DOOR.x0 + 4, 1230); ctx.rect(AB_DOOR.x0, AB_DOOR.top, 300, 902 - AB_DOOR.top); ctx.clip(); abWife(ctx, wp, m); ctx.restore(); } else abWife(ctx, wp, m);
    if (!kidBehind && t > 108.0) { groundShadow(ctx, kp.x, 900, 70, 0, { flat: true, color: '#8a5a3a' }); abKid(ctx, kp, m); } }
  // the brothers
  const ax = A2_AX(tc), A = { x: ax, y: 900, dir: 1, ...walk(A2_AX, tc, { stride: 26 }), gaze: [1, 0], lid: abLid(t, 11, [108.8, 112.2, 123.1]), mouth: 'closed', brow: 0.6, tip: idleSway(tc, 12, 0.02, 3.1), sq: breathe(tc, 1) };
  if (tc < 108.72) { A.tip = 0.08 * K.clamp(A.amp); A.brow = -0.3; }
  else { A.dir = -1; A.handL = PERSON_HANDS.hipsHands.L; A.handR = PERSON_HANDS.hipsHands.R; A.sq = breathe(tc, 1, 0.025);
    if (tc > 110.28 && tc < 112.2) { A.handR = [100, -150 + 10 * (pulse(tc, 110.85, 0.3) + pulse(tc, 111.4, 0.3))]; A.talk = abTalk(t, 110.81, 112.2, 21); A.mouth = 'open'; }
    if (tc >= 112.2 && tc < 112.76) { const d = beatIn(tc, 112.2, 112.4), dh = beatIn(tc - 0.1, 112.2, 112.4); A.handR = [K.lerp(100, 80, d), K.lerp(-150, -70, dh)]; A.gaze = [1, 0.6]; A.talk = abTalk(t, 112.2, 112.76, 22); A.mouth = 'open'; }
    if (tc >= 112.76 && tc < 115.38) { const sw = K.ease.inOut(beatIn(tc, 112.76, 113.7)); A.handR = [K.lerp(80, 4, sw), K.lerp(-110, -120, sw)]; A.talk = abTalk(t, 112.76, 115.38, 23); A.mouth = 'open'; }
    if (tc >= 115.38) { A.mouth = 'closed'; A.handR = [10, -116]; A.handL = PERSON_HANDS.hipsHands.L; }
    if (tc >= 117.94 && tc < 120.18) { A.handRW = [K.lerp(400, 348, beatIn(tc, 118.1, 118.4)), 800]; A.handR = null; A.brow = A2_SOFT(tc); A.mouth = tc > 119.2 ? 'smile' : 'closed'; }
    if (tc >= 120.18) { A.brow = 0; A.mouth = 'smile'; A.handR = tc < 120.7 ? [60, -180 + 14 * Math.abs(Math.sin((tc - 120.18) * 12))] : [10, -116]; A.sq *= landSquash(tc, 120.42, 0.06); }
    if (tc >= 123.02) { A.gaze = tc < 123.4 ? [-1, -0.1] : [1, 0]; A.handR = tc > 123.4 ? PERSON_HANDS.hush.R : A.handR; } }
  const cx = A2_CX(tc), Cp = { x: cx, y: 902, dir: 1, ...walk(A2_CX, tc, { stride: 24 }), gaze: [1, 0], lid: abLid(t, 51, [117.6]), mouth: 'o', brow: -0.5, tip: 0.1, sq: breathe(tc, 53, 0.04), wet: tc > 116 && tc < 121 }, co = { shc: '#8a5a3a', fa: 0.8 };
  let sackAt = 'hug';
  if (tc < 108.5) { Cp.tip = 0.1 * K.clamp(Cp.amp); Cp.handL = [20, -120]; Cp.handR = [34, -118]; co.fa = 0.9; }
  else if (tc < 111.34) { Cp.tip = 0.25 * (1 - beatIn(tc, 109.6, 110.2)) + 0.05; Cp.handL = [24, -112]; Cp.handR = [36, -116]; co.sweat = ((tc - 108.5) / 1.2) % 1; co.fa = 1.0; Cp.gaze = [1, 0.4]; }
  else if (tc < 115.38) { Cp.handL = [18, -128]; Cp.handR = [30, -124]; Cp.lid = 0.3; Cp.gaze = [-0.6, 0.3]; Cp.tip = -0.04; Cp.tilt = -0.06; co.fa = 0.7; if (tc > 112.2 && tc < 112.8) Cp.gaze = [1, 0.6]; }
  else { // v2 (note 11): eyes drop first, then the head sinks, shoulders in, the hands leave the hips and meet low in front, fiddling;
    // a small lean away from Ali Baba, the feather drooping last, a strong blush
    const eye = beatIn(tc, 115.38, 115.6), sh = K.ease.inOut(beatIn(tc, 115.6, 116.7)), hd = K.ease.inOut(beatIn(tc, 115.8, 116.5));
    Cp.gaze = [K.lerp(1, 0.3, eye), K.lerp(0, 1, eye)]; Cp.drop = 12 * sh; Cp.sq = (1 - 0.05 * sh) * breathe(tc, 53, 0.02); Cp.tip = -0.07 * sh + idleSway(tc, 54, 0.015, 2.1); Cp.tilt = 0.08 * sh; Cp.lid = 0.3 + 0.2 * eye;
    co.blush = Math.min(4, Math.floor(sh * 5)) / 4 * 1.3; co.droop = 0.9 * beatIn(tc - 0.35, 115.6, 116.9); co.fa = 0.6;
    const fid = 4 * Math.sin(tc * 9); Cp.handL = [K.lerp(18, 2, hd), K.lerp(-128, -78 + fid, hd)]; Cp.handR = [K.lerp(30, 16, hd), K.lerp(-124, -80 - fid, hd)];
    sackAt = tc < 115.9 ? 'hug' : tc < 116.3 ? 'slide' : 'ground';
    if (tc >= 117.2 && tc < 117.6) { Cp.x += 6 * pulse(tc, 117.25, 0.3); Cp.tip = 0.05; Cp.gaze = [1, 0.8]; }
    if (tc >= 117.6) { Cp.gaze = [1, -0.6]; Cp.lid = 0.4 + 0.6 * abBlinkAt(AB_T3(t), 117.6); Cp.drop = 6; }
    if (tc >= 117.94) { Cp.handR = PERSON_HANDS.chest.R; Cp.handL = [-20, -110]; Cp.drop = 2; co.blush = 0.6;
      if (tc > 118.3) { Cp.handRW = [350, 800]; Cp.handLW = [340, 812]; Cp.handR = null; Cp.tip = 0.22 * beatIn(tc, 118.3, 118.6) * (1 - beatIn(tc, 119.6, 120.0)); Cp.tilt = 0.12 * pulse(tc, 118.5, 0.5); } }
    if (tc >= 118.86 && tc < 120.18) { Cp.talk = abTalk(t, 118.86, 120.18, 24); Cp.mouth = 'open'; Cp.gaze = [1, -0.3]; Cp.lid = 0; }
    if (tc >= 120.18) { Cp.handRW = [440, 790]; Cp.handLW = [420, 800]; Cp.handR = null; Cp.mouth = 'grin'; Cp.tip = 0.06; co.blush = 0.3; }
    if (tc >= 120.86) { Cp.handRW = null; Cp.handLW = null; Cp.handR = [60, -226]; Cp.handL = [6, -120]; Cp.lid = 1; Cp.tilt = -0.05; Cp.mouth = 'closed'; Cp.tip = -0.03; co.blush = 0; co.droop = 0; co.fa = 0.35; Cp.talk = abTalk(t, 121.29, 122.1, 25); if (Cp.talk) Cp.mouth = 'open'; }
    if (tc >= 122.1) { Cp.lid = 0.2; Cp.gaze = [1, 0.1]; Cp.handR = [36, -110]; Cp.handL = [-24, -110]; }
    if (hushAt(123.62)) { Cp.handR = PERSON_HANDS.hush.R; Cp.mouth = 'closed'; Cp.gaze = [1, 0]; } }
  // the sack: hugged at his belly, slides down, lies on the ground, pushed toward Ali Baba with his foot (122.1)
  const [bx, by] = a2BodyPt(Cp, 30, -110, A2_CAS);
  if (sackAt === 'hug') abSack(ctx, bx + 8, by + 46, 0.6, 1, { coin: true, rot: -0.1 });
  else if (sackAt === 'slide') { const u = beatIn(tc, 115.9, 116.3); abSack(ctx, K.lerp(bx + 8, cx + 40, u), K.lerp(by + 46, 906, u * u), 0.6, 1, { coin: true, rot: -0.1 + 0.3 * u }); }
  // on «قاسم» 117.20 he pushes the sack away with one foot (a nudge of the hip; the sack scoots toward Ali Baba)
  if (sackAt === 'ground') { const push = K.ease.out(beatIn(tc, 117.2, 117.55)); abSack(ctx, K.lerp(310, 372, push), 906, 0.6, 1, { coin: true, rot: 0.2 - 0.25 * push, sq: 1 - 0.08 * pulse(tc, 117.3, 0.2) }); }
  a2Ali(ctx, A, m, { shc: '#8a5a3a' }); a2Cas(ctx, Cp, m, co);
}
function a2S13Over(ctx, t, cam, S) {
  const [ax, ay] = abP(A2_AX(t), 900 - 220, cam), [cx, cy] = abP(A2_CX(t), 900 - 240, cam);
  abSay(ctx, S, [[110.81, 'YOUR GREED...'], [112.76, 'YOUR GREED PUT US IN DANGER!']], t, 520, 280, [ax, ay], { size: 44, gone: 114.05 });
  if (t > 112.2 && t < 113.0) S.arrow(ctx, abP(380, 700, cam), abP(330, 820, cam), K.clamp((t - 112.2) / 0.3), { color: '#7fe3ff' });
  if (t > 114.08 && t < 115.45) thoughtCloud(ctx, 520, 300, 360, 220, t, { p: K.clamp((t - 114.08) / 0.35) * (1 - K.clamp((t - 115.25) / 0.2)), tail: [ax - 30, ay + 10], bg: '#ffe2b8', inside: (c) => {
    c.save(); c.translate(500, 900); c.scale(2.4, 2.4); c.translate(-500, -900); abStandCloak(c, { x: 470, y: 900, s: 1.08, dir: 1 }, t, AB_LEAD0.cape, 1.2, 1.4); abLeader(c, { x: 470, y: 900, dir: 1, handR: [96, -196], handL: [-60, -150], brow: 1, mouth: 'open', gaze: [1, 0.1] }, 'morning'); c.restore(); } });
  abSay(ctx, S, [[118.86, 'THANK YOU, BROTHER!']], t, 360, 300, [cx, cy], { size: 50, gone: 120.4 });
  if (t > 122.1 && t < 123.2) thoughtCloud(ctx, 300, 330, 346, 252, t, { p: K.clamp((t - 122.1) / 0.3) * (1 - K.clamp((t - 123.0) / 0.2)), tail: [cx, cy], inside: (c) => { abRock(c, 500, 860, { s: 0.42, model: 'morning' });
    c.save(); c.strokeStyle = '#e8364f'; c.lineWidth = 28; c.lineCap = 'round'; const k = K.clamp((t - 122.4) / 0.25); c.beginPath(); c.moveTo(380, 600); c.lineTo(K.lerp(380, 620, k), K.lerp(600, 880, k)); c.stroke(); if (k >= 1) { const k2 = K.clamp((t - 122.65) / 0.25); c.beginPath(); c.moveTo(620, 600); c.lineTo(K.lerp(620, 380, k2), K.lerp(600, 880, k2)); c.stroke(); } c.restore(); } });
}
AB_SHOTS.push({ a: 106.88, b: 125.27, ww: 1000, cam: a2Cam(A2_S13_CAM), world: a2S13World, over: a2S13Over });

// ---------- S14 125.27-142.69: sunset at the rock; the leader reads the prints; the threat; the far town; THE END ----------
const A2_S14_CAM = (t) => { if (t < 136.86) return K.camAt([[125.27, { x: 1650, y: 615, zoom: 1.0 }], [128.1, { x: 1650, y: 615, zoom: 1.0 }], [128.9, { x: 1600, y: 680, zoom: 1.3 }], [130.2, { x: 1600, y: 680, zoom: 1.3 }], [130.9, { x: 1640, y: 640, zoom: 1.1 }]], t);
  // v2 (note 3): the whip pan ends with the tree in the left third and the town centre-right, then a slow drift to the last frame
  const u = K.ease.inOut(beatIn(t, 136.86, 137.7)); if (t < 137.7) return { x: K.lerp(1640, 820, u), y: K.lerp(640, 600, u), zoom: K.lerp(1.1, 1.0, u) }; return { x: 820 - 12 * (t - 137.7), y: 600, zoom: 1.0 }; };
// v2 (note 8): the leader walks along the prints on «وقف» and stops on «الصخرة»; crouches to them on «يفكر» (note 10)
const A2_LPX = (t) => kfn(t, [[125.27, 1790], [127.38, 1640]], 'inOut');
const A2_TOWN = { x: 470, base: 862, s: 0.62 }, A2_DOME = [470 + 0.62 * 700, 700];   // the dome is measured on the still (notes.md)
const A2_S14_MEN = [{ i: 0, x0: 1300, x1: 1500, y: 884, s: 0.88 }, { i: 1, x0: 1380, x1: 1550, y: 878, s: 0.86 }, { i: 2, x0: 1450, x1: 1595, y: 872, s: 0.84 }, { i: 3, x0: 2040, x1: 1705, y: 880, s: 0.86 }, { i: 4, x0: 2120, x1: 1765, y: 874, s: 0.84 }];
const A2_RIDE = [[-1, 2], [0, 4], [1, 3], [2, 0], [3, 5], [4, 1]];
const A2_RIDX = (t, k) => K.lerp(1380 + 64 * k, 900 + 64 * k, K.clamp((t - 137.9) / 3.6));
function a2TownRiders(ctx, t) { const tc = AB_T2(t);
  abDust(ctx, A2_RIDX(t, 5) + 110, 900, 360, 70, t, 0.55 * (1 - K.clamp((t - 141.6) / 1.1)), '#e8a88a');
  for (let k = 5; k >= 0; k--) { const [i, pal] = A2_RIDE[k], xf = (u) => A2_RIDX(u, k), x = xf(tc), u = K.clamp((t - 137.9) / 3.6), s = K.lerp(0.15, 0.1, u), y = K.lerp(888, 874, u);
    const a = 1 - K.clamp((t - 141.1 - 0.08 * k) / 0.4); if (a <= 0.02) continue;
    const H = { x, y, s, dir: -1, pal, ...walk(xf, tc, { stride: GAIT.horse * s * 1.6 }), tailSwish: 0.6 }; H.gallop = 1; H.amp = 1;
    ctx.save(); ctx.globalAlpha *= a; abRider(ctx, i, H, { gaze: [1, 0], mouth: 'closed' }, 'dusk', { cloak: 0.9, t, hang: 0, ph: k * 0.4 }); ctx.restore(); } }
// the hiding tree alone (no thicket) for the last shot, so the town is not covered
function a2GladeTree(ctx, m, t) { const T = AB_TREE, [bk, bs] = AB_BARK[m];
  celShade(ctx, [[T.x - 52, AB_GR + 4], [T.x - 40, 700], [T.x - 44, T.top], [T.x + 44, T.top], [T.x + 40, 700], [T.x + 52, AB_GR + 4]], bk, bs, { light: [-1, -0.3], off: 22, lw: 4, line: abDark(bs, 0.4) });
  celShade(ctx, [[T.x + 30, T.perch - 14], [T.branchTo, T.perch - 6], [T.branchTo + 6, T.perch + 6], [T.x + 30, T.perch + 18]], bk, bs, { light: [-1, -1], off: 8, lw: 3.5, line: abDark(bs, 0.4) });
  abLeafBlobs(ctx, T.fol[0] - 40, T.fol[1] - 20, T.fol[2] * 0.95, m, 33, t, 0); }
function a2S14World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dusk', sh = '#4a2e48';
  a2SunsetTown(ctx, t, A2_TOWN.x, A2_TOWN.base, A2_TOWN.s);
  a2GladeTree(ctx, m, t);
  a2Prints(ctx, 1720, 300, { lit: t > 129.2 && t < 130.3 ? beatIn(t, 129.2, 130.2) : null, col: 'rgba(60,20,40,0.6)' });
  if (t < 137.0) a2StandHorses(ctx, t, m, { shc: sh, P: (h, k, tc2) => (k === 2 ? { headDown: 0.7 + 0.2 * osc(tc2, 2.6) } : k === 0 && tc2 > 125.6 && tc2 < 127.6 ? { headDown: 0.35 * Math.abs(Math.sin((tc2 - 125.6) * 5)), earL: 1 } : null) });
  abRock(ctx, 1820, 900, { model: m, t });
  if (t > 134.3 && t < 134.9) abGlint(ctx, 1820, K.lerp(880, 300, beatIn(t, 134.3, 134.9)), 46, beatIn(t, 134.3, 134.9));
  // the sparrow back on the rock top, hopping along it
  const bxp = kfn(tc, [[127.38, 1800], [127.6, 1850], [127.8, 1880]], 'out'), hopY = Math.abs(Math.sin(Math.PI * beatIn(tc, 127.38, 127.6))) * 14 + Math.abs(Math.sin(Math.PI * beatIn(tc, 127.6, 127.8))) * 12;
  bird(ctx, { kind: 'sparrow', x: bxp, y: 252 - hopY, s: 0.5, dir: tc > 130 ? -1 : 1, tip: idleSway(tc, 71, 0.06, 1.3), peck: tc > 131 && tc < 131.4 ? 1 : 0 });
  // the men: two groups, then a ragged half circle (130.22), idle business, the shared look
  A2_S14_MEN.forEach((M, j) => { const xf = (u) => kfn(u, [[130.3 + 0.15 * j, M.x0], [130.3 + 0.15 * j + 0.8, M.x1]], 'inOut'), x = xf(tc), toL = x < 1640;
    const P = { x, y: M.y, s: M.s, dir: tc < 130.3 ? (M.x0 < 1640 ? 1 : -1) : toL ? 1 : -1, ...walk(xf, tc, { stride: 22 }), gaze: [1, -0.1], lid: abLid(t, 190 + j), tip: idleSway(tc, 191 + j, 0.025, 2.3 + 0.4 * j), sq: breathe(tc, 192 + j), handL: [-30, -110], handR: [34, -112], brow: 0.5 };
    if (tc < 128.6) { if (j === 0 && tc > 125.8 && tc < 126.7) { P.dir = -P.dir; P.gaze = [1, -0.2]; } if (j === 1 && tc > 126.0 && tc < 127.0) { P.handL = [20, -134 + 4 * Math.sin(tc * 30)]; P.handR = [26, -130]; }
      if (j === 3 && tc > 126.5 && tc < 127.5) { P.handL = [-30, -230]; P.handR = [36, -236]; P.mouth = 'o'; P.tilt = -0.1; } if (j === 4 && tc > 125.4 && tc < 126.4) { P.tip = 0.05 * Math.sin(tc * 12); P.gaze = [-1, 0.3]; } }
    if (tc > 131.62 && tc < 133.5) { if (j === 0) { P.talk = 0.3 * Math.abs(Math.sin(tc * 8)); P.mouth = 'open'; } if (j === 1) { P.handL = [-20, -96 + 4 * Math.sin(tc * 20)]; P.handR = [24, -96]; } if (j === 3) P.handR = [70, -150]; P.gaze = tc < 131.9 + 0.12 * j ? [-1, 0.2] : [1, -0.1]; }
    if (tc > 134.3) P.gaze = [toL ? 1 : -1, -0.4];
    if (tc > 135.02 && tc < 135.5) { P.gaze = [j % 2 ? 1 : -1, 0]; P.tilt = 0.06 * pulse(tc, 135.1 + 0.08 * j, 0.3); }
    if (tc > 136.2) P.gaze = [toL ? -1 : -1, 0];
    a2Man(ctx, M.i, P, m, { shc: sh, t }); });
  // the leader
  const P = { x: A2_LPX(tc), y: 902, dir: -1, ...walk(A2_LPX, tc, { stride: 26 }), gaze: [1, 0.3], lid: abLid(t, 150, [126.4, 130.3]), brow: 0.8, tip: idleSway(tc, 151, 0.015, 3.2), sq: breathe(tc, 152), handL: [-34, -100], handR: [40, -110], mouth: 'closed' };
  if (tc < 127.38) { P.gaze = [1, 0.85]; P.tip = 0.08; P.lid = 0.3; }
  if (tc >= 127.38 && tc < 128.1) { P.gaze = gazePlan(tc, [[127.38, [1, 0.8]], [127.7, [0.2, -0.6]]]); P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; }
  if (tc >= 128.1 && tc < 129.4) { const cr = K.ease.inOut(beatIn(tc, 128.1, 128.4)) * (1 - K.ease.inOut(beatIn(tc, 129.14, 129.4))); P.kneel = 0.6 * cr; P.sq *= landSquash(tc, 128.4, 0.08); P.handRW = cr > 0.5 ? [1592, 928] : null; P.handL = [-20, -120];
    P.gaze = gazePlan(tc, [[128.1, [1, 0.9]], [128.6, [1, 0.6]], [128.9, [1, 0.3]]]); P.tip = 0.12 * cr; }
  if (tc >= 129.4 && tc < 130.22) { P.gaze = gazePlan(tc, [[129.4, [1, 0.3]], [130.0, [1, -0.1]]]); P.handR = [16, -164 + 4 * osc(tc, 0.5)]; }
  if (tc >= 130.22 && tc < 132.62) { P.dir = 1; P.gaze = gazePlan(tc, [[130.22, [1, 0]], [131.0, [-1, 0]], [131.6, [1, 0]]]); P.handL = PERSON_HANDS.hipsHands.L; P.handR = PERSON_HANDS.hipsHands.R; }
  if (tc >= 132.62 && tc < 133.6) { P.dir = 1; P.handR = tc < 133.2 ? [30, -205 + 8 * Math.abs(Math.sin((tc - 132.62) * 10))] : [50, -230]; P.brow = 1; P.talk = abTalk(t, 133.05, 133.6, 31); P.mouth = P.talk ? 'open' : 'closed'; }
  if (tc >= 133.6 && tc < 134.26) { P.dir = 1; P.handR = [56 + 6 * pulse(tc, 133.6, 0.2), -232]; P.talk = abTalk(t, 133.6, 134.26, 32); P.mouth = 'open'; }
  if (tc >= 134.26 && tc < 135.54) { P.dir = 1; P.handR = [-70, -180]; P.talk = abTalk(t, 134.26, 135.54, 33); P.mouth = P.talk ? 'open' : 'closed'; }
  if (tc >= 135.54) { P.dir = -1; const a = a2ArmVal(tc, 135.52); P.handR = a2ArmHand(a); P.sq *= anticipate(tc, 135.6, 0.4, 0.06); P.talk = abTalk(t, 136.16, 138.18, 34); P.mouth = P.talk ? 'open' : 'closed'; P.gaze = [1, -0.1]; }
  a2Lead(ctx, t, P, m, { shc: sh, kick: tc > 135.54 ? 0.6 * pulse(tc, 136.1, 0.5) : 0 });
  // the riders sweep through the foreground toward the town in silhouette, two rows, shrinking
  // v2 (note 3): one row of six coloured riders on the road at the foot of the town, entering from the right already galloping,
  // shrinking toward the gate (the leader's black horse and crimson cape first), a dust trail behind; gone by 141.8, dust settles
  if (t > 137.9) a2TownRiders(ctx, t);
}
AB_SHOTS.push({ a: 125.27, b: 1e9, ww: 2400, cam: A2_S14_CAM, under: a2GladeUnder('dusk'), world: a2S14World,
  over: (ctx, t, cam, S) => {
    if (t > 129.14 && t < 130.4) { const [hx, hy] = abP(1640, 900 - 240, cam); thoughtCloud(ctx, 330, 330, 300, 200, t, { p: K.clamp((t - 129.14) / 0.35) * (1 - K.clamp((t - 130.22) / 0.15)), tail: [hx - 20, hy], bg: '#ffe2c8', inside: (c) => {
      // v2 (note 10): two pairs of slipper prints, one large and one small, twice the old size, with a question mark
      for (const [x, s] of [[400, 1.5], [620, 1.0]]) for (const [dx, dy, r] of [[-24, 40, -0.15], [24, -20, 0.15]]) { c.save(); c.translate(x + dx * s, 760 + dy * s); c.rotate(r); c.fillStyle = '#5a2a3a'; c.beginPath(); c.ellipse(0, 0, 26 * s, 58 * s, 0, 0, 7); c.fill(); c.fillStyle = '#8a4a5a'; c.beginPath(); c.ellipse(0, -30 * s, 18 * s, 18 * s, 0, 0, 7); c.fill(); c.restore(); }
      c.save(); c.font = 'italic 800 150px "Barlow Semi Condensed"'; c.fillStyle = '#e8364f'; c.textAlign = 'center'; c.fillText('?', 760, 720); c.restore(); } }); }
    const lx = A2_LPX(t), [px, py] = abP(lx, 900 - 260, cam);
    if (t > 133.6 && t < 134.5) S.counter(ctx, 2, 170, 560, K.clamp((t - 133.6) / 0.3) * (1 - K.clamp((t - 134.25) / 0.25)), { size: 110, color: '#ffd36a' });
    abSay(ctx, S, [[133.6, 'TWO KNOW OUR SECRET!']], t, K.clamp(px, 320, 680), 330, [px, py], { size: 50, gone: 135.1 });
    if (t > 136.16 && t < 137.3) abSay(ctx, S, [[136.16, 'SEARCH THE TOWN!']], t, px, 330, [px, py], { size: 54, gone: 136.95 });
    if (t > 136.86 && t < 137.7) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: 1, n: 26, alpha: 0.5 * Math.sin(Math.PI * beatIn(t, 136.86, 137.7)) });
    if (t >= 137.74 && t < 138.4) { const [x, y] = abP(A2_DOME[0], A2_DOME[1], cam); S.emphasis(ctx, x, y, 200, K.clamp((t - 137.74) / 0.6), { rect: [0, 0, 1000, 1230], word: '', seed: 17 }); }
    if (t > 137.74 && t < 139.2) { const [x, y] = abP(A2_DOME[0], A2_DOME[1], cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 138.8) / 0.4); S.arrow(ctx, [x + 150, y - 260], [x + 10, y - 50], K.clamp((t - 137.74) / 0.35), { color: '#7fe3ff' }); ctx.restore(); }
    if (t > 139.0) S.title(ctx, 'THE END', 500, 420 - 10 * K.clamp((t - 139.0) / 3.7), K.clamp((t - 139.0) / 0.9), { size: 110, align: 'center' }); } });
