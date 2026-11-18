// ===== AN-097 composers for Yahya's hall (S4b-S10, S15-S17) and the return to the palace (S13-S14) =====
// Yahya's hall: dais x 600..860 top 860, cushion at x 740 (sit y 882). Chests after the LATER card: al-Fadl's 230, the strongbox 400, Jaafar's 570.
const A97_CH = { A: 370, H: 520, B: 670 }, A97_CHS = 0.7;   // v2: chests moved right so Mansur and Salih stand clear of the left edge
const a97Yahya = (o) => a97Mk('yahya', { s: 1, dir: -1, mouth: 'smile', lid: 0.15, ...o });
const A97_Y_TALK = [[46.98, 48.3], [80.72, 81.4], [152.72, 155.0], [155.25, 158.3]];
const A97_GIFT = [685, 790];
const A97_JC = [786, 806];     // S8 close: the casket held at the sash (v2: below the beard)    // the receiving hands in front of the cushion

// ---------- S4b-S10: Yahya's hall by day ----------
const a97OldX = (t) => (t < 37.5 ? 630 : kfn(t, [[37.6, 630], [39.6, -60]], 'inOut'));
const a97VillX = (t) => kfn(t, [[37.5, 470], [38.5, 630]], 'inOut');
const a97S5SalX = (t) => kfn(t, [[39.3, -60], [39.8, 170], [40.9, 170], [41.9, 330], [49.3, 330], [49.9, 260]], 'inOut');
const a97S5ManX = (t) => kfn(t, [[39.3, -140], [39.8, 105], [40.86, 105], [41.8, 560], [49.4, 560], [50.0, 380]], 'inOut');
const a97TreasX = (t) => (t < 48.44 ? kfn(t, [[45.7, 1060], [46.5, 880]], 'out') : t < 49.3 ? kfn(t, [[48.44, 880], [49.2, 1120]], 'in') : kfn(t, [[49.3, 1000], [50.1, 640], [52.9, 640], [54.0, 1120]], 'inOut'));
const a97BoxX = (t) => (t < 50.1 ? a97TreasX(t) - 120 : 520);
// v2: both runners come in from the right, bow to Yahya's order and sprint out through the left arch, B 0.6 s after A
const a97RunAX = (t) => (t < 55.3 ? kfn(t, [[54.2, 1080], [54.8, 870]], 'out') : kfn(t, [[55.3, 870], [56.4, -120]], 'in'));
const a97RunBX = (t) => (t < 55.9 ? kfn(t, [[54.9, 1100], [55.45, 880]], 'out') : kfn(t, [[55.9, 880], [57.15, -120]], 'in'));
const a97RA7 = (t) => (t < 63.4 ? kfn(t, [[62.26, -90], [63.4, 300]], 'out') : kfn(t, [[64.7, 300], [65.9, -120]], 'inOut'));
const a97RB7 = (t) => (t < 64.2 ? kfn(t, [[62.9, 1090], [64.2, 740]], 'out') : 740);
const a97M7 = (t) => kfn(t, [[65.18, 210], [65.6, 260]], 'inOut');
const a97M9 = (t) => kfn(t, [[87.7, 640], [91.4, -70]], 'inOut');
const a97S9 = (t) => (t < 88.4 ? kfn(t, [[87.2, 485], [87.8, 590]], 'inOut') : kfn(t, [[88.4, 590], [91.5, -110]], 'inOut'));
const A97_FALLS9 = footfalls(a97M9, 87.7, 91.4, 24).concat(footfalls(a97S9, 88.4, 91.5, 26));
function a97SceneHallDay(t) {
  const A = [], under = [], over = [];
  // ---- Yahya ----
  let Y;
  if (t < 54.2) { Y = a97Yahya({ x: A97_CX, y: A97_CY, sit: 1, seat: 'bench' }); }
  else if (t < 60.8) { const u = a97E(t, 54.2, 0.35); Y = a97Yahya({ x: A97_CX, y: K.lerp(A97_CY, A97_DY, u), sit: 1 - u, seat: 'bench', sq: anticipate(t, 54.05, 0.15, 0.06) }); }
  else if (t < 91.62) Y = a97Yahya({ x: 830, y: A97_DY });
  else Y = a97Yahya({ x: 700, y: 900 });
  Y.sq = (Y.sq ?? 1) * breathe(t, 3, 0.01);
  Y.handR = a97Tr(t, [[35.4, 35.62, [26, -118], 0.1], [37.0, 37.5, [40, -110]], [38.4, 38.68, [26, -118], 0.1], [42.74, 43.3, PERSON_HANDS.chin.R], [43.4, 44.4, [60, -186]],
    [44.5, 44.75, [52, -150], 0.08], [44.75, 44.85, [70, -150], 0.04], [44.85, 45.05, [52, -150], 0.06], [46.98, 48.4, (tt) => a97L2([20, -130], PERSON_HANDS.armsOut.R, a97E(tt, 46.98, 0.5))],
    [54.2, 54.63, [60, -196]], [54.63, 56.5, PERSON_HANDS.pointFwd.R], [67.84, 68.8, PERSON_HANDS.folded.R], [71.4, 71.9, [36, -214]], [71.9, 73.0, [20, -128]],
    [80.72, 81.4, PERSON_HANDS.armsOut.R], [85.22, 86.2, (tt) => [60, -150 + 10 * Math.sin(tt * 16)]], [91.62, 99.26, PERSON_HANDS.chin.R], [99.26, 103.3, PERSON_HANDS.chest.R]], [40, -96]);
  Y.handL = a97Tr(t, [[44.5, 44.75, [42, -150], 0.08], [44.75, 44.85, [22, -150], 0.04], [44.85, 45.05, [42, -150], 0.06], [67.84, 68.8, PERSON_HANDS.folded.L], [71.9, 73.0, [-4, -128]]], [-36, -96]);
  // gifts reach into the world
  if (a97In(t, 35.62, 36.1)) Y.handRW = a97L2(a97Pt(Y, 40, -96), A97_GIFT, a97E(t, 35.5, 0.25));
  if (a97In(t, 38.68, 39.1)) Y.handRW = a97L2(a97Pt(Y, 40, -96), A97_GIFT, a97E(t, 38.55, 0.2));
  if (Y.handRW) Y.handR = null;
  if (a97In(t, 73.0, 79.76)) { const c = A97_JC; a97Carry(Y, c[0], c[1], 32); Y.handL = Y.handR = null; }
  if (a97In(t, 79.76, 80.72)) { const k = a97E(t, 79.9, 0.6); Y.handRW = [760 - 40 * k, 818]; Y.handLW = [795 - 40 * k, 822]; Y.handL = Y.handR = null; Y.tip = 0.12 * a97Env(t, 79.76, 80.72, 0.2); }
  // acting
  if (a97In(t, 42.74, 43.28)) { Y.tip = 0.08; Y.brow = -0.3; Y.mouth = 'closed'; Y.drop = 3 * pulse(t, 43.0, 0.3); }
  if (a97In(t, 43.28, 44.4)) { Y.tip = settleTo(t, 43.28, 0.08, 0, 0.35); Y.brow = -0.3 * (1 - a97E(t, 43.28, 0.3)); Y.lid = a97In(t, 43.95, 44.3) ? 0.9 : 0.15; }
  if (a97In(t, 54.2, 56.6)) { Y.brow = 0.3; Y.mouth = 'closed'; Y.lid = 0; }
  if (a97In(t, 67.84, 68.8)) { Y.lid = 0.2; Y.drop = 3 * (pulse(t, 67.9, 0.3) + pulse(t, 68.35, 0.3)); }
  if (a97In(t, 71.4, 73.0)) { Y.lid = 0.25; Y.brow = -0.2; }
  if (a97In(t, 85.22, 86.2)) Y.look = 0.6 * Math.sin((t - 85.22) * 14);
  if (a97In(t, 90.1, 91.62)) Y.mouth = t > 90.8 ? 'closed' : 'smile';
  if (a97In(t, 91.62, 104)) { Y.lid = 0.2; Y.mouth = 'closed'; Y.tilt = -0.05; Y.brow = -0.15; Y.bigSmile = 0.5 + 0.5 * a97E(t, 100.72, 0.5); Y.drop = 5 * pulse(t, 101.4, 0.5); Y.sq = breathe(t, 2.6, 0.02); }
  Y.talk = talk(t, A97_Y_TALK, 0.9) * 0.7;
  A.push(Y);
  // ---- the needy (S4) ----
  if (t < 39.8) {
    const O = a97Mk('oldW', { ...a97Walker(a97OldX, t, 20), y: 900, s: 0.92, dir: t < 37.5 ? 1 : -1, mouth: 'smile' });
    O.handL = a97Tr(t, [[37.12, 37.6, [6, -128]]], [44, -112]); O.handR = a97Tr(t, [[37.12, 37.6, [14, -124]]], [56, -116]);
    if (t >= 37.5) { O.handL = [8, -126]; O.handR = [16, -122]; }
    if (a97In(t, 35.9, 36.6)) { O.tip = 0.12 * pulse(t, 35.9, 0.7); O.sq = 0.96; }
    if (a97In(t, 37.12, 37.5)) { const [, lift] = hop(t, 37.15, 0.3, 0, 0, 10); O.y -= lift; O.wet = true; }
    A.push(O);
    const purseAt = t < 35.62 ? null : t < 36.05 ? a97Pt(Y, 40, -96) : a97Pt(O, 30, -114);
    if (purseAt && (t < 36.05 || true)) O.post = [(c) => a97Purse(c, purseAt[0], purseAt[1] + 18, 0.85)];
    if (t >= 35.2 && t < 35.62) Y.post = [(c) => { const p = a97Pt(Y, 26, -118); a97Purse(c, p[0], p[1] + 18, 0.85); }];
    const V = a97Mk('vill', { ...a97Walker(a97VillX, t, 24), y: 900, s: 0.95, dir: 1, mouth: 'closed' });
    V.handL = [44, -112]; V.handR = [54, -116];
    if (t >= 39.05) { V.tip = 0.2 * a97Env(t, 39.18, 39.8, 0.2); V.mouth = 'smile'; }
    if (t >= 38.5 && t < 39.0) Y.post = [(c) => { const p = Y.handRW ? Y.handRW : a97Pt(Y, 26, -118); a97Loaf(c, p[0], p[1] - 4, 0.8); }];
    if (t >= 39.0) V.post = [(c) => { const p = a97Pt(V, 50, -118); a97Loaf(c, p[0], p[1] - 4, 0.8); }];
    A.push(V);
    const hY = a97Head(Y), hO = a97Head(O), hV = a97Head(V);
    Y.gaze = t < 38.4 ? lookAt(hY, hO) : lookAt(hY, hV); O.gaze = t < 37.5 ? lookAt(hO, hY) : [-1, 0]; V.gaze = lookAt(hV, hY);
  }
  // ---- Salih and Mansur (from 39.3) ----
  let M = null, S = null;
  if (t >= 39.3 && t < 60.8) {
    S = a97SalihBase({ ...a97Walker(a97S5SalX, t, 26), dir: t < 49.3 ? 1 : a97Dir(a97S5SalX, t, 1), brow: 0.1 });
    M = a97Mk('mansur', { ...a97Walker(a97S5ManX, t, 24), y: 900, s: A97_MS, dir: 1, brow: -0.6, mouth: 'closed', wet: t > 41 });
    M.kneel = t < 49.3 ? a97E(t, 41.8, 0.5) : 1 - a97E(t, 49.3, 0.3);
    M.handR = a97Tr(t, [[39.8, 41.0, PERSON_HANDS.clasp.R], [41.9, 42.9, PERSON_HANDS.palmsUp.R], [42.9, 44.2, (tt) => a97L2(PERSON_HANDS.reachBoth.R, [96, -176], 0.5 + 0.5 * Math.sin(tt * 7))], [44.2, 49.3, PERSON_HANDS.clasp.R], [50.1, 60.8, PERSON_HANDS.clasp.R]], A97_REST.R);
    M.handL = a97Tr(t, [[39.8, 41.0, PERSON_HANDS.clasp.L], [41.9, 42.9, PERSON_HANDS.palmsUp.L], [42.9, 44.2, PERSON_HANDS.reachBoth.L], [44.2, 49.3, PERSON_HANDS.clasp.L], [50.1, 60.8, PERSON_HANDS.clasp.L]], A97_REST.L);
    if (a97In(t, 41.9, 44.2)) { M.talk = 0.45 + 0.4 * Math.abs(Math.sin(t * 9)); M.x += tremble(t, 1.5); M.brow = -0.8; }
    if (a97In(t, 48.44, 49.3)) M.brow = -0.8 + 0.5 * a97E(t, 48.44, 0.5);
    if (a97In(t, 52.26, 54.2)) { M.sq = 0.94; M.drop = 6; M.lid = 0.6; M.brow = -0.8; }
    const lean = (i) => 0.08 * a97Env(t, 50.14 + stagger(i, 0.1), 52.2, 0.2);
    M.tip = (M.tip || 0) + lean(1); S.tip = lean(2); Y.tip = (Y.tip || 0) + (t < 54.2 ? lean(0) : 0);
    if (t >= 39.8 && t < 40.86) { M.brow = -0.6; }
    A.push(S, M);
  }
  // ---- the treasurer and the strongbox (S5-S6) ----
  if (t >= 45.7 && t < 54.0 && !(t >= 49.2 && t < 49.3)) {
    const T = a97Mk('treas', { ...a97Walker(a97TreasX, t, 20), y: 900, s: 0.95, dir: t >= 48.44 && t < 49.3 ? 1 : -1, mouth: 'closed' });
    if (t >= 52.9) T.dir = 1;
    if (a97In(t, 46.5, 47.2)) T.tip = 0.15 * pulse(t, 46.5, 0.7);
    if (a97In(t, 47.8, 48.3)) T.drop = 5 * pulse(t, 47.8, 0.4);
    if (a97In(t, 49.3, 50.1)) { T.tip = 0.15; T.handRW = [a97BoxX(t) + 92, 830]; T.handLW = [a97BoxX(t) + 96, 842]; }
    if (a97In(t, 50.1, 50.6)) { T.handRW = [560, 800 - 40 * a97E(t, 50.14, 0.3)]; T.tip = 0.1; }
    if (a97In(t, 51.0, 51.45)) { T.gaze = [0, 0.05]; T.brow = -0.4; T.mouth = 'frown'; }
    T.post = [(c) => { const p = a97Pt(T, 34, -96); for (let k = 0; k < 3; k++) { const a = 0.3 + swing(t, 45.7, 0.5, 1.5, 1.5) + swing(t, 48.44, 0.6, 1.6, 1.6) + k * 0.25; seg(c, p[0], p[1], p[0] + Math.sin(a) * 18, p[1] + Math.cos(a) * 18, 4, A97_GOLD, 1.5); } }];
    A.push(T);
    if (!T.gaze) T.gaze = lookAt(a97Head(T), a97Head(Y));
  }
  if (t >= 49.3 && t < 60.8) {
    const bx = a97BoxX(t), op = t < 50.14 ? 0 : settleTo(t, 50.14, 0, 1, 0.4, 0.12);
    over.push((c) => a97Chest(c, bx, 900, 0.85, { open: op, n: 10, sqy: impactSquash(t, 50.1, 0.96) }));
    if (a97In(t, 50.76, 52.4)) { const u = (t - 50.76) / 1.64; over.push((c) => a97Moth(c, 540 + 120 * u + 30 * Math.sin(u * 14), 800 - 300 * u + 16 * Math.cos(u * 11), t, 0.9)); }
  }
  // ---- runners (S6 send-off, S7 arrival) ----
  if (t >= 54.25 && t < 58.0) {
    const RA = a97Mk('runA', { ...a97Walker(a97RunAX, t, 24), y: 912, s: 0.92, dir: -1, mouth: 'closed' });
    const RB = a97Mk('runB', { ...a97Walker(a97RunBX, t, 24), y: 904, s: 0.88, dir: -1, mouth: 'closed' });
    const hY = a97Head(Y);
    for (const [R, i, t0] of [[RA, 0, 55.3], [RB, 1, 55.9]]) { const bow = t0 - 0.45; R.handR = [48, -112];
      if (t < t0) { R.dir = -1; R.tip = 0.18 * pulse(t, bow, 0.42); R.gaze = lookAt(a97Head(R), hY); }
      else { R.handR = [36, -150]; R.handL = [-40, -96]; R.tip = 0.14; R.sq = anticipate(t, t0, 0.12, 0.08); R.gaze = [1, 0.1];
        const xx = R.x, k = K.clamp((t - t0) / 0.9); if (t < t0 + 1.0) R.pre = [(c) => { c.save(); c.globalAlpha = 0.8 * (1 - k); for (let j = 0; j < 4; j++) seg(c, xx + 70 + j * 10, 760 + j * 30, xx + 150 + j * 30, 760 + j * 30, 5, C.black, 0); c.restore(); if (t < t0 + 0.5) dustBurst(c, (i ? a97RunBX : a97RunAX)(t0) + 20, 912, t - t0, 5, 6, 12, 40, 0.5, 5 + i); }]; } }
    A.push(RA, RB);
    if (t >= 54.6) { RA.post = [(c) => { const p = a97Pt(RA, 48, -112); a97Scroll(c, p[0], p[1] - 10, 0.28, 1, { seal: true, n: 0 }); }]; }
    if (t >= 54.8) { RB.post = [(c) => { const p = a97Pt(RB, 48, -112); a97Scroll(c, p[0], p[1] - 10, 0.28, 1, { seal: true, n: 0 }); }]; }
  }
  // ---- S7: LATER, the chests arrive ----
  if (t >= 60.8 && t < 73.06) {
    const carry = (R, until, cx) => (c) => { if (t < until) a97Chest(c, cx, R.y - 40 + kick(t, A97_FALLS7, 2, 9, 8), A97_CHS * 0.92, { band: R === R7A ? A97_GREEN : C.red }); };
    const R7A = a97Mk('runA', { ...a97Walker(a97RA7, t, 22), y: 912, s: 0.92, dir: t < 64.7 ? 1 : -1, mouth: 'closed', tip: t < 63.4 ? -0.12 : 0, sq: t < 63.4 ? 0.95 : 1 });
    const R7B = a97Mk('runB', { ...a97Walker(a97RB7, t, 22), y: 905, s: 0.88, dir: -1, mouth: 'closed', tip: t < 64.2 ? -0.12 : 0, sq: t < 64.2 ? 0.95 : 1 });
    if (t < 63.4) a97Carry(R7A, R7A.x + 70, 832, 52); if (t < 64.2) a97Carry(R7B, R7B.x - 70, 838, 52);
    if (a97In(t, 64.3, 65.1)) { R7B.handR = [24, -214 + 8 * Math.sin(t * 20)]; R7B.mouth = 'o'; }
    R7A.pre = []; R7B.pre = [];
    R7A.post = [carry(R7A, 63.4, R7A.x + 70)]; R7B.post = [carry(R7B, 64.2, R7B.x - 70)];
    A.push(R7A, R7B);
  }
  if (t >= 60.8) {
    const chestOpen = (t0) => (t < t0 ? 0 : settleTo(t, t0, 0, 1, 0.3, 0.15));
    const lands = { A: 63.4, B: 64.2 }, gone = (k) => k === 'B' && t >= 88.0;
    under.push((c) => {
      for (const k of ['A', 'H', 'B']) { if (k !== 'H' && t < lands[k]) continue; if (gone(k)) continue;
        a97Chest(c, A97_CH[k], 900, k === 'H' ? 0.85 * 0.82 : A97_CHS, { band: k === 'A' ? A97_GREEN : k === 'B' ? C.red : C.yellow, open: k === 'H' ? 1 : chestOpen(k === 'A' ? 64.26 : 64.36), heap: k === 'H' ? 0 : 1, n: k === 'H' ? 10 : 0, sqy: k === 'H' ? 1 : impactSquash(t, lands[k], 0.94) });
        if (k !== 'H' && t > 64.3 && t < 72) for (let j = 0; j < 2; j++) { const tg = 64.4 + j * 0.9 + (k === 'B' ? 0.45 : 0); a97Glint(c, A97_CH[k] - 30 + j * 50, 830 - j * 12, 16, ((t - tg) % 1.8) / 0.4); } }
    });
    for (const k of ['A', 'B']) if (t >= lands[k] && t < lands[k] + 0.5) over.push((c) => dustBurst(c, A97_CH[k], 896, t - lands[k], 5, 6, 12, 40, 0.5, k === 'A' ? 3 : 4));
  }
  if (t >= 60.8 && t < 91.62) {
    const m7 = t < 79.76 ? { ...a97Walker(a97M7, t, 24), dir: 1 } : t < 87.16 ? { x: 640, ph: 0, amp: 0, dir: 1 } : { ...a97Walker(a97M9, t, 24), dir: t < 87.5 ? 1 : -1 };
    M = a97Mk('mansur', { ...m7, y: 905, s: A97_MS, brow: -0.4, mouth: 'closed' });
    const s7 = t < 79.76 ? { x: 150, ph: 0, amp: 0, dir: 1 } : t < 86.24 ? { x: 485, ph: 0, amp: 0, dir: 1 } : t < 87.16 ? { x: 485, ph: 0, amp: 0, dir: -1 } : { ...a97Walker(a97S9, t, 26), dir: t < 88.4 ? 1 : -1 };
    S = a97SalihBase({ ...s7, brow: 0.1 });
    // Mansur: awe, the hop, the sack
    if (a97In(t, 65.18, 66.6)) { M.eyes = 'wide'; M.mouth = 'o'; M.brow = -0.7; }
    if (a97In(t, 68.78, 70.0)) { M.mouth = 'open'; M.brow = -0.5; M.eyes = 'wide'; }
    if (a97In(t, 68.78, 69.9)) { M.sq = t < 69.0 ? anticipate(t, 68.78, 0.22, 0.12) : landSquash(t, 69.5, 0.16); const [, lift] = hop(t, 69.0, 0.5, 0, 0, 48); M.y -= lift; M.aL = [-2.45, -2.75]; M.aR = [2.45, 2.75]; M.mouth = 'open'; M.wet = true; }
    if (a97In(t, 69.9, 73.06)) { M.mouth = 'smile'; M.wet = true; }
    if (a97In(t, 79.76, 82.64)) { M.mouth = 'smile'; M.brow = -0.5; M.wet = true; }
    if (a97In(t, 81.46, 87.16)) { M.sq = t < 82.64 ? settleTo(t, 81.46, 0.93, 1, 0.5) : 1; }
    if (a97In(t, 83.9, 85.3)) { M.tip = 0.3 * a97Env(t, 83.9, 85.3, 0.3); M.lid = t < 84.9 ? 1 : 0.2; M.handR = PERSON_HANDS.chest.R; M.handL = [-30, -90]; }
    if (a97In(t, 83.9, 86.2)) { M.mouth = 'smile'; M.wet = true; M.talk = a97In(t, 84.04, 85.0) ? 0.4 + 0.4 * Math.abs(Math.sin(t * 10)) : 0; }
    if (t >= 87.16 && t < 87.6) M.sq = anticipate(t, 87.16, 0.3, 0.07) * (t > 87.4 ? 1.04 : 1);
    if (t >= 88.7 && t < 89.5) M.tip = swing(t, 88.7, 0.08, 1.8, 2.5);
    // carried sack (from 81.46) with the casket on top
    const hasSack = t >= 81.46 && t < 82.64 || t >= 87.16;
    if (hasSack) { const sp = [M.x + M.dir * 34 * A97_MS, M.y - 80 * A97_MS]; a97Carry(M, sp[0], sp[1] + 4, 46);
      const sq = 1 + kick(t, A97_FALLS9, 0.05, 9, 8); M.post = [(c) => { a97Sack(c, sp[0], sp[1] + 66, 0.55, { sq }); a97Casket(c, sp[0] + 58 * M.dir, sp[1] + 12, 0.6, { glint: -1 }); if (t >= 90.1 && t < 90.7) a97Glint(c, sp[0] + 58 * M.dir, sp[1] - 20, 26, (t - 90.1) / 0.6); if (t >= 89.56 && t < 90.1) a97Glint(c, sp[0] + 6, sp[1] + 10, 20, (t - 89.56) / 0.54); }]; }
    // Salih
    if (a97In(t, 65.18, 66.8)) { S.brow = -0.5; S.eyes = 'wide'; }
    if (a97In(t, 70.62, 71.4)) S.brow = -0.7;
    if (a97In(t, 69.0, 70.0)) { S.drop = 5 * (pulse(t, 69.1, 0.35) + pulse(t, 69.5, 0.35)); S.brow = -0.3; }
    if (a97In(t, 86.24, 87.1)) { S.handL = [100, -150]; S.brow = 0.3; }
    const salChest = t >= 87.94; S.handL = salChest ? a97Tr(t, [[87.94, 88.3, [-30, -120]]], [-36, -206]) : S.handL;
    if (salChest) S.pre = [(c) => { const lift = a97E(t, 87.94, 0.35); const p0 = [A97_CH.B, 900], p1 = a97Pt(S, -64, -150); const p = a97L2(p0, p1, lift); a97Chest(c, p[0], p[1] + kick(t, A97_FALLS9, 2, 9, 8), K.lerp(A97_CHS, 0.55, lift), { band: C.red, open: 1 - lift, heap: 1 }); }];
    if (S.dir < 0 && t > 88.4) S.spear.rot = -0.05;
    A.push(S, M);
  }
  // ---- the sack on the dais edge (S8) and Yahya's casket ----
  if (t >= 79.76 && t < 81.46) { const k = a97E(t, 79.9, 0.6), x = 760 - 40 * k; over.push((c) => { a97Sack(c, x, A97_DY, 0.55); a97Casket(c, x - 6, A97_DY - 108, 0.6); }); }
  if (t >= 82.64 && t < 87.16) over.push((c) => { a97Sack(c, 720, A97_DY, 0.55); a97Casket(c, 714, A97_DY - 108, 0.6); });
  if (a97In(t, 71.96, 79.76)) {
    const at = t < 73.0 ? a97L2(a97Pt(Y, 20, -128), A97_JC, a97E(t, 72.2, 0.7)) : A97_JC;
    const op = t < 73.64 ? 0 : a97E(t, 73.64, 0.25), lift = t < 73.7 ? 0 : K.ease.back(K.clamp((t - 73.7) / 0.35)), gl = t >= 74.5 && t < 75.1 ? (t - 74.5) / 0.6 : -1;
    Y.post = [(c) => { a97CasketHero(c, at[0], at[1] + 24, 0.78, { open: op, lift, glint: gl, t, jr: 40, rayR: 82 }); }];
    // Yahya: looks down at the jewel as it opens, then up to us with a smile and one slow blink on نفيسة
    if (t >= 73.0) { Y.mouth = 'closed'; Y.bigSmile = a97E(t, 74.2, 0.3); Y.brow = -0.1; Y.noBlink = a97In(t, 74.3, 75.4);
      Y.lid = a97In(t, 74.5, 75.2) ? Math.sin(Math.PI * (t - 74.5) / 0.7) : 0.12; }
  }
  // ---- gazes for the day scenes after the needy ----
  const hY = a97Head(Y);
  if (M && S) {
    const hM = a97Head(M), hS = a97Head(S), BOX = [520, 840], HG = a97V2W(t, 900, 140), BAL = a97V2W(t, 500, 300), TR = [900, 720];
    if (t < 60.8) {
      M.gaze = gazePlan(t, [[39.3, lookAt(hM, hY)], [41.6, lookAt(hM, BAL)], [42.4, lookAt(hM, hY)], [45.8, lookAt(hM, TR)], [47.2, lookAt(hM, hY)], [48.44, lookAt(hM, [1000, 720])], [49.4, lookAt(hM, BOX)], [53.0, [0.2, 0.9]],
        [54.3, lookAt(hM, hY)], [54.6, lookAt(hM, [a97RunAX(t), 700])], [55.9, lookAt(hM, [a97RunBX(t), 700])], [57.2, lookAt(hM, hY)], [59.08, lookAt(hM, HG)]], 0.12);
      S.gaze = gazePlan(t, [[39.3, lookAt(hS, hY)], [45.8, lookAt(hS, TR)], [47.2, lookAt(hS, hM)], [49.4, lookAt(hS, BOX)], [53.62, lookAt(hS, HG)], [54.0, lookAt(hS, hY)], [54.7, lookAt(hS, [a97RunAX(t), 700])], [56.0, lookAt(hS, [a97RunBX(t), 700])], [57.3, lookAt(hS, hY)]], 0.12);
      Y.gaze = gazePlan(t, [[39.8, lookAt(hY, [150, 700])], [40.86, lookAt(hY, hM)], [44.5, [1, -0.1]], [45.8, lookAt(hY, [880, 720])], [48.5, lookAt(hY, hM)], [49.4, lookAt(hY, BOX)], [54.2, lookAt(hY, [a97RunAX(t), 720])], [55.6, [-1, 0.1]], [56.6, lookAt(hY, hM)]]);
    } else {
      const CNT = a97V2W(t, 500, 170);
      M.gaze = gazePlan(t, [[60.8, lookAt(hM, HG)], [62.3, lookAt(hM, [A97_CH.A, 830])], [63.6, lookAt(hM, [A97_CH.B, 830])], [65.18, lookAt(hM, [A97_CH.B, 830])], [65.5, lookAt(hM, hS)], [65.8, lookAt(hM, CNT)], [70.62, lookAt(hM, hY)],
        [79.76, lookAt(hM, hY)], [81.5, [0.3, 0.6]], [82.0, lookAt(hM, hY)], [86.3, lookAt(hM, hS)], [87.3, [-1, 0]]], 0.15);
      S.gaze = gazePlan(t, [[60.8, lookAt(hS, hY)], [62.4, lookAt(hS, [A97_CH.A, 830])], [64.3, lookAt(hS, [A97_CH.B, 830])], [65.6, lookAt(hS, hM)], [66.2, lookAt(hS, CNT)], [70.62, lookAt(hS, hY)], [79.76, lookAt(hS, hM)],
        [86.24, [-1, 0.1]], [86.8, lookAt(hS, hM)], [87.3, [1, 0.3]], [88.4, [-1, 0]]]);
      Y.gaze = gazePlan(t, [[60.8, lookAt(hY, hM)], [62.4, lookAt(hY, [A97_CH.A, 830])], [64.2, lookAt(hY, [A97_CH.B, 830])], [65.9, lookAt(hY, CNT)], [67.84, lookAt(hY, [300, 700])], [68.3, lookAt(hY, [640, 700])], [70.0, lookAt(hY, hM)],
        [71.4, [-0.3, 0.6]], [72.0, [-0.4, 0.8]], [73.5, lookAt(hY, [A97_JC[0], A97_JC[1] - 50])], [74.3, [0, 0.05]], [76.0, [-0.6, 0.5]], [77.3, [0, 0.05]], [79.76, lookAt(hY, hM)], [86.3, lookAt(hY, hS)], [87.3, lookAt(hY, hM)]]);
    }
  } else if (t >= 91.62) {
    Y.gaze = gazePlan(t, [[91.62, [-0.6, -0.8]], [103.36, [-1, 0.05]]]);
  } else if (t >= 39.8 && !Y.gaze) Y.gaze = [-1, 0];
  if (t >= 33.5 && t < 34.18) Y.gaze = lookAt(hY, a97Head(A[1] || Y));
  for (const P of A) a97Lid(P, t);
  // Yahya first (on the dais), the rest by depth
  A.sort((a, b) => (a === Y ? -1 : b === Y ? 1 : a.y - b.y));
  return { actors: A, under, over, heads: { Y: hY, M: M ? a97Head(M) : null, S: S ? a97Head(S) : null } };
}
const A97_FALLS7 = footfalls(a97RA7, 62.26, 63.4, 22).concat(footfalls(a97RB7, 62.9, 64.2, 22));

// ---------- S13-S14: back at the palace at sunset ----------
const a97S13SX = (t) => (t < 131.64 ? kfn(t, [[126.22, 160], [127.45, 520]], 'out') : t < 141.0 ? kfn(t, [[131.64, 520], [132.1, 560]], 'inOut') : t < 142.0 ? kfn(t, [[141.0, 560], [141.5, 600]], 'inOut') : kfn(t, [[142.0, 600], [142.84, 330]], 'in'));
const a97S13MX = (t) => (t < 141.9 ? kfn(t, [[126.22, 20], [127.4, 400], [128.0, 400], [128.9, 280]], 'inOut') : kfn(t, [[141.9, 280], [142.84, 170]], 'inOut'));
const A97_FALLS13 = footfalls(a97S13SX, 126.22, 127.45, 26).concat(footfalls(a97S13MX, 126.3, 127.4, 24));
function a97ScenePalaceB(t) {
  const H = a97HarunP(t), A = [H], under = [], over = [];
  const S = a97SalihBase({ ...a97Walker(a97S13SX, t, 26), dir: t >= 127.6 && t < 128.1 ? -1 : t >= 142.0 ? -1 : 1, brow: 0.2 });
  const M = a97Mk('mansur', { ...a97Walker(a97S13MX, t, 24), y: 905, s: A97_MS, dir: 1, brow: -0.6, mouth: 'closed', lid: 0.4 });
  if (t >= 128.0 && t < 128.9 || t >= 141.95) M.dir = -1;
  // Salih: chest on the shoulder until 127.2, then down at 610; picks the casket at 127.7, kneels and raises it, stands to whisper
  const chestDown = t >= 127.5;
  S.handL = chestDown ? A97_REST.L : [-36, -206];
  if (!chestDown) S.pre = [(c) => { const p = a97Pt(S, -64, -150); a97Chest(c, p[0], p[1] + kick(t, A97_FALLS13, 2, 9, 8), 0.55, { band: C.red, heap: 1 }); }];
  const sackX = 455, casketOnSack = t < 127.9;
  if (a97In(t, 127.7, 128.1)) { S.handLW = [sackX + 10, 790]; S.handL = null; S.tip = 0.12; }
  const kneelK = a97In(t, 128.1, 131.64) ? a97E(t, 128.1, 0.4) * 0.6 : t >= 131.64 ? 0.6 * (1 - a97E(t, 131.64, 0.35)) : 0;
  S.kneel = kneelK;
  const raised = a97In(t, 128.3, 131.64);
  if (raised) { const k = a97E(t, 128.3, 0.4), up = 20 * a97E(t, 130.48, 0.3); S.spear = null; S.handR = [70, -105 - up * k]; S.handL = [40, -105 - up * k]; S.tip = 0.15 * k; S.lid = 0.2; }
  if (a97In(t, 131.64, 135.86)) { S.handR = PERSON_HANDS.cupMouth.R; S.spear = null; S.handL = [-20, -128]; S.tip = 0.1 * a97Env(t, 131.8, 135.6, 0.3); S.talk = talk(t, [[131.9, 133.4], [134.0, 135.3]], 0.2) * 0.6; }
  if (a97In(t, 135.86, 141.0)) { S.brow = -0.5; S.eyes = t > 136 && t < 137.4 ? 'wide' : 'open'; }
  if (a97In(t, 141.74, 142.1)) { S.tip = 0.2 * pulse(t, 141.74, 0.36); }
  if (S.spear == null && !raised && !a97In(t, 131.64, 135.86)) { S.spear = { hand: A97_S_HAND, rot: 0 }; S.handR = A97_S_HAND; }
  if (t >= 128.1 && t < 141.0 && !raised && !a97In(t, 131.64, 135.86)) S.handR = A97_S_HAND;
  // the spear lies on the floor while he kneels (raised arms)
  if (raised) under.push((c) => { c.save(); c.translate(380, 905); c.rotate(-Math.PI / 2 + 0.02); a97SpearFree(c, 0, 0, 0, 280); c.restore(); });
  // Mansur: carries the sack to 400, sets it down at 455, backs away to 240; shrinks
  const mCarry = t < 127.4;
  if (mCarry) { const sp = [M.x + 34 * A97_MS, M.y - 80 * A97_MS]; a97Carry(M, sp[0], sp[1] + 4, 46); M.post = [(c) => { a97Sack(c, sp[0], sp[1] + 66, 0.55, { sq: 1 + kick(t, A97_FALLS13, 0.05, 9, 8) }); a97Casket(c, sp[0] + 58, sp[1] + 12, 0.6); }]; }
  else if (t < 127.9) { const k = a97E(t, 127.4, 0.4); M.tip = 0.15 * pulse(t, 127.4, 0.6); a97Carry(M, K.lerp(434, sackX, k), K.lerp(829, 846, k), 46); }
  else { M.handR = PERSON_HANDS.clasp.R; M.handL = PERSON_HANDS.clasp.L; M.drop = 6; }
  if (a97In(t, 134.58, 135.86)) { M.sq = 0.9 + 0.1 * (1 - a97E(t, 134.58, 0.3)); M.lid = 0.6; M.drop = 9; M.brow = -0.8; M.x += tremble(t, 1.5); }
  if (t >= 141.74) { M.drop = 6 * (1 - a97E(t, 141.74, 0.3)); M.lid = 0; M.brow = -0.5; M.eyes = t < 141.95 ? 'wide' : 'open'; M.mouth = t < 141.95 ? 'o' : 'smile'; M.tip = 0.25 * pulse(t, 141.72, 0.32); M.sq = 1; }
  if (!mCarry) under.push((c) => { a97Sack(c, t < 127.9 ? K.lerp(434, sackX, a97E(t, 127.4, 0.4)) : sackX, t < 127.9 ? K.lerp(891, 905, a97E(t, 127.4, 0.4)) : 905, 0.55); });
  // chest on the floor and its PAID heap
  if (chestDown) under.push((c) => a97Chest(c, 610, 902, A97_CHS, { band: C.red, heap: 1, open: t < 129.86 ? 0 : settleTo(t, 129.86, 0, 1, 0.3, 0.15), sqy: impactSquash(t, 127.5, 0.94) }));
  // the casket: on the sack, then in Salih's raised hands, then in his hand, then in Harun's lap, then back to Salih
  let cas = null, cop = 0;
  if (casketOnSack && !mCarry) cas = [t < 127.9 ? K.lerp(490, sackX - 6, a97E(t, 127.4, 0.4)) : sackX - 6, (t < 127.9 ? K.lerp(933, 905, a97E(t, 127.4, 0.4)) : 905) - 98];
  if (t >= 127.9 && t < 128.3) cas = a97L2([sackX - 6, 807], a97Pt(S, 40, -160), a97E(t, 127.9, 0.4));
  if (raised) { const k = a97E(t, 128.3, 0.4); cas = a97L2(a97Pt(S, 40, -160), a97Pt(S, 55, -98 - 20 * a97E(t, 130.48, 0.3)), k); cop = t < 130.48 ? 0 : settleTo(t, 130.48, 0, 1, 0.3, 0.2); }
  if (a97In(t, 131.64, 135.86)) { cas = a97Pt(S, -16, -116); cop = 1 - a97E(t, 131.64, 0.3); }
  if (a97In(t, 135.86, 140.78)) { cas = a97Pt(H, 40, -64); cop = t < 136.0 ? a97E(t, 135.86, 0.15) : 1; }
  if (a97In(t, 140.78, 141.74)) { cas = a97L2(a97Pt(H, 40, -64), a97Pt(H, 96, -140), a97E(t, 140.78, 0.5)); cop = 1 - a97E(t, 140.78, 0.3); }
  if (t >= 141.74) { cas = a97Pt(S, 42, -112); cop = 0; }
  if (a97In(t, 135.86, 140.78)) { H.handLW = [cas[0] + 30, cas[1] + 2]; H.handL = null; if (t < 138.34) { H.handRW = [cas[0] - 30, cas[1] + 2]; H.handR = null; } }
  if (a97In(t, 140.78, 141.74)) { H.handRW = [cas[0] - 20, cas[1] + 4]; H.handR = null; }
  if (t >= 141.74 && t < 142.84) { S.handR = [42, -112]; S.spear = null; }
  const gl = t >= 137.06 && t < 137.7 ? (t - 137.06) / 0.64 : t >= 130.8 && t < 131.4 ? (t - 130.8) / 0.6 : -1;
  const hero = a97In(t, 135.86, 140.78);
  if (cas) { const cc = cas, op = cop; over.push((c) => { if (hero) a97CasketHero(c, cc[0], cc[1] + 20, 0.55, { open: op, lift: K.ease.back(K.clamp((t - 135.95) / 0.35)), glint: gl, t, jr: 36, rayR: 70 });
    else a97Casket(c, cc[0], cc[1] + 24, 0.62, { open: op, glint: gl, glow: op, t }); }); }
  // v2 S14: one clear tear on وتأثر, the heart on his chest beside his hand on بكرم (two pulses)
  if (a97In(t, 138.9, 140.78)) { const u = K.clamp((t - 138.9) / 1.4), hh = a97Head(H); over.push((c) => { c.save(); c.globalAlpha = 1 - K.clamp((u - 0.85) / 0.15); a97Tear(c, hh[0] - 15, hh[1] + 6 + 26 * u, 7); c.restore(); }); }
  if (t >= 139.14 && t < 142.84) { const p = a97Pt(H, -2, -128), k = K.ease.back(K.clamp((t - 139.14) / 0.3)), beat = 1 + 0.14 * (pulse(t, 139.5, 0.3) + pulse(t, 140.0, 0.3)); over.push((c) => heart(c, p[0], p[1], 21 * k * beat)); }
  // red light on Harun's face while the jewel shines
  const redK = a97In(t, 130.48, 135.86) ? 0.5 * cop : a97In(t, 135.86, 138.34) ? 0.25 : 0;
  A.push(S, M);
  const hH = a97Head(H), hS = a97Head(S), hM = a97Head(M), CH = [610, 820], CAS = cas || [500, 700];
  H.gaze = gazePlan(t, [[126.22, lookAt(hH, hS)], [127.4, lookAt(hH, hM)], [128.4, lookAt(hH, hS)], [129.06, lookAt(hH, CH)], [130.48, lookAt(hH, CAS)], [132.0, lookAt(hH, hS)], [134.58, lookAt(hH, hM)], [135.4, lookAt(hH, CAS)], [135.86, lookAt(hH, CAS)], [138.5, [-0.2, 0.3]],
    [140.78, lookAt(hH, hS)], [141.74, lookAt(hH, hM)]], t > 130.4 && t < 130.7 ? 0.07 : 0.2);
  S.gaze = gazePlan(t, [[126.22, [1, 0]], [127.6, lookAt(hS, [sackX, 820])], [128.3, lookAt(hS, hH)], [132.0, lookAt(hS, hM)], [132.6, lookAt(hS, hH)], [135.86, lookAt(hS, CAS)], [139.1, lookAt(hS, hH)], [142.0, [-1, 0]]]);
  if (a97In(t, 139.2, 140.9)) { S.brow = -0.6; S.eyes = 'open'; S.drop = -3 * a97Env(t, 139.2, 140.9, 0.2); }
  M.gaze = gazePlan(t, [[126.3, [1, 0]], [128.0, [0.3, 0.9]], [134.58, [0.2, 1]], [141.6, lookAt(hM, hH)], [142.0, [-1, 0]]]);
  if (redK > 0) over.push((c) => { c.save(); c.globalAlpha = redK; c.fillStyle = dotPat(c, A97_JEWEL, 7, 0.4); c.beginPath(); c.arc(hH[0], hH[1] + 4, 44, 0, 7); c.fill(); c.restore(); });
  for (const P of A) a97Lid(P, t);
  return { actors: [H, ...A.slice(1).sort((a, b) => a.y - b.y)], under, over, heads: { H: hH, S: hS, M: hM }, cas };
}

// ---------- S15-S17: Yahya's hall at night and at dawn ----------
const a97S17OldX = (t) => kfn(t, [[163.66, -60], [165.0, 600]], 'out');
const a97S17VilX = (t) => kfn(t, [[163.85, -140], [165.4, 460]], 'out');
const A97_BAL15 = (t) => (t < 147.86 ? [580, 540, 55] : [K.lerp(580, 592, a97E(t, 149.6, 1.0)), K.lerp(540, 690, a97E(t, 149.6, 1.0)), K.lerp(55, 40, a97E(t, 149.6, 1.0))]);
function a97SceneHallNight(t) {
  const A = [], under = [], over = [];
  let Y;
  const a97YX16 = (tt) => kfn(tt, [[157.62, 700], [158.0, 650]], 'inOut');
  if (t < 158.98) Y = a97Yahya({ ...walk(a97YX16, t, { stride: 24 }), y: 900, lid: 0.15 });
  else { const u = t < 162.44 ? 0 : a97E(t, 162.44, 0.45, 'in'); Y = a97Yahya({ x: A97_CX, y: K.lerp(A97_DY, A97_CY, u), sit: u, seat: 'bench' }); if (t >= 162.44 && t < 163.2) Y.sq = landSquash(t, 162.9, 0.08); }
  Y.sq = (Y.sq ?? 1) * breathe(t, 3, 0.01);
  Y.handR = a97Tr(t, [[149.46, 150.6, [40, -110]], [152.72, 157.7, PERSON_HANDS.pointUp.R], [164.34, 164.6, [26, -118], 0.1], [166.7, 167.6, (tt) => [64, -160 + 10 * Math.sin(tt * 14)]]], [40, -96]);
  Y.handL = A97_REST.L.map((v, i) => (i ? -96 : -36));
  if (t < 147.86) { const c = [645, 790]; a97Carry(Y, c[0], c[1], 30); Y.handL = Y.handR = null; }
  if (a97In(t, 150.84, 151.6)) { const b = A97_BAL15(t); Y.handRW = [b[0] + 24, b[1] + 14]; Y.handR = null; }
  if (a97In(t, 158.02, 158.98)) { Y.handRW = [522, 776]; Y.handR = null; }
  if (a97In(t, 164.6, 165.6)) { Y.handRW = a97L2(a97Pt(Y, 40, -96), A97_GIFT, a97E(t, 164.6, 0.3)); Y.handR = null; Y.tip = 0.06; }
  if (a97In(t, 143.42, 144.0)) { Y.brow = -0.5; Y.mouth = 'o'; Y.lid = 0; }
  if (a97In(t, 144.0, 146.24)) { Y.mouth = 'smile'; }
  if (a97In(t, 146.24, 147.86)) { Y.mouth = 'closed'; Y.lid = 0.3; Y.noBlink = true; Y.sq = 1; }
  if (a97In(t, 147.86, 149.46)) { Y.lid = 1; Y.mouth = 'closed'; Y.sq = 1 + 0.03 * Math.sin(Math.PI * K.clamp((t - 147.9) / 1.4)); }
  if (a97In(t, 149.46, 152.72)) { Y.lid = 0.15; Y.mouth = 'smile'; Y.brow = -0.2; if (t < 150.4) Y.look = 0.7 * Math.sin((t - 149.6) * 12) * (t > 149.6 ? 1 : 0); }
  Y.talk = talk(t, A97_Y_TALK, 0.9) * 0.7;
  A.push(Y);
  // Salih (S15-S16)
  if (t < 158.98) {
    const S = a97SalihBase({ x: 540, y: 900, ph: 0, amp: 0, brow: 0.1 });
    // v2: Salih steps back to the left third while the camera is close on Yahya (153.0-153.9), clear of Yahya's idea balloon
    const a97SX16 = (tt) => kfn(tt, [[147.86, 500], [153.0, 500], [153.9, 450]], 'inOut');
    if (t >= 147.86) { Object.assign(S, walk(a97SX16, t, { stride: 26 })); S.dir = a97In(t, 153.0, 153.9) ? -1 : 1; }
    if (t < 143.4) { const c = [645, 790]; S.handRW = [c[0] - 30, c[1] + 4]; S.handR = null; S.spear = null; S.tip = 0.15 * pulse(t, 142.9, 0.6); }
    if (a97In(t, 144.54, 146.24)) { S.handR = t < 144.7 ? A97_S_HAND : PERSON_HANDS.cupMouth.R; S.spear = null; S.talk = t > 144.7 ? talk(t, [[144.75, 146.1]], 0.4) * 0.5 : 0; }
    if (a97In(t, 146.24, 149.46)) { S.brow = -0.5; S.lid = 0; }
    if (a97In(t, 149.46, 158.02)) { S.brow = -0.3; }
    if (a97In(t, 158.02, 158.98)) { S.mouth = t < 158.4 ? 'o' : 'closed'; S.brow = -0.6; S.tip = t > 158.35 ? 0.2 * a97E(t, 158.35, 0.3) : 0; S.lid = t > 158.4 ? 1 : 0; }
    if (!S.spear && !S.handR && !S.handRW) { S.spear = { hand: A97_S_HAND, rot: 0 }; S.handR = A97_S_HAND; }
    if (S.handR === A97_S_HAND && !S.spear) S.spear = { hand: A97_S_HAND, rot: 0 };
    A.push(S);
    const hY = a97Head(Y), hS = a97Head(S), b = A97_BAL15(t);
    Y.gaze = gazePlan(t, [[142.84, lookAt(hY, [645, 760])], [144.4, lookAt(hY, hS)], [145.2, lookAt(hY, [b[0], b[1]])], [146.9, [-0.4, 0.9]], [149.46, lookAt(hY, hS)], [150.6, lookAt(hY, [b[0], b[1]])], [151.6, lookAt(hY, hS)],
      [153.6, lookAt(hY, a97V2W(t, 430, 330))], [157.7, lookAt(hY, hS)]], 0.15);
    S.gaze = gazePlan(t, [[142.84, lookAt(hS, [645, 790])], [143.5, lookAt(hS, hY)], [144.54, [0.3, 0.9]], [144.9, lookAt(hS, hY)], [154.0, lookAt(hS, a97V2W(t, 430, 330))], [157.6, lookAt(hS, hY)]]);
    if (t < 147.86) { const c = [645, 790]; over.push((ctx) => { a97Casket(ctx, c[0], c[1] + 22, 0.62, { open: t < 146.24 ? 1 : 1 - a97E(t, 146.24, 0.3), glint: t >= 143.42 && t < 144.0 ? (t - 143.42) / 0.58 : -1, glow: 0.6, t }); }); }
    else over.push((ctx) => { a97Casket(ctx, 790, 860, 0.5); });
  } else {
    // S17: Mansur free outside the arch is drawn by the set; the needy return
    if (t >= 163.66) {
      const O = a97Mk('oldW', { ...a97Walker(a97S17OldX, t, 20), y: 900, s: 0.92, dir: 1, mouth: 'smile' }); O.handL = [44, -112]; O.handR = [56, -116];
      const V = a97Mk('vill', { ...a97Walker(a97S17VilX, t, 24), y: 905, s: 0.95, dir: 1, mouth: 'smile' });
      if (a97In(t, 166.7, 168.2)) { V.tip = 0.25 * a97Env(t, 166.7, 168.2, 0.3); V.handR = PERSON_HANDS.chest.R; }
      if (t >= 165.4) { O.wet = true; }
      if (t >= 165.4) O.post = [(c) => { const p = a97Pt(O, 30, -114); a97Purse(c, p[0], p[1] + 18, 0.85); }];
      A.push(O, V);
      const hY = a97Head(Y); O.gaze = lookAt(a97Head(O), hY); V.gaze = lookAt(a97Head(V), hY);
      Y.gaze = gazePlan(t, [[163.66, lookAt(hY, [200, 700])], [164.3, lookAt(hY, a97Head(O))], [166.7, lookAt(hY, a97Head(V))], [167.5, lookAt(hY, a97Head(O))]]);
    } else Y.gaze = gazePlan(t, [[158.98, [-1, -0.1]], [161.3, lookAt(a97Head(Y), [150, 700])], [162.4, [-0.6, 0.4]]]);
    if (t >= 164.34 && t < 165.4) Y.post = [(c) => { const p = Y.handRW || a97Pt(Y, 26, -118); a97Purse(c, p[0], p[1] + 18, 0.85); }];
    over.push((ctx) => a97Casket(ctx, 820, A97_DY, 0.5));
  }
  for (const P of A) a97Lid(P, t);
  A.sort((a, b) => (a === Y && t >= 158.98 ? -1 : b === Y && t >= 158.98 ? 1 : a.y - b.y));
  return { actors: A, under, over, heads: { Y: a97Head(Y) } };
}
