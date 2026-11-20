// ===== ALI-01-ANIME shots S5-S11 (34.5 - 89.48 s): the forty, Open Sesame, inside, MUCH LATER, Close Sesame, the descent, his turn =====

// the horse line at the rock (leader first); i = rider palette index (-1 = the leader). Drawn far (small y) first.
const AB_HL = [{ x: 1470, y: 902, s: 0.82, pal: 2, i: -1 }, { x: 1330, y: 886, s: 0.74, pal: 1, i: 0 }, { x: 1210, y: 906, s: 0.8, pal: 2, i: 1 },
  { x: 1090, y: 884, s: 0.72, pal: 1, i: 2 }, { x: 970, y: 904, s: 0.78, pal: 1, i: 3 }, { x: 850, y: 886, s: 0.72, pal: 2, i: 4 }, { x: 730, y: 902, s: 0.76, pal: 1, i: 5 }];
const abByY = (list) => [...list].sort((a, b) => a.y - b.y);
// a standing horse in the line with its own idle life (tail, ears, one grazes, one sleeps)
function abLineHorse(h, k, tc, o = {}) {
  return { x: h.x, y: h.y, s: h.s, dir: o.dir ?? 1, pal: h.pal, tailSwish: osc(tc, 1.7 + k * 0.23, k * 0.37), earL: 0.3 + idleSway(tc, 40 + k, 0.3, 1.9), earR: 0.2 + idleSway(tc, 50 + k, 0.3, 2.3),
    headDown: k === 3 ? 0.7 + 0.2 * osc(tc, 2.6) : idleSway(tc, 60 + k, 0.08, 3.1) + 0.1, neck: idleSway(tc, 70 + k, 0.1, 3.7), lid: o.sleep && k === 2 ? 1 : abLid(tc, 80 + k), ...o.P };
}
function abGladeWide(m) { return (ctx, t, cam) => { ctx.save(); K.camera(ctx, 1000, 1230, cam); ctx.drawImage(abGladePlate(m), 0, 0); ctx.restore(); }; }

// ---------- S5 34.5-40.46: the column at full gallop, counter to 40, a sack, a tired horse, the accordion stop at the rock ----------
const AB_S5_L = (t) => 520 * (t - 34.5);
const AB_S5_RID = [[0, -230, 925, 0.9, 1], [1, -120, 868, 0.72, 2], [2, -470, 925, 0.9, 2], [3, -350, 868, 0.72, 1], [4, -560, 870, 0.72, 2], [5, -720, 905, 0.8, 1]];
function abS5Track(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon', L = AB_S5_L;
  abSilRow(ctx, L(t) - 1900, 850, t, 0.55, 1, 0.75, 1); abSilRow(ctx, L(t) - 2500, 846, t, 0.5, 1, 0.6, 2);
  abDust(ctx, L(t) - 900, 900, 1400, 200, t, 0.55);
  const rows = [...AB_S5_RID.map(([i, off, y, s, pal]) => ({ i, off, y, s, pal })), { i: -1, off: 0, y: 912, s: 0.95, pal: 2 }].sort((a, b) => a.y - b.y);
  for (const r of rows) {
    const xf = (u) => L(u) + r.off + 22 * Math.sin(u * 1.3 + r.i), H = { y: r.y, s: r.s, dir: 1, pal: r.pal, ...walk(xf, tc, { stride: GAIT.horse * r.s }), gallop: 1, earL: -0.3 + 0.2 * Math.sin(r.i), earR: -0.2, tailUp: 0.7 };
    const tired = r.i === 5; if (tired) { H.gallop = 0.6; H.headDown = 0.4; H.earL = -0.6; H.earR = -0.7; H.load = ['sack', 'sack']; }
    const bob = 6 * Math.sin((H.ph || 0) * 2 + r.i), PP = { gaze: [1, 0.1], tip: r.i < 0 ? 0.12 : 0.06 + 0.04 * Math.sin(r.i), lid: abLid(t, 90 + r.i), lurch: 0.08 * Math.sin((H.ph || 0) * 2 + r.i) };
    if (r.i === 1) { PP.gaze = [-1, 0]; }                                     // one looks back
    if (r.i === 3) { PP.mouth = 'o'; PP.lid = 0.7; }                           // one yawns
    if (tired && tc > 37.5) { PP.handRW = [H.x + 110 * r.s, H.y - 250 * r.s + 8 * Math.abs(osc(tc, 0.3))]; PP.gaze = [1, 0.5]; }
    if (r.i < 0) { PP.brow = 0.7; PP.mouth = 'closed'; }
    abRider(ctx, r.i, H, PP, m, { cloak: r.i < 0 ? 1.3 : 1, t: t + r.i * 0.2, sacks: !tired, sackBob: bob, coin: r.i === 0 });
    for (const sd of [0, 1]) if ((Math.floor((H.ph || 0) / Math.PI) + sd) % 2 === 0) dustBurst(ctx, H.x - 60 * r.s, H.y + 2, ((H.ph || 0) % Math.PI) / 9, 2, 3, 7, 18, 0.25, r.i + 3);
  }
}
function abS5Cam(t) { const L = AB_S5_L(t); if (t < 36.54) return { x: L - 96, y: 700, zoom: 1.25 }; if (t < 37.32) return { x: L - 230 - 70, y: 700, zoom: 2.4 }; return { x: L - 720 + 40, y: 720, zoom: 1.6 }; }
AB_SHOTS.push({ a: 34.5, b: 38.2, ww: 1e5, cam: abS5Cam,
  under: (ctx, t, cam) => abForest(ctx, cam, t, 'afternoon', { shaftA: 0.1 }),
  world: abS5Track,
  over: (ctx, t, cam, S) => { abSpeed(ctx, [0, 640, 1000, 560], t, { dir: -1, n: 18, alpha: 0.35 }); abForestFront(ctx, cam, 'afternoon');
    if (t >= 35.02 && t < 36.54) S.counter(ctx, Math.round(1 + 39 * K.clamp((t - 35.02) / 1.3)), 790, 230, K.clamp((t - 35.02) / 0.3), { size: 150 }); } });
// the wide at the rock: riders arrive late one after another and bunch up (accordion), the leader's horse half rears
const AB_ARRIVE = (h, k, t) => { const d = 38.2 + 0.12 * k + (k === 0 ? 0 : 0.18), e = K.clamp((t - d) / 1.0); return h.x - 760 * Math.pow(1 - e, 2.2); };
function abRockRiders(ctx, t, m, o = {}) {
  const tc = AB_T2(t);
  abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h), xf = (u) => (o.arrive ? AB_ARRIVE(h, k, u) : h.x), H = { ...abLineHorse(h, k, tc), ...walk(xf, tc, { stride: GAIT.horse * h.s }), dir: o.dir ?? 1 };
    const stopT = 38.2 + 0.12 * k + 0.18 * (k > 0) + 1.0; if (o.arrive && tc < stopT) H.gallop = K.clamp(H.amp * 2 - 0.4);
    if (k === 0 && o.arrive) H.rear = 0.6 * pulse(tc, 38.6, 0.8);
    if (o.flinch && tc > 46.9 + 0.12 * k && tc < 47.6 + 0.12 * k) { H.rear = 0.3 * pulse(tc, 46.9 + 0.12 * k, 0.6); H.earL = -1; H.earR = -1; }
    const PP = { gaze: o.gaze || [1, -0.1], lid: abLid(t, 100 + k), lurch: o.arrive ? lurch(tc, stopT - 0.2, 0.2) : 0, tip: (o.lean || 0) + idleSway(tc, 110 + k, 0.02, 2.5) };
    if (k === 0 && o.noLeader) { abHorse(ctx, H, m, o.rim ? { rim: o.rim, light: [1, -0.2] } : {}); return; }
    abRider(ctx, h.i, H, PP, m, { cloak: 0.7, t, sacks: true, coin: k === 1, rim: o.rim, light: [1, -0.2] }); });
}
function abS5Wide(ctx, t, cam) {
  const m = 'afternoon'; abRock(ctx, 1820, 900, { model: m });
  abSilRow(ctx, -1500 + 1600 * K.ease.out(K.clamp((t - 38.2) / 1.6)), 884, t, 0.5, 1, 1); abDust(ctx, 1100, 905, 700, 150, t, 0.6 * (1 - K.clamp((t - 39.2) / 1.2)));
  abRockRiders(ctx, t, m, { arrive: true });
}
AB_SHOTS.push({ a: 38.2, b: 40.46, ww: 2400, cam: () => ({ x: 1700, y: 615, zoom: 1.0 }), under: abGladeWide('afternoon'), world: abS5Wide,
  over: (ctx, t) => abLeafFrame(ctx, t, { m: 'afternoon', gaze: t < 39.44 ? [0.9, 0.3] : [0.6, 0.9], lid: abBlinkAt(AB_T3(t), 39.6) * 0.9 }) });

// ---------- S6 40.46-50.32: the leader dismounts, calls; the impact frame; the rock splits; the gold door; his eyes ----------
const AB_LX = (t) => kfn(t, [[41.15, 1545], [41.7, 1625]]);
const AB_S6_ARM = [[42.3, 0], [42.75, -0.4], [43.09, 1.12], [43.35, 0.96], [43.6, 1.0], [44.6, 1.0], [45.0, 0.6]];
function abLeaderOnFoot(ctx, t, m, o = {}) {
  const tc = AB_T2(t), x = o.x ?? AB_LX(tc), P = { x, y: 900, dir: 1, ...walk(AB_LX, tc, { stride: 26 }), gaze: [1, -0.3], lid: abLid(t, 120), tip: idleSway(tc, 121, 0.015, 3.2), mouth: 'closed', brow: 0.7 };
  if (tc < 41.15) { const [hx, lift] = hop(tc, 40.8, 0.32, 1490, 1545, 60); P.x = hx; P.y = 900 - lift - (tc < 40.8 ? 150 : 0); if (tc < 40.8) P.y = 900 - 150; }
  P.sq = landSquash(tc, 41.12, 0.12) * (tc > 42.2 && tc < 43.0 ? 1 + 0.04 * Math.sin(Math.PI * beatIn(tc, 42.2, 43.0)) : 1);
  const a = flow(tc, AB_S6_ARM) + lagged((u) => flow(u, AB_S6_ARM), tc, 0.1, 0.3);
  if (tc > 42.3) P.handR = a < 0 ? [-30 - 30 * -a, -110] : [K.lerp(20, 112, Math.min(a, 1.2)), K.lerp(-120, -214, Math.min(a, 1.2))];
  P.talk = abTalk(t, 43.09, 44.62, 3); if (P.talk) P.mouth = 'open';
  if (o.P) Object.assign(P, o.P);
  const draw = (c) => abLeader(c, P, m);
  if (o.rim) abCel(ctx, [P.x, P.y, 300, 320], draw, { k: 0, rim: o.rim, light: o.light || [1, -0.2], rimW: 4 }); else draw(ctx);
  return P;
}
function abS6World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon', hit = 45.45, open = K.clamp((t - 45.9) / 1.4), crack = K.clamp((t - hit) / 0.45), glow = K.clamp((t - hit) / 0.6);
  abRock(ctx, 1820, 900, { model: m, open: K.ease.inOut(open), crack, glow, t });
  for (const [x, y] of [[1820, 300], [1820, 880]]) dustBurst(ctx, x, y, t - 45.95, 6, 4, 9, 40, 1.1, 7);
  if (open > 0 && open < 1) dustBurst(ctx, 1820, 260 + ((t * 300) % 500), (t * 3) % 0.6, 3, 3, 6, 20, 0.6, Math.floor(t * 5));
  const lit = t > 45.9 ? '#ff7ad9' : null;
  abRockRiders(ctx, t, m, { noLeader: true, rim: lit, flinch: true, lean: tc > 43.2 && tc < 45.4 ? 0.05 : 0 });
  if (tc <= 40.8) { const h = AB_HL[0]; abRider(ctx, -1, abLineHorse(h, 0, tc), { gaze: [1, -0.2], lid: abLid(t, 120) }, m, { cloak: 0.8, t }); }
  else abLeaderOnFoot(ctx, t, m, { rim: lit ? '#ffd76a' : null });
  if (t > 47.88 && t < 48.34) abGlint(ctx, 1820, 900 - 336, 60, (t - 47.88) / 0.46);
}
function abS6Cam(t) { if (t < 45.45) return { x: 1560, y: 660, zoom: 1.5 }; return K.camAt([[45.45, { x: 1820, y: 600, zoom: 1.05 }], [47.3, { x: 1820, y: 600, zoom: 1.05 }], [48.3, { x: 1820, y: 700, zoom: 1.6 }]], t); }
AB_SHOTS.push({ a: 40.46, b: 48.34, ww: 2400, cam: abS6Cam, under: abGladeWide('afternoon'), world: abS6World,
  over: (ctx, t, cam, S) => {
    if (t > 41.74 && t < 43.0) { const [x, y] = abP(1625, 640, cam); S.label(ctx, 'LEADER', x - 210, y - 40, K.clamp((t - 41.74) / 0.5), { size: 38 }); }
    if (t < 45.45) { const [x, y] = abP(1700, 470, cam); abWords(ctx, S, ['افتح', 'يا', 'سمسم'], [43.09, 43.62, 43.8], x, y, t, { size: 84, gone: 44.62 }); }
    if (t >= 45.45 && t < 46.1) { const [x, y] = abP(1820, 560, cam); S.emphasis(ctx, x, y, 240, K.clamp((t - 45.45) / 0.65), { rect: [0, 0, 1000, 1230], word: '', seed: 4 }); } } });
// 48.34-50.32: the eye gap, close: gold reflected in both pupils, the leaves shake; he claps a hand over his mouth
function abS6Eyes(ctx, t, S) {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#1c2a24'], [1, '#2a1a2a']]);
  const tc = AB_T2(t), tr = tremble(t, 2, 11), gh = t < 49.1 ? 1 : 1 - 0.25 * abE(tc, 49.6, 0.5);
  ctx.save(); ctx.beginPath(); ctx.roundRect(110, 615 - 210 * gh, 780, 420 * gh, 120); ctx.clip();
  abFace(ctx, 500 + tr, 640, 1.85, { who: 'ali', wide: 1, iris: 1.08, gaze: [0.5, 0.15], brow: -0.8, lid: abBlinkAt(AB_T3(t), 50.05), mouth: 'o', m: 'afternoon', hand: K.clamp((t - 49.1) / 0.3),
    reflect: (c, r) => { c.fillStyle = '#ffcf5a'; c.globalAlpha = 0.85; K.poly(c, townArchPts(-r * 0.3, r * 0.3, -r * 0.4, r * 0.5, 'round').map(([x, y]) => [x + r * 0.15, y]), true); c.fill(); c.globalAlpha = 1;
      c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(-r + ((t * 120) % (2 * r)), -r, r * 0.25, 2 * r); } });
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a'], alpha: 0.14, w: 200, speed: 300 });
  ctx.restore();
  const R = K.rng(5); for (let i = 0; i < 14; i++) { const a = R() * Math.PI * 2, x = 500 + Math.cos(a) * (430 + R() * 120), y = 620 + Math.sin(a) * (300 + R() * 140), r = 90 + R() * 60;
    abBlob(ctx, x + tremble(t + i, 3, 9), y, r, r * 0.75, '#2e5a3e', '#1a3a2a', { off: r * 0.25, lw: 3, line: '#0e2018' }); }
}
AB_SHOTS.push({ a: 48.34, b: 50.32, panel: abS6Eyes });

// ---------- S7 50.32-56.6: into the door against the light; the last man looks back; the door shuts; MUCH LATER ----------
const AB_S7_MEN = [0, 1, 2, 3, 4].map((i) => { const t0 = 50.84 + 0.25 * i, x0 = 1560 - i * 55; return { i, f: (u) => kfn(u, [[t0, x0], [t0 + (1805 - x0) / 170, 1805]], 'lin') }; });
AB_S7_MEN.push({ i: 5, last: true, f: (u) => kfn(u, [[51.0, 1450], [52.04, 1640], [52.9, 1640], [53.75, 1805]], 'lin') });
function abWalkIn(ctx, t, m, man, rim, o = {}) {
  const tc = AB_T2(t), x = man.f(tc); if (x >= 1804) return;
  const fade = K.clamp((1805 - x) / 70), P = { x, y: 902, s: 0.95 * (0.9 + 0.1 * fade), dir: 1, ...walk(man.f, tc, { stride: 24 }), gaze: [1, -0.1], lid: abLid(t, 130 + man.i), tip: 0.05 + 0.09 * K.rng(man.i + 7)(), handR: [8, -196], handL: [-20, -120] };
  if (man.i === 1 && tc > 51.6 && tc < 52.0) P.handR = [8, -210 + 20 * pulse(tc, 51.6, 0.4)];                     // hitches his sack up
  if (man.i === 3 && tc > 52.2 && tc < 52.6) { P.tip = 0.2 * pulse(tc, 52.2, 0.4); }                             // stumbles on the step
  if (man.last && tc >= 52.04 && tc < 52.9) { P.dir = tc < 52.25 || tc > 52.75 ? 1 : -1; P.gaze = gazePlan(tc, [[52.04, [1, 0]], [52.3, [-1, -0.6]], [52.6, [-0.6, -0.9]], [52.75, [1, 0]]]); P.lid = abBlinkAt(AB_T3(t), 52.25); }
  // the long shadow fans from the door across the ground
  ctx.save(); ctx.globalAlpha = 0.35 * fade; ctx.fillStyle = '#2b1a3a'; ctx.beginPath(); ctx.moveTo(x - 18, 904); ctx.lineTo(x + 18, 904); ctx.lineTo(x - 330 + (1820 - x) * 0.2, 960); ctx.lineTo(x - 380 + (1820 - x) * 0.2, 940); ctx.closePath(); ctx.fill(); ctx.restore();
  abCel(ctx, [P.x, P.y, 300, 320], (c) => { abMan(c, man.i, P, 'sil'); const h = abHand(P, 1); abSack(c, h[0] - 10, h[1] + 30, 0.55, 1, { rot: 0.2 }); }, { k: 0, rim: rim, light: [1, -0.1], rimW: 4, alpha: fade });
}
function abS7World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon', close = K.clamp((t - 53.88) / 1.25), open = 1 - K.ease.inOut(close);
  abRock(ctx, 1820, 900, { model: m, open, crack: 1, glow: open, t });
  abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h); abHorse(ctx, abLineHorse(h, k, tc), m, open > 0.05 ? { rim: '#ff7ad9', light: [1, -0.2], rimAlpha: open } : {}); });
  // a stream of small silhouettes ahead of the last man
  for (let j = 0; j < 7; j++) { const f = (u) => kfn(u, [[51.2 + j * 0.22, 1330], [51.2 + j * 0.22 + 2.0, 1805]], 'lin'), x = f(tc); if (tc < 51.2 + j * 0.22 || x >= 1804) continue;
    const P = { x, y: 880, s: 0.62, dir: 1, ...walk(f, tc, { stride: 16 }), handR: [8, -196], lid: 0 }; abCel(ctx, [x, 880, 200, 200], (c) => { abMan(c, j, P, 'sil'); }, { k: 0, alpha: K.clamp((1805 - x) / 60) }); }
  abLeaderOnFoot(ctx, t, 'sil', { x: kfn(tc, [[50.32, 1625], [51.4, 1805]], 'lin'), rim: '#ffd76a', P: { ...walk((u) => kfn(u, [[50.32, 1625], [51.4, 1805]], 'lin'), tc), handR: [20, -120], talk: 0, mouth: 'closed', alpha: K.clamp((1805 - kfn(tc, [[50.32, 1625], [51.4, 1805]], 'lin')) / 70) } });
  for (const man of AB_S7_MEN) abWalkIn(ctx, t, m, man, open > 0.3 ? '#ffd76a' : null);
}
const AB_S7_GAP = (t) => (t < 52.2 ? 1 : t < 55.6 ? 0.08 : K.clamp((t - 55.6) / 0.25));
AB_SHOTS.push({ a: 50.32, b: 56.6, ww: 2400, cam: (t) => K.camAt([[53.88, { x: 1760, y: 620, zoom: 1.1 }], [55.2, { x: 1790, y: 680, zoom: 1.35 }]], t), under: abGladeWide('afternoon'), world: abS7World,
  over: (ctx, t) => abLeafFrame(ctx, t, { m: 'afternoon', gap: AB_S7_GAP(AB_T2(t)), gaze: t < 52.0 ? [0.8, 0.4] : [0.5, 0.3], lid: t > 55.6 ? Math.max(0, 0.8 - (t - 55.6) * 1.6) : 0 }) });

// ---------- S8 56.6-62.55: the same framing repainted at dusk; they come out; staggered mounting; the horses turn ----------
const AB_OUT = (k, t0, x1) => (u) => kfn(u, [[t0, 1800], [t0 + (1800 - x1) / 260, x1]], 'lin');
const AB_MOUNT = (k) => (k === 0 ? 61.8 : 60.16 + 0.14 * (k - 1));
function abS8Riders(ctx, t, m) {
  const tc = AB_T2(t);
  abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h), tm = AB_MOUNT(k), tf = 60.9 + 0.15 * k, turned = tc > tf && k > 0, H = abLineHorse(h, k, tc, { sleep: tc < 59.6 });
    H.sq = landSquash(tc, tm + 0.3, 0.07, 10); if (turned) { H.dir = -1; H.sq *= landSquash(tc, tf, 0.05); H.headDown = 0; H.earL = 0.8; H.earR = 0.7; } else if (k > 0 && tc > tf - 0.3) H.headTurn = 0.45 * beatIn(tc, tf - 0.3, tf);
    if (tc >= tm + 0.3) { abRider(ctx, h.i, H, { gaze: turned ? [-1, 0] : [1, 0], lid: abLid(t, 140 + k), tip: idleSway(tc, 141 + k, 0.02, 2.2) }, m, { cloak: 0.7, t, sacks: true, flat: true }); return; }
    abHorse(ctx, H, m);
    const out = k === 0 ? AB_OUT(k, 59.6, h.x - 40) : AB_OUT(k, 59.0 + 0.12 * k, h.x - 40); if (tc < (k === 0 ? 59.6 : 59.0 + 0.12 * k)) return;
    const seat = mountSeat('horse', H); let P;
    if (tc < tm) P = { x: out(tc), y: h.y + 6, dir: -1, ...walk(out, tc, { stride: 24 }), handL: [40, -120], lid: abLid(t, 150 + k), gaze: [-1, 0], sq: tc > tm - 0.15 ? anticipate(tc, tm - 0.15, 0.15, 0.12) : 1 };
    else { const u = beatIn(tc, tm, tm + 0.3); P = { x: K.lerp(h.x - 40, seat.x, u), y: K.lerp(h.y + 6, seat.y + 30, u) - 60 * Math.sin(Math.PI * u), dir: 1, sq: 1.08, handL: [-30, -200], handR: [40, -220], lid: 0 }; }
    if (h.i < 0) abLeader(ctx, P, m); else abMan(ctx, h.i, P, m);
    if (tc < tm) { const hd = abHand(P, 0); abSack(ctx, hd[0], hd[1], 0.5, 0, { flap: 4 * Math.sin(t * 7 + k) }); }
  });
}
function abS8World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dusk', open = K.clamp((t - 58.8) / 0.6) * (1 - K.clamp((t - 62.4) / 0.2)), crack = K.clamp((t - 58.6) / 0.2);
  abRock(ctx, 1820, 900, { model: m, open: K.ease.inOut(open), crack, glow: open, t, light: [-1, -0.2] });
  if (t > 59.0) for (let j = 0; j < 6; j++) { const f = (u) => kfn(u, [[59.0 + j * 0.2, 1800], [59.0 + j * 0.2 + 2.0, 1300]], 'lin'), x = f(tc); if (tc > 59.0 + j * 0.2 + 2.0) continue;
    abCel(ctx, [x, 880, 200, 200], (c) => abMan(c, j, { x, y: 880, s: 0.62, dir: -1, ...walk(f, tc, { stride: 16 }), lid: 0 }, 'sil'), { k: 0 }); }
  abS8Riders(ctx, t, m);
  if (t < 59.0) { const u = (t - 57.03) / 1.9; ctx.save(); ctx.translate(1500 + u * 500, 520 + 40 * Math.sin(u * 20)); for (const s of [-1, 1]) abBlob(ctx, s * 7, 0, 9, 5 + 3 * Math.abs(Math.sin(t * 30)), '#e8d8b0', '#a89a7a', { lw: 1.5, off: 2 }); ctx.restore(); }
}
AB_SHOTS.push({ a: 56.6, b: 62.55, ww: 2400, cam: (t) => (t < 59.88 ? { x: 1760 + 20 * K.clamp((t - 56.6) / 3.3), y: 620, zoom: 1.1 } : { x: 1380, y: 680, zoom: 1.4 }), under: abGladeWide('dusk'), world: abS8World,
  over: (ctx, t) => { if (t < 59.88) { const tc = AB_T3(t), droop = tc < 58.7 ? flow(tc, [[57.64, 0.2], [58.2, 0.6], [58.6, 0.9], [58.7, 0.9]]) : 0; abLeafFrame(ctx, t, { m: 'dusk', gaze: tc < 58.7 ? [0.4, 0.5] : [0.9, 0.2], lid: droop, iris: tc > 58.7 ? 1.12 : 1 }); } } });

// ---------- S9 62.55-70.48: Close Sesame from the saddle; the rock seals; the seam heals; a sparrow; they ride ----------
const AB_S9_SWEEP = [[64.2, 0], [64.6, 1], [65.0, 1.05], [65.4, 1]];
function abS9World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dusk', close = K.clamp((t - 66.3) / 1.1), open = 1 - K.ease.inOut(close), flick = t > 65.8 && t < 65.87 ? 0.4 : 1, heal = 1 - K.clamp((t - 67.42) / 1.08);
  abRock(ctx, 1820, 900, { model: m, open, crack: heal, glow: open * flick, t, light: [-1, -0.2] });
  // the frieze of riders, already turned to the left; they start to move after the leader's nod
  abByY(AB_HL.slice(1)).forEach((h) => { const k = AB_HL.indexOf(h), go = 69.9 + 0.13 * k, xf = (u) => h.x - (u > go ? 60 * (u - go) * (u - go) : 0);
    const H = { ...abLineHorse(h, k, tc), ...walk(xf, tc, { stride: GAIT.horse * h.s }), dir: -1, headDown: 0, earL: 0.6, earR: 0.5 };
    abRider(ctx, h.i, H, { gaze: [-1, 0], lid: abLid(t, 160 + k), tip: idleSway(tc, 161 + k, 0.02, 2.2) }, m, { cloak: 0.7, t, sacks: true, flat: true, rim: open > 0.1 ? '#ffb070' : null, light: [1, -0.2], rimAlpha: open }); });
  // the leader on the black horse, turned to the door
  const turn = tc > 69.8, lx = (u) => (u > 69.8 ? 1620 - 50 * (u - 69.8) * (u - 69.8) : 1620), H = { x: lx(tc), y: 905, s: 0.86, pal: 2, dir: turn ? -1 : 1, ...walk(lx, tc, { stride: GAIT.horse * 0.86 }), rear: 0.4 * pulse(tc, 62.6, 1.0), tailSwish: osc(tc, 1.6), earL: 0.5, earR: 0.4 };
  const a = flow(tc, AB_S9_SWEEP) + lagged((u) => flow(u, AB_S9_SWEEP), tc, 0.1, 0.35);
  const PP = { gaze: turn ? [-1, 0] : [1, -0.3], brow: 0.7, lid: tc > 69.3 && tc < 69.8 ? 0.3 : abLid(t, 170), tip: tc < 64.2 ? -0.06 * beatIn(tc, 63.2, 64.1) : 0, mouth: 'closed', talk: abTalk(t, 64.28, 65.5, 5) };
  if (PP.talk) PP.mouth = 'open';
  if (tc > 63.4 && tc < 66.2) PP.handR = [K.lerp(100, -50, a), K.lerp(-230, -160, a)];
  if (tc > 69.3 && tc < 69.8) PP.drop = 8 * pulse(tc, 69.35, 0.4);   // a nod
  abRider(ctx, -1, H, PP, m, { cloak: 1.1, t, rim: open > 0.1 ? '#ffd76a' : null, light: [1, -0.3], rimAlpha: open });
  // a sparrow lands on the rock and pecks: an ordinary rock
  if (t > 68.6) { const u = K.clamp((t - 68.6) / 0.35), x = K.lerp(2000, 1700, u), y = K.lerp(160, 270, u) - 30 * Math.sin(Math.PI * u), fly = u < 1;
    bird(ctx, { kind: 'sparrow', x, y, s: 0.7, dir: -1, fly, flap: fly ? Math.sin(AB_T2(t) * 30) : 0, beak: !fly && Math.sin(AB_T2(t) * 9) > 0.3 ? 1 : 0, headRot: !fly ? 0.4 * Math.max(0, Math.sin(AB_T2(t) * 9)) : 0 }); }
}
function abS9Cam(t) { if (t < 66.2) return { x: 1620, y: 560, zoom: 1.6 }; return K.camAt([[67.4, { x: 1800, y: 620, zoom: 1.1 }], [69.2, { x: 1720, y: 615, zoom: 1.0 }]], t); }
AB_SHOTS.push({ a: 62.55, b: 70.48, ww: 2400, cam: abS9Cam, under: abGladeWide('dusk'), world: abS9World,
  over: (ctx, t, cam, S) => { if (t < 66.2) { const [x, y] = abP(1700, 330, cam); abWords(ctx, S, ['أغلق', 'يا', 'سمسم'], [64.28, 64.78, 64.94], x, y, t, { size: 80, gone: 65.5, glow: '#8a5cff' }); }
    else abLeafFrame(ctx, t, { m: 'dusk', gaze: [0.9, 0.35] }); } });

// ---------- S10 70.48-78.0: they gallop away under the tree; the empty path; the careful descent; the landing; the donkey ----------
const AB_DOWN_Y = [[74.8, 452], [75.3, 560], [75.8, 700], [76.2, 800]];
function abS10World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dusk', rip = 1 - K.clamp((t - 72.4) / 0.6);
  abGladeBack(ctx, m, t, { rip });
  // the column at full gallop to the left, dark plum cels with orange rims
  if (t < 73.0) { abSilRow(ctx, 2000 - (t - 70.48) * 1100, 880, t, 0.5, -1, 0.8);
    AB_HL.forEach((h, k) => { const xf = (u) => 1150 + k * 240 - (u - 70.48) * 950, H = { y: 902 + (k % 2) * 8, s: h.s, pal: h.pal, dir: -1, ...walk(xf, tc, { stride: GAIT.horse * h.s }), gallop: 1, earL: -0.3, earR: -0.2, tailUp: 0.7 };
      if (H.x < -300 || H.x > 1400) return; abRider(ctx, h.i, H, { gaze: [-1, 0], tip: 0.1, lurch: 0.08 * Math.sin((H.ph || 0) * 2) }, m, { cloak: 1, t: t + k * 0.2, sacks: true, flat: true, rim: '#ff9a5a', light: [1, -0.3] }); });
    abDust(ctx, 900 - (t - 70.48) * 600, 905, 900, 170, t, 0.6 * rip); }
  if (t > 72.64 && t < 74.4) { const R = K.rng(33); for (let i = 0; i < 12; i++) { const x = 200 + R() * 700, y = 560 + R() * 320, ph = R() * 6; const a = Math.max(0, Math.sin(t * 3 + ph)); abGlow(ctx, x + 10 * Math.sin(t + ph), y, 18, a * 0.8, '#d8ff7a'); } }
  // the donkey in the thicket: ears first, then the whole head rises to ask "well?"
  const rise = beatIn(tc, 77.0, 77.5), ears = beatIn(tc, 76.95, 77.1);
  abDonkey(ctx, { x: 905, y: 900 + 70 * (1 - rise), s: 0.76, dir: -1, earL: -0.6 + 1.6 * ears, earR: -0.6 + 1.4 * ears, neck: 0.4 * rise, gaze: [-1, 0], lid: abLid(t, 26), mouth: 'smirk' }, m);
  abThicketFront(ctx, m, t);
  // Ali Baba: hidden; parts the leaves; climbs down hand under hand; drops and lands in a crouch
  const part = 1 - beatIn(tc, 74.12, 74.45);
  if (tc >= 74.12 && tc < 74.8) { const P = { x: 640, y: 448, dir: 1, sit: 1, seat: 'bench', lid: abLid(t, 19), gaze: gazePlan(tc, [[74.12, [0.2, 1]], [74.5, [-1, 0.2]], [74.65, [1, 0.2]]]), handLW: [AB_TREE.x + 44, 330], handR: [30, -120], mouth: 'grit' };
    P.ph = 1.5 * Math.sin(tc * 14) * beatIn(tc, 74.3, 74.4); abAli(ctx, P, m); }
  else if (tc >= 74.8 && tc < 76.2) abClimber(ctx, t, m, flow(tc, AB_DOWN_Y), { gaze: [0.3, 1] });
  else if (tc >= 76.2) { const y = tc < 76.42 ? fallY(tc, 76.2, 76.42, 800, 900) : 900, lift = 900 - y; groundShadow(ctx, 620, 903, 100, lift, { flat: true, color: '#1a1030' });
    const P = { x: 615, y, dir: 1, sq: tc < 76.42 ? 1.06 : impactSquash(tc, 76.42, 0.82), handL: [-60, -110], handR: [60, -110], lid: abLid(t, 19, [76.6]), mouth: 'grit',
      gaze: gazePlan(tc, [[76.2, [0, 1]], [76.5, [-1, 0]], [76.75, [1, 0]], [77.05, [1, 0.3]]]), tip: tc > 76.42 ? 0.1 : 0 };
    if (tc > 77.2) { P.handR = [64, -120 - 20 * Math.abs(osc(tc, 0.35))]; P.gaze = [1, 0.4]; P.mouth = 'frown'; P.brow = 0.4; }
    abAli(ctx, P, m); }
  if (part > 0) abFoliageFront(ctx, m, t, part, { hole: tc < 74.12 ? 1 : 0, rip });
  if (tc < 74.12) { const [gx, gy, gw, gh] = AB_TREE.gap; ctx.save(); ctx.beginPath(); ctx.roundRect(gx - gw / 2, gy - gh / 2, gw, gh, 22); ctx.fillStyle = '#120a16'; ctx.fill(); ctx.clip();
    abFace(ctx, gx + 2, gy + 8, 0.29, { who: 'ali', gaze: [K.lerp(1, -1, beatIn(tc, 71.14, 72.6)), 0.5], lid: abBlinkAt(AB_T3(t), 73.2), brow: -0.3, m });
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(40,30,80,0.45)'; ctx.fillRect(gx - gw, gy - gh, gw * 2, gh * 2); ctx.restore(); }
}
AB_SHOTS.push({ a: 70.48, b: 78.0, ww: 2400, cam: (t) => K.camAt([[74.1, { x: 560, y: 560, zoom: 1.5 }], [76.2, { x: 620, y: 720, zoom: 1.3 }]], t), under: abGladeWide('dusk'), world: abS10World,
  over: (ctx, t) => { if (t < 72.6) abSpeed(ctx, [0, 760, 1000, 470], t, { dir: 1, n: 16, alpha: 0.3 * (1 - K.clamp((t - 72.0) / 0.6)), col2: '#ff9a5a' }); } });

// ---------- S11 78.0-89.48: the sneak, the knock, counting, the memory flash, the timid words, the impact, the door in his eyes ----------
const AB_AX = (t) => kfn(t, [[78.0, 1350], [79.0, 1660], [79.82, 1660], [80.5, 1570], [88.9, 1570], [89.48, 1690]], 'inOut');
const AB_S11_TIP = [[85.9, 0], [86.3, -0.12], [87.0, -0.1], [87.5, 0.03], [88.4, 0.0]];
function abS11Ali(ctx, t, m, cam) {
  const tc = AB_T2(t), gold = t > 85.9, P = { x: AB_AX(tc), y: 900, dir: 1, ...walk(AB_AX, tc, { stride: tc < 79.1 ? 15 : 24 }), lid: abLid(t, 19, [80.05, 88.6]), gaze: [1, 0], mouth: 'closed', sq: breathe(tc, 4), tip: idleSway(tc, 22, 0.02, 2.4) };
  if (tc < 79.0) { P.tip = 0.1; P.drop = 8; P.handL = [-70, -130]; P.handR = [70, -126]; P.gaze = gazePlan(tc, [[78, [1, 0]], [78.5, [-0.6, -0.2]], [78.7, [1, 0]]]); }
  else if (tc < 79.82) { const kn = Math.max(pulse(tc, 79.3, 0.15), pulse(tc, 79.55, 0.15)); P.handRW = [1700 + 0 - 26 * kn, 720]; if (tc > 79.62) { P.handRW = undefined; P.handR = PERSON_HANDS.cupEar.R; P.tip = 0.15; } if (tc < 79.2) P.handRW = [1700 - 24 * (1 - beatIn(tc, 79.0, 79.2)), 730]; }
  else if (tc < 80.6) { P.gaze = tc > 80.05 && tc < 80.4 ? [-1, -0.1] : [1, 0]; P.handR = [30, -130]; P.mouth = 'o'; }
  else if (tc < 82.84) { const taps = [80.6, 81.38, 81.76].filter((b) => tc >= b).length; P.handL = [40, -132]; P.handR = [44 + 6 * taps, -140 + 10 * Math.max(...[80.6, 81.38, 81.76].map((b) => pulse(tc, b, 0.2)))]; P.gaze = [0.6, -0.8]; P.talk = abTalk(t, 80.6, 81.9, 2, 0.4); if (P.talk) P.mouth = 'open'; }
  else if (tc < 85.74) { P.handR = [100 + tremble(t, 4, 7), -205 + tremble(t + 1, 3, 9)]; P.handL = [-30, -110]; P.lid = 1; P.tip = 0.03 + 0.03 * Math.sin(t * 12); P.talk = abTalk(t, 83.19, 84.6, 4, 0.6); P.mouth = P.talk ? 'open' : 'closed'; P.brow = -0.5;
    if (tc > 84.75) { P.lid = 0; P.wink = 'L'; P.talk = 0; P.mouth = 'closed'; P.gaze = [0.6, -0.2]; } }
  else { P.tip = flow(tc, AB_S11_TIP); P.mouth = 'o'; P.brow = -0.6; P.handR = tc < 86.8 ? PERSON_HANDS.shield.R : [K.lerp(40, 30, beatIn(tc, 86.8, 87.3)), K.lerp(-190, -120, beatIn(tc, 86.8, 87.3))]; P.handL = tc < 86.8 ? PERSON_HANDS.shield.L : [-30, -110];
    if (tc > 88.33) { P.gaze = gazePlan(tc, [[88.33, [-1, 0]], [88.6, [1, 0.1]], [88.85, [1, 0]]]); P.sq = 1 + 0.04 * Math.sin(Math.PI * beatIn(tc, 88.4, 88.9)); P.mouth = 'closed'; } }
  if (gold) { // the long shadow thrown far back, and the gold key light with a pink rim on his back
    ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = '#1a1030'; ctx.beginPath(); ctx.moveTo(P.x - 20, 904); ctx.lineTo(P.x + 20, 904); ctx.lineTo(P.x - 620, 990); ctx.lineTo(P.x - 680, 950); ctx.closePath(); ctx.fill(); ctx.restore();
    abCel(ctx, [P.x, P.y, 300, 320], (c) => abAli(c, P, 'gold'), { k: 0, rim: '#ff7ad9', light: [-1, -0.2], rimW: 4 }); }
  else abAli(ctx, P, m);
  return P;
}
function abS11World(ctx, t, cam) {
  const m = 'dusk', hit = 85.74, crack = K.clamp((t - hit) / 0.3), open = K.ease.inOut(K.clamp((t - 86.0) / 1.4)), glow = K.clamp((t - hit) / 0.5);
  abRock(ctx, 1820, 900, { model: m, open, crack, glow, t, light: [-1, -0.2] });
  if (open > 0 && open < 1) dustBurst(ctx, 1820, 900, (t * 2) % 0.5, 3, 3, 6, 24, 0.5, Math.floor(t * 4));
  return abS11Ali(ctx, t, m, cam);
}
function abS11Cam(t) { if (t < 79.82) return { x: 1600, y: 615, zoom: 1.0 }; if (t < 85.74) return { x: 1640, y: 690, zoom: 1.6 }; return { x: 1780, y: 620, zoom: 1.1 }; }
function abMemory(ctx, t, S) {   // a tape memory flash: the leader's thrown arm, in afternoon colours, inside an inset
  if (t < 81.8 || t > 82.45) return; const x = 520, y = 120, w = 420, h = 330;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(abGladePlate('afternoon'), 1350, 380, 600, 480, x, y, w, h);
  ctx.translate(x + w / 2 - 40, y + h - 10); ctx.scale(0.75, 0.75); abRock(ctx, 330, 0, { model: 'afternoon', s: 0.5 }); abLeader(ctx, { x: 0, y: 0, dir: 1, handR: [112, -214], mouth: 'open', gaze: [1, -0.3] }, 'afternoon'); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 6; ctx.strokeRect(x, y, w, h); const R = K.rng(Math.floor(t * 30)); ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 3; i++) ctx.fillRect(x, y + R() * h, w, 3 + R() * 6); ctx.restore();
}
AB_SHOTS.push({ a: 78.0, b: 87.6, ww: 2400, cam: abS11Cam, under: abGladeWide('dusk'), world: abS11World,
  over: (ctx, t, cam, S) => { abMemory(ctx, t, S);
    if (t > 83.0 && t < 85.74) { const [x, y] = abP(1640, 560, cam); abWords(ctx, S, ['افتح', 'يا', 'سمسم'], [83.19, 83.76, 83.94], x + 30, y - 40, t, { size: 44, gone: 84.9, wobble: 4 }); }
    if (t >= 85.74 && t < 86.4) { const [x, y] = abP(1820, 600, cam); S.emphasis(ctx, x, y, 240, K.clamp((t - 85.74) / 0.65), { rect: [0, 0, 1000, 1230], word: '', seed: 9 }); } } });
// 87.6-88.33: extreme close-up: the arched door reflected gold in both irises, a highlight sliding across; the eyes open in three drawings
function abS11Eyes(ctx, t, S) {
  abGrad(ctx, 0, 0, 1000, 1230, [[0, '#3a2030'], [1, '#8a5a2a']]);
  const tc = AB_T3(t), lid = tc < 87.65 ? 0.6 : tc < 87.75 ? 0.3 : 0;
  abFace(ctx, 500, 650, 3.2, { who: 'ali', wide: 1, iris: 1.15, gaze: [0, 0], brow: -0.8, lid, mouth: 'none', m: 'gold',
    reflect: (c, r) => { c.fillStyle = '#ffd36a'; c.shadowColor = '#fff3b0'; c.shadowBlur = 10; K.poly(c, townArchPts(-r * 0.32, r * 0.32, -r * 0.5, r * 0.55, 'round'), true); c.fill(); c.shadowBlur = 0;
      c.fillStyle = 'rgba(255,255,255,0.75)'; c.save(); c.rotate(-0.5); c.fillRect(-r + ((t - 87.6) * 3 % 1) * 2 * r, -2 * r, r * 0.18, 4 * r); c.restore(); } });
  abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a', '#ff7ad9'], alpha: 0.16, w: 180, speed: 420 });
  abGlow(ctx, 500, 640, 700, 0.35, '#ffb84a');
}
AB_SHOTS.push({ a: 87.6, b: 88.33, panel: abS11Eyes });
AB_SHOTS.push({ a: 88.33, b: 89.48, ww: 2400, cam: () => ({ x: 1760, y: 640, zoom: 1.15 }), under: abGladeWide('dusk'), world: abS11World });
