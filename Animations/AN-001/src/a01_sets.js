// ===== AN-001 sets: farmStable (stable cutaway + yard, 1600 wide) and ploughField (1600 wide). Ground y 900. =====
const A01_WW = 1600, A01_VW = 1000, A01_VH = 1230, A01_GR = 900, A01_DUR = 179.25;   // plan: duration 176.25 + end_hold 3.0
const A01_WIN = [440, 400, 120, 140];   // stable window x, y, w, h
const A01_LAMP = [500, 330];
// colours per light preset: day, then tinted copies for dusk, night, dawn
const A01_DAY = { wall: '#efb54a', wallDot: '#b8741a', side: '#c9862a', floor: '#b98a4a', floorDot: '#7a4a1a', thatch: '#f2cc4a', thatchDot: '#b07a1a', yard: '#d9a441', yardDot: '#c0401a',
  house: '#f6e7c4', houseDot: '#d9b98a', hill: '#3f9d4a', hillDot: '#2b7a38', wood: '#a8741a', woodD: '#6e4a12', straw: '#ffd21f', strawD: '#e2701a', field: '#9a5a22' };
const A01_TINT = { day: ['#ffffff', 0], dusk: ['#e2501a', 0.33], night: ['#0d2a9a', 0.72], dawn: ['#ff9a2a', 0.18] };
const a01Pal = (preset) => { const [c, f] = A01_TINT[preset], o = {}; for (const [k, v] of Object.entries(A01_DAY)) o[k] = f ? mixHex(v, c, f) : v; return o; };

// sky for both sets: dayCycle colours across 1600, with our own sun and moon positions (sx0..sx1 = sun path)
function a01Sky(ctx, u, t, o = {}) {
  const d = skyCycle(ctx, u, { w: A01_WW, sun: false, moon: false, hills: false, t });
  const arc = (v) => [K.lerp(o.x0 ?? 1020, o.x1 ?? 1580, v), (o.hor ?? 820) - Math.sin(Math.PI * v) * (o.h ?? 560)];
  const sv = (u + 0.04) / 0.58, mv = (((u - 0.46) % 1) + 1) % 1 / 0.58;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, A01_WW, 900); ctx.clip();
  if (mv >= 0 && mv <= 1) { const m = arc(mv); if (m[1] < 560) moon(ctx, m[0], m[1], 60); }   // v2: no moon sitting on the fence line (review note 10)
  if (o.sun !== false && sv >= 0 && sv <= 1) { const p = o.sunAt || arc(sv); ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(o.sunS || 0.8, o.sunS || 0.8); sun(ctx, 0, 0, t); ctx.restore(); }
  ctx.restore(); return d;
}
// weights of the four presets for a time of day u
function a01Mix(u) { const d = dayCycle(u); return [[d.a, 1], [d.b, d.f]]; }

// ---------- farmStable: baked foreground per preset (sky, window and doorway left transparent) ----------
function a01StableLayer(preset) {
  return bake('a01:stable:' + preset, A01_WW, A01_VH, (x) => {
    const p = a01Pal(preset), GR = A01_GR;
    // far yard: hills, far furrows beyond the fence
    shape(x, [[900, 900], [900, 812], [1000, 790], [1120, 800], [1250, 780], [1400, 800], [1610, 786], [1610, 900]], p.hill, { lw: 6, seed: 101, dot: p.hillDot, pitch: 9, rad: 0.22, da: 0.6 });
    for (const [tx, h] of [[1010, 60], [1180, 74], [1560, 66]]) { x.beginPath(); x.arc(tx, 800 - h, 30, 0, 7); x.fillStyle = mixHex(p.hill, '#14301a', 0.3); x.fill(); x.lineWidth = 5; x.strokeStyle = C.black; x.stroke(); x.fillStyle = p.wood; x.fillRect(tx - 5, 800 - h + 26, 10, h - 24); }
    shape(x, [[960, 900], [960, 836], [1300, 828], [1300, 900]], p.field, { lw: 4, seed: 102, dot: p.woodD, pitch: 7, rad: 0.22, da: 0.5 });
    for (let i = 0; i < 4; i++) BEAST.line(x, [[960, 846 + i * 14], [1300, 840 + i * 14]], 3, p.woodD);
    // yard ground
    shape(x, [[900, GR], [1610, GR], [1610, 1240], [900, 1240]], p.yard, { lw: 7, seed: 103, dot: p.yardDot, pitch: 11, rad: 0.2, da: 0.45 });
    // house facade
    shape(x, [[1290, GR], [1290, 400], [1610, 400], [1610, GR]], p.house, { lw: 7, seed: 104, dot: p.houseDot, pitch: 9, rad: 0.2, da: 0.55 });
    shape(x, [[1276, 400], [1276, 372], [1610, 372], [1610, 400]], p.wood, { lw: 5, seed: 105 });
    for (let bx = 1300; bx < 1600; bx += 44) seg(x, bx, 412, bx, 418, 6, p.woodD, 2);
    shape(x, [[1400, GR], [1400, 720], [1440, 694], [1480, 720], [1480, GR]], '#2a1a10', { lw: 6, seed: 106 });
    shape(x, [[1330, 520], [1376, 520], [1376, 600], [1330, 600], [1330, 520]], NAVY, { lw: 5, seed: 107 }); BEAST.line(x, [[1353, 520], [1353, 600]], 4, p.wood); BEAST.line(x, [[1330, 560], [1376, 560]], 4, p.wood);
    shape(x, [[1494, 760], [1560, 760], [1560, 820], [1494, 820], [1494, 760]], p.wood, { lw: 4, seed: 108 });   // bench box
    // fence
    for (let fx = 990; fx <= 1270; fx += 56) shape(x, [[fx - 7, GR], [fx - 7, 806], [fx, 798], [fx + 7, 806], [fx + 7, GR]], p.wood, { lw: 4, seed: 110 + fx });
    for (const fy of [826, 866]) shape(x, [[984, fy], [1280, fy - 4], [1280, fy + 8], [984, fy + 12]], p.wood, { lw: 4, seed: 120 + fy });
    // stable floor
    shape(x, [[40, GR], [920, GR], [920, 1240], [40, 1240]], p.floor, { lw: 7, seed: 130, dot: p.floorDot, pitch: 10, rad: 0.22, da: 0.5 });
    const r = K.rng(13); for (let i = 0; i < 40; i++) { const sx = 80 + r() * 820, sy = 915 + r() * 280; seg(x, sx, sy, sx + 16 + r() * 10, sy - 4 + r() * 8, 3, p.straw, 1.2); }
    // back wall with the window hole (evenodd)
    x.save(); x.beginPath(); x.rect(60, 250, 840, 650); x.rect(A01_WIN[0], A01_WIN[1], A01_WIN[2], A01_WIN[3]); x.fillStyle = p.wall; x.fill('evenodd');
    x.clip('evenodd'); x.fillStyle = dotPat(x, p.wallDot, 10, 0.24); x.globalAlpha = 0.55; x.fillRect(60, 250, 840, 650); x.globalAlpha = 1;
    for (let i = 0; i < 9; i++) BEAST.line(x, [[60 + i * 100 + 30, 250], [60 + i * 100 + 30, 900]], 3, mixHex(p.wall, '#000000', 0.25));
    x.restore();
    ink(x, [[60, 250], [900, 250], [900, 900], [60, 900], [60, 250]], 7, 131);
    // window frame and sill
    const [wx, wy, ww, wh] = A01_WIN;
    for (const q of [[[wx - 8, wy - 8], [wx + ww + 8, wy - 8], [wx + ww + 8, wy], [wx - 8, wy]], [[wx - 8, wy], [wx, wy], [wx, wy + wh], [wx - 8, wy + wh]], [[wx + ww, wy], [wx + ww + 8, wy], [wx + ww + 8, wy + wh], [wx + ww, wy + wh]]]) shape(x, [...q, q[0]], p.wood, { lw: 4, seed: 132 });
    shape(x, [[wx - 18, wy + wh], [wx + ww + 18, wy + wh], [wx + ww + 14, wy + wh + 16], [wx - 14, wy + wh + 16], [wx - 18, wy + wh]], p.wood, { lw: 5, seed: 133 });
    // side wall and the wall over the doorway
    shape(x, [[40, 240], [90, 250], [90, 900], [40, 900], [40, 240]], p.side, { lw: 6, seed: 134, dot: p.wallDot, pitch: 9, rad: 0.2, da: 0.5 });
    shape(x, [[900, 250], [985, 250], [985, 640], [900, 640], [900, 250]], p.side, { lw: 6, seed: 135, dot: p.wallDot, pitch: 9, rad: 0.2, da: 0.5 });
    // straw: thin straw (bull) and the donkey's straw bed
    shape(x, [[190, 904], [200, 892], [300, 888], [390, 894], [396, 904]], p.straw, { lw: 4, seed: 136, dot: p.strawD, pitch: 6, rad: 0.25, da: 0.4 });
    shape(x, [[604, 904], [620, 884], [660, 872], [720, 868], [780, 874], [806, 890], [812, 904]], p.straw, { lw: 5, seed: 137, dot: p.strawD, pitch: 6, rad: 0.28, da: 0.5 });
    for (let i = 0; i < 14; i++) { const sx = 620 + i * 13, sy = 878 + (i % 3) * 6; seg(x, sx, sy, sx + 10, sy - 14 + (i % 2) * 6, 3, p.straw, 1.5); }
    // the post between the troughs (behind the cast so faces are never covered)
    shape(x, [[490, 900], [490, 640], [510, 640], [510, 900], [490, 900]], p.wood, { lw: 5, seed: 140, dot: p.woodD, pitch: 6, rad: 0.25, da: 0.5 });
    // roof beam and thatch
    shape(x, [[30, 232], [940, 232], [940, 252], [30, 252], [30, 232]], p.wood, { lw: 5, seed: 138 });
    const th = [[0, 236], [0, 150], [60, 120], [880, 120], [1000, 236]]; const sc = []; for (let sx = 1000; sx >= 0; sx -= 40) sc.push([sx, 236 + (Math.round(sx / 40) % 2 ? 14 : 0)]);
    shape(x, [[0, 150], [60, 118], [900, 118], [1000, 236], ...sc, [0, 150]], p.thatch, { lw: 6, seed: 139, dot: p.thatchDot, pitch: 8, rad: 0.25, da: 0.6 });
    for (let i = 0; i < 22; i++) BEAST.line(x, [[40 + i * 42, 128], [30 + i * 42, 226]], 3, p.thatchDot);
    void th;
  });
}
// front pieces of the stable (over the cast): the post between the troughs and the door post
function a01StableFront(ctx, preset) {
  ctx.drawImage(bake('a01:stableFront:' + preset, A01_WW, A01_VH, (x) => { const p = a01Pal(preset);
    shape(x, [[898, 908], [898, 246], [922, 246], [922, 908], [898, 908]], p.wood, { lw: 6, seed: 141, dot: p.woodD, pitch: 6, rad: 0.25, da: 0.5 });
  }), 0, 0, A01_WW, A01_VH);
}
// draw the stable world at time of day u: sky, things behind the window (behind(ctx)), the baked layers cross-faded, the lantern
function a01Stable(ctx, u, t, o = {}) {
  a01Sky(ctx, u, t, { sunS: 0.7 });
  if (o.behind) { ctx.save(); ctx.beginPath(); ctx.rect(A01_WIN[0], A01_WIN[1], A01_WIN[2], A01_WIN[3]); ctx.clip(); o.behind(ctx); ctx.restore(); }
  for (const [pr, w] of a01Mix(u)) if (w > 0.002) { ctx.save(); ctx.globalAlpha *= w; ctx.drawImage(a01StableLayer(pr), 0, 0, A01_WW, A01_VH); ctx.restore(); }
  // lantern: chain from the beam, lamp, light disc when lit
  const lit = o.lit ?? 0, [lx, ly] = A01_LAMP, sw = (o.lampSwing || 0);
  if (lit > 0.01) { ctx.save(); ctx.globalAlpha = 0.42 * lit * (0.94 + 0.06 * Math.sin(t * 7.3) * Math.sin(t * 3.1)); ctx.beginPath(); ctx.arc(lx, ly + 10, 190, 0, 7); ctx.fillStyle = dotPat(ctx, C.yellow, 10, 0.36); ctx.fill(); ctx.globalAlpha *= 0.6; ctx.beginPath(); ctx.arc(lx, ly + 10, 110, 0, 7); ctx.fillStyle = '#fff3a0'; ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(lx, 252); ctx.rotate(sw); ctx.translate(-lx, -252);
  BEAST.line(ctx, [[lx, 252], [lx, ly - 34]], 4, '#3a3a4a');
  shape(ctx, [[lx - 20, ly - 34], [lx + 20, ly - 34], [lx + 26, ly + 22], [lx - 26, ly + 22], [lx - 20, ly - 34]], lit > 0.5 ? '#fff3a0' : '#d6d2e0', { lw: 4.5, seed: 150 });
  if (lit > 0.01) { ctx.save(); ctx.globalAlpha = lit; shape(ctx, [[lx, ly - 18 - 4 * Math.sin(t * 9)], [lx + 8, ly + 2], [lx, ly + 10], [lx - 8, ly + 2], [lx, ly - 18 - 4 * Math.sin(t * 9)]], C.red, { lw: 2.5, seed: 151 }); ctx.restore(); }
  shape(ctx, [[lx - 30, ly - 44], [lx + 30, ly - 44], [lx + 20, ly - 32], [lx - 20, ly - 32], [lx - 30, ly - 44]], '#3a3a4a', { lw: 3.5, seed: 152 });
  shape(ctx, [[lx - 30, ly + 22], [lx + 30, ly + 22], [lx + 26, ly + 32], [lx - 26, ly + 32], [lx - 30, ly + 22]], '#3a3a4a', { lw: 3.5, seed: 153 });
  if (o.smoke > 0) { const k = o.smoke; ctx.save(); ctx.globalAlpha = 0.7 * Math.sin(Math.PI * k); for (let i = 0; i < 3; i++) shape(ctx, ell(lx + Math.sin(k * 8 + i) * 8, ly - 50 - k * 60 - i * 18, 8 + i * 3, 7 + i * 2, 10), '#d6d2e0', { lw: 2.5, seed: 154 + i }); ctx.restore(); }
  ctx.restore();
}
const a01StableFrontMix = (ctx, u) => { for (const [pr, w] of a01Mix(u)) if (w > 0.002) { ctx.save(); ctx.globalAlpha *= w; a01StableFront(ctx, pr); ctx.restore(); } };

// ---------- ploughField ----------
function a01FieldLayer() {
  return bake('a01:field', A01_WW, A01_VH, (x) => {
    for (const ox of [0, 800]) { x.save(); x.translate(ox, 0); hillTrees(x, { seed: 4 + ox / 400 }); x.restore(); }
    // far farm silhouette at x 180 on the horizon
    shape(x, [[110, 900], [110, 836], [180, 806], [250, 836], [250, 900]], '#7a4a1a', { lw: 4, seed: 160 }); shape(x, [[96, 840], [180, 800], [264, 840], [180, 822], [96, 840]], '#c08a1a', { lw: 4, seed: 161 });
    shape(x, [[262, 900], [262, 830], [320, 830], [320, 900]], '#f6e7c4', { lw: 4, seed: 162 });
    // soil
    shape(x, [[-10, 896], [A01_WW + 10, 896], [A01_WW + 10, 1240], [-10, 1240]], '#9a5a22', { lw: 8, seed: 163, dot: '#5b3010', pitch: 11, rad: 0.22, da: 0.5 });
    shape(x, [[-10, 884], [A01_WW + 10, 884], [A01_WW + 10, 904], [-10, 904]], '#3f9d4a', { lw: 5, seed: 164, dot: '#2b7a38', pitch: 8, rad: 0.2 });
  });
}
// rows: number of finished furrow rows (fractional = the current one partly drawn); live: [x0, x1] of the furrow on the ground line
function a01Field(ctx, u, t, o = {}) {
  a01Sky(ctx, u, t, { x0: o.sx0 ?? 100, x1: o.sx1 ?? 1500, hor: 860, h: 640, sunS: o.sunS, sunAt: o.sunAt });
  ctx.drawImage(a01FieldLayer(), 0, 0, A01_WW, A01_VH);
  const rows = o.rows || 0;
  for (let i = 0; i < 5; i++) { const f = K.clamp(rows - i); if (f <= 0) continue; const y = 950 + i * 55, x1 = 40 + f * 1520;
    ctx.save(); ctx.beginPath(); ctx.rect(0, y - 20, x1, 40); ctx.clip();
    const pts = []; for (let sx = 0; sx <= 1600; sx += 32) pts.push([sx, y + (sx / 32 % 2 ? 4 : -2)]);
    shape(ctx, [...pts, [1600, y + 14], [0, y + 14]], '#5b3010', { lw: 4, seed: 170 + i }); BEAST.line(ctx, pts.map(([a, b]) => [a, b - 8]), 4, '#c08a4a'); ctx.restore(); }
  if (o.live) { const [a, b] = o.live; if (Math.abs(b - a) > 2) { shape(ctx, [[Math.min(a, b), 900], [Math.max(a, b), 900], [Math.max(a, b), 912], [Math.min(a, b), 914]], '#5b3010', { lw: 3, seed: 175 }); } }
  // light tint: warm late light / dusk
  const d = dayCycle(u); if (d.warm > 0.01 || d.night > 0.01) { ctx.save(); ctx.globalAlpha = 0.22 * d.warm + 0.4 * d.night; ctx.fillStyle = d.night > d.warm ? NAVY2 : '#e2501a'; ctx.fillRect(0, 0, A01_WW, A01_VH); ctx.restore(); }
}
