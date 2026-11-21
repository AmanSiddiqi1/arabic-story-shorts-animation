// ===== SIND-01 shots S14-S18 (109.08 - 149.83 s): the king's hall, DAYS LATER..., the striped sail, the captain and the chests,
// the goods returned, home to Baghdad, the story told, the far whale, THE END =====

// ---------- S14 (109.08 - 114.82): the palace hall ----------
const SB_HALL = { variant: 'palace', wall: 'paper' };
const SB_S14CAM = [[109.08, { x: 500, y: 615, zoom: 1.0 }], [112.0, { x: 520, y: 640, zoom: 1.04 }], [112.6, { x: 500, y: 700, zoom: 1.2 }], [114.82, { x: 505, y: 700, zoom: 1.22 }]];
const SB_KINGX = (t) => kfn(t, [[110.12, 730], [110.6, 470], [111.9, 470], [112.3, 600]], 'inOut');
function sbHallOutside(c, t) { const sea = { hz: 600, y: [615, 650, 700, 760], amp: 4, pal: 'day' }; sbSky(c, 'day', { x: 500 }); sbSeaBack(c, t, sea, 0, 400); palmTree(c, 200, 900, { s: 0.6, t: SB_T2(t), sway: 1 }); }
// the story balloon: the green island on its sea; lift 0..1 shows the whale under it with one open eye
function sbStoryInside(c, t, lift, eye) { const sea = { hz: 600, y: [560, 620, 760, 820], amp: 6, pal: 'day' }; sbSky(c, 'day', { x: 500 }); sbSeaBack(c, t, sea, -200, 1200);
  const y = 720 - 250 * lift; if (lift < 0.05) { c.save(); c.beginPath(); c.rect(-400, 0, 2000, 762); c.clip(); }
  sbWhale(c, 500, y, { s: 0.42, dress: 1, t, lid: 1 - eye, eyeK: 1.8, gaze: [0.4, -0.5], breathe: 0.5 });
  if (lift < 0.05) c.restore(); sbSeaFront(c, t, sea, -200, 1200, { alpha: [0.5, 0.6] }); }
function sbS14World(ctx, t, cam) {
  const tc = SB_T2(t), A = palaceHall(ctx, { ...SB_HALL, outside: (c) => sbHallOutside(c, t), t, lamps: [[380, 250], [930, 250]], light: 1 });
  // banners in emerald and gold, a bowl of fruit, floor cushions
  for (const [bx, col] of [[300, '#1f9a6a'], [770, '#ffd36a']]) { celShade(ctx, [[bx - 30, 380], [bx + 30, 380], [bx + 30, 560], [bx, 530], [bx - 30, 560]], col, sbDark(col, 0.3), { light: [-1, -1], off: 8, lw: 3 }); shape(ctx, ell(bx, 440, 12, 12, 14), col === '#ffd36a' ? '#1f9a6a' : '#ffd36a', { lw: 2 }); }
  celShade(ctx, K.rectPts(240, 870, 90, 30), '#a86a3a', '#6a3a1e', { light: [-1, -1], off: 5, lw: 2.5 }); shape(ctx, ell(285, 868, 34, 10, 16), '#e8b84a', { lw: 2.5 }); for (const [fx, fc] of [[270, '#e8364f'], [292, '#ffd36a'], [306, '#7ab84a']]) sbBlob(ctx, fx, 856, 10, 10, fc, sbDark(fc, 0.3), { lw: 2, off: 3 });
  for (const [cx, col] of [[150, '#d85a7a'], [930, '#5a9ae0']]) sbBlob(ctx, cx, 888, 44, 14, col, sbDark(col, 0.3), { lw: 2.5 });
  // the guards (never in time), the vizier
  for (const [i, gx] of [[0, 150], [1, 880]]) { const G = sbAlive(t, 180 + i, { x: gx, y: 900, dir: i ? -1 : 1, gaze: [i ? -1 : 1, 0], handR: [36, -110] }); let sp = 0.05;
    if (i === 1 && t > 111.3 && t < 112.0) { G.tip -= 0.08; G.gaze = [-1, 0]; G.x -= 10; }
    if (i === 1 && t > 114.2) { sp = 0.05 + 1.2 * K.ease.in(K.clamp((t - 114.2) / 0.4)); G.eyes = 'wide'; G.mouth = 'o'; } if (i === 0 && t > 114.1) { G.eyes = 'wide'; G.mouth = 'o'; }
    sbGuard(ctx, { ...G, spear: sp }); }
  const V = sbAlive(t, 183, { x: 780, y: 900, dir: -1, gaze: [-1, 0.1], handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L });
  if (t > 111.3 && t < 112.6) { V.handR = PERSON_HANDS.chin.R; V.gaze = gazePlan(tc, [[0, [-1, -0.4]], [111.6, [-1, 0.6]], [112.0, [-1, -0.2]]]); V.brow = 0.5; V.lid = Math.max(V.lid, 0.35); }
  if (t > 114.18) { V.mouth = 'o'; V.eyes = 'wide'; V.drop = 6; }
  sbVizier(ctx, V);
  // the king: rises from the throne with open arms, comes down, a hand on Sinbad's shoulder; sits on the dais step to listen; amazed
  const kx = SB_KINGX(t), K0 = sbAlive(t, 184, { x: kx, y: t < 110.12 ? A.throne.sitY : 900, dir: -1, gaze: [-1, 0.1], mouth: 'smile' });
  if (t < 110.12) { K0.sit = 1 - K.clamp((t - 109.3) / 0.5); K0.seat = 'bench'; K0.y = K.lerp(A.throne.sitY, 860, K.clamp((t - 109.3) / 0.5)); const ar = sbF(t, [[109.3, 0], [109.8, 1], [110.12, 1]]); K0.aL = [0.2 + 1.6 * ar, 0.2 + 1.9 * ar]; K0.aR = [0.2 + 1.6 * ar, 0.2 + 1.9 * ar]; K0.y -= rebound(tc, 109.8, 6); }
  else if (t < 110.6) { Object.assign(K0, walk(SB_KINGX, tc, { stride: 22 })); K0.y = kx > 560 ? 860 : 900; }
  else if (t < 111.9) { K0.handRW = [430, 740]; K0.gaze = [-1, 0.3]; }
  else if (t < 112.3) { Object.assign(K0, walk(SB_KINGX, tc, { stride: 22 })); K0.dir = 1; }
  else { K0.sit = K.clamp((t - 112.3) / 0.3); K0.seat = 'bench'; K0.handR = PERSON_HANDS.chin.R; K0.tip += 0.1; K0.gaze = [-1, -0.3]; K0.dir = -1; }
  let crown = null;
  if (t > 113.92) { K0.eyes = 'wide'; K0.mouth = 'o'; K0.handR = PERSON_HANDS.cheeks.R; K0.handL = PERSON_HANDS.cheeks.L; K0.tip = 0; const [cx, lift] = hop(t, 113.95, 0.45, 0, 8, 46); crown = { dx: cx, dy: -lift + (t > 114.4 ? 2 : 0), rot: t > 114.4 ? 0.3 + lagged((u) => (u > 114.4 ? 0.3 : 0), tc, 0.1, 0.4) : -0.4 * Math.sin(Math.PI * (t - 113.95) / 0.45) }; }
  sbKing(ctx, { ...K0, crown });
  // Sinbad: barefoot, sea-worn, turban retied; bows; hand on chest; tells the story with big arms; mimes swimming
  const P = sbAlive(t, 11, { x: 380, y: 900, dir: 1, bare: true, gaze: [1, -0.2], mouth: 'smile', wind: 0 });
  if (t > 110.3 && t < 110.9) { const b = sbF(t, [[110.3, 0], [110.5, 1], [110.75, 1], [110.9, 0]]); P.tip += 0.35 * b; P.drop = 6 * b; P.lid = sbLid(t, 11, [110.85]); }
  if (t > 110.64 && t < 112.06) { P.handR = PERSON_HANDS.chest.R; P.gaze = [0.6, -0.6]; P.mouth = 'smile'; }
  if (t > 112.06 && t < 113.1) { const a = sbF(t, [[112.06, 0], [112.5, 1], [113.1, 1]]), lag = a + lagged((u) => flow(u, [[112.06, 0], [112.5, 1], [113.1, 1]]), tc, 0.17, 0.6); P.aL = [0.3 + 2.4 * a, 0.3 + 2.0 * lag]; P.aR = [0.3 + 2.4 * a, 0.3 + 2.0 * lag]; P.talk = sbTalk(t, 112.1, 113.1, 2); }
  if (t > 113.1 && t < 113.92) { const ph = tc * 14; P.aL = [1.2 + 1.4 * (0.5 + 0.5 * Math.sin(ph)), 1.6 + Math.sin(ph)]; P.aR = [1.2 + 1.4 * (0.5 + 0.5 * Math.sin(ph + Math.PI)), 1.6 + Math.sin(ph + Math.PI)]; P.tip += 0.12; P.mouth = 'open'; }
  if (t > 113.92) { P.gaze = [1, 0]; P.mouth = 'smile'; }
  sbSinbad(ctx, P);
}
function sbS14Over(ctx, t, cam, S) {
  if (t > 112.06 && t < 114.82) { const [hx, hy] = sbP(380, 680, cam), lift = K.clamp((t - 113.1) / 0.6);
    thoughtCloud(ctx, 400, 300, 360, 240, t, { p: K.clamp((t - 112.1) / 0.4), tail: [hx, hy], scale: 0.32, at: [500, 700], inside: (c) => sbStoryInside(c, t, lift, K.clamp((t - 113.5) / 0.3)) }); }
}
SB_SHOTS.push({ a: 109.08, b: 114.82, ww: 1000, cam: (t) => K.camAt(SB_S14CAM, t), world: sbS14World, over: sbS14Over });

// ---------- S15 - S17 (114.82 - 136.04): the king's harbour; the striped sail; the captain; the chests; home-going ----------
const SB_PSEA = { hz: 620, y: [632, 700, 945, 1030], amp: 5, pal: 'day' };
const SB_PCAM = [[114.82, { x: 700, y: 615, zoom: 1.0 }], [116.7, { x: 700, y: 615, zoom: 1.0 }], [118.4, { x: 1150, y: 640, zoom: 1.05 }], [120.5, { x: 1150, y: 640, zoom: 1.05 }],
  [120.51, { x: 1020, y: 700, zoom: 1.2 }], [122.33, { x: 1020, y: 700, zoom: 1.2 }], [122.34, { x: 1480, y: 680, zoom: 1.3 }], [124.5, { x: 1400, y: 690, zoom: 1.3 }], [125.1, { x: 1660, y: 680, zoom: 1.4 }], [126.7, { x: 1660, y: 680, zoom: 1.4 }],
  [127.5, { x: 1300, y: 640, zoom: 1.05 }], [129.43, { x: 1320, y: 640, zoom: 1.05 }], [129.44, { x: 1550, y: 680, zoom: 1.25 }], [131.2, { x: 1550, y: 680, zoom: 1.25 }], [131.21, { x: 1050, y: 615, zoom: 1.0 }], [134.95, { x: 1000, y: 615, zoom: 1.0 }], [136.04, { x: 1400, y: 615, zoom: 1.0 }]];
const SB_DHOWPX = (t) => t < 120 ? kfn(t, [[116.7, 2500], [119.78, 1660]], 'out') : t < 135 ? 1660 : 1660;
const SB_SINPX = (t) => t < 127.56 ? 980 : t < 129.43 ? kfn(t, [[127.56, 1000], [128.1, 1450], [128.4, 1470]], 'inOut') : t < 131.21 ? 1470 : 960;
const SB_GANGP = (t) => t < 119.78 ? 0 : t < 135.0 ? Math.min(1, (t - 119.95) / 0.3) : 0;
function sbS15World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_PSEA, dx = SB_DHOWPX(t), docked = t > 119.78 && t < 135.0, ds = SB_QUAY.dhowS;
  sbHarbourQuay(ctx, 'island', t, cam, sea, { sun: (c) => sbSun(c, 1500, 210, 50, '#fff6c8', '#ffe0a0', 0.7), far: (c) => sbGulls(c, t - 114, 400, 300, 30, 3, 6, 0.32) });
  // a fishing skiff tied by the quay edge
  { const f = sbFloat(1180, t, sea, 2, 90); sbSkiff(ctx, { x: 1180, y: f.y, s: 0.7, pitch: f.rot, row: 0, oar: 1 }); }
  // the dhow: glides in under a full (patched) sail, bumps, the sail furls in 5 drawings; sails out at 135
  const f = sbFloat(dx, t, sea, 2, 200), bump = t > 119.78 && t < 121 ? swing(t, 119.78, 0.03, 1.5, 3) : 0, sail = t < 119.78 ? 1 : t < 135 ? 1 - K.clamp(SB_T2(t - 119.85) / 0.42) : K.clamp(SB_T2(t - 135.0) / 0.42);
  const D = { x: dx, y: f.y - 2, s: ds, dir: -1, pitch: f.rot * 0.5 + bump, t, sail, billow: 0.6, patch: true, crew: (c) => sbOnDeck(c, ds, (q) => sbPortCrew(q, t, ds, D)) };
  sbDhow(ctx, D); if (t < 119.78) sbWake(ctx, dx, f.y, ds, -1, t, 0.6);
  // gulls ahead of the sail as it arrives
  if (t > 116.7 && t < 119) sbGulls(ctx, t - 116.7, dx - 400, 300, -180, 3, 8, 0.36);
  // the mooring rope: thrown (118.3), arcs, caught by the net boy, dropped over the bollard
  const bol = [1080, 862], bowW = sbDhowPt(D, 240, -150);
  if (t > 118.3 && t < 135.0) { const u = K.clamp((t - 118.45) / 0.6), end = u < 1 ? [K.lerp(bowW[0], bol[0] + 20, u), K.lerp(bowW[1], bol[1], u) - 140 * Math.sin(Math.PI * u)] : bol;
    ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bowW[0], bowW[1]); ctx.quadraticCurveTo((bowW[0] + end[0]) / 2, Math.max(bowW[1], end[1]) + (t > 119.8 ? 10 : 50), end[0], end[1]); ctx.stroke(); ctx.restore(); }
  sbQuayWater(ctx, t, sea, 0, 2600);
  { const na = K.clamp((cam.x - 1180) / 120); if (na > 0) { ctx.save(); ctx.beginPath(); ctx.rect(SB_QUAY.edge + 8, 0, 4000, 2400); ctx.clip(); sbSeaNear(ctx, t, sea, cam, { a: 0.8 * na, fore: { h: 0.11, alpha: na } }); ctx.restore(); } }   // rev 1: near water in the berth shots
  // the gangplank drops with a bounce
  const gp = SB_GANGP(t); if (gp > 0) { const b = SB_GANG.b, a = SB_GANG.a, drop = (1 - gp) * 120 - rebound(t, 120.25, 10, 0.2), bend = kick(t, SB_FALLSP, 6, 9, 8);
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(a[0] + (1 - gp) * 300, a[1] - drop); ctx.quadraticCurveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + bend, b[0], b[1]); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore(); }
  // background life: a porter with a basket, the boy who mends the net (and catches the rope)
  if (t < 129.43) { const px = kfn(t, [[115.0, 200], [120.5, 900]]), Pp = sbAlive(t, 190, { x: px, y: 900, dir: 1, ...walk((u) => kfn(u, [[115.0, 200], [120.5, 900]]), tc, { stride: 22 }), handL: [-20, -210], handR: [20, -210], gaze: [1, 0] }); sbSailor(ctx, 4, Pp); const h = sbPt(Pp, [0, -60]); sbBlob(ctx, h[0], h[1] - 6, 40, 22, '#c8a060', '#8a6a30', { lw: 2.5 }); }
  { const bx = t < 118.3 ? 700 : kfn(t, [[118.3, 700], [119.0, 1040], [120.0, 1040], [120.6, 700]], 'inOut'), B = sbAlive(t, 191, { x: bx, y: 900, dir: bx > 760 && t < 120 ? 1 : -1, ...walk((u) => (u < 118.3 ? 700 : kfn(u, [[118.3, 700], [119.0, 1040], [120.0, 1040], [120.6, 700]], 'inOut')), tc, { stride: 16 }), gaze: [-1, 0.5] });
    if (t < 118.3 || t > 120.6) { B.handLW = [660, 830 + 6 * osc(tc, 0.6)]; B.handRW = [680, 820 - 6 * osc(tc, 0.6)]; } if (t > 119.0 && t < 120.0) { B.handRW = [1080, 850 - 10 * sbF(t, [[119.0, 1], [119.6, 1], [119.8, 0]])]; B.gaze = [1, 0.4]; }
    sbFamily(ctx, 'sister', { ...B, pal: { robe: '#e0a82a', dot: '#e0a82a', sleeve: '#e0a82a', band: '#2a5ad0' } }); }
  // the king's party (132.84 on): the king, groom A and the white horse
  if (t > 131.21) { const kx = kfn(t, [[132.84, 380], [134.0, 720]], 'out'), hx = kfn(t, [[132.9, 140], [134.1, 520]], 'out');
    const H = { x: hx, y: 902, s: 0.78, dir: 1, pal: 0, ...walk((u) => kfn(u, [[132.9, 140], [134.1, 520]], 'out'), tc, { stride: GAIT.horse * 0.78 }), earL: 0.7, earR: 0.5 + idleSway(tc, 3, 0.2, 2), tailSwish: osc(tc, 1.6) }; if (t > 134.1) { H.headDown = 0.4 * pulse(tc, 134.2, 0.6); H.neck = t > 135.2 ? 0.5 * Math.abs(osc(tc, 0.5)) : 0; }
    sbHorse(ctx, H); const G = sbAlive(t, 160, { x: hx + 150, y: 900, dir: 1, ...walk((u) => kfn(u, [[132.9, 140], [134.1, 520]], 'out') + 150, tc, { stride: 24 }), handL: [-60, -120], gaze: [1, 0] }); if (t > 135.0) { G.handR = [30, -230 + 10 * osc(tc, 0.4)]; } sbGroom(ctx, 0, G);
    const K1 = sbAlive(t, 184, { x: kx, y: 900, dir: 1, ...walk((u) => kfn(u, [[132.84, 380], [134.0, 720]], 'out'), tc, { stride: 22 }), mouth: 'smile', gaze: [1, 0] });
    if (t > 134.12 && t < 135.0) { K1.handRW = [870, 790]; K1.handLW = [850, 790]; } if (t > 134.5 && t < 135.0) K1.handR = PERSON_HANDS.pointFwd.R; if (t > 135.0) { const w = osc(tc + 0.2, 0.7); K1.aR = [2.3 + 0.4 * w, 2.6]; }
    sbKing(ctx, K1); }
  // the three chests at Sinbad's feet (131.9 on) and the gift chest
  if (t > 131.21 && t < 135.0) { const n = t < 131.6 ? 0 : t < 131.75 ? 1 : t < 131.9 ? 2 : 3; for (let i = 0; i < n; i++) { const tl = [131.6, 131.75, 131.9][i]; sbChest(ctx, 900 + i * 66 - (i === 2 ? 33 : 0), i === 2 ? 836 : 900, { s: 0.8, band: SB_ACC, seal: 'star', sq: impactSquash(t, tl, 0.86), lid: i === 2 ? sbF(t, [[132.0, 0], [132.25, 0.8], [132.55, 0.8], [132.8, 0]]) : 0, glow: i === 2 && t > 132.0 && t < 132.8 ? 0.8 : 0 }); } }
  // Sinbad on the quay (before he runs up the plank, and after the goods come down)
  if (t < 128.3 || (t > 131.21 && t < 135.0)) sbSinbad(ctx, sbPortSin(t));
  if (t > 131.21 && t < 135.0) { // sailors bring the chests down the plank, out of step; the captain at the plank foot
    for (let i = 0; i < 3; i++) { const t0 = 131.0 + i * 0.15, xf = (u) => kfn(u, [[t0, 1300 - i * 60], [t0 + 0.6, 960 + i * 50], [t0 + 1.4, 1300]], 'inOut'), x = xf(t); if (t > t0 + 1.4) continue; const S2 = sbAlive(t, 200 + i, { x, y: x > SB_GANG.a[0] ? sbGangY(x) : 900, dir: speed(xf, t) > 0 ? 1 : -1, ...walk(xf, tc, { stride: 22 }) }); const carry = t < t0 + 0.6; if (carry) { S2.handL = [30, -205]; S2.handR = [60, -205]; S2.tip += 0.1; } sbSailor(ctx, i, S2); if (carry) { const h = sbPt(S2, [45, -215], false); sbChest(ctx, h[0], h[1] + 4, { s: 0.7, band: SB_ACC, seal: 'star' }); } }
    const C = sbAlive(t, 51, { x: 1110, y: 898, dir: -1, gaze: [-1, 0.2], mouth: 'smile', wet: true }); if (t > 134.4) { C.handR = [-20, -205]; C.gaze = [-1, -0.1]; } sbCaptain(ctx, C); }
}
const SB_FALLSP = footfalls((t) => SB_SINPX(t), 127.56, 128.3, 30);
function sbPortSin(t) {
  const tc = SB_T2(t), x = SB_SINPX(t), P = sbAlive(t, 11, { x, y: 900, dir: 1, gaze: [1, -0.2], mouth: 'smile', wind: -0.3 });
  if (t < 116.7) { P.gaze = t < 116.1 ? [0.4, 0.8] : [1, -0.1]; P.lid = Math.max(P.lid, 0.2); }
  else if (t < 120.5) { const sx = SB_DHOWPX(t); P.gaze = lookAt([x, 700], [sx, 600]); }
  else if (t < 121.52) { P.gaze = gazePlan(tc, [[0, [-1, 0]], [120.6, [1, -0.2]], [120.85, [-0.6, 0]], [121.1, [1, -0.3]]], 0.07); P.lid = sbLid(t, 11, [120.6, 120.85, 121.1]); P.tip += 0.1 * K.clamp((t - 121.1) / 0.3); P.handL = [-50, -130]; P.handR = [50, -130]; P.mouth = 'o'; }
  else if (t < 127.56) { P.gaze = t < 124.5 ? lookAt([x, 700], [1560, 640]) : lookAt([x, 700], [1700, 700]); P.mouth = 'o'; P.tip += 0.06; P.eyes = t > 125.22 ? 'wide' : 'open'; }
  else { Object.assign(P, walk(SB_SINPX, tc, { stride: 30, amp: 50 })); P.y = x > SB_GANG.a[0] ? sbGangY(x) + kick(t, SB_FALLSP, 2, 9, 8) : 900; P.tip += 0.15; P.handL = [-6, -128]; P.handR = [6, -128]; P.wind = -1; P.mouth = 'open'; }
  if (t > 131.21) { P.x = 1010; P.dir = 1; P.gaze = [1, 0.4]; if (t > 131.92 && t < 132.84) { P.kneel = 1; P.handRW = [930, 790]; P.gaze = [-0.6, 0.8]; P.mouth = 'smile'; P.sq *= 1 + 0.03 * pulse(tc, 132.3, 0.5); }
    if (t > 132.84) { P.dir = -1; P.gaze = [-1, -0.1]; } if (t > 134.12 && t < 135) { const b = sbF(t, [[134.3, 0], [134.55, 1], [134.85, 1], [135, 0.3]]); P.tip += 0.4 * b; P.handLW = [862, 780 + 10 * b]; P.handRW = [882, 780 + 10 * b]; } }
  return P;
}
// the deck crew in port: the captain at the rail (S4's pose), sailors, the chests by the mast, Sinbad when on board
function sbPortCrew(c, t, ds, D) {
  const tc = SB_T2(t), dy = -80 * ds;
  // the chests by the mast with tangerine bands and white star seals (until they are carried down)
  if (t < 131.0) { celShade(c, K.rectPts(40 * ds, dy - 56, 150 * ds, 56), '#d8c090', '#a08a5a', { light: [-1, -1], off: 8, lw: 3 }); } if (t < 131.0) for (let i = 0; i < 3; i++) { sbChest(c, (50 + i * 62) * ds - (i === 2 ? 31 * ds : 0), (i === 2 ? dy - 64 * 0.8 : dy) - 56, { s: 0.8, band: SB_ACC, seal: 'star' }); if (t > 125.22 + i * 0.2 && t < 125.9 + i * 0.2) sbGlint(c, (50 + i * 62) * ds - (i === 2 ? 31 * ds : 0) + 8, (i === 2 ? dy - 51 : dy) - 89, 30, (t - 125.22 - i * 0.2) / 0.6); }
  for (let i = 0; i < 3; i++) { const pop = t > 128.55 + i * 0.15 && t < 131.0 ? 1 : 0, P = sbAlive(t, 210 + i, { x: (-150 + i * 40) * ds, y: dy + (pop ? 0 : 60), dir: -1, gaze: [-1, 0], mouth: pop ? 'o' : 'closed' }); if (t < 128.55 && t > 120) { P.y = dy; P.handL = [10, -110 + 10 * osc(tc + i, 1.3)]; P.x = (-150 + i * 40) * ds; } sbSailor(c, i, P); }
  // the captain: spyglass at the rail; the point-blank look; the hug; arm's length; the bow
  if (t > 120.0 && t < 131.21) { const C = sbAlive(t, 51, { x: -40 * ds, y: dy, dir: -1, gaze: [-1, -0.1], handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L, brow: 0.2 });
    let glass = 0; if (t > 122.34 && t < 124.5) { glass = 1; C.wink = 'L'; } if (t > 127.96 && t < 128.5) { glass = sbF(t, [[127.96, 0], [128.1, 1], [128.3, 1], [128.5, 0]]); C.wink = glass > 0.6 ? 'L' : null; }
    if (glass > 0) { C.handRW = [-40 * ds - 30, dy - 205]; C.handL = [20, -110]; }
    if (t > 128.3 && t < 129.43) { C.mouth = 'o'; C.brow = -0.8; C.eyes = 'wide'; C.talk = sbTalk(t, 128.55, 129.3, 7); }
    if (t > 129.43) { C.dir = 1; C.x = -10 * ds; const hug = t < 130.48, thump = kick(t, [129.7, 130.0], 1, 8, 6); C.handLW = hug ? [D.x + 40 * ds - D.x + 20 * ds, dy - 150] : null; if (hug) { C.handLW = [55 * ds, dy - 150 + 10 * thump]; C.handRW = [70 * ds, dy - 160]; } else { C.handR = PERSON_HANDS.chest.R; C.tip += 0.25 * sbF(t, [[130.6, 0], [130.9, 1], [131.2, 1]]); C.wet = true; } C.mouth = 'smile'; }
    sbCaptain(c, C); if (glass > 0) { const h = sbHandW(C, 1); sbSpyglass(c, h[0] + 14, h[1] - 6, Math.PI + 0.08, 1, 1, 0); } }
  // Sinbad on board (128.3 - 131.21): jumps down from the plank; hugged, squashed on each thump
  if (t > 128.3 && t < 131.21) { const [hx, lift] = hop(t, 128.3, 0.25, 132, 70 * ds, 18), P = sbAlive(t, 11, { x: t < 128.55 ? hx : 70 * ds, y: dy - lift, dir: -1, gaze: [-1, 0], mouth: 'smile', wind: 0.2 });
    P.sq *= landSquash(tc, 128.55, 0.12); if (t < 129.43) { P.handL = [20, -170]; P.handR = [24, -160]; } else { P.sq *= 1 - 0.07 * (kick(t, [129.7, 130.0], 1, 8, 6) > 0.3 ? 1 : 0); P.handLW = [-10 * ds, dy - 150]; P.handRW = [-20 * ds, dy - 140]; P.lid = t < 130.4 ? 1 : 0; if (t > 130.48) { P.handR = [40, -160]; P.handLW = undefined; P.handRW = undefined; P.gaze = [-1, -0.2]; } }
    sbSinbad(c, P); }
  // Sinbad waves from the stern as they sail (135 on)
  if (t > 134.95) { const P = sbAlive(t, 11, { x: -120 * ds, y: dy, dir: -1, gaze: [-1, 0], mouth: 'smile', wind: -0.6 }); const w = osc(tc, 0.45); P.aR = [2.5 + 0.35 * w, 2.8 + 0.3 * w]; sbSinbad(c, P);
    const C = sbAlive(t, 51, { x: 40 * ds, y: dy, dir: -1, gaze: [-1, 0] }); C.handR = [-20, -205]; sbCaptain(c, C); }
}
function sbS15Over(ctx, t, cam, S) {
  if (t > 122.34 && t < 123.3) { const [x, y] = sbP(1706, 560, cam); sbTag(ctx, S, 'THE CAPTAIN!', Math.min(x, 700), y - 60, t, 122.4, 123.1, { size: 46 }); }
  if (t > 125.22 && t < 126.5) { const [x, y] = sbP(1560, 740, cam); sbTag(ctx, S, 'HIS CHESTS', x - 120, y - 260, t, 125.3, 126.3, { size: 46 }); S.arrow(ctx, [x - 120, y - 210], [x - 40, y - 60], K.clamp((t - 125.4) / 0.3)); }
  if (t > 128.55 && t < 129.43) { const [x, y] = sbP(1600, 660, cam); sbSay(ctx, S, [[128.55, 'SINBAD?! ALIVE?!']], t, 520, 160, [x, y - 40], { size: 54 }); }
}
SB_SHOTS.push({ a: 114.82, b: 121.52, ww: 2200, cam: (t) => K.camAt(SB_PCAM, t), world: sbS15World, over: sbS15Over });
// 121.52 - 122.34: the eye close-up: the striped sail reflected in both irises
SB_SHOTS.push({ a: 121.52, b: 122.34, panel(ctx, t) {
  ctx.drawImage(sbSkyPlate('day'), -300, -100, 1600, 1400); const open = K.clamp((SB_T2(t) - 121.52) / 0.25), pup = 1.3 - 0.3 * open;
  sbFace(ctx, 500, 700, 2.4, { gaze: [0.1, -0.1], lid: 1 - open, iris: 1.25, pupil: pup, mouth: 'o', brow: -0.6, wide: 1, reflect: (c, r, sd) => { const sl = K.clamp((t - 121.6) / 0.4); c.save(); c.globalAlpha = 0.85; sbDhow(c, { x: (1 - sl) * r * 1.4 - sd * 2, y: r * 0.35, s: r / 520, t, far: true, sail: 1, patch: true }); c.restore(); } });
  sbBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#fff3b0'], n: 1, alpha: 0.25, w: 180, speed: 900, phase: -121.6 * 900 }); } });
// 126.72 - 127.5: a one-second tape memory of the star seal slapped on in Baghdad
function sbMemory(ctx, t, S) { const cam = sbCamClamp(K.camAt(SB_Q1CAM, 8.05), 2200); ctx.save(); K.camera(ctx, 1000, 1230, cam); sbS1World(ctx, 7.95 + (t - 126.72) * 0.3, cam); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#fff6ea'; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); sbGlint(ctx, 500, 640, 80, (t - 126.8) / 0.6); }
SB_SHOTS.push({ a: 122.34, b: 126.72, ww: 2200, cam: (t) => K.camAt(SB_PCAM, t), world: sbS15World, over: sbS15Over });
SB_SHOTS.push({ a: 126.72, b: 127.5, panel(ctx, t, S) { sbMemory(ctx, t, S); } });
SB_SHOTS.push({ a: 127.5, b: 136.04, ww: 2200, cam: (t) => K.camAt(SB_PCAM, t), world: sbS15World, over: sbS15Over });
// 136.04 - 136.8: open sea in gold light, Baghdad rising on the horizon ahead
const SB_GSEA = { hz: 600, y: [615, 700, 820, 905], amp: 8, scroll: 160, pal: 'gold' };
SB_SHOTS.push({ a: 136.04, b: 136.8, ww: 1000, cam: () => ({ x: 500, y: 615, zoom: 1.0 }), world(ctx, t, cam) {
  sbSky(ctx, 'gold', cam); sbSun(ctx, 220, 420, 54, '#fff1c0', '#ffb070', 1); sbSeaBack(ctx, t, SB_GSEA, 0, 1000);
  sbFarBaghdad(ctx, 760, seaY(760, t, 0, SB_GSEA) + 4 - 40 * K.clamp((t - 136.04) / 0.7), 0.42, K.clamp((t - 136.04) / 0.4));
  const f = sbFloat(380, t, SB_GSEA, 2, 200), ds = 0.95; sbDhow(ctx, { x: 380, y: f.y, s: ds, pitch: f.rot, t, sail: 1, patch: true, crew: (c) => sbOnDeck(c, ds, (q) => { const P = sbAlive(t, 11, { x: 205 * ds, y: -80 * ds, dir: 1, gaze: [1, -0.3], mouth: 'smile', wind: -1 }); P.y -= 8 * Math.abs(osc(SB_T2(t), 0.3)); P.handR = PERSON_HANDS.pointFwd.R; sbSinbad(q, P); const C = sbAlive(t, 51, { x: -40 * ds, y: -80 * ds, dir: 1, gaze: [1, 0], handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L }); sbCaptain(q, C); }) });
  sbWake(ctx, 380, f.y, ds, 1, t); sbSeaFront(ctx, t, SB_GSEA, 0, 1000, { mid: (c) => sbReflect(c, 380, f.y, 470, ['#a8643a', '#2ab0b0', '#fbf3df', '#d0285a'], t, { rows: 6, gap: 10, a: 0.5 }) });
  sbGulls(ctx, t - 136, 900, 660, -120, 3, 31, 0.36); sbSeaNear(ctx, t, SB_GSEA, cam); } });

// ---------- S18 (136.8 - 149.83): home. The embrace, the story, the look back, the far whale, THE END ----------
const SB_HSEA = { hz: 620, y: [632, 700, 945, 1030], amp: 5, pal: 'gold' };
// rev 1 ending: on "البحر" 143.32 the camera pans right until Sinbad (walked to the quay edge) stands at panel x ~27%, clear water and
// horizon across the right 60%; the moored dhow sails out of frame unseen (139.3-140) and the captain is out of the picture
const SB_S18CAM = [[136.8, { x: 880, y: 650, zoom: 1.15 }], [139.1, { x: 860, y: 680, zoom: 1.25 }], [141.9, { x: 860, y: 680, zoom: 1.25 }], [143.32, { x: 900, y: 670, zoom: 1.2 }], [144.4, { x: 1235, y: 615, zoom: 1.0 }], [149.83, { x: 1255, y: 615, zoom: 1.0 }]];
const SB_EDGE18 = (t) => kfn(t, [[142.62, 880], [143.5, 1000]], 'inOut');        // Sinbad's walk to the quay edge
const SB_SIS18 = (t) => kfn(t, [[142.7, 760], [143.62, 925]], 'inOut');           // the sister follows, holding his sash
const SB_WH18 = { x: 1440, s: 0.5 };                                              // the far whale: panel x ~68% after the pan
const SB_SIN18X = (t) => kfn(t, [[136.85, 1300], [137.3, 1110], [137.9, 860]], 'inOut');
const SB_FAM18 = { mother: (t) => kfn(t, [[137.6, 640], [138.5, 800], [139.12, 800], [139.6, 690]]), father: (t) => kfn(t, [[137.8, 560], [138.56, 760], [139.12, 760], [139.6, 630]]), sister: (t) => kfn(t, [[137.4, 760], [137.75, 830], [139.12, 830], [139.5, 760]]) };
function sbS18World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB_HSEA, ds = SB_QUAY.dhowS;
  sbHarbourQuay(ctx, 'gold', t, cam, sea, { sun: (c) => sbSun(c, 1900, 380, 56, '#fff1c0', '#ffb070', 1), far: (c) => {
    // the far whale (rev 1, three times the v1 size): the hump with its palms rises on "يخفي" 144.02, the tail lifts once like a hand on
    // "عجائب" 144.62 (up over 5 drawings, hold 3, down), a small spout and rings; it stays, slowly sinking, until 147.5. Gold light under it
    if (t > 144.02 && t < 148.2) { const x = SB_WH18.x + (t - 144) * 6, wl = seaY(x, t, 0, sea), rise = sbF(t, [[144.02, 0], [144.5, 1]]), sink = K.clamp((t - 146.0) / 1.5), hy = wl + 40 * SB_WH18.s - 62 * rise + 70 * sink;
      sbLightPath(c, t, x - 10, wl + 2, 760, 70, '#ffe6a0', 0.55 * rise * (1 - sink * 0.6));
      c.save(); c.beginPath(); c.rect(0, 0, 3000, wl + 1); c.clip(); sbWhale(c, x, hy, { s: SB_WH18.s, dress: 1, t, lid: 1, spout: t > 144.62 ? K.clamp((t - 144.62) / 1.1) : 0 }); c.restore();
      const tl = sbF(t, [[144.62, 0], [145.04, 1], [145.3, 1], [145.72, 0]]); if (tl > 0) { c.save(); c.beginPath(); c.rect(0, 0, 3000, wl + 1); c.clip(); sbFluke(c, x - 500 * SB_WH18.s, wl + 4, 0.62, tl, t); c.restore(); }
      sbFoamLine(c, [[x - 200, wl + 1], [x - 60, wl + 3], [x + 90, wl + 3], [x + 210, wl + 1]], t, { w: 5, a: 0.9 * rise * (1 - sink) });
      for (let k = 0; k < 3; k++) sbRing(c, x - 40, wl + 2, (t - 144.7 - k * 0.45) / 1.6, 220, { lw: 3, a: 0.8 }); }
    sbGulls(c, t, 900, 260, 25, 3, 14, 0.32); } });
  // the dhow moored at the berth again; the captain at the rail
  const dxh = kfn(t, [[139.9, 1660], [141.0, 2900]], 'in');
  if (t < 141.0) { const f = sbFloat(dxh, t, sea, 2, 200), D = { x: dxh, y: f.y - 2, s: ds, pitch: f.rot * 0.4, t, sail: 0, patch: true, crew: (c) => sbOnDeck(c, ds, (q) => { const C = sbAlive(t, 51, { x: 20 * ds, y: -80 * ds, dir: -1, gaze: [-1, 0.2], mouth: 'smile', handR: PERSON_HANDS.folded.R, handL: PERSON_HANDS.folded.L }); sbCaptain(q, C); }) };
    sbDhow(ctx, D); }
  sbQuayWater(ctx, t, sea, 0, 2600, [2]);
  // the gangplank is pulled aboard (139.3-139.9), sliding out to the right
  const gp = kfn(t, [[139.3, 0], [139.9, 1]], 'in'); if (gp < 1) { const dx = gp * 600; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(SB_GANG.a[0] + dx, SB_GANG.a[1] - dx * 0.23); ctx.lineTo(SB_GANG.b[0] + dx, SB_GANG.b[1] - dx * 0.23); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore(); }
  sbQuayWater(ctx, t, sea, 0, 2600, [3]);
  // the open water beyond the quay: a gull pair low over it, the near crest band (from the pan on)
  if (t > 143.0) { sbGulls(ctx, t - 143, 1900, 520, -40, 2, 21, 0.34); ctx.save(); ctx.beginPath(); ctx.rect(SB_QUAY.edge + 8, 0, 4000, 2400); ctx.clip(); sbSeaStreaks(ctx, t, sea, 1100, 1900, 760, 930, { n: 6, a: 0.5, li: 1 }); sbSeaFore(ctx, t, sea, cam, { h: 0.1, alpha: K.clamp((t - 143.0) / 0.6) }); ctx.restore(); }
  // his sealed chest (he sits on it to tell the story) and the crate for his sister
  sbChest(ctx, 880, 900, { s: 0.8, band: SB_ACC, seal: 'star' }); celShade(ctx, K.rectPts(728, 852, 64, 48), '#c08a52', '#8a5a30', { light: [-1, -1], off: 8, lw: 3 });
  // the family
  const sit = t > 139.12, story = t > 139.12 && t < 141.94, look = t > 143.32;
  for (const [who, seed] of [['father', 31], ['mother', 32]]) { const xf = SB_FAM18[who], x = xf(t), P = sbAlive(t, seed, { x, y: 900, dir: speed(xf, t) < -1 ? -1 : 1, ...walk(xf, tc, { stride: who === 'father' ? 22 : 18 }), mouth: 'smile', gaze: lookAt([x, 700], [SB_SIN18X(t), 700]) });
    if (who === 'mother' && t > 137.6 && t < 139.12) { P.aL = [1.6, 1.8]; P.aR = [1.6, 1.8]; P.wet = true; } if (who === 'mother' && t > 138.56 && t < 139.12) { P.handLW = [SB_SIN18X(t) - 20, 740]; P.handRW = [SB_SIN18X(t) + 10, 744]; delete P.aL; delete P.aR; }
    if (who === 'father' && t > 138.56 && t < 139.12) P.handRW = [SB_SIN18X(t) - 4, 690];
    if (sit && t > 139.6) { P.sit = K.clamp((t - 139.6) / 0.3); P.seat = 'bench'; P.amp = 0; P.dir = 1; P.y = 900; P.gaze = [1, -0.4]; P.x = who === 'father' ? 650 : 690; }
    if (t > 141.18 + (who === 'father' ? 0.26 : 0)) { if (who === 'mother') { P.handR = PERSON_HANDS.cheeks.R; P.handL = PERSON_HANDS.cheeks.L; P.mouth = 'o'; P.wet = true; } else { P.eyes = 'wide'; P.drop = -6 * pulse(tc, 141.44, 0.4); } }
    if (look && t > 143.5 + (who === 'father' ? 0.26 : 0.13)) P.gaze = [1, -0.2];
    sbFamily(ctx, who, P); }
  { const xf = SB_FAM18.sister, x = xf(t), P = sbAlive(t, 33, { x, y: 900, dir: 1, mouth: 'open', gaze: [1, -0.6] });
    if (t > 137.6 && t < 138.56) { const sx = SB_SIN18X(t), a = K.clamp((t - 137.75) / 0.8); P.x = sx - 30 * Math.cos(a * Math.PI * 2); P.y = 830 - 20 * Math.sin(a * Math.PI); P.rot = 0.6 * Math.sin(a * Math.PI * 2); P.aL = [2.4, 2.6]; P.aR = [2.4, 2.6]; }
    else if (t < 137.6) { Object.assign(P, walk(xf, tc, { stride: 16 })); P.y -= Math.abs(Math.sin(P.ph || 0)) * 10 * (P.amp || 0); }
    else if (t < 139.12) { P.handLW = [SB_SIN18X(t) - 10, 800]; P.gaze = [1, -1]; P.mouth = 'smile'; }
    if (sit && t > 139.5) { P.x = 760; P.sit = 1; P.seat = 'bench'; P.mouth = 'smile'; if (t > 140.58 && t < 141.18) { P.kneel = 0; P.sit = 0.4; P.handR = PERSON_HANDS.pointUp.R; P.mouth = 'open'; } if (t > 141.18 && t < 141.94) { const c = Math.abs(osc(tc, 0.25)); P.handLW = [775 + 10 * c, 760]; P.handRW = [790 - 10 * c, 760]; P.mouth = 'open'; } }
    // she gets up with him and follows holding his sash, looking up at him; only she sees the whale too, and claps
    if (t > 141.94) { P.gaze = [1, -0.9]; P.mouth = 'smile'; const up = K.clamp((t - 142.5) / 0.25); P.sit = 1 - up; P.x = SB_SIS18(t); if (t > 142.7 && t < 143.62) Object.assign(P, walk(SB_SIS18, tc, { stride: 14 }));
      const sx = SB_EDGE18(t); if (t > 142.55 && t < 145.2) P.handRW = [sx - 26, 820 + 4 * osc(tc, 0.7)];
      if (t > 144.4) P.gaze = [1, -0.3]; if (t > 145.2) { const c = Math.abs(osc(tc, 0.42)); P.handLW = [P.x + 22 + 9 * c, 812]; P.handRW = [P.x + 38 - 9 * c, 812]; P.mouth = 'open'; P.y = 900 - 6 * c; }
      if (t > 147.6) { delete P.handLW; P.handRW = [sx - 26, 822]; P.mouth = 'smile'; P.y = 900; P.gaze = [1, -0.9]; } }
    sbFamily(ctx, 'sister', P); }
  // Sinbad: jumps off the plank, runs, catches his sister and swings her; the embrace; tells the story on his chest; the look back
  const x = SB_SIN18X(t), P = sbAlive(t, 11, { x, y: 900, dir: -1, mouth: 'smile', wind: -0.3, gaze: [-1, 0] });
  if (t < 137.3) { const [hx, lift] = hop(t, 136.85, 0.45, 1300, 1110, 60); P.x = hx; P.y = K.lerp(sbGangY(1300), 900, K.clamp((t - 136.85) / 0.45)) - lift; groundShadow(ctx, hx, 900, 80, lift, { flat: true }); P.aL = [2.0, 2.2]; P.aR = [2.0, 2.2]; P.sq *= 1.06; }
  else if (t < 137.6) { Object.assign(P, walk(SB_SIN18X, tc, { stride: 30, amp: 50 })); P.sq *= landSquash(tc, 137.3, 0.14); P.aL = [1.4, 1.6]; P.aR = [1.4, 1.6]; P.tip += 0.12; }
  else if (t < 138.56) { Object.assign(P, walk(SB_SIN18X, tc, { stride: 26 })); P.handL = [-40, -170]; P.handR = [20, -170]; P.mouth = 'open'; }
  else if (t < 139.12) { P.handL = [-50, -150]; P.handR = [50, -150]; P.lid = 0.7; P.mouth = 'smile'; }
  if (t > 139.12) { P.x = 880 + 22 * 0.95 * 0; P.sit = K.clamp((t - 139.12) / 0.3); P.seat = 'bench'; P.y = 900 - 64 * 0.8 * P.sit + 48 * P.sit; P.dir = -1; P.gaze = [-1, -0.2];
    if (story) { const a = sbF(t, [[139.3, 0], [139.8, 1], [140.4, 0.6], [140.9, 1], [141.94, 0.8]]), lag = a + lagged((u) => flow(u, [[139.3, 0], [139.8, 1], [140.4, 0.6], [140.9, 1]]), tc, 0.17, 0.6); P.aL = [0.3 + 2.5 * a, 0.3 + 2.1 * lag]; P.aR = [0.3 + 2.5 * a, 0.3 + 2.1 * lag]; P.talk = sbTalk(t, 139.3, 141.9, 2); P.mouth = 'smile'; }
    // "وعرف" 141.94: he turns from the family to the water: eyes first, then the head with a blink, then the body; stands, walks to the edge
    if (t > 141.94) { P.gaze = [1, -0.1]; P.mouth = 'smile'; P.lid = Math.max(0.25, sbLid(t, 11, [142.08, 146.5])); if (t > 142.2) P.dir = 1;
      const up = K.clamp((t - 142.4) / 0.25); if (up > 0) { P.sit *= 1 - up; P.y = 900 - 16 * P.sit; } if (up > 0) P.y -= 10 * Math.sin(Math.PI * up);
      if (t > 142.62) { P.x = SB_EDGE18(t); P.sit = 0; P.y = 900; if (t < 143.5) Object.assign(P, walk(SB_EDGE18, tc, { stride: 24 })); }
      P.sq *= 1 + 0.018 * Math.sin((t - 142) * 2.1); P.wind = -0.3 - 0.6 * sbF(t, [[143.9, 0], [144.7, 1], [147, 0.7]]); P.tailA = 0.15 * osc(tc, 2.3);
      if (t > 144.02) P.gaze = [1, -0.05]; if (t > 144.62 && t < 145.2) { P.eyes = 'wide'; P.drop = -4 * pulse(tc, 144.7, 0.4); }
      if (t > 145.3) { const h = sbF(t, [[145.3, 0], [145.6, 1], [147.4, 1], [147.9, 0.2]]); if (h > 0.05) P.handR = [K.lerp(10, 48, h), K.lerp(-110, -178, h) + 5 * osc(tc, 0.9) * h]; } } }
  sbSinbad(ctx, P);
  if (t > 138.56 && t < 139.6) teardrops(ctx, t, 138.6, 139.4, () => [SB_FAM18.mother(t) - 10, 700], { groundY: 900, rate: 2 });
}
function sbS18Over(ctx, t, cam, S) {
  if (t > 140.4 && t < 142.3) { const [hx, hy] = sbP(880, 690, cam), lift = K.clamp((t - 141.18) / 0.5), fade = t > 141.94 ? 1 - (t - 141.94) / 0.35 : 1;
    ctx.save(); ctx.globalAlpha *= K.clamp(fade); thoughtCloud(ctx, 420, 260, 360, 240, t, { p: K.clamp((t - 140.4) / 0.4), tail: [hx, hy], scale: 0.32, at: [500, 700], inside: (c) => sbStoryInside(c, t, lift, K.clamp((t - 141.5) / 0.3)) }); ctx.restore(); }
  if (t >= 145.6) S.title(ctx, 'THE END', 500, 300, K.clamp((t - 145.6) / 0.8), { size: 110, align: 'center' });
}
SB_SHOTS.push({ a: 136.8, b: SB_DUR + 1, ww: 2200, cam: (t) => K.camAt(SB_S18CAM, t), world: sbS18World, over: sbS18Over });
