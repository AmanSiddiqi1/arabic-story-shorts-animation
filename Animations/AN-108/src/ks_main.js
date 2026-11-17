// ===== AN-108 main: sets, draw order, clouds, camera, lettering (panel), sound =====
const KS_NIGHT = [117.7, 120.96], KS_DAY = [159.58, 165.42];
const ksSet = (t) => (ksIn(t, ...KS_NIGHT) ? 'night' : ksIn(t, ...KS_DAY) ? 'day' : 'room');

// ---------- chest position and anchors ----------
function ksChestPos(t) {
  if (t < 13.62) return null;
  if (t < 16.95) { const dip = KS_VFALLS.reduce((s, f) => s + 12 * ksPulse(t, f.t - 0.05, 0.3), 0), x0 = KS_VX(t) + 4 + tremble(t, 1.5, 9);
    return { x: K.lerp(x0, 400, ksB(t, 16.85, 0.1)), y: t < 16.85 ? 860 + Math.min(12, dip) : fallY(t, 16.85, 16.95, 860, 900), sq: 1, rot: 0.02 * Math.sin(t * 7), lid: 0 }; }
  const hop = 6 * ksPulse(t, 46.3, 0.22) + 4 * ksPulse(t, 46.62, 0.2) + (t > 157.66 && t < 158.2 ? 8 * ksPulse(t, 157.66, 0.25) : 0);
  return { x: ksChestX(t), y: 900 - hop, sq: impactSquash(t, 16.95, 0.78) * impactSquash(t, 178.05, 0.88) * (t > 79.45 && t < 80.3 ? 1 - 0.04 * Math.abs(Math.sin((t - 79.45) * 13)) : 1), rot: swing(t, 157.7, 0.06, 3, 4), lid: ksLid(t) };
}
function ksChestA(t) { const c = ksChestPos(t) || { x: 400, y: 900, sq: 1, lid: 0 }, u = c.lid, sq = c.sq ?? 1;
  return { rim: [c.x, c.y - 95 * sq], lidFront: [c.x, c.y - (95 + (u < 0.5 ? 92 * u : 110 * Math.min(1, (u - 0.5) * 2))) * sq], handles: [[c.x - 91, c.y - 58 * sq], [c.x + 91, c.y - 58 * sq]] }; }

// ---------- room state ----------
const ksRoomU = (t) => (t < 117.7 ? ksTr(t, [[0, 0.5], [6.84, 0.56, 1.0]]) : t < 132.7 ? ksTr(t, [[0, 0.72], [129.0, 1.04, 1.5]]) : t < 165 ? 0.12 : 0.3);
const ksDoor = (t) => ksTr(t, [[0, 0], [8.62, 1, 0.5], [17.2, 0, 0.01], [117.0, 0.8, 0.6], [117.7, 0, 0.01], [135.4, 1, 0.5], [138.6, 0, 0.8], [158.3, 1, 0.3], [165, 0, 0.01]]);
const ksCurtain = (t) => ksTr(t, [[0, 0], [101.82, 0.6, 0.45], [110.9, 0, 0.5]]);
const ksLamp = (t) => (t < 129 ? 1 : t < 132.7 ? 1 - ksB(t, 129.4, 1.0) : 0);
// held / loose items
function ksMaskPos(t) { if (t < 38.3) return null; const S = ksSharper(t); if (t < 38.85) return { p: ksHandW(S, 'R'), rot: 0.3 }; if (t < 39.2) { const h0 = [584, 790]; return { p: [K.lerp(h0[0], 584, ksB(t, 38.85, 0.35)), fallY(t, 38.85, 39.2, 790, 898)], rot: 0.3 + 2 * (t - 38.85) }; }
  return { p: [ksTr(t, [[0, 584], [74.8, 548, 0.4]]), 898], rot: 1.0 }; }
function ksRingPos(t) {   // the goldsmith's test ring
  const G = ksGoldsmith(t); if (t < 142.1) return null; if (t < 145.05) return { p: ksHandW(G, 'R'), turn: t > 142.5 && t < 143.4 ? (t - 142.5) * 9 : 0 };
  const h = [484, 862]; if (t < 145.3) return { p: [K.lerp(h[0], 492, ksB(t, 145.05, 0.25)), fallY(t, 145.05, 145.3, h[1], 930)] }; return { p: [492, 930] }; }
function ksBowlPos(t) { const G = ksGoldsmith(t); if (t < 145.45) return null; if (t < 146.0) return { p: ksHandW(G, 'R') }; if (t < 146.22) return { p: [K.lerp(500, 532, ksB(t, 146.0, 0.22)), fallY(t, 146.0, 146.22, 860, 930)] }; return { p: [532, 930] }; }
function ksStonePos(t) { const G = ksGoldsmith(t); if (t < 146.25) return null; if (t < 146.95) return { p: ksHandW(G, 'R') }; if (t < 152.7) return { p: ksHandW(G, 'L') }; if (t < 153.0) return { p: ksHandW(G, 'R') };
  if (t < 153.35) return { p: [462, fallY(t, 153.0, 153.35, 790, 928)] }; return { p: [462, 930], broken: ksB(t, 153.35, 0.3, 'out') }; }

// ---------- people with their props ----------
function ksDrawChief(ctx, t, P) {
  if (P.slip) { person(ctx, { ...P, pal: { ...KS_CH_PAL, head: 'none' } }); ksHat(ctx, P, KS_CH_D, P.slip); } else person(ctx, P);
  if (P.badgeIn) { const h = ksHandW(P, 'R'); ksBadge(ctx, h[0] - 2, h[1] - 10, 13, t * 0.5); } else { const b = ksW(P, [16, -126]); ksBadge(ctx, b[0], b[1], 13 * P.s, 0); }
  ksFaceLight(ctx, P, ksGlow(t) * (ksSet(t) === 'room' ? 1 : 0));
  ksCoinEyes(ctx, P, P.coin, t); ksFlush(ctx, P, P.flush, t);
  if (t > 157.66 && t < 158.5) { const f = ksW(P, [16, -10]); star(ctx, f[0], f[1], 16 * ksPulse(t, 157.66, 0.8), C.yellow, t * 4); }
}
function ksDrawSharper(ctx, t, P) { person(ctx, P); if (P.crossed) { const h = ksHandW(P, 'L'); ksCrossed(ctx, h[0] - 4, h[1] - 6, 1); } }
function ksDrawTreasurer(ctx, t, P) { person(ctx, P); if (P.alpha < 0.05) return; ctx.save(); ctx.globalAlpha *= P.alpha;
  const k = ksW(P, [-26, -82]); for (let i = 0; i < 3; i++) { ctx.lineWidth = 3; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(k[0] + i * 5 - 5, k[1] + 10 + (i % 2) * 3 + 2 * Math.sin(t * 6 + i), 6, 0, 7); ctx.stroke(); seg(ctx, k[0] + i * 5 - 5, k[1] + 16, k[0] + i * 5 - 3, k[1] + 30, 3, C.yellow, 1.5); }
  if (P.hasPurse) { const h = ksTrPurse(t); ksPurse(ctx, h[0], h[1] + 8, 0.8); } ctx.restore(); }
function ksDrawGoldsmith(ctx, t, P) { person(ctx, P);
  if (P.loupe === 1) { const h = ksHeadL(P), e = ksW(P, [h[0] + 13, h[1] - 4]); ksLoupe(ctx, e[0], e[1], 1.15, { eye: P.gaze || [0, 0], lid: 0 }); }
  else if (P.loupe === 0.5) { const n = ksW(P, [0, -150]), c = ksW(P, [10, -112]); seg(ctx, n[0], n[1], c[0], c[1] - 18, 2, C.black, 0); ksLoupe(ctx, c[0], c[1], 0.7); }
  if (t >= 143.6 && t < 145.3) { const h = ksHandW(P, 'L'); ksTouchstone(ctx, h[0] + 6, h[1] - 6, 1, ksB(t, 144.5, 0.5), 0.6 * ksB(t, 144.7, 0.3)); }
  if (t > 141.25 && t < 141.7) { const h = ksHandW(P, 'R'); ksLoupe(ctx, h[0], h[1] - 8, 0.9); } }
function ksDrawGuard(ctx, i, P) { person(ctx, P); ksHelmet(ctx, P, KS_GUARD[i].helm); }

// ---------- the room ----------
function ksRoom(ctx, t, cam) {
  palaceHall(ctx, { variant: 'merchant', desk: false, curtain: ksCurtain(t), u: ksRoomU(t), t, doorOpen: ksDoor(t), lampsLit: ksLamp(t) });
  // poster on the wall, with its glint
  if (t < 176.0) { ksPoster(ctx, KS_POSTER[0], KS_POSTER[1]); if (ksIn(t, 3.04, 3.8)) star(ctx, KS_POSTER[0] + 40, KS_POSTER[1] - 50, 18 * ksPulse(t, 3.04, 0.7), C.white, t * 3); }
  const m = ksMaskPos(t); if (m) ksMask(ctx, m.p[0], m.p[1] - 6, 0.8, m.rot);
  seatStool(ctx, 540, 900, 1.1); seatStool(ctx, 690, 900, 1.1);
  const items = [], C0 = ksChestPos(t), Ch = ksChief(t), Sh = ksSharper(t), Sv = ksServant(t), Tr = ksTreasurer(t), Gs = ksGoldsmith(t);
  if (!(t < 8.75 || t >= 117.7)) items.push([896, () => ksDrawSharper(ctx, t, Sh)]);
  items.push([t > 132.7 && t < 165 ? 903.2 : 897, () => ksDrawChief(ctx, t, Ch)]);
  if (!Sv.hidden) items.push([899, () => person(ctx, Sv)]);
  if (!Tr.hidden) items.push([900, () => ksDrawTreasurer(ctx, t, Tr)]);
  if (!Gs.hidden) items.push([902, () => ksDrawGoldsmith(ctx, t, Gs)]);
  if (C0 && ksGlow(t) > 0.01) items.push([895.5, () => goldGlow(ctx, C0.x, C0.y - 118, 210, t, ksGlow(t) * K.clamp(C0.lid * 2))]);
  if (C0) items.push([C0.y < 899 && t < 17 ? 901 : 898.5, () => {
    const lid = C0.lid, rise = ksIn(t, 56.9, 68.62) ? ksB(t, 57.4, 1.6) : 1;
    ksChest(ctx, C0.x, C0.y, { lid, rise, fake: ksFake(t), sq: C0.sq, rot: C0.rot, glint: ksIn(t, 59.4, 60.6) ? ksB(t, 59.4, 1.1, 'lin') : null, noRing: t > 142.05, noGems: t > 146.25 });
    if (t > 16.95 && t < 17.6) for (const d of [-1, 1]) dustBurst(ctx, C0.x + d * 90, 898, t - 16.95, 5, 6, 14, 40, 0.6, 31 + d);
    for (const [ts, i] of [[79.68, 1], [79.92, 2], [80.2, 3]]) dustBurst(ctx, C0.x + 70, 898, t - ts, 4, 5, 11, 26, 0.5, 40 + i);
  }]);
  // guards rushing in (S18)
  if (ksIn(t, 158.4, 159.6)) { items.push([903, () => ksDrawGuard(ctx, 0, ksGuardP(0, (tt) => ksTr(tt, [[0, 110], [158.5, 300, 0.7]]), t, { eyes: 'wide', gaze: [1, -0.1], mouth: 'o' }))]);
    items.push([903.5, () => ksDrawGuard(ctx, 1, ksGuardP(1, (tt) => ksTr(tt, [[0, 90], [159.0, 220, 0.55]]), t, { eyes: 'wide', gaze: [1, -0.15], mouth: 'o', alpha: ksB(t, 158.95, 0.1) }))]); }
  items.sort((a, b) => a[0] - b[0]).forEach((it) => it[1]());
  // held props after the people
  if (ksIn(t, 104.35, 107.64) && t >= 105.84) { const pp = ksPursePos(t); ksPurse(ctx, pp[0], pp[1], pp[2]); }
  if (ksIn(t, 60.6, 64.6)) { const h = ksHandW(Sh, 'R'); ksRing(ctx, h[0] + 4, h[1] - 14, 15, { turn: (t - 60.6) * 4, stoneCol: C.blue, glint: ksPulse(t, 61.4, 0.5) }); }
  if (ksIn(t, 62.6, 64.6)) { const hl = ksHandW(Sh, 'L'), hr = ksHandW(Sh, 'R'); ksGem(ctx, hl[0], hl[1] - 12, 13, C.red, { glint: ksPulse(t, 62.8, 0.5) + ksPulse(t, 63.8, 0.5) }); if (t < 62.75) {} }
  if (ksIn(t, 123.7, 126.45)) { const h = ksHandW(Ch, 'R'); ksRing(ctx, h[0], h[1] - 10, 11, { stoneCol: KS_GEMS[2], glint: ksPulse(t, 124.1, 0.5) }); }
  if (ksIn(t, 165, 169.8)) { const h = t < 169.5 ? ksHandW(Ch, 'R') : null, p = h ? [h[0], h[1] - 10] : [K.lerp(560, 535, ksB(t, 169.5, 0.3)), fallY(t, 169.5, 169.8, 790, 812)]; ksRing(ctx, p[0], p[1], 11, { fake: 1, stoneCol: KS_GEMS[2], stoneFake: 1 }); }
  const rp = ksRingPos(t); if (rp) ksRing(ctx, rp.p[0], rp.p[1] - (rp.p[1] > 925 ? 4 : 10), 13, { turn: rp.turn, fake: Math.max(0.15 * ksB(t, 144.6, 0.4), ksB(t, 151.18, 0.3)), stoneCol: C.red, stoneFake: ksB(t, 151.18, 0.3) });
  const bp = ksBowlPos(t); if (bp) ksBowl(ctx, bp.p[0], bp.p[1] + (bp.p[1] > 925 ? 0 : 6), 0.9, { fake: ksB(t, 151.76, 0.3), bend: ksB(t, 145.75, 0.2) });
  const sp = ksStonePos(t); if (sp) { if (sp.broken != null) ksShards(ctx, sp.p[0], sp.p[1], 14, sp.broken, C.red, ksB(t, 154.34, 0.25)); else ksGem(ctx, sp.p[0], sp.p[1] - 6, 12, C.red, { glint: ksIn(t, 146.4, 146.9) ? 1 : 0 }); }
  if (t > 157.66 && t < 159.6) for (const [i, dx] of [[0, 70], [1, 130]]) { const u = ksB(t, 157.7 + i * 0.08, 0.5, 'out'); ksRing(ctx, 520 + 40 + dx * u, fallY(t, 157.7 + i * 0.08, 158.2 + i * 0.08, 790, 926) - 50 * Math.sin(Math.PI * Math.min(1, u)), 10, { fake: 1, stoneFake: 1, rot: (t - 157.7) * 9 }); }
  // the WANTED poster falls into his lap (S20)
  if (t >= 176.0) { const u = ksB(t, 176.0, 0.6, 'in'); ksPoster(ctx, K.lerp(KS_POSTER[0], 700, u) + 10 * swing(t, 176.0, 1, 2.2, 3), fallY(t, 176.0, 176.6, KS_POSTER[1], 858), { rot: 0.5 * Math.sin(Math.PI * u) * (1 - u) + 0.08 + swing(t, 176.6, 0.05, 2, 4), s: K.lerp(1, 0.85, u), fallen: true }); }
  // effects in the room
  if (ksIn(t, 9.82, 11.2)) { const h = ksHead(Sh); [[14, -40, 9.95], [10, 110, 10.3], [-20, 120, 10.6]].forEach(([dx, dy, a]) => { const k = ksPulse(t, a, 0.5); if (k > 0) star(ctx, h[0] + dx * 1.1, h[1] + dy * 1.1 - 0, 14 * k, C.white, t * 3); }); }
  if (ksIn(t, 100.82, 101.8)) { const h = ksHead(Ch); soundArcs(ctx, h[0] + 50, h[1] + 10, 1, t); }
  if (ksIn(t, 130.96, 132.3)) { const h = ksHead(Ch); for (let i = 0; i < 3; i++) { const u = ((t - 130.96) * 0.7 + i / 3) % 1; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u) * ksFade(t, 130.96, 132.3, 0.3); sfx(ctx, 'Z', h[0] - 40 - 40 * u, h[1] - 70 - 90 * u, 28 + 18 * u, 1, { fill: C.white }); ctx.restore(); } }
  ksCloudsRoom(ctx, t, { Ch, Sh });
}
function ksPursePos(t) { const Ch = ksChief(t), Sh = ksSharper(t);
  if (t < 105.84) { const p = ksTrPurse(t); return [p[0], p[1] + 8, 0.8]; }
  if (t < 106.12) { const h = ksHandW(Ch, 'L'); return [h[0], h[1] + 8, 0.8]; }
  if (t < 106.43) { const h = ksHandW(Ch, 'R'); return [h[0], h[1] + 8, 0.8]; }
  const palm = ksSharperPalm(t); if (t < 106.6) { const h0 = ksHandW(Ch, 'R'); return [palm[0], fallY(t, 106.43, 106.6, h0[1] + 8, palm[1] - 8), 0.8]; }
  if (t < 107.54) return [palm[0], palm[1] - 8, 0.8];
  const c = ksW(Sh, [4, -120]); return [c[0], c[1], 0.8 * (1 - ksB(t, 107.54, 0.1, 'lin'))]; }

// ---------- thought clouds in the room ----------
function ksArrowW(c, a, b, p, w = 10) { if (p <= 0) return; const e = [K.lerp(a[0], b[0], p), K.lerp(a[1], b[1], p)], ang = Math.atan2(e[1] - a[1], e[0] - a[0]);
  c.save(); c.lineCap = 'round'; c.lineWidth = w + 8; c.strokeStyle = C.black; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(e[0], e[1]); c.stroke(); c.lineWidth = w; c.strokeStyle = C.yellow; c.stroke(); c.restore();
  const hp = [[e[0] + Math.cos(ang) * 26, e[1] + Math.sin(ang) * 26], [e[0] + Math.cos(ang + 2.2) * 20, e[1] + Math.sin(ang + 2.2) * 20], [e[0] + Math.cos(ang - 2.2) * 20, e[1] + Math.sin(ang - 2.2) * 20]]; shape(c, [...hp, hp[0]], C.yellow, { lw: 4, seed: 650 }); }
function ksCloudsRoom(ctx, t, A) {
  const hd = (P) => { const h = ksHead(P); return [h[0], h[1] - 50]; };
  // S5: the confession (robbery on a dusk road)
  if (ksIn(t, 32.74, 36.9)) thoughtCloud(ctx, 450, 330, 500, 330, t, { p: ksB(t, 32.74, 0.7, 'lin') * (1 - ksB(t, 36.6, 0.25)), tail: hd(A.Sh), scale: 0.45, at: [520, 740], bg: '#ffd9a8', seed: 4, inside: (c) => ksDreamRobbery(c, t) });
  if (ksIn(t, 36.6, 37.0)) { const u = ksB(t, 36.6, 0.4, 'out'); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(450 + Math.cos(a) * 160 * (0.6 + u), 330 + Math.sin(a) * 110 * (0.6 + u)); ctx.lineTo(450 + Math.cos(a) * 160 * (0.8 + u), 330 + Math.sin(a) * 110 * (0.8 + u)); ctx.stroke(); ctx.restore(); } }
  // S10: the honest shop
  if (ksIn(t, 86.56, 90.2)) thoughtCloud(ctx, 350, 400, 400, 270, t, { p: ksB(t, 86.56, 0.6, 'lin') * (1 - ksB(t, 89.9, 0.25)), tail: hd(A.Sh), scale: 0.44, at: [500, 740], bg: '#dff0ff', seed: 7, inside: (c) => ksDreamShop(c, t) });
  // S11: the chief's sum
  if (ksIn(t, 97.92, 100.82)) thoughtCloud(ctx, 720, 335, 380, 250, t, { p: ksB(t, 97.92, 0.6, 'lin') * (1 - ksB(t, 100.55, 0.25)), tail: hd(A.Ch), scale: 1, at: [0, 0], bg: '#fff7d0', seed: 9, inside: (c) => {
    const k1 = ksPop(t, 98.1), k2 = ksPop(t, 98.6); if (k1 > 0) sfx(c, '40,000', -70, -40, 50 * k1, 1, { fill: C.yellow }); if (k2 > 0) { sfx(c, '1,000', -70, 30, 38 * k2, 1, { fill: C.white }); c.save(); c.lineWidth = 6; c.strokeStyle = C.red; c.beginPath(); c.moveTo(-120, 30); c.lineTo(-20, 22); c.stroke(); c.restore(); }
    ksCoinPile(c, 85, 50, 16, ksB(t, 98.9, 1.0, 'lin')); if (t > 99.62) sfx(c, 'PROFIT!', 70, -50, 46 * ksPop(t, 99.62), 1, { fill: C.red, rot: -0.08 }); } });
  // S20: the sharper far away on a dusk road, tossing the purse; the real price
  if (ksIn(t, 167.62, 175.3)) thoughtCloud(ctx, 450, 520, 380, 260, t, { p: ksB(t, 167.62, 0.7, 'lin') * (1 - ksB(t, 174.74, 0.4)), tail: hd(A.Ch), scale: 0.37, at: [520, 700], bg: '#ffc98a', seed: 12, inside: (c) => ksDreamEscape(c, t) });
}
function ksDreamRobbery(c, t) {
  desertRoad(c, { w: 1100, preset: 'dusk', palms: [[300, 330, 0.05]], milestones: [], thorns: [760], rocks: [], road: true, sun: [880, 420], t });
  const tx = ksTr(t, [[0, 820], [32.74, 640, 0.86], [34.9, 1200, 0.9]]), run = t > 34.9;
  const T = { x: tx, y: 900, s: 1, dir: run ? 1 : -1, costume: 'villager', ...ksWalk((tt) => ksTr(tt, [[0, 820], [32.74, 640, 0.86], [34.9, 1200, 0.9]]), t, 16), eyes: t > 33.4 ? 'wide' : 'open', sq: t > 33.4 && t < 34.9 ? 0.9 : 1, mouth: t > 33.4 ? 'o' : 'closed', gaze: [-1, 0], seed: 71 };
  T.y = 900; if (run) T.tip = 0.15; T.handL = PERSON_HANDS.headHold.L; T.handR = t > 34.6 ? PERSON_HANDS.headHold.R : [40, -90];
  const [rx, ry] = hop(t, 33.12, 0.5, 300, 480, 70); const R = { x: rx, y: 900 - ry, s: 1, dir: 1, costume: 'thief', brow: 1, mouth: 'open', seed: 73, sq: landSquash(t, 33.62, 0.15) * anticipate(t, 32.9, 0.22, 0.12), gaze: [1, 0] };
  R.handL = t > 33.5 ? PERSON_HANDS.armsOut.L : [-30, -90]; R.handR = t > 34.5 ? [70, -130] : t > 33.5 ? PERSON_HANDS.armsOut.R : [30, -90];
  if (t < 33.12) { c.save(); c.globalAlpha = 0.9; } person(c, R); if (t < 33.12) c.restore();
  person(c, T);
  const h = t < 34.55 ? [tx - 30, 830] : [rx + 82, 770 - 10]; ksPurse(c, h[0], h[1], 0.9);
  if (ksIn(t, 34.55, 35.6)) for (let i = 0; i < 4; i++) { const u = ksB(t, 34.55 + i * 0.05, 0.6, 'out'); shape(c, ell(K.lerp(560, 520 + i * 60 - 60, u), 760 - 140 * Math.sin(Math.PI * u) + 140 * u * u, 12, 12, 12), C.yellow, { lw: 3, seed: 640 }); }
  if (run) dustBurst(c, tx - 60, 900, (t - 34.9) % 0.4, 3, 8, 16, 30, 0.4, Math.floor(t * 3));
}
function ksDreamShop(c, t) {
  c.fillStyle = '#9fd0ff'; c.fillRect(-200, 300, 1400, 700); seg(c, -200, 900, 1300, 900, 6, C.black, 0); c.fillStyle = '#e6c27a'; c.fillRect(-200, 902, 1400, 300);
  person(c, { x: 500, y: 900, s: 1.1, dir: 1, costume: 'merchant', pal: { ...KS_SH_PAL, robe: KS_GREEN }, mouth: 'smile', seed: 81, handR: [64, -196 + 12 * Math.sin(t * 9)], gaze: [0, 0.1] });
  shape(c, [[360, 780], [640, 780], [640, 760], [360, 760]], C.white, { lw: 5, seed: 641 });
  marketStall(c, { x: 500, kind: 'cloth', w: 420 });
}
function ksDreamEscape(c, t) {
  desertRoad(c, { w: 1100, preset: 'dusk', palms: [[860, 320, -0.05]], milestones: [], thorns: [], rocks: [], road: true, sun: [900, 520], t });
  const xf = (tt) => ksTr(tt, [[0, 200], [167.62, 560, 7.2]]), sx = xf(t);
  const S = { s: 0.95, dir: 1, costume: 'merchant', pal: KS_SH_PAL, ...ksWalk(xf, t, 12), y: 900, mouth: 'smile', brow: 0.5, gaze: [0, -0.6], seed: 83 }; S.handR = [50, -170]; person(c, S);
  person(c, { s: 0.9, dir: 1, costume: 'servant', ...ksWalk((tt) => xf(tt) - 120, t, 11), y: 900, mouth: 'smile', seed: 85, handR: [30, -60] });
  const h = ksHandW({ ...S, aR: armTo(1, KS_SH, S.handR) }, 'R'), ph = ((t - 167.62) * 1.2) % 1, py = h[1] - 20 - 90 * Math.sin(Math.PI * ph);
  ksPurse(c, h[0] + 6, py, 0.75, { rot: ph * 6 });
  if (t > 171.16) { const k = ksPop(t, 171.16); sfx(c, '1,000', h[0] + 10, h[1] - 175, 70 * k, 1, { fill: C.yellow });
    const a = ksB(t, 171.5, 0.5, 'out'); ksArrowW(c, [h[0] + 120, h[1] - 175], [800, 610], a, 12);
    if (t > 171.9) { const k2 = ksPop(t, 171.9); heart(c, 860, 640, 90 * k2, { fill: C.red }); ksBadge(c, 860, 625, 26 * k2, 0); } }
}

// ---------- the streets ----------
function ksNightStreet(ctx, t) {
  const A = marketStreet(ctx, { palette: 'cold', u: 0.78, palace: false, windowsLit: 1, doors: [ksTr(t, [[0, 0], [117.7, 1, 0.4], [119.0, 0, 0.4]])], t });
  const d = A.doors[0], dx = d.cx;
  const vx = (tt) => ksTr(tt, [[0, dx], [117.9, 230, 0.7], [120.16, 1250, 0.84]]), sx = (tt) => ksTr(tt, [[0, dx], [118.46, 150, 0.44], [120.16, 1150, 0.84]]);
  const run = t > 120.16, R = KSH;
  const V = { s: 1.0, dir: 1, costume: 'servant', ...ksWalk(vx, t, 16), y: 900 - (ksIn(t, 119.6, 119.95) ? 26 * Math.sin(Math.PI * (t - 119.6) / 0.35) : 0), seed: 23, mouth: 'smile', gaze: [0.6, -0.3] };
  V.sq = (ksIn(t, 119.24, 119.6) ? 1.08 : 1) * landSquash(t, 119.95, 0.14); if (run) V.tip = 0.12;
  if (ksIn(t, 119.24, 119.95)) { V.aL = [-2.5, -2.8]; V.aR = [2.5, 2.8]; }
  const S = { s: 1.1, dir: 1, costume: 'merchant', pal: KS_SH_PAL, ...ksWalk(sx, t, 16), y: 900, seed: 17, gaze: [0, 0] };
  S.gaze = gazePlan(t, [[118.46, [-1, 0]], [118.75, [1, 0]], [119.0, [-1, 0.1]], [119.4, [0.7, -0.2]], [120.16, [0.5, -0.6]]], 0.07);
  S.mouth = t > 119.4 ? 'smile' : 'closed'; S.brow = t > 120.16 ? 0.5 : -0.2; if (run) S.tip = 0.12;
  S.aL = ksArm(t, S, -1, [[0, KSH.rest.map((v, i) => (i ? v : -v))], [119.0, { w: [d.x1 - 10, 770] }, 0.25], [119.45, [-36, -62], 0.3]]);
  S.aR = ksArm(t, S, 1, [[0, R.rest], [120.1, [44, -150], 0.2]]);
  if (t > 117.85) person(ctx, V); if (t > 118.4) person(ctx, S);
  if (t > 120.1) { const h = ksHandW(S, 'R'), u = ksB(t, 120.16, 0.45, 'lin'); ksPurse(ctx, h[0], h[1] - 12 - 70 * Math.sin(Math.PI * u), 0.7, { rot: u * 6 }); }
  if (run) for (const [xx, k] of [[sx(t) - 50, 1], [vx(t) - 50, 2]]) dustBurst(ctx, xx, 900, (t - 120.16) % 0.3, 3, 6, 14, 24, 0.3, k + Math.floor(t * 3));
}
const KS_GA = (t) => ksTr(t, [[0, 75], [160.24, 466, 0.76], [161.9, 1200, 0.95], [163.7, 1440, 0.8]]);
const KS_GB = (t) => ksTr(t, [[0, 75], [160.74, 640, 0.56], [162.0, 1580, 0.9], [163.75, 1560, 0.6]]);
function ksDayStreet(ctx, t, camX) {
  marketStreet(ctx, { w: 2400, palette: 'clear', preset: 'day', palace: false, stalls: [{ x: 700, kind: 'cloth' }, { x: 1750, kind: 'pots' }], props: [['barrel', 520], ['crate', 1250], ['sacks', 1980]], camX, doors: [1], t });
  // the chief in his doorway, pointing down the street and shaking his fist
  const C1 = { x: 78, y: 900, s: 1.1, dir: -1, costume: 'vizier', pal: KS_CH_PAL, age: 0.45, brow: 1, mouth: 'frown', gaze: [1, 0], seed: 31, eyes: 'open' };
  C1.aL = [-1.75 - 0.1 * Math.sin(t * 9), -1.65]; C1.aR = [2.3 + 0.1 * Math.sin(t * 14), 2.65]; C1.x += tremble(t, 1.5, 10);
  person(ctx, C1); ksFlush(ctx, C1, 0.6, t);
  // barrel lid lifted by guard A
  const lid = ksWin(t, 161.1, 161.85, 0.2); shape(ctx, ell(522 + 10 * lid, 790 - 60 * lid, 40, 9, 16), '#a8741a', { lw: 4, seed: 642 });
  const ga = ksGuardP(0, KS_GA, t), gb = ksGuardP(1, KS_GB, t);
  ga.gaze = gazePlan(t, [[160.24, [1, 0]], [161.1, [0.6, 0.9]], [161.5, [0.2, 0.9]], [161.9, [1, 0]], [162.95, [0.5, 0.5]], [163.3, [-0.4, 0.4]], [163.7, [1, 0]], [164.62, [0, 0.05]]], 0.07);
  gb.gaze = gazePlan(t, [[160.74, [1, 0]], [161.3, [0.4, -0.9]], [161.65, [-0.3, -0.9]], [162.0, [1, 0]], [162.95, [0.8, -0.2]], [163.3, [1, 0.3]], [163.7, [-1, 0]], [164.62, [0, 0.05]]], 0.07);
  if (ksIn(t, 161.0, 161.95)) { ga.lean = 0.3; ga.handR = [60, -170]; ga.aR = null; ga.handRW = null; }
  if (ksIn(t, 162.85, 163.75)) { ga.lean = 0.35; ga.kneel = 0.4; }
  if (ksIn(t, 161.3, 162.0)) gb.handR = PERSON_HANDS.shield.R;
  if (ksIn(t, 162.9, 163.7)) { gb.handR = PERSON_HANDS.shield.R; gb.tip = 0.06; }
  const shrug = ksWin(t, 164.62, 166, 0.2); if (shrug > 0) for (const g of [ga, gb]) { g.handL = PERSON_HANDS.palmsUp.L; g.handR = PERSON_HANDS.palmsUp.R; g.brow = -0.8; g.mouth = 'frown'; g.sq = 1 + 0.04 * ksPulse(t, 164.7, 0.4); }
  if (t > 163.0) { ga.mouth = 'frown'; gb.mouth = 'frown'; ga.drop = 4 * ksB(t, 163.0, 0.6); gb.drop = 4 * ksB(t, 163.3, 0.6); }
  if (t > 160.2) ksDrawGuard(ctx, 0, ga); if (t > 160.7) ksDrawGuard(ctx, 1, gb);
  for (const [xf, t0, k] of [[KS_GA, 160.24, 1], [KS_GB, 160.74, 2]]) for (const f of ksFalls(xf, t0, Math.min(t, 164.5), 16).slice(-3)) dustBurst(ctx, f.x - 20, 900, t - f.t, 3, 5, 11, 20, 0.4, k * 10 + Math.round(f.t * 10));
  // the wind: a dust curl blows through the empty street
  if (ksIn(t, 162.9, 164.4)) { const u = ksB(t, 162.9, 1.5, 'lin'), x = 1000 + 900 * u; ctx.save(); ctx.globalAlpha = ksFade(t, 162.9, 164.4, 0.3) * 0.8; ctx.lineWidth = 6; ctx.strokeStyle = '#c9a46a'; ctx.beginPath(); for (let a = 0; a < 12; a += 0.3) ctx.lineTo(x + Math.cos(a + t * 8) * (4 + a * 2.6), 860 - a * 2 + Math.sin(a + t * 8) * (4 + a * 2.6)); ctx.stroke(); ctx.restore(); }
}

// ---------- camera ----------
const KS_CAM = [[0, 500, 640, 1.0], [5.3, 500, 640, 1.0], [7.9, 560, 700, 1.3], [7.99, 560, 700, 1.3], [8.0, 480, 650, 1.05], [12.4, 480, 650, 1.05], [14.4, 400, 680, 1.25], [15.2, 400, 680, 1.25], [16.8, 480, 650, 1.05], [17.17, 480, 650, 1.05],
  [17.18, 560, 700, 1.3], [21.0, 600, 690, 1.6], [23.09, 600, 690, 1.6], [23.1, 610, 700, 1.55], [30.64, 610, 700, 1.55], [33.0, 600, 600, 1.2], [36.59, 600, 600, 1.2], [36.6, 600, 640, 1.25], [40.0, 610, 700, 1.7], [44.38, 610, 700, 1.7],
  [45.6, 470, 700, 1.3], [55.85, 470, 700, 1.3], [55.86, 430, 790, 2.3], [63.4, 430, 790, 2.55], [64.4, 430, 790, 2.55], [65.3, 520, 720, 1.5], [68.61, 520, 720, 1.5], [68.62, 540, 710, 1.5], [77.63, 540, 710, 1.5],
  [77.64, 540, 690, 1.4], [91.17, 560, 660, 1.3], [91.18, 690, 660, 2.0], [96.0, 690, 660, 2.3], [97.0, 640, 560, 1.5], [100.81, 640, 560, 1.5], [100.82, 600, 690, 1.2], [105.0, 600, 690, 1.2], [105.8, 540, 700, 1.3], [112.17, 540, 700, 1.3],
  [112.18, 500, 700, 1.4], [117.69, 500, 700, 1.4], [117.7, 420, 690, 1.15], [118.2, 420, 690, 1.15], [120.6, 620, 690, 1.15], [120.95, 620, 690, 1.15],
  [120.96, 560, 740, 1.7], [122.5, 560, 740, 1.7], [129.0, 520, 620, 1.15], [132.69, 520, 620, 1.15], [132.7, 500, 680, 1.15], [139.2, 500, 680, 1.15], [141.2, 500, 720, 1.5], [142.01, 500, 720, 1.5],
  [142.02, 480, 770, 2.1], [154.97, 480, 770, 2.1], [154.98, 640, 660, 1.9], [157.8, 640, 660, 1.9], [158.6, 480, 690, 1.3], [159.57, 480, 690, 1.3],
  [159.58, 500, 615, 1.0], [165.41, 500, 615, 1.0], [165.42, 580, 720, 1.6], [170.5, 580, 720, 1.6], [176.0, 520, 620, 1.1], [181, 520, 620, 1.1]];
const ksCamX = (t) => ksTr(t, [[0, 0], [160.4, 0], [160.4, 1000, 3.8]]);
function ksCam(t) { const k = KS_CAM, i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  if (ksSet(t) === 'day') c = { x: 500 + ksCamX(t), y: 615, zoom: 1.0 };
  const z = c.zoom, WW = ksSet(t) === 'day' ? 2400 : 1000; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const ksP = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- lettering (panel space, view 1000 x 1230) ----------
function ksOverlays(ctx, t, cam, S) {
  const P = (x, y) => ksP(x, y, cam), al = (a, b, f = 0.2) => ksFade(t, a, b, f);
  const lab = (txt, x, y, a, b, o = {}) => { if (!ksIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = al(a, b); S.label(ctx, txt, x, y, ksB(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 76, o = {}) => { if (!ksIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = al(a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (!ksIn(t, a, b)) return; ctx.save(); ctx.globalAlpha = al(a, b); S.arrow(ctx, a0, a1, ksB(t, a, 0.4), { width: 16, ...o }); ctx.restore(); };
  const X = (x, y, r, a) => { const k = ksB(t, a, 0.1, 'lin'); if (k <= 0) return; ctx.save(); ctx.lineCap = 'round'; for (const [s0, s1] of [[[-1, -1], [1, 1]], [[1, -1], [-1, 1]]]) { ctx.lineWidth = 16; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x + s0[0] * r, y + s0[1] * r); ctx.lineTo(x + K.lerp(s0[0], s1[0], k) * r, y + K.lerp(s0[1], s1[1], k) * r); ctx.stroke(); ctx.lineWidth = 9; ctx.strokeStyle = C.red; ctx.stroke(); } ctx.restore(); };
  // S1: who and where
  lab('ALA AL-DIN', 330, 360, 0.3, 4.3); lab('CHIEF OF POLICE', 330, 440, 1.42, 4.3, { size: 40, fill: C.yellow }); arr([450, 470], P(640, 760), 1.6, 4.3, { bend: 0.2 });
  if (ksIn(t, 4.5, 8.0)) { ctx.save(); ctx.globalAlpha = al(4.5, 8.0, 0.3); S.title(ctx, 'KUS', 150, 170, ksB(t, 4.5, 0.6), { size: 64 }); ctx.restore(); }
  // S2
  if (ksIn(t, 8.05, 8.9)) { const p = P(200, 640); word('KNOCK!', p[0] + 40, p[1], 8.05, 8.9, 70, { rot: -0.08 }); }
  if (ksIn(t, 15.3, 16.9)) { const c = ksChestPos(t) || { x: 400, y: 860 }, p = P(c.x, c.y - 150); lab('HEAVY!', p[0] + 60, p[1] - 190, 15.3, 16.9); arr([p[0] + 60, p[1] - 160], [p[0] + 10, p[1] - 8], 15.4, 16.9); }
  // S3: secret
  { const h = ksP(...ksSharperHead(t), cam); lab('SECRET...', h[0] - 150, h[1] - 150, 20.94, 22.6, { size: 44 }); }
  // S4: what do you need?
  word('?', ...P(615, 600), 28.7, 29.9, 80, { fill: C.yellow });
  // S5 / S6
  word('STAND AND DELIVER!', ...P(450, 210), 34.6, 36.5, 46, { fill: C.white, rot: -0.04 });
  { const h = ksP(...ksSharperHead(t), cam); lab('I REPENT!', h[0] - 120, h[1] - 170, 40.1, 41.7); }
  // S7: three icons, then the counter
  [[49.34, 'bracelet', 330], [50.1, 'gem', 400], [51.22, 'bar', 470]].forEach(([a, kind, wx]) => { if (!ksIn(t, a, 54.2)) return; const k = ksPop(t, a), m = ksB(t, 53.8, 0.4, 'in'), q = P(wx, 640), x = K.lerp(q[0], 500, m), y = K.lerp(q[1], 200, m);
    ctx.save(); ctx.globalAlpha = 1 - m * 0.8; ctx.translate(x, y); ctx.scale(k * cam.zoom * (1 - 0.5 * m), k * cam.zoom * (1 - 0.5 * m)); shape(ctx, ell(0, 0, 44, 44, 20), C.white, { lw: 5, seed: 660 });
    if (kind === 'bracelet') { ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(0, 4, 24, 16, 0, 0, 7); ctx.stroke(); ctx.lineWidth = 7; ctx.strokeStyle = KS_GOLD; ctx.stroke(); ksGem(ctx, 0, -12, 9, C.red); }
    else if (kind === 'gem') ksGem(ctx, 0, 2, 24, C.blue, { glint: 1 }); else { shape(ctx, [[-28, 12], [28, 12], [18, -12], [-18, -12], [-28, 12]], KS_GOLD, { lw: 4, seed: 661, dot: KS_GOLDD, pitch: 6, rad: 0.25 }); star(ctx, 12, -8, 9, C.white, t * 3); }
    ctx.restore(); });
  if (ksIn(t, 53.8, 55.86)) { const v = Math.round(K.lerp(0, 40500, ksB(t, 53.8, 0.9, 'out')) / 100) * 100, val = t > 54.9 ? Math.round(K.lerp(40500, 40000, ksB(t, 54.9, 0.2)) / 100) * 100 : v; ctx.save(); ctx.globalAlpha = al(53.8, 55.86, 0.2); S.counter(ctx, val, 500, 230, ksB(t, 53.8, 0.3), { size: 96 }); S.label(ctx, 'DINARS', 500, 330, ksB(t, 54.0, 0.3), { size: 44, align: 'center', fill: C.yellow }); ctx.restore(); }
  // S10: the offer
  if (ksIn(t, 82.64, 86.4)) { const p = P(470, 600); lab('40,000', p[0] - 120, p[1], 82.64, 86.4, { size: 48 }); const k = ksB(t, 82.9, 0.2, 'lin'); if (k > 0) { ctx.save(); ctx.globalAlpha = al(82.64, 86.4); ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(p[0] - 200, p[1] - 4); ctx.lineTo(p[0] - 200 + 165 * k, p[1] - 22); ctx.stroke(); ctx.restore(); }
    lab('ONLY 1,000!', p[0] + 150, p[1] - 70, 83.2, 86.4, { size: 52, fill: C.yellow }); }
  // S12: the purse
  if (ksIn(t, 104.5, 105.8)) { const pp = ksTrPurse(t), p = P(pp[0], pp[1] - 70); lab('1,000', p[0] + 10, p[1] - 30, 104.5, 105.8, { size: 40, fill: C.yellow }); }
  // S14
  if (ksSet(t) === 'night') { const x = ksTr(t, [[0, 150], [120.16, 1150, 0.84]]); const p = P(x, 640); word('HEE HEE!', p[0] + 150, p[1] - 150, 120.3, 120.95, 60, { fill: C.yellow, rot: -0.06 }); }
  // S16
  lab('MASTER GOLDSMITH', 330, 330, 136.0, 138.3, { size: 44 }); arr([330, 380], P(KS_GX(t), 680), 136.1, 138.3, { bend: -0.2 });
  if (ksIn(t, 139.76, 140.6)) { const h = ksP(...ksChiefHead(t), cam); lab('?', h[0] - 110, h[1] - 130, 139.76, 140.6, { size: 60, fill: C.yellow }); }
  // S17: the verdicts, each held until the next lands, no camera move
  word('TINK!', ...P(470, 690), 145.6, 146.3, 58, { fill: C.white, rot: -0.1 });
  if (ksIn(t, 148.86, 154.98)) { lab('GOLD', 250, 270, 148.86, 154.98, { size: 54, fill: C.yellow }); X(250, 255, 46, 148.95); }
  if (ksIn(t, 149.94, 154.98)) { lab('SILVER', 520, 200, 149.94, 154.98, { size: 54, fill: C.white }); X(520, 185, 46, 150.03); }
  lab('BRASS', 260, 1080, 151.18, 154.98, { size: 54, fill: '#e8a04a' }); arr([300, 1040], P(492, 935), 151.25, 154.98, { bend: -0.2 });
  lab('TIN', 800, 1080, 151.76, 154.98, { size: 54, fill: '#c9c9d2' }); arr([780, 1040], P(532, 935), 151.85, 154.98, { bend: 0.2 });
  word('CLINK!', ...P(440, 860), 153.4, 154.3, 50, { fill: C.white, rot: 0.08 });
  lab('GLASS', 500, 1170, 154.34, 154.98, { size: 60, fill: '#bfe6f0' });
  // S18 / S19
  word('GRRR!', 500, 230, 157.1, 158.4, 96, { fill: C.red, rot: -0.05 });
  if (ksIn(t, 162.16, 162.95)) { const a = ksP(K.lerp(KS_GA(t), KS_GB(t), 0.5), 560, cam), k = ksPop(t, 162.16) * ksFade(t, 162.16, 162.95, 0.2); ctx.save(); ctx.globalAlpha = Math.min(1, k); ctx.translate(a[0], a[1]); ctx.scale(k, k); shape(ctx, ell(0, 0, 70, 60, 20), C.white, { lw: 6, seed: 662 });
    ctx.setLineDash([8, 7]); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(-8, 4, 36, 22, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]); sfx(ctx, '?', 34, -4, 60, 1, { fill: C.red }); ctx.restore(); }
  if (ksSet(t) === 'day') { const p = ksP(1500, 560, cam); lab('GONE!', p[0], p[1] - 40, 164.7, 165.42, { size: 70, fill: C.yellow }); }
  // the card and the end
  if (t >= 132.05 && t < 133.35) S.transition(ctx, 1000, 1230, (t - 132.05) / 1.3, { caption: 'NEXT DAY...' });
  if (t >= 178.1) S.title(ctx, 'THE END', 500, 190, ksB(t, 178.1, 0.8), { size: 84, align: 'center' });
}

const SCENE = {
  duration: KS_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    const sh = K.spring(t, 16.95, 3, 14, 8) + K.spring(t, 157.04, 4, 14, 8) + K.spring(t, 178.05, 3, 14, 8);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / 1230);
    const cam = ksCam(t), set = ksSet(t), WW = set === 'day' ? 2400 : 1000;
    ctx.save(); K.camera(ctx, 1000, 1230, cam);
    if (set === 'room') ksRoom(ctx, t, cam); else if (set === 'night') ksNightStreet(ctx, t); else ksDayStreet(ctx, t, ksCamX(t));
    ctx.restore();
    if (t < 1.0) { ctx.save(); ctx.globalAlpha = 1 - ksB(t, 0, 1.0); ctx.fillStyle = C.paper; ctx.fillRect(0, 0, 1000, 1230); ctx.restore(); }
    ksOverlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's eleven quiet effects, each inside a narration pause (master 0.6 at render)
    k.play('chime', 4.7, { note: 'E6', gain: 0.35 });
    k.play('thud', 16.95, { gain: 0.45 });
    k.play('whoosh', 22.2, { gain: 0.3 });
    k.play('pop', 26.1, { gain: 0.35 });
    k.play('chime', 43.9, { note: 'G6', gain: 0.3 });
    k.play('chime', 68.2, { note: 'C6', gain: 0.35 });
    k.play('pop', 77.35, { gain: 0.35 });
    k.play('pop', 90.9, { gain: 0.35 });
    k.play('chime', 111.5, { note: 'E6', gain: 0.3 });
    k.play('whoosh', 132.5, { gain: 0.35 });
    k.play('thud', 178.05, { gain: 0.5 });
  },
};
window.SCENE = SCENE;
