// ===== the story: the fox and the drum =====
const WW = 1000, WH = 1230, GR = 900, DUR = 163.5;
const HB = [24.8, 25.9, 43.4, 45.6, 61.2, 62.8, 64.4, 66.0, 68.2, 69.8, 71.4, 77.6, 84.2, 104.2, 105.8, 133.6, 144.0], HITS = [...HB.filter((h) => h < 123.6), 98.4];
const SLOW = [92.2, 93.6, 95.0, 96.2];
function layer1(key, w, h, draw) { return K.cached(key, () => { const c = K.layer(w * 2, h * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }
const skyL = () => layer1('sky', WW, 920, (x) => { x.fillStyle = C.blue; x.fillRect(0, 0, WW, 920); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(0, 0, WW, 920); for (const [bx, by, br, col] of [[150, 880, 260, '#2a62c9'], [560, 900, 300, '#2457b8'], [940, 880, 250, '#2a62c9']]) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); } });
const groundL = () => layer1('ground', WW, WH, (x) => { shape(x, [[-10, GR], [1010, GR], [1010, WH], [-10, WH]], '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 }); shape(x, [[-10, GR - 8], [1010, GR - 8], [1010, GR + 22], [-10, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = 4; px < 1010; px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5); });
const bushL = () => layer1('bush', WW, GR + 20, (x) => { const r = K.rng(3); for (let i = 0; i < 26; i++) { const bx = 600 + r() * 420, by = GR - 20 - r() * 250, br = 50 + r() * 40; x.beginPath(); x.arc(bx, by, br, 0, 7); x.fillStyle = i % 2 ? GREEN : GREEND; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); } x.fillStyle = GREEN; x.fillRect(600, GR - 60, 420, 80); });
function drawSun(ctx, x, y) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } shape(ctx, ell(x, y, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }
const CAM = [[0, { x: 210, y: 700, zoom: 1.5 }], [6.8, { x: 230, y: 700, zoom: 1.6 }], [13, { x: 250, y: 700, zoom: 1.6 }], [19.3, { x: 300, y: 700, zoom: 1.6 }], [26, { x: 340, y: 700, zoom: 1.9 }], [37, { x: 360, y: 700, zoom: 1.7 }], [52.4, { x: 380, y: 700, zoom: 1.7 }], [55.5, { x: 700, y: 700, zoom: 1.5 }], [72, { x: 620, y: 700, zoom: 1.5 }], [91, { x: 640, y: 710, zoom: 1.6 }], [96, { x: 690, y: 730, zoom: 1.8 }], [101, { x: 650, y: 730, zoom: 1.7 }], [107, { x: 680, y: 720, zoom: 1.8 }], [113, { x: 720, y: 760, zoom: 2.0 }], [118.4, { x: 730, y: 770, zoom: 2.4 }], [123.6, { x: 740, y: 780, zoom: 2.7 }], [139, { x: 700, y: 760, zoom: 2.0 }], [141.5, { x: 650, y: 740, zoom: 1.5 }], [157, { x: 650, y: 740, zoom: 1.5 }], [158.5, { x: 480, y: 720, zoom: 1.15 }], [163.5, { x: 480, y: 720, zoom: 1.15 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const hitV = (t) => HITS.reduce((m, h) => (t >= h ? Math.max(m, Math.exp(-(t - h) * 7)) : m), 0) + (t >= 133.6 ? 0 : 0);
const dipV = (t) => { let d = 0; for (const h of HB) { if (t >= h - 0.3 && t <= h) { const u = (t - (h - 0.3)) / 0.3; d = Math.max(d, u * u); } else if (t > h && t < h + 0.7) d = Math.max(d, Math.exp(-(t - h) * 8)); } return d; };
// ---------- the fox ----------
const FXK = [[0, 70], [19.3, 270], [26.0, 300], [37.0, 300], [38.3, 330], [72.0, 330], [74.5, 470], [91.1, 470], [92.2, 490], [93.6, 520], [95.0, 550], [96.2, 578], [101.4, 578], [102.4, 480], [107.1, 480], [109.6, 500], [113.4, 600], [139.1, 600], [141.2, 520], [157.7, 520], [162.5, -140]];
function foxP(t) {
  const x = kfn(t, FXK, 'inOut'), v = (kfn(t + 0.05, FXK, 'inOut') - kfn(t - 0.05, FXK, 'inOut')) / 0.1;
  const P = { x, y: GR + 2, s: 0.95, dir: 1, ph: x / 22, amp: K.clamp(Math.abs(v) / 22), eyes: 'open', mouth: 'closed', tailUp: 0.2 };
  const tkI = (l) => talk(t, l, 0.4);
  if (t < 6.8) { P.headUp = -0.25; P.eyes = 'open'; P.mouth = 'frown'; }
  if (t >= 6.8 && t < 12.9) { P.headUp = -0.5 + 0.1 * Math.sin(t * 4); P.drop = 20; P.mouth = 'closed'; P.tailUp = 0; }
  if (t >= 12.9 && t < 13.6) { P.ears = 0.6; P.mouth = 'frown'; P.tailUp = -0.2; }
  if (t >= 13.6 && t < 19.3) { P.talk = tkI([[13.6, 19.2]]); P.brow = 0.6; }
  if (t >= 24.6 && t < 26.1) { P.ears = 0.4; P.eyes = 'wide'; }
  if (t >= 26.1 && t < 52.78) { P.eyes = 'wide'; P.ears = 0.7; P.puff = t < 38 ? 1.5 : 1.2; P.tailUp = t < 38 ? 0.9 : -0.2; P.shake = (t >= 26.1 && t < 30 ? t : 0) || (HITS.some((h) => t >= h && t < h + 0.5) ? t : 0); P.amp = 0; }
  if (t >= 27.3 && t < 28.7) P.dir = -1;
  if (t >= 30.06 && t < 37.04) P.talk = tkI([[30.06, 31.08], [31.08, 33.3], [33.3, 37.04]]);
  if (t >= 38.3 && t < 52.78) { P.drop = 8; P.y = GR + 2; P.shake = (t * 1) * (t >= 43 ? 1 : 0.6); if (t >= 45.3 && t < 48.5) P.dir = Math.sin(t * 2) > 0 ? 1 : -1; if (t >= 50.24) { P.dir = -1; P.tailUp = 0.5; } }
  if (t >= 52.78) { P.dir = 1; P.puff = 1; P.tailUp = 0.2; P.ears = 0; P.eyes = t < 56 ? 'wide' : 'open'; P.headUp = 0.5 * K.beat(t, 52.78, 0.5); P.mouth = t < 56 ? 'open' : 'closed'; P.shake = 0; P.drop = 0; if (t >= 56) P.headUp = 0.1; }
  if (t >= 72.14 && t < 80.4) { P.ears = 0; P.mouth = 'closed'; P.headUp = 0.05; }
  if (t >= 80.5 && t < 91.1) { P.raise = 0.9; P.brow = 0.6; P.talk = tkI([[82.4, 91]]); P.headUp = 0.2; }
  if (t >= 91.1 && t < 96.2) { P.drop = 14; P.ears = 0.3; P.eyes = 'wide'; P.amp = 0.6; P.y -= 0; P.tailUp = -0.1; }
  if (t >= 96.2 && t < 98.3) { P.raise = K.beat(t, 96.4, 1.6, 'lin'); P.eyes = 'wide'; P.drop = 10; P.amp = 0; }
  if (t >= 98.3 && t < 101.4) { P.eyes = 'wide'; P.ears = 0.7; P.mouth = 'o'; P.shake = t; P.amp = 0; }
  if (t >= 101.4 && t < 102.5) { const u = (t - 101.4) / 1.0; P.y = GR + 2 - 90 * Math.sin(Math.PI * u); P.rot = -0.35 * Math.sin(Math.PI * u); P.eyes = 'wide'; P.mouth = 'open'; P.amp = 0; }
  if (t >= 102.8 && t < 107.1) { P.brow = 0.8; P.headUp = 0.15; P.raise = 0.6; P.amp = 0; }
  if (t >= 107.1 && t < 109.6) { P.brow = 1; P.tailUp = 0.9; P.puff = 1.3; P.eyes = 'open'; P.amp = 0; }
  if (t >= 109.6 && t < 113.4) { P.brow = 1; P.tailUp = 0.5; P.drop = 8; }
  if (t >= 113.4 && t < 115.0) { P.drop = 16 + 4 * Math.sin(t * 14); P.headUp = -0.1; P.amp = 0; P.brow = 0.6; }
  if (t >= 115.0 && t < 123.6) { P.mouth = Math.sin(t * 12) > 0 ? 'open' : 'closed'; P.drop = 10 + 4 * Math.sin(t * 12); P.shake = t; P.brow = 1; P.amp = 0; }
  if (t >= 123.6 && t < 139.1) { P.amp = 0; P.eyes = t < 130.4 ? 'wide' : 'wide'; P.mouth = t >= 130.4 && t < 134 ? 'open' : 'closed'; P.drop = 8; P.headUp = 0.1; P.ears = t > 132.8 ? 0.3 : 0; if (t >= 134) P.mouth = 'smile'; if (t >= 134.5) P.eyes = 'open'; }
  if (t >= 139.1 && t < 157.7) { P.sit = K.beat(t, 139.4, 0.9); P.amp = t < 141.2 ? P.amp : 0; P.mouth = 'closed'; P.eyes = 'open'; P.brow = 0.5; P.raise = t >= 143 && t < 148.6 ? 0.8 : 0; P.talk = tkI([[143.22, 148.6], [148.6, 153.48], [153.48, 157.14]]); P.headUp = 0.1; }
  if (t >= 157.7) { P.dir = -1; P.sit = 1 - K.beat(t, 157.7, 0.7); P.mouth = 'smile'; P.tailUp = 0.5; P.talk = 0; }
  return P;
}
function drawWorld(ctx, t, cam) {
  ctx.drawImage(skyL(), 0, 0, WW, 920); drawSun(ctx, 760, 130); cloudFlat(ctx, 120 + ((t * 3) % 1100), 110, 1.0); cloudFlat(ctx, ((t * 2 + 700) % 1200) - 100, 250, 0.8);
  ctx.drawImage(treeBack(), 0, 0, WW, GR + 10); ctx.drawImage(groundL(), 0, 0, WW, WH);
  ctx.drawImage(drumTree(), 0, 0, WW, GR + 10);
  const hole = K.clamp((t - 115) / 8.6); drumDraw(ctx, t, { hit: t >= 123.6 ? Math.exp(-Math.max(0, t - 133.6) * 7) * (t >= 133.6 ? 0.5 : 0) + Math.exp(-Math.max(0, t - 144) * 7) * (t >= 144 ? 0.5 : 0) : hitV(t), hole: K.ease.inOut(hole) });
  branchDraw(ctx, dipV(t), t);
  if (t < 54) { ctx.save(); ctx.globalAlpha = 1 - K.beat(t, 52.6, 1.2, 'lin'); ctx.drawImage(bushL(), 0, 0, WW, GR + 20); ctx.restore(); }
  const F = foxP(t), TR = (c) => c.drawImage(hideTree(), -141, 0, WW, GR + 10);
  if (t < 38.3 || t >= 74.5) { TR(ctx); fox(ctx, F); }
  else { fox(ctx, F); TR(ctx); ctx.save(); ctx.beginPath(); ctx.rect(436, 0, 600, WH); ctx.clip(); fox(ctx, F); ctx.restore(); }
  worldFX(ctx, t, cam, F);
}
function windStreaks(ctx, t) { for (let i = 0; i < 9; i++) { const u = ((t * 0.35 + i / 9) % 1), x = 1100 - u * 1300, y = 380 + (i * 61) % 300 + Math.sin(t * 2 + i) * 10; ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * u); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 40, y - 18, x + 80, y + 18, x + 130, y - 4); ctx.stroke(); ctx.restore(); } for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1), x = 1000 - u * 1100, y = 450 + i * 50 + Math.sin(t * 3 + i) * 20; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 4 + i); shape(ctx, ell(0, 0, 14, 7, 10), GREEN2, { lw: 3, seed: 2 }); ctx.restore(); } }
function worldFX(ctx, t, cam, F) {
  const B = (a, b) => K.beat(t, a, b, 'lin'), fh = [F.x + F.dir * 132 * F.s, F.y - 130 * F.s];
  if (t >= 8.5 && t < 12.6) { sfx(ctx, 'GRRR...', F.x - 20, F.y - 60, 46, B(8.5, 0.2), { rot: -0.06, fill: C.white }); }
  if (t >= 10.8 && t < 13.5) sfx(ctx, 'NOTHING!', F.x + 20, F.y - 250, 52, B(10.8, 0.2), { rot: 0.07, fill: C.white });
  if (t >= 14.2 && t < 19.3) cloud(ctx, fh[0] + 30, fh[1] - 160, 120, 84, C.blue, B(14.2, 0.4), { tail: [-70, 130], inside: (c) => { seg(c, -22, 14, 22, -14, 26, C.red, 5); shape(c, ell(-26, 16, 12, 12, 10), C.white, { lw: 4, seed: 2 }); shape(c, ell(-12, 24, 12, 12, 10), C.white, { lw: 4, seed: 2 }); } });
  HB.forEach((h) => { if (h < 123.6 && t >= h && t < h + 0.7 && h > 60) { sfx(ctx, 'BOOM!', 640 + (h % 3) * 12, 620, h < 60 ? 64 : 50, B(h, 0.1), { rot: -0.1, fill: C.yellow }); if (h < 60 && t < 53) { } else soundArcs(ctx, 790, 770, -1, t * 2); } });
  if (t >= 98.3 && t < 99.1) { sfx(ctx, 'BOOM!', 680, 600, 64, B(98.3, 0.1), { rot: 0.1 }); soundArcs(ctx, 790, 770, -1, t * 2); }
  if ((t >= 24.8 && t < 26.8) || (t >= 43.4 && t < 46.4)) { const h = t < 40 ? 24.8 : 43.4; sfx(ctx, 'BOOM!', F.x + 270, F.y - 250, 70, B(t < 40 ? 24.8 : 43.4, 0.1), { rot: -0.1 }); for (let i = 0; i < 3; i++) { const u = ((t * 1.4 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; ctx.lineWidth = 7; ctx.strokeStyle = C.white; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(F.x + 330 - u * 70, F.y - 120, 60 + u * 90, Math.PI - 0.8, Math.PI + 0.8); ctx.stroke(); ctx.restore(); } }
  if (t >= 26.2 && t < 30) sfx(ctx, '!', fh[0], fh[1] - 100, 100, B(26.2, 0.2), { fill: C.red });
  if (t >= 33.3 && t < 37.0) cloud(ctx, fh[0] + 20, fh[1] - 170, 130, 90, C.blue, B(33.3, 0.4), { tail: [-60, 140], inside: (c) => { shape(c, ell(0, 20, 70, 50, 22), C.black, { lw: 4, seed: 2 }); for (const ex of [-24, 24]) { shape(c, ell(ex, 8, 13, 10, 10), C.yellow, { lw: 3, seed: 2 }); } shape(c, [[-30, 38], [-20, 22], [-10, 38], [0, 22], [10, 38], [20, 22], [30, 38]], C.white, { lw: 3, seed: 3 }); sfx(c, '?', 62, -22, 50, 1, { fill: C.red }); } });
  if (t >= 48.5 && t < 52.78) for (let i = 0; i < 3; i++) { const u = ((t * 1.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[fh[0] - 30 + i * 18, fh[1] - 40 + u * 40], [fh[0] - 22 + i * 18, fh[1] - 20 + u * 40], [fh[0] - 30 + i * 18, fh[1] - 10 + u * 40], [fh[0] - 38 + i * 18, fh[1] - 20 + u * 40]], '#5fa0ff', { lw: 3 }); ctx.restore(); }
  if (t >= 52.8 && t < 55.2) sfx(ctx, '!', fh[0] + 30, fh[1] - 110, 90, B(52.8, 0.2), { fill: C.red });
  if (t >= 55 && t < 59) { ctx.save(); ctx.globalAlpha = K.env(t, 55, 59, 0.1, 0.5); S0.arrow(ctx, [640, 640], [708, 730], B(55.1, 0.7), { bend: -0.12, width: 24 }); ctx.restore(); }
  if (t >= 59.6 && t < 72.4) { ctx.save(); ctx.globalAlpha = K.env(t, 59.6, 72.4, 0.6, 0.6); windStreaks(ctx, t); ctx.restore(); }
  if (t >= 80.5 && t < 91.1) cloud(ctx, fh[0] + 10, fh[1] - 190, 150, 100, C.blue, B(80.8, 0.4), { tail: [-80, 150], inside: (c) => { shape(c, ell(-30, 10, 52, 52, 24), C.red, { lw: 5, seed: 2 }); for (const ex of [-46, -14]) shape(c, ell(ex, -6, 11, 9, 10), C.yellow, { lw: 3, seed: 2 }); for (let i = 0; i < 3; i++) { seg(c, 40 + i * 18, 40 - i * 4, 62 + i * 18, 6 - i * 4, 14, C.red, 4); shape(c, ell(34 + i * 18, 44 - i * 4, 9, 9, 8), C.white, { lw: 3 }); } } });
  if (t >= 96.5 && t < 98.4) sfx(ctx, 'TAP', 700, 700, 54, B(96.6, 0.15), { rot: -0.1, fill: C.white });
  if (t >= 101.4 && t < 103.2) sfx(ctx, '!!', F.x + 40, F.y - 330, 84, B(101.4, 0.15), { fill: C.red });
  if (t >= 103.6 && t < 107.1) { ctx.save(); ctx.globalAlpha = K.env(t, 103.6, 107.1, 0.1, 0.5); S0.arrow(ctx, [930, 460], [838, 596], B(103.7, 0.7), { bend: 0.1, width: 24 }); ctx.restore(); }
  if (t >= 105.6 && t < 107.9) bulb(ctx, fh[0], fh[1] - 160, B(105.6, 0.3));
  if (t >= 107.2 && t < 109.6) sfx(ctx, 'GRRR!', F.x + 30, F.y - 300, 58, B(107.2, 0.15), { rot: -0.08, fill: C.red });
  if (t >= 113.4 && t < 115) sfx(ctx, 'SNIFF!', F.x + 60, F.y - 260, 54, B(113.4, 0.15), { rot: 0.08, fill: C.white });
  if (t >= 115 && t < 118.4) { const k = Math.floor((t - 115) / 0.85); sfx(ctx, 'CHOMP!', 700 + (k % 2) * 20, 640 - (k % 2) * 14, 56, B(115 + k * 0.85, 0.12), { rot: (k % 2 ? 1 : -1) * 0.12 }); }
  if (t >= 117 && t < 123.6) for (let i = 0; i < 3; i++) { const u = ((t * 1.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[fh[0] - 40 + i * 16, fh[1] - 50 + u * 40], [fh[0] - 32 + i * 16, fh[1] - 30 + u * 40], [fh[0] - 40 + i * 16, fh[1] - 20 + u * 40], [fh[0] - 48 + i * 16, fh[1] - 30 + u * 40]], '#5fa0ff', { lw: 3 }); ctx.restore(); }
  if (t >= 130.5 && t < 133) sfx(ctx, 'EMPTY!', 640, 620, 70, B(130.5, 0.15), { rot: -0.08, fill: C.white });
  if (t >= 132.9 && t < 137) bubble(ctx, fh[0] - 60, fh[1] - 150, 220, 100, fh[0] - 10, fh[1] - 30, B(132.9, 0.25), 'WHAT?!', { size: 58, fill: C.yellow });
  if (t >= 137.1 && t < 139.14) bubble(ctx, fh[0] - 60, fh[1] - 150, 250, 100, fh[0] - 10, fh[1] - 30, B(137.1, 0.25), 'EMPTY!', { size: 58 });
  if (t >= 143.2 && t < 148.6) bubble(ctx, fh[0] + 20, fh[1] - 170, 290, 110, fh[0], fh[1] - 40, B(143.2, 0.3), 'I WAS SCARED!', { size: 46 });
  if (t >= 148.6 && t < 153.4) { const b = [fh[0] + 20, fh[1] - 190]; bubble(ctx, b[0], b[1], 250, 160, fh[0], fh[1] - 40, B(148.6, 0.3), '', {}); soundArcs(ctx, b[0] - 40, b[1], 1, t); shape(ctx, [[b[0] - 70, b[1] - 20], [b[0] - 40, b[1] - 20], [b[0] - 10, b[1] - 44], [b[0] - 10, b[1] + 44], [b[0] - 40, b[1] + 20], [b[0] - 70, b[1] + 20]], C.red, { lw: 5, seed: 2 }); ctx.save(); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(b[0] + 30, b[1] - 40); ctx.lineTo(b[0] + 90, b[1] + 30); ctx.moveTo(b[0] + 90, b[1] - 40); ctx.lineTo(b[0] + 30, b[1] + 30); ctx.stroke(); ctx.restore(); }
  if (t >= 153.5 && t < 157.14) { const b = [fh[0] + 20, fh[1] - 190]; bubble(ctx, b[0], b[1], 250, 160, fh[0], fh[1] - 40, B(153.5, 0.3), '', {}); shape(ctx, ell(b[0] - 30, b[1], 50, 50, 24), '#b8c4de', { lw: 6, seed: 2, dot: C.white, pitch: 9, rad: 0.15 }); ctx.save(); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(b[0] + 40, b[1] - 40); ctx.lineTo(b[0] + 100, b[1] + 30); ctx.moveTo(b[0] + 100, b[1] - 40); ctx.lineTo(b[0] + 40, b[1] + 30); ctx.stroke(); ctx.restore(); }
}
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; const shake = HITS.reduce((a, h) => a + (t >= 53 || h < 40 || true ? K.spring(t, h, 3.2, 11, 9) : 0), 0) * (t > 123.6 ? 0 : 1) + K.spring(t, 101.4, 6, 9, 6);
    ctx.save(); ctx.translate(shake * 0.8, -shake * 0.5);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px, py); ctx.scale(pw / WW, ph / WH);
    const cam = camAt(t);
    ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t, cam); ctx.restore();
    overlays(ctx, t, cam, S);
    if (t > 156.9 && t < 158.5) { ctx.save(); S.transition(ctx, WW, WH, K.clamp((t - 156.9) / 1.6), { caption: 'ON HE GOES...' }); ctx.restore(); }
    ctx.restore(); subtitle(ctx, W, H, t, 1); ctx.restore();
    S.finish(ctx, W, H, t);
  },
  score(k, S) {
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    [0.3, 0.75, 1.2, 1.65].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.08, gain: 0.4 }));
    k.play('wrong', 8.7, { gain: 0.35 }); k.play('pop', 11, { pitch: 0.8, gain: 0.5 }); k.play('pop', 14.3, { gain: 0.5 });
    [24.8, 25.9, 43.4, 45.6].forEach((h) => { k.play('thud', h, { gain: 0.6 }); k.play('stamp', h, { gain: 0.4 }); }); k.play('pop', 26.3, { pitch: 1.3, gain: 0.5 }); k.play('pop', 33.4, { pitch: 0.9, gain: 0.5 });
    k.play('pop', 52.9, { pitch: 1.3, gain: 0.5 }); k.play('scribble', 55.1, { medium: 'brush', dur: 0.7, gain: 0.4 });
    HB.filter((h) => h > 60 && h < 123).forEach((h) => { k.play('thud', h, { gain: 0.5 }); k.play('stamp', h, { gain: 0.3 }); }); k.play('thud', 98.4, { gain: 0.6 }); k.play('stamp', 98.4, { gain: 0.4 });
    k.play('pop', 80.9, { pitch: 0.9, gain: 0.5 }); SLOW.forEach((h) => k.play('tick', h, { gain: 0.6 })); k.play('pop', 96.7, { gain: 0.4 }); k.play('stamp', 101.5, { gain: 0.5 }); k.play('whoosh', 101.3, { dur: 0.5, gain: 0.3 });
    k.play('ding', 105.7, { gain: 0.5 }); k.play('pop', 107.3, { pitch: 0.7, gain: 0.5 }); k.play('click', 113.6, { gain: 0.6 });
    for (let t0 = 115; t0 < 118.4; t0 += 0.85) k.play('click', t0, { gain: 0.7 }); k.play('count', 126.6, { dur: 0.6, gain: 0.3 }); k.play('wrong', 130.6, { gain: 0.6 }); k.play('pop', 133, { pitch: 1.3, gain: 0.5 }); k.play('thud', 133.6, { gain: 0.3 }); k.play('pop', 137.2, { gain: 0.5 });
    k.play('pop', 143.3, { gain: 0.5 }); k.play('pop', 148.7, { pitch: 1.1, gain: 0.5 }); k.play('pop', 153.6, { pitch: 0.9, gain: 0.5 }); k.play('whoosh', 156.9, { dur: 0.9, gain: 0.55 }); k.play('stamp', 159.9, { gain: 0.7 }); k.play('chime', 160.3, { note: 'C6', gain: 0.9 });
  },
};
function overlays(ctx, t, cam, S) {
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Fox and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Drum', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  if (t >= 24.8 && t < 27.2) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 26.4) / 0.8); S.emphasis(ctx, 760, 400, 190, K.beat(t, 24.8, 0.45, 'lin'), { word: 'BOOM!', wx: -0.8, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 92.1 && t < 97.6) { let n = 0; SLOW.forEach((h, i) => { if (t >= h) n = i + 1; }); if (n > 0) { const h = SLOW[n - 1]; ctx.save(); ctx.globalAlpha = K.env(t, 92.1, 97.6, 0.1, 0.5); S.counter(ctx, n, 190, 300, K.clamp(0.4 + K.beat(t, h, 0.25, 'lin')), { size: 100, seed: 80 + n }); S.label(ctx, 'steps', 190, 420, 1, { align: 'center', size: 44, fill: C.yellow }); ctx.restore(); } }
  if (t >= 126.4 && t < 130.4) { ctx.save(); ctx.globalAlpha = K.env(t, 126.4, 130.4, 0.1, 0.4); S.counter(ctx, 0, 190, 300, K.beat(t, 126.4, 0.4, 'lin'), { size: 110 }); S.label(ctx, 'food inside', 190, 430, K.beat(t, 126.9, 0.3, 'lin'), { align: 'center', size: 44, fill: C.yellow }); ctx.restore(); }
  if (t >= 130.5 && t < 133.6) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 132.8) / 0.8); const [cx, cy] = toPanel(800, 775, cam); S.emphasis(ctx, cx, cy, 150 * cam.zoom, K.beat(t, 130.5, 0.45, 'lin'), { word: 'EMPTY!', wx: 0.8, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 159.8) S.title(ctx, 'THE END', 500, 190, K.beat(t, 159.8, 0.8, 'lin'), { size: 80, align: 'center' });
}
window.SCENE = SCENE;
