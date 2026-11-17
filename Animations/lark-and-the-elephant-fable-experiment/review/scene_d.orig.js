// ===== the story: the lark and the elephant =====
const WW = 1000, WH = 1230, GR = 900, PIT = [580, 880, 1180], NEST = [420, GR - 12], DUR = 195;
const PERCH_L = [[130, 604], [180, 604], [285, 604]], PERCH_C = [[790, 604], [840, 604], [890, 604]];
function layer1(key, w, h, draw) { return K.cached(key, () => { const c = K.layer(w * 2, h * 2), x = c.getContext('2d'); x.scale(2, 2); draw(x); return c; }); }
const skyL = () => layer1('sky', WW, 920, (x) => {
  x.fillStyle = C.blue; x.fillRect(0, 0, WW, 920); x.fillStyle = dotPat(x, '#3f7be6', 13, 0.3); x.fillRect(0, 0, WW, 920);
  for (const [bx, by, br, col] of [[150, 880, 260, '#2a62c9'], [560, 900, 300, '#2457b8'], [940, 880, 250, '#2a62c9']]) { x.beginPath(); x.ellipse(bx, by, br, br * 0.5, 0, Math.PI, 0); x.fillStyle = col; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); }
  const r = K.rng(4); for (let i = 0; i < 12; i++) { const cx = 40 + i * 84 + r() * 30, h = 70 + r() * 60, cr = 38 + r() * 14; x.beginPath(); x.arc(cx, GR - h, cr, 0, 7); x.fillStyle = GREEND; x.fill(); x.lineWidth = 6; x.strokeStyle = C.black; x.stroke(); x.fillStyle = WOOD; x.fillRect(cx - 6, GR - h + cr - 4, 12, h - cr + 6); }
});
const treesL = () => layer1('trees', WW, GR + 10, (x) => {
  const tree = (tx, tw, cans, br) => { shape(x, [[tx, GR + 4], [tx + 8, 480], [tx + tw - 8, 480], [tx + tw, GR + 4]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 }); shape(x, br, WOOD, { lw: 7, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
    for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); } for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); } x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); } };
  tree(26, 74, [[70, 390, 130], [190, 440, 90], [20, 470, 70], [140, 340, 80]], [[90, 612], [310, 598], [310, 628], [90, 644]]);
  tree(922, 74, [[950, 390, 130], [830, 450, 90], [1000, 470, 70], [880, 340, 80]], [[930, 612], [730, 598], [730, 628], [930, 644]]);
});
const pitBack = () => layer1('pit', WW, WH, (x) => { x.fillStyle = NAVY2; x.fillRect(PIT[0], GR, PIT[1] - PIT[0], PIT[2] - GR); x.fillStyle = dotPat(x, '#274fae', 12, 0.2); x.fillRect(PIT[0], GR, PIT[1] - PIT[0], PIT[2] - GR); });
const groundL = () => layer1('ground', WW, WH, (x) => {
  const g = [[-10, GR], [PIT[0], GR], [PIT[0] - 6, PIT[2]], [PIT[1] + 6, PIT[2]], [PIT[1], GR], [1010, GR], [1010, WH], [-10, WH]];
  shape(x, g, '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  for (const [a, b] of [[-10, PIT[0] - 4], [PIT[1] + 4, 1010]]) { shape(x, [[a, GR - 8], [b, GR - 8], [b, GR + 22], [a, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = a + 10; px < b; px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5); }
  shape(x, [[250, GR + 22], [560, GR + 22], [560, GR + 40], [250, GR + 40]], '#f2d27a', { lw: 5, seed: 22 });
  const pond = ell(215, GR + 4, 92, 20, 28); shape(x, pond, C.blue, { lw: 7, seed: 23, dot: C.white, pitch: 9, rad: 0.15, da: 0.6 }); for (const rx of [118, 130, 305, 316]) { seg(x, rx, GR, rx - 2, GR - 50, 5, GREEND, 2.5); shape(x, ell(rx - 2, GR - 56, 5, 12, 8), '#7a4e12', { lw: 3 }); }
});
function drawSun(ctx, x, y) { for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; seg(ctx, x + Math.cos(a) * 88, y + Math.sin(a) * 88, x + Math.cos(a) * 118, y + Math.sin(a) * 118, 9, C.yellow, 4); } shape(ctx, ell(x, y, 70, 70, 40), C.yellow, { lw: 8, seed: 40, dot: C.red, pitch: 9, rad: 0.2, da: 0.55 }); }
function cloudFlat(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cs = [[-60, 6, 38], [-18, -16, 46], [30, -8, 40], [66, 8, 30]]; ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); } ctx.fillStyle = C.white; for (const [cx, cy, r] of cs) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); } ctx.fillRect(-60, 6, 126, 32); ctx.restore(); }

const CAM = [[0, { x: 500, y: 640, zoom: 1.0 }], [3.4, { x: 500, y: 640, zoom: 1.0 }], [5.4, { x: 380, y: 710, zoom: 1.7 }], [12.0, { x: 400, y: 730, zoom: 2.1 }], [19.0, { x: 360, y: 720, zoom: 1.8 }], [21.5, { x: 450, y: 690, zoom: 1.15 }], [28.0, { x: 360, y: 730, zoom: 1.7 }], [33.6, { x: 400, y: 750, zoom: 2.1 }], [36.5, { x: 440, y: 730, zoom: 1.6 }],
  [38.4, { x: 400, y: 730, zoom: 1.9 }], [46.0, { x: 470, y: 720, zoom: 1.7 }], [48.4, { x: 590, y: 710, zoom: 1.7 }], [62.0, { x: 600, y: 690, zoom: 1.6 }], [70.5, { x: 520, y: 670, zoom: 1.4 }], [73.4, { x: 210, y: 640, zoom: 1.9 }], [83.0, { x: 210, y: 640, zoom: 1.9 }], [85.0, { x: 790, y: 650, zoom: 1.8 }], [94.0, { x: 790, y: 660, zoom: 1.7 }], [97.5, { x: 640, y: 660, zoom: 1.9 }], [103.0, { x: 520, y: 720, zoom: 1.5 }],
  [116.0, { x: 420, y: 730, zoom: 1.5 }], [123.5, { x: 420, y: 720, zoom: 1.5 }], [126.0, { x: 250, y: 730, zoom: 1.9 }], [143.0, { x: 250, y: 730, zoom: 1.9 }], [146.5, { x: 420, y: 740, zoom: 1.3 }], [151.0, { x: 480, y: 760, zoom: 1.5 }], [157.0, { x: 520, y: 770, zoom: 1.4 }], [161.0, { x: 660, y: 980, zoom: 1.6 }], [166.0, { x: 700, y: 1000, zoom: 1.7 }], [168.0, { x: 620, y: 860, zoom: 1.5 }], [177.0, { x: 690, y: 740, zoom: 1.7 }], [190.0, { x: 690, y: 730, zoom: 1.7 }], [195, { x: 690, y: 730, zoom: 1.7 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- the elephant ----------
const EX = [[22.5, -250], [34.4, 335], [37.0, 470], [44.0, 520], [102.8, 520], [105, 470], [108, 400], [111, 350], [114, 300], [117, 330], [120, 380], [123.9, 440], [157.4, 440], [161.8, 610]];
const ED = [[0, 1], [110, 1], [111, -1], [115, -1], [116, 1], [119, 1], [120, -1], [122, -1], [123, 1]];
function elephantP(t) {
  const P = { s: 0.8, dir: kfn(t, ED), eyes: 'open', trunk: 0, y: GR };
  let x = kfn(t, EX, 'inOut'); const v = (kfn(t + 0.05, EX, 'inOut') - kfn(t - 0.05, EX, 'inOut')) / 0.1; P.amp = K.clamp(Math.abs(v) / 90); P.ph = x / 26; P.x = x;
  if (t >= 26.8 && t < 28.9) P.drop = 14; if (t >= 28.9 && t < 34.4) { P.eyes = 'smug'; P.trunk = 0.3; }
  if (t >= 59.6 && t < 63.5) { P.eyes = 'smug'; P.trunk = 0.5; } if (t >= 63 && t < 98.6) P.brow = 0;
  if (t >= 101.2) { P.eyes = 'x'; } if (t >= 101.2 && t < 103.5) P.trunk = 1;
  if (t >= 105 && t < 123.9) { P.drop = 4; P.tongue = t >= 110; P.trunk = 0.3 + 0.3 * Math.sin(t * 2); if (t > 105) P.rot = Math.sin(t * 1.4) * 0.03; }
  if (t >= 116.7 && t < 123.3) P.earUp = 0.5 + 0.2 * Math.sin(t * 6);
  if (t >= 152.4 && t < 157.5) { P.earUp = 0.55 + 0.2 * Math.sin(t * 6); P.tongue = true; }
  if (t >= 161.8) { const u = K.clamp((t - 161.8) / 2.9); P.x = K.lerp(610, 722, u); P.y = GR + 276 * K.ease.in(u); P.rot = 0.5 * Math.sin(Math.PI * Math.min(1, u * 1.1)) * (1 - u * 0.2); P.amp = 0.5 * (1 - u); P.trunk = u < 1 ? 1 : 0.5 + 0.5 * Math.sin(t * 5); }
  if (t >= 164.7) { P.y = GR + 276; P.rot = 0; }
  return P;
}
// ---------- the lark ----------
function larkP(t) {
  const P = { s: 0.85, dir: 1, kind: 'lark', eyes: 'open', fly: false, flap: 0 }; let x, y; const fly = () => { P.fly = true; P.flap = Math.sin(t * 20); };
  const wp = (keys) => { const xs = keys.map(([a, b]) => [a, b]), ys = keys.map(([a, , c]) => [a, c]); x = kfn(t, xs); y = kfn(t, ys); const d = Math.hypot(kfn(t + 0.05, xs) - kfn(t - 0.05, xs), kfn(t + 0.05, ys) - kfn(t - 0.05, ys)); if (d > 0.4) fly(); P.dir = (kfn(t + 0.1, xs) - kfn(t - 0.1, xs)) >= 0 ? 1 : -1; };
  if (t < 7.2) { wp([[0, -80, 520], [4.6, 260, 560], [6.0, 380, 700], [7.2, 420, 840]]); }
  else if (t < 20.3) { const per = t < 15.3 ? 2.0 : 1.5, t0 = t < 15.3 ? 7.2 : 15.5, u = ((t - t0) % per) / per; if (t >= 15.3 && t < 15.5) { x = 420; y = 850; fly(); } else { const out = [300, 780], home = [420, 848 - (t < 15.3 ? 0 : 0)]; const a = u < 0.5 ? K.ease.inOut(u / 0.5) : K.ease.inOut((u - 0.5) / 0.5); if (u < 0.5) { x = K.lerp(home[0], out[0], a); y = K.lerp(home[1], out[1], a) - 40 * Math.sin(Math.PI * a); P.dir = -1; } else { x = K.lerp(out[0], home[0], a); y = K.lerp(out[1], home[1], a) - 40 * Math.sin(Math.PI * a); P.dir = 1; P.carry = true; } fly(); P.arrive = u > 0.5 && u < 0.5 + 0.12; P.u = u; } }
  else if (t < 38.0) { wp([[20.2, 430, 830], [21.8, -120, 480], [38.0, -120, 480]]); }
  else if (t < 46.4) { wp([[38.0, -120, 560], [39.5, 385, 878], [46.4, 385, 878]]); if (t > 39.8) { P.fly = false; P.flap = 0; P.eyes = 'shut'; P.dir = 1; P.drop = 6; } }
  else if (t < 70.8) { wp([[46.4, 385, 878], [48.4, 735, 740], [70.8, 735, 740]]); if (t > 48.6) { fly(); P.dir = -1; y += Math.sin(t * 3) * 8; } if (t >= 63 && t < 67) P.brow = 1; if (t >= 49.8 && t < 59.6) P.beak = talk(t, [[49.8, 59.6]], 0); if (t >= 63 && t < 70) { P.eyes = 'open'; P.brow = 1; } }
  else if (t < 83.9) { wp([[70.8, 735, 740], [73.4, 232, 600], [83.9, 232, 600]]); if (t > 73.6) { P.fly = false; P.flap = 0; P.dir = 1; } if (t >= 81.2) P.brow = 0; }
  else if (t < 123.8) { wp([[83.9, 232, 600], [86.0, 742, 600], [123.8, 742, 600]]); if (t > 86.2) { P.fly = false; P.flap = 0; P.dir = 1; } if (t >= 86 && t < 94.4) P.beak = talk(t, [[86, 94.4]], 0); }
  else if (t < 145.9) { wp([[123.8, 742, 600], [126.2, 272, 884], [145.9, 272, 884]]); if (t > 126.4) { P.fly = false; P.flap = 0; P.dir = -1; } if (t >= 131.2 && t < 142.4) P.beak = talk(t, [[131.2, 142.4]], 0); }
  else if (t < 167.3) { wp([[145.9, 272, 884], [148.2, 232, 600], [167.3, 232, 600]]); if (t > 148.4) { P.fly = false; P.flap = 0; P.dir = 1; } }
  else { wp([[167.3, 232, 600], [170.4, 600, 810], [172, 600, 810], [175, 590, 790], [195, 590, 790]]); if (t > 170.6) { fly(); P.dir = 1; y += Math.sin(t * 3) * 8; } if (t >= 172.3 && t < 184.7) P.beak = talk(t, [[172.3, 184.7]], 0); }
  P.x = x; P.y = y; return P;
}
// ---------- other birds, crows, frogs ----------
function friendsP(t) {
  const out = [];
  const colors = ['y', 'r', 'b'];
  for (let i = 0; i < 3; i++) { // colored birds: perched on the left branch from 71.5, gather at the pit rim from 177.5
    const P = { s: 0.7, dir: 1, kind: colors[i], x: PERCH_L[i][0], y: PERCH_L[i][1] };
    if (t < 71.5) continue;
    if (t >= 177.5) { const u = K.clamp((t - 177.5 - i * 0.2) / 1.6), to = [470 + i * 42, GR]; P.x = K.lerp(PERCH_L[i][0], to[0], K.ease.inOut(u)); P.y = K.lerp(PERCH_L[i][1], to[1], K.ease.inOut(u)) - 120 * Math.sin(Math.PI * u); if (u > 0 && u < 1) { P.fly = true; P.flap = Math.sin(t * 20); } else if (u >= 1) { P.y = GR - Math.abs(Math.sin(t * 7 + i)) * (t > 184.7 ? 24 : 0); } }
    if (t >= 75.6 && t < 81) P.beak = talk(t, [[75.6, 81]], i);
    out.push(P);
  }
  for (let i = 0; i < 3; i++) { // crows
    const P = { s: 0.75, dir: -1, kind: 'crow', x: PERCH_C[i][0], y: PERCH_C[i][1] };
    if (t >= 94.5 && t < 107.5) { const a = K.clamp((t - 94.5 - i * 0.15) / 3.2), tgt = [700 + i * 14 - 20, 700 + (i - 1) * 22], b = K.clamp((t - 103 - i * 0.2) / 3.6);
      if (a < 1) { P.x = K.lerp(PERCH_C[i][0], tgt[0], K.ease.inOut(a)); P.y = K.lerp(PERCH_C[i][1], tgt[1], K.ease.inOut(a)) - 60 * Math.sin(Math.PI * a); P.fly = true; P.flap = Math.sin(t * 20); }
      else if (b <= 0) { P.x = tgt[0]; P.y = tgt[1] + Math.sin(t * 14 + i * 2) * 8; P.fly = true; P.flap = Math.sin(t * 22); P.beak = t > 98.5 && t < 102.9 ? 0.8 * Math.abs(Math.sin(t * 14 + i * 2)) : 0; P.rot = t > 98.5 && t < 102.9 ? 0.3 * Math.sin(t * 14 + i * 2) : 0; }
      else { P.x = K.lerp(tgt[0], PERCH_C[i][0], K.ease.inOut(b)); P.y = K.lerp(tgt[1], PERCH_C[i][1], K.ease.inOut(b)) - 60 * Math.sin(Math.PI * b); P.fly = b < 1; P.flap = Math.sin(t * 20); P.dir = 1; } }
    if (t >= 177.5) { const u = K.clamp((t - 177.5 - i * 0.2) / 1.6), to = [895 + i * 0 - i * 0, GR]; const tx = [905, 925, 885][i]; P.x = K.lerp(PERCH_C[i][0], tx, K.ease.inOut(u)); P.y = K.lerp(PERCH_C[i][1], GR, K.ease.inOut(u)) - 120 * Math.sin(Math.PI * u); if (u > 0 && u < 1) { P.fly = true; P.flap = Math.sin(t * 20); } else if (u >= 1) P.y = GR - Math.abs(Math.sin(t * 7 + i)) * (t > 184.7 ? 24 : 0); P.dir = -1; }
    if (t >= 85 && t < 94.5) { P.eyes = 'open'; if (t >= 94) P.dir = -1; }
    out.push(P);
  }
  return out;
}
function frogsP(t) {
  const out = [], home = [172, 212, 256], rim = [520, 545, 570];
  for (let i = 0; i < 3; i++) {
    const P = { s: 0.9, dir: 1, x: home[i], y: GR - 4 }; const hop = K.clamp((t - 146.0 - i * 0.25) / 4.2);
    if (t >= 146 && hop < 1) { const n = 6; P.x = K.lerp(home[i], rim[i], hop); const f = (hop * n) % 1; P.y = GR - 4 - 60 * Math.sin(Math.PI * f); }
    else if (hop >= 1) { P.x = rim[i]; P.y = GR - 4; P.dir = 1; if (t >= 151.5 && t < 165.4) P.croak = 0.5 + 0.5 * Math.sin(t * 9 + i); if (t >= 165.4) P.y -= Math.abs(Math.sin((t - 165.4) * 9)) * 10 * (t < 167 ? 1 : 0); }
    if (t >= 131.1 && t < 145.9 && t >= 139.6) P.croak = 0.5 + 0.5 * Math.sin(t * 9 + i);
    if (t < 125) { P.eyes = 'open'; }
    if (t >= 177.5) { P.x = rim[i] + 30 + i * 22 - 20; P.y = GR - 4 - (t > 184.7 ? Math.abs(Math.sin(t * 8 + i)) * 26 : 0); P.croak = 0; }
    out.push(P);
  }
  return out;
}
function drawWorld(ctx, t, cam) {
  ctx.drawImage(skyL(), 0, 0, WW, 920); drawSun(ctx, 760, 130); cloudFlat(ctx, 120 + ((t * 3) % 1100), 110, 1.0); cloudFlat(ctx, ((t * 2 + 700) % 1200) - 100, 250, 0.8);
  ctx.drawImage(treesL(), 0, 0, WW, GR + 10); ctx.drawImage(pitBack(), 0, 0, WW, WH);
  const E = elephantP(t), L = larkP(t);
  // nest
  const eggT = [10.1, 10.6, 11.1], hatch = [12.5, 12.8, 13.1];
  const nb = K.clamp((t - 7.2) / 3.6), nestO = { nb, t, eggs: t >= 10.1 ? 3 : 0, egg: eggT.map((a) => (t - a) / 0.3), chicks: 0, ruin: K.beat(t, 34.4, 0.6, 'lin') };
  nestO.chicks = hatch.filter((h) => t >= h).length; if (nestO.chicks > 0) nestO.eggs = 3;
  nestO.feed = t >= 15.5 && t < 20.3 && L.arrive; nestO.ruin = t >= 34.4 ? K.beat(t, 34.4, 0.6, 'lin') : 0;
  if (t >= 7.2) nestDraw(ctx, NEST[0], NEST[1], nestO);
  // elephant, birds, frogs
  if (t >= 22.5) elephant(ctx, E);
  for (const f of frogsP(t)) frog(ctx, f);
  for (const b of friendsP(t)) bird(ctx, b);
  if (L.carry && t >= 7.2 && t < 15.3) { const sx = L.x + 30 * L.dir, sy = L.y - 52 * L.s; seg(ctx, sx, sy, sx + 36 * L.dir, sy + 4, 4, '#f2d27a', 2); }
  if (L.carry && t >= 15.5 && t < 20.3) worm(ctx, L.x + 62 * L.dir, L.y - 54 * L.s, t);
  bird(ctx, L);
  ctx.drawImage(groundL(), 0, 0, WW, WH);
  worldFX(ctx, t, cam, E, L);
}
function worldFX(ctx, t, cam, E, L) {
  const B = (a, b) => K.beat(t, a, b, 'lin'), eh = [E.x + (152 + 40) * 0.8 * E.dir, E.y - 214 * 0.8];
  // building the nest and feeding
  if (t >= 10.1 && t < 11.7) for (let i = 0; i < 3; i++) if (t >= [10.1, 10.6, 11.1][i]) sfx(ctx, '!', 380 + i * 40, 780, 50, B([10.1, 10.6, 11.1][i], 0.15), { fill: C.white });
  if (t >= 12.6 && t < 15) sfx(ctx, 'CHEEP!', 430, 740, 50, B(12.6, 0.2), { rot: -0.08 });
  if (t >= 16.2 && t < 20) for (let k = 0; k < 3; k++) { const h = 16.8 + k * 1.5; if (t >= h && t < h + 0.8) sfx(ctx, 'CHEEP!', 430, 730 - k * 8, 40, B(h, 0.15), { rot: 0.08, fill: C.white }); }
  // elephant arrives, ignores the nest, crushes it
  if (t >= 33.9 && t < 36) { sfx(ctx, 'CRUNCH!', 430, 760, 74, B(34.2, 0.2), { rot: -0.12 }); }
  if (t >= 28.9 && t < 31.5) sfx(ctx, 'HMPH', E.x + 190, E.y - 260, 56, B(28.9, 0.2), { rot: 0.08, fill: C.white });
  // lark cries
  if (t >= 40.9 && t < 46.4) for (let i = 0; i < 3; i++) { const u = ((t * 1.1 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[L.x + 34, L.y - 56 + u * 50], [L.x + 41, L.y - 38 + u * 50], [L.x + 34, L.y - 30 + u * 50], [L.x + 27, L.y - 38 + u * 50]], '#5fa0ff', { lw: 3 }); ctx.restore(); }
  if (t >= 39.6 && t < 46.4) sfx(ctx, 'WAAH!', 330, 700, 58, B(39.8, 0.2), { rot: -0.1, fill: C.white });
  // asking: egg / chick / small bird icons
  if (t >= 48.4 && t < 59.8) { const bx = L.x + 40, by = L.y - 190; bubble(ctx, bx, by, 250, 150, L.x - 10, L.y - 60, B(48.4, 0.3), '', {}); const ic = t < 52.6 ? 0 : t < 56.1 ? 1 : 2; if (ic === 0) { shape(ctx, ell(bx, by, 28, 36, 18), C.white, { lw: 5, seed: 2 }); ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(bx - 28, by); ctx.lineTo(bx - 12, by - 14); ctx.lineTo(bx, by + 4); ctx.lineTo(bx + 14, by - 12); ctx.lineTo(bx + 28, by); ctx.stroke(); ctx.restore(); } else if (ic === 1) { shape(ctx, ell(bx, by, 30, 28, 16), C.yellow, { lw: 5, seed: 2 }); ctx.save(); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(bx - 14, by - 10); ctx.lineTo(bx - 2, by + 2); ctx.moveTo(bx - 2, by - 10); ctx.lineTo(bx - 14, by + 2); ctx.stroke(); ctx.restore(); } else { bird(ctx, { x: bx - 10, y: by + 40, s: 0.55, kind: 'lark', dir: 1 }); sfx(ctx, '?', bx + 60, by - 20, 56, 1, { fill: C.red }); } }
  if (t >= 61.4 && t < 63.2) bubble(ctx, eh[0] + 70, eh[1] - 150, 230, 110, eh[0] + 10, eh[1] - 20, B(61.4, 0.2), 'YES!', { size: 70, fill: C.yellow });
  // angry, then the plan
  if (t >= 63.2 && t < 67.5) { sfx(ctx, 'GRR!', L.x - 90, L.y - 110, 58, B(63.2, 0.2), { rot: -0.1, fill: C.red }); for (let i = 0; i < 3; i++) { const u = ((t * 1.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; cloudFlat(ctx, L.x + 20 + i * 24, L.y - 90 - u * 60, 0.22); ctx.restore(); } }
  if (t >= 75.8 && t < 81.2) bubble(ctx, 215, 500, 280, 100, 180, 580, B(75.8, 0.3), 'SMALL TOO!', { size: 50 });
  if (t >= 81.4 && t < 83.9) bulb(ctx, 232, 480, B(81.4, 0.3));
  // crows: lark asks, they agree, they peck
  if (t >= 86.0 && t < 94.4) { bubble(ctx, 600, 440, 280, 160, 720, 560, B(86.0, 0.3), '', {}); shape(ctx, ell(600, 440, 52, 34, 20), C.white, { lw: 5, seed: 2 }); ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(612, 440, 15, 0, 7); ctx.fill(); if (t >= 90.4) { ctx.save(); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(550, 400); ctx.lineTo(650, 480); ctx.moveTo(650, 400); ctx.lineTo(550, 480); ctx.stroke(); ctx.restore(); } }
  if (t >= 94.5 && t < 96.5) sfx(ctx, 'CAW!', 790, 540, 64, B(94.5, 0.2), { rot: 0.1 });
  if (t >= 98.6 && t < 102.8) { const k = Math.floor((t - 98.6) * 3.5); sfx(ctx, 'PECK!', eh[0] + 60 + (k % 2) * 30, eh[1] - 90 - (k % 3) * 16, 52, B(98.6 + k / 3.5, 0.1), { rot: (k % 2 ? 1 : -1) * 0.14 }); }
  if (t >= 101.4 && t < 103.8) sfx(ctx, 'ROAR!', eh[0] - 40, eh[1] - 160, 70, B(101.4, 0.2), { rot: -0.1, fill: C.red });
  // blind and thirsty
  if (t >= 105.6 && t < 111.5) clockFace(ctx, E.x, E.y - 330, 52, t - 105.6, B(105.6, 0.3));
  if (t >= 110 && t < 123.9) for (let i = 0; i < 3; i++) { const u = ((t * 1.2 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - u; shape(ctx, [[eh[0] - 10 + i * 12, eh[1] - 40 + u * 40], [eh[0] - 2 + i * 12, eh[1] - 20 + u * 40], [eh[0] - 10 + i * 12, eh[1] - 10 + u * 40], [eh[0] - 18 + i * 12, eh[1] - 20 + u * 40]], '#5fa0ff', { lw: 3 }); ctx.restore(); }
  if (t >= 116.7 && t < 123.3) { soundArcs(ctx, E.x - 150, E.y - 330, -1, t); soundArcs(ctx, E.x + 220, E.y - 300, 1, t + 0.3); sfx(ctx, '?', eh[0], eh[1] - 130, 70, B(117, 0.2), { fill: C.white, rot: 0.1 }); }
  // frogs
  if (t >= 131.2 && t < 137.4) { bubble(ctx, 300, 700, 250, 150, 262, 830, B(131.2, 0.3), '', {}); shape(ctx, [[245, 730], [355, 730], [345, 680], [255, 680]], '#d9a441', { lw: 5, seed: 2 }); shape(ctx, ell(300, 680, 46, 12, 18), NAVY2, { lw: 5, seed: 2 }); }
  if (t >= 137.8 && t < 142.4) { bubble(ctx, 300, 700, 250, 150, 262, 830, B(137.8, 0.3), 'LOUD!', { size: 58, fill: C.yellow }); }
  if (t >= 142.4 && t < 145.9) { bubble(ctx, 300, 700, 250, 150, 262, 830, B(142.4, 0.3), '', {}); shape(ctx, [[300, 660], [272, 706], [328, 706]], '#5fa0ff', { lw: 5, seed: 2 }); shape(ctx, ell(300, 708, 30, 30, 16), '#5fa0ff', { lw: 5, seed: 2 }); }
  if (t >= 151.5 && t < 165.4) { const k = Math.floor((t - 151.5) / 1.3); if (t - 151.5 - k * 1.3 < 0.8) sfx(ctx, 'RIBBIT!', 560, 780 - (k % 2) * 40, 54, B(151.5 + k * 1.3, 0.15), { rot: -0.1 + (k % 3) * 0.1 }); if (t < 162) soundArcs(ctx, 560, 840, -1, t); }
  if (t >= 152.5 && t < 154.7) sfx(ctx, '!', eh[0], eh[1] - 130, 90, B(152.5, 0.2), { fill: C.red });
  if (t >= 154.8 && t < 157.6) cloud(ctx, E.x + 80, E.y - 440, 130, 90, C.blue, B(154.8, 0.4), { tail: [-40, 140], inside: (c) => { shape(c, ell(0, 20, 76, 22, 22), '#5fa0ff', { lw: 5, seed: 2, dot: C.white, pitch: 9, rad: 0.15, da: 0.6 }); shape(c, [[-10, -50], [-30, -4], [10, -4]], '#5fa0ff', { lw: 4, seed: 2 }); } });
  if (t >= 161.8 && t < 163.6) sfx(ctx, 'WHOA!', 600, 760, 64, B(161.8, 0.2), { rot: -0.1 });
  if (t >= 165.2 && t < 167.4) sfx(ctx, 'STUCK!', 760, 880, 60, B(165.2, 0.2), { rot: 0.08, fill: C.white });
  // the lesson
  if (t >= 172.3 && t < 177.4) bubble(ctx, L.x + 120, L.y - 120, 300, 110, L.x + 10, L.y - 40, B(172.3, 0.3), 'SMALL?!', { size: 58 });
  if (t >= 177.6 && t < 184.7) sfx(ctx, 'FRIENDS!', 700, 700, 66, B(177.6, 0.2), { rot: -0.06 });
}
// ---------- the scene ----------

const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; const shake = K.spring(t, 34.4, 8, 9, 6) + K.spring(t, 164.7, 12, 8, 5) + K.spring(t, 101.4, 5, 10, 7);
    ctx.save(); ctx.translate(shake * 0.8, -shake * 0.5);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip();
    ctx.translate(px, py); ctx.scale(pw / WW, ph / WH);
    const cam = camAt(t);
    ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t, cam); ctx.restore();
    overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1); ctx.restore();
    S.finish(ctx, W, H, t);
  },
  score(k, S) {
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    [0.3, 0.75, 1.2, 1.65].forEach((h, i) => k.play('pop', h, { pitch: 0.8 + i * 0.08, gain: 0.4 }));
    [10.1, 10.6, 11.1].forEach((h) => k.play('ding', h, { gain: 0.4 })); [12.6, 12.9, 13.2].forEach((h) => k.play('pop', h, { pitch: 1.5, gain: 0.35 })); [16.8, 18.3, 19.8].forEach((h) => k.play('pop', h, { pitch: 1.4, gain: 0.3 }));
    for (let t0 = 24; t0 < 34; t0 += 1.1) k.play('thud', t0, { gain: 0.25 }); k.play('pop', 28.9, { pitch: 0.7, gain: 0.5 }); k.play('stamp', 34.4, { gain: 0.9 }); k.play('thud', 34.4, { gain: 0.8 });
    k.play('wrong', 39.9, { gain: 0.5 }); k.play('pop', 48.5, { gain: 0.5 }); k.play('stamp', 61.5, { gain: 0.5 }); k.play('pop', 63.3, { pitch: 0.7, gain: 0.5 }); k.play('pop', 75.9, { gain: 0.5 }); k.play('ding', 81.5, { gain: 0.5 });
    k.play('pop', 86.1, { gain: 0.5 }); k.play('pop', 90.5, { pitch: 0.8, gain: 0.5 }); k.play('stamp', 94.6, { gain: 0.5 }); k.play('whoosh', 94.7, { dur: 1.0, gain: 0.35 });
    for (let t0 = 98.7; t0 < 102.7; t0 += 0.29) k.play('click', t0, { gain: 0.7 }); k.play('stamp', 101.4, { gain: 0.8 });
    for (let t0 = 105.8; t0 < 111.4; t0 += 0.5) k.play('tick', t0, { gain: 0.45 }); k.play('wrong', 117.1, { gain: 0.4 });
    k.play('pop', 131.3, { gain: 0.5 }); k.play('pop', 137.9, { pitch: 1.2, gain: 0.5 }); k.play('pop', 142.5, { pitch: 0.9, gain: 0.5 }); k.play('scribble', 135.6, { medium: 'brush', dur: 0.8, gain: 0.45 });
    for (let k2 = 0; k2 < 10; k2++) k.play('blip', 151.6 + k2 * 1.3, { note: 'G3', gain: 0.5, dur: 0.18 });
    k.play('pop', 152.6, { pitch: 1.4, gain: 0.5 }); k.play('pop', 154.9, { pitch: 0.9, gain: 0.5 }); k.play('whoosh', 161.9, { dur: 0.9, up: false, gain: 0.45 }); k.play('stamp', 164.7, { gain: 1 }); k.play('thud', 164.7, { gain: 1 }); k.play('wrong', 165.4, { gain: 0.5 });
    k.play('pop', 172.4, { pitch: 0.8, gain: 0.5 }); k.play('pop', 177.7, { pitch: 1.2, gain: 0.5 }); k.play('count', 180.9, { dur: 1.6, gain: 0.5 }); k.play('stamp', 190.4, { gain: 0.8 }); k.play('chime', 190.6, { note: 'C6', gain: 0.9 }); k.play('stamp', 192.6, { gain: 0.6 }); k.play('chime', 193.0, { note: 'G5', gain: 0.8 });
  },
};
function overlays(ctx, t, cam, S) {
  if (t < 3.8) { const ex = K.beat(t, 3.0, 0.7, 'lin'); ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(0, ex * 60);
    S.title(ctx, 'The Lark and', 500, 1010, K.beat(t, 0.15, 1.0, 'lin'), { size: 64, align: 'center' }); S.title(ctx, 'the Elephant', 500, 1130, K.beat(t, 0.9, 1.0, 'lin'), { size: 64, align: 'center' }); ctx.restore(); }
  if (t >= 135.5 && t < 138.4) { ctx.save(); ctx.globalAlpha = K.env(t, 135.5, 138.4, 0.1, 0.4); S.arrow(ctx, [330, 820], [560, 820], K.beat(t, 135.6, 0.7, 'out'), { bend: -0.1, width: 24 }); ctx.restore(); }
  if (t >= 180.8 && t < 185) { ctx.save(); ctx.globalAlpha = K.env(t, 180.8, 185, 0.1, 0.4); S.counter(ctx, Math.round(K.count(t, 181.0, 1.6, 0, 9)), 180, 300, K.beat(t, 180.8, 0.4, 'lin'), { size: 110 }); S.label(ctx, 'friends', 180, 430, K.beat(t, 181.3, 0.3, 'lin'), { align: 'center', size: 44, fill: C.yellow }); ctx.restore(); }
  if (t >= 164.7 && t < 167.8) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 167) / 0.8); const [cx, cy] = toPanel(722, 1010, cam); S.emphasis(ctx, cx, cy, 200, K.beat(t, 164.7, 0.45, 'lin'), { word: 'CRASH!', wx: 0.8, wy: 0.7, ry: 0.8 }); ctx.restore(); }
  if (t >= 190.4 && t < 192.6) { ctx.save(); ctx.globalAlpha = 1 - K.clamp((t - 192) / 0.6); const [cx, cy] = toPanel(600, 820, cam); S.emphasis(ctx, cx, cy, 240, K.beat(t, 190.4, 0.5, 'lin'), { word: 'TEAM!', wx: 0.8, wy: 0.7, ry: 0.7 }); ctx.restore(); }
  if (t >= 192.6) S.title(ctx, 'THE END', 500, 190, K.beat(t, 192.6, 0.8, 'lin'), { size: 80, align: 'center' });
}
window.SCENE = SCENE;
