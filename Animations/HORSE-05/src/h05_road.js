// ===== HORSE-05: S17 days later, the road to his city (125.0 - 136.48). World units on the Library desertRoad (w 2400, city right,
// gate about x 2070), dressed as Firuz's city: the cream palace with turquoise domes behind the wall, emerald banners on the gate.
const H5_RDW = 2400, H5_RDGATE = 2070;
const H5_RDCAM = [h5K(125.0, 520, 1.05, 1060), h5K(129.6, 1000, 1.05, 1060), h5K(130.2, 660, 1.05, 1060), h5K(130.9, 720, 1.05, 1060), h5K(131.5, 1600, 1.05, 1060),
  h5K(134.6, 1800, 1.05, 1060), h5K(136.48, 1810, 1.05, 1060)];
function h5RdCam(t) { return h5Cam(H5_RDCAM, t, H5_RDW, -800, 1230); }
const H5_LEAD = H5_F([[125.0, 380], [131.4, 1300], [134.6, 1760], [136.48, 1840]]);
// caravan members: [offset, lane y, kind, seed]
const H5_CARAVAN = [[0, 905, 'firuz', 1], [-150, 935, 'princess', 2], [-330, 925, 'maid', 3], [-450, 912, 'guardA', 4], [-520, 930, 'guardB', 5], [-720, 915, 'camel', 6]];
function h5RdSky() { return ehBakeAt('h5rdsky', 3000, 1300, (c, w, h) => { ehGrad(c, 0, 0, w, h, [[0, '#2f7fe8'], [0.55, '#8ac8ff'], [1, '#fff0d0']]);
  for (const [x, y, s] of [[300, 300, 1.2], [1100, 200, 1.0], [1900, 340, 1.3], [2600, 180, 0.9]]) ehCloud(c, x, y, 420 * s, 110 * s, '#ffffff', '#cfe0f6', 8, x); }, 0.5); }
function h5RdWorld(ctx, t, cam) {
  const tc = EH_T2(t), lead = H5_LEAD(t);
  ctx.drawImage(h5RdSky(), -300 + cam.x * 0.2, -800, 3000, 1300 + 400);
  { const sx = 2050 + cam.x * 0.1 - 600, sy = -360; ehGlow(ctx, sx, sy, 300, 0.6, '#fff6d0'); celShade(ctx, ell(sx, sy, 60, 60, 30), '#fff6d0', '#ffe2a0', { off: 8, lw: 0 }); }
  for (const [x0, y, sc, v] of [[200, 60, 1.1, 8], [900, 180, 0.8, 12], [1600, 20, 1.2, 6], [2300, 140, 0.9, 10]]) { const x = x0 + cam.x * 0.3 + t * v - 1000; ctx.drawImage(ehCloudSprite(1), x - 300 * sc, y - 90 * sc, 600 * sc, 180 * sc); }
  // the hawk circling
  { const a = t * 0.9; bird(ctx, { kind: 'sparrow', x: 1200 + cam.x * 0.3 + Math.cos(a) * 260, y: 120 + Math.sin(a) * 50, s: 0.35, dir: Math.sin(a) > 0 ? -1 : 1, fly: true, flap: 0.3 * Math.sin(tc * 6), pal: 1 }); }
  // his palace behind the city wall, emerald banners
  desertRoad(ctx, { w: H5_RDW, sky: false, sun: false, t, camX: cam.x - 500 / cam.zoom, city: 'right', palms: [300, 1100, 1650], rocks: [820], thorns: [1450] });
  for (const bx of [H5_RDGATE - 130, H5_RDGATE + 130]) { seg(ctx, bx, 620, bx, 470, 5, '#a87a1c', 1); ehRibbon(ctx, bx, 476, 0.15 + 0.1 * Math.sin(t * 1.3 + bx), 90, 46, t + bx * 0.01, EH_EMERALD, { wave: 8, hz: 1.3, tip: 0.6, shade: '#126e4a', lw: 2 });
    celShade(ctx, ell(bx + 40, 498, 10, 10, 12), '#f2c040', '#c8961a', { off: 3, lw: 1.5, line: '#6a4a10' }); }
  const items = [];
  for (const [off, y, kind, sd] of H5_CARAVAN) { const xf = (tt) => H5_LEAD(tt) + off * (1 + 0.0 * sd), x = xf(t), sp = speed(H5_LEAD, t), amp = K.clamp(Math.abs(sp) / 70), ph = (x + sd * 37) / 34;
    if (kind === 'firuz' || kind === 'princess') items.push([y, () => { const H = { x, y, s: 0.95, dir: 1, ph: ph * 0.8, amp, pal: kind === 'firuz' ? 1 : 0, nod: Math.sin(tc * 4 + sd) };
      const P = kind === 'firuz' ? h5RdFz(t) : h5RdPr(t); h5Shadow(ctx, x, y, 200, 0);
      if (kind === 'firuz') { const seat = mountSeat('horse', H); ehCapeFly(ctx, seat.x - 4, seat.y - 150 * 0.95, 0.95, tc, { stream: 0.35, ang: Math.PI * 0.94, hangSide: -0.25 }); }
      rideOn(ctx, horse, H, ehDressP(kind === 'firuz' ? H5_FZR : EH_PRINCESS, { s: kind === 'firuz' ? EH_FIRUZ.s : EH_PRINCESS.s, ...P }), { name: 'horse' });
      if (kind === 'princess') { const seat = mountSeat('horse', H); ehRibbon(ctx, seat.x - 26, seat.y - 122, Math.PI / 2 + 0.9 + idleSway(tc, 83, 0.05, 2.1), 110, 30, tc, '#fffaf0', { wave: 8, hz: 1.6, tip: 0.5, shade: '#d8d2e8', lw: 2.5, line: '#8a7aa8' }); } }]);
    else if (kind === 'maid') items.push([y, () => { const Dk = { x, y, s: 0.9, dir: 1, ph: ph * 1.2, amp, pal: 0, ears: Math.sin(tc * 5) }; h5Shadow(ctx, x, y, 150, 0);
      packLoad(ctx, [{ kind: 'chest', col: '#c8703a' }], x - 70, y - 100, 0.55); rideOn(ctx, donkey, Dk, ehDressP(EH_MAID, { s: EH_MAID.s, mouth: t % 1.2 < 0.6 ? 'smile' : 'o', lid: ehLid(t, 67), gaze: [1, 0], handL: [40, -100], handR: [44, -96], tip: 0.03 * Math.sin(tc * 3) }), { name: 'donkey' });
      packLoad(ctx, [{ kind: 'chest', col: '#3a74ea' }], x + 50, y - 90, 0.5); }]);
    else if (kind === 'guardA' || kind === 'guardB') items.push([y, () => { const D = kind === 'guardA' ? EH_GUARD_A : EH_GUARD_B, P = { ...walk(xf, tc, { stride: kind === 'guardA' ? 26 : 20 }), y, s: D.s, dir: 1, lid: ehLid(t, 71 + sd), mouth: 'closed', gaze: [1, 0.1], handL: [-26, -100], handR: [40, -110], sq: breathe(tc, sd, 0.012), tip: idleSway(tc, sd, 0.02, 3) };
      P.ph += sd; h5Fig(ctx, D, P, t); const [hx, hy] = ehHandW(P, P.handR); ehSpear(ctx, hx, hy, D.s, 0.05); }]);
    else if (kind === 'camel') items.push([y, () => { const cx = x, cartX = cx - 330; h5Shadow(ctx, cx, y, 240, 0); h5Shadow(ctx, cartX, y, 260, 0);
      const top = platformCart(ctx, cartX, y, { dir: 1, wheel: (cartX) / 24 }), H = { x: cartX, y: top, s: 0.85, dir: 1 }; ebonyHorse(ctx, H); coverCloth(ctx, ehClothDraped(H, tc), {});
      const sp2 = ehHorsePt(H, [-8, -258]); cat(ctx, { x: sp2[0], y: sp2[1] + 6, s: 0.5, dir: 1, pal: 2, sit: 1 });
      h5Cord(ctx, ehHorsePt(H, [180, -60]), [cx - 140, y - 150], 18, 5);
      camel(ctx, { x: cx, y, s: 0.85, dir: 1, ph: ph * 0.7, amp, pal: 0, chew: Math.sin(tc * 6) });
      // the palace child knocks on the wood under the cloth (135.8 -)
      if (t >= 133.0) { const kx = K.lerp(H5_RDGATE, cartX + 150, ehE(t, 133.0, 2.7)), P = { x: kx, y: y + 12, s: 1, child: true, ph: kx / 14, amp: t < 135.7 ? 1 : 0, dir: -1, lid: ehLid(t, 441), mouth: 'smile', gaze: [-1, 0], handL: [-20, -110], handR: [20, -100], sq: 1, tip: 0 };
        if (t >= 135.8) { P.handRW = [cartX + 120 + 6 * Math.abs(Math.sin(EH_T3(t) * 12)), y - 120]; P.tip = -0.1; P.gaze = [-1, 0.3]; P.mouth = 'o'; }
        h5Fig(ctx, EH_CHILD, P, t); } }]); }
  // the king at the gate and his household (132.12 -)
  { const sd = 13, kx = H5_F2(t), P = { ...walk(H5_F2, tc, { stride: 22 }), y: 905, s: EH_KING.s, dir: -1, lid: ehLid(t, sd), mouth: 'smile', brow: 0, gaze: [-1, 0.1], handL: [-26, -96], handR: [26, -96], sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.02, 3.2) };
    if (t >= 132.12) { P.handL = [-80, -170]; P.handR = [80, -172]; P.mouth = 'open'; }
    items.push([905, () => h5Fig(ctx, EH_KING, P, t)]);
    [[2150, 0], [2210, 1], [2270, 3], [2000, 4], [1950, 5]].forEach(([hx, ci], i) => { const D = EH_GUESTS[ci], Q = { x: hx + 6 * Math.sin(tc + i), y: 890 - (i % 2) * 6, s: D.s || 1, dir: -1, lid: ehLid(t, 520 + i), mouth: 'smile', gaze: [-1, 0.1], handL: [-24, -100], handR: [26, -100 - (t > 132.4 + i * 0.15 ? 90 * Math.abs(Math.sin(tc * 6 + i)) : 0)], sq: breathe(tc, 520 + i, 0.016), tip: idleSway(tc, 520 + i, 0.02, 2.7 + i * 0.2) };
      items.push([Q.y, () => h5Fig(ctx, D, Q, t)]); }); }
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  desertRoad(ctx, { w: H5_RDW, front: true, t });
}
const H5_F2 = H5_F([[131.8, H5_RDGATE], [132.12, H5_RDGATE], [133.4, 1960]]);
function h5RdFz(t) { const tc = EH_T2(t), P = { lid: ehLid(t, 3, [129.18]), mouth: 'smile', gaze: [1, 0.1], handL: [50, -110], handR: [60, -112] };
  if (t >= 129.18 && t < 130.6) { P.dir = 1; P.handR = [120, -150]; P.talk = ehTalk(t, 129.18, 130.4, 7, 0.5); P.gaze = [1, -0.1]; }
  if (t >= 131.42 && t < 132.6) { P.handR = [110, -190]; P.handL = [-60, -160]; P.mouth = 'open'; }
  if (t >= 132.74 && t < 133.6) { P.handR = [10, -138]; P.gaze = [-1, 0.2]; P.dir = 1; }
  return P; }
function h5RdPr(t) { const tc = EH_T2(t), P = { lid: ehLid(t, 11, [135.12]), mouth: 'smile', gaze: [1, 0.1], handL: [50, -110], handR: [60, -112] };
  if (t >= 125.6 && t < 128.14) P.gaze = gazePlan(tc, [[125.6, [1, 0.1]], [126.4, [0.4, -0.6]], [127.2, [-0.6, -0.3]], [127.8, [1, -0.1]]]);
  if (t >= 128.14 && t < 129.18) { P.handR = [24, -168]; P.gaze = [1, -0.1]; }
  if (t >= 129.18 && t < 131.0) { P.gaze = [1, -0.4]; }
  if (t >= 132.74 && t < 133.6) { P.handR = [10, -136]; P.gaze = [1, -0.4]; }
  if (t >= 135.12) { P.dir = t < 135.2 ? 1 : -0.6; P.gaze = [-1, 0]; P.handR = [-60, -200 + 20 * Math.sin(tc * 10)]; }
  return P; }
function h5RdOver(ctx, t, cam, S) {
  // the round picture: her garden gate at home, her parents waving (133.44 - 135.8)
  if (t >= 133.44 && t < 135.9) { const p = K.clamp((t - 133.44) / 0.25) * K.clamp((135.9 - t) / 0.25), tc = EH_T2(t);
    memoryCardRound(ctx, 220, 260, 150, p, (c, r) => { c.save(); c.translate(220, 260); const cam2 = { x: 1440, y: 700, zoom: 0.62 }; c.scale(0.5, 0.5); c.translate(-1440, -720);
      princessGardenDay(c, t, cam2, { plate: 'day', butterflies: false, gate: 1 });
      for (const [k, D] of [[0, EH_QUEEN], [1, EH_FKING]]) { const w = Math.sin(tc * (k ? 7 : 10) + k); person(c, ehDressP(D, { x: 1400 + k * 90, y: 905, s: D.s, dir: 1, mouth: 'smile', lid: 0, gaze: [1, 0], handL: [-20, -100], handR: [30, -200 + 30 * w] })); if (!k && t >= 134.5) { const [hx, hy] = ehHandW({ x: 1400, y: 905, s: D.s, dir: 1 }, [30, -200 + 30 * w]); c.fillStyle = '#fffaf0'; c.fillRect(hx - 6, hy - 30, 22, 26); } }
      c.restore(); }); }
}
