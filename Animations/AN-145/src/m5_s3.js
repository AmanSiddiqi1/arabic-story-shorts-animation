// ===== AN-145 scenes S12-S17: the building replay, iron and lead, the storyteller's legends, LEGEND, sand and time, the bow =====
const M5_TELLER = { costume: 'ascetic', age: 0.9, seed: 61 }, M5_KID1 = { costume: 'servant', child: true, seed: 67 }, M5_KID2 = { costume: 'maiden', child: true, seed: 71 };
const M5_BUILDER = { costume: 'carpenter', age: 0.35, pal: { robe: '#fffaf0', dot: '#d6d2e0' }, seed: 77 };

// ---------- S12 the building replay (107.66 - 119.62) ----------
const M5_DROP = (() => { const out = [], all = [...M5_BLOCKS[2], ...M5_BLOCKS[3], ...M5_BLOCKS[4]]; let k = 0;
  all.forEach((B) => { const guided = B.n === 2 && B.i === 0, last = B === all[all.length - 1]; out.push({ B, t: guided ? 116.0 : last ? 117.04 : 111.94 + 0.17 * k++, guided, last }); }); return out; })();
function m5Teller(t, x, y, extra = {}) { return { ...M5_TELLER, x, y, s: 0.85, dir: 1, sit: 1, seat: 'floor', ...extra }; }
function m5S12(ctx, t) {
  m5Face(ctx, { t, u: 0.25, upper: false, blocks: (c) => { for (const d of M5_DROP) { if (t < d.t - (d.guided ? 1.0 : 0.45)) continue; const B = d.B; let dy = 0, dx = 0, sq = 1;
      if (d.guided) dy = -200 * (1 - M5B(t, 115.0, 1.0, 'out')); else if (d.last) { dx = 30 * (1 - M5B(t, 117.04, 0.45, 'out')); dy = -260 * (1 - M5B(t, 116.6, 0.44, 'in')); } else { const u = K.clamp((t - (d.t - 0.45)) / 0.45); dy = -500 * (1 - u * u); }
      if (t >= d.t && t < d.t + 0.07) sq = 0.94;
      c.save(); c.translate(B.x0, B.y1); c.scale(1, sq); c.translate(-B.x0, -B.y1); m5Block(c, { ...B, x0: B.x0 + dx, x1: B.x1 + dx, y0: B.y0 + dy, y1: B.y1 + dy }); c.restore();
      if (t > d.t && t < d.t + 0.5) dustBurst(c, (B.x0 + B.x1) / 2, B.y1, t - d.t, 5, 6, 12, 60, 0.5, d.B.i + d.B.n * 5); } } });
  if (t < 117.04) { // the builder on the course 1 tread guides the big block down
    const P = { ...M5_BUILDER, x: 435, y: 560, s: 0.6, dir: 1, sq: m5In(t, 115.0, 116.3) ? 0.95 : 1, mouth: 'closed' }; P.aR = [2.6, 2.75]; P.aL = [2.2, 2.6];
    if (t < 115.0) { P.aR = null; P.aL = null; P.handL = M5H.lowL; P.handR = M5H.lowR; } P.gaze = lookAt(m5Head(P), [610, 380]); m5Blink(P, t, 77);
    if (t > 113.4) { ctx.save(); ctx.globalAlpha = M5B(t, 113.4, 0.4); person(ctx, P); ctx.restore(); } }
  else { // close on the joint: the right block slides the last units home (no gap), then the blade gag
    const gap = 14 * (1 - M5B(t, 117.04, 0.46, 'out')); if (gap > 0.3) { ctx.fillStyle = '#140c06'; ctx.fillRect(560, 730, gap, 170); m5Block(ctx, { ...M5_BLOCKS[0][1], x0: 560 + gap, x1: 820 + gap }); }
    const P = { ...M5_BUILDER, x: 470, y: 905, s: 0.8, dir: 1, mouth: t < 118.9 ? 'o' : 'smile', brow: t < 118.4 ? 0.3 : -0.2 };
    P.handR = m5Tr(t, [[0, M5H.lowR], [117.54, m5Loc(P, [548, 820]), 0.3], [118.35, [60, -130], 0.2], [118.92, m5Loc(P, [530, 790]), 0.2], [119.3, M5H.lowR, 0.3]]); if (m5In(t, 118.92, 119.3)) P.handR = [P.handR[0], P.handR[1] + 6 * Math.sin(t * 30)];
    P.handL = M5H.hipL; P.drop = 5 * m5Pulse(t, 119.0, 0.4);
    P.gaze = t < 118.35 ? lookAt(m5Head(P), [560, 820]) : t < 118.92 ? lookAt(m5Head(P), [K.lerp(560, 800, M5B(t, 118.35, 0.5)), K.lerp(820, 600, M5B(t, 118.35, 0.5))]) : [0, 0.05];
    m5Blink(P, t, 77, 0.9 * m5Pulse(t, 119.25, 0.18)); person(ctx, P);
    const h = m5Hand(P, 'R');
    if (t < 118.35) { const b = M5B(t, 117.9, 0.4), tip = [560, 812]; ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(h[0], h[1]); ctx.quadraticCurveTo((h[0] + tip[0]) / 2, (h[1] + tip[1]) / 2 - 30 * b, tip[0], tip[1]); ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = '#d6dae2'; ctx.stroke(); ctx.restore(); }
    else { const d = t - 118.35, x = 560 + 260 * d, y = 812 - 300 * d + 500 * d * d; ctx.save(); ctx.translate(x, y); ctx.rotate(d * 18); seg(ctx, -22, 0, 22, 0, 4, '#d6dae2', 2.5); ctx.restore(); } }
}
function m5O12(ctx, t, cam, S, P) {
  // storyteller inset (the tale is told)
  if (t < 112.1) { const k = m5Pop(t, 107.66, 0.35), out = M5B(t, 111.5, 0.6, 'in'); ctx.save(); ctx.translate(-260 * out, -200 * out); m5Inset(ctx, 230, 1000, 180, k * (1 - out * 0.6), [360, 800], 1.25, (c) => { m5Camp(c, { t }); m5Fire(c, t, 520, 905);
      const T = m5Teller(t, 330, 915); T.talk = talk(t, [[107.7, 111.6]]) * 0.6; T.handR = t < 109.12 ? PERSON_HANDS.pointUp.R : m5Tr(t, [[109.12, [70, -180]], [109.3, [60, -240], 0.5]]); T.handL = M5H.lowL; T.gaze = t < 108.3 ? [0, 0.05] : [0.3, -1]; T.mouth = 'smile'; person(c, T); }); ctx.restore(); }
  if (m5In(t, 110.74, 113.4)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 110.74, 113.4, 0.3); S.title(ctx, 'WONDER OF THE WORLD', 500, 400, M5B(t, 110.74, 0.8), { size: 62, align: 'center' }); ctx.restore();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + t * 1.2, [x, y] = P(620 + Math.cos(a) * 380, 500 + Math.sin(a) * 330); star(ctx, x, y, 14 * m5Pop(t, 111.94 + i * 0.05, 0.3), C.yellow, t * 2); } }
  if (m5In(t, 115.7, 117.0)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 115.7, 117.0, 0.15); const k = M5B(t, 115.7, 0.4); const a = P(390, 560), b = P(390, 560 - 144), c = P(760, 560), d = P(760, 390); S.arrow(ctx, a, [b[0], K.lerp(a[1], b[1], 1)], k, { width: 12, bend: 0 }); S.arrow(ctx, c, d, k, { width: 12, bend: 0, color: C.red }); ctx.restore(); }
}

// ---------- S13 iron and lead, then the unknown chambers (119.62 - 129.80) ----------
function m5Insert(ctx, t) {
  ctx.fillStyle = '#e3ae40'; ctx.fillRect(0, 0, 1000, 1230);
  shape(ctx, K.rectPts(-20, 120, 516, 1000), M5_STONE, { lw: 8, seed: 760, dot: C.red, pitch: 14, rad: 0.2, da: 0.4 }); shape(ctx, K.rectPts(504, 120, 520, 1000), '#e3ae40', { lw: 8, seed: 761, dot: C.red, pitch: 14, rad: 0.2, da: 0.4 });
  const tie = (sx = 1) => [[500 - 110 * sx, 515], [500 - 30 * sx, 540], [500 + 30 * sx, 540], [500 + 110 * sx, 515], [500 + 110 * sx, 605], [500 + 30 * sx, 580], [500 - 30 * sx, 580], [500 - 110 * sx, 605]];
  const chalk = M5B(t, 119.7, 0.8, 'lin'), cut = M5B(t, 120.5, 0.6);
  if (cut > 0) { ctx.save(); ctx.globalAlpha = cut; shape(ctx, tie(), '#3a2410', { lw: 4, seed: 762 }); ctx.restore(); }
  if (chalk > 0 && cut < 1) { ctx.save(); ctx.setLineDash([14, 8]); ctx.lineWidth = 6; ctx.strokeStyle = C.white; const pts = tie(), n = Math.max(2, Math.round(chalk * pts.length) + 1); K.poly(ctx, pts.concat([pts[0]]).slice(0, n)); ctx.stroke(); ctx.restore(); }
  const lead = M5B(t, 122.0, 0.8), set = t > 122.9;
  if (lead > 0) { ctx.save(); K.poly(ctx, tie(1.12).map(([x, y]) => [x, y + (y < 560 ? -6 : 6)]), true); ctx.clip(); const top = K.lerp(620, 505, lead); ctx.fillStyle = M5_LEAD; ctx.beginPath(); ctx.moveTo(380, 640); for (let x = 380; x <= 620; x += 10) ctx.lineTo(x, top + (set ? 0 : 5 * Math.sin(x * 0.08 + t * 9))); ctx.lineTo(620, 640); ctx.fill(); ctx.restore(); }
  if (t > 121.0) { const u = M5B(t, 121.0, 0.26, 'in'), b = t > 121.26 ? -12 * Math.abs(Math.sin((t - 121.26) * 20)) * Math.exp(-(t - 121.26) * 12) : 0; ctx.save(); ctx.translate(0, K.lerp(-500, 0, u) + b); shape(ctx, tie(0.92).map(([x, y]) => [x, y]), M5_IRON, { lw: 5, seed: 763, dot: C.black, pitch: 7, rad: 0.25, da: 0.4 }); ctx.restore(); }
  if (lead > 0 && t < 123.6) for (let i = 0; i < 4; i++) { const u = ((t * 0.8 + i / 4) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * 0.8 * m5Win(t, 122.0, 123.6, 0.3); shape(ctx, ell(440 + i * 40 + Math.sin(u * 6 + i) * 10, 500 - u * 160, 16 + u * 14, 12 + u * 10, 12), C.white, { lw: 3, seed: 764 }); ctx.restore(); }
  // the ladle
  if (m5In(t, 121.7, 123.0)) { const sw = M5B(t, 121.7, 0.35) * (1 - M5B(t, 122.7, 0.3)), tilt = 0.9 * M5B(t, 121.95, 0.3); ctx.save(); ctx.translate(K.lerp(1150, 600, sw), K.lerp(200, 420, sw)); ctx.rotate(-tilt); seg(ctx, 0, 0, 220, -110, 10, '#7a4212', 4); shape(ctx, [[-40, -10], [40, -10], [30, 30], [-30, 30]], M5_GREY, { lw: 5, seed: 765 }); ctx.restore();
    if (tilt > 0.6 && t < 122.7) { ctx.save(); ctx.lineWidth = 10; ctx.strokeStyle = M5_LEAD; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(560, 440); ctx.lineTo(520, 540); ctx.stroke(); ctx.restore(); } }
  // the mallet hand taps twice: nothing moves
  if (m5In(t, 122.8, 124.3)) { const tap = Math.max(m5Pulse(t, 122.9, 0.35), m5Pulse(t, 123.45, 0.35)), y = 360 - 80 * tap; ctx.save(); ctx.translate(560, y); ctx.rotate(-0.4 * tap); seg(ctx, 0, 0, 170, -40, 12, '#9a5a1e', 4); shape(ctx, K.rectPts(-50, -40, 100, 70), '#8a5a14', { lw: 6, seed: 766, dot: '#5b3010', pitch: 7, rad: 0.2, da: 0.4 }); shape(ctx, ell(180, -42, 26, 22, 14), C.white, { lw: 5, seed: 767, dot: C.skin, pitch: 5, rad: 0.3 }); ctx.restore(); }
  if (t > 124.26) { const u = M5B(t, 124.26, 0.55, 'lin'), y = K.lerp(140, 1100, u); ctx.save(); ctx.globalAlpha = 1 - u * 0.5; star(ctx, 500, y, 30, C.white, t * 4); ctx.restore(); }
}
function m5S13(ctx, t) {
  if (t < 124.9) { m5Insert(ctx, t); return; }
  m5Section(ctx, { t, u: 0.26, legend: M5B(t, 125.78, 0.62, 'lin'), chP: [M5B(t, 126.44, 0.3), M5B(t, 126.64, 0.3), M5B(t, 126.84, 0.3)], qs: [M5B(t, 127.14, 0.3), M5B(t, 127.44, 0.3), M5B(t, 127.74, 0.3)], dark: M5B(t, 128.38, 0.6) });
}
function m5O13(ctx, t, cam, S, P) {
  if (m5In(t, 121.26, 124.0)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 121.26, 124.0, 0.2); S.label(ctx, 'IRON', 250, 470, M5B(t, 121.26, 0.3), { size: 62, align: 'center' }); S.arrow(ctx, [300, 490], [420, 545], M5B(t, 121.35, 0.3), { width: 16 }); ctx.restore(); }
  if (m5In(t, 121.9, 124.6)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 121.9, 124.6, 0.2); S.label(ctx, 'LEAD', 760, 760, M5B(t, 121.9, 0.3), { size: 62, align: 'center' }); S.arrow(ctx, [700, 720], [600, 610], M5B(t, 122.0, 0.3), { width: 16 }); ctx.restore(); }
  if (m5In(t, 127.84, 129.8)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 127.84, 129.8, 0.2); sfx(ctx, '? ? ?', 790, 200, 80, M5B(t, 127.84, 0.3), { fill: C.yellow }); ctx.restore(); }
}

// ---------- S14 + S15 the storyteller by the fire (129.80 - 152.62) ----------
// story cloud contents: three chambers in a row (cloud centre = 0, 0)
function m5Legends(c, t) { const ghost = M5B(t, 143.28, 0.7), ch = [[-190, 'gems', 134.64], [0, 'swords', 135.54], [190, 'books', 136.66]];
  c.save(); c.setLineDash([12, 8]); c.lineDashOffset = -t * 30; c.lineWidth = 22; c.strokeStyle = 'rgba(10,6,20,0.85)'; c.beginPath(); c.moveTo(-190, 40); c.lineTo(190, 40); c.stroke(); c.lineWidth = 4; c.strokeStyle = C.yellow; c.stroke(); c.restore();
  ch.forEach(([x, k, ta]) => { const lit = M5B(t, ta, 0.3) * (1 - ghost); c.fillStyle = mixHex('#140c20', '#3a2a10', lit); c.fillRect(x - 75, -45, 150, 110); if (lit > 0) m5Glow(c, x, 10, 70, 0.35 * lit);
    if (t > ta) m5Icon(c, k, x, 12, 1.1 * m5Pop(t, ta, 0.35), { t, ghost }); c.save(); c.setLineDash([12, 8]); c.lineWidth = 5; c.strokeStyle = ghost > 0.5 ? C.white : C.yellow; c.strokeRect(x - 75, -45, 150, 110); c.restore(); });
  // the unseen guardians: pale eye pairs, then still figures before the doors
  const eyes = [[-95, 30, 139.1], [95, 30, 139.35], [-280, -20, 139.6], [280, -20, 139.8]];
  eyes.forEach(([x, y, ta], i) => { if (t < ta) return; const op = M5B(t, ta, 0.25), bl = 0.9 * blink(t, 90 + i), mv = M5B(t, 140.16, 1.0), gx = K.lerp(x, [-120, 70, -260, 260][i], mv); c.save(); c.globalAlpha = (1 - ghost * 0.6);
    if (mv > 0) { c.globalAlpha *= 0.4 * mv; c.fillStyle = ghost > 0.5 ? 'rgba(0,0,0,0)' : '#cfe0ff'; const fp = [[gx - 22, y + 70], [gx - 26, y - 10], [gx - 14, y - 40], [gx + 14, y - 40], [gx + 26, y - 10], [gx + 22, y + 70]]; K.poly(c, fp, true); c.fill(); c.globalAlpha = (1 - ghost * 0.6); c.setLineDash([6, 5]); c.lineWidth = 3; c.strokeStyle = C.white; K.poly(c, fp, true); c.stroke(); c.setLineDash([]); }
    for (const dx of [-9, 9]) { c.fillStyle = '#eaf2ff'; c.beginPath(); c.ellipse(gx + dx, y - 22 * mv, 6, 7 * op * (1 - bl) + 0.5, 0, 0, 7); c.fill(); c.fillStyle = '#1b2a5a'; c.beginPath(); c.arc(gx + dx + 1.5, y - 22 * mv + 1, 2.4 * op * (1 - bl), 0, 7); c.fill(); } c.restore(); });
  if (m5In(t, 139.35, 140.2)) { c.save(); c.globalAlpha = 0.5 * m5Win(t, 139.35, 140.2, 0.3); c.setLineDash([6, 5]); c.lineWidth = 3; c.strokeStyle = C.white; c.beginPath(); c.ellipse(95, 50, 34, 80, 0, 0, 7); c.stroke(); c.restore(); }
  if (t > 141.38) m5Icon(c, 'hourglass', 300, 70, 0.8, { f: ((t - 141.38) * 0.8) % 1, ghost });
}
function m5Camp2(ctx, t) {
  m5Camp(ctx, { t });
  const s15 = t >= 142.32, look = (i) => 150.34 + i * 0.25, pyr = [700, 400];
  // storyteller
  const T = m5Teller(t, 330, 915); T.tip = t < 142.32 ? 0.1 * M5B(t, 129.8, 0.6) : 0.1 * (1 - M5B(t, 142.32, 0.5)) - 0.05 * m5Win(t, 142.4, 143.6, 0.3);
  T.talk = t < 152.62 ? 0.6 * talk(t, [[129.9, 141.9], [142.4, 143.2], [145.2, 147.2], [148.6, 150.0]]) : 0; T.mouth = s15 ? 'smile' : 'closed';
  const raised = m5Win(t, 137.58, 142.4, 0.3); T.aR = raised > 0 ? [K.lerp(0.6, 2.6, raised), K.lerp(0.9, 2.2, raised)] : null; T.aL = raised > 0 ? [K.lerp(-0.6, -2.4, raised), K.lerp(-0.9, -2.1, raised)] : null;
  if (raised > 0.5) { T.aR = [T.aR[0] + tremble(t, 0.04, 5), T.aR[1]]; T.eyes = 'wide'; T.brow = -0.9; T.tip += 0.03 * Math.sin(t * 2.5); }
  if (!T.aR) { T.handR = m5Tr(t, [[0, [44, -96]], [132.54, PERSON_HANDS.pointUp.R, 0.4], [134.5, [70, -140], 0.4], [146.26, M5H.temple, 0.25], [146.5, [44, -200], 0.08], [146.6, M5H.temple, 0.08], [146.75, [90, -150], 0.3], [148.0, [44, -96], 0.5]]); T.handL = [-44, -96]; }
  // v2 laugh on 142.32: head back, mouth open, three shoulder bounces over 0.9 s, a hand slapping his knee
  const laugh = m5Win(t, 142.32, 143.3, 0.15); if (laugh > 0) { T.tip = -0.10 * laugh; T.mouth = 'open'; T.tilt = -0.12 * laugh; T.lid = 0.6 * laugh; T.sq = 1 - 0.05 * Math.abs(Math.sin((t - 142.32) * Math.PI * 3 / 0.9)) * laugh; T.aR = null; T.aL = null;
    T.handR = [60, -46 - 26 * Math.abs(Math.sin((t - 142.32) * Math.PI * 3 / 0.9))]; T.handL = [-44, -96]; }
  T.gaze = t < 132.54 ? m5Look(t, T, [[0, [650, 840]]]) : t < 142.32 ? m5Look(t, T, [[132.54, [560, 420]], [137.58, [650, 840]]]) : t < look(0) ? m5Look(t, T, [[142.32, [650, 840]], [146.75, [560, 420]], [147.5, [650, 840]]]) : lookAt(m5Head(T), pyr);
  if (!laugh) m5Blink(T, t, 61, s15 ? 0.1 : 0.3);
  // children: kid1 believes, kid2 doubts
  const hide = t < 145.18 ? M5B(t, 141.38, 0.4) : 1 - M5B(t, 145.18, 0.4);
  const K1 = { ...M5_KID1, x: K.lerp(600, 745, hide), y: 918 - hop(t, 144.04, 0.35, 0, 0, 22)[1], s: 0.85, dir: hide > 0.5 ? -1 : -1, sit: 1, seat: 'floor', tip: 0.1 * m5Win(t, 131.02, 141.3, 0.4) };
  K1.handL = [10, -84]; K1.handR = [-6, -80]; K1.eyes = m5In(t, 134.0, 142.3) ? 'wide' : undefined; K1.mouth = m5In(t, 134.64, 135.5) ? 'o' : m5In(t, 135.9, 136.6) || t > 145.18 ? 'smile' : 'closed';
  K1.sq = landSquash(t, 144.39, 0.14) * (1 - 0.03 * m5Pulse(t, 135.54, 0.3)); K1.x += m5In(t, 135.54, 135.8) ? 6 * m5Pulse(t, 135.54, 0.26) : 0;
  K1.gaze = t < 132.6 ? m5Look(t, K1, [[0, [330, 760]]]) : t < look(1) ? m5Look(t, K1, [[132.6, [560, 400]], [141.38, [560, 400]], [145.3, [330, 760]]]) : lookAt(m5Head(K1), pyr);
  const K2 = { ...M5_KID2, x: 700, y: 918, s: 0.85, dir: -1, sit: 1, seat: 'floor', brow: t < 136.66 ? 0.35 : t < 137.6 ? -0.4 : t > 148.7 ? -0.2 : 0.35, tip: 0.06 * m5Win(t, 131.1, 141.0, 0.4) + 0.1 * m5Win(t, 136.66, 137.6, 0.2) };
  K2.handL = [10, -84]; K2.handR = m5In(t, 141.6, 145.0) ? [-70 + 4 * Math.sin(t * 10), -150] : [-6, -80]; K2.drop = 5 * (m5Pulse(t, 148.9, 0.4) + m5Pulse(t, 149.35, 0.4));
  K2.gaze = t < 132.7 ? m5Look(t, K2, [[0, [330, 760]]]) : t < look(2) ? m5Look(t, K2, [[132.7, [560, 400]], [145.3, [330, 760]], [148.7, [560, 420]]]) : lookAt(m5Head(K2), pyr);
  [T, K1, K2].forEach((P) => { if (P.lid == null) m5Blink(P, t, P.seed); });
  person(ctx, T); person(ctx, K1); person(ctx, K2);
  m5Fire(ctx, t, 500, 905);
  // the story cloud
  if (m5In(t, 132.54, 148.7)) { const sh = m5Pulse(t, 144.04, 0.25), p = t < 147.24 ? M5B(t, 132.54, 1.0, 'lin') : 1 - M5B(t, 147.24, 1.2, 'in'), h = m5Head(T), sk = t < 147.24 ? 1 : 1 - 0.6 * M5B(t, 147.24, 1.2, 'in'), cx = K.lerp(h[0], 525, sk), cy = K.lerp(h[1] - 80, 440, sk);
    ctx.save(); ctx.translate(cx, cy); ctx.scale(sk * (1 + 0.05 * sh), sk * (1 - 0.05 * sh)); ctx.translate(-cx, -cy);
    thoughtCloud(ctx, cx, cy, 600, 370, t, { p, tail: t < 147.24 ? [h[0] + 10, h[1] - 50] : null, bg: '#0b0820', scale: 1, at: [0, 0], seed: 4, inside: (c) => m5Legends(c, t) });
    ctx.restore();
    if (t > 144.04 && t < 147.3) { const k = t < 144.12 ? 1.4 : 1; ctx.save(); ctx.translate(525, 440); ctx.rotate(-0.22); ctx.scale(k * m5Pop(t, 144.04, 0.12) * (1 - M5B(t, 147.0, 0.3)), k * m5Pop(t, 144.04, 0.12) * (1 - M5B(t, 147.0, 0.3)));
      ctx.lineWidth = 12; ctx.strokeStyle = C.red; ctx.strokeRect(-220, -64, 440, 128); ctx.font = K.font(110, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.red; ctx.fillText('LEGEND', 0, 8); ctx.restore(); } }
  if (m5In(t, 148.5, 149.4)) { const u = M5B(t, 148.5, 0.9); [[-40, -10], [10, -40], [50, 0]].forEach(([dx, dy], i) => { ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(430 + dx + dx * u, 640 + dy - 40 * u, 16 + 10 * u, 14 + 8 * u, 12), C.white, { lw: 3, seed: 770 + i }); ctx.restore(); }); }
  if (m5In(t, 151.8, 152.62)) m5Q(ctx, 700, 520, 90, M5B(t, 151.8, 0.3) * (1 - M5B(t, 152.3, 0.3)), C.yellow);
}
function m5S14(ctx, t) { m5Camp2(ctx, t); }
function m5S15(ctx, t) { m5Camp2(ctx, t); }
function m5O15(ctx, t, cam, S, P) {
  if (m5In(t, 148.7, 150.6)) { const [x, y] = P(540, 600); ctx.save(); ctx.globalAlpha = m5Fade(t, 148.7, 150.6, 0.25); S.label(ctx, 'NOT PROVEN FACT', x, y, M5B(t, 148.7, 0.35), { size: 46, align: 'center' }); ctx.restore(); }
}

// ---------- S16 + S17 sand and time, the bow (152.62 - end) ----------
const m5U = (t) => t < 160.22 ? K.lerp(0.02, 0.22, M5B(t, 152.62, 5.0)) : t < 163.84 ? K.lerp(0.22, 6.0, M5B(t, 160.22, 3.62, 'in')) : K.lerp(6.0, 6.45, M5B(t, 163.84, 0.9, 'out')) + 0.02 * M5B(t, 165, 12, 'lin');
// v2: the ancient builders and the king stand large in the foreground (feet y 1010), looking up at their work, and blow away as sand
const M5_ANC = [{ ...M5_BUILDER, x: 330, y: 1010, s: 1.1, dir: 1, seed: 81, ta: 158.52 }, { ...M5_BUILDER, age: 0.6, x: 460, y: 1010, s: 1.1, dir: 1, seed: 83, ta: 159.3 }];
const M5_KX = 610;
function m5King(t) { return { costume: 'prince', age: 0.5, pal: { robe: C.white, dot: '#d6d2e0', sash: C.yellow, head: 'keffiyeh', hc: C.yellow, hd: C.blue }, x: M5_KX, y: 1010, s: 1.1, dir: -1, handL: [-30, -150], handR: M5H.hipR, seed: 87, mouth: 'closed' }; }
// the king's marks: a tall white double crown with a gold circlet, and a crook staff
function m5KingProps(ctx, P, o = {}) { const h = m5Head(P), s = P.s, hd = P.dir || 1;
  const sh = m5Hand(P, 'L'); seg(ctx, sh[0], sh[1] - 120 * s, sh[0], P.y, 8 * s, '#c58a18', 3.5 * s); ctx.save(); ctx.lineWidth = 12 * s; ctx.strokeStyle = C.black; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(sh[0] - 14 * s * hd, sh[1] - 120 * s, 14 * s, 0, Math.PI, true); ctx.stroke(); ctx.lineWidth = 6 * s; ctx.strokeStyle = C.yellow; ctx.stroke(); ctx.restore();
  shape(ctx, [[h[0] - 30 * s, h[1] - 34 * s], [h[0] - 22 * s, h[1] - 90 * s], [h[0] - 6 * s, h[1] - 120 * s], [h[0] + 6 * s, h[1] - 120 * s], [h[0] + 22 * s, h[1] - 90 * s], [h[0] + 30 * s, h[1] - 34 * s]], C.white, { lw: 5 * s, seed: 785, dot: '#d6d2e0', pitch: 6, rad: 0.2, da: 0.4 });
  shape(ctx, ell(h[0], h[1] - 120 * s, 9 * s, 9 * s, 12), C.red, { lw: 3 * s, seed: 786 });
  if (!o.noCirclet) shape(ctx, K.rectPts(h[0] - 33 * s, h[1] - 44 * s, 66 * s, 14 * s), C.yellow, { lw: 4 * s, seed: 787 }); }
function m5S16(ctx, t) {
  m5Far(ctx, { u: m5U(t), t, scar: K.clamp((t - 163.0) / 0.6), pulse: 0.8 * m5Pulse(t, 157.18, 0.8) });
  const fade = M5B(t, 155.82, 0.8);
  if (fade <= 0) return;
  ctx.save(); ctx.globalAlpha = fade;
  // tools on the sand at their feet, covered by sand afterwards
  if (t < 160.6) { ctx.save(); ctx.globalAlpha *= 1 - M5B(t, 159.8, 0.7); m5Pick(ctx, 250, 1012, -0.05, 0.8); m5Shovel(ctx, 540, 1014, 3.05, 0.8); ctx.restore(); }
  M5_ANC.forEach((B, i) => { const P = { ...B, handL: M5H.lowL, handR: t < 157.1 ? [20 + 6 * Math.sin(t * 6 + i), -214] : M5H.lowR, gaze: lookAt([B.x, 790], [560, 250]), tilt: -0.08, lid: m5In(t, 156.2, 156.4 + i * 0.2) ? 0.6 : 0, mouth: t > 157.18 ? 'smile' : 'closed' };
    if (t < B.ta) person(ctx, P); else m5Sand(ctx, 'B' + i, [B.x - 120, 700, 240, 320], (c) => person(c, { ...P, handR: M5H.lowR, lid: 0 }), M5B(t, B.ta, 1.2, 'lin'), t, { seed: 9 + i, n: 75, grain: 4, dur: 1.6 }); });
  const Kg = m5King(t); Kg.gaze = lookAt([M5_KX, 790], [560, 250]); Kg.tilt = -0.08; Kg.lid = 0.4 * M5B(t, 161.0, 0.6);
  if (t < 161.68) { person(ctx, Kg); m5KingProps(ctx, Kg); }
  else m5Sand(ctx, 'K', [M5_KX - 130, 600, 260, 420], (c) => { person(c, { ...Kg, lid: 0.4 }); m5KingProps(c, Kg, { noCirclet: true }); }, M5B(t, 161.68, 1.2, 'lin'), t, { seed: 13, n: 80, grain: 4, dur: 1.6 });
  // the circlet drops, rolls (damped, 0.7 s) and a sand ripple covers it on 162.36
  if (t > 161.68) { const h = m5Head({ ...Kg }), d = t - 161.72, fall = K.clamp(d / 0.3), y0 = h[1] - 37 * 1.1, gy = 1004, roll = K.clamp((d - 0.3) / 0.7), x = h[0] + 110 * (1 - (1 - roll) ** 2), y = K.lerp(y0, gy, fall * fall) - (d > 0.3 ? 14 * Math.abs(Math.sin(roll * 9)) * (1 - roll) : 0), sx = d < 0.3 ? 1 : Math.max(0.35, Math.abs(Math.cos(roll * 7)) * (1 - 0.6 * roll));
    ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1); shape(ctx, ell(0, -10, 36, 14, 18), C.yellow, { lw: 5, seed: 780 }); shape(ctx, ell(0, -10, 24, 7, 14), '#c98a3a', { lw: 3, seed: 788 }); ctx.restore();
    if (t > 162.36) { const u = M5B(t, 162.36, 0.8); ctx.save(); ctx.beginPath(); ctx.rect(x - 70, gy - 40 * u, 140, 60); ctx.clip(); shape(ctx, [[x - 70, gy + 8], [x - 40, gy - 30 * u], [x + 10, gy - 36 * u], [x + 60, gy - 18 * u], [x + 80, gy + 8]], SANDL, { lw: 4, seed: 781, dot: C.red, pitch: 12, rad: 0.16, da: 0.35 }); ctx.restore(); } }
  ctx.restore();
}
function m5S17(ctx, t) {
  m5Far(ctx, { u: m5U(t), t, scar: 1, pulse: 0.8 * m5Pulse(t, 164.62, 0.7), pulseB: 0.8 * m5Pulse(t, 164.9, 0.6), pulseC: 0.8 * m5Pulse(t, 165.15, 0.6), extra: (c) => {
    // far caravans: ages of visitors
    c.save(); c.beginPath(); c.rect(-50, 0, 1100, 1230); K.poly(c, [[160, 900], [560, 250], [960, 900]], true); c.clip('evenodd');
    for (let i = 0; i < 3; i++) { const x = K.lerp(1060, 820, M5B(t, 165.4 + i * 0.12, 2.0, 'lin')) + i * 46; if (t > 165.4) camel(c, { x, y: 768, s: 0.11, dir: -1, silhouette: true, ph: x / 6, amp: 1 }); }
    if (t > 166.3) { const x = K.lerp(1040, 860, M5B(t, 166.3, 2.4, 'lin')); person(c, { x, y: 772, s: 0.1, costume: 'bedouin', ph: x / 3, amp: 1, alpha: 0.9 }); } c.restore();
    // sand blowing over the scar in the hold
    if (t > 174.6) { const r = K.rng(5); c.save(); c.fillStyle = '#e0a13a'; for (let i = 0; i < 30; i++) { const ph = (t * 0.6 + r()) % 1, x = 120 + ph * 420, y = 880 + r() * 30 - 10 * Math.sin(ph * 6 + i); c.globalAlpha = Math.sin(Math.PI * ph) * 0.8; c.beginPath(); c.arc(x, y, 2 + (i % 3), 0, 7); c.fill(); } c.restore(); } } });
  if (t > 166.56) { for (let i = 0; i < 5; i++) { const k = m5Pop(t, 166.56 + i * 0.15, 0.3); if (k > 0) star(ctx, 420 + i * 70, 120 + (i % 2) * 50, 7 * k, C.white, 0); } star(ctx, 560, 250, 20 * m5Pop(t, 167.3, 0.3) * (0.8 + 0.2 * Math.sin(t * 6)), C.white, t); }
  // the caliph, the vizier and the camel cross right to left
  const xf = (tt) => tt < 172.56 ? K.lerp(1150, 330, M5B(tt, 167.92, 1.06, 'out')) : K.lerp(330, -800, M5B(tt, 172.56, 2.5, 'in'));
  const cam = (tt) => xf(tt - 0.25) + 330, vz = (tt) => xf(tt - 0.12) + 170;
  if (t > 167.6) {
    const Cm = { ...walk(cam, t, { stride: GAIT.camel * 0.42 }), y: 930, s: 0.42, dir: -1, saddle: true, load: ['chest', 'sack'], chew: (Math.sin(t * 8) + 1) / 2, lid: 0.4 }; camel(ctx, Cm);
    const vbow = m5Win(t, 171.6, 172.5, 0.25), Vh = { ...walk(vz, t, { stride: GAIT.horse * 0.42 }), y: 930, s: 0.42, pal: 1, dir: -1, headDown: 0.8 * vbow }; rideOn(ctx, 'horse', Vh, { ...M5_VIZ, gaze: vbow > 0.3 ? [0, 0.7] : t > 168.98 && t < 172.5 ? lookAt([vz(t), 790], [300, 890]) : [-1, 0], lurch: -lurch(t, 169.1, 0.2), tip: 0.35 * vbow, drop: 8 * vbow, lid: vbow > 0.5 ? 1 : 0, handR: vbow > 0.2 ? M5H.chestR : undefined });
    const bow = m5Win(t, 171.4, 172.45, 0.22), H = { ...walk(xf, t, { stride: GAIT.horse * 0.42 }), y: 930, s: 0.42, dir: -1, earL: t > 168.98 ? 1 : 0.6, earR: t > 168.98 ? 1 : 0.6, tailSwish: Math.sin(t * 2.2) * 0.5, headDown: 1.0 * bow };
    const cp = { ...M5_CAL, lurch: -lurch(t, 168.98, 0.22), drop: 12 * bow, tip: 0.42 * bow, mouth: m5In(t, 170.62, 171.3) ? 'smile' : 'closed', gaze: t < 168.98 ? [-1, 0] : t < 172.56 ? (bow > 0.2 ? [0, 0.6] : lookAt([xf(t), 790], [300, 890])) : [-1, 0] };
    cp.lid = bow > 0.4 ? 1 : m5In(t, 170.62, 170.9) ? 0.3 : 0;
    cp.handR = t > 171.25 && t < 172.6 ? M5H.chestR : m5In(t, 170.62, 171.25) ? m5Tr(t, [[170.62, [30, -200]], [170.85, [120, -150], 0.25]]) : [52, -118]; cp.handL = [34, -122];
    rideOn(ctx, 'horse', H, cp);
    // the coin balloon (about 190 px wide at zoom 1.9); his forearm sweeps it aside and it pops at 171.1
    if (m5In(t, 170.62, 171.5)) { const hx = xf(t) - 30, burst = t > 171.1, push = 60 * M5B(t, 170.85, 0.25); if (!burst) { const k = m5Pop(t, 170.62, 0.3); ctx.save(); ctx.translate(hx - 20 - push, 690); ctx.scale(k, k); shape(ctx, ell(0, 0, 52, 38, 24), C.white, { lw: 3, seed: 790 }); m5Mound(ctx, 0, 18, 60, 1, { seed: 3 }); ctx.restore(); }
      else { const u = M5B(t, 171.1, 0.4); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, ell(hx - 80 + Math.cos(a) * 60 * u, 690 + Math.sin(a) * 45 * u, 7, 7, 10), C.white, { lw: 2, seed: 791 }); ctx.restore(); } } } }
}
function m5O17(ctx, t, cam, S, P) {
  if (m5In(t, 169.64, 171.0)) { ctx.save(); ctx.globalAlpha = m5Fade(t, 169.64, 171.0, 0.2); S.arrow(ctx, P(200, 780), P(290, 880), M5B(t, 169.64, 0.4), { width: 16, bend: 0.2 }); ctx.restore(); }
  if (t >= 173.66) S.title(ctx, 'THE END', 280, 250, M5B(t, 173.66, 0.8), { size: 84, align: 'center' });
}
