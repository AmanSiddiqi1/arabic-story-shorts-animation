// ===== ALI-04 shots S16-S18 (117.8 - 140.01 s): over the wall, UH OH., helped out, the lamp lit, to the judge, the leader on the roof =====

// ---------- S16 117.8-126.4: the bolt, the crate, the cloak left behind, the climb, the eye-lock, gone; five heads; UH OH. ----------
const A4_L16_X = (u) => kfn(u, [[117.8, 1780], [118.5, 1690], [119.0, 1712]]);
function a4Lead16(t) {   // {P, lift (above the ground y 918), disguised}
  const tc = AB_T2(t), P = { x: A4_L16_X(tc), y: 918, dir: 1, lid: 0.2, tip: 0, sq: 1, gaze: [1, -0.3], mouth: 'frown', brow: 0.85, handL: [-40, -120], handR: [40, -120] };
  let lift = 0;
  if (tc < 118.5) { Object.assign(P, walk(A4_L16_X, tc, { stride: 30 })); P.dir = -1; P.tip = -0.1; P.handL = [-50, -140]; P.handR = [50, -130]; P.gaze = [1, -0.6]; P.dir = -1; }
  else if (tc < 119.0) { const u = beatIn(tc, 118.55, 118.9); P.dir = 1; lift = 98 * Math.sin(Math.PI * Math.min(1, u)) * (u < 1 ? 1 : 0) + (u >= 0.6 ? 98 * beatIn(u, 0.6, 1) : 0); lift = u < 1 ? Math.max(lift, 98 * u) + 60 * Math.sin(Math.PI * u) : 98; P.sq = tc < 118.55 ? anticipate(tc, 118.4, 0.15, 0.1) : 1; P.handL = [-30, -200]; P.handR = [30, -210]; }
  else if (tc < 119.72) { lift = 98; P.sq = landSquash(tc, 119.0, 0.14); P.handLW = [1690, 700]; P.handRW = [1740, 690]; P.gaze = [-1, 0]; P.look = -0.6; }
  else if (tc < 120.46) { const n = Math.min(3, Math.floor((tc - 119.72) / 0.18)), base = 98 + 82 * n + 82 * beatIn((tc - 119.72) % 0.18, 0.06, 0.16); lift = Math.min(358, base); P.handLW = [1690, 918 - lift - 250 + (n % 2) * 40]; P.handRW = [1742, 918 - lift - 210 - (n % 2) * 40]; P.amp = 0.5; P.ph = n * 1.6; P.gaze = [0, -1]; }
  else if (tc < 121.44) { lift = 358; P.x = 1712; P.dir = -1; P.gaze = [-1, 0.6]; P.mouth = 'closed'; P.lid = 0.3; P.handL = [-40, -100]; P.handR = [40, -100]; }
  else { const u = beatIn(tc, 121.44, 121.9); lift = 358 + 30 * Math.sin(Math.PI * u) - 320 * u * u; P.x = 1712 + 60 * u; P.dir = 1; P.handL = [-50, -200]; P.handR = [50, -200]; }
  return { P, lift, disguised: tc < 119.2 };
}
function a4S16Crowd(t, list, o = {}) {   // the keepers around the jars after they step back (S16-S17)
  const tc = AB_T2(t);
  list.push({ y: 945, f: (ctx) => apprentice(ctx, t, { x: 860, y: 945, dir: 1, lid: abLid(t, 411), gaze: [1, -0.2], mouth: 'smile', handL: [40, -150], handR: [24, -110] }, A4_N, { noCap: true, pan: true, panHand: 0, panRot: -1.6, shc: A4_NSH }) });
  if (!o.noBaker) list.push({ y: 950, f: (ctx) => { const B = { x: 1060, y: 950, dir: -1, lid: abLid(t, 421), tip: idleSway(tc, 422, 0.02, 2.4), gaze: [-1, -0.3], mouth: 'smile', handL: [-30, -100], handR: [40, -150] };
    if (tc > 125.44 && tc < 126.4) { B.handRW = [1010, CY.rimY - 40 - 40 * beatIn(tc, 125.8, 126.0)]; B.handL = [-20, -180 + 10 * Math.sin(tc * 18)]; B.mouth = 'closed'; B.brow = 0.6; }
    baker(ctx, t, B, A4_N, { pin: tc < 125.44, shc: A4_NSH }); if (tc > 125.8 && tc < 126.4) celShade(ctx, ell(1010, CY.rimY - 60, 32, 10, 16), '#a8643a', '#6a3a1e', { off: 4, lw: 2.5 }); } });
  list.push({ y: 935, f: (ctx) => neighbourNight(ctx, t, { x: 1180, y: 935, dir: -1, lid: abLid(t, 431), gaze: [-1, -0.2], tip: idleSway(tc, 432, 0.02, 2.2), handR: [30, -170], handL: [24, -120], mouth: 'smile' }, A4_N, { broom: -40, lift: 0.5, shc: A4_NSH }) });
  [[0, 1300, -1], [4, 1400, -1], [2, 960, 1]].forEach(([k, x, d]) => list.push({ y: 955, f: (ctx) => guard(ctx, t, k, { x, y: 958, dir: d, lid: abLid(t, 441 + k), gaze: [d, -0.1], tip: 0.04 + idleSway(tc, 445 + k, 0.02, 2.4) }, A4_N, { spear: d * (1.25 + 0.15 * beatIn(tc, 124.48, 124.9)), shc: A4_NSH }) }));
}
function a4S16World(ctx, t, cam) {
  const tc = AB_T2(t), { P, lift, disguised } = a4Lead16(t);
  a4Yard(ctx, t, cam, { moon: A4_MOON.watch, G: { open: 0.9, lit: 1 }, gwin: { sh: 0, slit: 1, lit: 0.8 }, kwin: { lit: 1 }, bwin: 1, lan: 1 });
  for (const [x, y] of [[1560, 905], [1000, 930], [720, 905]]) darkLantern(ctx, x, y - 70, 0.9, { open: 1, t });
  a4Cat(ctx, t, { x: 1560, y: 548, dir: 1, sit: tc > 121.44 && tc < 122.0 ? 0 : 1, arch: tc > 121.44 && tc < 122.0 ? 1 : 0, mouth: tc > 121.44 && tc < 122.0 ? 'open' : 'closed', gaze: [1, -0.2] });
  const heads = tc >= A4_HEADS_T ? (i) => { if (i > 4) return null; const r = a4Step(tc, A4_HEADS_T + 0.15 * i, 0.3, 3), duck = i === 1 && tc > 125.44 && tc < 125.8 ? 1 : 0;
    if (i === 1 && tc > 125.44 && tc < 125.8) return null; const look = tc > 123.84 ? (Math.floor((tc - 123.84 - 0.08 * i) / 0.3) % 2 ? 1 : -1) : 0;
    return { rise: r * (1 - duck), P: { lid: i === 3 && tc < 124.2 ? 1 : abLid(t, 450 + i), gaze: [look, 0], look: look * 0.6, mouth: tc > 124.48 ? 'o' : 'closed', eyes: tc > 124.0 ? 'wide' : 'open', handL: tc > 124.6 ? [-40, -220] : [-14, -110], handR: tc > 124.6 ? [40, -224] : [14, -112] } }; } : null;
  a4Jars(ctx, t, cam, { shc: A4_NSH, heads });
  if (tc >= 999) { const list = []; a4S16Crowd(t, list); list.push({ y: 960, f: (c) => morgiana(c, t, { x: 1500, y: 960, dir: -1, lid: abLid(t, 461), gaze: [-1, 0], mouth: 'smile', handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R }, A4_N, { shc: A4_NSH }) }); for (const k of abByY(list)) k.f(ctx); }
  else {
    // the captain with the cloak and the turban; Morgiana pointing; two guards running to the wall
    const C = { x: kfn(tc, [[117.8, 1600], [119.0, 1660]]), y: 955, dir: 1, lid: abLid(t, 471), gaze: [1, -0.4], mouth: tc > 119.2 ? 'o' : 'frown', brow: 0.8, handL: [60, -150], handR: [70, -170] };
    if (tc > 119.2) { C.eyes = 'wide'; C.handL = [40, -120]; C.handR = [50, -130]; C.gaze = [0, 0.5]; }
    guard(ctx, t, 3, C, A4_N, { lantern: tc < 119.04 ? { open: 1 } : null, shc: A4_NSH });
    if (tc > 119.04) { const [hx, hy] = a2Hand(C, 1, { s: 1.06, age: 0.55 }); celShade(ctx, [[hx - 20, hy - 10], [hx + 24, hy - 14], [hx + 40, hy + 90], [hx - 30, hy + 96]], '#7a4a2a', '#5a3218', { off: 6, lw: 2.5 }); seg(ctx, hx + 30, hy + 80, hx + 34, hy + 96, 6, '#c8203f', 0);
      const tu = beatIn(tc, 119.1, 119.7); celShade(ctx, ell(1690 + 90 * tu, 950 - 40 * Math.sin(Math.PI * tu), 28, 20, 16), '#f6efe0', '#cfc4ae', { off: 6, lw: 2.5 }); }
    const M = { x: 1450, y: 960, dir: 1, lid: abLid(t, 481), gaze: tc > 120.46 ? [1, -1] : [1, -0.4], mouth: 'closed', brow: 0.6, handL: [-20, -110], handR: tc > 120.46 ? [70, -230] : [20, -112], tip: idleSway(tc, 482, 0.02, 2.4) };
    morgiana(ctx, t, M, A4_N, { kick: 0.3 * osc(tc, 1.4), shc: A4_NSH });
    if (tc > 121.44) [[0, 1600], [4, 1760]].forEach(([k, x]) => guard(ctx, t, k, { x: kfn(tc, [[121.44, x - 200], [121.9, x]]), y: 925, dir: 1, ...walk((u) => kfn(u, [[121.44, x - 200], [121.9, x]]), tc, { stride: 26 }), handR: [40, -230], handL: [-30, -150], gaze: [1, -1] }, A4_N, { shc: A4_NSH }));
    // the leader (or the merchant until the cloak comes off); over the wall he is clipped behind the coping
    const Q = { ...P, y: 918 - lift }, sh = Math.min(lift, 98);
    a3Shadow(ctx, P.x, 918 - sh, 130, lift - sh, A4_NSH);
    const draw = (c) => { if (disguised) oilMerchant(c, t, Q, A4_N, { shadow: false, kick: 0.6 }); else { a2Lead(c, t, { ...Q, fin: tc > 120.4 ? A3_NRIM : undefined }, A4_N, { shadow: false, stream: tc < 119.7 ? 1 : 0, kick: tc < 119.7 ? swing(t, 119.2, 1, 1.5, 2) : 0.2 });
      if (tc > 120.46 && tc < 121.44) { const [rx, ry] = a2Hand(Q, 1, A2_LEAD); silverRing(c, rx, ry - 3, 5, { glint: (t - 120.5) % 1 }); } } };
    if (tc > 121.44) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 2200, CY.wall.top - 14); ctx.clip(); draw(ctx); ctx.restore(); } else draw(ctx);
    if (tc > 121.44 && tc < 122.0) { const u = idleSway(tc, 491, 1, 0.4); ctx.save(); ctx.translate(1800, 480); ctx.rotate(0.2 * u); abBlob(ctx, 0, 0, 60, 14, '#4a9a7a', '#2e6a5a', { lw: 2 }); ctx.restore(); }
  }
  cyFig(ctx, t, A4_N);
}
function a4S16Over(ctx, t, cam, S) {
  if (t > 122.04 && t < 122.2) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, n: 30, alpha: 0.6 });
  if (t > 124.4 && t < 125.8) { const [x, y] = abP(1120, CY.rimY - 100, cam); a4Say(ctx, S, [[124.48, 'UH OH.']], t, x + 80, y - 150, [x + 6, y - 20], { size: 46, gone: 125.4 }); }
}
AB_SHOTS.push({ a: 117.8, b: 122.04, ww: 2200, cam: a3Cam([[117.8, { x: 1500, y: 615, zoom: 1 }], [119.7, { x: 1700, y: 615, zoom: 1 }], [121.4, { x: 1700, y: 560, zoom: 1.1 }], [122.04, { x: 1690, y: 560, zoom: 1.1 }]]), world: a4S16World, over: a4S16Over });
// ---------- S16b-S17 122.04-129.5 (v2, review 1 note 1): the whole row framed and clear; neighbours left of jar 1, Morgiana and
// Ali Baba right of jar 6, a guard half behind each end jar (spear upright); five heads, UH OH., then one man out per beat with the count ----------
const A4_OUTL = [126.4, 127.0, 127.5, 128.0, 128.5];   // man i lands in front of his jar (counter ticks)
const A4_DUCK = [125.44, 125.8];                       // man 0 ducks and pulls his lid; the baker lifts it off again (125.64)
function a4CapMan(ctx, t, i, phase) {   // phase 'clip' (rising out, clipped to the rim) or 'free' (falling / landed)
  const tc = AB_T2(t), J = CY_JARS[i], L = A4_OUTL[i], tA = L - 0.6, tB = L - 0.3, rim = CY.rimY, d = i < 2 ? -1 : i > 2 ? 1 : (i % 2 ? -1 : 1);
  const P = { x: J.x, s: 0.9, dir: d, lid: abLid(t, 500 + i), gaze: [d * 0.4, 0.2], mouth: 'o', eyes: 'wide', handL: [-40, -220], handR: [40, -224], tip: 0 };
  if (tc < tB) { if (phase !== 'clip') return; const u = beatIn(tc, tA, tB); P.y = rim + 133 * (1 - u) + 4; P.handL = [-50, -150 + 30 * u]; P.handR = [50, -150 + 30 * u]; P.tip = 0.06 * Math.sin(u * 9);
    ctx.save(); ctx.beginPath(); ctx.rect(J.x - 160, 0, 320, rim + 3); ctx.clip(); abMan(ctx, i, P, A4_N); ctx.restore(); return; }
  if (phase !== 'free') return;
  const u = beatIn(tc, tB, L); P.y = K.lerp(rim + 4, 925, u * u) - 50 * Math.sin(Math.PI * u); P.x = J.x + 8 * d * u;
  if (tc < L) { P.handL = [-60, -200]; P.handR = [60, -205]; P.sit = 0.3 * u; P.seat = 'floor'; }
  else { P.sit = 0.45; P.seat = 'floor'; P.sq = landSquash(tc, L, 0.18) * breathe(tc, 505 + i, 0.015); P.tip = tremble(tc, 0.015, 6) + idleSway(tc, 510 + i, 0.02, 2); P.mouth = i === 1 ? 'frown' : 'closed'; P.gaze = [0, 0.2]; P.lid = Math.max(P.lid, 0.25);
    if (tc > 128.6) { P.gaze = [1, -0.1]; } }
  a3Shadow(ctx, P.x, 925, 90, Math.max(0, 925 - P.y), A4_NSH); abMan(ctx, i, P, A4_N); }
function a4CapWorld(ctx, t, cam) {
  const tc = AB_T2(t);
  a4Yard(ctx, t, cam, { moon: A4_MOON.watch, G: { open: 0.9, lit: 1 }, gwin: { sh: 0, slit: 1, lit: 0.8 }, kwin: { lit: 1 }, bwin: 1, lan: 1 });
  for (const [x, y] of [[1600, 905], [760, 905]]) darkLantern(ctx, x, y - 70, 0.9, { open: 1, t });
  a4Cat(ctx, t, { x: 1560, y: 548, dir: -1, sit: 1, gaze: [-1, 0.4] });
  // a guard half behind each end jar, spear upright (never across a face)
  [[2, 848, 1], [4, 1508, -1]].forEach(([k, x, d]) => guard(ctx, t, k, { x, y: 880, dir: d, lid: abLid(t, 441 + k), gaze: [d, -0.1], tip: idleSway(tc, 445 + k, 0.015, 2.4) }, A4_N, { spear: 0.06 * d + 0.03 * pulse(tc, 124.48, 0.4) * d, shc: A4_NSH }));
  const heads = (i) => { if (i > 4 || tc < A4_HEADS_T || tc >= A4_OUTL[i] - 0.6) return null; if (i === 0 && tc > A4_DUCK[0] && tc < A4_DUCK[1]) return null;
    const r = a4Step(tc, A4_HEADS_T + 0.15 * i, 0.3, 3), look = tc < 123.84 ? 0 : tc < 124.2 ? (Math.floor((tc - 123.84 - 0.06 * i) / 0.18) % 2 ? 1 : -1) : (i < 2.5 ? -1 : 1);
    return { rise: i === 0 && tc >= A4_DUCK[1] ? Math.max(0.6, beatIn(tc, A4_DUCK[1], A4_DUCK[1] + 0.2)) : r, P: { lid: i === 3 && tc < 123.4 ? 1 : abLid(t, 450 + i), gaze: [look, tc > 124.2 ? -1 : 0], look: look * 0.6, mouth: tc > 124.48 ? 'o' : 'closed', eyes: tc > 123.84 ? 'wide' : 'open',
      handL: r > 0.6 ? [-46, -214] : [-14, -110], handR: r > 0.6 ? [46, -218] : [14, -112] } }; };
  a4Jars(ctx, t, cam, { shc: A4_NSH, heads, st: (i) => { const o = {}; if (i < 5 && tc >= A4_HEADS_T) o.noLid = true; if (i === 0 && tc > A4_DUCK[0] && tc < A4_DUCK[1] + 0.05) { o.noLid = false; o.lid = 0; }
    if (i === 5 && tc > 128.84) o.rot = 0.16 * beatIn(tc, 128.84, 129.05) * (1 - beatIn(tc, 129.3, 129.5)); return o; } });
  for (let i = 0; i < 5; i++) a4CapMan(ctx, t, i, 'clip');
  const list = [];
  // neighbours, a loose group left of jar 1 (two depth rows)
  list.push({ y: 925, f: (c) => neighbourNight(c, t, { x: 700, y: 925, dir: 1, lid: abLid(t, 431), gaze: [1, -0.2], tip: idleSway(tc, 432, 0.02, 2.2), handR: [30, -170], handL: [24, -120], mouth: tc > 126.4 ? 'smile' : 'closed' }, A4_N, { broom: 40, lift: 0.5, shc: A4_NSH }) });
  list.push({ y: 975, f: (c) => apprentice(c, t, { x: 742, y: 975, dir: 1, lid: abLid(t, 411), gaze: [1, -0.4], mouth: 'smile', handL: [40, -150], handR: [24, -110], tip: idleSway(tc, 412, 0.03, 1.8) }, A4_N, { noCap: true, pan: true, panHand: 0, panRot: -1.6, shc: A4_NSH }) });
  list.push({ y: 945, f: (c) => { const B = { x: 800, y: 945, dir: 1, lid: abLid(t, 421), tip: idleSway(tc, 422, 0.02, 2.4), gaze: [1, -0.3], mouth: 'smile', handL: [-30, -100], handR: [40, -150] };
    const lift = beatIn(tc, 125.64, 125.84); if (tc > 125.5 && tc < 126.1) { B.handRW = [880, CY.rimY - 20 - 40 * lift]; B.mouth = 'closed'; B.brow = 0.6; B.tip = 0.08; }
    baker(c, t, B, A4_N, { pin: tc < 125.5 || tc > 126.1, shc: A4_NSH });
    if (tc > 125.64 && tc < 126.1) celShade(c, K.rectPts(880 - 35, CY.rimY - 32 - 40 * lift, 70, 13), '#a8643a', '#6a3a1e', { off: 4, lw: 2.5 }); } });
  // Morgiana alone at the oil jar (jar 6), Ali Baba sleepy beside her, the captain behind them with his lantern, counting
  const M = { x: 1562, y: 935, dir: -1, lid: abLid(t, 531), gaze: [-1, 0.2], mouth: 'smile', handL: [30, -140], handR: [40, -150], tip: idleSway(tc, 532, 0.02, 2.2) };
  const lit = beatIn(tc, 129.12, 129.25);
  if (tc > 128.7) { M.handLW = [1500, 640 + 30 * (1 - beatIn(tc, 128.7, 128.9))]; M.handRW = [1512, 760]; M.gaze = [-1, -0.5]; M.tip = -0.05; }
  if (tc > 129.3) { M.handLW = null; M.handL = [30, -140]; M.gaze = [-1, 0.4]; M.mouth = 'smile'; }
  list.push({ y: 935, f: (c) => { morgiana(c, t, M, A4_N, { shc: A4_NSH, kick: 0.2 * osc(tc, 1.4) });
    const [hx, hy] = tc > 128.7 && tc < 129.6 ? [1512, 760] : a2Hand(M, 0, A3_MORG); oilLamp(c, hx, hy - 4, 1.2, { flame: lit, t, dir: -1 });
    if (tc > 128.95 && tc < 129.3) { c.save(); c.strokeStyle = '#f2b83a'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(1505, 645); c.quadraticCurveTo(1516, 700, 1508, hy - 10); c.stroke(); c.restore(); }
    if (lit > 0) { abGlow(c, hx - 10, hy - 26, 90, 0.7 * lit, '#ffcf6a'); const rr = 30 + 60 * beatIn(tc, 129.12, 129.5); c.save(); c.globalAlpha *= 1 - beatIn(tc, 129.2, 129.5); c.strokeStyle = '#ffe08a'; c.lineWidth = 5; c.beginPath(); c.arc(hx - 10, hy - 26, rr, 0, 7); c.stroke(); c.restore(); } } });
  const A = { x: 1632, y: 950, dir: -1, lid: tc < 128.9 ? 0.6 : tc < 129.15 ? 0.1 : 0.45, gaze: tc < 128.9 ? [-1, 0.3] : tc < 129.15 ? [-1, 0.1] : [-1, 0.5], eyes: tc > 128.9 && tc < 129.15 ? 'wide' : 'open', mouth: tc > 129.15 ? 'smile' : 'closed', tip: tc < 128.9 ? 0.08 : -0.04, handL: tc > 129.15 ? [-70, -180] : [-20, -110], handR: [20, -112] };
  list.push({ y: 950, f: (c) => aliNight(c, t, A, A4_N, { shc: A4_NSH }) });
  const C = { x: 1640, y: 915, dir: -1, lid: abLid(t, 521), gaze: [-1, 0.1], brow: 0.6, mouth: 'closed', handL: [30, -200], handR: [70, -150] };
  const nn = A4_OUTL.filter((L) => tc >= L).length; if (nn > 0 && tc < 128.84) { C.handR = [90, -170 - 14 * pulse(tc, A4_OUTL[nn - 1], 0.2)]; C.mouth = pulse(tc, A4_OUTL[nn - 1], 0.25) > 0.3 ? 'o' : 'closed'; }
  list.push({ y: 915, f: (c) => guard(c, t, 3, C, A4_N, { lantern: { open: 1 }, shc: A4_NSH }) });
  for (let i = 0; i < 5; i++) list.push({ y: 930 + i * 0.1, f: (c) => a4CapMan(c, t, i, 'free') });
  for (const k of abByY(list)) k.f(ctx);
  cyFig(ctx, t, A4_N);
}
function a4CapOver(ctx, t, cam, S) {
  if (t > 122.04 && t < 122.3) abSpeed(ctx, [0, 0, 1000, 1230], t, { dir: -1, n: 30, alpha: 0.6 });
  if (t > 124.4 && t < 125.8) { const [x, y] = abP(1120, CY.rimY - 120, cam); a4Say(ctx, S, [[124.48, 'UH OH.']], t, x + 80, y - 170, [x + 6, y - 20], { size: 46, gone: 125.4 }); }
  const n = A4_OUTL.filter((L) => t >= L).length;
  if (n > 0 && t < 129.5) { const [x, y] = abP(1178, 330, cam), pop = 1 + 0.25 * Math.exp(-(t - A4_OUTL[n - 1]) * 10); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((t - 129.3) / 0.2); ctx.translate(x, y); ctx.scale(pop, pop); S.counter(ctx, n, 0, 0, 1, { size: 110 }); ctx.restore(); }
}
AB_SHOTS.push({ a: 122.04, b: 129.5, ww: 2200, cam: a3Cam([[122.04, { x: 1500, y: 600, zoom: 1.05 }], [122.4, { x: 1172, y: 615, zoom: 1 }], [129.5, { x: 1176, y: 615, zoom: 1 }]]), world: a4CapWorld, over: a4CapOver });

// ---------- S18 129.5-140.01: the procession to the judge, the leader on the roof, I WILL RETURN., TO BE CONTINUED... ----------
const A4_PRO_X = (u) => K.lerp(820, 820 - 65 * (139.9 - 129.5), K.clamp((u - 129.5) / (139.9 - 129.5)));   // the captain's x (v2: slower, still in frame at 139.5)
const A4_PRO = [['c', 0], [0, 105], [1, 210], [2, 315], [3, 420], [4, 525], ['g0', 630], ['g1', 735]];
const A4_RX = (u) => kfn(u, [[131.96, 380], [134.88, 380], [135.5, 160]]);
function a4S18World(ctx, t, cam) {
  const tc = AB_T2(t);
  a3Street(ctx, t, cam, { m: 'night', lan: 1, washing: null, marks: { glow: 0.4 }, gate: 0.6, doors: [{ i: 3, open: 0.5, lit: 1 }, { i: 2, open: tc < 130.2 ? 0.6 : 0.6, lit: 1 }],
    bodies: (c) => { tsMoon(c, 700, 260, 1, 60); c.save(); const g = c.createLinearGradient(0, 560, 0, 640); g.addColorStop(0, 'rgba(255,200,150,0)'); g.addColorStop(1, 'rgba(255,200,150,0.6)'); c.fillStyle = g; c.fillRect(-300, 560, 2600, 80); c.restore(); } });
  // windows lighting one by one along the street
  [[290, 420], [420, 420], [560, 400], [860, 420]].forEach(([wx, wy], i) => { const k = beatIn(tc, 130.2 + 0.4 * i, 130.4 + 0.4 * i); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#ffd98a'; ctx.fillRect(wx + 4, wy + 8, 56, 72); ctx.restore(); abGlow(ctx, wx + 32, wy + 44, 70, 0.5 * k, '#ffcf6a'); } });
  // v2 (review 1 note 2): the leader stays on the roof of house 1 to the last frame, arms on the parapet; the ring shown large; then he
  // closes his fist, follows the procession with his eyes and brings them back to Morgiana's door
  if (tc > 131.96) { const rise = beatIn(tc, 132.1, 132.7), br = breathe(tc, 590, 0.02), L = { x: 380, y: 380 + 70 * (1 - rise), dir: 1, lid: 0.3, brow: 0.8, gaze: [1, 0.8], mouth: 'closed', sq: br, tip: 0.04 + idleSway(tc, 591, 0.025, 3.1), handLW: [330, 302], handRW: [430, 300] };
    const ringUp = tc > 133.36 && tc < 136.2, fist = tc >= 136.2;
    if (ringUp || fist) { L.handRW = null; L.handR = [34, -138 + 8 * (1 - beatIn(tc, 133.36, 133.6))]; L.gaze = [0.3, 0.6]; }
    if (tc > 134.88 && tc < 136.2) { L.gaze = [1, 0.9]; L.mouth = 'frown'; }
    if (tc > 137.2) { L.gaze = tc < 138.2 ? [-1, 0.6] : [1, 0.9]; L.lid = 0.35; L.handR = [34, -124]; }
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 2000, 310); ctx.clip(); a2Lead(ctx, t, { ...L, fin: A3_NRIM }, A4_N, { shadow: false, stream: 0.6, kick: 0.25 * osc(tc, 2.2) }); ctx.restore();
    if (ringUp || fist) { const [rx, ry] = a2Hand({ ...L, handRW: null }, 1, A2_LEAD), up = beatIn(tc, 133.36, 133.6);
      if (!fist) { celShade(ctx, ell(rx, ry, 15, 12, 12), '#e8b08a', '#c08060', { off: 3, lw: 2 }); silverRing(ctx, rx, ry - 5, 12 * up, { glint: K.clamp((t - 133.5) / 0.6) }); if (tc < 134.3) abGlint(ctx, rx + 8, ry - 14, 34, K.clamp((t - 133.5) / 0.6)); }
      else { const k = 1 + 0.12 * pulse(tc, 136.2, 0.2); celShade(ctx, ell(rx, ry - 2, 18 * k, 15 * k, 14), '#e8b08a', '#c08060', { off: 4, lw: 2.5 }); seg(ctx, rx - 10, ry - 10, rx + 10, ry - 10, 3, '#a87050', 0); } }
    celShade(ctx, K.rectPts(220, 300, 300, 30), tsWall('night', '#d89a52'), abDark(tsWall('night', '#d89a52'), 0.3), { light: [1, -0.6], off: 6, lw: 3 }); }
  // Morgiana alone in her lit doorway with the lamp burning
  if (tc > 132.6) { const M = { x: 935, y: 912, dir: -1, lid: abLid(t, 551), gaze: tc > 137.2 ? [-1, -0.9] : [-1, 0.1], look: -0.3, mouth: 'closed', handL: [20, -140], handR: [20, -112], tip: idleSway(tc, 552, 0.015, 2.6) }; abGlow(ctx, 935, 800, 160, 0.35, '#ffcf6a'); morgiana(ctx, t, M, A4_N, { kick: 0.3 * osc(tc, 1.5), shc: A4_NSH }); const [hx, hy] = a2Hand(M, 0, A3_MORG); oilLamp(ctx, hx, hy - 4, 1.1, { flame: 1, t, dir: -1 }); abGlow(ctx, hx - 8, hy - 26, 60, 0.5, '#ffcf6a'); }
  a3Cat(ctx, t, { x: 700, y: 272, dir: -1, sit: 1, gaze: tc > 136.8 ? [-1, -0.7] : [-1, 0.6], ears: tc > 136.8 ? 0.9 : 0.4 });
  // the old neighbour sweeping behind them
  const ox = A4_PRO_X(tc) + 700, O = { x: ox, y: 912, dir: -1, ...walk((u) => A4_PRO_X(u) + 700, tc, { stride: 22 }), lid: abLid(t, 561), gaze: [-1, 0.3], mouth: 'smile', handL: [-40 + 20 * Math.sin(tc * 6), -110], handR: [-20 + 20 * Math.sin(tc * 6), -120] };
  neighbourNight(ctx, t, O, A4_N, { broom: -40 + 30 * Math.sin(tc * 6), shc: A4_NSH });
  // the procession (sneakChain slowed, heads down, per-man delay; fading into the arch)
  for (let k = A4_PRO.length - 1; k >= 0; k--) { const [who, gap] = A4_PRO[k], C = sneakChain((u) => A4_PRO_X(u), k, tc, { gap: 85, delay: 0.12, stride: 20, dir: -1 }), P = { y: 912, dir: -1, ...C, lid: abLid(t, 570 + k), gaze: [-1, 0.3], mouth: 'closed', tip: idleSway(tc, 580 + k, 0.03, 1.6), drop: who === 'c' ? 0 : 6 };
    if (P.x > 1500 || P.x < -100) continue;
    if (typeof who === 'number') { P.handL = [10, -110]; P.handR = [16, -108]; if (who === 4 && tc > 130.94 && tc < 131.6) { P.dir = 1; P.gaze = [1, 0]; } a3ArchFig(ctx, P.x, 912, (c) => abMan(c, who, P, A4_N)); }
    else if (who === 'c') { if (tc > 130.94 && tc < 131.9) { P.handR = [100, -170]; } a3ArchFig(ctx, P.x, 912, (c) => guard(c, t, 3, P, A4_N, { lantern: { open: 1 }, shc: A4_NSH })); }
    else { if (who === 'g0' && tc > 131.2 && tc < 131.6) P.handRW = [P.x - 90, 760]; a3ArchFig(ctx, P.x, 912, (c) => guard(c, t, who === 'g0' ? 0 : 1, P, A4_N, { spear: 'up', shc: A4_NSH })); } }
}
function a4S18Over(ctx, t, cam, S) {
  const tc = AB_T2(t);
  if (t > 130.9 && t < 132.2) { const [x, y] = abP(A4_PRO_X(t), 680, cam); a4Say(ctx, S, [[130.94, 'TO THE JUDGE!']], t, x + 120, y - 200, [x + 10, y - 30], { size: 48, gone: 131.9 }); }
  if (t > 134.0 && t < 135.6) { const [x, y] = abP(380, 280, cam), p = K.clamp((t - 134.04) / 0.25) * (1 - K.clamp((t - 135.35) / 0.25));
    thoughtCloud(ctx, x + 330, y - 60, 330, 280, t, { p, tail: [x + 40, y - 40], scale: 1.0, at: [500, 560], bg: '#ffd98a', inside: (c) => { abGlow(c, 500, 560, 160, 0.6, '#fff0c0'); morgiana(c, t, { x: 500, y: 700, s: 1, dir: -1, lid: 0.1, gaze: [-1, 0], mouth: 'closed', handL: [20, -140], handR: [20, -112] }, A4_N, { shadow: false }); } });
    a4Say(ctx, S, [[134.1, 'I WILL RETURN.']], t, x + 120, y + 170, [x + 10, y + 40], { size: 44, gone: 135.0 }); }
  if (t > 135.6) S.title(ctx, 'TO BE CONTINUED...', 500, 1110, K.clamp((t - 135.6) / 1.0), { size: 70, align: 'center' });
}
AB_SHOTS.push({ a: 129.5, b: 140.1, ww: 2000, cam: a3Cam([[129.5, { x: 820, y: 615, zoom: 1 }], [131.3, { x: 500, y: 615, zoom: 1 }], [131.9, { x: 495, y: 615, zoom: 1 }], [133.2, { x: 440, y: 520, zoom: 1.2 }], [135.6, { x: 445, y: 522, zoom: 1.2 }], [136.6, { x: 540, y: 600, zoom: 1.05 }], [140.1, { x: 545, y: 602, zoom: 1.05 }]]), world: a4S18World, over: a4S18Over });
