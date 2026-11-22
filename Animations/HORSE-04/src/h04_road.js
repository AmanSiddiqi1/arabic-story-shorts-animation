// ===== HORSE-04: the desert road. S7 caravan to caravan (57.0 - 64.8), S8 the ornament (64.8 - 69.56, insert 65.88 - 68.7),
// S9 the well and the old man (69.56 - 75.64). Library desertRoad (w 2400, ground y 900) under our own bright noon sky.
const H4_DR = { w: 2400, palms: [300, 1100, [1910, 520, -14], [2120, 560, 18]], thorns: [760, 1650], rocks: [980, 1560] };
const H4_FZX = H4_F([[57.0, -160], [57.49, 120], [59.02, 600], [59.3, 640], [62.3, 640], [62.82, 760], [64.3, 1340], [64.8, 1400], [69.56, 1400]]);
const H4_FZX9 = H4_F([[69.56, 1700], [70.24, 1880], [74.02, 1880], [75.64, 2500]]);
const H4_RCAM = [[57.0, { x: 420, y: h4GY(1.0), zoom: 1.0 }], [59.02, { x: 640, y: h4GY(1.05), zoom: 1.05 }], [62.3, { x: 660, y: h4GY(1.05), zoom: 1.05 }], [64.3, { x: 1260, y: h4GY(1.0), zoom: 1.0 }],
  [64.8, { x: 1420, y: h4GY(1.15), zoom: 1.15 }], [69.55, { x: 1440, y: h4GY(1.15), zoom: 1.15 }], [69.56, { x: 1950, y: h4GY(1.05), zoom: 1.05 }], [73.0, { x: 1960, y: h4GY(1.05), zoom: 1.05 }], [74.0, { x: 2050, y: h4GY(0.95), zoom: 0.95 }], [75.64, { x: 2100, y: h4GY(0.95), zoom: 0.95 }]];
function h4RCam(t) { const c = h4Cam(H4_RCAM, t, H4_DR.w, -500, 1230); if (t >= 62.82 && t < 64.8) c.x = K.clamp(H4_FZX(t) - 60, 500 / c.zoom, H4_DR.w - 500 / c.zoom); c.camX = c.x - 500 / c.zoom; return c; }
// the bay horse with Firuz (prince) riding, or led / standing
function h4BayP(t) { const tc = EH_T2(t), s = 0.8, xf = t < 69.56 ? H4_FZX : H4_FZX9, sp = speed(xf, t), gal = (t >= 62.82 && t < 64.5) || t >= 74.02;
  const M = { ...walk(xf, tc, { stride: (gal ? GAIT.horse * 1.4 : GAIT.horse) * s }), y: 900, s, pal: 1, dir: 1, lid: ehLid(t, 71), tailSwish: Math.sin(tc * 2.2), earL: 0.6 + 0.3 * Math.sin(tc * 1.3), earR: 0.7, load: [{ kind: 'sack', col: '#a8703a' }] };
  if (gal) M.gallop = K.clamp(Math.abs(sp) / 400);
  if (t >= 59.02 && t < 59.5) { M.headTurn = 0; M.neck = 0.4 * Math.sin((tc - 59.02) * 14); M.snort = pulse(tc, 59.1, 0.3); }
  if (t >= 64.8 && t < 69.56) { M.headDown = t < 66 ? ehE(tc, 64.8, 0.4) : 0.3; M.amp = 0; if (t >= 69.2) { M.headDown = 0; M.neck = 0.3; M.x += 20 * pulse(tc, 69.2, 0.3); } }
  if (t >= 70.24 && t < 74.02) { M.headDown = 0.5 + 0.2 * Math.sin(tc); M.chew = Math.abs(Math.sin(tc * 4)); }
  if (t >= 74.02 && t < 74.5) M.rear = 0.4 * Math.sin(Math.PI * K.clamp((t - 74.02) / 0.48));
  return M; }
function h4RideFz(t) { return (t >= 57 && t < 65.3) || t >= 74.02; }
function h4FzPrince(t) { const tc = EH_T2(t), sd = 3, P = { lid: ehLid(t, sd, [59.02, 61.08, 64.8, 73.42]), mouth: 'closed', brow: 0.4, gaze: [1, 0.1], handL: [40, -110], handR: [50, -112], sq: breathe(tc, sd, 0.014) };
  if (t >= 59.02 && t < 59.84) { P.lurch = lurch(tc, 59.02, 0.2); P.gaze = [-0.2, 0.6]; }
  if (t >= 59.84 && t < 60.58) { P.handR = [70, -180]; P.dir = -1; P.gaze = [1, 0.4]; P.talk = ehTalk(t, 59.84, 60.5, 3, 0.7); }
  if (t >= 60.58 && t < 62.3) { P.dir = -1; P.gaze = [1, 0.5]; }
  if (t >= 62.3 && t < 62.82) { P.handR = PERSON_HANDS.chest.R; P.dir = -1; P.gaze = [1, 0.5]; P.mouth = 'smile'; }
  if (t >= 62.82) { P.lurch = 0.18; P.gaze = [1, 0]; }
  if (t >= 63.62 && t < 64.4) { P.gaze = [1, 0.3]; P.talk = ehTalk(t, 63.62, 64.1, 3, 0.6); P.handR = [70, -150]; }
  if (t >= 74.02) { P.lurch = 0.2; P.mouth = 'smile'; P.gaze = [1, -0.1]; }
  return P; }
// the caravans
const H4_C1 = H4_F([[57.0, 260], [59.0, 470], [59.4, 480], [62.5, 480], [64.8, 640]]);
const H4_C2 = H4_F([[61.0, 1640], [63.62, 1330], [63.9, 1320], [64.8, 1300]]);
function h4Caravan1(ctx, t, items) { const tc = EH_T2(t);
  [[0, 0, 71], [-250, 1, 73], [-500, 2, 75]].forEach(([off, pal, sd], i) => { const xf = (tt) => H4_C1(tt) + off, M = { ...walk(xf, tc, { stride: GAIT.camel * 0.62 }), y: 896, s: 0.62, pal, dir: 1, lid: ehLid(t, sd), saddle: true, tailSwish: Math.sin(tc * 2 + i), ears: 0.3 * Math.sin(tc + i), chew: (Math.floor(tc * 4 + i) % 2) * 0.6, neck: idleSway(tc, sd, 0.2, 3) };
    if (i === 0 && t >= 61.08 && t < 62.8) { M.headTurn = 0.3; M.neck = 0.5; }
    M.load = [[{ kind: 'chest', col: '#e8604a' }], [{ kind: 'bolt', col: '#3f7ad0' }, { kind: 'rug', col: '#ffd36a' }], [{ kind: 'jar' }, { kind: 'bolt', col: '#ff6a8a' }]][i];
    items.push([896 - i, () => { h4Shadow(ctx, M.x, 900, 240 * M.s); camel(ctx, M); }]); });
  // the driver on foot beside the lead camel
  const dx = (tt) => H4_C1(tt) + 130, D = { ...walk(dx, tc, { stride: 22 }), y: 930, s: 0.95, dir: 1, lid: ehLid(t, 87, [59.02]), sq: breathe(tc, 87, 0.012), tip: idleSway(tc, 87, 0.02, 2.5), mouth: 'smile', gaze: [1, 0], handR: [40, -110], handL: [-20, -100] };
  if (t >= 59.02) { D.dir = -1; D.gaze = [1, -0.3]; }
  if (t >= 60.58 && t < 61.08) { D.handL = [20, -232 + 6 * Math.sin(tc * 20)]; D.gaze = [0.6, -0.6]; D.mouth = 'closed'; D.lid = 0.3; }
  if (t >= 61.08 && t < 62.5) { D.dir = 1; D.handR = [110, -160]; D.mouth = 'open'; D.talk = ehTalk(t, 61.08, 61.7, 13, 0.7); D.gaze = [1, -0.1]; }
  items.push([930, () => { h4Fig(ctx, { costume: 'bedouin', s: 0.95, pal: { robe: '#f0e0c0', dot: '#d0bc98', cape: '#c89a5a', capeDot: '#a87a3a', hc: '#fff6ea', hd: '#5ab8f0' } }, D, t);
    const [hx, hy] = ehHandW(D, D.handR); seg(ctx, hx, hy + 60, hx + (D.dir > 0 ? 50 : -10), hy - 90, 6, '#8a5a3a', 2); }]); }
function h4Caravan2(ctx, t, items) { if (t < 61) return; const tc = EH_T2(t);
  [[0, 'donkey', 0, 81], [210, 'camel', 1, 83], [440, 'camel', 0, 85]].forEach(([off, kind, pal, sd], i) => { const xf = (tt) => H4_C2(tt) + off, s = kind === 'camel' ? 0.6 : 0.72;
    const M = { ...walk(xf, tc, { stride: (kind === 'camel' ? GAIT.camel : GAIT.donkey) * s }), y: 884 - i * 2, s, pal, dir: -1, lid: ehLid(t, sd), saddle: kind === 'camel', tailSwish: Math.sin(tc * 2 + i), ears: 0.3 * Math.sin(tc + i) };
    if (kind === 'camel') M.load = [{ kind: 'sack' }, { kind: 'rug', col: '#5ab8f0' }];
    items.push([884 - i * 2, () => { h4Shadow(ctx, M.x, 890, 220 * s); if (i === 0) { const P = { costume: 'merchant', s: 0.9, pal: EH_GUESTS[0].pal, lid: ehLid(t, 89), mouth: 'smile', handL: [30, -110], handR: [40, -112], sq: breathe(tc, 89, 0.02), tip: 0.02 };
      if (t >= 63.3) { P.handR = [-90, -190 + 6 * Math.sin(tc * 12)]; P.mouth = 'open'; P.talk = ehTalk(t, 63.3, 64.6, 17, 0.7); P.gaze = [-1, 0]; }
      rideOn(ctx, 'donkey', { ...M, load: ['sack'] }, P, { reins: false }); } else camel(ctx, M); }]); }); }
// the well with its frame, rope and bucket (world)
function h4Well(ctx, x, y) { celShade(ctx, [[x - 90, y], [x - 90, y - 80], [x + 90, y - 80], [x + 90, y]], '#d8c0a0', '#b0987a', { light: [-1, -1], off: 20, lw: 3.5, line: '#5a4030' });
  ctx.save(); ctx.strokeStyle = '#8a7058'; ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - 90, y - 20 - k * 20); ctx.lineTo(x + 90, y - 20 - k * 20); ctx.stroke(); } ctx.restore();
  shape(ctx, ell(x, y - 80, 92, 18, 24), '#3a2a3a', { lw: 3, line: '#5a4030' }); for (const sx of [-80, 80]) seg(ctx, x + sx, y - 80, x + sx, y - 230, 10, '#8a5a3a', 3); seg(ctx, x - 92, y - 226, x + 92, y - 226, 9, '#a8703a', 3);
  seg(ctx, x + 20, y - 226, x + 20, y - 150, 2, '#c8a878', 0); celShade(ctx, [[x + 6, y - 150], [x + 34, y - 150], [x + 30, y - 124], [x + 10, y - 124]], '#8a5a3a', '#5a3a1a', { off: 4, lw: 2, line: '#3a2414' }); }
function h4RoadWorld(ctx, t, cam) {
  const tc = EH_T2(t), cx = cam.camX;
  ehGrad(ctx, -300, -500, 3000, 1400, [[0, '#2f7fe8'], [0.55, '#8ac8ff'], [1, '#eaf6ff']]);
  ehGlow(ctx, 400 + cx * 0.85, 160, 300, 0.7, '#fff2c0'); celShade(ctx, ell(400 + cx * 0.85, 160, 56, 56, 30), '#fff6d0', '#ffe2a0', { off: 6, lw: 0 });
  for (let i = 0; i < 5; i++) { const x = ((i * 640 + t * 10) % 3000) - 300 + cx * 0.8; ctx.drawImage(ehCloudSprite(i % 3, 'day'), x, 80 + (i % 3) * 70, 420, 126); }
  // far snow mountains and the tiny far palace on the horizon (parallax 0.6), glinting from 73.42
  ctx.save(); ctx.translate(cx * 0.6, 0); h4S1Range(ctx, 790, 0.8, 1400, '#a0a8e0', '#7880c0', '#ffffff', 11); farPalaceToy(ctx, 1640, 800, 0.11, 'day');
  if (t >= 73.42 && t < 75.64) ehGlint(ctx, 1660, 740, 34, ((t - 73.42) / 0.7) % 1); ctx.restore();
  desertRoad(ctx, { ...H4_DR, sky: false, camX: cx, t });
  const items = [];
  if (t < 69.56) { h4Caravan1(ctx, t, items); h4Caravan2(ctx, t, items); }
  // the ornament glinting in the track (until he picks it up)
  if (t < 65.88) items.push([905, () => { saddleOrnament(ctx, 1500, 912, { s: 1, rot: 0.6, t: tc }); ehGlint(ctx, 1500, 905, 22, ((t * 0.9) % 1)); }]);
  // the well, the kneeling camels, the old man, the children (S9)
  if (t >= 69.56) { items.push([870, () => { for (const [x, pal] of [[1880, 2], [2180, 0]]) { h4Shadow(ctx, x, 880, 120); camel(ctx, { x, y: 880, s: 0.55, pal, dir: x < 2000 ? 1 : -1, kneel: 1, saddle: true, lid: ehLid(t, x), chew: Math.abs(Math.sin(tc * 3 + x)), neck: idleSway(tc, x, 0.2, 3) }); } h4Well(ctx, 2000, 905); }]);
    const O = { x: 2050, y: 905, s: 0.95, sit: 1, seat: 'bench', dir: -1, lid: ehLid(t, 93), mouth: 'open', gaze: [-1, 0.1], handL: [-60, -170], handR: [80, -180], sq: breathe(tc, 93, 0.016), tip: idleSway(tc, 93, 0.03, 2), talk: ehTalk(t, 70.24, 73.9, 23, 0.8) };
    const arms = Math.sin(tc * 5); O.handL = [-70 + 20 * arms, -170 - 30 * arms]; O.handR = [80 - 20 * arms, -170 + 30 * arms];
    if (t >= 72.38 && t < 73.42) { const u = (t - 72.38) / 1.04; O.handR = [K.lerp(-60, 120, u), -170 - 60 * Math.sin(Math.PI * u)]; O.handL = [-20, -110]; }
    if (t >= 73.42 && t < 74.02) { O.dir = 1; O.handR = [120, -210]; O.handL = [-20, -110]; O.gaze = [1, -0.2]; }
    if (t >= 74.02) { O.dir = 1; O.handR = [60 + 24 * Math.sin(tc * 14), -230]; O.handL = [-20, -110]; O.mouth = 'smile'; O.talk = 0; }
    items.push([906, () => { h4Fig(ctx, { costume: 'bedouin', s: 0.95, age: 0.85, pal: { robe: '#fff6ea', dot: '#d8d0c0', cape: '#5ab8f0', capeDot: '#3a8ac8', hc: '#fff6ea', hd: '#ff8ab8' } }, O, t);
      if (t >= 74.02) { const [hx, hy] = ehHandW(O, O.handR); ehRibbon(ctx, hx, hy, -Math.PI / 2 + 0.6 * Math.sin(tc * 14), 60, 26, tc, '#fff6ea', { wave: 8, hz: 3, tip: 0.6, lw: 2 }); } }]);
    for (const [i, x0] of [[0, 2140], [1, 2190]]) { const run = t >= 72.38 && t < 73.6, a = (tc - 72.38) * 5 + i * Math.PI, R = 46;
      const K_ = { x: run ? x0 + R * Math.cos(a) : x0, y: run ? 935 + 12 * Math.sin(a) : 935, s: 1, child: true, dir: run ? (Math.sin(a) > 0 ? 1 : -1) : -1, lid: ehLid(t, 95 + i), mouth: run ? 'open' : 'smile', eyes: 'open', gaze: [-1, 0.2], handL: run ? [-90, -140] : [-20, -100], handR: run ? [90, -140] : [20, -100], sq: breathe(tc, 95 + i, 0.02), tip: run ? 0.1 : idleSway(tc, 95 + i, 0.03, 2), ph: run ? tc * 14 : 0, amp: run ? 0.8 : 0 };
      items.push([K_.y + i, () => h4Fig(ctx, { costume: 'servant', child: true, pal: i ? { robe: '#ff8ab8', dot: '#d8608e', sleeve: '#ffb0d0', hc: '#fff6ea' } : { robe: '#fff6ea', dot: '#cfc6d8', sleeve: '#fff6ea', hc: '#5ab8f0' } }, K_, t)]); } }
  // Firuz: riding, dismounted (kneeling, standing), leading the horse
  const M = h4BayP(t), riding = h4RideFz(t);
  items.push([890, () => { h4Shadow(ctx, M.x, 900, 260 * M.s); if (riding) { const st = mountSeat('horse', M), pp = h4FzPrince(t); const sg = 1;
      ehCapeFly(ctx, st.x + 4, st.y - 120 * EH_FIRUZ.s * 0.85, EH_FIRUZ.s * 0.85, tc, { stream: K.clamp(Math.abs(speed(t < 69.56 ? H4_FZX : H4_FZX9, t)) / 300), ang: Math.PI * 0.94 });
      rideOn(ctx, 'horse', M, ehDressP(EH_FIRUZ, { ...pp, s: EH_FIRUZ.s * 0.85, pal: { ...EH_FIRUZ_RIDE } }), {}); turbanScrap(ctx, st.x - 6, st.y - 20, 0.5, 0.3); }
    else horse(ctx, M);
    if (M.gallop > 0.3 && Math.sin(M.ph) > 0.9) dustBurst(ctx, M.x - 120, 900, 0.1, 5, 5, 10, 60, 0.4, 2); }]);
  if (!riding) { const sd = 3, F = { x: 1470, y: 925, s: EH_FIRUZ.s, dir: -1, lid: ehLid(t, sd, [68.92]), mouth: 'closed', brow: 0.4, gaze: [-0.3, 0.8], handL: [-26, -100], handR: [30, -100], sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.02, 2.8) };
    if (t < 69.56) { if (t < 65.88) { const u = ehE(tc, 65.3, 0.4); F.kneel = u; F.x = K.lerp(1420, 1470, u); F.handR = [60, -40]; }
      else if (t < 68.92) { F.kneel = 1; F.handR = [60, -120]; }
      else { F.kneel = 1 - ehE(tc, 68.92, 0.3); F.handL = [-24, -92]; F.handR = [-14, -88]; F.dir = 1; F.gaze = [1, -0.1]; F.x += t >= 69.2 ? -14 * pulse(tc, 69.25, 0.3) : 0; } }
    else { Object.assign(F, walk(H4_FZX9, tc, { stride: 24 }), { y: 930, dir: 1, gaze: [1, 0.1] }); F.x = H4_FZX9(t) + 90; F.handL = [-80, -130];
      if (t >= 70.24) { F.dir = -1; F.amp = 0; F.x = 1960; F.handR = PERSON_HANDS.cupEar.R; F.gaze = lookAt(ehHeadOf(F), [2050, 700]); F.tip = 0.06; }
      if (t >= 72.38 && t < 74.02) { F.handR = [30, -100]; F.gaze = t < 73.42 ? [1, -0.5] : [1, -0.2]; F.dir = 1; F.mouth = 'smile'; } }
    items.push([F.y, () => { h4Fig(ctx, EH_FIRUZ, F, t, { cape: true }); turbanScrap(ctx, F.x - 14, F.y - 92 * F.s + 40 * (F.kneel || 0), 0.5, 0.2);
      if (t >= 68.92 && t < 69.56) saddleOrnament(ctx, F.x - 26, F.y - 82, { s: 0.8, t: tc, swing: swing(tc, 69.2, 0.5, 2) }); }]); }
  items.sort((a, b) => a[0] - b[0]); for (const [, f] of items) f();
  desertRoad(ctx, { ...H4_DR, front: true, camX: cx });
}
function h4RoadOver(ctx, t, cam, S) {
  const kk = t < 57.94 ? 0 : t < 61.72 ? 1 : t < 64.14 ? 1 + ehE(t, 61.72, 0.5) : t < 73.42 ? 2 + ehE(t, 64.14, 0.5) : 3 + ehE(t, 73.42, 0.6);
  routeMap(ctx, t < 57.94 ? 0 : kk, t, { alpha: K.clamp((t - 57.94) / 0.3) * K.clamp((75.4 - t) / 0.3) });
  const M = h4BayP(t), st = mountSeat('horse', M), fh = h4P(st.x, st.y - 190 * 0.8, cam);
  if (t >= 59.84 && t < 60.9) iconBalloon(ctx, Math.max(200, fh[0] + 120), 360, 300, 210, K.clamp((t - 59.84) / 0.3) * K.clamp((60.9 - t) / 0.2), [fh[0] + 20, fh[1] - 20], (c, w, h) => { ehGrad(c, 0, 0, w, h, [[0, '#8ac8ff'], [1, '#eaf6ff']]); ehHorseSil(c, w / 2 - 10, h - 40 - 10 * Math.sin(t * 4), 0.38, { riders: 2, rot: -0.15 }); });
  if (t >= 61.08 && t < 62.3) { const [x, y] = h4P(H4_C1(t) + 130, 700, cam); S.arrow(ctx, [x + 60, y - 60], [Math.min(960, x + 360), y - 80], K.clamp((t - 61.2) / 0.4), { width: 8, bend: 0.1 }); }
  if (t >= 69.56) { const oh = h4P(2050, 760, cam);
    if (t >= 71.0 && t < 71.58) iconBalloon(ctx, oh[0] - 90, 280, 260, 200, K.clamp((t - 71.0) / 0.25), [oh[0] - 10, oh[1] - 20], (c, w, h) => { ehGrad(c, 0, 0, w, h, [[0, '#ffe8c0'], [1, '#ffd890']]); c.save(); c.translate(w / 2, h - 10); c.scale(0.9, 0.9);
      shape(c, [[-40, 0], [-36, -90], [-60, -140], [-20, -200], [30, -190], [50, -130], [36, -90], [40, 0]], EH_SAFFRON, { lw: 4, line: '#8a5a10' }); ehRibbon(c, -40, -150, Math.PI * 0.9, 60, 14, t, EH_SAFFRON, { wave: 6, hz: 2, tip: 0.8, shade: '#c07a10' }); c.restore(); });
    if (t >= 71.58 && t < 73.5) iconBalloon(ctx, oh[0] - 90, 280, 260, 200, 1 * K.clamp((73.5 - t) / 0.2), [oh[0] - 10, oh[1] - 20], (c, w, h) => { ehGrad(c, 0, 0, w, h, [[0, '#8ac8ff'], [1, '#ffe8c0']]);
      const u = K.clamp((t - 71.58) / 1.6); ehHorseSil(c, K.lerp(30, w - 60, u), h - 30 - 40 * Math.sin(Math.PI * u), 0.26, { riders: 2, rot: -0.3 + 0.6 * u }); });
    h4Say(ctx, S, [[72.0, 'IT FLEW THAT WAY!']], t, oh, { gone: 73.9, size: 46, up: 140, dx: -60 }); }
}
