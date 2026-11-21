// ===== HORSE-03: S7 the caravan on the desert road (Library desertRoad, w 2400, 40.46 - 48.92) =====
// Tracking side shot at zoom 0.9; the hooded inventor rides the second camel; the river city rises over the last dune; his camel kneels
// short of the wall and he peels away while the others file in through the gate (x 2070).
const H3_DR = { w: 2400, city: 'right', palms: [300, 900, 1500], sun: [1900, 150] };
const H3_LEAD = H3_F([[40.46, 520], [47.6, 1900], [48.92, 2140]]);
const H3_INVCX = H3_F([[40.46, 260], [47.6, 1640], [47.9, 1660], [48.92, 1660]]);
const H3_CARAVAN = [   // [offset, kind, pal, seed]
  [0, 'camel', 0, 71], [-260, 'camel', 1, 73], [-530, 'camel', 2, 75], [-740, 'donkey', 0, 77]];
function h3RoadCam(t) { const z = 0.9, camX = K.clamp(H3_LEAD(t) - 760, 0, H3_DR.w - 1000 / z); return { x: camX + 500 / z, y: 900 - 340 / z, zoom: z, camX }; }
function h3RoadWorld(ctx, t, cam) {
  const tc = EH_T2(t), t3 = EH_T3(t), cx = cam.camX;
  // own sky (bright noon), then the river city far behind the dunes (rises at 46.66), then the Library road
  ehGrad(ctx, -200, -400, 2800, 1300, [[0, '#3a8ef0'], [0.6, '#8ac8ff'], [1, '#e8f6ff']]);
  const [sx, sy] = H3_DR.sun; ehGlow(ctx, sx + cx * 0.85, sy + 40 * K.clamp((t - 45.5) / 3), 300, 0.7, '#fff2c0'); celShade(ctx, ell(sx + cx * 0.85, sy + 40 * K.clamp((t - 45.5) / 3), 60, 60, 30), '#fff6d0', '#ffe2a0', { off: 6, lw: 0 });
  for (let i = 0; i < 4; i++) { const x = ((i * 700 + t * 8) % 2800) - 200 + cx * 0.8; ctx.drawImage(ehCloudSprite(i % 3, 'day'), x, 120 + i * 60, 420, 126); }
  const rise = ehE(t, 46.66, 1.0, 'out'); if (rise > 0) { ctx.save(); ctx.translate(cx * 0.6, 0); h3Palace(ctx, 1560, K.lerp(780, 640, rise), 0.7, false); ehRiverTowers(ctx, 1380, 1760, K.lerp(780, 650, rise), 200, 44, EH_RC_DUSK, {}); ctx.restore(); }
  desertRoad(ctx, { ...H3_DR, sky: false, camX: cx, t });
  // the gate guard counting bales
  const gx = 2070 - 130, G = { x: gx, y: 905, s: 0.95, dir: -1, lid: ehLid(t, 81), sq: breathe(tc, 81, 0.012), tip: idleSway(tc, 81, 0.02, 3), mouth: 'closed', gaze: [-1, 0.3], handL: [-20, -100], handR: t > 47.78 ? [70 + 10 * Math.sin(tc * 8), -150] : [30, -100] };
  h3Shadow(ctx, G.x, G.y, 80); person(ctx, ehDressP(EH_GUARD_B, G)); ehHelmet(ctx, G);
  // the caravan, back to front (the donkey last in line is drawn first)
  const items = [];
  H3_CARAVAN.forEach(([off, kind, pal, sd], i) => {
    const xf = i === 1 ? H3_INVCX : (tt) => H3_LEAD(tt) + off, x = xf(t); if (x > 2010 && i !== 1) return;   // into the gate
    const s = kind === 'camel' ? 0.62 : 0.72, M = { ...walk(xf, tc, { stride: (kind === 'camel' ? GAIT.camel : GAIT.donkey) * s }), y: 900, s, pal, dir: 1, lid: ehLid(t, sd), saddle: true, tailSwish: Math.sin(tc * 2 + i), ears: 0.3 * Math.sin(tc + i) };
    if (kind === 'camel') { M.chew = (Math.floor(tc * 4 + i) % 2) * 0.6; M.neck = idleSway(tc, sd, 0.2, 3); }
    items.push([i, kind, M, x]); });
  for (const [i, kind, M, x] of items.reverse()) {
    h3Shadow(ctx, x, 902, kind === 'camel' ? 260 * M.s : 200 * M.s);
    if (i === 0) { const P = { costume: 'merchant', pal: EH_GUESTS[0].pal, lid: 1, drop: 10 + 3 * Math.sin(tc * 1.4), mouth: 'o', handL: [30, -110], handR: [40, -112], sq: breathe(tc, 85, 0.02), tip: 0.06 };
      rideOn(ctx, 'camel', { ...M, load: [{ kind: 'chest', col: '#e8604a' }] }, P);
      if (t % 2.4 < 1.2) { const st = mountSeat('camel', M); ctx.save(); ctx.globalAlpha = 0.7; ctx.font = '800 34px "Barlow Semi Condensed"'; ctx.fillStyle = '#fff6ea'; ctx.fillText('z', st.x + 60, st.y - 200 - 20 * ((t % 1.2) / 1.2)); ctx.restore(); }
      // the driver on foot beside the lead camel
      const dx = (tt) => H3_LEAD(tt) + 110, D = { ...walk(dx, tc, { stride: 22 }), y: 930, s: 0.95, dir: 1, lid: ehLid(t, 87), sq: breathe(tc, 87, 0.012), tip: idleSway(tc, 87, 0.02, 2.5), mouth: 'smile', gaze: [1, 0], handR: [40, -150], handL: [-20, -100] };
      if (dx(t) < 2010) { h3Shadow(ctx, D.x, D.y, 80); person(ctx, ehDressP({ costume: 'bedouin', s: 0.95 }, D)); } }
    else if (i === 1) h3InvCamel(ctx, t, M);
    else if (i === 2) camel(ctx, { ...M, load: [{ kind: 'bolt', col: '#3f7ad0' }, { kind: 'rug', col: '#ffd36a' }, { kind: 'bolt', col: '#ff6a8a' }] });
    else rideOn(ctx, 'donkey', { ...M, load: ['sack'] }, { costume: 'servant', child: true, pal: { robe: '#5ab8f0', dot: '#3a8ac8', hc: '#fff6ea' }, lid: ehLid(t, 91), mouth: 'smile', handL: [30, -110], handR: [40, -112], showLegs: true, tip: 0.04 * Math.sin(tc * 5) }, { reins: false });
    if (M.amp > 0.2 && Math.sin(M.ph) > 0.95) dustBurst(ctx, x - 60, 900, 0.1, 4, 4, 8, 40, 0.4, i);
  }
  // the inventor peels away along the wall
  if (t >= 48.5) { const xf = H3_F([[48.5, 1700], [48.92, 1780]]), P = { ...walk(xf, tc, { stride: 24 }), y: 935, s: EH_INVENTOR.s, dir: 1, lid: 0.45, brow: 0.4, mouth: 'closed', gaze: [1, -0.1], tip: idleSway(tc, 41, 0.02, 3), handL: [-30, -100], handR: [30, -100] };
    if (t < 48.7) { P.y -= 30 * (1 - ehE(tc, 48.5, 0.2)); } h3Shadow(ctx, P.x, 935, 90); ehInvTail(ctx, P, tc, { vx: 80 }); person(ctx, ehDressP(EH_INVENTOR, P)); travelCloak(ctx, P.x, P.y - 75 * P.s, 0, 1, P.s, t, {}); }
}
function h3InvCamel(ctx, t, M) {
  const tc = EH_T2(t), kn = flow(tc, [[48.18, 0], [48.5, 1]]); M.kneel = kn; M.neck = t > 47.26 && t < 48.1 ? -0.2 : M.neck; M.headTurn = t > 47.26 && t < 48.0 ? 0.8 : 0; M.talk = t > 47.26 && t < 47.9 ? Math.abs(Math.sin(tc * 9)) : 0;
  if (t >= 48.5) { camel(ctx, M); return; }
  const P = { costume: 'vizier', ...EH_INVENTOR, lid: 0.45, brow: 0.4, mouth: 'closed', gaze: [1, 0], handL: [30, -112], handR: [40, -110], sq: breathe(tc, 41, 0.014), lurch: idleSway(tc, 41, 0.03, 2.2), tip: 0 };
  if (t >= 42.82 && t < 44.76) { P.gaze = [0.4, -0.9]; P.lid = 0.35; }
  if (t >= 44.76 && t < 45.6) { P.handR = [62, -186 - 8 * Math.abs(Math.sin((tc - 44.76) * Math.PI / 0.2))]; P.mouth = 'smirk'; P.lid = 0.4; P.gaze = [1, -0.2]; }
  if (t >= 45.6) { P.mouth = 'smirk'; P.gaze = gazePlan(tc, [[45.6, [1, 0]], [46.7, [1, -0.3]], [47.3, [-0.6, 0.3]], [47.6, [1, 0]]], 0.07); }
  if (t >= 47.3 && t < 47.9) { P.handR = [80, -90 + 6 * Math.sin(tc * 14)]; }
  const seat = mountSeat('camel', M), sg = 1, ps = P.s;
  travelCloak(ctx, seat.x, seat.y, seat.rot + (P.lurch || 0), sg, ps, t, { seated: true });   // the cloak body hangs behind
  ehInvTailAt(ctx, seat.x - 30 * ps, seat.y - 175 * ps, ps, tc, { ang: Math.PI / 2 + 1.1, stream: 0.4, len: 0.6 });
  rideOn(ctx, 'camel', M, P);
  travelCloak(ctx, seat.x, seat.y, seat.rot + (P.lurch || 0), sg, ps, t, { seated: true, noBody: true });   // the hood over the turban
}
function h3RoadOver(ctx, t, cam, S) {
  const P = (x, y) => h3P(x, y, cam), M = { x: H3_INVCX(t), y: 900, s: 0.62, dir: 1 }, st = mountSeat('camel', M), hd = P(st.x + 20, st.y - 130 * EH_INVENTOR.s);
  if (t >= 42.02 && t < 44.6) { ctx.save(); ctx.globalAlpha *= K.clamp((44.6 - t) / 0.3); S.arrow(ctx, [hd[0] + 180, hd[1] - 230], [hd[0] + 30, hd[1] - 70], K.clamp((t - 42.02) / 0.3), { width: 9 }); S.label(ctx, 'THE INVENTOR', K.clamp(hd[0] + 200, 220, 780), hd[1] - 270, K.clamp((t - 42.02) / 0.35), { size: 48 }); ctx.restore(); }
  if (t >= 42.82 && t < 46.4) { const p = t < 46.0 ? K.clamp((t - 42.82) / 0.6) : 1 - K.clamp((t - 46.0) / 0.4), zz = ehE(t, 43.68, 0.8);
    thoughtCloud(ctx, 560, 300, 640, 420, t, { p, tail: [hd[0] + 10, hd[1] - 60], seed: 13, bg: '#bfe6ff', scale: K.lerp(0.36, 0.5, zz), at: [K.lerp(1050, 1560, zz), K.lerp(700, 480, zz)], inside: (c) => h3CloudEaves(c, t) }); }
}
// inside the cloud: the king's garden with himself behind the cypress (cupped ear), then Firuz's picture of the far city zooms up
function h3CloudEaves(c, t) {
  const tc = EH_T2(t); c.drawImage(ehGardenSkyPlate(), 0, -820, 2000, 2050); c.drawImage(ehPalacePlate(), 640, -240); c.drawImage(ehGardenGroundPlate(), 0, 380);
  const I = { x: 676, y: 878, s: EH_INVENTOR.s, dir: 1, lid: 0.4, mouth: 'smirk', brow: 0.4, gaze: [1, 0], handR: PERSON_HANDS.cupEar.R, handL: [-20, -100], tip: 0.06 }; person(c, ehDressP(EH_INVENTOR, I)); h3CypressFront(c);
  const F = { x: 1250, y: 822, s: EH_FIRUZ.s, dir: -1, lid: 0, mouth: 'open', talk: ehTalk(t, 42.8, 46, 3, 0.8), gaze: [-1, -0.3], handL: [-60, -200], handR: [60, -150] }; person(c, ehDressP(EH_FIRUZ, F));
  if (t >= 43.68) { const k = ehE(tc, 43.68, 0.6, 'out'); c.save(); c.globalAlpha = k; ehGrad(c, 1250, 120, 640, 560, [[0, '#8ad0ff'], [1, '#e8f6ff']]); h3Palace(c, 1640, 640, 0.95 * k, false); ehRiverTowers(c, 1310, 1820, 640, 260, 52, EH_RC_DUSK, {}); c.fillStyle = '#4ab0e0'; c.fillRect(1250, 640, 640, 40);
    c.restore(); for (const [x, y, d] of [[1640 - 285, 400, 0], [1310, 400, 0.15], [1820, 400, 0.3], [1500, 660, 0.45]]) { const u = (t - 44.0 - d) / 0.5; if (u > 0 && u < 1) ehGlint(c, x, y, 50, u); } }
}
