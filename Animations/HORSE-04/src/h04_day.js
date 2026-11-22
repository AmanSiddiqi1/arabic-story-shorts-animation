// ===== HORSE-04: the far palace from outside in clear day. S10 the disguise (75.64 - 84.32), S11 at the gate (84.32 - 94.76) =====
const H4_DCAM = [[75.64, { x: 900, y: 420, zoom: 0.62 }], [76.0, { x: 860, y: 430, zoom: 0.64 }], [76.6, { x: 330, y: h4GY(1.3), zoom: 1.3 }], [82.9, { x: 340, y: h4GY(1.3), zoom: 1.3 }],
  [84.3, { x: 470, y: h4GY(1.35), zoom: 1.35 }], [94.76, { x: 500, y: h4GY(1.35), zoom: 1.35 }]];
function h4DCam(t) { return h4Cam(H4_DCAM, t, EH_FP.w, -700, 1430); }
// Firuz: prince until he passes the palm trunk (x 330), the craftsman after it
const H4_DFX = H4_F([[75.64, 250], [78.34, 250], [78.94, 390], [79.3, 410], [82.96, 410], [84.32, 500], [94.76, 500]]);
const H4_GA = 410, H4_GB = 610;
function h4DFiruz(t) { const tc = EH_T2(t), sd = 3, x = H4_DFX(t), prince = x < 330;
  const P = { ...walk(H4_DFX, tc, { stride: prince ? 26 : 18 }), y: 930, s: EH_FIRUZ.s, dir: 1, lid: ehLid(t, sd, [76.46, 82.0, 92.58]), mouth: 'closed', brow: 0.4, gaze: [1, 0.1], handL: [-26, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 2.8) };
  const look = (w) => lookAt(ehHeadOf(P), w), o = { corner: 1, box: null, tool: null };
  if (prince) { if (t < 77.04) { P.gaze = look([520, 700]); P.handR = PERSON_HANDS.chin.R; P.lid = 0.25; }
    else if (t < 78.34) { const u = ehE(tc, 77.04, 0.35); P.handR = t < 77.5 ? [30, -230 + 40 * u] : [40, -130]; P.handL = [-30, -110]; P.gaze = t < 77.5 ? [0.2, -0.6] : [0.5, 0.8]; o.box = { open: 1, crown: t >= 77.5 ? 1 : 0 }; o.noCrown = t >= 77.3;
      if (t >= 77.75) { P.dir = -1; P.handR = [70, -120]; P.gaze = [1, 0.2]; o.capeRoll = ehE(tc, 77.75, 0.5); } }
    else { o.box = { open: 1, crown: 1 }; o.noCrown = true; o.capeRoll = 1; }
    return { P, o, prince: true }; }
  // the craftsman: stoop, squint, short steps; the box a drawing behind the arm
  P.tip = 0.07 + idleSway(tc, sd, 0.02, 2.6); P.lid = Math.max(0.3, P.lid); P.pal = {};
  if (t < 79.2) { o.box = { open: 1, crown: 1, hang: true }; P.handL = [-34, -96]; P.gaze = look([520, 700]); }
  else if (t < 80.24) { o.boxAt = [455, 930, 1]; P.gaze = look([520, 700]);
    if (t >= 79.54 && t < 79.9) { P.tip = 0.12; P.lid = 0.5; P.handL = [-40, -120 + 8 * Math.sin(tc * 20)]; P.handR = [40, -120 - 8 * Math.sin(tc * 20)]; }
    if (t >= 79.9) { const tug = ehE(tc, 79.9, 0.12); o.corner = K.clamp(1 - tug + (t > 80.08 ? ehE(tc, 80.08, 0.1) * 0.8 : 0)); P.handL = [-20, -88]; P.gaze = [0.2, 0.9]; P.brow = 0.6; } }
  else if (t < 82.96) { o.box = { open: t >= 81.22 && t < 82.1 ? ehE(tc, 81.22, 0.12) : 0, crown: t >= 82.0 ? 1 : 0, jiggle: t >= 81.22 && t < 82.1 ? Math.abs(Math.sin(tc * 20)) : 0, hang: true }; o.corner = 0.6; P.handL = [-34, -100];
    if (t >= 81.22 && t < 82.3) { P.eyes = 'wide'; P.lid = 0; P.gaze = [-0.6, 0.8]; P.mouth = 'o'; }
    if (t >= 82.0 && t < 82.6) { P.handR = [-40, -100]; P.tip = 0.12; P.gaze = gazePlan(tc, [[82.1, [-1, 0]], [82.3, [1, 0]], [82.5, [0.6, 0.2]]], 0.06); } }
  else { o.box = { open: 0, hang: true }; o.corner = 0.6; P.handL = [-34, -100]; P.gaze = look([H4_GA, 680]); }
  // S11 at the gate
  if (t >= 84.32) { P.gaze = look([H4_GB, 700]);
    const bow = flow(tc, [[84.32, 0], [84.6, 0.35], [84.8, 0.35], [84.95, 0.1], [85.1, 0.22], [85.3, 0]]); P.tip = 0.07 + bow; if (t < 85.3) { P.handR = t < 84.8 ? [90, -150] : [30, -228]; P.handL = [-34, -100]; o.capOff = t >= 84.8 && t < 85.3; }
    if (t >= 86.5 && t < 87.18) P.handR = [8, -130 + 6 * Math.abs(Math.sin(tc * 18))];
    if (t >= 87.18 && t < 87.76) P.talk = ehTalk(t, 87.18, 87.7, 7, 0.7);
    if (t >= 87.76 && t < 88.44) { P.dir = -1; const rap = Math.abs(Math.sin((tc - 87.76) * Math.PI / 0.14)); P.handRW = [462 - 6 * rap, 760]; P.tip = 0.14; P.gaze = [-1, 0.2]; P.mouth = 'smile'; }
    if (t >= 88.44 && t < 89.42) { P.dir = 1; P.handRW = [EH_FP.knocker[0] - 8, EH_FP.knocker[1] + 6]; P.gaze = look(EH_FP.knocker); }
    if (t >= 89.42 && t < 90.36) { P.dir = 1; const rub = Math.sin(tc * 16); P.handRW = [EH_FP.knocker[0] - 14 + 6 * rub, EH_FP.knocker[1] + 4]; P.gaze = look(EH_FP.knocker); P.mouth = t < 89.7 ? 'o' : 'smile'; }
    if (t >= 90.36 && t < 91.26) { o.box = { open: ehE(tc, 90.36, 0.2) * 0.35, hang: true }; P.handR = [-20, -80]; P.gaze = [-0.4, 0.9]; }
    if (t >= 91.26 && t < 92.58) { o.box = { open: 0, hang: true }; o.tool = 'hammer'; o.toolRot = t < 91.7 ? (tc - 91.26) * 14 : 0; P.handR = [50, -150]; P.gaze = look([H4_GA, 680]); P.mouth = 'smile'; P.talk = t >= 92.04 ? ehTalk(t, 92.04, 92.5, 7, 0.6) : 0; }
    if (t >= 92.58) { o.box = { open: 0, hang: true }; o.tool = t < 93.24 ? 'hammer' : null; P.gaze = look([H4_GB, 700]); }
    if (t >= 94.2) { o.corner = 0.6 * (1 - ehE(tc, 94.2, 0.3)); P.handL = [-20, -88]; P.sq *= 1 - 0.03 * pulse(tc, 94.2, 0.5); P.lid = 0.5; P.mouth = 'closed'; P.tip = 0.03; P.gaze = [0.3, 0.9]; } }
  return { P, o, prince: false }; }
function h4DGuard(t, i) { const tc = EH_T2(t), sd = 31 + i * 7, D = EH_FARGUARDS[i], x0 = i ? H4_GB : H4_GA;
  const xf = i ? H4_F([[93.24, H4_GB], [93.9, 520], [94.5, 520]]) : () => H4_GA;
  const P = { ...walk(xf, tc, { stride: 22 }), y: 898, s: D.s, dir: i ? -1 : 1, lid: ehLid(t, sd, [85.5]), sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.022, 2.9 + i * 0.4), mouth: 'closed', gaze: [i ? -1 : 1, 0.1], handL: [-26, -100], handR: [40, -110] }, o = { helmet: { tilt: 0 }, neck: true, spear: { lean: 0.03 * Math.sin(tc + i) } };
  if (t >= 83.56) { const k = ehE(tc, 83.56 + (i ? 0.2 : 0), 0.2); o.spear.lean = (i ? -0.42 : 0.42) * k; o.spear.hand = [30, -120]; }
  const F = h4DFiruz(t).P, look = (w) => lookAt(ehHeadOf(P), w);
  if (t >= 82.96) P.gaze = look(ehHeadOf(F));
  if (t >= 85.5 && t < 86.5) P.gaze = look(i ? [F.x, 900] : [F.x, 640]);
  if (t >= 86.5) o.spear.lean *= 1 - ehE(tc, 86.5, 0.4);
  if (i === 1 && t >= 89.42 && t < 90.36) { P.dir = -1; P.gaze = look(EH_FP.knocker); P.handL = [-10, -230]; o.helmet.tilt = 0.12 * Math.sin(tc * 10); P.mouth = 'smile'; }
  if (t >= 92.58 && t < 93.24) { P.gaze = look(i ? [H4_GA, 680] : [H4_GB, 700]); const sh = pulse(tc, 92.6 + (i ? 0.3 : 0), 0.35); P.handL = [-60, -140 - 30 * sh]; P.handR = [60, -140 - 30 * sh]; P.sq *= 1 + 0.03 * sh; o.spear = null; }
  if (i === 1 && t >= 93.24) { o.spear = null; P.dir = -1; P.handL = [-10, -150]; P.handR = [40, -110]; if (t > 93.9) { P.alpha = 1 - ehE(tc, 93.9, 0.4); } }
  if (i === 0 && t >= 93.24) { o.spear = { lean: -0.5 * ehE(tc, 93.24, 0.3), hand: [30, -120] }; P.gaze = look([520, 700]); }
  return [P, o, D]; }
function h4DayWorld(ctx, t, cam) {
  const tc = EH_T2(t), gateOpen = t >= 93.4 ? 0.55 * ehE(tc, 93.4, 0.3) : 0, knockRot = t >= 88.44 ? Math.PI / 2 * ehE(tc, 88.8, 0.25) : 0;
  farPalace(ctx, t, cam, { model: 'day', gate: gateOpen, knockerRot: knockRot });
  h4Doves(ctx, t, [[75.8, 600, 260, 1, 150], [80, 200, 300, 1, 120], [88, 900, 250, -1, 130]]);
  // the bay horse tied at the rail, the cape rolled into the saddlebag
  const M = { x: 160, y: 900, s: 0.8, pal: 1, dir: 1, lid: ehLid(t, 71), tailSwish: Math.sin(tc * 2), earL: 0.5 + 0.4 * Math.sin(tc * 1.1), earR: 0.7, headDown: 0.3 + 0.2 * Math.sin(tc * 0.7), chew: Math.abs(Math.sin(tc * 3)), load: [{ kind: 'sack', col: '#a8703a' }] };
  if (t >= 79.54 && t < 80.0) { M.headDown = 0; M.snort = pulse(tc, 79.6, 0.3); M.neck = 0.4; }
  const items = [[890, () => { h4Shadow(ctx, M.x, 900, 220); horse(ctx, M); seg(ctx, M.x + 120, 760, 200, 836, 3, '#8a5a3a', 0); const F = h4DFiruz(t); if (F.o.capeRoll) { const k = F.o.capeRoll; ehBlob(ctx, M.x - 40, 690, 34 * k + 4, 22 * k + 4, EH_CRIMSON, '#b0183a', { lw: 2.5 }); } }]];
  const F = h4DFiruz(t);
  items.push([F.P.y, () => { if (F.prince) { h4Fig(ctx, EH_FIRUZ, F.o.noCrown ? { ...F.P, pal: { head: 'hair' } } : F.P, t, { cape: !F.o.capeRoll || F.o.capeRoll < 0.5 }); turbanScrap(ctx, F.P.x - 14, F.P.y - 92 * F.P.s, 0.5, 0.2); saddleOrnament(ctx, F.P.x + 10, F.P.y - 84 * F.P.s, { s: 0.7, t: tc });
      if (F.o.box) { const [bx, by] = ehHandW(F.P, F.P.handL); toolbox(ctx, bx, by + 60, { s: 0.95, ...F.o.box }); }
      if (t >= 77.04 && t < 77.5) { const [cx, cy] = ehHandW(F.P, F.P.handR); shape(ctx, [[cx - 20, cy], [cx - 16, cy - 16], [cx - 8, cy - 6], [cx, cy - 20], [cx + 8, cy - 6], [cx + 16, cy - 16], [cx + 20, cy]], '#f2c040', { lw: 2, line: '#8a5a10' }); } }
    else { if (F.o.boxAt) toolbox(ctx, F.o.boxAt[0], F.o.boxAt[1], { s: 0.95, open: F.o.boxAt[2], crown: 1 });
      const P = F.o.capOff ? { ...F.P, pal: { ...EH_CRAFT.pal, head: 'hair' } } : F.P; ehCraftsman(ctx, P, t, { corner: F.o.corner, box: F.o.box, tool: F.o.tool, toolRot: F.o.toolRot || 0 });
      if (F.o.capOff) { const [hx, hy] = ehHandW(F.P, F.P.handR); ehBlob(ctx, hx, hy, 26, 12, '#d8c8a0', '#b8a880', { lw: 2.5 }); } } }]);
  for (let i = 0; i < 2; i++) { const g = h4DGuard(t, i); items.push([g[0].y, () => { ctx.save(); if (g[0].alpha != null) ctx.globalAlpha *= g[0].alpha; h4Fig(ctx, g[2], g[0], t, g[1]); ctx.restore(); }]); }
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  if (t >= 89.42 && t < 90.36) ehGlint(ctx, EH_FP.knocker[0] + 6, EH_FP.knocker[1] - 6, 30, ((t - 89.7) / 0.5));
  farPalaceFront(ctx, t);
}
function h4DayOver(ctx, t, cam, S) {
  const F = h4DFiruz(t), fh = h4Head(F.P, cam);
  if (t >= 77.2 && t < 79.4) { ctx.save(); ctx.globalAlpha *= K.clamp((79.4 - t) / 0.3); S.label(ctx, 'FIRUZ, IN DISGUISE', 560, 200, K.clamp((t - 77.2) / 0.35), { size: 46 }); S.arrow(ctx, [520, 240], [fh[0] + 30, fh[1] - 70], K.clamp((t - 77.3) / 0.4), { width: 8, bend: 0.25 }); ctx.restore(); }
  h4Say(ctx, S, [[87.18, 'I KNOW WOOD AND BRASS.']], t, fh, { gone: 88.6, size: 44, up: 200, dx: 60 });
  if (t >= 92.04 && t < 93.24) iconBalloon(ctx, Math.max(200, fh[0] - 40), Math.max(240, fh[1] - 290), 300, 210, K.clamp((t - 92.04) / 0.3) * K.clamp((93.24 - t) / 0.2), [fh[0] - 10, fh[1] - 60], (c, w, h) => {
    ehGrad(c, 0, 0, w, h, [[0, '#a8d0f8'], [1, '#ffe8c0']]); ehHorseSil(c, w / 2 - 40, h - 20, 0.5, {}); const kx = w / 2 - 40 + 88 * 0.5, ky = h - 20 - 205 * 0.5; c.lineWidth = 6; c.strokeStyle = '#e0b038'; c.beginPath(); c.arc(kx, ky, 28, 0, 7); c.stroke(); c.fillStyle = 'rgba(200,230,255,0.4)'; c.fill(); seg(c, kx + 20, ky + 20, kx + 56, ky + 56, 8, '#7a4a2a', 2); });
}
