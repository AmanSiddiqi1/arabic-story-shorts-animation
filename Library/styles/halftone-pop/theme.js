// ===== Halftone Pop Panel theme: the look every Library drawing takes (palette, lettering font, fill texture, outline brush) =====
// Loaded first, before core/helpers.js. Every style profile's theme.js defines the same top-level names (checked by tests/regression.mjs).
// This is the Halftone code exactly as it was in core/helpers.js and palette.js, so the finished films render identically.
// --- style palette (process colours of the comic panel); C.black is the outline ink ---
const C = { paper: '#fbf2da', black: '#141414', yellow: '#ffd21f', red: '#e2231a', blue: '#1d5bd0', skin: '#f05a5a', white: '#fffaf0' };
const NAVY = '#16337f', NAVY2 = '#0d2260', WALL = '#1a3b8c', WOOD = '#a8741a';
// --- shared colour tones (greens, sand, water, animal colours) ---
const GREEN = '#3f9d4a', GREEN2 = '#6cc35a', GREEND = '#2b7a38', CREAM = '#fff3d6';
const SAND = '#d9a441', SANDL = '#f2d27a', WATERD = '#17409a', SKYDOT = '#3f7be6', TEAR = '#5fa0ff';
const FOXC = '#e8742a', FOXD = '#b5501a';
const MANE = '#c8481a', MANED = '#7a2408', DEERC = '#c98a3a', DEERD = '#9a6420';
const STONE = '#b9b4c6', STONE2 = '#d6d2e0', STONED = '#6f6a86', EARTH = '#b0692a', EARTHD = '#7a4212';
const FUR = '#b9722a', FURD = '#8a501a', FURL = '#f2d2a0', FIGC = '#7a2a7a';
const ELEPH = '#8aa2c8', ELEPHD = '#5f78a6';
// --- lettering font (comic words, balloons, English subtitles); the Arabic font comes from the story's arabicFont ---
const BF = 'Bangers';
// --- fill texture: Ben-Day dots (shape(..., { dot }) and many drawings fill with this pattern) ---
function dotPat(ctx, col, pitch, rad) {
  const tile = K.cached(`sc-dots:${col}:${pitch}:${rad}`, () => {
    const n = Math.max(3, Math.round(pitch)), c = K.layer(n * 2, n * 2), x = c.getContext('2d');
    x.fillStyle = col;
    for (const [cx, cy] of [[0, 0], [n * 2, 0], [0, n * 2], [n * 2, n * 2], [n, n]]) { x.beginPath(); x.arc(cx, cy, n * rad, 0, Math.PI * 2); x.fill(); }
    return c;
  });
  return ctx.createPattern(tile, 'repeat');
}
// closed brush outline (same swelling line as the style's own border), pts = closed polyline
function ink(ctx, pts, w = 5, seed = 1, color = C.black) {
  const p = densify(pts, 12), g = nz(seed), L = [], R = []; let acc = 0;
  for (let i = 0; i < p.length; i++) {
    if (i) acc += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
    const a = p[Math.max(0, i - 1)], b = p[Math.min(p.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, hw = 0.5 * w * (0.82 + 0.3 * g.n2(acc * 0.012, 3));
    L.push([p[i][0] - dy / l * hw, p[i][1] + dx / l * hw]); R.push([p[i][0] + dy / l * hw, p[i][1] - dx / l * hw]);
  }
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); L.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]));
  for (let i = R.length - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
  ctx.closePath(); ctx.fill(); ctx.lineWidth = w * 0.7; ctx.strokeStyle = color; ctx.lineJoin = 'round'; K.poly(ctx, p); ctx.stroke(); ctx.restore();
}
// --- character finish: castFinish(ctx, x, y, w, h, draw) draws a character (or a group) through the style's finish.
// (x, y) = the feet / ground point, w x h = the area above it the drawing fits in. Halftone: drawn as it is.
// Other styles: a cut-paper border, a rim light... Scenes in any style call it the same way: castFinish(ctx, P.x, P.y, 300, 360, (c) => lion(c, P)).
function castFinish(ctx, x, y, w, h, draw, o = {}) { draw(ctx); }
// --- style settings the shared code reads (subtitle panel; page and story panel framing for new scenes) ---
const THEME = {
  id: 'halftone-pop',
  subtitle: { panel: { fill: C.white, lw: 9, seed: 13 }, ar: C.black, en: C.blue, enFont: BF, enWeight: 400, enSpacing: '1px' },
  page: { dot: C.blue },                       // S.background(ctx, W, H, t, THEME.page)
  panel: { fill: C.blue, lw: 11, seed: 3 },    // S.box(ctx, 54, 54, 972, 1196, 1, THEME.panel): the story panel frame
};
