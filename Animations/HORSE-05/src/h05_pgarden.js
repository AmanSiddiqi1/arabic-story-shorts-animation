// ===== HORSE-05: S18 her first flight in his palace garden, golden hour (136.48 - 142.06). World units on the HORSE-01 garden
// (EH_GARDEN, strip 2000, ground 900) with a golden-hour sky painted for this episode (the day plate of the set is never tinted).
function h5PgSky() { return ehBakeAt('h5pgsky', 2000, 2050, (c, w, h) => { ehGrad(c, 0, 0, w, h, [[0, '#4a7ad8'], [0.35, '#7aa0e8'], [0.6, '#ffd8a8'], [0.76, '#ffe6b0'], [1, '#ffe6b0']]);
  ehGlaze(c, 1650, 760, 560, '#ffe0a0', 0.6); ehGlaze(c, 1650, 760, 140, '#fff6e0', 0.8);
  for (const [x, y, s] of [[300, 380, 1.3], [900, 260, 1.0], [1400, 480, 0.8], [600, 620, 0.7]]) ehCloud(c, x, y, 420 * s, 110 * s, '#fff6ea', '#ffc890', 8, x); }, 0.5); }
function h5PgGarden(ctx, t, cam) { const pr = (r) => [(cam.x - 1000) * (1 - r), (cam.y - 300) * (1 - r)];
  ctx.drawImage(h5PgSky(), 0, -820, 2000, 2050); { const [dx, dy] = pr(0.75); ctx.drawImage(ehGardenFarPlate(), -300 + dx, 300 + dy * 0.5); }
  ctx.drawImage(ehPalacePlate(), 640, -240); ehGardenLive(ctx, t, {}); ctx.drawImage(ehGardenGroundPlate(), 0, 380);
  // long soft golden-hour shadows on the court (painted with the set, never over the cast)
  ctx.save(); ctx.globalAlpha = 0.16; ctx.fillStyle = '#7a4a6a'; for (const x of EH_GARDEN.cypress) { ctx.beginPath(); ctx.moveTo(x - 30, 900); ctx.lineTo(x - 420, 950); ctx.lineTo(x - 400, 980); ctx.lineTo(x + 30, 905); ctx.closePath(); ctx.fill(); } ctx.restore(); }
const H5_PGCAM = [[136.48, { x: 1180, y: h5GY(1.05, 1040), zoom: 1.05 }], [138.2, { x: 1190, y: h5GY(1.05, 1040), zoom: 1.05 }], [139.0, { x: 1250, y: h5GY(0.85, 1120), zoom: 0.85 }],
  [139.7, { x: 1170, y: h5GY(1.0, 1060), zoom: 1.0 }], [140.9, { x: 1170, y: h5GY(1.0, 1060), zoom: 1.0 }], [142.06, { x: 1170, y: h5GY(0.9, 1160), zoom: 0.9 }]];
function h5PgCam(t) { return h5Cam(H5_PGCAM, t, EH_GARDEN.w, EH_GARDEN.top, 1230); }
const H5_PGX = H5_F([[138.26, 1020], [138.9, 1030], [139.3, 1480], [139.47, 1480], [139.68, 1120], [140.92, 1120], [142.1, 1200]]);
const H5_PGL = H5_F([[138.26, 0], [138.9, 230], [139.3, 330], [139.47, 330], [139.68, 50], [140.92, 50], [142.1, 330]]);
function h5PgHorse(t) { const tc = EH_T2(t); if (t < 138.26) return { x: 1020, y: 900, s: H5_HS, dir: 1, lift: 0 };
  const l = H5_PGL(tc), wob = t < 138.9 ? 1 : 0.35, bob = (t < 138.9 ? 14 : 6) * Math.sin(tc * 7), roll = t < 138.9 ? 0.1 * Math.sin(tc * 9) : 0;
  let dir = 1; if (t >= 139.3 && t < 139.47) dir = [1, 0.45, -0.45, -1][Math.min(3, Math.floor((tc - 139.3) / (1 / 24)))]; else if (t >= 139.47) dir = -1;
  return { x: H5_PGX(tc), y: 900 - l + bob * wob, s: H5_HS, dir, rot: roll, lift: l }; }
function h5PgWorld(ctx, t, cam) {
  const tc = EH_T2(t), H = h5PgHorse(t); h5PgGarden(ctx, t, cam);
  h5Doves(ctx, t, [[141.5, 1300, 700, 1, 160], [141.6, 1400, 720, -1, 170], [141.7, 900, 740, 1, 150]]);
  const items = [];
  // the king on his throne; laughs at 141.5
  { const sd = 13, P = { x: EH_GARDEN.throne.x, y: EH_GARDEN.throne.sitY, s: EH_KING.s, dir: -1, sit: 1, seat: 'bench', lid: ehLid(t, sd), mouth: 'smile', gaze: lookAt([1760, 640], [H.x, H.y - 200]), handL: [-20, -60], handR: [30, -70], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.3) };
    if (t >= 138.26 && t < 139.0) { P.handL = [-10, -196]; P.handR = [10, -198]; P.gaze = [0, 1]; } if (t >= 138.7 && t < 139.0) P.handR = [40, -180];
    if (t >= 141.5) { P.handL = [-30, -80]; P.handR = [30, -80]; P.mouth = 'open'; P.lid = 0.6; P.tip = -0.06 + 0.04 * Math.sin(tc * 14); }
    items.push([840, () => h5Fig(ctx, EH_KING, P, t)]); }
  // the household of five, ducking in a ripple (138.26) and waving (141.5)
  [[1370, 0], [1430, 1], [1490, 3], [1550, 4], [1610, 2]].forEach(([x, ci], i) => { const D = EH_GUESTS[ci], sd = 540 + i, P = { x, y: 892 + (i % 2) * 8, s: D.s || 1, dir: -1, lid: ehLid(t, sd), mouth: 'smile', gaze: lookAt([x, 700], [H.x, H.y - 200]), handL: [-24, -100], handR: [26, -100], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.025, 2.7 + i * 0.2) };
    if (t >= 138.26 + stagger(i, 0.08) && t < 139.6) { P.drop = 30 * pulse(tc, 138.26 + stagger(i, 0.08), 0.9); P.handL = [-10, -190]; P.mouth = 'o'; }
    if (t >= 141.5) { P.handR = [26, -200 + 30 * Math.sin(tc * 9 + i)]; P.mouth = 'open'; }
    items.push([P.y, () => h5Fig(ctx, D, P, t)]); });
  // the child runs below with arms out like wings (138.9 - 139.7)
  { const cx = t < 138.9 ? 1330 : K.lerp(1330, 1560, ehE(t, 138.9, 0.5)) - K.lerp(0, 380, ehE(t, 139.4, 0.6)), P = { x: cx, y: 925, s: 1, child: true, ph: cx / 14, amp: t > 138.9 && t < 140.1 ? 1 : 0, dir: t < 139.4 ? 1 : -1, lid: ehLid(t, 441), mouth: 'smile', gaze: [0.6, -0.8], handL: [-80, -130], handR: [80, -130], sq: 1, tip: 0 };
    if (t < 138.9 || t > 140.1) { P.handL = [-20, -100]; P.handR = [20, -100]; } items.push([925, () => h5Fig(ctx, EH_CHILD, P, t)]); }
  // Firuz on the ground: the teacher; runs under her with arms out; vaults on (139.68 - 140.0)
  if (t < 140.0) { const sd = 3, x = t < 138.26 ? 1265 : t < 139.0 ? K.lerp(1265, 1330, ehE(t, 138.3, 0.6)) : K.lerp(1330, 1200, ehE(t, 139.0, 0.6)), P = { x, y: 935, s: EH_FIRUZ.s, dir: -1, lid: ehLid(t, sd, [137.3]), mouth: 'smile', gaze: [-1, 0.1], handL: [-30, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 2.6), ph: x / 20, amp: t > 138.3 && t < 139.6 ? 1 : 0 };
    const look = (w) => lookAt(ehHeadOf(P), w);
    if (t < 137.3) { P.handRW = [ehHorsePt(H, EH_EBG.knob)[0] + 30, ehHorsePt(H, EH_EBG.knob)[1] + 10]; P.gaze = look(ehHorsePt(H, [0, -320])); P.talk = ehTalk(t, 136.5, 137.2, 3, 0.5); }
    else if (t < 138.26) P.gaze = look(ehHorsePt(H, [0, -320]));
    else if (t < 139.68) { P.handL = [-70, -170]; P.handR = [70, -170]; P.gaze = look([H.x, H.y - 200]); P.mouth = 'o'; P.dir = H.x > x ? 1 : -1; }
    else { P.sq = anticipate(tc, 139.68, 0.12, 0.1); const u = ehE(tc, 139.8, 0.2); P.x = K.lerp(x, H.x + 50, u); P.lift = 150 * Math.sin(Math.PI * u * 0.5); P.handL = [-40, -200]; P.handR = [40, -210]; P.amp = 0; }
    items.push([935, () => h5Fig(ctx, EH_FIRUZ, P, t, { cape: true, swing: 0.3 * Math.sin(tc * 3), crown: { on: 1 } })]); }
  // the horse with the princess alone, then the pair
  items.push([900, () => { h5Shadow(ctx, H.x, 900, 260 * H.s, H.lift); if (t >= 138.26 && t < 139.0) dustBurst(ctx, H.x, 900, t - 138.26, 10, 8, 18, 140, 0.8, 9);
    const ps = h5PsF(H), PF = { lid: ehLid(t, 11), mouth: 'closed', brow: 0.4, gaze: [1, 0.2], handL: h5Loc(H, ps, EH_EBG.mane[5], EH_SEAT2.front), handR: [40, -112], lurch: idleSway(tc, 31, 0.015, 2.2) };
    if (t < 137.3) { PF.gaze = [1, 0.4]; PF.lid = 0.3; }
    else if (t < 138.26) { PF.handR = h5Loc(H, ps, EH_EBG.knob, EH_SEAT2.front); PF.gaze = [0.6, 0.8]; PF.sq = anticipate(tc, 137.3, 0.3, 0.04); }
    else if (t < 138.9) { PF.eyes = 'wide'; PF.mouth = 'grit'; PF.lurch = 0.1 * Math.sin(tc * 9); }
    else if (t < 140.38) { PF.mouth = 'smile'; PF.brow = 0; PF.gaze = [1, 0.1]; }
    else { PF.mouth = 'open'; PF.lid = 1; PF.bob = 4 * Math.abs(Math.sin(tc * 14)); }
    if (t >= 140.92) { PF.lid = ehLid(t, 11); PF.mouth = 'smile'; }
    const PR = t >= 140.0 ? { lid: t >= 140.38 && t < 140.92 ? 1 : ehLid(t, 3), mouth: t >= 140.38 ? 'open' : 'smile', gaze: [1, 0.2], handL: [50, -110], handR: [60, -112], sq: landSquash(tc, 140.0, 0.12), lurch: idleSway(tc, 37, 0.015, 2.3), bob: t >= 140.38 && t < 140.92 ? 4 * Math.abs(Math.sin(tc * 13)) : 0 } : null;
    const air = H.lift > 0, lit = t >= 137.4 ? ehPowerOn(t, 137.4, 0.2, 0.3) : {}, HH = { ...H, lit, knob: t >= 137.4 ? Math.PI / 2 : 0 };
    const rig = (c) => { if (air) ehWindRibbons(c, HH, tc, { ang: Math.sign(H.dir) > 0 ? Math.PI : 0, len: 200 }); h5Pair(c, HH, PF, PR, t, { veil: { stream: air ? 0.6 : 0 }, cape: { stream: air ? 0.6 : 0 } }); };
    if (air) castFinish(ctx, H.x, H.y + 60 * H.s, 760 * H.s, 1000 * H.s, rig, { rim: '#ffe0a0', light: [1, -1], rimW: 2.5 }); else rig(ctx); }]);
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  ehGardenFront(ctx, t);
}
function h5PgOver(ctx, t, cam, S) { const H = h5PgHorse(t);
  if (t >= 140.38 && t < 140.92) { const hd = h5RiderHeads(H, {}, {}); h5Word(ctx, S, 'HA HA!', ...h5P(hd.f[0], hd.f[1] - 170, cam), t, 140.38, 140.95, { size: 66 }); }
  if (t >= 140.92) { const hd = h5RiderHeads(H, {}, {}), f = h5P(...hd.f, cam), r = h5P(...hd.r, cam); h5Say(ctx, S, [[140.92, 'NOW WE HAVE\nTWO PILOTS!']], t, [(f[0] + r[0]) / 2, Math.min(f[1], r[1])], { size: 46, up: 190, tails: [[f[0], f[1] - 40], [r[0], r[1] - 40]] }); }
}
