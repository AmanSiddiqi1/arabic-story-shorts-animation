// ===== AN-084 Ma'an and the Bedouin: world draw for both halves, camera, lettering, panel, sound =====
const AN84_DUR = 178.6;            // narration 175.6 + 3.0 s THE END hold (plan duration + end_hold)
const AN84_HALL_T = 89.64;         // cut from the desert to the palace (under the whip wipe)
const AN84_B = (t, a, d, e = 'inOut') => K.ease[e](K.clamp((t - a) / d));
const an84P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- camera ----------
const AN84_CAM_D = [[8.3, { x: 1600, y: 680, zoom: 1.3 }], [9.6, { x: 1600, y: 680, zoom: 1.3 }], [10.9, { x: 1780, y: 660, zoom: 1.4 }], [11.4, { x: 1710, y: 650, zoom: 1.55 }],
  [13.5, { x: 1710, y: 650, zoom: 1.55 }], [13.85, { x: 1880, y: 740, zoom: 2.3 }], [15.0, { x: 1880, y: 740, zoom: 2.3 }], [15.4, { x: 1710, y: 650, zoom: 1.55 }],
  [20.04, { x: 1710, y: 650, zoom: 1.55 }], [20.6, { x: 1740, y: 570, zoom: 1.3 }], [30.0, { x: 1740, y: 545, zoom: 1.3 }], [33.4, { x: 1740, y: 545, zoom: 1.3 }],
  [33.65, { x: 1560, y: 570, zoom: 2.1 }], [34.9, { x: 1560, y: 570, zoom: 2.1 }], [35.4, { x: 1740, y: 550, zoom: 1.3 }], [41.02, { x: 1740, y: 550, zoom: 1.3 }],
  [41.5, { x: 1700, y: 640, zoom: 1.6 }], [42.6, { x: 1700, y: 640, zoom: 1.6 }], [42.85, { x: 1560, y: 570, zoom: 2.2 }], [45.4, { x: 1560, y: 570, zoom: 2.2 }],
  [45.8, { x: 1700, y: 640, zoom: 1.6 }], [50.4, { x: 1700, y: 640, zoom: 1.6 }], [50.9, { x: 1710, y: 590, zoom: 1.55 }], [56.4, { x: 1710, y: 590, zoom: 1.55 }],
  [57.85, { x: 1830, y: 600, zoom: 2.05 }], [58.0, { x: 1830, y: 600, zoom: 2.05 }], [58.5, { x: 1710, y: 600, zoom: 1.5 }], [72.48, { x: 1710, y: 600, zoom: 1.5 }],
  [72.8, { x: 1860, y: 570, zoom: 2.0 }], [74.1, { x: 1860, y: 570, zoom: 2.0 }], [74.5, { x: 1710, y: 600, zoom: 1.5 }], [78.3, { x: 1710, y: 600, zoom: 1.5 }],
  [79.0, { x: 1640, y: 530, zoom: 1.5 }], [83.3, { x: 1640, y: 530, zoom: 1.5 }], [84.0, { x: 1700, y: 630, zoom: 1.6 }], [86.9, { x: 1700, y: 630, zoom: 1.6 }],
  [88.0, { x: 1800, y: 680, zoom: 1.1 }], [89.4, { x: 1800, y: 680, zoom: 1.1 }], [89.64, { x: 2150, y: 680, zoom: 1.15 }]];
const AN84_CAM_H = [[89.64, { x: 300, y: 650, zoom: 1.7 }], [96.3, { x: 300, y: 650, zoom: 1.7 }], [96.32, { x: 260, y: 660, zoom: 1.6 }], [99.14, { x: 260, y: 660, zoom: 1.6 }],
  [100.0, { x: 520, y: 620, zoom: 1.02 }], [100.34, { x: 520, y: 620, zoom: 1.02 }], [101.0, { x: 690, y: 590, zoom: 1.45 }], [103.5, { x: 690, y: 590, zoom: 1.45 }],
  [104.1, { x: 640, y: 620, zoom: 1.15 }], [105.6, { x: 640, y: 620, zoom: 1.15 }], [106.0, { x: 580, y: 620, zoom: 1.5 }], [107.2, { x: 580, y: 620, zoom: 1.5 }],
  [107.5, { x: 430, y: 690, zoom: 2.3 }], [109.8, { x: 430, y: 690, zoom: 2.3 }], [110.2, { x: 580, y: 640, zoom: 1.5 }], [118.2, { x: 580, y: 640, zoom: 1.5 }],
  [118.6, { x: 560, y: 600, zoom: 1.5 }], [125.06, { x: 560, y: 600, zoom: 1.5 }], [125.4, { x: 420, y: 590, zoom: 1.9 }], [127.4, { x: 420, y: 590, zoom: 1.9 }],
  [127.8, { x: 600, y: 630, zoom: 1.5 }], [128.78, { x: 600, y: 630, zoom: 1.5 }], [129.1, { x: 440, y: 670, zoom: 2.2 }], [131.85, { x: 440, y: 670, zoom: 2.2 }],
  [132.15, { x: 740, y: 640, zoom: 2.4 }], [133.7, { x: 740, y: 640, zoom: 2.4 }], [134.0, { x: 600, y: 640, zoom: 1.3 }], [136.8, { x: 600, y: 640, zoom: 1.3 }],
  [137.2, { x: 580, y: 640, zoom: 1.5 }], [141.0, { x: 580, y: 640, zoom: 1.5 }], [141.35, { x: 210, y: 680, zoom: 1.8 }], [143.56, { x: 210, y: 680, zoom: 1.8 }],
  [144.2, { x: 520, y: 650, zoom: 1.4 }], [147.12, { x: 520, y: 650, zoom: 1.4 }], [147.4, { x: 720, y: 620, zoom: 1.7 }], [149.0, { x: 720, y: 620, zoom: 1.7 }],
  [149.6, { x: 520, y: 620, zoom: 1.05 }], [150.4, { x: 520, y: 620, zoom: 1.05 }], [150.8, { x: 760, y: 640, zoom: 1.5 }], [154.1, { x: 760, y: 640, zoom: 1.5 }],
  [154.6, { x: 600, y: 640, zoom: 1.2 }], [157.4, { x: 600, y: 640, zoom: 1.2 }], [157.8, { x: 540, y: 570, zoom: 1.2 }], [162.74, { x: 540, y: 570, zoom: 1.2 }],
  [163.2, { x: 520, y: 640, zoom: 1.35 }], [171.0, { x: 520, y: 640, zoom: 1.35 }], [171.15, { x: 520, y: 630, zoom: 1.43 }], [172.34, { x: 520, y: 630, zoom: 1.43 }],
  [173.2, { x: 330, y: 660, zoom: 1.4 }], [174.5, { x: 330, y: 660, zoom: 1.4 }], [175.3, { x: 500, y: 620, zoom: 1.0 }], [AN84_DUR, { x: 500, y: 620, zoom: 1.0 }]];
function an84Cam(t) {
  let c, ww = 1000;
  if (t < AN84_HALL_T) {
    ww = AN84_SW;
    if (t < 4.5) c = { x: 500, y: 640, zoom: 1.0 };
    else if (t < 8.3) { const hx = an84HX(t), gx = t < 7.0 ? an84GX(Math.max(t, 2.5)) : 1900, track = t < 7.2 ? (hx + 60 + gx) / 2 : hx + 160, k = an84E(t, 4.5, 0.9);
      c = { x: K.lerp(500, track, k), y: 660, zoom: K.lerp(1.0, 1.25, k) + 0.2 * an84E(t, 6.4, 0.8) }; if (t > 7.6) { const k2 = an84E(t, 7.6, 0.7); c = { x: K.lerp(c.x, 1600, k2), y: K.lerp(660, 680, k2), zoom: K.lerp(c.zoom, 1.3, k2) }; } }
    else c = K.camAt(AN84_CAM_D, t);
  } else c = K.camAt(AN84_CAM_H, t);
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, ww - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z };
}

// ---------- desert world ----------
function an84DesertWorld(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom, out = {};
  desertRoad(ctx, { w: AN84_SW, camX, t, thorns: [560], rocks: [1080, 2320], palms: [[2190, 500, -16]], milestones: [960], farCity: 1300 });
  out.city = [1300 + camX * 0.6, 640];
  an84Men(ctx, t);
  out.gz = an84Gazelle(ctx, t);
  for (const f of AN84_FALLS_H) dustBurst(ctx, f.x - 70, 902, t - f.t, 4, 7, 16, 34, 0.55, Math.round(f.t * 10));
  for (const f of AN84_FALLS_D) dustBurst(ctx, f.x + 40, 902, t - f.t, 3, 5, 10, 20, 0.4, Math.round(f.t * 10) + 3);
  if (t > 7.38 && t < 8.2) dustBurst(ctx, 1960, 840, t - 7.45, 6, 10, 26, 50, 0.7, 77);
  const HP = an84HorseD(t), DP = an84DonkeyD(t), seatH = mountSeat('horse', HP), seatD = mountSeat('donkey', DP);
  const mh = an84RiderHead(seatH, 1, AN84_MPS), bh = an84RiderHead(seatD, -1, AN84_BPS);
  const cloudOn = an84In(t, 21.6, 40.6) || an84In(t, 78.32, 83.7), cloudPt = t < 60 ? [1720, 330] : [1530, 290];
  const tagHead = t > 51 ? an84ColD(Math.min(6, AN84_POPS_D.filter((p) => t >= p).length - 1)) : null;
  out.mh = mh; out.bh = bh; out.seatD = seatD; out.seatH = seatH;
  // the horse and Ma'an (bow and quiver behind him)
  const MP = an84MaanD(t, mh, bh, out.gz || [2200, 700], cloudOn ? cloudPt : null);
  rideOn(ctx, (c, P) => { horse(c, P); an84Bow(c, seatH.x - 26, seatH.y - 92, 0.8, -0.5); for (let k = 0; k < 3; k++) seg(c, seatH.x - 70 + k * 6, seatH.y + 14, seatH.x - 92 + k * 8, seatH.y - 52, 4, k === 1 ? C.red : AN84_WEAVE, 2); }, HP, MP, { name: 'horse' });
  // the donkey with its pannier, and the Bedouin
  const BP = an84BedD(t, bh, mh, cloudOn ? cloudPt : null, tagHead);
  const cucIn = an84In(t, 28.98, 33.3);
  rideOn(ctx, (c, P) => { donkey(c, P); an84Pannier(c, seatD, -1, AN84_DS, { n: cucIn ? 5 : 6, wob: swing(t, 13.6, 0.35) + swing(t, 11.86, 0.25) }); }, DP, BP, { name: 'donkey' });
  if (cucIn) { const hp = an84RiderPt(seatD, -1, AN84_BPS, ...(t < 31.0 ? [56, -214] : [90, -160])); const lift = an84E(t, 28.98, 0.4); an84Cucumber(ctx, hp[0], hp[1] - 12 * lift, 0.9, t < 31 ? -1.2 : -0.2); if (an84In(t, 29.4, 29.9)) an84Glint(ctx, hp[0] - 30, hp[1] - 40, 22, (t - 29.4) / 0.5); out.cuc = hp; }
  if (an84In(t, 13.6, 15.0)) for (let k = 0; k < 3; k++) an84Glint(ctx, seatD.x + 40 + k * 26, seatD.y + 6 - (k % 2) * 18, 16, (t - 13.6 - k * 0.3) / 0.45);
  if (an84In(t, 56.6, 57.9)) an84Sweat(ctx, bh[0] + 30, bh[1] - 20, (t - 56.6) / 1.2);
  if (an84In(t, 68.9, 70.0)) an84Sweat(ctx, bh[0] - 28, bh[1] - 22, (t - 68.9) / 1.0);
  if (t > 86.6 && t < 89.0) dustBurst(ctx, 1700, 860, t - 86.7, 9, 18, 46, 120, 1.6, 91);
  // thought clouds
  if (an84In(t, 21.6, 40.6)) { const p = Math.min(K.clamp((t - 21.6) / 0.55), 1 - K.clamp((t - 40.2) / 0.3)), f = K.clamp((t - 30.98) / 0.4);
    thoughtCloud(ctx, 1720, 330, 520, 300, t, { p, tail: [bh[0] + 10, bh[1] - 50], scale: 0.32, at: [500, 700], inside: (c, tt) => { if (f < 1) { c.save(); c.globalAlpha *= 1 - f; an84CloudDrought(c, tt); c.restore(); } if (f > 0) { c.save(); c.globalAlpha *= f; an84CloudEmir(c, tt); c.restore(); } } }); }
  if (an84In(t, 78.32, 83.7)) { const p = Math.min(K.clamp((t - 78.32) / 0.55), 1 - K.clamp((t - 83.32) / 0.3));
    thoughtCloud(ctx, 1530, 290, 440, 280, t, { p, tail: [bh[0] - 10, bh[1] - 50], scale: 0.3, at: [500, 700], inside: an84CloudHall }); }
  // the price ladder (column above the Bedouin, right-aligned)
  if (t >= 51.0 && t < 87.0) { const fade = 1 - K.clamp((t - 86.4) / 0.5);
    for (let i = 0; i < 7; i++) { const st = an84TagState(t, AN84_POPS_D, i, { wobble: i === 0 ? 55.74 : null }); if (!st) continue; const [cx, cy] = an84ColD(i);
      const red = i === 6 && t >= 77.3, lock = i === 6 ? settleTo(t, 77.3, 1, 1.15, 0.3, 0.1) - (t > 77.3 ? 0.15 * an84E(t, 77.65, 0.3) : 0) : 1;
      ctx.save(); ctx.globalAlpha *= fade; an84Tag(ctx, cx, cy + st.drop, i, { p: st.p, strike: st.strike, alpha: st.alpha, rays: st.rays, rot: st.rot, red, s: 0.75 * lock, sub: i === 0 ? 'DINARS' : null }); ctx.restore(); } }
  return out;
}

// ---------- hall world ----------
function an84HallWorld(ctx, t, cam) {
  const out = {};
  const MH0 = t >= 96.32 ? [AN84_TX + 22, AN84_SITY - 166] : [an84MaanX7(t), 711];
  const BP = an84BedHall(t, MH0, null), bh = BP.head; out.bh = bh;
  const tags = []; for (let i = 0; i < 7; i++) tags.push(an84HallTag(t, i));
  const tagPts = tags.map((g, i) => (g ? [g.x, g.y] : an84ColH(i)));
  const BPx = an84BedHall(t, MH0, tagPts);
  const DK = an84DonkeyHall(t), G = an84Guard(t, t < 96.32 ? an84MaanX7(t) : AN84_TX, bh);
  const treas = an84Treasurer(t, MH0, bh), MP = an84MaanHall(t, bh, G.head, treas ? [treas.x, 720] : null);
  out.mh = MH0; out.guard = G.head; out.treas = treas;
  const drawDonk = (c) => { const head = [DK.x + 0.9 * 150, 900 - 0.9 * 172]; donkey(c, DK); an84Pannier(c, mountSeat('donkey', DK), 1, 0.9, { fill: t >= 172.74 ? 'coin' : 'cuc', n: 2 });
    if (t >= 97.42) BEAST.line(c, [[150, 790], [K.lerp(150, head[0], 0.5), K.lerp(790, head[1], 0.5) + (DK.front ? 0 : 14)], head], 4, '#7a4212'); out.dh = head; };
  palaceHall(ctx, { t, throne: false, cushions: [], dais: [560, 900, AN84_DAIS], behind: (c) => { if (t >= 96.32 && !DK.front) drawDonk(c); if (t >= 96.32 && t < 98.1) person(c, BPx); } });
  // the donkey (drawn before the people so the Bedouin and the guard pass in front of it) with its head inside the door (body clipped behind the wall)
  if (DK.front) { ctx.save(); ctx.beginPath(); ctx.rect(40, 0, 1000, 1230); ctx.clip(); drawDonk(ctx); ctx.restore(); if (an84In(t, 143.56, 144.6)) dustBurst(ctx, DK.x + 70, 902, t - 144.1, 4, 5, 10, 18, 0.5, 33); }
  // throne group (tips back about its rear base point at 149)
  const rot = an84ThroneRot(t);
  ctx.save(); ctx.translate(AN84_PIVOT[0], AN84_PIVOT[1]); ctx.rotate(rot); ctx.translate(-AN84_PIVOT[0], -AN84_PIVOT[1]);
  an84ThroneBack(ctx, AN84_TX, AN84_DAIS);
  if (t >= 96.32) { person(ctx, MP); an84ThroneArms(ctx, AN84_TX, AN84_DAIS);
    const mw = (hx, hy) => [AN84_TX - (hx - 22), AN84_SITY + hy + 23];
    if (an84In(t, 112.32, 113.3)) { const p = mw(...MP.handR); an84Cucumber(ctx, p[0] - 10, p[1] - 6, 0.8, 0.5 + 0.2 * Math.sin(t * 5)); if (an84In(t, 112.6, 113.1)) an84Glint(ctx, p[0] - 40, p[1] - 30, 18, (t - 112.6) / 0.5); }
    if (t >= 173.8) { const p = mw(...MP.handL); an84Cucumber(ctx, p[0] - 4, p[1] - 4, 0.7, -1.2); } }
  else an84ThroneArms(ctx, AN84_TX, AN84_DAIS);
  ctx.restore();
  if (t < 96.32) person(ctx, MP);
  // the guard with his spear
  an84Spear(ctx, G.spear.x, G.spear.y, 250, G.spear.rot, an84In(t, 141.92, 147) ? Math.sin(t * 9) : 0); person(ctx, G.P);
  // courtiers, treasurer
  if (t >= 96.32) for (let i = 1; i >= 0; i--) person(ctx, an84Courtier(t, i, bh, MH0));
  if (treas) { person(ctx, treas); const tw = (hx, hy) => [treas.x - 0.95 * hx, 900 + 0.95 * hy]; if (t < 162.74 || t >= 172.0) an84Scroll(ctx, tw(...treas.handL), null, false); else an84Scroll(ctx, tw(...treas.handL), tw(...treas.handR), true); }
  // coin pile, basket on the dais edge
  const landed = AN84_DROPS.filter((d) => t >= d + 0.35).length, grow = landed ? AN84_TOTALS[landed - 1] / 2180 : 0, prev = landed > 1 ? AN84_TOTALS[landed - 2] / 2180 : 0;
  const fill = landed ? K.lerp(prev, grow, an84E(t, AN84_DROPS[landed - 1] + 0.35, 0.25, 'out')) : 0; an84CoinPile(ctx, AN84_PILE[0], AN84_PILE[1], fill); out.fill = fill;
  if (t >= 111.62 && t >= 96.32) an84Basket(ctx, 592, AN84_DAIS, 0.6, { n: t >= 112.32 ? 5 : 6, handle: true });
  // the Bedouin (basket carried, bags, caught coin)
  if (t >= 98.1) person(ctx, BPx);
  const hR = an84StandPt(BPx, ...BPx.handR), hL = an84StandPt(BPx, ...BPx.handL);
  if (t >= 96.32 && t < 111.62) { const bx = (hR[0] + hL[0]) / 2, by = Math.max(hR[1], hL[1]) + 44 + 6 * pulse(t, 99.14, 0.4); if (t >= 98.1) an84Basket(ctx, bx, by, 0.6, { handle: true }); }
  if (t >= 172.34) { an84Bag(ctx, hR[0] + 6, hR[1] + 60, 0.8, { rot: -0.2 }); an84Bag(ctx, hL[0] - 6, hL[1] + 60, 0.8, { rot: 0.2 }); }
  if (an84In(t, 170.12, 171.1)) { const u = K.clamp((t - 170.12) / 0.4), a = [AN84_PILE[0], 790], b = an84StandPt(BPx, 66, -204), x = K.lerp(a[0], b[0], u), y = K.lerp(a[1], b[1], u) - 120 * Math.sin(Math.PI * u);
    an84Coin(ctx, t < 170.6 ? x : an84StandPt(BPx, ...BPx.handR)[0], t < 170.6 ? y : an84StandPt(BPx, ...BPx.handR)[1] - 12, 13, Math.cos(t * 14)); }
  // tags and counter
  for (let i = 0; i < 7; i++) { const g = tags[i]; if (g) an84Tag(ctx, g.x, g.y, i, g); }
  for (let i = 0; i < 7; i++) { const d = t - AN84_DROPS[i] - 0.35; if (d > 0 && d < 0.6) for (let k = 0; k < 6; k++) { const a = -Math.PI * (0.15 + 0.7 * k / 5), u = d / 0.6; an84Coin(ctx, AN84_PILE[0] + Math.cos(a) * 90 * u, AN84_PILE[1] - 60 * fill + Math.sin(a) * 90 * u + 160 * u * u, 10, Math.cos(t * 12 + k)); } }
  an84Counter(ctx, t, landed);
  return out;
}
// one tag in the hall: column (S9-S10), the row (S11), the drop into the pile (S12)
function an84HallTag(t, i) {
  if (t < AN84_POPS_H[i]) return null;
  const st = an84TagState(t, AN84_POPS_H, i), [cx, cy] = an84ColH(i), red = i === 6 && t >= 126.62 && t < 159.0 + i * 0.17;
  const g = { x: cx, y: cy + st.drop, p: st.p, strike: st.strike, alpha: st.alpha, rays: st.rays, red, s: 0.55 * (i === 6 ? settleTo(t, 126.62, 1, 1.12, 0.3, 0.1) - (t > 126.62 ? 0.12 * an84E(t, 126.95, 0.3) : 0) : 1) };
  const tf = 157.4 + i * 0.06;
  if (t >= tf) { const u = an84E(t, tf, 0.6), rx = an84RowX(i) + (i === 6 ? 40 * an84Env(t, 160.9, 161.5, 0.2) : 0), ry = 330; g.x = K.lerp(g.x, rx, u); g.y = K.lerp(g.y, ry, u) - 40 * Math.sin(Math.PI * u); g.rot = (i === 6 ? 0.2 * an84Env(t, 160.9, 161.5, 0.2) : 0); g.s = 0.55; }
  const tp = 158.94 + i * 0.17;
  if (t >= tp) { const v = an84E(t, tp, 0.18); g.strike = i === 6 ? 0 : 1 - v; g.alpha = K.lerp(st.alpha, 1, v); g.s = 0.55 * (1 + 0.12 * pulse(t, tp, 0.3)); }
  const td = AN84_DROPS[i];
  if (t >= td) { const u = K.clamp((t - td) / 0.35); if (u >= 1) return null; g.x = K.lerp(g.x, AN84_PILE[0], u); g.y = K.lerp(g.y, AN84_PILE[1] - 60, u * u); g.s *= 1 - 0.4 * u; g.rot = 0.6 * u * (i % 2 ? 1 : -1); }
  return g;
}
// running total box (world, top centre under the row)
function an84Counter(ctx, t, landed) {
  if (t < 164.47 || t > 176.6) return; const a = 1 - K.clamp((t - 176.0) / 0.6), p = K.ease.back(K.clamp((t - 164.47) / 0.35)), stamp = t >= 171.0, val = landed ? AN84_TOTALS[landed - 1] : 0;
  const txt = stamp ? '2180 DINARS' : String(val), fs = stamp ? 64 : 70, flash = pulse(t, 167.87, 0.3) > 0.2;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(500, 450); const k = p * (stamp ? settleTo(t, 171.0, 1.4, 1, 0.3, 0.15) : 1) * (1 + 0.08 * AN84_DROPS.reduce((s, d) => s + pulse(t, d + 0.35, 0.2), 0)); ctx.scale(k, k);
  ctx.font = K.font(fs, BF, 400); const w = Math.max(200, ctx.measureText(txt).width + 60), h = fs * 1.4;
  if (stamp) for (let j = 0; j < 14; j++) { const an = j / 14 * Math.PI * 2; seg(ctx, Math.cos(an) * w * 0.55, Math.sin(an) * h * 0.6, Math.cos(an) * w * 0.72, Math.sin(an) * h * 0.95, 8, C.yellow, 3); }
  ctx.fillStyle = 'rgba(20,20,20,0.85)'; ctx.fillRect(-w / 2 + 9, -h / 2 + 9, w, h);
  shape(ctx, K.rectPts(-w / 2, -h / 2, w, h), flash ? C.white : C.yellow, { lw: 7, seed: 81, dot: C.red, pitch: 9, rad: 0.2, da: 0.35 });
  if (stamp) ink(ctx, K.rectPts(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20), 4, 82);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = fs * 0.12; ctx.strokeStyle = C.white; ctx.strokeText(txt, 0, 4); ctx.fillStyle = C.black; ctx.fillText(txt, 0, 4);
  ctx.restore();
}

// ---------- lettering (panel units) ----------
function an84Over(ctx, t, cam, S, W) {
  const P = (x, y) => an84P(x, y, cam);
  const lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = an84Env(t, a, b, 0.2); S.label(ctx, txt, x, y, AN84_B(t, a, 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = an84Env(t, a, b, 0.2); S.arrow(ctx, a0, a1, AN84_B(t, a, 0.4), { width: 16, ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 80, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = an84Env(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  if (t < AN84_HALL_T) {
    if (t < 2.7) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 2.3) / 0.4); S.title(ctx, "MA'AN AND THE BEDOUIN", 500, 150, AN84_B(t, 0.1, 0.8), { size: 56, align: 'center' }); ctx.restore(); }
    if (W.mh && an84In(t, 0.5, 2.6)) { const h = P(...W.mh); lab("MA'AN", h[0] + 40, h[1] - 260, 0.5, 2.6); arr([h[0] + 30, h[1] - 220], [h[0] + 6, h[1] - 60], 0.6, 2.6); }
    if (an84In(t, 4.14, 5.9)) { const m = P(285, 640); lab('HIS MEN', m[0] + 150, m[1] - 210, 4.14, 5.9); arr([m[0] + 120, m[1] - 170], [m[0] + 10, m[1] - 20], 4.2, 5.9); }
    if (an84In(t, 10.34, 12.6) && W.bh) { const h = P(...W.bh); lab('A BEDOUIN', h[0] - 20, h[1] - 300, 10.34, 12.6); arr([h[0] - 10, h[1] - 260], [h[0], h[1] - 70], 10.4, 12.6, { bend: -0.1 }); }
    if (an84In(t, 13.6, 15.1) && W.seatD) { const s = P(W.seatD.x + 50, W.seatD.y + 160); lab('FRESH CUCUMBERS', 500, Math.min(1120, s[1] + 40), 13.6, 15.1, { size: 46 }); }
    if (an84In(t, 18.5, 20.0) && W.mh) { const h = P(...W.mh); bubble(ctx, h[0] + 170, h[1] - 230, 300, 120, h[0] + 40, h[1] - 50, K.clamp((t - 18.5) / 0.3), 'WHERE TO?', { size: 46 }); }
    const cp = P(1720, 330), cs = cam.zoom;
    lab('DROUGHT', cp[0] + 60 * cs, cp[1] - 140 * cs, 23.68, 25.7, { size: 44, fill: C.yellow });
    if (an84In(t, 24.3, 25.7)) { const sp = P(1720 + (250 - 500) * 0.32, 330 + (420 - 700) * 0.32); lab(t < 24.8 ? '1 YEAR' : '2 YEARS', sp[0], sp[1] + 10, 24.3, 25.7, { size: 40 }); }
    lab('A GOOD SEASON', cp[0], cp[1] - 150 * cs, 26.8, 28.7, { size: 42 });
    if (W.cuc && an84In(t, 29.64, 30.9)) { const c2 = P(...W.cuc); word('EARLY!', c2[0] - 150, c2[1] - 40, 29.64, 30.9, 66, { rot: -0.08 }); }
    if (an84In(t, 32.74, 35.2)) { const e = P(1720 + (420 - 500) * 0.32, 330 + (560 - 700) * 0.32); lab("PRINCE MA'AN", cp[0] + 150 * cs, cp[1] + 40 * cs, 32.74, 35.2, { size: 44 }); arr([cp[0] + 90 * cs, cp[1] + 30 * cs], [e[0] + 40, e[1]], 32.8, 35.2, { bend: 0.2 }); }
    if (an84In(t, 42.64, 44.6) && W.mh) { const h = P(...W.mh); lab('SHH! HE IS THE PRINCE', 500, 170, 42.64, 44.6, { size: 46 }); arr([500, 210], [h[0] + 20, h[1] - 110], 42.7, 44.6, { bend: -0.15 }); }
    if (an84In(t, 72.48, 74.2)) { const g = P(...an84ColD(6)); lab('LAST PRICE', g[0] + 60, g[1] - 170, 72.6, 74.2, { size: 44 }); arr([g[0] + 40, g[1] - 130], [g[0] + 4, g[1] - 50], 72.6, 74.2, { bend: -0.15 }); }
    word('NOT ONE LESS!', 400, 200, 77.76, 79.4, 78, { rot: -0.05, fill: C.red });
    if (an84In(t, 84.2, 86.2) && W.mh) { const h = P(...W.mh), u = K.clamp((t - 84.2) / 2); word('HA HA!', h[0] + 20, h[1] - 170 - 60 * u, 84.2, 86.2, 84, { rot: -0.1, fill: C.yellow }); }
    if (an84In(t, 88.9, 89.64)) { const c3 = P(...W.city); lab('HIS PALACE', c3[0] - 60, c3[1] - 200, 88.9, 89.64, { size: 42 }); arr([c3[0] - 40, c3[1] - 160], [c3[0], c3[1] - 40], 88.95, 89.64); }
  } else {
    if (an84In(t, 89.9, 91.8)) { const h = P(an84MaanX7(t), 711); lab("PRINCE MA'AN", h[0] + 60, h[1] - 360, 89.9, 91.8); arr([h[0] + 60, h[1] - 320], [h[0] + 50, h[1] - 150], 90.0, 91.8); }
    if (an84In(t, 93.88, 95.72)) { const g = P(300, 711), cx = g[0] + 30, cy = g[1] - 330, k = K.clamp((t - 93.88) / 0.3);
      bubble(ctx, cx, cy, 300, 200, g[0] + 10, g[1] - 90, k, '');
      if (k >= 0.6) { an84Cucumber(ctx, cx - (t >= 95.02 ? 60 : 0), cy, 1.5, -0.3); if (t >= 95.02) { ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, 140, 92, 0, 0, 7); ctx.clip(); donkey(ctx, { x: cx - 40, y: cy + 140, s: 0.45, dir: 1, seed: 45, earL: 1, earR: 1, mouth: 'smile' }); ctx.restore(); } } }
    if (an84In(t, 101.94, 103.5)) { const th = P(AN84_TX, AN84_DAIS - 360); lab('THE THRONE', th[0] - 30, th[1] - 70, 101.94, 103.5); }
    if (an84In(t, 123.48, 124.8)) { const g = P(...an84ColH(3)); word('AGAIN?!', g[0] + 220, g[1] - 60, 123.48, 124.8, 72, { rot: 0.06, fill: C.yellow }); }
    if (W.bh) { const h = P(...W.bh); word('!', h[0] + 70, h[1] - 120, 131.1, 132.0, 130, { fill: C.yellow }); }
    if (an84In(t, 133.92, 137.8)) { const p = Math.min(K.clamp((t - 133.92) / 0.35), 1 - K.clamp((t - 137.5) / 0.3)), ic = [230, 300];
      an84Inset(ctx, ic[0], ic[1], 150, p, (c) => { c.fillStyle = C.blue; c.fillRect(-160, -160, 320, 320); c.fillStyle = dotPat(c, '#3f7be6', 12, 0.3); c.fillRect(-160, -160, 320, 320); c.fillStyle = '#edc65a'; c.fillRect(-160, 90, 320, 80);
        const wk = an84In(t, 134.4, 134.85); person(c, { ...AN84_MAAN_D, x: 0, y: 300, s: 1.6, mouth: 'smile', lid: wk ? 0 : 0.15, wink: wk ? 'R' : undefined, gaze: [-0.6, 0.1], dir: -1, handR: [72, -104] }); });
      if (p > 0.6 && W.mh) { const f = P(...W.mh); arr([ic[0] + 150, ic[1] + 30], [f[0] - 40, f[1] - 10], 134.1, 137.5, { bend: -0.2 }); lab('THE SAME MAN!', ic[0] + 30, ic[1] + 220, 134.3, 137.5, { size: 46 }); } }
    if (an84In(t, 141.92, 143.5) && W.dh) { const d = P(...W.dh); lab('READY!', d[0] + 170, d[1] - 200, 141.92, 143.5, { size: 48 }); arr([d[0] + 150, d[1] - 160], [d[0] + 30, d[1] - 40], 142.0, 143.5); }
    word('HA HA HA!', 720, 210, 149.0, 150.6, 90, { rot: 0.08, fill: C.yellow });
    if (an84In(t, 152.84, 154.5) && W.treas) { const h = P(W.treas.x, 700); lab('THE TREASURER', Math.min(800, h[0] - 60), h[1] - 230, 152.84, 154.5, { size: 42 }); }
    word('ALL OF THEM!', 500, 210, 160.6, 162.4, 84, { rot: -0.05, fill: C.red });
  }
}
// slanted halftone wipe band that hides the desert-to-palace cut
function an84Wipe(ctx, t) { if (!an84In(t, 89.42, 89.86)) return; const u = (t - 89.42) / 0.44, x = K.lerp(1500, -800, u);
  shape(ctx, [[x, -20], [x + 560, -20], [x + 300, 1250], [x - 260, 1250]], C.yellow, { lw: 12, seed: 3, dot: C.red, pitch: 12, rad: 0.22, da: 0.5 }); }
// panel-only shake: 2 frames, 3 px on every tag strike and every coin drop
const AN84_HITS = [...AN84_POPS_D.slice(1), ...AN84_POPS_H.slice(1), ...AN84_DROPS.map((d) => d + 0.35), 131.15, 171.0];
const an84Shake = (t) => { for (const h of AN84_HITS) if (t >= h && t < h + 0.067) return (t - h < 0.034 ? 3 : -3); return 0; };

const SCENE = {
  duration: AN84_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = an84Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh, py - sh * 0.6); ctx.scale(pw / 1000, ph / 1230);
    const cam = an84Cam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam);
    const Wd = t < AN84_HALL_T ? an84DesertWorld(ctx, t, cam) : an84HallWorld(ctx, t, cam); ctx.restore();
    an84Over(ctx, t, cam, S, Wd);
    an84Wipe(ctx, t);
    if (t >= 95.72 && t < 96.92) S.transition(ctx, 1000, 1230, (t - 95.72) / 1.2, { caption: 'A LITTLE LATER...' });
    if (t >= 175.6) S.title(ctx, 'THE END', 500, 250, AN84_B(t, 175.6, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's effects, each under 0.25 s, all in measured narration gaps or after the last word; master 0.6 at render
    k.bed(S.sfx.bed, 0, AN84_DUR, 0.5);
    k.play('whoosh', 3.9, { gain: 0.35, dur: 0.22 });                         // the gallop starts (gap 3.70-4.28)
    k.play('pop', 19.7, { gain: 0.4 });                            // WHERE TO? (gap 19.21-20.47)
    k.play('tick', 25.5, { gain: 0.45, pitch: 1.4 });              // first rain drop (gap 25.28-26.13)
    k.play('pop', 40.3, { gain: 0.4 });                            // the cloud pops (gap 39.64-41.14)
    k.tone({ t: 57.6, f: 180, f2: 90, dur: 0.18, type: 'sine', gain: 0.3, a: 0.01 });   // the gulp (gap 57.52-57.94)
    k.play('tick', 66.1, { gain: 0.45 });                          // ladder step (gap 65.64-66.68)
    k.play('tick', 68.0, { gain: 0.45, pitch: 0.8 });              // ladder step (gap 67.86-68.50)
    k.play('whoosh', 117.9, { gain: 0.3, dur: 0.2 });                        // the replay begins (gap 117.64-118.20)
    k.tone({ t: 162.5, f: 2600, f2: 2400, dur: 0.12, gain: 0.12 }); k.tone({ t: 162.58, f: 3100, f2: 2900, dur: 0.12, gain: 0.1 });                          // coins (gap 162.34-163.07)
    k.play('stamp', 175.45, { gain: 0.5 });                        // after the last word (175.26)
    k.play('chime', 176.3, { note: 'C6', gain: 0.6 });             // THE END
  },
};
window.SCENE = SCENE;
