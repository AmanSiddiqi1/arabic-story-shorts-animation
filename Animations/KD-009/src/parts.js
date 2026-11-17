// ===== KD-009 The Monkey and the Carpenter: story-local drawings (candidates for Library/, see library_proposals.md) =====
// villageYard set (cottage + perch tree), splitLog + wedge, carpenter tools, carpenter figure (villager costume 'carpenter'),
// monkeyK (Library monkey + optional noTail / armLen / world hand targets / held props / flush), monkey tail paths, painPulse.
const BROWN = '#7a4212', BARK = '#a8741a', BARKL = '#d9a441', LOGIN = '#f2d27a', GAPC = '#0d2260', IRON = '#4a5878', PANTS = '#1d5bd0';
const rot2 = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

// ---------- villageYard ----------
const YARD = { perch: [215, 545], door: [850, 920, 760, 900], win: [928, 996, 624, 716], chimney: [940, 975, 420, 520] };
const PERCH_TREE = { w: 84, top: 380, crowns: [[100, 300, 125], [235, 318, 88], [20, 380, 70], [190, 215, 80]], branch: [[120, 556], [340, 538], [344, 560], [120, 584]] };
function yardSky(ctx, day) { sky(ctx, { preset: day ? 'day' : 'dawn' }); }
function yardBack(ctx, day) {
  ctx.drawImage(bake('kd9yard' + (day ? 'D' : 'N'), 1000, 1230, (x) => {
    hillTrees(x, { seed: 4 }); treeRow(x, { n: 4, hmin: 330, seed: 8 }); ground(x);
    // cottage facade
    shape(x, [[800, 560], [1012, 560], [1012, 902], [800, 902]], '#f3e2b8', { lw: 7, seed: 24, dot: C.red, pitch: 12, rad: 0.15, da: 0.35 });
    shape(x, [[YARD.chimney[0], YARD.chimney[2]], [YARD.chimney[1], YARD.chimney[2]], [YARD.chimney[1], 520], [YARD.chimney[0], 520]], C.red, { lw: 6, seed: 27 });
    shape(x, [[778, 576], [905, 452], [1020, 560], [1020, 590]], C.red, { lw: 8, seed: 25, dot: C.yellow, pitch: 10, rad: 0.2, da: 0.5 });
    shape(x, [[YARD.door[0] - 8, YARD.door[2] - 10], [YARD.door[1] + 8, YARD.door[2] - 10], [YARD.door[1] + 8, 902], [YARD.door[0] - 8, 902]], BROWN, { lw: 5, seed: 26 });
    shape(x, [[YARD.win[0] - 8, YARD.win[2] - 8], [YARD.win[1] + 8, YARD.win[2] - 8], [YARD.win[1] + 8, YARD.win[3] + 8], [YARD.win[0] - 8, YARD.win[3] + 8]], BROWN, { lw: 5, seed: 28 });
    // perch tree (trunk x ~110, branch to the right, perch at 215,545)
    tree(x, 70, 900, PERCH_TREE);
  }), 0, 0, 1000, 1230);
}
// door: open 0..1; inside(ctx) draws the dim interior content (bowl, table)
function yardDoor(ctx, open, inside) {
  const [x0, x1, y0, y1] = YARD.door; ctx.save(); ctx.fillStyle = GAPC; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.fillStyle = dotPat(ctx, '#1b3a8f', 9, 0.3); ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); inside && inside(ctx); ctx.restore();
  const w = (x1 - x0) * Math.max(0.12, 1 - open), pts = [[x0, y0], [x0 + w, y0 + 4 * open], [x0 + w, y1 - 4 * open], [x0, y1]];
  shape(ctx, pts, BARK, { lw: 5, seed: 29, dot: BROWN, pitch: 9, rad: 0.2, da: 0.5 });
  if (open < 0.6) shape(ctx, ell(x0 + w - 12, (y0 + y1) / 2, 6, 6, 10), C.yellow, { lw: 3 });
}
function yardWindow(ctx, inside) {
  const [x0, x1, y0, y1] = YARD.win; ctx.save(); ctx.fillStyle = '#ffd98a'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); inside && inside(ctx); ctx.restore();
  seg(ctx, (x0 + x1) / 2, y0, (x0 + x1) / 2, y1, 4, BROWN, 2); seg(ctx, x0, (y0 + y1) / 2, x1, (y0 + y1) / 2, 4, BROWN, 2);
  ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.restore();
}
// leaf clumps in front of the perch (occluders). part 0 closed .. 1 open; deep 0..1 closes them more (the ending)
function leafClumps(ctx, part, t, deep = 0, spread = 0) {   // spread (v2): extra units each clump slides apart, the third one drops
  const sway = Math.sin(t * 1.3) * 3, cl = [[188 - 66 * part + 18 * deep - spread, 446 + 40 * part + sway, 60], [250 + 58 * part - 14 * deep + spread, 440 + 34 * part - sway, 58], [222, 524 + 84 * part + spread, 46]];
  ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = C.black; for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); }
  ctx.fillStyle = GREEN; for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 7); ctx.fill(); }
  ctx.fillStyle = dotPat(ctx, GREEND, 11, 0.28); for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 7); ctx.fill(); }
  ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const [x, y, r] of cl) { ctx.beginPath(); ctx.arc(x - 6, y + 4, r * 0.45, 3.6, 5.0); ctx.stroke(); } ctx.restore();
}
function leafFall(ctx, t, t0, x, y, n = 3) { if (t < t0 || t > t0 + 2.4) return; for (let i = 0; i < n; i++) { const u = (t - t0 - i * 0.15) / 2.2; if (u <= 0 || u > 1) continue;
  ctx.save(); ctx.globalAlpha = 1 - u * u; ctx.translate(x + i * 30 - 30 + 18 * Math.sin(u * 9 + i), y + u * 300); ctx.rotate(Math.sin(u * 8 + i) * 0.8); shape(ctx, ell(0, 0, 11, 5, 10), GREEN2, { lw: 2.5, seed: i + 3 }); ctx.restore(); } }

// ---------- splitLog + wedge ----------
// Log at rest: x 330..670, top 783, seam 840, bottom 895. kerf 0..1 = how far the cut runs in from the right end; gap 0..1 lifts the upper half.
const LOG = { x0: 330, x1: 670, top: 783, seam: 840, bot: 895 };
function logGeo(kerf, gap) { const hx = LOG.x1 - 40 - kerf * 200, L = LOG.x1 - hx, rise = kerf > 0.02 ? gap * 44 : 0, ang = -Math.atan2(rise, L); return { hx, L, rise, ang, riseAt: (x) => K.clamp((x - hx) / L) * rise }; }
const logEndRings = (ctx, x, y0, y1) => { const cy = (y0 + y1) / 2, ry = (y1 - y0) / 2; shape(ctx, ell(x, cy, 16, ry, 24), LOGIN, { lw: 5, seed: 41 }); ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = BROWN; for (const k of [0.62, 0.32]) { ctx.beginPath(); ctx.ellipse(x, cy, 16 * k, ry * k, 0, 0, 7); ctx.stroke(); } ctx.restore(); };
function barkLines(ctx, x0, x1, y0, y1, seed) { const r = K.rng(seed); ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = BROWN; ctx.lineCap = 'round'; for (let i = 0; i < (x1 - x0) / 26; i++) { const x = x0 + 10 + r() * (x1 - x0 - 30), y = y0 + 8 + r() * (y1 - y0 - 16); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 14 + r() * 16, y + (r() - 0.5) * 4); ctx.stroke(); } ctx.restore(); }
// whole log (carried or resting), centred at cx, cy, rotation rot
function logWhole(ctx, cx, cy, rot = 0) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); const hw = (LOG.x1 - LOG.x0) / 2, hh = (LOG.bot - LOG.top) / 2;
  shape(ctx, [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]], BARK, { lw: 6, seed: 40, dot: BROWN, pitch: 9, rad: 0.2, da: 0.45 }); barkLines(ctx, -hw, hw, -hh, hh, 3); logEndRings(ctx, hw, -hh, hh); ctx.restore();
}
// resting log, drawn in parts. o: {kerf, gap, chalk 0..1, shake, mid(ctx) drawn between upper half and lower half (the tail)}
function splitLog(ctx, o) {
  const g = logGeo(o.kerf || 0, o.gap || 0), sh = o.shake || 0; ctx.save(); ctx.translate(0, sh);
  // chocks
  for (const cx of [380, 610]) shape(ctx, [[cx - 22, 893], [cx + 22, 893], [cx + 26, 902], [cx - 26, 902]], BROWN, { lw: 4, seed: cx });
  // the dark gap behind
  if (g.rise > 0.5) { ctx.fillStyle = GAPC; K.poly(ctx, [[g.hx, LOG.seam + 2], [LOG.x1 + 2, LOG.seam + 2], [LOG.x1 + 2, LOG.seam - g.rise - 2]], true); ctx.fill(); }
  // upper half (rotated about the hinge) + the uncut left part
  const up = [[LOG.x0, LOG.top], [g.hx, LOG.top], ...[[g.hx, LOG.top], [LOG.x1, LOG.top], [LOG.x1, LOG.seam], [g.hx, LOG.seam]].slice(1).map(([x, y]) => { const r = rot2(x - g.hx, y - LOG.seam, g.ang); return [g.hx + r[0], LOG.seam + r[1]]; }), [g.hx, LOG.seam], [LOG.x0, LOG.seam]];
  shape(ctx, up, BARK, { lw: 6, seed: 42, dot: BROWN, pitch: 9, rad: 0.2, da: 0.45 });
  ctx.save(); ctx.translate(g.hx, LOG.seam); ctx.rotate(g.ang); barkLines(ctx, 0, LOG.x1 - g.hx, LOG.top - LOG.seam, 0, 5); logEndRings(ctx, LOG.x1 - g.hx, LOG.top - LOG.seam, 0); ctx.restore();
  barkLines(ctx, LOG.x0, g.hx, LOG.top, LOG.seam, 6);
  o.mid && o.mid(ctx, g);
  // lower half
  const lo = [[LOG.x0, LOG.seam], [LOG.x1, LOG.seam], [LOG.x1, LOG.bot], [LOG.x0, LOG.bot]];
  ctx.fillStyle = BARK; K.poly(ctx, lo, true); ctx.fill(); ctx.save(); K.poly(ctx, lo, true); ctx.clip(); ctx.globalAlpha = 0.45; ctx.fillStyle = dotPat(ctx, BROWN, 9, 0.2); ctx.fillRect(LOG.x0, LOG.seam, 400, 60); ctx.restore();
  ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(LOG.x0, LOG.seam); ctx.lineTo(LOG.x0, LOG.bot); ctx.lineTo(LOG.x1, LOG.bot); ctx.stroke(); ctx.restore();
  barkLines(ctx, LOG.x0, LOG.x1, LOG.seam, LOG.bot, 7); logEndRings(ctx, LOG.x1, LOG.seam, LOG.bot);
  // the kerf seam line from the hinge to the end
  if ((o.kerf || 0) > 0.02) seg(ctx, g.hx, LOG.seam, LOG.x1, LOG.seam, 1.5, C.black, 1.5);
  // chalk line (dashed, drawn from the right end)
  if (o.chalk > 0) { ctx.save(); ctx.setLineDash([14, 10]); ctx.lineWidth = 5; ctx.strokeStyle = C.white; ctx.beginPath(); ctx.moveTo(LOG.x1 + 8, LOG.seam); ctx.lineTo(LOG.x1 + 8 - o.chalk * (LOG.x1 - LOG.x0 + 8), LOG.seam); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return g;
}
// wedge: tip at (x, y) pointing left, rotation rot, scale s (60 x 26 at s 1). Bright yellow with a red end face.
function wedge(ctx, x, y, rot = 0, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[0, 0], [60, -14], [60, 14]], C.yellow, { lw: 4, seed: 51, dot: '#e0a800', pitch: 7, rad: 0.25, da: 0.6 });
  shape(ctx, ell(60, 0, 6, 14, 14), C.red, { lw: 3.5, seed: 52 }); ctx.restore();
}
// wedge placed in the log mouth: out 0 = driven home, 1 = tip at the mouth. Returns the head position.
function wedgeInLog(ctx, g, out, sh = 0, wob = 0) { const tipx = 616 + out * 44, mid = (x) => LOG.seam - g.riseAt(x) / 2; const y = mid(tipx), ang = g.ang / 2 + wob; wedge(ctx, tipx, y + sh, ang, 1); return [tipx + 60, mid(tipx + 60) + sh]; }

// ---------- carpenter tools ----------
function saw(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const bl = [[10, -12], [150, -6], [150, 8], [10, 14]]; ctx.fillStyle = '#dfe3ee'; K.poly(ctx, bl, true); ctx.fill(); ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(10, -12); ctx.lineTo(150, -6); ctx.lineTo(150, 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(150, 8); for (let k = 150; k > 12; k -= 8) { ctx.lineTo(k - 4, 13); ctx.lineTo(k - 8, 9); } ctx.lineTo(10, 14); ctx.stroke(); ctx.restore();
  shape(ctx, [[-16, -16], [14, -16], [14, 18], [-16, 18]], C.red, { lw: 4, seed: 53 }); shape(ctx, ell(-2, 1, 6, 9, 10), C.black, { lw: 0 }); ctx.restore(); }
function mallet(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); seg(ctx, -8, 0, 62, 0, 9, BARK, 3.5); shape(ctx, [[58, -24], [86, -24], [86, 24], [58, 24]], C.yellow, { lw: 4.5, seed: 54, dot: C.red, pitch: 7, rad: 0.2, da: 0.5 }); ctx.restore(); }
function prybar(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); seg(ctx, -30, 0, 110, 0, 12, IRON, 4); seg(ctx, 110, 0, 128, 8, 11, IRON, 4); seg(ctx, -30, 0, 14, 0, 17, C.red, 4); ctx.restore(); }
function stool(ctx, x, y, sq = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(1 + (1 - sq) * 0.6, sq); for (const lx of [-26, 0, 26]) seg(ctx, lx * 0.8, -40, lx, 0, 7, BROWN, 3); shape(ctx, [[-34, -50], [34, -50], [34, -38], [-34, -38]], BARK, { lw: 4.5, seed: 55 }); ctx.restore(); }
// table assembling: p 0..1 (legs stand up 0..0.5, top drops 0.5..1)
function table(ctx, x, y, p) { if (p <= 0) return; const lp = K.ease.back(K.clamp(p / 0.5)), tp = K.clamp((p - 0.5) / 0.5), ty = y - 70 - (1 - K.ease.bounce(tp)) * 90, sq = tp >= 1 ? 1 : 1;
  for (const lx of [-46, 46]) seg(ctx, x + lx, y, x + lx, y - 66 * lp, 9, BROWN, 3.5); if (tp > 0) shape(ctx, [[x - 66, ty - 10], [x + 66, ty - 10], [x + 66, ty + 6], [x - 66, ty + 6]], BARK, { lw: 4.5, seed: 56, dot: BROWN, pitch: 8, rad: 0.2, da: 0.4 }); }
// finished plank door leaning on a wall: p 0..1 (planks slide together, bars and ring pop)
function plankDoor(ctx, x, y, p) { if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.08);
  for (let i = 0; i < 3; i++) { const u = K.ease.back(K.clamp(p * 1.6 - i * 0.2)), off = (1 - u) * (i - 1) * 60; if (u > 0) shape(ctx, [[-36 + i * 24 + off, -150], [-12 + i * 24 + off, -150], [-12 + i * 24 + off, 0], [-36 + i * 24 + off, 0]], BARK, { lw: 4, seed: 60 + i, dot: BROWN, pitch: 8, rad: 0.2, da: 0.4 }); }
  const b = K.ease.back(K.clamp((p - 0.6) / 0.25)); if (b > 0) for (const by of [-118, -36]) shape(ctx, [[-40, by - 8 * b], [40, by - 8 * b], [40, by + 8 * b], [-40, by + 8 * b]], BROWN, { lw: 4, seed: 64 });
  const r = K.ease.back(K.clamp((p - 0.85) / 0.15)); if (r > 0) { ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(22, -78, 9 * r, 0, 7); ctx.stroke(); }
  ctx.restore(); }

// ---------- effects ----------
// painPulse: red rings and small stars from a point; size grows the radius
function painPulse(ctx, x, y, t, t0, size = 1, dur = 0.6) { const u = (t - t0) / dur; if (u < 0 || u > 1) return; ctx.save(); ctx.globalAlpha = 1 - u;
  for (let i = 0; i < 2; i++) { const v = K.clamp(u * 1.2 - i * 0.2); if (v <= 0) continue; ctx.lineWidth = 6 * size; ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(x, y, (10 + 40 * v) * size, 0, 7); ctx.stroke(); }
  const r = K.rng(Math.round(t0 * 100)); for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + (r() - 0.5) * 2.4, d = (20 + 46 * K.ease.out(u)) * size; star(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, 8 * size, C.yellow, u * 3); }
  ctx.restore(); }
// a ring that flashes round an object (glint / "look at this")
function ringFlash(ctx, x, y, r, t, t0, dur = 1.0) { const u = (t - t0) / dur; if (u < 0 || u > 1) return; const k = K.ease.back(K.clamp(u * 3)); ctx.save(); ctx.globalAlpha = K.clamp((1 - u) * 3);
  ctx.lineWidth = 9; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(x, y, r * k, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.red; ctx.stroke();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.2; seg(ctx, x + Math.cos(a) * r * k * 1.15, y + Math.sin(a) * r * k * 1.15, x + Math.cos(a) * r * k * 1.4, y + Math.sin(a) * r * k * 1.4, 4, C.yellow, 2.5); } ctx.restore(); }
function glint(ctx, x, y, t, t0) { const u = (t - t0) / 0.45; if (u < 0 || u > 1) return; const k = Math.sin(Math.PI * u); ctx.save(); ctx.translate(x, y); ctx.rotate(u); ctx.scale(k, k); star(ctx, 0, 0, 22, C.white, 0); ctx.restore(); }
// dotted eye line from a to b, drawn on over p
function eyeLine(ctx, a, b, p, alpha = 1) { if (p <= 0 || alpha <= 0) return; ctx.save(); ctx.globalAlpha = alpha; ctx.setLineDash([6, 16]); ctx.lineCap = 'round'; ctx.lineWidth = 9; ctx.strokeStyle = C.white;
  const e = [K.lerp(a[0], b[0], p), K.lerp(a[1], b[1], p)]; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...e); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.restore(); }
function sawdust(ctx, x, y, t, on, seed = 1) { if (!on) return; const r = K.rng(seed); for (let i = 0; i < 7; i++) { const ph = r(), u = ((t * 1.7 + ph) % 1), dx = (r() - 0.5) * 30 + u * 16, dy = u * u * 55; ctx.save(); ctx.globalAlpha = 1 - u; ctx.fillStyle = LOGIN; ctx.beginPath(); ctx.arc(x + dx, y + dy, 3.5, 0, 7); ctx.fill(); ctx.restore(); } }

// ---------- carpenter (villager, costume 'carpenter') ----------
// P: {x,y,s,dir,ph,amp (walk),sit 0..1,kneel 0..1,lean,drop,tilt,handL/handR (local) or handLW/handRW (world),aL/aR,eyes,mouth,talk,brow,wink,tongue,
//     holdL/holdR: 'saw'|'mallet'|'bar'|'stool'|'wedge'|'spoon', toolRotL/toolRotR (radians, local), sawOff}
function carpRaw(ctx, P) {
  const s = P.s || 1, dir = P.dir || 1, sit = P.sit || 0, kn = P.kneel || 0;
  const hipY = -75 + 23 * sit + 25 * kn, shY = hipY - 75, hdY = shY - 45 + (P.drop || 0);
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const sw = (P.amp || 0) * Math.sin(P.ph || 0) * 0.6;
  for (const sd of [-1, 1]) {   // legs: blend standing -> sitting / kneeling
    const hx = sd * 13, a = sw * sd, stF = [hx + Math.sin(a) * 76, -75 + Math.cos(a) * 76], stK = [hx + Math.sin(a) * 38, -75 + Math.cos(a) * 38];
    let k = [K.lerp(stK[0], hx + 42, sit), K.lerp(stK[1], hipY, sit)], f = [K.lerp(stF[0], hx + 44, sit), K.lerp(stF[1], 0, sit)];
    if (kn > 0) { const kk = sd > 0 ? [hx + 40, -46] : [hx + 4, -6], ff = sd > 0 ? [hx + 42, 0] : [hx - 50, -4]; k = [K.lerp(k[0], kk[0], kn), K.lerp(k[1], kk[1], kn)]; f = [K.lerp(f[0], ff[0], kn), K.lerp(f[1], ff[1], kn)]; }
    seg(ctx, hx, hipY, k[0], k[1], 22, PANTS, 4.5); seg(ctx, k[0], k[1], f[0], f[1], 20, PANTS, 4.5); shape(ctx, ell(f[0] + 7, f[1] - 3, 17, 9, 12), C.black, { lw: 3, seed: 3 });
  }
  ctx.save(); ctx.translate(0, hipY); ctx.rotate(P.lean || 0); ctx.translate(0, -hipY);
  const tun = [[-30, shY + 8], [30, shY + 8], [35, hipY + 22], [-35, hipY + 22]]; shape(ctx, tun, C.yellow, { dot: C.red, pitch: 9, rad: 0.3, lw: 5, seed: 12 });
  const apr = [[-8, shY + 34], [28, shY + 34], [32, hipY + 34], [-14, hipY + 34]]; shape(ctx, apr, EARTH, { lw: 4.5, seed: 13, dot: BROWN, pitch: 8, rad: 0.2, da: 0.5 });
  shape(ctx, [[2, hipY - 8], [24, hipY - 8], [24, hipY + 10], [2, hipY + 10]], BROWN, { lw: 3, seed: 14 });   // apron pocket (the wedge lives here)
  seg(ctx, -24, shY + 34, 28, shY + 34, 3, BROWN, 1.5);
  const sy0 = shY + 18, toLocal = (w) => { if (!w) return null; let lx = (w[0] - P.x) / (s * dir), ly = (w[1] - P.y) / s; if (P.lean) { const r = rot2(lx, ly - hipY, -(P.lean)); lx = r[0]; ly = r[1] + hipY; } return [lx, ly]; };
  const tgtL = P.handL || toLocal(P.handLW), tgtR = P.handR || toLocal(P.handRW);
  const arm = (sd, ang) => { if (!ang) ang = [0.12, 0.05]; const sx = sd * 31, e1 = [sx + Math.sin(ang[0]) * 38, sy0 + Math.cos(ang[0]) * 38], e2 = [e1[0] + Math.sin(ang[1]) * 36, e1[1] + Math.cos(ang[1]) * 36];
    seg(ctx, sx, sy0, e1[0], e1[1], 20, C.yellow, 4.5); seg(ctx, e1[0], e1[1], e2[0], e2[1], 16, C.white, 4.5); shape(ctx, ell(e2[0], e2[1], 12, 12, 12), C.white, { lw: 3.5, seed: 5, dot: C.skin, pitch: 5, rad: 0.3 }); return e2; };
  const holdAt = (h, what, rot) => { if (!what) return; ctx.save(); if (what === 'saw') saw(ctx, h[0], h[1], rot ?? 0, 0.9); else if (what === 'mallet') mallet(ctx, h[0], h[1], rot ?? -1.4, 0.9); else if (what === 'bar') prybar(ctx, h[0], h[1], rot ?? 0.5, 0.9);
    else if (what === 'stool') stool(ctx, h[0], h[1] + 48, 1); else if (what === 'wedge') { if (P.holdS) wedge(ctx, h[0] - 30 * P.holdS, h[1], rot ?? 0, P.holdS); else wedge(ctx, h[0] - 4, h[1] - 26, rot ?? -0.5, 1.3); } else if (what === 'spoon') seg(ctx, h[0], h[1], h[0] + 18, h[1] - 26, 4, '#dfe3ee', 2); ctx.restore(); };
  const hL = arm(-1, P.aL || (tgtL && armTo(-1, sy0, tgtL))); holdAt(hL, P.holdL, P.toolRotL);
  // head
  const hx0 = (P.look || 0) * 4; ctx.save(); ctx.translate(hx0, hdY); ctx.rotate(P.tilt || 0); ctx.translate(-hx0, -hdY);
  const hp = ell(hx0, hdY, 36, 37, 36); shape(ctx, hp, C.white, { dot: C.skin, pitch: 6, rad: 0.3, lw: 6, seed: 21 });
  const beard = [[hx0 - 30, hdY + 16], [hx0 - 16, hdY + 30], [hx0, hdY + 33], [hx0 + 16, hdY + 30], [hx0 + 30, hdY + 16], [hx0 + 24, hdY + 34], [hx0 + 8, hdY + 46], [hx0 - 8, hdY + 46], [hx0 - 24, hdY + 34]];
  shape(ctx, beard, C.black, { lw: 3, seed: 15 });
  shape(ctx, ell(hx0 + 2, hdY - 30, 40, 17, 24), C.white, { lw: 5, seed: 16, dot: C.blue, pitch: 7, rad: 0.18, da: 0.35 }); shape(ctx, ell(hx0 + 2, hdY - 46, 30, 15, 22), C.white, { lw: 5, seed: 17, dot: C.blue, pitch: 7, rad: 0.18, da: 0.35 });
  seg(ctx, hx0 - 30, hdY - 32, hx0 + 34, hdY - 40, 2, C.red, 1.5);
  const ey = hdY - 4, ex = 13, lk = P.look || 0;
  for (const sd of [-1, 1]) { const bx = hx0 + sd * ex + lk * 3, br = P.brow || 0; ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(bx - sd * 9, ey - 18 + br * 8); ctx.lineTo(bx + sd * 9, ey - 18 - br * 4); ctx.stroke(); ctx.restore(); }
  eyeAt(ctx, hx0 - ex + lk * 3, ey, P.wink === 'L' ? 'shut' : P.eyes || 'open', lk); eyeAt(ctx, hx0 + ex + lk * 3, ey, P.wink === 'R' ? 'shut' : P.eyes || 'open', lk);
  shape(ctx, [[hx0 - 22, hdY + 11], [hx0 - 9, hdY + 7], [hx0, hdY + 11], [hx0 + 9, hdY + 7], [hx0 + 22, hdY + 11], [hx0 + 15, hdY + 18], [hx0 + 4, hdY + 15], [hx0 - 4, hdY + 15], [hx0 - 15, hdY + 18]], C.black, { lw: 3, seed: 14 });
  const my = hdY + 20, tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.lineWidth = 5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(hx0, my + 3, 10, 3 + 8 * o, 14), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(hx0, my + 3 + 3 * o, 6, 2 + 3 * o, 0, 0, 7); ctx.fill(); }
  else if (m === 'o') shape(ctx, ell(hx0, my + 4, 7, 9, 12), C.black, { lw: 3, seed: 3 });
  else if (m === 'whistle') shape(ctx, ell(hx0 + 3, my + 2, 5, 5, 10), C.black, { lw: 3, seed: 3 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(hx0, my - 4, 11, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(hx0, my + 10, 10, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(hx0 - 8, my + 2); ctx.lineTo(hx0 + 8, my + 2); ctx.stroke(); }
  if (P.tongue) { ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(hx0 + 9, my + 5, 5, 4, 0.4, 0, 7); ctx.fill(); }
  ctx.restore(); ctx.restore();
  const hR = arm(1, P.aR || (tgtR && armTo(1, sy0, tgtR))); holdAt(hR, P.holdR, P.toolRotR);
  if (P.napkin) shape(ctx, [[-14, shY + 6], [14, shY + 6], [0, shY + 34]], C.white, { lw: 3, seed: 18 });
  ctx.restore(); ctx.restore();
}
const carpenter = acting(carpRaw, () => C.white);

// ---------- monkeyK: the Library monkey with optional story fields ----------
// extra P fields: noTail, armLen (arm multiplier), handLW/handRW world targets (fit: stretch the arm to reach), holdR/holdL ('wedge'|'twig'), flush 0..1 (red face), tongue
function mkIK(sd, sy, target, L1, L2, sx0 = 30) { const sx = sd * sx0, dx = target[0] - sx, dy = target[1] - sy, d = K.clamp(Math.hypot(dx, dy), Math.abs(L1 - L2) + 1, L1 + L2 - 0.5), phi = Math.atan2(dx, dy), al = Math.acos(K.clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const sol = [phi + al, phi - al].map((a0) => { const ex = sx + Math.sin(a0) * L1, ey = sy + Math.cos(a0) * L1; return [a0, Math.atan2(target[0] - ex, target[1] - ey), ex * sd]; }); const b = sol[0][2] >= sol[1][2] ? sol[0] : sol[1]; return [b[0], b[1]]; }
function monkeyRawK(ctx, P) {
  const s = P.s || 1, dir = P.dir ?? 1, ph = P.ph || 0, AL = P.armLen || 1;
  ctx.save(); ctx.translate(P.x, P.y); if (P.rot) ctx.rotate(P.rot); ctx.scale(dir * s, s);
  const tw = Math.sin(ph) * 9;
  if (!P.noTail) { const tp = K.bezier([-30, -34], [-95, -20 + tw], [-110, -110], [-62 + tw, -128], 16); for (let i = 1; i < tp.length; i++) seg(ctx, tp[i - 1][0], tp[i - 1][1], tp[i][0], tp[i][1], 13, FUR, 4.5); }
  for (const sd of [-1, 1]) { const hx = sd * 22, kx = hx + 24 + (P.kick || 0) * sd, fx = sd * 30 + 20; seg(ctx, hx, -26, kx, -6, 20, FUR, 4.5); shape(ctx, ell(fx - 6, -4, 20, 11, 14), FURD, { lw: 3.5, seed: 2 }); }
  shape(ctx, ell(0, -64, 40, 52, 28), FUR, { lw: 6, seed: 7, dot: FURD, pitch: 8, rad: 0.2, da: 0.55 });
  shape(ctx, ell(8, -58, 25, 36, 22), FURL, { lw: 3.5, seed: 8 });
  const L1 = 38 * AL, L2 = 36 * AL;
  const arm = (sd, a) => { a = a || [0.25, 0.1]; const sx = sd * 30, sy = -92, e1 = [sx + Math.sin(a[0]) * L1, sy + Math.cos(a[0]) * L1], e2 = [e1[0] + Math.sin(a[1]) * L2, e1[1] + Math.cos(a[1]) * L2]; seg(ctx, sx, sy, e1[0], e1[1], 17, FUR, 4.5); seg(ctx, e1[0], e1[1], e2[0], e2[1], 15, FUR, 4.5); shape(ctx, ell(e2[0], e2[1], 12, 12, 12), FURD, { lw: 3.5, seed: 5 }); return e2; };
  const hand = (sd, a, tg) => a || (tg && mkIK(sd, -92, tg, L1, L2));
  const hL = arm(-1, hand(-1, P.aL, P.handL)); if (P.holdL === 'wedge') wedge(ctx, hL[0] - 30, hL[1], 0, 1.1);
  const hR = arm(1, hand(1, P.aR, P.handR)); P.hR = hR;
  if (P.holdR === 'wedge') wedge(ctx, hR[0] - 30, hR[1] - 2, P.holdRot || 0, 1.1); else if (P.holdR === 'twig') seg(ctx, hR[0] - 26, hR[1] + 6, hR[0] + 30, hR[1] - 4, 5, BARK, 2.5);
  const hy = -140 + (P.drop || 0), hx = 8 + (P.dx || 0);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(P.tilt || 0);
  for (const ex of [-36, 44]) { shape(ctx, ell(ex, -4, 17, 17, 16), FUR, { lw: 4.5, seed: 9 }); shape(ctx, ell(ex, -4, 9, 9, 12), C.skin, { lw: 0 }); }
  shape(ctx, ell(0, 0, 44, 42, 30), FUR, { lw: 6, seed: 10, dot: FURD, pitch: 8, rad: 0.2, da: 0.55 });
  const face = [[-30, -14], [-12, -24], [0, -12], [12, -24], [30, -14], [36, 8], [26, 28], [0, 34], [-26, 28], [-36, 8]];
  shape(ctx, face, FURL, { lw: 4, seed: 11, dot: C.skin, pitch: 6, rad: 0.25, da: 0.7 });
  if (P.flush) { ctx.save(); ctx.globalAlpha = K.clamp(P.flush); K.poly(ctx, face, true); ctx.clip(); ctx.fillStyle = dotPat(ctx, C.red, 6, 0.42); ctx.fillRect(-40, -30, 80, 70); ctx.restore(); ink(ctx, face, 4, 11); }
  const lk = P.look ?? 0.6, eyes = P.eyes || 'open';
  eyeAt(ctx, -12 + lk * 3, -6, eyes, lk); eyeAt(ctx, 16 + lk * 3, -6, eyes, lk);
  if (P.brow) for (const sd of [-1, 1]) { ctx.save(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(2 + sd * 16 - sd * 10, -24 + P.brow * 8); ctx.lineTo(2 + sd * 16 + sd * 10, -24 - P.brow * 5); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle = C.black; ctx.beginPath(); ctx.arc(2, 8, 2.6, 0, 7); ctx.arc(10, 8, 2.6, 0, 7); ctx.fill();
  const my = 18, tk = P.talk || 0, m = P.mouth || 'closed'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.black; ctx.lineWidth = 5;
  if (tk > 0 || m === 'open') { const o = Math.max(tk, m === 'open' ? 1 : 0); shape(ctx, ell(6, my + 2, 13, 4 + 10 * o, 14), C.black, { lw: 3, seed: 3 }); ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(6, my + 2 + 4 * o, 8, 3 + 3 * o, 0, 0, 7); ctx.fill(); }
  else if (m === 'o') shape(ctx, ell(6, my + 3, 8, 10, 12), C.black, { lw: 3, seed: 3 });
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(6, my - 8, 15, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else if (m === 'grin') { shape(ctx, [[-12, my - 2], [24, my - 2], [6, my + 12]], C.white, { lw: 4, seed: 4 }); }
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(-6, my + 3); ctx.quadraticCurveTo(10, my + 6, 20, my - 4); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(6, my + 12, 12, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
  else if (m === 'teeth') { shape(ctx, [[-10, my - 4], [22, my - 4], [22, my + 8], [-10, my + 8]], C.white, { lw: 4, seed: 4 }); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-10, my + 2); ctx.lineTo(22, my + 2); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-4, my + 2); ctx.lineTo(16, my + 2); ctx.stroke(); }
  if (P.tongue) { ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(16, my + 6, 6, 5, 0.3, 0, 7); ctx.fill(); ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.restore(); ctx.restore(); ctx.restore();
}
const monkeyAct = acting(monkeyRawK, () => FURL);
// world <-> monkey-local (includes the acting wrapper's tip and sq)
function mkToWorld(P, lx, ly) { const s = P.s || 1, dir = P.dir ?? 1, sq = P.sq ?? 1, tp = (P.tip || 0) * Math.sign(dir || 1); let v = [lx * dir * s, ly * s]; if (P.rot) v = rot2(v[0], v[1], P.rot); v = [v[0] * (1 + (1 - sq) * 0.7), v[1] * sq]; v = rot2(v[0], v[1], tp); return [P.x + v[0], P.y + v[1]]; }
function mkToLocal(P, wx, wy) { const s = P.s || 1, dir = P.dir ?? 1, sq = P.sq ?? 1, tp = (P.tip || 0) * Math.sign(dir || 1); let v = rot2(wx - P.x, wy - P.y, -tp); v = [v[0] / (1 + (1 - sq) * 0.7), v[1] / sq]; if (P.rot) v = rot2(v[0], v[1], -P.rot); return [v[0] / (dir * s), v[1] / s]; }
function monkeyK(ctx, P) {
  P = { noTail: true, ...P }; for (const [w, k] of [['handLW', 'handL'], ['handRW', 'handR']]) if (P[w]) { P[k] = mkToLocal(P, P[w][0], P[w][1]); if (P.fit) { const sx = k === 'handL' ? -30 : 30, d = Math.hypot(P[k][0] - sx, P[k][1] + 92); P.armLen = Math.max(P.armLen || 1, K.clamp(d / 72, 1, 2.3)); } }
  monkeyAct(ctx, P);
}
// tail as a thick fur stroke through world points; kink: [index from the end, amount] zigzag near the pinch
function drawTail(ctx, pts, s = 0.9, o = {}) {
  let p = pts; if (o.kink) { const n = p.length; p = p.map((q, i) => { const k = n - 1 - i; if (k > 0 && k < 5) { const a = Math.atan2(p[Math.min(n - 1, i + 1)][1] - p[i - 1][1], p[Math.min(n - 1, i + 1)][0] - p[i - 1][0]); const z = (k % 2 ? 1 : -1) * 7 * o.kink * s; return [q[0] - Math.sin(a) * z, q[1] + Math.cos(a) * z]; } return q; }); }
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); p.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
  ctx.lineWidth = (13 + 9) * s; ctx.strokeStyle = C.black; ctx.stroke(); ctx.lineWidth = 13 * s * (o.thin ?? 1); ctx.strokeStyle = o.sore ? '#c9603a' : FUR; ctx.stroke();
  if (o.tuft) { const e = p[p.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], 10 * s, 0, 7); ctx.fillStyle = FURL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.black; ctx.stroke(); } ctx.restore();
}
// the default curl in world space (same curve as the Library tail)
function tailCurl(P, ph = 0) { const tw = Math.sin(ph) * 9; return K.bezier([-30, -34], [-95, -20 + tw], [-110, -110], [-62 + tw, -128], 16).map(([x, y]) => mkToWorld(P, x, y)); }
// a tail from the monkey's rear to a world end point through a control point
function tailTo(P, end, ctrl, n = 16) { const b = mkToWorld(P, -30, -34), c1 = ctrl || [(b[0] + end[0]) / 2, Math.max(b[1], end[1]) + 20]; return K.bezier(b, [K.lerp(b[0], c1[0], 0.7), K.lerp(b[1], c1[1], 0.7)], [K.lerp(end[0], c1[0], 0.5), K.lerp(end[1], c1[1], 0.5)], end, n); }
const mixPts = (a, b, u) => a.map((q, i) => [K.lerp(q[0], b[i][0], u), K.lerp(q[1], b[i][1], u)]);
