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
function abS5Track(ctx, t, cam, only) {
  const tc = AB_T2(t), m = 'afternoon', L = AB_S5_L;
  abSilRow(ctx, L(t) - 1900, 850, t, 0.55, 1, 0.75, 1); abSilRow(ctx, L(t) - 2500, 846, t, 0.5, 1, 0.6, 2);
  abDust(ctx, L(t) - 900, 900, 1400, 200, t, 0.55);
  const rows = [...AB_S5_RID.map(([i, off, y, s, pal]) => ({ i, off, y, s, pal })), { i: -1, off: 0, y: 912, s: 0.95, pal: 2 }].sort((a, b) => a.y - b.y);
  for (const r of rows) { if (only && !only.includes(r.i)) continue;
    const xf = (u) => L(u) + r.off + 22 * Math.sin(u * 1.3 + r.i), H = { y: r.y, s: r.s, dir: 1, pal: r.pal, ...walk(xf, tc, { stride: GAIT.horse * r.s }), gallop: 1, earL: -0.3 + 0.2 * Math.sin(r.i), earR: -0.2, tailUp: 0.7 };
    const tired = r.i === 5; if (tired) { H.gallop = 0.6; H.headDown = 0.4; H.earL = -0.6; H.earR = -0.7; H.load = ['sack', 'sack']; }
    const bob = 6 * Math.sin((H.ph || 0) * 2 + r.i), PP = { gaze: [1, 0.1], tip: r.i < 0 ? 0.12 : 0.06 + 0.04 * Math.sin(r.i), lid: abLid(t, 90 + r.i), lurch: 0.08 * Math.sin((H.ph || 0) * 2 + r.i) };
    if (r.i === 1) { PP.gaze = [-1, 0]; }                                     // one looks back
    if (r.i === 3) { PP.mouth = 'o'; PP.lid = 0.7; }                           // one yawns
    if (tired && tc > 37.5) { PP.handRW = [H.x + 110 * r.s, H.y - 250 * r.s + 8 * Math.abs(osc(tc, 0.3))]; PP.gaze = [1, 0.5]; }
    if (r.i < 0) { PP.brow = 0.7; PP.mouth = 'closed'; }
    const sb = only ? 14 * Math.sin(((H.ph || 0) - 0.9) * 2) + 3 * Math.sin(AB_T2(t) * 40) : bob;   // the sack lags the horse's bob, plus a 12 fps jitter
    abRider(ctx, r.i, H, PP, m, { cloak: r.i < 0 ? 1.3 : 1, t: t + r.i * 0.2, sacks: !tired, sackBob: sb, coin: r.i === 0, sackS: only ? 1.25 : 1 });
    if (only && r.i === 0) { const st = mountSeat('horse', H); AB_S5_SACK.x = st.x - 60 * r.s; AB_S5_SACK.y = st.y + 40 * r.s + sb; }
    for (const sd of [0, 1]) if ((Math.floor((H.ph || 0) / Math.PI) + sd) % 2 === 0) dustBurst(ctx, H.x - 60 * r.s, H.y + 2, ((H.ph || 0) % Math.PI) / 9, 2, 3, 7, 18, 0.25, r.i + 3);
  }
}
const AB_S5_SACK = { x: 0, y: 0 };
function abS5Cam(t) { const L = AB_S5_L(t); if (t < 36.54) return { x: L - 96, y: 700, zoom: 1.25 }; if (t < 37.32) return { x: L - 230 - 50 + 22 * Math.sin(t * 1.3), y: 770, zoom: 3.2 }; return { x: L - 720 + 40, y: 720, zoom: 1.6 }; }
AB_SHOTS.push({ a: 34.5, b: 36.54, ww: 1e5, cam: abS5Cam,
  under: (ctx, t, cam) => abForest(ctx, cam, t, 'afternoon', { shaftA: 0.1 }),
  world: (ctx, t, cam) => abS5Track(ctx, t, cam),
  over: (ctx, t, cam, S) => { abSpeed(ctx, [0, 640, 1000, 560], t, { dir: -1, n: 18, alpha: 0.35 }); abForestFront(ctx, cam, 'afternoon', { ph: 124, dir: -1 });
    if (t >= 35.02 && t < 36.54) S.counter(ctx, Math.round(1 + 39 * K.clamp((t - 35.02) / 1.3)), 790, 230, K.clamp((t - 35.02) / 0.3), { size: 150 }); } });
// 36.54-37.32 insert: one bulging sack tied behind a saddle, bouncing on a 12 fps jitter late behind the horse's bob, coins glinting
// (a held composition: the painted forest streams behind; no foreground trunk in this shot)
function abS5Sack(ctx, t, S) {
  const L = AB_S5_L(t); abForest(ctx, { x: L, y: 700, zoom: 1.6 }, t, 'afternoon', { shaftA: 0.1 });
  const tc = AB_T2(t), ph = tc * 2 * Math.PI * 2.6, bob = 14 * Math.sin(ph), lag = 20 * Math.sin(ph - 1.3) + 3 * Math.sin(tc * 40), m = 'afternoon';
  const hc = abMul('#8a3a1e', AB_MODEL[m].tint, AB_MODEL[m].k), hs = abDark(hc, 0.4), F = AB_FIN[m];
  abCel(ctx, [500, 1230, 1100, 900], (c) => {
    c.save(); c.translate(0, bob + 170);
    celShade(c, [[1100, 1300], [1100, 760], [900, 700], [620, 690], [380, 730], [180, 820], [90, 960], [110, 1300]], hc, hs, { light: [-1, -0.8], off: 60, lw: 5, line: abDark(hc, 0.6) });   // the horse's back and rump
    celShade(c, [[60, 1000], [10, 1060], [-30, 1180], [40, 1150], [70, 1060]], '#5a1e10', '#3a1008', { light: [-1, -1], off: 10, lw: 4 });   // tail root
    celShade(c, [[560, 700], [980, 690], [1000, 820], [560, 830]], '#2e3470', '#1e2250', { light: [-1, -1], off: 22, lw: 4, line: '#141838' });   // saddle cloth
    seg(c, 560, 830, 1000, 820, 10, '#ffcf3a', 2); celShade(c, [[600, 700], [640, 600], [700, 590], [720, 700]], '#7a4a2a', '#4a2a1a', { light: [-1, -1], off: 12, lw: 4 });   // cantle
    c.restore();
    // the rope from the cantle to the sack's neck, and the sack itself hanging late
    const sx = 440, sy = 1010 + bob + lag; c.save(); c.strokeStyle = '#e8d2a0'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(640, 810 + bob); c.quadraticCurveTo(560, 860 + bob + lag * 0.5, sx + 6, sy - 225); c.stroke(); c.restore();
    abSack(c, sx, sy, 2.5, 1, { coin: true, sq: 1 - lag * 0.006, rot: -0.12 + lag * 0.004 });
    AB_S5_SACK.x = sx; AB_S5_SACK.y = sy;
  }, { k: 0, ...F, shadeD: 26, rim: null });
  for (const k of [0, 1]) { const g = ((tc * 2.2 + k * 0.5) % 1); if (g < 0.35) abGlint(ctx, AB_S5_SACK.x - 60 + k * 110, AB_S5_SACK.y - 170 + k * 50, 44, g / 0.35); }
  abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, n: 24, alpha: 0.45 });
}
AB_SHOTS.push({ a: 36.54, b: 37.32, panel: abS5Sack });
AB_SHOTS.push({ a: 37.32, b: 38.2, ww: 1e5, cam: abS5Cam,
  under: (ctx, t, cam) => abForest(ctx, cam, t, 'afternoon', { shaftA: 0.1 }),
  world: (ctx, t, cam) => abS5Track(ctx, t, cam),
  over: (ctx, t, cam, S) => { abSpeed(ctx, [0, 640, 1000, 560], t, { dir: -1, n: 18, alpha: 0.35 }); abForestFront(ctx, cam, 'afternoon', { ph: 124, dir: -1 }); } });
// the wide at the rock: riders arrive late one after another and bunch up (accordion), the leader's horse half rears
const AB_ARRIVE = (h, k, t) => { const d = 38.2 + 0.12 * k + (k === 0 ? 0 : 0.18), e = K.clamp((t - d) / 1.0); return h.x - 760 * Math.pow(1 - e, 2.2); };
function abRockRiders(ctx, t, m, o = {}) {
  const tc = AB_T2(t);
  abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h), xf = (u) => (o.arrive ? AB_ARRIVE(h, k, u) : h.x), H = { ...abLineHorse(h, k, tc), ...walk(xf, tc, { stride: GAIT.horse * h.s }), dir: o.dir ?? 1 };
    const stopT = 38.2 + 0.12 * k + 0.18 * (k > 0) + 1.0; if (o.arrive && tc < stopT) H.gallop = K.clamp(H.amp * 2 - 0.4);
    if (k === 0 && o.arrive) H.rear = 0.6 * pulse(tc, 38.6, 0.8);
    if (o.flinch && tc > 46.9 + 0.12 * k && tc < 47.6 + 0.12 * k) { H.rear = 0.3 * pulse(tc, 46.9 + 0.12 * k, 0.6); H.earL = -1; H.earR = -1; }
    const PP = { gaze: o.gaze || [1, -0.1], lid: abLid(t, 100 + k), lurch: o.arrive ? lurch(tc, stopT - 0.2, 0.2) : 0, tip: (o.lean || 0) + (o.leanK ? o.leanK(k) : 0) + idleSway(tc, 110 + k, 0.02, 2.5) };
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

// ---------- S6 40.46-50.32: the leader dismounts, walks two steps, breathes in; low-angle medium on "افتح": arm thrown up, one word per
// spoken word stacked above his hand; the held drawing lives (cloak ribbon on twos, a light band); the impact frame; the split; his eyes ----------
const AB_LX = (t) => kfn(t, [[41.15, 1545], [41.7, 1625]]);
const AB_S6_ARM = [[42.2, 0], [42.7, -0.45], [42.84, 1.25], [43.0, 0.94], [43.2, 1.02], [43.4, 1.0], [44.6, 1.0], [45.0, 0.98], [45.45, 1.05], [45.9, 0.6]];
// a cloak ribbon from the shoulders, streaming back on a travelling sine (4 drawings: on threes)
function abStandCloak(ctx, P, t, col, len = 1, wind = 1) {
  const s = P.s || 1.08, d = Math.sign(P.dir || 1), x0 = P.x - d * 10 * s, y0 = P.y - 186 * s * (P.sq || 1), tc = AB_T3(t), pts = [], pts2 = [];
  for (let k = 0; k <= 7; k++) { const u = k / 7, wv = Math.sin(tc * 13 - k * 1.05) * 12 * u * s * wind; pts.push([x0 - d * u * 120 * s * len, y0 + u * 150 * s + wv]); pts2.push([x0 - d * u * 120 * s * len + d * 30 * s, y0 + u * 150 * s + wv + 22 * s * (1 - u * 0.4)]); }
  celShade(ctx, [...pts, ...pts2.reverse()], col, abDark(col, 0.45), { light: [d, -1], off: 7 * s, lw: 3, line: abDark(col, 0.6) });
}
function abLeaderOnFoot(ctx, t, m, o = {}) {
  const tc = AB_T2(t), x = o.x ?? AB_LX(tc), P = { x, y: 900, dir: 1, ...walk(AB_LX, tc, { stride: 26 }), gaze: [1, -0.3], lid: abLid(t, 120, [42.2]), tip: idleSway(tc, 121, 0.015, 3.2), mouth: 'closed', brow: 0.7 };
  if (tc < 41.15) { const [hx, lift] = hop(tc, 40.8, 0.32, 1490, 1545, 60); P.x = hx; P.y = 900 - lift - (tc < 40.8 ? 150 : 0); if (tc < 40.8) P.y = 900 - 150; }
  // land, then the breath in: chest up, chin down, arm drawn back; the throw; a slow settle
  P.sq = landSquash(tc, 41.12, 0.12) * (1 + 0.05 * Math.sin(Math.PI * beatIn(tc, 42.2, 42.84)));
  if (tc > 42.2 && tc < 42.84) { P.tip = -0.05 * Math.sin(Math.PI * beatIn(tc, 42.2, 42.84)); P.gaze = [1, 0.2]; }
  const a = flow(tc, AB_S6_ARM) + lagged((u) => flow(u, AB_S6_ARM), tc, 0.1, 0.3);
  if (tc > 42.2) P.handR = a < 0 ? [-30 - 40 * -a, -110 + 20 * a] : [K.lerp(20, 112, Math.min(a, 1.25)), K.lerp(-120, -214, Math.min(a, 1.25))];
  if (tc > 42.84) { P.tip = 0.04 + idleSway(tc, 122, 0.012, 1.7); P.handL = [-50 + 6 * osc(tc, 0.9), -120]; }
  P.talk = abTalk(t, 42.84, 44.62, 3); if (P.talk) P.mouth = 'open';
  if (o.P) Object.assign(P, o.P);
  if (o.cloak !== false && !o.inside) abStandCloak(ctx, P, t, abMul(AB_LEAD0.cape, AB_MODEL[m] ? AB_MODEL[m].tint : '#ffffff', AB_MODEL[m] ? AB_MODEL[m].k : 0), 1, tc > 42.76 && tc < 45.45 ? 1.4 : 1);
  abLeader(ctx, { ...P, fin: o.rim ? { rim: o.rim, light: o.light || [1, -0.2], rimW: 4 } : undefined }, m);
  return P;
}
function abS6World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon', hit = 45.45, open = K.clamp((t - 45.9) / 1.4), crack = K.clamp((t - hit) / 0.45), glow = K.clamp((t - hit) / 0.6);
  abRock(ctx, 1820, 900, { model: m, open: K.ease.inOut(open), crack, glow, t });
  for (const [x, y] of [[1820, 300], [1820, 880]]) dustBurst(ctx, x, y, t - 45.95, 6, 4, 9, 40, 1.1, 7);
  if (open > 0 && open < 1) dustBurst(ctx, 1820, 260 + ((t * 300) % 500), (t * 3) % 0.6, 3, 3, 6, 20, 0.6, Math.floor(t * 5));
  const lit = t > 45.9 ? '#ff7ad9' : null;
  // the riders lean in, staggered, while he calls
  const leanIn = (k) => 0.07 * beatIn(tc, 43.2 + 0.12 * k, 43.6 + 0.12 * k) * (1 - beatIn(tc, 45.45, 45.9));
  abRockRiders(ctx, t, m, { noLeader: true, rim: lit, flinch: true, leanK: leanIn });
  if (tc <= 40.8) { const h = AB_HL[0]; abRider(ctx, -1, abLineHorse(h, 0, tc), { gaze: [1, -0.2], lid: abLid(t, 120) }, m, { cloak: 0.8, t }); }
  else abLeaderOnFoot(ctx, t, m, { rim: lit ? '#ffd76a' : null });
  if (t > 47.88 && t < 48.34) abGlint(ctx, 1820, 900 - 336, 60, (t - 47.88) / 0.46);
}
const AB_S6_LOW = (t) => ({ x: 1690, y: 690 - 12 * K.clamp((t - 44.86) / 0.6), zoom: 2.4 + 0.18 * K.ease.inOut(K.clamp((t - 44.86) / 0.59)) });
function abS6Cam(t) { if (t < 42.76) return { x: 1585, y: 718, zoom: 1.9 }; if (t < 45.45) return AB_S6_LOW(t); return K.camAt([[45.45, { x: 1820, y: 600, zoom: 1.05 }], [47.3, { x: 1820, y: 600, zoom: 1.05 }], [48.3, { x: 1820, y: 700, zoom: 1.6 }]], t); }
AB_SHOTS.push({ a: 40.46, b: 48.34, ww: 2400, cam: abS6Cam, under: abGladeWide('afternoon'), world: abS6World,
  over: (ctx, t, cam, S) => {
    if (t > 41.74 && t < 42.76) { const [x, y] = abP(1625, 640, cam); S.label(ctx, 'LEADER', x - 200, y - 60, K.clamp((t - 41.74) / 0.4), { size: 40 }); }
    if (t >= 42.76 && t < 45.45) {   // a light band sweeps across the held drawing; the words, one per spoken word, stacked above his hand
      abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#ffd36a', '#ff9ad0'], alpha: 0.16, w: 150, speed: 330, n: 2 });
      const [hx] = abP(1746, 669, cam); abWords(ctx, S, ['افتح', 'يا', 'سمسم'], [43.09, 43.62, 43.8], hx + 70, 150, t, { size: 96, stack: true, stackX: hx + 70, pop: true, glow: t > 44.86 ? '#ffe28a' : undefined }); }
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

// ---------- the doorway: figures never fade. Within 105 units of the threshold they darken to a backlit silhouette with a pink rim;
// past the threshold (x 1745) they are drawn INSIDE the arch (abRock o.inside: clipped to the opening, under the sliding halves),
// going down the steps (sink) and shrinking 1.0 -> 0.8 until the far jamb swallows them. Nothing inside is drawn once the rock is shut. ----------
const AB_DIN = 1745, AB_DEND = 1912;
function abDoorState(x) { const dark = K.clamp((x - 1640) / 105); if (x < AB_DIN) return { inside: false, sink: 0, k: 1, dark };
  const u = K.clamp((x - AB_DIN) / (AB_DEND - AB_DIN)); return { inside: true, sink: 130 * u, k: 1 - 0.2 * u, dark: 1 }; }
// fig: { who: -1 leader | rider palette i, f(t) -> x, y, s, dir (1 in, -1 out), act(P, tc), sack: 'full' | 'flat' }; mode 'out' | 'in'
function abDoorFig(ctx, t, fig, m, mode) {
  const tc = AB_T2(t), x = fig.f(tc); if (x >= AB_DEND || x < -1e3) return; const st = abDoorState(x); if ((mode === 'in') !== st.inside) return;
  const s = fig.s * st.k, P = { x, y: fig.y + st.sink, s, dir: fig.dir, ...walk(fig.f, tc, { stride: 24 * fig.s }), gaze: [fig.dir, -0.1], lid: abLid(t, 130 + (fig.seed || 0)), tip: 0.05 * fig.dir + idleSway(tc, 131 + (fig.seed || 0), 0.02, 1.9), handR: [8, -196], handL: [-20, -120] };
  if (fig.act) fig.act(P, tc);
  const draw = (c) => { if (fig.who < 0) abLeader(c, P, m); else abMan(c, fig.who, P, m);
    const h = abHand(P, 1); if (fig.sack) abSack(c, h[0] - 10 * fig.dir, h[1] + 30 * s, 0.55 * s / 0.95, fig.sack === 'flat' ? 0 : 1, { rot: 0.2 * fig.dir, flap: 4 * Math.sin(t * 7 + (fig.seed || 0)) }); };
  if (mode === 'out' && st.dark < 0.02) { draw(ctx); return; }
  // the long shadow fans from the door across the ground
  if (mode === 'out') { ctx.save(); ctx.globalAlpha = 0.35 * st.dark; ctx.fillStyle = '#2b1a3a'; ctx.beginPath(); ctx.moveTo(x - 18, fig.y + 2); ctx.lineTo(x + 18, fig.y + 2); ctx.lineTo(x - 330 + (1820 - x) * 0.2, fig.y + 58); ctx.lineTo(x - 380 + (1820 - x) * 0.2, fig.y + 38); ctx.closePath(); ctx.fill(); ctx.restore(); }
  abCel(ctx, [P.x, P.y, 320 * s, 340 * s], draw, { tint: '#2b1a3a', k: 0.85 * Math.round(st.dark * 4) / 4, rim: st.dark > 0.2 ? '#ff7ad9' : null, light: [1, -0.25], rimW: 4.5 });
}
function abDoorFigs(ctx, t, figs, m, mode) { for (const f of [...figs].sort((a, b) => a.y - b.y)) abDoorFig(ctx, t, f, m, mode); }

// ---------- S7 50.32-56.6: into the door against the light; the last man looks back; the door shuts cleanly; MUCH LATER ----------
const AB_S7_FIGS = [
  { who: -1, s: 1.08, y: 902, dir: 1, seed: 9, f: (u) => kfn(u, [[50.32, 1625], [51.5, 1915]], 'lin') },
  ...[0, 1, 2, 3, 4].map((i) => { const t0 = 50.6 + 0.2 * i, x0 = 1560 - i * 55; return { who: i, s: 0.95, y: 902, dir: 1, seed: i, sack: 'full', f: (u) => kfn(u, [[t0, x0], [t0 + (1915 - x0) / 240, 1915]], 'lin'),
    act: (P, tc) => { if (i === 1 && tc > 51.3 && tc < 51.7) P.handR = [8, -210 + 20 * pulse(tc, 51.3, 0.4)]; if (i === 3 && tc > 51.9 && tc < 52.3) P.tip = 0.2 * pulse(tc, 51.9, 0.4); } }; }),
  ...[0, 1, 2, 3, 4].map((j) => ({ who: j + 1, s: 0.62, y: 880, dir: 1, seed: 20 + j, f: (u) => kfn(u, [[50.9 + 0.22 * j, 1330], [50.9 + 0.22 * j + 2.2, 1915]], 'lin') })),
  { who: 5, s: 0.95, y: 902, dir: 1, seed: 5, sack: 'full', f: (u) => kfn(u, [[51.0, 1450], [52.04, 1640], [52.9, 1640], [53.6, 1915]], 'lin'),
    act: (P, tc) => { if (tc >= 52.04 && tc < 52.9) { P.dir = tc < 52.25 || tc > 52.75 ? 1 : -1; P.gaze = gazePlan(tc, [[52.04, [1, 0]], [52.3, [-1, -0.6]], [52.6, [-0.6, -0.9]], [52.75, [1, 0]]]); P.lid = abBlinkAt(AB_T3(tc), 52.25); } } },
];
// a back row of riderless horses (the forty's mounts) beyond the line, dark against the light
const AB_BACKROW = [[1380, 864, 0.5], [1560, 860, 0.46], [2180, 862, 0.5], [2290, 866, 0.52], [2390, 860, 0.46]];
function abBackRow(ctx, t, m, k = 0.6) { const tc = AB_T2(t); AB_BACKROW.forEach(([x, y, s], i) => abHorse(ctx, { x, y, s, dir: i % 2 ? -1 : 1, pal: i % 3, tailSwish: osc(tc, 1.6 + i * 0.3, i), earL: 0.3 + idleSway(tc, 300 + i, 0.3, 1.8), headDown: i === 1 ? 0.6 : 0.1 + idleSway(tc, 310 + i, 0.08, 3) }, m, { tint: '#3a2a5a', k, shade: null, line: null })); }
function abS7World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'afternoon', close = K.clamp((t - 54.0) / 0.75), open = 1 - K.ease.inOut(close);
  abBackRow(ctx, t, m);
  abRock(ctx, 1820, 900, { model: m, open, crack: K.clamp(open * 4), glow: open, t, inside: (c) => { c.save(); c.translate(-1820, -900); abDoorFigs(c, t, AB_S7_FIGS, m, 'in'); c.restore(); } });
  abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h); abHorse(ctx, abLineHorse(h, k, tc), m, open > 0.05 ? { rim: '#ff7ad9', light: [1, -0.2], rimAlpha: open } : {}); });
  abDoorFigs(ctx, t, AB_S7_FIGS, m, 'out');
}
const AB_S7_GAP = (t) => (t < 52.2 ? 1 : t < 55.6 ? 0.08 : K.clamp((t - 55.6) / 0.25));
AB_SHOTS.push({ a: 50.32, b: 56.6, ww: 2400, cam: (t) => K.camAt([[54.0, { x: 1760, y: 620, zoom: 1.1 }], [55.2, { x: 1790, y: 680, zoom: 1.35 }]], t), under: abGladeWide('afternoon'), world: abS7World,
  over: (ctx, t) => abLeafFrame(ctx, t, { m: 'afternoon', gap: AB_S7_GAP(AB_T2(t)), gaze: t < 52.0 ? [0.8, 0.4] : [0.5, 0.3], lid: t > 55.6 ? Math.max(0, 0.8 - (t - 55.6) * 1.6) : 0 }) });

// ---------- S8 56.6-62.55: the same framing repainted at dusk; they come up out of the door; staggered mounting with contact ----------
const AB_S8_FIGS = [0, 1, 2, 3, 4, 5].map((j) => ({ who: j, s: j < 3 ? 0.95 : 0.62, y: j < 3 ? 902 : 880, dir: -1, seed: 40 + j, sack: j < 3 ? 'flat' : null, f: (u) => kfn(u, [[59.0 + 0.16 * j, 1912], [59.0 + 0.16 * j + 2.4, 1912 - 2.4 * 270]], 'lin') }));
// the mount: walk to the flank, a hand to the saddle (2 drawings), crouch (3), a low arc with the leg swinging over, land on the saddle
const AB_MT = { 1: { hand: 59.9, crouch: 60.06, arc: 60.22, land: 60.5 }, 2: { hand: 60.14, crouch: 60.3, arc: 60.46, land: 60.74 }, 0: { from: 1660, hand: 60.5, crouch: 60.66, arc: 60.86, land: 61.14 } };
function abS8Riders(ctx, t, m) {
  const tc = AB_T2(t);
  abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h), M = AB_MT[k], tf = 60.95 + 0.15 * k, turned = tc > tf && k > 0, H = abLineHorse(h, k, tc, { sleep: tc < 59.6 });
    const landT = M ? M.land : 0;
    if (turned) { H.dir = -1; H.sq = landSquash(tc, tf, 0.05); H.headDown = 0; H.earL = 0.8; H.earR = 0.7; } else if (k > 0 && tc > tf - 0.3) H.headTurn = 0.45 * beatIn(tc, tf - 0.3, tf);
    if (!M || tc >= landT) {   // seated (riders 3+ are already mounted when we cut in)
      if (M) { H.y += 8 * pulse(tc, landT, 0.3); H.sq = (H.sq || 1) * landSquash(tc, landT, 0.07, 10); H.neck = (H.neck || 0) + lagged((u) => 0.4 * pulse(u, landT, 0.35), tc, 0.1, 1); }
      abRider(ctx, h.i, H, { gaze: turned ? [-1, 0] : [1, 0], lid: abLid(t, 140 + k, M ? [landT + 0.3] : []), tip: idleSway(tc, 141 + k, 0.02, 2.2), sq: M ? landSquash(tc, landT + 0.04, 0.08) : 1 }, m, { cloak: 0.7, t, sacks: true, flat: true });
      return; }
    abHorse(ctx, H, m);
    const seat = mountSeat('horse', H), ps = 0.95 * h.s * (h.i < 0 ? 1.08 / 0.95 : 1), flank = seat.x - 18, gy = h.y + 4;
    const wx = (u) => (M.from ? kfn(u, [[59.88, M.from], [M.hand, flank]], 'out') : flank);
    let P = { x: wx(tc), y: gy, s: ps, dir: 1, ...(M.from && tc < M.hand ? walk(wx, tc, { stride: 22 * ps }) : {}), lid: abLid(t, 150 + k), gaze: [1, -0.1], handL: [-20, -120], handR: [30, -120], tip: idleSway(tc, 151 + k, 0.02, 2.1) };
    if (tc >= M.hand) { const r = beatIn(tc, M.hand, M.hand + 0.16); P.handLW = [K.lerp(P.x + 10, seat.x + 8, r), K.lerp(gy - 110 * ps, seat.y - 4, r)]; P.gaze = [0.6, 0.4]; }
    if (tc >= M.crouch) { P.sq = anticipate(tc, M.crouch, M.arc - M.crouch, 0.14); P.handRW = [seat.x + 40, seat.y - 6]; }
    if (tc >= M.arc) { const u = beatIn(tc, M.arc, landT), tx = seat.x + 22 * ps, ty = seat.y + 52 * ps;
      P = { ...P, x: K.lerp(flank, tx, u), y: K.lerp(gy, ty, u) - 34 * Math.sin(Math.PI * u), sit: u, seat: 'bench', sq: 1 + 0.06 * Math.sin(Math.PI * u), tip: 0.12 * Math.sin(Math.PI * u), handLW: [seat.x + 8, seat.y - 6], handRW: undefined, handR: [40, -150 + 30 * u], gaze: [1, -0.2] }; }
    if (h.i < 0) abLeader(ctx, P, m); else abMan(ctx, h.i, P, m);
  });
}
function abS8World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dusk', open = K.clamp((t - 58.8) / 0.6), crack = K.clamp((t - 58.6) / 0.2);
  abBackRow(ctx, t, m, 0.7);
  abRock(ctx, 1820, 900, { model: m, open: K.ease.inOut(open), crack, glow: open, t, inside: (c) => { c.save(); c.translate(-1820, -900); abDoorFigs(c, t, AB_S8_FIGS, m, 'in'); c.restore(); } });
  if (t < 59.88) { abByY(AB_HL).forEach((h) => { const k = AB_HL.indexOf(h); abHorse(ctx, abLineHorse(h, k, tc, { sleep: true }), m); }); abDoorFigs(ctx, t, AB_S8_FIGS, m, 'out'); }
  else abS8Riders(ctx, t, m);
  if (t < 59.0) { const u = (t - 57.03) / 1.9; ctx.save(); ctx.translate(1500 + u * 500, 520 + 40 * Math.sin(u * 20)); for (const s of [-1, 1]) abBlob(ctx, s * 7, 0, 9, 5 + 3 * Math.abs(Math.sin(t * 30)), '#e8d8b0', '#a89a7a', { lw: 1.5, off: 2 }); ctx.restore(); }
}
AB_SHOTS.push({ a: 56.6, b: 62.55, ww: 2400, cam: (t) => (t < 59.88 ? { x: 1760 + 20 * K.clamp((t - 56.6) / 3.3), y: 620, zoom: 1.1 } : { x: 1375 + 30 * K.clamp((t - 59.88) / 2.6), y: 712, zoom: 1.9 }), under: abGladeWide('dusk'), world: abS8World,
  over: (ctx, t) => { if (t < 59.88) { const tc = AB_T3(t), droop = tc < 58.7 ? flow(tc, [[57.64, 0.2], [58.2, 0.6], [58.6, 0.9], [58.7, 0.9]]) : 0; abLeafFrame(ctx, t, { m: 'dusk', gaze: tc < 58.7 ? [0.4, 0.5] : [0.9, 0.2], lid: droop, iris: tc > 58.7 ? 1.12 : 1 }); } } });

// ---------- S9 62.55-70.48: Close Sesame from the saddle (medium, nothing held dead); the rock seals and heals; a sparrow; they ride ----------
const AB_S9_ARM = [[63.8, 0], [63.96, -0.25], [64.12, 1.15], [64.3, 0.95], [64.6, 1.0], [65.0, 1.6], [65.4, 1.75], [65.8, 1.7], [66.2, 1.72]];
function abS9World(ctx, t, cam) {
  const tc = AB_T2(t), m = 'dusk', close = K.clamp((t - 66.3) / 1.1), open = 1 - K.ease.inOut(close), flick = t > 65.8 && t < 65.87 ? 0.4 : 1, heal = 1 - K.clamp((t - 67.42) / 1.08);
  abBackRow(ctx, t, m, 0.7);
  abRock(ctx, 1820, 900, { model: m, open, crack: open > 0.005 ? 1 : heal, glow: open * flick, t, light: [-1, -0.2] });
  // the frieze of riders, already turned to the left; they shuffle while he calls, and move off after the leader's nod
  abByY(AB_HL.slice(1)).forEach((h) => { const k = AB_HL.indexOf(h), go = 69.9 + 0.13 * k, xf = (u) => h.x - (u > go ? 60 * (u - go) * (u - go) : 0) - 8 * Math.sin(Math.PI * beatIn(u, 63.0 + 0.2 * k, 63.6 + 0.2 * k));
    const H = { ...abLineHorse(h, k, tc), ...walk(xf, tc, { stride: GAIT.horse * h.s }), dir: -1, headDown: 0, earL: 0.6, earR: 0.5 };
    abRider(ctx, h.i, H, { gaze: tc > 64.1 + 0.1 * k && tc < 66.4 ? [1, -0.1] : [-1, 0], lid: abLid(t, 160 + k, [64.1 + 0.1 * k]), tip: idleSway(tc, 161 + k, 0.02, 2.2) }, m, { cloak: 0.7, t, sacks: true, flat: true, rim: open > 0.1 ? '#ffb070' : null, light: [1, -0.2], rimAlpha: open }); });
  // the leader on the black horse: the horse shifts its weight and tosses its head (63.2); he turns in the saddle toward the rock
  // with a blink, throws the arm out on "أغلق" and sweeps it shut
  const turn = tc > 69.8, lx = (u) => (u > 69.8 ? 1620 - 50 * (u - 69.8) * (u - 69.8) : 1620 + 6 * osc(u, 2.6)), H = { x: lx(tc), y: 905, s: 0.86, pal: 2, dir: turn ? -1 : 1, ...walk(lx, tc, { stride: GAIT.horse * 0.86 }),
    rear: 0.4 * pulse(tc, 62.6, 1.0), neck: 0.5 * pulse(tc, 63.2, 0.45) + idleSway(tc, 171, 0.06, 2.3), headDown: 0.15 * pulse(tc, 63.4, 0.4), tailSwish: osc(tc, 1.6) + 0.5 * pulse(tc, 63.25, 0.5), earL: 0.5 + idleSway(tc, 172, 0.2, 1.7), earR: 0.4 + 0.5 * pulse(tc, 64.1, 0.3), lid: abLid(t, 173) };
  const a = flow(tc, AB_S9_ARM) + lagged((u) => flow(u, AB_S9_ARM), tc, 0.1, 0.35);
  const PP = { gaze: turn ? [-1, 0] : tc < 63.5 ? [-1, 0.1] : [1, -0.3], brow: 0.7, lid: tc > 69.3 && tc < 69.8 ? 0.3 : abLid(t, 170, [63.5]), tip: tc < 63.5 ? -0.04 : 0.05 * beatIn(tc, 63.5, 63.8) + idleSway(tc, 174, 0.015, 2.1), mouth: 'closed', talk: abTalk(t, 64.28, 65.5, 5), lurch: 0.04 * pulse(tc, 63.2, 0.5) };
  if (PP.talk) PP.mouth = 'open';
  if (tc > 63.8 && tc < 66.6) PP.handR = a < 0 ? [20, -120] : a <= 1 ? [K.lerp(30, 110, Math.min(a, 1.15)), K.lerp(-120, -232, Math.min(a, 1.15))] : [K.lerp(110, -40, a - 1), K.lerp(-232, -150, a - 1)];
  if (tc > 69.3 && tc < 69.8) PP.drop = 8 * pulse(tc, 69.35, 0.4);   // a nod
  abRider(ctx, -1, H, PP, m, { cloak: 1.1, t, rim: open > 0.1 ? '#ffd76a' : null, light: [1, -0.3], rimAlpha: open });
  // a sparrow lands on the rock, pecks, hops and tilts its head: an ordinary rock
  if (t > 68.6) { const u = K.clamp((t - 68.6) / 0.35), hp = beatIn(tc, 69.3, 69.5), x = K.lerp(2000, 1700, u) - 26 * hp, y = K.lerp(160, 270, u) - 30 * Math.sin(Math.PI * u) - 18 * Math.sin(Math.PI * hp), fly = u < 1;
    bird(ctx, { kind: 'sparrow', x, y, s: 0.7, dir: -1, fly, flap: fly ? Math.sin(AB_T2(t) * 30) : 0, beak: !fly && tc < 69.3 && Math.sin(AB_T2(t) * 9) > 0.3 ? 1 : 0, headRot: !fly ? (tc > 69.55 ? 0.5 : 0.4 * Math.max(0, Math.sin(AB_T2(t) * 9))) : 0 }); }
}
function abS9Cam(t) { if (t < 66.2) return { x: 1650, y: 700, zoom: 1.75 }; return K.camAt([[67.4, { x: 1800, y: 620, zoom: 1.1 }], [69.2, { x: 1720, y: 615, zoom: 1.0 }]], t); }
AB_SHOTS.push({ a: 62.55, b: 70.48, ww: 2400, cam: abS9Cam, under: abGladeWide('dusk'), world: abS9World,
  over: (ctx, t, cam, S) => { if (t < 66.2) { const [hx] = abP(1720, 600, cam); abWords(ctx, S, ['أغلق', 'يا', 'سمسم'], [64.28, 64.78, 64.94], hx, 150, t, { size: 90, stack: true, stackX: hx, pop: true, gone: 65.6, glow: '#8a5cff' });
      if (t > 64.0) abBands(ctx, [0, 0, 1000, 1230], t, { cols: ['#c8a0ff', '#ffb070'], alpha: 0.13, w: 150, speed: 300, n: 2 }); }
    else abLeafFrame(ctx, t, { m: 'dusk', gaze: [0.9, 0.35] }); } });

// ---------- S10 70.48-78.0: they gallop away under the tree; the empty path; the careful descent; the landing; the donkey ----------
const AB_DOWN_Y = [[74.8, 452], [75.3, 570], [75.7, 700], [75.95, 815]];
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
  else if (tc >= 74.8 && tc < 75.95) abClimber(ctx, t, m, flow(tc, AB_DOWN_Y), { gaze: [0.3, 1] });
  else if (tc >= 75.95) { const air = tc < 76.2, y = air ? fallY(tc, 75.95, 76.2, 815, 900) : 900, lift = 900 - y; groundShadow(ctx, 612, 903, 100, lift, { flat: true, color: '#1a1030' });
    // the short drop: arms still up from the trunk, feet hanging; land on "بحذر" (76.20) in a squash; look left, then right, a blink on each turn
    const P = { x: air ? 600 + 14 * beatIn(tc, 75.95, 76.2) : 614, y, dir: air ? -1 : 1, sq: air ? 1.06 : impactSquash(tc, 76.2, 0.82), handL: air ? [-30, -235] : [-60, -110], handR: air ? [40, -240] : [60, -110], amp: air ? 0.35 : 0, ph: 1.2,
      lid: abLid(t, 19, [76.5, 76.78]), mouth: 'grit', gaze: gazePlan(tc, [[75.95, [0, 1]], [76.5, [-1, 0]], [76.78, [1, 0]], [77.05, [1, 0.3]]]), tip: air ? 0 : 0.1 * (1 - beatIn(tc, 76.3, 76.6)) };
    if (!air && tc < 76.5) { P.handL = [-50, -60]; P.handR = [50, -60]; }
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
function abS11Cam(t) { if (t < 79.82) return { x: 1600, y: 615, zoom: 1.0 }; if (t < 85.74) return { x: 1700 - 6 * K.clamp((t - 82.84) / 2.9), y: 743, zoom: 2.2 + 0.08 * K.clamp((t - 82.84) / 2.9) }; return { x: 1780, y: 620, zoom: 1.1 }; }
function abMemory(ctx, t, S) {   // a tape memory flash: the leader's thrown arm, in afternoon colours, inside an inset
  if (t < 81.8 || t > 82.45) return; const x = 520, y = 120, w = 420, h = 330;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(abGladePlate('afternoon'), 1350, 380, 600, 480, x, y, w, h);
  ctx.translate(x + w / 2 - 40, y + h - 10); ctx.scale(0.75, 0.75); abRock(ctx, 330, 0, { model: 'afternoon', s: 0.5 }); abLeader(ctx, { x: 0, y: 0, dir: 1, handR: [112, -214], mouth: 'open', gaze: [1, -0.3] }, 'afternoon'); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 6; ctx.strokeRect(x, y, w, h); const R = K.rng(Math.floor(t * 30)); ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 3; i++) ctx.fillRect(x, y + R() * h, w, 3 + R() * 6); ctx.restore();
}
AB_SHOTS.push({ a: 78.0, b: 87.6, ww: 2400, cam: abS11Cam, under: abGladeWide('dusk'), world: abS11World,
  over: (ctx, t, cam, S) => { abMemory(ctx, t, S);
    if (t > 83.0 && t < 85.74) { const [x, y] = abP(1668, 640, cam); abWords(ctx, S, ['افتح', 'يا', 'سمسم'], [83.19, 83.76, 83.94], x, y - 40, t, { size: 52, gone: 84.9, wobble: 4 }); }
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
