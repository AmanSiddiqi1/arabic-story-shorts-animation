// ===== SIND-02 shots S20-S22 (128.07 - 147.82 s): the traders on the rim, the diamonds shared, the port, the tale on deck, the feather, THE END =====

// ---------- S20 (128.07 - 136.88): valleyRim ----------
const SB2_S20X = (t) => kfn(t, [[128.07, 820], [129.2, 820], [131.0, 960], [136.1, 960], [136.4, 990]], 'inOut');
const SB2_TRP = [{ x: 1300, seed: 90, dy: 50 }, { x: 1180, seed: 91, dy: 0 }, { x: 1060, seed: 92, dy: 25 }];   // v2: three depths (y offset, matching scale)   // eldest, second, young (index = SB_TRADER)
function sbRimWorld(ctx, t, cam, S) { const tc = SB_T2(t);
  sbValleyRim(ctx, t, cam, { sky: (c) => { sbSun(c, 1900, 160, 46, '#fffbe0', '#ffe0a0', 0.7); sbCloud(c, 900 + 20 * t % 200, 220, 400, 60, 'rgba(255,255,255,0.9)', 'rgba(200,180,232,0.5)', 8);
    for (let i = 0; i < 2; i++) { const a = tc * 0.8 + i * 2.6; bird(c, { kind: 'hawk', pal: 1, fly: true, flap: Math.sin(tc * 8 + i), x: 1500 + 300 * Math.cos(a), y: 200 + 50 * Math.sin(a), s: 0.45, dir: Math.sin(a) > 0 ? -1 : 1 }); }
    if (t > 130.94 && t < 132.6) { const u = (t - 130.94) / 1.6; bird(c, { kind: 'hawk', pal: 1, fly: true, flap: Math.sin(tc * 10), x: 2000 - 1300 * u, y: 120, s: 0.6, dir: -1, grip: 1, carry: (k) => { k.save(); k.scale(1 / 0.6, 1 / 0.6); sbSlab(k, 0, 60, { rot: 0, s: 0.35 }); k.restore(); } }); } } });
  // v2: the camp in the foreground: rope coil, baskets, a cloth of sorted stones, a small fire in the stone ring
  sbFire(ctx, 1300, 1062, t, { s: 0.5 });
  for (const [bx, by, bs] of [[1500, 1040, 1], [1580, 1060, 0.8]]) { celShade(ctx, [[bx - 50 * bs, by - 70 * bs], [bx + 50 * bs, by - 70 * bs], [bx + 40 * bs, by], [bx - 40 * bs, by]], '#d8a050', '#9a6a30', { light: [-1, -1], off: 14 * bs, lw: 3 }); ctx.save(); ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 3; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(bx - 48 * bs, by - 70 * bs + k * 17 * bs); ctx.lineTo(bx + 48 * bs, by - 70 * bs + k * 17 * bs); ctx.stroke(); } ctx.restore(); }
  ctx.save(); for (let k = 0; k < 4; k++) { ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(1000, 1100 - k * 6, 60 - k * 8, 18 - k * 2, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = '#c8a060'; ctx.lineWidth = 7; ctx.stroke(); } ctx.restore();
  celShade(ctx, [[1080, 1000], [1240, 990], [1260, 1040], [1070, 1050]], '#2f6fe0', '#1f4aa8', { light: [-1, -1], off: 8, lw: 3 }); for (let k = 0; k < 7; k++) sbGem(ctx, 1100 + k * 22, 1012 + (k % 2) * 16, 8 + (k % 3) * 2, { line: '#3a1a5a', tint: '#3ad0ff', tintB: '#ff7ab8' });
  // the donkey by the tent
  donkey(ctx, { x: 1470, y: 905, s: 0.62, dir: -1, pal: 1, earL: idleSway(tc, 41, 0.4, 1.7), earR: idleSway(tc, 42, 0.4, 2.1), tailSwish: osc(tc, 1.4), sq: breathe(tc, 43, 0.015), chew: 0.5 + 0.5 * osc(tc, 0.8) });
  const sin = sbRimSinP(t), climb = t < 128.7; if (climb) { ctx.save(); ctx.beginPath(); ctx.rect(300, -2000, 2400, 2000 + 908); ctx.clip(); } const Qs = sbSin2(ctx, sin), palm = sbHandW(Qs, 1); if (climb) { ctx.restore(); if (t > 128.5) dustBurst(ctx, sin.x, 905, t - 128.5, 5, 5, 12, 50, 0.4, 3); }
  // the three traders
  const drops = [131.64, 131.8, 131.96];
  [1, 2, 0].forEach((i) => { const T = SB2_TRP[i]; const P = sbLive(t, T.seed, { x: T.x, y: 905 + T.dy, s: 1 + T.dy * 0.002, dir: 1, mouth: 'closed', gaze: [0.6, -1] }, [129.86 + stagger(i, 0.35)]);
    const turn = 129.86 + (i === 2 ? 0 : i === 1 ? 0.35 : 0.7); if (i < 2) { P.handR = t < turn ? PERSON_HANDS.shield.R : P.handR; P.dir = t < turn ? 1 : -1; P.gaze = t < turn ? [0.8, -1] : [-1, 0]; }
    if (i === 2) { P.dir = -1; if (t < 128.6) { P.gaze = [1, -0.6]; P.dir = 1; } else if (t < 129.86) { const dt = t - 128.6; P.gaze = dt < 0.2 ? [-1, 0] : dt < 0.45 ? [1, -0.2] : [-1, 0]; P.lid = dt > 0.45 && dt < 0.55 ? 1 : 0; P.brow = -0.6; }
      else if (t < 130.6) { P.dir = 1; P.handRW = [SB2_TRP[1].x - 30, 760]; P.handL = PERSON_HANDS.pointFwd.R; P.gaze = [1, 0]; } }
    if (t > drops[i]) { P.mouth = 'o'; P.brow = -0.8; P.dir = -1; P.gaze = [-1, -0.1]; P.drop = 4; }
    if (i === 2 && t > 131.7 && t < 132.6) { const [, l] = hop(t, 131.9, 0.25, 0, 0, 26), [, l2] = hop(t, 132.2, 0.25, 0, 0, 20); P.y = 905 + T.dy - l - l2; P.handLW = [T.x - 10, 860 + T.dy]; P.mouth = 'open'; }
    if (i === 0 && t > 131.9 && t < 133.2) { P.handR = t < 132.4 ? PERSON_HANDS.pointDown.R : PERSON_HANDS.pointFwd.R; P.talk = sbTalk(t, 131.9, 133.0, 3); P.mouth = P.talk > 0.4 ? 'open' : 'o'; }
    // a diamond each (135.72, 135.95, 136.18): bite, hold to the sun, hide in the cap
    const give = 135.72 + [0.46, 0.23, 0][i] * 1; if (t > give) { const k = t - give; P.mouth = 'smile';
      if (i === 0) { P.handR = [40, -230]; P.gaze = [0.3, -1]; } else if (i === 1) { P.handR = [10, -175]; P.mouth = 'open'; } else { P.handR = [10, -230 + 20 * Math.min(1, k * 3)]; } }
    if (t > 136.1 && i === 0) { P.handLW = [Qs.x - 40, 720]; P.handRW = [Qs.x + 30, 720]; P.mouth = 'smile'; }
    if (t > 133.94 && t < 135.72) { P.gaze = lookAt([T.x, 700], palm); P.mouth = 'o'; }
    const Q = sbTrader(ctx, i, P);
    if (i === 2 && t < 131.7) { const h = sbHandW(Q, 1); sbSlab(ctx, h[0], h[1] - 30, { rot: 0.4, s: 0.45 }); }
    if (i === 2 && t >= 131.7) { const u = K.clamp((t - 131.64) / 0.25); sbSlab(ctx, T.x + 30, K.lerp(800, 880, u * u) + T.dy, { rot: SB_FLAT + 0.3, s: 0.45 }); }
    if (t > give && t < give + 1.5) { const h = sbHandW(Q, 1); sbGem(ctx, h[0], h[1] - 10, 9, { glow: 0.6 }); if (i === 0) sbGlint(ctx, h[0], h[1] - 20, 30, ((t - give) * 2) % 1); } });
  // the diamonds poured into his palm light the four faces from below (halation, white rim)
  if (t > 133.94 && t < 136.0) { const k = K.clamp((t - 134.1) / 0.3) * (1 - K.clamp((t - 135.72) / 0.3)); sbGlow(ctx, palm[0], palm[1] - 10, 260, 0.9 * k, '#e8f6ff'); for (let i = 0; i < 6; i++) { const u = K.clamp((t - 133.94 - i * 0.08) / 0.25); if (u > 0) sbGem(ctx, palm[0] - 12 + (i % 3) * 12, K.lerp(palm[1] - 60, palm[1] - 12 - Math.floor(i / 3) * 8, u), 7, { rot: i }); } sbGlints(ctx, [palm[0] - 30, palm[1] - 40, 60, 40], t, 4, 77, 14, 1.6); }
  // (v2: the v1 striped cloth quad drawn over him here is gone; the shot ends on the three diamond reactions and his bow)
}
function sbRimSinP(t) { const tc = SB_T2(t), x = SB2_S20X(t), P = sbLive(t, 11, { x, y: 905, dir: 1, mouth: 'smile', gaze: [1, -0.1], wind: -0.2 }, [128.4, 131.0, 133.2]);
  if (t < 128.7) { const u = K.ease.out(K.clamp((t - 128.07) / 0.55)); P.x = 820; P.y = 905 + 230 * (1 - u); P.handLW = [805, 902]; P.handRW = [855, 902]; P.gaze = [1, -0.3]; P.mouth = t < 128.4 ? 'o' : 'smile'; P.hairK = 1.3; if (u >= 1) P.sq *= landSquash(tc, 128.62, 0.08); }
  else if (t < 129.2) { P.handR = PERSON_HANDS.wave.R; P.hairK = 1.3; }
  else if (t < 131.0) { Object.assign(P, walk(SB2_S20X, tc, { stride: 26 })); P.y = 905; }
  if (t > 133.2 && t < 133.94) { const op = sbF(t, [[133.2, 0], [133.45, 1], [133.7, 1], [133.94, 0.3]]); P.aL = [K.lerp(0.3, 2.2, op), 2.3]; P.aR = [K.lerp(0.3, 2.2, op), 2.3]; P.tip += 0.15 * pulse(tc, 133.6, 0.35); P.mouth = 'smile'; }
  if (t > 133.94 && t < 135.72) { P.handR = [50, -120]; P.handL = [-10, -96]; P.gaze = [1, 0.6]; }
  if (t >= 135.72 && t < 136.4) { const k = Math.min(2, Math.floor((t - 135.72) / 0.23)), tg = SB2_TRP[2 - k]; P.handRW = [tg.x - 30, 790]; P.tip += 0.1; }
  if (t > 136.1) { P.tip -= 0.12 * pulse(tc, 136.1, 0.5); P.mouth = 'open'; P.lid = 0.6; P.dir = 1; }
  return P; }
function sbRimOver(ctx, t, cam, S) { if (t > 131.9 && t < 133.3) { const p = sbP(1300, 700, cam); sbSay(ctx, S, [[131.9, 'FROM THE VALLEY?!']], t, Math.min(780, p[0]), p[1] - 330, [p[0] + 10, p[1] - 80], { gone: 133.1, size: 46 }); } }
SB_SHOTS.push({ a: 128.07, b: 136.88, free: true, cam: sbKeys([[128.07, { x: 1120, y: 680, zoom: 1 }], [129.2, { x: 1120, y: 680, zoom: 1 }], [131.0, { x: 1200, y: 680, zoom: 1 }], [134.0, { x: 1200, y: 680, zoom: 1 }], [134.4, { x: 1150, y: 600, zoom: 1.3 }], [136.1, { x: 1150, y: 600, zoom: 1.3 }], [136.88, { x: 1170, y: 610, zoom: 1.2 }]]), world: sbRimWorld, over: sbRimOver });

// ---------- S21 (136.88 - 140.9): the mountain port, the ship home (emerald stripes), the turban rewound crooked ----------
const SB2_Q21 = { hz: 620, y: [632, 700, 945, 1030], amp: 6, pal: 'day' };
const SB2_S21X = (t) => kfn(t, [[136.88, 880], [138.12, 1060], [138.42, 1092], [139.4, 1490]], 'inOut');
const SB2_D21 = (t) => kfn(t, [[140.22, 1660], [140.9, 1800]], 'in');
function sbPortWorld(ctx, t, cam, S) { const tc = SB_T2(t), sea = SB2_Q21;
  sbSkyTall(ctx, 'day', cam, 620); sbSun(ctx, 1800, 240, 46, '#fffbe0', '#ffe0a0', 0.7); sbSeaBack(ctx, t, sea, 0, 2600); sbGulls(ctx, t - 136, 1500, 260, 40, 3, 6, 0.32);
  ctx.drawImage(sbQuayPlate('port'), 0, 0);
  const f = sbFloat(SB2_D21(t), t, sea, 2, 200), D = { x: SB2_D21(t), y: f.y - 2, s: 1.15, pitch: f.rot * 0.4 + (t > 140.22 ? 0.026 * Math.sin((t - 140.22) * 2) : 0), t, sail: K.clamp(SB_T2(t - 138.98) / 0.8), billow: 0.6 + 0.5 * pulse(t, 139.6, 0.5), stripe: '#1f9a6a' };
  D.crew = (c) => sbOnDeck(c, D.s, (q) => sbPortCrew(q, t, D.s)); sbDhow(ctx, D); sbQuayWater(ctx, t, sea, 0, 2600); if (t > 140.22) sbWake(ctx, D.x, D.y, D.s, 1, t, K.clamp((t - 140.22) / 0.4));
  if (t < 140.3) { const a = [1092, 900], b = sbDhowPt(D, -150, -130), bend = t > 138.42 && t < 139.4 ? 5 * Math.abs(Math.sin(tc * 9)) : 0; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + bend, ...b); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore(); }
  // the donkey with bread and a waterskin, the three traders (each on its own walk)
  const gx = (k) => (u) => kfn(u, [[136.88, 700 + k * 70], [138.12, 880 + k * 60]], 'out');
  const dx = gx(-1); donkey(ctx, { ...walk(dx, tc, { stride: GAIT.donkey * 0.6 }), y: 905, s: 0.6, dir: 1, pal: 0, load: ['sack', 'jar'], earL: idleSway(tc, 44, 0.4, 1.4), earR: idleSway(tc, 45, 0.4, 1.9), bray: t > 139.9 && t < 140.6 ? Math.sin(Math.PI * (t - 139.9) / 0.7) : 0 });
  for (let i = 0; i < 3; i++) { const xf = gx(i), P = sbLive(t, 90 + i, { ...walk(xf, tc, { stride: 24 }), y: 905, dir: 1, mouth: 'smile', gaze: [1, -0.2] });
    if (i === 0 && t > 138.12 && t < 138.9) { P.handR = PERSON_HANDS.pointFwd.R; P.talk = sbTalk(t, 138.12, 138.8, 4); }
    if (t > 139.78) { P.handR = [40 + 6 * osc(tc + i * 0.2, 0.5), -230]; P.gaze = [1, -0.5]; }
    const Q = sbTrader(ctx, i, P); if (t > 139.78) { const h = sbHandW(Q, 1); sbGem(ctx, h[0], h[1] - 12, 8, { glow: 0.5 }); sbGlint(ctx, h[0], h[1] - 16, 24, ((t - 139.78 - i * 0.25) * 1.5) % 1); } }
  // Sinbad: walks with them, up the plank winding the cloth back onto his head
  if (t < 139.4) { const x = SB2_S21X(t), P = sbLive(t, 11, { ...walk(SB2_S21X, tc, { stride: 26 }), y: x > 1092 ? K.lerp(900, 800, K.clamp((x - 1092) / 436)) : 905, dir: 1, mouth: 'smile', gaze: [1, -0.2] });
    if (t > 138.42) { const a = tc * 10; P.handL = [-30 + 26 * Math.cos(a), -250 + 14 * Math.sin(a)]; P.handR = [30 + 26 * Math.cos(a + Math.PI), -250 + 14 * Math.sin(a + Math.PI)]; P.gaze = [0, -1]; P.tip += 0.08; }
    const Q = sbSin2(ctx, P); if (t > 138.42) { const hd = sbPt(Q, [0, -10]), u = (t - 138.42) / 1.0, pts = []; for (let i = 0; i <= 26; i++) { const a = i / 26 * 4 * u * Math.PI * 2 + tc * 10; pts.push([hd[0] + Math.cos(a) * 38, hd[1] - 22 - 9 * Math.sin(a) - i * 0.3]); } sbCloth(ctx, pts, { w: 12 }); } }
}
function sbPortCrew(c, t, ds) { const tc = SB_T2(t), dy = -80 * ds;
  const M = sbLive(t, 70, { x: -150 * ds, y: dy, dir: -1, gaze: [-1, 0.3], mouth: 'smile' }); if (t > 138.3 && t < 139.0) M.handR = PERSON_HANDS.wave.R; sbPerson(c, SB_MATE, M);
  for (let i = 3; i < 5; i++) { const P = sbLive(t, 60 + i, { x: (i === 3 ? 40 : 120) * ds, y: dy, dir: -1, gaze: [-0.3, -1] }); const h = osc(tc + i * 0.2, 0.5) * (t > 138.9 && t < 139.8 ? 1 : 0.15); P.handL = [10, -200 + 20 * h]; P.handR = [20, -170 - 20 * h]; sbSailor(c, i, P); }
  if (t >= 139.4) { const [hx, lift] = hop(t, 139.4, 0.25, -170 * ds, -120 * ds, 20), P = sbLive(t, 11, { x: hx, y: dy - lift, dir: t < 139.78 ? 1 : -1, mouth: 'smile', gaze: [-1, -0.1], wind: 0.6 }, [139.78]); P.sq *= landSquash(tc, 139.65, 0.12);
    if (t > 139.78) { const w = osc(tc, 0.45); P.aR = [2.5 + 0.4 * w, 2.8 + 0.4 * w + lagged((u) => osc(u, 0.45), tc, 0.1, 0.6)]; P.handL = [-30, -100]; } sbSin2(c, P); }
}
SB_SHOTS.push({ a: 136.88, b: 140.9, free: true, cam: sbKeys([[136.88, { x: 1150, y: 615, zoom: 1 }], [140.9, { x: 1350, y: 615, zoom: 1 }]]), world: sbPortWorld });

// ---------- S22 (140.9 - 147.82): the gold sea, the tale on deck, the far roc over the sun, the feather, THE END ----------
const SB2_SEA22 = { hz: 600, y: [612, 690, 828, 905], amp: 7, pal: 'gold', scroll: 70 };
function sbS22Dhow(t) { const f = sbFloat(500, t, SB2_SEA22, 2, 200); return { x: 500, y: f.y - 2, s: 1.1, pitch: f.rot * 0.5 + 0.022 * Math.sin(t * 1.7), t, sail: 1, billow: 0.7 + 0.15 * Math.sin(t * 1.3), stripe: '#1f9a6a' }; }
// v2: the far roc is a clean silhouette (crest, streamers), wingspan about 150 px, enters left of the sun at 142.7, crosses the disc 143.3-144.3,
// climbs off to the upper right by 146.5; the feather leaves it at 143.4 and lands in his raised hands at 144.6
const SB2_FRX = (t) => kfn(t, [[142.2, 420], [142.7, 560], [143.3, 720], [144.3, 880], [146.5, 1080]]), SB2_FRY = (t) => kfn(t, [[142.2, 520], [142.7, 500], [143.3, 468], [144.3, 455], [146.5, 160]], 'inOut');
function sbFarRoc(t) { const f = sbRocFlap(t, 1.5); return { x: SB2_FRX(t), y: SB2_FRY(t), s: 0.05, dir: 1, t, spread: 1, flap: t > 144.6 ? K.lerp(f.flap, 0.2, 0.5) : f.flap, flapLag: f.flapLag, tuck: 1, sil: '#5a3a7a', rot: t > 144.3 ? -0.25 : 0 }; }
let SB2_WM = null;
function sbS22World(ctx, t, cam, S) { const tc = SB_T2(t), sea = SB2_SEA22;
  sbSkyTall(ctx, 'gold', cam, 600); const Rf = sbFarRoc(t), ov = t > 142.2 && t < 146.6 ? K.clamp(1 - Math.abs(Rf.x - 800) / 140) : 0; sbSun(ctx, 800, 430, 60, '#fff2c0', '#ffc070', 1 - 0.4 * ov);
  if (t > 142.2 && t < 146.6) { ctx.save(); ctx.globalAlpha = K.clamp((t - 142.2) / 0.3); sbRoc(ctx, Rf); ctx.restore(); }
  sbSeaBack(ctx, t, sea, -200, 1400); sbLightPath(ctx, t, 800, 600, 820, 70, '#fff2c8', 0.8);
  sbGulls(ctx, t - 145, 1300, 300, -120, 2, 12, 0.32);
  SB2_WM = ctx.getTransform(); const D = sbS22Dhow(t); D.crew = (c) => sbOnDeck(c, D.s, (q) => sbS22Crew(q, t, D)); D.light = (c, SP) => { if (t > 142.7 && t < 143.8) { const u = (t - 142.7) / 1.1; c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(150,120,200,0.5)'; c.fillRect(-400 + 800 * u, -700, 260, 800); c.restore(); } };
  sbDhow(ctx, D); sbWake(ctx, D.x, D.y, D.s, 1, t, 0.6);
  sbSeaFront(ctx, t, sea, -200, 1400, { from: 2, mid: (c) => { sbReflect(c, D.x, D.y + 4, 560, ['#a8643a', '#2ab0b0', '#fbf3df', '#1f9a6a'], t, { rows: 6, gap: 10, a: 0.5, seed: 9 }); sbReflect(c, 800, 830, 120, ['#fff2c0', '#ffc070'], t, { rows: 4, gap: 9, a: 0.5, seed: 10 }); } });
  // one living thing: dolphins keep pace with the ship home (two leaps), a school under the gold water
  sbSchoolShadow(ctx, 300 + 60 * Math.sin(t * 0.5), 1000, t, 12, { seed: 73, col: '#3a3a8a' });
  for (let i = 0; i < 2; i++) { const t0 = 141.2 + i * 2.6; sbDolphinLeap(ctx, 820 + i * 60, 1060 + i * 60, 960, (t - t0) / 1.0, 130, 0.6); sbDolphinLeap(ctx, 900 + i * 60, 1140 + i * 60, 990, (t - t0 - 0.3) / 1.0, 110, 0.5); }
  sbSeaNear(ctx, t, sea, cam);
}
function sbS22Crew(c, t, D) { const tc = SB_T2(t), dy = -80 * D.s, up = t > 142.7 && t < 144.7;
  // three sailors sitting round him: one gapes, one laughs and slaps his knee, one shakes his head
  [[-150, 0, 'o'], [-90, 1, 'laugh'], [110, 3, 'no']].forEach(([lx, i, kind], k) => { const P = sbLive(t, 64 + k, { x: lx, y: dy, dir: lx < 0 ? 1 : -1, sit: 1, seat: 'floor', mouth: 'closed', gaze: [lx < 0 ? 1 : -1, -0.4] });
    if (t > 141.94 + stagger(k, 0.3)) { if (kind === 'o') { P.mouth = 'o'; P.brow = -0.6; } else if (kind === 'laugh') { P.mouth = 'open'; P.handR = [50, -40 + 20 * Math.abs(osc(tc, 0.3))]; P.tip = 0.08 * Math.abs(osc(tc, 0.3)); } else { P.look = 0.6 * osc(tc, 0.5); P.mouth = 'frown'; P.brow = 0.4; } }
    if (up) { const fu = K.clamp((t - 143.4 - 0.15 * k) / 1.2); P.gaze = [K.lerp(0.6, lx < 0 ? 0.8 : -0.6, fu), K.lerp(-1, -0.3, fu)]; P.mouth = 'o'; P.tip = 0.05 * (1 - fu); } if (t > 144.7 && kind === 'no') { P.gaze = [-1, -0.3]; P.mouth = 'o'; P.brow = -0.8; }
    sbSailor(c, i, P); });
  // Sinbad tells the tale with arms like wings; looks up; catches the feather; plants it like a flag and grins at us
  const P = sbLive(t, 11, { x: -10, y: dy, dir: 1, mouth: 'smile', gaze: [-0.8, 0], wind: -0.6 }, [142.7, 143.7]);
  if (t < 142.7) { const w = osc(tc, 0.9); P.aL = [2.0 + 0.4 * w, 2.2 + 0.4 * w + lagged((u) => osc(u, 0.9), tc, 0.12, 0.6)]; P.aR = [2.0 + 0.4 * w, 2.2 + 0.4 * w]; P.talk = sbTalk(t, 141.0, 142.6, 1); P.mouth = P.talk > 0.4 ? 'open' : 'smile'; P.gaze = gazePlan(SB_T3(t), [[140.9, [-1, 0]], [141.6, [1, 0]], [142.2, [-1, 0]]], 0.15); }
  else if (t < 144.6) { const fu = K.clamp((t - 143.4) / 1.2); P.gaze = t < 143.4 ? [0.5, -1] : [K.lerp(0.5, 0.2, fu), K.lerp(-1, -0.5, fu)]; P.mouth = 'o'; P.tip -= 0.05;
    if (t > 144.1) { const r = K.clamp((t - 144.1) / 0.3); P.handRW = [K.lerp(60, 40, r), dy - K.lerp(150, 230, r)]; P.handLW = [10, dy - K.lerp(120, 200, r)]; } }
  else if (t < 145.6) { P.handRW = [40, dy - 230 + 60 * K.clamp((t - 144.7) / 0.4)]; P.handLW = [10, dy - 200 + 60 * K.clamp((t - 144.7) / 0.4)]; P.sq *= landSquash(tc, 144.6, 0.1); P.gaze = [0.3, -0.3]; P.mouth = 'smile'; P.brow = -0.3; }
  else { const w = osc(tc, 0.5) * K.clamp((t - 145.6) / 0.3); P.handRW = [70 + 20 * w, dy - 250]; P.handL = [-30, -100]; P.gaze = t < 146.6 ? [1, -1] : [0, 0]; P.mouth = 'smile'; }
  const Q = sbSin2(c, P);
  // the feather: a fleck off the far roc at 143.4, grows as it falls on a slow zigzag, lands in his hands at 144.6, then waved at the bird
  if (t > 143.4 && t < 144.6) { const u = (t - 143.4) / 1.2, L = c.getTransform().inverse().multiply(SB2_WM), R0 = sbFarRoc(143.4), a = L.transformPoint(new DOMPoint(R0.x, R0.y - 25)), b = sbHandW(Q, 1), e = K.ease.inOut(u);
    const x = K.lerp(a.x, b[0], e) + 60 * Math.sin(u * Math.PI * 3) * (1 - u), y = K.lerp(a.y, b[1] + 10, u * u * 0.4 + e * 0.6); sbFeather(c, x, y, { rot: 1.2 + 0.7 * Math.cos(u * Math.PI * 3) * (1 - u), s: K.lerp(0.15, 0.9, u) }); }
  else if (t >= 144.6) { const h = sbHandW(Q, 1); sbFeather(c, h[0], h[1] + (t < 145.6 ? 10 : -20), { rot: t < 145.6 ? 0.3 : 0.05 * Math.sin(tc * 2), curl: 0.1 * Math.sin(tc * 3), s: 0.9 }); }
}
function sbS22Over(ctx, t, cam, S) {
  if (t > 141.5 && t < 142.9) { const h = sbP(490, 580, cam); thoughtCloud(ctx, 660, 300, 440, 300, t, { p: K.clamp((t - 141.5) / 0.45), tail: [h[0] + 30, h[1] - 20], fill: '#fff6ea', scale: 0.3, at: [500, 700], seed: 11,
    inside: (k) => { sbRocCarryIcon(k, t, 600, 600, 0.42); } }); }
  if (t > 143.7) S.title(ctx, 'THE END', 440, 230, K.clamp((t - 143.7) / 0.8), { size: 104, align: 'center' });
}
SB_SHOTS.push({ a: 140.9, b: 148.5, free: true, cam: sbKeys([[140.9, { x: 520, y: 615, zoom: 1 }], [147.82, { x: 460, y: 615, zoom: 1 }]]), world: sbS22World, over: sbS22Over });
