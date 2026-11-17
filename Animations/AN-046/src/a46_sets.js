// ===== AN-046 sets: garden (1000 wide), summit (rockyHill top terrace, 1000 wide), glade (1600 wide). Ground y 900. =====
// Skies are live (skyCycle); everything static is baked once without a sky.
const A46_ROCK = '#b9b4c6', A46_ROCKD = '#6f6a86', A46_ROCKL = '#d6d2e0';

// ---------- garden ----------
const A46_PERCH = [292, 600];   // tip of the Library larkLeft branch (measured: branch top y 598..612 near x 300)
const a46GardenL = () => bake('a46garden', 1000, 1230, (c) => { hillTrees(c, { seed: 6 }); ground(c); tree(c, TREE.larkLeft.x, 900, TREE.larkLeft); bush(c, { x: 860, w: 240, h: 130, seed: 4 }); bush(c, { x: 150, w: 220, h: 110, seed: 9 }); });
function a46garden(ctx, t, u) { skyCycle(ctx, u, { t, hills: true }); cloudFlat(ctx, 620 + ((t * 6) % 600), 200, 0.7); ctx.drawImage(a46GardenL(), 0, 0, 1000, 1230); }

// ---------- summit (rockyHill top terrace) ----------
const A46_THRONE = { x0: 720, x1: 900, top: 790, back: 600 }, A46_POST = { x: 540, top: 800 }, A46_LEDGE = { x0: 40, x1: 300, top: 810 };
function a46peaks(c, y0, s, col) { for (const [px, h, w] of [[120, 250, 300], [380, 200, 260], [640, 290, 330], [900, 230, 280]]) { const base = y0; shape(c, [[px - w / 2, base], [px, base - h * s], [px + w / 2, base]], col, { lw: 6, seed: 200 + px }); shape(c, [[px - w * 0.12, base - h * s * 0.76], [px, base - h * s], [px + w * 0.12, base - h * s * 0.76], [px + w * 0.04, base - h * s * 0.7], [px - w * 0.03, base - h * s * 0.78]], C.white, { lw: 4, seed: 210 + px }); } }
const a46SummitBack = () => bake('a46summitB', 1000, 1230, (c) => {
  a46peaks(c, 1235, 1, '#7d8bb8');
  for (const [x, y, s] of [[120, 1050, 1.2], [420, 1110, 1.5], [760, 1060, 1.3], [980, 1140, 1.4], [260, 1180, 1.6]]) cloudFlat(c, x, y, s);
});
const a46SummitL = () => bake('a46summitF', 1000, 1230, (c) => {
  // terrace slab: floor top y 900, front face down to ~990, cliff below
  shape(c, [[-20, 892], [1020, 892], [1020, 930], [960, 975], [820, 1000], [640, 985], [470, 1010], [300, 990], [140, 1004], [-20, 980]], A46_ROCK, { lw: 8, seed: 220, dot: A46_ROCKD, pitch: 10, rad: 0.22, da: 0.5 });
  shape(c, [[-20, 892], [1020, 892], [1020, 912], [-20, 912]], A46_ROCKL, { lw: 6, seed: 221 });
  for (let i = 0; i < 9; i++) seg(c, 60 + i * 110, 930 + (i % 3) * 14, 90 + i * 110, 960 + (i % 2) * 10, 4, A46_ROCKD, 0);
  // low ledge at the left
  shape(c, [[A46_LEDGE.x0 - 20, 902], [A46_LEDGE.x0, A46_LEDGE.top + 6], [A46_LEDGE.x0 + 30, A46_LEDGE.top], [A46_LEDGE.x1 - 20, A46_LEDGE.top + 4], [A46_LEDGE.x1 + 10, 902]], A46_ROCK, { lw: 6, seed: 222, dot: A46_ROCKD, pitch: 10, rad: 0.2, da: 0.5 });
  // throne rock: tall back slab and flat seat top
  const T = A46_THRONE;
  shape(c, [[T.x0 + 40, T.top + 4], [T.x0 + 52, T.back + 30], [T.x0 + 90, T.back], [T.x1 - 30, T.back + 10], [T.x1 - 6, T.back + 60], [T.x1, T.top + 4]], A46_ROCKD, { lw: 7, seed: 223, dot: '#4a4566', pitch: 10, rad: 0.2, da: 0.5 });
  shape(c, [[T.x0, 902], [T.x0 + 8, T.top + 6], [T.x0 + 24, T.top], [T.x1 - 10, T.top], [T.x1, T.top + 10], [T.x1 + 12, 902]], A46_ROCK, { lw: 7, seed: 224, dot: A46_ROCKD, pitch: 10, rad: 0.2, da: 0.5 });
  shape(c, [[T.x0 + 24, T.top], [T.x1 - 10, T.top], [T.x1 - 14, T.top + 12], [T.x0 + 28, T.top + 12]], C.red, { lw: 4, seed: 225, dot: '#a8160f', pitch: 6, rad: 0.25, da: 0.5 });   // a red cloth on the seat
  // stone post
  shape(c, [[A46_POST.x - 34, 904], [A46_POST.x - 28, A46_POST.top + 6], [A46_POST.x - 18, A46_POST.top], [A46_POST.x + 20, A46_POST.top + 2], [A46_POST.x + 30, A46_POST.top + 8], [A46_POST.x + 34, 904]], A46_ROCKL, { lw: 6, seed: 226, dot: A46_ROCKD, pitch: 9, rad: 0.2, da: 0.4 });
  for (const [x, r] of [[330, 14], [460, 10], [650, 12], [960, 16]]) shape(c, ell(x, 896, r * 1.5, r * 0.7, 12), A46_ROCKD, { lw: 4, seed: 230 + x });
});
function a46summit(ctx, t, u) {
  skyCycle(ctx, u, { t, hills: false });
  ctx.drawImage(a46SummitBack(), 0, 0, 1000, 1230);
  cloudFlat(ctx, ((t * 9) % 1300) - 150, 1020, 1.1);
  ctx.drawImage(a46SummitL(), 0, 0, 1000, 1230);
}

// ---------- glade (1600 wide) ----------
const A46_NEST = [300, 592], A46_LOOK = [418, 470], A46_NETX = 760, A46_BUSH = 1120, A46_FAR = 1460, A46_MTN = [1250, 880];
const A46_GTREE = { w: 74, top: 400, crowns: [[200, 330, 125], [340, 380, 80], [80, 410, 80], [260, 230, 85], [130, 260, 70]], branch: null };
const a46GladeL = () => bake('a46glade', 1600, 1230, (c) => {
  // far mountain (the summit seen from far away) behind the hill trees
  shape(c, [[A46_MTN[0] - 150, 884], [A46_MTN[0] - 40, 680], [A46_MTN[0] + 40, 680], [A46_MTN[0] + 150, 884]], '#7d8bb8', { lw: 5, seed: 240 });
  shape(c, [[A46_MTN[0] - 40, 680], [A46_MTN[0] + 40, 680], [A46_MTN[0] + 52, 702], [A46_MTN[0] - 52, 702]], C.white, { lw: 3, seed: 241 });
  hillTrees(c, { seed: 5, n: 7 }); c.save(); c.translate(980, 0); hillTrees(c, { seed: 11, n: 7 }); c.restore();
  ground(c, { w: 1600 });
  // nest tree: trunk at x 220, a fork branch for the nest and a bare lookout branch
  tree(c, 183, 900, A46_GTREE);
  shape(c, [[236, 640], [328, 596], [338, 610], [250, 664]], WOOD, { lw: 6, seed: 242, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  shape(c, [[240, 540], [A46_LOOK[0] + 14, A46_LOOK[1] - 2], [A46_LOOK[0] + 16, A46_LOOK[1] + 10], [252, 568]], WOOD, { lw: 6, seed: 243, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  // far berry bush
  bush(c, { x: A46_FAR, w: 200, h: 120, seed: 12 });
  const r = K.rng(31); for (let i = 0; i < 14; i++) shape(c, ell(A46_FAR - 80 + r() * 160, 800 + r() * 70, 7, 7, 10), C.red, { lw: 2.5, seed: 250 + i });
  for (let i = 0; i < 6; i++) { const gx = 520 + i * 70 + r() * 30; seg(c, gx, 900, gx - 6, 872, 5, GREEN2, 2); seg(c, gx, 900, gx + 8, 876, 5, GREEN2, 2); }
});
// the hiding bush (drawn after whoever hides behind it)
const a46HideBush = () => bake('a46bush', 1600, 1230, (c) => bush(c, { x: A46_BUSH, w: 270, h: 150, seed: 7 }));
function a46glade(ctx, t, u, o = {}) {
  ctx.fillStyle = '#d9a441'; ctx.fillRect(-600, 1225, 2800, 900);   // ground skirt for wide pull-outs
  ctx.save(); ctx.fillStyle = dayCycle(u).a === 'night' ? NAVY2 : C.blue; ctx.fillRect(-600, -900, 2800, 905); ctx.restore();
  skyCycle(ctx, u, { t, w: 1600, hills: true });
  if (o.clouds !== false) cloudFlat(ctx, 300 + ((t * 5) % 1400), 190, 0.75);
  ctx.drawImage(a46GladeL(), 0, 0, 1600, 1230);
}
const a46bushFront = (ctx) => ctx.drawImage(a46HideBush(), 0, 0, 1600, 1230);
// nest in the fork: o.front draws only the front rim (after the bird inside)
function a46nest(ctx, rock = 0, front = false) {
  if (!front) { nestDraw(ctx, A46_NEST[0], A46_NEST[1], { eggs: 0, rock }); return; }
  ctx.save(); ctx.beginPath(); ctx.rect(A46_NEST[0] - 80, A46_NEST[1] - 30, 160, 60); ctx.clip(); nestDraw(ctx, A46_NEST[0], A46_NEST[1], { eggs: 0, rock }); ctx.restore();
}
