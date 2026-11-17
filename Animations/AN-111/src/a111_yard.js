// ===== AN-111 yard: outside the home (S5, S7, S13, S19-S26, S28). S19-S26 and S28 use one position function per character =====
const A111_YARD = { cottage: { x0: 600, x1: 1012, top: 520, door: [700, 800, 640], win: [862, 962, 600, 700], chimney: [905, 945, 380] } };
const a111Yard = (ctx, t, o = {}) => villageYard(ctx, { ...A111_YARD, t, ...o });
const A111_SACKS4 = [478, 512, 554, 588];
// the wife (and optionally the child) standing in the doorway, clipped by the door frame
function a111Doorway(t, W) { return (c) => { a111Draw(c, t, W); }; }

// ---------- S5 (20.60-24.00): dawn; he sets out ----------
const A111_S5X = a111X([[22.3, 752], [23.95, 230]]);
function a111S5(ctx, t) {
  const door = t < 21.82 ? 0 : settleTo(t, 21.82, 0, 0.85, 0.6, 0.12);
  const W = a111P(A111_WIFE, { x: 752, y: 902, mouth: 'smile' }); W.hR = t > 22.9 ? [60 + 8 * Math.sin(t * 13), -196] : [30, -100]; a111Gz(W, [500, 800]);
  a111Yard(ctx, t, { u: K.lerp(0.0, 0.06, a111B(t, 20.6, 3.4, 'lin')), door, inside: (c) => { c.fillStyle = '#ffd98a'; c.globalAlpha = 0.25; c.fillRect(700, 640, 100, 260); c.globalAlpha = 1; if (t > 22.6) a111Draw(c, t, W); } });
  const ch = a111P(A111_CHILD, { x: 818, y: 904, mouth: 'smile' }); ch.hR = t > 23.0 + a111St(1) ? [58 + 8 * Math.sin(t * 15 + 1), -192] : [30, -110]; a111Gz(ch, [400, 820]);
  if (t > 22.75) a111Draw(ctx, t, ch);
  if (t > 22.3) { const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S5X, t), mouth: 'smile' }); Hh.hR = [40, -76]; Hh.look = t < 22.9 ? 0.5 : -0.4;
    Hh.hL = a111In(t, 22.6, 23.1) ? [-62 - 8 * Math.sin(t * 14), -190] : [-36, -72]; a111Gz(Hh, t < 23.1 ? [790, 760] : [0, 800]);
    Hh.after = (c, Q) => { a111Basket(c, Q.HR[0], Q.HR[1] + 30, { fill: 0, s: 0.5 }); a111Skein(c, Q.HR[0], Q.HR[1] + 2, { n: 3, s: 0.55 }); }; a111Draw(ctx, t, Hh); }
}

// ---------- S7 (37.00-41.80): dusk; home with nothing ----------
const A111_S7X = a111X([[37.0, -80], [40.2, 640]]);
function a111S7(ctx, t) {
  a111Yard(ctx, t, { u: 0.46, door: 0, winLit: 1, winInside: (c) => { c.fillStyle = '#5b3010'; c.beginPath(); c.arc(900, 640, 16, 0, 7); c.fill(); c.beginPath(); c.ellipse(900, 700, 30, 28, 0, Math.PI, 0); c.fill(); } });
  const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S7X, t) }); if (Hh.amp) Hh.amp *= 0.7;
  Hh.hR = t < 40.9 ? [38 + 3 * Math.sin(t * 5), -74] : a111HT(t, Hh, [[40.9, [38, -74]], [41.1, { w: [790, 770] }, 0.45]]); Hh.hL = [-36, -74];
  Hh.drop = t < 40.2 ? 6 : 6 * (1 - a111B(t, 40.6, 0.6)); Hh.lid = a111In(t, 40.45, 41.0) ? 1 : t < 40.2 ? Math.max(0.35, blink(t, 3)) : null; Hh.sq = 1 + 0.03 * pulse(t, 40.3, 0.9);
  a111Gz(Hh, t < 40.9 ? [Hh.x + 60, 905] : [750, 700]); Hh.mouth = 'closed'; Hh.brow = -0.45;
  Hh.after = (c, Q) => { c.save(); c.translate(Q.HR[0], Q.HR[1]); c.rotate(swing(t, 40.2, 0.25, 1.4, 2) + (t < 40.2 ? 0.08 * Math.sin(Hh.ph) : 0)); a111Basket(c, 0, 34, { fill: 0, s: 0.5 }); c.restore(); };
  a111Draw(ctx, t, Hh);
  const gx = Math.min(Hh.x, 640) + 70;
  if (a111In(t, 39.4, 41.6)) { ctx.save(); ctx.globalAlpha = a111Fade(t, 39.4, 41.6, 0.25); a111Ghost(ctx, 'bread', gx - 20, 600, a111B(t, 39.5, 0.3, 'lin'), a111B(t, 39.85, 0.3, 'lin')); a111Ghost(ctx, 'cotton', gx + 90, 560, a111B(t, 40.7, 0.3, 'lin'), a111B(t, 41.0, 0.3, 'lin')); ctx.restore(); }
}

// ---------- S13 (84.60-87.10): home with the fish; the child skids at the smell ----------
const A111_S13X = a111X([[84.6, 120], [86.0, 450]]), A111_S13CX = a111X([[85.8, 790], [86.22, 600]]);
function a111S13(ctx, t) {
  const W = a111P(A111_WIFE, { x: 752, y: 902 }); const laugh = t > 86.4;
  W.hR = laugh ? A111H.mouth : [30, -100]; W.lid = laugh ? 0.8 : null; W.drop = laugh ? 3 * Math.abs(Math.sin(t * 16)) : 0; a111Gz(W, [450, 820]); W.mouth = laugh ? 'smile' : 'closed';
  a111Yard(ctx, t, { u: 0.36, door: 0.85, inside: (c) => { c.fillStyle = '#ffd98a'; c.globalAlpha = 0.25; c.fillRect(700, 640, 100, 260); c.globalAlpha = 1; a111Draw(c, t, W); } });
  const Hh = a111P(A111_HERO, { y: 900, ...a111Walk(A111_S13X, t) }); Hh.hR = [96, -150]; Hh.hL = [-36, -74]; Hh.look = -0.6; Hh.lid = 0.7; Hh.mouth = 'closed';
  Hh.after = (c, Q) => { const h = Q.HR; c.save(); c.translate(h[0], h[1]); c.rotate(1.15 + 0.15 * Math.sin(t * 7)); a111Fish(c, 70, 0, { s: 0.7, puff: 1, tail: 0.3 * Math.sin(t * 5) }); c.restore(); a111Stink(c, h[0] + 20, h[1] + 10, t, 1, { n: 3, h: 130 }); };
  a111Draw(ctx, t, Hh);
  const ch = a111P(A111_CHILD, { y: 904, ...a111Walk(A111_S13CX, t, 0.6) }), skid = t > 86.22;
  ch.eyes = skid ? 'wide' : 'open'; ch.hR = skid ? [10, -186] : [30, -110]; ch.tip = skid ? 0.12 * Math.exp(-(t - 86.22) * 5) : -0.05; ch.mouth = skid ? 'closed' : 'smile'; ch.sq = skid ? landSquash(t, 86.22, 0.12) : 1;
  a111Gz(ch, a111Head(Hh)); a111Draw(ctx, t, ch);
  if (a111In(t, 86.2, 87.0)) { dustBurst(ctx, 600, 900, t - 86.22, 7, 8, 18, 46, 0.8, 51); }
}

// ---------- S19-S26 shared positions ----------
const A111_HX = a111X([[127.8, -90], [129.6, 380], [133.4, 380], [133.8, 330], [134.6, 430], [144.0, 430], [146.55, 430], [146.85, 470], [150.06, 470], [150.4, 495], [162.85, 495], [163.15, 450]]);
function a111HeroYard(t) {
  const P = a111P(A111_HERO, { y: 900, ...a111Walk(A111_HX, t) });
  return P;
}
function a111BeggarYard(t) {
  const P = a111P(A111_BEGGAR, { x: 645, y: 902 }), up = a111B(t, 135.74, 0.7);
  P.sit = 1 - up; P.seat = 'floor'; if (t > 136.0) { const sx = a111X([[136.0, 645], [136.5, 640]]); Object.assign(P, a111Walk(sx, t, 0.6)); }
  const straight = a111B(t, 155.64, 1.3); P.lean = -0.096 * straight; P.drop = 10 * (1 - straight) * (t > 135.74 ? 1 : 1.4); P.tip = 0;
  return P;
}
// the sacks: 3 carried (S19), set down at the hero's feet (S20-S21), four in a row (S22 on), one pair offered and pushed back, dropped as he kneels
function a111SackSpots(t) {
  if (t < 144.0) return [[478, 902], [516, 902], [554, 902]];
  const lifted = t > 146.6, dropped = t > 163.0;
  const out = [[A111_SACKS4[0], 902], [A111_SACKS4[1], 902]];
  if (!lifted) out.push([A111_SACKS4[2], 902], [A111_SACKS4[3], 902]); else if (dropped) out.push([546, 904], [584, 906]);
  return out;
}

// ---------- S19 (127.80-133.80): home with a fortune ----------
function a111S19(ctx, t) {
  a111Yard(ctx, t, { u: 0.3, door: 0 });
  const B = a111BeggarYard(t); B.lid = 1; B.drop = 16; B.hR = [26, -98]; B.hL = [-26, -98]; B.gaze = [0, 1]; a111Draw(ctx, t, B);
  const Hh = a111HeroYard(t), carry = t < 129.6 || t > 133.1, peek = a111In(t, 129.74, 131.6);
  Hh.tip = carry ? 0.1 : 0; Hh.drop = carry ? 6 : 0; Hh.mouth = peek ? 'open' : 'smile';
  if (carry) { Hh.hR = [44, -170]; Hh.hL = [-44, -170]; }
  else { Hh.hR = a111HT(t, Hh, [[129.6, [44, -170]], [129.62, { w: [530, 820] }, 0.3], [130.6, [40, -76], 0.4], [133.0, [44, -170], 0.3]]); Hh.hL = a111HT(t, Hh, [[129.6, [-44, -170]], [129.62, [-36, -76], 0.3], [131.84, A111H.chestL, 0.3], [133.0, [-44, -170], 0.3]]); }
  Hh.lean = peek ? 0.3 * a111B(t, 129.74, 0.3) * (1 - a111B(t, 131.2, 0.4)) : 0; Hh.look = peek ? 0.4 * Math.sin((t - 130.0) * 9) * a111B(t, 130.0, 0.2) : 0;
  Hh.lid = a111In(t, 132.3, 132.7) ? 1 : null; Hh.sq = anticipate(t, 132.95, 0.25, 0.06);
  a111Gz(Hh, t < 129.6 ? [Hh.x + 200, 820] : t < 131.84 ? [516, 870] : [480, 300]);
  const back = (c, Q) => { if (!carry) return; const sh = a111W(Q, [0, -160]); a111Sack(c, sh[0] - 14, sh[1] + 70, 0.4, {}); };
  back(ctx, Hh);
  Hh.after = (c, Q) => { if (!carry) return; const a = a111W(Q, [-70, -172]), b = a111W(Q, [70, -172]); seg(c, a[0], a[1], b[0], b[1], 8, WOOD, 3); const bob = Math.sin(Q.ph * 2 - 0.6) * 4;
    for (const [p, i] of [[a, 0], [b, 1]]) { c.lineWidth = 2.5; c.strokeStyle = C.black; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0], p[1] + 24 + bob); c.stroke(); a111Sack(c, p[0], p[1] + 76 + bob, 0.3, { rot: 0.05 * Math.sin(Q.ph + i) }); } };
  a111Draw(ctx, t, Hh);
  if (!carry) { for (const [x, y] of [[478, 902], [516, 902], [554, 902]]) a111Sack(ctx, x, y, 0.27, { open: x === 516 && peek ? 1 : 0 }); if (peek) { a111Glow(ctx, 516, 856, 70, a111B(t, 129.8, 0.4), t, { col: 'gold' }); a111FaceLight(ctx, Hh, a111B(t, 129.8, 0.4)); } }
  if (t < 129.6) for (const f of [128.1, 128.5, 128.9, 129.3]) dustBurst(ctx, A111_HX(f) + 10, 900, t - f, 4, 6, 12, 24, 0.5, Math.round(f * 10));
  // thought cloud: the worthless fish turns into coins
  if (a111In(t, 130.64, 133.0)) { const p = a111B(t, 130.64, 0.6, 'lin') * (1 - a111B(t, 132.7, 0.3));
    thoughtCloud(ctx, 640, 470, 380, 270, t, { p, tail: a111Head(Hh), scale: 1, at: [0, 0], bg: '#fff3d6', inside: (c) => { const sw = a111B(t, 131.3, 0.25, 'back');
      if (sw < 0.5) a111Fish(c, 0, 10, { s: 0.9 * (1 - sw * 2), puff: 1 }); else { c.save(); c.scale(sw, sw); a111CoinPile(c, -20, 50, 10, 16); a111CoinPile(c, 50, 50, 6, 16); c.restore(); a111Glow(c, 0, 20, 90, (sw - 0.5) * 2, t, { col: 'gold', stars: false }); } } }); }
}

// ---------- S20 (133.80-139.80): the poor man at the door ----------
function a111S20(ctx, t) {
  a111Yard(ctx, t, { u: 0.32, door: 0 });
  const B = a111BeggarYard(t), Hh = a111HeroYard(t), carry = t < 134.6;
  B.lid = t < 135.74 ? 1 : t < 137.4 ? Math.max(0.4, blink(t, 23)) : null; B.wet = t > 137.4; B.talk = a111In(t, 137.6, 138.6) ? a111Talk(t, 0.5, 4) : 0; B.mouth = 'frown';
  B.hL = a111HT(t, B, [[0, [-26, -98]], [137.38, { w: [566, 798] }, 0.5]]); B.hR = [30, -96]; if (a111In(t, 136.5, 139.9)) B.x += tremble(t, 0.8, 8);
  a111Gz(B, t < 137.38 ? [B.x - 40, 905] : gazePlan(t, [[137.38, [560, 900]], [138.0, a111Head(Hh)]], 0.6));
  Hh.mouth = t < 138.7 ? 'smile' : 'closed'; Hh.brow = blend(t, 138.7, 139.2, -0.2, -0.6); Hh.sq = 1 + 0.02 * Math.sin(t * 9) * (1 - a111B(t, 135.5, 1));
  if (carry) { Hh.hR = [44, -170]; Hh.hL = [-44, -170]; Hh.tip = 0.1; Hh.drop = 6; }
  else { Hh.hR = a111HT(t, Hh, [[134.6, [44, -170]], [134.62, { w: [516, 860] }, 0.3], [135.1, A111H.forehead, 0.3], [135.6, [40, -78], 0.3], [138.2, [80, -160], 0.5]]); Hh.hL = a111HT(t, Hh, [[134.6, [-44, -170]], [134.62, [-36, -78], 0.3]]); }
  if (t > 138.7) Hh.hR = [80, -160];
  a111Gz(Hh, t < 138.7 ? [760, 760] : a111Head(B)); Hh.look = t > 138.7 ? 0.4 : 0.3;
  Hh.after = (c, Q) => { if (!carry) return; const a = a111W(Q, [-70, -172]), b = a111W(Q, [70, -172]); seg(c, a[0], a[1], b[0], b[1], 8, WOOD, 3); for (const p of [a, b]) { c.lineWidth = 2.5; c.strokeStyle = C.black; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0], p[1] + 24); c.stroke(); a111Sack(c, p[0], p[1] + 76, 0.3, {}); } };
  if (carry) { const sh = a111W(Hh, [0, -160]); a111Sack(ctx, sh[0] - 14, sh[1] + 70, 0.4, {}); }
  a111Draw(ctx, t, B); a111Draw(ctx, t, Hh);
  if (!carry) for (const [x, y] of a111SackSpots(t)) a111Sack(ctx, x, y, 0.27, {});
}

// ---------- S21 (139.80-144.00): he remembers ----------
function a111S21(ctx, t) {
  a111Yard(ctx, t, { u: 0.33, door: 0 });
  const B = a111BeggarYard(t), Hh = a111HeroYard(t);
  B.hL = { w: [566, 798] }; B.hR = [30, -96]; B.wet = true; B.mouth = 'frown'; B.x += tremble(t, 0.8, 8); a111Gz(B, a111Head(Hh));
  Hh.hR = [40, -78]; Hh.hL = [-36, -78]; Hh.brow = -0.6; Hh.lid = t < 143.5 ? 0.3 : null; Hh.wet = t > 143.0; Hh.drop = 4 * pulse(t, 143.7, 0.3);
  a111Gz(Hh, t < 139.84 ? a111Head(B) : t < 143.5 ? gazePlan(t, [[139.84, a111Head(B)], [140.0, [620, 470]]], 0.9) : a111Head(B));
  if (a111In(t, 143.6, 143.8)) Hh.lid = 1;
  a111Draw(ctx, t, B); a111Draw(ctx, t, Hh);
  for (const [x, y] of a111SackSpots(t)) a111Sack(ctx, x, y, 0.27, {});
  if (a111In(t, 140.9, 144.0)) { const p = a111B(t, 140.9, 0.7, 'lin') * (1 - a111B(t, 143.75, 0.25));
    thoughtCloud(ctx, 590, 520, 290, 205, t, { p, tail: a111Head(Hh), scale: 0.3, at: [640, 760], bg: '#dfe8ff', lw: 8, inside: (c) => {
      if (t < 143.0) { a111Mkt(c, t, null, A111_MKT_B); const sink = 14 * a111B(t, 142.42, 0.3) + 16 * a111B(t, 142.75, 0.3); const P = a111P(A111_HERO, { x: 640, y: 900, mouth: 'closed', lid: 0.4, sq: 0.97 }); P.hR = [70 - sink, -138 + 2 * sink]; P.hL = [-70 + sink, -138 + 2 * sink]; P.gaze = [0, 0.5];
        P.after = (k, Q) => { a111Platter(k, Q.HR[0] + 10, Q.HR[1] - 18, { r: 34, ry: 0.92, crack: 1 }); a111Jar(k, Q.HL[0] - 6, Q.HL[1] + 22, { h: 70, chip: true }); }; a111Draw(c, t, P);
        const L = a111P(A111_LADY, { x: K.lerp(900, 380, a111B(t, 141.9, 1.1, 'lin')), y: 895, ph: t * 7, amp: 1 }); L.dir = -1; a111Draw(c, t, L); }
      else { a111HutBack(c, t, { u: 0.47 }); const k = a111P(A111_CHILD, { x: 640, y: 902, s: 1.3, mouth: 'o', wet: true, tilt: -0.12 }); k.hR = [34, -130]; k.hL = [-34, -130]; k.gaze = [0, -0.6];
        k.after = (q, Q) => a111Tray(q, (Q.HL[0] + Q.HR[0]) / 2, Q.HL[1] - 2, { s: 0.6, rot: -0.5 }); a111Draw(c, t, k); }
      c.save(); c.globalAlpha = 0.18; c.fillStyle = C.blue; c.fillRect(0, 0, 1600, 1230); c.restore(); } }); }
}

// ---------- S22 (144.00-150.90): he divides the fortune and offers half ----------
function a111S22(ctx, t) {
  a111Yard(ctx, t, { u: 0.34, door: 0 });
  const B = a111BeggarYard(t), Hh = a111HeroYard(t), kneel = t < 146.52 ? a111B(t, 144.0, 0.25) : 1 - a111B(t, 146.52, 0.3), offer = t > 146.6;
  B.hL = a111HT(t, B, [[0, { w: [566, 798] }], [146.4, [-30, -96], 0.5]]); B.hR = [30, -96]; B.wet = t < 149; B.mouth = 'closed';
  B.drop = t < 148.7 ? 10 : 10 * (1 - a111B(t, 148.7, 0.5)); B.lid = t < 148.7 ? Math.max(0.4, blink(t, 23)) : null; a111Gz(B, t < 148.7 ? [520, 880] : t < 149.2 ? [Hh.HR ? Hh.HR[0] : 540, 800] : a111Head(Hh));
  Hh.kneel = kneel; Hh.lean = 0.5 * kneel * (t < 145.7 ? 1 : 1 - a111B(t, 145.7, 0.4)); Hh.sq = t > 146.52 ? anticipate(t, 146.4, 0.2, 0.05) * settleTo(t, 146.9, 0.95, 1, 0.4, 0.05) : 1;
  const line = a111B(t, 144.3, 1.2, 'lin');
  Hh.hR = offer ? a111HT(t, Hh, [[146.6, { w: [552, 820] }], [146.62, { w: [548, 792] }, 0.4]]) : a111HT(t, Hh, [[0, [40, -78]], [144.0, () => ({ w: [533, 872 + 50 * line] }), 0.3], [145.6, [40, -100], 0.4]]);
  Hh.hL = offer ? a111HT(t, Hh, [[146.6, [-20, -110]], [146.62, { w: [512, 796] }, 0.4]]) : [-36, -80];
  Hh.mouth = t > 147.0 ? 'smile' : 'closed'; Hh.brow = t > 147 ? -0.15 : -0.4; Hh.drop = 5 * pulse(t, 147.1, 0.35) + 6 * pulse(t, 150.2, 0.35);
  a111Gz(Hh, t < 146.6 ? [533, 900] : a111Head(B)); Hh.look = t > 146.6 ? 0.4 : 0.2;
  Hh.after = (c, Q) => { if (offer) { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Sack(c, m[0] - 18, m[1] + 48, 0.27, {}); a111Sack(c, m[0] + 20, m[1] + 50, 0.27, {}); } };
  a111Draw(ctx, t, B); a111Draw(ctx, t, Hh);
  if (t > 144.25 && t < 147.5) { ctx.save(); ctx.globalAlpha = 1 - a111B(t, 147.0, 0.4); ctx.setLineDash([12, 9]); ctx.lineWidth = 6; ctx.strokeStyle = '#7a4212'; ctx.beginPath(); ctx.moveTo(533, 872); ctx.lineTo(533, 872 + 64 * line); ctx.stroke(); ctx.restore(); }
  for (const [x, y] of a111SackSpots(t)) a111Sack(ctx, x, y, 0.27, {});
  if (t > 144.25 && t < 147.5) { ctx.save(); ctx.globalAlpha = 1 - a111B(t, 147.0, 0.4); ctx.setLineDash([12, 9]); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(533, 905); ctx.lineTo(533, Math.max(905, 872 + 70 * line)); ctx.stroke(); ctx.restore(); }
}

// ---------- S23 (150.90-155.60): the family sees; the wife's small nod ----------
function a111S23(ctx, t) {
  const W = a111P(A111_WIFE, { x: 752, y: 902 }), B = a111BeggarYard(t), Hh = a111HeroYard(t);
  W.hR = a111HT(t, W, [[0, [30, -100]], [151.84, A111H.mouth, 0.3], [154.48, [30, -100], 0.5]]); W.hL = [-30, -100];
  W.drop = 8 * pulse(t, 154.6, 0.45); W.mouth = t > 154.8 ? 'smile' : 'closed'; W.wet = a111In(t, 152, 154.6);
  a111Gz(W, gazePlan(t, [[0, [520, 800]], [151.9, [530, 800]], [152.4, () => a111Head(Hh)], [152.8, () => a111Head(B)], [153.9, () => a111Head(Hh)]], 0.15));
  a111Yard(ctx, t, { u: 0.35, door: a111B(t, 150.9, 0.8) * 0.85, inside: (c) => { c.fillStyle = '#ffd98a'; c.globalAlpha = 0.25; c.fillRect(700, 640, 100, 260); c.globalAlpha = 1; a111Draw(c, t, W); } });
  B.hL = [-30, -96]; B.hR = [30, -96]; B.drop = 0; B.mouth = 'closed'; a111Gz(B, a111Head(Hh));
  Hh.hR = { w: [548, 792] }; Hh.hL = { w: [512, 796] }; Hh.mouth = 'smile'; Hh.brow = -0.15; Hh.look = a111In(t, 154.7, 154.85) ? -0.2 : 0.4;
  a111Gz(Hh, a111In(t, 154.6, 154.85) ? a111Head(W) : a111Head(B));
  Hh.after = (c, Q) => { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Sack(c, m[0] - 18, m[1] + 48, 0.27, {}); a111Sack(c, m[0] + 20, m[1] + 50, 0.27, {}); };
  a111Draw(ctx, t, B); a111Draw(ctx, t, Hh);
  for (const [x, y] of a111SackSpots(t)) a111Sack(ctx, x, y, 0.27, {});
  const ch = a111P(A111_CHILD, { x: 836, y: 906 }); ch.hR = a111In(t, 153.32, 154.6) ? [8 + 8 * Math.sin(t * 14), -96] : [30, -110]; ch.mouth = t > 153.3 && t < 154.9 ? 'frown' : 'closed';
  a111Gz(ch, t < 153.6 ? [520, 820] : a111Head(W)); a111Draw(ctx, t, ch);
}

// ---------- S24 (155.60-160.00): the stoop leaves him; he gives the money back ----------
function a111S24(ctx, t) {
  a111Yard(ctx, t, { u: 0.36, door: 0.85, inside: (c) => { const W = a111P(A111_WIFE, { x: 752, y: 902, mouth: 'smile' }); W.hR = [30, -100]; a111Gz(W, [600, 760]); a111Draw(c, t, W); } });
  const B = a111BeggarYard(t), Hh = a111HeroYard(t), push = a111B(t, 158.2, 0.9);
  const held = a111Mix([530, 794], [492, 812], push);
  B.hL = a111HT(t, B, [[0, [-30, -96]], [157.24, [-40, -196], 0.3], [158.1, () => ({ w: [held[0] + 14, held[1] - 20] }), 0.25]]); B.hR = a111HT(t, B, [[0, [30, -96]], [158.1, () => ({ w: [held[0] + 40, held[1] - 14] }), 0.3]]);
  B.mouth = 'smile'; B.lid = t > 157.2 ? Math.max(0.3, blink(t, 23)) : null; a111Gz(B, a111Head(Hh));
  Hh.hR = { w: [held[0] + 18, held[1] - 4] }; Hh.hL = { w: [held[0] - 18, held[1]] }; Hh.mouth = t > 159.3 ? 'o' : 'smile'; Hh.brow = t > 159.3 ? -0.8 : -0.15; Hh.tilt = 0.15 * a111B(t, 159.5, 0.3);
  a111Gz(Hh, t < 159.3 ? a111Head(B) : t < 159.7 ? [held[0], held[1] + 30] : a111Head(B)); Hh.look = 0.4;
  Hh.after = (c, Q) => { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Sack(c, m[0] - 18, m[1] + 48, 0.27, {}); a111Sack(c, m[0] + 20, m[1] + 50, 0.27, {}); };
  a111Draw(ctx, t, B); a111Draw(ctx, t, Hh);
  for (const [x, y] of a111SackSpots(t)) a111Sack(ctx, x, y, 0.27, {});
}

// ---------- S25 (160.00-167.80): a messenger sent to test him ----------
function a111S25(ctx, t) {
  a111Yard(ctx, t, { u: 0.37, door: 0.85, inside: (c) => { const W = a111P(A111_WIFE, { x: 752, y: 902, mouth: 'o', eyes: 'wide' }); W.hR = A111H.mouth; a111Gz(W, [640, 600]); a111Draw(c, t, W); } });
  const B = a111BeggarYard(t), Hh = a111HeroYard(t), bleach = a111B(t, 161.3, 1.4, 'lin'), gone = a111B(t, 165.16, 0.4), cone = a111B(t, 161.3, 0.8) * (1 - a111B(t, 166.6, 1.0));
  a111Cone(ctx, 640, 905, cone, t);
  B.hL = a111HT(t, B, [[0, [-30, -96]], [160.04, A111H.chestL, 0.3], [161.6, [-40, -96], 0.4]]); B.hR = [30, -96]; B.talk = a111In(t, 160.04, 161.2) ? a111Talk(t, 0.6, 5) : 0; B.mouth = 'smile'; B.lid = 0.3; a111Gz(B, a111Head(Hh));
  // hero: steps back, kneels, the sacks slide down, shades his eyes, watches the light rise
  const kneel = a111B(t, 163.0, 0.6); Hh.kneel = kneel; const held = [492, 812];
  Hh.hR = t < 162.8 ? { w: [held[0] + 18, held[1] - 4] } : a111HT(t, Hh, [[162.8, [40, -110]], [163.4, [36, -210], 0.35], [165.3, [44, -150], 0.5]]);
  Hh.hL = t < 162.8 ? { w: [held[0] - 18, held[1]] } : a111HT(t, Hh, [[162.8, [-40, -110]], [163.2, [-36, -80], 0.4]]);
  Hh.eyes = t > 161.5 ? 'wide' : 'open'; Hh.mouth = t > 161.5 ? 'o' : 'closed'; Hh.brow = -0.8; Hh.noBlink = a111In(t, 162.8, 163.6); Hh.wet = t > 166.3;
  const starP = [640, K.lerp(560, 300, a111B(t, 165.16, 1.0))];
  a111Gz(Hh, t < 165.16 ? a111Head(B) : starP); Hh.look = 0.3;
  Hh.after = (c, Q) => { if (t < 162.95) { const m = a111Mix(Q.HL, Q.HR, 0.5); a111Sack(c, m[0] - 18, m[1] + 48, 0.27, {}); a111Sack(c, m[0] + 20, m[1] + 50, 0.27, {}); } };
  for (const [x, y] of a111SackSpots(t)) if (x < 540 || t > 163.2) a111Sack(ctx, x, y, 0.27, {});
  if (a111In(t, 162.95, 163.2)) { const u = a111B(t, 162.95, 0.25, 'in'); a111Sack(ctx, K.lerp(474, 546, u), K.lerp(860, 904, u), 0.27, {}); a111Sack(ctx, K.lerp(512, 584, u), K.lerp(862, 906, u), 0.27, {}); }
  // the beggar bleaches to white from the feet up, then becomes a column of light that rises and shrinks to a star
  if (gone < 1) { ctx.save(); ctx.globalAlpha = 1 - gone; a111Draw(ctx, t, B);
    if (bleach > 0) { const Wb = a111P(A111_BEGGAR_WHITE, { ...B, pal: A111_BEGGAR_WHITE.pal }); const ly = 905 - 300 * bleach; ctx.save(); ctx.beginPath(); ctx.rect(400, ly, 500, 905 - ly + 20); ctx.clip(); a111Draw(ctx, t, Wb); ctx.restore(); }
    ctx.restore(); }
  if (t > 165.0 && t < 167.2) { const u = a111B(t, 165.16, 1.0), k = Math.min(a111B(t, 165.0, 0.3), 1 - a111B(t, 166.0, 0.3)); a111Column(ctx, 640, K.lerp(905, 420, u), 230 * (1 - 0.8 * u), 90 * (1 - 0.7 * u), k, t); }
  if (t > 165.9 && t < 167.4) { const g = pulse(t, 165.9, 1.4); star(ctx, 640, 300, 30 * g, C.yellow, t * 3); a111Glow(ctx, 640, 300, 70, g * 0.7, t, { col: 'gold', stars: false }); }
  a111Draw(ctx, t, Hh);
  // the scale: coins against a heart; the heart side sinks on "generosity"; the tick on "passed"
  if (a111In(t, 163.68, 167.6)) { const k = K.ease.back(K.clamp((t - 163.68) / 0.35)) * (1 - a111B(t, 167.2, 0.3)); ctx.save(); ctx.translate(530, 650); ctx.scale(k, k); a111Scale(ctx, 0, 0, 0.7, 0.35 * a111B(t, 164.44, 0.6, 'out')); ctx.restore(); a111Tick(ctx, 625, 500, 34, a111B(t, 166.24, 0.35, 'lin') * (1 - a111B(t, 167.2, 0.3))); }
}

// ---------- S26 (167.80-169.90): he thanks God; the family joins him ----------
const A111_S26WX = a111X([[167.8, 700], [168.9, 600]]), A111_S26CX = a111X([[167.9, 760], [169.1, 660]]);
function a111S26(ctx, t) {
  a111Yard(ctx, t, { u: 0.38, door: 0.85 });
  const Hh = a111HeroYard(t); Hh.kneel = 1; Hh.hR = a111HT(t, Hh, [[0, [44, -150]], [167.82, [52, -206], 0.4]]); Hh.hL = a111HT(t, Hh, [[0, [-36, -80]], [167.9, [-52, -206], 0.4]]);
  Hh.lid = Math.max(0.7, blink(t, 3) * 0.3 + 0.7); Hh.wet = true; Hh.talk = 0.3 * Math.abs(Math.sin(t * 7)); Hh.gaze = [0, -1]; Hh.drop = -4; Hh.mouth = 'smile';
  const W = a111P(A111_WIFE, { y: 892, ...a111Walk(A111_S26WX, t, 0.86), mouth: 'smile' }), ch = a111P(A111_CHILD, { y: 904, ...a111Walk(A111_S26CX, t, 0.6), mouth: 'smile' });
  W.kneel = a111B(t, 169.0, 0.35); W.hR = a111HT(t, W, [[0, [30, -100]], [169.3, [48, -200], 0.4]]); W.hL = a111HT(t, W, [[0, [-30, -100]], [169.35, [-48, -200], 0.4]]); W.gaze = t > 169.3 ? [0, -1] : lookAt(a111Head(W), a111Head(Hh)); W.lid = t > 169.3 ? 0.6 : null;
  ch.kneel = a111B(t, 169.2, 0.3); ch.hR = a111HT(t, ch, [[0, [30, -110]], [169.55, [44, -200], 0.35]]); ch.hL = a111HT(t, ch, [[0, [-30, -110]], [169.6, [-44, -200], 0.35]]); ch.gaze = t > 169.5 ? [0, -1] : lookAt(a111Head(ch), a111Head(Hh));
  a111Draw(ctx, t, W); a111Draw(ctx, t, Hh); a111Draw(ctx, t, ch);
  for (const [x, y] of a111SackSpots(t)) a111Sack(ctx, x, y, 0.27, {});
  ctx.save(); ctx.globalAlpha = 0.25; a111Glow(ctx, 450, 300, 160, 0.6, t, { col: 'gold', stars: false }); ctx.restore();
}

// ---------- S28 (173.30-179.99): still ready to give ----------
const A111_S28FX = a111X([[173.4, 120], [175.05, 470], [176.75, 470], [178.2, 735]]), A111_S28HX = a111X([[173.3, 760], [174.9, 760], [175.25, 610], [175.9, 610], [176.15, 560], [176.75, 560], [178.2, 800]]);
function a111S28(ctx, t) {
  const inn = (x) => K.clamp((x - 690) / 36), doorO = 0.85 * (1 - a111B(t, 179.0, 0.8));
  const W = a111P(A111_WIFE, { x: 752, y: 902, mouth: 'smile' }); W.hR = a111In(t, 176.7, 178.3) ? [60 + 8 * Math.sin(t * 12), -196] : [30, -100]; a111Gz(W, [480, 800]);
  a111Yard(ctx, t, { u: 0.4, door: doorO, winLit: 1, inside: (c) => { c.fillStyle = '#ffd98a'; c.globalAlpha = 0.3; c.fillRect(700, 640, 100, 260); c.globalAlpha = 1; if (t < 178.6) a111Draw(c, t, W); } });
  const F = a111P(A111_FRIEND, { y: 900, ...a111Walk(A111_S28FX, t, 0.88) }), Hh = a111P(A111_HERO_RICH, { y: 900, ...a111Walk(A111_S28HX, t) });
  const gave = t > 175.6, trayAt = gave ? null : null;
  Hh.hR = a111HT(t, Hh, [[0, [20, -118]], [173.9, [62 + 8 * Math.sin(t * 14), -196], 0.25], [174.6, [20, -118], 0.3], [176.0, [40, -80], 0.4]]);
  Hh.hL = a111HT(t, Hh, [[0, [-20, -118]], [175.2, () => ({ w: a111Give(t, 175.18, a111W(Hh, [-20, -118]), [540, 790], a111Head(F), -1).h }), 0.01], [175.95, () => ({ w: [F.x + 22, 784] }), 0.3]]);
  Hh.mouth = 'smile'; Hh.look = t < 174.9 ? -0.5 : -0.4; a111Gz(Hh, t < 174.2 ? [100, 820] : a111Head(F));
  if (t > 173.9 && t < 174.6) Hh.hL = [-20, -118];
  F.hR = a111HT(t, F, [[0, [36, -70]], [175.05, { w: [548, 792] }, 0.3], [176.8, [26, -120], 0.4]]); F.hL = a111HT(t, F, [[0, [-36, -70]], [175.05, { w: [520, 796] }, 0.3], [176.8, [-26, -120], 0.4]]);
  F.mouth = t > 175.7 ? 'smile' : t > 174.6 ? 'o' : 'closed'; F.eyes = a111In(t, 174.6, 175.4) ? 'wide' : 'open'; F.wet = t > 175.6; F.drop = t < 175.6 ? 6 : 0; F.tip = t < 175.6 ? -0.05 : 0;
  a111Gz(F, t < 174.6 ? [F.x + 200, 880] : a111Head(Hh));
  const trayHands = (Q) => a111Mix(Q.HL, Q.HR, 0.5);
  Hh.after = (c, Q) => { if (t < 175.55) { const m = trayHands(Q); a111Tray(c, m[0], m[1] + 4, { s: 0.55, bread: 2 }); a111Purse(c, m[0] + 16, m[1] - 4, 0.45, {}); } };
  F.after = (c, Q) => { if (t >= 175.55) { const m = trayHands(Q); a111Tray(c, m[0], m[1] + 4, { s: 0.55, bread: 2 }); a111Purse(c, m[0] + 16, m[1] - 4, 0.45, {}); } };
  F.alpha = 1 - inn(F.x); Hh.alpha = 1 - inn(Hh.x);
  if (F.alpha > 0.01) a111Draw(ctx, t, F); if (Hh.alpha > 0.01) a111Draw(ctx, t, Hh);
  const ch = a111P(A111_CHILD, { x: 836, y: 906, mouth: 'smile' }); ch.hR = a111In(t, 176.85, 178.4) ? [58 + 8 * Math.sin(t * 15 + 1), -192] : [30, -110]; ch.hL = { w: [800, 800] }; a111Gz(ch, a111Head(F));
  ch.alpha = 1 - a111B(t, 178.7, 0.4); if (ch.alpha > 0.01) a111Draw(ctx, t, ch);
  if (t > 177.9) { const u = a111B(t, 177.9, 1.2, 'out'); heart(ctx, 750, 600 - 30 * u, 26 * K.ease.back(K.clamp((t - 177.9) / 0.35)), { alpha: 1 - 0.3 * a111B(t, 179.3, 0.6) }); }
}
