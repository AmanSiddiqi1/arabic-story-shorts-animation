// ===== spread 5: inside the hut at night, terracotta and rose (105.0-131.8). Scenes S8 and S9. =====
// Library hutRoom (door in the RIGHT wall) baked into one pop-up card; the walls and roof slab (its front pass) drawn live on top.
const AB_HU = { t0: 105.0, out: 131.05, y: 928 };
const AB_HUTO = { palette: 'dusk', preset: 'night', doorSide: 'right', mattress: { x0: 150, x1: 340, head: 'left' }, stool: 400, mat: false, jug: 790, lamp: 1, dark: 0, hook: [300, 250], jar: true };
const AB_HA = hutRoomAnchors(AB_HUTO);
function abHutPrint() {
  return abBake('hut', (c) => {
    abSkyBand(c, 0, AB_GR, AB_MX(NAVY2, FIGC, 0.45), AB_MX(FIGC, C.red, 0.25)); stars(c, { n: 40, h: 700 });
    shape(c, ell(940, 120, 40, 40, 24), CREAM, { lw: 4, seed: 300 });
    abHillPrint(c, 800, 70, AB_MX(FIGC, NAVY2, 0.5), 301);
    abPage(c, AB_MX(EARTH, FIGC, 0.35)); bookFold(c, 0, AB_WW, AB_GR);
  });
}
const abUS = () => abMem(AB_G, 'set', () => ({
  room: abSprite('room', 500, 935, 820, 740, (c) => { c.save(); c.beginPath(); c.rect(90, 196, 820, 740); c.clip(); hutRoom(c, { ...AB_HUTO, layer: 'back', t: 0 }); c.restore(); }, { sx: 6, sy: 8 }),
  table: abSprite('table', 520, 932, 170, 60, (c) => { for (const lx of [455, 585]) seg(c, lx, 884, lx, 930, 9, EARTHD, 3); shape(c, K.rectPts(440, 872, 160, 16), WOOD, { lw: 4, seed: 302, dot: EARTHD, pitch: 8, rad: 0.2, da: 0.4 }); }, { border: 5 }),
  cloth: abSprite('hcloth', 520, 884, 150, 50, (c) => shape(c, [[455, 880], [470, 846], [520, 838], [570, 846], [588, 882]], AB_MX(C.red, C.white, 0.2), { lw: 3.5, seed: 303, dot: C.yellow, pitch: 7, rad: 0.25, da: 0.5 }), { border: 5 }),
  blanket: abSprite('blanket', 286, 872, 120, 50, (c) => shape(c, [[232, 868], [236, 838], [332, 834], [340, 868]], AB_MX(C.blue, C.white, 0.15), { lw: 3.5, seed: 304, dot: C.red, pitch: 8, rad: 0.25, da: 0.4 }), { border: 4 }),
}));
// ---------- positions ----------
const AB_UALIX = [[105.5, 900], [106.3, 640], [117.75, 640], [118.3, 520], [120.35, 500]];
const AB_UALIXF = (t) => kfn(t, AB_UALIX, 'out');
const AB_UCASX = [[113.87, 935], [114.55, 905], [116.25, 905], [116.6, 780], [117.75, 780], [118.4, 640], [119.05, 640], [119.4, 600], [119.61, 590], [120.35, 640], [131.25, 640], [131.8, 760]];
const AB_UCASXF = (t) => kfn(t, AB_UCASX, 'inOut');
const AB_UWIFEX = [[107.11, 422], [107.6, 440], [118.9, 440], [119.3, 420]];
const AB_UWIFEXF = (t) => kfn(t, AB_UWIFEX, 'inOut');
const AB_COINROLL = [[111.67, 560], [111.9, 600], [112.9, 780]];
function abHutCast(t) {
  const y = AB_HU.y;
  // Ali Baba
  const ax = AB_UALIXF(t), A = { ...AB_ALI, x: ax, y, ...walk(AB_UALIXF, t, { stride: 22 }), dir: speed(AB_UALIXF, t) > 1 ? 1 : -1, sq: breathe(t, 3, t < 107.5 ? 0.04 : 0.014), tip: idleSway(t, 5, 0.022, 3), gaze: [-1, 0.1], mouth: 'closed' };
  let sackA = t < 107.11;
  if (t < 106.3) { A.tip = 0.1; A.mouth = 'open'; A.handR = [20, -122]; A.handL = [-12, -118]; A.gaze = [-1, 0]; }
  else if (t < 107.11) { A.handR = t < 106.7 ? [20, -122] : PERSON_HANDS.hush.R; A.handL = t < 106.7 ? [-12, -118] : PERSON_HANDS.pointFwd.R.map((v, i) => (i ? v - 20 : -v)); A.gaze = t < 106.7 ? [1, -0.1] : [-1, 0.3]; A.lid = Math.abs(t - 106.4) < 0.07 ? 1 : 0; A.brow = 0.4; }
  else if (t < 108.0) { A.handRW = [548, 850 - 30 * Math.sin(Math.PI * K.clamp((t - 107.11) / 0.6))]; A.gaze = lookAt([ax, 770], [520, 870]); A.mouth = 'smile'; A.tip = 0.06; }
  else if (t < 108.95) { const u = pulse(t, 108.3, 0.7); A.aL = [-0.3 - 2.15 * u, -0.2 - 2.65 * u]; A.aR = [0.3 + 2.15 * u, 0.2 + 2.65 * u]; A.talk = 0.8 * Math.abs(Math.sin(t * 11)); A.gaze = lookAt([ax, 770], [AB_UWIFEXF(t), 770]); A.eyes = 'wide'; }
  else if (t < 109.8) { A.handLW = [AB_UWIFEXF(t) + 40, 830]; A.handRW = [AB_UWIFEXF(t) + 46, 840]; A.tip = 0.06; A.gaze = [-1, 0]; A.talk = 0.4 * Math.abs(Math.sin(t * 9)); }
  else if (t < 111.3) { A.handR = PERSON_HANDS.hush.R; A.brow = 0.6; A.gaze = gazePlan(t, [[109.8, [-1, 0]], [110.1, [1, -0.1]], [110.6, [-1, 0]]], 0.07); A.lid = Math.abs(t - 110.1) < 0.06 ? 1 : 0; }
  else if (t < 113.2) { A.gaze = lookAt([ax, 770], [AB_UWIFEXF(t), 770]); A.mouth = 'smile'; A.lid = 0.25; }
  else if (t < 116.25) { A.gaze = t < 114.0 ? [1, -0.1] : [-1, 0]; A.mouth = 'smile'; }
  else if (t < 117.75) { A.eyes = t < 116.6 ? 'wide' : undefined; A.gaze = t < 116.7 ? [-1, 0] : [0.2, -1]; A.mouth = 'o'; }
  else if (t < 119.61) { A.tip = t < 119.05 ? -0.06 : -0.1; A.handL = PERSON_HANDS.palmsUp.L; A.handR = PERSON_HANDS.palmsUp.R; A.gaze = [1, 0]; A.sq *= t > 119.05 ? 0.95 : 1; A.mouth = 'frown'; A.brow = -0.4; A.dir = 1; }
  else if (t < 120.35) { A.dir = 1; A.sq = 0.93; A.lid = 0.5; A.gaze = [1, 0.3]; A.mouth = 'frown'; }
  else if (t < 121.3) { A.dir = 1; A.handR = PERSON_HANDS.cupMouth.R; A.talk = 0.3 * Math.abs(Math.sin(t * 13)); A.gaze = [1, 0]; A.tip = 0.05; }
  else if (t < 123.2) { A.dir = 1; A.brow = -0.6; A.gaze = lookAt([ax, 770], [AB_UCASXF(t), 760]); A.mouth = 'frown'; }
  else if (t < 126.99) { A.dir = 1; A.brow = -0.6; A.gaze = lookAt([ax, 770], [640, 760]); if (t > 124.73 && t < 125.4) { A.handRW = [604, 830 + 6 * Math.sin(t * 20)]; A.tip = 0.05; } }
  else if (t < 128.27) { A.dir = 1; A.gaze = [1, 0]; A.lid = 0.3; A.brow = -0.3; }
  else if (t < 129.51) { A.dir = 1; A.sq = blend(t, 128.27, 128.6, 1, 0.95); A.lid = 0.4; A.gaze = t < 128.8 ? [-1, 0] : [0.4, 1]; if (t > 128.8) { A.handRW = [540 + 14 * osc(t, 0.15), 868]; A.tip = 0.08; } }
  else if (t < 130.77) { A.dir = 1; A.gaze = lookAt([ax, 770], [540, 680]); if (t > 130.3) { A.handR = [70, -150]; A.eyes = 'wide'; } }
  else if (t < 131.2) { A.dir = 1; A.handR = PERSON_HANDS.cupMouth.R; A.tip = 0.08; A.talk = 0.3 * Math.abs(Math.sin(t * 13)); A.gaze = [1, 0]; }
  else { A.dir = 1; A.handR = PERSON_HANDS.pointUp.R; A.brow = 0.5; A.gaze = [1, 0]; A.mouth = 'o'; }
  // the wife
  const wx = AB_UWIFEXF(t), sit = t < 107.11 ? 1 : blend(t, 107.11, 107.45, 1, 0), wtf = turnFlip(t, [[0, -1], [105.6, 1]], 0.4);
  const Wf = { ...AB_WIFE, x: wx, y: sit > 0.5 ? 900 : y, sit, seat: 'bench', ...walk(AB_UWIFEXF, t, { stride: 20 }), dir: wtf.dir, sq: breathe(t, 7, 0.012), tip: idleSway(t, 171, 0.02, 3.1), gaze: lookAt([wx, 770], [ax, 770]) };
  if (t < 105.5) { Wf.handL = [16, -120]; Wf.handR = [26, -126]; Wf.gaze = [0.4, 0.6]; }
  if (t > 105.6 && t < 105.75) Wf.lid = 1;
  if (t >= 107.6 && t < 108.0) { Wf.handL = PERSON_HANDS.cheeks.L; Wf.handR = PERSON_HANDS.cheeks.R; Wf.eyes = 'wide'; Wf.sq = 1.05; Wf.mouth = 'o'; }
  if (t >= 108.0 && t < 108.95) Wf.gaze = lookAt([wx, 770], gazePlan(t, [[108, [540, 760]], [108.4, [ax, 770]], [108.7, [540, 760]]], 0.07));
  if (t >= 108.95 && t < 109.8) { Wf.gaze = [1, 0]; Wf.handR = [60, -130]; }
  if (t >= 110.97 && t < 111.7) { const n = flow(t, [[110.97, 0], [111.12, 1], [111.27, 0], [111.42, 1], [111.57, 0]]); Wf.drop = 8 * n; Wf.handR = t < 111.4 ? PERSON_HANDS.mouthCover.R : [22 + 8 * Math.sin(t * 25), -172]; Wf.handL = PERSON_HANDS.mouthCover.L; Wf.lid = 0.3; }
  if (t >= 111.3 && t < 112.4) { Wf.handRW = [K.lerp(560, 520, K.clamp((t - 111.4) / 0.4)), 850]; Wf.handL = undefined; }
  if (t >= 112.4 && t < 113.2) { Wf.gaze = [1, 0]; Wf.mouth = 'smile'; }
  if (t >= 116.25 && t < 117.75) { Wf.gaze = t < 116.7 ? [1, 0] : [-0.2, -1]; Wf.eyes = t < 116.6 ? 'wide' : undefined; }
  if (t >= 119.05 && t < 121.3) { Wf.gaze = [1, 0]; Wf.tip = -0.05; Wf.handL = [40, -120]; }
  if (t >= 121.3) { Wf.handL = PERSON_HANDS.headHold.L; Wf.handR = PERSON_HANDS.headHold.R; Wf.lid = 0.4; Wf.mouth = 'frown'; Wf.gaze = [1, 0]; }
  if (t >= 128.27 && t < 129.4) { Wf.tilt = 0.12 * Math.sin((t - 128.3) * 14); Wf.handL = Wf.handR = undefined; }
  if (t >= 131.2) { Wf.sq = blend(t, 131.2, 131.6, 1, 0.95); Wf.handL = Wf.handR = undefined; Wf.lid = 0.5; }
  // Cassim
  let C2 = null, peek = false, coinHeld = false;
  if (t >= 113.87) {
    const cx = AB_UCASXF(t); C2 = { ...AB_CAS, x: cx, y, ...walk(AB_UCASXF, t, { stride: 24 }), dir: -1, sq: breathe(t, 13, 0.014), tip: idleSway(t, 181, 0.02, 2.7), gaze: [-1, 0.2], brow: 0.3 };
    peek = t < 116.25;
    if (peek) { C2.tip = 0.28; C2.amp = 0; C2.gaze = t < 115.35 ? [-1, 0] : lookAt([cx - 40, 760], gazePlan(t, [[115.35, [500, 850]], [115.6, [300, 850]], [115.85, [780, 905]]], 0.07)); if (t > 115.85) C2.brow = -0.5; }
    else if (t < 117.75) { C2.kneel = flow(t, [[116.6, 0], [116.85, 0.6], [117.0, 0.6], [117.2, 0]]); coinHeld = t > 116.9; C2.handRW = t > 116.9 ? [cx - 30, 760 - 40 * K.clamp((t - 117.0) / 0.3)] : [780, 905 - 20]; C2.gaze = t < 116.9 ? [0, 1] : [-0.2, -0.6];
      if (t > 117.2) { C2.mouth = 'open'; C2.brow = 0.8 * pulse(t, 117.3, 0.4); C2.handRW = [cx - 4, 778]; } }
    else if (t < 120.35) { C2.tip = 0.12; C2.brow = 0.8; C2.gaze = lookAt([cx, 760], [ax, 770]); C2.handR = t < 119.05 ? PERSON_HANDS.pointFwd.R : [80, -110]; coinHeld = true; if (t > 119.05 && t < 119.61) { C2.handRW = [580, 860]; C2.handR = undefined; } C2.talk = 0.5 * Math.abs(Math.sin(t * 10)); }
    else if (t < 123.2) { C2.gaze = lookAt([cx, 760], [545, 760]); if (t > 121.3) { C2.eyes = 'wide'; C2.mouth = 'smile'; C2.sq = 1.05; const w = osc(t, 0.5); C2.handL = [10 + 10 * w, -122]; C2.handR = [24 - 10 * w, -126]; } }
    else if (t < 126.99) { C2.gaze = [-0.2, -1]; C2.mouth = 'smile'; const w = osc(t, t > 125.47 ? 0.3 : 0.5); C2.handL = [10 + 10 * w, -122]; C2.handR = [24 - 10 * w, -126]; if (t > 125.47) { C2.sq = 1.06; C2.y -= 6; } if (t > 126.35) C2.coinEyes = true; }
    else if (t < 129.51) { C2.handR = [72, -150 + 8 * osc(t, 0.2)]; C2.sq = 1 + 0.03 * Math.abs(Math.sin((t - 127) * Math.PI / 0.4)); C2.brow = 0.6; C2.gaze = [-1, 0]; C2.talk = 0.4 * Math.abs(Math.sin(t * 9)) * (t < 127.8 ? 1 : 0); }
    else if (t < 130.77) { C2.gaze = lookAt([cx, 760], [540, 680]); C2.eyes = 'wide'; if (t > 130.2) { C2.handRW = t < 130.3 ? [575, 640] : [cx - 40, 780]; } }
    else if (t < 131.25) { C2.handL = PERSON_HANDS.cupEar.R.map((v, i) => (i ? v : -v)); C2.drop = 6 * Math.abs(Math.sin(t * 16)); C2.gaze = [1, -0.1]; C2.handRW = [cx + 40, 790]; }
    else { const tf = turnFlip(t, [[0, -1], [131.25, 1]], 0.35); C2.dir = tf.dir; C2.gaze = [1, 0]; C2.handRW = [cx + 40, 780]; C2.tip = 0.1; }
  }
  return { A, sackA, Wf, C2, peek, coinHeld };
}
function abHut(ctx, t) {
  AB_G = 'hut';
  const SP = abUS(), t0 = AB_HU.t0 + 0.1, out = AB_HU.out, pop = (d) => abK(t, t0, { delay: d, out: out + d * 0.1 }), kA = abK(t, t0, { delay: 0.35, out: out + 0.12 }), kR = pop(0);
  ctx.drawImage(abHutPrint(), 0, 0, AB_WW, AB_WH);
  abPut(ctx, SP.room, kR);
  const H = abHutCast(t), door = flow(t, [[105.4, 0], [105.6, 1], [106.2, 1], [106.45, 0], [113.2, 0], [113.6, 0.3], [116.2, 0.3], [116.45, 0.9], [116.9, 0.9], [117.2, 0.3], [131.2, 0.3], [131.5, 1]]);
  // lamp flame (live) and the child asleep under the blanket
  if (kR > 0.9) { const lp = AB_HA.lamp, lean = t > 113.2 && t < 114.4 ? -6 * pulse(t, 113.2, 1.2) : 0; shape(ctx, [[lp[0] + 14, lp[1] - 16], [lp[0] + 18 + lean + 2 * Math.sin(t * 17), lp[1] - 48 - 3 * Math.sin(t * 11)], [lp[0] + 26, lp[1] - 16]], C.yellow, { lw: 3, seed: 310 }); }
  const kid = { ...AB_KID, x: AB_HA.mattress.lieX, y: 864, lie: 1, lid: 1, dir: 1, sq: breathe(t, 9, 0.02), mouth: 'o' };
  if (t > 113.2 && t < 114.2) kid.rot = -0.05 * pulse(t, 113.3, 0.8);
  abLive(ctx, kid.x, 870, 260, 120, (c) => { abPerson(c, kid); }, kA);
  abPut(ctx, SP.blanket, kA, { rot: kid.rot || 0, dy: -2 * (breathe(t, 9, 0.6) - 1) });
  // cast between the back wall and the front walls, by depth
  const L = [];
  if (H.Wf) L.push([AB_HU.y - 1, () => abLive(ctx, H.Wf.x, H.Wf.y, 180, 250, (c) => abPerson(c, H.Wf), kA)]);
  L.push([AB_HU.y + 2, () => abHutTable(ctx, t, H, SP, kA, pop)]);
  L.push([AB_HU.y, () => abLive(ctx, H.A.x, H.A.y, 230, 300, (c) => { abPerson(c, H.A, { patches: true }); if (H.sackA) abSack(c, H.A.x + 24, H.A.y - 66, 40, 48, 0.7, { seed: 240 }); }, kA)]);
  if (H.C2) L.push([AB_HU.y + 1, () => { if (H.peek) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 893, 1230); ctx.clip(); }
    abLive(ctx, H.C2.x, H.C2.y, 240, 320, (c) => { abPerson(c, H.C2); abCassimExtras(c, t, H); }, kA); if (H.peek) ctx.restore(); }]);
  L.sort((a, b) => a[0] - b[0]); for (const [, f] of L) f();
  // the coin that rolls to the door
  if (t > 111.67 && t < 117.0) { const cx = kfn(t, AB_COINROLL, 'out'), u = K.clamp((t - 112.9) / 0.4), held = t > 116.9;
    if (!held) { const fy = t < 111.9 ? K.lerp(872, 906, K.clamp((t - 111.67) / 0.23)) : 906, flat = t < 112.9 ? 1 : 1 - u; abLive(ctx, cx, fy, 30, 30, (c) => abCoin(c, cx, fy - 10 + 8 * (1 - flat), 10, Math.max(0.15, flat * Math.abs(Math.cos(t * 9))), t < 112.9 ? 0 : 0), kA, { border: 3, shadow: 0.4 }); }
    if (t > 116.25 && t < 116.9) for (let i = 0; i < 2; i++) { const g = pulse(t, 116.25 + i * 0.25, 0.4); if (g > 0) abStar(ctx, 770 + i * 22, 890 - i * 14, 12 * g, t * 4, C.white); } }
  // front pass of the room: side walls, roof slab and the door leaf, folded with the room card
  if (kR > 0.02) { ctx.save(); ctx.translate(0, 935); ctx.scale(1, kR); ctx.translate(0, -935); hutRoom(ctx, { ...AB_HUTO, layer: 'front', door, t }); ctx.restore(); }
  // warm lamp light, rose shadows
  if (kR > 0.02) { const lp = AB_HA.lamp, g = ctx.createRadialGradient(lp[0], lp[1] - 30, 60, lp[0], lp[1] - 30, 620); g.addColorStop(0, 'rgba(255,214,150,0)'); g.addColorStop(1, AB_MX(C.red, NAVY2, 0.55));
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.6 * kR; ctx.fillStyle = g; ctx.fillRect(90, 196, 820, 740); ctx.restore(); }
  return H;
}
function abHutTable(ctx, t, H, SP, kA, pop) {
  abPut(ctx, SP.table, pop(0.3));
  // coins spilled on the table, covered by the cloth from 111.6
  if (t > 107.3) { const cov = K.clamp((t - 111.4) / 0.3); for (let i = 0; i < 9; i++) { const t1 = 107.3 + i * 0.05, d = t - t1; if (d < 0) continue; const x = 470 + ((i * 37) % 110), y = 872 - Math.abs(Math.sin(Math.min(d, 0.5) * 12)) * 18 * Math.exp(-d * 4);
      if (cov < 1 || i % 3 === 0) abLive(ctx, x, y, 24, 22, (c) => abCoin(c, x, y - 6, 8, 0.6 + 0.4 * Math.abs(Math.cos(i))), kA, { border: 3, shadow: 0.3 }); } }
  if (t > 111.4) { const k = K.ease.back(K.clamp((t - 111.4) / 0.4)), lift = t > 119.05 && t < 120.35 ? 0.4 * pulse(t, 119.1, 1.2) : 0; abPut(ctx, SP.cloth, Math.min(1, k) * (1 - lift), { dx: 0 }); }
  // the picture card (108.0-111.3 and 120.35-123.0) and the map (128.27-130.3)
  for (const [a, op, b] of [[108.0, 108.4, 111.3], [120.35, 121.3, 123.0]]) { const k = abK(t, a, { out: b, dur: 0.4 }); if (k > 0.02) { const o = K.ease.back(K.clamp((t - op) / 0.6)); abLive(ctx, 545, 872, 240, 210, (c) => { c.translate(545, 872); c.scale(0.62, 0.62); c.translate(-545, -872); abStoryCard(c, t, 545, 872, o, op); }, k); } }
  if (t > 128.8 && t < 129.6) abLive(ctx, 540, 878, 70, 20, (c) => shape(c, K.rectPts(510, 866, 60, 10), AB_MX(CREAM, SAND, 0.3), { lw: 2.5, seed: 320 }), 1, { border: 3 });
  if (t > 129.51 && t < 130.3) { const k = K.ease.back(K.clamp((t - 129.51) / 0.35)), x = 545, y = K.lerp(866, 600, k), d = K.clamp((t - 129.51) / 0.62); abLive(ctx, x, y + 60, 160, 130, (c) => { c.translate(x, y); c.scale(0.7 * Math.max(0.2, k), 0.7 * Math.max(0.2, k)); abMapCard(c, 0, 0, d, 0); }, 1, { border: 5 }); }
}
function abCassimExtras(c, t, H) {
  const P = H.C2;
  if (H.coinHeld && !(t > 128.0)) { const h = P.handRW || [P.x + (P.dir > 0 ? 70 : -70), P.y - 150]; abCoin(c, h[0], h[1] - 8, 9, 1); }
  if (P.coinEyes && t < 126.99) { const s = P.s, k = K.ease.back(K.clamp((t - 126.35) / 0.25)); for (const sd of [-1, 1]) { c.save(); abBodyT(c, P); abCoin(c, P.x + sd * 13 * s, P.y - 199 * s - 6, 13 * k, 1); c.restore(); } }
  if (t > 130.3) { const h = P.handRW || [P.x + 40, P.y - 150]; c.save(); c.translate(h[0] + (P.dir > 0 ? 20 : -20), h[1] - 22); c.scale(0.45, 0.45); abMapCard(c, 0, 0, 1, 0.15 * Math.sign(P.dir)); c.restore(); }
}
function abHutOver(ctx, t, cam, S) {
  const H = abHutCast(t);
  if (t > 110.37 && t < 111.6) { const [x, y] = abToPanel(H.A.x + 70, 690, cam); ctx.save(); abFade(ctx, t, 110.37, 111.6); S.label(ctx, 'SHHH!', x, y, abB(t, 110.4, 0.5), { size: 40, tilt: 0.06 }); ctx.restore(); }
  if (t > 114.55 && t < 116.6) { const [x, y] = abToPanel(720, 560, cam), to = abToPanel(870, 700, cam); ctx.save(); abFade(ctx, t, 114.55, 116.6); S.label(ctx, 'CASSIM', x, y, abB(t, 114.6, 0.5), { size: 36 }); S.arrow(ctx, [x + 40, y + 34], to, abB(t, 114.8, 0.4), { bend: -0.25, width: 16 }); ctx.restore(); }
  if (t > 116.25 && t < 117.0) { const a = abToPanel(870, 760, cam), b = abToPanel(790, 880, cam); ctx.save(); abFade(ctx, t, 116.25, 117.0, 0.2); S.arrow(ctx, a, b, abB(t, 116.3, 0.3), { bend: 0.2, width: 14 }); ctx.restore(); }
  // three question bubbles from both sides, bigger each time, folding away in order at 120.35
  [[118.47, 650, 560, 34, 0.08], [119.05, 430, 520, 44, -0.06], [119.61, 560, 470, 56, 0.03]].forEach(([ta, wx, wy, sz, tl], i) => { if (t < ta || t > 120.6 + i * 0.12) return; const [x, y] = abToPanel(wx, wy, cam), to = abToPanel(H.C2 ? H.C2.x : 640, 720, cam);
    ctx.save(); ctx.globalAlpha = K.clamp((120.6 + i * 0.12 - t) / 0.25); S.label(ctx, '?', x, y, abB(t, ta, 0.4), { balloon: true, to, size: sz, tilt: tl }); ctx.restore(); });
  // S9: Cassim's thought cloud of gold (123.5-126.35), swelling, then bursting into coins
  if (t > 123.5 && t < 126.4) { const sw = 1 + 0.25 * K.ease.inOut(K.clamp((t - 125.47) / 0.8)), [x, y] = abToPanel(600, 470, cam), tl = abToPanel(620, 720, cam), z = cam.zoom * 0.8;
    thoughtCloud(ctx, x, y, 300 * z * sw, 220 * z * sw, t, { p: K.clamp((t - 123.5) / 0.6), tail: tl, fill: C.white, lw: 6, scale: 0.42 * sw * cam.zoom * 0.8, at: [500, 900], bg: AB_MX(C.yellow, C.white, 0.75), inside: (c) => { const g = K.clamp((t - 125.47) / 0.8); abCoinPile(c, 500, 1010, 520 * (0.75 + 0.35 * g), 300 * (0.7 + 0.5 * g), 1, 9); } }); }
  if (t > 126.35 && t < 127.6) for (let i = 0; i < 8; i++) { const u = K.clamp((t - 126.35) / 1.2), [x, y] = abToPanel(500 + i * 30 + 20 * Math.sin(i), 420 + u * 500 + i * 6, cam); ctx.save(); ctx.globalAlpha = 1 - u; abCoin(ctx, x, y, 14 * cam.zoom * 0.6, Math.abs(Math.cos(t * 9 + i)), 0); ctx.restore(); }
}
