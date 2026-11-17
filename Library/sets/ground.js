// ===== ground, pond, pit, river =====
// ground(ctx, {y: 900, w: 1000, h: 1230}): sand with red dots under a grass strip with blades (Lion and the Hare, Fox and the Drum)
function ground(ctx, o = {}) {
  const GR = o.y ?? 900, WW = o.w || 1000, WH = o.h || 1230;
  ctx.drawImage(bake('ground:' + [GR, WW, WH], WW, WH, (x) => {  shape(x, [[-10, GR], [(WW + 10), GR], [(WW + 10), WH], [-10, WH]], '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 }); shape(x, [[-10, GR - 8], [(WW + 10), GR - 8], [(WW + 10), GR + 22], [-10, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = 4; px < (WW + 10); px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5);  }), 0, 0, WW, WH);
}
// groundWithPit(ctx, {y: 900, pit: [x0, x1, bottom], pond: [cx, half-width] | null}): the Lark's ground, a pit cut into it and a pond with reeds.
// Draw pitBack() first (behind characters), then characters, then this.
function pitBack(ctx, o = {}) { const GR = o.y ?? 900, PIT = o.pit || [580, 880, 1180], x = ctx; x.fillStyle = NAVY2; x.fillRect(PIT[0], GR, PIT[1] - PIT[0], PIT[2] - GR); x.fillStyle = dotPat(x, '#274fae', 12, 0.2); x.fillRect(PIT[0], GR, PIT[1] - PIT[0], PIT[2] - GR); }
function groundWithPit(ctx, o = {}) {
  const GR = o.y ?? 900, WH = 1230, PIT = o.pit || [580, 880, 1180], PO = o.pond === undefined ? [215, 92] : o.pond;
  ctx.drawImage(bake('gpit:' + JSON.stringify([GR, PIT, PO]), 1000, 1230, (x) => {
    const g = [[-10, GR], [PIT[0], GR], [PIT[0] - 6, PIT[2]], [PIT[1] + 6, PIT[2]], [PIT[1], GR], [1010, GR], [1010, WH], [-10, WH]];
    shape(x, g, '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
    for (const [a, b] of [[-10, PIT[0] - 4], [PIT[1] + 4, 1010]]) { shape(x, [[a, GR - 8], [b, GR - 8], [b, GR + 22], [a, GR + 22]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = a + 10; px < b; px += 26) seg(x, px, GR - 8, px + 4, GR - 22, 5, GREEN2, 2.5); }
    shape(x, [[250, GR + 22], [560, GR + 22], [560, GR + 40], [250, GR + 40]], '#f2d27a', { lw: 5, seed: 22 });
    if (PO) { const pond = ell(PO[0], GR + 4, PO[1], 20, 28); shape(x, pond, C.blue, { lw: 7, seed: 23, dot: C.white, pitch: 9, rad: 0.15, da: 0.6 }); for (const rx of [PO[0] - 97, PO[0] - 85, PO[0] + 90, PO[0] + 101]) { seg(x, rx, GR, rx - 2, GR - 50, 5, GREEND, 2.5); shape(x, ell(rx - 2, GR - 56, 5, 12, 8), '#7a4e12', { lw: 3 }); } }
  }), 0, 0, 1000, 1230);
}
// river(ctx, t, {y: water level 772, x0: 330, x1: 674, back: true}): deep water behind (back) and a waving translucent surface in front (front: true)
// (The Monkey and the Turtle). Call once with {back: true} before characters and once with {front: true} after.
function river(ctx, t, o = {}) {
  const WATER = o.y ?? 772, WW = o.w || 1000, WH = o.h || 1230, ISX = (o.x1 ?? 674) + 6, wy = (x, t) => WATER + 3 * Math.sin(x * 0.05 + t * 2.2);
  if (o.back) { ctx.fillStyle = '#17409a'; ctx.fillRect(0, WATER, WW, WH - WATER); ctx.fillStyle = dotPat(ctx, '#2a62c9', 14, 0.3); ctx.fillRect(0, WATER, WW, WH - WATER); return; }
    const x0 = o.x0 ?? 330, x1 = ISX - 6, pts = []; for (let x = x0; x <= x1; x += 10) pts.push([x, wy(x, t)]);
    const poly = [...pts, [x1, WH], [x0, WH]];
    ctx.save(); K.poly(ctx, poly, true); ctx.fillStyle = 'rgba(29,91,208,0.58)'; ctx.fill(); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.white, 14, 0.18); ctx.globalAlpha = 0.5; ctx.fillRect(x0, WATER - 6, x1 - x0, WH); ctx.restore();
    ctx.save(); ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.strokeStyle = C.black; K.poly(ctx, pts); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.white; K.poly(ctx, pts.map(([x, y]) => [x, y + 8])); ctx.stroke(); ctx.restore();
}
