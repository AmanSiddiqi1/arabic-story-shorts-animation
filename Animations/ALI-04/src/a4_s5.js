// ===== ALI-04 shots S13-S15 (96.3 - 117.8 s): the watch from the kitchen window, the signal (pebbles), the lid keepers, CAUGHT! =====
// the merchant's hand at the guest window slit (world): drum, flick, clench; the eye in the slit
function a4SlitHand(ctx, t, o = {}) {
  const tc = AB_T2(t), W = CY.gwin, x = W.x + W.w / 2 + 6, y = W.y + W.h * 0.62, out = K.clamp(o.out ?? 1); if (out <= 0) return;
  ctx.save(); ctx.translate(x - 40 * (1 - out), y); ctx.rotate(-0.15 + (o.flick ? -0.8 * o.flick : 0));
  celShade(ctx, [[30, -16], [90, -18], [90, 16], [30, 16]], '#ecc062', '#d8a43a', { off: 5, lw: 2.5, line: '#7a5a1a' });
  const cl = K.clamp(o.clench || 0); celShade(ctx, ell(10, 0, 24, 18, 18), '#e8b08a', '#c08060', { off: 5, lw: 2.5, line: '#6a3a2a' });
  for (let i = 0; i < 4; i++) { const dr = o.drum ? 6 * Math.max(0, Math.sin(tc * 18 - i * 1.3)) : 0, len = 26 * (1 - 0.6 * cl); seg(ctx, -6, -12 + i * 8, -6 - len, -12 + i * 8 + dr, 7, '#e8b08a', 2); }
  silverRing(ctx, -14, -2, 6, { glint: o.glint || 0, rot: 1.4 }); ctx.restore();
}
function a4SlitEye(ctx, t, look) { const W = CY.gwin, x = W.x + W.w / 2, y = W.y + 34; ctx.save(); ctx.fillStyle = '#e8b08a'; ctx.fillRect(x - 12, y - 16, 24, 32);
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(x, y, 9, 6, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#1a0e14'; ctx.beginPath(); ctx.arc(x + look * 4, y, 3.4, 0, 7); ctx.fill();
  ctx.strokeStyle = '#160c10'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 11, y - 11); ctx.lineTo(x + 11, y - 9); ctx.stroke(); ctx.restore(); }
// pebbles from the slit: a high arc to a lid, then small hops (world); throws [t0, x1, seed]
function a4Pebbles(ctx, t, throws) { for (const [t0, x1, sd] of throws) { const R = K.rng(sd); for (let k = 0; k < 2; k++) { const d = R() * 0.08, u = (t - t0 - d) / 0.85; if (u < 0) continue;
  let x, y; const x0 = CY.gwin.x + 20, y0 = CY.gwin.y + 70, xt = x1 + (R() - 0.5) * 30, yt = CY.jarTop + 2;
  if (u <= 1) { x = K.lerp(x0, xt, u); y = K.lerp(y0, yt, u) - 260 * Math.sin(Math.PI * u); } else { const v = (u - 1) * 0.85; if (v > 0.5) continue; x = xt - 30 * v; y = yt - Math.abs(Math.sin(v * 12)) * 18 * Math.exp(-v * 4); if (v < 0.12) abGlint(ctx, xt, yt, 18, v / 0.12); }
  celShade(ctx, ell(x, y - 4, 6, 5, 10), '#a8a8b8', '#6a6a7a', { off: 2, lw: 1.5, line: '#3a3a4a' }); } } }

// ---------- S13 96.3-105.6: the kitchen in embers; the watch; through the window: the moon slides, the light under the door, the signal ----------
function a4S13Kitchen(ctx, t, cam) {
  const tc = AB_T2(t); kitchen(ctx, t, { embers: 0.5, view: { moon: A4_MOON.late } });
  a4Cat(ctx, t, { x: 790, y: KT.win.y + KT.win.h + 8, gy: KT.win.y + KT.win.h + 8, dir: -1, sit: 1, gaze: [1, -0.3], tip: 0.05, tailCurl: 0.5 + 0.4 * osc(tc, 1.7) }, '#8a4a3a');
  const P = { x: 600, y: 905, dir: 1, lid: Math.max(0.2, abBlinkAt(AB_T3(t), 99.3)), tip: 0.05 + idleSway(tc, 281, 0.015, 2.6), sq: breathe(tc, 282, 0.015), gaze: [1, -0.5], look: 0.3, mouth: 'closed', handRW: [652, 620], handL: [-20, -110] };
  if (tc > 98.06 && tc < 98.8) { P.handRW = [660, 618 - 6 * Math.abs(Math.sin(tc * 20))]; if (tc > 98.45) P.handLW = [650, 622]; }
  morgiana(ctx, t, P, 'lamp', { kick: 0.2 * osc(tc, 1.8), shc: '#8a4a3a' });
}
function a4S13Yard(ctx, t, cam) {
  const tc = AB_T2(t), mu = K.ease.inOut(beatIn(t, 100.34, 101.2)), moon = [K.lerp(1000, 1350, mu), K.lerp(170, 230, mu)], under = beatIn(tc, 101.98, 102.2), slit = tc > 102.86 ? beatIn(tc, 102.86, 103.0) : 0, sink = beatIn(tc, 103.5, 103.7);
  a4Yard(ctx, t, cam, { moon, G: { open: 0, lit: 0 }, gwin: { sh: 0, slit, lit: slit > 0 ? 0.8 : 0, inside: slit > 0 && tc > 103.42 && tc < 103.95 ? (c) => a4SlitEye(c, t, kfn(tc, [[103.42, 0.8], [103.9, -1]])) : null }, kwin: { lit: 0.3 }, lan: [0.9, 0.8, 0.3] });
  if (under > 0) { ctx.save(); ctx.globalAlpha = under; ctx.fillStyle = '#ffd98a'; ctx.fillRect(CY.G.x0 + 6, 894, 108, 6); ctx.restore(); abGlow(ctx, CY.G.cx, 900, 90, 0.5 * under, '#ffcf6a'); }
  // the hiders behind the jars: helmet points, the broom tip, the baker's nightcap (sink as his eye sweeps)
  const dy = 30 * sink; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 2200, 820); ctx.clip();   // v2 (note 3): only helmet points, broom tip and nightcap show
  guard(ctx, t, 0, { x: 960, y: 878 + dy, dir: -1, lid: 0.3 }, A4_N, { spear: 'up', shadow: false }); guard(ctx, t, 2, { x: 1300, y: 878 + dy, dir: -1, lid: abLid(t, 291), mouth: tc > 101.35 && tc < 101.8 ? 'o' : 'closed', handR: tc > 101.35 && tc < 101.8 ? PERSON_HANDS.mouthCover.R : undefined }, A4_N, { spear: 'up', shadow: false });
  baker(ctx, t, { x: 1180, y: 870 + dy + 40 * (pulse(tc, 101.3, 0.4)), dir: -1, lid: 0.6, tip: 0.1 * pulse(tc, 101.3, 0.4) }, A4_N, { shadow: false });
  ctx.save(); ctx.translate(0, dy); seg(ctx, 860, 760, 850, 560, 7, '#c8a070', 1.5); celShade(ctx, [[835, 560], [865, 560], [880, 520], [820, 520]], '#e8c870', '#b89040', { off: 4, lw: 2 }); ctx.restore(); ctx.restore();
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  // jar shadows swing round as the moon moves (long soft shadows on the paving)
  ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = '#3a2a6a'; for (const J of CY_JARS) { ctx.beginPath(); ctx.ellipse(J.x + K.lerp(-60, -110, mu), 900, 90, 12, K.lerp(0.05, 0.12, mu), 0, 7); ctx.fill(); } ctx.restore();
  if (slit > 0) a4SlitHand(ctx, t, { out: beatIn(tc, 102.9, 103.2), glint: tc > 103.0 && tc < 103.5 ? (t - 103.0) / 0.5 : 0, flick: tc > 104.0 ? pulse(tc, 104.0, 0.3) : 0 });
  a4Pebbles(ctx, t, [[104.05, 1005, 3], [104.15, 1235, 5]]);
}
function a4S13Frame(ctx, t, cam, S) {   // the dark window frame front pass with a sill and the candle stub
  const tc = AB_T2(t); ctx.save(); ctx.fillStyle = '#5a3440'; ctx.beginPath(); ctx.rect(0, 0, 1000, 1230); ctx.roundRect(70, 70, 860, 1000, 50); ctx.fill('evenodd');
  ctx.strokeStyle = '#8a5a4a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.roundRect(70, 70, 860, 1000, 50); ctx.stroke(); ctx.restore();
  celShade(ctx, K.rectPts(20, 1040, 960, 80), '#e0c8a8', '#b09878', { light: [1, -0.5], off: 10, lw: 3, line: '#6a5040' });
  const h = [60, 42, 26][Math.min(2, Math.floor(beatIn(t, 100.34, 101.3) * 3))]; celShade(ctx, K.rectPts(150, 1040 - h, 26, h), '#fffaf0', '#d8d0c0', { off: 4, lw: 2.5 });
  const f = 1 + 0.15 * Math.sin(tc * 21); abGlow(ctx, 163, 1040 - h - 14, 120, 0.6, '#ffc860'); celShade(ctx, [[157, 1040 - h - 2], [163, 1040 - h - 2 - 26 * f], [169, 1040 - h - 2]], '#fff2a0', '#ffb030', { off: 2, lw: 1.5 });
  a4Cat(ctx, t, { x: 860, y: 1040, gy: 1040, s: 0.9, dir: -1, sit: 1, gaze: tc > 101.98 && tc < 102.6 ? [1, 0] : [-1, -0.2], ears: tc > 101.98 && tc < 102.6 ? 1 : undefined }, '#6a3a3a');
}
AB_SHOTS.push({ a: 96.3, b: 99.68, ww: 1000, cam: a3Cam([[96.3, { x: 640, y: 600, zoom: 1.15 }], [98.0, { x: 650, y: 595, zoom: 1.17 }], [99.6, { x: 690, y: 520, zoom: 1.6 }], [99.68, { x: 692, y: 518, zoom: 1.6 }]]), world: a4S13Kitchen });
AB_SHOTS.push({ a: 99.68, b: 105.6, ww: 2200, cam: a3Cam([[99.68, { x: 1250, y: 640, zoom: 1.05 }], [101.9, { x: 1255, y: 640, zoom: 1.05 }], [102.8, { x: 1700, y: 640, zoom: 1.05 }], [104.0, { x: 1700, y: 640, zoom: 1.05 }], [104.7, { x: 1500, y: 640, zoom: 1.05 }], [105.6, { x: 1490, y: 640, zoom: 1.05 }]]), world: a4S13Yard, over: a4S13Frame });

// ---------- the lid keepers (S14-S16): the boy across jar 1, the baker seated on jar 2, the broom on jar 3, spear butts on jars 4 and 5 ----------
function a4ButtAng(hx, hy, bx, by) { return Math.atan2(hx - bx, -(hy - by)); }   // spear angle so that the butt rests on (bx, by)
function a4Keepers(ctx, t, o = {}) {
  const tc = AB_T2(t), strain = t > 108.42 && t < 112.4 ? 1 : 0, up = o.up || 0, bump = Math.max(pulse(tc, 109.16, 0.18), pulse(tc, 109.42, 0.18));
  const L = [];
  // the boy lying across jar 1
  L.push({ y: 900, f: () => apprentice(ctx, t, { x: 890 + 40 * up, y: CY.jarTop + 4 - 30 * up + 270 * up, lie: 1 - up, dir: -1, lid: abLid(t, 301), mouth: strain && !(tc > 109.78) ? 'o' : 'smile', gaze: tc > 109.78 ? [1, 0.2] : [0, -1], handL: [30, -150], handR: [40, -160] }, A4_N, { noCap: true, pan: true, panHand: 1, panRot: -0.5, shadow: up > 0.5, shc: A4_NSH }) });
  // the baker on jar 2 (hanging feet; bounces on the bumps; waves his pin at the reveal)
  L.push({ y: 905, f: () => { const B = { x: 1005, y: CY.jarTop + 52 - 12 * bump - (o.wave ? 0 : 0), dir: -1, sit: 1, seat: 'bench', lid: abLid(t, 311), sq: (1 + 0.05 * bump) * breathe(tc, 312, 0.015), tip: idleSway(tc, 313, 0.02, 2.4), gaze: [-1, 0.2], mouth: strain ? 'o' : 'closed', handL: [-30, -100], handR: [30, -120] };
    if (tc > 109.78 && tc < 110.2) { B.handR = PERSON_HANDS.hush.R; B.mouth = 'closed'; B.handLW = [1040, CY.jarTop + 30]; }
    if (o.wave) { B.handR = [40, -200 + 14 * Math.sin(tc * 12)]; B.mouth = 'smile'; B.gaze = [1, 0]; B.dir = 1; }
    baker(ctx, t, B, A4_N, { pin: true, pinRot: o.wave ? -1.2 + 0.4 * Math.sin(tc * 12) : -0.4, shadow: false }); } });
  // the old neighbour pressing jar 3 with her broom
  L.push({ y: 902, f: () => { const O = { x: 1062, y: 902, dir: 1, lid: abLid(t, 321), tip: 0.06 + idleSway(tc, 322, 0.02, 2.2), gaze: [1, -0.3], brow: 0.8, mouth: strain ? 'frown' : 'closed', handL: [40, -150], handR: [50, -170] };
    if (o.shoulder) { O.handR = [30, -200]; O.handL = [24, -110]; O.tip = -0.02; O.gaze = [1, 0]; O.mouth = 'smile'; }
    const Q = neighbourNight(ctx, t, O, A4_N, { shc: A4_NSH }); const [hx, hy] = a2Hand(Q, 1, { s: 0.88, age: 0.8 });
    if (!o.shoulder) { seg(ctx, hx, hy, 1118, CY.jarTop - 6 + 8 * (strain ? Math.abs(Math.sin(tc * 9)) : 0), 6, '#c8a070', 1.5); celShade(ctx, [[1100, CY.jarTop - 8], [1136, CY.jarTop - 8], [1146, CY.jarTop + 10], [1090, CY.jarTop + 10]].map(([x, y]) => [x, y - 18]), '#e8c870', '#b89040', { off: 3, lw: 2 }); }
    else { seg(ctx, hx, hy, hx - 40, hy - 150, 6, '#c8a070', 1.5); celShade(ctx, [[hx - 56, hy - 150], [hx - 30, hy - 150], [hx - 30, hy - 190], [hx - 56, hy - 190]], '#e8c870', '#b89040', { off: 3, lw: 2 }); } } });
  // two guards: spear butts on jars 4 and 5
  [[0, 1178, 3], [4, 1292, 4]].forEach(([k, x, j]) => L.push({ y: 906, f: () => { const P = { x, y: 906, dir: 1, lid: abLid(t, 331 + k), tip: 0.05 + idleSway(tc, 333 + k, 0.02, 2.5), gaze: [1, -0.3], mouth: strain ? 'frown' : 'closed', handL: [40, -160], handR: [50, -150] };
    const bx = CY_JARS[j].x - 6, by = CY.jarTop - 4 - 6 * (strain ? Math.abs(Math.sin(tc * 8 + k)) : 0), hx = x + 52 * 1.05, hy = 906 - 155 * 1.05;
    guard(ctx, t, k, P, A4_N, { spear: a4ButtAng(hx, hy, bx, by), spearHand: [hx, hy], shc: A4_NSH }); } }));
  return L;
}

// ---------- S14 105.6-110.3 (v2, review 1 note 3): one frame holds jars 4-6 and the guest window: the drumming hand flicks a cream
// pebble on a dotted arc onto lid 5 (it hops, a small italic TIK!), the second is caught by the captain; then the pan along the keepers ----------
const A4_PEB = [{ t0: 106.08, d: 0.5, to: [1350, CY.jarTop + 4], h: 170 }, { t0: 107.0, d: 0.56, to: [1606, 700], h: 120 }];
function a4Peb(ctx, t, P) { const from = [CY.gwin.x + 22, CY.gwin.y + 76], u = (t - P.t0) / P.d; if (u < 0 || u > 1.6) return;
  const at = (v) => [K.lerp(from[0], P.to[0], v), K.lerp(from[1], P.to[1], v) - P.h * Math.sin(Math.PI * v)];
  ctx.save(); ctx.fillStyle = '#fff6dc'; ctx.strokeStyle = '#2a1a3a'; ctx.lineWidth = 2; for (let k = 1; k <= 12; k++) { const v = k / 13; if (v > Math.min(1, u)) break; if (u > 1 && v < (u - 1) * 2) continue; const [x, y] = at(v); ctx.beginPath(); ctx.arc(x, y, 4.5, 0, 7); ctx.stroke(); ctx.fill(); } ctx.restore();
  if (u <= 1) { const [x, y] = at(u); abGlow(ctx, x, y, 30, 0.5, '#fff2c0'); celShade(ctx, ell(x, y, 12, 10, 12), '#fff2d0', '#d8c8a0', { off: 3, lw: 3, line: '#2a1a3a' }); } }
function a4S14World(ctx, t, cam) {
  const tc = AB_T2(t);
  a4Yard(ctx, t, cam, { moon: A4_MOON.watch, G: { open: 0, lit: 0 }, gwin: { sh: 0, slit: 1, lit: 0.8 }, kwin: { lit: 0.3 }, lan: [0.9, 0.8, 0.3] });
  if (tc < 108.0 || tc > 110.0) a4Cat(ctx, t, { x: 1120, y: 548, dir: 1, sit: 1, gaze: tc > 106.1 && tc < 107.8 ? [1, 0.6] : [1, 0.2], ears: tc > 106.5 && tc < 106.9 ? 1 : undefined });
  const hop = pulse(tc, 106.58, 0.18); a4Jars(ctx, t, cam, { shc: A4_NSH, st: (i) => (i === 4 && hop > 0 ? { lid: 0.5 * hop } : {}) });
  const K2 = a4Keepers(ctx, t), C = { x: 1600, y: 945, dir: 1, lid: abLid(t, 341), tip: idleSway(tc, 342, 0.02, 2.4), gaze: [1, -0.4], mouth: 'closed', brow: 0.8, handL: [30, -130], handR: [20, -120] };
  if (tc > 107.3 && tc < 108.4) { C.handRW = tc < 107.56 ? [K.lerp(1630, 1606, beatIn(tc, 107.3, 107.5)), K.lerp(800, 700, beatIn(tc, 107.3, 107.5))] : [1606, 700 + 20 * beatIn(tc, 107.7, 108.0)]; C.eyes = tc < 107.8 ? 'wide' : 'open'; C.gaze = [1, -0.6]; C.mouth = tc > 107.8 ? 'smile' : 'closed'; C.sq = landSquash(tc, 107.56, 0.06); }
  K2.push({ y: 945, f: () => guard(ctx, t, 3, C, A4_N, { lantern: { open: 0 }, shc: A4_NSH }) });
  for (const k of abByY(K2)) k.f();
  for (const P of A4_PEB) a4Peb(ctx, t, P);
  if (tc > 107.56 && tc < 108.0) { const u = beatIn(t, 107.56, 107.9); ctx.save(); ctx.globalAlpha *= 1 - u; ctx.strokeStyle = '#fff2c0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(1606, 700, 14 + 50 * u, 0, 7); ctx.stroke(); ctx.restore(); abGlint(ctx, 1606, 700, 30, u); }
  if (tc > 105.4) a4SlitHand(ctx, t, { drum: tc < 105.95 || (tc > 106.4 && tc < 106.85), flick: Math.max(pulse(tc, 105.96, 0.24), pulse(tc, 106.88, 0.24)), clench: beatIn(tc, 110.06, 110.2), glint: tc > 106.0 && tc < 106.5 ? (t - 106.0) / 0.5 : 0 });
  cyFig(ctx, t, A4_N);
}
function a4S14Over(ctx, t, cam, S) {
  if (t > 106.58 && t < 107.3) { const u = beatIn(t, 106.58, 107.3), [x, y] = abP(1350, CY.jarTop - 30, cam); ctx.save(); ctx.globalAlpha *= 1 - K.clamp((u - 0.7) / 0.3); ctx.translate(x + 20, y - 50 * u); ctx.rotate(-0.12); ctx.font = "italic 800 44px 'Barlow Semi Condensed'"; ctx.textAlign = 'center'; ctx.lineWidth = 8; ctx.strokeStyle = '#1a1030'; ctx.strokeText('TIK!', 0, 0); ctx.fillStyle = '#fff2c0'; ctx.fillText('TIK!', 0, 0); ctx.restore(); }
  if (t > 110.06 && t < 110.3) { const [x, y] = abP(2090, 470, cam); a4Glyph(ctx, 'q', x, y, 1.3, K.clamp((t - 110.06) / 0.15)); }
}
AB_SHOTS.push({ a: 105.6, b: 108.87, ww: 2200, cam: a3Cam([[105.6, { x: 1700, y: 640, zoom: 1 }], [108.87, { x: 1690, y: 640, zoom: 1 }]]), world: a4S14World, over: a4S14Over });
AB_SHOTS.push({ a: 108.87, b: 110.05, ww: 2200, cam: a3Cam([[108.87, { x: 1690, y: 640, zoom: 1 }], [109.5, { x: 1010, y: 640, zoom: 1 }], [110.05, { x: 1000, y: 640, zoom: 1 }]]), world: a4S14World, over: a4S14Over });
AB_SHOTS.push({ a: 110.05, b: 110.3, ww: 2200, cam: () => ({ x: 2000, y: 640, zoom: 1.3 }), world: a4S14World, over: a4S14Over });

// ---------- S15 110.3-117.8: the guest door opens, CAUGHT!, the long pan across everyone, sleepy Ali Baba, the whip back ----------
const A4_LX15 = (u) => kfn(u, [[110.9, 1930], [111.6, 1900], [111.88, 1900], [112.4, 1780]]);
function a4Lead15(t) { const tc = AB_T2(t), W = walk(A4_LX15, tc, { stride: 32 }), P = { y: 918, dir: -1, ...W, lid: 0.2, tip: idleSway(tc, 351, 0.015, 3), sq: breathe(tc, 352, 0.012), gaze: [-1, 0], mouth: 'frown', brow: 0.85, handL: [-14, -96], handR: [60, -200] };
  if (tc > 111.88 && tc < 112.46) { P.tip = 0.1; P.mouth = 'open'; }
  if (tc >= 112.46) { P.sq = 1 + 0.12 * Math.exp(-(tc - 112.46) * 3) ; P.eyes = 'wide'; P.mouth = 'o'; P.brow = -0.8; P.handR = [70, -150]; P.handL = [-60, -150]; P.tip = -0.05; }
  if (tc > 116.95) { P.eyes = 'open'; P.brow = 0.6; P.mouth = 'frown'; P.gaze = gazePlan(tc, [[116.95, [-1, 0]], [117.2, [1, -0.1]], [117.45, [1, -1]]]); P.look = tc < 117.2 ? -0.8 : 0.6; P.sq = 1 - 0.07 * beatIn(tc, 117.4, 117.7); P.handR = [30, -110]; P.handL = [-30, -110]; }
  return P; }
function a4S15World(ctx, t, cam) {
  const tc = AB_T2(t), lit = tc >= 112.46, gO = kfn(tc, [[110.32, 0], [111.5, 0.9]]), P = a4Lead15(t), inDoor = tc < 110.9;
  a4Yard(ctx, t, cam, { moon: A4_MOON.watch, G: { open: gO, lit: 1, inside: inDoor ? (c) => oilMerchant(c, t, { ...P, x: 1930 }, A4_N, { shadow: false }) : null }, gwin: { sh: 0, slit: 1, lit: 0.8 }, kwin: { lit: lit ? 1 : 0.3 }, bwin: tc > 116.3 ? 1 : 0,
    K: { open: tc > 115.6 ? 0.9 : 0, lit: 1, inside: tc > 115.6 ? (c) => { const A = { x: 170, y: 900, dir: 1, lid: tc < 116.36 ? 0.7 : abLid(t, 361), mouth: tc < 116.3 ? 'o' : 'o', eyes: tc > 116.36 ? 'wide' : 'open', handR: tc < 116.3 ? PERSON_HANDS.mouthCover.R : [20, -110], gaze: [1, 0], look: tc > 116.5 ? 0.6 : 0, tip: tc > 116.6 ? -0.06 : 0 }; aliNight(c, t, A, 'lamp', { candle: true, shadow: false }); } : null }, lan: lit ? 1 : [0.9, 0.8, 0.5] });
  a4Cat(ctx, t, { x: 1250, y: 548, dir: -1, sit: 1, gaze: [1, 0.4], puff: lit && tc < 113.5 ? 1 : 0 });
  if (lit) { const k = 0.6 + 0.4 * Math.exp(-(t - 112.46) * 2); for (const [x, y] of [[1560, 905], [1000, 930], [720, 905]]) { darkLantern(ctx, x, y - 70, 0.9, { open: 1, t }); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.35 * k; ctx.fillStyle = '#ffc070'; ctx.beginPath(); ctx.ellipse(x, 915, 260, 40, 0, 0, 7); ctx.fill(); ctx.restore(); } }
  a4Jars(ctx, t, cam, { shc: A4_NSH });
  const list = a4Keepers(ctx, t, { wave: lit, shoulder: lit });
  if (lit) { list.push({ y: 945, f: () => morgiana(ctx, t, { x: 1000 - 70, y: 960, dir: 1, lid: tc > 115.2 ? 0.35 : abLid(t, 371), gaze: [1, 0], brow: tc > 115.2 ? 0.6 : 0, mouth: 'smile', handL: PERSON_HANDS.folded.L, handR: PERSON_HANDS.folded.R, tip: idleSway(tc, 372, 0.02, 2.4) }, A4_N, { kick: 0.25 * osc(tc, 1.6), shc: A4_NSH }) });
    [[0, 650, 1], [1, 815, -1]].forEach(([k, x, d]) => list.push({ y: 912, f: () => guard(ctx, t, k, { x, y: 912, dir: d, lid: abLid(t, 381 + k), gaze: [1, 0], tip: 0.05 }, A4_N, { spear: d > 0 ? 1.2 : -1.2, shc: A4_NSH }) })); }
  [[2, 1440, 0.15], [3, 1530, 0], [4, 1620, 0.1]].forEach(([k, x, dl]) => list.push({ y: 950 + k, f: () => { const G = { x: lit ? x : x + 40, y: 950, dir: -1, lid: abLid(t, 391 + k), tip: lit ? 0.06 : 0, gaze: [1, 0], mouth: 'closed', brow: 0.7 }; if (k === 3 && lit) { G.handL = [30, -220]; }
    guard(ctx, t, k, G, A4_N, k === 3 ? { lantern: { open: lit ? 1 : 0 }, shc: A4_NSH } : { spear: lit ? 1.25 : 'up', shc: A4_NSH }); } }));
  if (!inDoor) list.push({ y: 918, f: () => oilMerchant(ctx, t, P, A4_N, { shc: A4_NSH, kick: 0.3 * (speed(A4_LX15, tc) !== 0 ? 1 : 0) + (lit ? 0.4 * Math.exp(-(t - 112.46) * 3) : 0) }) });
  for (const k of abByY(list)) k.f();
  if (tc > 112.46 && tc < 113.3) { const R = K.rng(9); for (let i = 0; i < 4; i++) { const u = (t - 112.5) / 0.6; celShade(ctx, ell(P.x - 60 + i * 12, 700 + 220 * u * u + R() * 10, 5, 4, 10), '#a8a8b8', '#6a6a7a', { off: 2, lw: 1.5 }); } }
  cyFig(ctx, t, A4_N);
}
AB_SHOTS.push({ a: 110.3, b: 112.4, ww: 2200, cam: a3Cam([[110.3, { x: 1900, y: 680, zoom: 1.2 }], [112.4, { x: 1880, y: 680, zoom: 1.22 }]]), world: a4S15World });
AB_SHOTS.push({ a: 112.4, b: 116.9, ww: 2200, cam: a3Cam([[112.4, { x: 1500, y: 615, zoom: 1 }], [113.2, { x: 1500, y: 615, zoom: 1 }], [116.4, { x: 500, y: 615, zoom: 1 }], [116.9, { x: 495, y: 615, zoom: 1 }]]), world: a4S15World });
AB_SHOTS.push({ a: 116.9, b: 117.8, ww: 2200, cam: a3Cam([[116.9, { x: 1750, y: 640, zoom: 1.1 }], [117.8, { x: 1755, y: 640, zoom: 1.1 }]]), world: a4S15World });
