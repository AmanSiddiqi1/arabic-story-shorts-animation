// ===== starter scene: replace with the story. Shows the library way of working: sets from Library/sets, cast from Library/cast,
// acting fields (gaze, lid, sq, tip), motion helpers (walk, footfalls, blink, hop...), word-timed cues, the standard panel + subtitles.
// World: 1000 x 1230, ground at y 900; the panel shows it through a keyed camera.
const WW = 1000, WH = 1230, GR = 900;
// word cues: w(p, n) = start of word n of paragraph p in timing.json. Without a timing.json this demo runs on fixed times.
const HAS_T = TIMING.words.length > 0, WP = HAS_T ? [...new Set(TIMING.words.map((x) => x.p))].map((p) => TIMING.words.filter((x) => x.p === p)) : [];
const w = (p, n, fallback) => (HAS_T ? WP[p][n].a : fallback);
const DUR = HAS_T ? Math.round((TIMING.words[TIMING.words.length - 1].b + 2.9) * 10) / 10 : 9;
const B = (t, a, d) => K.beat(t, a, d, 'lin');
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];

// ---------- set: baked once, drawn every frame ----------
const backL = () => bake('forest', WW, WH, (c) => { sky(c); hillTrees(c); treeRow(c, { hmin: 360 }); ground(c); });
// ---------- cues ----------
const CUE = { enter: w(0, 2, 1.0), stop: w(0, 5, 3.6), see: w(0, 6, 3.9), roar: w(0, 8, 5.2) };
// ---------- the lion walks in: position function -> legs, dust and thuds stay in sync ----------
const LX = (t) => kfn(t, [[CUE.enter, -260], [CUE.stop, 330]]);
const FALLS = footfalls(LX, CUE.enter, CUE.stop + 0.2);
function lionP(t) {
  const P = { y: GR, s: 0.75, dir: 1, ...walk(LX, t), eyes: 'open', gaze: [1, 0.2], lid: blink(t, 2) };
  P.drop = 0; if (t >= CUE.see) { P.gaze = lookAt([P.x + 90, GR - 170], [640, GR - 90]); P.lid = Math.max(0.35, blink(t, 2)); P.mouth = 'smile'; }   // notices the hare, half-lidded
  if (t >= CUE.roar) { P.roar = pulse(t, CUE.roar, 1.4); P.brow = 1; P.sq = anticipate(t, CUE.roar - 0.3, 0.3, 0.06); P.tip = 0.06 * pulse(t, CUE.roar, 1.4); }
  return P;
}
function hareP(t) {
  const P = { x: 640, y: GR, s: 0.8, dir: -1, ears: 1, gaze: [0.6, 0], lid: blink(t, 5) };
  P.y -= Math.abs(kick(t, FALLS, 3, 6, 9));                                            // each footfall makes the small one hop
  if (t >= CUE.enter + 0.8) P.gaze = lookAt([640, GR - 140], [LX(t) + 90, GR - 170]); // watches him come
  if (t >= CUE.see) { P.ears = blend(t, CUE.see, CUE.see + 0.4, 1, -0.6); P.eyes = 'wide'; P.sq = blend(t, CUE.see, CUE.see + 0.3, 1, 0.9); }
  if (t >= CUE.roar) { P.x = 640 + tremble(t, 2); P.mouth = 'o'; P.tip = -0.12; }
  return P;
}
function drawWorld(ctx, t) {
  ctx.drawImage(backL(), 0, 0, WW, WH); sun(ctx, 820, 170, t); cloudFlat(ctx, 200 + ((t * 4) % 1100), 230, 0.8);
  bush(ctx, { x: 820, w: 260, h: 150, seed: 7 });
  lion(ctx, lionP(t)); hare(ctx, hareP(t));
  for (const f of FALLS) for (const lx of f.odd ? [102, -86] : [72, -58]) dustBurst(ctx, f.x + lx * 0.75, GR - 4, t - f.t, 4, 6, 12, 28, 0.5, Math.round(f.t * 10));
}
const CAM = [[0, { x: 500, y: 700, zoom: 1.2 }], [CUE.enter, { x: 500, y: 700, zoom: 1.2 }], [CUE.stop, { x: 480, y: 760, zoom: 1.7 }], [CUE.roar, { x: 470, y: 760, zoom: 1.8 }], [DUR, { x: 470, y: 760, zoom: 1.8 }]];
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: K.clamp(c.x, 500 / z, WW - 500 / z), y: K.clamp(c.y, 615 / z, WH - 615 / z), zoom: z }; };
function overlays(ctx, t, cam, S) {
  if (t < 1.4) S.title(ctx, 'New Story', 500, 1060, B(t, 0.1, 0.8), { size: 64, align: 'center' });
  if (t >= CUE.roar && t < CUE.roar + 1.4) { const [cx, cy] = toPanel(470, 640, cam); ctx.save(); ctx.globalAlpha = K.clamp((CUE.roar + 1.4 - t) / 0.3); S.emphasis(ctx, cx, cy, 160, B(t, CUE.roar, 0.4), { word: 'ROAR!', wx: 0.9, wy: 0.6 }); ctx.restore(); }
  if (t >= DUR - 1.6) S.title(ctx, 'THE END', 500, 190, B(t, DUR - 1.6, 0.8), { size: 80, align: 'center' });
}
const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; const sh = K.spring(t, CUE.roar, 6, 10, 6) + kick(t, FALLS, 1.5, 11, 9);
    S.background(ctx, W, H, t, THEME.page);          // page and panel framing come from the style theme
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, THEME.panel);
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / WW, ph / WH);   // shake the picture only; the caption panel stays still
    const cam = camAt(t); ctx.save(); K.camera(ctx, WW, WH, cam); drawWorld(ctx, t); ctx.restore(); overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);   // always last
  },
  score(k, S) {   // sparse, quiet effects in the gaps; the narration is the soundtrack
    k.bed(S.sfx.bed, 0, DUR, 0.5);
    FALLS.forEach((f) => k.play('thud', f.t, { gain: 0.22 })); k.play('thud', CUE.roar, { gain: 0.6 }); k.play('stamp', CUE.roar + 0.05, { gain: 0.4 });
    k.play('stamp', DUR - 1.6, { gain: 0.6 }); k.play('chime', DUR - 1.4, { note: 'C6', gain: 0.7 });
  },
};
window.SCENE = SCENE;
