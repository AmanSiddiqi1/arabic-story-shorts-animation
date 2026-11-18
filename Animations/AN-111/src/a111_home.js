// ===== AN-111 home: the hut (S1, S2, S4, S8, S9, S14, S15, S27) =====
const A111_HUTO = { doorSide: 'left', window: [690, 400, 140, 140], niche: [470, 540], mat: [300, 760], peg: [190, 600], hook: false };
const a111HutBack = (ctx, t, o = {}) => hutRoom(ctx, { ...A111_HUTO, palette: 'day', u: o.u ?? 0.1, door: o.door || 0, lamp: o.lamp || 0, t, layer: 'back' });
const a111HutFront = (ctx, t, o = {}) => hutRoom(ctx, { ...A111_HUTO, palette: 'day', u: o.u ?? 0.1, door: o.door || 0, lamp: o.lamp || 0, t, layer: 'front' });
const a111Gz = (P, pt) => { P.gaze = lookAt(a111Head(P), pt); return P; };
// the shelf with the platter and the jar (planted in S1, the hero of S9); rich: new ones and pots
function a111Shelf(ctx, t, o = {}) {
  seg(ctx, 215, 522, 440, 522, 11, BARKY, 3.5); for (const x of [235, 420]) seg(ctx, x, 526, x - 10, 552, 6, BARKY, 2.5);
  if (o.rich) { a111Platter(ctx, 270, 482, { r: 38, ry: 0.92 }); a111Jar(ctx, 350, 517, { h: 78, col: '#3f7be6', new: true }); shape(ctx, [[392, 517], [388, 488], [420, 488], [416, 517], [392, 517]], C.red, { lw: 3.5, seed: 730 }); return; }
  if (o.gone) return;
  a111Platter(ctx, 272, 484, { r: 38, ry: 0.92, crack: o.crack || 0, rot: o.prot || 0 });
  a111Jar(ctx, 365, 517, { h: 78, chip: o.chip, web: o.web ?? 0.4, sw: o.sw ?? 0.15 * Math.sin(t * 1.3), rot: o.jrot || 0 });
}
const a111PegPurse = (ctx) => a111Purse(ctx, 205, 655, 0.8, { limp: true });
// the wife spinning on her stool: distaff in the right hand (screen right), the spindle hanging from the left hand
function a111WifeSpin(t, x, o = {}) {
  const act = o.act ?? 1, dr = Math.sin(t * 5) * act;
  const P = a111P(A111_WIFE, { x, y: 900, sit: 1, seat: 'stool', tip: 0.03 * Math.sin(t * 2.5) * act });
  P.hR = [54, -170 + 6 * dr]; P.hL = [-42 - 8 * dr, -142 - 10 * dr];
  P.after = (c, Q) => { const d = Q.HR, top = [d[0] + 28, d[1] - 108]; a111Distaff(c, d[0], d[1], { fill: o.fill ?? 1, rot: 0.25 });
    c.save(); c.lineWidth = 2; c.strokeStyle = C.black; c.beginPath(); c.moveTo(top[0] - 8, top[1] + 14); c.lineTo(Q.HL[0], Q.HL[1]); c.stroke(); c.restore();
    a111Spindle(c, Q.HL[0], Q.HL[1] + 6, { len: o.len ?? 22, spin: t * 9 * act, fill: o.spool ?? 0.3, sway: 0.05 * Math.sin(t * 3) }); };
  return P;
}

// ---------- S1 (0.00-6.90): the poor, warm home ----------
function a111S1(ctx, t) {
  a111HutBack(ctx, t, { u: 0.1 }); a111Shelf(ctx, t); a111PegPurse(ctx); a111Motes(ctx, 760, 480, t);
  a111Basket(ctx, 852, 900, { fill: 1 });
  const W = a111WifeSpin(t, 600, { act: t < 5.2 ? 0.35 : 1, spool: K.lerp(0.2, 0.35, a111B(t, 5.28, 1.2)), fill: 1 - 0.1 * a111B(t, 5.28, 1.2) });
  const Hh = a111P(A111_HERO, { x: 300, y: 900, mouth: t > 0.5 ? 'smile' : 'closed', sq: breathe(t, 1, 0.01) });
  Hh.hR = a111HT(t, Hh, [[0, A111_REST.R], [0.8, A111H.chest, 0.3], [2.2, [40, -70], 0.45]]); Hh.hL = [-28, -106];
  Hh.drop = 5 * a111B(t, 0.85, 0.25) * (1 - a111B(t, 1.7, 0.4)); Hh.tip = 0.04 * pulse(t, 0.8, 1.2);
  if (a111In(t, 0.9, 1.45)) Hh.lid = 0.6;
  const wifeH = [600, 760], childH = [770, 820];
  a111Gz(Hh, gazePlan(t, [[0, [500, 760]], [0.3, wifeH], [1.0, childH], [1.9, wifeH], [3.2, [520, 640]], [4.1, wifeH]], 0.25));
  W.mouth = t > 4.04 ? 'smile' : 'closed'; a111Gz(W, t < 4.04 ? [W.x - 60, 900] : a111Head(Hh));
  const ch = a111P(A111_CHILD, { x: 770, y: 900, sit: 1, seat: 'floor', mouth: t > 4.2 ? 'smile' : 'closed' });
  const cw = t > 4.04 + a111St(1) ? a111B(t, 4.04 + a111St(1), 0.25) : 0; ch.hR = a111Mix([30, -110], [58 + 8 * Math.sin(t * 14), -192], cw * (1 - a111B(t, 5.4, 0.4)));
  ch.y = 900 - 6 * pulse(t, 4.25, 0.35); a111Gz(ch, t < 3.8 ? [850, 830] : a111Head(Hh));
  ch.after = (c, Q) => a111Puff(c, Q.HR[0], Q.HR[1] - 8, 11);
  Hh.after = (c, Q) => a111Skein(c, Q.HL[0] + 4, Q.HL[1] + 16, { n: 1, s: 0.8 });
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, W); a111Draw(ctx, t, ch);
  a111HutFront(ctx, t, { u: 0.1 });
}

// ---------- S2 (6.90-10.90): spinning close; skeins 1-2-3; a day passes in the window ----------
function a111S2(ctx, t) {
  const u = t < 10.1 ? 0.1 : K.lerp(0.1, 1.1, a111B(t, 10.1, 0.8, 'lin'));
  a111HutBack(ctx, t, { u: u % 1 }); a111Shelf(ctx, t);
  { ctx.save(); ctx.beginPath(); ctx.rect(690, 400, 140, 140); ctx.clip(); if (t > 10.0) { const k = a111B(t, 10.1, 0.8, 'lin'); sun(ctx, K.lerp(650, 900, K.clamp(k * 2)), 470 - 40 * Math.sin(Math.PI * K.clamp(k * 2)), t); if (k > 0.45) moon(ctx, K.lerp(650, 880, K.clamp(k * 2 - 1)), 470 - 40 * Math.sin(Math.PI * K.clamp(k * 2 - 1)), 22); } ctx.restore(); }
  a111Basket(ctx, 852, 900, { fill: 0.8 });
  const n = (t > 8.66) + (t > 9.34) + (t > 9.92), gone = t > 10.55;
  if (!gone && n > 0) { const land = [8.66, 9.34, 9.92][n - 1]; a111Skein(ctx, 505, 902, { n, sq: landSquash(t, land + 0.12, 0.25, 12) }); }
  const act = t < 7.2 ? 0.5 : 1;
  const W = a111WifeSpin(t, 600, { act: act * (t > 8.6 ? 1.6 : 1), spool: K.lerp(0.35, 0.8, a111B(t, 7.2, 3.2, 'lin')), fill: 0.9 - 0.15 * a111B(t, 7.2, 3) + 0.15 * a111B(t, 9.0, 0.3) });
  a111Gz(W, t < 8.9 ? [560, 900] : t < 9.4 ? [700, 800] : [560, 900]); W.mouth = 'closed';
  const ch = a111P(A111_CHILD, { x: 720, y: 900, mouth: a111In(t, 7.9, 8.8) ? 'o' : 'smile' });
  ch.hL = a111HT(t, ch, [[0, [-30, -110]], [7.95, { w: [688, 800] }, 0.45], [9.1, [-30, -110], 0.4]]); ch.hR = [24, -120];
  ch.tilt = -0.08 * a111B(t, 7.9, 0.3); a111Gz(ch, t < 8.6 ? (ch.HL || [690, 800]) : a111Head(W)); ch.y = 900 - 4 * pulse(t, 8.0, 0.3);
  ch.after = (c, Q) => { if (t < 9.0) a111Puff(c, Q.HL[0], Q.HL[1] - 6, 11); };
  const Hh = a111P(A111_HERO, { x: 410, y: 900, mouth: 'smile' }), wv = (t - 6.9) * 8;
  Hh.hR = t < 10.4 ? [34 + 12 * Math.cos(wv), -132 + 9 * Math.sin(wv)] : a111Mix([34, -132], [40, -96], a111B(t, 10.4, 0.25));
  Hh.hL = t < 10.4 ? [-30 - 12 * Math.cos(wv), -128 - 9 * Math.sin(wv)] : a111Mix([-30, -128], [-40, -96], a111B(t, 10.4, 0.25));
  Hh.drop = a111Nods(t, [9.34, 9.92], 0.3, 5) + 6 * pulse(t, 10.4, 0.3); Hh.sq = anticipate(t, 10.4, 0.25, 0.05);
  a111Gz(Hh, t < 10.55 ? [Hh.x, 840] : [150, 760]); Hh.look = t > 10.6 ? -0.5 : 0;
  Hh.after = (c, Q) => { if (t < 10.45) { c.save(); c.lineWidth = 2.5; c.strokeStyle = A111_THREAD; c.beginPath(); c.moveTo(Q.HL[0], Q.HL[1]); c.lineTo(Q.HR[0], Q.HR[1]); c.stroke(); c.restore(); }
    else { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Basket(c, m[0], m[1] + 26, { fill: 0, s: 0.6 }); a111Skein(c, m[0], m[1] - 14, { n: 3, s: 0.6 }); } };
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, W); a111Draw(ctx, t, ch);
  a111HutFront(ctx, t, { u: u % 1 });
}

// ---------- S4 (17.90-20.60): bread shared; enough for today ----------
function a111S4(ctx, t) {
  a111HutBack(ctx, t, { u: 0.42 }); a111Shelf(ctx, t); a111PegPurse(ctx);
  a111Sack(ctx, 835, 902, 0.42, { col: C.white, mark: false });
  const ch = a111P(A111_CHILD, { x: 525, y: 884, sit: 1, seat: 'floor', mouth: 'smile' }), Hh = a111P(A111_HERO, { x: 360, y: 900, sit: 1, seat: 'floor', mouth: 'smile' }), W = a111P(A111_WIFE, { x: 690, y: 900, sit: 1, seat: 'floor', mouth: 'smile' });
  // the hero breaks the loaf and hands a piece to the child (18.4); the wife takes the tray loaf (18.6)
  Hh.hR = a111HT(t, Hh, [[0, [12, -128]], [18.05, [28, -126], 0.1], [18.15, { w: [470, 836] }, 0.3], [18.7, [30, -112], 0.35]]); Hh.hL = a111HT(t, Hh, [[0, [-12, -128]], [18.05, [-30, -124], 0.1], [18.9, [-26, -110], 0.4]]);
  Hh.after = (c, Q) => { if (t < 18.05) a111Bread(c, (Q.HL[0] + Q.HR[0]) / 2, Q.HL[1] - 6, 0.9); else { a111Bread(c, Q.HL[0], Q.HL[1] - 6, 0.8, 1); if (t < 18.45) a111Bread(c, Q.HR[0], Q.HR[1] - 6, 0.8, 1); } };
  a111Gz(Hh, gazePlan(t, [[0, [Hh.x, 840]], [18.1, a111Head(ch)], [18.55, [690, 760]], [19.3, a111Head(ch)]], 0.15));
  ch.hL = a111HT(t, ch, [[0, [-30, -100]], [18.2, { w: [478, 832] }, 0.25], [18.55, [-8, -150], 0.25]]);
  ch.hR = a111HT(t, ch, [[0, [30, -100]], [18.85, [8, -92], 0.2]]); if (t > 18.9 && t < 19.9) ch.hR = [8 + 6 * Math.sin(t * 18), -92];
  ch.lid = t > 18.7 ? Math.max(0.5, blink(t, 11)) : null; ch.y = 884 - 4 * Math.abs(Math.sin((t - 18.6) * 7)) * (a111In(t, 18.6, 19.6) ? 1 : 0); ch.talk = a111In(t, 18.6, 19.8) ? 0.25 * Math.abs(Math.sin(t * 11)) : 0;
  ch.after = (c, Q) => { if (t > 18.42 && t < 19.2) a111Bread(c, Q.HL[0], Q.HL[1] - 6, 0.7, 1); };
  a111Gz(ch, t < 18.1 ? a111Head(Hh) : t < 18.7 ? [478, 832] : a111Head(Hh));
  W.hR = a111HT(t, W, [[0, [30, -100]], [18.55, { w: [575, 878] }, 0.25], [18.85, [20, -150], 0.3]]); W.hL = [-30, -100];
  W.after = (c, Q) => { if (t > 18.75) a111Bread(c, Q.HR[0], Q.HR[1] - 6, 0.75); };
  a111Gz(W, t < 18.5 ? a111Head(Hh) : t < 18.85 ? [560, 890] : a111Head(ch));
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, ch); a111Draw(ctx, t, W);
  a111Tray(ctx, 528, 912, { s: 0.85, bread: t < 18.75 ? 1 : 0, dates: 2 });
  a111HutFront(ctx, t, { u: 0.42 });
}

// ---------- S8 (41.80-49.90): the family asks; he explains ----------
function a111S8(ctx, t) {
  a111HutBack(ctx, t, { u: 0.47, door: 0.85 * (1 - a111B(t, 44.0, 0.6)) }); a111Shelf(ctx, t); a111PegPurse(ctx);
  seatStool(ctx, 800, 900); a111Distaff(ctx, 852, 896, { fill: 0, rot: 0.32 }); a111Spindle(ctx, 815, 848, { len: 6, spin: 0, fill: 0.1 });
  a111Basket(ctx, 860, 900, { fill: 0 });
  const Hh = a111P(A111_HERO, { x: 300, y: 900 }), W = a111P(A111_WIFE, { x: a111X([[48.8, 480], [49.2, 420]])(t), y: 900 }), ch = a111P(A111_CHILD, { x: a111X([[49.0, 640], [49.5, 372]])(t), y: 902 });
  Object.assign(W, a111Walk(a111X([[48.8, 480], [49.2, 420]]), t, 0.86)); Object.assign(ch, a111Walk(a111X([[49.0, 640], [49.5, 372]]), t, 0.6));
  // hero: basket down (44.64), neck rub, explains (46.34) with open hands
  Hh.hR = a111HT(t, Hh, [[0, [44, -76]], [44.6, { w: [252, 880] }, 0.35], [45.05, a111NeckRub(t, 45.05), 0.25], [46.3, A111H.palmR, 0.3], [48.9, [40, -86], 0.4]]);
  Hh.hL = a111HT(t, Hh, [[0, [-34, -64]], [46.3, A111H.palmL, 0.3], [48.9, [-36, -70], 0.4]]);
  Hh.lid = a111In(t, 44.6, 46.2) ? Math.max(0.4, blink(t, 3)) : null; Hh.drop = 5 * pulse(t, 45.2, 0.7); Hh.mouth = a111In(t, 44.6, 46.2) ? 'closed' : t > 49.2 ? 'smile' : 'closed';
  Hh.talk = a111In(t, 46.34, 48.6) ? a111Talk(t, 0.8) : 0; Hh.brow = t < 44.6 ? -0.4 : -0.2;
  a111Gz(Hh, gazePlan(t, [[0, [480, 760]], [43.4, [640, 820]], [44.64, [200, 820]], [45.6, [480, 760]], [46.0, [180, 840]], [46.3, a111Head(W)], [49.4, [380, 840]]], 0.15));
  Hh.after = (c, Q) => { if (t < 44.9) { const p = Q.HR; a111Basket(c, p[0] + 2, p[1] + 34, { fill: 0, s: 0.55 }); } };
  // wife: open palms, where is it? then the hand on his arm
  W.hR = a111HT(t, W, [[0, [30, -90]], [41.8, A111H.palmR, 0.3], [48.6, [30, -96], 0.4]]);
  W.hL = a111HT(t, W, [[0, [-30, -90]], [41.8, A111H.palmL, 0.3], [49.05, { w: [346, 812] }, 0.35]]);
  W.talk = a111In(t, 41.9, 43.2) ? a111Talk(t, 0.6, 2) : 0; W.mouth = t > 49.1 ? 'smile' : 'closed'; W.drop = 7 * pulse(t, 48.95, 0.4);
  a111Gz(W, gazePlan(t, [[0, [250, 870]], [42.4, a111Head(Hh)], [43.4, [640, 820]], [43.9, a111Head(Hh)]], 0.18));
  if (t > 48.8 && t < 49.3) W.sq = 1 + 0.03 * pulse(t, 48.8, 0.5);
  // child: the empty tray, then hugs his leg
  ch.hR = a111HT(t, ch, [[0, [34, -120]], [49.0, { w: [328, 860] }, 0.4]]); ch.hL = a111HT(t, ch, [[0, [-34, -120]], [49.0, [-30, -130], 0.4]]);
  ch.tilt = -0.15 * a111B(t, 43.34, 0.3) * (1 - a111B(t, 44.6, 0.4)); ch.mouth = a111In(t, 43.34, 44.8) ? 'o' : t > 49.4 ? 'smile' : 'closed';
  a111Gz(ch, t < 43.3 ? [480, 760] : t < 49.0 ? a111Head(Hh) : [330, 850]);
  ch.after = (c, Q) => { if (t < 49.0) { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Tray(c, m[0], m[1] - 2, { s: 0.5, rot: -0.55 * a111B(t, 43.34, 0.3) * (1 - a111B(t, 44.7, 0.4)) }); } };
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, W); a111Draw(ctx, t, ch);
  if (t > 44.95) a111Basket(ctx, 252, 905, { fill: 0, s: 0.55 });
  a111HutFront(ctx, t, { u: 0.47, door: 0.85 * (1 - a111B(t, 44.0, 0.6)) });
  // the explanation balloon: the friend with the empty bowl; coins travel to him; his face lifts
  if (a111In(t, 46.34, 49.9)) { const p = a111B(t, 46.34, 0.35, 'lin') * (1 - a111B(t, 49.55, 0.3));
    a111Balloon(ctx, 500, 455, 330, 230, p, a111W(Hh, [30, -250]), (c) => {
      c.fillStyle = '#fff3d6'; c.fillRect(-170, -120, 340, 240);
      const fr = a111P(A111_FRIEND, { x: 60, y: 105, s: 0.42, noBlink: true, mouth: t > 49.2 ? 'smile' : 'frown', drop: t > 49.2 ? 0 : 8, wet: t < 49.2 });
      fr.hL = t > 47.82 ? { w: [22, 40] } : [-20, -90]; fr.hR = [30, -96]; fr.gaze = t > 49.2 ? [-0.7, -0.2] : [0, 0.6];
      a111Draw(c, t, fr); a111Bowl(c, 112, 96, 0.4);
      const hx = -100, hy = 30; seg(c, hx - 70, hy + 14, hx - 16, hy + 2, 16, '#3f9d4a', 3.5); shape(c, ell(hx, hy, 16, 12, 14), C.white, { lw: 3.5, seed: 731, dot: C.skin, pitch: 5, rad: 0.3 });
      for (let i = 0; i < 3; i++) { const a = 47.82 + i * 0.22, u = a111B(t, a, 0.5, 'inOut'), to = fr.HL || [22, 40]; if (t > a) a111Coin(c, K.lerp(hx + 6, to[0], u), K.lerp(hy - 10, to[1] - 8 - i * 5, u) - 40 * Math.sin(Math.PI * u), 8, Math.cos(t * 9 + i)); else a111Coin(c, hx + 4, hy - 12 - i * 5, 8, 0.6); }
    }); }
}

// ---------- S9 (49.90-58.90): nothing left but a cracked platter and an old jar ----------
function a111S9(ctx, t) {
  a111HutBack(ctx, t, { u: 0.5 });
  const taken = t > 58.0;
  a111Shelf(ctx, t, { gone: taken, crack: a111B(t, 55.84, 0.5, 'lin'), prot: swing(t, 54.54, 0.12, 2.2, 2.6), chip: t > 57.12, web: 0.4 + 0.3 * a111B(t, 57.12, 0.4), sw: 0.15 * Math.sin(t * 1.3) + swing(t, 57.12, 0.5, 1.4, 1.2), jrot: swing(t, 57.12, 0.08, 2.4, 3) });
  if (a111In(t, 55.84, 56.4)) { /* tiny prop shake handled by the crack draw */ }
  a111PegPurse(ctx);
  if (a111In(t, 51.5, 52.6)) dustBurst(ctx, 835, 896, t - 51.55, 6, 8, 16, 40, 0.9, 41);
  const Hh = a111P(A111_HERO, { x: 330, y: 900 }), W = a111P(A111_WIFE, { x: 540, y: 900 }), ch = a111P(A111_CHILD, { x: 760, y: 902 });
  const look = (P, off) => gazePlan(t, [[0, [500, 900]], [49.9 + off, [520, 905]], [50.35 + off, [205, 640]], [50.8 + off, [860, 860]], [51.3 + off, [420, 760]], [54.0, [290, 470]]], 0.07);
  a111Gz(Hh, look(Hh, 0)); a111Gz(W, t < 54 ? look(W, 0.12) : t < 58.0 ? [300, 480] : a111Head(Hh));
  Hh.brow = t > 54.0 ? -0.55 : -0.3; Hh.mouth = t > 58.0 ? 'smile' : 'closed';
  Hh.hR = a111HT(t, Hh, [[0, [40, -76]], [57.9, [56, -110], 0.3]]); Hh.hL = a111HT(t, Hh, [[0, [-40, -76]], [54.0, { w: [250, 470] }, 0.3], [55.2, [-40, -76], 0.4], [57.12, { w: [330, 460] }, 0.3], [57.7, [-40, -76], 0.3], [57.9, [-56, -110], 0.3]]);
  Hh.drop = 6 * pulse(t, 58.35, 0.35); Hh.look = t > 54 && t < 58 ? -0.4 : 0;
  Hh.after = (c, Q) => { if (taken) { a111Platter(c, Q.HR[0] + 12, Q.HR[1] - 10, { r: 34, ry: 0.92, crack: 1 }); a111Jar(c, Q.HL[0] - 6, Q.HL[1] + 20, { h: 70, chip: true }); } };
  W.mouth = t > 58.2 ? 'closed' : 'frown'; W.lid = t > 58.2 ? Math.max(0.3, blink(t, 7)) : null; W.hR = [8, -112]; W.hL = [-20, -100];
  // child: flips the cotton basket, one wisp floats out
  const tip = a111B(t, 52.98, 0.4);
ch.hR = t > 52.9 && t < 54.0 ? { w: [800, 846 - 30 * tip] } : [30, -110]; ch.hL = t > 52.9 && t < 54.0 ? { w: [800, 846 - 30 * tip] } : [-30, -110];
  ch.wink = a111In(t, 53.45, 54.3) ? 'L' : null; ch.mouth = t > 53.45 ? 'frown' : 'closed'; a111Gz(ch, t < 52.9 ? look(ch, 0.24) : [830, 870]); ch.tilt = 0.12 * a111B(t, 53.4, 0.3);
  a111Draw(ctx, t, W); a111Draw(ctx, t, Hh); a111Draw(ctx, t, ch);
  a111Basket(ctx, 830, 900, { fill: 0, tip, s: 0.8 });
  if (t > 53.3) { const u = K.clamp((t - 53.3) / 3); a111Puff(ctx, 826 + 30 * Math.sin(u * 7), 900 - 260 * u, 9, 1 - u); }
  a111HutFront(ctx, t, { u: 0.5 });
}

// ---------- S14 (87.10-96.90): the fish is opened; a pearl ----------
function a111S14(ctx, t) {
  a111HutBack(ctx, t, { u: 0.4 }); a111Shelf(ctx, t, { gone: true }); a111PegPurse(ctx);
  const W = a111P(A111_WIFE, { x: 520, y: 884, kneel: 1 }), Hh = a111P(A111_HERO, { x: 360, y: 900, kneel: 1 }), ch = a111P(A111_CHILD, { x: 690, y: 902, kneel: 1 });
  const fishC = [522, 868], cut = a111B(t, 89.64, 1.3, 'lin'), open = a111B(t, 91.0, 0.6), puff = t < 89.64 ? 1 : K.lerp(1, 0.3, cut);
  const hollow = [fishC[0], fishC[1] + 10], glow = a111B(t, 93.0, 1.2) * 0.6 + 0.6 * a111B(t, 94.34, 0.3, 'back') - 0.2 * a111B(t, 95.0, 1.5);
  const pearlUp = a111B(t, 94.34, 0.55), WH = a111Head(W), pearl = [K.lerp(hollow[0], WH[0] - 54, pearlUp), K.lerp(hollow[1], WH[1] - 2, pearlUp)];
  // wife: sleeves, knife along the belly, flap open, reaches in, lifts the pearl
  const knifeAt = [fishC[0] - 38 + 76 * cut, fishC[1] + 14];
  W.hR = a111HT(t, W, [[0, [30, -110]], [87.2, [-20, -116], 0.25], [87.6, [24, -118], 0.25], [88.0, [40, -110], 0.3], [89.5, { w: knifeAt }, 0.2], [90.0, () => ({ w: knifeAt }), 0.01], [91.0, { w: [fishC[0] + 30, fishC[1] + 20] }, 0.3], [91.8, { w: [hollow[0] + 6, hollow[1] + 2] }, 0.4], [94.34, () => ({ w: [pearl[0] + 4, pearl[1] + 12] }), 0.05], [96.0, [30, -150], 0.4]]);
  W.hL = a111HT(t, W, [[0, [-30, -110]], [87.2, [20, -116], 0.25], [87.6, [-24, -118], 0.25], [88.0, { w: [fishC[0] - 50, fishC[1] - 6] }, 0.35], [94.4, [-40, -130], 0.4]]);
  W.after = (c, Q) => { a111NoseCloth(c, Q, 1.5 * a111B(t, 92.6, 0.35)); if (a111In(t, 88.1, 91.0)) a111Knife(c, Q.HR[0], Q.HR[1], -2.2); };
  W.eyes = t > 92.6 ? 'wide' : 'open'; W.mouth = t > 94.5 ? 'o' : 'closed'; W.lean = 0.1 * a111B(t, 92.6, 0.4) * (1 - a111B(t, 94.34, 0.4));
  a111Gz(W, t < 94.34 ? [fishC[0], fishC[1] + 10] : pearl);
  // hero: holds his breath, leans in, the held stare, sits back with a hand to his forehead
  Hh.lean = 0.12 * a111B(t, 88.8, 0.4) - 0.2 * a111B(t, 95.95, 0.35); Hh.sq = t < 91 && t > 88.8 ? 1.03 : 1; Hh.mouth = t > 95.2 ? 'o' : 'closed'; Hh.eyes = t > 95.2 ? 'wide' : 'open';
  Hh.lid = a111In(t, 88.8, 92.8) ? Math.max(0.3, blink(t, 3)) : null; Hh.hR = a111HT(t, Hh, [[0, [36, -90]], [95.95, A111H.forehead, 0.3]]); Hh.hL = [-36, -90];
  a111Gz(Hh, t < 94.34 ? [fishC[0], fishC[1]] : pearl); if (a111In(t, 95.0, 96.0)) Hh.noBlink = true;
  // child: peeks between fingers, the stare, points and bounces
  ch.hR = a111HT(t, ch, [[0, [30, -110]], [88.8, [12, -178], 0.3], [92.9, [30, -110], 0.3], [95.9, { w: pearl }, 0.25]]); ch.hL = a111HT(t, ch, [[0, [-30, -110]], [88.8, [-12, -178], 0.3], [92.9, [-30, -110], 0.3]]);
  ch.mouth = t > 95.06 ? 'o' : 'closed'; ch.eyes = t > 95.06 ? 'wide' : 'open'; if (a111In(t, 95.0, 96.0)) ch.noBlink = true;
  const hp = hop(t, 96.0, 0.35, 0, 0, 16); ch.y = 902 - hp[1]; ch.sq = landSquash(t, 96.35, 0.12);
  a111Gz(ch, t < 94.34 ? fishC : pearl);
  if (a111In(t, 95.0, 96.0)) W.noBlink = true;
  const glowAt = t < 94.34 ? hollow : pearl, glowR = (34 + 22 * a111B(t, 94.34, 0.4)) * (t < 94.34 ? 1 : 0.6);
  const drawGlow = () => { if (glow > 0.01) { ctx.save(); ctx.globalAlpha = 0.85; a111Glow(ctx, glowAt[0], glowAt[1], glowR, glow, t, { col: 'white', rays: 10 }); ctx.restore(); } };
  a111Arms(W); if (t >= 94.34) drawGlow();
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, W); a111Draw(ctx, t, ch);
  // the board and the fish in front of the wife
  shape(ctx, [[420, 904], [624, 904], [634, 924], [410, 924], [420, 904]], WOOD, { lw: 4.5, seed: 732, dot: BARKY, pitch: 8, rad: 0.18, da: 0.4 });
  a111Fish(ctx, fishC[0], fishC[1], { s: 0.62, puff, open, cut: t < 91 ? cut : 0, tail: 0.1 * Math.sin(t * 2) * (1 - cut) });
  a111Stink(ctx, fishC[0] + 60, fishC[1] - 20, t, t < 89.64 ? 0.9 : K.lerp(0.9, 0.2, cut) * (1 - a111B(t, 93.0, 0.5)), { n: 2, h: 90, flies: 1 });
  if (t < 94.34) drawGlow(); if (glow > 0.01) for (const P of [W, Hh, ch]) a111FaceLight(ctx, P, glow * 0.8, '#fff6c8');
  if (t > 94.2) { a111Pearl(ctx, pearl[0], pearl[1], 15, { glint: a111B(t, 94.34, 0.3) * (1 - a111B(t, 95.2, 0.6)), grot: t }); if (a111In(t, 95.06, 95.95)) { for (const P of [W, Hh, ch]) { const h = a111Head(P), s = a111S(P) * (P.child ? 1.25 : 1); for (const sd of [-1, 1]) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(h[0] + sd * 13 * s + 2, h[1] - 6 * s, 2.6 * s, 0, 7); ctx.fill(); } } } }
  a111HutFront(ctx, t, { u: 0.4 });
}

// ---------- S15 (96.90-102.30): insert: the pearl and one eye; never drilled ----------
function a111S15(ctx, t) {
  ctx.fillStyle = '#e8b25a'; ctx.fillRect(0, 0, 1000, 1230); ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = dotPat(ctx, C.blue, 14, 0.2); ctx.fillRect(0, 0, 1000, 1230); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.moveTo(1000, 0); ctx.lineTo(1000, 520); ctx.lineTo(380, 1230); ctx.lineTo(80, 1230); ctx.lineTo(760, 0); ctx.closePath(); ctx.fill(); ctx.restore();
  const drift = 6 * Math.sin((t - 96.9) * 0.9), px = 680 + drift, py = 540 - drift * 0.5, r = 165;
  const wide = t > 101.7, Hh = a111P(A111_HERO, { x: 250 + drift * 0.4, y: 1500, s: 5, noBlink: !wide, wink: wide ? null : 'L', eyes: wide ? 'wide' : 'open', mouth: wide ? 'o' : 'closed', look: 0.6 });
  Hh.lid = wide ? (a111In(t, 101.95, 102.25) ? Math.sin(Math.PI * (t - 101.95) / 0.3) : 0) : 0; a111Gz(Hh, [px, py]); Hh.hR = [37, -58]; Hh.hL = [-37, -58];
  a111Draw(ctx, t, Hh);
  const hl = -2.3 + 2.4 * a111B(t, 98.2, 1.7, 'inOut') + 1.2 * a111B(t, 100.0, 1.0);
  a111Pearl(ctx, px, py, r, { hl, band: 0.6 + (t - 96.9) * 0.8 });
  // the ghost drill hole: dashed, a thread, a question; crossed out on the word "pierced"
  if (t > 100.0) { const k = a111B(t, 100.0, 0.3), hx = px + 62, hy = py - r * 0.74; ctx.save(); ctx.globalAlpha = k * (1 - 0.5 * a111B(t, 101.7, 0.4)); ctx.setLineDash([10, 8]); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.ellipse(hx, hy, 18, 10, 0, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx + 60, hy - 120, hx + 150, hy - 150); ctx.stroke(); ctx.restore();
    if (t < 100.9) sfx(ctx, '?', hx + 120, hy - 80, 90, a111B(t, 100.1, 0.3), { fill: C.red });
    a111Cross(ctx, hx, hy, 44, a111B(t, 100.9, 0.3, 'lin')); }
  // his fingers hold it from below and close round it at the end
  const close = a111B(t, 101.75, 0.55);
  for (let i = 0; i < 4; i++) { const a = Math.PI * (0.62 - i * 0.08) - close * (1.2 - i * 0.12), fx = px + Math.cos(a) * (r + 6), fy = py + Math.sin(a) * (r + 6);
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(a + Math.PI / 2); shape(ctx, ell(0, 0, 34, 20, 18), C.white, { lw: 5, seed: 733 + i, dot: C.skin, pitch: 7, rad: 0.3 }); ctx.restore(); }
  shape(ctx, ell(px - 40, py + r + 70, 120, 70, 28), C.white, { lw: 6, seed: 737, dot: C.skin, pitch: 7, rad: 0.3 });
}

// ---------- S27 (169.90-173.30): the same room, comfortable now ----------
function a111S27(ctx, t) {
  const pop = (i) => K.ease.back(K.clamp((t - 169.9 - i * 0.12) / 0.3));
  a111HutBack(ctx, t, { u: 0.3, lamp: pop(1) > 0.5 ? 1 : 0 });
  ctx.save(); const k0 = pop(2); if (k0 > 0) { ctx.translate(330, 520); ctx.scale(k0, k0); ctx.translate(-330, -520); a111Shelf(ctx, t, { rich: true }); } ctx.restore();
  if (pop(3) > 0) { ctx.save(); ctx.globalAlpha = K.clamp(pop(3)); a111Carpet(ctx, 260, 780, 902); ctx.restore(); }
  seatStool(ctx, 800, 900); a111Distaff(ctx, 852, 896, { fill: 1, rot: 0.32 }); a111Spindle(ctx, 815, 848, { len: 6, spin: 0, fill: 0.9 });
  a111Sack(ctx, 236, 902, 0.38, {}); a111Basket(ctx, 880, 900, { fill: 1, s: 0.8 });
  const Hh = a111P(A111_HERO_RICH, { x: 330, y: 900, sit: 1, seat: 'floor', mouth: 'smile' }), W = a111P(A111_WIFE, { x: 680, y: 900, kneel: 1, mouth: 'smile' }), ch = a111P(A111_CHILD, { x: 520, y: 886, sit: 1, seat: 'floor', mouth: 'smile' });
  shape(ctx, ell(262, 858, 34, 46, 20), C.yellow, { lw: 5, seed: 738, dot: C.red, pitch: 8, rad: 0.25, da: 0.4 });
  Hh.lean = -0.12 * a111B(t, 172.28, 0.5); Hh.hR = a111HT(t, Hh, [[0, [30, -100]], [172.2, A111H.foldR, 0.4]]); Hh.hL = a111HT(t, Hh, [[0, [-30, -100]], [172.3, A111H.foldL, 0.4]]);
  Hh.lid = t > 172.4 ? Math.max(0.5, blink(t, 3)) : null; Hh.sq = breathe(t, 2, 0.02); a111Gz(Hh, t < 172.3 ? a111Head(ch) : [500, 700]);
  ch.hR = a111HT(t, ch, [[0, [30, -110]], [171.0, A111H.mouth, 0.25], [171.5, [36, -120], 0.3]]); ch.talk = a111In(t, 171.6, 172.6) ? 0.9 * Math.abs(Math.sin(t * 12)) : 0; ch.y = 886 - 4 * Math.abs(Math.sin((t - 171.6) * 9)) * (a111In(t, 171.6, 172.6) ? 1 : 0);
  ch.after = (c, Q) => { if (t > 170.9 && t < 171.4) a111Date(c, Q.HR[0], Q.HR[1] - 4, 1.2); }; a111Gz(ch, a111Head(W)); ch.lid = t > 171.6 && t < 172.6 ? 0.6 : null;
  W.hR = a111HT(t, W, [[0, [40, -120]], [171.2, [56, -150], 0.3], [172.4, [40, -120], 0.3]]); W.hL = [-20, -120]; a111Gz(W, [600, 890]);
  W.after = (c, Q) => { const tilt = a111B(t, 171.2, 0.3) * (1 - a111B(t, 172.4, 0.3)); c.save(); c.translate(Q.HR[0], Q.HR[1] + 10); c.rotate(-0.9 * tilt); shape(c, [[-12, 0], [-20, 22], [-10, 44], [10, 44], [20, 22], [12, 0], [-12, 0]], '#e8742a', { lw: 4, seed: 739, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 }); c.restore();
    if (tilt > 0.6) { c.save(); c.lineWidth = 5; c.strokeStyle = '#9ec2ff'; c.beginPath(); c.moveTo(Q.HR[0] - 18, Q.HR[1] + 10); c.lineTo(600, 892); c.stroke(); c.restore(); } shape(c, [[588, 900], [612, 900], [608, 880], [592, 880], [588, 900]], C.blue, { lw: 3, seed: 740 }); };
  a111Draw(ctx, t, Hh); a111Draw(ctx, t, ch); a111Draw(ctx, t, W);
  if (pop(4) > 0) { ctx.save(); ctx.translate(520, 915); ctx.scale(pop(4), pop(4)); a111Tray(ctx, 0, 0, { s: 0.95, bread: 2, dates: 5, fruit: true }); ctx.restore(); }
  a111HutFront(ctx, t, { u: 0.3, lamp: 1 });
}
