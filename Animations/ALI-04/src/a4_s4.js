// ===== ALI-04 shots S9-S12 (65.0 - 96.3 s): the kitchen idea, waking the neighbours, the gates shut in whispers, the guards come =====
A4_GUARDS.push({ s: 1.0, age: 0.25, w: 1.0 });   // a fourth guard (index 4) so both gates get two crossed spears

// ---------- S9 65.0-70.2: the kitchen: breath at the door, pacing, three thought pictures, the idea ----------
const A4_K_X = (u) => kfn(u, [[65.0, 900], [65.76, 900], [66.3, 600], [66.6, 480], [67.5, 700], [68.3, 560], [69.5, 560], [70.2, 920]]);
function a4S9World(ctx, t, cam) {
  const tc = AB_T2(t); kitchen(ctx, t, { door: kfn(tc, [[64.9, 0.6], [65.06, 0], [69.7, 0], [70.0, 0.8]]), draught: 1, draughtT: 65.0, view: { moon: A4_MOON.late, extra: tc > 68.36 && tc < 69.3 ? (c) => { abGlow(c, 900, 520, 90, 0.9, '#ffcf6a'); } : null } });
  const lampOnTable = tc > 66.2 && tc < 69.6;
  if (lampOnTable) oilLamp(ctx, 560, 756, 1.1, { flame: 0, t });
  a4Cat(ctx, t, { x: 700, y: KT.win.y + KT.win.h + 8, dir: -1, sit: 1, gaze: tc > 69.3 ? (tc < 69.7 ? [-1, 0.2] : [1, 0.1]) : [-1, 0.3], gy: KT.win.y + KT.win.h + 8 }, '#8a4a3a');
  const W = walk(A4_K_X, tc, { stride: 18 }), P = { y: 905, dir: speed(A4_K_X, tc) < -5 ? -1 : speed(A4_K_X, tc) > 5 ? 1 : (tc < 66.0 ? -1 : 1), ...W, lid: abLid(t, 151, [66.6, 67.5]), tip: idleSway(tc, 152, 0.02, 2.4), sq: breathe(tc, 153, 0.015), gaze: [-1, 0], mouth: 'closed', handL: [-26 + 12 * Math.sin(W.ph), -112], handR: [26 - 12 * Math.sin(W.ph), -112] };
  const o = { lamp: { flame: 0, hand: 0 }, kick: Math.abs(speed(A4_K_X, tc)) > 5 ? 0.3 : swing(t, 66.6, 0.6, 1.4, 3) + swing(t, 67.5, 0.6, 1.4, 3) };
  if (tc < 65.76) { P.lid = 1; P.sq *= K.lerp(0.95, 1.02, beatIn(tc, 65.06, 65.7)); P.tip = -0.06; P.handL = [-30, -96]; P.handR = [20, -126]; P.mouth = 'o'; }
  else if (tc < 66.62) { P.handR = PERSON_HANDS.chin.R; P.handR = [16, -160 + 4 * Math.sin(tc * 18)]; P.gaze = [P.dir, 0]; }
  else if (tc < 67.54) { P.handR = PERSON_HANDS.chin.R; P.gaze = [P.dir, -0.3]; P.look = tc > 67.2 ? 0.6 * Math.sin(tc * 30) : 0; P.brow = 0.4; }
  else if (tc < 68.36) { P.gaze = [0, -1]; P.handL = [-10, -114]; P.handR = [10, -116]; P.mouth = 'smile'; P.brow = -0.3; P.lid = 0.2; }
  else if (tc < 69.3) { P.gaze = [1, -0.3]; P.look = 0.6; P.eyes = tc > 68.8 ? 'wide' : 'open'; P.handR = [10, -116]; }
  else { P.handR = tc < 69.6 ? PERSON_HANDS.pointUp.R : [-30, -170]; P.eyes = 'wide'; P.mouth = 'smile'; P.gaze = [1, -0.2]; o.kick = swing(t, 69.6, 1, 1.6, 3); if (tc > 69.55) { P.dir = 1; } }
  if (!lampOnTable) o.lamp.hand = 0; else o.lamp = { flame: 0, hand: 0, hide: true };
  morgiana(ctx, t, P, 'lamp', { kick: o.kick, shc: '#8a4a3a' }); if (!lampOnTable) { const [hx, hy] = a2Hand(P, 0, A3_MORG); oilLamp(ctx, hx + 4, hy - 4, 0.95, { flame: 0, t, dir: P.dir }); }
  return P;
}
function a4Sleepers(c) { celShade(c, [[330, 760], [360, 700], [660, 690], [690, 760]], '#c8643a', '#8a3a1e', { off: 10, lw: 4 });
  [[400, 690, '#f6efe0', AB_ACC], [500, 686, '#f3e2c0', '#c86a7c'], [590, 696, '#e8902a', '#3f7ad0']].forEach(([x, y, cap, band]) => { celShade(c, ell(x, y, 34, 30, 20), C.skin, '#d99a80', { off: 6, lw: 3 }); celShade(c, ell(x, y - 26, 34, 16, 16), cap, abDark(cap, 0.25), { off: 4, lw: 3 }); seg(c, x - 30, y - 16, x + 30, y - 16, 5, band, 0); seg(c, x - 14, y + 2, x - 4, y + 2, 3, '#4a2a2a', 0); seg(c, x + 4, y + 2, x + 14, y + 2, 3, '#4a2a2a', 0); });
  c.save(); c.strokeStyle = AB_MORG_ACC; c.lineWidth = 12; c.beginPath(); c.ellipse(510, 720, 230, 110, 0, 0, 7); c.stroke(); c.restore(); }
function a4S9Over(ctx, t, cam, S) {
  const tc = AB_T2(t), P = { x: A4_K_X(tc), y: 905 }, [mx, my] = abP(P.x, 700, cam);
  if (t > 66.62 && t < 69.4) { const p = K.clamp((t - 66.62) / 0.3) * (1 - K.clamp((t - 69.2) / 0.2)), ph = tc < 67.54 ? 0 : tc < 68.36 ? 1 : 2, [cx, cy] = abP(480, 300, cam);
    thoughtCloud(ctx, K.clamp(cx, 290, 710), Math.max(cy, 260), 520, 400, t, { p, tail: [mx, my - 20], scale: 0.52, at: [575, 730], inside: (c) => {   // v2 (note 10): half the panel width
      if (ph === 0) { a3Shadow(c, 300, 905, 100); abMorgiana(c, { x: 300, y: 905, dir: 1, handR: [60, -170], mouth: 'o', eyes: 'wide' }, 'lamp'); seg(c, 340, 760, 380, 660, 8, '#c8a070', 2);
        for (let i = 0; i < 5; i++) { oilJar(c, 480 + i * 80, 905, 1.0, { peek: { lift: 0.8, eyes: 1, gaze: [-1, 0] } }); }
        if (tc > 67.0) { c.save(); c.strokeStyle = '#e8202a'; c.lineWidth = 26; c.lineCap = 'round'; const u = beatIn(tc, 67.0, 67.2); c.beginPath(); c.moveTo(250, 560); c.lineTo(250 + 640 * u, 560 + 380 * u); c.stroke(); c.restore(); } }
      else if (ph === 1) a4Sleepers(c);
      else { [300, 450, 600].forEach((x, i) => a3DoorIcon(c, x, 720, ['#3f9a5a', '#9a4a9a', '#8a5a3a'][i])); c.save(); c.translate(780, 700); c.scale(2.2, 2.2); celShade(c, [[-36, 4], [-34, -18], [-14, -34], [0, -58], [14, -34], [34, -18], [36, 4]], '#e8c050', '#b08a20', { off: 7, hi: '#fff0a0', lw: 2.5, line: '#6a4a10' }); c.restore(); } } }); }
}
AB_SHOTS.push({ a: 65.0, b: 70.2, ww: 1000, cam: a3Cam([[65.0, { x: 500, y: 615, zoom: 1 }], [68.3, { x: 515, y: 612, zoom: 1.02 }], [69.6, { x: 560, y: 600, zoom: 1.15 }], [70.2, { x: 565, y: 600, zoom: 1.16 }]]), world: a4S9World, over: a4S9Over });

// ---------- S10 70.2-78.4: the street at night: two doors tapped, the huddle, FETCH THE GUARDS!, the boy runs ----------
const A4_S10_MX = (u) => kfn(u, [[70.24, 1310], [70.5, 1290], [71.2, 720], [72.3, 720], [72.62, 470], [73.34, 470], [73.7, 540]]);
function a4S10World(ctx, t, cam) {
  const tc = AB_T2(t), d1 = kfn(tc, [[72.62, 0], [72.9, 0.85]]), d2 = kfn(tc, [[73.34, 0], [73.5, 0.85]]);
  const BX = (u) => kfn(u, [[73.2, 370], [73.6, 430]]), OX = (u) => kfn(u, [[73.34, 660], [73.8, 610]]), YX = (u) => u < 77.8 ? kfn(u, [[73.2, 380], [73.6, 485]]) : kfn(u, [[77.8, 485], [77.95, 470], [78.4, -40]]);
  const winLit = beatIn(tc, 72.04, 72.2) * (1 - beatIn(tc, 73.3, 73.4));
  a3Street(ctx, t, cam, { m: 'night', lan: 1, washing: null, marks: { glow: 0.4 }, gate: kfn(tc, [[70.24, 0], [70.4, 0.2], [71.0, 0.2], [71.2, 0]]), doors: [{ i: 1, open: d1, lit: d1 > 0 ? 1 : 0, inside: tc < 73.2 ? (c) => { baker(c, t, { x: 370, y: 905, dir: 1, handR: PERSON_HANDS.headHold.R, handL: [-20, -100], lid: 0.6, tip: 0.04 * osc(tc, 1.4), mouth: 'o' }, A4_N, { shadow: false }); apprentice(c, t, { x: 395, y: 905, dir: 1, gaze: [1, 0], eyes: 'wide' }, A4_N, { shadow: false }); } : null },
    { i: 2, open: d2, lit: d2 > 0 ? 0.8 : 0 }], underCast: (c) => { if (winLit > 0) { c.save(); c.beginPath(); c.rect(560, 400, 64, 84); c.clip(); c.globalAlpha = winLit; c.fillStyle = '#ffd98a'; c.fillRect(560, 400, 64, 84); neighbourNight(c, t, { x: 592, y: 560, dir: 1, lid: 0.5 * (1 - beatIn(tc, 72.3, 72.4)), brow: tc > 72.4 ? -0.6 : 0.3, gaze: [1, 0.6] }, A4_N, { shadow: false }); c.restore(); abGlow(c, 592, 440, 90, 0.6 * winLit, '#ffcf6a'); } } });
  a3Cat(ctx, t, { x: 1000, y: 242, dir: -1, sit: 1, gaze: [-1, 0.6] });
  // the old neighbour, the baker, the boy, Morgiana (huddle at x 470..620)
  const huddle = tc > 73.34 && tc < 77.8, lean = huddle ? 0.08 * beatIn(tc, 73.6, 73.9) : 0;
  if (tc > 73.34) { const W = walk(OX, tc), O = { y: 915, dir: -1, ...W, lid: abLid(t, 161), tip: lean + idleSway(tc, 162, 0.02, 2.2), gaze: [-1, 0], mouth: 'closed' };
    if (tc > 73.6 && tc < 74.2) { O.handRW = [575, 735]; O.mouth = 'smile'; }
    if (tc > 74.6 && tc < 75.4) { O.handR = PERSON_HANDS.mouthCover.R; O.eyes = 'wide'; }
    neighbourNight(ctx, t, O, A4_N, { broom: 10, shc: A4_NSH }); }
  if (tc >= 73.2) { const W = walk(BX, tc), B = { y: 915, dir: 1, ...W, lid: tc < 74.4 ? 0.5 : 0, tip: lean + idleSway(tc, 171, 0.025, 2.6), gaze: [1, 0], mouth: 'closed', handL: [-30, -100], handR: [30, -100] };
    if (tc > 74.6 && tc < 75.4) { B.eyes = 'wide'; B.mouth = 'o'; }
    const cap = tc > 74.6 && tc < 75.0 ? 0.8 : 0; const caught = tc > 78.0;
    if (caught) { B.handR = [60, -200]; B.gaze = [-1, -0.4]; }
    baker(ctx, t, B, A4_N, { capKick: cap * 3, flop: cap, shc: A4_NSH }); if (caught) { const [hx, hy] = a2Hand(B, 1, { s: 1.1, age: 0.45 }); a4Cap(ctx, hx, hy - 10, 0.3); } }
  const MW = walk(A4_S10_MX, tc, { stride: 16 }), M = { y: 915, dir: tc < 73.34 ? -1 : (tc < 75.46 ? 1 : -1), ...MW, lid: abLid(t, 181), tip: lean + idleSway(tc, 182, 0.02, 2.4), sq: breathe(tc, 183, 0.015), gaze: [-1, 0], mouth: 'closed', handL: [-26 + 12 * Math.sin(MW.ph), -112], handR: [26 - 12 * Math.sin(MW.ph), -112] };
  if (tc < 71.2 && MW.amp > 0.1) { M.tip = -0.08; M.handL = [-60, -140]; M.handR = [40, -140]; }
  if (tc > 71.22 && tc < 72.0) { M.handRW = [700, 760 - 8 * Math.abs(Math.sin((tc - 71.22) * Math.PI / 0.2))]; M.tilt = -0.1; M.gaze = [-1, 0]; M.lid = 0.4; }
  if (tc > 72.0 && tc < 72.3) { M.gaze = [-1, -1]; M.look = -0.3; }
  if (tc > 73.34 && tc < 74.3) { M.dir = -1; M.gaze = [-1, 0]; M.mouth = 'smile'; }
  if (tc > 74.36 && tc < 75.46) { M.handR = PERSON_HANDS.cupMouth.R; M.dir = -1; M.gaze = [-1, 0]; M.talk = abTalk(t, 74.4, 75.4, 3, 0.4); }
  if (tc > 75.46 && tc < 76.38) { M.dir = 1; M.handR = [96, -140]; M.gaze = [1, 0.3]; }
  if (tc > 76.38 && tc < 77.8) { M.dir = 1; M.handR = tc < 76.9 ? [20, -230] : [70, -200]; M.handL = tc < 76.9 ? [-20, -228] : [30, -120]; M.gaze = [1, 0.3]; M.talk = abTalk(t, 76.4, 77.3, 4, 0.4); }
  if (tc > 77.8) { M.gaze = [-1, 0]; M.dir = -1; }
  morgiana(ctx, t, M, A4_N, { stream: tc < 71.2 ? 0.8 : 0, kick: tc > 75.46 ? swing(t, 75.46, 0.5, 1.4, 3) : 0, shc: A4_NSH });
  if (tc >= 73.2) { const W = walk(YX, tc, { stride: tc > 77.8 ? 40 : 18 }), Y = { y: 918, dir: tc < 77.8 ? -1 : -1, ...W, lid: abLid(t, 191), tip: idleSway(tc, 192, 0.025, 2) + (tc > 77.9 ? -0.14 : 0), gaze: [-1, 0], mouth: 'closed', handL: [-24, -96], handR: [20, -100] };
    if (tc > 74.6 && tc < 75.46) { Y.mouth = 'o'; Y.eyes = 'wide'; Y.drop = 6; }
    if (tc > 75.46 && tc < 76.38) { Y.handR = [10, -120]; Y.gaze = tc < 75.9 ? [-1, 0] : [1, 0]; Y.look = tc > 75.9 ? 0.8 : 0; Y.dir = tc < 75.9 ? -1 : 1; Y.mouth = 'o'; }
    if (tc > 77.3 && tc < 77.8) { Y.handL = [-30, -200]; Y.tip = 0.06 * Math.abs(Math.sin(tc * 20)); Y.mouth = 'smile'; Y.eyes = 'wide'; }
    if (tc > 77.8) { Y.handL = [-50, -140]; Y.handR = [40, -140]; }
    if (tc < 78.0) apprentice(ctx, t, Y, A4_N, { capSlip: tc > 77.45, noCap: tc > 77.85, shc: A4_NSH }); else apprentice(ctx, t, Y, A4_N, { noCap: true, shc: A4_NSH });
    if (tc > 77.85 && tc < 78.05) a4Cap(ctx, 470, 700 - 80 * beatIn(tc, 77.85, 78.0), tc * 6);
    if (tc > 77.8) a3Puff(ctx, 470, 912, (t - 77.85) / 0.4, 5, 9, '#c8b8e0'); }
}
function a4S10Over(ctx, t, cam, S) {
  const tc = AB_T2(t);
  if (t > 74.36 && t < 75.5) { const [x, y] = abP(540, 700, cam); a3PicBalloon(ctx, x + 60, y - 260, 330, 190, [x, y - 30], K.clamp((t - 74.36) / 0.2) * (1 - K.clamp((t - 75.3) / 0.2)), (c) => {
    for (let i = 0; i < 5; i++) oilJar(c, x + 60 - 130 + i * 65, y - 190, 0.62, { peek: { lift: 0.9, eyes: 1, gaze: [Math.sin(i), 0] } }); }); }
  if (t > 75.46 && t < 76.4) { const [x, y] = abP(485, 690, cam); a3Q(ctx, S, x, y - 140, t, 75.9, 76.3, { size: 46 }); }
  if (t > 76.3 && t < 77.7) { const [x, y] = abP(540, 700, cam); a4Say(ctx, S, [[76.38, 'FETCH THE GUARDS!']], t, x + 40, y - 230, [x + 10, y - 40], { size: 46, gone: 77.3 }); }
}
AB_SHOTS.push({ a: 70.2, b: 78.4, ww: 2000, cam: a3Cam([[70.2, { x: 1050, y: 615, zoom: 1 }], [70.6, { x: 1050, y: 615, zoom: 1 }], [72.4, { x: 620, y: 615, zoom: 1 }], [77.6, { x: 600, y: 615, zoom: 1 }], [78.4, { x: 500, y: 615, zoom: 1 }]]), world: a4S10World, over: a4S10Over });

// ---------- S11 78.4-88.4: the gate pushed shut, the creak, SHHH!, the bar, the posts, the sneeze, the sleeper ----------
const A4_BK_X = (u) => kfn(u, [[78.4, 800], [81.9, 800], [83.1, 1520], [88.4, 1520]]);
const A4_OW_X = (u) => kfn(u, [[78.4, 680], [82.16, 680], [82.9, 830]]);
const A4_M11_X = (u) => kfn(u, [[78.4, 740], [81.3, 740], [81.4, 730], [84.4, 730], [85.55, 1440], [86.78, 1440], [88.4, 1000]]);
function a4S11World(ctx, t, cam) {
  const tc = AB_T2(t), gate = kfn(tc, [[78.4, 0.45], [80.1, 0.02], [80.14, 0]]), bar = tc < 81.34 ? null : beatIn(tc, 81.34, 81.8), latch = beatIn(tc, 82.95, 83.1);
  a4Yard(ctx, t, cam, { moon: A4_MOON.late, gate: { open: gate, bar: bar == null ? 0.001 : bar, wrap: tc > 81.34, creak: tc > 80.14 && tc < 80.7 ? Math.abs(Math.sin(tc * 30)) : 0 }, back: [0, tc < 82.95 ? 0.2 : latch], kwin: { lit: 0.6 }, lan: [1, 0.9, 0.3] });
  a4Cat(ctx, t, { x: 1120, y: 548, dir: -1, sit: 1, gaze: [-1, 0.5], tailCurl: 0.3 });
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  const freeze = tc > 80.14 && tc < 80.7;
  // the old neighbour: pushes the left leaf, SHHH!, plants herself at the left end of the row with her broom like a spear
  const OW = walk(A4_OW_X, tc), O = { y: 912, dir: tc < 82.16 ? 1 : 1, ...OW, lid: abLid(t, 201), tip: freeze ? 0.04 : idleSway(tc, 202, 0.02, 2.2), gaze: [1, 0], mouth: 'closed', handL: [40, -140], handR: [44, -150] };
  if (tc < 80.1) { O.handLW = [665, 760]; O.handRW = [670, 730]; O.tip = 0.08; }
  if (tc > 80.3 && tc < 81.3) { O.handR = PERSON_HANDS.hush.R; O.brow = 0.9; O.gaze = [1, 0]; }
  if (tc > 80.72 && tc < 81.3) O.gaze = [1, 0.2];
  if (tc > 82.9) { O.handR = [30, -200]; O.handL = [24, -110]; O.brow = 0.7; O.tip = -0.02; O.gaze = tc > 83.6 && tc < 84.3 ? [1, 0] : [1, 0.1]; }
  if (tc > 87.6) { O.gaze = [-1, 0]; O.look = -0.7 * beatIn(tc, 87.95, 88.15); }
  neighbourNight(ctx, t, O, A4_N, { broom: tc > 82.9 ? 0 : 12, lift: tc > 82.9 ? 0.6 : 0, shc: A4_NSH });
  // the baker: pushes the right leaf, tiptoes to the back gate, the practice swing, the sneeze
  const BW = walk(A4_BK_X, tc, { stride: 14 }), B = { y: 918, dir: tc < 81.9 ? -1 : 1, ...BW, lid: abLid(t, 211), tip: freeze ? -0.03 : idleSway(tc, 212, 0.02, 2.6), sq: breathe(tc, 213, 0.015), gaze: [-1, 0], mouth: 'closed', handL: [40, -140], handR: [44, -150] };
  let pinRot = null;
  if (tc < 80.1) { B.handLW = [800, 760]; B.handRW = [795, 730]; B.tip = -0.08; B.lid = tc > 79.2 && tc < 79.6 ? 0.8 : 0.2; }
  if (freeze) { B.eyes = 'wide'; }
  if (tc > 81.9 && tc < 83.1) { B.tip = 0.06; B.handL = [-50, -150]; B.handR = [50, -150]; B.amp = Math.min(1, BW.amp * 1.4); }
  if (tc > 83.1 && tc < 83.26) { B.handRW = [1630, 770]; }
  if (tc > 83.26 && tc < 84.3) { const sw = tc < 83.8 ? Math.sin((tc - 83.26) * 12) : 0; pinRot = -0.6 + sw; B.handR = [50 + 30 * sw, -160]; if (tc > 83.8) { B.gaze = [-1, 0]; B.look = -0.5; B.mouth = 'frown'; B.sq *= 1 - 0.03 * pulse(tc, 84.0, 0.25); B.handR = [30, -120]; } }
  if (tc > 84.42 && tc < 85.62) { const st = Math.min(2, Math.floor((tc - 84.42) / 0.4)); B.sq *= [1.03, 1.06, 1.1][st]; B.tip = -0.04 * st; B.lid = [0.3, 0.6, 1][st]; B.mouth = 'o'; B.handR = [20, -120]; }
  if (tc > 85.62 && tc < 86.3) { B.sq *= K.lerp(1.1, 0.95, beatIn(tc, 85.62, 85.8)); B.wet = 1; B.mouth = 'closed'; B.lid = 0.3; }
  if (tc > 86.78 && tc < 87.5) { B.mouth = 'smile'; }
  if (tc > 87.6) { B.gaze = [-1, 0]; B.look = -0.7 * beatIn(tc, 88.05, 88.25); }
  baker(ctx, t, B, A4_N, { pin: tc > 82.9, pinRot: pinRot ?? -0.6, shc: A4_NSH });
  // Morgiana: fingertips on the gate, the bar, the dart to the baker, flat palms, tiptoes off
  const MW = walk(A4_M11_X, tc, { stride: 18 }), M = { y: 926, dir: tc < 86.78 ? 1 : -1, ...MW, lid: abLid(t, 221), tip: freeze ? 0.02 : idleSway(tc, 222, 0.02, 2.4), sq: breathe(tc, 223, 0.015), gaze: [1, -0.1], mouth: 'closed', handL: [40, -150], handR: [46, -150] };
  if (tc < 80.1) { M.handLW = [725, 720]; M.handRW = [740, 730]; M.gaze = [-1, -0.2]; }
  if (freeze) { M.eyes = 'wide'; M.gaze = [1, 0]; }
  if (tc > 80.72 && tc < 81.3) M.gaze = [1, 0.1];
  if (tc > 81.34 && tc < 82.1) { M.handLW = [700, 760 - 50 * (1 - beatIn(tc, 81.34, 81.8))]; M.handRW = [760, 760 - 50 * (1 - beatIn(tc, 81.34, 81.8))]; M.gaze = [0, 1]; if (tc > 81.85) { M.handRW = [770, 762]; M.handLW = null; M.handL = [-20, -110]; } }
  if (tc > 82.1 && tc < 84.4) { M.gaze = [1, 0]; M.handL = [-20, -110]; M.handR = [20, -112]; }
  if (tc > 84.4 && tc < 85.55) { M.tip = 0.1; M.handL = [-40, -140]; M.handR = [60, -150]; }
  if (tc > 85.55 && tc < 86.3) { M.handRW = [1495, 742]; M.gaze = [1, -0.4]; M.brow = 0.4; }
  if (tc > 86.78 && tc < 87.5) { M.handL = PERSON_HANDS.palmsUp.L; M.handR = PERSON_HANDS.palmsUp.R; M.handL = [-70, -140]; M.handR = [70, -140]; M.mouth = 'smile'; M.dir = 1; }
  morgiana(ctx, t, M, A4_N, { kick: freeze ? 0 : 0.2 * MW.amp, shc: A4_NSH });
  cyFig(ctx, t, A4_N);
}
function a4S11Over(ctx, t, cam, S) {
  const tc = AB_T2(t);
  if (t > 80.25 && t < 81.6) { const [x, y] = abP(680, 690, cam); a4Say(ctx, S, [[80.3, 'SHHH!']], t, x + 80, y - 200, [x + 10, y - 30], { size: 46, gone: 81.3 }); }
  if (t > 82.2 && t < 83.6) { const [x1, y1] = abP(830, 690, cam), [x2, y2] = abP(1520, 680, cam); a4Streak(ctx, S, [x1 + 40, y1 - 200], [x1, y1 - 30], t, 82.2, 83.2); a4Streak(ctx, S, [x2 - 40, y2 - 200], [x2, y2 - 30], t, 82.5, 83.2); }
  if (t > 85.6 && t < 87.6) a2Inset(ctx, t, [40, 90, 340, 400], K.clamp((t - 85.6) / 0.15) * (1 - K.clamp((t - 87.4) / 0.15)), (c) => { abGrad(c, 40, 90, 340, 400, [[0, '#4a4a7a'], [1, '#6a5a8a']]);   // v2 (note 10): a third of the panel, held
    oilJar(c, 210, 470, 2.3, { cut: { open: 1, draw: (cc) => jarMan(cc, t, 3, { pose: 'sleep', bubble: true }) }, t }); });
}
AB_SHOTS.push({ a: 78.4, b: 88.4, ww: 2200, cam: a3Cam([[78.4, { x: 760, y: 615, zoom: 1 }], [81.9, { x: 765, y: 615, zoom: 1 }], [83.2, { x: 1180, y: 615, zoom: 1 }], [84.4, { x: 1185, y: 615, zoom: 1 }], [86.2, { x: 1480, y: 670, zoom: 1.2 }], [86.3, { x: 1180, y: 615, zoom: 1 }], [88.4, { x: 1170, y: 615, zoom: 1 }]]), world: a4S11World, over: a4S11Over });

// ---------- S12 88.4-96.3: the guards file in (accordion bump), the mime briefing, GATE 1 GATE 2, crossed spears, the ring of light ----------
const A4_CAPT_X = (u) => kfn(u, [[89.24, 740], [89.96, 960]]);
const A4_POST = [[650, 92.5, 1], [815, 92.4, -1], [1530, 92.5, -1], [1650, 92.6, -1]];   // guard posts: x, arrival, facing
function a4GuardsAt(t) {   // the five in S12 (captain index 3; guards 0, 1, 2, 4): returns [{k, P, o}]
  const tc = AB_T2(t), out = [], file = [3, 0, 1, 2, 4];
  file.forEach((k, j) => { if (tc < 89.24 + 0.15 * j) return; const C = sneakChain(A4_CAPT_X, j, tc, { gap: 110, delay: 0.15, stride: 15, stop: 89.96 }), P = { y: 912, dir: 1, ...C, lid: abLid(t, 230 + j), gaze: [1, 0], mouth: 'closed' };
    if (P.x < 735) return; const o = { spear: 'up', shc: A4_NSH };
    if (k === 3) { o.lantern = { open: 0 }; P.handL = [30, -130]; if (tc > 89.96) { P.amp = 0; P.gaze = [1, 0.3]; P.brow = 0.8; } if (tc > 90.56) { P.dir = -1; P.gaze = [-1, 0]; P.brow = 0.9; P.sq = 1 + 0.03 * pulse(tc, 90.9, 0.3); }
      if (tc > 91.2 && tc < 91.8) { P.handR = tc < 91.5 ? [-70, -170] : [70, -170]; } if (tc > 91.8) { const x0 = 960, ux = kfn(tc, [[91.8, x0], [92.6, 1540]]); P.x = ux; Object.assign(P, walk((u) => kfn(u, [[91.8, x0], [92.6, 1540]]), tc, { stride: 15 })); P.dir = 1; } }
    else { if (j === 4 && tc > 90.0 + 0.35 * 3 * 0.6 && tc < 90.5) o.helmetSlip = 1; if (j === 4 && tc > 90.4 && tc < 90.55) P.handR = [10, -200];
      if (tc > 91.8) { const post = A4_POST[[0, 1, 2, 4].indexOf(k)], x0 = A4_CAPT_X(tc - 0.15 * j) - 110 * j, xf = (u) => (u < 91.8 + 0.08 * j ? x0 : K.lerp(x0, post[0], K.ease.inOut(K.clamp((u - 91.8 - 0.08 * j) / (post[1] - 91.8)))));
        Object.assign(P, walk(xf, tc, { stride: k === 1 ? 9 : 16 })); P.dir = post[0] > x0 ? 1 : -1; if (tc > post[1]) { P.dir = post[2]; P.amp = 0; } }
      if (tc > 94.0) { o.spear = 0.42 * (([0, 2].includes(k)) ? 1 : -1); P.sq = 1 - 0.03 * beatIn(tc, 94.0, 94.15); o.glint = K.clamp((t - 94.1) / 0.4); } }
    out.push({ k, P, o }); });
  return out;
}
function a4S12World(ctx, t, cam) {
  const tc = AB_T2(t), gate = kfn(tc, [[88.6, 0], [88.9, 0.3], [89.2, 0.8], [90.9, 0.8], [91.4, 0]]), bar = tc < 88.6 ? 1 : tc < 91.4 ? 0.3 : beatIn(tc, 91.4, 91.7) * 0.7 + 0.3;
  a4Yard(ctx, t, cam, { moon: A4_MOON.late, gate: { open: gate, bar, wrap: true, inside: tc > 88.6 && tc < 89.3 ? (c) => { apprentice(c, t, { x: 735, y: 880, dir: 1, eyes: 'wide', mouth: 'smile' }, A4_N, { noCap: true, shadow: false }); celShade(c, [[700, 640], [740, 600], [780, 640]], '#e8c050', '#b08a20', { off: 4, lw: 2.5 }); } : null }, back: [0, 1], kwin: { lit: 0.6 }, lan: [1, 0.9, 0.3] });
  a4Cat(ctx, t, { x: 1120, y: 548, dir: -1, sit: 1, gaze: [-1, 0.5] });
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  // neighbours at their posts; the boy with his frying pan
  neighbourNight(ctx, t, { x: 830, y: 912, dir: 1, lid: abLid(t, 241), tip: idleSway(tc, 242, 0.02, 2.2), gaze: tc > 89.3 && tc < 91 ? [-1, 0] : [1, 0], handR: [30, -200], handL: [24, -110] }, A4_N, { broom: 0, lift: 0.6, shc: A4_NSH });
  baker(ctx, t, { x: 1470, y: 925, dir: -1, lid: abLid(t, 251), tip: idleSway(tc, 252, 0.02, 2.6), sq: breathe(tc, 253, 0.015), gaze: tc > 89.3 && tc < 91 ? [-1, 0] : [-1, 0.2], mouth: tc > 89.5 && tc < 90.6 ? 'o' : 'closed', handL: [-30, -100], handR: [30, -150] }, A4_N, { pin: true, shc: A4_NSH });
  if (tc > 89.3) { const yx = kfn(tc, [[89.3, 740], [90.2, 760], [95.46, 760], [96.0, 900]]), Y = { x: yx, y: 935, dir: 1, ...walk((u) => kfn(u, [[89.3, 740], [90.2, 760], [95.46, 760], [96.0, 900]]), tc, { stride: 14 }), lid: abLid(t, 261), gaze: [1, 0], mouth: 'smile', handL: [40, -150], handR: [24, -110] };
    apprentice(ctx, t, Y, A4_N, { noCap: true, pan: tc > 95.46, panHand: 0, panRot: -1.6, shc: A4_NSH }); }
  // Morgiana: raises the bar, then briefs the captain in mime
  const M = { x: kfn(tc, [[88.4, 700], [89.3, 700], [89.6, 880], [90.4, 890]]), y: 928, dir: tc < 89.4 ? -1 : 1, lid: abLid(t, 271), tip: idleSway(tc, 272, 0.02, 2.4), sq: breathe(tc, 273, 0.015), gaze: [1, 0], mouth: 'closed', handL: [-20, -110], handR: [20, -112] };
  Object.assign(M, walk((u) => kfn(u, [[88.4, 700], [89.3, 700], [89.6, 880], [90.4, 890]]), tc, { stride: 16 }));
  if (tc < 89.2) { M.dir = 1; M.handLW = [690, 776]; M.handRW = [760, 776]; M.gaze = [0, 0.5]; }
  if (tc > 90.56 && tc < 91.7) { const n = Math.floor((tc - 90.56) / 0.28); M.handR = n % 2 ? [90, -140] : [60, -180]; M.handL = n > 2 ? [-60, -170] : [-20, -110]; M.gaze = [1, 0]; M.talk = 0; }
  if (tc > 91.7) { M.gaze = [1, 0.2]; M.handL = PERSON_HANDS.folded.L; M.handR = PERSON_HANDS.folded.R; }
  morgiana(ctx, t, M, A4_N, { shc: A4_NSH });
  for (const g of abByY(a4GuardsAt(t).map((g) => ({ ...g, y: g.P.y })))) guard(ctx, t, g.k, g.P, A4_N, g.o);
  // the ring of light round the walls closing with a lock
  if (t > 95.46 && t < 96.3) { const u = K.clamp((t - 95.46) / 0.7), pts = [[650, 600], [650, 548], [1800, 548], [1800, 600]], L = K.trim(pts, u); ctx.save(); ctx.setLineDash([14, 12]); ctx.strokeStyle = '#7fe3ff'; ctx.shadowColor = '#7fe3ff'; ctx.shadowBlur = 12; ctx.lineWidth = 6; ctx.beginPath(); K.poly(ctx, L); ctx.stroke(); ctx.restore(); if (u >= 1) a4Glyph(ctx, 'lock', 1225, 520, 1.2, K.clamp((t - 96.0) / 0.15)); }
  cyFig(ctx, t, A4_N);
}
function a4S12Over(ctx, t, cam, S) {
  if (t > 92.54 && t < 95.7) { const k = 1 - K.clamp((t - 95.4) / 0.3); for (const [wx, txt, d] of [[730, 'GATE 1', 0], [1590, 'GATE 2', 0.12]]) { const [x, y] = abP(wx, 560, cam); ctx.save(); ctx.globalAlpha *= k; S.label(ctx, txt, K.clamp(x, 130, 870), y - 40, K.clamp((t - 92.54 - d) / 0.3), { size: 44 }); ctx.restore(); a4Streak(ctx, S, [x, y - 10], [x, y + 90], t, 92.6 + d, 95.2); } }
}
AB_SHOTS.push({ a: 88.4, b: 96.3, ww: 2200, cam: a3Cam([[88.4, { x: 780, y: 615, zoom: 1 }], [90.6, { x: 790, y: 615, zoom: 1 }], [92.5, { x: 1160, y: 615, zoom: 1 }], [96.3, { x: 1170, y: 618, zoom: 1.01 }]]), world: a4S12World, over: a4S12Over });
