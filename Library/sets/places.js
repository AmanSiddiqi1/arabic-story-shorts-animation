// ===== places. Each draws at its original story position by default; o.x/o.y move the anchor, o.s scales about it. Bake static ones: ctx.drawImage(bake('den', 1000, 1230, (c) => den(c)), 0, 0, 1000, 1230). =====
// the lion's rocky den with a dark cave mouth, bones and a dead tree (The Lion and the Hare). Anchor = cave mouth base centre (770, 906)
function den(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const WW = 1000, WH = 1230, GR = 900;
  ctx.save(); ctx.translate(o.x ?? 770, o.y ?? 906); ctx.scale(s, s); ctx.translate(-770, -906);
  shape(x, [[400, GR + 6], [450, 560], [560, 370], [700, 280], [860, 300], [1010, 220], [1010, GR + 6], [400, GR + 6]], STONE, { lw: 10, seed: 60, dot: STONED, pitch: 12, rad: 0.22, da: 0.7 });
  const cm = []; for (let i = 0; i <= 24; i++) { const a = Math.PI + i / 24 * Math.PI; cm.push([770 + Math.cos(a) * 240, GR + 6 + Math.sin(a) * 440]); } cm.push(cm[0]);
  shape(x, cm, NAVY2, { lw: 9, seed: 61, dot: '#1b3a8f', pitch: 12, rad: 0.25 });
  x.lineWidth = 6; x.strokeStyle = C.black; x.lineCap = 'round'; for (const [ax, ay, bx, by] of [[470, 600, 500, 520], [600, 380, 640, 330], [900, 330, 950, 290], [440, 760, 460, 700]]) { x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.stroke(); }
  for (const [bx, by, a] of [[120, GR + 90, -0.2], [300, GR + 150, 0.3], [560, GR + 120, -0.1], [820, GR + 170, 0.2]]) { const dx = Math.cos(a) * 34, dy = Math.sin(a) * 34; seg(x, bx - dx, by - dy, bx + dx, by + dy, 9, C.white, 4); for (const sd of [-1, 1]) { shape(x, ell(bx + sd * dx - 5, by + sd * dy - 6, 8, 8, 10), C.white, { lw: 3.5, seed: 4 }); shape(x, ell(bx + sd * dx + 5, by + sd * dy + 6, 8, 8, 10), C.white, { lw: 3.5, seed: 4 }); } }
  seg(x, 150, GR + 4, 160, 560, 30, WOOD, 5); seg(x, 158, 640, 80, 520, 16, WOOD, 4.5); seg(x, 160, 590, 240, 490, 16, WOOD, 4.5); seg(x, 110, 566, 96, 480, 10, WOOD, 4); seg(x, 214, 522, 262, 500, 9, WOOD, 4);
  ctx.restore();
}
// cut-away earth with a stone-lined well shaft, grass on top, a bucket (The Lion and the Hare). Anchor = shaft top centre (680, 520)
function wellShaft(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const WW = 1000, WH = 1230, WG = 520, SH = { x0: 560, x1: 800, cx: 680, wat: 1010, rim: WG - 66 };
  ctx.save(); ctx.translate(o.x ?? 680, o.y ?? 520); ctx.scale(s, s); ctx.translate(-680, -520);
  shape(x, [[-10, WG], [1010, WG], [1010, WH + 10], [-10, WH + 10], [-10, WG]], EARTH, { lw: 0, dot: EARTHD, pitch: 12, rad: 0.22, da: 0.7 });
  const r = K.rng(5); for (let i = 0; i < 22; i++) { const sx = r() * 1000, sy = WG + 90 + r() * 600; if (sx > 490 && sx < 870) continue; shape(x, ell(sx, sy, 20 + r() * 26, 12 + r() * 12, 12), STONE, { lw: 4, seed: 70 + i, dot: STONED, pitch: 9, rad: 0.2, da: 0.5 }); }
  x.fillStyle = NAVY2; x.fillRect(SH.x0, WG, SH.x1 - SH.x0, WH); x.fillStyle = dotPat(x, '#1b3a8f', 12, 0.25); x.fillRect(SH.x0, WG, SH.x1 - SH.x0, WH);
  for (const bx of [SH.x0 - 36, SH.x1]) for (let by = SH.rim, k = 0; by < WH; by += 46, k++) shape(x, K.rectPts(bx + (k % 2 ? 2 : -2), by, 36, 46), k % 2 ? STONE : STONE2, { lw: 4, seed: 80 + k, dot: STONED, pitch: 9, rad: 0.2, da: 0.5 });
  for (const [a, b] of [[-10, SH.x0 - 38], [SH.x1 + 38, 1010]]) { shape(x, [[a, WG - 8], [b, WG - 8], [b, WG + 20], [a, WG + 20], [a, WG - 8]], GREEN, { lw: 5, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 }); for (let px = a + 6; px < b - 4; px += 26) seg(x, px, WG - 8, px + 4, WG - 22, 5, GREEN2, 2.5); }
  // bucket and rope beside the well
  shape(x, [[880, WG - 56], [940, WG - 56], [932, WG - 4], [888, WG - 4], [880, WG - 56]], WOOD, { lw: 5, seed: 90, dot: C.black, pitch: 8, rad: 0.16, da: 0.4 });
  x.lineWidth = 6; x.strokeStyle = C.black; x.beginPath(); x.arc(910, WG - 56, 30, Math.PI, 0); x.stroke();
  ctx.restore();
}
// sandy river bank with grass top, left side (The Monkey and the Turtle). Anchor = bank edge (280, 700)
function riverBank(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const WH = 1230, BANK = 700;
  ctx.save(); ctx.translate(o.x ?? 280, o.y ?? 700); ctx.scale(s, s); ctx.translate(-280, -700);
  // bank (left) with grass top
  const bank = [[-10, BANK], [280, BANK], [332, 778], [336, WH], [-10, WH]]; shape(x, bank, '#d9a441', { lw: 8, seed: 20, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(x, [[-10, BANK - 6], [280, BANK - 6], [300, BANK + 18], [-10, BANK + 18]], GREEN, { lw: 6, seed: 21, dot: GREEND, pitch: 8, rad: 0.2 });
  ctx.restore();
}
// island with a red-roofed hut, door and window (The Monkey and the Turtle). Anchor = island shore (680, 742)
function islandHut(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const WH = 1230, ISX = 680, ISL = 742;
  ctx.save(); ctx.translate(o.x ?? 680, o.y ?? 742); ctx.scale(s, s); ctx.translate(-680, -742);
  const isl = [[ISX + 40, ISL], [1010, ISL], [1010, WH], [ISX - 8, WH], [ISX - 8, 790]]; shape(x, isl, '#d9a441', { lw: 8, seed: 22, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(x, [[ISX + 20, ISL - 6], [1010, ISL - 6], [1010, ISL + 16], [ISX + 30, ISL + 16], [ISX + 8, 770]], GREEN, { lw: 6, seed: 23, dot: GREEND, pitch: 8, rad: 0.2 });
  shape(x, [[ISX + 14, 470], [1010, 470], [1010, ISL - 6], [ISX + 14, ISL - 6]], '#f3e2b8', { lw: 7, seed: 24, dot: C.red, pitch: 12, rad: 0.15, da: 0.35 });
  shape(x, [[ISX - 10, 482], [ISX + 175, 360], [1010, 482]], C.red, { lw: 8, seed: 25, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.5 });
  shape(x, [[860, 696], [1010, 696], [1010, ISL - 6], [860, ISL - 6]], WOOD, { lw: 6, seed: 26 }); shape(x, [[855, 640], [875, 640], [875, ISL - 6], [855, ISL - 6]], WOOD, { lw: 6, seed: 27 });
  shape(x, ell(930, 684, 40, 16, 16), C.white, { lw: 5, seed: 28 });
  shape(x, K.rectPts(ISX + 40, 560, 70, 62), C.blue, { lw: 7, seed: 29 }); seg(x, ISX + 75, 560, ISX + 75, 622, 4, C.black, 0); seg(x, ISX + 40, 591, ISX + 110, 591, 4, C.black, 0);
  ctx.restore();
}
// house interior: wall, night window, door, plank floor, bed (The Thief and the Moonbeam). Anchor = room floor centre (500, 1100)
function houseRoom(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const WW = 1000, LH = 1450;
  ctx.save(); ctx.translate(o.x ?? 500, o.y ?? 1100); ctx.scale(s, s); ctx.translate(-500, -1100);
    x.fillStyle = NAVY2; x.fillRect(0, 622, WW, LH - 622); x.fillStyle = dotPat(x, '#274fae', 14, 0.26); x.fillRect(0, 622, WW, LH - 622);
    // interior wall + night window
    x.fillStyle = WALL; x.fillRect(72, 622, 856, 478); x.fillStyle = dotPat(x, '#2c58b8', 16, 0.28); x.fillRect(72, 622, 856, 478);
    x.fillStyle = C.black; x.fillRect(72, 1078, 856, 22);
    shape(x, [[110, 668], [226, 668], [226, 770], [110, 770]], C.blue, { lw: 8, seed: 60 }); x.fillStyle = C.yellow; x.beginPath(); x.arc(172, 710, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = C.blue; x.beginPath(); x.arc(182, 703, 18, 0, Math.PI * 2); x.fill(); seg(x, 168, 668, 168, 770, 5, C.black, 0); seg(x, 110, 720, 226, 720, 5, C.black, 0);
    // door
    shape(x, [[836, 868], [920, 868], [920, 1100], [836, 1100]], NAVY2, { lw: 8, seed: 61, dot: C.blue, pitch: 10, rad: 0.25 }); shape(x, ell(895, 990, 8, 8, 10), C.yellow, { lw: 3 });
    // floor planks
    x.fillStyle = C.yellow; x.fillRect(40, 1100, 920, 350); x.fillStyle = dotPat(x, C.red, 12, 0.28); x.globalAlpha = 0.5; x.fillRect(40, 1180, 920, 270); x.globalAlpha = 1;
    for (let px = 40; px < 960; px += 84) seg(x, px, 1100, px - 14, 1450, 4, C.black, 0); seg(x, 40, 1230, 960, 1230, 4, C.black, 0); ink(x, K.rectPts(40, 1100, 920, 350), 8, 62);
    // bed: headboard, posts, pillows
    shape(x, [[84, 806], [98, 772], [442, 772], [456, 806], [456, 1100], [84, 1100]], WOOD, { lw: 7, seed: 63, dot: C.black, pitch: 9, rad: 0.2, da: 0.55 });
    for (const px of [205, 335]) shape(x, [[px - 66, 982], [px - 72, 930], [px - 50, 906], [px + 50, 906], [px + 72, 930], [px + 66, 982]], C.white, { lw: 6, seed: 64 + px % 3, dot: C.blue, pitch: 10, rad: 0.22, da: 0.5 });
  
  ctx.restore();
}
// red tiled roof with a hole and walls (The Thief and the Moonbeam). Anchor = roof hole centre (700, 560); o.hole = [x0, x1]
function houseRoof(ctx, o = {}) {
  const x = ctx, s = o.s ?? 1; const ROOFY = 560, HOLE = o.hole || [590, 810];
  ctx.save(); ctx.translate(o.x ?? 700, o.y ?? 560); ctx.scale(s, s); ctx.translate(-700, -560);
    shape(x, [[40, 622], [72, 622], [72, 1100], [40, 1100]], '#a8261a', { lw: 7, seed: 70, dot: C.black, pitch: 9, rad: 0.2, da: 0.5 });
    shape(x, [[928, 622], [960, 622], [960, 1100], [928, 1100]], '#a8261a', { lw: 7, seed: 71, dot: C.black, pitch: 9, rad: 0.2, da: 0.5 });
    for (const [a, b] of [[40, HOLE[0]], [HOLE[1], 960]]) {
      const p = [[a, ROOFY], [b, ROOFY], [b, 622], [a, 622]]; shape(x, p, C.red, { lw: 8, seed: 72, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.45 });
      x.save(); K.poly(x, p, true); x.clip(); for (let px = a + 20; px < b; px += 36) seg(x, px, ROOFY + 14, px, 622, 4, C.black, 0); x.fillStyle = C.yellow; x.fillRect(a, ROOFY, b - a, 11); x.restore(); ink(x, p, 8, 73);
    }
  
  ctx.restore();
}
