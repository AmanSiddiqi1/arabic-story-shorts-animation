// ===== AN-099 main: the hall, draw order, balloons and clouds (world), camera, lettering (panel), sound =====
const A99_LAST = 169.6;   // cut to the last image (the untouched cup)
const A99_ICONY = 640;   // S13 icon row (top band of the two-shot)
const A99_CAM = [[0, 840, 700, 2.0], [3.3, 840, 700, 2.0], [5.0, 500, 640, 1.0], [12.1, 470, 640, 1.15], [13.2, 330, 700, 1.5], [15.6, 330, 700, 1.5], [16.6, 200, 730, 2.1], [18.6, 200, 730, 2.1], [19.8, 500, 640, 1.0], [22.47, 500, 640, 1.0],
  [22.48, 330, 720, 1.6], [31.69, 350, 720, 1.6], [31.7, 800, 690, 1.8], [35.99, 800, 690, 1.8], [36.0, 520, 680, 1.25], [41.6, 520, 680, 1.25], [42.5, 500, 690, 1.28], [43.61, 500, 690, 1.28],
  [43.62, 420, 690, 1.2], [44.6, 420, 690, 1.2], [46.5, 190, 730, 2.2], [49.59, 190, 730, 2.2], [49.6, 480, 620, 1.1], [52.39, 480, 620, 1.1], [52.4, 280, 790, 1.8], [55.61, 280, 790, 1.8], [55.62, 800, 690, 1.8], [57.99, 800, 690, 1.8],
  [58.0, 330, 700, 1.4], [59.3, 330, 700, 1.4], [61.0, 400, 700, 1.4], [62.99, 400, 700, 1.4], [63.0, 520, 660, 1.2], [69.5, 520, 660, 1.2], [70.3, 380, 640, 1.6], [76.93, 380, 640, 1.6],
  [76.94, 600, 680, 1.15], [82.3, 600, 680, 1.15], [82.9, 555, 830, 2.0], [85.29, 555, 830, 2.0], [85.3, 560, 640, 1.2], [88.7, 560, 640, 1.2], [91.3, 500, 560, 1.0], [92.85, 500, 560, 1.0], [92.86, 770, 700, 1.9], [97.19, 770, 700, 1.9],
  [97.2, 500, 700, 1.25], [98.3, 500, 700, 1.25], [104.7, 540, 770, 1.7], [105.41, 540, 770, 1.7], [105.42, 500, 720, 1.3], [109.7, 500, 720, 1.3], [110.4, 538, 806, 2.8], [112.0, 538, 806, 2.8], [113.4, 540, 812, 3.2], [114.09, 540, 812, 3.2],
  [114.1, 470, 720, 1.3], [116.99, 470, 720, 1.3], [117.0, 538, 800, 3.0], [122.0, 538, 800, 3.0], [122.6, 520, 780, 1.8], [124.3, 520, 780, 1.8], [124.9, 538, 800, 3.0], [127.13, 538, 800, 3.0],
  [127.14, 538, 800, 2.9], [137.2, 538, 796, 3.1], [138.32, 538, 796, 3.1], [139.6, 520, 600, 1.5], [145.3, 520, 600, 1.5], [146.3, 538, 800, 3.0], [147.99, 538, 800, 3.0],
  [148.0, 538, 800, 3.0], [154.6, 538, 800, 3.0], [155.4, 480, 720, 1.25], [159.37, 480, 690, 1.25], [159.9, 450, 800, 1.6], [160.65, 440, 800, 1.6], [162.1, 330, 790, 1.6], [162.9, 470, 660, 1.1], [165.24, 470, 660, 1.1],
  [166.0, 250, 790, 2.0], [A99_LAST - 0.01, 250, 790, 2.0], [A99_LAST, 435, 695, 1.15], [A99_DUR + 1, 435, 695, 1.15]];
function a99Cam(t) { const k = A99_CAM, i = k.findIndex((q) => t < q[0]); let c;
  if (i <= 0) { const q = k[i < 0 ? k.length - 1 : 0]; c = { x: q[1], y: q[2], zoom: q[3] }; }
  else { const a = k[i - 1], b = k[i], u = K.ease.inOut(K.clamp((t - a[0]) / (b[0] - a[0]))); c = { x: K.lerp(a[1], b[1], u), y: K.lerp(a[2], b[2], u), zoom: K.lerp(a[3], b[3], u) }; }
  const z = c.zoom; return { x: K.clamp(c.x, 500 / z, 1000 - 500 / z), y: K.clamp(c.y, 615 / z, 1230 - 615 / z), zoom: z }; }
const a99P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- the hall ----------
function a99Outside(t) { const fl = t >= A99_FLOOR;
  return (c) => { c.fillStyle = fl ? '#ef8a3c' : '#5f95ef'; c.fillRect(0, 300, 1000, 650); c.fillStyle = dotPat(c, fl ? C.yellow : '#3f7be6', 13, 0.3); c.fillRect(0, 300, 1000, 650);
    if (fl) shape(c, ell(895, 390, 15, 15, 16), C.yellow, { lw: 4, seed: 237 }); else shape(c, ell(885, 400, 20, 20, 18), C.yellow, { lw: 4, seed: 202, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 });
    shape(c, [[-10, 860], [310, 860], [310, 930], [-10, 930]], '#f3d9a0', { lw: 5, seed: 201, dot: C.red, pitch: 11, rad: 0.18, da: 0.4 });
    const L = a99Win(t, 165.0, 175, 1.2); if (L > 0) { c.save(); c.globalAlpha = 0.75 * L; c.fillStyle = '#fffbe8'; c.fillRect(0, 300, 330, 650); c.restore(); } };
}
const a99HallO = (t, extra = {}) => ({ variant: 'palace', wall: 'blue', dais: [640, 960, 860], throne: 840, cushions: [705], lamps: [], t, light: t >= A99_FLOOR ? 0.35 : 1, ...(t >= A99_FLOOR ? { u: 0.45 } : {}), outside: a99Outside(t), ...extra });
function a99Lamps(ctx, t) { const lit = t >= A99_FLOOR ? 1 : 0.45;
  [[380, 250, 89.9], [930, 250, 90.4]].forEach(([x, y, ts], i) => { const a = swing(t, ts, 0.04, 1.1, 1.2); ctx.save(); ctx.translate(x, 70); ctx.rotate(a); ctx.translate(-x, -70); hangingLamp(ctx, x, y, t + i * 1.7, { lit, chain: 70 }); ctx.restore(); }); }

// ---------- people and their held things ----------
function a99DrawHeld(ctx, t, P) {
  for (const h of P.held || []) { const [k, p] = h;
    if (k === 'book') { if (h[2]) { ctx.save(); ctx.translate(p[0], p[1] - 6); a99Icon(ctx, 'book', 0, 0, 0.75, { full: true }); if (a99In(t, 0.62, 0.9)) { const u = (t - 0.62) / 0.28; shape(ctx, [[0, -15], [K.lerp(25, -25, u), -19 - 6 * Math.sin(u * Math.PI)], [K.lerp(25, -25, u), 17], [0, 21]], C.white, { lw: 3, seed: 470 }); } ctx.restore(); }
      else shape(ctx, K.rectPts(p[0] - 22, p[1] - 30, 44, 24), C.red, { lw: 4, seed: 471, dot: C.yellow, pitch: 6, rad: 0.2, da: 0.4 }); }
    else if (k === 'bread') a99Bread(ctx, p[0], p[1] - 4, h[2] ?? 1);
    else if (k === 'purse') a99Icon(ctx, 'purse', p[0], p[1] + 10, 0.45, { rot: Math.PI * h[2] });
    else if (k === 'jug') a99Jug(ctx, p[0] + 4, p[1] + 34, { s: 0.5, rot: h[2] });
    else if (k === 'goblet') a99Goblet(ctx, p[0], p[1] + 18, { s: 0.55, fill: h[2] });
    else if (k === 'cushion') a99Cushion(ctx, p[0], p[1] + 12, { w: 80, h: 24 });
    else if (k === 'tray') a99Tray(ctx, p[0], p[1], { s: 0.75 });
    else if (k === 'gobtray') { a99Tray(ctx, p[0], p[1], { s: 0.75, bread: 0, dates: 0 }); for (let i = 0; i < h[2]; i++) a99Goblet(ctx, p[0] - 30 + i * 17, p[1] - 2, { s: 0.42 }); a99Jug(ctx, p[0] + 34, p[1] - 2, { s: 0.42 }); }
    else if (k === 'chest') a99Chest(ctx, p[0], p[1], { s: 0.55, open: 0 });
  }
}
function a99DrawPerson(ctx, t, P) { if (P.hidden) return; person(ctx, P); a99DrawHeld(ctx, t, P); }
// dashed double-headed floor arrow
function a99Dash(ctx, x0, x1, y, p) { if (p <= 0 || x1 - x0 < 10) return; const xe = K.lerp(x0, x1, K.clamp(p)); ctx.save(); ctx.setLineDash([16, 12]); ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(xe, y); ctx.stroke(); ctx.lineWidth = 7; ctx.strokeStyle = C.white; ctx.stroke(); ctx.restore();
  for (const [x, d] of [[x0, -1], [xe, 1]]) shape(ctx, [[x + d * 20, y], [x - d * 4, y - 14], [x - d * 4, y + 14]], C.yellow, { lw: 4, seed: 480 }); }
function a99Ring(ctx, x, y, t, a) { if (t < a || t > a + 0.9) return; const u = (t - a) / 0.9; ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 6; ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.arc(x, y, 8 + 26 * u, 0, 7); ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }

function a99World(ctx, t, cam) {
  const fl = t >= A99_FLOOR, St = a99StrangerP(t), Ca = a99Caliph(t), Pr = a99Scholar(t, 'proud'), El = a99Scholar(t, 'elder'), Ea = a99Scholar(t, 'eager'), Sv = a99Servant(t), crowd = [St, Pr, El, Ea, Sv];
  palaceHall(ctx, a99HallO(t, { behind: (c) => crowd.forEach((P) => { if (P.behind) a99DrawPerson(c, t, P); }) }));
  a99Lamps(ctx, t);
  const items = [];
  if (!fl) {
    items.push([876, () => { a99Cushion(ctx, A99_ROW.eager + 10 * A99B(t, 61.06, 0.5), 905, { w: 80, h: 24 }); a99Cushion(ctx, A99_ROW.elder, 905, { w: 80, h: 24 }); a99Cushion(ctx, A99_ROW.proud, 905, { w: 80, h: 24 }); }]);
    if (t >= 83.6) { const u = A99B(t, 83.6, 0.35), pr = a99Mid(a99HandW(Pr, 'L'), a99HandW(Pr, 'R')); items.push([929, () => a99Cushion(ctx, K.lerp(pr[0], 598, u), K.lerp(pr[1] + 12, 930, u), { w: 80, h: 24 })]); }
  } else {
    items.push([876, () => { for (const k of ['proud', 'eager', 'stranger', 'elder']) a99Cushion(ctx, A99_MEAL[k], 905, { w: 84, h: 24 }); a99Cushion(ctx, A99_MEAL.caliph, 905, { w: 150, h: 32, col: C.red, dot: C.yellow }); }]);
    items.push([908, () => a99Cloth(ctx, t)]);
    items.push([915, () => a99TableItems(ctx, t)]);
    if (a99In(t, 156.6, A99_LAST)) items.push([992, () => { a99Chest(ctx, 560, 992, { s: 0.55, open: A99B(t, 158.26, 0.45), sqy: impactSquash(t, 156.6, 0.85), sqx: 1 }); if (t > 156.6 && t < 157.3) dustBurst(ctx, 560, 990, t - 156.6, 6, 10, 20, 40, 0.6, 17);
      if (t > 158.5 && t < 161) { const u = A99B(t, 158.5, 0.7, 'out'); a99Coin(ctx, K.lerp(572, 650, u), K.lerp(940, 1006, u) - 30 * Math.sin(Math.PI * Math.min(1, u * 1.3)), 10, t < 159.2 ? Math.cos((t - 158.5) * 14) : Math.max(0.15, 0.4 * Math.exp(-(t - 159.2) * 3))); } }]);
  }
  for (const P of crowd) if (!P.behind && !P.hidden) items.push([P.y, () => a99DrawPerson(ctx, t, P)]);
  items.push([Ca.y, () => a99DrawPerson(ctx, t, Ca)]);
  items.sort((a, b) => a[0] - b[0]).forEach((it) => it[1]());
  // the caliph's cup (from the pour on)
  if (t >= 109.8 && t < A99_LAST) { const p = a99CupPos(t); a99Goblet(ctx, p[0], p[1], { s: t > 150 ? 0.95 : 0.8, fill: 0.8 * A99B(t, 110.15, 0.7), slosh: swing(t, 112.0, 0.25, 1.6, 2.5) + swing(t, 116.7, 0.2, 1.6, 2.5) + swing(t, 124.6, 0.2, 1.6, 2.5),
    glint: a99Win(t, 112.55, 113.4, 0.15) + a99Win(t, 167.26, 168.0, 0.15) });
    if (a99In(t, 110.15, 110.85)) { const j = a99HandW(Ca, 'L'), sp = [j[0] - 14, j[1] + 4]; ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = '#a8161a'; ctx.beginPath(); ctx.moveTo(sp[0], sp[1]); ctx.quadraticCurveTo(sp[0] - 6, (sp[1] + p[1]) / 2, p[0] + 2, p[1] - 44); ctx.stroke(); ctx.restore(); } }
  // the refusal: an upright open palm between the cup and his chest
  if (a99In(t, 120.2, 122.4)) { const h = a99HandW(St, 'R'); a99Palm(ctx, h[0], h[1] - 4, 0.95 * K.ease.back(K.clamp((t - 120.2) / 0.25)) * (1 - A99B(t, 122.25, 0.15))); }
  // patch rings on the stranger (S2)
  if (a99In(t, 16.9, 18.5)) { a99Ring(ctx, ...a99W(St, [-15, -103]), t, 16.9); a99Ring(ctx, ...a99W(St, [17, -78]), t, 17.3); a99Ring(ctx, St.x + 10, St.y - 4, t, 17.7); }
  a99Balloons(ctx, t, { St, Ca, Pr, El, Ea });
}
function a99Cloth(ctx, t) {
  shape(ctx, [[290, 908], [770, 908], [805, 975], [255, 975]], A99_CLOTH, { lw: 5, seed: 490, dot: C.red, pitch: 10, rad: 0.12, da: 0.35 });
  seg(ctx, 262, 966, 798, 966, 5, C.red, 0);
  const off = A99B(t, 105.8, 0.7), fa = 1 - A99B(t, 106.1, 0.4); ctx.save(); ctx.globalAlpha = fa;
  if (fa > 0) { a99Tray(ctx, 380 - 260 * off, 945, { s: 0.85, dates: 3 }); a99Tray(ctx, 692 - 260 * off, 945, { s: 0.85, bread: 0.7 }); a99Bowl(ctx, a99Tr(t, [[0, 400], [102.2, 455, 0.5]]) - 260 * off, 948, { dates: t > 102.62 ? 1 : 0 }); }
  ctx.restore();
  // the date tossed by the proud scholar
  if (a99In(t, 102.2, 102.62)) { const u = (t - 102.2) / 0.42; shape(ctx, ell(K.lerp(292, 452, u), K.lerp(840, 922, u) - 70 * Math.sin(Math.PI * u), 6, 4, 8), '#7a4212', { lw: 2, seed: 414 }); }
  // the scholars' goblets put down at the end of the speech
  if (t > 144.25) a99Goblet(ctx, 296, 940, { s: 0.55, fill: 0.6 }); if (t > 144.45) a99Goblet(ctx, 336, 940, { s: 0.55, fill: 0.6 });
}
function a99TableItems(ctx, t) {
  const [x, y] = A99_TABLE; a99Table(ctx, x, y);
  if (a99In(t, 99.1, 105.6)) a99Tray(ctx, x + 2, y - 4, { s: 0.7, bread: t < 100.0 ? 1 : 0.6, dates: 0 });
  if (a99In(t, 109.65, 109.8)) { const u = A99B(t, 109.65, 0.15); const tx = K.lerp(548, x + 6, u), ty = K.lerp(872, y - 4, u); a99Tray(ctx, tx, ty, { s: 0.75, bread: 0, dates: 0 }); for (let i = 0; i < 2; i++) a99Goblet(ctx, tx - 30 + i * 17, ty - 2, { s: 0.42 }); a99Jug(ctx, tx + 34, ty - 2, { s: 0.42 }); }
  if (t >= 109.8) { a99Tray(ctx, x + 6, y - 4, { s: 0.7, bread: 0, dates: 0 }); if (t > 109.8) a99Goblet(ctx, x + 22, y - 6, { s: 0.42 }); if (t < 109.95 || t > 111.0) a99Jug(ctx, x + 40, y - 4, { s: 0.42 }); }
}

// ---------- balloons, clouds and icons in the world ----------
function a99Balloons(ctx, t, A) {
  const head = (P) => a99Head(P), mouth = (P) => { const h = head(P); return [h[0], h[1] - 30]; };
  // S1: glints on the book, the week dots
  if (a99In(t, 2.9, 3.9)) { const b = A.Ca.held && A.Ca.held[0] ? A.Ca.held[0][1] : [840, 760]; [[-40, -40], [44, -30], [0, -62]].forEach(([dx, dy], i) => { const k = a99Pulse(t, 2.9 + i * 0.1, 0.7); if (k > 0) star(ctx, b[0] + dx, b[1] + dy, 14 * k, C.yellow, t * 2); }); }
  if (a99In(t, 6.5, 8.6)) { ctx.save(); ctx.globalAlpha = a99Fade(t, 6.5, 8.6, 0.25); a99WeekDots(ctx, 430, 610, A99B(t, 6.55, 0.5, 'lin'), [0, A99B(t, 6.85, 0.3), 0, 0, A99B(t, 7.3, 0.3), 0, 0]); ctx.restore(); }
  // S3: their mistaken belief (patched robe = empty book)
  if (a99In(t, 26.4, 31.7)) thoughtCloud(ctx, 400, 470, 440, 250, t, { p: A99B(t, 26.4, 0.8, 'lin'), tail: head(A.Pr), scale: 1, at: [0, 0], inside: (c) => {
    const kp = (a) => K.ease.back(K.clamp((t - a) / 0.3)); if (kp(27.7) > 0) a99Icon(c, 'robe', -120, 0, 1.4 * kp(27.7)); if (kp(29.36) > 0) a99Icon(c, 'eq', -10, 0, 1.2 * kp(29.36)); if (kp(30.4) > 0) a99Icon(c, 'book', 105, 8, 1.5 * kp(30.4), { empty: true });
    if (t > 30.6) { const u = t - 30.6; a99Icon(c, 'moth', 105 + 30 * u + 8 * Math.sin(u * 7), -10 - 50 * u, 1.3, { t }); } } });
  // S4-S5: question 1, the knot
  if (a99In(t, 35.32, 55.62) && !a99In(t, 44.5, 49.6)) { const tail = t < 50.34 ? mouth(A.Ca) : [K.lerp(820, 140, A99B(t, 50.34, 0.3)), K.lerp(700, 780, A99B(t, 50.34, 0.3))];
    a99Balloon(ctx, 600, 440, 380, 240, t, { p: A99B(t, 35.32, 0.45, 'lin') * (1 - A99B(t, 52.05, 0.3)), icon: 'knot', loops: t < 40.38 ? 3 : 5, tangle: 1 + 0.45 * A99B(t, 40.38, 0.4), untie: A99B(t, 50.34, 0.72), seed: 9, mark: t < 51.06 ? '?' : 'tick', markP: t < 51.06 ? A99B(t, 35.6, 0.3) : A99B(t, 51.06, 0.25),
      tail });
    if (a99In(t, 51.06, 51.13)) { ctx.save(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(752, 354, 60, 0, 7); ctx.fill(); ctx.restore(); } }
  // note 12: three failed answers in turn: the proud one first and loudest, the young one, then the old one forgets (empty balloon pops)
  if (a99In(t, 36.1, 41.6)) a99Balloon(ctx, 628, 646, 210, 146, t, { p: A99B(t, 36.1, 0.35, 'lin') * (1 - A99B(t, 41.3, 0.3)), icon: 'knot', loops: 6, tangle: 1.75, seed: 6, tail: mouth(A.Pr), shake: a99In(t, 36.1, 37.0) ? tremble(t, 3, 14) : 0 });
  if (a99In(t, 37.4, 41.6)) a99Balloon(ctx, 278, 628, 160, 116, t, { p: A99B(t, 37.4, 0.35, 'lin') * (1 - A99B(t, 41.3, 0.3)), icon: 'knot', loops: 5, tangle: 1.4, seed: 4, tail: mouth(A.Ea) });
  if (a99In(t, 38.4, 39.5)) a99Balloon(ctx, 448, 596, 176, 108, t, { p: A99B(t, 38.4, 0.3, 'lin') * (1 + 0.12 * a99Pulse(t, 39.2, 0.25)) * (1 - A99B(t, 39.42, 0.06, 'lin')), tail: mouth(A.El),
    icon: (c) => { c.font = K.font(46, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = C.black; c.fillText('HMM...', 0, 3); } });
  if (a99In(t, 39.45, 40.1)) { const u = (t - 39.45) / 0.65; ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = C.black; ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.3, r0 = 30 + 40 * u, r1 = r0 + 22; ctx.beginPath(); ctx.moveTo(448 + Math.cos(a) * r0, 596 + Math.sin(a) * r0 * 0.7); ctx.lineTo(448 + Math.cos(a) * r1, 596 + Math.sin(a) * r1 * 0.7); ctx.stroke(); } ctx.restore(); }
  // note 5: the three reasons, numbered ticks beside him as he counts
  if (a99In(t, 52.9, 55.62)) [52.98, 53.96, 54.9].forEach((a, i) => { const k = A99B(t, a, 0.3), y = 676 + i * 58; if (k <= 0) return; ctx.save(); ctx.globalAlpha = a99Fade(t, a, 55.62, 0.2);
    a99Badge(ctx, 236, y, 'tick', k, 23); ctx.font = K.font(40, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 7; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.strokeText(String(i + 1), 196, y + 2); ctx.fillStyle = C.yellow; ctx.fillText(String(i + 1), 196, y + 2); ctx.restore(); });
  // S7: question 2, three pieces
  if (a99In(t, 64.78, 70.2)) a99Balloon(ctx, 760, 470, 300, 210, t, { p: A99B(t, 64.78, 0.4, 'lin') * (1 - A99B(t, 69.9, 0.3)), icon: 'pieces', mark: '?', markP: A99B(t, 65.0, 0.3), tail: mouth(A.Ca) });
  const sm = [['proud', 545, 590, 0, 65.76, 72.8], ['elder', 445, 555, 1, 66.56, 73.05], ['eager', 345, 590, 2, 67.34, 73.3]];
  for (const [who, bx, by, wi, a, leave] of sm) { if (!a99In(t, a, leave + 0.4)) continue; const P = { proud: A.Pr, elder: A.El, eager: A.Ea }[who], sh = a99In(t, 68.38, 69.58) ? tremble(t + wi, 3, 9) : 0;
    a99Balloon(ctx, bx, by, 150, 112, t, { p: A99B(t, a, 0.35, 'lin') * (1 - A99B(t, leave + 0.12, 0.25)), icon: t < leave ? 'wedge' : null, wedge: wi, tail: mouth(P), shake: sh }); }
  if (a99In(t, 71.52, 76.94)) a99Balloon(ctx, 230, 520, 250, 200, t, { p: A99B(t, 71.52, 0.4, 'lin'), icon: null, tail: mouth(A.St), mark: t > 75.2 ? 'tick' : null, markP: A99B(t, 75.2, 0.25) });
  for (const [who, bx, by, wi, a, leave] of sm) { if (!a99In(t, leave, 76.94)) continue; const u = A99B(t, leave, 0.45), cl = A99B(t, 75.0, 0.18), gap = 14 * (1 - cl), spin = Math.PI / 2 * A99B(t, 75.05, 0.4, 'out');
    const ang = wi * Math.PI * 2 / 3 - Math.PI / 2 + Math.PI / 3 + spin, tx = 230 + Math.cos(ang) * gap, ty = 520 + Math.sin(ang) * gap, x = K.lerp(bx, tx, u), y = K.lerp(by + 22, ty, u) - 70 * Math.sin(Math.PI * u);
    a99Wedge(ctx, x, y, K.lerp(64, 62, u), wi, spin); }
  if (a99In(t, 75.0, 75.07)) { ctx.save(); ctx.fillStyle = C.white; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(230, 520, 80, 0, 7); ctx.fill(); ctx.restore(); }
  // S8: eye lines
  if (a99In(t, 81.04, 82.4)) { const to = head(A.St); [A.Ea, A.El, A.Pr].forEach((P, i) => { const fr = head(P), u = A99B(t, 81.04 + i * 0.12, 0.3); ctx.save(); ctx.globalAlpha = a99Fade(t, 81.04, 82.4, 0.2); ctx.setLineDash([8, 9]); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(fr[0] + 10, fr[1]); ctx.lineTo(K.lerp(fr[0], to[0] - 20, u), K.lerp(fr[1], to[1], u)); ctx.stroke(); ctx.restore(); }); }
  // S9: question 3 and the wide answer
  if (a99In(t, 85.84, 89.7)) a99Balloon(ctx, 830, 560, 170, 120, t, { p: A99B(t, 85.84, 0.35, 'lin') * (1 - A99B(t, 89.4, 0.3)), icon: (c, sc) => { c.font = K.font(90, BF, 400); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 8; c.strokeStyle = C.black; c.strokeText('?', 0, 4); c.fillStyle = C.red; c.fillText('?', 0, 4); }, tail: mouth(A.Ca) });
  if (a99In(t, 88.74, 96.2)) a99Balloon(ctx, 540, 430, 820, 330, t, { p: A99B(t, 88.74, 0.4, 'lin') * (1 - A99B(t, 91.95, 0.55)), icon: 'wide', grow: A99B(t, 89.48, 1.4, 'lin'), tail: t < 93.88 ? mouth(A.St) : [600, 760] });
  // S10: honour star
  // S13: the list (robe, money crossed out; mind and knowledge ticked)
  if (a99In(t, 133.32, 138.9)) { const fa = a99Fade(t, 133.32, 138.9, 0.3), kp = (a) => K.ease.back(K.clamp((t - a) / 0.3)), Y = A99_ICONY; ctx.save(); ctx.globalAlpha = fa;
    if (kp(133.4) > 0) a99Icon(ctx, 'robe', 424, Y, 0.68 * kp(133.4)); a99Cross(ctx, 424, Y, 20, A99B(t, 133.75, 0.3, 'lin'));
    if (kp(135.1) > 0) a99Icon(ctx, 'coin', 476, Y, 0.75 * kp(135.1)); a99Cross(ctx, 476, Y, 18, A99B(t, 135.4, 0.3, 'lin'));
    if (kp(136.62) > 0) a99Icon(ctx, 'lamp', 526, Y + 8, 0.56 * kp(136.62), { lit: 1 }); if (kp(137.18) > 0) a99Icon(ctx, 'book', 574, Y + 2, 0.52 * kp(137.18), { full: true });
    a99Badge(ctx, 548, Y - 16, 'tick', A99B(t, 137.4, 0.25), 11); a99Badge(ctx, 596, Y - 16, 'tick', A99B(t, 137.55, 0.25), 11); ctx.restore(); }
  // S14: the thought cloud (if I drank)
  if (a99In(t, 138.9, 143.95)) { const p = A99B(t, 138.9, 0.7, 'lin') * (1 - A99B(t, 143.7, 0.22));
    thoughtCloud(ctx, 520, 418, 640, 360, t, { p, tail: head(A.St), bg: '#fff3d6', scale: 1, at: [0, 0], seed: 5, inside: (c) => a99Dream(c, t) }); }
  // S15: the four answers
  if (a99In(t, 152.5, 154.9)) { const fa = 1 - A99B(t, 154.4, 0.4); ctx.save(); ctx.globalAlpha = fa;
    [['line', 405], ['whole', 505], ['wide', 605]].forEach(([ic, x], i) => a99Balloon(ctx, x, 642, 120, 86, t, { p: A99B(t, 152.5 + i * 0.2, 0.3, 'lin'), icon: ic === 'wide' ? (c) => a99Icon(c, 'book', 0, 0, 0.8, { full: true }) : ic, grow: 1, loops: 3, mark: 'tick', markP: A99B(t, 152.65 + i * 0.2, 0.2), tail: [x, 700] }));
    a99Balloon(ctx, 505, 540, 200, 130, t, { p: A99B(t, 153.15, 0.45, 'lin'), icon: (c) => a99Icon(c, 'lamp', 0, 10, 1.1, { lit: 1 }), mark: 'tick', markP: A99B(t, 153.45, 0.25), tail: [560, 700] }); ctx.restore(); }
  // S16: the open book glows over the honour cushion; the lamp beside the stranger in the doorway
  if (a99In(t, 163.38, 164.6)) { const k = a99Win(t, 163.38, 164.6, 0.25); ctx.save(); ctx.globalAlpha = 0.5 * k; ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(705, 770, 60, 0, 7); ctx.fill(); ctx.restore(); ctx.save(); ctx.globalAlpha = k; a99Icon(ctx, 'book', 705, 770, 0.9 * K.ease.back(K.clamp((t - 163.38) / 0.3)), { full: true }); ctx.restore(); }
  if (a99In(t, 166.28, 168.3)) { const h = head(A.St); ctx.save(); ctx.globalAlpha = a99Fade(t, 166.28, 168.3, 0.25); a99Icon(ctx, 'lamp', h[0] + 62, h[1] - 52, 0.85 * K.ease.back(K.clamp((t - 166.4) / 0.3)), { lit: 1 }); ctx.restore(); }
}
// inside the S14 cloud (local coords, centre 0,0, safe area about +-230 x +-125): three large beats.
//  139.5 the imagined stranger as a bust drinks; 140.4 the lamp of his mind goes dark; 141.0 the straight line knots again;
//  142.04 a strip of the hall: he slides from the honour seat back to the door (dashed arrow, the reverse of FAR AWAY)
function a99Dream(c, t) {
  if (t < 142.04) {
    const dr = a99Win(t, 139.54, 140.6, 0.2), wob = t > 140.98 ? Math.sin((t - 140.98) * Math.PI * 3) : 0;
    const P = { x: -120, y: 262, s: 1.25, costume: 'ascetic', age: 0.4, pal: { beard: '#5a5a64' }, dir: 1, seed: 23, amp: 0,
      tip: 0.07 * wob - 0.04 * dr, tilt: t > 140.98 ? 0.18 + 0.06 * wob : 0, lid: t > 140.2 ? 0.7 : t > 139.54 ? 0.45 : 0.1, mouth: t > 140.98 ? 'o' : 'closed', gaze: t > 140.98 ? [0.3, 0.5] : [0.5, -0.2] };
    const k = K.clamp(dr * 1.3); P.aR = armTo(1, A99_SH, [K.lerp(A99H.chest[0] + 20, A99H.mouth[0] + 6, k), K.lerp(A99H.chest[1] - 6, A99H.mouth[1] + 4, k)]); P.aL = armTo(-1, A99_SH, A99H.lapL);
    person(c, P);
    if (t > 139.4 && t < 140.9) { const h = a99HandW(P, 'R'); a99Goblet(c, h[0], h[1] + 26, { s: 0.95, fill: 0.75 - 0.5 * dr, rot: -0.5 * dr }); }
    const off = A99B(t, 140.4, 0.45), fl = t > 140.4 && t < 140.75 ? (Math.sin(t * 60) > 0 ? 1 : 0.25) : 1;
    a99Icon(c, 'lamp', 30, -40, 1.45, { lit: (1 - off) * fl, smoke: t > 140.7 ? K.clamp((t - 140.7) / 1.2) : 0 });
    if (a99In(t, 140.4, 140.9)) { const u = (t - 140.4) / 0.5; c.save(); c.globalAlpha = 1 - u; c.fillStyle = '#8c8a94'; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.6; c.beginPath(); c.arc(22 + Math.cos(a) * 30 * u, -78 + Math.sin(a) * 26 * u, 8 + 6 * u, 0, 7); c.fill(); } c.restore(); }
    if (t > 140.6) { const pts = a99KnotPts(72, 4, 26, 1 - A99B(t, 140.98, 0.7), 9); c.save(); c.translate(150, 62); a99Rope(c, pts, 7); c.restore(); }
    return;
  }
  // the hall as a strip: door at the left, throne at the right, four seat marks
  const fy = 70; seg(c, -250, fy, 250, fy, 6, C.black, 0);
  shape(c, [[-236, fy], [-236, fy - 120], [-226, fy - 150], [-200, fy - 168], [-174, fy - 150], [-164, fy - 120], [-164, fy]], '#fffbe8', { lw: 6, seed: 491 });
  c.save(); c.lineWidth = 7; c.strokeStyle = C.yellow; c.beginPath(); c.moveTo(-228, fy - 2); c.lineTo(-228, fy - 118); c.quadraticCurveTo(-226, fy - 156, -200, fy - 160); c.quadraticCurveTo(-174, fy - 156, -172, fy - 118); c.lineTo(-172, fy - 2); c.stroke(); c.restore();
  shape(c, K.rectPts(178, fy - 112, 56, 70), C.red, { lw: 5, seed: 492, dot: C.yellow, pitch: 7, rad: 0.2, da: 0.4 }); shape(c, K.rectPts(166, fy - 46, 80, 46), C.yellow, { lw: 5, seed: 493, dot: C.red, pitch: 7, rad: 0.2, da: 0.4 });
  const seats = [-200, -100, 10, 112]; seats.forEach((x, i) => a99Cushion(c, x, fy + 2, { w: 54, h: 14, col: i === 3 ? C.red : C.yellow, dot: i === 3 ? C.yellow : C.red }));
  const sl = A99B(t, 142.3, 1.15, 'in'), x = K.lerp(112, -200, sl);
  person(c, { x, y: fy - 12, s: 0.5, costume: 'ascetic', age: 0.4, pal: { beard: '#5a5a64' }, dir: 1, sit: 1, seat: 'floor', seed: 23, drop: 6 * sl, lid: 0.3 + 0.4 * sl, mouth: 'frown', brow: -0.5, gaze: [-0.8, 0.3],
    tip: sl > 0 && sl < 1 ? -0.12 : 0, sq: sl >= 1 ? landSquash(t, 143.45, 0.12) : 1 });
  const ap = A99B(t, 142.2, 0.7, 'lin'); if (ap > 0) { const y = fy + 42, xe = K.lerp(104, -176, ap); c.save(); c.setLineDash([16, 12]); c.lineCap = 'round'; c.lineWidth = 14; c.strokeStyle = C.black; c.beginPath(); c.moveTo(104, y); c.lineTo(xe, y); c.stroke(); c.lineWidth = 7; c.strokeStyle = C.white; c.stroke(); c.restore();
    shape(c, [[xe - 22, y], [xe + 4, y - 15], [xe + 4, y + 15]], C.red, { lw: 4, seed: 494 }); }
}

// ---------- lettering (panel space, view 1000 x 1230) ----------
function a99Overlays(ctx, t, cam, S) {
  const P = (x, y) => a99P(x, y, cam), lab = (txt, wx, wy, a, b, o = {}) => { if (!a99In(t, a, b)) return; const [x, y] = o.panel ? [wx, wy] : P(wx, wy); ctx.save(); ctx.globalAlpha = a99Fade(t, a, b, 0.2); S.label(ctx, txt, x, y, A99B(t, a, 0.35), { size: 46, align: 'center', ...o }); ctx.restore(); },
    arr = (a0, a1, a, b, o = {}) => { if (!a99In(t, a, b)) return; ctx.save(); ctx.globalAlpha = a99Fade(t, a, b, 0.2); S.arrow(ctx, P(...a0), P(...a1), A99B(t, a, 0.4), { width: 18, ...o }); ctx.restore(); },
    word = (txt, wx, wy, a, b, size = 76, o = {}) => { if (!a99In(t, a, b)) return; const [x, y] = P(wx, wy); ctx.save(); ctx.globalAlpha = a99Fade(t, a, b, 0.15); sfx(ctx, txt, x, y, size, K.clamp((t - a) / 0.25), o); ctx.restore(); };
  // title
  if (t < 3.6) { ctx.save(); ctx.globalAlpha = a99Fade(t, -1, 3.6, 0.4); S.title(ctx, 'THE CALIPH AND', 500, 104, A99B(t, 0.3, 0.7), { size: 60, align: 'center' }); S.title(ctx, 'THE STRANGE SCHOLAR', 500, 236, A99B(t, 0.55, 0.7), { size: 66, align: 'center' }); ctx.restore(); }
  lab('TWICE A WEEK', 430, 535, 6.9, 8.6);
  lab('A STRANGER', 215, 560, 15.32, 17.0); arr([200, 590], [140, 700], 15.4, 17.0, { bend: 0.15 });
  if (a99In(t, 19.78, 22.4)) { ctx.save(); ctx.globalAlpha = a99Fade(t, 19.78, 22.4, 0.2); const a = P(165, 935), b = P(322, 935); ctx.translate(0, 0); a99DashP(ctx, a, b, A99B(t, 19.78, 0.6)); ctx.restore(); }
  lab('FAR AWAY', 244, 1050, 19.95, 22.4);
  word('CLEAR!', 345, 600, 54.95, 55.6, 80);
  if (a99In(t, 59.3, 62.9)) { ctx.save(); ctx.globalAlpha = a99Fade(t, 59.3, 62.9, 0.2); a99DashP(ctx, P(a99SX(t) + 40, 935), P(325, 935), 1); ctx.restore(); }
  lab('CLOSER!', 300, 1040, 61.06, 62.95);
  word('NO! NO!', 445, 470, 67.4, 68.8, 70, { fill: C.white, rot: -0.06 });
  word('CLEAR!', 330, 430, 75.9, 76.9, 80);
  lab('CLOSER STILL!', 560, 1030, 79.3, 80.9);
  lab('ALL EYES ON HIM', 560, 560, 81.1, 82.4);
  word('WOW!', 270, 660, 89.5, 90.9, 80, { rot: -0.08 });
  lab('BESIDE THE CALIPH', 690, 600, 95.5, 96.7, { size: 42 }); arr([680, 625], [700, 690], 95.55, 96.7, { bend: 0.1 });
  arr([432, 690], [452, 738], 102.9, 104.1, { bend: 0.1 });
  if (a99In(t, 102.84, 104.1)) { const [x, y] = P(420, 655); ctx.save(); ctx.globalAlpha = a99Fade(t, 102.84, 104.1, 0.2); S.label(ctx, 'GUEST OF HONOUR', x, y, A99B(t, 102.84, 0.35), { size: 44, align: 'center', fill: C.yellow }); star(ctx, x + 205, y - 40, 22 * K.ease.back(K.clamp((t - 102.95) / 0.3)), C.red, t); ctx.restore(); }
  if (a99In(t, 125.82, 127.1)) { const [x, y] = P(672, 650), [tx, ty] = P(606, 786); ctx.save(); ctx.globalAlpha = a99Fade(t, 125.82, 127.1, 0.15); bubble(ctx, x, y, 210, 120, tx, ty, A99B(t, 125.82, 0.3, 'lin'), 'WHY?', { size: 62 }); ctx.restore(); }
  word('HA HA!', 642, 652, 149.6, 150.8, 72, { rot: -0.08 });
  if (a99In(t, 156.98, 158.9)) { const v = Math.round(100000 * A99B(t, 157.0, 0.75, 'out') / 1000) * 1000, pop = 1 + 0.12 * a99Pulse(t, 157.75, 0.25); ctx.save(); ctx.globalAlpha = a99Fade(t, 156.98, 158.9, 0.2); ctx.translate(500, 250); ctx.scale(pop, pop); S.counter(ctx, v, 0, 0, A99B(t, 156.98, 0.3), { size: 96 }); ctx.restore(); }
  if (t >= 96.14 && t < 98.3) S.transition(ctx, 1000, 1230, (t - 96.14) / 2.16, { caption: 'LATER...' });
  // the last image: the untouched cup large in the right foreground, one glint on the closing chime
  if (t >= A99_LAST) { ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = C.black; ctx.beginPath(); ctx.ellipse(800, 1146, 66, 13, 0, 0, 7); ctx.fill(); ctx.restore();
    a99Goblet(ctx, 800, 1146, { s: 3.3, fill: 0.8, slosh: 0.03 * Math.sin(t * 2), glint: a99Win(t, 170.2, 171.1, 0.15) }); }
  if (t >= 169.8) S.title(ctx, 'THE END', 500, 190, A99B(t, 169.8, 0.8), { size: 84, align: 'center' });
}
function a99DashP(ctx, a, b, p) { ctx.save(); ctx.translate(0, a[1]); a99Dash(ctx, a[0], b[0], 0, p); ctx.restore(); }
const SCENE = {
  duration: A99_DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; LIFE.t = t;
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px, py); ctx.scale(pw / 1000, ph / 1230);
    const cam = a99Cam(t); ctx.save(); K.camera(ctx, 1000, 1230, cam); a99World(ctx, t, cam); ctx.restore();
    a99Overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    LIFE.t = null;
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // the plan's seven quiet effects, all in narration pauses or after the last word (master 0.6 at render)
    k.play('chime', 3.8, { note: 'E6', gain: 0.4 });
    k.play('thud', 22.0, { gain: 0.35 });
    k.play('pop', 43.1, { gain: 0.4 });
    k.play('chime', 84.95, { note: 'G6', gain: 0.4 });
    k.play('pop', 126.8, { gain: 0.4 });
    k.play('chime', 147.6, { note: 'E6', gain: 0.4 });
    k.play('chime', 170.2, { note: 'C6', gain: 0.6 });
  },
};
window.SCENE = SCENE;
