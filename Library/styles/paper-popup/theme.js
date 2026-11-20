// ===== Paper Pop-up Book theme (after Lemo-Opuscar style 41, adapted to the 2D Library engine) =====
// Saturated children's-book paper, one dark-brown ink (never black), cut-paper actors with an off-white border, a grey
// cardboard edge and a cut-out shadow; set pieces pop up from the page. Same top-level names as the Halftone theme (contract),
// plus pop-up helpers used only in this style: popCard, bookFold, paperGrain.
// --- palette: page cream, brown ink, children's-book colours (never neon) ---
const C = { paper: '#f4ead5', black: '#4a2c1a', yellow: '#f7c948', red: '#e4572e', blue: '#4a90d9', skin: '#f2b48c', white: '#fffaf0' };
const NAVY = '#2f4b8f', NAVY2 = '#1f3366', WALL = '#d98b5f', WOOD = '#b5743f';
// --- shared colour tones ---
const GREEN = '#6bbf59', GREEN2 = '#9bd770', GREEND = '#3f8f3a', CREAM = '#fff4dc';
const SAND = '#e8b65c', SANDL = '#f5d995', WATERD = '#2f6fb3', SKYDOT = '#8cc8f0', TEAR = '#7fc4ff';
const FOXC = '#ef8a3c', FOXD = '#c2602a';
const MANE = '#d9692c', MANED = '#8a3a14', DEERC = '#d99a52', DEERD = '#a86a2e';
const STONE = '#c4bcae', STONE2 = '#ddd6ca', STONED = '#857c6e', EARTH = '#c27b3e', EARTHD = '#8a5226';
const FUR = '#c98a4a', FURD = '#94602c', FURL = '#f5dcb4', FIGC = '#9a4a9a';
const ELEPH = '#9fb3d1', ELEPHD = '#7187ad';
// --- lettering font: chunky rounded display (comic words, balloons); English subtitles use Fredoka (THEME.subtitle) ---
const BF = 'Lilita One';
// --- fill texture: soft printed stipple (paper ink sits in the fibres), instead of Ben-Day dots ---
function dotPat(ctx, col, pitch, rad) {
  const tile = K.cached(`pp-stip:${col}:${pitch}:${rad}`, () => {
    const n = Math.max(6, Math.round(pitch * 3)), c = K.layer(n, n), x = c.getContext('2d'), r = K.rng(Math.round(pitch * 97 + rad * 1000));
    x.fillStyle = col;
    for (let i = 0; i < 9; i++) { const px = r() * n, py = r() * n, rr = Math.max(0.8, pitch * rad * (0.5 + r() * 0.7)); x.globalAlpha = 0.55 + r() * 0.45; x.beginPath(); x.ellipse(px, py, rr * 1.3, rr, r() * 3, 0, Math.PI * 2); x.fill(); }
    return c;
  });
  return ctx.createPattern(tile, 'repeat');
}
// --- outline: one dark-brown ink, thick, round joins, a slow hand wobble (no taper) ---
function ink(ctx, pts, w = 5, seed = 1, color = C.black) {
  const p = densify(pts, 10), g = nz(seed + 17), q = p.map(([x, y], i) => [x + g.n2(i * 0.11, 2) * w * 0.22, y + g.n2(i * 0.11, 9) * w * 0.22]);
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w * 0.95; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; K.poly(ctx, q); ctx.stroke(); ctx.restore();
}
// --- cut-paper finish for actors: castFinish(ctx, x, y, w, h, draw, o) ---
// Draws the character into a layer, then: a cut-out shadow (offset toward the page), a grey cardboard edge (thickness,
// offset down), a thick off-white border (the silhouette dilated), the art, and paper grain on top. (x, y) = feet point,
// w x h = the area above it (local units). o: { border: 7, edge: 3, shadow: 1 (0 = none), sx: 5, sy: 7 (shadow offset), grain: true }
const PP_LAYERS = {};
function ppLayer(k, W, H) { const L = PP_LAYERS[k]; if (L && L.width === W && L.height === H) return L; return (PP_LAYERS[k] = K.layer(W, H)); }
function castFinish(ctx, x, y, w, h, draw, o = {}) {
  const m = ctx.getTransform(), sc = Math.hypot(m.a, m.b) || 1, cv = ctx.canvas, b = (o.border ?? 7), pad = b + 12;
  const pts = [[x - w / 2 - pad, y - h - pad], [x + w / 2 + pad, y - h - pad], [x - w / 2 - pad, y + pad + 6], [x + w / 2 + pad, y + pad + 6]].map(([u, v]) => [m.a * u + m.c * v + m.e, m.b * u + m.d * v + m.f]);
  let x0 = Math.floor(Math.min(...pts.map((q) => q[0]))), y0 = Math.floor(Math.min(...pts.map((q) => q[1]))), x1 = Math.ceil(Math.max(...pts.map((q) => q[0]))), y1 = Math.ceil(Math.max(...pts.map((q) => q[1]))) + 24;
  x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(cv.width, x1); y1 = Math.min(cv.height, y1); const bw = x1 - x0, bh = y1 - y0;
  if (bw <= 2 || bh <= 2) return;
  const A = ppLayer('art', cv.width, cv.height), a = A.getContext('2d'), B = ppLayer('cut', cv.width, cv.height), bb = B.getContext('2d'), T = ppLayer('tint', cv.width, cv.height), tt = T.getContext('2d');
  for (const g of [a, bb, tt]) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.clearRect(x0, y0, bw, bh); }
  a.save(); a.beginPath(); a.rect(x0, y0, bw, bh); a.clip(); a.setTransform(m); draw(a); a.restore();
  // border: the art's silhouette dilated (two rings x 12 directions), filled off-white
  const bd = b * sc;
  bb.save(); bb.beginPath(); bb.rect(x0, y0, bw, bh); bb.clip();
  for (const r of [bd * 0.5, bd]) for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; bb.drawImage(A, x0, y0, bw, bh, x0 + Math.cos(an) * r, y0 + Math.sin(an) * r, bw, bh); }
  bb.globalCompositeOperation = 'source-in'; bb.fillStyle = o.borderColor || C.white; bb.fillRect(x0, y0, bw, bh);
  bb.globalCompositeOperation = 'source-over'; bb.drawImage(A, x0, y0, bw, bh, x0, y0, bw, bh);
  if (o.grain !== false) { bb.globalCompositeOperation = 'source-atop'; bb.globalAlpha = 0.5; bb.fillStyle = paperGrain(bb); bb.fillRect(x0, y0, bw, bh); bb.globalAlpha = 1; }
  bb.restore();
  const tint = (col) => { tt.globalCompositeOperation = 'copy'; tt.drawImage(B, x0, y0, bw, bh, x0, y0, bw, bh); tt.globalCompositeOperation = 'source-in'; tt.fillStyle = col; tt.fillRect(x0, y0, bw, bh); };
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  if ((o.shadow ?? 1) > 0) { tint('#2a1a0e'); const sx = (o.sx ?? 5) * sc, sy = (o.sy ?? 7) * sc; ctx.globalAlpha = 0.16 * (o.shadow ?? 1); for (const k of [0.6, 1, 1.4]) ctx.drawImage(T, x0, y0, bw, bh, x0 + sx * k, y0 + sy * k, bw, bh); ctx.globalAlpha = 1; }
  tint('#9a8c78'); const ed = (o.edge ?? 3) * sc; for (let k = 1; k <= 3; k++) ctx.drawImage(T, x0, y0, bw, bh, x0, y0 + ed * k / 3, bw, bh);
  ctx.drawImage(B, x0, y0, bw, bh, x0, y0, bw, bh);
  ctx.restore();
}
// paper grain pattern (multiplied fibre speckle), shared by cards, actors and the page
function paperGrain(ctx) {
  const tile = K.cached('pp-grain', () => { const n = 160, c = K.layer(n, n), x = c.getContext('2d'), r = K.rng(71); for (let i = 0; i < 900; i++) { const v = r(); x.fillStyle = v < 0.5 ? 'rgba(120,90,60,0.10)' : 'rgba(255,255,255,0.16)'; x.fillRect(r() * n, r() * n, 1 + r() * 2.2, 0.6 + r() * 0.9); } return c; });
  return ctx.createPattern(tile, 'repeat');
}
// popCard(ctx, t, t0, x, y, w, h, draw, o): a set piece printed on a card that POPS UP from the page around its bottom edge.
// It lies flat until t0 (+ o.delay), springs up with a back() overshoot over o.dur (0.45 s), and folds down from o.out if given.
// Pieces rise back to front: give far pieces the smaller delay. o is also passed to castFinish (border, shadow...).
function popCard(ctx, t, t0, x, y, w, h, draw, o = {}) {
  const t1 = t0 + (o.delay || 0), d = o.dur ?? 0.45;
  let k = t < t1 ? 0 : t < t1 + d ? K.ease.back(K.clamp((t - t1) / d)) : 1;
  if (o.out != null && t > o.out) k *= 1 - K.ease.inOut(K.clamp((t - o.out) / (o.outDur ?? 0.35)));
  if (k <= 0.02) return 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(1, k); ctx.translate(-x, -y);
  castFinish(ctx, x, y, w, h, draw, { ...o, shadow: (o.shadow ?? 1) * K.clamp(k), border: o.border ?? 6 });
  ctx.restore(); return k;
}
// bookFold(ctx, x0, x1, y, o): the crease where the standing backdrop board meets the page (at the ground line):
// a soft shadow just above, a highlight just below, and a fine fold line. o: { depth: 26 }
function bookFold(ctx, x0, x1, y, o = {}) {
  const d = o.depth ?? 26; ctx.save();
  let g = ctx.createLinearGradient(0, y - d, 0, y); g.addColorStop(0, 'rgba(60,35,15,0)'); g.addColorStop(1, 'rgba(60,35,15,0.28)'); ctx.fillStyle = g; ctx.fillRect(x0, y - d, x1 - x0, d);
  g = ctx.createLinearGradient(0, y, 0, y + d * 0.6); g.addColorStop(0, 'rgba(255,248,230,0.35)'); g.addColorStop(1, 'rgba(255,248,230,0)'); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, d * 0.6);
  ctx.strokeStyle = 'rgba(74,44,26,0.45)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore();
}
// --- style settings the shared code reads ---
const THEME = {
  id: 'paper-popup',
  subtitle: { panel: { card: true, fill: C.white, seed: 13 }, ar: C.black, en: '#2f6fb3', enFont: 'Fredoka', enWeight: 600, enSpacing: '0px' },
  page: {},                                    // S.background: the real desk under the lamp
  panel: { book: true },                       // S.box(ctx, 54, 54, 972, 1196, 1, THEME.panel): the open pop-up book around the story
};
