// ===== ALI-03 shots S11-S13 (86.3 - 111.3 s): the second spy is sent (glade), the red dot, Morgiana laughs and dots every door =====

// ---------- S11 86.3-93.5: morning glade; spy 1 in disgrace; the keen short man; the picture balloon; the paint pot; the practice dot ----------
const A3_S11_S2X = a3Pos([[92.5, 1790], [93.5, 1250]], 'in');
function a3S11World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'morning';
  abFlock(ctx, t - 86.3, 1150, 280, 130, 4, 11, 0.4);
  a3GladeBack(ctx, t, cam);
  // spy 1 on a stone, his back to the others, the chalk stub
  abStone(ctx, 1400, 908, 36, '#c8bcc8', '#8a7e9a');
  const S1 = { x: 1400, y: 900, dir: -1, sit: 1, seat: 'bench', drop: 14, gaze: [-0.4, 0.8], lid: Math.max(0.45, abLid(t, 301)), tip: 0.08 + idleSway(tc, 302, 0.015, 3.4), handR: [40, -112 + 3 * osc(tc, 0.6)], handL: [30, -108], mouth: 'frown' };
  spyDisguise(ctx, t, 1, S1, m, { shc: A3_SH, chalk: tc < 87.5, dot: tc > 93.05 ? K.clamp((tc - 93.05) / 0.15) : 0 });
  if (tc >= 87.5) { const fy = Math.min(905, 845 + 900 * Math.pow(Math.max(0, tc - 87.5), 2) * 2); seg(ctx, 1365, fy, 1372, fy - 12, 6, '#fffaf2', 1.5); }
  // the row: i0 (1700), the second spy i3 (1790, short), i4 (1880)
  [[0, 1700, -1], [4, 1880, 1]].forEach(([i, x, sd], k) => { const lean = sd * 0.08 * beatIn(tc, 88.7 + 0.1 * k, 88.95 + 0.1 * k) * (1 - beatIn(tc, 89.6, 90.0)), laugh = tc > 93.1 ? 0.03 * Math.abs(Math.sin(tc * 20 + k)) : 0;
    a2Man(ctx, i, { x, y: 900, dir: -1, tip: lean + idleSway(tc, 310 + k, 0.025, 2.4), sq: breathe(tc, 312 + k, 0.016) * (1 + laugh), lid: abLid(t, 314 + k), gaze: tc > 92.7 ? [-1, 0.2] : [-1, 0], mouth: tc > 93.1 ? 'smile' : 'closed', handL: tc > 93.1 ? [10, -170] : undefined }, m, { t, shc: A3_SH }); });
  const hop = beatIn(tc, 89.35, 89.75), sy = tc < 89.35 ? 900 : 930, lift = tc > 89.35 && tc < 89.75 ? 40 * Math.sin(Math.PI * hop) : 0, s2x = tc < 92.5 ? 1790 : A3_S11_S2X(tc);
  const S2 = { x: s2x, y: K.lerp(900, 930, hop) - lift, dir: -1, lid: abLid(t, 321), tip: idleSway(tc, 322, 0.03, 1.8), sq: breathe(tc, 323, 0.02) * landSquash(tc, 89.75, 0.18), gaze: [-1, 0], mouth: 'smile' };
  const o2 = { d: tc < 90.3 ? 0 : tc < 90.45 ? 1 : 2, gy: tc < 89.35 ? 900 : 930, lift, shc: A3_SH, slip: tc < 90.45 ? 0 : 1 - 0.7 * beatIn(tc, 90.55, 90.8), kick: swing(t, 89.75, 0.4) };
  if (tc > 89.75 && tc < 90.25) S2.handR = [30, -206];
  if (tc > 90.25 && tc < 90.5) { S2.handR = [12, -214]; S2.handL = [-12, -214]; }
  if (tc > 90.5 && tc < 90.85) S2.handR = [10, -222];
  if (tc > 91.9) { o2.pot = 1; o2.brush = tc < 92.95 ? 'hand' : 'hand'; o2.potSwing = swing(t, 92.05, 0.5, 1.8, 2) + (tc > 92.5 ? 0.2 * osc(tc, 0.5) : 0); S2.handR = [40, -150]; }
  if (tc > 92.5) { Object.assign(S2, walk(A3_S11_S2X, tc, { stride: 20 })); S2.y = 930; S2.handL = [-30, -100]; }
  if (tc > 92.9 && tc < 93.15) { const [hx, hy] = a2HeadPt(S1, 30, -40, { s: 0.98, age: 0.35 }); S2.handRW = [hx + 10, hy]; S2.handR = null; S2.wink = 'L'; }
  spyDisguise(ctx, t, 2, S2, m, o2);
  if (tc > 92.1 && tc < 92.6) { const u = (tc - 92.1) / 0.5, [hx, hy] = a2Hand(S2, 0, { s: 0.84, age: 0.35 }); ctx.fillStyle = '#e8202a'; ctx.beginPath(); ctx.ellipse(hx + 20 * u, hy + 10 - 60 * u + 120 * u * u, 4, 6, 0, 0, 7); ctx.fill(); }
  // the leader: turns his back on spy 1, throws the arm at the row, taps the balloon, hands over the pot
  const L = { x: 1560, y: 900, dir: 1, lid: abLid(t, 331), tip: idleSway(tc, 332, 0.02, 2.7), sq: breathe(tc, 333, 0.013), brow: 0.8, gaze: [1, 0], handL: [-10, -94], handR: [12, -96] };
  if (tc < 87.9) { L.gaze = [-1, 0.3]; L.look = -0.6; }
  else if (tc < 89.4) { L.handR = a2ArmHand(a2ArmVal(tc, 87.28)); L.sq *= anticipate(tc, 87.3, 0.45, 0.05); }
  else if (tc < 90.8) { L.handR = [40, -120]; L.gaze = [1, 0.3]; }
  else if (tc < 91.85) { L.handR = [60, -206 + 8 * pulse((tc - 91.45) % 0.15, 0, 0.1)]; L.gaze = [0, -1]; L.talk = 0; }
  else if (tc < 92.4) { L.handRW = [s2x - 50, 790]; L.gaze = [1, 0.3]; }
  else { L.gaze = [-1, 0.2]; L.look = -0.5; }
  a2Lead(ctx, t, L, m, { shc: A3_SH, kick: 0.5 * pulse(tc, 87.92, 0.5) });
}
function a3S11Over(ctx, t, cam, S) {
  if (t > 90.8 && t < 92.0) { const [hx, hy] = abP(1560, 640, cam), p = K.clamp((t - 90.8) / 0.25) * (1 - K.clamp((t - 91.8) / 0.2));
    a3PicBalloon(ctx, K.clamp(hx, 230, 770), hy - 230, 300, 170, [hx, hy - 30], p, (c) => { const bx = K.clamp(hx, 230, 770), by = hy - 230;
      doorMark(c, bx - 70, by, { kind: 'x', s: 2.2, glow: 0.3 }); if (t > 91.2) { c.save(); c.strokeStyle = '#ff3b3b'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(bx - 115, by + 40); c.lineTo(K.lerp(bx - 115, bx - 25, K.clamp((t - 91.2) / 0.15)), K.lerp(by + 40, by - 40, K.clamp((t - 91.2) / 0.15))); c.stroke(); c.restore(); }
      if (t > 91.45) doorMark(c, bx + 70, by, { kind: 'dot', s: 2.6, p: K.clamp((t - 91.45) / 0.18), age: t - 91.6, shine: 0.6 }); }); }
}

// ---------- S12 93.5-100.8: the day street again; the second spy paints the red dot; the shutters open ----------
const A3_S2X = a3Pos([[93.75, 540], [94.55, 870], [97.3, 870], [97.6, 820], [99.7, 820], [100.8, 1250]]);
const A3_DRIPS = [99.95, 100.25, 100.55];
function a3S12Spy(t) {
  const tc = AB_T2(t), W = walk(A3_S2X, tc, { stride: 20 }), P = { y: 905, dir: 1, ...W, lid: abLid(t, 341, [94.6, 94.9]), tip: idleSway(tc, 342, 0.03, 1.7) + (W.amp > 0.2 ? 0.04 * Math.sin(W.ph * 2) : 0), sq: breathe(tc, 343, 0.02), gaze: [1, 0], mouth: 'smile' };
  const o = { slip: 0.35, pot: 1, potSwing: 0.15 * osc(tc, 0.7) + (W.amp > 0.2 ? 0.25 * Math.sin(W.ph) : 0), brush: tc < 95.0 || tc > 99.4 ? 'ear' : 'hand', smear: tc > 99.4, shc: A3_SH };
  if (tc > 93.9 && tc < 94.55) { P.gaze = [0.3, -1]; P.tilt = -0.1; P.tip += 0.05 * pulse(tc, 94.15, 0.2); P.handR = tc < 94.2 ? undefined : tc < 94.38 ? [44, -205] : [100, -150]; }
  if (tc > 94.55 && tc < 95.2) { P.look = tc < 94.85 ? -1 : 1; P.tilt = tc < 94.85 ? -0.08 : 0.08; P.gaze = [P.look, 0]; if (tc > 94.95) P.handR = [10, -100]; }
  if (tc > 95.2 && tc < 95.86) { P.handR = tc < 95.55 ? [40, -150] : [-12, -150]; P.gaze = [1, -0.2]; P.wink = 'L'; P.mouth = 'o'; P.sq *= anticipate(tc, 95.55, 0.3, 0.05); }
  if (tc >= 95.86 && tc < 96.3) { P.handRW = [924 + 6 * beatIn(tc, 95.86, 95.95), 745]; P.wink = 'L'; P.mouth = 'o'; o.brushRot = 0; }
  if (tc >= 97.3 && tc < 98.1) { P.handR = [100, -172]; P.tilt = 0.12; P.wink = 'L'; }
  if (tc >= 98.1 && tc < 99.2) { P.handR = [40, -196 + 6 * pulse((tc - 98.1) % 0.4, 0, 0.15)]; P.gaze = [1, -0.3]; P.lid = Math.max(P.lid, 0.3); }
  if (tc >= 99.2 && tc < 99.7) { P.handR = [36, -200]; P.gaze = [1, 0]; }
  return { P, o };
}
function a3S12World(ctx, t, cam) {
  const tc = AB_T2(t), sh = kfn(tc, [[100.2, 0], [100.35, 0.12], [100.5, 0.12], [100.7, 1]]);
  a3Street(ctx, t, cam, { m: A3_DM, washing: { items: 4 }, flock: [400, 210, -120, 3, 13, 93.5],
    win: { sh, inside: tc > 100.25 ? (c) => morgianaWindow(c, t, { x: 1095, gaze: [1, 0.6], handLW: [1050, 552], handRW: [1135, 552], lid: abLid(t, 351) }, 'morning') : null } });
  a3Cat(ctx, t, { x: 1000, y: 242, dir: -1, sit: 1, lid: 1, tailCurl: 1 });
  const D = { x: 1290, y: 905, s: 0.82, dir: -1, pal: 0, chew: tc > 95.2 && tc < 96.0 ? 0 : Math.abs(Math.sin(tc * 6)), earL: tc > 94.4 ? -0.8 : 0.4 + idleSway(tc, 101, 0.3, 1.6), earR: tc > 94.4 ? -0.7 : 0.3, tailSwish: osc(tc, 1.6), lid: tc > 95.2 && tc < 96.5 ? 0.3 : abLid(t, 103), snort: tc > 95.4 && tc < 95.9 ? Math.sin(Math.PI * beatIn(tc, 95.4, 95.9)) : 0 };
  a3Shadow(ctx, 1290, 905, 230); abDonkey(ctx, D, 'morning');
  a3Neighbour(ctx, t, { x: 600, y: 905, dir: -1, lid: abLid(t, 91), tip: 0.03 + idleSway(tc, 92, 0.02, 2.6), gaze: [-0.3, 0.6], handR: [40, -110], handL: [20, -120] }, 'morning', { broom: 30 * osc(tc, 0.8) });
  for (const d of A3_DRIPS) if (t > d) { const x = A3_S2X(d) - 30; ctx.fillStyle = '#c8101a'; ctx.beginPath(); ctx.ellipse(x, 916, 7, 3, 0, 0, 7); ctx.fill(); }
  const { P, o } = a3S12Spy(t); spyDisguise(ctx, t, 2, P, 'morning', o);
  if (t > 98.1 && t < 99.25) tsRing(ctx, 930, 745, ((t - 98.1) % 0.55) / 0.55, '#ff8a7a', { r0: 18, grow: 26 });
}
function a3BrushInsert(ctx, t) {
  const tc = AB_T2(t); a3WoodBg(ctx, '#8a5a3a');
  doorMark(ctx, 500, 600, { kind: 'dot', s: 8, shine: K.clamp((t - 96.5) / 0.7), drip: K.clamp((t - 96.8) / 0.4) });
  const up = K.ease.out(beatIn(tc, 96.55, 97.15)), bx = 560 + 120 * up, by = 560 - 260 * up;
  ctx.save(); ctx.strokeStyle = '#c8101a'; ctx.lineWidth = 6 * (1 - up); ctx.beginPath(); ctx.moveTo(520, 590); ctx.quadraticCurveTo(560, 600 - 100 * up, bx - 30, by + 200); ctx.stroke(); ctx.restore();
  a3BigHand(ctx, bx, by, 1.35, { sleeve: '#66b474', sleeveD: '#3f8a4e', curl: 0.6, brush: true, rot: 3.6 });
}
AB_SHOTS.push({ a: 86.3, b: 93.5, ww: 2400, cam: a3Cam([[86.3, { x: 1650, y: 615, zoom: 1.0 }], [90.6, { x: 1665, y: 615, zoom: 1.0 }], [92.6, { x: 1600, y: 680, zoom: 1.3 }], [93.5, { x: 1590, y: 680, zoom: 1.3 }]]), under: a2GladeUnder('morning'), world: a3S11World, over: a3S11Over });
AB_SHOTS.push({ a: 93.5, b: 96.5, ww: 2000, cam: a3Cam([[93.5, { x: 930, y: 615, zoom: 1.0 }], [95.6, { x: 930, y: 615, zoom: 1.0 }], [96.4, { x: 930, y: 710, zoom: 1.45 }], [96.5, { x: 930, y: 712, zoom: 1.47 }]]), world: a3S12World });
AB_SHOTS.push({ a: 96.5, b: 97.2, panel: a3BrushInsert });
AB_SHOTS.push({ a: 97.2, b: 100.8, ww: 2000, cam: a3Cam([[97.2, { x: 960, y: 620, zoom: 1.1 }], [99.7, { x: 960, y: 620, zoom: 1.1 }], [100.8, { x: 1110, y: 620, zoom: 1.1 }]]), world: a3S12World });

// ---------- S13 100.8-111.3: Morgiana at the window (HEE HEE), then the henna dots on every door; the neighbour joins the plot ----------
const A3_M13X = a3Pos([[106.2, 930], [106.45, 880], [107.1, 880], [107.2, 720], [107.4, 720], [107.74, 430], [107.95, 430], [109.55, 1640], [109.85, 1640], [110.15, 1920]]);
const A3_M13DIR = [[106.2, -1], [107.95, 1], [109.5, -1]];
const A3_M13DOTS = [[2, 107.2, [720]], [1, 107.74, [430]], [4, 109.66, [1640]], [5, 110.22, [1920]]];
function a3S13Window(t) {
  const tc = AB_T2(t), P = { x: 1095, gaze: [-0.5, 1], lid: abLid(t, 361, [101.85]), tip: idleSway(tc, 362, 0.02, 2.2), handLW: [1050, 552], handRW: [1135, 552], mouth: 'smile' }; let dy = 0;
  if (tc > 101.2 && tc < 102.1) { P.handL = [16, -160]; P.handLW = null; P.tilt = 0.06; }
  if (tc > 102.1 && tc < 102.6) P.gaze = [1, 0.3];
  if (tc > 102.9 && tc < 104.3) { P.tilt = 0.08; P.gaze = [-0.5, 1]; }
  if (tc > 104.3 && tc < 105.2) { P.handL = [-6, -168]; P.handR = [10, -172]; P.handLW = P.handRW = null; P.eyes = 'shut'; P.sq = 1 + 0.03 * Math.abs(Math.sin(tc * 18)); }
  if (tc > 105.2 && tc < 106.0) { P.handR = [8, -170]; P.handRW = null; P.gaze = [0.6, -1]; P.wink = tc > 105.35 && tc < 105.6 ? 'R' : null; dy = 150 * K.ease.in(beatIn(tc, 105.65, 106.0)); }
  return { P: { ...P, y: TS.win.sill + 150 + dy }, shake: tc > 104.3 && tc < 105.2 ? 1 : 0 };
}
function a3S13World(ctx, t, cam) {
  const tc = AB_T2(t), W = a3S13Window(t);
  const d3 = kfn(tc, [[106.12, 0], [106.28, 0.8], [106.6, 0.8], [106.9, 0]]), d2 = kfn(tc, [[107.95, 0], [108.15, 0.75], [108.7, 0.75], [109.05, 0]]);
  const N = { x: 660, y: 900, dir: 1, s: 0.86, eyes: tc < 108.35 ? 'wide' : undefined, mouth: tc < 108.35 ? 'o' : 'smile', handR: tc > 108.45 ? [8, -170] : [30, -120], gaze: tc < 108.3 ? [0.5, -0.6] : [1, 0], lid: abLid(t, 371) };
  a3Street(ctx, t, cam, { m: A3_DM, washing: { items: 4 }, doors: [...(d3 > 0.01 ? [{ i: 3, open: d3 }] : []), ...(d2 > 0.01 ? [{ i: 2, open: d2, inside: (c) => a3Neighbour(c, t, N, 'morning', { shadow: false }) }] : [])],
    win: { sh: tc < 106.0 ? 1 : 1 - 0.7 * beatIn(tc, 105.85, 106.05), shake: W.shake, inside: tc < 106.05 ? (c) => morgianaWindow(c, t, W.P, 'morning') : null } });
  // the cat leans over the roof edge above the window (same tilt as hers)
  a3Cat(ctx, t, { x: 1100, y: 242, dir: -1, sit: tc > 102.9 && tc < 104.4 ? 0 : 1, crouch: tc > 102.9 && tc < 104.4 ? 1 : 0, gaze: [-0.3, 1], tip: tc > 102.9 && tc < 104.4 ? 0.12 : 0, lid: tc > 105.2 && tc < 105.6 ? 0.2 : abLid(t, 97) });
  const D = { x: 1290, y: 905, s: 0.82, dir: -1, pal: 0, chew: Math.abs(Math.sin(tc * 6)), earL: tc > 108.9 && tc < 109.7 ? 1 : 0.4 + idleSway(tc, 101, 0.3, 1.6), earR: 0.3 + idleSway(tc, 102, 0.3, 2.1), tailSwish: osc(tc, 1.6), lid: abLid(t, 103), neck: tc > 108.9 && tc < 109.7 ? 0.2 : 0 };
  a3Shadow(ctx, 1290, 905, 230); abDonkey(ctx, D, 'morning');
  if (tc < 106.15) return;
  let dir = -1; for (const [a, d] of A3_M13DIR) if (tc >= a) dir = d;
  const Wk = walk(A3_M13X, tc, { stride: 22 }), P = { y: 905, dir, ...Wk, lid: abLid(t, 381), tip: idleSway(tc, 382, 0.025, 2), sq: breathe(tc, 383, 0.014) * landSquash(tc, 109.55, 0.14) * landSquash(tc, 107.2, 0.1), gaze: [dir, 0], mouth: 'smile', handL: [30, -110] };
  const o = { bowl: true, stream: K.clamp(Math.abs(speed(A3_M13X, tc)) / 900), redTip: tc > 106.62 };
  if (tc < 106.3) { const u = beatIn(tc, 106.15, 106.3); ctx.save(); ctx.globalAlpha *= u; }
  if (tc > 106.5 && tc < 107.1) { P.handR = tc < 106.75 ? [34, -104] : [80, -160]; P.gaze = tc < 106.75 ? [0.3, 0.8] : [-1, -0.2]; }
  for (const [door, t0] of A3_M13DOTS) if (tc > t0 - 0.06 && tc < t0 + 0.2) { P.handRW = tsDoor(door).dot; P.handR = null; P.tip = 0.05; }
  if (o.stream > 0.3) P.tip = 0.12;
  if (tc > 108.2 && tc < 108.5) { P.handR = [8, -170]; P.wink = 'R'; P.gaze = [-1, 0]; }
  if (tc > 110.4) { P.handR = [20, -176]; P.mouth = tc < 110.7 ? 'o' : 'smile'; P.handL = [-40, -84]; P.tip = -0.04 + 0.04 * pulse(tc, 110.75, 0.25); P.gaze = [0, 0]; }
  morgiana(ctx, t, P, 'morning', o); if (tc < 106.3) ctx.restore();
  if (tc > 110.4 && tc < 110.8) { const [hx, hy] = a2Hand(P, 1, A3_MORG); a3Puff(ctx, hx + 6, hy - 12, (t - 110.4) / 0.4, 4, 5, '#ffe0e0'); }
}
function a3S13Over(ctx, t, cam, S) {
  if (t > 104.3 && t < 105.5) { const [x, y] = abP(1225, 470, cam); a2Tag(ctx, S, 'HEE HEE', x, y, t, 104.4, 105.2, { size: 44, col: '#bff6f8', rot: -0.08 }); }
  if (t > 108.6 && t < 109.35) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, alpha: 0.5, n: 26 });
}
AB_SHOTS.push({ a: 100.8, b: 106.2, ww: 2000, cam: a3Cam([[100.8, { x: 1040, y: 560, zoom: 1.4 }], [105.6, { x: 1045, y: 565, zoom: 1.4 }], [106.2, { x: 1030, y: 610, zoom: 1.35 }]]), world: a3S13World, over: a3S13Over });
AB_SHOTS.push({ a: 106.2, b: 111.3, ww: 2000, cam: a3Cam([[106.2, { x: 900, y: 615, zoom: 1.0 }], [107.1, { x: 880, y: 615, zoom: 1.0 }], [108.3, { x: 520, y: 615, zoom: 1.0 }], [108.6, { x: 520, y: 615, zoom: 1.0 }], [109.4, { x: 1500, y: 615, zoom: 1.0 }], [111.3, { x: 1500, y: 615, zoom: 1.0 }]]), world: a3S13World, over: a3S13Over });
