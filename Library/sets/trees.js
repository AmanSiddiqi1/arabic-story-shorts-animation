// ===== trees and bushes =====
// tree(ctx, x, groundY, {w: 74 trunk width, top: 480 trunk top y, crowns: [[cx, cy, r], ...] absolute, branch: polygon | null})
// The big canopy tree of The Lark and the Elephant (also the drum tree and hiding tree of The Fox and the Drum).
const TREE = { larkLeft: { x: 26, w: 74, crowns: [[70, 390, 130], [190, 440, 90], [20, 470, 70], [140, 340, 80]], branch: [[90, 612], [310, 598], [310, 628], [90, 644]] },
  larkRight: { x: 922, w: 74, crowns: [[950, 390, 130], [830, 450, 90], [1000, 470, 70], [880, 340, 80]], branch: [[930, 612], [730, 598], [730, 628], [930, 644]] } };
function tree(ctx, tx, GR = 900, o = {}) {
  const x = ctx, tw = o.w ?? 74, cans = o.crowns || [[tx + 37, 390, 130]], br = o.branch || null, top = o.top ?? 480;
  shape(x, [[tx, GR + 4], [tx + 8, top], [tx + tw - 8, top], [tx + tw, GR + 4]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 }); if (br) shape(x, br, WOOD, { lw: 7, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); } for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); } x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of cans) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); }
}
// treeRow(ctx, {y: 900, n: 9, seed: 8, hmin: 380, hvar: 140}): a row of dark back trees (Lion and the Hare: hmin 380; Fox and the Drum: hmin 360)
function treeRow(ctx, o = {}) { const GR = o.y ?? 900, x = ctx, r = K.rng(o.seed ?? 8); for (let i = 0; i < (o.n ?? 9); i++) { const tx = 20 + i * 118 + r() * 30, h = (o.hmin ?? 380) + r() * (o.hvar ?? 140); x.fillStyle = WOOD; x.fillRect(tx - 18, GR - h, 36, h); x.lineWidth = 6; x.strokeStyle = C.black; x.strokeRect(tx - 18, GR - h, 36, h); for (const [dx, dy, cr] of [[0, 0, 70], [-46, 40, 52], [46, 40, 52]]) { x.beginPath(); x.arc(tx + dx, GR - h + dy, cr, 0, 7); x.fillStyle = GREEND; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); } } }
// bush(ctx, {x: centre, w, h, y: ground 900, seed}): a rounded hiding bush (Lion and the Hare)
function bush(ctx, o = {}) {
  const x = ctx, GR = o.y ?? 900, b = { x: o.x ?? 190, w: o.w ?? 300, h: o.h ?? 170, seed: o.seed ?? 3 }, r = K.rng(b.seed), cs = [];
    for (let k = 0; k < 8; k++) { const u = (k + 0.5) / 8; cs.push([b.x - b.w / 2 + u * b.w, GR - b.h * (0.5 + 0.42 * Math.sin(Math.PI * u)) + r() * 12, b.w / 8 * 1.15 + r() * 10]); }
    for (let k = 0; k < 6; k++) { const u = (k + 0.5) / 6; cs.push([b.x - b.w / 2 + 24 + u * (b.w - 48), GR - 44 - r() * 16, 52]); }
    x.lineWidth = 16; x.strokeStyle = C.black; for (const [cx, cy, cr] of cs) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.stroke(); }
    for (const f of [GREEN, dotPat(x, GREEND, 11, 0.28)]) { x.fillStyle = f; for (const [cx, cy, cr] of cs) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fill(); } x.fillRect(b.x - b.w / 2 + 10, GR - b.h * 0.5, b.w - 20, b.h * 0.5 - 10); }
    x.lineWidth = 5; x.strokeStyle = C.black; x.lineCap = 'round'; for (let k = 0; k < 5; k++) { const cx = b.x - b.w / 2 + 40 + r() * (b.w - 80), cy = GR - 50 - r() * (b.h * 0.6); x.beginPath(); x.arc(cx, cy, 20, 3.5, 5.2); x.stroke(); }
}
// thicket(ctx, {x0: 600, w: 420, y: 900, seed: 3}): a dense wall of round leaves (Fox and the Drum)
function thicket(ctx, o = {}) { const x = ctx, GR = o.y ?? 900, x0 = o.x0 ?? 600, w = o.w ?? 420, r = K.rng(o.seed ?? 3); for (let i = 0; i < 26; i++) { const bx = x0 + r() * w, by = GR - 20 - r() * 250, br = 50 + r() * 40; x.beginPath(); x.arc(bx, by, br, 0, 7); x.fillStyle = i % 2 ? GREEN : GREEND; x.fill(); x.lineWidth = 7; x.strokeStyle = C.black; x.stroke(); } x.fillStyle = GREEN; x.fillRect(x0, GR - 60, w, 80); }
// fig tree with branches and figs (The Monkey and the Turtle). Anchor = trunk base centre (205, 706)
function figTree(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const BANK = 700;
  ctx.save(); ctx.translate(o.x ?? 205, o.y ?? 706); ctx.scale(s, s); ctx.translate(-205, -706);
  shape(x, [[148, BANK + 6], [172, 300], [224, 300], [262, BANK + 6]], WOOD, { lw: 8, seed: 30, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  for (const b of [[[200, 440], [390, 414], [394, 446], [210, 480]], [[196, 314], [370, 288], [374, 320], [204, 354]]]) shape(x, b, WOOD, { lw: 7, seed: 31, dot: C.black, pitch: 9, rad: 0.18, da: 0.45 });
  const can = [[210, 190, 110], [100, 250, 90], [320, 215, 100], [390, 290, 62], [40, 330, 66], [250, 300, 70], [160, 330, 60]];
  for (const [cx, cy, cr] of can) { x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fillStyle = GREEN; x.fill(); x.lineWidth = 8; x.strokeStyle = C.black; x.stroke(); }
  for (const [cx, cy, cr] of can) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fillStyle = GREEN; x.fill(); }
  x.fillStyle = dotPat(x, GREEND, 11, 0.28); for (const [cx, cy, cr] of can) { x.beginPath(); x.arc(cx, cy, cr - 4, 0, 7); x.fill(); }
  for (const [fx, fy] of [[330, 396], [150, 372], [260, 372], [372, 336], [90, 336], [220, 262], [320, 258], [60, 292]]) fig(x, fx, fy, 15);
  ctx.restore();
}
