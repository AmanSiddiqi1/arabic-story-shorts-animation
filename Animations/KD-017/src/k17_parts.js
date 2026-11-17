// ===== KD-017 The Hesitant Thief: set (merchant house cutaway 1800 wide: street, hall, yard), doors, props, icons, helpers =====
// World 1800 x 1230, floor y 900. Street x 0..380, front wall x 380..420 (FRONT DOOR gap y 610..900), hall x 420..1280,
// back wall x 1280..1320 (BACK DOOR gap), yard x 1320..1800. Every drawing is a pure function of its arguments (and t).
const K17_VW = 1000, K17_VH = 1230, K17_WW = 1800, K17_GR = 900, K17_DUR = 169.2;   // plan: duration 166.209 + end_hold 3.0
const K17_DTOP = 610, K17_CEIL = 380;
const K17_NIGHT_T = 21.85;   // the day -> night switch, hidden under the ONE NIGHT... card (21.34-22.36, midpoint 21.85)
const K17_WOOD = '#a8741a', K17_WOODD = '#6e4a10', K17_BRICK = '#c98a3a', K17_BRICKD = '#8a5a14', K17_SACK = '#b07a3a', K17_SACKD = '#7a4a1a';
const K17_SILVER = '#d6d2e0', K17_NWALL = '#2a4a9a', K17_NWALLD = '#1b3a8f';
const K17B = (t, a, d, e = 'out') => K.beat(t, a, d, e);
const k17Fade = (t, a, b, f = 0.25) => K.clamp(Math.min((t - a) / f, (b - t) / f));
const k17P = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const k17Pop = (t, a, d = 0.3) => (t < a ? 0 : K.ease.back(K.clamp((t - a) / d)));
const k17In = (t, a, b) => t >= a && t < b;
// piecewise linear (runs that must not ease at every key)
function k17Lin(t, keys) { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1] = keys[i]; return K.lerp(v0, v1, (t - t0) / (t1 - t0)); } return keys[keys.length - 1][1]; }
// walk fields from a keyed x track: legs from distance (no sliding); teleports (cuts) give no stride
function k17Walk(P, xf, t) { const x = xf(t), v = (xf(t + 0.04) - xf(t - 0.04)) / 0.08; P.x = x; P.ph = x / (27 * (P.s || 1)); P.amp = Math.abs(v) > 2500 ? 0 : K.clamp(Math.abs(v) / 70); return P; }

// ---------- person anchors: figure-local point -> world (pose hip offset, lean, acting sq + tip) ----------
function k17L2W(P, lx, ly) {
  const s = (P.s || 1) * (P.child ? 0.62 : 1), dir = P.dir || 1, hipY = -75, D = PEOPLE.dress(P), lean = (P.lean || 0) + D.age * 0.12 * (1 - K.clamp(P.lie || 0)), g = personPose(P, -1, 0), off = [g.hipC[0], g.hipC[1] - hipY];
  const dy = ly - hipY, c = Math.cos(lean), n = Math.sin(lean); [lx, ly] = [lx * c - dy * n + off[0], lx * n + dy * c + hipY + off[1]];
  let wx = lx * s * dir, wy = ly * s; const sq = P.sq ?? 1; wx *= 1 + (1 - sq) * 0.7; wy *= sq;
  const tp = (P.tip || 0) * Math.sign(dir), cc = Math.cos(tp), nn = Math.sin(tp);
  return [P.x + wx * cc - wy * nn, P.y + wx * nn + wy * cc];
}
const k17Head = (P) => k17L2W(P, (P.look || 0) * 4, -195 + (P.drop || 0) + PEOPLE.dress(P).age * 6);
const k17Collar = (P) => k17L2W(P, 0, -140);
const k17Hand = (P, i) => (P.hands ? k17L2W(P, P.hands[i][0], P.hands[i][1]) : k17Head(P));
// blink + gaze at a world point (explicit lid so P.hands stays on this object)
function k17Life(P, t, seed, target) { if (!P.noBlink && P.eyes !== 'wide') P.lid = Math.max(P.lid || 0, blink(t, seed)); if (target) P.gaze = lookAt(k17Head(P), target); return P; }

// ---------- static set: sky, street backdrop, hall back wall, shelf, yard back wall (baked per palette) ----------
function k17Back(ctx, night) {
  ctx.drawImage(bake('k17:back:' + (night ? 'n' : 'd'), K17_WW, K17_VH, (x) => {
    // sky
    x.fillStyle = night ? NAVY2 : C.blue; x.fillRect(0, 0, K17_WW, 920); x.fillStyle = dotPat(x, night ? '#1b3a8f' : '#3f7be6', 13, 0.3); x.fillRect(0, 0, K17_WW, 920);
    if (night) { stars(x, { w: K17_WW, h: 560, n: 80, seed: 17, avoid: [1370, 290, 110] }); moon(x, 1370, 290, 60); }
    else { sun(x, 140, 150, 0); cloudFlat(x, 1560, 160, 0.8); }
    // street backdrop: far house fronts, lamp post
    const hf = night ? '#16337f' : '#e8c27a', hd = night ? '#0d2260' : '#c98a3a';
    for (const [a, b, top] of [[-10, 150, 560], [150, 300, 620], [300, 390, 520]]) { shape(x, [[a, 900], [a, top], [b, top], [b, 900]], hf, { lw: 5, seed: 200 + a, dot: hd, pitch: 10, rad: 0.25, da: 0.5 });
      for (let wx = a + 30; wx < b - 40; wx += 60) townWindow(x, wx, top + 60, 36, 50, { lit: night ? 0.9 : 0, noShutters: true }); }
    seg(x, 210, 900, 210, 640, 9, '#4a5878', 3); shape(x, [[192, 640], [228, 640], [222, 600], [198, 600]], night ? C.yellow : '#c98a3a', { lw: 4, seed: 207 });
    // yard: back garden wall with an arched gate (open), the sky beyond
    const yw = night ? '#5a6a9a' : '#e0b070', ywd = night ? '#3a4a7a' : '#b0802a';
    shape(x, [[1320, 900], [1320, 640], [1680, 640], [1680, 900]], yw, { lw: 5, seed: 210, dot: ywd, pitch: 9, rad: 0.25, da: 0.5 });
    shape(x, [[1760, 900], [1760, 640], [1810, 640], [1810, 900]], yw, { lw: 5, seed: 211, dot: ywd, pitch: 9, rad: 0.25, da: 0.5 });
    shape(x, [[1672, 640], [1768, 640], [1768, 600], [1720, 572], [1672, 600]], yw, { lw: 5, seed: 212 });
    x.lineWidth = 3; x.strokeStyle = C.black; for (let yy = 670; yy < 900; yy += 34) { x.beginPath(); x.moveTo(1322, yy); x.lineTo(1678, yy); x.stroke(); }
    // gate posts and the open leaf flat against the wall
    seg(x, 1680, 900, 1680, 640, 12, K17_WOOD, 4); seg(x, 1760, 900, 1760, 640, 12, K17_WOOD, 4);
    shape(x, [[1764, 700], [1800, 694], [1800, 900], [1764, 900]], K17_WOOD, { lw: 4, seed: 213, dot: C.black, pitch: 9, rad: 0.16, da: 0.35 });
    palmTree(x, 1610, 900, { h: 470, s: 0.85, lean: 24, t: 0, sway: 0 });
    // ground: street cobbles, hall floor (deep tiles), yard grass; stone footing and earth below
    x.fillStyle = night ? '#3a2410' : EARTHD; x.fillRect(0, 1010, K17_WW, 230); x.fillStyle = dotPat(x, night ? '#24160a' : '#5b3010', 9, 0.3); x.fillRect(0, 1010, K17_WW, 230);
    for (let bx = -20, i = 0; bx < K17_WW; bx += 64, i++) shape(x, K.rectPts(bx + (i % 2) * 8, 1010, 60, 34), night ? '#4a5878' : STONE, { lw: 3.5, seed: 500 + i });
    const r = K.rng(77); for (let i = 0; i < 30; i++) shape(x, ell(r() * K17_WW, 1080 + r() * 140, 10 + r() * 14, 7 + r() * 8, 12), night ? '#4a3a2a' : '#9a6a3a', { lw: 3, seed: 520 + i });
    x.fillStyle = night ? '#4a5878' : STONE; x.fillRect(0, 892, 420, 118); x.fillStyle = night ? '#6a7898' : STONE2; for (let ry = 0; ry < 4; ry++) for (let cx = (ry % 2) * 17; cx < 420; cx += 34) { x.beginPath(); x.ellipse(cx + 16, 916 + ry * 26, 14, 9, 0, 0, 7); x.fill(); }
    x.fillStyle = night ? '#3a5a2a' : GREEN; x.fillRect(1300, 892, 520, 118); x.fillStyle = dotPat(x, night ? '#24401a' : GREEND, 8, 0.3); x.fillRect(1300, 892, 520, 118);
    x.fillStyle = night ? '#16337f' : '#f2d27a'; x.fillRect(420, 892, 880, 118); x.fillStyle = night ? '#0d2260' : '#d9a441';
    for (let ry = 0; ry < 4; ry++) for (let tx = 420 + (ry % 2) * 30; tx < 1300; tx += 60) x.fillRect(tx, 922 + ry * 22, 30, 22);
    ink(x, [[0, 1010], [K17_WW, 1010]], 5, 530);
    // hall back wall
    const wl = night ? K17_NWALL : '#f6e3b0', wd = night ? K17_NWALLD : '#e8c27a';
    shape(x, [[400, 900], [400, K17_CEIL], [1300, K17_CEIL], [1300, 900]], wl, { lw: 5, seed: 220, dot: wd, pitch: 11, rad: 0.28, da: 0.5 });
    // tile band (dado)
    x.fillStyle = night ? '#16337f' : C.blue; x.fillRect(420, 830, 860, 60); x.fillStyle = night ? '#2a4fae' : C.yellow; for (let tx = 430; tx < 1270; tx += 40) { x.beginPath(); x.moveTo(tx + 20, 838); x.lineTo(tx + 34, 860); x.lineTo(tx + 20, 882); x.lineTo(tx + 6, 860); x.closePath(); x.fill(); }
    ink(x, [[420, 830], [1280, 830]], 4, 221); ink(x, [[420, 890], [1280, 890]], 4, 222);
    // inner arch (to the other rooms) between two pillars
    const ap = townArchPts(1010, 1170, 560, 900, 'pointed'); shape(x, ap, night ? '#0a1a4a' : '#7a4212', { lw: 0, seed: 223 }); x.fillStyle = dotPat(x, night ? '#16337f' : '#5b3010', 9, 0.3); K.poly(x, ap, true); x.fill(); ink(x, ap, 7, 224);
    for (const px of [1000, 1180]) shape(x, [[px - 14, 900], [px - 14, 560], [px + 14, 560], [px + 14, 900]], night ? '#3a5aaa' : C.yellow, { lw: 5, seed: 225 + px, dot: night ? K17_NWALLD : C.red, pitch: 8, rad: 0.2, da: 0.5 });
    // small window
    townWindow(x, 450, 460, 70, 90, { arch: 'pointed', lit: night ? 0 : 0.5, noShutters: true, bars: true });
    // shelf unit 560..740 (boards at 690, 770, 850: lowered from the plan so the cast can reach)
    shape(x, [[560, 900], [560, 615], [740, 615], [740, 900]], night ? '#3a2410' : '#7a4212', { lw: 5, seed: 230, dot: C.black, pitch: 9, rad: 0.18, da: 0.4 });
    for (const by of [690, 770, 850]) shape(x, [[552, by], [748, by], [748, by + 11], [552, by + 11]], K17_WOOD, { lw: 4, seed: 231 + by });
    for (let i = 0; i < 3; i++) shape(x, K.rectPts(690 + i * 14, 810 - i * 2, 12, 40 + i * 2), [C.red, C.yellow, C.blue][i], { lw: 3, seed: 240 + i });   // cloth bolts (low shelf)
    for (let i = 0; i < 4; i++) shape(x, K.rectPts(574 + i * 12, 730 - (i % 2) * 6, 10, 40 + (i % 2) * 6), [GREEN, C.red, C.blue, C.yellow][i], { lw: 3, seed: 250 + i });   // books (mid shelf left)
    // carpet (in front of the dado, on the floor)
    shape(x, [[620, 896], [1080, 896], [1110, 960], [590, 960]], C.red, { lw: 4, seed: 260, dot: '#a8160f', pitch: 7, rad: 0.25, da: 0.5 });
    x.lineWidth = 5; x.strokeStyle = C.yellow; x.beginPath(); x.moveTo(626, 906); x.lineTo(1076, 906); x.moveTo(604, 948); x.lineTo(1096, 948); x.stroke();
  }), 0, 0, K17_WW, K17_VH);
}
// side walls with the door gaps, roof and parapet (drawn after anything that must hide behind a wall)
function k17Walls(ctx, night) {
  const wc = night ? '#8a5a2a' : K17_BRICK, wd = night ? '#5b3a1e' : K17_BRICKD;
  for (const [a, b] of [[380, 420], [1280, 1320]]) {
    shape(ctx, [[a, K17_DTOP], [a, K17_CEIL - 40], [b, K17_CEIL - 40], [b, K17_DTOP]], wc, { lw: 5, seed: 270 + a, dot: wd, pitch: 8, rad: 0.25, da: 0.5 });
    shape(ctx, [[a - 8, K17_DTOP], [b + 8, K17_DTOP], [b + 8, K17_DTOP - 16], [a - 8, K17_DTOP - 16]], K17_WOODD, { lw: 4, seed: 272 + a });   // lintel
    shape(ctx, [[a - 6, 902], [b + 6, 902], [b + 6, 890], [a - 6, 890]], K17_WOODD, { lw: 3, seed: 274 + a });   // threshold
    ink(ctx, [[a, K17_DTOP], [a, 900]], 6, 276 + a); ink(ctx, [[b, K17_DTOP], [b, 900]], 6, 277 + a);
  }
  shape(ctx, [[360, K17_CEIL], [360, K17_CEIL - 46], [1340, K17_CEIL - 46], [1340, K17_CEIL]], wd, { lw: 5, seed: 280, dot: C.black, pitch: 9, rad: 0.18, da: 0.4 });
  for (let px = 360; px < 1340; px += 70) shape(ctx, [[px, K17_CEIL - 46], [px, K17_CEIL - 74], [px + 44, K17_CEIL - 74], [px + 44, K17_CEIL - 46]], C.red, { lw: 4, seed: 281 + px });
}
// a door leaf: side 'F' (front wall 380..420, hinge 420, swings to +x) or 'B' (back wall 1280..1320, hinge 1280, swings to -x).
// open 0..1 (leaf 16 -> 110 wide into the hall), kn: knock displacement (pushes the leaf in), bulge: inward bow of the closed door.
function k17Door(ctx, side, open, kn = 0, o = {}) {
  const F = side === 'F', a = F ? 380 : 1280, b = F ? 420 : 1320, hinge = F ? 420 : 1280, sg = F ? 1 : -1, top = K17_DTOP + 4, bot = 900;
  const cover = 1 - K.clamp(open * 2.5), push = kn * 9 * sg, bulge = (o.bulge || 0) * sg;
  // the door body in the wall gap (seen from the side): planks, iron bands, ring handles on both faces
  if (cover > 0.01) { ctx.save(); ctx.globalAlpha *= cover; const xa = a + push, xb = b + push;
    shape(ctx, [[xa, top], [xb, top], [xb + bulge, (top + bot) / 2], [xb, bot], [xa, bot], [xa + bulge, (top + bot) / 2]], K17_WOOD, { lw: 4, seed: F ? 300 : 301, dot: C.black, pitch: 8, rad: 0.16, da: 0.35 });
    for (const fy of [0.25, 0.7]) seg(ctx, xa + 2, top + (bot - top) * fy, xb - 2, top + (bot - top) * fy, 7, '#4a5878', 2.5);
    ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc((F ? xa : xb) - sg * 6, 770, 10, 0, 7); ctx.stroke(); ctx.restore(); }
  // the leaf in the hall: grows from the hinge, slight perspective (free edge taller), panels, bands, ring handle
  const w = 16 + 94 * K.clamp(open) + Math.abs(push) * 0.4, sk = 10 * K.clamp(open), fx = hinge + sg * w, rot = (o.rattle || 0);
  ctx.save(); ctx.translate(hinge, bot); ctx.rotate(rot * sg); ctx.translate(-hinge, -bot);
  const leaf = [[hinge, top], [fx, top - sk], [fx, bot + sk * 0.3], [hinge, bot]];
  shape(ctx, leaf, o.glow ? mixHex(K17_WOOD, C.yellow, o.glow) : K17_WOOD, { lw: 5, seed: F ? 302 : 303, dot: C.black, pitch: 9, rad: 0.16, da: 0.35 });
  if (w > 40) { ctx.lineWidth = 3; ctx.strokeStyle = C.black; for (let k = 1; k < 3; k++) { const px = hinge + sg * w * k / 3; ctx.beginPath(); ctx.moveTo(px, top - sk * k / 3 + 6); ctx.lineTo(px, bot - 4); ctx.stroke(); }
    for (const fy of [0.22, 0.72]) seg(ctx, hinge + sg * 3, top + (bot - top) * fy - sk * 0.4, fx - sg * 3, top + (bot - top) * fy - sk * 0.8, 7, '#4a5878', 2.5); }
  ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(fx - sg * 14, 765, 11, 0, 7); ctx.stroke();
  // hinge pins (a screw can pop out: o.screw 0..1)
  for (const hy of [650, 860]) shape(ctx, K.rectPts(hinge - 5, hy - 10, 10, 20), '#4a5878', { lw: 3, seed: 304 + hy });
  if (o.screw > 0) { const u = K.clamp(o.screw); shape(ctx, K.rectPts(hinge + sg * (6 + 14 * u) - 4, 647, 8 + 10 * u, 6), K17_SILVER, { lw: 2.5, seed: 306 }); }
  ctx.restore();
  if (o.glow) { ctx.save(); ctx.globalAlpha = 0.5 * o.glow; ctx.lineWidth = 14; ctx.strokeStyle = C.yellow; ctx.strokeRect(a - 10, K17_DTOP - 20, b - a + 20, 300); ctx.restore(); }
}
// impact stars on a door face (pure in t): hit at t0 for 0.35 s
function k17Impact(ctx, x, y, t, t0, sz = 1) { const d = t - t0; if (d < 0 || d > 0.35) return; const u = d / 0.35; ctx.save(); ctx.globalAlpha = 1 - u; star(ctx, x, y, (26 + 30 * u) * sz, C.yellow, t0 * 3); ctx.lineWidth = 5; ctx.strokeStyle = C.black; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + t0; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 30 * sz, y + Math.sin(a) * 30 * sz); ctx.lineTo(x + Math.cos(a) * (46 + 30 * u) * sz, y + Math.sin(a) * (46 + 30 * u) * sz); ctx.stroke(); } ctx.restore(); }
// dust falling from a lintel after a hit
function k17Dust(ctx, x0, x1, y, t, t0, seed = 1) { const d = t - t0; if (d < 0 || d > 0.9) return; const r = K.rng(seed * 13 + Math.round(t0 * 10)); ctx.save(); ctx.globalAlpha = 0.85 * (1 - d / 0.9); ctx.fillStyle = '#e8d8b0'; for (let i = 0; i < 9; i++) { const px = K.lerp(x0, x1, r()), vy = 120 + r() * 160; ctx.beginPath(); ctx.arc(px + Math.sin(d * 6 + i) * 4, y + vy * d + 200 * d * d, 3 + r() * 3, 0, 7); ctx.fill(); } ctx.restore(); }

// ---------- props ----------
// sack: fill 0 (empty rag) .. 1 (full and lumpy), sq: squash (sat on), slump 0..1 (tips over), o.poke: 'candle'
function k17Sack(ctx, x, y, fill = 1, o = {}) {
  const f = K.clamp(fill), h = K.lerp(34, 130, f), w = K.lerp(120, 110, f), sq = o.sq ?? 1, sl = o.slump || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(sl * 0.35); ctx.scale(1 + (1 - sq) * 0.6, sq);
  if (o.poke === 'candle' && f > 0.5) { seg(ctx, 10, -h + 6, 22, -h - 46, 9, C.yellow, 3.5); shape(ctx, ell(23, -h - 54, 6, 10, 10), C.red, { lw: 2.5, seed: 312 }); }
  if (o.poke === 'cup' && f > 0.5) k17Cup(ctx, -10, -h + 14, 0.8);
  const r = K.rng(311), bumps = [[-w / 2, 0]]; for (let i = 0; i <= 6; i++) { const u = i / 6, a = Math.PI * (1 - u); bumps.push([Math.cos(a) * w * 0.52 + (r() - 0.5) * 10 * f, -h * 0.55 - Math.sin(a) * h * 0.4 + (r() - 0.5) * 14 * f]); }
  bumps.push([w / 2, 0]);
  shape(ctx, [[-w / 2, 0], [-w * 0.55, -h * 0.5], ...bumps.slice(1, -1), [w * 0.55, -h * 0.5], [w / 2, 0]], K17_SACK, { lw: 5, seed: 313, dot: K17_SACKD, pitch: 8, rad: 0.2, da: 0.5 });
  seg(ctx, -16, -h * 0.93, 16, -h * 0.93, 7, K17_SACKD, 2.5);
  if (f > 0.3) shape(ctx, [[-12, -h * 0.93], [-22, -h - 16], [0, -h - 6], [22, -h - 16], [12, -h * 0.93]], K17_SACK, { lw: 3.5, seed: 314 });
  ctx.restore();
}
// a small empty sack carried in a hand (hangs from the grip point)
function k17SackHeld(ctx, x, y, s = 0.7, sw = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(sw); ctx.scale(s, s); shape(ctx, [[-10, 0], [10, 0], [34, 70], [20, 96], [-20, 96], [-34, 70]], K17_SACK, { lw: 4, seed: 315, dot: K17_SACKD, pitch: 8, rad: 0.2, da: 0.5 }); seg(ctx, -12, 4, 12, 4, 6, K17_SACKD, 2); ctx.restore(); }
function k17Coin(ctx, x, y, r = 13) { shape(ctx, ell(x, y, r, r, 18), C.yellow, { lw: 3.5, seed: 320 }); ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 7); ctx.stroke(); ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - r * 0.4, y - r * 0.6); ctx.lineTo(x - r * 0.1, y - r * 0.75); ctx.stroke(); ctx.restore(); }
// valuables: (x, y) = the base point they stand on
function k17Cup(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-16, 0], [16, 0], [10, -8], [4, -14], [4, -26], [20, -40], [22, -62], [-22, -62], [-20, -40], [-4, -26], [-4, -14], [-10, -8]], C.yellow, { lw: 4, seed: 330, dot: C.red, pitch: 6, rad: 0.2, da: 0.5 }); shape(ctx, ell(0, -50, 5, 5, 10), C.red, { lw: 2.5, seed: 331 }); ctx.restore(); }
function k17Vase(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-12, 0], [12, 0], [24, -22], [20, -42], [9, -54], [12, -66], [-12, -66], [-9, -54], [-20, -42], [-24, -22]], C.blue, { lw: 4, seed: 332, dot: C.white, pitch: 7, rad: 0.2, da: 0.5 }); ctx.restore(); }
function k17Jar(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-10, 0], [10, 0], [18, -16], [14, -34], [7, -40], [-7, -40], [-14, -34], [-18, -16]], C.red, { lw: 4, seed: 333, dot: '#a8160f', pitch: 6, rad: 0.25, da: 0.5 }); ctx.restore(); }
function k17Plate(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, ell(0, -26, 26, 26, 24), K17_SILVER, { lw: 4, seed: 334 }); shape(ctx, ell(0, -26, 15, 15, 18), C.white, { lw: 2.5, seed: 335 }); ctx.restore(); }
function k17Candle(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-14, 0], [14, 0], [4, -8], [4, -40], [12, -46], [-12, -46], [-4, -40], [-4, -8]], C.yellow, { lw: 3.5, seed: 336 }); shape(ctx, K.rectPts(-5, -70, 10, 24), C.white, { lw: 3, seed: 337 }); shape(ctx, ell(0, -76, 4, 7, 10), C.red, { lw: 2, seed: 338 }); ctx.restore(); }
function k17Broom(ctx, top, foot) { const a = Math.atan2(foot[1] - top[1], foot[0] - top[0]), n = [-Math.sin(a), Math.cos(a)]; seg(ctx, top[0], top[1], foot[0] - Math.cos(a) * 30, foot[1] - Math.sin(a) * 30, 8, K17_WOOD, 3);
  const b0 = [foot[0] - Math.cos(a) * 36, foot[1] - Math.sin(a) * 36]; shape(ctx, [[b0[0] + n[0] * 8, b0[1] + n[1] * 8], [b0[0] - n[0] * 8, b0[1] - n[1] * 8], [foot[0] - n[0] * 24, foot[1] - n[1] * 8], [foot[0] + n[0] * 24, foot[1] + n[1] * 8]], C.yellow, { lw: 3.5, seed: 339, dot: C.red, pitch: 6, rad: 0.2, da: 0.5 }); }
function k17Pot(ctx, x, y, lift = 0, tilt = 0) { ctx.save(); ctx.translate(x, y - lift); ctx.rotate(tilt); shape(ctx, [[-26, 0], [26, 0], [34, -50], [-34, -50]], '#c8481a', { lw: 4, seed: 340, dot: '#7a4212', pitch: 7, rad: 0.2, da: 0.5 }); shape(ctx, K.rectPts(-38, -60, 76, 12), '#c8481a', { lw: 4, seed: 341 });
  for (let i = -1; i <= 1; i++) seg(ctx, i * 10, -60, i * 22, -110 + Math.abs(i) * 14, 6, GREEN, 2.5); ctx.restore(); }
// well icon: stone ring, two posts, little red roof, rope and bucket. o.ghost: dashed blue outline only; o.mark: '?' | 'x'
function k17Well(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.ghost) { ctx.setLineDash([16, 12]); ctx.lineWidth = o.ghostW || 7; ctx.strokeStyle = o.ghostC || '#9cc4ff'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.rect(-60, -70, 120, 70); ctx.moveTo(-50, -70); ctx.lineTo(-50, -170); ctx.moveTo(50, -70); ctx.lineTo(50, -170); ctx.moveTo(-80, -160); ctx.lineTo(0, -200); ctx.lineTo(80, -160); ctx.stroke(); ctx.setLineDash([]); }
  else {
    seg(ctx, -50, -60, -50, -170, 10, K17_WOOD, 3.5); seg(ctx, 50, -60, 50, -170, 10, K17_WOOD, 3.5);
    shape(ctx, [[-80, -158], [0, -200], [80, -158], [72, -150], [0, -186], [-72, -150]], C.red, { lw: 4, seed: 350 });
    seg(ctx, 0, -160, 0, -112, 3, C.black, 0); shape(ctx, [[-12, -112], [12, -112], [9, -92], [-9, -92]], K17_WOOD, { lw: 3, seed: 351 });
    shape(ctx, [[-60, 0], [-60, -70], [60, -70], [60, 0]], STONE, { lw: 5, seed: 352 }); ctx.lineWidth = 3; ctx.strokeStyle = C.black;
    for (const yy of [-35]) { ctx.beginPath(); ctx.moveTo(-60, yy); ctx.lineTo(60, yy); ctx.stroke(); } for (const [xx, y0] of [[-20, -70], [25, -70], [0, -35], [-40, -35], [40, -35]]) { ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx, y0 + 35); ctx.stroke(); }
    shape(ctx, ell(0, -70, 60, 12, 24), '#4a5878', { lw: 4, seed: 353 }); }
  ctx.restore();
  if (o.mark === '?') sfx(ctx, '?', x + 70 * s, y - 210 * s, 110 * s * (o.mk ?? 1), 1, { rot: 0.12, fill: C.yellow });
  if (o.mark === 'x' && o.mk > 0) { const k = K.ease.back(K.clamp(o.mk)); ctx.save(); ctx.translate(x, y - 100 * s); ctx.scale(k, k); ctx.lineCap = 'round'; for (const [w, c] of [[38 * s, C.black], [24 * s, C.red]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(-110 * s, -110 * s); ctx.lineTo(110 * s, 110 * s); ctx.moveTo(110 * s, -110 * s); ctx.lineTo(-110 * s, 110 * s); ctx.stroke(); } ctx.restore(); }
}
// door icon (for balloons and clouds): arched wooden door with a ring; o.tick adds a green tick
function k17DoorIcon(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const pts = townArchPts(-60, 60, -200, 0, 'pointed'); shape(ctx, pts, K17_WOOD, { lw: 6, seed: 360, dot: C.black, pitch: 9, rad: 0.16, da: 0.35 });
  ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(0, 0); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(30, -90, 11, 0, 7); ctx.stroke();
  if (o.tick) { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (const [w, c] of [[30, C.black], [18, GREEN2]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(40, -80); ctx.lineTo(70, -40); ctx.lineTo(130, -150); ctx.stroke(); } }
  ctx.restore();
}
// hourglass time meter (panel space): fill 0..1 in the top bulb, running stream, red when empty, rot (tips over)
function k17Hourglass(ctx, x, y, fill, o = {}) {
  const k = o.k ?? 1; if (k <= 0) return; const red = o.red || 0, sandC = red > 0 ? mixHex(C.yellow, C.red, red) : C.yellow;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k, k);
  shape(ctx, K.rectPts(-40, -64, 80, 12), K17_WOOD, { lw: 4, seed: 370 }); shape(ctx, K.rectPts(-40, 52, 80, 12), K17_WOOD, { lw: 4, seed: 371 });
  seg(ctx, -32, -52, -32, 52, 7, K17_WOODD, 2.5); seg(ctx, 32, -52, 32, 52, 7, K17_WOODD, 2.5);
  const glass = [[-26, -52], [26, -52], [24, -30], [5, -3], [5, 3], [24, 30], [26, 52], [-26, 52], [-24, 30], [-5, 3], [-5, -3], [-24, -30]];
  ctx.fillStyle = 'rgba(255,250,240,0.85)'; K.poly(ctx, glass, true); ctx.fill();
  ctx.save(); K.poly(ctx, glass, true); ctx.clip(); const f = K.clamp(fill), top = K.lerp(-3, -50, Math.sqrt(f)); ctx.fillStyle = sandC;
  if (f > 0.001) { ctx.fillRect(-30, top, 60, -3 - top); }
  const bot = K.lerp(52, 12, Math.sqrt(1 - f)); ctx.fillRect(-30, bot, 60, 52 - bot);
  if (o.run && f > 0.001) { ctx.fillRect(-1.6, -3, 3.2, bot + 3); }
  ctx.restore(); ink(ctx, glass.concat([glass[0]]), 4, 372); ctx.restore();
}
// thought cloud shorthand for this film (world units), inside drawn by fn in cloud-local units around [0, 0]
function k17Cloud(ctx, x, y, w, h, t, p, tail, fn, o = {}) { thoughtCloud(ctx, x, y, w, h, t, { p, tail, n: 10, seed: o.seed ?? 4, lw: 9, scale: 1, at: [0, 0], inside: (c) => fn(c), bg: o.bg }); }
// speech balloon (no text) with an icon inside
function k17Balloon(ctx, x, y, w, h, tx, ty, p, fn) { bubble(ctx, x, y, w, h, tx, ty, p, ''); const k = K.ease.back(K.clamp(p * 1.5)); if (k <= 0 || !fn) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); fn(ctx); ctx.restore(); }
// flush: red dot cheeks spreading over the face (owner's anger)
function k17Flush(ctx, P, k) { if (k <= 0) return; const h = k17Head(P), s = P.s || 1; ctx.save(); ctx.globalAlpha = 0.75 * k; ctx.fillStyle = dotPat(ctx, C.red, 6, 0.42); ctx.beginPath(); ctx.ellipse(h[0], h[1] + 6 * s, 34 * s, 30 * s * K.clamp(k * 1.3), 0, 0, 7); ctx.fill(); ctx.restore(); }
// chalk outline drawn in the air (door shape) progressively: pts world polyline, u 0..1
function k17Chalk(ctx, pts, u, alpha = 1) { const q = K.trim(pts, K.clamp(u)); if (q.length < 2) return; ctx.save(); ctx.globalAlpha = alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = C.black; K.poly(ctx, q); ctx.stroke(); ctx.lineWidth = 7; ctx.strokeStyle = C.white; K.poly(ctx, q); ctx.stroke(); ctx.restore(); }
// sparkle (4-point twinkle)
function k17Twinkle(ctx, x, y, t, t0, r = 26) { const d = t - t0; if (d < 0 || d > 0.6) return; const k = Math.sin(Math.PI * d / 0.6); ctx.save(); ctx.translate(x, y); ctx.rotate(d * 3); ctx.scale(k, k); shape(ctx, [[0, -r], [r * 0.22, -r * 0.22], [r, 0], [r * 0.22, r * 0.22], [0, r], [-r * 0.22, r * 0.22], [-r, 0], [-r * 0.22, -r * 0.22]], C.white, { lw: 3.5, seed: 380 }); ctx.restore(); }
// palm over the face (drawn after the person: the Library draws the arms behind the head). P.facePalm 0..1 fades it in on the near eye
function k17FacePalm(ctx, P) { const k = P.facePalm || 0; if (k <= 0) return; const s = (P.s || 1), h = k17L2W(P, 13, -204 + (P.drop || 0)); ctx.save(); ctx.globalAlpha *= K.clamp(k * 1.5); ctx.translate(h[0], h[1]); ctx.rotate(-0.25 * (P.dir || 1)); ctx.scale(s, s);
  shape(ctx, [[-15, 18], [-17, -6], [-14, -24], [-6, -27], [-1, -29], [6, -27], [12, -24], [17, -16], [17, 18]], C.white, { lw: 3.5, seed: 390, dot: C.skin, pitch: 5, rad: 0.3 });
  ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; for (const x of [-7, 1, 9]) { ctx.beginPath(); ctx.moveTo(x, -22); ctx.lineTo(x, -8); ctx.stroke(); } ctx.restore(); }
// paper-white outer keyline behind a red comic word (same transform as the Library sfx), so red reads on the navy night
function k17Keyline(ctx, text, x, y, size, p, o = {}) { const k = K.ease.back(K.clamp(p)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k * (o.sx || 1), k);
  ctx.font = K.font(size, BF, 400); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.2 + 10; ctx.strokeStyle = C.white; ctx.strokeText(text, 0, 0); ctx.restore(); }
