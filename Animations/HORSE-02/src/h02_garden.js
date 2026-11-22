// ===== HORSE-02: the princess's garden (S13-S15, 98.35 - 126.7) =====
// World units on princessGarden (ground y 900). The bench talk, the worry, the promise, the guards, the password.
const H2_GFX = H2_F([[98.35, 640], [99.4, 850], [117.0, 850], [117.15, 850], [118.45, 232], [118.7, 262], [125.9, 262], [126.6, 150]]);
const H2_GPX = H2_F([[98.35, 560], [99.8, 960], [117.2, 960], [118.5, 340], [126.0, 340], [126.6, 180]]);
const H2_GMX = H2_F([[98.35, 200], [100.9, 530], [116.56, 530], [117.0, 720], [117.3, 720], [118.3, 160], [125.58, 160], [126.0, 190]]);
const H2_FSIT = H2_F([[99.35, 0], [99.85, 1], [117.0, 1], [117.12, 0]]), H2_PSIT = H2_F([[99.82, 0], [100.4, 1], [117.0, 1], [117.16, 0]]);
const H2_REACH = [[109.2, 0], [109.7, 0.8], [110.0, 0.8], [110.4, 0]];
function h2GSit(P, k) { if (k > 0.01) { P.sit = k; P.seat = 'bench'; } return P; }
function h2FzGarden(t) {
  const tc = EH_T2(t), sd = 3, P = { ...walk(H2_GFX, tc, { stride: 24 }), y: 900, s: EH_FIRUZ.s, dir: 1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.025, 2.9), mouth: 'smile', gaze: [1, 0] };
  const sit = H2_FSIT(tc); h2GSit(P, sit); if (sit > 0.05) P.amp = 0; const pr = [H2_GPX(t), 900 - (H2_PSIT(t) > 0.5 ? 150 : 185)], head = () => ehHeadOf(P), look = (p) => lookAt(head(), p);
  P.gaze = look(pr); P.handL = [-26, -98]; P.handR = [26, -98]; const o = { vx: speed(H2_GFX, tc) };
  if (t < 102.2) { if (t > 99.9) { P.handL = [20, -84]; P.handR = [36, -86]; } }
  else if (t < 104.86) { P.talk = ehTalk(t, 102.2, 103.6, 7, 0.7); const g = Math.sin(tc * 4.3); if (t < 103.66) { P.handR = [60 + 20 * g, -170 - 20 * Math.abs(g)]; P.handL = [-40, -150]; P.gaze = [0.4, -0.8]; } else { P.tip = 0.08 + idleSway(tc, sd, 0.02, 2.9); P.handL = [20, -96]; P.handR = [40, -96]; P.gaze = look(pr); } }
  else if (t < 110.62) { const dn = flow(tc, [[104.86, 0], [105.4, 1], [106.0, 1], [106.4, 0], [106.98, 0]]); P.lid = Math.max(P.lid, 0.4 * (t < 107 ? 1 : 0)); P.mouth = 'closed'; P.drop = 10 * dn; P.gaze = t < 106.0 ? [0.3, 1] : t < 106.98 ? [-0.3, -1] : look(pr); P.lid = Math.max(P.lid, ehBlinkAt(tc, 106.05)); P.handL = [20, -86]; P.handR = [36, -86];
    if (t >= 106.98) { P.talk = ehTalk(t, 107.0, 110.5, 7, 0.55); P.handR = PERSON_HANDS.chest.R; P.brow = 0.6; }
    if (t >= 108.9) { P.wet = true; P.lid = Math.max(P.lid, 0.3); P.sq *= 1 - 0.02 * pulse(tc, 109.0, 0.3); } }
  else if (t < 114.0) { P.brow = -0.2; P.mouth = 'closed'; P.tip = -0.03; P.wet = t < 111.8;
    if (t < 112.46) { P.handR = PERSON_HANDS.pointUp.R; P.handL = [20, -86]; P.gaze = [-0.8, -0.6]; }
    else if (t < 113.02) { P.handR = [44, -205]; P.brow = 0.5; P.mouth = 'smile'; P.gaze = look(pr); }
    else { P.handR = [90, -120]; P.mouth = 'smile'; P.gaze = look([960, 900]); } }
  else if (t < 117.0) { P.gaze = t > 114.75 ? [1, -0.1] : look(pr); P.lid = Math.max(P.lid, ehBlinkAt(tc, 114.78)); P.eyes = t > 114.75 ? 'wide' : 'open'; P.mouth = t > 114.75 ? 'o' : 'smile'; P.handL = [20, -86]; P.handR = [36, -86]; }
  else if (t < 118.45) { P.dir = -1; P.sq *= 1 + 0.05 * pulse(tc, 117.0, 0.25); P.gaze = [1, -0.1]; P.handL = [-70, -140]; P.handR = [60, -140]; P.mouth = 'o'; o.vx = speed(H2_GFX, tc); }
  else { P.dir = 1; const pull = pulse(tc, 118.45, 0.4); P.tip = -0.08 * pull; P.mouth = 'closed'; P.gaze = look([H2_GPX(t), 720]); P.handL = [-30, -100]; P.handR = [30, -100];
    if (t >= 121.38 && t < 123.86) { P.gaze = t < 121.8 ? look([H2_GPX(t) + 60, 680]) : look([EH_PGARDEN.moon[0], EH_PGARDEN.moon[1] + 300]); P.eyes = 'wide'; P.lid = Math.max(P.lid, ehBlinkAt(tc, 121.82)); }
    if (t >= 122.58 && t < 123.86) P.gaze = look([1150, 740]);
    if (t >= 123.86 && t < 124.48) { P.handR = PERSON_HANDS.chest.R; P.talk = ehTalk(t, 123.86, 124.4, 3, 0.3); P.lid = 0.2; P.tip = 0.04 * pulse(tc, 124.25, 0.25); }
    if (t >= 124.48) { P.handR = PERSON_HANDS.chest.R; P.mouth = 'smile'; }
    if (t >= 125.9) { P.dir = -1; P.gaze = [1, 0]; } }
  return [P, o];
}
function h2PrGarden(t) {
  const tc = EH_T2(t), sd = 11, P = { ...walk(H2_GPX, tc, { stride: 24 }), y: 900, s: EH_PRINCESS.s, dir: t < 99.8 ? 1 : -1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.014), tip: idleSway(tc, sd, 0.022, 3.1), mouth: 'smile', gaze: [-1, 0] };
  const sit = H2_PSIT(tc); h2GSit(P, sit); if (sit > 0.05) P.amp = 0; const fz = [H2_GFX(t), 900 - (H2_FSIT(t) > 0.5 ? 150 : 185)], head = () => ehHeadOf(P), look = (p) => lookAt(head(), p);
  P.gaze = look(fz); P.handL = [-24, -90]; P.handR = [24, -90]; const o = { vx: speed(H2_GPX, tc) };
  if (t < 99.8) { P.gaze = look(fz); }
  else if (t < 102.2) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; if (t < 100.5) { P.handL = [-50, -70]; P.handR = [50, -72]; o.swing = swing(tc, 100.4, 0.2); } }
  else if (t < 104.86) { if (t < 103.66) { P.handR = PERSON_HANDS.chin.R; P.handL = PERSON_HANDS.clasp.L; P.tip = 0.04; } else { P.talk = ehTalk(t, 103.66, 104.8, 19, 0.6); P.handR = [70 + 10 * Math.sin(tc * 6), -140]; P.gaze = [0.3, -0.9]; } }
  else if (t < 114.0) { P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; P.mouth = t < 108 ? 'smile' : 'closed';
    if (t >= 109.2 && t < 110.6) { const u = flow(tc, H2_REACH); P.brow = 0.5; P.lid = Math.max(P.lid, 0.2); P.tip = 0.06 * u; P.handR = [K.lerp(30, 96, u), K.lerp(-130, -150, u)]; }
    if (t >= 111.12 && t < 112.46) P.gaze = [1, -0.6];
    if (t >= 113.02) { P.gaze = t < 113.5 ? look([960, 905]) : t < 113.7 ? look(fz) : [-0.1, 1]; P.mouth = 'smile'; P.lid = Math.max(P.lid, 0.25 * K.clamp((t - 113.7) / 0.2)); } }
  else if (t < 117.0) { P.gaze = t > 114.85 ? [-1, -0.1] : look(fz); P.lid = Math.max(P.lid, ehBlinkAt(tc, 114.86)); P.dir = t > 114.85 ? 1 : -1; P.eyes = t > 114.85 ? 'wide' : 'open'; P.mouth = t > 114.85 ? 'o' : 'smile'; P.handL = PERSON_HANDS.clasp.L; P.handR = PERSON_HANDS.clasp.R; }
  else if (t < 118.5) { P.dir = -1; P.sq *= 1 + 0.05 * pulse(tc, 117.05, 0.25); P.handL = [-60, -140]; P.handR = [56, -130]; P.mouth = 'closed'; o.vx = speed(H2_GPX, tc); if (t > 118.0) { P.handRW = [H2_GFX(t) + 30, 780]; } }
  else { P.dir = -1; P.gaze = look(fz); P.tip = 0.06; P.lid = Math.max(P.lid, 0.2); P.handRW = t < 124.9 ? [H2_GFX(t) + 34, 784] : null; P.handR = [30, -100];
    if (t >= 118.66 && t < 119.26) { P.gaze = t < 118.95 ? [1, -0.1] : look(fz); P.lid = Math.max(P.lid, ehBlinkAt(tc, 118.96)); }
    if (t >= 119.26 && t < 121.38) { P.talk = ehTalk(t, 119.26, 120.6, 19, 0.6); P.handL = [-40, -190]; }
    if (t >= 121.38 && t < 124.48) { P.talk = ehTalk(t, 121.38, 124.0, 19, 0.6); const u = flow(tc, [[121.38, 0], [121.9, 1], [124.4, 1]]), s = P.s, sh = [P.x + 31 * s, P.y - 150 * s], m = [EH_PGARDEN.moon[0], EH_PGARDEN.moon[1]], d = lookAt(sh, m); P.handLW = [K.lerp(P.x - 30, sh[0] + d[0] * 70 * s, u), K.lerp(P.y - 100 * s, sh[1] + d[1] * 70 * s, u)]; P.gaze = u > 0.6 ? d : look(fz); }
    if (t >= 124.48) { P.talk = ehTalk(t, 124.48, 125.5, 19, 0.5); P.mouth = 'smile'; const u = ehE(tc, 124.9, 0.6); P.handR = [K.lerp(60, 26, u), K.lerp(-130, -96, u)]; }
    if (t >= 125.9) { P.gaze = [1, 0]; P.eyes = 'wide'; } }
  return [P, o];
}
function h2MaidGarden(t) {
  const tc = EH_T2(t), sd = 17, P = { ...walk(H2_GMX, tc, { stride: 20 }), y: 905, s: EH_MAID.s, dir: 1, lid: ehLid(t, sd), sq: breathe(tc, sd, 0.016), tip: idleSway(tc, sd, 0.03, 2.4), mouth: 'closed', gaze: [1, 0], handR: [40, -130], handL: [10, -115] };
  let lamp = 'hand';
  if (t < 101.54) { P.gaze = [1, 0.1]; }
  else if (t < 116.56) { lamp = 'hook'; if (t < 102.0) { P.handRW = EH_PGARDEN.hook; P.gaze = lookAt(ehHeadOf(P), EH_PGARDEN.hook); lamp = 'hand'; } else { P.handL = PERSON_HANDS.folded.L; P.handR = PERSON_HANDS.folded.R; P.dir = -1; P.gaze = Math.floor(tc / 2.3) % 3 === 1 ? [1, 0.1] : [-1, -0.2]; P.lid = Math.max(P.lid, ehBlinkAt(tc, 104.0)); }
    if (t >= 113.3 && t < 114.0) { P.gaze = [1, 0.1]; P.mouth = 'smile'; P.lid = 0.3; }
    if (t >= 114.0) { P.sq *= 1 - 0.03 * pulse(tc, 114.0, 0.4); if (t > 114.4) { P.dir = 1; P.gaze = [1, -0.1]; P.handR = PERSON_HANDS.cupEar.R; P.eyes = 'wide'; P.tip = -0.04; } } }
  else if (t < 117.3) { P.dir = 1; P.handRW = t < 116.75 ? EH_PGARDEN.hook : null; P.handR = [40, -130]; P.handL = [-60 + 24 * Math.sin(tc * 26), -190]; P.eyes = 'wide'; P.mouth = 'open'; P.gaze = [1, 0]; }
  else if (t < 125.58) { P.dir = -1; P.handR = [40, -130]; if (t > 118.3) { P.dir = 1; P.gaze = [1, -0.1]; P.drop = 10; P.tip = 0.08; P.eyes = 'wide'; } }
  else { P.dir = 1; P.handR = [-20, -64]; P.handLW = t > 126.0 ? [H2_GFX(t) - 20, 800] : null; P.handL = [60, -140]; P.eyes = 'wide'; P.mouth = 'o'; P.gaze = [1, 0]; }
  return [P, lamp];
}
const H2_GUARDX = H2_F([[115.4, 1060], [117.5, 1180], [125.0, 1400], [125.6, 1440], [126.0, 1430], [126.7, 1370]]);
function h2GuardsGarden(t) {
  if (t < 115.4) return []; const tc = EH_T2(t), xa = H2_GUARDX, xb = (u) => xa(u) - 110;
  const front = (x) => t >= 125.58 && x > 1385 && x < 1500 || t >= 126.0, mk = (D, xf, seed, ph) => { const w = walk(xf, tc, { stride: 22 }), x = w.x, f = front(x), sc = f ? 0.84 : 0.84;
    return { ...w, ph: w.ph + ph, y: (f ? K.lerp(820, 868, ehE(t, 125.6, 0.9)) : 806) - Math.abs(Math.sin(w.ph + ph)) * 5 * w.amp, s: D.s * sc, dir: t < 125.6 ? 1 : -1, lid: ehLid(t, seed), sq: breathe(tc, seed, 0.012), tip: idleSway(tc, seed, 0.02, 2.7), gaze: t > 125.6 ? [1, -0.1] : t > 120 && t < 121 ? [-1, 0] : [1, 0], mouth: 'closed', handR: [56, -160], handL: [-30, -100], front: f }; };
  const A = mk(EH_GUARD_A, xa, 51, 0), B = mk(EH_GUARD_B, xb, 53, Math.PI); A.torch = true; B.spear = true; B.gaze = t > 125.9 ? [-1, 0.1] : B.gaze; return [[EH_GUARD_A, A], [EH_GUARD_B, B]];
}
function h2GardenWorld(ctx, t, cam) {
  const tc = EH_T2(t), t3 = EH_T3(t), G = h2GuardsGarden(t), [fz, fo] = h2FzGarden(t), [pr, po] = h2PrGarden(t), [md, lampMode] = h2MaidGarden(t);
  princessGarden(ctx, t, cam, { path: flow(t, [[122.58, 0], [123.6, 1]]), lamp: lampMode === 'hook' ? [EH_PGARDEN.hook[0], EH_PGARDEN.hook[1]] : null, guards: (c) => { for (const [D, P] of G) if (!P.front) h2Guard(c, D, P, t); } });
  for (const [D, P] of G) if (P.front) h2Guard(ctx, D, P, t);
  const lampW = lampMode === 'hand' ? (() => { const h = md.handRW || ehHandW(md, md.handR); return [h[0], h[1] - 8]; })() : [EH_PGARDEN.hook[0], EH_PGARDEN.hook[1]];
  if (t < 125.58) lampGlow(ctx, lampW[0], 912, 300, 0.8);
  const rim = (x) => ({ rim: Math.abs(lampW[0] - x) < 420 && t < 125.58 ? '#ffd27a' : '#bfd8ff', light: Math.abs(lampW[0] - x) < 420 && t < 125.58 ? [Math.sign(lampW[0] - x) || 1, -0.4] : [1, -1], rimW: 2.5 });
  const rows = [];
  rows.push([fz.y + 1, () => { h2Shadow(ctx, fz.x, fz.y, 90 * fz.s); castFinish(ctx, fz.x, fz.y + 10, 300, 320, (c) => { ehCapeStand(c, fz, tc, { vx: fo.vx || 0, swing: swing(tc, 117.0, 0.3) + swing(tc, 118.45, 0.4) }); person(c, ehDressP(EH_FIRUZ, fz)); }, rim(fz.x)); }]);
  rows.push([pr.y + 2, () => { h2Shadow(ctx, pr.x, pr.y, 84 * pr.s); castFinish(ctx, pr.x, pr.y + 10, 300, 320, (c) => { ehVeilRibbon(c, pr, tc, { vx: po.vx || 0, swing: po.swing || 0 }); person(c, ehDressP(EH_PRINCESS, pr)); }, rim(pr.x)); }]);
  rows.push([md.y, () => { h2Shadow(ctx, md.x, md.y, 80 * md.s); person(ctx, ehDressP(EH_MAID, md)); if (lampMode === 'hand') oilLamp(ctx, lampW[0], lampW[1], t3, { s: 0.95, swing: t > 116.56 && t < 118.4 ? 0.4 * Math.sin(tc * 14) : 0.05 * Math.sin(tc * 2), lit: t > 125.58 ? 0.3 : 1 }); }]);
  rows.sort((a, b) => a[0] - b[0]).forEach((r) => r[1]());
  // the star glint at her feet where the arc comes back
  if (t > 113.7 && t < 114.6) ehGlint(ctx, 940, 905, 30, (t - 113.7) / 0.9);
  princessGardenFront(ctx, t);
}
const H2_GCAM = [[98.35, { x: 760, y: 376, zoom: 0.72 }], [98.84, { x: 760, y: 376, zoom: 0.72 }], [102.2, { x: 860, y: 547, zoom: 0.9 }], [104.86, { x: 870, y: 560, zoom: 0.92 }], [105.6, { x: 900, y: 600, zoom: 1.0 }], [110.9, { x: 900, y: 600, zoom: 1.0 }],
  [111.3, { x: 750, y: 450, zoom: 1.0 }], [112.4, { x: 750, y: 450, zoom: 1.0 }], [113.0, { x: 900, y: 600, zoom: 1.0 }], [114.75, { x: 900, y: 600, zoom: 1.0 }], [115.15, { x: 1044, y: 600, zoom: 0.9 }], [116.4, { x: 1044, y: 600, zoom: 0.9 }],
  [116.8, { x: 900, y: 580, zoom: 0.9 }], [117.1, { x: 880, y: 580, zoom: 0.9 }], [118.6, { x: 556, y: 560, zoom: 0.9 }], [121.0, { x: 556, y: 560, zoom: 0.9 }], [122.4, { x: 770, y: 351, zoom: 0.7 }], [126.7, { x: 770, y: 351, zoom: 0.7 }]];
const H2_GPUF = [[101.5, 1], [102.4, 1.5], [111.0, 1.5], [111.5, 1], [112.6, 1], [113.1, 1.5], [114.7, 1.5], [115.1, 1], [117.4, 1], [118.3, 1.5], [121.38, 1.5], [124.48, 1.5], [125.1, 1.5], [125.8, 1]];
const H2_GPUX = [[101.5, 905], [114.7, 905], [117.4, 700], [118.3, 330], [126.7, 300]];
function h2GardenCam(t) { const c = h2Push(K.camAt(H2_GCAM, t), t, H2_GPUF, H2_GPUX, 900), z = c.zoom; return { x: K.clamp(c.x, 500 / z, EH_PGARDEN.w - 500 / z), y: K.clamp(c.y, EH_PGARDEN.top + 615 / z, 1230 - 615 / z), zoom: z }; }
