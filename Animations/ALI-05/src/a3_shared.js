// ===== ALI-04: the ALI-03 scene helpers this film needs (copied from ALI-03 a3_shared.js unchanged: street world, cat, puffs, glyphs,
// picture balloons, the arch entrance, the big hand, wall background), plus the night rim finishes from ALI-03 a3_s3.js.

const a3Cam = (keys, e = 'inOut') => (t) => K.camAt(keys, t, e);
const a3Pos = (keys, e = 'inOut') => (u) => kfn(u, keys, e);
const a3Flow = (keys) => (u) => flow(u, keys);
const A3_NSH = '#22204a';   // ground shadow colour at night

// ---------- the street world ----------
const A3_BODIES = {
  day: (c) => tsSun(c, 1700, 160), afternoon: (c) => tsSun(c, 1760, 330, 1, '#fff0a8'), evening: (c) => tsSun(c, 260, 560, 1, '#ffd890'),
  night: (c) => tsMoon(c, 1350, 230), night2: (c) => tsMoon(c, 700, 260, 1, 60),
};
// o: {m, m2, k (plate cross-fade), bodies(c, t), flock: [x0, y0, v, n, seed, t0], doors: [{i, open, lit, inside}], gate, gateIn, win {...},
//     washing {...} | null, lan (lantern k), marks {...}}
function a3Street(ctx, t, cam, o = {}) {
  const m = o.m || 'day', mm = o.m2 && (o.k || 0) > 0.5 ? o.m2 : m, night = TS_MODEL[mm].night >= 1;
  tsPlates(ctx, cam, m, o.m2, o.k || 0, (c) => { (o.bodies || A3_BODIES[m])(c, t); if (o.flock) { const [x0, y0, v, n, sd, t0] = o.flock; if (t > (t0 || 0)) abFlock(c, t - (t0 || 0), x0, y0, v, n, sd, 0.42); } });
  for (const d of o.doors || []) a3Door(ctx, tsDoor(d.i), d.open || 0, mm, { lit: d.lit || 0, inside: d.inside });
  a3Gate(ctx, o.gate || 0, mm, { inside: o.gateIn });
  a3Window(ctx, t, mm, { sh: night ? 0 : 1, ...(o.win || {}) });
  if (o.washing) tsWashing(ctx, t, mm, o.washing); else if (o.washing !== null && night) tsWashing(ctx, t, mm, { empty: true });
  if (o.lan) tsLanterns(ctx, t, o.lan);
  if (o.underCast) o.underCast(ctx);
  tsMarks(ctx, t, { glow: night ? 0.45 : 0.25, ...(o.marks || {}) });
}
const a3StreetUnder = () => null;

// ---------- the cat on the roofs (Library cat pal 2, s 0.55): the silent witness ----------
// P: {x, y, dir, sit, crouch, gaze, lid ...}; tail and ears always alive
function a3Cat(ctx, t, P) { const tc = AB_T2(t); a3Shadow(ctx, P.x, P.y + 2, 60, 0, 'rgba(43,26,58,0.6)');
  cat(ctx, { s: 0.55, pal: 2, sit: 1, tailCurl: 0.6 + 0.3 * osc(tc, 2.3), ears: 0.4 + idleSway(tc, 91, 0.25, 1.7), lid: abLid(t, 93), tip: idleSway(tc, 92, 0.02, 3), ...P }); }

// ---------- small effects ----------
// chalk dust puffs (white), u 0..1 life
function a3Puff(ctx, x, y, u, n = 5, r = 9, col = '#fffaf2') { if (u <= 0 || u >= 1) return; const R = K.rng(Math.round(x * 7 + y)); ctx.save(); ctx.globalAlpha *= (1 - u) * 0.85; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const a = R() * 6.28, d = 6 + 30 * K.ease.out(u) * (0.5 + R()); ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7 - 10 * u, r * (0.6 + R() * 0.6) * (1 + u), 0, 7); ctx.fill(); } ctx.restore(); }
// a question-mark glyph tag over a head (panel or world), pops and droops
function a3Q(ctx, S, x, y, t, a, b, o = {}) { if (t < a || t > b + 0.25) return; const dr = o.droop != null ? o.droop : 0; ctx.save(); if (t > b) ctx.globalAlpha *= 1 - K.clamp((t - b) / 0.25);
  const pop = 1 + 0.25 * Math.max(0, 1 - (t - a) / 0.2); ctx.translate(x, y + dr * 14); ctx.rotate(dr * 0.3); ctx.scale(pop, pop); S.label(ctx, '?', 0, 0, K.clamp((t - a) / 0.3), { size: o.size || 46, color: o.col || '#ffd36a' }); ctx.restore(); }
// a picture balloon (panel units): dark rounded box with the style's cyan rule and a tail to [tx, ty]; draw(ctx) inside (clipped)
function a3PicBalloon(ctx, x, y, w, h, to, p, draw) { if (p <= 0) return; const k = K.ease.back(K.clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y);
  ctx.fillStyle = 'rgba(14,10,24,0.9)'; ctx.beginPath(); ctx.moveTo(x - 30, y + h / 2 - 4); ctx.lineTo(to[0], to[1]); ctx.lineTo(x + 30, y + h / 2 - 4); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 40); ctx.fill(); ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 4; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2 + 8, y - h / 2 + 8, w - 16, h - 16, 34); ctx.clip(); draw(ctx); ctx.restore(); ctx.restore(); }
// little cel pictograms for picture balloons (panel units): a door icon, a cloaked sneaking figure
function a3DoorIcon(ctx, x, y, col, o = {}) { const pts = townArchPts(x - 35, x + 35, y - 55, y + 55, 'pointed'); celShade(ctx, pts, col, abDark(col, 0.3), { light: [-1, -1], off: 6, lw: 3, line: abDark(col, 0.6) });
  if (o.cross) doorMark(ctx, x + 52, y + 8, { kind: 'x', s: 0.75, glow: o.glow || 0.5 }); if (o.dot) doorMark(ctx, x, y + 4, { kind: 'dot', s: 0.9 }); if (o.tick) { ctx.save(); ctx.strokeStyle = '#7fe0a0'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.globalAlpha *= o.tick; ctx.beginPath(); ctx.moveTo(x - 14, y - 78); ctx.lineTo(x - 2, y - 66); ctx.lineTo(x + 20, y - 92); ctx.stroke(); ctx.restore(); } }
function a3Sneaker(ctx, x, y, s, ph, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const lift = Math.abs(Math.sin(ph)) * 8;
  seg(ctx, -8, -40, -18 + 10 * Math.sin(ph), 0 - lift, 9, '#3a2a4a', 0); seg(ctx, 8, -40, 16 - 10 * Math.sin(ph), 0, 9, '#3a2a4a', 0);
  celShade(ctx, [[-26, -40], [26, -40], [34, -120], [10, -150], [-24, -140], [-40, -100]], o.col || '#6a5a8a', abDark(o.col || '#6a5a8a', 0.3), { light: [-1, -1], off: 6, lw: 3 });
  celShade(ctx, ell(4, -158, 22, 22, 16), '#3a3446', '#241e30', { off: 5, lw: 3 }); ctx.fillStyle = '#fffaf0'; ctx.fillRect(4, -164, 14, 6);
  if (o.q) { ctx.font = `800 54px "${BF}"`; ctx.fillStyle = '#ffd36a'; ctx.textAlign = 'center'; ctx.fillText('?', 4, -190); } ctx.restore(); }

// ---------- the arch entrance: figures come out of the dark passage (x < 150) ----------
function a3ArchFig(ctx, x, y, draw, w = 320) { const u = K.clamp((x + 40) / 110); if (u <= 0.02) return; if (u >= 0.99) { draw(ctx); return; }
  abCel(ctx, [x, y, w, 330], (c) => draw(c), { tint: '#1e1830', k: 0.9 * (1 - u), alpha: K.clamp(u * 2.2) }); }

// ---------- the big hand for inserts (ALI-01 abHandCel with a sleeve colour): o {sleeve, sleeveD, curl, chalk, white, brush, ring} ----------
function a3BigHand(ctx, x, y, k, o = {}) {
  const F = AB_FACE.ali, celShade = abCS, sd = o.sd || 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k * sd, k);
  celShade(ctx, [[-62, -320], [62, -320], [66, -40], [-66, -40]], o.sleeve || '#8e4a8e', o.sleeveD || '#6a3270', { light: [-1, -0.3], off: 22, lw: 4, line: abDark(o.sleeveD || '#6a3270', 0.5) });
  celShade(ctx, [[-56, -50], [56, -50], [66, 20], [50, 70], [-50, 70], [-66, 20]], o.skin || F.skin, F.shade, { light: [-1, -0.4], off: 18, lw: 4, line: F.line });
  const curl = o.curl ?? 0; for (let i = 0; i < 4; i++) { const fx = -42 + i * 28, ci = i === 0 && o.point ? 0 : curl, len = (i === 0 || i === 3 ? 70 : 88) * (1 - 0.62 * ci), bend = ci * 0.9;
    const pts = [[fx - 13, 60], [fx + 13, 60], [fx + 12 - bend * 20, 60 + len], [fx - bend * 30, 60 + len + 12], [fx - 12 - bend * 24, 60 + len]];
    celShade(ctx, pts, o.skin || F.skin, F.shade, { light: [-1, -0.4], off: 8, lw: 3.5, line: F.line });
    if (o.white && i < 2) { ctx.save(); ctx.globalAlpha = o.white; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(fx - bend * 22, 60 + len + 2, 13, 12, 0, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.ring && i === 2) silverRing(ctx, fx - bend * 8, 60 + len * 0.35, 20, { glint: o.ring.glint || 0, rot: 0.05 }); }
  celShade(ctx, [[60, 0], [96, 30], [104, 70], [80, 76], [56, 40]], o.skin || F.skin, F.shade, { light: [-1, -0.4], off: 8, lw: 3.5, line: F.line });
  if (o.chalk) { ctx.save(); ctx.translate(-30, 150); ctx.rotate(0.3); celShade(ctx, K.rectPts(-14, -10, 28, 90), '#fffaf2', '#d8d0e0', { off: 5, lw: 3, line: '#8a80a0' }); ctx.restore(); }
  if (o.brush) { ctx.save(); ctx.translate(-20, 120); ctx.rotate(0.15); seg(ctx, 0, -60, 0, 160, 18, '#c8a070', 3); celShade(ctx, [[-14, 160], [14, 160], [10, 210], [0, 226], [-10, 210]], '#e8202a', '#a01018', { off: 4, lw: 3 }); ctx.restore(); }
  ctx.restore();
}
// a wall / wood texture background for inserts (panel units)
function a3WallBg(ctx, col, o = {}) { abGrad(ctx, 0, 0, 1000, 1230, [[0, abLight(col, 0.1)], [1, abDark(col, 0.12)]]); const R = K.rng(o.seed || 5); ctx.save(); ctx.filter = 'blur(3px)';
  for (let i = 0; i < 26; i++) { ctx.fillStyle = K.rgba(abDark(col, 0.2), 0.3); ctx.beginPath(); ctx.ellipse(R() * 1000, R() * 1230, 40 + R() * 90, 14 + R() * 30, R(), 0, 7); ctx.fill(); } ctx.restore(); }
function a3WoodBg(ctx, col) { ctx.fillStyle = col; ctx.fillRect(0, 0, 1000, 1230); for (let k = 0; k < 6; k++) { const x = k * 180 - 20; celShade(ctx, K.rectPts(x, -20, 176, 1270), k % 2 ? col : abLight(col, 0.06), abDark(col, 0.25), { light: [-1, 0], off: 18, lw: 4, line: abDark(col, 0.6) });
  ctx.save(); ctx.strokeStyle = K.rgba(abDark(col, 0.4), 0.5); ctx.lineWidth = 3; for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.moveTo(x + 30 + j * 26, 0); ctx.bezierCurveTo(x + 40 + j * 26, 400, x + 20 + j * 26, 800, x + 34 + j * 26, 1230); ctx.stroke(); } ctx.restore(); } }

const A3_N = 'night', A3_NRIM = { rim: '#bfe0ff', light: [1, -1], rimW: 3 }, A3_WRIM = { rim: '#ffc070', light: [-1, -0.4], rimW: 3.5 };
