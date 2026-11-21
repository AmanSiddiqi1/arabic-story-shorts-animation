// ===== SIND-02 shots S1-S4 (0 - 25.94 s): the Baghdad quay, the sea and the skiff, the glade and sleep, LATER..., left behind =====

// ---------- S1 (0 - 5.46): Baghdad quay, morning (the SIND-01 opening framing). Crane down from the sky, then track with the dhow ----------
const SB2_Q = { hz: 620, y: [632, 700, 945, 1030], amp: 5, pal: 'morning' };
const SB2_GANG = { a: [1092, 900], b: [1528, 800] };
const SB2_S1X = (t) => kfn(t, [[0, 760], [1.24, 760], [1.5, 800], [1.75, 800], [2.0, 905], [2.45, 1092], [3.3, 1490]], 'inOut');
const SB2_FALLS1 = footfalls(SB2_S1X, 2.45, 3.3, 30);
const SB2_DHOW1 = (t) => kfn(t, [[4.4, 1660], [5.46, 1880]], 'in');
function sbS1Dhow(t) { const f = sbFloat(SB2_DHOW1(t), t, SB2_Q, 2, 200), sail = K.clamp(SB_T2(t - 1.54) / 0.8); return { x: SB2_DHOW1(t), y: f.y - 2, s: 1.15, pitch: f.rot * 0.4 + (t > 4.4 ? 0.026 * Math.sin((t - 4.4) * 1.85) : 0), t, sail, billow: 0.6 + 0.5 * pulse(t, 2.15, 0.5) }; }
function sbS1Sin(t) {
  const tc = SB_T2(t), x = SB2_S1X(t), P = sbLive(t, 11, { x, y: 900, dir: 1, mouth: 'smile', gaze: [1, -0.2], wind: -0.3 }, [1.2, 2.3]);
  if (t < 1.24) { P.tip += 0.03 * osc(tc, 1.1); P.sq *= 1 + 0.02 * Math.max(0, osc(tc, 1.1)); P.y = 900 - 4 * Math.max(0, osc(tc, 1.1)); P.handL = [-34, -196]; }
  else if (t < 1.75) { P.handL = [-34, -196]; P.handRW = [868, 752]; P.gaze = [1, 0.1]; P.lid = Math.max(P.lid, 0.6); P.tip += 0.08; }      // hugs his mother with one arm
  else if (t < 2.45) { Object.assign(P, walk(SB2_S1X, tc, { stride: 28 })); P.handL = [-34, -196]; if (t < 2.05) { P.handRW = [930 + 6 * osc(tc, 0.16), 772]; P.gaze = [0.3, 1]; } }   // ruffles his sister on the way
  else if (t < 3.3) { Object.assign(P, walk(SB2_S1X, tc, { stride: 28 })); P.y = K.lerp(900, 800, K.clamp((x - 1092) / 436)) + kick(t, SB2_FALLS1, 2, 9, 8); P.handL = [-34, -196]; P.tip += 0.08; P.gaze = t > 2.9 && t < 3.15 ? [-1, -0.2] : [1, -0.2]; P.lid = sbLid(t, 11, [2.9, 3.15]); }
  return P;
}
function sbS1World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB2_Q;
  sbSkyTall(ctx, 'morning', cam, 620); sbSun(ctx, 1760, 250, 50, '#fff6c8', '#ffd0a0', 0.8); sbSeaBack(ctx, t, sea, 0, 2600);
  sbGulls(ctx, t, 1500, 240, 30, 2, 4, 0.3);
  ctx.drawImage(sbQuayPlate('baghdad'), 0, 0);
  // gulls on the warehouse roof peel off at 4.72 and follow the ship
  for (let i = 0; i < 3; i++) { const t0 = 4.72 + stagger(i, 0.18), u = K.clamp((t - t0) / 1.6), gx = 120 + i * 90 + 1200 * u * u, gy = 360 - 260 * Math.sin(Math.PI * Math.min(1, u * 1.3)) * 0.8 - 80 * u;
    sbGull(ctx, gx, gy, t, { fly: u > 0, flap: u > 0 ? undefined : 0, s: 0.32, dir: 1, seed: 20 + i * 3, beak: u === 0 && osc(tc + i, 1.6) > 0.8 ? 0.8 : 0 }); }
  const D = sbS1Dhow(t); D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS1Crew(q, t, D.s));
  sbDhow(ctx, D);
  const bow = sbDhowPt(D, 240, -150), bol = [1080, 862];
  if (t < 1.8) { ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...bol); ctx.quadraticCurveTo((bol[0] + bow[0]) / 2, Math.max(bol[1], bow[1]) + 40, bow[0], bow[1]); ctx.stroke(); ctx.restore(); }
  else if (t < 2.4) { const u = (t - 1.8) / 0.6; ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bow[0], bow[1]); ctx.quadraticCurveTo(bow[0] - 60, bow[1] - 60 * Math.sin(Math.PI * u), bow[0] - 140 * u, bow[1] + 40 * u); ctx.stroke(); ctx.restore(); }
  sbQuayWater(ctx, t, sea, 0, 2600);
  if (t > 4.4) sbWake(ctx, D.x, D.y, D.s, 1, t, K.clamp((t - 4.4) / 0.5));
  // the gangplank: bends under his steps; hauled in hand over hand from 3.52 (its quay end slides toward the ship)
  if (t < 4.3) { const hu = K.ease.inOut(K.clamp((t - 3.52) / 0.78)), a = [K.lerp(SB2_GANG.a[0], SB2_GANG.b[0] - 60, hu), K.lerp(SB2_GANG.a[1], SB2_GANG.b[1] + 10, hu) - 20 * Math.sin(Math.PI * hu)], b = sbDhowPt(D, -150, -130);
    const bend = kick(t, SB2_FALLS1, 6, 9, 8); ctx.save(); ctx.lineCap = 'round'; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + bend;
    ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(mx, my, ...b); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore(); }
  // the bench with the cushion he left, and the white cat that takes the warm spot
  sbCushion(ctx, 660, 846);
  sbS1Cat(ctx, t);
  sbS1Family(ctx, t);
  if (t < 3.3) { const P = sbS1Sin(t), Q = sbSin2(ctx, P), sh = sbPt(Q, [-38, -196], false), lag = lagged((u) => SB2_S1X(u), t, 0.12, 0.004); sbSack(ctx, sh[0] - 6, sh[1] - 40 - 6 * Math.abs(Math.sin((P.ph || 0))) * (P.amp || 0), 0.9, -0.2 + lag); }
}
function sbS1Cat(ctx, t) { const tc = SB_T2(t);
  const [hx, lift] = hop(t, 2.74, 0.34, 590, 660, 70), onB = t >= 3.08, x = t < 2.74 ? 590 : hx, y = onB ? 846 : 900 - lift - (t > 2.74 && t < 3.08 ? 54 * K.clamp((t - 2.74) / 0.34) : 0);
  const tf = turnFlip(t, [[0, 1], [3.15, -1], [3.6, 1]], 0.4), curl = K.clamp((t - 3.7) / 0.5);
  groundShadow(ctx, x, onB ? 848 : 902, 70, onB ? 0 : lift, { flat: true });
  cat(ctx, { x, y, s: 0.46, pal: 1, dir: tf.dir, sit: t < 2.6 ? 1 : curl, crouch: t > 2.6 && t < 2.76 ? 0.8 : 0, tailCurl: 0.3 + 0.6 * curl + lagged((u) => K.clamp((u - 3.7) / 0.5), tc, 0.15, 0.5), tailUp: t > 3.0 && t < 3.7 ? 0.8 : 0.2,
    ears: Math.max(-0.5, Math.min(1, idleSway(tc, 71, 0.3) + (t > 4.72 ? 0.6 * Math.sin(tc * 2) : 0))), lid: t > 4.5 && t < 5.2 ? Math.sin(Math.PI * (t - 4.5) / 0.7) : Math.max(0.35 * curl, blink(SB_T3(t), 71)), gaze: t > 4.72 ? [0.6, -0.8] : t < 2.6 ? [0.6, -0.6] : [1, 0], sq: breathe(tc, 71, 0.02) * landSquash(tc, 3.08, 0.12) });
}
function sbS1Family(ctx, t) { const tc = SB_T2(t);
  // mother: hugs him, then turns and waves small and slow, wet eyes and a smile
  const M = sbLive(t, 32, { x: 852, y: 900, dir: t < 2.1 ? -1 : 1, mouth: 'smile', gaze: t < 2.1 ? [-1, 0] : [1, -0.3], wet: t > 1.3 }, [2.1]);
  if (t > 1.24 && t < 1.75) { M.handLW = [800, 760]; M.handRW = [812, 790]; M.tip += 0.06; M.lid = 0.6; }
  if (t > 2.16) { const w = osc(tc, 1.0); M.handR = [36 + 6 * w, -188 - 4 * w]; M.handL = PERSON_HANDS.chest.R; }
  sbFamily(ctx, 'mother', M);
  // the little sister: jumps and waves both arms, out of time with her mother; her tangerine hair ribbon flies
  const jt = t - 2.16, jph = jt > 0 ? (jt % 0.55) / 0.55 : 0, lift = jt > 0 && jt < 3.3 ? 26 * Math.sin(Math.PI * jph) : 0;
  groundShadow(ctx, 935, 902, 60, lift, { flat: true });
  const Sg = sbLive(t, 33, { x: 935, y: 900 - lift, dir: t < 2.16 ? -1 : 1, mouth: t > 2.16 ? 'open' : 'smile', gaze: t < 2.0 ? [-0.6, -0.8] : [1, -0.5] });
  if (t > 1.75 && t < 2.05) { Sg.lid = 0.8; Sg.tip -= 0.1; Sg.drop = 4; }
  if (t > 2.16) { const w = osc(tc + 0.2, 0.32); Sg.aL = [2.7 + 0.3 * w, 2.9]; Sg.aR = [2.7 - 0.3 * w, 2.9]; Sg.sq *= jph < 0.1 && jt > 0.1 ? 0.9 : 1; }
  sbFamily(ctx, 'sister', Sg);
}
// deck: the captain at the helm, two sailors who haul the plank in (alternate hands), Sinbad hops aboard and waves from the stern rail
function sbS1Crew(c, t, ds) { const tc = SB_T2(t), dy = -80 * ds;
  const Cp = sbLive(t, 51, { x: -40 * ds, y: dy, dir: 1, gaze: [1, -0.1] }); if (t > 4.3) { Cp.handR = [70, -150]; Cp.handL = [60, -140]; } sbCaptain(c, Cp);
  for (let i = 0; i < 2; i++) { const P = sbLive(t, 60 + i, { x: (-180 + i * 60) * ds, y: dy, dir: -1, gaze: [-1, 0.3] }), on = t > 3.52 && t < 4.35, h = osc(tc + i * 0.25, 0.4);
    if (on) { P.handL = [40, -140 + 26 * h]; P.handR = [60, -150 - 26 * h]; P.tip += 0.1; } if (i === 0 && t > 4.35 && t < 4.75) P.handR = PERSON_HANDS.headHold.R; sbSailor(c, i, P); }
  if (t >= 3.3) { const [hx, lift] = hop(t, 3.3, 0.3, -150 * ds, -112 * ds, 26), P = sbLive(t, 11, { x: hx, y: dy - lift, dir: t < 3.7 ? 1 : -1, mouth: 'smile', gaze: [-1, -0.1], wind: 0.8 }, [3.7]);
    P.sq *= landSquash(tc, 3.6, 0.12); const w = osc(tc, 0.5); if (t > 4.1) { P.aR = [2.5 + 0.4 * w, 2.8 + 0.4 * w + lagged((u) => osc(u, 0.5), tc, 0.1, 0.6)]; P.handL = [-30, -100]; }
    sbSin2(c, P); if (t < 3.8) { const sh = sbPt(P, [-38, -196], false); sbSack(c, sh[0] - 6, sh[1] - 40, 0.9, -0.2); } else sbSack(c, 20 * ds, dy - 76, 0.9, 0.1); }
}
function sbS1Over(ctx, t, cam, S) {
  if (t > 0.3 && t < 3.4) { const off = t > 2.95 ? [1, 0, 1, 0, 0, 0][Math.min(5, Math.floor((t - 2.95) * 12))] : 1;
    if (off) { S.title(ctx, 'THE ROC AND', 500, 170, K.clamp((t - 0.3) / 0.9), { size: 84, align: 'center' }); S.title(ctx, 'THE DIAMOND VALLEY', 500, 262, K.clamp((t - 0.45) / 0.9), { size: 80, align: 'center' });
      if (t > 0.9) S.title(ctx, 'الرخ ووادي الألماس', 500, 380, K.clamp((t - 0.9) / 0.9), { size: 70, align: 'center', font: 'Lalezar', glow: '#8a5cff' }); } }
}
SB_SHOTS.push({ a: 0, b: 5.46, free: true, cam: sbKeys([[0, { x: 1000, y: 355, zoom: 1 }], [1.6, { x: 1000, y: 615, zoom: 1 }], [4.4, { x: 1080, y: 615, zoom: 1 }], [5.46, { x: 1260, y: 615, zoom: 1 }]]), world: sbS1World, over: sbS1Over });

// ---------- S2 (5.46 - 12.0): open sea, the bow breath, the skiff, the island ----------
const SB2_SEA2 = { hz: 600, y: [612, 680, 820, 900], amp: 6, pal: 'day' };
const SB2_D2X = (t) => kfn(t, [[5.46, 220], [8.0, 380]], 'out');
const SB2_SKX = (t) => kfn(t, [[9.92, 470], [11.04, 1040]], 'inOut');
const SB2_ISL = (t) => { const u = K.ease.inOut(K.clamp((t - 9.6) / 1.5)); return { x: K.lerp(1750, 1520, u), y: K.lerp(640, 880, u), s: K.lerp(0.34, 1.05, u) }; };
function sbS2Dhow(t) { const x = SB2_D2X(t), f = sbFloat(x, t, SB2_SEA2, 2, 200); return { x, y: f.y - 2, s: 1.0, pitch: f.rot * 0.5 + 0.02 * Math.sin(t * 1.85), t, sail: 1, billow: 0.7 + 0.2 * Math.sin(t * 1.3) }; }
// who is in the skiff (local x on the thwarts) and when they arrive (hop start)
const SB2_SKC = [{ who: 'm1', at: 8.9, lx: -70 }, { who: 'm2', at: 9.08, lx: -20 }, { who: 'm0', at: 9.26, lx: 30 }, { who: 'sin', at: 9.5, lx: 80 }];
function sbS2Skiff(t) { const down = K.clamp((t - 8.0) / 0.4), x = t < 9.92 ? 470 : SB2_SKX(t), f = sbFloat(x, t, SB2_SEA2, 3, 100), yw = K.lerp(720, f.y + 6, down * down), dip = 8 * pulse(t, 9.5, 0.4) + 3 * pulse(t, 8.4, 0.25) - (t > 11.04 && t < 11.3 ? 0 : 0);
  return { x, y: yw + dip, rot: down >= 1 ? f.rot : 0, down }; }
function sbS2World(ctx, t, cam) {
  const tc = SB_T2(t), sea = SB2_SEA2;
  sbSkyTall(ctx, 'day', cam, 600); sbSun(ctx, 1320, 190, 46, '#fffbe0', '#ffe0a0', 0.8); sbSeaBack(ctx, t, sea, -200, 2600);
  const I = SB2_ISL(t); sbFarIsland(ctx, I.x, I.y, I.s);
  // parrots rise from the island (red, blue, yellow), staggered
  for (let i = 0; i < 3; i++) { const t0 = 10.26 + stagger(i, 0.22), u = K.clamp((t - t0) / 1.4); if (u <= 0 || u >= 1) continue; bird(ctx, { kind: ['r', 'b', 'y'][i], fly: true, flap: Math.sin(tc * 20 + i * 2), x: I.x - 200 + i * 160 + 160 * u, y: I.y - 300 - 380 * u, s: 0.4, dir: i === 1 ? -1 : 1 }); }
  sbGulls(ctx, t - 7.3, 1700, 300, -260, 2, 9, 0.36);
  sbSeaLayer(ctx, 2, t, sea, -200, 2600);
  const D = sbS2Dhow(t); D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS2Crew(q, t, D)); sbDhow(ctx, D); sbWake(ctx, D.x, D.y, D.s, 1, t, K.clamp(1 - (t - 7.4) / 0.6));
  // flying fish skip out of a crest (staggered)
  for (let i = 0; i < 2; i++) { const u = (t - 7.3 - i * 0.3) / 0.7; sbFishJump(ctx, 760 + i * 90, 900 + i * 90, 836, u, 90, 0.6); if (u > 1 && u < 1.6) sbRing(ctx, 900 + i * 90, 840, (u - 1) / 0.6, 60); }
  // skiff ropes, the skiff, the climbers
  const Sk = sbS2Skiff(t);
  if (t > 7.9 && t < 9.95) { const r0 = sbDhowPt(D, -60, -140), r1 = sbDhowPt(D, 140, -150); ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 3; for (const [r, dx] of [[r0, -90], [r1, 90]]) { ctx.beginPath(); ctx.moveTo(...r); ctx.lineTo(Sk.x + dx, Sk.y - 40); ctx.stroke(); } ctx.restore(); }
  if (t > 7.9) sbSkiff(ctx, { x: Sk.x, y: Sk.y, pitch: Sk.rot, oar: t > 9.92 ? tc * 7 : 0, row: t > 9.92 && t < 11.04 ? 1 : 0.1, crew: (c) => sbS2SkiffCrew(c, t, Sk) });
  if (t > 8.3 && t < 9.0) sbSplash(ctx, Sk.x, Sk.y + 4, (t - 8.4) / 0.6, 1.2);
  if (t > 9.92 && t < 11.04) for (let k = 0; k < 3; k++) { const u = ((t - 9.92) * 1.4 + k / 3) % 1; sbRing(ctx, Sk.x - 160 - u * 160, Sk.y + 8, u, 50); }
  // climbers in the air between the deck and the skiff (drawn in the world)
  for (const c of SB2_SKC) { const u = (t - c.at) / 0.24; if (u < 0 || u >= 1) continue; const a = sbDhowPt(D, -40 + c.lx * 0.4, -80), b = [Sk.x + c.lx, Sk.y - 14], x = K.lerp(a[0], b[0], u), y = K.lerp(a[1], b[1], u) - 50 * Math.sin(Math.PI * u);
    sbS2Person(ctx, c.who, t, { x, y, gaze: [0, 1], aL: [2.2, 2.6], aR: [2.2, 2.6], mouth: c.who === 'm1' ? 'o' : 'smile' }); }
  sbSeaLayer(ctx, 3, t, sea, -200, 2600);
  // landing: everyone out on the sand, the fat merchant kisses the ground
  if (t >= 11.2) sbS2Beach(ctx, t, Sk);
}
function sbS2Person(c, who, t, P) { const Q = sbLive(t, who === 'sin' ? 11 : 80 + who.charCodeAt(1), P); if (who === 'sin') return sbSin2(c, { ...Q, wind: 0.6 }); return sbMerchant(c, +who[1], Q); }
function sbS2SkiffCrew(c, t, Sk) { const tc = SB_T2(t);
  for (const k of SB2_SKC) { if (t < k.at + 0.24 || t >= (k.who === 'sin' ? 11.62 : 11.2 + stagger(+k.who[1] || 0, 0.12))) continue;
    const lurch2 = lurch(t, 11.04, 0.3), P = { x: k.lx, y: -14, dir: 1, sit: k.who === 'sin' ? 0.6 : 0.8, seat: 'bench', tip: lurch2 + (k.who === 'm1' ? -0.05 : 0), sq: landSquash(tc, k.at + 0.24, 0.12), gaze: [1, -0.1], mouth: 'smile' };
    if (k.who === 'm1') { P.handL = [-30, -120]; P.handR = [30, -130]; P.mouth = 'o'; P.gaze = [0.3, 0.6]; }
    if (k.who === 'sin' && t > 9.92) { const o = Math.sin(tc * 7); P.handL = [60 + 30 * o, -120]; P.handR = [70 + 30 * o, -110]; P.tip += 0.06 * o; }
    if (k.who === 'm0' && t > k.at + 0.24) P.sq *= 1 - 0.05 * pulse(t, k.at + 0.24, 0.35);
    sbS2Person(c, k.who, t, P); } }
// on deck: the captain at the helm (looks ahead, never at the skiff), the rose sailor holds the skiff, Sinbad's breath in the bow
function sbS2Crew(c, t, D) { const tc = SB_T2(t), dy = -80 * D.s;
  const Cp = sbLive(t, 51, { x: -200, y: dy, dir: 1, gaze: [1, -0.1] }); Cp.handR = [70, -150]; Cp.handL = [64, -140]; sbCaptain(c, Cp);
  const S2 = sbLive(t, 62, { x: 60, y: dy, dir: 1, gaze: [0.5, 0.8] }); if (t > 8.0 && t < 9.9) { S2.handR = [100, -90]; S2.tip += 0.12; } sbSailor(c, 2, S2);
  for (let i = 0; i < 3; i++) { const k = SB2_SKC.find((q) => q.who === 'm' + i); if (t >= k.at) continue; const P = sbLive(t, 80 + i, { x: -40 + k.lx * 0.4 + 40 * i, y: dy, dir: 1, gaze: [0.6, 0.6] }); if (i === 1) { P.handR = [30, -150]; P.mouth = 'o'; } sbMerchant(c, i, P); }
  if (t < 9.5) { const P = sbLive(t, 11, { x: 200, y: dy, dir: 1, gaze: [1, -0.4], mouth: 'smile', wind: -1 }, [6.8]), op = sbF(t, [[6.7, 0], [6.94, 0.3], [7.3, 1], [7.9, 1], [8.3, 0]]), lag = lagged((u) => flow(u, [[6.7, 0], [6.94, 0.3], [7.3, 1], [7.9, 1], [8.3, 0]]), tc, 0.15, 0.6);
    P.aL = [K.lerp(0.3, 2.0, op), K.lerp(0.2, 2.1, op + lag)]; P.aR = [K.lerp(0.3, 2.0, op), K.lerp(0.2, 2.1, op + lag)]; P.sq *= 1 + 0.04 * op; P.tip -= 0.06 * op; if (op > 0.6) P.lid = 0.5;
    if (t > 8.4) { P.gaze = [-0.4, 0.8]; } if (t > 9.3) P.sq *= anticipate(tc, 9.3, 0.2, 0.08); sbSin2(c, P); }
}
function sbS2Beach(ctx, t, Sk) { const tc = SB_T2(t);
  SB2_SKC.forEach((k, i) => { const t0 = k.who === 'sin' ? 11.62 : 11.2 + stagger(+k.who[1], 0.12), [hx, lift] = hop(t, t0, 0.26, Sk.x + k.lx, Sk.x + 150 + i * 90, 40), P = { x: hx, y: 868 - lift, dir: 1, sq: landSquash(tc, t0 + 0.26, 0.14), gaze: [1, 0], mouth: 'smile' };
    groundShadow(ctx, hx, 870, 70, lift, { flat: true });
    if (k.who === 'm0' && t > t0 + 0.4) { P.kneel = K.clamp((t - t0 - 0.4) / 0.25); P.tip = 0.35 * P.kneel; P.handLW = [hx + 30, 868]; P.handRW = [hx + 60, 868]; P.lid = 1; P.mouth = 'o'; }
    if (k.who === 'm1') { P.gaze = [-1, -0.2]; P.handR = PERSON_HANDS.chest.R; }
    if (k.who === 'sin') { P.gaze = [1, -0.5]; P.handR = PERSON_HANDS.wave.R; }
    sbS2Person(ctx, k.who, t, P); });
}
SB_SHOTS.push({ a: 5.46, b: 12.0, free: true, cam: sbKeys([[5.46, { x: 500, y: 615, zoom: 1 }], [9.92, { x: 500, y: 615, zoom: 1 }], [11.1, { x: 1200, y: 615, zoom: 1 }], [12.0, { x: 1230, y: 615, zoom: 1 }]]), world: sbS2World });

// ---------- S3 + S4 (12.0 - 25.94): the glade, sleep, LATER..., the gold afternoon, left behind ----------
const SB2_SIT = { x: 1132, y: 900 };
const sbBeachY = (x) => x >= 760 ? 902 : x >= 660 ? K.lerp(922, 905, (x - 660) / 100) : x >= 560 ? K.lerp(970, 922, (x - 560) / 100) : 980;
const SB2_RUN = (t) => kfn(t, [[21.22, 1132], [22.7, 700]], 'inOut');
const SB2_FALLS4 = footfalls(SB2_RUN, 21.22, 22.7, 40);
function sbGladeWorld(ctx, t, cam, S) {
  const gold = t >= 17.05, model = gold ? 'gold' : 'morning', tc = SB_T2(t);
  sbWoodedIsland(ctx, model, t, cam, { sun: (c) => gold ? sbSun(c, 300, 360, 50, '#fff0c0', '#ffc070', 0.9) : sbSun(c, 1500, 160, 44, '#fffbe0', '#ffe0a0', 0.7),
    farSea: (c) => { if (t > 17.66) { const u = K.clamp((t - 22.0) / 4), sx = K.lerp(330, 280, u); sbDhow(c, { x: sx, y: 606, s: K.lerp(0.12, 0.09, u), dir: -1, t, far: true }); } } });
  sbTreeShadow(ctx, SB_WOOD.tree, gold ? 1 : -1, gold ? 420 : 280); sbDapple(ctx, t, gold);
  // the skiff on the beach (morning) or its keel groove and the footprints (afternoon)
  if (!gold) sbSkiff(ctx, { x: 660, y: 930, s: 0.9, pitch: -0.12, row: 0, oars: t < 16.5 });
  else { ctx.save(); ctx.strokeStyle = 'rgba(140,100,60,0.55)'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(720, 916); ctx.quadraticCurveTo(650, 930, 560, 980); ctx.stroke(); ctx.restore();
    const R = K.rng(4); for (let l = 0; l < 3; l++) for (let k = 0; k < 11; k++) { const x = 1100 - k * 40 + l * 8, y = sbBeachY(x) + 14 + l * 16 + (k % 2) * 6; ctx.fillStyle = 'rgba(120,90,60,0.4)'; ctx.beginPath(); ctx.ellipse(x, y, 9, 4, 0, 0, 7); ctx.fill(); }
    for (const [x, y, c] of [[1190, 930, '#ffcf3a'], [1220, 950, '#7a4a8a']]) { sbBlob(ctx, x, y, 12, 6, c, sbDark(c, 0.3), { lw: 2, off: 3 }); } }
  sbShadeTree(ctx, t, model, { back: true });
  // the traders: pick fruit to the right (12.6), come back far left and push off (16.46) without looking
  sbGladeTraders(ctx, t);
  if (t < 21.22) sbGladeSin(ctx, t, S);
  else sbRunSin(ctx, t);
  sbShadeTree(ctx, t, model);
  // the monkey on the branch: looks down, steals the fruit, freezes at the snore, tiptoes away
  sbGladeMonkey(ctx, t);
  // the blue butterfly that lands on his turban (15.92) and flies off when he wakes (18.16)
  sbButterfly(ctx, t);
  // the wave that washes over his shoes (25.18)
  if (t > 25.0) { const u = K.clamp((t - 25.0) / 0.9), wx = 560 + 200 * Math.sin(Math.PI * u); ctx.save(); ctx.globalAlpha = 0.85; sbFoamLine(ctx, [[480, 990], [wx - 60, 940], [wx, 922]], t); ctx.fillStyle = 'rgba(90,190,240,0.55)'; ctx.beginPath(); ctx.moveTo(480, 1000); ctx.lineTo(wx - 60, 942); ctx.lineTo(wx, 924); ctx.lineTo(wx - 20, 990); ctx.closePath(); ctx.fill(); ctx.restore(); }
}
// Sinbad in the glade: stretch and yawn, catch the fruit, sit against the trunk, the lids sink, sleep; wake, look, call
const SB2_LIDS = [[14.74, 0.1], [14.9, 0.3], [15.15, 0.3], [15.3, 0.6], [15.55, 0.6], [15.7, 1]];
function sbGladeSin(ctx, t, S) { const tc = SB_T2(t), sitK = sbF(t, [[13.7, 0], [14.3, 1]]);
  const P = sbLive(t, 11, { x: SB2_SIT.x, y: 900, dir: 1, mouth: 'smile', gaze: [0.4, -0.3], wind: -0.1 }, [12.6, 13.6]);
  if (t < 13.7) { const st = sbF(t, [[12.0, 0], [12.25, 1], [12.75, 1], [13.1, 0.2]]), lag = lagged((u) => flow(u, [[12.0, 0], [12.25, 1], [12.75, 1], [13.1, 0.2]]), tc, 0.12, 0.6);
    P.sq *= anticipate(tc, 12.0, 0.12, 0.05) * (1 + 0.06 * st); P.aL = [K.lerp(0.3, 2.9, st), K.lerp(0.3, 3.0, st + lag)]; P.aR = [K.lerp(0.3, 2.9, st), K.lerp(0.3, 3.0, st + lag)];
    if (st > 0.5) { P.lid = 1; P.mouth = 'o'; }
    if (t > 12.85) { delete P.aR; P.handR = [36, -150 + 30 * sbF(t, [[12.85, 1], [13.1, 0]])]; P.gaze = [0.3, -0.8]; } }
  else if (t < 17.5) { P.sit = sitK; P.seat = 'floor'; P.x = SB2_SIT.x + 10 * sitK; P.drop = 2 * sitK; P.sq *= 1 - 0.03 * pulse(tc, 14.1, 0.5); P.handR = t < 15.5 ? [40, -60] : [50, -40]; P.handL = [-40, -60];
    let lid = 0; for (const [tt, v] of SB2_LIDS) if (t >= tt) lid = v; if (t >= 14.74) P.lid = lid; P.gaze = [0.3, 0.4];
    const nod = t > 15.3 && t < 15.75 ? Math.sin(Math.PI * (t - 15.3) / 0.45) : 0; P.tilt = 0.12 * nod + (t > 15.75 ? 0.18 : 0); P.drop += 8 * nod + (t > 15.75 ? 6 : 0);
    if (t > 15.75) { P.sq = breathe(tc, 11, 0.025) * (1 + 0.02 * Math.sin(t * 2 * Math.PI / 3.4)); P.mouth = 'o'; } }
  else { // the gold afternoon: wakes (18.16), stretches, looks left and right, stands and calls (20.08)
    P.sit = 1 - sbF(t, [[19.9, 0], [20.15, 1]]); P.seat = 'floor'; P.x = SB2_SIT.x + 10 * P.sit; P.sq = breathe(tc, 11, 0.02);
    const wake = [[17.66, 1], [18.16, 1], [18.3, 0.5], [18.45, 0.5], [18.55, 0], [18.62, 0.9], [18.7, 0]]; let lid = 1; for (const [tt, v] of wake) if (t >= tt) lid = v; P.lid = Math.max(lid, sbLid(t, 11, [18.94, 19.4, 19.6]));
    if (t > 18.45 && t < 18.95) { const st = sbF(t, [[18.45, 0], [18.65, 1], [18.95, 0.3]]); P.aL = [K.lerp(0.4, 2.8, st), 2.9]; P.aR = [K.lerp(0.4, 2.8, st), 2.9]; P.sq *= 1 + 0.05 * st; P.mouth = st > 0.6 ? 'o' : 'closed'; }
    else { P.handR = [40, -60]; P.handL = [-40, -60]; }
    P.gaze = gazePlan(SB_T3(t), [[17.6, [0.2, 0.3]], [18.94, [-1, 0]], [19.4, [1, 0]], [19.6, [0.3, 0.8]], [20.0, [-1, -0.1]]], 0.12); P.look = P.gaze[0] * 0.8; P.mouth = t > 19.0 && t < 19.9 ? 'closed' : P.mouth;
    P.brow = t > 19.0 ? -0.4 : 0;
    if (t > 20.08) { P.dir = -1; P.handR = PERSON_HANDS.cupMouth.R; P.tip += 0.06; P.mouth = 'open'; P.brow = -0.6; if (t > 20.7) { P.handR = PERSON_HANDS.cupEar.R; P.mouth = 'closed'; P.tip -= 0.06; P.gaze = [-1, -0.2]; } } }
  const Q = sbSin2(ctx, P);
  // the fruit: drops from the tree, caught (12.85), eaten, rolls out of his hand (15.4), taken by the monkey (16.0)
  if (t > 12.35 && t < 12.85) { const u = (t - 12.35) / 0.5; fig(ctx, SB2_SIT.x + 40, K.lerp(500, 740, u * u), 14); }
  else if (t >= 12.85 && t < 15.4) { const h = sbHandW(Q, 1); sbBlob(ctx, h[0], h[1] - 6, 13, 13, '#e8364f', '#a8203a', { lw: 2.5, off: 4, hi: '#ffa0a8' }); }
  else if (t >= 15.4 && t < 16.0) { const u = K.clamp((t - 15.4) / 0.4); sbBlob(ctx, SB2_SIT.x + 60 + 50 * u, 896 - 10 * Math.sin(Math.PI * u), 13, 13, '#e8364f', '#a8203a', { lw: 2.5, off: 4 }); }
  if (t > 15.92 && t < 16.6) zzz(ctx, Q.x + 30, Q.y - 210, t);
  if (t > 20.08 && t < 21.3) { const [x, y] = [Q.x - 150, Q.y - 330]; sbSay(ctx, S0, [[20.1, 'HELLO?...']], t, x, y, sbPt(Q, [-30, 10]), { wobble: 4, gone: 21.0, size: 46 }); }
}
// running to the beach (21.22), skid at the water (22.7), waves and jumps (24.26), the arms come down (25.18)
function sbRunSin(ctx, t) { const tc = SB_T2(t), x = SB2_RUN(t), P = sbLive(t, 11, { x, y: sbBeachY(x), dir: -1, mouth: 'open', gaze: [-1, 0], wind: 0.9 }, [22.68, 25.2]);
  if (t < 22.7) { Object.assign(P, walk(SB2_RUN, tc, { stride: 40 })); P.y = sbBeachY(P.x) - 6 * Math.abs(Math.sin(P.ph || 0)) * (P.amp || 0); P.tip += 0.12 * (P.amp || 0); P.aL = [1.2 + 0.8 * Math.sin(P.ph || 0), 1.4]; P.aR = [1.2 - 0.8 * Math.sin(P.ph || 0), 1.4];
    if (Math.abs(Math.sin(P.ph || 0)) > 0.92) dustBurst(ctx, P.x + 30, P.y, 0.05, 4, 4, 8, 20, 0.2, 3); }
  else { P.tip += lurch(t, 22.7, 0.3); P.gaze = [-1, -0.3]; P.mouth = 'o'; P.brow = -0.6;
    if (t > 23.4 && t < 24.26) { P.handR = PERSON_HANDS.pointFwd.R; }
    const jumps = [[24.3, 0.32, 40], [24.66, 0.28, 24]]; let lift = 0; for (const [a, d, h] of jumps) { const [, l] = hop(t, a, d, x, x, h); lift += l; }
    if (t > 24.26 && t < 25.18) { const w = osc(tc, 0.35); P.aL = [2.7 + 0.3 * w, 3.0]; P.aR = [2.7 - 0.3 * w, 3.0]; P.mouth = 'open'; P.sq *= landSquash(tc, 24.62, 0.14) * landSquash(tc, 24.94, 0.1); }
    if (t >= 25.18) { const dn = sbF(t, [[25.18, 0], [25.9, 1]]), arm = sbF(t, [[25.3, 0], [25.94, 1]]); P.aL = [K.lerp(2.7, 0.3, arm), K.lerp(3.0, 0.3, arm)]; P.aR = [K.lerp(2.7, 0.3, arm), K.lerp(3.0, 0.3, arm)]; P.drop = 8 * dn; P.sq *= 1 - 0.04 * dn; P.lid = Math.max(P.lid, 0.3 * dn); P.mouth = 'closed'; P.brow = 0.3; P.wind = 0; P.tailA = 0; }
    groundShadow(ctx, x, sbBeachY(x) + 2, 70, lift, { flat: true }); P.y = sbBeachY(x) - lift; }
  sbSin2(ctx, P);
}
const SB2_TRX = [(t) => kfn(t, [[12.6, 1250], [14.2, 1560], [16.2, 1560], [16.46, 900], [16.7, 760]]), (t) => kfn(t, [[12.75, 1300], [14.4, 1680], [16.2, 1680], [16.5, 940], [16.7, 800]]), (t) => kfn(t, [[12.9, 1200], [14.6, 1450], [16.2, 1450], [16.52, 850], [16.7, 720]])];
function sbGladeTraders(ctx, t) { if (t < 12.4 || t > 16.75) return; const tc = SB_T2(t);
  for (let i = 0; i < 3; i++) { const xf = SB2_TRX[i], v = speed(xf, t), P = sbLive(t, 80 + i, { x: xf(t), y: t > 16.2 ? 880 : 902, dir: v < -1 ? -1 : 1, ...walk(xf, tc, { stride: 24 }), s: t > 16.2 ? 0.8 : 1, mouth: 'smile', gaze: [1, -0.4] });
    if (t > 14.2 && t < 16.2) { P.handR = [60, -205 + 16 * osc(tc + i, 0.8)]; P.gaze = [0.6, -1]; } if (i === 1 && t < 14.4) P.gaze = osc(tc, 1.1) > 0.3 ? [-1, 0] : [1, 0];
    if (t > 16.2) { P.handL = [-30, -120]; P.handR = [30, -120]; P.gaze = [-1, 0]; }
    sbMerchant(ctx, i, P); }
}
function sbGladeMonkey(ctx, t) { if (t > 17.0) return; const tc = SB_T2(t);
  const steal = t > 15.95, xf = (u) => kfn(u, [[15.95, 960], [16.25, 1180], [16.35, 1180], [16.6, 1300]]), x = steal ? xf(t) : 960, y = steal ? 900 : 478;
  const freeze = t > 16.25 && t < 16.35; const P = { x, y, s: 0.55, dir: steal ? 1 : -1, ph: steal && !freeze ? tc * 9 : tc * 2, look: t > 14.1 ? -0.6 : 0, eyes: 'open', mouth: freeze ? 'o' : 'smile', tilt: t > 14.1 && t < 15.9 ? 0.15 * osc(tc, 1.4) : 0, gaze: t < 14.1 ? [1, 0] : [0.4, 1] };
  if (steal) { P.hold = 'fig'; P.y = 900 - (freeze ? 0 : 6 * Math.abs(Math.sin(tc * 9))); }
  if (t > 15.92 && t < 15.95) return; monkey(ctx, P); }
function sbButterfly(ctx, t) { if (t < 15.6 || t > 19.6 || (t > 16.6 && t < 17.5)) return; const tc = SB_T3(t); let x, y, sit = false;
  const head = [SB2_SIT.x + 22, 900 - 240]; if (t < 15.92) { const u = (t - 15.6) / 0.32; x = K.lerp(1300, head[0], u); y = K.lerp(620, head[1], u) + 20 * Math.sin(u * 9); } else if (t < 18.3) { [x, y] = head; sit = true; } else { const u = (t - 18.3) / 1.3; x = head[0] + 300 * u; y = head[1] - 260 * u + 20 * Math.sin(u * 12); }
  const f = sit ? 0.3 + 0.2 * Math.sin(tc * 3) : Math.abs(Math.sin(tc * 14)); ctx.save(); ctx.translate(x, y);
  for (const sd of [-1, 1]) celShade(ctx, [[0, 0], [sd * 22 * f + sd * 4, -20], [sd * 26 * f + sd * 6, 4], [sd * 10 * f, 14]], '#3f7ae8', '#1f4ab8', { light: [-1, -1], off: 4, lw: 2 }); seg(ctx, 0, -8, 0, 10, 3, '#2a1a3a', 0); ctx.restore(); }
function sbGladeOver(ctx, t, cam, S) {
  if (t > 22.68 && t < 25.9) { const sp = sbP(K.lerp(330, 290, K.clamp((t - 22) / 4)), 590, cam); sbTag(ctx, S, 'THE SHIP!', sp[0] + 140, sp[1] - 170, t, 22.7, 23.5, { size: 46 }); if (t < 23.6) S.arrow(ctx, [sp[0] + 120, sp[1] - 130], [sp[0] + 20, sp[1] - 20], K.clamp((t - 22.8) / 0.4)); }
  if (t > 19.56 && t < 20.6) { const a = sbP(1080, 960, cam), b = sbP(760, 940, cam); S.arrow(ctx, a, b, K.clamp((t - 19.6) / 0.6), { bend: 0.05 }); }
  // the round inset on the deck: the fat merchant counts heads, his finger lands on the sack with the star seal
  sbInset(ctx, t, 23.5, 25.1, 270, 300, 180, (c, w) => { c.save(); c.scale(w / 1000, w / 1000);
    sbGrad(c, 0, 0, 1000, 600, [[0, '#9cc4ee'], [1, '#ffd8a0']]); sbGrad(c, 0, 560, 1000, 200, [[0, '#5aaec8'], [1, '#2f84c0']]); c.fillStyle = '#a8643a'; c.fillRect(0, 760, 1000, 240); c.fillStyle = '#c07a48'; for (let k = 0; k < 6; k++) c.fillRect(0, 780 + k * 36, 1000, 4);
    const tc = SB_T2(t), cnt = Math.min(3, Math.floor((t - 23.6) / 0.3)), targets = [[300, 520], [520, 560], [740, 600], [820, 700]], tg = targets[Math.max(0, Math.min(3, cnt))];
    sbSack(c, 800, 650, 1.6, 0.05);
    sbMerchant(c, 2, sbLive(t, 82, { x: 300, y: 780, s: 1.3, dir: 1, gaze: [1, 0], handR: [60, -150 + 20 * osc(tc, 0.5)], handL: [40, -170] }));
    const Pz = sbLive(t, 81, { x: 520, y: 780, s: 1.2, dir: 1, sit: 1, seat: 'bench', lid: 1, tilt: 0.25, mouth: 'o' }); sbMerchant(c, 1, Pz);
    const F = sbLive(t, 80, { x: 160, y: 820, s: 1.5, dir: 1, mouth: sbTalk(t, 23.6, 24.9, 2) > 0.5 ? 'open' : 'smile', gaze: [1, -0.1], handRW: [tg[0] - 20, tg[1] - 40] }); F.tip += 0.04 * pulse(tc, 24.6, 0.4); sbMerchant(c, 0, F);
    c.restore(); });
}
SB_SHOTS.push({ a: 12.0, b: 17.66, free: true, cam: sbKeys([[12.0, { x: 1180, y: 560, zoom: 1.1 }], [17.66, { x: 1240, y: 560, zoom: 1.1 }]]), world: sbGladeWorld, over: sbGladeOver });
SB_SHOTS.push({ a: 17.66, b: 25.94, free: true, cam: sbKeys([[17.66, { x: 1215, y: 560, zoom: 1.1 }], [21.2, { x: 1215, y: 560, zoom: 1.1 }], [22.6, { x: 695, y: 560, zoom: 1.1 }], [25.94, { x: 680, y: 560, zoom: 1.1 }]]), world: sbGladeWorld, over: sbGladeOver });
