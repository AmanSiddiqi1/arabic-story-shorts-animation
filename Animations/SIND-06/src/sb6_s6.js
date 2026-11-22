// ===== SIND-06 shots S18-S20 (132.9 - 151.37 s): the royal ship returns, A SAIL!, DAYS LATER..., Baghdad, the tale, the last pebble =====
// stubble (4 dots on the cheeks) for the men who waited
function sbStubble(ctx, Q) { ctx.save(); ctx.fillStyle = '#6a5a6a'; for (const [dx, dy] of [[-16, 14], [-12, 20], [14, 14], [10, 20]]) { const p = sbPt(Q, [dx, dy]); ctx.beginPath(); ctx.arc(p[0], p[1], 1.8 * (Q.s || 1), 0, 7); ctx.fill(); } ctx.restore(); }
const SB6_ROYAL = '#f2b01e';
// ---------- S18a (132.9 - 134.6): the royal dhow runs right to left toward the rock coast; Sinbad at the bow sees the smoke ----------
const SB6_SEA18 = { hz: 600, y: [612, 680, 820, 900], amp: 6, pal: 'day', scroll: -90 };
const SB6_D18 = (t) => kfn(t, [[132.9, 760], [134.6, 520]], 'lin');
function sbS18aWorld(ctx, t, cam) { const tc = SB_T2(t), sea = SB6_SEA18, x = SB6_D18(t), f = sbFloat(x, t, sea, 2, 200);
  sbSkyTall(ctx, 'day', cam, 600); sbSun(ctx, 820, 200, 46, '#fffbe0', '#ffe0a0', 0.8);
  // the smoke thread rising over the cliffs (the camp's fire)
  for (let k = 0; k < 6; k++) { const u = ((t * 0.3 + k / 6) % 1); ctx.save(); ctx.globalAlpha = 0.55 * (1 - u); ctx.fillStyle = '#eee8f6'; ctx.beginPath(); ctx.arc(160 + 30 * Math.sin(u * 5 + k), 420 - u * 300, 12 + u * 26, 0, 7); ctx.fill(); ctx.restore(); }
  sbSeaBack(ctx, t, sea, -400, 1600); sbRockCoast(ctx, 150, 606, 0.9, 1, t); sbLedgeBirds(ctx, t, 150, 300, 3, 100, 0.2);
  sbSeaLayer(ctx, 2, t, sea, -400, 1600);
  const D = { x, y: f.y - 2, s: 1.0, dir: -1, pitch: f.rot * 0.5 + 0.015 * Math.sin(t * 1.6), t, sail: 1, billow: 0.8, stripe: SB6_ROYAL };
  D.crew = (c) => sbOnDeck(c, D.s, (q) => { // two royal crewmen, Sinbad at the bow pointing, robe and ribbons streaming back
    [[-150, '#e0a82a'], [-60, '#2aa39a']].forEach(([lx, col], i) => { const P = sbLive(t, 95 + i, { x: lx, y: -80, dir: -1, costume: 'servant', pal: { robe: col, dot: col, sleeve: col, shoes: 'bare' }, gaze: [-1, 0] }); if (i) P.handR = [40, -200 + 20 * osc(tc, 0.5)]; person(q, P); });
    const [hx, lift] = t > 134.0 ? [0, 14 * Math.abs(Math.sin(Math.PI * K.clamp((t - 134.0) / 0.25)))] : [0, 0], P = sbLive(t, 11, { x: 190, y: -80 - lift, dir: -1, gaze: [-1, -0.2], mouth: 'open', wind: 1, robe: 1, robeFly: 0.6 });
    if (t < 133.9) P.handR = PERSON_HANDS.pointFwd.R; else { P.handR = PERSON_HANDS.shield.R; P.gaze = [-1, -0.5]; P.eyes = 'wide'; } P.sq *= landSquash(tc, 134.25, 0.12); sbSin6(q, P); });
  sbDhow(ctx, D); sbWake(ctx, D.x, D.y, D.s, -1, t, 0.8);
  sbSeaFront(ctx, t, sea, -400, 1600, { from: 3 });
  sbReflect(ctx, D.x, D.y + 8, 520, ['#a8643a', '#2ab0b0', '#fbf3df', SB6_ROYAL], t, { rows: 6, gap: 10, a: 0.5, seed: 36 });
  for (let i = 0; i < 2; i++) sbDolphinLeap(ctx, 900 - i * 120, 680 - i * 120, 960 + i * 30, (t - 133.1 - i * 0.4) / 0.9, 110, 0.5);
  sbSeaNear(ctx, t, sea, cam);
}
SB_SHOTS.push({ a: 132.9, b: 134.6, cam: sbKeys([[132.9, { x: 520, y: 615, zoom: 1 }], [134.6, { x: 470, y: 615, zoom: 1 }]]), world: sbS18aWorld });
// ---------- S18b (134.6 - 137.72): the cove: rose on the lookout rock sees the gold striped sail; the tally wall; the captain laughs ----------
const SB6_SKX = (t) => kfn(t, [[134.6, 380], [137.72, 640]], 'out');
function sbS18bWorld(ctx, t, cam) { const tc = SB_T2(t);
  sbCoveBack(ctx, t, cam, { lit: 1, far: (c) => { if (t < 136.6) sbDhow(c, { x: 330, y: 640, s: 0.3, dir: -1, sail: 1, billow: 0.7, t, stripe: SB6_ROYAL }); },
    mid: (c) => { if (t > 136.4) { const sx = SB6_SKX(t), f = sbFloat(sx, t, SB_COVE_SEA, 3, 60); sbSkiff(c, { x: sx, y: f.y + 4, s: 0.9, dir: 1, oar: tc * 7, row: 1, pitch: f.rot, crew: (q) => sbSin6(q, sbLive(t, 11, { x: 60, y: -14, dir: 1, sit: 0.6, seat: 'bench', robe: 1, mouth: 'open', handR: PERSON_HANDS.wave.R, gaze: [1, -0.2] })) }); } } });
  sbCamp(ctx, t, { sig: 1, fire: 0.5, tally: 46 });
  sbStone(ctx, 960, 902, 62, '#c8b8d0', '#8a7a9a');
  // rose on the lookout rock: double take, nearly falls off shouting (134.6 - 135.5)
  const R0 = sbLive(t, 62, { x: 960, y: 846, dir: -1, gaze: [-1, -0.1], mouth: 'closed' }); if (t > 134.75) { R0.gaze = gazePlan(SB_T3(t), [[134.75, [-1, 0]], [134.9, [1, 0]], [135.05, [-1, -0.1]]], 0.08); R0.eyes = 'wide'; R0.mouth = 'open'; R0.tip = 0.25 * Math.sin(Math.PI * K.clamp((t - 135.0) / 0.6)) * Math.sin(tc * 9); R0.aL = [2.6, 2.8]; R0.aR = [2.4, 2.6]; }
  sbStubble(ctx, sbSailor(ctx, 2, R0));
  // the others get up at different speeds: mustard at once, leaf slowly, teal not believing it (rubs his eyes)
  [[1, 1060, 135.5, 0.2], [3, 1160, 135.7, 0.6], [0, 1260, 136.0, 0.4]].forEach(([i, x, t0, d], k) => { const up = K.clamp((t - t0) / d), P = sbLive(t, 60 + i, { x, y: 902, dir: -1, sit: 1 - up, seat: 'floor', gaze: [-1, -0.1], mouth: up > 0.5 ? 'open' : 'closed' }); P.sq *= 0.97;
    if (i === 0 && t > 136.0 && t < 136.8) { P.handL = PERSON_HANDS.headHold.L; P.handR = [30, -190 + 6 * osc(tc, 0.15)]; P.lid = 0.8; }
    if (t > 137.1 + stagger(k, 0.1)) { const xf = (u) => kfn(u, [[137.1 + stagger(k, 0.1), x], [137.72, x - 160]], 'in'); Object.assign(P, walk(xf, tc, { stride: 28 })); P.sit = 0; P.handR = PERSON_HANDS.wave.R; }
    sbStubble(ctx, sbSailor(ctx, i, P)); });
  // the captain: spyglass, finds a tangerine turban, lowers it and laughs for the first time (136.7 - 137.3)
  const Cp = sbLive(t, 51, { x: 1120, y: 902, dir: -1, gaze: [-1, -0.1], pal: { sleeve: '#4a90c0' } }); let gl = 0;
  if (t > 136.2 && t < 136.9) { const r = sbF(t, [[136.2, 0], [136.45, 1], [136.9, 1]]); Cp.handR = [30 + 20 * r, -150 - 40 * r]; Cp.handL = [20 + 20 * r, -140 - 30 * r]; gl = r; }
  if (t > 136.9) { const lg = Math.abs(osc(tc, 0.18)); Cp.mouth = 'open'; Cp.talk = 0.6 + 0.4 * lg; Cp.sq *= 1 - 0.03 * lg; Cp.drop = 3 * lg; Cp.tilt = lagged((u) => 0.08 * osc(u, 0.18), tc, 0.1, 0.8); Cp.wet = true; Cp.lid = 0.4; }
  const CQ = sbCaptain(ctx, Cp); sbStubble(ctx, CQ); if (gl > 0) { const h = sbHandW(CQ, 1); sbSpyglass(ctx, h[0], h[1], Math.PI + 0.1, 0.9, gl, 0); }
  sbCoveFront(ctx, t, cam);
}
function sbS18bOver(ctx, t, cam, S) { if (t > 134.75 && t < 135.9) { const p = sbP(960, 650, cam); sbSay(ctx, S, [[134.8, 'A SAIL!']], t, p[0] + 40, p[1] - 220, [p[0], p[1]], { gone: 135.7, wobble: 4, size: 56 }); }
  if (t > 136.16 && t < 136.9) { const p = sbP(1400, 600, cam); sbTag(ctx, S, '46 DAYS', p[0], p[1] - 90, t, 136.2, 136.8, { size: 40 }); } }
SB_SHOTS.push({ a: 134.6, b: 137.72, cam: sbKeys([[134.6, { x: 1050, y: 507, zoom: 0.85 }], [135.8, { x: 1120, y: 507, zoom: 0.85 }], [136.5, { x: 1230, y: 507, zoom: 0.85 }], [137.72, { x: 1000, y: 507, zoom: 0.85 }]]), world: sbS18bWorld, over: sbS18bOver });

// ---------- S19 (137.72 - 142.64): DAYS LATER..., the Baghdad quay in gold: mooring, the plank, the kiss on the stones, the family ----------
const SB6_QG = { hz: 620, y: [632, 700, 945, 1030], amp: 5, pal: 'gold' };
const SB6_D19 = (t) => kfn(t, [[137.72, 1900], [139.4, 1660]], 'out');
function sbHomeDhow(t) { const x = SB6_D19(t), f = sbFloat(x, t, SB6_QG, 2, 200); return { x, y: f.y - 2, s: 1.15, dir: -1, pitch: f.rot * 0.4 + (t < 139.6 ? 0.02 * Math.sin((t - 137.7) * 2) : 0), t, sail: 1 - K.ease.inOut(K.clamp((t - 138.8) / 0.9)), billow: 0.6, stripe: SB6_ROYAL }; }
// the walkers down the plank: [who, start, end x on the quay]
const SB6_DOWN = [['mu', 139.9, 1000], ['tl', 140.15, 1060], ['lf', 140.4, 1140], ['rs', 140.6, 1040], ['cp', 140.9, 960], ['sin', 141.0, 880]];
function sbPlankPos(t, t0, xEnd) { const a = [1490, 806], b = [1092, 900], u = K.clamp((t - t0) / 0.75); if (u < 1) return { x: K.lerp(a[0], b[0], u), y: K.lerp(a[1], b[1], u), walking: true, xf: (q) => K.lerp(a[0], b[0], K.clamp((q - t0) / 0.75)) }; const v = K.clamp((t - t0 - 0.75) / 0.5); return { x: K.lerp(b[0], xEnd, v), y: 900, walking: v < 1, xf: (q) => K.lerp(b[0], xEnd, K.clamp((q - t0 - 0.75) / 0.5)) }; }
function sbHomeWho(ctx, who, t, P) { if (who === 'sin') return sbSin6(ctx, { ...P, robe: 1 }); if (who === 'cp') return sbCaptain(ctx, P); return sbSailor(ctx, { mu: 1, tl: 0, lf: 3, rs: 2 }[who], P); }
function sbS19World(ctx, t, cam) { const tc = SB_T2(t), sea = SB6_QG;
  sbSkyTall(ctx, 'gold', cam, 620); sbSun(ctx, 1700, 300, 56, '#fff2c0', '#ffc070', 1); sbSeaBack(ctx, t, sea, 0, 2600);
  ctx.drawImage(sbQuayPlate('gold'), 0, 0);
  if (t > 142.0 && t < 142.64) sbBands(ctx, [0, 0, 2200, 700], t - 142.0, { cols: ['#fff2c0'], alpha: 0.25, speed: 1400, n: 1, w: 200 });
  // gulls lift off the bollards (138.6)
  for (let i = 0; i < 2; i++) { const u = K.clamp((t - 138.6 - i * 0.2) / 1.4), bx = [1000, 1080][i]; sbGull(ctx, bx + 500 * u * u, 850 - 400 * Math.sin(Math.PI * Math.min(1, u * 1.2)) * 0.8, t, { fly: u > 0, flap: u > 0 ? undefined : 0, s: 0.32, dir: 1, seed: 40 + i }); }
  const D = sbHomeDhow(t); D.crew = (c) => sbOnDeck(c, D.s, (q) => { SB6_DOWN.forEach(([who, t0], k) => { if (t >= t0) return; const P = sbLive(t, 70 + k, { x: (-150 + k * 50) * D.s, y: -80 * D.s, dir: -1, gaze: [-1, -0.1], mouth: 'smile' }); if (t > 139.0) P.handR = PERSON_HANDS.wave.R; sbHomeWho(q, who, t, P); }); });
  sbDhow(ctx, D);
  if (t > 139.2 && t < 139.8) { const u = (t - 139.2) / 0.6, b = sbDhowPt(D, -240, -150); ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...b); ctx.quadraticCurveTo(K.lerp(b[0], 1080, 0.5), b[1] - 120 * Math.sin(Math.PI * u), K.lerp(b[0], 1080, u), K.lerp(b[1], 862, u)); ctx.stroke(); ctx.restore(); }
  if (t >= 139.8) { const b = sbDhowPt(D, -240, -150); ctx.save(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...b); ctx.quadraticCurveTo((b[0] + 1080) / 2, 900, 1080, 862); ctx.stroke(); ctx.restore(); }
  sbQuayWater(ctx, t, sea, 0, 2600);
  sbReflect(ctx, D.x, D.y + 6, 560, ['#a8643a', '#2ab0b0', '#fbf3df', SB6_ROYAL], t, { rows: 5, gap: 10, a: 0.45, seed: 37 });
  if (t > 139.6) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(1092, 900); ctx.lineTo(1490, 806); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore(); }
  sbCushion(ctx, 660, 846);
  sbHomeCat(ctx, t, 1);
  sbHomeFamily(ctx, t, cam);
  SB6_DOWN.forEach(([who, t0, xe], k) => { if (t < t0) return; const pp = sbPlankPos(t, t0, xe), P = sbLive(t, 70 + k, { x: pp.x, y: pp.y, dir: -1, gaze: [-1, -0.1], mouth: 'smile' });
    if (pp.walking) Object.assign(P, walk(pp.xf, tc, { stride: 26 })), P.y = pp.y + 3 * Math.abs(Math.sin(tc * 9));
    if (who === 'rs' && t > t0 + 1.3) { P.kneel = 1; P.tip = 0.6 * sbF(t, [[t0 + 1.3, 0], [t0 + 1.6, 1], [t0 + 2.2, 0.3]]); P.handLW = [pp.x - 50, 900]; P.handRW = [pp.x - 30, 900 - 10 * Math.abs(osc(tc, 0.3))]; P.lid = 1; }
    if (who === 'cp' && t > t0 + 0.2) P.handRW = [K.lerp(pp.x - 30, 870, 0.5), 720];
    if (who === 'sin') { P.robe = 1; if (t > 141.6) { P.aL = [1.6, 1.2]; P.aR = [1.6, 1.2]; P.mouth = 'open'; } }
    if (who === 'cp' && t > 141.4) P.handRW = null;
    sbHomeWho(ctx, who, t, P); });
}
// the white cat on the bench (SIND-02): watches, then the light-spot gag at the end (pounce at 150.2)
function sbHomeCat(ctx, t, phase) { const tc = SB_T2(t), jump = t > 150.2; const [hx, lift] = jump ? hop(t, 150.2, 0.4, 660, 760, 60) : [660, 0];
  const x = jump ? hx : 660, y = jump ? (t < 150.6 ? K.lerp(846, 900, K.clamp((t - 150.2) / 0.4)) - lift : 900) : 846;
  groundShadow(ctx, x, jump && t > 150.4 ? 902 : 848, 60, jump ? lift : 0, { flat: true });
  cat(ctx, { x, y, s: 0.42, pal: 1, dir: 1, sit: t > 149.6 ? 0 : 1, crouch: t > 149.7 && t < 150.2 ? 1 : 0, tailCurl: 0.4 + 0.3 * Math.sin(tc * 1.5), tailUp: 0.3, ears: idleSway(tc, 71, 0.3) + (t > 149.6 ? 0.6 : 0), lid: blink(SB_T3(t), 71), gaze: t > 149.6 ? [0.6, 0.6] : [1, -0.2], sq: breathe(tc, 71, 0.02) * landSquash(tc, 150.6, 0.14) }); }
function sbHomeFamily(ctx, t, cam) { const tc = SB_T2(t);
  const M = sbLive(t, 32, { x: 740, y: 900, dir: 1, mouth: 'smile', gaze: [1, -0.2], wet: t > 141.6 }); if (t > 141.6 && t < 142.6) { M.x = kfn(t, [[141.6, 740], [142.2, 790]], 'inOut'); M.handR = PERSON_HANDS.chest.R; }
  if (t > 146.5 && t < 148.0) { M.handR = PERSON_HANDS.mouthCover.R; M.wet = true; } sbFamily(ctx, 'mother', M);
  const F = sbLive(t, 35, { x: 660, y: 900, dir: 1, gaze: [1, -0.3] }); if (t > 141.7 && t < 142.9) { F.handL = PERSON_HANDS.palmsUp.L; F.handR = [70, -200]; F.gaze = [0.3, -1]; } sbFamily(ctx, 'father', F);
}
SB_SHOTS.push({ a: 137.72, b: 142.64, cam: sbKeys([[137.72, { x: 1060, y: 615, zoom: 1 }], [139.8, { x: 1060, y: 615, zoom: 1 }], [142.64, { x: 910, y: 615, zoom: 1 }]]), world: (ctx, t, cam) => { sbS19World(ctx, t, cam); sbHomeSister(ctx, t); } });
// the sister: runs and jumps into his arms (141.6 - 142.3); in S20 she stands beside him, takes the pebble, holds it to the sun
function sbHomeSister(ctx, t) { const tc = SB_T2(t);
  if (t < 141.6) { const P = sbLive(t, 33, { x: 830, y: 900, dir: 1, mouth: 'open', gaze: [1, -0.4] }); const j = 14 * Math.abs(Math.sin(tc * 6)) * (t > 139.5 ? 1 : 0); P.y -= j; groundShadow(ctx, 830, 902, 50, j, { flat: true }); P.handR = PERSON_HANDS.wave.R; sbFamily(ctx, 'sister', P); return; }
  if (t < 142.64) { const sx = kfn(t, [[141.6, 830], [142.0, 860]], 'inOut'), [, lift] = hop(t, 141.9, 0.3, 0, 0, 80), held = t > 142.2; const P = sbLive(t, 33, { x: sx, y: held ? 800 : 900 - lift, dir: 1, mouth: 'open', gaze: [1, -0.6], aL: [2.4, 2.6], aR: [2.4, 2.6] }); groundShadow(ctx, sx, 902, 50, held ? 100 : lift, { flat: true }); sbFamily(ctx, 'sister', P); return; }
}
// ---------- S20 (142.64 - 151.37): the tale of the farewell in a story balloon, the last pebble, THE END, the cat and the light spot ----------
function sbS20World(ctx, t, cam) { const tc = SB_T2(t), sea = SB6_QG;
  sbSkyTall(ctx, 'gold', cam, 620); sbSun(ctx, 1700, 330, 56, '#fff2c0', '#ffc070', 1); sbSeaBack(ctx, t, sea, 0, 2600); sbGulls(ctx, t - 145, 1300, 300, -60, 2, 12, 0.3);
  ctx.drawImage(sbQuayPlate('gold'), 0, 0);
  const D = { x: 1660, y: sbFloat(1660, t, sea, 2, 200).y - 2, s: 1.15, dir: -1, pitch: 0.008 * Math.sin(t * 1.3), t, sail: 0, billow: 0.5, stripe: SB6_ROYAL };
  sbDhow(ctx, D); sbQuayWater(ctx, t, sea, 0, 2600); sbReflect(ctx, D.x, D.y + 6, 560, ['#a8643a', '#2ab0b0', '#fbf3df'], t, { rows: 5, gap: 10, a: 0.45, seed: 38 });
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#3a1e10'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(1092, 900); ctx.lineTo(1490, 806); ctx.stroke(); ctx.strokeStyle = '#c8925a'; ctx.lineWidth = 13; ctx.stroke(); ctx.restore();
  sbCushion(ctx, 660, 846); sbHomeCat(ctx, t, 2);
  sbHomeFamily(ctx, t, cam);
  // the crew on bollards and the plank: they nod and add to the story with their hands (144.5 - 145.2), rose still on his knees
  [[1, 1000, 'bench'], [0, 1080, 'bench'], [3, 1180, 'plank'], [2, 1040, 'knee']].forEach(([i, x, k], q) => { const P = sbLive(t, 60 + i, { x, y: k === 'plank' ? 880 : 900, dir: -1, gaze: [-1, -0.2], mouth: 'smile' });
    if (k === 'bench') { P.sit = 1; P.seat = 'bench'; P.y = 880; } if (k === 'knee') { P.kneel = 1; P.handLW = [x - 50, 900]; P.tip = 0.15; P.x = 1040; }
    if (t > 144.5 + q * 0.15 && t < 145.4) { P.drop = 4 * Math.abs(Math.sin(tc * 6 + q)); if (i === 1) { P.handL = [-50, -140]; P.handR = [50, -140]; P.mouth = 'open'; P.talk = sbTalk(t, 144.5, 145.3, 12); } }
    sbSailor(ctx, i, P); });
  const Cp = sbLive(t, 51, { x: 1250, y: 860, dir: -1, gaze: [-1, -0.1], mouth: 'smile' }); if (t > 147.2) Cp.handR = PERSON_HANDS.chest.R; sbCaptain(ctx, Cp);
  // Sinbad: tells it with his hands (the clasp), opens his fist on the last pebble, gives it to his sister; the last look to the sea
  const P = sbLive(t, 11, { x: 900, y: 900, dir: -1, gaze: [-1, -0.2], mouth: 'smile', robe: 1, wind: 0.3 }, [148.2]);
  if (t < 143.6) { P.handL = [50, -130]; P.handR = [56, -126]; P.talk = sbTalk(t, 142.64, 146.2, 1); P.mouth = 'open'; }
  else if (t < 146.3) { P.talk = sbTalk(t, 142.64, 146.2, 1); P.mouth = P.talk > 0.4 ? 'open' : 'smile'; P.handR = [60 + 20 * osc(tc, 0.8), -160]; P.gaze = [-1, -0.4]; }
  else if (t < 148.2) { P.handRW = [K.lerp(870, 860, K.clamp((t - 146.3) / 0.4)), K.lerp(790, 800, K.clamp((t - 146.3) / 0.4))]; P.gaze = [-0.6, 0.5]; P.tip = 0.1; }
  else { P.dir = 1; P.gaze = [1, -0.1]; P.lid = 0.25; P.handRW = [1000, 850]; P.wind = -0.6; }
  const Q = sbSin6(ctx, P);
  if (t > 146.3 && t < 146.75) { const h = sbHandW(Q, 1); sbPebble(ctx, h[0], h[1] - 8, 9, 0, { glow: 0.8, glint: (t - 146.3) / 0.4 }); }
  // the sister: eyes huge, the pebble in her hands, then held to the low sun; the light spot lands on the cat
  const Sg = sbLive(t, 33, { x: 830, y: 900, dir: 1, mouth: 'smile', gaze: [1, -0.5] });
  if (t > 146.3) { Sg.eyes = 'wide'; Sg.mouth = 'o'; Sg.handLW = [856, 800]; Sg.handRW = [866, 802]; }
  if (t > 147.0) { Sg.mouth = 'smile'; Sg.eyes = undefined; }
  if (t > 149.6) { Sg.handLW = null; Sg.handRW = [900, 690]; Sg.gaze = [1, -1]; Sg.dir = 1; }
  const SQ = sbFamily(ctx, 'sister', Sg);
  if (t > 146.75) { const h = sbHandW(SQ, 1); sbPebble(ctx, h[0], h[1] - 6, 8, 0, { glow: 0.9, glint: ((SB_T3(t) * 0.8) % 1.3) }); }
  if (t > 149.6) { const lx = t < 150.4 ? 700 + 40 * Math.sin(tc * 4) : 760 + 20 * Math.sin(tc * 3), ly = t < 150.2 ? 880 : 896; ctx.save(); ctx.globalCompositeOperation = 'screen'; sbGlow(ctx, lx, ly, 46, 0.95, '#ff4a6a'); ctx.restore(); }
}
function sbS20Over(ctx, t, cam, S) {
  if (t > 142.64 && t < 146.6) { const hd = sbP(900, 680, cam), close = K.clamp((t - 146.3) / 0.3); ctx.save(); ctx.globalAlpha *= 1 - close;
    thoughtCloud(ctx, 520, 330, 600, 380, t, { p: K.clamp((t - 142.64) / 0.45), tail: [hd[0] - 10, hd[1] - 40], fill: '#fff6ea', scale: 0.5, at: [1000, 760], seed: 17, inside: (k) => sbFarewell(k, t) }); ctx.restore(); }
  if (t > 147.2) S.title(ctx, 'THE END', 500, 200, K.clamp((t - 147.2) / 0.8), { size: 104, align: 'center' });
}
// inside the balloon: the river landing; Sinbad clasps the old farmer's hands; the captain bows to the tall farmer; the pebble for the
// child (who holds it up to the sun); then the ship pulls away, farmers, child and donkey wave from the reeds
function sbFarewell(c, t) { const tc = SB_T2(t), cam = { x: 1000, y: 615, zoom: 1 };
  sbVillage(c, t, cam, { sun: [1250, 300] });
  const away = K.clamp((t - 145.2) / 1.1), sx = 1150 + 320 * K.ease.in(away);
  sbDhow(c, { x: sx, y: 960, s: 0.55, dir: 1, sail: 0.3 + 0.7 * away, billow: 0.6, t, stripe: SB6_ROYAL, crew: away > 0 ? (q) => sbOnDeck(q, 0.55, (k) => { sbSin6(k, sbLive(t, 11, { x: -40, y: -44, dir: -1, robe: 1, handR: PERSON_HANDS.wave.R, gaze: [-1, 0] })); sbCaptain(k, sbLive(t, 51, { x: 20, y: -44, dir: -1, handR: PERSON_HANDS.wave.R })); }) : null });
  donkey(c, { x: 640, y: 915, s: 0.55, dir: 1, pal: 1, earL: away > 0 ? 0.8 * Math.sin(tc * 5) : idleSway(tc, 44, 0.3), earR: idleSway(tc, 45, 0.4) });
  const F0 = sbLive(t, 81, { x: 860, y: 925, dir: 1, mouth: 'smile', gaze: [1, 0] }), F1 = sbLive(t, 82, { x: 760, y: 920, dir: 1, mouth: 'smile', gaze: [1, 0] }), Ch = sbLive(t, 84, { x: 900, y: 1010, dir: 1, child: true, gaze: [1, -0.4], mouth: 'smile', grin: true });
  if (away > 0) { [F0, F1].forEach((P, i) => { P.handR = [64 + 8 * osc(tc + i * 0.3, 0.4 + i * 0.15), -196]; }); Ch.aL = [2.6, 2.8]; Ch.aR = [2.4 + 0.3 * osc(tc, 0.3), 2.6]; }
  else if (t < 143.6) { F0.handRW = [920, 790]; F0.handLW = [915, 795]; }
  else { F1.tip = 0.1; Ch.handRW = [930, 860 - 140 * K.clamp((t - 144.0) / 0.3)]; Ch.gaze = [0.6, -1]; }
  sbFarmer(c, 1, F1); sbFarmer(c, 0, F0); const CQ = sbChild(c, Ch); if (t > 143.8) { const h = sbHandW(CQ, 1); sbPebble(c, h[0], h[1] - 10, 12, 0, { glow: 0.8, glint: ((SB_T3(t) * 0.8) % 1.3) }); }
  if (away <= 0) { const P = sbLive(t, 11, { x: 990, y: 925, dir: -1, robe: 1, gaze: [-1, 0], mouth: 'smile' }); if (t < 143.6) { P.handRW = [925, 790]; P.handLW = [930, 796]; } else P.handRW = [945, 860]; sbSin6(c, P); const Cq = sbLive(t, 51, { x: 1080, y: 925, dir: -1, gaze: [-1, 0] }); if (t > 143.6) { Cq.tip = 0.3; Cq.lid = 0.6; } sbCaptain(c, Cq); }
  sbVillageFront(c, t);
}
SB_SHOTS.push({ a: 142.64, b: 151.5, cam: sbKeys([[142.64, { x: 910, y: 615, zoom: 1 }], [151.37, { x: 870, y: 615, zoom: 1 }]]), world: sbS20World, over: sbS20Over });
