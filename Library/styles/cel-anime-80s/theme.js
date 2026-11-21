// ===== 80s Cel Anime theme (after Lemo-Opuscar's 80s Cel Anime, adapted to the 2D Library engine) =====
// Flat few-colour cels with COLOURED outlines (dark purple, never black), hard-edged shade, saturated hues over airbrushed
// painted backgrounds, played back on a CRT. Same top-level names as the Halftone theme (contract), plus celShade and
// rimLight used only in this style.
// --- palette (daylight colour model); C.black is the line colour: a dark purple ---
const C = { paper: '#f3e7d3', black: '#2b1a3a', yellow: '#ffcf3a', red: '#e8364f', blue: '#2f6fe0', skin: '#f7c6a3', white: '#fff6ea' };
const NAVY = '#1b1d4a', NAVY2 = '#0f1030', WALL = '#3a2f6b', WOOD = '#8a5a3a';
// --- shared colour tones (cel-flat, saturated) ---
const GREEN = '#3fae6a', GREEN2 = '#7fd67a', GREEND = '#23704a', CREAM = '#ffefd0';
const SAND = '#e2a45a', SANDL = '#f3c98a', WATERD = '#1d3f9a', SKYDOT = '#5a7fe8', TEAR = '#8fd0ff';
const FOXC = '#f07a2a', FOXD = '#b5501a';
const MANE = '#c8481a', MANED = '#6a1e10', DEERC = '#c98a3a', DEERD = '#8a5420';
const STONE = '#a9a2c6', STONE2 = '#cbc6e2', STONED = '#5d5a86', EARTH = '#a8602a', EARTHD = '#6a3a1a';
const FUR = '#b9722a', FURD = '#7a4416', FURL = '#f2d2a0', FIGC = '#7a2a7a';
const ELEPH = '#8aa2c8', ELEPHD = '#5a6fa0';
// --- lettering: semi-condensed sans (comic words, labels, English subtitles); chrome titles use its 800 italic ---
const BF = 'Barlow Semi Condensed';
// --- fill texture: a cel has no texture; "dot" shading becomes a flat hard shade tone of the given colour ---
function dotPat(ctx, col, pitch, rad) {
  const tile = K.cached(`cel-flat:${col}`, () => { const c = K.layer(4, 4), x = c.getContext('2d'); x.fillStyle = col; x.fillRect(0, 0, 4, 4); return c; });
  return ctx.createPattern(tile, 'repeat');
}
// --- outline: a thin, even, coloured line (cel trace), round joins ---
function ink(ctx, pts, w = 5, seed = 1, color = C.black) {
  const p = densify(pts, 14);
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = Math.max(1.6, w * 0.55); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; K.poly(ctx, p); ctx.stroke(); ctx.restore();
}
// --- character finish: castFinish(ctx, x, y, w, h, draw, o): the cel, plus an optional hard rim light from the light side ---
// o: { rim: '#ff7ad9' (neon rim colour, off by default), light: [-1, -1] (direction toward the light), rimW: 3 }
const CEL_LAYERS = {};
function celLayer(k, W, H) { const L = CEL_LAYERS[k]; if (L && L.width === W && L.height === H) return L; return (CEL_LAYERS[k] = K.layer(W, H)); }
function castFinish(ctx, x, y, w, h, draw, o = {}) {
  if (!o.rim) { draw(ctx); return; }
  const m = ctx.getTransform(), sc = Math.hypot(m.a, m.b) || 1, cv = ctx.canvas, pad = 20;
  const pts = [[x - w / 2 - pad, y - h - pad], [x + w / 2 + pad, y - h - pad], [x - w / 2 - pad, y + pad], [x + w / 2 + pad, y + pad]].map(([u, v]) => [m.a * u + m.c * v + m.e, m.b * u + m.d * v + m.f]);
  const x0 = Math.max(0, Math.floor(Math.min(...pts.map((q) => q[0])))), y0 = Math.max(0, Math.floor(Math.min(...pts.map((q) => q[1])))), x1 = Math.min(cv.width, Math.ceil(Math.max(...pts.map((q) => q[0])))), y1 = Math.min(cv.height, Math.ceil(Math.max(...pts.map((q) => q[1])))), bw = x1 - x0, bh = y1 - y0;
  if (bw <= 2 || bh <= 2) return;
  const A = celLayer('art', cv.width, cv.height), a = A.getContext('2d'), R = celLayer('rim', cv.width, cv.height), r = R.getContext('2d');
  for (const g of [a, r]) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(x0, y0, bw, bh); }
  a.save(); a.beginPath(); a.rect(x0, y0, bw, bh); a.clip(); a.setTransform(m); draw(a); a.restore();
  const [lx, ly] = o.light || [-1, -1], d = (o.rimW ?? 3) * sc, l = Math.hypot(lx, ly) || 1;
  r.drawImage(A, x0, y0, bw, bh, x0, y0, bw, bh); r.globalCompositeOperation = 'destination-out'; r.drawImage(A, x0, y0, bw, bh, x0 - lx / l * d, y0 - ly / l * d, bw, bh);
  r.globalCompositeOperation = 'source-in'; r.fillStyle = o.rim; r.fillRect(x0, y0, bw, bh);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(A, x0, y0, bw, bh, x0, y0, bw, bh); ctx.globalAlpha = o.rimAlpha ?? 0.9; ctx.drawImage(R, x0, y0, bw, bh, x0, y0, bw, bh); ctx.restore();
}
// celShade(ctx, pts, fill, shade, o): a cel shape the 80s way: flat fill, a HARD shadow crescent (the shape minus itself
// shifted toward the light), optional hard highlight, then the coloured outline. o: { light: [-1, -1], off: 10, hi: '#fff', lw: 4 }
function celShade(ctx, pts, fill, shade, o = {}) {
  const [lx, ly] = o.light || [-1, -1], l = Math.hypot(lx, ly) || 1, off = o.off ?? 10, dx = lx / l * off, dy = ly / l * off;
  ctx.save(); K.poly(ctx, pts, true); ctx.fillStyle = fill; ctx.fill(); ctx.clip();
  // the crescent = (everything minus the shape shifted by (sx, sy)) inside the clip. Build the path by hand: K.poly starts a new
  // path, which would drop the big rect and fill the whole shifted shape (fixed 2026-11-21).
  const crescent = (sx, sy) => { ctx.beginPath(); ctx.rect(-1e4, -1e4, 2e4, 2e4); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x + sx, y + sy) : ctx.moveTo(x + sx, y + sy))); ctx.closePath(); };
  crescent(dx, dy); ctx.fillStyle = shade; ctx.fill('evenodd');
  if (o.hi) { crescent(-dx * 0.6, -dy * 0.6); ctx.fillStyle = o.hi; ctx.globalAlpha = 0.85; ctx.fill('evenodd'); }
  ctx.restore();
  if (o.lw !== 0) ink(ctx, pts, o.lw || 4, o.seed || 1, o.line || C.black);
}
// --- style settings the shared code reads ---
const THEME = {
  id: 'cel-anime-80s',
  subtitle: { panel: { tape: true, seed: 13 }, ar: '#2b1a3a', en: '#2f63d6', enFont: 'Barlow Semi Condensed', enWeight: 600, enSpacing: '0.5px' },   // light caption strip
  page: {},                                    // S.background: the cream TV housing ({ dark: true }: the charcoal set)
  panel: { screen: true },                     // S.box(ctx, 54, 54, 972, 1196, 1, THEME.panel): the picture tube around the story
  celFps: 12,                                  // characters on twos: pose them with celStep(t, THEME.celFps)
};
