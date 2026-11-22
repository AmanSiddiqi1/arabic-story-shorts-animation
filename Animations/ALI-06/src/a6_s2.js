// ===== ALI-06 shots S11-S14 (70.72-89.02): justice by daylight. The glade and the rock (OPEN SESAME! for the guards), the cave pan
// (the hoard carried out with care and listed), the road to three towns, three owners get their things back in the market.
const A6_FOLK = {
  weaver: { costume: 'villageWoman', s: 0.9, age: 0.5, pal: { robe: '#2f9a8e', dot: '#1f6e66', sleeve: '#5ac0b4', hc: '#ffd36a', hd: '#c08a1a', sash: '#e8364f' } },
  potter: { costume: 'villager', s: 0.95, age: 0.55, pal: { robe: '#c86a3a', dot: '#a04a1a', sleeve: '#e88a5a', hc: '#fff1d8', band: '#3f7ad0', pants: '#efe2c4' } },
  girl: { costume: 'servant', child: true, s: 1, pal: { robe: '#ff8ab0', dot: '#d86a90', sleeve: '#ffb0c8', hc: '#ffd36a', hd: '#c8a020', pants: '#fff1d8' } },
  teller: { costume: 'ascetic', s: 0.95, age: 0.9, pal: { robe: '#7a4ac8', dot: '#5a3098', sleeve: '#9a72e0', hc: '#fffaf0', band: '#ffd36a' } },
  boy: { costume: 'servant', child: true, s: 1, pal: { robe: '#3f7ad0', dot: '#2a5aa8', sleeve: '#6a9ae8', hc: '#e8364f', hd: '#a81a2a', pants: '#efe2c4' } },
  youth: { costume: 'villager', s: 0.9, age: 0.1, pal: { robe: '#e8c040', dot: '#c8a020', sleeve: '#f0d870', hc: '#2f9a8e', band: '#fffaf0', pants: '#efe2c4' } },
};
function a6Folk(ctx, kind, P, m, o = {}) { const F = A6_FOLK[kind]; if (o.shadow !== false) a3Shadow(ctx, P.x, o.gy ?? P.y, (F.child ? 70 : 100), 0, o.shc || A6_DSH); return abPerson(ctx, { s: F.s, ...P }, m, { ...F, ...P, pal: abPal(F.pal, m) }); }
const a6B = (k) => A4_GUARDS[k];

// ---------- S11 70.72-76.28: the glade, the walk to the rock, OPEN SESAME! ----------
const A6_WALK11 = (off) => (u) => kfn(u, [[71.14, 1000 - off], [73.88, 1560 - off]]);
function a6S11World(ctx, t, cam) { const tc = AB_T2(t), m = 'morning', op = K.clamp((tc - 75.62) / 0.55), gl = K.clamp((tc - 75.5) / 0.4);
  ctx.drawImage(a2GladePlate(m), 0, 0); abGladeBack(ctx, m, t); abFlock(ctx, t, 300, 200, 90, 4, 3, 0.45);
  abRock(ctx, 1820, 900, { model: m, open: op, crack: K.clamp(op * 4), glow: gl, t });
  if (gl > 0) abGlow(ctx, 1820, 760, 420, 0.5 * gl, '#ffd36a');
  const L = [], cx = (u) => kfn(u, [[71.14, 330], [74.2, 860]]);
  L.push({ y: 902, d: () => a2MuleCart(ctx, t, 0, m, { xf: cx, moving: tc < 74.2, shc: A6_DSH }) });
  for (let k = 0; k < 4; k++) { const j = [3, 0, 1, 2][k], W = a6Walk(A6_WALK11(135 * (k + 1)), tc, 1, 18), P = { ...a5Base(t, 711 + k * 5), ...W, y: 906 + 4 * k, gaze: [1, -0.1], mouth: 'closed', handL: [-26, -104], handR: [30, -120] };
    if (tc > 72.7 && tc < 73.9) { P.gaze = [1, -0.6 + 0.2 * Math.sin(tc * 2 + k)]; P.look = 0.2; }
    const late = 75.62 + 0.15 * k; if (tc > late) { P.mouth = 'o'; P.brow = -0.6; P.lid = 0; P.tip = -0.05; P.gaze = [1, -0.3]; }
    if (j === 3) { P.handL = [-40, -150]; }
    L.push({ y: P.y, d: () => guard(ctx, t, j, P, m, { spear: 'up', shc: A6_DSH, helmetSlip: j === 1 ? K.clamp((tc - 75.9) / 0.3) : 0, kick: 0.3 * W.amp }) }); }
  const W = a6Walk(A6_WALK11(0), tc, 1, 17), A = { ...a5Base(t, 701), ...W, y: 912, mouth: 'smile', gaze: [1, 0], handL: [-26, -104], handR: [26, -104] };
  if (tc > 71.5 && tc < 72.4) { A.gaze = [-1, 0]; A.handL = [-70, -200 + 12 * Math.sin(tc * 16)]; }
  if (tc >= 73.88 && tc < 74.98) { A.handR = [96, -200]; A.gaze = [1, -0.5]; A.tip = 0.04; }
  if (tc >= 74.98) { A.handR = PERSON_HANDS.cupMouth.R; A.talk = abTalk(t, 74.98, 75.6, 61, 0.9); A.mouth = A.talk ? 'open' : 'smile'; A.gaze = [1, -0.3]; }
  if (tc > 75.9) { A.mouth = 'grin'; A.handR = [26, -104]; }
  L.push({ y: 912, d: () => a2Ali(ctx, A, m, { shc: A6_DSH }) });
  for (const q of abByY(L)) q.d();
  return { A };
}
function a6S11Over(ctx, t, cam, S) { const { A } = { A: (() => { const tc = AB_T2(t); return { ...walk(A6_WALK11(0), tc), y: 912, dir: 1 }; })() }, [ax, ay] = abP(...a2HeadPt(A, 0, 10, { s: 0.95, age: 0.25 }), cam);
  if (t > 74.9 && t < 76.2) a5Say(ctx, S, [[74.98, 'OPEN SESAME!']], t, ax - 60, ay - 250, [ax + 10, ay - 40], { size: 54, gone: 76.0 });
  if (t > 75.7 && t < 76.28) abBands(ctx, [0, 0, 1000, 1230], t - 75.7, { n: 2, w: 80, speed: 1400, alpha: 0.25, cols: ['#fff6c8', '#ffd36a'] });
}
AB_SHOTS.push({ a: 70.72, b: 76.28, ww: 2400, cam: a5Cam([[70.72, { x: 1060, y: 590, zoom: 1.15 }], [71.14, { x: 1060, y: 590, zoom: 1.15 }], [74.4, { x: 1600, y: 590, zoom: 1.15 }], [76.28, { x: 1620, y: 590, zoom: 1.15 }]]), world: a6S11World, over: a6S11Over });

// ---------- S12 76.28-80.64: the cave pan; carried out with care, listed ----------
function a6Vase(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); celShade(ctx, [[-10, -90], [10, -90], [8, -78], [26, -50], [22, -10], [12, 0], [-12, 0], [-22, -10], [-26, -50], [-8, -78]], '#3a8ae8', '#2a5ab8', { light: [-1, -1], off: 7, hi: '#9ad0ff', lw: 2.5, line: '#1a2a6a' }); seg(ctx, -20, -40, 20, -40, 4, '#ffcf3a', 0); ctx.restore(); }
function a6Goblet(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); celShade(ctx, [[-14, -34], [14, -34], [8, -16], [3, -12], [3, -4], [10, 0], [-10, 0], [-3, -4], [-3, -12], [-8, -16]], '#ffcf3a', '#c08a1a', { light: [-1, -1], off: 4, hi: '#fff3b0', lw: 2, line: '#6a4410' }); ctx.restore(); }
function a6S12World(ctx, t, cam) { const tc = AB_T2(t), m = 'cave';
  ctx.drawImage(abCavePlate(), 0, 0); ctx.drawImage(abCaveCels(), 0, 0, 1600, 1230); abCaveLive(ctx, t);
  abChest(ctx, 1330, 906, 0.6, 0.85);
  const L = [];
  // the captain with the list by the door, ticking (77.4, 78.9, 80.0)
  const C3 = { ...a5Base(t, 721), x: 380, y: 906, dir: 1, gaze: [1, 0.2], mouth: 'closed', handL: [40, -130], handR: [56, -140] }, ck = K.clamp((tc - 77.4) / 0.3) + K.clamp((tc - 78.9) / 0.3) + K.clamp((tc - 80.0) / 0.3);
  if ((tc > 77.3 && tc < 77.8) || (tc > 78.8 && tc < 79.3) || (tc > 79.9 && tc < 80.4)) C3.handR = [50, -122 + 4 * Math.sin(tc * 30)];
  L.push({ y: 906, d: () => { guard(ctx, t, 3, C3, m, { shc: A6_DSH }); const [hx, hy] = a2Hand(C3, 0, a6B(3)); listScroll(ctx, hx + 6, hy + 50, 1.0, { checks: ck }); } });
  // the tall guard carrying a chest toward the door, leaning back against its weight
  const gx = (u) => kfn(u, [[76.28, 780], [79.0, 520], [80.64, 420]], 'lin'), W0 = a6Walk(gx, tc, -1, 14), G0 = { ...a5Base(t, 731), ...W0, y: 910, tip: -0.08, gaze: [-1, 0], mouth: 'closed', brow: 0.4, handL: [40, -120], handR: [56, -122] };
  L.push({ y: 910, d: () => { guard(ctx, t, 0, G0, m, { shc: A6_DSH }); const [hx, hy] = a2Hand(G0, 1, a6B(0)); abChest(ctx, hx - 30, hy + 30, 0.42, 0); } });
  // the young guard on tiptoe with a tall vase held like a baby; the goblet: rolls, caught on his foot, flipped onto the vase
  const yx = (u) => kfn(u, [[76.28, 1000], [78.28, 960], [79.6, 900], [80.64, 870]]), W2 = a6Walk(yx, tc, -1, 10), G2 = { ...a5Base(t, 741), ...W2, y: 908, gaze: [-1, 0.3], mouth: 'closed', handL: [30, -120], handR: [40, -112], drop: -4 };
  if (tc > 78.86 && tc < 79.6) { G2.gaze = [1, 0.8]; G2.mouth = 'o'; }
  L.push({ y: 908, d: () => { guard(ctx, t, 2, G2, m, { shc: A6_DSH }); const [hx, hy] = a2Hand(G2, 1, a6B(2)); a6Vase(ctx, hx - 10, hy + 40, 1, -0.2);
    let gxx, gyy, gr = 0; if (tc < 78.86) { gxx = 1080; gyy = 860; } else if (tc < 79.2) { const u = beatIn(tc, 78.86, 79.2); gxx = K.lerp(1080, G2.x - 10, u); gyy = K.lerp(860, 906, u * u); gr = 6 * u; } else if (tc < 79.6) { const u = beatIn(tc, 79.2, 79.6); gxx = K.lerp(G2.x - 10, hx - 10, u); gyy = K.lerp(906, hy - 50, u) - 60 * Math.sin(Math.PI * u); gr = 6 + 6.28 * u; } else { gxx = hx - 10; gyy = hy - 50; gr = 0.2; }
    a6Goblet(ctx, gxx, gyy, 1.2, gr); } });
  // Ali Baba and the stout guard lower a bale; the coin picked up and dropped back into the chest
  const low = beatIn(tc, 79.76, 80.2), A = { ...a5Base(t, 751), x: 1150, y: 910, dir: 1, gaze: [1, 0.4], mouth: 'closed', handL: [40, -150 + 50 * low], handR: [60, -150 + 50 * low] }, G1 = { ...a5Base(t, 761), x: 1280, y: 912, dir: -1, gaze: [-1, 0.3], mouth: 'closed', handL: [40, -150 + 50 * low], handR: [60, -150 + 50 * low], sq: 1 - 0.03 * low };
  if (tc > 80.2) { A.handR = [70, -100 - 60 * beatIn(tc, 80.2, 80.4)]; A.gaze = [1, -0.2]; A.handL = [-26, -104]; }
  L.push({ y: 910, d: () => { a2Ali(ctx, A, 'afternoon', { shc: A6_DSH }); guard(ctx, t, 1, G1, m, { shc: A6_DSH }); abBale(ctx, 1215, 900 - 110 + 60 * low, '#e8364f', 0.8);
    if (tc > 80.2) { const [hx, hy] = a2Hand(A, 1, { s: 0.95, age: 0.25 }), u = beatIn(tc, 80.42, 80.62); goldCoin(ctx, K.lerp(hx, 1330, u), K.lerp(hy, 840, u) - 50 * Math.sin(Math.PI * u), 1, { spin: 0.4, glint: tc > 80.25 && tc < 80.45 ? (tc - 80.25) / 0.2 : 0 }); } } });
  for (const q of abByY(L)) q.d();
  abStalactites(ctx, cam);
}
AB_SHOTS.push({ a: 76.28, b: 80.64, ww: 1600, cam: a5Cam([[76.28, { x: 560, y: 600, zoom: 1.05 }], [80.64, { x: 1080, y: 600, zoom: 1.05 }]], 'lin'), world: a6S12World });

// ---------- S13 80.64-84.98: the road, the signpost, three far towns ----------
// the country road by day (painted once): sky, clouds, two hill bands, tree lines, the road, flowers and stones (2400 wide)
function a6RoadPlate() { return abBakeAt('a6road', 2400, 1230, (c, w) => {
  abGrad(c, 0, 0, w, 1230, [[0, '#4f94ec'], [0.35, '#9ccaf8'], [0.55, '#e8f4ff']]); for (const [x, y, s] of [[300, 160, 1], [1000, 110, 0.8], [1700, 190, 1.1], [2200, 130, 0.9]]) abCloud(c, x, y, 380 * s, 86 * s, '#ffffff', '#e0ecff', 9);
  abSun(c, 300, 200, 56, '#fff6c8', '#ffe8a0', 0.9);
  abSoftHills(c, w, 700, 90, '#9ac8a0', 3); abSoftHills(c, w, 790, 70, '#7ab870', 5); abSoftTrees(c, w, 800, 70, '#4a9a5a', 7, 26);
  abGrad(c, 0, 800, w, 430, [[0, '#a8d070'], [1, '#78b050']]); c.fillStyle = '#ecc890'; c.beginPath(); c.moveTo(0, 870); c.lineTo(w, 860); c.lineTo(w, 960); c.lineTo(0, 970); c.fill();
  abDress(c, 0, w, 975, 1215, 61, { stones: 16, tufts: 26, flowers: 18, stone: ['#e0c8a8', '#a08070'] }); abDress(c, 0, w, 810, 860, 62, { stones: 4, tufts: 18, flowers: 12, stone: ['#e0c8a8', '#a08070'] }); }); }
const A6_CART13 = (u) => kfn(u, [[80.64, 160], [84.98, 1010]], 'lin');
function a6CartLoad(c) { abChest(c, -60, -44, 0.45, 0); abBale(c, 40, -44, '#2f9a8e', 0.6); carpetRoll(c, 0, -110, 0.9, { rot: -0.05 }); seg(c, -120, -96, 110, -60, 3, '#c8a070', 0); }
function a6S13World(ctx, t, cam) { const tc = AB_T2(t), m = 'afternoon';
  ctx.drawImage(a6RoadPlate(), 0, 0); abFlock(ctx, t, 200, 220, 100, 4, 5, 0.45);
  for (const [i, x] of [[0, 520], [1, 1180], [2, 1820]]) { a2FarTown(ctx, t, x, 720, 0.42, 1); const p = K.clamp((tc - 83.76 - 0.3 * i) / 0.25); if (p > 0) { abGlow(ctx, x, 600, 70, 0.8 * p, '#ffd36a'); abGlint(ctx, x, 600, 30 * p, (tc * 1.2 + i * 0.3) % 1); } }
  // the signpost with three arms toward the towns
  seg(ctx, 700, 905, 700, 720, 12, '#8a5a32', 3); for (const [y, a] of [[740, -0.12], [775, 0.02], [810, 0.16]]) { ctx.save(); ctx.translate(700, y); ctx.rotate(a); celShade(ctx, [[0, -14], [110, -14], [130, 0], [110, 14], [0, 14]], '#e8c890', '#b8945a', { light: [-1, -1], off: 4, lw: 2.5, line: '#6a4a24' }); ctx.restore(); }
  const L = [];
  L.push({ y: 902, d: () => a2MuleCart(ctx, t, 0, m, { xf: A6_CART13, moving: true, shc: A6_DSH, inside: (c) => a6CartLoad(c) }) });
  const C3 = { ...a5Base(t, 771), ...walk((u) => A6_CART13(u) + 420, tc, { stride: 18 }), y: 912, dir: 1, gaze: [1, 0.3], mouth: tc > 81.38 && tc < 82.6 ? 'open' : 'closed', handL: [40, -140], handR: [56, -140] };
  L.push({ y: 912, d: () => { guard(ctx, t, 3, C3, m, { shc: A6_DSH, kick: 0.3 }); const [hx, hy] = a2Hand(C3, 0, a6B(3)); listScroll(ctx, hx + 6, hy + 34, 0.6, { checks: 0 }); } });
  for (const [k, off] of [[2, -190], [1, -300]]) { const P = { ...a5Base(t, 781 + k), ...walk((u) => A6_CART13(u) + off, tc, { stride: 18 }), y: 910 + k * 3, dir: 1, gaze: [1, 0], mouth: 'closed', handL: [-26, -104], handR: [30, -120] };
    if (k === 2 && tc > 81.94 && tc < 83.2) { P.handL = PERSON_HANDS.shield.L; P.gaze = [1, -0.3]; } if (k === 1 && tc > 82.1 && tc < 82.9) { P.handL = [60, -130]; P.gaze = [1, 0.4]; }
    L.push({ y: P.y, d: () => guard(ctx, t, k, P, m, { spear: 'up', shc: A6_DSH }) }); }
  const A = { ...a5Base(t, 791), x: 470, y: 914, dir: 1, gaze: [1, 0], mouth: 'smile', handL: [-26, -104], handR: tc > 80.9 && tc < 82.5 ? [60, -200 + 12 * Math.sin(tc * 15)] : [26, -104] };
  L.push({ y: 914, d: () => a2Ali(ctx, A, m, { shc: A6_DSH }) });
  for (const q of abByY(L)) q.d();
}
function a6S13Over(ctx, t, cam, S) { if (t > 83.7 && t < 85.0) { const [cx, cy] = abP(A6_CART13(t), 760, cam); [520, 1180, 1820].forEach((x, i) => { const [tx, ty] = abP(x, 600, cam); if (tx > 30 && tx < 970) a6Streak(ctx, S, [cx, cy], [tx, ty + 20], t, 83.76 + 0.3 * i, 84.6 + 0.1 * i); }); } }
AB_SHOTS.push({ a: 80.64, b: 84.98, ww: 2400, cam: a5Cam([[80.64, { x: 620, y: 600, zoom: 1.08 }], [84.98, { x: 1150, y: 600, zoom: 1.08 }]], 'lin'), world: a6S13World, over: a6S13Over });

// ---------- S14 84.98-89.02: three owners get their things back ----------
function a6S14World(ctx, t, cam) { const tc = AB_T2(t), m = 'afternoon';
  ctx.drawImage(a5MarketPlate(), 0, 0); abFlock(ctx, t, -200, 230, 120, 4, 7, 0.42); lampShop(ctx, t, { awning: 0, old: 1, board: 0, lamps: 0 });
  const L = []; L.push({ y: 900, d: () => a2MuleCart(ctx, t, 0, m, { xf: (u) => kfn(u, [[84.98, 230], [88.2, 230], [89.02, 120]]), dir: -1, moving: tc > 88.2, shc: A6_DSH, inside: (c) => { abChest(c, -40, -44, 0.45, 0); abBale(c, 50, -44, '#2f9a8e', 0.6); } }) });
  // 1: the captain and the weaver (carpet)
  const h1 = handOver(tc, 85.2, 0.6, [440, 790], [480, 800]), C3 = { ...a5Base(t, 801), x: 390, y: 912, dir: 1, gaze: [1, 0], mouth: tc < 85.6 ? 'open' : 'smile', handL: [60 + 20 * h1.giver, -130], handR: [70 + 20 * h1.giver, -126] };
  const Wv = { ...a5Base(t, 811), x: 530, y: 912, dir: -1, gaze: [-1, 0.2], mouth: 'smile', handL: [50, -126], handR: [60, -124] }; if (tc > 86.2) { Wv.handL = [24, -140]; Wv.handR = [30, -136]; Wv.mouth = 'grin'; Wv.lid = 0.5; Wv.tilt = -0.08; }
  if (tc > 88.15) { Wv.handR = [60, -200 + 10 * Math.sin(tc * 14)]; Wv.gaze = [-1, 0]; }
  L.push({ y: 912, d: () => { guard(ctx, t, 3, C3, m, { shc: A6_DSH }); a6Folk(ctx, 'weaver', Wv, m); const tk = h1.k < 0.5; const [hx, hy] = tk ? a2Hand(C3, 1, a6B(3)) : a2Hand(Wv, 1, A6_FOLK.weaver);
    carpetRoll(ctx, tc > 86.2 ? hx + 8 : hx + (tk ? 10 : -10), hy - 4 - Math.max(0, h1.dip), tc > 86.2 ? 0.7 : 0.8, { rot: tc > 86.2 ? 1.2 : 0, open: K.clamp((tc - 85.88) / 0.3) * (tc < 86.2 ? 1 : 0) }); } });
  // 2: the tall guard and the potter (the pot of savings)
  const h2 = handOver(tc, 85.9, 0.5, [690, 800], [730, 806]), G0 = { ...a5Base(t, 821), x: 660, y: 910, dir: 1, gaze: [1, 0.2], mouth: 'smile', handL: [-26, -104], handR: [60 + 20 * h2.giver, -126] };
  const Pt = { ...a5Base(t, 831), x: 780, y: 912, dir: -1, gaze: [-1, 0.2], mouth: 'o', handL: [50, -124], handR: [60, -126] }; if (tc > 86.48 && tc < 87.3) { Pt.handR = [20, -200]; Pt.handL = [-30, -150]; Pt.tilt = 0.12; Pt.mouth = 'grin'; Pt.lid = 0.4; } if (tc > 88.15) { Pt.handL = [-60, -200 + 10 * Math.sin(tc * 13)]; }
  L.push({ y: 911, d: () => { guard(ctx, t, 0, G0, m, { shc: A6_DSH }); a6Folk(ctx, 'potter', Pt, m); const tk = h2.k < 0.5; let [hx, hy] = tk ? a2Hand(G0, 1, a6B(0)) : a2Hand(Pt, 1, A6_FOLK.potter);
    coinPot(ctx, hx, hy + 30 - Math.max(0, h2.dip), 1.0, { shake: tc > 86.48 && tc < 87.3 ? 4 * Math.sin(tc * 40) : 0, glint: tc > 86.6 && tc < 87.0 ? (tc - 86.6) / 0.4 : 0 }); } });
  // 3: the young guard kneels and gives the brass horse to a little girl, who gallops it along his helmet
  const kn = beatIn(tc, 86.9, 87.2), G2 = { ...a5Base(t, 841), x: 930, y: 912, dir: 1, kneel: kn, gaze: [1, 0.2], mouth: 'smile', handL: [-26, -104], handR: [60, -110] };
  const Gl = { ...a5Base(t, 851), x: 1010, y: 914, dir: -1, gaze: [-1, 0.2], mouth: tc > 87.6 ? 'grin' : 'o', handL: [-20, -60], handR: [30, -70] };
  L.push({ y: 912, d: () => { guard(ctx, t, 2, G2, m, { spear: tc < 86.9 ? 'up' : null, shc: A6_DSH }); a6Folk(ctx, 'girl', Gl, m); const h3 = handOver(tc, 87.38, 0.4, [0, 0], [1, 1]);
    let hx, hy; if (h3.k < 0.5) [hx, hy] = a2Hand(G2, 1, a6B(2)); else if (tc < 87.9) [hx, hy] = a2Hand(Gl, 1, { s: 1, child: true }); else { const [hx0, hy0] = a2HeadPt(G2, 0, -50, a6B(2)); const u = (tc - 87.9) % 1; hx = hx0 - 40 + 80 * Math.abs(Math.sin(u * Math.PI)); hy = hy0 - 6 * Math.abs(Math.sin(u * 12)); }
    if (tc > 86.9) brassHorse(ctx, hx, hy + 8, 1.1, { dir: -1, glint: tc > 87.5 && tc < 87.9 ? (tc - 87.5) / 0.4 : 0 }); } });
  for (const q of abByY(L)) q.d();
}
function a6S14Over(ctx, t, cam, S) { [[460, 86.0], [730, 86.6], [970, 88.0]].forEach(([x, a], i) => { const [px, py] = abP(x, 600, cam); if (t > a) checkGlyph(ctx, px, Math.max(py - 140, 150), K.clamp((t - a) / 0.25), 1.1); });
  if (t > 87.02 && t < 88.0) { const [px, py] = abP(970, 600, cam); ctx.save(); ctx.globalAlpha *= 0.4 + 0.2 * Math.sin(t * 8); ctx.strokeStyle = '#3ad06a'; ctx.lineWidth = 5; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(px, Math.max(py - 140, 150), 30, 0, 7); ctx.stroke(); ctx.restore(); } }
AB_SHOTS.push({ a: 84.98, b: 89.02, ww: 2000, cam: a5Cam([[84.98, { x: 440, y: 610, zoom: 1.15 }], [88.4, { x: 790, y: 610, zoom: 1.15 }], [89.02, { x: 800, y: 600, zoom: 1.12 }]]), world: a6S14World, over: a6S14Over });
