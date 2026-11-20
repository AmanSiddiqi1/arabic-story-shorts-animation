// ===== ALI-01-POPUP "Open Sesame" (Paper Pop-up Book): story kit. Every story name is prefixed AB_ / ab (no Library globals redefined).
// Pop-up mechanics on top of the style's castFinish / popCard: baked card sprites (castFinish once, then drawn with a pop factor),
// live cut-paper actors, the spread palettes and prints, and this story's new drawings (sesame rock, paper trees, thief chain, cart,
// pull-tab, sun on a stick, slide strip, axe, wood bundle, sacks, coins, moth, picture cards). World 1000 x 1230, fold line y 900.
const AB_WW = 1000, AB_WH = 1230, AB_GR = 900, AB_DUR = 143.44;   // film = narration 138.94 + end hold 4.5
const AB_TURN = [15.9, 56.5, 88.9, 105.0, 131.8];                  // page turns (leaf covers the spread at these times)
const AB_R = 1.6, AB_PR = 1.5;                                      // sprite and print resolution (px per world unit)
// memory: sprites and prints live in per-spread groups; only the current and the previous group are kept (the smoke test and
// the frame scan visit every spread in one page). Shared mechanisms (tab, sun, fan, silhouettes) are kept in 'common'.
const AB_MEM = new Map(); let AB_G = 'common', AB_GL = [];
function abMem(g, key, build) {
  if (g !== 'common' && AB_GL[0] !== g) { AB_GL = [g, ...AB_GL.filter((x) => x !== g)].slice(0, 2); for (const k of [...AB_MEM.keys()]) if (k !== 'common' && !AB_GL.includes(k)) AB_MEM.delete(k); }
  let G = AB_MEM.get(g); if (!G) { G = new Map(); AB_MEM.set(g, G); }
  if (!G.has(key)) G.set(key, build()); return G.get(key);
}
// a flat print (board and page) baked once per spread group
function abBake(key, draw) { return abMem(AB_G, 'print:' + key, () => { const c = K.layer(AB_WW * AB_PR, AB_WH * AB_PR), x = c.getContext('2d'); x.scale(AB_PR, AB_PR); draw(x); return c; }); }
const AB_MX = (a, b, f) => mixHex(a, b, f);
// ---------- spread palettes: one hue family per spread, from the theme's names ----------
const AB_PAL = {
  home: { sky: AB_MX(C.paper, C.red, 0.28), sky2: AB_MX(C.yellow, C.paper, 0.45), hill: AB_MX(C.yellow, C.red, 0.32), page: AB_MX(SAND, EARTH, 0.25), path: SANDL, leaf: GREEN, leafD: GREEND, trunk: WOOD },
  day: { sky: AB_MX(GREEN2, C.white, 0.62), wall: AB_MX(GREEND, '#1f3a20', 0.35), wall2: GREEND, ridge: AB_MX(GREEN, GREEND, 0.45), page: AB_MX(GREEN, GREEND, 0.45), path: SAND,
    leaf: GREEN, leafD: GREEND, trunk: WOOD, rock: STONE, rockD: STONED, rockL: STONE2, fern: GREEN2, sx: 5, sy: 7 },
  dusk: { sky: AB_MX(C.yellow, C.red, 0.45), wall: AB_MX(FIGC, NAVY2, 0.55), wall2: AB_MX(FIGC, NAVY2, 0.3), ridge: AB_MX(FIGC, C.red, 0.2), page: AB_MX(FIGC, EARTH, 0.4), path: AB_MX(SAND, FIGC, 0.35),
    leaf: AB_MX(FIGC, NAVY2, 0.15), leafD: AB_MX(FIGC, NAVY2, 0.55), trunk: AB_MX(WOOD, FIGC, 0.3), rock: AB_MX(STONE, FIGC, 0.32), rockD: AB_MX(STONED, NAVY2, 0.3), rockL: AB_MX(STONE2, FIGC, 0.2), fern: AB_MX(GREEN2, FIGC, 0.5), sx: 14, sy: 9 },
  cave: { rock: AB_MX(NAVY2, NAVY, 0.35), rockD: AB_MX(NAVY2, '#141a33', 0.4), hole: AB_MX(NAVY2, GREEND, 0.45), floor: AB_MX(NAVY, GREEND, 0.35) },
  road: { sky: AB_MX(C.blue, GREEN2, 0.5), sky2: AB_MX(GREEN2, C.white, 0.6), hill: AB_MX(GREEN, C.blue, 0.35), page: SAND, path: SANDL, leaf: AB_MX(GREEN, C.blue, 0.2), leafD: AB_MX(GREEND, C.blue, 0.25), trunk: WOOD },
};
// ---------- pop factor (as popCard): 0 flat until t0 + delay, back() rise over dur, folds down from out ----------
function abK(t, t0, o = {}) {
  const t1 = t0 + (o.delay || 0), d = o.dur ?? 0.45;
  let k = t < t1 ? 0 : t < t1 + d ? K.ease.back(K.clamp((t - t1) / d)) : 1;
  if (o.out != null && t > o.out) k *= 1 - K.ease.inOut(K.clamp((t - o.out) / (o.outDur ?? 0.35)));
  return k;
}
// ---------- baked card sprite: the art drawn once through castFinish (border, cardboard edge, cut-out shadow) ----------
function abSprite(key, x, y, w, h, draw, o = {}) {
  return abMem(o.keep ? 'common' : AB_G, 'sp:' + key, () => {
    const pad = 44, x0 = x - w / 2 - pad, y0 = y - h - pad, W = w + 2 * pad, H = h + pad + 48;
    const c = K.layer(W * AB_R, H * AB_R), g = c.getContext('2d'); g.setTransform(AB_R, 0, 0, AB_R, -x0 * AB_R, -y0 * AB_R);
    castFinish(g, x, y, w, h, draw, o); return { c, x0, y0, W, H, bx: x, by: y };
  });
}
// draw a sprite: k = pop (y scale about the pivot, default the base line; o.py = pivot y, e.g. the top edge for hanging cards),
// o.rot (radians about the base), o.dx / o.dy, o.alpha, o.sx (x scale)
function abPut(ctx, sp, k = 1, o = {}) {
  if (Math.abs(k) <= 0.02) return;
  const px = sp.bx + (o.dx || 0), py = (o.py ?? sp.by) + (o.dy || 0);
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  ctx.translate(px, py); if (o.rot) ctx.rotate(o.rot); ctx.scale(o.sx ?? 1, k);
  ctx.drawImage(sp.c, sp.x0 - sp.bx, sp.y0 - (o.py ?? sp.by), sp.W, sp.H); ctx.restore();
}
// a live cut-paper actor: castFinish with a fold factor k (actors fold flat with their spread), o passed through.
// Performance: castFinish works on full-size layers of the canvas it is given (its tint pass clears the whole layer), so a live
// actor is finished on one small shared off-screen canvas (AB_OFF, fixed size so the style's layers are never reallocated)
// and the result is copied into place. Actors too big for it fall back to castFinish on the frame itself.
const AB_OFF = { w: 800, h: 940, c: null };
function abLive(ctx, x, y, w, h, draw, k = 1, o = {}) {
  if (k <= 0.02) return;
  ctx.save(); if (k !== 1) { ctx.translate(x, y); ctx.scale(1, k); ctx.translate(-x, -y); }
  const m = ctx.getTransform(), sc = Math.hypot(m.a, m.b) || 1, pad = (o.border ?? 7) + 12;
  const pts = [[x - w / 2 - pad, y - h - pad], [x + w / 2 + pad, y - h - pad], [x - w / 2 - pad, y + pad + 6], [x + w / 2 + pad, y + pad + 6]].map(([u, v]) => [m.a * u + m.c * v + m.e, m.b * u + m.d * v + m.f]);
  const x0 = Math.floor(Math.min(...pts.map((q) => q[0]))) - 4, y0 = Math.floor(Math.min(...pts.map((q) => q[1]))) - 4;
  const bw = Math.ceil(Math.max(...pts.map((q) => q[0]))) - x0 + Math.ceil(16 * sc) + 8, bh = Math.ceil(Math.max(...pts.map((q) => q[1]))) - y0 + Math.ceil(30 * sc) + 8;
  const cw = ctx.canvas.width, ch = ctx.canvas.height;
  if (x0 + bw < 0 || y0 + bh < 0 || x0 > cw || y0 > ch) { ctx.restore(); return; }
  if (bw > AB_OFF.w || bh > AB_OFF.h) { castFinish(ctx, x, y, w, h, draw, o); ctx.restore(); return; }
  if (!AB_OFF.c) AB_OFF.c = K.layer(AB_OFF.w, AB_OFF.h);
  const g = AB_OFF.c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, bw, bh);
  g.setTransform(m.a, m.b, m.c, m.d, m.e - x0, m.f - y0); castFinish(g, x, y, w, h, draw, o);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(AB_OFF.c, 0, 0, bw, bh, x0, y0, bw, bh); ctx.restore();
}
// shared body transform of the acting wrapper (tip and squash about the feet), for props a figure carries
function abBodyT(ctx, P) { const sq = P.sq ?? 1, tip = P.tip || 0, dir = P.dir ?? 1; ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip * Math.sign(dir || 1)); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.translate(-P.x, -P.y); }
// ---------- the cast (palettes from the plan) ----------
const AB_ALI = { costume: 'villager', s: 0.8, age: 0.2, seed: 11, pal: { robe: AB_MX(C.blue, C.white, 0.08), dot: AB_MX(C.blue, NAVY, 0.45), sash: C.red, shoes: 'bare', hc: C.white, hd: AB_MX(C.blue, C.white, 0.4), band: C.red } };
const AB_WIFE = { costume: 'villageWoman', s: 0.78, seed: 23, pal: { robe: AB_MX(GREEND, C.blue, 0.45), dot: AB_MX(GREEND, NAVY2, 0.5), hc: C.yellow, hd: C.red } };
const AB_KID = { costume: 'servant', child: true, s: 0.8, seed: 29, pal: { robe: CREAM, hc: C.red } };
const AB_CAS = { costume: 'merchant', s: 0.86, age: 0.3, seed: 37, pal: { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red, sash: AB_MX(C.yellow, EARTH, 0.35), trim: C.yellow } };
const AB_LEAD = { costume: 'bedouin', s: 0.72, seed: 41, brow: 0.6, pal: { robe: AB_MX(FIGC, NAVY2, 0.6), dot: NAVY2, cape: C.red, capeDot: AB_MX(C.red, '#5a1010', 0.5), hc: C.red, hd: AB_MX(C.red, '#5a1010', 0.5), band: NAVY2, beard: C.black } };
const AB_THIEF_ROBES = [AB_MX(NAVY2, STONED, 0.5), AB_MX(EARTHD, GREEND, 0.4), AB_MX(C.red, '#3a1010', 0.55), AB_MX(GREEND, NAVY2, 0.6)];
const abThief = (i) => ({ costume: 'bedouin', s: 0.66, seed: 31 + i, pal: { robe: AB_THIEF_ROBES[i], dot: AB_MX(AB_THIEF_ROBES[i], C.black, 0.4), cape: AB_MX(AB_THIEF_ROBES[i], C.black, 0.25), capeDot: C.black, hc: AB_MX(NAVY2, C.black, 0.3), hd: C.red, band: C.red } });
const AB_ARMS_UP = { aL: [-2.45, -2.85], aR: [2.45, 2.85] };
// draw a Library person with this story's extras (Ali Baba's robe patches) inside the body transform
function abPerson(ctx, P, o = {}) {
  person(ctx, P);
  if (o.patches && !(P.sit > 0.3) && !(P.kneel > 0.3)) { const s = P.s || 0.8, d = Math.sign(P.dir || 1); ctx.save(); abBodyT(ctx, P);
    for (const [px, py, r] of [[-17, -64, 0.2], [14, -100, -0.3]]) { ctx.save(); ctx.translate(P.x + px * s * d, P.y + py * s); ctx.rotate(r); shape(ctx, K.rectPts(-7 * s, -7 * s, 14 * s, 13 * s), C.yellow, { lw: 2.5, seed: 9 }); ctx.restore(); }
    ctx.restore(); }
}
// ---------- flat prints on the board and page (baked per spread) ----------
function abSkyBand(ctx, top, bot, a, b) { const g = ctx.createLinearGradient(0, top, 0, bot); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, top, AB_WW, bot - top); }
function abPage(ctx, col, seed = 3) {
  ctx.fillStyle = col; ctx.fillRect(0, AB_GR, AB_WW, AB_WH - AB_GR);
  ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = dotPat(ctx, AB_MX(col, C.black, 0.35), 9, 0.22); ctx.fillRect(0, AB_GR, AB_WW, AB_WH - AB_GR); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = paperGrain(ctx); ctx.fillRect(0, 0, AB_WW, AB_WH); ctx.restore();
}
function abHillPrint(ctx, y, amp, col, seed, dot) {
  const g = nz(seed), pts = [[0, AB_GR]]; for (let x = 0; x <= AB_WW; x += 20) pts.push([x, y - amp * (0.5 + 0.5 * g.n2(x * 0.004, seed))]); pts.push([AB_WW, AB_GR]);
  shape(ctx, pts, col, { lw: 3.5, seed, dot: dot || AB_MX(col, C.black, 0.3), pitch: 10, rad: 0.2, da: 0.4 });
}
// ---------- paper tree (palette-aware twin of Library tree()) ----------
// o: {x (trunk centre), base, top, w (trunk), crowns [[cx, cy, r]], branch (polygon), pal {leaf, leafD, trunk}, slot (climb slot line)}
function abTreeArt(ctx, o) {
  const P = o.pal, x = o.x, w = o.w ?? 60, top = o.top;
  shape(ctx, [[x - w / 2 - 6, o.base + 4], [x - w / 2 + 6, top], [x + w / 2 - 6, top], [x + w / 2 + 6, o.base + 4]], P.trunk, { lw: 6, seed: 30, dot: AB_MX(P.trunk, C.black, 0.45), pitch: 9, rad: 0.2, da: 0.45 });
  if (o.slot) { ctx.save(); ctx.strokeStyle = AB_MX(P.trunk, C.black, 0.6); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, o.slot[0]); ctx.lineTo(x, o.slot[1]); ctx.stroke(); ctx.restore(); }
  if (o.branch) shape(ctx, o.branch, P.trunk, { lw: 5, seed: 31, dot: AB_MX(P.trunk, C.black, 0.45), pitch: 9, rad: 0.2, da: 0.45 });
  abCrowns(ctx, o.crowns, P, o.seed || 5);
}
function abCrowns(ctx, cr, P, seed = 5) {
  ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = C.black; for (const [cx, cy, r] of cr) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); }
  ctx.fillStyle = P.leaf; for (const [cx, cy, r] of cr) { ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, 7); ctx.fill(); }
  ctx.beginPath(); for (const [cx, cy, r] of cr) { ctx.moveTo(cx + r, cy); ctx.arc(cx, cy, r - 3, 0, 7); } ctx.clip();
  ctx.fillStyle = dotPat(ctx, P.leafD, 10, 0.3); for (const [cx, cy, r] of cr) ctx.fillRect(cx - r * 0.2, cy - r * 0.1, r * 1.3, r * 1.2);
  const g = K.rng(seed); ctx.lineWidth = 4; ctx.strokeStyle = AB_MX(P.leafD, C.black, 0.3); ctx.lineCap = 'round';
  for (const [cx, cy, r] of cr) for (let k = 0; k < 3; k++) { const a = g() * 6, rr = r * (0.3 + g() * 0.4); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 14 + g() * 8, 3.6, 5.2); ctx.stroke(); }
  ctx.restore();
}
function abBushArt(ctx, x, base, w, h, P, seed = 3) {
  const r = K.rng(seed), cr = []; for (let k = 0; k < 6; k++) { const u = (k + 0.5) / 6; cr.push([x - w / 2 + u * w, base - h * (0.45 + 0.35 * Math.sin(Math.PI * u)) + r() * 8, w / 6 * 1.25 + r() * 6]); }
  cr.push([x, base - h * 0.35, w * 0.32]); abCrowns(ctx, cr, P, seed);
}
function abFernArt(ctx, x, base, h, P, seed) {
  const r = K.rng(seed); for (let i = 0; i < 5; i++) { const a = -1.1 + i * 0.55 + (r() - 0.5) * 0.2, L = h * (0.7 + r() * 0.3), ex = x + Math.sin(a) * L, ey = base - Math.cos(a) * L;
    const pts = [[x - 4, base], [K.lerp(x, ex, 0.5) - 12, K.lerp(base, ey, 0.5)], [ex, ey], [K.lerp(x, ex, 0.5) + 12, K.lerp(base, ey, 0.5)], [x + 4, base]];
    shape(ctx, pts, i % 2 ? P.fern : P.leaf, { lw: 3.5, seed: seed + i }); }
}
// ---------- sesameRock (new): the great rock with the hidden door. Three cards: back arch, two halves split along a zigzag ----------
// centre x 260, base 905, 520 wide x 560 tall; door arch 150 x 250 centred at x 270. abRock* give the pieces; the scene draws
// back card, then actors inside the door (clipped to abRockArch), then the halves at +-open * 85.
const AB_ROCK = { x: 260, base: 905, w: 520, h: 560, ax: 270, aw: 150, ah: 250 };
function abRockPts(R = AB_ROCK) {
  const g = nz(77), pts = [], n = 30;
  for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI, rx = R.w / 2, ry = R.h, wob = 1 + 0.05 * g.n2(i * 0.5, 3);
    pts.push([R.x + Math.cos(a) * rx * wob * (1 - 0.08 * Math.sin(a * 2)), R.base + Math.sin(a) * ry * wob * (0.95 + 0.05 * Math.cos(a * 3))]); }
  pts[0] = [R.x - R.w / 2, R.base]; pts[n] = [R.x + R.w / 2, R.base]; return pts;
}
function abRockZig(R = AB_ROCK) { const z = []; for (let i = 0; i <= 7; i++) { const y = K.lerp(R.base - R.h - 10, R.base, i / 7); z.push([R.ax + (i % 2 ? 22 : -22) * (i === 0 || i === 7 ? 0 : 1), y]); } return z; }
function abRockArch(R = AB_ROCK) { return townArchPts(R.ax - R.aw / 2, R.ax + R.aw / 2, R.base - R.ah, R.base, 'pointed'); }
function abRockHalfArt(ctx, side, P, R = AB_ROCK) {
  const top = R.base - R.h - 400, bot = R.base + 400, ex = R.x + side * 1000, z = abRockZig(R);
  const clip = [[ex, top], [R.ax, top], ...z.slice(1), [R.ax, bot], [ex, bot]];
  ctx.save(); K.poly(ctx, clip, true); ctx.clip();
  const pts = abRockPts(R); shape(ctx, pts, P.rock, { lw: 7, seed: 78, dot: P.rockD, pitch: 9, rad: 0.24, da: 0.55 });
  // crescent shade on the right, light on the upper left, a few cracks and moss tufts
  ctx.save(); K.poly(ctx, pts, true); ctx.clip();
  ctx.fillStyle = AB_MX(P.rock, C.black, 0.22); ctx.beginPath(); ctx.ellipse(R.x + R.w * 0.42, R.base - R.h * 0.35, R.w * 0.25, R.h * 0.75, 0.15, 0, 7); ctx.fill();
  ctx.fillStyle = P.rockL; ctx.beginPath(); ctx.ellipse(R.x - R.w * 0.18, R.base - R.h * 0.72, R.w * 0.16, R.h * 0.12, -0.5, 0, 7); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.strokeStyle = AB_MX(P.rockD, C.black, 0.3); ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (const c of [[[R.x - 170, R.base - 260], [R.x - 140, R.base - 230], [R.x - 150, R.base - 190]], [[R.x + 160, R.base - 380], [R.x + 130, R.base - 340]], [[R.x - 60, R.base - 120], [R.x - 90, R.base - 80]]]) { K.poly(ctx, c); ctx.stroke(); }
  ctx.restore();
  for (const [mx, my, mr] of [[R.x - 150, R.base - 470, 34], [R.x + 120, R.base - 500, 30], [R.x - 215, R.base - 160, 26]]) shape(ctx, ell(mx, my, mr, mr * 0.55, 14), P.moss || GREEN, { lw: 3.5, seed: mx | 0, dot: GREEND, pitch: 7, rad: 0.25, da: 0.5 });
  ctx.restore();
}
function abRockBackArt(ctx, P, R = AB_ROCK) {
  const a = abRockArch(R); shape(ctx, townArchPts(R.ax - R.aw / 2 - 10, R.ax + R.aw / 2 + 10, R.base - R.ah - 10, R.base, 'pointed'), AB_MX(C.yellow, EARTH, 0.25), { lw: 4, seed: 81 });
  shape(ctx, a, AB_MX(NAVY2, C.black, 0.35), { lw: 4, seed: 82, dot: NAVY, pitch: 10, rad: 0.25, da: 0.5 });
}
// ---------- the gold fan: 7 wedge cards popping out of the door (glow 0..1, staggered back() ease) ----------
function abGoldFan(ctx, t, t0, glow = 1, R = AB_ROCK) {
  if (t < t0 || glow <= 0) return; const cx = R.ax, cy = R.base - R.ah * 0.45;
  const sp = abSprite('fan', cx, cy, 70, 230, (c) => shape(c, [[cx - 8, cy], [cx - 34, cy - 220], [cx + 34, cy - 220], [cx + 8, cy]], C.yellow, { lw: 4, seed: 83, dot: AB_MX(C.yellow, C.red, 0.4), pitch: 8, rad: 0.2, da: 0.4 }), { border: 4, shadow: 0.4, keep: true });
  for (let i = 0; i < 7; i++) { const k = K.ease.back(K.clamp((t - t0 - i * 0.05) / 0.35)) * glow, a = -1.25 + i * (2.5 / 6); abPut(ctx, sp, k, { rot: a, sx: 0.9 + 0.1 * Math.sin(t * 3 + i) }); }
}
// ---------- pullTab, sunOnStick, slideStrip (new style mechanisms) ----------
function abPullTab(ctx, x, y, k, dir = 1) {
  ctx.save(); ctx.strokeStyle = 'rgba(60,35,15,0.55)'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x + dir * 110, y); ctx.stroke(); ctx.restore();
  const sp = abSprite('tab', 500, 1202, 90, 44, (c) => { shape(c, K.rectPts(455, 1158, 90, 44), C.red, { lw: 4, seed: 84 }); shape(c, [[472, 1176], [508, 1176], [508, 1168], [528, 1180], [508, 1192], [508, 1184], [472, 1184]], C.white, { lw: 2.5, seed: 85 }); }, { border: 5, keep: true });
  abPut(ctx, sp, 1, { dx: x - 500 + dir * 78 * k, dy: y - 1180, sx: dir });
}
function abSunStick(ctx, x, y, P, o = {}) {   // a paper sun disc on a cream stick (the slot is printed on the board)
  const r = o.r ?? 62, sp = abSprite('sun' + (o.key || ''), 500, 400 + r + 20, r * 2 + 50, r * 2 + 60, (c) => {
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; shape(c, [[500 + Math.cos(a - 0.12) * r * 0.9, 400 + Math.sin(a - 0.12) * r * 0.9], [500 + Math.cos(a) * (r + 24), 400 + Math.sin(a) * (r + 24)], [500 + Math.cos(a + 0.12) * r * 0.9, 400 + Math.sin(a + 0.12) * r * 0.9]], o.ray || C.yellow, { lw: 3, seed: 86 + i }); }
    shape(c, ell(500, 400, r, r, 30), o.col || C.yellow, { lw: 5, seed: 99, dot: o.dot || AB_MX(C.yellow, C.red, 0.4), pitch: 9, rad: 0.2, da: 0.4 }); }, { border: 5, shadow: 0.6, keep: true });
  ctx.save(); ctx.fillStyle = CREAM; ctx.strokeStyle = 'rgba(74,44,26,0.5)'; ctx.lineWidth = 2; ctx.fillRect(x - 5, y, 10, AB_GR - y); ctx.strokeRect(x - 5, y, 10, AB_GR - y); ctx.restore();
  abPut(ctx, sp, 1, { dx: x - 500, dy: y - 400, rot: o.rot || 0 });
}
function abSlot(ctx, x0, y0, x1, y1, w = 10) { ctx.save(); ctx.strokeStyle = 'rgba(40,22,10,0.5)'; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
// a strip of tiny rider silhouettes sliding along a slot (x from x0 toward x1 by k); clipped to the slot span [cx0, cx1]
function abSlideStrip(ctx, t, x, y, n, s, col, cx0, cx1, seed = 1) {
  const sp = abSprite('rider-sil' + s, 500, 900, 360 * s, 520 * s, (c) => { horse(c, { x: 500, y: 900, s, dir: -1, silhouette: true, gallop: 0.6, ph: 0.4, amp: 1 }); c.save(); c.fillStyle = C.black; c.beginPath(); c.ellipse(492, 900 - 280 * s, 26 * s, 52 * s, 0, 0, 7); c.fill(); c.beginPath(); c.arc(492, 900 - 350 * s, 26 * s, 0, 7); c.fill(); c.restore(); }, { border: 3, shadow: 0.5, keep: true });
  ctx.save(); ctx.beginPath(); ctx.rect(cx0, y - 400, cx1 - cx0, 420); ctx.clip();
  for (let i = 0; i < n; i++) { const xi = x + i * 360 * s * 0.55, bob = Math.abs(Math.sin(t * 9 + i * 1.9 + seed)) * 6 * s * 3; if (xi < cx0 - 200 || xi > cx1 + 200) continue; abPut(ctx, sp, 1, { dx: xi - 500, dy: y - 900 - bob, alpha: 1 }); }
  ctx.restore();
}
// ---------- thiefChain (new): concertina paper-doll riders unfolding panel by panel (open 0..1) ----------
function abThiefChain(ctx, t, x0, y, open, n = 12, seed = 5, dir = 1) {
  if (open <= 0.001) return;
  const pw = 46, doll = K.cached('ab-doll', () => { const c = K.layer(pw * 2 * AB_R, 90 * AB_R), g = c.getContext('2d'); g.scale(AB_R, AB_R);
    horse(g, { x: pw, y: 88, s: 0.13, dir: -1, silhouette: true }); g.fillStyle = AB_MX(FIGC, NAVY2, 0.45); g.strokeStyle = C.black; g.lineWidth = 2;
    g.beginPath(); g.ellipse(pw, 40, 9, 15, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.arc(pw, 20, 8, 0, 7); g.fill(); g.stroke(); g.fillStyle = C.red; g.beginPath(); g.arc(pw, 15, 5, 0, 7); g.fill();
    g.fillStyle = CREAM; g.beginPath(); g.ellipse(pw + 12, 46, 8, 7, 0, 0, 7); g.fill(); g.stroke(); return c; });
  abLive(ctx, x0 + dir * n * pw / 2, y, n * pw + 40, 110, (c) => {
    for (let i = 0; i < n; i++) { const k = K.clamp(open * n - i); if (k <= 0) break; const hx = x0 + dir * i * pw, bob = idleSway(t, seed + i, 2, 1.3 + (i % 3) * 0.2);
      c.save(); c.translate(hx, y + bob); c.scale(dir * k * (i % 2 ? -1 : 1), 1); if (i % 2) c.translate(-pw, 0);
      c.drawImage(doll, -pw / 2 + (i % 2 ? 0 : 0) - pw / 2 + pw / 2, -88, pw * 2, 90); if (i % 2) { c.fillStyle = 'rgba(40,20,10,0.12)'; c.fillRect(-pw / 2, -88, pw * 2, 90); } c.restore(); }
  }, 1, { border: 4, shadow: 0.7 });
}
// ---------- small props ----------
function abAxe(ctx, hx, hy, ang, s = 1) {   // hand at (hx, hy), the head at the far end, ang = handle angle (0 = up)
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang); ctx.scale(s, s);
  seg(ctx, 0, 14, 0, -86, 9, WOOD, 3); shape(ctx, [[2, -92], [30, -100], [36, -74], [30, -66], [2, -72]], STONE2, { lw: 3.5, seed: 87, dot: STONED, pitch: 6, rad: 0.2, da: 0.4 }); ctx.restore();
}
function abWoodBundle(ctx, x, y, s = 1, rot = 0) {   // 7 sticks 80 long tied with two rope bands, bottom centre at (x, y)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (let i = 0; i < 7; i++) { const yy = -6 - (i % 4) * 9 - (i > 3 ? 4 : 0), dx = (i * 7) % 11 - 5; seg(ctx, -40 + dx, yy, 40 + dx, yy - 2, 9, i % 2 ? WOOD : EARTH, 2.5); }
  for (const bx of [-18, 18]) seg(ctx, bx, -2, bx, -40, 5, C.yellow, 1.5); ctx.restore();
}
function abSack(ctx, x, y, w, h, fill = 1, o = {}) {   // a cloth sack, bottom centre (x, y); fill 0 = flat, o.coin draws a coin mark
  const hh = h * (0.3 + 0.7 * fill), ww = w * (0.85 + 0.15 * fill);
  const pts = [[x - ww / 2, y], [x - ww / 2 - 3 * fill, y - hh * 0.55], [x - ww * 0.28, y - hh * 0.92], [x - 8, y - hh], [x + 8, y - hh], [x + ww * 0.3, y - hh * 0.9], [x + ww / 2 + 3 * fill, y - hh * 0.5], [x + ww / 2, y]];
  shape(ctx, pts, o.col || CREAM, { lw: 3.5, seed: o.seed || 88, dot: SAND, pitch: 7, rad: 0.2, da: 0.5 });
  seg(ctx, x - 9, y - hh - 2, x + 9, y - hh - 2, 5, C.red, 1.5); shape(ctx, [[x - 6, y - hh - 4], [x - 12, y - hh - 16], [x + 12, y - hh - 16], [x + 6, y - hh - 4]], o.col || CREAM, { lw: 3, seed: 89 });
  if (o.coin && fill > 0.3) shape(ctx, ell(x, y - hh * 0.45, w * 0.16, w * 0.16, 14), C.yellow, { lw: 2.5, seed: 90 });
}
function abCoin(ctx, x, y, r = 9, flat = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, ell(0, 0, r * Math.max(0.15, flat), r, 14), C.yellow, { lw: 2.5, seed: 91 }); ctx.restore(); }
function abCoinPile(ctx, x, base, w, h, n = 1, seed = 7, o = {}) {   // a coin mound (gold, or o.col silver)
  const col = o.col || C.yellow, dk = o.dk || AB_MX(C.yellow, C.red, 0.45), hh = h * n, r = K.rng(seed);
  shape(ctx, [[x - w / 2, base], [x - w * 0.35, base - hh * 0.55], [x - w * 0.12, base - hh * 0.95], [x + w * 0.1, base - hh], [x + w * 0.32, base - hh * 0.6], [x + w / 2, base]], col, { lw: 5, seed, dot: dk, pitch: 8, rad: 0.24, da: 0.45 });
  for (let i = 0; i < 26 * n; i++) { const u = r() * 2 - 1, cy = base - (1 - Math.abs(u)) * hh * (0.2 + r() * 0.75), cx = x + u * w * 0.42; shape(ctx, ell(cx, cy, 9, 6, 10), o.coin || AB_MX(col, C.white, 0.3), { lw: 2, seed: 92 + i }); }
}
function abMoth(ctx, x, y, t, s = 1) { const f = Math.sin(t * 2 * Math.PI / 0.12); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) shape(ctx, [[0, 0], [sd * 22, -14 * (0.3 + 0.7 * Math.abs(f))], [sd * 18, 8]], STONE2, { lw: 2.5, seed: 93 }); seg(ctx, 0, -6, 0, 8, 4, STONED, 1.5); ctx.restore(); }
function abStar(ctx, x, y, r, rot = 0, col = C.yellow) { const p = []; for (let i = 0; i <= 10; i++) { const a = rot + i / 10 * Math.PI * 2 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; p.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } shape(ctx, p, col, { lw: 3, seed: 94 }); }
function abDust(ctx, x, y, t, t0, seed = 1, sc = 1) {   // a puff of small paper cards on a landing or footfall
  const d = t - t0; if (d < 0 || d > 0.6) return; const r = K.rng(seed), u = K.ease.out(d / 0.6);
  for (let i = 0; i < 5; i++) { const a = Math.PI + (i / 4) * Math.PI + (r() - 0.5) * 0.3, rr = (14 + r() * 10) * (1 - u * 0.5) * sc;
    ctx.save(); ctx.globalAlpha *= 1 - u; shape(ctx, ell(x + Math.cos(a) * 40 * u * sc, y + Math.sin(a) * 18 * u * sc - 4, rr, rr * 0.7, 12), CREAM, { lw: 2.5, seed: seed + i }); ctx.restore(); }
}
function abCart(ctx, x, y, s, wheel, n, bounce, t, dir = -1) {   // two-wheeled cart (box 170 x 60, wheel r 42, shafts), heaped with n flat sacks
  ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
  const by = -60 - bounce;
  for (let i = 0; i < n; i++) { const fx = -70 + (i % 5) * 34, fy = by - 52 - Math.floor(i / 5) * 18 + lagged((u) => Math.sin(u * 13 + i) * 4, t, 0.08, 1); shape(ctx, [[fx - 22, fy + 16], [fx - 18, fy - 8 + Math.sin(t * 9 + i) * 3], [fx + 22, fy - 10], [fx + 24, fy + 14]], CREAM, { lw: 3, seed: 95 + i, dot: SAND, pitch: 6, rad: 0.2, da: 0.4 }); }
  seg(ctx, 80, by - 6, 190, by - 26, 9, WOOD, 3);
  shape(ctx, K.rectPts(-95, by - 50, 180, 56), WOOD, { lw: 4.5, seed: 96, dot: EARTHD, pitch: 8, rad: 0.18, da: 0.4 });
  ctx.save(); ctx.strokeStyle = EARTHD; ctx.lineWidth = 3; for (const yy of [-36, -22]) { ctx.beginPath(); ctx.moveTo(-90, by + yy + 6); ctx.lineTo(80, by + yy + 6); ctx.stroke(); } ctx.restore();
  ctx.translate(0, -42); shape(ctx, ell(0, 0, 42, 42, 28), EARTH, { lw: 5, seed: 97 }); ctx.save(); ctx.rotate(wheel); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; seg(ctx, 0, 0, Math.cos(a) * 34, Math.sin(a) * 34, 4, EARTHD, 1.5); } ctx.restore(); shape(ctx, ell(0, 0, 9, 9, 12), EARTHD, { lw: 3, seed: 98 });
  ctx.restore();
}
// the picture card: a cream card on a stand showing the rock in miniature (open 0..1 parts the halves, fan glows)
function abStoryCard(ctx, t, x, base, open, glowT) {
  const w = 220, h = 170; shape(ctx, [[x - 30, base], [x, base - 30], [x + 30, base]], WOOD, { lw: 3.5, seed: 100 });
  shape(ctx, K.rectPts(x - w / 2, base - h - 20, w, h), CREAM, { lw: 5, seed: 101 });
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 8, base - h - 12, w - 16, h - 16); ctx.clip(); ctx.fillStyle = AB_PAL.day.sky; ctx.fillRect(x - w / 2, base - h - 20, w, h);
  ctx.fillStyle = AB_PAL.day.page; ctx.fillRect(x - w / 2, base - 60, w, 40);
  const R = { x, base: base - 34, w: 150, h: 120, ax: x + 3, aw: 44, ah: 60 }, P = AB_PAL.day;
  shape(ctx, abRockArch(R), AB_MX(NAVY2, C.black, 0.3), { lw: 2.5, seed: 102 });
  if (open > 0.3 && glowT != null) { ctx.save(); ctx.globalAlpha = K.clamp((open - 0.3) / 0.4); for (let i = 0; i < 7; i++) { const a = -1.25 + i * 0.42 - Math.PI / 2; shape(ctx, [[R.ax, R.base - 25], [R.ax + Math.cos(a - 0.1) * 70, R.base - 25 + Math.sin(a - 0.1) * 70], [R.ax + Math.cos(a + 0.1) * 70, R.base - 25 + Math.sin(a + 0.1) * 70]], C.yellow, { lw: 2, seed: 103 + i }); } ctx.restore(); }
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * open * 26, 0); abRockHalfArtMini(ctx, sd, P, R); ctx.restore(); }
  ctx.restore();
}
function abRockHalfArtMini(ctx, side, P, R) {
  const z = abRockZig(R), clip = side < 0 ? [[R.x - 400, 0], ...z, [R.ax, 2000], [R.x - 400, 2000]] : [[R.x + 400, 0], ...z, [R.ax, 2000], [R.x + 400, 2000]];
  ctx.save(); K.poly(ctx, clip, true); ctx.clip(); shape(ctx, abRockPts(R), P.rock, { lw: 3.5, seed: 104, dot: P.rockD, pitch: 6, rad: 0.24, da: 0.5 }); ctx.restore();
}
// the scrap map: dashed path, a tree, the rock and a red X, drawn on by draw 0..1
function abMapCard(ctx, x, y, draw, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  shape(ctx, [[-100, -75], [96, -72], [100, 70], [-96, 75]], AB_MX(CREAM, SAND, 0.3), { lw: 4, seed: 105 });
  const path = [[80, 50], [40, 30], [10, 40], [-20, 10], [-40, -20], [-60, -30]], q = K.trim(densify(path, 6), K.clamp(draw / 0.5));
  if (q.length > 1) { ctx.save(); ctx.setLineDash([8, 7]); ctx.strokeStyle = C.black; ctx.lineWidth = 4; K.poly(ctx, q); ctx.stroke(); ctx.restore(); }
  if (draw > 0.5) { ctx.save(); ctx.globalAlpha = K.clamp((draw - 0.5) / 0.15); shape(ctx, ell(0, -40, 18, 16, 14), GREEN, { lw: 3, seed: 106 }); seg(ctx, 0, -26, 0, -12, 5, WOOD, 1.5); ctx.restore(); }
  if (draw > 0.65) { ctx.save(); ctx.globalAlpha = K.clamp((draw - 0.65) / 0.15); shape(ctx, [[-90, -10], [-84, -44], [-62, -56], [-40, -44], [-34, -10]], STONE, { lw: 3, seed: 107 }); ctx.restore(); }
  if (draw > 0.8) { const k = K.clamp((draw - 0.8) / 0.2); ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-74, -48); ctx.lineTo(K.lerp(-74, -50, k), K.lerp(-48, -20, k)); if (k > 0.5) { ctx.moveTo(-50, -48); ctx.lineTo(K.lerp(-50, -74, (k - 0.5) * 2), K.lerp(-48, -20, (k - 0.5) * 2)); } ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// the ? card on a string (ending)
function abQCard(ctx, x, y, k, rot) { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#6b5a48'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -500); ctx.lineTo(0, 0); ctx.stroke(); ctx.rotate(rot); ctx.scale(k, k);
  shape(ctx, ell(0, 50, 50, 56, 24), C.yellow, { lw: 5, seed: 108 }); ctx.font = `400 84px "${BF}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 12; ctx.strokeStyle = C.black; ctx.strokeText('?', 0, 54); ctx.fillStyle = C.white; ctx.fillText('?', 0, 54); ctx.restore(); }
// a small sign card with lettering (MARKET signpost)
function abSignArt(ctx, x, base, text, dir = 1) {
  seg(ctx, x, base, x, base - 120, 10, WOOD, 3);
  const y = base - 150; shape(ctx, [[x - 70 * dir, y - 26], [x + 60 * dir, y - 26], [x + 88 * dir, y], [x + 60 * dir, y + 26], [x - 70 * dir, y + 26]], C.yellow, { lw: 4, seed: 109 });
  ctx.save(); ctx.font = `400 34px "${BF}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.black; ctx.fillText(text, x + 4 * dir, y + 2); ctx.restore();
  shape(ctx, ell(x - 52 * dir, y, 9, 9, 12), C.white, { lw: 2.5, seed: 110 });
}
