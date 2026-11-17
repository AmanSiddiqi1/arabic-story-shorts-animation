// ===== KD-017 main: world draw (one set for the whole film), camera, lettering, hourglass, inset, card, sound =====
// ---------- camera (world units; zero-length key pairs are cuts) ----------
const K17_CAM = [
  [0, { x: 780, y: 700, zoom: 1.5 }], [4.5, { x: 780, y: 700, zoom: 1.5 }], [6.9, { x: 850, y: 615, zoom: 1.0 }], [9.4, { x: 850, y: 615, zoom: 1.0 }], [10.4, { x: 1100, y: 680, zoom: 1.4 }],
  [12.0, { x: 1100, y: 680, zoom: 1.4 }], [12.6, { x: 850, y: 615, zoom: 1.0 }], [17.0, { x: 850, y: 615, zoom: 1.0 }], [17.5, { x: 1065, y: 740, zoom: 1.7 }], [21.84, { x: 1065, y: 740, zoom: 1.7 }],
  [21.86, { x: 440, y: 660, zoom: 1.1 }], [26.6, { x: 440, y: 660, zoom: 1.1 }], [28.2, { x: 1050, y: 660, zoom: 1.1 }], [29.9, { x: 1050, y: 660, zoom: 1.1 }], [30.9, { x: 760, y: 700, zoom: 1.5 }],
  [40.5, { x: 790, y: 700, zoom: 1.5 }], [42.6, { x: 740, y: 680, zoom: 1.3 }], [47.82, { x: 740, y: 680, zoom: 1.3 }], [48.15, { x: 430, y: 680, zoom: 1.3 }], [53.9, { x: 430, y: 680, zoom: 1.3 }],
  [53.91, { x: 790, y: 690, zoom: 1.7 }], [62.5, { x: 790, y: 690, zoom: 1.7 }], [63.6, { x: 880, y: 615, zoom: 1.0 }], [65.2, { x: 880, y: 615, zoom: 1.0 }], [67.6, { x: 1250, y: 650, zoom: 1.1 }],
  [68.3, { x: 1330, y: 650, zoom: 1.15 }], [73.9, { x: 1330, y: 650, zoom: 1.15 }], [74.8, { x: 1380, y: 680, zoom: 1.5 }], [76.55, { x: 1380, y: 680, zoom: 1.5 }], [76.9, { x: 740, y: 690, zoom: 1.4 }],
  [83.5, { x: 740, y: 690, zoom: 1.6 }], [89.3, { x: 740, y: 690, zoom: 1.8 }], [91.5, { x: 740, y: 690, zoom: 1.8 }], [91.6, { x: 790, y: 690, zoom: 1.3 }], [93.6, { x: 790, y: 690, zoom: 1.6 }],
  [101.35, { x: 790, y: 690, zoom: 1.6 }], [102.85, { x: 990, y: 650, zoom: 1.05 }], [103.54, { x: 990, y: 650, zoom: 1.05 }], [103.55, { x: 600, y: 680, zoom: 1.25 }], [107.1, { x: 620, y: 680, zoom: 1.32 }], [107.11, { x: 330, y: 690, zoom: 1.6 }], [111.29, { x: 330, y: 690, zoom: 1.6 }],
  [111.3, { x: 1180, y: 680, zoom: 1.25 }], [119.2, { x: 1180, y: 680, zoom: 1.25 }], [119.8, { x: 1270, y: 680, zoom: 1.25 }], [120.6, { x: 1270, y: 680, zoom: 1.25 }], [121.3, { x: 1200, y: 680, zoom: 1.25 }], [123.07, { x: 1200, y: 680, zoom: 1.25 }], [123.08, { x: 680, y: 670, zoom: 1.45 }], [130.3, { x: 680, y: 670, zoom: 1.45 }], [130.9, { x: 780, y: 740, zoom: 1.8 }],
  [133.6, { x: 780, y: 740, zoom: 1.8 }], [134.6, { x: 850, y: 615, zoom: 1.0 }], [137.2, { x: 950, y: 615, zoom: 1.05 }], [141.0, { x: 1150, y: 640, zoom: 1.1 }], [142.0, { x: 1230, y: 680, zoom: 1.5 }],
  [145.7, { x: 1230, y: 680, zoom: 1.5 }], [146.5, { x: 1160, y: 690, zoom: 1.5 }], [151.9, { x: 1160, y: 690, zoom: 1.5 }], [157.7, { x: 1200, y: 690, zoom: 1.7 }], [161.2, { x: 1200, y: 690, zoom: 1.7 }], [162.3, { x: 850, y: 615, zoom: 1.0 }], [165.5, { x: 850, y: 615, zoom: 1.0 }],
  [166.4, { x: 910, y: 615, zoom: 1.0 }], [K17_DUR, { x: 910, y: 615, zoom: 1.0 }]];
// the camera height follows the zoom so the floor always sits low in the panel (floor at panel y ~ 915)
const k17Cam = (t) => { const c = K.camAt(K17_CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, K17_WW - 500 / z), y: K.clamp(900 - 300 / z, 615 / z, K17_VH - 615 / z), zoom: z }; };
// footfalls for dust (computed once)
const K17_FALLS = [...footfalls(k17X(K17_THX), 65.3, 67.6, 27).map((f) => ({ ...f, s: 1 })), ...footfalls(k17X(K17_THX), 75.2, 77.6, 27).map((f) => ({ ...f, s: 0.8 })), ...footfalls(k17X(K17_THX), 90.5, 91.0, 27).map((f) => ({ ...f, s: 0.6 })), ...footfalls(k17X(K17_THX), 93.2, 93.8, 27).map((f) => ({ ...f, s: 0.6 })), ...footfalls(k17X(K17_THX), 120.56, 121.4, 27).map((f) => ({ ...f, s: 0.6 })), ...footfalls(k17X(K17_OWX), 128.3, 130.3, 28).map((f) => ({ ...f, s: 1.2 })), ...footfalls(k17X(K17_OWX), 139.2, 142.3, 28).map((f) => ({ ...f, s: 1 }))];
const K17_COINS = [[1050, 897], [1072, 897], [1094, 897], [1061, 885], [1083, 885], [1072, 873]];

function k17Shelf(ctx, t, mode) {
  for (const [name, it] of Object.entries(K17_ITEMS)) { const st = it.path(t);
    if (mode === 'shelf' && st === 'shelf') it.draw(ctx, it.at[0], it.at[1], 0.9, name === 'jar' ? k17JarRot(t) : 0);
    if (mode === 'fly' && st && st.fly) it.draw(ctx, st.fly[0], st.fly[1], 0.9, st.rot || 0); }
}
function k17HeldItems(ctx, t, who, P) {
  for (const [name, it] of Object.entries(K17_ITEMS)) { const st = it.path(t); if (typeof st !== 'string' || !st.startsWith('hand:' + who)) continue; const h = k17Hand(P, +st.split(':')[2]);
    it.draw(ctx, h[0], h[1] + (name === 'plateB' ? 20 : 14), 0.9, 0); if (name === 'cup' && who === 'TH') { k17Twinkle(ctx, h[0] + 16, h[1] - 40, t, 33.2); k17Twinkle(ctx, h[0] - 14, h[1] - 20, t, 33.6, 20); } }
}

// ---------- the world: one cutaway house for the whole film ----------
function k17World(ctx, t, o = {}) {
  const night = k17Night(t), fo = k17FrontOpen(t), bo = k17BackOpen(t), kn = k17Kn(t);
  k17Back(ctx, night);
  // hanging lamp (swings with the knocks)
  ctx.save(); ctx.translate(850, K17_CEIL); ctx.rotate(k17LampSwing(t) + (t > 123.08 && t < 125.2 ? 0 : 0)); ctx.translate(-850, -K17_CEIL); hangingLamp(ctx, 850, 470, t, { lit: night ? 1 : 0, chain: K17_CEIL }); ctx.restore();
  // moonlight wedge through the open back door
  if (night && bo > 0.05) { ctx.save(); ctx.globalAlpha = 0.24 * bo; ctx.fillStyle = '#fff3c0'; K.poly(ctx, [[1281, 616], [1281, 900], [1010, 942], [1160, 900], [1281, 616]], true); ctx.fill(); ctx.restore(); }
  // the yard is in the dark while the back door is shut at night
  if (night && bo < 0.99) { ctx.save(); ctx.globalAlpha = 0.45 * (1 - bo); ctx.fillStyle = NAVY2; ctx.fillRect(1321, 560, 480, 670); ctx.restore(); }
  k17Shelf(ctx, t, 'shelf');
  for (const [x, y, t0] of [[715, 640, 2.52], [600, 640, 2.75], [650, 790, 2.98]]) k17Twinkle(ctx, x, y, t, t0, 30);
  if (t >= 3.5) k17Broom(ctx, [744, 762], [752, 898]);
  const mat = k17Mat(t); shape(ctx, [[mat.x0, 898], [mat.x0 + 90, 898], [mat.x0 + 96, 912], [mat.x0 - 4, 912 - mat.lift * 0.2], [mat.x0 - 6, 906 - mat.lift]], '#3f9d4a', { lw: 4, seed: 400, dot: '#2b7a38', pitch: 6, rad: 0.25, da: 0.5 });
  const pot = k17PotLift(t); if (pot.lift <= 0) k17Pot(ctx, 1522, 898, 0, 0);
  // the owner's long shadow through the opening front door (125.9-128.6)
  if (t > 125.9 && t < 128.7) { const L = 420 * K17B(t, 125.9, 1.6, 'inOut'), a = k17Fade(t, 125.9, 128.7, 0.3); ctx.save();
    ctx.globalAlpha = 0.22 * a; ctx.fillStyle = '#ffe9a0'; K.poly(ctx, [[420, 898], [420 + L * 1.25, 905], [420 + L * 1.25, 985], [420, 960]], true); ctx.fill();
    ctx.globalAlpha = 0.6 * a; ctx.fillStyle = C.black; K.poly(ctx, [[420, 914], [420 + L, 930], [420 + L, 952], [420, 942]], true); ctx.fill();
    ctx.beginPath(); ctx.ellipse(420 + L + 26, 941, 30, 15, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(420 + L + 58, 941, 22, 18, 0, 0, 7); ctx.fill(); ctx.restore(); }
  // skid marks
  for (const [t0, x0, x1] of [[91.6, 840, 900], [116.86, 1110, 1145], [67.6, 1200, 1240]]) if (t > t0 + 0.1 && t < t0 + 2.6) { const u = K.clamp((t - t0) / 0.45); ctx.save(); ctx.globalAlpha = 0.5 * k17Fade(t, t0, t0 + 2.6, 0.5); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); for (const dy of [-2, 6]) { ctx.moveTo(x0 - 10, 900 + dy); ctx.lineTo(K.lerp(x0, x1, u) - 10, 900 + dy); } ctx.stroke(); ctx.restore(); }
  const SV = k17SV(t, null), TH0 = k17TH(t, SV), SVf = k17SV(t, TH0), TH = k17TH(t, SVf), OW = k17OW(t, TH), WF = k17WF(t, OW);
  person(ctx, WF); if (WF.bundle) { const h = k17Hand(WF, 1); shape(ctx, ell(h[0], h[1] + 18, 20, 16, 14), C.blue, { lw: 4, seed: 410, dot: C.white, pitch: 6, rad: 0.25, da: 0.5 }); }
  k17Walls(ctx, night);
  k17Door(ctx, 'F', fo, kn, { bulge: k17Bulge(t) * 0.25, rattle: 0.03 * kn, screw: K17B(t, 105.0, 0.3) * (t < 125.68 ? 1 : 0) });
  k17Door(ctx, 'B', bo, 0, { glow: 0.8 * (pulse(t, 63.25, 1.3) + pulse(t, 88.6, 0.7)) });
  // knocks: impact stars outside, dust from the lintel inside
  for (const [h, a] of K17_KNOCKS) { if (a >= 0.5 && t >= h && t < h + 0.9) { k17Impact(ctx, 368, 735, t, h, Math.min(1.3, a)); k17Dust(ctx, 422, 520, K17_DTOP + 6, t, h, 3); } }
  // sacks (in front of the shelf); the servant hides behind sack B from 139.9 to 163.75
  const SA = k17SackA(t), SB = k17SackB(t), hide = t >= 139.9 && t < 163.75;
  const drawSacks = () => { if (SA) k17Sack(ctx, SA.x, K17_GR, SA.fill, { poke: SA.poke, sq: 1 - k17SackBounce(t, SA.bounce) }); if (SB) k17Sack(ctx, SB.x, K17_GR, SB.fill, { sq: (SB.sq ?? 1) - k17SackBounce(t, SB.bounce), slump: SB.slump }); };
  if (!hide) drawSacks();
  // S2: the friend's sack, the coins
  if (t >= 17.25 && t < 17.75) { const pf = K17B(t, 17.25, 0.25); ctx.save(); ctx.globalAlpha = t < 17.6 ? 1 : 1 - (t - 17.6) / 0.15; k17Sack(ctx, 1070, K17_GR, 0.15 + 0.85 * pf); ctx.restore(); if (t > 17.6) dustBurst(ctx, 1070, 860, t - 17.6, 10, 10, 26, 70, 0.5, 7); }
  if (t >= 17.6 && t < 21.0) K17_COINS.forEach(([cx, cy], i) => { const th = 19.7 + i * 0.15, toSV = i % 2 === 0, k = Math.floor(i / 2), rec = toSV ? [SVf.x + 46, 800 - k * 7] : [TH.x - 46, 800 - k * 7];
    if (t > 20.75) return; let p = [cx, cy - 10 * k17Pop(t, 17.62, 0.3) + 10]; if (t >= th) { const u = K.clamp((t - th) / 0.3); p = [K.lerp(cx, rec[0], u), K.lerp(cy, rec[1], u) - 70 * 4 * u * (1 - u)]; } k17Coin(ctx, p[0], p[1]); });
  // cast (order: who touches whom is drawn last)
  const svOver = k17In(t, 49.6, 59.0) || k17In(t, 86.5, 92.5) || k17In(t, 116.8, 118.95);
  const order = svOver ? [TH, SVf] : [SVf, TH];
  for (const P of order) {
    if (P === TH && P.alpha === 0) continue;
    person(ctx, P);
    if (P === SVf) { if (P.broom) k17Broom(ctx, k17Hand(P, 0), P.broom); if (t >= 29.55 && t < 31.0) k17SackHeld(ctx, ...k17Hand(P, 1), 0.7, 0.1 * Math.sin(t * 6)); k17HeldItems(ctx, t, 'SV', P); }
    else { if (P.held === 'sack') k17SackHeld(ctx, ...k17Hand(P, 1), 0.7, 0.15 * Math.sin(t * 8)); if (P.held === 'two' || P.held === 'one') { const h = k17Hand(P, 1); k17SackHeld(ctx, h[0] + 10, h[1] - 6, 0.7, 0.5); if (P.held === 'two') k17SackHeld(ctx, h[0] + 24, h[1] - 2, 0.7, 0.8); } k17HeldItems(ctx, t, 'TH', P); }
  }
  if (hide) drawSacks();
  if (pot.lift > 0) k17Pot(ctx, 1522, 898, pot.lift, pot.tilt);   // the lifted pot in front of the thief's body
  person(ctx, OW); k17FacePalm(ctx, OW); k17HeldItems(ctx, t, 'OW', OW); if (OW.flush) k17Flush(ctx, OW, OW.flush); if (OW.steam) steam(ctx, k17Head(OW)[0] + 10, k17Head(OW)[1] - 70, t);
  if (OW.arcs) { const h = k17Head(OW); soundArcs(ctx, h[0] + 50, h[1] + 20, 1, t, C.white); }
  if (OW.inArcs) { ctx.save(); ctx.globalAlpha = 0.6; soundArcs(ctx, 372, 700, -1, t * 0.7, C.white); ctx.restore(); }
  k17Shelf(ctx, t, 'fly');
  // tossed sack (29.08-29.55)
  if (t >= 29.08 && t < 29.55) { const p = k17Arc(t, 29.08, 0.47, [1240, 740], [SVf.x + 40, 780], 80); k17SackHeld(ctx, p[0], p[1], 0.7, (t - 29.08) * 12); }
  // dust: footfalls, falls, stamps, the spinning legs
  for (const fl of K17_FALLS) if (t >= fl.t && t < fl.t + 0.5) dustBurst(ctx, fl.x, K17_GR - 4, t - fl.t, 4, 5, 11, 26 * fl.s, 0.45, Math.round(fl.t * 10));
  for (const [t0, x, n] of [[45.15, 880, 8], [67.6, 1250, 8], [92.64, SVf.x + 20, 6], [91.62, 850, 8], [119.36, 1190, 10], [145.3, 1245, 8]]) if (t >= t0 && t < t0 + 0.6) dustBurst(ctx, x, K17_GR - 6, t - t0, n, 7, 16, 60, 0.55, Math.round(t0));
  if (TH.runDust) { for (let k = Math.floor((t - 137.6) / 0.12) - 4; k <= Math.floor((t - 137.6) / 0.12); k++) { if (k < 0) continue; const t0 = 137.6 + k * 0.12; dustBurst(ctx, k17X(K17_THX)(t0) - 30, K17_GR - 8, t - t0, 4, 8, 16, 46, 0.5, k); } }
  if (o.inset) return;
  // icons, balloons and thought clouds (world space, above the heads)
  const SVh = k17Head(SVf), THh = k17Head(TH);
  if (t >= 11.4 && t < 12.3) { const k = k17Pop(t, 11.45, 0.3) * k17Fade(t, 11.4, 12.3, 0.15); ctx.save(); ctx.translate(1262, 640); ctx.scale(k, k); k17Sack(ctx, 0, 0, 1, {}); k17Coin(ctx, 34, -30, 16); ctx.restore(); }
  if (SVf.bulb > 0) bulb(ctx, SVh[0], SVh[1] - 110, SVf.bulb * k17Fade(t, 57.3, 57.95, 0.1));
  if (t >= 60.34 && t < 63.2) { ctx.save(); ctx.globalAlpha = k17Fade(t, 60.34, 63.2, 0.2); k17Balloon(ctx, SVh[0] - 95, SVh[1] - 175, 220, 170, SVh[0] - 10, SVh[1] - 40, K.clamp((t - 60.34) / 0.3), (c) => { k17DoorIcon(c, t >= 61.9 ? -30 : 0, 60, 0.6); if (t >= 61.9) k17Well(c, 55, 50, 0.3 * k17Pop(t, 61.9)); }); ctx.restore(); }
  if (t >= 61.9 && t < 65.1) { ctx.save(); ctx.globalAlpha = k17Fade(t, 61.9, 65.1, 0.25); k17Cloud(ctx, THh[0] + 60, THh[1] - 190, 250, 185, t, K.clamp((t - 61.9) / 0.5), [THh[0] + 20, THh[1] - 50], (c) => { k17Well(c, -20, 75, 0.62 * k17Pop(t, 62.0)); k17DoorIcon(c, 90, 55, 0.24); }); ctx.restore(); }
  if (t >= 78.88 && t < 86.8) { const burst = t >= 86.58, a = burst ? 0 : k17Fade(t, 78.88, 86.6, 0.2), bx = THh[0] + 80, by = THh[1] - 170;
    if (!burst) { ctx.save(); ctx.globalAlpha = a; k17Balloon(ctx, bx, by, 200, 160, THh[0] + 20, THh[1] - 40, K.clamp((t - 78.88) / 0.3), (c) => { if (t < 80.68) k17DoorIcon(c, -14, 62, 0.5, { tick: t > 79.3 }); else { k17Well(c, -6, 48, 0.42 * k17Pop(t, 80.68)); sfx(c, '?', 58, -28, 64, k17Pop(t, 80.8), { fill: C.yellow, rot: 0.1 }); } }); ctx.restore(); }
    else { ctx.save(); ctx.globalAlpha = 1 - (t - 86.58) / 0.22; star(ctx, bx, by, 120 * K17B(t, 86.58, 0.15), C.yellow, 0.3); ctx.restore(); } }
  if (t >= 154.08 && t < 155.6) { ctx.save(); ctx.globalAlpha = k17Fade(t, 154.08, 155.6, 0.2); k17Balloon(ctx, THh[0] + 60, THh[1] - 165, 190, 150, THh[0] + 18, THh[1] - 40, K.clamp((t - 154.08) / 0.3), (c) => k17DoorIcon(c, -14, 58, 0.46, { tick: t > 154.45 })); ctx.restore(); }
  if (t >= 97.0 && t < 103.6) { ctx.save(); ctx.globalAlpha = k17Fade(t, 97.0, 103.6, 0.25); k17Cloud(ctx, THh[0] + 20, THh[1] - 200, 260, 200, t, K.clamp((t - 97.0) / 0.5), [THh[0] + 4, THh[1] - 50], (c) => { k17Well(c, 0, 76, 0.72 * k17Pop(t, 97.1), { mark: 'x', mk: K.clamp((t - 100.3) / 0.25) }); }); ctx.restore(); }
  const cS12 = (a, b, q) => { if (t < a || t >= b) return; const wob = t >= 113.86 && t < 114.9 ? 8 * Math.sin(t * 40) * (1 - (t - 113.86)) : 0; ctx.save(); ctx.globalAlpha = k17Fade(t, a, b, 0.25); k17Cloud(ctx, THh[0] - 40 + wob, THh[1] - 225, 270, 200, t, K.clamp((t - a) / 0.5), [THh[0] - 10, THh[1] - 50], (c) => { k17Well(c, -14, 80, 0.7, q ? { mark: '?', mk: 0.8 } : {}); }); ctx.restore(); };
  cS12(111.6, 118.9, false); cS12(121.42, 123.08, true);
  if (t >= 156.54 && t < 160.36) { ctx.save(); ctx.globalAlpha = Math.min(k17Fade(t, 156.54, 160.36, 0.2), t < 158.5 ? 1 : 1 - (t - 158.5) / 1.86); k17Cloud(ctx, THh[0] + 40, THh[1] - 205, 250, 190, t, K.clamp((t - 156.54) / 0.45), [THh[0] - 4, THh[1] - 50], (c) => { k17Well(c, -14, 76, 0.66, { mark: '?', mk: 0.8 }); }); ctx.restore(); }
  if (t >= 73.36 && t < 74.86) { ctx.save(); ctx.globalAlpha = (Math.floor((t - 73.36) / 0.18) % 2 === 0 ? 1 : 0.55) * k17Fade(t, 73.36, 74.86, 0.15); k17Well(ctx, 1405, 898, 0.72, { ghost: true, ghostC: C.white, ghostW: 10.5, mark: '?', mk: 0.9 }); ctx.restore(); }
  if (SVf.chalk != null || (t >= 89.34 && t < 90.0)) { const cx = kfn(88.22, K17_SVX) + 50, u = SVf.chalk ?? 1, al = t < 89.34 ? 1 : 1 - (t - 89.34) / 0.66; k17Chalk(ctx, [[cx, 690], [cx + 25, 690], [cx + 25, 790]], u, al); k17Chalk(ctx, [[cx, 690], [cx - 25, 690], [cx - 25, 790]], u, al); }
  if (t >= 120.05 && t < 120.62) sfx(ctx, '?', 1590, 770, 70, k17Pop(t, 120.05, 0.2) * k17Fade(t, 120.05, 120.62, 0.1), { fill: C.yellow, rot: 0.15 });
  if (t >= 136.9 && t < 137.5) sfx(ctx, '!', (SVh[0] + THh[0]) / 2, SVh[1] - 120, 110, k17Pop(t, 136.9, 0.2) * k17Fade(t, 136.9, 137.5, 0.12), { fill: C.yellow });
}

// ---------- panel-space overlays: labels, arrows, lettering, hourglass, inset ----------
function k17Over(ctx, t, cam, S) {
  const P = (x, y) => k17P(x, y, cam), lab = (txt, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = k17Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, K17B(t, a, 0.35), { size: 44, align: 'center', ...o }); ctx.restore(); };
  const arr = (a0, a1, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = k17Fade(t, a, b, 0.2); S.arrow(ctx, a0, a1, K17B(t, a, 0.4), o); ctx.restore(); };
  const word = (txt, x, y, a, b, size = 70, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = k17Fade(t, a, b, 0.15); if (o.fill === C.red) k17Keyline(ctx, txt, x, y, size, k17Pop(t, a, 0.25), o); sfx(ctx, txt, x, y, size, k17Pop(t, a, 0.25), o); ctx.restore(); };
  // S1 the two doors
  { const f = P(400, 600), b = P(1300, 600); lab('FRONT DOOR', Math.max(190, f[0] + 60), f[1] - 70, 6.92, 8.9); arr([f[0] + 30, f[1] - 50], [f[0], f[1] + 20], 6.92, 8.9, { width: 18 }); lab('BACK DOOR', Math.min(820, b[0] - 60), f[1] - 70, 7.27, 8.9); arr([b[0] - 30, b[1] - 50], [b[0], b[1] + 20], 7.27, 8.9, { width: 18, bend: -0.12 }); }
  if (t >= 19.7 && t < 20.75) { const s = P(kfn(t, K17_SVX), 640), h = P(kfn(t, K17_THX), 640); ctx.save(); ctx.globalAlpha = k17Fade(t, 19.7, 20.75, 0.15);
    const nS = t >= 20.3 ? 3 : t >= 20.0 ? 2 : 1, nT = t >= 20.45 ? 3 : t >= 20.15 ? 2 : t >= 19.85 ? 1 : 0; S.counter(ctx, nS, s[0] - 60, s[1] - 80, 1, { size: 70 }); if (nT) S.counter(ctx, nT, h[0] + 60, h[1] - 80, 1, { size: 70, seed: 78 }); ctx.restore(); }
  // S5-S7
  { const d = P(390, 600); word('KNOCK! KNOCK!', Math.max(250, d[0] + 170), d[1] - 60, 46.06, 47.8, 70, { rot: -0.12 }); }
  { const o = P(300, 560); word('OPEN UP!', o[0] + 110, o[1] - 100, 52.82, 54.0, 84, { rot: -0.1, fill: C.red, stroke: C.black }); }
  if (t >= 63.2 && t < 64.9) { const s = P(kfn(t, K17_SVX) + 70, 745), d = P(1270, 760); arr(s, d, 63.25, 64.9, { width: 26, bend: 0.08 }); }
  { const z = P(900, 640); word('ZOOM!', z[0], z[1] - 80, 65.3, 66.4, 76, { rot: -0.15 }); }
  { const g0 = P(1330, 760), g1 = P(1715, 760); arr([g0[0] + 10, g0[1] - 10], [g1[0], g1[1]], 69.22, 71.3, { width: 26, bend: 0.2 }); lab('WAY OUT', Math.min(820, g1[0] - 30), g1[1] - 200, 69.4, 71.3); }
  { const w = P(1470, 600); word('NO WELL?', w[0] + 10, w[1] - 140, 73.4, 74.85, 66, { rot: 0.08 }); }
  if (t >= 88.6 && t < 89.35) { const s = P(kfn(t, K17_SVX) + 80, 560); arr([s[0], s[1]], [Math.min(960, s[0] + 320), s[1]], 88.6, 89.35, { width: 22, bend: 0 }); }
  { const g = P(kfn(91.6, K17_SVX) + 40, 600); word('GO!', g[0], g[1] - 70, 91.6, 92.6, 90, { rot: -0.1, fill: C.red }); }
  { const d = P(430, 600); word('BANG! BANG!', d[0] + 170, d[1] - 40, 105.7, 107.1, 74, { rot: 0.1 }); }
  if (t >= 115.32 && t < 116.85) { const g0 = P(1330, 760), g1 = P(1520, 740); ctx.save(); ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 14); arr([g0[0], g0[1]], g1, 115.32, 116.85, { width: 24, bend: 0.2 }); ctx.restore(); }
  { const d = P(420, 600); word('CREAK...', d[0] + 140, d[1] - 50, 125.7, 127.6, 62, { rot: -0.06, fill: C.white }); }
  { const m = P(930, 600), sb = P(870, 770); lab('MY THINGS!', m[0], m[1], 130.98, 132.7, { fill: C.yellow }); arr([m[0], m[1] + 30], sb, 131.0, 132.7, { width: 20, bend: -0.15 }); }
  { const g = P(1240, 600); word('GOTCHA!', g[0] - 40, g[1] - 110, 142.5, 143.9, 80, { rot: -0.08, fill: C.red }); }
  if (t >= 148.5 && t < 149.7) { const g0 = P(1215, 590), g1 = P(1420, 700); arr(g0, g1, 148.5, 149.7, { width: 24, bend: -0.25 }); }
  if (t >= 162.78 && t < 164.7) { const a = P(kfn(t, K17_OWX), 600); lab('TO THE GOVERNOR', Math.max(255, a[0]), Math.max(140, a[1] - 140), 162.78, 164.7); arr([Math.max(260, a[0] + 60), Math.max(160, a[1] - 100)], [Math.max(60, a[0] - 160), Math.max(160, a[1] - 100)], 162.85, 164.7, { width: 24, bend: 0 }); }
  // hourglass (top right of the panel)
  if (t >= 36.16 && t < 146.2) { const fill = t < 55.4 ? 1 : k17Lin(t, [[55.4, 1], [65.2, 0.75], [83.5, 0.6], [103.5, 0.4], [111.3, 0.25], [123.1, 0.05], [140.0, 0]]), red = K17B(t, 140.0, 0.4), rot = t < 140.6 ? 0 : -1.5 * K.ease.back(K.clamp((t - 140.6) / 0.8));
    k17Hourglass(ctx, 930, 150, fill, { run: t >= 55.4 && t < 140.0, red, rot, k: k17Pop(t, 36.16, 0.4) * K.clamp((146.2 - t) / 0.3) });
    lab('PLENTY OF TIME', 770, 290, 38.42, 40.7, { size: 44 }); word('TOO LATE!', 750, 300, 141.6, 142.5, 80, { rot: -0.08, fill: C.red }); }
  // inset circle (top left): the front door bulging while we stay at the back door (116.86-122.7)
  if (t >= 116.86 && t < 122.7) { const r = 120 * k17Pop(t, 116.86, 0.35) * K.clamp((122.7 - t) / 0.25); if (r > 1) { const cx = 175, cy = 210;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.translate(cx, cy); ctx.scale(r / 230, r / 230); ctx.translate(-430, -720); k17World(ctx, t, { inset: true }); ctx.restore();
    ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.restore(); } }
}

const SCENE = {
  duration: K17_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196, sh = k17Shake(t);
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / K17_VW, ph / K17_VH);
    const cam = k17Cam(t); ctx.save(); K.camera(ctx, K17_VW, K17_VH, cam); k17World(ctx, t); ctx.restore();
    // whip pans: speed streaks
    for (const [a, b, d] of [[47.82, 48.15, 1], [76.55, 76.9, 1]]) if (t >= a && t < b) { const u = (t - a) / (b - a); ctx.save(); ctx.globalAlpha = 0.75 * Math.sin(Math.PI * u); ctx.fillStyle = C.white; const r = K.rng(9 + a); for (let i = 0; i < 24; i++) ctx.fillRect(-100 + r() * 1100 + d * u * 300, r() * 1230, 220 + r() * 300, 6 + r() * 8); ctx.restore(); }
    k17Over(ctx, t, cam, S);
    if (t >= 21.34 && t < 22.36) S.transition(ctx, K17_VW, K17_VH, (t - 21.34) / 1.02, { caption: 'ONE NIGHT...' });
    if (t >= 166.4) S.title(ctx, 'THE END', 500, 300, K17B(t, 166.4, 0.9), { size: 84, align: 'center' });
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // four quiet effects, all in narration pauses or after the last word (plan); master 0.6 at render
    k.bed(S.sfx.bed, 0, K17_DUR, 0.5);
    k.play('whoosh', 21.85, { dur: 0.45, gain: 0.3 });
    k.play('pop', 136.9, { gain: 0.4 });
    k.play('thud', 145.3, { gain: 0.45 });
    k.play('chime', 166.6, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
